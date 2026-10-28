# OpenClaw 生态日报 2026-10-28

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-28 00:48 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

**OpenClaw 项目动态日报**
**日期：** 2026-10-28
**数据来源：** GitHub (github.com/openclaw/openclaw)

### 1. 今日速览
2026-10-28 24小时内，OpenClaw 项目维持了极高的开发活跃度，共更新 1,000 条 Issues 和 PR，其中新开/活跃 Issue 约 400 条，待合并 PR 241 条。今日项目状态的核心特征是**稳定性攻坚**：维护团队集中处理了多个 P0/P1 级的高优先级 Bug，重点解决了 Windows 更新失败、Gateway 内存泄漏及 SQLite 锁竞争等严重阻断问题。随着 v2026.10.8 稳定版及 v2026.9.35 LTS 版本的发布，社区焦点正从“功能性更新”向“版本可靠性”转移，整体健康度在经历高强度修复后趋于平稳。

### 2. 版本发布
今日涉及 3 个版本的更新，涵盖了从稳定版到测试版的不同阶段：

*   **v2026.10.10-beta.4 (Beta)**
    *   **亮点**：优化了 Automations 权限管理。针对明确的同会话定时跟进（如 one-shot `next_check` 重启），保留已认证的操作员权限，同时维持了角色、会话、取消、目标及工具策略的撤销边界。
    *   **迁移注意**：该版本主要针对自动化权限逻辑，对于配置了严格定时任务策略的用户，建议关注其在测试环境下的权限流转表现。

*   **v2026.10.8 (Stable)**
    *   **亮点**：显著增强了更新与恢复能力。修复了 Doctor 失败导致 Gateway 无法重启的问题；解决了孤儿维护工作进程（orphaned maintenance worker）阻塞 CLI 和 Gateway 启动的故障；同时修复了在 ACL 文件系统及 Windows 环境下更新中断的问题。
    *   **状态**：推荐作为生产环境的标准版本。

*   **v2026.9.35 (Extended-Stable / LTS)**
    *   **定位**：网关专用 LTS 版本。基于 2026 年 9 月底的版本，集成了关键安全更新、性能优化及新模型支持。适合追求长期稳定的企业级部署。

### 3. 项目进展
今日合并/关闭的 PR 主要集中在修复回归问题与性能优化：

