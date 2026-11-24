# OpenClaw 生态日报 2026-11-24

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-24 05:40 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-11-24

> **数据口径**：过去 24 小时 Issues 更新 500 条（新开/活跃 340，已关闭 160），PR 更新 500 条（待合并 300，已合并/关闭 200），新版本发布 2 个。本报告基于评论数 Top 50 Issues 与 Top 30 PRs 的采样分析。

---

## 1. 今日速览

OpenClaw 今日维持**高强度吞吐**：Issues 与 PR 各触及 500 条更新，其中 160 条 Issue 关闭、200 条 PR 合入/关闭，说明维护团队的分流与清理节奏跟得上流入速度。版本线上，`2026.11.10-beta.3` 与 `beta.2` 连续发布，主题高度聚焦在**更新恢复能力（update recovery）**与**后台委托工作可靠性**，这是对近期大量"升级中断导致安装不可用"反馈的正面回应。但项目健康度呈现明显的**双面性**：一方面 UX 打磨与更新路径加固的 PR 成批落地，另一方面 P0/P1 回归仍在涌入——今日新开的 Discord provider 初始化失败（#204283）与仍未关闭的 gRPC code-mode 工具执行崩溃（#203869，自标 Beta release blocker）构成对当前 beta 线的直接压力。讨论热度最集中的仍是 **prompt cache 复用失效**（单条 27 评论，同主题跨 4 个 Issue 累计 50+ 评论），这是当前社区感知最强的成本与延迟痛点。

---

## 2. 版本发布

### v2026.11.10-beta.3
🔗 https://github.com/openclaw/openclaw/releases

**核心变更**
- **更新恢复（Update recovery）**：让被中断的包更新与源码更新保持可恢复状态，覆盖**跨 schema 变更**的中断以及**重启机器**的场景。关联 PR：#200273、#200366、#200460、#200866、#200994、#201600。贡献者 @fuller-stack-dev。
- **可靠的委托工作（Reliable delegated work）**：发布说明在此处截断，标题指向子智能体/委托任务的完成态保持。

### v2026.11.10-beta.2
**核心变更**
- **更新恢复**：包替换被中断时保持 OpenClaw 仍可运行，并让下一次更新在崩溃或重启后能安全收尾。关联 PR：#200273、#200366、#200460、#200550、#200994。
- **可靠的后台工作**：保留已完成的……（说明截断）。贡献者同上。

**破坏性变更**：两个版本的发布说明均**未显式标注 breaking change**。

