# OpenClaw 生态日报 2026-11-23

> Issues: 394 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-23 02:03 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-11-23

> 数据窗口：2026-11-22 至 2026-11-23｜数据源：GitHub Issues / PR / Releases

---

## 1. 今日速览

- **活跃度：极高**。过去 24 小时 Issues 更新 394 条、PR 更新 500 条、新版本 1 个，合计约 900 次仓库事件，属于典型的高频迭代节奏。
- **吞吐健康但有压力**：PR 侧已合并/关闭 231 条（约 46%），待合并 269 条（约 54%），合并端与提交端基本持平，但待合并池规模已超过单日处理速度，积压风险上升。
- **Issues 侧新增高于关闭**：新开/活跃 319 条 vs 关闭 75 条，净增约 244 条，其中相当比例来自 stale 标签的历史问题集中清理与复检。
- **主线聚焦在“会话生命周期”**：今日 v2026.11.7 的核心亮点是 Gateway 重启后的对话恢复；而社区讨论最热的 Issue（#150635、#182891、#141474、#155563）也全部指向会话、记忆与子任务的生命周期正确性。
- **稳定性风险集中在升级路径与平台差异**：P0 级问题中，Windows 托管更新、macOS 启动凭据、MEMORY.md 注入缺失三项均属“装不上/起不来”级别，是本阶段项目健康度的主要拖累项。

---

## 2. 版本发布：v2026.11.7

