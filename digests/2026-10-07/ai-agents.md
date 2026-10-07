# OpenClaw 生态日报 2026-10-07

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-07 01:06 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 (2026-10-07)

### 1. 今日速览
过去 24 小时内，OpenClaw 项目保持极高的活跃度，处理了 500 条 Issues 和 500 条 PRs，其中 138 条 PR 完成合并或关闭。尽管今日无正式版本发布，但代码层面正处于密集修复期，主要聚焦于解决 **Gateway 启动性能回归**、**内存泄漏**以及 **热重载引发的状态丢失**等 P0/P1 级稳定性问题。社区对 `2026.9.5` 版本引入的性能和状态管理回归反响强烈，维护团队通过 `clawsweeper` 标签体系进行了精细化的 Triage。整体而言，项目正处于从"功能扩张"向"稳定性收敛"的关键过渡期，底层架构（如 SQLite 状态管理、插件生命周期）的健壮性正在得到显著增强。

### 2. 版本发布
今日无新版本发布。

### 3. 项目进展
今日合并与推进的工作主要集中在提升系统鲁棒性与解决 `2026.9.x` 系列版本遗留的回归问题上：

*   **Gateway 启动与状态竞争修复**：多个 PR 推进了 Gateway 启动过程中状态维护的竞争条件修复。[#166111](https://github.com/openclaw/openclaw/pull/166111) 修复了初始共享状态读取与其他进程重叠导致的启动失败；[#166108](https://github.com/openclaw/openclaw/pull/166108) 和 [#166331](https://github.com/openclaw/openclaw/pull/166331) 针对 SQLite 维护租约检查和临时模式竞争进行了优化，有效减少了主线程卡死（Stalls）现象。
*   **Crash-loop 保护机制**：[#166238](https://github.com/openclaw/openclaw/pull/166238) 引入了 Crash-loop breaker 机制，在触发安全模式时暂停重启恢复，防止了 Gateway 在恢复被中断的 turn 时发生的无限崩溃循环。
*   **Claude-CLI 深度集成优化**：[#166073](https://github.com/openclaw/openclaw/pull/166073) 确保 Claude Code 自身的记忆库（如 `~/.claude/CLAUDE.md`）默认不会干扰 OpenClaw 的 Agent 轮次，解决了记忆污染问题；[#165596](https://github.com/openclaw/openclaw/pull/165596) 修复了后台 Agent 运行 Bash 命令时导致回复挂起的问题。
*   **代码整洁度（Deslop）与重构**：维持者持续推进代码重构，[#166106](https://github.com/openclaw/openclaw/pull/166106) 对 Channels 模块进行了大规模清理，删除了 1000+ 行冗余的生产代码；[#166060](https://github.com/openclaw/openclaw/pull/166060) 优化了 Worktree 的并行创建逻辑，解决了全局租赁锁导致的串行瓶颈。

### 4. 社区热点
今日讨论最活跃的 Issue 集中在核心架构的可靠性与状态持久化上，反映出社区用户对长运行任务（Long-running tasks）高可用性的强烈诉求：

*   **[P1] Subagent 结果静默丢失** ([#44925](https://github.com/openclaw/openclaw/issues/44925))：31 条评论。用户反映在 Subagent 任务编排中，若 Completion announce 失败（如 E31/E42 等异常），结果会被静默丢弃且无重试或通知机制。这是目前讨论热度最高的 Issue，表明 Agent 多任务编排的容错性是核心痛点。
*   **[P0] Gateway 就绪但无法服务** ([#149538](https://github.com/openclaw/openclaw/issues/149538))：24 条评论。在 632-agent 规模的集群中，事件循环（Event Loop）被饿死（Starved）导致 `/health` 探测超时。该问题揭示了高并发场景下 OpenClaw 的底层 I/O 调度瓶颈。
*   **[P0] Worker 线程内存泄漏** ([#159662](https://github.com/openclaw/openclaw/issues/159662))：20 条评论。`prepared-model-catalog.worker.js` 存在无界内存泄漏（~4-5 GB/h），与 Provider 无关，导致单用户安装环境下 90 分钟内 RSS 飙升至 10 GB。
*   **[P1] 僵尸进程累积** ([#97616](https://github.com/openclaw/openclaw/issues/97616))：18 条评论。Hook/Tool 执行后未及时 Reap 子进程，导致 `openclaw-hooks` 等子进程变为僵尸（Zombie），造成系统运行时性能下降。
*   **[P1] 热重载切断 Channel 插件** ([#152965](https://github.com/openclaw/openclaw/issues/152965))：8 条评论。修改非 Channel 插件配置时，热重载会 Disposition 掉所有已加载的插件，包括持有长连接（WebSocket）的 Discord/Telegram 插件，导致活跃消息流中断。

### 5. Bug 与稳定性
今日报告的 Bug 严重度高，主要涉及 Gateway 生命周期、内存管理及安全隔离。按严重程度排列如下：

*   **[P0] Gateway 启动挂起与超时**：
    *   现象：2026.9.5 版本中，Gateway 启动在 `sidecars.model-runtime` 阶段挂起约 17 分钟，或因启用的插件数量（如 Discord, Weixin）导致 120s 发布预算耗尽（[#152981](https://github.com/openclaw/openclaw/issues/152981), [#155859](https://github.com/openclaw/openclaw/issues/155859)）。
    *   状态：已有相关 PR 修复启动竞争（[#166111](https://github.com/openclaw/openclaw/pull/166111)），但性能瓶颈仍在定位中。
*   **[P0] 更新（Update）流程失败**：
    *   现象：全局安装替换失败，如 Windows 下路径包含非法字符导致 `mkdir ENOENT`（[#152992](https://github.com/openclaw/openclaw/issues/152992)），或 QNAP ZFS 文件系统下 `renameat2` 失败（[#165617](https://github.com/openclaw/openclaw/issues/165617)）。
    *   状态：PR [#165866](https://github.com/openclaw/openclaw/pull/165866) 正在推进 Session entry 状态的迁移修复。
*   **[P0/P1] 内存与 I/O 资源损耗**：
    *   现象：Plugin source capture 导致每次 CLI 命令重写 1.1-1.4 GB 数据，每次 Gateway 启动重写 6.5 GB，造成严重的 SSD 磨损（[#157989](https://github.com/openclaw/openclaw/issues/157989)）；空闲 Gateway 伴随 Matrix 插件时 CPU 占用 50% 且磁盘写入 52 MB/min（[#154104](https://github.com/openclaw/openclaw/issues/154104)）。
*   **[P1] 状态一致性与回滚失败**：
    *   现象：配置热重载失败并回滚后，仍导致不相关的插件抛出 `PluginInstanceUnavailableError` 直至重启（[#154891](https://github.com/openclaw/openclaw/issues/154891)）；`sessions_spawn` 指向 Claude-CLI 时频繁抛出 `SessionTranscriptWriterClaimReboundError`（[#154572](https://github.com/openclaw/openclaw/issues/154572)）。
*   **[P1] 安全权限继承错误**：
    *   现象：MCP Bridge 继承了错误的请求 Scope，导致重启恢复后 Owner 失去 `operator.admin` 权限（[#157126](https://github.com/openclaw/openclaw/issues/157126)）。

### 6. 功能请求与路线图信号
基于今日数据，以下功能需求已转化为具体的 PR 或处于评估阶段，预示着下一版本的重点方向：

*   **工具级执行确认门（Tool-level Confirmation Gate）**：用户（[#23451](https://github.com/openclaw/openclaw/issues/23451)）强烈要求在 LLM 生成工具调用时引入基于风险等级的人工确认（Human-in-the-loop）。虽然尚无大型 PR 直接闭合，但此需求已被标记为 P1，预计将纳入安全增强路线图。
*   **不可绕过的出站策略执行（Unbypassable Outbound Policy）**：针对多重投递路径（Agent replies, Auto-replies, Message tools）绕过 Hook 的问题（[#56349](https://github.com/openclaw/openclaw/issues/56349)），社区正在推动建立单一的 Pre-send 验证边界，这是企业级部署的关键安全特性。
*   **iOS/macOS 原生身份认证与 Cloudflare Access**：PR [#147238](https://github.com/openclaw/openclaw/pull/147238) 和 [#147244](https://github.com/openclaw/openclaw/pull/147244) 正在推进 iOS 端对 Cloudflare Access 的原生支持，旨在解决远程 Gateway 访问时的身份继承与权限移交问题，显示了移动端与边缘网关深度集成的路线图信号。
*   **MacOS Talk Mode 视觉个性化**：[#70266](https://github.com/openclaw/openclaw/issues/70266) 提议在 MacOS 语音通话覆盖层中使用配置好的助手头像，而非默认的 Orb，预计作为 UI/UX 优化很快落地。

### 7. 用户反馈摘要
*   **痛点 1：长任务状态可靠性（Long-term Reliability）**：用户普遍反馈在运行长时间的 Subagent 任务或 Codex 任务时，缺乏对失败状态的感知（如 #44925 提到的"Silently lost"）。用户期望系统具备自动重试、状态持久化及失败通知机制。
*   **痛点 2：配置热重载的副作用（Hot-reload Side Effects）**：用户发现修改 `plugins.entries.*` 等配置项会意外重置 Channel 连接，导致正在进行的群聊流中断。用户强烈要求热重载必须具有"插件隔离性"，即只影响被修改的模块。
*   **痛点 3：资源不可预测性（Resource Predictability）**：多个用户报告在空闲状态下系统仍有极高的 CPU/IO 占用（如 #154104 提到的 Matrix 轮询或 #157989 的 SSD 磨损），这对于将 OpenClaw 部署在低配服务器或 NAS 上的用户造成了极大困扰。
*   **满意点：精细化的 Triage 标签**：用户和贡献者对 `clawsweeper` 标签（如 `needs-maintainer-review`, `source-repro`, `no-new-fix-pr`）表示认可，认为这帮助社区更清晰地了解每个 Bug 的处理进度和责任归属。

### 8. 待处理积压
*   **[P1] 插件源捕获 SSD 磨损** ([#157989](https://github.com/openclaw/openclaw/issues/157989))：此问题自 2026.9.5 引入，涉及 6.5 GB/次启动的 I/O 损耗，但尚未有明确的 Fix PR 关联，对于 SSD 用户影响极大，建议维护者优先级提升。
*   **[P1] 僵尸进程累积** ([#97616](https://github.com/openclaw/openclaw/issues/97616))：这是一个长期未解决的回归问题，影响系统资源回收。目前仅有 18 条评论但无关联 PR，需要底层进程管理的深入调查。
*   **[P2] Memory 后台回调保留已退役插件** ([#159912](https://github.com/openclaw/openclaw/issues/159912))：Memory 索引在插件重载后失败，但健康检查（Health）保持绿灯，这种"假健康"状态误导了运维监控，需进一步排查。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告
**日期：** 2026-10-07

## 1. 生态全景
2026 年 10 月 7 日的开源生态呈现高度活跃但分化加剧的态势。头部项目如 OpenClaw、Hermes-Agent 和 Zeroclaw 处于高强度迭代与底层稳定性收敛的并行期，集中攻坚高并发下的内存泄漏、状态竞争及沙箱安全缺陷。中型项目如 PicoClaw 出现核心维护停滞与社区分支活跃的显著分裂，暴露出单一维护者瓶颈下的生态风险。整体而言，行业正从单一功能扩展转向对企业级可靠性、长时任务状态持久化及多模态安全隔离的深度治理。

## 2. 各项目活跃度对比

| 项目 | 24h Issues | 24h PRs | Merged/Closed | Release | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 | 500 | 138 | 无 | **中上**（处于从功能扩张向稳定性收敛的关键过渡期，核心架构正在深度重构） |
| **Zeroclaw** | 37 | 50 | 4 | 无 | **良好**（聚焦运行时安全与网关分离，社区架构决策活跃，技术债务正在有序清理） |
| **PicoClaw** | 0 (官方) | 0 (官方) | 0 (官方) | 无 | **停滞**（官方维护真空，技术演进转移至社区 Fork，生态碎片化风险高） |
| **QwenPaw** | 1 | 2 | 0 | 无 | **平稳**（低活跃但质量集中，处于平稳迭代与体验打磨期） |
| **hermes-agent** | 500 | 500 | N/A | 无 | **中上**（高强度迭代与底层基础设施稳定性治理并行，自动化流程存在阻塞） |
| **AstrBot** | 19 | 31 | 21 | 无 | **健康**（响应能力极强，底层架构异步性能优化与多平台兼容持续完善） |
| **DeepSeek Harness**| 0 | 0 (无PR) | N/A | 无 | **高活跃**（166 条 Discussions 反馈，无合并摘要，处于高活跃测试与内部打磨阶段） |

## 3. OpenClaw 在生态中的定位
*   **技术路线差异**：在同类项目中，OpenClaw 展现出极强的底层工程能力，其架构围绕 SQLite 状态管理、Gateway 生命周期及高度精细化的插件机制展开。与 Hermes-Agent 偏向基础设施和自动化工作流不同，OpenClaw 的核心护城河在于处理长时任务（Long-running tasks）时的状态持久化和故障恢复能力。
*   **社区规模对比**：日均 500 条 Issues 和 PRs 的处理量在所有被监测的开源智能体中处于绝对领先地位，这使其成为衡量行业稳定性标准和最佳实践的风向标。
*   **相对优势**：拥有高度精细化的 Triage 标签体系（如 `clawsweeper`），在应对并发崩溃循环（Crash-loop）和内存泄漏等 P0/P1 级严重稳定性问题时，维护团队展现出的响应速度和修复粒度优于其他同类项目。

## 4. 共同关注的技术方向
多个项目社区共同涌现出以下核心技术需求，表明这些是当前 AI 智能体开发的核心痛点：
*   **长任务状态可靠性与容错性**：要求 Subagent 或自动化工作流在遇到失败时具备自动重试、状态持久化及失败通知机制（涉及 **OpenClaw** Subagent 静默丢失、**hermes-agent** 更新机制致命缺陷、**PicoClaw** 动态迭代限制）。
*   **跨平台沙箱安全与资源隔离**：强烈呼吁修复 Shell 工具与执行环境的隔离失效问题，避免静默绕过或资源不可预测性（涉及 **Zeroclaw** Linux 沙箱全面失效、**hermes-agent** macOS 休眠唤醒 PID 漂移、**DeepSeek Harness** Windows ACL 写入权限缺陷）。
*   **模型配置与参数细粒度控制**：用户希望不仅限于提供 API Key，还能在 UI 层对模型行为进行深度干预，如调节推理强度、控制上下文预算（涉及 **QwenPaw** 推理强度设定、**hermes-agent** 可配置 Temperature、**PicoClaw** 基于上下文窗口边界的动态限制）。

## 5. 差异化定位分析
*   **功能侧重**：
    *   **OpenClaw**：聚焦于多 Agent 编排、长任务状态管理、复杂消息通道连接及高可用性网关。
    *   **Zeroclaw**：聚焦于纯 Rust 架构演进、网关独立解耦及面向企业级部署的 SOP 不可变性。
    *   **AstrBot**：聚焦于 WebUI 交互体验（Dashboard 性能、日志管理）及高频 IM 多平台通道的兼容适配。
    *   **QwenPaw**：聚焦于多模态模型（图像输入、语音模型）的适配及开箱即用体验的降低门槛。
*   **目标用户**：
    *   **PicoClaw / QwenPaw**：面向个人开发者与轻量级自动化场景的终端用户。
    *   **OpenClaw / Zeroclaw**：面向复杂团队自动化、高并发环境及追求底层可控性的企业级或高级技术用户。
*   **技术架构**：
    *   生态中明显分为以 Go/Rust 为核心的高性能本地化架构（PicoClaw, Zeroclaw）与复杂分布式网关架构（OpenClaw, hermes-agent），以及偏重前端 WebUI 与后端解耦的混合架构（AstrBot, DeepSeek Harness）。

## 6. 社区热度与成熟度
*   **快速迭代与稳定性攻坚阶段**：**OpenClaw**, **Zeroclaw**, **hermes-agent**, **AstrBot**。这四个项目拥有极其庞大的社区讨论量和 PR 提交量，当前正处于解决早期高速发展积累的架构债务、修复 P0/P1 级 Bug（如内存泄漏、事件循环阻塞、更新失败）的阵痛期。
*   **质量巩固与平稳打磨阶段**：**QwenPaw**。项目数据量小，无新 Bug 爆发，聚焦于前端鲁棒性和配置门槛降低，处于健康的平滑迭代周期。
*   **高活跃测试与无官方合并阶段**：**DeepSeek Harness**。通过 Discussions（166 条）密集收集和验证社区反馈（如 Windows 启动逻辑、沙箱缺陷），官方版本尚未收敛到主干，处于高强度的外部打磨期。
*   **维护停滞与分支割裂阶段**：**PicoClaw**。官方主干停止演进，技术演进完全由社区 Fork 承载，属于典型的生态碎片化与成熟度衰退。

## 7. 值得关注的趋势信号
对 AI 智能体开发者而言，当前的社区动态揭示了以下重要趋势：
1.  **更新与回滚机制成为生产级系统的刚需**：用户极度反感 Agent 框架更新失败后的“半应用状态”（如 hermes-agent 和 OpenClaw 均报告）。提供可依赖的版本隔离、一键回滚及状态自动修复工具，将是未来开源 Agent 框架提升 B 端信任度的核心指标。
2.  **资源消耗的可预测性与 SSD 寿命管理**：由于 Agent 长期在本地/轻量服务器（如 NAS、低配机）运行，无谓的空闲 CPU 占用、高频 I/O（如源捕获、轮询）及 SSD 磨损已成为用户抱怨的重灾区。框架在设计底层持久化策略时，必须引入写放大控制与惰性加载机制。
3.  **WebUI 的交互控制与多模型路由的演进**：随着 WebUI 成为主要使用界面，UI 的稳定性（防挂起、防会话丢失）及指令权限控制（白名单机制）变得至关重要。同时，单一模型支持正迅速向支持多模型路由（如 Mistral, Anthropic 原生支持）及自定义推理参数（如 `reasoning_effort`, `temperature`）演进，以满足用户在不同任务场景下对速度、成本和智力深度的动态调节需求。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

以下是基于 GitHub 数据生成的 **Zeroclaw 项目动态日报 (2026-10-07)**：

# Zeroclaw 项目日报 | 2026-10-07

## 1. 今日速览
今日项目呈现高活跃度状态，过去 24 小时内 Issues 更新 37 条，PR 更新 50 条，社区贡献集中在**运行时安全**、**多模态数据处理**及**渠道扩展**三大领域。
尽管今日无新版本发布，但大量 P0/P1 级安全与稳定性 Bug（如 macOS Seatbelt 绕过、配置覆盖风险、沙箱失效）已得到社区关注，部分已有修复 PR 进入审查阶段。
值得关注的是，Firejail 与 Bubblewrap 沙箱在 Linux 环境下的兼容性问题集中爆发，且 ZeroCode TUI 存在 CPU 占满与状态显示错误的回归 Bug，影响了核心用户体验。
整体而言，项目正处在 **v0.9.0 网关分离** 与 **Schema V4 破坏性变更** 的关键实施期，架构复杂度的提升带来了更多的边界条件 Bug。

## 2. 版本发布
**无新版本发布。**
当前处于 v0.8.6 向 v0.9.0 过渡阶段，主要工作聚焦于运行时（Runtime）完善与网关（Gateway）分离。

## 3. 项目进展
今日有 4 个 PR 已合并或关闭，主要推进了文档规范与基础依赖更新：

*   **文档规范优化**：[PR #11574](https://github.com/zeroclaw-labs/zeroclaw/pull/11574) 关闭，简化了 PR 模板，不再强制要求在 PR 正文中复制 GitHub 标签，而是通过审查协议核对实时标签，降低了贡献门槛。
*   **依赖安全更新**：[PR #11564](https://github.com/zeroclaw-labs/zeroclaw/pull/11564) 合并，更新了 Rust 生态中的 20 个包（包括 `tokio`, `clap` 等），提升了底层依赖的安全性与兼容性。
*   **网关 Socket 泄漏修复**：虽然标记为 CLOSED，但 [PR #11431](https://github.com/zeroclaw-labs/zeroclaw/pull/11431) 的讨论显示维护团队正在解决网关重载后遗留 WebSocket 连接导致的内存泄漏问题，这是 v0.9.0 网关独立化的关键稳定性补丁。
*   **成本记录修复**：[PR #11557](https://github.com/zeroclaw-labs/zeroclaw/pull/11557) 针对 Ledger 记录损坏问题提出修复，确保在发生“撕裂写”（torn-write）时能正确上报被拒绝的记录数量，而非静默丢弃。

## 4. 社区热点
*   **Web UI 技术选型辩论**：[Issue #8132](https://github.com/zeroclaw-labs/zeroclaw/issues/8132) 是今日讨论最热烈的议题（11 条评论）。社区正在评估是否从 React/Vite 迁移至 Rust/WASM (Dioxus/Leptos) 架构。
    *   *诉求分析*：用户希望消除 Node.js 运行时依赖，实现纯 Rust 构建管线，以降低攻击面并简化部署。这是一个高风险但高收益的架构决策。
*   **v0.9.0 运行时追踪**：[Issue #7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) 作为 Tracker 持续活跃，社区紧密关注 Phase 3 网关分离的进度。该 Issue 是理解项目未来三个月路线图的“Source of Truth”。
*   **多模态图片处理优化**：[Issue #11166](https://github.com/zeroclaw-labs/zeroclaw/issues/11166) 和 [Issue #11554](https://github.com/zeroclaw-labs/zeroclaw/issues/11554) 揭示了多模态场景下的痛点。用户反馈当图片超过限制时，当前的“全量丢弃”策略不够优雅，且历史标记会导致模型产生“幻觉”（描述不存在的图片）。社区呼吁更智能的图片剔除（Eviction）机制。

## 5. Bug 与稳定性
**🔴 P0/P1 严重稳定性问题：**

1.  **macOS Seatbelt 安全绕过**：[Issue #10536](https://github.com/zeroclaw-labs/zeroclaw/issues/10536) (已关闭，但需确认修复验证)。macOS 下配置的 `allowed_roots` 被 Shell 命令忽略，导致沙箱失效。修复 PR [PR #10583](https://github.com/zeroclaw-labs/zeroclaw/pull/10583) 仍在待合并状态。
2.  **配置数据丢失风险**：[Issue #10495](https://github.com/zeroclaw-labs/zeroclaw/issues/10495) 描述 `Config::save()` 可能将 109KB 的完整配置覆盖为 702 字节空文件。目前标记为 `status:in-progress`，存在极高风险。
3.  **Linux 沙箱全面失效**：
    *   **Firejail 报错**：[Issue #11539](https://github.com/zeroclaw-labs/zeroclaw/issues/11539) 和 [Issue #11538](https://github.com/zeroclaw-labs/zeroclaw/issues/11538) 指出 Firejail 参数无效，导致 Shell 工具完全不可用。
    *   **Bubblewrap 检测失败**：[Issue #11540](https://github.com/zeroclaw-labs/zeroclaw/issues/11540) 显示 Bubblewrap 未被正确检测，静默回退到应用层限制，造成安全假象。相关修复 [PR #11559](https://github.com/zeroclaw-labs/zeroclaw/pull/11559) 正在审查中。
4.  **ZeroCode TUI 回归**：
    *   **CPU 100% 占满**：[Issue #11481](https://github.com/zeroclaw-labs/zeroclaw/issues/11481) 报告终端断开后 ZeroCode 进程不停止，持续占用 CPU。
    *   **状态显示错误**：[Issue #11586](https://github.com/zeroclaw-labs/zeroclaw/issues/11586) 指出 Daemon 重启后，所有失败会话在侧边栏显示为绿色（就绪状态），误导用户。
5.  **沙箱 PATH 解析不一致**：[Issue #10923](https://github.com/zeroclaw-labs/zeroclaw/issues/10923) 指出沙箱发现机制忽略了 TUI 提供的 PATH，导致 Shell 工具找不到二进制文件。

**🟡 P2 功能 Bug：**

*   **Signal 媒体支持缺失**：[PR #11556](https://github.com/zeroclaw-labs/zeroclaw/pull/11556) 正在实现 Signal 渠道的媒体附件支持，解决当前无法查看图片/视频的问题。
*   **成本限制无法解除**：[Issue #11585](https://github.com/zeroclaw-labs/zeroclaw/issues/11585) 指出触发成本上限后，必须重启 Daemon 才能重置，且 `cost.allow_override` 配置项未被读取。[PR #11589](https://github.com/zeroclaw-labs/zeroclaw/pull/11589) 正在开发运行时覆盖功能。

## 6. 功能请求与路线图信号

*   **Schema V4 破坏性变更（高优先级）**：[Issue #8310](https://github.com/zeroclaw-labs/zeroclaw/issues/8310) 标志着配置架构的大版本升级。将移除所有死代码、SaaS 和非核心 CLI 配置表面。这预示下一版本（v0.9.0 或 v1.0.0）将伴随显著的配置迁移工作，需提前告知用户。
*   **SOP 工作流不可变性**：[Issue #11547](https://github.com/zeroclaw-labs/zeroclaw/issues/11547) 请求将 SOP 运行绑定到不可变的工作流定义版本。这增强了生产环境的可审计性，预计纳入 v0.9.0 网关特性。
*   **OAuth 支持 Anthropic**：[PR #9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420) 是一个长期未合并的大型 PR，旨在支持 Anthropic OAuth 登录而非静态 API Key。鉴于 AI 密钥管理的敏感性，此功能被社区视为高价值需求，可能在下个版本获得优先合并。
*   **Provider 扩展**：[Issue #11583](https://github.com/zeroclaw-labs/zeroclaw/issues/11583) 请求添加 Opper（欧盟托管）作为 OpenAI 兼容 Provider，反映了欧洲用户的数据合规需求。

## 7. 用户反馈摘要

*   **痛点 - 沙箱可靠性**：用户（如 @maacruz）强烈抱怨 Linux 下 Firejail 和 Bubblewrap 的静默失败或错误，导致 Shell 工具不可用。用户期望沙箱检测失败时应抛出明确错误，而非回退到不安全的默认行为。
*   **痛点 - 多模态幻觉**：开发者（如 @GaijinSystems）指出，当历史消息中的图片标记被保留但实际文件不存在或已过期时，LLM 会描述“幻影图片”，严重影响推理准确性。
*   **满意点 - 细粒度控制**：社区对 `zeroclaw user` 命令的生命周期管理（[PR #11265](https://github.com/zeroclaw-labs/zeroclaw/pull/11265)）和 ZeroCode 中子代理任务的可视化（[PR #11446](https://github.com/zeroclaw-labs/zeroclaw/pull/11446)）表示欢迎，认为提升了运维透明度。
*   **场景 - 企业级部署**：用户对“网关分离”和“SOP 不可变版本”的积极反馈表明，项目正从个人助手向团队协作/企业自动化平台演进，稳定性与合规性成为首要考量。

## 8. 待处理积压

*   **长期滞留 PR**：[PR #7821](https://github.com/zeroclaw-labs/zeroclaw/pull/7821) (`feat(security): canonical sandbox_policy schema`) 自 6 月起悬而未决，规模 XL 且涉及核心安全模型，需维护者尽快审查以免阻塞其他安全特性。
*   **关键 Bug 未修复**：[Issue #10923](https://github.com/zeroclaw-labs/zeroclaw/issues/10923) (沙箱 PATH 问题) 和 [Issue #10926](https://github.com/zeroclaw-labs/zeroclaw/issues/10926) (Matrix 发送目标解析错误) 已创建近 3 周，状态为 `blocked` 或 `accepted` 但无最新 PR 关联，需确认是否已在其他 PR 中修复或需分配新开发者。
*   **配置迁移风险**：[Issue #11579](https://github.com/zeroclaw-labs/zeroclaw/issues/11579) 指出 `save_dirty` 可能在未迁移的 V1/V2 配置上打上 V3 标签，导致加载时跳过迁移，造成 Agent 消失。此 Bug 影响存量用户升级，建议在发布 v0.9.0 前必须修复并回归测试。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 (2026-10-07)

## 1. 今日速览
过去 24 小时内，PicoClaw 项目呈现出**“核心维护停滞，社区分支活跃”**的分裂状态。官方仓库在 2026-07-10 之前提交的 PR 全部处于关闭状态，近期无新增合并 PR，且无新版本发布。然而，独立维护者 `@afjcjsbx` 提交了 50 条已关闭/合并的 PR 记录（主要集中在其 Fork 中），并持续在官方仓库发起关于项目未维护的声明。项目核心功能（如 Agent 协作、MCP 支持、LLM 错误重试）在技术层面已具备较高成熟度，但官方仓库的长期静默（Stale）导致社区信任度受损，大量技术债务积压在官方主干中。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
*注：以下 PR 均为 `@afjcjsbx` 在 Fork 中已合并，但在官方仓库中显示为 Closed/Stale，表明官方主干落后于社区活跃分支。*

*   **Agent 核心能力增强**：
    *   **#2937** 实现了内部 Agent 协作总线（Collaboration Bus），支持持久化邮件、隔离会话历史及权限感知，标志着多智能体架构的落地。[链接](https://github.com/sipeed/picoclaw/pull/2937)
    *   **#2158** 引入 Layer 1 多智能体发现提示词，通过轻量级注册表注入系统提示，实现智能体间的互见性。[链接](https://github.com/sipeed/picoclaw/pull/2158)
    *   **#2762** 实现 `/stop` 命令，允许用户中断并取消正在运行的 Agent 任务，提升了交互可控性。[链接](https://github.com/sipeed/picoclaw/pull/2762)
*   **稳定性与健壮性修复**：
    *   **#2983** 修复了 LLM 返回 HTTP 200 但内容语义为空（如 `content: null`）时导致的重试缺口。[链接](https://github.com/sipeed/picoclaw/pull/2983)
    *   **#2768** 改进了瞬态 LLM HTTP 错误（如 500）的重试机制，复用现有的提供商错误分类器。[链接](https://github.com/sipeed/picoclaw/pull/2768)
    *   **#2811** 为 MCP 传输配置引入了通用的 Docker 后端集成测试框架，并重构了 Streamable HTTP 别名支持。[链接](https://github.com/sipeed/picoclaw/pull/2811)
*   **工具链与安全维护**：
    *   **#3248** 升级 Go 版本至 1.25.12 以修复 `crypto/tls` 和 `os` 中的标准库漏洞。[链接](https://github.com/sipeed/picoclaw/pull/3248)
    *   **#2857** 文件编辑工具现在返回统一 Diff 结果而非静默结果，提高了 LLM 对用户修改内容的可观测性。[链接](https://github.com/sipeed/picoclaw/pull/2857)

## 4. 社区热点
*   **#3417 [Notice] Active Fork & Continued Maintenance: afjcjsbx/picoclaw**
    *   **链接**: [https://github.com/sipeed/picoclaw/issues/3417](https://github.com/sipeed/picoclaw/issues/3417)
    *   **分析**: 这是今日新创建的 Issue，再次强调了官方仓库的“未维护”状态。作者 `@afjcjsbx` 公开宣布维持其 Fork 的活跃开发。这反映了社区对项目停滞的强烈不满，以及技术贡献者流向社区分支的趋势。
*   **#440 [OPEN] Replace hard iteration limit with context-window bounding and loop detection**
    *   **链接**: [https://github.com/sipeed/picoclaw/issues/440](https://github.com/sipeed/picoclaw/issues/440)
    *   **分析**: 该 Issue 拥有 8 条评论，是今日讨论最热的技术议题。核心痛点在于 `max_tool_iterations: 20` 的硬性限制导致复杂任务失败。用户呼吁将其替换为基于上下文窗口边界的动态限制及循环检测机制，以支持更长的推理链。
*   **#3407 [OPEN] [BUG] Web UI: a session can disappear from the list while the model is still thinking**
    *   **链接**: [https://github.com/sipeed/picoclaw/issues/3407](https://github.com/sipeed/picoclaw/issues/3407)
    *   **分析**: 描述了 Web UI 中的“幽灵会话”Bug，即在模型思考过程中，会话从列表中消失且无法恢复。这严重影响了用户体验和信任度，被标记为 Stale，暗示官方长期未予处理。

## 5. Bug 与稳定性
1.  **Web UI 幽灵会话 (High)**
    *   **描述**: 新建会话在模型推理期间从侧边栏消失，无法找回。
    *   **状态**: Open, Stale。
    *   **Fix PR**: 暂无关联已合并 PR。
    *   **链接**: [https://github.com/sipeed/picoclaw/issues/3407](https://github.com/sipeed/picoclaw/issues/3407)
2.  **LLM 空响应导致的工作流中断 (Medium)**
    *   **描述**: 当 LLM 返回空内容时，Agent 可能无法正确重试或完成交付，导致“已完成处理但无响应”的错误。
    *   **状态**: Issue #440 描述中提及，PR #2983 在 Fork 中已修复该重试逻辑。
    *   **链接**: [https://github.com/sipeed/picoclaw/issues/440](https://github.com/sipeed/picoclaw/issues/440), [https://github.com/sipeed/picoclaw/pull/2983](https://github.com/sipeed/picoclaw/pull/2983)
3.  **Cron 任务重复响应 (Medium)**
    *   **描述**: Cron 作业执行时发送重复消息（成功确认跟在有效负载后）。
    *   **状态**: PR #2689 已修复 `sessionKey` 传播问题。
    *   **链接**: [https://github.com/sipeed/picoclaw/pull/2689](https://github.com/sipeed/picoclaw/pull/2689)
4.  **MCP 工具模式兼容性问题 (Low)**
    *   **描述**: 使用 Gemini 模型时，复杂的 MCP JSON Schema 导致 HTTP 400 崩溃。
    *   **状态**: PR #2681 引入模式消毒器已修复。
    *   **链接**: [https://github.com/sipeed/picoclaw/pull/2681](https://github.com/sipeed/picoclaw/pull/2681)

## 6. 功能请求与路线图信号
*   **动态迭代限制 (High Priority)**: 用户强烈要求移除硬性迭代次数限制，转而采用上下文窗口边界和循环检测（Issue #440）。这是提升 Agent 处理复杂任务能力的关键。
*   **Web UI 体验优化 (Medium Priority)**: Issue #3406 请求更清晰的“正在思考”指示器、手动/通道会话分离以及更丰富的会话列表（支持归档）。这表明 Web UI 已成为主要使用界面，其 UX 粗糙度正阻碍日常使用。
*   **多智能体协作 (Feature)**: PR #2937 和 #2158 展示了多智能体发现的初步实现，预计将成为未来路线图的重点，支持更复杂的分工场景。

## 7. 用户反馈摘要
*   **痛点**: 官方仓库的长期停滞（Stale 标签频发）导致用户对官方支持的信心丧失。Web UI 的会话管理缺陷（消失、无明确状态）是主要抱怨点。
*   **场景**: 用户正在使用 PicoClaw 进行长周期的复杂任务处理，当前的迭代限制和错误处理机制（如空响应、瞬态 500 错误）经常导致任务失败或需要人工介入。
*   **满意度**: 对核心 Agent 能力（如工具调用、MCP 支持）的底层实现满意度较高，但对上层用户体验（Web UI）和维护响应速度高度不满。

## 8. 待处理积压
*   **官方维护真空**: 所有 50 条近期活跃的 PR 均由 Fork 作者 `@afjcjsbx` 发起，且在官方仓库标记为 Closed/Stale。这表明官方开发活动可能已完全停止。
*   **关键未解决 Issue**:
    *   **#440**: 迭代限制优化（8 条评论，高热度）。
    *   **#3407**: Web UI 会话消失 Bug（影响核心功能可用性）。
    *   **#3406**: Web UI 功能增强。
    *   这些 Issue 均被标记为 `stale`，维护者需决定是正式接管 Fork 代码，还是引导社区转向 `afjcjsbx/picoclaw`。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 (2026-10-07)

## 1. 今日速览
过去 24 小时内，QwenPaw 项目呈现出**低活跃度但质量集中**的状态。数据显示，新增 1 个功能增强请求和 2 个处于开放状态的 Pull Request，无新增版本发布。虽然今日没有 PR 合并或关闭，但现有的待合并 PR 涉及前端稳定性（控制台引导看门狗）和后端功能扩展（自定义提供商能力模板匹配），表明项目正在解决关键的工程稳定性问题并深化对多模态模型的支持。整体来看，项目处于平稳迭代期，重点在于打磨用户体验细节和扩展第三方模型适配能力。

## 2. 项目进展
*注：今日无 PR 合并或关闭记录，以下为当前 Open PR 的技术推进情况，代表项目当前的开发重点。*

- **修复控制台启动稳定性问题**：PR [#8102](https://github.com/agentscope-ai/QwenPaw/pull/8102) 由 @wxhking 提交，旨在解决控制台（Console）在升级后因旧哈希资源 404 或网络卡顿导致的启动挂起问题。该 PR 引入了“启动看门狗”机制，当入口块加载失败时，界面将显示错误状态并提供“重新加载”按钮，而非无限等待。此变更提升了前端应用的鲁棒性，是维护者优先处理的稳定性缺陷。
- **增强自定义提供商的能力自动匹配**：PR [#6823](https://github.com/agentscope-ai/QwenPaw/pull/6823) 由 @LUOSENGWA 提交，允许在添加自定义 OpenAI 兼容提供商时，根据模型 ID 自动应用内置的能力模板（如自动识别 `qwen3.6-plus` 支持图像输入）。该功能降低了用户使用多模态模型的配置门槛，优化了开箱即用的体验。

## 3. 社区热点
- **[Issue #8114] 希望增加推理强度设定功能** ([链接](https://github.com/agentscope-ai/QwenPaw/issues/8114))
  - **状态**：OPEN
  - **分析**：该 Issue 由用户 @hjgsv85jxm-svg 提出，反馈 3.8 系列模型“太爱思考”，导致响应可能冗长或延迟高，用户希望增加对推理强度（Reasoning Effort/Thinking Budget）的限制功能。
  - **诉求解读**：随着大模型推理能力增强，用户对“思考深度”的可控性需求日益迫切。这不仅仅是一个参数调整，可能涉及前端 UI 的推理滑块/选项，以及后端与模型 API 交互时的参数传递逻辑。这是典型的“功能增强”类热点，反映了用户对模型行为可解释性和效率的平衡关注。

## 4. Bug 与稳定性
今日无新的 Bug 类 Issue 报告。现有的稳定性工作主要体现在未合并的 PR 中：

- **控制台启动挂起问题** ([PR #8102](https://github.com/agentscope-ai/QwenPaw/pull/8102))
  - **严重程度**：中高（影响用户首次加载或升级后的体验）
  - **现状**：Fix PR 已存在并处于 Open 状态，尚未合并。该 PR 提供了自动重试和错误表面化的解决方案，建议维护者加快审查合并进程。
  - **相关 Issue**：暂无关联的独立 Bug Issue，属于工程主动发现的稳定性优化。

## 5. 功能请求与路线图信号
- **推理强度/思考预算控制** ([Issue #8114](https://github.com/agentscope-ai/QwenPaw/issues/8114))
  - **信号**：用户明确请求限制模型“思考”时长/深度。
  - **路线图预测**：鉴于该功能对用户体验影响显著且呼声存在，预计下一版本将增加 `reasoning_effort` 或类似参数的配置项（UI 及 API 层面）。若 QwenPaw 已支持部分模型的该参数，此 Issue 可能推动 UI 层的完善；若尚未支持，则需跟进底层 SDK 的更新。

## 6. 用户反馈摘要
- **痛点**：使用最新模型（如 3.8 系列）时，默认推理行为过于激进，导致响应时间不可预测或输出过于冗长。用户缺乏对模型“内部思考”过程的干预手段。
- **使用场景**：用户希望在实时对话或自动化任务中，通过调节“推理强度”来在“回答质量”和“响应速度”之间取得平衡。
- **满意点**：虽然未直接提及，但 Issue 中对“3.8 模型”的提及表明用户对新版模型的质量是认可的，仅希望在控制层面有更细粒度的选项。

## 7. 待处理积压
- **PR #6823** ([链接](https://github.com/agentscope-ai/QwenPaw/pull/6823))
  - **创建时间**：2026-08-08
  - **状态**：Open，最近更新于 2026-10-06
  - **标签**：`first-time-contributor`, `size/M`
  - **风险提醒**：该 PR 已等待近两个月。作为来自首次贡献者的中等规模功能 PR，长期未合并可能导致社区贡献者积极性下降。建议维护者安排代码审查或指派资深开发者协助集成。
- **PR #8102** ([链接](https://github.com/agentscope-ai/QwenPaw/pull/8102))
  - **创建时间**：2026-10-04
  - **状态**：Open
  - **提醒**：虽为近期 PR，但涉及前端核心启动逻辑，若阻塞了其他 UI 迭代，需尽快处理。

---
**数据总结**：
- **活跃度**：低（1 Issue, 2 PR Open, 0 Merged/Closed in 24h）
- **健康度**：中等偏上（无新 Bug 爆发，有明确稳定性修复在途，社区有持续互动）
- **下一步关注**：优先合并 #8102 以提升用户体验；推动 #6823 的审查以激励社区贡献；评估 #8114 的推理参数支持实现方案。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

### 1. 项目动态：Hermes-Agent 日报 (2026-10-07)

#### 1. 今日速览
过去 24 小时，Hermes-Agent 项目保持极高活跃度，共产生 500 条 Issues 更新和 500 条 PR 更新。虽然未发布新版本，但社区聚焦于**系统稳定性修复**（如 macOS 休眠唤醒导致的 PID 漂移、Linux 沙箱故障）与**安全边界加固**（如 Agent 密钥隔离、OAuth 双重解码修复）。项目正深入优化 Agent 的会话状态管理（Session State）与自动更新机制（Install-Update），以解决长期存在的“半应用状态”和权限混淆问题。

#### 2. 项目进展 (合并/关闭的重要 PR)
*注：以下基于数据中 `[CLOSED]` 状态的 PR 及其影响范围进行归纳，推测其合并或废弃对项目的推进作用。*

*   **记忆系统 (Memory) 优化与修复**：
    *   修复了 Hindsight 插件中因 `config_changed` 状态误判导致的每次会话启动时 SIGTERM 终止进程问题 ([#82943](https://github.com/NousResearch/hermes-agent/pull/82943))。
    *   解决了 mem0 OSS 模式下 Qdrant 锁冲突导致工具调用失败的问题，增强了内存数据库的并发访问稳定性 ([#58705](https://github.com/NousResearch/hermes-agent/pull/58705))。
    *   处理了 `hermes -z` (--oneshot) 模式下 Honcho 提供商导致的 SIGABRT 崩溃，优化了 CLI 退出流程 ([#60616](https://github.com/NousResearch/hermes-agent/pull/60616))。
*   **仪表盘 (Dashboard) 部署兼容性**：
    *   修复了 Docker 部署中无内置认证时的访问问题 ([#59113](https://github.com/NousResearch/hermes-agent/pull/59113))。
    *   修正了反向代理子路径下 `/auth/login` 返回 404 的路由错误，提升了企业级部署的兼容性 ([#50889](https://github.com/NousResearch/hermes-agent/pull/50889))。
*   **桌面端与 CLI 功能完善**：
    *   实现了 Group Chat 在桌面端中的文件检索功能，提升了多模态交互体验 ([#104199](https://github.com/NousResearch/hermes-agent/pull/104199))。
    *   修复了 Bot 模式下“未读消息”标记误判及被意外清除的 UI 逻辑错误 ([#93006](https://github.com/NousResearch/hermes-agent/pull/93006))。

#### 3. 社区热点 (高评论量 Issues)
这些 Issue 反映了社区当前最关注的痛点与讨论趋势：

*   **#125727 [OPEN] Automated Nous integration is blocked** ([链接](https://github.com/NousResearch/hermes-agent/issues/125727))
    *   **热度**: 28 评论
    *   **分析**: 自动化集成脚本在合并 `Nous` 到 `Enterkey` 时遭遇多文件冲突（涉及 `permissions`, `agent_init`, `context_compressor` 等核心模块）。这表明主干代码变动频繁，维护者需加强自动化流水线的冲突预警机制。
*   **#122609 [OPEN] Skills index is stale or degraded** ([链接](https://github.com/NousResearch/hermes-agent/issues/122609))
    *   **热度**: 16 评论
    *   **分析**: 由 `hermes-seaeye[bot]` 触发。Skills 索引时效性超标（28.1h > 26h limit），依赖的 CI 工作流 `skills-index.yml` 重建频率可能不足或部署站点存在缓存问题，影响 Skills Hub 的实时性。
*   **#40239 [CLOSED] Add Portuguese (pt-BR) language support** ([链接](https://github.com/NousResearch/hermes-agent/issues/40239))
    *   **热度**: 16 评论, 4 👍
    *   **分析**: 桌面端 i18n 本地化需求。后端与 TUI 已支持，但桌面端 UI 滞后。该 Issue 的关闭暗示相关功能可能已合并或作为独立里程碑处理，标志着国际化支持的扩展。
*   **#20859 [OPEN] Support for Mistral as LLM provider** ([链接](https://github.com/NousResearch/hermes-agent/issues/20859))
    *   **热度**: 16 评论, 29 👍
    *   **分析**: 社区强烈要求增加 Mistral 原生支持。鉴于其用户基数及语音模型已集成，LLM 接入被视为高优先级功能请求。
*   **#134008 [OPEN] Critical issues with repo bot processing & review pipeline** ([链接](https://github.com/NousResearch/hermes-agent/issues/134008))
    *   **热度**: 11 评论
    *   **分析**: 贡献者反映 PR 审查流程存在瓶颈，许多已解决的 OS/UX 问题因“反馈循环”而停滞。需优化代码审查效率，避免 PR 老化。

#### 4. Bug 与稳定性 (按严重程度排列)

| 严重程度 | Issue 编号 | 标题/摘要 | 状态/修复 PR | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| **P1** | [#111761](https://github.com/NousResearch/hermes-agent/issues/111761) | **Reasoning 污染历史**: DeepSeek 等模型在 clean stop 时，内部 reasoning 被错误地提升为 assistant 可见内容，污染对话历史。 | 已关闭 (推测已修复) | 涉及数据持久化，需确保修复彻底。 |
| **P1** | [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) | **更新机制致命缺陷**: `hermes update` 失败后遗留半应用状态（Desktop 崩溃、Gateway 缺失依赖），且无产品内恢复路径，需手动脚本修复。 | Open | **高风险**。影响面极广（5 种机制，15 个 Discord 线程），需立即提供回滚或自动修复工具。 |
| **P2** | [#99943](https://github.com/NousResearch/hermes-agent/issues/99943) | **上下文窗口截断**: Cloud 提供商（OpenAI/Anthropic 等）错误地使用 Ollama 的 `num_ctx` 参数，导致 1M 窗口被静默截断至 65k。 | Open | 影响长上下文场景，需修正 provider 映射逻辑。 |
| **P2** | [#108215](https://github.com/NousResearch/hermes-agent/issues/108215) | **macOS MCP 死锁**: `computer_use` MCP 在 daemon 重启后永久卡死，未处理 `CONNECTION_CLOSED` 重连。 | Open | 影响 macOS 自动化任务。 |
| **P2** | [#118326](https://github.com/NousResearch/hermes-agent/issues/118326) | **Kanban Worker 误杀**: macOS 休眠/唤醒导致 `psutil` 时间戳漂移，Reaper 误判 PID 回收并释放活跃 Worker 的 claim。 | Open | 影响后台任务稳定性。 |
| **P2** | [#58226](https://github.com/NousResearch/hermes-agent/issues/58226) | **Anthropic 用量显示错误**: 低使用量窗口被误显为 100% 已用，缩放逻辑错误。 | Open | 影响用户计费感知。 |
| **P3** | [#122326](https://github.com/NousResearch/hermes-agent/issues/122326) | **更新接管死循环**: `lazy_deps` shim 触发完整更新接管，导致 Hindsight 插件在 Desktop 中陷入重建循环。 | 已关闭 | 需确认相关提交是否完全清除了副作用。 |
| **P3** | [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) | **Kanban 卡片卡死**: 限流后重试成功的卡片被永久标记为 `blocker_auth`，Reviewer 无法生成。 | Open | 影响自动化工作流。 |

*   **相关修复 PR**:
    *   [#134263](https://github.com/NousResearch/hermes-agent/pull/134263): 内核强制 Agent 秘密隔离，关闭泄露路径 (Security)。
    *   [#134262](https://github.com/NousResearch/hermes-agent/pull/134262): 修复 Dashboard OAuth 中 IdP 响应体双重解码问题。
    *   [#134256](https://github.com/NousResearch/hermes-agent/pull/134256): 修复 TUI 中 detached session 在轮询期间被强制收割的问题。
    *   [#134259](https://github.com/NousResearch/hermes-agent/pull/134259): Relay 重连退避策略优化，避免崩溃循环中的高频重拨。

#### 5. 功能请求与路线图信号

*   **高热度需求**:
    *   **Mistral 支持** ([#20859](https://github.com/NousResearch/hermes-agent/issues/20859)): 29 个 👍，表明用户基础庞大，极有可能在下个主要版本中作为新增 Provider 加入。
    *   **可配置 Temperature** ([#17565](https://github.com/NousResearch/hermes-agent/issues/17565)): 17 个 👍，当前硬编码导致幻觉严重，暴露 `temperature` 参数是基础且高优级的配置项。
    *   **移动端原生 App (iOS/Android)** ([#11911](https://github.com/NousResearch/hermes-agent/issues/11911)): 9 个 👍，语音通话功能。虽然热度低于前两者，但属于重大战略扩展，需关注长期路线图。
*   **在途 PR 信号**:
    *   **首次运行设置 (Onboarding)** ([#134209](https://github.com/NousResearch/hermes-agent/pull/134209)): 引入交互式 setup chat，提升新用户体验 (UX)。
    *   **技能搜索工具 (skill_search)** ([#132423](https://github.com/NousResearch/hermes-agent/pull/132423)): 将 `skill_search` 暴露到默认工具面，增强 Agent 自主发现能力。
    *   **Matrix 共享房间前缀** ([#133923](https://github.com/NousResearch/hermes-agent/pull/133923)): 在共享会话中暴露发送者 MXID，提升多用户协作的安全性/可识别性。

#### 6. 用户反馈摘要

*   **痛点 (Pain Points)**:
    *   **更新脆弱性**: 用户极度反感 `hermes update` 失败后缺乏恢复机制 ([#125437](https://github.com/NousResearch/hermes-agent/issues/125437))，多次出现半应用状态导致桌面端无法启动。
    *   **自动化瓶颈**: 用户抱怨审查流程慢，导致修复好的 PR 因代码过时而废弃 ([#134008](https://github.com/NousResearch/hermes-agent/issues/134008))。
    *   **记忆重复**: 生产环境中 Hindsight 记忆预取存在严重重复注入 (单轮 49 次重复，~98k tokens)，浪费算力并降低响应质量 ([#111205](https://github.com/NousResearch/hermes-agent/issues/111205), 已标记 duplicate 但需确认底层去重逻辑)。
*   **满意/场景**:
    *   语音模型集成被视为优势，推动了 Mistral 语音与 LLM 联合支持的请求。
    *   桌面端 i18n 的逐步完善 (如 pt-BR) 受到国际用户欢迎。
    *   TUI 和 Dashboard 的修复 (如 bot unread markers) 提升了日常使用的流畅度。

#### 7. 待处理积压 (Long-standing/Attention Needed)

*   **自动化冲突**: [#125727](https://github.com/NousResearch/hermes-agent/issues/125727) 中提到的 Nous 集成冲突已存在 10 天 (Created 09-27)，涉及核心 Agent 模块，需资深开发者介入合并。
*   **安全与权限**: [#35357](https://github.com/NousResearch/hermes-agent/issues/35357) 指出 Tirith 审批门控未覆盖非 Shell 工具 (如 `send_message`, `write_file`)，存在权限绕过风险。虽为 P3，但涉及安全边界，建议提升至更高优先级。
*   **平台兼容性**: [#131055](https://github.com/NousResearch/hermes-agent/issues/131055) Linux Desktop 二次启动污染沙箱标记，导致 `--no-sandbox` 粘性错误和 SIGILL 循环。此问题阻塞了 Linux 桌面端的稳定使用。
*   **Windows 权限**: [#122987](https://github.com/NousResearch/hermes-agent/pull/122987) (PR) 修复了 Windows ACL 继承问题，需尽快合并以避免提权更新后的权限混乱。

### 总结
Hermes-Agent 正处于**高强度迭代与稳定性治理**的并行期。虽然功能创新（如 Onboarding、Mistral 支持）在推进，但大量的资源正被投入到修复底层基础设施（更新机制、PID 管理、内存锁、安全边界）的回归缺陷中。**建议维护者优先处理 `hermes update` 的恢复机制 ([#125437](https://github.com/NousResearch/hermes-agent/issues/125437)) 和 Linux/macOS 平台特定的稳定性 Bug**，以保障核心用户体验的连续性。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 (2026-10-07)

## 1. 今日速览
AstrBot 项目在过去 24 小时内保持了极高的开发活跃度，累计处理了 19 条 Issues 和 31 条 Pull Requests，其中 7 条 Issue 和 14 条 PR 已完成合并或关闭，显示维护团队具备强大的响应能力。社区主要关注点集中在 **WebUI 体验优化**（如日志导出、侧边栏自定义）、**核心稳定性修复**（如事件循环阻塞、QQ 频道消息回复限制）以及 **多平台兼容性**（Discord、微信 ClawBot）。尽管未发布新版本，但底层架构的异步性能优化和功能模块的精细化调整表明项目正为下一轮版本迭代积累坚实基础，整体健康状况良好。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日合并/关闭了 14 条 PR，重点推进了性能优化与核心功能修复：

*   **Dashboard 性能优化**：PR [#10413](https://github.com/AstrBotDevs/AstrBot/pull/10413) 通过懒加载 VAD/Monaco/i18n 资源及启用 Gzip 响应，显著减少了首屏加载时间，提升了 WebUI 的交互流畅度。
*   **核心异步阻塞修复**：PR [#10424](https://github.com/AstrBotDevs/AstrBot/pull/10424) 修复了备份导出功能（`export_all`）在 asyncio 事件循环线程中执行 ZIP 压缩导致 Bot 冻结 76 秒的严重问题；PR [#10427](https://github.com/AstrBotDevs/AstrBot/pull/10427) 将分块附件组装移至线程池，避免大文件传输阻塞事件循环。
*   **插件视图与安全**：PR [#10415](https://github.com/AstrBotDevs/AstrBot/pull/10415) 完成了 Dashboard 中“Pages”到“Views”的完整重命名，并引入了作用域路径令牌认证，增强了插件视图的安全性。
*   **日志功能增强**：PR [#10418](https://github.com/AstrBotDevs/AstrBot/pull/10418) 实现了从控制台和设置页导出日志文件及内存日志的功能，直接解决了 Issue [#10407](https://github.com/AstrBotDevs/AstrBot/issues/10407) 的需求，极大便利了用户向开发者提交诊断信息。
*   **其他修复**：包括修复 Discord 视频组件发送失败 ([#10423](https://github.com/AstrBotDevs/AstrBot/pull/10423))、Discord 自回复循环 ([#10425](https://github.com/AstrBotDevs/AstrBot/pull/10425))、音频格式探测阻塞 ([#10055](https://github.com/AstrBotDevs/AstrBot/pull/10055)) 以及 Gemini 嵌入模型默认值更新 ([#10393](https://github.com/AstrBotDevs/AstrBot/pull/10393))。

## 4. 社区热点
*   **内置指令白名单/权限控制**：
    *   Issue [#10416](https://github.com/AstrBotDevs/AstrBot/issues/10416) 与 [#10426](https://github.com/AstrBotDevs/AstrBot/issues/10426) 均被用户 `@mjy1113451` 提出，反映了在多人 Bot 同群场景下，因唤醒词相同或内置指令通用导致的“刷屏”痛点。用户强烈希望提供指令级别的白名单机制（仅限 Bot 主/特定用户/所有人），以精细控制指令响应范围。该诉求因涉及多机器人共存的核心场景，社区关注度较高。
    *   关联的 Bug [#10371](https://github.com/AstrBotDevs/AstrBot/issues/10371) 指出当前管理员指令组前缀匹配逻辑存在缺陷，导致普通聊天消息（如“天气真好”）被误拦截，该 Issue 已关闭，表明匹配逻辑已修复或调整。
*   **自定义侧边栏与 UI 布局**：
    *   Issue [#10417](https://github.com/AstrBotDevs/AstrBot/issues/10417) 提出目前自定义侧边栏仅支持一级菜单修改，用户希望能调整二级菜单顺序和层级，以便个性化展示高频功能（如日志、数据），该 Issue 获得了较多点赞（👍: 2）。
*   **插件生态需求**：
    *   多个新插件申请上线，包括 AI 视频总结 ([#8159](https://github.com/AstrBotDevs/AstrBot/issues/8159)、已关闭) 和网易云音乐点歌 ([#10419](https://github.com/AstrBotDevs/AstrBot/issues/10419))，显示了社区在多媒体处理和内容生成方面的活跃需求。

## 5. Bug 与稳定性
今日报告的 Bug 及稳定性问题如下：

1.  **[高] QQ 频道消息回复限制**：
    *   Issue [#10420](https://github.com/AstrBotDevs/AstrBot/issues/10420) 报告在 `use_markdown=true` 时，QQ 官方机器人频道场景下回复消息失败，报错“主动消息限频” (304049)。分析显示 Markdown 回退顺序有误，误用了主动消息 API 而非被动回复 API。**暂无直接 Fix PR**，需关注频道消息通道适配。
2.  **[中] 插件市场备用源失效**：
    *   Issue [#10421](https://github.com/AstrBotDevs/AstrBot/issues/10421) 报告当插件市场主源请求失败时，切换至 GitHub 备用源立即报错 `Session is closed`，导致无法刷新列表，仅能依赖本地缓存。**暂无 Fix PR**，需检查 HTTP 客户端 Session 生命周期管理。
3.  **[中] 设置页渲染异常**：
    *   Issue [#10405](https://github.com/AstrBotDevs/AstrBot/issues/10405) 指出设置页中 7 个配置分组的副标题（subtitle）因 i18n 键未正确绑定至 UI 而未渲染，影响配置项的易读性。**暂无 Fix PR**。
4.  **[低] 会话 ID 创建原子性**：
    *   Issue [#10410](https://github.com/AstrBotDevs/AstrBot/issues/10410) 指出 `handle_empty_mention` 中查询对话 ID 与新建对话缺乏细粒度原子保护，可能存在并发竞态条件。此问题较为底层，需核心开发评估锁机制。
5.  **[已修复/关闭] 管理员指令组误匹配**：
    *   Issue [#10371](https://github.com/AstrBotDevs/AstrBot/issues/10371) 关于指令组前缀匹配拦截普通消息的问题已标记为关闭，表明相关逻辑已得到修复。

## 6. 功能请求与路线图信号
*   **多语言指令支持 (高优先级)**：Issue [#10406](https://github.com/AstrBotDevs/AstrBot/issues/10406) 指出当前 i18n 仅覆盖 WebUI 展示层，运行时指令输出（指令名、描述、回复）仍硬编码为单一语言。已有 PR [#9984](https://github.com/AstrBotDevs/AstrBot/pull/9984) 待 Review，若通过，将极大提升多语言部署体验。
*   **数据与日志拆分**：Issue [#10377](https://github.com/AstrBotDevs/AstrBot/issues/10377) 建议将对话数据与日志在 WebUI 中拆分展示，以方便调试。结合今日合并的日志导出功能 ([#10418](https://github.com/AstrBotDevs/AstrBot/pull/10418))，维护团队可能正在重构日志与数据管理模块。
*   **未来任务多群投递**：Issue [#10422](https://github.com/AstrBotDevs/AstrBot/issues/10422) 请求允许“投递到”选项支持多选，以便一次性创建向多个群聊发送总结的任务，符合自动化运维场景。
*   **管理员 ID 选择优化**：Issue [#10409](https://github.com/AstrBotDevs/AstrBot/issues/10409) 建议 WebUI 记录并允许直接选择历史用户 ID 作为管理员，而非手动输入，降低配置门槛。

## 7. 用户反馈摘要
*   **痛点**：用户普遍反映新版 WebUI 在配置便捷性上有所退步，如“频繁调试时需多步操作查看日志” ([#10377](https://github.com/AstrBotDevs/AstrBot/issues/10377))，以及“自定义侧边栏功能受限” ([#10417](https://github.com/AstrBotDevs/AstrBot/issues/10417))。
*   **场景**：高频使用场景集中在“多 Bot 共存群聊”中的指令干扰问题 ([#10416](https://github.com/AstrBotDevs/AstrBot/issues/10416)) 和 “日志诊断与上报” ([#10407](https://github.com/AstrBotDevs/AstrBot/issues/10407))。
*   **满意点**：社区对快速响应 Bug 和合并功能 PR 的效率表示认可，如日志导出功能迅速从提案变为代码合并。

## 8. 待处理积压
*   **长期未响应的重要 Issue**：
    *   Issue [#10410](https://github.com/AstrBotDevs/AstrBot/issues/10410) （会话原子性保护）涉及核心并发模型，需资深开发者介入评估。
    *   Issue [#10387](https://github.com/AstrBotDevs/AstrBot/issues/10387) （插件生命周期回调传播任务取消）涉及插件系统架构，需确保取消信号能正确穿透至所有插件 Hook。
*   **待合并 PR**：
    *   PR [#9795](https://github.com/AstrBotDevs/AstrBot/pull/9795) （手动上下文压缩 `/compact`）是一个较大的功能增强，需评估 LLM 压缩策略与默认阈值的平衡。
    *   PR [#10345](https://github.com/AstrBotDevs/AstrBot/pull/10345) （引用图片顺序修复）已 Retarget 至 master，需尽快合并以修复多图引用排序错误。
    *   PR [#10408](https://github.com/AstrBotDevs/AstrBot/pull/10408) （空提及轮次注入 Persona）修复了首次无 ID 会话时 Persona 未生效的 Bug，建议优先合并。

---
*数据来源：GitHub AstrBotDevs/AstrBot API，统计时间范围：2026-10-06 00:00 UTC 至 2026-10-07 00:00 UTC*

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报

**日期：** 2026-10-07
**仓库：** [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

## 1. 今日速览

DeepSeek Harness 社区在过去 24 小时保持了极高的活跃度，Discussions 更新量达到 **166 条**。尽管今日**无新版本发布**，但社区围绕当前预发布版本（0.1.5-rc.1 至 0.2.0-rc.2）的稳定性反馈密集，核心争议集中在 Windows 平台的 ACL 沙箱机制与桌面端启动逻辑上。项目处于高活跃测试期，用户在 GitHub Discussions 中积极分享 Bug 报告与原型插件，但官方尚未有合并摘要（Releases）落地，表明当前版本迭代仍处于内部打磨阶段。

## 2. 版本发布

**无**
过去 24 小时内该仓库未生成新的 Release 标签或 CHANGELOG 更新，代码合并状态暂无法通过公开数据确认。

## 3. 项目进展

由于该仓库未启用 GitHub Pull Requests，且当前无版本发布记录，暂无官方确认的功能或修复代码合入主线的进展。当前的开发活动主要体现为社区对 `0.2.0-rc.2`（桌面版）与 `0.1.x` 系列功能包的验证与反馈。

## 4. 社区热点

今日讨论热度（以评论数排序）主要集中于版本兼容性与核心功能缺失：

*   **[General] 0.1.5-rc.1: v0→v3 迁移有三道 fail-closed 闸门 —— 49/123 之前的会话点不开（含没人报过的 inbox/spliced 一类），附已验证的修复配方 0/49→49/49** (评论: 21)
    *   作者分享了一套手动修复旧版会话存档无法在当前版本打开的配方，反映出早期存档格式升级带来的兼容性痛点。
    *   链接: [#6559](https://github.com/deepseek-ai/deepseek-harness/discussions/6559)
*   **[Q&A] 本轮运行失败DeepSeek Messages transport failed** (评论: 12)
    *   用户反馈升级 4.1 后出现持续的传输失败，且无法使用其他 DS 模型。
    *   链接: [#6987](https://github.com/deepseek-ai/deepseek-harness/discussions/6987)
*   **[Ideas] 桌面版会话窗口缺少 Ctrl+F 关键字搜索（附根因定位与可用原型实测）** (评论: 10)
    *   用户指出底层全文检索引擎已存在但未被桌面端激活，并贡献了可直接参考的插件原型实现。
    *   链接: [#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713)
*   **[Show & Tell] Capital Generation —— 面向中国散户的证券研究插件** (评论: 10)
    *   社区活跃度体现在垂直领域的 Agent 插件开发上，展示了多 Agent 协作处理金融数据的可行性。
    *   链接: [#6947](https://github.com/deepseek-ai/deepseek-harness/discussions/6947)

## 5. Bug 与稳定性

今日报告的 Bug 集中在 Windows 系统的沙箱权限控制及 Web 端工具调用异常，**尚未见官方修复 PR 落地**：

*   **[高] Windows 工作区外部子目录写入权限（capability ACE）永不补授** (评论: 8)
    *   工作区首次授权后，外部创建或移入的子目录永久无法写入，属于底层 ACL 授权的逻辑缺陷。
    *   链接: [#423](https://github.com/deepseek-ai/deepseek-harness/discussions/423)
*   **[高] 0.1.6-alpha.2 Web 端工具调用崩溃 (TypeError: Cannot read properties of undefined)** (评论: 7)
    *   在 `dsh web` 中，所有 assistant 工具调用在 dispatch 前失败，疑似 Symbol 身份不匹配导致。
    *   链接: [#7368](https://github.com/deepseek-ai/deepseek-harness/discussions/7368)
*   **[高] Windows workspace-write 遗留永久性 Low integrity label 破坏其他工具** (评论: 6)
    *   写入操作后残留的 `Everyone:(CI)(DENY)(DC)` 及 Low Mandatory Level 标签，会导致该项目后续无法被其他常规工具使用。
    *   链接: [#8312](https://github.com/deepseek-ai/deepseek-harness/discussions/8312)
*   **[中] 桌面版 0.2.0-rc.2 设置页保存必失败 (profile reload 缺少 root Include 入口)** (评论: 6)
    *   任何供应商配置的保存均会报错，重装同版本后可恢复，疑似打包环境下的配置校验 Bug。
    *   链接: [#8928](https://github.com/deepseek-ai/deepseek-harness/discussions/8928)
*   **[中] 官方添加工作区时 gateway workspaceController 不可用** (评论: 6)
    *   用户环境报错 `active Service "workspaceController" is unavailable`。
    *   链接: [#8357](https://github.com/deepseek-ai/deepseek-harness/discussions/8357)

## 6. 功能请求与路线图信号

*   **桌面端交互增强**：用户强烈呼吁补齐桌面端 `Ctrl+F` 搜索功能，且社区已提供成熟的插件原型（#8713），推测该功能在后续版本中被激活或正式纳入 UI 的概率较高。
*   **沙箱与 ACL 机制重构**：多个高严重度 Bug（#423, #8312, #8485）指向 Windows 平台的沙箱授权逻辑存在系统性缺陷，预计官方需对 ACL 策略及沙箱初始化流程进行重大重构。

## 7. 用户反馈摘要

*   **痛点**：Windows 桌面端（Electron）在无控制台启动路径下，沙箱内 `pwsh` 100% 因 `0xC0000142` 崩溃（[#810](https://github.com/deepseek-ai/deepseek-harness/discussions/810)）；升级新版本（v0→v3 格式）后旧会话数据丢失风险高。
*   **满意**：Web 版插件开发体系（Agent Preset）表现良好，社区开发者能快速结合多 Agent 机制构建垂直领域工具（如金融研究）。

## 8. 待处理积压

以下重要问题已开放多日且至今无维护者响应的修复记录：
*   **#810**: 桌面端无控制台启动导致 shell 100% 失效（创建于 08-14）。
*   **#423**: Windows ACL 外部子目录永久写入受阻（创建于 08-13）。
*   **#7142**: `session/list` 性能极差，7700 个会话读取耗时 3 秒并占用 60MB 内存（创建于 09-19）。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*