# OpenClaw 生态日报 2026-08-21

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-20 22:15 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 · 2026-08-21

### 1. 今日速览

过去 24 小时 OpenClaw 保持极高活跃度：**500 条 Issues 更新（458 活跃 / 42 关闭）+ 500 条 PR 更新（331 待合并 / 169 已合并或关闭）**，无新版本发布。核心焦点仍在 `v2026.8.1-beta.2` 的 Release Validation 与稳定性收敛上。热点议题呈现 **性能/稳定性 > 功能需求** 的特征：Gateway 事件循环阻塞、SQLite 持久化、成本与会话状态等基础设施类问题占据评论榜 Top 10 的 70%。整体健康度：**开发吞吐量极高，但 P0/P1 级回归与数据一致性问题积压明显，短期进入稳定性修复窗口。**

---

### 2. 版本发布

**本日无新版本发布（0 个 Release）**

当前验证版本为 `v2026.8.1-beta.2`，见跟踪贴：
- [#125626 Release validation: v2026.8.1-beta.2](https://github.com/openclaw/openclaw/issues/125626) — 17 评论，维护者主导，需在真实 Gateway 上完成升级与用例验证，仍在收集中。

> 提示：官方文档已超前于已发布版本（[#48920 Live Docs are ahead of release](https://github.com/openclaw/openclaw/issues/48920)），使用 `IsolatedSessions` 等新配置时请以对应 Beta 分支为准。

### 3. 项目进展

今日 169 个 PR 以合并/关闭方式推进，**无破坏性变更合并，以缺陷修复与兼容性加固为主**。 showcase 已关闭的重要 PR：

| PR | 类型 | 关键推进 |
|---|---|---|
| [#126590 fix(channels): keep started ingress deliveries admissible](https://github.com/openclaw/openclaw/pull/126590) [CLOSED] | P1 · message-delivery | 修复 `2026.8.1-beta.2` 全量 LINE 入站消息被 `GatewayDrainingError` 误拒（10-18ms 内拒绝）的致命回归，网关自检健康但无法接收消息 |
| [#125471 fix(models): keep Claude CLI OAuth available](https://github.com/openclaw/openclaw/pull/125471) [CLOSED] | P2 · auth-provider | 修复 Gateway 重启后因遗留 `auth.profiles["anthropic:claude-cli"]` 中 `provider/mode` 不一致导致 Claude CLI OAuth 刷新权丢失、并发布矛盾空行的 Control UI 问题 |
| [#126857 fix(firecrawl): canceled searches reuse stale results](https://github.com/openclaw/openclaw/pull/126857) [CLOSED] | extensions: firecrawl | 修复取消 Firecrawl 搜索后仍消费迟到响应导致结果串扰 |
| [#116489 feat(security): require acknowledgement for install policy warnings](https://github.com/openclaw/openclaw/pull/116489) [CLOSED] | P2 · security-boundary | 新增 `security.installPolicy -> warn` 状态，CLI/Control UI 安装可疑插件/技能时需显式确认目标名，强化供应链安全 |
| [#120900 feat(ui): review install policy warnings](https://github.com/openclaw/openclaw/pull/120900) [CLOSED] | P2 · security-boundary | 上述能力在 Control UI 的配套实现，`plugins.install` 新增 `acknowledgeInstallPolicyWarning: true` |

> 整体评估：项目未向前发布大功能版本，但**完成了消息投递可用性与认证链路的两个阻断性修复**，为 Beta.2 转正扫清关键障碍。

### 4. 社区热点

按过去 24h 评论数排序，Top 10 热点：

1.  **[Feature] Per-agent cost budget enforcement at gateway [#42475](https://github.com/openclaw/openclaw/issues/42475)** · 23 评论 · 👍1 · 诉求：在 Gateway 层实现按 Agent 的日/月费用硬限，防止模型调用失控。标签 `clawsweeper:linked-pr-open`，已有关联 PR，需产品决策。
2.  **Release validation: v2026.8.1-beta.2 [#125626](https://github.com/openclaw/openclaw/issues/125626)** · 17 评论 · 维护者验证总线， бета 质量门控。
3.  **[Bug] Large SQLite transcript cleanup blocks gateway event loop [#112423](https://github.com/openclaw/openclaw/issues/112423)** · 16 评论 · P1 · `🦞 diamond lobster` · 归档大 SQLite 会话在 Gateway 主线程做全量物化/压缩/落盘，导致事件循环长时间阻塞。
4.  **[Bug] gateway fails to start 2026.7.1 [#108435](https://github.com/openclaw/openclaw/issues/108435)** · 14 评论 · P0 · regression · systemd/ollama/手动启动均失败，长期未闭环。
5.  **[Bug] Cannot convert undefined or null to object w/ google-vertex/gemini-3.1 [#38327](https://github.com/openclaw/openclaw/issues/38327)** · 14 评论 · P1 · regression · 2026.3.2 后 Vertex 模型全失败，已有 3 次点赞关注度高。
6.  **${XDG_CONFIG_HOME} not process when installing a skill [#53628](https://github.com/openclaw/openclaw/issues/53628)** · 13 评论 · Docker 环境下 ClawHub 技能安装未展开环境变量。
7.  **SQLite snapshot restore lacks crash guarantees [#113306](https://github.com/openclaw/openclaw/issues/113306)** · 12 评论 · P1 · data-loss · 快照创建/恢复成功误报，父目录未持久化、identity guard 缺失。
8.  **DeepSeek V4 Flash incomplete turn [#88657](https://github.com/openclaw/openclaw/issues/88657)** · 11 评论 · OpenRouter 通道下 `payloads=0, tools=2` 不完整轮次，自 2026.5.27 回归。
9.  **Reliability: active-memory blocks replies [#72015](https://github.com/openclaw/openclaw/issues/72015)** · 11 评论 · P1 · multi-agent 网关下 `active-memory` 插件阻塞回复 + QMD 冷启动过载。
10. **Live Docs ahead of release [#48920](https://github.com/openclaw/openclaw/issues/48920)** · 10 评论 · P0 · 文档与发布版本脱节引发配置不可用。

**信号：** 成本治理、SQLite/事件循环、模型提供商兼容性是当前社区最强的三类共识诉求。

### 5. Bug 与稳定性

按严重度分级，今日最受关注的活跃缺陷：

**P0 · 阻断 / 数据丢失 / 崩溃循环**
* [#108435 gateway fails to start w/ error](https://github.com/openclaw/openclaw/issues/108435) | regression, crash-loop | 2026.7.1 回归，无 Fix PR
* [#119270 file tools strip leading @](https://github.com/openclaw/openclaw/issues/119270) | data-loss | `write/edit/apply_patch` 静默写错文件，已有 `linked-pr-open`
* [#124788 event loop blocks ~100s every ~10 min](https://github.com/openclaw/openclaw/issues/124788) | crash-loop, data-loss | Beta.2 锚定定时器 + 字符串构建 + FS 扫描导致 ~100s 阻塞，禁用 memory 插件仍复现，无 Fix PR
* [#125333 totalTokens inflation still reproduces](https://github.com/openclaw/openclaw/issues/125333) | data-loss | #123065 仅修复 `api==="cli"` 分支，memory-flush 路径仍无保护，无 Fix PR

**P1 · 高优 · 消息丢失 / 会话状态损坏**
* [#112423 Large SQLite transcript cleanup blocks event loop](https://github.com/openclaw/openclaw/issues/112423) | session-state | 无 Fix PR
* [#113306 SQLite snapshot restore lacks guarantees](https://github.com/openclaw/openclaw/issues/113306) | data-loss | 需持久化与清理路径重构
* [#114234 Usage-cost refresh lock never releasable](https://github.com/openclaw/openclaw/issues/114234) | 容器 PID 复用导致锁永久冻结缓存 | `linked-pr-open`
* [#124284 Subagent spawn fails with vLLM + thinking](https://github.com/openclaw/openclaw/issues/124284) | Beta.2 新增 `wrapStreamFnWithProviderPromptState` 与 vLLM `openai-completions` 冲突，畸形 XML 工具调用 | 无 Fix PR
* [#119087 Gateway cold start regressed ~2.5x](https://github.com/openclaw/openclaw/issues/119087) | 1-vCPU 容器 `http server listening` 耗时 2.5 倍 | `linked-pr-open`
* [#95553 preflight compaction hard-capped at ~60s](https://github.com/openclaw/openclaw/issues/95553) | 忽略 `compaction.timeoutSeconds` | `fix-shape-clear, queueable-fix`
* [#126246 Telegram durable outbound stuck in send_attempt_started](https://github.com/openclaw/openclaw/issues/126246) | message-loss | 重启后丢失，无 Fix PR
* [#97616 leaks unreaped hook/tool child processes](https://github.com/openclaw/openclaw/issues/97616) | zombie 累积导致性能退化 | 无 Fix PR
* [#125431 Codex restricted tool policy disables AGENTS.md](https://github.com/openclaw/openclaw/issues/125431) | security, session-state | 需安全评审 | `current-main-repro`
* [#118839 restart recovery claim changed before adoption](https://github.com/openclaw/openclaw/issues/118839) | regression | Beta.7 仍复现 Beta.3 已修复问题

**已进入 PR 修复通道（值得关注）**
* HTTP Chat 体系 3 连修均在 `needs proof`：[#126619 minimal tools.profile 仍发全量 system prompt](https://github.com/openclaw/openclaw/pull/126619), [#126616 constant OpenAI user 导致单会话无限膨胀](https://github.com/openclaw/openclaw/pull/126616), [#126611 custom reasoning models 截断 tool-call JSON](https://github.com/openclaw/openclaw/pull/126611)
* 通道与会话修复：[#126590 LINE draining 误拒](https://github.com/openclaw/openclaw/pull/126590) 已关闭, [#126818 answer over-limit webhooks](https://github.com/openclaw/openclaw/pull/126818), [#126860 deliver current-session completions to source chat](https://github.com/openclaw/openclaw/pull/126860), [#126858 compaction guard blocks decimal numbers](https://github.com/openclaw/openclaw/pull/126858)

### 6. 功能请求与路线图信号

| 需求 | 来源 | 可能落位 |
|---|---|---|
| **Per-agent cost budget (gateway 强制)** | [#42475](https://github.com/openclaw/openclaw/issues/42475) | 高概率进入下一小版本，`session-cost-usage.ts` 基础已有，`linked-pr-open` 待产品决策 |
| **Provider fallback by failure class** | [#47910](https://github.com/openclaw/openclaw/issues/47910) | 区分 auth-broken / rate-limit / network 进行隔离，避免无效重试，已进入 P2 队列 |
| **Visible agent-to-agent messaging (ACP)** | [#50798](https://github.com/openclaw/openclaw/issues/50798) | 协调器向 ACP 线程可见投递且不污染 `agent:main:*`，架构层面待定 |
| **Discord messageUpdate/messageDelete** | [#53654](https://github.com/openclaw/openclaw/issues/53654) | 编辑重算/删除取消，已有 3 点赞，或纳入通道增强批次 |
| **Control UI upload size 可配置 (5MB 硬编码)** | [#71142](https://github.com/openclaw/openclaw/issues/71142) | 已有多个关联讨论，UI 团队活跃 |
| **HTTP /v1/chat/completions 轻量上下文 (voice mode)** | [#68920](https://github.com/openclaw/openclaw/issues/68920) | 10-15s TTFB 投诉，直接驱动 [#126619](https://github.com/openclaw/openclaw/pull/126619) 等修复，下版本必含 |
| **Reasoning stream 覆盖写** | [#42276](https://github.com/openclaw/openclaw/issues/42276) | 体验类，增强思考过程可见性 |

> 结合已开 PR 判断：**成本限额、Provider 故障分级、HTTP 轻量上下文**三项最可能随 `2026.8.1` 正式版或紧随的 `2026.8.2` 落地。

### 7. 用户反馈摘要

**痛点集中：**
* **运行稳定性差**：多处反馈 Gateway 在容器/Windows/Docker 场景下重启循环、僵尸子进程堆积（[#97616](https://github.com/openclaw/openclaw/issues/97616)）、Windows 上 `node.exe` 残留（[#74378](https://github.com/openclaw/openclaw/issues/74378)）。
* **性能不可预测**：大会话归档、冷启动 2.5 倍退化、每 10 分钟 100s 阻塞，导致 WebSocket/HTTP `/ready`/cron 全停，运维可观测性不足。
* **模型兼容性断裂**：Vertex/Gemini 3.1、DeepSeek V4 Flash、vLLM + thinking、Claude CLI 限流未触发 fallback（[#118793](https://github.com/openclaw/openclaw/issues/118793)）等，升级即回归感知强。
* **配置与文档不一致**：`IsolatedSessions`、`workspace:*` 与 pnpm（[#123073](https://github.com/openclaw/openclaw/issues/123073)）、`XDG_CONFIG_HOME` 未展开等，本地化/容器化部署摩擦大。
* **消息可靠性**：Telegram/ LINE/ WebChat 场景下消息丢失、重复投递（[#72176](https://github.com/openclaw/openclaw/issues/72176)）、子代理重复播报（[#80498](https://github.com/openclaw/openclaw/issues/80498)）。

**满意点：** 安全加固类 PR（安装策略确认）与 Control UI 细节优化获得正向关注；HTTP 轻量化、会话/通道修复的快速响应被视为积极信号。

**典型使用场景：** 多 Agent 网关 + Telegram/Discord/WebChat + 私有模型（vLLM/OpenRouter/Vertex） 的中小团队自托管，成本与稳定性是核心诉求。

### 8. 待处理积压

维护者需重点关注的长期未闭环/高影响项（创建 > 4 个月且仍 OPEN，P0-P1）：

* [#42475 Per-agent cost budget](https://github.com/openclaw/openclaw/issues/42475) | 2026-03-10 | P2 | 23 评论 · 需求明确、PR 已关联但卡在 `needs-product-decision` 超 5 个月
* [#38327 google-vertex/gemini 崩溃](https://github.com/openclaw/openclaw/issues/38327) | 2026-03-06 | P1 regression | 14 评论 · 影响 Vertex 用户全链路
* [#48920 Live Docs ahead of release](https://github.com/openclaw/openclaw/issues/48920) | 2026-03-17 | P0 | 文档发布流程需对齐
* [#53628 XDG_CONFIG_HOME](https://github.com/openclaw/openclaw/issues/53628) | 2026-03-24 | P3 | Docker 用户持续受影响
* [#50291 Plugin Hooks missing trace context](https://github.com/openclaw/openclaw/issues/50291) | 2026-03-19 | P2 | 可观测性缺口，10 评论，`stale`
* [#108435 gateway fails to start 2026.7.1](https://github.com/openclaw/openclaw/issues/108435) | 2026-07-15 | P0 · `maturity:stable` | 回归且 `ux-release-blocker`
* [#117504 fix(bedrock): honor custom embedding endpoints](https://github.com/openclaw/openclaw/pull/117504) | P1 | 2026-08-01 起 `waiting on author`，涉及 VPC/代理与向量索引兼容

**待合并 PR 积压提醒：** `331 个待合并 PR` 中，`waiting on author` / `needs proof` 状态占主导，建议优先评审已具备 `sufficient proof` 的通道路由与 compaction 类修复（如 [#126818](https://github.com/openclaw/openclaw/pull/126818), [#126590](https://github.com/openclaw/openclaw/pull/126590) 已闭环可作为模板）。

---
*数据来源：github.com/openclaw/openclaw · 统计窗口 2026-08-20 00:00 - 08-21 00:00 UTC · 仅展示评论数 Top 50 Issues / Top 30 PRs 样本，完整列表请查看仓库 Insights。*

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态 横向对比分析报告
**2026-08-21 动态综合研判**

### 1. 生态全景

个人 AI 助手开源生态已进入 **“分化与收敛并行”** 阶段：头部项目 OpenClaw、Hermes-agent 以 400+ Issues/PR 的超高吞吐进入质量攻坚期，核心矛盾从功能扩张转向稳定性、性能与成本可控性；腰部项目 QwenPaw 保持 Beta 快速迭代，Zeroclaw 陷入 RFC 架构决策拥塞，AstrBot 进入小步快跑的债务收敛期，PicoClaw 则显露维护停滞。共性上，**网关可靠性、模型路由/成本治理、长会话记忆与存储** 成为全生态共同瓶颈，生态竞争焦点正从“能接多少模型/渠道”转向“能否长期稳定、低成本、可观测地运行”。

### 2. 各项目活跃度对比

| 项目 | Issues (24h) | PR (24h) | Release | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 (458 活跃 / 42 关闭) | 500 (331 待合并 / 169 已合/关) | 0，无新版，验证 `v2026.8.1-beta.2` | **稳定性收敛期**。吞吐量生态第一，但 P0/P1 回归与数据一致性积压严重，已阻塞转正 |
| **Hermes-agent** | 423 (340 活跃 / 83 关闭) | 500 (413 待合并 / 87 已合/关) | 0，停留 `v0.20.0` | **高风险修复期**。吞吐与 OpenClaw 齐平，但安装/更新/会话三主链路系统性崩坏，急需热修复冻结功能 |
| **QwenPaw** | 27 (14 活跃 / 13 关闭) | 50 (21 待合并 / 29 已合/关) | **1个** `v2.1.1-beta.1` | **健康快迭代**。关闭率48% 合并率58%，小版本持续交付，债务可控 |
| **Zeroclaw** | 50 (45 活跃 / 5 关闭) | 50 (45 待合并 / 5 已合/关) | 0，处于 v0.9.0 前 | **架构拥塞期**。合入率仅10%，热点全为 `risk:high` RFC，交付受制维护者评审队列 |
| **AstrBot** | 7 (3 活跃 / 4 关闭) | 6 (4 待合并 / 2 已合/关) | 0，最新 `v4.27.3` | **债务收敛期**。中高活跃但体量小，2个核心修复合入，插件与治理闭环 |
| **PicoClaw** | 3 (均为 stale) | 8 (0 合并 / 3 关闭未合) | 0，停留 `v0.3.1` | **维护停滞**。零实质合入，5个 Dependabot 堆积，前端构建已阻塞 |

> 活跃度分层：T0(400+): OpenClaw/Hermes > T1(50+): QwenPaw/Zeroclaw > T2(<15): AstrBot/PicoClaw

### 3. OpenClaw 在生态中的定位

**规模对比：** OpenClaw 与 Hermes 并列为生态唯二日更 500+ PR/Issues 的超大型项目，社区体量是 QwenPaw/Zeroclaw 的 10倍，是 AstrBot 的 35倍，PicoClaw 的 60倍以上。是事实上的社区活跃度标杆。

**优势：**
1.  **工程吞吐与平台完整度最高**：Gateway + Control UI + 多通道(Telegram/LINE/Discord/WebChat)全链路闭环，对比 Zeroclaw仍在讨论 `Runtime-owned sessions`、PicoClaw Web UI 卡顿未解，OpenClaw已完成可用性阻断修复`#126590`。
2.  **直面企业级痛点**：唯一将 `Per-agent cost budget`、`Provider fallback by failure class`、`SQLite 持久化/快照一致性` 作为 P0/P1 系统性治理的项目，契合中小团队自托管的核心诉求。
3.  **快速缺陷收敛能力**：Beta.2 周期内完成消息投递、Claude OAuth、Firecrawl 三大阻断修复，响应速度优于 Hermes 的 `413 PR待合`积压。

**技术路线差异：**
*   **OpenClaw (TS/Node Gateway中心化)**：以事件循环网关为核心，强会话状态与通道适配，问题集中在事件循环阻塞、SQLite 性能，路线是“重网关、重状态”。
*   **Zeroclaw (Rust/Core瘦身+WASM插件化)**：主张核心瘦身、外移集成，通过 `#6165` 轻量核心、`#10146` 插件化 Channel，路线是“轻内核、运行时自治”。
*   **QwenPaw (Python/Agent工作台)**：聚焦长周期任务编排与产物沉淀，`PowerContext` 记忆后端、Workspace Skills 常驻，路线是“重记忆、重协作”。
*   **Hermes (TS/Electron多端协同)**：Desktop + Gateway + CLI 三端联动，问题在 `state.db` 腐蚀、跨平台安装，路线是“重桌面、重分发”。
*   **AstrBot (Python/插件生态)**：以 OneBot/Telegram 为主的轻量 Bot 框架，通过可插拔知识库`#9751`扩展为 Agent 底座。

### 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求与信号 |
| :--- | :--- | :--- |
| **成本可控与智能路由** | OpenClaw, QwenPaw, Hermes | OpenClaw `#42475` Gateway层按Agent日/月硬限额；QwenPaw `#6436` 按消息类型自动路由小/大/视觉模型；Hermes `#90285` /goal token预算。全生态从“无限制调用”转向“可预算” |
| **Provider 兼容与故障隔离** | OpenClaw, Zeroclaw, PicoClaw, QwenPaw, Hermes, AstrBot | OpenClaw Vertex Gemini全失败`#38327`/vLLM冲突`#124284`；Zeroclaw新增 Grok ACP `#9104`；PicoClaw 诉求 `anthropic-messages`原生协议`#1158`；QwenPaw `httpx.ReadError`不重试`#7162`；Hermes `prompt_caching`切片溢出`#90972`；AstrBot NVIDIA Embedding弃用`#9729`。诉求：按`auth-broken/ratelimit/network`分级 fallback |
| **网关/长会话稳定性** | OpenClaw, Hermes, QwenPaw, PicoClaw, AstrBot | OpenClaw SQLite归档阻塞事件循环100s`#124788`；Hermes `state.db` WAL并发损坏`#90950`、SIGTERM超时`#64155`；QwenPaw `history.db` 7.6G撑爆`#7168`、冻结10min`#7102`；PicoClaw Web输入卡顿`#3281`；AstrBot TG长轮询假死`#9473` |
| **通道可靠性** | OpenClaw, Zeroclaw, Hermes, AstrBot | OpenClaw LINE误拒`#126590`/Telegram丢消息；Zeroclaw Matrix单消息草稿`#8443`；Hermes Webhook史诗重构`#84834`；AstrBot TG假死已修复 |
| **安全与供应链治理** | OpenClaw, Zeroclaw, QwenPaw, Hermes | OpenClaw 安装策略`warn`需显式确认`#116489`；Zeroclaw Git shell硬化`#9678`+SSRF NAT64`#10072`；QwenPaw `master key 0o600`；Hermes治理内核`#91111` |
| **记忆与会话生命周期** | OpenClaw, Zeroclaw, QwenPaw | OpenClaw `active-memory`阻塞回复；Zeroclaw `#9487`运行时持有会话、`#6850`解耦Memory存储与策略；QwenPaw `PowerContext`长期记忆+跨会话回忆开关 |

### 5. 差异化定位分析

| 维度 | OpenClaw | Zeroclaw | QwenPaw | Hermes-agent | AstrBot | PicoClaw |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **功能侧重** | 企业级网关治理+成本 | 运行时与插件架构 | 长任务记忆+产物管理+Console | 多端协同与桌面体验 | 轻量IM机器人+插件市场 | 端侧/硬件轻量助手 |
| **目标用户** | 中小团队自托管(多Agent+私有模型) | 基础设施开发者/集成方 | 技术用户长周期编排 | 全平台C端/团队用户 | 社区/个人Bot运维者 | 开发者/极客尝鲜 |
| **技术架构** | 中心化Gateway+SQLite持久化 | Rust核心+WASM插件+ACP | Python Agent+可插拔Memory/Hub多用户 | Electron Desktop + Gateway + Cloud | Python FastAPI + Vue WebUI + 插件沙箱 | Go + Web Frontend |

### 6. 社区热度与成熟度

*   **第一梯队：质量巩固期 (OpenClaw, Hermes)**：日更400+ 动态，但新增功能冻结。OpenClaw聚焦 `Beta.2 -> stable` 的回归清零；Hermes 需冻结功能发布 `v0.20.1` 热修复。特征：**吞吐极高、债务极重**。
*   **第二梯队：快速迭代期 (QwenPaw)**：日更约50+且合并率>50%，`v2.1.1-beta.1`当天发布+验证，属 **健康扩张**。特征：**小步快跑、体验驱动**。
*   **第三梯队：架构决策期 (Zeroclaw)**：高讨论(22评论/RFC)低合入(10%)，大量 `needs-maintainer-review`。处于 v0.9.0 前的战略收敛，特征：**重设计、慢交付**。
*   **第四梯队：生态深耕期 (AstrBot)**：中低活跃但治理有效，插件市场争议`#9687`凸显生态成熟度拐点。特征：**稳中有进**。
*   **第五梯队：维护/衰退期 (PicoClaw)**：连续多日0合入，核心PR `WIP多智能体框架#423`关闭未合，前端构建阻塞。特征：**需注入维护带宽**。

### 7. 值得关注的趋势信号

1.  **从“模型接入”到“模型经营”**：成本预算、按故障分级的Provider Fallback、模型动态调度(Routing)已成为 OpenClaw/QwenPaw/Hermes共同高优需求。**对开发者启示**：单纯接入更多模型不再是壁垒，提供 `可审计、可限额、可降级` 的模型运营层是下一代 Agent 网关的必备能力。
2.  **网关稳定性成为分水岭**：事件循环阻塞、DB膨胀、僵尸进程、WAL损坏等问题在3个以上项目集中爆发。**参考价值**：Agent 从“玩具”进入“7x24自托管”阶段，**可观测性(日志检索/截断可见性)+优雅启停+持久化一致性** 将决定项目能否用于生产，QwenPaw `#7135` 原子写入与 OpenClaw 的 `compaction guard` 是正向范本。
3.  **插件化与协议标准化加速**：Zeroclaw WASM插件化`#10146`、AstrBot可插拔知识库`#9751`、Hermes通用ACP客户端`#5257`(23赞) 均指向 **“宿主轻量+能力外置”**。**参考价值**：避免核心膨胀，定义稳定的 Tool/Channel/Memory 契约比堆功能更重要。
4.  **长记忆与多用户是下一站**：QwenPaw的 Hub多用户`#7112`、Workspace Skills常驻、Zeroclaw内存生命周期解耦，均预示个人助手正向 **团队化、长周期记忆化** 演进。短期机会在 `可配置的上下文压缩/截断策略` (Zeroclaw `#10114-10116` 教训深刻)。
5.  **供应链与桌面安全提级**：安装策略确认、Git Shell硬化、Master Key权限等安全PR获优先合并。**参考价值**：随着插件市场抄袭争议`#9687`，**版权溯源+安装前二次确认** 将成为市场类项目合规底线。

> **给技术决策者的建议**：若选型自托管网关，现阶段 **OpenClaw 适合追求多通道+成本治理且能容忍 Beta 波动的团队；QwenPaw 适合长任务/产物沉淀场景；Zeroclaw 适合愿意共建 Rust/WASM 架构的基建团队**；短期内规避对 PicoClaw 的重投入，并对 Hermes 的 Windows/Desktop 更新保持观望至热修复发布。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 | 2026-08-21

> 数据窗口：2026-08-20 00:00 - 23:59 UTC | 统计分支：`master` @ `979c0430b`

### 1. 今日速览

过去 24 小时项目呈现 **“高讨论、低合入”** 的典型 RFC 密集期特征：Issues 更新 50 条（活跃 45 / 关闭 5）、PR 更新 50 条（待合并 45 / 已合并或关闭 5）、无新版本发布。核心热点全部集中在架构类 RFC 与安全/运行时重构上，评论数 Top 5 的 Issue 均为 `risk:high` 且 `needs-maintainer-review`。合入率仅 10%，叠加大量 `status:accepted` 但长期未落地的 Tracker，表明项目处于 **架构决策拥塞期**，工程落地速度明显受制于维护者评审队列。整体健康度：社区活跃度极高，但交付吞吐偏低，需关注决策瓶颈。

### 2. 版本发布

**本期无新版本发布。** 最新 Release 列表为空，`master` 持续处于 v0.9.0 前的 RFC 收敛阶段。

### 3. 项目进展

今日 5 条 PR 关闭/合并，实际有效合入仅 1 个功能特性，其余为替代/废弃，项目向前推进有限：

*   **已合并 `feat(providers): add Grok Build ACP model provider` [#9104](https://github.com/zeroclaw-labs/zeroclaw/pull/9104)** | `risk:medium` `size:L`
    > 唯一实质性功能合入。新增 `grok_cli` Provider 家族，通过 `grok agent stdio` ACP JSON-RPC 与 Grok Build 通信，Prompt 仅走 stdin 不落地 argv。标志着 ZeroClaw 多模型路由能力扩展至 xAI 生态，对 `provider:router` 有直接增强。合并于 `2026-08-20T21:24:22Z`，但随即触发 Bug [#10194](https://github.com/zeroclaw-labs/zeroclaw/issues/10194) - AI Reviewer 在 PR 合并后仍发布评论，暴露 CI 时序竞态。

*   **已关闭 `fix(zerocode): make theme presets package-local` [#10148](https://github.com/zeroclaw-labs/zeroclaw/pull/10148)** | `release-gate` `size:L`
    > 将 TUI 主题表生成从 `build.rs` 迁移至 `xtask`，并提交至 `apps/zerocode` 内，解决独立编译包无法读取 crate 外文件的问题。为 ZeroCode 独立分发扫清构建障碍，已关闭。

*   **已关闭 `chore(deps): bump the rust-all group with 46 updates` [#10182](https://github.com/zeroclaw-labs/zeroclaw/pull/10182)** -> 被替代
    > 被同日新开的 [#10196](https://github.com/zeroclaw-labs/zeroclaw/pull/10196)（47 项更新，含 `tokio 1.52.3`, `clap 4.6.6`）替代关闭，属于常规依赖滚动，无功能影响。

*   **已关闭 `feat(plugins): validate typed instance config` [#9126](https://github.com/zeroclaw-labs/zeroclaw/pull/9126)** | `do-not-merge` `size:XL`
    > 要求 `config_read` 清单声明闭合的 Draft 2020-12 `config_schema` 并做强校验。该 PR 标记为 `do-not-merge`，关闭原因为已被拆解重切至 [#10146](https://github.com/zeroclaw-labs/zeroclaw/pull/10146) 落地，并非废弃。

*   **已关闭 `feat(matrix): add single-message progress drafts` [#8443](https://github.com/zeroclaw-labs/zeroclaw/pull/8443)** | `risk:high` `size:XL`
    > 为 Matrix 通道增加 `stream_mode = "single_message"`，每轮 turn 仅维护一条可编辑进度草稿 + 一条最终消息。PR 自 6/28 挂起后于今日关闭，未合入 master，功能暂缓。

**评估：** 今日无核心 Bug 修复合入，交付主要为提供商扩展与构建治理，WASM 插件化、SSRF 加固等高优先级栈（[#10146](https://github.com/zeroclaw-labs/zeroclaw/pull/10146), [#10072](https://github.com/zeroclaw-labs/zeroclaw/pull/10072)）仍处于 `needs-author-action` 等待状态。

### 4. 社区热点

按评论数排序，今日最活跃的 7 个 RFC/Tracker 占据 50% 讨论量，核心诉求是 **“解耦、瘦身、运行时自治”**：

1.  **22 评论 - [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) RFC: Runtime-owned conversation sessions and transport surface adapters** `risk:high`
    > 提出所有入口提交 `InboundAction`、运行时持有会话与准入持久化的架构边界。Revision 2 刚于 8/3 确权，是当前所有 Channel/Gateway 重构的总纲，讨论焦点在 durable admission 语义。

2.  **18 评论 - [#6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) RFC: Prefer a lighter ZeroClaw core through external integrations** `status:accepted` `risk:high`
    > 4/27 提出的老牌 RFC，主张将长尾集成移出核心，通过外部集成瘦身。今日仍有更新，反映社区对核心配置膨胀、安全面扩大的普遍担忧。

3.  **16 评论 - [#10118](https://github.com/zeroclaw-labs/zeroclaw/issues/10118) [Tracker]: Rust anti-slop policy debt remediation** `status:in-progress`
    > 在 `979c0430b` 扫描出 307 个违规候选（1,078 个 Rust 文件中 202 个生产 panic），启动分阶段清理。今日讨论最热的执行类 Tracker。

4.  **14 评论 - [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) RFC: Decouple memory lifecycle policy from storage backends**
    > 要求将 `Memory` trait 的存储职责与 Consolidation/Governance 等生命周期策略解耦，避免各 gateway 重复实现。

5.  **14 评论 - [#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) RFC: Realtime speech-to-speech channel for Gemini Live** `provider:gemini`
    > v2 已重写为 broker 合约，拟新增可选特性的实时语音通道，首个实现对接 Gemini Live，关注延迟与会话控制面。

6.  **13 评论 - [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) [Tracker]: Maintainer decision queue for RFCs**
    > 维护者决策队列本身成为热点，侧面印证大量 RFC（如 #9487, #6850, #8780）积压在 `needs-maintainer-review`，形成瓶颈。

7.  **10 评论 - [#9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598) RFC: Define the SOP capability permission contract** `status:accepted` `risk:high`
    > 目标 v0.9.0 的 SOP 授权合约 Rev 3，明确 `required_permissions` 的权威性，分两阶段落地共享权限模型。

### 5. Bug 与稳定性

今日新增/活跃 Bug 共 8 个，按严重程度排序：

| 优先级 | Issue | 描述 | 状态与 Fix |
| :--- | :--- | :--- | :--- |
| **P1** | [#10194](https://github.com/zeroclaw-labs/zeroclaw/issues/10194) [CLOSED] PR reviewer publishes in-flight results after the PR merges | AI Reviewer 在 PR #9104 合并后仍发布评审，导致时序错乱 | **已关闭为 follow-up**，尚未关联修复 PR，需增加 CI 合并门限 |
| **P1** | [#10114](https://github.com/zeroclaw-labs/zeroclaw/issues/10114) max_tool_result_chars is a fixed 50,000 default | 工具结果无视模型上下文窗口，硬截断 50k 字符 | **已接受待修**，无 Fix PR |
| **P1** | [#10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115) tool-result truncation is invisible outside the model's context | 截断仅插入 `[... N characters]` 标记，外部日志/观测不可见 | **已接受待修**，无 Fix PR，与 #10114 同源 |
| **P1** | [#10116](https://github.com/zeroclaw-labs/zeroclaw/issues/10116) oversized tool results are cut byte-wise middle-out | 按字节中段截断（头2/3+尾1/3），应改为 `web_fetch` 式的落盘句柄 | **已接受待修**，无 Fix PR |
| **P1** | [#9678](https://github.com/zeroclaw-labs/zeroclaw/pull/9678) / [#9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635) | Git shell 策略参数硬化与风险分级绕过 (`git -C <path> <verb>`) | 均有 Fix PR 待作者处理 `needs-author-action` |
| **P2** | [#9016](https://github.com/zeroclaw-labs/zeroclaw/issues/9016) [CLOSED] OpenAI tool turns fail when Chat Completions rejects reasoning effort | `gpt-5.6-sol` 在 `/v1/chat/completions` 携带非 `none` 推理力度时整轮失败 | **已关闭**，S1 阻塞，已在 Provider 层处理 |
| **P2** | [#10106](https://github.com/zeroclaw-labs/zeroclaw/issues/10106) Exact proxy selectors reject supported transcription services | 仅 `transcription.groq` 生效，`openai/deepgram/assemblyai/google/local` 五路转录代理被拒 | **已有 Fix PR** [#10117](https://github.com/zeroclaw-labs/zeroclaw/pull/10117) `fix(config): accept exact transcription proxy selectors` 待合并 |
| **P2** | [#10111](https://github.com/zeroclaw-labs/zeroclaw/issues/10111) [CLOSED][duplicate] Windows: Entry Point Not Found — TaskDialogIndirect | `zeroclaw-desktop.exe` 在低版本 Windows 缺失 API | 已标记重复并关闭，需完善安装前置检测 |

> 另有文档/CI 类缺陷 [#10074](https://github.com/zeroclaw-labs/zeroclaw/issues/10074) `SECURITY.md` 引用的 `docker` CI job 已于 4 月移除，现仅为约定检查，`status:in-progress` 修复中。

**稳定性风险：** 工具结果截断三连发（#10114-10116）为当前最大隐性稳定性债务，可能导致长上下文任务信息丢失且无观测；转录代理问题已有明确修复，建议优先合入 #10117。

### 6. 功能请求与路线图信号

今日活跃的功能类 RFC/Feature 呈 **“运行时韧性 + 插件生态”** 双主线：

*   **高概率进入下一版本（已有对应 PR/已接受）：**
    *   转录代理修复 [#10106](https://github.com/zeroclaw-labs/zeroclaw/issues/10106) -> PR [#10117](https://github.com/zeroclaw-labs/zeroclaw/pull/10117) `size:XS`，改动小风险低，合入优先级最高。
    *   插件通道运行时化 [#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850) / [#10146](https://github.com/zeroclaw-labs/zeroclaw/pull/10146) `feat(plugins): activate logical channel instances` `risk:high` `size:XL` - 核心路线，将编译期 Feature 转为 WASM 插件，无需重编译即可扩展 Channel/Tool。
    *   WhatsApp 扫码增强 [#10084](https://github.com/zeroclaw-labs/zeroclaw/pull/10084) - 更新 `whatsapp-rust` 至 `b5daf757` 以支持 Passkey 流程，打通设备绑定。
    *   i18n 终端审批 [#10189](https://github.com/zeroclaw-labs/zeroclaw/pull/10189) - 本地化工具审批提示，Fluent 目录扩展。

*   **路线图信号（RFC 阶段，需评审）：**
    *   [#10168](https://github.com/zeroclaw-labs/zeroclaw/issues/10168) Enable the stall watchdog by default `stall_timeout_secs` 默认 0（关闭）改为非零，避免 turn 无限 hanging。
    *   [#10167](https://github.com/zeroclaw-labs/zeroclaw/issues/10167) Vendor-neutral lifecycle export for terminal multiplexers - 为终端复用器暴露通用生命周期钩子，ZeroCode 相关。
    *   [#10025](https://github.com/zeroclaw-labs/zeroclaw/issues/10025) zeroclaw swarm — ephemeral agent swarms with a crush-style TUI - 提出临时 Agent Swarm 编排器，解决静态 `[agents.<alias>]` 配置痛点。
    *   [#10050](https://github.com/zeroclaw-labs/zeroclaw/issues/10050) Verbatim channel send without an agent turn - 新增 Gateway 直发通道消息的原样转发路由，47 个 `/api/*` 均未覆盖此场景。
    *   [#10141](https://github.com/zeroclaw-labs/zeroclaw/issues/10141) Please make sessions usable - 用户明确要求会话可复制/可回溯，指向 ZeroCode 会话体验缺陷。

### 7. 用户反馈摘要

从评论与新开 Issue 提炼：

*   **痛点集中：**
    1.  **会话可用性差** - [#10141](https://github.com/zeroclaw-labs/zeroclaw/issues/10141) 用户抱怨无法方便地复制会话或历史消息，ZeroCode 的代码片段复制需两次 ASCII 按钮操作，体验割裂。
    2.  **可观测性黑洞** - [#10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115) 工具结果被静默截断，模型上下文外完全不可见，调试困难；[#10073](https://github.com/zeroclaw-labs/zeroclaw/issues/10073) `StoragePolicy::Rolling` 在持续事件量下性能退化，`/api/logs` 无法跨段查询。
    3.  **安装与代理兼容** - [#10111](https://github.com/zeroclaw-labs/zeroclaw/issues/10111) Windows 用户遭遇 `TaskDialogIndirect` 入口缺失无法启动；[#10106](https://github.com/zeroclaw-labs/zeroclaw/issues/10106) 企业代理环境下多家转录服务被误拦截。
*   **使用场景：** 终端多路复用器集成（[#10167](https://github.com/zeroclaw-labs/zeroclaw/issues/10167)）、Docker 镜像全量 Channel 预编译（[#10138](https://github.com/zeroclaw-labs/zeroclaw/issues/10138) 要求 `zeroclaw:debian` 默认包含 Git Channel）、持续性目标任务（Goal mode v2 [#9702](https://github.com/zeroclaw-labs/zeroclaw/issues/9702) 需跨重启续跑）。
*   **满意度信号：** 👍 反应普遍偏低（Top 30 Issue 仅 #8132 获 1 个 👍，#9016 获 1 个 👍），负面反馈多于点赞，表明用户更关注问题修复而非新特性。CI 文档与实际脱节（[#10074](https://github.com/zeroclaw-labs/zeroclaw/issues/10074)）也引发对安全声明可信度的疑虑。

### 8. 待处理积压

提醒维护者重点关注的长期滞留与阻塞项：

*   **超期 RFC（>30 天未决，`needs-maintainer-review`）：**
    *   [#6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) 2026-04-27 至今 116 天，`status:accepted` 但无落地 PR，需明确拆解路径。
    *   [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) 2026-05-22，内存生命周期解耦，14 评论仍待决。
    *   [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) 2026-05-28 粒度化沙箱策略，`needs-author-action` 停滞。
    *   [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) 2026-07-28 运行时会话归属，22 评论的架构总纲，阻塞后续 Channel 迁移。
    *   [#8132](https://github.com/zeroclaw-labs/zeroclaw/issues/8132) 2026-06-22 React/Vite -> Rust/Wasm 重构，P3 高风险，进展缓慢。

*   **高风险 PR 阻塞（`risk:high` + `needs-author-action`）：**
    *   [#9678](https://github.com/zeroclaw-labs/zeroclaw/pull/9678) Git shell 策略硬化 `size:L`
    *   [#9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635) Git 子命令解析修复
    *   [#10072](https://github.com/zeroclaw-labs/zeroclaw/pull/10072) SSRF NAT64 前缀分类（依赖 #10070）
    *   [#10146](https://github.com/zeroclaw-labs/zeroclaw/pull/10146) 插件逻辑通道激活 `size:XL`
    *   这些 PR 直接关联安全边界，建议在决策队列 [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 中优先调度。

*   **Tracker 积压：** [#10118](https://github.com/zeroclaw-labs/zeroclaw/issues/10118) 反 slop 清理需分阶段，[#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850) WASM 插件化 Tracker，均为跨版本债务。

> **建议：** 今日 45 个待合并 PR 中 `risk:high` 占比超 40%，而维护者决策队列 [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 已成唯一出口。建议临时增加 RFC 评审带宽，优先放行文档/依赖类低风险 PR（如 #10196, #10117），以缓解合入拥塞。

---
*日报生成器：Muse Spark | 数据来源：GitHub REST API | 下期预告：关注 #10117 是否合入及 stall watchdog 默认值讨论进展*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 | 2026-08-21

> 数据周期：2026-08-20 00:00 - 2026-08-21 00:00 (UTC) | 仓库：`sipeed/picoclaw`

### 1. 今日速览

PicoClaw 今日整体处于**低活跃度的仓库整理期**。过去24小时无新版本发布，无新增代码合并，8条 PR 动态中有5条为 Dependabot 依赖更新堆积、3条为历史 PR 的关闭清理。3条 Issues 均为 `stale` 机器人自动标记的存量问题复活，无新开问题。项目核心功能演进停滞，健康度信号为 **维护状态 / 需关注积压**，前端构建与依赖更新是当前最迫切的待处理项。

### 2. 版本发布

**本日无新版本发布。**
最新 Release 仍停留在 `v0.3.1` 时代，近7日无发版动作。社区提出的 Web UI、ASR、Agent 模型调度等需求均未进入发布管道。

### 3. 项目进展

本日 **0 个 PR 合并，3 个 PR 关闭**，均为非合并式关闭（Closed without merged），属于库存清理，非功能推进。

| PR | 状态 | 说明 | 影响评估 |
| :--- | :--- | :--- | :--- |
| [#3318 fix(web): repair unparseable pnpm-lock.yaml](https://github.com/sipeed/picoclaw/pull/3318) | CLOSED | 修复 `web/frontend/pnpm-lock.yaml` 中 `semver@7.8.5` 重复键导致 `ERR_PNPM_BROKEN_LOCKFILE` 的问题。由 @nuestraai 提交于08-05。 | **正向修复**。虽未合并（被关闭），但问题已定位，若重新提交可立即解除前端 `pnpm install` 阻塞，属于高优先级构建修复。 |
| [#423 WIP: base multi-agent collaboration framework](https://github.com/sipeed/picoclaw/pull/423) | CLOSED | 由 @Leeaandrob 于02-18提交的多智能体协作框架（Blackboard共享上下文、Agent handoff），WIP 状态超6个月。 | **负向信号**。该核心架构PR最终未合并关闭，意味着多Agent协作能力短期内不会进入主线，项目路线图出现回退。 |
| [#1158 feat: add anthropic-messages protocol](https://github.com/sipeed/picoclaw/pull/1158) | CLOSED | 由 @hyperwd 提交，新增 `anthropic-messages` 协议以支持 Anthropic 原生 `/v1/messages` 端点，Fixes #269。 | **负向信号**。03-06提交的协议扩展被关闭，未能解决部分代理服务仅支持原生 Anthropic 格式的兼容性问题。 |

> **小结：** 项目无实质性向前迈进，反而清理了两个长期悬而未决的功能分支。唯一的工程进展是锁定了前端构建故障的根因。

### 4. 社区热点

本日无高热度新增讨论，所有活跃 Issues/PRs 均为 `stale` 机器人触发更新。按评论数排序：

**Top 1 - [#3281 [BUG] Web UI chat input is very laggy](https://github.com/sipeed/picoclaw/issues/3281)**
*   评论: 6 | 👍: 1 | 作者: @xpader
*   诉求：Web UI 单会话历史稍长时，输入框严重卡顿，版本 `0.3.1` 复现。
*   分析：这是本日唯一有真实用户交互的 Issue，6条评论为全场最高，反映 **Web 通道是核心使用链路**，前端性能问题直接影响可用性。

**Top 2 - [#3330 [Feature] Support dynamic model override in delegate/spawn/subagent](https://github.com/sipeed/picoclaw/issues/3330)**
*   评论: 1 | 作者: @v2up-32mb
*   诉求：希望 `delegate/spawn/subagent` 工具支持运行时动态指定 model，而非静态读取 `config.json`。

**Top 3 - [#3331 [Feature] Use any models with /audio/transcriptions](https://github.com/sipeed/picoclaw/issues/3331)**
*   评论: 1 | 作者: @stanislavvv
*   诉求：希望通过 `whisper-transcription: true` 标记，让任意模型走 whisper 转录路径，摆脱对 `*-whisper-*` 老旧模型的强制绑定。

> 其他5个 PR [#3332](https://github.com/sipeed/picoclaw/pull/3332) [#3333](https://github.com/sipeed/picoclaw/pull/3333) [#3334](https://github.com/sipeed/picoclaw/pull/3334) [#3335](https://github.com/sipeed/picoclaw/pull/3335) [#3336](https://github.com/sipeed/picoclaw/pull/3336) 均为 Dependabot 提交，无任何评论与点赞，社区关注度为零。

### 5. Bug 与稳定性

按严重程度排序：

**[中-高] [#3281 Web UI chat input is very laggy](https://github.com/sipeed/picoclaw/issues/3281)**
*   类型：性能回归 / UI 阻塞
*   环境：PicoClaw 0.3.1 / Go 1.25.11 / PicoClaw Web Channel
*   现象：会话历史变长后，输入框输入延迟显著。
*   状态：`OPEN / stale`，**无关联 Fix PR**。自07-21创建已停滞1个月，被标记为 stale，存在被自动关闭风险，但问题未解决。
*   建议：需前端虚拟化长列表、输入框防抖或历史消息分页加载。

**[低] [#3318 pnpm-lock.yaml 解析失败](https://github.com/sipeed/picoclaw/pull/3318)**
*   类型：构建稳定性
*   现象：`pnpm` 因 YAML 重复键拒绝安装，阻塞所有前端开发与 CI。
*   状态：Fix PR 已提交但被关闭未合并，**修复就绪但未落地**。

本日无新增 Crash / 数据丢失类严重 Bug 报告。

### 6. 功能请求与路线图信号

两条 Feature Issues 均来自08-13，已被 `stale`，反映用户对灵活性的迫切需求：

**1. 动态模型调度 - [#3330](https://github.com/sipeed/picoclaw/issues/3330)**
*   需求：`delegate/spawn/subagent` 支持 `model` 参数覆写。
*   价值：实现“主模型用 GPT-4o + 子任务用廉价模型”的成本优化和“推理模型+执行模型”分工，是 Multi-Agent 落地的关键。
*   落地可能性：中。虽 [#423](https://github.com/sipeed/picoclaw/pull/423) 多智能体框架已关闭，但该需求轻量、改动小，可独立实现，适合作为下一版本的增强点。

**2. ASR 模型解耦 - [#3331](https://github.com/sipeed/picoclaw/issues/3331)**
*   需求：ASR 不再强绑定 `whisper` 命名，通过配置强制走转录路径。
*   价值：可接入更快、更准的新一代语音模型（如 distil-whisper, canary, qwen-audio），解决用户抱怨“whisper太旧太慢”的痛点。
*   落地可能性：高。改动集中在 `asr.go` 的路由判断，成本低，收益明确，建议纳入 `v0.3.2` 补丁。

> 结合已关闭的 [#1158](https://github.com/sipeed/picoclaw/pull/1158)，可见社区对 **模型/协议兼容性** 的诉求持续存在，但维护端响应不足。

### 7. 用户反馈摘要

从 Issues 评论提炼：

*   **核心痛点：** Web 体验是短板。用户 @xpader 反馈的输入卡顿（[#3281](https://github.com/sipeed/picoclaw/issues/3281)）代表了一类重度用户——长会话是常态，性能问题会直接导致放弃使用 Web UI。
*   **使用场景：** 1) 长对话/连续任务的 Web 交互；2) 需要精细化成本与能力分层的 Multi-Agent 调用（[#3330](https://github.com/sipeed/picoclaw/issues/3330)）；3) 语音转录场景中追求速度与质量平衡（[#3331](https://github.com/sipeed/picoclaw/issues/3331)）。
*   **满意/不满意：** 不满意集中在“配置僵化”（模型、ASR 强制绑定）和“前端性能”。无正向满意度反馈，评论区多为问题描述而非赞誉，说明项目处于“可用但不好用”阶段。

### 8. 待处理积压

**需维护者立即关注的 Stale 库存：**

**1. 依赖更新积压 - 5个 Dependabot PR 已 stale 7天无人 Review**
*   [#3332 bump aws-sdk-go-v2 1.42.0 -> 1.43.4](https://github.com/sipeed/picoclaw/pull/3332)
*   [#3333 bump mautrix 0.27.0 -> 0.29.0](https://github.com/sipeed/picoclaw/pull/3333) - 含 client breaking change
*   [#3334 bump anthropic-sdk-go 1.55.1 -> 1.62.0](https://github.com/sipeed/picoclaw/pull/3334) - 跨7个小版本
*   [#3335 bump aws-sdk-go-v2/config 1.32.25 -> 1.32.35](https://github.com/sipeed/picoclaw/pull/3335)
*   [#3336 bump bedrockruntime 1.53.3 -> 1.57.1](https://github.com/sipeed/picoclaw/pull/3336)
*   风险：堆积越久，冲突与安全漏洞风险越高，建议批量 CI 验证后合并。

**2. 功能需求长期未响应**
*   [#3330](https://github.com/sipeed/picoclaw/issues/3330) / [#3331](https://github.com/sipeed/picoclaw/issues/3331) 创建于08-13，仅1条评论且已被 `stale`，7天内无维护者回复，存在流失贡献者风险。

**3. 历史 Bug 有被自动关闭风险**
*   [#3281](https://github.com/sipeed/picoclaw/issues/3281) 已被标记 `stale`，若继续无响应将被 bot 关闭，但其反映的性能问题真实存在，建议 `remove stale` 并分配里程碑。

---
**维护建议：** 1) 优先合并 [#3318](https://github.com/sipeed/picoclaw/pull/3318) 的 lockfile 修复以恢复前端 CI；2) 对5个依赖 PR 进行批量合并；3) 对 [#3281](https://github.com/sipeed/picoclaw/issues/3281) 和两个 Feature Requests 进行人工 triage，避免 stale bot 误伤有效需求。

*日报生成基于 GitHub API 过去24小时增量数据，仅反映公开仓库动态。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 | 2026-08-21

> 数据区间：2026-08-20 00:00 - 23:59 UTC | 数据来源：github.com/agentscope-ai/QwenPaw

### 1. 今日速览

QwenPaw 项目昨日保持高活跃度，**Issues 更新 27 条（新开/活跃 14，关闭 13），PR 更新 50 条（待合并 21，已合并/关闭 29）**，Issue 关闭率 48%，PR 合并消化率 58%，整体处于 Beta 迭代冲刺期。核心进展是发布 **v2.1.1-beta.1** 小版本迭代，并合并了 7+ 项涉及性能、稳定性与安全性的重要修复。社区焦点集中在 **Agent 多步任务中断、长会话性能与网络/存储健壮性** 三大类问题上，尚未出现阻塞性 P0 缺陷，项目健康度良好。

**活跃度评估：🔥 高活跃 | 发布节奏：正常 | 合并效率：高**

### 2. 版本发布

**新版本：v2.1.1-beta.1** - [Release Page](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.1-beta.1)

这是 v2.1.0 后的首个 Beta 补丁版本，定位为体验与日志优化修复，无破坏性变更，可无缝升级。

**What's Changed：**
*   `feat(console): improve editor tab overflow navigation` - [#6983](https://github.com/agentscope-ai/QwenPaw/pull/6983) by @rayrayraykk - 优化 Console 编辑器 Tab 溢出时的导航体验，解决标签页过多无法切换的问题。
*   `fix(providers): lower rate limiter init log level` - [#6988](https://github.com/agentscope-ai/QwenPaw/pull/6988) by @rayrayraykk - 将限流器初始化日志级别下调，减少启动时的噪音日志。
*   `chore: update release notes` - 发布说明及文档同步。

**迁移注意事项：** 无配置变更、无数据库迁移、无 API Breaking Change。`pip` / 桌面端用户可直接覆盖升级。伴随发布创建了安装验证任务 [#7180](https://github.com/agentscope-ai/QwenPaw/issues/7180)，要求在 4 小时内完成四平台安装校验。

### 3. 项目进展

昨日共 **29 个 PR 被合并/关闭**，项目在性能、控制台体验和工程化三个方向显著推进：

| PR | 类型 | 说明 |
|---|---|---|
| [#7174](https://github.com/agentscope-ai/QwenPaw/pull/7174) | `perf` 已合并 | **启动性能优化**：并发初始化持久化 Drivers，减少冷启动时间，保留失败隔离与原子发布逻辑。 |
| [#7161](https://github.com/agentscope-ai/QwenPaw/pull/7161) | `feat(console)` 已合并 | **控制台体验**：在助手响应卡片中增加 `artifacts` 产物展示，完善产出物闭环。 |
| [#7166](https://github.com/agentscope-ai/QwenPaw/pull/7166) | `fix(release)` 已合并 | **打包修复**：将 `qwenpawmail MCP` 打包为独立 sidecar，解决 PyInstaller 冻结构建下的邮件能力缺失。 |
| [#6880](https://github.com/agentscope-ai/QwenPaw/pull/6880) | `feat(console)` 已合并 | **市场统一**：统一 Apps/Plugins/Skills 市场为 `/market` 统一入口，`?tab=` 区分三类资产。 |
| [#6371](https://github.com/agentscope-ai/QwenPaw/pull/6371) | `fix` 已合并 | **文件健壮性**：修复 `_download_remote_to_path()` 超时后未走 `wget->curl->urllib` 降级链的问题。关闭 [#6370](https://github.com/agentscope-ai/QwenPaw/issues/6370)。 |
| [#7135](https://github.com/agentscope-ai/QwenPaw/pull/7135) | `fix(envs)` 已合并 | **数据安全**：修复 `envs.json` 损坏被静默吞掉并覆盖导致所有环境变量丢失的问题，改为保留损坏文件 + 原子写入。关闭 [#7118](https://github.com/agentscope-ai/QwenPaw/issues/7118)。 |
| [#7172](https://github.com/agentscope-ai/QwenPaw/pull/7172) | `chore(deps)` 已合并 | **安全加固**：升级 `vite 6.4.3 / rollup 4.59.0 / react-router-dom 7.18.2 / js-yaml 4.3.1`，修复 Vite 任意文件读取等漏洞。 |

同时关闭了一批用户体验类 Issue：[#6643](https://github.com/agentscope-ai/QwenPaw/issues/6643) 任务产出物分目录、[#6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) 助手耗时显示异常、[#7110](https://github.com/agentscope-ai/QwenPaw/issues/7110) 图片链接导致会话不可用、[#7060](https://github.com/agentscope-ai/QwenPaw/issues/7060) video 2MB 硬编码限制等。

### 4. 社区热点

按评论数/互动热度排序的 Top 5 热点：

**1. [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) [OPEN] 多步任务无提示自动停止 - 评论 10**
> 现象：Agent 输出规划句如 “Now 2.1, 3.1, 3.2. Let me do all three.” 后直接停止，需用户输入“继续”才执行。v2.1beta2 / Win11 复现。背后诉求是 **Agent 自主性与任务连续性**，用户期望规划即执行而非等待确认。

**2. [#7102](https://github.com/agentscope-ai/QwenPaw/issues/7102) [CLOSED] Freeze more than 10 minutes - 评论 9**
> 使用 GLM 5.3 时冻结超 5 分钟无 token 输出，thinking 也卡死。已于昨日关闭，可能与提供商超时或流式重连有关，需关注后续是否有回归。

**3. [#6643](https://github.com/agentscope-ai/QwenPaw/issues/6643) [CLOSED] 任务产出物不要堆积在 media - 评论 6**
> 诉求为按任务新建目录管理产物，而非全部堆在 `media/`。高频工作流用户的核心痛点，已关闭预计在下个版本落地。

**4. [#6436](https://github.com/agentscope-ai/QwenPaw/issues/6436) [OPEN] 自动模型路由 - 👍 1 / 评论 4**
>  제안：根据消息类型自动路由到最合适的模型（小模型处理简单问候、视觉模型处理图片、大模型处理复杂推理）。代表了对 **成本与性能平衡** 的长期架构诉求。

**5. [#7013](https://github.com/agentscope-ai/QwenPaw/issues/7013) [OPEN] Chat 统一工具面板 - 评论 3**
> 希望在 Chat 页集成文件预览/Diff/Web 服务预览/交互式 Terminal，形成开发闭环。获得较多开发者共鸣，与 PR [#7176](https://github.com/agentscope-ai/QwenPaw/pull/7176) 性能优化方向相关。

### 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| **🔴 高** | [#7168](https://github.com/agentscope-ai/QwenPaw/issues/7168) | `history.db` 被 `recall_history` expand 整段落库撑爆到 7.6G，同一区间重复落库 | **OPEN 无修复PR**，需紧急介入 |
| **🔴 高** | [#7162](https://github.com/agentscope-ai/QwenPaw/issues/7162) | 流式输出中途 `httpx.ReadError` 导致 `UNKNOWN_AGENT_ERROR`，`_get_httpx_retryable()` 漏掉 ReadError 故不重试 | **CLOSED**，昨日已定位根因，待合入重试修复 |
| **🟠 中高** | [#7110](https://github.com/agentscope-ai/QwenPaw/issues/7110) | 对话上下文含无法下载的图片链接则整个会话不可用，需 `/clear` | **CLOSED**，已修复 |
| **🟠 中高** | [#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932) | 网络短暂中断恢复后 QwenPaw 无法自动恢复，持续 `ConnectTimeout` 必须重启 | **OPEN**，瞬态网络容错缺陷 |
| **🟡 中** | [#7156](https://github.com/agentscope-ai/QwenPaw/issues/7156) | embedding health check 在后端已 warm 时仍超时 (>5s, elapsed 10.4s)，且 timeout 硬编码无配置项 | **OPEN**，关联 PR [#7133](https://github.com/agentscope-ai/QwenPaw/pull/7133) 正添加可配置 timeout |
| **🟡 中** | [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) | 多步规划后无提示停止 | **OPEN**，核心体验回归 |
| **🟢 低** | [#6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) | 助手消息结束时间显示异常（实际思考2min显示仅几秒） | **CLOSED** 已修复 |
| **🟢 低** | [#7060](https://github.com/agentscope-ai/QwenPaw/issues/7060) | `view_video` inline-media 2MB 硬编码，provider 配置无效 | **CLOSED**，已有 PR [#7061](https://github.com/agentscope-ai/QwenPaw/pull/7061) 修复 |

**待合入修复PR：** [#7061](https://github.com/agentscope-ai/QwenPaw/pull/7061) 修复 OpenAI Responses API 视频帧丢失， [#7133](https://github.com/agentscope-ai/QwenPaw/pull/7133) 修复 embedding 超时可配置。

### 6. 功能请求与路线图信号

昨日新增 8 项 Feature 请求，结合活跃 PR 判断下一版本风向：

**高概率进入 v2.2 的信号：**
*   **Workspace 常驻 Skills** - Issue [#7182](https://github.com/agentscope-ai/QwenPaw/issues/7182) + PR [#7183](https://github.com/agentscope-ai/QwenPaw/pull/7183) **已实现** `always_on` 模式，允许特定 Skills 在首轮决策前预载入 System Prompt，解决专业 Agent 角色定义不稳定的问题。作者 @wuyak 当日提交，进展快。
*   **记忆与上下文控制** - [#7184](https://github.com/agentscope-ai/QwenPaw/issues/7184) 请求 Agent 级跨会话 Scroll 回忆开关；PR [#7080](https://github.com/agentscope-ai/QwenPaw/pull/7080) 引入 `PowerContext` 可插拔长期记忆后端；PR [#7133](https://github.com/agentscope-ai/QwenPaw/pull/7133) 升级 ReMe 0.4.1.8。记忆体系是明确迭代重点。
*   **Hub 多用户** - PR [#7112](https://github.com/agentscope-ai/QwenPaw/pull/7112) `feat(hub): add self-hosted multi-user Hub` 正在 Review，`qwenpaw hub --config` 支持本地/Docker 隔离运行，标志着从单机向团队自托管演进。

**中长期路线图信号：**
*   [#7013](https://github.com/agentscope-ai/QwenPaw/issues/7013) 统一工具面板/Web预览/终端 - 配合 [#7176](https://github.com/agentscope-ai/QwenPaw/pull/7176) 长会话性能优化、[#7181](https://github.com/agentscope-ai/QwenPaw/issues/7181) 支持 Qwen_Code 作为第三方 harness，指向 **Agent 开发工作台**方向。
*   [#6436](https://github.com/agentscope-ai/QwenPaw/issues/6436) 自动模型路由、[#7159](https://github.com/agentscope-ai/QwenPaw/issues/7159) QQ群定时主动推送、[#7158](https://github.com/agentscope-ai/QwenPaw/issues/7158) 钉钉群聊上下文隔离/共享模式 - 均为 **Channels 与成本优化** 方向，短期可能以配置项形式小步落地。

### 7. 用户反馈摘要

**痛点 Top 3：**
1.  **任务执行不连贯**：多位用户反馈（[#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921)）Agent 规划完就停，需要手动催促，破坏了自动化执行的心智模型，尤其在 3-5 步复杂任务中复现率高。
2.  **网络与长稳健性差**：网络抖动后需重启 ([#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932))、长会话卡顿、7.6GB 历史库膨胀 ([#7168](https://github.com/agentscope-ai/QwenPaw/issues/7168))，反映长期运行 Agent 的存储与容错短板。
3.  **文件与媒体体验割裂**：media 目录混乱 ([#6643](https://github.com/agentscope-ai/QwenPaw/issues/6643))、中文文件名乱码 ([#6453](https://github.com/agentscope-ai/QwenPaw/issues/6453) 已关)、`view_video` 无法发送大视频 ([#7060](https://github.com/agentscope-ai/QwenPaw/issues/7060))、图片链接致会话崩溃 ([#7110](https://github.com/agentscope-ai/QwenPaw/issues/7110))，用户对产出物管理期望高。

**满意点：**
*   桌面端与 Console 迭代响应快，v2.1.1-beta.1 当天即提到 Tab 导航、限流日志等细节优化，用户对小步快跑节奏认可。
*   对 VPN 支持 ([#6974](https://github.com/agentscope-ai/QwenPaw/issues/6974) 已关)、中文文件名保留等本地化问题修复给予正向反馈。

**使用场景洞察：** 技术用户正将 QwenPaw 用于 **长周期任务编排 + 产物沉淀**（而非单轮问答），因此对产物目录、历史库大小、跨会话记忆的关注度显著上升。

### 8. 待处理积压

提醒维护者关注的长期/高价值未闭环项：

*   **需优先决策的老 Issue：**
    *   [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) - 2026-08-12 创建，开放 9 天，10 评论仍 OPEN，属核心体验回归，建议提升优先级。
    *   [#6436](https://github.com/agentscope-ai/QwenPaw/issues/6436) - 2026-07-24 创建，开放近 1 个月，自动路由架构提案，需明确是否纳入 Roadmap 还是作为插件。
    *   [#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932) - 网络自恢复，复现 2 次，涉及底层 provider 重连策略，长期未分配修复人。
    *   [#7168](https://github.com/agentscope-ai/QwenPaw/issues/7168) - history.db 7.6G，新开但严重度高，现有 `ToolResultCapMiddleware` 设计需复审，避免磁盘打爆生产环境。

*   **待合并的 First-time Contributor PR（需 Review 带宽）：**
    *   [#7119](https://github.com/agentscope-ai/QwenPaw/pull/7119) `fix(security): master key 0o600` - 安全类，自 08-18 挂起 3 天。
    *   [#7061](https://github.com/agentscope-ai/QwenPaw/pull/7061) 修复视频在 Responses API 下丢失 - 自 08-15 挂起 6 天，阻塞 [#7060](https://github.com/agentscope-ai/QwenPaw/issues/7060) 闭环。
    *   [#7175](https://github.com/agentscope-ai/QwenPaw/pull/7175) 修复免费模型列表展示不全 - 影响模型选择器准确性。

> **健康度建议：** 昨日关闭 13 Issue / 合并 6+ 核心 PR，消化能力强；但高严重存储与网络容错问题仍积压，建议下一迭代聚焦 **“稳定性与长会话”** 专项，并及时 Review 安全与视频类外部贡献 PR 以提升社区参与感。

---
*本日报由 Muse Spark 自动生成，数据截止 2026-08-20 23:59 UTC。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报 — 2026-08-21

### 1. 今日速览

过去24小时项目处于**超高活跃 + 高风险修复期**。核心指标：`Issues 更新 423条 (新开/活跃 340 | 已关闭 83)`，`PR 更新 500条 (待合并 413 | 已合并/关闭 87)`，无新版本发布。
整体健康度评估：**开发吞吐量极高但稳定性债务集中爆发**。讨论热点高度聚焦于三类问题：1) 安装/更新链路在 Debian/Windows/Termux 全面失效；2) Desktop 客户端会话与存储层( state.db / profile / safeStorage) 连续回归；3) Gateway/平台适配层批量重构。413个待合并PR形成明显积压，需关注合并节奏与回归测试覆盖。

### 2. 版本发布

**今日无新版本发布。** `最新 Releases: 无`

> 提示：当前 `v0.20.0 (2026.08.03)` 已暴露多起 `hermes update` 破坏性更新问题，详见下文 Bug 章节，建议用户在官方修复前暂缓跨版本更新。

### 3. 项目进展

今日 87 个 PR 已合并/关闭，但 Top 20 热门 PR 中**无明确合并项，4个核心功能 PR 被关闭**，显示维护团队对架构类改动持审慎/收紧态度，项目整体以前瞻性功能评审与关键 Bug 修复为主，未实现大规模功能合入。

**今日关闭的重要 PR (需关注决策信号)：**
*   [#90284](https://github.com/NousResearch/hermes-agent/pull/90284) `feat(refine): reversible /refine undo` [CLOSED] - 为 `/refine` 增加快照回滚能力，移植 prime-agent 可逆自进化特性。已关闭，未合入。
*   [#90340](https://github.com/NousResearch/hermes-agent/pull/90340) `feat(delegate): complete prime-agent peer/child/broadcast steer (F3)` [CLOSED] - 补齐 F3 点对点/广播 steering 的用户入口，替代 #90288。已关闭。
*   [#90288](https://github.com/NousResearch/hermes-agent/pull/90288) `feat(steer): peer + broadcast session steering` [CLOSED] - 同系列，已被 #90340 取代后关闭。
*   [#90285](https://github.com/NousResearch/hermes-agent/pull/90285) `feat(goals): opt-in token budget for /goal` [CLOSED] - 为长期目标增加 token 预算上限。已关闭。

> **解读：** 3个来自 @HermesZum 的 prime-agent 移植系列 PR 同日关闭，且均标注 `needs-decision`，表明团队对**植入式架构扩展**采取了 `“暂缓/拒绝 - 保持现有原语扩展”` 的策略，短期路线将聚焦稳定性而非激进的功能移植。

**待合并的关键修复方向 (尚未合入，但代表今日主要推进力)：**
*   P0 级缓存修复: [#90972](https://github.com/NousResearch/hermes-agent/pull/90972) `fix(prompt_caching): guard against non_sys negative slice overflow` - 修复 Anthropic prompt caching 中 `non_sys[-0:]` 导致全量切片误标记的严重逻辑错误。
*   会话与推理链保真: [#91104](https://github.com/NousResearch/hermes-agent/pull/91104) `fix(agent): replay plaintext Responses reasoning` / [#91126](https://github.com/NousResearch/hermes-agent/pull/91126) `fix(compression): preserve repeated tool-id` - 解决 Relay 明文推理丢失导致工具调用死循环、压缩阶段 tool_call 覆盖问题。
*   认证与更新: [#91054](https://github.com/NousResearch/hermes-agent/pull/91054) `fix(auth): stop repeated auxiliary Nous 401` / [#90961](https://github.com/NousResearch/hermes-agent/pull/90961) `fix(desktop): never delete safeStorage keychain` - 关键路径修复。

### 4. 社区热点

按评论数 Top 5 排序，反映长期未解与新晋高危问题的叠加：

| 排名 | Issue | 评论 | 核心诉求 |
| :--- | :--- | :--- | :--- |
| 1 | [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) [OPEN] Skills index is stale or degraded | 65 | **基础设施告警**：自动化探针显示 Skills 索引已 29.8h 未更新(阈值26h)，影响 `/docs/skills`。自 7/18 持续未根治，关注度最高。 |
| 2 | [#5257](https://github.com/NousResearch/hermes-agent/issues/5257) feat: Generalized ACP client for multi-agent CLI | 24 👍23 | **架构级功能请求**：自4月提出，希望将现有 Copilot 专属 ACP client 泛化为支持 Claude/Codex 等全 ACP 协议 Agent 的编排中枢。社区呼声高，已成路线图关键信号。 |
| 3 | [#84834](https://github.com/NousResearch/hermes-agent/issues/84834) Webhook Feature Package — meta-issue | 21 | **史诗级重构追踪**：以 Graph-gated 方式系统性修复 webhook 全链路(ingress/execution/delivery/UI/docs)。代表 Gateway 平台化治理的长期战役。 |
| 4 | [#73082](https://github.com/NousResearch/hermes-agent/issues/73082) Desktop renderer/GPU 100%+ CPU at idle | 15 | **性能回归**：Electron 渲染进程空闲空转，高能耗发热。影响所有 macOS 桌面用户。 |
| 5 | [#87093](https://github.com/NousResearch/hermes-agent/issues/87093) Debian installation broken | 14 | **P1 阻塞**：Debian 13.6 上 `install.sh` 触发 uv.lock & npm install 失败，全新安装即失败。 |

其他高热问题：[#89675](https://github.com/NousResearch/hermes-agent/issues/89675) Desktop 无会话加载(14评论) / [#85695](https://github.com/NousResearch/hermes-agent/issues/85695) [CLOSED] TERMINAL_CWD 误报(14评论) / [#83846](https://github.com/NousResearch/hermes-agent/issues/83846) Windows ZIP fallback 删应用(12评论)

### 5. Bug 与稳定性

今日 Bug 密度极高，按严重程度分级：

**P0/P1 阻塞级 - 需立即关注：**
*   **P0** [#90972](https://github.com/NousResearch/hermes-agent/pull/90972) 关联问题：Anthropic 缓存切片溢出 `non_sys[-0:]` 导致错误缓存标记 -> **已有 Fix PR #90972 待合入**
*   **P1** [#89614](https://github.com/NousResearch/hermes-agent/issues/89614) [Windows] `taskkill /F /PID` 误杀 `svchost.exe` 导致 0xEF 蓝屏 | **无 Fix PR，极度危险**
*   **P1** [#89675](https://github.com/NousResearch/hermes-agent/issues/89675) Desktop：更新后 `--profile` 参数丢失致所有 profile 会话为空 | **影响 macOS 全量更新用户**
*   **P1** [#87093](https://github.com/NousResearch/hermes-agent/issues/87093) Debian 13.6 安装失败 | **无 Fix PR**
*   **P1** [#83846](https://github.com/NousResearch/hermes-agent/issues/83846) Windows 更新 ZIP 回退逻辑删除 `Hermes` 应用且不再重建，提示 Already up to date | **无 Fix PR**
*   **P1** [#83529](https://github.com/NousResearch/hermes-agent/issues/83529) `hermes update` 直接摧毁安装 (Debian Trixie) | **无 Fix PR**
*   **P1** [#86093](https://github.com/NousResearch/hermes-agent/issues/86093) [CLOSED] Windows `hermes update` 因 `hermes.exe` 占用无法重命名，隔离机制污染注册表 | **已关闭，待验证修复**
*   **P1** [#90950](https://github.com/NousResearch/hermes-agent/issues/90950) `state.db` 在 SQLite 3.53.1 + WAL 并发写下反复损坏 | **核心数据丢失风险，无 Fix PR**
*   **P1** [#64155](https://github.com/NousResearch/hermes-agent/issues/64155) Gateway SIGTERM 优雅退出挂起致 systemd 超时 2-3分钟 | **无 Fix PR**

**P2 严重级：**
*   [#73082](https://github.com/NousResearch/hermes-agent/issues/73082) Desktop 空闲高 CPU / [#66255](https://github.com/NousResearch/hermes-agent/issues/66255) Gateway Session 重启后绕过重置策略致会话永生 / [#59877](https://github.com/NousResearch/hermes-agent/issues/59877) Python 3.14 不兼容 `Requires <3.14` / [#87697](https://github.com/NousResearch/hermes-agent/issues/87697) Ollama 本地流 1.5s 后被取消触发 token 循环 -> **对应 Fix PR [#90961](https://github.com/NousResearch/hermes-agent/pull/90961), [#91104](https://github.com/NousResearch/hermes-agent/pull/91104), [#91126](https://github.com/NousResearch/hermes-agent/pull/91126) 已提交**

### 6. 功能请求与路线图信号

**高概率进入下一版本 (已有实现 PR)：**
*   **治理与多平台拉齐：** [#91111](https://github.com/NousResearch/hermes-agent/pull/91111) `feat(hermes-tag): additive governance kernel` - 为 Slack @Hermes Tag 战役提供身份/范围/审批内核，零侵入式设计，通过率高。关联 [#79564](https://github.com/NousResearch/hermes-agent/issues/79564) Discord API v10 拉齐战役。
*   **临时会话(隐私模式)：** [#78584](https://github.com/NousResearch/hermes-agent/pull/78584) `feat(sessions): add temporary chats` - 支持桌面/CLI/Telegram/Discord/Slack 全端无落盘聊天，已具备完整设计，呼声明确。
*   **平台生命周期优化：** [#84874](https://github.com/NousResearch/hermes-agent/pull/84874) `fix(gateway): support dedicated lifecycle channels` / [#82033](https://github.com/NousResearch/hermes-agent/pull/82033) `fix(install): reject incompatible system npm`

**强需求但决策待定 (Needs-Decision)：**
*   [#5257](https://github.com/NousResearch/hermes-agent/issues/5257) 通用 ACP 客户端 - 23个赞，评论24，是连接多 Agent 生态的关键卡位，建议优先级提升至 P3 以上。
*   被关闭的 `/refine` 可逆、`/goal` 预算、Steer 广播 三件套，短期内不会进入主线。

### 7. 用户反馈摘要

从 340 条活跃 Issues 评论中提炼：

*   **痛点 Top 1 - 安装即失败 (Install Hell)：** [#90687](https://github.com/NousResearch/hermes-agent/issues/90687) 报告 8月20日早起所有设备 Termux 全新安装均报错；[#59877](https://github.com/NousResearch/hermes-agent/issues/59877) Python 3.14 越界；[#87093](https://github.com/NousResearch/hermes-agent/issues/87093) Debian 13.6 失败。用户原话 `destroys hermes`，情绪负面，阻断新用户转化。
*   **痛点 Top 2 - Windows 更新=自毁：** 集中在 [#83846](https://github.com/NousResearch/hermes-agent/issues/83846), [#86093](https://github.com/NousResearch/hermes-agent/issues/86093), [#89614](https://github.com/NousResearch/hermes-agent/issues/89614) 三连击：更新删应用、锁文件无法替换、甚至蓝屏。用户对 Windows 支持稳定性信任度急剧下降。
*   **痛点 Top 3 - Desktop 不可用：** [#89675](https://github.com/NousResearch/hermes-agent/issues/89675) 更新后会话全空、[#75756](https://github.com/NousResearch/hermes-agent/issues/75756) 编辑旧消息 `session not found`、[#42962](https://github.com/NousResearch/hermes-agent/issues/42962) Telegram 更新后 Desktop 不刷新。核心使用场景(多端协同)受损。
*   **满意点：** 社区对 [#85695](https://github.com/NousResearch/hermes-agent/issues/85695) 误报修复的关闭、[#38873](https://github.com/NousResearch/hermes-agent/issues/38873) 远程网关回跳修复的关闭给予正向反馈，说明对“快速响应误报/小修”的认可。

### 8. 待处理积压

提醒维护者优先 Review / Triage 的长期高关注债务：

*   **超期未决 - 137天：** [#5257](https://github.com/NousResearch/hermes-agent/issues/5257) 通用 ACP 客户端 (2026-04-05创建，P4但24评论+23赞) - 建议明确 Accept/Reject 并给出路线图时间表。
*   **基础设施慢性病 - 34天：** [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) Skills Index 持续 degraded (65评论) - 已标注 P3 `risk-automation`，但每日探针失败，需指派 Owner 根治 cron/index 构建。
*   **性能与平台债：** [#73082](https://github.com/NousResearch/hermes-agent/issues/73082) 桌面空闲高 CPU (7/28至今)、[#46082](https://github.com/NousResearch/hermes-agent/issues/46082) Dashboard 内存泄漏至5.2G OOM (6/14至今)、[#58705](https://github.com/NousResearch/hermes-agent/issues/58705) mem0 + Qdrant 文件锁冲突 (Windows) - 均为 `sweeper:risk-session-state` 标签，长期未解。
*   **PR 积压：** [#78584](https://github.com/NousResearch/hermes-agent/pull/78584) 临时会话 (8/04提交)、[#83870](https://github.com/NousResearch/hermes-agent/pull/83870) Gateway profile 上下文隔离、[#79564](https://github.com/NousResearch/hermes-agent/issues/79564) Discord 拉齐 - 均超过2周未合入，建议设立合并窗口。

> **健康度建议：** 当前 413 个 PR 待合并与 340 个活跃 Issue 表明社区贡献意愿极强，但安装/更新/会话 三大主链路的 P1 缺陷已形成系统性风险。建议下一周期 **冻结大型功能合入，优先发布 v0.20.1 热修复**，集中解决 Windows 更新、Debian/Termux 安装、state.db 腐蚀三类阻塞问题。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 | 2026-08-21

### 1. 今日速览

过去24小时 AstrBot 维持**中高活跃度**，共产生 13 条动态：Issues 7 条（新开/活跃 3，关闭 4）、PR 6 条（待合并 4，已合并/关闭 2），无新版本发布。核心进展集中在 **稳定性修复与 WebUI 体验优化**，2 个高价值 PR 完成合并，闭环了 Telegram 假死、配置校验等长期问题。社区侧出现 1 起插件市场署名争议的高热讨论，同时知识库架构迎来可插拔化重构提案，项目健康度良好，技术债务持续收敛。

> 统计口径：2026-08-20 00:00 - 2026-08-21 00:00 UTC

### 2. 版本发布

**本周期无新版本发布。**
最新稳定版仍为 `v4.27.3`，Dashboard 中报告的移动端等 Bug 预计在下一 Patch 版本中修复。

### 3. 项目进展

今日共 **合并/关闭 2 个 PR**，全部为稳定性与体验修复类型，项目向前推进显著。

| PR | 类型 | 核心内容 | 价值评估 |
|---|---|---|---|
| [#9473](https://github.com/AstrBotDevs/AstrBot/pull/9473) <br/> `fix: 修复代理切换/弱网下TG平台假死` | `area:platform` `size:L` | 修复 Telegram `getUpdates` 长轮询在网络/代理切换后连接失效但 `updater.running` 仍为 True 的假死问题。表现为消息无响应、Bot 持续显示输入中，需手动重启适配器。PR 重构了异常检测与恢复逻辑，作者已本地多日验证。关联 [#8314](https://github.com/AstrBotDevs/AstrBot/issues/8314) | **高**。解决 TG 平台核心可用性问题，属长期困扰用户的 P0 级稳定性修复。 |
| [#9689](https://github.com/AstrBotDevs/AstrBot/pull/9689) <br/> `fix: validate bool config values and add reasoning field schema` | `area:webui` `size:S` | 修复 WebUI 布尔类型配置项校验缺失问题，并为 `reasoning` 字段补充 schema 定义。避免前端传入字符串 `"true"/"false"` 导致后端配置解析异常。 | **中**。提升配置系统健壮性，减少用户因误配置导致的启动失败。 |

另有 4 个 Issues 于今日关闭，其中 [#9275](https://github.com/AstrBotDevs/AstrBot/issues/9275) 为基于 `v4.26.6` 的全栈安全审计闭环，标志着 7 月以来的安全/可靠性治理告一段落。

### 4. 社区热点

按评论数与讨论深度排序：

**1. [#9687](https://github.com/AstrBotDevs/AstrBot/issues/9687) [CLOSED] 关于商店插件 `astrbot_plugin_rollpig` 的代码来源及署名问题 | 评论 13**
> `Felis2026/nonebot-plugin-rollpig-plus` 维护者指出 AstrBot 商店插件 `casama233/astrbot_plugin_rollpig` 大量功能与自身项目高度对应，且演化路径重合，质疑未遵守开源协议与署名规范。
**分析：** 本周期最热议题。已于 08-20 关闭，反映社区对 **插件市场版权与原创保护机制** 的高度关注。后续需关注官方是否完善插件上架审核与 `LICENSE` 溯源流程，否则易引发开发者信任问题。

**2. [#9718](https://github.com/AstrBotDevs/AstrBot/issues/9718) [OPEN] 关于日志建议 | 评论 5**
> 用户 @mjy1113451 建议 WebUI 日志页面增加关键词搜索功能，以便快速定位错误日志。
**分析：** 典型易用性诉求。日志量大时排查困难，该需求与 WebUI 近期多项体验优化方向一致，实现成本低、收益高。

**3. [#9732](https://github.com/AstrBotDevs/AstrBot/issues/9732) [CLOSED] [Plugin] astrbot_plugin_futaloli | 评论 2**
> 插件审核 Issue，作者提交 `FutaLoli 图库` 插件，支持 `/futaloli` 命令与 LLM 翻图库工具。
**分析：** 属常规插件生态上新，已快速关闭，说明插件审核流程运转正常。

### 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue | 状态 | 描述 | 是否有 Fix PR |
|---|---|---|---|---|
| **P0 - 安全** | [#9275](https://github.com/AstrBotDevs/AstrBot/issues/9275) `audit: prioritized security, reliability, and release findings` | **已关闭** | AI 生成的全栈审计报告，覆盖 FastAPI 认证授权、插件沙箱、Vue 前端、GitHub Actions 供应链等。基于 `d98a29600` 的系统性风险盘点。 | 已闭环，部分问题由 [#9473](https://github.com/AstrBotDevs/AstrBot/pull/9473) 等 PR 修复 |
| **P1 - 功能不可用** | [#9741](https://github.com/AstrBotDevs/AstrBot/issues/9741) `[Bug] 移动端 WebUI 人格设定不显示创建文件夹/搜索` | **OPEN** | `v4.27.3` Dashboard 人格设定页，移动端浏览器（Via）下“创建文件夹”按钮与搜索框消失，PC 端正常。疑为响应式布局 CSS 断点问题。 | **暂无**，待认领 |
| **P1 - 服务中断风险** | [#9729](https://github.com/AstrBotDevs/AstrBot/issues/9729) `nvidia模型部分嵌入/重排序模型API即将弃用` | **OPEN** | NVIDIA 官方公告 `08/24/2026` 后弃用 AstrBot 默认的 Embedding/Rerank 模型，将导致知识库检索功能中断。建议迁移至 `nemotron-3-embed-1b` / `llama-nemotron-rerank-vl-1b-v2` | **已有** -> [#9750](https://github.com/AstrBotDevs/AstrBot/pull/9750) 已提交修复 |
| **P2 - 逻辑错误** | 隐含 Bug [#9377](https://github.com/AstrBotDevs/AstrBot/issues/9377) | OPEN | 群聊中 `DefaultSessionFilter` 仅以 `unified_msg_origin` 作为会话等待器标识，导致成员 A 注册的等待器被成员 B 的消息误触发。 | **已有** -> [#9753](https://github.com/AstrBotDevs/AstrBot/pull/9753) 待合并 |
| **P2 - UI 缺陷** | - | - | 对话详情弹窗编辑模式下 `90vh` 导致双重滚动条 | **已有** -> [#9752](https://github.com/AstrBotDevs/AstrBot/pull/9752) 待合并 |

> **稳定性总结：** 高优安全与 TG 假死问题已解决，剩余 1 个移动端阻塞性 Bug 需优先处理，1 个第三方 API 弃用风险已出现对应修复，需尽快合并发布以避免 08-24 服务中断。

### 6. 功能请求与路线图信号

| 需求来源 | 内容 | 关联 PR / 信号 | 预测纳入版本 |
|---|---|---|---|
| [#9718](https://github.com/AstrBotDevs/AstrBot/issues/9718) | WebUI 日志关键词搜索 | 暂无 PR，属 `area:webui` 增强 | 极有可能纳入 `v4.28.x`，与近期 WebUI 双滚动条修复[#9752](https://github.com/AstrBotDevs/AstrBot/pull/9752)、侧边栏自定义[#9265](https://github.com/AstrBotDevs/AstrBot/issues/9265) 同属体验优化批次 |
| [#9265](https://github.com/AstrBotDevs/AstrBot/issues/9265) [CLOSED] `支持隐藏 WebUI 侧栏菜单项` | 参考 1Panel 实现可隐藏/排序的自定义侧边栏，支持二级菜单折叠 | 已于今日关闭，未关联 PR，可能转为内部设计或暂缓。体现了用户对 WebUI 信息架构定制化的强烈诉求 | 信号已记录，长期路线图 |
| [#9751](https://github.com/AstrBotDevs/AstrBot/pull/9751) `feat(kb): support pluggable knowledge base retrieval backends` | **架构级新特性**：为插件提供统一的知识库发现与检索契约，允许外部知识库通过稳定接口接入 | 提案中，作者 @lxfight 指出当前插件需通过 Hook 私有集成，缺乏共享标准 | **高概率成为下一 Minor 版本核心特性**，将大幅扩展 AstrBot 作为 AI Agent 底座的生态能力 |
| [#9750](https://github.com/AstrBotDevs/AstrBot/pull/9750) `fix: update deprecated NVIDIA retrieval models` | 将默认模型更新为 `nvidia/nemotron-3-embed-1b` | 紧急适配性 Feature，与 [#9729](https://github.com/AstrBotDevs/AstrBot/issues/9729) 强绑定 | **必入下一 Patch**，否则 08-24 后开箱即失败 |

### 7. 用户反馈摘要

1.  **插件生态信任是痛点：** [#9687](https://github.com/AstrBotDevs/AstrBot/issues/9687) 的 13 条评论中，开发者对“搬运/缝合”行为容忍度极低，呼吁官方加强商店抄袭检测与 `README` 署名强制校验。
2.  **移动端体验仍是短板：** [#9741](https://github.com/AstrBotDevs/AstrBot/issues/9741) 用户通过三组对比截图（Via 普通模式/电脑模式/Edge PC）精准复现问题，说明核心用户已在移动端重度使用 Dashboard 进行人格管理，对响应式适配要求提升。
3.  **运维可观测性需求浮现：** [#9718](https://github.com/AstrBotDevs/AstrBot/issues/9718) 反映用户在生产环境排障时，缺乏日志检索与过滤能力，目前只能人肉翻页。
4.  **对第三方依赖敏感度高：** [#9729](https://github.com/AstrBotDevs/AstrBot/issues/9729) 用户主动预警上游模型弃用，并给出明确替代型号，体现社区对“开箱即用”稳定性的高期待。

### 8. 待处理积压

**需维护者优先关注：**

1.  **待合并 PR 堆积 4 个，建议加速 Review：**
    *   [#9750](https://github.com/AstrBotDevs/AstrBot/pull/9750) `NVIDIA 模型更新` - **最紧急**，距弃用仅剩 3 天，建议 24h 内合并并发布 Hotfix。
    *   [#9753](https://github.com/AstrBotDevs/AstrBot/pull/9753) `修复群聊会话等待器串扰` - 逻辑 Bug 修复，`size:S`，风险低，建议优先合并。
    *   [#9751](https://github.com/AstrBotDevs/AstrBot/pull/9751) `可插拔知识库后端` - 架构设计类 PR，需核心成员进行 API 设计评审，避免后续 Breaking Change。
    *   [#9752](https://github.com/AstrBotDevs/AstrBot/pull/9752) `修复双重滚动条` - 纯前端修复，可快速合入。

2.  **待响应 OPEN Issues 3 个：**
    *   [#9741](https://github.com/AstrBotDevs/AstrBot/issues/9741) 移动端 Bug 已有清晰复现，需分配 `area:webui` 负责人。
    *   [#9718](https://github.com/AstrBotDevs/AstrBot/issues/9718) 日志搜索建议已讨论 5 轮，可标记为 `enhancement` 并纳入迭代池。
    *   [#9729](https://github.com/AstrBotDevs/AstrBot/issues/9729) 虽有 PR，但在 PR 合并前应给予用户官方回应，安抚弃用焦虑。

3.  **长期积压已显著缓解：** 7月创建的 [#9265](https://github.com/AstrBotDevs/AstrBot/issues/9265)、[#9275](https://github.com/AstrBotDevs/AstrBot/issues/9275) 均于今日关闭，说明维护团队正在系统性清理历史债务，值得肯定。

---
*数据来源：GitHub API | 生成时间：2026-08-21 | 关注 AstrBot 核心分支 `master` 进展*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*