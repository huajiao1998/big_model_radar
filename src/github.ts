/**
 * GitHub API types and fetch helpers.
 * Reads GITHUB_TOKEN and DIGEST_REPO from environment at call time.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RepoConfig {
  /** Short identifier used for filenames */
  id: string;
  /** GitHub owner/repo slug */
  repo: string;
  /** Human-readable display name */
  name: string;
  /**
   * Fetch multiple pages until items older than `since` are reached.
   * Use for high-volume repos with many daily updates.
   */
  paginated?: boolean;
  /**
   * Track GitHub Discussions instead of Issues/PRs for this repo.
   * Use for repos that disabled Issues and Pull Requests and run their
   * community in Discussions (e.g. deepseek-ai/deepseek-harness).
   */
  useDiscussions?: boolean;
}

export interface GitHubUser {
  login: string;
}

export interface GitHubLabel {
  name: string;
}

export interface GitHubReactions {
  "+1": number;
}

export interface GitHubItem {
  number: number;
  title: string;
  state: string;
  user: GitHubUser;
  labels: GitHubLabel[];
  created_at: string;
  updated_at: string;
  comments: number;
  reactions?: GitHubReactions;
  body?: string | null;
  html_url: string;
  pull_request?: unknown;
  /** GitHub Discussions category name, populated when items come from Discussions. */
  category?: string;
}

export interface GitHubRelease {
  tag_name: string;
  name: string;
  body?: string | null;
  published_at: string;
}

// ---------------------------------------------------------------------------
// Internals
// ---------------------------------------------------------------------------

/** Maximum pages to fetch for paginated repos (100 items/page). */
const MAX_PAGES = 5;

function headers(): Record<string, string> {
  return {
    Authorization: `Bearer ${process.env["GITHUB_TOKEN"] ?? ""}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function githubGet<T>(url: string, params: Record<string, string> = {}): Promise<T> {
  const u = new URL(url);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  const resp = await fetch(u.toString(), { headers: headers() });
  if (!resp.ok) throw new Error(`GitHub API error ${resp.status} (${url}): ${await resp.text()}`);
  return resp.json() as Promise<T>;
}

async function fetchItemPage(
  repo: string,
  itemType: "issues" | "pulls",
  since: Date,
  page: number,
): Promise<GitHubItem[]> {
  const params: Record<string, string> = {
    state: "all",
    sort: "updated",
    direction: "desc",
    per_page: "100",
    page: String(page),
  };
  // /pulls does not support `since`; filter client-side instead
  if (itemType === "issues") params["since"] = since.toISOString();

  const items = await githubGet<GitHubItem[]>(`https://api.github.com/repos/${repo}/${itemType}`, params);
  return itemType === "pulls" ? items.filter((i) => new Date(i.updated_at) >= since) : items;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

/**
 * Fetch items updated since `since`.
 * Paginated repos: keeps fetching until a page ends before `since` or MAX_PAGES reached.
 * Regular repos: single page of 50.
 */
export async function fetchRecentItems(
  cfg: RepoConfig,
  itemType: "issues" | "pulls",
  since: Date,
): Promise<GitHubItem[]> {
  if (!cfg.paginated) {
    const params: Record<string, string> = {
      state: "all",
      sort: "updated",
      direction: "desc",
      per_page: "50",
    };
    if (itemType === "issues") params["since"] = since.toISOString();
    const items = await githubGet<GitHubItem[]>(
      `https://api.github.com/repos/${cfg.repo}/${itemType}`,
      params,
    );
    return itemType === "pulls" ? items.filter((i) => new Date(i.updated_at) >= since) : items;
  }

  const all: GitHubItem[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const items = await fetchItemPage(cfg.repo, itemType, since, page);
    if (items.length === 0) break;
    all.push(...items);
    const last = items[items.length - 1];
    if (last && new Date(last.updated_at) < since) break;
    if (items.length < 100) break;
  }
  return all;
}

export async function fetchRecentReleases(repo: string, since: Date): Promise<GitHubRelease[]> {
  const releases = await githubGet<GitHubRelease[]>(`https://api.github.com/repos/${repo}/releases`, {
    per_page: "10",
  });
  return releases.filter((r) => new Date(r.published_at) >= since);
}

// ---------------------------------------------------------------------------
// GitHub Discussions (GraphQL — the REST endpoint ignores sort/since and only
// returns discussions in ascending number order, unusable for "recently
// updated" queries on high-volume repos)
// ---------------------------------------------------------------------------

/** Max discussion pages to fetch per repo per run (100 discussions/page). */
const MAX_DISCUSSION_PAGES = 3;

const DISCUSSIONS_QUERY = `
query Discussions($owner: String!, $name: String!, $cursor: String) {
  repository(owner: $owner, name: $name) {
    discussions(first: 100, after: $cursor, orderBy: {field: UPDATED_AT, direction: DESC}) {
      pageInfo { hasNextPage endCursor }
      nodes {
        number
        title
        url
        body
        createdAt
        updatedAt
        category { name }
        author { login }
        comments { totalCount }
      }
    }
  }
}`;

interface DiscussionNode {
  number: number;
  title: string;
  url: string;
  body?: string | null;
  createdAt: string;
  updatedAt: string;
  category?: { name?: string } | null;
  author?: { login?: string } | null;
  comments?: { totalCount?: number } | null;
}

interface DiscussionsResponse {
  repository?: {
    discussions?: {
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
      nodes: DiscussionNode[];
    };
  };
}

async function githubGraphql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const resp = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env["GITHUB_TOKEN"] ?? ""}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!resp.ok) throw new Error(`GitHub GraphQL error ${resp.status}: ${await resp.text()}`);
  const payload = (await resp.json()) as { data?: T; errors?: { message: string }[] };
  if (payload.errors?.length) {
    throw new Error(`GitHub GraphQL error: ${payload.errors.map((e) => e.message).join("; ")}`);
  }
  return payload.data as T;
}

