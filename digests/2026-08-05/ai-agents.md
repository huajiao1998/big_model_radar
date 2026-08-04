# OpenClaw 生态日报 2026-08-05

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-04 22:51 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-05

## 1. 今日速览

过去 24 小时项目维持超高活跃度：Issues 侧更新 500 条（新开/活跃 449 条，关闭 51 条），PR 侧同样更新 500 条（待合并 376 条，合并/关闭 124 条），日均 Issue/PR 刷新频率处于近期高位。发布 2 个补丁版本（v2026.7.1-1 / v2026.7.1-2），均不包含破坏性变更，聚焦 npm 插件元数据兼容与 Codex 回合结束异常修复。

需要关注的健康度信号有三：一是大量 P1 级问题仍处于 `needs-maintainer-review` 或 `needs-product-decision` 状态，维护者 backlog 压力较大；二是“消息丢失”（message-loss）与“会话状态异常”（session-state）类问题在 top 讨论中反复出现，说明核心消息管线的稳定性仍是社区痛点；三是社区对老问题的持续跟进疲态明显——多个 3 月创建的 P1 级 Issue 至今仍处于 open 状态，无明确修复排期。整体判断：项目迭代速度快，修复质量良好，但积压的系统性稳定性问题需要维护团队从架构层面给出回应，而非单点打补丁。

## 2. 版本发布

本周期共发布 2 个版本，均为补丁修复，不涉及破坏性变更：

### v2026.7.1-2
- **npm 插件更新修复**：接受新版 npm 客户端返回的 singleton-array 元数据，确保受跟踪的官方插件可正常安装并更新到修订版本。关联 PR：#108336

### v2026.7.1-1
- **Codex 进度回复修复**（#106961、#108487）：修复 Codex 在发送进度消息后提前结束 app-server 回合的问题，现在会保持回合运行，确保 GPT/Codex 输出权威的最终回复，而不是中途停止。感谢 @joshavant。
- **Memory Core 启动修复**：恢复从派生的 legacy-index 与 cache 结构的启动修复路径。

迁移注意：两个版本均为内部修复，无配置变更或数据库迁移要求，常规升级即可。

## 3. 项目进展

今日合并的 PR 可分为两类：面向用户的功能修复，以及以降低维护成本为目的的大规模测试/代码重构。

**面向用户的重要修复：**

- **#118424** fix(codex): restore prerelease media validation —— 修复完整发布验证套件在 bounded Codex media turns 收紧隔离契约后失败的问题（由 @vincentkoc 提交）。
- **#118353** fix: Control UI avatars load with Tailscale identity auth —— 修复使用 Tailscale Serve 身份认证时，Control UI 头像请求返回 401，导致页面无法渲染头像的问题（相关 Issue #118341）。
- **#119257** fix(media): release rejected BytePlus and Runway video downloads under debug capture —— 修复 debug 代理开启时，BytePlus/Runway 返回 HTTP 200 但 body 非视频（如 JSON 错误页）时生成任务卡死的问题。
- **#119068** fix: error when gateway port is busy but process cannot be identified —— 让 `openclaw gateway stop` 在端口被占用但无法识别 PID 时正确报告错误而非误报“已停止”。
- **#107663** docs: add ChromeOS (Crostini) platform install guide —— 新增 ChromeOS（Crostini 容器）安装指南，覆盖四个与普通 Linux 主机不同的坑。

**内部质量与重构（@steipete 主导的系列合并）：**

steipete 今日集中合并了一批测试夹具（fixture）整合重构，覆盖 macOS 网关生命周期（#118412）、Docker 构建辅助（#118416）、agents 主会话恢复（#118411）、运行时认证（#118413）、插件 SDK 别名（#118410）、OpenCode 会话目录（#118323）、Google Meet 节点主机（#118407）、config 红actions 遍历（#118397）、doctor 转录标签迁移（#118290）等模块。这些重构不改变行为，但大幅消除测试代码重复，降低后续维护成本——例如 Docker 构建辅助套件清理了 893 行重复的测试代码。这类内部清理对项目长期健康度的价值不亚于功能开发。

**仍待合并的关键 PR（值得关注）：**

- **#119364** fix: prevent denied MCP tools from reaching native agent runs —— 修复配置的 MCP server 直连原生 Claude/Codex/Gemini 客户端时绕过 `tools.allow` / `tools.deny` 分层过滤的问题。这是一个安全边界修复，规模 XL，目前状态 open。
- **#119023** fix(slack): preserve channel context in bot-opened threads —— 修复 Slack 机器人在频道中开设回复帖后丢失频道上下文的问题，P1 级别，待维护者审查。

## 4. 社区热点

以下 Issue/PR 吸引了最多的讨论和关注，反映了社区的集中诉求：

1. **#116277 DeepSeek v4 Flash 静默回复失败（104 条评论，已关闭）**：模型在 Telegram 群消息中静默失败，只输出泛化回退文案“No reply was generated for this message”。虽已关闭，但 104 条评论说明用户对模型静默失败、无重试、无日志引导的体验非常不满。社区关注点不仅是 DeepSeek，而是“当第三方模型失败时，OpenClaw 应如何优雅降级”。

2. **#116201 Realtime voice 会话状态无界增长（58 条评论，OPEN）**：实时语音会话的 provider 帧、预就绪音频、已过期 consult 工作等资源缺乏硬性所有权边界，慢速或突发场景下会无限累积。这触及多模态会话的资源管理的架构性问题，已标记 `needs-product-decision`。

3. **#115326 Crash-loop breaker 导致 Discord/WhatsApp 被永久抑制（25 条评论，已关闭）**：崩溃循环保护机制在重启后仍持续抑制通道，且文档记载的恢复路径 `channels.start` 以 WebSocket 1006 失败。该问题已关闭，但从评论看用户对“保护机制反噬可用性”的抱怨具有代表性。

4. **#118846 Gateway 主线程被插件元数据快照耗尽（14 条评论，OPEN）**：Docker 环境下 gateway 启动后主线程持续 100% CPU，本地 RPC 在 ws_upgrade 阶段因资源耗尽断开。这是性能回归类问题，直接影响所有 Docker 用户，目前尚无 fix PR。

5. **#91363 Isolated cron 一致性地 LLM 请求失败（10 条评论，6👍，OPEN）**：`sessionTarget: "isolated"` 的 cron 任务无论 `timeoutSeconds` 如何设置，请求都卡在 model-call-started 阶段，从未到达 provider。6 个 👍 表明多数 cron 重度用户都遇到过相同问题。

社区热点背后的诉求可归纳为：**更可靠的消息交付（不静默失败）、更强的资源管理边界（voice/cron/gateway）、更透明的状态反馈（错误可诊断、可恢复）**。Diamond lobster 级别（最高优先级标签）的 Issue 今天就有 15 个以上，其中多数已等待维护者决策超过一周，社区情绪存在积累风险。

## 5. Bug 与稳定性

按严重程度排列今日活跃的 Bug 类问题（含是否已有修复 PR）：

### P1 级（影响核心消息/会话链路）

