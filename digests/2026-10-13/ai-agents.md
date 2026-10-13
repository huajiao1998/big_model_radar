# OpenClaw 生态日报 2026-10-13

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-13 02:45 UTC

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

**日期**：2026-10-13

## 1. 今日速览
过去24小时 OpenClaw 社区保持高活跃度，共发生 1000 条 GitHub 事件（500 条 Issue 更新，500 条 PR 更新）。项目发布了 2 个新版本，主要集中在修复更新机制的阻断性 Bug 和 Windows 平台的手动更新路径问题。当前社区关注焦点从底层协议向 **Windows/系统级稳定性**、**内存泄漏** 和 **UI 框架重构** 倾斜。尽管 PR 待合并量巨大（303 个），但已有 197 个 PR 完成合并或关闭，表明项目仍在高频交付，但部分核心维护者（如 @steipete）的个人贡献占据了大量代码变更，单点依赖风险需关注。

## 2. 版本发布
今日发布了两个针对更新通道问题的修复版本，表明维护团队正在紧急解决安装与升级流程中的死锁问题：

*   **v2026.10.5-beta.2** ([Release Notes](https://github.com/openclaw/openclaw/releases))
    *   **核心修复**：针对 `openclaw update` 命令在更新交接（handoff）过程中的状态清理问题。修复了由于陈旧租约（stale handoff leases）或遗留恢复记录（legacy 2026.9.8 recovery records）导致更新卡在 `update-recovery-pending` 的问题。
    *   **系统稳定性**：解决了 Windows 短路径处理、Webhook 监听器未随服务正常启动的问题，并维持了服务堆内存限制。
*   **v2026.10.2** ([Release Notes](https://github.com/openclaw/openclaw/releases))
    *   **升级路径修复**：修复了从稳定版 2026.10.1 升级时发生的错误终止问题。
    *   **多平台支持**：解决了 Windows、克隆文件系统（cloned-filesystem）及私有 Node 环境下更新路径停滞或回滚失败的问题（关联 PR #168849, #169031）。

## 3. 项目进展
今日 500 条 PR 事件中，已有 197 条完成（合并或关闭），项目正在向 **Control UI 现代化** 和 **性能优化** 迈进：

*   **UI 框架迁移（Solid.js）**：主维护者 @steipete 正在主导将 Web UI 从 Lit 迁移至 Solid.js。今日多个 PR 更新，包括侧边栏渲染迁移 ([#168852](https://github.com/openclaw/openclaw/pull/168852))、聊天面板重构 ([#169835](https://github.com/openclaw/openclaw/pull/169835)) 以及对话框/Toast 组件迁移 ([#170387](https://github.com/openclaw/openclaw/pull/170387))。
*   **性能调优**：多个 PR 针对 Gateway 空闲状态下的唤醒机制进行了优化，旨在减少无意义的心跳和 SQLite 维护（[#170531](https://github.com/openclaw/openclaw/pull/170531), [#170520](https://github.com/openclaw/openclaw/pull/170520)）。
*   **自动化重构**：推进了周期性心跳（periodic heartbeats）的迁移并退役旧的执行器（executor） ([#167796](https://github.com/openclaw/openclaw/pull/167796))。

## 4. 社区热点
以下 Issue 拥有最高的评论数（>20 条），反映了当前最集中的痛点：

*   **[#159356] Llama.cpp 内存/连接错误** ([Issue](https://github.com/openclaw/openclaw/issues/159356) | 26 评论)：用户 @Polydoros-Agent 报告在 8GB 内存下 Llama.cpp 嵌入子进程退出后报告 ready，导致 500 错误。讨论集中在内存压力导致的 OOM 关联性及语义召回故障。
*   **[#159662] 模型目录工作进程内存泄漏** ([Issue](https://github.com/openclaw/openclaw/issues/159662) | 22 评论)：开发者 @svdinu-jpg 复现了 `prepared-model-catalog.worker.js` 的无界内存泄漏（4-5 GB/h），该问题与提供商和负载无关，严重影响长期运行稳定性。
*   **[#160959] 大型插件导致 Gateway 阻塞** ([Issue](https://github.com/openclaw/openclaw/issues/160959) | 20 评论)：由于插件生成捕获（plugin generation capture）机制的引入，包含大型依赖树的外部插件会导致事件循环阻塞数分钟，被标记为 2026.9.6 的回归（Regression）。
*   **[#50093] WhatsApp 消息回填** ([Issue](https://github.com/openclaw/openclaw/issues/50093) | 20 评论)：长期未决的消息丢失痛点。当 WhatsApp Web 连接断开并重连时，离线期间的消息未被日志记录或投递，严重影响监控类 Bot 的可靠性。

## 5. Bug 与稳定性
今日报告的 P0/P1 级 Bug 依然密集，主要集中在**更新机制**、**内存管理**和**Windows 环境**：

*   **P0 阻断级 (UX-Release Blocker)**：
    *   **更新路径死锁**：多个 Issue（[#156112](https://github.com/openclaw/openclaw/issues/156112), [#146860](https://github.com/openclaw/openclaw/issues/146860), [#167652](https://github.com/openclaw/openclaw/issues/167652)）指出 `openclaw update` 在全局安装交换（global install swap）或 Windows 计划任务身份识别时失败，导致更新卡在 `activating` 或 `abandoned`。修复 PR 已在 v2026.10.5-beta.2 中包含。
    *   **磁盘填满**：[#158390](https://github.com/openclaw/openclaw/issues/158390) 报告 `plugin-captures` 临时目录未被 GC，导致无限磁盘增长。
    *   **僵尸进程**：[#97616](https://github.com/openclaw/openclaw/issues/97616) 指出 Hook/Tool 执行导致的子进程未回收（zombie accumulation），造成长期运行后运行时退化。
*   **P1 严重级**：
    *   **启动回归**：[#168955](https://github.com/openclaw/openclaw/issues/168955) 报告 2026.10.1 版本在 Windows 上启动时间从 ~410s 激增至 ~1030s，归因于侧车（sidecars）加载阻塞。
    *   **权限泄露**：[#157126](https://github.com/openclaw/openclaw/issues/157126) 和 [#153426](https://github.com/openclaw/openclaw/issues/153426) 涉及安全边界。前者指出 MCP 桥接继承了错误的作用域，后者指出受信任的 `MEMORY.md` 在特定操作后被永久且静默地排除在启动注入之外，无诊断信息。
    *   **会话状态**：[#97616](https://github.com/openclaw/openclaw/issues/97616) 的上下文溢出预检查计算错误，高估 token 使用 2.3-2.6 倍，导致不必要的截断。

## 6. 功能请求与路线图信号
*   **FaceTime 视频桥接**：PR [#158392](https://github.com/openclaw/openclaw/pull/158392) 正在开发基于 FaceTime 的实时视频桥接，这是一个极具实验性但关注度高的功能，旨在支持 OpenAI Realtime 的视觉输入。
*   **Muse Wonder 模型支持**：PR [#170232](https://github.com/openclaw/openclaw/pull/170232) 快速跟进 Meta 新发布的 Muse Wonder 模型，支持 1M 上下文窗口，表明项目模型适配速度非常快。
*   **MCP 审批管道**：[#78308](https://github.com/openclaw/openclaw/issues/78308) 请求为 MCP 工具调用添加基于 Channel 的审批机制（Consent Envelope），这在安全性上是一个重要信号，可能纳入下一版本的安全强化包。
*   **Onboarding Wizard 优化**：[#16670](https://github.com/openclaw/openclaw/issues/16670) 呼吁在初始设置中强制要求配置 Memory/Embedding，反映出新用户对默认配置不满足痛点（搜索不可用）的强烈反馈。

## 7. 用户反馈摘要
*   **痛点 - 安装与更新极其痛苦**：用户高频提及 `openclaw update` 失败、回滚失败、Windows 下静默挂起。v2026.10.x 版本的发布正是对这一高频抱怨的回应。
*   **场景 - 长期运行的可靠性**：大量用户（如 @svdinu-jpg）在长时间运行后遇到内存泄漏（RSS 暴涨）和僵尸进程。作为 24/7 助手，稳定性是关键。
*   **不满 - 静默故障**：用户强烈抱怨系统（如 `MEMORY.md` 被排除、消息丢失）在发生问题时没有任何诊断信息或 CLI 命令可以恢复，导致“Black Box”体验。
*   **满意 - 性能优化方向**：用户关注到维护者正在将 UI 任务移出 Gateway 主线程（Performance PR），这表明官方也在积极响应对响应速度的追求。

## 8. 待处理积压
*   **PR 积压严重**：目前仍有 **303 个 PR 待合并**，其中包含大量由 @steipete 提交的 Solid.js UI 重构和性能优化 PR。由于代码量巨大（多为 XL 级别），合并窗口可能受到维护者带宽限制。
*   **长期未响应的 P1/P2 Bug**：
    *   **#50093** (WhatsApp 消息回填) 和 **#97616** (僵尸进程) 虽然评论活跃，但标记为 `stale` 或无新修复 PR，需警惕成为持久性缺陷。
    *   **#159356** (Llama.cpp) 标记为 `needs-product-decision`，表明团队尚未确定如何架构本地模型管理的资源限制。
    *   **建议**：维护者需尽快清理 `clawsweeper:no-new-fix-pr` 标签下的 P0 级更新 Bug，以免阻碍 2026.10 稳定版的最终发布。

---

## 横向生态对比

# 2026-10-13 个人 AI 助手与自主智能体开源生态横向对比分析报告

### 1. 生态全景
当前开源 AI 智能体生态呈现出**“底层架构收敛、终端体验分化、稳定性成为核心瓶颈”**的态势。项目普遍从单纯的 LLM 封装向具备长期记忆、多模态交互及自主执行能力的**“个人数字管家”**演进。然而，随着复杂度的提升，**更新机制鲁棒性**、**内存管理**及**跨平台（尤其是 Windows）兼容性**成为各项目的共性痛点，社区正从功能竞赛转向工程成熟度竞赛。

### 2. 各项目活跃度对比

| 项目 | 24h Issues 动态 | 24h PR 动态 | Release 情况 | 健康度评估 |
| :--- | :---: | :---: | :--- | :--- |
| **OpenClaw** | 500 | 500 (197 已处理) | 2 个 (紧急修复) | ⚠️ **高风险高负载**：核心维护者单点依赖风险高，更新机制存在 P0 级阻断 Bug，但交付频率极高。 |
| **Zeroclaw** | 33 | 50 | 无 | ✅ **稳健架构期**：处于 v0.9.0 重构关键期，重点解决安全隔离与状态持久化，工程健康度良好。 |
| **PicoClaw** | 1 | 7 (6 已处理) | 无 | ✅ **低活跃度维护期**：主要清理历史积压 PR，无重大新功能，处于稳定维护阶段。 |
| **QwenPaw** | 16 | 24 | 无 | ✅ **高响应敏捷型**：紧急 Bug 修复响应快（24-48h），社区新贡献者活跃，功能迭代平滑。 |
| **hermes-agent** | 400 | 500 (124 已处理) | 1 个 (累积 Patch) | ⚠️ **高复杂度瓶颈期**：v0.21.7 为大版本累积，但安装/更新机制及 Windows 非 ASCII 环境存在较多兼容性痛点。 |
| **AstrBot** | 335 清理 | 258 合并 | 无 | ✅ **生态繁荣期**：插件生态爆发，底层稳定性修复密集，正在为架构隔离做技术准备。 |
| **DeepSeek Harness** | N/A (196 讨论) | N/A (0 PR) | 0 | ⚠️ **社区驱动滞后**：高热度讨论包含大量修复原型，但官方发版滞后，处于“讨论先行，代码滞后”状态。 |

### 3. OpenClaw 在生态中的定位
*   **优势与定位**：OpenClaw 是目前生态中**工程体量最大、功能最全面**的“重型”个人 AI 助手。相比 PicoClaw（轻量嵌入式）和 AstrBot（社群娱乐/插件生态），OpenClaw 更侧重于**长期运行的可靠性**和**全平台自动化**。
*   **技术路线差异**：
    *   **UI 架构**：OpenClaw 正在主导从 Lit 向 **Solid.js** 的迁移，这是目前生态中较激进的前端性能优化路线，旨在解决 Gateway 主线程阻塞问题。
    *   **模型适配速度**：OpenClaw 对 Meta Muse Wonder 等新模型的跟进速度极快（PR #170232），体现了其作为“全能助手”对模型多样性的强适应性。
    *   **对比**：Zeroclaw 侧重**安全隔离与 RPC**，AstrBot 侧重**插件中台**，而 OpenClaw 侧重**系统级集成（含 FaceTime 视频桥接等实验性功能）**。
*   **社区规模对比**：OpenClaw 的 PR 积压（303 个）和 Issue 量远超其他项目，表明其用户基数和贡献者规模在生态中占据核心地位，但也带来了最大的维护压力。

### 4. 共同关注的技术方向
*   **Windows 平台稳定性与兼容性**
    *   **涉及项目**：OpenClaw, hermes-agent, DeepSeek Harness, Zeroclaw.
    *   **具体诉求**：OpenClaw 遭遇更新死锁与短路径问题；hermes-agent 在非 ASCII 用户名下更新失败；DeepSeek Harness 在沙箱环境下 PowerShell 100% 崩溃；Zeroclaw 存在 macOS TUI 快捷键不适配。Windows 已从“支持平台”变为“高摩擦平台”。
*   **内存泄漏与长期运行可靠性**
    *   **涉及项目**：OpenClaw, Zeroclaw, DeepSeek Harness.
    *   **具体诉求**：OpenClaw 报告模型目录工作进程内存泄漏（4-5GB/h）及僵尸进程；Zeroclaw 关注多智能体状态恢复时的内存一致性；DeepSeek Harness 在长上下文下出现推理循环退化。
*   **更新与安装机制的幂等性**
    *   **涉及项目**：OpenClaw, hermes-agent.
    *   **具体诉求**：两个项目均将大量精力投入修复 `update` 命令的状态清理、回滚失败及版本升级路径阻断问题，反映出自动化升级是个人 AI 助手普及的关键障碍。
*   **安全边界与权限隔离**
    *   **涉及项目**：Zeroclaw, AstrBot, OpenClaw.
    *   **具体诉求**：Zeroclaw 强化 RPC 日志权限与插件安全验证；AstrBot 推进 MCP OAuth 鉴权及插件隔离架构；OpenClaw 关注 MCP 桥接权限泄露及 MEMORY.md 静默排除问题。

### 5. 差异化定位分析

| 维度 | OpenClaw | Zeroclaw | PicoClaw | QwenPaw | hermes-agent | AstrBot | DeepSeek Harness |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **核心侧重** | 全功能个人助手 | 多智能体安全编排 | 边缘/嵌入式轻量助手 | Web 控制台与多端协同 | 桌面/CLI 混合网关 | 社群插件中台 | 开发者/Agent 框架 |
| **目标用户** | 重度个人用户 | 企业/高级开发者 | IoT/嵌入式开发者 | Web 部署/多端用户 | 桌面应用/云混合用户 | 社群运营/游戏玩家 | 开发者/自动化工程师 |
| **架构特征** | 前端重构中，系统级集成 | RPC 隔离，状态持久化 | 历史代码清理，移动端优化 | 前端流式同步，工具审批 | 多端会话统一，插件目录 | 插件生态爆发，视频输入 | 社区驱动，高密度讨论 |

*   **关键差异点**：
    *   **PicoClaw** 是唯一明确针对**移动端/Termux** 和嵌入式场景进行优化（如 CA 证书路径）的项目。
    *   **AstrBot** 是唯一通过**插件生态**驱动活跃度的项目，其核心价值在于低门槛的社群娱乐与资讯聚合。
    *   **Zeroclaw** 在**多智能体（Multi-Agent）通信与持久化**方面最为深入，拥有独特的 A2A 协议 RFC 和状态恢复机制。

### 6. 社区热度与成熟度
*   **快速迭代/高热度阶段**：
    *   **OpenClaw** & **hermes-agent**：活跃度极高，但伴随着大量的 P0/P1 级 Bug（更新失败、内存泄漏、Windows 兼容）。处于**功能爆发后的稳定性攻坚期**，成熟度面临挑战。
    *   **AstrBot**：插件生态繁荣，底层修复密集。处于**生态扩张期**，通过清理积压 Issue 提升基础工程质量。
*   **质量巩固/架构深化阶段**：
    *   **Zeroclaw**：无新版本发布，专注于 v0.9.0 的架构重构（Gateway 分离、插件安全）。处于**核心架构稳定期**。
    *   **QwenPaw**：响应敏捷，修复周期短。处于**产品打磨与体验优化期**（如多端同步、搜索成本控制）。
*   **特殊状态**：
    *   **DeepSeek Harness**：处于**“社区超跑，官方慢走”**的失衡状态。大量高质量社区贡献（原型、定位）未转化为官方 Release，成熟度评估需降低对官方响应的权重，提升对社区共识的重视度。
    *   **PicoClaw**：处于**静默维护期**，主要处理遗留代码，热度低但稳定。

### 7. 值得关注的趋势信号
1.  **从“能跑”到“能长期跑”的质变需求**：
    *   **信号**：OpenClaw 和 hermes-agent 均将“更新机制死锁”和“长期运行内存泄漏”列为最高优先级 P0/P1 问题。
    *   **价值**：对于 AI 开发者而言，**幂等性更新脚本**、**无泄漏的资源管理**和**僵尸进程回收**不再是后端细节，而是决定个人 AI 助手能否作为 7x24 背景服务存在的生死线。

2.  **Windows 成为跨平台开发的“阿喀琉斯之踵”**：
    *   **信号**：5 个项目报告了 Windows 相关的严重 Bug（非 ASCII 路径、沙箱崩溃、短路径、启动阻塞）。
    *   **价值**：开发者需重新评估 Windows 的 CI/CD 覆盖度。针对**非 ASCII 字符编码**（如中文用户名）和**受限令牌环境**（如沙箱）的测试用例应成为开源 AI 助手的最小验收标准。

3.  **“混合执行”与“隐私本地化”的架构演进**：
    *   **信号**：hermes-agent 提出“远程 Agent + 本地工具执行”（#18715），Zeroclaw 强化 RPC 权限隔离，DeepSeek Harness 推出本地加密凭据保险库（dsh-vault）。
    *   **价值**：行业正在从“云端全能”向**“边缘计算/本地隐私优先”**架构演进。未来 AI 助手将更多地采用**云端大脑 + 本地手脚**的混合架构，以平衡算力成本、隐私安全与响应速度。

4.  **多模态交互成为标配，但“静默故障”是最大体验杀手**：
    *   **信号**：AstrBot 引入视频输入，QwenPaw 优化流式交互，但 OpenClaw 和 Hermes 均被用户投诉“静默故障”（消息丢失、无诊断信息、黑盒体验）。
    *   **价值**：开发者在扩展多模态能力时，必须同步建设**可观测性（Observability）**体系。提供清晰的错误诊断、状态回滚提示和 CLI 恢复工具，比单纯增加新功能更能提升用户对 AI 助手的信任度。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 (2026-10-13)

## 1. 今日速览
Zeroclaw 项目今日保持极高的工程活跃度，过去 24 小时内有 33 条 Issues 和 50 条 PRs 发生更新，其中核心维护者 Audacity88 和 IftekharUddin 密集提交了多项修复与文档更新。项目当前正处于从 **v0.8.6 向 v0.9.0 过渡的关键架构重构期**，重点解决 Gateway 分离、插件系统安全加固及多智能体持久化状态管理问题。虽然暂无新版本发布，但社区反馈集中反映了 Web Dashboard 的交互瑕疵和 CLI 在 macOS 下的特定兼容性问题，整体工程健康度良好，但需关注配置覆盖导致的稳定性隐患。

## 2. 版本发布
**今日无新版本发布。**

## 3. 项目进展
今日主要推进了 **插件系统安全加固** 与 **多智能体状态恢复机制** 两项核心功能。

*   **插件系统 (WASM/RPC)**: PR [#11261](https://github.com/zeroclaw-labs/zeroclaw/pull/11261) 完成了插件包通过分阶段准入机制进行替换的逻辑，配合 PR [#11228](https://github.com/zeroclaw-labs/zeroclaw/pull/11228) 强化了命名 TLS 配置文件在物化过程中的安全性验证，标志着 v0.8.6 版本的插件交付流程趋于完善。
*   **状态恢复 (Agents)**: PR [#11301](https://github.com/zeroclaw-labs/zeroclaw/pull/11301) 修复了由于 Agent 重命名导致的配置与工作区、内存、Cron 任务之间的状态脱节问题，使得 CLI、Gateway 和 RPC 能够共享基于持久化状态的“已提交重命名”恢复逻辑。
*   **RPC 安全隔离**: PR [#11326](https://github.com/zeroclaw-labs/zeroclaw/pull/11326) 修复了 RPC 服务中 `logs/query` 和 `logs/get` 权限控制粗糙的问题，禁止了非全局流访问主体（scoped principals）读取持久化日志。

## 4. 社区热点
*   **A2A 协议架构 (RFC)**: 关于 `zeroclaw-a2a` crate 的 RFC ([#11254](https://github.com/zeroclaw-labs/zeroclaw/issues/11254)) 今日活跃度极高，社区正在激烈讨论如何重构现有的 A2A wire model，并分离出站客户端与入站发现表面，以应对跨智能体通信的复杂性。
*   **多智能体编排与持久化**: 针对如何让 peer-agent 任务持久化并可追踪归属的问题 ([#9597](https://github.com/zeroclaw-labs/zeroclaw/issues/9597)) 受到持续关注。目前的 `send_message_to_peer` 采用的是非绑定式处理，导致任务脱离主生命周期，社区正在寻求方案将其转化为带有发送者和父生命周期绑定的运行时任务。

## 5. Bug 与稳定性
今日报告了多个影响用户体验的稳定性 Bug，主要集中在 Web 端交互与配置覆盖层面。

*   **[S1 严重] Web Dashboard 配对受限**: 用户反馈 Dashboard 的配对输入框仍限制为 6 位数字，而 CLI 后端已升级至 32 位字母数字混合码，导致 Web 端验证失败 ([#11648](https://github.com/zeroclaw-labs/zeroclaw/issues/11648))。该问题目前暂无 Fix PR。
*   **[S2 严重] 配置重写导致状态丢失**: 在使用 `model_routing_config` 的 `upsert_agent` 更新 Agent 路由配置时，会意外重写整个 `config.toml`，导致风险/运行时配置被重置或字段被丢弃 ([#11606](https://github.com/zeroclaw-labs/zeroclaw/issues/11606))。已提交修复 PR [#11693](https://github.com/zeroclaw-labs/zeroclaw/pull/11693) 以确保只更新目标字段。
*   **[S2 严重] 消息时间戳回归**: SQLite 会话后端在每次回合时都会重写所有消息的 `created_at` 时间戳，导致历史消息的精确时间丢失 ([#11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420))。
*   **[S3 轻微] 零代码成本统计混乱**: ZeroCode 仪表盘的成本（Cost）标签页同时显示了 UTC 和本地时间统计，但未做区分，造成数据混淆 ([#11694](https://github.com/zeroclaw-labs/zeroclaw/issues/11694))。

## 6. 功能请求与路线图信号
*   **RAG 文档检索**: 针对操作者文档的语言/工具检索需求，社区已提出 RFC ([#11235](https://github.com/zeroclaw-labs/zeroclaw/issues/11235))，建议利用现有的文档语料库进行增强，预计将作为下一阶段重要能力补充。
*   **Web 搜索路由**: 针对 Web 搜索工具（`web_search_tool`），用户建议增加 `[[search_routes]]` 配置，以模仿模型路由机制，实现针对主源/独立源的搜索提供商分流 ([#11074](https://github.com/zeroclaw-labs/zeroclaw/issues/11074))。
*   **Gateway 负载限制**: 针对多智能体 A2A 消息传递的场景，有提议使 Gateway 的 `MAX_BODY_SIZE` 可配置，并返回具体的拒绝错误码，以解决长上下文消息被直接丢弃的问题 ([#11668](https://github.com/zeroclaw-labs/zeroclaw/issues/11668))。

## 7. 用户反馈摘要
*   **TUI 快捷键不适配 macOS**: 多个用户（包括维护者 Audacity88）反馈 ZeroCode 暂停队列提示按 `⌥P` 在 macOS Terminal 中实际输入的是 `π` 字符，导致 TUI 交互受阻 ([#11691](https://github.com/zeroclaw-labs/zeroclaw/issues/11691))。
*   **Web 聊天焦点丢失**: 用户在 Web Dashboard 聊天时，Agent 回复结束后输入框会失去焦点，必须手动再次点击才能继续对话，严重影响连续交互体验 ([#11658](https://github.com/zeroclaw-labs/zeroclaw/issues/11658))。
*   **性能疑虑**: 用户担忧系统提示词（System Prompt）在每次回合时都会从磁盘重建，导致频繁修改人格文件（personality files）会击穿所有活跃会话的提示词缓存（Prompt Cache）。对此，PR [#11698](https://github.com/zeroclaw-labs/zeroclaw/pull/11698) 已提供初步修复思路，确保会话期间稳定性。

## 8. 待处理积压
*   **RFC 决策队列积压**: 关于 RFC 和设计问题的维护者决策队列 ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)) 拥有 15 条评论但已停滞，多个高优先级 RFC（如 A2A 协议、知识检索）正在等待明确的分发或拆分决策。
*   **Discord 插件全链路验证**: 任务 [#10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999) 处于阻塞状态，等待发布一个包含 WASM 启用的 Release 二进制文件，以进行端到端的 Discord 插件安装与通信证明。
*   **网关持久化内存对等性**: 跨会话持久化内存系统（Persistent Memory）在相关性/可操作性平面上与对等 Agent 运行时的差距仍未完全拉平，相关协调项被归入 epic 追踪器 ([#8891](https://github.com/zeroclaw-labs/zeroclaw/issues/8891))。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 (2026-10-13)

## 1. 今日速览
项目过去 24 小时保持中等活跃度，主要动态集中在代码清理与历史积压处理，而非新功能开发。今日处理了 7 条 Pull Requests，其中 6 条已合并或关闭，表明维护团队正在积极清理长期未合并的 PR 积压。同时，有 1 条新的 Bug 报告涉及 Telegram 通道，以及 1 条关于 OneBot 通道功能的请求已转化为 PR 并被处理。目前无新版本发布，项目处于稳定维护与代码整合阶段。

## 2. 项目进展
今日共处理 7 条 Pull Request，大部分为 3 月份提交的历史积压 PR，由贡献者 @badgerbees 提交并在今日完成合并或关闭，体现了项目对长期未决代码的清理力度。

*   **[CLOSED] feat(logger): make logger time format configurable** ([#1500](https://github.com/sipeed/picoclaw/pull/1500))
    实现了通过 `config.json` 配置日志时间格式的功能，增强了系统的可配置性。该 PR 已关闭，需确认是否已合并入主分支。
*   **[CLOSED] fix(openai_compat): load system CA certs from Termux paths** ([#1397](https://github.com/sipeed/picoclaw/pull/1397))
    修复了在 Android/Termux 环境下，由于 Go 无法探测 Termux 特定路径导致 SSL/TLS 证书验证失败的问题。这是一个重要的移动端/嵌入式平台兼容性修复。
*   **[CLOSED] fix(openai_compat): strip extra_content from tool calls** ([#1509](https://github.com/sipeed/picoclaw/pull/1509))
    修复了当 OpenAI 兼容接口接收来自 Google/Gemini 的带有 `extra_content`（扩展思考）的工具调用时，因其他提供商不支持该字段导致的验证错误。提升了多模型支持的稳定性。
*   **[CLOSED] feat(feishu): implement thread isolation and reply-in-thread** ([#1676](https://github.com/sipeed/picoclaw/pull/1676))
    为飞书（Feishu）通道实现了线程隔离功能，防止同一群组内不同讨论话题之间的上下文泄漏，并与 Telegram 通道的线程隔离功能保持特性对齐。
*   **[CLOSED] fix(telegram): improve HTML chunking and preserve word boundaries** ([#1651](https://github.com/sipeed/picoclaw/pull/1651))
    改进了 Telegram HTML 格式消息的分块逻辑，确保在溢出重试分割时保留换行符和单词边界，避免格式错乱或单词被截断。
*   **[CLOSED] feat(channels/onebot): add opt-in toggle for acknowledgement reactions** ([#3396](https://github.com/sipeed/picoclaw/pull/3396))
    响应 Issue #3395，为 OneBot (QQ) 通道添加了 `reaction_enabled` 配置项（默认 `false`），允许用户关闭自动表情回复功能。该 PR 已关闭。
*   **[OPEN] feat: Switch Openai to responses API** ([#3381](https://github.com/sipeed/picoclaw/pull/3381))
    提议将 OpenAI 提供商切换至新的 Responses API。该 PR 仍处于开放状态，是今日唯一待合并/处理的 PR，可能涉及未来版本的核心接口变更。

## 3. 社区热点
*   **[OPEN] [BUG] QQ机器人的接口更新了，但QQ聊天通道的接口似乎没有更新** ([#3394](https://github.com/sipeed/picoclaw/issues/3394))
    *   **现状**：状态为 `[stale]`，于 2026-09-26 创建，10-12 更新。
    *   **分析**：用户 @qinglt 反馈 QQ 官方接口更新导致 PicoClaw 的 QQ 通道不兼容。虽然相关 PR (#3396) 已处理了部分功能请求，但核心接口同步问题仍需关注。`[stale]` 标签暗示该问题可能因长期未响应而被归档，需维护者确认 QQ 通道的支持状态。
*   **[CLOSED] [Feature] Make OneBot auto-ack reaction configurable** ([#3395](https://github.com/sipeed/picoclaw/issues/3395))
    *   **现状**：已关闭。
    *   **分析**：该 Issue 提出的需求已通过 PR #3396 解决。用户对 OneBot 通道中自动表情回复干扰消息流的需求得到了满足，体现了社区对细节体验的关注。
*   **[OPEN] [BUG] CLAassistant does not detect signature** ([#3392](https://github.com/sipeed/picoclaw/issues/3392))
    *   **现状**：状态为 `[stale]`。
    *   **分析**：CLA (Contributor License Agreement) 助手无法检测到贡献者签名，阻碍了 PR #3381 的合并。这是一个流程性问题，虽不影响产品功能，但影响社区贡献流程。

## 4. Bug 与稳定性
*   **[OPEN] [BUG] Telegram MarkdownV2 skips escaping link labels and blockquote text** ([#3426](https://github.com/sipeed/picoclaw/issues/3426))
    *   **严重程度**：中。
    *   **描述**：启用 Telegram MarkdownV2 时，链接标签和引用文本中的保留字符未正确转义，导致 Telegram 拒绝回复，PicoClaw 回退到纯文本模式，丢失整个回复的格式。
    *   **Fix 状态**：暂无直接对应的 Fix PR，但该问题与 PR #1651 (HTML chunking) 相关，显示维护团队正在积极改善 Telegram 消息格式化逻辑。
*   **[OPEN] [BUG] CLAassistant does not detect signature** ([#3392](https://github.com/sipeed/picoclaw/issues/3392))
    *   **严重程度**：低（流程性 Bug）。
    *   **描述**：CLA 检测失败，影响 PR #3381 的自动化流程。

## 5. 功能请求与路线图信号
*   **OneBot 通道精细化控制**：Issue #3395 和 PR #3396 表明用户希望控制 QQ 机器人（OneBot）的自动行为（如表情回复）。这暗示未来版本可能会增强各通道的可配置性。
*   **OpenAI Responses API 支持**：PR #3381 提出切换至 Responses API，若合并，将提升 PicoClaw 与最新 OpenAI 接口的兼容性，可能是下一版本的亮点功能。
*   **飞书线程隔离**：PR #1676 实现了飞书通道的线程隔离，未来可能会将此特性推广到其他支持线程的通道（如 Slack, Discord）。

## 6. 用户反馈摘要
*   **痛点**：
    *   **通道兼容性滞后**：QQ 通道因官方接口更新而失效（#3394），显示 PicoClaw 对快速变化的第三方 API 跟进可能不足。
    *   **格式化问题**：Telegram 通道在复杂 Markdown/HTML 消息处理上存在稳定性问题（#3426, #1651），用户期望更健壮的消息渲染。
    *   **自动行为干扰**：OneBot 通道无条件发送表情回复，用户希望拥有关闭选项（#3395），反映用户对“无干扰”体验的需求。
*   **满意点**：
    *   维护团队对历史积压 PR 的快速清理（#1397, #1500, #1509, #1651, #1676, #3396），显示了良好的代码库卫生。
    *   对移动端/Termux 环境的支持修复（#1397），惠及嵌入式或轻量级部署用户。

## 7. 待处理积压
*   **PR #3381**：OpenAI Responses API 切换，已开放近一个月，且被 CLA 问题（#3392）阻塞。需维护者介入解决 CLA 检测问题或手动标记，以推进此重要特性。
*   **Issue #3394**：QQ 通道接口不同步，标记为 `[stale]`。若 QQ 通道仍是核心使用场景，需确认是否继续支持或提供迁移方案。
*   **Issue #3392**：CLA 检测问题，阻塞了 PR #3381 的自动合并，需检查 CLAassistant 配置。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期**: 2026-10-13

## 1. 今日速览
项目整体处于高活跃开发状态，过去24小时内有24条PR更新和16条Issue动态。社区贡献度提升显著，出现了多名首次贡献者（first-time-contributor）提交的PR，主要涉及Web搜索功能扩展和前端交互优化。当前版本焦点集中在修复二进制文件导入损坏、工具审批竞态条件以及Windows平台启动兼容性等核心稳定性问题。项目健康度良好，响应机制敏捷，多数紧急Bug在24-48小时内即有对应的修复PR落地。

## 2. 版本发布
过去24小时内无新版本发布。

## 3. 项目进展
今日合并/关闭的重要PR主要集中在**稳定性修复**与**核心功能补齐**：
*   **工具审批机制修复**：[PR #8188](https://github.com/agentscope-ai/QwenPaw/pull/8188) 关闭并合并，修复了工具审批时的竞态条件，解决了用户点击“同意”后仍被系统误判为“拒绝”的逻辑Bug（对应 [Issue #8105](https://github.com/agentscope-ai/QwenPaw/issues/8105)）。
*   **上下文管理优化**：[PR #8193](https://github.com/agentscope-ai/QwenPaw/pull/8193) 关闭并合并，优化了长会话中活跃结果的回收机制，防止上下文溢出导致的性能降级。
*   **Creator 插件版本迭代**：[PR #8121](https://github.com/agentscope-ai/QwenPaw/pull/8121) 完成审查并关闭，QwenPaw Creator 插件版本从 1.3.0 升级至 2.0.1，引入了受控媒体生产功能。

## 4. 社区热点
*   **Web搜索能力扩展**：社区强烈要求增强内置搜索工具。Firecrawl 团队官方发起 [Issue #8199](https://github.com/agentscope-ai/QwenPaw/issues/8199) 并提交 [PR #8200](https://github.com/agentscope-ai/QwenPaw/pull/8200) 提供第三方 Provider 支持；同时，针对 Tavily 无法配置自有 API Key 的痛点，[PR #8204](https://github.com/agentscope-ai/QwenPaw/pull/8204) 正在推进中。这反映出用户正从“免费匿名搜索”向“可控/付费搜索”场景迁移。
*   **多端协同体验**：[Issue #8202](https://github.com/agentscope-ai/QwenPaw/issues/8202) 指出跨设备消息同步延迟问题，[PR #8203](https://github.com/agentscope-ai/QwenPaw/pull/8203) 正在修复前端流式传输中用户消息不可见的问题，显示 Web 控制台的多端实时同步是当前 UI/UX 的重点攻坚方向。

## 5. Bug 与稳定性
按严重程度排列，今日报告的稳定性问题及修复进展如下：
*   **严重 (P0 - 数据损坏)**：
    *   **描述**：从 GitHub 安装 Skill 时，二进制文件（图片/字体）因非 UTF-8 字符被替换为 U+FFFD 导致损坏。
    *   **链接**：[Issue #8179](https://github.com/agentscope-ai/QwenPaw/issues/8179)
    *   **状态**：**已有 Fix PR** [PR #8198](https://github.com/agentscope-ai/QwenPaw/pull/8198)，正在审查中，采用字节流保留方案。
*   **高 (P1 - 启动阻断)**：
    *   **描述**：Windows 平台下，Creator 启动钩子因 `runtime-owner.json` 中存在过期 PID，调用 `os.kill` 时抛出未被捕获的 `SystemError`，导致 QwenPaw Desktop 无法启动。
    *   **链接**：[Issue #8194](https://github.com/agentscope-ai/QwenPaw/issues/8194)
    *   **状态**：**已有 Fix PR** [PR #8196](https://github.com/agentscope-ai/QwenPaw/pull/8196)，增强了对 `SystemError` 的容错处理。
*   **中 (P2 - 功能异常)**：
    *   **描述**：工具调用 API 返回 404，导致流式会话中断。
    *   **链接**：[Issue #7016](https://github.com/agentscope-ai/QwenPaw/issues/7016)
    *   **状态**：开放中，涉及 2.1.0 版本的后端路由问题，需排查特定会话下的资源缺失。
    *   **描述**：Doom-loop 门禁误杀合法的后台任务轮询。
    *   **链接**：[Issue #8184](https://github.com/agentscope-ai/QwenPaw/issues/8184)
    *   **状态**：**已有 Fix PR** [PR #8192](https://github.com/agentscope-ai/QwenPaw/pull/8192)，通过区分紧密重复调用与间隔轮询来优化检测逻辑。

## 6. 功能请求与路线图信号
*   **多路径部署支持**：[Issue #8177](https://github.com/agentscope-ai/QwenPaw/issues/8177) 提出控制台硬编码了 `/console` 路由，阻碍了反向代理子路径部署。[PR #8197](https://github.com/agentscope-ai/QwenPaw/pull/8197) 正在通过环境变量 `VITE_CONSOLE_BASENAME` 解决此问题，预计将纳入下一版本，利好企业级自托管场景。
*   **模型管理增强**：[Issue #8195](https://github.com/agentscope-ai/QwenPaw/issues/8195) 指出模型池缺乏删除功能。结合 [PR #8205](https://github.com/agentscope-ai/QwenPaw/pull/8205) 正在进行的“决策模型配置”功能，路线图正从单纯的 Chat 模型扩展向结构化决策模型及更精细的生命周期管理演进。
*   **前端性能优化**：[Issue #8135](https://github.com/agentscope-ai/QwenPaw/issues/8135) 指出控制台 GPU 占用高。[PR #8137](https://github.com/agentscope-ai/QwenPaw/pull/8137) 正在引入“reduced effects”层级，通过降低 `backdrop-filter` 半径来优化性能，预计成为默认选项之一。

## 7. 用户反馈摘要
*   **痛点 - 搜索成本**：用户对内置搜索工具无法使用自有付费 API Key（Tavily）感到困扰，认为这限制了其配额的使用（[Issue #8174](https://github.com/agentscope-ai/QwenPaw/issues/8174)）。
*   **痛点 - 交互干扰**：Console 聊天中，消息导航跳转会在约 1.6 秒内覆盖用户的手动滚轮操作，导致阅读体验破碎（[Issue #8186](https://github.com/agentscope-ai/QwenPaw/issues/8186) 及 [PR #8201](https://github.com/agentscope-ai/QwenPaw/pull/8201)）。
*   **场景 - 边缘计算/硬件接入**：用户探索将 ESP32 等硬件接入 QwenPaw（[Issue #8189](https://github.com/agentscope-ai/QwenPaw/issues/8189)），显示项目正受到 IoT 开发者的关注，但官方尚未有明确路线图响应。

## 8. 待处理积压
*   **长期 UI 稳定性**：[Issue #7016](https://github.com/agentscope-ai/QwenPaw/issues/7016) 自 2026-08-14 创建，至今跨度超过 2 个月仍处于 OPEN 状态，且评论仅 4 条。该问题涉及流式会话中的 404 错误，可能涉及深层的状态管理或资源持久化缺陷，建议维护者优先排查。
*   **可观测性盲点**：[PR #7964](https://github.com/agentscope-ai/QwenPaw/pull/7964) 修复了 Langfuse 工具观察无法记录 `output` 的问题，该 PR 自 9 月底创建，跨度较长。对于依赖可观测性的企业用户，此修复的及时合并至关重要，目前仍停留在 Under Review 阶段。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 (2026-10-13)

### 1. 今日速览
过去24小时，hermes-agent 项目保持了极高活跃度，共更新 400 条 Issues（322 新开/活跃，78 关闭）及 500 条 Pull Requests（376 待合并，124 已合并/关闭）。当前版本 v0.21.7 作为补丁版本已发布，重点在于汇总 v0.21.6 以来的约 204 个 PR，主要面向桌面应用（macOS/Windows）、Microsoft Store、MSIX、Docker 以及 Hermes Cloud 提供稳定支持。社区焦点集中在安装更新机制的修复（Windows 兼容性、依赖管理）、多端网关会话统一架构的探索，以及桌面端 UI 交互体验的优化。整体项目健康度良好，但安装更新流程（`hermes update`）和特定平台（Windows 非 ASCII 环境、Docker）的兼容性问题是近期的主要痛点。

### 2. 版本发布
**v0.21.7: Hermes Agent**
*   **发布状态**：Patch release（补丁版本），发布于 2026-10-11。
*   **更新内容**：此标签汇总了自 v0.21.6 以来合并的约 204 个 PR，旨在为桌面应用（macOS Apple Silicon, Windows）、Microsoft Store 和 MSIX 安装包、Docker 容器以及 Hermes Cloud 服务提供一个稳定的累积版本。
*   **注意事项**：虽然主要为稳定性修复，但需注意近期关于 `hermes update` 在 Windows 环境下解码错误（#122239）和插件依赖重建失败（#134469）的反馈，建议用户更新后验证核心功能及插件状态。

### 3. 项目进展
过去24小时内，大量 PR 完成了合并或处于待审状态，主要推进了以下功能模块：
*   **安装与更新机制优化**：
    *   合并了多个关于 npm 安装失败处理的 PR，包括 [#113001](https://github.com/NousResearch/hermes-agent/pull/113001)（显示错误输出）、[#113003](https://github.com/NousResearch/hermes-agent/pull/113003)（分类故障并自我修复缓存）以及 [#95153](https://github.com/NousResearch/hermes-agent/pull/95153)（Playwright IPv4 重试）。这些修复显著提升了安装器的健壮性。
    *   [#137556](https://github.com/NousResearch/hermes-agent/pull/137556) 解决了后台线程中 `pm.ensure_import` 阻塞导致的死锁问题。
*   **桌面端体验增强**：
    *   [#113232](https://github.com/NousResearch/hermes-agent/pull/113232) 修复了桌面端 Bot "thinking" 状态文本无法复制的问题。
    *   多个 PR 正在推进桌面端首次运行引导流程的重构，如 [#137522](https://github.com/NousResearch/hermes-agent/pull/137522) 引入基于卡片的引导聊天和主题设置工具。
*   **网关与会话管理**：
    *   [#106742](https://github.com/NousResearch/hermes-agent/pull/106742) 是一个大型重构 PR，旨在让 CLI、TUI、桌面、API、ACP、机器人和 Cron 任务共享同一个由 Gateway 拥有的本地会话，避免多个代理实例操作同一 `state.db` 导致的状态冲突。
*   **工具与插件**：
    *   [#137557](https://github.com/NousResearch/hermes-agent/pull/137557) 修复了 PDF 工具在旋转重复页面时的逻辑错误。
    *   插件目录（Plugin Catalog）持续扩展，如 [#137510](https://github.com/NousResearch/hermes-agent/pull/137510) 添加希腊语语言包，[#137246](https://github.com/NousResearch/hermes-agent/pull/137246) 添加 `agent-hint` 插件。

### 4. 社区热点
*   **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859) (P2, 34 comments)**: 用户报告通过 API 创建 Pull Request 时出现权限错误，尽管 Fork 和 Issue 创建正常。该问题高度活跃，引发了关于 OAuth 权限范围和 API 客户端行为的深入讨论。
*   **[#127647](https://github.com/NousResearch/hermes-agent/issues/127647) (P2, 30 comments)**: 关于桌面端空闲资源占用的跟踪 Issue（Tracker），涉及 Renderer CPU/GPU 及后端 Serve CPU 和内存泄漏。用户希望优化桌面应用的后台资源消耗。
*   **[#18715](https://github.com/NousResearch/hermes-agent/issues/18715) (P2, 25 comments, 40 👍)**: 请求支持远程 Hermes Agent 与本地工具执行分离。用户希望在保持远程 Agent 记忆和配置的同时，将工具执行（如文件操作、终端命令）限制在本地机器，以平衡隐私与灵活性。
*   **[#107402](https://github.com/NousResearch/hermes-agent/issues/107402) (P2, 22 comments)**: `hermes update` 在网关进程内运行时，若重启被延迟，会留下永久性的“未重启”警告状态，导致后续更新检查出现状态不一致。
*   **[#136567](https://github.com/NousResearch/hermes-agent/issues/136567) (P2, 17 comments)**: Telegram 论坛模式（Threads）下，新创建的话题首条消息可能因缺少 `message_thread_id` 而被误路由到之前的话题。

### 5. Bug 与稳定性
按严重程度排列（P1 > P2 > P3）：

*   **P1 (严重/阻断)**
    *   **[#71239](https://github.com/NousResearch/hermes-agent/issues/71239)**: Telegram 连接器可能在 `getUpdates` 成功但本地 `Application.update_queue` 停止排空时静默停滞，导致消息不回复。*状态：Open，暂无明确 Fix PR。*
    *   **[#133856](https://github.com/NousResearch/hermes-agent/issues/133856)**: Anthropic API keys (`sk-ant-usr-` 前缀) 被错误分类为 OAuth tokens，导致付费令牌身份混淆。*状态：Closed (Fixed/Duplicate)*。
    *   **[#135298](https://github.com/NousResearch/hermes-agent/issues/135298)**: 在 0.21.6 回归中，若未配置任何消息平台，`api_server` 启动时无法连接。*状态：Open，暂无 Fix PR。*
    *   **[#134469](https://github.com/NousResearch/hermes-agent/issues/134469)**: `hermes update` 重建运行时 venv 时未包含插件依赖，导致 Provider 插件（如 mnemosyne）静默失败。*状态：Open，暂无 Fix PR。*

*   **P2 (主要)**
    *   **[#136281](https://github.com/NousResearch/hermes-agent/issues/136281)**: 更新检查失败，`hermes-assets.nousresearch.com` 返回 404 错误。*状态：Open。*
    *   **[#122239](https://github.com/NousResearch/hermes-agent/issues/122239)**: Windows 中文环境（cp936）下 `hermes update` 触发 UnicodeDecodeError。*状态：Open，存在相关 PR 修复中。*
    *   **[#131093](https://github.com/NousResearch/hermes-agent/issues/131093)**: Windows 中文用户名下 `.cmd` 启动器因编码问题报错。*状态：Open，PR #122594 和 #126325 相关。*
    *   **[#129993](https://github.com/NousResearch/hermes-agent/issues/129993)**: 桌面端助手回复在转录中重复显示（UI 渲染 Bug）。*状态：Open。*
    *   **[#121095](https://github.com/NousResearch/hermes-agent/issues/121095)**: `browser_exec` 完成后遗留过期的 `browser_harness.daemon` 进程。*状态：Open。*

*   **P3 (次要)**
    *   **[#137017](https://github.com/NousResearch/hermes-agent/issues/137017)**: Holographic 记忆插件自动安装失败，导致外部记忆功能关闭。
    *   **[#119070](https://github.com/NousResearch/hermes-agent/issues/119070)**: Kanban 卡片在速率限制后重试成功时，永久卡在 `blocker_auth` 状态。

### 6. 功能请求与路线图信号
*   **远程 Agent + 本地工具执行**: Issue [#18715](https://github.com/NousResearch/hermes-agent/issues/18715) 获得了大量点赞，表明用户对“混合执行环境”有强烈需求。结合现有 PR，此功能可能在未来的网关架构更新中逐步实现。
*   **桌面端仅前端安装**: Issue [#38519](https://github.com/NousResearch/hermes-agent/issues/38519) 请求仅安装桌面前端并连接远程 Agent。这与“远程 Agent”概念呼应，未来版本可能支持轻量级客户端模式。
*   **Delegate Task 参数覆盖**: Issue [#80222](https://github.com/NousResearch/hermes-agent/issues/80222) 请求在 `delegate_task` 中允许每次调用覆盖模型和推理 effort。PR 尚未看到明确支持，但属于合理的 API 增强。
*   **连接器卡片展示**: PR [#137426](https://github.com/NousResearch/hermes-agent/pull/137426) 正在开发中，允许模型在聊天中展示可浏览的连接器卡片，提升应用连接管理体验。

### 7. 用户反馈摘要
*   **安装/更新痛点**: 多位用户（如 #122239, #131093, #136281）反馈 Windows 环境下的安装和更新脚本在非 ASCII 用户名或特定代码页下容易出错。用户对 `hermes update` 的幂等性和状态一致性（#107402）表示不满，特别是在网关场景中。
*   **资源消耗**: 桌面端用户（#127647）抱怨空闲时 CPU/GPU/内存占用过高，希望优化后台行为。
*   **消息路由准确性**: Telegram 用户（#136567, #71239）反映在论坛模式和特定网络状态下消息丢失或路由错误，影响使用体验。
*   **记忆插件稳定性**: 用户对 Holographic 等高级记忆插件的依赖安装失败（#137017, #134469）表示困惑，希望有更清晰的错误提示和自动修复机制。

### 8. 待处理积压
*   **API 权限问题**: [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) 讨论热烈但尚未关闭，涉及外部 API 客户端与仓库权限的复杂交互，需维护者尽快澄清或修复。
*   **会话架构重构**: [#106742](https://github.com/NousResearch/hermes-agent/pull/106742) 是一个涉及面广的大型 PR，影响所有本地后端交互。由于风险较高（涉及 session state, message delivery, security boundary），合并周期可能较长，需密切关注其测试覆盖和潜在回归。
*   **长期 Bug**: 如 [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) (浏览器进程泄漏) 和 [#120582](https://github.com/NousResearch/hermes-agent/issues/120582) (压缩过程中的数据丢失)，虽非 P1 但影响长期运行的稳定性，建议安排修复。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 (2026-10-13)

## 1. 今日速览
AstrBot 项目今日表现出极高且健康的维护活跃度。过去 24 小时内，社区清理了 335 个陈旧 Issue 并合并/关闭了 258 个 PR，核心贡献者重点推进了 MCP 鉴权、多模态支持及多个平台适配器的 Bug 修复。虽然未发布正式的新版本，但代码库在安全性和稳定性方面迎来了显著更新。项目当前正通过清理积压事项，为下一次版本迭代（如针对插件隔离架构 RFC）做充分的技术准备。

## 2. 版本发布
*过去 24 小时内无新版本发布。*

## 3. 项目进展
今日合并了 258 个 PR，显著增强了系统的底层鲁棒性、多媒体能力以及平台适配能力：
* **底层稳定性修复**：
  * [#8607](https://github.com/AstrBotDevs/AstrBot/pull/8607) 修复了当 LLM 返回 `name` 为 `None` 的工具调用导致系统崩溃或 400 错误的严重 Bug。
  * [#8654](https://github.com/AstrBotDevs/AstrBot/pull/8654) 修复了 Windows 系统下卸载含字体文件插件时发生文件句柄泄漏（`[WinError 5]`）的问题。
  * [#10401](https://github.com/AstrBotDevs/AstrBot/pull/10401) 补齐了 QQ 官方 API 出站消息中 `message_reference` 的缺失，完善了引用回复功能。
  * [#8050](https://github.com/AstrBotDevs/AstrBot/pull/8050) 修复了流式工具调用结果解析的 Bug，确保异步生成器能正确合并 `CallToolResult` 块。
* **多媒体与能力扩展**：
  * [#10202](https://github.com/AstrBotDevs/AstrBot/pull/10202) 引入了**原生视频输入支持**，使支持视频的提供商能够直接处理视频文件，而非仅依赖文本占位符。
* **平台与提供商适配**：
  * [#10153](https://github.com/AstrBotDevs/AstrBot/pull/10153) 在提供商配置中新增了 StepFun 和 Step Plan 预设，降低了用户的配置门槛。
  * [#10543](https://github.com/AstrBotDevs/AstrBot/pull/10543) 修复了飞书（Lark）富文本消息解析中丢失标题和排版格式的问题。
  * [#10541](https://github.com/AstrBotDevs/AstrBot/pull/10541) 提升了前端构建的兼容性，支持通过 pnpm 11 和 12 安装依赖。
* **系统架构深化**：
  * [#10515](https://github.com/AstrBotDevs/AstrBot/pull/10515) 改进了消息追踪（Tracing）机制，并引入了有界的 SQLite 历史记录功能。
  * [#10528](https://github.com/AstrBotDevs/AstrBot/pull/10528) 为 `FileReadTool` 增加了视觉描述回退功能，使纯文本模型也能解析图片文件。

## 4. 社区热点
* **架构与安全性探讨 (High Engagement)**
  * [#3210](https://github.com/AstrBotDevs/AstrBot/issues/3210) - `[RFC] AstrBot Plugin and Core Isolation Architecture`。该 Issue 拥有最高关注度（16 个赞，12 条讨论）。社区正热议**插件与核心架构的隔离方案**，旨在解决当前插件数量激增导致的依赖冲突及安全隐患，这是决定项目未来可扩展性的关键讨论。
* **插件生态爆发 (High Volume)**
  * 过去 24 小时有 335 个涉及插件发布的 Issue 被批量关闭（更新），反映了插件生态极其繁荣。讨论热度最高的插件主要围绕实用工具与多媒体：
    * `astrbot_plugin_rate_limit` ([#5349](https://github.com/AstrBotDevs/AstrBot/issues/5349))：LLM 频率限制。
    * 多媒体与 AI 增强类插件，如文转图插件 ([#5515](https://github.com/AstrBotDevs/AstrBot/issues/5515))、`TTS Bridge` 语音桥接 ([#6821](https://github.com/AstrBotDevs/AstrBot/issues/6821)) 以及支持精细化控制的 `MiMO TTS` ([#7864](https://github.com/AstrBotDevs/AstrBot/issues/7864))。
    * 游戏/生活辅助类，如三角洲物资播报 ([#7201](https://github.com/AstrBotDevs/AstrBot/issues/7201))、CS2 比赛推送 ([#6740](https://github.com/AstrBotDevs/AstrBot/issues/6740))。
* **前端与生态建设**
  * [#10544](https://github.com/AstrBotDevs/AstrBot/pull/10544) 将 Sol AI 加入 Special Thanks 列表，凸显了 AstrBot 在 AI Agent 社区中作为底层框架的广泛应用。

## 5. Bug 与稳定性
今日在核心 PR 中修复了多个影响稳定性的 Bug，且均已包含相应的回归测试：
* **已修复 (通过今日合并/待合并 PR)**：
  * **QQ 官方 Markdown 限频误判** ([#10451](https://github.com/AstrBotDevs/AstrBot/pull/10451))：当 API 拒绝 Markdown 时，旧逻辑会误走主动消息接口（有 304049 配额限制），导致普通回复变成易触限频的主动消息。现已修复为保持被动回复。
  * **命令别名解析丢失参数** ([#9956](https://github.com/AstrBotDevs/AstrBot/pull/9956))：修复了当用户输入的第一个参数恰好与某个命令别名相同时，参数被静默丢弃的隐蔽 Bug。
  * **控制台/面板显示缺陷** ([#10542](https://github.com/AstrBotDevs/AstrBot/pull/10542), [#10506](https://github.com/AstrBotDevs/AstrBot/pull/10506))：修复了“机器人默认配置”下拉框出现重复项以及面板详情页 iframe 视图标题解析错误的问题。
* **潜在未修复项（需关注）**：
  * **文档缺失引发的数据不一致**：PR [#7947](https://github.com/AstrBotDevs/AstrBot/pull/7947) 已修复了关于“隔离会话影响 `unified_msg_origin`”的文档缺失，但插件开发者在使用隔离会话功能时，仍需手动适配底层消息标识的变化，避免插件内部数据查询错乱。

## 6. 功能请求与路线图信号
基于高活跃度的 PR 和 Issue，以下功能极大概率将在近期的版本中落地或已处于开发后期：
* **MCP (Model Context Protocol) 鉴权**：[#10527](https://github.com/AstrBotDevs/AstrBot/pull/10527) 正在为 MCP HTTP 服务器添加 OAuth 2.0 支持（授权码或客户端凭据流程）。这标志着 AstrBot 在连接外部工具生态（MCP 端点）时，将支持更高等级的安全鉴权。
* **新提供商深度接入**：除了前文提到的 StepFun，[#10537](https://github.com/AstrBotDevs/AstrBot/pull/10537) 正在添加 OpenCode Go 提供商源，该网关支持多协议（OpenAI/Anthropic/Responses）路由。
* **多模态体验升级**：继视频输入 [#10202](https://github.com/AstrBotDevs/AstrBot/pull/10202) 落地后，视觉理解能力（如 `FileReadTool` 的多模态回退 [#10528](https://github.com/AstrBotDevs/AstrBot/pull/10528)）使得 AstrBot 能够更优雅地处理非多模态模型处理图片的场景。
* **插件架构重构**：[#3210](https://github.com/AstrBotDevs/AstrBot/issues/3210) 的 RFC 正在积极修订中，解决“插件隔离与依赖冲突”将是 AstrBot 迈向成熟中台框架的最重要一步。

## 7. 用户反馈摘要
* **高频需求 - 防滥用与合规**：社区对 LLM 调用的安全防护需求强烈，`astrbot_plugin_rate_limit` ([#5349](https://github.com/AstrBotDevs/AstrBot/issues/5349)) 与自动防误导插件 ([#7126](https://github.com/AstrBotDevs/AstrBot/issues/7126)) 的高讨论度表明，用户非常关注 Bot 在群组内的成本控制与安全性。
* **高频需求 - 多媒体交互**：纯文本输出已无法满足用户需求。TTS 类插件（如精细控制的 MiMO TTS）和图像生成类插件（GPT Image、Sukicon）的繁荣说明，**语音交互**与**图像生成**是驱动 Bot 活跃度的核心场景。
* **高频需求 - 游戏化与二次元生态**：从蔚蓝档案竞技场记录、Warframe 助手、原神搬运，到“你画我猜”等群聊互动插件，AstrBot 的核心用户群体高度重合于泛二次元及游戏玩家群体，Bot 成为社群娱乐和资讯聚合的中心。
* **痛点**：随着插件数量激增，开发者反馈**插件间依赖冲突**（重下依赖、报错）是日常维护中的最大痛点，这也是团队推进插件隔离架构（#3210）的根本动力。

## 8. 待处理积压
* **架构层积压**：[#3210](https://github.com/AstrBotDevs/AstrBot/issues/3210) RFC 自 2025-10-31 创建，目前仍处于修订阶段。作为解决安全与依赖冲突的关键架构升级，维护者应尽快敲定技术路线并启动实施，以彻底解决社区痛点。
* **长尾 PR 积压**：[#8050](https://github.com/AstrBotDevs/AstrBot/pull/8050) 和 [#9956](https://github.com/AstrBotDevs/AstrBot/pull/9956) 均为创建已久（5月至9月）的底层 Bug 修复 PR，尽管代码已就绪，但可能因架构变动或测试覆盖等待合并。核心维护者建议进行 Code Review 并尽快合并，以减少技术债。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期**：2026-10-13
**数据源**：GitHub Discussions (196 条更新), Releases

## 1. 今日速览
过去 24 小时，DeepSeek Harness 社区活跃度极高，Discussions 板块更新达 196 条，但官方未发布任何新版本（Releases 为 0）。社区热点高度集中在**稳定性修复**与**安全扩展**，尤其是 Windows 沙箱机制下的 PowerShell 崩溃问题以及 Agent 在长上下文下的推理循环退化。项目目前处于“高讨论、低发版”的积压状态，大量已定位的 Bug 和功能原型尚未通过 Releases 落地，社区正在通过 Discussions 充当事实上的 Issue 追踪器，等待官方整合修复。

## 2. 版本发布
**无新版本发布。**
（注：尽管过去 24 小时无新版本，但 Discussions 中包含了大量已验证的修复方案和功能插件，这些内容构成了下一版本的潜在 changelog。由于该仓库通过 Discussions 驱动开发，以下将高热度讨论视为“待合并功能/修复”进行梳理。）

## 3. 项目进展
*注：本项目未启用 PR，进展主要体现为 Discussions 中已达成共识或提供可行原型的方案。*

*   **插件生态扩展加速**：
    *   **[dsh-vault] 加密凭据保险库插件**：社区成员 @Ox0400 提出了一个基于 Node.js 内置 `crypto` 的零依赖加密凭据管理插件，支持 TOTP、API Key 等敏感信息的存储与检索。该提案已有 254 条高热度讨论，显示出社区对**本地数据安全**和**身份管理自动化**的强烈需求。
    *   **模型配置中转插件**：@MarvekG 开发的插件支持 CPA/SUB2API 等第三方中转服务，允许用户自定义 Provider 和 Header，增强了 Harness 对接非官方/多协议 API 的灵活性。
*   **桌面版交互增强**：
    *   **[Ctrl+F 搜索] 功能原型**：@furoute 指出桌面版缺少关键字搜索入口，尽管底层全文检索引擎已就位。该讨论附带了实测可用的原型，预计将被纳入下一版桌面端功能。

## 4. 社区热点
基于评论数排序的今日最活跃讨论：

1.  **[dsh-vault] 加密凭据保险库插件 (254 评论)**
    *   **链接**：[Discussion #1457](https://github.com/deepseek-ai/deepseek-harness/discussions/1457)
    *   **诉求分析**：用户希望将 AI 交互中的敏感数据（Token, SSH Keys, 手机号）从明文环境迁移至加密本地存储，同时希望插件具备 UI 设置页和动态验证码生成能力。这是从“AI 工具”向“AI 个人管家”演进的典型信号。
2.  **OpenCode Go 请求头兼容性 (41 评论)**
    *   **链接**：[Discussion #5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)
    *   **诉求分析**：第三方 API 服务商 OpenCode Go 要求请求必须携带 `x-opencode-session` header。由于大量用户（约 2.5 万组织）通过 DSH 调用该 API，官方需尽快在请求拦截器中支持自定义 Header 或预设该字段，否则将造成大规模连接失败。
3.  **Docker 部署与在线体验 (22 评论)**
    *   **链接**：[Discussion #1762](https://github.com/deepseek-ai/deepseek-harness/discussions/1762)
    *   **诉求分析**：社区成员维护了 Docker 镜像（`smanx/deepseek-harness`）并提供了在线体验链接。这反映了用户对**快速私有化部署**的需求，官方需考虑是否将 Docker 支持标准化或认可社区维护的镜像。
4.  **Agent 长上下文思考退化 (16 评论)**
    *   **链接**：[Discussion #5976](https://github.com/deepseek-ai/deepseek-harness/discussions/5976)
    *   **诉求分析**：在使用 `deepseek-v4.1-flash` 且 `reasoningEffort: max` 时，Agent 在超长上下文下陷入“零产出”循环且无自动熔断机制。用户希望增加**推理循环检测**和**自动降级/中止**机制。

## 5. Bug 与稳定性
以下 Bug 按严重程度排列，均已有社区定位或复现路径，但**尚无官方 Fix Release**：

1.  **[严重] Windows 沙箱下 pwsh 100% 崩溃 (0xC0000142)**
    *   **链接**：[#810](https://github.com/deepseek-ai/deepseek-harness/discussions/810), [#9467](https://github.com/deepseek-ai/deepseek-harness/discussions/9467)
    *   **描述**：在 Windows 桌面端（Electron）启动路径下，若宿主无控制台，ACL 受限令牌沙箱会导致 `pwsh` 在 DLL 初始化阶段失败（`STATUS_DLL_INIT_FAILED`）。这使得 Windows 用户在使用 `workspace-write` 权限时 Shell 能力完全失效。
    *   **状态**：高热度 Bug，已复现，无 Fix。
2.  **[高] 工具参数 JSON 解析失败导致硬终止**
    *   **链接**：[#9402](https://github.com/deepseek-ai/deepseek-harness/discussions/9402)
    *   **描述**：`dsh-llm-deepseek` 偶发返回非法 JSON 参数，宿主直接抛出 `MALFORMED_RESPONSE` 错误并终止会话，**无重试机制**且未打印原始参数，导致调试困难。
    *   **状态**：影响日常使用，需增加 JSON 解析容错或重试逻辑。
3.  **[高] 图片数量超限导致会话无法继续**
    *   **链接**：[#6432](https://github.com/deepseek-ai/deepseek-harness/discussions/6432)
    *   **描述**：当请求中图片数量超过上游限制（31 > 30）时，`/compact` 无法压缩上下文，导致会话彻底卡死，无法继续交互。
    *   **状态**：阻塞性 Bug，需优化 Compaction 逻辑对非文本资产的预处理。
4.  **[中] Compaction 请求未继承 Prefix Cache**
    *   **链接**：[#1944](https://github.com/deepseek-ai/deepseek-harness/discussions/1944)
    *   **描述**：`dsh-compaction-basic` 触发的摘要请求未继承 `reasoningEffort` 且未添加 `maxTokens`，导致完全 miss provider prefix cache，增加了不必要的成本与延迟。
    *   **状态**：性能/成本优化项。
5.  **[中] `turn/end` reason 为 null 导致会话列表空白**
    *   **链接**：[#8832](https://github.com/deepseek-ai/deepseek-harness/discussions/8832)
    *   **描述**：Agent Team 场景下，若某条 `turn/end` 事件的 reason 为 null，整个会话列表变空白（数据未丢失，但 UI 渲染失败）。
    *   **状态**：UI 鲁棒性问题，需增加空值保护。

## 6. 功能请求与路线图信号
基于今日高热度讨论，以下功能极有可能纳入下一版本：

*   **自定义请求 Header 支持**：响应 OpenCode Go 等服务商的强制要求（[#5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)），以及社区模型配置插件（[#3246](https://github.com/deepseek-ai/deepseek-harness/discussions/3246)）的需求。建议官方在 Provider 层提供通用的 Header 注入接口。
*   **桌面版关键字搜索 (Ctrl+F)**：底层引擎已就绪，仅缺 UI 入口（[#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713)）。这是一个低成本、高收益的改进。
*   **加密凭据保险库 (dsh-vault)**：鉴于 254 条评论的高热度，官方可能会考虑将“凭据管理”作为核心插件或内置模块集成，以解决用户在多 Agent 协作中的身份切换痛点（[#1457](https://github.com/deepseek-ai/deepseek-harness/discussions/1457)）。
*   **Agent 推理熔断机制**：针对 `max reasoning effort` 下的死循环问题（[#5976](https://github.com/deepseek-ai/deepseek-harness/discussions/5976)），路线图应包含“无产出检测”与“自动降级”策略。

## 7. 用户反馈摘要
*   **痛点**：
    *   **数据安全焦虑**：用户非常担心 AI 访问本地敏感信息（如 SSH Keys），dsh-vault 的高热度反映了用户对“可控的 AI 记忆/凭证管理”的需求。
    *   **Windows 体验差**：沙箱导致的 Shell 崩溃（0xC0000142）严重阻碍了 Windows 用户使用高级开发功能，被投诉为“100% 失效”。
    *   **数据丢失恐惧**：[#9468](https://github.com/deepseek-ai/deepseek-harness/discussions/9468) 中用户报告在 DSH 崩溃后整个用户目录被删除（包括 Codex、Claude Code 数据），虽然可能是极端个案，但引发了对**数据持久化安全性**的强烈担忧。
*   **满意/积极信号**：
    *   **插件生态繁荣**：社区自发维护 Docker 镜像、插件目录（Awesome DSH Plugin）和第三方集成，表明 Harness 的扩展性良好。
    *   **问题定位精准**：用户普遍提供详细的复现步骤、堆栈信息和原型代码（如 Ctrl+F 搜索、JSON 解析 Bug），这种高质量的反馈降低了官方维护成本。

## 8. 待处理积压
*   **Windows 沙箱兼容性**：[#810](https://github.com/deepseek-ai/deepseek-harness/discussions/810) 和 [#9467](https://github.com/deepseek-ai/deepseek-harness/discussions/9467) 自 8 月/10 月提出，至今无 Release 修复，属于长期阻塞 Windows 核心功能的积压项，建议优先级提升至最高。
*   **Compaction 缓存优化**：[#1944](https://github.com/deepseek-ai/deepseek-harness/discussions/1944) 涉及成本优化，若长期不处理，可能导致大量用户在长上下文场景下费用激增。
*   **数据恢复机制**：[#9468](https://github.com/deepseek-ai/deepseek-harness/discussions/9468) 提到的“目录被删除”需官方确认是否为已知 Bug 或用户误操作，建议增加“会话数据快照”或“删除前确认”机制，并纳入安全路线图。

---
**分析师建议**：
当前 DeepSeek Harness 处于**“社区驱动、官方滞后”**的状态。196 条 Discussions 中大量包含“已修复原型”或“精准定位”，但 0 个 Release 意味着这些进展未落地。建议官方尽快发布一个**补丁版本 (Hotfix)**，优先解决 **Windows pwsh 崩溃** 和 **JSON 解析容错** 这两个影响核心可用性的问题，并在下一个迭代中合并 **自定义 Header** 和 **Ctrl+F 搜索** 功能，以响应社区高涨的参与度。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*