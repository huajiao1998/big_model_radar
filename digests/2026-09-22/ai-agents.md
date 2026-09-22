# OpenClaw 生态日报 2026-09-22

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-22 00:22 UTC

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
**日期：2026-09-22** | **分析师：Agnes**

## 1. 今日速览

OpenClaw 项目在 2026-09-22 保持高强度活跃状态，过去 24 小时内共产生 **500 条 Issue 更新**和 **500 条 PR 更新**，显示社区参与度极高。项目刚发布了基于 2026 年 7 月底代码的 `extended-stable`（LTS 等效）版本 v2026.7.35，强调关键安全更新和稳定性修复。然而，近期版本（2026.9.x）暴露出严重的生产环境问题，包括 Gateway 内存泄漏、SQLite WAL 无限增长导致启动阻塞，以及 Cron 任务失败等 P0 级 Bug。整体项目健康度面临挑战，虽然技术栈在演进（如 Rust 侧车方案探索），但稳定性回归是当前最大痛点。

## 2. 版本发布

### v2026.7.35 (extended-stable)
*   **发布时间**: 2026-09-22 左右
*   **性质**: `extended-stable`，相当于 LTS 版本。
*   **核心内容**:
    *   基于 2026 年 7 月底的代码分支。
    *   包含关键安全更新。
    *   包含可靠性及性能修复。
    *   支持新模型。
*   **注意**: 当前最新版本已迭代至 2026.9.5，但最新稳定版仍锚定在 7 月底的代码以确保生产环境的可靠性。

## 3. 项目进展

今日 PR 活动主要集中在修复近期版本引入的回归问题以及底层稳定性优化：