**Tag**：`v2026.11.7`｜**Commit**：`e31bbf056de321127988ec5c1a36ff1b59297de0`｜发布收尾 PR：[#203880](https://github.com/openclaw/openclaw/pull/203880)

### 核心更新
- **Conversation recovery（对话恢复）**：在 Gateway 重启后恢复被中断的回复与子结果，不再丢失在途工作（[#198905](https://github.com/openclaw/openclaw/issues/198905)、[#201544](https://github.com/openclaw/openclaw/issues/201544)、[#200924](https://github.com/openclaw/openclaw/issues/200924)、[#200967](https://github.com/openclaw/openclaw/issues/200967)）。作者 @steipete，致谢 @RomneyDa、@galiniliev、@vincentkoc。
- **Reliable automations（可靠自动化）**：官方摘要在此处被截断，仅可确认该条目与自动化任务的可靠性相关。

> 说明：本次 Release Notes 摘要在数据源中不完整，`Reliable automations` 的完整内容无法核实，建议后续以 GitHub Release 原文为准。

### 破坏性变更与迁移注意事项
- Release Note 中**未声明显式破坏性变更**，但结合同期高优先级 Issue，升级时存在以下已知风险面：
  - **插件迁移校验可能阻断升级**：[#200606](https://github.com/openclaw/openclaw/issues/200606)（P1，21 评论）报告 2026.11.3 → 2026.11.5 时 Candidate Doctor 因插件迁移义务冲突而拒绝激活，且 `changed=[]`。
  - **已退役配置项处理存在两难**：[#200224](https://github.com/openclaw/openclaw/issues/200224)（P2，14 评论）指出 `agents.defaults.heartbeat` 在 beta 被拒绝，但稳定版删除该配置反而会重新启用心跳。
  - **Git 安装用户更新链路曾中断**：[#203608](https://github.com/openclaw/openclaw/pull/203608)（已关闭）修复了 2026-11-17 至 2026-11-17 之间追踪 `main` 的 Git 检出被自身 updater 半切换、后续无法完成升级的问题。

### 关联发布事件（重要）
- [PR #203871](https://github.com/openclaw/openclaw/pull/203871)（已关闭）：**为 2026.11.6 回迁 5 项关键 macOS 修复，用于替换损坏的下载资产**。这是 macOS-only 的恢复性发布，保留原 tag、npm 包、短版本号与 build `2611000690`，并且**不会向已安装 2026.11.6 的应用推送更新**。
- 建议：macOS 用户如需重新安装 2026.11.6，应重新下载替换后的资产。

---

## 3. 项目进展

### 今日合并/关闭的重要 PR
| PR | 方向 | 说明 |
|---|---|---|
| [#203871](https://github.com/openclaw/openclaw/pull/203871) | 发布工程 | macOS 2026.11.6 关键修复回迁，修复损坏的下载资产 |
| [#203608](https://github.com/openclaw/openclaw/pull/203608) | 更新链路 | 让“半切换”的 Git 检出能从新 release 完成升级，修复 updater 自锁死 |
| [#201865](https://github.com/openclaw/openclaw/pull/201865) | 记忆 | 让 `scopeHash` 跨 locale 稳定，修复非英文 locale 下 2026.11.5 写入索引后搜索失效（Fixes #201808） |
| [#203160](https://github.com/openclaw/openclaw/pull/203160) | Web UI | 修复 Skills 首访请求超出预算（CI 实录 30 请求 vs 上限 28） |
| [#203308](https://github.com/openclaw/openclaw/pull/203308) | Web UI | 将主题背景绘制改为 opt-in，避免切换主题时被动加入装饰线条 |
| [#198961](https://github.com/openclaw/openclaw/pull/198961) | 测试治理 | 精简插件元数据测试中冗余的缓存/对象身份校验 |
| [#203874](https://github.com/openclaw/openclaw/pull/203874) | 测试治理 | 恢复 Slack 下载撤销检查，修复主分支定时 CI 红 |
| [#203868](https://github.com/openclaw/openclaw/pull/203868) | 测试治理 | 恢复 cron 单副本结果检查 |

### 今日关闭的代表性 Issue
- [#141474](https://github.com/openclaw/openclaw/issues/141474)（19 评论）：collector 子任务调用 `sessions_yield` 导致 `agents_wait` 永久挂起 —— **已在 #164445 修复并进入 v2026.11.5/11.6 稳定版**，settlement / settle-yielded / swarm 套件在 v2026.11.6 tag 与 main 上均通过。
- [#195279](https://github.com/openclaw/openclaw/issues/195279)（P1，9 评论）：后台 exec 完成唤醒因“operator execution authority is no longer active”失败。
- [#175167](https://github.com/openclaw/openclaw/issues/175167)（P1，7 评论）：iOS 语音消息因 `hydrationSuppressed: true` 从未送达 STT 提供方。
- 一批 stale 问题完成结案：[#112313](https://github.com/openclaw/openclaw/issues/112313)、[#118793](https://github.com/openclaw/openclaw/issues/118793)、[#180941](https://github.com/openclaw/openclaw/issues/180941)、[#164887](https://github.com/openclaw/openclaw/issues/164887)、[#168777](https://github.com/openclaw/openclaw/issues/168777)、[#142310](https://github.com/openclaw/openclaw/issues/142310)。

### 整体推进评估
- **产品能力向前迈进的实质增量**集中在两处：**会话中断恢复**（v2026.11.7 主线）与**记忆索引的跨语言环境一致性**（#201865）。
- **工程健康度增量**集中在三处：更新链路自愈（#203608）、macOS 资产恢复（#203871）、CI 红灯清理（#203874 / #203868 / #203160）。
- 整体判断：**主线交付正常，但"修复—回归—再修复"的模式仍明显**——v2026.11.5/11.6/11.7 三连发中，恢复类与大版本升级类问题反复出现。

---

## 4. 社区热点

### 讨论最活跃的 Issues
1. **[#150635](https://github.com/openclaw/openclaw/issues/150635)（OPEN，30 评论，🦞 diamond lobster）** — 短期召回存储 512 条上限导致已召回条目每夜被驱逐，dreaming 深度阶段因此永远无法晋升任何内容。
   *诉求*：记忆子系统存在**结构性设计缺陷**而非偶发 bug；用户已自行完成机制分析，但等待产品决策（标签含 `needs-product-decision`）。
2. **[#182891](https://github.com/openclaw/openclaw/issues/182891)（OPEN，26 评论，P1）** — Prompt cache 从不复用，每个请求都出现 `cache read dropped N -> 0`，归因于 envelope 重写、`runtimeContextCarrier` 变更及回合内不可解释的下降。
   *诉求*：**成本与延迟**。这是纯经济性问题，直接抬高了每次调用的 token 账单。
3. **[#200606](https://github.com/openclaw/openclaw/issues/200606)（OPEN，21 评论，P1）** — Candidate Doctor 因插件迁移冲突阻断 2026.11.3 → 2026.11.5 升级。
   *诉求*：**升级通道的可预期性**，用户无法判断该修配置还是等版本。
4. **[#141474](https://github.com/openclaw/openclaw/issues/141474)（CLOSED，19 评论）** — collector 子任务 yield 语义导致的死锁，今日正式结案并给出发布说明。
   *诉求*：多 agent 编排的可停止性，已被满足。
5. **[#155563](https://github.com/openclaw/openclaw/issues/155563)（OPEN，18 评论，P1）** — 回归：`service-child-relay`、`service-child-group-anchor` 与 MCP 子组在一次成功的 agent turn 后仍被保留。
6. **[#192632](https://github.com/openclaw/openclaw/issues/192632)（OPEN，16 评论，🦞 diamond lobster）** — 请求新增 `claude` web_search provider（Anthropic 服务端 `web_search`，独立 Messages 调用）。

### PR 侧热点
- **[#203860](https://github.com/openclaw/openclaw/pull/203860)（OPEN，@steipete）** — 将 `@openclaw/fs-safe` 全量从 0.27.1 升至 0.28.2，涉及异步读准入与崩溃安全锁发布的消费方适配。**注意**：0.28.0 曾（#194560）通过 changed-scope CI 后又被 #194589 回滚，本次带 `merge-risk: compatibility` 与 `merge-risk: security-boundary` 双标签，是今日风险最高的合并项。
- **[#203880](https://github.com/openclaw/openclaw/pull/203880)** — 2026.11.7 在 main 上的收尾，保留 tag、npm 与 release 分支不变。
- **[#203477](https://github.com/openclaw/openclaw/pull/203477)（🦞 diamond lobster）** — 当恢复检查未真正发出就 worker 掉线时，重试主模型，避免主模型被误跳过 30 秒。

### 背后的一致性诉求
今日热点的共同结构是：**"用户能精确复现、能给出机制解释，但卡在需要产品决策的设计分歧上"**。`clawsweeper:needs-product-decision` 标签出现在 #150635、#155563、#192632、#125764 等多条长讨论中，说明当前瓶颈不在工程能力，而在**设计取舍的裁决带宽**。

---

## 5. Bug 与稳定性

### P0（发布阻断级）
| Issue | 现象 | Fix PR 状态 |
|---|---|---|
| [#190563](https://github.com/openclaw/openclaw/issues/190563) | 无法恢复暂停的 Codex 会话：“Provider review no longer matches the native thread”，保存的 provider review 与活跃 Codex 绑定指向不同线程 | 无（`no-new-fix-pr`，需 security review） |
| [#158912](https://github.com/openclaw/openclaw/issues/158912) | 2026.9.6 起 `MEMORY.md` 不再在 bootstrap 注入，`/context list` 仅显示 AGENTS/SOUL/IDENTITY/USER，而文档仍称“会话启动时加载” | 无 |
| [#146860](https://github.com/openclaw/openclaw/issues/146860) | Windows 下 Gateway 以 Scheduled Task + `LogonType: InteractiveToken` 运行时，托管更新交接拿不到进程启动身份，卡在 `activating` 直至 abandoned | 无（`needs-info`） |
| [#201468](https://github.com/openclaw/openclaw/issues/201468) | macOS 启动告警在 bundled CLI 拒绝为旧 Gateway 做 schema 迁移时，仅给出通用凭据恢复步骤 | **有**（`linked-pr-open`） |

### P1（严重功能受损）
- [#182891](https://github.com/openclaw/openclaw/issues/182891) — prompt cache 复用彻底失效，成本与首字延迟双升。**无 fix PR**。
- [#125764](https://github.com/openclaw/openclaw/issues/125764) — Telegram 出站发送单次失败即永久 dead-letter，无重试、无 `reconcileUnknownSend`、无用户可见报错，**高价值消息静默丢失**。无 fix PR。
- [#196199](https://github.com/openclaw/openclaw/issues/196199) — 回归（自 2026.10.10）：native Codex helper 完成无法唤醒父会话，父会话停在 `sessions_yield`，用户被锁在自己的助手之外。无 fix PR。
- [#155563](https://github.com/openclaw/openclaw/issues/155563) — 回归（自 2026.9.5）：agent turn 结束后 service-child relay / group-anchor / MCP 子组未释放。无 fix PR。
- [#128140](https://github.com/openclaw/openclaw/issues/128140) — `memory_search` 工具恒定 15s 超时，而 CLI `openclaw memory search` 正常。无 fix PR。
- [#190307](https://github.com/openclaw/openclaw/issues/190307) — Gateway 重启后大量 agent 永久“degraded”（准入超时），修复提示指向全量 `doctor --fix`。无 fix PR。
- [#191476](https://github.com/openclaw/openclaw/issues/191476) — Matrix 房间在 `image_generate` 完成与入站消息竞态后卡在 "Plugin matrix consumer is closed"。无 fix PR。
- [#170928](https://github.com/openclaw/openclaw/issues/170928) — 回归：Windows 2026.10.2 Gateway 需 7–9 分钟才就绪，且就绪后间歇无响应。无 fix PR。
- [#166641](https://github.com/openclaw/openclaw/issues/166641) — `web_fetch` 冷回退发现同步在 Gateway 主线程上加载并捕获无关插件，造成存活探针停顿。有 PR 关联（`linked-pr-open`）。
- [#138972](https://github.com/openclaw/openclaw/issues/138972) — Talk 实时会话在工具结果回传前变为 "Unknown Talk session"。无 fix PR。
- [#153899](https://github.com/openclaw/openclaw/issues/153899)（stale）— Gateway drain 会耗满 `TimeoutStopSec`（本例 5m30s），期间 health refresh 与 workboard 生命周期定时器仍对已关闭资源触发。

### P2 / 稳定性观察
- **记忆子系统多点漏水**：[#196505](https://github.com/openclaw/openclaw/issues/196505)（索引在 `worker task capacity reached` 时直接中止、不重试，864 MiB 语料永不完成）；[#168777](https://github.com/openclaw/openclaw/issues/168777)（已关闭，embedding cache 中 64% 条目与 `memory_index_chunks` 重复）。
- **升级路径类**：[#187917](https://github.com/openclaw/openclaw/issues/187917)（updater-runtime-retention 失败）、[#144739](https://github.com/openclaw/openclaw/issues/144739)（2026.9.3→9.4 时以旧版本运行 schema-17 candidate 状态）。
- **性能类**：[#114067](https://github.com/openclaw/openclaw/issues/114067) — 配置含 `plugins` 键时 `openclaw --help` 从 ~36ms 劣化至 ~1274ms（约 35x），而输出字节完全相同。

### 今日已修复/已结案
- [#141474](https://github.com/openclaw/openclaw/issues/141474)：sessions_yield 死锁，随 v2026.11.5/11.6 发布。
- 会话恢复类四项修复随 v2026.11.7 发布。

---

## 6. 功能请求与路线图信号

### 高可能性进入下一版本（已有活跃 PR 或明确实现路径）
- **Claude web_search provider**：[#192632](https://github.com/openclaw/openclaw/issues/192632)（16 评论，diamond lobster）。诉求明确、接口对齐 Gemini/Perplexity 已有形态，属于低争议的 provider 扩展，适合纳入 2026.12 系列。
- **会话命名治理**：[#103067](https://github.com/openclaw/openclaw/issues/103067)（集中化 chat-session 命名 + 定义 subagent 会话生命周期）。已在 PR 侧出现碎片化实现：[#203872](https://github.com/openclaw/openclaw/pull/203872)（剥离 `Título:` 前缀）、[#164825](https://github.com/openclaw/openclaw/pull/164825)（Control UI 设置时选择名称）。**接近"先修表皮、后补模型"的状态**。
- **会话共享/筛选**：[#203063](https://github.com/openclaw/openclaw/pull/203063) 按 owner / involvement 过滤共享会话，已 ready for maintainer look。

### 中期候选（需产品决策）
- **Active Memory 可插拔升级提供方**：[#151178](https://github.com/openclaw/openclaw/issues/151178)（10 评论）。与今日已合并的 [#195859](https://github.com/openclaw/openclaw/pull/195859)（葡萄牙语“回顾早前对话”意图识别）方向互补，表明多语言记忆召回是正在被系统性补齐的短板。
- **后台 ACP 会话权限请求转为审批**：[#133709](https://github.com/openclaw/openclaw/issues/133709)，对安全边界有实质影响，需 security review。
- **第三方 WS channel 的传输鉴权解耦**：[#202441](https://github.com/openclaw/openclaw/issues/202441)，属插件生态基础设施。
- **Workboard 仪表盘 action verbs**：[#182463](https://github.com/openclaw/openclaw/issues/182463)，把 archive/move 从"发 prompt 给会话"变成结构化动作。

### 体验打磨类
- [#184803](https://github.com/openclaw/openclaw/issues/184803)：Talk 实时通话中关闭/替换语音任务回执。
- [#157614](https://github.com/openclaw/openclaw/issues/157614)：为 progress streaming 提供独立于命令文本的字符预算。
- [#167341](https://github.com/openclaw/openclaw/issues/167341)：允许运维覆盖模型请求失败的用户可见文案。
- [#203669](https://github.com/openclaw/openclaw/pull/203669)：Chat 常用控件预加载，降低首次打开延迟。

---

## 7. 用户反馈摘要

### 核心痛点（按出现频次排序）
1. **升级即风险**。多条长讨论（[#200606](https://github.com/openclaw/openclaw/issues/200606)、[#200224](https://github.com/openclaw/openclaw/issues/200224)、[#187917](https://github.com/openclaw/openclaw/issues/187917)、[#144739](https://github.com/openclaw/openclaw/issues/144739)、[#146860](https://github.com/openclaw/openclaw/issues/146860)）共同指向：用户不敢升级。Doctor 校验、插件迁移义务、退役配置项三者的交互缺乏一致语义。
2. **静默失败不可接受**。Telegram 死信（#125764）、Matrix consumer closed（#191476）、iOS 语音转写被 `hydrationSuppressed` 吞掉（#175167）、cron 静默回合失败（#164887）——用户的共同抱怨不是"失败"，而是"失败了但没人告诉我"。
3. **成本与延迟**。prompt cache 从不命中（#182891）是唯一一个被明确戴上"经济性"帽子的高优问题，其 26 条评论说明它已经影响到日常使用成本。
4. **记忆系统"看起来能用、实际不可靠"**。召回收割（#150635）、索引容量中止（#196505）、locale 相关 scopeHash（#201865）、`memory_search` 15s 超时（#128140）——四条独立症状，用户难以自行归因。
5. **多 agent 编排的可停止性**。`sessions_yield` / `wait_agent` / collector 语义反复出现（#141474 已修、#196199、#180941、#164887、#195397），用户心智模型要求"要么完成、要么明确失败"，不接受"永远 wait"。

### 使用场景特征
- 多 agent 规模化部署是主流场景：如 [#190307](https://github.com/openclaw/openclaw/issues/190307) 的 35 个配置 agent、单会话 113MB / 19.8k events、最大 SQLite 库 284MB。
- 跨平台混部普遍：Linux + Proxmox、macOS 26.6.1、Windows Scheduled Task、Linux/arm64、Podman Quadlets 均有出现。
- 自建与代理网络环境（Telegram via HTTP proxy）是常见部署形态。

### 正面信号
- 修复反馈闭环清晰。[#141474](https://github.com/openclaw/openclaw/issues/141474) 的结案评论明确列出修复 PR、落版版本、以及在 tag 与 main 上实际跑通的测试套件名，属于高标准的维护者沟通。
- stale 问题集中清理（今日至少 8 条 stale 类 Issue 结案），说明积压治理在进行中。

### 不满信号
- `needs-product-decision` 已成为长尾 Issues 的主要滞留原因，#150635（自 9-17）、#155563（自 9-22）、#125764（自 8-18）均已滞留在"技术方案清楚、等待裁决"状态超过两个月。

---

## 8. 待处理积压

### 长期未决的 P1（建议优先排期）
| Issue | 创建日 | 悬置时长 | 阻塞点 |
|---|---|---|---|
| [#125764](https://github.com/openclaw/openclaw/issues/125764) Telegram 单次失败即死信 | 2026-08-18 | ~97 天 | `needs-product-decision` |
| [#138972](https://github.com/openclaw/openclaw/issues/138972) Talk 会话变 Unknown | 2026-09-05 | ~79 天 | `needs-product-decision` |
| [#142116](https://github.com/openclaw/openclaw/issues/142116) 重启恢复卡死 Telegram lane | 2026-09-08 | ~76 天 | `needs-info` |
| [#153899](https://github.com/openclaw/openclaw/issues/153899) Gateway drain 耗满 TimeoutStopSec | 2026-09-20 | ~64 天 | `needs-maintainer-review` |
| [#155563](https://github.com/openclaw/openclaw/issues/155563) 子进程组未释放（回归） | 2026-09-22 | ~62 天 | `needs-product-decision` |
| [#166964](https://github.com/openclaw/openclaw/issues/166964) 子任务完成投递在权限撤销后永久失败 | 2026-10-08 | ~46 天 | `needs-maintainer-review` |
| [#196199](https://github.com/openclaw/openclaw/issues/196199) Codex helper 无法唤醒父会话 | 2026-11-09 | ~14 天 | 无 fix PR，P1 + 消息丢失 |

### 最老的未决讨论
- [#103067](https://github.com/openclaw/openclaw/issues/103067)（2026-07-09，11 评论）— 集中化 chat-session 命名与 subagent 会话生命周期。**已滞留 137 天**，但今日 PR 侧出现 #203872 / #164825 两处局部修复，说明该设计议题正在被"绕开"而非"解决"。
- [#114067](https://github.com/openclaw/openclaw/issues/114067)（2026-07-26，9 评论）— `openclaw --help` 因 `plugins` 键劣化 35x。

### 长期开放的 PR
- [#164825](https://github.com/openclaw/openclaw/pull/164825)（2026-10-04，XL，P3）— Control UI 设置时选择 profile 名称，已挂 `needs proof`。**已开放 50 天**。
- [#195859](https://github.com/openclaw/openclaw/pull/195859)（2026-11-09，XS，platinum hermit）— 葡萄牙语召回意图识别，ready for maintainer look 但未合入。
- [#202323](https://github.com/openclaw/openclaw/pull/202323)（2026-11-20）— Codex MCP 启动就绪可选，`needs proof`。
- [#196698](https://github.com/openclaw/openclaw/pull/196698)（2026-11-10）— 受保护 secret-store 覆盖继承 exec 值时给出告警，waiting on maintainer。
- [#203063](https://github.com/openclaw/openclaw/pull/203063)（2026-11-21，XL）— 共享会话按 owner/involvement 过滤，带 `merge-risk: compatibility`。

### 待合并池健康度提示
269 条待合并 PR 中，多条目带 `status: 👀 ready for maintainer look` 或 `⏳ waiting on maintainer` 而非等待作者返工，**瓶颈已从“作者响应”转移到“维护者裁决带宽”**。建议对大范围标签 PR（如 #203860 覆盖 30+ 子系统标签）建立分级评审通道，避免单条高风险依赖更新阻塞整条合并流水线。

---

*报告基于 2026-11-23 抓取的 GitHub 公开数据生成；部分 PR 评论数在数据源中标记为 `undefined`，故未纳入排序依据。*

---

## 横向生态对比

> 注：以下对比以 2026-11-23 各项目摘要为口径。DeepSeek Harness 未启用 Issues/PR，故以 Discussions 与 Release 对比；其余项目以 GitHub Issues/PR/Release 为主。

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正从“单点助手”转向“网关 + 插件 + 连接器 + 多智能体”的平台化竞争。高频迭代成为常态，但会话/记忆生命周期、权限凭据、静默失败与升级可靠性是跨项目共性瓶颈。社区贡献活跃，维护者评审与产品裁决带宽正成为比代码产出更稀缺的资源。项目分层明显：OpenClaw、Hermes、DeepSeek 走平台化，Zeroclaw、QwenPaw、AstrBot 分别聚焦安全、Console 与 IM 渠道，PicoClaw 处于低活跃维护期。

## 2. 各项目活跃度对比

| 项目 | Issues 数（24h） | PR 数（24h） | Release | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 394（活跃 319 / 关闭 75） | 500（合并/关闭 231 / 待合并 269） | 1 个：v2026.11.7 | 极高活跃；吞吐健康但待合并池偏大，P0 升级/平台问题拖累健康度，处于质量巩固期 |
| **Zeroclaw** | 15（活跃 13 / 关闭 2） | 50（待合并 46 / 合并关闭 4） | 0 | 高活跃、低吞吐；安全/凭据主线明确，评审带宽是瓶颈 |
| **PicoClaw** | 1（更新） | 1（关闭） | 0 | 低活跃；以积压清理为主，功能交付信号弱 |
| **QwenPaw** | 6 | 14（仅 1 关闭，13 待合并） | 0 | 中高活跃、低合并；工作重心高度集中于 Console 前端，评审瓶颈明显 |
| **Hermes-Agent** | 286（活跃 279 / 关闭 7） | 500（待合并 356 / 合并关闭 144） | 0 | 极高输入、中等消化；统一网关后回归与 `needs-decision` 积压是核心风险 |
| **AstrBot** | 7（活跃 6 / 关闭 1） | 43（待合并 41 / 合并关闭 2） | 0 | 活跃但合并吞吐低；IM 渠道稳定性风险与 review 积压并存 |
| **DeepSeek Harness** | N/A（Discussions 139） | N/A（未启用 PR 通道） | 2 个：v0.2.3-alpha.1 / alpha.2 | 高迭代、高功能密度；alpha 出现启动阻断，发布质量门禁风险突出 |

## 3. OpenClaw 在生态中的定位

**优势：规模与功能完整度领先。** OpenClaw 单日约 895 次仓库事件（394 Issues + 500 PR + 1 Release），在样本中最高；PR 合并/关闭 231 条，明显高于 Hermes 的 144 条，发布链路也最完整。其能力面覆盖 Gateway 会话恢复、记忆索引、多平台渠道、Web UI、多 agent 编排与插件/技能，属于“全栈型个人 AI 助手平台”。

**技术路线差异：Gateway 中心化 + 会话生命周期正确性。** OpenClaw 与 Hermes 都走统一网关路线，但 OpenClaw 更强调 Gateway 重启后的对话恢复、子任务结算与记忆索引一致性；Hermes 更强调 TUI/Desktop/API/bot/cron/Kanban 的多端统一与 RBAC；Zeroclaw 把重心放在凭据作用域与安全授权；DeepSeek 则偏向插件市场、代码审阅与企业连接器。OpenClaw 的差异化在于“会话/记忆/多 agent 编排”三条线耦合最深。

**社区规模对比：总量领先，单议题深度不及 Hermes。** OpenClaw 约 900 事件/日，Hermes 约 786，Zeroclaw 约 65，AstrBot 约 50，QwenPaw 约 20，PicoClaw 约 2；DeepSeek 为 139 条 Discussions + 2 个 Release。OpenClaw 最热 Issue 约 30 评论，Hermes 头部 Issue 达 85 评论，说明 OpenClaw 社区“面广、事件多”，Hermes 在单议题上讨论更深。

**定位判断：** OpenClaw 仍是生态核心参照，但已进入“功能最全、升级风险也最集中”的质量巩固阶段；P0 级 Windows 托管更新、macOS 启动凭据、MEMORY.md 注入缺失，以及 `needs-product-decision` 积压，是其当前主要减分项。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目与具体诉求 |
|---|---|
| **会话/记忆生命周期** | OpenClaw：召回条目被驱逐、`sessions_yield` 死锁、重启恢复；QwenPaw：Telegram topic 独立 session/memory；Hermes：profile/session 生命周期、会话删除/重命名冲突；DeepSeek：长会话 OOM、硬删除、跨会话记忆；Zeroclaw：memory backend 退役与迁移 |
| **权限、凭据与安全边界** | Zeroclaw：#12422 运维凭据作用域化，HTTP/SSH/OIDC 凭据纳入 vault grant；Hermes：#3897 按用户限制工具 RBAC；OpenClaw：secret-store 覆盖与 security review；DeepSeek：workspace-write 残留 Low integrity 标签；AstrBot：推理草稿泄漏到正文 |
| **静默失败与可观测性** | OpenClaw：Telegram 单次失败即 dead-letter、Matrix consumer closed；Zeroclaw：`/model` 谎报切换成功、skill creation 无日志；AstrBot：weixin_oc `ret:0` 但无 `message_id`；QwenPaw：压缩失败误导用户 `/clear`；DeepSeek：仅 reasoning 响应被判成功、JSON 损坏不重试；Hermes：cron 停留 `delivery_queued` |
| **升级与发布可靠性** | OpenClaw：Candidate Doctor 阻断升级、Git updater 半切换、macOS 资产回迁；Zeroclaw：Rust 工具链升级久拖、memory 破坏性 PR；DeepSeek：alpha 可安装但所有命令无法启动、Node 门槛提升；QwenPaw：provider 禁用后无回退；Hermes：matrix E2EE 构建中止整个 update；AstrBot：插件重启用竞态 |
| **长会话性能与上下文成本** | OpenClaw：prompt cache 从不复用、`memory_search` 15s 超时；DeepSeek：约 1GB 会话 OOM、`session_search` 30s 死锁；QwenPaw：iOS WebKit 长对话冻结、超宽内容裁切；Hermes：Windows 会话切换阻塞主进程、桌面重复渲染；AstrBot：上下文摘要失败时裁剪超限历史 |
| **多 agent / 自动化可靠性** | OpenClaw：子任务 yield、cron 单副本、后台 exec 唤醒；Hermes：`no_agent` cron 忽略 `terminal.backend`、owed-restart 无法清除；QwenPaw：审批卡片授权范围语义；Zeroclaw：delegate schema 静默丢弃未知参数；DeepSeek：工具调用错误默认可重试；AstrBot：cron/Scheduler trace 永久 running |
| **插件/provider/连接器生态** | OpenClaw：Claude `web_search` provider、`fs-safe` 升级；Zeroclaw：Gemini provider 现代化、ACP OIDC；PicoClaw：LLMTR OpenAI-compatible provider；QwenPaw：插件 CLI 与扩展点；Hermes：插件目录、RE2 迁移；AstrBot：Gitea 插件解析、原生视频输入；DeepSeek：Git 仓库插件源、7 个企业连接器 |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 全栈个人 AI 助手/多 agent 平台；会话恢复、记忆、多平台、Web UI | 高级个人用户、开发者、团队 | Gateway 中心化，强调会话生命周期、记忆索引与多 agent 编排 |
| **Zeroclaw** | 安全优先的 agent 运行时；凭据作用域、vault、mTLS/OIDC、SSH broker | 自托管、安全敏感团队 | 把凭据与授权作为一等模型，默认拒绝、按 origin/服务绑定 |
| **PicoClaw** | 轻量接入与 provider catalog；硬件/边缘友好 | Sipeed 生态、轻量用户 | 功能面较窄，当前以维护清理和 provider 扩展请求为主 |
| **QwenPaw** | Console 体验、本地模型引擎、渠道会话隔离 | 中文企业/内网、桌面用户 | AgentScope 生态，前端密集迭代，本地 llama.cpp/MLX 引擎栈推进 |
| **Hermes-Agent** | 统一网关 + 多端 + 团队协作；TUI/Desktop/API/bot/cron/Kanban | 团队共享 bot、多端重度用户 | 单 gateway 收敛多端，插件目录与 RBAC 是下一阶段重点 |
| **AstrBot** | IM 机器人框架/多消息平台适配 | QQ/微信/社区运营者 | 适配器架构，插件生态活跃，渠道稳定性是核心矛盾 |
| **DeepSeek Harness** | 插件平台 + 代码审阅 + 企业连接器 + 多智能体 | 开发者、企业团队 | Release-based、无 PR 通道，插件市场与连接器扩张最快 |

## 6. 社区热度与成熟度

**第一层：超高活跃，平台化竞争主力。**  
- **OpenClaw**：约 895 事件/日，发布节奏最完整，处于**质量巩固阶段**——功能最全，但升级路径、平台差异和 P0 问题需要收敛。  
- **Hermes-Agent**：约 786 事件/日，统一网关后进入**回归收敛与架构整合阶段**，输入远大于消化，`needs-decision` 积压明显。  
- **DeepSeek Harness**：139 Discussions + 2 Releases，处于**快速迭代/平台扩张阶段**，但 alpha 质量门禁弱，启动阻断问题直接影响信任。

**第二层：中高活跃，评审带宽成为瓶颈。**  
- **Zeroclaw**：65 事件/日、0 Release、4 条 PR 吞吐，处于**安全主线快速迭代期**，但 46 条待合并 PR 中多条 XL/high-risk。  
- **AstrBot**：50 事件/日、41 条待合并，处于**渠道稳定性巩固期**，QQ/微信适配器问题优先级高。  
- **QwenPaw**：20 事件/日、仅 1 条 PR 关闭，处于**Console 体验快速迭代期**，前端 PR 集中，P1 渲染缺陷需优先回流。

**第三层：低活跃，维护清理为主。**  
- **PicoClaw**：仅 1 条 Issue 更新、1 条 PR 关闭，处于**低活跃维护期**，长期积压 PR 关闭是正向信号，但功能与版本交付信号弱。

## 7. 值得关注的趋势信号

1. **安全从“配置项”升级为“可审计的授权契约”。** Zeroclaw 的 scoped credentials RFC、Hermes 的 per-user RBAC、OpenClaw 的 secret-store/security review、DeepSeek 的 workspace integrity 问题，均指向同一方向：默认拒绝、作用域绑定、凭据不暴露给模型、可审计。开发者应把授权模型前置设计，而非事后打补丁。

2. **“静默失败”正在成为 agent 可信度的头号杀手。** OpenClaw 的 Telegram dead-letter、Zeroclaw 的 `/model` 谎报、AstrBot 的 `ret:0` 假成功、QwenPaw 的误导性 `/clear`、DeepSeek 的仅 reasoning 判成功，共同说明：用户能接受失败，但不能接受“失败了却不知道”。明确失败语义、重试分类、用户可见错误，是 agent 工程化的基本要求。

3. **会话与记忆正成为一等基础设施。** OpenClaw 重启恢复、QwenPaw topic 级隔离、Hermes session lifecycle、DeepSeek 硬删除/跨会话记忆/OOM，说明“可恢复、可删除、可隔离、跨 locale 稳定”将成为记忆系统的标准能力。仅做召回而不做生命周期治理，会在规模化使用后集中暴露。

4. **发布工程质量正在成为开源项目的竞争力。** OpenClaw 的 macOS 资产回迁与 Git updater 自愈、DeepSeek alpha 启动阻断与 Node 门槛、Hermes matrix 更新中止、QwenPaw provider 回退缺失，均表明：灰度、回滚、迁移校验、依赖门禁与变更说明，和功能本身同等重要。

5. **插件与连接器平台化加速，但扩展点标准化不足。** DeepSeek 支持 Git 仓库插件源与 7 个企业连接器，Hermes 扩张 plugin catalog，QwenPaw 推进插件 CLI，AstrBot 请求 Gitea 插件解析，OpenClaw 扩展 provider。下一阶段竞争点不只是“有多少插件”，而是插件权限、生命周期、依赖与卸载回滚是否可控。

6. **维护者裁决带宽成为生态瓶颈。** OpenClaw 的 `needs-product-decision`、Hermes 的 `needs-decision`、Zeroclaw 的 XL PR 排队、QwenPaw 的 XXXL PR 滞留，说明社区并不缺贡献，缺的是 RFC 拆分、分级评审、自动 triage 与明确决策时限。对技术决策者的参考是：平台型 agent 项目需要把“评审与裁决流程”当作产品能力建设。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 · 2026-11-23

---

## 1. 今日速览

项目今日维持**高活跃、低吞吐**的状态：24 小时内 Issues 更新 15 条（新开/活跃 13、关闭 2），PR 更新 50 条（待合并 46、合并/关闭仅 4），无新版本发布。讨论焦点高度集中在**身份与访问安全**（identity-access）与**凭据管理**，最热议题 #12422 已积累 9 条评论。当日新增 3 个 S2 级 Bug（#12667、#12655，另 #12633 已随修复关闭），稳定性问题以"状态显示与实际行为不一致"类为主。整体健康度：**方向明确、贡献活跃，但评审吞吐成为瓶颈**——46 条待合并 PR 中多条为 size:XL / risk:high 的破坏性变更，已积压数日。

---

## 2. 版本发布

无新版本发布（过去 24 小时 Releases = 0）。

---

## 3. 项目进展

今日合并/关闭 4 条 PR、2 条 Issue，推进点如下：

- **[#12635] [CLOSED] fix(gateway/web): keep voice settings changed elsewhere when one is saved**
  https://github.com/zeroclaw-labs/zeroclaw/pull/12635
  修复 Web 语音设置屏保存整条记录、导致覆盖其他端并发修改的问题，对应 Issue #12633 同步关闭。

- **[#12656] [CLOSED] fix(deps): update url and ruma for RUSTSEC-2026-0588, -0589 and -0592**
  https://github.com/zeroclaw-labs/zeroclaw/pull/12656
  升级 `url` 至 2.5.9、`ruma` 至 0.17.2，修补 3 个 RustSec 安全公告，安全债得到清理。

- **[#12664] [CLOSED] docs(contributing): explain syncing a fork with upstream before branching**
  https://github.com/zeroclaw-labs/zeroclaw/pull/12664
  贡献者文档补充分叉同步流程。

- **[Issue #11679] [CLOSED] zerocode 通过 mTLS 平面获取并存储自身 bearer token（与 gateway 鉴权对齐）**
  https://github.com/zeroclaw-labs/zeroclaw/issues/11679
  长期议题（自 2026-10-12）关闭，远程 zerocode 接入流程从"运维在 daemon 主机 curl 换取 token"简化为"签发一次 code → `zerocode --connect`"，显著降低部署门槛。

**进度评估**：今日净推进以**安全补丁 + 文档治理 + 接入体验**为主，未有大型功能落地；多条 XL 级功能 PR（#12659 SSH 凭据、#12653 OIDC/ACP、#12408/#12490 HTTP 凭据）仍在评审队列中，为下一阶段的主要增量储备。

---

## 4. 社区热点

- **#12422 [OPEN] RFC: Scoped use of operator-managed service credentials**（9 评论，今日最热）
  https://github.com/zeroclaw-labs/zeroclaw/issues/12422
  议题核心：允许运维授权 agent 对某服务执行任务，但**不向模型、对话、技能文本或生成内容暴露底层凭据**。这直接命中了 agent 类产品的最大信任缺口——"让 agent 用得上、但看不到密钥"。9 条评论说明设计取舍（授权粒度、作用域、与现有 vault/grant 模型的关系）仍在激辩中。

- **#11679 [CLOSED] zerocode bearer over mTLS plane**（3 评论）
  https://github.com/zeroclaw-labs/zeroclaw/issues/11679
  讨论围绕"远程节点自举鉴权"的极简化，随关闭落地。

- **#12669 [OPEN] [Tracker] Gemini provider modernization: Antigravity CLI provider, Gemini CLI 与 Code Assist OAuth 退役**
  https://github.com/zeroclaw-labs/zeroclaw/issues/12669 （当日新开）
  因 Google 已下线 Gemini CLI / Code Assist 消费级 OAuth，项目需迁移至 API Key、Vertex/Agent Platform、Gemini Enterprise 等受支持路径。属于**外部依赖倒逼的路线图级事项**。

**诉求分析**：社区热度从"功能多寡"转向"权限边界是否可证明"——RFC、凭据作用域、OAuth 退役三者共同指向同一件事：ZeroClaw 正在把安全模型从"配置项"升级为"可审计的授权契约"。

---

## 5. Bug 与稳定性

按严重程度排列（S2 = 降级行为，S3 = 轻微）：

| 严重度 | Issue | 问题 | 修复状态 |
|---|---|---|---|
| **S2** | [#12667](https://github.com/zeroclaw-labs/zeroclaw/issues/12667) | `/model <id>` 回复"Model switched"且 `/model` 显示新 id，但后续请求仍使用 profile 配置的模型 | 暂无 fix PR，属**状态谎报**类，影响可信度 |
| **S2** | [#12655](https://github.com/zeroclaw-labs/zeroclaw/issues/12655) | `[skills.skill_creation] enabled = true` 完全不生效：extractor 期望 OpenAI function 包装，history 存的是扁平 tool call，输出还写向 `data/skills`；**且无任何日志** | 无 fix PR，静默失败最难定位 |
| **S2** | [#12633](https://github.com/zeroclaw-labs/zeroclaw/issues/12633) | 未刷新的语音设置屏会把设备切回浏览器识别 | ✅ 已关闭，fix PR [#12635](https://github.com/zeroclaw-labs/zeroclaw/pull/12635) 已关闭 |
| S3 | [#12666](https://github.com/zeroclaw-labs/zeroclaw/issues/12666) | `delegate` schema 声明 `additionalProperties: false`，却接受并静默丢弃未知参数 | 无 |
| S3 | [#12661](https://github.com/zeroclaw-labs/zeroclaw/issues/12661) | Dashboard 登录页"Generate"配对码按钮必然 403（`POST /admin/paircode/new` 不可达） | 无 |
| S3 | [#12660](https://github.com/zeroclaw-labs/zeroclaw/issues/12660) | Agent 卡片"this month"实为 all-time 支出 | 无 |
| — | [#12665](https://github.com/zeroclaw-labs/zeroclaw/issues/12665) | 从损坏 envelope 恢复的 tool result 仍缺 `name`，Groq 重放失败 | 依赖 #12188 先落地，暂不可行动 |
| — | [#12649](https://github.com/zeroclaw-labs/zeroclaw/issues/12649) | 频道不存在时，频道路由工具仍被注册并进入审批门控（如未装 Telegram 仍编译 `git_forge`） | 无 |

**观察**：今日 Bug 的共同模式是**"宣称与实况脱节"**——切换无效、开关无效、统计口径错误、按钮永远 403、参数静默丢弃、失败无日志。这类问题单点不致命，但会系统性侵蚀用户对 agent 状态机的信任，建议维护者以"静默失败必须报错"为原则统一收敛。

---

## 6. 功能请求与路线图信号

| 需求 | 议题 | 关联 PR / 判断 |
|---|---|---|
| 有界 agentic delegate 应用自身 thinking level | [#12668](https://github.com/zeroclaw-labs/zeroclaw/issues/12668) | 与 delegate 工具族（#12666）联动，改动面小，**较可能近期纳入** |
| zsh 语法级命令检查（原生 runtime spawnzsh 时） | [#12296](https://github.com/zeroclaw-labs/zeroclaw/issues/12296) | 延续 #11822 命令策略工作，属安全策略线，**中期可见** |
| Gemini provider 现代化（Antigravity CLI、OAuth 退役） | [#12669](https://github.com/zeroclaw-labs/zeroclaw/issues/12669) | Tracker 性质，**已进入路线图**，但涉及 provider 层重写 |
| 移除不可达的 Raspberry Pi LED 工具 | [#12662](https://github.com/zeroclaw-labs/zeroclaw/issues/12662) | 纯删代码，低风险，**易于近期合入** |
| 原生 SSH broker 达成 parity 后退役 Python helper | [#12518](https://github.com/zeroclaw-labs/zeroclaw/issues/12518) | 被 #12438 阻塞（status:blocked），已在 [#12659](https://github.com/zeroclaw-labs/zeroclaw/pull/12659) 推进 |

**路线图信号**：结合在途 PR 可清晰看出下一版本主线是**"受控凭据 + 细粒度身份"**：
- [#12408](https://github.com/zeroclaw-labs/zeroclaw/pull/12408) 作用域 HTTP Basic/Bearer/X-API-Key 凭据目录（默认拒绝、按 origin 绑定）
- [#12490](https://github.com/zeroclaw-labs/zeroclaw/pull/12490) 支持 `Authorization: Token`（DefectDojo 场景）
- [#12402](https://github.com/zeroclaw-labs/zeroclaw/pull/12402) 插件 TLS 凭据写-only 面板
- [#12659](https://github.com/zeroclaw-labs/zeroclaw/pull/12659) SSH 密码与 PAM TOTP 认证纳入 vault grant 作用域
- [#12653](https://github.com/zeroclaw-labs/zeroclaw/pull/12653) 为 `/acp` 增加 OIDC 鉴权、principal 作用域与 turn 重连回放

同时存在明显**收缩动作**（破坏性变更，需留意迁移）：
- [#12612](https://github.com/zeroclaw-labs/zeroclaw/pull/12612) `feat(memory)!` 退役本地 LLM 响应缓存（命中条件过严，几乎从不生效）
- [#12521](https://github.com/zeroclaw-labs/zeroclaw/pull/12521) `feat(memory)!` 退役 Lucid memory backend（含 CLI、ZeroCode、gateway 存储选择器）

---

## 7. 用户反馈摘要

- **"看不见的失败"最伤人**：#12655 报告者明确指出 skill creation 既不生效也**不打日志**；#12666 抱怨未知参数被静默丢弃。用户愿意排查，但需要系统主动报错。
- **CLI 状态不可信**：#12667 的"回复切换成功、实际没切"被重复强调（`/model` 二次确认仍显示新 id），说明用户高度依赖 CLI 自述状态，一旦失真破坏力放大。
- **macOS 默认 shell 体验缺口**：#12296 指出在 macOS 上 spawn zsh 时仍套用 POSIX 通用规则，用户希望命令策略能识别真实 shell 语法，减少误拒/误放。
- **仪表盘数据可信度**：#12660 指出"本月支出"实为全时段，用户做成本归因决策时会被误导。
- **自托管接入仍繁琐**：#11679 背后是真实场景痛点——"运维要去 daemon 主机 curl 换 token"，这正是它被关闭后值得写入发布说明的原因。
- **跨设备状态一致性**：#12633 反映多端同时编辑设置时的丢失更新，用户对"我在另一处改的配置被悄悄回滚"敏感。

满意度侧：多个 XL 级安全 PR 的说明详尽（作用域、默认拒绝、origin 变更即清空授权），社区对这套"显式授权"设计反馈积极，#12422 的长讨论本身即是建设性信号。

---

## 8. 待处理积压

**长期开放、需重点关注的 Issue：**
- [#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) RFC（11-14 创建，9 评论，已持续 9 天）——最热议题但尚无结论型 PR，建议明确决策时限。
- [#12296](https://github.com/zeroclaw-labs/zeroclaw/issues/12296)（11-08 创建，**0 评论**）——zsh 命令策略，已挂起 15 天无回应。
- [#12518](https://github.com/zeroclaw-labs/zeroclaw/issues/12518)（11-17，`status:blocked`）——被 #12438 阻塞，需确认依赖进度。

**长期开放、体量大风险高的 PR：**
- [#11634](https://github.com/zeroclaw-labs/zeroclaw/pull/11634) Rust 1.100.0 工具链升级（**10-09 起，45 天**）——影响全部构建面，久拖会放大冲突成本。
- [#11646](https://github.com/zeroclaw-labs/zeroclaw/pull/11646) macOS null 别名测试隔离（10-10 起）
- [#12265](https://github.com/zeroclaw-labs/zeroclaw/pull/12265)（11-06 起）与 [#12563](https://github.com/zeroclaw-labs/zeroclaw/pull/12563)、[#12566](https://github.com/zeroclaw-labs/zeroclaw/pull/12566)[#12265] 一组 **ADR-016 placement exception 文档 PR**——治理流程本身正在产生评审排队，建议合并批量处理。
- [#12402](https://github.com/zeroclaw-labs/zeroclaw/pull/12402)、[#12408](https://github.com/zeroclaw-labs/zeroclaw/pull/12408)、[#12490](https://github.com/zeroclaw-labs/zeroclaw/pull/12490)（均 11-12～11-16，size:XL、risk:high）——同属凭据管理主线，宜协同评审避免长期偏离。
- [#12459](https://github.com/zeroclaw-labs/zeroclaw/pull/12459) 标记 `do-not-merge`（11-15 起），需确认是被替代还是待解阻。

**维护者建议**：46 条待合并 PR / 24 小时 4 条吞吐，评审带宽已明显吃紧。优先处理 ① 3 条 S2 Bug（#12667、#12655 + 已有修复的 #12633 收尾）② 45 天未动的工具链升级 #11634 ③ 把 ADR-016 例外类文档 PR 合批，可快速降低队列噪音。

---

*数据来源：github.com/zeroclaw-labs/zeroclaw · 统计窗口 2026-11-22 → 2026-11-23*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报  
**日期：2026-11-23（统计窗口：过去24小时）**  
数据来源：GitHub 公开数据摘要

## 1. 今日速览

过去24小时，PicoClaw 整体活跃度**偏低**：仅 1 条 Issue 更新、1 条 PR 关闭，无新版本发布。维护侧的主要动作是关闭长期挂起的聚合修复 PR [#1555](https://github.com/sipeed/picoclaw/pull/1555)，对积压清理有正向意义。社区侧唯一活跃讨论为 OpenAI 兼容 provider 功能请求 [#3470](https://github.com/sipeed/picoclaw/issues/3470)，评论数 2，尚未形成明确开发排期。综合看，项目今日处于**低活跃、维护清理为主**的状态，健康度中性偏稳，但新增功能和版本交付信号较弱。

## 2. 版本发布

过去24小时**无新版本发布**，无 Release 数据，故无更新内容、破坏性变更或迁移注意事项可说明。

## 3. 项目进展

今日合并/关闭的重要 PR 为：

- [#1555 [CLOSED] fix: merge PR #1390 #1389 #1383 #1381](https://github.com/sipeed/picoclaw/pull/1555)  
  作者：@xuwei-xy；创建于 2026-03-14，更新/关闭于 2026-11-22。  
  该 PR 摘要显示其用于合并来自 #1390、#1389、#1383、#1381 的修复。由于数据未提供具体 diff 和合并方式，无法确认各修复细节；按概览数据计入“已合并/关闭”1 条。  
  **推进意义**：主要是清理长期积压的聚合修复 PR，可能对若干历史修复起到收口作用。对项目整体功能向前推进有限，但对维护队列健康度有正向贡献。

## 4. 社区热点

今日讨论最活跃的条目为：

- [#3470 [OPEN] [Feature] Add LLMTR as an OpenAI-compatible provider](https://github.com/sipeed/picoclaw/issues/3470)  
  作者：@knowhycodata；创建于 2026-11-14，更新于 2026-11-22；评论 2；👍 0。  
  **诉求分析**：用户希望 PicoClaw 在模型目录中内置名为 `llmtr` 的 provider。LLMTR 提供 OpenAI 兼容网关 `https://llmtr.com/v1`，用户当前已可通过自定义 OpenAI-compatible endpoint 接入，但希望获得官方命名 provider，以降低配置成本、提升模型目录可发现性和开箱即用体验。  
  **信号**：这反映出社区对“多 provider 目录化”和“OpenAI 兼容网关快速接入”的需求。当前讨论量较小，尚未出现关联 PR，短期落地确定性有限。

- [#1555 [CLOSED] fix: merge PR #1390 #1389 #1383 #1381](https://github.com/sipeed/picoclaw/pull/1555)  
  评论数据为 `undefined`，无法判断讨论热度；但其创建至关闭跨度约 8 个月，属于长期积压 PR，关闭动作本身值得关注。

## 5. Bug 与稳定性

过去24小时**无新报告的 Bug、崩溃或回归问题**。  
今日关闭的 [#1555](https://github.com/sipeed/picoclaw/pull/1555) 为修复聚合 PR，摘要提及合并多个修复 PR，但未提供具体 Bug 列表、严重程度或关联 fix PR 细节，因此无法按严重程度排列。  
**稳定性判断**：今日无新增稳定性风险信号；历史修复收口对稳定性略偏正向，但需后续 release/变更日志确认实际影响。

## 6. 功能请求与路线图信号

- [#3470 [OPEN] [Feature] Add LLMTR as an OpenAI-compatible provider](https://github.com/sipeed/picoclaw/issues/3470)  
  用户请求新增 `llmtr` 命名 provider。该需求实现路径相对清晰：LLMTR 已提供 OpenAI 兼容接口，理论上可复用现有 OpenAI-compatible 接入能力。  
  **纳入下一版本的可能性**：中等偏低。原因包括：Issue 仍为 OPEN、仅 2 条评论、无关联 PR；但实现成本可能较低，若维护者希望扩展 provider catalog，可作为候选。当前数据不足以判断已进入路线图。

今日无其他新功能请求。

## 7. 用户反馈摘要

从 [#3470](https://github.com/sipeed/picoclaw/issues/3470) 可提炼：

- **真实痛点**：用户不想仅为某个 OpenAI 兼容网关手动维护自定义 endpoint，希望官方目录直接提供命名 provider。
- **使用场景**：通过一个 API key 访问 LLMTR 目录中的多个模型，适合多模型聚合/网关型使用方式。
- **满意点**：PicoClaw 已支持自定义 OpenAI-compatible endpoint，用户目前有可用替代方案。
- **不满意点**：缺少内置 `llmtr` provider，配置便利性和目录可发现性不足。  
  Issue 评论内容未提供，无法进一步提炼正负面情绪；PR #1555 评论数据缺失，暂不纳入用户反馈判断。

## 8. 待处理积压

- [#1555 [CLOSED] fix: merge PR #1390 #1389 #1383 #1381](https://github.com/sipeed/picoclaw/pull/1555)  
  创建于 2026-03-14，关闭于 2026-11-22，挂起约 8 个月。虽已关闭，但反映出聚合修复 PR 长期滞留的积压问题，建议维护者在关闭说明中明确各子 PR 的处理结果，避免后续追踪困难。

- [#3470 [OPEN] [Feature] Add LLMTR as an OpenAI-compatible provider](https://github.com/sipeed/picoclaw/issues/3470)  
  创建于 2026-11-14，更新于 2026-11-22，评论 2，仍为 OPEN。该 Issue 属于可直接评估的 provider 扩展请求，建议维护者给出接受/拒绝/延期结论，并说明是否纳入 provider catalog 路线图。

---

**健康度结论**：今日 PicoClaw 无版本交付，社区新增讨论有限，活跃度低；正向信号是长期积压 PR 得到关闭，维护队列有所清理。后续需关注 [#3470](https://github.com/sipeed/picoclaw/issues/3470) 是否获得维护者明确回应，以及 [#1555](https://github.com/sipeed/picoclaw/pull/1555) 关闭后是否伴随变更日志或 release 落地。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目日报 · 2026-11-23

> 数据窗口：2026-11-22 → 2026-11-23（UTC），数据源：GitHub `agentscope-ai/QwenPaw`

---

## 1. 今日速览

- **整体活跃度中等偏高，但合并吞吐偏低**：24 小时内产生 14 条 PR 动线（新开/活跃）与 6 条 Issue 动线，但仅有 1 条 PR 进入关闭状态，0 条新版本发布，主干代码净增量有限。
- **工作重心高度集中于 Console 前端体验**：14 条 PR 中至少 6 条直接涉及 Console（交互确认、历史分页、键盘可达性、base-path 部署、本地引擎控制页），6 条 Issue 中 4 条为 Console 渲染/交互缺陷。
- **社区呈"强贡献、弱共识"结构**：今日全部 Issue 的 👍 数均为 0，但多条 Issue 在 24 小时内即获得对应 Fix PR（#8848→#8853、#8844→#8854、#8827→#8857），说明维护者与核心贡献者响应迅速、闭环意愿明确。
- **评审带宽是当前首要瓶颈**：13 条 PR 长期待合并，其中 3 条为 `size/XXXL` 级、2 条为 `size/XXL` 级，最大一条（#8554）已滞留 20 天，形成"高产出、低消化"的队列压力。
- **健康度判断**：功能演进信号健康（本地模型引擎栈、插件扩展点、渠道会话隔离均在推进），但存在 1 个长达 237 天未闭环的渠道类 Issue（#2674），需关注。

---

## 3. 项目进展

今日唯一进入关闭状态的 PR 为 **#8791**，其余 13 条仍在评审队列中。实质性主干推进有限，但完成了 1 项重要交互修复的收尾与重做。

| 状态 | PR | 规模 | 内容 | 链接 |
|---|---|---|---|---|
| **已关闭** | #8791 | XXL | 修正审批卡片（Approval Card）的授权范围语义：此前 session 级规则被误标为 "Just Once"，session 泛化规则被误标为 "Always Allow"；同时修复提交失败/过期时上下文丢失与误导性反馈 | [#8791](https://github.com/agentscope-ai/QwenPaw/pull/8791) |
| **新开（替代/扩展）** | #8859 | XXXL | 重做 Console 全站确认弹窗、审批卡片与破坏性操作交互，解决"泛化文案掩盖授权对象"与"过早报告成功、展示过期状态、丢失上下文"两类问题 | [#8859](https://github.com/agentscope-ai/QwenPaw/pull/8859) |

**推进幅度评估**：`#8791 → #8859` 属于同一维护者（@zhaozhuang521）的迭代重做，可视为审批交互方向的范围扩大而非净新增；今日**没有功能性新代码进入主干**，项目向前推进约 0.5 个单位（以 PR 关闭计）。真正的增量集中在队列侧——今日新增 #8859、#8858 两条 PR，覆盖确认交互与历史分页两个体验缺口。

**今日 PR 主题分布**（说明项目当前资源投向）：

- **Console / 前端（6 条）**：#8859、#8858、#8854、#8719、#8648
- **本地模型引擎栈（3 条，同一依赖链）**：#8649 → #8647 → #8648
- **渠道（1 条）**：#8857（Telegram 论坛主题会话隔离）
- **插件 / 扩展体系（1 条）**：#8554（插件 CLI 命令与扩展点）
- **Agent 核心 / 记忆（3 条）**：#8853、#8588、#8617
- **测试与 CI（1 条）**：#8855（Windows 时序与编码兼容）

---

## 4. 社区热点

今日讨论热度整体偏低（最高 3 条评论，零点赞），议题集中在 Console 可用性。

| 排名 | 条目 | 评论 | 核心诉求 | 链接 |
|---|---|---|---|---|
| 1 | #2674 `[question]` 微信功能不完善 | 3 | 渠道完整度 + 排障可观测性 | [#2674](https://github.com/agentscope-ai/QwenPaw/issues/2674) |
| 2 | #8827 `[enhancement]` Telegram 论坛主题会话隔离 | 2 | 多租户/多人协作场景下的会话与记忆隔离 | [#8827](https://github.com/agentscope-ai/QwenPaw/issues/8827) |
| 3 | #8852 `[Bug]` iOS WebKit 长对话冻结 | 2 | 移动端/长上下文场景的性能天花板 | [#8852](https://github.com/agentscope-ai/QwenPaw/issues/8852) |
| 4 | #8844 Console 消息列表不可键盘聚焦 | 2 | 无障碍（a11y）与无鼠标环境可用性 | [#8844](https://github.com/agentscope-ai/QwenPaw/issues/8844) |
| 5 | #8848 压缩失败提示易误导 | 2 | 错误恢复路径的安全性设计 | [#8848](https://github.com/agentscope-ai/QwenPaw/issues/8848) |

**背后信号分析**：

1. **平台化诉求上升**。#8827 要求 Telegram 论坛内每个 topic 拥有独立 session / memory / Console 会话，反映出用户已把 QwenPaw 当作**多人共享的 agent 平台**而非个人助手，而非仅单人使用。该诉求在 3 天内即由同一作者提交实现 PR（#8857），闭环意愿强。
2. **专业用户占比高**。#8852、#8844、#8848 的 issue 正文均包含版本号、commit hash、源码文件与行号（如 `command_handler.py` 第 476–479 行）、根因假设（`UserMessageAnchors` 布局抖动、`content-visibility:auto`、`column-reverse` 列表），说明反馈来自深度使用者甚至贡献者。
3. **讨论多、点赞少**暗示社区规模仍小、以核心圈层驱动，尚未形成大规模用户投票式需求信号。

---

## 5. Bug 与稳定性

按严重程度排列（P1 = 功能不可用 / 数据风险；P2 = 体验受损；P3 = 边界问题）：

| 级别 | 问题 | 影响面 | 状态 | Fix PR |
|---|---|---|---|---|
| **P1** | **#8852** iOS WebKit 长对话下 Console 完全冻结 | 全平台 Console 主界面；`v2.3.0.post1`；根因为 `UserMessageAnchors` 布局抖动 + `content-visibility:auto` 在 `column-reverse` 列表中的组合效应 | **无修复 PR，需优先处理** | ❌ |
| **P1** | **#8856** 助手回复中超宽内容（表格/长行）被直接裁切、无横向滚动 | Console 消息渲染链；实测 `AssistantMarkdown-*.js` 中不存在 `overflow-x-auto`，Markdown 表格未包裹滚动容器 | **无修复 PR** | ❌ |
| **P2** | **#8848** 压缩失败时提示 `/clear`，易致上下文丢失 | `command_handler.py` 的 `_process_compact` 失败分支；属"误导性恢复建议"型数据风险 | 已闭环待合并 | ✅ [#8853](https://github.com/agentscope-ai/QwenPaw/pull/8853) |
| **P2** | **#8844** 消息列表不可键盘聚焦，方向键/PageUp/PageDown 无效 | Console 聊天空状态；无鼠标设备上聊天不可用（a11y 缺陷） | 已闭环待合并 | ✅ [#8854](https://github.com/agentscope-ai/QwenPaw/pull/8854) |
| **P2** | **#2674** 微信渠道多问题：无输入中提示、无法拉群、UI 输入报 `503 {"detail":"Channel Console not found"}`、PC 微信无 bot 出现 | 微信渠道可用性 + 跨端状态同步 | **静置 237 天，仍 OPEN** | ❌ |
| **P2** | **#8617** 保存的模型 provider 被禁用后无回退，导致渠道运行全部失败 | `agent.json` 保留旧的 `active_model`；`create_model_and_formatter` 直接抛 `ProviderError` | 待合并 16 天 | ✅ [#8617](https://github.com/agentscope-ai/QwenPaw/pull/8617) |
| **P3** | **#8855** Plugin SDK 测试在 Windows 下时序/编码不稳定 | CI 稳定性、Windows 贡献者体验 | 待合并 | ✅ [#8855](https://github.com/agentscope-ai/QwenPaw/pull/8855) |

**稳定性小结**：今日两例 P1 全部集中在 **Console 渲染层**，与近期密集的前端 PR 形成风险叠加——建议在合并 #8858（历史分页）与 #8859（确认交互）前，先回流 #8852 与 #8856 的修复，避免长对话渲染路径继续累积复杂度。

---

## 6. 功能请求与路线图信号

| 需求 | 信号强度 | 落地判断 | 链接 |
|---|---|---|---|
| **Telegram 论坛主题级会话隔离** —— 每个 topic 独立 session / memory / Console 会话，解决"所有 topic 共享同一 agent 记忆、且回复路由错乱" | 🔴 强（Issue + 同作者 PR 同日成立） | **高概率进入下一版本**。PR #8857 为 `size/S`、标记 `first-time-contributor`，改动面窄且语义清晰，是最可能先合入的功能项 | [#8827](https://github.com/agentscope-ai/QwenPaw/issues/8827) / [#8857](https://github.com/agentscope-ai/QwenPaw/pull/8857) |
| **本地模型引擎栈** —— llama.cpp GPU 控制 + 托管 MLX 引擎 + Console 侧 GPU/自动更新面板，三 PR 严格按 #8649 → #8647 → #8648 顺序合并 | 🟠 中强（功能完整、规模大、已停滞 14 天） | **需维护者明确合并节奏**。三 PR 合计 XXXL 级，一旦串行合入将形成本季度最大功能块；建议优先 review 作为基座的 #8649 | [#8649](https://github.com/agentscope-ai/QwenPaw/pull/8649) / [#8647](https://github.com/agentscope-ai/QwenPaw/pull/8647) / [#8648](https://github.com/agentscope-ai/QwenPaw/pull/8648) |
| **插件 CLI 命令与扩展点** —— 通过 `ctx.register_cli(CliSpec(...))` 注册根命令/嵌套命令/Click group，并接入插件注册表、依赖检查与资源生命周期 | 🟠 中（`size/XXXL`，已停滞 20 天） | 属**生态级基础设施**，建议先提供 RFC 或分阶段合并，否则单 PR 难以 review | [#8554](https://github.com/agentscope-ai/QwenPaw/pull/8554) |
| **运行时 base-path 部署** —— 新增 `QWENPAW_BASE_PATH`，支持反代前缀部署 | 🟢 中（已 `Under Review`） | 面向企业自建/内网场景，评审中，近期可能合入 | [#8719](https://github.com/agentscope-ai/QwenPaw/pull/8719) |
| **微信渠道能力补齐** —— 输入中状态提示、群聊加入、Console 与微信 session 双向同步 | 🟡 弱势但长期存在 | **无对应 PR，路线图信号缺失**。作为国内主流渠道，8 个月未闭环值得单独立项 | [#2674](https://github.com/agentscope-ai/QwenPaw/issues/2674) |

---

## 7. 用户反馈摘要

**真实使用场景**

- **企业内网/受限网络部署**：#8719 的 base-path 需求与 #8856 的 Chrome + macOS Apple Silicon 环境报告，说明存在自建反代 + 桌面浏览器的正式办公场景。
- **无鼠标/键盘优先环境**：#8844 明确提出"在无鼠标的机器上聊天不可用"，指向服务器运维、远程终端等场景。
- **移动端长会话**：#8852 用户在 iOS Safari 上携带"substantial context"继续对话，说明用户把 QwenPaw 用于**长期、连续、上下文密集**的工作流，而非一次性问答。
- **多人共享 agent**：#8827 的 Telegram 论坛场景本质是"一个群内多个话题 = 多个独立工作线程"。

**痛点提炼**

1. **反馈缺失导致不确定感**（#2674）："没有敲击键盘的提示，不知道它是否在干活"——缺少 typing indicator / 处理中状态，是最伤信任的体验缺口。
2. **跨端不一致**（#2674）：同一 session 从 UI 输入报 `503 Channel Console not found`，说明渠道与 Console 的 session 寻址尚未统一。
3. **错误提示引导用户走向更坏的结果**（#8848）：失败路径给出 `/clear` 建议，用户主动质疑"容易误导用户清除上下文导致信息丢失"——这是**对产品安全设计的正面质询**，值得作为错误文案规范化的样本。
4. **内容不可见即内容丢失**（#8856）：表格被裁切且无滚动，用户实际拿到的是不完整答案。
5. **满意度侧写**：用户普遍采用"先肯定再提问"的表述（#2674 结尾"不知以上是我设置不对还是 copaw 本身问题"、#8848 引用官方设计意图后再质疑），说明**整体信任度与参与意愿较高**，负面情绪主要集中在渠道完整度与渲染细节上。

---

## 8. 待处理积压（维护者关注清单）

按滞留时长排序：

| 滞留 | 条目 | 规模/类型 | 风险 | 链接 |
|---|---|---|---|---|
| **237 天** | #2674 微信功能不完善 | Issue / question | 🔴 最高优先级积压。国内主流渠道，跨版本长期未闭环，且无关联 PR。建议至少给出官方排障指引或拆分为独立子任务 | [#2674](https://github.com/agentscope-ai/QwenPaw/issues/2674) |
| **20 天** | #8554 插件 CLI 命令与扩展点 | PR / XXXL | 🔴 单 PR 体量过大难以评审，建议拆分为 CLI 注册 / 注册表接入 / 生命周期管理三阶段 | [#8554](https://github.com/agentscope-ai/QwenPaw/pull/8554) |
| **18 天** | #8588 OpenViking 后续清理、兼容性与关停修复 | PR / XXL / Under Review | 🟠 标记 Under Review 但已 18 天无进展，属 #7613 的收尾工作，久拖易产生冲突 | [#8588](https://github.com/agentscope-ai/QwenPaw/pull/8588) |
| **16 天** | #8617 provider 禁用后无回退 | PR / M | 🟠 修复的是"渠道全线失败"类故障，性价比高，建议尽快合并 | [#8617](https://github.com/agentscope-ai/QwenPaw/pull/8617) |
| **14 天** | #8649 / #8647 / #8648 本地模型引擎栈 | PR / L + XXL + XL | 🟠 依赖链阻塞，只要 #8649 未动，后两者无法推进，实际阻塞 3 条 PR | [#8649](https://github.com/agentscope-ai/QwenPaw/pull/8649) |
| **10 天** | #8719 运行时 base-path 部署 | PR / XXL / Under Review | 🟡 已有 Under Review 标记，建议给出预计合并窗口 | [#8719](https://github.com/agentscope-ai/QwenPaw/pull/8719) |
| **6 天** | #8791 审批卡片交互（已于今日关闭） | PR / XXL | ✅ 已由 #8859 接续，闭环处理得当 | [#8791](https://github.com/agentscope-ai/QwenPaw/pull/8791) |

**建议的三项运维动作**

1. **设立"P1 渲染缺陷"快速通道**：#8852 与 #8856 均为 Console 渲染层缺陷且当前无 PR，建议指定 owner 并在 7 天内出修复方案。
2. **推动 #8649 破冰**：这是解锁 3 条 PR、约 4 万行量级功能块的唯一钥匙。
3. **对 #2674 给出正式回应**：即使短期不修复，也应同步微信渠道的支持边界与已知限制，降低新用户试错成本。

---

*报告生成时间：2026-11-23 · 数据完整性说明：PR 评论数在原始数据中标记为 `undefined`，故未纳入活跃度加权计算。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes-Agent 项目动态日报

**日期：2026-11-23** · 数据窗口：过去 24 小时 · 仓库：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日速览

- **活跃度处于极高水平，但呈"输入远大于消化"的结构**：Issues 更新 286 条（新开/活跃 279、关闭 7，关闭率约 2.4%）；PR 更新 500 条（待合并 356、已合并/关闭 144，处理率约 28.8%）。
- **无新版本发布**，项目处于持续集成/修复周期，而非发布周期。
- 讨论热度高度集中在**统一网关（Unified Gateway）#106742 合并后的遗留问题**上（[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)，85 条评论），该主线已扩散为多个 gateway/session 相关 P2 缺陷。
- **P1 级问题仍有两处开放**（Discord 线程类型错误、matrix E2EE 阻断更新），均已进入社区视野但尚未在展示数据中看到对应 fix PR。
- 整体健康度评估：**社区贡献活跃、架构演进明确（RE2 迁移、插件目录扩张），但维护侧评审与决策带宽是当前最大瓶颈**——大量新 PR 评论数为 0，且多个 `needs-decision` 标签的 P2 Issue 已挂起数月。

---

## 2. 版本发布

**无。** 当日 Releases 为空，无破坏性变更或迁移注意事项需要披露。

---

## 3. 项目进展

今日展示的 20 条 PR 中，仅有 2 条为已关闭/合并状态，其余 18 条均为 OPEN 且多数无评论——说明大量 PR 处于"刚提交、待评审"阶段。已处理的两条：

- **[#116091 [CLOSED] fix(skills): compare guard findings against pre-write baseline](https://github.com/NousResearch/hermes-agent/pull/116091)** — 修复 `skills.guard_agent_created=true` 因既有 skill 中的历史遗留 critical 启发式发现而误拒无关安全更新的问题，将比较基准改为"写入前后差异"，且仅对 `ask`（`allowed is None`）判决生效。属于技能安全守卫的精准化改进。
- **[#151806 [CLOSED] Catalog CI no longer flags plugins bundling ajv as self-updaters](https://github.com/NousResearch/hermes-agent/pull/151806)** — 修复插件目录 CI 将打包 `ajv` 的插件误判为"自更新器"的假阳性（ajv bundle 内含一个从不下载的 GitHub schema URL）。解除了社区插件上架的一类阻塞。

**整体推进评估**：当日可见的合入集中在"误报/边界条件"修复，而非核心功能落地；144 条已合并/关闭的 PR 中，展示样本有限，无法确认大规模功能推进。项目向前迈进的幅度以**稳定性收敛和插件生态清理**为主。

---

## 4. 社区热点

按评论数排序的 Top 5：

| 排名 | 条目 | 评论 | 标签 | 诉求分析 |
|---|---|---|---|---|
| 1 | [#143547 Unified gateway post-merge problems on main](https://github.com/NousResearch/hermes-agent/issues/143547) | 85 | P2, gateway/cron/desktop/sessions/profiles/tui-gateway | 10 月 14 日 #106742 将 CLI、TUI、Desktop、API server、编辑器、消息 bot、cron、Kanban、群聊全部收敛到单一 gateway 进程后，合并后遗留问题需要一个统一跟踪入口。**这是当前几乎所有 gateway 类 bug 的母体**。 |
| 2 | [#131859 Cannot open a pull request via API: CreatePullRequest permission error](https://github.com/NousResearch/hermes-agent/issues/131859) | 71 | P3, blocked, cause/upstream | 贡献者账户无法对上游仓库创建 PR（issue 创建与 fork PR 仍可用）。属上游/权限问题，但直接卡住外部贡献流程，社区讨论热度高。 |
| 3 | [#127665 Desktop renders one reply twice while its row is already committed](https://github.com/NousResearch/hermes-agent/issues/127665) | 60 | P2, desktop/chat, streaming, sessions | 桌面端同一助手回复重复渲染，且与 #127288 同症状但不同 fold 路径。用户对"数据一致但 UI 重复"的体感极差，是桌面端信任度问题。 |
| 4 | [#143379 RFC: THE DOC-CHAIN SUBSTRATE'S NETWORK — the read, the governance, the compaction](https://github.com/NousResearch/hermes-agent/issues/143379) | 39 | P4, security, compression, memory | 关于"持久记录在会话压缩后仍保留溯源、agent 重新读取而非让用户重复"的架构 RFC，指向长期记忆与压缩治理方向。 |
| 5 | [#155595 Tracking: profile creation and lifecycle](https://github.com/NousResearch/hermes-agent/issues/155595) | 21 | profiles, plugins, CLI | 画像创建/生命周期的总跟踪 issue，涵盖 provisioning、凭据、模型继承、clone 安全、Honcho 抽取等。 |

**反应最多（👍）**： [#3897](https://github.com/NousResearch/hermes-agent/issues/3897)（4 赞，RBAC）、[#29849](https://github.com/NousResearch/hermes-agent/issues/29849)（3 赞，cron 后端）、[#146345](https://github.com/NousResearch/hermes-agent/issues/146345)（2 赞，模型切换）、[#132820](https://github.com/NousResearch/hermes-agent/issues/132820)（2 赞，matrix 安装阻断）。整体点赞量偏低，说明用户更多以"报告缺陷"而非"表态支持"的方式参与。

**背后诉求**：统一网关的架构收益（会话集中、跨端一致）已被接受，但**合并后稳定性回退**成为社区最集中的不满来源；其次是企业/团队场景的工具权限隔离需求长期未被满足。

---

## 5. Bug 与稳定性

### P1（严重）

- **[#95670 Discord handoff direct thread creation omits type and defaults to private_thread](https://github.com/NousResearch/hermes-agent/issues/95670)** — `DiscordAdapter.create_handoff_thread()` 直接调用 `create_thread()` 时未显式传 `type`，discord.py 默认成 `private_thread`，影响消息投递。**展示数据中未见对应 fix PR。**
- **[#132820 Pain cluster: matrix extra's native E2EE build aborts the whole `hermes update`](https://github.com/NousResearch/hermes-agent/issues/132820)** — `mautrix[encryption]` → `python-olm` 原生构建在 Linux 上失败会导致整个 `hermes update` 中止且无法 opt-out；macOS 改为丢弃 mautrix。一周内 7 份报告。**未见 fix PR。**
- **已有 fix PR 的 P1**：
  - [#156055 fix(tui_gateway): accept the client frame bound on the owner forward](https://github.com/NousResearch/hermes-agent/pull/156055)
  - [#143156 fix(gateway): repair state_meta local policy receipts on legacy-main rekey](https://github.com/NousResearch/hermes-agent/pull/143156)

### P2（高，按主题归类）

**网关/会话一致性**
- [#127665 桌面端回复重复渲染](https://github.com/NousResearch/hermes-agent/issues/127665)（60 评论，无 fix PR 展示）
- [#143767 Desktop 恢复压缩前已结束会话，模型切换被拒为 `session_superseded`](https://github.com/NousResearch/hermes-agent/issues/143767)
- [#156709 FooteredReply 破坏 `copy.deepcopy`（TypeError: missing 'footer'）](https://github.com/NousResearch/hermes-agent/issues/156709)
- [#151582 会话删除/重命名永久 409 `revision_conflict`（两套 revision 计数器不同步）](https://github.com/NousResearch/hermes-agent/issues/151582)
- [#146345 Desktop/TUI 模型切换遗留 `gateway_runtime` 旧 provider](https://github.com/NousResearch/hermes-agent/issues/146345)
- [#141958 启用 multiplexing 后网关停止写 agent.log/gateway.log/errors.log](https://github.com/NousResearch/hermes-agent/issues/141958)
- **修复候选 PR**：[#144701 将 bounded control reads 移出串行队列](https://github.com/NousResearch/hermes-agent/pull/144701)

**cron / 后台任务**
- [#29849 `no_agent=True` cronjob 忽略 `terminal.backend`，总在调度器本机执行](https://github.com/NousResearch/hermes-agent/issues/29849)（17 评论，3 赞，`needs-decision`）
- [#134092 cron job 投递完成后仍停留 `delivery_queued`](https://github.com/NousResearch/hermes-agent/issues/134092)
- [#147873 owed-restart 义务无法清除（同一 PID 同时被记录为 mapped 与 stopped_unmapped）](https://github.com/NousResearch/hermes-agent/issues/147873)

**桌面端 / 跨平台**
- [#137843 切换会话后工作区文件面板永久 loading](https://github.com/NousResearch/hermes-agent/issues/137843)
- [#151348 Windows 会话切换阻塞 Electron 主进程约 2s×2（git 调用经 python shim）](https://github.com/NousResearch/hermes-agent/issues/151348)
- [#138974 升级破坏 `%LOCALAPPDATA%\hermes\tools\*` 继承 ACL，桌面后端无法 spawn](https://github.com/NousResearch/hermes-agent/issues/138974)
- [#41219 Windows 首次崩溃后网关事件循环 30–60s 内死锁](https://github.com/NousResearch/hermes-agent/issues/41219)（自 2026-06 持续）

**工具 / Agent 行为**
- [#54572 patch 工具 replace 模式在 `old_string` 非精确匹配时可能编辑错误区域](https://github.com/NousResearch/hermes-agent/issues/54572)
- [#147631 父 agent 在子任务阻塞后静默停止未完成任务](https://github.com/NousResearch/hermes-agent/issues/147631)
- **修复候选 PR**：[#141881 Windows write_file 永远 stale](https://github.com/NousResearch/hermes-agent/pull/141881)、[#128700 skill_view 去重缓存按会话隔离](https://github.com/NousResearch/hermes-agent/pull/128700)、[#121104 保持 launch `--model/--provider` 跨 `/new`](https://github.com/NousResearch/hermes-agent/pull/121104)、[#159057 Vertex 思考增量路由到 reasoning](https://github.com/NousResearch/hermes-agent/pull/159057)、[#130879 远程媒体交付找到沙箱](https://github.com/NousResearch/hermes-agent/pull/130879)、[#89754 审批重试跨 prompt/profile 安全](https://github.com/NousResearch/hermes-agent/pull/89754)、[#159050 修复 voice 模式原生崩溃与重启循环](https://github.com/NousResearch/hermes-agent/pull/159050)

---

## 6. 功能请求与路线图信号

- **[#3897 Per-user tool restrictions in gateway (RBAC)](https://github.com/NousResearch/hermes-agent/issues/3897)**（P2，4 赞，`needs-decision`，自 2026-03-30）— 共享 Telegram bot 场景下按 Telegram ID 限制工具访问。**诉求明确、场景真实、赞数最高，是最可能被纳入下一阶段路线图的候选**，但受 `needs-decision` 阻塞。
- **[#31584 Treat memory-context as background context, not authoritative user-message content](https://github.com/NousResearch/hermes-agent/issues/31584)**（P2，`sweeper:risk-session-state`）— 记忆上下文应与用户消息区分，涉及提示注入/威胁面。已有明确安全动机。
- **[#143379 RFC: DOC-CHAIN SUBSTRATE'S NETWORK](https://github.com/NousResearch/hermes-agent/issues/143379)**（P4）— 压缩后溯源保留与 agent 主动重读，属长期架构方向，39 条讨论说明有设计共识在形成。
- **[#155595 Profile creation and lifecycle tracker](https://github.com/NousResearch/hermes-agent/issues/155595)** — 画像 provisioning、凭据、模型继承、clone 安全等已成体系，**大概率进入近期版本**。
- **内部架构信号（PR）**：
  - [#158717 feat(regex): hermes_re facade over google-re2 + doctor check](https://github.com/NousResearch/hermes-agent/pull/158717)（stacked on #158716，S0）
  - [#158719 refactor(regex): run no regex match at import time](https://github.com/NousResearch/hermes-agent/pull/158719)（S2b，owner decision D24）
  - 两者构成 RE2 迁移计划的连续阶段，暗示正则在性能/安全上被系统性收敛。
- **插件生态扩张（社区驱动）**：
  - [#149353 feat(plugin-catalog): add hunk-consent-guard](https://github.com/NousResearch/hermes-agent/pull/149353)
  - [#159062 feat(plugin-catalog): add claim-market-router and source-trail-supervisor](https://github.com/NousResearch/hermes-agent/pull/159062)
  - [#159058 feat(catalog): bump zerosignal to v0.2.0](https://github.com/NousResearch/hermes-agent/pull/159058)
  - 来源为 Hackathon 插件仓库，说明插件目录正成为外部贡献的主要入口。

---

## 7. 用户反馈摘要

**真实痛点**

- **团队/企业使用受限**：用户以 v0.5.0 跑 4–10 人投资团队共享 Telegram bot，`TELEGRAM_ALLOWED_USERS` 只能做允许列表，无法按用户限制工具（[#3897](https://github.com/NousResearch/hermes-agent/issues/3897)）。
- **桌面端一致性焦虑**：回复重复渲染（[#127665](https://github.com/NousResearch/hermes-agent/issues/127665)）、文件面板永久 loading（[#137843](https://github.com/NousResearch/hermes-agent/issues/137843)）、会话切换主进程阻塞（[#151348](https://github.com/NousResearch/hermes-agent/issues/151348)）——用户反复强调"数据是对的，但 UI 让我不敢信"。
- **远程/混合后端断链**：脚本被写到远程主机，cron 却在本机执行（[#29849](https://github.com/NousResearch/hermes-agent/issues/29849)）；`MEDIA:` 指向沙箱内文件却被判"not found on this host"（[#130879](https://github.com/NousResearch/hermes-agent/pull/130879)）。
- **安装/更新脆弱**：matrix E2EE 原生构建直接中止整个 update 且无法跳过（[#132820](https://github.com/NousResearch/hermes-agent/issues/132820)）；systemd drop-in 中已配置的 `RestartPreventExitStatus=78` 被误报（[#126362](https://github.com/NousResearch/hermes-agent/issues/126362)）。
- **消息平台细节损耗**：Discord 线程唤醒每 60s 报 `admission_conflict` 且通知关闭无效（[#143720](https://github.com/NousResearch/hermes-agent/issues/143720)）；本地 TTS 以 Vorbis 写入 `.ogg`，平台语音气泡静默降级（[#84102](https://github.com/NousResearch/hermes-agent/issues/84102)）。

**满意/认可**

- 统一网关的架构方向被接受，讨论以"如何修好"而非"是否回退"为主（#143547 虽 85 评论，但为跟踪性质）。
- 插件生态与 Hackathon 贡献活跃，社区愿意按 review 意见拆分 PR（#159062 即从 #149353 拆分而来）。

**不满意**

- 合并后回归集中爆发、多个 P2 长期无 fix PR。
- `needs-decision` 标签泛滥，用户提出的合理需求（RBAC、cron 后端）数月无结论。

---

## 8. 待处理积压

以下条目长期未关闭/未决，建议维护者优先排期：

| 条目 | 类型 | 起始时间 | 挂起时长 | 备注 |
|---|---|---|---|---|
| [#3897 RBAC 每用户工具限制](https://github.com/NousResearch/hermes-agent/issues/3897) | Issue | 2026-03-30 | ~8 个月 | 4 赞，`needs-decision`，最高社区支持度 |
| [#29849 cron `no_agent` 忽略 `terminal.backend`](https://github.com/NousResearch/hermes-agent/issues/29849) | Issue | 2026-05-21 | ~6 个月 | 3 赞，`needs-decision` + 安全边界风险 |
| [#31584 memory-context 应视为背景上下文](https://github.com/NousResearch/hermes-agent/issues/31584) | Issue | 2026-05-24 | ~6 个月 | 安全面 |
| [#41219 Windows 网关事件循环死锁](https://github.com/NousResearch/hermes-agent/issues/41219) | Issue | 2026-06-07 | ~5.5 个月 | P2，Windows 用户确定性复现 |
| [#54572 patch 工具错误区域编辑](https://github.com/NousResearch/hermes-agent/issues/54572) | Issue | 2026-06-29 | ~5 个月 | 数据正确性风险 |
| [#79728 Kanban block-loop 恢复被误拆为重复工作](https://github.com/NousResearch/hermes-agent/issues/79728) | Issue | 2026-08-05 | ~3.5 个月 | duplicate 标签但影响调度 |
| [#89754 审批重试跨 prompt/profile 安全](https://github.com/NousResearch/hermes-agent/pull/89754) | PR | 2026-08-19 | ~3 个月 | 待评审 |
| [#121104 保持 launch `--model/--provider`](https://github.com/NousResearch/hermes-agent/pull/121104) | PR | 2026-09-24 | ~2 个月 | 待评审 |
| [#128700 skill_view 去重缓存按会话隔离](https://github.com/NousResearch/hermes-agent/pull/128700) | PR | 2026-09-30 | ~2 个月 | 待评审 |
| [#130879 远程媒体交付找到沙箱](https://github.com/NousResearch/hermes-agent/pull/130879) | PR | 2026-10-01 | ~2 个月 | 待评审 |

**另需注意维护负担信号**：新提交 PR 中出现无描述、模板未填的条目（如 [#159063 "ARMY01"](https://github.com/NousResearch/hermes-agent/pull/159063)），在 356 条待合并积压中会进一步稀释评审带宽，建议引入自动 triage/关闭机制。

---

**健康度小结**：项目处于**高活跃、高输入、中等消化**阶段。架构演进（统一网关、RE2 迁移、插件目录）方向清晰，但合并后稳定性回退与决策积压是当前两项核心风险。建议下一周期优先处理 P1（#95670、#132820）并清退一批 `needs-decision` 积压，以恢复社区对响应速度的信心。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报（2026-11-23）

> 数据范围：过去24小时。说明：PR 评论数在提供数据中为 `undefined`，且2条已合并/关闭 PR 未列明具体条目，以下分析基于可见数据，不推断未列明内容。

## 1. 今日速览

过去24小时 AstrBot 无新版本发布，Issues 更新7条（6条新开/活跃、1条关闭），PR 更新43条（41条待合并、2条已合并/关闭），社区贡献保持活跃但合并吞吐偏低。Bug 集中在适配器长连接与消息下行可靠性：QQ官方机器人约30—40小时单方向断联、weixin_oc 下行静默丢弃，均直接影响生产可用性，且样本中暂未见对应 fix PR。修复侧有 #11331 关联 #11330 改善 aiocqhttp 流式顺序，#11279、#11329 等待合并；插件重启用竞态 Issue #11305 已关闭。当前主要健康度瓶颈是41条待合并 PR 的 review 积压，多条 PR 创建于9—10月。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

- 过去24小时 PR 更新中待合并41条，占比约95.3%；已合并/关闭2条，占比约4.7%。已合并/关闭 PR 的明细未在提供数据中列明，无法逐一评估内容。
- Issue #11305 已关闭：插件禁用后重新启用时 `resolve_view` 早于 `activated` 更新，导致 “The view's plugin is unavailable”。该问题关闭表明插件生命周期竞态有收敛。[Issue #11305](https://github.com/AstrBotDevs/AstrBot/issues/11305)
- 待合并修复链中，#11331 明确 `Closes #11330`，修复 aiocqhttp 在 `realtime_segmenting` 下 fallback 文本在工具状态和媒体发送前未 flush、导致消息顺序错乱的问题；若合并可改善流式输出一致性。[PR #11331](https://github.com/AstrBotDevs/AstrBot/pull/11331) / [Issue #11330](https://github.com/AstrBotDevs/AstrBot/issues/11330)
- 其他待合并修复覆盖：并发知识库导入进度可见性 [#11279](https://github.com/AstrBotDevs/AstrBot/pull/11279)、KOOK 引用消息解析 [#11329](https://github.com/AstrBotDevs/AstrBot/pull/11329)、OpenAI 兼容 Provider 旧工具调用历史清洗 [#11223](https://github.com/AstrBotDevs/AstrBot/pull/11223)、WebChat 模型感知推理强度选择 [#11324](https://github.com/AstrBotDevs/AstrBot/pull/11324)。
- 整体判断：修复供给活跃，但合并/关闭仅2条、待合并41条，项目向前推进幅度受 review 吞吐限制。

## 4. 社区热点

- **Issue #11130（评论4，今日最高）**：AstrBot + QQ官方机器人长时间运行约30—40小时后用户单方向断联，日志反复出现 `[QQOfficial] Websocket session starting.` 但无法启动，手动在 Dashboard 重启机器人平台后恢复，100小时内触发3次。诉求集中在长连接自动重连、会话健康检查与故障自愈。[链接](https://github.com/AstrBotDevs/AstrBot/issues/11130)
- **Issue #11320（评论1）**：OpenAI-compatible Provider 在模型仅返回 `</thinking>`/`</think>` 结束标记、缺少开头标记时，将思考草稿作为普通 `message.content` 发送到 OneBot v11 / QQ；即使 `display_reasoning_text=false`、`streaming_response=false` 仍发生。背后是用户对推理内容展示配置边界与隐私泄漏的担忧。[链接](https://github.com/AstrBotDevs/AstrBot/issues/11320)
- PR 评论数在数据中缺失，无法按讨论热度排序；可见 Issues 的 👍 均为0。今日热点主要由高严重 Bug 驱动，而非功能讨论。

## 5. Bug 与稳定性

| 严重程度 | 问题 | 状态/是否已有 fix PR |
|---|---|---|
| 高 | **QQ官方机器人长时间运行单方向断联**：约30—40小时复发，用户消息提示“机器人的灵魂不在线”，主动消息仍可发送，手动重启恢复。影响核心消息通道可用性。[#11130](https://github.com/AstrBotDevs/AstrBot/issues/11130) | 样本中未见 fix PR |
| 高 | **weixin_oc 下行100%静默丢弃**：上行正常，`sendmessage` 返回 HTTP 200 且 `{"ret":0}`，但无 `message_id`，消息不出现在微信；适配器只校验 `ret` 无法感知失败。[#11325](https://github.com/AstrBotDevs/AstrBot/issues/11325) | 样本中未见 fix PR |
| 高 | **OpenAI-compatible 推理草稿泄漏**：缺少开头 thinking 标签时，思考草稿进入 OneBot/QQ 正文，配置关闭展示仍无效。涉及内容边界与隐私。[#11320](https://github.com/AstrBotDevs/AstrBot/issues/11320) | 样本中未见 fix PR |
| 中 | **cron/Scheduler 来源 trace 永久 running**：trace 状态双重存储且可能分歧，影响可观测性数据可信度。[#11328](https://github.com/AstrBotDevs/AstrBot/issues/11328) | 样本中未见 fix PR |
| 中 | **aiocqhttp realtime_segmenting 文本顺序问题**：工具调用 `break` 空链被忽略，媒体先发，早先文本滞留到后续标点或结束才发送。[#11330](https://github.com/AstrBotDevs/AstrBot/issues/11330) | 已有 fix PR [#11331](https://github.com/AstrBotDevs/AstrBot/pull/11331) |
| 中低 | **插件禁用后重新启用加载失败**：`resolve_view` 早于 `activated` 更新，报 “The view's plugin is unavailable”。[#11305](https://github.com/AstrBotDevs/AstrBot/issues/11305) | 已关闭 |

## 6. 功能请求与路线图信号

- **支持 Gitea 仓库插件解析**：用户提出开发场景需求，希望 AstrBot 支持解析 Gitea 仓库插件。[#11327](https://github.com/AstrBotDevs/AstrBot/issues/11327) 当前无直接 PR，短期纳入概率取决于维护者对插件源生态的规划。
- **WebChat 模型感知推理强度选择**：待合并 PR #11324 允许在 WebChat 输入区调整 reasoning effort，并展示所选模型/API 支持的等级，关联 #9731、#9483。[PR #11324](https://github.com/AstrBotDevs/AstrBot/pull/11324) 若 review 通过，较可能进入下一版本的前端体验增强。
- **原生视频输入模态**：待合并 PR #10202 将 video 作为一等输入模态，镜像 image/audio 流程。[PR #10202](https://github.com/AstrBotDevs/AstrBot/pull/10202) 属于 Provider 多模态能力扩展，但为长期 PR。
- **Gemini relay 别名与 dated 2.5 thinking 模型兼容**：待合并 PR #10961 补齐模型 ID 匹配缺口。[PR #10961](https://github.com/AstrBotDevs/AstrBot/pull/10961)
- **Provider/插件生命周期系统性治理**：#10845、#10846、#10895、#10897 等围绕 Provider 初始化、静默替换告警、按 ID 重载、插件 provider adapter 注销。[#10845](https://github.com/AstrBotDevs/AstrBot/pull/10845) [#10846](https://github.com/AstrBotDevs/AstrBot/pull/10846) [#10895](https://github.com/AstrBotDevs/AstrBot/pull/10895) [#10897](https://github.com/AstrBotDevs/AstrBot/pull/10897) 可能分批纳入，但当前无 release 信号。

## 7. 用户反馈摘要

- **生产部署稳定性是核心痛点**：QQ官方机器人用户需要手动在 Dashboard 重启平台恢复，30—40小时复发，说明用户场景包含长时间无人值守运行，对自动重连和健康检查有强需求。
- **适配器“成功返回”不等于真实成功**：weixin_oc 用户指出 `ret:0` 但无 `message_id`，消息实际未送达，适配器只校验 `ret` 造成静默失败；用户希望增加更严格的响应校验和失败可观测性。
- **推理内容边界敏感**：使用 DeepSeek4.1-1017 等 OpenAI-compatible 模型的用户，在关闭思考展示后仍遇到草稿泄漏，说明用户不仅关注功能开关，也关注解析健壮性与隐私边界。
- **可观测性数据可信度受关注**：trace/cron 状态永久 running、双重存储可能分歧，影响排障信任度。
- **插件管理体验仍有摩擦**：禁用后重启用失败会直接影响插件热更新与运维；该 Issue 已关闭，反馈有收敛。
- **功能诉求偏开发场景**：Gitea 仓库支持反映用户希望扩展插件来源生态。

## 8. 待处理积压

以下为可见数据中创建较早或高严重、仍需维护者关注的条目：

| 条目 | 创建时间 | 积压情况/关注理由 |
|---|---|---|
| [PR #9900](https://github.com/AstrBotDevs/AstrBot/pull/9900) plugin imports rollback-safe | 2026-09-01 | 约83天，涉及插件导入失败后的全局注册表回滚安全 |
| [PR #9956](https://github.com/AstrBotDevs/AstrBot/pull/9956) command alias 参数被静默丢弃 | 2026-09-05 | 约79天，命令解析静默 bug |
| [PR #10202](https://github.com/AstrBotDevs/AstrBot/pull/10202) 原生视频输入模态 | 2026-09-23 | 约61天，较大功能 PR，需维护者决策 |
| [PR #10553](https://github.com/AstrBotDevs/AstrBot/pull/10553) 上下文摘要失败时裁剪超限历史 | 2026-10-14 | 约40天，影响长会话稳定性 |
| [PR #10845](https://github.com/AstrBotDevs/AstrBot/pull/10845) 跨插件启动阶段初始化 Provider | 2026-10-29 | 约25天，Provider/插件生命周期治理 |
| [PR #10961](https://github.com/AstrBotDevs/AstrBot/pull/10961) Gemini relay 别名与 dated 2.5 thinking 模型 | 2026-11-02 | 约21天，模型兼容性 |
| [Issue #11130](https://github.com/AstrBotDevs/AstrBot/issues/11130) QQ官方机器人长运行断联 | 2026-11-14 | 9天、评论4，高严重且样本中无 fix PR，建议优先排查 |
| [Issue #11325](https://github.com/AstrBotDevs/AstrBot/issues/11325) weixin_oc 下行静默丢弃 | 2026-11-22 | 新报高严重问题，建议尽快确认适配器校验逻辑 |

**维护建议**：优先处理高严重且无 fix PR 的 #11130、#11325、#11320；同时对41条待合并 PR 分批 review，避免长期 PR 继续堆积。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报

**日期：2026-11-23** ｜ **仓库：deepseek-ai/deepseek-harness**
**数据口径：** 过去 24 小时 Discussions 更新 139 条；新增 Release 2 个；仓库未启用 GitHub Issues / Pull Requests，代码合并经 Releases 落地，下文以 changelog 作为合并摘要。Discussions 仅展示评论数最多的 15 条，其余 124 条未纳入明细分析。

---

## 1. 今日速览

- **迭代节奏处于高位**：单日发布 2 个版本（`dsh-v0.2.3-alpha.1`、`dsh-v0.2.3-alpha.2`），其中 alpha.1 是一次功能密度很高的大版本，覆盖插件市场、代码审阅、连接器、远程登录、会话状态等 9 个功能域。
- **社区活跃度强**：24 小时内 139 条 Discussions 更新，头部话题 #12755（MIR 支付）累计 72 条评论，说明讨论区仍是主要反馈入口。
- **质量信号偏紧**：新发布的 `0.2.3-alpha.1` 出现“可安装但所有命令无法启动”的阻断性反馈（#14044），alpha.2 仅调整 Node.js 版本要求，changelog 未提及该问题修复，建议升级前先验证。
- **长期痛点集中**：超大会话 OOM、工具调用 JSON 损坏不重试、Windows 桌面端启动崩溃、会话无法硬删除等议题持续被顶起，横跨 1–2 个月仍未关闭。
- **整体判断**：项目正从“编码助手”向“插件平台 + 多连接器 + 团队审阅”演进，生态扩张明显；但 **alpha 质量门禁、长会话性能、桌面端稳定性** 是当前健康度的三个主要风险点。

---

## 2. 版本发布

### 2.1 `dsh-v0.2.3-alpha.2`（补丁级 / 环境要求变更）

> 链接：https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.3-alpha.2
> 对比：https://github.com/deepseek-ai/deepseek-harness/compare/dsh-v0.2.3-alpha.1...dsh-v0.2.3-alpha.2

**变更内容：**
- 调整 Node.js 版本要求为 **24.22.3 及以上（24.x 系列），或 26.13.1 及以上**。作者 @imccyu。

**破坏性变更 / 迁移注意事项：**
1. **运行时门槛提升**：Node 24.0–24.22.2、26.0–26.13.0 区间不再受支持，低于门槛将无法启动。
2. **需同步升级的资产**：CI 矩阵、Docker 基础镜像、`.nvmrc` / `engines` 字段、以及桌面端打包所用的内置 Node。讨论 #13836 的环境信息显示桌面端 `0.2.2-rc.5` 内置 Node 为 **24.21.0**，低于新门槛，需关注桌面端构建是否已同步升级。
3. **alpha 通道风险**：该版本为预发布版，不建议生产环境直接采用；从 alpha.1 升级时，建议先复验 #14044 的启动错误是否仍存在（本版 changelog 未包含相关修复说明）。

### 2.2 `dsh-v0.2.3-alpha.1`（功能大版本）

> 链接：https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.3-alpha.1

**新增功能（9 项）：**

| 功能域 | 内容 | 作者 |
|---|---|---|
| 插件市场 | 支持添加 Git 仓库作为插件来源，私有仓库插件可浏览安装 | @acehinnnqru |
| 可观测性 | 实验性时间线插件：任务树、阻塞事项、进展报告，进度条可展开，语言可跟随对话 | @Magolor |
| 代码审阅 | 新增代码审阅页面，集中查看本人相关 GitHub PR，页内与智能体协作审阅 | @LegGasai |
| 代码审阅扩展 | 插件可添加审阅视图、行注解、工具栏/文件菜单/评论框自定义操作；支持 GitLab 评审与合并 | @LegGasai |
| 会话状态 | 新增会话状态区域：工作目录、变更请求、子智能体、任务、插件状态，可停靠与拖动排序 | @LegGasai |
| 会话管理 | 会话已读/未读状态、完成提醒、快捷键切换，保留侧栏状态 | @Saafo, @imccyu |
| 连接鉴权 | Web 连接模式支持远程登录（独立登录链接 / 设备配对），提供标准化连接鉴权 API 供插件注册 | @EricMoin, @imccyu |
| 账号体系 | 插件页统一管理连接器账号，MCP 支持 OAuth 授权与凭据自动刷新；CLI 应用插件共用账号管理与上游技能下载 | @grllll |
| 连接器 | 新增 Linear、Notion、腾讯文档、飞书、企业微信、腾讯会议、钉钉连接器插件（可选安装） | @grllll |

**体验优化（changelog 列出 12 条，末条原文截断）：**
- 简化模型菜单中的智能体团队入口，开关与开销说明移至二级面板（@Yifffan）
- 修复子智能体模型选择与消息来源识别，授权设置及时生效，完善结果汇报与关键发现通知（@Dudu-0223）
- 改善子代理、分支会话阅读与创建体验，继承历史与新消息之间显示分隔线（@turtle2099, @Yifffan, @imccyu）
- 加快会话列表与 @ 引用候选加载（@turtle2099 等）
- 搜索支持模糊与跨语言匹配（如 `cpt` → `/compact`），新建会话可按名称或目录路径搜索工作区（@turtle1999, @acehinnnqru）
- 优化自动化任务推荐、删除确认与会话标记，新增「每周回顾」推荐（@ZiyaZhang 等）
- DeepSeek 图片上传支持多图并发，限流自动重试（@CreatixChu）
- 改善 `web_fetch` 网络失败提示，显示可读原因与处理建议（@turtle2099, @Elevator14B）
- 代码审阅与工作树体验优化：变更请求列表更紧凑可折叠、PR 状态更新更及时、支持自定义分支名与远端分支创建（@LegGasai, @imccyu, @turtle2099）
- 改善长会话流式输出、轮次导航、右侧栏拖动响应，减少大型 Markdown 表格/列表卡顿（@turtle2099, @imccyu, @std-microblock）
- 统一图标、对齐与间距，改善侧栏滚动与拖动排序，修复多处显示问题（@turtle2099, @grllll 等）
- Office 技能统一通过 `/o…`（原文在此处截断，未完整展示）

> 说明：changelog 原文在“Office 技能统一通过 /o”处截断，本日报不对缺失部分做推测。

---

## 3. 项目进展

**口径说明：** 本项目未启用 Issues / Pull Requests，外部贡献无法通过 PR 进入，代码合并统一经 Release 落地。本节以 `dsh-v0.2.3-alpha.1` 的 changelog 作为“今日合并摘要”。

### 3.1 推进的功能方向

1. **插件平台化取得实质进展**
   插件市场支持 Git 仓库（含私有仓库）作为来源，代码审阅插件新增扩展机制（自定义审阅视图、行注解、工具栏操作），连接器账号统一管理并开放标准化连接鉴权 API。这意味着 DSH 正从“内置功能集合”转向“可被第三方扩展的宿主平台”。
   链接：https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.3-alpha.1

2. **代码审阅闭环打通 GitHub 与 GitLab**
   新增代码审阅页面，可集中查看本人相关 PR、浏览描述与变更，并在页内与智能体协作审阅；同时支持 GitLab 的评审与合并。对团队协作场景是明确的能力补强。
   链接：https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.3-alpha.1

3. **多智能体可观测性增强**
   实验性时间线插件提供任务树、阻塞事项与进展报告，配合会话状态区域（子智能体、任务、插件状态）与子智能体模型选择修复，缓解了多智能体“黑箱运行”的问题。
   链接：https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.3-alpha.1

4. **连接器生态一次性扩容**
   Linear、Notion、腾讯文档、飞书、企业微信、腾讯会议、钉钉 7 个连接器插件上线，叠加 MCP OAuth 与凭据自动刷新，企业办公场景的接入成本明显下降。
   链接：https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.3-alpha.1

5. **会话体验与性能持续打磨**
   已读/未读、会话列表加载加速、模糊与跨语言搜索、长会话流式输出与大型 Markdown 渲染优化，均指向“长会话 + 高频切换”的真实使用模式。
   链接：https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.3-alpha.1

### 3.2 推进幅度评估

- **功能密度：高。** 单版本包含 9 项新增功能 + 12 项体验优化，覆盖插件、审阅、连接器、鉴权、会话、性能六条主线。
- **架构意义：中高。** 插件扩展机制与连接鉴权 API 属于平台级能力，其价值会在此后多个版本中持续释放。
- **风险提示：中。** alpha.1 发布当日即出现启动阻断反馈（#14044），说明预发布质量门禁与版本兼容性验证仍有提升空间；alpha.2 仅处理 Node 门槛，未覆盖该问题。

---

## 4. 社区热点

> 以下按评论数排序，均为 OPEN 状态。

| 排名 | 话题 | 评论 | 链接 | 诉求分析 |
|---|---|---|---|---|
| 1 | #12755 [Ideas] 支持 MIR 卡支付 DeepSeek API | 72 | https://github.com/deepseek-ai/deepseek-harness/discussions/12755 | 俄罗斯用户因本地卡无法支付而无法使用 API。这是**商业可及性**问题而非产品质量问题，72 条评论说明地域支付壁垒直接影响用户采用与留存；但该诉求涉及支付/账户侧，未必能由本仓库代码解决。 |
| 2 | #10615 [Show Your Plugins!] 设计工作台 dsh-design-studio | 16 | https://github.com/deepseek-ai/deepseek-harness/discussions/10615 | 社区插件把模型生成的界面放到画布上、支持点选修改与设计体检。反映**插件市场开始产出可视化工作流**，社区创新活跃度高。 |
| 3 | #9695 [Bug] session_search 永久 30s 超时（FTS 索引 + 单事务对账 + 工具超时中止） | 11 | https://github.com/deepseek-ai/deepseek-harness/discussions/9695 | 大语料下必然死锁，属于**架构级性能缺陷**，报告者定位到索引与事务设计，说明高级用户已在生产部署中使用实验性插件。 |
| 4 | #7874 [Bug] Windows「打开方式」永远显示无法获取应用列表 | 10 | https://github.com/deepseek-ai/deepseek-harness/discussions/7874 | 单个 shell handler 的 `GetName`/`GetUIName` 返回 E_FAIL 即导致整个列表作废。属于**桌面端兼容性细节**，影响 Windows 用户日常操作。 |
| 5 | #12697 [Q&A] 系统继承上下文泄漏到助手展示消息 | 9 | https://github.com/deepseek-ai/deepseek-harness/discussions/12697 | 系统提示被追加到用户可见回复中。涉及**展示层与模型上下文的隔离**，也带来隐私/观感问题。 |
| 6 | #9692 [Ideas] 跨会话记忆、聊天归档、用户名记忆、编辑消息时推理一致性 | 9 | https://github.com/deepseek-ai/deepseek-harness/discussions/9692 | 长期用户的**记忆与归档**诉求，直指“每次会话从零开始”的体验断层。 |
| 7 | #10270 [Bug] workspace-write 在工作区根目录留下持久 Low integrity 标签 | 9 | https://github.com/deepseek-ai/deepseek-harness/discussions/10270 | Windows ACL 沙箱把可继承的低完整性标签写到用户目录，**会话结束后仍残留并传播**，会破坏从该目录启动的安装器。安全模型与易用性冲突。 |

**热点背后的共性：**
- 讨论区头部话题以 **Bug/稳定性** 为主（5/7），而非纯功能请求，说明当前用户更关注“能不能稳定用”。
- 插件生态话题（#10615）虽排名第二，但评论量级（16）与支付话题（72）差距明显，社区创新仍在早期。
- 平台兼容性（Windows）与长会话性能是跨话题出现频率最高的两个关键词。

---

## 5. Bug 与稳定性

> 项目无 PR 通道，修复只能随 Release 落地。下表“修复状态”均指**截至 2026-11-23 的公开 Release 说明中是否出现对应修复**，不代表内部未处理。

### P0 — 阻断性

| 问题 | 影响 | 链接 | 修复状态 |
|---|---|---|---|
| #14044 `@deepseek-ai/dsh@0.2.3-alpha.1` 可安装但所有命令无法启动，报 `cordis-plugin-loader` 缺少 `EntryValidationError` 导出 | 新版本完全不可用，发生在 CLI 命令分发之前 | https://github.com/deepseek-ai/deepseek-harness/discussions/14044 | **未见修复**。alpha.2 changelog 仅调整 Node 要求，未提及该问题；升级前需重点验证。 |
| #13836 桌面端 0.2.2-rc.5 启动即崩溃，主进程 undici fetch 报 `read ECONNRESET`（每次必现） | 桌面用户无法启动 | https://github.com/deepseek-ai/deepseek-harness/discussions/13836 | 未见对应 Release 修复说明 |

### P1 — 高影响

| 问题 | 影响 | 链接 | 修复状态 |
|---|---|---|---|
| #12708 超大会话（解压后约 1GB）导致 host OOM 崩溃，且崩溃后自动重开同一会话形成死循环 | 长期项目用户数据不可用，且无法自救 | https://github.com/deepseek-ai/deepseek-harness/discussions/12708 | 未见修复；反映会话装载缺少体积保护 |
| #9695 `session_search` 永久 30s 超时，`:memory:` FTS 索引 + 单事务对账 + 工具超时中止，大语料必然死锁 | 实验性搜索插件在生产规模下不可用 | https://github.com/deepseek-ai/deepseek-harness/discussions/9695 | 未见修复 |
| #8976 / #10195 工具调用参数 JSON 损坏触发 `MALFORMED_RESPONSE`，默认重试策略不包含该错误，整轮中止 | 单次畸形输出导致整轮工作丢失（报告称生产审计中丢失 46 轮） | https://github.com/deepseek-ai/deepseek-harness/discussions/8976 ｜ https://github.com/deepseek-ai/deepseek-harness/discussions/10195 | 未见修复；建议将 `MALFORMED_RESPONSE` / `STREAM_CLOSED` 纳入默认可重试集合 |
| #10270 `workspace-write` 在工作区根目录留下持久、可继承的 Low integrity 标签 | 会话结束后仍残留并传播，破坏从该目录启动的安装器 | https://github.com/deepseek-ai/deepseek-harness/discussions/10270 | 未见修复 |

### P2 — 中影响

| 问题 | 影响 | 链接 | 修复状态 |
|---|---|---|---|
| #7874 Windows「打开方式」永远显示“无法获取应用列表” | 文件卡片功能局部失效，目录级路由正常 | https://github.com/deepseek-ai/deepseek-harness/discussions/7874 | 未见修复 |
| #12697 系统继承上下文被追加到助手展示消息 | 用户可见回复被污染，存在信息暴露观感 | https://github.com/deepseek-ai/deepseek-harness/discussions/12697 | 未见修复 |
| #7123 仅含 `reasoning`、无正文无工具调用的响应被判为成功完成 | 静默空回复，用户侧表现为“思考完但一个字没有” | https://github.com/deepseek-ai/deepseek-harness/discussions/7123 | 未见修复；该帖 11-23 仍有更新，说明问题持续存在 |
| #13399 嵌入式宿主集成四项发现：`dsh-hmr` 内部崩溃、`readPatches` 钩子面、插件管理开关一致性、webserver 资源形式覆写 | 影响将 DSH 作为库嵌入 Electron 的集成者 | https://github.com/deepseek-ai/deepseek-harness/discussions/13399 | 报告称宿主侧已修复或有界豁免，上游未见 Release 说明 |

**稳定性小结：** 今日无新增崩溃类报告集中爆发，但**历史 P0/P1 问题均未在 Release 中闭环**。尤其 #14044 与 alpha.1 同日出现，建议维护者在 alpha.3 中优先处理并补充回归验证说明。

---

## 6. 功能请求与路线图信号

| 需求 | 提出者/链接 | 纳入下一版本的可能性判断 |
|---|---|---|
| 支持 MIR 卡支付 DeepSeek API | #12755 https://github.com/deepseek-ai/deepseek-harness/discussions/12755 | **低（本仓库维度）**。属支付/账户与商业策略，非 Harness 代码能力；但 72 条评论的热度值得官方在账户侧给出正式回应。 |
| 跨会话记忆、聊天归档、用户名记忆、编辑消息时推理一致性 | #9692 https://github.com/deepseek-ai/deepseek-harness/discussions/9692 | **中**。alpha.1 已在会话管理上密集迭代（已读/未读、会话状态区、搜索），记忆能力是自然延伸；但 changelog 未出现记忆相关信号。 |
| 会话硬删除（覆盖持久化、工作区计账、投影缓存、搜索索引与 UI 入口） | #10228 https://github.com/deepseek-ai/deepseek-harness/discussions/10228 | **中高**。当前仅支持归档，与 alpha.1 的会话管理方向一致，且实现边界清晰，适合作为下一个迭代项。 |
| 工具调用错误默认可重试（`MALFORMED_RESPONSE` / `STREAM_CLOSED`） | #8976 https://github.com/deepseek-ai/deepseek-harness/discussions/8976 | **中高**。改动面小、收益明确，属于典型的“低成本高价值”修复，建议优先纳入。 |
| 会话装载体积保护与崩溃恢复防死循环 | #12708 https://github.com/deepseek-ai/deepseek-harness/discussions/12708 | **中**。涉及会话持久化与恢复策略，需一定设计；但 P1 影响大，建议至少先加体积阈值与降级提示。 |
| 插件市场继续扩容（设计工作台类可视化插件） | #10615 https://github.com/deepseek-ai/deepseek-harness/discussions/10615 | **高**。alpha.1 已支持 Git 仓库作为插件来源，生态扩容是明确路线；后续可能在市场发现、安装信任链上继续加码。 |

**路线图信号解读：** alpha.1 的投入重心清晰指向 **插件平台化、代码审阅协作、企业连接器** 三条线；社区诉求则集中在 **稳定性、会话生命周期管理、记忆能力**。两者存在明显错位，建议下一版本在推进平台能力的同时，安排一个“稳定性专项”版本回应社区。

---

## 7. 用户反馈摘要

### 7.1 满意 / 认可

- **插件生态获得正反馈**：设计工作台插件（#10615）展示了“画布 + 点选修改 + 设计体检”的完整工作流，说明插件机制已能支撑复杂交互，而非仅做简单工具封装。
- **连接器与办公场景补齐**：Linear、Notion、飞书、企业微信、腾讯会议、钉钉等一次性上线，用户对企业办公接入的期待得到回应。
- **代码审阅体验改善**：PR 状态更新更及时、变更列表更紧凑可折叠、支持 GitLab，团队协作路径更顺。

### 7.2 痛点 / 不满意

1. **长会话是最大风险点**：3 个月项目会话膨胀至约 1GB 后直接 OOM，且崩溃恢复反而把会话顶到“最近使用”形成死循环（#12708）。用户需要的不是“更快”，而是“不丢数据、可恢复”。
2. **错误恢复策略过于保守**：一次工具参数 JSON 畸形就丢失整轮工作，生产审计中损失 46 轮（#8976）。用户明确表达“单点畸形不应杀死整轮”。
3. **桌面端启动稳定性不足**：0.2.2-rc.5 每次启动必现 `ECONNRESET`（#13836）；0.2.3-alpha.1 所有命令无法启动（#14044）。预发布版本的质量门禁直接影响用户对 alpha 通道的信任。
4. **Windows 平台细节体验欠佳**：“打开方式”列表整体失效（#7874）、沙箱残留 Low integrity 标签破坏安装器（#10270），均为平台特定但影响面不小的问题。
5. **会话生命周期不完整**：只能归档不能删除（#10228），长期使用后会话库膨胀且无法清理。
6. **记忆能力缺失**：跨会话记忆、用户名记忆、归档检索均无支持（#9692），用户感觉“每次都要重新交代背景”。
7. **支付可及性**：俄罗斯用户因 MIR 卡不支持而无法充值 API（#12755），属于非产品功能但直接影响采用。

### 7.3 典型使用场景

- 3 个月连续开发的长周期项目会话（#12708）
- 生产环境多轮工具调用与审计（#8976，46 轮丢失）
- 将 DSH 作为库嵌入自有 Electron 桌面宿主（#13399）
- 设计/前端工作流中的可视化改稿（#10615）
- 跨国团队的 API 付费与接入（#12755）

---

## 8. 待处理积压

> 筛选标准：创建超过 30 天、仍为 OPEN、且属于 Bug 或高价值功能请求。项目无 PR 通道，以下均为 Discussions 帖。

| 话题 | 创建时间 | 已挂起 | 评论 | 链接 | 提醒 |
|---|---|---|---|---|---|
| #7123 仅 reasoning 响应被判成功 → 静默空回复 | 2026-09-19 | 约 65 天 | 4 | https://github.com/deepseek-ai/deepseek-harness/discussions/7123 | 11-23 仍有更新，说明问题未消失；属“静默失败”，排查成本高，建议优先定性。 |
| #7874 Windows 打开方式应用列表失效 | 2026-09-25 | 约 59 天 | 10 | https://github.com/deepseek-ai/deepseek-harness/discussions/7874 | 根因已定位到单个 shell handler 的 E_FAIL，修复面明确，适合排期。 |
| #8976 工具调用 JSON 畸形导致整轮中止且不重试 | 2026-10-06 | 约 48 天 | 5 | https://github.com/deepseek-ai/deepseek-harness/discussions/8976 | 有生产损失数据支撑，建议纳入下一版本重试策略调整。 |
| #9695 session_search 永久 30s 超时/死锁 | 2026-10-14 | 约 40 天 | 11 | https://github.com/deepseek-ai/deepseek-harness/discussions/9695 | 实验性插件在生产规模下不可用，需架构层回应（索引与事务拆分）。 |
| #9692 跨会话记忆与归档等四项请求 | 2026-10-14 | 约 40 天 | 9 | https://github.com/deepseek-ai/deepseek-harness/discussions/9692 | 高价值路线图输入，建议官方给出“是否纳入/何时评估”的状态回复。 |
| #10195 流式 tool 参数 JSON 损坏（Windows 0.2.1-rc.2） | 2026-10-18 | 约 36 天 | 5 | https://github.com/deepseek-ai/deepseek-harness/discussions/10195 | 与 #8976 同源，可合并处理。 |
| #10228 支持会话硬删除 | 2026-10-19 | 约 35 天 | 5 | https://github.com/deepseek-ai/deepseek-harness/discussions/10228 | 实现边界清晰，与 alpha.1 会话管理方向一致，建议优先排期。 |
| #10270 workspace-write 残留 Low integrity 标签 | 2026-10-19 | 约 35 天 | 9 | https://github.com/deepseek-ai/deepseek-harness/discussions/10270 | 涉及安全模型副作用，影响安装器等外部程序，建议至少给出临时规避指引。 |

**维护者关注建议：**
1. **建立 Discussions → Release 的闭环标记**：当前外部无法感知某帖是否已修复，建议在 Release 说明中引用相关 Discussion 编号。
2. **对 P0/P1 帖给出状态回复**（已确认 / 已排期 / 需更多信息），降低重复报告与情绪累积。
3. **考虑恢复 PR 通道或提供外部贡献路径**：无 PR 通道使社区只能“报告”不能“修复”，长期看会限制生态扩展速度。

---

**数据说明：** 本日报基于 2026-11-23 抓取的 GitHub 公开数据生成；Discussions 仅覆盖评论数最多的 15 条，Releases changelog 中 alpha.1 末条存在原文截断。所有判断均以公开信息为限，未对内部修复状态做推断。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*