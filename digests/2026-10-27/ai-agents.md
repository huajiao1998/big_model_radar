# OpenClaw 生态日报 2026-10-27

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-27 00:59 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 (2026-10-27)

### 1. 今日速览
过去 24 小时内，OpenClaw 项目保持极高活跃度，共处理 500 条 Issue 更新（101 条关闭）和 500 条 PR 更新（321 条合并/关闭），显示社区与维护团队正在进行高强度的代码迭代与清理。当前无新版本发布，但大量 P0/P1 级别的稳定性 Bug 集中在 Windows 平台及 Gateway 核心机制上。项目正致力于解决内存泄漏、SQLite WAL 膨胀及 Gateway 启动阻塞等核心痛点，同时 UI 与文档层面的改进也在同步推进。整体来看，尽管基础设施层面存在若干严重的回归问题，但开发节奏紧凑，修复 PR 产出效率较高。

### 2. 版本发布
*无新版本发布*

### 3. 项目进展
尽管今日无正式 Release，大量 PR 已合并或待合并，主要进展集中在以下领域：
*   **Gateway 稳定性与性能优化**：
    *   修复了 Gateway 在热应用配置写入时错误地持久化重启信号的问题，避免了后续无关启动时的异常 [PR #144764](https://github.com/openclaw/openclaw/pull/144764)。
    *   优化了工作区（Workspace）在本地沙箱检查点创建过程中的内存分配，减少了深拷贝带来的性能开销 [PR #185256](https://github.com/openclaw/openclaw/pull/185256)。
    *   解决了代理运行时在认证冷却期间反复重建导致的“风暴”问题，提升了并发会话的稳定性 [PR #185250](https://github.com/openclaw/openclaw/pull/185250)。
*   **功能增强与 UX 改进**：
    *   引入了 Skill Workshop 的“Propose Mode”，允许用户以草稿形式审查后台学习的技能 [PR #181747](https://github.com/openclaw/openclaw/pull/181747)。
    *   优化了 Web UI 的创建路由，防止在无需时提前加载 Chat 渲染逻辑，提升了页面响应速度 [PR #184994](https://github.com/openclaw/openclaw/pull/184994)。
    *   修复了 Slack、Feishu 等渠道中多行斜杠命令参数被错误合并为一行的问题 [PR #185267](https://github.com/openclaw/openclaw/pull/185267)。
*   **文档与安全**：
    *   收紧了内部导出表面（Internal Export Surfaces），减少了不必要的模块依赖 [PR #185269](https://github.com/openclaw/openclaw/pull/185269)。
    *   提出了字节级可恢复的 Git 下载架构提案，旨在改善不稳定网络下的更新体验 [PR #185262](https://github.com/openclaw/openclaw/pull/185262)。

### 4. 社区热点
今日讨论最活跃的 Issue 主要反映了用户对**稳定性**和**资源占用**的强烈关切：

*   **[P0] Agent SQLite WAL 文件无界增长**
    *   **热度**：139 评论
    *   **链接**：[Issue #143524](https://github.com/openclaw/openclaw/issues/143524)
    *   **分析**：用户反馈即使设置了 `wal_autocheckpoint`，Windows 平台上的 WAL 文件仍会增长至 1.4-2.8 GB，导致 Gateway 启动失败。这是当前最严重的 P0 级别 Bug，严重影响长期运行服务。
*   **[P0] Gateway 阻塞捕获大型外部插件**
    *   **热度**：57 评论
    *   **链接**：[Issue #160959](https://github.com/openclaw/openclaw/issues/160959)
    *   **分析**：2026.9.6 引入的插件生成捕获功能导致事件循环阻塞，拥有大型依赖树的插件会使 Gateway 数分钟无响应。社区正在寻找绕过方案或等待修复。
*   **[P0] prepared-model-catalog.worker.js 内存泄漏**
    *   **热度**：26 评论
    *   **链接**：[Issue #159662](https://github.com/openclaw/openclaw/issues/159662)
    *   **分析**：该 Worker 线程存在单调递增的内存泄漏（~4-5 GB/h），与负载无关，导致低流量安装也在短时间内耗尽内存。
*   **Windows 可靠性综合问题**
    *   **热度**：21 评论
    *   **链接**：[Issue #170956](https://github.com/openclaw/openclaw/issues/170956)
    *   **分析**：Windows 用户集中反映了启动慢、插件关闭不干净及 `schtasks` 权限错误，导致重启/更新频繁失败。

### 5. Bug 与稳定性
按严重程度排列的关键 Bug（已有对应 Fix PR 或正在处理）：

*   **P0 - 崩溃/资源耗尽**
    *   **SQLite WAL 膨胀**：[Issue #143524](https://github.com/openclaw/openclaw/issues/143524)（状态：已关闭，需验证长期稳定性，可能有新 PR 跟进）。
    *   **Gateway 启动阻塞**：[Issue #160959](https://github.com/openclaw/openclaw/issues/160959)（状态：Open，标记为 `needs-maintainer-review`）。
    *   **Worker 内存泄漏**：[Issue #159662](https://github.com/openclaw/openclaw/issues/159662)（状态：Open，高优先级）。
    *   **SQLite 事务永久打开**：[Issue #172091](https://github.com/openclaw/openclaw/issues/172091)（状态：已关闭，需确认修复是否覆盖所有边界情况）。
*   **P1 - 功能失效/回归**
    *   **Windows 更新修复失败**：[Issue #182476](https://github.com/openclaw/openclaw/issues/182476)（状态：Open，`OPENCLAW_STATE_LEASE_LOST` 错误）。
    *   **Codex 子代理清理失败**：[Issue #172837](https://github.com/openclaw/openclaw/issues/172837)（状态：Open，导致消息丢失）。
    *   **模型 Fallback 失效**：[Issue #168456](https://github.com/openclaw/openclaw/issues/168456)（状态：Open，标记为 `queueable-fix`）。
    *   **SSE 流挂起**：[Issue #145203](https://github.com/openclaw/openclaw/issues/145203)（状态：Open，看门狗未触发恢复）。
*   **P2 - 体验/性能**
    *   **会话上下文膨胀**：[Issue #67419](https://github.com/openclaw/openclaw/issues/67419)（状态：Stale，长期未解决，浪费 20-30% Token）。
    *   **Prompt-cache 失效**：[Issue #143017](https://github.com/openclaw/openclaw/issues/143017) 和 [Issue #146902](https://github.com/openclaw/openclaw/issues/146902)（状态：Open，工具集变动导致缓存重写）。
    *   **Windows 睡眠/恢复重连失败**：[Issue #140010](https://github.com/openclaw/openclaw/issues/140010)（状态：Open，UI 重连延迟 30-60s）。

### 6. 功能请求与路线图信号
*   **动态 SharePoint 站点解析**：[Issue #136271](https://github.com/openclaw/openclaw/issues/136271) 提议在 Teams 渠道文件中自动解析 SharePoint 站点，避免硬编码 ID。相关 PR 已开放（`linked-pr-open`）。
*   **延迟完成模式 (wakeOnReply)**：[Issue #112372](https://github.com/openclaw/openclaw/issues/112372) 建议在 `sessions_send` 中添加源绑定延迟完成功能，允许目标运行完成后再返回结果。相关 PR 已开放。
*   **Android 原生审批流匹配**：[Issue #175826](https://github.com/openclaw/openclaw/issues/175826) 请求 Android 端匹配浏览器内的可选问题和原生审批请求。
*   **内存压力感知准入**：[Issue #161050](https://github.com/openclaw/openclaw/issues/161050) 建议在 `sessions_spawn` 中引入基于内存压力的准入控制，而非仅基于并发数，以小主机优化为目标。

### 7. 用户反馈摘要
*   **痛点**：
    *   **资源消耗**：用户普遍抱怨 Gateway 和 Agent 的基线 RSS 内存过高（如 [Issue #181432](https://github.com/openclaw/openclaw/issues/181432) 中从 300MB 飙升至 1.9GB），以及 SQLite 数据库文件不断膨胀导致磁盘占满。
    *   **Windows 支持薄弱**：多个 Issue（#170956, #182476, #139082）指出 Windows 平台的更新、重启和权限管理不如 Linux/macOS 稳定，频繁出现“假死”或更新失败。
    *   **静默失败**：用户在拒绝工具（`tools.deny`）后，记忆持久化被静默禁用但 Agent 仍报告成功（[Issue #126906](https://github.com/openclaw/openclaw/issues/126906)），以及模型 Fallback 在超时后未正确触发（[Issue #118793](https://github.com/openclaw/openclaw/issues/118793)）。
*   **满意/改进**：
    *   社区对 `clawsweeper` 自动化标签系统的响应速度表示认可，Bug 分类清晰（P0/P1/P2）。
    *   部分用户发现通过手动 `wal_checkpoint(TRUNCATE)` 可以临时解决 SQLite 膨胀问题，表明对底层机制有一定理解。

### 8. 待处理积压
*   **长期未响应的核心稳定性 Issue**：
    *   [Issue #67419](https://github.com/openclaw/openclaw/issues/67419)（会话上下文膨胀）标记为 `stale` 且为 P2，但影响所有多轮对话的成本，建议重新评估优先级。
    *   [Issue #114414](https://github.com/openclaw/openclaw/issues/114414)（Dated TODO sweep）由 Bot 创建于 7 月，包含多项逾期 CI/维护任务，需维护者清理。
*   **高价值未合并 PR**：
    *   [PR #185070](https://github.com/openclaw/openclaw/pull/185070) 修复了 Cron 任务运行时绑定错误（P2，`security-sensitive-changed`），涉及安全边界，需尽快审查。
    *   [PR #183777](https://github.com/openclaw/openclaw/pull/183777) 修复了 Gateway 在模型设置后失去权限的问题（P1，`security-boundary`），影响用户入驻流程。
    *   [PR #184846](https://github.com/openclaw/openclaw/pull/184846) 修复了群聊中其他用户消息被丢弃的问题（P2，`needs proof`），需补充测试证明。

**维护者建议**：优先处理 P0 级别的 SQLite WAL 泄漏和 Gateway 阻塞问题，这两者直接影响服务的可用性和用户信任度。同时，加强 Windows 平台的更新机制测试，减少用户手动干预的频率。

---

## 横向生态对比

# 2026-10-27 个人 AI 助手与开源智能体生态横向对比分析报告

## 1. 生态全景
2026 年 10 月底，个人 AI 助手与自主智能体开源生态正处于**高强度的"架构收敛与稳定性攻坚"并行期**。各大核心项目（OpenClaw, Zeroclaw, hermes-agent 等）均未发布正式版本，但内部代码迭代与 Issue/PR 处理量极度高热，主要精力集中在修复近期架构合并或升级引入的回归 Bug（如会话隔离失效、线程死锁、内存泄漏）。生态整体面临的核心挑战已从单纯的"功能探索"转向**底层运行时资源管理（内存/CPU）、长会话数据完整性以及多端/多渠道状态一致性**。社区对"开箱即用"的稳定性和资源成本（Token 消耗、内存占用）的敏感度显著提升，要求官方提供更精细化的控制平面，同时也推动了插件生态与底层权限模型（IAM/MCP）的快速演进。

## 2. 各项目活跃度对比

| 项目 | Issues 处理 | PR 处理 | 版本发布 | 社区热点焦点 | 项目健康度评估 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500+ 更新 (101 关闭) | 500+ 更新 (321 合并/关闭) | 无 | SQLite WAL 膨胀、Gateway 阻塞、Windows 可靠性 | **极活跃/高风险**。高频迭代带来大量 P0 级稳定性隐患，基础设施面临巨大压力。 |
| **Zeroclaw** | 23 新增 | 29 新增 (1 合并) | 无 | IAM 权限模型演进、OIDC 安全强化、反代绕过风险 | **活跃/架构审查期**。处于深度架构演进期，安全机制（身份/访问控制）密集重构。 |
| **PicoClaw** | 4 更新 | 5 更新 | 无 | 智能路由 Token 空转/成本失控、清理技术债务 | **中等活跃/成本预警**。清理陈旧 PR，但智能路由逻辑缺陷导致严重的资源消耗异常。 |
| **QwenPaw** | 25 更新 | 49 更新 | 无 | 线程耗尽、LLM 流式挂起、压缩失败、渠道隔离 | **活跃/长稳攻坚期**。工程侧修复密集，聚焦于解决 7x24 小时长期运行下的资源泄漏与架构隔离。 |
| **hermes-agent** | 450+ 更新 | 100+ 合并 | 无 | 多端会话状态污染、桌面端沙箱崩溃、统一网关回归 | **极活跃/跨端协同期**。多端（桌面/Web）并发架构带来的状态隔离与数据一致性挑战凸显。 |
| **AstrBot** | 11 新增 | 34 新增 (9 合并) | 无 | 群聊上下文优化、插件权限与降级、MCP 集成 | **高频迭代/业务深水区**。代码合并迅速，用户深入集成复杂业务逻辑，反馈具体且直接。 |
| **DeepSeek Harness** | 无 Issue (195 讨论) | 无 PR | 0 个 Release | 工作区创建 P0 故障、Token 消耗过高、Windows 桌面端 DLL 崩溃 | **停滞/信任受损期**。处于"高热度讨论、无代码交付"的维护真空，核心功能存在阻断性故障。 |

## 3. OpenClaw 在生态中的定位
*   **优势与规模**：OpenClaw 是绝对的核心参照，拥有最高的绝对 Issue/PR 吞吐量（双 500 级别）和最复杂的内部系统组件（Gateway、SQLite、沙箱 Workspace）。它是当前生态中用户基数最大、社区驱动最强烈的旗舰级项目。
*   **技术路线差异**：与 DeepSeek Harness 这种强绑定单一大模型生态并偏向桌面 GUI 的产品不同，OpenClaw 走的是**全栈独立、多模型适配且高度插件化的通用 Agent 运行时**路线。它不仅在底层提供了复杂的流式网关（Gateway）和持久化机制，还在多渠道（Slack/飞书/Telegram等）和 Skill Workshop 等高级特性上具有极高的定制深度。
*   **痛点特征**：OpenClaw 目前最大的定位挑战是**“高复杂度带来的底层资源失控”**。作为全栈系统，其 SQLite WAL 内存膨胀和 Windows 平台的可靠性问题，暴露了在缺乏严格架构隔离时，通用 Agent 运行时在长时间运行下的工程化短板。

## 4. 共同关注的技术方向
多个项目在社区动态中涌现出高度一致的技术诉求，反映了智能体落地的共性痛点：

1.  **长会话/长时运行的资源治理（内存与 Token 膨胀）**
    *   **涉及项目**：OpenClaw, QwenPaw, PicoClaw, DeepSeek Harness
    *   **具体诉求**：各系统在运行 7x24 小时或执行复杂任务后出现数据库/WAL 文件无限膨胀（OpenClaw #143524）、线程耗尽（QwenPaw #8279）以及上下文/记忆占用过多（DeepSeek #8934）。社区强烈要求框架提供**基于内存压力的准入控制（Admission Control）**（OpenClaw #161050）、**按块的数据过期机制（Block Retention）**（QwenPaw #7923）以及**细粒度的 Token 预算管理/压缩机制**。
2.  **身份访问控制（IAM）与权限最小化演进**
    *   **涉及项目**：Zeroclaw, AstrBot, OpenClaw
    *   **具体诉求**：随着 Agent 能力增强（如执行 Cron、Shell 脚本、工具调用），非管理员或普通用户的权限隔离变得紧迫。Zeroclaw 正在引入 OIDC 企业级登录和稳定的拒绝原因标识；AstrBot 优化了 Local 运行时下基于文件读取工具的权限降级机制；OpenClaw 收紧了内部导出表面并强化网关安全。目标是防止非特权上下文跨越沙箱访问高危资源。
3.  **多端/多渠道状态一致性与隔离**
    *   **涉及项目**：hermes-agent, QwenPaw
    *   **具体诉求**：随着 Web UI、桌面端（Mac/Win/Linux）和命令行（CLI）同时接入同一个 Agent 内核，跨端同步导致的数据污染（会话交叉记忆注入）和进程隔离成为重点。QwenPaw 提议将通讯渠道抽离到独立子进程以防崩溃连坐；hermes-agent 正在重构多端路由逻辑以防止数据库锁导致的数据丢失。
4.  **MCP（Model Context Protocol）工具的精细集成**
    *   **涉及项目**：QwenPaw, AstrBot, OpenClaw
    *   **具体诉求**：对 MCP 的依赖不仅限于数据获取，用户需要解决老协议兼容性问题（QwenPaw #8424），并要求 MCP 工具在执行耗时操作或失败时具备更优雅的流式输出和状态回传机制（OpenClaw 的 Gateway 阻塞与 SSE 挂起）。

## 5. 差异化定位分析

| 维度 | 旗舰级全栈开源平台 (OpenClaw, hermes-agent, QwenPaw) | 垂直/特定生态适配工具 (Zeroclaw, DeepSeek Harness) | 特定场景/轻量助手 (PicoClaw, AstrBot) |
| :--- | :--- | :--- | :--- |
| **功能侧重** | 高度可定制化，强调底层网关（Gateway）、工作区管理、复杂的 Agent 逻辑流和跨端多通道接入。 | **Zeroclaw** 偏向于极客/企业级安全与 IAM 权限重构；**DSH** 偏向于桌面 GUI 体验及与特定模型（DeepSeek）的深度绑定。 | **PicoClaw** 主打个人通讯渠道（iMessage/SMS/Telegram）；**AstrBot** 主打群聊“拟人化”参与、社区业务逻辑深度集成。 |
| **目标用户** | 追求极高可玩性与可控性的开发团队、硬核 AI 工程师、多端重度用户。 | 对数据安全极度敏感的企业部署者；单一模型生态下的重度 GUI 用户。 | 希望将 AI 助手快速嵌入特定通讯协议的个人开发者、需要群聊辅助的中小型团队。 |
| **技术架构** | **复杂架构**：独立核心进程、复杂 RPC 网关、强类型持久化层（SQLite/WAL）、多语言/全栈混合（C++/Rust 与 JS/Go 结合）。 | **安全/封闭架构**：Zeroclaw 强依赖 OIDC 和权限边界；DSH 基于特定大模型上下文优化，但桌面端架构封闭性较强。 | **轻量微架构**：主要作为单一渠道或特定框架的适配器/中间件运行，技术栈相对单一（Python/Rust/Go）。 |

## 6. 社区热度与成熟度
*   **高频快速迭代阶段（架构收敛与排雷期）**
    *   **OpenClaw & hermes-agent**：处于绝对的活跃高峰期，大量 P0/P1 级底层 Bug（内存、锁、状态污染）需要密集修补。这两个项目正在经历从“功能大爆发”向“工程高内聚”转变的阵痛期。
    *   **AstrBot**：核心业务逻辑稳定，但在细粒度业务场景（如群聊管理、MCP 交互）上迭代频繁，社区响应速度极快，属于**健康且活跃的业务深水区**。
*   **核心能力质量巩固与架构演进阶段**
    *   **QwenPaw & Zeroclaw**：处于底层基础设施的安全与资源治理阶段。QwenPaw 致力于解决 7x24 小时部署下的资源泄漏与进程隔离（进程解耦）；Zeroclaw 则处于 IAM（身份与访问控制）系统向企业级/多租户演进的关键架构审查期。
*   **停滞/信任重建阶段**
    *   **DeepSeek Harness**：由于处于“高热度讨论、无代码交付”的维护真空，核心功能（工作区创建）存在 P0 级阻断且无明确修复时间表，面临较高的用户流失风险。其技术成熟度在桌面端 GUI 领域仍需大幅提升。
*   **成本预警/小规模维护阶段**
    *   **PicoClaw**：规模相对较小，当前面临的最大挑战是“智能路由”算法的缺陷导致的 Token 成本失控，技术路线相对单一，处于小规模维护与修补期。

## 7. 值得关注的趋势信号（对 AI 智能体开发者）
1.  **从“能跑通”向“算得过账”（Cost & Resource Control）转变**：智能体框架正在摆脱“无限消耗上下文和内存”的野蛮生长。开发者必须在 Agent 内核层引入**内存压力准入（Memory-based Admission Control）**和**按块/按时间的自动过期（Time/Block-based Retention）**机制。PicoClaw 的路由空转和 DSH 的高额 Token 成本是明确的警示：智能路由和默认工具集的 Token 效率必须作为一级指标进行监控。
2.  **多渠道与多端状态隔离是长期痛点**：当 Agent 同时存在于 Web、桌面、Telegram、Slack 时，**“数据污染”（Data Poisoning）**和“状态丢失”成为最高频灾难。趋势显示，优秀的 Agent 框架必须实现严格的路由级会话隔离，并且将耗时的外部通讯（如 WebUI 渲染、MCP 调用、插件执行）放到独立的**子进程/沙箱**中运行（QwenPaw 的渠道解耦、OpenClaw 的 Workspace 沙箱），防止外部依赖挂起整个宿主进程。
3.  **安全与权限模型（IAM）前置化**：随着 AI 被授予更高权限（如执行 Shell、写 SQLite 库、发送消息），基于角色的访问控制（RBAC）将取代原本简单的“单用户信任模型”。开发者应尽早设计**明确的权限拒绝原因（Stable Deny Reasons）**，并引入类似 OIDC 的企业级验证手段，防止非特权角色通过通配符权限（Wildcard Perms）越权访问高危工具（如 Cron、外部 Shell）。
4.  **底层基础设施（SQLite/向量数据库）工程化**：OpenClaw 和 QwenPaw 在 SQLite 上的大量崩溃和 WAL 膨胀表明，在智能体场景下，向量数据库和常规关系型数据库的并发读写、事务管理、以及长生命周期下的日志清理机制需要定制化处理（如定期 TRUNCATE，细粒度锁管理）。智能体开发者需要对底层的持久化层进行深度压测，避免直接复用非为 7x24 高并发设计的基础组件。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 (2026-10-27)

## 1. 项目今日速览
今日项目处于 v0.9.0 深度开发与 v0.8.7 安全加固并行的高活跃期。过去 24 小时内，新增 23 个 Issue 和 29 个 PR，其中安全与身份访问控制（Identity-Access）成为绝对焦点，占比超过 60%。虽然今日无版本发布且仅有 1 个 PR 被合并，但社区在网关安全边界、OIDC 认证及内存管理方面的讨论极度密集，反映出项目正处在架构稳定性的关键审查阶段。整体社区活跃度为极高，大量 PR 和 Issue 在当日 24:00 前完成了状态更新或提交。

## 2. 项目进展
今日项目进展主要体现在**身份与权限（IAM）安全体系**的深化以及**多渠道能力的扩展**。

*   **OIDC 仪表盘登录体系建立**：
    *   一系列 PR 正在构建基于 OIDC 的仪表盘登录功能，标志着 ZeroClaw 从单一配对码模式向企业级/多租户安全模式演进。
    *   相关进展包括添加可配置的 OIDC 登录、修复 OIDC 注册的凭据编码问题，以及完善 OIDC 重定向 URI 的校验逻辑。

*   **权限隔离与 RPC 安全加固**：
    *   团队正在收紧 RPC 授权机制，通过引入稳定的拒绝原因标识符，并拒绝非管理员访问持久化日志。
    *   关键改进是修复了非管理员角色拥有通配符权限时，仍然可以访问受限制工具（如 Cron、SOP 执行）的安全漏洞。

*   **渠道扩展与维护**：
    *   新增原生 Rust XMPP 支持，旨在替代旧的兼容性 worker，提升性能并引入可选的 OMEMO 加密。
    *   修复了 Telegram 渠道中的 429 重试错误和转录失败问题，增强了渠道层对网络波动的鲁棒性。

*   **底层运行时优化**：
    *   实施系统提示符大小预算的严格限制（Fail-closed），防止提示符过长耗尽上下文窗口。
    *   引入延迟引导（Deferred Bootstrap）功能，允许 Agent 按需加载知识片段，优化常驻上下文开销。

## 3. 社区热点
今日社区讨论高度集中在**网关安全漏洞修复**上，尤其是 `@IftekharUddin` 提交的关于登录流程和安全边界的系列 PR。

*   **OIDC 登录 CSRF 防护争议**：用户发现网关的 OIDC 回调 Token 页面缺乏浏览器绑定，允许登录 CSRF 攻击。社区正在等待合并 PR #12048 和 #12049 以加强重定向 URI 的校验和防止 DoS 攻击。
*   **身份代理漏洞（Proxy Bypass）**：PR #12052 指出网关限流器信任 `X-Forwarded-For` 的第一个条目，导致反代后的攻击者可以伪装回环地址。这一发现引发了关于代理头部信任机制的广泛讨论。
*   **工具隔离失效**：在 Issue #12046 中，社区讨论了非管理员如果使用通配符工具选择器，依然能保留 `cron` 等高危工具，违反了最小权限原则。这反映了底层权限模型在演进过程中的复杂性。

## 4. Bug 与稳定性
今日报告的 Bug 主要集中在**配置生效性**和**资源管理**两个维度，按严重程度排列如下：

*   **[S1] 持久化路径失败导致工作流阻断**：在 #10673 中，ACP 路径上的 ZeroCode 代码面板未能持久化失败的 Turn，导致用户体验受损。此 Bug 已有修复方案，预计将作为后续版本的重要补丁。
*   **[S2] 内存检索遗漏合格结果**：#10921 指出 Qdrant 向量检索在处理带时间限制（time-bounded）的召回时，可能会遗漏符合条件的结果，严重影响长期记忆系统的可靠性。
*   **[S2] 配置项失效**：#10780 和 #10781 揭示 v0.8.5 及后续版本中，多个配置项（如 `context_compression`）实际上并不生效。用户设置的 Token 预算压缩并未触发，导致上下文溢出。
*   **[S3] Web UI 状态未刷新**：#12021 报告在 Web UI 中保存配置后，保存按钮的高亮状态未正确清除。此问题已在 PR #12039 中提交修复。
*   **[S3] 测试环境破坏**：#11825 发现 `codex_cli` 测试清空了进程 PATH，导致并行 Cargo 测试失败，影响了开发者的本地 CI 效率。

## 5. 功能请求与路线图信号
社区的新功能请求反映出对**精细化的 Agent 行为控制**的强烈需求：

*   **外部重排阶段（Reranking）**：#12022 建议在内存召回中增加可选的外部重排阶段，允许用户配置 `/v1/rerank` 端点来优化候选结果。这表明 ZeroClaw 正在寻求更灵活的记忆检索管线。
*   **原生思维层级（Thinking Levels）**：#12054 请求在 OpenAI 渠道中支持运行时的思维层级配置，允许多个 Agent 在同一提供商下使用不同的原生推理强度。
*   **文件统一模型（Unified File Intake）**：#11013 是一个巨大的追踪器，旨在协调实现统一文件的接入、解析、投影和投递，是 v0.9.0 架构级的重要特性。
*   **多模态与多媒体**：PR #12045 提到对受控 URL 的响应体缓冲，暗示了多模态（如远程图片）支持正在开发中。

## 6. 用户反馈摘要
从 Issue 评论中提取的典型用户痛点包括：

*   **对“失效配置”的挫败感**：用户抱怨设置了降低 Token 消耗的配置后，实际行为没有任何变化（#10781），影响了长期会话的性能预期。
*   **代理部署下的安全风险**：在反代环境下运行的用户发现，即使开启了特定的限流设置，攻击者仍能通过修改 Header 绕过限制，导致服务面临恶意扫描风险。
*   **插件生命周期管理的担忧**：在 #11562 中，用户指出插件更新期间可能出现“跨代”的 Manifest 配对问题，导致旧版本的组件在新环境下短暂运行，这在企业级部署中被视为安全隐患。

## 7. 待处理积压
以下项目长期处于活跃但未解决状态，需要维护者重点关注：

*   **长期会话持久化**：#11711 报告修剪长会话会永久删除旧 Turn，这是一个严重的数据完整性问题，且已有 4 条评论但未合并 fix PR。
*   **上下文压缩机制**：#10780 和 #10781 是关联的 P1/P2 优先级问题，涉及核心运行时逻辑。虽然部分代码已提交，但尚未在主干上验证完毕。
*   **第三方安全审查**：#12042 提出 Hlido 对 ZeroClaw 进行了独立安全审查并给出了 79/100 的评分，且指出了多处漏洞。该 Issue 作为外部审计反馈，尚未被开发者完全回应或解决。
*   **Git 渠道一致性**：#12041 请求 Gitea/Forgejo 渠道的功能应与 GitHub 对齐，目前仍是一个开放的功能请求，缺乏实现进度。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报 (2026-10-27)

## 1. 今日速览
过去 24 小时，PicoClaw 项目保持中等活跃度，共记录 4 条 Issue 更新和 5 条 PR 更新，无新版本发布。社区讨论主要集中于智能路由的资源消耗异常（#3445）以及 Web UI 交互体验优化（#3450）。在代码层面，项目清理了多个长期未合并的旧 PR（如 Anthropic 修复、WebSocket 认证等），标志着部分技术债务的清理或方案替换。整体而言，项目处于功能迭代与稳定性修复并行的阶段，但需警惕智能路由机制带来的成本风险。

## 2. 版本发布
*无新版本发布。*

## 3. 项目进展
今日主要动态集中在 PR 的关闭与清理，表明维护者对长期未合并或不再适用的代码变更进行了决断：
*   **Anthropic 提供商修复关闭**：PR [#898](https://github.com/sipeed/picoclaw/pull/898) 旨在修复 Anthropic 400 Bad Request 错误，但该 PR 创建时间早（2026-02-28），今日被标记为 CLOSED。这可能意味着修复已通过其他方式合并，或该 PR 因架构变动而失效。
*   **批量合并请求处理**：PR [#1550](https://github.com/sipeed/picoclaw/pull/1550) 试图一次性合并多个之前的修复（#1442, #1435, #1434, #1430），今日关闭。这表明项目可能倾向于单独合入或这些修复已随其他更新上线。
*   **WebSocket 安全标准化**：PR [#2363](https://github.com/sipeed/picoclaw/pull/2363) 修复 WebSocket 认证并统一头部大小写，今日关闭。需确认该安全修复是否已生效，若未合入，建议维护者重新审视该变更的必要性。
*   **多智能体团队功能搁置/调整**：PR [#976](https://github.com/sipeed/picoclaw/pull/976) 实现了多智能体 Teams 架构（协调者分解任务并委托给并发 goroutines），今日关闭。这可能代表该复杂功能在当前版本中被推迟或需要重构。

## 4. 社区热点
*   **智能路由资源消耗预警（高关注度）**：
    *   **Issue**: [#3445](https://github.com/sipeed/picoclaw/issues/3445) `[OPEN]`
    *   **分析**: 用户报告智能路由在轻量模型上发生严重空转，单轮对话消耗约 1310 万输入 token（222 次 LLM 调用）。这是目前社区最紧迫的痛点，直接导致成本激增和响应停滞。虽然评论数仅为 1，但其技术严重性极高，预计将成为近期维护重点。
*   **Web UI 会话管理需求**：
    *   **Issue**: [#3450](https://github.com/sipeed/picoclaw/issues/3450) `[OPEN]`
    *   **分析**: 用户请求在 Web UI 中增加文件夹功能以整理启动器会话历史。当前 UI 仅展示扁平化时间序列，对于长期使用 PicoClaw 的用户来说，查找历史对话效率低下。这是一个典型的 UX 改进需求。
*   **Telegram 格式回退问题**：
    *   **Issue**: [#3426](https://github.com/sipeed/picoclaw/issues/3426) `[CLOSED]`
    *   **分析**: 该 Issue 今日关闭，解决了 Telegram MarkdownV2 中链接和引用块转义不当导致整体回退为纯文本的问题。关闭状态表明该 Bug 已得到修复或被标记为不再追踪。

## 5. Bug 与稳定性
按严重程度排列：

1.  **[严重] 智能路由无限循环/空转**
    *   **Issue**: [#3445](https://github.com/sipeed/picoclaw/issues/3445)
    *   **描述**: 轻量模型在单轮内空转 222 次，消耗巨量 Token 且无有效进展。
    *   **状态**: 开放中，暂无明确 Fix PR。
    *   **影响**: 极高，涉及成本控制与可用性。建议维护者立即介入调查路由逻辑的终止条件。
2.  **[中等] 新 Bug 报告（信息缺失）**
    *   **Issue**: [#3449](https://github.com/sipeed/picoclaw/issues/3449)
    *   **描述**: 标题仅标注 `[BUG]`，摘要中环境信息（版本、Go 版本、模型等）均为模板占位符，未填写具体细节。
    *   **状态**: 开放中。
    *   **建议**: 需联系作者补充具体报错信息和复现步骤，否则无法评估严重程度。
3.  **[低/已解决] Telegram Markdown 渲染故障**
    *   **Issue**: [#3426](https://github.com/sipeed/picoclaw/issues/3426)
    *   **描述**: MarkdownV2 转义错误导致格式丢失。
    *   **状态**: 已关闭（Closed）。

## 6. 功能请求与路线图信号
*   **Web UI 会话文件夹**: Issue [#3450](https://github.com/sipeed/picoclaw/issues/3450) 提出了组织会话历史的需求。鉴于 PicoClaw 作为个人 AI 助手的定位，随着使用时间增长，会话管理的重要性上升，该功能很可能被纳入近期 UI 迭代。
*   **iMessage/SMS 渠道支持**: PR [#3416](https://github.com/sipeed/picoclaw/pull/3416) `[OPEN]` 提议添加 Sendblue 集成，允许用户通过 iMessage/SMS 与 PicoClaw 交互。这是一个扩展渠道多样性的功能，目前处于 Draft/Open 状态，表明社区对移动端即时通讯集成有较强兴趣。
*   **多智能体协作**: 虽 PR [#976](https://github.com/sipeed/picoclaw/pull/976) 被关，但多智能体架构是 AI Agent 领域的重要趋势。需关注后续是否会有重构后的版本提交。

## 7. 用户反馈摘要
*   **痛点**: 用户对**成本不可控**（#3445）反应强烈，智能路由在简单任务上的冗余调用被视为严重的资源浪费。此外，**界面易用性**（#3450）是长期用户的主要抱怨点，扁平化的历史记录难以管理。
*   **使用场景**: 用户正在尝试将 PicoClaw 接入更多个人通讯渠道（如 iMessage，见 PR #3416），并希望解决 Telegram 等主流渠道的格式兼容性问题（#3426）。
*   **不满意**: 部分 Issue（如 #3449）提交质量较低，缺乏调试信息，给维护者排查带来困难。

## 8. 待处理积压
*   **长期未响应的旧 PR**:
    *   PR [#898](https://github.com/sipeed/picoclaw/pull/898), [#1550](https://github.com/sipeed/picoclaw/pull/1550), [#2363](https://github.com/sipeed/picoclaw/pull/2363), [#976](https://github.com/sipeed/picoclaw/pull/976) 创建时间均为 2026 年 2-4 月，今日集中关闭。维护者需确认其中是否包含关键修复（如 WebSocket 安全、Anthropic 兼容性）被遗漏，若被简单关闭而非合并，建议重新评估。
*   **Stale Issues**:
    *   Issue [#3426](https://github.com/sipeed/picoclaw/issues/3426) 和 [#3445](https://github.com/sipeed/picoclaw/issues/3445) 均被标记为 `[stale]`。特别是 #3445（智能路由空转）作为高严重性 Bug，不应再被标记为 stale，维护者应立即移除 stale 标签并优先处理，避免给用户项目停滞的错觉。

**健康度评估**: 项目活跃度正常，但存在**稳定性风险**（智能路由空转）和**技术债务清理**（大量旧 PR 关闭）。建议维护者优先解决 #3445 的成本/逻辑问题，并审视关闭旧 PR 时是否保留了关键安全修复。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 (2026-10-27)

## 1. 今日速览
QwenPaw 过去 24 小时社区活跃度较高，共处理 Issues 25 条和 PR 49 条，虽无官方版本发布，但工程侧进展显著。团队集中修复了多个阻碍日常使用的关键 Bug，包括 ZIP 解压乱码、上下文压缩失败及 MCP 协议兼容性问题，同时正在推进 Linux 桌面端支持及本地 Whisper 插件化等架构级特性。项目核心痛点聚焦于长期运行的稳定性、内存管理及多协议适配。

## 2. 版本发布
（今日无新版本发布）

## 3. 项目进展
今日合并/关闭的重要 PR 推进了多项功能与修复，使项目整体向前迈进一大步。
*   **稳定性修复：** 修复了 ReMe 嵌入重索引因单条数据超出 Token 限制导致整批失败的问题，现已合并 [PR #8062](https://github.com/agentscope-ai/QwenPaw/pull/8062)；修复了 OpenAI 兼容 Responses API 在终端事件中丢失流式输出的致命 Bug，现已合并 [PR #8165](https://github.com/agentscope-ai/QwenPaw/pull/8165)。
*   **功能演进：** 完成了滚动历史管理器中工具结果块的按需过期机制（`blocks_retention_days`），大幅优化长期运行下数据库的膨胀问题，已合并 [PR #7923](https://github.com/agentscope-ai/QwenPaw/pull/7923)；同时完成了针对 Windows 桌面端进程协调的紧急 Bug 修复，避免多开导致后进程误杀前进程的后端，已合并 [PR #8033](https://github.com/agentscope-ai/QwenPaw/pull/8033)。

## 4. 社区热点
今日讨论最活跃、评论最多的 Issues 与 PRs 如下，反映了社区对底层架构和长稳表现的高关注度：
*   **[#8071] 面向插件的主题扩展点 (语义 Token 覆盖层)**：评论数 12，[链接](https://github.com/agentscope-ai/QwenPaw/issues/8071)。*分析：* 背后诉求是高级插件作者希望突破当前仅能修改主要颜色的单点限制，实现深度的 UI 定制，表明插件生态正在走向精细化。
*   **[#8040] 嵌入重索引不完整（CJK 文本超限时静默丢批次）**：评论数 6，[链接](https://github.com/agentscope-ai/QwenPaw/issues/8040)。*分析：* 核心诉求为数据完整性，用户强烈反映在处理中文（CJK）文档时，单条超限会导致整批被 Provider 静默拒绝，严重影响长文记忆。
*   **[#8178] 支持嵌套（分类）的 Skill 目录**：标签 `size/XL`，[链接](https://github.com/agentscope-ai/QwenPaw/pull/8178)。*分析：* 大量高级用户希望 Skill 组织形式能从扁平化向多级分类演进，以应对规模扩大后的维护压力。

## 5. Bug 与稳定性
今日报告的 Bug 主要集中在协议兼容、线程死锁与内存耗尽，按严重程度排列如下：

*   **【严重】 线程耗尽导致同步端点停滞**
    *   详情：长期运行的 ReMe 观察者进程耗尽 AnyIO 默认线程限制器，阻塞核心 HTTP 端点。[Issue #8279](https://github.com/agentscope-ai/QwenPaw/issues/8279)。
    *   状态：**暂无 Fix PR**（需重点跟进资源泄漏与线程池生命周期管理）。
*   **【严重】 LLM 流式请求无限挂起**
    *   详情：Rate-limiter 信号量未释放且看门狗未触发，导致请求在零日志状态下永久挂起。[Issue #8435](https://github.com/agentscope-ai/QwenPaw/issues/8435)。
    *   状态：**暂无 Fix PR**。
*   **【严重】 上下文压缩必定 400 失败**
    *   详情：火山引擎 AgentPlan 的特定模型（glm-5.3-flash）不支持兼容层下发的 `thinking.type=disabled`，导致手动/自动压缩全量失败。[Issue #8417](https://github.com/agentscope-ai/QwenPaw/issues/8417)。
    *   状态：**暂无 Fix PR**（需在 Provider 适配层做参数特判）。
*   **【中等】 ZIP 压缩包解压 CJK 乱码（已关闭）**
    *   详情：Windows 环境下解压未传递 encoding 参数，导致中文文件名乱码。[Issue #8270](https://github.com/agentscope-ai/QwenPaw/issues/8270)。
    *   状态：**已有修复**（今日已关闭）。
*   **【中等】 老协议 MCP 服务器握手失败**
    *   详情：部分服务器返回特定 404 时，客户端误判为现代协议不可用，未能正确回退至 legacy 握手。[Issue #8424](https://github.com/agentscope-ai/QwenPaw/issues/8424)。
    *   状态：**已有 Fix PR** [PR #8445](https://github.com/agentscope-ai/QwenPaw/pull/8445)。
*   **【中等】 Mail 监控器拼接错误**
    *   详情：邮箱账号名填写完整邮箱地址时，程序强制追加域名，生成 `user@domain@domain` 导致鉴权失败。[Issue #8425](https://github.com/agentscope-ai/QwenPaw/issues/8425)。
    *   状态：**已有 Fix PR** [PR #8438](https://github.com/agentscope-ai/QwenPaw/pull/8438)。

## 6. 功能请求与路线图信号
今日多项 PR 与 Issue 展示了下一阶段路线图信号：
*   **跨平台桌面端对齐 (极高概率推进)**：社区强烈呼吁补齐 Linux 桌面端缺失的 deb/AppImage 构建，并请求提供 Wayland 下的 Computer Use 功能。目前已有对应的大型 PR [PR #8444](https://github.com/agentscope-ai/QwenPaw/pull/8444) 待合并，预计将随下一个大版本发布。
*   **多模态本地化**：本地 Whisper 组件将全面重构为 SDK 插件，由框架统一管理生命周期与资源调度，以降低宿主进程负担。[PR #8431](https://github.com/agentscope-ai/QwenPaw/pull/8431)。
*   **架构解耦与进程隔离**：正在探索将官方通讯渠道（Channels）抽离并加入子进程隔离，防止渠道异常崩溃连带宿主主进程，[PR #8187](https://github.com/agentscope-ai/QwenPaw/pull/8187) 正在评审中。
*   **本地模型订阅支持**：新增支持原生 ChatGPT 订阅签入（OAuth+PKCE），允许用户绕过 API Key 直接消耗本地订阅额度，[PR #8437](https://github.com/agentscope-ai/QwenPaw/pull/8437)。

## 7. 用户反馈摘要
基于 Issue 评论提炼，用户在使用场景中存在明显的痛点：
*   **内存控制焦虑**：对于跑满 7x24 小时部署的环境，用户极度关注数据库（如 `history.db`）的体量膨胀问题。虽然通过 [PR #8443](https://github.com/agentscope-ai/QwenPaw/pull/8443) 引入了针对工具结果的按块保留机制，但长任务运行下的资源回收依然是最高频的差评来源。
*   **定时任务的 Token 浪费**：大量用户指出纯管线性质的定时任务（如数据抓取、报表生成）被迫继承 Agent 全局的高级推理（Thinking）设置，导致 Token 严重浪费。[Issue #8439](https://github.com/agentscope-ai/QwenPaw/issues/8439) 提出新增 `thinking_level` 字段，该诉求被迅速采纳并提交了 PR [PR #8429](https://github.com/agentscope-ai/QwenPaw/pull/8429)。
*   **前端体验瑕疵**：用户在日常交互中多次反馈控制台 UI 缺陷，例如 MCP 配置弹窗在 HTTP/SSE 模式下无法关闭（[Issue #8405](https://github.com/agentscope-ai/QwenPaw/issues/8405)），以及左侧侧边栏在展开分组时与首个会话背景重叠（[Issue #8333](https://github.com/agentscope-ai/QwenPaw/issues/8333)）。

## 8. 待处理积压
以下长期未响应的关键 Issue 与 PR 积压在代码库中，建议维护者重点关注以防架构腐化：
*   **[#4946] 插件导入失败阻塞启动**：创建时间 2026-06-03（长达 4 个多月），反映单个无效插件阻塞全局 6 分钟以上。虽已关闭，但需确认底层 `ImportError` 捕获与超时的兜底机制是否已在核心进程中彻底落实。
*   **[#8123] Daily Paper 任务模型截断无重试**：创建时间 2026-10-08，输出超限导致整个任务标错，目前缺乏针对子任务的细粒度 JSON 格式化重试机制，持续影响定时记忆报告的质量。
*   **[#7874] 彻底重构 SDK 和应用控制平面**：标签 `size/XXXL`，创建时间 2026-09-19，此 PR 涉及核心架构级的状态与重试控制重写。若长期搁置，后续针对长时运行稳定性的修补将不断产生耦合冲突。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

**hermes-agent 项目动态日报 | 2026-10-27**

### 1. 项目今日速览
过去24小时，项目社区活跃度极高，Issue 和 PR 的总更新量均突破 450 条，表明该项目（特别是其 Gateway 和 Desktop 组件）在开发者与重度用户社区中处于高度热演状态。今日未发布任何新版本，主要开发重心集中在修复近期“统一网关”（Unified Gateway）架构合并后引发的严重回归 Bug，以及解决并发会话隔离失效问题。尽管没有新 Release，但大量高优先级（P1/P2）修复 PR 正在快速推进，旨在解决会话状态污染和底层基础设施稳定性问题。

### 3. 项目进展
今日有超过 100 个 PR 被合并或关闭，显著推进了系统的稳定性与多端体验：
*   **多端会话路由优化**：合并了 [`#75981`](https://github.com/NousResearch/hermes-agent/pull/75981)，修复了多端场景下创建 Project 时因未校验 `primary_path` 导致重复注册相同路径的缺陷。
*   **多端环境同步修复**：合并了 [`#41043`](https://github.com/NousResearch/hermes-agent/pull/41043)，修复了源码安装更新后由于更新检查缓存 TTL 未失效，导致界面报告过时的落后 commit 数问题。
*   **基础设施增强**：多项基础 Bug 修复被合并，为多端插件系统的健康运转打下坚实基础。

### 4. 社区热点
以下 Issue 和 PR 是今日讨论最活跃、关注度最高的项目：
*   **多端授权限制讨论**：[`#131859`](https://github.com/NousResearch/hermes-agent/issues/131859)（52 条评论）反映了大量第三方开发者在通过 API 自动创建 Pull Request 时遭遇权限拦截。社区正在热议该机制的合理性以及如何为特定外部团队提供豁免策略。
*   **多端插件机制重构**：[`#64231`](https://github.com/NousResearch/hermes-agent/issues/64231)（31 条评论）提出了生命周期事件目录规范，社区正在激烈讨论多端插件的统一标准，以清理过去长期未决的多端 Hook PR。
*   **语音接口标准化**：[`#77111`](https://github.com/NousResearch/hermes-agent/issues/77111)（28 条评论）针对当前四个处于竞争状态的 Duplex 语音 PR 提出了设计 RFC，社区呼吁制定统一的接口抽象层（ABC）而非零散合并。
*   **文档底座网络**：[`#143379`](https://github.com/NousResearch/hermes-agent/issues/143379)（26 条评论）是一项涉及安全与架构的 RFC 讨论，探讨文档链（Doc-Chain）底座的网络读取与治理机制。
*   **桌面端沙箱崩溃**：[`#131055`](https://github.com/NousResearch/hermes-agent/issues/131055)（25 条评论）指出了特定 Linux 桌面环境下二次启动导致沙箱 Fallback 标记失效，进而引发渲染器死循环的问题。

### 5. Bug 与稳定性
近期发现的多个高严重性 Bug 严重影响了核心可用性，已有大量 Fix PR 提交正在等待合并：
*   **[P1] 多端定时任务数据丢失**：[`#135487`](https://github.com/NousResearch/hermes-agent/issues/135487) 指出多端 Restart-safe Worker 在执行 `adopt_claimed_execution()` 时由于缺少重试机制，在数据库锁定（`database is locked`）状态下会直接崩溃，导致发生的数据记录丢失。
*   **[P2] 多端会话状态污染**：[`#46303`](https://github.com/NousResearch/hermes-agent/issues/46303) 发现由于没有提供隔离机制，并行的多端会话会互相交叉污染（如共享记忆注入、共享多端 Git Worktree）。
*   **[P2] 多端桌面无法恢复**：[`#139818`](https://github.com/NousResearch/hermes-agent/issues/139818) 指出连接在远程后端的桌面端会话在进程重启后无法恢复（`not_found`）。
*   **[P2] 多端本地通知失效**：[`#143268`](https://github.com/NousResearch/hermes-agent/issues/143268) 报告多端本地 Kanban 的 `notify+wake` 订阅无法到达 FIFO，原因是 `LocalSessionAdapter` 缺少 `gateway_runner`。
*   **[P2] 多端桌面窗口透明度异常**：[`#143426`](https://github.com/NousResearch/hermes-agent/issues/143426)（今日已关闭）指出特定 Linux 桌面端启动时透明度固定在 6% 且默认开启了半透明渲染，目前已有对应的修复方案并已被标记为关闭。
*   **[P2] 多端远程服务异常**：[`#137838`](https://github.com/NousResearch/hermes-agent/issues/137838) 涉及多端 Gateway 进程退出及存活探针失效，目前仍处于排查状态。

### 6. 功能请求与路线图信号
*   **统一语音接口 (RealtimeVoiceProvider ABC)**：由 [`#77111`](https://github.com/NousResearch/hermes-agent/issues/77111) 的讨论可以看出，团队正准备在下一个版本中正式抽象并统一多端 Realtime Voice 插件，这是多端语音生态发展的关键节点。
*   **多端会话恢复机制完善**：基于 [`#139818`](https://github.com/NousResearch/hermes-agent/issues/139818) 和 [`#143268`](https://github.com/NousResearch/hermes-agent/issues/143268) 的反馈，后续版本将重点强化多端桌面应用的会话持久化及恢复逻辑。
*   **智能上下文管理**：[`#145300`](https://github.com/NousResearch/hermes-agent/pull/145300) 正在推进“当 Provider 400 超出上下文限制时自动压缩并重试”的功能，旨在提升长对话的可用性。
*   **多端国际化（i18n）**：[`#105503`](https://github.com/NousResearch/hermes-agent/pull/105503) 正在推进捷克语（Czech）支持，意味着多端应用正在持续扩展其用户基础，下一步可能增加更多欧洲语言。

### 7. 用户反馈摘要
*   **痛点：多端跨会话隔离失败**。许多重度用户在并发使用多端 Desktop 客户端和终端 UI 时，经常发现多个会话的上下文、记忆或工作区发生混乱 [`#46303`](https://github.com/NousResearch/hermes-agent/issues/46303)。
*   **痛点：多端通知延迟或不可靠**。自动化工作流（Kanban、定时任务）在触发通知唤醒会话时经常出现被拒绝（`admission_conflict`）或无法唤醒的情况 [`#142461`](https://github.com/NousResearch/hermes-agent/issues/142461)，导致用户认为系统不够智能可靠。
*   **满意点：多端桌面端及 UI 体验**。部分用户称赞了多端 Desktop 应用最近几版在 UI 渲染（如窗口透明度、侧边栏项目显示）上的进步，但也指出修复后仍带有若干渲染边缘 Bug [`#53004`](https://github.com/NousResearch/hermes-agent/issues/53004)。

### 8. 待处理积压
*   **Issue 积压总量超过 1000 个**：[`#7335`](https://github.com/NousResearch/hermes-agent/issues/7335) 指出项目的 Open Issues 数量依然庞大（部分多端相关标签下积压了数百个 Bug）。维护者需要关注清理积压的 P3 标签任务。
*   **长期未响应的 Bug**：[`#68128`](https://github.com/NousResearch/hermes-agent/issues/68128) 涉及多端 Windows 桥接程序生成失败，该 Issue 创建于 7 月，至今仍有大量用户受到影响且等待进一步处理。
*   **长期未合并的重要功能**：[`#27508`](https://github.com/NousResearch/hermes-agent/pull/27508) 是一个修复多端路由/会话隔离机制的基础 PR，创建于 5 月，由于涉及多端核心路由改动，至今仍在等待审核合并。
*   **长期未合并的 UI 优化**：[`#135652`](https://github.com/NousResearch/hermes-agent/pull/135652) 关于多端桌面端插件更新机制的改进，同样积压较久。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

**AstrBot 项目动态日报 (2026-10-27)**

### 1. 今日速览
AstrBot 在过去24小时内保持极高活跃度，共新增 11 个 Issues 和 34 个 Pull Requests。项目处于高频迭代期，重点解决了插件权限、前端 UI 兼容性、以及 MCP 工具集成等核心痛点。社区对群聊上下文管理、权限隔离及 LLM 钩子机制的讨论深入，表明用户正在深度集成业务逻辑。尽管今日无重大版本发布，但代码合并速度快，显示核心维护团队响应迅速，项目健康度处于高位。

### 2. 版本发布
无。今日暂无新版本 Release。

### 3. 项目进展
今日共合并/关闭 9 个 PR，主要推进了以下方面：
*   **权限与安全模型优化**：修复了 Local 运行时下普通成员因权限不足无法读取 `SKILL.md` 的问题，引入基于文件读取工具的降级机制 ([#10789](https://github.com/AstrBotDevs/AstrBot/pull/10789))；同时完善了群聊定时任务的管理逻辑，允许管理员查看共享任务列表并删除他人创建的任务，解决了之前完全隔离导致的运维盲区 ([#10785](https://github.com/AstrBotDevs/AstrBot/pull/10785))。
*   **前端与 UI 体验修复**：解决了 Safari 浏览器下配置文件页滚动条被圆角卡片遮挡的问题，并将全局滚动条样式限定在 Firefox 下 ([#10760](https://github.com/AstrBotDevs/AstrBot/pull/10760))；更新了贡献者头像墙数量上限至 500，适应社区增长 ([#10781](https://github.com/AstrBotDevs/AstrBot/pull/10781))。
*   **核心稳定性修复**：修复了插件安装时因 `.astrbot` 标记文件冲突导致的 `FileExistsError` ([#10783](https://github.com/AstrBotDevs/AstrBot/issues/10783) 关联修复)；更新了社区群列表及 WebUI 多语言文案。

### 4. 社区热点
*   **#10704: `umo_aliases` 孤儿数据清理机制缺失** ([#10704](https://github.com/AstrBotDevs/AstrBot/issues/10704))
    *   **分析**：该 Issue 拥有 5 条评论，是今日讨论最热烈的话题。用户指出在删除会话后，`umo_aliases` 表中的别名数据无法通过官方 API 清理，导致 Dashboard 出现“幽灵会话”。这反映了底层数据完整性管理的盲区，社区呼吁提供 `delete_umo_alias` 官方方法，表明用户对多平台账号映射管理的精细化需求强烈。
*   **#10723: 群聊上下文“注意力缺陷”** ([#10723](https://github.com/AstrBotDevs/AstrBot/issues/10723))
    *   **分析**：用户深入分析了 LLM 在处理纯 @ 消息时忽略注入的群聊上下文的问题。该讨论触及了 AstrBot 核心能力“像群友一样参与对话”的有效性边界。技术社区正在讨论如何优化 Prompt 策略或过滤机制，以提升模型对历史记录的采纳率。

### 5. Bug 与稳定性
按严重程度排列，今日主要 Bug 及修复状态：

*   **[严重] Skill 权限与提示词不一致导致普通成员无法读取**
    *   **描述**：提示词强制要求 Shell 读取，但 Local 角色禁用了 Shell，导致功能失效 ([#10777](https://github.com/AstrBotDevs/AstrBot/issues/10777))。
    *   **状态**：已修复。PR [#10789](https://github.com/AstrBotDevs/AstrBot/pull/10789) 已合并，改为优先使用文件读取工具，Shell 仅作回退。
*   **[高] 插件安装失败：`FileExistsError`**
    *   **描述**：创建暂存目录时与 `.astrbot` 文件冲突，导致插件无法安装 ([#10783](https://github.com/AstrBotDevs/AstrBot/issues/10783))。
    *   **状态**：已关闭，推测已在近期提交中修复目录逻辑。
*   **[高] Anthropic Compatible Provider 认证头错误**
    *   **描述**：使用 `anthropic` SDK 2.3.0 时，仅发送 `Authorization: Bearer`，无法连接要求 `x-api-key` 的端点 (如 OpenCode Go) ([#10786](https://github.com/AstrBotDevs/AstrBot/issues/10786))。
    *   **状态**：Issue 已关闭，需确认是否包含在最新构建中或等待下一版本修复认证逻辑。
*   **[中] Discord 组件字段声明缺失**
    *   **描述**：Pydantic 模型中 Discord 组件未正确声明字段，可能导致验证错误 ([#10710](https://github.com/AstrBotDevs/AstrBot/pull/10710))。
    *   **状态**：PR 待合并。

### 6. 功能请求与路线图信号
*   **MCP Apps 集成**：用户请求在 WebChat 中支持交互式 MCP 工具结果（如图片选择器） ([#10797](https://github.com/AstrBotDevs/AstrBot/issues/10797))。PR [#10798](https://github.com/AstrBotDevs/AstrBot/pull/10798) 已提交，正在开发 Opt-in 交互模式，信号强烈，预计将进入下一版本。
*   **`OnLLMResponseEvent` 钩子修复**：当 LLM 响应包含工具调用时，该事件未触发，导致插件无法拦截/重写文本 ([#10770](https://github.com/AstrBotDevs/AstrBot/issues/10770))。PR [#10772](https://github.com/AstrBotDevs/AstrBot/pull/10772) 正在处理，这将提升插件对 LLM 输出的控制力。
*   **状态拆分**：建议将“用户唤醒”与“插件匹配”拆分为独立状态变量 ([#10699](https://github.com/AstrBotDevs/AstrBot/issues/10699))，以解决插件误触发唤醒逻辑的问题。

### 7. 用户反馈摘要
*   **痛点**：用户普遍反馈底层数据（如别名、会话）缺乏完整的 CRUD 支持，导致管理界面出现残留数据；LLM 对群聊上下文的利用率不稳定，影响“群友体验”。
*   **场景**：重度用户正在尝试将 AstrBot 部署在带有严格权限控制的环境中（Local Runtime），发现官方 Skill 机制与权限模型存在冲突，反馈非常具体（精确到 SDK 版本和 HTTP 头）。
*   **满意**：社区对 Bug 响应速度表示认可，多个关键 Bug（Safari UI、Skill 权限）在当天或次日即有合并 PR。

### 8. 待处理积压
*   **#10373: Cron 定时任务间隔误差** ([#10373](https://github.com/AstrBotDevs/AstrBot/pull/10373))
    *   该 PR 创建于 10 月 4 日，至今保持 OPEN 状态。它修复了 WebUI 将固定间隔转换为 Cron 步骤导致的计时误差（如 40 分钟变 40/20 交替）。鉴于定时任务是核心功能，此积压较久，建议维护者优先关注并合并。
*   **#10773: SerpApi Google News 集成** ([#10773](https://github.com/AstrBotDevs/AstrBot/pull/10773))
    *   新增的 API 集成 PR，等待审查。若批准，将增强 Agent 的新闻检索能力。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报 (2026-10-27)

### 1. 今日速览
过去 24 小时项目社区活跃度极高，Discussions 新增及更新达 195 条，显示用户基数庞大且反馈积极。由于该仓库未启用 GitHub Issues/PR 且今日无新版本发布（0 个 Releases），项目处于**“高热度讨论、无代码交付”**的停滞期。当前主要矛盾集中在桌面端稳定性（Windows/Mac）及核心功能缺陷（工作区管理、Token 消耗过高）。社区对 `dsh` 0.2.1 系列版本（alpha/rc）中的多项回归问题（如 Cookie 溢出、Shell 初始化失败）表现出强烈不满，急需官方修复以恢复信任。

### 2. 版本发布
**今日无新版本发布。**
*注：根据数据，过去 24 小时 Releases 数量为 0。项目代码合并均通过 Releases 落地，因此今日无新功能上线或修复合并。*

### 3. 项目进展
**今日无代码合并或功能推进。**
由于该仓库将代码合并摘要等同于 Releases Changelog，且今日无 Release 产出，故无项目进展。维护团队目前未响应社区高频讨论中的紧急 Bug（如 #9924, #10885），项目处于“维护真空”状态。

### 4. 社区热点
今日讨论最活跃的话题集中在**性能成本、核心功能缺失及桌面端稳定性**三大类：

*   **[高热度] Token 消耗质疑：DSH 运行自家模型成本高昂**
    *   **链接**: [#8934](https://github.com/deepseek-ai/deepseek-harness/discussions/8934)
    *   **现状**: 用户实测发现 DSH 运行 DeepSeek V4.1 Flash 的 Token 消耗是 Hermes 的 3.3 倍、Claude Code 的 1.8 倍。每轮“启动税”高达 8,188 tokens，且暴露了 29 个工具定义。
    *   **诉求**: 社区强烈要求优化提示词工程、精简默认工具集或提供“轻量模式”，以解决非官方工具中常见的“上下文爆炸”和成本过高的问题。

*   **[高热度] 工作区管理故障：无法创建/打开工作区**
    *   **链接**: [#8357](https://github.com/deepseek-ai/deepseek-harness/discussions/8357) | [#10885](https://github.com/deepseek-ai/deepseek-harness/discussions/10885)
    *   **现状**: 多个用户报告 `workspaceController` 服务不可用，导致无法创建新工作区或访问旧项目。这在 0.2.1-rc.3 版本中尤为严重。
    *   **诉求**: 这是阻碍核心使用流程的 P0 级故障，用户要求尽快修复 Gateway 服务稳定性。

*   **[高热度] 桌面端认证 Bug：Cookie 溢出导致 431 错误**
    *   **链接**: [#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924)
    *   **现状**: Desktop 应用因 `dsh-auth-*` Cookie 累积过大，超出 Host 头部限制，导致网页认证失败。目前仍存在于 0.2.1-alpha.5 和 rc.1 版本。
    *   **诉求**: 修复 Electron 端的 Cookie 清理逻辑或增大 Header 缓冲。

*   **[特色] 社区插件生态展示**
    *   **链接**: [#5623](https://github.com/deepseek-ai/deepseek-harness/discussions/5623)
    *   **现状**: 社区开发者发布了 `dsh-code-index` 插件，提供代码影响面分析功能。
    *   **分析**: 尽管官方进展停滞，但社区插件生态活跃，用户正在通过插件弥补官方功能短板。

### 5. Bug 与稳定性
按严重程度排列今日报告的 Bug（均为 Open 状态，无 Fix PR）：

| 严重程度 | 问题描述 | 链接 | 备注 |
| :--- | :--- | :--- | :--- |
| **P0 (数据丢失)** | **PTC 子调用 ID 重复导致整个 Session 无法加载** | [#9677](https://github.com/deepseek-ai/deepseek-harness/discussions/9677) | 会话 v4 格式要求 `subCallId` 唯一，但写入时未校验。一旦重复，读取时报错，导致 3500+ 事件的大会话数据永久不可读。**无官方 Fix。** |
| **P0 (功能阻断)** | **Mac/Win 工作区创建失败：Service Unavailable** | [#10885](https://github.com/deepseek-ai/deepseek-harness/discussions/10885) | `workspaceController` 服务异常，用户无法进行任何工作区操作。 |
| **P1 (核心故障)** | **Windows 桌面端 Shell 工具失败 (STATUS_DLL_INIT_FAILED)** | [#6822](https://github.com/deepseek-ai/deepseek-harness/discussions/6822) | 双击启动的桌面端中所有 shell 工具调用失败，但命令行 `dsh web` 正常。疑似 Electron 打包或 DLL 加载问题。 |
| **P1 (模型兼容)** | **Gemini 请求因 JSON Schema 特殊字段报错** | [#10904](https://github.com/deepseek-ai/deepseek-harness/discussions/10904) | 工具定义中含 `$ref`/`$defs` 时，Gemini 返回 400 错误。需兼容处理 Schema 转换。 |
| **P1 (网络逻辑)** | **Custom Provider 无法在 GUI 选择推理等级 (Reasoning Effort)** | [#843](https://github.com/deepseek-ai/deepseek-harness/discussions/843) | 使用 OpenAI 兼容网关时，前端不显示推理等级选择器，限制了高级模型的使用。 |
| **P2 (稳定性)** | **Compaction 默认阈值过高导致长会话崩溃** | [#6671](https://github.com/deepseek-ai/deepseek-harness/discussions/6671) | 当输出预留 token 较大时，默认 0.8 阈值无法触发压缩，会话在达到 max-context 前直接报错死亡。 |
| **P2 (平台适配)** | **Windows 桌面端更新失败：Koffi 阻止进程退出** | [#9963](https://github.com/deepseek-ai/deepseek-harness/discussions/9963) | 更新时 Host 进程无法优雅关闭，导致更新失败。 |

### 6. 功能请求与路线图信号
*   **无工作区全局对话支持**
    *   **链接**: [#430](https://github.com/deepseek-ai/deepseek-harness/discussions/430)
    *   **信号**: 用户强烈需要“无工作区”的纯聊天模式（类似 ChatGPT），目前新会话强制继承工作区且无法取消。鉴于工作区功能近期 Bug 频发，**降级/简化工作区依赖**可能是短期路线图重点。
*   **桌面/浏览器全局通知**
    *   **链接**: [#8901](https://github.com/deepseek-ai/deepseek-harness/discussions/8901)
    *   **信号**: 长任务执行时需多次审批，用户希望增加系统级（Desktop）或浏览器全局通知，而非仅在对话弹窗。这符合 Agent 类应用的长期可用性趋势，预计会被纳入 UX 改进计划。

### 7. 用户反馈摘要
*   **痛点**：
    *   **“开箱即用”体验差**：多个用户（如 @l2685209197, @wMango）反映安装后基本功能（创建工作区）不可用，挫败感强。
    *   **成本焦虑**：@abcultima 等高级用户通过量化分析指出 DSH 的 Token 效率低下，认为官方未优化好自家 Harness 的使用成本，影响了对产品的信任。
    *   **数据安全感**：#9677 中的会话数据丢失问题引发了对 v4 格式健壮性的担忧。
*   **满意点**：
    *   **社区插件活力**：尽管官方停滞，但社区插件（如 #5623 的代码索引插件）展示了 DSH 扩展机制的潜力，部分用户通过插件弥补了官方功能缺失。
    *   **跨平台兼容尝试**：虽然 Bug 多，但官方仍在尝试支持 NixOS、Wayland 等较新的 Linux 环境（见 #9924 环境描述）。

### 8. 待处理积压
*   **高优先级积压**：
    *   **工作区控制器故障** ([#8357](https://github.com/deepseek-ai/deepseek-harness/discussions/8357), [#10885](https://github.com/deepseek-ai/deepseek-harness/discussions/10885))：自 9 月底报告以来，至今无 Fix Release，严重影响新用户上手。
    *   **桌面端 Shell/更新故障** ([#6822](https://github.com/deepseek-ai/deepseek-harness/discussions/6822), [#9963](https://github.com/deepseek-ai/deepseek-harness/discussions/9963))：Windows 桌面端核心功能缺失，阻碍企业或重度用户迁移。
*   **建议**：维护者应尽快发布一个针对 0.2.1 系列的 Hotfix Release，集中解决 `workspaceController` 可用性和 Windows DLL 初始化问题，以遏制负面口碑扩散。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*