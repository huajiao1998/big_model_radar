# OpenClaw 生态日报 2026-10-23

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-23 00:14 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 (2026-10-23)

### 1. 今日速览
今日 OpenClaw 项目保持极高的活跃度，过去 24 小时共有 1000 条 Issues 和 PR 更新，其中 84 条 Issue 处于活跃状态，214 个 PR 等待合并。项目发布了 **v2026.10.6** 紧急安全补丁版本，强制要求升级 Node.js 运行环境以修复 TLS 证书链漏洞。开发者团队重点投入于 Web UI 性能优化（懒加载）以及 Gateway 状态一致性的修复，同时也面临多个关于多代理路由、会话恢复及鉴权边界的 P0/P1 级稳定性挑战。

### 2. 版本发布
**v2026.10.6 发布** (紧急安全更新)
*   **核心变更**：强制执行 Node.js 运行时版本升级至 24.22.1+ (24系) 或 26.12.1+ (26系)。
*   **安全背景**：修复针对 2026 年 10 月 Node.js 安全发布的响应，拒绝被破坏的证书密钥签名的 TLS 链。
*   **迁移注意**：Docker 镜像已更新至包含 Node 24.2，但用户需检查本地环境及 CI/CD 流水线，确保 Node 版本满足最低要求，否则服务将启动失败。

