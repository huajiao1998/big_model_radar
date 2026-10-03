# OpenClaw 生态日报 2026-10-03

> Issues: 494 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-03 00:48 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

OpenClaw 项目动态日报
日期：2026-10-03

### 1. 今日速览
OpenClaw 项目在过去 24 小时内保持极高的活跃度，共处理了 494 条 Issues 和 500 条 PR，显示社区和开发团队正在集中清理 2026.9.x 系列版本引入的稳定性问题。今日发布了 v2026.8.35 版本，作为面向网关的"扩展稳定"版本，主要包含安全更新和新模型支持。尽管活跃度极高，但系统仍存在显著的稳定性挑战，尤其是 SQLite 状态数据库的锁争用、内存泄漏以及插件捕获机制导致的 SSD 磨损问题。核心功能方面，Gateway 的启动性能和多平台（Windows/macOS）兼容性修复是当前的重点攻坚方向。

### 2. 版本发布
**v2026.8.35**
*   **发布类型**：Gateway-only `extended-stable`（等同于 LTS）。
*   **主要内容**：基于 2026 年 8 月底的代码，集成了关键安全更新、可靠性和性能修复，并新增了对部分新模型的支持。
*   **迁移注意**：作为稳定版本，建议生产环境用户从 2026.9.x 测试版回退或升级至此版本以获取增强的安全性。该版本修复了部分已知回归，但需关注后续 2026.9.7+ 版本中关于会话状态管理的进一步变更。

