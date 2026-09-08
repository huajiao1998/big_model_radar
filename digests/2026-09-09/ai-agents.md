# OpenClaw 生态日报 2026-09-09

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-08 23:44 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 (2026-09-09)

## 1. 今日速览
OpenClaw 在昨日发布 `v2026.9.3` 后，社区活跃度维持高位，过去 24 小时共产生 1000 条 Issues/PR 更新，显示用户基数正在迅速扩大并伴随高频使用。当前主要挑战集中在**升级稳定性**与**消息交付可靠性**两大核心痛点，特别是 `v2026.9.2` 引发的多处回归（如 Windows 网关启动失败、回复快照丢失）。团队响应迅速，今日合并/关闭了大量 P0/P1 级修复 PR，项目正处在从“功能迭代”向“稳定性攻坚”转型的关键阶段。

## 2. 版本发布
**最新发行版：v2026.9.3**
*   **核心亮点**：引入更安全的更新机制，支持在隔离的候选状态中排练核心及插件变更，支持从 2026.9.2 迁移，并能在不中断健康网关的情况下恢复废弃的更新记录。
*   **关联 Issue**：#136997, #138839, #141109, #141175, #1415...
*   **迁移注意**：针对此前版本（如 2026.9.2）中存在的更新挂起问题提供了自动化恢复路径，建议受影响用户优先升级。

## 3. 项目进展
今日重点推进了以下修复与功能完善：
*   **诊断与修复工具优化**：#142669 和 #142675 优化了 `doctor --fix` 流程，避免了重复的数据库扫描和不相关的诊断干扰，提升了修复效率。
*   **UI/UX 体验修复**：
    *   #142634：修复了 macOS 原生应用中 `Cmd+W` 快捷键误关闭整个窗口的问题。
    *   #142674：恢复了 Control UI 在 macOS 上的文本编辑快捷键（Control+B/F/K）。
    *   #142422：防止了历史记录加载后出现重复的最终回复显示。
*   **Agent 与流程稳定**：
    *   #137576：修复了云工作区同步期间用户输入被错误中断的问题。
    *   #141268：确保了 Chat Completions 端点能正确传递 `length` 停止原因，而非自然停止。
    *   #134995：改进了 cron 自动化列表的可见性披露，修复了权限隔离问题。
*   **扩展支持**：
    *   #142679：Crabbox 插件现在支持在 Windows (WSL2) 上注册云 worker。
    *   #142678：修复了 IMAP 插件在处理纯 HTML 邮件时的解析崩溃。

## 4. 社区热点
以下 Issue 评论活跃，反映了用户的高频痛点：

*   **#44925 [Bug] Subagent completion silently lost** (26 条评论, diamond lobster)
    *   **摘要**：子代理在超时等故障模式下静默丢失结果，无重试、无通知。这是多代理编排场景下的严重数据丢失风险。
    *   **链接**：https://github.com/openclaw/openclaw/issues/44925

*   **#135111 [Bug] Provider completed tool call with malformed JSON arguments** (23 条评论, platinum hermit)
    *   **摘要**：2026.8.1 版本的回归问题，导致 Claude Sonnet 5 随机调用工具时参数 JSON 解析失败。
    *   **链接**：https://github.com/openclaw/openclaw/issues/135111

*   **#137813 [CLOSED] Windows gateway never starts after 2026.9.1 update** (12 条评论)
    *   **摘要**：Windows 用户在升级至 2026.9.1 后网关无法启动，`--task-supervisor` 标志静默退出。已关闭，可能已被 v2026.9.3 的更新机制修复。
    *   **链接**：https://github.com/openclaw/openclaw/issues/137813

*   **#87109 [Bug] Gateway heap grows to 1073MB+ at idle** (9 条评论)
    *   **摘要**：macOS 上 Gateway 空闲时内存持续增长至 1GB+，导致 cron 任务因内存压力静默失败。
    *   **链接**：https://github.com/openclaw/openclaw/issues/87109

*   **#135704 [Bug] iMessage reflections with reply_to_guid bypass the echo cache** (8 条评论)
    *   **摘要**：iMessage 的回复反射未被回声缓存正确拦截，可能导致消息重复处理。
    *   **链接**：https://github.com/openclaw/openclaw/issues/135704

## 5. Bug 与稳定性
今日报告及关注的重点 Bug 如下：

1.  **P0 - Windows 升级阻塞**：
    *   **#136203**：2026.8.2 升级到 2026.9.x 后，Doctor 维护被阻塞，遗留工作区状态混乱。
    *   **#141617**：npm 更新后卡在 requested/running 状态，支持修复无效。
2.  **P1 - 2026.9.2 回归问题**：
    *   **#141252 / #139847**：回复操作因缺少 "active tool authority snapshot" 而失败，导致消息丢失。
    *   **#142037**：嵌入式运行时将特定 Slack 消息工具回复记录为 "mute"，导致路由错误。
    *   **#140455**：Google Meet 集成在 2026.9.2 中出现 circular-JSON 崩溃及音频路由问题。
3.  **P1 - 进程与资源泄漏**：
    *   **#97616**：Hook/工具子进程泄漏导致僵尸进程积累，运行时性能下降。
    *   **#136311**：Memory-core 在每次启动时重新获取重索引锁，导致索引无法重建，产生大量临时文件。
4.  **其他 Bug**：
    *   **#136183**：命令执行器在等待 SSH banner 时挂起（2026.8.1 回归）。
    *   **#142530 [CLOSED]**：Telegram 动画/视频贴纸接收后为空消息体。
    *   **#142336**：Core /dashboard 在 2026.9.2+ 中遮挡了 Telegram Mini App 启动器。

*注：部分 Bug 已有相关 PR 推进修复（如 #137813 已关闭，#142678 修复 IMAP 解析）。*

## 6. 功能请求与路线图信号
*   **#96675**：**所有者签名责任门禁** —— 请求为助手记忆、动作和技能复用增加所有者确认门禁，增强安全性和可控性。
*   **#60602**：**多 Agent 成本归因** —— 请求为 Amazon Bedrock 请求注入 `requestMetadata`，以支持多代理场景下的精确成本分摊。
*   **#138279**：**Linux ARM64 官方构建** —— 用户呼吁提供 .deb 和 AppImage 格式的 aarch64 构建，目前仅 amd64 支持完善。
*   **#46058**：**Android 聊天优先界面** —— 社区成员独立开发了 Android 分支，探索轻量级移动端交互方式，虽不直接合并，但可作为路线图参考。

