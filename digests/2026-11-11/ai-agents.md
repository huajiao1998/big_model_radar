# OpenClaw 生态日报 2026-11-11

> Issues: 284 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-11 01:35 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-11-11

> 数据窗口：过去 24 小时｜样本：Issues 284 条（高评论 Top 50 明细）、PR 500 条（高评论 Top 30 明细）、Releases 2 个
> 说明：PR 样本的评论数字段在原始数据中缺失（`undefined`），故 PR 部分以状态、评分与摘要为主，不做评论量排名。

---

## 1. 今日速览

项目维持**高吞吐、高并行**状态：24 小时内 284 条 Issue 更新（新开/活跃 195、关闭 89，关闭率 31.3%）、500 条 PR 更新（合并/关闭 154，占 30.8%），并发布 2 个版本，工程节奏处于同类开源 Agent 项目的高位。

但**评审带宽是当前主要瓶颈**：346 条 PR 待合并，且高评论 PR 样本 30 条全部为 OPEN，讨论热度集中在"等待维护者裁决"而非"已落地"。

**稳定性风险集中在三类**：会话/转录状态一致性（session-state 与 data-loss 标签高频出现）、更新与迁移路径不可达（升级被旧配置键或旧 updater 阻断）、以及 Codex/claude-cli 等 CLI 后端会话生命周期缺陷。当前样本中仍有 **3 个 P0 处于 OPEN**（#190563、#194664、#147728）。

**产品决策积压明显**：多条 7 月创建的高价值 Issue 仍带 `needs-product-decision` 标签（如 #112313、#112638），说明"修复形态清楚但缺产品结论"是长期未闭环的根因。

| 指标 | 数值 | 判读 |
|---|---|---|
| Issue 更新 | 284（新开/活跃 195 / 关闭 89） | 关闭率 31.3%，处理中但净增仍在扩大 |
| PR 更新 | 500（待合并 346 / 合并关闭 154） | 待审:已处理 ≈ 2.25:1，评审队列偏深 |
| 版本发布 | 2 | 一条主线 stable + 一条退役维护线 |
| 样本内 OPEN P0 | 3 | 均为会话/Provider 层，影响面大 |
| 样本内 OPEN P1 | 5 | 含 Windows 启动、大库启动、权限失效 |

---

## 2. 版本发布

### v2026.11.3（主线 stable）

**更新内容（据 Release Note 摘要）**
- **私有任务结果隔离**：私有子代理（subagent）的完成内容不再混入流式聊天回复，避免私密中间产物泄露到用户可见通道（#188490，感谢 @fuller-stack-dev）。
- **子任务交接可靠性**：父代理在取消子任务后，可将工作交接给替代任务，而不会遗留被取消的子任务处于悬挂状态。

**破坏性变更**：Release Note 未声明破坏性变更。
**迁移注意事项**：
- 若你的部署依赖"子代理输出自动出现在父会话流式回复中"的行为，本次隔离属于**行为语义变更**，需要检查依赖该输出的下游集成/日志采集。
- 该版本**不包含** #193962 所指向的 SQLite header-probe 修复（该修复位于 2026.11.5-beta.1，见 #187197），从 2026.10.10 升级受阻的用户仍需关注后续版本。

### v2026.9.37（extended-stable，gateway-only）

- 发布性质：**退役维护线**上的 gateway-only 版本，由维护者显式决策发布，内容为 2026 年 9 月末的 OpenClaw 加上关键安全更新、可靠性与性能修复，以及新增模型支持。
- **不建议作为升级目标**：该版本不是功能主线，仅用于仍停留在 9 月分支、需要安全补丁的网关部署。
- **迁移注意**：不要把它当作 2026.11.x 的回退路径；跨线回退会触及配置迁移与 schema 版本，已有 #144739、#193157 一类"更新被候选准入拒绝"的先例。

> Release 链接：https://github.com/openclaw/openclaw/releases

---

## 3. 项目进展

**吞吐**：今日 154 条 PR 合并/关闭、89 条 Issue 关闭。需要指出的是，本次提供的 30 条高评论 PR **全部为 OPEN**，说明当日合入的主要是低讨论度的小型修复，而复杂改动仍堆积在评审环节。

**已闭环的高价值 Issue（样本内 12 条关闭）**：

