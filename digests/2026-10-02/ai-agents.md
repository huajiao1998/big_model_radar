# OpenClaw 生态日报 2026-10-02

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-02 01:11 UTC

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
**日期：** 2026-10-02
**数据来源：** GitHub (openclaw/openclaw)

## 1. 今日速览
OpenClaw 在过去24小时内保持极高活跃度，共处理 500 条 Issues 和 500 条 PR，其中新增/活跃 Issue 262 条，合并/关闭 238 条。项目刚刚发布了 `v2026.8.34` 这一网关专用的 `extended-stable`（类比 LTS）版本，重点修复了关键安全漏洞及性能问题。然而，社区反馈显示 2026.9.x 系列版本在 Windows 平台、SQLite 存储管理以及多代理会话状态同步方面存在严重的回归问题，P0 级 Bug 密集出现，反映出近期迭代中稳定性承压明显。

## 2. 版本发布
**v2026.8.34 (extended-stable/gateway-only)**
*   **性质：** 网关专用长期支持版本，相当于 LTS。
*   **内容：** 包含 2026 年 8 月底的代码基线，叠加了关键安全更新、可靠性修复、性能优化及新模型支持。
*   **注意：** 此版本为网关独立发布，旨在为生产环境提供比最新 beta/rc 更稳定的基线。

## 3. 项目进展
今日 PR 流动速度极快，主要聚焦于底层基础设施重构、Windows 平台兼容性修复及存储层优化：