### 3. 项目进展
今日大量 PR 被合并或关闭，主要集中在清理技术债务和修复近期引入的回归：
*   **架构简化与重构**：[#163850](https://github.com/openclaw/openclaw/pull/163850) 清理了 Feishu、WhatsApp 和 Teams 频道中冗余的请求准备层和兼容性处理，简化了代码结构。
*   **插件 SDK 增强**：[#162669](https://github.com/openclaw/openclaw/pull/162669) 引入了版本化的调度器能力，确保插件计时器不会在服务或账户退役期间意外存活，增强了生命周期管理。
*   **UI 性能优化**：[#163898](https://github.com/openclaw/openclaw/pull/163898) 优化了 Chat 视口调整时的渲染逻辑，将 24 步调整产生的面板渲染次数从 59 次减少到 42 次。
*   **修复类 PR**：
    *   [#163869](https://github.com/openclaw/openclaw/pull/163869) 修复了 `doctor` 命令在更新预演期间无法获取维护所有权的问题。
    *   [#163814](https://github.com/openclaw/openclaw/pull/163814) 解决了子代理（Subagent）在快速后续操作中产生陈旧暂停通知的问题。
    *   [#163897](https://github.com/openclaw/openclaw/pull/163897) 修复了插件归档安装时遗漏必需 peer 依赖的问题。

### 4. 社区热点
根据评论数和关注度，以下 Issue 是今日讨论的焦点：

*   **[Issue #116201: 实时语音工作保留无界资源](https://github.com/openclaw/openclaw/issues/116201)**
    *   **状态**：OPEN, P2, 59 条评论
    *   **分析**：这是今日最热门的议题。用户发现实时语音会话在提供商行为缓慢或突发时，会保留过时的咨询工作、大型音频帧等，导致资源占用无上限。社区强烈呼吁引入硬性的所有权边界，而非仅靠取消信号。
*   **[Issue #102175: 嵌入式 Prompt Cache 在边界处失效](https://github.com/openclaw/openclaw/issues/102175)**
    *   **状态**：OPEN, P2, 21 条评论
    *   **分析**：报告指出长期会话在跨越房间事件、策略或 Responses 边界时丢失 Provider Prompt Cache 重用，导致成本增加和延迟。
*   **[Issue #97616: 未回收的 Hook/工具子进程导致僵尸累积](https://github.com/openclaw/openclaw/issues/97616)**
    *   **状态**：OPEN, P1, 17 条评论
    *   **分析**：这是一个长期存在的回归问题，OpenClaw 泄露了来自 hook/tool 执行的子进程，导致僵尸进程累积和运行时性能下降。

### 5. Bug 与稳定性
今日报告了多个严重影响可用性的 P0/P1 级 Bug，主要集中在状态数据库和资源管理：

*   **P0 - 严重崩溃/数据一致性**
    *   [Issue #160521: Gateway 崩溃：状态 DB 读准入密封导致未处理拒绝](https://github.com/openclaw/openclaw/issues/160521)。在 2026.9.6 版本中，`reconcileActive` 中的未处理拒绝导致网关崩溃。*暂无关联 Fix PR*。
    *   [Issue #161953: Windows 会话创建失败](https://github.com/openclaw/openclaw/issues/161953)。由于 SQLite 路径处理逻辑错误，Windows 上所有持久会话创建均失败。*已关闭/修复*。
    *   [Issue #145252: 2026.9.3/9.4 升级与恢复可靠性跟踪](https://github.com/openclaw/openclaw/issues/145252)。维护者正在集中处理 2026.9.x 版本的升级和恢复可靠性问题。

*   **P1 - 性能退化/资源泄漏**
    *   [Issue #117262: SQLite 争用导致事件循环停滞 ~33s](https://github.com/openclaw/openclaw/issues/117262)。3 个并发写句柄导致锁争用。*关联 PR 正在开发中*。
    *   [Issue #157989: 插件源捕获导致严重 SSD 磨损](https://github.com/openclaw/openclaw/issues/157989)。每个 CLI 命令重写 ~1.4 GB 数据。*暂无关联 Fix PR*。
    *   [Issue #160548: prepared-model-catalog worker 内存泄漏](https://github.com/openclaw/openclaw/issues/160548)。每 5 分钟泄漏 ~1 GiB 内存，导致内存压力回收杀死等待中的回合。*暂无关联 Fix PR*。
    *   [Issue #162119: Codex 模型切换后间歇性 403 错误](https://github.com/openclaw/openclaw/issues/162119)。*暂无关联 Fix PR*。

### 6. 功能请求与路线图信号
*   **Per-agent Dreaming 配置** ([Issue #67413](https://github.com/openclaw/openclaw/issues/67413))：用户希望将内存核心的 dreaming 功能按代理隔离，避免所有工作区同时运行导致的 OOM 和缺乏控制。鉴于其 12 条评论和 5 个点赞，该功能极有可能在下一版本中实现细粒度控制。
*   **Discord 论坛帖子自动标题** ([PR #141712](https://github.com/openclaw/openclaw/pull/141712))：该 PR 正在开放状态，允许为 Discord 论坛帖子生成模型驱动的标题，提升了频道集成的智能化。
*   **分层 Bootstrap 加载** ([PR #22439](https://github.com/openclaw/openclaw/pull/22439))：长期跟踪的 PR，旨在为大型工作区引入分层加载机制以节省 Context Window 预算，今日仍有更新，显示团队对 Token 效率优化的重视。

### 7. 用户反馈摘要
*   **痛点**：用户对 2026.9.5+ 版本的**稳定性**表示强烈不满，特别是升级后的崩溃循环、会话状态丢失以及因插件机制导致的磁盘空间激增。
*   **满意点**：v2026.8.35 的 LTS 性质受到生产环境用户欢迎，被视为从不稳定的 9.x 测试版回退的安全港湾。
*   **场景**：多代理（Multi-agent）环境下的身份污染（[Issue #65374](https://github.com/openclaw/openclaw/issues/65374)）和跨代理内存共享成为了新出现的复杂痛点，用户希望在共享语料库时保持代理边界。

### 8. 待处理积压
*   **SQLite 状态数据库稳定性**：Issues [#117262](https://github.com/openclaw/openclaw/issues/117262) 和 [#118885](https://github.com/openclaw/openclaw/issues/118885) 长期未解决，建议维护者优先考虑重构 SQLite 访问层或引入 WAL 优化策略，因为这是当前多数 P0 崩溃的根本原因。
*   **插件捕获机制（Plugin Captures）**：Issue [#158390](https://github.com/openclaw/openclaw/issues/158390) 指出临时目录从未被 GC，导致磁盘无限填充。这是一个严重的工程卫生问题，需尽快加入 CI/CD 自动化清理流程。
*   **MacOS App 启动循环**：Issue [#115256](https://github.com/openclaw/openclaw/issues/115256) 报告 Desktop app 导致网关服务重启循环，且 `doctor` 建议的修复会被应用立即撤销。需深入排查应用与 systemd 服务的交互逻辑。

---

## 横向生态对比

### 1. 生态全景
2026-10-03，AI 智能体与个人 AI 助手开源生态呈现出**“功能爆发”与“工程稳健”激烈博弈**的特征。生态正从单体助手向**模块化（A2A、独立网关）与多模态实时交互**演进，但底层稳定性（状态数据库锁争用、跨平台环境依赖）仍是制约生产部署的核心瓶颈。各主流项目社区活跃度极高，维护者正集中清理长期技术债务并加固安全边界，表明该领域正进入**生产级可靠性**的关键打磨期。

### 2. 各项目活跃度对比

| 项目 | Issues 动态 | PR 动态 | Release 情况 | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 494 条 | 500 条 | v2026.8.35 (LTS) | **高风险/高价值**：极高活跃度伴随 SQLite 锁争用、内存泄漏及显著回归，需回退至 LTS 稳定。 |
| **Zeroclaw** | 50 条 | 50 条 | 无（v0.8.6 预收尾） | **良好/重构期**：架构向模块化演进，CLI 权限与回归修复为焦点，堆叠 PR 存在阻塞风险。 |
| **PicoClaw** | 3 条 | 4 条 | 无 | **温和/打磨期**：活跃度低，聚焦 Web UI 性能瓶颈与企业级部署（Nginx 路径）的适配。 |
| **QwenPaw** | 9 条 | 11 条 | 无 (V2.2.2.beta) | **良好**：从功能堆叠转向体验与底层鲁棒性，修复 UI 交互与跨网访问 Bug。 |
| **hermes-agent**| 500 条 | 500 条 | 无 | **高流转/需加固**：Issue/PR 数量巨大，桌面端 UI 一致性与 PM 部署工具是主要痛点。 |
| **AstrBot** | 22 条 | 43 条 | 无 | **健康/稳步提升**：核心 WebUI 体验与 Agent 容错机制改善，存在长期滞后的安全修复。 |
| **DeepSeek Harness**| N/A (153 讨论) | N/A (无 PR) | 无 (0.2.0-rc.2) | **平台风险高**：无 PR 入口，Windows 沙箱/ACL 致命缺陷与 Linux 支持缺位阻碍正式版发布。 |

### 3. OpenClaw 在生态中的定位
*   **优势**：OpenClaw 具备最强的底层模型网关与多平台（Windows/macOS）集成能力，其推出的 Gateway-only `extended-stable`（LTS）版本为生产环境提供了明确的安全回退港湾，这是其他同类项目尚未提供的生命周期策略。
*   **技术路线差异**：相比 Zeroclaw 的 Rust/模块化与 PicoClaw 的轻量化，OpenClaw 聚焦于极重度的“全渠道（Feishu/WhatsApp 等）+ 实时语音”集成，但其代价是巨大的状态管理复杂度（SQLite）与内存消耗。
*   **社区规模对比**：OpenClaw 与 hermes-agent 并驾齐驱（单日 500 条更新），构成了生态中体量最大的两个核心阵营，远超 PicoClaw 与 AstrBot。

### 4. 共同关注的技术方向
*   **实时语音/多模态交互**：**OpenClaw**（无界资源管理痛点）、**Zeroclaw**（RFC 支持后端无关 WebSocket 语音）、**QwenPaw**（补齐 `view_audio` 音频模态）均在向多模态实时对话演进。
*   **状态数据库与资源管理重构**：**OpenClaw**（SQLite 锁争用、事件循环停滞）与 **hermes-agent**（Dashboard 严重内存泄漏 5.2GB OOM）均暴露出状态持久化层无法支撑长时高频运行的工程隐患。
*   **多智能体通信与解耦**：**Zeroclaw**（RFC 独立 A2A 协议）、**hermes-agent**（跨网关 Bots 协同架构讨论）、**QwenPaw**（跨机器去中心化 Agent 通信）不约而同地关注如何让不同设备或实例上的智能体进行安全通信与任务委派。
*   **UI 性能与交互一致性**：**PicoClaw**（长会话 Web UI 卡顿）、**QwenPaw**（流式输出滚动锁定与消息回滚）、**hermes-agent**（桌面端重复渲染 Bug）均面临长上下文下的前端渲染瓶颈。

### 5. 差异化定位分析
*   **功能侧重**：
    *   **OpenClaw / hermes-agent**：侧重“全能型”个人 AI 网关，主打多平台 IM 接入、复杂工作流与安全隔离。
    *   **Zeroclaw**：侧重“可信赖的本地开发引擎”，通过 CLI 权限闭环与 A2A 模块化，强调工程确定性。
    *   **DeepSeek Harness**：侧重“开发者桌面工作站”，结合插件市场进行媒体生成与本地代码桥接。
    *   **PicoClaw / QwenPaw**：侧重“开箱即用的轻量客户端”，注重 Web/Tauri 桌面端的交互体验打磨。
    *   **AstrBot**：侧重“跨平台消息网关路由”，以多平台适配器与 STT/TTS 扩展为核心竞争力。
*   **技术架构**：ZeroClaw 和 hermes-agent 正在加速拆分独立的 Gateway 或核心进程以支持无头部署；而 OpenClaw 依然维持重 Gateway 架构但面临稳定性挑战；PicoClaw 尝试向响应式 API (Responses API) 底层协议升级。

### 6. 社区热度与成熟度分层
*   **快速重构迭代期（高热度、高风险）**：**OpenClaw** 与 **hermes-agent**。两者每日 500 条级别的更新量表明正处于架构快速膨胀与清理技术债务的阵痛期，P0/P1 级稳定性 Bug 密集爆发。
*   **架构演进规划期（中热度、高前瞻）**：**Zeroclaw**。目前处于 v0.9.0 架构解耦的早期，PR 堆叠明显，核心在于解决 RFC 决策与技术底座重构。
*   **质量巩固与体验打磨期（低/中热度、高稳健）**：**PicoClaw**、**QwenPaw**、**AstrBot**。这三个项目没有大规模重构动作，主要集中在修复 UI 交互细节、优化本地部署链路和增强 Agent 容错机制，适合偏好稳定体验的用户。

### 7. 值得关注的趋势信号
1.  **生产环境信任危机**：多个项目面临由于状态数据库争用或 OOM 导致的崩溃，说明 AI 智能体若要进入全天候生产环境，**必须引入类似 v2026.8.35 的 LTS（长期支持）版本机制**，单纯依赖开发主分支已无法满足企业级可靠性。
2.  **多智能体协同架构化**：从 Issue 讨论到 RFC 提案，单纯的单一大脑已无法满足需求。**Agent-to-Agent (A2A) 通信协议与跨机去中心化协同**正在成为各技术阵营的标准配置，预计未来半年将爆发相关的开源 SDK。
3.  **部署边界模糊化**：弱网、VPS、跨洋等边缘计算场景下，智能体的网络重连机制与 Token 懒加载（Lazy-loading 技能库以节省 Context）将成为核心竞争力；**“云端大脑 + 本地解耦工具”** 的混合架构正被开发者强烈呼唤。
4.  **工程卫生决定生态生死**：如 PicoClaw 的 CLA 阻塞、DeepSeek 的 Windows ACL 崩溃表明，**对底层系统（沙箱、权限管理）的鲁棒性处理**将直接决定一款 Agent 工具能否在异构 OS 上存活。忽视 Windows/Linux 底层差异的智能体将很快被市场淘汰。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 (2026-10-03)

## 1. 今日速览

Zeroclaw 项目在 2026-10-02 保持极高的开发活跃度，过去 24 小时内Issues 与 PRs 均更新 50 条，其中 48 个 PR 处于待合并状态，显示核心贡献者正集中处理大量并发任务。今日无新版本发布，但社区焦点集中在 **v0.8.6** 相关的回归修复与 **v0.9.0** 架构重构的前瞻性工作。安全性与运行时稳定性是当前的核心关注点，多个高优先级 PR 涉及 Windows 密钥保护、内存限制及 CLI 授权机制。项目正处于从单体架构向模块化（如 A2A 协议、独立 Gateway）演进的关键阶段，尽管面临部分回归 Bug，但工程响应迅速。

## 2. 版本发布

**无今日新版本发布。**
*注：当前活跃 Issue 与 PR 大量标注 `release:v0.8.6` 和 `release:v0.9.0`，表明 v0.8.6 处于收尾或预发布阶段，而 v0.9.0 已开始架构规划。*

## 3. 项目进展

今日合并量较少（仅 2 条已合并/关闭 PR），主要精力在于解决高复杂度的待合并 PR 堆叠。关键进展包括：

*   **运行时稳定性增强**：PR [#11471](https://github.com/zeroclaw-labs/zeroclaw/pull/11471) 修复了容器启动器环境保留问题，确保 Docker 运行时在环境清洗后仍能正确识别 `DOCKER_HOST`，这对部署在复杂 K8s 环境中的用户至关重要。
*   **CLI 权限管理闭环**：PR [#11313](https://github.com/zeroclaw-labs/zeroclaw/pull/11313) (P1, 高风险) 旨在解决 `config set/patch` 修改授权策略后无法实时生效到运行中 Daemon 的问题，这是提升运维安全性的关键一环。
*   **ZeroCode 用户体验优化**：PR [#11414](https://github.com/zeroclaw-labs/zeroclaw/pull/11414) 引入了“专注工作区”和“管理中枢”，简化了 Web 端 Dashboard 的信息密度，使 Agent 活动、成本和健康状态更易于监控。

## 4. 社区热点

讨论最激烈、评论数最多的 Issue 反映了维护者决策机制和社区关注焦点：

1.  **RFC 决策追踪** ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)):
    *   状态：OPEN, 评论 15。
    *   分析：这是一个元 Issues，用于追踪 RFC、设计问题及发布策略。高评论量表明社区正在积极讨论架构边界和功能取舍，维护者需要明确回复以清理积压的决策队列。
2.  **ZeroCode 启动目录回归** ([#11387](https://github.com/zeroclaw-labs/zeroclaw/issues/11387)):
    *   状态：OPEN, P1, 评论 5。
    *   分析：用户报告 `zerocode` 再次忽略启动目录，强制使用 Agent 工作区。这是 **#10609 的回归**。由于严重影响日常 CLI 使用体验，该问题引发了较多讨论，且已有对应修复 PR [#11219](https://github.com/zeroclaw-labs/zeroclaw/pull/11219)。
3.  **实时语音通道支持** ([#7943](https://github.com/zeroclaw-labs/zeroclaw/issues/7943)):
    *   状态：OPEN, 评论 5。
    *   分析：社区对后端无关的 WebSocket 语音客户端（兼容 CrispASR/Wyoming）需求强烈，旨在让 ZeroClaw 仅作为 LLM 大脑，而将音频处理外包。这代表了 ZeroClaw 向多模态实时交互扩展的趋势。

## 5. Bug 与稳定性

今日报告的 Bug 主要集中在配置兼容性、插件加载及跨平台环境：

| 严重程度 | Issue/PR | 描述 | 状态 | 关联 Fix |
| :--- | :--- | :--- | :--- | :--- |
| **P1** | [#11387](https://github.com/zeroclaw-labs/zeroclaw/issues/11387) | ZeroCode 忽略启动目录（#10609 回归） | OPEN | [PR #11219](https://github.com/zeroclaw-labs/zeroclaw/pull/11219) |
| **P1** | [#11324](https://github.com/zeroclaw-labs/zeroclaw/issues/11324) | CLI 本地 RPC 缺乏 Daemon 身份验证 | OPEN | [PR #11313](https://github.com/zeroclaw-labs/zeroclaw/pull/11313) 部分解决 |
| **P2** | [#11336](https://github.com/zeroclaw-labs/zeroclaw/issues/11336) | 插件运行时拒绝注册但 CLI 检查通过 | OPEN | 待确认 |
| **P2** | [#9028](https://github.com/zeroclaw-labs/zeroclaw/issues/9028) | Windows 下 Ctrl+C 导致强制退出 (Exit Code 1073741510) | OPEN | 长期遗留 |
| **P3** | [#11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418) | ZeroCode "Copy" 功能无效 | OPEN | 待处理 |

**稳定性风险提示**：
*   **Docker/升级流程**：Issue [#11369](https://github.com/zeroclaw-labs/zeroclaw/issues/11369) (已关闭但值得关注) 指出从 master 构建的 Docker 镜像启动即退出，且中断升级可能导致数据库 stranded。虽然标记为 Closed，但需确认修复是否已回溯至稳定分支。
*   **内存泄漏**：Issue [#6916](https://github.com/zeroclaw-labs/zeroclaw/issues/6916) 报告 Shell 子进程无内存限制导致 OOM。PR [#11456](https://github.com/zeroclaw-labs/zeroclaw/pull/11456) 提供了可选的 `shell_max_memory_mb` 看门狗，目前处于待合并状态。

## 6. 功能请求与路线图信号

*   **A2A 协议标准化**：RFC [#11254](https://github.com/zeroclaw-labs/zeroclaw/issues/11254) 提出独立 `zeroclaw-a2a` crate，标志着 Agent-to-Agent 通信将成为核心架构模块。
*   **RAG 能力深化**：RFC [#11235](https://github.com/zeroclaw-labs/zeroclaw/issues/11235) 强调基于本地文档库的知识检索，预计将在 v0.9.0 中通过独立模块实现。
*   **Gateway 独立化**：PR [#11002](https://github.com/zeroclaw-labs/zeroclaw/issues/11002) 及关联工作旨在将 Web Dashboard 和 HTTP Gateway 拆分为独立 IPC 客户端进程，支持无头部署。
*   **Subagent 可视化**：Issue [#8763](https://github.com/zeroclaw-labs/zeroclaw/issues/8763) 请求在 ZeroCode 中显示 Subagent 活动细节，PR [#11462](https://github.com/zeroclaw-labs/zeroclaw/pull/11462) 正在实现委派审批的路由，暗示 Subagent 系统正走向成熟。

## 7. 用户反馈摘要

*   **痛点**：用户普遍反映 **CLI 与 Daemon 的状态同步** 存在问题（如配置修改不生效、启动目录错误）。这是影响日常开发效率的最大摩擦点。
*   **场景**：高频使用场景包括 **Docker/K8s 部署** 和 **Windows 本地开发**。Windows 下的特定 Bug（如 Ctrl+C 行为、密钥 ACL 问题）表明该平台的用户基数正在增加，但支持尚不完善。
*   **满意度**：社区对 **Security 加固** 的响应积极（如 PR #11451 关于 Windows 密钥文件 ACL 的修复），但对 **回归问题**（如 #11387）表示担忧，认为版本质量门槛需提高。

## 8. 待处理积压

*   **长期停滞的高优 Issue**：
    *   [#9028](https://github.com/zeroclaw-labs/zeroclaw/issues/9028) (Windows Ctrl+C 崩溃) 创建于 2026-07-13，至今未关闭，影响用户体验。
    *   [#5836](https://github.com/zeroclaw-labs/zeroclaw/issues/5836) (工具执行协作取消) 创建于 2026-04-17，虽标记 in-progress，但长期无重大进展，PR [#11465](https://github.com/zeroclaw-labs/zeroclaw/pull/11465) 正在堆叠中。
*   **维护者决策瓶颈**：
    *   Tracker [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 表明许多设计决策卡在 "Maintainer decision" 阶段。建议维护者定期清理该队列，明确 Accept/Reject 边界，以加速 #11254, #11235 等 RFC 的落地。
*   **堆叠 PR 风险**：
    *   多个 XL 大小 PR（如 #11265, #11467）存在依赖关系（Stacked）。若基础 PR 合并延迟，后续功能将被阻塞。需关注 #11264 和 #10911 的合并进度。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期**: 2026-10-03

## 1. 今日速览
过去 24 小时内，PicoClaw 项目保持中等活跃度，共记录 3 条 Issue 更新和 4 条 PR 状态变更。当前无新版本发布，重点精力集中在解决 Web UI 在长历史会话下的性能滞后问题，以及优化底层 Provider 集成（如 Cheaper Inference 与 OpenAI Responses API）。社区讨论主要聚焦于前端交互体验优化及代理部署的灵活性，项目整体处于功能迭代与稳定性优化的并行阶段。

## 2. 版本发布
*无新版本发布*

## 3. 项目进展
今日共有 2 个 PR 处于待合并状态，2 个 PR 被关闭/合并。
*   **OpenAI API 迁移探索**：[@XenonR](https://github.com/XenonR) 提交的 [#3381](https://github.com/sipeed/picoclaw/pull/3381) 试图将 OpenAI Provider 切换至 Responses API。虽然目前标记为 `stale` 且处于 Open 状态，但代表了底层 API 协议的升级尝试。
*   **旧代码清理与合并**：[#1544](https://github.com/sipeed/picoclaw/pull/1544) 和 [#3368](https://github.com/sipeed/picoclaw/pull/3368) 已关闭。其中 #1544 合并了多个早期修复，#3368 关于 Parallel Search MCP 的文档更新因故关闭（可能是因功能调整或重复），维护团队正在进行代码库的整理工作。

## 4. 社区热点
*   **Web UI 交互性能瓶颈**：[#3281](https://github.com/sipeed/picoclaw/issues/3281) 是今日讨论最热烈的议题（17 条评论，2 个 👍）。用户反馈当会话历史较长时，Web UI 输入框出现严重滞后。
    *   *分析*：这表明当前版本（0.3.1）在前端状态管理或 DOM 渲染上可能存在性能瓶颈，随着用户实际使用深度的增加，该问题已成为影响核心体验的关键痛点。
*   **Nginx 反向代理支持**：[#3415](https://github.com/sipeed/picoclaw/issues/3415) 今日新开。用户希望 PicoClaw 能支持非根路径部署（如 `/pico/`），以便通过 Nginx 将服务挂载至子域名或路径下。
    *   *分析*：这是典型的 B2B 或企业级部署需求，要求前后端地址（API、WebSocket、静态资源）支持 Base URL 前缀，涉及较深的前端路由和后端 CORS/路径重写改动。

## 5. Bug 与稳定性
*   **[高] Web UI 输入卡顿**：[#3281](https://github.com/sipeed/picoclaw/issues/3281)
    *   *现象*：在 Web UI 中，当会话历史较长时，输入操作非常滞后（Laggy）。
    *   *状态*：Open，尚未有专门的 Fix PR，但已有社区讨论。
*   **[中] CLA Assistant 检测失败**：[#3392](https://github.com/sipeed/picoclaw/issues/3392)
    *   *现象*：CLAassistant 无法正确检测到 CLA 签名状态，阻塞了部分 PR（如 #3381）的自动合并流程。
    *   *状态*：标记为 `stale`，需维护者检查 CLA Bot 配置或重新触发检测。

## 6. 功能请求与路线图信号
*   **反向代理/子路径支持**：[#3415](https://github.com/sipeed/picoclaw/issues/3415)
    *   *可行性*：目前无相关 PR。这是一个中等难度的前端工程改造，若社区呼声高，可能会纳入 v0.4 或后续版本，以提升部署灵活性。
*   **新增 LLM Provider (Cheaper Inference)**：[#3393](https://github.com/sipeed/picoclaw/pull/3393)
    *   *状态*：Open，标记为 `stale`。虽然 PR 长期未动，但反映了社区对低成本 LLM 网关的需求。若该 PR 被激活并合并，将增加 PicoClaw 的模型选择多样性。
*   **OpenAI Responses API 支持**：[#3381](https://github.com/sipeed/picoclaw/pull/3381)
    *   *状态*：Open，标记为 `stale`。属于底层架构优化，若官方决定跟进 OpenAI 最新 API 标准，此 PR 可作为基础，但需重新审查代码。

## 7. 用户反馈摘要
*   **痛点**：用户明确抱怨 Web UI 在“长历史”场景下的体验下降（#3281），这影响了高频使用用户的效率。
*   **场景**：用户倾向于在生产环境中使用 Nginx 进行反向代理和路径隔离（#3415），显示 PicoClaw 正被更多地用于正式生产环境而非仅本地开发。
*   **流程受阻**：开发者反馈 CLA 检测问题（#3392）干扰了贡献流程，特别是针对涉及 API 变更的重要 PR。

## 8. 待处理积压
*   **长期陈旧 PR (Stale)**：
    *   [#3393](https://github.com/sipeed/picoclaw/pull/3393) (Cheaper Inference Provider) 和 [#3381](https://github.com/sipeed/picoclaw/pull/3381) (OpenAI Responses API) 均已标记为 `stale`。建议维护者确认是否保留这些功能，或将其归档/关闭，以保持 PR 队列的整洁。
    *   [#3392](https://github.com/sipeed/picoclaw/issues/3392) 的 CLA 问题若持续存在，将阻碍其他依赖自动检测的贡献者，需尽快排查 CI/CD 或 Bot 配置。
    *   [#3281](https://github.com/sipeed/picoclaw/issues/3281) 虽有 17 条评论，但尚未看到针对性能问题的具体修复代码提交，建议优先分配资源解决此前端性能回归。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 (2026-10-03)

### 1. 今日速览
今日 QwenPaw 项目保持中等活跃度，共新增 9 个 Issues 和 11 个 PR 更新。社区焦点主要集中在**移动端/WebUI 交互优化**与**稳定性修复**上。维护者对积压已久的 UI 交互 PR（如输入框光标、滚动锁定等）进行了批量清理与合并处理。虽然近期无新 Release，但 `V2.2.2.beta` 版本暴露了若干跨网络访问及第三方 Agent 适配的 Bug，目前已有对应的技术反馈。项目核心开发正由“功能堆叠”转向“体验打磨”与“底层鲁棒性增强”。

### 2. 项目进展
今日共处理了 7 个 PR，其中大部分为合并或关闭状态，主要集中在前端控制台（Console）和桌面端（Tauri）的体验优化：

*   **UI 交互深度优化**：
    *   关闭/合并了 [#7347](https://github.com/agentscope-ai/QwenPaw/pull/7347) 和 [#7356](https://github.com/agentscope-ai/QwenPaw/pull/7356)。前者修复了长文本输入时富文本编辑器光标不可见的问题，后者增加了聊天滚动锁定功能，解决了流式输出时强行跟随导致的历史内容阅读困难问题。
    *   关闭了 [#7357](https://github.com/agentscope-ai/QwenPaw/pull/7357)，为 Chat 界面增加了 Tool Call 可见性开关，允许用户隐藏调试信息，提升日常对话的可读性。
*   **桌面端与底层配置增强**：
    *   处理了 [#6877](https://github.com/agentscope-ai/QwenPaw/pull/6877)，Tauri 桌面端现在可以记忆并恢复窗口几何布局。
    *   合并了 [#7344](https://github.com/agentscope-ai/QwenPaw/pull/7344) 和 [#7359](https://github.com/agentscope-ai/QwenPaw/pull/7359)，优化了 Monaco 编辑器对游戏开发文件（C#/Shader）的支持，并暴露了 Provider 级别的多媒体内联限制参数。

### 3. 社区热点
*   **WebUI 消息管理与回滚（🔥 热门讨论）**
    *   链接：[Issue #7997](https://github.com/agentscope-ai/QwenPaw/issues/7997)
    *   动态：今日更新，8 条评论。用户强烈诉求在 WebUI 中撤回/编辑消息及回滚文件快照。分析显示，这不仅是 UI 交互问题，更涉及底层会话历史截断与文件系统版本管理，社区对此预期较高。
*   **Markdown 渲染一致性**
    *   链接：[Issue #2975](https://github.com/agentscope-ai/QwenPaw/issues/2975)
    *   动态：今日更新，4 条评论。用户指出用户输入（User Input）消息不支持 Markdown 渲染，导致复制粘贴代码块或列表时排版混乱，体验不如 AI 回复（Assistant Output）顺滑。

### 4. Bug 与稳定性
今日报告的 Bug 主要集中在跨网络访问和上下文管理方面：

*   **🔴 [高优先级] V2.2.2.beta4 局域网访问故障**
    *   链接：[Issue #8073](https://github.com/agentscope-ai/QwenPaw/issues/8073)
    *   描述：升级至 beta4 后，局域网内其他设备访问本地服务报错，无法打开对话页面，仅本地直接访问正常。推测与代理或鉴权配置变更有关。**（目前未见关联 Fix PR）**
*   **🟡 [中优先级] 第三方 Agent 模型不可见与 UI 缺陷**
    *   链接：[Issue #8077](https://github.com/agentscope-ai/QwenPaw/issues/8077)
    *   描述：Qoder 等第三方 Agent 的自定义模型在 UI 中不可见或无法使用，且上下文计量器被隐藏。涉及 `harnesses.py` 处理逻辑。**（目前未见关联 Fix PR）**
*   **🟡 [中优先级] 会话分裂与消息注册错误**
    *   链接：[Issue #8078](https://github.com/agentscope-ai/QwenPaw/issues/8078)
    *   描述：跨会话消息被错误地注册为独立 Chat，导致同一 Session 的对话在 UI 中分裂为多个页面，破坏用户体验。
*   **🟢 [低优先级] 截断信号丢失**
    *   链接：[Issue #8085](https://github.com/agentscope-ai/QwenPaw/issues/8085)
    *   描述：当输出达到 Token 上限（finish_reason="length"）时，系统静默停止且无提示。
    *   Fix PR：[#8084](https://github.com/agentscope-ai/QwenPaw/pull/8084)（待合并，拒绝超大 Prompt 并显示空回复错误）。

### 5. 功能请求与路线图信号
*   **跨机器去中心化 Agent 通信**
    *   链接：[Issue #8080](https://github.com/agentscope-ai/QwenPaw/issues/8080)
    *   用户建议增加自动发现、任务委托及记忆共享功能，允许跨机器运行 QwenPaw 实例。这是一个宏大的架构级需求，预示了未来版本可能关注“多实例集群”能力。
*   **多模态听觉支持 (view_audio)**
    *   链接：[Issue #8081](https://github.com/agentscope-ai/QwenPaw/issues/8081)
    *   补齐 `view_image` 和 `view_video` 缺失的音频模态。
    *   路线图信号：**已有 PR 落地**。开发者 @shuziP 已提交 [PR #8083](https://github.com/agentscope-ai/QwenPaw/pull/8083)，预计该功能将在下一版本中快速跟进。

### 6. 用户反馈摘要
*   **痛点 1：文档与运行时行为脱节**。用户在 [Issue #8082](https://github.com/agentscope-ai/QwenPaw/issues/8082) 中指出 Heartbeat 机制的沉默语义、并发控制和 `AGENTS.md` 中的相关配置文档缺失，导致启用后行为不符合直觉。
*   **痛点 2：配置重置与热更新风险**。用户关注到在 [Issue #8079](https://github.com/agentscope-ai/QwenPaw/issues/8079) 关联的 PR 中，重载 Agent 时的后台清理逻辑（drain timeout）可能取消正在运行的任务，用户对非破坏性热更新的稳定性存在顾虑。
*   **场景：本地开发与长 Prompt**。开发者在处理超长代码或文档时（如 [Issue #8085](https://github.com/agentscope-ai/QwenPaw/issues/8085)），非常需要明确的截断标识以判断是否需要优化 Prompt 分段。

### 7. 待处理积压
*   **UI 体验类积压**：[#2975](https://github.com/agentscope-ai/QwenPaw/issues/2975)（Markdown 渲染）和 [#7997](https://github.com/agentscope-ai/QwenPaw/issues/7997)（消息回滚）是社区呼声最高的功能，但目前未见对应 PR。建议在最近的 Sprint 中安排评估。
*   **文档补全**：[#8082](https://github.com/agentscope-ai/QwenPaw/issues/8082) 关于 Heartbeat 的行为文档缺失，虽然不紧急，但会持续影响高级用户的使用体验。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

**hermes-agent 项目动态日报**
**日期**: 2026-10-03
**报告对象**: AI 智能体与个人 AI 助手领域开源项目分析师

### 1. 今日速览
过去 24 小时内，hermes-agent 项目展现出极高的社区活跃度与开发投入，Issue 更新量达到 500 条（新开/活跃 389，关闭 111），PR 更新量同步达 500 条（待合并 304，已合并/关闭 196）。项目当前正处于密集的问题修复与架构演进期，核心痛点集中在桌面端渲染一致性、跨网关通信以及底层依赖管理工具（PM）的兼容性。今日暂无新版本发布，维护者正集中资源清理积压的 P1/P2 级缺陷并完善插件生态的准入机制，项目整体保持高流转但底层稳定性仍需重点关注的状态。

### 2. 版本发布
今日无新版本发布。

### 3. 项目进展
今日大量 PR 处于待合并（Pending Review）状态，核心进展主要体现在**安全边界加固**、**部署工具修复**以及**插件生态扩展**三个维度。
*   **安全与隔离**：[PR #131874](https://github.com/NousResearch/hermes-agent/pull/131874) 修复了 OpenClaw 迁移脚本中 `.env` 和内存存储文件的权限漏洞（避免 0644 导致的全局可读）；[PR #130912](https://github.com/NousResearch/hermes-agent/pull/130912) 确保了需要交互式审批的终端命令在被阻断时绝对不会被错误执行，强化了安全边界。
*   **工具链与部署**：[PR #129306](https://github.com/NousResearch/hermes-agent/pull/129306) 修复了 PM（依赖管理器）发布运行时标记（`pm-runtime.json`）时的路径缺失问题，以解决 `_resident_runtime()` 的解析报错；针对 Windows 平台更新失败的问题，[PR #124807](https://github.com/NousResearch/hermes-agent/issues/124807) 和 [PR #123971](https://github.com/NousResearch/hermes-agent/issues/123971) 针对源准备阶段和网关健康检查失败（exit 1）的 Bug 进行了处理。
*   **功能扩展**：[PR #131879](https://github.com/NousResearch/hermes-agent/pull/131879) 为 Dashboard 增加了实时会话中断/停止按钮，改善了长任务的控制体验；插件目录持续更新，[PR #131877](https://github.com/NousResearch/hermes-agent/pull/131877) 升级了 `hermes-workflows` 至 v1.2.0，并新增了日语商业文本校对插件 `ja-writing-guard` ([PR #131872](https://github.com/NousResearch/hermes-agent/pull/131872)) 及 Chatwork 平台适配器 `jp-chatwork` ([PR #131871](https://github.com/NousResearch/hermes-agent/pull/131871))。

### 4. 社区热点
以下 Issues 与 PR 聚集了最多的讨论和反应，反映了社区当前的核心关切：
*   **桌面端重复渲染危机**：[Issue #127665](https://github.com/NousResearch/hermes-agent/issues/127665)（45 条评论）与 [Issue #129993](https://github.com/NousResearch/hermes-agent/issues/129993)（8 条评论）指出桌面端在同一回复气泡折叠时会出现重复渲染，尽管数据库仅存一行。相关的 [Issue #123801](https://github.com/NousResearch/hermes-agent/issues/123801)（22 条评论）在 macOS 端复现了此问题，社区对界面数据一致性的诉求极为强烈。
*   **跨网关协作构想**：[Issue #97681](https://github.com/NousResearch/hermes-agent/issues/97681)（33 条评论，4 个赞）探讨了让不同用户或不同机器上的 Bots 在保持本地控制的前提下进行跨网关协作的架构设计，标志着项目正在向更复杂的多智能体网络演进。
*   **性能追踪器**：[Issue #127647](https://github.com/NousResearch/hermes-agent/issues/127647)（28 条评论）作为性能追踪器，系统性排查桌面端空闲时的 CPU/GPU 消耗与内存泄漏，社区对提升日常运行效率的期望很高。
*   **高票数诉求**：[Issue #18715](https://github.com/NousResearch/hermes-agent/issues/18715)（36 个赞）强烈要求支持远程 Hermes Agent 搭配本地工具执行，以实现计算与存储解耦；[Issue #38519](https://github.com/NousResearch/hermes-agent/issues/38519)（16 个赞）则希望提供纯前端 Desktop 安装选项，方便已有后端环境的用户。

### 5. Bug 与稳定性
今日报告了多个影响核心体验的 Bug，按严重程度与修复状态排列如下：
*   **P1 级 - 部署与启动阻断**
    *   **macOS launchd 服务启动失败**：[Issue #125375](https://github.com/NousResearch/hermes-agent/issues/125375) 报告使用 PM venv 启动网关时，尽管提示成功，但生成的 launchd 服务无法启动。目前处于 OPEN 状态，未见直接 Fix PR。
    *   **Windows 更新失败**：[Issue #123971](https://github.com/NousResearch/hermes-agent/issues/123971) 指出在 Windows 上通过 Desktop 启动网关后，`hermes update` 总是报告失败（exit 1），导致更新流程中断。目前已有相关修复推进中（[PR #124807](https://github.com/NousResearch/hermes-agent/issues/124807) 关联处理）。
*   **P2 级 - 功能缺陷与崩溃**
    *   **MCP 客户端数组参数解析错误**：[Issue #99270](https://github.com/NousResearch/hermes-agent/issues/99270) 发现 MCP client 在调用 `tools/call` 时，错误地将数组参数中的每个元素包裹为 `{item: ...}` 格式，破坏了所有数组类型的入参。目前为 OPEN 状态。
    *   **Dashboard 内存泄漏**：[Issue #46082](https://github.com/NousResearch/hermes-agent/issues/46082) 报告 Dashboard 进程存在严重内存泄漏，占用飙升至 5.2GB 导致 OOM-Killed。此 Bug 自 6 月起持续跟踪至今，尚未彻底解决。
    *   **Group Chat 死锁**：[Issue #123347](https://github.com/NousResearch/hermes-agent/issues/123347) 指出 Group Chat hosted-room worker 启动时因 `tui_gateway.server` 的导入链触发 `_frozen_importlib._DeadlockError`。目前为 OPEN 状态。
    *   **远程会话加载异常**：[Issue #70445](https://github.com/NousResearch/hermes-agent/issues/70445) 描述在远程/VPS 后端下，会话加载缓慢、切换取消且偶尔死循环，对高延迟网络环境用户体验影响较大。目前为 OPEN 状态。

### 6. 功能请求与路线图信号
基于高互动 Issue 和活跃的 PR 开发状态，预判下一版本路线图将聚焦以下方向：
*   **跨网关 Bots 协同（高优）**：基于 [Issue #97681](https://github.com/NousResearch/hermes-agent/issues/97681) 的热烈讨论，跨机器、跨用户的 Bots 协作架构（无需交出本地控制权的通信层）极有可能被纳入下一阶段的核心研发计划。
*   **本地工具解耦执行（高优）**：[Issue #18715](https://github.com/NousResearch/hermes-agent/issues/18715) 的高票表明用户对 Agent 云端大脑 + 本地工具/存储架构的需求迫切，预计会增加对分离式配置的支持。
*   **系统提示词瘦身与懒加载**：[Issue #2045](https://github.com/NousResearch/hermes-agent/issues/2045)（10 条评论）提出随着技能增多，将所有技能列表注入系统提示词浪费了大量 Token，呼吁使用按需加载（Lazy loading）工具替代。同时 [Issue #844](https://github.com/NousResearch/hermes-agent/issues/844) 提出的本地 RAG 知识库系统（检索管道）也获得了持续关注。
*   **桌面端纯前端化**：[Issue #38519](https://github.com/NousResearch/hermes-agent/issues/38519) 提出的不安装 Agent 核心、仅安装 UI 并连接远程后端的方案，有望作为模块化打包选项推出。

### 7. 用户反馈摘要
*   **痛点 1 - UI 信任度受损**：多个关于桌面端双渲染（如 [Issue #127665](https://github.com/NousResearch/hermes-agent/issues/127665)）的讨论表明，用户无法信任当前 UI 展示的数据是否与底层数据库（`state.db`）完全一致，这种"幻象"严重影响了专业场景下的可靠性评估。
*   **痛点 2 - 跨平台部署地狱**：在 [Issue #122402](https://github.com/NousResearch/hermes-agent/issues/122402)（Ubuntu 缺 clang++）和 [Issue #123971](https://github.com/NousResearch/hermes-agent/issues/123971)（Windows 更新失败）中，用户抱怨自动化更新与依赖管理（PM）工具在极端或部分缺失系统环境时，缺乏优雅的降级或详细诊断手段，常导致更新直接阻断。
*   **场景痛点 - 长连接与弱网**：[Issue #70445](https://github.com/NousResearch/hermes-agent/issues/70445) 反映出在跨洋或 VPS 等弱网环境（如 Feishu 慢速传输，见 [PR #125990](https://github.com/NousResearch/hermes-agent/pull/125990)）下，网关的断线重连机制及消息重放（Replay）逻辑尚不成熟，容易丢失早期的 Restart 通知。
*   **积极反馈**：用户对于社区主动修复安全隐患（如 [PR #131874](https://github.com/NousResearch/hermes-agent/pull/131874) 修复 0644 权限漏洞）和提供细粒度终端审批控制（[PR #130912](https://github.com/NousResearch/hermes-agent/pull/130912)）给予了高度评价，认为这增强了作为"个人智能体"的安全底线。

### 8. 待处理积压
以下长期未解决的重要问题需要维护者优先关注，以防产生技术债务：
*   **Dashboard 内存泄漏（OOM）**：[Issue #46082](https://github.com/NousResearch/hermes-agent/issues/46082) 自 6 月持续 4 个月未闭环，导致用户在长时运行下 Dashboard 被迫重启，严重消耗了系统资源。
*   **MCP 授权缺陷**：[Issue #89412](https://github.com/NousResearch/hermes-agent/issues/89412)（13 条评论）指出部分 MCP 服务器（如 Google 的 Gmail MCP）如果未在首次连接时返回 401 challenge，会导致 OAuth 流程无法自动触发，相关认证机制缺乏兼容性补丁。
*   **历史停滞报告（Stall/Hang）根因**：[Issue #84047](https://github.com/NousResearch/hermes-agent/issues/84047)（10 条评论）对 77 个停滞报告进行了分类，指出 7 种不同的底层机制以及三分之一的问题实为安装器缺陷。这个庞大的分类库需要被逐一拆解，转化为具体的修复任务分配给开发者。
*   **Python 运行时管理（PM）稳定性**：除了前文提到的 [PR #129306](https://github.com/NousResearch/hermes-agent/pull/129306)，PM 工具在进行环境准备、历史接管和 Python 隔离（如 [Issue #122402](https://github.com/NousResearch/hermes-agent/issues/122402) 中的 `python-olm` 编译失败）时暴露出诸多脆弱点，建议安排专门的重构窗口清理 PM 模块的遗留分支与边界条件。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 (2026-10-03)

## 1. 今日速览
过去 24 小时内，AstrBot 项目社区活跃度显著回升，共处理 Issues 22 条（新开/活跃 16 条，关闭 6 条）和 Pull Requests 43 条（待合并 33 条，合并/关闭 10 条）。今日核心进展集中在 **WebUI 体验优化**（日志搜索、首次运行向导、macOS 原生窗口）与 **Agent 核心稳定性修复**（空回复处理、后台任务取消机制），同时解决了影响所有插件平台适配器的 Logo 破图回归 Bug。尽管无新版本发布，但代码层面在 Provider 扩展性与权限安全性上均有实质推进，整体项目健康度良好，但长期积压的大型 Provider 特性 PR 仍需关注。

## 2. 版本发布
*无新版本发布。*

## 3. 项目进展
今日合并/关闭的 10 条 PR 主要解决了关键回归 Bug 并推进了 WebUI 核心功能，主要进展如下：
*   **核心 WebUI 体验升级**：
    *   合并了 [PR #10327](https://github.com/AstrBotDevs/AstrBot/pull/10327)，为控制面板日志流实现了**关键词搜索与高亮功能**，响应了社区长期需求（Issues #10325, #9718），大幅提升了调试便捷性。
    *   合并了 [PR #10227](https://github.com/AstrBotDevs/AstrBot/pull/10227)，为 AstrBot 桌面端引入**原生 macOS 窗口外观**，纯 CSS/Bridge 驱动，显著改善了桌面端原生体验。
    *   合并了 [PR #10296](https://github.com/AstrBotDevs/AstrBot/pull/10296)，修复了 WebUI 聊天选择器中默认配置名称未本地化的问题。
*   **关键回归与稳定性修复**：
    *   合并了 [PR #10291](https://github.com/AstrBotDevs/AstrBot/pull/10291) 与 [PR #10318](https://github.com/AstrBotDevs/AstrBot/pull/10318)，修复了 CI 矩阵红码（Tests 回归）以及所有声明 `logo_path` 的插件平台适配器 logo 出现 404 破图的**严重回归问题**，恢复了 WebUI 的正常视觉呈现。
    *   合并了 [PR #10005](https://github.com/AstrBotDevs/AstrBot/pull/10005)，正式新增了**三个 OpenCode Go 服务商模板**，通过专用入口自动补齐 `x-opencode-session` 等必需请求头，解决了该服务商协议接入问题。

## 4. 社区热点
基于评论数与创建时间，今日最活跃的讨论集中在以下三个议题：
*   **日志系统体验痛点 (10308, 9718)**：
    *   [Issue #10308](https://github.com/AstrBotDevs/AstrBot/issues/10308) 和 [Issue #9718](https://github.com/AstrBotDevs/AstrBot/issues/9718) 在更新后均保持 6 条评论，主要探讨日志引用消息异常定位难、日志缺乏持久化及关键词搜索功能。*注：搜索功能已在 PR #10327 中解决，但日志按插件分类（如 [Issue #9850](https://github.com/AstrBotDevs/AstrBot/issues/9850)）仍受关注*。
*   **自定义 UI 侧边栏 Bug (10313, 10312)**：
    *   [Issue #10313](https://github.com/AstrBotDevs/AstrBot/issues/10313) 与 [Issue #10312](https://github.com/AstrBotDevs/AstrBot/issues/10312) 在更新后各拥有 3 条和 2 条评论，集中反映了近期界面布局更改导致的侧边栏失效、出现空白模块且无法拖拽的 Bug。
*   **核心功能与生态扩展 (10295, 10276)**：
    *   [Issue #10295](https://github.com/AstrBotDevs/AstrBot/issues/10295)（3 评论）提议为 STT/TTS 增加 Mossland API 提供商。
    *   [Issue #10276](https://github.com/AstrBotDevs/AstrBot/issues/10276)（3 评论）来自外部厂商，提议引入跨通道的**用户级长期记忆机制**，旨在实现跨会话的用户偏好保持。

## 5. Bug 与稳定性
按严重程度排列今日报告/更新的 Bug 问题：
*   **[高] 知识库 Open API 路由权限死锁** ([Issue #10322](https://github.com/AstrBotDevs/AstrBot/issues/10322))
    *   *问题*：所有知识库相关接口对 API Key 调用必然返回 403。因知识库路由要求的 scope `kb` 未被包含在 `ALL_OPEN_API_SCOPES` 白名单中，导致权限系统无法授予该权限。
    *   *状态*：待修复。此为 Open API 设计的重大逻辑漏洞，影响第三方程序对接。
*   **[中] Web UI 自定义侧边栏失效** ([Issue #10312](https://github.com/AstrBotDevs/AstrBot/issues/10312), [Issue #10313](https://github.com/AstrBotDevs/AstrBot/issues/10313))
    *   *问题*：最近界面布局修改引发回归，自定义侧边栏出现空模块且拖拽功能完全失效。
    *   *状态*：已确认，待 WebUI 维护团队跟进。
*   **[中] 引用语音消息触发严重异常** ([Issue #10336](https://github.com/AstrBotDevs/AstrBot/issues/10336))
    *   *问题*：使用 OneBot v11 适配器时，若引用 `file/url` 均为空的语音消息，裸调用 `convert_to_file_path` 抛出 `not a valid file` 异常，整轮 Agent 运行失败且将报错文本直接发给用户。
    *   *状态*：新报告，涉及多平台消息解析异常防护，需尽快拦截异常并返回友好提示。
*   **[低] WebChat 个人偏好刷新后重置** ([Issue #10316](https://github.com/AstrBotDevs/AstrBot/issues/10316))
    *   *问题*：在 v4.29.0-beta.1 中，WebChat 设置的“流式输出”、“显示思考内容”和“发送快捷键”刷新后不保留，而“SSE/WebSocket”却能保留，持久化策略不一致。
    *   *状态*：社区用户已表示愿意提交 PR 参照已有 SSE 持久化逻辑进行修复。
*   **[低] 插件 README 目录锚点失效** ([Issue #10333](https://github.com/AstrBotDevs/AstrBot/issues/10333))
    *   *问题*：Markdown 锚点 `#` 与前端路由的 Hash 模式冲突，导致点击目录后路由跳转错误。
    *   *状态*：新报告，前端渲染层缺陷。

## 6. 功能请求与路线图信号
结合今日 Open Issues 与现有 PR 进展，以下功能请求极有可能在后续版本中落地：
*   **首次运行向导与界面优化**：
    *   [PR #10329](https://github.com/AstrBotDevs/AstrBot/pull/10329)（待合并）已开发并提交了首次运行配置指南，降低新用户门槛；[PR #10332](https://github.com/AstrBotDevs/AstrBot/pull/10332) 正在优化 DeepSeek 提供商图标。
    *   [Issue #10335](https://github.com/AstrBotDevs/AstrBot/issues/10335) 提议在 WebUI 补充“导入人格”的格式说明及限制（如不可导入 Tools），改善用户体验。
*   **多提供商扩展**：
    *   [Issue #10295](https://github.com/AstrBotDevs/AstrBot/issues/10295) 提出增加 **Mossland API** 支持，与近期 OpenCode Go 的顺利接入（PR #10005）一致，社区正快速填补语音与特定 API 生态空白。
*   **Agent 记忆能力**：
    *   [Issue #10276](https://github.com/AstrBotDevs/AstrBot/issues/10276) 提出的**用户级长期记忆**功能，涉及跨会话状态管理，若被采纳将显著提升 AstrBot 作为核心 AI 助手的价值。

## 7. 用户反馈摘要
*   **痛点一：开发/调试环境体验不足**。用户频繁反馈（如 Issue #9850）日志混合、缺乏针对插件粒度的筛选功能，导致调试复杂插件时“翻日志”极其困难。
*   **痛点二：系统级边界与权限控制**。如 Issue #10326 指出，在无沙箱的 Windows 平台上，普通成员角色对工作区文件的访问权限被过度限制（此前角色化权限重构 #9472 引入时产生的副作用），期望在保障安全（隔离）的前提下恢复普通成员的基本文件访问与文档检索能力。
*   **满意度：核心 Agent 行为修正**。社区开发者正在密切投入修复 Agent 底层边界问题，包括 PR #10303（修复模型输出空文本时直接结束的运行缺陷）、PR #10297（跳过无工具纯文本输出的空循环）、PR #9913（处理超出 `max_step` 时的模型幻觉工具调用），使 Agent 的容错能力显著增强。

## 8. 待处理积压
以下重要 PR 长期未合并/响应，需维护者介入评估以解开技术债或功能瓶颈：
*   **[XXL] OpenAPI 聊天权限安全修复**：[PR #8619](https://github.com/AstrBotDevs/AstrBot/pull/8619) 提交于 2026-06-06。该 PR 修复了由于 `username` 注入导致的权限提升风险。涉及系统级安全，目前仍处于 CLOSED 状态（或已被其他方案取代？需核实状态），若无替代方案，强烈建议重新审视合入。
*   **[XXL] Codex OAuth 与 GPT-6.1 提供商支持**：[PR #6322](https://github.com/AstrBotDevs/AstrBot/pull/6322) 自 2026-03-15 提交至今仍未合并。作为重磅 Provider 特性（含流式解析与多协议支持），长期未推进可能影响 AstrBot 在全新模型生态中的接入体验。
*   **[L] 日志筛选与持久化核心功能**：[PR #7112](https://github.com/AstrBotDevs/AstrBot/pull/7112) 旨在实现控制面板日志过滤及持久化。虽然 PR #10327 已补充了搜索高亮，但该大型 PR 的完整功能（如 sqlite 存储、分类过滤）仍需推动。
*   **[L] Provider 调用计量与用量归因**：[PR #9692](https://github.com/AstrBotDevs/AstrBot/pull/9692) 修复了 Token 消耗在失败/取消时无法独立归因至对应 Session/Plugin 的计费准确性问题，对多租户或高级场景下成本管理非常重要，需加快 Review 进度。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报 (2026-10-03)

**数据截止**：2026-10-02 23:59 UTC | **数据来源**：GitHub Discussions (153条新增) | **Releases**：无

## 1. 今日速览
DeepSeek Harness 今日社区活跃度极高，24小时内新增153条 Discussions，主要集中在平台兼容性（Linux/Windows）、插件生态扩展及底层架构缺陷。项目当前处于 `0.2.0-rc.2` 预发布阶段，未正式发版，但代码已同步至最新 HEAD。社区热点从“功能许愿”向“深度 Bug 排查”与“插件市场落地”转移，尤其是 Windows 平台在沙箱环境下的稳定性问题成为焦点。尽管暂无新 Release 发布，但基于 Discussions 的高频反馈，官方需重点审视 Windows ACL 沙箱及 CJS 解析钩子的稳定性。

## 2. 版本发布
**无新版本发布**。
注：根据 GitHub Releases 数据，过去 24 小时内无新 Release 产出。当前社区讨论提及的最新稳定/RC 版本号为 `0.2.0-rc.2`。

## 3. 项目进展
由于该仓库未启用 PR 且无新 Release，此处基于 Discussions 中反映的代码行为与插件开发进展进行推导：

*   **插件生态爆发**：社区开发者发布了 `dsh-genbox-plugin` (v0.1.0)，实现了 Agent 直接生图、改图及本地 ffmpeg 剪辑功能，表明 Harness 的插件机制已具备成熟的媒体生成能力扩展。[链接](https://github.com/deepseek-ai/deepseek-harness/discussions/8669)
*   **SDK 集成深化**：针对非 Node.js 宿主应用，社区正在推进 `dsh-sdk-jsonrpc-server` 的嵌入式集成，重点解决 `user-interaction` (如审批、提问) 的跨进程通信协议。[链接](https://github.com/deepseek-ai/deepseek-harness/discussions/4708)
*   **桌面端体验优化尝试**：有用户贡献了桌面版会话窗口 `Ctrl+F` 搜索功能的原型插件，底层全文检索引擎已就位，但因默认未开启入口导致体验缺失。[链接](https://github.com/deepseek-ai/deepseek-harness/discussions/8713)

## 4. 社区热点
今日讨论最活跃的主题集中在“被遗忘的平台”与“新手体验障碍”：

1.  **Linux 支持缺位 (High Heat)**：用户抱怨 Linux 平台长期被遗忘，目前仅 WorkBuddy 和 Qoder 等第三方工具支持，原生 DeepSeek Harness 及其主要竞品均未完善 Linux 支持。[链接](https://github.com/deepseek-ai/deepseek-harness/discussions/8107)
2.  **新手工作区概念混乱**：新用户反馈“每个对话必须一个新工作区”的设计极其反直觉，导致插件安装位置混乱、状态丢失（如 Godot 开发场景），强烈呼吁提供类似网页版的“主会话/主工作区”模式。[链接](https://github.com/deepseek-ai/deepseek-harness/discussions/8634)
3.  **插件展示与分享**：`[Show Your Plugins!]` 类别活跃度上升，用户乐于分享集成本地模型（LM Studio）与媒体生成（GenBox）的插件经验。[链接](https://github.com/deepseek-ai/deepseek-harness/discussions/8669)

## 5. Bug 与稳定性
**警告：Windows 平台稳定性风险极高，且存在底层架构级缺陷。**

| 严重程度 | 问题描述 | 状态/Root Cause | 链接 |
| :--- | :--- | :--- | :--- |
| **Critical** | **Windows ACL 沙箱导致 `workspace-write` 不可用**：DSH `0.2.0-rc.2` 在 Windows 10/11 下，由于 `busybox-w32` 与 ACL 沙箱交互缺陷，无法执行写操作。 | Open | [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/8485) |
| **Critical** | **CJS 解析钩子崩溃**：`dsh-app-boot` 在处理 `require('process/')` 时，`resolve.paths()` 返回 null，导致插件 failed to import。 | Open | [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/8674) |
| **High** | **Windows 桌面端 Shell 工具崩溃**：双击启动的桌面端下，所有 Shell 调用报 `STATUS_DLL_INIT_FAILED (0xC0000142)`，而命令行 `dsh web` 正常。 | Open | [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/6822) |
| **High** | **生命周期 Handoff 契约缺失**：父 Agent 销毁时，子 Agent 被孤儿化。这是一个生产环境常态问题，非边缘案例，已有社区参考修复方案。 | Open | [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/4909) |
| **Medium** | **Cordis 预设丢失文件系统技能**：Desktop 端 `cordis` preset 的 skill provider 指向 `app.asar` 内部，导致无法访问本地文件系统技能。 | Open | [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/8649) |
| **Medium** | **图片格式兼容性**：`dsh-llm-pi-ai` 直接透传用户粘贴的图片，导致 LM Studio 等严格后端拒绝 webp/heic 格式。 | Open | [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/4615) |

*注：以上 Bug 均无关联的已合并 Fix PR，均为 Open 状态。*

## 6. 功能请求与路线图信号

*   **跨平台对等支持 (Linux)**：用户强烈要求补齐 Linux 支持。鉴于 WorkBuddy/Qoder 已实现，官方路线图应优先解决 Linux 下的沙箱与 Shell 适配问题。[链接](https://github.com/deepseek-ai/deepseek-harness/discussions/8107)
*   **会话内搜索功能**：底层检索引擎已存在，仅需在桌面端 UI 暴露 `Ctrl+F` 入口。此功能成本低、用户感知强，预计将进入下一版本。[链接](https://github.com/deepseek-ai/deepseek-harness/discussions/8713)
*   **Workspace 模型重构**：从“每对话一工作区”转向“全局/主工作区 + 临时工作区”的混合模型，以解决状态保持与资源管理痛点。[链接](https://github.com/deepseek-ai/deepseek-harness/discussions/8634)

## 7. 用户反馈摘要

*   **痛点 (Pain Points)**：
    *   **新手引导缺失**：小白用户表示“使用一小时糟糕的体验”，核心在于不理解 Workspace 的生命周期与插件安装位置逻辑。
    *   **稳定性焦虑**：模型请求经常无故重试，用户已排查网络无果，怀疑是 Harness 内部连接池或心跳机制问题。[链接](https://github.com/deepseek-ai/deepseek-harness/discussions/7597)
    *   **本地模型冷启动**：重启电脑后 VRAM 清空，本地模型推理超时（>5分钟）导致对话中断，缺乏可配置的超时机制。[链接](https://github.com/deepseek-ai/deepseek-harness/discussions/6553)
*   **亮点 (Highlights)**：
    *   **插件机制灵活性**：用户成功通过插件集成 GenBox 和 Godot Bridge，证明了 Harness 作为 Agent 编排框架的扩展性。
    *   **社区自我修复能力**：针对复杂 Bug（如生命周期孤儿化），社区能独立定位 Root Cause 并提供参考补丁，生态正从“被动反馈”向“主动共建”转变。

## 8. 待处理积压

*   **[Architecture] Lifecycle handoff contract (#4909)**：创建于 2026-08-28，已持续 36 天。涉及多 Agent 架构的核心稳定性问题，评论数持续增加，建议维护者优先评估并入 `0.2.0` 或 `0.3.0`。
*   **[Windows] Sandbox & Shell Crashes (#1613, #6822, #8485)**：三个高热度 Windows 平台 Bug 均停滞在 `0.2.0-rc.2` 阶段，若 Windows 用户占比高，此积压将严重阻碍正式版发布。
*   **[General] Workspace Create Failure (#8357)**：网关服务不可用 (`workspaceController` unavailable) 问题，疑似后端依赖缺失或配置错误，需官方确认是否为特定版本的环境缺陷。

**建议行动**：
1.  官方团队应优先修复 Windows ACL 沙箱与 CJS 解析钩子的崩溃问题，以保障基础可用性。
2.  针对 Linux 支持，需明确时间表，避免社区因“被遗忘”产生负面情绪。
3.  考虑将“会话内搜索”作为快速胜利 (Quick Win) 纳入下一个迭代，以提升桌面端基本体验。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*