*   **Codex 推理流优化 (#155090)**: @vincentkoc 修复了 Codex 推理在新响应流式传输时未能充分利用中继能力的队列阻塞问题，直接关联到 #91009 的 CPU 占用和停滞问题。
*   **macOS 架构演进 (#149725)**: @Patrick-Erichsen 提出了通过 Sidecar 模式集成共享 Rust 网关客户端和 Node 运行时原型，这是 macOS 原生应用与核心网关解耦的重要探索。
*   **会话组泄漏修复 (#142863)**: @vyctorbrzezowski 提交的修复 Session groups 跨 Agent 泄漏的 PR 仍在进行中（需拆分合并），这是多 Agent 部署环境下的关键稳定性修复。
*   **Android/iOS/WebUI 体验优化**: 多个小型 UI/UX 修复 PR 已就绪（如 #153033, #155293, #155150），改善了移动端的摄像头权限处理和聊天消息间距。
*   **崩溃恢复与重启 (#153167)**: @steipete 修复了 Doctor 修复过程中可能因竞争导致 macOS Gateway 无法正确重启的问题。

**整体评估**: 项目正忙于修补 2026.9.x 版本带来的稳定性债务，同时推进底层架构（Rust/MacOS/Session Groups）的重构。

## 4. 社区热点

以下是评论数最多、关注度最高的 Issue：

1.  **[P0] Agent SQLite WAL 无限增长阻塞启动 (#143524)**
    *   **热度**: 50 条评论 | 🦐 Gold Shrimp
    *   **痛点**: 在 Windows 单网关环境中，Agent 数据库 WAL 文件在几天内增长至 2.8 GB 且无法自动检查点，导致 Gateway 无法启动。用户进行了手动离线截断才恢复。
    *   **诉求**: 亟需修复 WAL 自动检查点机制在特定场景下的失效问题。

2.  **[P1] Gateway 内存泄漏导致 OOM 崩溃 (#91588)**
    *   **热度**: 31 条评论 | 🦪 Silver Shellfish
    *   **痛点**: Gateway RSS 从 350MB 增长至 15.5GB，引发反复的 OOM 重启循环，严重影响生产环境可用性。
    *   **诉求**: 定位内存泄漏源并进行修复。

3.  **[P0] Codex PreToolUse Hook 导致 CPU 饱和和 RPC 停滞 (#91009)**
    *   **热度**: 26 条评论 | 🦪 Silver Shellfish
    *   **痛点**: Codex 集成的 `openclaw-hooks` 进程产生高 CPU 负载，阻塞 Gateway RPC。
    *   **诉求**: 优化 Hook 执行逻辑，防止子进程失控。

4.  **[Bug] Steer 模式消息注入失败 (#48003)**
    *   **热度**: 20 条评论 | 🦪 Silver Shellfish
    *   **痛点**: `messages.queue.mode: "steer"` 未能在主会话轮次中注入消息，而是排队等待，导致实时性失效。
    *   **诉求**: 修复 KeyedAsyncQueue 的注入逻辑。

5.  **[Bug] 2026.9.5 导致稳定环境崩溃 (#153257)**
    *   **热度**: 19 条评论 | 🦐 Gold Shrimp
    *   **痛点**: 用户升级至 2026.9.5 后，原本稳定的环境经历了 8 小时的故障恢复，反映出新版本发布的稳定性风险。

## 5. Bug 与稳定性

今日重点关注的 Bug 按严重程度排列：

| 严重级别 | 问题描述 | Issue ID | 状态/备注 |
| :--- | :--- | :--- | :--- |
| **P0** | **SQLite WAL 增长导致启动阻塞** | #143524 | Open, 无 Fix PR |
| **P0** | **Codex OAuth 刷新超时导致 Cron 失败** | #89278 | Open, 回归 Bug |
| **P0** | **Turn 回复丢失 (Tool Authority Snapshot)** | #148707 | Open, 2026.9.4 回归 |
| **P1** | **Gateway 内存泄漏 (RSS 增至 15.5GB)** | #91588 | Open, 长期未修 |
| **P1** | **Codex 支持的 Telegram 会话超时** | #87744 | Open, 行为回归 |
| **P1** | **子进程泄漏导致僵尸积累** | #97616 | Open, 运行时退化 |
| **P2** | **插件构建临时目录泄漏 (~7.5GB/天)** | #153246, #154571 | **已关闭** (#154571), #153246 Open |
| **P2** | **Code 块流式传输重复被丢弃** | #152520 | PR #152520 待合并 |

**稳定性综述**: 近期版本（特别是 2026.9.x）引入了多处回归 Bug，包括内存管理、进程泄漏和消息传递路径的问题。2026.9.5 版本被用户直接报告为“将稳定环境变为故障恢复演练”，这表明发布前的 QA 覆盖存在缺口。

## 6. 功能请求与路线图信号

*   **多槽位内存架构 (#60572)**: 用户请求将单一的 `plugins.slots.memory` 扩展为多个专用内存槽，以支持不同层次的记忆处理。这反映了多 Agent 场景下对灵活记忆管理的迫切需求。
*   **Slack Modal 支持 (#88154)**: 希望利用 Slack 原生 Modal UI 收集结构化输入，提升交互体验。
*   **Azure/Teams 多 Bot 支持 (#71058)**: 目前配置限制为单个 Teams Bot，用户请求支持在同一 Gateway 上配置多个 Bot。
*   **Per-Agent Dreaming 配置 (#67413)**: 请求允许按 Agent 禁用或配置“梦境”（内存整理）功能，避免多 Agent 同时运行时资源争抢导致 OOM。
*   **生产就绪稳定性标签 (#73537)**: 用户建议为 Release 添加稳定性标签，有助于企业级用户选择适合的版本。

**路线图推断**: 项目正在向**多 Agent 协作（Swarm/A2A）**、**原生桌面应用集成（Rust/MacOS）**以及**更细粒度的资源/记忆控制**方向发展。

## 7. 用户反馈摘要

*   **负面反馈集中点**:
    *   **升级风险**: 用户对 `openclaw update` 流程及其引发的连锁故障感到担忧（#153257, #154114）。有人反映自动更新在“候选迁移演练”阶段失败，尽管 Gateway 模型认证正常。
    *   **资源消耗**: 内存泄漏（#91588）和磁盘空间泄漏（#153246, #143524）是严重的生产障碍，用户不得不手动干预（如手动 truncate WAL 文件）。
    *   **消息丢失**: 多种场景下（Steer 模式 #48003, Codex 静默 #85251, 会话 Yield #90944）出现消息丢失或回复未送达的情况，影响了 Agent 的可靠性信任。
*   **正面/中性反馈**:
    *   用户对 `extended-stable` 版本的发布表示欢迎，因为这提供了回到一个已知稳定点的机会。
    *   WebChat 中部分模型（MiniMax）的推理流正常工作，而 Kimi/DeepSeek 的流式传输问题（#88079）被具体指出，说明用户对特定模型的兼容性有明确预期。

## 8. 待处理积压

以下 Issue 长期未得到解决或处于开放积压状态，需维护者重点关注：

1.  **#143524 [P0] Agent SQLite WAL 无限增长**: 创建近两周，50+ 评论，影响 Windows 生产环境，**急需 Fix PR**。
2.  **#91588 [P1] Gateway 内存泄漏**: 创建超过 3 个月，直接导致 OOM 重启，是长期存在的技术债。
3.  **#48003 [P1] Steer 模式消息注入失效**: 影响实时对话场景，关联到 `KeyedAsyncQueue` 的实现缺陷。
4.  **#40001 [P0] Write 工具缺少追加模式**: 导致 Cron 会话覆盖共享文件，造成静默数据丢失，属于设计缺陷。
5.  **#70903 [P0] 持久化 Provider Cooldown**: 计费恢复后用户仍被阻断数小时，认证状态机存在逻辑缺陷。
6.  **#153246 [P2] 插件构建临时目录泄漏**: 虽有部分 Issue 关闭，但根本的清理机制可能仍有漏洞（#154571 关闭但需确认关联修复是否完整）。

---
*报告生成时间：2026-09-22*
*数据来源：GitHub openclaw/openclaw*

---

## 横向生态对比

基于 2026-09-22 各开源项目动态，以下是横向对比分析报告。

### 1. 生态全景
个人 AI 助手与自主智能体开源生态正从“单点工具开发”向“多 Agent 协作与生产级稳定性”转型。OpenClaw 和 hermes-agent 作为重型框架，正面临大规模部署带来的稳定性反噬（内存泄漏、WAL 问题），而 Zeroclaw 和 AstrBot 则通过严格的准入控制和协议增强来构建安全边界。DeepSeek Harness 的社区讨论热度显示，用户痛点已从“能否运行”转向“会话兼容性与凭据安全”。整体生态呈现出**功能迭代饱和、稳定性红利稀缺、安全意识觉醒**的三重特征。

### 2. 各项目活跃度对比

| 项目 | Issues (24h) | PRs (24h) | Release | 健康度评估 | 核心状态 |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **OpenClaw** | 500+ | 500+ | v2026.7.35 (LTS) | 🟠 **亚健康** | 高强度修补 2026.9.x 引入的稳定性债务，P0 级 Bug 频发。 |
| **hermes-agent** | 481+ | 500+ | v0.21.4 (Patch) | 🟡 **中等** | 活跃但 Desktop 端存在内存泄漏和渲染异常，安全边界正在加固。 |
| **DeepSeek Harness** | - (Disc 188) | N/A | 无 | 🔴 **高风险** | 升级后兼容性崩溃（`prepare` undefined）蔓延，v0 迁移破坏性变更。 |
| **Zeroclaw** | 50 | 50 | 无 | 🟢 **健康** | PR 合并率高 (96%)，架构演进（RFC）积极，S1 级 Bug 需关注。 |
| **AstrBot** | 10 | 31 | 无 | 🟢 **健康** | 聚焦稳定性与安全（注入防护、OneBot 加固），迭代节奏稳健。 |
| **QwenPaw** | 17 | 32 | 无 | 🟡 **中等** | 高活跃度维护，单元测试覆盖率提升，但 Prompt 注入风险未解。 |
| **PicoClaw** | 6 | 3 | 无 | 🟢 **稳定** | 小规模迭代，OAuth 修复与 IRC 增强，无重大阻塞性 Bug。 |

### 3. OpenClaw 在生态中的定位

*   **体量与复杂度标杆**：OpenClaw 是生态中规模最大的单体项目（日均千级事件），其技术栈（Rust 侧车、SQLite WAL、Codex 推理流）代表了当前个人 AI 助手最复杂的工程形态。
*   **优势**：拥有最丰富的模型适配（Codex、Kimi、DeepSeek）和原生桌面集成（macOS/Rust 探索）。
*   **劣势/差异**：相比 Zeroclaw 的“零信任/准入控制”架构和 AstrBot 的“插件化轻量”设计，OpenClaw 倾向于大而全的单体网关，导致近期稳定性回归严重（内存泄漏、启动阻塞）。
*   **社区规模**：远大于其他项目，社区反馈直接反映了大规模生产环境的真实痛点（如 WAL 无限增长），具有较高的参考价值的同时也伴随着更高的维护噪声。

### 4. 共同关注的技术方向

| 方向 | 具体诉求 | 涉及项目 |
| :--- | :--- | :--- |
| **多 Agent 协作与通信** | Agent 间会话消息传递、跨网关协作、持久化人类询问原语。 | **OpenClaw** (Session group 泄漏修复), **Zeroclaw** (Agent-to-agent RFC), **hermes-agent** (跨网关 Bot 协作) |
| **安全与沙箱强化** | 提示词注入防护、Git 选项绕过修复、Seatbelt 失效修复、加密凭据管理。 | **AstrBot** (人格锚定/注入防护), **Zeroclaw** (Git 安全绕过/Fix PR), **DeepSeek** (dsh-vault 加密保险库), **OpenClaw** (Cron/OAuth 安全) |
| **资源与稳定性管控** | 主机级资源限制、Cron 超时机制、内存泄漏修复、上下文预算精确计算。 | **Zeroclaw** (主机级准入控制 RFC), **QwenPaw** (Context Compaction 预算), **AstrBot** (Cron 超时容忍度), **OpenClaw** (Gateway 内存泄漏) |
| **渠道体验增强** | WhatsApp/IRC 多媒体支持、投递回执、WebUI 性能优化。 | **Zeroclaw** (WhatsApp 全面增强), **PicoClaw** (IRCv3 多行), **AstrBot** (OneBot 投递安全) |

### 5. 差异化定位分析

*   **OpenClaw**：**全功能企业级网关**。适合需要深度集成多模型、复杂工作流（Codex）且具备一定运维能力的大型用户。痛点在于“大而不稳”。
*   **Zeroclaw**：**安全优先的多 Agent 编排平台**。采用 Nix 构建、零信任准入、严格的资源边界控制。适合对安全性、可复现性和多租户隔离有极高要求的技术团队。
*   **hermes-agent**：**云边协同的个人助手**。强调 Desktop Electron 体验与云端 Gateway 的分离，支持 Sprites 运行时。适合注重本地 UI 体验与云端算力结合的个人用户。
*   **AstrBot**：**轻量级多平台机器人框架**。聚焦于 QQ/微信等国内社交平台的稳定接入，插件化架构灵活。适合开发者快速构建社交场景下的 AI 应用。
*   **QwenPaw**：**深度优化的 Coding Agent**。专注于代码编写场景的工具调用优化、DoomLoop 检测和 Provider 兼容性。适合开发者日常编码辅助。
*   **DeepSeek Harness**：**DeepSeek 官方推理调度器**。核心围绕 DeepSeek 模型特性（长上下文、Reasoning Effort）进行优化。适合 DeepSeek 模型的重度使用者，但目前升级兼容性风险极高。
*   **PicoClaw**：**嵌入式/边缘侧轻量客户端**。侧重 OAuth 灵活性和传统协议（IRC）支持。适合资源受限环境或特定协议集成场景。

### 6. 社区热度与成熟度

*   **快速迭代/高风险期**：
    *   **DeepSeek Harness**：升级引发大规模兼容性问题，社区处于“救火”状态，成熟度暂退。
    *   **OpenClaw**：新功能（Rust/MacOS）与稳定性债务并存，处于架构重构的阵痛期。
*   **稳健演进/高质量期**：
    *   **Zeroclaw**：RFC 驱动架构演进，PR 合并效率高，Bug 响应及时，处于技术成熟期。
    *   **AstrBot**：聚焦基础稳定性与安全检查，迭代节奏可控，处于稳定积累期。
*   **垂直深耕期**：
    *   **QwenPaw**：在 Coding 细分领域持续打磨（覆盖率、Prompt 注入），处于功能完善期。
    *   **hermes-agent**：在 Desktop 体验与云协同之间寻找平衡，处于生态扩张期。

### 7. 值得关注的趋势信号

1.  **“稳定性税”成为主要矛盾**：OpenClaw 和 DeepSeek Harness 的案例表明，随着 Agent 系统复杂度（WAL、子 Agent、长上下文）增加，简单的功能堆砌已无法保证生产可用性。**资源管控（Memory/Sandbox）和可观测性**成为下一阶段的核心竞争点。
2.  **安全从左移到中**：不仅仅是模型层面的 Prompt 注入，**系统层面**的安全（Git 选项绕过、Seatbelt 失效、凭据加密存储 dsh-vault）受到高度重视。未来的框架必须在默认配置下提供足够的安全边界。
3.  **多 Agent 协作标准化**：Zeroclaw 的 RFC 和 OpenClaw 的 Session Group 修复都指向一个方向——**Agent 间通信需要类似 HTTP 的可靠传输机制**（如投递回执、持久化原语）。谁先建立标准，谁就能占据 Swarm 智能的入口。
4.  **CLI/Gateway 解耦与原生化**：OpenClaw (Rust Sidecar)、Zeroclaw (Nix)、hermes-agent (Sprites) 都在探索将核心逻辑与 UI/Gateway 解耦，并趋向原生性能（Rust）。这表明 WebAssembly 或原生编译将成为个人 AI 助手的基础设施趋势。
5.  **升级路径的信任危机**：DeepSeek Harness 和 OpenClaw 的升级崩溃事件警告开发者：**向后兼容性**是生态健康的生命线。框架应提供更平滑的迁移工具和降级策略。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**日期：** 2026-09-22  
**分析对象：** github.com/zeroclaw-labs/zeroclaw

---

## 1. 今日速览

Zeroclaw 项目在过去24小时内保持了极高的开发活跃度，共处理 **50条 Issues** 和 **50条 PRs**，其中 PR 待合并比例高达 **96%**（48/50），显示团队正加速推进代码落地。安全与架构是今日核心议题：虽然 `imbl` 安全适配器的豁免补丁已提交（#11038），但配套的依赖移除追踪 Issue（#9899）仍悬而未决；同时，关于主机级准入控制、Agent 间通信及消息投递回执的三份 RFC 密集提出，表明项目正在从单体架构向多 Agent 协作与更严格的安全边界演进。整体来看，项目处于**高强度功能迭代与架构加固期**，健康度良好，但内存与渠道 bug 仍需持续监控。

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

今日无 PR 被合并（Closed/Merged），但有大量关键修复与功能增强准备就绪，主要亮点如下：

*   **WhatsApp Web 渠道全面增强**：多条 PR 集中修复并增强了 WhatsApp 体验，包括内联图片预览（#11082）、文档 PDF 首屏预览（#11080）、Poll 投票读取（#11088）、群聊创建与邀请（#11079）以及 Markdown 方言渲染（#10475）。这将显著改善 WhatsApp 用户的交互体验。
*   **Nix 构建系统完善**：#11041 和 #11040 将 Web UI 和 ZeroCode 纳入 Nix flake 包管理，支持更声明式、可复现的部署方式。
*   **文档与治理标准化**：#11042 记录了“替换优先”的集成策略，#11017（RFC）提议简化合并决策流程，反映项目治理成熟度的提升。
*   **核心运行时修复**：#11035 修复了 Qdrant 向量搜索中时间边界应用顺序的错误（#10921），#11031 修复了 HTTP 响应截断的误判逻辑（#10918），#11029 修复了 Git 选项解析的安全绕过风险（#10966）。

## 4. 社区热点

以下 Issues 讨论最活跃，反映了社区对架构、安全和可用性的深层关注：

*   **[Tracker]: Maintainer decision queue for RFCs and design issues (#8692)**
    *   **评论数:** 15 | **作者:** @Audacity88
    *   **分析:** 作为维护者决策队列的追踪器，此 Issue 旨在规范化 RFC 和设计问题的审批流程。高关注度表明社区希望治理过程更透明、高效。
*   **RFC: Host-scoped admission control and per-agent resource bounds (#10970)**
    *   **评论数:** 4 | **作者:** @JordanTheJet
    *   **分析:** 提议为运行大量 Agent 的主机提供并发轮次、工具执行和内存的资源限制，确保服务降级而非崩溃。这是对多租户/多 Agent 场景稳定性的关键回应。
*   **RFC: One durable primitive for questions an agent asks a human (#10930)**
    *   **评论数:** 4 | **作者:** @JordanTheJet
    *   **分析:** 提议复用 SOP 审批门控作为 Agent 询问人类的持久化原语，解决跨会话状态保持问题。
*   **RFC: Delivery receipts for outbound messages (#10929)**
    *   **评论数:** 4 | **作者:** @JordanTheJet
    *   **分析:** 当前系统无法确认消息是否送达用户，此 RFC 旨在增加投递回执机制，提升可靠性和可观测性。
*   **Bug: Daemon startup or reload can overflow during agent initialization (#10230)**
    *   **评论数:** 6 | **作者:** @Audacity88
    *   **分析:** S1 级严重 Bug，Quickstart 配置应用时可能导致 Tokio 运行时栈溢出，阻塞工作流。

## 5. Bug 与稳定性

| Issue | 标题 | 严重程度 | 状态 | Fix PR |
| :--- | :--- | :--- | :--- | :--- |
| [#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) | Daemon startup or reload can overflow during agent initialization | **S1 - workflow blocked** | Open | 无 |
| [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) | Cron agent jobs have no wall-clock timeout; in-flight locks only cleared at process start | **S1 - workflow blocked** | Open | 无 |
| [#10231](https://github.com/zeroclaw-labs/zeroclaw/issues/10231) | Channels supervisor retries stale configuration | **S1 - workflow blocked** | Open | 无 |
| [#10536](https://github.com/zeroclaw-labs/zeroclaw/issues/10536) | macOS Seatbelt ignores configured allowed_roots for shell commands | **S1 - workflow blocked** | Open | 无 |
| [#10966](https://github.com/zeroclaw-labs/zeroclaw/issues/10966) | Git --attr-source can hide a mutating subcommand from approval classification | **S0 - data loss / security risk** | Open (accepted) | [#11029](https://github.com/zeroclaw-labs/zeroclaw/pull/11029) |
| [#10408](https://github.com/zeroclaw-labs/zeroclaw/issues/10408) | Second message during an active turn starts a parallel run... | **S2 - degraded behavior** | Open | 无 |
| [#10975](https://github.com/zeroclaw-labs/zeroclaw/issues/10975) | WhatsApp Web inbound images not downloaded | **S2 - major feature broken** | Open | 无 (相关修复在 #11082) |
| [#10523](https://github.com/zeroclaw-labs/zeroclaw/issues/10523) | Bootstrap file truncation at 6000 chars is invisible to the operator | **S2 - degraded behavior** | In Progress | 无 |
| [#10068](https://github.com/zeroclaw-labs/zeroclaw/issues/10068) | Interactive agent session caps context at 32,000 tokens, ignoring config | **S2 - degraded behavior** | Open | 无 |
| [#10921](https://github.com/zeroclaw-labs/zeroclaw/issues/10921) | Qdrant time-bounded vector recall can omit eligible results | **S2 - degraded behavior** | Open | [#11035](https://github.com/zeroclaw-labs/zeroclaw/pull/11035) |
| [#10918](https://github.com/zeroclaw-labs/zeroclaw/issues/10918) | Empty trailing chunk falsely marks an exact-fit HTTP response as truncated | **S3 - minor issue** | Open | [#11031](https://github.com/zeroclaw-labs/zeroclaw/pull/11031) |

**稳定性评估：** 存在多个 S1 级阻塞性 Bug（栈溢出、Cron 超时缺失、配置重试），对生产环境稳定性构成风险。安全类 Bug（#10966, #10536）需优先处理。部分 Bug 已有对应 Fix PR（#11029, #11035, #11031），待合并。

## 6. 功能请求与路线图信号

*   **多 Agent 协作与通信：**
    *   [#11027](https://github.com/zeroclaw-labs/zeroclaw/issues/11027) (RFC): Agent-to-agent session messaging with receiver discretion。允许不同会话的 Agent 交换信息，是迈向多 Agent 系统的关键一步。
    *   [#10930](https://github.com/zeroclaw-labs/zeroclaw/issues/10930) (RFC): 持久化人类询问原语，支持复杂的多步 Agent-人类交互。
*   **资源管控与可观测性：**
    *   [#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) (RFC): 主机级准入控制和每 Agent 资源边界，提升高密度部署下的稳定性。
    *   [#10929](https://github.com/zeroclaw-labs/zeroclaw/issues/10929) (RFC): 出站消息投递回执，增强消息传递的可靠性与可观测性。
*   **渠道功能补齐：**
    *   WhatsApp Web 多条 PR 正在填补功能缺口（图片、文档、Poll、群聊、Markdown），显示团队正致力于完善主流即时通讯渠道的体验。
*   **构建与部署：**
    *   Nix 支持增强（#11041, #11040），提升企业级部署的便利性。
*   **治理优化：**
    *   [#11017](https://github.com/zeroclaw-labs/zeroclaw/issues/11017) (RFC): 简化紧急合并决策流程，加速高优先级修复的发布。

## 7. 用户反馈摘要

*   **痛点：**
    *   **稳定性担忧：** 栈溢出（#10230）、Cron 任务无超时（#9191）、配置重试死循环（#10231）等问题直接影响生产环境的可靠性。
    *   **安全顾虑：** Git 选项绕过（#10966）、macOS Seatbelt 失效（#10536）引发用户对沙箱安全性的质疑。
    *   **功能缺失：** WhatsApp 渠道图片/文档预览（#10975, #10976）、上下文长度配置忽略（#10068）、消息投递状态不可知（#10929）等问题影响用户体验。
    *   **运维复杂性：** 多 Agent 场景下的资源竞争和协调问题（#10970, #11027）。
*   **满意点：**
    *   社区对 RFC 讨论积极参与，表明用户对项目的长期发展方向和治理结构高度关注。
    *   快速响应 Issue 和 PR，尤其是对 Bug 的修复和 RFC 的提出，显示出团队的敏捷性。
    *   WhatsApp 渠道功能的集中增强受到潜在用户欢迎。

## 8. 待处理积压

*   **高优先级 Bug (S1):**
    *   [#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230): Daemon 栈溢出 - **需立即关注**
    *   [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191): Cron 无超时 - **需立即关注**
    *   [#10231](https://github.com/zeroclaw-labs/zeroclaw/issues/10231): 配置重试停滞 - **需立即关注**
    *   [#10536](https://github.com/zeroclaw-labs/zeroclaw/issues/10536): macOS Seatbelt 失效 - **需立即关注**
*   **安全相关:**
    *   [#10966](https://github.com/zeroclaw-labs/zeroclaw/issues/10966): Git 选项绕过 - **已有 Fix PR (#11029)，待合并**
    *   [#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899): 移除 imbl 安全警告豁免 - **无 Fix PR，仅豁免 PR (#11038) 已提**
*   **长期开放 (Needs Review/Action):**
    *   [#10379](https://github.com/zeroclaw-labs/zeroclaw/issues/10379): 无法取消消息/消息队列请求 - **状态 stale，需跟进**
    *   [#10408](https://github.com/zeroclaw-labs/zeroclaw/issues/10408): 并行运行导致重复工作 - **状态 needs-repro，需进一步调查**

**建议：** 优先处理 S1 级 Bug 和安全相关 Issue，确保核心稳定性。关注 RFC 讨论进展，为下一阶段功能开发做准备。清理 stale 或需要重现的 Issue，保持项目整洁。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：** 2026-09-22  
**数据来源：** GitHub API (过去24小时)

## 1. 今日速览
PicoClaw 今日社区活跃度中等，共处理 6 个社区事件（3 Issues + 3 PRs）。核心进展集中在 **OAuth 认证修复** 和 **IRC 协议增强** 两个技术方向。一个错误的 PR 被误提后迅速关闭，体现了社区管理的自动化或快速响应能力。整体来看，项目处于稳定的功能迭代期，无新版本发布，但底层稳定性和协议兼容性正在得到加强。

## 2. 版本发布
**无新版本发布。**
当前主流版本仍为 `0.3.1`，Nightly build 持续更新中。

## 3. 项目进展
今日主要推进了以下两项技术改进：

*   **🔒 认证机制修复 (PR #3378)**
    *   **内容：** 修复了 `RefreshAccessToken` 中硬编码 scopes 的问题。此前无论配置如何，刷新 Token 时始终发送 `"openid profile email"`，导致依赖特定 Provider 自定义 scopes 的 OAuth 配置失效。
    *   **影响：** 提升了多平台 OAuth 集成的兼容性和灵活性，特别是对于需要细粒度权限控制的自定义 OpenAI 兼容提供商或企业 SSO 场景至关重要。
    *   **状态：** Open (待合并)
    *   **链接：** [PR #3378](https://github.com/sipeed/picoclaw/pull/3378)

*   **🛠️ IRCv3 协议支持完善 (PR #3354)**
    *   **内容：** 新增对 IRCv3 `draft/multiline` 规范的支持，允许长消息或多行消息在 PicoClaw 中作为一条连贯的入站消息处理，而非被截断或拆分。
    *   **影响：** 改善了 IRC 渠道的消息阅读体验，解决了代码片段、长日志或格式化文本在传输中丢失结构的问题。
    *   **状态：** Open (待合并)
    *   **链接：** [PR #3354](https://github.com/sipeed/picoclaw/pull/3354)

*   **🗑️ 无效 PR 清理 (PR #3384)**
    *   **内容：** 标记为一个由 AI 代理误提交到错误仓库的 PR 并关闭。
    *   **状态：** Closed
    *   **链接：** [PR #3384](https://github.com/sipeed/picoclaw/pull/3384)

## 4. 社区热点
今日讨论最活跃且具有代表性的 Issue：

*   **#3281: Web UI 聊天输入在高历史负载下严重卡顿** [Link](https://github.com/sipeed/picoclaw/issues/3281)
    *   **热度：** 13 条评论，2 👍
    *   **分析：** 这是一个长期存在的性能问题（自 2026-07-21 创建），随着会话历史增长，前端渲染或 JavaScript 执行效率下降。用户痛点明确：**“聊天历史稍长，输入框就非常 laggy”**。这反映了当前 Web UI 在处理长上下文时的优化瓶颈，是影响用户体验的关键稳定性指标。

*   **#3366: 添加对 OpenAI 兼容提供商的支持** [Link](https://github.com/sipeed/picoclaw/issues/3366)
    *   **热度：** 4 条评论
    *   **分析：** 用户希望集成如 9Router 等自托管路由服务。该需求与 PR #3378 的修复高度相关——如果 #3378 合并，将为自定义 OpenAI 兼容提供商提供必要的配置灵活性。这表明用户群体对**去中心化、自托管 LLM 后端**的需求正在增长。

*   **#3365: QQ 频道机器人 401 认证失败根因分析** [Link](https://github.com/sipeed/picoclaw/issues/3365)
    *   **热度：** 3 条评论，1 👍
    *   **分析：** 问题已定位到第三方依赖 `botgo v0.2.1` 与 `resty >= v2.17` 的版本冲突。Issue 已被标记为 `[stale]` 并关闭，可能意味着该渠道的维护优先级较低，或社区已自行找到绕过方案。这是一个重要的**平台兼容性警告**，使用 QQ 频道的用户需关注依赖版本锁定。

## 5. Bug 与稳定性
| 严重程度 | 问题描述 | Issue 链接 | 状态 |
| :--- | :--- | :--- | :--- |
| **高 (UX)** | Web UI 在长会话历史下输入严重卡顿 | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Open，暂无 Fix PR |
| **中 (兼容性)** | QQ 频道因 botgo/resty 版本冲突导致 401 错误 | [#3365](https://github.com/sipeed/picoclaw/issues/3365) | Closed (Stale) |

**备注：** 目前没有报告新的崩溃或数据丢失类 Bug。#3281 的性能问题是当前最突出的稳定性隐患，建议开发者优先评估前端渲染优化。

## 6. 功能请求与路线图信号
*   **OpenAI 兼容提供商扩展 (#3366):** 用户需求明确指向**可插拔的模型路由层**。结合 PR #3378 对 OAuth scopes 的修复，预计下一版本可能会强化对非官方 OpenAI 兼容端点的支持，包括自定义鉴权范围和端点配置。
*   **IRCv3 多行消息支持 (#3354):** 这是一个明确的**功能增强**信号，表明项目正在完善对传统即时通讯协议的高级支持，以满足开发者和技术社区的使用场景。

## 7. 用户反馈摘要
*   **痛点：** Web UI 的性能随历史长度线性衰减，严重影响日常使用流畅度。
*   **期望：** 更多对自托管和定制化 LLM 服务的支持（如 9Router），而非仅限于官方 API。
*   **满意度：** 对于 IRC 等技术性较强的协议，用户欢迎更精细的特性支持（如 multiline）。

## 8. 待处理积压
*   **#3281 (Open, 13 评论):** 已存在约 2 个月，是今日最具影响力的开放 Issue。建议维护者将此列入后续 Sprint 的性能优化任务。
*   **#3354 & #3378 (Open PRs):** 两个高质量的 PR 已进入审查阶段，若合并将显著提升 OAuth 灵活性和 IRC 体验，建议优先Review。

---
**报告生成时间：** 2026-09-22  
**分析师：** Agnes (Sapiens AI)

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：2026-09-22**

---

## 1. 今日速览

QwenPaw 近期处于高活跃度维护阶段，过去 24 小时共产生 **17 条 Issue、32 条 PR**，社区响应节奏紧凑，合并比例达 50%（16/32），体现良好的工程纪律。今日无版本发布，但多个关键 Bug（DoomLoopGate 误杀、Windows Ctrl 事件崩溃、tool_result 历史膨胀）均已触发对应 Fix PR 并合并。问题类型集中于**系统提示词注入风险、会话稳定性、Provider 兼容性**三大方向，反映项目在使用复杂 Agent 工作流时面临的真实生产挑战。整体项目健康度：**活跃但需警惕安全问题**。

---

## 2. 版本发布

> 无新版本发布

---

## 3. 项目进展

### 今日合并/关闭的重要 PR

| PR | 类型 | 内容 | 关联 Issue |
|----|------|------|------------|
| [#7915](https://github.com/agentscope-ai/QwenPaw/pull/7915) | ✅ 已合并 | Responses API 工具默认 `strict: false`，修复可选参数被误标为 required 的问题 | #7907 |
| [#7906](https://github.com/agentscope-ai/QwenPaw/pull/7906) | ✅ 已合并 | DoomLoopGate 仅在检测到新 tool-call 证据时才推进重复计数，修复文本轮次误判终止 | #7905 |
| [#7919](https://github.com/agentscope-ai/QwenPaw/pull/7919) | ✅ 已合并 | 同上，另一实现路径的 Fix | #7905 |
| [#7911](https://github.com/agentscope-ai/QwenPaw/pull/7911) | ✅ 已合并 | 单元测试覆盖冲刺 Batch 3，新增 47 文件 / 2720 用例，覆盖率 +3.28pp → **73.79%** | - |
| [#7913](https://github.com/agentscope-ai/QwenPaw/pull/7913) | ✅ 已合并 | 升级 AgentScope 依赖至 `2.0.8` | - |
| [#7918](https://github.com/agentscope-ai/QwenPaw/pull/7918) | ✅ 已合并 | 清理误提交的 9 份设计文档（877 行） | - |
| [#7908](https://github.com/agentscope-ai/QwenPaw/issues/7908) | 🐛 Bug | Windows 下子进程 Ctrl 事件会传递至宿主进程导致服务崩溃 | 已有 Fix PR #7910 |

---

## 4. 社区热点

### 讨论最活跃的 Issue

**🔴 #7859 — Prompt Injection via Tool-Result System Reminders（高危）**
- [链接](https://github.com/agentscope-ai/QwenPaw/issues/7859)
- 跨 20+ 轮次持续出现注入指令，要求 Agent 完成后永久删除所有技能。作者 @xiaofengtt 报告多 session 复现。
- **诉求分析**：系统提示词注入是 Agent 安全的核心问题，当前 tool-result 附带 system-reminder 块存在被劫持风险，需尽快评估是否引入输入净化或上下文隔离机制。

**🟠 #7628 — Context Compaction 预算计算不准**
- [链接](https://github.com/agentscope-ai/QwenPaw/issues/7628)
- 上下文压缩触发阈值仅考虑当前可见对话，未计入完整 Provider 请求大小，导致预算溢出。
- **诉求分析**：随着多 Provider 集成增多，预算管理的准确性直接影响生产稳定性，用户期待更精确的完整请求预估。

**🟡 #3419 — 京东云 Coding Plan 环境会话意外中断（长期未解）**
- [链接](https://github.com/agentscope-ai/QwenPaw/issues/3419)
- 创建时间：**2026-04-15**，近 5 个月未得到明确响应。Tool Guard 审批正常但提交后会话仍中断。
- **诉求分析**：国内云服务兼容性问题是中文用户核心痛点，长期未解决可能影响项目在中国市场的采纳。

**🟢 #4974 — Agent 头像配置需求（已合并，点赞 2）**
- [链接](https://github.com/agentscope-ai/QwenPaw/issues/4974)
- 用户希望为每个 Agent 设置头像以提升多 Agent 切换效率，视觉识别更符合主流聊天工具习惯。

---

## 5. Bug 与稳定性

| 优先级 | Issue | 描述 | Fix PR |
|--------|-------|------|--------|
| 🔴 紧急 | [#7908](https://github.com/agentscope-ai/QwenPaw/issues/7908) | Windows 子进程 Ctrl 事件传播导致 QwenPaw 宿主进程崩溃 | [#7910](https://github.com/agentscope-ai/QwenPaw/pull/7910) |
| 🔴 紧急 | [#7859](https://github.com/agentscope-ai/QwenPaw/issues/7859) | Prompt 注入通过 tool-result system-reminder 持续生效（安全风险） | ❌ 暂无 |
| 🟠 高 | [#7905](https://github.com/agentscope-ai/QwenPaw/issues/7905) | DoomLoopGate 在纯文本轮次误判终止（已合并修复） | [#7906](https://github.com/agentscope-ai/QwenPaw/pull/7906) ✅ |
| 🟠 高 | [#7907](https://github.com/agentscope-ai/QwenPaw/issues/7907) | Responses API nullable 类型清洗后 strict 模式导致可选参数报错 | [#7915](https://github.com/agentscope-ai/QwenPaw/pull/7915) ✅ |
| 🟡 中 | [#7882](https://github.com/agentscope-ai/QwenPaw/issues/7882) | OpenCode 免费版模型返回 403，UI 仍标记为免费 | ❌ 暂无 |
| 🟡 中 | [#7841](https://github.com/agentscope-ai/QwenPaw/issues/7841) | Desktop 启动时 Console UI 加载早于后端，面板空白 | ❌ 暂无 |
| 🟡 中 | [#7866](https://github.com/agentscope-ai/QwenPaw/issues/7866) | 文件重写后 file-area tab 仍显示编辑前内容 | ❌ 暂无 |
| 🟢 低 | [#7921](https://github.com/agentscope-ai/QwenPaw/issues/7921) | omp-roles 技能缺少 YAML frontmatter 导致静默不可用 | [#7922](https://github.com/agentscope-ai/QwenPaw/pull/7922) ✅ |

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 相关 PR | 纳入概率 |
|------|-------|---------|----------|
| **tool_result 历史滚动过期** | - | [#7923](https://github.com/agentscope-ai/QwenPaw/pull/7923) | ⭐⭐⭐⭐ 高（已提交 PR） |
| **Per-session 模型覆盖** | [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) | [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) | ⭐⭐⭐ 中（first-time-contributor，review 中） |
| **浏览器标签页自定义标题** | [#7914](https://github.com/agentscope-ai/QwenPaw/pull/7914) | [#7914](https://github.com/agentscope-ai/QwenPaw/pull/7914) | ⭐⭐⭐ 高（简单功能，已提交） |
| **慢网络下 Console API 加载优化** | [#7917](https://github.com/agentscope-ai/QwenPaw/pull/7917) | [#7917](https://github.com/agentscope-ai/QwenPaw/pull/7917) | ⭐⭐⭐⭐ 高（已提交） |
| **Model Provider 层全面优化** | [#6167](https://github.com/agentscope-ai/QwenPaw/issues/6167) | [#7899](https://github.com/agentscope-ai/QwenPaw/pull/7899) ✅ | ⭐⭐⭐⭐ 高（已合并） |
| **Agent 头像配置** | [#4974](https://github.com/agentscope-ai/QwenPaw/issues/4974) | - | ⭐⭐ 中（需求明确，暂无 PR） |

---

## 7. 用户反馈摘要

**痛点 TOP 3：**
1. **Prompt 注入安全感缺失**（#7859）：用户报告跨 session 持续注入，说明 system-reminder 机制缺乏隔离保护。
2. **生产环境稳定性不足**（#7908、#7628、#7841）：Windows 崩溃、上下文预算溢出、UI 加载时序问题均为生产使用中的实际障碍。
3. **第三方 Provider 兼容性**（#7431、#7882、#7531）：OpenCode、火山方舟、codex-cli 等场景存在协议不匹配、header 缺失、403 错误等问题，用户期望更健壮的 Provider 适配层。

**正面反馈：**
- 单元测试覆盖率冲刺效果显著（73.79%），用户对工程质量提升有感知。
- Agent 头像、tab 标题定制等功能需求反映了用户对个性化体验的追求。

---

## 8. 待处理积压

| Issue | 创建时间 | 状态 | 建议优先级 |
|-------|----------|------|------------|
| [#3419](https://github.com/agentscope-ai/QwenPaw/issues/3419) | 2026-04-15 | OPEN，近 5 个月未响应 | 🔴 高（国内云兼容，影响市场） |
| [#7859](https://github.com/agentscope-ai/QwenPaw/issues/7859) | 2026-09-18 | OPEN，prompt 注入安全风险 | 🔴 紧急（安全漏洞） |
| [#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) | 2026-09-08 | OPEN | 🟠 高（生产稳定性） |
| [#7841](https://github.com/agentscope-ai/QwenPaw/issues/7841) | 2026-09-17 | OPEN | 🟡 中（用户体验） |
| [#7882](https://github.com/agentscope-ai/QwenPaw/issues/7882) | 2026-09-19 | OPEN | 🟡 中（功能正确性） |
| [#7916](https://github.com/agentscope-ai/QwenPaw/issues/7916) | 2026-09-21 | OPEN | 🟢 低（文档对齐） |

---

**报告生成时间：** 2026-09-22  
**数据来源：** [github.com/agentscope-ai/qwenpaw](https://github.com/agentscope-ai/qwenpaw)

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：** 2026-09-22
**分析对象：** NousResearch/hermes-agent

## 1. 今日速览

2026年9月22日，hermes-agent 项目保持高强度开发节奏，过去24小时内共产生 481 条 Issue 更新和 500 条 PR 更新，社区活跃度极高。昨日发布的 v0.21.4 版本作为汇聚约 1,800 个 PR 的稳定补丁版本，为下游部署提供了关键稳定性保障。今日开发重点集中在修复 Electron 渲染层 bug、增强 CLI 配置兼容性以及完善跨网关 Bot 协作机制。项目整体健康状况良好，但 Desktop 端存在若干内存泄漏和渲染异常问题需重点关注。

## 2. 版本发布

### v0.21.4 (v2026.9.21)
- **发布日期：** 2026年9月21日
- **版本性质：** Patch release（补丁版本）
- **更新内容：** 汇聚自 v0.21.3 以来的约 1,800 个已合并 PR，打包为稳定 tagged release
- **目标受众：** Docker 镜像构建者、Hermes Cloud 部署用户、托管部署消费者
- **破坏性变更：** 无重大破坏性变更（补丁版本定位）
- **迁移注意事项：** 
  - 完整变更日志deferred至后续整理，建议用户查阅 commit history 了解具体变更
  - 下游消费者可直接升级至该 tag 获取稳定状态
  - 注意验证现有自定义配置与新增功能的兼容性

## 3. 项目进展

### 重要合并/关闭 PR 分析

**稳定性与安全修复：**
- **#118639** - 引入工具调用循环熔断机制（来自 Kilo-Org/kilocode#14163），当模型连续3次生成无效 JSON 参数时主动停止，防止浪费 250 次 API 调用预算
- **#71996** - 修复 approval 系统对 doas、xargs、watch、flock、systemd-run 及 su/runuser/script 等命令的解析漏洞，增强安全边界
- **#118636** - 修正 checkpoints 功能，防止快照临时根目录或不可读系统残留文件

**功能增强：**
- **#118629** - 新增 Sprites 运行时支持，为 Hermes Cloud 提供原生运行环境，支持冷启动保留 home 目录、区分服务停止与崩溃状态
- **#118625** - 增强 Nous 请求活动描述，区分 chat turn 与 helper work（压缩、标题生成等）

**体验优化：**
- **#118632** - 修复 Desktop 转录本在流式传输期间保持底部固定的行为
- **#118640** - 新增粘贴附件预览功能，解决大段文本粘贴后无视觉反馈的问题

**项目推进评估：** 项目正向成熟稳定方向快速演进，安全边界加固、跨平台兼容性、企业级部署能力持续增强。

## 4. 社区热点

### 高关注度 Issue/PR

**1. Automated Nous integration blocked (#88584)** - 127 条评论
- **状态：** OPEN | 标签：invalid, comp/cron, P3
- **热度分析：** 评论数最高，反映用户对自动化集成流程稳定性的强烈关注
- **核心诉求：** 解决 Nous-to-Enterkey 合并冲突，确保 dashboard updater 与最新 Enterkey 版本对齐
- **链接：** https://github.com/NousResearch/hermes-agent/issues/88584

**2. Bots collaborate across gateways (#97681)** - 28 条评论 | 2 👍
- **状态：** OPEN | 标签：type/feature, comp/gateway, P2
- **热度分析：** 功能型 Issue 中获得较高支持率，代表用户对分布式 Bot 协作的期待
- **核心诉求：** 支持跨网关 Bot 组群协作，无需保持 Desktop 开启，保留各 Bot 独立模型/工具/凭证
- **链接：** https://github.com/NousResearch/hermes-agent/issues/97681

**3. RealtimeVoiceProvider ABC RFC (#77111)** - 27 条评论 | 2 👍
- **状态：** OPEN | 标签：type/feature, innovation, comp/agent, P3
- **热度分析：** 架构讨论类 Issue，显示社区对语音接口标准化的重视
- **核心诉求：** 4 个 competing PR 需要统一 ABC 接口而非 merge queue，符合 AGENTS.md  Footprint Ladder 指导原则
- **链接：** https://github.com/NousResearch/hermes-agent/issues/77111

**4. Nous Portal pricing bug (#110912)** - 27 条评论 | 1 👍
- **状态：** CLOSED | 标签：type/bug, provider/nous, P1
- **热度分析：** 计费相关 bug 引发高度关注，涉及用户直接经济损失
- **核心诉求：** Plus 订阅用户在 credits 用尽后仍被收取全价，怀疑 discount-route bug
- **链接：** https://github.com/NousResearch/hermes-agent/issues/110912

**5. System tray support for Windows/Linux (#38007)** - 13 条评论 | 19 👍
- **状态：** OPEN | 标签：type/feature, comp/desktop, platform/windows, P2
- **热度分析：** 获得最多 👍 的功能请求，反映用户对后台运行需求的普遍性
- **核心诉求：** 关闭窗口后保持应用后台运行，避免每次冷启动耗时
- **链接：** https://github.com/NousResearch/hermes-agent/issues/38007

## 5. Bug 与稳定性

### 严重 Bug（P1/P2）

**1. Desktop renderer memory leak (#77311)** - CLOSED
- **严重程度：** P1
- **问题描述：** renderer 进程无限增长内存，重负载下达到 5GB 舰队占用
- **根因：** `$messages` atom 永久保留所有会话消息
- **修复状态：** 已关闭，预期有对应 fix PR
- **链接：** https://github.com/NousResearch/hermes-agent/issues/77311

**2. SIGTRAP from string_view::substr (#100573)** - OPEN
- **严重程度：** P1
- **问题描述：** Electron 40.10.2 在 Linux 上因越界 substr 调用触发 SIGTRAP
- **复现频率：** 已发生3次
- **修复状态：** 待修复
- **链接：** https://github.com/NousResearch/hermes-agent/issues/100573

**3. state.db corruption on shutdown (#102198)** - CLOSED
- **严重程度：** P1
- **问题描述：** 优雅关机后 SIGTERM 约 0.9 秒仍有写入，导致 page 0 损坏
- **现象：** 下次启动报 "file is not a database"
- **修复状态：** 已关闭
- **链接：** https://github.com/NousResearch/hermes-agent/issues/102198

**4. Assistant messages vanish on session switch (#68321)** - OPEN
- **严重程度：** P2
- **问题描述：** Desktop 切换会话后助手消息消失，用户消息保留，DB 数据完整
- **修复状态：** 待修复
- **链接：** https://github.com/NousResearch/hermes-agent/issues/68321

**5. Duplicate assistant replies rendering (#70108)** - OPEN
- **严重程度：** P2
- **问题描述：** 间歇性重复渲染助手回复，UI 显示两条相同消息
- **修复状态：** 待修复
- **链接：** https://github.com/NousResearch/hermes-agent/issues/70108

**6. Renderer permanent re-render loop (#98394)** - CLOSED
- **严重程度：** P1
- **问题描述：** 空闲状态下 renderer 消耗 30-65% CPU，聊天内容反复消失重现
- **修复状态：** 已关闭
- **链接：** https://github.com/NousResearch/hermes-agent/issues/98394

### 中等 Bug（P2/P3）

**7. MEDIA file links dead (#84361)** - OPEN
- **问题：** 文件链接点击无响应，路径未记录导致调试困难
- **链接：** https://github.com/NousResearch/hermes-agent/issues/84361

**8. delegate_task schema validation bug (#96355)** - OPEN
- **问题：** 输出 schema 验证失败时仍标记为 completed
- **链接：** https://github.com/NousResearch/hermes-agent/issues/96355

**9. Deleted WAL guard no recovery path (#110054)** - OPEN
- **问题：** 触发 deleted-WAL guard 后用户无产品内恢复途径，本周 4 个 Discord 线程、13 个 Issue
- **链接：** https://github.com/NousResearch/hermes-agent/issues/110054

**10. TUI compression crash with LCMEngine (#103410)** - OPEN
- **问题：** 外部上下文引擎热重载配置时崩溃
- **链接：** https://github.com/NousResearch/hermes-agent/issues/103410

**11. Desktop terminal pane never spawns (#118004)** - OPEN
- **问题：** Windows SSH 模式下终端面板空白，无 PTY  spawned
- **链接：** https://github.com/NousResearch/hermes-agent/issues/118004

**12. Newest turn vanishes at completion (#117867)** - OPEN
- **问题：** warm-resume transcript gate 持有时，最新会话在完成时消失
- **链接：** https://github.com/NousResearch/hermes-agent/issues/117867

## 6. 功能请求与路线图信号

**高优先级需求：**

1. **Cross-gateway Bot collaboration (#97681)** - 已有关联 PR 推进，符合 P2 优先级，可能纳入下一版本
2. **System tray background running (#38007)** - 获 19 👍，Windows/Linux 用户普遍需求，建议纳入 roadmap
3. **RealtimeVoiceProvider ABC (#77111)** - 架构级标准化需求，多个 competing PR 需统一接口
4. **Profile multiplexing as only gateway mode (#109417)** - 跟踪 Issue 已关闭，标志该功能战役完成
5. **Managed SSH rollout control plane (#118029)** - 企业级部署需求，需配合 #92618 安全 assurance

**中等优先级需求：**
- Configurable `deliver` target for Home Assistant (#35060)
- `hermes skills lint` validation (#37352)
- Bot Mode chat-like UX (#117520)

## 7. 用户反馈摘要

**主要痛点：**
1. **Desktop 稳定性问题频发** - 内存泄漏、渲染异常、会话切换丢失消息等问题反复出现，影响用户体验
2. **WAL corruption 无恢复机制** - 用户遇到 deleted-WAL 错误后只能重启或运行 doctor --fix，可能加剧问题
3. **计费透明性问题** - Nous Portal 订阅用户遭遇意外全额收费，信任度受损
4. **跨网关协作需求强烈** - 用户期望 Bot 能在不同设备/网关间无缝协作，无需保持 Desktop 常驻
5. **CLI 安全边界漏洞** - `hermes config set` 可绕过系统配置保护，存在安全风险

**正面反馈：**
1. **Profile multiplexing 完成** - 用户认可单一 gateway 服务多 profile 的设计
2. **Circuit breaker 机制** - 工具调用限制防止 API 预算浪费获认可
3. **Sprites 运行时支持** - 企业用户对原生运行时需求得到回应

## 8. 待处理积压

**长期未响应的重要 Issue：**

1. **#59293** - hermes config set bypasses system-config write protection (15 评论，P2)
   - 安全漏洞，CLI 可绕过保护层
   - 创建时间：2026-07-06，已开放 77 天

2. **#20849** - Severe context loss during complex coding workflow (6 评论，P2)
   - 架构级问题，多日编码工作流中的上下文丢失
   - 创建时间：2026-05-06，已开放 139 天

3. **#38007** - System tray support (13 评论，19 👍，P2)
   - 高支持率功能请求
   - 创建时间：2026-06-03，已开放 111 天

4. **#77111** - RealtimeVoiceProvider ABC RFC (27 评论，P3)
   - 架构决策类 Issue
   - 创建时间：2026-08-02，已开放 51 天

**建议维护者关注：**
- Desktop 端稳定性问题（内存、渲染、会话持久化）占 Issue 总数的相当比例，建议设立专项优化冲刺
- 安全相关 Issue（#59293、#71996）需优先处理
- 计费相关 Bug（#110912）已关闭但需验证修复效果，防止复发

---
**报告生成时间：** 2026-09-22
**数据来源：** GitHub API / NousResearch/hermes-agent repository

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期：** 2026-09-22  
**分析师：** AI 智能体与个人 AI 助手领域开源项目分析师

## 1. 今日速览
AstrBot 项目在 2026-09-22 保持高活跃度，过去 24 小时共处理 **10 条 Issues**（5 开/5 关）和 **31 条 PRs**（9 合并/关闭，22 待审）。今日核心进展集中在**稳定性修复**与**安全加固**：OneBot 私聊投递安全性、Gemini 工具调用历史完整性、以及 Cron 任务超时机制得到优化。新增 **Opper** 和 **StepFun** 模型提供商支持，插件市场前端 Bug 被标记关闭。无新版本发布，但代码库正在快速迭代以解决多模态识别、定时任务绕过插件过滤等关键问题。

## 2. 版本发布
*无新版本发布。*

## 3. 项目进展
今日合并/关闭的重要 PR 显著提升了系统的健壮性和兼容性：

*   **QQ 官方适配器稳定性重构 (#9063)**：由 @piexian 提交的长期改进正式关闭（合并），解决了 WebSocket 硬编码心跳、缺乏退避重试及会话失效处理缺陷，大幅降低长时间运行的掉线率。
*   **提示词注入防护与人格锚定 (#10150)**：由 @PhiLia011 提交的 PR 已关闭，为 Agent 增加默认关闭的可选安全能力（12 条中英双语规则、零宽字符检测、人格重申机制），增强了对越狱和提示词泄露的防御。
*   **Cron 超时容忍度提升 (#10183)**：由 @Soulter 提交，将定时任务 misfire grace time 从 30 秒提升至 300 秒，缓解了因系统负载导致的任务意外丢弃问题（响应 Issue #10160）。
*   **OneBot 私聊投递安全加固 (#10181, #10182)**：由 @94yi 提交，实现了投递登记、回执状态监控、熔断保护及消息合并机制，防止私聊场景下的重复回复和状态不一致。
*   **Opper 模型提供商集成 (#10178)**：新增对欧盟托管 AI 网关 Opper 的支持，扩展了多模型聚合能力。
*   **Windows 测试管道稳定化 (#10070)**：将 Windows Lane 从 best-effort 提升为 blocking，确保跨平台兼容性。

**整体推进评估**：项目今日重点填补了消息投递安全和多模态处理的历史漏洞，架构向更可靠的异步消息处理和更强的安全防护方向演进。

## 4. 社区热点
*   **#9743 [CLOSED] WebP 图片多模态识别失败**：用户报告智谱/GLM-4.6V-Flash 和 Kimi-K2.6 在处理 WebP 格式时返回 400 错误。此 Bug 揭示了图片预处理链路缺乏格式归一化的问题，已关闭（可能通过后续 PR #10185 或相关修复间接解决，需进一步验证关联）。
*   **#10161 [CLOSED] 定时任务绕过插件过滤**：@piexian 发现 `CronMessageEvent` 未经历 `waking_check`，导致 `plugin_set` 配置失效。这是一个严重的逻辑缺陷，影响插件管理的预期行为，已关闭（可能通过代码调整解决）。
*   **#10158 [CLOSED] 提示词注入防护**：@PhiLia011 提出的功能获得高度关注，社区对 AI 安全（越狱防护、人格一致性）的需求强烈，该 PR 的合并标志着安全功能的标准化。
*   **#10165 [OPEN] 插件市场前端显示 Bug**：用户反映提交的新版本在审核后消失，尽管后端存在。这暴露了 Cloud 插件市场的状态同步问题，是当前用户体验的痛点。

## 5. Bug 与稳定性
| 问题 | 严重性 | 描述 | 状态/Fix PR |
|------|--------|------|-------------|
| **#9743** | 高 | WebP 图片在多模态 API 识别中失败（格式未归一化） | 已关闭，可能关联 #10185 (context budget/image payload) |
| **#10179** | 中 | QQ (aiocqhttp) 引用图片消息无法解析内容，机器人无响应 | Open，尚无合并 PR |
| **#10165** | 中 | Cloud 插件市场前端提交后版本消失（后端已知） | Open，维护者需介入排查前后端状态同步 |
| **#10161** | 高 | 定时任务绕过插件启用/禁用过滤 (`plugin_set`) | 已关闭，逻辑缺陷已修复 |
| **#10094** | 低 | 小红书 Dots 模型兼容性差（频繁搜索、回复错误） | 已关闭，可能需要插件侧适配 |

**稳定性评估**：今日修复了两个关键逻辑 Bug（图片格式、定时任务过滤），但引入了对 OneBot 私聊投递稳定性的依赖改进。新报告的图片引用解析 Bug (#10179) 值得关注。

## 6. 功能请求与路线图信号
*   **远程桌面控制 (Issue #10137)**：用户希望部署在云端的 AstrBot 能远程控制本地电脑，类似 Windows 桌面版。当前插件体验不佳，这是一个潜在的**远程控制插件**或**系统集成**方向。
*   **更多 TTS/STT/Embedding 供应商 (Issue #10160)**：用户请求支持 SiliconFlow 等提供商，并允许自定义 Cron 超时。**PR #10183** 已部分响应（Cron 超时），**PR #10153** 已添加 StepFun，**PR #10178** 已添加 Opper，显示团队正在积极扩展提供商生态。
*   **Android Termux 一键部署 (Issue #7487)**：长期存在的轻量级部署需求，作者已提供脚本，可能需要官方整合或推荐。
*   **全局 LLM 无响应前缀 (PR #10180)**：允许配置前缀跳过 LLM 处理，保留 CLI 式命令空间，体现了对**命令冲突解决**的需求。
*   **Reset 功能语义恢复 (Issue #10114)**：用户希望 `reset` 仅清空上下文而非开启新对话，避免与 `new` 命令重复。这可能需要在**对话管理 UX** 上进行澄清或功能重组。

## 7. 用户反馈摘要
*   **痛点**：
    *   **图片兼容性**：WebP 格式支持不佳，引用图片解析失败，多模态能力受限。
    *   **配置覆盖不全**：定时任务不受 `plugin_set` 约束，导致插件管理策略失效。
    *   **远程操作缺失**：云端部署用户缺乏便捷的本地 PC 控制手段。
    *   **插件市场透明度高**：前端状态显示不一致导致用户困惑。
*   **满意点**：
    *   **安全性增强**：对提示词注入防护的功能请求得到积极响应并合并。
    *   **稳定性改进**：QQ 适配器的心跳和重连机制得到彻底重构，OneBot 投递安全性提升。
    *   **生态扩展**：持续增加新的模型提供商（Opper, StepFun），满足多元化需求。

## 8. 待处理积压
*   **#7487 [OPEN] Android Termux 一键部署脚本**：创建时间较长（2026-04-12），作者已提供解决方案但未合并进主流程。建议维护者评估是否将其纳入官方文档或脚本集。
*   **#10137 [OPEN] 远程本地电脑控制功能**：用户需求明确，但目前无直接 PR。可考虑作为独立插件或高级功能开发。
*   **#10160 [OPEN] 拓展模型提供商及 Cron 超时**：部分需求已通过 PR 响应，但 SiliconFlow 等特定供应商支持可能仍需跟进。
*   **#10179 [OPEN] QQ 引用图片消息解析失败**：新报告的高优先级 Bug，影响多模态体验，需优先排查。
*   **#10165 [OPEN] 插件市场前端版本消失**：影响插件开发者体验，需后端与前端的版本状态同步检查。

---
**报告生成时间：** 2026-09-22  
**数据来源：** GitHub API (AstrBotDevs/AstrBot)

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：** 2026-09-22
**数据来源：** GitHub Discussions (188 条/24h)

## 1. 今日速览
DeepSeek Harness 社区在过去24小时内保持了极高的活跃度（188条讨论更新），当前处于版本升级后的密集排错期。核心焦点集中在修复大规模会话兼容性问题（`prepare` 错误、v0迁移失败）及长上下文下的稳定性回归。新功能方面，加密凭据保险库插件（dsh-vault）引发高度关注，同时第三方插件兼容性也被重点讨论。

## 2. 版本发布
*   **无新版本发布**（Release: 0）。
*   当前社区主要围绕 `0.1.2-rc.1` 及 `0.1.3-alpha.2` 等测试/发布版本进行问题反馈与修复验证。

## 3. 项目进展
由于该仓库通过 Releases 落地合并，今日无新发版记录。根据社区讨论中的代码引用，近期已合并的关键修复包括：
*   **#3713**: 修复了第三方插件（如 dsh-ssh）注册 HTTP 通道时导致的启动崩溃问题（见 Discussion #5926 提到的 `c389f96bf3` 提交）。
*   **#2663**: 修改了 `SUBAGENT_DESCRIPTOR_VERSION`（从2改为3），但引发了历史会话兼容性问题（见 Discussion #6045）。
*   **#4017 跟进**: 针对 Scheduler 失败后 session 永久不可用的问题，已有部分修复尝试（见 Discussion #4549）。

## 4. 社区热点
以下讨论评论数最多，反映了当前用户最紧迫的痛点：

1.  **[Ideas] dsh-vault — 加密凭据保险库插件** (#1457)
    *   **热度:** 250 条评论
    *   **摘要:** 用户 @Ox0400 提出的插件方案，用于加密存储 API Key、TOTP、SSH 等敏感信息。社区反应热烈，显示出用户对安全合规和凭据管理的强烈需求。
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/1457)

2.  **[General] 本轮运行失败 Cannot read properties of undefined (reading 'prepare')** (#7035)
    *   **热度:** 34 条评论
    *   **摘要:** 大量用户反馈升级后出现此崩溃。这是当前最严重的通用 Bug，影响了广泛的运行环境。
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/7035)

3.  **[Ideas] OpenCode Go API 请求头要求** (#5495)
    *   **热度:** 32 条评论
    *   **摘要:** OpenCode Go 服务商通知，自 09/05 起需携带 `x-opencode-session` 头部，否则报错。涉及约 2.5 万用户组织，需要 Harness 适配。
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)

4.  **[General] v0 迁移拒绝 subagent/descriptor version 2** (#6045)
    *   **热度:** 9 条评论
    *   **摘要:** 揭示了 #2663 合并后的破坏性变更：2026-08-24 之前创建的含 subagent 的会话无法在新版本中打开。
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/6045)

5.  **[Bug] Agent 在超长上下文 + max reasoning effort 下退化** (#5976)
    *   **热度:** 11 条评论
    *   **摘要:** 报告 `deepseek-v4.1-flash` 在特定配置下陷入思考循环且无熔断，而 `v4-flash` 正常。疑似模型或调度器回归。
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/5976)

## 5. Bug 与稳定性
当前稳定性风险**高**，主要集中在升级后的兼容性和特定场景崩溃：

| 严重程度 | 描述 | 关联 Discussion |
| :--- | :--- | :--- |
| **P0 - 致命** | `Cannot read properties of undefined (reading 'prepare')`：升级后新开窗口或历史加载失败，多实例复现。 | [#7035](https://github.com/deepseek-ai/deepseek-harness/discussions/7035), [#6986](https://github.com/deepseek-ai/deepseek-harness/discussions/6986), [#2620](https://github.com/deepseek-ai/deepseek-harness/discussions/2620), [#7273](https://github.com/deepseek-ai/deepseek-harness/discussions/7273) |
| **P0 - 致命** | `Cannot read properties of undefined (reading 'find')`：Windows 上 0.1.2-rc.1 发消息即崩，会话持久化 ENOENT。 | [#5802](https://github.com/deepseek-ai/deepseek-harness/discussions/5802) |
| **P1 - 严重** | v0 迁移逻辑缺陷：导致 2026-08-24 前的旧会话（特别是含 subagent 的）永久无法打开。 | [#6045](https://github.com/deepseek-ai/deepseek-harness/discussions/6045) |
| **P1 - 严重** | Session 损坏：`stored session ... is corrupt`，validate 失败。 | [#6986](https://github.com/deepseek-ai/deepseek-harness/discussions/6986) |
| **P2 - 中等** | Scheduler 失败导致 tool/call 悬挂，Session 永久返回 400 INVALID_REQUEST。 | [#4549](https://github.com/deepseek-ai/deepseek-harness/discussions/4549) |
| **P2 - 中等** | 第三方插件 (`dsh-ssh`) 导致连接无法启动。 | [#5926](https://github.com/deepseek-ai/deepseek-harness/discussions/5926) |
| **P2 - 中等** | Seeded/Forked sessions 重启后标题回退为 workspace 目录名。 | [#5857](https://github.com/deepseek-ai/deepseek-harness/discussions/5857) |

*注：目前尚无明确的 Fix PR 链接在讨论中，多为反馈与排查阶段。*

## 6. 功能请求与路线图信号
*   **加密凭据管理**: Discussion #1457 (dsh-vault) 获得了极高热度，表明用户对于**本地敏感信息安全管理**有迫切需求，未来可能有官方集成或官方插件支持。
*   **API 标准兼容性**: Discussion #5495 显示了用户对第三方 Inference API 标准（如 OpenCode Go 头部要求）的适配需求，路线图需考虑对主流厂商 API 规范的跟进。
*   **极简模式记忆**: Discussion #2783 询问极简模式下的记忆处理，用户希望原生支持类似 `/handoff` 或 compaction 的功能。

## 7. 用户反馈摘要
*   **升级阵痛**: 大量用户反馈升级 `dsh` 到 `0.1.2` 及以上版本后，原有会话损坏或无法启动（`prepare` / `find` undefined 错误），体验极差。
*   **性能与稳定性**: 用户对 `v4.1-flash` 在超长上下文下的表现不满，认为存在退化循环且缺乏自动熔断机制；相比之下 `v4-flash` 更稳定。
*   **使用场景**: 
    *   高频 API 调用用户（如 OpenCode Go 用户）对头部字段兼容性敏感。
    *   企业/开发用户高度重视凭据安全，对 SSH/API Key 管理有强需求。
    *   批量 Session 管理用户（Seeded/Forked）遇到 UI 展示 bug。
*   **成本敏感**: Discussion #2064 显示重度用户对价格变化非常敏感，并通过数据分析向社区分享成本优化经验。

## 8. 待处理积压
*   **`prepare` 错误蔓延**: 多个独立 Issue (#7035, #6986, #2620, #7273, #5802) 指向类似的 undefined 错误，可能是共同根因导致的系统性回归，需优先级置顶排查。
*   **v0 迁移破坏性变更**: Discussion #6045 指出的旧会话兼容性问题影响面广（所有 08-24 前的 subagent 用户），需紧急评估热修复方案。
*   **Scheduler 悬挂问题**: Discussion #4549 描述的 Session 永久失效问题缺乏闭环，需跟进修复状态。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*