### 3. 项目进展
*   **安全加固**：团队正在积极向后移植安全修复，包括向 2026.9.33 分支回滚 Node 运行时补丁 ([#181073](https://github.com/openclaw/openclaw/pull/181073)) 和 2026.10.6 分支 ([#181072](https://github.com/openclaw/openclaw/pull/181072))，确保存量用户的安全性。
*   **性能优化**：Web UI 团队（以 @steipete 为主）正在推进多项懒加载优化，包括推迟表情目录加载 ([#181068](https://github.com/openclaw/openclaw/pull/181068))、在线侧边栏渲染 ([#181059](https://github.com/openclaw/openclaw/pull/181059)) 以及语音转写捕获 ([#181077](https://github.com/openclaw/openclaw/pull/181077))，显著降低了 Chat 启动时的传输字节数。
*   **稳定性修复**：修复了 Gateway 重启后 Goal 中断的问题 ([#181102](https://github.com/openclaw/openclaw/pull/181102))，以及修复 Linux 非 ASCII 挂载点路径解码错误 ([#181103](https://github.com/openclaw/openclaw/pull/181103))。

### 4. 社区热点
*   **内存安全与信任**：[#7707](https://github.com/openclaw/openclaw/issues/7707) 提出了通过来源标记（Tagging）来隔离不可信内容（如网页抓取）的建议，旨在防止内存投毒攻击，社区对该安全边界问题关注度较高。
*   **多代理稳定性**：[#43367](https://github.com/openclaw/openclaw/issues/43367) 描述了多代理并发编排时的配置覆盖与会话锁失败问题，反映了高级用户在复杂场景下的痛点。
*   **密钥保护**：[#11829](https://github.com/openclaw/openclaw/issues/11829) 讨论了如何防止 API Keys 泄露给 LLM 或被嵌入 Prompt，提出了分层保护策略。

### 5. Bug 与稳定性
*   **P0 - 崩溃恢复失败**：[#166634](https://github.com/openclaw/openclaw/issues/166634) 报告 Gateway 非正常终止后，后台代理因 `SQLite session reclamation commit checkpoint expired` 而永久不可用。目前该 Issue 处于 Open 状态，需关注是否有后续修复 PR。
*   **P1 - 状态泄漏**：[#172837](https://github.com/openclaw/openclaw/issues/172837) 指出 Codex 子代理在交付失败后，其 `nativeSubagentAssignments` 未被清除，导致父线程不断重发，造成状态污染。
*   **P1 - 运行时发布失败**：[#158127](https://github.com/openclaw/openclaw/issues/158127) 显示多代理环境升级至 2026.9.6 后，Codex 代理的模型运行时发布 intermittently 失败，影响消息接收。

### 6. 功能请求与路线图信号
*   **会话内存钩子**：[#51572](https://github.com/openclaw/openclaw/issues/51572) 请求在会话重置（Reset）或修剪（Prune）时也触发 `session-memory` 钩子，目前仅在自动压缩（Compaction）时触发。相关 PR [#181081](https://github.com/openclaw/openclaw/pull/181081) 正在修复并发捕获时的数据覆盖问题，暗示该机制在演进中。
*   **内置无头浏览器**：[#53763](https://github.com/openclaw/openclaw/issues/53763) 提议打包 Chromium 以解决当前三层架构依赖外部 Chrome 的不稳定性，属于基础设施级增强。
*   **安全扫描 Hook**：[#18677](https://github.com/openclaw/openclaw/issues/18677) 建议在 `skill:install` 之前提供安全扫描钩子，与 v2026.10.6 的安全加强方向一致。

### 7. 用户反馈摘要
*   **时区与路径问题**：用户在 Issue [#51429](https://github.com/openclaw/openclaw/issues/51429) 中严厉批评了硬编码路径（如 `/Users/wangtao`）泄露到生产代码中，反映了用户对代码质量控制的期待。
*   **长时任务阻塞**：用户反馈在 [#53008](https://github.com/openclaw/openclaw/issues/53008) 中，内存压缩（Memory Compaction）阻塞了主处理通道长达 10 分钟，导致 Telegram 消息无法处理，要求将重计算任务异步化。
*   **多语言支持**：[#66252](https://github.com/openclaw/openclaw/issues/66252) 指出当前 TTS/STT 配置为全局，无法针对不同代理（Agent）设置不同语言或音色，限制了多代理场景下的本地化体验。

### 8. 待处理积压
*   **鉴权边界问题**：[#154716](https://github.com/openclaw/openclaw/issues/154716) 报告 Native Claude CLI 鉴权导致 `auth-unknown` 并阻塞历史重放，自 9 月创建以来仍有 7 条评论，涉及会话连续性核心逻辑，需维护者优先审查。
*   **Codex OAuth 工作空间绑定**：[#56693](https://github.com/openclaw/openclaw/issues/56693) 标记为 P0/UX Release Blocker，指出 OAuth 可能绑定已禁用的 ChatGPT 工作空间，该问题持续影响用户体验，需尽快验证和修复。
*   **UI 陈旧状态**：[#165421](https://github.com/openclaw/openclaw/issues/165421) 报告 Control UI 在切换模型后 `maxTokens` 显示陈旧（128k），虽为 UI 层问题但误导用户判断上下文限制，积压于 P2 级别。

---

## 横向生态对比

**开源 AI 智能体生态横向对比分析报告 (2026-10-23)**

### 1. 生态全景
2026 年 10 月下旬，个人 AI 助手与自主智能体开源生态呈现出**“安全优先、架构解耦、平台分化”**的整体态势。安全加固成为行业共识，主流项目均针对 TLS 证书链漏洞（emSign/eMudhra/CA 信任问题）及运行时环境（Node.js/Python 依赖）进行了紧急或例行修复。技术路线上，**网关（Gateway）集中化**与**子代理（Sub-agent）隔离**正成为解决多模态并发与状态一致性矛盾的核心架构演进方向。与此同时，跨平台适配（特别是 Windows 沙箱稳定性与 Linux 缺失痛点）及 Agent 长任务调度的稳定性（死循环、状态污染）是当前社区关注的最高优先级工程挑战。

### 2. 各项目活跃度对比

| 项目名称 | 24h Issues 动态 | 24h PR 动态 | Release 情况 | 核心攻关方向 | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 1000 条 | 214 待合 | **v2026.10.6** (紧急安全) | Web UI 性能、Gateway 一致性、多代理 P0 故障 | 高（高强度迭代，面临稳定性挑战） |
| **Zeroclaw** | 100 条 | 42 待合 | 无 (v0.8.7 收尾) | CI 稳定性、Wasmtime 漏洞修复、v0.9.0 预研 | 良好（发布前冲刺，低负载高响应） |
| **PicoClaw** | 0 条 | 9 待合 | 无 | QQ 渠道多媒体、模型兼容性、依赖清理 | 低维护响应（滞后风险，功能单一） |
| **QwenPaw** | 13 条 | 26 条 | **v2.2.2.post1** (安全) | 安全补丁、架构解耦（Desktop/Plugin）、回归 Bug | 中（安全响应迅速，但架构重构阻塞严重） |
| **Hermes-Agent**| 382 条 | 500 条 (224 合) | 无 | Windows 网关稳定性、统一网关运行时、数据安全事故 | 高（极高频迭代，架构重大调整中） |
| **AstrBot** | 10 条 | 16 条 | 无 | TLS 校验、Agent 会话一致性、PyPI 体验 | 高（高闭环率，Bug 当日修复） |
| **DeepSeek H.** | N/A | N/A | 无 (0.2.1-rc) | Windows 沙箱崩溃、压缩机制优化、Linux 支持 | 中（社区反馈极深，但官方修复滞后） |

### 3. OpenClaw 在生态中的定位
*   **核心参照物**：OpenClaw 是目前该生态中**功能最完整、复杂度最高**的“全能型”基准项目。
*   **优势**：拥有最强的 Web UI 性能优化投入（懒加载）和最全的底层安全修复（Node 24/26 强制升级）；其 P0/P1 级问题（如多代理路由崩溃）代表了行业技术天花板。
*   **技术路线差异**：相比 Zeroclaw 和 PicoClaw 的轻量级单体，OpenClaw 正在向**多代理（Multi-Agent）**和**复杂工作流（Workflow）**演进，导致了极高的架构复杂度。
*   **社区规模对比**：日均 1000+ 的 Issue/PR 交互量远超 Hermes-Agent（882）和其他项目，确立了其作为“生态风向标”的地位，但也暴露了其多代理架构在稳定性上的系统性短板。

### 4. 共同关注的技术方向
1.  **供应链安全与 TLS 信任链修复**：
    *   *涉及项目*：OpenClaw、QwenPaw、Zeroclaw、AstrBot、Hermes-Agent。
    *   *具体诉求*：所有项目均面临 emSign/eMudhra CA 证书弃用或 Node.js CVE 修复，需同步更新运行时环境和 CA 信任列表。
2.  **网关（Gateway）与状态一致性**：
    *   *涉及项目*：OpenClaw、Hermes-Agent、Zeroclaw。
    *   *具体诉求*：修复 Gateway 重启导致会话丢失、子代理状态残留（OpenClaw #172837）及 Windows 进程锁（Hermes #79087）等核心链路断裂问题。
3.  **上下文管理（Compaction & Trimming）**：
    *   *涉及项目*：DeepSeek Harness、OpenClaw、QwenPaw。
    *   *具体诉求*：解决上下文压缩导致的 Token 激增（Harness #1944）、数据污染（OpenClaw #51572）及长任务死循环（Harness #5072），优化记忆钩子机制。
4.  **沙箱安全与执行隔离**：
    *   *涉及项目*：DeepSeek Harness、AstrBot、Zeroclaw。
    *   *具体诉求*：防止 Agent 越权操作（Harness #141346），增强 Windows/Linux 不同平台下的进程沙箱隔离，防止数据丢失和系统破坏。

### 5. 差异化定位分析
*   **功能侧重**：
    *   **OpenClaw**：企业级复杂工作流与多代理协作，Web 体验最佳。
    *   **Zeroclaw/PicoClaw**：垂直渠道集成（Telegram/Email 或 QQ/国内渠道），轻量化部署。
    *   **AstrBot**：国内开发者友好（PyPI 镜像、中文文档），强调插件生态的易用性。
    *   **DeepSeek Harness**：深度绑定特定模型（DeepSeek 系），强调本地化沙箱执行。
*   **技术架构**：
    *   **OpenClaw/Hermes-Agent**：采用分布式网关架构，高内聚低耦合，但状态管理极其复杂。
    *   **PicoClaw/Zeroclaw**：单体或微模块化架构，通过 Wasmtime/Rust 提升性能，部署简单。
*   **目标用户**：
    *   OpenClaw/Hermes-Agent 面向技术极客及专业开发者。
    *   AstrBot/QwenPaw 面向国内中小开发者及企业团队。
    *   PicoClaw 面向个人用户及嵌入式（SiPee）场景。

### 6. 社区热度与成熟度分层
*   **T1：快速迭代/高强度开发阶段（OpenClaw, Hermes-Agent）**
    *   活跃度极高，正处于架构重构（多代理/统一网关）和大规模 Bug 修复期，稳定性压力巨大，功能更新快但伴随较高回归风险。
*   **T2：质量巩固/安全加固阶段（Zeroclaw, QwenPaw, AstrBot）**
    *   处于版本收尾（v0.8.7/v2.2.2.post1）或架构稳健期，重点在于清理技术债务、修复升级回归 Bug、加强 CI/CD 测试覆盖。
*   **T3：低维护响应/特定功能深化阶段（PicoClaw, DeepSeek Harness）**
    *   PicoClaw 维护频率低，处于停滞边缘；DeepSeek Harness 无 GitHub 开放代码库机制，处于“闭门开发+社区反馈”模式，用户痛点积压较多，依赖下一版本集中释放。

### 7. 值得关注的趋势信号
1.  **“统一网关”成为多智能体管理的必然选择**：随着 Hermes-Agent 和 OpenClaw 推进 Gateway 拥有所有本地会话，未来的 Agent 将从“分散的脚本”向“中心化管理的服务”演进，运维复杂度将转移至网关层。
2.  **Agent 行为的安全审计需求激增**：Hermes-Agent 的数据安全事故（Agent 误删文件）和 OpenClaw 的密钥泄露担忧，预示着单纯的功能性 Agent 已不可接受，**“执行边界约束”（Sandboxing）和“审计日志”**将成为下一代产品的标配。
3.  **跨平台一致性是最大体验短板**：Linux 在 DeepSeek Harness 中的缺失和 Windows 在 Hermes-Agent 中的进程锁问题，表明 AI 助手生态正在走向“桌面 OS 级应用”的开发阶段，传统的 Linux-first 或 Web-first 模式已无法满足重度用户。
4.  **上下文优化的经济账**：DeepSeek Harness 用户对 Token 成本的敏感（压缩机制导致成本飙升）表明，**长程任务的 Token 效率**正在成为评估 Agent 框架的重要指标，而不仅仅是准确率。

**建议**：开发者应优先采用 OpenClaw 或 Zeroclaw 作为核心逻辑参考，但需自行加固 Gateway 鉴权与沙箱边界；企业部署需密切关注 AstrBot 和 QwenPaw 的国内合规与渠道适配能力。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

你好，我是 Agnes-3.0-flash。以下是基于你提供的数据生成的 Zeroclaw 项目动态日报。

***

# Zeroclaw 项目动态日报
**日期**：2026-10-23

## 1. 今日速览
Zeroclaw 项目今日保持高活跃度，过去24小时内处理了 100 条 Issues 和 PR，其中 Issues 新开立 38 条，关闭 12 条；PR 待合并 42 条，已合并/关闭 8 条。项目重心明显向 **v0.8.7 版本收尾** 与 **v0.9.0 架构预研** 倾斜，安全修复（如 Wasmtime 漏洞、OIDC 竞态条件）与 Gateway 稳定性（连接回收、WebSocket 升级失败）是当前的核心攻关方向。尽管今日无新版本发布，但针对 S0/S1 级严重缺陷的修复 PR 已密集合并，显示团队在发布前的稳定性冲刺阶段，整体健康度良好但负载较高。

## 2. 版本发布
**无新版本发布**
*   **状态**：当前处于 v0.8.6 已发布、v0.8.7 开发收尾、v0.9.0 早期预研的过渡期。
*   **信号**：[#11951](https://github.com/zeroclaw-labs/zeroclaw/issues/11951) 标签为 `release:v0.9.0`，表明下一代大版本的规划已启动，但尚未进入公开 Beta。

## 3. 项目进展
今日合并的 PR 集中在解决阻碍发布的稳定性问题及修复已知的安全/逻辑缺陷：
*   **CI/构建优化**：PR [#11941](https://github.com/zeroclaw-labs/zeroclaw/pull/11941) 将 Cranelift 测试超时放宽至 30 分钟，解决了 CI 长期因超时失败的问题；PR [#11833](https://github.com/zeroclaw-labs/zeroclaw/pull/11833) 为 arm64 Docker 构建增加内存限制，确保 CI 资源稳定性。
*   **安全与依赖修复**：PR [#11906](https://github.com/zeroclaw-labs/zeroclaw/pull/11906) 升级 Wasmtime 至 48.0.7，修复了 5 个 RustSec 高危漏洞（RUSTSEC-2026-0375..0379），这是今日最关键的安全合规动作。
*   **Bug 修复闭环**：
    *   PR [#11863](https://github.com/zeroclaw-labs/zeroclaw/pull/11863) 解决了 Issue [#11806](https://github.com/zeroclaw-labs/zeroclaw/issues/11806)，使 late_tool_search 测试在非 runtime 插件 Job 中默认关闭，消除了 CI 假阳性。
    *   PR [#11848](https://github.com/zeroclaw-labs/zeroclaw/pull/11848) 修复了 Issue [#11821](https://github.com/zeroclaw-labs/zeroclaw/issues/11821)，在 `plugin_channel_sender_denied` 日志中补充发送者名称，提升运维排查能力。
    *   PR [#11967](https://github.com/zeroclaw-labs/zeroclaw/pull/11967) 修复了 Issue [#11966](https://github.com/zeroclaw-labs/zeroclaw/issues/11966)，修正了 crates.io 预检逻辑在 PR 继承 master 版本号时的误报。
*   **整体评估**：团队正通过合并大量“低风险、高价值”的修复（如日志完善、CI 调优、依赖升级）来降低 v0.8.7 的发布风险。

## 4. 社区热点
*   **[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) | Tracker: Runtime, dashboard sign-in and gateway delivery (15 评论)**
    *   **分析**：这是 v0.9.0 的核心路线图跟踪 Issue，讨论量最高。开发者/贡献者正在争论 Gateway 投递机制与 Dashboard 签入功能的排期。高讨论度表明这是当前架构演进的最大瓶颈，涉及安全性（domain:security）与架构复杂性（risk:high）。
*   **[#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) | RFC: Append-only session event history (13 评论, 已关闭)**
    *   **分析**：该 RFC 的关闭讨论非常热烈，核心争议点在于“不可变事件流”与现有“可变对话消息”的迁移成本。虽然已关闭，但衍生出的实现细节（如 #11711）正在被讨论。
*   **[#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) | Consolidate release attestation mechanisms (10 评论)**
    *   **分析**：社区强烈要求简化签名/发布验证流程。当前存在 cosign、GitHub Artifact、slsa-github-generator 三套机制，冗余导致 CI 资源浪费。维护者已接受该需求（status:accepted），可能纳入近期重构。

## 5. Bug 与稳定性
按严重程度（S0-S2）排列：

| 严重程度 | 问题描述 | 关联 Issue | 状态/修复 |
| :--- | :--- | :--- | :--- |
| **S0** | **容器 CA 信任链未更新**：已发布的容器 CA bundle 仍信任已弃用的 emSign 中间证书，存在中间人攻击风险。 | [#11932](https://github.com/zeroclaw-labs/zeroclaw/issues/11932) | **待修复** (Open, High Risk) |
| **S1** | **Telegram 监听器永久挂起**：单个黑洞请求导致 HTTP 客户端无超时机制，Telegram 通道永久卡死，且健康检查无法恢复通道。 | [#11608](https://github.com/zeroclaw-labs/zeroclaw/issues/11608) | **待修复** (Open, P1) |
| **S2** | **Gateway 卸载后连接残留**：Gateway reload 时，旧 WebSocket 连接未被正确驱逐，导致新实例中连接状态不一致。 | [#11709](https://github.com/zeroclaw-labs/zeroclaw/issues/11709) | **修复中**：PR [#11901](https://github.com/zeroclaw-labs/zeroclaw/pull/11901) 已提交，旨在停止接受新连接并排空现有连接。 |
| **S2** | **Gateway TLS 下 WebSocket 升级失败**：Gateway 自带 TLS 监听器导致 HTTP/1.1 Upgrade 失败，Dashboard 聊天功能不可用。 | [#11951](https://github.com/zeroclaw-labs/zeroclaw/issues/11951) | **待修复** (Open, v0.9.0 标签) |
| **S2** | **配置写入竞态条件**：`flush_config` 在读取锁下克隆配置，但保存时未持有写锁，可能覆盖并发写入。 | [#9284](https://github.com/zeroclaw-labs/zeroclaw/issues/9284) | **待修复** (Open, P1) |
| **S2** | **Session 裁剪导致数据永久丢失**：Gateway 对话超限时，重写转录本会永久删除旧 turns，违反预期行为。 | [#11711](https://github.com/zeroclaw-labs/zeroclaw/issues/11711) | **待修复** (Open) |

## 6. 功能请求与路线图信号
*   **Goal Mode 持久化任务生命周期**：
    *   由 PR [#11878](https://github.com/zeroclaw-labs/zeroclaw/pull/11878) (1/12) 和 [#11879](https://github.com/zeroclaw-labs/zeroclaw/pull/11879) (2/12) 开启，这是一系列旨在为 Agent 引入长期后台委托（Background Delegation）的基础架构提案。
    *   **信号**：由于标记为 `follow-up` 且规模 `XL`，这极有可能是 **v0.9.0** 的旗舰特性。
*   **Email 通道增强**：
    *   用户请求在回复中引用原始邮件（[#11938](https://github.com/zeroclaw-labs/zeroclaw/issues/11938)）以及支持 Operator 模板与 HTML 正文（[#11992](https://github.com/zeroclaw-labs/zeroclaw/issues/11992)）。
    *   PR [#11993](https://github.com/zeroclaw-labs/zeroclaw/pull/11993) 已开始处理 HTML 正文的 Markdown 结构转换，表明 Email 通道的用户体验优化将在近期版本落地。
*   **Shell 命令安全解析**：
    *   PR [#11822](https://github.com/zeroclaw-labs/zeroclaw/pull/11822) 和 [#11994](https://github.com/zeroclaw-labs/zeroclaw/pull/11994) 正在强化 Bash/Grammar 对 POSIX 命令的边界识别（如 heredoc、子 shell），旨在防止策略绕过。这是增强型沙箱安全的关键一环。

## 7. 用户反馈摘要
*   **痛点 1：可观测性不足**。用户反馈插件拒绝记录（#11821）和 OIDC 失败（#11902）时，日志缺乏关键上下文（如发送者 ID、具体失败阶段），导致运维难以定位责任方。维护者已迅速响应并合并修复。
*   **痛点 2：CI 稳定性与资源浪费**。开发者对 CI 超时（#10558）和发布预检误报（#11966）表现出高度敏感。用户期望在大型 PR 中 CI 能提供更准确的失败归因，而非简单的“超时”或“预检失败”。
*   **满意度**：安全响应速度获得好评。Wasmtime 漏洞（#11906）在发现后迅速通过 PR 修复，体现了团队对供应链安全的重视。

## 8. 待处理积压
*   **高优先级积压 (P1)**：
    *   [#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) 发布签名机制整合。自 7 月 16 日提出，已拖延 3 个多月，影响发布效率与 CI 成本。
    *   [#9394](https://github.com/zeroclaw-labs/zeroclaw/issues/9394) Gateway 配对代码永不过期。安全漏洞，自 7 月 26 日提出，至今未关闭，需立即关注。
*   **长期未响应**：
    *   [#11707](https://github.com/zeroclaw-labs/zeroclaw/pull/11707) Dependabot 依赖更新 PR。由机器人创建，但 10 天无响应，需维护者确认是否自动合并或手动批准。
    *   [#11304](https://github.com/zeroclaw-labs/zeroclaw/pull/11304) 插件出口拒绝记录。已处于 `blocked` 状态 2 周，阻碍插件可观测性整体提升。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 (2026-10-23)

## 1. 今日速览
过去24小时内，PicoClaw 项目未发布新版本，且 Issues 板块处于静止状态（0 条更新）。然而，Pull Request 保持中等活跃度，共计 10 条更新，其中仅 1 条被合并/关闭，9 条处于待合并状态。当前积压的 9 条 PR 中，大部分为依赖项升级（Stale 标记）及少量功能增强，显示维护者近期可能处于低介入状态。整体项目健康度表现为**“低维护响应期”**，核心功能稳定但代码卫生（依赖更新）存在滞后风险。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
过去 24 小时内，仅有一条 PR 完成合并或关闭流程，为项目的功能演进提供了实质推进：

*   **QQ 渠道多媒体直推支持**
    *   **状态**：已关闭（推测为合并后关闭或废弃，根据数据“已合并/关闭: 1”且该 PR 标记为 `[CLOSED]`，结合其作为功能性 PR 的完整性，视为已完成生命周期）。
    *   **内容**：实现了 QQ 渠道直接推送本地多媒体文件（图片、文件）的功能，无需依赖外部图床。
    *   **意义**：降低了 QQ 渠道集成的外部依赖复杂度，提升了多模态消息处理的隐私性和稳定性。
    *   链接：[PR #1227](https://github.com/sipeed/picoclaw/pull/1227)

## 4. 社区热点
*注：今日所有 PR 评论数均为 `undefined` 或 `0`，无明显高热度讨论。以下基于 PR 内容分类梳理关键动向：*

*   **Gemini 兼容性修复**
    *   **描述**：针对 Gemini 3 模型在 OpenAI 兼容端点下的工具调用问题进行了修复。
    *   **诉求分析**：随着 Gemini 3 的普及，用户希望 PicoClaw 能无缝支持主流大模型的复杂工具调用流程（Tool Calling）。此 PR 解决了因缺失 `thought_signature` 导致的 `400 INVALID_ARGUMENT` 错误，是保障前沿模型可用性的关键补丁。
    *   链接：[PR #3428](https://github.com/sipeed/picoclaw/pull/3428)

*   **工具反馈隐私控制**
    *   **描述**：新增配置项允许隐藏工具反馈中的参数详情（`hide_args`），包括 Web UI 的可视化开关。
    *   **诉求分析**：用户对于 Agent 执行过程的透明度与界面简洁性/隐私性存在平衡需求。允许隐藏复杂参数提升了日志的可读性和安全性。
    *   链接：[PR #3429](https://github.com/sipeed/picoclaw/pull/3429), [PR #3430](https://github.com/sipeed/picoclaw/pull/3430)

## 5. Bug 与稳定性
*今日无新增 Bug 类 Issue。稳定性主要依赖以下待合并的修复 PR：*

1.  **Gemini 工具调用异常 (高优先级)**
    *   **问题**：通过 OpenAI 兼容接口使用 Gemini 3 进行多轮工具调用时，因缺少 `thought_signature` 导致服务报错。
    *   **状态**：Fix PR 已就绪，待合并。
    *   链接：[PR #3428](https://github.com/sipeed/picoclaw/pull/3428)

## 6. 功能请求与路线图信号
基于今日活跃的 9 个待合并 PR，推测下一版本的潜在亮点：

*   **多渠道与多模态增强**：QQ 渠道多媒体直推（已处理）标志着渠道功能的深化。
*   **Provider 扩展**：新增 Standard Compute 作为 OpenAI 兼容 Provider，表明项目正持续拓展模型接入的广度，降低用户接入门槛。
    *   链接：[PR #3431](https://github.com/sipeed/picoclaw/pull/3431)
*   **UI 与配置精细化**：工具参数隐藏功能的落地，显示路线图正向“用户体验精细化”和“隐私控制”方向演进。
    *   链接：[PR #3429](https://github.com/sipeed/picoclaw/pull/3429), [PR #3430](https://github.com/sipeed/picoclaw/pull/3430)

## 7. 用户反馈摘要
*由于今日 Issues 数为 0 且 PR 评论数据缺失，无法从评论中直接提取用户痛点。仅能从 PR 描述中推导潜在反馈：*
*   **痛点**：Gemini 用户在使用 Agent 工具时遭遇报错，影响了自动化流程的稳定性（参考 PR #3428）。
*   **需求**：用户希望在不牺牲功能的前提下，简化日志/界面中冗余的技术参数展示（参考 PR #3429/3430）。

## 8. 待处理积压
当前共有 **9 条** 待处理 PR，其中 **5 条** 被标记为 `[stale]`，表明这些 PR 长期未获得维护者关注。

1.  **依赖项积压（高风险）**：
    *   5 条 Dependabot 自动更新的 PR 处于 Stale 状态，涉及 `go.mau.fi/util`, `Azure SDK`, `golang.org/x/crypto` 等核心库。长期未更新可能导致潜在的安全漏洞（特别是 crypto 库升级从 0.53.0 到 0.58.0）及构建不兼容。
    *   链接：
        *   [PR #3436](https://github.com/sipeed/picoclaw/pull/3436) (go.mau.fi/util)
        *   [PR #3435](https://github.com/sipeed/picoclaw/pull/3435) (Azure SDK)
        *   [PR #3434](https://github.com/sipeed/picoclaw/pull/3434) (adhocore/gronx)
        *   [PR #3433](https://github.com/sipeed/picoclaw/pull/3433) (golang.org/x/crypto)
        *   [PR #3432](https://github.com/sipeed/picoclaw/pull/3432) (anthropic-sdk-go)

2.  **功能与修复积压（中优先级）**：
    *   Standard Compute Provider 支持、工具参数隐藏功能、Gemini 修复均处于 Stale 状态。若这些功能长期不合并，将影响用户体验和新模型的可用性。
    *   链接：
        *   [PR #3431](https://github.com/sipeed/picoclaw/pull/3431) (Provider)
        *   [PR #3430](https://github.com/sipeed/picoclaw/pull/3430) (Web UI)
        *   [PR #3429](https://github.com/sipeed/picoclaw/pull/3429) (Config)
        *   [PR #3428](https://github.com/sipeed/picoclaw/pull/3428) (Gemini Fix)

**建议**：维护者应优先清理 `[stale]` 标签的依赖项 PR 以保障安全基线，并尽快合并 Gemini 修复 PR 以解决当前用户的主要报错问题。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 (2026-10-23)

### 1. 今日速览
QwenPaw 项目今日活跃度极高，过去 24 小时内产生了 13 条 Issue 更新和 26 条 PR 更新，其中重点在于发布紧急安全补丁 `v2.2.2.post1`。当前社区主要关注点集中在该安全版本的验证以及升级后引发的一系列回归 Bug（如模块缺失、配置失效等）。项目正在推进大型架构重构，包括 Desktop 共享守护进程、Channel 插件化隔离以及前端测试覆盖率的显著提升。整体来看，项目处于“安全修复 + 架构演进”的关键节点，但升级流程中暴露的稳定性问题需要优先解决。

### 2. 版本发布
**最新发布：v2.2.2.post1 (Post Release)**
*   **发布性质**：紧急安全与维护补丁。
*   **主要变更**：
    *   **安全修复**：修复了 emSign CA 信任链在依赖项、安装程序和构建过程中的漏洞 ([#8370](https://github.com/agentscope-ai/QwenPaw/pull/8370))。
    *   **版本升级**：Node.js 升级到 22.23.4，修复了 CVE-2026-111497 和 CVE-2026-105481 ([#8371](https://github.com/agentscope-ai/QwenPaw/pull/8371))。
    *   **版本标记**：正式版本号更新至 v2.2.2.post1 ([#8369](https://github.com/agentscope-ai/QwenPaw/pull/8369))。
*   **迁移注意事项**：
    *   **强烈建议用户立即升级**至 `v2.2.2.post1` 或更高版本，以消除 CA 信任风险和安全漏洞 ([#8385](https://github.com/agentscope-ai/QwenPaw/issues/8385))。
    *   官方已开启安装验证流程，平台需通过四项检查点确认安装成功 ([#8386](https://github.com/agentscope-ai/QwenPaw/issues/8386))。

### 3. 项目进展
今日有多个重要 PR 合并或处于高活跃状态，推动了核心架构的演进：
*   **安全与合规**：
    *   已合并 emSign CA 信任修复和 Node.js 安全升级，确保了供应链安全。
    *   移除了 GPL 许可的 `html2text` 依赖，替换为标准库转换器，解决了 Apache-2.0 许可兼容性隐患 ([#8366](https://github.com/agentscope-ai/QwenPaw/pull/8366))。
*   **架构重构（Desktop & Plugins）**：
    *   **Desktop 守护进程**：正在实施将共享运行时所有权转移到独立的原生守护进程中，解决多实例竞争和更新干扰问题 ([#8373](https://github.com/agentscope-ai/QwenPaw/pull/8373))。
    *   **Channel 插件化**：提议将官方渠道（除 Console 外）提取为插件并实施子进程隔离，减少宿主进程 SDK 导入，提高容错性 ([#8187](https://github.com/agentscope-ai/QwenPaw/pull/8187))。
*   **测试基础设施**：
    *   新增 106 个前端单元测试文件，覆盖率提升 4.97pp，零产品代码变更 ([#8380](https://github.com/agentscope-ai/QwenPaw/pull/8380))。
    *   修复了多个跨平台（Windows/macOS）测试失败问题，包括 sips 预检和 sidecar probe ([#8383](https://github.com/agentscope-ai/QwenPaw/pull/8383), [#8382](https://github.com/agentscope-ai/QwenPaw/pull/8382), [#8381](https://github.com/agentscope-ai/QwenPaw/pull/8381))。

### 4. 社区热点
*   **#338 [enhancement] 建议添加 webhook 功能** ([链接](https://github.com/agentscope-ai/QwenPaw/issues/338))
    *   **活跃度**：长期活跃 Issue，更新于今日，评论 10 条。
    *   **诉求分析**：用户希望实现外部软件与 QwenPaw 的异步交互。具体场景为：外部系统发送消息给 Copaw，Copaw 处理后通过 Webhook 回调用户接口或返回查询 Key。这表明用户对 QwenPaw 作为后端 API 服务的集成能力有强烈需求。
*   **#8275 [enhancement] QwenPaw Hub 支持全局 Skill 和 MCP 统一管理与共享** ([链接](https://github.com/agentscope-ai/QwenPaw/issues/8275))
    *   **活跃度**：今日更新，评论 2 条。
    *   **诉求分析**：针对团队使用场景，用户痛点在于每个用户需独立配置公共 Skill/MCP，维护成本高。建议增加“全局共享”机制，由管理员统一安装/更新，用户自动继承，保留个人配置叠加能力。这反映了 QwenPaw 在企业/团队级部署下的管理需求。
*   **#8385 [Security] 安全提醒：请升级至 QwenPaw 2.2.2.post1 或更高版本** ([链接](https://github.com/agentscope-ai/QwenPaw/issues/8385))
    *   **活跃度**：今日新开，由官方发起的高优先级安全通告。
    *   **诉求分析**：强制性的安全升级指令，强调 Desktop installers 和 PyPI 包均需关注。

### 5. Bug 与稳定性
今日报告的 Bug 主要集中在 v2.2.2 升级后的回归问题及容器化部署限制：

| 严重程度 | Issue 链接 | 描述 | 关联 Fix PR | 状态 |
| :--- | :--- | :--- | :--- | :--- |
| **高** | [#8388](https://github.com/agentscope-ai/QwenPaw/issues/8388) | 升级后 QQ 渠道无法使用，报错 `No module named '_qwenpaw_remote_backend'`，导致核心工具链失效。 | 暂无明确 PR，疑似安装/模块加载问题 | Open |
| **高** | [#8374](https://github.com/agentscope-ai/QwenPaw/issues/8374) | `QWENPAW_CORS_ORIGINS` 通过 Web UI/CLI 设置不生效，因常量在模块导入时已固定，晚于环境变量注入。 | [#8389](https://github.com/agentscope-ai/QwenPaw/pull/8389) | Open (Fix 已提) |
| **中** | [#8359](https://github.com/agentscope-ai/QwenPaw/issues/8359) | Hub 运行在 Docker 容器内时，readiness 探测硬编码 `127.0.0.1` 导致启动失败 (Errno 111)。 | [#8384](https://github.com/agentscope-ai/QwenPaw/pull/8384) | Open (Fix 已提) |
| **中** | [#8378](https://github.com/agentscope-ai/QwenPaw/issues/8378) | 升级后模型调用异常，涉及 `agent.json` 中 `active_model` 配置字段变更导致兼容性问题。 | 暂无 | Open |
| **中** | [#8377](https://github.com/agentscope-ai/QwenPaw/issues/8377) | 干净检出下 pytest 收集阶段中止，`test_backup` 模块导入文件不匹配。 | [#8379](https://github.com/agentscope-ai/QwenPaw/pull/8379) | Open (Fix 已提) |
| **低** | [#8368](https://github.com/agentscope-ai/QwenPaw/issues/8368) | 删除当前选中的会话报错 404。 | [#8375](https://github.com/agentscope-ai/QwenPaw/pull/8375) | Open (Fix 已提) |
| **低** | [#8365](https://github.com/agentscope-ai/QwenPaw/issues/8365) | Matrix 渠道每次启动都用密码登录，服务器丢弃设备后不重新上传 E2EE 密钥。 | 暂无 | Open |

### 6. 功能请求与路线图信号
*   **Desktop 体验优化**：
    *   **滚动锁定**：用户请求在流式生成时禁用自动滚动，以便阅读历史内容 ([#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339))。虽非最新，但今日仍有更新，表明是高频交互痛点。
    *   **日志轮转**：Windows 下 Tauri sidecar 日志无限增长问题正在通过 PR 修复，增强长期运行稳定性 ([#8243](https://github.com/agentscope-ai/QwenPaw/pull/8243))。
*   **Hub 网关增强**：
    *   **超时配置**：用户反馈 Hub AI 网关 120 秒默认超时过短，影响文件处理等长任务。已有 PR 将默认值提升至 600 秒并暴露配置项 ([#8372](https://github.com/agentscope-ai/QwenPaw/issues/8372), [#8387](https://github.com/agentscope-ai/QwenPaw/pull/8387))。
*   **高级编码模式**：
    *   **Python Code Mode**：正在实验性支持 Python 工具编排接口，允许模型在独立的 CPython worker 中调用原生工具，保留权限和并发约束 ([#8224](https://github.com/agentscope-ai/QwenPaw/pull/8224))。
*   **记忆后端**：
    *   **PowerContext 集成**：支持 PowerContext v1.4.0 的结构化上下文和 Artifact API，提升长程任务记忆能力 ([#8376](https://github.com/agentscope-ai/QwenPaw/pull/8376))。

### 7. 用户反馈摘要
*   **痛点：升级带来的不稳定**。多位用户反馈从旧版本升级到 v2.2.2 后出现模块缺失 (#8388) 和模型配置失效 (#8378)，反映出升级过程中的向后兼容性处理存在不足，用户担心核心功能（如渠道连接、模型调用）在中断服务。
*   **场景：容器化部署困境**。维护者建议的 Docker 部署方式（#8359）实际上因网络探测逻辑硬编码而不可用，说明官方文档/建议与当前代码实现存在脱节，容器用户群体正在流失或遭遇阻碍。
*   **需求：团队级管理**。随着 Hub 功能使用率增加，用户对“全局配置”的需求迫切（#8275），单一用户模式已无法满足团队协作场景，缺乏统一的分发和更新机制增加了运维负担。
*   **满意点：安全响应迅速**。在发现 emSign CA 漏洞后，项目迅速发布了 post release 并明确了升级路径，社区对安全响应速度持正面态度。

### 8. 待处理积压
*   **大规模架构 PR 积压**：
    *   [#8187](https://github.com/agentscope-ai/QwenPaw/pull/8187) (Channel 插件化, size/XXXL) 和 [#8373](https://github.com/agentscope-ai/QwenPaw/pull/8373) (Desktop 守护进程, size/XXXL) 均为超大 PR，涉及核心运行时时机制变更。这两个 PR 自 10 月 12 日/22 日起已停滞或等待审查，需分配资深维护者进行 Code Review，否则将阻塞后续架构迭代。
    *   [#7874](https://github.com/agentscope-ai/QwenPaw/pull/7874) (PawApp SDK 重设计, size/XXXL) 创建于 9 月 19 日，至今处于 Open 状态，涉及 SDK 和控制平面重设计，长期未合并可能导致 API 不稳定。
*   **长期未响应 Issue**：
    *   [#338](https://github.com/agentscope-ai/QwenPaw/issues/338) Webhook 功能请求创建于 3 月，至今仍有新评论，建议团队评估是否纳入 Roadmap 或明确拒绝理由，避免社区期望管理失效。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes-Agent 项目日报 (2026-10-23)

## 1. 今日速览
过去 24 小时内，Hermes-Agent 项目保持了极高的活跃度，处理了 **382** 条 Issue 和 **500** 条 Pull Request。
**224 个 PR 处于已合并/关闭状态**，显示该项目正处于密集的代码迭代与 bug 修复期。
安全与合规问题（如依赖项 CVE 漏洞修复）以及 Windows 平台下的稳定性问题（如更新锁定、网关看门狗）是当前社区关注的核心痛点。
虽然无新版本发布，但围绕“统一网关运行时”（#106742）的后续修复工作（#134889）正在推进，标志着底层架构正在经历重大调整。

## 2. 版本发布
**无新版本发布。**

## 3. 项目进展
今日合并/关闭的 PR 集中在解决底层依赖兼容性、修复特定场景下的逻辑缺陷以及增强平台兼容性：
*   **依赖与兼容性修复**：
    *   合并非流式路径下的 Claude 订阅插件逻辑修复，解决了长响应被错误标记为“陈旧”的问题 ([#125095](https://github.com/NousResearch/hermes-agent/issues/125095) 关联 PR 状态变更)。
    *   修复了由于 Microsoft 端点策略变更导致的 `edge-tts` 403 错误，通过升级版本解决了合成失败问题 ([#137944](https://github.com/NousResearch/hermes-agent/issues/137944))。
    *   解决了新 `uv` 版本下的依赖解析问题，确保安装过程正常 ([#143281](https://github.com/NousResearch/hermes-agent/pull/143281))。
*   **核心功能修复**：
    *   修复了 Desktop 端在消息底部分支（Branch）时切分错误的问题 ([#143217](https://github.com/NousResearch/hermes-agent/pull/143217))。
    *   修复了 Kanban 分发器因指纹读取失败导致“存活”工作进程被误判为死亡并重复派发任务的严重缺陷 ([#143308](https://github.com/NousResearch/hermes-agent/pull/143308))。
    *   修复了 Email 网关并发回复时主题跟随错误的 bug ([#143300](https://github.com/NousResearch/hermes-agent/pull/143300))。
*   **架构演进**：
    *   针对 macOS 12 及更早版本，调整了更新策略，不再推送不兼容的 Electron 44 版本 ([#143311](https://github.com/NousResearch/hermes-agent/pull/143311))。

## 4. 社区热点
今日讨论最活跃的 Issue 集中在**架构重构**和**数据安全性**：

*   **架构重构追踪**：[#134889 [CLOSED] Tracking: one gateway owns every local session](https://github.com/NousResearch/hermes-agent/issues/134889) (213 评论)
    *   **分析**：这是针对 P0 优先级 PR #106742（统一网关运行时）的追踪 Issue。虽然标记为 CLOSED，但高评论量表明社区对“所有本地会话由单一网关拥有”这一架构变更的稳定性、消息投递风险及 Windows 兼容性存在高度焦虑。
*   **跨网关协作**：[#97681 [OPEN] Let Bots collaborate across gateways](https://github.com/NousResearch/hermes-agent/issues/97681) (40 评论)
    *   **分析**：用户期待 Hermes Bots 能够在不同机器和所有者之间协作，同时保持控制权。这代表了从“个人助手”向“分布式多智能体网络”演进的需求。
*   **数据安全事故**：[#141346 [OPEN] Smart approval auto-approved osascript commands that closed the user's unsaved PowerPoint deck](https://github.com/NousResearch/hermes-agent/issues/141346) (33 评论)
    *   **分析**：一个严重的安全/可靠性事故，Agent 在 macOS 上未经充分审查自动执行了 AppleScript，导致用户未保存的 PPT 丢失。社区呼吁强化“智能审批”模式下的安全边界。
*   **插件生态治理**：[#64231 [OPEN] chore(plugins): lifecycle-event catalog, hook taxonomy](https://github.com/NousResearch/hermes-agent/issues/64231) (29 评论)
    *   **分析**：随着插件增多，现有的 Hook 机制混乱。社区希望建立统一的生命周期事件目录和 Hook 验收标准，以批量处理积压的 PR。

## 5. Bug 与稳定性
按严重程度排列的今日主要 Bug 及修复状态：

| 严重程度 | 问题描述 | 相关 Issue/PR | 修复状态 |
| :--- | :--- | :--- | :--- |
| **P1** | Windows 桌面端：运行时探针超时导致健康安装被路由到首次运行引导，提供覆盖安装选项，存在数据丢失风险。 | [#79087](https://github.com/NousResearch/hermes-agent/issues/79087) | Open (调查中) |
| **P2** | Dashboard 在 Gateway 拥有 `state.db` 时，批量操作因 409 冲突被拒绝。 | [#138915](https://github.com/NousResearch/hermes-agent/issues/138915) | Open |
| **P2** | Windows 计划任务无法重启 Gateway Watchdog 退出的进程，因为任务实际启动的是 `wscript.exe` 而非网关本身。 | [#91097](https://github.com/NousResearch/hermes-agent/issues/91097) | Open |
| **P2** | 桌面更新循环：`git reset --hard` 销毁本地提交，导致用户本地补丁丢失并陷入无限更新循环。 | [#74885](https://github.com/NousResearch/hermes-agent/issues/74885) | Open |
| **P2** | 会话压缩时，`reasoning` 与 `reasoning_content` 字段重复导致 OpenAI 兼容端点返回 400 错误。 | [#136486](https://github.com/NousResearch/hermes-agent/issues/136486) | Open |
| **P2** | Gateway 重启时，正在进行的回合被标记为 `unknown` 并静默阻止整个会话，下一条用户消息永久排队。 | [#139532](https://github.com/NousResearch/hermes-agent/issues/139532) | Open |
| **P2** | macOS 12 及更早版本不再接收 Electron 44 更新，避免崩溃。 | [#143311](https://github.com/NousResearch/hermes-agent/pull/143311) | **Fixed (PR Open)** |
| **P2** | 凭据池刷新逻辑缺陷：不匹配身份轮换时，未预先刷新即将过期的 OAuth Token。 | [#143304](https://github.com/NousResearch/hermes-agent/pull/143304) | **Fixed (PR Open)** |

## 6. 功能请求与路线图信号
*   **浏览器自动化重构**：PR [#143146](https://github.com/NousResearch/hermes-agent/pull/143146) 显示项目正在移除内置的 `agent-browser` 和 10 个 `browser_*` 工具，统一迁移至 `browser_exec` 后端，并将 Camofox 移至插件目录。这表明浏览器自动化正变得更加模块化和轻量化。
*   **内存管理增强**：
    *   功能请求 [#135039](https://github.com/NousResearch/hermes-agent/issues/135039) 呼吁对 `MEMORY.md` 实施预算限制和写入时验收管道。
    *   PR [#143301](https://github.com/NousResearch/hermes-agent/pull/143301) 正在开发 `/correct` 命令，用于在记忆和学习技能中修复错误事实。
    *   PR [#116673](https://github.com/NousResearch/hermes-agent/pull/116673) 允许 `MEMORY.md` 锚定文档链。
    *   **信号**：记忆系统正在从简单的文本文件向结构化、可治理的知识库演进。
*   **认证与账户迁移**：PR [#143234](https://github.com/NousResearch/hermes-agent/pull/143234) 和 [#143235](https://github.com/NousResearch/hermes-agent/pull/143235) 致力于简化 Nous 账户登录流程，并确保免费层（Guest）应用在登录后自动迁移到新账户。这旨在提升用户留存和账户连贯性。

## 7. 用户反馈摘要
*   **痛点**：
    *   **Windows 更新体验差**：用户频繁遭遇文件锁定（OS Error 32）导致的更新失败，以及更新后本地代码被 `git reset` 清除的恐惧 ([#91229](https://github.com/NousResearch/hermes-agent/issues/91229), [#74885](https://github.com/NousResearch/hermes-agent/issues/74885))。
    *   **数据丢失风险**：智能审批模式被指出可能导致未保存文件关闭等不可逆操作 ([#141346](https://github.com/NousResearch/hermes-agent/issues/141346))。
    *   **本地化缺失**：Docusaurus 文档站缺乏 pt-BR 等语言支持，尽管 CLI 已有部分本地化 ([#68680](https://github.com/NousResearch/hermes-agent/issues/68680))。
*   **场景**：
    *   用户正在尝试将 Hermes 用于跨设备的协作网络（A2A），但发现长任务缺乏任务 ID 返回机制，导致调用方超时 ([#91687](https://github.com/NousResearch/hermes-agent/issues/91687))。
    *   部分用户希望将 Email 会话按主题隔离，而非按发送者合并，以适应多主题工作流 ([#26277](https://github.com/NousResearch/hermes-agent/issues/26277))。

## 8. 待处理积压
*   **安全漏洞修复滞后**：
    *   `js-yaml` 和 `yaml` 依赖项存在已知 CVE (GHSA-2883-xcg3-v3hh, GHSA-48c2-rrv3-qjmp)，Issue [#122424](https://github.com/NousResearch/hermes-agent/issues/122424) 已关闭，需确认是否已彻底从所有依赖树中移除或升级。
    *   `httpx2` 和 `httpcore2` 在 extras 中固定于易受攻击的版本，Issue [#108219](https://github.com/NousResearch/hermes-agent/issues/108219) 已关闭，需验证补丁是否生效。
*   **长期未解决的功能请求**：
    *   [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) 跨网关 Bot 协作已挂起数月，处于 `needs-decision` 状态，建议维护者重新评估优先级。
    *   [#67798](https://github.com/NousResearch/hermes-agent/issues/67798) 将生命周期 Hook 共享化至所有执行表面，该功能对插件生态至关重要，但长期停滞。
*   **观察性不足**：
    *   [#6642](https://github.com/NousResearch/hermes-agent/issues/6642) 请求统一的遥测和分析功能（延迟、成本、成功率），对于个人 AI 助手用户优化成本至关重要，目前仍处开放状态。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 (2026-10-23)

### 1. 今日速览
AstrBot 项目今日呈现出**高活跃度与紧密闭环**的健康状态，24 小时内新增/活跃 Issues 10 条，PR 16 条，其中大部分新功能或 Bug 报告在提交当日即有对应的修复 PR 提交。今日社区焦点高度集中在**安全加固**（eMudhra CA 漏洞修复与 TLS 校验）以及**Agent 会话一致性**（Reset 后的状态回写修复）。尽管没有新的正式版本发布，但合并与待合并的 2 个 PR 预示着即将到来的安全补丁版本。

### 2. 版本发布
*过去 24 小时内无新版本发布。*
*注：PR #10670 针对 certifi/pip 的安全修复已关闭（可能已合并或准备发布），后续可能伴随一个安全修订版发布。*

### 3. 项目进展
*基于 24 小时内状态发生改变的 PR（已合并/关闭）分析：*

*   **安全合规闭环**：
    *   **TLS 校验修复**：PR #10670（已关闭，预期合并）修复了由于 `certifi` 版本过旧导致的安全隐患。AstrBot 依赖的 `certifi` 和 `pip` 版本已升级至下限，阻断了被破解的 eMudhra 中间 CA 证书的攻击面。[PR #10670](https://github.com/AstrBotDevs/AstrBot/pull/10670)
*   **Dashboard 稳定性提升**：
    *   **SSE 异常修复**：PR #10666（已关闭）修复了 Dashboard 在保存插件配置并关闭闲置的日志 SSE 连接时，因 gzip 中间件处理不当导致的 `RuntimeError`。这提升了 WebUI 在并发长连接场景下的稳定性。[PR #10666](https://github.com/AstrBotDevs/AstrBot/pull/10666)

*(其余 14 个待合并 PR 详见下文对应部分)*

### 4. 社区热点
*基于评论数与讨论活跃度分析：*

*   **[Feature] 增强 PyPI 仓库地址配置体验** ([Issue #10577](https://github.com/AstrBotDevs/AstrBot/issues/10577))
    *   **数据**：8 条评论，讨论最为活跃。
    *   **诉求分析**：国内用户痛点在于 PyPI 访问速度与连接稳定性。开发者提议不仅提供预设的镜像站点列表（类似 GitHub 加速），还要求增加**下载速度测试**功能，以避免“连接成功但下载极慢”的误判，从而优化插件安装体验。
*   **[Feature] 会话内展示模型调用过程** ([Issue #10662](https://github.com/AstrBotDevs/AstrBot/issues/10662))
    *   **数据**：6 条评论。
    *   **诉求分析**：用户希望将原本分散在系统日志中的 LLM 调用细节（如 Tool 调用轨迹、输入输出）直接集成到 UI 会话记录中。这主要服务于**可观测性**需求，方便用户在调试 Agent 复杂任务时，无需去翻查全量日志即可复盘上下文。
*   **[Feature] 文档站 AI 友好性改造** ([Issue #10676](https://github.com/AstrBotDevs/AstrBot/issues/10676))
    *   **数据**：3 条评论，且已有 **PR #10679** 响应。
    *   **诉求分析**：顺应 AI Agent 开发趋势，要求文档站提供 `llms.txt` 及纯 Markdown 接口，减少 AI 阅读文档时的 Token 消耗和 HTML 解析噪音。

### 5. Bug 与稳定性
*今日报告的 Bug，按严重程度排序：*

*   **[高] 会话重置后历史数据残留 (Regression)**
    *   **描述**：内置 Agent 在 `/reset` 执行时，若旧任务仍在收尾，会将旧的历史数据重新写回数据库，导致上下文越积越大（用户实测积累至 9.7 万 token）。
    *   **状态**：已有 Fix PR：[PR #10688](https://github.com/AstrBotDevs/AstrBot/pull/10688)（引入持久化 epoch 机制拦截脏写）。[Issue #10675](https://github.com/AstrBotDevs/AstrBot/issues/10675)
*   **[中] Gemini 流式请求重试失效**
    *   **描述**：针对 Gemini 原生提供商，当流式请求在首个数据块返回前发生 500 错误时，配置的 `request_max_retries` 失效，直接报错且不重试。
    *   **状态**：已有 Fix PR：[PR #10687](https://github.com/AstrBotDevs/AstrBot/pull/10687)（将重试边界前置到首个流块）。[Issue #10677](https://github.com/AstrBotDevs/AstrBot/issues/10677)
*   **[中] 插件依赖预检逻辑缺失**
    *   **描述**：插件依赖如 `demo[feature]` 包含 extras 时，预检机制仅检查基础包名，导致安装失败。
    *   **状态**：已有 Fix PR：[PR #10656](https://github.com/AstrBotDevs/AstrBot/pull/10656)。
*   **[中] 容器/沙箱环境兼容性问题**
    *   **描述**：在 Shipyard 旧驱动容器环境中，Computer-use 工具返回空输出。
    *   **状态**：已有 Fix PR：[PR #10671](https://github.com/AstrBotDevs/AstrBot/pull/10671)。

### 6. 功能请求与路线图信号
*   **配置健壮性校验**：用户 [Issue #10674](https://github.com/AstrBotDevs/AstrBot/issues/10674) 提出 WebUI 修改配置后缺乏校验，导致插件重载失败。虽暂无直接对应 PR，但反映了 WebUI 配置管理模块亟需增强。
*   **多群多 LLM 隔离**：[Issue #10686](https://github.com/AstrBotDevs/AstrBot/issues/10686) 请求不同群聊使用不同的 LLM 及开关。该功能符合“企业级多租户/多场景”需求，预计会被纳入长期路线图。
*   **Windows 沙箱支持**：PR #10466 正在推进 Windows 原生 AppContainer 沙箱，标志着 Agent 本地执行能力开始向 Windows 桌面级安全看齐。[PR #10466](https://github.com/AstrBotDevs/AstrBot/pull/10466)

### 7. 用户反馈摘要
*   **痛点**：中文用户普遍反映国内 PyPI 依赖安装慢且不稳定（#10577）；WebUI 配置保存缺乏反馈机制（#10674）。
*   **场景**：重度 Agent 用户开始关注**上下文管理**（#10675）和**调用透明度**（#10662），不再满足于“能用”，而是追求“可控、可查”。
*   **新趋势**：用户开始关注**AI 读取文档的能力**（#10676），表明使用 AI 辅助开发 AstrBot 插件已成为常见工作流。

### 8. 待处理积压
*   **安全遗留**：虽然 #10670 修复了 eMudhra 问题，但今日新增 [Issue #10684](https://github.com/AstrBotDevs/AstrBot/issues/10684) 指出默认 PyPI 镜像 (`mirrors.aliyun.com`) 使用了 `--trusted-host` 从而关闭了 TLS 校验。维护者已提交 [PR #10685](https://github.com/AstrBotDevs/AstrBot/pull/10685) 待审核。这是一个**高危安全项**，建议优先处理，避免与 #10670 的安全修复逻辑产生矛盾。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报

**日期**: 2026-10-23  
**数据来源**: GitHub Discussions (24h 更新 213 条)

## 1. 今日速览

过去 24 小时 DeepSeek Harness 社区活跃度极高，213 条讨论更新中，焦点集中在 **Windows 平台沙箱机制崩溃**、**上下文压缩（Compaction）逻辑缺陷** 以及 **Linux 平台支持缺失**。项目当前处于 `0.2.1-rc` 候选版本密集测试期，但多个致命 Bug（特别是 `0xC0000142` 错误）导致 Windows 用户无法正常使用受限沙箱功能。此外，底层传输层（DeepSeek Messages）的稳定性问题和会话永久性损坏（Permanently Broken Sessions）成为阻碍用户生产环境部署的主要稳定性痛点。由于项目采用"无 Issues/PR 机制，代码经 Releases 落地”的模式，今日无新版本发布，大量修复代码预计将整合进下一正式版。

## 2. 版本发布

**无新版本发布**。
根据数据概览，今日无新的 Release 落地。由于项目特性，代码合并直接体现在 Releases 的 Changelog 中，当前处于空窗期，预计下一版本将包含今日讨论中提到的沙箱修复与压缩逻辑优化。

## 3. 项目进展

*本节说明：由于该项目禁用 GitHub Issues/PR 机制，常规意义上的"合并 PR"数据不可用。依据 Discussions 中的开发者回复与用户实测反馈，以下是当前版本在研/待发布的进展：*

*   **Windows 沙箱重构**：针对 `workspace-write` 模式下所有子进程因 `0xC0000142` 崩溃的问题，社区已定位到根因（宿主镜像缺乏控制台、受限令牌 DACL 配置缺失、Electron GUI 子系统二进制问题）。相关修复方案正在被验证，预计将作为高优先级补丁合入。
*   **压缩机制优化**：针对 `@deepseek-ai/dsh-compaction-basic` 无法继承 `reasoningEffort` 且不保留前缀缓存（Prefix Cache）导致 Token 消耗激增的问题，团队已确认根因，修复逻辑正在测试中，旨在降低长任务成本。
*   **Linux 支持推进**：目前仅 WorkBuddy 和 Qoder 提供 Linux 支持，DeepSeek Harness 官方对 Linux 支持仍处于规划或早期阶段，用户反馈强烈。

## 4. 社区热点

今日讨论最活跃且评论数最多的议题主要集中在平台兼容性与核心机制缺陷：

1.  **Linux 支持长期缺失** ([#8107](https://github.com/deepseek-ai/deepseek-harness/discussions/8107) - 35 条评论)
    用户持续抱怨 Linux 平台“总被遗忘”。虽然 WorkBuddy 和 Qoder 已支持 Linux，但 DeepSeek Harness 和豆包均未跟进。此话题热度反映了开源社区对跨平台一致性的强烈诉求，尤其是 Linux 开发者群体的焦虑。
2.  **Desktop Web 认证失败** ([#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) - 18 条评论)
    由于 `dsh-auth-*` Cookies 堆积溢出导致 Host header 限制 (431) 被触发。这是一个典型的 Web 桌面端认证状态管理 Bug，影响了 NixOS/Wayland 等特定环境的用户。
3.  **桌面版缺少 Ctrl+F 搜索** ([#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713) - 15 条评论)
    用户指出底层全文检索引擎已具备，但桌面版未开放 `Ctrl+F` 入口。该帖子附带了可用的原型插件和根因定位，表明社区技术能力强，直接为开发团队提供了低成本的实现路径，被纳入正版的概率极高。
4.  **DeepSeek Messages 传输层失败** ([#6987](https://github.com/deepseek-ai/deepseek-harness/discussions/6987) - 15 条评论)
    自升级到 4.1 版本后，多用户报告连续出现“运行失败，DeepSeek Messages transport failed”。这属于核心通信链路的回归问题，直接切断了用户与模型的服务连接。
5.  **Agent 长任务陷入死循环** ([#5072](https://github.com/deepseek-ai/deepseek-harness/discussions/5072) - 11 条评论)
    在涉及后台 Job 轮询和外部进程等待的长任务中，Agent 缺乏“轮次预算（Turn Budget）”和“重复检测兜底机制”，导致大量无意义的重复执行和上下文消耗，反映了 Agent 调度器的稳定性短板。

## 5. Bug 与稳定性

按严重程度与影响范围排序：

1.  **[严重] Windows `workspace-write` 沙箱全量崩溃 (0xC0000142)**
    *   相关讨论: [#1847](https://github.com/deepseek-ai/deepseek-harness/discussions/1847), [#10010](https://github.com/deepseek-ai/deepseek-harness/discussions/10010), [#10066](https://github.com/deepseek-ai/deepseek-harness/discussions/10066)
    *   现象: 在 Windows 10/11 的 `workspace-write` 模式下，所有受限子进程（如 `cmd /c echo ok`）直接启动失败，报 `0xC0000142 / STATUS_DLL_INIT_FAILED`。
    *   根因: 宿主 Electron 镜像默认无控制台 + 受限令牌默认 DACL 缺少通用受托人。
    *   状态: 0.2.1-rc.2 仍可复现，暂无 Fix PR，等待官方发布针对 Windows 启动器的底层热修复。
2.  **[严重] 会话永久性损坏 (400 Bad Request)**
    *   相关讨论: [#8846](https://github.com/deepseek-ai/deepseek-harness/discussions/8846)
    *   现象: `dsh-tool-fs` 的 read 工具在截断超长行时按 UTF-16 码元切割，若切在代理对（如 emoji 等双字符）中间，会生成孤立的高代理项。被持久化进会话日志后，`JSON.stringify` 将其写成非法的 `\ud83d` 序列。导致该会话后续的每一次请求都被 DeepSeek Messages 端点整体拒绝（400），且因脏数据已在历史中，**会话不可恢复**。
3.  **[高] 压缩机制引发的恶性死循环**
    *   相关讨论: [#7501](https://github.com/deepseek-ai/deepseek-harness/discussions/7501), [#9635](https://github.com/deepseek-ai/deepseek-harness/discussions/9635)
    *   现象: 深度搜索中上下文被频繁压缩（5分钟内触发 6 次），伴随 `summary-not-smaller` 空转。压缩后的摘要在重新回放时发生 Token 溢出，最终导致会话永久不可用。
4.  **[中] 压缩请求完全绕过 Provider 前缀缓存**
    *   相关讨论: [#1944](https://github.com/deepseek-ai/deepseek-harness/discussions/1944)
    *   现象: 触发 Compaction 时，生成的 summarizer 请求未继承 `reasoningEffort` 且额外增加了 `maxTokens`，导致请求无法命中前缀缓存，白白消耗大量 Token 和成本。

## 6. 功能请求与路线图信号

1.  **桌面版增加 `Ctrl+F` 会话内文本搜索** ([#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713))
    用户提供了底层已支持全文检索的证据及可运行的原型插件。鉴于实现成本极低且体验提升明显，大概率会被作为快速功能（Quick Win）纳入下一版桌面端更新中。
2.  **支持 DeepSeek 之外的 OAuth 认证体系（如 ChatGPT/OpenAI）**
    用户通过第三方插件（Codex Connect）尝试打通 ChatGPT 和 OpenAI 模型 ([#881](https://github.com/deepseek-ai/deepseek-harness/discussions/881))。虽然官方未直接内置，但社区插件的繁荣证明了多模型路由是未来的需求方向。
3.  **增强 Agent 的长任务调度能力**
    针对 [#5072](https://github.com/deepseek-ai/deepseek-harness/discussions/5072) 暴露的轮询死循环，路线图应包含“轮次预算限制”和“状态去重/循环检测”机制，以提升长任务下的稳定性并节约 Token。

## 7. 用户反馈摘要

*   **痛点/不满意**:
    *   **平台覆盖不均衡**: Linux 用户被长期边缘化，不得不使用其他工具“勉强度日”（#8107）。
    *   **稳定性受挫**: 升级至 4.1 后传输层频繁断连（#6987）；Windows 沙箱无法使用（#1847, #10010, #10066）；甚至会出现一个偶发的编码错误导致整个会话永久报废（#8846）。
*   **满意/积极场景**:
    *   **社区工程能力**: 社区不仅提报 Bug，还能深度追踪到 C++/Node/Electron 层级（如定位到 Electron GUI-subsystem 的 0xC0000142 错误，以及 UTF-16 代理对截断），并附带探针脚本与原型代码（#8713, #10010），这种高质量的反馈极大地加速了官方排障。
*   **经济考量**:
    *   用户极度关注 Token 消耗。在 PTC（Prefix Context/Ticket）模式下，由于压缩机制缺陷，小任务的 Token 用量从 70M 飙升至 100M（#4758），成本问题成为阻碍重度使用的主要顾虑。

## 8. 待处理积压

*   **Windows 0xC0000142 沙箱崩溃**: 此问题自 8 月 15 日首次报告（#1847）起，历经 10 月 17 日在 `0.2.1-rc` 阶段的多轮复现（#10010, #10066），至今已持续近两个月且未能在 RC 阶段修复。由于阻碍了 Windows 用户核心功能的使用，必须作为**最高优先级**在下一个 Release 中阻断性解决。
*   **UTF-16 截断导致的 400 永久错误** ([#8846](https://github.com/deepseek-ai/deepseek-harness/discussions/8846)): 自 10 月 4 日提出，属于数据持久化层面的深层逻辑缺陷。维护者需紧急评估该截断逻辑，修复 `dsh-tool-fs` 的字符编码处理，并考虑是否需要对已有脏数据会话提供清理/恢复脚本。
*   **桌面端 Web 认证溢出** ([#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924)): 自 10 月 17 日起有 18 条评论，属于 Web 端常规缺陷，需要安排清理过期或冗余的 `dsh-auth-*` Cookie 策略。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*