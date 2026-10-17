# OpenClaw 生态日报 2026-10-18

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-17 23:37 UTC

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
**日期**：2026-10-18
**数据范围**：过去24小时 GitHub 动态

## 1. 今日速览
过去 24 小时 OpenClaw 社区活跃度极高，共处理 500 条 Issues 更新和 500 条 PR 更新，其中 Issues 新开/活跃 339 条，PR 待合并 257 条，显示项目处于高速迭代与压力测试阶段。当前项目面临的核心挑战集中在**Gateway 事件循环阻塞**、**SQLite 状态数据库竞争**以及**Android/多端语音交互稳定性**三大领域，涉及多个 P0/P1 级别的崩溃循环（crash-loop）与数据丢失风险。尽管暂无新版本发布，但维护者正通过大量重构和针对性修复 PR 积极清理技术债务，试图缓解高负载下的系统不稳定问题，整体项目健康度呈现“高压力、快响应”的特征。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日虽无版本发布，但有大量基础设施优化与底层修复推进，主要致力于解决 Gateway 性能瓶颈和代码冗余问题：

*   **Gateway 启动与配置管理优化**：
    *   `#175911 refactor(gateway): simplify config restart ownership`：简化了 Gateway 配置重启的所有权逻辑，保留安全预检和活动排空机制，旨在提升重启过程的稳定性 [链接](https://github.com/openclaw/openclaw/pull/175911)。
    *   `#175900 fix(sessions): compact through symlinked state directories`：修复了通过符号链接访问状态目录时手动压缩失败的问题，对 macOS `/var` 和 `/tmp` 别名场景尤为重要 [链接](https://github.com/openclaw/openclaw/pull/175900)。
*   **核心运行时重构与去冗余**：
    *   `#175914 refactor(runtime): retire private execution and startup options`：移除了 Agent 执行和启动辅助函数中未使用的私有依赖替代和固定值选项，无用户可见变更 [链接](https://github.com/openclaw/openclaw/pull/175914)。
    *   `#175920 refactor(runtime): reuse prepared model owner inputs`：优化了发布运行时加载器，复用预制备的模型所有者输入，避免重复构建环境和运行时选择事实 [链接](https://github.com/openclaw/openclaw/pull/175920)。
    *   `#175912 refactor: centralize core tool factory and replay facts`：集中化核心工具工厂和重放事实，防止工具目录、工厂路由和重放安全清单发生漂移 [链接](https://github.com/openclaw/openclaw/pull/175912)。
*   **Codex 扩展功能增强**：
    *   `#175918 feat: support core Goals on Codex cloud workers`：支持在 Codex 云工作者上使用核心 OpenClaw Goals，允许操作员在空闲的 Codex 云工作者上启动和恢复 Goals [链接](https://github.com/openclaw/openclaw/pull/175918)。
    *   `#175903 fix(codex): keep OpenClaw tools callable without native discovery`：确保在禁用原生 Code Mode 时，允许的 OpenClaw 工具仍可被调用，避免工具不可达 [链接](https://github.com/openclaw/openclaw/pull/175903)。
*   **UI 与 CLI 体验改进**：
    *   `#174022 feat(ui): show the Gateway connection state in the sidebar footer`：在侧边栏底部显示 Gateway 连接状态，解决了桌面端状态文字被裁剪和移动端布局跳动的问题 [链接](https://github.com/openclaw/openclaw/pull/174022)。
    *   `#175814 fix: preserve mention text in slash command arguments`：修复了群组斜杠命令中提及模式出现在路径、URL 或标识符内部时导致参数损坏的问题 [链接](https://github.com/openclaw/openclaw/pull/175814)。

## 4. 社区热点
以下 Issues/PRs 今日讨论最活跃，反映了社区最关注的痛点：

1.  **Tool outputs 渲染异常导致 Agent 不可读**：[#99241](https://github.com/openclaw/openclaw/issues/99241) (26 评论)
    *   **诉求分析**：在长运行/ANSI 密集的工具工作流中，工具结果折叠为图像附件占位符 `(see attached image)`，导致 Agent 无法读取原始 stdout/stderr 文本。这是严重的数据丢失问题，用户急需修复以保留调试证据。
2.  **Gateway 事件循环同步阻塞**：[#119720](https://github.com/openclaw/openclaw/issues/119720) (24 评论)
    *   **诉求分析**：同步 Agent 持久化和转录维护在大规模场景下阻塞 Gateway 事件循环。用户关注高并发下的系统吞吐量和响应延迟，期待异步化或更高效的锁机制。
3.  **插件源捕获导致严重 SSD 磨损**：[#157989](https://github.com/openclaw/openclaw/issues/157989) (19 评论)
    *   **诉求分析**：自 2026.9.5 起，每次 CLI 命令或 Gateway 启动都会字节复制并 SHA-256 哈希所有外部插件文件，造成数 GB 的写入。用户强烈担忧硬件寿命问题，要求停止不必要的重复捕获。
4.  **Gateway 状态 DB WAL 自动检查点失败**：[#164294](https://github.com/openclaw/openclaw/issues/164294) (19 评论)
    *   **诉求分析**：WAL 自动检查点由于进程内读取器阻塞而永远无法完成。这是数据库维护的关键问题，可能导致日志文件无限增长，用户希望实现可靠的检查点机制。
5.  **SQLite 无界增长风险**：[#114612](https://github.com/openclaw/openclaw/issues/114612) (17 评论)
    *   **诉求分析**：`memory_index_chunks` 和 `memory_embedding_cache` 表没有保留策略，长期运行会填满磁盘。用户需要自动清理或 LRU 淘汰机制，结合 PR #164792 正在推进的优化。

## 5. Bug 与稳定性
按严重程度排列，今日报告的 Bug 主要涉及崩溃循环、数据丢失和性能降级：

*   **[P0] Gateway 启动阻塞事件循环 40-200s，引发重启循环**：[#162211](https://github.com/openclaw/openclaw/issues/162211)
    *   **状态**：OPEN，无关联修复 PR。
    *   **描述**：启动期间事件循环阻塞被健康监控误读为断开连接，导致升级重启。这是严重的可用性故障。
*   **[P0] Gateway 崩溃：状态 DB 读准入密封导致未处理的拒绝**：[#160521](https://github.com/openclaw/openclaw/issues/160521)
    *   **状态**：CLOSED（今日关闭）。
    *   **描述**：`Worker environment inventory has closed` 异常导致崩溃。虽然已关闭，但需确认修复是否已覆盖所有边界情况。
*   **[P0] 计费冷却时间过长，缺乏探测恢复机制**：[#115642](https://github.com/openclaw/openclaw/issues/115642)
    *   **状态**：OPEN，无关联修复 PR。
    *   **描述**：订阅认证提供商出错后，5 小时冷却期内所有请求立即失败。用户急需基于探测的恢复和手动重置命令。
*   **[P1] 插件源捕获导致 ~6.5 GB/启动 的 SSD 写入**：[#157989](https://github.com/openclaw/openclaw/issues/157989)
    *   **状态**：OPEN，无关联修复 PR。
    *   **描述**：回归问题，需优化捕获复用逻辑。
*   **[P1] Android Talk 在 Agent 使用工具时断开连接**：[#131768](https://github.com/openclaw/openclaw/issues/131768)
    *   **状态**：OPEN，无关联修复 PR。
    *   **描述**：语音交互在工具调用期间静默停止，用户转而使用 Discord 语音作为替代方案。
*   **[P1] SQLite 竞争导致 ~33s 事件循环停顿**：[#117262](https://github.com/openclaw/openclaw/issues/117262)
    *   **状态**：OPEN，无关联修复 PR。
    *   **描述**：三个并发写句柄竞争锁，需优化数据库访问模式。
*   **[P1] Tool outputs 渲染为图像附件**：[#99241](https://github.com/openclaw/openclaw/issues/99241)
    *   **状态**：CLOSED（今日关闭）。
    *   **描述**：曾导致 Agent 无法读取工具输出，需确认关闭原因是已修复还是判定为不可复现。

## 6. 功能请求与路线图信号
*   **核心 Goals 在 Codex 云工作者的支持**：PR #175918 正在推进，预计将允许在云环境中更灵活地管理长期任务。
*   **iOS/macOS 个人身份登录选项**：[#162164](https://github.com/openclaw/openclaw/issues/162164) 请求在保留共享所有者认证的同时，为人类操作提供显式的个人登录选择，涉及平台采用和路由选择。
*   **Cron 维护窗口与角色隔离**：[#120244](https://github.com/openclaw/openclaw/issues/120244) RFC 提议增加可选的每日维护窗口，推迟非花名册 Cron 工作并在阶段退出时重放，可能纳入下一版本以提升可维护性。
*   **Per-turn 发送预算**：[#119992](https://github.com/openclaw/openclaw/issues/119992) 请求为 `message` 工具增加每轮发送预算，防止 Agent 在单轮内发送多个变体答案造成“风暴”，提升交互可控性。

## 7. 用户反馈摘要
*   **痛点**：用户对 **SSD 磨损**（#157989）和 **磁盘空间增长**（#114612）高度敏感，长期部署实例的用户担忧硬件寿命。
*   **场景**：高并发 Gateway 用户遭遇 **事件循环阻塞**（#119720, #117262），影响多 Agent 协作实时性。
*   **满意/不满意**：维护者对重构和清理技术债务的快速响应获得认可（如 #175914, #175920 系列），但用户对 P0/P1 级稳定性 Bug（如 #162211, #115642）缺乏即时修复表示担忧，尤其是涉及数据丢失和认证冷却的问题。

## 8. 待处理积压
*   **#119720 [P1] Synchronous agent persistence blocks Gateway event loop**：创建于 2026-08-05，高评论数，无关联修复 PR，需维护者评估异步化改造优先级。
*   **#115642 [P0] Billing cooldown outlives the outage**：创建于 2026-07-29，影响认证恢复，无关联修复 PR，需设计探测机制。
*   **#131768 [P1] Android Talk drops live session**：创建于 2026-08-28，影响语音核心体验，无关联修复 PR，需排查工具调用期间的会话保持逻辑。
*   **#117262 [P1] SQLite contention 33s stalls**：创建于 2026-08-01，长期存在的性能问题，需深入分析锁持有时间。
*   **#158390 [P1] plugin-captures tmp dirs not GC'd**：创建于 2026-09-25，磁盘泄漏问题，虽无 fix PR 但需清理机制，与 #157989 相关但侧重不同。

---

## 横向生态对比

**AI 智能体与个人助手开源生态横向对比分析报告 (2026-10-18)**

### 1. 生态全景
当前个人 AI 助手与自主智能体开源生态呈现**高度活跃但稳定性承压**的特征，多数头部项目（OpenClaw, hermes-agent, QwenPaw）处于高强度的重构与补丁修复期，核心矛盾集中在高负载下的并发控制、多模态会话管理及跨平台兼容性问题。生态正从单纯的功能堆叠向**底层架构治理**（如事件循环优化、状态数据库一致性）和**平台化扩展**（插件系统、多端支持）演进，尤其是 Gateway 架构的标准化成为主要技术债务清理方向。

### 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | 发布状态 | 核心健康度评估 |
| :--- | :---: | :---: | :---: | :--- |
| **OpenClaw** | 500 | 500 (257 待合并) | 无 | **高压迭代**：高活跃度伴随 P0 级崩溃循环与 SSD 磨损风险，维护响应快但稳定性受创。 |
| **hermes-agent**| ~500 | 93 合并/关闭 | 无 | **架构收尾**：集中消化统一 Gateway 运行时带来的回归，多平台会话状态冲突频发。 |
| **QwenPaw** | 9 | 15 | 无 | **补丁密集**：v2.2.2 稳定性回归严重，重点修复多媒体导致的会话锁死与 UI 崩溃。 |
| **Zeroclaw** | 49 | 50 (49 待合并) | 无 | **管线堆积**：研发管线严重堵塞，大量 XL 级 PR 等待合并，安全加固与网关分离在推进中。 |
| **DeepSeek Harness**| N/A (Discussions 236) | N/A (无 PR 机制) | v0.2.1-rc.1/rc.2 | **快速迭代**：双 RC 发布，模型适配快，但 Windows 沙箱与 Linux 支持缺失引发负面反馈。 |
| **AstrBot** | 20 | 26 | v4.29.1 | **稳定巩固**：版本发布后快速修复阻断性 Bug，WebUI 与知识库体验持续优化，健康度较高。 |
| **PicoClaw** | 0 (关闭 1) | 0 (关闭 1) | 无 | **低维护/休眠**：仅在清理 Stale 积压，无实质开发活动，处于边缘化维护状态。 |

### 3. OpenClaw 在生态中的定位
*   **优势与定位**：OpenClaw 是目前生态中**规模最大、迭代速度最快**的核心项目，其“Gateway + 多端（Android/iOS/Mac/Win）”架构定义了当前个人 AI 助手的形态标准。
*   **技术路线差异**：相比 Zeroclaw 和 QwenPaw 侧重于插件安全与特定渠道优化，OpenClaw 更强调**全链路自研运行时**的极致性能，但也因此承受了最大的底层技术债务（SQLite 竞争、事件循环阻塞）。
*   **社区规模**：以 500+ 的日更量遥遥领先于其他项目（多为两位数至三位数），拥有最广泛的社区反馈渠道，但同时也面临最复杂的 P0/P1 级稳定性挑战。

### 4. 共同关注的技术方向
*   **会话状态一致性管理**：
    *   *涉及项目*：OpenClaw (#119720), hermes-agent (#134889), QwenPaw (#8288)。
    *   *具体诉求*：在多 Agent 并发或长期运行场景下，解决数据库锁竞争、会话 ID 冲突及状态覆盖问题，防止数据丢失。
*   **多模态媒体处理稳定性**：
    *   *涉及项目*：QwenPaw (#8171), DeepSeek Harness (#5505), AstrBot (#8048)。
    *   *具体诉求*：增强音频/视频输入支持的鲁棒性，避免因模型不支持特定模态导致的会话死锁（Wedge）或格式解析错误。
*   **插件系统安全与生命周期**：
    *   *涉及项目*：Zeroclaw (#11058), OpenClaw (#157989), DeepSeek Harness (rc.1)。
    *   *具体诉求*：实现插件更新的原子性回滚、防止高危命令绕过沙箱、优化插件加载对磁盘 I/O 的消耗。

### 5. 差异化定位分析
*   **功能侧重**：
    *   **OpenClaw/hermes-agent**：全功能平台型，涵盖语音、多端、通用工具链。
    *   **Zeroclaw**：侧重安全网关与运行时解耦，强调“最小化信任边界”。
    *   **QwenPaw**：侧重 IM 通道集成（DingTalk 等）与轻量化交互。
    *   **DeepSeek Harness**：侧重 IDE/开发环境集成与原生模型适配。
*   **目标用户**：
    *   **OpenClaw/Zeroclaw**：专业开发者与极客用户，部署在本地高性能硬件。
    *   **AstrBot/QwenPaw**：普通 IM 用户与企业微信/钉钉用户，强调易用性与即开即用。
    *   **DeepSeek Harness**：AI 开发者与研究人员，追求代码辅助与智能体编排。
*   **技术架构**：
    *   OpenClaw 采用中心 Gateway 控制多端；Zeroclaw 采用 Runtime/Gateway 分离微服务架构；DeepSeek Harness 采用无 PR 机制的 Releases 驱动模型。

### 6. 社区热度与成熟度
*   **快速迭代与重构阶段**：
    *   **OpenClaw, hermes-agent, Zeroclaw**：社区极其活跃，代码变更频繁，但处于“高压力”状态，大量精力用于清理前期快速扩张留下的技术债务（Crash-loops, Security bypasses）。
*   **质量巩固与稳定阶段**：
    *   **AstrBot**：通过 v4.29.1 修复了关键阻断性问题，社区反馈集中在体验优化（WebUI、搜索），整体最成熟稳定。
    *   **QwenPaw**：进入高频打补丁期，试图稳定 v2.2.2 版本，为 v2.3.0 的插件重构做准备。
*   **边缘维护/停滞阶段**：
    *   **PicoClaw**：处于休眠状态，仅执行自动化的 Stale 清理，缺乏实质开发动力。

### 7. 值得关注的趋势信号
1.  **“静默失败”治理成为核心痛点**：多个项目（OpenClaw #157989, QwenPaw #8278, DeepSeek #9924）用户强烈要求系统在降级或出错时提供明确的反馈机制，拒绝“黑盒”行为。
2.  **硬件资源消耗敏感化**：SSD 磨损（OpenClaw）和内存泄漏（QwenPaw）成为长期部署用户的最高优先级投诉，AI 助手正从“算力换体验”向“资源效率优先”转变。
3.  **跨平台原生支持加速**：Windows 沙箱稳定性（DeepSeek, QwenPaw）和 Linux 支持（DeepSeek）成为社区分裂点，各平台的原生适配质量直接影响项目口碑。
4.  **对 AI 智能体开发者的参考**：在构建类似系统时，应尽早引入**异步事件循环隔离**、**状态数据库的 WAL 检查点机制**以及**插件沙箱的资源配额限制**，以避免陷入类似 OpenClaw 和 hermes-agent 当前的稳定性泥潭。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 (2026-10-18)

## 1. 今日速览
过去24小时内，Zeroclaw 社区保持高活跃度，共有 **49** 条 Issue 更新和 **50** 条 PR 更新，其中绝大多数（49个PR）处于待合并状态，显示研发管线堆积量较高。项目重点正在推进 v0.8.6 和 v0.9.0 的运行时网关分离及插件安全加固，尤其是 Windows 平台稳定性与安全策略修复。今日无新版本发布，但针对安全漏洞（如高危命令绕过）和核心功能（如插件更新回滚）的修复 PR 正在加速推进。

## 2. 版本发布
*今日无新版本发布。*

## 3. 项目进展
*注：过去24小时内仅 1 个 PR 标记为已合并/关闭，以下列出该关键进展：*

*   **[CLOSED] feat(cli): add zeroclaw plugin update with verified replacement** ([#11262](https://github.com/zeroclaw-labs/zeroclaw/pull/11262))
    *   **进展说明**：该 PR 实现了带校验的插件更新及失败回滚机制。它解决了 Issue [#10995](https://github.com/zeroclaw-labs/zeroclaw/issues/10995) 中关于缺乏显式更新/回滚契约的问题。
    *   **意义**：此举标志着插件系统从“安装/移除”迈向全生命周期管理，增强了生产环境的安全性，确保更新失败时可恢复至稳定状态。

## 4. 社区热点
今日讨论最活跃的核心议题集中在 **v0.8.6/v0.9.0 的运行时与网关架构演进** 以及 **插件生态安全**：

1.  **[Tracker]: Runtime and gateway delivery - v0.8.6 and v0.9.0** ([#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432))
    *   **热度**：10 评论 | **状态**：OPEN
    *   **分析**：作为 RFC #5574 的源真相，该 Issue 追踪 Phase 2 (Runtime) 和 Phase 3 (Gateway) 的交付缺口。社区正紧密关注如何将运行时依赖解耦，以便嵌入自定义能力。
2.  **[Bug]: "Copy" one-click feature is not working** ([#11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418))
    *   **热度**：5 评论 | **状态**：OPEN
    *   **分析**：用户反馈 TUI 中“一键复制”功能失效，导致工作流阻塞 (S1)。这表明 UI/UX 细节在快速迭代中被低估，用户期望基础交互的稳定性。
3.  **[Task]: Publish and prove Discord plugin installation from a release binary** ([#10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999))
    *   **热度**：4 评论 | **状态**：OPEN (Blocked)
    *   **分析**：随着 WASM 插件宿主在发布产物中的集成（见 PR [#11347](https://github.com/zeroclaw-labs/zeroclaw/pull/11347)），社区正在验证端到端的 Discord 插件安装流程，旨在证明从发布二进制到频道实例配置的可行性。

## 5. Bug 与稳定性
今日新发现或更新的 Bug 按严重程度排列，多数已有对应的修复 PR 在排队中：

*   **S0 (数据丢失/安全风险)**
    *   **高危命令绕过** ([#11058](https://github.com/zeroclaw-labs/zeroclaw/issues/11058))：当 `allowed_commands` 中包含高危命令时，`block_high_risk_commands` 被豁免，导致无审批执行。*修复中* (相关安全 PR [#11822](https://github.com/zeroclaw-labs/zeroclaw/pull/11822) 正在优化命令解析边界)。
    *   **Daemon 启动阻塞** ([#11796](https://github.com/zeroclaw-labs/zeroclaw/issues/11796))：Daemon 在启动时突然提示输入 GitHub 凭据并阻塞，疑似回归问题。*暂无明确 Fix PR 链接，需关注 Daemon 身份验证逻辑*。
*   **S1 (工作流阻塞)**
    *   **循环检测阈值过低** ([#11777](https://github.com/zeroclaw-labs/zeroclaw/issues/11777))：`file_write` 和 `shell` 交替执行 6 次即触发熔断，导致复杂任务无法执行。*修复中* (PR [#11507](https://github.com/zeroclaw-labs/zeroclaw/pull/11507) 旨在限定重复失败并保留已完成工作)。
    *   **Windows 桌面应用无法重启/退出** ([#11087](https://github.com/zeroclaw-labs/zeroclaw/issues/11087))：关闭窗口后进程残留，无法重新打开或退出。*修复中* (PR [#11802](https://github.com/zeroclaw-labs/zeroclaw/pull/11802) 和 [#11827](https://github.com/zeroclaw-labs/zeroclaw/pull/11827) 分别处理窗口关闭行为及进程树管理)。
*   **S2 (功能降级)**
    *   **多模态视觉路由粘滞** ([#11706](https://github.com/zeroclaw-labs/zeroclaw/issues/11706))：`max_image_turns` 后视觉模型仍被锁定，文本后续轮次误用视觉模型。*已修复* (PR [#11716](https://github.com/zeroclaw-labs/zeroclaw/pull/11716) 待合并)。
    *   **Skill 审核工具不可见** ([#11333](https://github.com/zeroclaw-labs/zeroclaw/issues/11333))：通过 `skill_bundles` 分配的技能在审核 fork 中不可见。

## 6. 功能请求与路线图信号
基于 PR 标签及 Issue 趋势，以下功能可能纳入 v0.8.7 或 v0.9.0：

*   **运行时组合边界完善** ([#10993](https://github.com/zeroclaw-labs/zeroclaw/issues/10993))：允许 Agent 运行时嵌入显式提供的能力，减少对 `zeroclaw-tools` 的具体依赖，这是架构重构的关键一步。
*   **最小化内置工具集** ([#11221](https://github.com/zeroclaw-labs/zeroclaw/pull/11221))：通过 `[tools].optional` 配置实现优入的最小工具集，满足轻量化部署需求。
*   **WASM 插件宿主发布** ([#11347](https://github.com/zeroclaw-labs/zeroclaw/pull/11347))：在受支持的发布产物中集成 WASM 插件宿主，包括 Discord 插件文档 ([#11329](https://github.com/zeroclaw-labs/zeroclaw/pull/11329))。
*   **数据目录权限加固** ([#11793](https://github.com/zeroclaw-labs/zeroclaw/issues/11793))：创建仅限所有者写入的数据目录，并检测组/世界可写的风险。

## 7. 用户反馈摘要
*   **痛点：UI/UX 基础交互失效**：TUI 复制功能失效 ([#11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418)) 引发用户强烈不满，认为这是 S1 级别的工作流阻塞。
*   **痛点：安全性透明度不足**：用户发现配置允许列表会导致高危命令绕过安全策略 ([#11058](https://github.com/zeroclaw-labs/zeroclaw/issues/11058))，且 `sop` 配置中的并发限制未被文档记录 ([#9902](https://github.com/zeroclaw-labs/zeroclaw/issues/9902))，导致不可预见的行为。
*   **场景：多模态混合对话**：用户在长对话中混合图像和文本时，发现模型路由逻辑不符合预期 ([#11706](https://github.com/zeroclaw-labs/zeroclaw/issues/11706))，期望“无图则回退主模型”的自动行为。
*   **场景：Windows 桌面体验**：用户在 Windows 上遇到进程残留和无法退出的问题 ([#11087](https://github.com/zeroclaw-labs/zeroclaw/issues/11087))，表明跨平台桌面应用的资源管理需加强。

## 8. 待处理积压
*   **PR 积压严重**：50 个 PR 更新中，**49 个处于待合并状态**。其中多个 XL 级 PR（如 [#11221](https://github.com/zeroclaw-labs/zeroclaw/pull/11221), [#11347](https://github.com/zeroclaw-labs/zeroclaw/pull/11347), [#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391)）依赖复杂，合并顺序对 CI 和后续开发影响重大。建议维护者优先梳理依赖链，特别是涉及 `master` 同步和堆叠 PR 的部分。
*   **长期停滞 Issue**：[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) 作为 Tracker 已开放数月，涉及 v0.8.6/v0.9.0 核心架构，需定期审视进度以确保发布计划不偏离。
*   **被阻塞任务**：[#10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999) 等插件发布验证任务标记为 `blocked`，依赖于前序 PR 的合并及发布管线的就绪状态。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 (2026-10-18)

## 1. 项目今日速览
过去24小时内，PicoClaw 项目处于**低活跃维护状态**。系统主要处理了存量 Issue 和 PR 的生命周期管理，新发起的开发活动与用户需求征集均为 0。期间关闭了 1 个长期挂起（stale）的 Issue 和 1 个未合并的 PR，表明维护者正在清理代码库中的休眠功能请求与未成熟代码。没有发布任何新版本，项目整体向前推进的实质性工作量暂不明显，重心偏向于社区治理与积压清理。

## 2. 版本发布
*(今日无新版本发布，本部分省略)*

## 3. 项目进展
今日没有合并任何 Pull Request。被关闭的 PR 均为长期未响应导致的自动 Stale 清除，并非项目功能迭代的常规进展。
*   **#3414 [CLOSED] feat(agent): add wall-clock turn time budget** ([查看 PR](https://github.com/sipeed/picoclaw/pull/3414))：该 PR 提议为 Agent 增加可选的单轮执行时间预算（`turn_time_budget_seconds`），以防止 Agent 陷入无限循环。由于长期未获响应和审查，该 PR 今日被系统标记为 Stale 并关闭。这表明该功能在当前维护优先级中未能实现。

## 4. 社区热点
今日讨论热度集中在 1 个被处理的 Issue 上。
*   **#3415 [CLOSED] [stale] [Feature] 能不能支持反向代理...** ([查看 Issue](https://github.com/sipeed/picoclaw/issues/3415))
    *   **用户诉求分析**：用户 `@altman08` 强烈希望 PicoClaw Web Console 支持通过 Nginx 反向代理挂载到自定义子路径（如 `https://example.com/pico/`）下，以避免占用网站根路径。用户指出当前前端和后端地址硬编码了根路径（如 `/api/...`、`/pico/ws`），导致单靠 Nginx 配置路径转发无法完整支持登录、API、WebSocket 及附件请求。该诉求反映出部分用户对服务部署的灵活性有较高要求，希望项目提供基于基路径的启动参数配置能力。该 Issue 因长期未得到核心开发人员的实质性回应或实现，今日被自动标记为 Stale 并关闭。

## 5. Bug 与稳定性
今日未发现新报告的 Bug、崩溃或回归问题。

## 6. 功能请求与路线图信号
从今日关闭的 Issue 和 PR 中，我们可以捕捉到用户期待但项目可能面临取舍的需求：
*   **部署灵活性 (反向代理/基路径支持)**：根据 [Issue #3415](https://github.com/sipeed/picoclaw/issues/3415)，用户期望通过启动参数（而非纯外部 Nginx 配置）来改变 Web 服务的路径前缀。此功能被自动 Stale 关闭，暗示在近期路线图（Roadmap）中，实现路径前缀支持的优先级不高或未被接纳。
*   **Agent 执行控制 (防死循环时间预算)**：根据 [PR #3414](https://github.com/sipeed/picoclaw/pull/3414)，社区开发者提议为 Agent 增加按轮次的执行时间限制（`turn_time_budget_seconds`）以保障系统稳定性。该 PR 被 Stale 关闭，表明该稳定性优化在当前版本开发中未被纳入，未来能否实现需关注后续版本更新说明。

## 7. 用户反馈摘要
基于今日处理的 Issue #3415：
*   **用户痛点**：用户希望将 PicoClaw 集成到现有的网站域名中，且希望服务路径可配置。
*   **使用场景**：通过 Nginx 将 PicoClaw 部署在类似 `/pico/` 的非根路径下。
*   **具体限制反馈**：用户指出当前架构的局限性，即前端和后端硬编码了相对根路径的 API 和 WebSocket 地址（如 `/api/...` 和 `/pico/ws`），导致用户侧无法仅靠 Nginx 反向代理配置（路径转发）完美拦截和改写所有必要的子请求。

## 8. 待处理积压
*(今日处理的条目均已作为 Stale 关闭，不存在长期未响应的重要积压，本部分省略)*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期**：2026-10-18

## 1. 今日速览
今日项目社区活跃度较高，过去24小时内新增9条Issues和15条PR更新，核心围绕 v2.2.2 版本的稳定性修复与功能增强。
开发资源正密集投入于解决**媒体通道处理（音频/视频）导致的会话锁死（Wedge）问题**、**长文本通道降级失效**以及**UI交互细节**等高频Bug。
虽然今日无新版本发布，但针对 v2.2.2 暴露的后端崩溃、前端卡顿及状态未清空等严重回归问题，已有多个针对性 PR 进入待合并或评审状态，项目处于高强度的补丁修复期。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日合并/关闭的重要 PR 极少（仅 1 条），整体推进主要集中在代码评审阶段：
*   **修复 Creator 探针异常**：PR [\[Close-and-review-later\] fix(creator): treat SystemError from the stale-pid probe as 'peer not alive' (#8194)](https://github.com/agentscope-ai/QwenPaw/pull/8296) 被关闭，修复了 Windows 下探测失效 PID 导致 SystemError 的问题。
*   **大量待合并修复**：团队及贡献者正在积极处理 v2.2.2 遗留的媒体解析、内存管理、Provider 路由等核心逻辑缺陷（详见“Bug 与稳定性”部分）。

## 4. 社区热点
今日讨论最活跃、痛点最集中的功能模块为 **多模态媒体处理** 与 **通道消息渲染**：
*   **媒体处理引发的会话永久锁死（Wedge）**：Issues [#8171](https://github.com/agentscope-ai/QwenPaw/issues/8171)（音频）、[#8298](https://github.com/agentscope-ai/QwenPaw/issues/8298)（视频）、[#8290](https://github.com/agentscope-ai/QwenPaw/issues/8290) 持续发酵。
    *   *分析*：当 `send_file_to_user` 发送本地音频/视频后，工具结果在历史会话中保留了多媒体 DataBlock。若后续使用的 LLM（如 LM Studio、DeepSeek）不支持该模态，框架的 media-capability classifier 未能识别特定拒绝错误码（如 `400 At most 0 audio(s)` 或 `422 unknown variant`），导致**整个会话被永久卡死**，无法再进行纯文本交流。
*   **DingTalk 通道静默降级 Bug**：Issue [#8278](https://github.com/agentscope-ai/QwenPaw/issues/8278) 引起关注。
    *   *分析*：当回复超过 3500 字符时，钉钉通道静默降级为纯文本，导致 Markdown 和 GFM 表格格式全部失效。用户对“静默失败”的不可控性表示担忧，强烈要求复用 `split_text` 分片以保障长数据报表类场景的可用性。

## 5. Bug 与稳定性
今日报告的 Bug 严重度较高，主要集中在 v2.2.2 版本的性能回归与异常未捕获处理：

**严重程度：P0（严重影响可用性/崩溃）**
1.  **UI 严重卡顿与后端 SIGBUS 崩溃**：Issue [#8288](https://github.com/agentscope-ai/QwenPaw/issues/8288)。
    *   *现象*：v2.2.2 版本中，切换到一个生成过超大流式输出的对话时，UI 会冻结极长时间甚至引发后端 SIGBUS 崩溃（v2.2.1 未受影响）。*暂无直接对应的 Fix PR，亟待排查大对象内存管理机制。*
2.  **控制台发送后输入框残留**：Issue [#8300](https://github.com/agentscope-ai/QwenPaw/issues/8300)。
    *   *现象*：点击发送后消息正常流转，但输入框未清空（依赖会话活跃状态的 clear 逻辑失效）。*暂无对应 Fix PR。*

**严重程度：P1（核心功能异常/死锁）**
3.  **多媒体会话锁死**：Issues [#8171](https://github.com/agentscope-ai/QwenPaw/issues/8171)、[#8298](https://github.com/agentscope-ai/QwenPaw/issues/8298)、[#8290](https://github.com/agentscope-ai/QwenPaw/issues/8290)。
    *   *修复进展*：已有多个 PR 试图修复，如 [PR #8299](https://github.com/agentscope-ai/QwenPaw/pull/8299)（停止向无视频支持的端点发送 video parts）、[PR #8215](https://github.com/agentscope-ai/QwenPaw/pull/8215)（识别 LM Studio 音频拒绝）、[PR #7654](https://github.com/agentscope-ai/QwenPaw/pull/7654)（识别更多拒绝形状）。
4.  **系统注入上下文被错误下发给终端用户**：Issue [#8293](https://github.com/agentscope-ai/QwenPaw/issues/8293)。
    *   *修复进展*：[PR #8295](https://github.com/agentscope-ai/QwenPaw/pull/8295) 正在修复，将在显示边界隐藏注入的 `<system-notification>` 等控制块。

**严重程度：P2（UI 体验/UI 缺陷）**
5.  **思考强度滑块显示错误**：Issue [#8286](https://github.com/agentscope-ai/QwenPaw/issues/8286)。
    *   *修复进展*：[PR #8287](https://github.com/agentscope-ai/QwenPaw/pull/8287) 正在修复轨道填充误导及保存时闪烁的问题。

## 6. 功能请求与路线图信号
*   **v2.3.0 核心主题预告**：Issue [#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289) 公布了 v2.3.0 的路线图——**使 QwenPaw 变得更轻量、更具扩展性（Lighter and More Extensible）**，主要通过**插件重构（Plugin Refactor）**实现。
*   **HarmonyOS 原生客户端探索**：PR [#8164](https://github.com/agentscope-ai/QwenPaw/pull/8164) 提交了一个基于 ArkUI/ArkTS 的 HarmonyOS 原生客户端探索，展示了项目跨端（非 Webview）扩展的趋势。
*   **插件市场安装溯源修复**：PR [#8231](https://github.com/agentscope-ai/QwenPaw/pull/8231) 修复了控制台“一键更新”无法覆盖第三方市场插件的问题，暗示插件生态的运维能力正在完善。

## 7. 用户反馈摘要
从近期 Issue 的摘要与评论中，可以提炼出以下真实痛点：
*   **多模态交互的脆弱性**：用户在使用音频、视频文件时，一旦后端切换或使用了受限的本地模型（如 LM Studio/DeepSeek），极易陷入“会话卡死且无法通过纯文本解除”的恶性死锁。
*   **对静默降级的反感**：在钉钉等 IM 通道中，当内容超长导致格式丢失时，系统“不报警、不提示”的行为让使用者感到被剥夺了控制感。
*   **对大流式输出的性能焦虑**：长文本生成后，再次载入或切换对话时出现的长时阻塞甚至崩溃，严重影响了长文档处理场景的用户体验。

## 8. 待处理积压
*   **PR #7211**：[fix(runtime): prevent injected context from persisting](https://github.com/agentscope-ai/QwenPaw/pull/7211) 自 8 月下旬发起，目前标记为 `ready-for-human-review`。此 PR 旨在防止请求局部的上下文被持久化为对话历史，涉及底层 Runtime 机制，因积压时间较长且影响面广，建议维护者优先介入 Review。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

**hermes-agent 项目动态日报 (2026-10-18)**

### 1. 今日速览
过去 24 小时，hermes-agent 项目保持极高的社区活跃度，Issues 和 Pull Requests 均出现大量更新（各约 500 条动态），其中 93 个 PR 完成合并或关闭，337 个 Issue 被关闭，显示团队正在快速消化技术债务。核心工作集中在解决 10 月 14 日合并的“统一 Gateway 运行时”（PR #106742）后的遗留兼容性问题，以及修复多平台（Telegram、Docker、Windows）下的会话状态管理漏洞。尽管今日无新版本发布，但大量针对稳定性、权限管理和性能优化的 PR 处于待合并或修复状态，表明项目正处于高强度的迭代与重构期。

### 2. 版本发布
*无新版本发布。*

### 3. 项目进展
今日进展主要体现为对大规模架构变更的收尾与核心机制的稳定性加固。
*   **统一 Gateway 运行时修复**：针对 10 月 14 日合并的 PR #106742，团队正在集中修复由此引发的本地会话管理回归。PR #140787 修复了会话 ID 退役逻辑中的错误，防止了“修剪”（prune）操作被误判为永久删除，并确保了退役操作按 profile 键值化。
*   **会话状态隔离修复**：PR #136530 解决了共享 profile 的多个 Hermes 进程（CLI、TUI、Gateway、Cron）在写入 `processes.json` 时相互覆盖后台作业的问题，确保了多会话环境下的数据完整性。
*   **终端与文件操作优化**：PR #140790 允许通过 `config.yaml` 设置终端前台超时限制，解决了多路复用 Gateway 进程强制锁定配置文件值的问题；PR #140743 修复了 Gateway 轮次间文件写入基线丢失的问题，增强了 `write_file` 工具的安全性。
*   **插件与 Hook 机制**：PR #129158 修复了并行子代理启动时仅第一个子代理触发 `on_session_start` 插件钩子的 Bug，提升了插件系统的可靠性。

### 4. 社区热点
今日讨论最活跃的议题集中在多平台兼容性、API 权限问题以及 Gateway 架构调整后的影响。

*   **Issue #134889 [OPEN] P0: 统一 Gateway 运行时后续修复追踪**
    *   链接: https://github.com/NousResearch/hermes-agent/issues/134889
    *   状态: OPEN, P0, 172 条评论
    *   分析: 这是今日最关键的追踪 Issue。由于 PR #106742 引入了“单一 Gateway 拥有所有本地会话”的架构，大量现有的 CLI、Desktop、Cron 组件出现状态冲突。社区正在紧急验证各端点（Telegram、Discord、MacOS/Windows）在新架构下的兼容性。
*   **Issue #131859 [OPEN] P3: API 创建 PR 权限错误**
    *   链接: https://github.com/NousResearch/hermes-agent/issues/131859
    *   状态: OPEN, P3, 43 条评论
    *   分析: 特定用户反映 Fork 后无法通过 API 创建 PR，疑似与仓库的 `CreatePullRequest` 权限或账户配置有关，影响了部分开发者的贡献流程。
*   **Issue #32892 [CLOSED] P3: OpenAI Codex Provider 报错**
    *   链接: https://github.com/NousResearch/hermes-agent/issues/32892
    *   状态: CLOSED, 38 条评论, 55 个点赞
    *   分析: 虽然已关闭，但大量用户反映了 Hermes 无法通过 ChatGPT 集成工作，报错 `'NoneType' object is not iterable`。这反映了 OpenAI Codex 后端返回格式变化对 Hermes 的冲击，目前相关修复 PR 应已合并。
*   **Issue #136567 [OPEN] P2: Telegram DM Topics 线程丢失**
    *   链接: https://github.com/NousResearch/hermes-agent/issues/136567
    *   状态: OPEN, P2, 31 条评论
    *   分析: Telegram 线程功能中，新话题的开启消息未被正确标记 `message_thread_id`，导致消息被错误路由到上一个话题。这是 Gateway 在特定平台下会话状态管理的一个典型缺陷。

### 5. Bug 与稳定性
今日报告的 Bug 主要集中在会话状态管理、插件加载和平台兼容性上，多个 P0/P1 级问题正在处理中。

*   **[P0] 统一 Gateway 架构下的会话状态回归**
    *   描述: 多个本地会话在 Gateway 迁移后出现状态冲突，导致消息投递失败或会话被意外清除。
    *   状态: 已有修复 PR（#140787, #140741）正在进行。
    *   链接: https://github.com/NousResearch/hermes-agent/issues/134889
*   **[P2] 插件启动时静默失败**
    *   描述: 由于 `sys.modules` 在迭代过程中被修改，导致插件在启动时随机静默丢失，用户无法感知错误。
    *   状态: OPEN，尚无对应 Fix PR。
    *   链接: https://github.com/NousResearch/hermes-agent/issues/123926
*   **[P2] Telegram 线程消息路由错误**
    *   描述: 新创建的 Telegram 话题中，第一条消息缺少线程 ID，导致消息被错误地归类到之前的话题。
    *   状态: OPEN，尚无对应 Fix PR。
    *   链接: https://github.com/NousResearch/hermes-agent/issues/136567
*   **[P2] 浏览器执行后残留守护进程**
    *   描述: `browser_exec` 调用完成后，`browser_harness.daemon` 进程未自动关闭，导致僵尸进程堆积。
    *   状态: OPEN，尚无对应 Fix PR。
    *   链接: https://github.com/NousResearch/hermes-agent/issues/121095
*   **[P1] 矩阵/Synapse 在官方 Docker 镜像中损坏**
    *   描述: 官方 Docker 镜像中的 Matrix/Synapse Gateway 无法启动，日志卡在权限修复阶段。
    *   状态: CLOSED（标记为已解决或重复，但需确认新镜像是否修复）。
    *   链接: https://github.com/NousResearch/hermes-agent/issues/25495

### 6. 功能请求与路线图信号
用户提出的新功能请求正在通过 PR 逐步落地，其中性能优化和平台支持是重点。

*   **工具 Schema 懒加载（性能优化）**
    *   描述: 用户请求通过两阶段工具注入来减少 API 调用的 Token 开销，避免每次调用都注入所有 50+ 工具的全量 Schema。
    *   状态: 已有讨论，标记为 P2 功能请求，可能影响未来版本的默认行为。
    *   链接: https://github.com/NousResearch/hermes-agent/issues/6839
*   **多代理 Discord 协作**
    *   描述: 用户希望在共享的 Discord 频道中，多个 Hermes 实例能够互相查看消息并协作，防止级联响应。
    *   状态: OPEN，P3 功能请求，尚无 PR。
    *   链接: https://github.com/NousResearch/hermes-agent/issues/14853
*   **原生 Windows 支持**
    *   描述: 用户希望摆脱对 WSL2 的依赖，实现原生 Windows 支持。
    *   状态: CLOSED（标记为已在 main 分支实现或标记为 Duplicate，需确认具体状态）。
    *   链接: https://github.com/NousResearch/hermes-agent/issues/10359
*   **技能/配置漂移检查**
    *   描述: 在 `hermes update` 后，提供原生钩子以检测本地技能或 Profile 与上游默认值的漂移。
    *   状态: OPEN，P3 功能请求，尚无 PR。
    *   链接: https://github.com/NousResearch/hermes-agent/issues/33314

### 7. 用户反馈摘要
*   **痛点**: 用户强烈抱怨 OpenAI Codex 集成不稳定，频繁出现 `'NoneType'` 错误，影响日常使用（Issue #32892, #33237）。
*   **痛点**: Docker 部署用户体验差，包括权限问题（EACCES）、配置失效和特定 Gateway（Matrix）损坏（Issue #23402, #25495, #15290）。
*   **不满**: 插件静默失败和浏览器进程残留导致系统资源浪费和调试困难（Issue #123926, #121095）。
*   **诉求**: 用户期望更清晰的错误报告和更稳定的会话管理，尤其是在多平台（Telegram/Discord）和多代理场景下。

### 8. 待处理积压
*   **Issue #107402 [OPEN] P2**: `hermes update` 在 Gateway 中执行后，留下“未重启运行中的 Gateway”的永久性警告，状态为 `partial`。影响用户体验，需改进更新流程的状态管理。
    *   链接: https://github.com/NousResearch/hermes-agent/issues/107402
*   **Issue #99988 [OPEN] P2**: Cron 任务失败总结器错误地将非认证错误标记为“提供商认证错误”，原因是正则表达式匹配了嵌入的负载文本。影响故障排查的准确性。
    *   链接: https://github.com/NousResearch/hermes-agent/issues/99988
*   **PR #104567 [OPEN] P3**: 通用会话执行目标、Hook 身份和 Desktop 会话查看器。这是一个较大的功能 PR，涉及多个组件，可能需要进一步的设计评审或拆分。
    *   链接: https://github.com/NousResearch/hermes-agent/pull/104567
*   **PR #126595 [OPEN] P3**: 修复命令审批时触发多个危险模式的情况。当前逻辑在第一个模式匹配后即停止，可能导致后续危险命令未获审批。安全风险需优先关注。
    *   链接: https://github.com/NousResearch/hermes-agent/pull/126595

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

**AstrBot 项目动态日报 (2026-10-18)**

**今日速览**
AstrBot 在 v4.29.1 发布后，社区活跃度维持高位，过去 24 小时内处理了 20 个 Issues 和 26 个 PR，其中 12 个 Issues 和 8 个 PR 完成状态变更。版本重点增强了网页搜索能力（新增 SerpApi 与 DeepSeek 支持）并修复了 Edge TTS 及 Skill 管理的关键阻断性问题。项目稳定性显著提升，核心组件如知识库检索和插件导入机制正在经历一系列由资深贡献者发起的修复。WebUI 体验持续优化，插件配置可视化与日志交互成为近期改进焦点。

**版本发布**
**v4.29.1** (发布于 2026-10-17)
- **新增功能**：
  - 网页搜索能力扩展：集成 [SerpApi](https://github.com/AstrBotDevs/AstrBot/pull/10601)（支持 Google 网页、图片、学术、财经搜索）与 [DeepSeek 搜索服务](https://github.com/AstrBotDevs/AstrBot/pull/10601)（网页搜索与内容提取）。
  - 插件开发：为插件配置项的 `list` 类型新增本地化 `subtitles` 副标题元数据支持。
- **关键修复**：
  - **Edge TTS 修复**：[PR #10588](https://github.com/AstrBotDevs/AstrBot/pull/10588) 修复了模块级 User-Agent 覆写破坏 `Sec-MS-GEC` 签名导致的 HTTP 403 错误，恢复语音合成服务可用性。
  - **Skill 稳定性**：[PR #10591](https://github.com/AstrBotDevs/AstrBot/pull/10591) 修复了单个 Skill 目录读取失败（如权限问题）导致整个 Agent/LLM 请求阻断的问题。
- **迁移注意事项**：无破坏性变更。建议用户升级以获取更稳定的 TTS 服务和增强的搜索能力。

**项目进展**
- **知识库检索修复**：[PR #10263](https://github.com/AstrBotDevs/AstrBot/pull/10263)、[#10292](https://github.com/AstrBotDevs/AstrBot/pull/10292) 及 [#9485](https://github.com/AstrBotDevs/AstrBot/pull/9485) 解决了 Provider 重载后 Rerank/Embedding 缓存失效及 WebUI 参数解析错误，确保知识库在动态配置下的可靠性。
- **插件系统强化**：[PR #9900](https://github.com/AstrBotDevs/AstrBot/pull/9900) 实现了插件导入的回滚安全机制，防止依赖缺失重试导致的注册表污染；[PR #10424](https://github.com/AstrBotDevs/AstrBot/pull/10424) 优化了备份导出，避免大文件 ZIP 压缩阻塞事件循环。
- **功能扩展**：[PR #10202](https://github.com/AstrBotDevs/AstrBot/pull/10202) 引入原生视频输入模态支持；[PR #10435](https://github.com/AstrBotDevs/AstrBot/pull/10435) 支持未来任务向多个会话投递；[PR #10596](https://github.com/AstrBotDevs/AstrBot/pull/10596) 为插件文件配置增加了图片预览功能。

**社区热点**
1. **[Feature] 增加视频输入支持 (#8048)**
   - 链接: https://github.com/AstrBotDevs/AstrBot/issues/8048
   - 分析：用户期望多模态模型能直接理解视频内容而非仅处理文件。尽管 [PR #10202](https://github.com/AstrBotDevs/AstrBot/pull/10202) 正在推进此功能，但用户反馈沙盒处理效果不佳，诉求强烈。
2. **[Bug] Local text-to-image fallback violates contract (#10388)**
   - 链接: https://github.com/AstrBotDevs/AstrBot/issues/10388
   - 分析：远程 T2I 失败时回退到本地渲染返回文件路径而非 URL，违反 `return_url=True` 契约。这影响了依赖 URL 的下游逻辑，属于 API 行为一致性 Bug。
3. **[Feature] 恢复无沙箱平台工作区文件访问 (#10326)**
   - 链接: https://github.com/AstrBotDevs/AstrBot/issues/10326
   - 分析：Windows 等平台在无沙箱环境下，普通成员无法读写工作区文件，退化了早期功能。用户呼吁恢复“仅文件访问”权限并优化界面说明。
4. **[Bug] Web UI 日志界面全屏交互 Bug (#10603)**
   - 链接: https://github.com/AstrBotDevs/AstrBot/issues/10603
   - 分析：全屏状态下点击“安装 Pip 库”弹窗失效，影响运维操作效率，属于 WebUI 前端交互细节问题。

**Bug 与稳定性**
按严重程度排列：
1. **严重 (P1)**: Gemini API 工具调用丢失思考签名 ([#9217](https://github.com/AstrBotDevs/AstrBot/issues/9217))。已标记 P1，暂无新 Fix PR，需重点关注 Gemini 提供商兼容性。
2. **高**: Gemini 4/3.8 思考等级配置未应用或校验缺失 ([#10586](https://github.com/AstrBotDevs/AstrBot/issues/10586))。已关闭，推测已在 v4.29.1 或近期提交中修复。
3. **高**: Edge TTS 全量 403 错误 ([#10585](https://github.com/AstrBotDevs/AstrBot/issues/10585))。已通过 [PR #10588](https://github.com/AstrBotDevs/AstrBot/pull/10588) 修复并合并。
4. **中**: 单个 Skill 失败阻断整个请求 ([#10589](https://github.com/AstrBotDevs/AstrBot/issues/10589))。已通过 [PR #10591](https://github.com/AstrBotDevs/AstrBot/pull/10591) 修复。
5. **中**: 日志字体无法增加 ([#10600](https://github.com/AstrBotDevs/AstrBot/issues/10600))。UI 细节 Bug，已关闭。

**功能请求与路线图信号**
- **网页搜索多元化**：SerpApi、DeepSeek 已并入 v4.29.1。Keenable ([PR #10548](https://github.com/AstrBotDevs/AstrBot/pull/10548)) 和 Serply ([PR #9838](https://github.com/AstrBotDevs/AstrBot/pull/9838)) 正在合并中，显示项目致力于提供丰富的搜索引擎选择。
- **插件管理增强**：用户频繁请求按群覆盖配置 ([#10350](https://github.com/AstrBotDevs/AstrBot/issues/10350), [#10606](https://github.com/AstrBotDevs/AstrBot/issues/10606)) 和拖拽排序 ([#10594](https://github.com/AstrBotDevs/AstrBot/issues/10594))。虽未有直接 PR，但 WebUI 正在向精细化配置演进。
- **国际化**：贡献者行为准则中文版 ([#10578](https://github.com/AstrBotDevs/AstrBot/issues/10578)) 已通过 [PR #10580](https://github.com/AstrBotDevs/AstrBot/pull/10580) 合并，多语言支持（如 README 切换 [#10593](https://github.com/AstrBotDevs/AstrBot/issues/10593)）是后续方向。

**用户反馈摘要**
- **痛点**：容器环境（如雨云）下 Local 模式权限受限 ([#10583](https://github.com/AstrBotDevs/AstrBot/issues/10583))，用户期望更清晰的文档或替代方案。Skill 权限管理复杂 ([#10590](https://github.com/AstrBotDevs/AstrBot/issues/10590))，用户希望自动化处理 ACL。
- **满意点**：v4.29.1 快速修复了 TTS 阻断性问题，社区响应迅速。WebUI 日志界面的改进（如字体控制、插件日志关联 [#10509](https://github.com/AstrBotDevs/AstrBot/issues/10509)）提升了排查问题的便利性。
- **场景**：多群消息分发、知识库动态配置、多模态媒体处理（视频/音频）是高频使用场景，用户期望更原生的支持而非沙盒 workaround。

**待处理积压**
- **Gemini 兼容性**：[#9217](https://github.com/AstrBotDevs/AstrBot/issues/9217) (P1) 和 [#9217](https://github.com/AstrBotDevs/AstrBot/issues/9217) 关联的思考配置问题需持续跟进，避免 Gemini 用户流失。
- **长期 PR**：Discord 命令组注册 ([#9445](https://github.com/AstrBotDevs/AstrBot/pull/9445)) 和平台命令刷新 ([#9685](https://github.com/AstrBotDevs/AstrBot/pull/9685)) 由同一贡献者维护，涉及多平台适配，需确保合并以支持 Discord 用户。
- **视频支持**：[#8048](https://github.com/AstrBotDevs/AstrBot/issues/8048) 创建较早，虽有 [PR #10202](https://github.com/AstrBotDevs/AstrBot/pull/10202) 推进，但需测试验证是否满足用户对“非沙盒处理”的期望。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期**：2026-10-18
**数据范围**：过去 24 小时

## 1. 今日速览
DeepSeek Harness 过去 24 小时发布了 **2 个 RC 候选版本**（v0.2.1-rc.1 与 v0.2.1-rc.2），项目处于高频迭代期。社区 Discussions 活跃度极高，单日更新 **236 条**，核心讨论集中在 Windows 沙箱崩溃、Linux 平台支持缺失及桌面端认证故障。v0.2.1-rc.2 重点适配了 DeepSeek-V4.1-Flash-1017 模型与搜索 API，v0.2.1-rc.1 则大幅强化了插件生态与开发者工具。当前项目功能推进迅速，但跨平台（特别是 Windows/Linux）的稳定性问题在用户端引发了较多负面反馈。

## 2. 版本发布
本项目未启用 GitHub PR，代码合并通过 Releases 落地。今日共有 2 个新版本发布：

### dsh-v0.2.1-rc.2
*   **发布时间**：今日
*   **核心变更**：
    *   **模型适配**：新增对 **DeepSeek-V4.1-Flash-1017** 模型的支持，确保与最新模型发布同步。
    *   **搜索能力**：适配 DeepSeek Search 与 Fetch API，用户现可在网页搜索设置中直接启用原生搜索功能。
*   **迁移建议**：用户可直接升级，主要更新为后端模型与 API 接口适配，无破坏性变更。
*   [查看完整 Changelog](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-rc.2)

### dsh-v0.2.1-rc.1
*   **发布时间**：今日
*   **核心变更**：
    *   **插件系统升级**：支持自定义插件索引源；新增“让 Agent 创建插件”入口；支持插件的热重载、启用/停用及依赖同步。
    *   **开发者工具**：新增实验性开发者工具组合包（含会话日志、调试工具）；新增 Git Worktrees 插件支持；新增思考过程机器翻译插件。
    *   **Web/桌面端体验**：Web 版支持本机登录；支持消息密钥脱敏；新增 Markdown 文件 YAML 头部预览；极简模式支持图片读取与上下文压缩。
    *   **底层能力**：SSH 新增独立 helper 运行时；全局指令支持读取共享 agents 目录；pi-ai 路由支持动态工具管理。
*   [查看完整 Changelog](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-rc.1)

## 3. 项目进展
*注：由于该项目未启用 PR，以下进展基于今日发布的 Release Changelog 梳理。*

*   **插件生态标准化**：通过 v0.2.1-rc.1，项目正式将插件管理提升至核心功能，引入了插件索引源、热重载及 Agent 辅助创建机制。这标志着 DSH 正从单一 Agent 向平台化演进。
*   **模型同步速度**：v0.2.1-rc.2 在发布当日即适配了 DeepSeek-V4.1-Flash-1017，展示了团队对上游模型发布的快速响应能力。
*   **跨平台能力补齐**：rc.1 版本中增加了 SSH 独立 helper 运行时，显著提升了远程开发与沙箱环境下的操作能力。

## 4. 社区热点
基于过去 24 小时 Discussions 评论数与更新频率分析：

1.  **[Linux 支持缺失]** (#8107)
    *   **现状**：用户吐槽 Linux 平台长期被遗忘，目前仅 WorkBuddy 和 Qoder 支持，而 DSH 桌面版尚不支持。
    *   **链接**：https://github.com/deepseek-ai/deepseek-harness/discussions/8107
2.  **[OpenCode Zen 429 错误]** (#1455)
    *   **现状**：使用 OpenCode 免费模型时必现 429 限流错误。用户已提供根因分析（网关额度限制）及修复补丁，等待维护者确认。
    *   **链接**：https://github.com/deepseek-ai/deepseek-harness/discussions/1455
3.  **[Windows 沙箱崩溃]** (#810, #9621)
    *   **现状**：多个用户报告在 Windows 桌面端（Electron）中，沙箱内的 `pwsh` 或 Shell 命令因 `0xC0000142` (DLL 初始化失败) 崩溃，导致 shell 能力完全失效。这是当前 Windows 用户最大的痛点。
    *   **链接**：https://github.com/deepseek-ai/deepseek-harness/discussions/810, https://github.com/deepseek-ai/deepseek-harness/discussions/9621
4.  **[桌面端认证故障]** (#9924)
    *   **现状**：新发布的 rc 版本中，桌面端 Web 认证失败，原因是 Cookie 过多导致 Host header 溢出 (431 错误)。
    *   **链接**：https://github.com/deepseek-ai/deepseek-harness/discussions/9924

## 5. Bug 与稳定性
*按严重程度排列，暂无标记为“已修复”的 PR，因项目未启用 PR，修复预计将包含在后续的 RC 或正式版本中。*

| 严重程度 | 问题描述 | 涉及版本/平台 | 关联讨论 | 状态 |
| :--- | :--- | :--- | :--- | :--- |
| **P0** | **Windows 沙箱 Shell 崩溃**：无控制台宿主下 `pwsh` 启动即崩 (`0xC0000142`)，ACL 授权缓存不自愈。 | Windows Desktop / 0.2.0-rc.2 | [#810](https://github.com/deepseek-ai/deepseek-harness/discussions/810), [#8409](https://github.com/deepseek-ai/deepseek-harness/discussions/8409), [#9621](https://github.com/deepseek-ai/deepseek-harness/discussions/9621) | Open |
| **P0** | **桌面端认证失败**：Cookie 溢出导致 Web 认证 431 错误，影响登录流程。 | Linux/Win Desktop / 0.2.1-alpha/RC | [#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) | Open |
| **P1** | **提示词变量错误**：更新后出现 `unknown prompt variable "{{cwd}}"`，导致模型无法运行。 | Windows / 0.2.1-rc | [#9962](https://github.com/deepseek-ai/deepseek-harness/discussions/9962) | Open |
| **P1** | **格式错误回归**：`format v4 message requires a producer-owned source kind`，部分用户回退旧版本解决。 | 0.1.7-alpha.1 | [#7455](https://github.com/deepseek-ai/deepseek-harness/discussions/7455) | Open |
| **P2** | **第三方模型限流**：OpenCode Zen 免费模型必现 429 错误。 | 全局 | [#1455](https://github.com/deepseek-ai/deepseek-harness/discussions/1455) | Open (有补丁) |

## 6. 功能请求与路线图信号
*   **Linux 平台支持**：#8107 高热度讨论表明 Linux 用户群体对 DSH 桌面版的强烈需求。鉴于 v0.2.1 系列强化了 Web 和插件系统，Linux 桌面端支持可能在下个大版本（v0.3.x）中纳入路线图。
*   **后台运行/自启**：#6796 提议 `dsh web` 支持后台运行或开机自启。考虑到 Web 版功能的增强，此需求可能通过系统服务或托盘应用形式实现。
*   **多文件夹工作区**：#5505 提议对齐 OpenAI Codex 的多文件夹项目模型。v0.2.1-rc.1 已支持 `working_directory` 工具，为多目录操作奠定了基础，该功能有较高概率在 v0.2.2 或 v0.3.0 中实现。
*   **插件化大包**：#8801 建议将 LibreOffice 等大依赖改为可选插件。v0.2.1-rc.1 的插件系统更新（支持按需安装、极简模式）为拆解重型依赖提供了技术基础。

## 7. 用户反馈摘要
*   **痛点**：
    *   **Windows 稳定性**：桌面端沙箱机制在标准用户权限和无控制台环境下表现极差，多个用户反馈 Shell 命令完全不可用。
    *   **平台覆盖**：Linux 用户感到被边缘化，缺乏原生的桌面体验或官方支持。
    *   **账号安全**：#9453 中用户投诉 DeepSeek 账号因不明原因被封禁且无申诉渠道，虽为平台问题，但加剧了用户对 DSH 依赖性的焦虑。
*   **满意点**：
    *   **插件生态**：社区积极展示了社区插件目录（#1045）和数据保护版（#9111），用户对可扩展性表示认可。
    *   **快速迭代**：rc.1 到 rc.2 的快速发布让用户对模型同步速度感到满意。

## 8. 待处理积压
*   **Windows 沙箱 ACL 缺陷 (#8409, #810, #9621)**：该问题自 0.2.0-rc.2 遗留至今，涉及 Windows 底层权限机制，技术复杂度高。维护团队需优先分配资源解决，否则将严重阻碍 Windows 桌面端的用户体验。
*   **Cookie 溢出修复 (#9924)**：该 Bug 在 rc.1 和 rc.2 中依然存在，属于回归或新引入的严重阻塞性问题，建议在下一个 RC 版本（rc.3）前紧急修复。
*   **长期未响应**：#653 (反代 403) 和 #1455 (OpenCode 限流) 自 8 月至今仍有活跃讨论，虽非核心功能阻塞，但维护者可考虑合并用户提供的补丁或发布临时配置指南。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*