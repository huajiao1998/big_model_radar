# OpenClaw 生态日报 2026-09-08

> Issues: 436 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-09-08 14:01 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报
**日期：2026-09-08**
**数据源：** github.com/openclaw/openclaw

## 1. 今日速览
OpenClaw 今日保持高活跃度，过去24小时共产生 436 条 Issue 更新和 500 条 PR 更新，净增 231 个新问题，同时关闭 205 个旧问题，显示项目处于快速迭代与大量缺陷暴露期。多起 P0/P1 级别的严重 Bug 集中在**子代理执行丢失**、**多代理编排不稳定**、**Telegram/信号渠道消息丢失**以及**版本升级后的 Gateway 不可用**等核心场景。尽管无新版本发布，但维护者团队（如 @steipete, @wuqxuan）正在密集提交修复 PR，主要集中在 CLI、Agent 运行时和 Channel 稳定性方面。项目整体呈现“**问题高密度暴露 + 修复高频率跟进**”的健康维护状态，但用户侧稳定性体验面临挑战。

## 2. 版本发布
**无新版本发布。**

当前主要受影响版本为 `2026.8.1`、`2026.9.1` 和 `2026.9.2`，其中多次升级路径（如 `2026.7.1-2` -> `2026.8.1` 或 `2026.9.1` -> `2026.9.2`）被报告存在严重的配置迁移失败和 Gateway 启动循环问题。

## 3. 项目进展
今日无大规模已合并的巨型功能 PR，但有一批高质量的 **P1/P2 修复和文档更新**正在待合并（Ready for maintainer look）或审查中，主要推进方向如下：