*   **基础设施清理：** @steipete 推进了 `refactor(infra): deslop infra seventh pass` (#161513)，继续清理基础设施中的重复解析和转发逻辑，不涉及核心语义变更，旨在降低维护复杂度。
*   **Windows 兼容性修复：** 针对 Windows 上 `DataCloneError` 和路径泄露问题，多个 PR 正在并行修复。例如，#161654 和 #161828 讨论并部分解决了 Windows 隔离 cron 和聊天会话中 Proxy 对象无法克隆的问题。
*   **存储与 WAL 维护：** #162166 修复了数据库退役前的 WAL 维护竞争条件，确保异步维护工作能正确结算，防止数据库关闭时的状态不一致。
*   **插件与 UI 体验：** #163141 和 #162314 增强了 Control UI 对 ClawHub 插件的生命周期管理（安装、更新、卸载），并暴露了底层生命周期后端。
*   **内存与性能：** #160442 优化了工作节点加载逻辑，仅加载当前 turn 所需的模块，显著减少内存占用并加速首次响应。

## 4. 社区热点
以下 Issues 评论数最多，反映了用户最紧迫的痛点：

*   **#143524: Agent SQLite WAL 无限增长至 1.4–2.8 GB** (103 评论, P0, 🦐 gold shrimp)
    *   **热度原因：** 直接导致 Gateway 启动阻塞，影响范围大。用户报告在 Windows 单网关环境中，尽管设置了 `wal_autocheckpoint`，WAL 文件仍不受控制地增长。
    *   **链接：** https://github.com/openclaw/openclaw/issues/143524

*   **#153257: 升级至 2026.9.5 导致 8 小时故障恢复** (40 评论, P0, 🦪 silver shellfish)
    *   **热度原因：** 典型的生产环境回归案例，用户明确表达对版本稳定性的担忧，称原本稳定的环境在升级后崩溃。
    *   **链接：** https://github.com/openclaw/openclaw/issues/153257

*   **#149538: Gateway 就绪但事件循环饥饿，/health 探针超时** (23 评论, P0, 🦐 gold shrimp)
    *   **热度原因：** 涉及大规模 Agent 集群（632-agent fleet）的稳定性，RSS 内存持续增长直至耗尽，属于严重的资源泄漏问题。
    *   **链接：** https://github.com/openclaw/openclaw/issues/149538

*   **#157067: Windows 隔离 cron 设置传递不可克隆的 Proxy** (21 评论, P1, 🦞 diamond lobster) **[已关闭]**
    *   **热度原因：** 明确了 Windows 平台上的环境克隆 bug，虽已关闭，但反映了 Windows 子系统的深层兼容性问题。
    *   **链接：** https://github.com/openclaw/openclaw/issues/157067

*   **#159662: prepared-model-catalog.worker.js 内存泄漏** (14 评论, P0, 🦪 silver shellfish)
    *   **热度原因：** 每小时泄漏 4-5 GB 内存，且与模型提供商无关，是通用的严重资源泄漏点。
    *   **链接：** https://github.com/openclaw/openclaw/issues/159662

## 5. Bug 与稳定性
今日报告的 Bug 多数标记为 P0 或 P1，且多为**回归（Regression）**，主要集中在以下几个领域：

| 严重程度 | 领域 | 问题描述 | 关联 Issue | Fix PR? |
| :--- | :--- | :--- | :--- | :--- |
| **P0** | 存储 | SQLite WAL 不检查点，文件暴涨导致启动失败 | #143524 | 待确认 |
| **P0** | 内存 | `prepared-model-catalog.worker.js` 无界内存泄漏 (~4-5GB/h) | #159662 | 待确认 |
| **P0** | Windows | `sessions.create` 失败，抛出 "Session creation publication owner is no longer current" | #161953 | #161654 部分涉及 |
| **P0** | 稳定性 | Gateway 启动健康检查超时，事件循环饥饿 | #149538 | 待确认 |
| **P0** | 稳定性 | 大 Session 存储下 SQLite I/O 压力过大，WebUI RPC 超时 | #160386 | 待确认 |
| **P1** | 会话 | 回复丢失："Reply operation has no active tool authority snapshot" | #148707 | 待确认 |
| **P1** | 会话 | 子 Agent 完成通知无限重试，导致死循环 | #153417 | 待确认 |
| **P1** | 安全 | MCP 工具未注入子 Agent session (`sessions_spawn`) | #85030 | #84037 相关 |
| **P1** | 平台 | Windows 升级 Doctor 检查耗时过长（>35分钟） | #162047 | 待确认 |

**整体稳定性评估：** 较差。2026.9.5 至 2026.9.7 版本引入了多处严重回归，特别是在 Windows 平台和大型部署场景下。

## 6. 功能请求与路线图信号
*   **Discord/Slack 会话回链：** #158742 正在实现从 Session Header 直接返回到 Discord 或 Slack 原始对话的功能，提升多通道用户体验。
*   **macOS 原生 Rust Sidecar：** #149725 推进 macOS 应用采用共享 Rust Gateway 客户端，符合 RFC #54 的方向，旨在提升安全性和原生集成度。
*   **插件生命周期 UI：** #162314 和 #163141 显示项目正致力于将 ClawHub 插件的管理（安装/更新/卸载）完整融入 Control UI，减少命令行依赖。
*   **执行安全 Denylist：** #6615 和 #71097 长期请求为 `exec-approvals` 添加 denylist（黑名单）模式，以补充现有的 allowlist，实现更灵活的“默认允许，特定阻断”策略。

## 7. 用户反馈摘要
*   **痛点 - 升级风险：** 多位用户（如 #153257, #160386）反映升级至 2026.9.x 后环境变得不稳定，出现启动失败、响应丢失和性能下降，暗示发布前的集成测试在大规模场景下存在缺失。
*   **痛点 - Windows 兼容性：** Windows 用户在 cron 任务、环境克隆和路径处理上遇到连续挫败（#157067, #161953, #162047），`win32` 特定的 Proxy 和路径处理逻辑似乎是当前的薄弱环节。
*   **痛点 - 资源泄漏：** 用户对 SQLite WAL 增长（#143524）和模型目录内存泄漏（#159662）表示焦虑，认为这些“无界增长”问题在长期运行的网关中是不可接受的。
*   **满意点：** 社区对 `extended-stable` 版本的推出表示认可，认为这为生产环境提供了必要的稳定锚点。

## 8. 待处理积压
*   **#97616: OpenClaw 泄漏未回收的 hook/tool 子进程** (16 评论, P1, 🦪 silver shellfish)
    *   **状态：** 长期开放，僵尸进程积累导致运行时退化。需维护者关注进程管理生命周期。
*   **#114612: memory-core SQLite 无界增长** (15 评论, P1, 🦞 diamond lobster)
    *   **状态：** `memory_index_chunks` 和 `memory_embedding_cache` 表缺乏保留策略，需引入数据清理机制。
*   **#85030: MCP 工具未注入子 Agent** (16 评论, P1, 🦞 diamond lobster) **[已关闭但影响深远]**
    *   **状态：** 虽已关闭，但揭示了 `sessions_spawn` 中 MCP 工具暴露的架构缺陷，需确保修复方案彻底。
*   **#155859: 插件数量影响 Gateway 启动时间** (11 评论, P0, 🦪 silver shellfish)
    *   **状态：** 2026.9.5 回归，插件加载成为启动瓶颈，影响 UX。

---
**分析师备注：** OpenClaw 目前处于一个关键的稳定性修正期。虽然新功能（如 Rust sidecar、UI 插件管理）在稳步推进，但 2026.9.x 系列带来的大量 P0 回归（尤其是 Windows 和存储层面）严重影响了用户信任。建议维护者优先处理 WAL 检查和内存泄漏问题，并加强对 Windows 平台的回归测试覆盖。

---

## 横向生态对比

## 个人 AI 助手开源生态横向对比分析报告
**日期：** 2026-10-02  
**分析师：** Agnes (Sapiens AI)

### 1. 生态全景
当前个人 AI 助手与自主智能体开源生态正处于**“功能爆发后的稳定性修正期”**。 OpenClaw 作为旗舰级网关，因 v2026.9.x 系列的严重回归（Windows 兼容性与资源泄漏）而承压，迫使团队推出 `extended-stable` 版本救火，反映出复杂多代理架构在规模化落地时的技术债务集中释放。与此同时，轻量化项目（PicoClaw, QwenPaw）聚焦于单点体验优化与多模态兼容性修复，显示出生态碎片化但垂直深耕的特征。Zeroclaw 则在 WASM 插件宿主与权限边界上探索更安全的技术路线，与 OpenClaw 形成差异化竞争。

### 2. 各项目活跃度对比

| 项目 | Issues (24h) | PR (24h) | Release | 健康度评估 | 核心状态 |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **OpenClaw** | 500+ (262 活跃) | 500+ | v2026.8.34 (LTS) | 🟠 中危 | 高活跃，但 P0 回归密集，稳定性承压 |
| **hermes-agent** | 500+ (354 新开) | 500+ (100 合并) | 无 | 🟡 关注 | 高强度迭代，Desktop 渲染与远程连接痛点多 |
| **Zeroclaw** | 37 | 50 | 无 | 🟢 良好 | 活跃开发 v0.8.6/0.9.0，基础设施重构中 |
| **AstrBot** | 11 (9 活跃) | 16 | v4.29.0-beta.1 | 🟢 良好 | 稳定迭代，UI/配置优化为主，子代理路由有 Bug |
| **DeepSeek Harness** | N/A (Discussions) | N/A | 0.2.0-rc.2 | 🔴 警告 | Windows 沙箱与 CLI 执行严重故障，Linux 支持滞后 |
| **PicoClaw** | 2 | 14 | 无 | 🟠 中危 | 低活跃，官网 TLS 过期，依赖更新积压 |
| **QwenPaw** | 7 | 9 (2 合并) | 无 | 🟢 良好 | 中等活跃，多模态兼容性修复见效，Beta 版待稳 |

### 3. OpenClaw 在生态中的定位
*   **定位：** 企业级/重度用户的**全功能网关与代理编排中心**。它是生态中功能最全、复杂度最高的项目，支持多代理、多通道、插件生态及 Rust Sidecar 等高级特性。
*   **优势：** 社区规模庞大（日增 500+ Issue/PR），插件生态（ClawHub）丰富，长期支持（LTS）策略显示其对生产环境稳定性的重视。
*   **劣势：** 迭代速度过快导致质量失控，Windows 平台兼容性差，资源管理（SQLite WAL、内存）存在严重缺陷。
*   **对比：** 相比 hermes-agent 侧重 Desktop 原生体验，OpenClaw 更侧重服务端/网关能力；相比 Zeroclaw 的安全隔离架构，OpenClaw 更强调功能覆盖与灵活性。

### 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求/现象 |
| :--- | :--- | :--- |
| **Windows 平台稳定性** | OpenClaw, DeepSeek Harness, hermes-agent | OpenClaw: DataCloneError, Proxy 克隆失败; DSH: ACL 沙箱初始化失败, CLI 退出码异常; Hermes: Keet gateway 崩溃。Windows 成为多项目痛点。 |
| **资源泄漏与性能优化** | OpenClaw, hermes-agent | OpenClaw: SQLite WAL 无限增长, worker.js 内存泄漏; Hermes: Dashboard 内存泄漏至 5.2GB, Desktop 空闲资源消耗。长期运行可靠性是核心挑战。 |
| **多代理/子任务协作** | OpenClaw, AstrBot, QwenPaw | OpenClaw: 会话状态同步困难; AstrBot: 子代理完成后主 Agent 回复丢失; QwenPaw: 异步工具结果路由错误。代理间通信与状态管理是共性难题。 |
| **可观测性与审计** | hermes-agent, Zeroclaw | Hermes: action receipts, durable authority primitives; Zeroclaw: Gateway 可观测性接口统一。用户对 Agent 执行过程的透明度需求上升。 |
| **插件/扩展系统安全** | Zeroclaw, OpenClaw | Zeroclaw: 插件宿主隔离, 权限边界重构; OpenClaw: ClawHub 插件生命周期管理。安全沙箱与权限控制是插件生态发展的前提。 |

### 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | 全能网关、多代理编排、插件市场 | 企业用户、重度自定义需求者 | 网关架构，支持 Rust Sidecar，强调 LTS 与向后兼容 |
| **hermes-agent** | Desktop 原生应用、远程 VPS 连接、多模型支持 | 个人开发者、桌面端重度用户 | Electron + Gateway 分离架构，强调本地体验与远程协作 |
| **Zeroclaw** | WASM 插件宿主、运行时权限隔离、轻量网关 | 安全敏感型用户、嵌入式场景 | Rust 核心，WASM 插件隔离，Capability-based 权限模型 |
| **AstrBot** | 即时通讯机器人、Dashboard UI、中文友好 | 社群运营者、中文用户、快速部署用户 | 模块化插件架构，强调 UI 易用性与多渠道接入 |
| **DeepSeek Harness** | 代码执行沙箱、IDE 集成 | 开发者、代码助手用户 | 深度集成 DeepSeek 模型，Windows/Linux 沙箱执行环境 |
| **QwenPaw** | 多模态交互、CJK 渲染优化、Advisor 模式 | 中国用户、多模态应用开发者 | 基于 AgentScope，强调 CJK 支持与双模型协作 |
| **PicoClaw** | 轻量级、边缘设备适配 | 资源受限环境、简单个人助手 | Go 语言，注重二进制体积与边缘部署 |

### 6. 社区热度与成熟度

*   **快速迭代阶段（高热度，质量波动）：**
    *   **OpenClaw:** Issue/PR 量最大，但 P0 回归多，处于“功能扩张后的稳定性补课”阶段。
    *   **hermes-agent:** 同样高热度，Desktop 端问题集中爆发，正在修复历史债务。
    *   **Zeroclaw:** 活跃于核心架构重构（WASM、权限），为 v0.9.0 做准备，属于技术预研与基建加固期。

*   **质量巩固阶段（中等热度，稳定优化）：**
    *   **AstrBot:** 发布节奏稳定（beta 版），UI/配置优化为主，Bug 修复响应较快，处于成熟产品迭代期。
    *   **QwenPaw:** 修复多模态兼容性与渲染问题，Beta 版推广中，属于功能完善期。

*   **特定场景深耕阶段（低/中热度，痛点明显）：**
    *   **DeepSeek Harness:** Windows 端严重故障影响核心用户群，Linux 支持滞后，需优先解决基础稳定性。
    *   **PicoClaw:** 活跃度较低，但官网运维失误（TLS 过期）暴露了小项目维护风险。

### 7. 值得关注的趋势信号

1.  **“稳定性税”在高复杂度项目中开始显现：** OpenClaw 和 hermes-agent 的案例表明，当智能体系统扩展到多代理、多通道、跨平台时，测试覆盖与回归管理成为瓶颈。开发者需重视基础设施层面的稳定性投资，而非仅追求功能数量。
2.  **Windows 平台成为开源 AI 助手的新边疆与挑战高地：** 多个项目（OpenClaw, DSH, Hermes）在 Windows 上遭遇沙箱、权限、路径处理等共性问题。这表明 Windows 平台的 AI 原生应用支持仍存在显著技术差距，是潜在的竞争优势点或社区贡献机会。
3.  **资源泄漏是长期运行服务的隐形杀手：** SQLite WAL 增长、内存泄漏等问题在多个项目中出现，直接影响生产环境可用性。开发者应将资源监控、自动清理机制作为核心功能纳入设计。
4.  **安全与权限隔离成为进阶架构的焦点：** Zeroclaw 的 WASM 隔离与 Capability 模型，以及 OpenClaw/Hermes 对审计与权限的关注，反映出生态从“功能可用”向“安全可信”演进的趋势。
5.  **用户体验从“可用”转向“可靠与可控”：** 用户不再满足于功能实现，而是关注任务执行的确定性（如 AstrBot 子代理路由、QwenPaw 异步结果路由）、资源消耗的可控性（如时间预算）以及操作的可观测性（如 action receipts）。

**结论：** 2026 年 Q3 末至 Q4 初，个人 AI 助手开源生态呈现出“头部项目修补缺陷、腰部项目优化体验、细分领域深耕安全与平台适配”的格局。对于开发者而言，借鉴 OpenClaw 的稳定性教训、关注 Windows 平台的兼容性问题、并考虑引入资源管理与安全隔离机制，将是构建更具竞争力产品的重要方向。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 (2026-10-02)

## 1. 今日速览
Zeroclaw 项目开发活跃度极高，过去24小时产生 **50条 PR** 和 **37条 Issue**，核心贡献者 @JordanTheJet 和 @IftekharUddin 密集推进 v0.8.6/v0.9.0 的关键基础设施。项目正集中攻克 **WASM 插件宿主集成**、**运行时权限边界重构** 及 **配置持久化安全** 三大难题，同时修复了严重的内存所有权泄露 Bug。整体健康度良好，但 p0 级 Bug 较多，需密切关注稳定性回归风险。

## 2. 版本发布
*   **无新版本发布。**
*   当前开发重点围绕 `release:v0.8.6` 和 `release:v0.9.0` 的 Feature Freeze 准备阶段，多个 Tracker Issue (#7432) 仍在活跃迭代中。

## 3. 项目进展
今日 PR 主要推动以下核心架构改进：

*   **Gateway 核心化与服务暴露**：PR #11382 将状态、日志、诊断doctor及事件流通过核心 Gateway 暴露，进一步解耦并统一了可观测性接口（基于 #11351 堆叠）。
*   **插件生命周期与 WASM 宿主完善**：
    *   PR #11302 实现了插件安装时的 Channel 实例绑定与授权种子注入。
    *   PR #11347 确保 WASM 插件宿主被包含在标准发布制品中。
    *   PR #11356 修复了 Wasmtime 48 中因 trap 导致插件实例需要重置的问题，提升了插件稳定性。
    *   PR #11348 修复了插件 Channel 健康检查误报为 `ok` 的 Bug。
*   **运行时组合边界澄清**：PR #11174 和 #11187 引入了接受 Capability 的构造函数，将 `DefaultCapabilities` 构建移至应用层，使运行时更易于嵌入和测试。
*   **工具集精简与分级**：PR #11221 将 SaaS 和编码 CLI 工具置于特性标志（feature flags）之后，PR #11308 和 #11305 建立了工具层级目录，为二进制体积优化奠定基础。
*   **配置加载原子性**：PR #11370 修复了配置数据目录锁定问题，防止中断升级导致数据库卡住（关联 Issue #11369）。

## 4. 社区热点
以下 Issues/PRs 评论活跃或影响深远：

*   **[Tracker] Runtime and gateway delivery - v0.8.6 and v0.9.0 (#7432)** [5 评论]
    *   链接: https://github.com/zeroclaw-labs/zeroclaw/issues/7432
    *   **分析**: 这是当前版本发布的总控 Issue，涵盖了 Phase 2/3 的所有交付物，社区高度关注其进度。
*   **Session-persistence contract ownership (#9600)** [16 评论]
    *   链接: https://github.com/zeroclaw-labs/zeroclaw/issues/9600
    *   **分析**: 讨论会话持久化合约的所有权和分层顺序，涉及多工作流交叉，是架构稳定性的关键辩论点。
*   **Delegated memory tools lose principal scope (#11198)** [4 评论, **p0**]
    *   链接: https://github.com/zeroclaw-labs/zeroclaw/issues/11198
    *   **分析**: 代理委托内存工具丢失主体作用域，导致安全风险，用户对此类权限泄露问题反应强烈。
*   **Config::save() can replace populated config with near-empty file (#10495)** [4 评论, **p0**]
    *   链接: https://github.com/zeroclaw-labs/zeroclaw/issues/10495
    *   **分析**: 配置保存逻辑存在数据丢失风险，严重影响用户信任，已获 Accepted 状态。

## 5. Bug 与稳定性
今日报告了多个高优先级 Bug，按严重程度排列：

| 严重级别 | Issue ID | 描述 | 状态/Fix PR |
| :--- | :--- | :--- | :--- |
| **S0** | #10495 | `Config::save()` 可能用空文件覆盖已有配置，导致数据丢失 | Accepted, 需修复 |
| **S0** | #11198 | 委托内存工具丢失 Principal 作用域，存在安全隐患 | Accepted, 需修复 |
| **S0** | #11239 | 所有者会话通过 `spawn_subagent` 意外访问共享内存平面 | Accepted, 关联 #11411 (SOP 审计) |
| **S1** | #10066 | SOP 引擎在记录 output-schema 拒绝前执行后续步骤，阻断工作流 | Accepted, 需修复 |
| **S1** | #11369 | Master 分支 Docker 镜像启动失败；中断升级可能导致数据库卡住 | Accepted, **Fix PR: #11370** |
| **S2** | #9799 | 长时间运行的 ephemeral daemon 出现多核 CPU 自旋 | Needs Repro, 需监控 |
| **S2** | #11387 | `zerocode` 再次忽略启动目录，强制使用 agent workspace 为 cwd (回归) | Accepted, 回归自 #10609 |
| **S3** | #11416 | Slack 频道线程中 "is thinking..." 状态不再显示 (v0.8.5 引入) | New, 待确认 |
| **S3** | #11296 | llama.cpp 自定义 Provider 使用错误的 URL/URI | New, 待修复 |

## 6. 功能请求与路线图信号
*   **本地用户名/密码 AuthProvider (#8076)**: 用户迫切需要在没有 IdP 的情况下支持浏览器登录，当前 OIDC/SSH-key 方案无法覆盖此场景。
*   **Llama.cpp 模型路由器 (#7539)**: 社区请求支持快速切换本地模型，目前仅支持默认模型。
*   **Verified Plugin Update with Rollback (#10995)**: 请求增加插件更新命令及失败回滚机制，当前仅支持 install/remove。
*   **ZeroRelay 认证传递 (#10766)**: 建议 Relay 路径保留认证主体而非折叠为共享操作员，以支持多租户托管场景。
*   **预测**: 上述功能中，插件更新机制 (#10995) 和本地 AuthProvider (#8076) 很可能被纳入 v0.9.0 路线图，因为相关基础设施（如插件绑定 #11302）正在今日被构建。

## 7. 用户反馈摘要
*   **痛点**: 配置丢失风险 (#10495) 和内存权限泄露 (#11198) 是用户最担忧的安全点，直接影响生产环境部署信心。
*   **体验问题**: `zerocode` 工作目录回归问题 (#11387) 和 Slack 状态指示器丢失 (#11416) 影响了日常交互体验的连贯性。
*   **需求**: 用户希望更细粒度的工具控制（通过 feature flags 减少二进制体积）以及更好的本地模型管理（llama.cpp 路由器）。
*   **满意点**: 对插件系统端到端测试和文档完善（#11303, #11329）持肯定态度，表明项目正在改善可维护性。

## 8. 待处理积压
*   **Long-standing High Risk**: #9799 (Daemon CPU spin) - 自 2026-08-07 开放，仍需复现步骤，建议维护者优先安排资源复现。
*   **Security Audit Findings**: #9394 (Gateway pairing dashboard 未使用且配对码永不过期) - 自 2026-07-26 开放，属于安全审计发现的结构性缺陷，需尽快处理。
*   **WIT Pin Divergence**: #9624 - Registry WIT 版本与主分支分叉，导致发布的组件失效，影响插件生态兼容性，需尽快刷新兼容性矩阵。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：** 2026-10-02  
**数据来源：** GitHub sipeed/picoclaw

## 1. 今日速览
PicoClaw 今日保持中等活跃度，共涉及 2 条 Issues 和 14 条 PR。社区贡献者 @x1F916 集中提交了 7 个 Bug 修复 PR，主要解决 Agent 上下文管理、配置持久化及更新机制等核心稳定性问题。然而，项目官方域名 `picoclaw.io` 的 TLS 证书已过期导致官网无法访问（Issue #3377），这是一个高优先级的运维缺失。此外，多个依赖更新 PR 仍停留在待合并状态，需关注集成进度。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
**今日合并/关闭：**
- **PR #3376** (Closed): 修复了 `deltachat` 渠道的配置验证错误，将其正确注册为自定义渠道。这解决了多通道支持中的一个已知配置缺陷，提升了渠道配置的健壮性。
- **PR #423** (Closed): 长期处于 WIP 状态的多 Agent 协作框架 PR 已关闭（可能因合并其他相关 PR 或被放弃），该项目此前尝试引入 Blackboard 和 Agent Handoff 机制。

**重要开放 PR (推进中):**
- **PR #3403 & #3402**: 由 @x1F916 提交的 Agent 核心修复。前者解决异步工具结果错误路由到默认会话的问题；后者修复非默认 Agent 的上下文管理器问题。这两个 PR 对多 Agent 场景下的消息准确性至关重要，目前仍待合并。
- **PR #3414**: 提议新增“墙钟时间预算”功能，允许在单轮对话中限制 Agent 的工具调用时间，防止无限循环。这是一个重要的用户体验改进功能。

## 4. 社区热点
**最活跃 Issue/PR：**
- **[CRITICAL] Issue #3377: TLS certificate expired** (2 👍, 3 comments)
  - **链接:** https://github.com/sipeed/picoclaw/issues/3377
  - **分析:** 这是今日最值得关注的紧急问题。官网 HTTPS 证书过期导致所有浏览器拒绝连接，严重影响项目形象和新用户获取。该 Issue 标记为 Critical 且已过 stale 期，反映出维护团队在基础设施运维上的疏忽。
- **Issue #3391: Pico channel splits multi-line input**
  - **链接:** https://github.com/sipeed/picoclaw/issues/3391
  - **分析:** 用户反馈移动端 TUI 客户端将多行输入（如代码块、诗歌）按换行符拆分为多条消息，破坏了意图完整性。这是典型的交互 Bug，虽评论数不多，但影响日常使用体验。
- **PR #3389 - #3385 (Dependabot updates)**
  - **链接:** https://github.com/sipeed/picoclaw/pulls?q=is%3Apr+is%3Aopen+label%3Adependencies
  - **分析:** 五个依赖更新 PR（Go crypto, Anthropic SDK, MCP SDK, Matrix, LINE Bot）均已开启但处于 stale 状态。用户和社区依赖这些更新来获取安全补丁和新特性（如 Anthropic SDK 升级幅度较大，从 1.55 到 1.74）。

## 5. Bug 与稳定性
**今日报告/关注：**
1.  **[CRITICAL] 官网服务中断 (Issue #3377)**
    -   **描述:** HTTPS 证书过期，`picoclaw.io` 对所有访问者不可用。
    -   **状态:** 未修复，需运维介入。
2.  **[BUG] 异步工具结果路由错误 (PR #3403 提及)**
    -   **描述:** `spawn` 异步工具的结果被当作系统消息发送，并被默认 Agent 截获，导致不同聊天/用户的工具结果混乱。
    -   **状态:** 已有 PR #3403 修复，待合并。
3.  **[BUG] 多 Key 模型配置丢失 (PR #3400 提及)**
    -   **描述:** 保存配置时，多 Key 模型的 `Enabled` 标志和 `api_keys` 未能正确持久化，仅保留第一个 Key。
    -   **状态:** 已有 PR #3400 修复，待合并。
4.  **[BUG] 32-bit ARM 更新包错误 (PR #3399 提及)**
    -   **描述:** `picoclaw update` 在 32-bit ARM 设备上错误下载了 arm64 版本。
    -   **状态:** 已有 PR #3399 修复，待合并。
5.  **[BUG] Deltachat 渠道初始化失败 (Issue #3265 / PR #3376)**
    -   **描述:** 启用 deltachat 时报未知类型错误。
    -   **状态:** 已通过 PR #3376 修复并关闭。

## 6. 功能请求与路线图信号
-   **Agent 执行时间控制 (PR #3414):** 用户/开发者 @racso2609 提出添加 `turn_time_budget_seconds` 配置，防止 Agent 陷入无限工具调用循环。这反映了用户对 Agent 资源控制和响应速度稳定性的强烈需求，可能被纳入下一版本的 Agent 核心功能。
-   **OpenCode Go Provider 支持 (PR #3371):** 添加专用的 `opencode-go` provider，支持 session header。显示了社区对扩展更多 LLM 后端提供商的兴趣。
-   **依赖现代化:** 大量 Dependabot PR 积压，特别是 Anthropic SDK 和 MCP SDK 的大幅版本提升，暗示项目正在推进底层依赖的现代化和安全加固。

## 7. 用户反馈摘要
-   **痛点:** 官网无法访问是近期最大的挫败点（Issue #3377），直接阻碍新用户体验项目。
-   **使用场景:** 用户在移动端（Pico TUI）粘贴多行代码或文本时遇到消息被错误拆分的问题（Issue #3391），影响了编程和长文本输入的流畅性。
-   **满意度:** 对多通道支持（如 Deltachat）的持续修复表示认可（PR #3376）。对 Agent 在不同会话间隔离性和异步结果准确性的修复（PR #3402, #3403）表现出期待，这些是高级用户关注的稳定性关键。

## 8. 待处理积压
**建议维护者优先处理：**
1.  **基础设施:** 立即修复 `picoclaw.io` 的 TLS 证书（Issue #3377）。这是阻塞新用户访问的关键问题。
2.  **核心 Bug 修复:** 合并 PR #3403 和 #3402，以解决 Agent 消息路由和上下文管理的严重 Bug，这对多用户部署的稳定性至关重要。
3.  **依赖更新:** 审核并合并 Dependabot 的 PR (#3385-#3389)，特别是 Anthropic SDK 的升级，以获取安全性和新功能。
4.  **平台适配:** 合并 PR #3399 修复 32-bit ARM 平台的更新包下载错误，确保边缘设备用户的体验。
5.  **特性评估:** 评估 PR #3414 (时间预算) 和 PR #3371 (OpenCode provider) 是否适合进入下一个版本。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期**：2026-10-02
**数据来源**：GitHub (agentscope-ai/QwenPaw)
**分析师**：Agnes (Sapiens AI)

---

## 1. 今日速览

QwenPaw 项目在昨日（2026-10-01）保持了中等活跃度的开源协作状态，共产生 **7 个新 Issue** 和 **9 个 PR**（其中 2 个已合并）。整体健康度良好，但存在两个明显的技术债务信号：一是 DeepSeek 提供商的格式兼容性问题导致会话中断（Issue #8064），二是 CJK 文本渲染的 Markdown 解析边界错误（Issue #8068/#8067）。贡献者 @wxhking 和 @BeiMu-new 表现活跃，分别解决了媒体格式化、空白数据块及路径安全等关键缺陷。无新版本发布，核心功能迭代平稳。

---

## 2. 版本发布

**无新版本发布。**

当前最新稳定版仍为 `2.2.1`（根据 Issue #8073 提及，用户正在测试 `2.2.2.beta4`，但该版本存在已知 UI 访问问题）。

---

## 3. 项目进展

### 已合并/关闭的重要 PR

| PR | 类型 | 作者 | 摘要 | 影响 |
|----|------|------|------|------|
| [#8069](https://github.com/agentscope-ai/QwenPaw/pull/8069) | **Fix** | @wxhking | 限制 DeepSeek 格式器仅接受图像媒体 | 修复了 PDF/Audio 序列化导致的 API 报错 |
| [#8068](https://github.com/agentscope-ai/QwenPaw/pull/8068) | **Fix** | @BeiMu-new | 修复 CJK 强调边界在聊天 Markdown 中的渲染错误 | 改善中日韩文本加粗显示体验 |

**进展分析**：
- **#8069** 直接回应了 #8064 中提到的 DeepSeek provider 问题，通过收窄 `input_types` 避免发送不支持的 `file`/`audio` 部分，是稳定性关键修复。
- **#8068** 解决了 CommonMark 规范与 CJK 语言特性冲突导致的排版崩坏，提升了 Console 端的可读性。

---

## 4. 社区热点

### 高关注度 Issue

1. **[Feature] 新增 ask_user_question 工具 (Human-in-the-Loop)**  
   - **Issue**: [#6274](https://github.com/agentscope-ai/QwenPaw/issues/6274)  
   - **热度**: 👍 1, 评论 3  
   - **分析**: 这是核心的 Agent 控制流增强请求。用户希望 Agent 在遇到模糊或高风险操作时能主动暂停并询问用户，而非猜测执行。此功能将显著提升 Agent 在复杂任务中的可靠性，符合当前 Agentic AI 安全趋势。

2. **[Bug] DeepSeek 发送 PDF 后会话永久损坏**  
   - **Issue**: [#8064](https://github.com/agentscope-ai/QwenPaw/issues/8064)  
   - **热度**: 评论 2  
   - **分析**: 严重性高，影响用户体验闭环。已由 PR #8069 修复，但该 Issue 仍开放，需确认合并后是否彻底解决。

3. **[Feature] Plugin 主题扩展点 (语义 Token 覆盖层)**  
   - **Issue**: [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071)  
   - **热度**: 评论 1  
   - **分析**: 插件开发者对当前单一主题配置不满，希望获得更深层次的 UI 定制能力。这反映了项目生态扩展期对开发者体验（DX）的更高要求。

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 问题描述 | Fix PR |
|----------|-------|----------|--------|
| **🔴 高** | [#8064](https://github.com/agentscope-ai/QwenPaw/issues/8064) | DeepSeek provider 使用 `send_file_to_user` 发送 PDF 后，后续所有请求返回 400 错误，会话状态永久损坏。 | ✅ #8069 (已关闭) |
| **🟠 中** | [#8073](https://github.com/agentscope-ai/QwenPaw/issues/8073) | V2.2.2.beta4 版本在 LAN 其他设备访问时无法打开对话页面（Chat），本地正常。疑似前端路由或 CORS 配置问题。 | ❌ 未知 |
| **🟡 低** | [#8070](https://github.com/agentscope-ai/QwenPaw/issues/8070) | 与 #8064 同源的 DeepSeek 格式器过度接受输入类型问题（PR 形式提出，后被 #8069 替代合并）。 | ✅ #8069 |
| **🟡 低** | [#8065](https://github.com/agentscope-ai/QwenPaw/pull/8065) | Skill 名称未 sanitization，存在路径穿越风险（CodeQL 告警）。 | ✅ #8065 (Open, 待合并) |

**稳定性评估**：今日修复了影响多模态交互的关键 Bug，但 Beta 版本的跨设备访问问题需要关注。

---

## 6. 功能请求与路线图信号

1. **Advisor Mode (双模型协作模式)**  
   - **PR**: [#7569](https://github.com/agentscope-ai/QwenPaw/pull/7569)  
   - **状态**: Open, Size XXXL  
   - **判断**：这是一个重大的功能架构变更，引入“顾问+执行者”双模型工作流。虽规模巨大，但契合高阶 Agent 编排需求，极可能被纳入下一主版本（v2.3+）路线图。

2. **ask_user_question 工具**  
   - **Issue**: [#6274](https://github.com/agentscope-ai/QwenPaw/issues/6274)  
   - **判断**：Human-in-the-Loop 是 Agent 落地的关键能力，社区呼声较高，有望作为核心工具集更新进入近期迭代。

3. **Plugin 主题系统增强**  
   - **Issue**: [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071)  
   - **判断**：随着插件生态发展，对主题定制化的需求是必然趋势，建议维护者评估是否引入 CSS Variable 或 Token 层扩展。

4. **Codex SDK 更新**  
   - **Issue**: [#8075](https://github.com/agentscope-ai/QwenPaw/issues/8075)  
   - **判断**：依赖更新，确保模型发现兼容性，属于常规维护，易于合并。

---

## 7. 用户反馈摘要

- **痛点**：
  - **多模态兼容性**：用户在使用 DeepSeek 进行文件（PDF）传输时遇到会话崩溃，反映多模型提供商差异 handling 不足。
  - **CJK 渲染体验**：中文用户在 Markdown 加粗渲染中频繁遇到标点符号被包裹进强调标记的问题，影响阅读体验。
  - **Beta 版稳定性**：V2.2.2.beta4 在局域网跨设备访问时出现页面打不开的问题，表明前端构建或服务器绑定配置存在缺陷。

- **满意点**：
  - **后台任务通知**：用户赞赏后台任务完成后唤醒父会话的功能（PR #8063），提升了异步工作流的感知能力。
  - **空白媒体处理**：自动丢弃空数据 URI 图像的逻辑（PR #8066）解决了无副作用的 API 错误，体现了细节优化。

---

## 8. 待处理积压

| ID | 类型 | 标题 | 建议 |
|----|------|------|------|
| [#8076](https://github.com/agentscope-ai/QwenPaw/issues/8076) | Bug | reload 时 drain timeout 到期后未通知房间且取消进行中轮次 | **高优**：涉及内存泄漏和用户体验，当前静默放弃策略不佳，建议优先修复。 |
| [#8063](https://github.com/agentscope-ai/QwenPaw/pull/8063) | Feat | 后台任务完成时唤醒父代理会话 | **待合并**：功能价值明确，代码量小，应尽快合入以改善异步体验。 |
| [#8073](https://github.com/agentscope-ai/QwenPaw/issues/8073) | Bug | V2.2.2.beta4 对话页面 LAN 访问失败 | **高优**：阻塞 Beta 推广，需前端团队排查路由或静态资源服务配置。 |
| [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) | Feature | Plugin 主题扩展点 | **中期**：需求合理，但实现复杂度较高，可纳入后续版本规划。 |

---

**总结**：QwenPaw 在 2026-10-01 展现了良好的社区响应速度，特别是在多模型兼容性（DeepSeek）和国际化（CJK 渲染）方面取得了实质进展。建议维护者优先处理 #8076 和 #8073 以提升系统稳定性和 Beta 版可用性。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：2026-10-02 | 数据来源：github.com/NousResearch/hermes-agent**

---

## 1. 今日速览

hermes-agent 今日保持**高强度活跃**：过去24小时新增/更新 Issues 500条（新开354，关闭146），PR 500条（待合并400，已合并100），无新版本发布但合并流量显著。社区关注点集中在**Desktop端稳定性**（会话渲染重复、右键菜单劫持、GPU初始化回退）和**远程/VPS连接**（Origin检查、WebSocket断连）两大方向；两条独立修复PR（#131063、#131058）同日提交，显示维护者正并行推进多个风险点。**项目整体健康度良好**，P1级问题（#130277、#70445）有明确PR跟进，但`mode: off` YAML 1.1布尔 coercion 历史bug（#131040/#131035）已被合并却引发二次讨论，值得关注回归风险。

---

## 2. 版本发布

> 今日无新 Release。

---

## 3. 项目进展

### 今日重点合并/关闭的 PR

| PR | 类型 | 说明 | 关联 Issue |
|----|------|------|------------|
| [#131063](https://github.com/NousResearch/hermes-agent/pull/131063) | fix(agent) | 修复 all-provider `chatcmpl-tool-*` 并行批处理重放被拒问题，引入 request-time repair + normalization | fixes #130363 |
| [#131058](https://github.com/NousResearch/hermes-agent/pull/131058) | fix(desktop) | Electron single-instance lock 获取顺序修复，防止沙箱回退写入污染 | — |
| [#131035](https://github.com/NousResearch/hermes-agent/pull/131035) ✅ 已关闭 | fix(plugins) | `mode: off` 操作符回滚在 PyYAML 1.1 未引用 `off` 时被 coerce 为布尔 `False` 的 bug | — |
| [#131040](https://github.com/NousResearch/hermes-agent/pull/131040) ✅ 已关闭 | fix(plugins) | 同 #131035 的第二候选修复（cherry-pick/重审） | — |
| [#130888](https://github.com/NousResearch/hermes-agent/pull/130888) | fix(desktop) | 修复远程 Gateway 的 WebSocket Origin 拒绝问题（packaged renderer 从 `file://` 切回正确 Origin） | — |
| [#130996](https://github.com/NousResearch/hermes-agent/pull/130996) | fix(desktop) | preview tabs 作用域修正（re-land #128552，修复 #73890 回归） | fixes #73890 |

**进展评估**：今日100条PR已合并/关闭，其中6条为核心修复，直接回应了 #130277（远程Gateway Origin）、#128552（preview tabs 回归）、#130363（tool replay）三个已知痛点。项目向前推进约 **3个主要风险点得到缓解**。

---

## 4. 社区热点

### 评论数最多 / 反应最热的 Issues

| Issue | 状态 | 评论 | 👍 | 热度来源 |
|-------|------|------|-----|----------|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) — Let Bots collaborate across gateways | OPEN | 30 | 4 | 跨 Gateway Bot 协作需求长期积压，维护者 Teknium 已 defer 至 Group Chat 稳定后 |
| [#127647](https://github.com/NousResearch/hermes-agent/issues/127647) — Desktop idle resource burn | OPEN | 26 | 0 | renderer CPU/GPU 空闲损耗，影响桌面端能效感知 |
| [#97065](https://github.com/NousResearch/hermes-agent/issues/97065) — Keet gateway setup crashes | OPEN | 25 | 0 | Windows 11 + Node v24 + keet-platform 组合复现，P2 级崩溃 |
| [#18715](https://github.com/NousResearch/hermes-agent/issues/18715) — Support remote Hermes agent with local tool execution | OPEN | 21 | **36** | 👍最高！远程 Agent + 本地工具执行架构需求，36人支持 |
| [#127665](https://github.com/NousResearch/hermes-agent/issues/127665) — Desktop renders one reply twice | OPEN | 21 | 0 | #127288 的同类症状但不同 fold，已确认 #127282 修复后仍复现 |
| [#70445](https://github.com/NousResearch/hermes-agent/issues/70445) — Desktop remote/VPS session load slow | OPEN | 7 | 2 | VPS 场景下会话加载>20秒、离开聊天后取消、spinner 无限旋转 |

**热点分析**：
- **#18715**（36👍）是今日社区呼声最高的功能请求，反映用户希望"云端大脑+本地手脚"的混合部署模式，与 #131063（tool replay repair）形成呼应——说明 tool execution 的可信回放是远程场景的前置条件。
- **#97681**（30评论）和 **#127647**（26评论）均为长期开放的高讨论 Issue，前者涉及架构级跨 Gateway 协作，后者是桌面端性能顽疾，两者均暂无明确合并时间表。
- **#127665** 是 #127288 的"同类症状不同路径"案例，提示 Desktop 渲染层可能存在系统性 reconciliation bug。

---

## 5. Bug 与稳定性

### P1 级（影响核心功能/安全边界）

| Issue | 描述 | Fix PR | 状态 |
|-------|------|--------|------|
| [#130277](https://github.com/NousResearch/hermes-agent/issues/130277) | Desktop 自 #127201 后无法连接远程 Gateway（loopback Origin 被拒） | [#130888](https://github.com/NousResearch/hermes-agent/pull/130888) ✅ open | 修复中 |
| [#70445](https://github.com/NousResearch/hermes-agent/issues/70445) | VPS 远程会话加载慢/取消/spinner 无限旋转 | — | 待处理 |
| [#122529](https://github.com/NousResearch/hermes-agent/issues/122529) | cron external worker 缺失 venv site-packages（`ruamel` 导入失败） | — | 待处理 |

### P2 级（影响主要功能）

| Issue | 描述 | Fix PR | 状态 |
|-------|------|--------|------|
| [#127665](https://github.com/NousResearch/hermes-agent/issues/127665) | Desktop 同一回复渲染两次（#127288 同类不同 fold） | — | 待处理 |
| [#127313](https://github.com/NousResearch/hermes-agent/issues/127313) | 右键 pane-body zone 菜单劫持 transcript 上下文菜单（regression from ad2d4822e1） | — | 待处理 |
| [#97065](https://github.com/NousResearch/hermes-agent/issues/97065) | Keet gateway setup TypeError（Windows 11 + Node v24） | — | 待处理 |
| [#99032](https://github.com/NousResearch/hermes-agent/issues/99032) | TUI submit 静默发送 `[[N lines]]` 占位符到模型（paste token 缺失时无警告） | — | 待处理 |
| [#96180](https://github.com/NousResearch/hermes-agent/issues/96180) | `hermes update` 重建 venv 后丢失 `python-telegram-bot` → cron 投递静默失败 | — | 待处理 |
| [#69889](https://github.com/NousResearch/hermes-agent/issues/69889) | Cron `.py` 脚本 job 在 Hermes venv 重建后失效（用户 pip 包丢失） | — | 待处理 |
| [#46082](https://github.com/NousResearch/hermes-agent/issues/46082) | Dashboard 内存泄漏（增长至 5.2GB，OOM killed） | — | 待处理 |
| [#126091](https://github.com/NousResearch/hermes-agent/issues/126091) | 长会话中消息重复 + 位置跳变（WebSocket reconnect 后 renderer 状态 reconcilation bug） | — | 待处理 |

### P3 级（体验/边缘场景）

| Issue | 描述 | Fix PR | 状态 |
|-------|------|--------|------|
| [#103410](https://github.com/NousResearch/hermes-agent/issues/103410) | TUI live compression hot-reload 崩溃（LCMEngine 缺少 `_coerce_threshold_tokens_cap` 属性） | — | 待处理 |
| [#108335](https://github.com/NousResearch/hermes-agent/issues/108335) | 1Password browser-vault fill 缺失 `--vault` 参数（service-account 认证场景） | — | 待处理 |
| [#20866](https://github.com/NousResearch/hermes-agent/issues/20866) ✅ 已关闭 | Qwen3.6-27B auxiliary tasks 400 format_error（"System message must be at beginning"） | — | 已关闭 |
| [#106596](https://github.com/NousResearch/hermes-agent/issues/106596) ✅ 已关闭 | YouTube embed 错误 153（Desktop app） | — | 已关闭 |

**稳定性总结**：今日新增/活跃 Bug 共 **18个**，其中 P1×2、P2×8、P3×8。有明确 Fix PR 的仅 3 个（#130277、#131063 关联 #130363、#130996 关联 #73890），**修复覆盖率约 17%**。Desktop 渲染层（#127665、#127313、#126091）和 cron/venv 稳定性（#122529、#69889、#96180）是两大薄弱环节。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 👍 | 关联 PR | 纳入下版本可能性 |
|------|-------|-----|---------|------------------|
| 远程 Agent + 本地工具执行 | [#18715](https://github.com/NousResearch/hermes-agent/issues/18715) | 36 | #131063 (tool replay) | ⭐⭐⭐ 高（#131063 已合并铺路） |
| 跨 Gateway Bot 协作 | [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | 4 | — | ⭐⭐ 中（defer 至 Group Chat 稳定） |
| 本地 action receipts（可观测性） | [#102082](https://github.com/NousResearch/hermes-agent/pull/102082) | — | PR open | ⭐⭐⭐ 高（PR 已提交，SQLite ledger） |
| Durable authority primitives | [#102085](https://github.com/NousResearch/hermes-agent/pull/102085) | — | PR open | ⭐⭐ 中（#95028 umbrella 下一 shard） |
| Dashboard 中文本地化 + 模型路由控制 | [#130634](https://github.com/NousResearch/hermes-agent/pull/130634) | — | PR open | ⭐⭐⭐ 高（社区贡献，功能完整） |
| `--run-budget` 截止时真正停止模型而非仅沉默 | [#127780](https://github.com/NousResearch/hermes-agent/pull/127780) | — | PR open | ⭐⭐⭐ 高（P2 bug fix，逻辑清晰） |
| Windows 便携/隔离部署支持 | [#46199](https://github.com/NousResearch/hermes-agent/issues/46199) ✅ 已关闭 | 4 | — | 已关闭（可能以 docs 形式响应） |

**路线图信号**：今日合并的 #131063（tool replay repair）和 open 的 #102082（action receipts）+ #102085（authority primitives）形成一条"**可观测+可信执行**"的技术栈，暗示下一版本可能围绕 agent 执行的审计/幂等能力做系统级升级。#130634（Dashboard 中文本地化）作为社区 PR 质量较高，预计快速合并。

---

## 7. 用户反馈摘要

### 真实痛点（来自 Issue 描述和评论）

1. **"远程/VPS 场景下会话加载极不可靠"**（#70445，7评论，2👍）
   - 用户反馈：加载 >20秒、切换离开聊天后 hydration 取消、spinner 无限旋转、内容闪现后卡死
   - 场景：使用 VPS 部署 Hermes backend，本地 Desktop 连接

2. **"Keet gateway setup 在 Windows 11 + Node v24 上直接崩溃"**（#97065，25评论）
   - 用户反馈：运行 `hermes gateway setup` 选择 "7. Keet" 后抛出 `TypeError: _n() missing required argument 'config'`
   - 场景：Windows 开发者尝试配置 Keet 平台集成

3. **"Desktop 右键菜单劫持导致 transcript 无法复制"**（#127313，12评论）
   - 用户反馈：`ad2d4822e1` 引入的 pane-body zone 右键菜单覆盖了应用级上下文菜单，transcript 文本选择和复制失效
   - 场景：日常聊天中需要复制对话内容

4. **"Hermes update 后 cron Telegram 投递静默失败"**（#96180，7评论）
   - 用户反馈：`hermes update` 报告成功但 cron 定时任务向 Telegram 投递时抛出 `RuntimeError: python-telegram-bot not installed`
   - 痛点：更新流程破坏了已有配置，且错误不显著

5. **"YouTube embed 在 Desktop 内报错 153"**（#106596）✅ 已关闭
   - 用户反馈：6个不同公开视频均报 "Error 153 - Video player configuration error"，普通浏览器可正常播放
   - 评价：已修复，用户满意度高

6. **"1Password service-account 填充密码失败"**（#108335，5评论）
   - 用户反馈：`op item get` 未传 `--vault` 参数导致填充失败
   - 场景：CI/自动化场景使用 service-account 认证

### 用户满意点

- **#46199**（Windows 便携部署）✅ 已关闭，4👍：用户感谢维护者回应部署灵活性需求
- **#106596**（YouTube embed）✅ 已关闭：修复速度快，用户认可
- **#38072**（a11y 无障碍）✅ 已关闭，2👍：axe-core 审计发现 121 个可访问名称已暴露，用户肯定进步

---

## 8. 待处理积压

### 长期未响应的重要 Issue（>30天无合并进展）

| Issue | 创建时间 | 天数 | 严重程度 | 建议优先级 |
|-------|----------|------|----------|------------|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) — 跨 Gateway Bot 协作 | 2026-08-29 | 34天 | P3（feature） | ⭐⭐ 中（维护者已 defer） |
| [#127647](https://github.com/NousResearch/hermes-agent/issues/127647) — Desktop 空闲资源消耗 | 2026-09-29 | 3天 | P2（perf） | ⭐⭐⭐ 高（新建但影响能效） |
| [#122529](https://github.com/NousResearch/hermes-agent/issues/122529) — cron worker 缺失 venv | 2026-09-25 | 7天 | P1（bug） | ⭐⭐⭐ 高（有用户受影响） |
| [#69889](https://github.com/NousResearch/hermes-agent/issues/69889) — Cron job venv 重建后失效 | 2026-07-23 | 71天 | P2（bug） | ⭐⭐⭐ 高（长期未解决） |
| [#46082](https://github.com/NousResearch/hermes-agent/issues/46082) — Dashboard 内存泄漏 5.2GB | 2026-06-14 | 110天 | P2（bug） | ⭐⭐⭐ 高（生产环境 OOM 风险） |
| [#78637](https://github.com/NousResearch/hermes-agent/issues/78637) — auth.py god-file 拆分 | 2026-08-04 | 59天 | P3（refactor） | ⭐⭐ 中（架构技术债） |
| [#95459](https://github.com/NousResearch/hermes-agent/issues/95459) ✅ 已关闭 — in-app browser 重启后拒绝 agent actions | 2026-08-26 | 37天 | P2 | 已关闭 |

### 关键提醒

1. **#69889**（71天）和 **#46082**（110天）是两个**超长积压的 P2 级问题**，前者影响 cron 任务可靠性，后者存在生产环境 OOM 风险，建议维护者优先处理。
2. **#122529**（7天）和 **#127647**（3天）是**新建但影响面大**的问题，前者导致 cron 外部 worker 启动失败，后者是桌面端能效顽疾，均值得快速响应。
3. **#97681** 虽为 P3 feature 且已 defer，但30条评论显示社区高度关注，建议在 Group Chat 稳定后尽快重新评估。

---

**日报生成时间：2026-10-02 | 分析师：Agnes (Sapiens AI)**

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-10-02

## 1. 今日速览

AstrBot 在过去 24 小时内发布了 **v4.29.0-beta.1**，同步推进了 10 个已合并/关闭的 PR，主要集中在 Dashboard UI 重构、配置体系优化和消息发送稳定性修复。社区活跃度较高：新增 11 个 Issues（其中 9 个活跃讨论），16 条 PR 更新。整体项目处于健康的迭代节奏中，但子代理路由逻辑存在一个需关注的稳定 **性 Bug**（#10298）。

## 2. 版本发布

### v4.29.0-beta.1（2026-10-01）
**链接**: https://github.com/AstrBotDevs/AstrBot/releases/tag/v4.29.0-beta.1

**重要新增**：
- **Computer Use 沙箱支持**：新增操作系统级本地执行环境沙箱（macOS Seatbelt / Linux 对应方案）
- **Per-session model memory**：聊天会话级别的 LLM 模型记忆功能，基于 localStorage 持久化（PR #10301）
- **Dashboard 侧边栏重组**：按 System / Extensions 分组，支持折叠/固定；插件 Pages 更名为 **Views**（PR #10307）
- **配置测试按钮颜色对齐**：修复 "测试当前配置" 按钮颜色与主题主色不一致问题（PR #10309）

**破坏性变更 / 迁移注意**：
- 无重大破坏性变更，但 `t2i` 设置已从平台级移至 Config Profile → Extension Features，升级后需重新检查相关配置
- DeepWiki badge 已替换为 shields.io，README 中的 `<img>` href 属性修复（PR #10299）

## 3. 项目进展

**今日已合并/关闭的重要 PR**：

| PR | 类型 | 描述 | 链接 |
|----|------|------|------|
| #10302 | chore | 版本 bump 至 4.29.0-beta.1 | [链接](https://github.com/AstrBotDevs/AstrBot/pull/10302) |
| #10310 | feat | 侧边抽屉编辑配置 Profile | [链接](https://github.com/AstrBotDevs/AstrBot/pull/10310) |
| #10309 | fix | 测试按钮颜色对齐 | [链接](https://github.com/AstrBotDevs/AstrBot/pull/10309) |
| #10307 | feat | 侧边栏分组 + Pages→Views 重命名 | [链接](https://github.com/AstrBotDevs/AstrBot/pull/10307) |
| #10306 | feat | t2i 配置移至 Extension Group | [链接](https://github.com/AstrBotDevs/AstrBot/pull/10306) |
| #10304 | feat | 版本号移至侧边栏底部 | [链接](https://github.com/AstrBotDevs/AstrBot/pull/10304) |
| #10299 | fix | DeepWiki badge → shields.io | [链接](https://github.com/AstrBotDevs/AstrBot/pull/10299) |
| #10301 | feat | Per-session model memory | [链接](https://github.com/AstrBotDevs/AstrBot/pull/10301) |
| #10290 | fix | README badge 链接修复 | [链接](https://github.com/AstrBotDevs/AstrBot/pull/10290) |
| #10067 | fix | QQ 官方机器人 C2C 流式回复回滚修复 | [链接](https://github.com/AstrBotDevs/AstrBot/pull/10067) |

项目整体向前推进：Dashboard 体验大幅优化、配置管理更清晰、消息发送稳定性改善。

## 4. 社区热点

**最活跃讨论的 Issues**：

1. **#10298** - v4.28.2 子代理任务完成后主 Agent 不生成最终回复（**7 条评论**）  
   用户 @SX0YYYY 报告：在 router 模式下，子代理（运维类 + 联网搜索类）执行完成后，主 Agent 的 respond 阶段消息为空被跳过。  
   👉 https://github.com/AstrBotDevs/AstrBot/issues/10298

2. **#10305** - 重启界卡顿（**6 条评论**）  
   用户 @mjy1113451 反馈：界面卡住无响应，等待数分钟。  
   👉 https://github.com/AstrBotDevs/AstrBot/issues/10305

3. **#10303** - fix(agent): ask once for the final answer when a run would end empty（**PR**）  
   作者 @he-yufeng 提出：当 run 结束时没有 tool calls 且没有用户可见内容，runner 应提示一次最终答案，避免静默跳过。  
   👉 https://github.com/AstrBotDevs/AstrBot/pull/10303

**热点分析**：
- **子代理路由逻辑**是近期高频痛点（#10298、#10303），与 beta.1 中的 Computer Use 新增功能可能有关联，需关注维护者响应。
- **Web UI 交互稳定性**（#10305、#10312、#10316）反映用户对 Dashboard 体验期望提升，今日已合并多个 UI 优化 PR 表明维护者正在积极回应。

## 5. Bug 与稳定性

| 严重级别 | Issue / PR | 描述 | 状态 | 链接 |
|----------|-----------|------|------|------|
| 🔴 高 | #10298 | 子代理完成后主 Agent respond 阶段被跳过，消息为空 | OPEN, 7 评论 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10298) |
| 🟠 中 | #10305 | 重启界面卡顿数分钟无响应 | OPEN, 6 评论 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10305) |
| 🟠 中 | #10312 | Web UI 自定义侧边栏拖拽失效，出现两个空模块 | OPEN, 1 评论 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10312) |
| 🟡 低 | #10316 | WebChat 聊天偏好（流式输出、思考内容、快捷键）刷新后重置 | OPEN, 1 评论 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10316) |
| 🟡 低 | #10308 | 引用消息异常日志刷屏 | OPEN, 4 评论 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10308) |

**已有 fix PR 的 Bug**：
- #10067 已合并（QQ C2C 流式回复回滚）
- #10303 待合并（空 run 结束时的最终答案提示）
- #10297 待合并（跳过分隔符工具前缀）

## 6. 功能请求与路线图信号

| Issue / PR | 需求描述 | 信号强度 | 链接 |
|-----------|---------|---------|------|
| #10295 | STT/TTS 提供商增加 Mossland API 支持 | 中 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10295) |
| #10317 | OpenAI whisper-1 将于 2027-02-26 停用，询问迁移方案 | 高（外部依赖风险） | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10317) |
| #9795 | 手动上下文压缩（`/compact` 命令 + 实验性设置） | 中（功能实验） | [链接](https://github.com/AstrBotDevs/AstrBot/pull/9795) |
| #10207 | 插件配置管理文件中的图片可预览 | 低 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10207) |
| #10283 | 询问是否支持 OneBot 12 | 已关闭（回答） | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10283) |

**路线图判断**：
- **whisper-1 迁移**（#10317）是紧急的外部依赖风险，需在 2027-02 前完成适配。
- **手动上下文压缩**（#9795）作为实验性功能已提交 PR，可能被纳入下一正式版。
- **Mossland STT/TTS**（#10295）呼声不高但符合插件化扩展趋势。

## 7. 用户反馈摘要

**真实痛点**：
1. **子代理路由断链**：用户配置了 2 个子代理（运维 + 联网搜索），主 Agent 以 router 模式工作，但子代理任务完成后主 Agent 不回复。  
   👉 "@SX0YYYY: 主 Agent 不生成最终回复，respond 阶段消息为空被跳过"

2. **Web UI 持久化不一致**：同一设置菜单中，SSE/WebSocket 传输方式能保留选择，但流式输出、思考内容、快捷键却不行。  
   👉 "@C10H14N2O5: 这些设置集中在同一菜单中，却采用不同的持久化策略，使用上略显反直觉"

3. **重启卡顿影响生产使用**：腾讯云 CVM 4C4G 环境下，界面重启时无响应，用户等待数分钟。  
   👉 "@mjy1113451: 一直在重启无反应，等待了好几分钟"

**满意点**：
- 新版本 v4.29.0-beta.1 的 Computer Use 沙箱支持获得关注
- Dashboard 侧边栏重组、Views 重命名等 UI 优化被用户认可
- Per-session model memory 功能符合多会话管理场景需求

## 8. 待处理积压

| Issue / PR | 积压原因 | 建议优先级 | 链接 |
|-----------|---------|-----------|------|
| #10298 | 子代理路由 Bug，7 评论无维护者回复 | 🔴 紧急 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10298) |
| #10305 | 重启卡顿，6 评论无回复 | 🟠 高 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10305) |
| #10312 | Web UI 侧边栏拖拽失效 | 🟠 高 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10312) |
| #9795 | 手动上下文压缩 PR，2 个月未合并 | 🟡 中 | [链接](https://github.com/AstrBotDevs/AstrBot/pull/9795) |
| #10317 | whisper-1 停用通知，需规划迁移 | 🟠 高 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10317) |
| #10295 | Mossland STT/TTS 支持请求 | 🟡 低 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10295) |

---

**项目健康度评估**：🟢 良好  
- 发布节奏稳定（beta 版本按时推出）
- UI/配置体系持续优化
- 社区反馈活跃但部分关键 Bug 需加快响应

**建议维护者关注**：#10298（子代理路由）、#10317（whisper-1 迁移）

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：2026-10-02** | 数据周期：过去 24 小时 | 来源：GitHub Discussions

---

## 1. 今日速览

DeepSeek Harness 社区在过去 24 小时内保持**高活跃度**，共新增 161 条 Discussion，反映用户对产品功能完善与系统稳定性的高度关注。当前版本 `0.2.0-rc.2` 在 Windows 端暴露出多处严重问题，集中在 **ACL 沙箱权限初始化失败**、**命令行执行异常**（退出码 `0xC0000142`）及**上下文窗口自动压缩未触发**等核心体验环节。Linux 平台支持仍滞后于 WorkBuddy 与 Qoder，用户反馈"只好用 WorkBuddy 和 Woder 勉强度日"。无新版本发布，但多个关键 Bug 已获得社区临时绕过方案，项目整体向前推进中等程度。

---

## 2. 版本发布

**无新版本发布**（当前最新：`0.2.0-rc.2`）。

根据 Discussions 中用户反馈与 changelog 模式推断，本次候选版本合并上线的功能与修复的问题包括：

| 版本号 | 合并内容 | 备注 |
|--------|----------|------|
| `0.2.0-rc.2` | Windows ACL 沙箱后端 `@deepseek-ai/dsh-sandbox-windows-acl` 提供 | 新增文件策略：`workspace-write` |
| `0.1.7-rc1` | 上下文窗口 auto-compaction 逻辑修复 | 未完全生效，见 #7650 |

**破坏性变更**：无。

**迁移注意事项**：Windows 用户工作区位于非系统盘时，需确保 `grantWrite` 权限正确配置，避免 ACL 初始化失败（见 #7804）。

---

## 3. 项目进展

无新 PR 合并（该项目未启用 GitHub Issues/PR）。根据 Discussions 素材推断，以下功能或修复正在推进中：

| 方向 | 进度 | 关联 Discussion |
|------|------|-----------------|
| Windows ACL 沙箱权限模型修复 | 社区临时绕过方案已出现 | #7804, #8485 |
| 上下文窗口自动压缩逻辑 | 待修复，用户报告未触发 | #7650 |
| MCP 服务器按需加载插件 | 社区展示功能需求 | #7740 |
| 自定义服务商思考等级控件 | 设计上故意不暴露，待决策 | #6558 |

**项目整体向前推进中等程度**：关键 Bug 已获得社区临时绕过方案，但核心体验问题尚未修复。

---

## 4. 社区热点

今日讨论最活跃、评论最多、反应最多的 Discussions：

### 🔴 高优先级：Windows 沙箱权限初始化失败
- **#7804** Windows 工作区位于非系统盘时 ACL 沙箱必然初始化失败（`0xC0000142`） | 5 评论 | [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/7804)
- **#8485** DSH Windows ACL sandbox: two defects make `workspace-write` unusable | 4 评论 | [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/8485)
- **#8376** Windows 沙箱下 pwsh 全命令 0xC0000142 | 4 评论 | [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/8376)

**背后诉求**：Windows 用户无法正常使用官方桌面客户端，命令行执行固定返回 `0xC0000142`，临时绕过方案为切换为**完全权限**（Full access）。

### 🟡 中优先级：上下文窗口自动压缩未触发
- **#7650** Reaching context window 100% and not triggering auto-compaction | 6 评论 | [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/7650)

**背后诉求**：`0.1.7-rc1` 版本 auto-compaction 逻辑未生效，用户配置 80k 上下文窗口但系统未自动压缩。

### 🟢 低优先级：Linux 平台支持滞后
- **#8107** linux总是被遗忘... | 18 评论 | [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/8107)

**背后诉求**：用户反馈豆包和 DeepSeek 都没支持 Linux，只好用 WorkBuddy 和 Woder 勉强度日。

---

## 5. Bug 与稳定性

今日报告的 Bug、崩溃、回归问题，按严重程度排列：

| 严重程度 | Bug 描述 | 关联 Discussion | Fix PR |
|----------|----------|-----------------|--------|
| 🔴 Critical | Windows ACL 沙箱初始化失败，`workspace-write` 不可用 | #7804, #8485 | 无 |
| 🔴 Critical | 命令行执行返回 `0xC0000142`，无输出 | #8376, #8395 | 无 |
| 🟡 High | 上下文窗口 100% 未触发 auto-compaction | #7650 | 无 |
| 🟡 High | 欢迎弹窗确认动作走特权 RPC 导致 403 锁死 | #860 | 无 |
| 🟢 Medium | NixOS 上 HMR 服务启动失败 | #690 | 无 |
| 🟢 Medium | 自定义服务商思考等级控件不暴露 | #6558 | 无 |
| 🟢 Low | 深度求索中卡死无输出 | #8601 | 无 |

**已有临时绕过方案**：Windows 用户切换为**完全权限**可暂时恢复正常（#8376）。

---

## 6. 功能请求与路线图信号

用户提出的新功能需求，结合已有 Discussion 判断可能被纳入下一版本：

| 功能请求 | 诉求强度 | 关联 Discussion | 纳入可能性 |
|----------|----------|-----------------|------------|
| MCP 服务器按需加载插件 | 高 | #7740 | 可能 |
| Linux 平台原生支持 | 高 | #8107 | 待定 |
| 上下文窗口自动压缩修复 | 高 | #7650 | 可能 |
| 自定义服务商思考等级控件 | 中 | #6558 | 待定 |
| Windows ACL 沙箱修复 | 高 | #7804, #8485 | 可能 |

**路线图信号**：社区对 **MCP 管理插件化**与**Windows 沙箱稳定性**需求强烈，可能被纳入 `0.2.0` 正式版。

---

## 7. 用户反馈摘要

从 Discussions 评论中提炼真实用户痛点、使用场景、满意/不满意的地方：

### 痛点
- **Windows 用户体验严重受损**：`0xC0000142` 错误导致命令行执行完全失败，用户被迫使用临时绕过方案（完全权限）。
- **上下文窗口自动压缩未生效**：用户配置 80k 窗口但系统未自动压缩，影响长对话体验。
- **Linux 平台支持滞后**：用户反馈"豆包和 deepseek 都没支持，只好用 workbuddy 和 woder 勉强度日"。

### 满意
- **MCP 管理插件化需求强烈**：用户希望按需加载工具，减少上下文浪费（#7740）。
- **社区临时绕过方案有效**：切换为完全权限可暂时恢复 Windows 功能。

### 不满意
- **欢迎弹窗确认动作走特权 RPC 导致 403 锁死**：用户被永久锁定，无法关闭弹窗（#860）。
- **NixOS 上 HMR 服务启动失败**：`--expose-internals is required` 错误（#690）。

---

## 8. 待处理积压

长期未响应的重要 Issue 或 PR，提醒维护者关注：

| 优先级 | 问题 | 创建时间 | 评论数 | 关联 Discussion |
|--------|------|----------|--------|-----------------|
| 🔴 Critical | Windows ACL 沙箱初始化失败 | 2026-09-24 | 5 | #7804 |
| 🔴 Critical | 命令行执行 `0xC0000142` 错误 | 2026-09-30 | 4 | #8376 |
| 🟡 High | 上下文窗口 auto-compaction 未触发 | 2026-09-23 | 6 | #7650 |
| 🟡 High | 欢迎弹窗 403 锁死 | 2026-08-14 | 6 | #860 |
| 🟢 Medium | NixOS HMR 服务启动失败 | 2026-08-14 | 8 | #690 |

**建议维护者关注**：Windows 端 Critical Bug 已影响核心用户体验，需优先修复。

---

**报告生成时间**：2026-10-02 | **数据来源**：GitHub Discussions (deepseek-ai/deepseek-harness)

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*