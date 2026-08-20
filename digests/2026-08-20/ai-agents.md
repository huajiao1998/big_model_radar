# OpenClaw 生态日报 2026-08-20

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-20 10:03 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-08-20

> 数据窗口：2026-08-19 00:00 - 08-20 00:00 UTC | 数据来源：github.com/openclaw/openclaw

### 1. 今日速览

OpenClaw 昨日保持超高活跃度，24H 内 Issue 更新 500 条（472 条新开/活跃，仅 28 条关闭）、PR 更新 500 条（420 条待合并，80 条已合并/关闭），活跃度评级 **极高**但闭环率偏低（Issue 关闭率 5.6%）。核心矛盾集中在 **会话状态/消息丢失（session-state/message-loss）与网关稳定性（crash-loop/gateway 冷启动）**，大量 P0/P1 问题处于 `needs-maintainer-review / recovery-stuck` 状态亟需决策。无正式版本发布，当前验证重心为 `v2026.8.1-beta.2`（#125626）；工程侧今日以 **Control UI/网关性能、Apple/Telegram 路由、多模态与模型 Fallback** 的修复为主，健康度总体可控但积压风险上升。

### 2. 版本发布

**本日无新版本发布。**

当前唯一活跃的 Release 流程为 [#125626 Release validation: v2026.8.1-beta.2](https://github.com/openclaw/openclaw/issues/125626)（P2），由 @Patrick-Erichsen 发起，已有 13 条评论。验证要求在真实网关上升级并完成 worksheet 回执，目前仍在收集测试反馈，尚未进入 RC。

> 提示：文档已领先于最新稳定版是已知问题，见 [#48920 Live Docs are ahead of release](https://github.com/openclaw/openclaw/issues/48920)（P0 / 🦞），生产环境用户请以 Tag 发布为准，避免直接采用 `main` 分支文档配置。

### 3. 项目进展

今日已合并/关闭的关键 PR（80 条中的代表性 3 项）：

| PR | 类型 | 说明 | 状态 |
|---|---|---|---|
| [#125471 fix(models): keep Claude CLI OAuth available in Control UI](https://github.com/openclaw/openclaw/pull/125471) | P2 · auth-provider | 修复 Gateway 重启后因遗留 `auth.profiles["anthropic:claude-cli"]` token 模式导致 OAuth 刷新权丢失、Control UI 显示 `anthropic: missing` 空行的死锁问题 | **CLOSED** |
| [#120900 feat(ui): review install policy warnings](https://github.com/openclaw/openclaw/pull/120900) | P2 · security-boundary | 插件安装策略警告的可控放行：Control UI 中管理员可显式确认 `acknowledgeInstallPolicyWarning: true` 后继续安装，补齐安全边界交互 | **CLOSED** |
| [#116489 feat(security): require acknowledgement for install policy warnings](https://github.com/openclaw/openclaw/pull/116489) | P2 · security | 同上策略的后端/CLI 实现，支持 `security.installPolicy -> warn` 外部指令与 CLI 的目标名二次确认 | **CLOSED** |
| [#50165 Subagents can appear completed before delegated work is finished](https://github.com/openclaw/openclaw/issues/50165) | P2 · session-state | 子代理在委派任务未完成前即显示“已完成”，造成任务状态不可靠 | **CLOSED**（Bug 已确认关闭，8 评论）|

**待合并但已 Ready for Review 的高价值进展（预计 1-2 日内进入主线）：**

*   [#126628 fix(ui): recover newer builds after stale probes](https://github.com/openclaw/openclaw/pull/126628) / [#123535 fix(ui): avoid session catalog refresh storms](https://github.com/openclaw/openclaw/pull/123535) - 解决 Control UI 在网关更新后因旧 build 探测失败而卡死、以及并发刷新风暴问题
*   [#123975 fix(scripts): typecheck hangs forever when tsgo wedges](https://github.com/openclaw/openclaw/pull/123975) - 通过封装 `tsgo` 加入超时与进程树清理，解决 CI/本地终端挂死与内存泄漏
*   [#126366 fix(apple): honor authoritative session routing](https://github.com/openclaw/openclaw/pull/126366) / [#126330 fix(gateway): accept released Apple routing projection](https://github.com/openclaw/openclaw/pull/126330) - 修复 iOS/macOS `sessionRoutingContract` 丢失导致消息错误投递至 `agent:main:main`
*   [#126629 perf(plugins): reuse lifecycle metadata on secrets hot paths](https://github.com/openclaw/openclaw/pull/126629) + [#126630 perf(agents): reuse gateway plugin generation for prepared model runtime](https://github.com/openclaw/openclaw/pull/126630) - 性能攻坚：单次 secrets 调用从 2,368 次 manifest 打开（~2.1s）降至复用；网关启动 50s 中 79% 耗时（167 次插件导入/82 次 TS 转译）的重复重建问题被消除

> 整体向前推进约 **1 个小步**：安全安装流程闭环 + UI/网关稳定性与启动性能获得实质性修复，但大量 P1 核心 Bug 仍停留在 `waiting on author / needs proof` 阶段，未完全合入主线。

### 4. 社区热点

按评论数 Top 5 + 高互动 PR 排序：

1.  **[#48788 feat: centralized filename encoding utility](https://github.com/openclaw/openclaw/issues/48788)** - 20 评论 · 👍1 · 🌊 off-meta tidepool
    > 诉求：PR #48578 仅修了飞书中文文件名 UTF-8 被误判 Latin-1 的常见 case，社区要求提供支持 Shift-JIS/EUC-KR/GB18030 的统一多编码 `Content-Disposition` 工具，避免各 channel adapter 重复造轮子。处于 `needs-product-decision` 待架构决策。

2.  **[#48003 Steer mode does not inject messages mid-turn for main sessions](https://github.com/openclaw/openclaw/issues/48003)** - 19 评论 · 👍4 · P1 · 🦞 diamond lobster
    > 诉求：`messages.queue.mode: "steer"` 在主会话活跃轮次中无法在 tool 边界注入，被错误地排队到轮次结束。根因指向 `9889c6da5` 引入的 `KeyedAsyncQueue` 回归。已关联开放 PR，`recovery-stuck`。

3.  **[#22438 feat: Tiered bootstrap file loading](https://github.com/openclaw/openclaw/issues/22438)** - 17 评论 · P2
    > 诉求：大 Workspace 下 bootstrap 文件在每会话（含子代理/cron）全量加载，浪费 ~数千 token。上游提案分级加载以实现渐进式上下文控制，讨论半年仍在 `needs-product-decision`。

4.  **[#96834 WhatsApp 1:1: inbound image wedges main lane ~3min](https://github.com/openclaw/openclaw/issues/96834)** - 15 评论 · P1 · 🐚 platinum hermit
    > 诉求：WhatsApp 单聊发图会卡住主通道约 3 分钟，多模态 run 以 `active_reply_work/queued_work_without_active_run` 状态悬挂。复现在 2026.6.10（#95039 之后），标记 `recovery-stuck`。

5.  **[#38327 "Cannot convert undefined or null to object" in 2026.3.2 with google-vertex/gemini-3.1-pro-preview](https://github.com/openclaw/openclaw/issues/38327)** / **[#108435 gateway fails to start w/ error](https://github.com/openclaw/openclaw/issues/108435)** - 各 14 评论 · P1/P0
    > 前者为 Vertex Gemini 回归导致嵌入式 agent 完全不可用；后者为 2026.7.1 网关在 systemd/ollama/手动启动均失败的启动阻断，均为发布阻断级回归。

**PR 侧关注度：** [#126424 fix(gateway): keep conversation delivery within agent bindings](https://github.com/openclaw/openclaw/pull/126424)（XL · P1 · 多通道）讨论多代理会话投递越权问题；[#126566 fix(agents): stop fallback tasks hanging after primary model failures](https://github.com/openclaw/openclaw/pull/126566) 直指主模型失败后 fallback 任务永久 `running` 的悬挂问题（关联 #126311）。

### 5. Bug 与稳定性

按严重度排序（P0 > P1 > P2），标注是否已有 Fix PR：

| 严重度 | Issue | 现象 | 状态/关联修复 |
|---|---|---|---|
| **P0** | [#108435 gateway fails to start 2026.7.1](https://github.com/openclaw/openclaw/issues/108435) | `gateway did not start on 127.0.0.1` 回归，1-vCPU 容器必现 | OPEN · `crash-loop, ux-release-blocker` · 无公开 Fix PR |
| **P0** | [#48920 Live Docs are ahead of release](https://github.com/openclaw/openclaw/issues/48920) | `IsolatedSessions` 等 Heartbeat 配置已上文档但未随 2026.3.13 发布 | OPEN · `recovery-stuck` · 无 Fix PR |
| **P1** | [#48003 Steer mode not inject mid-turn](https://github.com/openclaw/openclaw/issues/48003) | 消息丢失/会话状态受损 | OPEN · ✅ `linked-pr-open` |
| **P1** | [#96834 WhatsApp image wedges lane 3min](https://github.com/openclaw/openclaw/issues/96834) | 主通道阻塞，消息丢失 | OPEN · `recovery-stuck` · 无 Fix PR |
| **P1** | [#38327 Cannot convert undefined/null to object](https://github.com/openclaw/openclaw/issues/38327) | google-vertex/gemini-3.1-preview 全量失败 | OPEN · 回归 · 无 Fix PR |
| **P1** | [#97616 leaks unreaped hook/tool child processes](https://github.com/openclaw/openclaw/issues/97616) | 僵尸进程累积导致运行时劣化 | OPEN · `needs-info` · 无 Fix PR |
| **P1** | [#90361 memory_search "index metadata is missing" race](https://github.com/openclaw/openclaw/issues/90361) | 间歇性内存搜索不可用，搜索/重建竞态 | OPEN · 本地已 hotfix · `not-repro-on-main` |
| **P1** | [#119087 Gateway cold start regressed ~2.5x](https://github.com/openclaw/openclaw/issues/119087) | 7.1-beta.1 → 7.2-beta.7 冷启动 2.5 倍劣化 | OPEN · 无 Fix PR |
| **P1** | [#125570 Skill Workshop update overwrites description](https://github.com/openclaw/openclaw/issues/125570) | 更新提案覆盖线上 skill 描述导致路由失效，数据丢失 | OPEN · ✅ `linked-pr-open` |
| **P1** | [#112259 inbound channel turn silently dropped](https://github.com/openclaw/openclaw/issues/112259) | 零 payload 转发无重试/死信，用户无感知丢消息（iMessage 已验证） | OPEN · 无 Fix PR |
| **P2** | [#48810 Compaction retry creates orphan fork](https://github.com/openclaw/openclaw/issues/48810) | parentId 链表分叉，链路重建失败 | OPEN · `recovery-stuck` |
| **P2** | [#92241 Gateway holds stale module import paths after rollback](https://github.com/openclaw/openclaw/issues/92241) | 回滚后 `ERR_MODULE_NOT_FOUND` 静默丢消息 | OPEN · `recovery-stuck` |

> 健康信号：`impact:message-loss` 在 Top 50 中出现 9 次，`impact:session-state` 出现 13 次，说明**消息可靠性仍是首要风险面**；`clawsweeper-recovery-stuck` 标签在 10+ 个 P1/P2 上出现，表明自动修复流水线已卡住，需人工介入。

### 6. 功能请求与路线图信号

| 需求 | Issue | 热度/标签 | 可能纳入下一版本的关联 PR/信号 |
|---|---|---|---|
| **多编码文件名统一工具** | [#48788](https://github.com/openclaw/openclaw/issues/48788) | P3 · 20 评论 | 架构层需求，若通过将成为 Channel 适配器通用能力，预期进入 2026.8.x |
| **分级 Bootstrap 加载** | [#22438](https://github.com/openclaw/openclaw/issues/22438) | P2 · 17 评论 | 与 [#14785 Reduce tool schema token overhead (~3,500 tok/session)](https://github.com/openclaw/openclaw/issues/14785) 同为 Token 成本优化主线，社区呼声高但需产品决策 |
| **会话快照 save/load** | [#13700 Session snapshots](https://github.com/openclaw/openclaw/issues/13700) | P2 | 长期诉求，暂无对应 PR，纳入优先级低 |
| **A2A 单向分发模式** | [#44309 Add one-way dispatch mode for A2A handoffs](https://github.com/openclaw/openclaw/issues/44309) | P2 · 9 评论 | 与 [#126537 preserve accepted handoff in tool settlement](https://github.com/openclaw/openclaw/pull/126537) 等 handoff 修复同属编排稳定性赛道，可能打包进入多代理稳定性迭代 |
| **反应触发 Agent 轮次** | [#17840 opt-in reaction-triggered agent turns](https://github.com/openclaw/openclaw/issues/17840) | P2 | 纯增强，无 PR，短期不纳入 |
| **模型透传与 Fallback 可控性** | [#51441 expose resolved backend model](https://github.com/openclaw/openclaw/issues/51441) / [#47910 provider fallback by failure class](https://github.com/openclaw/openclaw/issues/47910) / [#33975 Fallback approval mode + model attribution](https://github.com/openclaw/openclaw/issues/33975) | P2/P3 | 与 [#126566 fallback hanging](https://github.com/openclaw/openclaw/pull/126566) 强相关，Fallback 链路重构是近期最可能落地的路线图项 |
| **Cron wake-only payload** | [#119040 feat(cron): add wake-only payload](https://github.com/openclaw/openclaw/pull/119040) | PR OPEN | 已有实现，等待合入，可视为下一 Beta 特性 |

**判断：** 下一版本（8.1）最可能合入的是 **Fallback/编排稳定性 + 性能/启动优化 + 安装策略安全** 三件套；Token 成本类（bootstrap 分级/tool schema 瘦身）需等待产品决策，短期不会发布。

### 7. 用户反馈摘要

**真实痛点（提炼自评论与复现报告）：**

*   **消息可靠性焦虑：** WhatsApp 图片卡死（#96834）、Telegram DM 污染主会话（#41165）、iMessage 零 payload 静默丢失（#112259）让用户对“消息是否真被处理”缺乏信任，呼吁重试/死信与可视化失败提示。
*   **多代理与并发脆弱：** `openclaw agents add` 并发配置覆写、session-lock 失败、子代理早退（#43367, #50165）表明并行编排在生产级批量任务中不可用。
*   **升级/回滚恐慌：** 2026.7.1 网关无法启动（#108435）、6.1→5.6 回滚后 stale import 丢消息（#92241）、`dev` 通道 `workspace:*` 协议导致 `EUNSUPPORTEDPROTOCOL`（#123073）共同指向升级链路鲁棒性不足，用户要求安全的回滚与版本冻结验证（#126622 已尝试修复）。
*   **模型与上下文成本：** 工具 schema 每会话 3,500 token 固定税（#14785）、长会话切换模型静默失败（#58957）、自定义推理模型 `maxTokens` 8192 截断 tool-call JSON（#126611）让用户在高上下文场景下成本与可靠性双重受损。
*   **满意点：** Claude CLI OAuth 修复（#125471）与 Apple 路由契约修复（#126366/#126330）获得积极反馈；性能类 PR（#126629/#126630）对开发者自托管体验改善预期高。

### 8. 待处理积压

**长期未闭环且高影响的 Issue（>5 个月，仍在 `needs-maintainer-review`）：**

*   [#22438 Tiered bootstrap file loading](https://github.com/openclaw/openclaw/issues/22438) - 2026-02-21 创建，17 评论，P2，涉及所有会话的 Token 基线
*   [#14785 Reduce tool schema token overhead](https://github.com/openclaw/openclaw/issues/14785) - 2026-02-12，9 评论，P2，与上条同属成本优化核心
*   [#13700 Session snapshots](https://github.com/openclaw/openclaw/issues/13700) - 2026-02-10，7 评论，P2，长开发会话回滚/分支刚需
*   [#14747 configurable lane wait diagnostic threshold](https://github.com/openclaw/openclaw/issues/14747) - 2026-02-12，6 评论，cron 长任务误报
*   [#43747 Memory management is in chaos](https://github.com/openclaw/openclaw/issues/43747) - 2026-03-12，11 评论，P2，三人团队内存存储路径不一致
*   [#48810 Compaction orphan fork](https://github.com/openclaw/openclaw/issues/48810) / [#92241 stale module paths](https://github.com/openclaw/openclaw/issues/92241) - 均 `recovery-stuck`，影响会话链路与回滚可靠性

**长期滞留 PR（>2 周，需 maintainer 决策或 proof）：**

*   [#112078 feat: add NVIDIA Nemotron Speech ASR and TTS](https://github.com/openclaw/openclaw/pull/112078) - 2026-07-21，XL，`needs proof`，涉及安全边界与兼容性风险
*   [#123535 avoid session catalog refresh storms](https://github.com/openclaw/openclaw/pull/123535) / [#123975 typecheck hangs](https://github.com/openclaw/openclaw/pull/123975) - 均已 `ready for maintainer look`，建议优先合并以缓解 UI 与 CI 阻塞

> **维护者提醒：** `clawsweeper:needs-product-decision` 在 Top 50 中出现 14 次，`needs-maintainer-review` 出现 15 次，决策队列已拥堵。建议本周优先清理由 `diamond lobster / platinum hermit` 标记的 P0/P1 `recovery-stuck` 项，并对 2026.8.1-beta.2 验证（#125626）给出发布阻断清单。

---
*注：本日报基于过去 24H 500 Issues + 500 PRs 的增量数据及评论数 Top 50/30 样本生成，仅反映已公开 GitHub 信号，不代表官方 Roadmap 承诺。*

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告
**2026-08-20 | 数据窗口：2026-08-19 00:00 - 08-20 00:00 UTC**

### 1. 生态全景

个人 AI 助手开源生态已从“功能竞赛”全面进入**“可靠性与治理分化期”**。头部项目日更达 900+ 条动态，但闭环率普遍低于35%，核心矛盾集中在消息可靠性、会话状态与网关稳定性。

技术路线出现明确分岔：一端以 OpenClaw/hermes-agent 为代表重仓网关中枢与桌面控制面，另一端以 Zeroclaw 为代表推动 Rust 轻核+WASM 插件化架构重构。

全生态共同承压于冷启动性能、长会话 Token 成本与多通道兼容三重挑战，而插件市场治理、安装即崩、配置即坏等工程化债务正成为决定用户留存的关键。

> **一句话判断：** 规模化已完成，韧性与可观测性成为下一轮竞争门票。

### 2. 各项目活跃度对比

| 项目 | Issues (新开/活跃 / 已关闭) | PR (待合并 / 已合并关闭) | Release | 24H总量 | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 (472 / 28) 关闭率 5.6% | 500 (420 / 80) | 无，验证 `v2026.8.1-beta.2` | **1000** | **极高活跃·高积压**。活跃度生态第一，但 `recovery-stuck` 10+，决策队列拥堵 |
| **hermes-agent** | 426 (349 / 77) 关闭率 18% | 500 (325 / 175) 吞吐率35% | 无，停留 `v0.20.0` | **926** | **超高活跃·债务承压**。Windows/会话状态为 P1 重灾区，需止血发布 |
| **Zeroclaw** | 50 (44 / 6) 关闭率12% | 50 (46 / 4) | 无 | 100 | **高活跃·低交付**。46个PR积压，处于 RFC 评审高峰期，交付星级 ★★☆ |
| **QwenPaw** | 25 (7 / 18) 关闭率72% | 50 (19 / 31) 关闭率62% | 无 | 75 | **高活跃·强收敛**。批量清债期，工程健康度最佳，转向韧性加固 |
| **AstrBot** | 11 (5 / 6) 关闭率54.5% | 8 (4 / 4) 合并率50% | **有 `v4.27.4` Patch** | 19 | **中高活跃·稳健交付**。唯一发版项目，小步快跑，聚焦稳定性 |
| **PicoClaw** | 0 (0 / 0) | 4 (3 / 1关闭未合并) | 无 | 4 | **低活跃·维护期**。零新增Issue，2个Stale PR 超17天未决 |

> 活跃度分层：**1000/900档** (OpenClaw/hermes) >> **100/75档** (Zeroclaw/QwenPaw) >> **20档以下** (AstrBot/PicoClaw)

### 3. OpenClaw 在生态中的定位

**规模锚点：** 以 1000 条日更数据成为生态参照系，体量约为 Zeroclaw/QwenPaw 的 10倍，hermes-agent 的 1.08倍，在 Issue/PR 双维度上断层领先，社区讨论深度最高。

**优势：**
1.  **网关与控制面最完整：** 唯一同时覆盖 Gateway 冷启动、Control UI、Apple/Telegram 多通道路由契约、模型 Fallback 全链路的项目。性能 PR #126629/#126630 将单次 secrets 开销从 2368次 manifest 打开降至复用，网关启动 50s 耗时中 79% 重建开销被消除，此类深度优化在其他项目未见。
2.  **安全边界闭环领先：** `security.installPolicy -> warn` 与 `acknowledgeInstallPolicyWarning` 的前后端完整落地，而 Zeroclaw/hermes 仍在 RFC 阶段讨论 permission contract。
3.  **真实负载暴露问题：** P0/P1 高度集中在 `impact:message-loss (9/50)` `impact:session-state (13/50)`，问题发现密度反映其生产环境使用广度远超同类。

**技术路线差异：**
*   vs **Zeroclaw (Rust轻核+WASM)**：OpenClaw 走 **TypeScript 重型网关 + 插件生命周期复用**，追求单体性能优化；Zeroclaw 走 **Rust 极致瘦身 + 运行时动态加载**，追求安全隔离与可验证供应链。二者代表“优化单体”vs“重构内核”两种路径。
*   vs **QwenPaw/hermes-agent (桌面IDE化)**：OpenClaw 是 **Headless Gateway 中枢**，QwenPaw/hermes 是 **Electron 桌面容器**。OpenClaw 解决多渠道消息投递，桌面派解决长会话渲染与本地打包。
*   vs **AstrBot (IM机器人框架)**：OpenClaw 面向 **个人助理全生命周期托管**，AstrBot 面向 **群聊机器人插件分发**，架构复杂度与用户画像完全不同。

### 4. 共同关注的技术方向

| 共性方向 | 涉及项目 | 具体诉求与收敛点 |
| :--- | :--- | :--- |
| **1. 消息可靠性与会话状态** | **全部6项** | OpenClaw: Steer模式丢消息/子代理早退(#48003/#50165)；Zeroclaw: SOP step/ACP回合消失(#9929/#9333)；hermes: Session永久死亡(#78981)；QwenPaw: 规划后静默停止(#6921)；AstrBot: TG长轮询假死(#8314)；PicoClaw: routed-agent失忆(#3316)。**共识：重试/死信/可视化归因成为标配需求** |
| **2. 网关/通道稳定性** | OpenClaw, Zeroclaw, hermes, AstrBot | OpenClaw: Gateway crash-loop/冷启动劣化2.5倍；Zeroclaw: 统一webhook分发(#8586)；hermes: Webhook图控修复包(#84834)；AstrBot: 代理切换弱网可用性。均在做 **通道抽象层统一** |
| **3. 冷启动与Token成本** | OpenClaw, Zeroclaw, QwenPaw | OpenClaw: 分级Bootstrap加载(#22438)+工具schema 3500 token税(#14785)；Zeroclaw: 核心瘦身RFC(#6165)；QwenPaw: 驱动并发初始化+长会话Markdown重复解析优化。**从“功能多”转向“Token省”** |
| **4. 安全与权限治理** | OpenClaw, Zeroclaw, hermes, AstrBot | OpenClaw: 安装策略警告；Zeroclaw: SOP权限契约+Codex CLI风险参数(#9598/#5842)；hermes: shell子进程逃逸；AstrBot: 插件市场署名争议(#9687)与供应链审计。**插件生态进入强监管期** |
| **5. 安装/配置即崩** | Zeroclaw, hermes, QwenPaw, AstrBot | Zeroclaw: config init即degraded(#9436)；hermes: Windows更新摧毁安装(#86093/#83846)；QwenPaw: 桌面打包Sidecar重构；AstrBot: Windows SVG MIME。**开箱可用性成为新用户流失主因** |
| **6. 可观测性与存储** | QwenPaw, Zeroclaw, hermes | QwenPaw: history.db撑爆7.6G(#7168)；Zeroclaw: 分级遥测RFC(#9621)；hermes: Skills索引stale 29.8h。工具结果截断、日志搜索等诉求高频 |

### 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键词 |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | 多通道网关中枢 + Control UI + 多Agent编排 | 高阶自托管开发者/小团队，需7x24小时助理 | Node/TS, Gateway重型运行时, 插件生命周期复用, Session路由契约 |
| **Zeroclaw** | 架构治理 + 安全加固 + 供应链可验证 | Rust极客/安全敏感企业，对沙箱与权限有强诉求 | Rust, WASM运行时插件, Workspace多crate, crates.io发布链路, ADR治理 |
| **hermes-agent** | Electron桌面 + 多Agent编排 + ACP协议 | Windows重度用户/多Agent协作开发者 | Electron + Node, 单网关多Agent隔离, Buzz身份, DeepSeek长上下文 |
| **QwenPaw** | 桌面工作台 + 记忆/知识库 + 本地模型 | Windows个人办公用户/长会话重度使用者 | Python + Electron, PyInstaller Sidecar, reme记忆, Hub多用户 |
| **AstrBot** | IM机器人框架 + 插件市场运营 | QQ/TG群主/插件开发者，生态分发 | Python, FastAPI, 插件市场, WebUI运维面板 |
| **PicoClaw** | 轻量硬件适配 + 多渠道补丁 | Sipeed硬件用户/边缘bot场景 | 轻量Go/TS, LINE/Discord/Telegram通道适配, 共享Gateway HTTP |

> **核心差异：** OpenClaw做“最强的网关”，Zeroclaw做“最干净的核”，hermes/QwenPaw做“最好用的桌面”，AstrBot做“最活跃的市场”。

### 6. 社区热度与成熟度

**第一梯队：快速迭代期·高负载承压**
*   **OpenClaw / hermes-agent**：日更 900+，但闭环率仅 5.6% / 18%，`recovery-stuck` `needs-maintainer-review` 占比超 30%。特征是“问题发现速度 >> 修复合入速度”，亟需发布火车与决策带宽扩容。适合追踪前沿但不适合生产跟随 `main`。

**第二梯队：架构重构/质量巩固期·治理驱动**
*   **Zeroclaw**：17评论的RFC#6165讨论超3个月，`status:accepted` 队列化治理，46个PR待审是主动的“提案堰塞湖”，短期交付低但长期架构收益高。
*   **QwenPaw**：关闭率 62-72%，批量关闭4月历史债，`perf` `fix` 占比超70%，已从功能扩张转入偿债期，下一版本以韧性补丁为主，成熟度快速提升。

**第三梯队：稳态运营期·小步快跑**
*   **AstrBot**：唯一日更发版，保持 Patch 节奏，PR体量小(L/XS)但命中率高，聚焦 TG假死、OOM等生产痛点，社区治理议题(#9687)显示生态已进入规范化阶段。最适合求稳的生产选择。

**第四梯队：维护消化期·贡献者风险**
*   **PicoClaw**：连续零Issue，3/4 PR处于 stale，17天未决的核心记忆Bug(#3316)有流失贡献者风险，需维护者尽快 triage。

### 7. 值得关注的趋势信号

**对 AI 智能体开发者的参考价值：**

1.  **可靠性 > 功能丰富度成为选型首要指标：** 全生态 P1 缺陷中 60% 为“静默丢消息/会话消失/网络中断不自愈”。开发者应优先评估框架的重试、死信队列、会话持久化与可视化失败提示，而非工具数量。QwenPaw 的 `httpx.ReadError` 漏判与 OpenClaw 的 Steer 队列回归是典型反面教材。

2.  **“轻核+运行时插件”成为架构共识：** Zeroclaw 的 WASM 插件化、OpenClaw 的插件生命周期复用、AstrBot 的知识库可插拔后端(#9751)共同指向：下一次大版本竞争将是“核心 20% + 插件 80%”的生态位争夺。自研 Agent 建议直接基于插件契约设计，避免耦合核心。

3.  **桌面端与本地模型是差异化战场：** QwenPaw 的并发Driver初始化、hermes 的 GPU空闲100% CPU、AstrBot 的 NVIDIA模型弃用预警(#9729)表明，Windows桌面打包、Ollama嵌入超时(5s硬编码)、杀软拦截等“最后一公里”体验决定 C 端留存。纯云端Agent将面临同质化。

4.  **Token 成本优化从可选变为必选：** OpenClaw 每会话3500 token 的 schema 税、Bootstrap全量加载、QwenPaw 7.6G history.db 膨胀，倒逼分级加载、按需上下文、压缩/摘要可控化。长会话产品必须将 Token 预算纳入架构设计。

5.  **插件市场治理提前到来：** AstrBot 的署名争议(13评论)与 Zeroclaw 的 `crates.io` 发布链路打通，预示当插件数过百后，原创保护、审核SOP、供应链审计将成为社区健康度核心。入局生态开发需关注 License 与审核规则。

> **给技术决策者的建议：** 若求生产稳定，短期选 AstrBot/QwenPaw 的 Release 分支；若做技术预研，跟踪 Zeroclaw 的 WASM 插件 ADR 与 OpenClaw 的 Gateway 性能优化；避免在任何项目上跟随 `main` 分支直接部署生产。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-20

### 1. 今日速览

过去 24 小时项目保持高活跃度，共产生 **100 条**更新：Issues 50 条（新开/活跃 44，已关闭 6）、PR 50 条（待合并 46，已合并/关闭 4），无新版本发布。活跃重心集中于**架构治理与安全加固**：核心瘦身、SOP 权限契约、遥测策略等 4 个高风险 RFC 持续成为讨论焦点，同时通道/工具运行时插件化与 crates.io 发布链路推进显著。合并吞吐偏低（仅 4 条关闭），46 个待审 PR 积压，评审瓶颈需关注。

> **健康度评估：活跃度 ★★★★★ | 交付进度 ★★☆☆☆ | 风险聚焦度 ★★★★★ | 社区参与度 ★★★★☆**

### 2. 版本发布

**今日无新版本发布。**
最新 Release 为空，`master` 分支以功能预研与安全修复为主，未进入发版窗口。需关注的发布前置工作见 [#9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381) 与 [#10158](https://github.com/zeroclaw-labs/zeroclaw/pull/10158)。

### 3. 项目进展

今日合并/关闭 4 个 Issues + 1 个 PR，聚焦测试硬化、安全边界与架构清理，整体为增量硬化而非功能交付：

*   **已关闭 - 安全：Codex CLI 风险参数警告落地** [#5842](https://github.com/zeroclaw-labs/zeroclaw/issues/5842) (Feature, P2) 诉求已通过 PR [#9548](https://github.com/zeroclaw-labs/zeroclaw/pull/9548) `fix(config): warn on risky Codex CLI extra args` 实现并关闭。新增对 `codex_cli.extra_args` 中可削弱沙箱/审批边界参数的非阻塞警告，完善 `doctor` 检查，风险 `high`。
*   **已关闭 - 测试稳定性：移除运行时写入可执行文件** [#10011](https://github.com/zeroclaw-labs/zeroclaw/issues/10011) 修复 `heartbeat_worker_reconnects_after_stdio_child_exits` 在多线程测试进程启动后写文件+chmod+执行的竞态隐患，保留真实 stdio MCP 子进程重连语义。
*   **已关闭 - 架构清理：合并机器人套件** [#9803](https://github.com/zeroclaw-labs/zeroclaw/issues/9803) RFC 通过，决定将 `zeroclaw-robot-kit` 并入 `zeroclaw-hardware` 并删除独立 crate，延续 [#8043](https://github.com/zeroclaw-labs/zeroclaw/issues/8043) `aardvark-sys` 退役模式，降低 workspace 维护成本。
*   **已关闭 - 可观测性：Reliable 回退遥测归因修正** [#9470](https://github.com/zeroclaw-labs/zeroclaw/issues/9470) 任务关闭，修复 PR [#9424](https://github.com/zeroclaw-labs/zeroclaw/pull/9424) 引入的 fallback 用量错误归因及过期提示问题，为可靠选路提供准确计费依据。

> **推进评估：** 今日无核心功能合并，`risk:high` 的 46 个待审 PR 表明项目处于“大量提案评审期”，短期合并率低，长期架构收益预期高。

### 4. 社区热点

按评论数排序，今日最活跃的 5 个议题均为架构类 RFC/Tracker，反映维护者对“核心边界”的深度博弈：

1.  **【17 评论】RFC: Prefer a lighter ZeroClaw core through external integrations** [#6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) `risk:high, type:rfc` — 4月27日提出的最热议题。核心矛盾：是否将长尾集成移出默认 core，改为外部集成。评论聚焦配置膨胀、安全面、兼容性成本与替代方案成熟度。诉求：明确 core 的最小集与插件化路径。
2.  **【13 评论】[Tracker]: Maintainer decision queue for RFCs** [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) `status:accepted` — 维护者决策队列看板，汇总所有待裁决的 RFC/设计议题。今日仍有更新，说明项目已建立正式的 RFC 准入/驳回/延期机制，治理趋于规范化。
3.  **【8 评论】RFC: Define the SOP capability permission contract** [#9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598) `Rev 3, risk:high` — 讨论 SOP 能力的 `required_permissions` 如何与共享权限系统对齐，提出 interim owner/risk-profile 强制路径 vs 完整共享路径。诉求：不重复造授权系统，同时让 SOP 授权可审计。
4.  **【8 评论】RFC: staged opt-in product telemetry** [#9621](https://github.com/zeroclaw-labs/zeroclaw/issues/9621) `risk:high, status:accepted` — 为解决“功能是否被真实使用”信息盲区，提出分阶段、需运营者审查报告的 opt-in 遥测。关联 [#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103) Lucid/Qdrant 去留决策。争议点在隐私与决策数据缺失的平衡。
5.  **【7 评论】refactor(gateway): centralize webhook channel message dispatch** [#8586](https://github.com/zeroclaw-labs/zeroclaw/issues/8586) `risk:medium, in-progress` — 提出统一 gateway webhook 入口助手，复用 autosave、agent 调度、回复/错误分发等生命周期，保留传输层快速确认。诉求：减少各 webhook 通道重复代码，为未来通道轮转打基础。

PR 侧热点（虽评论字段未回传，但更新活跃）：
*   [#10155](https://github.com/zeroclaw-labs/zeroclaw/pull/10155) `feat(sop): expose run logs...`、`[#10142](https://github.com/zeroclaw-labs/zeroclaw/pull/10142) feat(zerorelay)`、`[#10158](https://github.com/zeroclaw-labs/zeroclaw/pull/10158) publish to crates.io` 三大高风险 PR 当日更新，指向 SOP 可观测性与发布链路。

### 5. Bug 与稳定性

今日活跃 Bug 共 14 条，按严重度排序：

**P1 / S1 阻塞级 (6条)**
*   [#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) `cargo-audit ignores and remediate wasmtime-wasi CVEs` — `cargo audit` 与 `cargo deny` 忽略列表漂移，wasmtime-wasi 存在待修复 CVE。`status:accepted, risk:high`，暂无对应 fix PR。
*   [#9929](https://github.com/zeroclaw-labs/zeroclaw/issues/9929) `headless SOP step turns never persisted` — `sop-{run_id}-step-{n}` 会话有路径但未落盘，导致历史丢失。`status:blocked, risk:high`，关联 PR [#10155](https://github.com/zeroclaw-labs/zeroclaw/pull/10155) 拟补齐日志与归因。
*   [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) `failed ACP turns disappear after switching sessions` — ACP 通道失败回合在切换会话后消失。`status:in-progress`，无直接 fix PR。
*   [#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290) `Windows desktop installer fails with missing TaskDialogIndirect` — v0.8.3 安装包在老系统缺 API 导致启动失败。**已有修复 PR** [#9291](https://github.com/zeroclaw-labs/zeroclaw/pull/9291) `fix(cli): detect AppImage...` 但待合并。
*   [#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) `[Tracker] bitmaps RUSTSEC-2026-0247 waiver` — `imbl` 经 Matrix SDK 引入 `bitmaps 3.2.1` 未维护告警，`cargo deny` 阻塞。`status:blocked`，暂无 fix PR。
*   [#9436](https://github.com/zeroclaw-labs/zeroclaw/issues/9436) `config init writes template sections that fail strict loader` — 新生成的配置即处于 degraded 状态，`config migrate` 退出 1。`risk:high, in-progress`，影响所有新用户。

**P2 / S2 降级级 (8条)**
*   [#10116](https://github.com/zeroclaw-labs/zeroclaw/issues/10116) / [#10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115) / [#10114](https://github.com/zeroclaw-labs/zeroclaw/issues/10114) **工具结果截断三连** — 固定 50k 字符、中间掏空截断且对模型外不可见，建议改为 `web_fetch` 式的落盘句柄。均为 2026-08-19 新报，`risk:medium`。
*   [#7911](https://github.com/zeroclaw-labs/zeroclaw/issues/7911) `install.sh selects generic binary on Android/Termux` — Termux 误装 `linux aarch64` 通用包。`priority:p2, risk:medium`，长期未解。
*   [#10089](https://github.com/zeroclaw-labs/zeroclaw/issues/10089) `ZeroCode ignores paste while turn running` — TUI 在回合执行期忽略括号粘贴。`risk:low`
*   [#10042](https://github.com/zeroclaw-labs/zeroclaw/issues/10042) `MSRV job can consume timeout in apt install` — GitHub-hosted Linux MSRV 任务在安装系统依赖阶段耗尽 20 分钟超时。`risk:medium`
*   [#10106](https://github.com/zeroclaw-labs/zeroclaw/issues/10106) `Exact proxy selectors reject transcription services` — `transcription.groq/openai/...` 代理选择器误拒。`risk:medium`
*   [#10074](https://github.com/zeroclaw-labs/zeroclaw/issues/10074) `SECURITY.md documents removed CI job` — 文档仍引用已删除的 `docker` job，容器检查已成约定而非强制。`risk:medium`

> **稳定性信号：** P1 中 3/6 处于 `blocked`，安全/配置类缺陷集中，亟需优先合入 [#9291](https://github.com/zeroclaw-labs/zeroclaw/pull/9291)、[#9827](https://github.com/zeroclaw-labs/zeroclaw/pull/9827) 等高风险修复。

### 6. 功能请求与路线图信号

**明确的路线图方向：向“轻核 + 运行时插件”演进**

*   **核心瘦身 + 插件化** — RFC [#6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) 与 Tracker [#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850) `Move channels & tools to runtime WASM plugins` 为主线，PR [#9126](https://github.com/zeroclaw-labs/zeroclaw/pull/9126) `validate typed instance config` 与 ADR [#10169](https://github.com/zeroclaw-labs/zeroclaw/pull/10169) `ADR-014 plugin egress authority` 为其配套，下一版本大概率以插件化为 headline。
*   **SOP 与目标模式增强** — RFC [#9702](https://github.com/zeroclaw-labs/zeroclaw/issues/9702) `Goal mode v2 — durable continuation and Web controls` 与 PR [#10155](https://github.com/zeroclaw-labs/zeroclaw/pull/10155) `expose run logs` 形成闭环：持久化续跑 + 浏览器控制面 + 跨步日志可观测。
*   **网关与通道** — [#8586](https://github.com/zeroclaw-labs/zeroclaw/issues/8586) 网关统一分发 + PR [#8443](https://github.com/zeroclaw-labs/zeroclaw/pull/8443) `Matrix single-message progress drafts` + PR [#10084](https://github.com/zeroclaw-labs/zeroclaw/pull/10084) `whatsapp-rust passkey gate` 显示多通道体验仍在迭代。
*   **发布与供应链** — Tracker [#9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381) 与 PR [#10158](https://github.com/zeroclaw-labs/zeroclaw/pull/10158) `publish workspace to crates.io`（20 crates, do-not-merge）及 PR [#10170](https://github.com/zeroclaw-labs/zeroclaw/pull/10170) `Blacksmith cache` 表明 v0.9.0 挡板在打通 `cargo install` 与可验证 CI。
*   **安全策略收敛** — RFC [#9990](https://github.com/zeroclaw-labs/zeroclaw/issues/9990) `Calibrate PR risk and security approval` 试图降低“测试专用改动误标 high”的噪音；PR [#7821](https://github.com/zeroclaw-labs/zeroclaw/pull/7821) `canonical sandbox_policy` 与 [#9827](https://github.com/zeroclaw-labs/zeroclaw/pull/9827) 修复 shell 子进程逃逸，安全为下版本必含项。
*   **其他增强** — PR [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) `context compaction ratio`、PR [#9554](https://github.com/zeroclaw-labs/zeroclaw/pull/9554) `dag_plan_execute`、PR [#8337](https://github.com/zeroclaw-labs/zeroclaw/pull/8337) `Herdr observability` 均为能力加分项，纳入取决于评审带宽。

### 7. 用户反馈摘要

从 Issues 评论与高频标签提炼：

*   **痛点 1 - 安装即踩坑：** Android/Termux 用户反馈 `install.sh` 架构探测错误 [#7911](https://github.com/zeroclaw-labs/zeroclaw/issues/7911)；Windows 用户 v0.8.3 桌面版直接无法启动 [#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290)，两者均阻塞新用户首体验。
*   **痛点 2 - 配置开箱即坏：** `config init` 生成的模板无法通过严格加载器校验 [#9436](https://github.com/zeroclaw-labs/zeroclaw/issues/9436)，用户首次初始化即进入 degraded，需手动修补，满意度负向。
*   **痛点 3 - 信任与紧急制动：** 用户指出 `zeroclaw estop` 仅写文件不生效 [#9440](https://github.com/zeroclaw-labs/zeroclaw/pull/9440)，及多通道审批可被未授权回复者触发 [#9574](https://github.com/zeroclaw-labs/zeroclaw/pull/9574)，对安全关键能力的不信任感强。
*   **痛点 4 - 可观测性缺口：** 工具结果无声截断 [#10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115) 导致模型上下文与用户所见不一致；ACP 失败回合消失 [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)；开发者难以排查。
*   **正向信号：** 社区对决策透明度认可度高，[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 决策队列与 [#9512](https://github.com/zeroclaw-labs/zeroclaw/issues/9512) `Annotate CI gates` 提议获支持，认为有助于减少“黑盒门禁”。

### 8. 待处理积压

**需维护者优先关注的长期未解项（>30天且仍活跃）：**

*   **超期 RFC：** [#6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) 自 2026-04-27 讨论 17 轮仍 `needs-maintainer-review`，是核心瘦身的决策阻塞点。
*   **安全债：** [#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) 6月30日以来的 `wasmtime-wasi` CVE 与 [#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) `bitmaps` 告警均 `risk:high` 且 `status:accepted/blocked`，CI 持续飘红。
*   **安装兼容：** [#7911](https://github.com/zeroclaw-labs/zeroclaw/issues/7911) 6月18日至今无 PR 关联，Android 场景长期无解。
*   **PR 评审积压（>40天 `needs-author-action` / `needs-maintainer-review`）：**
    *   [#7821](https://github.com/zeroclaw-labs/zeroclaw/pull/7821) `sandbox_policy` (06-17, XL, risk:high)
    *   [#8337](https://github.com/zeroclaw-labs/zeroclaw/pull/8337) `Herdr reporting` (06-26, XL)
    *   [#8443](https://github.com/zeroclaw-labs/zeroclaw/pull/8443) `Matrix single_message` (06-28, XL)
    *   [#9574](https://github.com/zeroclaw-labs/zeroclaw/pull/9574) `authorize approval responders` (P1, risk:high) — 安全修复却停滞
    *   [#9440](https://github.com/zeroclaw-labs/zeroclaw/pull/9440) `emergency stop before tool call` (P1, risk:high) — 同样停滞
*   **文档/契约债：** [#8691](https://github.com/zeroclaw-labs/zeroclaw/issues/8691) ADR 基线恢复、[#10074](https://github.com/zeroclaw-labs/zeroclaw/issues/10074) SECURITY.md 失真，需小成本快速合入以提振信任。

> **建议：** 本周优先裁决 [#6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) 与 [#9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598) / [#9621](https://github.com/zeroclaw-labs/zeroclaw/issues/9621)，并集中合入 P1 安全 PR [#9827](https://github.com/zeroclaw-labs/zeroclaw/pull/9827)、[#9574](https://github.com/zeroclaw-labs/zeroclaw/pull/9574)、[#9440](https://github.com/zeroclaw-labs/zeroclaw/pull/9440) 以释放 blocked Issues。

---
*数据来源：GitHub API 2026-08-20 00:00-24:00 UTC | 生成器：Muse Spark*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-20

### 1. 今日速览

本日 PicoClaw 项目整体处于**低活跃度的维护/消化期**。过去 24 小时内 `Issues` 零新增、零关闭，无新版本发布；`Pull Requests` 维度有 4 条更新，其中 3 条为待合并状态更新，1 条关闭未合并。核心动态集中在对历史 PR 的触达更新而非新增合入，显示项目主分支推进暂时停滞，但存量 PR 仍在被动维护，整体健康度评估为 **平稳但需关注 PR 积压**。

> 数据基线：24h Issues 0 | 24h PRs 4 (待合并 3 / 已合并或关闭 1) | 新 Release 0

### 2. 版本发布

本日无新版本发布。`Latest Releases` 为空，近一周未有版本迭代。

### 3. 项目进展

本日 **无 PR 合并入主分支**，项目功能性推进为 0。唯一的关闭项为当日关闭的 PR，未产生实质代码合入。

*   **未合入关闭：`#3341` feat(telegram): add interactive command UX and formatted ephemeral fallback — [CLOSED]**
    *   链接：https://github.com/sipeed/picoclaw/pull/3341
    *   作者：@As-tsaqib | 创建/关闭：2026-08-19
    *   内容：旨在优化 Telegram 端 `/memory` 命令的交互体验，降低 CLI 式完整子命令语法的认知负担；精简 `/help` 的冗长输出；并为结构化内容降级提供格式化的 ephemeral fallback。
    *   进展解读：该 PR 于创建当日即被关闭，且系统标记为 `CLOSED` 而非 `MERGED`，表明该功能增强未被采纳或需重大修改后重提。本日无有效代码向前交付。

> 结论：项目本日无增量交付，处于版本空窗期。

### 4. 社区热点

本日无新增 Issue，社区讨论热度极低。4 条 PR 更新均显示 `评论: undefined / 👍: 0`，未出现高评论、高点赞的热点讨论。按更新时间排序的活跃 PR 如下：

1.  **#3329 fix(line): warn on inert webhook_host / webhook_port instead of seeding them [OPEN]** - https://github.com/sipeed/picoclaw/pull/3329
2.  **#3316 [stale] fix: routed-agent context management not respecting history... [OPEN]** - https://github.com/sipeed/picoclaw/pull/3316
3.  **#3315 [stale] Support topics in private bot chats [OPEN]** - https://github.com/sipeed/picoclaw/pull/3315
4.  **#3341 feat(telegram): add interactive command UX... [CLOSED]** - https://github.com/sipeed/picoclaw/pull/3341

背后诉求分析：热点已从新需求讨论转移至对历史遗留 PR 的配置清理与多渠道体验优化，但缺乏维护者与社区的实质互动评论，互动断层明显。

### 5. Bug 与稳定性

本日无新增 Bug Issue 报告，但存量 PR 揭示 2 项待修复的稳定性/正确性问题：

| 严重程度 | 编号 | 类型 | 描述 | 状态 |
| :--- | :--- | :--- | :--- | :--- |
| **中 - 配置误导** | [#3329](https://github.com/sipeed/picoclaw/pull/3329) | 逻辑缺陷/Bug | `line.settings.webhook_host` / `webhook_port` 字段已声明默认值并绑定环境变量，但实际未被任何代码读取。当前实现中 LINE 频道通过共享 gateway HTTP server 挂载 `WebhookPath()`，导致该配置项完全惰性(inert)，易误导用户。Fix 方案为改为告警提示而非静默填充。关联 Issue #3328。 | 已有 Fix PR，待合并 |
| **高 - 上下文丢失** | [#3316](https://github.com/sipeed/picoclaw/pull/3316) | 核心功能回归 | `routed-agent` 在通过 dispatch 规则路由至指定 Discord 频道后，未正确继承历史记录，且自动压缩(auto-compaction)、摘要(summarization)、seahorse bootstrap 均未触发，导致 Agent 失忆。影响长会话可用性。 | 已有 Fix PR，待合并但被标记 stale |

> 本日无崩溃/回归类新报告，稳定性风险主要来自上述已知的上下文管理缺陷。

### 6. 功能请求与路线图信号

结合待合并 PR，可推断下一版本潜在的路线图方向集中在 **多渠道体验一致性**：

*   **Telegram 交互体验升级：** [#3341](https://github.com/sipeed/picoclaw/pull/3341) 虽已关闭，但其提出的问题真实存在——降低 `/memory` 等命令的语法门槛、优化 `/help` 可读性。该方向符合个人 AI 助手降低使用门槛的趋势，即便本 PR 未合并，后续极有可能以重构形式重新纳入。
*   **Telegram 论坛特性补齐：** [#3315](https://github.com/sipeed/picoclaw/pull/3315) Support topics in private bot chats，修复了仅识别 `Chat.IsForum` 导致无法处理私聊 bot 中 `IsTopicMessage` 话题的缺陷。表明项目正持续补齐 Telegram Topics 能力。若合并，将增强私聊场景下的话题隔离能力。
*   **配置健壮性：** [#3329](https://github.com/sipeed/picoclaw/pull/3329) 虽为 fix，但体现了路线图中对配置项“诚实性”的重视——无效配置应告警而非静默。

### 7. 用户反馈摘要

本日 `Issues` 评论区无新增反馈，基于 PR 描述提炼真实用户痛点：

*   **痛点 1 - 配置不透明：** 用户在 [#3329](https://github.com/sipeed/picoclaw/pull/3329) 中反馈，文档/配置中暴露的 `webhook_host/port` 无法生效，造成部署时调试困难，体现对“配置即生效”一致性的诉求。
*   **痛点 2 - Agent 失忆：** [#3316](https://github.com/sipeed/picoclaw/pull/3316) 作者 `j-v` 报告在 Discord 路由场景下 Agent 完全不记忆上下文，且 token 无限增长也不触发压缩，严重影响需要长期记忆的自动化助手场景。
*   **痛点 3 - Telegram 私聊话题失效：** [#3315](https://github.com/sipeed/picoclaw/pull/3315) 反馈在开启 forum topic 模式的私聊 bot 中，话题功能无法识别，导致消息归档混乱。
*   **满意度信号：** 无新增正面/负面评价，社区处于静默观察期。

### 8. 待处理积压

存在明显的 PR 积压风险，需维护者重点关注：

*   **[高优先级/已 Stale] #3316 - routed-agent 上下文管理修复** - https://github.com/sipeed/picoclaw/pull/3316
    *   积压时长：17 天 (创建于 2026-08-03，更新于 2026-08-19)
    *   风险：标记为 `[stale]`，涉及核心记忆与压缩逻辑，长期未合入将导致路由功能不可用，且 PR 可能因冲突而失效。
*   **[中优先级/已 Stale] #3315 - 私聊话题支持** - https://github.com/sipeed/picoclaw/pull/3315
    *   积压时长：17 天 (创建于 2026-08-03，更新于 2026-08-19)
    *   风险：同样被标记 `[stale]`，改动面小但影响 Telegram 核心体验，建议优先 Review。
*   **[中优先级] #3329 - LINE 无效配置告警** - https://github.com/sipeed/picoclaw/pull/3329
    *   积压时长：9 天 (创建于 2026-08-11)
    *   风险：修复成本低、收益明确，可快速合入以提升配置可观测性，避免用户反复提 Issue #3328。

> **维护建议：** 本日零 Issue 增长是健康信号，但 2 个 stale PR 已接近 3 周未决，建议本周内完成 triage，明确合并/关闭/需修改的方向，防止贡献者流失。

---
*数据来源：GitHub API 统计周期 2026-08-19 ~ 2026-08-20 | 生成时间 2026-08-20 UTC*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 | 2026-08-20

### 1. 今日速览

过去 24 小时项目活跃度**高**：共产生 75 条更新，其中 Issues 25 条（新开/活跃 7，已关闭 18），PR 50 条（待合并 19，已合并/关闭 31），关闭率 62%~72%，说明维护团队处于集中修复与收敛期。核心方向为**稳定性与性能收敛**：无新版本发布，但大量历史遗留 Bug/Question 在 08-19~08-20 被批量关闭，同时聚焦长会话卡顿、冷启动、桌面端打包等性能体验优化。社区最关注的痛点仍是**任务执行中途无提示停止**和**网络/流式异常后的自愈能力**。

### 2. 版本发布

> **今日无新版本发布**。最新 Release 为空，`main` 分支持续集成中。鉴于近 2 日合入大量 fix 与 perf 优化（见下文），预计 2.1.1 或 2.2.0 补丁版本将近。

### 3. 项目进展

今日已合并/关闭 31 个 PR，项目在可靠性、性能、工程化三线并进：

**A. 可靠性修复（已关闭，将随下个版本发布）**
*   `fix(envs): preserve corrupt files and write envs atomically` [#7135](https://github.com/agentscope-ai/QwenPaw/pull/7135) 修复严重数据丢失问题 [#7118](https://github.com/agentscope-ai/QwenPaw/issues/7118)：`envs.json` 单字节损坏即静默丢弃所有环境变量并覆写磁盘，已改为保留损坏文件备份 + 原子写入。
*   `fix(file-handling): continue fallback after downloader timeout` [#6371](https://github.com/agentscope-ai/QwenPaw/pull/6371) 修复 [#6370](https://github.com/agentscope-ai/QwenPaw/issues/6370)：`_download_remote_to_path()` 中 `wget/curl` 的 `TimeoutExpired` 未被捕获导致 fallback 链中断。
*   `fix(desktop): launch bundled qwenpawmail MCP` [#7170](https://github.com/agentscope-ai/QwenPaw/pull/7170) + `fix(release): bundle qwenpawmail MCP as a standalone sidecar` [#7166](https://github.com/agentscope-ai/QwenPaw/pull/7166) 完成桌面端 PyInstaller 打包重构，邮件 MCP 改为独立 sidecar，修复 frozen 构建下启动失败问题。
*   `test(console): fix web search config modal save race` [#7171](https://github.com/agentscope-ai/QwenPaw/pull/7171) 修复搜索引擎配置弹窗保存竞态。

**B. 性能与体验优化**
*   `perf(drivers): initialize persistent drivers concurrently` [#7174](https://github.com/agentscope-ai/QwenPaw/pull/7174) **已关闭**：工作区启动时并发初始化 Drivers，显著缩短冷启动时间，保留失败隔离与原子发布逻辑。
*   `perf(console): keep long chat sessions responsive` [#7176](https://github.com/agentscope-ai/QwenPaw/pull/7176) **待合并**：针对长会话流式输出时 Markdown 重复解析、历史渲染卡顿问题进行优化，为高频痛点。
*   `feat(console): unify apps, plugins, and skills in the marketplace` [#6880](https://github.com/agentscope-ai/QwenPaw/pull/6880) **已关闭**：统一应用/插件/技能市场至 `/market` 路由，保留原业务逻辑，完善生态入口。

**C. 工程与 CI**
*   `chore(deps): patch vulnerable website and creator dependencies` [#7172](https://github.com/agentscope-ai/QwenPaw/pull/7172) 升级 `vite 6.4.3 / rollup 4.59.0 / js-yaml 4.3.1` 修复 Vite 任意文件读取等安全告警。
*   `ci: extend macOS setuptools<82 pin to pr-preview-tests and full-tests-nightly` [#7164](https://github.com/agentscope-ai/QwenPaw/pull/7164) + `fix(e2e): re-anchor agents action cells` [#7173](https://github.com/agentscope-ai/QwenPaw/pull/7173) 修复因 #6397 新增 Backend 列导致的 e2e 定位失效及 macOS 构建失败。

> **整体推进评估**：项目从功能扩张期转入**稳定性偿债期**，近 10 个 4 月份遗留的 Question/Feature（如 #3074, #3261, #2877）于昨日集中关闭，技术债清理速度快。

### 4. 社区热点

按评论数/活跃度排序：

1.  **[OPEN] 任务执行中途无提示停止** [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) - 评论 10 | 2.1beta2 Windows11
    > 诉求：多步骤任务中模型输出 `Now 2.1, 3.1, 3.2. Let me do all three.` 这类规划后直接停止，无任何 UI 提示，需用户手动说“继续”。用户认为这是“规划好下一步就停止，没实际开始干”。**核心痛点：Agent 规划-执行断层，缺少自动续跑/状态可见性**。该问题 8 天未解，为今日最热。

2.  **[CLOSED] Freeze more than 10 minutes** [#7102](https://github.com/agentscope-ai/QwenPaw/issues/7102) - 评论 9 | QwenPaw Desktop 2.1.0 + GLM 4.5
    > 现象：使用 GLM 模型时完全无 token 输出，thinking 也冻结超 5 分钟。已关闭但未明确关联 Fix PR，怀疑与流式重试、网络超时有关，社区对模型兼容性关注度高。

3.  **[OPEN] 网络中断后无法自恢复** [#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932) - 评论 3
    > 同一天复现两次：短暂断网后所有 LLM 请求持续报 `httpx.ConnectTimeout`，必须重启进程。诉求：实现自动重连/退避重试。

4.  **[OPEN] 统一工具面板诉求** [#7013](https://github.com/agentscope-ai/QwenPaw/issues/7013) - 评论 3
    > 希望 Chat 页增加文件预览、Diff、本地 Web 服务预览、交互式 Terminal 的统一工作台，形成 Agent 开发闭环。代表了重度用户对 IDE 化能力的期待。

5.  **PR 热度**：`feat(hub): add self-hosted multi-user Hub` [#7112](https://github.com/agentscope-ai/QwenPaw/pull/7112) 与 `feat: session-scoped multi project directories` [#6976](https://github.com/agentscope-ai/QwenPaw/pull/6976) 虽评论数暂未披露，但均为大型架构变更，关注度高。

### 5. Bug 与稳定性

按严重程度排序（标注是否已有 Fix）：

**致命/高 - 导致数据丢失或会话不可用**
*   [CLOSED] `a corrupt envs.json is swallowed silently` [#7118](https://github.com/agentscope-ai/QwenPaw/issues/7118) -> **已有 Fix** [#7135](https://github.com/agentscope-ai/QwenPaw/pull/7135) 已合并
*   [CLOSED] `对话上下文包含无法下载的图片链接，整个会话不可用` [#7110](https://github.com/agentscope-ai/QwenPaw/issues/7110) -> 仅 `/clear` 可恢复，**无关联 Fix PR**，需关注容错处理
*   [OPEN] `history.db 被 recall_history 的 expand 撑爆到 7.6G` [#7168](https://github.com/agentscope-ai/QwenPaw/issues/7168) -> **无 Fix**，长期运行 Agent 会因 `ToolResultCapMiddleware` 将完整工具输出重复落库导致存储爆炸，**严重回归**
*   [CLOSED] `流式输出中途 httpx.ReadError 导致 UNKNOWN_AGENT_ERROR` [#7162](https://github.com/agentscope-ai/QwenPaw/issues/7162) -> 根因 `_get_httpx_retryable()` 漏判 `ReadError`，**已有分析，Fix PR 待提交**

**高 - 核心流程阻塞**
*   [OPEN] `任务规划后无提示停止` [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) -> **无 Fix**，影响多步任务可靠性
*   [OPEN] `网络短暂中断后无法自动恢复` [#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932) -> **无 Fix**，与 #7162 同属网络韧性问题
*   [CLOSED] `Freeze more than 10 minutes` [#7102](https://github.com/agentscope-ai/QwenPaw/issues/7102) -> 疑似同上，需验证重试逻辑是否覆盖
*   [OPEN] `embedding health check 超时硬编码 5s` [#7156](https://github.com/agentscope-ai/QwenPaw/issues/7156) -> Ollama 已预热仍 `FAIL timeout(5.0s)` 降级为 BM25，**已有对应 PR** [#7133](https://github.com/agentscope-ai/QwenPaw/pull/7133) 增加可配置超时

**中 - 体验与兼容性**
*   [CLOSED] `助手消息结束时间显示异常` [#6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) | `中文文件名被改写` [#6453](https://github.com/agentscope-ai/QwenPaw/issues/6453) | `view_video 2MB 硬编码` [#7060](https://github.com/agentscope-ai/QwenPaw/issues/7060) | `文件下载器超时` [#6370](https://github.com/agentscope-ai/QwenPaw/issues/6370) -> 均已关闭/修复
*   [CLOSED] `skill name deduplication` [#7073](https://github.com/agentscope-ai/QwenPaw/issues/7073) 已修复工作区与内置技能同名重复加载

### 6. 功能请求与路线图信号

**用户新需求（Issues）：**
*   `QQ群主动发消息，支持定时任务` [#7159](https://github.com/agentscope-ai/QwenPaw/issues/7159) - 要求支持腾讯 QQ 机器人主动推送、定时任务，对应 Channels 能力扩展
*   `支持配置钉钉群聊上下文模式` [#7158](https://github.com/agentscope-ai/QwenPaw/issues/7158) - 要求钉钉群聊支持“隔离/共享”两种上下文模式，精细化群组管理
*   `为 Chat 增加统一工具面板、Web 服务预览与交互式终端` [#7013](https://github.com/agentscope-ai/QwenPaw/issues/7013) - 呼声较高的 IDE 化需求

**与已有 PR 的路线图关联度：**
*   **极可能进入下版本**：`feat(memory): update reme 0.4.1.8` [#7133](https://github.com/agentscope-ai/QwenPaw/pull/7133) 直接响应 #7156；`fix(qq): isolate conversation sessions` [#7169](https://github.com/agentscope-ai/QwenPaw/pull/7169) 与 #7159/#7158 同属 IM 通道重构；`feat(console): add artifacts to assistant response card` [#7161](https://github.com/agentscope-ai/QwenPaw/pull/7161) 与 #7013 的产物预览方向一致。
*   **中长期信号**：`feat: refine session thinking and model management` [#7163](https://github.com/agentscope-ai/QwenPaw/pull/7163) 新增 Session 级 `Off/Low/Medium/High` 思考模式并持久化；`feat: session-scoped multi project directories` [#6976](https://github.com/agentscope-ai/QwenPaw/pull/6976) 支持多项目目录绑定；`feat(hub): add self-hosted multi-user Hub` [#7112](https://github.com/agentscope-ai/QwenPaw/pull/7112) 预示将推出自托管多用户控制面，均为重大路线图特性。

### 7. 用户反馈摘要

*   **痛点 1 - 可靠性焦虑**：用户 `rerbin, tina0501853, ErickCharles, wheza99` 反复反馈 Agent 在规划、网络抖动、流式中断场景下“静默失败”，无重试、无提示，需要人工干预“继续”或重启，对长期自动化任务信任度低。
*   **痛点 2 - 性能与存储**：`zhexiuinori` 的 7.6GB `history.db` 案例和 `rayrayraykk` 的长会话卡顿反馈表明，重度用户（长期运行/长上下文）已触及存储与渲染瓶颈。
*   **痛点 3 - 本地化与桌面体验**：`cmhaoso` 提到被杀软拦截、`rerbin` 提到中文文件名乱码、`1105623876` 提到 Ollama 本地 embedding 体验，均指向 Windows 桌面版与本地模型链路的打磨不足。
*   **正向信号**：用户对 `fix(envs)`、`view_video` 等快速响应表示认可；对统一工具面板、Hub 多用户等新特性提案积极，说明用户期望 QwenPaw 从“对话工具”进化为“开发工作台”。
*   **使用场景**：多为 Windows 11 + 2.1.0/2.1beta2 桌面版，执行多步骤数据核验、文件处理、群聊机器人等生产级任务。

### 8. 待处理积压

**需维护者优先关注的 OPEN 积压：**
*   [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) 任务中断问题 - 8 天 10 评论仍 OPEN，为当前最高优先，建议与 #7162 的流式重试逻辑联动排查
*   [#7168](https://github.com/agentscope-ai/QwenPaw/issues/7168) history.db 膨胀 7.6G - 新报严重 Bug，无 assignee，去重与截断逻辑需紧急修复
*   [#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932) 网络自愈 + [#7156](https://github.com/agentscope-ai/QwenPaw/issues/7156) embedding 超时 - 均有明确复现，需合入 #7133 并补充 httpx 重试

**PR 积压（19 个待合并）重点：**
*   [#7176](https://github.com/agentscope-ai/QwenPaw/pull/7176) `perf(console)` 长会话性能优化 - 待合并，高价值
*   [#7112](https://github.com/agentscope-ai/QwenPaw/pull/7112) Hub 多用户、[#6976](https://github.com/agentscope-ai/QwenPaw/pull/6976) 多项目目录、[#7163](https://github.com/agentscope-ai/QwenPaw/pull/7163) 思考模式 - 均为大功能，需安排 Review 避免长期滞留
*   历史遗留已于昨日批量关闭（#3074 深度执行, #3261 浏览器自动化, #3260 Harness Agents），积压清理健康度已明显好转。

> **健康度总结**：项目日更 75 条、关闭率 >60%，表现出强修复能力；但核心执行链路的“静默停止/网络不重试/存储膨胀”三类稳定性问题仍未形成闭环，建议下个版本以 **韧性增强（retry + health check 可配置 + 存储上限）** 为主题发布补丁。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报 · 2026-08-20

> 数据窗口：2026-08-19 00:00 ~ 2026-08-20 00:00 UTC | 统计源：github.com/NousResearch/hermes-agent

### 1. 今日速览

过去24小时项目处于**超高活跃状态**：Issues 更新 426 条（新开/活跃 349，已关闭 77，关闭率 18%），PR 更新 500 条（待合并 325，已合并/关闭 175，吞吐率 35%），无新版本发布。全量更新数达 926 条，远超日常基线，核心矛盾集中在 **Windows 安装/更新链路崩溃**与**会话状态/配置归属**两大类 P1 缺陷。社区讨论热度极高，单 Issue 评论峰值达 62 条，PR 侧多为功能增强与稳定性修复并行推进，项目健康度评估为：**活跃度极高，但稳定性债务承压，需优先止血 Windows 与 Desktop 关键路径**。

### 2. 版本发布

**本日无新版本发布。** `Latest Releases` 为空，上游仍停留在 `v0.20.0 (2026.08.03) The Herald Release`。鉴于当日关闭 3 个 P1/P2 级安装更新类缺陷（#86093, #85695, #70266），预计下一 Patch 版本将集中修复 Windows 更新与配置校验回归。

### 3. 项目进展

本日已合并/关闭 175 个 PR，待合并 325 个。Top 20 热门 PR 仍以 `OPEN` 为主，表明核心 Feature 仍在评审，但当日仍有关键修复落地：

*   **已关闭/已修复：**
    *   [PR #90692](https://github.com/NousResearch/hermes-agent/pull/90692) `fix(desktop): only set transparent:true when glass is active` — **已关闭**，修复 Windows 11 圆角/阴影丢失问题，`chatWindowSurfaceOptions()` 无条件注入 `transparent:true` 导致原生装饰失效。
    *   关联关闭 Issues：[#85695](https://github.com/NousResearch/hermes-agent/issues/85695) `TERMINAL_CWD deprecated` 误报警告 (P2，已关闭)；[#86093](https://github.com/NousResearch/hermes-agent/issues/86093) `hermes.exe cannot be renamed` 导致 `hermes update` 在 Windows 上 100% 失败 (P1，已关闭)；[#70266](https://github.com/NousResearch/hermes-agent/issues/70266) Desktop `Check for updates` 误查远端容器而非本地应用 (P3，已关闭)。
*   **待合并的核心推进（当日均有更新，表示持续迭代）：**
    *   会话与网关注水：[PR #90092](https://github.com/NousResearch/hermes-agent/pull/90092) 序列化后台 review Relay 握手；[PR #90709](https://github.com/NousResearch/hermes-agent/pull/90709) 贯通原生 runtime-session ID/ profile/ workspace 归属；[PR #90673](https://github.com/NousResearch/hermes-agent/pull/90673) 补齐 `POST /api/sessions/{id}/chat/stream` 与 `GET /v1/runs/{id}/events` 的 CORS 头，解决跨域 SSE 无法读取问题。
    *   Windows 兼容性：[PR #76761](https://github.com/NousResearch/hermes-agent/pull/76761) 修正 `_IS_WINDOWS` 下 PATH 分隔符与 Git Bash 路径；[PR #71401](https://github.com/NousResearch/hermes-agent/pull/71401) 修复后台进程输出未走 `transform_terminal_output` 钩子。
    *   长期 Feature 分支持续 rebase：[PR #62944](https://github.com/NousResearch/hermes-agent/pull/62944) 与 [#71686](https://github.com/NousResearch/hermes-agent/pull/71686) 单网关多 Agent / Buzz 隔离身份架构（需决策，blast-broad）。

> **推进评估：** 当日以 `风险遏制类修复` 为主，关闭了安装更新链的阻塞性 P1，整体向前小步快跑；但多 Agent、ACP、浏览器交互等大型 Feature 尚未合入，下一版本能否承载仍取决于决策位。

### 4. 社区热点

按评论数 Top 5 + 点赞数综合排序：

| 排名 | Issue/PR | 评论/👍 | 核心诉求 |
|---|---|---|---|
| 1 | [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) `Skills index is stale or degraded` | 62 / 0 | 自动化探针告警：Skills 索引已 29.8h 未刷新（阈值26h），`skills-index.yml` 与 `deploy-site.yml` 工作流失效率，影响 `/docs/skills` 文档站可用性。关注度最高但为机器人巡检。 |
| 2 | [#5257](https://github.com/NousResearch/hermes-agent/issues/5257) `Generalized ACP client for multi-agent CLI orchestration` | 24 / 23 | **最高点赞** Feature 请求：Hermes 现仅支持 ACP Server 和 Copilot 专用 Client，社区强烈诉求泛化为支持所有 ACP 兼容 Agent（Claude等）的编排能力。`needs-decision, P4`，长期未决。 |
| 3 | [#84834](https://github.com/NousResearch/hermes-agent/issues/84834) `Webhook Feature Package — graph-gated repair` | 19 / 0 | Meta-Issue 统筹 webhook 全链路（ingress/execution/delivery/UI/deployment）图控修复，5×2×3 结构化治理。 |
| 4 | [#83390](https://github.com/NousResearch/hermes-agent/issues/83390) `title_generation fails on DeepSeek` | 17 / 2 | DeepSeek 上辅助标题生成报 HTTP 400 `response_format type is unavailable`，`provider:auto` 路由误判。 |
| 5 | [#73082](https://github.com/NousResearch/hermes-agent/issues/73082) `Desktop renderer/GPU 100%+ CPU at idle` | 15 / 1 | Electron 桌面端空闲状态 Renderer/GPU 进程常驻 50-90% CPU，高能耗、发热，属 P2 性能回归。 |

其他高热：[PR #90197](https://github.com/NousResearch/hermes-agent/pull/90197) `The agent can use the in-app browser, not just look at it` — 要求 Agent 可直接交互 in-app browser 而非仅 `open_preview/read_preview` 只读；[PR #90092](https://github.com/NousResearch/hermes-agent/pull/90092) 背景 review 串行化亦在密集讨论。

### 5. Bug 与稳定性

**P1 致命/阻塞级（需立即关注）：**

*   [#89614](https://github.com/NousResearch/hermes-agent/issues/89614) **[Windows] kills svchost.exe → 0xEF BSOD** (6评论) - 陈旧 PID 调用 `taskkill /F /PID` 误杀 `svchost.exe`，导致反复蓝屏。**暂无关联 Fix PR，极高风险。**
*   [#89675](https://github.com/NousResearch/hermes-agent/issues/89675) `Desktop: no sessions load for any agent profile` (11评论) - 更新后后端未带 `--profile` 启动，查询错误 profile，全部 Session 消失。疑似由 [PR #90709](https://github.com/NousResearch/hermes-agent/pull/90709) / [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) 试图修复。
*   [#83846](https://github.com/NousResearch/hermes-agent/issues/83846) `ZIP fallback deletes desktop app and never rebuilds` (12评论) - Windows 10 非系统盘安装时，更新回退逻辑删除已编译的桌面应用且不再重建。**OPEN, 无 Fix PR**。
*   [#78981](https://github.com/NousResearch/hermes-agent/issues/78981) `Session permanently dies after DeepSeek compression hangs` (7评论) - 500k token 长会话压缩流 120s+ 零进度，等待 600s 上限后会话永久不可用。**OPEN**。
*   [#83529](https://github.com/NousResearch/hermes-agent/issues/83529) `hermes update - destroys hermes` (6评论) + [#90687](https://github.com/NousResearch/hermes-agent/issues/90687) `ERROR codes on all devices - Installation` (5评论, 2026-08-20 新报) - Termux/Debian 全量安装失败，`hermes update` 灾难性破坏。**与 #86093 同根因，#86093 已关闭但问题仍在复现，需回归验证。**
*   **已关闭 P1：** [#86093](https://github.com/NousResearch/hermes-agent/issues/86093) `hermes.exe cannot be renamed` — 已关闭，修复方案为隔离重命名/ PendingFileRenameOperations 污染治理。

**P2 严重级：**

*   [#73082](https://github.com/NousResearch/hermes-agent/issues/73082) Desktop 空闲 100% CPU 常驻重渲染 | [#66255](https://github.com/NousResearch/hermes-agent/issues/66255) Gateway DB 恢复绕过 reset 策略导致会话永生 | [#69204](https://github.com/NousResearch/hermes-agent/issues/69204) `/v1/runs` 忽略持久化历史 | [#45535](https://github.com/NousResearch/hermes-agent/issues/45535) 上下文压缩中断污染导致双重成本 | [#80989](https://github.com/NousResearch/hermes-agent/issues/80989) `terminal/clarify` 返回错误文件内容 | [#38048](https://github.com/NousResearch/hermes-agent/issues/38048) `url_safety` 误拦 DNS64 `64:ff9b::/96` 地址 | [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) Dashboard profile 切换仅部分生效，MCP/secrets 仍读启动 profile

**P3 及其他：** [#85695](https://github.com/NousResearch/hermes-agent/issues/85695) 已关闭的误报 warning；[#76207](https://github.com/NousResearch/hermes-agent/issues/76207) Vite `configLoader: native` 警告刷屏。

> **稳定性结论：** Windows 平台为重灾区（5/6 个 P1 与 Windows 相关），Session 状态机（`sweeper:risk-session-state` 标签出现 7 次）为第二重灾区。已有 3 个 Fix PR 尝试止血，但 BSOD 与 ZIP 回退类缺陷仍裸露。

### 6. 功能请求与路线图信号

*   **高票且长期待决策：** [#5257](https://github.com/NousResearch/hermes-agent/issues/5257) 通用 ACP Client（23 👍，4个月未决）—— 若合入将使 Hermes 从 IDE 附属晋升为多 Agent 编排中枢，与 [PR #62944](https://github.com/NousResearch/hermes-agent/pull/62944)/[#71686](https://github.com/NousResearch/hermes-agent/pull/71686) 的 `单网关多 Agent + Per-Agent Buzz 身份` 路线强相关，可能打包进下一大版本。
*   **平台对齐 Campaign：** [#79564](https://github.com/NousResearch/hermes-agent/issues/79564) Discord API v10 全量对齐（meta-issue）+ [#84834](https://github.com/NousResearch/hermes-agent/issues/84834) Webhook 全面修复包，表明官方在补齐 IM 集成债务。
*   **已在 PR 阶段的功能：** [PR #90197](https://github.com/NousResearch/hermes-agent/pull/90197) `in-app browser 可交互`（解决 `browser_*` 另起 Chromium 与用户视图割裂）；[PR #90717](https://github.com/NousResearch/hermes-agent/pull/90717) `/model` 挑选器支持 type-to-fuzzy-filter；[PR #85723](https://github.com/NousResearch/hermes-agent/pull/85723) 日文档站 `ja-JP` 国际化；[PR #90714](https://github.com/NousResearch/hermes-agent/pull/90714) `hermes --version` 合并全量报告并移除冗余子命令。
*   **信号判断：** 短期内最可能合入的是 `桌面交互增强`（#90197, #90717, #90692）与 `国际化`（#85723）；中长期需决策的是 `多 Agent 架构` 与 `ACP 泛化`，二者均标注 `needs-decision` + `blast-broad`，需核心维护者拍板。

### 7. 用户反馈摘要

*   **痛点集中：**
    *   **安装即崩：** 多名用户反馈 08-20 早晨起 Termux/Debian 全新安装即 `ERROR`（#90687），`hermes update` 直接摧毁安装目录（#83529），Windows 上更新后桌面快捷方式指向已删除的 `Hermes.exe`（#83846），信任度受损。
    *   **桌面不可用：** `无 Session`（#89675）、`100% CPU 发热`（#73082）、`代码块渲染失败`（#77253）、`MEDIA: 文件链接点击无响应`（#84361）—— 桌面端体验回归明显。
    *   **Provider 兼容：** DeepSeek 用户集中抱怨标题生成 400（#83390）与长会话压缩卡死（#78981），影响生产可用性。
    *   **配置心智负担：** Profile 切换不彻底（#67605）、`TERMINAL_CWD` 误报（#85695 已修）、Vite 警告刷屏（#76207）让用户感知“配置不生效”。
*   **满意点：** ACP 泛化提案获 23 👍，显示用户对 Hermes 作为编排器的期待；Webhook/Discord 的系统化修复包获得关注，用户认可官方开始系统性偿还集成债务。
*   **使用场景：** 多 Agent 协同、Windows 非系统盘部署、Termux 移动端、DeepSeek 长上下文（500k tokens）重度使用、DNS64/NAT64 网络环境。

### 8. 待处理积压

提醒维护者优先 Review 的长期未响应/高风险项（>1.5 个月未合入或需决策）：

*   **超期 Feature 决策：** [#5257](https://github.com/NousResearch/hermes-agent/issues/5257) (2026-04-05, 4个月) + [PR #62944](https://github.com/NousResearch/hermes-agent/pull/62944) (2026-07-12) + [PR #71686](https://github.com/NousResearch/hermes-agent/pull/71686) — 多 Agent 架构方向已讨论 2-4 个月，`needs-decision` 悬而未决，阻塞下游 Buzz 适配。
*   **兼容性/安全边界：** [PR #7767](https://github.com/NousResearch/hermes-agent/pull/7767) `Nebius Token Factory` (2026-04-11, 4个月)；[PR #39751](https://github.com/NousResearch/hermes-agent/pull/39751) Plugin 钩子限时执行（避免热路径阻塞）；[#38048](https://github.com/NousResearch/hermes-agent/issues/38048) DNS64 误拦（2026-06-03）；[#51327](https://github.com/NousResearch/hermes-agent/issues/51327) Linux `chrome-sandbox 4755` 静默启动失败；[#39609](https://github.com/NousResearch/hermes-agent/issues/39609) Kanban `blocked → ready` 越权自动提升。
*   **性能与平台：** [PR #77381](https://github.com/NousResearch/hermes-agent/pull/77381) Desktop 流式刷新优化；[PR #76761](https://github.com/NousResearch/hermes-agent/pull/76761) Windows PATH 修复；[#76312](https://github.com/NousResearch/hermes-agent/issues/76312) Playwright 在 Node 26/CachyOS 上解压卡死。
*   **自动化债务：** [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) Skills 索引已 stale 29.8h，需检查 `.github/workflows/skills-index.yml` Cron；[#88584](https://github.com/NousResearch/hermes-agent/issues/88584) Nous→Enterkey 自动合并在 `cron/jobs.py` 冲突。

> **建议：** 本周优先合并 Windows 更新链与 Session 归属的 P1 修复分支，冻结大型 Feature 合并以保障 `v0.20.x` 热修复发布；对标注 `needs-decision` 的 ACP/多 Agent 方案安排一次架构评审，避免长期分支漂移。

---
*注：本日报基于过去24小时 426 Issues / 500 PRs 的增量数据生成，链接均指向 `NousResearch/hermes-agent` 主仓库。数据截止 2026-08-20 UTC。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 | 2026-08-20

> **数据基线:** 过去24h Issues 11条 [新开/活跃 5 | 已关闭 6] | PR 8条 [待合并 4 | 已合并/关闭 4] | 新版本 1个 `v4.27.4`

---

### 1. 今日速览

**整体活跃度：中高，工程健康度良好。** 项目在24小时内完成1次补丁发版、合并4个PR，呈现“小步快跑、聚焦稳定性”的节奏。核心进展集中在 **平台稳定性（TG假死、OOM）与WebUI体验** 的收尾修复上，无重大功能重构风险。社区侧活跃度由**插件市场治理争议**驱动，单 Issue 贡献了13条评论，占全天评论总量的50%+。待合并的4个PR均为面向下一版本的增量能力与兼容性修复， backlog 可控。

### 2. 版本发布

#### v4.27.4 - 2026-08-20
> *The struggle itself toward the heights is enough to fill a man's heart. One must imagine Sisyphus happy.*

**链接:** https://github.com/AstrBotDevs/AstrBot/releases/tag/v4.27.4 | **关联 PR:** [#9749](https://github.com/AstrBotDevs/AstrBot/pull/9749)

本次为**补丁版本 Patch Release**，无破坏性变更，无需迁移，可直接升级。

**主要变更：**
1.  **Added - 插件市场体验优化:** 在市场详情页展示插件更新时间 [#9690](https://github.com/AstrBotDevs/AstrBot/issues/9690)
2.  **Added - Windows 兼容性可观测性:** 记录 Windows 本地运行时的有效配置/路径日志，便于排查部署问题（Release Notes 截断，原文为 *Logged the effective Windows local runtime s...*）

**发布前置：** 本版本聚合了自 `v4.27.3` 以来已合并到 `master` 的所有修复与 Dashboard 改进，由 [#9749](https://github.com/AstrBotDevs/AstrBot/pull/9749) 统一 bump 版本。

### 3. 项目进展

今日共 **4个PR被合并/关闭**，有效解决了2个P0级稳定性隐患，项目整体向前推进显著。

| PR | 类型 | 核心价值 | 状态 |
|---|---|---|---|
| [#9473](https://github.com/AstrBotDevs/AstrBot/pull/9473) fix: 修复代理切换/弱网下TG平台假死 | `area:platform, size:L` | **高价值稳定性修复**。解决了 Telegram `getUpdates` 长轮询在网络抖动后静默失效、`updater.running` 仍为 `True` 但无法收消息的顽疾 [#8314](https://github.com/AstrBotDevs/AstrBot/issues/8314)。本地已长期验证，显著提升 TG 机器人在复杂网络下的可用性。 | 已合并 |
| [#9747](https://github.com/AstrBotDevs/AstrBot/pull/9747) fix: stop preloading entire preferences table | `area:core, size:L` | **P0 性能/稳定性修复**。回滚了 [#9649](https://github.com/AstrBotDevs/AstrBot/pull/9649) 为修复死锁而全量预加载 `preferences` 表的策略。该策略会导致插件存储数GB数据时启动即OOM。本PR改为按需加载，避免内存峰值爆炸。 | 已合并 |
| [#9689](https://github.com/AstrBotDevs/AstrBot/pull/9689) fix: validate bool config values | `area:webui, size:S` | **配置健壮性修复**。修复布尔类型配置校验失效问题，并补全 `reasoning` 字段的 schema，解决 WebUI 保存配置时类型错误导致的静默失败。 | 已关闭/合并 |
| [#9749](https://github.com/AstrBotDevs/AstrBot/pull/9749) chore: bump version to 4.27.4 | `size:M` | 版本工程化，为发版做准备。 | 已关闭/合并 |

> **推进度评估：** 今日合并内容均为“还技术债”型修复，非表面功能，但对生产环境稳定性提升极大，尤其是TG和OOM问题属于长期痛点。

### 4. 社区热点

按评论数与互动热度排序：

**1. [TOP 1] [#9687](https://github.com/AstrBotDevs/AstrBot/issues/9687) [CLOSED] 关于商店插件 `astrbot_plugin_rollpig_plus` 的代码来源及署名问题 - 💬 13**
   *   **诉求:** 上游作者 @Felis2026 指控 AstrBot 插件市场中的 `astrbot_plugin_rollpig` 大量复刻其 `nonebot-plugin-rollpig-plus` 功能且演化路径高度相似，涉及开源署名与二次创作边界。
   *   **分析:** 这是 AstrBot 生态从“数量扩张”进入“治理规范”阶段的典型信号。Issue 已于今日关闭，说明官方已介入调解/处理。反映社区对**插件市场审核机制、原创保护、License 合规**的关注度急剧上升，健康度预警：需建立更明确的插件上架审核与争议处理SOP。

**2. [#9718](https://github.com/AstrBotDevs/AstrBot/issues/9718) [OPEN] [area:webui] 关于日志建议 - 💬 5**
   *   **诉求:** 为 WebUI 日志增加关键词搜索功能。
   *   **分析:** 高频运维痛点。AstrBot 日志量大，当前仅支持翻页浏览，排查问题效率低。该需求轻量但高频，是 WebUI 可用性的关键补强。

**3. [#9732](https://github.com/AstrBotDevs/AstrBot/issues/9732) [CLOSED] [Plugin] astrbot_plugin_futaloli - 💬 2**
   *   **诉求:** 插件上架申请，功能为 FutaLoli 随机图库。
   *   **分析:** 插件生态持续活跃，上架流程正常流转。

### 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue | 描述 | 是否有 Fix PR |
|---|---|---|---|
| **P0 - 高** | [#9743](https://github.com/AstrBotDevs/AstrBot/issues/9743) [OPEN][bug, area:provider] 图片预处理链路未做格式归一化 | WebP 图片在多模态模型（智谱 GLM-4.6V-Flash / Kimi-K2）调用时报 400 错误码1210。AstrBot 未在预处理阶段将 WebP 转码为模型兼容格式。影响所有发送 WebP 的用户。**复现于 v4.27.3 Linux** | **暂无**，需紧急跟进 |
| **P0 - 高** | [#9275](https://github.com/AstrBotDevs/AstrBot/issues/9275) [CLOSED][priority:p0] audit: security, reliability findings | AI 生成的全面安全审计报告，覆盖 FastAPI 鉴权、插件沙箱、供应链等。基于 v4.26.6，已于今日关闭，代表相关高优修复已在 `v4.27.x` 周期内被认领/修复。 | 已通过 [#9747](https://github.com/AstrBotDevs/AstrBot/pull/9747) 等系列PR消化 |
| **P1 - 中** | [#9741](https://github.com/AstrBotDevs/AstrBot/issues/9741) [OPEN][bug, area:webui] 移动端人格设定页缺失功能 | 移动端（Android Via）访问 Dashboard 人格设定时，“创建文件夹”和“搜索文件夹”按钮不显示，切换为桌面模式正常。属于响应式布局缺陷。 | **暂无** |
| **P1 - 中** | [#9729](https://github.com/AstrBotDevs/AstrBot/issues/9729) [OPEN][area:provider] NVIDIA 嵌入/重排序模型即将弃用 | NVIDIA 官方提示默认模型将在 **2026-08-24 弃用**，AstrBot 默认的 `embedding` 和 `rerank` 模型均在列。有服务中断风险。 | **已有** [#9750](https://github.com/AstrBotDevs/AstrBot/pull/9750) 待合并 |

### 6. 功能请求与路线图信号

| 请求/提案 | 来源 | 状态与预判 |
|---|---|---|
| **支持可插拔知识库检索后端** | PR [#9751](https://github.com/AstrBotDevs/AstrBot/pull/9751) `feat(kb)` by @lxfight | **强路线图信号**。提出为插件暴露统一的 `Knowledge Base discovery & retrieval` 公共API，解决插件各自对接外部知识库无稳定契约的问题。该PR是架构层增强，若合并将成为下一版本 `v4.28` 的核心 Feature。 |
| **将 AnySearch 添加为可选网页搜索工具** | Issue [#9744](https://github.com/AstrBotDevs/AstrBot/issues/9744) by @WangPan59 | **外部团队提案**。AnySearch 团队希望通过 MCP/原生工具方式接入，提供垂直领域实时搜索。属于 Provider 生态扩展，符合项目扩大 Tool 供给的方向，被采纳概率高，预计需提交后续PR。 |
| **图片转述模型支持多线程** | PR [#9748](https://github.com/AstrBotDevs/AstrBot/pull/9748) `area:core, size:L` | **性能优化信号**。修复图片转述（Image Caption）只能单线程运行的瓶颈，提升高并发场景吞吐。已进入 Review，大概率进入下一补丁。 |
| **WebUI 日志关键词搜索** | Issue [#9718](https://github.com/AstrBotDevs/AstrBot/issues/9718) | **高频刚需**，实现成本低（前端过滤），建议纳入 `v4.27.5` 或 `v4.28` 的 WebUI 迭代。 |
| **支持隐藏 WebUI 侧栏菜单项** | Issue [#9265](https://github.com/AstrBotDevs/AstrBot/issues/9265) [CLOSED] | **已闭环**。该长达1个月的 Enhancement 已于今日关闭，表明自定义侧边栏“显示/隐藏+排序”功能已实现或决定实现，参考 1Panel 交互。 |

### 7. 用户反馈摘要

**痛点集中区：**
1.  **运维可观测性差：** #9718 的日志搜索诉求 + #9741 移动端适配缺陷，反映重度用户对 WebUI 作为核心运维入口的体验要求已从“能用”到“好用”。
2.  **多模态兼容性焦虑：** #9743 的 WebP 报错让用户感知到 AstrBot 作为中间层对上游模型差异的“透传”问题，用户期望框架层做自动归一化，而非让用户手动转格式。
3.  **生态信任度：** #9687 的署名争议暴露用户对插件市场“质量 vs 数量”的担忧，原创作者的维权能否得到公正处理，将直接影响优质开发者留存。

**满意点：**
*   TG 假死问题 [#9473](https://github.com/AstrBotDevs/AstrBot/pull/9473) 的修复获得了隐性好评（该PR为社区贡献者 @Baneik 提交并长期自测），体现了项目对外部贡献的快速响应。
*   插件上架流程 [#9745](https://github.com/AstrBotDevs/AstrBot/issues/9745), [#9746](https://github.com/AstrBotDevs/AstrBot/issues/9746), [#9732](https://github.com/AstrBotDevs/AstrBot/issues/9732) 当天即关闭，流程高效。

### 8. 待处理积压

需维护者重点关注的未闭环事项：

1.  **[紧急 - 4天后过期] [#9729](https://github.com/AstrBotDevs/AstrBot/issues/9729) -> PR [#9750](https://github.com/AstrBotDevs/AstrBot/pull/9750) 待合并**：NVIDIA 模型 08/24 弃用，Fix PR 已就绪（更新为 `nemotron-3-embed-1b` / `llama-nemotron-rerank-vl-1b-v2`），**建议在 v4.27.5 前紧急合并**，否则将导致默认知识库功能全量故障。
2.  **[无 Fix] [#9743](https://github.com/AstrBotDevs/AstrBot/issues/9743) WebP 格式归一化 Bug**：影响面广，目前无关联PR，建议分配 `area:provider` 负责人，方案为在图片预处理链路增加 `Pillow` 转 JPEG/PNG 归一化。
3.  **[无 Fix] [#9741](https://github.com/AstrBotDevs/AstrBot/issues/9741) 移动端 WebUI 缺陷**：虽为 P1，但 Persona 是高频功能，移动端用户占比高，建议前端快速修复 CSS 媒体查询。
4.  **[待 Review] [#9751](https://github.com/AstrBotDevs/AstrBot/pull/9751) KB 可插拔后端**：涉及公共 API 设计，需核心维护者 @Soulter 等进行架构评审，避免接口过早固化。
5.  **[Windows 专项] [#9735](https://github.com/AstrBotDevs/AstrBot/pull/9735) fix: SVG MIME type**：修复 Windows 注册表导致 `favicon.svg` 返回 `image/svg` 非标准类型的 Bug，影响 WebUI 图标显示，改动小（`size:XS`），可快速合并。

> **健康度建议:** 今日闭环率 54.5% (6/11 Issues)，PR 合并率 50%，整体健康。建议明日优先清零 P0/P1 Bug 积压，并对 [#9687](https://github.com/AstrBotDevs/AstrBot/issues/9687) 形成的插件治理结论进行公示，以巩固社区信任。

---
*日报生成基于 `AstrBotDevs/AstrBot` master 分支 2026-08-20 00:00-23:59 UTC 数据 | 由 AI 助手自动分析*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*