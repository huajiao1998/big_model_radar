# OpenClaw 生态日报 2026-10-09

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-09 01:32 UTC

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

**日期**: 2026-10-09
**数据来源**: OpenClaw (github.com/openclaw/openclaw)

## 1. 今日速览

今日项目社区活跃度处于高位，过去 24 小时内产生 500 条 Issues 更新及 500 条 PR 更新。其中，新开辟和活跃的 Issue 达到 403 条，显示大量用户关注当前版本的行为异常。版本 v2026.9.9 于近期发布，包含 185 个 commits 和 112 个 PRs，但更新日志显示存在较多针对稳定性和状态管理的修复。整体上看，核心痛点集中在 Gateway 事件循环阻塞、进程资源泄漏以及多版本升级路径的兼容性验证上。社区对底层状态锁（session state）和崩溃循环（crash-loop）的关注度极高，反映出系统在处理大规模并发和长连接场景下的稳定性亟待加强。

## 2. 版本发布

### v2026.9.9
- **发布说明**: 包含 185 commits 和 112 pull requests，由 92 位贡献者共同参与。
- **主要变更**: 本次版本重点在于内部架构的清理与状态管理的强化。
- **破坏性变更与迁移**: 根据 Issue [#142585](https://github.com/openclaw/openclaw/issues/142585) 和 [#136203](https://github.com/openclaw/openclaw/issues/136203)，升级过程中的 Doctor 组件在缺乏标准行（canonical rows）时会拒绝处理旧的 legacy workspace 配置，导致部分用户从旧版本迁移受阻。建议升级前手动检查认证与配置迁移路径。

## 3. 项目进展

今日合并与关闭的工作主要集中在状态持久化与资源管理上：
- **架构与 Worker 优化**: 针对 catalog worker 架构的修复已合入，解决了因 worker 导入导致的架构检查失败问题 ([PR #167556](https://github.com/openclaw/openclaw/pull/167556))。
- **数据库压力降低**: 简化了 Gateway 数据库在 profile 标签和分享过程中的工作，减少了 SQLite 的重复查询 ([PR #167520](https://github.com/openclaw/openclaw/pull/167520))。
- **插件捕获逻辑**: 解决了 Gateway 启动时因重新捕获远程模型目录中大型插件而导致的分钟级阻塞问题 ([PR #167544](https://github.com/openclaw/openclaw/pull/167544))。
- **多 Agent 协作**: 在 session controller 重构中，强化了单个 controller 对 turn、queue 和 Stop 的所有权，解决了并发导致的回复丢失问题 ([PR #165957](https://github.com/openclaw/openclaw/pull/165957))。

## 4. 社区热点

社区讨论最密集的热点主要集中在以下几个核心链路：
- **事件循环阻塞**: 用户强烈反馈同步 Agent 持久化与 transcript 维护阻塞了 Gateway 事件循环 ([Issue #119720](https://github.com/openclaw/openclaw/issues/119720))，这直接导致了大规模部署下的性能下降。
- **进程僵尸与泄漏**: 多个报告指出 OpenClaw 会泄漏未收割的 hook/tool 子进程，导致系统资源枯竭 ([Issue #97616](https://github.com/openclaw/openclaw/issues/97616))。
- **升级卡死**: 升级 2026.9.8 到 2026.9.9 时，用户遭遇了 "recovery permissions are unsafe" 错误，导致更新路径中断 ([Issue #167376](https://github.com/openclaw/openclaw/issues/167376))。

**分析**: 这些热点反映了核心用户对生产环境可用性的严苛要求。Gateway 的健检和自愈机制（Self-healing）在遇到状态不一致时过于保守，导致服务长时间处于不可用状态。

## 5. Bug 与稳定性

**P0 级崩溃/阻塞 (已有 Fix PR 或正在处理)**
- **Gateway 启动阻塞**: 启动时 40-200s 的事件循环阻塞导致健康监控误判为断连并进入重启循环 ([Issue #162211](https://github.com/openclaw/openclaw/issues/162211))。
- **Windows 升级卡死**: Doctor 维护程序在升级 2026.9.7 时进行重复的 hardlink 验证，耗时超过 35 分钟 ([Issue #162047](https://github.com/openclaw/openclaw/issues/162047)，已通过 [#167376](https://github.com/openclaw/openclaw/issues/167376) 关联修复)。
- **Turn Claim 未释放**: 会话内任务超时后，90+ 分钟的会话卡死（wedge）问题 ([Issue #157255](https://github.com/openclaw/openclaw/issues/157255))。

**P1 级行为异常**
- **SSE 流挂起**: OpenAI-completions 的 SSE 流在 48 分钟无响应后，监控看门狗因 `stream_progress` 频繁触发而无法正常工作 ([Issue #145203](https://github.com/openclaw/openclaw/issues/145203))。
- **多模态消息卡死**: WhatsApp 1:1 接收图片后，主通道在处理前会卡顿约 3 分钟 ([Issue #96834](https://github.com/openclaw/openclaw/issues/96834))。
- **多 Agent 权限问题**: Claude CLI 多 Agent 团队模式下的权限验证失败，导致上下文丢失 ([Issue #164972](https://github.com/openclaw/openclaw/issues/164972))。

## 6. 功能请求与路线图信号

- **会话重置钩子**: 用户要求在 session reset/prune 时触发 `session-memory` hook，而非仅在 compaction 时触发，以适应定时重置场景 ([Issue #51572](https://github.com/openclaw/openclaw/issues/51572))。
- **多模型 Failover**: 请求在 compaction 和 LCM 操作中支持 fallback model chain，避免单一模型限流导致会话无界增长 ([Issue #56781](https://github.com/openclaw/openclaw/issues/56781))。
- **A2A 单向派发**: 针对 Agent-to-Agent 消息传递，引入不带有 ping-pong 回应的 dispatch-only 模式 ([Issue #44309](https://github.com/openclaw/openclaw/issues/44309))。

**路线图表征**: 现有 PR 正在推进 context-pressure-aware continuation ([PR #129388](https://github.com/openclaw/openclaw/pull/129388))，这表明官方正致力于解决长会话下的资源压力与持续性问题。

## 7. 用户反馈摘要

- **痛点**: 用户最不满意的地方在于升级后的“静默失败”。例如，Doctor 工具在迁移失败时没有给出足够的诊断信息，导致用户在 macOS 和 Windows 上均需手动清理。
- **资源压力**: 在 8GB 内存的 macOS 虚拟机上，长期存活的 Codex 子进程会导致严重的 CPU 和内存压力，甚至影响系统响应速度 ([Issue #156674](https://github.com/openclaw/openclaw/issues/156674))。
- **场景**: 大多数重度用户正在尝试将 OpenClaw 部署在 Docker 容器中，但发现环境变量（如 `XDG_CONFIG_HOME`）在安装 skill 时未被正确解析 ([Issue #53628](https://github.com/openclaw/openclaw/issues/53628))。

## 8. 待处理积压

以下长期未响应的重要问题建议维护者优先介入：
- [#97616](https://github.com/openclaw/openclaw/issues/97616) (2026-06-29): 子进程僵尸累积。
- [#45494](https://github.com/openclaw/openclaw/issues/45494) (2026-03-13): Cron 任务在 LLM API 故障期间静默超时。
- [#119720](https://github.com/openclaw/openclaw/issues/119720) (2026-08-05): 同步持久化阻塞 Gateway 循环。
- [#138087](https://github.com/openclaw/openclaw/pull/138087): 一个 XL 规模的大型 PR，涉及 context budget 回退问题，目前状态为 "needs proof"。

**数据驱动健康度评估**: 项目今日在 PR 活跃度上保持高位，但 P0/P1 级 Bug 的密度较高。建议维护者在下个迭代中将“状态数据库锁机制”与“更新路径健壮性”作为最高优先级的稳定性目标。

---

## 横向生态对比

**个人 AI 助手与自主智能体开源生态横向对比分析报告 (2026-10-09)**

### 1. 生态全景
2026年10月，个人AI助手与自主智能体开源生态呈现出**“高并发、重稳定性、强多模态”**的总体态势。头部项目如 OpenClaw 和 hermes-agent 正经历剧烈的底层架构重构，以应对大规模并发下的资源泄漏与状态管理痛点；与此同时，中小规模项目如 QwenPaw 和 AstrBot 聚焦于桌面端体验优化与上下文持久化，试图在“个人助手”与“团队工具”之间寻找平衡。DeepSeek Harness 等新兴项目则处于会话格式迁移的阵痛期，数据兼容性成为当前社区最敏感的痛点。整体来看，生态正从单纯的功能堆叠转向**运行时自愈机制、跨会话记忆与多平台协议标准化**的深层竞争。

### 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release 状态 | 健康度评估 | 核心瓶颈 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 (403新/活跃) | 500 | v2026.9.9 | **高负载/高风险** | Gateway 事件循环阻塞、升级路径卡死、资源泄漏 |
| **hermes-agent** | 299 | 500 (394待合并) | v0.21.6 (Patch) | **高活跃/高响应** | Desktop 渲染重复、Windows 更新死锁、Scratch 数据静默删除 |
| **Zeroclaw** | 高频 (未计具体数) | 7 (今日合并) | 无 (v0.8.6待发布) | **稳步迭代** | Firejail 安全配置失效、Telegram 渠道阻塞、内存泄漏 |
| **QwenPaw** | 29 | 29 | v2.2.2-beta.4 | **良好/质量巩固** | 聊天记录持久化丢失、桌面端冷启动慢、页面加载失败 |
| **AstrBot** | 9 | 18 | 无 | **稳定/响应快** | 上下文压缩导致数据截断、Anthropic 协议兼容性问题 |
| **DeepSeek Harness** | N/A (Discussions 177) | N/A (无PR系统) | 0.1.x/0.2.0-rc | **高危/过渡期** | v3→v4 会话格式迁移崩溃、Windows 沙箱权限失效 |
| **PicoClaw** | 0 | 2 (长期OPEN) | 无 | **低活跃/停滞** | 维护者响应迟缓、UI 性能积压、新 Provider 扩展停滞 |

### 3. OpenClaw 在生态中的定位
*   **规模与复杂度**：OpenClaw 是生态中**体量最大、技术复杂度最高**的项目。其单版本包含 185 个 commits 和 112 个 PRs，且社区日均 500+ 的 Issue/PR 更新量远超其他项目，显示出其作为“重型基础设施”的地位。
*   **技术路线差异**：相比 hermes-agent 的“插件化+云原生”和 Zeroclaw 的“Rust 安全沙箱”，OpenClaw 采用**Gateway + Worker 的中心化架构**，并深度依赖 SQLite 进行状态管理。其当前的痛点（事件循环阻塞、状态锁竞争）反映了单进程模型在大规模并发下的极限。
*   **竞争态势**：OpenClaw 在“多 Agent 协作”和“多模态通道（WhatsApp等）”方面领先，但在**升级健壮性**上显著落后于 hermes-agent（v0.21.6 补丁快速响应）。其 Doctor 组件在迁移时的保守策略导致了大量用户卡死，这是目前阻碍其进一步拓展企业级用户的主要短板。

### 4. 共同关注的技术方向
多个项目在同一时间窗口内涌现出高度一致的技术诉求，反映出行业通用痛点：

| 技术方向 | 涉及项目 | 具体诉求 |
| :--- | :--- | :--- |
| **会话/上下文持久化与防丢失** | QwenPaw, AstrBot, DeepSeek Harness, OpenClaw | 解决聊天记录“静默丢失”、上下文压缩导致的历史截断、以及会话格式迁移中的数据损坏（DeepSeek v3→v4）。用户要求将持久化逻辑从“尽力而为”提升至“强一致性”。 |
| **多模态能力增强** | Zeroclaw, QwenPaw, PicoClaw, hermes-agent | Zeroclaw 优化图像缩放而非丢弃；QwenPaw 增加 `view_audio` 工具；PicoClaw 扩展多 Provider 支持。多模态不再仅是输入，更涉及输出（如图像 EXIF 保留、音频理解）的精细化处理。 |
| **Agent-to-Agent (A2A) 互操作性** | OpenClaw, Zeroclaw | OpenClaw 请求 A2A 单向派发模式；Zeroclaw 提案 `zeroclaw-a2a` crate。生态正从“单体助手”向“多智能体网络”演进，需要标准化的轻量级消息协议。 |
| **运行时自愈与资源管理** | OpenClaw, hermes-agent, Zeroclaw | 解决僵尸进程泄漏（OpenClaw #97616, hermes #121095）、事件循环阻塞（OpenClaw #119720）以及内存泄漏（Zeroclaw #11614）。强调“自我清理”机制和看门狗的可靠性。 |

### 5. 差异化定位分析

*   **功能侧重**：
    *   **OpenClaw & hermes-agent**：侧重**大规模并发**与**多端同步**（Desktop/Web/TUI）。hermes-agent 强调插件解耦（如 Spotify 移出核心），OpenClaw 强调底层 Gateway 稳定性。
    *   **QwenPaw & AstrBot**：侧重**即时通讯集成**与**垂直场景**（QQ/Discord/WhatsApp）。AstrBot 对 Anthropic 协议的深度兼容使其成为国产模型（DeepSeek等）的最佳开源网关之一。
    *   **Zeroclaw & PicoClaw**：侧重**轻量化**与**嵌入式/边缘部署**。Zeroclaw 使用 Rust 构建安全沙箱（Firejail），PicoClaw 面向低资源环境，注重前端性能与 Provider 适配。
    *   **DeepSeek Harness**：侧重**会话管理**与**文档化处理**，具有强烈的 IDE/工作台属性，而非传统聊天助手。

*   **目标用户**：
    *   **开发者/极客**：hermes-agent（复杂配置、插件生态）、Zeroclaw（安全沙箱、Rust 生态）。
    *   **大众用户/团队**：QwenPaw（多租户 Hub、桌面端体验）、AstrBot（中文 IM 生态、易用性）。
    *   **数据敏感型用户**：DeepSeek Harness（会话版本控制、记忆管理）。

*   **技术架构关键差异**：
    *   **语言与运行时**：Zeroclaw (Rust, 高安全), OpenClaw (Node/Python混合, 高灵活性), hermes-agent (Python, 高插件性), QwenPaw (Tauri/Rust+Web前端, 桌面原生体验)。
    *   **状态管理**：OpenClaw 依赖 SQLite 状态锁（当前瓶颈）；DeepSeek Harness 依赖版本化 JSON 格式（迁移痛点）；QwenPaw/AstrBot 依赖数据库持久化层。

### 6. 社区热度与成熟度分层

*   **第一梯队：快速迭代与架构重构期**
    *   **OpenClaw** & **hermes-agent**：处于“破”的阶段。OpenClaw 正在重构状态锁与 Gateway 循环，hermes-agent 正在整合 2000+ PR 并解决渲染/更新死锁。社区活跃度最高，但 P0/P1 级 Bug 密度也最高，适合追求最新特性且能承受不稳定性的早期采用者。
    *   **Zeroclaw**：处于“立”的阶段。Rust 重写带来的安全红利正在兑现，v0.8.6 即将发布，代码质量提升明显，适合对安全性有严苛要求的用户。

*   **第二梯队：质量巩固与体验打磨期**
    *   **QwenPaw** & **AstrBot**：处于“稳”的阶段。QwenPaw 通过 Beta 版本快速收敛 UI/UX 问题，AstrBot 在协议兼容性上表现优异。这两个项目更适合生产环境或日常高频使用，稳定性优于第一梯队。

*   **第三梯队：特定领域深耕或停滞**
    *   **DeepSeek Harness**：处于“危”的阶段。v3→v4 的格式迁移引发大量数据损坏报告，官方响应机制（Discussions 而非 Issues）效率较低，存在用户流失风险。
    *   **PicoClaw**：处于“滞”的阶段。维护者响应迟缓，核心 PR 积压超过一个月，项目活力显著低于同行，面临被边缘化的风险。

### 7. 值得关注的趋势信号
基于 2026-10-09 的动态，对 AI 智能体开发者有如下参考价值：

1.  **从“聊天机器人”向“长时程自主智能体”进化中的信任危机**：
    *   所有头部项目都在努力解决“记忆丢失”和“状态不一致”问题。用户不再容忍“AI 忘了我刚才说的话”，**持久化一致性**正成为与“模型智能度”同等重要的核心指标。建议开发者在架构设计初期就将**事务性会话存储**作为一等公民。

2.  **多模态处理的精细化与标准化**：
    *   从 Zeroclaw 的图像缩放策略到 QwenPaw 的音频理解，单纯的“支持图片/视频”已不足够。趋势是**模态保真度**（如保留 EXIF、防止静默丢弃）和**多模态上下文管理**（如 OpenClaw 的 context-pressure-aware continuation）。

3.  **安全沙箱成为标配而非选配**：
    *   Zeroclaw 的 Firejail 配置修复、OpenClaw 的子进程泄漏、DeepSeek Harness 的 Windows 沙箱权限问题，均指向同一趋势：**自主智能体的操作权限必须被严格隔离**。Rust 等内存安全语言在助手运行时层的渗透率将进一步提升，以解决 C++/Node 系项目常见的内存与进程管理漏洞。

4.  **A2A 协议的碎片化与标准化需求**：
    *   OpenClaw 和 Zeroclaw 均在探索 Agent-to-Agent 通信，但路径不同（单向派发 vs Crate 模块）。行业缺乏统一的轻量级 A2A 协议标准，开发者应关注 A2A 协议的演化，以便未来实现跨生态的智能体协作。

5.  **平台特异性（Windows/macOS）成为主要摩擦点**：
    *   hermes-agent 的 Windows 更新死锁、DeepSeek Harness 的盘符大小写问题、OpenClaw 的 macOS 内存压力，表明**跨平台原生体验**的差距正在扩大。对于以 Web/CLI 为主的智能体，向桌面端（Tauri/Electron）下沉时，底层系统 API 的差异（如文件锁、进程管理）是主要的稳定性杀手。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**日期**：2026-10-09
**数据范围**：过去 24 小时（截至 2026-10-09 00:00 UTC）

## 1. 今日速览
Zeroclaw 项目处于高活跃开发状态，过去 24 小时内 Issues 与 PR 更新频繁，社区参与度较高。核心维护者 @Audacity88 和贡献者 @IftekharUddin 持续推进架构清理、安全策略修复及 ZeroCode TUI 体验优化。尽管暂无新版本发布，但大量 PR 标记为 `release:v0.8.6` 或 `release:v0.9.0`，表明版本迭代正在密集推进中。安全性与运行时稳定性是今日修复的重点，涉及内存泄漏、Telegram 渠道阻塞及 Firejail 配置失效等高优先级问题。

## 2. 版本发布
**无新版本发布。**
*(注：多个 PR 标记了 `release:v0.8.6`，预计即将发布)*

## 3. 项目进展
今日共关闭/合并 7 个 PR，主要涵盖测试稳定性修复、文档完善及安全策略修正：

*   **测试稳定性修复**：修复了 macOS 硬件测试中的竞态条件问题 ([#11396](https://github.com/zeroclaw-labs/zeroclaw/pull/11396))，以及 RPC 和 Daemon 测试中的锁持有问题 ([#11349](https://github.com/zeroclaw-labs/zeroclaw/pull/11349), [#11395](https://github.com/zeroclaw-labs/zeroclaw/pull/11395))。这些修复提升了 CI 的可靠性，为后续合并扫清了障碍。
*   **安全策略增强**：合并了针对 Unix 系统下 `/dev/null` 识别错误的修复 ([#11469](https://github.com/zeroclaw-labs/zeroclaw/pull/11469))，确保在所有主机上正确识别 null 设备，防止潜在的路径解析漏洞。
*   **文档与架构规范化**：合并了工具库存文档 ([#11305](https://github.com/zeroclaw-labs/zeroclaw/pull/11305)) 和运行时组合契约提案 ([#11090](https://github.com/zeroclaw-labs/zeroclaw/pull/11090))，进一步明确了 v0.8.6 版本中工具分层的定义及运行时 API 的规范。
*   **确定性测试**：修复了 Skills 模块缓存时间戳测试的不确定性 ([#11380](https://github.com/zeroclaw-labs/zeroclaw/pull/11380))。

## 4. 社区热点
今日讨论最活跃的 Issues 和 PRs 集中在架构决策与安全机制上：

*   **维护者决策队列** ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692))：该 Tracker 拥有 15 条评论，是项目架构演进的核心枢纽。主要讨论涉及 RFC 的验收、推迟或拆分策略，反映了项目对长期架构一致性的重视。
*   **多模态图像限制优化** ([#9887](https://github.com/zeroclaw-labs/zeroclaw/issues/9887))：用户 @NiuBlibing 提出应支持图像“缩放”而非直接丢弃，并允许通过设置为 0 禁用大小限制。该 Issue 标记为 `status:blocked` 但被 `accepted`，表明这是一个高优先级的用户体验痛点。
*   **工具库存类型化** ([#11308](https://github.com/zeroclaw-labs/zeroclaw/pull/11308))：作为 v0.8.6 的关键特性，该 PR 引入了带层级的内置工具库存。这是为了支持插件系统更精细的安全控制，目前处于开放待合并状态，标记为 `release-gate`。
*   **RPC 契约提取** ([#11165](https://github.com/zeroclaw-labs/zeroclaw/pull/11165))：一个大型重构 PR，旨在将 RPC 线协议提取到独立 crate `zeroclaw-rpc-proto` 并添加 OpenRPC 漂移检查。这是 v0.9.0 版本的重要架构基座。

## 5. Bug 与稳定性
今日报告了多个高严重性 Bug，其中部分已有对应的修复 PR 或正在开发中：

*   **[P1] Telegram 语音更新无限重试阻塞消息** ([#10863](https://github.com/zeroclaw-labs/zeroclaw/issues/10863))：
    *   **问题**：被拒绝的语音更新导致长轮询停止，阻塞后续所有消息。
    *   **状态**：已接受，标记为 `follow-up`。
*   **[P1] Firejail 参数配置失效** ([#11594](https://github.com/zeroclaw-labs/zeroclaw/issues/11594))：
    *   **问题**：`firejail_args` 在配置中暴露但从未实际传递给 firejail 调用，导致沙箱安全策略降级。
    *   **状态**：已接受，尚未见修复 PR。
*   **[P1] `map_key_sections` 内存泄漏** ([#11614](https://github.com/zeroclaw-labs/zeroclaw/issues/11614))：
    *   **问题**：每次调用均泄漏格式化的 schema 路径，导致守护进程内存持续增长。
    *   **状态**：新报告，高优先级。
*   **[P2] 多模态图像超限直接丢弃** ([#9887](https://github.com/zeroclaw-labs/zeroclaw/issues/9887))：
    *   **问题**：大尺寸图像被拒绝而非缩放，影响多模态体验。
    *   **状态**：已接受，处于 parked 状态。
*   **[P3] ZeroCode 侧边栏状态错误** ([#11586](https://github.com/zeroclaw-labs/zeroclaw/issues/11586))：
    *   **问题**：守护进程重启后，失败的会话在侧边栏错误地显示为绿色“就绪”状态。
    *   **状态**：低优先级。

## 6. 功能请求与路线图信号
*   **A2A 协议支持** ([#11254](https://github.com/zeroclaw-labs/zeroclaw/issues/11254))：RFC 提议创建 `zeroclaw-a2a` crate，以支持 Agent-to-Agent 通信。这是项目扩展生态互操作性的重要信号，目前处于 `needs-author-action` 阶段。
*   **CLI 用户生命周期管理** ([#11265](https://github.com/zeroclaw-labs/zeroclaw/pull/11265))：正在开发 `zeroclaw user` 命令，用于管理用户名册和生命周期。该 PR 体积较大（XL），涉及身份访问控制，预计将纳入近期版本。
*   **Tailscale 隧道增强** ([#11530](https://github.com/zeroclaw-labs/zeroclaw/pull/11530))：修复了 Tailscale 模式下 WSS 和注册端点未正确发布的问题，使得本地绑定的守护进程可通过 Tailnet 访问。
*   **插件 Webhook 支持** ([#11320](https://github.com/zeroclaw-labs/zeroclaw/pull/11320))：通过核心 RPC 分发插件 Webhook，增强插件与外部系统的交互能力。

## 7. 用户反馈摘要
*   **痛点**：用户频繁反馈 **ZeroCode TUI** 的体验问题，包括消息队列丢失 ([#11618](https://github.com/zeroclaw-labs/zeroclaw/issues/11618))、`ask_user` 提示被丢弃 ([#11623](https://github.com/zeroclaw-labs/zeroclaw/issues/11623)) 以及转录记录中缺少时间戳 ([#11620](https://github.com/zeroclaw-labs/zeroclaw/issues/11620))。这表明 ZeroCode 作为主要交互界面，其可靠性亟需提升。
*   **场景**：企业或高级用户在部署中遇到 **Telegram 渠道** 的稳定性问题（429 限流处理不当 [**#11615**](https://github.com/zeroclaw-labs/zeroclaw/issues/11615)）和 **成本计算错误**（忽略 `total_tokens` 导致 Gemini 等模型计费偏低 [**#11613**](https://github.com/zeroclaw-labs/zeroclaw/issues/11613)）。
*   **安全敏感性**：用户 @DefuzeX 团队报告了 **Shell 命令重复执行导致的 Agent 循环中断** 问题 ([#11612](https://github.com/zeroclaw-labs/zeroclaw/issues/11612))，反映了安全监督模式下对行为一致性的严格要求。

## 8. 待处理积压
*   **RFC 决策队列** ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692))：虽然持续活跃，但作为“维护者决策队列”，其积压的 RFC 和设计问题可能影响新功能的快速落地。建议维护者定期清理该队列，明确接受或拒绝标准。
*   **Provider 别名探测修复** ([#9592](https://github.com/zeroclaw-labs/zeroclaw/issues/9592))：该 P1 优先级 Bug 自 7 月创建以来仍处于 `in-progress` 状态，涉及模型路由更新后的凭据读取问题。需关注其是否阻碍了后续 Provider 相关功能的发展。
*   **大型重构 PR** ([#11165](https://github.com/zeroclaw-labs/zeroclaw/pull/11165), [#11265](https://github.com/zeroclaw-labs/zeroclaw/pull/11265), [#11320](https://github.com/zeroclaw-labs/zeroclaw/pull/11320))：这些 XL 级别的 PR 依赖于多个其他分支，可能存在合并冲突或长周期审查风险。建议核心团队协调依赖关系，避免阻塞主线开发。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期**：2026-10-09
**数据源**：GitHub [sipeed/picoclaw](https://github.com/sipeed/picoclaw)

## 1. 今日速览
过去 24 小时内，PicoClaw 项目呈现出**低活跃度、高等待**的状态。
- **版本发布**：无新版本发布。
- **代码变更**：无 PR 被合并或关闭，项目主干代码在过去 24 小时内保持稳定，未发生结构性变更。
- **社区交互**：Issues 更新为 0，社区讨论暂时停滞；PR 侧有 2 个待合并请求处于活跃状态（最近更新时间为 10-08），主要集中在后端 Provider 扩展和前端性能优化。
- **健康度评估**：项目处于“静默维护期”，虽无紧急 Bug 阻断，但核心维护者对现有 PR 的响应速度较慢（部分 PR 创建时间已追溯至 8 月/9 月），建议关注维护者近期动向。

## 2. 版本发布
**状态**：无
过去 24 小时内无新的 Release 发布，最新版本状态保持不变。

## 3. 项目进展
**状态**：停滞
过去 24 小时内**没有** PR 被合并（Merged）或关闭（Closed）。
- 这意味着项目在过去一天内没有新增功能落地或 Bug 修复进主干分支。
- 目前所有进展均处于“待审查”或“待合并”状态，项目并未在代码层面实质向前迈进。

## 4. 社区热点
**状态**：无高热度讨论
过去 24 小时内 Issues 更新为 0，且现有的 2 个 PR 评论数显示为 `undefined`（通常意味着极少或无公开评论），👍 数均为 0。
- **分析**：社区当前缺乏高互动热点。没有用户发起新的功能讨论或投诉。社区注意力集中在内部开发流程而非外部讨论。

## 5. Bug 与稳定性
**状态**：无新增报告
过去 24 小时内**没有**新的 Issue 被开立，也**没有**针对已有 Bug 的紧急修复 PR 被合并。
- 项目主干在当前时间点是“冻结”的，没有回归风险引入，也没有新发现的崩溃报告。

## 6. 功能请求与路线图信号
通过观察待合并 PR，可以推断项目近期的开发重点：

1.  **多模态/多供应商支持扩展**
    - **信号**：PR #3371 正在添加 `opencode-go` provider。
    - **分析**：PicoClaw 正在积极扩展其 AI 后端能力，支持更多非标准 OpenAI 接口的 Provider。这表明路线图倾向于增强工具的通用性和适配性，让用户可以灵活接入不同的 LLM 服务。
2.  **前端体验优化**
    - **信号**：PR #3347 修复了 Web UI 在大量文本下的卡顿问题。
    - **分析**：项目开始重视客户端性能，尤其是在移动端和桌面端浏览器（如 Brave）上的流畅度。这可能暗示项目正从纯后端逻辑转向关注完整用户体验（UX）。

**注意**：由于这两个 PR 均未被合并，这些功能尚未正式纳入路线图或生效。

## 7. 用户反馈摘要
**状态**：无有效数据
由于过去 24 小时 Issues 更新为 0，且 PR 评论数据缺失，无法从官方渠道提炼出新的用户痛点或满意度反馈。
- **潜在痛点（基于 PR #3347 摘要）**：用户在使用 PicoClaw Web UI 进行长对话或处理大量文本时，遭遇了明显的界面卡顿（Laggy Interface），这影响了桌面端和移动端的使用体验。

## 8. 待处理积压
**严重程度：中（响应延迟）**
存在两个 PR 长期处于 OPEN 状态且未被合并，存在维护瓶颈：

1.  **[Bug/Perf] #3347: Fix laggy interface**
    - **状态**：OPEN [stale]
    - **创建时间**：2026-08-27（已搁置 1 个多月）
    - **更新时间**：2026-10-08
    - **分析**：该 PR 被标记为 `[stale]`，说明它已经有一段时间没有实质性进展。这是一个影响用户体验的关键修复（UI 卡顿），被搁置超过 40 天。
    - **建议**：维护者需优先审查此 PR。虽然作者自称非 TS/Node 专家，但摘要称已通过 `picoclaw-launcher` 测试，若无重大逻辑错误，应尽快合并以提升用户体验。
    - 链接：https://github.com/sipeed/picoclaw/pull/3347

2.  **[Feature] #3371: Add opencode-go provider**
    - **状态**：OPEN
    - **创建时间**：2026-09-08（已搁置 1 个月）
    - **更新时间**：2026-10-08
    - **分析**：这是一个功能性增强，涉及新的 API Provider 适配。同样停滞了 1 个月。
    - **建议**：需确认是否仍在路线图内。如果团队决定支持 `opencode-go`，应加速审查；如果暂不支持，应回复作者以免长期占用资源。
    - 链接：https://github.com/sipeed/picoclaw/pull/3371

---
**总结建议**：
PicoClaw 目前处于低活跃状态。虽然代码库稳定，但**技术债务（UI 性能）和功能扩展（新 Provider）的积压正在累积**。建议维护者打破 `[stale]` 状态，对积压超过 1 个月的 PR 进行明确的“合并”或“关闭”决策，以恢复项目活力。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 (2026-10-09)

**项目**: QwenPaw (agentscope-ai/QwenPaw)
**数据来源**: GitHub Issues & PRs (过去 24 小时)

## 1. 今日速览
过去 24 小时 QwenPaw 社区保持高度活跃，Issue 与 PR 更新量均达到 29 条，显示出稳定的开发节奏。今日重点解决了多租户 Hub 相关的前端布局错乱及 Windows 桌面端设置界面 UI 问题，并修复了导致会话上下文污染的深层 Bug。虽然未发布正式新版本，但 v2.2.2-beta.4 的安装验证流程持续进行中，Beta 版稳定性正在通过社区反馈快速迭代。整体项目健康状况良好，社区对“聊天记录持久化”和“桌面端性能”的痛点关注度显著上升。

## 2. 版本发布
*   **无新版本发布**。
*   注：Issue #8053 显示 `v2.2.2-beta.4` 仍处于安装验证（Installation Verification）阶段，团队正通过关闭相关 Bug 来为正式版做准备。

## 3. 项目进展
今日关闭/合并了 12 个 Issue 和 6 个 PR，主要推进了以下方向：

*   **Bug 修复与稳定性增强**：
    *   修复了 `send_file_to_user` 产生的文件块污染会话上下文导致后续请求 400 错误的问题 ([#8022](https://github.com/agentscope-ai/QwenPaw/issues/8022), Closed)。
    *   解决了 DeepSeek Provider 在处理 PDF 文件时因序列化格式错误导致的 400 错误 ([#7883](https://github.com/agentscope-ai/QwenPaw/issues/7883), Closed)。
    *   修复了 Windows 单元测试失败问题，确保 Git 哈希验证资产字节一致性 ([#7870](https://github.com/agentscope-ai/QwenPaw/pull/7870), Merged)。
    *   修复了 Web 控制台设计导致的用户输入中断问题 ([#7948](https://github.com/agentscope-ai/QwenPaw/issues/7948), Closed)。
*   **UI/UX 优化**：
    *   统一并修复了桌面端设置界面的布局错乱问题 ([#8122](https://github.com/agentscope-ai/QwenPaw/issues/8122), Closed; [#8127](https://github.com/agentscope-ai/QwenPaw/pull/8127), Merged)。
    *   优化了 Settings 页面的头部样式，提升了视觉一致性 ([#8130](https://github.com/agentscope-ai/QwenPaw/pull/8130), Open, Under Review)。
*   **后端逻辑改进**：
    *   修复了 `TaskTracker` 在 Producer task 创建前注册 Run 导致的潜在资源泄漏 ([#8007](https://github.com/agentscope-ai/QwenPaw/pull/8007), Open, Ready for Review)。
    *   将 Skill Pool 下载任务移至 Worker 线程，解决事件循环冻结问题 ([#8055](https://github.com/agentscope-ai/QwenPaw/pull/8055), Open, Under Review)。

## 4. 社区热点
*   **QwenPaw Hub 多租户版后续规划** ([#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318))
    *   **状态**: Open | **评论**: 34 | **👍**: 4
    *   **分析**: 这是今日讨论最热烈的话题。用户期待在 2.2.0 推出的多租户 Hub 基础上，进一步构建团队级协作功能。高评论量表明社区对从“个人助手”向“团队工具”转型有强烈需求，维护者需明确下一阶段的路线图。
*   **聊天记录持久化与上下文丢失** ([#8134](https://github.com/agentscope-ai/QwenPaw/issues/8134), [#7884](https://github.com/agentscope-ai/QwenPaw/issues/7884))
    *   **状态**: Open/Closed | **评论**: 4/9
    *   **分析**: 用户强烈抱怨“聊天记录说没就没了”，认为这与大模型上下文窗口无关，而是本地存储逻辑缺陷。这是当前用户体验的最大痛点之一，情绪较为激动。
*   **桌面端冷启动性能** ([#8115](https://github.com/agentscope-ai/QwenPaw/issues/8115))
    *   **状态**: Open | **评论**: 2
    *   **分析**: 用户报告 Tauri 桌面端冷启动需 11 秒且存在 WebView2 进程静默死亡问题。性能优化已成为桌面端用户保留的关键因素。

## 5. Bug 与稳定性
按严重程度排列：

| 严重程度 | Issue/PR | 描述 | 状态 | Fix PR |
| :--- | :--- | :--- | :--- | :--- |
| **High** | [#8116](https://github.com/agentscope-ai/QwenPaw/issues/8116) | 消息队列严重逻辑错误：已处理消息重复发送；会话状态判断错误 | Open (Need Info) | 无 |
| **High** | [#8120](https://github.com/agentscope-ai/QwenPaw/issues/8120) | 2.2.2b4 版本页面加载失败频率极高，多设备复现 | Open | 无 |
| **High** | [#8110](https://github.com/agentscope-ai/QwenPaw/issues/8109) | API 流错误导致会话 100% 丢失，无恢复机制 | Closed | - |
| **Medium** | [#8125](https://github.com/agentscope-ai/QwenPaw/issues/8125) | llama.cpp `has_update()` 第三次导致用户安装的 Runtime 被静默回滚 | Open | 无 |
| **Medium** | [#8123](https://github.com/agentscope-ai/QwenPaw/issues/8123) | Daily Paper 功能在模型输出截断时整体失败，缺乏单条重试机制 | Open | 无 |
| **Medium** | [#8129](https://github.com/agentscope-ai/QwenPaw/issues/8129) | 图像缩放丢失 EXIF 方向信息，导致模型收到错误方向的图片 | Open | [#8136](https://github.com/agentscope-ai/QwenPaw/pull/8136) (Open) |
| **Low** | [#8117](https://github.com/agentscope-ai/QwenPaw/issues/8117) | 无法从 Provider 的 `max_tokens` 上下文拒绝中恢复 | Open | 无 |

*   **注意**：`#8116` 和 `#8120` 为 2.2.2b4 新增的高频稳定性问题，需优先关注。

## 6. 功能请求与路线图信号
*   **自定义 Skill/Plugin 市场源** ([#8015](https://github.com/agentscope-ai/QwenPaw/issues/8015))
    *   支持自托管/内网部署。PR [#8128](https://github.com/agentscope-ai/QwenPaw/pull/8128) 已将 Hub 移动至插件系统，为自定义市场源奠定了基础，预计将被纳入下一版本。
*   **Linux 兼容性 (Tauri -> Electron)** ([#8142](https://github.com/agentscope-ai/QwenPaw/issues/8142))
    *   用户因麒麟 V10 不支持 Tauri2 建议切换至 Electron。目前项目仍基于 Tauri，此请求可能涉及重大架构变更，需维护者评估。
*   **音频理解工具 `view_audio`** ([#8083](https://github.com/agentscope-ai/QwenPaw/pull/8083))
    *   社区贡献 PR，补齐图像/视频之外的音频模态。若被合并，将增强多模态能力。
*   **You.com 作为 Web Search Provider** ([#8139](https://github.com/agentscope-ai/QwenPaw/issues/8139))
    *   提供无需 API Key 的搜索后端，适合轻量级使用场景。
*   **Dream 调度预设 (Hourly)** ([#8112](https://github.com/agentscope-ai/QwenPaw/issues/8112))
    *   增加每小时记忆整合选项，提升后台自动化能力。

## 7. 用户反馈摘要
*   **痛点**：
    *   **数据安全感缺失**：用户对聊天记录丢失（#7884, #8134）反应激烈，认为这是核心功能缺陷。
    *   **桌面端体验**：Windows 桌面版在 UI 布局（#8122）、冷启动速度（#8115）及页面加载稳定性（#8120）上存在明显短板。
    *   **网络兼容性**：HTTP 非安全上下文下的剪贴板功能失效（PR #8138 修复中）。
*   **满意/积极面**：
    *   社区对多租户 Hub（#7318）的发布持欢迎态度，并积极参与后续功能讨论。
    *   针对 DeepSeek 等国内主流模型的适配问题（PDF 处理、400 错误）得到快速响应和关闭，用户信任度在回升。
    *   AI 辅助生成的 Bug 报告（如 #8022, #7883）结构清晰，帮助维护者快速定位问题。

## 8. 待处理积压
*   **长期未响应**：
    *   [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) (llama.cpp 回滚 Bug)：已创建 25 天且无 PR 提交，目前回归为 #8125。
    *   [#8009](https://github.com/agentscope-ai/QwenPaw/issues/8009) (媒体负载拒绝恢复)：PR #8010 已开放数周，处于 First-time-contributor 标签下，需人工审核推进。
*   **需关注**：
    *   PR [#7865](https://github.com/agentscope-ai/QwenPaw/pull/7865) (Chat stream self-healing)：旨在解决流中断后的自愈问题，是提升稳定性的关键 PR，目前处于 Under Review 状态，建议优先审查。
    *   Issue [#8116](https://github.com/agentscope-ai/QwenPaw/issues/8116)：消息队列问题被标记为 "invalid, need-info"，但用户反馈强烈且持续半年，建议重新评估其严重性而非直接关闭。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报 (2026-10-09)

### 1. 今日速览
过去 24 小时内，hermes-agent 项目维持了极高的社区活跃度，新增及活跃 Issue 达 299 条，PR 达 500 条（其中待合并 394 条，已合并/关闭 106 条）。项目刚刚发布 v0.21.6 补丁版本，该版本主要整合了自 v0.21.5 以来合并的约 2,100 个 PR，确保 Docker 和 Hermes Cloud 用户的稳定性。目前社区讨论的焦点集中在 Desktop 客户端的渲染稳定性、跨 Gateway 协作功能，以及 Windows 平台的更新安装体验，整体健康度处于高负载、高响应状态。

### 2. 版本发布
- **v0.21.6 (2026-10-08)**
  - **更新内容**: 这是一个补丁版本（Patch release），主要将自 v0.21.5 以来合并的约 2,100 个 PR 打包成稳定版本，供 Docker 和 Hermes Cloud 环境使用。
  - **迁移注意事项**: 完整的版本更新日志将在下一个主要版本 v0.22.0 中发布，本版本暂无重大破坏性变更说明。
  - **相关链接**: [v0.21.6 Release](https://github.com/NousResearch/hermes-agent/releases)

### 3. 项目进展
今日合关闭的 106 个 PR 表明项目正处于密集的代码整合与功能交付阶段。
- **性能优化**: 针对 `execute_code` 工具进行了内存优化（[PR #135388](https://github.com/NousResearch/hermes-agent/pull/135388)），防止大量打印输出导致内核内存无限膨胀。
- **功能增强与解耦**: Spotify 功能正在从核心代码库迁移至官方插件（[PR #135389](https://github.com/NousResearch/hermes-agent/pull/135389), [#135387](https://github.com/NousResearch/hermes-agent/pull/135387)），实现了核心逻辑的轻量化。
- **稳定性修复**: 修复了 TUI/Gateway 在客户端断开连接时，带有 `/loop` 或 `/heartbeat` 的任务无法继续后台执行的问题（[PR #135393](https://github.com/NousResearch/hermes-agent/pull/135393)），保障了无人值守场景的可靠性。

### 4. 社区热点
今日评论数最多的 Issue 反映了用户最核心的体验痛点与高阶需求：
1. **Desktop 渲染重复问题 ([#127665](https://github.com/NousResearch/hermes-agent/issues/127665))**: 56 条评论。用户密集反馈 Desktop 端在流式传输和会话折叠状态下，单条 AI 回复被重复渲染（与 #128468, #129993 同类问题）的 Bug。
2. **跨 Gateway Bot 协作 ([#97681](https://github.com/NousResearch/hermes-agent/issues/97681))**: 40 条评论。开发者 @dokterdok 提出的高阶 Feature，旨在建立个人 Agent 之间跨机器、跨 Owner 协作的基础设施，不牺牲主控权限。
3. **Solstice 插件加载失败 ([#134107](https://github.com/NousResearch/hermes-agent/issues/134107))**: 37 条评论。新版更新或安装后，因缺少 `httpx` 导致内置 `solstice` 插件报错，警告信息直接输出到 TUI 并打乱排版（#134220 也有类似反馈）。

### 5. Bug 与稳定性
按严重程度及影响面排列：
- **[P0] Scratch 目录静默删除数据 ([#132401](https://github.com/NousResearch/hermes-agent/issues/132401))**: Hermes 将系统临时变量指向 `~/.hermes/cache/scratch`，其 24h 自动清理机制会静默销毁多天的 Agent 任务数据，无日志无隔离。目前处于 `needs-decision` 状态，需紧急评估策略。
- **[P1] Windows 更新流程死锁 ([#125437](https://github.com/NousResearch/hermes-agent/issues/125437))**: 更新失败会导致半应用状态，且无内置修复手段。相关 PR [#134269](https://github.com/NousResearch/hermes-agent/pull/134269) 正在修复 macOS Desktop 更新时拒绝自身锁（exit code 2）的问题，Windows MSIX 更新问题见 [#135333](https://github.com/NousResearch/hermes-agent/pull/135333)。
- **[P2] 浏览器进程残留 ([#121095](https://github.com/NousResearch/hermes-agent/issues/121095))**: 每次调用 `browser_exec` 后，`browser_harness.daemon` 进程不会超时退出，导致长期积累僵尸进程。
- **[P2] 更新导致 Cron 依赖丢失 ([#96180](https://github.com/NousResearch/hermes-agent/issues/96180))**: `hermes update` 的 venv 重建过程会丢失可选的消息扩展（如 `python-telegram-bot`），导致定时任务静默失效。

### 6. 功能请求与路线图信号
- **工具调用上限自动连续**: 用户在 ACP 和长网关场景下，遇到达到最大工具调用次数时希望系统能自动受限继续，而非强制停止等待人工干预（[#16004](https://github.com/NousResearch/hermes-agent/issues/16004)）。
- **交互快捷键自定义**: 呼声较高的 UI 需求，希望 Desktop 端能自定义 Enter 换行和 Ctrl+Enter 发送，以符合不同聊天习惯（[#49422](https://github.com/NousResearch/hermes-agent/issues/49422)）。
- **自托管 Web 管理平台**: 社区新增 PR 引入了 Harness Mate，一个基于 WebSocket 的自托管 Web 管理平台，支持远程管理本地 Hermes Agent（[PR #135394](https://github.com/NousResearch/hermes-agent/pull/135394)），预示了项目向多端协同管理演进的信号。

### 7. 用户反馈摘要
- **痛点**: 用户对 Desktop 和 TUI 的视觉稳定性（渲染错位、重复气泡）表达强烈不满；部分用户反映在使用 1Password 服务账号时，Browser-vault 自动填密功能因未指定 `--vault` 导致无法正常工作（[#108335](https://github.com/NousResearch/hermes-agent/issues/108335)）。
- **场景**: 大量用户部署在受限或无头环境中（如使用 systemd 系统级部署），但 `hermes-gateway` 的诊断机制容易在此类环境下产生误报（[#36755](https://github.com/NousResearch/hermes-agent/issues/36755)）。
- **体验**: 随着插件生态的繁荣（如 Spotify 官方插件、hermes-muse），用户开始关注插件与核心系统的解耦是否彻底，以及安装脚本在特定环境（如 Termux）中的兼容性（[#76901](https://github.com/NousResearch/hermes-agent/issues/76901)）。

### 8. 待处理积压
- **API 权限异常 ([#131859](https://github.com/NousResearch/hermes-agent/issues/131859))**: 有账号报告无法通过 API 在特定 fork 上创建 PR（`CreatePullRequest` 权限报错），影响特定外部贡献者的提交链路，需管理员关注。
- **自动化集成受阻 ([#125727](https://github.com/NousResearch/hermes-agent/issues/125727))**: 34 条评论，Nous 到 Enterkey 的自动化合并因多文件冲突长期被阻塞，需人工介入清理。
- **长期未响应 P3 Bug**: 针对 Windows 特定更新场景的 runtime probe 超时错误（[#79087](https://github.com/NousResearch/hermes-agent/issues/79087)）及特定模型供应商（如 Kimi coding）的视觉能力支持（[#18990](https://github.com/NousResearch/hermes-agent/issues/18990)）已挂起较长时间，建议在下个版本的 backlog 评审中处理。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 (2026-10-09)

## 1. 今日速览
AstrBot 项目今日维持了较高的开发活跃度，过去 24 小时内共更新了 9 条 Issues（5 新开/活跃，4 关闭）和 18 条 Pull Requests（12 待合并，6 已合并/关闭），且未发布新版本。社区焦点集中在**上下文管理机制的稳定性**（压缩失忆、摘要模型重试卡顿）以及**多平台适配器（QQ、Discord、Anthropic 兼容协议）的协议对接缺陷**。维护团队响应迅速，针对今日新增的 3 个关键 Bug（摘要模型重试、Anthropic 流式工具调用、QQ 频道 Markdown 回退）已提交并关闭或合并了相应的修复 PR，显示项目具备较强的即时修复能力。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日共合并/关闭 6 个 PR，主要推进了核心稳定性与协议兼容性修复：

*   **上下文压缩稳定性修复**：合并 [`#10436`](https://github.com/AstrBotDevs/AstrBot/pull/10436) (`fix: fall back from a failed context summary without long retries`)，修复了摘要模型额度耗尽（HTTP 429）导致主模型切换后仍长时间卡顿、无法回复的问题。该修复解决了长会话中常见的“假死”现象。
*   **Anthropic 协议深度兼容**：合并 [`#10403`](https://github.com/AstrBotDevs/AstrBot/pull/10403) 与 [`#10437`](https://github.com/AstrBotDevs/AstrBot/pull/10437) (`fix(provider): merge custom_extra_body tools instead of replacing function tools`)，解决了在自定义请求体中声明服务端工具（如 DeepSeek 联网搜索）时静默覆盖 AstrBot 内部所有函数工具的问题。同时合并 [`#10432`](https://github.com/AstrBotDevs/AstrBot/pull/10432) (`fix(provider): keep Anthropic tool calls whose streamed input is empty`)，修复了流式模式下无参数工具调用被丢弃导致的 `EmptyModelOutputError`。
*   **插件生命周期管理**：关闭 [`#3182`](https://github.com/AstrBotDevs/AstrBot/pull/3182) (`feat: 新增两个插件生命周期事件钩子...`)，该 PR 因长期未合并被重新提交，旨在为插件联动和监控提供 `on_star_activated/deactivated` 钩子。

## 4. 社区热点
*   **上下文丢失与失忆问题（高热度）**：[`#9936`](https://github.com/AstrBotDevs/AstrBot/issues/9936) `[OPEN]` 是今日讨论最活跃的 Issue（6 条评论）。多位用户报告在不同版本（v4.26.0-beta.12 至 v4.27.4）及不同部署方式下，机器人长对话中突发“失忆”，数据库中的对话历史被永久截断且无处找回。该问题反映了上下文压缩算法在边界条件下的数据完整性风险，社区诉求强烈。
*   **QQ 频道消息回复受阻**：[`#10420`](https://github.com/AstrBotDevs/AstrBot/issues/10420) `[OPEN]` 报告 QQ 官方机器人在频道场景下，因 Markdown 回退顺序有误，误用主动消息导致触发 304049 限频错误，导致普通回复失败。该问题已有修复 PR [`#10451`](https://github.com/AstrBotDevs/AstrBot/pull/10451) 待合并。

## 5. Bug 与稳定性
按严重程度及影响面排列：

1.  **[严重/数据丢失] 上下文压缩导致历史丢失**：[`#9936`](https://github.com/AstrBotDevs/AstrBot/issues/9936) `[OPEN]`。
    *   **现象**：长对话中硬信息（URL、密钥、决策理由）被概括或消失，数据库历史被截断。
    *   **状态**：正在调查中，尚未有对应的 Fix PR 明确合并。
2.  **[中/平台适配] QQ 频道 Markdown 回退逻辑错误**：[`#10420`](https://github.com/AstrBotDevs/AstrBot/issues/10420) `[OPEN]`。
    *   **现象**：被动回复失败后降级为主动消息，触发限频。
    *   **状态**：已有 Fix PR [`#10451`](https://github.com/AstrBotDevs/AstrBot/pull/10451) `[OPEN]`。
3.  **[中/工具调用] 工具白名单误关系统内置工具**：[`#10456`](https://github.com/AstrBotDevs/AstrBot/issues/10456) `[OPEN]`。
    *   **现象**：人格设置中的工具勾选为白名单语义，勾选任意插件工具会导致不可见的系统内置工具（shell, python 等）失效。
    *   **状态**：新报告，暂无 Fix PR。
4.  **[低/交互体验] /del 指令报错 & /reset 语义变更**：[`#10375`](https://github.com/AstrBotDevs/AstrBot/issues/10375) `[OPEN]`。
    *   **现象**：最新版本中 `/del` 触发报错；`/reset` 从清理上下文变为等同于 `/new`，且 UI 集成化导致调试不便。
    *   **状态**：收集用户反馈中。
5.  **[已修复] 摘要模型重试卡顿**：[`#10433`](https://github.com/AstrBotDevs/AstrBot/issues/10433) `[CLOSED]`。
    *   **现象**：摘要模型 429 错误导致主模型切换无效，回复超时。
    *   **状态**：已由 [`#10436`](https://github.com/AstrBotDevs/AstrBot/pull/10436) 修复并关闭。
6.  **[已修复] Anthropic 无参工具流式调用异常**：[`#10431`](https://github.com/AstrBotDevs/AstrBot/issues/10431) `[CLOSED]`。
    *   **现象**：流式模式下空参数工具调用导致 `JSONDecodeError`。
    *   **状态**：已由 [`#10432`](https://github.com/AstrBotDevs/AstrBot/pull/10432) 修复并关闭。

## 6. 功能请求与路线图信号
*   **QQ 官方机器人互动召回支持**：[`#10454`](https://github.com/AstrBotDevs/AstrBot/issues/10454) `[OPEN]`。用户请求支持 `is_wakeup` 互动召回，并允许配置“被动失败降级为主动消息”的行为。鉴于 QQ 机器人 API 的限制（被动回复窗口短），此功能对于长任务通知（Webhook、异步任务）至关重要。
*   **Dashboard 配置条件增强**：[`#10450`](https://github.com/AstrBotDevs/AstrBot/pull/10450) `[OPEN]`。PR 提出了支持 `empty/notEmpty` 操作符的需求，旨在提升前端面板配置的灵活性。
*   **Discord 回复上下文增强**：[`#10452`](https://github.com/AstrBotDevs/AstrBot/pull/10452) `[OPEN]`。修复 Discord 回复时未包含引用消息文本的问题，确保模型能读取被引用的上下文。
*   **WebChat 分段回复修复**：[`#10458`](https://github.com/AstrBotDevs/AstrBot/pull/10458) `[OPEN]`。修复分段开启且流式关闭时，早期分段被覆盖消失的问题。
*   **潜在新适配器**：[`#10404`](https://github.com/AstrBotDevs/AstrBot/pull/10404) `[CLOSED]` 被标记为被独立插件取代，Sendblue iMessage/SMS 平台将通过插件形式引入，而非核心代码库。

## 7. 用户反馈摘要
*   **痛点**：用户对**数据一致性**极度敏感，特别是上下文压缩导致的“记忆丢失”（#9936）被视为严重缺陷，因为涉及关键信息（密钥、URL）的不可恢复性。
*   **使用场景**：大量用户通过 Anthropic 兼容协议（DeepSeek 等）使用 AstrBot，因此**工具调用的协议兼容性**（#10402, #10431）是当前最高频的稳定性痛点。
*   **不满**：部分用户反馈新版本的指令语义变更（如 `/reset`）和 UI 整合（日志与配置分离）增加了调试难度（#10375）。
*   **满意/积极面**：维护者对 Bug 的响应速度较快，关键稳定性问题（如摘要重试、流式工具调用）均在 24-48 小时内提交了 Fix PR。

## 8. 待处理积压
*   **长期未响应/高复杂度高**：
    *   [`#9936`](https://github.com/AstrBotDevs/AstrBot/issues/9936) `[OPEN]`：上下文压缩导致历史丢失。自 9 月 3 日创建，已持续近一个月，涉及核心数据流，需重点排查。
    *   [`#3182`](https://github.com/AstrBotDevs/AstrBot/pull/3182) `[CLOSED]`：插件生命周期钩子。虽然已关闭，但作为 re-submission 的 PR，其背后的“插件联动”需求可能仍需关注，避免功能倒退。
*   **待合并核心修复**：
    *   [`#10451`](https://github.com/AstrBotDevs/AstrBot/pull/10451) (QQ Markdown 修复) 和 [`#10456`](https://github.com/AstrBotDevs/AstrBot/issues/10456) (工具白名单逻辑) 涉及高频使用场景，建议在下一次发布周期中优先处理。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报 (2026-10-09)

## 1. 今日速览
今日 DeepSeek Harness 社区活跃度保持高位，过去 24 小时内 GitHub Discussions 更新达 177 条。项目当前处于版本迭代的关键敏感期，v3 到 v4 会话格式（Session Format）的迁移成为主要技术挑战，导致多名用户报告会话无法打开、数据损坏及崩溃问题。官方暂无新版本发布，但围绕架构缺陷、Windows 平台特异性 Bug 及生命周期管理的深入讨论正在快速发酵，建议关注数据兼容性问题。

## 2. 版本发布
*本日无新版本发布。*
*(注：根据数据概览，最新 Releases 列表为空。)*

## 3. 项目进展
*本日无合并的代码变更或新的 Release 上线。*
由于该项目未启用 GitHub Issues/PR，且今日无新 Release 产出，暂无明确的“功能合并”记录。当前的技术进展主要体现为社区对现有版本（0.1.5-rc.1 至 0.2.0 系列）缺陷的深度诊断与修复方案的探讨，详见下方“Bug 与稳定性”及“社区热点”部分。

## 4. 社区热点
今日讨论热度最高的 Topics 集中在版本迁移痛点、社区沟通及用户体验吐槽：

1.  **v0→v3 迁移失败与修复方案 (24 评论)**
    *   **[Discussions #6559](https://github.com/deepseek-ai/deepseek-harness/discussions/6559)**: 用户 @mengge237 详细剖析了 `0.1.5-rc.1` 版本中 v0 格式会话在升级后无法打开的问题（`SessionFormatUnsupportedError`）。帖子附带了经过验证的“修复配方”，声称能将失败率从 49/123 降至 0/49。这反映了底层数据格式变更对老用户造成了严重的兼容性冲击。
    *   **诉求分析**: 用户急需官方的迁移工具或更平滑的版本兼容策略，目前依靠社区脚本自救。

2.  **社区主群置顶 (30 评论)**
    *   **[Discussions #1128](https://github.com/deepseek-ai/deepseek-harness/discussions/1128)**: 官方微信主群二维码置顶。高频互动表明大量用户希望脱离 GitHub 寻求更直接的中文技术支持或获取内部消息。

3.  **用户体验负面反馈 (17 评论)**
    *   **[Discussions #8634](https://github.com/deepseek-ai/deepseek-harness/discussions/8634)**: 用户 @kkaporn 抱怨学习曲线陡峭，特别是编写编排插件时，“收官细节”难以实现，且社区回答缺乏“大白话”解释。
    *   **诉求分析**: 文档可读性不足，高级特性（如插件编排）缺乏入门引导。

4.  **长期记忆功能请求 (13 评论)**
    *   **[Discussions #1345](https://github.com/deepseek-ai/deepseek-harness/discussions/1345)**: 用户指出当前 Agent 仅有会话内上下文，缺乏跨会话持久记忆。提议增加结构化记忆后端（文件/DB）。该话题持续活跃，被视为核心架构短板。

5.  **第三方插件展示 (9 评论)**
    *   **[Discussions #4592](https://github.com/deepseek-ai/deepseek-harness/discussions/4592)**: 社区开发者 @SiriLee 展示 `dsh-rewind` 插件，实现类似 Claude Code 的 `/rewind` 原地回退功能。虽为非官方，但已入选精选列表，侧面反映了官方在会话编辑体验上的缺失。

## 5. Bug 与稳定性
今日报告的 Bug 主要集中在**数据格式兼容性**与**Windows 平台特异性问题**，严重程度较高：

| 严重程度 | 问题描述 | 涉及版本 | 状态/备注 | 链接 |
| :--- | :--- | :--- | :--- | :--- |
| **High** | **v3→v4 迁移崩溃 (SIGABRT)**: 会话格式迁移过程中程序直接崩溃（exit 134），且旧版本无法再读取新存储。 | 0.2.0-rc.2 | 数据损坏风险高，暂无官方 Fix | [Discussions #8617](https://github.com/deepseek-ai/deepseek-harness/discussions/8617) |
| **High** | **v4 格式校验错误**: 消息注入缺少 `producer-owned source.kind`，导致会话中断、孤儿轮次。 | 0.2.0 / 0.1.7-alpha.1 | 根因已定位，等待补丁 | [Discussions #9099](https://github.com/deepseek-ai/deepseek-harness/discussions/9099) |
| **Medium** | **Windows 沙箱权限失败**: `SetNamedSecurityInfoW` 报错 (Win32 5)，因 DACL 缺少 WRITE_OWNER，导致 workspace-write 沙箱失效。 | 0.1.7-rc.2 | 复现稳定，请求策略决策 | [Discussions #7504](https://github.com/deepseek-ai/deepseek-harness/discussions/7504) |
| **Medium** | **设置静默回退**: Windows 下因启动路径盘符大小写不一致，导致 `dsh-app-boot` 加载双实例，设置修改无效。 | 0.1.7 系列 | 根因明确，尚未修复 | [Discussions #7675](https://github.com/deepseek-ai/deepseek-harness/discussions/7675) |
| **Low** | **Workspace 创建失败**: Gateway 服务 `workspaceController` 不可用，用户无法新建工作区。 | N/A | 偶发性服务异常 | [Discussions #8357](https://github.com/deepseek-ai/deepseek-harness/discussions/8357) |
| **Low** | **pwsh 启动崩溃**: 无控制台宿主（如 Electron 桌面端）下，沙箱内 PowerShell 以 0xC0000142 启动即崩。 | N/A | 桌面端用户完全无法使用 Shell 能力 | [Discussions #810](https://github.com/deepseek-ai/deepseek-harness/discussions/810) |

**稳定性评估**: 当前版本线（0.1.x - 0.2.0-rc）在会话持久化层（Session Format）存在严重的回归缺陷，尤其是 v3 到 v4 的过渡期数据安全性堪忧。Windows 平台的沙箱机制也存在多处底层权限/句柄问题。

## 6. 功能请求与路线图信号
1.  **持久化长期记忆 (Persistent Long-term Memory)**
    *   **[Discussions #1345](https://github.com/deepseek-ai/deepseek-harness/discussions/1345)**: 强烈需求跨会话的结构化记忆后端。鉴于当前会话格式正在经历 v3→v4 重构，这是架构层面需要重点考虑的方向，可能纳入下一主要版本（0.3.0?）。
2.  **Agent 生命周期管理 (Lifecycle Management)**
    *   **[Discussions #4793](https://github.com/deepseek-ai/deepseek-harness/discussions/4793)**: 指出 Agent dispose 未传播至子 Agent，导致孤儿进程泄漏。虽然当前是 Bug，但也暗示了需要更健壮的**子 Agent 管理 API**。
3.  **会话回退能力 (Conversation Rewind)**
    *   社区插件 `dsh-rewind` ([Discussions #4592](https://github.com/deepseek-ai/deepseek-harness/discussions/4592)) 的流行表明，官方可能需要内置类似 `/rewind` 的一级指令或 UI 支持，以提升对话修正体验。

## 7. 用户反馈摘要
*   **痛点**:
    *   **文档晦涩**: 多个帖子（如 #8634）提到官方文档缺乏“大白话”解释，复杂功能（如插件编排、沙箱配置）门槛过高。
    *   **升级焦虑**: 版本号迭代快（rc/alpha 混杂），数据格式破坏性变更频繁，用户担心升级后老数据丢失（#6559, #4910）。
    *   **Windows 环境不稳定**: 盘符大小写、沙箱权限、无控制台宿主等问题导致 Windows 用户体验远逊于其他平台（#7675, #7504, #810）。
*   **满意点**:
    *   社区响应速度较快，许多 Bug 报告在 1-2 周内会有根因分析或社区 Fix 方案（如 #6559 的修复配方）。
    *   扩展性良好，插件生态（如 #4592）能够填补官方功能空缺。

## 8. 待处理积压
以下高关注度讨论长期 OPEN 且无明显官方进展，建议维护者优先评估：
*   **[Discussions #4910](https://github.com/deepseek-ai/deepseek-harness/discussions/4910)**: 关于“所有持久化格式硬拒绝非当前版本，零迁移路径”的架构批评。该帖自 8 月底发布，已更新至今日，核心矛盾（向后兼容性缺失）仍未解决。
*   **[Discussions #810](https://github.com/deepseek-ai/deepseek-harness/discussions/810)**: Windows 无控制台宿主下 PowerShell 崩溃问题，影响桌面端核心功能，积压时间长。
*   **[Discussions #3631](https://github.com/deepseek-ai/deepseek-harness/discussions/3631)**: 历史读取路径静默错误，导致中止轮次的会话日志被误判为“无历史”。涉及数据一致性，尚未修复。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*