# OpenClaw 生态日报 2026-10-11

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-11 00:34 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 (2026-10-11)

基于 GitHub 过去 24 小时的数据（Issues 500 条更新，PR 500 条更新，1 个新 Release），OpenClaw 项目当前处于**极高活跃度**的维护与修复阶段。

## 1. 今日速览

*   **活跃度评估**：项目社区极其活跃，过去 24 小时有 500 条 Issue 和 500 条 PR 更新。主要焦点集中在修复近期版本（2026.9.x）引入的稳定性回归、性能瓶颈以及上下文管理逻辑。
*   **核心状态**：项目正经历一次密集的“修复冲刺”。维护者（如 @steipete, @RomneyDa, @obviyus）在 24 小时内提交并推进了大量针对 Gateway 性能、Telegram/Codex 通道稳定性以及上下文预算计算的修复。
*   **风险提示**：存在多个 P0 级别的严重 Bug（如 SQLite WAL 无限增长、Gateway 启动后挂起、Windows 升级卡死），虽然部分已有修复 PR 或正在处理中，但稳定性压力较大。
*   **进展亮点**：新版本 v2026.10.1 发布，重点解决了会话内存保留和嵌入缓存迁移问题。

## 2. 版本发布

**新版本：v2026.10.1**

*   **主要更新 (Highlights)**：
    *   **Sessions and memory**：在注册表变更期间保留了使用记录。
    *   **Worker Attachments**：支持从远程工作区交付 worker 附件。
    *   **稳定性优化**：防止排队取消和转录别名导致的活动回合停滞（stalling active turns）。
    *   **一致性**：保持 continuation signatures 对齐。
    *   **缓存迁移**：迁移了 embedding caches。
*   **迁移注意事项**：用户应从旧版本升级以获取上述稳定性修复，特别是那些使用远程工作区或大量嵌入缓存的用户。无明确的破坏性变更声明，但涉及底层缓存结构迁移。

## 3. 项目进展

今日合并/关闭的重要 PR 推动了以下方面的修复：