**迁移注意事项（基于同期 Issue 反推）**
- `2026.11.4 → 2026.11.10-beta.1` 的 npm 安装升级路径存在已知摩擦：[#203442](https://github.com/openclaw/openclaw/issues/203442) 报告候选版本验证通过、但激活阶段的 `openclaw doctor` 以 `Plugin deepseek Doctor source must be prepared before loading` 失败，提示插件 Doctor 源的准备顺序在 beta 线中发生了语义变化。建议升级前先执行 `openclaw doctor` 并确认插件槽位状态。
- 跨 schema 变更的中断恢复是 beta.3 的主打能力，但 [#186326](https://github.com/openclaw/openclaw/issues/186326)（Windows 托管更新遇 SQLite 文件锁超时）类问题在今日仍被关闭讨论，**Windows 原生安装的升级路径风险高于 Linux/macOS**。

---

## 3. 项目进展

今日 200 条 PR 合入/关闭，结构性推进集中在三条线：

**① 更新路径加固（与 beta 主题一致）**
- [#201093](https://github.com/openclaw/openclaw/pull/201093) **已关闭** — 在更新停止 Gateway **之前**准备插件下载，缩短安装不可用窗口。
- [#200908](https://github.com/openclaw/openclaw/pull/200908) **已关闭** — 更新就绪后恢复冷历史导航，避免 Doctor 构建导航期间 Gateway 长时间停摆。
- [#200916](https://github.com/openclaw/openclaw/pull/200916) **仍在审** — 更新准备期跳过与选中插件数据库无关的 agent 文件树遍历，直接针对大型安装的性能损耗。
→ 评价：这三条 PR 与 beta.2/beta.3 的更新恢复说明形成闭环，是**本周期最有价值的一组成体系推进**。

**② Control UI 可用性成批打磨（单一作者系列）**
@vyctorbrzezowski 今日集中提交 8 条"让聊天里的工具活动可读"系列 PR：[#204399](https://github.com/openclaw/openclaw/pull/204399)（智能体与聊天工具）、[#204402](https://github.com/openclaw/openclaw/pull/204402)（文件与 shell）、[#204404](https://github.com/openclaw/openclaw/pull/204404)（浏览器与设备）、[#204406](https://github.com/openclaw/openclaw/pull/204406)（消息与通话）、[#204407](https://github.com/openclaw/openclaw/pull/204407)（媒体）、[#204408](https://github.com/openclaw/openclaw/pull/204408)（记忆与知识）、[#204409](https://github.com/openclaw/openclaw/pull/204409)（平台动作），加上 [#204414](https://github.com/openclaw/openclaw/pull/204414)（Linear 艺术图）。这批 PR 均带截图证明，但多数处于 `waiting on author` 状态。
→ 评价：这是对"聊天记录里工具名晦涩、无法判断 agent 做了什么"这一长期 UX 债的系统性偿还，方向正确但**尚未进入合并通道**。

**③ 正确性修复**
- [#203947](https://github.com/openclaw/openclaw/pull/203947) **已关闭** — 点击旧会话链接不再触发整页重载（消除"Connecting to OpenClaw"全屏闪烁）。
- [#204325](https://github.com/openclaw/openclaw/pull/204325) **已关闭** — 未配置的 Cyber 类模型在 Control UI 之外也强制运行于 Daybreak Red 访问档，修复 OpenAI 返回 400 `invalid_access_program` 的问题。
- [#204415](https://github.com/openclaw/openclaw/pull/204415) / [#204417](https://github.com/openclaw/openclaw/pull/204417) **并行提交** — 同一根因（`src/plugin-sdk/llm.ts` 相对路径 re-export 导致 symbol 在打包后被复制成两份）造成 Gemini 在**已发布构建**中收不到附加视频。这是典型的打包期模块标识符失真问题，值得合并后回归验证。

**整体推进度评估**：本日无架构级变更，属于"可用性 + 更新可靠性"的稳步推进期。实质工程增量集中在更新路径，UI 阅读体验的收益需待合并后验证。

---

## 4. 社区热点

| 排名 | 条目 | 评论 | 状态 |
|---|---|---|---|
| 1 | [#182891](https://github.com/openclaw/openclaw/issues/182891) Prompt cache 从不复用，每次请求 `cache read dropped N -> 0` | 27 | OPEN · P1 |
| 2 | [#157989](https://github.com/openclaw/openclaw/issues/157989) 插件源码捕获每 CLI 命令重写 1.1–1.4 GB、每 Gateway 启动 6.5 GB | 24 | OPEN · P1 |
| 3 | [#143017](https://github.com/openclaw/openclaw/issues/143017) Prompt-cache：持久会话重写前缀的五种方式（21.3M cache-write tokens） | 19 | OPEN · P2 (stale) |
| 4 | [#196199](https://github.com/openclaw/openclaw/issues/196199) 2026.10.10 起原生 Codex helper 完成无法恢复父会话 | 17 | OPEN · P1 |
| 5 | [#158127](https://github.com/openclaw/openclaw/issues/158127) 多智能体运行时发布失败 + Codex 启动超时 | 16 | **CLOSED** |

**诉求分析**

- **Prompt cache 是当前第一痛点，且呈现"多点独立复现"特征**。#182891（OpenAI 兼容 `opencode-go` / `glm-5.3-flash`）、#143017（949 次线上抓包）、[#186683](https://github.com/openclaw/openclaw/issues/186683)（claude-cli，界面每变一次全量重写）、#155878 四条独立报告指向**同一类根因**：信封重写、`runtimeContextCarrier` 变更、以及轮内不可解释的 cache read 归零。用户已从"报 Bug"升级到"提供生产级 wire capture + token 账单"，证据成熟度很高。**这是成本问题也是延迟问题，建议作为独立工作流立项而非逐条 triage。**
- **插件运行时的 I/O 放大**（#157989）暴露的是启动期无缓存设计：每次进程加载都全量 byte-copy + SHA-256 所有外部插件文件（含大型原生二进制）。已有对应功能请求 [#181784](https://github.com/openclaw/openclaw/issues/181784) 提出内容寻址对象存储作为解法，但今日无对应实现 PR，**诉求与方案已对齐、缺执行**。
- **#158127 的关闭**是一个积极信号：多智能体 macOS Gateway 的运行时发布竞态（`prepared model runtime publication was superseded`）在两个月后得到收敛。

---

## 5. Bug 与稳定性

### P0 — 需立即关注

| Issue | 问题 | Fix PR |
|---|---|---|
| [#203869](https://github.com/openclaw/openclaw/issues/203869) | 工具执行全线失败：`gRPC code-mode session closed` / `code-mode host transport failed` / `BrokenPipe`，Mac mini 上无法执行任何工具。**自标 Beta release blocker: Yes**，回归类 | ❌ 无（标记 `needs-info`） |
| [#202518](https://github.com/openclaw/openclaw/issues/202518) | `claude-cli` 在长会话中 `sessions_spawn` + `sessions_yield` 后永不关闭，后续轮次复用已死 live session（2026.11.6，亦见于 11.5） | ❌ 无 |
| [#201468](https://github.com/openclaw/openclaw/issues/201468) | macOS 启动告警对"捆绑 CLI 拒绝向前 schema 迁移"给出通用凭据恢复步骤，误导用户 | ✅ 有 linked PR |

> ⚠️ **风险提示**：`beta.3` 已发布，而 #203869 仍自述为发布阻塞项且无 fix PR。需要确认该问题是否在 beta.3 之后才浮现，否则当前 beta 线的可发布性存疑。

### P1 — 高优先级回归与状态丢失

- [#182891](https://github.com/openclaw/openclaw/issues/182891) prompt cache 归零（见上）— 无 fix PR
- [#157989](https://github.com/openclaw/openclaw/issues/157989) SSD 磨损（每启动 6.5 GB 写入）— 无 fix PR
- [#196199](https://github.com/openclaw/openclaw/issues/196199) Codex helper 完成态无法恢复父会话，**导致 goals 暂停、用户被锁在助手之外** — ✅ 有对应修复 PR [#188229](https://github.com/openclaw/openclaw/pull/188229)（P1，自 10-30 起等待维护者）
- [#204283](https://github.com/openclaw/openclaw/issues/204283) **今日新开**：`2026.11.5 → 2026.11.7` 后启用 `commands.nativeSkills` 时 Discord provider 永不完成 client init，健康监控陷入静默重启循环 — 无 fix PR
- [#191476](https://github.com/openclaw/openclaw/issues/191476) Matrix 房间在 `image_generate` 完成 run 与新入站消息竞态后卡在 `Plugin matrix consumer is closed` — 无 fix PR
- [#195497](https://github.com/openclaw/openclaw/issues/195497) Gateway 进程 17 小时内内存增长至 ~3 GB（2026.11.1）— 无 fix PR
- [#201974](https://github.com/openclaw/openclaw/issues/201974) 直接 `npm install -g` 回退后 plugin-skills junction 断裂，`doctor` 无法修复，Gateway 拒绝启动 — 标记 `needs-info`
- [#203442](https://github.com/openclaw/openclaw/issues/203442) 升级至 beta.1 后 Doctor 失败（插件 Doctor 源未准备）— 无 fix PR
- [#196803](https://github.com/openclaw/openclaw/issues/196803) Codex 工具后收尾失败 `invalid_content/context_unavailable`，子结果不可访问 — 无 fix PR
- [#55792](https://github.com/openclaw/openclaw/issues/55792) Gateway 重启窗口内的入站消息被静默丢弃（自 2026-03 起未解）
- [#161403](https://github.com/openclaw/openclaw/issues/161403) 健康的 agent 数据库完整性校验耗时 128.8 秒，阻塞启动

### P2 — 稳定性相关的结构性欠债
[#143973](https://github.com/openclaw/openclaw/issues/143973) `view_image` 全量 base64 内联入 transcript，1.3% 事件占 80% 存储字节；[#188377](https://github.com/openclaw/openclaw/issues/188377) 孤立 `running` 会话窗口存活数周且无法终止；[#153430](https://github.com/openclaw/openclaw/issues/153430) 深层 `$include` 配置在后续加载阶段 RangeError（已关闭）。

**趋势判断**：今日稳定性问题集中在两条主线——**安装/更新路径**（#203442、#201974、#200747、#186326）与**会话/委托状态一致性**（#202518、#196199、#196803、#191476、#188377）。前者正被 beta 迭代覆盖，后者尚无系统性方案，且与 prompt cache 问题共享"会话状态被意外重写"的根因假设，值得合并排查。

---

## 6. 功能请求与路线图信号

**高概率纳入后续版本（已有配套 PR 或明确实现路径）**

- **插件源内容寻址存储** — [#181784](https://github.com/openclaw/openclaw/issues/181784) 复用已验证的插件源捕获字节，避免每次启动逐文件复制。解法清晰、与 P1 #157989 直接对应，且更新路径 PR（#200916、#201093）已在削减同类 I/O，**是下一轮性能工作的最佳候选**。
- **智能体自触发上下文压缩** — [#6757](https://github.com/openclaw/openclaw/issues/6757)（8 评论、2 👍、创建于 2026-02）请求提供 self-compact 工具，让 agent 无需用户介入即可压缩自身会话。与 prompt cache / 会话体积问题高度协同，长期悬置但价值随上下文成本上升而增加。

**方向明确、待产品决策**

- [#55792](https://github.com/openclaw/openclaw/issues/55792) 网关重启后补收错过的入站消息 — 与 beta 的 "update recovery" 主题天然衔接，若更新恢复能力继续深化，这条 P1 有较大概率被纳入同一条路线。
- [#116052](https://github.com/openclaw/openclaw/issues/116052) MCP OAuth 支持预注册客户端（`authorization_code`），覆盖不支持 DCR 的企业授权服务器 — 标记 `needs-security-review`，是当前 MCP 生态接入的主要阻塞点。
- [#143375](https://github.com/openclaw/openclaw/issues/143375) `pdf` 工具在无 vision 模型时对扫描件完全不可达，因为 vision 门槛在文档打开**之前**生效 — 逻辑顺序问题，修复成本低但被标 stale。
- [#166586](https://github.com/openclaw/openclaw/issues/166586) 订阅 MCP Events 并为每个事件启动 agent run，对齐 `hooks.mappings` 的能力。
- [#167341](https://github.com/openclaw/openclaw/issues/167341) 允许运维覆盖模型请求失败的面向用户文案（当前为固定英文句子）。
- [#136271](https://github.com/openclaw/openclaw/issues/136271) msteams 按团队动态解析 SharePoint 站点，去除硬编码 `sharePointSiteId`。

**已被关闭但结论值得记录**：[#138366](https://github.com/openclaw/openclaw/issues/138366)（Dreams 页面的 dreaming provider 由 MemoryPluginCapability 驱动）与 [#159743](https://github.com/openclaw/openclaw/issues/159743)（安装感知的升级后调查）均以 `needs-product-decision` 关闭，说明这两块的产品边界尚未确定。

---

## 7. 用户反馈摘要

**真实痛点（按提及频次排序）**

1. **成本与延迟不可控** — 用户能精确报出 token 账单："parent turn $0.04 vs child $14.14"（[#130257](https://github.com/openclaw/openclaw/issues/130257)，ACP 委托运行在 Tasks ledger 中**完全不记账**，子运行花费不可归属）。prompt cache 失效进一步放大这一焦虑：用户开始用 wire capture 统计 `cache read dropped N -> 0` 的出现频率。
2. **升级是不可预测的风险事件** — Windows 用户报 `npm EIDLETIMEOUT` 560 秒后失败、加长超时重试 462 秒成功（[#200747](https://github.com/openclaw/openclaw/issues/200747)）；macOS 上 app 2026.11.5 与 npm Gateway 2026.11.4 版本错配导致启动凭据准备失败（#201468）；直接 npm 安装后 junction 断裂、`doctor --fix` 无效（#201974）。**"能不能升级成功"本身成了用户的核心不确定项。**
3. **磁盘与内存的物理代价** — 自托管用户对 SSD 写入量高度敏感（#157989），Windows Server 弱盘用户对 80% 存储被 base64 图片占据感到不安（#143973），长跑用户观察到 3 GB/17h 的内存爬升（#195497）。这些都是**长期运行型部署**特有的诉求。
4. **可观测性缺口** — 出站队列 `unknown_after_send` 条目没有 CLI 可查可结算（[#183048](https://github.com/openclaw/openclaw/issues/183048)）；未配置外部渠道时失败告警**静默不可达**（[#186990](https://github.com/openclaw/openclaw/issues/186990)）。用户能感知"消息没发出去"，但拿不到"为什么"。
5. **会话状态"卡死"无出口** — 孤立 running 会话存活数周、13k 活跃事件，没有任何受支持命令能结束或归档（#188377）；`sessions_send` 到活跃子智能体偶发 `session writer claim changed`（[#164533](https://github.com/openclaw/openclaw/issues/164533)）。

**使用场景画像（从 Issue 环境段反推）**
Proxmox 上的 Linux x64 自托管、macOS 原生 App + npm Gateway 混合部署、Windows Server 2022 + Windows 计划任务、WSL2 连接 Windows Chrome；同时接入 Slack / Matrix / Telegram / Discord / 飞书；后端混用 `opencode-go`、`claude-cli`、Codex、ACP(`acpx`)；单机 10 个 agent、13 个 cron job。**典型用户是重度自托管的多智能体运维者，不是轻量尝鲜者。**

**满意侧信号**
发布说明中对 @fuller-stack-dev 的更新恢复工作明确致谢，且该类修复被反复迭代（beta.2 → beta.3 同一议题继续加码），说明维护方对"更新不可用"这一最高优先级体验问题响应及时。用户的复现质量（wire capture、SQLite 字节统计、精确耗时）也反映社区对项目投入度高。

**不满意侧信号**
多个 P1 长期挂 `clawsweeper:no-new-fix-pr`（无修复 PR），而同期大量 UX 打磨 PR 在排队——**用户可能感知为"打磨界面优先于修复成本与稳定性"**，这是需要主动沟通预期的信号。

---

## 8. 待处理积压（需维护者关注）

**长期未响应的高价值 Issue**

| Issue | 年龄 | 评论 | 积压原因 |
|---|---|---|---|
| [#55792](https://github.com/openclaw/openclaw/issues/55792) 网关重启后补收消息 | ~8 个月（2026-03-27） | 10 | P1，`needs-product-decision`，但技术方案明确 |
| [#6757](https://github.com/openclaw/openclaw/issues/6757) self-compact 工具 | ~9.5 个月（2026-02-02） | 8 | P2，`needs-product-decision`，社区 2 👍 |
| [#143017](https://github.com/openclaw/openclaw/issues/143017) prompt-cache 前缀重写 | ~2.5 个月 | 19 | P2 + stale，但**与 P1 #182891 同根因**，建议合并立项 |
| [#130257](https://github.com/openclaw/openclaw/issues/130257) ACP 子运行成本不可归属 | ~3 个月 | 11 | P2，`fix-shape-clear` 已具备 |
| [#143375](https://github.com/openclaw/openclaw/issues/143375) pdf 依赖 vision 门控 | ~2.5 个月 | 11 | P2 + stale，修复成本低 |
| [#116052](https://github.com/openclaw/openclaw/issues/116052) MCP OAuth 预注册客户端 | ~4 个月 | 10 | 卡在 security review |
| [#161158](https://github.com/openclaw/openclaw/issues/161158) `gateway restart` 失败退出码 0（60s 硬编码） | ~2 个月 | 12 | P2，行为误导性强 |
| [#193383](https://github.com/openclaw/openclaw/issues/193383) Doctor tool-policy 无法验证 | ~19 天 | 6 | `needs-live-repro` |

**长期等待审查的 PR**

- [#188229](https://github.com/openclaw/openclaw/pull/188229) **P1 · Codex 原生完成 handoff** — 自 2026-10-30 起 `ready for maintainer look`，CI 全绿，直接修复 P1 #196199（用户被锁在助手之外）。**这是当前积压中影响面最大的一条。**
- [#188256](https://github.com/openclaw/openclaw/pull/188256) / [#186963](https://github.com/openclaw/openclaw/pull/186963) **memory-wiki 性能** — 分别处理搜索超时与重复全量扫描，均自 10 月底等待，`proof: sufficient`。
- [#203469](https://github.com/openclaw/openclaw/pull/203469) 主模型本地调度失败后重试 — 修复"未发生 provider 请求却消耗 30s 恢复探针"的逻辑缺陷。

**积压结构观察**
今日样本中约 **半数 OPEN Issue 带 `stale` 标记却仍在 2026-11-24 活跃更新**——说明自动 stale 清理与真实讨论热度脱节，stale 标签正在失去筛选价值，可能掩盖 #143017、#143375 这类"旧但重要"的条目。建议维护者对 stale 规则做一次校准，或引入"stale 但评论仍在增长"的二次标记。

---

## 附：项目健康度小结

| 维度 | 评估 | 依据 |
|---|---|---|
| 吞吐量 | 🟢 健康 | 24h 内 1000 条工单更新、200 条合入/关闭 |
| 发布节奏 | 🟢 健康 | beta.2/beta.3 连续发布，主题收敛不漂移 |
| 响应时效 | 🟡 分化 | UX 类 PR 快速进入审查；P1 修复 PR（#188229）积压近一个月 |
| 稳定性 | 🔴 承压 | 3 个 P0、10+ 个 P1 在开，且含一个自标发布阻塞项 |
| 社区质量 | 🟢 优秀 | 用户提供 wire capture、字节级统计等生产级证据 |
| 技术债可见度 | 🟡 待改进 | stale 标签与真实热度脱节；prompt cache 同根因分散在 4 个 Issue |

**一句话结论**：项目处于"高速迭代 + 稳定性承压"的典型 beta 周期，更新可靠性这条主线推进扎实，但**会话状态一致性与 prompt cache 这两块共享根因的问题域尚未被作为整体立项**，正在持续消耗用户信任与运维成本。

---

## 横向生态对比

> 说明：以下对比基于各项目日报的“过去 24 小时”口径。DeepSeek Harness 未启用 Issues/PR，以 Discussions 计；PicoClaw 评论数据缺失，健康度按维护动作判断；不同项目统计口径存在差异，横向比较以量级和结构为主。

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入“高频迭代 + 生产化补课”阶段：头部项目日更数百至千级工单，长尾项目则处于清理、同步或质量巩固期。竞争焦点正从“功能是否覆盖”转向**更新可靠性、会话状态一致性、prompt cache/成本、安全凭证边界与可观测性**。多通道、多平台、插件生态已成标配，但静默失败、升级回归、PR 评审积压仍是主要信任风险。发布节奏与评审吞吐正在成为项目成熟度的分水岭。

## 2. 各项目活跃度对比

| 项目 | Issues/Discussions 更新 | PR 更新 | Release | 健康度评估 |
|---|---:|---:|---:|---|
| **OpenClaw** | Issues 500（新/活跃 340，关闭 160） | 500（待合 300，合/关 200） | 2 个 beta | 🟡 高速迭代但稳定性承压：3 个 P0、10+ P1，含自标 beta blocker |
| **Zeroclaw** | Issues 50（新/活跃 22，关闭 28） | 50（待合 45，合/关 5） | 0 | 🟡 Issue 治理良好，PR 交付偏慢；安全 RFC 阻塞 10+ PR |
| **PicoClaw** | Issues 0 | 5（全部 closed，待合 0） | 0 | 🟡 清理/同步型活跃，社区信号偏弱 |
| **QwenPaw** | Issues 22（新/活跃 16，关闭 6） | 36（待合 30，合/关 6） | 0 | 🟡 开发活跃、评审瓶颈明显；Console 回归集中 |
| **Hermes Agent** | Issues 500（新/活跃 329，关闭 171） | 500（待合 381，合/关 119） | 1 个 canary | 🟡 高活跃、PR 积压；安全与资源泄漏问题待闭环 |
| **AstrBot** | Issues 4（新/活跃 2，关闭 2） | 48（待合 32，合/关 16） | 0 | 🟡 开发活跃、32 条待合；PR 依赖栈有滞留风险 |
| **DeepSeek Harness** | Discussions 161 | 未启用 PR | 0 | 🟡 社区反馈密集但发布/闭环信号弱；桌面稳定性问题突出 |

**结构观察**：OpenClaw 与 Hermes Agent 处于 500/500 量级，但 OpenClaw 的 PR 合/关率约 40%，Hermes 约 23.8%，OpenClaw 交付吞吐更高；Zeroclaw、QwenPaw、AstrBot 处于 36–50 PR 的中等活跃层；PicoClaw 与 DeepSeek Harness 则分别处于维护清理和讨论密集但 Release 空窗状态。

## 3. OpenClaw 在生态中的定位

**优势**
- **规模最大、节奏最稳的通用型参照项目**：日更新 Issues/PR 各 500 条，合/关 200 条 PR，连续发布 beta.2/beta.3，主题收敛在“更新恢复 + 可靠委托工作”，说明维护侧有明确主线。
- **工程覆盖面最广**：Gateway、Control UI、插件 SDK、多 provider、多 channel、委托/ACP、prompt cache 等议题同时推进，生态复杂度显著高于多数同类。
- **社区证据质量高**：用户提供 wire capture、SQLite 字节统计、精确 token 账单，问题反馈已接近生产级运维诊断。

**技术路线差异**
- OpenClaw 走“**通用自托管 Agent Gateway + Control UI + 插件 SDK + 多智能体委托**”路线；Zeroclaw 更偏“**安全凭证代理与最小权限**”；Hermes 强调“**多 profile、skills 治理、桌面/CLI/网关一体**”；QwenPaw/AstrBot 更偏“**Console/IM 多通道 + 插件生态**”；DeepSeek Harness 是“**桌面优先 + dsh web/ACP**”的 harness 形态。
- OpenClaw 的复杂度最高，因而也最早暴露更新恢复、session 一致性、prompt cache 复用等系统性难题。

**社区规模对比**
- 样本中 OpenClaw 日更新 1000 条工单/PR，Hermes 同为 500/500 量级；其余项目多在 4–50 Issues、5–50 PR。按活跃度，OpenClaw 属于第一梯队，且 Release 节奏比 Hermes 更稳定。
- 但 OpenClaw 的短板也最显性：P0 #203869 自标 beta blocker 且无 fix PR，prompt cache 同根因分散在 4 个 Issue，P1 修复 PR #188229 积压近一个月。其定位是“**生态规模领先，但稳定性债务最重**”。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **安全凭证与最小权限** | Zeroclaw、Hermes、AstrBot、OpenClaw | Zeroclaw RFC #12422 要求 Agent 使用服务但不暴露凭证；Hermes #82936 多 profile 密钥泄漏、#59293 `config set` 绕过写保护；AstrBot #10527 MCP OAuth、#11283 工具执行前审批；OpenClaw #116052 MCP OAuth 预注册客户端卡在 security review |
| **Prompt cache 与成本计量** | OpenClaw、QwenPaw、Zeroclaw、Hermes | OpenClaw #182891/#143017 出现 `cache read dropped N -> 0`；QwenPaw #8060 修复缓存 token 漏计、#8707 cron token 未入账；Zeroclaw #12660 花费口径错误、#8321 缓存策略冰封；Hermes #157320 远端模型定价 manifest |
| **会话状态一致性与恢复** | OpenClaw、QwenPaw、AstrBot、Hermes、DeepSeek Harness | OpenClaw 更新恢复 beta、#202518 session 复用死会话、#196199 Codex handoff；QwenPaw #8864 流式中断不重试、#11349 session waiter；AstrBot #9753 waiter 身份隔离；Hermes #109765 cron 快照有损；DeepSeek #9692 跨会话记忆 |
| **更新/安装/跨平台可靠性** | OpenClaw、Zeroclaw、QwenPaw、Hermes、DeepSeek Harness | OpenClaw Windows SQLite 锁、npm 升级摩擦；Zeroclaw Android/Termux S1 关闭；QwenPaw Windows ReMe 索引失败；Hermes macOS 桌面启动/更新链路；DeepSeek Windows ECONNRESET 启动崩溃 |
| **多通道可靠性与可观测性** | OpenClaw、Zeroclaw、QwenPaw、AstrBot、Hermes | OpenClaw Discord #204283、Matrix #191476、出站队列 `unknown_after_send`；Zeroclaw Telegram 语音重试假死、Matrix 审批提示跑出 thread；QwenPaw WeChat 128 响应后静默失效 #8814；AstrBot KOOK 语音解析、群聊 bare @ 上下文；Hermes WhatsApp `@lid` 解析 |
| **插件/技能生态治理** | OpenClaw、Hermes、AstrBot、QwenPaw、PicoClaw | OpenClaw 插件源 I/O 放大 #157989、内容寻址 #181784；Hermes skills guard、符号链接误报、agent 自改 skills；AstrBot 插件市场分类 #11094、更新日志 #11337；QwenPaw 插件 SDK #8764/#8554；PicoClaw WIP 多智能体协作 #423 |
| **多智能体/委托可靠性** | OpenClaw、Zeroclaw、PicoClaw、AstrBot | OpenClaw 委托子运行成本不可归属 #130257、Codex helper 完成无法恢复父会话；Zeroclaw `delegate` 静默丢参 #12666；PicoClaw 多智能体共享上下文 WIP；AstrBot delegated sessions 内置工具修复 #11335 |

**共性判断**：社区已不满足于“能跑”，而是要求“**失败可见、成本可归属、权限可审计、升级可恢复、状态可收敛**”。其中 prompt cache 与会话状态重写很可能共享“会话/信封被意外重写”的根因，值得作为跨 Issue 工作流统一立项。

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 通用 Agent Gateway、Control UI、插件 SDK、委托/ACP、多 provider/channel | 重度自托管多智能体运维者 | Gateway + Control UI + 插件 SDK + 多智能体委托；覆盖面最广 |
| **Zeroclaw** | 安全凭证代理、vault 集成、SSH/浏览器/WebDAV 授权、通道可靠性 | 安全/运维敏感的自托管用户 | 原生 Rust 工具链、scoped credential brokering、TUI + 多渠道 |
| **PicoClaw** | 轻量/边缘配套、WebSocket 鉴权、上游同步、WIP 多智能体协作 | SIPEED/硬件与边缘开发者 | 下游定制分支 + 上游大同步；从动态看偏轻量/设备侧 |
| **QwenPaw** | Qwen/AgentScope 生态、Console、插件系统、cron/heartbeat、多渠道 | Qwen 生态与中文多通道部署用户 | Console + 插件/SDK + MCP；前端回归与计量准确性是当前重点 |
| **Hermes Agent** | 桌面/CLI/Gateway、多 profile、skills 治理、memory、安全边界 | 研究型/多 profile 自托管用户 | canary 桌面通道 + 多 profile 隔离 + skills guard；强调安全与资源泄漏治理 |
| **AstrBot** | IM 聊天机器人框架、插件市场、MCP OAuth、WebUI | 社区聊天机器人运营者 | 多 IM adapter + 插件市场 + WebUI；PR 依赖栈较多 |
| **DeepSeek Harness** | 桌面优先 harness、dsh web/desktop、ACP、插件生态 | DeepSeek API/桌面用户 | 未启用 Issues/PR，靠 Discussions 与 Releases；桌面认证与 Windows 启动稳定性是短板 |

## 6. 社区热度与成熟度

**分层判断：**

1. **规模化高速迭代层：OpenClaw、Hermes Agent**
   - 日更新 500 Issues + 500 PR，社区输入极强。
   - OpenClaw 发布节奏更稳，但 P0/P1 稳定性承压；Hermes PR 待合 381 条，评审吞吐是主要瓶颈，安全类议题占比高。

2. **安全架构决策窗口：Zeroclaw**
   - Issue 关闭率 56%，S1/S2 止血明显；但 PR 合并率仅 10%，RFC #12422 未决导致 10+ PR 链阻塞。
   - 处于“问题识别快、代码交付慢、架构决策关键期”。

3. **质量巩固/回归修复层：QwenPaw、AstrBot**
   - QwenPaw 受 2.3.0.post1 Console 渲染回归簇影响，移动端/iOS/可访问性问题集中；30 条待合 PR，评审瓶颈明显。
   - AstrBot 开发活跃，但 32 条待合 PR，且存在七 PR 依赖栈；长周期 PR #9753 已挂约 96 天，需分级评审。

4. **维护清理/同步层：PicoClaw**
   - 今日 0 Issue、5 PR 全部关闭、无 Release；以 WebSocket 鉴权、上游 1095 commits 同步、CI 调整为主。
   - 活跃度低，处于积压清理和代码同步期，需确认大型同步 PR 的实际合并质量。

5. **讨论密集但交付信号弱：DeepSeek Harness**
   - 161 条 Discussions 更新、0 Release、未启用 PR；桌面认证 Cookie 溢出、Windows ECONNRESET、空闲会话堆内存等问题未确认修复。
   - 社区热度高，但 Release 透明度与高严重度 Bug 闭环证据不足。

## 7. 值得关注的趋势信号

1. **Agent 进入“生产运维期”，更新恢复成为一等能力。** OpenClaw 连续 beta 聚焦 update recovery；Zeroclaw 的 Android/Termux、QwenPaw 的 Windows、Hermes/DeepSeek 的桌面启动问题都说明：安装/升级/平台兼容不再是边缘问题，而是用户信任的核心。

2. **安全边界从“权限开关”转向“凭证代理 + 最小权限 + 可审计”。** Zeroclaw RFC #12422、Hermes #82936/#59293、AstrBot MCP OAuth 共同指向：Agent 可以代表用户行动，但凭证不能进入 prompt、聊天、技能文本或生成代码；需要别名、精确 origin、显式授权、响应清洗和 vault 集成。

3. **Prompt cache 与会话状态需要统一治理。** OpenClaw 的 cache read 归零、QwenPaw 的缓存 token 漏计、Zeroclaw 的缓存策略冰封，说明成本问题与状态重写问题高度耦合。对开发者而言，设计 cache-friendly 的 prompt envelope、稳定 session key、可解释的 cache 命中日志，比逐条修 Bug 更重要。

4. **“静默失败”是最伤信任的稳定性问题。** OpenClaw 出站队列不可结算、Zeroclaw Telegram 通道假死、QwenPaw WeChat 128 响应后静默失效、AstrBot 群聊上下文缺失，都要求引入 dead-letter、通道健康检查、失败可见性和 per-run ledger。

5. **多通道/多平台平权成为硬需求。** 移动端 375px、iOS WebKit、Android/Termux、Windows Server、macOS 桌面、WSL2 等场景反复出现；发布前平台冒烟测试与可访问性验收将逐步成为标配。

6. **插件/技能生态治理进入深水区。** 插件源 I/O 放大、skills 跨项目污染、agent 自改 skills、插件市场分类、更新日志缺失，说明生态扩展后需要 manifest、签名/校验、变更透明、保护开关和供应链审计。

7. **PR 评审吞吐正在成为生态瓶颈。** Zeroclaw 合并率 10%、Hermes 待合 381、QwenPaw 待合 30、AstrBot 待合 32；多个高价值修复卡在 review。对维护者而言，建立 XS/S 快速通道、XL PR 分级 SLA、依赖栈合并节奏，比继续扩大贡献者入口更紧迫。

8. **讨论热度不能替代 Release 交付。** DeepSeek Harness 的 161 条 Discussions 与 0 Release 形成鲜明对比；对开发者选型而言，应同时看社区热度、Release 频率、高严重度 Issue 闭环率和 PR 合并率。

**对 AI 智能体开发者的参考**：优先把更新幂等/恢复、会话状态机、cache 稳定 envelope、凭证代理、失败可观测、per-run 成本归属设计为架构能力，而非后期补丁；否则项目进入规模化自托管后，会同时被成本、延迟、升级失败和信任问题反噬。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目日报（2026-11-24）

## 1. 今日速览

Zeroclaw 今日维持高强度迭代：24 小时内 Issues 更新 50 条（新开/活跃 22、关闭 28），关闭量高于新增，净积压减少 6 条，Issue 侧吞吐健康。PR 侧则明显淤积——更新 50 条，仅 5 条合并/关闭（合并率 10%），45 条待合并，评审而非开发已成为主要瓶颈。安全凭证作用域是绝对主线：RFC [#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) 牵动 10 余个 PR 与 2 个 RFC，形成一次跨模块的凭证代理重构。今日无新版本发布，已关闭的 28 个 Issue 的修复价值将延后到下一个 release 才能兑现。整体健康度评估：**Issue 治理良好，PR 交付偏慢，安全架构处于关键决策窗口**。

---

## 2. 版本发布

本周期无新版本发布（0 个）。从 Issue 中可观察到当前线上版本线索：用户报告涉及 **v0.8.7**（[#12390](https://github.com/zeroclaw-labs/zeroclaw/issues/12390)）与 **v0.8.5**（[#10901](https://github.com/zeroclaw-labs/zeroclaw/issues/10901)）。由于今日关闭了多个 S1/S2 级缺陷但无 release，建议维护者评估是否发布一个补丁版本（0.8.x），尤其是 Android/Termux 与 Telegram 通道相关修复。

---

## 3. 项目进展

> 数据说明：本次样本展示的 20 条 PR 均为 OPEN，5 条已合并/关闭 PR 的明细未提供。以下以已关闭 Issue 及其关联 PR 推断今日推进。

**今日关闭 28 个 Issue，其中包含多个 S1「workflow blocked」级缺陷，项目在平台兼容性与通道可靠性上实质前进：**

| 方向 | 已关闭 Issue | 推进内容 |
|---|---|---|
| Android/Termux 平台修复 | [#11525](https://github.com/zeroclaw-labs/zeroclaw/issues/11525)、[#12075](https://github.com/zeroclaw-labs/zeroclaw/issues/12075) | quickstart 无法持久化配置、`/system/bin/sh` 无法 canonicalize 导致 shell 工具全失败——两个 S1 阻塞问题同时关闭，Android 端可用性恢复 |
| 通道可靠性 | [#10901](https://github.com/zeroclaw-labs/zeroclaw/issues/10901)、[#11758](https://github.com/zeroclaw-labs/zeroclaw/issues/11758)、[#11858](https://github.com/zeroclaw-labs/zeroclaw/issues/11858) | Mattermost 新 DM 首条消息丢失、WhatsApp Web 停止后仍打印配对二维码、headless 场景 `send_via` 虚假路由 |
| 工具与运行时正确性 | [#12390](https://github.com/zeroclaw-labs/zeroclaw/issues/12390)、[#12203](https://github.com/zeroclaw-labs/zeroclaw/issues/12203)、[#11896](https://github.com/zeroclaw-labs/zeroclaw/issues/11896)、[#11894](https://github.com/zeroclaw-labs/zeroclaw/issues/11894)、[#11916](https://github.com/zeroclaw-labs/zeroclaw/issues/11916) | shell 吞 stderr、`web_search_tool` 被静默编译掉、memory recall 失败即挂起、Codex 配额耗尽后每调用重试、`NO_REPLY` cron 结果泄漏到 Web 聊天 |
| UX 缺陷 | [#11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418)、[#11050](https://github.com/zeroclaw-labs/zeroclaw/issues/11050) | TUI 复制按钮失效、原生投票未纳入通道节流 |
| 工程健康 | [#12700](https://github.com/zeroclaw-labs/zeroclaw/pull/12700)（PR）、[#12322](https://github.com/zeroclaw-labs/zeroclaw/pull/12322)（PR） | 修复平台敏感测试假设；升级内置 SQLite 至 3.54.1 且不再豁免 RUSTSEC-2026-0459 告警 |

**前进幅度评估**：Issue 关闭率 56%，且集中在 S1/S2，说明维护者在“止血”而非仅做功能。但从 PR 合并率看，代码交付落后于问题识别，修复真正到达用户尚需一个 release 周期。

---

## 4. 社区热点

| 排名 | 条目 | 评论 | 核心诉求 |
|---|---|---|---|
| 1 | [#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) RFC: Scoped use of operator-managed service credentials | 16 | 让 Agent 能对服务执行任务，但不向模型、聊天、技能文本或生成代码暴露底层凭证 |
| 2 | [#11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418) Copy 一键复制失效（已关闭） | 8 | TUI 基础交互可靠性；S1 阻塞工作流 |
| 3 | [#8600](https://github.com/zeroclaw-labs/zeroclaw/issues/8600) 多模型 Provider 的按会话模型切换 | 6（👍1） | 从 moltis 迁移的用户发现缺少“任意模型快速切换”能力 |
| 4 | [#9945](https://github.com/zeroclaw-labs/zeroclaw/issues/9945) browser 工具仅暴露 16/100+ 命令 | 6 | iframe、JS 对话框、标签页、表单控件不可达，浏览器自动化能力被严重限制 |
| 5 | [#11332](https://github.com/zeroclaw-labs/zeroclaw/issues/11332) 技能评审/创建在 channel、webhook、gateway 轮次中从不运行 | 6 | 学习循环只在 CLI/cron 生效，与用户实际使用入口错位 |
| 6 | [#12666](https://github.com/zeroclaw-labs/zeroclaw/issues/12666) `delegate` 接受未知参数并静默丢弃 | 6（当日新开即热议） | 工具 schema 声称 `additionalProperties: false`，实际不校验，模型无从纠错 |

**分析**：讨论热度高度集中于“**安全边界**”与“**能力完整性**”。前者是架构级议题（#12422），后者集中在浏览器工具与技能系统——用户已经不满足于“能跑”，而是在追问“为什么同一能力在不同入口/不同后端表现不一致”。

---

## 5. Bug 与稳定性

### 未关闭的高优先级问题

| 严重度 | Issue | 组件 | 状态 | 是否已有 Fix PR |
|---|---|---|---|---|
| **S1** | [#12570](https://github.com/zeroclaw-labs/zeroclaw/issues/12570) 日志目录数百万个泄漏的 `runtime-trace.tmp.*` 导致 daemon 启动挂起 | runtime/daemon, log | OPEN | ❌ 未见；与 #10073 同源 |
| **S1** | [#10863](https://github.com/zeroclaw-labs/zeroclaw/issues/10863) Telegram 无限重试被拒语音更新，阻塞后续消息 | channel:telegram | in-progress / accepted | ❌ 未见独立 PR |
| **S1** | [#12597](https://github.com/zeroclaw-labs/zeroclaw/issues/12597) 语音转写失败后 offset 永不前进，通道假死 | channel:telegram | OPEN | ❌ 未见；疑似 #10863 同根因 |
| **S2** | [#11332](https://github.com/zeroclaw-labs/zeroclaw/issues/11332) 技能评审/创建在非 CLI 轮次不运行 | runtime/daemon, skills | accepted | ❌ 未见 |
| **S2** | [#12558](https://github.com/zeroclaw-labs/zeroclaw/issues/12558) Matrix 工具审批提示发到房间主时间线而非所在 thread | channel:matrix | OPEN | ✅ [#12224](https://github.com/zeroclaw-labs/zeroclaw/pull/12224) OPEN |
| **S2** | [#11336](https://github.com/zeroclaw-labs/zeroclaw/issues/11336) `plugin info` / `list --verify` 对运行时拒绝注册的插件报告 `[loads]` | plugins | accepted | ❌ 未见 |
| **S3** | [#12666](https://github.com/zeroclaw-labs/zeroclaw/issues/12666) `delegate` 静默丢弃未知参数 | tools | OPEN（新） | ❌ 未见 |
| **S3** | [#12660](https://github.com/zeroclaw-labs/zeroclaw/issues/12660) Agent 卡片的“本月”花费实为全时段花费 | web dashboard | OPEN | ❌ 未见 |
| **S3** | [#10976](https://github.com/zeroclaw-labs/zeroclaw/issues/10976) WhatsApp Web 双向 @ 提及均异常 | channel:whatsapp | accepted | ❌ 未见 |

**性能回归**：[#10073](https://github.com/zeroclaw-labs/zeroclaw/issues/10073)（`StoragePolicy::Rolling` 在高事件量下严重退化，且默认对所有未配置实例生效）仍为 in-progress，标签 `risk:high`。该 Issue 与 #12570 共享“滚动裁剪泄漏临时文件”的根因，建议合并处理并优先排期——这是当前对长期运行实例威胁最大的稳定性问题。

**今日已修复（关闭）**：Android shell EPERM（#12075）、quickstart 配置持久化（#11525）、shell stderr 被吞（#12390）、`web_search` 静默编译缺失（#12203）、memory recall 悬挂（#11896）、Codex 429 重试风暴（#11894）、cron `NO_REPLY` 泄漏（#11916）等，修复覆盖面广。

---

## 6. 功能请求与路线图信号

**高置信度将进入下一版本（已有配套 PR 或 RFC 推进中）：**

- **凭证作用域代理体系**：RFC [#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) + 一系列 PR——[#12490](https://github.com/zeroclaw-labs/zeroclaw/pull/12490)（Authorization Token）、[#12408](https://github.com/zeroclaw-labs/zeroclaw/pull/12408)（HTTP Basic/API Key）、[#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596)（浏览器用户名/密码与 TOTP 独立授权）、[#12659](https://github.com/zeroclaw-labs/zeroclaw/pull/12659)（SSH 密码/TOTP 绑定 vault 授权）、[#12438](https://github.com/zeroclaw-labs/zeroclaw/pull/12438)（原生 Rust SSH 任务代理）。这是最明确的路线图信号。
- **外部密钥库集成**：[#12481](https://github.com/zeroclaw-labs/zeroclaw/pull/12481)（OpenBao）、[#12482](https://github.com/zeroclaw-labs/zeroclaw/pull/12482)（1Password Connect / Azure Key Vault / AWS Secrets Manager / GCP Secret Manager）。
- **远程文件能力**：RFC [#12690](https://github.com/zeroclaw-labs/zeroclaw/issues/12690) + PR [#12695](https://github.com/zeroclaw-labs/zeroclaw/pull/12695)（WebDAV 有界传输与独立加密授权）。
- **通道确认反应可配置**：[#11753](https://github.com/zeroclaw-labs/zeroclaw/issues/11753) 已 in-progress，实现成本低、用户感知强，适合随下个小版本落地。
- **通道扩展**：[#12316](https://github.com/zeroclaw-labs/zeroclaw/pull/12316)（SimpleX + 语音留言 + 加密通话）、[#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847)（原生 XMPP + 可选 OMEMO），均为 XL 且待维护者评审。

**短期难以落地：**

- [#8600](https://github.com/zeroclaw-labs/zeroclaw/issues/8600) 按会话切换模型：处于 `status:parking-lot`，无配套 PR，涉及 provider/runtime/config 多层，优先级 p2。
- [#9945](https://github.com/zeroclaw-labs/zeroclaw/issues/9945) 浏览器工具命令覆盖扩展：`status:blocked`、`risk:high`，且 [#12614](https://github.com/zeroclaw-labs/zeroclaw/issues/12614)（文件上传缺失）是其子集，建议合并为一个“浏览器能力矩阵”专项。
- [#8321](https://github.com/zeroclaw-labs/zeroclaw/issues/8321) 易变运行时上下文的响应缓存策略：`status:icebox`，属架构治理，短期无排期迹象。

---

## 7. 用户反馈摘要

- **平台平权是真实痛点**：Android/Termux 用户同时遭遇 quickstart 失败与 shell 工具全挂（[#11525](https://github.com/zeroclaw-labs/zeroclaw/issues/11525)、[#12075](https://github.com/zeroclaw-labs/zeroclaw/issues/12075)），说明发布二进制在非主流平台缺乏冒烟测试。两题今日关闭，反馈闭环良好。
- **“不要把密钥交给模型”是操作者的核心焦虑**：[#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) 的 16 条评论显示，用户需要 Agent 代表自己访问 DefectDojo、SSH 主机、WebDAV 等外部系统，但明确拒绝凭证进入 prompt、聊天记录或技能文本。这直接催生了“别名 + 精确 HTTPS origin + 显式授权 + 响应清洗”的设计共识。
- **通道用户对“静默失败”容忍度极低**：Telegram 语音重试导致整条通道假死（[#10863](https://github.com/zeroclaw-labs/zeroclaw/issues/10863)、[#12597](https://github.com/zeroclaw-labs/zeroclaw/issues/12597)）、Matrix 审批提示跑出 thread（[#12558](https://github.com/zeroclaw-labs/zeroclaw/issues/12558)）、WhatsApp 提及丢失（[#10976](https://github.com/zeroclaw-labs/zeroclaw/issues/10976)）——共同诉求是“失败要可见、要可恢复、要保留上下文”。
- **迁移用户在做能力对标**：[#8600](https://github.com/zeroclaw-labs/zeroclaw/issues/8600) 明确以 moltis 为参照，说明 Zeroclaw 正在承接竞品迁移流量，模型切换这类“便利性能力”会直接影响留存。
- **插件作者被诊断信息误导**：[#11336](https://github.com/zeroclaw-labs/zeroclaw/issues/11336) 中 CLI 报告 `[loads]` 而运行时拒绝注册，属于“工具说谎”，比直接报错更伤害信任。
- **成本可见性受关注**：[#12660](https://github.com/zeroclaw-labs/zeroclaw/issues/12660) 指出“本月花费”实为全时段，虽为 S3，但涉及计费口径，容易引发运营决策误判。

---

## 8. 待处理积压

**长期未闭环的 Issue：**

| Issue | 创建时间 | 滞留 | 状态标签 | 风险提示 |
|---|---|---|---|---|
| [#8321](https://github.com/zeroclaw-labs/zeroclaw/issues/8321) 易变上下文响应缓存策略 | 2026-06-25 | ~5 个月 | `status:icebox` | 涉及 provider 成本与缓存正确性，长期冰封可能积累技术债 |
| [#8600](https://github.com/zeroclaw-labs/zeroclaw/issues/8600) 按会话切换模型 | 2026-07-01 | ~5 个月 | `status:parking-lot`、👍1 | 迁移用户的核心缺失能力，建议至少给出设计结论 |
| [#9945](https://github.com/zeroclaw-labs/zeroclaw/issues/9945) 浏览器工具命令覆盖 | 2026-08-12 | ~3.5 个月 | `status:blocked`、`risk:high` | 与 #12614 重复投入风险，建议合并 epic |
| [#10073](https://github.com/zeroclaw-labs/zeroclaw/issues/10073) 退役 Rolling 存储策略 | 2026-08-18 | ~3 个月 | `status:in-progress`、`risk:high` | 默认策略性能退化 + 与 #12570 同根因，应提级 |

**滞留的 XL 级 PR（评审瓶颈集中区）：**

- [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) XMPP + OMEMO（2026-10-19，`needs-maintainer-review`、`risk:high`、`size:XL`）
- [#11869](https://github.com/zeroclaw-labs/zeroclaw/pull/11869) 任务级 SSH 传输复用（2026-10-19，`needs-maintainer-review`、`risk:high`）
- [#11874](https://github.com/zeroclaw-labs/zeroclaw/pull/11874) 长轮次进度上报（2026-10-19）
- [#11911](https://github.com/zeroclaw-labs/zeroclaw/pull/11911) 保留已完成工具结果与有界恢复（2026-10-20，`size:XL`）
- [#12059](https://github.com/zeroclaw-labs/zeroclaw/pull/12059) OpenAI runtime-profile thinking（2026-10-27，`size:XL`）
- [#12316](https://github.com/zeroclaw-labs/zeroclaw/pull/12316) SimpleX 通道（2026-11-09，`size:XL`）

**治理级阻塞（最需维护者决策）：**

- RFC [#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) 已讨论 16 条、跨越 10 天，且 [#12517](https://github.com/zeroclaw-labs/zeroclaw/pull/12517) 明确标注“pending RFC 12422”、[#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596) 标注“Depends on #12517”——**一个 RFC 未决，整条凭证 PR 链无法合并**。建议尽快给出 accept/reject 结论或拆分为可独立合并的最小集。
- [#12459](https://github.com/zeroclaw-labs/zeroclaw/pull/12459) 标记 `do-not-merge` + `status:blocked`，需明确是设计否决还是等待依赖。
- [#12408](https://github.com/zeroclaw-labs/zeroclaw/pull/12408) 标记 `needs-author-action`、`risk:high`，需作者响应后才能进入评审队列。

**给维护者的三条建议**：① 优先裁决 RFC #12422，解锁 10+ PR；② 将 #10073 与 #12570 合并为“日志子系统稳定性”专项并排期；③ 为 XL PR 设立分级评审 SLA，避免 10 月批次继续老化。

---

*数据说明：本报告基于过去 24 小时内更新的 50 条 Issue（展示评论数前 30）与 50 条 PR（展示前 20，评论数字段缺失）生成；5 条已合并/关闭 PR 的明细未包含在样本中，相关进展以已关闭 Issue 推断。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报  
**日期：2026-11-24**  
**数据口径：过去 24 小时 GitHub 更新，基于所提供的 Issues / PR / Releases 数据**

## 1. 今日速览

2026-11-24，PicoClaw 呈“积压清理型活跃”：过去 24 小时 Issues 更新 0 条、PR 更新 5 条且全部关闭、待合并 PR 为 0、无新版本发布。维护动作集中在 WebSocket 鉴权修复、上游 1095 个 commits 同步与下游定制前移、聚合修复、CI 调度调整，以及多智能体协作框架 WIP 的关闭。社区互动信号偏弱：无新增 Issue，PR 评论数为 `undefined`、点赞均为 0，无法按讨论热度排序。整体健康度上，PR 吞吐和积压清理表现尚可，但版本交付与用户反馈信号不足；大型同步 PR 的实际合并状态仍需维护者进一步确认。

## 2. 版本发布

无新版本发布；无破坏性变更或迁移注意事项可报告。

## 3. 项目进展

今日 5 条 PR 均为 `CLOSED` 状态，数据未区分“已合并”与“仅关闭”，以下按关闭动作及其潜在影响分析。

| PR | 状态 | 推进内容 | 项目影响 |
|---|---|---|---|
| [#2363](https://github.com/sipeed/picoclaw/pull/2363) | CLOSED | 修复 WebSocket 鉴权并统一 header 大小写 | 面向 channel 的 bug fix，涉及鉴权与协议互通，安全/稳定性价值较高；关联 Issue [#2354](https://github.com/sipeed/picoclaw/issues/2354)。 |
| [#2810](https://github.com/sipeed/picoclaw/pull/2810) | CLOSED | 同步 upstream/main 约 1095 个 commits，并前移 6 个 magicform 定制提交 | 大型上游对齐与下游定制维护；涉及 agent loop 拆分、tools 目录重组、channel 配置迁移，属于高影响维护动作。是否实际合并需确认。 |
| [#1546](https://github.com/sipeed/picoclaw/pull/1546) | CLOSED | 聚合合并 #1480、#1479、#1478、#1473、#1467 的修复 | 有助于减少分散 PR 积压，但具体修复内容与影响面在摘要中未展开。 |
| [#423](https://github.com/sipeed/picoclaw/pull/423) | CLOSED | WIP：多智能体协作框架、共享上下文池、agent handoff、发现工具 | 功能方向明确，但为 WIP 且已关闭；若未合并，则更多是路线图信号而非已交付能力。 |
| [#2516](https://github.com/sipeed/picoclaw/pull/2516) | CLOSED | 移除 sync-rebase workflow 的每日 cron，保留手动触发 | 降低定时 CI 同步噪声，属于维护流程优化，不直接影响用户功能。 |

**整体推进评估：** 24 小时内关闭 5 条 PR，覆盖 1 条鉴权/互通修复、1 条大规模上游同步、1 条聚合修复、1 条 CI 调整和 1 条多智能体 WIP。积压清理明显，但由于无新版本发布，用户可见收益尚未通过 release 确认。

## 4. 社区热点

今日无新增 Issues；5 条 PR 的评论数均为 `undefined`，点赞均为 0，无法按“评论最多/反应最多”识别真实社区热点。若按影响面排序，值得关注的是：

1. [#2810 Sync with upstream/main (1095 commits) + forward-port magicform customizations](https://github.com/sipeed/picoclaw/pull/2810)  
   影响面最大。诉求偏向下游定制分支持续跟进上游，降低长期分叉与定制前移成本；涉及大规模代码结构调整，维护复杂度高。

2. [#423 WIP: base multi-agent collaboration framework & shared context](https://github.com/sipeed/picoclaw/pull/423)  
   功能信号最强。多智能体协作、共享上下文、handoff 与发现工具是高级 Agent 场景的核心能力；但 WIP 状态关闭，需确认是暂缓、拆分还是放弃。

3. [#2363 Fix WebSocket authentication and standardize header casing](https://github.com/sipeed/picoclaw/pull/2363)  
   与真实集成问题相关，涉及 WebSocket 鉴权和 header 规范，可能影响安全性与第三方互通。

## 5. Bug 与稳定性

今日无新增 Bug Issue 报告；无崩溃、回归问题的新增数据。

| 问题 | 严重程度 | 状态 | 说明 |
|---|---|---|---|
| WebSocket 鉴权与 header 大小写问题 | 中高 | 已有修复 PR [#2363](https://github.com/sipeed/picoclaw/pull/2363)，状态 CLOSED | 鉴权相关可能涉及安全与连接稳定性；header 统一有助于降低互通问题。关联 Issue [#2354](https://github.com/sipeed/picoclaw/issues/2354)。 |
| 聚合修复 #1480 等多项修复 | 未知 | 聚合 PR [#1546](https://github.com/sipeed/picoclaw/pull/1546) 已关闭 | 摘要未列明具体 bug 与严重级别，无法进一步分级。 |
| 上游大同步带来的集成风险 | 维护风险 | [#2810](https://github.com/sipeed/picoclaw/pull/2810) 已关闭 | 非 Bug 报告，但 1095 commits 同步与目录重构可能带来回归风险，需依赖测试与发布验证。 |

## 6. 功能请求与路线图信号

今日无新增用户功能请求 Issue。可从 PR 中提取以下路线图信号：

- **多智能体协作框架**：[#423](https://github.com/sipeed/picoclaw/pull/423) 提出共享上下文池、agent handoff、发现工具等能力。该 PR 为 WIP 且已关闭，短期纳入下一版本的概率取决于是否重新开启或拆分落地。
- **Channel 安全与协议规范化**：[#2363](https://github.com/sipeed/picoclaw/pull/2363) 若对应已合并修复，较可能进入后续版本，属于稳定性/安全性增强。
- **上游同步与下游定制兼容**：[#2810](https://github.com/sipeed/picoclaw/pull/2810) 反映 fork/下游定制维护需求；若已合并，将显著改变代码布局，需关注迁移与兼容说明。
- **CI 自动化收敛**：[#2516](https://github.com/sipeed/picoclaw/pull/2516) 不代表用户功能，但体现维护流程从定时自动 rebase 转向手动控制。

**下一版本判断：** 数据不足以确认纳入范围；若关闭状态对应已合并，则 #2363、#1546 最可能体现为修复类更新，#2810 属于高影响同步，#423 因 WIP 关闭而纳入概率较低，除非后续重新推进。

## 7. 用户反馈摘要

今日无新增 Issues，且 PR 评论数为 `undefined`，无法从评论中提炼新增满意/不满意情绪。间接信号如下：

- **WebSocket 集成痛点**：[#2363](https://github.com/sipeed/picoclaw/pull/2363) 关联 [#2354](https://github.com/sipeed/picoclaw/issues/2354)，说明鉴权与 header 规范可能影响实际连接与第三方集成。
- **下游定制维护成本**：[#2810](https://github.com/sipeed/picoclaw/pull/2810) 显示下游分支需要持续前移定制提交，上游结构变化会增加维护负担。
- **高级协作场景需求**：[#423](https://github.com/sipeed/picoclaw/pull/423) 反映多智能体共享上下文与 handoff 的使用诉求，但当前仍偏 WIP。
- **CI 噪声治理**：[#2516](https://github.com/sipeed/picoclaw/pull/2516) 表明定时 sync-rebase 可能带来维护噪声，改为手动触发是流程层面的反馈。

## 8. 待处理积压

本期数据中未发现待处理积压：Issues 更新 0 条、待合并 PR 0 条，5 条更新 PR 均已关闭。历史上属于长周期 PR 的条目已在今日/昨日集中关闭，说明积压正在清理。

建议维护者补充关闭原因与后续动作说明，尤其是：

- [#2810](https://github.com/sipeed/picoclaw/pull/2810)：确认 1095 commits 同步是否实际合并，以及下游定制前移是否完成。
- [#423](https://github.com/sipeed/picoclaw/pull/423)：确认多智能体协作框架是暂缓、拆分还是放弃，避免路线图信号丢失。
- [#2363](https://github.com/sipeed/picoclaw/pull/2363)：确认 WebSocket 鉴权修复是否进入 release，并关联 Issue #2354 的关闭状态。
- [#1546](https://github.com/sipeed/picoclaw/pull/1546)：补充聚合修复的实际覆盖范围，便于 release note 追踪。
- [#2516](https://github.com/sipeed/picoclaw/pull/2516)：CI 调度变更需在维护文档中说明手动触发方式。

**健康度结论：** 今日项目维护活动以清理和同步为主，PR 处理效率尚可；但无新版本、无 Issue 互动、评论数据缺失，社区活跃度偏低。后续应重点关注大型同步 PR 的落地质量与关闭 PR 的 release 可追溯性。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：2026-11-24** ｜ 数据窗口：过去 24 小时

---

## 1. 今日速览

项目今日维持高活跃度：Issues 更新 22 条（16 条新开/活跃、6 条关闭），PR 更新 36 条（30 条待合并、6 条合并/关闭），无新版本发布。讨论焦点高度集中在 **2.3.0.post1 升级后的 Console 前端回归**——窄屏文字剪裁、表格/代码块无法横向滚动、iOS 长会话卡死、键盘不可滚动等问题形成明显的"渲染层问题簇"，并已有 #8823、#8876、#8133 等修复 PR 进入评审。后端侧则出现两条值得关注的生产稳定性问题：流式回复中途 `RemoteProtocolError` 不重试（#8864）与 WeChat 通道在 128 条响应后静默失效（#8814）。整体看，社区贡献意愿强（30 条待合并 PR），但合并吞吐相对偏低，且部分 XL/XXXL 规模 PR 已积压数周。

---

## 2. 版本发布

无新版本发布（过去 24 小时 0 个 Release）。

> 备注：v2.3.0、v2.3.0.post1 的安装验证 Issue #8681、#8807 已于今日关闭；v2.3.1-beta.1 的验证 Issue #8861 仍处于 OPEN [pre-release] 状态，文档 PR #8869 正在为 2.3.1 刷新双语文档，预示下一版本临近。

---

## 3. 项目进展

今日合并/关闭 6 条 PR，另有多条重要 PR 处于评审推进状态：

**已合并/关闭：**
- **#8060** `fix(token-usage): count Anthropic cache tokens in the live context meter` — 修复 Anthropic Messages 协议下上下文计量漏算缓存读写 token 的问题，关闭 #8057。对使用 prompt caching 的长上下文用户是实质性修复。
  https://github.com/agentscope-ai/QwenPaw/pull/8060
- **#8031** `test: stop leaking unawaited coroutines from scheduling mocks` — 清理 6 个单测中未 await 的协程泄漏，消除 `RuntimeWarning` 噪音，提升测试可信度。
  https://github.com/agentscope-ai/QwenPaw/pull/8031

**高价值评审中 PR：**
- **#8823** `fix(console): keep wide tables and code blocks scrollable in bubbles`（XS，Under Review）— 直接对应今日最热 Issue #8811，修复宽表格/长代码块被裁切。
  https://github.com/agentscope-ai/QwenPaw/pull/8823
- **#8876** `fix(console): restore native scrolling in the chat transcript`（XS，first-time-contributor）— 移除捕获阶段 `preventDefault` 的滚轮劫持，恢复原生滚动惯性。
  https://github.com/agentscope-ai/QwenPaw/pull/8876
- **#8866** `fix(crons): accept named weekday lists in heartbeat cron`（XS，first-time-contributor）— 对应 Issue #8865，让 `0 9 * * mon,wed,fri` 被正确识别为 cron。
  https://github.com/agentscope-ai/QwenPaw/pull/8866
- **#8825** `fix(agents): fall back to global default when a run-config provider is disabled`（S，Under Review）— 解决禁用 provider 后 agent run-config 仍锁定该模型、导致各通道报 `ProviderError` 的问题。
  https://github.com/agentscope-ai/QwenPaw/pull/8825
- **#8707** `fix(crons): persist cron and heartbeat token usage to turn records`（L，Under Review）— 修复定时任务与心跳的 token 消耗未计入会话 turn 记录、导致用量面板低估的问题。
  https://github.com/agentscope-ai/QwenPaw/pull/8707

**整体推进评估：** 今日进展以"前端渲染修复 + 计量准确性 + cron 正确性"为主线，单点修复质量较高，但多条修复仍卡在 Review。项目向前迈进约"一个 Console 回归修复批次 + 两项计量/调度修正"的量级。

---

## 4. 社区热点

按评论数与讨论密度排序：

| 排名 | Issue/PR | 评论 | 状态 | 核心诉求 |
|---|---|---|---|---|
| 1 | **#8811** 窄屏下整条消息文字被剪裁 | 5 | OPEN | 升级 v2.3.0.post1 后窄屏（375px）消息被整体裁剪，表格/代码块无法横向滚动 |
| 2 | **#8864** 流式回复中途 `RemoteProtocolError` 中止且不重试 | 3 | OPEN | 已输出部分内容后出错不重试，DeepSeek v4-flash 长会话下复现，非上下文溢出 |
| 3 | **#8852** iOS WebKit 长会话冻结 | 3 | OPEN | `UserMessageAnchors` 布局抖动 + `content-visibility:auto` 在 column-reverse 列表中导致卡死 |
| 4 | **#8844** 消息列表不可键盘聚焦 | 3 | OPEN | 方向键/PageUp/PageDown 无法滚动会话，无鼠标设备不可用（可访问性） |
| 5 | **#8845** Markdown 表格溢出气泡无横向滚动 | 3 | OPEN | 超宽列被绘制到消息列表外、实际不可见但可选中 |

链接：
- #8811 https://github.com/agentscope-ai/QwenPaw/issues/8811
- #8864 https://github.com/agentscope-ai/QwenPaw/issues/8864
- #8852 https://github.com/agentscope-ai/QwenPaw/issues/8852
- #8844 https://github.com/agentscope-ai/QwenPaw/issues/8844
- #8845 https://github.com/agentscope-ai/QwenPaw/issues/8845

**背后诉求分析：**
1. **2.3.0.post1 引入的 Console 渲染回归是本轮讨论的核心矛盾**。多个独立用户（@sslnv88、@caldefoc、@jycodes）从不同角度报告同一类"超宽内容被裁切且不可滚动"问题，说明这是同一根因（消息气泡缺乏 `overflow-x` 容器）的多面表现，而非孤立 bug。
2. **移动端与可访问性用户被边缘化**：375px 竖屏、iOS Safari、无鼠标设备三类场景均不可用，影响面从"体验不佳"上升到"功能不可用"。
3. **异步/流式健壮性关注度上升**：部分内容已输出后失败不重试，是用户在真实长对话中反复遇到的痛点。

---

## 5. Bug 与稳定性

按严重程度排列（🔴 高 / 🟠 中 / 🟡 低）：

### 🔴 高严重度

**#8814 RESPONSE_SCOPE_LIMIT：活跃响应路由从不驱逐，通道在 128 时静默死亡**
- 长运行部署中 WeChat 通道双向静默失效，日志仅 `-32603 internal error`。根因指向 `shared_response_driver.py:50` 硬编码上限。属生产级静默故障，影响最大。
- 状态：OPEN，暂无对应 fix PR。
- https://github.com/agentscope-ai/QwenPaw/issues/8814

**#8864 流式回复中途 `RemoteProtocolError` 中止且不重试**
- 已输出部分内容后出错即放弃，无重试；上下文占用仅 ~9%，排除溢出。直接损害核心对话可靠性。
- 状态：OPEN，暂无 fix PR。
- https://github.com/agentscope-ai/QwenPaw/issues/8864

**#8877 OpenAI 兼容流中"无状态码"的模型过载绕过重试**
- 网关返回 HTTP 200 后以 SSE 错误下发 `servers overloaded`，重试逻辑未覆盖此路径；已在 mock transport 复现。与 #8864 同属流式错误处理盲区。
- 状态：OPEN，暂无 fix PR。
- https://github.com/agentscope-ai/QwenPaw/issues/8877

**#8852 iOS WebKit 长会话冻结**
- 长上下文会话打开/继续即卡死，属性能回归，移动端重度用户受影响。
- 状态：OPEN，暂无 fix PR。
- https://github.com/agentscope-ai/QwenPaw/issues/8852

### 🟠 中严重度

**#8867 Memory 后端启动竞态静默回退 ReMeLight 且不自愈**
- 配置 `openviking` 但插件尚未注册时整进程回退内置后端，配置形同虚设。同问题 #8868 已作为重复关闭，#8867 保留跟踪。
- 状态：OPEN，暂无 fix PR。
- https://github.com/agentscope-ai/QwenPaw/issues/8867

**#8863 Windows 上 ReMe 标签索引永久失败**
- 两台独立 Windows 机器、2.3.0 与 2.3.0.post1 均复现，内置 reme-ai 0.4.2.0 的 workspace-relative 路径问题。
- 状态：OPEN，暂无 fix PR。
- https://github.com/agentscope-ai/QwenPaw/issues/8863

**#8875 MCP `streamable_http` 客户端将服务端 4xx 掩盖为"未连接"并拆会话**
- 误导性错误 + 无谓 session 抖动，影响自定义 MCP driver 用户。
- 状态：OPEN，暂无 fix PR。
- https://github.com/agentscope-ai/QwenPaw/issues/8875

**#8811 / #8845 / #8856 超宽内容裁切与无横向滚动（同一根因簇）**
- 表格、长代码块、长行被裁切且不可横向滚动，窄屏下整条回复被拉伸裁剪。
- 状态：OPEN，**已有 fix PR #8823**（Under Review）。
- https://github.com/agentscope-ai/QwenPaw/issues/8811 ｜ https://github.com/agentscope-ai/QwenPaw/pull/8823

**#8844 Console 消息列表不可键盘聚焦**
- 键盘用户完全无法滚动会话，可访问性缺陷。
- 状态：OPEN，暂无明确 fix PR（#8876 改善滚轮但不解决焦点问题）。
- https://github.com/agentscope-ai/QwenPaw/issues/8844

### 🟡 低严重度

**#8870 Discord `chunk_text` 在分块边界重复代码围栏**
- 代码块起始行恰好超阈值时围栏状态先更新后 flush，导致重复围栏。
- 状态：OPEN，暂无 fix PR。
- https://github.com/agentscope-ai/QwenPaw/issues/8870

**#8872 本地模型列表提示不可用的下载命令**
- 本地模型管理抽为插件后，`download/local/remove-local` CLI 命令未注册但提示仍在。
- 状态：OPEN，暂无 fix PR。
- https://github.com/agentscope-ai/QwenPaw/issues/8872

**#8865 命名星期列表的 heartbeat cron 回退为 30 分钟间隔**
- `0 9 * * mon,wed,fri` 未被 `is_cron_expression` 识别。
- 状态：OPEN，**已有 fix PR #8866**（first-time-contributor）。
- https://github.com/agentscope-ai/QwenPaw/issues/8865

**#8874 文档本地 pre-commit 环境与 CI 不一致**
- `CONTRIBUTING.md` 的依赖 profile 与 CI 要求不符，增加新贡献者摩擦。
- 状态：OPEN，暂无 fix PR。
- https://github.com/agentscope-ai/QwenPaw/issues/8874

**已关闭的稳定性修复（今日）：**
- #8490 Voice Transcription 设置页 `import whisper` 导致 ~690MB RSS 永不释放 — CLOSED ✅
- #8057 Anthropic 缓存 token 未计入上下文计量 — CLOSED（由 PR #8060 修复）✅
- #8836 工具配置含 password 组件时页面循环刷新 — CLOSED ✅

---

## 6. 功能请求与路线图信号

结合已有 PR 判断可能进入下一版本的方向：

| 需求 | 来源 Issue/信号 | 对应 PR | 纳入可能性 |
|---|---|---|---|
| **插件系统扩展**（CLI 命令、扩展点） | #8872 暴露插件化后 CLI 缺口 | #8554（XXXL） | 中高 — 大 PR 在审，与插件化路线一致 |
| **插件 SDK 1.2 API / 生命周期管理** | 生态扩展需求 | #8764（XXXL） | 中 — 体量大，可能分批合入 |
| **插件主题语义色角色** | #8071 主题扩展 | #8787（XL，Under Review） | 中高 — 已有前序 #8422 落地 |
| **Telegram 论坛主题会话隔离** | 用户对多 topic 隔离的明确诉求 | #8857（S，Under Review） | 高 — 小而聚焦，first-time-contributor |
| **Linux 桌面打包（deb/AppImage）** | Linux 用户需 Docker 运行的痛点 | #8444（XL） | 中 — 依赖打包链改造 |
| **自定义网关声明 OpenAI prompt cache 参数** | #8058 | #8061（M） | 中高 — 与已合并的 #8060 同族 |
| **cron/heartbeat token 用量入账** | 用量面板低估定时任务 | #8707（L，Under Review） | 高 — 评审中且问题明确 |
| **键盘可访问性滚动** | #8844 | 暂无直接 PR | 中 — 需新 PR，可能随 Console 回归批次处理 |
| **CJK Markdown 强调边界修复** | 中文用户渲染问题 | #8133（XL，Under Review） | 中 — 已长期在审 |

**路线图判断：** 当前信号显示团队正沿"**插件化（CLI/SDK/主题）+ 渠道精细化（Telegram topic）+ 跨平台（Linux 桌面）**"三条线推进；下一版本（v2.3.1）预计以 **Console 回归修复 + cron/计量修正 + 文档刷新** 为主，插件大 PR 更可能进入 v2.4 系列。

---

## 7. 用户反馈摘要

**真实痛点：**
1. **升级即回归的挫败感**：#8811 用户明确记录"升级前 v2.3.0 正常，升级到 post1 后窄屏剪裁"，版本间体验倒退比原生缺陷更伤信任。
2. **移动端不可用**：375px 竖屏、iOS Safari 长会话冻结（#8852），移动办公场景基本不可用。
3. **生产环境静默失败最可怕**：#8814 描述 WeChat 通道"双向静默停止、无用户可见错误"，仅有 `-32603`，运维排查成本极高。
4. **配置不生效的困惑**：#8867 用户配置了 `openviking` 却整进程跑在 ReMeLight 上，"安装了、启用了"却无效，属信任型缺陷。
5. **贡献者体验摩擦**：#8874 指出文档与 CI 环境分叉，新贡献者按文档操作无法通过 pre-commit。

**使用场景画像：**
- Windows 10/11 + Chrome 桌面为主力，视口 ~1903px；移动端 375px 竖屏为次要但关键场景。
- 长上下文用户（#8864 上下文 8.2 万 token / 90 万，占比 9%）对计量与流式健壮性敏感。
- 多通道部署（Feishu / DingTalk / WeChat / Discord / Telegram）用户对通道级静默故障容忍度低。
- 自定义 MCP driver、OpenAI 兼容网关（DeepSeek 等）用户占比可观。

**满意信号（从已关闭项推断）：**
- #8057 缓存 token 计量、#8490 whisper 内存泄漏、#8836 password 组件循环刷新均在较短时间内闭环，响应速度获隐性认可。
- 多条 first-time-contributor PR（#8876、#8866、#8857）说明新贡献者进入路径通畅。

---

## 8. 待处理积压

提醒维护者关注的长期未闭环项：

**Issues：**
- **#8814**（创建 11-19，OPEN，5 天）— 高严重度生产故障，**无 fix PR**，建议优先 triage。
  https://github.com/agentscope-ai/QwenPaw/issues/8814
- **#8844 / #8845**（创建 11-20，OPEN，4 天）— 可访问性与表格滚动，与 #8811 同簇，可随 #8823 一并解决。
  https://github.com/agentscope-ai/QwenPaw/issues/8844
- **#8861**（创建 11-23，pre-release 验证，0 评论）— v2.3.1-beta.1 安装验证窗口 4 小时已过，需确认各平台验证结论。
  https://github.com/agentscope-ai/QwenPaw/issues/8861

**PR（按等待时长）：**
- **#8268** `fix(task_tracker): bound the run completion callback`（创建 10-16，约 39 天，size/M）— 修复 run 永不释放，与 #8173 相关，长期在审。
  https://github.com/agentscope-ai/QwenPaw/pull/8268
- **#8308** `test(api): verify missing provider lookup returns 404`（创建 10-18，约 37 天，XS）— 小体量测试 PR 长期未合，建议快速处理。
  https://github.com/agentscope-ai/QwenPaw/pull/8308
- **#8479** `feat(skills): sync Office skills with Anthropic July 2026 update`（创建 10-28，约 27 天，XXXL，first-time-contributor）— 大体量首次贡献者 PR，长期挂起易流失贡献者。
  https://github.com/agentscope-ai/QwenPaw/pull/8479
- **#8061** `feat(providers): let custom gateways declare OpenAI prompt cache params`（创建 09-30，约 55 天，M）— 与已合并的 #8060 同族却滞留，建议一并评审。
  https://github.com/agentscope-ai/QwenPaw/pull/8061
- **#8133** `fix(console): repair CJK emphasis boundaries in chat Markdown`（创建 10-08，约 47 天，XL，Under Review）— 中文用户渲染问题，长期在审。
  https://github.com/agentscope-ai/QwenPaw/pull/8133
- **#8487** `fix(scroll): recognize url-referenced media in tool-result folding`（创建 10-29，约 26 天，S）— 小体量、问题明确，建议排期。
  https://github.com/agentscope-ai/QwenPaw/pull/8487

**健康度提示：** 30 条待合并 PR 中多条为 XS/S 规模且已等待数周，合并吞吐是当前主要瓶颈；同时 #8814、#8864、#8877 三条高严重度问题均无 fix PR，建议维护者在下一轮 triage 中优先分配。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报

**日期：2026-11-24** ｜ 数据窗口：过去 24 小时 ｜ 项目：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日速览

- **活跃度处于高位**：24 小时内 Issues 更新 500 条（新开/活跃 329、关闭 171，关闭率 34.2%），PR 更新 500 条（待合并 381、合并/关闭 119，处理率 23.8%），社区输入显著高于维护吞吐，PR 队列压力偏大。
- **Canary 通道持续发版**：发布 `canary.20261123T065600Z-v0.23.3`，桌面端 macOS Apple Silicon 构建可用。
- **安全类议题占据讨论中心**：多 profile 密钥泄漏、`config set` 绕过写保护、日志未脱敏上传等议题评论数居前，安全边界是本周期核心矛盾。
- **今日关闭 16+ 条长期 Issue**，覆盖 provider 兼容、skills 管理、记忆工具、WhatsApp 通道、npm 依赖等方向，历史积压得到实质性消化。
- **整体健康度：活跃但需消化**——输入侧繁荣、关闭侧有进展，但 381 条待合并 PR 与多条 P2 安全 Bug 仍需维护者优先排序。

---

## 2. 版本发布

### `canary.20261123T065600Z-v0.23.3`（2026-11-23）

- **渠道**：Canary（预发布通道），非稳定版，面向尝鲜与回归验证。
- **版本号**：`v0.23.3+canary.20261123T065600Z`。
- **已知内容**：构建产物表与下载入口，Hermes Desktop 提供 macOS Apple Silicon（M 系列）DMG。
- **破坏性变更 / 迁移注意**：发布说明正文未展开具体变更项（仅有构建表占位符），建议从 canary 升级前先备份 `~/.hermes/` 配置，并关注同期合并的配置/profile 相关 PR（如 #159486、#159450）对 `config.yaml` 解析路径的影响。
- 链接：发布页见仓库 Releases（摘要中未提供独立 release URL，可在 [Releases](https://github.com/NousResearch/hermes-agent/releases) 检索 tag）。

---

## 3. 项目进展

今日 PR 合并/关闭共 **119 条**，但榜单展示的 20 条 PR 均为 OPEN 状态，未披露具体 merged 明细。从 Issue 侧关闭情况可反推今日推进方向：

| 方向 | 已关闭 Issue | 进展说明 |
|---|---|---|
| 配置与安全边界 | [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) | `hermes config set` 不再绕过 system-config 写保护，堵住"前门改配置、绕过审批层"的路径 |
| 日志隐私 | [#46006](https://github.com/NousResearch/hermes-agent/issues/46006) | `hermes debug share` 未脱敏日志上传问题关闭，隐私风险收敛 |
| Provider 兼容 | [#17199](https://github.com/NousResearch/hermes-agent/issues/17199)、[#24782](https://github.com/NousResearch/hermes-agent/issues/24782)、[#62494](https://github.com/NousResearch/hermes-agent/issues/62494)、[#72096](https://github.com/NousResearch/hermes-agent/issues/72096) | deepseek 自定义端点、子 agent fallback base_url、model_aliases、`${VAR}` 展开四处配置兼容问题一并处理 |
| Skills 治理 | [#35674](https://github.com/NousResearch/hermes-agent/issues/35674)、[#32497](https://github.com/NousResearch/hermes-agent/issues/32497)、[#41939](https://github.com/NousResearch/hermes-agent/issues/41939) | 符号链接误报、agent 自改 skills、个人 skills 保护（👍 8）均关闭 |
| 工具与平台 | [#37906](https://github.com/NousResearch/hermes-agent/issues/37906)、[#61184](https://github.com/NousResearch/hermes-agent/issues/61184) | WhatsApp `@lid` JID 解析、`disabled_toolsets` 在 oneshot 下失效 |
| 供应链 | [#79021](https://github.com/NousResearch/hermes-agent/issues/79021)、[#5197](https://github.com/NousResearch/hermes-agent/issues/5197)、[#43997](https://github.com/NousResearch/hermes-agent/issues/43997) | npm 高危依赖、`npm audit` 常态化、npm 11 allowScripts 告警 |

**整体推进评估**：今日以"清理存量"为主，关闭的多为 4–7 月积累的 P2 级别问题，方向集中在**安全边界收敛 + provider 配置兼容 + skills 可治理性**，对稳定性提升明显。

---

## 4. 社区热点

按评论数排序，今日讨论最集中的议题：

1. **#143379（OPEN，45 评论）RFC：Doc-Chain 底层网络——读取、治理与压缩**  
   [链接](https://github.com/NousResearch/hermes-agent/issues/143379)｜10-23 创建，持续讨论近一个月。  
   诉求：让"持久记录"在会话压缩后仍保留来源可追溯，agent 可重读而非让用户重复输入。这是一个**架构级 RFC**，涉及 agent 上下文持久化与压缩策略，讨论热度最高但尚未形成落地共识。

2. **#59293（CLOSED，30 评论）`config set` 绕过写保护**  
   [链接](https://github.com/NousResearch/hermes-agent/issues/59293)｜已关闭。  
   诉求：审批层只拦 shell 写 `config.yaml`，却放过 CLI 前门，等于"Agent 可用终端关闭自己的审批层"。属于典型**权限旁路**，社区反应强烈，今日关闭是重要安全修复。

3. **#84834（OPEN，24 评论）Webhook Feature Package 图门控修复（meta-issue）**  
   [链接](https://github.com/NousResearch/hermes-agent/issues/84834)｜8-12 创建。  
   诉求：对整个 webhook 表面（入口、执行、投递、配置、管理 UI、部署、文档）做系统性修复包，是**功能包级别的追踪器**，说明 webhook 成熟度仍是短板。

4. **#82936（OPEN，16 评论）多 profile 下默认 profile 密钥泄漏到次级 profile**  
   [链接](https://github.com/NousResearch/hermes-agent/issues/82936)｜8-10 创建，安全边界问题，仍未解决。  
   诉求：`gateway.multiplex_profiles: true` 时，次级 profile 的 `terminal` 工具与 Kanban 子进程能看到默认 profile 的 secrets。**多租户/最小权限场景的硬伤**。

5. **#31584（OPEN，14 评论）memory-context 不应被视为权威用户消息**  
   [链接](https://github.com/NousResearch/hermes-agent/issues/31584)｜5-24 创建。  
   诉求：记忆注入的上下文应作为背景而非权威内容，降低被恶意利用的威胁面。与 #116788 形成"记忆安全"话题簇。

---

## 5. Bug 与稳定性

按严重程度排列（仅列 OPEN 状态）：

| 级别 | Issue | 问题 | 是否已有 Fix PR |
|---|---|---|---|
| **P2 / 安全** | [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) | 多 profile 下默认 profile secrets 泄漏至次级 profile 的 terminal 与子进程 | 未见 |
| **P3 / 安全** | [#116788](https://github.com/NousResearch/hermes-agent/issues/116788) | 后台 memory reviewer 可持久化用户明确要求不保存的敏感事实 | 未见 |
| **P2** | [#62810](https://github.com/NousResearch/hermes-agent/issues/62810) | CLI 处理函数返回 `True` 时进程退出码为 1（`bool` 是 `int` 子类） | 未见 |
| **P3** | [#109765](https://github.com/NousResearch/hermes-agent/issues/109765) | Cron 创建快照对命名自定义 provider 有损，重放回落到 OpenRouter | 未见 |
| **P3** | [#17345](https://github.com/NousResearch/hermes-agent/issues/17345) | Hermes 与 OpenClaw 的 skills 目录疑似互相污染 | 未见 |
| **P3** | [#38048](https://github.com/NousResearch/hermes-agent/issues/38048) | `url_safety` 误报 DNS64/NAT64 地址段 `64:ff9b::/96` | 未见 |
| **P4** | [#61703](https://github.com/NousResearch/hermes-agent/issues/61703) | `chrome-debug` 活动 profile 下全量备份停滞/不完整 | 未见 |
| **P3** | [#68001](https://github.com/NousResearch/hermes-agent/issues/68001) | 显式禁用 `x_search` 被 xAI 凭据自动启用覆盖 | 未见 |

**已有 fix PR 的稳定性问题**（同日提交）：

- [#159495](https://github.com/NousResearch/hermes-agent/pull/159495) / [#159491](https://github.com/NousResearch/hermes-agent/pull/159491)：修复 `skills_guard` 扫描器遇孤立代理项（U+D800–U+DFFF）抛 `UnicodeEncodeError` 崩溃，对应 #159406。
- [#159494](https://github.com/NousResearch/hermes-agent/pull/159494)：Linux systemd 网关上 stdio MCP 子进程继承 cgroup 导致资源失控，改为瞬态 scope 隔离（对应 #159117）。
- [#155749](https://github.com/NousResearch/hermes-agent/pull/155749)：长寿命网关不释放被取代的 memory-provider 注册，导致 SQLite 连接/fd 泄漏（实测 10 天 476 条）。
- [#148768](https://github.com/NousResearch/hermes-agent/pull/148768)：为长寿命网关增加 fd 预算金丝雀，提前告警。

> 稳定性主题：**资源泄漏（fd/SQLite）与安全边界**是当前两类高优先级风险，好消息是 fd/内存泄漏方向已有多个 PR 在路上。

---

## 6. 功能请求与路线图信号

结合 OPEN Issue 与 OPEN PR，判断下一版本可能纳入的方向：

| 需求 | 来源 | 配套 PR / 信号 | 纳入可能性 |
|---|---|---|---|
| **插件隐私钩子 `pre_llm_message`** | [#57364](https://github.com/NousResearch/hermes-agent/issues/57364) | 目前需本地 patch `gateway/run.py`，社区有真实 redaction 中间件场景 | 中高——接口小、诉求明确 |
| **Skills 新鲜度标记（load-time 复查提醒）** | [#154929](https://github.com/NousResearch/hermes-agent/pull/154929) | 已有 OPEN PR，引用 #72734 | 中高——PR 就绪 |
| **模型定价从远端 manifest 拉取** | [#157320](https://github.com/NousResearch/hermes-agent/pull/157320) | 已有 OPEN PR，解决新模型无内置费率问题 | 中——需评估网络依赖 |
| **推理中途自我重复的截断与反馈恢复** | [#158310](https://github.com/NousResearch/hermes-agent/pull/158310) | 已有 OPEN PR，扩展 `RunawayStreamWatch` | 中 |
| **桌面端工作区重构（含经典恢复）** | [#152168](https://github.com/NousResearch/hermes-agent/pull/152168) | 大型集成分支，链式 10+ PR | 中——体量大，需分阶段合并 |
| **Webhook 功能包系统性修复** | [#84834](https://github.com/NousResearch/hermes-agent/issues/84834) | Meta-issue，5×2×3 修复矩阵 | 中长期——追踪器级别 |
| **HAMP：Agent 地址 + 异步消息 + 加密身份** | [#38275](https://github.com/NousResearch/hermes-agent/issues/38275) | 纯提案，无 PR | 低——属于 A2A 生态级议题 |
| **Doc-Chain 底层网络 RFC** | [#143379](https://github.com/NousResearch/hermes-agent/issues/143379) | 讨论中，无 PR | 低——架构 RFC，周期长 |

---

## 7. 用户反馈摘要

从 Issues 评论提炼的真实诉求：

- **安全焦虑是首要痛点**：用户对"日志未脱敏上传公共 pastebin"（#46006）、"Agent 可通过 CLI 自行关闭审批层"（#59293）、"记忆系统持久化用户明确拒绝保存的信息"（#116788）表达强烈不安。核心诉求是**默认 fail-closed、可审计、用户可显式拒绝**。
- **多租户 / 多 profile 是真实使用场景**：`gateway.multiplex_profiles` 下的密钥隔离（#82936）、`X-Hermes-Session-Key` 会话级记忆隔离（#39492）、profile 插件加载身份（#159450）反复出现，说明 Hermes 正被用于**共享网关 + 最小权限**的部署形态，但隔离语义尚不完整。
- **本地模型 / 自定义端点兼容性**：deepseek 自定义 base_url（#17199）、本地 llama.cpp/vLLM 下工具调用被写成文本（#153255）、vision 路由回退（#159487）——用户希望"OpenAI 兼容"真正兼容。
- **Skills 的可治理性**：跨项目污染（#17345）、agent 自改 skills（#32497）、符号链接误报（#35674）、个人 skills 保护（#41939，👍 8）——用户既希望 agent 自我进化，又要求**确定性、可选择退出的保护**。
- **桌面端体验细节**：macOS 打包应用被以只读方式启动、CLI 链接悬空、Squirrel 更新失败（#159483、#159480），属于安装/更新链路的体验债。
- **满意度信号**：多个 P2 问题在今日关闭、#79021 获 4👍、#41939 获 8👍，说明维护者对高赞诉求有响应，社区正向反馈存在。

---

## 8. 待处理积压

以下为创建时间较早、评论较多但仍未关闭的条目，建议维护者优先排序：

| 类型 | 条目 | 已挂起 | 评论 | 备注 |
|---|---|---|---|---|
| Issue | [#143379](https://github.com/NousResearch/hermes-agent/issues/143379) Doc-Chain RFC | ~1 个月 | 45 | 讨论最热，需给出"接受/搁置/拆分"的明确结论 |
| Issue | [#84834](https://github.com/NousResearch/hermes-agent/issues/84834) Webhook 功能包 | ~3.5 个月 | 24 | Meta-issue，需里程碑化拆分 |
| Issue | [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) 多 profile 密钥泄漏 | ~3.5 个月 | 16 | **P3 安全，建议升级优先级** |
| Issue | [#31584](https://github.com/NousResearch/hermes-agent/issues/31584) memory-context 权威性 | ~6 个月 | 14 | 最老的高热条目之一 |
| Issue | [#109765](https://github.com/NousResearch/hermes-agent/issues/109765) Cron 快照有损 | ~2.5 个月 | 13 | 影响定时任务可复现性 |
| Issue | [#62810](https://github.com/NousResearch/hermes-agent/issues/62810) CLI 退出码 | ~4.5 个月 | 10 | P2，影响脚本集成 |
| Issue | [#17345](https://github.com/NousResearch/hermes-agent/issues/17345) skills 跨项目污染 | ~7 个月 | 8 | 最老条目，需定性（bug / by design） |
| Issue | [#38048](https://github.com/NousResearch/hermes-agent/issues/38048) DNS64 误报 | ~6 个月 | 7 | 误伤正常公网访问 |
| PR | [#152168](https://github.com/NousResearch/hermes-agent/pull/152168) 桌面工作区重构 | ~15 天 | — | 大型集成分支，建议明确合并节奏避免长期漂移 |
| PR | [#113538](https://github.com/NousResearch/hermes-agent/pull/113538) API 重试/流式文档澄清 | ~2 个月 | — | 文档类，合并成本低，可快速清理 |

**维护者关注建议**：

1. **安全优先**：#82936（密钥泄漏）与 #116788（记忆越权持久化）是目前风险最高的两条 OPEN 项，建议本周内给出处置结论。
2. **PR 队列治理**：381 条待合并 vs 119 条处理，审查吞吐是瓶颈；建议对 `P4`/`docs` 类 PR 做批量快速通道（如 #113538、#159493）。
3. **RFC 收口**：#143379 已讨论一个月，建议给出阶段性结论，避免高热议题长期悬置消耗社区注意力。

---

*日报基于 2026-11-24 抓取的 GitHub 公开数据生成；部分 PR 评论数未在数据源中披露，以"—"标注。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报（2026-11-24）

> 数据窗口：过去 24 小时。Issues 更新 4 条（新开/活跃 2，关闭 2）；PR 更新 48 条（待合并 32，已合并/关闭 16）；新版本 0 个。PR 评论数字段为 `undefined`，Issues 评论均为 0，以下热点按反应数与事件关联性判断。

## 1. 今日速览

- 项目今日无新版本发布，活跃度主要集中在 PR 层：48 条 PR 更新，其中关闭/合并 16 条，关闭/合并率约 33.3%，待合并 32 条，评审吞吐与积压压力并存。
- Issues 侧更新 4 条，关闭 2 条，关闭率 50%；KOOK 私聊语音解析与 `FUNDING.yml` 无效问题关闭，新开群聊 bare @ 上下文缺失 Bug 与插件更新日志增强请求。
- 核心修复信号明确：已关闭 PR [#11335](https://github.com/AstrBotDevs/AstrBot/pull/11335) 修复 delegated sessions 内置工具不可执行；同日 [#11347](https://github.com/AstrBotDevs/AstrBot/pull/11347) 针对 [#11346](https://github.com/AstrBotDevs/AstrBot/issues/11346) 提交修复，[#11349](https://github.com/AstrBotDevs/AstrBot/pull/11349) 增加 session waiter 回归测试。
- 健康度判断：开发活跃度高，合并/关闭动作存在，但 32 条待合并 PR 与多条长期 PR 表明维护者评审带宽仍是主要瓶颈。

## 2. 版本发布

过去 24 小时无新版本发布，暂无更新内容、破坏性变更或迁移注意事项。

## 3. 项目进展

- **PR 吞吐**：过去 24 小时 PR 更新 48 条，已合并/关闭 16 条，待合并 32 条。可见样本中明确为 `CLOSED` 的重要 PR 是 [#11335 fix: resolve executable builtin tools for delegated sessions](https://github.com/AstrBotDevs/AstrBot/pull/11335)，修复 `skills_like` 工具 schema 模式下子代理拿到 schema-only 内置工具、导致调用失败的问题，对 subagent 工具可靠性有直接价值。
- **Issue 关闭**：[#11281 KOOK 适配器无法解析私聊语音消息](https://github.com/AstrBotDevs/AstrBot/issues/11281) 已关闭，涉及 KOOK 新语音条 `voice` tag 验证错误；[#11291 `.github/FUNDING.yml` 无效](https://github.com/AstrBotDevs/AstrBot/issues/11291) 已关闭，属于仓库元数据规范修复。
- **在途推进**：[#11347 fix: inject group chat context for bare @ mentions](https://github.com/AstrBotDevs/AstrBot/pull/11347) 直接修复 [#11346](https://github.com/AstrBotDevs/AstrBot/issues/11346)，试图让仅 @ 机器人、无文本的群消息也记录并注入群聊上下文；[#11349 fix: wake session waiter timeout task on stop](https://github.com/AstrBotDevs/AstrBot/pull/11349) 修复会话提前停止后 timeout task 仍挂起的问题，并附带回归测试。
- **生态扩展**：[#11348 feat(provider): add bf16.ai chat completion provider preset](https://github.com/AstrBotDevs/AstrBot/pull/11348) 增加 OpenAI-compatible provider 预设，降低 WebUI 一键接入成本。
- 整体看，今日可核验的“完成项”主要是 #11335 与两个 Issue 关闭；更多进展处于在途 PR 状态。项目方向集中在群聊上下文一致性、子代理工具可靠性、会话生命周期与 provider 生态。

## 4. 社区热点

> 今日 Issues 评论均为 0，PR 评论数为 `undefined`，无法按评论数排序；以下按反应数与事件联动性筛选。

- **反应最高的功能请求**：[#11337 [enhancement] 插件更新窗口添加“更新日志”控件](https://github.com/AstrBotDevs/AstrBot/issues/11337)，获 1 👍。用户希望在点击更新前即可拉取并查看 `CHANGELOG.md`，而不是更新完成后才弹一次，且后续难以再次查看。背后诉求是插件更新决策透明度和更新前风险确认。
- **Bug 与修复同日联动**：[#11346 Bare @ mention skips group chat context injection](https://github.com/AstrBotDevs/AstrBot/issues/11346) 与修复 PR [#11347](https://github.com/AstrBotDevs/AstrBot/pull/11347) 同日出现。虽然暂无评论，但问题描述具体、复现路径清晰，且修复直接锚定 `handle_empty_mention` 与 `GroupChatContext`，显示群聊上下文一致性是用户可感知的高频场景。
- **长期受关注的功能型 PR**：[#10527 feat: add OAuth 2.0 support for MCP servers](https://github.com/AstrBotDevs/AstrBot/pull/10527) 自 2026-10-12 保持 OPEN，今日仍有更新。该 PR 让 AstrBot 通过 authorization-code 等方式连接受保护的 MCP HTTP endpoint，反映私有化/企业级 MCP 接入的认证诉求。
- **PR 协作复杂度热点**：liquidtoy001 的七 PR 栈涉及 WebChat 历史记录、按钮回调阻塞、工具审批权限、失败模型调用可见性等，例如 [#11282](https://github.com/AstrBotDevs/AstrBot/pull/11282)、[#11283](https://github.com/AstrBotDevs/AstrBot/pull/11283)、[#11304](https://github.com/AstrBotDevs/AstrBot/pull/11304)。这类依赖栈需要维护者按顺序评审，容易成为积压节点。

## 5. Bug 与稳定性

| 编号 | 状态 | 严重度 | 问题与影响 | Fix 情况 |
|---|---|---|---|---|
| [#11346](https://github.com/AstrBotDevs/AstrBot/issues/11346) | OPEN | 中 | 群聊中仅 @ 机器人、无文本时，不注入自上次回复以来的群聊上下文；带文本的 @ 正常。影响 group chat context aware 场景的一致性，非崩溃。 | 已有修复 PR [#11347](https://github.com/AstrBotDevs/AstrBot/pull/11347) 待合并。 |
| [#11281](https://github.com/AstrBotDevs/AstrBot/issues/11281) | CLOSED | 中 | KOOK 私聊语音消息无法解析，`tag 'voice'` 验证错误，影响 KOOK 新语音条接收与转译。 | 已关闭；样本中未展示对应 fix PR。 |
| [#11291](https://github.com/AstrBotDevs/AstrBot/issues/11291) | CLOSED | 低 | `.github/FUNDING.yml` 非合法 YAML，影响仓库元数据解析与赞助入口。 | 已关闭。 |

相关稳定性修复 PR：

- [#11335](https://github.com/AstrBotDevs/AstrBot/pull/11335) 已关闭：修复 delegated subagents 在 `skills_like` 模式下内置工具 schema-only 导致调用失败，属于子代理执行可靠性问题。
- [#11349](https://github.com/AstrBotDevs/AstrBot/pull/11349) OPEN：会话提前停止时唤醒 session waiter timeout task，避免任务挂起到 deadline；附带回归测试。
- [#11282](https://github.com/AstrBotDevs/AstrBot/pull/11282) OPEN：保持 WebChat 轮次在同一历史记录中，并避免按钮回调阻塞事件循环。
- [#11183](https://github.com/AstrBotDevs/AstrBot/pull/11183) OPEN：限制临时上传文件名长度，避免 255 字节目标文件名在 staging 时超过文件系统组件限制。

今日未见到崩溃、安全漏洞或大范围回归报告；主要风险集中在群聊上下文一致性、KOOK 语音解析和多 PR 栈的合并顺序。

## 6. 功能请求与路线图信号

- **近期小版本候选**：[#11347](https://github.com/AstrBotDevs/AstrBot/pull/11347) 群聊 bare @ 上下文修复、[#11349](https://github.com/AstrBotDevs/AstrBot/pull/11349) session waiter 生命周期修复、[#11348](https://github.com/AstrBotDevs/AstrBot/pull/11348) bf16.ai provider 预设。这些 PR 范围相对聚焦，若评审通过，较可能进入近期补丁或小版本。
- **插件生态透明度**：[#11337](https://github.com/AstrBotDevs/AstrBot/issues/11337) 插件更新前查看 CHANGELOG，目前无对应 PR，需 WebUI 与插件更新流程配合；若排期，适合作为插件管理体验优化进入后续版本。
- **插件市场治理**：[#11094 feat(plugin): let plugins declare their marketplace category in metadata](https://github.com/AstrBotDevs/AstrBot/pull/11094) 将插件市场分类从前端硬编码转为插件元数据声明，利好插件生态扩展。
- **MCP 认证能力**：[#10527](https://github.com/AstrBotDevs/AstrBot/pull/10527) OAuth 2.0 for MCP servers 属于中長期能力建设，涉及认证流程与安全评审，若能合并将显著增强受保护 MCP endpoint 的接入能力。
- **ChatUI 安全与控制**：[#11283](https://github.com/AstrBotDevs/AstrBot/pull/11283) 在工具执行前审批，并支持按会话设置权限模式，反映用户对 agent 工具调用的可控性需求；与 [#11304](https://github.com/AstrBotDevs/AstrBot/pull/11304) 失败语音/知识库模型调用可见性一起，指向 ChatUI 可观测性与安全治理。
- **配置与数据卫生**：[#11187](https://github.com/AstrBotDevs/AstrBot/pull/11187) 简化模型配置面板、[#10816](https://github.com/AstrBotDevs/AstrBot/pull/10816) 删除会话时可选清理 UMO 元数据，均属于中长期 UX/数据一致性改进。

## 7. 用户反馈摘要

> 今日 Issues 无评论，以下从 Issue 正文与 PR 描述提炼；无明确满意/不满意评分。

- **群聊使用场景**：用户频繁使用 @ 机器人触发对话，但仅 @、无文本时上下文丢失，说明“空 mention”也是真实交互入口，用户期待与普通 @ 文本一致的上下文感知。
- **KOOK 多模态入口**：KOOK 私聊语音条无法识别，影响语音消息接收与转译。该 Issue 已关闭，但样本中无评论验证，建议后续关注回归。
- **插件更新决策**：用户不希望更新完成后才看到一次 CHANGELOG，而希望在更新前查看变更并决定是否更新。这反映插件生态成熟后，用户对变更透明度、可回滚决策和更新前信息的需求增强。
- **工程规范敏感度**：贡献者指出 `FUNDING.yml` 非法 YAML，说明社区对仓库元数据与 CI/配置规范有较高关注。
- **PR 侧痛点信号**：MCP OAuth、子代理内置工具不可执行、session waiter 跨成员拦截、QQ 官方 markdown 回退消耗主动消息配额、临时文件清理误删新上传、上传文件名长度溢出、WebChat 历史拆分与按钮回调阻塞、主动 cron 请求遗漏插件工具、语音/知识库模型失败静默等，均是真实部署场景中的稳定性与可观测性问题。

## 8. 待处理积压

- **总体积压**：待合并 PR 32 条，占今日 PR 更新的 66.7%。建议维护者优先处理“正确性/数据安全”类 PR，再处理依赖栈与大型功能。
- [#9753 fix: scope the default session waiter identity to the sender](https://github.com/AstrBotDevs/AstrBot/pull/9753)：创建于 2026-08-20，已约 96 天。修复共享群会话中成员 A 的 waiter 拦截成员 B 消息的问题，关联 #9377，属于会话隔离正确性，建议优先评审。
- [#9878 fix: ignore stale group context records](https://github.com/AstrBotDevs/AstrBot/pull/9878)：创建于 2026-08-30，已约 86 天。处理 LLM 请求引用已移除上下文记录时可能注入无关历史的问题，与今日 #11346 群聊上下文问题同属高价值区域。
- [#10357 fix: protect recent files during temp cleanup](https://github.com/AstrBotDevs/AstrBot/pull/10357)：创建于 2026-10-03，已约 52 天。`TempDirCleaner` 在空间压力下可能删除新近上传/媒体文件，存在数据丢失风险，建议提升优先级。
- [#10527 OAuth 2.0 support for MCP servers](https://github.com/AstrBotDevs/AstrBot/pull/10527)：创建于 2026-10-12，已约 43 天。战略价值高但涉及认证安全，建议明确 review owner 与安全评估路径。
- **依赖栈风险**：[#11282](https://github.com/AstrBotDevs/AstrBot/pull/11282) 自述为七个相关 PR 之一，后续六个形成依赖栈，涉及 WebChat 历史、工具审批、失败调用可见性等。此类 PR 需要按顺序评审，否则容易长期滞留。
- **Issue 积压不突出**：当前样本中的 OPEN Issue 均为 2026-11-23 新开；[#11346](https://github.com/AstrBotDevs/AstrBot/issues/11346) 已有 fix PR，建议尽快推进评审；[#11337](https://github.com/AstrBotDevs/AstrBot/issues/11337) 需产品侧判断是否纳入插件管理体验排期。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报  
**日期：2026-11-24**  
**数据源：github.com/deepseek-ai/deepseek-harness**

## 1. 今日速览

2026-11-24，DeepSeek Harness 社区活跃度较高：过去 24 小时 Discussions 更新 **161 条**，但新版本发布 **0 个**，最新 Releases 为空。讨论热度集中在桌面端认证/Cookie 溢出、Windows 启动 ECONNRESET、内存与启动性能、MIR 支付可及性，以及多文件夹工作区和跨会话记忆等功能诉求。项目未启用 Issues/PR，代码合并需经 Releases 落地，因此本期缺少可核验的 Release 级合并摘要，不能将 PR 数为 0 简单解读为“无进展”。整体健康度判断：**社区参与强、问题反馈密集；但发布节奏与高严重度 Bug 的闭环证据偏弱，维护侧响应需持续观察**。

## 2. 版本发布

本期**无新版本发布**（0 个），最新 Releases 为空。因此无更新内容、破坏性变更或迁移注意事项可报告。

## 3. 项目进展

本期没有 Releases 落地，也没有可用的 changelog/合并摘要，因此无法列出“今日合并/关闭的重要 PR”及具体功能、修复推进量。按项目机制，代码合并经 Releases 落地；本次数据窗口中 **Release 维度交付为 0**，项目整体代码推进幅度无法量化。  
但社区侧并非无活动：24 小时内 Discussions 更新 161 条，反馈集中在桌面端稳定性、认证 Cookie、性能资源、支付可及性和工作区模型等方向。建议下期日报重点跟踪下一 Release 是否集中修复桌面认证与启动崩溃问题。

## 4. 社区热点

> 说明：展示的 15 条讨论中 👍 均为 0，反应数据不具区分度，以下按评论数排序。

| 热度 | 讨论 | 评论 | 状态/更新 | 核心诉求 |
|---|---|---:|---|---|
| 1 | [#12755 Support MIR card payments for DeepSeek API](https://github.com/deepseek-ai/deepseek-harness/discussions/12755) | 74 | OPEN，2026-11-23 更新 | 为俄罗斯用户增加 MIR 卡支付，降低 API 付费门槛 |
| 2 | [#9924 Desktop “Web authentication failed”: stale dsh-auth-* cookies overflow Host header limit (431)](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) | 37 | OPEN，2026-11-23 更新 | 桌面端认证失败，疑似 dsh-auth Cookie 累积导致 431 |
| 3 | [#8634 使用 DSH 一小时糟糕的体验](https://github.com/deepseek-ai/deepseek-harness/discussions/8634) | 19 | OPEN，2026-11-23 更新 | 新用户上手、插件编排、文档与社区沟通体验差 |
| 4 | [#5505 多文件夹工作区与 primary 文件夹（对齐 Codex 的项目模型）](https://github.com/deepseek-ai/deepseek-harness/discussions/5505) | 12 | OPEN，2026-11-24 更新 | 工作区从单目录扩展为有序多文件夹，并支持 primary |
| 5 | [#9692 Cross-chat memory, chat archive, user name memory, reasoning consistency](https://github.com/deepseek-ai/deepseek-harness/discussions/9692) | 10 | OPEN，2026-11-23 更新 | 跨会话记忆、聊天归档、用户名记忆、编辑消息后的推理一致性 |
| 6 | [#7574 tvision — Borland IDE reborn as a window manager for dsh agents](https://github.com/deepseek-ai/deepseek-harness/discussions/7574) | 7 | OPEN，2026-11-23 更新 | 插件生态展示：字符窗口管理器 |
| 7 | [#13820 Desktop: open a specific session from dsh://open?session= deep link](https://github.com/deepseek-ai/deepseek-harness/discussions/13820) | 6 | OPEN，2026-11-24 更新 | 深链直接打开指定会话，而非仅聚焦主窗口 |
| 8 | [#6322 ACP session/new never sends available_commands_update](https://github.com/deepseek-ai/deepseek-harness/discussions/6322) | 6 | OPEN，2026-11-23 更新 | ACP 客户端命令/技能面板为空 |

**分析：** 今日热点呈现“稳定性阻塞 + 可及性诉求 + 工作流增强”三层结构。最高评论的 #12755 是支付可及性问题，虽非核心 Agent 功能，但直接影响俄罗斯用户付费与采用；#9924 及后续多条桌面端 Cookie/ECONNRESET 问题显示桌面认证链路是当前最集中的稳定性风险；#5505、#9692、#13820 则反映用户希望 DSH 从单会话/单目录工具向更完整的项目型、长期记忆型 Agent 工作台演进。

## 5. Bug 与稳定性

> 该项目未启用 PR，无法从 PR 判断是否存在 fix；本期 Releases 为空，以下“修复信号”以是否出现 Release/合并摘要为准，均**未确认修复**。

| 严重度 | 问题 | 影响 | 评论/更新 | 修复信号 |
|---|---|---|---:|---|
| 高 | [#9924 Desktop Web authentication failed：stale dsh-auth-* cookies 溢出 Host header limit (431)](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) | 桌面端 Web 认证失败，可能阻断登录/使用 | 37 / 2026-11-23 | 无 PR 数据；本期无 Release，未确认修复 |
| 高 | [#14019 dsh-desktop 0.2.2-rc.5 crashes on startup with uncaught ECONNRESET；quit 后残留进程导致复发（Windows）](https://github.com/deepseek-ai/deepseek-harness/discussions/14019) | Windows 启动崩溃，残留进程使问题反复 | 4 / 2026-11-24 | 无 PR 数据；未确认修复 |
| 高 | [#13565 Windows: desktop boot handshake gets ECONNRESET while Host is healthy](https://github.com/deepseek-ai/deepseek-harness/discussions/13565) | 桌面启动握手失败，重试无效 | 4 / 2026-11-23 | 无 PR 数据；未确认修复 |
| 高 | [#12911 dsh-desktop fails to start after ~70 launches：dsh-auth cookies 按随机端口累积并溢出 Node 16 KiB 请求头上限（431）](https://github.com/deepseek-ai/deepseek-harness/discussions/12911) | 长期使用后桌面端无法启动，疑似与 #9924 同源 | 4 / 2026-11-23 | 无 PR 数据；未确认修复 |
| 中高 | [#12021 Idle sessions never release heap，且无法卸载会话（host 爬升至 OOM）](https://github.com/deepseek-ai/deepseek-harness/discussions/12021) | 空闲会话持有堆内存，长期运行可能 OOM | 4 / 2026-11-23 | 无 PR 数据；未确认修复 |
| 中 | [#11608 Eager projection-cache load dominates `dsh web` startup：969 records / 209 MB → 5.3 s validation（26%）](https://github.com/deepseek-ai/deepseek-harness/discussions/11608) | 会话数增长后启动变慢、RSS 升高 | 5 / 2026-11-23 | 无 PR 数据；未确认修复 |
| 中 | [#6322 ACP session/new never sends available_commands_update](https://github.com/deepseek-ai/deepseek-harness/discussions/6322) | ACP 客户端命令/技能面板为空，影响集成体验 | 6 / 2026-11-23 | 无 PR 数据；未确认修复 |

**稳定性判断：** 当前最高优先级应是桌面端认证 Cookie 累积与 Windows 启动 ECONNRESET/崩溃。多条讨论指向 `dsh-auth` Cookie、随机端口、Host header 431 与桌面启动握手，可能形成同一类根因簇。性能侧，启动缓存校验和空闲会话堆内存问题会影响长生命周期用户。

## 6. 功能请求与路线图信号

| 功能请求 | 热度/信号 | 可能影响 | 路线图判断 |
|---|---:|---|---|
| [#12755 支持 MIR 卡支付](https://github.com/deepseek-ai/deepseek-harness/discussions/12755) | 74 评论，今日最高 | 提升俄罗斯地区 API 付费可及性 | 需求强，但偏商业化/支付通道；无 PR/Release 信号，无法判断纳入版本 |
| [#5505 多文件夹工作区与 primary 文件夹](https://github.com/deepseek-ai/deepseek-harness/discussions/5505) | 12 评论，11-24 仍有更新 | 对齐 Codex 项目模型，支持跨前端/后端/共享库任务 | 与真实项目工作流高度相关，具备中长期路线图价值；暂无 Release 信号 |
| [#9692 跨会话记忆、聊天归档、用户名记忆、编辑消息推理一致性](https://github.com/deepseek-ai/deepseek-harness/discussions/9692) | 10 评论 | 提升个人 AI 助手长期可用性 | 属于助手核心能力方向，但涉及隐私与数据管理，需产品设计；暂无 PR 信号 |
| [#13820 桌面端通过 `dsh://open?session=` 深链打开指定会话](https://github.com/deepseek-ai/deepseek-harness/discussions/13820) | 6 评论，11-24 更新 | 改善通知、脚本、Agent HUD 等外部工具联动 | 实现边界较清晰，若桌面端迭代可能优先纳入；暂无 Release 证据 |
| [#13724 DSH for Android and iOS](https://github.com/deepseek-ai/deepseek-harness/discussions/13724) | 5 评论 | 移动端远程执行 Agent | 战略级需求，工程量大；短期纳入可能性低 |
| [#8565 侧边栏底部插件入口横排拥挤，建议纵向堆叠](https://github.com/deepseek-ai/deepseek-harness/discussions/8565) | 4 评论 | 插件增多后的桌面 UI 可用性 | 小范围 UI 改进，若桌面端集中修整可能纳入；暂无 PR 信号 |

**路线图信号：** 由于本期无 PR/Release，无法结合合并记录判断“下一版本必进项”。按影响面排序，短期更可能优先处理阻塞性稳定性问题；功能侧以多文件夹工作区、深链会话、跨会话记忆的社区信号最强。

## 7. 用户反馈摘要

- **桌面端稳定性是最大痛点：** 用户集中反馈认证失败、431 Host header 溢出、Windows 启动 ECONNRESET、退出后残留进程导致复发，且部分问题跨越多个 rc 版本仍存在。相关讨论：[#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924)、[#14019](https://github.com/deepseek-ai/deepseek-harness/discussions/14019)、[#12911](https://github.com/deepseek-ai/deepseek-harness/discussions/12911)。
- **长期使用后的性能与资源问题明显：** 会话数增长导致 `dsh web` 启动变慢，空闲会话不释放堆内存并可能 OOM，影响重度/长期用户。相关讨论：[#11608](https://github.com/deepseek-ai/deepseek-harness/discussions/11608)、[#12021](https://github.com/deepseek-ai/deepseek-harness/discussions/12021)。
- **新用户上手与插件编排门槛偏高：** #8634 中用户自述“不会用、看不懂文档”，并希望用大白话说明预设捆绑插件；评论区还出现对社区沟通氛围的不满。相关讨论：[#8634](https://github.com/deepseek-ai/deepseek-harness/discussions/8634)。
- **插件生态有正向展示，但 UI 承载需改进：** tvision 插件展示获得关注，同时侧边栏底部插件入口拥挤问题说明插件数量增长后桌面布局需要更可扩展。相关讨论：[#7574](https://github.com/deepseek-ai/deepseek-harness/discussions/7574)、[#8565](https://github.com/deepseek-ai/deepseek-harness/discussions/8565)。
- **平台可及性与工作流诉求突出：** 俄罗斯用户受支付渠道限制；部分用户希望移动端远程执行 Agent；项目型用户希望多文件夹工作区和跨会话记忆。相关讨论：[#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755)、[#13724](https://github.com/deepseek-ai/deepseek-harness/discussions/13724)、[#5505](https://github.com/deepseek-ai/deepseek-harness/discussions/5505)、[#9692](https://github.com/deepseek-ai/deepseek-harness/discussions/9692)。

## 8. 待处理积压

> 以下为长期 OPEN、评论较多但本期仍未在 Release 中体现闭环的重要讨论。讨论仍有更新，说明并非无人关注；但维护侧结论/修复信号不足。

| 讨论 | 创建时间 | 开放时长（约） | 评论 | 风险/提醒 |
|---|---|---:|---:|---|
| [#9924 桌面认证 Cookie 溢出 431](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) | 2026-10-17 | 约 38 天 | 37 | 高严重度，影响桌面端认证；建议优先给出根因与修复计划 |
| [#8634 使用 DSH 一小时糟糕体验](https://github.com/deepseek-ai/deepseek-harness/discussions/8634) | 2026-10-02 | 约 53 天 | 19 | 涉及新手引导、文档、插件编排与社区沟通，长期未闭环 |
| [#5505 多文件夹工作区与 primary 文件夹](https://github.com/deepseek-ai/deepseek-harness/discussions/5505) | 2026-09-03 | 约 82 天 | 12 | 高价值路线图需求，需明确是否采纳及设计方向 |
| [#9692 跨会话记忆与聊天归档](https://github.com/deepseek-ai/deepseek-harness/discussions/9692) | 2026-10-14 | 约 41 天 | 10 | 助手核心能力诉求，涉及隐私与数据管理，需产品表态 |
| [#6322 ACP 不发送 available_commands_update](https://github.com/deepseek-ai/deepseek-harness/discussions/6322) | 2026-09-11 | 约 74 天 | 6 | 影响 ACP 集成体验，问题边界清晰，适合优先修复 |
| [#11608 `dsh web` 启动时投影缓存加载过重](https://github.com/deepseek-ai/deepseek-harness/discussions/11608) | 2026-10-31 | 约 24 天 | 5 | 性能问题，随着会话数增长会持续恶化 |
| [#12021 空闲会话不释放堆内存](https://github.com/deepseek-ai/deepseek-harness/discussions/12021) | 2026-11-03 | 约 21 天 | 4 | 可能导致 OOM，建议纳入桌面/Host 稳定性专项 |
| [#8565 侧边栏底部插件入口横排拥挤](https://github.com/deepseek-ai/deepseek-harness/discussions/8565) | 2026-10-01 | 约 54 天 | 4 | 低严重度但影响插件生态扩展体验 |

**维护者关注建议：** 优先处理 #9924 / #12911 / #14019 / #13565 构成的桌面认证与 Windows 启动稳定性簇；其次评估 #12021、#11608 的资源与启动性能专项；功能路线图侧可对 #5505、#9692、#13820 给出采纳/不采纳的明确信号，以降低长期 OPEN 讨论的积压感。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*