## 7. 用户反馈摘要
*   **升级体验极差**：多位用户（#137813, #136203, #141617, #133984）反映从旧版本（尤其是 2026.7.x 到 2026.9.x）升级后，网关无法启动或处于挂起状态，且 `doctor --fix` 无法自动恢复。这是当前最大的用户不满来源。
*   **消息丢失不可接受**：Telegram (#44925, #126246)、iMessage (#135704) 和 Slack (#142037) 的消息静默丢失或重复处理问题频繁出现，严重影响了作为 AI 助手的核心信任度。
*   **内存占用过高**：macOS 用户（#87109）指出 Gateway 在空闲状态下内存膨胀至 1GB+，导致定时任务失败。
*   **反馈渠道阻塞**：Telegram 动态子代理在运行时无活体状态或终止通知（#101656），用户无法感知代理是否还在工作，造成“黑洞”体验。

## 8. 待处理积压
*   **#115642 [P0] Billing cooldown outlives the outage**：Anthropic 计费冷却期过长（~5小时），且缺乏手动重置命令，影响生产环境可用性。
*   **#140908 [P0] doctor --fix EACCES on systemd --user**：在 systemd 用户服务账户下，医生修复命令因权限问题完全失效，阻塞了所有升级后的迁移流程。
*   **#115367 [P1] Provider-owned read gate requires `origin: bundled`**：随着渠道插件转为外部插件，原有的读取权限门禁导致所有特权聊天表面（Slack/Discord等）的读取功能被锁定在当前对话。
*   **#139485 [P1] Managed upgrade leaves gateway offline**：OCM 管理的环境在从 2026.9.1 升级到 2026.9.2 时，网关停在后处理阶段离线，需人工快照回滚。

---
*报告生成时间：2026-09-09*
*数据源：GitHub OpenClaw Repository*

---

## 横向生态对比

# 2026-09-09 开源 AI 智能体生态横向分析报告

## 1. 生态全景
个人 AI 助手与自主智能体开源生态正从“功能快速堆叠”转向“稳定性攻坚与架构收敛”的关键阶段。OpenClaw、hermes-agent 和 QwenPaw 等头部项目均面临升级回归、会话状态管理及多代理可靠性等共性挑战，表明该领域已进入生产化深水区。同时，底层基础设施（如文件系统沙箱、成本归因、WASM 扩展）正在成为各平台竞争的差异化焦点，社区对可观测性、多模态交互稳定性和跨设备协作的需求显著上升。

## 2. 各项目活跃度对比

| 项目 | 新增 Issues (24h) | 新 PR / 更新 (24h) | 版本发布 | 健康度评估 |
| :--- | :---: | :---: | :---: | :---: |
| **OpenClaw** | ~1000 (含更新) | 大量 P0/P1 修复 | v2026.9.3 | ⚠️ **高风险**：高频迭代伴随严重回归，正处于稳定性重整期 |
| **hermes-agent** | 356 | 500 | 无 | 🟢 **极高**：社区参与热情高涨，维护响应迅速，但深层架构债待还 |
| **QwenPaw** | 30 | 45 | v2.2.1-beta.1 | 🟡 **活跃**：新版本引发集中反馈，修复节奏快，但存在上下文丢失风险 |
| **Zeroclaw** | 18 | 50 (47待合并) | 无 | 🟢 **高**：架构 RFC 讨论深入，进入设计收敛期 |
| **DeepSeek Harness** | N/A (Disc 130) | N/A | v0.1.5-alpha.1 | 🟡 **中高**：发布带来迁移阵痛，Windows/兼容性问题突出 |
| **AstrBot** | 10 | 17 | 无 | 🟢 **良好**：聚焦边界 Case 清理，稳健演进 |
| **PicoClaw** | 5 | 8 | 无 | 🟡 **中等**：Config 层 Bug 修复为主，长尾 PR 积压较多 |

## 3. OpenClaw 在生态中的定位
*   **规模与影响力**：OpenClaw 是目前生态中用户基数最大、Issue/PR 绝对数量最高的项目，处于**流量与问题中心**。其 `v2026.9.3` 的发布策略显示出向企业级交付靠拢的决心，但同时也承受了最大的回归压力。
*   **技术路线差异**：相比 Zeroclaw 的严格 RFC 治理和 hermes-agent 的 Desktop/Cron 深度集成，OpenClaw 更侧重于**通用网关能力**与**多平台适配**（Windows/macOS/Linux/WSL）。其社区痛点（如消息静默丢失、升级阻塞）反映了大规模多代理编排下的典型工程挑战。
*   **生态位**：它是**通用型个人 AI 助手**的参考实现，适合追求功能全面性和多通道支持的开发者，但需容忍较高的维护成本和稳定性波动。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求与现状 |
| :--- | :--- | :---|
| **会话状态与上下文一致性** | OpenClaw, QwenPaw, hermes-agent, AstrBot | OpenClaw (`#44925`) 和 QwenPaw (`#7579`) 均报告子代理/模型回复在上下文中意外丢失；AstrBot (`#9321`) 关注后台任务结果推送。这是当前最大的信任危机点。 |
| **多代理编排可靠性** | OpenClaw, hermes-agent, Zeroclaw | OpenClaw 强调子代理超时静默丢失；hermes-agent 推进 Per-task Profile Routing (`#103965`)；Zeroclaw 设计 Composable WASM 插件运行时 (`#10076`)。 |
| **成本归因与计量** | OpenClaw, Zeroclaw, DeepSeek Harness | OpenClaw (`#60602`) 和 Zeroclaw (`#10700`, `#10718`) 均请求按对话/会话隔离成本；DSH 提供 Token 用量与缓存命中统计。 |
| **Prompt Caching 优化** | Zeroclaw, DeepSeek Harness | Zeroclaw (`#10674`) 指出历史修剪破坏 Prompt Caching 导致成本激增；DSH 支持动态系统提示词更新以无损 KV Cache。 |
| **多模态/富媒体交互** | OpenClaw, PicoClaw, AstrBot | 各方均在修复 Telegram/iMessage 的图片、视频及引用丢失问题，显示多模态已成为必争之地。 |
| **自动化与 Cron 稳定性** | hermes-agent, AstrBot, OpenClaw | hermes-agent (`#100401`) 和 AstrBot (`#9980`) 均报告定时任务状态误报或死锁；OpenClaw 修复 cron 可见性权限。 |

## 5. 差异化定位分析

*   **OpenClaw**：**全能型网关**。优势在于广泛的渠道覆盖（Telegram, iMessage, Slack, Google Meet 等）和成熟的 Windows/macOS 桌面体验。目标是成为“所有设备的 AI 中枢”，但牺牲了部分升级平滑性。
*   **hermes-agent**：**深度集成的桌面伴侣**。强项在于 Linux/Desktop 环境下的 Cron 调度、Skills Hub 生态以及与 NousResearch 自家模型的深度整合。适合技术型用户和重度自动化工具链使用者。
*   **Zeroclaw**：**架构严谨的实验场**。以高标准的 RFC 流程和模块化设计著称，专注于运行时安全（沙箱）、文件架构和成本计量。适合关注长期可维护性和安全隔离的高级开发者。
*   **QwenPaw**：**模型能力导向**。依托 AgentScope 生态，强调多模型路由、本地模型支持（llama.cpp/MLX）及插件商店。适合希望灵活切换后端模型和探索多智能体协作的用户。
*   **DeepSeek Harness (DSH)**：**代码代理先锋**。深度集成 Codex 和 Claude Code 子代理，侧重编程辅助和会话迁移。适合开发者群体，但 API 变更频繁带来迁移负担。
*   **AstrBot**：**中文生态友好**。在 QQ 频道、微信等平台有良好支持，注重插件钩子和 WebChat 体验。适合国内社交场景下的 AI 助手部署。
*   **PicoClaw**：**轻量级边缘终端**。关注 Config 安全和移动端/远程 Agent 配对，可能面向资源受限或特定硬件场景。

## 6. 社区热度与成熟度

*   **快速迭代/质量攻坚期**：**OpenClaw**, **hermes-agent**, **QwenPaw**。这三个项目 issue 量巨大，Bug 密集涌现，显示功能正在快速扩张的同时，底层稳定性尚未完全巩固。特别是 OpenClaw，正处于从“能用”到“好用”的痛苦转型期。
*   **架构收敛/设计主导期**：**Zeroclaw**。活跃度适中，但讨论集中在 RFC 和架构设计上，表明项目已进入深思熟虑的演进阶段，代码合并谨慎，质量把控较严。
*   **稳定维护/ niche 深耕期**：**AstrBot**, **DeepSeek Harness**, **PicoClaw**。这些项目问题量相对可控，聚焦于特定场景（中文社交、编程代理、边缘设备）的体验优化和 Bug 修复，成熟度较高但创新速度相对放缓。

## 7. 值得关注的趋势信号

1.  **“静默失败”成为最大信任杀手**：多个项目（OpenClaw `#44925`, QwenPaw `#7579`, AstrBot `#9980`）都出现了任务完成但结果丢失、状态误报的问题。未来的核心竞争力将取决于谁能提供更可靠的**可观测性**和**失败恢复机制**。
2.  **成本精细化计量成为标配**：Zeroclaw (`#10718`) 和 OpenClaw (`#60602`) 都在强化按会话/代理的成本追踪。随着 LLM 调用成本透明化，用户将对“谁花了多少钱”有更高要求。
3.  **Prompt Caching 与历史修剪的博弈**：Zeroclaw (`#10674`) 和 DSH (`v0.1.5`) 的举措表明，如何在保持上下文完整性的同时优化缓存命中率，是降低 API 成本的关键技术点。
4.  **多模态消息的完整性争夺**：Telegram 图片/引用丢失问题在 OpenClaw、PicoClaw、AstrBot 中均有报告。完善多模态支持（尤其是富媒体回复）是提升用户粘性的重点。
5.  **跨设备会话连续性需求上升**：hermes-agent (`#97681`) 的 Bot 跨设备恢复和 PicoClaw 的 Remote Agent pairing，反映了用户希望在不同终端无缝切换 AI 助手的强烈意愿。
6.  **插件生态的治理与安全**：Zeroclaw 的独立沙箱 RFC (`#6996`) 和 OpenClaw 的所有者签名门禁请求 (`#96675`)，显示社区对插件安全风险的关注度提升，未来插件市场可能会引入更严格的安全审计机制。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目日报 — 2026-09-09

---

## 1. 今日速览

过去 24 小时 Zeroclaw 项目保持**高活跃度**：18 条新 Issue、50 条 PR 更新（47 待合并、3 已合并）、0 个新版本发布。架构层面推进节奏最快，`#9487`（运行时会话与传输适配器）与 `#9488`（统一文件/附件架构）分别处于 Revision 5 和 Revision 10，均标记 `risk:high`。维护者决策队列 `#8692` 继续运行，RFC 投票流程优化 `#10549` 也已进入讨论。稳定性方面，**历史修剪与 prompt caching 的冲突**成为今日焦点，`#10674`（P1）触发了 `#10700`、`#10701`、`#10702` 等连锁报告，预计会有针对性修复 PR 跟进。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

### 今日合并/关闭的 PR（3 条）

| PR | 摘要 | 影响 |
|---|---|---|
| [#10718](https://github.com/zeroclaw-labs/zeroclaw/pull/10718) [CLOSED] `feat(cost): attribute ledger records to the chat conversation` | 将费用账本记录按对话会话关联，部分解决 `#10700` 提出的 daemon 生命周期 session_id 问题 | **成本追踪精度提升**，但 trace 关联仍开放 |
| [#10719](https://github.com/zeroclaw-labs/zeroclaw/pull/10719) [CLOSED] `fix(providers): preserve tool image references through normalization` | 工具返回的图片引用在转换为 provider payload 时保留原始绝对路径或 URL | **多模态兼容性修复**，避免图片丢失上下文 |
| [#10717](https://github.com/zeroclaw-labs/zeroclaw/pull/10717) [CLOSED] `Feat/native security and helpers v2` | 原生安全模块 v2 增强，涵盖工具调用与内存后端的权限校验 | **安全加固**，与 `#9977` 文件系统限域协同 |

### 重点进行中的 PR

- **[#10450](https://github.com/zeroclaw-labs/zeroclaw/pull/10450)** — Webhook 聊天轮次支持 SSE 流式传输，`POST /webhook` 新增 `stream: true` 选项，对网关层是重要能力补充。
- **[#9724](https://github.com/zeroclaw-labs/zeroclaw/pull/9724)** — 修复 `always_ask` 在 Full Autonomy 模式下失效的问题，维护者已重新整理分支。
- **[#9977](https://github.com/zeroclaw-labs/zeroclaw/pull/9977)** — 将文件系统变更限制在授权工作区内，防止 symlink 逃逸。
- **[#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621)** — 协调 Agent 生命周期变更的集中式配置权威，减少独立快照的竞态。
- **[#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)** — 支持单个 provider profile 下配置多个模型，降低多模型部署复杂度。
- **[#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819)** — 像素级图片验证，防止损坏图片导致 provider 请求失败。

> **整体评估**：3 个 PR 已合并，贡献集中在成本追踪、图像引用保留和安全模块；架构 RFC 与多个高影响 PR 仍在评审中，项目向**更严格的安全隔离**和**更精细的成本计量**两个方向明确推进。

---

## 4. 社区热点

### 讨论最活跃的 Issues

| Issue | 类型 | 评论数 | 摘要 | 热度分析 |
|---|---|---|---|---|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | RFC | 35 | Runtime-owned 会话与传输适配器架构 | 核心架构迭代，Revision 5，维护者主导 |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | RFC | 28 | 统一文件/附件架构 | 与 `#9487` 配套，讨论深入 |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | RFC | 26 | 细粒度沙箱策略——文件系统限制 | 安全需求强烈，`Bubblewrap`/`Landlock`/`Seatbelt` 多后端支持 |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | Tracker | 15 | 维护者 RFC 决策队列 | 治理机制迭代，反映社区对流程透明度的关注 |
| [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) | RFC | 11 | Composable WASM 插件运行时 | 扩展性路线，技术深度高 |
| [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) | RFC | 6 | PR 审查证据与加速合并通道 | 流程优化，与 `#10549` 呼应 |
| [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) | RFC | 5 | 简化 RFC 投票流程 | 降低参与门槛，社区呼声较高 |
| [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) | RFC | 5 | 追加型会话事件历史与确定性重放 | 可观测性核心能力 |

**热点分析**：社区注意力高度集中在**架构 RFC**（会话管理、文件架构、WASM 插件）和**治理流程**（投票简化、决策队列）。这表明项目已从早期功能建设期进入**架构收敛期**，维护者与核心贡献者正在主导系统性设计。`#10549` 和 `#10366` 共同指向一个诉求：**降低参与门槛，提高贡献反馈效率**。

---

## 5. Bug 与稳定性

### 按严重程度排列

#### 🔴 P1 — 工作流阻塞 / 高风险

| Issue | 描述 | Fix PR 状态 |
|---|---|---|
| [#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674) | 历史修剪在达到 `max_history_messages` 上限时停止，导致工具密集型会话每几轮就重新修剪，**破坏 prompt caching 效果** | 尚无独立 fix PR，与 `#10701`、`#10702` 关联 |
| [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) | ACP 转换失败后切换会话再返回，**失败的整个 turn 消失**（S1 严重度） | 无关联 PR |
| [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) | Telegram 批量媒体消息被 gateway 感知为多个独立请求，导致 agent 输出多条消息 | 无关联 PR |

#### 🟡 P2 — 功能性缺陷

| Issue | 描述 | Fix PR 状态 |
|---|---|---|
| [#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700) | 费用记录携带 daemon 生命周期 session_id，无法按对话分离支出 | **部分修复**：PR `#10718` 已合并（账本关联），trace 关联仍开放 |
| [#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701) | 含图片的用户消息使整个历史 cache prefix 失效，而非仅新消息 | 无关联 PR |
| [#10702](https://github.com/zeroclaw-labs/zeroclaw/issues/10702) | Token 预算修剪器与消息数修剪器有相同的"停在第一个适合边界"问题 | 无关联 PR |
| [#10667](https://github.com/zeroclaw-labs/zeroclaw/issues/10667) | ZeroCode 可能在 prompt 完成早于 TurnComplete 时**重复渲染流式响应** | 无关联 PR |

#### 🟢 P3 — 低优先级

| Issue | 描述 |
|---|---|
| [#10702](https://github.com/zeroclaw-labs/zeroclaw/issues/10702) | Token 预算修剪 hysteresis gap（同时标记 P3） |

> **稳定性总结**：今日 Bug 报告呈现**链式反应**特征——`#10674`（历史修剪逻辑缺陷）引发了 `#10700`/`#10701`/`#10702` 三个衍生问题。项目组应优先处理 `#10674` 的根本修复，以一并解决 prompt caching 失效和费用追踪不准的问题。

---

## 6. 功能请求与路线图信号

| 需求 | Issue/PR | 纳入下一版本可能性 | 依据 |
|---|---|---|---|
| 会话事件历史的追加型设计与确定性重放 | [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) / PR `#10526` | **高** | 核心 RFC，`#10076`（WASM 插件）与其配套，作者 @NiuBlibing 是 principal contributor |
| 运行时拥有的会话与传输适配器 | [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | **高** | Revision 5，material replacement，架构关键路径 |
| 统一文件/附件架构 | [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | **高** | Revision 10，讨论最深入的 RFC 之一 |
| 单 provider 多模型配置 | [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) | **中高** | PR 已就绪待合并，实用性强 |
| Webhook SSE 流式 | [#10450](https://github.com/zeroclaw-labs/zeroclaw/pull/10450) | **中高** | 网关层能力补充，已有实现 |
| 上下文压缩基于模型窗口比例 | [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) | **中** | 解决 `#10674` 的根源，与历史修剪优化关联 |
| Telegram 被动群组上下文 | [#10715](https://github.com/zeroclaw-labs/zeroclaw/issues/10715) | **中** | 新功能请求，评论 0，尚早 |
| 多 Agent 侧边栏监控 | [#9727](https://github.com/zeroclaw-labs/zeroclaw/issues/9727) | **中** | ZeroCode UI 增强，用户呼声存在 |
| Cron 逐字段调度输入 | [#10641](https://github.com/zeroclaw-labs/zeroclaw/issues/10641) | **低** | UX 改进，非核心能力 |
| Anthropic extended thinking 透传 | [#10605](https://github.com/zeroclaw-labs/zeroclaw/pull/10605) | **中高** | 多模态与推理能力增强，PR 进行中 |

**路线图判断**：下一版本将围绕**架构收敛**（会话管理、文件架构、WASM 插件）和**稳定性加固**（prompt caching 修复、费用追踪完善）两个主轴推进。功能性增强（多模型、SSE、thinking passthrough）作为辅助优先级。

---

## 7. 用户反馈摘要

### 真实痛点

1. **Prompt Caching 被历史修剪破坏**（`#10674`、`#10701`）：工具密集型会话中，用户反复遇到"刚建立缓存命中，下一轮又被截断"的问题，导致**实际 API 成本显著高于预期**。这是目前社区抱怨最集中的技术问题。

2. **费用记录无法按对话隔离**（`#10700`）：`costs.jsonl` 中所有记录共享同一个 daemon 生命周期 session_id，用户无法回答"这个会话花了多少钱"的基本问题。PR `#10718` 部分解决，但完整 trace 关联仍需跟进。

3. **ACP 失败 turn 消失**（`#9333`）：用户已看到工具调用和执行结果，但因 provider 错误导致 turn 失败，切换会话后**所有痕迹消失**，造成严重的操作焦虑和调试困难。

4. **Telegram 多图消息拆分**（`#5514`）：用户发送多个图片期望获得一次综合响应，但 gateway 将其视为多次独立请求，agent 输出多条碎片化回复。

5. **ZeroCode 流式响应重复**（`#10667`）：UI 层可能出现同一 assistant 消息渲染两次的视觉 bug，影响使用体验。

### 正面反馈（间接）

- RFC 讨论的透明度和参与度较高，`#9487` 35 条评论、`#9488` 28 条评论反映社区对架构决策的深度参与意愿。
- 维护者对 PR 的响应较快（如 `#9724` 维护者 note 明确 credit 原贡献者），协作文化健康。

---

## 8. 待处理积压

### 需维护者重点关注

| Issue/PR | 状态 | 风险 | 建议 |
|---|---|---|---|
| [#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674) | P1，无 fix PR | 🔴 高 | 根本性修复历史修剪逻辑，影响 prompt caching 和成本 |
| [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) | P1，无 fix PR | 🔴 高 | ACP 失败 turn 消失影响用户体验和调试 |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | RFC in-progress | 🟡 中 | 沙箱策略 RFC 长期讨论，需推进决策 |
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | RFC Rev 5 | 🟡 中 | 架构核心 RFC，投票重启需谨慎 |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | RFC Rev 10 | 🟡 中 | 与 `#9487` 配套，需同步推进 |
| [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) | RFC | 🟡 中 | WASM 插件架构，影响扩展性路线 |
| [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) | RFC | 🟢 低 | 投票流程简化，社区呼声高，可较快决策 |
| [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) | RFC | 🟢 低 | PR 审查流程优化，与 `#10549` 协同 |

### 长期未合并的 PR

| PR | 创建时间 | 阻塞原因 |
|---|---|---|
| [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) Hailo-Ollama 支持 | 2026-07-17 | 标记 `do-not-merge`，可能待维护者评估 |
| [#9212](https://github.com/zeroclaw-labs/zeroclaw/pull/9212) Replay 回归测试 CI 门禁 | 2026-07-20 | 标记 `status:blocked` |
| [#10241](https://github.com/zeroclaw-labs/zeroclaw/pull/10241) 恢复 supervised shell 审批路由 | 2026-08-22 | 标记 `status:blocked`，安全相关需慎重 |

---

**报告生成时间**：2026-09-09  
**数据来源**：github.com/zeroclaw-labs/zeroclaw  
**分析师**：Agnes (Sapiens AI)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-09-09 | 数据来源：github.com/sipeed/picoclaw**

---

## 1. 今日速览

PicoClaw 今日保持中等活跃度：24小时内新增5个Issues（4开/1关）和8个PR（7开/1关），无新版本发布。社区贡献者@sting8k集中提交了2个Config层面的Bug及对应修复PR，暴露出配置缓存并发安全和多API Key持久化两个关键缺陷。Telegram渠道的reply处理修复PR（#3356/#3357）显示项目正在改善多模态消息体验。整体健康度：**良好**——Bug发现及时、修复PR同步跟进，但存在多个stale标记的长期未响应PR需关注。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

### 今日合并/关闭的重要PR

| PR | 状态 | 作者 | 进展说明 |
|----|------|------|----------|
| [#714](https://github.com/sipeed/picoclaw/pull/714) | ✅ CLOSED | @seanly | skills安装/重装CLI重构完成，支持repo@branch和可选子路径，production install改用GitHub Trees API |

### 推进中的关键PR

| PR | 类型 | 作者 | 进展说明 |
|----|------|------|----------|
| [#3375](https://github.com/sipeed/picoclaw/pull/3375) | 🐛 fix | @sting8k | 修复Config.sensitiveCache懒加载无同步问题，guard sync.Once防并发init |
| [#3372](https://github.com/sipeed/picoclaw/pull/3372) | 🐛 fix | @sting8k | 修复reaction tool配置路径缺失，添加ToolsConfig.IsToolEnabled专用分支 |
| [#3356](https://github.com/sipeed/picoclaw/pull/3356) | 🐛 fix | @hugodeco | 修复Telegram reply时quoted document丢失问题，重新attach媒体引用 |
| [#3357](https://github.com/sipeed/picoclaw/pull/3357) | 🐛 fix | @hugodeco | 修复Telegram mention_only模式下reply被静默忽略问题 |
| [#3371](https://github.com/sipeed/picoclaw/pull/3371) | ✨ feat | @EMTumariscal | 新增opencode-go provider，支持session header和自动模型路由 |
| [#3344](https://github.com/sipeed/picoclaw/pull/3344) | ✨ feat | @LinespottingPrivate | 新增Build Remote Agent pairing-device adapter，支持gbr/1协议 |

**项目整体向前推进：** Config安全性增强（2个bug+2个fix）、Telegram多模态体验改善（2个fix）、新增OpenCode provider和远程Agent配对功能。

---

## 4. 社区热点

### 最活跃Issue/PR（按评论数）

| 类型 | ID | 标题 | 作者 | 评论 | 👍 | 链接 |
|------|-----|------|------|------|-----|------|
| Issue | #3265 | Gateway启动失败(deltachat channel unknown type) | @Cipher208 | 3 | 1 | [link](https://github.com/sipeed/picoclaw/issues/3265) |
| Issue | #3343 | Tool feedback animation无限edit Telegram消息 | @raine | 3 | 0 | [link](https://github.com/sipeed/picoclaw/issues/3343) |
| PR | #3222 | refactor(deltachat): cleanup -200LOC | @trufae | 0 | 0 | [link](https://github.com/sipeed/picoclaw/pull/3222) |

**热点分析：**
- **#3265**（3评论）：用户反映即使config.json中未配置deltachat，Gateway启动仍报错。这与#3222 PR（deltachat清理重构）相关，可能是在清理过程中引入的回归或配置校验问题。
- **#3343**（3评论）：严重生产问题——tool feedback animation在agent turn停止后仍每3秒调用editMessageText，产生228,000+次编辑尝试，导致Telegram服务端rate limit。反映出动画循环缺乏退出条件和退避机制。
- **#3222**（stale）：长期未响应的deltachat清理PR，减少200行代码但可能影响现有配置兼容性。

---

## 5. Bug 与稳定性

### 今日报告的Bug（按严重程度排列）

| 严重度 | Issue | 标题 | 作者 | 创建 | Fix PR | 链接 |
|--------|-------|------|------|------|--------|------|
| 🔴 **高** | #3343 | Tool feedback animation无限edit Telegram消息，触发rate limit | @raine | 2026-08-22 | 无 | [link](https://github.com/sipeed/picoclaw/issues/3343) |
| 🔴 **高** | #3374 | Data race in Config.initSensitiveCache导致panic | @sting8k | 2026-09-08 | #3375 | [link](https://github.com/sipeed/picoclaw/issues/3374) |
| 🟠 **中** | #3373 | SaveConfig静默删除api_key，留下dangling fallback | @sting8k | 2026-09-08 | #3372（部分） | [link](https://github.com/sipeed/picoclaw/issues/3373) |
| 🟠 **中** | #3355 | 连接飞书报错(config.json contains unknown field) | @ttghub | 2026-09-01 | 无 | [link](https://github.com/sipeed/picoclaw/issues/3355) |
| 🟡 **低** | #3265 | Gateway启动失败(deltachat channel unknown type) | @Cipher208 | 2026-07-19 | 无（已关闭） | [link](https://github.com/sipeed/picoclaw/issues/3265) |

**Bug分析：**
- **#3343**（最高严重）：生产环境rate limit风险，缺乏退避和退出条件的动画循环。需添加max attempts、exponential backoff、turn completion检测。
- **#3374/#3373**（今日新增）：Config层面的并发安全和数据持久化问题，@sting8k已提交对应fix PR（#3375/#3372）。
- **#3355**：飞书配置字段校验问题，可能是在配置schema更新过程中引入的向后兼容性问题。

---

## 6. 功能请求与路线图信号

### 今日提出的功能需求

| 类型 | ID | 标题 | 作者 | 链接 | 路线图判断 |
|------|-----|------|------|------|-----------|
| PR | #3371 | 新增opencode-go provider | @EMTumariscal | [link](https://github.com/sipeed/picoclaw/pull/3371) | ✅ **高优先级**——多provider扩展，自动模型路由 |
| PR | #3344 | 新增Build Remote Agent pairing | @LinespottingPrivate | [link](https://github.com/sipeed/picoclaw/pull/3344) | ✅ **中优先级**——phone/desktop跨设备协作 |
| PR | #3356 | Telegram reply re-attach quoted documents | @hugodeco | [link](https://github.com/sipeed/picoclaw/pull/3356) | ✅ **高优先级**——多模态消息体验修复 |
| PR | #3357 | Telegram reply as implicit mention | @hugodeco | [link](https://github.com/sipeed/picoclaw/pull/3357) | ✅ **高优先级**——对话连续性修复 |

**路线图信号：**
1. **多Provider扩展**：opencode-go provider（#3371）显示项目正在扩展LLM后端支持，可能纳入下一版本。
2. **跨设备协作**：gbr/1协议remote agent pairing（#3344）支持phone spectate desktop agent，符合移动化趋势。
3. **多模态体验**：Telegram document reply修复（#3356/#3357）显示对富媒体消息支持的重视。
4. **Config安全性**：sensitive cache并发修复（#3375）和reaction tool配置（#3372）反映对配置管理层面的加固。

---

## 7. 用户反馈摘要

### 真实用户痛点

| 痛点 | 来源 | 用户场景 | 情绪 |
|------|------|----------|------|
| Telegram reply被静默忽略 | #3343, #3357 | 用户在群聊中reply到bot消息，bot未识别为mention，对话中断 | 😠 **不满** |
| Document reply丢失媒体引用 | #3356 | 用户reply到带附件的消息，只收到`[file]`占位符而非实际媒体 | 😠 **不满** |
| Gateway启动报未知channel类型 | #3265 | config.json未配置deltachat但仍报错，启动失败 | 😠 **不满** |
| Tool animation无限循环触发rate limit | #3343 | agent turn停止后animation仍每3秒edit消息，产生228,000+次请求 | 😡 **愤怒** |
| 飞书配置字段校验错误 | #3355 | 连接飞书时报unknown field，配置schema不匹配 | 😠 **困惑** |
| Config保存静默删除api_key | #3373 | LoadConfig→SaveConfig往返后多api_key只剩第一个，数据丢失 | 😡 **愤怒** |

### 用户满意点
- **无明确满意反馈**在今日Issues中体现，但PR #714（skills CLI重构）获得合并，显示对开发者体验改进的认可。

---

## 8. 待处理积压

### 长期未响应的重要Issue/PR

| 类型 | ID | 标题 | 作者 | 创建 | 天数 | 链接 | 建议 |
|------|-----|------|------|------|------|------|------|
| PR | #3222 | refactor(deltachat): cleanup -200LOC | @trufae | 2026-07-03 | **68天** | [link](https://github.com/sipeed/picoclaw/pull/3222) | 审查合并或关闭，避免stale堆积 |
| Issue | #3265 | Gateway启动失败(deltachat channel) | @Cipher208 | 2026-07-19 | **52天** | [link](https://github.com/sipeed/picoclaw/issues/3265) | 已关闭但需确认根因 |
| PR | #3344 | Build Remote Agent pairing (gbr/1) | @LinespottingPrivate | 2026-08-23 | **18天** | [link](https://github.com/sipeed/picoclaw/pull/3344) | 需maintainer审查协议设计 |
| Issue | #3343 | Tool animation无限edit（生产rate limit） | @raine | 2026-08-22 | **19天** | [link](https://github.com/sipeed/picoclaw/issues/3343) | **紧急**——需添加退避和退出条件 |
| Issue | #3355 | 飞书配置字段错误 | @ttghub | 2026-09-01 | **9天** | [link](https://github.com/sipeed/picoclaw/issues/3355) | 需确认配置schema兼容性 |

### 维护者行动建议

1. **紧急**：审查#3343（tool animation无限循环），添加max attempts和exponential backoff，避免生产rate limit。
2. **高优先级**：合并#3375/#3372（Config并发安全和reaction配置修复），今日已提交fix PR。
3. **中优先级**：审查#3356/#3357（Telegram多模态修复），改善对话连续性。
4. **低优先级**：清理#3222（deltachat重构）stale PR，68天未响应需决定合并或关闭。
5. **社区**：回应#3355（飞书配置），确认是schema变更还是用户配置错误。

---

## 附录：项目健康度指标

| 指标 | 今日值 | 评估 |
|------|--------|------|
| Issue关闭率 | 1/5 = 20% | ⚠️ 偏低 |
| PR合并率 | 1/8 = 12.5% | ⚠️ 偏低 |
| Bug:Fix PR比例 | 2/5 = 40% | ✅ 良好 |
| Stale PR数量 | 3个（#3222, #3344, #3356/#3357） | ⚠️ 需关注 |
| 新增Contributor | @sting8k（2个bug+2个fix PR） | ✅ 积极 |
| 生产影响Bug | 1个（#3343 rate limit） | 🔴 需紧急处理 |

**总体评估：** 项目保持活跃开发节奏，今日贡献者@sting8k快速响应Config层面Bug并提交修复PR，显示良好的维护响应能力。但Telegram动画无限循环（#3343）和长期stale PR（#3222）需维护者优先处理。多模态体验修复（Telegram document reply）和provider扩展（opencode-go）显示项目正朝着更完善的渠道支持和后端多样性方向演进。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：** 2026-09-09  
**数据来源：** GitHub (agentscope-ai/QwenPaw)  
**分析师：** Agnes (Sapiens AI)

## 1. 今日速览
QwenPaw 项目在 v2.2.0 正式版发布后进入高频迭代期，过去 24 小时 Issues 活跃度高达 30 条，PR 提交 45 条，显示出极强的社区参与度和维护响应速度。今日发布了 **v2.2.1-beta.1**，重点修复了代理模型路由配置及会话流式同步等关键问题。项目整体健康度良好，但伴随新版本发布，涌现出一批关于模型上下文丢失、嵌入式健康检查超时及 UI 渲染异常的集中反馈，需关注潜在稳定性风险。

## 2. 版本发布
**v2.2.1-beta.1** 已发布 (Issue #7635)
*   **核心更新：**
    *   `feat`: 新增 Agent 模型路由设置 (#7501)。
    *   `docs`: 更新 v2.2.0 网站文档 (#7517)。
    *   `fix(chat)`: 修复流式传输期间已解决会话不同步的问题。
*   **迁移注意：** 这是一个 Beta 版本，建议生产环境用户谨慎升级。由于涉及模型路由变更，部署前请检查 `config.json` 中的路由配置兼容性。

## 3. 项目进展
今日合并/关闭了多项关键 PR，显著提升了系统的健壮性和用户体验：
*   **稳定性修复：**
    *   **#7610** (Closed): 修复聊天提交绕过队列的问题，确保异步状态管理的一致性。
    *   **#7598** (Closed): 修复 Windows 下 Shell 工具子进程继承控制台 stdin 导致挂起的问题。
    *   **#7627** (Closed): 修复 MCP  legacy handshake 在遇到 401 时的回退逻辑，兼容仅支持旧协议的端点。
    *   **#7502** (Closed): 重设计 Console 侧边栏和设置体验，优化导航结构。
*   **功能增强：**
    *   **#7605** (Closed): 优化插件商店，支持一键更新和批量更新通知 (#7582)。
    *   **#7482** (Closed): 为 Agent Kanban 添加中英文本地化支持。
*   **待合并高价值 PR：**
    *   **#7636** & **#7621**: 修复 PDF DataBlock 在文本-only 模型请求中的兼容性，解决 OpenAI 兼容接口的 400 错误。
    *   **#7632**: 修复未知斜杠命令的反馈缺失问题，提供拼写建议。

## 4. 社区热点
*   **🔥 Issue #7579 (Open, 8 评论): [Bug] 模型的回复意外从上下文中丢失**
    *   **描述：** 用户报告助手回复已持久化，但在后续请求中模型“看不到自己刚说的话”，导致空响应。
    *   **分析：** 这是 v2.2.0 可能引入的严重回归，直接影响核心对话功能。评论区高度活跃，疑似与流式同步或会话状态管理有关（参考 PR #7501 的路由变更）。
*   **🔥 Issue #7589 (Open, 4 评论): Heartbeat cron session feedback loop**
    *   **描述：** 心跳定时会话导致消息堆积和重复，Agent 无响应约 2 小时。
    *   **分析：** 高严重程度 Bug，涉及内部调度机制，可能影响长时间运行的生产环境 Agent。
*   **💬 Issue #7615 (Open, 3 👍): 第三方插件/Skill 讨论渠道**
    *   **描述：** 用户询问插件问题的讨论场所，官方引导至 AgentScope 平台社区。
    *   **分析：** 反映出插件生态系统正在扩大，用户对社区支持渠道的需求增加。

## 5. Bug 与稳定性
| 严重等级 | Issue/PR | 问题摘要 | 状态/Fix |
| :--- | :--- | :--- | :--- |
| **High** | [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) | 模型回复在上下文中意外丢失 | Open |
| **High** | [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) | 同步调用阻塞事件循环，timeout 失效 | Open (自 8/27) |
| **High** | [#7625](https://github.com/agentscope-ai/QwenPaw/issues/7625) | Gemini 模型后台工具完成后返回 400 | Open |
| **Medium** | [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) | Tool 返回图片/PDF base64 触发 400 错误 | Closed (via #7636/#7621) |
| **Medium** | [#7622](https://github.com/agentscope-ai/QwenPaw/issues/7622) | v2.2.0 后台弹窗背景透明/遮罩失效 | Open |
| **Medium** | [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) | llama.cpp 新版号解析失败导致静默回滚 | Open |
| **Low** | [#7619](https://github.com/agentscope-ai/QwenPaw/issues/7619) | Windows 11 + qwen-35B-A3B-FP8 对话无故结束 | Open |

*注：Issue #7597 相关的 PDF/图片处理 Bug 已有 PR #7636 和 #7621 进行修复，预计在下个补丁版本中解决。*

## 6. 功能请求与路线图信号
*   **Per-Session Model Overrides:** PR #5992 提议支持每个会话独立覆盖模型选择，当前处于 Review 阶段。这满足了多模型协作场景的需求，若合并将大幅增强灵活性。
*   **OpenViking Memory Backend:** PR #7613 新增 OpenViking 长期记忆后端，扩展了 ReMe 的记忆存储选项。
*   **Community Integration:** Issue #7583 呼吁增加与 AgentScope 社区的联动（登录、信箱、快速反馈），反映用户希望打通本地与云端生态的愿望。
*   **Context Compaction Optimization:** Issue #7628 建议优化上下文压缩预算，使其基于完整的 provider 请求而非仅当前可见内容，以提升长对话效率。

## 7. 用户反馈摘要
*   **痛点：**
    *   **上下文一致性：** 多个用户报告 v2.2.0 后出现上下文断裂、回复丢失问题，对 Beta 版本的稳定性表示担忧。
    *   **插件管理繁琐：** Issue #7582 指出插件安装和更新操作复杂，缺乏一键更新和通知机制（已在 PR #7605 中修复）。
    *   **环境变量与兼容性：** Issue #7630 反映虚拟机/云桌面因 CPU 检测无法启动；Issue #7618 报告 QQ 频道群聊机器人无响应。
    *   **UI 渲染问题：** Issue #7622 指出弹窗遮罩失效，影响视觉体验。
*   **满意点：**
    *   维护者对 Issue 的响应速度极快，许多问题在 24 小时内得到关注或修复。
    *   新发布的 v2.2.1-beta.1 针对性地修复了路由和会话同步问题，显示团队对反馈的重视。

## 8. 待处理积压
*   **Issue #7363 (Open since Aug 27):** 同步调用阻塞事件循环问题长期未解，可能影响大规模并发场景，建议优先排查。
*   **Issue #7589 (Open):** Heartbeat 反馈循环导致 Agent 无响应，涉及核心调度逻辑，需深入测试。
*   **PR #5992 (Under Review):** 单个会话模型覆盖功能长期处于 Review 状态，积压时间较长，建议加速审核流程以满足用户需求。

---
*本报告由 Agnes 生成，基于 GitHub 公开数据，数据截止至 2026-09-09。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：** 2026-09-09  
**数据来源：** GitHub API (NousResearch/hermes-agent)

---

## 1. 今日速览

今日项目保持**极高活跃度**，24小时内新增 Issues 356 条、PR 500 条，社区参与热情高涨。无新版本发布，但修复与功能迭代密集进行，尤其集中在 Desktop 体验优化、Cron 调度稳定性及会话状态管理。整体健康度良好，但伴随高并发问题也暴露出部分深层架构隐患（如 WAL 分裂、内存泄漏），需持续关注。

---

## 2. 版本发布

- **无新版本发布。**

---

## 3. 项目进展

### 今日合并/关闭的重要 PR

| PR | 类型 | 描述 |
|----|------|------|
| [#106082](https://github.com/NousResearch/hermes-agent/pull/106082) | Bug Fix | 修复 WhatsApp 临时消息引用文本丢失问题（`ephemeralMessage` 包裹时 quotedText 为空） |
| [#106029](https://github.com/NousResearch/hermes-agent/pull/106029) | Bug Fix | 修复 Desktop Fleet 模式下默认 Profile 在下拉菜单中不可达的问题 |
| [#104893](https://github.com/NousResearch/hermes-agent/pull/104893) | Bug Fix | 修复 systemd 无用户 D-Bus 会话时 cron agent 全部失败的问题（P1 严重性） |
| [#105235](https://github.com/NousResearch/hermes-agent/pull/105235) | Feature | 流式 TTS 首次句子独立调优（已合并至 #96933） |
| [#87093](https://github.com/NousResearch/hermes-agent/issues/87093) | Bug Closed | Debian 安装脚本失败问题已解决（uv.lock & npm install） |

**项目推进评估：** 今日修复主要集中在边缘场景和平台兼容性，对生产环境稳定性有直接提升。性能优化类 PR（如 #85850、#106134、#106132）正在逐步落地，有助于长期维护。

---

## 4. 社区热点

### 讨论最活跃的 Issues（按评论数排序）

1. **[Skills 索引老化问题](https://github.com/NousResearch/hermes-agent/issues/66616)** — 180 条评论
   - 自动化新鲜度探针失败，索引超时 29.8h（限制 26h）
   - 用户广泛关注 Skills Hub 可靠性

2. **[自动化 Nous 集成阻塞](https://github.com/NousResearch/hermes-agent/issues/88584)** — 78 条评论
   - cron/jobs.py 合并冲突导致持续失败
   - 影响 Enterkey dashboard 更新流程

3. **[Bot 群聊桌面关闭后持续运行](https://github.com/NousResearch/hermes-agent/issues/97681)** — 27 条评论
   - 功能请求：支持跨设备会话恢复
   - 高优先级（P2），涉及 session state 和 message delivery 风险

4. **[Debian 安装 broken](https://github.com/NousResearch/hermes-agent/issues/87093)** — 25 条评论（已关闭，4 👍）
   - 安装脚本在 Debian 13.6 上失败
   - 社区验证修复有效

5. **[Windows 更新后报告 FAILED](https://github.com/NousResearch/hermes-agent/issues/105145)** — 14 条评论
   - `hermes update` 成功后仍报 exit 8
   - 工作目录解析错误导致

### 讨论最活跃的 PRs

1. **[Native Kanban Workflow Aggregates](https://github.com/NousResearch/hermes-agent/pull/75281)** — 大型功能 PR
   - 持久化工作流聚合、确定性重放、完整性检查
   - 潜在影响面广（sweeper: blast-moderate）

2. **[Per-task Hermes Profile Routing](https://github.com/NousResearch/hermes-agent/pull/103965)**
   - 支持子 agent 按任务路由到不同 profile（模型/主机/状态库隔离）
   - 满足多 persona 场景需求

3. **[Claude Agent SDK Provider](https://github.com/NousResearch/hermes-agent/pull/65982)**
   - 官方 Agent SDK 作为一等公民运行时
   - 订阅 OAuth + fail-closed 计费模式

---

## 5. Bug 与稳定性

### 高优先级 Bug（P0-P1）

| Issue | 严重程度 | 描述 | Fix PR |
|-------|----------|------|--------|
| [#104596](https://github.com/NousResearch/hermes-agent/issues/104596) | P1 | state.db WAL 单进程内分裂崩溃（btreeInitPage error 11） | 未关闭 |
| [#100401](https://github.com/NousResearch/hermes-agent/issues/100401) | P1 | cron fire-claim 心跳死锁，导致 >60s 任务被误杀 | 未关闭 |
| [#104893](https://github.com/NousResearch/hermes-agent/issues/104893) | P1 | systemd 无 D-Bus 会话时 cron 全部失败 | ✅ #104893 已合并 |
| [#105145](https://github.com/NousResearch/hermes-agent/issues/105145) | P1 | Windows 更新后工作目录解析错误 | 未关闭 |
| [#53004](https://github.com/NousResearch/hermes-agent/issues/53004) | P1 | Projects 范式破坏 folder → session → sidebar 流程 | 未关闭 |
| [#52261](https://github.com/NousResearch/hermes-agent/issues/52261) | P1 | 本地 MLX/oMLX 400 错误被误判为 context_overflow，触发破坏性压缩循环 | 未关闭 |

### 中等优先级 Bug（P2）

- [#90663](https://github.com/NousResearch/hermes-agent/issues/90663) — TUI Ink 在 Ghostty 中小写替换大写（已关闭）
- [#94769](https://github.com/NousResearch/hermes-agent/issues/94769) — Desktop UI 持续闪烁（WS 重连循环每 2-5s）
- [#77311](https://github.com/NousResearch/hermes-agent/issues/77311) — Renderer 内存无界增长（5GB  fleet  footprint）
- [#82874](https://github.com/NousResearch/hermes-agent/issues/82874) — SIGTERM 时 MCP 关闭死锁事件循环（已关闭）
- [#91130](https://github.com/NousResearch/hermes-agent/issues/91130) — drive_preview 在分数 DPR 显示上点击偏移 ~20%
- [#100105](https://github.com/NousResearch/hermes-agent/issues/100105) — Scheduler 路径拼接缺少分隔符（间歇性 exit 127）

**稳定性评估：** WAL 分裂和心跳死锁是最高风险问题，可能影响生产环境数据完整性和任务执行。内存泄漏问题（#77311）在重度使用场景下尤为突出。

---

## 6. 功能请求与路线图信号

### 高价值功能请求

| Issue/PR | 需求描述 |  roadmap 可能性 |
|----------|----------|-----------------|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) / [#105197](https://github.com/NousResearch/hermes-agent/pull/105197) | Bot Group Chat 跨设备恢复 | ⭐⭐⭐ 高（已有 Draft PR） |
| [#103965](https://github.com/NousResearch/hermes-agent/pull/103965) | 每任务 Profile 路由（模型/主机隔离） | ⭐⭐⭐ 高（多 persona 场景刚需） |
| [#26277](https://github.com/NousResearch/hermes-agent/issues/26277) | Email 会话按标准化主题隔离 | ⭐⭐ 中（可选模式） |
| [#523](https://github.com/NousResearch/hermes-agent/issues/523) | 本地模型配置 Skill（Ollama/llama.cpp/vLLM） | ⭐⭐ 中（社区贡献驱动） |
| [#65982](https://github.com/NousResearch/hermes-agent/pull/65982) | Claude Agent SDK 作为一等公民运行时 | ⭐⭐⭐ 高（官方 SDK 集成） |
| [#75281](https://github.com/NousResearch/hermes-agent/pull/75281) | Native Kanban Workflow Aggregates | ⭐⭐⭐ 高（工作流核心能力） |

**路线图信号：** 项目正强化多实例部署能力（profile 路由、Group Chat 恢复）、完善工作流抽象（Kanban aggregates）、并加深与官方 SDK 的集成。

---

## 7. 用户反馈摘要

### 真实痛点

1. **安装与升级体验不佳**
   - Debian/Windows 安装脚本存在路径和验证问题
   - 用户反馈：*"Windows desktop-driven `hermes update` always reports FAILED after successful update"* (#105145)

2. **本地推理资源误判**
   - MLX/oMLX 400 错误被误分类为 context_overflow，触发破坏性压缩循环
   - 用户反馈：*"misclassified as `context_overflow` → destructive compress/reset loop"* (#52261)

3. **TUI 输入异常**
   - Ghostty 终端 Shift+ 字母被小写化
   - Linux 终端数字键显示控制序列 `^[[57400u` (#89157)

4. **Desktop 性能问题**
   - Renderer 内存无界增长（5GB+ footprint）
   - UI 闪烁（WebSocket 重连循环）
   - 语言设置不持久化（pt-BR 重启后变英文）(#26665)

5. **Cron 调度可靠性**
   - 心跳死锁导致长任务被误杀
   - 路径拼接错误导致间歇性失败
   - systemd 无 D-Bus 时全部失败

### 用户满意点
- 快速响应的社区维护者（多个 issue 在 1-2 天内得到反馈）
- 清晰的 sweeper 风险评估标签
- 自动化工具（如 nousbot-eng）持续监控指标

---

## 8. 待处理积压

### 长期未响应的重要 Issue

| Issue | 创建日期 | 天数 | 风险等级 | 建议行动 |
|-------|----------|------|----------|----------|
| [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) Skills 索引老化 | 2026-07-18 | 53 天 | 中 | 检查 cron 工作流执行日志 |
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) Nous 集成阻塞 | 2026-08-17 | 23 天 | 中 | 解决 cron/jobs.py 合并冲突 |
| [#53004](https://github.com/NousResearch/hermes-agent/issues/53004) Projects 范式破坏流程 | 2026-06-26 | 75 天 | 高 | 回归测试 folder → session 流程 |
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) Kanban blocked 任务自动 promotion | 2026-06-05 | 96 天 | 高 | 调查 human approval gate bypass |
| [#77311](https://github.com/NousResearch/hermes-agent/issues/77311) Renderer 内存泄漏 | 2026-08-03 | 37 天 | 高 | 审查 session store 内存管理 |
| [#52261](https://github.com/NousResearch/hermes-agent/issues/52261) 本地推理错误误判 | 2026-06-25 | 76 天 | 高 | 修复 provider 错误分类逻辑 |
| [#104596](https://github.com/NousResearch/hermes-agent/issues/104596) WAL 单进程分裂 | 2026-09-06 | 3 天 | 极高 | 紧急修复，数据完整性风险 |
| [#100401](https://github.com/NousResearch/hermes-agent/issues/100401) Cron 心跳死锁 | 2026-09-01 | 8 天 | 极高 | 紧急修复，任务执行可靠性风险 |

### 待合并 PR

- [#75281](https://github.com/NousResearch/hermes-agent/pull/75281) — Kanban Workflow Aggregates（影响面广，需充分测试）
- [#103965](https://github.com/NousResearch/hermes-agent/pull/103965) — Per-task Profile Routing（架构变更，需验证向后兼容）
- [#65982](https://github.com/NousResearch/hermes-agent/pull/65982) — Claude Agent SDK Provider（依赖 #65978/#72002）

---

**报告生成时间：** 2026-09-09  
**分析师：** Agnes (Sapiens AI)

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期：2026-09-09**

## 1. 今日速览
AstrBot 项目在过去 24 小时内保持高度活跃，共处理 **10 个新 Issue** 和 **17 个 PR** 更新。无新版本发布，但核心稳定性与用户体验优化进展显著：修复了定时任务状态误报、WebChat 子代理结果推送及 TTS 流式输出等关键缺陷。社区贡献者积极性高涨，多名新成员参与 Bug 修复，项目整体健康度良好，重点正向“长流程任务可靠性”与“多平台交互流畅性”演进。

## 2. 版本发布
无新版本发布（Release: 0）。

## 3. 项目进展
今日合并/关闭的 PR 主要集中在核心稳定性与功能完善：

*   **TTS 流式输出修复**（已合并 #9982/#9985 → 可能已整合至 #9986）：解决了当启用流式输出时 TTS 语音回复失效的问题，提升了语音交互场景的完整性。
*   **QQ 官方平台 Markdown 渲染修复**（#7895, #7883 已关闭）：修复了主动发送消息时 Markdown 格式未正确渲染的回归问题，统一了 payload 结构。
*   **插件钩子绑定修复**（#9976）：修复了插件子模块中注册的钩子（如 `on_decorating_result`）未被正确绑定的问题，直接对应 Issue #9938，增强了插件开发的健壮性。

**整体推进**：项目在本日重点清理了历史遗留的边界 Case（如子代理状态传播、钩子注册失效），为后续复杂 Agent 编排场景奠定了更稳定的基础。

## 4. 社区热点
以下 Issues/PRs 获得了较高关注或反映了广泛诉求：

*   **#9980 [Bug] 定时任务 Active Agent 重复调用工具且状态误报**
    *   [链接](https://github.com/AstrBotDevs/AstrBot/issues/9980)
    *   **分析**：用户反馈 cron 任务在失败后仍显示 `completed`，导致用户体验严重误导。这是长周期后台任务可靠性的核心痛点，已有修复 PR **#9987** 跟进，预计即将合并。
*   **#9321 [Bug] WebChat 子代理后台结果不自动推送**
    *   [链接](https://github.com/AstrBotDevs/AstrBot/issues/9321)
    *   **分析**：涉及 WebChat 交互体验的关键缺陷，用户希望子代理任务完成后能主动通知。PR **#9322** 已提出通过轮询历史消息实现自动显示的方案，反映用户对“异步任务同步反馈”的强烈需求。
*   **#9968 [Feature] 插件支持按 Bot 隔离配置**
    *   [链接](https://github.com/AstrBotDevs/AstrBot/issues/9968)
    *   **分析**：多 Bot 部署场景下的精细化配置需求。当前仅支持按档案启用/停用插件，无法实现同一插件在不同 Bot 使用不同参数，是进阶用户的长期诉求。

## 5. Bug 与稳定性
按严重程度排列的重要 Bug：

1.  **【高】定时任务状态机错误** (#9980)：`AgentState.ERROR` 被错误记录为 `completed`，掩盖真实故障。**状态：已有 Fix PR #9987**。
2.  **【高】WebChat 子代理结果丢失** (#9321)：后台任务完成后结果未推送至当前对话，需手动刷新或重发消息才能查看。**状态：已有 Fix PR #9322**。
3.  **【中】TTS 与流式输出冲突** (#9982/#9986)：启用流式响应时语音合成完全失效。**状态：已通过 PR #9982/#9985 修复**。
4.  **【中】插件钩子绑定失败** (#9938)：子模块注册的 `on_decorating_result` 钩子因缺少 `event` 参数而报错。**状态：已通过 PR #9976 修复**。
5.  **【低】WebUI 日志页面卡顿** (#9988)：进入日志页面高概率出现 7~10 秒无响应，影响管理体验。**状态：待处理**。
6.  **【低】Tool Call 旁白破坏角色扮演沉浸感** (#9929)：工具调用时的“旁白式”输出干扰角色设定。**状态：待处理**。

## 6. 功能请求与路线图信号
*   **多语言指令支持**：PR **#9984** 提出插件运行时指令的 i18n 支持（`/lang`、`desc_i18n` 等），解决插件生态中文/英文指令不统一的问题，有望纳入下一版本以提升国际化体验。
*   **Gemini 内置工具兼容性修复**：PR **#9978** 修复了 Gemini 内置工具调用时的 400 错误，表明项目正积极适配主流模型提供商的最新 API 变更。
*   **ScitiX 提供商预设**：PR **#9981** 新增 ScitiX 作为内置 OpenAI 兼容提供商，反映用户对新兴/小众模型聚合平台的需求。
*   **图片格式自适应**：PR **#9703** 实现发送前自动转换图片格式（如 GIF 转 Contact Sheet）以适配不同 Provider，减少 Token 浪费并提升兼容性。

## 7. 用户反馈摘要
*   **痛点**：
    *   “定时任务看起来成功了但实际没完成” — 用户（@camera-2018）指出状态误报导致排查困难。
    *   “后台子代理做完事我都不知道” — 用户（@CMKH1337）反映 WebChat 缺乏结果主动推送机制。
    *   “角色扮演时 AI 突然说‘我在查历史’很出戏” — 用户（@x1051445024）批评工具调用的旁白破坏沉浸感。
*   **满意点**：
    *   多 Bot 隔离配置的呼声高涨（#9968），说明当前架构已满足基础多租户需求，用户期待更细粒度的控制。
    *   对 QoS 优化（如日志分页 #9667、图片压缩）的欢迎，体现用户对性能和成本控制的关注。

## 8. 待处理积压
以下 Issue 需维护者关注：
*   **#9988 [Bug] WebUI 日志页面高概率卡顿**：影响管理界面可用性，建议优先调查前端性能瓶颈。
*   **#9929 [Bug] Tool call announcements break role-play immersion**：影响 CCG/RP 场景体验，需评估是否在 Prompt 层或输出层过滤此类旁白。
*   **#9968 [Feature] 插件按 Bot 隔离配置**：功能需求明确，但实现复杂度较高（涉及核心路由逻辑），建议评估是否纳入中长期路线图。
*   **#7620 [Enhancement] 失败时保存本轮记录**：有助于调试和断点续传，但默认关闭以防历史污染，需权衡用户体验与存储开销。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：** 2026-09-09  
**分析对象：** [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

## 1. 今日速览
DeepSeek Harness 于今日发布 **v0.1.5-alpha.1**，核心突破在于支持显式声明模型的动态系统提示词更新（KV Cache 无损），并引入实验性右侧 Sidebar 以提升多任务交互体验。社区活跃度极高，过去24小时 Discussions 新增 **130 条**，围绕插件生态、会话迁移兼容性及 Windows 平台稳定性展开热烈讨论。v0.1.5 通过升级会话存储格式至 V3 及调整 Agent/Inbox API，标志着项目从早期迭代向更稳定的生产级架构过渡，但版本跨度带来的迁移风险需引起用户注意。

## 2. 版本发布
**版本：** [dsh-v0.1.5-alpha.1](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.1.5-alpha.1)

**核心更新摘要：**
*   **功能新增：**
    *   支持动态修改系统提示词且不破坏 KV Cache（需模型显式声明支持）。
    *   新增实验性右侧 Sidebar，支持多标签、分栏与全屏模式，集成聊天文件链接与产出文件查看。
    *   子代理插件内置运行时升级至 Codex 0.153.4 和 Claude Code 2.1.263。
*   **体验优化：**
    *   Web 输入框菜单层级、提示文字及间距优化；会话统计拆分为“轮次与速度”、“Token 用量与缓存命中”两个可展开摘要。
    *   内置斜杠命令说明支持中文即时更新。
*   **破坏性变更与迁移注意事项：**
    *   **会话格式升级至 V3：** 恢复历史会话时将生成新版日志（保留原文件），系统提示词纳入消息历史，旧 PTC 事件自动迁移。**注意：升级后的会话不支持降级读取，自定义日志读取器需适配新格式。**
    *   **插件 Agent API 调整：** 移除 `ctx.agent`，调用方需显式传递 Agent；修正子代理归属逻辑。
    *   **Inbox API 调整：** `Inbox` 改为类型接口，不再导出可构造的运行时类；`hasPending` 与 `claim` 不再是公共接口。

## 3. 项目进展
基于 v0.1.5-alpha.1 Changelog，本次发版合并了以下关键改进：
*   **架构稳定：** 修复了 macOS/Linux 依赖 `fs-ext` 需本地编译的问题，降低了环境搭建门槛。
*   **交互一致性：** 统一了会话运行中发送按钮与 Enter 键的行为，解决了此前“繁忙时发送行为”不一致的 UX 痛点。
*   **错误处理健壮性：** 修复了折叠思考摘要直接显示 Markdown 加粗标记的问题，以及查找项目根目录时因权限/I-O 错误导致误用上级指令的逻辑缺陷。
*   **边界情况修复：** 明确拒绝不含正文或附件的空消息及空白队列编辑，同时保留了仅发送图片或文件的能力，防止无效请求占用资源。

## 4. 社区热点
过去24小时 Discussions 更新 130 条，以下议题热度最高：

1.  **[Bug Report] Windows 平台无法从源代码运行 (node-gyp 失败)**
    *   **链接:** [#5638](https://github.com/deepseek-ai/deepseek-harness/discussions/5638)
    *   **亮点:** 9 评论。用户反馈在 Windows 下 `pnpm install` 构建 `fs-ext` 时失败。**关联修复：** v0.1.5 已修复 macOS/Linux 的 `fs-ext` 编译问题，Windows 端仍需关注后续兼容性更新。
2.  **[Idea] OpenCode Go API 请求头要求**
    *   **链接:** [#5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)
    *   **亮点:** 21 评论。OpenCode Go 团队要求自 09/05 起必须携带 `x-opencode-session` header，否则报错。反映了第三方 API 提供商对会话路由优化的需求，DSH 需跟进适配。
3.  **[Plugin] DSH 插件市场 (mydsh.dev) 生命周期管理**
    *   **链接:** [#2687](https://github.com/deepseek-ai/deepseek-harness/discussions/2687)
    *   **亮点:** 19 评论。社区插件市场完成生产化改造，支持装/启/停/卸分离管理，展现了活跃的第三方生态。
4.  **[Bug] 包族 npm dist-tag `latest` 不一致导致 ERESOLVE**
    *   **链接:** [#2763](https://github.com/deepseek-ai/deepseek-harness/discussions/2763)
    *   **亮点:** 16 评论。指出 `@deepseek-ai/dsh-*` 包版本线混乱（`latest` 停留在 `0.0.1-rc.1` 而 `next` 已是 `0.1.0-rc.6`），导致全新项目安装必然冲突。这是影响新用户接入的重大发布配置问题。
5.  **[General] 插件实战指南共建**
    *   **链接:** [#1477](https://github.com/deepseek-ai/deepseek-harness/discussions/1477)
    *   **亮点:** 23 评论。用户自发进行公开测试对比，包括与竞品（如 R...）的基准测试，体现了社区对性能透明的关注。

## 5. Bug 与稳定性
*   **P0 - 会话损坏与迁移失败:**
    *   **讨论 #5909:** 用户报告重复 Tool-Call IDs 导致会话加载失败（blank session）及 v0→v1→v2 迁移失败。
    *   **讨论 #5160:** Alpha 版本写入的 `sourceEventSeqs` 新格式导致 rc.2 加载时抛出 `SessionPersistenceCorruptionError`。这警示了 v0.1.5 升级 V3 格式时的潜在风险，尽管官方已做兼容处理，但存量数据迁移仍需谨慎。
    *   **讨论 #5694:** `failed to observe session` 错误，涉及 v0-to-v1 格式转换中的 `kind` 成员异常。
*   **P1 - Windows/Web UI 稳定性:**
    *   **讨论 #5802:** v0.1.2-rc.1 (Windows) 发送消息即失败 (`Cannot read properties of undefined (reading 'find')`)，疑似会话持久化问题。
    *   **讨论 #5879:** Web UI 中 Windows 中文输入法 (IME) 输入时文字乱码，但粘贴正常。
*   **P2 - 其他 Bug:**
    *   v0.1.5 已修复：聊天中本地图片路径无法显示（支持 POSIX 绝对路径）、模型自行恢复用户暂停目标的问题。

## 6. 功能请求与路线图信号
*   **官方 Docker 镜像支持:** [讨论 #1271](https://github.com/deepseek-ai/deepseek-harness/discussions/1271) (5 评论)。用户痛点在于容器内 `node-gyp` 编译耗时过长（>12分钟）且依赖完整工具链。官方可能考虑预编译镜像或简化部署方案。
*   **定时任务能力:** [讨论 #1563](https://github.com/deepseek-ai/deepseek-harness/discussions/1563) (8 评论)。社区已开发 `dsh-schedule-tasks` 插件实现 cron 功能，反映出用户对“无人值守”自动化场景的强烈需求，未来可能被集成进核心或推荐为官方插件。
*   **对话回退功能:** [讨论 #4592](https://github.com/deepseek-ai/deepseek-harness/discussions/4592) (6 评论)。社区插件 `dsh-rewind` 提供了类似 Claude Code 的 `/rewind` 功能，支持同窗口原地回退，这是提升 UX 的重要方向。

## 7. 用户反馈摘要
*   **满意点：** v0.1.5 引入的 Sidebar 和动态 System Prompt 更新受到技术用户欢迎；插件市场的生命周期管理提升了易用性。
*   **痛点：**
    *   **版本混乱：** `npm dist-tag` 管理不当导致安装困难（#2763）。
    *   **迁移恐惧：** 会话格式升级（V3）及历史版本间的数据兼容性令人担忧，用户担心升级后旧会话不可用。
    *   **平台差异：** Windows 用户在从源码构建和本地化体验（IME 支持）上仍落后于 macOS/Linux。
    *   **API 变更：** 上游 Runtime RPC 重写导致旧版 VSCode/IntelliJ 插件失效（#5739），用户抱怨版本钉死机制缺失。

## 8. 待处理积压
*   **npm 包发布策略清理:** [讨论 #2763](https://github.com/deepseek-ai/deepseek-harness/discussions/2763) 指出的 `latest` tag 滞后问题若未解决，将持续阻碍新用户安装，建议维护者尽快同步各子包的 `latest` 版本。
*   **Windows 构建与 IME 支持:** [讨论 #5638](https://github.com/deepseek-ai/deepseek-harness/discussions/5638) 和 [讨论 #5879](https://github.com/deepseek-ai/deepseek-harness/discussions/5879) 涉及 Windows 平台的底层兼容性问题，需优先跟进以扩大用户群。
*   **OpenCode Header 适配:** [讨论 #5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495) 涉及第三方服务兼容性，需确认是否在 roadmap 中并给出响应时间表。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*