*   **Gateway 性能与启动速度**：
    *   [PR #168649](https://github.com/openclaw/openclaw/pull/168649)：`fix: reduce Gateway health stalls in large agent fleets`。针对数百个 agent 的大规模集群，显著改善了启动后的健康检查响应时间（从 377s 降至 168s），并优化了 SIGINT 下的关闭速度。
    *   [PR #168638](https://github.com/openclaw/openclaw/pull/168638)：`fix(state): bound startup deletion-journal reads`。解决了后台 agent 数据库准备阶段因删除日志读取导致的启动阻塞问题。
*   **上下文管理 (Context Management)**：
    *   [PR #168745](https://github.com/openclaw/openclaw/pull/168745) 和 [PR #168730](https://github.com/openclaw/openclaw/pull/168730)：修复了保存在上下文容量在切换模型/运行时后未正确失效或丢失元数据的问题。
    *   [PR #156636](https://github.com/openclaw/openclaw/pull/156636)：`fix(copilot): replace synthetic 128K estimates with accepted context limits`。修复了 Copilot 模型在账号发布不同上下文限制后仍保留 128K 合成估算值的问题。
*   **Claude CLI 与工具保留**：
    *   [PR #168670](https://github.com/openclaw/openclaw/pull/168670)：`fix: preserve Claude CLI tools after exec completion`。修复了后台 `exec` 命令完成后，Claude CLI 延续轮次丢失原生和 MCP 工具的问题。
    *   [PR #168726](https://github.com/openclaw/openclaw/pull/168726)：`fix(agents): restore context when switching back to Claude CLI`。修复了切换模型后切回 Claude CLI 时上下文回忆过旧信息的问题。

## 4. 社区热点

以下 Issues 讨论最活跃，反映了社区的核心痛点：

1.  **[Issue #143524](https://github.com/openclaw/openclaw/issues/143524) [P0, OPEN]: Agent SQLite WAL grows to 1.4–2.8 GB; blocks gateway startup**
    *   **摘要**：在 Windows 单网关主机上，agent 数据库的 WAL 文件无界增长至 2.8GB，且未进行 checkpoint，导致网关启动阻塞。
    *   **背景**：用户报告即使设置了 `wal_autocheckpoint`，WAL 仍增长。这是一个严重的资源泄露问题，影响高负载场景。
    *   **状态**：开放，标记为 P0，需要维护者审查。
2.  **[Issue #149538](https://github.com/openclaw/openclaw/issues/149538) [P0, CLOSED]: Gateway reaches ready but never serves; event loop starved (632-agent fleet)**
    *   **摘要**：在大型集群（632 agents）中，网关达到 `ready` 状态后事件循环饥饿，健康检查超时，RSS 内存飙升导致主机 OOM。
    *   **进展**：虽标记为 CLOSED，但相关性能修复 [PR #168649](https://github.com/openclaw/openclaw/pull/168649) 正在积极处理类似的大集群启动阻塞问题。
3.  **[Issue #168307](https://github.com/openclaw/openclaw/issues/168307) [P0, CLOSED]: Gateway 2026.9.9 non-converging single-core grind**
    *   **摘要**：Windows 上 2026.9.9 版本启动后单核 CPU 100% 占用，持续 6 小时以上间歇性拒绝连接。
    *   **进展**：已关闭，可能已在后续版本或补丁中修复，或确认为特定环境配置问题。
4.  **[Issue #48003](https://github.com/openclaw/openclaw/issues/48003) [P1, OPEN]: Steer mode does not inject messages mid-turn**
    *   **摘要**：`messages.queue.mode: "steer"` 无法在主要会话的当前回合中注入消息，而是排队等待。用户期望在工具边界处进行“转向”干预。
    *   **背景**：这是功能回归（Regression），由 3 月份的提交引入。

## 5. Bug 与稳定性

按严重程度排列的重点 Bug：

*   **[P0] [Issue #143524](https://github.com/openclaw/openclaw/issues/143524): SQLite WAL 无限增长**
    *   **描述**：Windows 环境下 WAL 文件巨大，阻塞启动。
    *   **Fix PR**：暂无直接关联的开放 Fix PR，标记 `no-new-fix-pr`，需维护者介入。
*   **[P0] [Issue #160521](https://github.com/openclaw/openclaw/issues/160521): Gateway crash: state DB read-admission seal -> unhandled rejection**
    *   **描述**：2026.9.6 版本中，状态数据库读取准入密封导致 `reconcileActive` 中出现未处理的 rejection，导致网关崩溃。
    *   **Fix PR**：暂无直接 Fix PR。
*   **[P0] [Issue #160959](https://github.com/openclaw/openclaw/issues/160959): Gateway blocks for minutes while capturing large external plugins**
    *   **描述**：2026.9.6 回归。捕获大型外部插件或依赖树时，Gateway 事件循环阻塞数分钟。
    *   **Fix PR**：暂无直接 Fix PR，标记 `needs-live-repro`。
*   **[P0] [Issue #167652](https://github.com/openclaw/openclaw/issues/167652): Windows Gateway hangs after 2026.9.9 upgrade**
    *   **描述**：Windows 原生安装从 2026.7.1 升级到 2026.9.9 后，尽管 Doctor 报告验证通过，网关仍挂起。
    *   **Fix PR**：暂无直接 Fix PR。
*   **[P1] [Issue #97616](https://github.com/openclaw/openclaw/issues/97616): OpenClaw leaks unreaped hook/tool child processes**
    *   **描述**：Hook/Tool 执行产生的子进程未被回收，导致僵尸进程积累，运行时间越长性能越差。
    *   **Fix PR**：暂无直接 Fix PR。
*   **[P1] [Issue #162119](https://github.com/openclaw/openclaw/issues/162119): Codex intermittently returns 403 owner-verification error**
    *   **描述**：Codex 支持的回合同在原地切换模型后间歇性返回 403，提示无法验证所有者。
    *   **Fix PR**：暂无直接 Fix PR。

## 6. 功能请求与路线图信号

*   **[Issue #22438](https://github.com/openclaw/openclaw/issues/22438) [P2]: Tiered bootstrap file loading**
    *   **需求**：分层加载引导文件（Bootstrap files），以控制渐进式上下文。目前所有文件在每个会话中加载，浪费 Token。
    *   **路线图信号**：已有关联 PR 开放，表明团队正在考虑更精细的上下文控制。
*   **[Issue #53763](https://github.com/openclaw/openclaw/issues/53763) [P3]: Built-in headless browser**
    *   **需求**：内置无头浏览器作为一等公民工具，减少对第三方 Chrome 或 API 的依赖，以可靠访问 JS 渲染页面。
    *   **路线图信号**：长期讨论，标记为 `needs-product-decision`。
*   **[Issue #138366](https://github.com/openclaw/openclaw/issues/138366) [P2]: Memory slot owner drives Dreams page**
    *   **需求**：允许拥有 `plugins.slots.memory` 的插件提供“梦境”页面的状态和操作。
    *   **路线图信号**：涉及插件架构扩展，目前处于产品决策阶段。

## 7. 用户反馈摘要

*   **痛点 1：上下文浪费与截断**
    *   用户抱怨 Bootstrap 文件（MEMORY.md, SOUL.md 等）在每个回合重新注入，消耗 20-30% 的 Token 预算（[Issue #67419](https://github.com/openclaw/openclaw/issues/67419)）。
    *   长回复在 ~1000-1100 字符处被静默截断（[Issue #84516](https://github.com/openclaw/openclaw/issues/84516)），且 `stop=null`，导致用户体验极差。
*   **痛点 2：消息丢失与静默失败**
    *   Telegram 适配器在网络故障后单次尝试失败即死信（dead-letter），无重试（[Issue #125764](https://github.com/openclaw/openclaw/issues/125764)）。
    *   隔离的 Cron 会话使用 `write` 工具覆盖共享文件而非追加，导致静默数据丢失（[Issue #40001](https://github.com/openclaw/openclaw/issues/40001)）。
*   **痛点 3：稳定性与资源泄露**
    *   僵尸进程积累（[Issue #97616](https://github.com/openclaw/openclaw/issues/97616)）和 SQLite WAL 增长（[Issue #143524](https://github.com/openclaw/openclaw/issues/143524)）导致长期运行后系统不稳定。
*   **满意点**
    *   社区对性能修复（如大集群启动优化）反应积极，希望这些修复能尽快合并到稳定版。
    *   维护者对 Issue 响应迅速，P0 级别问题通常能在 24-48 小时内获得关注。

## 8. 待处理积压

*   **[Issue #48003](https://github.com/openclaw/openclaw/issues/48003)**: Steer mode 回归，自 3 月起开放，至今未解决。
*   **[Issue #22438](https://github.com/openclaw/openclaw/issues/22438)**: 分层引导加载，自 2 月起开放，高呼声但未进入核心路线图。
*   **[Issue #97616](https://github.com/openclaw/openclaw/issues/97616)**: 子进程泄露，自 6 月起开放，影响长期稳定性。
*   **[PR #168346](https://github.com/openclaw/openclaw/pull/168346)**: `chore: prepare 2026.9.33 from 2026.9.9 with backport audit`。这是一个巨大的 PR，包含大量 backport，处于 `waiting on author` 状态，需要维护者关注以完成 9 月维护分支的收尾工作。

**总结**：OpenClaw 当前处于高压修复期，核心维护者正集中精力解决 P0 级的稳定性和性能回归。用户最迫切的需求是上下文管理优化和消息投递可靠性。建议关注下一版本（可能为 2026.10.2 或 2026.9.33）中是否包含针对 SQLite WAL 和子进程泄露的修复。

---

## 横向生态对比

**AI 智能体与个人 AI 助手开源生态横向对比分析报告**
**日期**：2026-10-11
**覆盖项目**：OpenClaw, Zeroclaw, PicoClaw, QwenPaw, Hermes-Agent, AstrBot, DeepSeek Harness

### 1. 生态全景
当前个人 AI 助手与自主智能体开源生态正处于**“高并发修复”与“多端架构扩展”**并行的关键节点。核心赛道（如 OpenClaw, Hermes-Agent）正经历密集的稳定性回归修复，重点解决大规模集群下的性能瓶颈、上下文管理逻辑及跨平台沙箱隔离问题。与此同时，次级赛道（如 QwenPaw, Zeroclaw）加速向移动端、HarmonyOS 及 Web 端多形态覆盖，并深化插件系统的原子化与热重载能力。行业整体痛点已从早期的功能缺失转向**资源泄露控制、长会话上下文压缩效率、以及跨平台一致性体验**。

### 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 健康度评估 | 核心焦点 |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **OpenClaw** | 500 | 500 | 1 (v2026.10.1) | **极高活跃 (高压修复)** | 大集群 Gateway 性能、SQLite WAL 泄露、上下文预算 |
| **Hermes-Agent**| 286 | 500 | 无 | **极高活跃 (重构冲刺)** | macOS/Win 更新回归、上下文压缩、系统原子性恢复 |
| **Zeroclaw** | 16 | 50 | 无 | **高活跃 (质量加固)** | Telegram 限流、Agent 循环逻辑、测试基础设施 |
| **QwenPaw** | 15 | 19 | 无 | **中等活跃 (稳步迭代)** | 前端稳定性、HarmonyOS 多端支持、插件热重载 |
| **AstrBot** | 10 | 21 | 1 (v4.29.0-beta.2)| **中等活跃 (维护优化)** | WebUI 自定义、流式引用修复、自动化 Stale 清理 |
| **DeepSeek Harness**| 0 (纯Discussions) | 0 (纯Releases) | 无 | **高关注 (社区驱动)** | Windows 沙箱权限、本地模型兼容、长期记忆缺失 |
| **PicoClaw** | 2 | 2 | 无 | **低活跃 (探索期)** | UI 性能优化、HTTP 服务化、浏览器自动化探索 |

### 3. OpenClaw 在生态中的定位
*   **优势**：作为核心参照，OpenClaw 拥有最庞大的社区吞吐量（24h 内 1000 条更新），在**大规模 Agent 集群管理**（如 600+ Agents 的 Gateway 调度）和**复杂上下文预算计算**方面处于技术领先地位。其发布节奏快（今日即发 2026.10.1），对 P0 级稳定性问题（如 SQLite 内存泄露）的响应周期极短。
*   **技术路线差异**：与 Hermes-Agent 侧重“跨平台桌面端一致性”不同，OpenClaw 更侧重**“高性能服务端/网关化”**，针对大规模 Agent 调度的内存与 I/O 优化更深。与 QwenPaw/AstrBot 的轻量化 Web/多端 UI 相比，OpenClaw 的架构更偏向底层运行时与插件隔离（如 WASM 兼容性与远程工作区附件管理）。
*   **社区规模**：OpenClaw 社区规模显著大于其他单体项目，拥有更成熟的贡献者矩阵（如 @steipete 等核心维护者高频介入），是生态中的“事实标准”参照系。

### 4. 共同关注的技术方向
*   **上下文管理与压缩**：
    *   *涉及项目*：OpenClaw, Hermes-Agent, AstrBot, DeepSeek Harness。
    *   *具体诉求*：OpenClaw 修复模型切换后上下文元数据丢失；Hermes-Agent 重构跨压缩周期的推理能力保留；AstrBot 引入手动 `/compact` 命令；DeepSeek Harness 用户强烈呼吁引入持久化长期记忆（Memory）机制以替代单纯的会话上下文。
*   **跨平台沙箱与资源隔离**：
    *   *涉及项目*：OpenClaw, Hermes-Agent, DeepSeek Harness, Zeroclaw。
    *   *具体诉求*：解决 Linux/Windows/macOS 在子进程回收、文件权限（如 DSH 的 Windows Low Integrity Label）及内存隔离上的差异。Hermes-Agent 和 OpenClaw 均面临僵尸进程与 OOM 风险，提示“安全且轻量”的运行时沙箱是行业共性难点。
*   **多模态与长任务稳定性**：
    *   *涉及项目*：Zeroclaw, PicoClaw, QwenPaw。
    *   *具体诉求*：Zeroclaw 优化图像多模态的“缩小”而非“丢弃”策略；PicoClaw 探索浏览器自动化以执行长周期任务；QwenPaw 修复长会话下的 UI 静默失败与音频文件卡死问题。

### 5. 差异化定位分析
*   **OpenClaw**：**重型集群引擎**。定位为企业级或极客级的大规模 Agent 调度平台，核心在于 Gateway 的高可用与上下文精准控制。
*   **Hermes-Agent**：**跨平台桌面工作台**。定位为用户本地运行（Local-First）的智能体环境，核心在于 CLI/TUI/桌面端的统一状态管理与更新的原子性。
*   **QwenPaw**：**多端生态扩展**。定位为基于 Agentscope 框架的多平台（含 HarmonyOS）助手，核心在于 UI 的灵活性与插件热重载。
*   **AstrBot**：**社群/渠道聚合器**。定位为重 QQ/Telegram/Slack 等多渠道机器人，核心在于 WebUI 的自定义与消息流（引用/流式）的完整性。
*   **DeepSeek Harness**：**本地/离线推理适配层**。定位为解决 DeepSeek 本地化部署与 Windows 原生集成的痛点，核心在于本地模型兼容性（Ollama）与系统权限。
*   **Zeroclaw**：**Rust 高性能运行时**。定位为零代码/低代码的高韧性 Agent 框架，核心在于 ZeroCode 的会话重载与 WASM 插件故障自愈。

### 6. 社区热度与成熟度
*   **快速迭代/高压修复阶段**：**OpenClaw, Hermes-Agent**。两者 Issue 数量巨大（200+），处于版本发布密集期，通过高频 Patch 解决底层稳定性回归，是生态目前的“压力测试中心”。
*   **质量巩固/功能扩展阶段**：**Zeroclaw, QwenPaw, AstrBot**。活跃度适中，重点从“堆功能”转向“修 Bug”与“优体验”（如 AstrBot 的 Stale 清理机制，QwenPaw 的 HarmonyOS 适配），项目架构趋于稳定。
*   **社区驱动/探索阶段**：**DeepSeek Harness, PicoClaw**。前者依赖 Discussions 驱动功能（如 Linux 支持、记忆机制），缺乏传统 Issue 流程；后者处于早期架构探索期（HTTP 服务化、浏览器自动化），用户基数较小但技术愿景清晰。

### 7. 值得关注的趋势信号
1.  **“原子化更新”成为新刚需**：Hermes-Agent 社区强烈要求解决更新失败导致的系统不可用（5 种底层损坏），OpenClaw 也在修复升级卡死。这表明智能体工具已深度嵌入用户工作流，**“可逆性”与“自愈能力”**将从“加分项”变为“必需品”。
2.  **长期记忆（Long-term Memory）架构竞争**：DeepSeek Harness 用户呼声最高，OpenClaw/Hermes-Agent 也在推进。单纯的上下文窗口（Context Window）已不足以支撑复杂任务，**结构化记忆后端（Memory Backend）**正在取代临时的 `MEMORY.md` 文件。
3.  **Windows 底层兼容性痛点**：DeepSeek Harness 的 Windows ACL/Integrity 问题及 OpenClaw 的 Windows 升级挂起问题提示，**Windows 原生沙箱机制**是阻碍国产/开源工具普及的技术壁垒，需专项攻坚。
4.  **UI 性能与静默失败**：PicoClaw 和 QwenPaw 均出现长会话下的 UI 卡顿或静默数据丢失。随着 Agent 任务变长（长周期/多模态），**前端流式渲染性能**与**状态同步可靠性**成为影响用户体验的关键瓶颈。

**对开发者的建议**：
*   若构建企业级/集群系统，应重点参考 OpenClaw 的 Gateway 资源调度与上下文失效策略。
*   若开发本地工具，需优先解决更新原子性与子进程回收（参考 Hermes-Agent 教训）。
*   建议在下个迭代中集成轻量级的持久化记忆模块，并强化 Windows 环境下的权限管理与沙箱隔离测试。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**日期**: 2026-10-11
**数据窗口**: 过去24小时 (截至 2026-10-10 更新数据)

## 1. 今日速览
过去24小时，Zeroclaw 项目保持高活跃度，**16** 个 Issues 更新（13个活跃，3个关闭），**50** 个 Pull Requests 更新（42个待合并，8个已合并/关闭）。项目重点聚焦于 **Telegram 频道稳定性修复**、**Agent 循环工具调用逻辑优化** 以及 **ZeroCode 桌面端体验增强**。今日无新版本发布，但针对 Telegram 429 限流和 Shell 命令重复审批问题的修复 PR 已进入开发或待审状态，显示维护团队正在积极清理近期报告的高优先级 Bug。整体代码库处于活跃重构期，特别是围绕 v0.8.6 和 v0.9.0 的运行时网关分离工作正在推进。

## 2. 版本发布
*无新版本发布。*

## 3. 项目进展
今日共合并/关闭了 8 个 PR，其中最具代表性的是 ZeroCode 通知处理逻辑的修复。

*   **ZeroCode 会话重载逻辑优化**: PR [#10801](https://github.com/zeroclaw-labs/zeroclaw/pull/10801) 已合并。该 PR 修复了 ZeroCode 中由于通知通道溢出（`TryRecvError::Lagged`）导致会话取消的问题。此前，客户端缓冲区溢出会错误地触发 `session/cancel`，导致正在进行的回合被中断。此次修复实现了“无取消重载”（reload without cancelling running turns），提升了 TUI 客户端的稳定性。
*   **插件发布流程自动化**: PR [#11306](https://github.com/zeroclaw-labs/zeroclaw/pull/11306) 合并，增加了按依赖足迹策略测量发布二进制大小和哈希值的脚本，增强了发布可追溯性。
*   **WASM 插件故障恢复**: PR [#11356](https://github.com/zeroclaw-labs/zeroclaw/pull/11356) 合并，实现了渠道插件在发生 Trap 后自动替换实例的机制，提高了基于 WASM 的插件运行时韧性。

## 4. 社区热点
今日讨论最活跃的 Issue 主要集中在测试基础设施加固和图像多模态处理策略上。

*   **[Issue #9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965)**: **测试夹具加固 (15条评论)**
    *   **热点分析**: 该 Issue 追踪并行运行时测试门（Parallel Runtime Test gate）下多进程线程化后生成的可执行 shim 测试夹具问题。由于 `cron::scheduler` 的测试失败，社区正在深入讨论如何 harden 测试环境，防止因多线程竞争导致的 flaky tests。这是项目从功能开发转向质量加固的信号。
*   **[Issue #9887](https://github.com/zeroclaw-labs/zeroclaw/issues/9887)**: **图像缩小策略 (7条评论)**
    *   **热点分析**: 当前策略是将超过 `max_image_size_mb` 的图像直接丢弃并告知模型“无法加载”。用户和社区成员强烈建议改为“缩小图像”（downscale）而非“丢弃”（drop），并允许通过配置 `0` 禁用多模态限制。这反映了用户对多模态体验连贯性的诉求，特别是在处理恶意或畸形负载时的行为预期。
*   **[Issue #7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)**: **v0.8.6 & v0.9.0 发布追踪**
    *   **热点分析**: 作为 Phase 2 运行时和 Phase 3 网关分离的总追踪 Issue，该任务明确了剩余缺口和排序。对于关注架构演进的贡献者而言，这是判断新功能落地时间线的核心参考。

## 5. Bug 与稳定性
今日报告了多个高优先级 Bug，主要集中在 Telegram 频道、Agent 循环和配置内存泄漏。

*   **[P1] Telegram 429 限流处理缺陷**:
    *   **Issue**: [#11615](https://github.com/zeroclaw-labs/zeroclaw/issues/11615) - Telegram 发送路径忽略 429 `retry_after`，立即重试导致加剧流控，甚至导致回复丢失。
    *   **Issue**: [#11608](https://github.com/zeroclaw-labs/zeroclaw/issues/11608) - Telegram 监听器在黑洞请求中永久卡住，缺乏恢复机制。
    *   **修复状态**: **已有 Fix PR**。PR [#11651](https://github.com/zeroclaw-labs/zeroclaw/pull/11651) 和 [#11650](https://github.com/zeroclaw-labs/zeroclaw/pull/11650) 分别通过引入共享的每令牌 flood gate 和等待 `retry_after` 来解决此问题。
*   **[P1] Agent 循环 Shell 命令审批死锁**:
    *   **Issue**: [#11612](https://github.com/zeroclaw-labs/zeroclaw/issues/11612) - 在同一回合中重新运行已批准的 shell 命令时，Agent 循环中止并提示“重复的请求工具调用”。
    *   **修复状态**: **已有 Fix PR**。PR [#11653](https://github.com/zeroclaw-labs/zeroclaw/pull/11653) 通过维护一个作用域于回合的已批准 shell 签名集合，允许在同一回合内重新运行已批准命令，避免了重复审批。
*   **[P1] 配置内存泄漏**:
    *   **Issue**: [#11614](https://github.com/zeroclaw-labs/zeroclaw/issues/11614) - `Configurable::map_key_sections` 在每次调用时泄漏 schema 路径字符串，导致守护进程内存持续增长。
    *   **修复状态**: 暂无明确 Fix PR，需关注后续开发。
*   **[P1] Web 配对代码输入限制**:
    *   **Issue**: [#11648](https://github.com/zeroclaw-labs/zeroclaw/issues/11648) - Web dashboard 的配对输入仍限制为 6 位数字，而后端已默认生成长度为 32 的字母数字代码。
    *   **修复状态**: 尚未开 PR，属于前端 UI 适配问题。

## 6. 功能请求与路线图信号
*   **持久化会话提示附件**: PR [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) 正在开发中，旨在为持久化 Chat 会话添加可选的 SQLite 存储的提示附件（Prompt Attachments）。这将支持重启后保留上下文和附件，符合 v0.9.0 的架构方向。
*   **图像批量驱逐机制**: Issue [#11166](https://github.com/zeroclaw-labs/zeroclaw/issues/11166) 建议当每请求图像上限被超过时，以批量方式驱逐图像而非每次新图像都重写提示缓存。该 Issue 已关闭（可能已合并或转化为 PR），表明性能优化正在被优先考虑。
*   **ZeroCode 消息时间戳**: Issue [#11620](https://github.com/zeroclaw-labs/zeroclaw/issues/11620) 请求在 ZeroCode 转录中显示消息时间，以便在自动提示、排队消息和长工具调用重叠时能够理清时序。

## 7. 用户反馈摘要
*   **安全测试工具集成**: 在 Issue [#11612](https://github.com/zeroclaw-labs/zeroclaw/issues/11612) 中，用户提到使用第三方开源 SDK "KUMA" 进行行为安全测试时发现了 Agent 循环中断问题。这反映出 Zeroclaw 的生态中已出现专业的 AI Agent 行为安全测试工具，社区对 Agent 的鲁棒性和可测试性有较高期待。
*   **桌面端 GPU 占用**: Issue [#11632](https://github.com/zeroclaw-labs/zeroclaw/issues/11632) 报告 Linux/Tauri 桌面应用在空闲时 WebKitWebProcess 持续重绘，导致 ~100% GPU 渲染引擎占用。这表明桌面端在 Linux/Wayland 环境下的资源管理仍有优化空间。
*   **ZeroCode 消息丢失**: 用户反馈 ZeroCode 在 `SESSION_BUSY` 时静默丢弃排队消息（[#11618](https://github.com/zeroclaw-labs/zeroclaw/issues/11618)），以及 `ask_user` 提示无回复导致 600 秒超时（[#11623](https://github.com/zeroclaw-labs/zeroclaw/issues/11623)），凸显了 TUI 客户端在并发场景下的用户体验痛点。

## 8. 待处理积压
*   **安全策略模式化**: PR [#7821](https://github.com/zeroclaw-labs/zeroclaw/pull/7821) 旨在引入规范的 `sandbox_policy` 模式与应用层执行，自 6 月起一直处于开放状态，涉及高风险安全架构变更，需维护者重点关注其审查进度。
*   **Anthropic OAuth 支持**: PR [#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420) 和 [#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447) 分别处理 Anthropic 存储 OAuth 配置支持和不完整终端响应的分类，均标记为 `trusted contributor` 和 `needs-maintainer-review`，由于涉及 Provider 核心逻辑，积压时间较长。
*   **Slack 消息子类型支持**: PR [#10622](https://github.com/zeroclaw-labs/zeroclaw/pull/10622) 允许 Slack 接受 bot 和工作流消息，目前处于 `parking-lot` 状态，表明在资源有限时被暂缓，但仍是渠道功能完整性的关键缺口。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期**: 2026-10-11
**数据周期**: 过去 24 小时

## 1. 今日速览
项目今日活跃度处于**中等偏低**水平，过去 24 小时内社区交互主要集中在清理旧积压代码与探索服务化架构。
虽然有两个新的 Issues 标记为活跃状态，但均为旧 Issue 的重新激活，未产生新增的独立讨论。
PR 方面以**关闭（Closed）**为主，涉及一个因标记为 Stale 而关闭的 Provider 集成请求，以及一个旨在增强内部服务能力的 HTTP API 功能提案。
当前无新版本发布，项目核心逻辑未发生变更，开发者资源倾向于架构扩展而非紧急稳定性修复。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日无 PR 被合并（Merged）。主要变动体现在两个 PR 的关闭上：

*   **PR [#3421]: 探索内部服务 HTTP 集成 (CLOSED)**
    *   [链接](https://github.com/sipeed/picoclaw/pull/3421)
    *   该 PR 提出将 PicoClaw Agent 封装为独立的 HTTP 服务，允许内部其他服务通过 `Bearer Token` 认证调用 `/v1/messages` 等端点驱动 Agent。
    *   **分析**：该 PR 虽被关闭，但反映了项目正在探索“去中心化”调用方式，即让 PicoClaw 不再仅局限于前端交互，而是作为后端服务被其他微服务调用。这是向平台化演进的信号。

*   **PR [#3393]: 移除 Cheaper Inference 提供者 (CLOSED/Stale)**
    *   [链接](https://github.com/sipeed/picoclaw/pull/3393)
    *   该 PR 旨在添加 `Cheaper Inference` 作为 OpenAI 兼容供应商。由于在 GitHub 上标记为 `[stale]`，说明该贡献在 2026-09-25 创建后长期未获响应。
    *   **分析**：直接关闭而非合并，表明维护者当前对第三方 LLM 网关的集成持保守态度，或者优先处理更高优先级的架构变更。

## 4. 社区热点
今日讨论热度集中在一个关于 **Web UI 性能** 的长期 Bug 和一个 **浏览器自动化** 的路由图上。

*   **Issue [#3281]: Web UI 输入框卡顿 (ACTIVE)**
    *   [链接](https://github.com/sipeed/picoclaw/issues/3281)
    *   **背景**：用户 `@xpader` 报告在 PicoClaw 0.3.1 版本中，当聊天历史稍长时，Web UI 输入框出现严重延迟。
    *   **热议点**：该 Issue 已累积 18 条评论，且今日仍有更新。作为 PicoClaw 面向终端用户的核心入口，**“长上下文下的 UI 响应性”** 是当前用户感知的最大痛点之一。

*   **Issue [#293]: 自主浏览器操作 (HIGH PRIORITY)**
    *   [链接](https://github.com/sipeed/picoclaw/issues/293)
    *   **背景**：作者 `@Zepan` 建议引入浏览器自动化能力，允许 AI 像人类一样操作网站（导航、数据提取）。
    *   **热议点**：获得 8 个点赞，属于高优先级路线图（High Priority Roadmap）。社区对此反应积极，认为这是 AI 助手从“文本交互”走向“实际任务执行”的关键能力。

## 5. Bug 与稳定性
今日未报告新的崩溃或回归 Bug，但一个旧的 UI Bug 被重新推至焦点：

*   **UI 输入延迟问题**
    *   **关联 Issue**: [#3281](https://github.com/sipeed/picoclaw/issues/3281)
    *   **严重程度**: 中等（影响可用性，但不涉及数据丢失或安全）。
    *   **状态**: Open。
    *   **Fix 状态**: **无修复 PR**。目前尚无针对该渲染性能问题的代码提交，表明这是一个等待排期的前端性能优化任务。

## 6. 功能请求与路线图信号
*   **浏览器自动化**：
    *   由 [Issue #293](https://github.com/sipeed/picoclaw/issues/293) 驱动。由于被标记为 `priority: high, type: roadmap`，极大概率会进入后续版本的开发计划。该功能将显著扩展 PicoClaw 的“手和眼”能力。
*   **HTTP API 服务化**：
    *   由 [PR #3421](https://github.com/sipeed/picoclaw/pull/3421) 揭示的需求。虽然 PR 已关闭，但“通过 HTTP 驱动 Agent”的需求是存在的。未来的版本中，可能会以官方文档推荐或内置 SDK 的形式支持此场景，而非直接采纳该关闭的 PR。

## 7. 用户反馈摘要
基于最近活跃的 Issue 评论，用户反馈主要围绕**使用体验的边界**：

1.  **痛点：长会话体验下降**。用户反馈在“历史稍微长一点”的情况下，输入就变卡。这暗示了 PicoClaw 的 Web 前端在处理历史消息渲染或状态管理时缺乏虚拟列表（Virtualization）或性能优化。
2.  **期望：更直接的执行力**。对于浏览器自动化的呼声，反映了用户不仅仅想要一个“聊天机器人”，而是希望 PicoClaw 能够“替我干活”（Agent 属性增强）。

## 8. 待处理积压
维护者需重点关注以下积压事项，特别是那些因“Stale”机制或长期无响应而边缘化的贡献：

*   **积压的 Provider 集成**：
    *   [PR #3393](https://github.com/sipeed/picoclaw/pull/3393) 的关闭提示，项目内可能存在其他类似的、等待集成第三方 AI 网关的 PR。
    *   **建议**：维护者应明确第三方 LLM 供应商的接入标准，定期清理 Stale 标记的 PR，或建立更高效的 PR 审核流程，避免优质社区贡献因无人响应而流失。
*   **高性能 UI 优化**：
    *   [Issue #3281](https://github.com/sipeed/picoclaw/issues/3281) 已有 18 条讨论，属于高摩擦点，建议在下个迭代中指派专人处理 UI 性能优化。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

**QwenPaw 项目动态日报 (2026-10-11)**

### 1. 今日速览
过去24小时，QwenPaw 项目保持着极高的开发活跃度，共更新了 15 个 Issues 和 19 个 Pull Requests，其中 9 个 Issues 和 11 个 PRs 处于已合并或关闭状态。今日核心进展集中在 Console 前端稳定性修复与多端适配上，成功解决了长期存在的页面加载失败及错误恢复难题。社区对 HarmonyOS 原生客户端支持及插件热重载机制表现出浓厚兴趣，相关 PR 已进入待合并或开发阶段。尽管无新版本发布，但通过密集的 PR 合并，项目在稳定性与跨平台能力上取得了显著进步。

### 2. 版本发布
无新版本发布。

### 3. 项目进展
今日项目在前端健壮性与功能拓展方面取得了实质性突破，主要合并/关闭了以下重要 PR：
*   **Console 稳定性重大修复**：PR [#8154](https://github.com/agentscope-ai/QwenPaw/pull/8154) 已关闭，该 PR 修复了 [Issues #8120](https://github.com/agentscope-ai/QwenPaw/issues/8120), [#8094](https://github.com/agentscope-ai/QwenPaw/issues/8094), [#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815) 及 [#7074](https://github.com/agentscope-ai/QwenPaw/issues/7074)。通过重置失败状态并限制自动重试，解决了 Console 在 lazy chunk 加载失败后无法恢复、只能刷新页面的严重问题。
*   **文件面板交互优化**：PR [#8149](https://github.com/agentscope-ai/QwenPaw/pull/8149) 关闭，修复了 [Issue #7995](https://github.com/agentscope-ai/QwenPaw/issues/7995)，实现了 Files 面板刷新时保留已展开目录状态并正确加载嵌套文件夹的功能。
*   **UI 细节修复**：PR [#8157](https://github.com/agentscope-ai/QwenPaw/pull/8157) 和 [#8145](https://github.com/agentscope-ai/QwenPaw/pull/8145) 分别解决了 SVG 图标尺寸报错及 Composer 控件在空间受限时的换行逻辑，提升了 Console 的视觉稳定性。
*   **数据渲染修复**：PR [#8159](https://github.com/agentscope-ai/QwenPaw/pull/8159) 关闭，修复了 [Issue #8158](https://github.com/agentscope-ai/QwenPaw/issues/8158)，防止模型输出独立 Scroll headline 时导致最终答案显示为空气泡。

### 4. 社区热点
*   **[Issue #8162](https://github.com/agentscope-ai/QwenPaw/issues/8162)** (7条评论)：关于 OpenAI Responses API 流式事件空响应的问题。社区关注点在于特定版本（2.2.2.b4）在 Win10 环境下会话意外中断的稳定性回归。已有对应修复 PR [#8165](https://github.com/agentscope-ai/QwenPaw/pull/8165) 处于 OPEN 状态。
*   **[Issue #8153](https://github.com/agentscope-ai/QwenPaw/issues/8153)** (2条评论，但影响重大)：报告了 MCP Driver 配置接口导致的 root RCE 安全漏洞。虽然标记为 [invalid] 并关闭，但该安全事件的讨论揭示了配置接口权限管理的隐患，社区对安全边界高度关注。
*   **[PR #8164](https://github.com/agentscope-ai/QwenPaw/pull/8164)**：新增 HarmonyOS 原生客户端 (ArkTS)。这是项目向多端生态拓展的重要信号，吸引了技术社区对非 Web/桌面端支持的讨论。

### 5. Bug 与稳定性
*   **高严重度 (已有 Fix)**：
    *   Console 页面加载失败后无法恢复 [Issue #8120](https://github.com/agentscope-ai/QwenPaw/issues/8120)、[Issue #7815](https://github.com/agentscope-ai/QwenPaw/issues/7815)：已通过 PR [#8154](https://github.com/agentscope-ai/QwenPaw/pull/8154) 修复并关闭。
    *   OpenAI Responses API 空响应 [Issue #8162](https://github.com/agentscope-ai/QwenPaw/issues/8162)：PR [#8165](https://github.com/agentscope-ai/QwenPaw/pull/8165) 正在待合并中。
*   **中严重度 (待处理)**：
    *   Windows 长路径导致 qwenpaw-creator 插件 Review 决策失败 [Issue #8163](https://github.com/agentscope-ai/QwenPaw/issues/8163)：涉及文件系统兼容性，PR [#8167](https://github.com/agentscope-ai/QwenPaw/pull/8167) 已提交修复。
    *   Console 聊天间歇性静默空完成 [Issue #8172](https://github.com/agentscope-ai/QwenPaw/issues/8172)：前端无任何回复，目前 OPEN，暂无关联修复 PR。
    *   send_file_to_user 音频文件导致会话卡死 [Issue #8171](https://github.com/agentscope-ai/QwenPaw/pull/8171)：LM Studio 兼容性问题，OPEN。
*   **低严重度/已修复**：
    *   Console 错误日志刷屏 (SVG 尺寸) [Issue #8143](https://github.com/agentscope-ai/QwenPaw/issues/8143)：已通过 PR [#8157](https://github.com/agentscope-ai/QwenPaw/pull/8157) 修复。
    *   文件面板刷新状态不同步 [Issue #7995](https://github.com/agentscope-ai/QwenPaw/issues/7995)：已通过 PR [#8149](https://github.com/agentscope-ai/QwenPaw/pull/8149) 修复。

### 6. 功能请求与路线图信号
*   **多端支持扩展**：PR [#8164](https://github.com/agentscope-ai/QwenPaw/pull/8164) 引入 HarmonyOS NEXT 原生客户端，表明项目路线图正加速向移动端及国产操作系统生态覆盖。
*   **插件系统增强**：PR [#7565](https://github.com/agentscope-ai/QwenPaw/pull/7565) (XXXL 规模) 正在开发插件的干净卸载与回滚安全热重载功能，旨在解决插件更新导致的 Workspace 重建问题，是平台稳定性的重要路线图信号。
*   **Creator 插件迭代**：PR [#8121](https://github.com/agentscope-ai/QwenPaw/pull/8121) 准备发布 QwenPaw Creator 2.0.1，强调受控媒体生产，显示该垂直领域插件正在经历重大版本迭代。
*   **文档完善**：PR [#8166](https://github.com/agentscope-ai/QwenPaw/pull/8166) 和 [#7127](https://github.com/agentscope-ai/QwenPaw/pull/7127) 分别补充了 heartbeat 运行时语义和 CLI `--agent-id` 目标指南，反映维护者正在注重开发者和最终用户的文档体验。

### 7. 用户反馈摘要
*   **痛点**：用户普遍反映 Console 在特定网络或缓存条件下（如 WebView2 缓存过期）容易出现“死锁”状态，必须强制刷新浏览器才能恢复，严重影响连续工作流体验（参见 [Issue #8120](https://github.com/agentscope-ai/QwenPaw/issues/8120), [Issue #8094](https://github.com/agentscope-ai/QwenPaw/issues/8094)）。
*   **场景**：Windows 长路径用户（如 NAS 或深层目录部署）在使用 qwenpaw-creator 插件时遭遇存储完整性错误，阻碍了高级创作流程（参见 [Issue #8163](https://github.com/agentscope-ai/QwenPaw/issues/8163)）。
*   **满意点**：社区对 PR [#8154](https://github.com/agentscope-ai/QwenPaw/pull/8154) 解决长期存在的加载失败问题表示欢迎，认为这显著提升了桌面应用的可用性。

### 8. 待处理积压
*   **长期未响应 Bug**：[Issue #7311](https://github.com/agentscope-ai/QwenPaw/issues/7311) 报告 v2.1.1b2 中 `_qwenpaw_remote_backend` 模块缺失导致所有工具失效，该 Issue 创建于 2026-08-26，至今仍处于 OPEN 状态且未看到关联修复 PR，建议维护者核查该版本遗留问题或提供明确的升级路径指导。
*   **Feishu 渠道图片解析**：[Issue #8150](https://github.com/agentscope-ai/QwenPaw/issues/8150) 报告飞书富文本消息中的图片被静默丢弃，目前 OPEN，需确认是否在下个版本中支持媒体下载。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes-Agent 项目动态日报 (2026-10-11)

## 1. 今日速览
Hermes-Agent 今日表现出极高的开发活跃度与社区关注度，过去 24 小时内产生了 **786 条**高价值动态（286 条 Issues 更新与 500 条 PR 更新），其中仅 Issues 活跃数就达到 260 条。项目处于高频的修复与重构冲刺期，核心焦点集中在解决 macOS/Windows 终端下的更新回归、Linux 桌面端沙箱故障以及复杂的上下文状态（Context）管理。虽然过去 24 小时未产生新的 Release 版本，但通过多个关键 PR 的合并与 26 个问题的关闭，项目整体的系统稳定性正在逐步修复，特别是针对安装更新（install-update）领域的历史痛点进行了专项清理。

## 2. 版本发布
**无新版本发布**（过去 24 小时内无 Release 记录）。

## 3. 项目进展
今日有 26 个 Issue 被关闭并伴随 190 个 PR 结束生命周期（已合并或关闭），表明项目进行了大量的代码清理与特性迭代：
*   **核心架构与状态管理**：维护者 @teknium1 推进了统一的网关会话管理（[#106742](https://github.com/NousResearch/hermes-agent/pull/106742)），使 CLI、TUI、桌面端、API 等本地终端能够共享同一个由 Gateway 维护的会话状态，消除了数据冲突。
*   **上下文压缩优化**：针对多平台模型支持，@teknium1 提交了跨越全端的重构 PR [#136358](https://github.com/NousResearch/hermes-agent/pull/136358)，解决了旧模型推理能力（reasoning）在轮次切换中丢失的问题，大幅提升了跨压缩周期的上下文准确性。
*   **工具链闭环**：合并了针对浏览器（Browser Harness）生命周期管理的修复 [#121107](https://github.com/NousResearch/hermes-agent/pull/121107) 以及 Kanban 任务流生命周期控制的 PR [#125508](https://github.com/NousResearch/hermes-agent/pull/125508)，完善了多任务并行执行与资源回收机制。

## 4. 社区热点
讨论最活跃的议题集中在 **更新失败导致系统环境不可用的连锁反应**：
*   **热点 Issue**：[#125437](https://github.com/NousResearch/hermes-agent/issues/125437)（讨论热度极高，13 条评论）。该问题被定义为 "Pain cluster"（痛点簇），指出单次更新失败会导致 5 种不同的底层机制损坏且无内建恢复路径，本周已在 Discord 引发 15 个用户求助帖。
*   **关联阻塞 Bug**：[#133992](https://github.com/NousResearch/hermes-agent/issues/133992)（24 条评论），今日已关闭。该 Bug 导致 macOS 桌面端更新时发生自我锁死（Custodian 进程与第二级解析代理之间死锁），是阻碍用户完成平滑升级的核心痛点。
*   **背后诉求分析**：用户社区强烈要求 Hermes 在更新器（Updater）层面提供“原子性”与“可逆性”，要求提供产品内的回滚或修复（hand-typed recipe 之外的自愈机制）功能，以避免因一次失败的网络/终端拉取导致整个环境变为半残废状态。

## 5. Bug 与稳定性
今日报告的 Bug 多集中在终端进程隔离、系统资源泄露及跨平台兼容性问题，按严重程度排列如下：
*   **[P0] 数据销毁风险**：[#132401](https://github.com/NousResearch/hermes-agent/issues/132401) - 临时代码（Scratch）的 24h 自动清理策略（prune）会无提示、无隔离地删除停放在 TMPDIR 下的多日期 Agent 成果。**目前尚未提交 Fix PR**，属于最高危数据丢失问题。
*   **[P1] 递归 Fetch 引发内存泄漏**：[#124794](https://github.com/NousResearch/hermes-agent/pull/124794) 与 [#131444](https://github.com/NousResearch/hermes-agent/issues/131444) - 在未隔离进程组的低版本 Git 下，挂起的更新调用会产生无限制的递归 fetch 进程树，导致 8GB 机器内存（Swap）耗尽并导致 gateway 被 OOM Kill。
*   **[P1] 路由泄漏导致阻塞**：[#131578](https://github.com/NousResearch/hermes-agent/issues/131578) - 子代理（Subagent）后台进程完成时，会错误地将父聊天路由（Chat Route）重新锁定到子代理会话上，导致聊天卡死 30 分钟。
*   **[P2] 沙箱状态污染**：[#131055](https://github.com/NousResearch/hermes-agent/issues/131055) - Linux 桌面端启动第二实例会污染沙箱回退标记，导致后续正常启动陷入 `--no-sandbox` 的渲染 SIGILL 死循环。
*   **[P2] 终端命令异常**：[#62169](https://github.com/NousResearch/hermes-agent/issues/62169) - 在 SSH 或本地终端沙箱中，若 CWD 目录被外部删除，将永久破坏所有后续命令的执行（Exit 126）。

## 6. 功能请求与路线图信号
用户对 Hermes 的 **外部记忆（Memory）** 与 **多模态路由** 关注度正在上升，结合已开 PR 信号分析：
*   **Memory 预算与质量过滤**：[#135039](https://github.com/NousResearch/hermes-agent/issues/135039) 强烈要求对 MEMORY.md 引入写时（Write-time）的预算管理与准入流水线（Acceptance pipeline）。结合路线图，预计下一版本将把“基于大小/事实区分”的清理策略作为 Memory 模块的核心特性加入。
*   **Cron 多端策略控制**：[#105267](https://github.com/NousResearch/hermes-agent/issues/105267) 要求针对外部记忆提供商，允许 Cron 任务使用与交互终端不同的策略（关/工具/全量）。
*   **UI 交互优化**：[#67347](https://github.com/NousResearch/hermes-agent/issues/67347) 提出的桌面端 Subagent 引导选择器（Guided Picker），已作为 P3 特性进入开发视线，旨在解决高级配置中自由文本输入带来的误配置问题。

## 7. 用户反馈摘要
*   **痛点：故障排查极其困难**。用户反映（如 [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) 讨论）当出现 `hermes update` 失败时，系统仅输出底层原始报错，缺乏结构化的诊断报告，用户只能依靠社区（Discord）提供的手工修补配方（手打 Recipe）进行救急。
*   **使用场景：长周期代理任务**。用户期望 Hermes 能处理长周期（Multi-day）的 Agent 任务（参见 [#132401](https://github.com/NousResearch/hermes-agent/issues/132401)），但当前的缓存策略（临时文件 24h 限制）导致用户不敢在本地 TMPDIR 存放重要中间结果。
*   **满意与不满意：跨平台一致性**。用户对 CLI 核心引擎的性能感到满意，但对桌面端跨平台行为差异表示不满——尤其是 macOS 和 Windows 的安装更新逻辑由于锁机制和 Git 差异，频繁出现与 Linux 不同的非预期故障。

## 8. 待处理积压
以下重要问题因长期未得到彻底解决，需维护者（Sweepers）重点关注：
*   **PR 积压**：[#70046](https://github.com/NousResearch/hermes-agent/pull/70046) （Terminal sudo 取消处理）。这是一个自 7 月 23 日起持续挂起的 P2 级安全修复，处理终端密码输入的竞态条件问题，已有数月未合并。
*   **长期安全审查**：[#129426](https://github.com/NousResearch/hermes-agent/issues/129426) （npm audit 漏洞更新）。自 9 月底报告以来，针对 `brace-expansion` 和 `undici` 等依赖项的安全修复一直停留在 Field Report 阶段，需尽快推进依赖升级。
*   **系统性重构未决**：[#110126](https://github.com/NousResearch/hermes-agent/issues/110126) 指出的输出截断（Truncation）问题被判定为 4 个子系统共有的系统性故障，当前仍散落为 35+ 个未闭环的独立 Issue，急需统一规划重构路线。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报（2026-10-11）

## 1. 今日速览
AstrBot 项目在24小时内保持了较高的开发活跃度，主要源于对 **v4.29.0-beta.2** 预发布版本的准备工作及多项核心稳定性的修复。过去24小时内，项目处理了10条 Issues 和 21条 Pull Requests，其中合并了包括版本升级、UI 优化及自动化清理在内的多项关键 PR。社区关注点集中在**流式输出下的引用失效**、**QQ官方平台引用支持**以及**WebUI 的可定制性**上。目前项目通过引入自动化 Stale 机制和侧边栏自定义功能，正在积极优化维护效率与用户体验。

## 2. 版本发布
**v4.29.0-beta.2** (预发布)
*   **发布时间**：2026-10-11
*   **主要内容**：
    *   **WebUI 模型设置优化**：在已选模型旁及模型/回退菜单中添加了模型设置快捷方式。变更会立即保存至所有使用该模型的配置 Profile ([#10321](https://github.com/AstrBotDevs/AstrBot/issues/10321))。
    *   **版本同步**：同步包和项目版本至 4.29.0-beta.2，并更新了中英文发布说明及配置迁移映射 ([#10493](https://github.com/AstrBotDevs/AstrBot/pull/10493))。
*   **迁移注意事项**：作为 Beta 版本，建议用户在更新前检查配置迁移文档，特别是涉及模型配置变更的部分。由于包含 WebUI 的即时保存逻辑变更，建议确认现有 Profile 的完整性。

## 3. 项目进展
今日合并/关闭的重要 PR 推动了项目在 UI 灵活性和维护效率上的显著进步：
*   **WebUI 侧边栏自定义**：PR [#10485](https://github.com/AstrBotDevs/AstrBot/pull/10485) 实现了二级菜单的排序、折叠及提升为一级的功能，解决了用户无法自定义日志等高频功能入口的痛点。
*   **自动化维护优化**：PR [#10475](https://github.com/AstrBotDevs/AstrBot/pull/10475) 更新了 Stale Action，强制要求 Issues/PRs 在 60 天内保持活跃，并引导用户规范使用模板。这直接响应了 Issue [#10470](https://github.com/AstrBotDevs/AstrBot/issues/10470) 关于 Issue 堆积的反馈。
*   **基础设施修正**：
    *   修复了 Dashboard 本地隔离不可用时的 UI 展示及文档引导 ([#10487](https://github.com/AstrBotDevs/AstrBot/pull/10487))。
    *   更新了钉钉平台的 Logo 至新版本 ([#10439](https://github.com/AstrBotDevs/AstrBot/pull/10439))。
    *   修正了插件市场提交链接和文案，指向新的 Cloud 地址 ([#10471](https://github.com/AstrBotDevs/AstrBot/pull/10471), [#10472](https://github.com/AstrBotDevs/AstrBot/pull/10472))。

## 4. 社区热点
*   **侧边栏自定义需求**：Issue [#10417](https://github.com/AstrBotDevs/AstrBot/issues/10417) 获得 3 个 👍，用户强烈希望将“数据日志”等个人高频内容从二级菜单提取至一级侧边栏。这一诉求已通过 PR [#10485](https://github.com/AstrBotDevs/AstrBot/pull/10485) 正在解决中。
*   **插件市场分类优化**：Issue [#10484](https://github.com/AstrBotDevs/AstrBot/issues/10484) 提出在插件市场增加“适配器平台”分类（如区分官方 QQ 与 OneBot），以便用户快速筛选兼容插件。此功能对于多平台支持项目尤为重要。
*   **长期 Issue 清理**：Issue [#5968](https://github.com/AstrBotDevs/AstrBot/issues/5968)（QQ估价插件）虽已关闭，但创建于 3 月，反映了插件生态中旧版插件的维护状态。今日关闭的 PR [#10475](https://github.com/AstrBotDevs/AstrBot/pull/10475) 表明维护者正在系统性清理此类历史遗留问题。

## 5. Bug 与稳定性
按严重程度排列的今日报告 Bug：

1.  **高：流式输出导致引用/@ 失效**
    *   **描述**：开启 `streaming_response` 后，`reply_with_quote` 和 `reply_with_mention` 在所有平台失效，仅非流式消息正常 ([#10490](https://github.com/AstrBotDevs/AstrBot/issues/10490))。
    *   **状态**：已有 Fix PR。PR [#10491](https://github.com/AstrBotDevs/AstrBot/pull/10491) 指出 `result_decorate` 在流式场景下未执行装饰逻辑，提供了修复方案。
2.  **中：QQ Official 平台引用回复缺失**
    *   **描述**：`qq_official` 适配器出站时未填充 `message_reference`，导致 `Comp.Reply` 无法渲染为引用气泡 ([#10391](https://github.com/AstrBotDevs/AstrBot/issues/10391))。
    *   **状态**：已有 Fix PR。PR [#10489](https://github.com/AstrBotDevs/AstrBot/pull/10489) 修复了适配器从不写入 `message_reference` 的问题。
3.  **中：DashScope TTS 模型兼容性错误**
    *   **描述**：调用 `qwen-audio-3.0-tts-plus` 时返回 `InvalidParameter: url error`，疑似未正确区分 Qwen3-TTS 与 Qwen-Audio-TTS 系列 ([#10494](https://github.com/AstrBotDevs/AstrBot/issues/10494))。
    *   **状态**：已有 Fix PR。PR [#10495](https://github.com/AstrBotDevs/AstrBot/pull/10495) 调整了路由逻辑，使其通过 `SpeechSynthesizer` 处理并增加了对应端点配置。
4.  **低：WebChat 会话分页不一致**
    *   **描述**：WebChat 项目会话在侧边栏和页面中分页行为不一致，目前限制为 100 条，需支持渐进式加载 ([#10488](https://github.com/AstrBotDevs/AstrBot/pull/10488) 相关)。
    *   **状态**：Fix PR 已开放，涉及 UI 交互优化。

## 6. 功能请求与路线图信号
*   **手动上下文压缩**：PR [#9795](https://github.com/AstrBotDevs/AstrBot/pull/9795) 引入 `/compact` 命令，允许用户在自动阈值触发前手动请求 LLM 压缩上下文。这是一个实验性功能，显示项目正在优化长对话的性能管理。
*   **Windows 原生沙箱**：PR [#10466](https://github.com/AstrBotDevs/AstrBot/pull/10466) 提议使用 AppContainer 为本地计算机工具提供原生 Windows 隔离，包含网络控制和进程树清理。这表明项目正在增强本地部署的安全性。
*   **插件市场适配器分类**：如前所述，按平台筛选插件（#10484）是提升插件生态可用性的关键路线图信号。

## 7. 用户反馈摘要
*   **痛点**：用户反馈在“新 UI”下难以调整菜单顺序，导致高频功能（如日志）访问不便；同时，流式输出体验不完整（缺少引用），影响了多轮对话的上下文关联感。
*   **使用场景**：大量用户通过 Docker 部署（见 #10476），但在获取模型列表后，非首次添加模型时配置丢失，表明 WebUI 的状态管理在特定操作序列下存在稳定性问题。
*   **满意点**：社区对自动化清理 stale issue 的举措表示支持，认为这有助于维护者聚焦核心问题。

## 8. 待处理积压
*   **模型配置丢失 Bug**：Issue [#10476](https://github.com/AstrBotDevs/AstrBot/issues/10476) 报告非首次添加模型时上游配置丢失，目前仅 1 条评论，尚无 Fix PR。由于涉及 WebUI 核心交互，建议维护者优先排查。
*   **Slack TTS 音频投递**：PR [#10496](https://github.com/AstrBotDevs/AstrBot/pull/10496) 修复了开启 TTS 且禁用双输出时 Slack 回复缺失的问题，目前处于开放状态，待合并。
*   **群聊上下文丢失**：PR [#10486](https://github.com/AstrBotDevs/AstrBot/pull/10486) 指出仅包含 Mention 的消息在群聊中未携带完整上下文，影响 RAG 或依赖历史消息的插件，需关注其合并优先级。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目日报
**日期**: 2026-10-11
**数据来源**: GitHub DeepSeek Harness Repository

## 1. 今日速览
DeepSeek Harness 项目今日社区活跃度极高，过去24小时内产生了 **185 条** 新的 Discussions 讨论，显示用户社区非常活跃且对平台功能有深入探讨。由于项目采用 Releases 作为代码合并与发布的唯一渠道，且今日**无新版本发布**，项目处于功能迭代间隙或开发期内。目前的社区焦点高度集中在 **Windows 平台稳定性**（特别是沙箱权限与完整性标签问题）、**本地模型兼容性**（超时设置）以及**Agent 长期记忆机制**的缺失上。整体健康度良好，但 Windows 端的底层权限 Bug 已成为阻碍用户体验的主要痛点。

## 2. 版本发布
**无新版本发布**。
*   监测显示过去24小时内未产生新的 Release。
*   由于该项目未启用 GitHub Issues/PR，代码合并直接通过 Releases 落地，当前处于静默期或下一个版本的开发阶段。

## 3. 项目进展
*   **状态**: 暂无合并摘要。
*   因无新 Release 发布，无法从 Changelog 中提取今日合并的具体功能或修复列表。社区当前的活跃讨论主要基于当前最新版本（推测为 0.2.0 或 0.2.0-rc.2 系列，依据 Bug 报告中的版本引用）已知缺陷的反馈。

## 4. 社区热点
基于今日更新及评论数最高的 Discussions，以下是社区最关注的五大热点：

1.  **Linux 平台支持缺失**
    *   **[General] linux总是被遗忘... (#8107)**
    *   *链接*: [View Discussion](https://github.com/deepseek-ai/deepseek-harness/discussions/8107)
    *   *分析*: 用户抱怨相比竞品（WorkBuddy, Qoder），DeepSeek Harness (DSH) 及其关联生态未充分支持 Linux。该帖获得 27 条评论，反映出跨平台（特别是 Linux 原生支持）是社区强烈的底层诉求。

2.  **本地 LLM 超时配置困难**
    *   **[General] llm-pi-ai Timeout increase for local LLMs (#3157)**
    *   *链接*: [View Discussion](https://github.com/deepseek-ai/deepseek-harness/discussions/3157)
    *   *分析*: 使用 Ollama 等本地模型的用户发现长提示词触发 300s 默认超时导致失败。用户寻求修改 `settings.yaml` 的方法未果，揭示了 DSH 在本地模型适配文档和配置灵活性上的不足。

3.  **Agent 长期记忆功能缺失**
    *   **[Ideas] Built-in persistent long-term memory for agents (#1345)**
    *   *链接*: [View Discussion](https://github.com/deepseek-ai/deepseek-harness/discussions/1345)
    *   *分析*: 用户指出 DSH 目前仅支持会话内上下文，缺乏跨会话持久化记忆。这一核心 Agent 能力的需求再次被提出，暗示官方可能在路线图中需要优先考虑结构化记忆后端。

4.  **桌面版搜索功能缺失 (附原型)**
    *   **[Ideas] 桌面版会话窗口缺少 Ctrl+F 关键字搜索 (#8713)**
    *   *链接*: [View Discussion](https://github.com/deepseek-ai/deepseek-harness/discussions/8713)
    *   *分析*: 用户不仅指出底层全文检索引擎已存在但未启用，还提供了**可用的原型插件**实测数据。这是一个高质量的功能建议，维护者可直接参考其实现思路，极大降低开发门槛。

5.  **插件注册失败无感知 (体验问题)**
    *   **[General] 插件因工具重名注册失败时用户完全不可感知 (#9308)**
    *   *链接*: [View Discussion](https://github.com/deepseek-ai/deepseek-harness/discussions/9308)
    *   *分析*: 当多个第三方记忆插件冲突时，UI 显示“已启用”但实际未工作，且无日志提示。今日（10-10）刚创建即获 6 条评论，反映了插件生态快速膨胀后带来的稳定性与透明度问题。

## 6. Bug 与稳定性
*按严重程度排列，主要集中于 Windows 沙箱机制及核心消息传输*

*   **[High] Windows 沙箱权限与完整性标签 Bug (多个)**
    *   **[Bug Report] Windows 工作区：连接后外部创建/移入的子目录永远无法写入 (#423)**
        *   *链接*: [View Discussion](https://github.com/deepseek-ai/deepseek-harness/discussions/423)
        *   *详情*: Windows ACL 沙箱的 capability ACE 仅在首次 provision 时应用，导致后续创建的子目录无法写入。属于底层权限管理逻辑缺陷。
    *   **[Bug] Windows：沙箱给工作区根目录盖 Low 完整性标签后，目录内的 .bat/.cmd/.exe 双击弹「无法验证发布者」 (#7735)**
        *   *链接*: [View Discussion](https://github.com/deepseek-ai/deepseek-harness/discussions/7735)
        *   *详情*: 0.17 更新后出现，Low Mandatory Level 标签导致 Windows SmartScreen/安全机制误报。目前用户需开启 Full Access 才能工作，存在安全隐患。
    *   **[Bug][Windows] workspace-write leaves a permanent Low integrity label on the project... (#8312)**
        *   *链接*: [View Discussion](https://github.com/deepseek-ai/deepseek-harness/discussions/8312)
        *   *详情*: 上述标签问题在 0.2.0-rc.2 中依然存在，且永久驻留，破坏了其他工具对该项目目录的正常使用。
    *   *Fix 状态*: 目前讨论中未见明确 Fix PR 链接，需维护者优先处理。

*   **[High] 核心消息传输错误 (Regression)**
    *   **[Q&A] 本轮运行失败 DeepSeek Messages transport failed (#6987)**
        *   *链接*: [View Discussion](https://github.com/deepseek-ai/deepseek-harness/discussions/6987)
        *   *详情*: 自升级到 4.1 后连续出现 `transport failed`，且切换其他模型无效。疑似网络层或协议层回归 Bug，导致功能不可用。
    *   **[Bug] Message injected without producer-owned `source.kind` violates v4 format and drops sessions (#9099)**
        *   *链接*: [View Discussion](https://github.com/deepseek-ai/deepseek-harness/discussions/9099)
        *   *详情*: 用户已定位根因：缺少 `source.kind` 导致 v4 格式校验失败，进而导致会话丢失（orphaned turn）。这是一个明确的代码级 Bug。

*   **[Medium] 插件加载崩溃**
    *   **[Bug] dsh-app-boot 的 CJS 解析钩子被 require('process/') 打崩 (#8674)**
        *   *链接*: [View Discussion](https://github.com/deepseek-ai/deepseek-harness/discussions/8674)
        *   *详情*: `resolve.paths()` 返回 null 导致插件 import 失败。属于底层模块解析兼容性问题。

## 7. 功能请求与路线图信号

*   **跨会话持久化记忆 (Persistent Long-term Memory)**
    *   *来源*: [#1345](https://github.com/deepseek-ai/deepseek-harness/discussions/1345)
    *   *信号*: 用户请求内置结构化记忆后端（文件/DB）。鉴于 Agent 应用的核心趋势，DSH 若计划保持竞争力，此功能应进入高优先级路线图。
*   **桌面版会话全文检索 (Ctrl+F)**
    *   *来源*: [#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713)
    *   *信号*: 既然底层引擎已存在，启用此功能的开发成本极低，属于“Quick Win”，建议尽快在下个版本中合并。
*   **本地模型超时自定义**
    *   *来源*: [#3157](https://github.com/deepseek-ai/deepseek-harness/discussions/3157)
    *   *信号*: 需要开放更细粒度的超时配置项，以支持离线/本地 LLM 推理场景。
*   **Linux 原生支持**
    *   *来源*: [#8107](https://github.com/deepseek-ai/deepseek-harness/discussions/8107)
    *   *信号*: 用户明确对比竞品指出 DSH 在 Linux 上的缺失，建议维护者评估添加 Linux CI/CD 流程及官方支持声明。

## 8. 用户反馈摘要

*   **痛点 (Pain Points)**:
    *   **Windows 稳定性差**: 大量 Bug 报告集中在 Windows 沙箱机制上，用户表示更新后环境被“污染”（如 Low Label 残留），必须使用 Full Access 绕过沙箱，失去了使用 DSH 的安全意义。
    *   **长任务/多Agent 易卡死**: 如 [#1116](https://github.com/deepseek-ai/deepseek-harness/discussions/1116) 提到，使用多个子 Agent 翻译长文档时，子 Agent 容易在达到 token 上限后截断或卡住，需要手动发送“继续”。
    *   **Goal 功能空转**: 如 [#4664](https://github.com/deepseek-ai/deepseek-harness/discussions/4664) 提到，Goal 开启后 Agent 无法被动等待后台任务，即使空闲也会被强制注入 `<goal_round>`，浪费 Token。
    *   **插件黑盒**: 插件安装/启用状态与实际运行状态不一致（[#9308](https://github.com/deepseek-ai/deepseek-harness/discussions/9308)），用户缺乏调试手段。

*   **满意/亮点**:
    *   **插件生态活跃**: 出现了如 [#6947](https://github.com/deepseek-ai/deepseek-harness/discussions/6947) 中的“Capital Generation”金融研究插件，展示了社区利用 DSH Web Profile 构建垂直领域 Agent 的能力。
    *   **社区互助**: 在讨论区中，用户不仅提 Bug，还主动提供原型代码（如 #8713）或定位根因（如 #9099），社区技术氛围浓厚。

## 9. 待处理积压

*   **Linux 支持讨论 (#8107)**: 创建于 09-28，已持续近两周且评论数最高（27条）。若官方无近期计划，建议在 Discussions 中发布公告说明 Linux 支持的 Roadmap，避免用户持续负面情绪累积。
*   **Windows 沙箱系列 Bug (#423, #7735, #8312)**: 这些 Bug 关联性强，涉及 Windows ACL 和 Integrity Level 的底层逻辑。自 8月-9月 提出以来，在 0.2.0-rc.2 中仍未修复。建议维护者将这些合并为一个 Epic 进行系统性修复，避免逐个打补丁。
*   **Transport Failed 回归 (#6987)**: 若 4.1/0.2.0 版本中此问题普遍存在，则严重影响核心可用性，需最高优先级排查。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*