*   **状态一致性修复**：PR [#186380](https://github.com/openclaw/openclaw/pull/186380) 已关闭，修复了 Claude CLI 在操作员权限失效时，停止首个 turn 导致对话丢失的问题。
*   **内存与索引优化**：针对 [Issue #172547](https://github.com/openclaw/openclaw/issues/172547) 提出 PR [#186405](https://github.com/openclaw/openclaw/pull/186405)，旨在排除 Dreaming 围栏区域对内存索引和召回信号的干扰，避免无效数据被嵌入。
*   **Mattermost 通道安全**：PR [#183239](https://github.com/openclaw/openclaw/pull/183239) 处于待合并状态，旨在阻断 Mattermost 中的机器人互搏（bot-to-bot loops）并增加 `allowBots` 配置项。

### 4. 社区热点
讨论最热烈的 Issue 反映了用户最迫切的痛点：

*   **Gateway 事件循环阻塞（高热度）**：[Issue #160959](https://github.com/openclaw/openclaw/issues/160959) 收到了 58 条评论，用户反馈自 2026.9.6 版本起，包含大型依赖包的外部插件会导致 Gateway 在启动或模型运行时重发布时出现分钟级的阻塞（Crash-loop 级别）。
*   **持久化性能瓶颈**：[Issue #119720](https://github.com/openclaw/openclaw/issues/119720) 讨论了同步代理持久化和转录维护在大规模场景下对 Gateway 事件循环的阻塞，维护团队正在评估原子重写（atomic rewrite）的修复方案。
*   **Windows 稳定性**：[Issue #170956](https://github.com/openclaw/openclaw/issues/170956) 集中反映了 Windows 托管服务安装下的启动缓慢、非干净的插件关闭以及 `schtasks` 权限问题，导致更新和重启极不稳定。

### 5. Bug 与稳定性
今日报告的 P0/P1 级稳定性问题显著，且多涉及回归（Regression）：

*   **[P0] SQLite 状态回收失败导致 Agent 不可用**
    *   **描述**：非自愿 Gateway 死亡后，后台代理准备失败（SQLite session reclamation commit checkpoint expired），导致 Agent 永久拒绝请求。
    *   **状态**：[Issue #166634](https://github.com/openclaw/openclaw/issues/166634) 处于 OPEN 状态。
*   **[P1] 内存激增与 SQLite 超时**
    *   **描述**：2026.10.5 版本基线 RSS 内存高达 1.9 GB，并在消息交换时导致 SQLite 事务超时，在 Linux ARM64 环境下尤为明显。
    *   **状态**：[Issue #181432](https://github.com/openclaw/openclaw/issues/181432) 处于 OPEN 状态。
*   **[P1] Codex Native Subagent 状态残留**
    *   **描述**：Codex 原生子代理在完成投递失败后，其 `nativeSubagentAssignments` 未被移除，导致每个新的父线程都会重新固定并重发，造成资源浪费和潜在错误。
    *   **状态**：[Issue #172837](https://github.com/openclaw/openclaw/issues/172837) 处于 OPEN 状态，尚未有明确 Fix PR。
*   **[P1] Doctor 修复挂起**
    *   **描述**：在 2026.10.3 版本中，`doctor --fix --non-interactive` 在插件捕获阶段挂起超过 15 分钟且无输出，无法到达数据库修复阶段。
    *   **状态**：[Issue #178359](https://github.com/openclaw/openclaw/issues/178359) 处于 OPEN 状态。

### 6. 功能请求与路线图信号
*   **文件系统沙箱（Filesystem Sandboxing）**：用户请求通过配置 `tools.fileAccess` 来限制文件访问路径（白/黑名单）。[Issue #7722](https://github.com/openclaw/openclaw/issues/7722) 标记为 `enhancement`，鉴于近期安全问题频发，该功能路线图优先级可能提升。
*   **GitLab 连接**：PR [#185928](https://github.com/openclaw/openclaw/pull/185928) 提出了对 GitLab 连接、发布及 Issue 评论的原生支持，这表明项目正在扩展其版本控制系统集成能力。
*   **语音降噪**：PR [#183266](https://github.com/openclaw/openclaw/pull/183266) 针对 Telnyx 语音通话功能提出了降噪功能，丰富了实时通讯场景的功能集。

### 7. 用户反馈摘要
*   **痛点**：Windows 用户普遍反映升级失败率极高，部分用户在更新后需重启主机才能恢复服务（见 [Issue #164800](https://github.com/openclaw/openclaw/issues/164800)）。
*   **性能焦虑**：对 2026.10.x 系列版本内存占用翻倍（2.5x）的担忧加剧，用户发现这会导致单 CPU 主机上的响应速度下降 3-5 倍（见 [Issue #169797](https://github.com/openclaw/openclaw/issues/169797)）。
*   **UI 交互**：Control UI 的快捷键（如 `Ctrl+Shift+A`）与浏览器冲突且不可配置，影响了部分用户的使用体验（见 [Issue #163739](https://github.com/openclaw/openclaw/issues/163739)）。

### 8. 待处理积压
*   **长期未响应的核心缺陷**：[Issue #117262](https://github.com/openclaw/openclaw/issues/117262) 涉及 SQLite 并发写入导致的 33 秒级事件循环停滞（DEF-61），该问题自 2026-08 起持续存在，虽有 `no-new-fix-pr` 标签，但仍是核心性能阻碍。
*   **积压 PR**：[PR #158051](https://github.com/openclaw/openclaw/pull/158051)（iOS Cloudflare 登录后的 Dashboard 打开问题）已等待近一个月，需维护者介入验证。

**建议：** 当前版本更新节奏较快，建议在 2026.10.8 版本中重点验证 Windows 平台的更新稳定性，并在 2026.10.10-beta 中关注内存基线是否有所改善。

---

## 横向生态对比

**横向对比分析报告：AI 智能体与个人 AI 助手开源生态**
**报告日期**：2026-10-28
**数据来源**：GitHub 社区动态摘要（OpenClaw, Zeroclaw, PicoClaw, QwenPaw, hermes-agent, AstrBot, DeepSeek Harness）

### 1. 生态全景
当前个人 AI 助手与自主智能体开源生态呈现**“高活跃度、强收敛、深分化”**的态势。
核心项目（如 OpenClaw, hermes-agent）正从功能扩张转向**稳定性攻坚与安全加固**，集中解决跨平台兼容性及高可用性问题。
边缘计算与轻量级方案（PicoClaw）面临维护权转移，显示出长尾硬件支持生态的治理挑战。
**MCP（Model Context Protocol）协议**已成为连接外部工具的关键标准，各社区正密集处理其兼容性、安全边界及性能瓶颈。
社区焦点正在从单纯的模型调用能力，向**身份认证（OIDC）、会话持久化一致性、以及多端状态同步**等基础设施层面深化。

### 2. 各项目活跃度对比

| 项目 | Issues 更新数 | PR 变动数 | 版本发布情况 | 健康度评估 | 核心焦点 |
| :--- | :---: | :---: | :--- | :--- | :--- |
| **OpenClaw** | ~1000 (活跃) | 241 (待合并) | v2026.10.8 (Stable), v2026.10.10-beta.4 | **稳定攻坚** | Windows 稳定性、Gateway 内存泄漏、SQLite 锁竞争 |
| **hermes-agent** | 471 | 500 (76% 待合并) | 无新版本 | **高强度迭代** | 统一网关状态同步、多端会话恢复、跨平台适配 |
| **QwenPaw** | 35 | 50 (11 合并) | v2.3.0-beta.1 | **良好** | 架构解耦、MCP 兼容、上下文压缩稳定性 |
| **AstrBot** | 18 | 43 (10 合并) | 无新版本 | **良好** | 知识库 API 权限、Telegram 长连接稳定性、MCP 2.x 适配 |
| **Zeroclaw** | 22 | 41 | v0.8.7 (Security) | **高活跃** | 身份认证与访问控制 (OIDC)、安全边界、i18n 对齐 |
| **DeepSeek Harness**| N/A (Discussions 185) | N/A | 0.2.1-alpha/rc 阶段 | **社区驱动** | Windows 沙箱稳定性、API 头部字段标准化、插件 DX |
| **PicoClaw** | 少量 | 0 | 无 | **停滞/风险** | 维护权异议 (Fork 化)、老旧硬件兼容性 |

### 3. OpenClaw 在生态中的定位
*   **技术路线差异**：与 Zeroclaw 侧重 Rust/Wasm 安全边界不同，OpenClaw 基于 Node.js/JS 生态，其核心挑战在于**单线程事件循环的阻塞问题**（Gateway 阻塞、SQLite 锁竞争）。它试图通过 `LTS` 版本策略（v2026.9.35）来平衡创新与稳定性，是目前生态中**企业级部署导向最明显**的项目。
*   **优势**：拥有最完善的版本管理策略（Beta/Stable/LTS），且对 Windows 平台的重视度最高（尽管问题最多，但修复密度也最大）。在**自动化权限管理**（Automations Permissions）方面，OpenClaw 提供了比 hermes-agent 和 QwenPaw 更细粒度的控制模型。
*   **社区规模**：从 1000+ Issues/PR 的体量来看，OpenClaw 是当前的**生态龙头**，社区活跃度远超其他竞品，但其“重”架构也导致了更高的回归风险。

### 4. 共同关注的技术方向
1.  **MCP 协议适配与安全**：
    *   **QwenPaw**：MCP 握手 404 回退机制缺失。
    *   **AstrBot**：MCP 2.x 兼容性及工具注册失败。
    *   **Zeroclaw**：MCP 连接“毒化”（Permanent Poisoning）导致永久失败。
    *   *趋势*：MCP 已成为标准，但各实现在错误恢复和版本兼容上仍不成熟。
2.  **身份认证与访问控制（IAM）**：
    *   **Zeroclaw**：OIDC 仪表板登录、Discord 明文审批劫持漏洞。
    *   **OpenClaw**：文件系统沙箱白名单、Windows DACL 权限问题（参考 hermes-agent 同类痛点）。
    *   *趋势*：随着 Agent 权限扩大，基于身份的细粒度访问控制成为安全刚需。
3.  **会话持久化与多端状态同步**：
    *   **hermes-agent**：统一网关后 CLI/Desktop/Discord 端点会话 `not_found`。
    *   **QwenPaw**：上下文压缩导致 400 错误、媒体文件死锁。
    *   **AstrBot**：图片消息滞留历史导致 400 死锁。
    *   *趋势*：多模态数据在长会话中的持久化一致性是普遍痛点。
4.  **Windows 平台兼容性**：
    *   **OpenClaw**：更新失败、服务重启不稳定。
    *   **hermes-agent**：DACL 权限异常、进程组管理。
    *   **DeepSeek Harness**：沙箱 DLL 初始化失败。
    *   *趋势*：Windows 桌面端在 Agent 执行环境（Sandbox/DACL）上的稳定性是当前最大的平台短板。

### 5. 差异化定位分析

| 维度 | OpenClaw | hermes-agent | Zeroclaw | QwenPaw / AstrBot | DeepSeek Harness | PicoClaw |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **核心定位** | 全能型个人 AI 网关 | 多端统一 Agent 框架 | 安全优先的智能体运行时 | 模型集成与多平台接入 | 推理服务与插件生态 | 边缘/嵌入式轻量助手 |
| **目标用户** | 企业运维、高级开发者 | 桌面/移动端重度用户 | 安全敏感型企业/开发者 | 通用开发者、模型服务商 | 企业内部 API 用户 | 硬件开发者、IoT 场景 |
| **技术架构** | Node.js, SQLite, Gateway 模式 | Rust/Node 混合, 统一网关 | Rust, Wasm, 强沙箱 | Python, Tauri/Desktop | Go/Node, 插件化 | 轻量 C++/Python |
| **关键差异** | 强调 LTS 版本与自动化权限 | 强调多端会话共享与记忆 | 强调 OIDC 安全边界与 i18n | 强调模型多样性与 WebUI | 强调 API 头部标准化与沙箱 | 强调低功耗与长尾硬件 |

### 6. 社区热度与成熟度
*   **快速迭代阶段（高活跃度，高变动）**：
    *   **OpenClaw** 和 **hermes-agent**：PR 和 Issue 数量巨大，处于架构重构与 Bug 修复的并行期。OpenClaw 正从“功能”转向“可靠性”，hermes-agent 正在消化“统一网关”带来的连锁反应。
    *   **Zeroclaw**：通过 v0.8.7 快速修补安全漏洞，处于安全加固的冲刺期。
*   **质量巩固阶段（稳定，低 Bug 率）**：
    *   **QwenPaw** 和 **AstrBot**：迭代节奏适中，重点关注特定模块（如 MCP、知识库）的修复，社区反馈集中在具体功能痛点而非架构崩溃。
*   **停滞/风险阶段**：
    *   **PicoClaw**：代码合并停滞，出现 Fork 治理危机，处于生态边缘化风险中。

### 7. 值得关注的趋势信号
1.  **从“能跑”到“可审计”**：Zeroclaw 的 OIDC 强化和 OpenClaw 的权限管理表明，Agent 不再仅仅是执行指令，而是需要严格的**行为审计与身份隔离**。未来，合规性（Compliance）将成为企业采纳 Agent 的核心门槛。
2.  **MCP 的“标准化陷阱”**：多个项目暴露 MCP 实现的脆弱性（连接毒化、版本不兼容）。这预示着 MCP 规范本身可能需要更严格的错误处理标准，或社区将涌现出更健壮的 MCP 中间件层。
3.  **Windows 桌面端是“阿喀琉斯之踵”**：OpenClaw, hermes-agent, DeepSeek Harness 均报告了 Windows 下的沙箱、权限或更新问题。对于追求全平台覆盖的 Agent 框架，**跨平台执行环境抽象层**的开发将是下一阶段的资源重点。
4.  **长会话与多模态的一致性挑战**：QwenPaw 和 AstrBot 中出现的“图片导致 400 死锁”、“上下文压缩破坏参数”等问题，说明当前的 LLM 上下文管理尚未完全适应多模态数据的持久化。开发者需在**会话状态机（Session State Machine）**设计上投入更多精力，以处理非结构化数据的生命周期。
5.  **边缘计算的治理真空**：PicoClaw 的 Fork 现象提示，针对嵌入式/低功耗设备的 Agent 生态缺乏统一的维护治理模式。如果需求持续存在，可能出现“Agent for Edge”的独立生态标准。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**日期**：2026-10-28

## 1. 今日速览
ZeroClaw 于今日发布了安全维护版本 v0.8.7，主要修补了底层依赖漏洞，项目整体处于**高活跃度**状态（24小时内 22 个 Issue 更新，41 个 PR 变动）。
今日核心焦点集中在**身份认证与访问控制（Identity-Access）**领域，针对 Gateway 和 Runtime 的安全边界提出了多项高强度 Issue 与修复。
社区快速响应了今日提交的 Bug，如 MCP 连接毒化、Android Shell 路径解析等问题均已有对应的 Fix PR 正在推进。
文档系统（i18n 翻译）正在进行版本对齐，以清理 v0.8.6 遗留的多语言支持断层。

## 2. 版本发布
### 🚀 v0.8.7 (Security & Maintenance)
*   **发布时间**：2026-10-28
*   **核心变更**：此版本跨度 81 次提交（由 19 位贡献者共同完成），主要致力于修补安全漏洞与维护工作。
*   **主要更新内容**：
    *   升级 Wasmtime 至已修补版本。
    *   采用 Rustls 进行证书验证。
    *   针对 v0.8.6 的 `tokio` 和 `ctutils` 漏洞发布了新的修订版本。
    *   重构了容器镜像构建。
*   **迁移注意事项**：用户需确认更新容器镜像，因为 v0.8.7 重新构建了底层运行环境。无明显的功能破坏性变更，属于纯粹的维护性更新。

## 3. 项目进展
今日绝大多数 PR（41 个）仍处于 Open 状态，**无新的大型核心功能合并**。
近期推进的重点在于：
*   **Session 管理重构**：#11921（Append-only session event history）和 #12071（/load-session 指令）正在推进，旨在增强 ZeroCode 的会话恢复与历史记录能力。
*   **Gateway 鉴权强化**：#11961（Dashboard sign-in with OIDC）及一系列安全边界修复 PR 正在推进中，试图填补 Gateway 路由及 Browser 登录流的安全缺口。

## 4. 社区热点
*   **[Tracker] #7432：Runtime, dashboard sign-in and gateway delivery**
    *   **链接**：https://github.com/zeroclaw-labs/zeroclaw/issues/7432
    *   **分析**：作为 v0.9.0 的核心 Tracker，该 Issue 拥有 16 条评论，活跃度极高。它管理着从 RFC #5574 拆分出的剩余运行时与网关路线图。高讨论量表明社区正围绕**v0.9.0 的身份认证架构、仪表板安全交付及执行计划**进行激烈的对齐。
*   **#9101：Consolidate release attestation mechanisms**
    *   **链接**：https://github.com/zeroclaw-labs/zeroclaw/issues/9101
    *   **分析**：该 Issue 今日关闭。社区通过 11 条评论确认了统一签名故事的目标（从 53 个资产简化到 20 个），旨在解决并行 CI 签名机制（cosign 和 SLSA）带来的冗余与时间成本。

## 5. Bug 与稳定性
按严重程度（S1 级别为最高）排列：
*   **S1 - 工作流阻断**：
    *   [#12075] **Android shell 工具解析失败**：由于 #10381 的更新，Android 端无法 canonicalize `/system/bin/sh` 导致 EPERM。目前暂无明确标记的 Fix PR。
    *   [#10807] **MCP 连接永久毒化**：HTTP 或 SSE MCP Server 在短暂不可用后，仅重试一次重置即永久失败。**已有 Fix**：#12061（Fix/mcp recover poisoned session 10807）已提交。
*   **S2 - 降级运行**：
    *   [#11517] **Web 聊天会话刷新丢失**：刷新页面会导致正在运行的 agent 回合提示词从屏幕和 localStorage 中消失。
    *   [#12064] **Discord 明文审批劫持**：白名单内的 Bot 可以使用明文 token 绕过人类审批流程。**已有 Fix**：#12065（保持 Bot 无法回答审批）。
    *   [#12055] **MCP HTTP 客户端状态未知**：缺乏连接池和 Keep-alive 控制，旧套接字丢失会导致工具调用结果未知。
    *   [#12072] **OpenAI Codex 流式解码降级重试**：降级重试时未使用流式，导致默认端点报错。**已有 Fix**：#12073（fix(providers): retry Codex streams as streams）。
*   **S3 - 次要问题**：
    *   [#12067] **Prompt Guard 灵敏度参数逻辑反向**：文档描述的 0.0-1.0 逻辑在代码实现中恰好相反。
    *   [#12066] **Prompt Guard 误报命令注入**：普通的分号 `;` 或管道 `|` 被判定为恶意注入。**已有 Fix**：#12068（修复了误判问题）。

## 6. 功能请求与路线图信号
*   **OIDC 仪表板登录 (#11961)**：今日有开发者针对 Gateway 的 OIDC 验证（#12047）和 Browser 登录流（#12049）提出了 4 个严重的限流和防伪造漏洞 Issue。这表明 **v0.9.0 中的 OIDC 功能正处于安全加固的收尾阶段**，维护者正在密集处理相关的边界情况。
*   **多语言文档 (i18n) 补齐 (#12076, #12078, #12077)**：针对 v0.8.7 暴露出的翻译断层，社区提出了翻译补全、增加页面上下文以及引入“第二读者审查”机制的请求。#12079 的 PR 正在推进翻译目录的代码对齐。

## 7. 用户反馈摘要
*   **痛点 1 - 多模态/多端稳定性差**：Android 原生应用和 Web Dashboard 的基础操作（Shell 路径解析、会话刷新）暴露出明显的稳定性退步，用户反馈使用体验受损（S1/S2 级别）。
*   **痛点 2 - Agent 权限隔离存在漏洞**：用户发现非 Admin 级别的 Agent 如果配置了 Wildcard 工具（#12046），依然可以调用受限的系统工具；此外 SOP Workshop 也可能让受限用户编写高权限脚本（#12051）。社区对**基于身份的访问控制（Identity-Access）的严密性**高度敏感。
*   **痛点 3 - 代理环境下的网关限流失效**：在 Reverse Proxy 环境中，`X-Forwarded-For` 首字段的信任机制被恶意利用（#12052），导致限制策略失效，用户希望在企业级部署场景下提供更安全的地址信任配置。

## 8. 待处理积压
*   **[#7432] Runtime, dashboard sign-in and gateway delivery**：作为 P2 级别的 Tracker，该任务被标记为高风险且处于 `accepted` 状态。需要维护者在下个周期明确具体的拆分计划和 Acceptance 证据，以避免阻塞 v0.9.0 的发布节奏。
*   **[#11414] feat(web): add opt-in focused workspaces**：此 XL 级 PR 自 10 月 1 日创建后更新较少，涉及核心 Web UI 布局重构（Classic vs Focused），由于变更较大（Risk High），需提醒维护者预留足够的 Review 时间，防止阻塞后续版本。
*   **[#9745] fix(memory): add per-agent attribution and scoping**：P1 级别且标记为 `needs-author-action`，涉及知识图谱（Knowledge Graph）的归属权与隔离，由于是底层 Core 变动，积压可能导致 Agent 记忆混淆的安全隐患。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 (2026-10-28)

### 1. 今日速览
PicoClaw 项目在 24 小时内的开发活跃度显著下降，过去 24 小时内无 Pull Request 活动，表明代码合并通道当前处于停滞状态。虽然有新 Issues 提出，但社区核心维护似乎已转移至外部 Fork 项目。今日主要动态集中在社区关于项目维护权的讨论以及新的硬件兼容性需求上。整体项目健康度呈现**高活跃度讨论、低代码贡献**的特征，且面临维护主体变更的风险。

### 3. 项目进展
*   **无代码合并**：过去 24 小时内没有已合并或关闭的 Pull Request。
*   **功能停滞**：无新的功能修复或代码变更被官方仓库接受，项目核心代码库在过去 24 小时内未发生实质性演进。

### 4. 社区热点
**热点 Issue: #3417 [OPEN] [Notice] Active Fork & Continued Maintenance: afjcjsbx/picoclaw**
*   **链接**: https://github.com/sipeed/picoclaw/issues/3417
*   **状态**: 活跃讨论中 (3 条评论, 更新于 2026-10-27)
*   **诉求分析**: 社区成员 `@afjcjsbx` 宣布该仓库处于无人维护状态，并建立了 Fork 以延续项目。该 Issue 获得了社区关注，反映了用户对 PicoClaw 项目生命周期的担忧，以及对“个人 AI 助手/智能体”生态持续性的强烈需求。此 Issue 标志着社区注意力可能开始从上游 `sipeed/picoclaw` 向 `afjcjsbx/picoclaw` 迁移。

**热点 Issue: #3451 [OPEN] Add Android API 19 support for x86_32 and x86_64 architectures**
*   **链接**: https://github.com/sipeed/picoclaw/issues/3451
*   **状态**: 新开 (创建于 2026-10-27)
*   **诉求分析**: 用户 `@teicoti` 提出支持老旧 x86 设备 (Android 4.4, API 19)。尽管该需求针对的是极老旧的硬件，但背后诉求在于**嵌入式场景的长尾覆盖**，这表明 PicoClaw 可能在智能电视盒子或单板计算机 (SBC) 上有实际部署需求。

### 5. Bug 与稳定性
*   **今日无报告 Bug**：过去 24 小时内未识别到新的崩溃、回归或稳定性问题报告。

### 6. 功能请求与路线图信号
*   **Android x86_32/64 兼容性 (Issue #3451)**:
    *   **需求描述**: 扩展 PicoClaw 对 Android 4.4 (API 19) x86 架构的支持。
    *   **纳入可能性**: **低**。鉴于 PicoClaw 作为前沿 AI 助手工具，通常倾向于支持较新的操作系统版本以降低维护负担。此请求属于长尾兼容性问题，短期内进入官方路线图的可能性较低，但可能被社区 Fork 版本接纳。

### 7. 用户反馈摘要
*   **维护担忧**: 用户在 Issue #3417 中明确表示对上游仓库“无人维护”状态的担忧，认为项目仍有显著需求，因此通过 Fork 形式延续。这反映了核心用户对技术持续演进的**高满意度但高不安感**。
*   **嵌入式/边缘计算场景**: Issue #3451 揭示了用户在 x86 架构的老旧 Android 设备（TV 盒子、SBC）上的实际使用痛点，表明 PicoClaw 已超出纯移动/桌面范畴，进入了更广泛的边缘计算部署场景。

### 8. 待处理积压
*   **维护权异议**: Issue #3417 (创建于 2026-10-06, 更新于 2026-10-27) 是一个高度敏感的积压问题。它不仅是一个技术请求，更是一个**治理危机**。官方仓库维护者需尽快回应，明确该 Fork 的合法性或官方态度，否则社区共识可能会永久性流失。
*   **硬件兼容性**: Issue #3451 属于边缘场景请求，建议维护者将其作为“Nice-to-have”或移入长期积压队列，无需立即处理，但需给予回复。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 (2026-10-28)

### 1. 今日速览
过去24小时内，QwenPaw 项目保持高度活跃，共有 35 条 Issues 更新和 50 条 Pull Requests 变动，其中合并或关闭的 PR 有 11 条，显示出团队在代码修复与功能迭代上的强劲推进力。项目发布了最新测试版本 **v2.3.0-beta.1**，标志着 v2.3 版本的开发正式进入 Beta 阶段，主要聚焦于控制台交互修复与工具扩展。当前社区讨论热点集中在 **MCP 协议兼容**、**上下文压缩（Context Compaction）** 稳定性以及 **多模态/媒体流（Media）** 的会话阻塞问题上，反映出项目正致力于提升核心代理架构在复杂场景下的鲁棒性。整体项目健康度良好，核心模块的 Bug 修复与架构重构并行推进。

### 2. 版本发布
**v2.3.0-beta.1**
*   **发布状态**：Beta 测试版，建议开发者与非生产环境用户尝鲜。
*   **核心更新**：
    *   **Console 修复**：修复了交互式 HTML 预览功能失效的问题，恢复了前端控制台的基础交互体验（[PR #8245](https://github.com/agentscope-ai/QwenPaw/pull/8245)）。
    *   **工具扩展**：在工具模块中新增了对 Tavily API 的支持，允许通过凭证库（Credential store）配置可选的 API Key，增强了搜索工具的可配置性与安全性（[PR #8204](https://github.com/agentscope-ai/QwenPaw/pull/8204)）。
    *   **插件修复**：针对 alig 插件进行了底层修复（截断信息，推测为阿里系相关适配或别名）。
*   **迁移建议**：由于是 Beta 版，核心架构（特别是 Scroll 数据持久化与上下文管理）可能存在变动，生产环境需等待 v2.3.0 正式版。

### 3. 项目进展
今日合并与关闭的 PR 主要集中在架构重构与底层 Bug 修复，项目正在向更模块化的方向演进：
*   **架构解耦**：[PR #8187](https://github.com/agentscope-ai/QwenPaw/pull/8187) 推进了将 Channels（通道）从核心宿主进程中提取为独立插件，并引入子进程隔离机制，这不仅降低了 SDK 的依赖冲突，还提升了单通道故障的隔离性。
*   **前端与 UI 优化**：[PR #8434](https://github.com/agentscope-ai/QwenPaw/pull/8434) 在模型管理页增加了“快速添加模型”按钮，极大优化了用户接入新模型的操作路径；[PR #8455](https://github.com/agentscope-ai/QwenPaw/pull/8455) 强化了 Windows 桌面端安装包的诊断能力。
*   **数据管理优化**：[PR #8443](https://github.com/agentscope-ai/QwenPaw/pull/8443) 针对 Scroll 历史记录数据库（history.db）的膨胀问题，引入了 `tool_result` 结构化块的过期老化机制，旨在平衡数据库体积与旧会话检索质量。

### 4. 社区热点
*   **MCP 协议兼容性争议**：社区关于 MCP 握手失败的讨论异常活跃。[Issue #8424](https://github.com/agentscope-ai/QwenPaw/issues/8424) 指出 `server/discover` 返回 HTTP 404 时缺乏旧协议（Legacy）回退机制，导致旧版 MCP 服务器无法接入；[Issue #8405](https://github.com/agentscope-ai/QwenPaw/issues/8405) 则反映 HTTP/SSE 配置下 MCP 弹窗无法正常关闭的 UI 缺陷。这表明 MCP 引擎正成为连接外部工具的关键瓶颈。
*   **自动记忆搜索失效**：[Issue #8361](https://github.com/agentscope-ai/QwenPaw/issues/8361) 开启了 4 次热评。用户反馈开启自动记忆搜索后，模型在同一回合内重复调用 `memory_search`，且被拦截后无法生成正常回复。已有社区贡献者 [PR #8457](https://github.com/agentscope-ai/QwenPaw/pull/8457) 提交了修复（将自动调用改为瞬态系统提示）。

### 5. Bug 与稳定性
今日识别出若干严重影响生产可用性的 Bug：
*   **[严重] 上下文压缩必现 400 错误**：[Issue #8417](https://github.com/agentscope-ai/QwenPaw/issues/8417) 指出在执行上下文压缩（`/compact`）时，火山引擎 glm-5.3-flash 模型不支持关闭思考的特定参数。社区 PR [PR #8436](https://github.com/agentscope-ai/QwenPaw/pull/8436) 正在修复该兼容性问题，避免同时下发冲突参数。
*   **[严重] 媒体/多模态会话永久死锁**：[Issue #8290](https://github.com/agentscope-ai/QwenPaw/issues/8290) 和 [Issue #7966](https://github.com/agentscope-ai/QwenPaw/issues/7966) 揭示了含有本地文件（`file://`）或特定视频/音频块的历史记录会导致会话永久损坏，现有媒体分类器无法识别并拦截这些非法请求。
*   **[一般] 邮箱配置解析错误**：[Issue #8425](https://github.com/agentscope-ai/QwenPaw/issues/8425) 导致旧版用户升级后邮箱监控失效。原因是 `name` 字段已包含完整地址时，系统仍拼接 `@domain`，已关闭并有后续跟进。

### 6. 功能请求与路线图信号
*   **桌面端与多平台支持**：Linux 桌面端打包需求旺盛，[PR #8444](https://github.com/agentscope-ai/QwenPaw/pull/8444) 正在为 Tauri 构建增加 Linux deb 和 AppImage 支持。
*   **语音能力集成**：[PR #7785](https://github.com/agentscope-ai/QwenPaw/pull/7785) 正在开发实时语音聊天功能，支持语音输入、播放、打断和模型选择，这是 v2.3 版本的一大预期亮点。
*   **定时任务精细化控制**：[Issue #8439](https://github.com/agentscope-ai/QwenPaw/issues/8439) 提议在 `JobRuntimeSpec` 中增加 `thinking_level` 字段，允许定时任务独立控制是否启用深度推理以节省 Token，已有清晰的实现路径。

### 7. 用户反馈摘要
*   **痛点：文件操作工具缺乏底层感知**：用户反馈 `edit_file` 在处理 CRLF 换行符和编码（ISO-8859-1转UTF-8）时会造成不可逆破坏（[Issue #8415](https://github.com/agentscope-ai/QwenPaw/issues/8415) 与 [PR #8433](https://github.com/agentscope-ai/QwenPaw/pull/8433)），用户需要文件工具在“原子写入”时保留原始编码与换行符。
*   **痛点：资源泄漏导致宕机**：长运行环境（Docker）中，ReMe 监听器耗尽了 AnyIO 默认线程池（[Issue #8279](https://github.com/agentscope-ai/QwenPaw/issues/8279)），导致同步 HTTP 端点卡死；审计数据库（audit.db）也存在不记录长生命周期 Agent 工具调用的问题（[Issue #8412](https://github.com/agentscope-ai/QwenPaw/issues/8412)）。

### 8. 待处理积压
*   **桌面端 UI 渲染死锁**：[Issue #3281](https://github.com/agentscope-ai/QwenPaw/issues/3281) 自 4 月起存在，用户反馈在 Windows 桌面端 AI 回复短暂显示后消失导致界面空白，至今无实质性修复。
*   **浏览器 SDK 资源管理**：[Issue #7397](https://github.com/agentscope-ai/QwenPaw/issues/7397) 每次调用 `browser.open()` 都会生成新的 Tab 组，导致无法维护多页面长会话，需浏览器代理层重构。
*   **进程自杀拦截逻辑误伤**：[Issue #8413](https://github.com/agentscope-ai/QwenPaw/issues/8413) 中，安全审计将用户自定义环境变量 `$PID` 误判为 QwenPaw 自杀行为并阻断 shell 执行，亟需调整正则匹配逻辑。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目日报 (2026-10-28)

## 1. 今日速览
截至 2026 年 10 月 28 日，hermes-agent 项目社区活跃度维持高位，过去 24 小时内共产生 471 条 Issue 动态及 500 条 PR 动态，其中约 76% 的 PR 处于待合并状态，显示开发迭代节奏紧凑。今日无新版本发布。当前项目的主要技术攻关集中在“统一网关（Unified Gateway）”合并后的多端状态同步、会话恢复机制以及不同操作系统（Windows/DACL, Linux/Sandbox）下的环境适配问题上。尽管功能推进迅速，但遗留的权限控制与会话持久化 Bug 仍是影响用户体验的主要痛点。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
在功能开发与架构重构方面，主要进展集中在 Webapp 移动端适配、插件系统完善及 Kanban 功能增强上。
*   **Webapp 移动端体验修复**：PR #145788 修复了移动端 `CompactTabPicker` 无法访问每个标签页独立菜单（归档、删除、重命名）的问题，进一步提升了移动端的可用性。
    *   [查看 PR](https://github.com/NousResearch/hermes-agent/pull/145788)
*   **群组聊天数据统一**：PR #145629 实现了 Desktop 独立后端与 Webapp 共享同一套群组聊天列表存储，解决了多端群组数据不一致的问题。
    *   [查看 PR](https://github.com/NousResearch/hermes-agent/pull/145629)
*   **插件发现机制优化**：PR #84499 修复了由于异步竞态条件导致在插件注册完成前验证工具集产生的 `Unknown toolsets` 假警告。
    *   [查看 PR](https://github.com/NousResearch/hermes-agent/pull/84499)
*   **Kanban 权限溯源增强**：PR #145778 引入了基于创建时间溯源的撤回机制，允许发起创建任务运行的 Agent 撤回其创建的卡片。
    *   [查看 PR](https://github.com/NousResearch/hermes-agent/pull/145778)

## 4. 社区热点
以下 Issue 在讨论中关注度最高，反映了当前社区的核心诉求：
*   **Issue #131859 (评论: 53)**：[P3] CreatePullRequest 权限错误导致无法通过 API 从 Fork 拉取代码（仅特定账户受阻）。
    *   *诉求分析*：CI/CD 自动化流程受阻，用户急需解决 API 权限鉴权问题。
    *   [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/131859)
*   **Issue #143379 (评论: 28)**：[P2] RFC：Doc-Chain 架构的网络化——读取、治理与压缩机制。
    *   *诉求分析*：社区正在深入探讨 AI 长期记忆与文档上下文管理的架构优化，对“压缩后的持久记录如何被 Agent 准确复读”有强烈需求。
    *   [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/143379)
*   **Issue #131055 (评论: 26)**：[P2] Linux Desktop 二次实例启动导致 Sandbox Fallback 损坏，引发渲染器无限 SIGILL 循环。
    *   *诉求分析*：Linux 桌面端稳定性遭遇重大阻碍，多开场景下的沙盒回退机制存在致命缺陷。
    *   [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/131055)
*   **Issue #143547 (评论: 25)**：[P2] 统一网关合并后遗留问题，CLI、Desktop、Cron 等所有端点转向单进程网关带来的连锁故障。
    *   *诉求分析*：核心架构升级（#106742）后带来的复杂性激增，多端点共享进程时的状态冲突成为热点。
    *   [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/143547)

## 5. Bug 与稳定性
今日报告与追踪的严重稳定性问题及修复进度如下（按严重程度排列）：
*   **[P1] Windows DACL 权限异常 (Issue #122935)**：更新后 `%HERMES%\tools` 目录的 DACL 被加固，导致非管理员进程无法执行内置 Python/Node（WinError 5）。*目前暂无直接 Fix PR，为高优阻断问题。*
    *   [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/122935)
*   **[P1] Discord 异步委托任务状态死锁 (Issue #139135)**：Discord 线程中的后台 `delegate_task` 完成后，持久化结果仍为 pending，导致父级会话无法恢复（Parent does not resume）。*暂无已合并的 Fix PR。*
    *   [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/139135)
*   **[P2] 上下文压缩破坏工具参数 (Issue #127260)**：在 Windows 平台，上下文压缩过程中截断或注入了杂散 token，导致 terminal/file 工具参数在内存中被破坏（带有 U+27EA 标记）。*属于高危数据损坏问题。*
    *   [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/127260)
*   **[P2] 凭据预览泄露 (PR #145787)**：发现凭据预览在 dashboard 及日志中泄露了明文敏感信息。*此问题已有明确修复 PR 正在推进。*
    *   [查看 PR](https://github.com/NousResearch/hermes-agent/pull/145787)
*   **[P3] 手机 Tab 导航不可用 (PR #145788)**：已在 PR #145788 中提交修复，待合并。

## 6. 功能请求与路线图信号
*   **Agent 侧边栏辅助审查 (PR #145775)**：引入 `you-should-know` 插件。当 Agent 进行长时任务时，该插件会在后台审查并弹出一个简短、可关闭的提示，指出用户可能忽略的权衡或未验证的结果。*该功能已提交 PR，预示未来版本将强化 AI 输出的可解释性与安全提示机制。*
*   **0xArchive 回测工作流 (PR #145670)**：为金融类 Skill 增加可选的 0xArchive 回测支持，允许 Agent 记录实验并保留密封的测试集。
*   **多端点会话共享 (Issue #112028)**：用户希望在 Desktop 和 移动 Dashboard 中无缝访问同一会话（Multi-surface access）。*目前存在技术障碍（服务端拒绝第二端接入），预计将逐步纳入路线图以解决。*

## 7. 用户反馈摘要
*   **痛点：桌面端 UI 状态不同步**。多个 Issue（如 #142037 切换模型后标签不更新，#123985 压缩后首条消息重复渲染）反映了桌面端客户端在状态同步上存在滞后或缓存失效问题。
*   **痛点：平台间兼容性差异大**。Windows 下的进程组管理（#69033）和 DACL 权限（#122935）以及 Linux 下的沙盒回退（#131055）表明项目在跨平台桌面端适配上存在明显短板。
*   **诉求：多平台消息网关互通性**。用户在 Discord、WhatsApp 和 Teams 端点遇到的会话恢复失败（admission_conflict, not_found）表明，跨端消息路由逻辑在状态持久化环节存在断点。

## 8. 待处理积压
*   **Issue #139818 (创建于 2026-10-16)**：远程后端 Desktop 会话无法在本地恢复（`session.resume` 返回 `not_found`）。此问题直接影响了远程部署架构的核心可用性，建议维护者优先处理。
*   **Issue #144814 (创建于 2026-10-26)**：通过 Dashboard 登录的客户端（hermes-mobile）创建会话后，本地 Desktop 客户端无法恢复该会话（`4001 not_found`）。与 #139818 类似，属于会话源 (Source) 权限映射问题，目前处于积压状态。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期：** 2026-10-28
**项目：** [AstrBot](https://github.com/AstrBotDevs/AstrBot)

## 1. 今日速览
过去24小时，AstrBot 社区活跃度维持高位，共更新 18 条 Issues（14 活跃/4 关闭）和 43 条 Pull Requests（33 待合并/10 合并或关闭），未发布新版本。项目核心维护力量正集中处理 **MCP 协议适配、知识库 API 权限、以及 Telegram 平台连接稳定性** 等关键痛点。今日主要进展包括合并了 PyPI 镜像 TLS 安全修复，并针对知识库 403 错误、MCP 2.x 兼容性及插件依赖安装失败等多个阻塞性 Bug 提交了修复 PR。整体项目健康度良好，开发迭代速度快，但在底层网络请求稳定性及多模态消息处理逻辑上仍需持续优化。

## 2. 版本发布
*过去 24 小时内无新版本发布。*

## 3. 项目进展
今日合并与关闭的 PR 主要涉及安全加固与 UI 体验优化，推进了项目的基础设施质量。

*   **安全加固**：修复了默认 PyPI 镜像在安装插件依赖时禁用 TLS 证书验证的安全漏洞，消除了潜在的供应链中间人攻击风险（[PR #10685](https://github.com/AstrBotDevs/AstrBot/pull/10685)）。
*   **UI 体验**：关闭了因长期冲突而过时的钉钉流式 AI 卡片 PR，该功能将由维护者重新规划或调整实现方式（[PR #8890](https://github.com/AstrBotDevs/AstrBot/pull/8890)）。
*   **架构优化与 UI 完善**：社区贡献了多个重要的优化 PR，包括改进追踪工作区（[PR #10765](https://github.com/AstrBotDevs/AstrBot/pull/10765)）、为插件文件配置添加图片预览功能（[PR #10596](https://github.com/AstrBotDevs/AstrBot/pull/10596)），以及为插件市场添加本地化 README 预览能力（[PR #10799](https://github.com/AstrBotDevs/AstrBot/pull/10799)）。这些改进显著提升了运维排查效率与 WebUI 用户体验。

## 4. 社区热点
今日讨论最活跃、用户关注度最高的议题集中在**网络代理/镜像配置优化**和**平台特定 API 限制**方面。

*   **[Issue #10577](https://github.com/AstrBotDevs/AstrBot/issues/10577)**（已关闭）：用户强烈要求在设置中提供 PyPI 预设镜像站点及**测速功能**。此 Issue 获得了 8 条评论，反映了国内用户普遍面临的网络连通性痛点，该需求已被标记为功能增强并闭环。
*   **[Issue #8314](https://github.com/AstrBotDevs/AstrBot/issues/8314)**（活跃）：Telegram 平台长时间运行后无法接收新消息的 Bug。该 Issue 拥有 8 条评论，用户不仅报告了连接泄漏或超时的现象，还提出了“添加定时重启适配器”的折中 workaround 诉求，是当前平台稳定性的最大焦点。
*   **[Issue #10763](https://github.com/AstrBotDevs/AstrBot/issues/10763)**（活跃）：用户集中提出了批量删除、插件市场查看 README 等多个管理功能建议（4 条评论）。该诉求已转化为实际开发，社区正在通过 [PR #10799](https://github.com/AstrBotDevs/AstrBot/pull/10799) 推进 README 预览功能的落地。

## 5. Bug 与稳定性
今日集中暴露了多个影响核心业务流的严重 Bug，但社区已迅速响应，提交了针对性修复 PR。

**【严重 - 阻塞性 Bug】**
*   **知识库 API 全面不可用 (403)**：由于 scope 白名单配置矛盾，`kb` scope 无法被授予，导致所有基于 API Key 的知识库接口永久返回 403。*已有修复方案：* [PR #10801](https://github.com/AstrBotDevs/AstrBot/pull/10801) 提交了 scope 修复（[Issue #10322](https://github.com/AstrBotDevs/AstrBot/issues/10322)）。
*   **MCP 2.x 兼容性问题导致工具未注册**：环境升级至 mcp>=2.x 后，握手超时掩盖了底层的属性异常（AttributeError），导致工具无法注册。*已有修复方案：* [PR #10825](https://github.com/AstrBotDevs/AstrBot/pull/10825) 提交了 2.x schema 适配与错误上报（[Issue #10824](https://github.com/AstrBotDevs/AstrBot/issues/10824)）。
*   **飞书 21001 错误**：2026-10-13 后飞书对个人/豆包账户实施机器人发信限制。*暂无代码级修复，属于第三方平台 API 策略变更*（[Issue #10802](https://github.com/AstrBotDevs/AstrBot/issues/10802)）。
*   **工具调用逻辑致会话 400 死锁**：
    1. 工具返回图片后，图片消息错误地插入了 `tool_calls` 与 `tool` 结果之间，导致下一轮请求必然 400（[Issue #10819](https://github.com/AstrBotDevs/AstrBot/issues/10819)）。
    2. 插件钩子误删 tool 消息后导致会话所有后续请求 400（[Issue #10338](https://github.com/AstrBotDevs/AstrBot/issues/10338)）。
    *应对进展：* 社区提交了降级处理 PR，针对不支持多模态的提供商自动降级 tool 结果图片为纯文本，防止 400 报错（[PR #10779](https://github.com/AstrBotDevs/AstrBot/pull/10779)）。

**【中等 - 资源泄漏与逻辑缺陷】**
*   **知识库线程泄漏**：频繁上传导致 aiosqlite worker 线程未释放，长时运行产生 1000+ 线程。*已有修复方案：* [PR #10821](https://github.com/AstrBotDevs/AstrBot/pull/10821) 优化了向量 DB 的复用与销毁（[Issue #10806](https://github.com/AstrBotDevs/AstrBot/issues/10806)）。
*   **插件依赖漏装**：`requirements.txt` 中部分已安装、部分缺失时，预检查机制错误跳过了整个文件的安装。*已有修复方案：* [PR #10695](https://github.com/AstrBotDevs/AstrBot/pull/10695) 修复了该逻辑（[Issue #9545](https://github.com/AstrBotDevs/AstrBot/issues/9545)）。
*   **安全缺陷：沙盒 Skill 越权上传**：未授权或全局停用的技能文件仍被沙盒同步上传，造成隐私/隔离风险。*暂无修复 PR*（[Issue #10820](https://github.com/AstrBotDevs/AstrBot/issues/10820)）。

## 6. 功能请求与路线图信号
*   **本地化与 WebChat 增强**：WebChat 支持 MCP Apps 的交互式宿主（如图片选择器）正在开发中，预计将极大增强多模态交互体验（[Issue #10797](https://github.com/AstrBotDevs/AstrBot/issues/10797), [PR #10798](https://github.com/AstrBotDevs/AstrBot/pull/10798)）。
*   **平台适配完善**：
    *   **钉钉**：原生支持流式 AI 卡片互动回复功能已重新提交开发，取代了旧的卡死 PR（[PR #10818](https://github.com/AstrBotDevs/AstrBot/pull/10818)）。
    *   **QQ 官方 API**：修复了重启后主动消息路由丢失的问题，保障了 UMO 状态持久化（[PR #10152](https://github.com/AstrBotDevs/AstrBot/pull/10152)）。
    *   **火山方舟**：用户希望引入火山方舟默认配置以支持其上下文缓存与嵌入模型（[Issue #6240](https://github.com/AstrBotDevs/AstrBot/issues/6240)）。
*   **模型计费修正**：修复了 Gemini 思考模型中 thinking tokens 未被计入 output tokens 导致计费/展示数据偏低的问题（[PR #10826](https://github.com/AstrBotDevs/AstrBot/pull/10826)）。

## 7. 用户反馈摘要
*   **痛点 1（网络与环境）**：大量用户受困于国内网络环境，不仅要求支持 PyPI 镜像并附带测速（[Issue #10577](https://github.com/AstrBotDevs/AstrBot/issues/10577)），还有用户在 Windows 环境下遭遇 WebUI 因 JS MIME 类型未注册导致的白屏问题（[PR #10823](https://github.com/AstrBotDevs/AstrBot/pull/10823)）。
*   **痛点 2（长文本与图像会话缓存）**：用户发现“发送≠存储”的机制导致图片消息以 base64 形式滞留会话历史，每次请求全量重发，不仅打断前缀缓存导致成本剧增，还极易引发 400 死锁（[Issue #10822](https://github.com/AstrBotDevs/AstrBot/issues/10822), [Issue #10819](https://github.com/AstrBotDevs/AstrBot/issues/10819)）。这反映出底层 Agent 多模态消息编排逻辑亟需重构。
*   **满意与诉求**：对于 WebUI 的运维能力（如备份管理、追踪看板），用户期待能处理并发场景下的脏读问题（如备份列表在操作中被删除导致的异常，[PR #10811](https://github.com/AstrBotDevs/AstrBot/pull/10811)），以及对 `stop` 指令排队任务未完全拦截导致的重复工数计费问题（[Issue #10805](https://github.com/AstrBotDevs/AstrBot/issues/10805)）。

## 8. 待处理积压
*   **[Issue #9545](https://github.com/AstrBotDevs/AstrBot/issues/9545) 插件依赖漏装**：该问题自 2026 年 8 月初提出，已挂起近 3 个月。今日 [PR #10695](https://github.com/AstrBotDevs/AstrBot/pull/10695) 已提供解法，建议维护者加速 Code Review 并合并。
*   **[Issue #8314](https://github.com/AstrBotDevs/AstrBot/issues/8314) Telegram 消息丢失**：创建于 2026 年 5 月，至今未彻底解决。用户反馈“长时间运行后失联”的深层网络长连接（Webhook/Long Polling）维护机制可能存在缺陷，是阻碍 Telegram 平台长期可用性的最大隐患，需安排专人专项攻坚。
*   **[Issue #10322](https://github.com/AstrBotDevs/AstrBot/issues/10322) 知识库 403 错误**：创建于 10 月 2 日，导致整个知识库外部调用阻断。鉴于修复 PR [PR #10801](https://github.com/AstrBotDevs/AstrBot/pull/10801) 已非常完善，建议尽早合入以防止更多外部集成用户遭遇阻塞。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报 (2026-10-28)

## 1. 今日速览
DeepSeek Harness 项目保持高活跃度的社区讨论态势，过去 24 小时内 GitHub Discussions 更新高达 **185 条**，显示出用户群体对工具细节、稳定性及生态扩展的高度关注。尽管今日没有产生新的 Release 版本（合并通过后续版本落地），但社区热点集中在 Windows 桌面端沙箱机制缺陷、插件兼容性以及 API 头部字段标准化等关键问题上。项目当前的核心矛盾在于**桌面端（Electron）在 Windows 环境下的沙箱执行稳定性**以及**插件开发者体验（DX）**的优化需求。整体健康度良好，社区反馈渠道畅通，但部分底层机制 Bug 亟需在下个 RC 或稳定版中解决。

## 2. 版本发布
**无新版本发布。**
*注：根据数据，该仓库未启用 Issues/PR，代码合并通过 Releases 落地。当前处于两个版本间隔期，最新已知版本上下文为 `0.2.1-alpha` 至 `0.2.1-rc` 阶段。*

## 3. 项目进展
由于今日无 Release 发布，且仓库不公开 PR 数据，本小节主要基于高热度 Discussions 中披露的代码变更信号与待修复项进行推导：
*   **插件生态标准化需求**：社区强烈呼吁官方提供“面向插件作者”的升级 Skill（参考 [Discussion #5120](https://github.com/deepseek-ai/deepseek-harness/discussions/5120)），这表明维护团队正在考虑构建更完善的插件开发者工具链，以解决从 `0.1.x` 到 `0.2.x` 的迁移痛点。
*   **API 头部字段合规化**：针对 OpenCode Go 等托管推理服务要求的 `x-opencode-session` 头部字段，社区已发起明确提案（参考 [Discussion #5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)），预计下一版本将包含对第三方 API 兼容性头部字段的支持。

## 4. 社区热点
今日讨论最活跃、评论数最多的 15 条 Discussions 反映了当前社区的三大核心诉求：

1.  **API 兼容性头部字段支持**
    *   **热点**: [#5495 [Ideas] Please send x-opencode-session header on API requests](https://github.com/deepseek-ai/deepseek-harness/discussions/5495) (47 条评论)
    *   **分析**: 用户反映约 2.5 万组织通过 DSH 调用 OpenCode Go API，因缺少会话头导致路由错误。这是高优先级的兼容性修复，直接影响企业级用户体验。
2.  **桌面端认证 Cookie 溢出 Bug**
    *   **热点**: [#9924 [Bug] Desktop "Web authentication failed": stale dsh-auth-* cookies overflow the Host header limit](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) (26 条评论)
    *   **分析**: Electron 桌面端在 Linux/Wayland 环境下，累积的认证 Cookie 导致 Host 头超过 431 限制。这是一个严重影响登录流程的严重 Bug，涉及桌面端底层网络栈处理。
3.  **插件升级自动化**
    *   **热点**: [#5120 [Ideas] 有没有人搞过升级 dsh 插件代码来支持新 dsh 版本的 skill？](https://github.com/deepseek-ai/deepseek-harness/discussions/5120) (20 条评论)
    *   **分析**: 社区希望官方提供类似 `codemod` 或迁移指南的工具，帮助插件作者将代码从旧版本 API 适配到新版本。
4.  **账号封禁与申诉渠道缺失**
    *   **热点**: [#9453 [General] DeepSeek 账号连续三次无理由封禁](https://github.com/deepseek-ai/deepseek-harness/discussions/9453) (13 条评论)
    *   **分析**: 用户因账号安全问题流向 Harness 社区求助，侧面反映出用户对 DeepSeek 官方客服渠道的不满，也提示 Harness 需考虑与后端服务的状态同步问题。

## 5. Bug 与稳定性
今日报告了多个严重稳定性问题，主要集中在 **Windows 桌面端沙箱** 和 **插件运行时**：

1.  **严重：Windows 沙箱执行失败 (STATUS_DLL_INIT_FAILED)**
    *   **现象**: 在 Windows 11 桌面端 `0.2.1-rc.2` 中，当会话处于 `workspace-write` 策略时，所有受限命令（包括 `cmd /c echo ok` 和 `pwsh`）均以退出码 `3221225794` (0xC0000142) 失败，无输出。
    *   **链接**: [#10066 Windows confined commands die](https://github.com/deepseek-ai/deepseek-harness/discussions/10066) | [#8991 pwsh sandbox failure](https://github.com/deepseek-ai/deepseek-harness/discussions/8991)
    *   **原因分析**: 疑似 Electron GUI 子系统二进制作为沙箱 Runner 导致 DLL 初始化失败。
2.  **严重：桌面端认证 Cookie 溢出**
    *   **现象**: 长期使用桌面端的用户，因累积的 `dsh-auth-*` Cookie 导致请求头过大（431 错误），Web 认证失败。
    *   **链接**: [#9924 Desktop Web authentication failed](https://github.com/deepseek-ai/deepseek-harness/discussions/9924)
    *   **影响版本**: `0.2.1-alpha.4` 至 `0.2.1-rc.1`。
3.  **高：插件双包符号冲突 (Dual-package Symbol Hazard)**
    *   **现象**: 当 Web 配置文件拥有独立的 `dsh-tools` 副本时，工具调用抛出 `Cannot read properties of undefined (reading 'prepare')` 错误。
    *   **链接**: [#8924 [Bug] All tool calls die](https://github.com/deepseek-ai/deepseek-harness/discussions/8924)
4.  **中：历史消息加载失败**
    *   **现象**: 长会话中，`session.history` 页面因数据量过大（单页 3.8 万事件）导致请求中断。
    *   **链接**: [#4678 session.history: elide chunks of closed messages](https://github.com/deepseek-ai/deepseek-harness/discussions/4678)
5.  **中：会话搜索持久化失败**
    *   **现象**: 自托管配置下，`experimental-session-search` 调用返回 `SESSION_QUERY_PERSISTENCE_FAILED`。
    *   **链接**: [#10034 experimental-session-search failure](https://github.com/deepseek-ai/deepseek-harness/discussions/10034)

## 6. 功能请求与路线图信号
基于高热度讨论，以下功能极有可能被纳入近期版本：

*   **API 头部字段自定义/支持**：支持发送 `x-opencode-session` 等第三方推理服务所需的头部字段 ([#5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495))。
*   **多文件夹工作区模型**：将工作区从“单目录绑定”扩展为“有序文件夹列表 + primary 指定”，对齐 Codex 项目模型 ([#5505](https://github.com/deepseek-ai/deepseek-harness/discussions/5505))。
*   **插件升级辅助工具**：官方提供插件代码迁移 Skill ([#5120](https://github.com/deepseek-ai/deepseek-harness/discussions/5120))。
*   **模型推理等级 GUI 支持**：允许在自定义 OpenAI 兼容提供商中通过 GUI 选择 reasoning effort ([#843](https://github.com/deepseek-ai/deepseek-harness/discussions/843))。
*   **DNS 代理兼容性**：`web-fetch` 增加配置开关以允许非公共 DNS 响应（适配 Clash 等 fake-ip 模式） ([#5797](https://github.com/deepseek-ai/deepseek-harness/discussions/5797))。

## 7. 用户反馈摘要
*   **痛点 1：桌面端 Windows 环境稳定性差**。多个用户报告在 Windows 11 上使用 Desktop App 时，沙箱机制完全失效，严重阻碍了代码执行任务 ([#10066](https://github.com/deepseek-ai/deepseek-harness/discussions/10066))。
*   **痛点 2：插件开发者体验 (DX) 不佳**。插件作者缺乏平滑升级路径，且遇到模块解析错误难以排查 ([#5120](https://github.com/deepseek-ai/deepseek-harness/discussions/5120), [#8924](https://github.com/deepseek-ai/deepseek-harness/discussions/8924))。
*   **痛点 3：长会话性能瓶颈**。Web GUI 在处理超长历史会话时，页面加载缓慢甚至失败，影响回顾效率 ([#4678](https://github.com/deepseek-ai/deepseek-harness/discussions/4678))。
*   **满意点：社区响应速度**。虽然无 Issue 系统，但 Discussions 中维护者或核心贡献者对 Bug 定位较为迅速，用户间互助氛围良好（如 [#136](https://github.com/deepseek-ai/deepseek-harness/discussions/136) 标记为 SOLVED）。

## 8. 待处理积压
以下长期或高影响力问题需维护者重点关注，避免成为版本阻塞点：

*   **[P0] Windows 沙箱 DLL Init 失败**：涉及核心执行能力，且多个 Discussion 交叉引用，需确认是否为 Electron 版本或沙箱二进制构建问题 ([#10066](https://github.com/deepseek-ai/deepseek-harness/discussions/10066))。
*   **[P1] 认证 Cookie 溢出**：影响长期桌面端用户登录，需实现 Cookie 清理或轮转机制 ([#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924))。
*   **[P1] Termux/Android 支持**：用户希望在移动终端运行 DSH，目前 `npx` 安装路径在 Termux 下存在运行时错误 ([#136](https://github.com/deepseek-ai/deepseek-harness/discussions/136))。
*   **[P2] 模型目录更新**：建议将 `@earendil-works/pi-ai` 升级至 `^0.87.1` 以支持最新模型目录 ([#7660](https://github.com/deepseek-ai/deepseek-harness/discussions/7660))。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*