*   **渠道稳定性修复：**
    *   [#142064](https://github.com/openclaw/openclaw/pull/142064): 修复 Gateway 挂起期间的接入重试风暴（Ingress retry loops），防止队列消息在挂起状态下被错误重复处理。
    *   [#138645](https://github.com/openclaw/openclaw/pull/138645): 修复 Telegram 消息工具组中工具最终化占位符泄露为公开消息的问题，提升消息群组体验。
    *   [#118727](https://github.com/openclaw/openclaw/pull/118727): 优化语音通话长 TTS 回复的分块合成，解决因超时导致的回复静默丢失问题。
*   **Agent 与运行时改进：**
    *   [#142168](https://github.com/openclaw/openclaw/pull/142168): 修复长期工具调用轮次中，因 provider 流以 "terminated" 结束而导致最终回复丢失的 Bug。
    *   [#137184](https://github.com/openclaw/openclaw/pull/137184): 性能优化，当历史记录适合摘要窗口时，以单遍处理替代 map-reduce，减少压缩开销。
    *   [#142203](https://github.com/openclaw/openclaw/pull/142203): 修复 Control UI 中，即使助手回复已持久化，会话仍不标记为“未读”的显示错误。
*   **CLI 与运维工具：**
    *   [#142199](https://github.com/openclaw/openclaw/pull/142199): 修复 `openclaw status` 在更新拉取失败后错误显示 "up to date" 的问题，帮助运维人员准确识别状态。
    *   [#141626](https://github.com/openclaw/openclaw/pull/141626): 改进暂停集合审查逻辑，当没有符合条件的 rooted runtime 时正确处理状态。
    *   [#120305](https://github.com/openclaw/openclaw/pull/120305): 新增 `openclaw models auth clear-cooldown` 命令，提供更明确的认证冷却恢复机制。

## 4. 社区热点
以下 Issue 评论数最多，反映用户最强烈的痛点和关注度：

*   **[Bug] 子代理完成结果静默丢失 (#44925)** [26 评论, 🦞 Diamond Lobster]
    *   **链接:** <https://github.com/openclaw/openclaw/issues/44925>
    *   **热点分析:** 这是一个长期存在的严重 Bug，涉及子代理在超时或 E31/E42 等错误下不重试、不通知、不自动重启，导致工作成果静默丢失。用户对此高度关注，因为它直接破坏了多代理编排的可信度。
*   **[Bug] v2026.8.1 间歇性 JSON 参数格式错误 (#135111)** [20 评论, 🐚 Platinum Hermit]
    *   **链接:** <https://github.com/openclaw/openclaw/issues/135111>
    *   **热点分析:** 升级后出现的回归问题，导致 Claude Sonnet 5 的 tool call 经常因 JSON 参数畸形而失败。由于影响频繁且无明显规律，用户焦虑感强。
*   **[Bug] 多代理编排不稳定：并发覆盖与会话锁故障 (#43367)** [14 评论]
    *   **链接:** <https://github.com/openclaw/openclaw/issues/43367>
    *   **热点分析:** 用户报告在并行运行多个代理时，配置被覆盖、会话锁失败以及子工作脱离等问题，指出多代理功能在生产环境中尚不成熟。
*   **[Bug] SQLite 争用导致 Gateway 事件循环停滞 33 秒 (#117262)** [9 评论]
    *   **链接:** <https://github.com/openclaw/openclaw/issues/117262>
    *   **热点分析:** 技术深度较高的性能 Bug，指出 `state/openclaw.sqlite` 存在 3 个并发写入句柄，导致严重的事件循环阻塞。这对高负载用户是重大隐患。
*   **[Bug] Telegram 耐久发送在重启后丢失 (#126246)** [6 评论]
    *   **链接:** <https://github.com/openclaw/openclaw/issues/126246>
    *   **热点分析:** 消息发出但停留在 `send_attempt_started` 状态，重启后无法恢复，导致关键消息永久丢失，严重影响 Telegram 用户的信任。

## 5. Bug 与稳定性
今日报告了大量高严重程度的 Bug，主要集中在**数据丢失**、**消息丢失**和**升级崩溃**：

| 严重程度 | 问题描述 | Issue # | 状态 | 关联 Fix PR |
| :--- | :--- | :--- | :--- | :--- |
| **P0** | Windows 网关更新后无法启动，`--task-supervisor` 静默退出 | #137813 | Closed | - |
| **P0** | `doctor --fix` 在 systemd user service 下因 EACCES 失败，阻塞升级迁移 | #140908 | Open | - |
| **P0** | 中断的转录重写使陈旧历史成为活跃对话（数据一致性风险） | #138965 | Closed | - |
| **P1** | 子代理完成静默丢失，无重试/通知 (#44925) | #44925 | Open | - |
| **P1** | 多代理并发添加/配置导致配置覆盖和会话锁失败 (#43367) | #43367 | Open | - |
| **P1** | SQLite 3 并发写入句柄导致 ~33s 事件循环停滞 (#117262) | #117262 | Open | - |
| **P1** | 升级后 `update_runs` 行永远无法终结，状态卡在 "update in progress" (#139714) | #139714 | Open | - |
| **P1** | Telegram 网络失败后单次尝试即死信，导致消息永久丢失 (#125764) | #125764 | Open | - |
| **P1** | 2026.8.1 升级导致 Gateway 无法启动，`doctor --fix` 自身也失败 (#133984) | #133984 | Closed | - |
| **P1** | SSH 命令执行挂起并 SIGTERM (2026.8.1 回归) (#136183) | #136183 | Open | - |
| **P1** | 内联上下文块 `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` 泄露到 Telegram 可见文本 (#137927) | #137927 | Closed | - |
| **P2** | Google Meet 2026.9.2 中 Agent 语音因 Circular-JSON 崩溃 (#140455) | #140455 | Open | - |
| **P2** | Slack 嵌入运行时将工具回复误记为 "mute"，导致路由错误 (#142037) | #142037 | Open | - |
| **P2** | 升级后 npm 更新卡住，`openclaw status` 无法正常恢复 (#141617) | #141617 | Open | - |

**稳定性总结：** 项目在当前版本（2026.9.x）存在多个影响核心功能（多代理、消息持久化、升级流程）的 P0/P1 级 Bug。特别是**消息丢失**和**升级后服务不可用**是两个最突出的稳定性风险点。

## 6. 功能请求与路线图信号
*   **主人签名的责任门控 (Issue #96675):** 用户请求为助手记忆、动作、技能和证据重用添加可选的“所有者确认门控”，以防止 AI 未经审核就持久化敏感操作。这反映了对**AI 安全和可控性**的强烈需求，可能推动未来版本增加更细粒度的权限控制功能。
*   **Linux aarch64 官方构建 (Issue #138279):** 用户请求提供官方的 Linux ARM64 (deb + AppImage) 构建，目前仅提供 amd64。随着 Apple Silicon 和 ARM 服务器普及，此需求可能促使维护者扩大平台支持范围。
*   **Per-Agent Bedrock 成本归属 (Issue #60602):** 多代理用户希望能在 AWS Bedrock 中按代理分离成本，当前所有调用共享同一 IAM 角色。此功能请求若被采纳，将增强企业级多代理部署的可观测性。
*   **MiniMax M3 视频输入支持 (Issue #98084):** 用户希望利用 MiniMax M3 的原生视频输入能力，需要 OpenClaw 支持视频内容块通过运行时管道。这表明项目正在探索更多多模态模型集成。

## 7. 用户反馈摘要
*   **痛点 1：升级体验极差。** 多名用户报告从 `2026.7.1-2` 升级到 `2026.8.1` 或 `2026.9.x` 后，Gateway 无法启动，且 `doctor --fix` 工具本身失效或产生新的错误（#133984, #137813, #139714, #141617）。用户感到沮丧，因为官方推荐的自愈工具不可靠。
*   **痛点 2：消息静默丢失。** Telegram 和 Signal 渠道的消息在特定条件下（网络瞬断、工具调用后、重启后）会永久丢失且无提示（#44925, #126246, #125764, #101793）。这是影响用户信任的核心问题。
*   **痛点 3：多代理功能不稳定。** 并发运行多个代理时出现配置覆盖、锁竞争和结果丢失（#43367, #126360），用户认为当前多代理编排尚不成熟，难以用于生产环境。
*   **满意点：** 用户对 `openclaw doctor` 工具的持续改进表示认可，尽管有时失效，但其存在表明维护团队重视可维护性。部分 UI 修复（如 WebChat 模型显示 #86174）解决了具体的摩擦点。

## 8. 待处理积压
*   **[#44925](https://github.com/openclaw/openclaw/issues/44925) - Subagent completion silently lost:** 自 2026-03 开放，26 条评论，Diamond Lobster 级别，至今无明确 Fix PR。这是多代理稳定性的基石问题，急需关注。
*   **[#117262](https://github.com/openclaw/openclaw/issues/117262) - SQLite contention 33s stalls:** 自 2026-08 开放，9 条评论，直接影响高负载 Gateway 性能，无 Fix PR。
*   **[#135111](https://github.com/openclaw/openclaw/issues/135111) - Malformed JSON on v2026.8.1:** 自 2026-09-01 开放，20 条评论，高频回归问题，无 Fix PR。
*   **[#126246](https://github.com/openclaw/openclaw/issues/126246) - Telegram durable send lost on restart:** 自 2026-08-19 开放，无 Fix PR，影响消息可靠性。
*   **[#43367](https://github.com/openclaw/openclaw/issues/43367) - Multi-agent orchestration unstable:** 自 2026-03 开放，14 条评论，无 Fix PR，阻碍多代理生产采用。

**建议：** 维护者应优先处理 **#44925**, **#117262**, **#135111** 和 **#126246**，这些问题涉及核心数据一致性和可靠性，且长期未解决，严重影响用户信心。同时，需加强升级路径的测试覆盖，避免 **#133984** 类问题再次发生。

---

## 横向生态对比

# 2026-09-08 个人 AI 助手开源生态横向分析报告

## 1. 生态全景
2026年9月，个人 AI 助手开源生态呈现**“核心平台高负载迭代，垂直工具向模块化演进”**的态势。OpenClaw 和 hermes-agent 作为重型全功能框架，正处于快速迭代后的稳定性攻坚期，重点解决多代理编排、消息可靠性和跨平台兼容等基础设施问题。Zeroclaw 和 PicoClaw 则聚焦于运行时安全性、评估体系及配置健壮性，显示出行业从“功能堆砌”向“工业级可靠性”转型的趋势。QwenPaw 和 AstrBot 作为特定场景优化方案，分别在模型路由灵活性和多 Bot 隔离性上寻求突破。

## 2. 各项目活跃度对比

| 项目 | 24h Issues | 24h PRs | 版本发布 | 活跃特征 | 健康度评估 |
| :--- | :---: | :---: | :--- | :--- | :---: |
| **hermes-agent** | 408 | 500 | v0.21.1 (Patch) | 极高吞吐量，跨平台兼容性修复密集 | ⚠️ 稳定但技术债务积累 |
| **OpenClaw** | 436 (新增231) | 500 | 无 | 高问题暴露率，P0/P1 Bug 集中 | ⚠️ 快速迭代，体验承压 |
| **QwenPaw** | 32 | 42 | v2.2.1-beta.1 | 高强度修复，针对 v2.2.0 兼容性回溯 | ✅ 响应迅速，修复闭环好 |
| **AstrBot** | 9 | 20 | v4.28.0 (Release) | 平稳推进，侧重配置优化与国际化 | ✅ 成熟稳定，发布节奏佳 |
| **Zeroclaw** | 0 | 50 (待合并) | 无 | 贡献活跃但合并冻结，评估体系构建中 | ⚠️ 高产出低收敛，需清理积压 |
| **PicoClaw** | 2 | 7 | 无 | 中等活跃，专注配置安全与新提供商接入 | ✅ 小而美，响应精准 |

## 3. OpenClaw 在生态中的定位
*   **优势**：拥有最大的社区声量和最复杂的功能矩阵（多代理、多渠道、WebChat），是目前生态中的**事实标准参考系**。其 `openclaw doctor` 等运维工具体现了对可维护性的重视。
*   **技术路线差异**：相比 hermes-agent 的 Desktop/Cloud 混合架构，OpenClaw 更偏向于网关（Gateway）为核心的服务器端部署；相比 QwenPaw 的 Python 原生轻量设计，OpenClaw 架构更为厚重，承载了更多历史包袱。
*   **社区规模**：以 400+ Issue/24h 的量级远超其他项目，是生态中**流量最大**的节点，但也因此面临最高的稳定性质疑。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求与现状 |
| :--- | :--- | :--- |
| **消息可靠性与持久化** | OpenClaw, hermes-agent, Zeroclaw, AstrBot | **痛点**：Telegram/Signal 消息丢失、重启后状态不一致。<br>**动态**：OpenClaw 密集修复 P0 级消息丢失；hermes-agent 推进 Telegram 重传机制；Zeroclaw 修复 Slack TLS 问题。 |
| **多代理/多实例隔离** | OpenClaw, AstrBot, QwenPaw | **痛点**：并发时配置覆盖、会话锁故障、插件参数隔离。<br>**动态**：OpenClaw #43367 暴露多代理不稳定；AstrBot #9968 诉求细粒度插件隔离；QwenPaw 推出 Agent 模型路由。 |
| **跨平台兼容性** | OpenClaw, hermes-agent, QwenPaw | **痛点**：Windows/Linux 路径处理、Shell 子进程继承、本地推理错误分类。<br>**动态**：hermes-agent 修复 Windows 编码和 MLX 内存误判；QwenPaw 解决 Shell stdin 竞争。 |
| **评估与质量保障** | Zeroclaw, PicoClaw | **趋势**：引入 Eval 基础设施、回归测试、内存隔离测试，标志着项目向**工业级可用**迈进。 |
| **模型路由与多 Provider** | PicoClaw, AstrBot, QwenPaw | **需求**：单 Provider 多模型配置、免 Key 搜索（Keenable）、多模型上下文管理。 |

## 5. 差异化定位分析

*   **OpenClaw**：**全能型基础设施平台**。适合需要高度定制化、多通道整合及复杂多代理编排的用户。风险在于当前版本的稳定性尚未完全收敛。
*   **hermes-agent**：**桌面友好型全栈 Agent**。强项在于 Desktop 体验、TUI 界面及本地推理（MLX）支持。适合个人用户和本地部署场景，但跨平台一致性仍需打磨。
*   **QwenPaw**：**开发者友好的 Python 原生框架**。强项在于灵活的模型路由、插件管理及与 AgentScope 生态的联动。适合需要深度集成和业务逻辑定制的中高级开发者。
*   **AstrBot**：**多 Bot 运营与管理工具**。强项在于 WebUI、多配置档案（abconf）及主流 IM 平台（QQ/飞书）的快速适配。适合社群运营者和需要多实例隔离的用户。
*   **Zeroclaw**：**极客导向的安全评估框架**。强项在于严谨的 Eval 体系、Webhook 插件化及安全性加固。适合关注代码质量、安全边界和底层运行时控制的开发者。
*   **PicoClaw**：**轻量级配置优化项目**。强项在于解决具体的数据竞争和配置丢失问题，集成新搜索 Provider。适合对现有框架有特定痛点、寻求精细化控制的用户。

## 6. 社区热度与成熟度

*   **快速迭代/磨合期**：
    *   **OpenClaw**：问题高密度暴露，修复高频跟进，处于“成长痛”阶段，稳定性是最大挑战。
    *   **hermes-agent**：高活跃度但存在长期积压 Issue（如 #66616, #53004），反映出社区贡献与维护者消化能力之间的张力。
*   **质量巩固/发布期**：
    *   **QwenPaw**：v2.2.1-beta.1 发布，针对上一版本的兼容性问题进行集中修复，显示出成熟的版本管理意识。
    *   **AstrBot**：v4.28.0 正式 release，节奏稳健，关注点转向配置优化和国际化，进入成熟运营阶段。
*   **重构/蓄力期**：
    *   **Zeroclaw**：50 个 PR 待合并且无 Issue，表明可能处于发布前冻结或大规模重构审查期，短期内可见度较低但技术债务在清理。

## 7. 值得关注的趋势信号

1.  **“静默失败”成为核心反模式**：OpenClaw (#44925, #126246)、PicoClaw (#3373)、AstrBot (#9980) 均报告了结果静默丢失、配置静默删除或状态误报问题。**信号**：未来 AI 智能体框架的竞争焦点将从“能不能做”转向“出错时是否可观测、可恢复”。显式错误处理和审计日志将成为标配。
2.  **多代理编排走向生产级验证**：OpenClaw 和 AstrBot 的多代理/多实例问题被高频提及。**信号**：多代理协作已从概念验证进入实战检验阶段，锁机制、资源隔离和上下文一致性是即将爆发的技术深水区。
3.  **评估体系（Eval）专业化**：Zeroclaw 构建完整 Eval 基础设施，QwenPaw 强调回归测试。**信号**：开源 AI 项目正在借鉴软件工程界的测试驱动开发（TDD）理念，以应对 LLM 非确定性带来的质量波动。
4.  **本地推理与云端的边界模糊**：hermes-agent 的 MLX 支持和 OpenClaw 的本地网关优化。**信号**：用户希望在大模型能力与隐私/成本之间找到平衡，本地-first（Local-First）架构将成为重要分支。
5.  **配置即代码（Config-as-Code）的复杂性**：PicoClaw 的配置竞争问题、OpenClaw 的升级迁移失败。**信号**：随着功能增加，配置系统的健壮性成为系统性瓶颈，类型安全（Type-safe）和迁移工具链的重要性上升。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目日报 | 2026-09-08

## 1. 今日速览
Zeroclaw 项目目前处于**高产出、低收敛**的活跃状态。过去24小时内共有 **50 条 PR** 处于待合并状态，但**无一合并或关闭**，且无新 Issue 报告，表明核心维护者可能正集中进行代码审查或处于发布前的冻结期。社区贡献者活跃度极高，涉及运行时优化、工具链扩展、安全加固及评估系统建设等多个关键领域，整体技术栈正在经历大规模重构与完善。

## 2. 版本发布
*   **无新版本发布。**
*   过去24小时内未检测到新的 Release 标记。

## 3. 项目进展
今日无 PR 被合并，但 **50 个待合并 PR** 显示了显著的推进潜力，主要集中在以下方向：

*   **运行时与工具链核心升级**：
    *   **#10325**: 完成 `tool_elicitation` 功能的最终实现（默认关闭的安全特性）。
    *   **#9809**: 支持单 Provider 配置多模型，大幅提升配置灵活性。
    *   **#10679**: 新增 Keenable 作为 Web 搜索提供商，减少对 DuckDuckGo 的单一依赖。
*   **安全性与稳定性加固**：
    *   **#10337**: 修复 Git 操作的安全漏洞，严格限制允许的根目录。
    *   **#10210**: 修复 agent-browser 子进程无超时限制的问题，防止僵尸进程。
    *   **#10712**: 修正 Slack 等渠道在代理环境下的 TLS 证书信任不一致问题。
*   **评估系统（Eval）体系构建**：
    *   **#9222, #9221, #9244, #9220, #9248, #9245**: 一系列紧密相关的 PR 构建了完整的 Eval 基础设施，包括运行收据、基线回归测试、LLM Judge 评分器及内存隔离测试，标志着项目对质量保障体系的重视达到新高度。
*   **网关与插件生态**：
    *   **#8862 & #10583**: 增强 Webhook 入口控制及文件上传能力，支持 RPC 对等性的文档标记。

## 4. 社区热点
由于 Issues 为 0，今日焦点完全集中在 **PR 讨论** 上。以下是关注度高、影响面广的 PR：

1.  **[feat(runtime)] Pre-turn tool-elicitation hints (#10325)**
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10325)
    *   **分析**: 作为长期设计 #7431 的最终部分，此 PR 影响所有 Agent 的工具调用行为。高风险标记和 X-Large 规模表明这是核心架构变更，社区期待其带来更可控的工具交互体验。
2.  **[fix(anthropic)] Classify incomplete terminal responses (#9447)**
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9447)
    *   **分析**: 针对 Anthropic 模型“截断/空响应”误判为成功的长期痛点。此修复将直接提升 Reliable Provider 的鲁棒性，是提升用户体验的关键补丁。
3.  **[feat(gateway)] Governed plugin webhook ingress (#8862) & Webhook challenge replies (#10583)**
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/8862) | [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10583)
    *   **分析**: JordanTheJet 主导的网关插件化战略的关键步骤。#8862 建立了基础通道，#10583 进一步扩展了文件处理能力，显示了项目在构建开放平台生态上的连贯性。
4.  **[feat(eval) Series] (#9222, #9221, #9244, #9220, #9248, #9245)**
    *   **分析**: IftekharUddin 提交的评估系统集群 PR。这些 PR 共同构成了一个可审计、可复现、带回归保护的测试框架，反映了项目从“可用”向“工业级可靠”转型的路线图信号。

## 5. Bug 与稳定性
今日无新 Bug Issue 报告，但以下 **Fix PR** 若合并将显著改善稳定性：

| PR 编号 | 问题描述 | 严重程度 | 状态 |
| :--- | :--- | :--- | :--- |
| **#10712** | Slack Socket Mode 在企业代理下因 TLS 证书信任不一致而失败 | Medium | 待合并 |
| **#10620** | Telegram 永久丢弃的语音消息对用户无反馈，体验不佳 | Low/Medium | 待合并 |
| **#10210** | Agent-Browser 子进程无超时，可能导致资源泄漏 | High | 待合并 |
| **#10337** | Git 工具允许访问授权根目录外的仓库（安全漏洞） | Critical | 待合并 |
| **#9447** | Anthropic 不完整响应被错误分类为成功 | High | 待合并 |

**稳定性评估**: 当前积压的修复 PR 覆盖了安全、可靠性和兼容性三个关键维度，合并后将显著降低生产环境的故障率。

## 6. 功能请求与路线图信号
1.  **多模型 Provider 配置 (#9809)**: 用户希望在一个 API Key/Endpoint 下管理多个模型变体，这符合当前 LLM 市场多模型并存的趋势。
2.  **多元化 Web 搜索 (#10679)**: 引入 Keenable 作为备选，反映用户对搜索可靠性及潜在成本优化的需求。
3.  **结构化评估与回归测试 (#9222 等系列)**: 明确的路线图信号，表明项目即将引入正式的“版本发布前质量门禁”，以支持更频繁的迭代。
4.  **Signal 自同步消息支持 (#9326)**: 完善主流 IM 渠道的功能 parity。

## 7. 用户反馈摘要
*   **痛点**: Slack 在企业网络环境下的 TLS 连接问题 (#10712) 和 Telegram 语音消息静默失败 (#10620) 是典型的“边缘场景导致信任危机”的用户反馈。
*   **需求**: 用户对 Anthropic 模型返回空白内容却显示成功的现象忍无可忍 (#9447)，这是直接影响 Agent 可用性的核心体验问题。
*   **期待**: 通过 #10337 和 #10210 可以看出，用户对工具执行的安全边界和进程生命周期管理有极高的专业要求。

## 8. 待处理积压
*   **重大积压**: **50 个 PR** 全部处于 Open 状态，无合并。
    *   **建议**: 维护团队需尽快清理积压，特别是 **#10337** (安全) 和 **#9447** (核心可靠性) 应优先合并。
*   **依赖更新**: **#10680** (Dependabot) 包含 44 个 Rust 包更新，虽为小改动，但需及时合并以维持依赖健康。
*   **长期开放 PR**: #8862 和 #8949 (网关插件) 自 7 月开放，已持续超过一个月，建议加速审查流程。

---
**项目健康度评分**: ⚠️ **注意** (社区贡献活跃，但合并效率低，安全补丁积压)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 (2026-09-08)

## 1. 今日速览
PicoClaw 今日保持中等活跃度，24小时内新增 **2个关键Bug报告** 和 **7个Pull Requests**。值得注意的是，所有提交的PR目前均处于待合并状态，尚未有合并记录。主要技术动态集中在配置系统的并发安全修复（Data Race）以及多平台提供商接入（OpenCode Go、Keenable）。项目核心配置模块稳定性受到关注，社区贡献者响应迅速，针对同一Bug快速提交了修复PR。

## 2. 版本发布
*   **无新版本发布。**

## 3. 项目进展
今日无PR被合并或关闭，但提交质量较高，主要涵盖以下方向：
*   **配置模块健壮性修复**：PR #3375 针对 Issue #3374 提出的 `sync.Once` 失效导致的数据竞争问题提供修复，解决了 `sensitiveCache` 初始化过程中的空指针风险，显著提升了配置加载的安全性。
*   **新提供商集成**：
    *   PR #3371 新增 `opencode-go` 提供商支持，自动路由模型并携带会话头，扩展了与 OpenCode 生态的兼容性。
    *   PR #3370 新增 Keenable 作为 `web_search` 提供商，无需 API Key 即可使用，降低了用户搜索工具的门槛。
*   **工具链配置完善**：PR #3372 修复了 `reaction` 工具的配置路径问题，使其能够正确遵循用户的启用/禁用设置，而非默认强制开启。
*   **长期功能积累**：PR #3344 (gbr/1 远程配对)、PR #3354 (IRCv3 多行消息) 和 PR #3353 (工具反馈动画限制) 仍在等待审核，补充了远程控制和 IRC 渠道的稳定性。

## 4. 社区热点
*   **Issue #3374 [BUG] Data race in Config.initSensitiveCache**
    *   链接: https://github.com/sipeed/picoclaw/issues/3374
    *   **热度分析**：该 Issue 由 @sting8k 提出，直指核心配置模块的并发缺陷，已迅速触发修复 PR #3375。这反映了用户对数据敏感性和服务稳定性的重视。
*   **Issue #3373 [BUG] SaveConfig silently deletes every api_key**
    *   链接: https://github.com/sipeed/picoclaw/issues/3373
    *   **热度分析**：此 Issue 揭示了严重的静默数据丢失风险（API Key 丢失），虽然暂无直接关联的修复 PR，但其破坏性极强，预计将引发紧急关注。
*   **PR #3371 feat(providers): add opencode-go provider**
    *   链接: https://github.com/sipeed/picoclaw/pull/3371
    *   **热度分析**：扩展对 OpenCode Go 的支持，满足特定用户群体对会话管理和自动路由的需求。

## 5. Bug 与稳定性
今日报告了两个高严重程度的 Bug，均涉及配置数据的完整性和安全性：

1.  **[严重] Issue #3373: SaveConfig 静默删除多余 api_key**
    *   **描述**：在 `LoadConfig` → `SaveConfig` 循环中，除了第一个之外的所有 `api_keys` 都会被删除，并留下悬空的 `fallbacks` 引用。
    *   **影响**：导致用户配置数据静默丢失，可能破坏模型路由逻辑。
    *   **状态**：未分配修复 PR。

2.  **[高] Issue #3374: Data race in Config.initSensitiveCache**
    *   **描述**：`Config.sensitiveCache` 懒加载缺乏同步保护，导致并发场景下可能返回 nil replacer 并触发 Panic。
    *   **影响**：高并发配置访问可能导致服务崩溃。
    *   **状态**：**已有修复 PR #3375** 待合并。

3.  **[低] Issue #3372 (通过 PR 修复): reaction 工具配置失效**
    *   **描述**：`reaction` 工具无法通过配置禁用，始终默认为启用状态。
    *   **状态**：**已有修复 PR #3372** 待合并。

## 6. 功能请求与路线图信号
*   **搜索能力扩展**：PR #3370 引入 Keenable 搜索，表明项目正在降低外部工具的使用门槛（无需 API Key），这可能成为未来其他免密钥搜索集成的参考模板。
*   **跨平台伴侣支持**：PR #3344 继续推进 `gbr/1` 协议的手机配对功能，显示项目对“桌面代理+移动端监视”交互模式的持续投入。
*   **IRC 体验优化**：PR #3354 和 #3353 专注于 IRC 渠道的消息完整性（多行合并）和交互反馈生命周期管理，反映出维护者对即时通讯协议体验的重视。

## 7. 用户反馈摘要
*   **痛点**：
    *   用户对**数据丢失**极为敏感，Issue #3373 描述的 API Key 静默删除行为触发了对配置系统可靠性的信任危机。
    *   并发安全问题（Issue #3374）影响了高级用户的部署稳定性，尤其是在多 goroutine 环境下。
*   **满意点**：
    *   社区对新增提供商（如 OpenCode Go、Keenable）表现出积极态度，认为这丰富了生态兼容性。
    *   开发者 @sting8k 对配置模块的细致维护和快速响应获得了认可（尽管发现的问题较为棘手）。

## 8. 待处理积压
*   **Issue #3373**：目前尚无对应的修复 PR，鉴于其导致的静默数据丢失风险，建议维护者优先处理。
*   **Stale PRs**：
    *   PR #3344 (gbr/1 配对)
    *   PR #3354 (IRCv3 多行消息)
    *   PR #3353 (工具反馈动画)
    *   **说明**：这三个 PR 更新时间均为 2026-09-07，虽标记为 stale 但内容具有重要功能价值，建议尽快 review 以缓解积压。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：** 2026-09-08  
**分析对象：** agentscope-ai/QwenPaw

## 1. 今日速览
QwenPaw 项目今日保持高强度迭代，发布 **v2.2.1-beta.1**，重点引入了 Agent 模型路由设置。社区活跃度极高，24小时内 Issues 更新 32 条，PR 更新 42 条，显示出大量用户在升级至 v2.2.0 后集中反馈兼容性、UI 渲染及工具链问题。开发团队响应迅速，针对 PDF 处理、Shell 输入竞争、MCP 认证等关键稳定性问题已在当日合并或发起修复 PR，项目整体处于快速修复与功能扩展并行的健康状态。

## 2. 版本发布
**v2.2.1-beta.1**
- **核心变更：** 新增 Agent 模型路由设置（Agent model routing settings），允许更细粒度的流量分发。
- **文档更新：** 同步更新 v2.2.0 相关文档。
- **修复：** 修复流式传输期间会话状态同步问题（sync resolved sessions during streaming）。
- **注意事项：** 此版本为 Beta 版，建议用户评估现有工作负载稳定性后再升级，特别是涉及长会话流式处理的场景。

## 3. 项目进展
今日多个关键 PR 被合并或推进，显著提升了系统的健壮性：
- **聊天队列一致性 (#7610)：** 修复了任务执行中通过对话框发消息触发 409 错误的问题，确保新消息能正确进入队列而非直接冲突，提升了多任务场景下的用户体验。
- **Shell 工具 stdin 隔离 (#7598)：** 解决了 Windows 环境下 Shell 工具子进程继承控制台 stdin 导致挂起的问题，避免了 Ctrl+C 无法终止子进程的隐患。
- **插件管理体验优化 (#7605)：** 实现了插件安装/更新后保持当前标签页、支持批量更新及更新检测，大幅降低了多插件管理的操作成本。
- **MCP 认证回退机制 (#7627)：** 修复了部分仅支持旧版协议的 MCP 端点在 v2.2.0 下因 401 误报而失效的问题，增强了第三方服务兼容性。
- **前端安全加固 (#7427)：** 升级 React Router DOM 至 7.18.3 并刷新依赖锁文件，修补了 Creator UI 中的已知安全漏洞。

## 4. 社区热点
- **#7579 [OPEN] 模型回复意外从上下文中丢失：** (8 条评论)  
  用户反馈助手回复已持久化，但后续请求中模型“看不到自己刚说的话”，导致空响应。这反映了长上下文管理或会话状态同步机制存在严重 Bug。
- **#7597 [CLOSED] Tool 返回的图片/PDF 触发 400 错误：** (6 条评论)  
  工具返回的二进制数据（图片/PDF）以裸 base64 形式发送，导致非多模态兼容的 API 报错。该问题已引起重视并推动修复（见 PR #7636）。
- **#7559 [CLOSED] 任务执行中发消息触发 409 报错：** (5 条评论)  
  用户质疑在任务运行期间提交消息为何触发冲突错误，而非进入队列。该问题已通过 PR #7610 修复，确认是并发控制逻辑缺陷。
- **#7576 [OPEN] RetryChatModel 硬编码 context_size 导致上下文溢出：** (5 条评论)  
  指出 `RetryChatModel` 中硬编码的 32768 token 回退值导致所有模型在超过该阈值时误报 CONTEXT_UNFIT，这是一个影响广泛的配置硬编码问题。

## 5. Bug 与稳定性
| 严重程度 | 问题描述 | Issue | Fix PR |
| :--- | :--- | :--- | :--- |
| **High** | Gemini 模型在后台工具调用完成后返回 400 错误，因尾部消息角色类型错误 | #7625, #7629 | #7629 (Open) |
| **High** | 嵌入 PDF DataBlock 的历史记录导致文本模型永久失效（400/1210 错误） | #7617, #7597 | #7636 (Open), #7621 (Closed) |
| **Medium** | v2.2.0 弹窗背景变透明，遮罩层失效，UI 渲染异常 | #7622 | - |
| **Medium** | llama.cpp 新版本号格式解析失败，导致运行时被静默回滚 | #7633 | - |
| **Medium** | 同步调用阻塞事件循环，导致 Windows 启动和消息发送时界面假死 | #7363 | - |
| **Low** | 心跳 cron 会话导致消息堆积和重复反馈 | #7589 | - |

## 6. 功能请求与路线图信号
- **Agent 模型路由 (#7501)：** v2.2.1-beta.1 已合并，表明项目正致力于提升多模型编排能力。
- **Long-term Memory 后端扩展 (#7613)：** 新增 OpenViking 长期记忆后端，显示项目正在丰富 ReMe 生态，支持更多企业级或特定场景的记忆存储方案。
- **每会话模型覆盖 (#5992)：** 允许单个 Agent 在不同会话中使用不同 LLM，满足了精细化控制和成本优化的需求，目前仍在 Review 中。
- **社区联动功能 (#7583)：** 用户强烈希望能通过 QwenPaw 直接登录 AgentScope 社区、查看反馈，这可能推动未来版本集成社区 SDK 或 WebView 入口。

## 7. 用户反馈摘要
- **痛点：** 用户对 v2.2.0 的**兼容性回归**反应强烈，特别是 MCP 服务认证失败、PDF/图片处理报错以及 Shell 工具在 Windows 下的挂起问题，认为这些基础功能应在测试中覆盖。
- **体验：** 插件商店的交互被批评“过于复杂”，希望有一键更新和通知功能；弹窗 UI 渲染缺陷影响了设置页面的专业性印象。
- **需求：** 用户期望更透明的错误提示（如工具异常栈丢失，#7572）和更稳定的后台任务处理机制（如 heartbeat 导致的消息堆积）。

## 8. 待处理积压
- **#7363 [OPEN] 同步调用阻塞事件循环：** 这是一个影响核心稳定性的架构级问题，自 8 月底开放以来讨论激烈，需优先处理以消除界面假死风险。
- **#7576 [OPEN] RetryChatModel 硬编码上下文大小：** 该 Bug 影响所有使用该组件的模型，且会导致静默的上下文截断错误，需尽快移除硬编码或使其可配置。
- **#7633 [OPEN] llama.cpp 版本回滚逻辑缺陷：** 版本号解析逻辑过于僵硬，随着 llama.cpp 发展，此类硬编码逻辑将频繁引发误判，建议重构版本比对算法。

---
*报告生成时间：2026-09-08*  
*数据来源：GitHub API (agentscope-ai/qwenpaw)*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：2026-09-08**  
**分析师：AI Agent & OSS Analyst**

---

## 1. 今日速览

hermes-agent 在 2026-09-08 保持**极高活跃度**，过去24小时共产生 **908 条**社区交互（408 Issues + 500 PRs），日均吞吐量处于高位健康区间。项目刚于昨日发布 `v0.21.1` patch 版本，修复了多项关键稳定性问题。今日主要技术动向集中于：**跨平台安装兼容性修复**（Windows/Linux）、**网关交付可靠性增强**（Telegram 重传、WAL 锁冲突）、以及**多渠道消息支持扩展**（WhatsApp WAHA 插件）。整体项目向前推进明显，尤其是基础设施健壮性与用户体验优化方面。

---

## 2. 版本发布

### 📦 v0.21.1 (v2026.9.7)
- **发布日期**：2026-09-07
- **性质**：Patch release（累积修复）
- **基础提交**：`6178e9f4eed8d99f4fc550add939d58c7bed6206`
- **说明**：自 v0.21.0 以来 main 分支所有变更的累积打包，适用于标签化部署与下游消费者。
- **破坏性变更**：无
- **迁移注意**：直接从 v0.21.0 升级即可，无需额外配置调整。

---

## 3. 项目进展

### 今日已合并/关闭的重要 PR

| PR # | 类型 | 简述 | 影响 |
|------|------|------|------|
| **#105813** | feat(desktop) | Desktop 会话按 Gateway 分组，支持复用 Cloud 实例登录状态 | 提升桌面端多实例管理体验 |
| **#105235** | feat(streaming TTS) | 流式 TTS 首句独立调优（合并至 #96933） | 改善语音合成自然度 |
| **#105818** | fmt(js) | npm run fix 自动格式化修复 | 代码风格统一 |

### 今日活跃中的关键 PR（未合并）

- **#105756** `[P3]` 修复 Kanban worker 死亡分类逻辑，将 gateway 重启导致的 worker 死亡标记为 `supervisor_restart` 而非 `crashed`
- **#105820** `[P2]` 修复 Windows/POSIX 路径下 `no_agent` 脚本 Popen 编码不一致问题（使用 `errors='replace'`）
- **#105819** `[P2]` 修复通过 `api_key` 认证时 `auth_token` 未清理导致的安全边界问题
- **#105805** `[P1]` 防止 FTS 初始化期间 `state.db` 损坏（关联 Issue #104596）
- **#105810** `[P2]` Telegram 轮询恢复后重新投递失败的消息义务
- **#105817** `[P2]` 防护 `display: null` 配置导致的 gateway turn crash

---

## 4. 社区热点

### 🔥 讨论最活跃的 Issues

1. **#66616** — Skills 索引过时/降级（**178 条评论**）  
   [链接](https://github.com/NousResearch/hermes-agent/issues/66616)  
   **诉求**：自动化 freshness probe 失败，索引老化超过 26h 限制。用户强烈期望 cron 重建流程更可靠。

2. **#88584** — Nous 自动集成被阻塞（**77 条评论**）  
   [链接](https://github.com/NousResearch/hermes-agent/issues/88584)  
   **诉求**：scheduled merge 因 `cron/jobs.py` 冲突失败，影响自动化发布流水线。

3. **#97681** — Bot 群聊在 Desktop 关闭后持续运行（**27 条评论**）  
   [链接](https://github.com/NousResearch/hermes-agent/issues/97681)  
   **诉求**：希望 Bot 能脱离 Desktop 独立运行于服务器/VPS，实现真正的后台 Agent 服务。

4. **#87093** — Debian 安装脚本失败（**25 条评论，4 👍**）✅ 已关闭  
   [链接](https://github.com/NousResearch/hermes-agent/issues/87093)  
   **反馈**：`uv.lock` 与 `npm install` 在 Debian 13.6 上失败，社区已确认修复。

5. **#53004** — Projects 范式破坏侧边栏工作流（**14 条评论，1 👍**）  
   [链接](https://github.com/NousResearch/hermes-agent/issues/53004)  
   **诉求**：PR #49037 引入的 "first-class projects" 破坏了原有的 folder → session → sidebar 流程。

---

## 5. Bug 与稳定性

### 🚨 高优先级 Bug（P0/P1）

| Issue # | 严重程度 | 问题描述 | Fix PR |
|---------|----------|----------|--------|
| **#104596** | P1 | `state.db` WAL split-brain 导致数据库损坏（单进程内） | **#105805** (OPEN) |
| **#105145** | P1 | Windows Desktop `hermes update` 成功后报告 FAILED (exit 8)，工作目录解析错误 | 待修复 |
| **#52261** | P1 | 本地推理 (MLX/oMLX) 内存错误被误判为 `context_overflow`，触发破坏性压缩循环 | 待修复 |
| **#100401** | P1 | cron fire-claim heartbeat 死锁，导致 >60s 任务被错误标记为 "Interrupted by shutdown" | 待修复 |
| **#90663** | P1 | TUI (Ink) 在 Ghostty (macOS) 中输入大写字母被转为小写 | ✅ 已关闭 |

### ⚠️ 中等优先级 Bug（P2）

- **#86146** — 模型切换始终使用主 profile 列表，忽略当前 profile 配置
- **#32528** — QQ Bot 私聊按钮审批因 `chat_type` 不匹配被拒绝（✅ 已关闭）
- **#80246** — Web UI 上下文压缩阈值未计算 `reasoning_content`，导致误报 overflow（✅ 已关闭）
- **#82874** — SIGTERM 时 `shutdown_mcp_servers()` 阻塞事件循环，clean-exit 标记未写入（✅ 已关闭）
- **#99956** — bot-chat 投递在目标 profile 有活跃会话锁时失败（✅ 已关闭）
- **#58135** — `is_container()` 在运行 Docker 的宿主机上 false-positive，破坏 browser auto-launch（✅ 已关闭）
- **#78820** — TUI gateway 在 Windows 上因 stdin readline OSError 崩溃（✅ 已关闭）
- **#91130** — `drive_preview` 在分数 DPR 显示器上点击偏移约 20%
- **#26665** — Desktop 语言设置重启后重置为英文

---

## 6. 功能请求与路线图信号

### 🆕 高潜力功能请求

1. **#97681** — Bot 群聊跨设备持续运行  
   **信号**：用户希望 Hermes 真正成为"后台 Agent 服务"而非仅依赖本地 Desktop。若实现，将大幅扩展使用场景（VPS/云服务器部署）。

2. **#67347** — 子 Agent 模型 + Provider 引导式选择器  
   **信号**：当前自由文本输入对新手不友好，引导式 Picker 可降低配置门槛。

3. **#80222** — `delegate_task` 支持 per-call 模型与 reasoning_effort 覆盖  
   **信号**：增强委托灵活性，满足复杂多模型协作场景。

4. **#103015** — GPT-6 Astra 支持追踪  
   **信号**：OpenAI 新模型兼容性需求，项目正在跟踪中。

5. **#105630** — `/access` 命令管理 DM/群组白名单  
   **信号**：从聊天界面直接管理访问控制，提升运维便利性。

6. **#104247/#104245/#104133** — WhatsApp 通过 WAHA 插件支持  
   **信号**：扩展第三方 WhatsApp 传输通道，Stacked PRs 显示模块化设计思路成熟。

### 📌 可能被纳入下一版本的信号
- **#105756** (Kanban worker 死亡分类修复) — 高稳定性价值，可能随 next patch 发布
- **#105820/#105819** (编码与安全边界修复) — P2 级修复，可能进入 v0.21.2
- **#105810** (Telegram 重传) — 交付可靠性关键修复

---

## 7. 用户反馈摘要

### 😤 主要痛点
1. **跨平台兼容性不稳定**：Windows 更新流程、Debian 安装、Linux 终端数字输入异常等问题频发，用户抱怨"开箱即用"体验差。
2. **配置持久化失效**：语言设置、Profile 模型列表等配置重启后丢失或无效，用户感到 frustration。
3. **本地推理资源管理缺陷**：MLX/oMLX 等本地后端错误分类导致会话崩溃循环，影响本地部署用户。
4. **WAL 数据库损坏风险**：单进程内 `state.db` 损坏虽罕见但后果严重，用户担忧数据丢失。

### 😊 正面反馈
- **Skill 索引自动化**：尽管有老化问题，用户认可 cron 自动重建机制的方向。
- **TUI/Ink 界面**：用户对 React/Ink 新界面有期待，但需修复大小写输入 bug。
- **Bot 群聊功能**：用户认可"多 Bot 协作"概念，希望脱离 Desktop 独立运行。

### 🎯 典型使用场景
- **本地推理用户**：使用 MLX/oMLX 在 Mac/Linux 上运行 Hermes，对资源管理敏感。
- **企业/自动化部署**：通过 cron + bot-chat 实现定时任务，关注交付可靠性。
- **多平台消息整合**：Telegram/Discord/WhatsApp/QQ 多通道接入，关注 gateway 稳定性。

---

## 8. 待处理积压

### ⏳ 需维护者关注的长期 Issue

| Issue # | 创建时间 | 天数未响应 | 严重度 | 建议动作 |
|---------|----------|------------|--------|----------|
| **#66616** | 2026-07-18 | ~52 天 | P3 | 索引老化问题持续发生，需审查 cron 调度逻辑 |
| **#88584** | 2026-08-17 | ~22 天 | P3 | Merge conflict 阻塞自动化流水线，需手动介入 |
| **#53004** | 2026-06-26 | ~74 天 | P1 | Projects 范式破坏工作流，用户反馈强烈，需决策是否回滚或修复 |
| **#39609** | 2026-06-05 | ~95 天 | P2 | Kanban 任务状态自动提升绕过人工审批，安全隐忧 |
| **#70386** | 2026-07-23 | ~47 天 | P3 | `kanban create --project` 静默丢弃无效 project slug |
| **#97296** | 2026-08-28 | ~11 天 | P3 | macOS 上 kanban dispatcher SIGSEGV，需复现环境 |

### ⏳ 需维护者关注的 Open PR

| PR # | 创建时间 | 状态 | 建议动作 |
|------|----------|------|----------|
| **#105805** | 2026-09-08 | OPEN | P1 级 FTS 损坏修复，建议优先 review merge |
| **#105810** | 2026-09-08 | OPEN | Telegram 重传修复，高稳定性价值 |
| **#104434** | 2026-09-06 | OPEN | 委托注入策略功能，需 decision 标记 |
| **#105630** | 2026-09-08 | OPEN | `/access` 命令功能，可能纳入下一版本 |

---

## 📊 项目健康度评估

| 指标 | 评分 | 说明 |
|------|------|------|
| **活跃度** | ⭐⭐⭐⭐⭐ | 908 条/24h，极高社区参与度 |
| **响应速度** | ⭐⭐⭐☆☆ | 部分 P1/P2 Issue 积压超过 30 天 |
| **Bug 修复率** | ⭐⭐⭐⭐☆ | 今日关闭多个重要 Bug，但新 Bug 持续产生 |
| **版本节奏** | ⭐⭐⭐⭐☆ | 稳定 patch 发布，无 breaking changes |
| **文档/示例** | ⭐⭐⭐☆☆ | Issue #66616 暗示文档索引自动化存在问题 |

**总体判断**：hermes-agent 项目处于**高速迭代期**，社区贡献活跃，技术债务开始积累。建议维护者优先处理 P1 级稳定性 Bug（#104596、#105145）与长期积压的 Workflow 问题（#66616、#53004），以维持用户信任与项目可持续性。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期：2026-09-08**

## 1. 今日速览
今日 AstrBot 发布了 **v4.28.0** 版本，核心亮点为配置结构优化及 WebChat 后台子代理结果自动推送修复。过去 24 小时内社区活跃度较高，新增 9 个 Issues 和 20 个 PRs，其中 10 个 PR 已合并/关闭，包含依赖升级、本地化扩展及底层框架修复。整体项目状态健康，重点解决了多 Bot 场景下的插件隔离诉求及 WebUI 性能问题，同时引入了 ScitiX 提供商支持。

## 2. 版本发布：v4.28.0
*   **发布日期**：2026-09-08
*   **核心内容**：
    *   配置文件结构优化，提升配置管理的灵活性。
    *   包含自 v4.28.0-beta.1 以来的 16 项变更。
*   **⚠️ 破坏性变更/迁移注意**：
    *   由于配置文件结构优化，**升级后再降级将导致部分配置内容重置**。
    *   建议用户升级后谨慎降级，如需保留配置请提前备份。

## 3. 项目进展（已合并/关闭的 PR）
今日合并了多个关键 PR，显著提升了项目的稳定性、国际化支持和 WebUI 体验：

*   **版本准备与指标增强**：[#9975](https://github.com/AstrBotDevs/AstrBot/pull/9975) 完成版本同步；[#9973](https://github.com/AstrBotDevs/AstrBot/pull/9973) 在指标上传中加入 Python 版本信息，便于维护者分析运行时环境分布。
*   **WebUI 功能完善**：[#9910](https://github.com/AstrBotDevs/AstrBot/pull/9910) 修复了 WebChat 会话未显示在历史记录列表中的问题；[#8257](https://github.com/AstrBotDevs/AstrBot/pull/8257) 增强了插件配置 Schema 元数据验证，防止非法配置进入 WebUI。
*   **国际化与文档**：[#9955](https://github.com/AstrBotDevs/AstrBot/pull/9955) 添加了完整的日语（ja-JP）本地化支持；[#9423](https://github.com/AstrBotDevs/AstrBot/pull/9423) 和 [#8765](https://github.com/AstrBotDevs/AstrBot/pull/8765) 同步了文档 UI 标签与实际前端文案，并更新了文档图片。
*   **平台适配修复**：[#7895](https://github.com/AstrBotDevs/AstrBot/pull/7895) 和 [#7883](https://github.com/AstrBotDevs/AstrBot/pull/7883) 修复了 QQ Official 平台主动推送消息时 Markdown 渲染丢失的问题，确保定时任务和工具调用结果能正确格式化显示。
*   **基础设施**：[#9974](https://github.com/AstrBotDevs/AstrBot/pull/9974) 将 Docker QEMU Action 升级至 4.3.0。

## 4. 社区热点
*   **多 Bot 插件隔离诉求强烈**：[#9968](https://github.com/AstrBotDevs/AstrBot/issues/9968) 提出了插件按 Bot 实例隔离配置的需求，尽管 v4.27.4 已支持按 Bot 启用/停用，但同一插件在不同 Bot 使用不同参数的需求仍未满足，这是多租户/多实例用户的核心痛点。
*   **WebChat 后台任务体验优化**：[#9322](https://github.com/AstrBotDevs/AstrBot/pull/9322) 针对 Issue #9321 的修复引发了关注，用户期望后台子代理任务完成后能自动推送结果，而非手动刷新，这反映了用户对“智能体”主动交互的高期待。
*   **新提供商接入**：[#9981](https://github.com/AstrBotDevs/AstrBot/pull/9981) 新增 ScitiX 作为内置 OpenAI 兼容提供商，扩展了用户的选择范围，尤其在 SiliconFlow 之外提供了替代方案。

## 5. Bug 与稳定性
*   **【高】定时任务状态误报**：[#9980](https://github.com/AstrBotDevs/AstrBot/issues/9980) - `active_agent` 定时任务在循环调用工具失败并达到最大步骤后，状态仍显示为 `completed` 且错误为空。这是一个严重的状态管理 Bug，可能导致用户误判任务执行情况。**暂无合并 Fix PR**。
*   **【中】插件钩子绑定失效**：[#9938](https://github.com/AstrBotDevs/AstrBot/issues/9938) - 当钩子在插件子模块中定义时，`on_decorating_result` 等事件回调会因缺少 `self` 参数而报错。PR [#9976](https://github.com/AstrBotDevs/AstrBot/pull/9976) 已提交修复，待合并。
*   **【中】Python 版本约束失效**：[#9945](https://github.com/AstrBotDevs/AstrBot/issues/9945) - 尽管 `pyproject.toml` 声明 `requires-python = ">=3.12"`，但用户仍可能在旧版 Python 上运行。这涉及依赖管理工具的解析行为，需维护者确认是否需要增强检查机制。
*   **【低】Web 搜索工具缺陷**：[#9979](https://github.com/AstrBotDevs/AstrBot/pull/9979) - 修复了字段丢失、错误码被吞没及参数验证问题，基于前序 PR 的后续优化。

## 6. 功能请求与路线图信号
*   **失败记录保留**：[#7620](https://github.com/AstrBotDevs/AstrBot/issues/7620) - 建议增加 `save_failed_agent_history` 配置项，以便在 Agent 运行失败（如模型输出为空）时仍保存上下文，便于排查和断点续传。这是一个实用的调试功能，可能被纳入下一版本。
*   **数字员工上下文机制**：[#9967](https://github.com/AstrBotDevs/AstrBot/issues/9967) - 飞书适配场景下，多用户对话共享 Agent 上下文导致信息串扰，而完全隔离又导致机器人无法感知历史。用户期望新的上下文管理机制来平衡“隔离”与“连贯”。
*   **图片格式自适应**：[#9703](https://github.com/AstrBotDevs/AstrBot/pull/9703) - 正在推进外发图片根据提供商要求自动转换格式（如 GIF 转拼接图），以减少 Token 消耗并避免兼容性问题，预计将在 v4.28.x 后续版本中落地。

## 7. 用户反馈摘要
*   **痛点**：后台子代理任务完成后结果不自动展示，影响交互流畅度（Issue #9321）。
*   **痛点**：定时任务绑定的长会话历史导致 Agent 重复调用工具直至失败，且状态反馈不准确（Issue #9980）。
*   **满意**：多配置档案（abconf）功能已能解决大部分 Bot 级别的插件隔离需求，但更细粒度的参数隔离仍有缺口（Issue #9968）。
*   **反馈**：QQ 官方平台主动推送消息丢失 Markdown 格式，严重影响阅读体验（Issue #7848, PR #7895/#7883 已修复）。

## 8. 待处理积压
*   **[Bug] 定时任务状态逻辑错误**：[#9980](https://github.com/AstrBotDevs/AstrBot/issues/9980) 优先级较高，涉及核心执行流程的状态机逻辑，建议尽快安排修复。
*   **[Feature] 多 Bot 细粒度插件配置**：[#9968](https://github.com/AstrBotDevs/AstrBot/issues/9968) 随着多实例用户增多，此需求可能会进一步发酵，需评估架构调整方案。
*   **[Bug] 插件子模块钩子绑定**：[#9938](https://github.com/AstrBotDevs/AstrBot/issues/9938) 虽已有 PR [#9976](https://github.com/AstrBotDevs/AstrBot/pull/9976) 待合并，但需注意测试覆盖度，确保其他子模块场景同样适用。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*