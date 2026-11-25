# OpenClaw 生态日报 2026-11-25

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-25 04:40 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报（2026-11-25）

> 数据口径：以下“今日”指 2026-11-24 至 2026-11-25 的 GitHub 更新窗口。部分 Issue 创建较早，但今日仍在活跃讨论或更新。展示数据为 500 条 Issues 中评论最多的 50 条、500 条 PR 中展示的 30 条，完整合并/关闭未全部列出。

## 1. 今日速览

OpenClaw 今日维持高强度开发节奏：24 小时内 Issues 更新 500 条（新开/活跃 429、已关闭 71），PR 更新 500 条（待合并 226、已合并/关闭 274），并发布 v2026.11.9 与 v2026.11.8 两个版本。v2026.11.8 是明显的大规模发布（314 commits、210 PR、86 contributors），v2026.11.9 则紧随其后做小步修正（13 commits、15 PR、14 contributors）。PR 侧发布工程、更新路径、Agent Profiles、Participate 会话参与、上下文引擎容错等主题成簇推进，合并/关闭吞吐较强。但 Issues 侧关闭率仅约 14.2%，多个 P0/P1 稳定性问题长期活跃且缺少 fix PR，社区讨论高度集中在 Gateway 事件循环阻塞、SQLite/WAL、Windows 更新与重启、doctor 挂起等“可用性”问题。整体判断：**高活跃、强发布节奏，但稳定性风险与评审积压并存，项目健康度呈“开发吞吐强、核心稳定性待闭环”的状态**。

| 指标 | 数值 | 解读 |
|---|---:|---|
| Issues 更新 | 500 | 新开/活跃 429，关闭 71；关闭率约 14.2%，积压压力偏大 |
| PR 更新 | 500 | 已合并/关闭 274（54.8%），待合并 226（45.2%）；吞吐强但评审队列仍重 |
| 新版本 | 2 | v2026.11.8 大规模发布，v2026.11.9 小步修正 |
| 最高讨论 Issue | #160959，87 评论 | P0 Gateway 阻塞，2026.9.6 回归，暂无新 fix PR |

## 2. 版本发布

