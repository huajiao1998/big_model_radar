# OpenClaw 生态日报 2026-10-17

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-17 00:02 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 (2026-10-17)

## 1. 今日速览
OpenClaw 项目当前处于高并发维护状态，过去 24 小时新增/活跃 Issues 374 条，PR 更新 500 条，社区活跃度极高。新版本 `v2026.10.4` 重点修复了 Gateway 在系统休眠或时钟跳跃后的心跳误判导致的重启问题，提升了核心服务的稳定性。然而，项目仍面临严重的“长尾”稳定性挑战，涉及 SQLite WAL 文件无限增长、Windows 平台启动阻塞、以及插件源码捕获机制导致的高磁盘磨损等 P0/P1 级问题，部分问题已演变为发布阻断项（Release Blockers）。

## 2. 版本发布
**v2026.10.4 发布**
- **核心修复**：Gateway 不再因计算机休眠或系统时钟跳跃导致的心跳（Ownership Heartbeat）数据陈旧而自我重启。此修复解决了长期困扰用户的非正常重启循环。
- **相关 PR/Issue**：[#170790](https://github.com/openclaw/openclaw/issues/170790)
- **致谢**：@AnvinaLI, @sgh6688, @waynegault, @RomneyDa
- **迁移注意**：无破坏性变更，建议用户升级到该版本以解决休眠后的服务中断问题。
- **链接**：[Releases](https://github.com/openclaw/openclaw/releases)

## 3. 项目进展
今日 PR 活动频繁，侧重于性能优化与内部架构重构：
- **性能优化**：
    - 跳过直接本地客户端的 WebSocket 压缩，解决之前引入的 RPC 延迟回归问题 ([#174848](https://github.com/openclaw/openclaw/pull/174848))。
    - 在关联会话间共享 GitHub 选项发现结果，减少冷启动时的 Git 命令调用 ([#174864](https://github.com/openclaw/openclaw/pull/174864))。
    - 优化后提交重载工作，避免配置变更后重新扫描插件元数据 ([#174860](https://github.com/openclaw/openclaw/pull/174860))。
- **稳定性修复**：
    - 修复在另一个代理被删除时，Codex 运行时回合失败的问题 ([#174774](https://github.com/openclaw/openclaw/pull/174774))。
    - 恢复仅包含推理或裸露工具调用的已结算回合的答案，防止缺失最终回复 ([#174376](https://github.com/openclaw/openclaw/pull/174376))。
    - 解决子代理完成来源缺失导致的反复警告问题 ([#174850](https://github.com/openclaw/openclaw/pull/174850))。
- **代码质量**：
    - 移除低价值测试及冗余代码批次 ([#174816](https://github.com/openclaw/openclaw/pull/174816), [#174747](https://github.com/openclaw/openclaw/pull/174747))。
    - 重构 Linux gateway 测试及 CLI 线程创建测试 ([#174862](https://github.com/openclaw/openclaw/pull/174862), [#174863](https://github.com/openclaw/openclaw/pull/174863))。

## 4. 社区热点
以下 Issue 因影响范围广或技术复杂度高，获得了大量社区关注：

1.  **SQLite WAL 无限增长导致 Gateway 启动受阻 (P0)**
    - **摘要**：单个代理的 `agent/openclaw-agent.sqlite-wal` 文件在几天内增长至 1.4-2.8 GB，且 `wal_autocheckpoint` 失效，直接阻断 Gateway 启动。
    - **热度**：131 条评论。
    - **链接**：[#143524](https://github.com/openclaw/openclaw/issues/143524)
2.  **Gateway 状态 DB WAL 自动检查点从未完成**
    - **摘要**：Gateway 自身的 WAL 自动检查点被进程内读者阻塞，自启动以来从未成功，导致日志显示 `checkpointedFrames` 远低于 `logFrames`。
    - **热度**：18 条评论。
    - **链接**：[#164294](https://github.com/openclaw/openclaw/issues/164294)
3.  **插件源码捕获机制导致严重 SSD 磨损**
    - **摘要**：自 2026.9.5 起，每个加载插件的进程都会重新复制并哈希所有插件文件（包括原生二进制），单次 CLI 命令写入 1.1-1.4 GB，Gateway 启动写入 6.5 GB，无重用机制。
    - **热度**：18 条评论。
    - **链接**：[#157989](https://github.com/openclaw/openclaw/issues/157989)
4.  **Windows 启动回归：耗时剧增**
    - **摘要**：2026.10.1 版本在 Windows 上启动时间从 ~410s 激增至 ~1030s，主要瓶颈在 `sidecars.control-ui-assets` 阶段。
    - **热度**：15 条评论。
    - **链接**：[#168955](https://github.com/openclaw/openclaw/issues/168955)

## 5. Bug 与稳定性
按严重程度排列今日报告的关键 Bug：

### P0 - 发布阻断/严重崩溃
- **Agent SQLite WAL 增长阻塞 Gateway 启动** ([#143524](https://github.com/openclaw/openclaw/issues/143524))
  - *状态*：Open，无明确 Fix PR，需维护者审查。
  - *影响*：Windows 平台，WAL 文件巨大导致启动失败。
- **Gateway 启动阻塞事件循环 40-200s 引发重启循环** ([#162211](https://github.com/openclaw/openclaw/issues/162211))
  - *状态*：Open。
  - *影响*：macOS/darwin，健康监控误判为断开连接并触发重启。
- **Windows Scheduled Task 模式冷启动挂起或静默退出** ([#140161](https://github.com/openclaw/openclaw/issues/140161))
  - *状态*：Open。
  - *影响*：Windows 下通过 VBS 启动器引导时，冷启动挂起 5-7 分钟或退出码为 0 无日志。

### P1 - 高优先级功能故障
- **并发运行导致回复丢失 (Session Lane Displacement)** ([#148707](https://github.com/openclaw/openclaw/issues/148707))
  - *摘要*：2026.9.4 回归，同一会话上的第二次运行会取代正在进行的回合，导致 `Reply operation has no active tool authority snapshot` 错误及回复丢失。
- **LLM 嵌入请求返回 HTTP 500 (LLM.cpp Manager)** ([#159356](https://github.com/openclaw/openclaw/issues/159356))
  - *摘要*：LLM.cpp 管理器在子进程退出时仍报告 ready，导致嵌入请求失败，可能与内存压力有关。
- **大型 SQLite 转录清理阻塞 Gateway 事件循环** ([#112423](https://github.com/openclaw/openclaw/issues/112423))
  - *摘要*：在会话清理期间，大型 SQLite 转录的归档操作在主线程上执行完整物化、压缩和 I/O，阻塞事件循环。
- **MCP 工具调用整数参数被强制转换为字符串** ([#166133](https://github.com/openclaw/openclaw/issues/166133))
  - *摘要*：MCP wrapper 将 JSON-RPC 中的 number 类型参数错误地转换为 string，导致 MCP 服务端拒绝请求。
- **更新过程 Hang 死在 post-activation doctor 步骤** ([#173764](https://github.com/openclaw/openclaw/issues/173764))
  - *摘要*：2026.10.10-beta.1 中，更新后的 doctor 步骤无超时机制，导致 Gateway 长期不可用。

### 已有 Fix PR 的 Bug
- **Codex 在代理删除期间失败** ([#174774](https://github.com/openclaw/openclaw/pull/174774)) - 对应修复已提交。
- **LiteLLM 模型选择错误** ([#174818](https://github.com/openclaw/openclaw/pull/174818)) - 修复交互式 onboarding 中选择代理未服务模型的问题。

## 6. 功能请求与路线图信号
- **SecretRef 支持在 MCP 环境变量中** ([#76493](https://github.com/openclaw/openclaw/issues/76493))
  - *诉求*：当前 `mcp.servers[].env` 仅支持基本类型，拒绝 SecretRef 对象，阻碍了安全最佳实践（密钥间接引用）的实施。
  - *状态*：Open，标记为 `needs-product-decision` 和 `needs-security-review`。
- **Output Guards: 捕获伪工具调用与流重复** ([#138245](https://github.com/openclaw/openclaw/issues/138245))
  - *诉求*：用户报告模型偶尔输出大量重复文本或纯文本伪工具调用，污染会话历史。请求增加输出守卫机制。
  - *状态*：Open，处于产品决策阶段。
- **记忆 Wiki 补充耗尽后备忽略工具截止时间** ([#104719](https://github.com/openclaw/openclaw/issues/104719))
  - *诉求*：当候选项不足时，Wiki 补充机制会重新解析所有剩余 Markdown 页面，忽略截止时间，导致性能问题。
  - *状态*：Open，已有链接的 PR 打开中。

## 7. 用户反馈摘要
- **痛点 1：Windows 平台可靠性低**
  - 多个 Issue ([#140161](https://github.com/openclaw/openclaw/issues/140161), [#168955](https://github.com/openclaw/openclaw/issues/168955), [#170956](https://github.com/openclaw/openclaw/issues/170956)) 集中反映了 Windows 下启动慢、重启不可靠、计划任务权限错误等问题。用户反馈“经过多次尝试才成功”，严重影响生产环境使用。
- **痛点 2：磁盘 I/O 与磨损**
  - 用户强烈抱怨插件源码捕获机制 ([#157989](https://github.com/openclaw/openclaw/issues/157989), [#162585](https://github.com/openclaw/openclaw/issues/162585)) 导致的高写入量，认为这是 SSD 寿命杀手。
- **满意点/积极信号**
  - v2026.10.4 修复休眠重启问题后，部分长期受困扰的用户表示欢迎。
  - 社区对于 `clawsweeper` 自动分类标签系统的活跃度有所认可，尽管标签复杂，但有助于定位问题类型。

## 8. 待处理积压
- **长期未响应的 P0/P1 Issue**：
  - [#143524](https://github.com/openclaw/openclaw/issues/143524) (SQLite WAL 增长) 自 9 月创建，至今 131 评论，但标记为 `no-new-fix-pr`，需维护者优先介入。
  - [#112423](https://github.com/openclaw/openclaw/issues/112423) (大型转录清理阻塞) 创建较早，持续阻塞事件循环，影响会话清理性能。
  - [#76493](https://github.com/openclaw/openclaw/issues/76493) (MCP SecretRef) 涉及安全合规，长期处于 `needs-product-decision` 状态，建议尽快明确路线图位置。
- **建议**：维护者需优先处理 Windows 启动与 SQLite WAL 相关的 P0 问题，这些是阻碍用户升级和稳定运行的关键障碍。

---

## 横向生态对比

**2026-10-17 开源 AI 智能体生态横向对比分析报告**

**1. 生态全景**
2026年10月17日，个人 AI 助手与自主智能体开源生态呈现**“高并发维护、稳定性攻坚、架构解耦”**的整体态势。OpenClaw 与 hermes-agent 处于极高的代码提交压力期，集中解决网关休眠、会话状态同步及内存泄漏等 P0 级稳定性问题，反映出行业从“功能堆砌”向“生产级可靠性”转型。Zeroclaw、PicoClaw 和 AstrBot 则侧重于渠道（Channels）多模态支持（如 QQ、WhatsApp、DingTalk）的适配与安全沙箱权限细化。DeepSeek Harness 通过高频 Alpha 迭代快速修补 Windows 沙箱缺陷，显示出生态竞争已从单纯模型接入转向底层运行时（Runtime）与操作系统级安全隔离的深度较量。整体而言，生态正面临 Windows 平台兼容性、长尾存储（SQLite WAL）增长及插件热重载安全性三大共性挑战。

**2. 各项目活跃度对比**

| 项目 | 24h Issues | 24h PRs | Release 状态 | 核心焦点 | 健康度评估 |
| :--- | :---: | :---: | :--- | :--- | :--- |
| **OpenClaw** | 374 | 500 | v2026.10.4 (已发布) | Gateway 心跳修复、SQLite WAL 治理、插件 I/O 优化 | **高危**：活跃度极高，但 P0 级存储阻塞与 Windows 启动回归未决，存在发布阻断风险。 |
| **Zeroclaw** | 31 | 50 | 无 | 插件安全准入、多渠道（Telegram/WhatsApp）Bug 修复、WASM 宿主整合 | **良好**：社区贡献密集，正稳步推进 v0.9.0 网关分离，CI 尺寸限制为潜在阻塞项。 |
| **PicoClaw** | 2 (1开1关) | 4 | 无 | QQ 通道自研解耦、Cron 时区修复、Android DNS 解析 | **平稳**：高产出低互动，基础架构健壮性加固，Android 端网络问题需紧急关注。 |
| **QwenPaw** | 15 | 30 | 无 | 控制台 UX 优化、DingTalk 降级修复、Chat 历史膨胀治理 | **活跃**：聚焦用户体验与性能优化，v2.2.2 稳定版维护并行新特性预研，无停滞迹象。 |
| **hermes-agent** | 459 | 500 (400 待合并) | 无 | 网关状态同步、Scratch 目录安全、多平台消息投递 | **高压**：极高强度迭代，面临严重的会话拥有权回归与数据静默删除风险，维护压力大。 |
| **AstrBot** | 16 | 19 | 无 | 会话内存泄漏修复、Edge TTS 回归、Windows 沙箱权限 | **稳健**：集中攻克底层架构健壮性与核心通道回归，社区对云原生场景适配需求强烈。 |
| **DeepSeek Harness** | 147 (Discussions) | 无 (Releases 驱动) | dsh-v0.2.1-alpha.5 | Windows 沙箱崩溃修复、终端性能优化、插件 UI 定制 | **快速迭代**：通过高频 Alpha 修补 Windows ACL 缺陷，Linux 支持缺位引发社区不满。 |

**3. OpenClaw 在生态中的定位**
*   **优势**：OpenClaw 在生态中处于**核心参照（Core Reference）**地位，拥有最大的社区基数（374+ Issues）和最复杂的插件/网关架构。其 `v2026.10.4` 对 Gateway 心跳机制的修复直接解决了长期困扰生产环境的休眠重启问题，确立了其在高可用性场景下的技术领导地位。
*   **技术路线差异**：相比 Zeroclaw 的 WASM 安全隔离与 DeepSeek Harness 的 OS 级 ACL 沙箱，OpenClaw 更侧重于**内部状态机与存储层**的优化（如 SQLite WAL 治理、插件源码捕获机制）。其架构强调“长尾稳定性”，试图在功能丰富度与磁盘 I/O 磨损之间寻找平衡，这是其他轻量级项目（如 PicoClaw）未曾深入触及的底层挑战。
*   **社区规模对比**：OpenClaw 的社区活跃度是 Zeroclaw（31 Issues）的 10 倍以上，甚至高于 hermes-agent。其 Issue #143524（131 评论）的讨论深度显示，用户群体更偏向于深度集成与定制化部署，对底层存储行为的敏感度远高于纯应用层用户。

**4. 共同关注的技术方向**
*   **Windows 平台可靠性与沙箱安全**：
    *   **涉及项目**：OpenClaw、Zeroclaw、AstrBot、DeepSeek Harness、hermes-agent。
    *   **具体诉求**：OpenClaw 面临 Windows 启动阻塞（#168955）；Zeroclaw 遇到 WSL/CIFS 权限锁冲突（#11803）；AstrBot 在云容器环境面临 `bubblewrap` 权限限制（#10583）；DeepSeek Harness 遭遇 `STATUS_DLL_INIT_FAILED` 沙箱崩溃（#810）。**共识**：Windows 下的非标准文件系统权限管理、沙箱进程隔离及冷启动性能是当前最大的平台兼容性瓶颈。
*   **存储与状态管理的“长尾”治理**：
    *   **涉及项目**：OpenClaw、QwenPaw、hermes-agent。
    *   **具体诉求**：OpenClaw 的 SQLite WAL 无限增长（#143524）；QwenPaw 的 Chat 历史 Base64 膨胀（#8228）；hermes-agent 的 Scratch 目录静默删除（#132401）。**共识**：随着 Agent 运行时间变长，数据持久化的一致性、I/O 磨损及内存泄漏成为阻碍长期运行（Long-lived Agents）的核心痛点。
*   **渠道（Channels）的多模态与降级策略**：
    *   **涉及项目**：Zeroclaw、PicoClaw、QwenPaw、AstrBot。
    *   **具体诉求**：Zeroclaw 修复 WhatsApp 媒体字幕丢失（#11257）；PicoClaw 重构 QQ 多模态解析（#1349）；QwenPaw 修复 DingTalk 长消息静默降级（#8278）。**共识**：用户不再满足于纯文本交互，对语音、图片、文件等富媒体在渠道端的完整性解析及失败时的优雅降级（Graceful Degradation）提出了更高要求。

**5. 差异化定位分析**
*   **功能侧重**：
    *   **OpenClaw**：侧重**核心运行时稳定性**，解决“跑得稳”的问题（心跳、WAL、I/O）。
    *   **Zeroclaw**：侧重**插件安全生态**，引入 WASM 宿主与分阶段准入，强调“可信任的扩展”。
    *   **PicoClaw**：侧重**轻量级与自研解耦**，移除第三方依赖（botgo），强调“可控的集成”。
    *   **QwenPaw**：侧重**控制台体验与 Hub 管理**，优化 UI/UX 与企业级 Skill 共享，强调“好用的管理”。
    *   **DeepSeek Harness**：侧重**OS 级沙箱与终端交互**，深耕 Windows ACL 与 Linux 缺失补全，强调“安全的执行”。
*   **目标用户**：
    *   **OpenClaw/hermes-agent**：面向专业开发者与重度自动化用户，需处理高并发会话与复杂状态。
    *   **Zeroclaw/PicoClaw**：面向嵌入式/边缘计算场景（PicoClaw Android）及高安全标准场景（Zeroclaw WASM）。
    *   **QwenPaw/AstrBot**：面向企业团队与中文社区用户，强调 WebUI 易用性与多平台（钉钉/飞书/QQ）适配。
*   **技术架构**：
    *   **OpenClaw**：Node.js/SQLite 混合架构，强调事件循环阻塞避免。
    *   **Zeroclaw**：Rust/WASM 架构，强调内存安全与插件隔离。
    *   **PicoClaw**：Go 语言单二进制，强调跨平台编译与 CGO 零依赖优化。
    *   **QwenPaw/AstrBot**：Python/Web 混合架构，强调前端 React 交互与后端 Agent 编排的解耦。

**6. 社区热度与成熟度**
*   **快速迭代/高压维护阶段**：**OpenClaw** 与 **hermes-agent**。两者 Issues 数均超 300，且集中在 P0/P1 级回归 Bug，社区处于“救火”状态，架构重构带来巨大的技术债务。
*   **质量巩固/特性深耕阶段**：**Zeroclaw** 与 **AstrBot**。PR 数量适中（19-50），重点在于打磨插件机制、修复特定渠道 Bug 及安全沙箱，社区讨论趋于理性，侧重于“精修”。
*   **平稳维护/边缘拓展阶段**：**PicoClaw**。活动量低但产出高效，处于技术维护期，主要精力用于 Android 等边缘平台的适配与特定通道（QQ）的自研替代。
*   **早期探索/社区驱动阶段**：**DeepSeek Harness**。无 PR 机制，依赖 Discussions 驱动，用户反馈直接引导 Alpha 版本快速迭代，显示出官方与社区紧密耦合的实验性特征。

**7. 值得关注的趋势信号**
*   **Windows 沙箱成为“阿喀琉斯之踵”**：多个项目（OpenClaw, AstrBot, DeepSeek Harness）今日均报告 Windows 平台下的启动阻塞、权限错误或沙箱崩溃。**趋势**：AI Agent 的操作系统级安全隔离（如 ACL、AppContainer、WSL 适配）将从“可选特性”变为“生产级强制要求”，开发者需建立跨平台的沙箱测试矩阵。
*   **数据持久化的“静默失败”风险加剧**：OpenClaw 的 WAL 增长、hermes-agent 的 Scratch 删除、QwenPaw 的历史膨胀均指向同一问题。**趋势**：Agent 的长期运行能力受限于存储层。未来架构需引入**数据完整性校验（Checksums）**、**增量备份**及**I/O 写放大控制**，防止因底层存储问题导致 Agent 状态不可逆丢失。
*   **渠道“优雅降级”与多模态标准化**：Zeroclaw、QwenPaw、PicoClaw 均致力于修复媒体/长消息在渠道端丢失或静默降级的问题。**趋势**：渠道适配层（Channel Adapter）正从简单的“消息转发器”演进为具备**上下文保留能力**的智能网关。社区开始关注“当渠道限制无法突破时，如何保留核心信息”的降级策略设计。
*   **插件系统的“供应链安全”觉醒**：Zeroclaw 引入 WASM 宿主与分阶段准入，AstrBot 强化 Skill 容错，OpenClaw 治理插件 I/O 磨损。**趋势**：随着插件生态爆发，**隔离执行环境**（WASM, Container）与**插件生命周期管理**（热重载、原子更新）成为防止单点故障拖垮主进程的关键技术方向。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

**Zeroclaw 项目动态日报 (2026-10-17)**

### 1. 今日速览
Zeroclaw 项目今日保持高度活跃，24小时内有 31 条 Issue 和 50 条 PR 发生更新，其中 PR 待合并数量较多（46 条），显示社区贡献密集。项目重心明显集中在 **插件系统（Plugins）** 的稳定性加固、**多渠道通信（Channels）** 的 Bug 修复（特别是 WhatsApp 和 Telegram），以及 **安全策略** 的细化。虽然今日无新版本发布，但针对 v0.8.6 和 v0.9.0 的核心功能（如 WASM 运行时、网关分离）正在通过多个大型 PR 逐步落地。整体健康度良好，但在 Windows 权限管理和 Linux 二进制大小限制方面存在需解决的阻塞项。

### 2. 版本发布
**无新版本发布**
今日无 Release 更新。目前的开发工作主要围绕已发布的 v0.8.6 的后续加固以及 v0.9.0 的网关分离准备工作。

### 3. 项目进展
今日合并/关闭的重要 PR 及推进状态：

*   **插件系统安全加固与更新机制**
    *   **[CLOSED] #11261 feat(plugins): replace an installed package through staged admission**：已关闭（推测为已合并或完成），引入了分阶段准入机制来替换已安装的插件包，提高了插件更新的安全性。
    *   **[OPEN] #11347 feat(release): ship the WASM plugin host in supported release artifacts**：大型 PR，旨在将 WASM 插件宿主整合进发布产物，解决之前默认 Cargo features 不包含插件宿主的问题，这是 Phase 2 的关键交付物。
    *   **[OPEN] #11262 feat(cli): add zeroclaw plugin update with verified replacement**：实现了 CLI 层面的插件更新功能，包含验证替换逻辑，补齐了插件生命周期管理的缺失环节。

*   **渠道功能完善**
    *   **[OPEN] #11739 fix(channels/telegram): withdraw the ack reaction when a reply finishes**：修复了 Telegram 渠道在回复结束后未移除“已读”表情（👀）的问题，改善了用户体验。
    *   **[OPEN] #11754 feat(channels): make acknowledgement reactions configurable**：将硬编码的确认表情改为可配置，支持 Slack、Matrix 等多渠道，增强了自定义能力。
    *   **[OPEN] #11781 fix(channels): process Telegram edited_message updates**：增加了对 Telegram 编辑消息的处理，确保 @bot 在编辑后的消息中也能被正确识别。

*   **运行时与配置优化**
    *   **[OPEN] #11801 fix(prompt): drop wall-clock date from channel and agent::run system prompts**：移除了系统提示词中动态注入的“当前日期”，避免了因时间戳导致的提示词缓存失效或困惑，提升了效率。
    *   **[OPEN] #11803 fix(config): move the lifecycle lock into an owner-only data/.lifecycle directory**：针对 #10621 引入的权限检查问题，将生命周期锁移入专属目录，解决在非 Unix 权限文件系统（如 WSL, CIFS）上的启动阻塞问题。

### 4. 社区热点
讨论最活跃的 Issues，反映了社区对稳定性和可配置性的强烈需求：

*   **[OPEN] #7432 [Tracker]: Runtime and gateway delivery - v0.8.6 and v0.9.0** (8 评论)
    *   **链接**: https://github.com/zeroclaw-labs/zeroclaw/issues/7432
    *   **分析**: 作为 Phase 2 和 Phase 3 的总 Tracker，该 Issue 追踪了运行时完善和网关分离的关键缺口。高关注度表明用户正在密切关注 v0.9.0 的架构分离进度，这是后续插件和扩展功能的基础。

*   **[OPEN] #11655 [Bug]: Core conflict supersede hides unrelated memories when recall has no vector scores** (4 评论)
    *   **链接**: https://github.com/zeroclaw-labs/zeroclaw/issues/11655
    *   **分析**: 默认配置下（无向量嵌入）的记忆合并逻辑存在缺陷，会导致不相关的核心记忆被“软隐藏”。这是记忆子系统（Memory Subsystem）的关键 Bug，影响了 Agent 的长期一致性。

*   **[OPEN] #11580 [Task]: x86_64 Linux release binary is about 0.7 MB under the 64 MiB size cap** (3 评论)
    *   **链接**: https://github.com/zeroclaw-labs/zeroclaw/issues/11580
    *   **分析**: 这是一个 CI/发布流程的阻塞项。二进制大小极其接近 64MB 限制，团队正在讨论是放宽限制还是记录头部空间策略。若不及时解决，下一次发布可能因构建失败而受阻。

*   **[OPEN] #11257 [Bug]: WhatsApp Web drops the caption of inbound images, videos and documents** (3 评论)
    *   **链接**: https://github.com/zeroclaw-labs/zeroclaw/issues/11257
    *   **分析**: WhatsApp 渠道的重要功能缺失，用户发送媒体文件附带的文字说明丢失，导致 Agent 无法获取完整上下文。

### 5. Bug 与稳定性
按严重程度排列的今日报告 Bug：

*   **[S0 - Critical] #11796 [Bug]: ZeroClaw daemon suddenly prompts for GitHub credentials on startup and blocks**
    *   **链接**: https://github.com/zeroclaw-labs/zeroclaw/issues/11796
    *   **状态**: Open
    *   **详情**: 守护进程在启动时突然提示输入 GitHub 凭据并阻塞，疑似今日引入的回归（Sudden regression）。这会导致无法自动化部署或重启服务。
    *   **Fix PR**: 暂无，但 **[OPEN] #11804 fix(skills): keep the open-skills sync from prompting for git credentials** 正在尝试通过设置 `GIT_TERMINAL_PROMPT=0` 解决 skills 同步时的类似阻塞，可能关联此问题。

*   **[S1 - High] #11777 [Bug]: Loop detector default threshold is too low**
    *   **链接**: https://github.com/zeroclaw-labs/zeroclaw/issues/11777
    *   **状态**: Open
    *   **详情**: 默认循环检测器在 6 个周期内交替调用 `file_write` 和 `shell` 时就触发断路器，导致 Agent 无法执行复杂任务。
    *   **Fix PR**: **[OPEN] #11778 fix(runtime): raise and expose ping-pong loop-detector threshold** 已提交，将默认阈值提高到 8 并允许配置 `pacing.loop_detection_ping_pong_min_cycles`。

*   **[S2 - Medium] #11760 [Bug]: Email channel answers live mail again after a restart**
    *   **链接**: https://github.com/zeroclaw-labs/zeroclaw/issues/11760
    *   **状态**: Open
    *   **详情**: Active mode 下，邮件通道重启后会重复回复运行时收到的邮件，因为未设置 `\Seen` 标志。
    *   **Fix PR**: 暂无明确 Fix PR，需关注后续提交。

*   **[S2 - Medium] #11257 [Bug]: WhatsApp Web drops caption of inbound media**
    *   **链接**: https://github.com/zeroclaw-labs/zeroclaw/issues/11257
    *   **状态**: Open
    *   **详情**: 媒体附带的文字说明被丢弃，Agent 只看到占位符。

*   **[S3 - Low] #11783 [Bug]: Can't create Alpine container image**
    *   **链接**: https://github.com/zeroclaw-labs/zeroclaw/issues/11783
    *   **状态**: Open
    *   **Fix PR**: **[OPEN] #11789 Fix: Alpine image based container build** 已提交，修复了 Dockerfile.alpine 中 vendor 目录拷贝和依赖解析问题。

### 6. 功能请求与路线图信号
*   **#11799 [Feature]: Shell policy refusals should say why**
    *   **链接**: https://github.com/zeroclaw-labs/zeroclaw/issues/11799
    *   **信号**: 当 Shell 命令被安全策略拒绝时，仅返回 `bool` 不够友好。用户希望看到具体拒绝的规则和操作提示。这可能促使团队改进 `SecurityPolicy` 的返回结构，增加诊断信息。
*   **#11598 [Enhancement]: support glob matching in the command allowlist**
    *   **链接**: https://github.com/zeroclaw-labs/zeroclaw/pull/11598
    *   **信号**: 目前命令白名单仅支持精确路径匹配。该 PR 旨在支持 Glob 匹配，允许允许整个脚本目录（如 `scripts/*`）。这符合插件/Skill 包管理的需求，预计会被纳入 v0.8.6 或 v0.9.0 的安全增强中。
*   **#11467 [Enhancement]: add opt-in single-tool provider rounds**
    *   **链接**: https://github.com/zeroclaw-labs/zeroclaw/pull/11467
    *   **信号**: 为 OpenAI/Anthropic 等提供商增加 `single_tool_rounds` 选项，允许控制每次请求只处理一个工具调用。这有助于调试和优化 Agent 行为，属于运行时高级配置。

### 7. 用户反馈摘要
*   **痛点 - 自动化部署受阻**: Issue #11796 显示用户因守护进程阻塞在凭据提示而无法实现无人值守部署。
*   **痛点 - 复杂任务中断**: Issue #11777 显示默认的循环检测过于敏感，导致多步骤工具调用（如写文件+执行Shell）频繁失败，用户抱怨“无法读取大图谱”。
*   **满意度/期望 - 渠道体验**: 用户对 Telegram 和 WhatsApp 的细节体验（如已读标记、编辑消息、媒体附言）有较高期待。PR #11739 和 #11257 表明用户正在主动贡献代码或报告问题以改善渠道交互的完整性。
*   **痛点 - 平台兼容性**: Issue #11794 和 #11793 指出在 WSL/CIFS 等非标准 Unix 文件系统上，数据目录的权限管理导致启动失败或锁冲突，用户希望有 fallback 机制。

### 8. 待处理积压
*   **#7432 Tracker: Runtime and gateway delivery**: 作为长期 Tracker，需持续关注其子任务是否阻塞 v0.9.0 发布。特别是 Phase 2 的剩余工作。
*   **#11580 Release size cap**: 若该 CI 限制未解决，将阻塞所有新版本的发布。建议维护者优先级处理或临时放宽限制。
*   **#11655 Memory conflict bug**: 涉及核心记忆逻辑，影响 Agent 长期一致性，属于底层数据完整性问题，不宜长期搁置。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-10-17**
**数据窗口：过去24小时**

## 1. 今日速览
过去24小时内，PicoClaw 社区呈现出**“高产出、低互动”**的特征。虽然 Issues 活跃度较低（1开1关），但 PR 侧有 4 条更新，其中 3 条已完成合并或关闭，显示开发团队在核心功能优化和 Bug 修复上推进迅速。特别值得关注的是，团队完成了 **QQ C2C 通道的自研解耦**以及 **Cron 任务时区计算逻辑的修复**，显著提升了项目的稳定性和对第三方依赖的掌控力。整体来看，项目处于平稳的技术维护期，无重大功能发布，但基础架构健壮性得到加固。

## 2. 版本发布
过去 24 小时内无新版本发布。

## 3. 项目进展
今日共有 3 个 PR 结束状态，主要集中在底层通道实现与核心调度逻辑的修复：

*   **QQ 通道深度重构与增强（已合并）**
    *   **[PR #3440](https://github.com/sipeed/picoclaw/pull/3440) `feat(channels): 新增自研 QQ C2C Channel（不依赖 botgo）`**：这是今日最重要的架构更新。该 PR 新增了一个专用的 `qq_c2c` 通道，完全移除对 `tencent-connect/botgo` 的依赖，基于 QQ 机器人 API v2 从零实现了 Access Token 鉴权、WebSocket 网关及单聊被动回复等功能。此举降低了第三方库的耦合度，提升了 QQ 通道的可维护性和安全性。
    *   **[PR #1349](https://github.com/sipeed/picoclaw/pull/1349) `feat(qq): support parsing and replying to more attachment types`**：虽然创建时间较早，但今日关闭。该 PR 增强了 QQ 通道对语音、图片、视频及文件消息的解析与回复能力，并优先使用 Markdown 格式回复。配合 #3440 的重构，QQ 通道的多模态交互能力得到完善。
*   **Cron 调度器时区修复（已合并）**
    *   **[PR #3441](https://github.com/sipeed/picoclaw/pull/3441) `fix(cron): honor schedule.TZ when computing the next run`**：修复了 `CronSchedule` 在计算下次运行时间时忽略 `TZ` 字段的问题。此前，在缺少 `TZ` 环境变量的进程中（如 CLI 或面板），时区会退化为 UTC，导致任务显示时间错乱（如 `12:01` 显示为 `04:01`）。该修复确保了定时任务在全球时区场景下的准确性，对国际化用户至关重要。

## 4. 社区热点
今日社区讨论主要围绕 **Android 端构建问题** 和 **OpenCode Go 集成** 展开：

*   **Android 构建 DNS 解析失效（高关注度）**
    *   **[Issue #3420](https://github.com/sipeed/picoclaw/issues/3420) `[bug] Android build: pure-Go (CGO_ENABLED=0) binaries fail DNS resolution`**
    *   **背景**：用户在 Android 官方构建中反馈，使用纯 Go (CGO_ENABLED=0) 编译的二进制文件导致 Gateway 无法通过 DNS 访问外部 API，报错 `dial udp 127.0.0.1:53: connect: connection refused`。
    *   **分析**：此问题阻碍了用户在 Android 设备上的核心功能使用（如获取模型列表）。由于涉及底层网络库配置，可能影响较多移动侧用户。目前该 Issue 处于 Open 状态，是今日最需优先解决的阻塞性问题。
*   **OpenCode Go Provider 支持（新特性提案）**
    *   **[PR #3371](https://github.com/sipeed/picoclaw/pull/3371) `feat(providers): add opencode-go provider`**
    *   **背景**：用户提议并实现了一个独立的 `opencode-go` 提供商，支持通过 `x-opencode-session` 头进行会话管理。
    *   **分析**：该 PR 目前为 Stale（长期未处理）状态，但反映了社区对扩展多模型接入渠道的需求。若合并，将丰富 PicoClaw 的模型生态。

## 5. Bug 与稳定性
*   **High: Android DNS 解析失败 (Issue #3420)**
    *   **现象**：Android 端 Gateway 无法解析域名，导致无法连接 API。
    *   **原因**：纯 Go 构建在 Android 环境下 DNS 解析机制与系统原生行为冲突。
    *   **Fix PR**：暂无。
    *   **影响**：阻塞 Android 平台用户的核心网络功能。
*   **Medium: Cron 任务时区显示错误 (Issue 隐含于 PR #3441)**
    *   **现象**：无 `TZ` 环境变量的进程中，Cron 任务时间显示为 UTC 偏移，造成用户困惑。
    *   **Fix PR**：[PR #3441](https://github.com/sipeed/picoclaw/pull/3441) 已合并，问题已修复。

## 6. 功能请求与路线图信号
*   **QQ 通道多模态支持**：通过 PR #1349 和 #3440 的合并，可以预见 PicoClaw 在 QQ 平台的支持将更加完善，包括语音、文件交互和独立网关。
*   **第三方 LLM 集成扩展**：PR #3371 暗示了用户对更广泛 LLM 提供商（如 OpenCode Go）接入的需求。若该 PR 后续激活并合并，将增强 PicoClaw 的模型灵活性。
*   **Android 端稳定性优化**：Issue #3420 的解决可能促使团队进一步优化 Android 构建流程，甚至引入 CGO 或特定的 DNS 解析补丁。

## 7. 用户反馈摘要
*   **痛点**：
    *   **Android 用户**：对构建后的可用性有直接期望，网络错误导致功能完全失效。
    *   **定时任务用户**：对时区显示的准确性敏感，UTC 回退问题影响了任务管理的直观性。
*   **满意点**：
    *   **QQ 开发者**：对去 `botgo` 依赖、支持更多附件类型的改进表示认可，认为提升了集成的可控性。
*   **使用场景**：
    *   用户在 Android 设备上运行 PicoClaw 时，期望 Gateway 能自动处理网络请求。
    *   跨时区团队协作中，Cron 任务的显示准确性影响调度效率。

## 8. 待处理积压
*   **Stale PR #3371 (OpenCode Go Provider)**：创建时间为 2026-09-08，已过去近一个月，无评论更新。建议维护者评估其价值，决定是合并、关闭还是请求作者更新。
*   **Issue #166 (QQBot 对话失败)**：虽已关闭，但创建于 2026-02-14，因 QQ 开放平台政策变更导致主动消息权限缺失。虽然关闭，但提醒团队需持续跟进第三方平台 API 政策变化对通道功能的影响。
*   **Issue #3420 (Android DNS)**：虽为最新，但若 Android 是重要目标平台，此 Bug 不应长期挂起，建议尽快指派开发者处理。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 (2026-10-17)

**项目**: QwenPaw (github.com/agentscope-ai/qwenpaw)
**报告日期**: 2026-10-17
**数据范围**: 过去24小时 (2026-10-16 00:00 UTC - 2026-10-17 00:00 UTC)

## 1. 今日速览
QwenPaw 项目维持高强度开发节奏，过去24小时内共有 15 条 Issue 更新（其中 12 条活跃，3 条关闭）和 30 条 PR 更新（其中 18 条待合并，12 条已合并或关闭），整体社区活跃度高，核心功能迭代密集。今日无新版本发布，但多项修复（如 Chat 历史膨胀、DingTalk 降级问题）已提交 PR 待合并，反映出团队正聚焦于用户体验稳定性和性能优化。项目处于 v2.2.2 稳定版维护与后续特性预研（如插件热重载、OpenUI 集成）并行的阶段，代码库活跃度良好，无明显停滞迹象。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日（过去24小时）合并或关闭的 PR 主要集中在 **控制台体验优化** 和 **稳定性修复**，具体进展包括：

- **控制台 UX 优化**：
  - **#8271 [CLOSED]** `refactor(console): polish web search config guards and error icon`：简化了 Web 搜索配置模态框的状态检查，并优化了错误图标显示，提升了配置界面的清晰度 [链接](https://github.com/agentscope-ai/QwenPaw/pull/8271)。
  - **#8272 [CLOSED]** `fix(console): clear chat input on submission`：修复了聊天输入框在提交消息后清除延迟的问题，现在输入、附件和草稿会在提交检查通过后立即清除，提升了交互流畅度 [链接](https://github.com/agentscope-ai/QwenPaw/pull/8272)。
  - **#8263 [CLOSED]** `fix(console): unblock config editors and polish chat controls`：修复了配置编辑器在保存失败或信息不完整时无法关闭的问题，实现了标准化的关闭工作流（“继续编辑”或“丢弃并关闭”），并清理了待保存任务 [链接](https://github.com/agentscope-ai/QwenPaw/pull/8263)。
  - **#8273 [CLOSED]** `fix(console): update chat dependency for navigation`：更新 `@agentscope-ai/chat` 依赖至 beta 版本，修复了长会话消息导航定位不准的问题，关闭了 Issue #8251 [链接](https://github.com/agentscope-ai/QwenPaw/pull/8273)。

- **核心功能与性能**：
  - **#8205 [CLOSED]** `feat(models): add TypeSafe decision model configuration`：引入了 TypeSafe/JEV 作为可配置的决策模型提供商，支持聊天和决策模型的全局默认值分离，增强了模型配置的灵活性 [链接](https://github.com/agentscope-ai/QwenPaw/pull/8205)。
  - **#8239 [CLOSED]** `feat(chat): support inline UI plugins and scoped message submission`：添加了通用插件 API，支持在助手消息内联渲染交互式 UI 并向源会话提交操作，为 OpenUI Lang 和自定义 UI 库铺平了道路 [链接](https://github.com/agentscope-ai/QwenPaw/pull/8239)。
  - **#8262 [CLOSED]** `[release-duty, stable] QwenPaw v2.2.2 (Stable) — Installation Verification`：v2.2.2 稳定版的安装验证流程已完成，确保了发布质量 [链接](https://github.com/agentscope-ai/QwenPaw/issues/8262)。

## 4. 社区热点
今日讨论最活跃、关注度高的是以下 **DingTalk 通道降级 Bug** 和 **Web 搜索提供商配置**：

- **#8278 [OPEN] [Bug] DingTalk 通道在消息 >3500 字符时整条降级为纯文本**：用户报告钉钉通道在长消息时静默降级为纯文本，导致 Markdown 和表格失效，且无降级信号，对数据报表场景影响重大。该 Issue 已有 3 条评论，社区对此痛点反馈强烈，需优先修复 [链接](https://github.com/agentscope-ai/QwenPaw/issues/8278)。
- **#8174 [CLOSED] [enhancement] web_search built-in tavily provider has no API-key config surface**：用户指出内置 Tavily 提供商无法配置自有 API Key，导致付费配额无法使用。该 Issue 已关闭，可能已通过后续 PR（如 #8204 或相关配置优化）解决，或引导用户至其他提供商 [链接](https://github.com/agentscope-ai/QwenPaw/issues/8174)。
- **#8284 [OPEN] [Bug][Console] Wheel scrolling in a long conversation gets stuck**：长对话中滚轮滚动卡顿，转录高度重新估算导致视图回跳 1.1-2.2k px。该 Issue 由前端组件引起，影响用户体验，已有 1 条评论 [链接](https://github.com/agentscope-ai/QwenPaw/issues/8284)。

## 5. Bug 与稳定性
今日报告的 Bug 按严重程度排列如下：

1. **[高] #8278 DingTalk 长消息静默降级**：
   - **描述**：钉钉通道消息超过 3500 字符时，强制降级为 `msgtype=text`，Markdown/表格失效，且无信号通知调用方。
   - **状态**：OPEN，无直接 Fix PR，需紧急修复 [链接](https://github.com/agentscope-ai/QwenPaw/issues/8278)。

2. **[高] #8228 Chat history bloat (10 MB+ 响应)**：
   - **描述**：文件和截图工具输出以 base64 形式存储在 `tool_result` 中，导致长聊天记录超过 10 MB，可靠地触发 30 秒控制台超时。
   - **状态**：OPEN，已有 Fix PR **#8229** (`fix(chat): truncate oversized tool outputs`) 待审查，可能通过截断过大的工具输出来缓解 [链接](https://github.com/agentscope-ai/QwenPaw/issues/8228) [PR #8229](https://github.com/agentscope-ai/QwenPaw/pull/8229)。

3. **[中] #8252 Agent 间调用会话被静默取消**：
   - **描述**：多 Agent 舰队中，`ChatWithAgent` 调用因 `CancelledError` 被静默取消，产物归零，且取消原因未记录。
   - **状态**：OPEN，无直接 Fix PR，需调查 `error_hook.py` 中的取消逻辑 [链接](https://github.com/agentscope-ai/QwenPaw/issues/8252)。

4. **[中] #8270 Windows 压缩包乱码**：
   - **描述**：Windows 下 ZIP 解压出现乱码，根因是 `zipfile.ZipFile` 未传递 `encoding` 参数。
   - **状态**：OPEN，无直接 Fix PR，但已有类似 Issue #8269 提及相同根因 [链接](https://github.com/agentscope-ai/QwenPaw/issues/8270)。

5. **[中] #8279 Long-lived ReMe watchers exhaust AnyIO's default thread limiter**：
   - **描述**：长期运行的 ReMe 监听器耗尽 AnyIO 默认线程限制器，导致同步 HTTP 端点停滞。
   - **状态**：OPEN，无直接 Fix PR，需优化线程管理 [链接](https://github.com/agentscope-ai/QwenPaw/issues/8279)。

6. **[低] #8284 Console 滚轮滚动卡顿**：
   - **描述**：长对话中滚轮滚动导致视图回跳。
   - **状态**：OPEN，无直接 Fix PR [链接](https://github.com/agentscope-ai/QwenPaw/issues/8284)。

## 6. 功能请求与路线图信号
- **#8275 [OPEN] 建议 QwenPaw Hub 支持全局 Skill 和 MCP 统一管理与共享**：
  - **描述**：用户希望在 Hub 中增加全局 Skill 和 MCP 管理功能，实现管理员一次配置、所有用户继承，保留个人配置覆盖能力。
  - **路线图信号**：该需求符合企业级场景，可能纳入下一版本的 Hub 功能扩展 [链接](https://github.com/agentscope-ai/QwenPaw/issues/8275)。

- **#8126 [OPEN] Make skill-pool download a cancellable background job**：
  - **描述**：用户希望将技能池下载改为可取消的后台任务，支持进度显示和显式取消。
  - **路线图信号**：已有 Fix PR **#8285** (`feat(skills): make skill-pool downloads cancellable jobs`) 待合并，表明团队正在推进此功能 [链接](https://github.com/agentscope-ai/QwenPaw/issues/8126) [PR #8285](https://github.com/agentscope-ai/QwenPaw/pull/8285)。

- **#7712 [OPEN] feat(tools): add Serply as a web_search provider**：
  - **描述**：新增 Serply 作为 Web 搜索提供商，支持 BYOK。
  - **路线图信号**：扩展搜索提供商多样性，满足用户偏好 [链接](https://github.com/agentscope-ai/QwenPaw/pull/7712)。

- **#8200 [OPEN] feat(tools): add Firecrawl as a web_search provider**：
  - **描述**：新增 Firecrawl 作为 Web 搜索提供商，映射 `data.web[]` 结果。
  - **路线图信号**：与 #7712 类似，丰富搜索能力 [链接](https://github.com/agentscope-ai/QwenPaw/pull/8200)。

- **#7565 [OPEN] feat(plugins): add clean unload and rollback-safe hot reload**：
  - **描述**：为插件添加干净的卸载路径和回滚安全的热重载，避免插件更新失败导致工作区重建。
  - **路线图信号**：增强插件系统稳定性，适合长期运行部署 [链接](https://github.com/agentscope-ai/QwenPaw/pull/7565)。

## 7. 用户反馈摘要
- **痛点 1**：**DingTalk 长消息体验差**：用户依赖钉钉通道发送数据报表，但长消息静默降级为纯文本，导致表格无法阅读，且无降级提示，用户需手动限制正文长度，体验割裂 [链接](https://github.com/agentscope-ai/QwenPaw/issues/8278)。
- **痛点 2**：**长会话性能瓶颈**：聊天历史记录因 base64 工具输出膨胀至 10 MB+，导致控制台超时，影响多模态交互场景 [链接](https://github.com/agentscope-ai/QwenPaw/issues/8228)。
- **痛点 3**：**Windows 压缩兼容性问题**：Windows 用户报告 ZIP 解压乱码，影响 Skill 导入和 Hub 下载，需修复编码处理 [链接](https://github.com/agentscope-ai/QwenPaw/issues/8270)。
- **满意点**：**控制台交互优化**：用户反馈配置编辑器关闭逻辑改进、聊天输入清除即时化等 UI/UX 优化提升了操作流畅度 [链接](https://github.com/agentscope-ai/QwenPaw/pull/8263) [链接](https://github.com/agentscope-ai/QwenPaw/pull/8272)。

## 8. 待处理积压
- **#7565 [OPEN] feat(plugins): add clean unload and rollback-safe hot reload**：
  - **状态**：OPEN，创建于 2026-09-04，标记为 `size/XXXL`，涉及核心插件系统重构，需长期关注，避免插件更新风险累积 [链接](https://github.com/agentscope-ai/QwenPaw/pull/7565)。

- **#7903 [OPEN] [wip] feat(community): integrate QwenPaw community and inbox**：
  - **状态**：OPEN，创建于 2026-09-20，标记为 `size/XXXL` 和 `[wip]`，涉及社区集成和收件箱功能，开发周期较长，需确保资源投入 [链接](https://github.com/agentscope-ai/QwenPaw/pull/7903)。

- **#8266 [OPEN] feat(data-app): v 1.0.3**：
  - **状态**：OPEN，创建于 2026-10-15，标记为 `size/XXXL`，更新 QwenPaw Data 至 1.0.3，涉及共享模型配置和数据源感知，需确保与主版本 2.2.2 的兼容性 [链接](https://github.com/agentscope-ai/QwenPaw/pull/8266)。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：2026-10-17**

## 1. 今日速览
过去24小时项目保持极高开发活跃度，共更新 459 个 Issue 和 500 个 PR，其中 400 个 PR 处于待合并状态，显示出高强度的代码提交与集成压力。今日无新版本发布，但社区正集中解决因 v0.22.1 及近期网关架构变更引发的多个 P0/P1 级稳定性回归。核心痛点集中在会话状态同步、安装更新机制及多平台消息投递的可靠性上。项目整体处于高频迭代期，维护团队正快速响应社区报告的安全与性能边界问题。

## 2. 版本发布
**今日无新版本发布。**

## 3. 项目进展
今日重点推进了网关架构的稳定性修复与平台插件化重构：
- **网关状态修复**：合并了针对网关重启循环及非正常终止后 Cron 任务卡死的修复，解决了 PID 复用导致的监控误判问题。
- **插件架构重构**：推进了核心读取各平台插件声明而非手动维护配置表的变更，提升了多平台适配的解耦度。
- **桌面端功能**：合并了多项桌面端 UI 修复，包括状态栏数据渲染及会话管理优化。
- **安全加固**：清理了 npm 工作区中的高危依赖漏洞，并合并了关于本地会话代码执行审批逻辑的修复。

## 4. 社区热点
- **统一网关运行时后续修复**：[#134889](https://github.com/NousResearch/hermes-agent/issues/134889)（128 评论）：追踪 PR #106742 合并后的局部会话拥有权问题，社区正深入排查会话状态、消息投递及 Windows 平台兼容性风险。
- **Telegram 论坛主题消息路由**：[#136567](https://github.com/NousResearch/hermes-agent/issues/136567)（27 评论）：新增主题首条消息因缺乏 thread_id 导致被错误路由至前序主题，反映了多模态消息上下文管理的复杂性。
- **更新机制回归**：[#107402](https://github.com/NousResearch/hermes-agent/issues/107402)（23 评论）：`hermes update` 在延迟重启网关后遗留错误的 stale 状态标记，影响用户自更新体验。

## 5. Bug 与稳定性
按严重程度排列今日主要稳定性问题：

**P0 - 严重/数据丢失风险**
- **Scratch 目录静默删除**：[#132401](https://github.com/NousResearch/hermes-agent/issues/132401)（23 评论）：24h 空闲清理机制无日志、无隔离区，静默销毁 TMPDIR 中的多日 Agent 工作数据。**状态：无 fix PR，需紧急决策。**
- **网关重启循环**：[#138343](https://github.com/NousResearch/hermes-agent/issues/138343)（已关闭）：非正常死亡后 PID 回收导致 Cron 卡死及配额浪费，已通过 PR #138342 修复。

**P1 - 核心功能受损**
- **Telegram 消息投递错误**：[#136567](https://github.com/NousResearch/hermes-agent/issues/136567)（27 评论）：论坛新主题首条消息路由错误。**状态：Open，修复中。**
- **更新后状态残留**：[#107402](https://github.com/NousResearch/hermes-agent/issues/107402)（23 评论）：更新程序验证逻辑缺陷。**状态：Open。**
- **Kanban 调度器卡死**：[#119070](https://github.com/NousResearch/hermes-agent/issues/119070)（17 评论）：限流重试成功后 Reviewer 永不生成。**状态：Open，需决策。**
- **Session 删除 409 错误**：[#138826](https://github.com/NousResearch/hermes-agent/issues/138826)（9 评论）：非 root profile 会话删除始终报错，系 routing_db 与 authority.db 同步问题。**状态：Open。**

**P2 - 功能缺陷**
- **浏览器进程泄漏**：[#121095](https://github.com/NousResearch/hermes-agent/issues/121095)（15 评论）：`browser_exec` 执行后 daemon 进程无超时机制。**状态：Open。**
- **Cron 错误分类误导**：[#99988](https://github.com/NousResearch/hermes-agent/issues/99988)（8 评论）：非认证错误被误标为认证错误，需修复子串匹配逻辑。**状态：Open。**

## 6. 功能请求与路线图信号
- **统一网关拥有权**：PR #106742 已合并，路线图正从“分布式会话”转向“统一网关运行时”，后续将聚焦于状态一致性与多端同步。
- **Web 端复用桌面渲染**：[#93508](https://github.com/NousResearch/hermes-agent/pull/93508) 提出通过浏览器托管模式复用 Desktop 渲染器，暗示 Desktop 应用核心逻辑正在向跨端服务化演进。
- **记忆系统增强**：[#135039](https://github.com/NousResearch/hermes-agent/issues/135039) 与 [#25309](https://github.com/NousResearch/hermes-agent/issues/25309) 探讨记忆写入时的预算执行与自动背景巩固（Dreaming），预示 v0.23 版本将深化长期记忆管理。
- **平台插件化**：Nextcloud Talk 适配器（[#11458](https://github.com/NousResearch/hermes-agent/pull/11458)）及插件目录条目（[#140197](https://github.com/NousResearch/hermes-agent/pull/140197)）表明社区正将第三方平台集成推向标准化插件体系。

## 7. 用户反馈摘要
- **更新体验痛点**：用户对 `hermes update` 的延迟重启验证逻辑及 stable 通道 404 问题（[#136281](https://github.com/NousResearch/hermes-agent/issues/136281)）反应强烈，期望更新流程具备自愈与明确的状态反馈。
- **数据安全感**：Scratch 目录静默删除（[#132401](https://github.com/NousResearch/hermes-agent/issues/132401)）引发用户对 Agent 环境数据安全性的担忧，呼吁增加日志与隔离机制。
- **桌面端交互**：用户反馈桌面端助手响应重复渲染（[#127621](https://github.com/NousResearch/hermes-agent/issues/127621)）及输入中断（[#88621](https://github.com/NousResearch/hermes-agent/issues/88621)）严重影响使用流畅度。
- **平台兼容性**：Windows 平台会话兼容性（sweeper:risk-platform-windows）及 macOS 本地网络权限（[#81563](https://github.com/NousResearch/hermes-agent/issues/81563)）是近期高频反馈点。

## 8. 待处理积压
- **长期 Open 安全漏洞**：[#62336](https://github.com/NousResearch/hermes-agent/issues/62336)（Terminal 环境快照捕获凭证）创建于 7 月，至今 13 条评论未关闭，需安全团队优先处理。
- **安装更新测试套件失败**：[#129455](https://github.com/NousResearch/hermes-agent/issues/129455)（16 评论）涉及默认安装路径下的 PM 激活测试误报，阻碍 CI 稳定性。
- **Anthropic 用量显示错误**：[#58226](https://github.com/NousResearch/hermes-agent/issues/58226)（15 评论）低用量窗口显示为 100%，影响计费透明度，需修正 `utilization` 缩放逻辑。
- **Cron 失败摘要器误导**：[#99988](https://github.com/NousResearch/hermes-agent/issues/99988)（8 评论）因正则匹配过宽导致错误分类，长期未修复，影响故障排查效率。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

2026年10月17日 AstrBot 项目动态日报

**今日速览**
AstrBot 项目今日保持极高活跃度，过去24小时内共更新 Issues 16 条（新开/活跃 11，关闭 5）及 Pull Requests 19 条（待合并 14，关闭/合并 5）。社区重点攻克了核心会话隔离机制导致的内存泄漏及 Edge TTS 服务全面失效的严重回归问题。在底层架构层面，针对 Windows 沙箱权限、Agent 技能容错及消息追踪能力进行了多维度加固。

**项目进展**
今日集中合并与关闭了多项关键代码提交，推进了底层架构的健壮性：
- **修复内存泄漏与 OOM 风险**：关闭并合并了 3 项与 `unique_session` 会话隔离相关的问题（[#10546](https://github.com/AstrBotDevs/AstrBot/pull/10546)、[#10581](https://github.com/AstrBotDevs/AstrBot/pull/10581)、[#10349](https://github.com/AstrBotDevs/AstrBot/pull/10349)）。这些 PR 修复了活动事件在 Pipeline 改写 `session_id` 后未能正确注销的问题，解决了生产环境长期运行导致的内存持续增长。
- **提升 UI 与平台兼容性**：合并关闭了修复移动端 Dashboard 插件信息浮层无法展示（[#10562](https://github.com/AstrBotDevs/AstrBot/pull/10562)）以及修复 Discord 平台误发 `@all` 而非 `@everyone`（[#10563](https://github.com/AstrBotDevs/AstrBot/pull/10563)）的问题。
- **核心文档完善**：更新了旧版文档截图，确保新手配置指引与实际 WebUI 界面保持一致（[#8745](https://github.com/AstrBotDevs/AstrBot/issues/8745)）。

**社区热点**
- **边缘服务与本地沙箱环境限制**：用户 @[Mcchen1008](https://github.com/AstrBotDevs/AstrBot/issues/10583) 报告在雨云容器云环境部署时，Local 模式因缺少 `bubblewrap` 及系统权限限制（Operation not permitted）导致 Agent 无法访问本地电脑。此问题揭示了云原生/容器化场景下沙箱机制的适配盲区，PR [#10584](https://github.com/AstrBotDevs/AstrBot/pull/10584) 正在推进简化本地权限并恢复 Windows 工作区文件访问以解决该问题。
- **多模态与本地知识库需求**：Issue [#10550](https://github.com/AstrBotDevs/AstrBot/issues/10550) 呼吁支持 `qwen3-vl` 等模型的多模态 embedding 和 rerank，以实现更高级的搜图、搜视频功能。该议题延续了早前社区关于知识库扩展能力的讨论，反映了用户从纯文本向多媒体 RAG 演进的需求。

**Bug 与稳定性**
今日集中暴露并推进修复了影响核心功能的 2 个严重 Bug：
1. **【严重 / 回归】Edge TTS 全面失效 (403 拒绝访问)**：自 v4.29.0 起，模块级 User-Agent 覆写破坏了底层签名，导致语音合成请求全部被拒绝且长期静默存在（[#10585](https://github.com/AstrBotDevs/AstrBot/issues/10585)）。*修复进度*：已提交 Fix PR [#10588](https://github.com/AstrBotDevs/AstrBot/pull/10588) 移除全局覆写，恢复原生 User-Agent，待合并。
2. **【高 / 阻断】单个 Skill 故障阻断全局请求**：若 `data/skills/` 中单个目录因权限或 I/O 错误不可读，会导致 Agent 核心入口报错，全局模型请求失败（[#10589](https://github.com/AstrBotDevs/AstrBot/issues/10589)）。*修复进度*：已提交 Fix PR [#10591](https://github.com/AstrBotDevs/AstrBot/pull/10591) 增加列表遍历的错误隔离，待合并。
3. **【高】Gemini 4/3.8 思考配置缺陷**：Gemini 4 未生成思考配置，Gemini 3.8 校验缺失易导致 API 拒绝（[#10586](https://github.com/AstrBotDevs/AstrBot/issues/10586)）。*修复进度*：已提交 Fix PR [#10587](https://github.com/AstrBotDevs/AstrBot/pull/10587)，修改前缀匹配与等级校验，待合并。

**功能请求与路线图信号**
- **Agent 首次运行引导机制**：PR [#10329](https://github.com/AstrBotDevs/AstrBot/pull/10329) 引入了一个分四步（使用须知、模型配置、嵌入聊天测试、平台设置）的 First-run Setup Guide，极大提升新手上手体验，预计将很快合入主干。
- **平台与搜索能力扩展**：PR [#9838](https://github.com/AstrBotDevs/AstrBot/pull/9838) 新增 Serply 搜索引擎接入；PR [#10153](https://github.com/AstrBotDevs/AstrBot/pull/10153) 增加 StepFun 提供商预设。两者均处于待合并状态，将丰富 LLM 与插件生态的接入便捷度。
- **UI 与底层权限增强**：多个 Issue 集中于改进 WebUI，包括图片管理可视化（[#10595](https://github.com/AstrBotDevs/AstrBot/issues/10595)）、多语言一键切换（[#10593](https://github.com/AstrBotDevs/AstrBot/issues/10593)）及拖拽插件排序（[#10594](https://github.com/AstrBotDevs/AstrBot/issues/10594)）；在底层，PR [#10466](https://github.com/AstrBotDevs/AstrBot/pull/10466) 探索使用 AppContainer 构建原生 Windows 沙箱，标志着该项目向更深度的操作系统级隔离能力演进。

**用户反馈摘要**
- **痛点与场景**：用户在多平台部署（如雨云容器、云原生环境）时对 Local 模式的权限依赖感到困惑（[#10583](https://github.com/AstrBotDevs/AstrBot/issues/10583)）；此外，中文社区用户在 issue 提交时频繁遇到行为准则仅支持英文的问题（[#10578](https://github.com/AstrBotDevs/AstrBot/issues/10578)），PR [#10580](https://github.com/AstrBotDevs/AstrBot/pull/10580) 正在通过增加中文路由解决此问题。
- **满意与预期**：社区贡献者对 Agent 消息追踪与 SQLite 历史记录的优化（PR [#10515](https://github.com/AstrBotDevs/AstrBot/pull/10515)）及飞书 Markdown 富文本消息解析修复（PR [#10582](https://github.com/AstrBotDevs/AstrBot/pull/10582)）抱有期待，这些更新将显著改善群聊和长上下文处理中的信息完整度与可观测性。

**待处理积压**
- **知识库 Embedding 服务截断限制**：PR [#10110](https://github.com/AstrBotDevs/AstrBot/pull/10110) 提交时间已较长，该 PR 修复了由于上传 Dashboard 强制发送 `batch_size=32` 导致部分 embedding 服务（如 DashScope）输入超出限制而写入失败的问题。目前仍处 Open 状态，建议维护者尽快 Review 并合并。
- **长尾 Issue 清理**：部分创建于 2025-06 的历史长尾 Issue 如 #1831（LLM 解析文件配置提示），虽已关闭但曾长期存在，团队需关注后续更新说明以指导用户。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报 (2026-10-17)

## 1. 今日速览
DeepSeek Harness 项目在24小时内发布了 **dsh-v0.2.1-alpha.5** 版本，主要修复了终端管理、插件状态同步及跨平台UI偏移等核心问题。项目今日活跃度极高，共产生 **147** 条 Discussions 更新，其中关于 Windows 沙箱崩溃（0xC0000142）和 API 协议兼容性（OpenCode Go）的讨论尤为激烈。尽管官方未启用 PR 机制，但通过高频的 alpha 迭代（该版本为 v0.2.1 系列的第5个 alpha）展示了快速的修复响应能力，项目处于高强度开发与稳定性打磨阶段。

## 2. 版本发布

### dsh-v0.2.1-alpha.5 更新详情
**发布时间**：2026-10-17
**变更类型**：Bug Fix & Feature Enhancement (Chore)

**主要修复 (Bug Fixes)**：
1. **插件技能列表同步修复**：修复了在插件页面启用/停用插件后，已打开会话的 `/` 菜单未即时更新技能列表的问题。(@grllll)
    - *链接*: [Compare](https://github.com/deepseek-ai/deepseek-harness/compare/dsh-v0.2.1-alpha.4...dsh-v0.2.1-alpha.5)
2. **终端性能与稳定性优化**：减少了新建/恢复多个终端时的重复查询，并防止失效终端在切换面板后反复重试。(@LegGasai)
3. **PTC Mode 指引完善**：改善了 PTC 模式中缺失的指引部分，并统一了 SDK、Web 和 Headless 模式下的模型身份说明。(@koalazf99)
4. **UI 交互修复**：修复了在 Windows 和 Linux 下，右侧栏收起时，在输入框按 `Page Up` 导致整个界面向左偏移的异常行为。(@imccyu)

**新增功能 (Chores)**：
- **Slot 扩展**：新增 `conversation.input.model.label` Slot，允许插件根据模型渠道（Provider）自定义输入框中模型选择器的名称展示。(@LegGasai)

**破坏性变更与迁移**：
- 无破坏性变更。
- *注意*：作为 alpha 版本，开发者若依赖 `/` 菜单技能列表的即时性，升级后应验证插件配置的热加载行为。

## 3. 项目进展
由于该项目采用 **Releases 驱动合并** 模式，v0.2.1-alpha.5 代表了当前的核心进展：
- **稳定性攻坚**：针对终端会话的生命周期管理进行了优化（减少冗余查询、防止无效重试），这直接回应了社区关于多终端场景下卡顿和崩溃的反馈。
- **插件生态完善**：通过新增模型标签 Slot，进一步增强了插件对 UI 定制化的能力，特别是针对多模型渠道（如不同 API Provider）的场景，提升了插件生态的灵活性。
- **体验一致性**：统一了不同运行环境（SDK/Web/Headless）的模型身份提示，降低了开发者的认知负担。

## 4. 社区热点
基于过去24小时147条 Discussions，以下话题关注度最高：

1. **[Ideas] API 请求头兼容性 (OpenCode Go)** [OPEN]
   - *作者*: @thdxr | *评论*: 42
   - *摘要*: 用户运营 OpenCode Go 托管推理 API，警告若请求中缺少 `x-opencode-session` 头（自9月5日起），将导致约2.5万用户组织调用失败。该讨论旨在推动 DSH 在 API 请求中支持自定义或标准的会话头传递。
   - *链接*: [#5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)

2. **[General] Linux 支持缺失抱怨** [OPEN]
   - *作者*: @xiaofeiyang-jiujianghukou | *评论*: 29
   - *摘要*: 用户强烈抱怨 Linux 平台被“遗忘”，指出目前仅 WorkBuddy 和 Qoder 等第三方工具支持 Linux，而官方 DeepSeek 工具链未提供原生 Linux 支持，社区呼声极高。
   - *链接*: [#8107](https://github.com/deepseek-ai/deepseek-harness/discussions/8107)

3. **[Q&A] 工作区创建失败** [OPEN]
   - *作者*: @l2685209197 | *评论*: 12
   - *摘要*: 用户报告在添加工作区时遇到 `workspaceController` 不可用错误，涉及网关服务状态问题。
   - *链接*: [#8357](https://github.com/deepseek-ai/deepseek-harness/discussions/8357)

4. **[Feature Proposal] 响应文本注释** [OPEN]
   - *作者*: @Myoontyee | *评论*: 10
   - *摘要*: 提议允许用户选中之前的 AI 响应文本并添加注释（Annotation），而非通过粘贴引用，以提升对话上下文管理的精确性。
   - *链接*: [#8750](https://github.com/deepseek-ai/deepseek-harness/discussions/8750)

## 5. Bug 与稳定性
**严重程度：高 (Critical/High)**

1. **Windows 沙箱崩溃 (0xC0000142)**
   - *现象*: 在 Windows 桌面端（无控制台宿主）或 `workspace-write` 模式下，沙箱内的 PowerShell (pwsh) 或 Shell 命令因 `STATUS_DLL_INIT_FAILED` 立即崩溃。
   - *影响*: Shell 功能在受限沙箱下 100% 失效。
   - *状态*: 未修复。多个独立用户（@TTmiao, @QiNatsu, @cmz333）报告了相同问题，确认是 `@deepseek-ai/dsh-sandbox-windows-acl` 在受限令牌和完整性级别处理上的缺陷。
   - *相关讨论*: [#810](https://github.com/deepseek-ai/deepseek-harness/discussions/810), [#9621](https://github.com/deepseek-ai/deepseek-harness/discussions/9621), [#9507](https://github.com/deepseek-ai/deepseek-harness/discussions/9507)

2. **Windows HTTPS 失败 (Schannel/SSPI)**
   - *现象*: 在 confined 沙箱下，依赖 Windows 原生 TLS (Schannel) 的 HTTPS 请求失败，报 `SEC_E_NO_CREDENTIALS`。
   - *影响*: 沙箱内无法访问需要系统凭据的受保护资源。
   - *状态*: 未修复。
   - *相关讨论*: [#9758](https://github.com/deepseek-ai/deepseek-harness/discussions/9758)

3. **Session 数据加载失败 (SubCallId 冲突)**
   - *现象*: PTC 子调用 ID 重复会导致整个 Session (v4 格式) 无法加载，造成数据丢失。
   - *影响*: 长会话数据完整性风险。
   - *状态*: 未修复。
   - *相关讨论*: [#9677](https://github.com/deepseek-ai/deepseek-harness/discussions/9677)

**严重程度：中 (Medium)**

4. **插件安装挂起 (Windows)**
   - *现象*: `dsh plugin add` 在 Windows 上执行时挂起，依赖安装完成但 Profile bundles 未 reconcile，导致插件“装了但不加载”。
   - *相关讨论*: [#9261](https://github.com/deepseek-ai/deepseek-harness/discussions/9261)

5. **Markdown 渲染缺陷**
   - *现象*: 多行 `$$` 公式块渲染错误，吞没正文内容。
   - *相关讨论*: [#9619](https://github.com/deepseek-ai/deepseek-harness/discussions/9619)

## 6. 功能请求与路线图信号
- **侧边任务面板 (Side Tasks)**: 社区插件 `ui-side-tasks` 已发布，允许在主对话右侧开启临时任务，用完即删。这一交互模式被用户认为极具价值，可能被纳入官方 UI 的长期规划。[#1712](https://github.com/deepseek-ai/deepseek-harness/discussions/1712)
- **记忆系统优化**: 用户分享了关于内存泄漏、写入粒度及清理机制的实战经验（引用 deer-flow 和 TencentDB），暗示 DSH 需要更健壮的记忆管理策略。[#5908](https://github.com/deepseek-ai/deepseek-harness/discussions/5908)
- **API 头部定制**: 随着托管推理 API（如 OpenCode Go）对会话头要求的提高，预计未来版本将在 API 配置中增加自定义 Header 支持。[#5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)

## 7. 用户反馈摘要
- **痛点**:
    - **Windows 沙箱不可用**: 用户强烈不满在 Windows 桌面版中 Shell 功能完全瘫痪，严重阻碍自动化任务执行。
    - **Linux 支持缺位**: 开发者群体对缺乏官方 Linux 支持表示失望，迫使部分用户转向第三方封装工具。
    - **数据安全风险**: Session 加载失败导致的数据丢失问题引发了用户对数据持久化可靠性的担忧。
- **满意点**:
    - **插件机制灵活**: 用户赞赏插件系统（如 `ui-side-tasks`）允许社区自定义 UI 交互的能力。
    - **快速迭代**: 尽管是 alpha 版本，但针对 UI 偏移、终端重试等小问题的修复速度较快（如 v0.2.1-alpha.5 中的修复）。

## 8. 待处理积压
- **Windows ACL 沙箱核心缺陷**: 涉及 Shell 崩溃和 HTTPS 失败的两个高严重度 Bug 已持续存在，且被多个用户独立复现，是当前阻碍 Windows 桌面版稳定性的最大瓶颈，需优先处理。[#810](https://github.com/deepseek-ai/deepseek-harness/discussions/810), [#9758](https://github.com/deepseek-ai/deepseek-harness/discussions/9758)
- **Linux 平台适配**: 社区呼声极高的 Linux 支持需求尚未在路线图中有明确回应，需关注用户流失风险。[#8107](https://github.com/deepseek-ai/deepseek-harness/discussions/8107)
- **API 兼容性**: OpenCode Go 等服务商提出的会话头要求若长期未响应，可能影响依赖这些托管服务的 2.5 万用户组织。[#5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*