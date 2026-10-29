# OpenClaw 生态日报 2026-10-29

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-29 01:22 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 (2026-10-29)

## 1. 今日速览
今日 OpenClaw 项目呈现**极高活跃度**，24小时内 Issues 和 PR 更新量均达到 500 条的上限，表明社区参与度极高。项目当前面临的主要挑战是**稳定性与性能瓶颈**，尤其是 Gateway 事件循环阻塞、内存泄漏以及 Windows 平台升级机制的回归问题。尽管没有新版本发布，但开发团队正在密集处理大量 P0/P1 级别的严重缺陷，特别是针对 Gateway 核心机制的修复。社区对于记忆管理（Memory/Dreaming）机制的安全性和长期支持策略存在显著争议。

## 2. 版本发布
**今日无新版本发布。**
建议关注 `v2026.10.10-beta.4` 后续版本，因为多个 P0 级别的 Bug（如 #183786, #185819）涉及该 Beta 版本的升级和启动问题，预计会在下一个稳定版或 Beta 中集中修复。

## 3. 项目进展
今日大量 PR 处于“待合并”状态（286个），其中值得关注的关键进展包括：
*   **核心网关稳定性修复**：PR [#187137](https://github.com/openclaw/openclaw/pull/187137) 修复了执行（Exec）被拒绝后网关关闭报告错误的问题；PR [#186971](https://github.com/openclaw/openclaw/pull/186971) 针对更新机制进行了重大安全敏感修改，防止新版 CLI 迁移旧版 Gateway 的状态导致启动失败。
*   **移动端与 UI 体验优化**：PR [#187077](https://github.com/openclaw/openclaw/pull/187077) 优化了 iOS 侧边栏，折叠子代理运行以匹配 Web 端体验；PR [#186391](https://github.com/openclaw/openclaw/pull/186391) 修复了移动原生应用中 Agent 面板干扰聊天流程的问题。
*   **多模态与渠道兼容**：PR [#186834](https://github.com/openclaw/openclaw/pull/186834) 修复了 Amazon Bedrock 下 GPT-6/Kimi K3 模型处理工具返回图像失败的问题；PR [#187148](https://github.com/openclaw/openclaw/pull/187148) 修复了包含重音符号名称在渠道搜索中丢失的问题。
*   **记忆系统改进**：PR [#186405](https://github.com/openclaw/openclaw/pull/186405) 排除了 Dreaming 范围的记忆索引，防止临时工作污染长期记忆；PR [#186861](https://github.com/openclaw/openclaw/pull/186861) 提出了对过大的“学习技能”进行日常瘦身维护的功能。

## 4. 社区热点
以下 Issues 评论数最多，反映了社区当前最关注的痛点：

1.  **Gateway 启动阻塞与事件循环冻结 (P0)**
    *   [#160959](https://github.com/openclaw/openclaw/issues/160959): 讨论极度活跃（63评论）。用户抱怨自 2026.9.6 版本后，大型外部插件导致 Gateway 启动时事件循环阻塞数分钟。这是当前的头号稳定性投诉。
    *   [#162211](https://github.com/openclaw/openclaw/issues/162211): 启动阻塞 40-200 秒，导致健康监控误判为断连并触发重启循环。
    *   **分析**：用户急需解决 Gateway 的“冷启动”性能和插件加载异步化问题。

2.  **Windows 平台升级与可靠性危机 (P1/P0)**
    *   [#183786](https://github.com/openclaw/openclaw/issues/183786): Windows Beta 升级后反复查询已停止的前台 PID，导致升级卡死（47评论）。
    *   [#170956](https://github.com/openclaw/openclaw/issues/170956): Windows 启动慢、插件关闭不干净、schtasks 权限错误，导致重启/更新极其不可靠（25评论）。
    *   **分析**：Windows 原生支持似乎存在严重的生命周期管理回归，社区呼吁修复升级流程。

3.  **内存泄漏与资源耗尽 (P0)**
    *   [#159662](https://github.com/openclaw/openclaw/issues/159662): `prepared-model-catalog.worker.js` 存在无界内存泄漏，每小时增长 4-5 GB（27评论）。
    *   [#181459](https://github.com/openclaw/openclaw/issues/181459): 3.5 GB 的 Agent DB 导致启动成为“赌博”，频繁出现 commit checkpoint 过期。
    *   **分析**：长期运行的 Gateway 面临严重的资源管理问题，用户需要明确的内存优化路线图。

4.  **记忆与安全机制争议 (P0)**
    *   [#153426](https://github.com/openclaw/openclaw/issues/153426): 精选记忆根（MEMORY.md/USER.md）被来源 ratchet 机制静默且永久排除，缺乏诊断和恢复手段（13评论，2个点赞）。
    *   **分析**：用户认为当前的安全机制过于激进，导致关键上下文丢失，且不可逆。

## 5. Bug 与稳定性
按严重程度排列的关键 Bug：

*   **[P0] Gateway 崩溃循环与启动阻塞**:
    *   Issue: [#160959](https://github.com/openclaw/openclaw/issues/160959) (插件捕获阻塞), [#162211](https://github.com/openclaw/openclaw/issues/162211) (启动健康检查误判)。
    *   Fix PR: 暂无直接合并的 Fix PR，多数标记为 `clawsweeper:no-new-fix-pr`，等待维护者审查。
*   **[P0] 内存泄漏**:
    *   Issue: [#159662](https://github.com/openclaw/openclaw/issues/159662) (`prepared-model-catalog.worker.js` 泄漏)。
    *   Fix PR: 暂无公开 Fix PR。
*   **[P0] 数据库状态一致性**:
    *   Issue: [#164294](https://github.com/openclaw/openclaw/issues/164294) (WAL checkpoint 永远无法完成), [#166634](https://github.com/openclaw/openclaw/issues/166634) (崩溃恢复后 Agent 不可用)。
    *   Fix PR: 部分修复在 `main` 分支，但未进入标签版本。
*   **[P1] Windows 升级回归**:
    *   Issue: [#183786](https://github.com/openclaw/openclaw/issues/183786) (升级卡死), [#185819](https://github.com/openclaw/openclaw/issues/185819) (Codex 激活失败)。
    *   Fix PR: [#187113](https://github.com/openclaw/openclaw/pull/187113) 修复了更新后 PostgreSQL 连接拒绝问题，但未完全解决升级卡死。
*   **[P1] 消息丢失**:
    *   Issue: [#126950](https://github.com/openclaw/openclaw/issues/126950) (Telegram opaque callback 丢弃), [#142037](https://github.com/openclaw/openclaw/issues/142037) (Slack 消息记录错误)。
    *   Fix PR: [#187148](https://github.com/openclaw/openclaw/pull/187148) 修复了搜索问题，但未涉及消息丢失核心。

## 6. 功能请求与路线图信号
*   **粒子模型提供商 (Particle)**: PR [#187135](https://github.com/openclaw/openclaw/pull/187135) 添加了 `particle/particle-1` 支持，表明项目正在持续扩展多模态提供商覆盖范围。
*   **飞书进度流 (Feishu Progress Streaming)**: Issue [#131457](https://github.com/openclaw/openclaw/issues/131457) 请求飞书渠道支持类似 Slack/Discord 的进度流模式。虽然当前无合并 PR，但鉴于多渠道支持的完整性，此功能可能进入下一版本路线图。
*   **记忆控制 UI (Dreams Page)**: Issue [#138366](https://github.com/openclaw/openclaw/issues/138366) 提议让记忆插件所有者驱动 Dreams 页面。结合 PR [#186405](https://github.com/openclaw/openclaw/pull/186405) 对 Dreaming 范围的排除，可以看出记忆系统正在重构，未来版本可能提供更有界面的记忆管理。
*   **Skills 瘦身**: PR [#186861](https://github.com/openclaw/openclaw/pull/186861) 引入日常 Workshop 维护以瘦身过大的学习技能，预示了资源优化将成为后续重点。

## 7. 用户反馈摘要
*   **痛点**:
    *   **可靠性焦虑**: 用户多次提到重启和更新“像赌博”，尤其是 Windows 用户（#170956, #183786）。
    *   **性能退化**: 长会话下的 Anthropic 缓存失效（#140129）和内存增长（#159662）导致长期使用成本高企。
    *   **黑盒故障**: 当 Gateway 崩溃或阻塞时，缺乏清晰的诊断日志（#153426, #149806），用户无法自行排查。
*   **满意点**:
    *   社区响应速度快，Issue 标记详细（clawsweeper tags）。
    *   多平台支持（iOS, Android, Web, CLI）的功能同步更新较快。
    *   新的模型提供商（如 Bedrock, Particle）集成积极。

## 8. 待处理积压
以下长期未响应或积压的问题需维护者关注：
*   [#120385](https://github.com/openclaw/openclaw/issues/120385): Code Mode 工具目录不完整（标记为 stale，P2）。
*   [#123792](https://github.com/openclaw/openclaw/issues/123792): Assistant 轮次双重渲染（标记为 stale，P2）。
*   [#126821](https://github.com/openclaw/openclaw/issues/126821): SQLite 损坏回归（标记为 P0 regression，但无 Fix PR）。
*   [#125313](https://github.com/openclaw/openclaw/issues/125313): Control UI 扇出过多 RPC 请求（性能问题，标记为 stale，P2）。
*   建议维护者优先清理 `stale` 标签的 P0/P1 问题，避免高严重性 Bug 被长期忽视。

---

## 横向生态对比

**个人 AI 助手与自主智能体开源生态横向对比分析报告**
**日期：** 2026-10-29

### 1. 生态全景
2026年10月末，个人AI助手与自主智能体开源生态呈现出**“两极分化与深度专业化”**的显著特征。一方面，以OpenClaw和hermes-agent为代表的“重型网关”架构面临稳定性瓶颈，集中爆发内存泄漏、事件循环阻塞及多平台兼容性问题，显示系统在快速功能迭代下的技术债务累积；另一方面，以Zeroclaw、QwenPaw、PicoClaw为代表的“轻量化/模块化”架构正致力于核心循环的精细打磨、插件隔离加固及多渠道（特别是IM渠道）的稳定性修复。整体态势表明，行业正从早期的“功能堆砌”阶段全面转向“可靠性、可观测性与资源效率”的巩固期，多模态支持与记忆系统的标准化治理成为所有项目共同的下一个竞争高地。

### 2. 各项目活跃度对比

| 项目名称 | Issues 更新量 | PR 更新量 | 24h Release 情况 | 核心焦点 | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500+ (触顶) | 500+ (触顶) | 无 | 修复 P0 级 Gateway 阻塞、内存泄漏及 Windows 升级回归 | 🔴 **高压预警** (严重稳定性危机，需紧急修复) |
| **Zeroclaw** | 50 | 30 | 无 | v0.9.0 前置安全加固、插件重构及 Discord/Slack 渠道回归修复 | 🟡 **密集迭代** (处于版本发布前的关键稳定窗口期) |
| **PicoClaw** | 3 | 9 | 无 | 代码债务清理、渠道 Bug 修复 (Discord 死锁、Anthropic 兼容) | 🟢 **平稳维护** (活跃度低，侧重长期积压清理) |
| **QwenPaw** | 23 | 50 | 无 (v2.3.0-beta.1 验证中) | 修复 `importlib` 回归、上下文压缩兼容性、QQ/多模态渠道 | 🟡 **快速验证** (Beta 测试反馈激增，架构重构初期震荡) |
| **hermes-agent**| 357 | 500+ | 无 | 统一网关回归修复、桌面端资源占用优化、多端会话一致性 | 🟠 **架构震荡** (重构后遗留问题集中爆发，PR 积压严重) |
| **AstrBot** | 8 | 22 | 无 | QQ 官方机器人深度适配、MCP 重连机制、多模态缓存优化 | 🟢 **精准修复** (响应迅速，聚焦特定场景的鲁棒性) |
| **DeepSeek Harness**| N/A (Discussions 180) | N/A | v0.2.2-alpha.2, v0.2.1-rc.4 | 多语言国际化、桌面端进程守护、沙箱权限兼容 | 🟡 **双轨推进** (功能与稳定分离，社区热度主要集中于体验配置) |

### 3. OpenClaw 在生态中的定位
*   **社区规模与活跃度**：OpenClaw 是生态中的绝对头部项目，其日均 Issue/PR 更新量（500+）远超其他项目（通常 30-500 之间），拥有最高频的用户参与和开发者响应。
*   **技术路线差异**：相比 Zeroclaw 的“单体模块化”或 PicoClaw 的“极简嵌入”，OpenClaw 采取了**“分布式重网关”**路线，试图构建统一的 Agent 执行与环境隔离中枢。这种架构在处理复杂多模态并发（如 Bedrock GPT-6/Kimi）和多渠道时具有优势，但在 2026-10-29 暴露出严重的事件循环阻塞和内存泄漏短板，显示出“功能扩张快于底层优化”的风险。
*   **核心优势与挑战**：其优势在于极强的全渠道兼容性（iOS/Android/Web/CLI 同步快）和模型生态广度（快速支持 Particle、Bedrock 等）。当前最大挑战是**“可靠性焦虑”**，特别是在 Windows 升级机制和资源管理上，已影响用户信心。

### 4. 共同关注的技术方向
多项目数据表明，以下四个技术方向成为 2026 年 Q4 行业共同攻坚的核心痛点：

1.  **事件循环与异步死锁治理**：
    *   **涉及项目**：OpenClaw (Gateway 阻塞)、hermes-agent (统一网关回归)、PicoClaw (Discord 静默死锁)、AstrBot (MCP 会话重连)。
    *   **诉求**：解决插件/渠道在异常状态下对主事件循环的独占，建立标准化的“非阻塞”重试与超时熔断机制。
2.  **长会话上下文压缩与记忆持久化**：
    *   **涉及项目**：QwenPaw (Context Compaction 失效)、Zeroclaw (系统提示词安全预算收紧)、OpenClaw (Dreaming/Memory 索引争议)、AstrBot (图片 Base64 缓存断裂)。
    *   **诉求**：实现智能的 Token 预算控制，防止长会话或媒体内容导致 400 错误，并探索“Append-only”的可审计记忆管理。
3.  **沙箱安全与权限标准化**：
    *   **涉及项目**：DeepSeek Harness (Windows 沙箱完整性标签、本地 LLM 超时)、Zeroclaw (Firejail 参数兼容性)、QwenPaw (模块隔离回归)。
    *   **诉求**：统一跨操作系统（Linux/Windows/macOS）的安全执行边界，解决“沙箱与功能”的冲突，减少用户为使用工具而被迫降低安全配置的妥协。
4.  **多渠道富文本/媒体一致性**：
    *   **涉及项目**：AstrBot (QQ Markdown 渲染裁剪)、hermes-agent (Slack Block Kit 表格)、Zeroclaw (WhatsApp/Telegram 媒体流控)。
    *   **诉求**：解决不同 IM 平台（Slack/Discord/QQ/Telegram）在富媒体传输时的格式丢失、引用误判及流控重试机制。

### 5. 差异化定位分析

*   **功能侧重**：
    *   **OpenClaw / hermes-agent**：侧重“全能型”平台，强调多模态模型接入、跨端会话同步及高级工作流（Cron/Kanban），是“重”型解决方案。
    *   **Zeroclaw / QwenPaw**：侧重“安全与扩展性”，强调插件隔离、企业级计费透明度及国产渠道（QQ/飞书）深度适配。
    *   **PicoClaw / AstrBot**：侧重“极简与专精”，PicoClaw 追求低依赖嵌入，AstrBot 则在 IM 渠道（特别是 QQ 生态）的细粒度交互上具备极强优势。
    *   **DeepSeek Harness**：侧重“开发者工作台”，强调多语言国际化、本地 LLM 管理及 Git 工作树集成，是“开发者友好型” Agent。
*   **目标用户**：OpenClaw/Herms 面向全球极客及高阶 Agent 开发者；QwenPaw/Zeroclaw 面向国内开发者及企业级私有部署用户；DeepSeek Harness 面向追求本地算力自主的技术探索者。
*   **技术架构**：各架构正呈现分化，OpenClaw 的“Gateway”模式面临资源瓶颈，而 QwenPaw 正在进行的“频道子进程隔离”（#8187）及 Zeroclaw 的“安全预算拦截”代表了更稳健的架构演进方向。

### 6. 社区热度与成熟度
*   **第一梯队（快速迭代/震荡期）**：**OpenClaw, hermes-agent**。由于架构重构或功能极速扩张，Bug 呈指数增长，社区讨论集中在“救命式”修复，处于**高热度、高波动**阶段。
*   **第二梯队（质量巩固/精细化期）**：**Zeroclaw, QwenPaw, DeepSeek Harness**。已进入版本发布前的严格 QC 阶段，关注点转向性能基准、企业级合规（计费/安全）及边缘场景兼容性，处于**稳步爬升**阶段。
*   **第三梯队（长尾稳定期）**：**PicoClaw, AstrBot**。更新频率较低，以债务清理和特定场景的 Bug 修复为主，项目已度过爆发期，进入**平稳运行**阶段。

### 7. 值得关注的趋势信号
*   **“安全预算”与资源可审计性**：行业正在从“无限制上下文”转向“硬性拦截与 Token 预算控制”（Zeroclaw #11910, OpenClaw #159662 内存治理）。开发者在设计 Agent 时必须将内存/CPU 的长期消耗作为 P0 级指标。
*   **“多模态非文本”成为性能杀手**：图片/视频在会话历史中的滞留导致缓存命中率骤降（AstrBot #10822）及 API 兼容性问题（OpenClaw Bedrock #186834）愈发普遍。
*   **本地化/私有化部署的复杂性上升**：随着 DeepSeek Harness 和 Zeroclaw 对 Firejail/Windows 沙箱的适配，本地 LLM 与 Agent 框架的“最后一公里”打通面临操作系统级的权限冲突，标准化封装（如 Flatpak/Docker 化）将成趋势。
*   **记忆系统的“隐私-效用”博弈**：OpenClaw 关于“Dreaming”索引排除的争议（#153426）预示着，未来的记忆系统必须具备“可追溯的排除机制”，单纯的安全过滤将无法满足用户对 Agent 长期陪伴性的需求。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

**Zeroclaw 项目动态日报 (2026-10-29)**

### 1. 今日速览
过去24小时内，Zeroclaw 项目保持着极高的社区活跃度，共录得 50 条 Issues 更新（49 活跃）和 30 条 PR 更新，主要精力集中在 **v0.9.0 发布前的阻塞性缺陷修复、安全性加固及插件系统重构** 上。项目当前处于密集迭代期，针对 Discord、Slack、WhatsApp 等高频渠道的回归 Bug 以及 OpenRouter 计费失效等核心痛点已被标记为 P1 级别并进入开发或验收阶段。虽然无新 Release 发布，但多个涉及核心运行时架构与系统提示词安全预算的修复 PR 正在等待审查或已合并，反映出团队正努力在功能扩张与稳定性之间寻找平衡。

### 2. 版本发布
无新版本发布。

### 3. 项目进展
今日合并/关闭的 PR 主要集中在修复系统性 Bug、提升运行时安全性和增强 CLI 可观测性，标志着项目从功能堆砌向精细化打磨阶段的转变：

*   **系统与提示词安全加固**：PR [#11910](https://github.com/zeroclaw-labs/zeroclaw/pull/11910) 彻底移除了系统提示词 `max_system_prompt_chars` 的默认无限制行为，改为硬性拦截（fail closed），从根源上解决了上下文溢出导致的资源失控风险；PR [#12056](https://github.com/zeroclaw-labs/zeroclaw/pull/12056) 和 [#12044](https://github.com/zeroclaw-labs/zeroclaw/pull/12044) 优化了系统提示词的组装顺序及延迟引导逻辑，降低了常驻上下文的消耗。
*   **CLI 与底层功能增强**：PR [#11935](https://github.com/zeroclaw-labs/zeroclaw/pull/11935) 新增了 `cron runs` 功能，允许运维人员直接在终端查看定时任务的持久化运行输出；PR [#11934](https://github.com/zeroclaw-labs/zeroclaw/pull/11934) 修复了 Cron 和 Gateway 触发执行时缺失 Agent 归属标识（`agent_alias`）的问题。
*   **网络传输层安全修复**：PR [#11443](https://github.com/zeroclaw-labs/zeroclaw/pull/11443) 修复了 WebSocket 连接未读取 `SSL_CERT_FILE` 导致内网 TLS 拦截网关握手失败的严重缺陷。
*   **插件与传输层优化**：PR [#12040](https://github.com/zeroclaw-labs/zeroclaw/pull/12040) 修复了插件更新期间清单与组件错配的安全隐患；PR [#11651](https://github.com/zeroclaw-labs/zeroclaw/pull/11651) 实现了 Telegram 429 状态码的流控重试机制，大幅提升了高频场景下的网络健壮性。

### 4. 社区热点
今日讨论最活跃、关注度最高的 Issue 均直指 v0.9.0 发布前的核心阻塞点与渠道兼容性：

*   **Discord 插件发布验证**：[#10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999) (9 评论)。团队正在验证 v0.8.6 归档版的 Discord 双向收发能力，这是当前渠道插件能否顺利随 v0.9.0 发布的先决条件。
*   **独立渠道 SOP 工具句柄缺失**：[#11055](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) (8 评论)。这是一个 P1 级架构缺陷，导致在守护进程部署模式下，独立渠道无法获取必要的工具句柄，严重影响了底层 Agent Loop 的架构统一性。
*   **Slack 状态指示缺失**：[#11416](https://github.com/zeroclaw-labs/zeroclaw/issues/11416) (5 评论)。用户指出自 v0.8.5 起，Slack 频道线程中不再显示 Agent 正在处理的状态提示（"is thinking…"），影响了用户对产品运行状态的感知。
*   **OpenRouter 计费系统失效**：[#11204](https://github.com/zeroclaw-labs/zeroclaw/issues/11204) (5 评论)。仪表盘中的成本统计全为零且 Token 被错误标记为免费，这对于多租户或注重成本控制的企业级用户是致命的阻碍。

### 5. Bug 与稳定性
今日报告的 Bug 主要集中在沙箱环境兼容性、外部 API 交互与插件管理，按严重程度排序如下：

*   **S1（阻塞性 Bug）**：
    *   **Firejail 沙箱命令执行失败**：[#11539](https://github.com/zeroclaw-labs/zeroclaw/issues/11539) 与 [#11538](https://github.com/zeroclaw-labs/zeroclaw/issues/11538)。Linux 环境下的沙箱工具因 `--nowheel` 参数及私有目录配置错误导致 Shell 工具调用全面失败。**状态**：暂无关联 fix PR，等待深入排查。
    *   **上下文窗口兼容推断失效**：[#12014](https://github.com/zeroclaw-labs/zeroclaw/issues/12014)。自定义 OpenAI 兼容 Provider 在缺失 `context_window` 时，系统死板地假设 32,000 长度导致合法请求被拒绝。**状态**：暂无关联 fix PR。
    *   **MCP 连接恢复机制死锁**：[#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807)。单次网络波动导致 MCP 连接状态彻底毒化（poisoned），后续重连机制失效导致工作流中断。**状态**：暂无关联 fix PR。
*   **S2（体验降级 Bug）**：
    *   **Web UI 会话消息同步延迟**：[#11917](https://github.com/zeroclaw-labs/zeroclaw/issues/11917)。Web 聊天在首次回复前无法接收 Cron 结果或推送消息。**状态**：暂无关联 fix PR。
    *   **WhatsApp 媒体文本剥离**：[#11257](https://github.com/zeroclaw-labs/zeroclaw/issues/11257) 与 [#11059](https://github.com/zeroclaw-labs/zeroclaw/issues/11059)。微信/WhatsApp 渠道丢弃了图片/文档的附带文字，且无法按配置强制转为语音消息。**状态**：暂无关联 fix PR。
    *   **OpenAI Codex 非流式重试失败**：[#12072](https://github.com/zeroclaw-labs/zeroclaw/issues/12072)。流式解码失败时触发非流式重试，但该端点强制要求流式，导致请求返回 400 错误。**状态**：已提交 fix PR [#9900](https://github.com/zeroclaw-labs/zeroclaw/pull/9900)。
*   **S3（次要/安全 Bug）**：
    *   **Gateway 获取配对码异常退出码**：[#11972](https://github.com/zeroclaw-labs/zeroclaw/issues/11972)。无法获取 Paircode 时返回退出码 0，掩盖了错误事实。**状态**：暂无关联 fix PR。
    *   **插件包锁文件权限过宽**：[#11360](https://github.com/zeroclaw-labs/zeroclaw/issues/11360)。包锁文件对本地其他账户可读，导致文件被锁死进而使得插件安装/卸载失败。**状态**：暂无关联 fix PR。

### 6. 功能请求与路线图信号
今日活跃的 Feature 请求多与现有核心机制深度耦合，反映了项目在“会话管理”、“多渠道能力”及“可观测性”上的后续演进方向：

*   **会话生命周期与持久化扩展**：用户请求通过 `/load-session` 恢复历史 Code 会话（[#12069](https://github.com/zeroclaw-labs/zeroclaw/issues/12069)），以及重构为仅追加（append-only）的会话事件历史（#11921 对应的 Issue）。配合今日合并的 Cron 运行输出查看，表明项目路线图正在向**高度可审计与可恢复的数据层**倾斜。
*   **多渠道媒体与文件传输**：请求 `send_via` 增加 `attachments` 以支持通过邮件等渠道发送文件（[#11997](https://github.com/zeroclaw-labs/zeroclaw/pull/11997) 的对应 PR），这将打通多渠道间富媒体传输的壁垒。
*   **工具连接池调优**：提出 MCP HTTP 客户端缺少连接池/Keep-alive 控制，导致陈旧 Socket 丢失工具调用（[#12055](https://github.com/zeroclaw-labs/zeroclaw/issues/12055)）。
*   **新型 Provider 接入**：新增 Obscurify.ai 模型 Provider 的专属适配（#12085 对应的 PR）。

### 7. 用户反馈摘要
*   **真实痛点**：用户对于**计费透明度（如 #11204 中的 $0.00 显示）**和**沙箱环境可用性（如 #11539 Linux 下的 Firejail 崩溃）**表达了强烈不满，这直接影响到了项目的企业级部署可行性。
*   **满意/积极场景**：开发团队通过 #11910 等 PR 迅速收紧了系统提示词的安全预算，这种"fail closed"的防御性编程姿态在架构层面上获得了高级别关注，有效缓解了上下文爆炸对底层 Agent Loop 的破坏。
*   **使用习惯反馈**：高频使用 Web UI 和 Telegram 渠道的用户对网络状态同步与媒体处理提出了大量细节需求（如 Slack 的 thinking 提示、Telegram 的 429 重试），表明**多渠道长连接与 UI 状态同步**是后续迭代的重中之重。

### 8. 待处理积压
*   **架构级 MCP 注册表缓存缺失**：[#10346](https://github.com/zeroclaw-labs/zeroclaw/issues/10346) 自 8 月 25 日提出，指出单进程内 MCP 服务器启动时被重复连接三次，造成显著的资源浪费与启动变慢，该 RFC 仍处于高优先级但被搁置状态，需维护者尽快定夺。
*   **X86_64 发布包体积逼近警戒线**：[#11580](https://github.com/zeroclaw-labs/zeroclaw/issues/11580) 指出下一个 v0.9.0 版本的 Linux 二进制文件即将触发 64 MiB 的发布大小上限，目前仍在评估是提升上限还是进行代码裁剪，阻碍了 Release 门禁策略的制定。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 (2026-10-29)

## 1. 今日速览
今日 PicoClaw 项目维持中低活跃度，过去 24 小时内主要活动集中在代码清理与陈旧 PR 的归档处理。项目**无新版本发布**，核心功能无重大变更。
*   **Issues**：3 条更新，其中 2 条新报告的问题（涉及模型验证逻辑与网关状态同步）需关注。
*   **Pull Requests**：9 条更新，7 条已合并或关闭（多为长期挂起 PR 的合并或标记为 Stale），2 条新 PR 待合并。
*   **健康度**：项目正进行代码基线的维护与债务清理，社区贡献者仍在解决具体的集成 Bug（Discord、Anthropic），但缺乏高频的功能迭代。

## 2. 版本发布
*无新版本发布*

## 3. 项目进展
今日主要进展在于清理长期未合并的代码，以及集成渠道的 Bug 修复。

*   **架构重构与代码质量提升**：
    *   PR [#699](https://github.com/sipeed/picoclaw/pull/699) 被关闭（未合并）。该 PR 旨在分解 `AgentLoop`，提取 `ContextCompressor` 和 `ToolExecutor`，并替换魔法数字。虽然该 PR 未在今日合并，但其存在表明社区对核心 Agent 循环的可维护性有持续关切。
*   **集成渠道修复 (Channels)**：
    *   **WhatsApp Native 构建修复**：PR [#1569](https://github.com/sipeed/picoclaw/pull/1569) 已合并，修复了 WhatsApp Native 模块的构建标签问题，解决了特定环境下的编译失败。
    *   **Cron 任务消息投递修复**：PR [#757](https://github.com/sipeed/picoclaw/pull/757) 已合并，修复了 Cron 定时任务触发的 Agent 回复无法发送到 Channel（如 Telegram）的问题。此前 `ExecuteJob` 绕过了 `AgentLoop` 的总线机制，导致出站消息被丢弃。
    *   **Anthropic 原生协议支持**：PR [#1158](https://github.com/sipeed/picoclaw/pull/1158) 已合并，新增 `anthropic-messages` 协议前缀，允许使用仅支持 Anthropic 原生 `/v1/messages` 格式的代理或服务。
*   **UI/UX 功能清理**：
    *   PR [#3429](https://github.com/sipeed/picoclaw/pull/3429) 和 [#3430](https://github.com/sipeed/picoclaw/pull/3430) 因长期未活动被标记为 `[stale]` 并关闭。这两个 PR 原本旨在增加 `hide_args` 配置以隐藏工具反馈中的参数字段。虽然功能未进入主分支，但表明该特性需求可能仍未被解决或需重新提案。
*   **批量合并**：
    *   PR [#1544](https://github.com/sipeed/picoclaw/pull/1544) 关闭，涉及合并多个上游修复 PR，推测为分支同步或策略调整后的清理。

## 4. 社区热点
今日讨论主要集中在新报告的 Bug 和长期提案上。

*   **[热点 1] 模型标识符验证逻辑缺陷**
    *   **Issue** [#3454](https://github.com/sipeed/picoclaw/issues/3454) (New)
    *   **现象**：当用户输入非 PicoClaw 原生提供商（如 `ACME`）但大小写敏感的模型前缀时，系统强制建议将前缀小写化（`acme`），导致上游 API 调用失败。
    *   **分析**：这表明 PicoClaw 的模型验证器缺乏对“自定义/第三方命名空间”大小写保留的支持，是易用性 Bug。
    *   **Fix 状态**：暂无关联 PR。

*   **[热点 2] 网关热重载与 WebUI 状态不同步**
    *   **Issue** [#3453](https://github.com/sipeed/picoclaw/issues/3453) (New)
    *   **现象**：启用 `gateway.hot_reload` 后，WebUI 修改默认模型在约 2 秒内生效，但 WebUI 仍显示“需要重启”提示，且 `gateway_restart_required` 状态保持 `true`。
    *   **分析**：这是典型的 UI 状态机与后端实际状态不同步问题。虽不影响功能，但严重影响用户信心和操作体验。
    *   **Fix 状态**：暂无关联 PR。

*   **[长期提案] 低依赖持久化 Agent 会话**
    *   **Issue** [#3427](https://github.com/sipeed/picoclaw/issues/3427) (Closed - Stale)
    *   **现象**：提出利用 PicoClaw 的 MCP 和心跳能力，结合 Plazmi 等外部服务实现“持久世界”Agent 会话。
    *   **分析**：该 Issue 被标记为 Stale 并关闭，说明此类“外部平台集成示例”并未进入核心开发优先级，或需要更符合项目规范的提案。

## 5. Bug 与稳定性
*按严重程度排列，关注影响核心功能可用性的问题。*

1.  **Discord 通道永久死锁 (严重 - Critical)**
    *   **PR** [#3452](https://github.com/sipeed/picoclaw/pull/3452) (Open)
    *   **描述**：Discord 机器人可能进入“永久失聪”状态（Connected 但无心跳、无日志、无数据收发）。
    *   **根因**：Pinned `discordgo` fork (`yeongaori/discordgo-fork@e8e546f`) 存在网关握手死锁。
    *   **修复方案**：PR 建议更新 fork 版本以修复此问题。
    *   **状态**：**待合并**。建议维护者优先审查此 PR，因为 Discord 是高频通道。

2.  **Anthropic 思考模型兼容性问题 (中等 - Medium)**
    *   **PR** [#3447](https://github.com/sipeed/picoclaw/pull/3447) (Open)
    *   **描述**：使用 Token 认证调用“始终思考”（thinking-always）模型（如 `claude-haiku-5-5`）时，因传递已废弃的 `temperature` 参数导致 400 错误。
    *   **状态**：**待合并**。影响特定 Anthropic 模型用户的使用体验。

## 6. 功能请求与路线图信号
*   **工具反馈参数隐藏**：
    *   尽管 PR [#3429](https://github.com/sipeed/picoclaw/pull/3429) 和 [#3430](https://github.com/sipeed/picoclaw/pull/3430) 被关闭，但功能需求（`hide_args`）具有合理性，用于简化 UI 展示。
    *   **信号**：若下一版本重视 UI 精简性，建议开发者基于这两个 PR 重新开启或重写合并，避免功能需求被 Stale 机制误杀。
*   **Anthropic 协议支持**：
    *   PR [#1158](https://github.com/sipeed/picoclaw/pull/1158) 的合并表明路线图明确支持更多样的 LLM 接入协议。结合 PR [#3447](https://github.com/sipeed/picoclaw/pull/3447)，下一步应重点优化 Anthropic 模型在不同参数配置下的兼容性。

## 7. 用户反馈摘要
*基于 Issues 和 PR 描述提炼：*

*   **痛点 1：配置验证过于僵化**。用户在使用非标准或大小写敏感的模型 ID 时感到困惑（见 [#3454](https://github.com/sipeed/picoclaw/issues/3454)）。用户期望验证逻辑能区分“PicoClaw 内置提供商”和“自定义/上游命名空间”。
*   **痛点 2：状态反馈不一致**。用户在 WebUI 修改配置后，期望系统立即反映最新状态。热重载成功但 UI 仍显示需重启（见 [#3453](https://github.com/sipeed/picoclaw/issues/3453)），造成用户误判系统故障。
*   **痛点 3：通道静默失败**。Discord 用户遭遇无日志、无心跳的静默死锁（见 PR [#3452](https://github.com/sipeed/picoclaw/pull/3452)），排查难度极大。用户需要更明确的错误日志或健康检查机制。
*   **满意点**：Cron 任务修复（[#757](https://github.com/sipeed/picoclaw/pull/757)）解决了自动化场景下消息丢失的问题，这是核心 Agent 用例的关键修复。

## 8. 待处理积压
*提醒维护者关注长期未响应或阻塞的问题。*

*   **高优先级积压**：
    *   PR [#3452](https://github.com/sipeed/picoclaw/pull/3452) (Discord 死锁修复)：涉及核心通道稳定性，应尽快 Review 合并。
    *   PR [#3447](https://github.com/sipeed/picoclaw/pull/3447) (Anthropic 兼容性)：影响特定但重要的模型用户。
*   **低优先级/需重新评估**：
    *   Issue [#3454](https://github.com/sipeed/picoclaw/issues/3454)：需核心团队成员确认验证逻辑的设计初衷，判断是修复 Bug 还是添加新配置。
    *   Issue [#3453](https://github.com/sipeed/picoclaw/issues/3453)：UI 状态同步问题，虽不阻断功能，但应列入下一个 UI 修复批次。
    *   **长期 Stale 清理**：今日关闭了多个 Stale PR (#3429, #3430, #699, #1569, #1544)，建议检查是否还有其他标记为 Stale 但未关闭的重要提案，并明确关闭原因（功能过时 vs 代码质量）。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

**QwenPaw 项目日报：2026-10-29**

### 1. 今日速览
QwenPaw 项目今日保持高度活跃，过去 24 小时内共更新 23 个 Issues 和 50 个 Pull Requests，其中 15 个 Issue 处于活跃状态，30 个 PR 待合并。项目正处于 **v2.3.0-beta.1** 的验证阶段，核心团队正集中处理插件加载稳定性（特别是 `importlib.invalidate_caches` 引发的系统性错误）及上下文压缩（Context Compaction）在特定模型提供商下的兼容性问题。尽管未发布正式新版本，但 beta 版本的安装验证流程已启动，社区贡献者（First-time contributors）参与度显著，多个功能增强 PR 已提交。整体健康度良好，但需警惕插件系统在新 beta 版本中的回归风险。

### 2. 版本发布
今日无正式新版本发布。
*注：虽无正式 Release，但 Issue #8456 显示 **v2.3.0-beta.1** 已于昨日发布并进入安装验证阶段，相关测试反馈正在汇集。*

### 3. 项目进展
今日合并或关闭的重要 PR 主要集中在修复 Windows 环境下的安装器问题、记忆模块的版本对齐以及 LLM 启动挂起防护：

*   **[PR #8455] fix(desktop): handle Windows installer preparation failures (已合并)**
    *   **内容**：修复了 Windows 安装包准备阶段因 `powershell.exe` 调用路径或 `nsExec` 错误导致的静默失败问题，增强了错误可见性。
    *   **意义**：提升了 Windows 用户安装成功率，特别是针对 Server 环境的兼容性。
    *   链接: https://github.com/agentscope-ai/QwenPaw/pull/8455
*   **[PR #8468] fix(providers): prevent silent LLM startup hangs (已合并)**
    *   **内容**：扩展了首内容超时（first-content timeout）以覆盖流式启动过程，并增加了速率限制器获取超时的警告日志。
    *   **意义**：解决了 #8435 中提到的 LLM 静默挂起问题，增强了系统稳定性。
    *   链接: https://github.com/agentscope-ai/QwenPaw/pull/8468
*   **[PR #7606] fix(memory): prepare Auto-Dream for ReMe 0.4.1.12 (已关闭/合并)**
    *   **内容**：移除了弃用的 Auto-Dream 主题提取步骤，并更新了文档，保持 QwenPaw 主动模式独立于 ReMe 新的主动刷新管线。
    *   **意义**：为记忆模块适配 ReMe 0.4.x 系列做准备，清理了技术债务。
    *   链接: https://github.com/agentscope-ai/QwenPaw/pull/7606
*   **[Issue #8320] Bug: QwenPaw Desktop 2.2.2 make-skill validator fails (已关闭)**
    *   **说明**：修复了 Desktop 2.2.2 中因 `qwenpaw` 模块导入失败导致 skill 验证器无法运行的问题，改善了开发体验。
    *   链接: https://github.com/agentscope-ai/QwenPaw/issues/8320

### 4. 社区热点
今日讨论最活跃、涉及用户痛点最深的 Issues 主要集中在**上下文压缩机制**和**插件加载稳定性**：

*   **[Issue #8312] [bug] 上下文控制失效，导致任务中断 (4 条评论)**
    *   **热点分析**：用户在使用 `codemode-flash` 模型时，因上下文压缩未能将请求适配到 251904 tokens 窗口内（实际需要 252565 tokens），导致任务中断。
    *   **诉求**：用户期望自动压缩机制更精准，或在超限时提供明确的降级策略而非直接中断。
    *   链接: https://github.com/agentscope-ai/QwenPaw/issues/8312
*   **[Issue #8265] [bug] Plugin hot-install aborts when importlib.invalidate_caches() raises (4 条评论)**
    *   **热点分析**：在特定发行版的 Python 3.11 上，`importlib.invalidate_caches()` 抛出异常导致插件热安装失败。此问题在 #8473 中被确认为 v2.3.0-beta.1 中的回归问题（影响所有后端插件加载）。
    *   **诉求**：维护者需优先修复此系统性错误，因为它阻塞了插件生态的正常运行。
    *   链接: https://github.com/agentscope-ai/QwenPaw/issues/8265
*   **[Issue #8040] [Bug]: embedding reindex incomplete... (7 条评论)**
    *   **热点分析**：ReMe 嵌入重建失败，原因是单个 CJK 块超过提供商的每项目令数限制，导致整个批次被静默丢弃。这是 #5950 的复发。
    *   **诉求**：用户需要更健壮的嵌入分块逻辑，防止因单个大块失败而丢失数据。
    *   链接: https://github.com/agentscope-ai/QwenPaw/issues/8040

### 5. Bug 与稳定性
今日报告的 Bug 按严重程度排列如下：

1.  **高严重度：v2.3.0-beta.1 全量插件加载失败**
    *   **Issue**: [#8473]
    *   **描述**：由于 `module_isolation.py:220` 中未保护的 `importlib.invalidate_caches()` 调用，所有声明后端入口点的插件在启动时失败（TypeError）。这是 #8265 的新调用点回归。
    *   **状态**：尚未有明确的 Fix PR 合并，需紧急处理。
    *   链接: https://github.com/agentscope-ai/QwenPaw/issues/8473

2.  **中严重度：上下文压缩导致会话永久卡死**
    *   **Issue**: [#8474]
    *   **描述**：压缩过程重新注入了已压缩历史中的媒体块，导致模型 API 持续返回 400 错误，会话无法恢复。
    *   **相关 Fix**: PR #8417 解决了特定模型（glm-5.3-flash）的压缩参数问题，但 #8474 描述的媒体块重注入问题可能仍需独立修复。
    *   链接: https://github.com/agentscope-ai/QwenPaw/issues/8474

3.  **中严重度：QQ 频道 enabled 标志静默重置**
    *   **Issue**: [#8475]
    *   **描述**：配置重载或重启后，QQ 频道的 `enabled` 标志被静默设为 `false`，且无警告日志，导致消息收发中断。
    *   **状态**：新报告，无 Fix PR。
    *   链接: https://github.com/agentscope-ai/QwenPaw/issues/8475

4.  **低严重度：Automatic Memory Search 重复调用拦截后回复失败**
    *   **Issue**: [#8361]
    *   **描述**：开启自动记忆搜索后，模型在同一轮次重复调用 `memory_search`，达到上限被拦截后，后续的正常回复无法生成。
    *   **相关 Fix**: PR #7835 和 #8457 正在尝试通过改变记忆召回的表示方式（从工具调用改为系统参考上下文）来解决此类模仿行为。
    *   链接: https://github.com/agentscope-ai/QwenPaw/issues/8361

### 6. 功能请求与路线图信号
*   **[PR #8476] feat(jobs): add thinking_level to JobRuntimeSpec (待合并)**
    *   **信号**：响应 Issue #8439，允许 cron 任务独立控制深度推理（`off`/`inherit`/`enabled`）。这表明项目正致力于细粒度的资源管理和成本控制。
    *   链接: https://github.com/agentscope-ai/QwenPaw/pull/8476
*   **[PR #8479] feat(skills): sync Office skills with Anthropic July 2026 update (待合并)**
    *   **信号**：同步 DOCX/PPTX/XLSX 技能，保持与行业标准的对齐。
    *   链接: https://github.com/agentscope-ai/QwenPaw/pull/8479
*   **[PR #8470] feat(console): browse memory files by tags (待合并)**
    *   **信号**：增强控制台 UI，允许通过标签浏览记忆文件，提升记忆管理的直观性。
    *   链接: https://github.com/agentscope-ai/QwenPaw/pull/8470
*   **[PR #8187] feat(channels): extract channels into plugins with subprocess isolation (待合并, 规模 XXXL)**
    *   **信号**：这是一个大型架构重构，旨在将频道（除 Console 外）提取为独立插件，通过子进程隔离提高稳定性并减少主机进程的 SDK 导入。这可能是下一主要版本的特性。
    *   链接: https://github.com/agentscope-ai/QwenPaw/pull/8187

### 7. 用户反馈摘要
*   **痛点：上下文压缩的不可靠性**
    *   用户多次抱怨 `/compact` 命令在不同模型（如 glm-5.3-flash, codemode-flash）下失败或导致会话损坏（#8417, #8312, #8474）。用户希望压缩机制能更智能地处理参数差异和媒体内容。
*   **痛点：插件系统的脆弱性**
    *   在 Python 3.11/3.12 的不同构建版本中，插件加载经常因标准库行为差异而崩溃（#8265, #8473）。用户期待更健壮的插件隔离和错误处理。
*   **满意点：性能优化**
    *   PR #8482 和 #8477 展示了团队对历史数据库连接复用和技能安装性能的关注，用户反馈这些改进减少了启动延迟。
*   **使用场景：多渠道集成**
    *   用户（如 #8409）强烈关注 QQ 等国内频道的流式消息支持，以提升即时响应体验。

### 8. 待处理积压
*   **[PR #7712] feat(tools): add Serply as a web_search provider (Open, First-time-contributor)**
    *   创建于 2026-09-11，已停滞近两个月。作为新搜索提供商，需维护者审查 API 密钥管理及与现有 Tavily/AnySearch 的集成逻辑。
    *   链接: https://github.com/agentscope-ai/QwenPaw/pull/7712
*   **[Issue #7715] Daily Paper fails silently when arxiv.org is unreachable (Open)**
    *   创建于 2026-09-12，长期未响应。用户指出缺乏代理配置选项，且错误信息具有误导性。建议增加网络配置的灵活性。
    *   链接: https://github.com/agentscope-ai/QwenPaw/issues/7715
*   **[PR #8187] feat(channels): extract channels into plugins (Open, Size XXXL)**
    *   由于规模巨大，可能需要拆分为多个 PR 以便审查。建议维护者制定审查计划，避免长期占用主要分支注意力。
    *   链接: https://github.com/agentscope-ai/QwenPaw/pull/8187

**建议行动**：
1.  **紧急**：修复 v2.3.0-beta.1 中的 `importlib.invalidate_caches` 回归问题（#8473, #8265），以稳定插件系统。
2.  **重要**：深入排查上下文压缩在媒体块和特定模型提供商下的兼容性（#8474, #8417）。
3.  **规划**：评估大型重构 PR #8187 的拆分策略，以及新搜索提供商 Serply 的集成优先级。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

**hermes-agent 项目动态日报 (2026-10-29)**

### 1. 今日速览
截至 2026-10-29，hermes-agent 项目社区活跃度极高，过去 24 小时内产生了 357 条 Issue 更新和 500 条 PR 更新，显示出高强度的开发迭代与问题排查节奏。项目当前处于“统一网关架构”（Unified Gateway Runtime）合并后的稳定性巩固期，大量精力集中在修复该架构带来的会话状态、权限管理及桌面端兼容性问题。尽管过去 24 小时无新版本发布，但积压了 382 个待合并 PR，表明版本发布周期可能拉长或正处于大规模重构后的密集修复阶段。整体健康度呈“高压运转”状态，核心功能稳定但边缘场景（如 Windows 平台、多 Profile 混合部署）暴露较多回归 Bug。

### 2. 版本发布
过去 24 小时内无新版本发布。

### 3. 项目进展
今日 PR 更新量巨大（500 条），重点推进方向集中在**网关安全性加固**、**桌面端体验优化**及**多平台适配修复**：
*   **安全性与认证强化**：
    *   PR [#146285](https://github.com/NousResearch/hermes-agent/pull/146285) 修复了 OS 密钥库无响应时 Vault 挂起的问题，引入了 30 秒超时失败机制，提升了在 macOS 等系统上的健壮性。
    *   PR [#39643](https://github.com/NousResearch/hermes-agent/pull/39643) 随机化了备用 API 会话 ID，防止未认证请求导致会话状态混叠，属于安全边界的关键修复。
    *   PR [#144025](https://github.com/NousResearch/hermes-agent/pull/144025) 增强了命令行参数中凭据值的脱敏能力，覆盖了 `--password` 等常见 Flag 形式，防止敏感信息泄露至日志。
*   **桌面端与 TUI 功能深化**：
    *   PR [#146286](https://github.com/NousResearch/hermes-agent/pull/146286) 实现了联邦会话索引（Federated Session Index），优化了多连接场景下侧边栏的统一视图，解决了冷连接显示为空的问题。
    *   PR [#146283](https://github.com/NousResearch/hermes-agent/pull/146283) 修复了桌面端 CJK 输入法（IME）在 Dashboard 聊天框中的字符丢失与乱码问题，显著提升了中文用户的使用体验。
*   **多平台适配与插件生态**：
    *   PR [#146287](https://github.com/NousResearch/hermes-agent/pull/146287) 修复了 Slack 平台在非进程内发送时 Block Kit 原生表格渲染失效的问题。
    *   多个 PR（如 [#144988](https://github.com/NousResearch/hermes-agent/pull/144988), [#144981](https://github.com/NousResearch/hermes-agent/pull/144981)）更新了 `holographic` 和 `hermes-dreaming` 等核心记忆插件至最新版本，增强了记忆压缩与实体链接的准确性。

### 4. 社区热点
当前讨论最活跃的 Issue 主要围绕“统一网关”合并后的后遗症及长期未决的性能/兼容性痛点：
*   **统一网关后的回归修复追踪**：
    *   Issue [#134889](https://github.com/NousResearch/hermes-agent/issues/134889)（224 条评论，已关闭）：追踪 #106742 合并后的本地会话网关独占问题。虽然已关闭，但其关联的开放 Issue [#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（27 条评论）正在汇总主分支上遗留的 `session.resume` 失败、网关状态同步等问题，是社区关注的核心风暴眼。
    *   用户诉求：要求确保 CLI、Desktop、API 等多端在统一网关下的会话一致性，解决重启后无法恢复远程会话的问题。
*   **资源消耗与性能**：
    *   Issue [#127647](https://github.com/NousResearch/hermes-agent/issues/127647)（32 条评论）：追踪桌面端空闲状态下的 CPU/GPU/内存高占用问题。用户反映即使无活动任务，后台服务仍保持高负载，影响 VPS 及本地部署的稳定性。
*   **安全与治理 RFC**：
    *   Issue [#143379](https://github.com/NousResearch/hermes-agent/issues/143379)（29 条评论）：提出“Doc-Chain Substrate” RFC，探讨会话压缩后的文档溯源、读取机制及治理策略。高评论数表明社区对长期记忆的安全性与可审计性有高度共识和深度讨论。

### 5. Bug 与稳定性
今日报告的 Bug 主要集中于会话状态管理、平台特定异常及权限校验，按严重程度排列如下：

*   **P0/P1 级（高危/阻塞）**
    *   **Anthropic 凭据池轮转回归**：[#118379](https://github.com/NousResearch/hermes-agent/issues/118379)（P1）。在 v0.20.5+ 中，逐请求刷新凭据机制导致池化订阅账单合并，且易触发跨 Provider 回退。**Fix 状态**：暂无明确 Fix PR，需关注凭据管理逻辑重构。
    *   **远程桌面会话不可恢复**：[#139818](https://github.com/NousResearch/hermes-agent/issues/139818)（P2，标记为 P0 风险域）。远程后端重启后，`session.resume` 返回 `not_found`，导致用户丢失对话上下文。**Fix 状态**：正在排查，关联统一网关问题。

*   **P2 级（功能异常）**
    *   **Kanban 调度死锁**：[#119070](https://github.com/NousResearch/hermes-agent/issues/119070)。受限重试后的 Kanban 卡片永久卡在 `blocker_auth`，Reviewer 无法生成。该问题影响自动化工作流。
    *   **Slack 状态指示器失效**：[#146071](https://github.com/NousResearch/hermes-agent/pull/146071)。因 slack-sdk 3.44+ 变更，Hermes 发送的旧状态值导致 Slack 工作指示器不显示。已提交 PR 修复，等待合并。
    *   **Cron 路径验证失败**：[#39627](https://github.com/NousResearch/hermes-agent/pull/39627)。Windows 环境下 Cron 脚本路径未标准化导致验证失败。已提交 PR 修复，等待合并。
    *   **Signal 适配器健康检查错误**：[#69310](https://github.com/NousResearch/hermes-agent/issues/69310)。健康检查调用不存在的 `/api/v1/check` 端点，导致误报故障。

*   **P3 级（体验/次要）**
    *   **Windows WhatsApp 桥接失败**：[#68128](https://github.com/NousResearch/hermes-agent/issues/68128)。在无脱离 Job Object 中启动时出现 WinError 5，缺少 `windows_detach_flags_without_breakaway()` 回退机制。
    *   **Node.js CLI 误拦截**：[#105758](https://github.com/NousResearch/hermes-agent/issues/105758)。生命周期守卫误判良性 Node.js CLI 命令为网关重启/停止操作，导致阻塞。

### 6. 功能请求与路线图信号
基于热门 Issue 及已有 PR，以下功能可能纳入下一版本或短期路线图：
*   **多模态/多端统一体验**：
    *   **Webapp 模式**：PR [#144648](https://github.com/NousResearch/hermes-agent/issues/144648) 追踪的 `webapp.enabled` 功能已合并，允许通过浏览器访问 Desktop 工作区。后续重点在于优化其在多 Profile 下的会话隔离与权限控制（见 [#143364](https://github.com/NousResearch/hermes-agent/issues/143364)）。
    *   **子智能体模型引导选择器**：[#67347](https://github.com/NousResearch/hermes-agent/issues/67347) 提出在 Desktop/Dashboard 中为 `delegation.model` 提供引导式选择器，目前为自由文本输入，易出错。
*   **平台深度集成**：
    *   **WhatsApp Cloud API 模板**：[#45935](https://github.com/NousResearch/hermes-agent/issues/45935)（8 个 👍）强烈要求支持 24 小时窗口外的消息模板重入机制，适用于商业客户再营销场景。
    *   **Windows 任务栏行为解耦**：[#119120](https://github.com/NousResearch/hermes-agent/issues/119120) 建议将最小化到托盘与关闭窗口行为解耦，符合 Windows 用户习惯。
*   **操作便利性**：
    *   **Enter/Ctrl+Enter 自定义**：[#49422](https://github.com/NousResearch/hermes-agent/issues/49422)（4 个 👍）希望允许用户自定义发送/换行快捷键，当前固定为 Enter 发送，易误触。

### 7. 用户反馈摘要
*   **痛点**：
    *   **状态一致性焦虑**：用户普遍抱怨跨设备（Desktop vs CLI）及重启后会话状态的丢失或不一致，尤其在统一网关架构下，`session.resume` 的可靠性成为主要投诉点（[#139818](https://github.com/NousResearch/hermes-agent/issues/139818), [#70445](https://github.com/NousResearch/hermes-agent/issues/70445)）。
    *   **资源消耗**：桌面端空闲时的高 CPU/内存占用（[#127647](https://github.com/NousResearch/hermes-agent/issues/127647)）导致 VPS 用户成本上升，本地用户电量消耗增加。
    *   **自动化工作流阻塞**：Kanban 和 Cron 任务中的边缘状态（如限流后重试）容易导致工作流卡死，缺乏操作者覆盖机制（[#119070](https://github.com/NousResearch/hermes-agent/issues/119070), [#67249](https://github.com/NousResearch/hermes-agent/issues/67249)）。
*   **满意/积极信号**：
    *   **多语言支持**：CJK 输入法修复（PR [#146283](https://github.com/NousResearch/hermes-agent/pull/146283)）解决了长期困扰中文用户的基础体验问题。
    *   **安全性改进**：社区对凭据脱敏（[#144025](https://github.com/NousResearch/hermes-agent/pull/144025)）和会话 ID 随机化（[#39643](https://github.com/NousResearch/hermes-agent/pull/39643)）表示欢迎，认为增强了生产环境部署的安全性。
    *   **插件生态活跃度**：记忆类插件（holographic, dreaming）的频繁更新（v0.22.0, v3.7.1）表明用户在积极构建长期记忆工作流。

### 8. 待处理积压
提醒维护者关注以下长期未决或高积压事项：
*   **统一网关后续修复**：Issue [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 汇总了自 10 月 14 日合并以来的所有回归 Bug，需作为下一个迭代的核心清理目标。
*   **Windows 平台兼容性**：[#68128](https://github.com/NousResearch/hermes-agent/issues/68128)（WhatsApp Job Object）和 [#119120](https://github.com/NousResearch/hermes-agent/issues/119120)（任务栏行为）长期 Open，需安排 Windows 专项测试与修复。
*   **PR 积压**：当前 382 个待合并 PR，其中 #39643（安全）、#39627（Cron）等自 6 月起长期 Open，需确认是否因架构变更导致冲突或优先级下降，建议进行 Triage 清理。
*   **性能优化专项**：[#127647](https://github.com/NousResearch/hermes-agent/issues/127647) 涉及桌面端空闲资源消耗，影响面广，建议分配专门资源进行性能剖析与优化。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期：** 2026-10-29
**数据范围：** 过去 24 小时（2026-10-28 00:00 UTC 至 2026-10-29 00:00 UTC）

## 1. 今日速览
过去 24 小时内，AstrBot 社区展现出高度的开发活跃度，共新增/活跃 8 个 Issues 和 22 个待合并 PRs，总更新量达到 34 条。项目当前重心明显集中在 **QQ 官方机器人（qq_official）适配器的深度修复** 与 **MCP 工具调用稳定性** 上，出现了多个针对特定场景的 Bug 报告及对应修复 PR。社区对 **会话管理**（如前缀缓存断裂、限流策略）和 **多模态消息处理**（图片、引用消息）的关注度显著上升。今日无新版本发布，但大量 PR 已提交并关联至具体 Issue，显示出维护者快速响应的态势。整体项目健康度良好，核心框架虽出现若干 P1/P2 级 Bug，但均已有明确的修复路径。

## 2. 版本发布
**今日无新版本发布。**

## 3. 项目进展
今日主要进展体现在对历史遗留问题的修复和新架构组件的引入，尽管大部分 PR 仍处于 `OPEN` 状态等待合并，但代码层面已有显著推进：

*   **MCP 重连机制恢复**：[#10838](https://github.com/AstrBotDevs/AstrBot/pull/10838) 恢复了因此前重构被回滚的 MCP 会话终止重连逻辑（关联 [Issue #4664](https://github.com/AstrBotDevs/AstrBot/issues/4664)），旨在解决 MCP Server 进程意外退出后客户端无法自动恢复的问题。
*   **MCP SDK 兼容性修复**：[#10825](https://github.com/AstrBotDevs/AstrBot/pull/10825) 增加了对 `mcp>=2.x` 重大版本不兼容性的检测，防止因 SDK 升级导致的初始化超时静默错误。
*   **QQ 官方适配器优化**：
    *   [#10842](https://github.com/AstrBotDevs/AstrBot/pull/10842) 修复了被动回复时错误构造 `Reply` 对象及引用图片被拍平为文本的问题（关联 [Issue #10840](https://github.com/AstrBotDevs/AstrBot/issues/10840)）。
    *   [#10830](https://github.com/AstrBotDevs/AstrBot/pull/10830) 修复了 `aiocqhttp` 平台中消息时间戳被覆盖为当前时间的问题，确保插件能准确判断消息年龄。
*   **知识库检索稳定性**：[#10263](https://github.com/AstrBotDevs/AstrBot/pull/10263) 和 [#10292](https://github.com/AstrBotDevs/AstrBot/pull/10292) 修复了 Rerank 和 Embedding 提供商在热重载后因缓存旧实例导致的检索失败问题，提升了 RAG 系统的可靠性。
*   **UI 与交互增强**：[#9809](https://github.com/AstrBotDevs/AstrBot/pull/9809) 引入了可移植的消息按钮（ActionRow/Button）组件，支持跨平台（QQ, Telegram, Lark 等）的交互回调，为构建富交互 Bot 奠定基础。

## 4. 社区热点
基于评论数、关注度及技术复杂度，以下 Issue 是今日的讨论焦点：

1.  **[Issue #10822](https://github.com/AstrBotDevs/AstrBot/issues/10822) - 前缀缓存断裂与图片 Base64 滞留**
    *   **热点原因**：该 Issue 深入剖析了 LLM 提供商（如 DeepSeek/OpenAI 兼容）的优化机制。用户发现由于“发送”与“存储”消息内容不对称，导致前缀缓存（Prefix Caching）在每条图片消息处断裂，且图片以 Base64 形式永久滞留会话历史，造成 Token 消耗剧增。
    *   **关联进展**：[#10837](https://github.com/AstrBotDevs/AstrBot/pull/10837) 试图通过持久化蒙太奇图片（Montage）而非原始 GIF/动画来修复此问题，平衡了缓存命中率与消息一致性。

2.  **[Issue #9217](https://github.com/AstrBotDevs/AstrBot/issues/9217) - Gemini API 工具调用签名丢失**
    *   **热点原因**：针对 Gemini 模型在使用工具调用（Tool Use）时的 P1 级 Bug。错误在于构造上一轮助手消息时丢弃了 `thought_signature`，导致后续请求报错 `Function call is missing a thought_signature`。这是多模态 LLM 集成中的典型痛点，影响所有使用 Gemini 且启用工具的插件。

3.  **[Issue #10833](https://github.com/AstrBotDevs/AstrBot/issues/10833) - 限流策略下的会话等待队列无界**
    *   **热点原因**：在群聊高并发场景下，`stall` 限流策略缺乏等待队列上限，导致旧消息在话题结束后仍被处理，造成“翻旧账”现象。该 Issue 引发了关于异步锁与限流策略设计的深度技术讨论。

4.  **[PR #10477](https://github.com/AstrBotDevs/AstrBot/pull/10477) - QQ 原生 Markdown 渲染裁剪修复**
    *   **热点原因**：QQ 原生 Markdown 渲染器在列表中裁剪显示数学公式（Display Math）的右边缘。此 PR 通过调整块级元素结构修复了视觉缺陷，反映了用户对富文本渲染质量的高要求。

## 5. Bug 与稳定性
今日报告的 Bug 主要集中在消息流转的一致性和 LLM 集成的细节上，按严重程度排列如下：

| 严重程度 | 问题描述 | 关联 Issue | 修复状态 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| **P1 (High)** | **工具调用后会话永久 400 错误**：工具返回图片后，下一轮请求因 user(图片) 消息被错误插入 tool_calls 与 tool 结果之间，导致 API 拒绝请求。 | [Issue #10819](https://github.com/AstrBotDevs/AstrBot/issues/10819) | **已关闭** | 标记为 `CLOSED`，推测已修复或用户侧配置问题。 |
| **P1 (High)** | **Gemini 工具调用签名丢失**：多模态工具调用导致后续轮次报错。 | [Issue #9217](https://github.com/AstrBotDevs/AstrBot/issues/9217) | **未修复** | 仍为 Open，需 LLM Provider 层修复。 |
| **P2 (Med)** | **图片消息导致前缀缓存失效**：Base64 图片滞留历史，破坏缓存命中。 | [Issue #10822](https://github.com/AstrBotDevs/AstrBot/issues/10822) | **修复中** | [PR #10837](https://github.com/AstrBotDevs/AstrBot/pull/10837) 已提交，待合并。 |
| **P2 (Med)** | **QQ 官方机器人引用消息解析错误**：无引用时误判为引用；引用图片被拍平为文本。 | [Issue #10840](https://github.com/AstrBotDevs/AstrBot/issues/10840) | **修复中** | [PR #10842](https://github.com/AstrBotDevs/AstrBot/pull/10842) 已提交。 |
| **P2 (Med)** | **QQ 官方机器人主动消息发送失败**：群聊中无 msg_id 时消息未发送，且 API 错误返回“成功”。 | [Issue #10839](https://github.com/AstrBotDevs/AstrBot/issues/10839) | **未修复** | 涉及底层协议同步问题。 |
| **P3 (Low)** | **限流队列无界导致过时消息处理**：高并发后 Bot 回复旧话题。 | [Issue #10833](https://github.com/AstrBotDevs/AstrBot/issues/10833) | **修复中** | [PR #10836](https://github.com/AstrBotDevs/AstrBot/pull/10836) 提出限制等待者并默认丢弃过时消息。 |

## 6. 功能请求与路线图信号
*   **可移植交互组件 (Portable UI)**：[PR #9809](https://github.com/AstrBotDevs/AstrBot/pull/9809) 引入了 `ActionRow` 和 `Button` 组件，信号表明 AstrBot 正从单纯的文本聊天机器人向**富交互应用平台**演进，未来版本可能强化插件端的 UI 开发标准。
*   **LLM 提供商扩展**：[PR #10841](https://github.com/AstrBotDevs/AstrBot/pull/10841) 添加 Runcrate 预设，[PR #9384](https://github.com/AstrBotDevs/AstrBot/pull/9384) 增加 Rerank 代理支持。路线图显示项目持续扩大 LLM/工具生态的兼容性，特别是针对 OpenAI 兼容接口的长尾提供商。
*   **MCP 生态稳定化**：[Issue #4664](https://github.com/AstrBotDevs/AstrBot/issues/4664) 和 [PR #10838](https://github.com/AstrBotDevs/AstrBot/pull/10838) 表明 MCP（Model Context Protocol）支持仍是重点，未来版本将更强调连接的鲁棒性和生命周期管理。
*   **沙箱与技能同步**：[PR #10829](https://github.com/AstrBotDevs/AstrBot/pull/10829) 和 [PR #10835](https://github.com/AstrBotDevs/AstrBot/pull/10835) 涉及 Computer Use (CUA) 沙箱镜像选择及技能同步范围，暗示 **Agent 执行环境（Sandbox）** 的精细化控制是近期开发方向。

## 7. 用户反馈摘要
*   **痛点 - QQ 官方机器人适配质量**：用户 [Momoi-Yukino](https://github.com/Momoi-Yukino) 和 [setsuna13482](https://github.com/setsuna13482) 反馈 QQ 官方 WebSocket 协议实现存在多处逻辑漏洞（引用误判、发送假成功），导致群聊场景下的核心功能不可用。
*   **痛点 - 长会话成本与稳定性**：用户 [fangfeng12345](https://github.com/fangfeng12345) 指出图片消息导致的前缀缓存失效和 Token 浪费问题，这是多模态 LLM 应用场景下的普遍痛点，用户希望框架层面能自动优化历史消息结构。
*   **痛点 - 插件热加载机制**：用户 [Lin100101](https://github.com/Lin100101) 在 [Issue #7421](https://github.com/AstrBotDevs/AstrBot/issues/7421) 中通过插件发布流程反馈，而 [PR #10831](https://github.com/AstrBotDevs/AstrBot/pull/10831) 专门修复了禁用插件重新启用后代码陈旧的问题，表明**开发调试体验**是用户关注的重点。
*   **满意点 - 快速响应机制**：多个 Bug（如 #10840, #10833, #10822）在提交后 24 小时内即有对应的 PR 提交，用户社区对维护者的响应速度表示认可。

## 8. 待处理积压
*   **[Issue #7421](https://github.com/AstrBotDevs/AstrBot/issues/7421) - 磁力链接解析插件**：虽标记为 CLOSED，但涉及插件发布流程（`plugin-publish`）的复杂性，且评论数高达 11 条，建议维护者关注插件生态的工具链完善，避免类似争议重现。
*   **[PR #10263 & #10292](https://github.com/AstrBotDevs/AstrBot/pull/10263)**：知识库检索的 Provider 解析修复已开放超过一个月（创建于 9 月底），属于**长期积压**的基础设施修复，建议优先合并以消除 RAG 系统的潜在故障点。
*   **[PR #9809](https://github.com/AstrBotDevs/AstrBot/pull/9809) - 可移植消息按钮**：这是一个较大的架构变更（Size:L），开放已近两个月，需维护者评估其对现有插件 API 的兼容性影响，尽快给出合并计划或拆分建议。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期**：2026-10-29

## 1. 今日速览
项目今日保持高度活跃状态，过去 24 小时内 GitHub Discussions 产生 180 条更新，社区互动热烈。发布通道（Releases）落地了两个关键版本：**v0.2.2-alpha.2**（重点功能迭代）和 **v0.2.1-rc.4**（稳定性修复），标志着 v0.2.x 系列向 RC 稳定版和 alpha 探索版双轨推进。功能方面，新加入多语言支持、高级插件生态（如 subagent_oar、开发者工具）及自动化任务管理；稳定性方面，重点修复了 ACP 模式下的诊断输出泄露及桌面端进程崩溃问题。社区热点集中在本地 LLM 超时配置、Windows 沙箱权限兼容性及特定模型兼容性 Bug。

## 2. 版本发布

### dsh-v0.2.2-alpha.2
**类型**：Alpha 测试版（功能预发布）
**主要更新**：
*   **多语言支持**：新增日语、西班牙语、法语、德语、俄语和巴西葡萄牙语文案与界面配置。
*   **插件系统增强**：
    *   插件管理页支持富文本详情，优化布局。
    *   支持第三方插件包热更新及失败回滚机制。
    *   新增实验性插件：`subagent_oar`（调用本地 Codex/Claude CLI）、个性化推荐、开发者工具-统计（查看上下文/缓存/耗时）、变更请求与工作树（Git 工作树集成）。
*   **交互与UI优化**：
    *   支持将聊天文本作为引用插入输入框。
    *   支持将会话复制为 Markdown（含原始日志路径）。
    *   优化移动端/平板输入体验（自动收起键盘、字体调整）。
    *   自动化任务页支持“清除全部已结束任务”。
    *   侧栏会话悬浮卡显示工作目录，搜索支持不区分大小写。
    *   图片上传即时化，单张上限提至 50 MiB。

**迁移/注意事项**：
*   由于是 Alpha 版本，实验性插件（如 `subagent_oar`）可能存在不稳定接口。
*   移动端布局有较大变动，建议测试窄屏场景下的交互回归。

### dsh-v0.2.1-rc.4
**类型**：RC 候选版（稳定预发布）
**主要修复**：
*   **关键 Bug 修复**：修复 ACP 模式下诊断输出混入 stdout 的问题（[Issue Link](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-rc.4)）。这是一个影响日志解析和自动化流程的关键修复。

## 3. 项目进展
*注：该仓库未启用 GitHub PR，代码合并通过 Releases 落地，以下 changelog 即合并摘要。*

**v0.2.2-alpha.2 合并了以下核心功能模块：**
1.  **多语言本地化框架**：由 @07akioni 主导，奠定了 UI 多语言扩展的基础，响应了社区长期呼声。
2.  **插件生态扩容**：引入了“开发者工具-统计”和“变更请求与工作树”插件，提升了 DSH 作为开发环境的工程化能力。@LegGasai 和 @tianyicui 重点参与了 Git 集成工作。
3.  **移动端体验重构**：@Stevring 和 @EricMoin 投入了大量资源解决触屏设备上的键盘遮挡、光标滚动和窄屏布局问题，显著提升了 DSH 在移动端的可用性。
4.  **任务管理自动化**：@Chinesezjc 实现了批量清除已结束任务功能，解决了长期运行 Agent 产生的任务列表冗余问题。

**v0.2.1-rc.4 合并了稳定性修复：**
1.  修复 ACP stdout 污染，确保自动化流水线中日志的纯净性。

## 4. 社区热点

今日 Discussions 中评论数最多的热点话题反映了用户的核心痛点：

1.  **本地 LLM 超时配置难题**
    *   **链接**：[#3157](https://github.com/deepseek-ai/deepseek-harness/discussions/3157)
    *   **分析**：用户 @Kununurra-Museum 反馈在 Windows 11 上使用 Ollama Gemma4:12b 时，长 Prompt 因默认 5 分钟超时失败。社区渴望提供易于配置的超时参数（如 settings.yaml 支持）。目前评论 21 条，热度最高。
2.  **账号封禁与申诉渠道缺失**
    *   **链接**：[#9453](https://github.com/deepseek-ai/deepseek-harness/discussions/9453)
    *   **分析**：用户 @AxorBisInfinitive 投诉 DeepSeek 账号连续被封且无有效申诉渠道。虽非 Harness 代码问题，但反映了上游 API 服务的稳定性焦虑，用户被迫在 Harness 社区求助。
3.  **Windows 沙箱权限兼容性 Bug**
    *   **链接**：[#7735](https://github.com/deepseek-ai/deepseek-harness/discussions/7735)
    *   **分析**：自 0.1.7 版本起，沙箱给工作区根目录盖 Low 完整性标签，导致 .bat/.exe 文件双击报错“无法验证发布者”。用户被迫开启 Full Access，存在安全隐患。
4.  **`subagent_codex` 模型兼容性问题**
    *   **链接**：[#9949](https://github.com/deepseek-ai/deepseek-harness/discussions/9949)
    *   **分析**：新发布的 `subagent_oar` 插件依赖的 Codex CLI 版本（0.153.4）较旧，无法支持更新版本的模型，导致调用失败。需维护者更新依赖或提供版本兼容策略。

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | 描述 | 状态/备注 |
| :--- | :--- | :--- |
| **高** | **Desktop 进程未捕获异常退出** ([#9904](https://github.com/deepseek-ai/deepseek-harness/discussions/9904)) | 运行 1-2 小时后，Host 进程因 `ECONNRESET` 崩溃，Web 服务不自恢复，UI 假活。需修复进程守护机制。 |
| **高** | **ACP 模式诊断输出泄露** | 已在 **v0.2.1-rc.4** 中修复。 |
| **中** | **MCP Client 会话状态丢失** ([#9740](https://github.com/deepseek-ai/deepseek-harness/discussions/9740)) | Stateful MCP Server 重启后，DSH 连接失效需重启应用。需实现自动重连/会话恢复。 |
| **中** | **Windows 路径转义错误** ([#11164](https://github.com/deepseek-ai/deepseek-harness/discussions/11164)) | Markdown 链接中的 Windows 反斜杠被 CommonMark 误解析，导致文件打开路径错误。 |
| **低** | **CoT 异常追加 "The final"** ([#11221](https://github.com/deepseek-ai/deepseek-harness/discussions/11221)) | 特定模型（0.2.1-rc.2）在思维链中不断追加 "The final"，浪费 Token。可能是 Prompt 模板或模型兼容性问题。 |

## 6. 功能请求与路线图信号

1.  **远程访问支持** ([#6436](https://github.com/deepseek-ai/deepseek-harness/discussions/6436))：用户请求开放固定 IP 的远程访问功能。鉴于安全复杂度，可能不在近期 v0.2.x 核心路线图中，但呼声较高。
2.  **Flatpak 打包** ([#8462](https://github.com/deepseek-ai/deepseek-harness/discussions/8462))：社区贡献者提供了 Linux Flatpak 打包方案。维护者可考虑将第三方打包指南纳入官方文档。
3.  **Subagent 工具完善**：基于 v0.2.2-alpha.2 新增的 `subagent_oar`，社区反馈 Codex CLI 版本过旧（[#9949](https://github.com/deepseek-ai/deepseek-harness/discussions/9949)）。路线图需包含更新 CLI 依赖及解决模型兼容性。
4.  **Agent Teams 修复** ([#7642](https://github.com/deepseek-ai/deepseek-harness/discussions/7642))：Web/Desktop 端 Agent Teams 未正确禁用 subagent，导致子代理失联。需在下个 RC 版本中修复插件预设逻辑。

## 7. 用户反馈摘要

*   **痛点**：
    *   **配置复杂度高**：用户难以通过 `settings.yaml` 调整本地 LLM 超时，希望有更直观的 UI 配置项。
    *   **稳定性波动**：桌面端进程崩溃、MCP 连接中断等问题影响长时间运行场景。
    *   **平台兼容性**：Windows 沙箱权限、路径转义问题频发。
*   **满意点**：
    *   **多语言支持**：v0.2.2 新增 6 种语言，极大提升了国际化用户体验。
    *   **插件生态**：新推出的“开发者工具-统计”和“变更请求”插件受到工程类用户欢迎。
    *   **移动端体验**：v0.2.2 对触屏交互的优化被明确提及为改善。

## 8. 待处理积压

*   **桌面端引导页设置保存失败** ([#8187](https://github.com/deepseek-ai/deepseek-harness/discussions/8187))：自 0.2.0-rc.1 起存在，导致用户无法完成初始化设置，严重阻碍新用户上手，需优先修复。
*   **Persona 预设 Schema 迁移** ([#7801](https://github.com/deepseek-ai/deepseek-harness/discussions/7801))：旧版预设因字段重命名（text -> prefix）而静默失效，缺乏迁移提示，易导致用户配置丢失。
*   **Windows 沙箱完整性标签问题** ([#7735](https://github.com/deepseek-ai/deepseek-harness/discussions/7735))：安全与可用性冲突，需架构级调整沙箱策略。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*