### v2026.11.9：小步修正版
- 规模：13 commits、15 PR、14 contributors。
- 信号：紧随 v2026.11.8 发布，属于快速迭代/小修版本，适合观察发布线是否稳定。
- 链接：[GitHub Release v2026.11.9](https://github.com/openclaw/openclaw/releases/tag/v2026.11.9)

### v2026.11.8：大规模版本
- 规模：314 commits、210 PR、86 contributors。
- 信号：贡献者与 PR 数量显著，说明该版本聚合了大量功能、修复和发布工程变更。
- 链接：[GitHub Release v2026.11.8](https://github.com/openclaw/openclaw/releases/tag/v2026.11.8)

**破坏性变更与迁移注意事项**：提供的发布摘要未展开完整 changelog，因此不能确认官方破坏性变更清单。结合同期高优 Issue/PR，升级时建议重点关注以下风险点，并以官方 release notes 为准：

- **WAL/SQLite 发布校验风险**：更新后 Doctor 可能出现 `SQLite WAL commit publication could not be verified`，导致更新“部分 finalized”。建议升级前备份 `state/openclaw.sqlite`，升级后检查 Doctor 输出与插件状态。[#197083](https://github.com/openclaw/openclaw/issues/197083)
- **Windows 更新/包交换风险**：Windows beta 更新可能在 `package-swap` 阶段失败，出现 baseline package scan failed / rollback tree changed。Windows 环境建议先小范围验证。[#200756](https://github.com/openclaw/openclaw/issues/200756)
- **pnpm 二次更新风险**：pnpm 全局安装在特定版本后再次 `openclaw update` 可能失败，已有 fix PR 在评审。[#205078](https://github.com/openclaw/openclaw/pull/205078)
- **heartbeat 配置迁移**：`agents.defaults.heartbeat` 退役配置在 beta 更新中可能引发“移除即重新启用”的副作用，升级前核对配置语义。[#200224](https://github.com/openclaw/openclaw/issues/200224)
- **数据库兼容与回滚**：更新路径正在增加“兼容数据库变更可回滚”的能力，但仍需关注旧版本重开新 schema 的边界。[#204956](https://github.com/openclaw/openclaw/pull/204956)

**迁移建议**：升级前备份状态数据库与配置；Windows/pnpm 环境先做测试安装；保留回滚窗口；升级后运行 Doctor 并核对 WAL、插件、heartbeat 与更新所有权状态。

## 3. 项目进展

今日展示的 30 条 PR 中可见多条已关闭/合并 PR；完整 274 条合并/关闭未全部展示。结合版本发布与 PR 描述，项目主要向前推进了以下方向：

- **发布工程与 CI 防回归**：关闭 #205036，允许在发布时接受已确认的 SDK 前驱漂移，解除 2026.11.10 发布阻塞；关闭 #205022，在 CI 中捕获会扫描/重写会话级大表的“批量数据更新迁移”，降低“schema-only”变更引入更新风险；关闭 #205079，修复 scheduled coverage 对 skill 自测的遗漏。[#205036](https://github.com/openclaw/openclaw/pull/205036)｜[#205022](https://github.com/openclaw/openclaw/pull/205022)｜[#205079](https://github.com/openclaw/openclaw/pull/205079)
- **Participate 会话参与功能开始落地**：第 1 部分“存储 session member access levels 并增加 Participate 协议”已合入 main（`5e5ecba`），后续参与者限制与 exec approval 继续以 PR 栈推进。[#204783](https://github.com/openclaw/openclaw/pull/204783)｜[#204847](https://github.com/openclaw/openclaw/pull/204847)｜[#204858](https://github.com/openclaw/openclaw/pull/204858)
- **更新路径与回滚安全性**：多个 PR 围绕“更新所有权”“兼容数据库变更回滚”“保留 live included configs”“pnpm 更新修复”推进，说明更新可靠性已成为发布线重点。[#204866](https://github.com/openclaw/openclaw/pull/204866)｜[#204956](https://github.com/openclaw/openclaw/pull/204956)｜[#204979](https://github.com/openclaw/openclaw/pull/204979)｜[#205078](https://github.com/openclaw/openclaw/pull/205078)
- **上下文引擎容错**：PR #204983/#204985 试图避免子代理 hook 的瞬时失败（如 `SQLITE_BUSY`）导致整个 context engine 被 quarantine，属于对长会话/子代理稳定性的直接修复。[#204983](https://github.com/openclaw/openclaw/pull/204983)｜[#204985](https://github.com/openclaw/openclaw/pull/204985)
- **渠道与 UI 修复**：WhatsApp 网关路由回复写入聊天历史、WebUI Talk 设置页重设计、云配置输入在 catalog 更新时保持等 PR 在评审，覆盖真实用户体验细节。[#204090](https://github.com/openclaw/openclaw/pull/204090)｜[#205068](https://github.com/openclaw/openclaw/pull/205068)｜[#205083](https://github.com/openclaw/openclaw/pull/205083)

**推进程度评估**：发布工程与更新路径有实质进展，Participate 功能栈开始落地，CI 对更新迁移的防回归能力增强。但核心 Gateway 稳定性 P0 尚未闭环，PR 待合并仍有 226 条，XL/安全敏感/兼容性 PR 增多，评审吞吐是下一阶段关键。

## 4. 社区热点

### Issues 热点：稳定性与更新可靠性占据讨论中心

| Issue | 评论 | 状态/级别 | 核心诉求 |
|---|---:|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) Gateway blocks for minutes while capturing large external plugins | 87 | OPEN，P0，crash-loop，2026.9.6 回归 | 插件捕获不能在 Gateway 主线程同步阻塞；需要异步化/隔离与事件循环保护 |
| [#164294](https://github.com/openclaw/openclaw/issues/164294) Gateway state DB WAL auto-checkpoint never completes | 43 | OPEN，P2 | in-process reader 钉住 WAL checkpoint，状态数据库可靠性受质疑 |
| [#197083](https://github.com/openclaw/openclaw/issues/197083) Post-install Doctor WAL publication verification leaves 11.3 update partially finalized | 39 | OPEN，P0，release-blocker | 更新后完整性验证失败后的恢复/回滚语义不清晰 |
| [#170956](https://github.com/openclaw/openclaw/issues/170956) Windows slow startup, unclean plugin shutdown, schtasks permission error | 34 | OPEN，P0，crash-loop，release-blocker | Windows 作为一等平台的启动、关闭、更新可靠性 |
| [#178359](https://github.com/openclaw/openclaw/issues/178359) doctor --fix --non-interactive idles 15+ min | 32 | OPEN，P1，crash-loop | Doctor 挂起且无输出，诊断工具可观测性不足 |
| [#150635](https://github.com/openclaw/openclaw/issues/150635) short-term recall retention evicts recalled entries nightly | 31 | OPEN，P2，data-loss | 记忆/梦境晋升管线在容量上限下失效 |
| [#126360](https://github.com/openclaw/openclaw/issues/126360) AgentSelectionRequiredError floods logs | 22 | OPEN，P2 | 显式多 agent 所有权下缺少默认 agentId 导致日志洪泛 |
| [#143017](https://github.com/openclaw/openclaw/issues/143017) Prompt-cache: five ways a persistent session rewrites its prefix | 20 | OPEN，P2 | 长会话 prompt-cache 前缀重写带来 21.3M cache-write tokens 成本 |

**分析**：社区最强烈的诉求不是“更多功能”，而是“别把已有安装弄坏”。高评论 Issue 集中在 Gateway 卡死、WAL/状态数据库、Windows 更新、Doctor 挂起和更新后完整性校验，说明用户对“更新可靠性 + 状态数据库 + 平台一致性”的容忍度已接近临界。多个 P0/P1 长期没有 fix PR，会放大社区焦虑。

### PR 热点：大 PR 集中在 Agent Profiles、Participate、更新路径与安全评审
PR 评论数未提供，无法按评论数排序；按规模、风险和评审状态，今日热点包括：

- **Agent Profiles 小模型适配**：XL 级 PR #202517、#204132、#204133，目标是给小上下文本地模型自动选择 lean profile，涉及兼容性与安全评审，是路线图级变更。[#202517](https://github.com/openclaw/openclaw/pull/202517)｜[#204132](https://github.com/openclaw/openclaw/pull/204132)｜[#204133](https://github.com/openclaw/openclaw/pull/204133)
- **Participate 会话参与栈**：#204847 携带并强制执行参与者限制，#204858 将 participant exec approvals 发送给会话创建者。[#204847](https://github.com/openclaw/openclaw/pull/204847)｜[#204858](https://github.com/openclaw/openclaw/pull/204858)
- **更新路径与数据库回滚**：#204866 保持安装与更新所有者一致，#204956/#204957 支持跨兼容数据库变更回滚/回移，#204979 保留 live included configs。[#204866](https://github.com/openclaw/openclaw/pull/204866)｜[#204956](https://github.com/openclaw/openclaw/pull/204956)｜[#204957](https://github.com/openclaw/openclaw/pull/204957)｜[#204979](https://github.com/openclaw/openclaw/pull/204979)
- **Gateway 响应性修复**：#204977 试图在异步 provider discovery 期间保持 Gateway 响应，与 #166641 的 `web_fetch` 冷回退阻塞问题方向一致。[#204977](https://github.com/openclaw/openclaw/pull/204977)｜[#166641](https://github.com/openclaw/openclaw/issues/166641)
- **安全敏感变更**：#205082 重构 gateway owner 规则，标签含 `security-sensitive-changed`、P1，需重点评审。[#205082](https://github.com/openclaw/openclaw/pull/205082)

## 5. Bug 与稳定性

以下为今日仍活跃或更新的高严重度问题，按 P0 → P1 排列。标注“暂无新 fix PR”依据 Issue 标签 `clawsweeper:no-new-fix-pr`；未显示关联 PR 的标注“未见明确 fix PR”。

### P0

| Issue | 影响 | fix PR 状态 |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) Gateway 捕获大型外部插件时阻塞数分钟 | 2026.9.6 回归；事件循环卡死，健康检查/WS 心跳/请求受影响；87 评论 | 暂无新 fix PR，需维护者评审 |
| [#197083](https://github.com/openclaw/openclaw/issues/197083) 安装后 Doctor WAL publication 校验失败，11.3 更新部分 finalized | 更新完整性/回滚语义受损，release-blocker | 暂无新 fix PR |
| [#170956](https://github.com/openclaw/openclaw/issues/170956) Windows 启动慢、插件关闭不干净、schtasks 权限错误 | 重启/更新经常失败，偶发客户端断连；release-blocker | 暂无新 fix PR |
| [#160386](https://github.com/openclaw/openclaw/issues/160386) 大 session store 导致 SQLite I/O 压力、WebUI RPC 超时、`STATE_DATABASE_READ_ADMISSION_INVALIDATED` | 大状态库用户可能不可用；release-blocker | 暂无新 fix PR，且 needs-info |
| [#137177](https://github.com/openclaw/openclaw/issues/137177) 内置 `@wecom/wecom-openclaw-plugin` 无法安装 | 渠道插件安装链路阻断；release-blocker | 暂无新 fix PR |

**已关闭 P0 待验证**：[#160548](https://github.com/openclaw/openclaw/issues/160548) prepared-model-catalog worker 约每 5 分钟泄漏 1 GiB，已 CLOSED。建议发布说明或回归测试确认修复版本与验证条件。

### P1

| Issue | 影响 | fix PR 状态 |
|---|---|---|
| [#178359](https://github.com/openclaw/openclaw/issues/178359) `doctor --fix --non-interactive` 空闲 15+ 分钟无输出 | 诊断/修复流程不可用，macOS 复现 | 未见明确 fix PR |
| [#196199](https://github.com/openclaw/openclaw/issues/196199) 2026.10.10 后 Codex helper 完成无法恢复父会话 | 目标暂停，用户被锁在助手外；message-loss/session-state | 未见明确 fix PR |
| [#140010](https://github.com/openclaw/openclaw/issues/140010) Windows 睡眠/恢复后 UI/WebSocket 重连失败 30–60s+ | 笔记本场景高频不可用 | 暂无新 fix PR |
| [#190307](https://github.com/openclaw/openclaw/issues/190307) Gateway 重启后多 agent 永久 degraded（admission timeout） | 35 agents 场景；修复提示指向完整 `doctor --fix` | 暂无新 fix PR，needs-live-repro |
| [#134993](https://github.com/openclaw/openclaw/issues/134993) Gateway 单核 100% busy loop（文件系统发现） | 大型 skill/agent 集群下崩溃/卡死 | 暂无新 fix PR |
| [#138272](https://github.com/openclaw/openclaw/issues/138272) Android Talk 在任务型回合掉线 “no live response owner” | 实时语音可用性；跨多个版本确认 | 暂无新 fix PR |
| [#166641](https://github.com/openclaw/openclaw/issues/166641) `web_fetch` 冷回退同步捕获插件，Gateway liveness stall | 主线程阻塞，影响健康检查/心跳 | 标签显示有 linked PR 打开，相关评审中：[#204977](https://github.com/openclaw/openclaw/pull/204977) |
| [#160522](https://github.com/openclaw/openclaw/issues/160522) prepared-model-catalog worker isolate 达 1.15 GB，超出 512 MB 限制 | 内存压力与回收抖动 | 标签显示有 linked PR 打开 |
| [#55792](https://github.com/openclaw/openclaw/issues/55792) Gateway 重启后漏收的 inbound 消息不会补拉 | message-loss，长期 P1 | 暂无新 fix PR |

**P2/P3 摘要**：WAL checkpoint 被 reader 钉住（[#164294](https://github.com/openclaw/openclaw/issues/164294)）、read-only state DB 每次读复制整库（[#170496](https://github.com/openclaw/openclaw/issues/170496)）、compaction 120s idle timeout 覆盖配置预算（[#197374](https://github.com/openclaw/openclaw/issues/197374)）、Discord Components V2 编辑丢组件（[#165615](https://github.com/openclaw/openclaw/issues/165615)）、PDF 扫描件无 vision model 不可达（[#143375](https://github.com/openclaw/openclaw/issues/143375)）等仍在活跃。

## 6. 功能请求与路线图信号

### 已有 PR 支撑，较可能进入近期版本或分阶段落地

- **更新路径与回滚兼容（高信号）**：与多个更新类 Issue 直接对应，PR #204866、#204956、#205078、#204979 正在推进。若评审通过，可能进入下一轮稳定版/补丁版。[#204866](https://github.com/openclaw/openclaw/pull/204866)｜[#204956](https://github.com/openclaw/openclaw/pull/204956)｜[#205078](https://github.com/openclaw/openclaw/pull/205078)
- **上下文引擎容错（中高信号）**：#204983/#204985 体量较小，针对 subagent hook 失败导致 engine quarantine，修复价值明确。[#204983](https://github.com/openclaw/openclaw/pull/204983)｜[#204985](https://github.com/openclaw/openclaw/pull/204985)
- **WhatsApp 回复历史一致性（中信号）**：#204090 修复 Control UI 只显示 tool call 而 WhatsApp 用户已收到回复的问题，属于渠道体验修复。[#204090](https://github.com/openclaw/openclaw/pull/204090)
- **Agent Profiles 小模型适配（中信号，但评审重）**：#202517/#204132/#204133 是 XL 级 PR，涉及兼容性、安全评审与依赖变更，可能分阶段进入后续版本，不宜视为下一版必达。[#202517](https://github.com/openclaw/openclaw/pull/202517)｜[#204132](https://github.com/openclaw/openclaw/pull/204132)
- **Participate 会话参与（中信号，分阶段）**：第 1 部分已合并，后续 #204847/#204858 在栈上推进，可能按阶段进入近期版本。[#204847](https://github.com/openclaw/openclaw/pull/204847)｜[#204858](https://github.com/openclaw/openclaw/pull/204858)
- **cron / sessions_send 准入（中低信号）**：#204019 将命令任务与 agent heartbeat 启动解耦；#194376 为 `sessions_send` wake 增加网关准入边界。影响面大，需继续观察。[#204019](https://github.com/openclaw/openclaw/pull/204019)｜[#194376](https://github.com/openclaw/openclaw/pull/194376)

### 仍处需求讨论，短期不确定性较高

- **MCP Events 消费并触发 agent run**：让 OpenClaw 订阅 MCP server 事件并按事件启动 agent，类似 hooks 映射。目前未见直接实现 PR。[#166586](https://github.com/openclaw/openclaw/issues/166586)
- **前台 WebChat 可执行 checkpoint / bounded yield**：长任务在静默时间或工具调用预算后发布状态并让出，属于运行时策略需求。[#138990](https://github.com/openclaw/openclaw/issues/138990)
- **Teams SharePoint 动态解析**：避免硬编码 `sharePointSiteId`，提升 Teams 文件上传体验。[#136271](https://github.com/openclaw/openclaw/issues/136271)
- **Skill Workshop 上下文预算/跳过策略**：超大 session 下避免 Experience Review 复用前台上下文造成过载。[#150238](https://github.com/openclaw/openclaw/issues/150238)
- **Telegram sendDice**：调用原生动画骰子并从 tool result 读取结果。[#137110](https://github.com/openclaw/openclaw/issues/137110)
- **usage footer 暴露 auth profile**：让 `/usage full` 展示实际服务该回合的 auth profile，与 `/status` 对齐。[#169428](https://github.com/openclaw/openclaw/issues/169428)
- **重启后补拉漏收消息**：P1、长期存在，若实现对 message-loss 价值高，但目前无 fix PR。[#55792](https://github.com/openclaw/openclaw/issues/55792)
- **跨 provider cron fallback 授权**：Issue #192009 已 CLOSED，路线图信号减弱，需确认关闭原因与是否被其他方案吸收。[#192009](https://github.com/openclaw/openclaw/issues/192009)

## 7. 用户反馈摘要

**真实痛点**

- **“更新把安装弄坏”是最强负反馈**：WAL publication 校验失败导致更新部分 finalized（[#197083](https://github.com/openclaw/openclaw/issues/197083)）；Windows package-swap 失败（[#200756](https://github.com/openclaw/openclaw/issues/200756)）；pnpm 二次更新失败（[#205078](https://github.com/openclaw/openclaw/pull/205078)）；heartbeat 退役配置移除后反而重新启用（[#200224](https://github.com/openclaw/openclaw/issues/200224)）。用户需要的是“可恢复、可回滚、可解释”的更新。
- **Gateway 卡住/不可用是核心稳定性焦虑**：大插件捕获（[#160959](https://github.com/openclaw/openclaw/issues/160959)）、`web_fetch` 冷回退（[#166641](https://github.com/openclaw/openclaw/issues/166641)）、provider discovery（[#204977](https://github.com/openclaw/openclaw/pull/204977)）、CPU busy loop（[#134993](https://github.com/openclaw/openclaw/issues/134993)）都指向主线程/事件循环保护不足。
- **状态数据库是系统性风险**：WAL checkpoint 永不完成（[#164294](https://github.com/openclaw/openclaw/issues/164294)）、每次 read 复制整库（[#170496](https://github.com/openclaw/openclaw/issues/170496)）、大 session store I/O 压力（[#160386](https://github.com/openclaw/openclaw/issues/160386)）、worker 内存超限（[#160522](https://github.com/openclaw/openclaw/issues/160522)）。用户在大规模 agent/session 下感受明显。
- **Windows 体验仍不一致**：schtasks 权限、启动慢、插件关闭不干净、sleep/resume 重连 30–60s（[#170956](https://github.com/openclaw/openclaw/issues/170956)｜[#140010](https://github.com/openclaw/openclaw/issues/140010)）。Windows 用户对“更新/重启可靠性”不满集中。
- **长会话成本与压缩质量**：prompt-cache 前缀重写造成 21.3M cache-write tokens（[#143017](https://github.com/openclaw/openclaw/issues/143017)）；compaction 的 120s idle timeout 覆盖配置预算且质量守卫不解释原因（[#197374](https://github.com/openclaw/openclaw/issues/197374)）。
- **多 agent 与实时语音细节**：`AgentSelectionRequiredError` 日志洪泛（[#126360](https://github.com/openclaw/openclaw/issues/126360)）；Android Talk 任务回合掉线（[#138272](https://github.com/openclaw/openclaw/issues/138272)）；Codex helper 无法恢复父会话导致用户被锁（[#196199](https://github.com/openclaw/openclaw/issues/196199)）。

**使用场景**

- Windows 笔记本频繁睡眠/恢复、macOS LaunchAgent 服务、npm/pnpm 全局安装。
- 显式多 agent 所有权、35 agents、大 SQLite store（1–284 MB，单 session 113 MB/19.8k events）。
- cron 自动化、Skill Workshop/记忆梦境、长会话压缩、本地小上下文模型（32K 窗口）。
- WhatsApp、Teams、Discord、Telegram、Android Talk、Google Meet 等多渠道/实时语音场景。

**满意与不满意**

- 满意：用户提供了高质量生产复现、wire capture、V8 CPU profile、SQLite schema 与测量数据；维护者/机器人标签体系细致，问题可追踪；部分修复 PR 已开（如 #204977、#204983、#204985、#205078）。
- 不满意：高评论 P0/P1 长期无 fix PR；`stale` 标签覆盖多个 P1/P0；更新类问题反复出现；发布摘要信息有限，用户难以判断升级风险。整体情绪是“认可项目能力，但对升级与长时间运行的可靠性缺乏安全感”。

## 8. 待处理积压

**Issue 积压：长期活跃且影响大的条目**

| Issue | 年龄/状态 | 为什么需要关注 |
|---|---|---|
| [#55792](https://github.com/openclaw/openclaw/issues/55792) 重启后补拉漏收 inbound 消息 | 2026-03-27，P1，stale，11 评论 | 最老 P1 之一，message-loss，长期无 fix PR |
| [#126360](https://github.com/openclaw/openclaw/issues/126360) AgentSelectionRequiredError 日志洪泛 | 2026-08-19，P2，22 评论 | 显式多 agent 场景常见，需产品决策 |
| [#134993](https://github.com/openclaw/openclaw/issues/134993) Gateway 单核 busy loop | 2026-09-01，P1，13 评论 | 大型 skill/agent 集群下崩溃/卡死，无 fix PR |
| [#137177](https://github.com/openclaw/openclaw/issues/137177) WeCom 内置插件无法安装 | 2026-09-03，P0，11 评论 | P0 release-blocker，渠道安装链路阻断 |
| [#140010](https://github.com/openclaw/openclaw/issues/140010) Windows sleep/resume 重连失败 | 2026-09-06，P1，18 评论 | Windows 高频场景，无 fix PR |
| [#143017](https://github.com/openclaw/openclaw/issues/143017) Prompt-cache 前缀重写 | 2026-09-09，P2，20 评论 | 长会话成本问题，需产品/架构决策 |
| [#150635](https://github.com/openclaw/openclaw/issues/150635) 短期记忆 nightly eviction 导致梦境不晋升 | 2026-09-17，P2，31 评论 | 记忆学习管线核心行为，评论多、无 fix PR |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) 大插件捕获阻塞 Gateway | 2026-09-29，P0，87 评论 | 今日最热 P0，crash-loop，仍无新 fix PR |
| [#164294](https://github.com/openclaw/openclaw/issues/164294) WAL checkpoint 永不完成 | 2026-10-03，P2，43 评论 | 状态数据库可靠性，43 评论仍无 fix PR |
| [#170956](https://github.com/openclaw/openclaw/issues/170956) Windows 启动/关闭/更新不可靠 | 2026-10-13，P0，34 评论 | P0 release-blocker，Windows 用户核心痛点 |

**PR 积压：评审队列中的关键项**

| PR | 状态 | 提醒 |
|---|---|---|
| [#176964](https://github.com/openclaw/openclaw/pull/176964) 防止后台摘要延迟新消息回复 | 2026-10-19，P2，`r: too-many-prs`，waiting maintainer | 用户可感知延迟，等待维护者分诊 |
| [#160516](https://github.com/openclaw/openclaw/pull/160516) 远程浏览器标签健康检查超时后保持可用 | 2026-09-28，stale，waiting author | 长期等待作者，建议明确推进或关闭 |
| [#202517](https://github.com/openclaw/openclaw/pull/202517) Agent Profiles（XL） | OPEN，兼容性/安全评审，依赖变更 | 路线图级变更，需专门评审资源，避免长期悬空 |
| [#204132](https://github.com/openclaw/openclaw/pull/204132) 按模型规模自动选择 Agent Profile（XL） | OPEN，`merge-risk: compatibility`，needs proof | 与 #202517 同主题，建议合栈评审 |
| [#204019](https://github.com/openclaw/openclaw/pull/204019) cron 命令任务与 agent heartbeat 解耦 | OPEN，超大标签面，P? | 影响 cron 可靠性，需明确优先级 |
| [#194376](https://github.com/openclaw/openclaw/pull/194376) `sessions_send` wake 准入 | OPEN，跨大量渠道/扩展标签 | 涉及并发与限流边界，需安全/架构评审 |

**维护建议**：当前 226 条 PR 待合并，建议优先分诊：① P0/P1 稳定性 fix PR（如 #204977、#204983、#204985、#205078）；② 安全敏感 PR（#205082）；③ 兼容性 XL PR（#202517/#204132）建立明确评审 owner；④ 对长期 `stale` 的 P0/P1 Issue 给出 owner、降级或关闭理由，避免高评论问题持续无响应。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告  
**数据窗口：2026-11-24 至 2026-11-25｜核心参照：OpenClaw**

> 口径说明：各项目数据源不完全一致；DeepSeek Harness 未启用 Issues/PR，仅有 Discussions，横向对比时需降权处理。以下“活跃度”以 GitHub 更新量为代理指标，不等同于真实用户规模。

---

## 1. 生态全景

个人 AI 助手与自主智能体开源生态仍处于高强度迭代期，但竞争重心正从“功能扩张”转向“可靠性、可回滚、可观测与安全治理”。头部项目 OpenClaw 与 hermes-agent 均达到 500 级 Issue/PR 日更新、双版本发布或发布后收敛的高吞吐状态；第二梯队则在架构迁移、Beta 质量修复和多平台适配中加速追赶。共性痛点高度集中：状态数据库/WAL、Gateway 事件循环阻塞、Windows 更新与重启、静默失败、多租户隔离、沙箱资源限制和长会话成本。插件生态与多 Agent/多租户配置语义成为下一阶段差异化关键。整体判断：**生态活跃度高，但“可用性与信任”正在取代“功能数量”成为项目成熟度的分水岭。**

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 500（活跃 429 / 关闭 71，关闭率 14.2%） | 500（待合 226 / 合并关闭 274） | 2 个：v2026.11.8、v2026.11.9 | 高活跃、强发布节奏；但 P0/P1 稳定性问题长期未闭环，评审与 Issue 关闭承压 |
| **hermes-agent** | 375（活跃 325 / 关闭 50，关闭率 13%） | 500（待合 380 / 合并关闭 120） | 2 个：v0.23.4、canary | 发布后高吞吐收敛期；v0.23.4 打包约 229 PR，审查与关闭能力是瓶颈 |
| **Zeroclaw** | 9（新增 3、关闭 0） | 50（待合 42 / 合并关闭 8，约 84% 待合） | 0 | 高活跃架构重构期；V5 注册表与 ACP 迁移推进，但 XL 堆叠 PR 滞留 |
| **QwenPaw** | 20（活跃 16 / 关闭 4，关闭率 20%） | 43（待合 31 / 合并关闭 12，约 72% 待合） | 0 | 高活跃 Beta 质量修复；安全、多租户、沙箱资源限制议题集中上升 |
| **AstrBot** | 13（活跃 3 / 关闭 10，关闭率 77%） | 38（待合 19 / 合并关闭 19） | 0 | 高活跃维护日；Issue 清理快，但平台适配“静默失败”和 PR 积压仍需关注 |
| **PicoClaw** | 1 | 4（全部 CLOSED，待合 0） | 0 | 低至中等活跃，偏维护清理；长期 PR 关闭是正向信号，QQ 依赖回归需优先处理 |
| **DeepSeek Harness** | 不适用（未启用 Issues） | 不适用（未启用 PR） | 0 | Discussions 更新 114 条，社区讨论活跃但官方发布静默；Windows 稳定性与静默失败风险累积 |
| **AstrBot** | 13 | 38 | 0 | 高活跃维护日；Issue 关闭率 77%，平台适配可靠性是主要风险 |
| **PicoClaw** | 1 | 4 | 0 | 低活跃维护清理；QQ channel 依赖回归为高优先级 |
| **DeepSeek Harness** | Discussions 114 | 未启用 | 0 | 社区热度高、插件生态活跃；官方合并进展不可观测，Windows 崩溃/上传失效风险高 |

> 注：AstrBot/PicoClaw/DeepSeek 已在表中重复列示，实际使用时可合并；此处保留以突出不同数据源。更紧凑版本如下：

| 项目 | Issues 更新 | PR 更新 | Release | 健康度 |
|---|---:|---:|---|---|
| OpenClaw | 500（关闭率 14.2%） | 500（待合 226） | 2 | 高活跃强发布，稳定性与评审承压 |
| hermes-agent | 375（关闭率 13%） | 500（待合 380） | 2 | 高吞吐发布后收敛，审瓶颈明显 |
| Zeroclaw | 9 | 50（84% 待合） | 0 | 架构重构期，XL 堆叠 PR 滞留 |
| QwenPaw | 20（关闭率 20%） | 43（72% 待合） | 0 | Beta 质量修复，安全议题上升 |
| AstrBot | 13（关闭率 77%） | 38（50% 待合） | 0 | 维护响应快，平台静默失败风险 |
| PicoClaw | 1 | 4（全部关闭） | 0 | 低活跃维护清理，QQ 回归需处理 |
| DeepSeek Harness | Discussions 114 | 未启用 | 0 | 社区热、官方静默，Windows 风险 |

---

## 3. OpenClaw 在生态中的定位

**优势：生态规模与发布吞吐处于第一梯队。**  
OpenClaw 单日 Issue/PR 更新均达 500 条，v2026.11.8 包含 314 commits、210 PR、86 contributors，v2026.11.9 快速小修，发布工程能力明显强于第二梯队。与 hermes-agent 同属 500 级 PR/Issue、双 Release 的头部项目；QwenPaw（43 PR/20 Issue）、Zeroclaw（50/9）、AstrBot（38/13）、PicoClaw（4/1）均小一个数量级。DeepSeek Harness 虽有 114 条 Discussions，但无公开 Issue/PR/Release，不可直接等同。

**技术路线差异：Gateway 中心化 + 状态数据库 + 更新可回滚。**  
OpenClaw 围绕 Gateway、SQLite/WAL 状态库、插件捕获隔离、更新所有权/回滚、Agent Profiles 小模型适配、Participate 会话参与推进，路线更偏“个人 AI 助手全栈运行时 + 多渠道路由 + 发布工程”。hermes-agent 同样走统一网关，但更强调生产多代理编排、桌面分发、自改进代理治理；Zeroclaw 偏 Rust 运行时、OIDC 身份、Provider Registry V5 与 ACP；QwenPaw 偏 AgentScope 生态、Creator 插件与沙箱/多租户安全；AstrBot 偏多聊天平台机器人与插件生态。

**社区规模对比与隐忧：体量大，但稳定性闭环不足。**  
OpenClaw 最高讨论 Issue #160959 达 87 评论，P0 Gateway 阻塞、WAL 校验、Windows 更新、Doctor 挂起等高优问题长期活跃；Issue 关闭率仅 14.2%，多个 P0/P1 无新 fix PR。相比 AstrBot 当日 Issue 关闭率 77%，OpenClaw 的“开发吞吐强、核心稳定性待闭环”特征更明显。其生态位是**头部参照项目**，但成熟度受可靠性债务约束。

---

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **更新可靠性与可回滚** | OpenClaw、hermes-agent、QwenPaw、DeepSeek Harness | OpenClaw 关注 WAL 校验、Windows package-swap、pnpm 二次更新、Doctor 恢复语义；hermes 关注网关欠重启与发布后收敛；QwenPaw 关注 Windows 孤儿进程；DeepSeek 关注 Windows 启动崩溃 |
| **静默失败与错误语义** | OpenClaw、Zeroclaw、QwenPaw、AstrBot、DeepSeek Harness、hermes | Zeroclaw `/model` 谎报成功、MCP outcome-unknown、IMAP 不回写 Seen；QwenPaw MCP 4xx 误报“未连接”；AstrBot `weixin_oc` 返回 ret:0 但无 message_id；DeepSeek reasoning-only 空回复、标题不更新；hermes 上下文静默降级、备份跳过 |
| **状态数据库 / 存储可靠性** | OpenClaw、Zeroclaw、hermes、QwenPaw、DeepSeek Harness | OpenClaw SQLite WAL checkpoint 永不完成、大 session store I/O；Zeroclaw 讨论 Turso 可选后端；hermes BLOB 兼容、增量写入；QwenPaw 记忆检索租户隔离；DeepSeek usage/session 日志不可审计 |
| **安全默认值与权限模型先行** | QwenPaw、Zeroclaw、hermes、OpenClaw | QwenPaw 技能扫描 CRITICAL 仍安装、沙箱资源限制未执行、租户隔离依赖目录约定；Zeroclaw browser 工具受权限模型阻塞，需拆分用户名/密码/TOTP 授权；hermes 配置写保护绕过、记忆隔离、审批锁定；OpenClaw security-sensitive owner 规则与 Participate exec approvals |
| **多 Agent / 多租户配置语义** | OpenClaw、QwenPaw、AstrBot、hermes、PicoClaw、Zeroclaw | OpenClaw Agent Profiles 与小模型 lean profile；QwenPaw Console 模型配置缺 agent 作用域；AstrBot 多配置文件插件黑白名单隔离；hermes 按会话/用户记忆隔离；PicoClaw 多智能体协作 WIP；Zeroclaw 单连接服务多模型配置 |
| **HITL 与可控性** | QwenPaw、OpenClaw、hermes | QwenPaw `ask_user_question` 结构化提问；OpenClaw Participate 参与者限制与 exec approval；hermes 可配置审批锁定命令模式 |
| **成本可审计与缓存友好** | OpenClaw、AstrBot、hermes、DeepSeek Harness | OpenClaw prompt-cache 前缀重写造成 21.3M cache-write tokens；AstrBot 希望默认不破坏 DeepSeek 缓存；hermes 模型选择器展示价格；DeepSeek 2,717 次搜索产生 2,877 万 token / ¥68.30 且日志无 usage 记录 |
| **插件生态与分发产品化** | DeepSeek Harness、AstrBot、QwenPaw、hermes、Zeroclaw | DeepSeek 插件 Showcase 活跃；AstrBot 插件 WebUI 通知与发送回执；QwenPaw Creator 2.0.7；hermes 插件可靠性修复；Zeroclaw bf16.ai、SimpleX、provider 注册表扩张 |
| **跨平台一致性，尤其 Windows** | OpenClaw、QwenPaw、hermes、DeepSeek Harness | OpenClaw Windows 启动/关闭/更新不可靠；QwenPaw `llama-server.exe` 孤儿进程；hermes Windows TicketBridge 与重复渲染；DeepSeek Windows 启动崩溃、图片上传 100% 失败 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 全栈个人 AI 助手、多渠道路由、Gateway 稳定性、更新路径、Agent Profiles、Participate | 高级个人用户、自托管多平台用户、插件开发者 | Gateway 中心化 + SQLite/WAL 状态库 + 发布更新所有权/回滚 + 插件隔离；强调发布工程与运行时可靠性 |
| **hermes-agent** | 生产多代理编排、统一网关、桌面分发、自改进代理治理、多平台消息 | 生产级多代理用户、桌面用户、自托管/企业 | 统一网关收敛本地会话 + 桌面打包签名/公证 + curator 限制自动写 skill；偏“可运营的 Agent 平台” |
| **Zeroclaw** | Rust 运行时、OIDC 身份、Provider Registry V5、ACP 会话、SimpleX/多通道 | 注重安全身份、架构可维护性的开发者 | Rust crates、Provider 注册表重构、ACP 替代 `/ws/chat`、OIDC refresh grant；偏底层架构与身份体系 |
| **QwenPaw** | AgentScope 生态、Creator 插件、沙箱、多租户、Console 多 Agent 配置 | 企业/多租户自托管、插件评审与内容创作用户 | 插件质量修复 + Beta 迭代 + 沙箱文件隔离 + 安全治理；当前安全默认值与资源限制是短板 |
| **AstrBot** | 多聊天平台机器人、插件生态、微信/QQ/Telegram/Lark 适配、WebUI 管理 | Bot 运营者、多平台聊天机器人开发者 | 适配器/插件/WebUI + 多配置文件；平台发送回执与静默失败治理是关键 |
| **PicoClaw** | 轻量硬件/嵌入式场景、QQ channel、Skills 安装 | Sipeed 硬件用户、轻量 QQ 机器人用户 | 轻量依赖、维护型节奏；多智能体 WIP 已关闭，功能交付偏弱 |
| **DeepSeek Harness** | 桌面 Harness、插件化、多文件夹工作区、可视化设计插件、代码索引 | 桌面 AI 编程用户、插件开发者 | Electron 桌面 + 插件 Showcase + Discussions 驱动；官方 Release 可见度低，Windows 稳定性待补 |

---

## 6. 社区热度与成熟度

**第一层：高强度双核，快速迭代但审查/稳定性承压。**  
OpenClaw 与 hermes-agent 均达到 500 级 PR/Issue 更新、2 个 Release，属于生态头部。OpenClaw 强在发布吞吐、贡献者规模与多平台运行时，但 Issue 关闭率 14.2%，P0/P1 长期无 fix PR；hermes-agent 强在统一网关与桌面分发，但 Issue 关闭率 13%、待合 PR 380 条，发布后收敛压力大。

**第二层：架构迁移与质量巩固并行。**  
Zeroclaw 处于 V5 Provider Registry 与 ACP 迁移期，50 PR 中 42 条待合，XL 堆叠链滞留 10 天；QwenPaw 处于 Beta 质量修复期，安全、多租户、沙箱资源限制议题集中；AstrBot 处于高活跃维护日，Issue 关闭率 77%，但微信/WeCom 静默失败与发送回执问题突出。

**第三层：低吞吐维护与特殊社区型项目。**  
PicoClaw 单日仅 1 Issue、4 PR 且全部关闭，属于积压清理型维护；QQ channel resty 回归是当前最高优先级。DeepSeek Harness 呈现“社区热、官方静默”的特殊形态：114 条 Discussions、插件 Showcase 活跃，但无 Release/PR 可见进展，Windows 崩溃与上传失效正在累积口碑风险。

**成熟度判断：**  
- **快速迭代阶段**：OpenClaw、hermes-agent、Zeroclaw、QwenPaw、AstrBot。  
- **质量巩固/维护阶段**：hermes 发布后收敛、QwenPaw Beta 质量修复、AstrBot 维护清理、PicoClaw 积压治理、OpenClaw 发布线稳定性闭环。  
- **生态规模领先但可靠性债务需偿还**：OpenClaw、hermes-agent。  
- **架构与安全治理尚在早期**：Zeroclaw、QwenPaw。  
- **平台适配成熟但静默失败风险高**：AstrBot。  
- **社区插件活跃、官方可见度低**：DeepSeek Harness。

---

## 7. 值得关注的趋势信号

1. **“可靠性即功能”成为共识。**  
   多项目高优问题集中在 Gateway 阻塞、WAL/状态库、Windows 更新、Doctor 挂起、孤儿进程和上传失败。对开发者而言，事件循环隔离、异步化、状态库 checkpoint、更新回滚和跨平台回归测试应作为一级架构能力，而非发布后补丁。

2. **静默失败是信任杀手。**  
   Zeroclaw `/model` 谎报成功、MCP outcome-unknown、IMAP 不回写 Seen；QwenPaw MCP 4xx 误报未连接；AstrBot 下行 ret:0 但无 message_id；DeepSeek reasoning-only 空回复；hermes 上下文静默降级。趋势是：**错误语义、usage 记录、发送回执、失败可恢复路径**将与功能同等重要。

3. **安全默认值与权限模型必须先行。**  
   QwenPaw 技能扫描 CRITICAL 仍安装、沙箱资源限制未执行、租户隔离依赖目录约定；Zeroclaw browser 工具受权限模型阻塞；hermes 记忆隔离与审批锁定；OpenClaw security-sensitive owner 规则。行业信号明确：**先建权限与隔离模型，再放开能力面**，尤其是浏览器自动化、插件安装、多租户记忆和 exec approval。

4. **多 Agent/多租户配置语义正在成为产品分水岭。**  
   OpenClaw Agent Profiles、QwenPaw agent-scoped model、AstrBot 多配置插件隔离、hermes 按会话/用户记忆隔离、Zeroclaw 单连接多模型。用户不再满足“全局配置”，而要求按 Agent、会话、租户、渠道维度隔离与审计。

5. **成本可审计与缓存友好进入核心体验。**  
   OpenClaw prompt-cache 前缀重写造成 21.3M cache-write tokens；AstrBot 用户用 DeepSeek 日志要求默认缓存友好；hermes 模型选择器展示价格；DeepSeek Harness 出现 2,877 万 token / ¥68.30 但日志无 usage 的信任问题。**Token 成本透明、缓存命中默认化、usage 可导出**将成为 Agent 平台的基础能力。

6. **插件生态从“能装”走向“产品化分发与治理”。**  
   DeepSeek Harness 插件 Showcase、AstrBot 插件 WebUI 通知与发送回执、QwenPaw Creator 2.0.7、hermes 插件可靠性、Zeroclaw Provider/Channel 扩张。下一阶段竞争点不是插件数量，而是**插件契约、权限、回执、版本兼容与分发入口**。

7. **Windows 与桌面分发仍是普遍短板。**  
   OpenClaw Windows 更新/重启、QwenPaw `llama-server.exe` 孤儿进程、hermes Windows TicketBridge/重复渲染、DeepSeek Harness Windows 启动崩溃与图片上传失效。对面向个人用户的 AI 助手项目，Windows 一等公民支持与安装/更新/残留进程治理将直接影响留存。

**对 AI 智能体开发者的参考：**  
把可观测性、错误语义、回滚机制、资源限制、租户隔离、HITL 和成本审计纳入早期架构；避免主线程同步阻塞与静默降级；对插件、MCP、多 Agent 配置建立明确契约。功能迭代可以快，但**信任与可恢复性必须前置**。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目日报 · 2026-11-25

> 数据窗口：2026-11-24 → 2026-11-25（UTC）｜数据源：GitHub API 快照

---

## 1. 今日速览

- **整体活跃度：高。** 过去 24 小时 PR 更新 50 条、Issue 更新 9 条，PR 流量约为 Issue 的 5.5 倍，说明项目当前处于**密集交付/重构期**而非需求收集期。
- **合并率偏低，审查队列承压。** 50 条 PR 中仅 8 条合并/关闭，42 条仍在待合并（约 84%），其中包含多条标记 `size:XL` + `risk:high` 的堆叠式（stacked）PR。
- **主线是两条架构迁移：** ① 提供方注册表 V5（`#12448 → #12454 → #12455 → #12456 → #12457 → #12450 → #12452` 堆叠链）；② WebChat/仪表盘从 `/ws/chat` 迁移到 ACP（`#12651 → #12652 → #12654`）。
- **零版本发布**，但 `#8289` 明确 v0.9.1 为下一交付目标，多条 PR 已带 `release:v0.9.1` 关联标签。
- **健康度提示：** 新增 3 条 Issue（#12707、#12709 及 #12703 的次日更新），关闭 0 条，Issue 净增为正；同时出现 1 条`破坏性变更`提案（`#12678`）需在 v0.9.1 前明确沟通。

---

## 2. 版本发布

**无新版本发布。**

补充背景（来自 Issue #8289 的状态说明）：v0.9.0 已于 2026-11-12 发布，包含核心 OIDC 栈与仪表盘登录；**v0.9.1 为当前在途发布列车**，剩余事项仍挂在 OIDC close-out tracker 上。

---

## 3. 项目进展

今日已合并/关闭 8 条 PR，样本中可见的代表性条目：

| PR | 状态 | 内容 | 影响 |
|---|---|---|---|
| [#12398](https://github.com/zeroclaw-labs/zeroclaw/pull/12398) | **CLOSED** | `fix(runtime)`: shell 工具失败时把 `exit status N` + stderr 写入 `error` 字段，stderr 为空则回退 stdout | 直接提升 Agent 自纠错能力与运行日志可诊断性，`size:S` 低风险修复，属高性价比合并 |

**推进中的重点方向（尚未合并，但今日均有更新）：**

1. **提供方注册表 V5 重构链**（#12454、#12455、#12456、#12457、#12450、#12452）——单个连接可服务多个独立配置的模型，V4 输入在配置边界迁移。这是**本周结构性最大的一块**，涉及 provider/channel/memory/tool 全域标签。
2. **ACP 会话层落位**（#12651 运行时对齐、#12652 持久会话 + legacy `gw_*` 导入、#12654 启动切换与 `/ws/chat` 返回 410）——WebChat 将复用 IDE 客户端的同一套 ACP 回合生命周期。
3. **提供方生态扩张**：#12696 新增 `bf16.ai`（OpenAI 兼容槽位），#12456/#12455 拆分连接构造与超时策略。
4. **渠道能力扩张**：#12316 引入 SimpleX（文本 + 语音留言 + 加密通话），是继 Matrix/Telegram/WhatsApp 后的又一次去电话号码化尝试。

**整体判断：** 项目向前推进的量级体现在**架构层面而非功能层面**——本周的合入会显著改变配置、提供方与传输层的内部契约，但对终端用户可感知的新功能增量有限。

---

## 4. 社区热点

按评论数与信号强度排序：

### 🔥 [#9945](https://github.com/zeroclaw-labs/zeroclaw/issues/9945) — browser 工具仅暴露 16/100+ 命令（7 条评论）
> `enhancement, tool:browser, domain:security, priority:p2, status:blocked, status:accepted, risk:high`

**诉求分析：** `BrowserTool` 背后对接的 `agent-browser` 有 100+ 命令，但工具层只暴露 16 个动作，**iframe、JS 对话框、标签页、核心表单控件全部不可达**。这是当前 Agent 浏览器自动化能力的硬天花板。标记 `status:blocked` + `risk:high` 说明阻塞点在于沙箱/安全边界而非实现难度——与 #12596（把用户名密码与 TOTP 授权拆开独立授予）的策略方向一致：**先建权限模型，再放开能力面**。该 Issue 已开放逾 3 个月，是今日最具"社区期待 vs 安全约束"张力的讨论。

### 🔥 [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) — OIDC 里程碑 tracker（6 条评论）
> `type:tracker, topic:identity-access, release:v0.9.1, risk:high`

**诉求分析：** 核心 OIDC 栈与仪表盘登录已随 v0.9.0 交付，本条为 close-out tracker，剩余项落到 v0.9.1。讨论焦点从"能不能登录"转向"canonical principals 的规范化与入站认证一致性"。与今日新开的 [#12707](https://github.com/zeroclaw-labs/zeroclaw/issues/12707)（ADR-017：守护进程持有 OIDC refresh grant 以维持设备会话）构成**同一身份体系的两段式推进**，配套文档 PR [#12708](https://github.com/zeroclaw-labs/zeroclaw/pull/12708) 已提交。

### ⚡ [#12697](https://github.com/zeroclaw-labs/zeroclaw/issues/12697) — 拆分 zeroclaw-runtime（3 条评论，👍1）
> `type:tracker, domain:architecture`

**诉求分析：** 今日唯一获得点赞的 Issue。`crates/zeroclaw-runtime` 已成为单体编译与测试瓶颈，社区希望按模块边界拆分并明确"哪些模块留在 runtime"。这是典型的**贡献者体验（DX）诉求**——直接影响编译时间与 PR 评审成本，而这两点正是当前 84% PR 待合并现状的潜在成因。

### 📌 高关注度 PR
- [#12450](https://github.com/zeroclaw-labs/zeroclaw/pull/12450) / [#12452](https://github.com/zeroclaw-labs/zeroclaw/pull/12452) — V5 注册表落地与 Zerocode 模型选择，标签覆盖全仓库，`size:XL` + `risk:high`，是今日 PR 面的绝对焦点。
- [#12654](https://github.com/zeroclaw-labs/zeroclaw/pull/12654) — WebChat 切到 ACP，含 `/ws/chat` 返回 HTTP 410 的硬切换语义，需关注迁移公告。
- [#12678](https://github.com/zeroclaw-labs/zeroclaw/pull/12678) — **带 `!` 的破坏性变更**：彻底移除 `gemini_cli` 工具（理由：Google 已于 2026-06-18 停用 Gemini CLI 对个人/Pro/Ultra 账号的服务）。

---

## 5. Bug 与稳定性

按严重程度与影响面排序：

### S2 — 降级行为（4 条，均无 fix PR）

| Issue | 组件 | 问题 | 修复进展 |
|---|---|---|---|
| [#12667](https://github.com/zeroclaw-labs/zeroclaw/issues/12667) | channel | `/model <id>` 回复"Model switched"且 `/model` 也回显新 ID，但**下一次请求仍用 profile 配置的模型** | ❌ 无 fix PR。**静默失败**，最危险的一类——用户被明确告知成功 |
| [#12055](https://github.com/zeroclaw-labs/zeroclaw/issues/12055) | tool:mcp | MCP HTTP/SSE 客户端无 pool/keep-alive 控制，`reqwest::Client::builder()` 裸构造；陈旧 pooled socket 导致工具调用**结果未知（outcome-unknown）** | ❌ 无 fix PR。属分布式系统经典幂等性缺口 |
| [#12558](https://github.com/zeroclaw-labs/zeroclaw/issues/12558) | channel | `reply_in_thread = true` 时 Matrix 工具审批提示被发到**房间时间线而非回合所在线程**，泄漏到错误上下文 | ❌ 无线程内修复 |
| [#12703](https://github.com/zeroclaw-labs/zeroclaw/issues/12703) | channel | Email 渠道默认模式下已处理消息**不回写 IMAP `\Seen` 标记**，每次重启重放全部 UNSEEN 积压并重复作答 | ❌ 无 fix PR。**会导致对外重复发信**，实际业务风险高于 S2 标注 |

### 未标注严重度

- [#9945](https://github.com/zeroclaw-labs/zeroclaw/issues/9945) — 能力缺口而非崩溃，但 `risk:high` 且 `status:blocked`，构成浏览器能力上限。
- [#12709](https://github.com/zeroclaw-labs/zeroclaw/issues/12709) — 非 Bug，指出 SQLite WAL 的写者阻塞限制，作为引入 Turso 的论据。

**稳定性总评：** 今日 0 条崩溃级 Bug，但 **4 条 S2 中有 3 条属于"对外可见的错误行为"**（重复发信、审批错位、模型切换谎报），且 **0 条已有 fix PR**。这是当前质量面最应被优先处理的象限。

---

## 6. 功能请求与路线图信号

| 需求 | 信号强度 | 判断 |
|---|---|---|
| [#12709](https://github.com/zeroclaw-labs/zeroclaw/issues/12709) 原生嵌入式 Turso 作为**可选**记忆后端（SQLite 保持默认，不采用 libSQL/Turso Cloud） | 中 | 提案质量高、边界清晰（明确排除云与额外索引）。但涉及 `memory:backend` 抽象层，与 V5 注册表重构链存在**档期冲突**，大概率排到 v0.10+ |
| [#9945](https://github.com/zeroclaw-labs/zeroclaw/issues/9945) 扩展 browser 工具命令覆盖 | **高**（已 `status:accepted` + `priority:p2`） | 阻塞于权限模型。相关授权拆分 PR [#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596) 已在评审中，**若 #12596 合入，#9945 有望解阻** |
| [#12707](https://github.com/zeroclaw-labs/zeroclaw/issues/12707) 守护进程持有 OIDC refresh grant（ADR-017） | **高** | 明确实施型 tracker，ADR 修正案已随 #12496 合入，文档 PR #12708 同日提交 → **v0.9.1 强候选** |
| [#12697](https://github.com/zeroclaw-labs/zeroclaw/issues/12697) 拆分 zeroclaw-runtime | 中 | 路线图级 epic，非版本级；但其收益（编译/评审效率）直接缓解当前 PR 积压 |
| [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) OIDC close-out | **极高** | 剩余项已锁定 v0.9.1 |

**PR 侧透露的下一版本要素：** bf16.ai 提供方（#12696）、SimpleX 渠道（#12316）、插件 `dispatch.wake` 宿主中介唤醒（#12440）、Codex 订阅用量可视化（#12691）。

---

## 7. 用户反馈摘要

从今日 Issue 正文与 tracker 状态提炼：

**😟 不满意 / 痛点**

1. **"系统告诉我成功了，但实际没有"** —— 这是今日最强的负面信号，出现两次：
   - #12667：`/model` 谎报切换成功；
   - #12055：MCP 工具调用丢失后落入 outcome-unknown，调用方无法判断"到底执行没有"。
   两者共同指向**状态反馈的可信度**问题，对 Agent 类产品而言直接侵蚀用户信任。

2. **重启后的行为不可预期** —— #12703 中用户描述：默认模式下守护进程运行期间处理并回复过的邮件，重启后 "every restart re-answers the backlog"。用户用 "backlog" 一词表明积压规模已经可观。这是**默认配置下的开箱体验缺陷**，会直接影响 Email 渠道的可部署性。

3. **线程化对话的上下文错位** —— #12558 用户开启 `reply_in_thread = true`（说明其在用 Matrix 做多并发会话），但审批提示落在房间时间线，暴露在错误上下文。反馈体现的是**高级用法用户**（多线程并行回合）的边缘路径未覆盖。

**😊 满意 / 建设性**

4. **#12697 获得 👍1**，且正文以"holding open decisions, order of PRs, and who took each one"的方式组织——用户不仅提要求，还**主动承担协调工作**，是社区成熟度的正面信号。
5. **#12709 的提案措辞极其克制**（明确声明"不是 libSQL、不是 Turso Cloud、不是 SQLite 旁的额外索引"）——用户已充分理解项目架构约束，属高质量贡献者反馈。
6. **#8289 状态更新语气积极**："The core OIDC stack and dashboard sign-in are merged, and both shipped in v0.9.0"——身份体系从 0 到 1 的交付获得确认。

**使用场景画像：** 多线程矩阵聊天机器人、无电话号码通信（SimpleX 需求）、长期运行的邮件守护进程、需要浏览器表单填充与 iframe 交互的自动化 Agent。

---

## 8. 待处理积压 ⚠️

### 需维护者优先关注

| 条目 | 滞留时长 | 状态 | 风险说明 |
|---|---|---|---|
| [#9945](https://github.com/zeroclaw-labs/zeroclaw/issues/9945) browser 命令覆盖 | **约 105 天**（2026-08-12 起） | `status:blocked` + `accepted` + `priority:p2` | 已接受却长期阻塞，7 条评论显示持续关注。**建议明确写出解阻条件**（是否等价于 #12596 合入），否则接受状态会失去公信力 |
| [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) OIDC milestone | **约 154 天**（2026-06-24 起） | `type:tracker` | 已绑定 v0.9.1，属有期跟踪，风险可控；但 5 个月跨度需在 v0.9.1 发布时正式关闭，避免 tracker 长期悬挂 |
| [#12055](https://github.com/zeroclaw-labs/zeroclaw/issues/12055) MCP keep-alive | 约 29 天 | `bug`，S2 | 无 assignee、无 fix PR。**幂等性/结果确定性**问题拖久了会沉淀为难以复现的现场故障 |
| [#12558](https://github.com/zeroclaw-labs/zeroclaw/issues/12558) Matrix 审批线程 | 7 天 | `bug`，S2 | 仅 1 条评论，讨论冷清但问题明确、修复面窄（likely 单点定位），**适合作为 good-first-issue 或直接修复** |

### PR 侧积压

- **#12450 / #12452 / #12454 / #12455 / #12456 / #12457**：6 条构成堆叠链，均创建于 2026-11-15，已滞留 **10 天**，且全部 `size:XL`。堆叠 PR 的固有问题是**必须按序合并**，任一环节卡住则整链停滞。**建议维护者对该链做一次整体 review 排期，而非逐条推进。**
- **#12316**（SimpleX 渠道，创建 2026-11-09，滞留 16 天）、**#12440**（插件 dispatch.wake，创建 2026-11-14，11 天）：均为 `size:XL` + 高风险/`domain:security`，属需要安全评审的长周期项。
- **#12698**（rust-patch 31 个依赖升级，2026-11-23）：依赖批量升级滞留会累积后续 rebase 冲突成本。

---

### 📊 今日健康度小结

| 维度 | 评级 | 依据 |
|---|---|---|
| 开发活跃度 | 🟢 优秀 | 50 PR / 24h，多条 XL 级架构 PR 并行推进 |
| 审查吞吐 | 🔴 需关注 | 84% PR 待合并，XL 堆叠链滞留 10 天 |
| Bug 处理时效 | 🟡 一般 | 4 条 S2，0 条有 fix PR；#12398 类小修复能快速关闭是好现象 |
| 社区参与质量 | 🟢 良好 | 用户提案克制精准（#12709），并主动承担协调（#12697） |
| 发布节奏 | 🟡 平稳 | 无新 release，v0.9.1 在途，需警惕 #12678 破坏性变更的沟通窗口 |

**维护者建议优先级：** ① 为 4 条 S2 中的 #12667 与 #12703 指派 owner（用户信任 + 重复发信风险）；② 对 V5 注册表堆叠链做一次性整体评审；③ 在 #9945 上落地解阻条件的文字说明。

---
*报告基于 2026-11-25 数据快照生成，PR 评论数因数据源缺失未纳入排序，已改用标签复杂度与堆叠关系作为关注度替代指标。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-11-25）

> 数据口径说明：过去24小时 Issues 更新 1 条、PR 更新 4 条、Release 0 个；PR 评论数字段为 `undefined`，且数据未区分 merged/closed，以下对 PR 统一按“已关闭”陈述，是否实际合入需以 GitHub 页面为准。

## 1. 今日速览

今日 PicoClaw 活跃度评估为**低至中等，偏维护清理型**：过去24小时仅 1 条 Issue 活跃，4 条 PR 全部关闭，待合并 PR 为 0，且无新版本发布。项目今日主要动作是清理长期 PR 与 stale PR，积压治理有正向信号，但功能交付和发布节奏偏弱。唯一活跃 Issue 是 QQ channel 的依赖版本回归问题，直接影响 QQ 频道启动，属于需要优先响应的稳定性风险。整体看，项目健康度“维护响应尚可、开发吞吐偏低”，短期风险集中在 QQ 接入兼容性。

## 2. 版本发布

今日无新版本发布（0 个 Release），暂无版本更新、破坏性变更或迁移事项可报告。

## 3. 项目进展

今日 4 条 PR 均为 CLOSED 状态，待合并 PR 为 0，PR 流以“清理积压”而非“新增交付”为主。

- **长期汇总修复 PR 关闭**：[#1546](https://github.com/sipeed/picoclaw/pull/1546) `fix: merge PR #1480 #1479 #1478 #1473 #1467`，创建于 2026-03-14，更新于 2026-11-24。该 PR 试图整合多个修复 PR，关闭后有助于减少长期悬置的 PR 积压；但数据未给出 merged 标志，不能确认其中修复是否已全部落地。
- **多智能体协作框架 WIP 关闭**：[#423](https://github.com/sipeed/picoclaw/pull/423) `WIP: feat: base multi-agent collaboration framework & shared context`，创建于 2026-02-18，更新于 2026-11-24。该 PR 涉及 shared context pool、agent handoff、discovery tools，并基于 #213、#131 推进，是今日最有路线图意义的关闭项；但因原为 WIP 且未确认合入，暂不能视为多智能体能力已交付。
- **Perplexity 集成头增强关闭**：[#3466](https://github.com/sipeed/picoclaw/pull/3466) `feat(tools): send X-Pplx-Integration header on Perplexity web search`，标记 stale 后关闭。该改动较小，仅为 Perplexity web search 请求增加静态集成头，未合入对核心功能影响有限。
- **Skills 安装去重修复关闭**：[#3463](https://github.com/sipeed/picoclaw/pull/3463) `fix(skills): deduplicate installed skills per root, not by frontmatter name`，标记 stale 后关闭。该 PR 修复 `picoclaw skills install` / `install_skill` 在 frontmatter `name` 冲突时误报 `registry archive is not a valid skill` 的问题，关联 [#3462](https://github.com/sipeed/picoclaw/issues/3462)；若底层问题仍存在，该修复线索需要重新跟进。

**进展判断**：今日“积压清理”得分较高，关闭了 2 条长期 PR（#423、#1546）和 2 条 stale PR；但“功能向前推进”信号较弱，因无待合并 PR、无 Release，且关键修复未确认落地。

## 4. 社区热点

今日讨论中心为唯一活跃 Issue：

- [#3472 [OPEN] QQ channel error 11241: resty v2.17.1 regression breaks botgo auth header](https://github.com/sipeed/picoclaw/issues/3472)  
  作者 @redbrotherchen，创建于 2026-11-23，更新于 2026-11-24，评论 3 条，👍 0。  
  该 Issue 报告 QQ channel 启动失败，错误为 `11241 Authorization header format error`，用户已定位到 `botgo v0.2.1` 与 `resty v2.17.1` 的依赖版本回归：botgo 预期 resty v2.6.0，但当前依赖解析到 v2.17.1，导致认证头格式异常。  
  **诉求分析**：用户核心诉求是恢复 QQ 频道可用性，并希望项目固定/约束依赖版本或增加兼容性测试。该问题由用户给出较明确的根因判断，维护成本相对可控，但影响面直接指向 QQ 接入场景。

今日 PR 评论数据缺失且反应数为 0，社区讨论热度集中在上述 Issue。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | 问题 | 状态 | 影响 | Fix PR |
|---|---|---|---|---|
| **高** | [#3472](https://github.com/sipeed/picoclaw/issues/3472) QQ channel error 11241，resty v2.17.1 回归破坏 botgo 认证头 | OPEN，3 条评论，更新于 2026-11-24 | QQ channel 无法启动，报 `failed to get websocket i...` / `Authorization header format error`，直接影响 QQ 接入用户 | 数据中未见 fix PR |
| **中** | [#3463](https://github.com/sipeed/picoclaw/pull/3463) 修复 skills 安装去重逻辑，关联 #3462 | CLOSED / stale，未确认合入 | 当多个已安装 skill 共享 frontmatter `name` 时，`skills install` 可能误报 archive 无效 | 修复 PR 已关闭，需确认是否被其他改动覆盖 |

**稳定性判断**：今日没有崩溃类新 Issue，但 #3472 是明确的依赖回归，属于“可复现、影响启动”的高优先级问题，且暂无 fix PR。建议维护者优先给出 resty 版本锁定、botgo 升级或 header 适配方案，并补充 QQ channel 依赖兼容性回归测试。

## 6. 功能请求与路线图信号

今日无直接新功能 Issue，但 PR 关闭项提供了路线图信号：

- **多智能体协作与共享上下文**：[#423](https://github.com/sipeed/picoclaw/pull/423) 涉及 blackboard、agent handoff、discovery tools，属于战略性能力。该 WIP 已关闭，若未合入，说明多智能体方向仍缺可交付主 PR；若后续重新立项，可能是下一阶段重点。
- **QQ 接入依赖治理**：[#3472](https://github.com/sipeed/picoclaw/issues/3472) 虽为 Bug，但会推动依赖锁定、兼容矩阵和 CI 回归测试，最可能进入下一 patch 版本。
- **Perplexity 集成标识**：[#3466](https://github.com/sipeed/picoclaw/pull/3466) 属低风险小增强，已 stale 关闭，短期纳入下一版本概率较低。
- **Skills 安装健壮性**：[#3463](https://github.com/sipeed/picoclaw/pull/3463) 对应真实安装失败场景，若 #3462 仍存在，建议以新 PR 或 reopen 方式纳入质量修复。

**路线图判断**：当前无待合并 PR，下一版本内容存在不确定性；从风险优先级看，QQ channel 修复最可能成为下一 patch 的必选项，多智能体能力则需观察是否重新提案。

## 7. 用户反馈摘要

- **主要痛点**：QQ channel 用户在升级/依赖解析后遭遇 `11241 Authorization header format error`，频道无法启动，属于“既有功能被依赖回归打断”的典型痛点。[#3472](https://github.com/sipeed/picoclaw/issues/3472)
- **使用场景**：QQ 频道机器人接入与 websocket 初始化；用户关注的是生产可用性和版本升级后的兼容性。
- **反馈质量**：Issue 摘要中包含错误码、失败阶段和依赖版本判断（botgo v0.2.1 期望 resty v2.6.0，实际 v2.17.1），说明反馈者具备较强定位能力，能帮助维护者缩短排查路径。
- **满意/不满意**：评论原文未提供，无法量化情绪；从问题描述看，不满主要集中在依赖回归导致服务不可用，而非功能设计本身。Skills 安装误报问题也反映出用户对安装体验和去重逻辑的稳定性有需求。

## 8. 待处理积压

- **需优先响应**：[#3472](https://github.com/sipeed/picoclaw/issues/3472) 为 OPEN 且高影响，虽创建仅 2 天，但已有 3 条评论且无 fix PR，建议维护者在 24–48 小时内给出依赖锁定或修复计划。
- **长期 PR 积压已清理**：[#423](https://github.com/sipeed/picoclaw/pull/423)（2026-02-18 至 2026-11-24）与 [#1546](https://github.com/sipeed/picoclaw/pull/1546)（2026-03-14 至 2026-11-24）今日关闭，长期悬置项减少，是正向维护信号。
- **Stale 关闭项需确认后续**：[#3466](https://github.com/sipeed/picoclaw/pull/3466)、[#3463](https://github.com/sipeed/picoclaw/pull/3463) 均以 stale 关闭；其中 #3463 关联的 skills 安装问题若仍可复现，应 reopen 或由新 PR 承接，避免修复线索丢失。
- **待合并队列为空**：当前无待合并 PR，维护者可利用低队列窗口集中处理 #3472 并评估是否发布补丁版本。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报（2026-11-25）

## 1. 今日速览

- 过去 24 小时 Issues 更新 **20 条**：新开/活跃 **16 条**、关闭 **4 条**，问题流入仍高于关闭，关闭率约 **20%**。
- PR 更新 **43 条**：待合并 **31 条**、已合并/关闭 **12 条**，待合并占比约 **72%**，Review 队列压力较明显。
- 今日无新版本发布；`v2.3.1-beta.1` 安装验证跟踪仍在进行：[#8861](https://github.com/agentscope-ai/QwenPaw/issues/8861)。
- 最大推进来自 Creator 2.0.7 发布 PR：[#8886](https://github.com/agentscope-ai/QwenPaw/pull/8886)，集中修复 review 恢复与媒体问题，并关联关闭 [#8592](https://github.com/agentscope-ai/QwenPaw/issues/8592)。
- 整体活跃度评估：**高**。项目处于 Beta 迭代与质量修复阶段，但安全、多租户隔离、沙箱资源限制和 MCP 稳定性议题集中出现，需维护者优先分流。

## 2. 版本发布

今日无新版本发布。`v2.3.1-beta.1` 的安装验证 Issue 仍在跟踪中：[#8861](https://github.com/agentscope-ai/QwenPaw/issues/8861)。

## 3. 项目进展

今日可见的已关闭 PR 以质量修复和插件发布为主，属于“质量修复日”，而非大规模功能扩张日。

| 条目 | 状态 | 进展与影响 |
|---|---|---|
| [#8886](https://github.com/agentscope-ai/QwenPaw/pull/8886) `feat(creator): release 2.0.7 with review recovery and media fixes` | CLOSED | 今日最重要的推进。Creator 2.0.7 包含 review 恢复与媒体修复，直接改善 Creator 插件评审流程，并关联关闭 [#8592](https://github.com/agentscope-ai/QwenPaw/issues/8592)。 |
| [#8897](https://github.com/agentscope-ai/QwenPaw/pull/8897) `fix(plugins): handle Windows path prefixes in storage migration` | CLOSED | 修复插件存储迁移中的 Windows 路径前缀处理，提升跨平台迁移可靠性。 |
| [#8896](https://github.com/agentscope-ai/QwenPaw/pull/8896) `fix(e2e): update skill pool auto-sync menu tests` | CLOSED | 更新技能池自动同步菜单的 e2e 测试，降低前端回归误报。 |
| [#8811](https://github.com/agentscope-ai/QwenPaw/issues/8811) 窄屏消息裁切 | CLOSED | 关闭窄屏下消息、表格、代码块被裁切且无法横向滚动的问题，改善移动端/窄屏可用性。 |
| [#8706](https://github.com/agentscope-ai/QwenPaw/issues/8706) Creator 输入卡顿 | CLOSED | 关闭 Creation Assistant 每次按键卡顿、随会话长度增长而恶化的问题。 |
| [#8592](https://github.com/agentscope-ai/QwenPaw/issues/8592) Creator review 无法决定 | CLOSED | 与 #8886 关联关闭，修复 REJECT 返回 422、review round 永久无法决定等后端缺陷。 |
| [#8833](https://github.com/agentscope-ai/QwenPaw/issues/8833) mission CLI 重复 `/api` 前缀 | CLOSED | 修复 `qwenpaw mission` 请求 `/api/api/chat/send` 的问题。 |

**整体判断**：今日进展集中在 Creator 插件质量、跨平台存储迁移和 e2e 稳定性；核心 Agent 运行时与安全治理暂无大规模合入。待合并 PR 仍多，后续 Review 吞吐将决定迭代速度。

## 4. 社区热点

今日 PR 列表未提供有效评论数，热点以 Issues 评论与反应为主。

| 热点 | 数据 | 诉求分析 |
|---|---|---|
| [#8811](https://github.com/agentscope-ai/QwenPaw/issues/8811) 窄屏消息/表格/代码块裁切 | 评论 **5**，已关闭 | 移动端与窄屏 Web UI 的响应式显示是真实高频痛点；用户明确给出 Chrome/Windows 与手机 375px 视口复现路径，说明 Console 在多端一致性上仍需系统测试。 |
| [#6274](https://github.com/agentscope-ai/QwenPaw/issues/6274) 新增 `ask_user_question` 支持 Human-in-the-Loop | 评论 **4**，👍 **1**，OPEN | 用户希望 Agent 在模糊或高风险请求时暂停并抛出结构化问题，避免自行猜测或产生副作用。这是 Agent 安全与可控性的核心能力，长期讨论但尚无对应 PR。 |
| [#8875](https://github.com/agentscope-ai/QwenPaw/issues/8875) MCP `streamable_http` 将服务端 4xx 误报为“未连接”并拆除会话 | 评论 **2**，OPEN；已有修复 PR [#8895](https://github.com/agentscope-ai/QwenPaw/pull/8895) | 远端 MCP 服务返回 HTTP 拒绝时，客户端错误语义误导且无谓抖动 session。社区希望保留会话并如实上报 HTTP 层错误。 |
| [#8880](https://github.com/agentscope-ai/QwenPaw/issues/8880) 技能扫描默认 `warn` 模式放过 CRITICAL 发现 | 评论 **1**，OPEN | 安全默认值引发关注：CRITICAL 发现仅记录但技能仍安装，扫描超时也 fail open。用户期望默认阻止高风险技能。 |
| [#8893](https://github.com/agentscope-ai/QwenPaw/issues/8893) Console 模型配置无 agent 作用域 | 评论 **2**，OPEN；部分修复 PR [#8894](https://github.com/agentscope-ai/QwenPaw/pull/8894) | 已配置的 agent 模型可能显示为“no model”，聊天选择器仅 session 级。反映多 Agent 配置语义不清，用户需要按 Agent 维度管理模型。 |

**背后诉求**：社区关注点正从“能不能用”转向“是否可控、可解释、可隔离”。移动端显示、HITL、MCP 错误语义、安全默认值和多 Agent 配置是今日最集中的产品与治理信号。

## 5. Bug 与稳定性

按影响程度排列，安全与会导致会话中断/启动失败的问题优先。

| 严重度 | 问题 | 状态与 Fix PR |
|---|---|---|
| 高 | [#8880](https://github.com/agentscope-ai/QwenPaw/issues/8880) 技能扫描默认 `warn` 模式在 CRITICAL 发现下仍继续安装，扫描超时 fail open | OPEN；未见直接 fix PR。安全默认值需尽快调整。 |
| 高 | [#8875](https://github.com/agentscope-ai/QwenPaw/issues/8875) MCP `streamable_http` 将服务端 4xx 掩码为“not connected”并拆除 session | OPEN；已有 fix PR [#8895](https://github.com/agentscope-ai/QwenPaw/pull/8895)，待 review。 |
| 高 | [#8887](https://github.com/agentscope-ai/QwenPaw/issues/8887) 工具结果中的媒体块导致非多模态模型后续所有消息 400，表现为持续 “Internal error” | OPEN；未见直接 fix PR。影响会话级可用性。 |
| 高 | [#8830](https://github.com/agentscope-ai/QwenPaw/issues/8830) Windows 后端重启后 `llama-server.exe` 孤儿进程累积，耗尽内存并阻止本地模型启动 | OPEN；未见直接 fix PR。Windows 本地模型用户受影响明显。 |
| 高 | [#8879](https://github.com/agentscope-ai/QwenPaw/issues/8879) `max_processes` / `max_memory_mb` 被接受但未被任何沙箱后端执行 | OPEN；Tracking Issue，未见 fix PR。资源限制形同虚设。 |
| 高 | [#8881](https://github.com/agentscope-ai/QwenPaw/issues/8881) 记忆检索层未强制租户隔离，依赖目录约定 | OPEN；设计类 Issue，未见 fix PR。多租户场景存在越权检索风险。 |
| 中高 | [#8851](https://github.com/agentscope-ai/QwenPaw/issues/8851) Console import map 将入口 chunk 重写为 `?v=…`，bundle 加载两次且插件路由不注册 | OPEN；未见直接 fix PR。插件生态受影响。 |
| 中高 | [#8893](https://github.com/agentscope-ai/QwenPaw/issues/8893) Console 模型设置无 agent 作用域，已配置模型可显示为 “no model” | OPEN；部分修复 PR [#8894](https://github.com/agentscope-ai/QwenPaw/pull/8894) 已提交。 |
| 中 | [#8890](https://github.com/agentscope-ai/QwenPaw/issues/8890) OpenAI-compatible 模型发现忽略 `max_input_tokens`，上下文窗口双向错误 | OPEN；未见 fix PR。 |
| 中 | [#8891](https://github.com/agentscope-ai/QwenPaw/issues/8891) 内置 provider 上下文表缺少 `glm-5.3/5.4`，`catalog_only` provider 不拉取上下文元数据 | OPEN；未见 fix PR。 |
| 中 | [#8888](https://github.com/agentscope-ai/QwenPaw/issues/8888) Console Transcript 在内容高度收缩时回跳数屏 | OPEN；未见 fix PR。 |
| 中 | [#8878](https://github.com/agentscope-ai/QwenPaw/issues/8878) 编码模式缺少最小出站策略，元数据端点默认放行 | OPEN；设计类 Issue，未见 fix PR。 |
| 已关闭 | [#8811](https://github.com/agentscope-ai/QwenPaw/issues/8811) 窄屏消息/表格/代码块裁切 | CLOSED。 |
| 已关闭 | [#8706](https://github.com/agentscope-ai/QwenPaw/issues/8706) Creator 输入每次按键卡顿 | CLOSED。 |
| 已关闭 | [#8592](https://github.com/agentscope-ai/QwenPaw/issues/8592) Creator review round 永久无法决定 | CLOSED，关联 #8886。 |
| 已关闭 | [#8833](https://github.com/agentscope-ai/QwenPaw/issues/8833) mission CLI 重复 `/api` 前缀 | CLOSED。 |

**稳定性判断**：今日关闭了 4 个用户可见问题，但新开的 MCP、媒体块、Windows 进程泄漏和沙箱资源限制问题影响面更大。已有 fix PR 的仅 #8875（#8895）与 #8893（#8894 部分），其余需尽快排期。

## 6. 功能请求与路线图信号

| 需求/信号 | Issue/PR | 判断 |
|---|---|---|
| Human-in-the-Loop：新增 `ask_user_question` 工具 | [#6274](https://github.com/agentscope-ai/QwenPaw/issues/6274)，4 评论、1 👍，创建于 2026-07-20 | 长期高价值需求，涉及核心工具集与 Console 交互，尚无 PR。可能需设计评审后纳入后续版本。 |
| AI Prompt Polishing 按钮 | [#8892](https://github.com/agentscope-ai/QwenPaw/issues/8892) | 轻量前端功能，用户希望一键优化输入提示词。实现成本较低，若维护者接受交互方案，可能较快进入迭代。 |
| 长期记忆引用计数归档 | [#8882](https://github.com/agentscope-ai/QwenPaw/issues/8882) | 设计类需求，针对“Agent 健忘”和 stale memory 堆积。属于记忆系统路线图，短期难落地。 |
| 记忆检索层强制租户隔离 | [#8881](https://github.com/agentscope-ai/QwenPaw/issues/8881) | 安全/多租户治理信号，应与 #8880、#8879、#8878 一并纳入安全路线图。 |
| 沙箱资源限制真正执行 | [#8879](https://github.com/agentscope-ai/QwenPaw/issues/8879) | 当前仅接受参数不执行，属于安全与稳定性基础设施，优先级应较高。 |
| 编码模式最小出站策略 | [#8878](https://github.com/agentscope-ai/QwenPaw/issues/8878) | 在现有 Landlock 文件隔离之上补齐网络出站治理，适合作为 sandbox 下一阶段能力。 |
| Linux 桌面 deb/AppImage 打包 | [#8444](https://github.com/agentscope-ai/QwenPaw/pull/8444)，OPEN | 已有 XL PR，补齐 Linux 桌面产物。若 review 顺利，可能进入后续桌面版本。 |
| Runtime base-path 部署 | [#8719](https://github.com/agentscope-ai/QwenPaw/pull/8719)，OPEN/Under Review | 支持反向代理前缀部署，企业/自托管场景信号明确。 |
| 统一 ACP 与 native session 配置 | [#8586](https://github.com/agentscope-ai/QwenPaw/pull/8586)，OPEN | 运行时架构重构，影响面大，需谨慎 review。 |
| 自定义网关声明 OpenAI prompt cache 参数 | [#8061](https://github.com/agentscope-ai/QwenPaw/pull/8061)，OPEN | 延续 provider 缓存能力，已有 PR 但排队较久。 |
| 按 Job 控制 reasoning level | [#8476](https://github.com/agentscope-ai/QwenPaw/pull/8476)，OPEN | 为 cron job 增加 `thinking_level`，属于 Agent 运行时精细化控制。 |

**路线图判断**：短期更可能随 Beta 迭代的是小修复与测试类 PR，如 [#8894](https://github.com/agentscope-ai/QwenPaw/pull/8894)、[#8895](https://github.com/agentscope-ai/QwenPaw/pull/8895)、[#8898](https://github.com/agentscope-ai/QwenPaw/pull/8898)、[#8899](https://github.com/agentscope-ai/QwenPaw/pull/8899)。中期看，Linux 桌面、base-path 部署、prompt cache、per-job thinking 已有活跃 PR；HITL 与记忆/安全治理仍需设计推进。

## 7. 用户反馈摘要

- **移动端/窄屏体验不满意**：消息文字、宽表格和代码块被裁切且无法横向滚动，用户提供了桌面与手机双端复现路径：[#8811](https://github.com/agentscope-ai/QwenPaw/issues/8811)。
- **Creator 插件体验问题集中**：输入框每次按键卡顿且随会话长度恶化：[#8706](https://github.com/agentscope-ai/QwenPaw/issues/8706)；review round 因 REJECT 422 永久无法决定：[#8592](https://github.com/agentscope-ai/QwenPaw/issues/8592)。两者今日均已关闭，Creator 2.0.7 释放了明确修复信号。
- **MCP 错误语义误导**：服务端 HTTP 4xx 被客户端报成“未连接”并拆 session，调用方难以定位问题：[#8875](https://github.com/agentscope-ai/QwenPaw/issues/8875)。
- **多 Agent 模型配置语义不清**：Console 模型设置没有 agent 作用域，聊天选择器仅 session 级，已配置模型可能显示为 “no model”：[#8893](https://github.com/agentscope-ai/QwenPaw/issues/8893)。
- **Windows 本地模型稳定性痛点**：后端异常退出后 `llama-server.exe` 不被终止，多次重启后内存耗尽、无法启动本地模型：[#8830](https://github.com/agentscope-ai/QwenPaw/issues/8830)。
- **上下文窗口元数据不可靠**：自定义 OpenAI-compatible provider 忽略 `max_input_tokens`，内置 provider 缺少新模型上下文表，导致上下文窗口判断错误：[#8890](https://github.com/agentscope-ai/QwenPaw/issues/8890)、[#8891](https://github.com/agentscope-ai/QwenPaw/issues/8891)。
- **插件路由注册失败**：Console import map 重写入口 chunk，bundle 加载两次，插件路由始终不注册：[#8851](https://github.com/agentscope-ai/QwenPaw/issues/8851)。
- **安全默认值受质疑**：技能扫描 `warn` 模式放过 CRITICAL，扫描超时 fail open；沙箱资源限制未执行；租户隔离依赖目录约定：[#8880](https://github.com/agentscope-ai/QwenPaw/issues/8880)、[#8879](https://github.com/agentscope-ai/QwenPaw/issues/8879)、[#8881](https://github.com/agentscope-ai/QwenPaw/issues/8881)。
- **正面反馈**：用户在 [#8878](https://github.com/agentscope-ai/QwenPaw/issues/8878) 中明确认可沙箱文件系统隔离的真实性，以及 `config.py` 对“未执行项”的诚实说明。这说明工程透明度获得信任，但安全能力仍需补齐。

## 8. 待处理积压

当前 **31 个 PR 待合并**，是项目健康度的主要压力点。以下为长期未响应或风险较高的重要条目，建议维护者优先分流。

| 类型 | 条目 | 创建/更新 | 风险与建议 |
|---|---|---|---|
| Issue | [#6274](https://github.com/agentscope-ai/QwenPaw/issues/6274) `ask_user_question` / HITL | 创建 2026-07-20，更新 2026-11-24 | 已讨论 4 个月、4 评论、1 👍，仍无 PR。建议给出设计结论或明确排期。 |
| PR | [#7936](https://github.com/agentscope-ai/QwenPaw/pull/7936) 中文 access-control 用户名标签翻译 | 创建 2026-09-22，Under Review | 小范围 i18n 修复，长期排队。建议快速 review 合入。 |
| PR | [#8061](https://github.com/agentscope-ai/QwenPaw/pull/8061) 自定义网关声明 OpenAI prompt cache 参数 | 创建 2026-09-30，Under Review | 涉及 provider 缓存能力，影响自定义网关用户。 |
| PR | [#8268](https://github.com/agentscope-ai/QwenPaw/pull/8268) `TaskTracker` 完成回调有界化与清理 | 创建 2026-10-16，OPEN | 修复 run 永远处于 running 的清理问题，稳定性相关。 |
| PR | [#8308](https://github.com/agentscope-ai/QwenPaw/pull/8308) provider 缺失查找返回 404 测试 | 创建 2026-10-18，OPEN | 测试类 PR，建议尽快合入以减少回归。 |
| PR | [#8444](https://github.com/agentscope-ai/QwenPaw/pull/8444) Linux deb/AppImage 桌面打包 | 创建 2026-10-26，OPEN | 补齐 Linux 桌面产物，功能信号明确但体量较大。 |
| PR | [#8487](https://github.com/agentscope-ai/QwenPaw/pull/8487) tool-result folding 识别 URL 引用媒体 | 创建 2026-10-29，OPEN | 与媒体折叠/上下文压缩相关，长期未合入。 |
| Issue | [#8830](https://github.com/agentscope-ai/QwenPaw/issues/8830) Windows `llama-server.exe` 孤儿进程 | 创建 2026-11-20，更新 2026-11-24 | 虽为新 Issue，但直接影响本地模型启动与内存，建议优先处理。 |
| Issue | [#8880](https://github.com/agentscope-ai/QwenPaw/issues/8880) 技能扫描默认 `warn` 放过 CRITICAL | 创建 2026-11-24 | 安全默认值问题，建议尽快给出阻止策略或配置说明。 |
| Issue | [#8879](https://github.com/agentscope-ai/QwenPaw/issues/8879) 沙箱资源限制未执行 | 创建 2026-11-24 | 资源限制未生效，建议纳入 sandbox 下一轮迭代。 |
| Issue | [#8881](https://github.com/agentscope-ai/QwenPaw/issues/8881) 记忆检索租户隔离 | 创建 2026-11-24 | 多租户安全风险，建议与记忆系统设计一并处理。 |

**维护建议**：今日新增问题中，安全与稳定性议题占比上升；建议在清理 31 个待合并 PR 的同时，优先处理 #8880、#8879、#8881、#8830、#8887 等高影响条目，并给长期 HITL 需求 #6274 一个明确的路线图结论。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：2026-11-25（UTC）** ｜ 数据窗口：过去 24 小时

---

## 1. 今日速览

- **高强度迭代窗口**：24 小时内 375 条 Issue 更新、500 条 PR 更新、2 个版本发布，项目处于典型的“发布后收敛期 + 高吞吐合并期”。
- **流入显著快于消化**：Issue 侧新开/活跃 325 条 vs 关闭 50 条（关闭率约 13%）；PR 侧存量待合并 380 条，单日仅合并/关闭 120 条（处理率 24%）。**审查与关闭能力是本日最明显的瓶颈**。
- **v0.23.4 将约 229 个 PR 打包为稳定版**，说明主干合并吞吐极高；但完整策划说明要等到 v0.24.0，短期内用户对“到底改了什么”的可见性不足。
- **风险高度集中在统一网关（#106742）合并后的余波**：[#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 以 90 条评论成为全站最热 Issue，跨 CLI/TUI/Desktop/API/cron/消息平台多个子系统。
- **健康度评估**：迭代速度优秀、社区参与度高（多个用户自带可合并实现），但 P1 缺陷（[#145022](https://github.com/NousResearch/hermes-agent/issues/145022)）尚未关闭、P2 回归呈面上扩散，建议本周期优先“降噪收敛”而非继续扩大合并面。

---

## 2. 版本发布

### v0.23.4（稳定版，2026-11-23）
> Patch release。该 tag 将自 v0.23.3 以来合并的 **约 229 个 PR** 汇总为一个稳定版本，覆盖 GitHub Release（CLI 与安装器）、Microsoft Store 应用、Docker 与 Hermes Cloud。完整策划说明将随 **v0.24.0** 发布。

- **性质**：补丁汇总版，非功能性大版本。
- **破坏性变更**：发布说明未声明任何破坏性变更；但由于承载了 229 个 PR，实际行为面变更远大于“patch”语义，建议按次版本对待。
- **迁移注意事项**：
  1. 本次无独立 changelog，**升级前应以 v0.24.0 的策划说明为准**回溯自查；
  2. 覆盖 CLI、安装器、Microsoft Store、Docker、Cloud 五条分发通道，企业/自托管用户需分别验证；
  3. 与网关相关的改动较多，升级后建议执行一次 `hermes update` 并确认网关已重启（参见 [#147873](https://github.com/NousResearch/hermes-agent/issues/147873) 的“欠重启”问题）。

### canary.20261124T064706Z-v0.23.3（金丝雀，2026-11-24）
- 每日构建通道，提供 Hermes Desktop 各平台下载（含 macOS Apple Silicon DMG）。
- **仅用于验证，不建议生产使用**；可作为 v0.23.4 与后续 v0.24.0 的回归前置观察点。

---

## 3. 项目进展

> 说明：500 条 PR 更新中，样本仅展示评论数最多的 20 条；其中可见的已关闭项为 [#159830](https://github.com/NousResearch/hermes-agent/pull/159830)，其余 119 条合并/关闭未在样本中列名。

### 已落地
- **[#159830](https://github.com/NousResearch/hermes-agent/pull/159830)（CLOSED）— 模型选择器全面展示价格**：为 CLI、Telegram/消息端与 Web 仪表盘的模型选择器加上单价，标记免费模型并做“免费优先”排序，接入 Cheaper Inference 公共目录。对应 issue #34，属于**直接影响用户成本决策**的体验改进。

### 在审推进的主要方向（按主题聚类）

| 方向 | 代表 PR | 推进内容 |
|---|---|---|
| 桌面端打包与发布工程 | [#159483](https://github.com/NousResearch/hermes-agent/pull/159483)、[#159835](https://github.com/NousResearch/hermes-agent/pull/159835)、[#159834](https://github.com/NousResearch/hermes-agent/pull/159834)、[#159833](https://github.com/NousResearch/hermes-agent/pull/159833)、[#159146](https://github.com/NousResearch/hermes-agent/pull/159146)、[#159106](https://github.com/NousResearch/hermes-agent/pull/159106) | macOS 包移入 Applications、DMG 签名/公证/装订与 Gatekeeper 校验、规避 `/usr/bin/git` CLT 弹窗、Windows arm64 测试修复、发布守卫测试去重 |
| 会话与存储正确性 | [#159911](https://github.com/NousResearch/hermes-agent/pull/159911)、[#158889](https://github.com/NousResearch/hermes-agent/pull/158889)、[#157659](https://github.com/NousResearch/hermes-agent/pull/157659) | 兼容旧版 BLOB 形式的 prompt/消息、reset 后桌面历史仍停留在旧转写、路由全量保存改为增量写入 |
| 插件与 Profile 可靠性 | [#157087](https://github.com/NousResearch/hermes-agent/pull/157087)、[#159914](https://github.com/NousResearch/hermes-agent/pull/159914) | 修复并发打开会话时 provider 插件“消失”（对应 #156899）；修复跨 home 重复插件成员引发的生成风暴 |
| 自改进代理治理 | [#159906](https://github.com/NousResearch/hermes-agent/pull/159906) | 新增 `curator.max_agent_created: N`，为后台自动写 skill 设上限，抑制 prompt 膨胀 |
| 回合内结果回流 | [#136708](https://github.com/NousResearch/hermes-agent/pull/136708) | `busy_result_mode`：子代理/后台进程结果可注入正在运行的回合（fixes #136703） |
| 网关与平台适配 | [#104753](https://github.com/NousResearch/hermes-agent/pull/104753) | 修复 py<3.12 下 `wait_for` 吞掉取消导致的 Telegram “正在输入”泄漏 |
| 插件生态目录 | [#159905](https://github.com/NousResearch/hermes-agent/pull/159905) | antigravity-subscription 目录 pin 升至 v1.0.31 |

**整体推进判断**：本日进展集中在**桌面端分发成熟度**与**网关/会话正确性**两条主线，方向正确；但三条重叠的 scratch 清理 PR（[#159913](https://github.com/NousResearch/hermes-agent/pull/159913)、[#146046](https://github.com/NousResearch/hermes-agent/pull/146046)、[#134907](https://github.com/NousResearch/hermes-agent/pull/134907)）同时开放，存在重复劳动与语义冲突风险，建议维护者合并裁决。

---

## 4. 社区热点

| 排名 | 条目 | 评论/反应 | 诉求分析 |
|---|---|---|---|
| 1 | [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) OPEN · P2 · 统一网关合并后遗留问题 | **90 评论** | 14/10 的 #106742 将所有本地会话收敛进单一网关进程，CLI、TUI、Desktop、API、编辑器、消息机器人、cron、Kanban、群聊全部改道。问题跨 8 个组件标签，**是当前项目最大的系统性风险源**，也是“架构收敛”必然付出的整合成本。 |
| 2 | [#143379](https://github.com/NousResearch/hermes-agent/issues/143379) OPEN · P4 · 文档链基座的读取/治理/压缩 RFC | **50 评论** | 关注“持久记录在会话压缩后仍保真、可溯源、可重读”。核心用户群已进入**长期记忆与审计**阶段，诉求从“能用”转向“可信”。 |
| 3 | [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) **CLOSED** · 安全 · `hermes config set` 绕过系统配置写保护 | **31 评论** | 安全边界问题：CLI 可从“正门”关闭审批层而不被拦截。**24 小时内关闭，说明维护者对安全类问题响应优先级高**，是健康信号。 |
| 4 | [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) OPEN · **P1** · 网关停滞时 Kanban worker 崩溃 | 29 评论 | 生产级多代理编排场景：一次停滞同时杀死 4 个 worker，进度丢失。**唯一 P1，应列为最高优先级**。 |
| 5 | [#122609](https://github.com/NousResearch/hermes-agent/issues/122609) OPEN · P2 · Skills 索引陈旧（bot 自动探针） | 24 评论 | 自动化新鲜度探针连续报警（索引 28.1h 超过 26h 上限），属**基础设施可观测性噪声**，建议修复探针或重建流水线，避免长期占用热榜。 |

**高反应（👍）条目**：
- [#110374](https://github.com/NousResearch/hermes-agent/issues/110374) 👍**19** — Slack 状态指示器在 slack-sdk ≥3.44 后静默失效；
- [#50148](https://github.com/NousResearch/hermes-agent/issues/50148) 👍**16** — Nextcloud Talk 适配器（已有可用实现，等待接收）；
- [#5528](https://github.com/NousResearch/hermes-agent/issues/5528) 👍**12** — 可配置的审批锁定命令模式；
- [#127621](https://github.com/NousResearch/hermes-agent/issues/127621) 👍**9** — 桌面端回复重复渲染。

> 数据说明：本次样本中 PR 的评论数未提供（`undefined`），故社区热度以 Issue 为主。

---

## 5. Bug 与稳定性

### P1（1 项）
| Issue | 描述 | Fix PR |
|---|---|---|
| [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) | 多 Kanban worker 并发时，网关保存期间停滞 → `Kanban execution unknown; retained by owner`，worker 以 exit 1 崩溃，进行中的工作丢失 | ❌ 未见对应 PR |

### P2（回归/功能受损，按影响面排序）
| Issue | 描述 | Fix PR |
|---|---|---|
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) | 统一网关合并后遗留问题总汇（跨 8 组件） | ⚠️ 部分子项有 PR，整体未收敛 |
| [#143720](https://github.com/NousResearch/hermes-agent/issues/143720) | Discord 线程完成唤醒每 60s 被 `admission_conflict` 拒绝，持续 6 小时、单日志 494 次；尝试上限失效 | ❌ |
| [#99943](https://github.com/NousResearch/hermes-agent/issues/99943) | 云端 provider 的压缩窗口被 `model.ollama_num_ctx` 钳制，1M 上下文静默降到 65,536 | ❌ |
| [#110374](https://github.com/NousResearch/hermes-agent/issues/110374) | Slack 状态指示器在 slack-sdk ≥3.44 下静默失败（错误仅 debug 级日志） | ❌ |
| [#127621](https://github.com/NousResearch/hermes-agent/issues/127621) | 桌面端助手回复偶发重复渲染（非模型重复生成） | ❌ |
| [#156709](https://github.com/NousResearch/hermes-agent/issues/156709) | 启用 `runtime_footer` 后 `FooteredReply` 破坏 `copy.deepcopy`，`TypeError: missing 'footer'` | ❌ |
| [#156899](https://github.com/NousResearch/hermes-agent/issues/156899) | 并发首次查找 profile 插件 → “Unknown provider” 直到重启 | ✅ [#157087](https://github.com/NousResearch/hermes-agent/pull/157087) |
| [#147873](https://github.com/NousResearch/hermes-agent/issues/147873) | 同一网关 PID 同时被记录为 mapped 与 stopped_unmapped → 欠重启提示永不消除 | ❌ |
| [#151351](https://github.com/NousResearch/hermes-agent/issues/151351) | Windows TicketBridge 的四条自终止路径会 SIGKILL python helper，单次慢工单触发整轮启动重跑 | ❌ |
| [#156129](https://github.com/NousResearch/hermes-agent/issues/156129) | 浏览器 localStorage 写满时 Webapp 直接中止发送 | ❌ |
| [#141692](https://github.com/NousResearch/hermes-agent/issues/141692) | 共享 CDP Chrome 下未命名 `browser_exec` 会话互相踩踏同一 daemon 与标签页 | ❌ |
| [#127731](https://github.com/NousResearch/hermes-agent/issues/127731) | 高频 cron 主机上自动预更新备份总被判 `incomplete` 而跳过（3.6GB 归档、22,688 次运行） | ❌ |
| [#122609](https://github.com/NousResearch/hermes-agent/issues/122609) | Skills 索引陈旧/降级（bot 探针） | ❌ |

### 本日已关闭（修复落地）
- [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) — `hermes config set` 绕过系统配置写保护（**安全**）
- [#150617](https://github.com/NousResearch/hermes-agent/issues/150617) — 完成通知忽略 `completion_output_chars`，尾段可被截断为 0 字符（Bot Mode DM 空回复）
- [#131786](https://github.com/NousResearch/hermes-agent/issues/131786) — 长单行 JSON 导致网关完成尾段丢弃全部有效输出
- [#35986](https://github.com/NousResearch/hermes-agent/issues/35986) — Kanban 编排缺口总汇（umbrella）

**稳定性判断**：网关/通知链路的三处“输出截断/空回复”类问题今日集中关闭，是明显改善；但**读取路径（压缩窗口、状态指示、历史回放）的“静默降级”类问题仍是主要残留**——它们的共同特征是失败不报错，用户只能从结果异常反推。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 纳入下一版本的可能性 | 判断依据 |
|---|---|---|---|
| **主动性（Proactivity）路线图** | [#158538](https://github.com/NousResearch/hermes-agent/issues/158538)（维护者 @teknium1 发起） | **高** | 由核心维护者撰写，对标 Hark Pro / OpenAI dots / Meta Muse / Grok Bot，明确“每次主动运行都是用户批准过的 job、prompt 可见”的差异化定位，属方向性文档 |
| **跨平台统一会话** | [#62780](https://github.com/NousResearch/hermes-agent/issues/62780) | **中高** | 与网关入口切换 [#145171](https://github.com/NousResearch/hermes-agent/issues/145171)、统一网关 #106742 同源，是架构收敛的必然下一步；带 `needs-decision` |
| **自改进代理的“收据”/溯源** | [#11692](https://github.com/NousResearch/hermes-agent/issues/11692) | **中** | 与 RFC [#143379](https://github.com/NousResearch/hermes-agent/issues/143379) 及 PR [#159906](https://github.com/NousResearch/hermes-agent/pull/159906)（限制自动写 skill 数量）形成“治理三件套”，已有落地抓手 |
| **按会话 / 按用户记忆隔离** | [#28279](https://github.com/NousResearch/hermes-agent/issues/28279)、[#11430](https://github.com/NousResearch/hermes-agent/issues/11430) | **中** | 两个独立 Issue 指向同一隐私缺口（全局记忆无条件注入），建议合并为单一设计议题；均带 `needs-decision` |
| **Nextcloud Talk 适配器** | [#50148](https://github.com/NousResearch/hermes-agent/issues/50148) 👍16 | **中高** | 作者已提供可用的完整实现，形态与现有 Mattermost/Signal/Telegram 适配器一致，属“低风险高性价比”接收项 |
| **可配置的审批锁定命令模式** | [#5528](https://github.com/NousResearch/hermes-agent/issues/5528) 👍12 | **中** | 当前审批模式硬编码在 `tools/approval.py`；与今日关闭的安全 Issue #59293 同一主题域，安全议题正处于维护者视野内 |
| **本地终端子进程内存护栏（opt-in）** | [#56865](https://github.com/NousResearch/hermes-agent/issues/56865) | 低中 | 已有 PR #57121 提案，但带 `sweeper:risk-compatibility` |
| **Ruby 工具调用显示 💎 图标** | [#156660](https://github.com/NousResearch/hermes-agent/issues/156660) | 低（易做） | 纯展示层，改动面小，适合作为新贡献者入门项 |

**路线图信号**：v0.23.4 明确把完整策划说明推迟到 **v0.24.0**，意味着 v0.24.0 将是一次“叙事型”版本发布。当前在审的 #159906（skill 上限）、#136708（回合内结果回流）、#157087（插件可靠性）最有可能被写入 v0.24.0 的亮点清单。

---

## 7. 用户反馈摘要

### 真实痛点
1. **架构收敛带来的稳定性代价**（[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)、[#145022](https://github.com/NousResearch/hermes-agent/issues/145022)）：用户并不反对统一网关，但在生产多代理编排中“一次停滞杀 4 个 worker、进度全丢”是不可接受的。
2. **静默失败**是最集中的抱怨模式：[#99943](https://github.com/NousResearch/hermes-agent/issues/99943)（1M 上下文悄悄变 64K）、[#110374](https://github.com/NousResearch/hermes-agent/issues/110374)（状态调用失败仅记 debug）、[#127731](https://github.com/NousResearch/hermes-agent/issues/127731)（备份被跳过仅打印一行警告）。用户反复强调“不要默默降级”。
3. **多用户/群聊下的隐私边界**（[#28279](https://github.com/NousResearch/hermes-agent/issues/28279)、[#11430](https://github.com/NousResearch/hermes-agent/issues/11430)）：全局记忆被无条件注入每个会话，导致身份混淆与信息越界，被明确描述为“significant privacy vulnerability”。
4. **第三方依赖漂移**（[#110374](https://github.com/NousResearch/hermes-agent/issues/110374) slack-sdk 3.44、[#99943](https://github.com/NousResearch/hermes-agent/issues/99943) ollama_num_ctx）：上游小版本变化即造成静默功能退化。
5. **桌面端分发摩擦**（[#151351](https://github.com/NousResearch/hermes-agent/issues/151351) Windows 启动重跑、[#127621](https://github.com/NousResearch/hermes-agent/issues/127621) 重复渲染、[#156129](https://github.com/NousResearch/hermes-agent/issues/156129) localStorage 配额）：Windows 与 Web 端体验仍明显落后于 macOS。

### 典型使用场景
- **高频自动化**：单主机 22,688 次 cron 运行、1 分钟间隔（#127731）。
- **多 Profile / 多 home 隔离部署**（#159914、#156899）。
- **共享 CDP 浏览器做并发抓取**（#141692）。
- **远程后端**：SSH / Docker 下的 cron 脚本执行（#29849）。
- **自托管与私有化**：Nextcloud Talk（#50148）、Microsoft Store / Docker / Cloud 五通道分发。

### 满意与不满意
- **满意**：维护者对安全类 Issue 响应快（#59293 当日关闭）；PR 普遍附带信息图与前后对比，可读性高；社区愿意自带实现（#50148 作者明言“ready to PR”）。
- **不满意**：Issue 关闭率仅 13%，多条 7 个月以上的 P3/P4 长期挂起；`needs-decision` 标签在 #29849、#62780、#28279 上长期未决，用户得不到“会不会做”的明确答复。

---

## 8. 待处理积压（建议维护者本周关注）

### 高优先级、长期未闭环
| 条目 | 存续时长 | 状态 | 备注 |
|---|---|---|---|
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 统一网关遗留问题 | 约 1 个月 | OPEN · P2 · **90 评论** | 全站最热，建议拆分为可关闭的子任务并指定 owner |
| [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) Kanban worker 崩溃 | 约 1 个月 | OPEN · **P1** | 唯一 P1，至今无 fix PR，建议本轮最高优先 |
| [#11692](https://github.com/NousResearch/hermes-agent/issues/11692) 自改进代理收据 | **约 7 个月** | OPEN · P4 | 与 #143379、#159906 已形成议题簇，可正式立项或明确不做 |
| [#11430](https://github.com/NousResearch/hermes-agent/issues/11430) 群聊按用户记忆隔离 | **约 7 个月** | OPEN · P3 | 与 #28279 重复，建议合并 |
| [#5528](https://github.com/NousResearch/hermes-agent/issues/5528) 可配置审批模式 | **约 7.5 个月** | OPEN · P3 · 👍12 | 社区呼声稳定，改动面可控，适合排期 |
| [#29849](https://github.com/NousResearch/hermes-agent/issues/29849) `no_agent` cron 忽略 `terminal.backend` | 约 6 个月 | OPEN · P3 · `needs-decision` | 涉及安全边界与兼容性，需一次性决策 |
| [#28279](https://github.com/NousResearch/hermes-agent/issues/28279) 按会话记忆隔离 | 约 6 个月 | OPEN · P3 · `needs-decision` | 同上 |
| [#50148](https://github.com/NousResearch/hermes-agent/issues/50148) Nextcloud Talk 适配器 | 约 5 个月 | OPEN · 👍16 | **作者已附可用实现，属最低成本的社区关系维护机会** |

### 长期挂起的 PR
| PR | 存续时长 | 风险标签 |
|---|---|---|
| [#104753](https://github.com/NousResearch/hermes-agent/pull/104753) 修复 Telegram typing 泄漏 | **约 2.5 个月** | `sweeper:risk-message-delivery` |
| [#134907](https://github.com/NousResearch/hermes-agent/pull/134907) 按 profile 根目录每进程清理一次 scratch | 约 1.5 个月 | `sweeper:risk-compatibility` |
| [#136708](https://github.com/NousResearch/hermes-agent/pull/136708) `busy_result_mode` | 约 1.5 个月 | `sweeper:risk-compatibility` |
| [#146046](https://github.com/NousResearch/hermes-agent/pull/146046) scratch 空闲规则对长驻进程成立 | 约 1 个月 | 与 #134907、#159913 重叠 |

### 维护者行动建议
1. **止损优先**：先处理 P1 #145022 与 #143547 的可拆分收敛，避免统一网关的整合成本继续外溢到更多组件。
2. **降低积压噪声**：合并 #28279 / #11430、裁决三条 scratch 清理 PR（#159913 / #146046 / #134907）中的一条，可直接减少 3–4 条长期未决项。
3. **补全变更可见性**：v0.23.4 无独立 changelog，建议在 v0.24.0 前先发布中间说明，否则 229 个 PR 的行为变更对用户不可审计。
4. **安全响应模式可复用**：#59293 当日关闭的路径值得作为安全类 Issue 的标准 SLA 模板。

---

*数据来源：NousResearch/hermes-agent GitHub 公开事件，统计窗口 2026-11-24 至 2026-11-25。PR 评论数在本次数据集中未提供，相关排名仅基于 Issue 评论与反应数。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报（2026-11-25）

> 数据快照：过去24小时 Issues 更新 13 条（新开/活跃 3，已关闭 10）；PR 更新 38 条（待合并 19，已合并/关闭 19）；新版本 0 个。PR 评论数字段未提供，PR 讨论热度无法按评论数排序；Issue 热度按评论/点赞与影响面判断。

## 1. 今日速览

- 今日为**高活跃维护日**：Issues 关闭率约 77%（10/13），PR 处理率 50%（19/38），但待合并 PR 仍为 19 条，贡献流入旺盛、合并队列未明显缩短。
- 核心推进集中在 **Agent 会话与程序化轮次**：[#11364](https://github.com/AstrBotDevs/AstrBot/pull/11364)、[#11363](https://github.com/AstrBotDevs/AstrBot/pull/11363)、[#11357](https://github.com/AstrBotDevs/AstrBot/pull/11357) 关闭，围绕 ConversationStore、UMO 推断与 `conversation_id` 统一会话接口。
- 社区最强需求信号是**多配置文件的插件隔离**：[#11362](https://github.com/AstrBotDevs/AstrBot/issues/11362) 获 2 个赞，反映多 bot 运营场景下“只隔离插件、不复制其他人格配置”的刚需。
- 稳定性风险集中在微信生态：`weixin_oc` 下行静默丢弃 [#11325](https://github.com/AstrBotDevs/AstrBot/issues/11325)，已有修复 PR [#11354](https://github.com/AstrBotDevs/AstrBot/pull/11354) 但未合并；WeCom 同步丢消息有修复 PR [#11360](https://github.com/AstrBotDevs/AstrBot/pull/11360)。
- 健康度评估：**活跃度高、关闭响应快、Agent 架构持续推进**；但无新版本发布，平台适配可靠性仍需优先验证，待合并 PR 存在积压。

## 2. 版本发布

今日无新版本发布（0 个），不涉及版本更新、破坏性变更或迁移注意事项。

## 3. 项目进展

今日 PR 合并/关闭 19 条。以下为关键推进项（状态为 CLOSED，GitHub 数据未进一步区分 merged/closed）：

| PR | 状态 | 推进内容 |
|---|---|---|
| [#11364](https://github.com/AstrBotDevs/AstrBot/pull/11364) | CLOSED | `refactor(agent)`：将子代理会话存入 `ConversationStore`，统一主 Agent 与子代理历史存储，提升多轮/子代理可追踪性。 |
| [#11363](https://github.com/AstrBotDevs/AstrBot/pull/11363) | CLOSED | `feat(agent)`：为程序化轮次推断 UMO，支持从源事件、活动消息或会话元数据解析目标会话，降低插件调用上下文成本。 |
| [#11357](https://github.com/AstrBotDevs/AstrBot/pull/11357) | CLOSED | `feat(agent)`：`run_turn()` 增加 `conversation_id` 首选参数，`session_id` 降为弃用别名，会话定向接口更规范。 |
| [#11347](https://github.com/AstrBotDevs/AstrBot/pull/11347) | CLOSED | 修复裸 @ 机器人不注入群聊上下文的问题，关联 Issue [#11346](https://github.com/AstrBotDevs/AstrBot/issues/11346)。 |
| [#11339](https://github.com/AstrBotDevs/AstrBot/pull/11339) | CLOSED | 修复 trace history 使用索引列过滤但返回 JSON 快照字段导致的状态不一致问题。 |
| [#11355](https://github.com/AstrBotDevs/AstrBot/pull/11355) | CLOSED | 将插件 locale 与 Agent session 查找异步化，改善后台调用与默认 profile 回退行为。 |
| [#11302](https://github.com/AstrBotDevs/AstrBot/pull/11302) | CLOSED | WebUI 在命令别名冲突时展示后端错误信息，提升可诊断性。 |
| [#10987](https://github.com/AstrBotDevs/AstrBot/pull/10987)、[#9838](https://github.com/AstrBotDevs/AstrBot/pull/9838)、[#11037](https://github.com/AstrBotDevs/AstrBot/pull/11037)、[#10841](https://github.com/AstrBotDevs/AstrBot/pull/10841)、[#10574](https://github.com/AstrBotDevs/AstrBot/pull/10574) | CLOSED | 生态与文档：IO Intelligence、Serply、SpecStream、Runcrate 等 provider/websearch 接入，以及 Pethost 社区部署文档。 |

**整体进度判断**：今日核心推进约 7 项 Agent/可观测/前端/异步化改动，另有 5 项生态与文档更新；以 PR 计消化了 50% 的更新量。但待合并仍为 19 条，且 Tool-call 元数据修复由 [#10620](https://github.com/AstrBotDevs/AstrBot/pull/10620) 关闭后转由 [#11359](https://github.com/AstrBotDevs/AstrBot/pull/11359) 继续，说明部分修复仍在队列中。

## 4. 社区热点

| 条目 | 热度/状态 | 诉求分析 |
|---|---|---|
| [#11362](https://github.com/AstrBotDevs/AstrBot/issues/11362) 多配置文件插件黑白名单隔离页面 | OPEN，1 评论，2 👍 | 今日 Issue 中反应最高。多 bot 用户希望只隔离插件，而不复制/维护整套人格配置；与长期议题 [#4818](https://github.com/AstrBotDevs/AstrBot/issues/4818) 的模块化配置诉求相呼应。 |
| [#11310](https://github.com/AstrBotDevs/AstrBot/issues/11310) Docker 部署文档未同步 NapCat 移除 | CLOSED，3 评论 | 今日 Issue 中评论最多。NapCatQQ 于 2026-11-10 宣布 Ending、11-12 清空仓库，原 Docker 文档仍引用相关安装方式，影响部署可用性与文档可信度。 |
| [#11351](https://github.com/AstrBotDevs/AstrBot/issues/11351) 插件向 Web 管理界面发送应用内通知 API | OPEN | 插件开发者希望通知进入 AstrBot WebUI，而非发到 QQ/Telegram 等聊天平台，反映插件生态对内部通知/可观测 API 的需求。 |
| [#11276](https://github.com/AstrBotDevs/AstrBot/issues/11276) 提示词前缀分层与统一上下文注入讨论 | CLOSED，1 评论 | 用户以 DeepSeek 请求日志说明缓存命中/未命中 token 差异，核心诉求是让缓存友好成为默认行为，降低 LLM 成本。 |
| [#11325](https://github.com/AstrBotDevs/AstrBot/issues/11325) weixin_oc 下行静默丢弃 | OPEN，0 评论 | 评论少但影响大：上行正常、下行 100% 不达，`sendmessage` 返回 `ret:0` 且无 `message_id`，适配器只校验 `ret` 无法感知失败。 |

> 注：PR 评论数未提供，无法判断 PR 讨论热度；以上以 Issue 评论、点赞和影响面综合判断。

## 5. Bug 与稳定性

| 严重度 | 条目 | 状态 | 影响与修复 |
|---|---|---|---|
| 高 | [#11325](https://github.com/AstrBotDevs/AstrBot/issues/11325) `weixin_oc` 上行正常但下行 100% 静默丢弃 | OPEN | `sendmessage` 稳定 HTTP 200 且 `{"ret":0}`，但无 `message_id`，消息不出现在微信；适配器只校验 `ret`，会把失败当成功。已有修复 PR [#11354](https://github.com/AstrBotDevs/AstrBot/pull/11354)，将无 `message_id`/`msg_id` 视为投递失败，并避免用合成 ID 写入最近消息缓存。需合并后验证是否完全恢复下行。 |
| 高 | [#11360](https://github.com/AstrBotDevs/AstrBot/pull/11360) WeCom 客服消息同步只入队最后一条 | OPEN | 同一 sync page 有两条客户消息时只处理最后一条；`has_more` 时未传回 cursor 导致重复请求同一页，存在消息丢失。修复 PR 待合并。 |
| 中 | [#11346](https://github.com/AstrBotDevs/AstrBot/issues/11346) 裸 @ 不注入群聊上下文 | CLOSED | 群消息仅 @ 机器人且无文本时，不注入机器人上次回复后的群聊上下文；带文本的 @ 正常。修复 PR [#11347](https://github.com/AstrBotDevs/AstrBot/pull/11347) 已关闭。 |
| 中 | [#11328](https://github.com/AstrBotDevs/AstrBot/issues/11328) cron/Scheduler 来源 trace 永久 running，trace 状态双写可分歧 | CLOSED | 影响 trace 可观测性与历史页准确性。修复 PR [#11339](https://github.com/AstrBotDevs/AstrBot/pull/11339) 已关闭，改用索引状态与 flags。 |
| 中 | [#11359](https://github.com/AstrBotDevs/AstrBot/pull/11359) skills-like 二次查询后丢失 tool-call 元数据 | OPEN | 修复 #9217，替代已关闭的 [#10620](https://github.com/AstrBotDevs/AstrBot/pull/10620)。影响工具调用名称、参数等元数据保留，PR 待合并。 |
| 低/中 | [#11358](https://github.com/AstrBotDevs/AstrBot/pull/11358) WebChat 粘贴多图只上传第一张并插入文件名 | OPEN | 前端 `useMediaHandling.ts` 问题；修复多图粘贴与 macOS Finder 复制图片文件名误插入。PR 待合并。 |
| 低 | [#11361](https://github.com/AstrBotDevs/AstrBot/issues/11361) t2i 设置找不到 | CLOSED | 用户体验/入口可发现性问题，摘要未说明根因；已关闭。 |
| 低 | [#11302](https://github.com/AstrBotDevs/AstrBot/pull/11302) 命令别名冲突时 WebUI 未展示后端错误 | CLOSED | 已改善错误展示与可诊断性，非运行时崩溃。 |

**稳定性结论**：未发现 release 级崩溃，但平台适配的“静默失败”是今日最大风险。优先关注 [#11325](https://github.com/AstrBotDevs/AstrBot/issues/11325)/[#11354](https://github.com/AstrBotDevs/AstrBot/pull/11354) 与 [#11360](https://github.com/AstrBotDevs/AstrBot/pull/11360)。

## 6. 功能请求与路线图信号

| 需求 | 状态/信号 | 路线图判断 |
|---|---|---|
| [#11362](https://github.com/AstrBotDevs/AstrBot/issues/11362) 多配置文件插件部分独立为适配器黑白名单页面 | OPEN，2 👍，1 评论 | 最可能进入多配置/插件管理路线。需 UI、权限、适配器绑定与配置更新机制设计；若维护者排期，可能成为下一版本候选。 |
| [#11351](https://github.com/AstrBotDevs/AstrBot/issues/11351) 插件向 Web 管理界面发送应用内通知的 API | OPEN | 插件生态 API 需求明确，可与平台发送回执/通知中心结合；目前无 PR，短期需 triage。 |
| [#11350](https://github.com/AstrBotDevs/AstrBot/issues/11350) 聊天唤醒与插件指令前缀分开 | CLOSED | 指令/聊天边界需求，涉及消息路由与权限规则；已关闭但若纳入需核心路由改动。 |
| [#11276](https://github.com/AstrBotDevs/AstrBot/issues/11276) 提示词前缀分层、统一上下文注入以提升缓存命中 | CLOSED | 架构级 RFC，影响 LLM 成本；短期难落地，但长期价值高。 |
| [#11327](https://github.com/AstrBotDevs/AstrBot/issues/11327) 支持 Gitea 仓库插件解析 | CLOSED | 插件来源生态扩展，可能更适合插件/社区实现。 |
| [#11161](https://github.com/AstrBotDevs/AstrBot/issues/11161) 中国移动新消息 Channel | CLOSED | 平台适配请求；关闭不代表进入核心路线，可能由第三方插件承接。 |
| [#11296](https://github.com/AstrBotDevs/AstrBot/issues/11296) 天气守护插件 | CLOSED | 插件提交类需求，非核心路线。 |

**已有开放 PR 更能反映下一版本候选**：插件 continuation API [#11366](https://github.com/AstrBotDevs/AstrBot/pull/11366)、平台发送回执与 QQ/Lark 回复 [#11157](https://github.com/AstrBotDevs/AstrBot/pull/11157)、`weixin_oc` 失败语义 [#11354](https://github.com/AstrBotDevs/AstrBot/pull/11354)、WeCom 同步 [#11360](https://github.com/AstrBotDevs/AstrBot/pull/11360)、WebChat 多图粘贴 [#11358](https://github.com/AstrBotDevs/AstrBot/pull/11358)、Tool-call 元数据 [#11359](https://github.com/AstrBotDevs/AstrBot/pull/11359)、会话删除清理 [#10816](https://github.com/AstrBotDevs/AstrBot/pull/10816)。

## 7. 用户反馈摘要

> 评论正文未提供，以下基于 Issue 描述、标题与讨论热度提炼。

- **部署依赖风险**：NapCatQQ 仓库清空后，Docker 部署文档未同步移除/修正，用户实际部署会踩空；见 [#11310](https://github.com/AstrBotDevs/AstrBot/issues/11310)。
- **多 bot 运营痛点**：用户不希望为隔离插件而复制整套配置，导致其他人格/模型设置更新不及时；见 [#11362](https://github.com/AstrBotDevs/AstrBot/issues/11362)。
- **平台适配可靠性**：微信生态出现“上行正常、下行静默失败”和 WeCom 消息丢失，用户需要明确的发送回执/失败语义；见 [#11325](https://github.com/AstrBotDevs/AstrBot/issues/11325)、[#11360](https://github.com/AstrBotDevs/AstrBot/pull/11360)、[#11157](https://github.com/AstrBotDevs/AstrBot/pull/11157)。
- **上下文与指令边界**：裸 @ 不注入群上下文、唤醒前缀与插件指令前缀混用，用户期望更可预测的聊天/指令分流；见 [#11346](https://github.com/AstrBotDevs/AstrBot/issues/11346)、[#11350](https://github.com/AstrBotDevs/AstrBot/issues/11350)。
- **LLM 成本与缓存**：DeepSeek 请求日志显示缓存未命中 token 远高于命中，用户希望框架默认不破坏缓存；见 [#11276](https://github.com/AstrBotDevs/AstrBot/issues/11276)。
- **插件开发体验**：插件需要向 WebUI 发应用内通知、需要稳定发送回执，而非只能发聊天消息；见 [#11351](https://github.com/AstrBotDevs/AstrBot/issues/11351)、[#11157](https://github.com/AstrBotDevs/AstrBot/pull/11157)。
- **UI 可发现性**：t2i 设置入口找不到、命令别名冲突错误不透明，影响管理体验；见 [#11361](https://github.com/AstrBotDevs/AstrBot/issues/11361)、[#11302](https://github.com/AstrBotDevs/AstrBot/pull/11302)。

**满意度侧写**：Issues 关闭率较高，说明维护响应与清理节奏较好；但部分关闭项可能是讨论/插件提交而非功能实现，平台适配稳定性仍是用户不满的主要来源。

## 8. 待处理积压

| 条目 | 状态/时长 | 维护者关注建议 |
|---|---|---|
| [#11325](https://github.com/AstrBotDevs/AstrBot/issues/11325) `weixin_oc` 下行静默丢弃 + [#11354](https://github.com/AstrBotDevs/AstrBot/pull/11354) 修复 PR | OPEN；高严重度；修复 PR 待合并 | **最高优先级**：合并前需验证“无 message_id 视为失败”是否覆盖真实投递恢复，避免只把静默失败暴露出来。 |
| [#10816](https://github.com/AstrBotDevs/AstrBot/pull/10816) 删除会话时可选清理 UMO 元数据 | OPEN；创建于 2026-10-27，约 29 天 | 长期开放 PR，涉及会话删除后的孤儿元数据；建议 review 并明确与 #10746 的边界。 |
| [#11157](https://github.com/AstrBotDevs/AstrBot/pull/11157) 平台发送回执、恢复 QQ/Lark 回复 | OPEN；创建于 2026-11-15，约 10 天 | 对插件可靠发送很关键，建议优先 review 平台兼容性与回执语义。 |
| [#11360](https://github.com/AstrBotDevs/AstrBot/pull/11360) WeCom 客服消息全量同步 | OPEN | 消息丢失类修复，建议尽快合并或补充测试用例覆盖 `has_more`/cursor。 |
| [#11359](https://github.com/AstrBotDevs/AstrBot/pull/11359) Tool-call 元数据保留 | OPEN | 替代 #10620，建议 review 后关闭重复链路，避免修复长期悬空。 |
| [#11358](https://github.com/AstrBotDevs/AstrBot/pull/11358) WebChat 多图粘贴 | OPEN | 前端体验修复，风险较低，可快速 review。 |
| [#11362](https://github.com/AstrBotDevs/AstrBot/issues/11362) 插件黑白名单隔离页面 | OPEN；2 👍 | 新开高信号需求，建议 triage 并决定是否并入多配置路线图。 |
| [#11351](https://github.com/AstrBotDevs/AstrBot/issues/11351) 插件 WebUI 通知 API | OPEN | 新开插件生态 API 需求，建议给出设计方向或标记 help wanted。 |
| [#4818](https://github.com/AstrBotDevs/AstrBot/issues/4818) 模块化配置与 GitOps | CLOSED；长期议题今日关闭 | 虽已关闭，但其诉求在 #11362 延续；建议建立路线图关联，避免重复讨论。 |

**积压结论**：今日清理了大量 Issues，但 PR 侧仍需关注长期开放的 [#10816](https://github.com/AstrBotDevs/AstrBot/pull/10816)、[#11157](https://github.com/AstrBotDevs/AstrBot/pull/11157)，以及高严重度平台 bug [#11325](https://github.com/AstrBotDevs/AstrBot/issues/11325)。若下一版本临近，建议优先合并微信/WeCom 修复与发送回执相关 PR。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：2026-11-25（周二）｜数据窗口：过去 24 小时**

---

## 1. 今日速览

1. 社区讨论维持高位运行：过去 24 小时 **114 条 Discussions 更新**，但**无新版本发布、无公开合并摘要**（本项目未启用 Issues/PR，代码经 Releases 落地，本窗口 Releases 为空）。
2. 讨论热度高度分散——评论最多的前 15 条累计仅 108 条评论、峰值 17 条，没有单一话题形成压倒性焦点，属于“长尾型社区活跃”而非“事件驱动型爆发”。
3. 今日内容结构明显偏**质量与稳定性**：15 条头部讨论中 6 条是 Bug（含 1 条桌面端启动崩溃、1 条图片上传完全失效），远高于纯功能建议占比。
4. 生态侧信号积极：插件 Showcase 类讨论占据前两条中的一条（#10615，17 评论），第三方插件自身也在快速迭代版本（dsh-code-index v0.14.1）。
5. 综合评估：**社区活跃度 = 高；官方发布节奏 = 本日静默；项目健康度 = 良好但 Windows 平台稳定性与“静默失败”类问题正在累积口碑风险。**

---

## 2. 版本发布

**本日无新版本发布。**

需说明的是，本窗口 Releases 为空并**不代表项目停滞**：过去 24 小时社区讨论中已出现 **0.2.1-rc.5、0.2.2-rc.5、0.2.3-alpha.2（nightly 渠道）** 等多个版本的实测反馈，说明 0.2.2 正式线与 0.2.3 预研线仍在并行推进，只是当天没有新的公开发版记录，因此**本次日报无法提供合并功能清单、破坏性变更与迁移注意事项**。待下一次 Release 落地后应补充完整 changelog 解读。

---

## 3. 项目进展

- **官方代码合并进展：本窗口无可披露数据。** 仓库未启用 PR，且当日 Releases 为零，缺少可用于量化的合并摘要。按项目约定的口径，此处应记录 Releases changelog；本日为空，故不臆测具体功能推进量。
- **可观测的实质推进来自生态层：**
  - 社区插件 **dsh-code-index** 迭代至 **v0.14.1**，新增 Real-Repo Precision、Review Brief、Impact X-Ray 等能力，说明代码索引类插件已进入稳定迭代节奏。[#5623](https://github.com/deepseek-ai/deepseek-harness/discussions/5623)
  - **dsh-design-studio** 设计工作台持续更新演示（画布化多端界面编辑 + 局部修改回灌模型），是当前曝光度最高的插件形态。[#10615](https://github.com/deepseek-ai/deepseek-harness/discussions/10615)
- **判断：** 项目“向前迈进”的主要动能今日来自社区插件与版本实测反馈，而非官方发版；这对生态是正向信号，但核心仓库的对外可见进度在本日偏低。

---

## 4. 社区热点

按累计评论数排序（前 15 条合计 108 条评论）：

| 排名 | 讨论 | 类型 | 评论 | 核心诉求 |
|---|---|---|---|---|
| 1 | [#10615](https://github.com/deepseek-ai/deepseek-harness/discussions/10615) dsh-design-studio | Show Your Plugins | 17 | 把模型产出的多端界面铺到画布上，支持画笔批注后交回模型修改 |
| 2 | [#5505](https://github.com/deepseek-ai/deepseek-harness/discussions/5505) 多文件夹工作区 + primary 文件夹 | Ideas | 14 | 工作区从“单目录强绑定”扩展为有序文件夹列表，对齐 Codex 项目模型 |
| 3 | [#5623](https://github.com/deepseek-ai/deepseek-harness/discussions/5623) dsh-code-index v0.14.1 | Show Your Plugins | 11 | 真实仓库级精度、评审简报、变更影响透视 |
| 4 | [#9662](https://github.com/deepseek-ai/deepseek-harness/discussions/9662) subagent 空字符串路由字段被误判 | Bug | 10 | 空串应视为“未指定”而非显式选择，且报错需给出补救路径 |

**分析：**
- **“可视化 + 局部回改”成为插件最热形态。** #10615 的诉求本质是缩短「看结果 → 提修改」的反馈环，用户不再满足于对话式改代码，而要求直接在渲染结果上点选、批注、下发。
- **项目模型的对齐压力在上升。** #5505 明确以 OpenAI Codex 桌面版为参照，指出真实项目横跨前端/后端/共享库，单目录工作区已成为结构性瓶颈；该提案自 2026-09-03 提出、至今仍 OPEN，是当前**呼声最高且最持久**的核心模型变更。
- **社区插件开始“产品化”。** 排名前三中有两条是插件 Showcase，且都附带版本号与 Release 链接，说明插件作者在把 DSH 当作分发平台经营。

---

## 5. Bug 与稳定性

按严重程度排列（**注：项目未启用 PR，以下均无法标注 fix PR 状态，仅能记录讨论侧信息**）：

**🔴 严重 — 崩溃 / 核心功能不可用**

1. **[#14019](https://github.com/deepseek-ai/deepseek-harness/discussions/14019) 桌面端 0.2.2-rc.5 启动崩溃（Windows）**
   Electron 44.7.0 / Node 24.21.0 / win32 x64，内部 fetch 抛出未捕获 `ECONNRESET`；退出后残留进程导致问题**可复现复发**；环境为非 ASCII（中文）用户名。属“装上就打不开”级别，且自带复发机制。
2. **[#14183](https://github.com/deepseek-ai/deepseek-harness/discussions/14183) 图片上传 100% 失败（Desktop 0.2.3-alpha.2 / Windows 11）**
   点 +、粘贴、拖拽三种路径全部失败，输入框出现红色重试图标；DevTools Network **连请求都没有发出**，说明失败发生在客户端前置环节而非 Host 附件服务。影响多模态主流程。属 nightly 渠道，但 severity 高。

**🟠 中等 — 功能硬失败 / 静默错误**

3. **[#9662](https://github.com/deepseek-ai/deepseek-harness/discussions/9662) subagent 空字符串路由字段被当作显式选择而拒绝**
   `hasDelegationModelRequest()` 将 `provider/model/reasoning_effort: ""` 判为“显式选择子模型”，随后被非空校验直接打回，且错误信息不提供修复提示（0.2.0-rc.2，main 同样存在）。
4. **[#7123](https://github.com/deepseek-ai/deepseek-harness/discussions/7123) 仅含 reasoning 的响应被判为成功 ⇒ 静默空回复**
   `turn/end` 记 `completed`、不重试、无异常日志，用户侧表现为“思考区滚完、正文一个字没有”。**自 2026-09-19 提出，已积压约 9 周仍 OPEN。**
5. **[#10129](https://github.com/deepseek-ai/deepseek-harness/discussions/10129) 内置会话标题插件几乎从不更新**
   根因清晰：标题请求输出额度写死 64 token，强制思考模型把额度全用于 reasoning，`finish_reason=length`，且失败完全静默（0.2.1-rc.2）。
6. **[#14176](https://github.com/deepseek-ai/deepseek-harness/discussions/14176) llm-pi-ai 流空闲看门狗忽略 SSE keepalive 注释**
   长 prefill 期间服务端持续发 `: ...` 保活帧，但看门狗未被喂，连接在 **恰好 300s** 被误杀，直接打断 llama.cpp 长上下文预填充。
7. **[#11767](https://github.com/deepseek-ai/deepseek-harness/discussions/11767) mcp-client streamable-http 被 WAF 前置的 MCP 服务以 403 拒绝**
   版本协商探测触发 WAF 拦截，导致一类企业内网 MCP 服务不可用（0.2.1-rc.5）。

**共性结论：** 今日 Bug 中有 **4 条（#9662、#7123、#10129、#14183）共享同一失败模式——失败不发声、或报错不给补救**。这比单个功能缺陷更值得系统性治理。

---

## 6. 功能请求与路线图信号

| 需求 | 讨论 | 信号强度 | 纳入下一版本的可能性判断 |
|---|---|---|---|
| 多文件夹工作区 + primary 文件夹 | [#5505](https://github.com/deepseek-ai/deepseek-harness/discussions/5505) | ★★★★★（14 评论，近 12 周持续） | **高**——属工作区核心模型变更，且提案已给出“单目录行为作兼容默认值”的平滑迁移方案，落地成本可控 |
| 跨会话记忆作为可插拔 provider | [#13749](https://github.com/deepseek-ai/deepseek-harness/discussions/13749) | ★★★★（与 SessionPersistence 并列的内存 seam） | **中高**——承接 Compaction 与 session-query 之后的自然延伸，且被提议为 provider 而非内核改造，符合插件化路线 |
| 深链打开指定会话 `dsh://open?session=` | [#13820](https://github.com/deepseek-ai/deepseek-harness/discussions/13820) | ★★★（外部工具/AI HUD 集成刚需） | **中**——改动面小，但涉及协议契约设计 |
| 语音输入可配置快捷键 | [#7543](https://github.com/deepseek-ai/deepseek-harness/discussions/7543) | ★★（4 评论，9 周无进展） | **中低**——实现简单，但优先级易被挤压 |
| macOS Intel（x86_64）桌面端支持 | [#8807](https://github.com/deepseek-ai/deepseek-harness/discussions/8807) | ★★★（6 评论，含情绪化诉求） | **低**——官网明确标注 Intel Mac 暂不支持，短期大概率维持现状，属资源分配取舍 |

> 说明：因本窗口无 Releases/合并记录，无法交叉验证上述需求是否已进入开发分支，以上为**基于讨论内容与项目架构取向的推断**，非官方路线图确认。

---

## 7. 用户反馈摘要

**满意点**
- Web 端体验获得正面评价：“一直在用 `npx @deepseek-ai/dsh web`，体验很好，非常感谢团队的工作”（#8807），说明 Web 形态已具备稳定用户基础。
- 会话压缩（Compaction）与会话查询能力被评价为 “excellent”（#13749），长跑 Agent 用户认可这块基础设施。
- 插件体系获得真实生产验证——有用户已基于 DSH 0.2.2-rc.5 构建并运行多个长时 Agent（#13749）。

**痛点（按出现频次）**
1. **成本不可审计（信任级问题）**：#10729 中用户将主模型切换为 MiniMax，但 `web_search` 仍每次调用 DeepSeek 服务端 `deepseek-v4-flash`，UI 无任何提示；2,717 次搜索产生 **2,877 万 token / ¥68.30**，而导出的 session 日志里**没有任何 usage 记录**。用户在意的不是花钱，而是“账对不上、不知情”。
2. **静默失败反复出现**：空回复（#7123）、标题不更新（#10129）、上传无请求（#14183）、错误不给补救（#9662）——用户普遍需要自己去翻日志、抓 DevTools 才能定位问题。
3. **Windows 平台体验落后于 macOS**：启动崩溃、非 ASCII 用户名、图片上传失效，三条高优先级 Bug 全部来自 Windows 11。
4. **硬件门槛造成事实上的用户排除**：仅提供 arm64 安装包，Intel Mac 用户“装了也打不开”，语气带有明显失落（#8807）。
5. **长上下文/本地模型场景被误杀**：llama.cpp 长 prefill 在 300s 处被看门狗判定为死连接（#14176），影响本地推理用户群。

---

## 8. 待处理积压（提醒维护者关注）

| 讨论 | 创建日期 | 已积压 | 状态 | 风险 |
|---|---|---|---|---|
| [#7123](https://github.com/deepseek-ai/deepseek-harness/discussions/7123) 仅 reasoning 响应被判成功 ⇒ 静默空回复 | 2026-09-19 | **约 9.5 周** | OPEN，4 评论 | 高——影响所有强制思考模型的用户，且无日志可查，属“难以自证的 Bug” |
| [#5505](https://github.com/deepseek-ai/deepseek-harness/discussions/5505) 多文件夹工作区 + primary | 2026-09-03 | **约 12 周** | OPEN，14 评论 | 高——社区呼声最高的核心模型变更，长期无结论会持续消耗信任 |
| [#7543](https://github.com/deepseek-ai/deepseek-harness/discussions/7543) 语音输入可配置快捷键 | 2026-09-22 | 约 9 周 | OPEN，4 评论 | 中低——成本小，适合作为“低成本好感度”修复项顺手清掉 |
| [#9662](https://github.com/deepseek-ai/deepseek-harness/discussions/9662) subagent 空串路由字段 | 2026-10-14 | 约 6 周 | OPEN，10 评论 | 中高——main 分支同样存在，属可稳定复现的逻辑缺陷 |
| [#5623](https://github.com/deepseek-ai/deepseek-harness/discussions/5623) / [#10615](https://github.com/deepseek-ai/deepseek-harness/discussions/10615) 社区插件 Showcase | 2026-09-04 / 2026-10-22 | 持续更新 | OPEN | 低——但建议官方给出插件收录/推荐机制，否则优质生态成果缺少沉淀入口 |

---

**维护建议（基于本日数据）**
1. **优先处理 #14019 与 #14183**：一条是“打不开”，一条是“核心输入通道失效”，均直接影响留存。
2. **把“静默失败”作为一类问题治理**：为 reason-only 响应、标题生成、附件上传统一补上可见错误与 usage 记录，可一次性闭环 #7123 / #10129 / #14183 / #10729 四条反馈的共同根因。
3. **对 #5505 给出公开结论**（采纳 / 分级采纳 / 暂不采纳），这是当前投入产出比最高的社区关系动作。
4. **下一次 Release 落地后，需补齐 changelog 摘要**，以恢复“合并进展可观测”这一日报基础项。

*数据来源：DeepSeek Harness GitHub Discussions（2026-11-25 抓取，114 条更新，展示评论数前 15 条）；本项目未启用 Issues/PR，Releases 当日为空。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*