| Issue | 问题摘要 | 状态/修复 |
|---|---|---|
| [#118846](https://github.com/openclaw/openclaw/issues/118846) | Gateway 主线程从启动起被 plugin-metadata 快照 + fs stat 打满，本地 RPC 在 ws_upgrade 时断开 | OPEN，无 fix PR，影响所有 2026.7.2-beta.7 Docker 用户 |
| [#115908](https://github.com/openclaw/openclaw/issues/115908) | 会话副本投影在持续写入下进入 livelock，主线程阻塞数十秒，所有通道停摆 | OPEN，无 fix PR，重活负载场景触发 |
| [#119263](https://github.com/openclaw/openclaw/issues/119263) | Agent DB v14→v15 迁移失败（`no such column: entry_valid`），gateway 拒绝启动 | OPEN，有 `linked-pr-open` 标记，升级用户会阻断 |
| [#116010](https://github.com/openclaw/openclaw/issues/116010) | 所有持久会话上下文被硬编码截断在 128k，与模型/配置无关 | OPEN，有 linked PR |
| [#116277](https://github.com/openclaw/openclaw/issues/116277) | DeepSeek v4 Flash 静默失败，无回复生成，仅输出泛化回退文案 | CLOSED（已有关联 PR），但缺乏事后重试机制 |
| [#115326](https://github.com/openclaw/openclaw/issues/115326) | Crash-loop breaker 永久抑制 Discord/WhatsApp，`channels.start` 恢复失败（WebSocket 1006） | CLOSED（已修复） |
| [#117609](https://github.com/openclaw/openclaw/issues/117609) | 瞬时 LLM/socket 错误在 embedded-assistant 阶段不重试，长回合整体死亡 | OPEN，无 fix PR，属重试策略盲区 |

### P1 级（影响核心消息/会话链路）

| Issue | 问题摘要 | 状态/修复 |
|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | hook/tool 子进程未回收，zombie 进程累积导致运行时劣化 | OPEN，`clawsweeper-recovery-stuck` |
| [#115642](https://github.com/openclaw/openclaw/issues/115642) | 订阅制计费错误触发 5 小时冷却，且无恢复/重置手段 | OPEN，需产品决策 |
| [#111498](https://github.com/openclaw/openclaw/issues/111498) | macOS 上 Anthropic 恢复后遗留 workspace-state 迁移阻塞所有回合 | OPEN，`clawsweeper-recovery-stuck` |
| [#115700](https://github.com/openclaw/openclaw/issues/115700) | 模型完成后 `chat.send` 因 stale `expectedLeafEntryId` 持续拒绝 | OPEN，有 linked PR |

### P2 级（功能异常但不阻塞主链路）

- [#118739（未见）] Discord 多段回复中错误行之后的全部后续内容被静默丢弃（#96007，有 linked PR）
- [#43747](https://github.com/openclaw/openclaw/issues/43747) Memory 管理行为在团队成员间不一致（chunking/embedding 与文件存储并存），用户困惑
- [#89278](https://github.com/openclaw/openclaw/issues/89278) Codex OAuth 刷新时间略超 10 秒即被 cron/heartbeat 判定失败
- [#108215](https://github.com/openclaw/openclaw/issues/108215) 上下文占用从 57% 无压缩地骤降至 13%，计数器为 0，疑似会话投影异常

### 稳定性总体评价

修复速度（51 个 Issue 关闭、124 个 PR 合并/关闭）与问题出现速度（449 条新开/活跃）基本持平，但新 P1 问题中仍有约一半无关联修复 PR。其中 #118846（gateway 主线程饱和）和 #115908（projection livelock）都属于架构级性能问题，若不能尽快定位，将持续耗费社区信任。

## 6. 功能请求与路线图信号

今日活跃的功能请求呈现出两个清晰的信号：

**信号一：用户对“控制权”的需求正在增强——语音、模型选择、界面呈现都要走自己的配置。**

- [#45508](https://github.com/openclaw/openclaw/issues/45508) [Feature]: Self-hosted STT/TTS provider support in webchat —— 当前 WebChat 的“朗读”与“语音输入”只能走浏览器 Web Speech API，完全无视 openclaw.json 中的 TTS/STT 配置。评论 7 条、2👍，提交于 3 月 13 日，至今未进入开发。
- [#45501](https://github.com/openclaw/openclaw/issues/45501) `session.resetPrompt` —— 希望 `/new` 或 `/reset` 后注入的 session 启动文案可由用户配置。
- [#42276](https://github.com/openclaw/openclaw/issues/42276) Reasoning stream —— 希望像 OpenAI/Grok 那样原地更新思考过程输出。

这些请求的共同点是：OpenClaw 作为自托管助手，配置项应覆盖到前端界面和语音链路的每一个角落。结合已提交的 PR ——#119325（`/model -s` 新增仅当前会话生效的模型选择）、#119023（Slack 机器人开设的回复帖保留频道上下文）、#117129（cron webhook 的 bearer 目的地可限定）——下一版本很可能补上这些“日常可控性”的功能点。

**信号二：浏览器工具与自动化编排仍是需求洼地。**

- [#44431](https://github.com/openclaw/openclaw/issues/44431) 浏览器工具 7 项改进（CSS 选择器支持、视觉化快照、减少冗长 ref 流程等），基于 9+ 个邮箱服务商的真实自动化测试，P2 级，10 条评论。
- [#92369](https://github.com/openclaw/openclaw/issues/92369) Subagent 在 cron isolated 会话中的编排——需要可靠地派生、等待并聚合子代理结果，8 条评论、2👍。
- [#45771](https://github.com/openclaw/openclaw/issues/45771) 内置 pace-aware 速率限制，防止自主循环烧穿 Anthropic API token。

**可能进入下一版本的判断：** 与已有 PR 关联的功能请求优先级最高。目前 #119023（Slack 线程上下文）和 #119325（/model -s）均已提交 PR 且在等待审查，有较大概率进入 2026.7.2 后续补丁或 2026.8 版本。而 #45508（WebChat TTS/STT 走网关）虽无 PR，但涉及架构调整，更适合作为 8 月主版本的功能点；#44431 浏览器改进已测试充分，若维护者认可则可以低风险合入。

## 7. 用户反馈摘要

从今日 Issues 评论与点赞中提炼的真实用户反馈：

**最痛的点——静默失败与不可恢复的卡死：**

- [#116277](https://github.com/openclaw/openclaw/issues/116277)（104 评论）的用户描述：“OpenClaw 发布了回退消息‘No reply was generated for this message’，但没有任何日志说明为什么模型没有生成回复。”用户对“失败可诊断性”的诉求极高。
- [#91363](https://github.com/openclaw/openclaw/issues/91363)（6👍）的 cron 用户反馈：“我设置了 `timeoutSeconds: 300`，但请求在 model-call-started 阶段就超时了，usage.input=0，说明根本没有发出请求。”——针对 isolated cron 的系统性不可用。
- [#115908](https://github.com/openclaw/openclaw/issues/115908) 的用户观察：“事件循环卡了几十秒，Telegram、Discord、WhatsApp 全部同时停止响应。”——单点故障影响所有通道。

**有代表性的积极反馈：**

- [#41372](https://github.com/openclaw/openclaw/issues/41372)（4 周自托管生产使用报告）总结道：“整体上 OpenClaw 在 2GB VPS 上表现稳健，Telegram/Discord + cron 的核心场景可用；但配置崩溃和文档缺口在升级时会消耗大量排障时间。”这位用户一次性贡献了 25 条发现，属于高价值、建设性的深度反馈。
- 新文档类改动（如 #107663 ChromeOS 安装指南）在社区得到正面评价，用户自主贡献文档的意愿较高。

**功能反馈的典型诉求：**

- [#45508](https://github.com/openclaw/openclaw/issues/45508)（WebChat 语音）用户说：“我已经在 openclaw.json 配好了本地的 Piper TTS，但 WebChat 的朗读按钮完全不理会它。”——配置端到端一致性是自托管用户的核心预期。
- [#43747](https://github.com/openclaw/openclaw/issues/43747)（Memory 管理）用户表示：“我们 3 个人用同一个版本的 OpenClaw，记忆行为却完全不一样，一个是 SQLite chunking，一个写成了文件。这让我们没法信任记忆功能。”——跨环境一致性对团队用户是硬需求。

**社区情绪整体评估：** 对项目迭代速度和功能广度认可度高，但对“模型失败时的行为可预期性”与“通道资源饱和时的自我保护机制”容忍度低。老问题（3 月创建）长期 open 会积累负面情绪，尤其是影响了真实业务场景的 #44134（Google Antigravity 因工具架构频繁重载被误判为滥用而封号）、#40611（心跳导致 Telegram 被阻塞）等。

## 8. 待处理积压

以下为长期未响应/未修复的重要 Issue，按创建时间排序，提醒维护者优先关注：

1. **[@40611](https://github.com/openclaw/openclaw/issues/40611)（2026-03-09 创建，P1，OPEN）** PR #39182 引发的心跳激进重试导致 Telegram 在活跃会话中被阻塞。3 月报告的问题至今仍接受新评论（最后更新 08-04），说明用户仍在受影响。

2. **[@41744](https://github.com/openclaw/openclaw/issues/41744)（2026-03-10 创建，P1，OPEN，linked-pr-open）** Feishu `read` 图片工具结果在最终外发载荷前丢失。飞书是中文用户重要渠道，已有 PR 但久未合并。

3. **[@44134](https://github.com/openclaw/openclaw/issues/44134)（2026-03-12 创建，P1，OPEN）** 频繁工具 schema 重载导致 Google Antigravity 误判滥用并封禁账号——这是“影响平台账号安全”的严重问题，涉及 auth-provider 信任，应升级处理。

4. **[@43367](https://github.com/openclaw/openclaw/issues/43367)（2026-03-11 创建，P1，OPEN）** 多代理编排不稳定：并发 `agents add` 配置互相覆盖、session-lock 失败、子任务游离。多代理是核心卖点，此问题拖了 5 个月。

5. **[@75380](https://github.com/openclaw/openclaw/issues/75380)（2026-05-01 创建，P1，OPEN）** `provider-payload.jsonl` 和 `cache-trace.jsonl` 无上限增长，无轮转策略，既吃磁盘又可能泄露敏感 payload——安全与运维双风险。

6. **[@89278](https://github.com/openclaw/openclaw/issues/89278)（2026-06-02 创建，P1，OPEN）** Codex OAuth 刷新超过 10 秒即导致 cron/heartbeat 失败。来自 2 个 👍，6 月至今未修复。

7. **[@91363](https://github.com/openclaw/openclaw/issues/91363)（2026-06-08 创建，P1，OPEN，recovery-stuck）** Isolated cron 一致性地 LLM 请求失败（6👍）。6 月报告，8 月仍在活跃讨论，属高频刚需场景的硬伤。

8. **[@115908](https://github.com/openclaw/openclaw/issues/115908)（2026-07-29 创建，P1，OPEN）** 会话投影 livelock 阻塞主线程，无 fix PR。Diamond lobster 级，值得优先排查。

另一方面，PR 积压也值得关注：#119364（MCP 工具绕过 allow/deny 的安全修复，XL 规模）和 #119023（Slack 线程上下文，P1）均处于待维护者审查状态。在今日 500 条 PR 中 376 条待合并——比例偏高，建议维护团队检查是否有依赖冲突或验证阻塞，以免修复堆积导致社区失去耐心。

---

*本报告基于 GitHub 公开数据自动生成，链接均指向 openclaw/openclaw 仓库的原始 Issue/PR。数据获取时间：2026-08-05。*

---

## 横向生态对比

## 横向对比分析报告：个人 AI 助手/自主智能体开源生态（2026-08-05）

### 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于高速扩张期，头部项目单日 Issue/PR 更新量可达千条级别，社区热情空前。但普遍存在维护者瓶颈：OpenClaw 与 hermes-agent 均有超过 370 个 PR 待合并，合并速度跟不上提交速度。安全加固、稳定性修复、成本可观测性成为多项目共同焦点；同时，跨通道一致性、权限模型、自主编排等更深层次需求正在浮出水面。整体生态从“功能堆叠”转向“可靠性竞争”，开发者对静默失败、资源失控、安全边界的容忍度显著降低。

### 2. 各项目活跃度对比

| 项目 | Issues 更新数 | PR 更新数 | Release | 健康度评估 |
|---|---|---|---|---|
| OpenClaw | 500（449 活跃 / 51 关闭） | 500（376 待合并 / 124 合并关闭） | 2 个补丁（v2026.7.1-1/-2） | 高活跃、修复质量良好，但 P1 架构问题积压，维护者 backlog 压力大 |
| Zeroclaw | 50（48 活跃 / 2 关闭） | 50（47 待合并 / 3 合并关闭） | 无 | 安全响应迅速、PR 提交活跃，但 RFC 审阅与作者跟进积压 |
| PicoClaw | 3（2 活跃 / 1 stale 关闭） | 4（2 待合并 / 2 stale 关闭） | 无 | 活跃度低，合并节奏偏慢，存在高价值 PR 被 stale 误伤风险 |
| QwenPaw | 25（14 新开 / 11 关闭） | 49（28 待合并 / 21 合并关闭） | 无（处于 v2.1.0-beta.1 后稳定迭代） | 健康度良好，Bug 闭环快，但微信通道紧急问题待解 |
| hermes-agent | 500（446 活跃 / 54 关闭） | 500（414 待合并 / 86 合并关闭） | 无 | 社区极活跃但合并瓶颈明显，修复跟进及时，插件生态压力大 |
| AstrBot | 22 | 18 | 无（最新 v4.27.1） | 健康度良好，维护响应及时，核心插件管理链路待加强 |

*注：各项目统计口径略有差异，Issues/PR 均指过去 24 小时更新量。*

### 3. OpenClaw 在生态中的定位

OpenClaw 是当前生态的**核心参照项目**，社区规模最大（Issue/PR 双 500 更新/日），且保持高频补丁发布（单日 2 个版本），迭代节奏领先。其优势在于：
- **全渠道覆盖**：Telegram、Discord、WhatsApp 等主流平台均有深度适配，并有 ChromeOS 等新平台指南；
- **插件生态成熟**：基于 npm 的官方插件跟踪机制，社区贡献活跃；
- **与 Codex 深度集成**：在 GPT/Codex 输出权威回复、回合控制上持续修复，形成差异化能力。

技术路线上，OpenClaw 走“全能型基座”路线，功能广度优先，但由此带来架构复杂度——消息管线稳定性、Gateway 资源饱和等系统性问题突出。相比 Zeroclaw（Rust、安全优先）、QwenPaw（Python、中文生态）、hermes-agent（桌面多租户），OpenClaw 更贴近个人用户与全场景自动化，但架构债的清理将成为未来健康度的关键。

### 4. 共同关注的技术方向

- **消息可靠性与会话状态一致性**（OpenClaw、QwenPaw、hermes-agent、PicoClaw）  
  具体诉求：不静默失败、失败可诊断、自动重试、资源不无限增长。例如 OpenClaw 的“消息丢失”、QwenPaw 的微信一次性 token 被提前消耗、hermes-agent 的跨标签串扰、PicoClaw 的 MCP 故障导致会话挂死。

- **细粒度安全权限与认证边界**（Zeroclaw、OpenClaw、QwenPaw、hermes-agent）  
  具体诉求：MCP 工具必须遵守 allow/deny 过滤、Webhook 必须 fail-closed、跨 agent 资源需隔离、高风险命令审批需在所有通道可达。Zeroclaw 已通过类型化边界（`VerifiedWebhookIngress`）落地，其他项目仍在处理绕过或不可达问题。

- **成本可观测性与流量控制**（PicoClaw、QwenPaw、hermes-agent）  
  具体诉求：缓存 token 命中统计、prompt caching 参数支持、限流自动退避、按 cron 任务覆盖推理开销。PicoClaw 有 3 个缓存 token 相关 PR，QwenPaw 用户直接要求 provider 层支持 GPT-5.6 缓存参数。

- **跨通道行为一致性**（OpenClaw、QwenPaw、Zeroclaw、hermes-agent）  
  具体诉求：审批提示、会话上下文、身份认证等应在 Web/Telegram/微信/Console 等通道上表现一致，避免“某个通道不能用”或上下文丢失。

- **插件/扩展生态治理**（OpenClaw、hermes-agent、Zeroclaw、AstrBot）  
  具体诉求：PR 合并速度跟不上提交、stale 机制误伤高价值贡献、需要社区合并管家或自动化审查。hermes-agent 414 个待合并 PR，OpenClaw 376 个，AstrBot 有等待 77 天未合并的 PR。

### 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 |
|---|---|---|---|
| OpenClaw | 全渠道个人助手、插件生态、Codex 深度集成、多代理编排 | 个人开发者、追求功能广度与自动化的高级用户 | 多语言/Node 插件体系，网关 + 通道模块，快速迭代 |
| Zeroclaw | 安全优先的智能体运行时、细粒度权限模型、OpenAI 协议兼容、Goal mode | 企业、安全敏感场景、边缘部署 | Rust 实现，类型化边界（如 `VerifiedWebhookIngress`），强调 fail-closed |
| PicoClaw | 轻量级多 provider 助手、搜索 Provider 扩展、缓存成本观测 | 轻量部署、资源受限环境、偏好极简的用户 | Go 实现，多 provider 抽象，注重可观测性 |
| QwenPaw | 中文生态深度绑定（微信/飞书）、Qwen 模型优化、AgentScope 集成 | 中文个人用户、腾讯系企业、需要免费模型（如 deepseek-v4-flash）的用户 | Python 实现，插件化，内置 App Center，优先保证消息闭环 |
| hermes-agent | 桌面优先、多租户隔离、企业协同、插件扩展（超 400 个待合并 PR） | 企业级用户、桌面重度用户、需要多用户管理的团队 | Python 桌面应用（Electron?），配置中心 + CLI + 桌面，大社区规模 |
| AstrBot | 中文聊天机器人框架、插件市场、WebUI、OneBot 兼容、session_waiter 增强 | 中文社区、QQ/微信机器人开发者、快速搭建 | Python 实现，插件生态活跃，WebUI 体验持续优化 |

### 6. 社区热度与成熟度分层

- **第一梯队（日更新 ≥500，快速迭代阶段）**：OpenClaw、hermes-agent。两者社区规模最大，Issue/PR 数量级相同，但合并压力也最大。OpenClaw 能保持补丁发布，hermes-agent 则出现严重合并滞后（414 待合并）。此梯队处于“功能扩张快、架构债累积”的阶段。

- **第二梯队（日更新 20–50，功能扩展与质量巩固并行）**：Zeroclaw、QwenPaw、AstrBot。Zeroclaw 以安全修复为主线，RFC 密集；QwenPaw 在 beta 后快速修 Bug，并有多名 first-time contributor；AstrBot 聚焦 WebUI 回归修复和插件审核，维护响应及时。该梯队项目特色鲜明，社区规模适中，健康度较好。

- **第三梯队（日更新 <10，停滞或维护者不足）**：PicoClaw。活跃度低，PR 长期未评，甚至有价值修复被 stale 关闭。若维护者不加快响应，可能失去社区信任。

### 7. 值得关注的趋势信号

- **“不静默失败”成为底线要求**：多个项目的高赞 Issue 集中在模型调用失败无日志、无重试、只返回泛化提示。开发者应优先构建失败可诊断、行为可预期的运行时，而非只追求功能覆盖。

- **安全边界正在从“可选加固”变为“默认架构”**：MCP 工具权限绕过、未认证 Webhook、跨 agent 数据泄漏等被反复报告。类型化状态（如 Zeroclaw 的 `VerifiedWebhookIngress`）和 fail-closed 设计将成为新一代智能体的基准实践。

- **成本可观测性是刚需**：缓存 token 统计、prompt caching 显式参数、限流退避策略等需求在多项目涌现。AI 智能体开发者应内置成本指标暴露，否则将面临用户信任流失。

- **互操作性驱动生态整合**：OpenAI Chat Completions 兼容层（Zeroclaw #8603）、MCP 工具标准化、多 provider 支持，均指向“融入主流 LLM 工具链”。独立智能体平台难以单独存活，协议兼容是通往更大生态的门票。

- **从“对话”到“有界任务执行”**：Zeroclaw 的 Goal mode、OpenClaw 的 subagent 编排、QwenPaw 的多模型并行诉求，反映用户希望智能体能跨回合执行真实工作流。但“有界”是关键词——任务必须可中断、可恢复、资源有上限，否则会引发新的稳定性灾难。

- **PR 积压与 stale 误伤正在威胁社区生态**：OpenClaw 与 hermes-agent 的待合并 PR 数量已超出维护者处理能力，PicoClaw 的 stale 关闭已经造成修复流失。社区需要引入自动化审查、社区维护者机制，或更严格的 PR 准入标准，以保护贡献者积极性。

**对开发者的参考价值**：在设计 AI 智能体时，务必把消息可靠性、安全边界、成本可观测性、资源上限和协议兼容性作为第一优先级；同时关注社区治理，避免因合并瓶颈而扼杀生态活力。未来的竞争将从“谁会做”转向“谁做得稳、做得安全、做得可维护”。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-05

> 数据窗口：2026-08-04 过去 24 小时 · 数据来源：github.com/zeroclaw-labs/zeroclaw

## 今日速览

过去 24 小时 ZeroClaw 项目保持高活跃度：50 条 Issue 更新（48 条活跃、2 条关闭）、50 条 PR 更新（47 条待合并、3 条已合并/关闭），无新版本发布。安全加固是今日主线——上周披露的 P0 Webhook 未认证漏洞（[#9565](https://github.com/zeroclaw-labs/zeroclaw/issues/9565)）已有修复 PR 合并，维护者同时集中提交了知识图谱归属、会话工具权限、Webhook 认证入口等一批安全修复 PR；多个高热度安全/架构 RFC 仍在密集修订，社区对权限模型、认证边界的关注度持续处于高位。整体项目健康度良好：安全响应迅速、PR 提交活跃，但 RFC 审阅与作者跟进存在明显积压。

## 版本发布

本期无新版本发布。

## 项目进展

### 已合并/关闭

- **[PR #9569 已关闭] fix(gateway): fail closed when a WhatsApp Cloud or Linq webhook cannot be verified** — P0 安全修复：未配置签名密钥时拒绝 Webhook 请求而非跳过校验，对应漏洞 [#9565](https://github.com/zeroclaw-labs/zeroclaw/issues/9565)。这是今日确认合并的最重要修复。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9569

- **[Issue #8568 已关闭] RFC: Mixture-of-Agents (MoA) 虚拟模型提供商** — MoA 聚合器/裁判模型的讨论告一段落，具体是否进入实现待后续跟踪。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/8568

### 今日新提交的重要 PR

- **[PR #9745] fix(memory): 知识图谱 per-agent 归属与作用域** — 修复 [#9647](https://github.com/zeroclaw-labs/zeroclaw/issues/9647)（P1 安全）：`knowledge` 工具不再暴露全局共享图。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9745

- **[PR #9746] fix(tools): 会话工具与 discord_search 的 per-agent 所有权检查** — 修复 [#9646](https://github.com/zeroclaw-labs/zeroclaw/issues/9646)（P1 安全）：`sessions_list/history/send` 绑定可信 agent 注册上下文，先授权后读写。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9746

- **[PR #9744] refactor(gateway): 要求 Webhook 入口认证通过后才可进入 agent 分发** — 新增 `webhook_ingress.rs`，以密封类型 `VerifiedWebhookIngress` 作为传输层校验与 agent 分发之间的强制边界。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9744

- **[PR #9750] fix(service): 限制 launcher-owned daemon 日志为有界捕获** — 替换无界固定文件重定向，单个捕获文件上限 8 MiB，使用有界非阻塞队列。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9750

- **[PR #9747] refactor(providers): 集中化端点元数据** — 为每个模型提供商族增加 `Fixed` / `Dynamic` / `OperatorRequired` / `CliBacked` 端点分类，由同一类型化 provider-slot 分发生成。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9747

- **[PR #9755] ci(check): 强制执行 workspace 全成员 no-default 警告检查** — 将 no-default-features 矩阵从根包扩展到全部非桌面成员，并 deny rustc warnings。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9755

- **[PR #9754] fix(channels): 将 Slack 生命周期本地化辅助函数 gate 到 channel-slack feature** — 消除未启用 Slack 时的无效编译项。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9754

项目整体正从"上报安全问题"快速进入"修复落地"阶段，同时伴随 CI、日志、提供商元数据等基础设施清理。

## 社区热点

高讨论量 Issue 集中在三大主题：

1. **OpenAI 协议兼容** — [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) *RFC: ZeroClaw Chat Completions profile*（16 评论，本周最高）。社区希望 ZeroClaw 暴露 OpenAI Chat Completions 协议，使 Open WebUI、LobeChat、Continue.dev、Aider、LangChain 及 OpenAI SDK 等生态工具可直接接入，诉求指向"融入主流 LLM 工具链"。

2. **有界目标任务（Goal mode）** — [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) *RFC: Goal mode v1 — bounded foreground Matrix work*（14 评论，1 👍）。讨论跨多个 agent turn 的持久化目标执行，触及重启移交、通道准入等边界。

3. **全工具权限模型** — [#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) *RFC: Add a per-execution confirmation tier for high-risk shell commands*（13 评论）。8 月 4 日发布修订 2，将 shell 命令策略扩展为统一 all-tool 权限层（Deny/Ask/Allow），并新增四项能力。

紧随其后的有：统一附件架构 [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)（12 评论）、[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) 运行时会话与传输适配器（10 评论）、内存生命周期策略解耦 [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)（10 评论）、可插拔入站认证 [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141)（10 评论）。

**背后诉求**：互操作性（接入既有生态）、细粒度安全权限（可运维、可审计、fail-closed）、架构统一（会话/附件/内存的所有权与层序）。

## Bug 与稳定性

### P0 — 数据丢失/安全风险

- **[#9565] gateway Webhook 处理器未 fail-closed**（WhatsApp Cloud、Linq、WATI）— 攻击者可未经认证将消息注入 agent，S0 严重度，`status: in-progress`。已有两级修复：**[#9569 已合并](https://github.com/zeroclaw-labs/zeroclaw/pull/9569)**（签名验证失败即拒绝）、**[#9744 待合并](https://github.com/zeroclaw-labs/zeroclaw/pull/9744)**（认证入口类型化边界）。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/9565

### P1 — 安全/数据隔离

- **[#9647] 知识图谱无 per-agent 归属** — 任一 agent 可读写其他 agent 的知识图谱，S0 严重度，`status: accepted`。修复 PR **[#9745](https://github.com/zeroclaw-labs/zeroclaw/pull/9745)** 已提交。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/9647

- **[#9646] Session/Channel 读写工具缺少 per-agent 所有权检查** — `sessions_list/history/send`、`discord_search` 可跨 agent 访问，S0 严重度，`status: accepted`。修复 PR **[#9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746)** 已提交。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/9646

- 相关修复 PR：**[#9604](https://github.com/zeroclaw-labs/zeroclaw/pull/9604)**（Linq webhook alias 所有权）、**[#9605](https://github.com/zeroclaw-labs/zeroclaw/pull/9605)**（quickstart 收集必需 webhook 配置并拒绝不可用密钥）、**[#9634](https://github.com/zeroclaw-labs/zeroclaw/pull/9634)**（Telegram `mention_only` 时跳过未授权群组消息处理）。

### 稳定性/基础设施

- **[PR #9715] JSONL session 迁移 retry-safe** — 在共享 sessions 目录锁 + 单事务中导入每条旧会话，中断后恢复不产生重复行。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9715

- **[PR #9750] daemon 日志有界化（8 MiB 上限）** — 消除无界日志增长风险。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9750

- **[PR #9755] 无默认 feature 警告全 workspace 可见** — 防止 feature 组合回归被 CI 漏掉。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9755

## 功能请求与路线图信号

- **OpenAI Chat Completions 兼容层（[#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)）**：若被接受，将把 ZeroClaw 接入主流 LLM 工具生态，是当前呼声最高的能力之一。
- **Goal mode v1（[#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)）**：跨轮次有界任务执行，指向真实工作流编排。
- **Hailo-Ollama 原生支持（[PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)）**：新增专用模型提供商，对应边缘硬件推理场景。
- **上下文压缩锚定模型窗口比率（[PR #9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)）** + **history-trim token 记账（[PR #9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)）**：改善长对话与上下文预算可观测性。
- **统一附件架构（[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)）、会话持久化契约与层序（[#9600](https://github.com/zeroclaw-labs/zeroclaw/issues/9600)）**：架构收敛信号，预计后续版本将系统性落地。
- **Rust→Wasm 替换 React/Vite（[#8132](https://github.com/zeroclaw-labs/zeroclaw/issues/8132)）、WASM 插件生命周期钩子（[#7822](https://github.com/zeroclaw-labs/zeroclaw/issues/7822)）**：WebAssembly-first 方向仍在推进。

## 用户反馈摘要

- **互操作诉求强烈**：[@REL-mame](https://github.com/REL-mame) 在 [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) 点名 Open WebUI、LobeChat、Continue.dev、Aider、LangChain 等工具，说明"接入既有生态"是社区高频使用场景。
- **安全配置的可用性张力**：[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) 修订 2 将权限模型从 shell 扩展到全部工具，评论反映出用户希望安全能力"强大但不过度增加运维负担"。
- **快速启动受阻**：[PR #9605](https://github.com/zeroclaw-labs/zeroclaw/pull/9605) 修复了 quickstart 未收集 webhook 必需字段（port/HMAC secret）的问题——此前用户只能在无效默认配置下启动，通道直接不可用。
- **开发者体验诉求**：[PR #9755](https://github.com/zeroclaw-labs/zeroclaw/pull/9755) 提交 no-default warnings 全量检查，反映贡献者希望编译矩阵尽早暴露 feature 组合回归。
- **文档与边界行为补全活跃**：[PR #9618](https://github.com/zeroclaw-labs/zeroclaw/pull/9618)（ZEGA AI 桥接集成指南）、[PR #9520](https://github.com/zeroclaw-labs/zeroclaw/pull/9520)（技能 `always-inject` 在紧凑提示模式下失效）表明用户正主动补齐缺口。

## 待处理积压

### 长期未合并的 PR

- **[PR #6622](https://github.com/zeroclaw-labs/zeroclaw/pull/6622)（2026-05-13 创建，p1）**：WhatsApp persistent LID allowlist 派发测试，已刷新至 master 但仍未合并，距提交近 3 个月。
- **[PR #8781](https://github.com/zeroclaw-labs/zeroclaw/pull/8781)（2026-07-06）**：移除 24 条已不在依赖树中的 advisory ignores，等待审阅。
- **[PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)（2026-07-17）**：Hailo-Ollama 原生支持，size:XL，需要较长 review 周期。

### 等待作者/维护者行动的 RFC

- **needs-author-action**（作者未跟进）：[#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)（内存生命周期）、[#6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971)（安全 UX）、[#8043](https://github.com/zeroclaw-labs/zeroclaw/issues/8043)（aardvark-sys 合并）、[#8424](https://github.com/zeroclaw-labs/zeroclaw/issues/8424)（workspace 禁止路径）、[#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)（沙箱策略）、[#8832](https://github.com/zeroclaw-labs/zeroclaw/issues/8832)（Kanban 插件）、[#7897](https://github.com/zeroclaw-labs/zeroclaw/issues/7897)（免重载配置热更新）、[#8132](https://github.com/zeroclaw-labs/zeroclaw/issues/8132)（Rust→Wasm）、[#8398](https://github.com/zeroclaw-labs/zeroclaw/issues/8398)（插件权限模型）。
- **needs-maintainer-review**（等待维护者决策）：[#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)、[#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)、[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)、[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)、[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)、[#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141)、[#7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100)（p1）、[#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142)。

### 最旧的 accepted 未实现

- **[#5607](https://github.com/zeroclaw-labs/zeroclaw/issues/5607)（2026-04-10 创建，accepted）**：cron 任务确定性前置条件门控，已接受但 4 个月无对应实现 PR。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-05

## 1. 今日速览

过去 24 小时项目活跃度中等：共 3 条 Issue 更新（2 条活跃 / 1 条 stale 关闭）、4 条 PR 更新（2 条待合并 / 2 条 stale 关闭），无新版本发布。当天的显著信号是两条积压已久的修复（Android 启动 Bug #3182、OAuth 登录修复 #3280）被 stale 机制清理，但均未真正合并进主干；同时社区新提交了 Exa 搜索 Provider（#3299）和缓存 token 日志（#3317）两项 PR，说明 Provider 生态扩展与成本可观测性是当前社区投入的热点方向。整体看，Issue/PR 活跃度正常，但维护者的合并节奏偏慢，存在有价值贡献被 stale 机制吞掉的风险。

## 2. 版本发布

本期无新版本发布（最新 Releases 为空）。项目当前处于 0.3.x 迭代周期，最新 Issue 中用户反馈的运行版本为 0.3.1（#3281）。

## 3. 项目进展

今日**没有实际合并**的 PR，两条关闭 PR 均为 stale 关闭（非代码合入）：

- [PR #3280（stale 关闭）](https://github.com/sipeed/picoclaw/pull/3280) — `fix(auth): make browser OAuth login survive real-world callback conditions`。修复 headless / 远程环境下 OAuth 登录的 **4 个独立根因**（回调地址校验、端口绑定、状态参数持久化等），用户授权后流程仍失败的问题。该修复未进入主干，相关缺陷仍待解决。
- [PR #3251（stale 关闭）](https://github.com/sipeed/picoclaw/pull/3251) — `fix(providers): capture the prompt cache token usage in Anthropic providers`。为 Anthropic 两个 provider 补全缓存 token 指标统计，未合并。

**积极信号**：2 条新 PR 进入评审/合并队列 —

- [PR #3317（新，待合并）](https://github.com/sipeed/picoclaw/pull/3317) — `feat(providers): log prompt cache tokens in LLM response debug output`。在 LLM 响应调试日志中输出缓存 token，覆盖 DeepSeek / Cloudflare AI Gateway 等场景，与 #3251 目标互补。
- [PR #3299（待合并）](https://github.com/sipeed/picoclaw/pull/3299) — `Add native Exa web search provider`。新增 Exa 原生搜索 provider，支持 `d/w/m/y` 时间范围过滤映射到 `startPublishedDate`。

**综合判断**：项目功能扩展方向清晰（搜索 Provider + 成本观测），但今日无合入意味着新功能落地速度放缓，维护者需关注 stale 机制对高价值 PR 的误伤。

## 4. 社区热点

- [Issue #3182（评论 6 条，已 close）](https://github.com/sipeed/picoclaw/issues/3182) — Android 版本无法启动服务、设置中无法修改路径。这是今日评论数最多的条目，从 6 月 26 日产生讨论到 8 月 4 日 stale 关闭，横跨 40 天，最终未获有效修复，反映移动端问题长期缺乏维护者响应。
- [Issue #3281（评论 3 条，👍 1）](https://github.com/sipeed/picoclaw/issues/3281) — Web UI 在会话历史较长时输入严重卡顿。该问题获 👍 1，说明有用户共鸣，直接影响 Web 端核心操作体验。
- [Issue #3269（评论 3 条，👍 1）](https://github.com/sipeed/picoclaw/issues/3269) — MCP server 连接失败导致 agent 循环挂起、聊天界面完全停止回复。属于高危稳定性话题，且发生在 nightly + Qwen3 的组合环境下。

**社区诉求归纳**：移动端可用性、Web 长会话性能、MCP 外部依赖容错是三大主要痛点。

## 5. Bug 与稳定性

按严重程度排序：

| 严重程度 | Issue/PR | 描述 | 当前状态 |
|---|---|---|---|
| 🔴 严重 | [#3269](https://github.com/sipeed/picoclaw/issues/3269) | MCP server 连接失败后 agent 循环挂起，chat 界面完全不回复用户，且无超时/退出机制 | OPEN，**无 fix PR** |
| 🟠 高 | [#3182](https://github.com/sipeed/picoclaw/issues/3182) | Android 版本授予全部权限后服务仍无法启动，设置中无法修改路径 | 已 stale 关闭，**未修复** |
| 🟡 中 | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI 长会话历史下输入框卡顿（v0.3.1，Go 1.25.11） | OPEN，**无 fix PR** |

其中 **#3269 影响面最大**：故障发生后用户与 agent 完全失联，属于 P0 级稳定性问题，涉及 MCP 子系统的超时重试机制缺失，建议维护者优先响应。

## 6. 功能请求与路线图信号

- **搜索能力扩展**：[PR #3299](https://github.com/sipeed/picoclaw/pull/3299) 将 Exa 集成为原生 `tools.web` / `web_search` provider，支持 `X-Api-Key` 认证与现有时间范围过滤参数。若合入，将显著扩展 PicoClaw 的搜索源生态，满足社区对多搜索 provider 的明确需求。
- **缓存成本可观测性**：近期出现两条同主题 PR（#3251、#3317），说明在 Cloudflare AI Gateway、Anthropic 等 provider 混合使用的用户群体中，对"缓存命中率 / 节省成本"的可观测性诉求正在上升。[PR #3317](https://github.com/sipeed/picoclaw/pull/3317) 于 8 月 4 日新提交且覆盖 gateway 场景，更贴近生产环境，**有可能被优先纳入下一版本**。
- **路线图信号**：当前没有新的功能请求 Issue（如新模型、新 UI 能力），社区重心仍在"修稳已有功能 + 扩展 provider 连接能力"。

## 7. 用户反馈摘要

- **Android 真实痛点**（#3182）：用户 @Monessem 明确表示"已授予全部权限"仍无法启动服务、设置中无法修改路径。该反馈滞留 40 余天后被 stale 关闭，未得到工程师确认，移动端支持信心可能受损。
- **Web UI 性能下降**（#3281）：用户 @xpader 给出了可复现路径——在单会话中累积较多历史后，输入框持续输入即出现明显卡顿。👍 1 说明并非孤例，可能存在 DOM 渲染或状态管理层面的性能瓶颈。
- **MCP 故障导致全链路不可用**（#3269）：用户 @ruiyigen 使用 nightly + Qwen3，指出 MCP 连接失败会拖死整个会话且无恢复手段。这暴露出 agent 循环对第三方服务故障缺乏隔离与退避策略，属于架构健壮性问题。

## 8. 待处理积压

- **[Issue #3269](https://github.com/sipeed/picoclaw/issues/3269)**（7/20 开启，已超两周）：严重级别最高，至今无 fix PR 或无维护者指派，急需回应。
- **[Issue #3281](https://github.com/sipeed/picoclaw/issues/3281)**（7/21 开启，已超两周）：Web UI 性能问题，无任何代码关联，积压中。
- **[PR #3299](https://github.com/sipeed/picoclaw/pull/3299)**（7/26 创建，已 10 天）：Exa 搜索 provider 处于待 review 状态，长期未获维护者反馈。
- **[PR #3317](https://github.com/sipeed/picoclaw/pull/3317)**（8/4 创建）：新提交，尚未初评。
- **⚠️ stale 误伤提醒**：[PR #3280](https://github.com/sipeed/picoclaw/pull/3280)（OAuth 修复）与 [PR #3251](https://github.com/sipeed/picoclaw/pull/3251)（Anthropic cache 修复）均因 stale 关闭。其中 #3280 覆盖了 4 个独立 OAuth 缺陷，价值较高，建议维护者主动联系作者 @honbou 基于最新主干 rebase 重启；#3251 的功能可由新 PR #3317 部分承接，但 Anthropic 侧的具体修复仍需复活或重提。

---

*数据来源：github.com/sipeed/picoclaw 公开仓库，统计窗口为 2026-08-04 至 2026-08-05。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-05

## 1. 今日速览

过去 24 小时项目保持较高活跃度：Issues 更新 25 条（新开/活跃 14 条，关闭 11 条，关闭率约 44%），PR 更新 49 条（待合并 28 条，已合并/关闭 21 条，合并/关闭率约 43%），无新版本发布。当前处于 v2.1.0-beta.1 发布后的稳定迭代期，社区贡献者活跃，出现了多名 first-time contributor 提交的修复 PR（#6331、#6615、#6688、#6618）。值得重点关注的是：微信（iLink）通道连续报告两个高影响 Bug（#6695、#6696），以及围绕时间戳时区问题形成了多 PR 并行修复的社区协作局面（#6309、#6618、#6685 均指向 #6301）。整体项目健康度良好，Bug 闭环速度较快，多个 Issue 在当日即有关联 fix PR 出现。

---

## 2. 版本发布

过去 24 小时无新版本发布。上一个版本为 [v2.1.0-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.1)（Beta），其安装验证流程已通过 [#6656](https://github.com/agentscope-ai/QwenPaw/issues/6656) 关闭。

---

## 3. 项目进展

今日合并/关闭的 PR 集中在三个方向，项目在稳定性、兼容性和 CI 质量上均有实质推进：

### 3.1 时间戳时区修复（围绕 #6301 的社区协作）
同一问题产生三个 PR，说明社区关注度高，最终多个 PR 被关闭/合并：

- [#6685 fix(timestamp): improve timestamp handling in agentscope_msg_to_message](https://github.com/agentscope-ai/QwenPaw/pull/6685) — 直接修复 #6301，改进时间戳解析与时区处理
- [#6309 fix(chats): convert session timestamps across timezones](https://github.com/agentscope-ai/QwenPaw/pull/6309) — 修复会话时间戳时区转换，现支持 ISO-8601 与 legacy 格式解析
- [#6618 fix(console): remove forced UTC timestamp normalization in session list](https://github.com/agentscope-ai/QwenPaw/pull/6618) — 移除前端强制 UTC 归一化逻辑，配合后端修复

### 3.2 CI 与测试体系加固
- [#6678 fix(ci): install Playwright Chromium for the integration suite](https://github.com/agentscope-ai/QwenPaw/pull/6678) — 解决 nightly full sweep 在全部平台因 Chromium 缺失导致的 7 个集成测试失败
- [#6686 test(integration): fix chrome contract mismatches and add missing p-tier markers](https://github.com/agentscope-ai/QwenPaw/pull/6686) — 修复 PR gate 覆盖漏洞：集成测试从未被分配 p-tier，导致 pull_request 门禁实际为空转
- [#6679 test(integration): align import-local with #6487 and widen a flaky poll window](https://github.com/agentscope-ai/QwenPaw/pull/6679) — 对齐 `/import-local` 源路径限制，修复确定性失败并降低 flaky 概率

### 3.3 功能与兼容性修复
- [#6628 fix(scroll): use SystemMsg for compressed memory placeholder in _rebuild_context](https://github.com/agentscope-ai/QwenPaw/pull/6628) — 修复 #6541：scroll 压缩占位符使用 `role=user` 导致 DeepSeek 等 OpenAI 兼容 API 返回 HTTP 400
- [#6682 fix(console): sync legacy max_iters when saving iteration limit](https://github.com/agentscope-ai/QwenPaw/pull/6682) — 修复 Loop Engineering 迁移后 `max_iters` 字段与 UI 绑定字段不同步的问题

**小结**：项目今日在时间戳时区、scroll 压缩兼容性、CI 门禁有效性三个维度取得可见进展，特别是 CI 覆盖漏洞的修复（#6686）对长期工程质量意义较大。当前仍有 28 个 PR 待合并，其中包括 reranker 记忆搜索（#6398）、频道启动重试（#6689）等功能性 PR。

---

## 4. 社区热点

今日讨论热度最高的议题集中在成本优化与安全审批体验两方面：

### 4.1 GPT-5.6 prompt caching 支持（13 条评论）
[#6649 [Feature] Support GPT-5.6 prompt caching parameters in Responses API provider](https://github.com/agentscope-ai/QwenPaw/issues/6649)

用户 @samluoabc 提议支持 `prompt_cache_key`、`prompt_cache_options`、`prompt_cache_breakpoint` 参数，使 Agent 多轮对话复用缓存前缀。这是今日评论数最高的 Issue，反映用户对多轮对话**延迟与成本**的敏感度高，且已明确到 provider 层 API 参数级别。

### 4.2 Console 通道安全审批提示不可见（12 条评论，已关闭）
[#6655 [Question] Console channel does not render approval prompts, gated commands silently time out](https://github.com/agentscope-ai/QwenPaw/issues/6655)

用户 @rerbin 详细描述了场景：agent 执行 `del`/`rm` 等高风险命令时，安全策略生成审批请求，但在 console 通道下审批提示不渲染，用户完全无感知，agent 等待 300 秒后超时被拒。这是一个**安全与可用性交叉**的问题，获得 12 条评论讨论。同日新开的 [#6695](https://github.com/agentscope-ai/QwenPaw/issues/6695) 将该问题延伸到微信通道（详见 Bug 章节），说明审批提示的通道适配存在系统性缺口。

### 4.3 任务产出物目录组织（6 条评论）
[#6643 [Feature] 任务产出物按任务新建目录放置](https://github.com/agentscope-ai/QwenPaw/issues/6643)

用户抱怨当前所有任务产出物堆积在 `media` 目录下，"很混乱"，希望按任务建目录。该诉求与 [#6642](https://github.com/agentscope-ai/QwenPaw/issues/6642)（拖入文件直接读原路径，避免复制到 media）形成呼应，共同指向**文件管理体验**。两条均由 @rerbin 提出，该用户今日贡献了 5 条 Issue，是社区中较为活跃的体验反馈者。

### 4.4 DeepSeek thinking mode 多轮失败（5 条评论）
[#6667 DeepSeek thinking mode fails in multi-turn: reasoning_content missing after OpenAI formatter skips ThinkingBlock](https://github.com/agentscope-ai/QwenPaw/issues/6667)

用户报告 DeepSeek V4 Pro 在多轮对话中 `reasoning_content` 缺失，现有 workaround（`retry_chat_model.py` 注入 `reasoning_content = " "`）仅对首次失败有效。该问题涉及 OpenAI formatter 对 ThinkingBlock 的处理，属于模型兼容性热点。

---

## 5. Bug 与稳定性

### 5.1 严重 — 微信（iLink）通道审批与消息收发故障
微信通道今日集中暴露两个高影响 Bug，且同由 @huyj1890 报告：

| Issue | 描述 | 状态 | Fix PR |
|---|---|---|---|
| [#6695](https://github.com/agentscope-ai/QwenPaw/issues/6695) | 仅使用微信通道时，审批提示无法触达（控制台-only 对话框 + 5 分钟自动拒绝），`rm`/`kill` 等门禁命令无法获批 | OPEN | 无 |
| [#6696](https://github.com/agentscope-ai/QwenPaw/issues/6696) | 一次性 `context_token` 被 typing indicator 消耗，回复被拒（ret=-2），"working" 指示器卡死 | OPEN | 无 |

**分析**：这两个 Bug 叠加影响严重——用户无法审批高风险命令（#6695），且正常回复也可能因 token 被消耗而失败（#6696）。结合已关闭的 [#6655](https://github.com/agentscope-ai/QwenPaw/issues/6655)（console 通道同样存在审批不可见问题），可以判断**跨通道的审批提示渲染与 token 生命周期管理**存在共性缺陷，建议维护者优先排查通道抽象层。

### 5.2 中等 — 功能异常或兼容性缺陷

| Issue | 描述 | 状态 | Fix PR |
|---|---|---|---|
| [#6624](https://github.com/agentscope-ai/QwenPaw/issues/6624) | Scroll 自动压缩不触发 `summarize_when_compact` 记忆流程，手动 `/compact` 可触发 | OPEN | [#6629](https://github.com/agentscope-ai/QwenPaw/pull/6629) 待合并 |
| [#6667](https://github.com/agentscope-ai/QwenPaw/issues/6667) | DeepSeek thinking mode 多轮失败，`reasoning_content` 缺失 | OPEN | 无 |
| [#6690](https://github.com/agentscope-ai/QwenPaw/issues/6690) | `cron pause/resume` 只改内存调度器，`enabled` 状态重启后丢失 | OPEN | [#6691](https://github.com/agentscope-ai/QwenPaw/pull/6691) 待合并 |
| [#6687](https://github.com/agentscope-ai/QwenPaw/issues/6687) | OpenRouter 多模态探测结果覆盖文档中已声明能力（将 image/video 支持写为 false） | OPEN | 无 |
| [#6683](https://github.com/agentscope-ai/QwenPaw/issues/6683) | App Center 安装 qwenpaw-creator 失败：插件顶层模块 `utils` 命名冲突，报 `No module named 'utils.env'` | OPEN | [#6688](https://github.com/agentscope-ai/QwenPaw/pull/6688) 待合并 |

### 5.3 轻微 — 已关闭的低影响 Bug
以下问题已在今日关闭，未做详细分析：

- [#6633](https://github.com/agentscope-ai/QwenPaw/issues/6633) Skills/Skill Pool 页面慢网络加载失败（`GET /api/skills` 嵌入 MB 级内容 vs 30s 前端超时）
- [#6673](https://github.com/agentscope-ai/QwenPaw/issues/6673) 前端对话窗口显示问题（v2.1.0b1）
- [#6374](https://github.com/agentscope-ai/QwenPaw/issues/6374) token 使用持久化在瞬时写入失败后无重试
- [#5906](https://github.com/agentscope-ai/QwenPaw/issues/5906) 防重复功能异常触发 Doom loop（2.0.0b4）

---

## 6. 功能请求与路线图信号

### 6.1 已有对应 PR、大概率进入下一版本

| Issue | 功能诉求 | 对应 PR |
|---|---|---|
| [#6684](https://github.com/agentscope-ai/QwenPaw/issues/6684) | 频道启动失败自动重试（Matrix 场景），避免重启后需手动重新保存 | [#6689](https://github.com/agentscope-ai/QwenPaw/pull/6689) 已实现可取消指数退避重试（5s→60s 上限） |
| [#6624](https://github.com/agentscope-ai/QwenPaw/issues/6624) | 自动压缩（Scroll）时触发记忆 summarize 流程 | [#6629](https://github.com/agentscope-ai/QwenPaw/pull/6629) 已修复 MemoryMiddleware 仅在积累用户轮次时刷新的问题 |
| [#6683](https://github.com/agentscope-ai/QwenPaw/issues/6683) | 插件系统隔离裸绝对导入 | [#6688](https://github.com/agentscope-ai/QwenPaw/pull/6688) 在插件命名空间内包裹裸导入 |

### 6.2 尚无 PR、但需求清晰

- [#6649](https://github.com/agentscope-ai/QwenPaw/issues/6649) — GPT-5.6 prompt caching 参数支持（13 评论，热度最高，预计会被纳入 provider 层迭代）
- [#6643](https://github.com/agentscope-ai/QwenPaw/issues/6643) — 任务产出物按任务分目录存储
- [#6642](https://github.com/agentscope-ai/QwenPaw/issues/6642)（已关闭）— 拖入文件直接读取原路径，避免先复制到 media
- [#6694](https://github.com/agentscope-ai/QwenPaw/issues/6694) — 新增全局规则/置顶系统提示词（类似 `.agent` / `.claude`）
- [#6674](https://github.com/agentscope-ai/QwenPaw/issues/6674) — 免费模型限流（429）时避免任务中断，建议自动退避或排队
- [#6490](https://github.com/agentscope-ai/QwenPaw/issues/6490) — 内置 Volcengine Agent Plan 与 Xiaomi MiMo Standard API 两个新 provider

### 6.3 需维护者关注判断

- [#6455](https://github.com/agentscope-ai/QwenPaw/issues/6455) — 一个 Agent 同时用多个模型独立跑（"请用 ds v4 pro、qwen 3.7 max、kimi k3 各自跑一次再汇总"），创建于 7/24，已两周，涉及较深的产品架构设计
- [#4947](https://github.com/agentscope-ai/QwenPaw/issues/4947)（已关闭）— Playground 多 Agent 看板（Kanban Board），创建于 6/3，今日关闭，未在数据中看到合并记录

---

## 7. 用户反馈摘要

### 7.1 安全审批体验是当前最大痛点
> "在 console 通道下，审批请求没有渲染为终端可读的提示，用户完全看不到有人在等他审批。agent 侧等待 300 秒后超时被拒，整个过程用户无感知。" — [@rerbin, #6655](https://github.com/agentscope-ai/QwenPaw/issues/6655)

> "When QwenPaw is used exclusively through the WeChat (iLink) channel, approval prompts triggered by the agent (e.g. rm, kill) are impossible to approve." — [@huyj1890, #6695](https://github.com/agentscope-ai/QwenPaw/issues/6695)

安全策略拦截了命令，但审批请求无处可达，导致用户以为 Agent 卡死或超时失败。**该问题横跨 console 与微信通道**，建议在通道抽象层统一处理审批交互。

### 7.2 文件管理的"奇怪"体验
> "对话框拖入文件时，现在有个先上传（复制）再读取的过程，很奇怪，是否有必要。而且会在 media 目录产生一堆额外的文件。" — [@rerbin, #6642](https://github.com/agentscope-ai/QwenPaw/issues/6642)

> "任务的产出物全部堆积在 media 目录下，很混乱。" — [@rerbin, #6643](https://github.com/agentscope-ai/QwenPaw/issues/6643)

用户期望桌面 Agent 工具应直接引用原路径文件，而非复制。media 目录的混乱也说明**需要对任务产物做目录级隔离**。

### 7.3 频道自愈能力不足
> "经常出现 qwenpaw 启动快于 Matrix 服务，导致失败...没有任何后续的重试或健康检测，每次服务器启动后都需要手动重新保存一次频道才能恢复连接。" — [@MCQSJ, #6684](https://github.com/agentscope-ai/QwenPaw/issues/6684)

频道启动失败手工干预成本高。好消息是 [#6689](https://github.com/agentscope-ai/QwenPaw/pull/6689) 已实现通用的启动重试机制，预计能解决此类问题。

### 7.4 微信通道 token 机制脆弱
> "The one-time context_token is used for both (1) starting the 'typing' indicator and (2) sending replies. The first consumer invalidates it for the second." — [@huyj1890, #6696](https://github.com/agentscope-ai/QwenPaw/issues/6696)

一次性 token 被 typing indicator 抢先消费，直接导致回复被拒。这说明微信 iLink 通道的**状态管理存在设计缺陷**，需要区分"状态类请求"与"消息发送请求"的 token 使用策略。

### 7.5 正面反馈
> "Thank you for QwenPaw — it's a great personal AI assistant. We're using it daily with the free deepseek-v4-flash model configured, and overall the experience is excellent." — [@lt91888, #6674](https://github.com/agentscope-ai/QwenPaw/issues/6674)

用户对产品整体满意，但免费模型限流影响日常使用连续性。

---

## 8. 待处理积压

以下为创建时间较早或长期未合并的重要 Issue/PR，提醒维护者关注：

### 8.1 长期开放的 PR（超过 7 天）

| PR | 内容 | 创建时间 | 备注 |
|---|---|---|---|
| [#6398](https://github.com/agentscope-ai/QwenPaw/pull/6398) | feat: ReMe 记忆搜索 reranker 支持（后端） | 2026-07-23 | Under Review 中，涉及新 `RerankerConfig` Pydantic 配置 |
| [#6492](https://github.com/agentscope-ai/QwenPaw/pull/6492) | fix(files): 上传文件在 hints 中保留原始文件名 | 2026-07-27 | 体验优化，等待合并 |
| [#6615](https://github.com/agentscope-ai/QwenPaw/pull/6615) | fix(agentscope): 修复主动记忆响应与配置加载兼容性 | 2026-07-31 | first-time contributor，Under Review |
| [#6331](https://github.com/agentscope-ai/QwenPaw/pull/6331) | chore(console): 指定 Node.js 版本要求 | 2026-07-22 | first-time contributor，长期无更新 |

### 8.2 重要但尚未有 PR 的 Issue

- [#6455](https://github.com/agentscope-ai/QwenPaw/issues/6455)（7/24 创建，3 评论）— 多模型并行运行诉求，涉及 Agent 执行编排架构，建议官方给出路线图回应
- [#6490](https://github.com/agentscope-ai/QwenPaw/issues/6490)（7/27 创建，3 评论）— Volcengine Agent Plan 与 Xiaomi MiMo 内置 provider 请求，已有 `TinyBai` 给出明确 endpoint 与配置细节，落地成本低

### 8.3 安全相关提示

- [#6655](https://github.com/agentscope-ai/QwenPaw/issues/6655) 虽已关闭，但其暴露出"审批提示在非 Web UI 通道不可达"的共性问题，且在 [#6695](https://github.com/agentscope-ai/QwenPaw/issues/6695)（微信通道）中复现。建议维护者将"通道审批交互"作为独立主题跟踪，而不是随单个 Issue 关闭而结束。

---

**一句话总结**：QwenPaw 在 v2.1.0-beta.1 后处于高频迭代期，CI 质量与时间戳兼容性明显改善，但微信通道的审批/消息 token 机制、跨通道审批提示渲染是当前最紧急的稳定性风险点，建议优先处理。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报（2026-08-05）

> 数据窗口：2026-08-04 至 2026-08-05 | 数据来源：NousResearch/hermes-agent GitHub

---

## 1. 今日速览

过去 24 小时项目保持高强度活跃：**500 条 Issue 更新**（新开/活跃 446，关闭 54）与 **500 条 PR 更新**（待合并 414，合并/关闭 86）双创近期高位。Issue 关闭率约 10.8%，PR 合并/关闭率约 17.2%，社区提交热情高涨但**审查合并瓶颈明显**——414 个 PR 处于待合并状态，远超维护团队当前处理速度。本日无新版本 Release，大量已合并修复仍待版本释放。值得关注的是，本周 Bug 报告集中指向 **macOS 权限、Windows 路径处理、terminal/cron 守卫崩溃**三大稳定性主题，且多个 P1 崩溃已有对应修复 PR 在列，整体项目健康度呈"社区活跃、合并滞后、修复跟进及时"的态势。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

本日关闭的 PR 与 Issue 显示项目在**安全加固、兼容性修复、性能优化**三个方向有明确推进：

**🔒 安全与隔离加固**

- **[PR #78935] Harden isolated cron startup and atomic paused creation**（已关闭）——加固隔离 cron 启动流程，支持 symlink 解析的 `*.isolated.py` 启动器，并确保新建 cron 任务原子化地以 paused 状态落盘，避免"短暂可运行"窗口。[查看 PR](https://github.com/NousResearch/hermes-agent/pull/78935)

**🐛 兼容性修复**

- **[PR #78934] fix(cli): support 'k'/'K' version prefix in model sort**（已关闭）——修复 Moonshot Kimi 系列模型（`kimi-k3`、`kimi-k2.6` 等）在版本排序时无法解析数字版本号的问题。[查看 PR](https://github.com/NousResearch/hermes-agent/pull/78934)
- **[Issue #38855] Desktop 工作目录被 localStorage 陈旧值覆盖**（已关闭，15 条评论）——长期困扰桌面用户的配置优先级问题得到解决，`terminal.cwd` 设置现可正确覆盖渲染层记忆的旧路径。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/38855)

**⚡ 性能优化**

- **[Issue #75959] 桌面 Skills/Toolsets 面板加载超时**（已关闭）——根因是 `get_toolsets` 对每个 toolset 重复执行 Nous 订阅检查，导致 API 响应约 19 秒，超过 15 秒 IPC 超时阈值。修复后该面板可正常加载。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/75959)

此外，[PR #75059]（Discord 消息发送工具）亦于今日关闭，为 Discord 平台补上消息发送能力。[查看 PR](https://github.com/NousResearch/hermes-agent/pull/75059)

---

## 4. 社区热点

今日讨论热度集中于以下议题（按评论数排序）：

**#64182 插件接口扩展跟踪（19 条评论）** — [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/64182)
7 月社区 Discord 讨论的落地跟踪 Issue，目标是让长期排队插件 PR 获得稳定的发布接口。该 Issue 与 #64177（密钥源插件引导时序）联动，反映**社区对插件生态成熟度的强烈诉求**——超 400 个待合并 PR 中相当比例与插件相关。

**#52010 macOS 全磁盘访问权限被撤销（15 条评论）** — [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/52010)
每次 Desktop 更新后 macOS FDA 权限即被吊销，用户需手动重新授权。此问题与已修复的 Accessibility/Microphone 权限问题（#43365、#43788）性质不同，涉及系统级安全边界，在 macOS 用户群中引发广泛共鸣。

**#38855 桌面工作目录问题（15 条评论，已关闭）** — [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/38855)
虽然今日已关闭，但其讨论过程揭示了桌面端 localStorage 与 config.yaml 优先级冲突的普遍困惑，是"配置不生效"类问题的典型案例。

**#62726 仪表盘跨标签会话串扰 + /new 挂起（13 条评论）** — [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/62726)
一个 Issue 包含两个关联 Bug：多标签页间会话数据泄漏、/new 命令导致容器级挂起。目前标记 `needs-repro`，等待复现确认。

**#34352 多租户 Hermes 问题（13 条评论，2 👍）** — [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/34352)
企业级用户 @NimbleCoAI 指出内存操作绕过 hook 系统导致租户隔离无法实现，已自行维护生产补丁数月。该诉求带有明确的企业采购信号。

---

## 5. Bug 与稳定性

按严重程度排列（P1 最严重）：

### 🔴 P1 — 高危崩溃

- **[#77780] lifecycle_guard 崩溃：`ValueError: embedded null byte`** — 网关生命周期守卫在扫描 heredoc/`-c` 负载时崩溃，**所有终端命令被阻断**。已有修复 PR [#78945]（catch ValueError on null-byte paths）。[Issue](https://github.com/NousResearch/hermes-agent/issues/77780) | [PR](https://github.com/NousResearch/hermes-agent/pull/78945)
- **[#77703] 终端守卫崩溃（同一根因，ELF 全路径触发）** — 命令引用 ELF 可执行文件（如 `/home/zedi/venv/bin/python --version`）时崩溃，非阻断而是直接拒绝执行。与 #77780 同源，可一并由 #78945 修复。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/77703)

### 🟠 P2 — 功能受损/回归

- **[#76886] `read_file` 将合法 UTF-8 文本误判为二进制（0.19.1 回归）** — 1000 字节采样截断多字节字符导致误判，直接影响 Obsidian 笔记等场景。2 👍，社区关注度高。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/76886)
- **[#62726] 仪表盘跨标签会话串扰 + /new 挂起** — 多标签场景下会话数据互相污染，极端情况需重启容器。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/62726)
- **[#71047] Telegram 流式 + `reply_to_mode='first'` 导致消息重复** — 同时存在 `hermes config set` 复制顶层键的问题，双 Bug 叠加。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/71047)
- **[#58619] 桌面端 serve 进程无限累积** — 重连逻辑不清理旧进程，API 持续报错时每 15-30 分钟新增一个进程，需 `--replace` 语义。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/58619)
- **[#72589] 桌面后端首次 `/api/status` 阻塞 20-60 秒** — 根因是 `load_gateway_config()` 急切导入飞书适配器触发 `lark_oapi` 重加载，窗口显示假"连接错误"。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/72589)
- **[#67629] Windows 绝对路径搜索失败** — `search_files` 将 `D:\` 重写为 `/d/`，而原生 `rg` 不识别 MSYS 路径，IO error 3。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/67629)
- **[#71837] Windows 桌面侧边栏项目分支重复** — 同一项目显示两条分支车道（main + 仓库名），系 lane-id 不匹配，非数据重复。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/71837)
- **[#66824] `cronjob create` 重复 'forever' 报 TypeError** — `'<=' not supported between 'str' and 'int'`，影响循环调度任务创建。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/66824)
- **[#67458] `-w/--worktree` 在 `-z` 单次模式下被静默忽略** — 提交落入当前分支，与预期行为不符，存在误操作风险。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/67458)
- **[#25502] Windows 网关状态误报** — 计划任务托管的网关进程被报告为 stopped/manual。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/25502)

### ✅ 今日已解决

- #38855（工作目录覆盖）
- #75959（工具面板 19 秒超时）

---

## 6. 功能请求与路线图信号

**高确定性的路线图信号：**

- **[#64182] 插件接口扩展跟踪** — 项目方主动建立的社区路线图，为长排队 PR 提供稳定接口。当前 414 个待合并 PR 中插件相关占比可观，此 Issue 是插件生态下一阶段的关键。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/64182)

- **[#69961] 可信发送者 UID 信封**（已有对应 PR）— 为共享网关会话提供平台认证的发送者身份，[PR #69980] 已实现 Discord/Telegram/Slack 的 trusted sender envelope，并防伪造。该功能对群组/频道场景的多用户隔离至关重要。[Issue](https://github.com/NousResearch/hermes-agent/issues/69961) | [PR](https://github.com/NousResearch/hermes-agent/pull/69980)

**有 PR 支撑的需求：**

- **[#48000] kanban worker 退出码映射问题** — 瞬时供应商故障被误判为 protocol_violation 触发熔断；[PR #78943] 今日提交，使熔断决策持久化并增加 worker 身份围栏。[Issue](https://github.com/NousResearch/hermes-agent/issues/48000) | [PR](https://github.com/NousResearch/hermes-agent/pull/78943)
- **[#75128] 恢复会话时 provider 不存在导致崩溃**（对应 [PR #78947] 已提交，回退到 config 默认值）。[PR](https://github.com/NousResearch/hermes-agent/pull/78947)

**长期呼声较高的需求：**

- **[#10771] 自动内存整合（Auto Dream）** — 5 👍，4 月提出至今无明确排期，社区持续关注。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/10771)
- **[#34352] 多租户支持** — 企业级硬需求，需核心架构调整（内存操作接入 hook 系统）。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/34352)
- **[#8950] 缺失消息渠道** — IRC/Google Chat/LINE/Nostr/Twitch/QQBot 等 9 个渠道对比 OpenClaw 缺失，2 👍。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/8950)
- **[#40239] 葡萄牙语（pt-BR）桌面端支持** — 后端与 TUI 已有 357+ 行翻译，但桌面 UI 缺失，3 👍。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/40239)

---

## 7. 用户反馈摘要

从今日活跃 Issue 中提炼真实用户声音：

- **📌 "每次更新都要重新授权，已经烦了"** — macOS 用户对 FDA 权限每次更新后被撤销表示强烈不满（#52010），该问题已持续 6 周仍未修复，涉及 Desktop 更新签名机制，建议优先排查。

- **📌 "更新后我的 Obsidian 笔记打不开了"** — `read_file` 误判回归直接影响真实工作流（#76886），用户明确表示"更新前一切正常"，是典型的升级引入回归，需尽快热修复。

- **📌 "CLI 看不到桌面会话，但能通过 ID 恢复"** — `/resume` 列表隐藏非 CLI 源会话的问题有 #59224 与 #47214 两个重复报告，用户困惑于"为什么列表里没有但搜索却找得到"（#59224、#47214）。

- **📌 "我改了 ~/.hermes/config.yaml 但完全没生效"** — Studio 与 CLI 双配置源导致用户在错误位置编辑配置，MCP OAuth 行为令人困惑（#60313），文档未说明优先级。

- **📌 "首次打开就显示连接错误，但实际只是慢"** — 桌面端 20-60 秒的首请求延迟被用户误判为连接故障（#72589），影响首次使用体验。

- **📌 "我们在生产环境跑多租户补丁好几个月了"** — 企业用户自发维护 fork 补丁（#34352），证明多租户需求真实且迫切，是潜在的企业版/商业化切入点。

---

## 8. 待处理积压

以下为长期未获响应或响应不足的重要事项，提醒维护者关注：

**⏳ 长期未关闭的 Issue（按等待时长排序）**

| Issue | 创建时间 | 标题 | 优先级 | 等待天数 |
|-------|---------|------|--------|---------|
| [#8950](https://github.com/NousResearch/hermes-agent/issues/8950) | 2026-04-13 | 新增 IRC/Google Chat/LINE 等 9 个消息渠道 | P4 | 114 天 |
| [#10771](https://github.com/NousResearch/hermes-agent/issues/10771) | 2026-04-16 | 自动内存整合（Auto Dream） | P3 | 111 天 |
| [#11349](https://github.com/NousResearch/hermes-agent/issues/11349) | 2026-04-17 | Discord 文档 6 处漂移 + /voice join 缺失 | P3 | 110 天 |
| [#23524](https://github.com/NousResearch/hermes-agent/issues/23524) | 2026-05-11 | 按 cron 任务覆盖推理开销 | P3 | 86 天 |
| [#25502](https://github.com/NousResearch/hermes-agent/issues/25502) | 2026-05-14 | Windows 网关状态误报 | P2 | 83 天 |
| [#34352](https://github.com/NousResearch/hermes-agent/issues/34352) | 2026-05-29 | 多租户架构改造 | P2 | 68 天 |

**⏳ 长期未合并的 PR**

- **[PR #28061] fix(agent): preserve global SOUL identity across isolated runs**（2026-05-18 创建，79 天）— 跨所有入口保留 SOUL 身份，涉及 CLI/TUI/委托/飞书/API server 全链路，标 `sweeper:blast-broad` 需要高度谨慎审查。该 PR 近期仍在更新，说明提交者持续跟进。[查看 PR](https://github.com/NousResearch/hermes-agent/pull/28061)

**⚠️ 合并瓶颈警告**

当前 **414 个 PR 待合并**，即使维持今日 86 个/天的合并速度也需要近 5 天才能清空，而每日新增 PR 持续涌入。建议维护团队：
1. 优先处理 P1 崩溃对应的修复 PR（#78945 等）；
2. 对超过 30 天未更新的待合并 PR 进行批量标记或关闭，减少噪音；
3. 考虑增加维护者席位或设立"社区合并管家"角色，缓解单点审查压力。

---

*本日报由 AI 生成，数据基于 2026-08-05 日 GitHub 快照。所有链接均指向原始 Issue/PR，可点击查看详情。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报

**日期：2026-08-05** | **数据周期：2026-08-04 ~ 2026-08-05**


## 1. 今日速览

过去 24 小时 AstrBot 项目保持较高活跃度，核心关注点在 WebUI 界面修复、插件生态审核与核心架构增强三个方向。Issue 侧以插件发布关闭（16 条已关闭中的 13 条为插件提交）为主，体现了插件生态审核通道的高效运转；PR 侧则以 WebUI 深色模式样式隔离修复（#9523/#9540/#9541）与依赖更新为主，其中多个修复已合并进主分支。值得关注的是，社区在 session_waiter 架构增强（#9548/#9551）、插件依赖安装缺陷（#9545）等方向贡献了高质量的代码与讨论，项目整体健康度良好，维护者响应及时。

> **活跃度评估：高** （24h 内 22 条 Issue 更新 + 18 条 PR 更新 + 12 次合并/关闭操作）


## 2. 版本发布

过去 24 小时无新版本发布。当前最新版本为 **v4.27.1**（由 PR #9520 于 8 月 2 日发布，包含内置 Skills 捆绑等更新）。


## 3. 项目进展

今日合并/关闭了 11 个 PR，主要集中在 **WebUI 体验修复** 与 **工程基础设施** 两个方向：

### 核心修复合并

| PR | 内容 | 影响 |
|---|---|---|
| [#9523](https://github.com/AstrBotDevs/AstrBot/pull/9523) | 修复深色模式 WebUI 文字颜色异常（#9521） | 根因为 `CapabilitySourceChip.vue` 中 `:global()` 选择器在 Vue 3.3.4 编译器下被错误处理，导致深色主题样式泄漏为青绿色 |
| [#9541](https://github.com/AstrBotDevs/AstrBot/pull/9541) | 移除自定义 capability chip 组件并优化欢迎卡片样式 | 从组件层面彻底清除暗色模式下不协调的青色强调色 |
| [#9540](https://github.com/AstrBotDevs/AstrBot/pull/9540) | 防止 capability chip 样式泄漏至暗色主题 | 与 #9523/#9541 协同，三重保障修复深色模式回归 |
| [#9537](https://github.com/AstrBotDevs/AstrBot/pull/9537) | 登录页使用新 favicon 图标 | 统一品牌视觉 |
| [#9525](https://github.com/AstrBotDevs/AstrBot/pull/9525) | 备份下载接口支持 Bearer Token 认证 | 修复 AstrBot Desktop 下载备份时的鉴权失败问题（#9524） |

### 工程与测试改进

- **[#9536](https://github.com/AstrBotDevs/AstrBot/pull/9536)**：重构 issue 模板——中英文分离、日志区域默认添加 Markdown 反引号，显著提升 Bug 报告的可读性和有效性
- **[#9544](https://github.com/AstrBotDevs/AstrBot/pull/9544)**：紧急修复 Bug report 模板分类消失的问题（GitHub 官方文档坑）
- **[#9539](https://github.com/AstrBotDevs/AstrBot/pull/9539)**：将 API key 管理测试与本地 `admins_id` 配置解耦，消除测试对环境的隐式依赖
- **[#9532](https://github.com/AstrBotDevs/AstrBot/pull/9532)**：GitHub Actions 依赖组批量更新（codeql-action → 4.37.4 等）
- **[#9511](https://github.com/AstrBotDevs/AstrBot/pull/9511)**：WebUI 侧边栏"配置文件"移至"插件"之前，导航布局更合理

**整体评估**：v4.27.1 引入的深色模式样式回归问题在 48 小时内通过 3 个 PR 多路径修复并完成合并，展现了维护团队的快速响应能力；同时项目通过 CI 依赖更新和测试稳定性改进，持续加固工程基础设施。


## 4. 社区热点

### Issue 热度

1. **[#7060 - 图片精准撤回助手插件提交（评论 22 条）](https://github.com/AstrBotDevs/AstrBot/issues/7060)**
   这是一条持续 4 个月以上的插件发布请求，经过多轮审核讨论后于今日关闭。从评论数量和持续周期来看，插件审核流程中的沟通成本偏高，值得关注流程可优化空间。

2. **[#8729 - 全自主智能体编排器插件（评论 11 条）](https://github.com/AstrBotDevs/AstrBot/issues/8729)**
   基于官方 Agent 体系实现的高度自动化插件，支持聊天即可搜索/安装插件、创建 Skill、配置 MCP、沙盒执行代码等能力。高讨论度反映了社区对 **Agent 自主能力** 的强烈兴趣。

3. **[#9521 - WebUI 深色模式文字颜色异常（评论 3 条）](https://github.com/AstrBotDevs/AstrBot/issues/9521)**
   虽评论数不高，但这是今日最核心的 Bug，触发 3 个修复 PR，是社区反馈驱动开发效率的典型案例。

### PR 热度

今日待合并的高关注 PR 包括：
- **[#9551](https://github.com/AstrBotDevs/AstrBot/pull/9551)**：session_waiter 支持返回 MessageEventResult（直接响应 #9548 的需求）
- **[#9543](https://github.com/AstrBotDevs/AstrBot/pull/9543)**：MiniMax TTS 增加语音设计能力（voice design）

**背后诉求分析**：社区的关注焦点正在从基础的"消息收发"向 **Agent 能力深化**（会话控制、自主编排）和 **多模态体验**（TTS 语音设计、图片处理）迁移，AstrBot 正逐步从一个聊天机器人框架演进为完整的 AI Agent 运行时。


## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 状态 |
|---|---|---|
| 🟠 高 | **[#9545](https://github.com/AstrBotDevs/AstrBot/issues/9545) 插件依赖安装缺陷**：`requirements.txt` 同时包含已安装和缺失的包时，`_install_requirements_with_precheck` 跳过整个文件，导致 `croniter` 等依赖不被安装，插件启动失败 | 🔴 无 fix PR，仍开放 |
| 🟠 高 | **[#9546](https://github.com/AstrBotDevs/AstrBot/issues/9546) 重载插件时意外重载全部插件**：Dashboard 重载不存在的插件名时，`specified_module_path` 为 `None`，触发全部插件重启，存在服务中断风险 | 🔴 无 fix PR，仍开放 |
| 🟡 中 | **[#9538](https://github.com/AstrBotDevs/AstrBot/issues/9538) 知识库上传 .md 文件写入索引失败**：分块和向量化成功但写库报模糊错误，与 PR #7866 场景高度相似，0.6MB 文档即失败 | 🔴 仅 1 条评论，无 fix PR，仍开放。可能为回归问题 |
| 🟡 中 | **[#9549](https://github.com/AstrBotDevs/AstrBot/issues/9549) Shipyard 沙箱不可用**：Docker Compose 部署后沙箱无法使用，缺少配置说明 | 🔴 无 fix PR，仍开放 |
| 🟢 低 | **[#9542](https://github.com/AstrBotDevs/AstrBot/issues/9542) 插件市场版本滞后**：astrbot_plugin_jx3 插件市场显示 2.7，GitHub 已 3.2 | ✅ 已关闭（插件市场同步机制问题） |
| 🟢 低 | **[#9521](https://github.com/AstrBotDevs/AstrBot/issues/9521) WebUI 深色模式文字颜色异常** | ✅ 已通过 #9523/#9540/#9541 修复并合并 |

**重点关注**：#9545 和 #9546 均位于 `area:core`，属于核心插件管理链路的问题，且暂无修复 PR，建议维护者优先评估。尤其是 #9546 的"重载未知名导致全量重载"行为，在生产环境中可能引发服务中断。


## 6. 功能请求与路线图信号

### 高可能性进入下个版本（已有对应 PR）

| Issue | 功能请求 | 对应 PR | 信号 |
|---|---|---|---|
| [#9548](https://github.com/AstrBotDevs/AstrBot/issues/9548) | `session_waiter` 支持返回 `MessageEventResult` 以走完整消息装饰流程（@、引用、分段、TTS 等） | [#9551](https://github.com/AstrBotDevs/AstrBot/pull/9551) | PR 已于今日提交且标注非破坏性变更，**很可能是 v4.28 的核心增强之一** |
| [#9524](https://github.com/AstrBotDevs/AstrBot/issues/9524)（推断） | 备份下载接口支持 Bearer Token | [#9525](https://github.com/AstrBotDevs/AstrBot/pull/9525) | 已合并 |

### 待响应/待评估的功能需求

| Issue | 功能 | 说明 |
|---|---|---|
| [#9356](https://github.com/AstrBotDevs/AstrBot/issues/9356) | 消息发送后透传 `message_id`，支持插件实现消息撤回联动 | 参考 ZeroBot 生态的 autowithdraw，可显著增强 OneBot 平台插件能力，10 天未更新，建议评估 |
| [#9494](https://github.com/AstrBotDevs/AstrBot/issues/9494) | `retryable error` 自定义重试策略 | API 429 限流时重试浪费时间，用户希望可配置策略；至今无评论，可能被忽略 |

### 路线图信号

- **Agent 编排能力深化**：今日多个插件（#8729 编排器、[#8691](https://github.com/AstrBotDevs/AstrBot/issues/8691) 小说创作 Agent）和 PR（#9551）表明，社区正推动 AstrBot 从"规则机器人"走向"全自主 Agent"，**session_waiter 增强将是关键一步**
- **多模态体验强化**：#9543 MiniMax 语音设计、[#8635](https://github.com/AstrBotDevs/AstrBot/issues/8635) 群守护者的 OCR 识图审核，映射出用户对语音视觉等模态的需求在增长


## 7. 用户反馈摘要

从今日 Issues 和 PR 讨论中提炼的真实用户声音：

1. **对 WebUI 视觉体验的高度敏感**（#9521）："该颜色组合过于鲜亮，长时间查看时非常刺眼，严重影响 WebUI 的正常使用。"——用户对深色模式样式回归反应强烈，且会尝试强制刷新、清缓存等多种手段排查，说明 WebUI 是 AstrBot 高频使用入口，视觉品质直接影响体验评价。

2. **插件作者对发布流程的在意**（#7060）：多轮审核评论揭示了插件发布存在迭代成本，但作者仍然坚持完成修改，体现了社区对 AstrBot 插件生态的投入度。

3. **文档/配置不完善的痛点**（#9549）："咋沙箱用不了啊，咋整啊"——Shipyard 沙箱作为 Agent 安全执行的关键组件，部署文档缺失导致用户无从下手，建议补充 Kubernetes/Compose 部署示例到官方文档。

4. **对插件市场数据同步的不满**（#9542）：插件作者反映"GitHub 版本已到 3.2，插件市场还停留在 2.7"，说明插件市场源的更新机制存在延迟，可能挫伤插件作者的维护积极性。

5. **开发者的友善反馈**（PR #9536/#9544 的说明）：QingFeng-awa 在提交 PR 时直白地吐槽"GitHub 官方文档坑我""甚至没人愿意加个 `<br>`"，这种轻松直接的协作氛围有利于项目社区的长期健康发展。


## 8. 待处理积压

### 🔴 长期未响应的 PR

| PR | 内容 | 等待时长 | 建议 |
|---|---|---|---|
| [#8270](https://github.com/AstrBotDevs/AstrBot/pull/8270) | 修复 ModelScope MCP 传输方式被硬编码为 SSE 的问题（Fixes #8269） | **77 天**（5月20日创建） | 添加了 Streamable HTTP/SSE 覆盖，逻辑合理，长期未合并可能给使用 ModelScope MCP 的用户造成持续困扰，建议维护者尽快 review |
| [#9329](https://github.com/AstrBotDevs/AstrBot/pull/9329) | STT 前转换错误标记的音频格式（AMR 伪装 .wav） | 16 天 | 保持 Ogg/Opus 行为不变，风险可控，建议尽快合入 |

### 🟡 待关注的重要 Issue

| Issue | 内容 | 情况 |
|---|---|---|
| [#9356](https://github.com/AstrBotDevs/AstrBot/issues/9356) | 消息透传 message_id 支持撤回联动 | 10 天无更新，属于插件生态关键能力 |
| [#9494](https://github.com/AstrBotDevs/AstrBot/issues/9494) | 自定义重试策略 | 5 天无开发者回复，虽评论区有 PR 提出加锁策略但未见行动 |

### 📊 积压信号

待合并 PR 中，**#8270 等待 77 天** 和 **#9329/[[#9325](https://github.com/AstrBotDevs/AstrBot/pull/9325) 等待超 2 周** 是值得关注的两个信号。前者涉及 MCP 协议传输兼容性，后者属于多媒体处理正确性修复（会静默转换错误格式，用户不可见但长期累积会产生数据质量问题）。建议项目维护者优先排期 review 这三条积压 PR，避免社区贡献者的积极性流失。


> **总结**：AstrBot 项目在 8 月 4 日展现出成熟开源项目的典型特征——Bug 修复链路完整（发现 → 多 PR 修复 → 合入）、插件生态审核高效、社区贡献者积极且专业。当前最大的改进空间在于 **核心插件管理链路的健壮性**（#9545/#9546）和 **长期未合并 PR 的积压清理**（#8270）。推荐关注 v4.28 的 session_waiter 增强，以及 WebUI 样式重构后是否引入新回归。

---
*本日报由 AI 自动生成，数据来源：[AstrBot GitHub 仓库](https://github.com/AstrBotDevs/AstrBot)*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*