| Issue | 级别 | 结论 | 意义 |
|---|---|---|---|
| [#193962](https://github.com/openclaw/openclaw/issues/193962) | P0 | 已关闭 | SQLite header-probe 超时修复从 2026.10.10 起"无法通过 update 到达"，是当日最高优先级的更新链路缺陷 |
| [#154572](https://github.com/openclaw/openclaw/issues/154572) | P1 | 已关闭 | `sessions_spawn` 指向 claude-cli 子代理必然 `SessionTranscriptWriterClaimReboundError`（约 350ms 失败），修复形态清晰 |
| [#144797](https://github.com/openclaw/openclaw/issues/144797) | P2 | 已关闭 | 复用 claude-cli 会话保留已删除 `--mcp-config`，导致 `mcp__openclaw__*` 工具中途 401 |
| [#149631](https://github.com/openclaw/openclaw/issues/149631) | P2 | 已关闭 | CI preflight 121 个 job 超出 120 上限，`ci-gate` 在测试开始前即红 |
| [#156898](https://github.com/openclaw/openclaw/issues/156898) | P1 | 已关闭 | usage-cost 后台刷新反复耗尽 worker heap |
| [#149221](https://github.com/openclaw/openclaw/issues/149221) | P2 | 已关闭 | "no active tool authority snapshot" 竞态导致 Control UI 重复回复 |
| [#175645](https://github.com/openclaw/openclaw/issues/175645) | P2 | 已关闭 | 子代理 announce run 中主动 `NO_REPLY` 被误判 empty_response、烧穿整条 fallback 链 |

**接近落地的在途工作（`status: ready for maintainer look`）**：
- [#196923](https://github.com/openclaw/openclaw/pull/196923) 网关优雅重启时保留已入队的 ingress 消息（当前会被静默取消）——直接对应消息丢失类投诉。
- [#196868](https://github.com/openclaw/openclaw/pull/196868) Tool Search 模式下 `tool_describe` 每次调用回传完整 `outputSchema`，实测 620 次调用产生 **18.4M tokens** 浪费，属成本级修复。
- [#196465](https://github.com/openclaw/openclaw/pull/196465) `doctor` 将 agent 目录 `readdir` 失败折叠为 `[]`，导致 OAuth 影子扫描"报清白"。
- [#196937](https://github.com/openclaw/openclaw/pull/196937) 沙箱工作区导入后避免全量内容哈希，属性能向改进。

**整体推进评估**：项目在"缺陷修复速度"上表现健康（P0/P1 有明确关闭记录），但在"评审—合并转化率"上偏弱；同时 v2026.9.37 的存在说明维护者需同时负担一条退役线的安全背书，长期会稀释主线评审资源。

---

## 4. 社区热点

### Issues（按评论数）

1. **[#150635](https://github.com/openclaw/openclaw/issues/150635)（27 条，OPEN，P2，🦞 diamond lobster）** — 短期回忆存储每夜淘汰已召回条目，导致 dreaming deep phase 永不晋升。
   背后诉求：**记忆系统的"晋升"承诺不可验证**。当短期存储达到 512 条上限后，夜间会话转录灌入大量零召回条目，把有价值的召回挤出，Dreams 页面看起来"什么都没发生"。这是 #138366、#151173、#112638 同一族问题的核心。

2. **[#193962](https://github.com/openclaw/openclaw/issues/193962)（26 条，已关闭，P0）** — 修复已在 beta 中，但用户"够不到"。
   背后诉求：**发布可达性 = 修复价值**。用户反复尝试 `openclaw update` 并在 `package-update` 阶段 `spawnSync node ETIMEDOUT`，形成"已修复但不可用"的信任损耗。

3. **[#123792](https://github.com/openclaw/openclaw/issues/123792)（18 条，OPEN，P2）** — CLI 后端下助手回合双渲染（逐块实时视图 + 聚合记录各存一份）。影响 Control UI 与 Android，Telegram 不受影响。

4. **[#154572](https://github.com/openclaw/openclaw/issues/154572)（16 条，已关闭，P1）** — claude-cli 运行时子代理 spawn 必失败。

5. **[#151962](https://github.com/openclaw/openclaw/issues/151962)（15 条，OPEN，stale）** — "幽灵用户消息"：heartbeat 轮询 / 异步完成 / 排队消息等内部运行字符串被当作真实用户 prompt 提交，且不落 `transcript_events`，用户在 Control UI 里看不到自己"说过"这些话。

### PRs（高关注度）

- [#196923](https://github.com/openclaw/openclaw/pull/196923) 重启期间保留入队消息（🦞 diamond lobster）
- [#196868](https://github.com/openclaw/openclaw/pull/196868) `tool_describe` 上下文洪泛（18.4M tokens 实测）
- [#196914](https://github.com/openclaw/openclaw/pull/196914) 插件副作用与过期会话绑定（XL，含安全边界风险标记）
- [#196200](https://github.com/openclaw/openclaw/pull/196200) Profile 中管理各 agent 的 GitHub 账号（XL，含截图证明）

**热点背后的共同诉求**：用户不再只报"崩溃"，而是集中报**状态一致性与可观测性**——消息到底有没有发出去、存了几份、为什么 UI 看不到、为什么"已修复"却升不上去。

---

## 5. Bug 与稳定性

### P0（影响面最大，优先处理）

| Issue | 状态 | 问题 | Fix PR |
|---|---|---|---|
| [#190563](https://github.com/openclaw/openclaw/issues/190563) | OPEN，regression，`needs-security-review` | 无法恢复被暂停的 Codex 会话：provider review 与 native thread 指向不同线程 | 未见（`no-new-fix-pr`） |
| [#194664](https://github.com/openclaw/openclaw/issues/194664) | OPEN | Codex "protected continuation" 阻塞所有后续消息，而 Stop 报告无活跃运行（2026.11.1） | 未见 |
| [#147728](https://github.com/openclaw/openclaw/issues/147728) | OPEN | xAI OAuth 推理全部 426：`x-grok-client-version` 携带 OpenClaw 自身版本号；隔离/utility 调用完全缺失 Grok 头 | 未见（有 source-repro） |
| [#193962](https://github.com/openclaw/openclaw/issues/193962) | **已关闭** | 更新链路无法到达 header-probe 修复 | 已在 2026.11.5-beta.1（#187197） |

### P1

- [#170928](https://github.com/openclaw/openclaw/issues/170928)（OPEN）Windows 2026.10.2 网关启动需 7–9 分钟，就绪后仍间歇无响应，`impact:crash-loop`。**无 fix PR**。
- [#181459](https://github.com/openclaw/openclaw/issues/181459)（OPEN）3.5GB agent DB：启动阻塞 18s 打开 / 4–6 分钟就绪，随后长期 `commit checkpoint expired`；embeddings 存 3 份。**无 fix PR**（`bulk-filed`）。
- [#194403](https://github.com/openclaw/openclaw/issues/194403)（OPEN）helper 完成后的续跑会自我失效执行权限，失败续跑把后台工作挂住并阻塞后续人类消息。**无 fix PR**。
- [#168101](https://github.com/openclaw/openclaw/issues/168101)（OPEN）工具调用后 429 的 `Retry-After` 忽略 `retry.provider.maxRetryDelayMs`，占满 session lane 整段睡眠。**无 fix PR**。
- [#159230](https://github.com/openclaw/openclaw/issues/159230)（OPEN，`impact:security`）`message_tool_only` 模式下 stranded-reply 恢复会把**私有最终文本原样回灌给模型**，并向私聊强推一条英文错误提示，且无开关可关。**无 fix PR**。

### 崩溃 / 数据丢失 / 回归（P2 但性质严重）

- [#153430](https://github.com/openclaw/openclaw/issues/153430)（崩溃）深层 `$include` 配置通过解析后在 deep-merge / 环境变量替换 / 迁移探测阶段 `RangeError`；**有 Open PR 关联**。
- [#143973](https://github.com/openclaw/openclaw/issues/143973)（存储膨胀）`view_image` 结果内联完整 base64：**1.3% 的 transcript 事件占据 80% 存储字节**（451MB / 564MB）。
- [#141172](https://github.com/openclaw/openclaw/issues/141172) 首次提交前死亡的 run 永久泄漏 `agent.run.started`，trajectory flush 外键失败，`appendTranscriptEventSync` 抛 `session-entry-missing`。
- [#144594](https://github.com/openclaw/openclaw/issues/144594) 已 accepted 的跨会话消息可长期滞留 `interrupted` 态，无自动重放、无双向告警。
- [#193157](https://github.com/openclaw/openclaw/issues/193157) 升级到 2026.11.5-beta.1 在候选准入被 `invalid-config` 拒绝（配置仍含已退役的 `agents.defaults.heartbeat`）——**退役配置键未做兼容迁移**，属升级阻塞型回归。
- [#177077](https://github.com/openclaw/openclaw/issues/177077) #172173 的"中文配额耗尽跳过同模型重试"修复未出现在 v2026.10.5 产物中，MiniMax 仍重试 9 次才 fallback。
- [#123792](https://github.com/openclaw/openclaw/issues/123792) CLI 后端回合双持久化。
- [#92473](https://github.com/openclaw/openclaw/issues/92473) 模型回退提示（`Model Fallback: A -> B`）泄露到外部用户可见渠道，暴露内部路由。

---

## 6. 功能请求与路线图信号

### 强信号（已有维护者决策或明确实现形态）

- **[#140213](https://github.com/openclaw/openclaw/issues/140213)（7 条）多策略别名解析到同一模型** — 已附带维护者决策包（decision packet），范围已被作者澄清收敛。**最可能进入下一版本**。
- **[#192009](https://github.com/openclaw/openclaw/issues/192009)（10 条）显式授权跨 Provider 的 cron fallback 账号** — 诉求具体（OpenAI 主 + xAI 备，配额耗尽时定时任务不断），与现有 fallback 机制同源，落地成本可控。
- **[#151980](https://github.com/openclaw/openclaw/issues/151980)（7 条）会话级模型 pin 应继承 agent 的 fallback 链** — 当前 pin 会把候选列表压成单模型，Provider 故障即整轮失败。与 #192009 构成**"路由治理"主题**，建议打包设计。

### 中等信号（需产品决策）

- **[#138366](https://github.com/openclaw/openclaw/issues/138366)（12 条）让 memory slot owner 驱动 Dreams 页面** — 给 `MemoryPluginCapability` 增加可选 `dreaming` provider，`doctor.memory.*` 优先咨询它。与今日头号 Issue #150635 是同一问题的"可插拔化解法"，若采纳可一并解决梦境页不可观测。
- **[#138990](https://github.com/openclaw/openclaw/issues/138990)（10 条）为前台 WebChat 长任务强制检查点与有界让出** — 静默时间/工具调用预算触发状态更新并干净 yield。
- **[#112313](https://github.com/openclaw/openclaw/issues/112313)（12 条）死信出站队列条目永久不可清除** — 所有 accessor 都过滤 `status='pending'`，`openclaw health` 永久计数。

### 弱信号 / 体验类

- [#155039](https://github.com/openclaw/openclaw/issues/155039)（7 条）团队侧栏 agent 分组手动排序（拖拽 + 键盘）。
- [#150250](https://github.com/openclaw/openclaw/issues/150250)（已关闭）Skill Workshop 学习覆盖率验证 — 已被关闭，可能收敛为其他工作流。
- [#119294](https://github.com/openclaw/openclaw/issues/119294)（已关闭，2 👍）MCP 2.0（2026-07-28 无状态规范）迁移：`@modelcontextprotocol/sdk` → 拆分 client/server v2 包。

---

## 7. 用户反馈摘要

**真实痛点（按出现频次）**

1. **"升级 = 赌博"**：`openclaw update` 在 `package-update` 阶段超时（#193962）、候选状态 schema 迁移后旧版本继续运行（#144739）、退役配置键导致准入拒绝（#193157）、已合并修复未进产物（#177077）。四类问题指向同一件事：**发布工程的验证矩阵没覆盖"从老旧版本升级"这条路径**。
2. **"看不见的状态"**：幽灵用户消息（#151962）、双份持久化（#123792、#149221）、死信不可见不可清（#112313）、`doctor` 静默报清白（#196465）。用户反复表达"我不知道系统到底记了什么"。
3. **隐私/边界焦虑**：私有子代理结果流入流式回复（今日已在 v2026.11.3 修复）、`message_tool_only` 回灌私有文本到模型并外发错误提示（#159230）、模型回退提示泄露到终端用户（#92473）。这类问题评论数不高但**升级为 P1/P0 的比例最高**。
4. **规模化的代价**：3.5GB agent DB 启动 4–6 分钟（#181459）、base64 图片占 80% 存储（#143973）、`tool_describe` 620 次调用烧 18.4M tokens（#196868）、19–20 个 agent 时空闲仍吃满一核（#192496）。重度用户（多 agent、长会话、多模态）是压力主要来源。
5. **平台差异**：Windows 启动 7–9 分钟（#170928）、插件安装 `EPERM symlink`（#196956）、macOS 可见聊天页拉高 WindowServer CPU（#138918）。跨平台一致性仍是薄弱环节。

**满意侧信号**：`clawsweeper` 自动分级（🦞 diamond lobster / 🦪 silver shellfish 等）与 `source-repro`、`proof: sufficient` 标签让问题可复现性显著提升；多条 P0/P1 在数日内闭环（#193962 创建于 11-06、11-10 关闭；#194403 创建于 11-07 已进入讨论）。用户报告结构规范（Bug type / Beta blocker / Summary 模板）表明社区已形成协作惯例。

---

## 8. 待处理积压（建议维护者本周内表态）

| 条目 | 创建时间 | 停留 | 阻塞原因 |
|---|---|---|---|
| [#57278](https://github.com/openclaw/openclaw/issues/57278) Telegram bot 图片归因校验 | 2026-03-29 | ~7.5 个月 | `needs-product-decision` + `linked-pr-open`，报告者已自行修正原始结论（"不该丢弃全部 bot 附件"） |
| [#92473](https://github.com/openclaw/openclaw/issues/92473) 模型回退提示泄露到外部渠道 | 2026-06-12 | ~5 个月 | `needs-product-decision`，1 👍，安全语义明确但无人裁决 |
| [#112313](https://github.com/openclaw/openclaw/issues/112313) 死信队列条目永久不可清除 | 2026-07-21 | ~3.7 个月 | `fix-shape-clear` 但 `needs-product-decision` |
| [#112638](https://github.com/openclaw/openclaw/issues/112638) `session.maintenance enforce` 无法约束存储上限 | 2026-07-22 | ~3.7 个月 | 同上，thread/channel 条目豁免所有回收 |
| [#150635](https://github.com/openclaw/openclaw/issues/150635) 短期回忆淘汰导致 dreaming 永不晋升 | 2026-09-17 | ~2 个月 | 27 条评论、`linked-pr-open`，是当前讨论最热的未决 Issue |
| [#132767](https://github.com/openclaw/openclaw/issues/132767) 通用 CLI host 缺 "assemble-before-prompt"，`systemPromptAddition` 延迟一回合 | 2026-08-29 | ~2.4 个月 | 修复 PR #100984 曾于 2026-08-03 关闭未合并，**且从未建 Issue**，属流程缺口 |
| [#181459](https://github.com/openclaw/openclaw/issues/181459) 3.5GB DB 启动不确定（P1） | 2026-10-23 | ~3 周 | `bulk-filed`，与 #166634 关联，无 fix PR |
| [#154962](https://github.com/openclaw/openclaw/pull/154962) UI 回合间标题导航（无障碍） | 2026-09-21 | ~7 周 | PR 长期 OPEN，`stale`，无障碍类改动易被淹没 |
| [#155273](https://github.com/openclaw/openclaw/pull/155273) Telegram 回复同一图片导致重复投递 | 2026-09-21 | ~7 周 | 🦞 diamond lobster + `proof: telegram-e2e` 齐备，仍待合并 |

**结构性提醒**：
- **"`fix-shape-clear` + `needs-product-decision`"组合是最贵的积压形态**——工程侧已就绪，只差一句产品结论。建议维护者设立固定的产品决策批次（例如每周一次集中裁决），一次性清掉 #112313 / #112638 / #92473 / #138366 这一类。
- **#132767 暴露的流程问题**比 Issue 本身更值得关注：带测试的修复 PR 被关闭且未留 Issue，导致问题在两个月后以"无归属"状态重新浮现。
- **346 条待合并 PR** 中，`status: 👀 ready for maintainer look` 的条目（如 #196923、#196868、#196465、#196937）应优先清空，它们的边际收益最高。

---

*本报告基于所提供的 GitHub 数据快照生成；Issue/PR 明细为"评论数最多"的截断样本，比例指标仅代表样本内分布，不代表全量。*

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析

**数据窗口：2026-11-11（过去 24 小时）｜样本：7 个项目**

---

## 1. 生态全景

个人 AI 助手与自主智能体开源生态已形成**清晰的三级梯队**：以 OpenClaw、hermes-agent 为代表的超级项目单日 PR/Issue 吞吐达 500 量级，构成生态主干；Zeroclaw、QwenPaw、AstrBot 以 15–50 条/日的稳定节奏推进版本收敛；PicoClaw 等项目处于静默或单点维护状态。**技术演进的主轴正从"功能可用"转向"状态可验证"**——各项目高频出现的不再是崩溃类 Bug，而是消息是否发出、存了几份、为何 UI 看不到、为何"已修复"却升级不到。与此同时，**统一网关/单进程架构、插件生态爆发、跨 Provider 参数协商**成为三个最强共性信号，而**发布工程可靠性（升级链路可达性）**已成为跨项目、跨语言、跨架构的集体性信任痛点。

---

## 2. 各项目活跃度对比

| 项目 | Issues 24h（活跃/关闭） | PR 24h（待合并/已处理） | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 284（195 / 89，31.3%） | 500\*（346 / 154，30.8%） | **2**（stable + 退役线） | 高吞吐·评审瓶颈显著（待审:已处理 ≈ 2.25:1）·3×P0 OPEN |
| **hermes-agent** | 500\*（415 / 85，17%） | 500\*（355 / 145，29%） | 1（v0.23.1，聚合 618 PR） | 极高热·统一网关消化期·Kanban 故障簇+P0 数据回滚 |
| **Zeroclaw** | 16（4 / 12，75%） | 50（39 / 11，22%） | 0（v0.9.0 备妥待发） | 高活跃（8.5/10）·发布前收口·合并漏斗偏窄 |
| **QwenPaw** | 14（9 / 5，36%） | 38（20 / 18，47%） | **1**（v2.3.0-beta.4） | 良好偏紧·beta 回归密度高·GA 在即·XXL 审查积压 |
| **AstrBot** | 12（5 / 7，58%） | 27（14 / 13，48%） | 0 | 活跃有序·报告→修复闭环最快（同日）·核心贡献集中度高 |
| **PicoClaw** | 0 | 1（1 / 0） | 0 | 静默·平稳偏冷·唯一 PR 待响应 |
| **DeepSeek Harness** | 208 Discussions 更新（Top15 253 评论） | 无 PR 机制（Release 驱动） | 0（changelog 空） | **讨论热 / 交付冷（208 : 0）**·流程缺归并机制·风险最高 |

> \* OpenClaw 与 hermes 的 500 为数据快照的样本窗口上限，实际吞吐可能更高；比例指标仅代表样本内分布。
> 说明：DeepSeek Harness 未启用 Issues/PR，以 Discussions 承担事实上的 issue tracker 职能，故指标口径不同，不可直接横向比较。

**判读**：按"单日变更吞吐 × 关闭率"看，AstrBot（58%/48% 双高）与 Zeroclaw（75% Issue 关闭率）的**消化效率**最优；OpenClaw、hermes 属"高流入、中等消化、队列加深"型；DeepSeek Harness 则是"高讨论、零交付"的极端背离。

---

## 3. OpenClaw 在生态中的定位

**规模定位**：OpenClaw 与 hermes-agent 同处生态顶端的"超级项目"层级——两者单日 Issue/PR 吞吐均触及 500 样本上限，是 Zeroclaw/QwenPaw/AstrBot 的 10–30 倍。但 OpenClaw 是样本中**唯一同时维护"主线 stable + extended-stable 退役线"双轨**的项目（今日发 v2026.11.3 与 v2026.9.37），体现更长的版本支持承诺与更重的维护负担。

**优势**：
- **治理成熟度最高**：`clawsweeper` 自动分级（🦞 diamond lobster / 🍦 silver shellfish）、`source-repro`、`proof: sufficient` 标签体系，使问题可复现性显著优于同类；社区已形成 Bug type / Beta blocker / Summary 的标准报告模板。
- **P0/P1 闭环速度快**：#193962 创建 11-06、11-10 关闭；#194403 创建 11-07 即进入讨论。
- **架构纵深最完整**：私有子代理结果隔离、子任务交接、session transcript、MemoryPluginCapability（dreaming provider）、fallback 链与模型别名路由，覆盖了从会话到记忆到路由的全栈语义。

**技术路线差异**：OpenClaw 走"**全功能平台 + 多通道 + 子代理编排**"路线，强调会话生命周期与状态一致性，对私有任务隔离、transcript 持久化等边界语义投入较深——这既是其 P0 集中爆发在会话/Provider 层的原因，也是其架构复杂度的来源。

**核心短板**：**评审带宽已成为明确的规模化瓶颈**——346 条待合并 PR、Top 50 高评论 Issue 与 Top 30 高评论 PR 中 P0 全部为 OPEN，且多条 7 月创建的高价值 Issue 长期卡在 `needs-product-decision`。相比 AstrBot 的"同日闭环"和 Zeroclaw 的 75% 关闭率，OpenClaw 的**产品决策环节是漏斗最窄处**，而非工程能力。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **会话/消息状态一致性与可观测性** | OpenClaw、hermes、QwenPaw、AstrBot | 幽灵用户消息、双份持久化、死信不可清、多 profile 下日志静默、QQ enabled 标志静默重置——多项目共同出现"不报错但行为丢失"的静默失败 |
| **升级/发布链路可靠性** | OpenClaw、hermes、DeepSeek、QwenPaw | update 超时/#193962、退役配置键阻断准入/#193157、state.db 误判回滚/#147938、安装器 error 5/#9995、beta 打包回归——**升级测试矩阵普遍缺"从老旧版本升级"路径** |
| **跨 Provider 参数能力协商** | Zeroclaw、QwenPaw、OpenClaw | temperature 硬编码（Zeroclaw 三处同源）、`thinking_param_style` 缺失（QwenPaw #7990）、Mistral `reasoning_content` 422、xAI OAuth 头版本（OpenClaw #147728）——**"框架内部假设 vs 提供商差异"的摩擦成为高频根因** |
| **插件/扩展生态与后台执行原语** | hermes、AstrBot、QwenPaw、DeepSeek | hermes 插件目录 PR 洪峰 + `session fork/idle task` API（#146732）；AstrBot 配置分组折叠 + 插件市场；QwenPaw 技能嵌套目录重构；DeepSeek seam provider 自证表达力 |
| **Agent 写操作的安全边界** | OpenClaw、hermes、DeepSeek | 私有子代理结果隔离（已修）、智能审批驱动 PowerPoint 删未存文档（#141346）、Agent 写插件清空全部会话（#12751）——**危险操作确认与目录级回滚成为刚需** |
| **规模化性能与存储膨胀** | OpenClaw、QwenPaw、AstrBot | 3.5GB DB 启动 4–6 分钟、base64 图片占 80% 存储、`tool_describe` 620 次调用烧 18.4M tokens、aiocqhttp 分句 O(n²) |
| **跨平台（尤其 Windows）一致性** | OpenClaw、hermes、QwenPaw、DeepSeek | Windows 启动 7–9 分钟、打包版沙箱全失败（0xC0000142）、附件路径截断到盘符根、安装器无法升级——**Windows 多项目被视作"二等公民"** |
| **记忆系统的可验证晋升** | OpenClaw | 短期回忆淘汰导致 dreaming 永不晋升（#150635，27 评论居首）——"晋升承诺不可验证"是记忆系统的共性缺口 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 全栈平台：多通道 + 子代理编排 + 记忆/dreaming + 路由治理 | 重度个人用户、多 agent 部署、企业级 | 会话/transcript 语义最完整；子代理隔离；双轨版本支持 |
| **hermes-agent** | 统一网关 + Kanban 任务编排 + 插件 Hackathon | Desktop 用户、Kanban 并发任务、Cloud | **单进程统一网关**（代价是故障域耦合）；插件后台原语试验 |
| **Zeroclaw** | 通道协议多样性（XMPP/OMEMO/Git）+ 企业身份 | 基础设施偏好者、企业 IM 集成 | **Rust 实现**；OIDC/受限账户；参数协商层缺失暴露最集中 |
| **QwenPaw** | 桌面打包 + 企业 IM Channel + 本地模型托管 | 阿里生态、国内企业 IM（飞书/钉钉/QQ/企微） | 三层拆分 PR 系列推进 llama.cpp/MLX 本地引擎；Channel 为回归高发区 |
| **AstrBot** | 聊天机器人框架 + 插件市场 + WebUI | 中文社区、QQ/Telegram 机器人开发者 | 事件日志后端重构（#10077）；性能修复密集 |
| **PicoClaw** | 轻量 Web 启动器 + i18n | Sipeed 硬件生态、边缘/低资源部署 | 前端 i18next + dayjs 双轨；改动限定资源层 |
| **DeepSeek Harness** | 官方 Desktop 产品 + 插件 seam | 预发布尝鲜用户、Windows 桌面 | **无 PR/Issue，Release + Discussions 驱动**；`ctx.shell/fs` seam provider |

**结构性观察**：生态呈现"**通用平台（OpenClaw/hermes）vs 垂直专精（Zeroclaw 协议、QwenPaw 阿里 IM、AstrBot 中文机器人、PicoClaw 硬件）vs 官方产品（DeepSeek Harness）**"的三分格局。语言栈横跨 TypeScript/Rust/Python，说明底层实现尚未收敛，**接口语义（会话、插件、Provider）比语言选择更具竞争壁垒**。

---

## 6. 社区热度与成熟度

### 活跃度分层

- **T0（超级项目，500 级吞吐）**：**OpenClaw**（质量巩固期 + 评审瓶颈）、**hermes-agent**（架构跃迁后的消化期，稳定性债务最重）
- **T1（高活跃，15–50 级）**：**Zeroclaw**（v0.9.0 发布前收口）、**QwenPaw**（beta 快速迭代转 GA）、**AstrBot**（有序维护，闭环最快）
- **T2（静默/单点）**：**PicoClaw**（平稳偏冷）
- **特殊态**：**DeepSeek Harness**（讨论高度活跃、交付零输出，预发布收敛受阻）

### 成熟度阶段判定

| 阶段 | 项目 | 特征 |
|---|---|---|
| **质量巩固 / 债务消化** | OpenClaw、hermes | 架构已成型，P0 集中在会话与网关层；评审/决策带宽是主要约束 |
| **版本收敛（发布前）** | Zeroclaw、QwenPaw | Issue 关闭率高、集中清缺陷与文档债；合并漏斗偏窄，XL PR 积压 |
| **稳态维护** | AstrBot | 关闭率与合并率双高，报告→修复同日闭环；关注点转向单点依赖风险 |
| **静默/低油门** | PicoClaw | 零 Issue、零合并；健康但缺乏推力，唯一 PR 需 48h 内响应 |
| **收敛受阻 / 信任风险** | DeepSeek Harness | 208 讨论 vs 0 版本；同一 Cookie 缺陷三帖 58 评论跨 5 个 rc 版本未修 |

**成熟度判断**：若以"缺陷闭环效率"为标尺，**AstrBot 与 Zeroclaw 最健康**；若以"架构完整度与生态规模"为标尺，**OpenClaw 领先半个身位**；hermes 处于"高能力、高耦合、高债务"的张力态；DeepSeek Harness 则处于社区信任的临界点——#11942 公开质疑"产品工程能力未跟上模型能力"是品牌级警示。

---

## 7. 值得关注的趋势信号

**① 可观测性正从"加分项"变为"一等公民"。**
跨 OpenClaw（亡灵消息/双持久化/doctor 静默报清白）、hermes（多 profile 日志静默/子代理占住会话）、QwenPaw（enabled 静默重置/消息静默丢弃）三项目，**"静默失败"已取代崩溃成为最高频的信任杀手**。对开发者的启示：日志、告警、"配置 vs 实际生效"的一致性校验，其产品价值正在超过新增功能。

**② 发布工程是可量化的信任资产。**
OpenClaw 的 #193962（修复已在 beta 但"够不到"）、#193157（退役配置键阻断升级）、hermes 的 #147938（活锁误判为损坏致回滚）、DeepSeek 的 #9995（安装器无法升级）共同证明：**"修复已合并"不等于"修复已可用"**。升级路径的验证矩阵（尤其"从老旧版本升级"）应作为与功能开发同级的工程预算。

**③ 参数能力协商层将成为 Provider 接入的标准化前置。**
Zeroclaw 的 temperature 硬编码三处同源、QwenPaw 的 `thinking_param_style` 缺失、OpenClaw 的 xAI 头版本错误，指向同一抽象缺口：**框架需要"能力声明 + 协商降级"层，而非在调用点硬编码假设**。这是低成本、高杠杆的基础设施投资。

**④ 插件从"静态配置"迈向"有状态后台执行"。**
hermes 的 `session fork / idle task / review signal`（#146732）+ 目录 PR 洪峰、AstrBot 的配置分组折叠、QwenPaw 的技能嵌套重构，共同标志插件生态进入**规模化阶段**——竞争焦点将从"能否装插件"转向"插件能否拥有受控的后台生命周期与审批边界"。

**⑤ Agent 写操作的安全模型必须升级。**
hermes #141346（驱动 PowerPoint 删未存文档）与 DeepSeek #12751（写插件清空全部会话）是同一类事件的两个极端：**在无显式确认的情况下操作人类正在使用的资源**。行业需要"危险操作前置确认 + 目录级备份 + 可回滚"的标准范式，OpenClaw 的私有子代理隔离是正向样本。

**⑥ 单进程统一网关是双刃剑。**
hermes 的统一网关（#106742）提升了架构一致性，但把隔离的失败域耦合为全局故障（#143547 60 评论为全站最高）。这对追求"统一入口"的开发者是明确警示：**一致性收益必须与故障域隔离策略（熔断、降级、按 surface 隔离）同步设计**。

**⑦ 本地模型托管化与平台平等性是两个正在抬头的产品线。**
QwenPaw 的 llama.cpp/MLX 三层 PR 系列指向"本地推理引擎托管"这一版本级特性；而 Windows 在 OpenClaw/hermes/QwenPaw/DeepSeek 四项目中一致成为回归高发区，提示**跨平台验证覆盖不足是行业性工程债**。

---

**决策者摘要**：若以工程质量与交付闭环论，**AstrBot、Zeroclaw** 是执行效率标杆；若以架构完整度与生态影响力论，**OpenClaw** 是核心参照系，其"评审与产品决策带宽"瓶颈值得所有高速增长项目提前布局；**hermes-agent** 提供了"生态扩张快于稳定性收敛"的典型样本；而 **DeepSeek Harness** 的 208:0 背离则是"社区输入必须被收敛为可跟踪交付项"的反面教材。横向来看，**可观测性、发布可靠性、参数协商层、插件后台原语、Agent 写安全**是未来 1–2 个版本周期最具共识性的五项投入方向。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 · 2026-11-11

---

## 1. 今日速览

Zeroclaw 今日处于**高活跃、强收口**状态：24 小时内 Issues 更新 16 条，其中关闭 12 条（关闭率 75%），PR 更新 50 条、合并/关闭 11 条，说明维护团队正在集中清理 v0.9.0 发布前的缺陷与文档债。值得注意的是，`chore(release): bump version to v0.9.0`（#12377）已进入关闭状态，但尚未产生正式 Release，版本发布处于“已备妥、待上线”阶段。同时，一批集中在 **temperature 硬编码、zerocode 受限账户启动、TLS flush** 的 S1/S2 级缺陷被修复或关闭，健康度明显回升。长期悬置的 XL 级 PR（XMPP、SSH 传输复用等）仍在持续 rebase 更新，积压压力依然存在。

**活跃度评估：高（8.5/10）**——关闭吞吐量强，但待合并 PR 仍高达 39 条，合并漏斗偏窄。

---

## 2. 版本发布

**今日无新版本发布。** 但 v0.9.0 已进入发布准备阶段：

- **#12377 [CLOSED] `chore(release): bump version to v0.9.0`** — 将 workspace 从 0.8.7 升至 0.9.0，覆盖 `Cargo.toml`（26 个路径依赖）、`Cargo.lock`（33 个 workspace 包）。
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/12377
- 多个 labeled `release:v0.9.0` 的 Issue 已关闭（#11984、#12332、#12340 等），显示发布清单正在逐项勾销。
- **提示**：v0.9.0 属 minor 版本，涉及 dashboard 登录、gateway 交付、运行时温度处理等变更，发布公告需重点关注配置兼容性与 OIDC 行为变化。

---

## 3. 项目进展

监管合并/关闭的 PR 共 11 条，其中对项目推进最显著的是：

| PR | 内容 | 意义 |
|---|---|---|
| #12377 [CLOSED] | 版本号升至 v0.9.0 | 发布前最后一步，解锁后续发布流程 |
| #12367 [CLOSED] | 停止 heartbeat 决策轮与 model-routing 探测中的 `temperature` 硬编码 | 修复 S2，恢复对拒绝 temperature 参数的模型提供商的兼容性 |
| #12335 [OPEN] | 将配对 WebSocket 凭据从 URL 中移除 | 安全加固，待合并 |
| #12376 [OPEN] | 修复 dashboard 聊天在 socket 断开后答案丢失 | 提升 WebUI 稳定性 |

**推进幅度评估**：运行时稳定性和发布工程两条线均明显前进；但 PR 合并/关闭比仅 11/50（22%），合并吞吐仍偏低，大量 XL 级 PR 停留在 review 阶段。

---

## 4. 社区热点

- **#7432 [OPEN] [Tracker] Runtime, dashboard sign-in and gateway delivery**（评论 16 条，为今日最高讨论量）
  🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/7432
  这是 RFC #5574 的落地 tracker，承载 v0.9.0 的运行时与 gateway 路线图。温和但持续的讨论说明**社区对 dashboard 登录/交付链路的关注度最高**，也是发布阻塞点。

- **#11847 [OPEN] `feat(channels): add native Rust XMPP with optional legacy OMEMO`**（自 2026-10-19 持续更新，size:XL, risk:high）
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/11847
  社区对原生 XMPP 与 OMEMO 加密有真实需求，PR 作者 @CastelloBrancoTecnologia 持续 rebase 并修复 TLS replay cache，但长期停留在 needs-maintainer-review。

- **#12269 [OPEN] `feat(web): add paired-device voice settings and chat controls`**
  🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/12269
  浏览器听写/朗读能力，反映**多模态交互（语音）**正成为个人 AI 助手的重要诉求。

**背后诉求**：从讨论结构看，社区诉求集中在三类——① 企业级身份与访问（OIDC/dashboard 非管理员账户）；② 通道协议多样性（XMPP、Git）；③ 安全与隐私（凭据不进 URL、OMEMO）。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 状态 | 是否已有 Fix |
|---|---|---|---|
| **S1 workflow blocked** | #12354 zerorelay 未 flush TLS 写入，dashboard 资源挂起至 300s idle 超时 | CLOSED | 已关闭，建议核对 release 摘要中的修复 PR |
| **S2 degraded** | #12366 heartbeat phase 1 与 model-routing 探测硬编码 `temperature=0.0`，拒绝该参数的模型直接失败 | CLOSED | ✅ PR #12367 |
| **S2 degraded** | #12362 Skill review fork 硬编码 `temperature=0.3`，Ant… 等模型返回 HTTP 400 | CLOSED | ✅ 已关闭修复 |
| **S2 degraded** | #12357 zerocode 对受限非管理员账户启动即退出 1（config/logs 面板把拒绝当致命错误） | CLOSED | ✅ 已关闭修复 |
| **S2 degraded** | #12325 docs canonical URL 绑定 release 目录，每次稳定版发布全部 URL 位移 | CLOSED | ✅ 已关闭修复 |
| **S3 minor** | #12153 `install.sh` 在装有 musl 包的 glibc 主机上误装 musl 构建 | CLOSED | ✅ 已关闭修复 |
| **S3 minor** | #12347 zerocode 配置写入存在并发丢失（读-改-写整文件、无锁） | CLOSED | ✅ 已关闭修复 |
| **S3 minor** | #12326/#12324 文档 404 与 rustdoc 索引可被搜索引擎抓取 | CLOSED | ✅ 已关闭修复 |
| **OPEN** | #12361 多轮对话对要求 `reasoning_content` 的提供商（Reflection AI / Beam）失败 | OPEN | ❌ 暂无 Fix PR |

**总体判断**：今日关闭的 Bug 以 S2/S3 为主，S1 已收口；但 **#12361 是潜在 S2 兼容性缺口**，涉及 `ChatMessage` 结构缺字段，修复面较深，建议优先排期。temperature 硬编码问题呈现出“同一根因、多处散落”的特征（heartbeat、model-routing、skill review 三处），维护者可考虑抽象统一的参数协商层。

---

## 6. 功能请求与路线图信号

| Issue | 诉求 | 纳入下一版本可能性 |
|---|---|---|
| #12373 [OPEN] Write-only WebUI 凭据管理与作用域 secret 引用 | Storage → Secrets 操作员级凭据目录，只写不读、可禁用/删除 | **中高**——与 #12269、#12335 同属 Web 安全路线，作者主动征求 scope |
| #12372 [OPEN] Git channel 支持 `draft_mode`（progress/placeholder/off） | 避免向 PR 评论流式灌进度 | **中**——改动局部，需求明确（#11874 已提供进度上报基础） |
| #11984 [CLOSED] 非管理员 OIDC 账户使用 Dashboard Chat | 已随 v0.9.0 关闭 | **✅ 已纳入 v0.9.0** |
| #12361 [OPEN] 多轮对话保留 `reasoning_content` | 适配 Reflection AI/Beam 等推理模型 | **中**——属兼容性缺口，可能以 bug 形式进入补丁版本 |

**路线图信号**：v0.9.x 的主线仍是 **“身份与交付”**（#7432 tracker），而 Web 端**凭据安全**与**语音交互**正在成为 v0.9.x 之后的次主线。建议维护者在 tracker 中明确 #12373 的归属，避免与现有 `security:secrets` 工作重复。

---

## 7. 用户反馈摘要

从今日 Issue 摘要中提炼的真实痛点：

- **“配置探测不可靠”**（#12153）：`install.sh` 仅凭是否安装 musl 包判断 libc 类型，导致 Ubuntu 24.04 + glibc 2.39 被误判。用户期望**基于实际链接器/ABI 的探测**。
- **“部分模型直接 400”**（#12362、#12366）：用户使用拒绝 `temperature` 参数的提供商时，内部调用（heartbeat、skill review、routing probe）被硬编码拖垮，暴露**参数能力协商缺失**。这是最典型的“框架内部假设 vs 提供商差异”摩擦。
- **“受限账户体验断裂”**（#12357）：非管理员账户能连上但 `zerocode` 立刻退出，用户期望**降级运行而非致命失败**。
- **“并发更新静默丢失”**（#12347）：zerocode 配置写入无锁，用户真实遭遇配置被覆盖。
- **“推理模型多轮失忆”**（#12361）：Beam/Reflection AI 用户反馈助手历史消息缺少 `reasoning_content`，多轮对话上下文不完整。
- **正面信号**：多条文档类 Issue（#12332、#12340）由贡献者主动提出并当日关闭，说明**文档质量治理正在形成正向循环**。

**满意度判断**：对维护响应速度（当日关闭 12 条 Issue）整体正面；对**跨提供商兼容性**与**受限账户可用性**仍有明显不满。

---

## 8. 待处理积压

| 项目 | 已开启天数 | 风险提示 |
|---|---|---|
| #11847 XMPP + OMEMO（size:XL, risk:high, needs-maintainer-review） | 23 天 | 安全敏感 + 大改动，长期无 maintainer 结论，作者持续 rebase 成本高，建议给出明确接受/拆分决定 |
| #11869 opt-in task-owned SSH transport reuse（size:XL） | 23 天 | 已有 #12266 记录 Core Team 例外批准，但主 PR 仍 OPEN，建议推进合并 |
| #11868 阻止重复工具调用并保留 closeout（risk:high） | 23 天 | 已有 #12265 记录例外批准，同样卡在合并队列 |
| #11846 / #11845 OpenRouter 余额展示与开关 | 24 天 | 两个 PR 成对出现（配置 + UI），建议绑定评审 |
| #11911 保留已完成工具结果 + 有界恢复（size:XL） | 22 天 | 与 #11868 同域，建议合并评审批次 |
| #12215 Dependabot rust-all（36 项更新） | 8 天 | 正在 rebase，长期挂起会积累安全债，建议排期 |
| #7432 v0.9.0 运行时/gateway tracker | 155 天 | 发布阻塞源，建议在 v0.9.0 发布后关闭或拆分子 tracker |

**维护者提示**：今日 39 条待合并 PR 中有 6 条以上属于同一作者（@CastelloBrancoTecnologia）的 XL 级系列，且多条已获 Core Team 例外批准文档（#12265/#12266/#12267）。**建议按“批准即合并”原则集中清理一批**，否则例外批准文档会与代码状态脱节，形成治理债。

---

*数据来源：Zeroclaw GitHub 仓库，统计窗口 2026-11-10 → 2026-11-11。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-11-11** ｜ 数据窗口：过去 24 小时 ｜ 仓库：[sipeed/picoclaw](https://github.com/sipeed/picoclaw)

> **数据统计说明**：本报告仅基于给定的 GitHub 数据快照生成。PR #3467 的评论数字段返回 `undefined`，因此无法据此判断该 PR 的讨论热度；本文不做推测性补全。

---

## 1. 今日速览

今日 PicoClaw 处于**低活跃度、低风险**的静默运行状态：过去 24 小时 Issues 更新量为 0，PR 更新仅 1 条且为待合并状态，新版本发布为 0。代码库净增量方面，今日无任何 PR 被合并或关闭，主线演进实际推进为 0。社区注意力高度集中于唯一一条新增 PR——[#3467 法语 UI 本地化](https://github.com/sipeed/picoclaw/pull/3467)，属于典型的功能增强类提交，而非缺陷修复。整体看，项目今日**无稳定性告警、无回归风险信号，但也缺乏合并动作带来的正向推力**；健康度可评为“平稳但偏冷”，关键瓶颈在于 PR 评审环节的响应速度。

| 指标 | 数值 | 环比状态 |
|---|---|---|
| Issues 新开/活跃 | 0 | 无波动 |
| Issues 关闭 | 0 | 无波动 |
| PR 待合并 | 1 | +1 |
| PR 已合并/关闭 | 0 | 无推进 |
| 新版本发布 | 0 | 无 |

---

## 2. 版本发布

今日无新版本发布，无破坏性变更与迁移注意事项。

---

## 3. 项目进展

**今日合并/关闭的重要 PR：无。**

- 合并数为 0，意味着今日没有代码进入主干，未修复缺陷、未交付新能力。
- 唯一在途 PR [#3467](https://github.com/sipeed/picoclaw/pull/3467)（`feat(web): add French UI locale`）创建于 2026-11-10，目前仍为 OPEN，**在合并前不计入项目进展**。

**推进度评估**：约 **0%**（以“已合并变更”为衡量标准）。若 #3467 通过评审，将一次性补齐 Web 启动器的法语翻译集，属于“广度型”交付（覆盖面扩大），而非“深度型”能力演进。建议维护者优先将其纳入评审队列，避免其长期停留在 OPEN 状态。

---

## 4. 社区热点

今日唯一热点为 PR [#3467](https://github.com/sipeed/picoclaw/pull/3467)：

- 作者：@slashr512 ｜ 创建/更新：2026-11-10 ｜ 👍：0 ｜ 评论：数据缺失（`undefined`）
- 内容：新增 `web/frontend/src/i18n/locales/fr.json` 完整翻译集；在 i18next resources 与 dayjs locale 处理中注册法语；在登录、初始化（setup）与仪表盘（dashboard）界面的语言菜单中加入 **Français**。

**诉求分析**：该 PR 从技术上印证了两件事——其一，PicoClaw 的前端已具备成熟的 i18n 架构（i18next + dayjs locale 双轨），新增语言属于**低风险、可复制的增量工作**；其二，社区中已有法语用户或法语区部署者，希望降低本地化使用门槛。由于点赞与评论数据均为 0 或缺省，目前**尚无证据显示该 PR 引发广泛讨论**，热度属“单点提交”级别，而非社区共识性热点。

---

## 5. Bug 与稳定性

今日报告的 Bug、崩溃、回归问题：**0 条**。

| 严重程度 | 数量 | 是否已有 fix PR |
|---|---|---|
| 严重（崩溃/数据丢失） | 0 | — |
| 中等（功能异常） | 0 | — |
| 轻微（体验/显示） | 0 | — |

需客观说明：**“零 Bug 报告”不等于“零缺陷”**，仅表示过去 24 小时无用户提交相关 Issue。稳定性面无新增风险，但也缺少验证信号。今日无任何 fix 类 PR，说明不存在正在处理的线上问题。

---

## 6. 功能请求与路线图信号

今日无新开 Issue，因此**无来自用户侧的功能请求**。可识别的路线图信号仅来自 PR #3467：

- **国际化（i18n）扩展是当前唯一可见的演进方向**。该 PR 采用“新增 locale 文件 + 注册资源 + 语言菜单登记”的标准三步模式，若被合并，将成为后续语言的模板。
- **纳入下一版本的可能性：较高**。理由：改动范围限定在前端 i18n 资源层、不触碰核心逻辑、无破坏性风险，且符合 Web 启动器面向多语种用户的既有设计。
- **建议**：维护者可在评审中确认翻译完整性、键名与英文基准文件的一致性，以及 dayjs locale 的加载时机（避免打包体积膨胀），通过后即可作为“多语言支持”能力对外宣传。

---

## 7. 用户反馈摘要

今日 Issues 评论量为 0，**无可提炼的真实用户痛点、使用场景或满意/不满意表述**。

可间接观察到的信息来自 PR #3467 的描述文本：

- **使用场景**：通过 Web 启动器完成登录、初始化配置、进入仪表盘——说明 PicoClaw 的主要交互入口之一是浏览器端，存在非英语母语用户部署需求。
- **隐性痛点**：法语用户当前需在英文界面下完成初始化配置，存在理解成本；该 PR 正是对此的响应。
- **满意度信号**：贡献者愿意投入完整翻译集而非零散修补，侧面反映其对项目的认可度较高。

---

## 8. 待处理积压

- **今日无长期未响应的 Issue**（Issues 更新为 0，且本数据快照不含历史积压清单，无法评估存量 Issue 的老化程度）。
- **[#3467](https://github.com/sipeed/picoclaw/pull/3467) 需重点关注**：创建至今约 1 天，尚未进入合并流程。严格意义上它还不是“积压”，但作为今日唯一待评审项，**若 48 小时内无维护者回应，将转为评审延迟项**，对新贡献者的留存意愿有负面影响。
- **建议维护者动作**：① 指定评审人对 #3467 做一次性完整 review（含翻译质量与 i18n 键一致性）；② 若项目已有语言清单文档，同步登记“法语-待合并”状态，避免其他贡献者重复提交；③ 排查是否有更早期未响应的 PR 滞留（本数据未覆盖，需人工核对 PR 列表）。

---

**健康度小结**：稳定性 ✅（零缺陷报告）｜活跃度 ⚠️（24 小时仅 1 条新增 PR、0 合并）｜贡献者生态 ⚠️（单一新贡献者 PR 待响应）。今日项目“无病但偏静”，最有价值的动作是把 #3467 快速推进到合并。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报

**日期**：2026-11-11　|　**仓库**：github.com/agentscope-ai/QwenPaw
**数据窗口**：2026-11-10 → 2026-11-11（过去 24 小时）

---

## 1. 今日速览

- **发布节奏维持高位**：v2.3.0-beta.4 于昨日发布，距 beta.3 不足 24 小时，两条修复均直指插件/Channel 运行时，属"边发版边打补丁"的快速迭代状态。
- **协作活跃度处于高位**：Issues 更新 14 条（新开/活跃 9、关闭 5），PR 更新 38 条（待合并 20、已合并/关闭 18），PR 侧关闭率 47%、Issue 侧关闭率 36%，闭环效率良好。
- **稳定性风险集中在 2.3.0 桌面打包构建**：Channel 插件无法激活、feishu 启动竞态、附件路径被截断等回归全部由 beta 系列引入，是本迭代周期最主要的健康度隐患。
- **审查带宽是当前瓶颈**：20 条待合并 PR 中至少 6 条为 `size/XXL`～`size/XXXL` 量级、存在 12～31 天，长尾积压开始显现。
- **正式版在即**：出现 `chore: bump the version to 2.3.0`（#8666），信号明确，但 beta.4 的 Release Duty 验收单（#8667）已过截止时间仍未关闭，需关注。

> **综合健康度评级：良好偏紧。** 交付速度快、社区参与度高，但"打包/插件子系统"的回归密度和超大型 PR 的审查积压，是当前两项主要扣分项。

---

## 2. 版本发布

### v2.3.0-beta.4（Beta）

- 发布页：https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.0-beta.4
- 本版仅含 2 项修复，均为**插件/Channel 运行时可靠性**问题：

| 变更 | PR | 解决的问题 |
|---|---|---|
| `fix(channels)` 跨更新保留插件依赖、修复 Channel 启动 | [#8653](https://github.com/agentscope-ai/QwenPaw/pull/8653) | 桌面版 Channel worker 因依赖证据缺失 supported wheel tags 而报 `WORKER_START_FAILED`，导致 channel 无法激活（对应 Issue [#8644](https://github.com/agentscope-ai/QwenPaw/issues/8644)） |
| `fix(plugins)` 恢复被中断的增量依赖安装 | [#8659](https://github.com/agentscope-ai/QwenPaw/pull/8659) | 安装写入成功但校验失败时残留修复标记，阻塞后续插件安装、甚至阻止 QwenPaw 启动 |

**破坏性变更**：无显式声明，属 patch 级 beta。

**迁移注意事项（建议）**：由于插件依赖校验与恢复逻辑发生变更，桌面版用户升级后首次启动会重新走一遍依赖证据校验，建议留意 Channel 启动日志；若此前存在被中断的插件安装，本次升级应可自愈，无需手动清缓存。

**遗留问题**：本版**未包含** #8669（feishu Channel 启动竞态，`_wait_connected` 将初始 `disconnected` 判定为致命）的修复，该问题在 2.3.0b4 的 Windows 打包版上仍可稳定复现。

---

## 3. 项目进展

过去 24 小时共 18 条 PR 合并/关闭，其中对项目推进有实质意义的有：

- **[#8653](https://github.com/agentscope-ai/QwenPaw/pull/8653) + [#8659](https://github.com/agentscope-ai/QwenPaw/pull/8659)**（已随 beta.4 发布）— 修复了 2.3.0 beta 系列中"打包桌面版所有 Channel 插件无法激活"这一阻断级问题，同时消除了插件安装失败后残留标记导致应用无法启动的隐患。**这是今日权重最高的一次推进**，直接解除了桌面版的主要可用性障碍。
- **[#8319](https://github.com/agentscope-ai/QwenPaw/pull/8319)**（CLOSED，10-19 提出）— QQ 原生插件补上 `GROUP_MESSAGE_CREATE` 事件分发，修复普通（非 @）群消息被丢弃的问题（Fixes #8313）。与 #8651、#8406 一并构成今日 QQ Channel 的一组收敛。
- **[#8664](https://github.com/agentscope-ai/QwenPaw/pull/8664)**（CLOSED）— Community 支持"账号密码 + 保存凭据"的远程登录，解决远程 Docker 部署下无法走本地回调浏览器授权的问题，扩展了部署形态。
- **[#8665](https://github.com/agentscope-ai/QwenPaw/pull/8665)**（CLOSED）— 版本号 bump 至 2.3.0b4，支撑本次发布。

**推进幅度评估**：本轮进展呈"**收敛而非扩张**"形态——几乎没有新功能合入，18 条关闭中大部分是版本管理（bump）、依赖修复与历史 Issue 收尾。这对即将转正的 2.3.0 是正确策略，但意味着功能侧本周期无增量。

---

## 4. 社区热点

按评论数与讨论密度排序：

| 排名 | 条目 | 评论 | 状态 | 核心诉求 |
|---|---|---|---|---|
| 1 | [#8651](https://github.com/agentscope-ai/QwenPaw/issues/8651) QQ Channel 静默丢弃纯图片 C2C 消息 | 4 | CLOSED | 消息无声丢失，用户侧完全无感知，排查成本极高 |
| 2 | [#7990](https://github.com/agentscope-ai/QwenPaw/issues/7990) Aliyun Token Plan 模型缺 `thinking_param_style` 声明 | 4 | OPEN | 上游实际支持 `reasoning_effort`/`thinking_budget`，但 `model_catalog.json` 未声明，导致 Console 思考控件被隐藏 |
| 3 | [#8406](https://github.com/agentscope-ai/QwenPaw/issues/8406) QQ Channel enabled 标志静默重置为 false | 3 | CLOSED | 配置被无告警地改写，缺乏可观测性 |
| 4 | [#8669](https://github.com/agentscope-ai/QwenPaw/issues/8669) Channel 插件启动竞态（feishu 必现） | 2 | OPEN | 打包桌面版每次启动均 `CHANNEL_NOT_CONNECTED` |
| 5 | [#8644](https://github.com/agentscope-ai/QwenPaw/issues/8644) 打包桌面版 Channel 插件无法激活 | 2 | CLOSED | 已由 #8653 修复 |
| 6 | [#8534](https://github.com/agentscope-ai/QwenPaw/issues/8534) Creator TTS 无法使用 Token Plan key | 2 | CLOSED | `qwen-audio-tts` 属不同 DashScope 服务，模型配置 UI 缺协议选项 |

**诉求分析**：

1. **"静默失败"是今日最高频的关键词**（#8651、#8406、#8669 三条独立问题）。三个不同子系统的共同症状是"不报错、不告警、行为直接丢失或回退"，说明项目在**关键路径的可观测性设计**上存在系统性缺口，而非孤立 Bug。
2. **商业模型支持存在目录滞后**：#7990 与 #8534 同时指向 Aliyun Token Plan 模型族——上游能力已具备，但本地模型目录/配置 UI 未跟上，形成了"能力可用但用户点不到"的体验断层。这类问题对商用/团队版用户影响面大。
3. **Windows 打包版是问题密度最高的平台**：#8669、#8655、#8663 均涉及桌面或特定平台差异，提示 beta 阶段的跨平台验证覆盖不足。

> 注：PR 侧评论数据本次未提供（均为 `undefined`），热度按更新活跃度判断，#8512、#8178、#8234、#8236 等长期开放的 XXL 级 PR 持续有更新。

---

## 5. Bug 与稳定性

按严重程度排序（P0 = 阻断主功能；P1 = 功能受损但有绕行；P2 = 体验问题）：

### P0 — 阻断级

**① [#8669](https://github.com/agentscope-ai/QwenPaw/issues/8669) Channel 插件启动竞态：`_wait_connected` 把初始 `disconnected` 判为致命**
- 影响：打包桌面版（2.3.0b4 / Windows）feishu 插件**每次启动必失败**，报 `CHANNEL_NOT_CONNECTED`；`wechat`、`yuanbao` 存在同类风险。
- 状态：**OPEN，无 fix PR**（beta.4 的 #8653 修的是依赖证据，未覆盖此竞态）。
- 建议：需区分"初始未连接"与"连接失败"的判定语义，属逻辑缺陷，优先级应高于其他排队项。

### P1 — 功能受损

**② [#8655](https://github.com/agentscope-ai/QwenPaw/issues/8655) 附件路径被截断到盘符根目录（"C:\"）**
- 影响：2.3.0-beta.1 引入的**回归**，beta.2/beta.3 均复现（11-10 实测 beta.3）。文件已正确落盘，但传给模型的是盘符根路径，导致图片无法加载。
- 状态：**OPEN，无 fix PR**。属于典型"新功能引入的路径处理回归"，建议补回归测试。

**③ [#8652](https://github.com/agentscope-ai/QwenPaw/issues/8652) mission 任务切换模型后，派发脚本仍使用原模型**
- 影响：任务直接失败，模型切换配置未传递到执行层。
- 状态：**OPEN，无 fix PR**。问题描述较简，缺少复现细节，建议维护者主动索要版本与日志。

**④ [#8661](https://github.com/agentscope-ai/QwenPaw/issues/8661) 聊天正文 `/workspace/` 绝对路径链接打开 SPA HTML**
- 影响：Agent 产出的文件无法通过链接下载（Hub 2.2.2）。
- 状态：**已有 fix PR [#8662](https://github.com/agentscope-ai/QwenPaw/pull/8662)**（OPEN，含路径边界与点击回归测试，复用现有鉴权下载流程）。

### P2 — 体验问题

**⑤ [#8663](https://github.com/agentscope-ai/QwenPaw/issues/8663) Safari 下消息队列操作按钮（编辑/中断发送/删除）不渲染**
- Chrome 正常、Safari 异常，属浏览器兼容性缺陷。**OPEN，无 fix PR**。

**⑥ [#8650](https://github.com/agentscope-ai/QwenPaw/issues/8650) 思考块与工具卡片视觉不一致，步骤列表左边缘持续跳动**
- 长任务中"思考"（灰底圆角卡片 + 12px 内边距）与"工具调用"（贴左、无背景、单行）风格割裂，图标错位 12px。**OPEN，无 fix PR**。

### 今日已闭环的 Bug

- [#8651](https://github.com/agentscope-ai/QwenPaw/issues/8651) QQ 纯图片 C2C 消息被丢弃 — CLOSED
- [#8406](https://github.com/agentscope-ai/QwenPaw/issues/8406) QQ enabled 标志静默重置 — CLOSED
- [#8644](https://github.com/agentscope-ai/QwenPaw/issues/8644) 打包桌面版 Channel 无法激活 — CLOSED（#8653 修复）
- [#8534](https://github.com/agentscope-ai/QwenPaw/issues/8534) Creator TTS Token Plan key 不可用 — CLOSED

> **附注（流程质量）**：[#8406](https://github.com/agentscope-ai/QwenPaw/issues/8406) 的正文呈现为未展开的 `$(cat /tmp/issue_body.md)`，说明 Issue 提交流程（CLI/模板）存在变量未渲染的缺陷，建议一并排查，否则会影响后续问题单的质量。

---

## 6. 功能请求与路线图信号

### 高概率进入近期版本

| 请求 | 依据 | 判断 |
|---|---|---|
| 远程部署免回调登录 | [#8664](https://github.com/agentscope-ai/QwenPaw/pull/8664) 已 CLOSED | 已落地，将成为远程 Docker 场景的标准路径 |
| 聊天内 `/workspace/` 文件下载 | [#8662](https://github.com/agentscope-ai/QwenPaw/pull/8662) 已就绪并带测试 | 修复型，随 2.3.x 补丁进 |
| Shell 命令卡片显示"意图标题" | [#8638](https://github.com/agentscope-ai/QwenPaw/pull/8638) | 纯展示层、向后兼容（`title` 可选），合入门槛低 |

### 中期路线图信号

- **本地模型托管化是当前最大的一条产品线**：[@LXD-8](https://github.com/agentscope-ai/QwenPaw/pull/8648) 提交了一个**三层拆分、按序合并**的 PR 系列——[#8649](https://github.com/agentscope-ai/QwenPaw/pull/8649)（llama.cpp GPU + 自动更新）→ [#8647](https://github.com/agentscope-ai/QwenPaw/pull/8647)（托管 MLX 引擎 + 运行时自动更新）→ [#8648](https://github.com/agentscope-ai/QwenPaw/pull/8648)（Console 本地引擎/GPU/自动更新控件）。这是明显的版本级特性，**预计最早落在 2.3 之后的 minor 版本**，且需要串行审查。
- **技能（Skills）子系统重构**：[#8178](https://github.com/agentscope-ai/QwenPaw/pull/8178) 支持嵌套分类目录（`<root>/<category>/<skill>/SKILL.md`，并保持扁平布局兼容）、[#8477](https://github.com/agentscope-ai/QwenPaw/pull/8477) 将安装的第二次全树拷贝改为原地 rename、[#8479](https://github.com/agentscope-ai/QwenPaw/pull/8479) 同步 Anthropic 2026-07 版 Office 技能。三条同向，指向技能生态的规模化。
- **Provider 兼容层持续扩张**：[#8656](https://github.com/agentscope-ai/QwenPaw/issues/8656) 请求收录 Mistral provider 插件（解决 `reasoning_content` 422、chunk 列表 content 被 SDK 拒绝、`prompt_cache_key` 被 `cache_modes` 空集合拦截三处硬缺口）；[#8512](https://github.com/agentscope-ai/QwenPaw/pull/8512) 扩展 `extract_status_code()` 从错误文本解析网关状态码。**"官方 provider 目录是否接纳社区插件"正在成为一个需要明确策略的问题**。
- **模型目录补齐思考参数**：[#7990](https://github.com/agentscope-ai/QwenPaw/issues/7990) 要求为 Aliyun Token Plan 模型声明 `thinking_param_style`——这是纯配置补齐，成本低、收益直接，**应优先于任何新特性排期**。

---

## 7. 用户反馈摘要

**真实痛点**

1. **"静默"比"报错"更致命**。用户对 #8406（enabled 被重置）、#8651（图片被丢弃）、#8669（启动失败但信息不明确）的共同反馈是：系统没有给出任何信号。多位用户在 Issue 中粘贴了完整的版本号、OS、部署方式与复现时间戳，说明他们已经做了大量自助排查——这部分成本本应由日志与告警吸收。
2. **配置与运行时的一致性断层**。#8652（切模型后仍用旧模型）与 #7990（目录未声明导致 UI 控件消失）本质上是"用户看到的配置"与"实际生效的配置"不一致，这类问题会直接摧毁用户对配置系统的信任。
3. **平台差异造成的隐性不可用**。Safari 用户（#8663）与 Windows 打包用户（#8655、#8669）遭遇的问题是"同一版本、不同平台、行为完全不同"，且均无任何提示。

**典型使用场景（从 Issue 反推）**

- **企业/团队即时通讯集成**：QQ 官方 Bot 网关 C2C 与群聊、飞书多租户、钉钉 AI 卡片、企业微信、元宝——Channel 是当前最密集的使用场景，也是回归最集中的区域。
- **远程/容器化部署**：Docker 远程实例（#8664 的直接动因）、Windows Server 2022 生产环境（#8534）——用户已把 QwenPaw 用于非本地桌面的真实生产场景。
- **长任务与多步 Agent 执行**：#8650 描述"十几步下来左边缘一直在跳"，说明有用户在进行长链路、多工具的复杂任务，对过程可读性有明确要求。
- **中文环境的本地文件处理**：PR [#8234](https://github.com/agentscope-ai/QwenPaw/pull/8234) 指出中文 Windows 下 GBK/CP936 编码的 `.txt`/`.csv`/`.md` 被 `errors="ignore"` 静默丢字节——这是一个长期潜伏、影响面广的本地化问题。

**满意信号**：beta 期间用户仍持续提交带完整环境信息的高质量报告，且多条 Issue 在 24 小时内即被关闭，反馈"得到响应"的体验良好。

**不满意信号**：集中在**可观测性**与**跨平台验证**两点，均非单点 Bug，而是流程性问题。

---

## 8. 待处理积压

### 长期未响应的 Issue

| Issue | 创建 | 已挂起 | 评论 | 备注 |
|---|---|---|---|---|
| [#7990](https://github.com/agentscope-ai/QwenPaw/issues/7990) Aliyun Token Plan 缺 `thinking_param_style` | 2026-09-25 | **47 天** | 4 | 修复成本极低（改 `model_catalog.json`），拖 47 天不合理，**建议本周内处理** |
| [#8669](https://github.com/agentscope-ai/QwenPaw/issues/8669) feishu 启动竞态 | 2026-11-10 | 1 天 | 2 | 虽新，但属 P0 且已有明确根因，需尽快认领 |

### 长期开放的大型 PR（审查带宽预警）

| PR | 提交 | 已挂起 | 规模 | 状态 |
|---|---|---|---|---|
| [#8178](https://github.com/agentscope-ai/QwenPaw/pull/8178) 嵌套技能目录 | 2026-10-11 | **31 天** | XXL | Under Review |
| [#8234](https://github.com/agentscope-ai/QwenPaw/pull/8234) GBK/CP936 解码 | 2026-10-14 | **28 天** | XXL | Under Review |
| [#8236](https://github.com/agentscope-ai/QwenPaw/pull/8236) Ollama 按 `num_ctx` 定上下文 | 2026-10-14 | **28 天** | XXL | Under Review |
| [#8426](https://github.com/agentscope-ai/QwenPaw/pull/8426) 第三方 Agent 插件化 | 2026-10-26 | 16 天 | XXXL | OPEN |
| [#8477](https://github.com/agentscope-ai/QwenPaw/pull/8477) 技能安装原地 rename | 2026-10-28 | 14 天 | M | OPEN |
| [#8479](https://github.com/agentscope-ai/QwenPaw/pull/8479) 同步 Anthropic Office 技能 | 2026-10-28 | 14 天 | XXXL | 首次贡献者 |
| [#8512](https://github.com/agentscope-ai/QwenPaw/pull/8512) 网关状态码解析 | 2026-10-30 | 12 天 | S | OPEN |

**维护者关注建议**：

1. **#8234 与 #8236 是两条独立的、影响面明确的正确性修复，却同为 XXL 且挂了 28 天**。这类"小改动、大 PR 体积"的提交建议引导作者拆分，避免被体积卡死。
2. **首次贡献者的 PR 需要额外关注**：#8178、#8479、#8601 均带 `first-time-contributor` 标签且停留 ≥14 天，首次体验直接影响后续贡献意愿。
3. **#8666（bump 至 2.3.0）已出现，正式版发布在即**，建议在冻结前明确哪些 PR 进入 2.3.0、哪些顺延至 2.4，并对外公示，减少贡献者的等待不确定性。
4. **流程风险**：beta.4 的 Release Duty 验收单 [#8667](https://github.com/agentscope-ai/QwenPaw/issues/8667) 截止时间为 2026-11-10 18:47 UTC，截至本数据快照仍为 OPEN 且零评论——**验收闭环未完成，建议核实各平台检查点状态后再推进正式版**。

---

*本报告基于 2026-11-11 可见的 GitHub 公开数据生成，PR 评论数指标本次缺失，相关排序依据更新活跃度与变更规模推定。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目日报 · 2026-11-11

---

## 1. 今日速览

过去 24 小时项目维持高位运转：**500 条 Issue 更新（415 新开/活跃、85 关闭）与 500 条 PR 更新（355 待合并、145 已合并/关闭）**，并在 11 月 9 日沉淀出补丁版本 **v0.23.1**。今日最显著的结构性信号有三：**统一网关（#106742）合并后的余波仍在持续发酵**，围绕会话路由、日志与 worker 稳定性的 P0/P1 问题密集出现；**Kanban worker 相关的崩溃已形成一个小型故障簇**（#145022 / #148958 / #139029）；同时**插件目录 PR 呈井喷式增长**（大量 "plugin-catalog: add …" 提交），显示社区插件生态正处在 Hackathon 驱动的扩张期。整体健康度：**热度极高，但核心网关与 Kanban 子系统的稳定性债务是当前主要风险点**。

---

## 2. 版本发布

### v0.23.1（2026-11-09）
- **性质**：补丁版本（Patch release）。
- **内容**：将 v0.23.0 以来约 **618 个已合并 PR** 汇总为稳定释放版，覆盖 GitHub Release（CLI 与安装器）、Microsoft Store 应用、Docker 镜像与 Hermes Cloud。
- **说明**：本窗口的**逐条精选发布说明将随 v0.24.0 一同发布**，v0.23.1 本身不含独立的变更清单。
- **破坏性变更 / 迁移注意事项**：官方说明中**未标注破坏性变更**；但由于该版本聚合了 618 个 PR，且 v0.23.0 之后的核心变更是统一网关（#106742）架构迁移，实践中仍需留意：
  - 统一网关下所有本地会话（CLI、TUI、Desktop、API server、编辑器、消息机器人、cron、Kanban、群聊）共享同一 gateway 进程，**多 profile 复用 gateway 的部署需要重点回归**（对照 #141958 的日志中断问题）；
  - Windows 用户的 `state.db` 更新校验路径存在已知严重缺陷（#147938），**建议暂缓在关键环境自动升级**，详见第 5 节。

---

## 3. 项目进展

今日已合并/关闭的 PR 以**插件目录扩充**和**UI 性能微优化**为主，未见大规模核心架构合并：

**已合并/关闭（推进功能与生态）**
- [#152756](https://github.com/NousResearch/hermes-agent/pull/152756) — 插件目录新增 **Spacewise**（磁盘空间清理，v0.1.1），Hackathon 参赛条目。
- [#152755](https://github.com/NousResearch/hermes-agent/pull/152755) — 插件目录新增 **Hermes Drawbridge**（让聊天只读/受控读写本地文件夹，带审批卡）。
- [#152752](https://github.com/NousResearch/hermes-agent/pull/152752) — **tablekeeper** 目录条目从 0.2.0 升至 0.3.0（Hackathon 条目更新）。
- [#152750](https://github.com/NousResearch/hermes-agent/pull/152750) — 插件目录新增 **aftercare**（事后自检型验证插件）。
- [#152749](https://github.com/NousResearch/hermes-agent/pull/152749) — 插件目录新增 **teach-back**（确保用户理解 agent 生成的代码）。
- [#129918](https://github.com/NousResearch/hermes-agent/pull/129918) — `ui-tui`：长耗时工具提示（charms）的轮询由固定 1s interval 改为按最早可发布时机延迟。
- [#129928](https://github.com/NousResearch/hermes-agent/pull/129928) — `ui-tui`：折叠状态下暂停 dock 时钟，减少无谓定时器。

**待合并的重要 PR（若合并将显著推进核心能力）**
- [#148266](https://github.com/NousResearch/hermes-agent/pull/148266) — `fix(gateway)`：插件注入的轮次（`ctx.inject_message`）获得干净上下文、允许后台工作完成、并向真人让位；**直接呼应统一网关后的会话语义问题**（依赖 #146732）。
- [#146732](https://github.com/NousResearch/hermes-agent/pull/146732) — `feat(plugins)`：为插件开放 **session fork / review signal / idle task** 三类后台模式 API（标记为实验性）。
- [#146472](https://github.com/NousResearch/hermes-agent/pull/146472) — `fix(tools)`：并行工具 worker 继承线程的**工具白名单**，修复后台自改进 review 的权限逃逸风险。
- [#149053](https://github.com/NousResearch/hermes-agent/pull/149053) — `fix(cron)`：profile 分发的**固定 cron 时区**在各入口一致生效。
- [#103213](https://github.com/NousResearch/hermes-agent/pull/103213) — `fix(mcp)`：消费 in-dial 重连请求，避免它拆掉自己刚建立的会话。
- [#153035](https://github.com/NousResearch/hermes-agent/pull/153035) — 安全：git submodule 内部的 filter 命令不再在 Hermes 检查仓库状态时执行（移植自 codex#60669）。

**整体判断**：本日 PR 侧的重心明显偏向**插件生态铺路**（目录条目 + 插件 SDK 后台原语），核心修复以"跟随式补丁"为主；网关与 Kanban 的 P0/P1 修复仍未落地，属"生态扩张快于稳定性收敛"的一天。

---

## 4. 社区热点

### 🔥 统一网关合并后的"长尾战场" — #143547
[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（60 评论，P2，跨 comp/gateway、cron、plugins、desktop、sessions、profiles、tui-gateway 等多组件）
自 10 月 14 日 #106742 将全部本地会话收拢进单一 gateway 进程后，CLI、TUI、Desktop、API、编辑器、消息机器人、cron、Kanban、群聊都改为向该进程提交轮次。该 issue 作为"合并后问题总账"，评论数为全站最高，说明**统一网关虽提升了架构一致性，却把原本隔离的失败域耦合到了一起**。用户诉求集中在：会话路由归属、进程内重启守卫误伤、以及多 surface 之间的状态一致性。

### ⚠️ 智能审批导致不可恢复数据丢失 — #141346
[#141346](https://github.com/NousResearch/hermes-agent/issues/141346)（39 评论，P3，但**实际后果为最高等级**：安全 + 不可恢复数据丢失）
在 macOS、`approvals.mode=smart` 默认配置下，agent 为把自建 .pptx 渲染成 PNG，因未装 LibreOffice 而通过 `osascript` 驱动用户正在运行的 PowerPoint，**关闭了用户未保存的演示文稿并删除了其导出文件**。这是全站讨论热度第二的 issue，且直接触及"智能审批的信任边界"：用户并非反对自动化，而是反对**在无显式确认的情况下操作正在被人类使用的应用实例**。

### 🧩 插件目录 PR 洪峰（Hackathon 驱动）
今日 PR 列表中过半为 `plugin-catalog: add/bump …` 条目（Spacewise、Drawbridge、why、aftercare、teach-back、GroundControl、glide、Formwork、emotion-chip、tablekeeper、hermes-business-brain）。这构成一个**生态信号**：插件 Hackathon 正在集中交付，维护者的目录审核带宽将成为短期瓶颈（大量条目在 24 小时内被关闭或开启）。

### 📈 高共鸣功能诉求
- [#20510](https://github.com/NousResearch/hermes-agent/issues/20510)（👍24）— 跨设备云同步全部 Hermes 配置。
- [#48375](https://github.com/NousResearch/hermes-agent/issues/48375)（👍13）— Desktop 输入框拼写检查。
- [#2045](https://github.com/NousResearch/hermes-agent/issues/2045)（👍5）— 懒加载技能，移除系统提示中的技能清单。
- [#5320](https://github.com/NousResearch/hermes-agent/issues/5320)（👍3）— 提高/自适应记忆字符上限并暴露用量压力。

---

## 5. Bug 与稳定性

> 说明：以下仅基于所给 500 条 Issues 中展示的 30 条样本，实际严重问题总数可能更多。

### P0 — 严重，需立即处置
- **[#147938](https://github.com/NousResearch/hermes-agent/issues/147938)**（OPEN，13 评论，Windows，area/sessions + install-update）
  `state.db` 更新后校验**把"被运行时短暂持有的活锁"误判为"文件损坏"**，进而用数月前的快照覆盖健康数据，并把成功的恢复**误报为"未完成"**。后果是**静默的数据回滚 + 错误的状态报告**双重伤害。目前**未见对应 fix PR**（需重点确认）。

### P1 — 高优先级
- **[#145022](https://github.com/NousResearch/hermes-agent/issues/145022)**（OPEN，20 评论，Kanban）— 多个 Kanban worker 并发时，gateway 在保存期卡顿导致 worker 以 `Kanban execution unknown; retained by owner` 退出 1，**进行中的工作丢失**；一次停顿可同时杀死 4 个 worker。**无 fix PR。**
- **[#148958](https://github.com/NousResearch/hermes-agent/issues/148958)**（OPEN，8 评论）— 网关 owner 停滞导致的 worker 退出被计为普通崩溃，**连续两次即封锁卡片**（`DEFAULT_FAILURE_LIMIT = 2`）。与 #145022 同源。**无 fix PR。**
- **[#139029](https://github.com/NousResearch/hermes-agent/issues/139029)**（OPEN，8 评论）— Kanban 托管 worker 死于 `WorkerPersistenceError: synchronous_rpc_on_event_loop`。构成 Kanban 故障簇的第三例。**无 fix PR。**
- **[#131578](https://github.com/NousResearch/hermes-agent/issues/131578)**（OPEN，10 评论）— 子代理的后台进程完成事件把**父会话路由重新钉到仍在运行的子代理上**，会话被占住 30 分钟且委派结果丢失。**无 fix PR**（但 #148266 的"插件注入轮次让位于后台工作"方向与之相关）。
- **[#132820](https://github.com/NousResearch/hermes-agent/issues/132820)**（OPEN，8 评论，macOS/Linux）— `matrix` extra 的原生 E2EE 构建（python-olm/libolm）会让整个 `hermes update` 中断且**无法选择性退出**；本周已收到 7 份报告。**无 fix PR。**

### P2 — 中优先级
- **[#137838](https://github.com/NousResearch/hermes-agent/issues/137838)** — macOS gateway 反复以 75 退出，根因未确认（报告者已撤回最初断言）。**无 fix PR。**
- **[#121095](https://github.com/NousResearch/hermes-agent/issues/121095)** — `browser_exec` 每次调用后遗留无超时的 `browser_harness.daemon` 常驻进程。**无 fix PR。**
- **[#141958](https://github.com/NousResearch/hermes-agent/issues/141958)** — 开启 `gateway.multiplex_profiles` 后 gateway 不再写 agent.log / gateway.log / errors.log（服务正常但**日志静默**）。**无 fix PR。**
- **[#143288](https://github.com/NousResearch/hermes-agent/issues/143288)** — 长生命周期会话把辅助 vision 路由钉死在单一 provider，`auxiliary.vision.provider/base_url` 被忽略。**无 fix PR。**
- **[#145183](https://github.com/NousResearch/hermes-agent/issues/145183)** — Linux 下 Desktop 窗口呈半透明且设置项被隐藏，用户无法关闭。**无 fix PR。**
- **[#142142](https://github.com/NousResearch/hermes-agent/issues/142142)** — Desktop 群聊缺少 Disband/Rename 入口，而后端 `groups.disband` / `groups.rename` 已存在。**无 fix PR。**
- **[#129455](https://github.com/NousResearch/hermes-agent/issues/129455)** — 默认安装下 import 期 PM 激活触发 `home_io_guard`，导致测试套件大面积失败。**无 fix PR。**

### P3 — 低优先级
- [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) — 生命周期守卫误报，阻断合法 Node.js CLI。**无 fix PR。**
- [#97065](https://github.com/NousResearch/hermes-agent/issues/97065) — Keet gateway setup `TypeError: _n() missing required argument 'config'`（0.20.6 / Windows 11）。**无 fix PR。**
- [#126362](https://github.com/NousResearch/hermes-agent/issues/126362) — `hermes update` 对 systemd drop-in 中的 `RestartPreventExitStatus=78` 误报警告。**无 fix PR。**
- [#67458](https://github.com/NousResearch/hermes-agent/issues/67458) — 一次性模式 `-z` 下 `-w/--worktree` 被静默忽略，提交落到当前分支。**无 fix PR。**
- [#102540](https://github.com/NousResearch/hermes-agent/issues/102540) — `hermes update` 耗时异常（6 分钟+）且提示信息不足。**无 fix PR。**

### 今日已关闭（稳定性相关）
- [#125695](https://github.com/NousResearch/hermes-agent/issues/125695) — 单个 `model_entitlement` 冷却会禁用 smart approvals / vision / titles 长达一年，已关闭。
- [#129426](https://github.com/NousResearch/hermes-agent/issues/129426)、[#144084](https://github.com/NousResearch/hermes-agent/issues/144084)、[#133435](https://github.com/NousResearch/hermes-agent/issues/133435) — 多条 npm audit / 锁文件漏洞报告集中关闭，安全债务有所收敛。

**小结**：今日样本中仅约 1/3 的 P0–P2 问题有明确关联 PR，**Kanban 故障簇与 Windows `state.db` 回滚是当前最值得投入的两块**。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 社区热度 | 路线图判断 |
|---|---|---|---|
| 跨设备云同步配置/记忆 | [#20510](https://github.com/NousResearch/hermes-agent/issues/20510) | 👍24，9 评论 | 与 v0.23.1 已覆盖的 **Hermes Cloud** 方向一致，但涉及 profiles/sessions/memory 的同步冲突模型，短期难落地；**更可能先出现在 v0.25+**。 |
| 懒加载技能（移除系统提示中的技能清单） | [#2045](https://github.com/NousResearch/hermes-agent/issues/2045) | 👍5，13 评论 | 87 个内置技能已占掉显著 prompt 预算，**token 成本动机强**；但需新增按需检索工具，属结构性改动，需 maintainer 决策（`needs-decision`）。 |
| 提高/自适应记忆字符上限 | [#5320](https://github.com/NousResearch/hermes-agent/issues/5320) | 👍3，14 评论 | 实现成本低、收益直接，**具备进入近期的条件**；且与 [#35121](https://github.com/NousResearch/hermes-agent/issues/35121)（把配额超限视为不可重试失败）互补。 |
| Desktop 输入框拼写检查 | [#48375](https://github.com/NousResearch/hermes-agent/issues/48375) | 👍13，11 评论 | 纯前端小改动，**是较可能的"顺手合并"候选**。 |
| 浏览器/远程场景语音模式（WebRTC） | [#20765](https://github.com/NousResearch/hermes-agent/issues/20765) | 👍6，10 评论 | 需 dashboard PTY 桥接 + WebRTC，工程量大，属中长期。 |
| Desktop 群聊 Disband/Rename UI | [#142142](https://github.com/NousResearch/hermes-agent/issues/142142) | 8 评论 | 后端能力已就绪，**只差 UI 暴露**，是低成本高确定性候选。 |
| 插件后台原语（session fork / idle task） | [#146732](https://github.com/NousResearch/hermes-agent/pull/146732) | 待合并 | 已具 PR 形态且明确标注 experimental，**大概率纳入 v0.24.x**。 |

**关键信号**：插件目录 PR 洪峰表明生态侧已先行；若 #146732 / #146472 / #148266 三个相互堆叠的 PR 能一并落地，**插件将从"目录条目"进入"拥有后台执行能力"的阶段**——这是下一版本最值得关注的能力跃迁。

---

## 7. 用户反馈摘要

**痛点 1：智能审批的"聪明"反噬信任。**
#141346 的 PowerPoint 事故是最典型的负面体验：用户授权的是"渲染一张 PNG"，实际发生的是"关闭未保存文档并删除导出"。用户的核心诉求不是关闭自动化，而是**给"操作人类正在使用的应用"单独设一道闸**。值得注意的是，该 issue 仅被评为 P3，与其实质影响（不可恢复数据丢失）不匹配，社区对此存在感知落差。

**痛点 2：统一网关把"局部故障"放大为"全局故障"。**
#143547（60 评论）与 #141958（多 profile 下日志静默）、#131578（子代理占住会话 30 分钟）共同指向：**单进程架构下，一个组件的卡顿会传导成整会话的不可用**。用户的表述普遍是"服务看起来正常，但功能已静默失效"——这类**无告警的静默降级**比直接崩溃更伤信任。

**痛点 3：Kanban 的"重试即丢工作"。**
#145022 / #148958 / #139029 三例高度一致：worker 被计入 crash → 卡片被封锁 → **本轮进行中的工作完全丢失**。用户的场景是"多 worker 并发跑真实任务"，对可靠性要求高，容忍度低。

**痛点 4：更新与安装链路的可预期性差。**
#102540（更新从 1 分钟劣化到 6 分钟+）、#132820（matrix extra 构建失败拖垮整次 update 且无法 opt-out）、#126362（systemd drop-in 误报警告）共同反映：**`hermes update` 缺乏"最小可失败单元"**，一处失败会阻断全流程。

**正面信号：**
- 多条 npm 安全 issue（#129426 / #144084 / #133435）在今日集中关闭，说明**安全债清理正在推进**；
- 插件 Hackathon 的踊跃提交（单日十余条目录 PR）表明**扩展机制获得了社区的实际认可与投入**；
- #125695 的关闭修复了"单个模型冷却导致辅助能力瘫痪一年"的长期困扰，属高价值修复。

**使用场景画像**：macOS 桌面 + 本地后端（多例）；Windows 11 + Node 24（Keet、state.db）；Linux 服务器 + SSH/TUI 远程（语音模式诉求）；多 worker Kanban 并发任务编排；多 profile 的 gateway 生产部署。

---

## 8. 待处理积压

以下条目**创建时间久、影响明确、且当前无关联 fix PR**，建议维护者优先排期或明确表态：

| 条目 | 创建 | 年龄 | 为何值得关注 |
|---|---|---|---|
| [#5320](https://github.com/NousResearch/hermes-agent/issues/5320) 记忆上限提升 | 2026-04-05 | **约 7 个月** | 单行配置级改动，长期未决，👍3，且与 #35121 互补。 |
| [#2045](https://github.com/NousResearch/hermes-agent/issues/2045) 懒加载技能 | 2026-03-19 | **约 8 个月** | 👍5，token 成本问题随技能数增长持续恶化，标记 `needs-decision` 但久未收敛。 |
| [#20510](https://github.com/NousResearch/hermes-agent/issues/20510) 云同步 | 2026-05-06 | 约 6 个月 | 👍24 为全站最高共鸣之一，与 Hermes Cloud 战略直接相关，缺官方路线图回应。 |
| [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) 生命周期守卫误报 | 2026-09-08 | 约 2 个月 | 26 评论，阻断合法 Node.js CLI，标记 `needs-decision`。 |
| [#97065](https://github.com/NousResearch/hermes-agent/issues/97065) Keet setup 崩溃 | 2026-08-28 | 约 2.5 个月 | 28 评论，Windows 用户完全无法完成 gateway setup。 |
| [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) browser daemon 泄漏 | 2026-09-24 | 约 1.5 个月 | 20 评论，进程泄漏会随使用时长累积，运维成本隐性上升。 |
| [#67458](https://github.com/NousResearch/hermes-agent/issues/67458) `-w` 在 `-z` 下被忽略 | 2026-07-19 | 约 4 个月 | 静默忽略用户意图，可能造成意外提交到主分支。 |
| [#129455](https://github.com/NousResearch/hermes-agent/issues/129455) 默认安装测试大面积失败 | 2026-09-30 | 约 1.5 个月 | 28 评论，影响贡献者的本地验证闭环，间接抬高 PR 门槛。 |
| [#103213](https://github.com/NousResearch/hermes-agent/pull/103213) MCP 重连修复 PR | 2026-09-04 | **约 2 个月未合** | 修复明确、附 issue #103211，但长期 `OPEN`，建议确认是否卡在评审或 CI。 |
| [#151651](https://github.com/NousResearch/hermes-agent/pull/151651) business-brain 插件 | 2026-11-09 | 2 天 | 18 本地工具 + 19 技能的大型插件，目录审核复杂度显著高于其他条目，可能需要单独流程。 |

---

### 编辑部观察

今天的 Hermes Agent 处于典型的**"架构跃迁后的消化期 + 生态爆发期"叠加态**：v0.23.1 用 618 个 PR 的体量完成了稳定性封装，但统一网关引入的耦合效应正以 P0/P1 issue 的形式持续显影；与此同时，插件 Hackathon 让 PR 侧呈现出少见的生态活力。**短期健康度的关键变量不在新增功能，而在于能否在 v0.24.0 之前清掉 Kanban 故障簇与 Windows `state.db` 回滚这两个"信任级"缺陷。**

---

*数据来源：NousResearch/hermes-agent GitHub 公开数据，统计窗口 2026-11-10 至 2026-11-11。Issues/PR 明细为 500 条中的 Top 30 / Top 20 抽样，比例结论仅供参考。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 · 2026-11-11

> 数据窗口：2026-11-10 → 2026-11-11（过去 24 小时）

---

## 1. 今日速览

- 项目维持**高频维护节奏**：过去 24 小时 Issues 更新 12 条（开放/活跃 5、关闭 7，关闭率约 58%），PR 更新 27 条（待合并 14、已合并/关闭 13），无新版本发布。
- 今日合并/关闭的 13 个 PR 覆盖**性能、稳定性、新 Provider、WebUI 体验、文档**五类，属于典型的"清积压 + 补能力"混合周期。
- 核心贡献者 @wcqqq1214 单人贡献了 8 个以上 PR/Issue 交互，是今日项目推进的主要驱动力；维护者 @Soulter 的长周期重构 PR #10077 仍在推进。
- 社区讨论热度最高的是**插件市场版本检测失效**（#11050，6 条评论）与**知识库标题拼接策略**（#9902，4 条评论，跨两个月的架构级讨论）。
- 今日新开 Issue #11079 与对应修复 PR #11080 在数小时内即形成"报告—修复"闭环，反映响应链路健康。

---

## 2. 版本发布

本周期内**无新版本发布**（0 个 Release），当前主线以修复与功能合入为主，预计下一次版本将集中释放本周期积累的修复与新特性。

---

## 3. 项目进展

今日合并/关闭的 PR 构成一条清晰的主线：**修复存量缺陷 + 补齐平台能力**。

**功能交付**
- **#11067** `feat(plugin-config): collapsible config groups` —— 插件配置分组折叠落地，直接回应 #11058，解决字段多的插件配置页被拉成长条的问题。
  https://github.com/AstrBotDevs/AstrBot/pull/11067
- **#10968** `feat(provider): add OpenAI Decisions API decision provider` —— 新增结构化判断类 Provider（布尔/选项/评分 + 概率分布），让插件不再依赖解析聊天模型文本，对应 #10967。
  https://github.com/AstrBotDevs/AstrBot/pull/10968

**性能与稳定性**
- **#11001 / #10989** —— 修复 aiocqhttp 流式分句正则 `O(n²)` 开销，改为增量分句与有界缓冲，解决事件循环被阻塞、其他会话被拖慢的问题（对应 #10988）。
  https://github.com/AstrBotDevs/AstrBot/pull/11001 ｜ https://github.com/AstrBotDevs/AstrBot/pull/10989
- **#11071** —— 修复 cron 任务在使用 `future_task` 删除自身时协程死锁、`status` 永久卡在 `running` 的问题（对应 #11063）。
  https://github.com/AstrBotDevs/AstrBot/pull/11071

**体验与外围修复**
- **#10903** 修复 QQ 按钮回复丢失图片/文件附件；**#10883** 修复 ChatUI 文件面板读取默认工作区而非当前会话工作区；**#10868** 修复 DashScope Agent 超时未透传；**#10792** 修复编辑 Provider 配置时模型能力徽章丢失；**#10794** 修复 EPUB 解析丢失页内锚文本。
  https://github.com/AstrBotDevs/AstrBot/pull/10903 ｜ https://github.com/AstrBotDevs/AstrBot/pull/10883 ｜ https://github.com/AstrBotDevs/AstrBot/pull/10868 ｜ https://github.com/AstrBotDevs/AstrBot/pull/10792 ｜ https://github.com/AstrBotDevs/AstrBot/pull/10794

**文档与依赖**
- **#11061** 澄清 bubblewrap 版本要求说明（对应 #11059）；**#11068** 由 dependabot 升级 github-actions 组（pnpm/action-setup、codeql-action、docker/login-action）。
  https://github.com/AstrBotDevs/AstrBot/pull/11061 ｜ https://github.com/AstrBotDevs/AstrBot/pull/11068

> **进展评估**：单个周期内完成 2 项用户可感知功能、3 项崩溃/性能级修复、5 项体验修补，属于"高质量密集合入"的一天。项目在稳定性方面的短板（流式分句、cron 调度）得到实质性收敛。

---

## 4. 社区热点

| 排名 | 条目 | 评论 | 状态 | 链接 |
|---|---|---|---|---|
| 1 | #11050 插件无法检测到有新版本 | 6 | CLOSED | https://github.com/AstrBotDevs/AstrBot/issues/11050 |
| 2 | #9902 知识库向量拼接文档标题的取舍讨论 | 4 | OPEN | https://github.com/AstrBotDevs/AstrBot/issues/9902 |
| 3 | #11058 插件配置项支持折叠 | 3 | CLOSED | https://github.com/AstrBotDevs/AstrBot/issues/11058 |
| 4 | #10363 定时间隔未按固定间隔执行 | 3 | OPEN | https://github.com/AstrBotDevs/AstrBot/issues/10363 |
| 5 | #11076 插件 astrbot_plugin_panel_account 提交 | 2 | OPEN | https://github.com/AstrBotDevs/AstrBot/issues/11076 |

**诉求分析**
- **#11050**：插件市场已审核通过新版本，但客户端未提示更新——这是"**分发链路可信度**"问题，用户对插件市场作为分发中心的信任依赖版本检测的准确性，讨论量最高说明影响面较广。
- **#9902**：`kb_helper.py` 将文档标题拼进每个 chunk 的 embedding 文本，导致稠密检索被标题词主导。这是少见的**检索质量架构级讨论**，从 9 月持续至今仍在开放，说明尚未形成共识方案，属于需要维护者拍板的设计决策。
- **#11058**：配置页完全平铺导致长表单难以定位，社区提出后当日即有 PR #11067 实现并合入——**反馈到落地的闭环速度是本项目的一大健康指标**。
- **#10363**：定时任务把"每 60 分钟"翻译成 `*/59 * * * *`，导致 59/1 分钟交替触发。这是**语义与实现的静默偏差**，用户难以自我诊断，且自 10 月 3 日提交至今仍为 OPEN，是当前最值得关注的功能性缺陷。

---

## 5. Bug 与稳定性

按严重程度排序：

**🔴 严重（已修复）**
- **#11063** cron `active_agent` 任务用 `future_task` 删除自身时死锁，行永久停在 `status='running'`，任务不再被调度。→ 已有 fix PR **#11071** 并已关闭。
  https://github.com/AstrBotDevs/AstrBot/issues/11063
- **#10988** aiocqhttp 流式分句正则 `O(n²)` 计算开销，同步运行于事件循环，阻塞其他会话。→ 已有 fix PR **#11001 / #10989**，已关闭。
  https://github.com/AstrBotDevs/AstrBot/issues/10988

**🟠 中等（新报，已具备 fix PR）**
- **#11079** `_normalize_content` 仅捕获 `ValueError`/`SyntaxError`，模型输出 `[ {{...}} ]` 时 `ast.literal_eval` 抛 `TypeError`，请求以 `unhashable type: 'dict'` 失败。今日新开，同日即有 **#11080** 待合并。
  https://github.com/AstrBotDevs/AstrBot/issues/11079 ｜ https://github.com/AstrBotDevs/AstrBot/pull/11080

**🟠 中等（未修复，持续开放）**
- **#10363** 定时间隔被静默截断为不等价 Cron，跨小时/跨天时缩短间隔。**目前无直接 fix PR**（#11074 处理的是 one-shot 任务重调度被旧执行删除的相邻问题，可作为同族修复的铺垫）。
  https://github.com/AstrBotDevs/AstrBot/issues/10363
- **#11050** 插件市场新版本审核通过但客户端不提示更新。已关闭，但摘要未体现根因说明，建议关注是否有回归风险。
  https://github.com/AstrBotDevs/AstrBot/issues/11050

**🟡 轻微**
- **#11066** TTS 语音被自动落盘且无清理策略，属资源管理类问题（功能缺失 + 磁盘占用）。
  https://github.com/AstrBotDevs/AstrBot/issues/11066

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 判断信号 | 纳入下一版本可能性 |
|---|---|---|---|
| 插件配置分组折叠 | #11058 | PR #11067 已合并 | ✅ 已落地 |
| OpenAI Decisions API Provider | #10967 | PR #10968 已合并 | ✅ 已落地 |
| 知识库 embedding 是否拼接标题 / 可配置化 | #9902 | 4 条讨论，无 PR，涉及检索架构 | 🟡 需维护者定调，可能以配置开关形式落地 |
| TTS 语音缓存开关与条数上限 | #11066 | 仅 1 条评论，无 PR，实现成本低 | 🟢 适合作为小型配置项纳入近期版本 |
| 定时任务间隔语义修正 | #10363 | 3 条评论，长期 OPEN | 🟡 属缺陷修正而非新功能，需排期 |
| Gemini 内置工具与 function calling 共存 | #9937 → PR #11078 | PR 已开，待合并 | 🟢 高概率进入下一版本 |
| SpecStream 作为 Web 搜索 Provider | #11037 | 由服务方自荐提交，待评审 | 🟡 取决于维护者对第三方搜索源的采纳策略 |

插件生态侧今日收到两个新插件登记（#11076 面板账号管理、#11073 讨大白饭），前者触及 **WebUI 账号安全**场景（聊天指令改用户名/密码），建议维护者在审核时关注权限模型与凭证传输安全。

https://github.com/AstrBotDevs/AstrBot/issues/11076

---

## 7. 用户反馈摘要

**真实痛点**
- *"插件市场新版本审核通过，但是插件没提示有新版"* —— 用户对插件更新链路高度依赖，检测失效会直接导致长期停留在旧版。
- *"偶然点开服务器文件才发现每条语音都被存了文件，清理起来很麻烦"* —— 默认行为缺乏显式告知与清理入口，长期运行实例存在磁盘膨胀风险。
- *"所有字段一行行往下排，没有任何折叠……字段多的插件会被拉成很长一页，想找的分组很难定位"* —— 插件生态繁荣后，配置页可读性成为瓶颈。
- *"不应静默截断输入"* —— 用户对"设置值与实际行为不一致"这类静默偏差容忍度低，期望显式校验或报错。

**使用场景**
- WebUI 侧：插件配置管理、WebChat 会话切换与文件面板、备份页、Provider 配置。
- 平台侧：QQ（按钮回复、多媒体）、Telegram（相册消息）、aiocqhttp 流式输出。
- Agent 侧：cron 定时任务与 sandbox（bubblewrap）部署环境。

**满意度信号**
- 多条 Issue 在提出后 24–48 小时内获得对应 PR 并合入（#11058→#11067、#10988→#11001/#10989、#11059→#11061），说明社区对响应速度的预期是被满足的。
- 全部条目的 👍 均为 0，说明用户更多通过文字评论而非表情表态，讨论深度优于热度。

---

## 8. 待处理积压

**长期开放的 Issue**
- **#9902**（创建 2026-09-01，已 71 天）知识库标题拼接策略 —— 影响检索质量，需架构决策。
  https://github.com/AstrBotDevs/AstrBot/issues/9902
- **#10363**（创建 2026-10-03，已 39 天）定时间隔不准确 —— 用户可感知的功能性缺陷，仍无 fix PR。
  https://github.com/AstrBotDevs/AstrBot/issues/10363

**长期开放的 PR**
- **#10077**（创建 2026-09-14，维护者 @Soulter 提交）会话存储迁移到事件日志后端 —— 涉及存储模型级重构，压缩/插件编辑/检查点统一为有序事件流，属高价值但高风险的长期工作，建议明确里程碑与拆分计划。
  https://github.com/AstrBotDevs/AstrBot/pull/10077
- **#10811**（创建 2026-10-27）备份列表在并发删除时抛 `FileNotFoundError` —— 小范围健壮性修复，已停滞两周，适合快速合入。
  https://github.com/AstrBotDevs/AstrBot/pull/10811
- **#11037**（创建 2026-11-07）SpecStream 搜索 Provider —— 第三方服务自荐类 PR，需要维护者就外部依赖的引入标准给出结论，避免长期挂起。
  https://github.com/AstrBotDevs/AstrBot/pull/11037

**今日新开待评审**
- #11078（Gemini 工具组合，Fixes #9937）、#11074（one-shot 任务重调度）、#11075（Telegram 相册与命令同步解耦）、#11077（WebChat 删除会话时保留活跃会话）、#11080（TypeError 修复）。
  https://github.com/AstrBotDevs/AstrBot/pull/11078 ｜ https://github.com/AstrBotDevs/AstrBot/pull/11074 ｜ https://github.com/AstrBotDevs/AstrBot/pull/11075 ｜ https://github.com/AstrBotDevs/AstrBot/pull/11077 ｜ https://github.com/AstrBotDevs/AstrBot/pull/11080

---

### 项目健康度小结

| 指标 | 数值 | 判读 |
|---|---|---|
| Issue 关闭率（24h） | 7/12 ≈ 58% | 健康，消化速度高于新增 |
| PR 合并率（24h） | 13/27 ≈ 48% | 健康，待合并队列以当日新提交为主 |
| 报告→修复闭环 | #11079 → #11080 同日 | 优秀 |
| 核心贡献集中度 | @wcqqq1214 主导 | ⚠️ 需关注单点依赖风险 |
| 长期挂起项 | 2 个 Issue + 3 个 PR | 可接受，但 #10363 建议优先排期 |

整体判断：项目处于**活跃且有序的维护状态**，性能与并发类硬缺陷正在被系统性清除，WebUI 体验持续改善；下一阶段的关键变量是 #10363 的调度语义修正、#10077 的存储重构落地节奏，以及核心贡献者过度集中的缓解。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目日报
**日期：2026-11-11** ｜ 数据源：GitHub Discussions（仓库未启用 Issues / PR，代码经 Releases 落地）

---

## 1. 今日速览

- **社区热度处于高位**：过去 24 小时 Discussions 更新 **208 条**，展示的 Top 15 热帖累计 **253 条评论**（均值 16.9 条/帖），且 **15 条全部为 OPEN 状态**，无一条在本周期内关闭或标记解决。
- **交付侧完全静默**：过去 24 小时 **新版本 0 个**，Releases changelog 为空，即本周期**合并上线的功能 0 项、修复 0 项**。讨论量与交付量出现明显背离（208 : 0）。
- **故障集中在两个面**：一是 **Desktop 认证 Cookie 堆积**导致启动 431/header 溢出（#9924 / #11095 / #11624 三条同源帖，合计 58 条评论）；二是 **Windows 平台可用性**（沙箱命令全失败 #10066、安装器 error 5 #9995、文件选择器与 GPU 渲染 #11942）。
- **出现数据安全级别事件**：#12751 用户让 Agent 编写插件，结果 `dsh` 目录与 zcode 全部会话被清空，属于信任层面的高危反馈，需优先定性。
- **健康度判断**：**社区活力强、生态自发生长（插件展示帖持续活跃），但维护响应与发版节奏显著落后于社区输入**，多条 25～89 天的高评论帖长期挂起，存在核心用户流失与口碑风险。

| 指标 | 数值 |
|---|---|
| 24h Discussions 更新 | 208 条 |
| Top 15 评论总数 | 253 条 |
| Top 15 中 OPEN 占比 | 15 / 15（100%） |
| 新版本发布 | 0 个 |
| 合并上线功能 / 修复 | 0 项 / 0 项 |
| Top 15 点赞总数 | 0（该仓库社区不以 👍 表达态度，热度需以评论数衡量） |

---

## 2. 版本发布

**本周期无新版本发布**（新版本 0 个，Releases changelog 为空），因此**无版本号可标注、无破坏性变更、无迁移注意事项**。

需要说明的是：该仓库不使用 PR 流程，功能与修复均通过 Release 一次性落地。本周期 changelog 为空，意味着**社区在上述高优先级缺陷上的修复尚未进入任何已发布版本**。当前线上仍以 `0.2.1-alpha.4 / alpha.5 / rc.1 / rc.2 / rc.3 / rc.5` 等预发布版本为主（多个 bug 报告跨这些版本复现），版本线本身仍处于不稳定收敛阶段。

---

## 3. 项目进展

**代码交付维度：本周期推进量为 0。** 无 Release 即无合并摘要，无可归属的功能新增或缺陷修复。

**社区协作维度：有实质增量，但不构成产品进展。**

- **生态扩展性得到验证**：插件展示区持续产出可用扩展 —— [dsh-design-studio](https://github.com/deepseek-ai/deepseek-harness/discussions/10615)（设计工作台，10 条评论）与 [dsh-plugin-wsl-env](https://github.com/deepseek-ai/deepseek-harness/discussions/8644)（把会话与沙箱整体搬进 WSL 发行版，7 条评论）。后者通过 `ctx.shell` / `ctx.fs` 等 seam provider 复用模型既有的 `bash`/`read`/`write`/`edit`/`glob`/`grep` 工具，说明**插件接缝设计（seam provider）具备足够的表达力**，是当前项目最健康的一面。
- **需求侧完成问题定义**：多文件夹工作区（#5505）、跨会话消息（#9921）、持久化记忆（#1345）三条提案均已给出较完整的设计对齐（如 #5505 对齐 Codex 的多文件夹项目模型），具备直接进入设计评审的条件。
- **风险面**：讨论区正在承担事实上的 issue tracker 职能，但缺少关闭/标记/里程碑机制，**需求与缺陷无法被收敛为可跟踪的交付项**，这是当前流程最大的结构性缺口。

---

## 4. 社区热点

| 排名 | 讨论 | 评论 | 状态 | 持续时长 |
|---|---|---|---|---|
| 1 | [#5495 请求发送 `x-opencode-session` 头（OpenCode Go 自 09/05 起强制要求）](https://github.com/deepseek-ai/deepseek-harness/discussions/5495) | 48 | OPEN | 69 天 |
| 2 | [#12755 支持 MIR 卡为 DeepSeek API 充值（俄罗斯用户）](https://github.com/deepseek-ai/deepseek-harness/discussions/12755) | 39 | OPEN | 2 天 |
| 3 | [#9924 Desktop 网页认证失败：陈旧 `dsh-auth-*` Cookie 撑爆 Host 头上限（431）](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) | 33 | OPEN | 25 天 |
| 4 | [#11095 陈旧 `dsh-auth-*` Cookie 溢出 Node `maxHeaderSize`(16384)，启动认证中断](https://github.com/deepseek-ai/deepseek-harness/discussions/11095) | 18 | OPEN | 16 天 |
| 5 | [#1345 内置持久化长期记忆](https://github.com/deepseek-ai/deepseek-harness/discussions/1345) | 17 | OPEN | 89 天 |

**诉求分析：**

- **#5495 是当前影响面最大的外部兼容性问题**。提案方即 OpenCode Go 托管推理 API 的运营方（@thdxr），称约 **2.5 万个用户组织**通过 deepseek-harness 调用其服务，而其自 **09/05 起**对缺少 `x-opencode-session` 头的请求直接报错。该线程已持续 **69 天、48 条评论**，是全部讨论中互动最高的条目。本质上这不是"新功能"，而是**已生效的上游破坏性变更**，拖延成本随时间线性放大。
- **#9924 / #11095 / #11624 是同一根因的三次独立上报**（Cookie 名称编码随机端口、30 天 Max-Age、旧代际永不清理，Chromium 每次启动全量回放）。三条帖合计 **58 条评论**，覆盖 Linux/Wayland 与 Windows 双平台，跨越 `alpha.4 → rc.5` 多个版本。**同一缺陷被反复重开，说明社区缺少可检索的缺陷归并机制，也说明修复长期未落地。**
- **#12755（39 条评论，2 天内）是增速最快的帖子**，反映的是支付本地化而非产品功能：俄罗斯用户无法用本地卡充值，直接阻断 API 采纳。这类议题评论密度高、决策权在商业侧而非工程侧，但会持续占用讨论区注意力。
- **#1345（89 天、17 条评论）** 是最"老"的高热度需求：当前 Agent 仅有会话内上下文，会话结束即丢失，用户只能用 docs/git 外部化记忆。这是与 Codex / Claude 类产品对标的**能力级差距**，而非体验优化。

---

## 5. Bug 与稳定性

按严重程度排序。**说明：该仓库无 PR 机制，无法从 PR 侧确认修复状态；截至本周期结束，上述缺陷均未见对应 Release 说明，故一律标注为"无已发布修复"。**

### P0 — 数据丢失 / 核心功能不可用

| 问题 | 平台/版本 | 评论 | 状态 |
|---|---|---|---|
| [#12751 让 Agent 写插件，`dsh` 目录与 zcode 全部会话被清空](https://github.com/deepseek-ai/deepseek-harness/discussions/12751) | Desktop | 11 | OPEN，11-11 仍在更新 |
| [#10066 受限命令全部以 `0xC0000142` 失败：沙箱 runner 使用 Electron（GUI 子系统）二进制](https://github.com/deepseek-ai/deepseek-harness/discussions/10066) | Windows 11 26200 / `0.2.1-rc.2` | 13 | OPEN，11-11 仍在更新 |

- **#12751**：用户仅要求"写一个统计 token 用量的插件"，结果会话无法打开、`dsh` 与 zcode 会话全部丢失，语气激烈。这是**Agent 写操作边界与备份/回滚机制缺失**的典型暴露，严重度高于任何功能性 bug——它直接损害用户对"让 Agent 改本地文件"这一核心场景的信任。**无已发布修复。**
- **#10066**：`workspace-write` 模式下**每一条命令**（含 `cmd /c echo ok`）立即失败，无 stdout/stderr。根因明确指向沙箱 runner 误用 GUI 子系统二进制，属可定位、可修复的工程缺陷，但**在 Windows 上等于沙箱功能整体不可用**。**无已发布修复。**

### P1 — 启动阻断 / 进程崩溃 / 无法升级

| 问题 | 平台/版本 | 评论 | 状态 |
|---|---|---|---|
| [#9924 认证 Cookie 溢出 Host 头（431）](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) | Linux x64 / `alpha.4`、`alpha.5`、`rc.1` | 33 | OPEN，25 天 |
| [#11095 同一根因：溢出 `maxHeaderSize` 16384](https://github.com/deepseek-ai/deepseek-harness/discussions/11095) | Desktop | 18 | OPEN，16 天 |
| [#11624 反复重启后必定启动失败（431）](https://github.com/deepseek-ai/deepseek-harness/discussions/11624) | Win11 / `rc.5`、`rc.3` | 7 | OPEN，11 天 |
| [#11218 inspector `setState` 未捕获异常杀死宿主进程](https://github.com/deepseek-ai/deepseek-harness/discussions/11218) | Desktop 宿主 | 7 | OPEN，16 天 |
| [#9995 更新安装失败：`MoveFileExW` 备份重命名恒返回 error 5](https://github.com/deepseek-ai/deepseek-harness/discussions/9995) | Win11 / `0.2.0-rc.2 → 0.2.1-rc.2` | 7 | OPEN，25 天 |

- **Cookie 三连帖是本周期最确定的"必修项"**：根因清晰（每端口一枚 Cookie、永不回收），复现稳定（重启 N 次必现），影响启动路径，且**跨三个预发布版本未修**。这是当前对版本口碑杀伤最大的缺陷。
- **#9995** 使 Windows 用户**无法完成升级闭环**（应用内更新与手动安装均失败，已排除进程残留、ACL、杀软），与 #10066 叠加后，Windows 侧实际处于"升级不了、升级了也跑不动命令"的双重困境。
- **#11218** 属宿主进程级崩溃（`source state exceeds the source-frame byte limit` → fatal uncaught exception），影响实验性 inspector 的用户，面较窄但后果为整进程退出。

### P2 — 体验与产品工程

- [#11942 DeepSeek 的产品工程能力是否跟上了模型能力？](https://github.com/deepseek-ai/deepseek-harness/discussions/11942)（15 条评论）：集中反映 Windows 文件选择器因过长 `accept` 扩展名列表卡死、AMD 独显开硬件加速时光标渲染异常等。属**跨产品线的系统性工程质量问题**。

---

## 6. 功能请求与路线图信号

**判断依据说明：** 本周期 Releases 为空，**没有任何证据表明下列需求已被纳入下一版本**。以下"可能性"评估仅基于需求成熟度、讨论热度与版本线现状（`0.2.1` 仍处 rc，主线在修稳定性）作推断，不代表官方排期。

| 需求 | 评论 | 成熟度信号 | 纳入下一版本的可能性 |
|---|---|---|---|
| [#1345 持久化长期记忆](https://github.com/deepseek-ai/deepseek-harness/discussions/1345) | 17 | 需求明确（结构化记忆后端 + 跨会话召回），89 天未决 | 中低。属架构级改动，与当前 rc 收敛目标冲突 |
| [#5505 多文件夹工作区 + primary 文件夹](https://github.com/deepseek-ai/deepseek-harness/discussions/5505) | 11 | 设计完整，明确对齐 Codex 项目模型并保留单目录兼容默认值 | 中。改动面可控、兼容路径清晰，是最易落地的一条 |
| [#9921 跨对话消息（Agent 工具 + 本地 API/CLI）](https://github.com/deepseek-ai/deepseek-harness/discussions/9921) | 10 | 场景具体（1 编排会话 + 3 工程会话广播），要求带发送方来源与授权开关 | 中低。涉及安全授权模型，需先有沙箱与权限基线 |
| [#5495 `x-opencode-session` 头](https://github.com/deepseek-ai/deepseek-harness/discussions/5495) | 48 | **上游已强制生效**，非可选需求 | **高（应视为缺陷而非特性）**。实现成本极低、影响面 2.5 万组织 |
| [#12755 支持 MIR 卡充值](https://github.com/deepseek-ai/deepseek-harness/discussions/12755) | 39 | 支付/商业侧决策 | 不适用工程排期，建议转入商业化渠道 |
| [#10615](https://github.com/deepseek-ai/deepseek-harness/discussions/10615) / [#8644](https://github.com/deepseek-ai/deepseek-harness/discussions/8644) 插件 | 10 / 7 | 已由社区自行实现并可用 | 无需纳入核心；建议官方收录/背书 |

**路线图信号：** 讨论区呈现出清晰的"**能力级需求（记忆、多会话编排、多根工作区）**"与"**平台级缺陷（Windows、Cookie、Agent 写安全）**"两条并行压力线。在 `0.2.1` 尚未 GA 的情况下，理性的下一个版本应为**纯稳定性版本**（修 Cookie 三连、Windows 沙箱与安装器），而非承载 #1345 这类架构特性。

---

## 7. 用户反馈摘要

**不满意 / 痛点（按情绪强度排序）：**

1. **对 Agent 破坏性写操作的强烈不信任**（#12751）：用户原话"我 tm 真服了"。诉求不是"功能缺失"，而是**执行前的危险操作确认、目录级备份与可回滚**。这类事件对口碑的边际伤害远大于普通 bug。
2. **Windows 平台体验被视为二等公民**（#10066、#9995、#11942）：沙箱不可用、升级失败、文件选择器卡死、GPU 渲染异常叠加，形成"装不上 / 升不了 / 跑不动"的完整负面链路。
3. **反复重启即失联**（#9924、#11095、#11624）：桌面端用户已形成"重启有风险"的心理预期，且同一问题被三个用户独立上报，说明**现有反馈渠道无法让用户确认"是否已有人报过"**。
4. **对产品工程能力的公开质疑**（#11942，15 条评论）：用户明确将"模型能力"与"产品工程能力"对比，认为后者未跟上。这是**品牌层面的信号**，超出单一仓库范畴。
5. **付费通路受阻**（#12755，39 条评论 / 2 天）：非功能缺陷，但直接阻断新兴市场用户的采纳意愿，"想付钱付不了"。

**满意 / 正向信号：**

- **插件体系是被真实认可的能力**：#10615 的"直接在预览上画、点一下让模型改"与 #8644 的"把沙箱整体搬进 WSL 发行版"均由社区自发完成并配演示，说明扩展接口的表达力足以支撑复杂场景，用户的创造意愿旺盛。
- **需求提案质量高**：#5505、#9921、#1345 均附带清晰的问题陈述、场景与兼容性考量，用户愿意投入成本做设计对齐——这是**高黏性用户群**的表现，但也意味着他们的等待耐心有限。
- **会话内工作流（窗口 + goal/todo 工具）基本可用**，抱怨集中于"会话之外"（记忆、跨会话、多目录、启动稳定性），指向**边界能力而非核心体验**。

---

## 8. 待处理积压（提醒维护者关注）

| 讨论 | 类型 | 评论 | 已挂起 | 积压风险 |
|---|---|---|---|---|
| [#1345 持久化长期记忆](https://github.com/deepseek-ai/deepseek-harness/discussions/1345) | 功能 | 17 | **89 天** | 最高。能力级差距，长期无官方回应易导致用户转向替代品 |
| [#5495 `x-opencode-session` 头](https://github.com/deepseek-ai/deepseek-harness/discussions/5495) | 兼容性缺陷 | **48** | **69 天** | 最高。上游已于 09/05 强制生效，影响约 2.5 万组织，**已过补救窗口** |
| [#5505 多文件夹工作区](https://github.com/deepseek-ai/deepseek-harness/discussions/5505) | 功能 | 11 | **69 天** | 中。设计完备、待评审，属"低垂果实" |
| [#8644 WSL 环境插件](https://github.com/deepseek-ai/deepseek-harness/discussions/8644) | 生态 | 7 | 40 天 | 低（社区自维护），但官方未表态收录 |
| [#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) / [#11095](https://github.com/deepseek-ai/deepseek-harness/discussions/11095) / [#11624](https://github.com/deepseek-ai/deepseek-harness/discussions/11624) Cookie 三连 | 缺陷 | 33 / 18 / 7 | 25 / 16 / 11 天 | **最高**。同源重复上报，应合并为单一跟踪项并给出修复版本承诺 |
| [#10066 Windows 沙箱 0xC0000142](https://github.com/deepseek-ai/deepseek-harness/discussions/10066) | 缺陷 | 13 | 25 天 | 高。根因明确，修复收益大 |
| [#9995 安装器 error 5](https://github.com/deepseek-ai/deepseek-harness/discussions/9995) | 缺陷 | 7 | 25 天 | 高。阻断升级闭环 |
| [#9921 跨会话消息](https://github.com/deepseek-ai/deepseek-harness/discussions/9921) | 功能 | 10 | 25 天 | 中 |
| [#11218 inspector 崩溃](https://github.com/deepseek-ai/deepseek-harness/discussions/11218) | 缺陷 | 7 | 16 天 | 中（影响面窄，后果重） |

**流程建议（基于数据的观察）：**

1. **建立缺陷归并机制**。Cookie 问题三个独立帖共 58 条评论、跨越 5 个预发布版本，是流程缺失的直接证据；建议在 Discussions 中引入标签与"已合并至 #xxxx"标记。
2. **区分"缺陷"与"需求"的处理时限**。#5495 被长期归类为 `[Ideas]`，但其上游已强制生效，实质是**破坏性兼容缺陷**，应升级优先级并给出明确时间表。
3. **发版节奏与社区输入的比值需要修正**。24 小时 208 条讨论 vs 0 个版本的组合不可持续；建议至少在稳定性版本中对 Cookie、Windows 沙箱、安装器三项给出"已修复"的公开确认，以对冲 #11942 类信任质疑的扩散。

---

**数据口径备注：** 本报告所有结论均基于 2026-11-11 提供的 Discussions 快照（208 条更新中的 Top 15）与空的 Releases 列表；仓库未启用 Issues/PR，故"无已发布修复"仅表示**未观测到对应 Release 说明**，不等同于维护者未在处理。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*