function mapDiscussion(n: DiscussionNode): GitHubItem {
  return {
    number: n.number,
    title: n.title,
    // Discussions have no open/closed lifecycle surfaced in this query.
    state: "open",
    user: { login: n.author?.login ?? "unknown" },
    labels: [],
    created_at: n.createdAt,
    updated_at: n.updatedAt,
    comments: n.comments?.totalCount ?? 0,
    body: (n.body ?? "").slice(0, 2000) || null,
    html_url: n.url,
    category: n.category?.name,
  };
}

/**
 * Fetch discussions updated since `since`, newest-updated first (GraphQL).
 * Used for repos that disabled Issues/PRs (e.g. deepseek-ai/deepseek-harness).
 */
export async function fetchRecentDiscussions(repo: string, since: Date): Promise<GitHubItem[]> {
  const [owner, name] = repo.split("/");
  if (!owner || !name) throw new Error(`Invalid repo for discussions: ${repo}`);

  const items: GitHubItem[] = [];
  let cursor: string | null = null;

  for (let page = 0; page < MAX_DISCUSSION_PAGES; page++) {
    const result: DiscussionsResponse = await githubGraphql<DiscussionsResponse>(DISCUSSIONS_QUERY, {
      owner,
      name,
      cursor,
    });
    const discussions = result.repository?.discussions;
    if (!discussions) break;

    // Nodes are sorted by updated_at desc; once one falls before `since`,
    // every later node/page is older too.
    const fresh: DiscussionNode[] = [];
    for (const node of discussions.nodes) {
      if (new Date(node.updatedAt) >= since) fresh.push(node);
      else break;
    }
    for (const node of fresh) items.push(mapDiscussion(node));

    const pageInfo = discussions.pageInfo;
    const hasNextPage = pageInfo.hasNextPage;
    const endCursor = pageInfo.endCursor;
    if (!hasNextPage || !endCursor || fresh.length < discussions.nodes.length) break;
    cursor = endCursor;
  }
  return items;
}

export async function ensureLabel(name: string, color: string): Promise<void> {
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  const resp = await fetch(`https://api.github.com/repos/${digestRepo}/labels`, {
    method: "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({ name, color }),
  });
  if (!resp.ok && resp.status !== 422) {
    throw new Error(`Failed to create label "${name}": ${await resp.text()}`);
  }
}

/**
 * Fetch trending skills data from a skills repo (e.g. anthropics/skills).
 * PRs sorted by popularity (comment count); issues sorted by comments.
 * No `since` filter — we want all-time hot items, not just the last 24 h.
 */
export async function fetchSkillsData(repo: string): Promise<{ prs: GitHubItem[]; issues: GitHubItem[] }> {
  const [prs, issuesRaw] = await Promise.all([
    githubGet<GitHubItem[]>(`https://api.github.com/repos/${repo}/pulls`, {
      state: "open",
      sort: "popularity",
      direction: "desc",
      per_page: "50",
    }),
    githubGet<GitHubItem[]>(`https://api.github.com/repos/${repo}/issues`, {
      state: "all",
      sort: "comments",
      direction: "desc",
      per_page: "50",
    }),
  ]);
  return { prs, issues: issuesRaw.filter((i) => !i.pull_request) };
}

const GITHUB_ISSUE_BODY_LIMIT = 65536;
const TRUNCATION_NOTICE = "\n\n---\n> ⚠️ 内容超过 GitHub Issue 上限，完整报告见提交的 Markdown 文件。";

export async function createGitHubIssue(title: string, body: string, label: string): Promise<string> {
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  if (body.length > GITHUB_ISSUE_BODY_LIMIT) {
    body = body.slice(0, GITHUB_ISSUE_BODY_LIMIT - TRUNCATION_NOTICE.length) + TRUNCATION_NOTICE;
  }
  const LABEL_COLORS: Record<string, string> = {
    openclaw: "e11d48",
    trending: "f9a825",
    hn: "ff6600",
    weekly: "7c3aed",
    monthly: "0d9488",
    "digest-en": "1d76db",
    "openclaw-en": "f472b6",
    "web-en": "6366f1",
    "trending-en": "fbbf24",
    "hn-en": "fb923c",
  };
  await ensureLabel(label, LABEL_COLORS[label] ?? "0075ca");
  const resp = await fetch(`https://api.github.com/repos/${digestRepo}/issues`, {
    method: "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, labels: [label] }),
  });
  if (!resp.ok) throw new Error(`Failed to create issue: ${await resp.text()}`);
  const data = (await resp.json()) as { html_url: string };
  return data.html_url;
}
