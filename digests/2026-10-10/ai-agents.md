# OpenClaw 生态日报 2026-10-10

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-10 01:23 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报
**日期：** 2026-10-10  
**数据来源：** GitHub.com/openclaw/openclaw

---

## 1. 项目今日速览
项目今日保持极高活跃度，过去24小时内产生500条Issues更新与500条PR更新，其中待合并PR达353条，反映出开发迭代处于高密度冲刺阶段。整体健康度面临一定压力，核心问题集中在 Gateway 启动性能瓶颈、多平台（特别是 Windows）更新流程死锁以及内存管理机制的缺陷上。当前无新版本发布，大量 P0 级阻塞性 Bug 仍未修复，亟需维护团队集中清理积压。社区反馈显示用户在跨渠道消息投递可靠性、长会话缓存策略及配置热重载后的状态一致性方面存在显著痛点。

## 2. 项目进展
*注：今日无合并的重要 PR 记录，以下为处于“Ready for maintainer look”或接近合并状态的高价值 PR。*

- **修复子智能体结果回传中断**：[#168068](https://github.com/openclaw/openclaw/pull/168068) 解决了在后续跟进中子智能体结果无法正确返回的问题，修复了 `sessions_send` 机制中的状态丢失缺陷。
- **修复 Cron 任务工具权限失效**：[#168037](https://github.com/openclaw/openclaw/pull/168037) 修复了手动运行的自动化任务在初始对话轮次结束后丢失工具访问权限的问题，解决了 `operator execution authority is no longer active` 报错。
- **优化 Anthropic 缓存检查点**：[#168042](https://github.com/openclaw/openclaw/pull/168042) 通过保留对话缓存检查点，解决了长会话中缓存命中率低的问题，同时修复了 Bedrock 对 Haiku 5.5 支持遗漏及 Claude 3.7 不支持一小时 TTL 的兼容性问题。
- **修复 Agents API 后续轮次失败**：[#168067](https://github.com/openclaw/openclaw/pull/168067) 确保在原生工具使用后，远程会话能正确维持状态，修复了后续对话轮次因会话限制或生命周期变更而失败的问题。

## 3. 社区热点
*注：以下为过去24小时内更新且评论数/关注度最高的 Issue。*

- **[Bug] Agent SQLite WAL 异常增长导致 Gateway 启动阻塞** ([#143524](https://github.com/openclaw/openclaw/issues/143524))
  - **热度**：115 条评论，P0 级阻塞。
  - **分析**：这是今日最核心的痛点。Windows 环境下 `agent.sqlite-wal` 文件数天内增长至 1.4-2.8 GB 且无法自动 checkpoint，直接导致 Gateway 无法启动。用户急需官方提供清理脚本或修复 `wal_autocheckpoint` 机制。
- **[Bug] OpenClaw 泄露未回收的 Hook/Tool 子进程** ([#97616](https://github.com/openclaw/openclaw/issues/97616))
  - **热度**：18 条评论，持续更新中。
  - **分析**：Zombie 进程积累导致运行时性能下降，用户强烈要求实现进程池回收机制或自动清理策略。
- **[Bug] WhatsApp DM 回复在重启后持久注册表交接失败** ([#161976](https://github.com/openclaw/openclaw/issues/161976))
  - **热度**：18 条评论，P1 级。
  - **分析**：涉及消息丢失的高频场景，用户在重启 Gateway 后遭遇消息发送失败，需排查持久化状态同步逻辑。
- **[Bug] 核心 /dashboard 遮蔽 Telegram Mini App 启动器** ([#142336](https://github.com/openclaw/openclaw/issues/142336))
  - **热度**：11 条评论。
  - **分析**：2026.9.2+ 版本引入的回归问题，导致 Telegram 渠道功能冲突，用户反馈体验受损。

## 4. Bug 与稳定性
按严重程度（P0 优先）排列今日报告的关键稳定性问题：

### P0 级（阻塞/崩溃）
- **更新流程永久死锁** ([#167771](https://github.com/openclaw/openclaw/issues/167771))：`update-recovery-pending` 导致更新被永久阻塞，无修复路径。**Fix 状态**：待处理。
- **Gateway 启动性能瓶颈** ([#160959](https://github.com/openclaw/openclaw/issues/160959))：捕获大型外部插件时事件循环阻塞数分钟，2026.9.6 回归。**Fix 状态**：待处理。
- **Windows 升级后 Gateway 挂起** ([#167652](https://github.com/openclaw/openclaw/issues/167652))：2026.9.9 升级后 Doctor 报告验证通过但 Gateway 实际挂起。**Fix 状态**：待处理。
- **计费冷却期导致订阅服务中断** ([#115642](https://github.com/openclaw/openclaw/issues/115642))：认证失败后固定 5 小时冷却期，缺乏基于探测的恢复机制。**Fix 状态**：待处理。

### P1 级（严重功能缺陷）
- **Config 热重载导致插件永久不可用** ([#154891](https://github.com/openclaw/openclaw/issues/154891))：热重载回滚后，无关插件仍报 `PluginInstanceUnavailableError` 直至完全重启。**Fix 状态**：待处理。
- **Claude CLI 后台 Bash 轮次静默失败** ([#157647](https://github.com/openclaw/openclaw/issues/157647))：后台任务完成后无输出，触发看门狗超时。**Fix 状态**：待处理。
- **Telegram 适配器网络失败后消息永久死信** ([#125764](https://github.com/openclaw/openclaw/issues/125764))：单次尝试失败即 dead-letter，无重试机制。**Fix 状态**：待处理。

### 已有对应 Fix PR 的 Bug
- **备份快照丢失旧版执行审批策略** ([#164297](https://github.com/openclaw/openclaw/pull/164297))：修复备份/恢复时静默替换为 deny-all 策略的问题。
- **Memory 全量重建失败无限重试** ([#138786](https://github.com/openclaw/openclaw/pull/138786))：添加退避机制，避免不可用嵌入服务器导致的循环重试。

## 5. 功能请求与路线图信号
- **按模型使用量日志与成本追踪** ([#13219](https://github.com/openclaw/openclaw/issues/13219))：
  - **诉求**：用户需要聚合视图以优化模型混合使用成本。
  - **信号**：已有增强请求标签，可能纳入后续版本，需产品团队决策。
- **Per-Agent TTS/STT 多语言配置覆盖** ([#66252](https://github.com/openclaw/openclaw/issues/66252))：
  - **诉求**：允许同一实例内不同 Agent 使用不同语音/语言提供商。
  - **信号**：当前为 P3，暂无明确 Fix PR，但社区呼声较高。
- **Reaction 触发 Agent 轮次** ([#17840](https://github.com/openclaw/openclaw/issues/17840))：
  - **诉求**：通过 Discord/Telegram 表情反应唤醒 Agent 进行交互。
  - **信号**：功能增强类，涉及 Hooks 系统扩展。

## 6. 用户反馈摘要
- **痛点**：
  - **Windows 平台体验脆弱**：多个用户反映 Windows 下更新流程、进程管理（Zombie 进程）及 SQLite 维护问题频发，稳定性显著低于 Linux/macOS。
  - **长会话成本不可控**：用户抱怨工具 schema 占用固定 3,500 tokens ([#14785](https://github.com/openclaw/openclaw/issues/14785))，且缓存策略未能有效降低长会话的 `cache_create` 成本 ([#140129](https://github.com/openclaw/openclaw/issues/140129))。
  - **静默失败缺乏诊断**：消息丢失、Agent 卡死等场景缺乏用户可见的错误提示，导致排查困难。
- **满意/改进方向**：
  - 用户认可 `clawsweeper` 自动化分诊机制对 Issue 标签的管理，但希望提高 P0 级 Bug 的修复响应速度。
  - 对 `openclaw doctor` 工具的自动化诊断能力表示认可，但希望其具备更强的修复自愈能力而非仅报告。

## 7. 待处理积压
- **长期未响应的 P0/P1 Issue**：
  - [#143524](https://github.com/openclaw/openclaw/issues/143524) (SQLite WAL 增长)：自 2026-09-09 创建，115 条评论无实质修复进展。
  - [#97616](https://github.com/openclaw/openclaw/issues/97616) (进程泄露)：自 2026-06-29 创建，持续数月未解决。
  - [#48920](https://github.com/openclaw/openclaw/issues/48920) (文档超前于发布)：自 2026-03-17 创建，导致用户按文档配置后功能不可用。
- **建议**：维护团队应优先清理 Windows 平台相关的 P0 阻塞项，并为长期未响应的核心稳定性问题指派专门的维护者。

---

## 横向生态对比

# AI 智能体与个人 AI 助手开源生态横向对比分析报告
**报告日期**：2026-10-10
**分析对象**：OpenClaw, Zeroclaw, PicoClaw, QwenPaw, hermes-agent, AstrBot, DeepSeek Harness

---

### 1. 生态全景
2026年10月，个人AI助手与自主智能体开源生态呈现**“高迭代、强安全、跨平台”**的整体态势。各核心项目均处于高密度Bug修复冲刺期，稳定性（特别是网关启动、会话状态一致性）取代功能堆叠成为首要优先级。安全边界（沙箱、权限、凭据管理）与多模态/多Agent互操作（A2A、RAG）成为技术演进的双主线。社区反馈显示，用户对“静默失败”的容忍度降至冰点，可观测性与自愈机制已成为衡量项目成熟度的关键指标。

### 2. 各项目活跃度对比

| 项目 | Issues 更新数 | PR 更新数 | Release 情况 | 健康度评估 |
| :--- | :---: | :---: | :--- | :--- |
| **OpenClaw** | 500 | 500 (353待合并) | 无 | **黄灯**：高密度迭代，但P0阻塞Bug积压严重，Windows平台稳定性存在显著短板。 |
| **Zeroclaw** | 20 | 50 (48待合并) | 无 | **绿灯**：代码整合有序，聚焦安全与架构优化，维护响应高效。 |
| **PicoClaw** | 中等 | 5 (依赖升级为主) | 无 | **绿灯**：处于维护与清理阶段，基础架构通过依赖升级保持现代化，但移动端存在Critical Bug。 |
| **QwenPaw** | 20 | 35 (13已合并) | 无 | **绿灯**：快速迭代与质量加固并行，UI稳定性显著改善，但存在高危RCE漏洞待处理。 |
| **hermes-agent** | 331 | 500 (大量待合并) | 无 | **黄灯**：极高活跃度，但安装更新机制与多平台兼容性痛点集中，P0/P1级缺陷较多。 |
| **AstrBot** | 17 | 33 (14已合并) | 无 | **绿灯**：维护响应速度快，UI重构与核心逻辑优化同步进行，社区贡献活跃。 |
| **DeepSeek Harness** | N/A (194 Discussions) | N/A (以Release落地) | **v0.2.1-alpha.2** | **绿灯**：迭代迅速，插件生态解耦，但Linux支持缺失与数据迁移问题需关注。 |

### 3. OpenClaw 在生态中的定位
*   **社区规模与绝对影响力**：OpenClaw 是当前生态中**绝对的中心节点**。其每日 500+ Issues 与 500+ PR 的更新量远超其他项目（如 Zeroclaw 20+ Issues，AstrBot 17+ Issues），表明其拥有最庞大的用户基数和最复杂的部署场景。
*   **技术路线差异**：OpenClaw 侧重于**全渠道消息网关（Gateway）**与**多平台同步**（Discord/Telegram/WhatsApp等），其复杂度体现在跨渠道状态一致性与长会话缓存策略上。相比之下，Zeroclaw 和 DeepSeek Harness 更侧重于**本地/边缘执行环境的安全隔离**与**多智能体（A2A）互操作**。
*   **优势与挑战**：OpenClaw 的优势在于极高的功能覆盖度和自动化分诊机制（clawsweeper）。然而，其劣势在于**平台适配碎片化**（Windows 下 SQLite WAL 膨胀、更新死锁）以及**P0 级阻塞 Bug 的清理速度滞后于开发速度**，亟需维护团队进行债务偿还。

### 4. 共同关注的技术方向
*   **多模态与上下文管理**：
    *   *涉及项目*：QwenPaw, AstrBot, DeepSeek Harness
    *   *具体诉求*：视频/音频输入支持（AstrBot #8048, QwenPaw #8081）；长会话上下文压缩与记忆持久化（DeepSeek Harness #1345, QwenPaw #7931）；图片/富文本处理的稳定性与 EXIF 保护（QwenPaw #8136, Zeroclaw #9887）。
*   **运行时安全与沙箱隔离**：
    *   *涉及项目*：QwenPaw, AstrBot, Zeroclaw, hermes-agent
    *   *具体诉求*：修复 MCP 驱动 RCE 漏洞（QwenPaw #8153）；Windows AppContainer 原生沙箱与 ACL 隔离（AstrBot #10466, DeepSeek Harness #423）；子进程内存看门狗与 shell 权限边界（Zeroclaw #11456, hermes-agent #135826）。
*   **可观测性与故障自愈**：
    *   *涉及项目*：OpenClaw, AstrBot, hermes-agent, DeepSeek Harness
    *   *具体诉求*：静默失败的日志兜底（AstrBot #10395）；更新失败后的状态恢复与诊断（hermes-agent #125437, OpenClaw doctor 工具）；插件/配置热重载的状态一致性（OpenClaw #154891, DeepSeek Harness 配置刷新修复）。

### 5. 差异化定位分析
*   **功能侧重**：
    *   **OpenClaw / AstrBot / QwenPaw**：侧重于**“接入层”**，优化 IM 平台适配、Web Console 交互及消息路由。
    *   **Zeroclaw / hermes-agent**：侧重于**“执行层”**，强化 TUI/CLI 交互、工具调用鲁棒性及远程/本地计算资源调度。
    *   **DeepSeek Harness / PicoClaw**：侧重于**“边缘与插件层”**，强调轻量化部署、SSH 远程执行及插件生态解耦。
*   **目标用户**：
    *   OpenClaw 面向重度多平台 IM 自动化用户及企业级网关部署。
    *   PicoClaw 与 DeepSeek Harness 面向嵌入式/移动端（Android/Termux）及注重本地隐私的边缘计算用户。
    *   Zeroclaw 与 hermes-agent 面向偏好 TUI/CLI 极客体验及高频自动化工作流的开发者。
*   **技术架构**：
    *   OpenClaw 采用 Go/Rust 混合架构，Gateway 为核心，强调高并发与多渠道一致性。
    *   Zeroclaw 深度拥抱 Rust，聚焦内存安全与 A2A 协议标准化。
    *   DeepSeek Harness 采用 TypeScript/Node.js 核心，通过独立 SSH Helper 和插件机制实现远程执行解耦。

### 6. 社区热度与成熟度
*   **快速迭代/高压冲刺期**：**OpenClaw**（500+ 动态，P0 阻塞多）、**hermes-agent**（831 条事件，更新机制痛点集中）。两者处于功能扩张后的质量收敛阶段，需大量资源清理技术债务。
*   **质量巩固/架构演进期**：**Zeroclaw**（聚焦安全与 RAG 架构）、**AstrBot**（UI 重构与 Issue 治理）、**QwenPaw**（UI 稳定性修复与 i18n 完善）。维护团队响应迅速，处于稳健增长阶段。
*   **维护/边缘探索期**：**PicoClaw**（依赖清理与移动端适配探索）、**DeepSeek Harness**（插件生态扩展与 Linux 支持补齐）。

### 7. 值得关注的趋势信号
1.  **“静默失败”治理成为新标准**：多项目（AstrBot, hermes-agent, OpenClaw）共同反馈缺乏诊断信息的痛点。未来的 AI 智能体框架必须内置**“全链路可观测性”**，将 Agent 工具调用、会话状态及后台任务的失败原因显性化，否则将严重阻碍企业级采用。
2.  **平台适配的“木桶效应”凸显**：Windows 平台的 SQLite 维护（OpenClaw）、AppContainer 沙箱（AstrBot）、路径大小写（DeepSeek Harness）成为共性痛点。跨平台底层系统兼容性的深度打磨，将是 2026 下半年各开源生态从“开发者玩具”走向“生产级工具”的核心分水岭。
3.  **Agent 架构向“分布式与解耦”演进**：Zeroclaw 的 A2A 协议、DeepSeek Harness 的 SSH Helper 及 PicoClaw 的边缘部署，标志着智能体正从单一进程内的循环，演化为**“中心编排+边缘执行+多 Agent 互操作”**的分布式架构。本地沙箱（Windows ACL/Linux 容器）与远程 SSH 的标准化接口将成为新的基础设施。
4.  **安全边界前移**：从外部渗透测试（QwenPaw RCE）到内部权限守卫（Zeroclaw OIDC, hermes-agent shell 漏洞），社区对 Agent 执行真实系统命令的风险意识达到顶峰。内置**“零信任”沙箱**与**细粒度审批机制**将是从个人助手向自动化运维/DevOps 智能体跨越的必选项。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**日期：** 2026-10-10  
**项目仓库：** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

## 1. 今日速览

项目过去 24 小时展现出极高的活跃度，Issues 更新 20 条（16 条活跃，4 条关闭），PR 更新 50 条（48 条待合并，2 条合并/关闭）。社区开发重心集中在解决 ZeroCode TUI 的交互稳定性、安全权限控制（OIDC/Auth 权限守卫）以及核心运行时行为的一致性修复上。尽管今日无版本发布，代码库正经历高强度的代码整合与架构优化，尤其是针对 `A2A` 协议架构、`Memory/RAG` 检索能力以及安全漏洞的密集处理。当前项目处于高强度开发迭代阶段，核心框架与 TUI 客户端的协同稳定性是当前主要攻坚方向。

## 2. 版本发布

*无新版本发布（0 releases）*

## 3. 项目进展

尽管今日合并的 PR 数量较少（共 2 条），但已关闭的 4 条 Issues 和合并 PR 解决了部分核心阻塞性问题。主要进展包括：
*   **测试与 CI 稳定性修复**：修复了 `Parallel Runtime Test` 中由于并发测试导致的 Flaky 问题，确保了测试管道的可靠性。[Issue #11180](https://github.com/zeroclaw-labs/zeroclaw/issues/11180)
*   **核心安全机制完善**：在 MCP 嵌套对象参数序列化、ZeroCode 正常完成响应后的任务队列暂停等安全与可靠性 Bug 上取得了突破，解决了因数据格式或状态机流转导致的异常中止。[Issue #11371](https://github.com/zeroclaw-labs/zeroclaw/issues/11371)、[Issue #10741](https://github.com/zeroclaw-labs/zeroclaw/issues/10741)
*   **网络 DNS 解析优化**：关闭了关于绑定 skill HTTP DNS 解析超时限制并添加 E2E 测试的工作项，提升了网络请求在超时边缘的安全性。[Issue #10550](https://github.com/zeroclaw-labs/zeroclaw/issues/10550)

## 4. 社区热点

*   **[Tracker] 维护者决策队列 (#8692)**：拥有 15 条评论，是今日讨论最活跃的核心协调节点。该 Tracker 专门用于管理 RFC、设计 Issue 及发布策略，维护者需在此做出接受、拒绝或延迟决策，反映了项目当前决策负载较重。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)
*   **多模态图片处理机制优化 (#9887)**：拥有 6 条评论，该 Issue 处于高优先级和"高风险"状态。用户强烈要求系统在处理超尺寸图片时能够自动缩放（Downscale）而非直接拒绝丢弃，并允许配置为 0 时无限制，这对于提升用户体验和防止恶意载荷非常关键。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9887)
*   **SQLite 会话后端时间戳 Bug (#11420)**：拥有 6 条评论。这是一个影响可观测性与审计的重要 Bug。每次对话轮次，SQLite 都会重写所有消息的 `created_at`，导致历史消息的时间戳被抹去，破坏了会话追踪能力。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11420)
*   **A2A 协议 Crate 架构 RFC (#11254)**：拥有 5 条评论。开发者正围绕 A2A（Agent-to-Agent）协议的通信模型、出站客户端及发现机制提出跨模块重构提议，预示项目正致力于增强多智能体互操作性。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11254)

## 5. Bug 与稳定性

按严重程度与紧急程度分类如下：
*   **高危/阻断性 (High/Critical)**：
    *   **泄漏漏洞**：`map_key_sections` 在每次调用时都会通过 `Box::leak` 永久泄漏 Schema 路径，导致守护进程内存无限增长（S1 严重级别）。目前尚无直接关联修复 PR。[Issue #11614](https://github.com/zeroclaw-labs/zeroclaw/issues/11614)
    *   **会话中断**：用户重新运行已批准的 shell 命令会导致 ACP 会话直接中止；此外，守护进程在处理 `SESSION_BUSY` 时会静默丢弃排队消息。[Issue #11612](https://github.com/zeroclaw-labs/zeroclaw/issues/11612)、[Issue #11618](https://github.com/zeroclaw-labs/zeroclaw/issues/11618) - 对应修复 PR [#11619](https://github.com/zeroclaw-labs/zeroclaw/pull/11619) 正在开发中。
    *   **计费异常**：OpenRouter 支出始终显示为 $0.00，且丢弃了 `total_tokens`，导致隐藏推理 token（如 Gemini）成本被严重低估。[Issue #11204](https://github.com/zeroclaw-labs/zeroclaw/issues/11204)、[Issue #11613](https://github.com/zeroclaw-labs/zeroclaw/issues/11613)

*   **中危/功能缺陷 (Medium)**：
    *   **TUI 交互异常**：ZeroCode 代理循环关闭了防止重复工具调用的保护机制，并会导致 `ask_user` 提示在超时时被丢弃且无记录。[Issue #11484](https://github.com/zeroclaw-labs/zeroclaw/issues/11484)、[Issue #11623](https://github.com/zeroclaw-labs/zeroclaw/issues/11623)
    *   **性能降级**：桌面端（Tauri）的 WebKitWebProcess 在空闲时出现连续重绘，占用约 100% 的 GPU 渲染引擎。[Issue #11632](https://github.com/zeroclaw-labs/zeroclaw/issues/11632)

## 6. 功能请求与路线图信号

当前路线图聚焦于增强代理能力与智能路由：
*   **知识语料库 RAG (RFC #11235)**：计划为代理引入文档检索（RAG）子系统，允许代理回答操作员维护的文档内容。
*   **智能搜索路由 (RFC #11074)**：提议为 `web_search_tool` 增加 `[[search_routes]]` 机制，实现基于提示词的智能搜索提供商路由。
*   **工具级本地云路由 (PR #11516)**：新增 `effort_routing` 策略，利用确定性复杂度分类器将简单操作保留在本地，复杂任务路由至云端。
*   **子进程内存看门狗 (PR #11456)**：为原生 shell 及 skill 子进程增加可选的内存使用量监控与自动中止机制，提升运行时安全性。
*   **配置结果报告 (PR #11466)**：优化配置应用机制，将报告每个目标应用的具体结果以提升运维可观测性。

## 7. 用户反馈摘要

*   **痛点**：用户频繁遭遇零代码 (ZeroCode) TUI 会话异常中断或消息丢失的问题（如 SESSION_BUSY 静默丢消息），严重影响了自动化工作流的连贯性。
*   **不满**：对计费系统的不透明和错误（尤其是 OpenRouter 提供商的成本计算问题）表达了强烈不满，影响了企业级用户对成本监控的信心。
*   **安全诉求**：多个外部安全测试团队（如 KUMA 框架）指出代理在执行 shell 命令及重复请求审批时缺乏足够的行为安全保护，强调了强化运行时权限边界与隔离机制的迫切需求。
*   **使用场景**：社区大量场景涉及将零代码 (ZeroCode) 用于多通道（Core/ACP 等）协作，用户希望系统能更稳定地处理并发队列、RPC 通信超时及子任务审批路由。

## 8. 待处理积压

*   **维护者决策积压**：由于 [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 决策队列中待决事项较多，建议维护者优先审视处于 `needs-maintainer-review` 和 `status:accepted` 状态的高风险架构 PR（如 OIDC 权限与委托工具相关的庞大 stacked PR 链 `#11408` 至 `#11423`），以免阻碍后续大型特性（如 A2A 通信）的开发。
*   **长期挂起的高优 Bug**：如 [Issue #9887](https://github.com/zeroclaw-labs/zeroclaw/issues/9887)（多模态图片限制）虽然被标记为阻塞（blocked），但已自 8 月起引发多次讨论，由于涉及配置与安全校验，可能面临较长的修复周期，需尽早排期。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期**: 2026-10-10
**数据来源**: GitHub (sipeed/picoclaw)
**活跃度指数**: 中等偏低 (主要集中在依赖维护与陈旧 Issue 清理)

## 1. 今日速览
过去24小时内，PicoClaw 项目处于**维护与清理**阶段，未发布新版本。社区活动主要围绕依赖库的自动更新（5个 PR 合并/关闭）以及陈旧（stale）问题的归档展开。尽管活跃度中等，但存在一个**高危稳定性问题**：Android 纯 Go 构建下的 DNS 解析失败，可能导致核心网关功能不可用。此外，关于 Web Console 反向代理支持的功能请求正在被社区关注，但目前尚未有明确的代码实现落地。整体来看，项目基础架构正在通过依赖升级保持现代化，但移动端适配与部署灵活性仍存在痛点。

## 2. 版本发布
**今日无新版本发布。**

## 3. 项目进展
今日主要的代码推进体现在**依赖管理**与**Agent 行为控制**两个维度：

*   **依赖批量升级**：维护者或机器人自动合并/关闭了5个依赖升级 PR，涉及核心 SDK 与安全库，显著降低了项目的供应链风险。
    *   `golang.org/x/crypto`: 0.53.0 -> 0.57.0 [PR #3389](https://github.com/sipeed/picoclaw/pull/3389)
    *   `github.com/modelcontextprotocol/go-sdk`: 1.6.1 -> 1.8.0 [PR #3388](https://github.com/sipeed/picoclaw/pull/3388)
    *   `github.com/anthropics/anthropic-sdk-go`: 1.55.1 -> 1.74.0 [PR #3387](https://github.com/sipeed/picoclaw/pull/3387)
    *   `maunium.net/go/mautrix`: 0.27.0 -> 0.31.0 [PR #3386](https://github.com/sipeed/picoclaw/pull/3386)
    *   `github.com/line/line-bot-sdk-go/v8`: 8.20.1 -> 8.22.0 [PR #3385](https://github.com/sipeed/picoclaw/pull/3385)
*   **Agent 超时控制功能开发中**：PR [#3414](https://github.com/sipeed/picoclaw/pull/3414) 引入了 `turn_time_budget_seconds` 参数，旨在防止 Agent 在单轮对话中无限循环调用工具。该 PR 目前处于 Open 状态，待合并。这标志着项目正在加强对 Agent 行为稳定性的微观控制。

## 4. 社区热点
*   **反向代理支持需求 [Issue #3415](https://github.com/sipeed/picoclaw/issues/3415)**
    *   **状态**: Open
    *   **热点分析**: 用户 @altman08 提出希望 PicoClaw 支持通过 Nginx 挂载在子路径（如 `/pico/`）下，而非仅支持根路径。这反映了中大型企业在部署内部工具时常见的**统一域名管理**诉求。
    *   **当前瓶颈**: 前端硬编码了部分根路径 API，导致简单的 Nginx 转发无法完全兼容。此 Issue 虽为 Open，但已标记 `stale`，若近期无代码响应，可能再次被归档。

*   **多行输入消息拆分 Bug [Issue #3391](https://github.com/sipeed/picoclaw/issues/3391)**
    *   **状态**: Closed (Stale)
    *   **热点分析**: 移动端 TUI 客户端将多行文本（如代码块）拆分为多条消息，破坏上下文。该 Issue 因长期未解决被标记为 Stale 并关闭，暗示该问题在核心逻辑中可能难以快速修复，或优先级较低。

## 5. Bug 与稳定性
按严重程度排列：

1.  **[Critical] Android 构建 DNS 解析失败**
    *   **Issue**: [#3420](https://github.com/sipeed/picoclaw/issues/3420)
    *   **状态**: Open
    *   **描述**: 官方 Android 构建（`CGO_ENABLED=0`）在网关尝试连接外部 API 时，DNS 解析失败（`dial udp 127.0.0.1:53: connection refused`）。
    *   **影响**: 导致 Android 客户端上的 Gateway 功能完全失效，无法调用 LLM API。
    *   **Fix 状态**: **暂无 Fix PR**。这是一个阻塞性的稳定性问题，需维护者优先级处理。

2.  **[High] 官方站点 TLS 证书过期**
    *   **Issue**: [#3377](https://github.com/sipeed/picoclaw/issues/3377)
    *   **状态**: Closed
    *   **描述**: picoclaw.io 的 TLS 证书于 2026-09-10 过期，导致站点在浏览器中无法访问。
    *   **Fix 状态**: 已关闭，推测证书已更新或站点状态已恢复，但需确认线上状态。

3.  **[Medium] 多行输入消息拆分**
    *   **Issue**: [#3391](https://github.com/sipeed/picoclaw/issues/3391)
    *   **状态**: Closed (Stale)
    *   **描述**: Pico 移动端客户端自动按换行符拆分消息。
    *   **Fix 状态**: 未修复，因 Stale 策略关闭。

## 6. 功能请求与路线图信号
*   **高概率纳入**: **Agent 轮次时间预算** ([PR #3414](https://github.com/sipeed/picoclaw/pull/3414))。该功能对于防止 LLM 陷入死循环至关重要，是 Agent 框架成熟度的重要标志，预计将在下一个迭代中合并。
*   **中概率纳入**: **Web Console 子路径部署**。虽然 [Issue #3415](https://github.com/sipeed/picoclaw/issues/3415) 提出了需求，但需要前端路由逻辑的重构，复杂度较高，可能推迟。
*   **低概率/需重构**: **反向代理完整支持**。依赖前端路径动态化，目前暂无代码进展。

## 7. 用户反馈摘要
*   **痛点 1: 移动端部署不灵活**。用户希望像 Web 应用一样，通过 Nginx 将 PicoClaw 嵌入到现有网站的子路径中，以便统一身份认证和管理（见 [Issue #3415](https://github.com/sipeed/picoclaw/issues/3415)）。
*   **痛点 2: 移动端输入体验割裂**。粘贴代码或多行文本时，消息被强制拆分，破坏了 AI 的上下文理解能力（见 [Issue #3391](https://github.com/sipeed/picoclaw/issues/3391)）。
*   **痛点 3: 官方构建在移动端不可用**。Android 用户发现官方二进制文件因 DNS 问题无法使用核心功能（见 [Issue #3420](https://github.com/sipeed/picoclaw/issues/3420)）。

## 8. 待处理积压
以下 Issues/PRs 已标记为 `stale` 或长期未响应，提醒维护者关注：

1.  **[Bug] Android DNS 解析失败 [Issue #3420](https://github.com/sipeed/picoclaw/issues/3420)**
    *   虽非 Stale，但作为新开的 Critical Bug，需立即响应。
2.  **[Feature] 反向代理支持 [Issue #3415](https://github.com/sipeed/picoclaw/issues/3415)**
    *   已标记 Stale。若维护者不打算在近期支持子路径部署，建议提供官方替代方案（如使用独立域名）或在文档中明确说明限制。
3.  **[Bug] 多行输入拆分 [Issue #3391](https://github.com/sipeed/picoclaw/issues/3391)**
    *   已关闭。建议重开并标记为 `good-first-issue` 或 `high-priority`，因为该问题严重影响移动端可用性。
4.  **[Dependabot] 依赖升级系列 PR**
    *   虽然大部分已合并/关闭，但需确保 CI 流水线在合并这些大量依赖更新后依然稳定，避免引入新的构建错误。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报

**日期：** 2026-10-10
**报告对象：** QwenPaw 开发团队及核心贡献者

---

## 1. 今日速览

过去24小时 QwenPaw 社区保持**高活跃度**，共产生 20 条 Issue 动态和 35 条 PR 动态，其中大量代码贡献集中在修复 UI 渲染异常和底层稳定性问题上。开发者响应迅速，今日已合并 13 个 PR，其中包括多项影响核心用户体验的关键 Bug 修复。安全方面，社区报告了一起涉及 MCP Driver 接口的高危 RCE 漏洞，需安全团队紧急介入。此外，项目正在稳步推进国际化（i18n）完善、本地模型推荐优化及插件生命周期管理的重构，项目整体处于快速迭代与质量加固并进的阶段。

## 2. 版本发布

无新版本发布。当前主要开发基于 v2.2.2-beta 系列分支，今日多项修复（如 #8147、#8143）已针对该测试版进行提交。

## 3. 项目进展

今日合并的 PR 显著提升了 Console 前端稳定性和多模态处理能力，重点推进了以下工作：

- **前端稳定性大幅改善**：修复了非安全上下文（HTTP/LAN 访问）下 `crypto.randomUUID` 报错导致的 Console 崩溃问题 [#8089](https://github.com/agentscope-ai/QwenPaw/pull/8089)、[#8147](https://github.com/agentscope-ai/QwenPaw/issues/8147)；同时修复了 SVG 尺寸属性引发的控制台大量警告报错 [#8157](https://github.com/agentscope-ai/QwenPaw/pull/8157)、[#8143](https://github.com/agentscope-ai/QwenPaw/issues/8143)。
- **多模态与媒体处理修复**：修复了图片裁剪时丢失 EXIF 方向信息的问题 [#8136](https://github.com/agentscope-ai/QwenPaw/pull/8136)、[#8129](https://github.com/agentscope-ai/QwenPaw/issues/8129)；同时修复了过大的图片导致会话永久不可用的严重 Bug [#8010](https://github.com/agentscope-ai/QwenPaw/pull/8010)、[#8009](https://github.com/agentscope-ai/QwenPaw/issues/8009)。
- **网络与底层性能优化**：通过离线池下载与孤立目录清理，解决了大量技能下载时阻塞 Event Loop 的性能瓶颈 [#8055](https://github.com/agentscope-ai/QwenPaw/pull/8055)；修复了 API 连接检测时缺少 Session 头导致模型测试失败的问题 [#7869](https://github.com/agentscope-ai/QwenPaw/pull/7869)、[#7599](https://github.com/agentscope-ai/QwenPaw/issues/7599)。

## 4. 社区热点

今日讨论最激烈、评论数最多（10 条）的两个 Issue 聚焦于核心对话体验，反映了社区对基础功能稳定性的极高期望：

- **上下文与记忆机制异常**：用户抱怨聊天记录无故消失，并与大模型上下文窗口关联产生误解，情绪较为焦躁，要求尽快修复 [#8134](https://github.com/agentscope-ai/QwenPaw/issues/8134)。
- **Sub-Agent 超时机制失效**：用户反映在 Windows 2.2.0 版本中，spawn subAgent 时 100% 任务失败且延长超时时间无效。用户甚至使用 AI 协助进行底层日志调试并将结果附在 Issue 中，展现了极强的社区探索欲 [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)。

## 5. Bug 与稳定性

今日报告的问题主要集中在 UI 渲染异常与底层安全漏洞，部分高危问题已附带修复 PR：

| 严重程度 | 问题描述 | 状态 | 关联 PR |
| :--- | :--- | :--- | :--- |
| **严重/安全** | MCP Driver 配置接口存在根权限 RCE 漏洞，已被利用植入挖矿木马（脱敏证据链） | Open | 暂无 Fix PR | [#8153](https://github.com/agentscope-ai/QwenPaw/issues/8153) |
| **高** | 页面频繁加载失败（多设备复现，严重影响基础体验） | Open | 修复中 | [#8120](https://github.com/agentscope-ai/QwenPaw/issues/8120), [#8154](https://github.com/agentscope-ai/QwenPaw/pull/8154) |
| **中** | 飞书通道富文本（图文混发）入站时图片被静默丢弃 | Open | 暂无 Fix PR | [#8150](https://github.com/agentscope-ai/QwenPaw/issues/8150) |
| **中** | 大上下文模型无法触发推理折叠与微压缩（压力微压缩机制对大窗口模型失效） | Open | 暂无 Fix PR | [#8148](https://github.com/agentscope-ai/QwenPaw/issues/8148) |
| **中** | Embedding 重新索引时 CJK 批次静默丢弃（复发） | Open | 暂无 Fix PR | [#8040](https://github.com/agentscope-ai/QwenPaw/issues/8040) |

*注：上文提到的 `crypto.randomUUID` 崩溃、SVG 报错、EXIF 丢失、超大图片卡死会话等问题已有合并的 PR 修复，不再列入待处理列表。*

## 6. 功能请求与路线图信号

结合今日提交的 PR 与 Issue，以下功能需求极有可能在下一版本中落地或处于高优先级开发队列：

- **国际化语言扩充**：用户提议增加西班牙语支持 [#8160](https://github.com/agentscope-ai/QwenPaw/issues/8160)，目前已有包含多语言字典对齐与架构优化的 PR 处于 Open 状态 [#8161](https://github.com/agentscope-ai/QwenPaw/pull/8161)；另外工具审批卡片的硬编码英文 i18n 支持也亟待解决 [#7809](https://github.com/agentscope-ai/QwenPaw/issues/7809)。
- **多模态能力补全**：补齐音频理解能力，请求添加内置工具 `view_audio` [#8081](https://github.com/agentscope-ai/QwenPaw/issues/8081)。
- **本地模型生态增强**：更新 QwenPaw-Flash 9B/27B/35B-A3B 的本地推荐规格并优化 llama.cpp 版本号解析逻辑，已合并或接近合并 [#8155](https://github.com/agentscope-ai/QwenPaw/pull/8155)、[#8151](https://github.com/agentscope-ai/QwenPaw/pull/8151)。
- **底层架构演进**：针对多 Agent 部署，正在开发 coding-cli 容器管理 API 端点 [#8156](https://github.com/agentscope-ai/QwenPaw/pull/8156)；同时引入基于 SQLite 的持久化分页历史记录以支持长会话 [#7931](https://github.com/agentscope-ai/QwenPaw/pull/7931)。

## 7. 用户反馈摘要

- **痛点场景（移动端/低配设备性能）**：有用户反馈在具有集成显卡（iGPU）的设备上打开 Console 时，由于大量 `backdrop-filter` 效果（如 12-28px 圆角的玻璃拟态）和每帧装饰性成本，导致 GPU 持续高占用，用户体验不佳。用户呼吁官方推出“降低视觉效果（reduced effects）”的 UI 层级开关 [#8135](https://github.com/agentscope-ai/QwenPaw/issues/8135)。
- **使用体验诉求（Hub 管理）**：Hub 管理中心在添加多账号时缺乏备注功能，用户期望能填写账号归属或说明以便管理多个工作空间 [#8152](https://github.com/agentscope-ai/QwenPaw/issues/8152)。
- **上下文状态不透明**：上下文显示状态信息（如进度圈、压缩状态）更新不及时，压缩阈值设置后未生效，需重启应用才更新 [#7994](https://github.com/agentscope-ai/QwenPaw/issues/7994)。

## 8. 待处理积压

以下高价值或重要 Issue/PR 创建时间较早且近期未发生重大进展，建议维护者安排人力跟进：

- **SubAgent 核心功能失效**：创建于 2026-09-11，至今 10 条评论无明确修复方案，导致用户完全无法使用该特性。需安排资深工程师深入排查任务调度引擎 [&#8203;#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)
- **OpenViking 记忆插件**：创建于 2026-09-07，为重要的外部记忆扩展，标签标有 `Under Review` 但停滞时间较长 [&#8203;#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613)
- **插件热重载与卸载机制重构**：创建于 2026-09-04，属于 `size/XXXL` 级别的重构，旨在提供回滚安全机制，当前仍处于 Open 且无合并动态 [&#8203;#7565](https://github.com/agentscope-ai/QwenPaw/pull/7565)

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes-Agent 项目动态日报
**日期**：2026-10-10
**数据来源**：GitHub 过去 24 小时数据

## 1. 今日速览
过去 24 小时内，hermes-agent 项目保持极高活跃度，共产生 **831 条** Issue/PR 更新事件（331 条 Issues，500 条 PRs）。
目前**无新版本发布**，社区讨论焦点高度集中在**安装更新机制的稳定性**（Updater 递归卡死、半应用状态恢复）以及**多平台适配**（Windows/macOS/Linux/Android）的兼容性问题上。
尽管今日**无**重要 PR 标记为“已合并/关闭”，但**待合并**队列中包含大量针对 P0/P1 级严重缺陷的修复提案（如 P0 桌面端缓冲区丢失、P0 安装递归、P1 认证刷新），表明项目正处于高强度的 Bug 修复冲刺期。
社区对“安装更新失败后缺乏恢复路径”的痛点反馈极为集中，已演变为多条评论的热门 Issue，亟需维护者优先处理。

## 2. 版本发布
*今日无新版本发布。*

## 3. 项目进展
*今日无重要 PR 被正式标记为合并或关闭。*
**但高价值 PR 正在活跃推进中（待合并状态）**，以下 PR 体现了项目近期的攻坚方向：
*   **#128603 [P0]** [`fix(desktop): keep a dirty queued-edit buffer when a background teardown exits the edit`](https://github.com/NousResearch/hermes-agent/pull/128603) - 修复后台销毁导致用户未提交的编辑内容丢失的致命缺陷。
*   **#131111 [P2]** [`fix(gateway): preserve reply boundaries through ingress and shutdown`](https://github.com/NousResearch/hermes-agent/pull/131111) - 强化网关在复杂多平台（Slack/Matrix 等）下的响应边界和安全性。
*   **#10250 [P2]** [`fix(mcp): make MCP subprocess death invisible to the agent`](https://github.com/NousResearch/hermes-agent/pull/10250) - 增强 MCP 鲁棒性，解决长期运行下因子进程异常退出导致的 23 次异常/357 次工具调用失败问题。
*   **#135826 / #135834 [安全/功能]** - 清理无法安装的 skills 行，并修复社区技能在嵌套/外部目录下的 shell 执行漏洞。

## 4. 社区热点
当前讨论最密集的 Issue 均围绕**系统稳定性与安全性**，用户对这些痛点的反应强烈。

1.  **[P3] [#134107] Bundled 'solstice' provider fails to load (leaks stderr to TUI)** ([39 评论])
    *   **链接**：[Issue #134107](https://github.com/NousResearch/hermes-agent/issues/134107)
    *   **痛点**：`hermes update` 过程中 `httpx` 缺失导致 provider 加载失败，错误提示反复干扰 TUI 渲染，极大破坏用户体验。
2.  **[P2] [#133992] macOS Desktop update hand-off regression** ([24 评论])
    *   **链接**：[Issue #133992](https://github.com/NousResearch/hermes-agent/issues/133992)
    *   **痛点**：macOS 端由于锁机制回归，点击更新按钮必定报错 `exit code 2`，阻塞了部分用户的更新流程。
3.  **[P0] [#132401] scratch prune silently destroys agent work** ([20 评论])
    *   **链接**：[Issue #132401](https://github.com/NousResearch/hermes-agent/issues/132401)
    *   **痛点**：`TMPDIR` 指向的 scratch 目录在 24h 未动时会被静默删除，且无任何日志或隔离机制，导致 Agent 的多日运行数据无故丢失。
4.  **[P3] [#112639] RFC: script-speed computer use** ([16 评论])
    *   **链接**：[Issue #112639](https://github.com/NousResearch/hermes-agent/issues/112639)
    *   **痛点**：用户希望 Agent 执行常规操作时能像“编译好的脚本”一样快速，减少 LLM 响应延迟。
5.  **[P2] [#124583] terminal tool: process(action=...) non-existent tool name** ([16 评论])
    *   **链接**：[Issue #124583](https://github.com/NousResearch/hermes-agent/issues/124583)
    *   **痛点**：Terminal 工具的后台提示文本指错了工具名（应为 `process_manage`），导致用户照做必然失败，属于误导性文档缺陷。

## 5. Bug 与稳定性
当前报告的 Bug 严重性较高，涉及核心操作和数据安全，需引起重视。

*   **P0 级**
    *   [Scratch 目录静默销毁](https://github.com/NousResearch/hermes-agent/issues/132401)：无日志记录，无恢复机制。**已有相关 PR 修复**（`#128603` 为相关桌面端脏数据的修复）。
*   **P1 级**
    *   [#125437 失败更新后无恢复路径](https://github.com/NousResearch/hermes-agent/issues/125437)：安装半应用状态（缺失 pydantic_core 等），用户只能手工输入命令修复。
    *   [#131055 Linux 桌面端二次启动卡死](https://github.com/NousResearch/hermes-agent/issues/131055)：沙盒降级逻辑导致渲染端循环 SIGILL。
    *   [#122555 Python 解释器 ABI 冲突](https://github.com/NousResearch/hermes-agent/issues/122555)：激活环境时未校验 ABI，导致原有 site-packages 丢失。
*   **P2 级**
    *   [#124794 Updater 递归 fetch 卡死](https://github.com/NousResearch/hermes-agent/issues/124794)：在 `git < 2.44` 环境下产生无限进程树，耗尽 swap 并挂起系统。**已有相关 PR 修复**（`#130493` 解决 Gateway profile 问题，`#134857` 处理了 CUA 相关的 schema 问题）。
    *   [#128293 压缩后上下文重复](https://github.com/NousResearch/hermes-agent/issues/128293)：桌面端压缩操作后渲染文本完全重复两次。
    *   [#79357 压缩 idle 计时器失效](https://github.com/NousResearch/hermes-agent/issues/79357)：Gateway 模式下 idle 时间戳被重置，导致压缩规则不生效。

## 6. 功能请求与路线图信号
基于当前高票或热门 Issue，以下功能极有可能纳入下一版本，建议团队评估：

*   **[Feature] 官方 API 向进行中的 session 投递消息** ([#103748](https://github.com/NousResearch/hermes-agent/issues/103748), 8 评论)：目前用户无法在外部向 Agent 的交互式会话注入消息，影响自动化场景。
*   **[Feature] 移动端官方 App (iOS/Android 支持语音通话)** ([#11911](https://github.com/NousResearch/hermes-agent/issues/11911), 👍 12 反应)：呼声最高的功能之一，要求实现免提场景。
*   **[Feature] 子代理模型与 Provider 配置向导** ([#67347](https://github.com/NousResearch/hermes-agent/issues/67347), 10 评论)：当前为裸文本输入，极易出错，急需向导。
*   **[Feature] 可配置聊天栏宽度** ([#55287](https://github.com/NousResearch/hermes-agent/issues/55287), 👍 3 反应)：固定宽度导致屏幕空间浪费。
*   **[Feature] 跨平台 session 组映射** ([#79198](https://github.com/NousResearch/hermes-agent/issues/79198), 8 评论)：用户希望同一个用户在 Discord/Telegram 的会话记忆能共享。

## 7. 用户反馈摘要
*   **更新机制的严重痛点**：用户对“更新失败后的系统状态”极其不满。多个 Issue（#125437, #124794, #133992）反映了用户被“半吊子”的安装或锁冲突困住，且产品内部没有任何恢复选项，只能依靠文档中冗长的手工指令。
*   **工具文档误导性**：用户对内部工具文档的准确性提出质疑（#124583），当文档指向不存在的工具时，会导致自动化链路的死胡同。
*   **多模型架构的灵活性**：用户运行多 Agent 架构时（#103481, #79198），对系统无法高效缓存跨会话上下文、或者无法跨平台共享状态表达了强烈诉求。

## 8. 待处理积压
*   **[#131859] API 无法创建 Pull Request** ([17 评论, P2, 阻塞中])
    *   **链接**：[Issue #131859](https://github.com/NousResearch/hermes-agent/issues/131859)
    *   **描述**：特定账号通过 API 提交 PR 时遭遇权限拒绝（而 Issue 提交正常）。该问题已持续数日且被标记为 `blocked`，需要平台团队检查 Git 权限配置。
*   **[#31415] Android Termux 安装失败** ([10 评论, P3, 长期未响应])
    *   **链接**：[Issue #31415](https://github.com/NousResearch/hermes-agent/issues/31415)
    *   **描述**：用户自 2026-05 起报告在 Android 13/16 的 Termux 下无法构建 psutil。该 Issue 在 24 小时内仍有更新（#10 更新），说明移动端兼容性仍是未解的悬案，建议安排工程师介入分析 Termux 环境限制。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期**: 2026-10-10
**数据窗口**: 过去 24 小时

## 1. 今日速览
过去 24 小时内，AstrBot 项目保持高度活跃，共更新 17 条 Issues（10 新开/活跃，7 已关闭）及 33 条 Pull Requests（14 已合并/关闭，19 待合并）。项目核心工作聚焦于 **Web UI 界面重构**（侧边栏、内容卡片固定布局）、**Agent 工具循环优化**（异步生成器任务一致性、后台任务日志兜底）以及 **平台兼容性修复**（Discord 图片上传、QQ 数学公式渲染）。整体社区贡献活跃，多个 Bug 在提交当日即获得修复 PR 并合并，表明维护响应速度较快，项目处于持续迭代与健康维护状态。

## 2. 版本发布
**无新版本发布**。
截至 2026-10-10，未检测到新的 Release 标签。项目处于日常 Commit 与 PR 合并阶段，预计后续版本将包含今日合并的多项 UI 与核心逻辑修复。

## 3. 项目进展
今日共 **14 个 PR 处于已合并或关闭状态**，主要推进了以下领域：

*   **Web UI 体验重构与修复**：
    *   [PR #10320](https://github.com/AstrBotDevs/AstrBot/pull/10320) 合并，将 Dashboard 主内容区重构为悬浮卡片，并固定页面边框（Toolbar/Side Nav），仅内容区滚动，显著优化了长页面浏览体验。
    *   [PR #10480](https://github.com/AstrBotDevs/AstrBot/pull/10480) 合并，修复了滚动后圆角与边框跟随内容移动的问题，确保内容框架固定在视口内。
    *   [PR #10321](https://github.com/AstrBotDevs/AstrBot/pull/10321) 合并，为模型设置增加了快捷入口及独立的“访问控制”板块，简化了管理员 ID 与白名单配置流程。
*   **Agent 核心逻辑稳定性增强**：
    *   [PR #10474](https://github.com/AstrBotDevs/AstrBot/pull/10474) 合并，修复了异步工具生成器在不同 asyncio 任务中运行导致的清理逻辑失效问题（对应 [Issue #10473](https://github.com/AstrBotDevs/AstrBot/issues/10473)），确保了 `finally` 块的可靠执行。
    *   [PR #10398](https://github.com/AstrBotDevs/AstrBot/pull/10398) 合并，增加了后台任务结果未送达用户时的 WARNING 日志机制（对应 [Issue #10395](https://github.com/AstrBotDevs/AstrBot/issues/10395)），解决了“静默失败”难以排查的问题。
    *   [PR #10434](https://github.com/AstrBotDevs/AstrBot/pull/10434) 合并，修复了插件产出的相对 URL 被误判为本地路径导致图片静默丢弃的 Bug（对应 [Issue #10264](https://github.com/AstrBotDevs/AstrBot/issues/10264)）。

## 4. 社区热点
今日讨论最活跃的功能请求集中在 **UI 自定义** 与 **模型交互兼容性** 方面：

*   **自定义侧边栏深化**：
    *   [Issue #10417](https://github.com/AstrBotDevs/AstrBot/issues/10417) 获得 3 个👍，用户希望自定义侧边栏不仅限于一级菜单，还能调整二级菜单顺序与层级，以便将常用日志或数据页提升为一级入口。
    *   对应 PR [PR #10485](https://github.com/AstrBotDevs/AstrBot/pull/10485) 已提交，实现了拖拽排序、折叠/展开子路由及提升子页面为一级菜单的功能，目前待合并。
*   **Responses API 降级策略**：
    *   [Issue #10469](https://github.com/AstrBotDevs/AstrBot/issues/10469) 指出部分模型在 Responses 格式下出现 400 错误，用户强烈建议增加“自动降级为 chat/completions”选项，或提供明显的格式切换标识，避免用户因格式混淆导致配置繁琐。
*   **Issue 清理机制**：
    *   [Issue #10470](https://github.com/AstrBotDevs/AstrBot/issues/10470) 提议建立自动关闭不活跃 Issue 的 Action，以解决长期堆积问题。
    *   对应 PR [PR #10475](https://github.com/AstrBotDevs/AstrBot/pull/10475) 已提交，旨在通过 GitHub Stale Action 清理 60 天无活跃的提交，并强制使用提交模板，目前待审核。

## 5. Bug 与稳定性
今日报告的 Bug 主要涉及前端渲染与后端配置逻辑，多数已关联修复 PR：

1.  **Web UI 滚动渲染异常**：
    *   [Issue #10479](https://github.com/AstrBotDevs/AstrBot/issues/10479) 报告滚动后圆角和横线不固定。
    *   **状态**：已关闭，由 [PR #10480](https://github.com/AstrBotDevs/AstrBot/pull/10480) 修复。
2.  **Web UI 侧边栏功能失效**：
    *   [Issue #10312](https://github.com/AstrBotDevs/AstrBot/issues/10312) 报告界面布局更改后自定义侧边栏失效，出现空模块且拖拽无效。
    *   **状态**：已关闭，推测由近期 UI 重构 PR（如 #10320）间接修复或重置。
3.  **模型添加配置丢失**：
    *   [Issue #10476](https://github.com/AstrBotDevs/AstrBot/issues/10476) 报告获取模型列表后，非首次添加模型时无法正确获取上游配置，导致能力全选但上下文为 0。
    *   **状态**：开放中，暂无直接关联的 Fix PR，需维护者优先关注。
4.  **工具白名单误杀内置工具**：
    *   [Issue #10456](https://github.com/AstrBotDevs/AstrBot/issues/10456) 报告人格设置中勾选插件工具后，系统内置工具（shell, python 等）被一同禁用，且界面无内置工具选项。
    *   **状态**：开放中，已提交修复 PR [PR #10463](https://github.com/AstrBotDevs/AstrBot/pull/10463)（Keep computer-use tools under a subagent whitelist and log misses），待合并。
5.  **平台默认配置重复**：
    *   [Issue #10481](https://github.com/AstrBotDevs/AstrBot/issues/10481) 报告平台默认配置下拉框出现重复的 default 选项。
    *   **状态**：开放中，暂无 Fix PR。

## 6. 功能请求与路线图信号
基于今日 Issue 与 PR 分析，以下功能可能被纳入下一版本：

*   **Windows 原生沙盒支持**：
    *   [PR #10466](https://github.com/AstrBotDevs/AstrBot/pull/10466) 提出为本地电脑工具添加基于 AppContainer 的原生 Windows 隔离（ACL 隔离、网络控制、进程树清理）。这是提升本地执行安全性的重要特性，目前待合并。
*   **插件市场适配器分类**：
    *   [Issue #10484](https://github.com/AstrBotDevs/AstrBot/issues/10484) 请求在插件市场增加“支持的适配器平台”分类，以便用户快速筛选（如排除仅支持 aiocqhttp 的插件）。该需求符合社区对插件易用性的期待。
*   **Issue 自动化清理**：
    *   [PR #10475](https://github.com/AstrBotDevs/AstrBot/pull/10475) 引入 Stale Bot 机制，预示项目将开始严格治理 Issue 积压，提升维护效率。

## 7. 用户反馈摘要
*   **UI 体验痛点**：用户对新 UI 的二级菜单排序灵活性表示不满，希望恢复旧版 UI 的自定义能力或增加层级调整功能（[Issue #10417](https://github.com/AstrBotDevs/AstrBot/issues/10417)）。
*   **配置复杂性抱怨**：用户在切换 Responses/Completions 格式时感到繁琐，缺乏直观标识，导致排查错误困难（[Issue #10469](https://github.com/AstrBotDevs/AstrBot/issues/10469)）。
*   **视频输入需求**：多模态模型用户希望支持视频输入，目前仅能作为文件处理，无法真正理解视频内容（[Issue #8048](https://github.com/AstrBotDevs/AstrBot/issues/8048)）。
*   **静默失败困扰**：用户对后台任务结果未送达时缺乏日志记录表示不满，难以排查 Agent 行为异常（[Issue #10395](https://github.com/AstrBotDevs/AstrBot/issues/10395)，已通过日志增强缓解）。

## 8. 待处理积压
*   **高优先级 PR 审核**：
    *   [PR #10466](https://github.com/AstrBotDevs/AstrBot/pull/10466) (Windows AppContainer) 与 [PR #10485](https://github.com/AstrBotDevs/AstrBot/pull/10485) (侧边栏二级自定义) 是今日核心的功能性增强，建议维护者优先审查。
    *   [PR #10463](https://github.com/AstrBotDevs/AstrBot/pull/10463) 修复了关键的 Agent 工具白名单 Bug，涉及核心逻辑，需仔细验证副作用。
*   **长期未响应 Issue**：
    *   [Issue #8048](https://github.com/AstrBotDevs/AstrBot/issues/8048) (视频输入支持) 自 2026-05-07 创建至今，已逾 5 个月无实质性进展，建议维护者明确路线图计划或临时关闭以避免资源浪费。
    *   [Issue #9762](https://github.com/AstrBotDevs/AstrBot/pull/9762) (Discord 图片上传修复) 自 2026-08-21 创建，已搁置近两个月，涉及 Discord 平台兼容性，建议尽快合并或指派。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报 (2026-10-10)

## 1.  今日速览
DeepSeek Harness 今日社区活跃度极高，过去24小时内 GitHub Discussions 更新量达到 **194 条**，显示出强大的用户参与度。项目于今日发布了新版本 **dsh-v0.2.1-alpha.2**，重点引入了实验性插件系统（翻译、Git Worktrees）、SSH Helper 运行时以及多项 Windows 环境下的稳定性修复。当前社区焦点集中在 **Linux 平台支持缺失**、**Windows 沙箱权限机制** 以及 **长期记忆功能** 的需求上。尽管核心版本迭代迅速，但部分早期迁移错误（v0-v3）和特定场景下的崩溃问题仍在讨论中，需持续关注回归风险。

## 2. 版本发布
### 最新 Release: dsh-v0.2.1-alpha.2
本次更新（v0.2.1-alpha.2）作为合并摘要，带来了以下主要变更：

**新增功能：**
*   **实验性插件系统增强：**
    *   **翻译插件**：支持 Bing/Google/DeepSeek Flash 进行思考过程机器翻译。
    *   **Git Worktrees 插件**：允许 Agent 创建并进入独立的 Git checkout 目录。
    *   **Session 状态接口**：允许插件读写会话记录。
*   **核心能力扩展：**
    *   **全局指令支持**：支持读取共享 `AGENTS.md`，可通过 `DSH_AGENTS_HOME` 指定目录。
    *   **工作目录工具**：新增 `working_directory` 工具，支持 TS/Python SDK 读写和切换会话工作目录。
    *   **SSH Helper 运行时**：支持远端文件操作、进程管理、终端、沙箱及 Node PTC，作为独立可执行文件提供。
    *   **UI/UX 优化**：新增工作步骤收起时机设置；恢复子代理输入栏的图片粘贴/拖放功能。
*   **路由与调度**：
    *   `pi-ai` 路由支持按模型能力动态处理系统提示词更新及工具的新增/移除。
    *   Official 插件列表新增 Claude Code 和 Codex 组合包的按需安装入口。

**问题修复（关键稳定性改进）：**
*   **流式响应挂起修复**：解决模型流停止且底层传输不响应取消时，请求超过空闲超时仍挂起的问题。
*   **Windows 环境修复**：
    *   修复大量输出滚屏后 PowerShell 无法结束调用的问题。
    *   修复缺失 `sleep` 命令时 Claude Code Mods 示例在取消后仍执行工具的问题。
*   **状态一致性**：修复 Trajectory 将等待/流式输出/重试请求误标为完成的问题；修复后台工作流因父级步骤结束被误标为中断的问题。
*   **插件与配置**：修复插件元信息不可读或扩展准备失败导致整个 DeepSeek 请求被阻断的问题；修复配置刷新期间旧数据编辑导致的 UI 不一致。

**迁移/注意事项：**
*   本次为 Alpha 版本，新功能标记为“实验性”，建议在插件页手动启用测试。
*   SSH Helper 运行时独立，需确保环境中有对应的可执行文件权限。

## 3. 项目进展
由于该项目未启用 GitHub PR，所有代码变更均通过 **Releases** 落地。根据 **v0.2.1-alpha.2** 的 Changelog，项目今日在以下方向取得了实质性进展：

1.  **插件生态解耦**：通过新增 Session 状态记录接口和 Git Worktrees 插件，项目进一步将核心逻辑与扩展功能解耦，为第三方开发者提供了更稳定的接入点。
2.  **远程执行能力深化**：SSH 独立 Helper 的引入标志着 DSH 从本地/容器化执行向真正的分布式/远程执行扩展，支持远端沙箱和终端操作。
3.  **Windows 兼容性攻坚**：针对 PowerShell 滚屏、sleep 命令缺失等 Windows 特有痛点进行了专项修复，表明维护团队正在提升跨平台（尤其是 Windows Desktop）的稳定性。
4.  **状态机健壮性**：修复了 Trajectory 状态误判和后台工作流中断误报，提升了长任务运行的可观测性和准确性。

## 4. 社区热点
基于过去 24 小时 Discussions 评论数排序，当前社区讨论最激烈的话题如下：

1.  **dsh-vault: 加密凭据保险库插件** ([#1457](https://github.com/deepseek-ai/deepseek-harness/discussions/1457))
    *   **热度**：254 条评论。
    *   **诉求**：用户强烈需要本地加密存储 API Key、SSH 凭据等敏感信息，避免明文写在配置文件中。作者提供了基于 `node:crypto` 的零依赖原型，社区反响热烈，有望成为官方插件或标准功能。
2.  **Memory 能力缺失** ([#14](https://github.com/deepseek-ai/deepseek-harness/discussions/14) & [#1345](https://github.com/deepseek-ai/deepseek-harness/discussions/1345))
    *   **热度**：合计 53+ 条评论。
    *   **诉求**：用户希望实现跨会话的长期记忆（类似 Codex/Claude Code 的 memory 迁移），目前 Agent 仅具备会话内上下文。这是提升 AI 助手“个人化”体验的核心痛点。
3.  **v0→v3 会话迁移失败** ([#6559](https://github.com/deepseek-ai/deepseek-harness/discussions/6559))
    *   **热度**：25 条评论。
    *   **诉求**：早期版本（0.1.2-rc.1）创建的大量会话在升级到 0.1.5+ 后无法打开。用户已提供验证通过的修复配方（49/49 成功），急需官方工具批量处理历史数据。
4.  **Linux 支持被遗忘** ([#8107](https://github.com/deepseek-ai/deepseek-harness/discussions/8107))
    *   **热度**：24 条评论。
    *   **诉求**：用户抱怨 Linux 平台长期未得到官方支持，目前仅能通过 WorkBuddy/Qoder 等第三方勉强使用。这是阻碍开源社区开发者（通常为 Linux 用户）采用的最大障碍。

## 5. Bug 与稳定性
**严重程度：高**

*   **Windows 安装路径大小写导致设置保存失败** ([#8928](https://github.com/deepseek-ai/deepseek-harness/discussions/8928))
    *   **现象**：Desktop 0.2.0-rc.2 在 Windows 下，若安装路径包含大小写混合（如 `C:\Users\Admin\...` vs `c:\users\admin\...`），`dsh-app-boot` 启动双实例，导致设置页保存模型供应商配置时报错 `profile reload requires the root Include entry`。
    *   **状态**：已定位根因，社区提供规避方案，暂无官方 Fix。
*   **会话格式 v3→v4 迁移崩溃 (SIGABRT)** ([#8617](https://github.com/deepseek-ai/deepseek-harness/discussions/8617))
    *   **现象**：DSH 0.2.0-rc.2 在迁移旧会话时触发 SIGABRT (exit 134)，且旧版本无法读取新存储。
    *   **状态**：崩溃级 Bug，阻塞部分用户升级。
*   **Scheduler 导致会话永久 400 错误** ([#4549](https://github.com/deepseek-ai/deepseek-harness/discussions/4549))
    *   **现象**：工具调用失败时未写入 `tool/result`，导致后续所有请求被模型端拒绝为 `INVALID_REQUEST`。会话永久“砖”掉，需手动修复历史。
    *   **状态**：已提供修复补丁思路（append missing tool/result），待官方合并。

**严重程度：中**

*   **Windows ACL 沙箱权限补授失败** ([#423](https://github.com/deepseek-ai/deepseek-harness/discussions/423) & [#7504](https://github.com/deepseek-ai/deepseek-harness/discussions/7504))
    *   **现象**：工作区连接后，外部新建子目录无法写入，或因 DACL 缺少 `WRITE_OWNER` 导致 `SetNamedSecurityInfoW` 失败。
    *   **状态**：社区已分析根因（一次性授权 + 永久驻留逻辑缺陷），等待官方修正策略。
*   **附件缺失导致全局请求失败** ([#7834](https://github.com/deepseek-ai/deepseek-harness/discussions/7834))
    *   **现象**：会话引用的图片附件在磁盘被删除后，整个会话的所有请求失败，并误导性地报错为 `DeepSeek Messages transport failed`。

## 6. 功能请求与路线图信号
*   **本地 LLM 超时配置** ([#3157](https://github.com/deepseek-ai/deepseek-harness/discussions/3157))
    *   用户请求将本地 LLM（如 Ollama）的超时时间从 5 分钟提升至 20 分钟。鉴于 DSH 正强化本地/私有化部署能力，**高概率纳入下一版本**。
*   **桌面版 Ctrl+F 关键字搜索** ([#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713))
    *   用户提供了可行原型，指出底层引擎已就绪但 UI 入口缺失。**高概率纳入**，作为基础 UX 改进。
*   **长期记忆后端** ([#1345](https://github.com/deepseek-ai/deepseek-harness/discussions/1345))
    *   需求明确但实现复杂（需定义结构化存储接口）。预计作为 **v0.3.x** 或后续大版本的核心特性规划中。
*   **dsh-vault 加密保险库** ([#1457](https://github.com/deepseek-ai/deepseek-harness/discussions/1457))
    *   由于热度极高且提供了零依赖实现，极可能作为 **官方实验性插件** 在近期版本中集成。

## 7. 用户反馈摘要
*   **痛点**：
    *   **平台支持失衡**：Linux 用户感到被“遗忘”，Windows 用户遭遇沙箱和路径大小写等底层系统兼容性问题。
    *   **数据持久化脆弱**：会话格式迁移（v0-v3-v4）频繁出现锁定或崩溃，且错误提示误导性强（如附件缺失报网络错）。
    *   **配置复杂度**：本地 LLM 高级参数（如 timeout）缺乏直观的配置入口。
*   **满意点**：
    *   社区响应速度快，许多复杂 Bug（如 ACL、Scheduler）都有详细的技术分析和补丁。
    *   新发布的 v0.2.1-alpha.2 在插件扩展性和 Windows 基础稳定性上有明显改进。

## 8. 待处理积压
*   **#6559 (v0→v3 迁移修复)**：虽然已有社区验证配方，但官方工具链尚未包含批量修复脚本，需维护者优先处理以消除早期用户的升级障碍。
*   **#4549 (Scheduler 400 错误)**：该问题导致会话永久不可用，属于数据一致性级别的严重 Bug，建议优先于功能开发进行修复。
*   **#8107 (Linux 支持)**：尽管评论数不如 Bug 多，但属于战略性缺失，建议在 Roadmap 中明确 Linux 支持的时间表，以安抚开源社区用户。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*