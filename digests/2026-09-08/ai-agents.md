# OpenClaw 生态日报 2026-09-08

> Issues: 440 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-08 15:06 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 — 2026-09-08

## 1. 今日速览
OpenClaw 今日活跃度处于高位，过去 24 小时共产生 440 条 Issue 更新与 500 条 PR 更新，显示社区对最新 v2026.9.3 版本的响应极为热烈。项目核心痛点集中在更新机制的稳定性（如 Windows Gateway 启动失败、managed upgrade 遗留状态）以及多 Agent 编排下的消息丢失与会话状态竞态条件。维护者团队正通过密集的 PR 合并（预计约 170 条已合并）快速响应，但 SQLite 锁竞争、Telegram/Slack 渠道的消息传递回归问题仍是当前稳定性的主要威胁。

## 2. 版本发布
**v2026.9.3 已发布**
*   **核心亮点**：引入了"安全更新"机制（Safer updates），支持在隔离的候选状态中预演核心和插件变更，确认无误后才激活；支持符合条件的 2026.9.2 迁移；并能恢复被遗弃的更新记录，同时不影响正在运行的匹配 Gateway。
*   **关联 Issue**：#136997
*   **相关 PR**：#138839, #141109, #141175, #1415...
*   **迁移注意**：虽然增强了安全性，但今日仍有用户报告 v2026.9.2 升级后出现的 `update_runs` 行无法终态化的问题 (#139714)，需关注此版本是否已完全覆盖该场景。

## 2. 项目进展
今日 PR 活动频繁，以下为重点推进项：

*   **修复新会话模型路由不一致**：PR #131805 修复了 WebChat 中新建会话显示默认模型但实际路由继承父会话模型的问题 (#86174)，提升了控制 UI 的一致性。
*   **代码模式 (Code Mode) 持久化与交付**：
    *   PR #119056 确保 Collector 启动在重启、替换或恢复后保持一致性。
    *   PR #119057 允许 Code Mode 单元格在不消耗额外 Turn 的情况下发送当前回复。
    *   PR #135969 确保 Code Mode 工具结果在回复前持久化，防止恢复或 Hook 篡改审计轨迹。
    *   PR #142151 为 Slack 的 Code Mode 交付写入添加了围栏，防止过时权限下的写入。
*   **内部上下文泄漏修复**：针对内部 context block (`<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>`) 泄露到 Telegram (#137927) 和 Slack (#123265) 可见文本的问题，相关修复已在讨论或合并路径中（如 PR #123265 涉及的序列化问题）。
*   **UI/UX 优化**：
    *   PR #142243 修复了 TUI 中长单词和地址换行时插入多余空格的问题。
    *   PR #142246 对齐了聊天附件与消息块的间距。
    *   PR #142105 修复了默认模型选择器打开时无法发现新模型的问题。
*   **基础设施与工具**：
    *   PR #142253 为 PDF 工具添加了本地 OCR 回退功能，支持无视觉模型的扫描版 PDF 处理。
    *   PR #141987 增强了 exec auto-reviewer，允许其拒绝或升级命令，而不仅仅是允许或询问。
    *   PR #142230 增加了诊断和修复 macOS Gateway 残留重启任务的功能。

## 4. 社区热点
以下 Issue 评论活跃，反映了用户最紧迫的关切：

*   **[Bug] Subagent 完成结果静默丢失** (#44925) - 26 条评论，💎 Diamond Lobster。多 Agent 编排中，子代理超时或完成宣告失败时，结果被静默丢弃且无重试，导致数据丢失。
*   **[Bug] v2026.8.1 上间歇性出现 "malformed JSON arguments"** (#135111) - 20 条评论，🐚 Platinum Hermit。回归问题，影响 claude-sonnet-5 等模型的工具调用解析。
*   **[Bug] AgentSelectionRequiredError 日志洪水** (#126360) - 16 条评论。显式多 Agent 所有权配置下，logbook 插件和 Control UI 因缺乏 agentId 导致大量错误日志。
*   **[Bug] Session transcript 投影在持续写入下发生活锁** (#115908) - 16 条评论，💎 Diamond Lobster。同步重建阻塞主线程，导致所有通道传输停滞。
*   **[Bug] OpenClaw 泄漏未回收的子进程** (#97616) - 15 条评论，🦐 Gold Shrimp。回归问题，hook/tool 子进程累积为僵尸进程，导致运行时性能下降。
*   **[Bug] 多 Agent 编排不稳定** (#43367) - 14 条评论。并发 agent 添加/配置冲突、会话锁失败及子工作分离。
*   **[Bug] SQLite 锁竞争导致 Gateway 事件循环停滞 ~33s** (#117262) - 9 条评论，内部 DEF-61。3 个并发写句柄导致严重性能瓶颈。
*   **[Bug] 2026.9.2 回归：Reply 操作无活跃的 tool authority snapshot** (#139847, #141252) - 多个相关 Issue。用户发送消息时遇到通用错误，fallback 链触发失败。

## 5. Bug 与稳定性
今日报告的 Bug 多集中于**回归问题**和**高优先级 (P1/P0)** 的稳定性缺陷：

| 严重等级 | 问题描述 | Issue # | 状态/PR |
| :--- | :--- | :--- | :--- |
| **P0** | Windows Gateway 在 2026.9.1 更新后无法启动，`--task-supervisor` 静默退出 | #137813 | Closed (可能已在 9.3 修复) |
| **P1** | Managed upgrade 留下 Gateway 离线，finalization 处于非终态 | #139485 | Open |
| **P1** | 2026.9.2 回归：Reply 运行失败，工具权限快照缺失 | #139847, #141252 | Open |
| **P1** | Telegram 可靠出站投递在重启后丢失，卡在 `send_attempt_started` | #126246 | Open |
| **P1** | `doctor --fix` 在 systemd --user 服务账户下因 EACCES 失败 | #140908 | Open |
| **P1** | 内部上下文块泄漏到 Telegram/Signal/Slack 可见消息中 | #137927, #101793, #123265 | Mixed |
| **P1** | 子代理完成结果静默丢失，无重试通知 | #44925 | Open |
| **P2** | 2026.9.2 中 llama.cpp EmbeddingGemma ubatch 回归为 512 | #139578 | Open |
| **P2** | Google Meet 语音中断，Circular-JSON 崩溃 | #140455 | Open |

**稳定性评估**：v2026.9.2 似乎引入了多个回归 (#139847, #139578, #141252)，主要集中在 Reply 处理、嵌入模型配置和 Google Meet 集成。v2026.9.3 的安全更新机制旨在缓解升级风险，但现有的 SQLite 锁竞争 (#117262) 和会话活锁 (#115908) 仍是底层架构隐患。

## 6. 功能请求与路线图信号
*   **Android Chat-First 界面** (#46058) - 用户正在构建独立的 Android fork，希望探索 upstreaming 可能性。
*   **Linux aarch64 官方构建** (#138279) - 请求提供 `.deb` 和 AppImage 格式，目前仅 amd64 官方支持，Windows 已有 ARM64。
*   **Per-Agent Bedrock 成本归因** (#60602) - 多 Agent 场景下缺乏基于请求元数据的成本分摊能力。
*   **MiniMax M3 视频输入支持** (#98084) - 参考分支已存在，请求原生视频管道支持。
*   **Owner-signed 责任门控** (#96675) - 请求可选的用户确认机制，防止助手内存、技能重用等持久化操作未经审查。
*   **生产力工具 Profile** (PR #112473) - 新增内置 `productivity` 工具 profile，涵盖工作区文件、研究、记忆查找等 bounded 操作。

## 7. 用户反馈摘要
*   **痛点**：
    *   **升级恐惧**：用户对 v2026.8.1 -> 9.x 的升级路径极度敏感，多次报告 `doctor --fix` 失效、Gateway 启动崩溃、配置文件迁移跳过等问题 (#133984, #137813, #139485)。
    *   **数据丢失**：子代理结果静默丢失 (#44925)、Telegram/WhatsApp 消息死信 (#125764, #49223) 引发严重信任危机。
    *   **上下文泄漏**：内部系统提示词泄露到用户可见消息 (#137927) 被视为安全/信任边界违规。
    *   **性能瓶颈**：SQLite 锁竞争导致 Gateway 事件循环停滞数十秒 (#117262)，严重影响多租户或高负载场景。
*   **满意点**：
    *   对 v2026.9.3 引入的"安全更新"和"预演变更"机制表示认可，认为这是解决升级不稳定性的关键一步。
    *   Code Mode 的持久化和跨重启一致性改进 (#119056, #135969) 受到开发者用户欢迎。

## 8. 待处理积压
*   **#117262** (SQLite 锁竞争) - P1, 💎 Diamond Lobster。长期存在的性能瓶颈，需架构级优化，目前无直接 Fix PR，仅有关联的 Doctor migration PR (#134062) 部分缓解。
*   **#115908** (Session transcript 活锁) - P1, 💎 Diamond Lobster。同步写入阻塞主线程，需重构投影逻辑以支持异步。
*   **#44925** (Subagent 结果丢失) - P1, 💎 Diamond Lobster。多 Agent 可靠性的基石问题，影响广泛。
*   **#136997** (原始需求) - v2026.9.3 的 SAfer updates 功能的源头，需验证其在复杂迁移场景下的实际表现。
*   **#126360** (AgentSelectionRequiredError 日志洪水) - P1。虽然不影响核心功能，但大量噪音日志掩盖了真正的问题，需尽快修复。

---

## 横向生态对比

基于 2026-09-08 各开源项目社区动态，以下是横向对比分析报告。

### 1. 生态全景
2026 年 9 月，个人 AI 助手开源生态呈现**“核心框架快速迭代、底层稳定性成为瓶颈、多平台适配焦虑”**的态势。OpenClaw 和 Hermes Agent 作为头部项目，正处于高频发版期，但均面临会话状态持久化、多 Agent 编排稳定性及跨平台（尤其是 Windows）兼容性的严峻挑战。Zeroclaw、PicoClaw 等项目则在细分领域（TUI、边缘设备）深耕，强调配置安全与评测体系的构建。整体而言，行业重心正从“功能堆叠”转向“可靠工程化”，特别是在缓存优化、异步架构和会话一致性方面。

### 2. 各项目活跃度对比

| 项目 | 今日 Issues/PR (估) | 版本发布 | 健康度评估 | 主要风险点 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | ~940 (高) | v2026.9.3 | **高活性/不稳定** | SQLite 锁竞争、多 Agent 结果丢失、升级回归 |
| **Hermes Agent** | ~891 (高) | v0.21.1 | **高活性/修复期** | Windows 驱动失效、Cron 死锁、Prompt Cache 断裂 |
| **QwenPaw** | ~74 (中高) | v2.2.1-beta.1 | **中等/快速响应** | 心跳反馈循环、上下文丢失、事件循环阻塞 |
| **Zeroclaw** | ~79 (中) | 无 | **中/夯实基础** | History Trimming 性能隐患、ACP 回合消失 |
| **PicoClaw** | ~9 (低) | 无 | **低/精准修复** | 配置并发安全、API Key 静默丢失 |
| **AstrBot** | ~24 (中) | v4.28.0 | **中/平稳** | 定时任务状态误报、插件配置隔离 |
| **DeepSeek Harness** | ~0 PR / 146 Disc | 无 | **低/社区驱动** | 会话迁移崩溃、Windows 构建失败、包管理混乱 |

### 3. OpenClaw 在生态中的定位
*   **市场地位**：**旗舰级通用框架**。OpenClaw 以最高的 Issue/PR 吞吐量和最复杂的特性集（多 Agent 编排、安全更新机制），确立了其作为企业级/开发者首选平台的地位。
*   **优势**：
    *   **工程严谨性**：v2026.9.3 引入的“安全更新”预演机制是生态中罕见的针对升级风险的专项治理，显示了其对生产环境稳定性的重视。
    *   **功能完备性**：在 Code Mode、多通道（Telegram/Slack/WhatsApp）集成及内部上下文管理上最为成熟。
*   **技术路线差异**：相较于 PicoClaw 的嵌入式轻量化和 AstrBot 的平台插件化，OpenClaw 走向**重型化与编排化**，强调 Agent 间的协作与状态一致性，但这也带来了 SQLite 锁竞争等底层架构压力。
*   **社区规模**：远超其他项目（Issue/PR 数量级为 10^2-10^3），拥有最密集的反馈闭环，但也承受最大的技术债务压力。

### 4. 共同关注的技术方向
| 技术方向 | 涉及项目 | 具体诉求/现象 |
| :--- | :--- | :--- |
| **会话状态与上下文一致性** | OpenClaw, Hermes Agent, QwenPaw, Zeroclaw | 普遍存在重启后上下文丢失、缓存断裂、子代理结果静默丢失的问题。用户渴望“断电续传”级别的可靠性。 |
| **跨平台兼容性 (Windows/Linux)** | Hermes Agent, DeepSeek Harness, OpenClaw | Windows 端频发崩溃（TUI 渲染、Gateway 启动、构建失败）。Linux/ARM64 支持是 PicoClaw 和 OpenClaw 的新增需求点。 |
| **异步架构与性能瓶颈** | OpenClaw, QwenPaw, Hermes Agent | SQLite 锁竞争、事件循环阻塞、同步调用导致的界面卡死是共同痛点，反映出现有异步框架在高并发下的适配不足。 |
| **多模型/Provider 灵活性** | OpenClaw, Zeroclaw, PicoClaw, AstrBot | 用户要求同一 Provider 复用多个模型、按会话覆盖模型、以及更细粒度的成本归因（Per-Agent Bedrock cost）。 |
| **Prompt Cache 优化** | Hermes Agent, Zeroclaw, OpenClaw | 关注缓存前缀断裂、历史裁剪导致的缓存失效，旨在降低推理成本并提升响应速度。 |

### 5. 差异化定位分析
*   **OpenClaw**：**全能型编排平台**。面向需要复杂多 Agent 协作、多渠道接入和高定制化的开发者/企业用户。架构重，扩展性强，但稳定性维护成本高。
*   **Hermes Agent**：**研究型/极客型助手**。由 NousResearch 主导，深度集成研究前沿能力（如本地推理 oMLX/MLX、Skills Hub），适合关注模型底层行为和个性化配置的进阶用户。
*   **QwenPaw**：**阿里系多模态桌面端**。依托通义千问生态，强项在于 GUI 体验、插件商店和 PDF/图像等多模态兼容性，适合普通桌面用户和中文场景。
*   **Zeroclaw**：**开发者友好的 CLI/TUI 工具**。强调评测体系（Eval Stack）、代码模式（ZeroCode）和私有化部署的安全性，适合关注数据隐私和可观测性的技术团队。
*   **PicoClaw**：**边缘/嵌入式场景**。由 Sipeed 推出，聚焦于资源受限设备或特定硬件（如手机 Spectator 模式），轻量级但需解决并发安全等基础问题。
*   **AstrBot**：**社交机器人插件平台**。深度绑定 QQ 等国内社交生态，插件化是其核心，适合需要快速接入社交媒体的 Bot 开发者。
*   **DeepSeek Harness**：**DeepSeek 官方/半官方网关**。聚焦于 DeepSeek 模型的接入优化和插件生态（如 Rewind, Schedule），目前处于早期磨合期，Windows 和迁移体验亟待改善。

### 6. 社区热度与成熟度
*   **快速迭代阶段（高活性/高 Bug 率）**：
    *   **OpenClaw, Hermes Agent**：日更频率高，新功能密集上线，但伴随大量 P0/P1 回归问题。处于“扩张伴随阵痛”期。
    *   **QwenPaw**：发布周期短，修复响应快，但新版本（v2.2.x）引入的兼容性回退还待消化。
*   **质量巩固阶段（中活性/基建完善）**：
    *   **Zeroclaw**：无新 Release，PR 集中在底层重构（Eval、缓存、Provider 抽象），属于典型的“修内功”阶段。
    *   **AstrBot**：版本跨度大（v4.x），今日主要做小修补和配置优化，社区活跃度适中，趋于稳定。
*   **早期成长阶段（低代码活性/高讨论活性）**：
    *   **DeepSeek Harness**：代码合并少，但 Discussions 极其活跃，表明用户参与度高但产品稳定性尚未定型，依赖社区插件填补功能空白。
    *   **PicoClaw**：项目体量小，今日修复集中在关键 Bug，处于早期精细化打磨期。

### 7. 值得关注的趋势信号
1.  **“安全更新”机制将成为标配信号**：OpenClaw v2026.9.3 的“预演变更”机制解决了用户最大的“升级恐惧”。未来主流 AI 助手框架或将效仿此模式，提供灰度发布或状态快照回滚能力。
2.  **多 Agent 编排的可靠性是下一个红海**：OpenClaw (#44925) 和 Hermes Agent 均暴露了子代理结果丢失的问题。谁能解决分布式 Agent 间的状态一致性和失败重试，谁就能在企业级市场占据优势。
3.  **本地化与边缘部署需求上升**：PicoClaw 的嵌入式定位、Hermes 的本地推理支持、以及用户对 ARM64 构建的需求，反映了去云化和本地隐私计算的趋势。
4.  **Windows 原生支持仍是薄弱环节**：DeepSeek Harness 和 Hermes Agent 在 Windows 端的崩溃和构建问题提示开发者：跨平台一致性（Cross-platform Consistency）是比 Mac/Linux 优先级的更低层需求，但却是大众用户普及的关键门槛。
5.  **Prompt Cache 经济性成为核心竞争力**：Hermes 和 Zeroclaw 对 Prompt Cache 断裂的集中修复，表明在 API 成本敏感背景下，**“缓存友好型”的架构设计**（如避免不必要的上下文截断、保持输入稳定性）将成为产品的重要卖点。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**日期：** 2026-09-08  
**分析对象：** [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## 1. 今日速览
今日 Zeroclaw 项目处于**高活跃调试阶段**，过去 24 小时内产生了 29 条 Issue 更新和 50 条 PR 活动，但无新 Release 发布，表明团队正集中于修复 v0.8.x 系列的稳定性问题。开发重心明显偏向 **ZeroCode TUI** 和 **运行时核心（Runtime）**，特别是历史裁剪、缓存策略及多会话管理逻辑。社区贡献活跃，但内部 Bug 修复占主导，尚无重大功能合并，项目整体在“夯实基础”而非“快速扩张”。

---

## 2. 版本发布
**无新版本发布。**

*注：近期 Issues 提及当前版本为 `v0.8.5`，多个 Bug 报告均基于此版本或最新集成头部（如 `fd6f3ae8`）。*

---

## 3. 项目进展
今日所有 50 条 PR 更新均为**待合并状态（Open）**，无已合并 PR。主要进展集中在以下领域：

*   **评测体系完善（Eval Stack）：** @IftekharUddin 推动了一系列关键 PR（#9220, #9221, #9222, #9244, #9245, #9248），引入了可比较的运行收据、Git 版本基准文件、LLM 判决器校准工具以及隔离内存测试支持。这些 PR 旨在构建一个可审计、可回归测试的开源评测框架。
*   **Provider 灵活性增强：** PR #9809 允许单个 Provider Profile 托管多个 Model，极大提升了配置灵活性（如 Azure/OpenAI 多模型复用）。
*   **安全性与工具约束：** PR #10337 修复了 Git 操作的允许根目录绕过漏洞；PR #10210 为浏览器子进程添加了超时和强制终止机制，防止僵尸进程。
*   **Signal 通道改进：** PR #9326 正确处理了 Signal "Note to Self" 同步消息，填补了自发消息被丢弃的逻辑缺口。

**整体评价：** 项目正在通过大量底层重构和安全性修复来稳定架构，虽然前端功能合并较少，但后端健壮性显著提升。

---

## 4. 社区热点
以下 Issue 因涉及核心体验痛点或重大功能缺失，获得了较高关注度（尽管当前点赞数为 0，但评论和标签显示其重要性）：

*   **[Bug] ACP Turn 消失问题 (#9333)**  
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/9333  
    *   **热度分析:** 严重级别 S1（工作流阻塞）。用户反馈在 Telegram/ACP 中切换会话后，已出现的工具调用结果会消失。这是多会话场景下的核心稳定性问题，直接影响生产环境可用性。
*   **[RFC] PR 审查证据清晰度 (#10366)**  
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/10366  
    *   **热度分析:** 旨在优化贡献者流程，提出“快速合并通道”，反映社区希望提高 PR 审查效率和透明度的诉求。
*   **[Feature] ZeroCode 侧边栏多 Agent 监控 (#9727)**  
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/9727  
    *   **热度分析:** 高级用户痛点，当前 ZeroCode 仅支持单会话，多 Agent 并行运行缺乏可视化管理，是 TUI 体验升级的关键需求。
*   **[Bug] WhatsApp 语音笔记无法转录 (#10688)**  
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/10688  
    *   **热度分析:** 严重级别 S2。配置正确但功能完全失效，涉及渠道与编排器的对接缺陷。

---

## 5. Bug 与稳定性
今日报告了大量 P1/P2 级 Bug，主要集中在 **History Trimming（历史裁剪）**、**Caching（缓存）** 和 **TUI 渲染** 三大块：

| 严重度 | Issue ID | 标题/摘要 | 状态 | 关联 Fix PR? |
| :--- | :--- | :--- | :--- | :--- |
| **S1** | #10693 | ZeroCode 在 Connected 状态下静默忽略 Enter 提交 | Open | 否 |
| **S1** | #9333 | ACP 回合在会话切换后消失 | Open | 否 |
| **S2** | #10688 | WhatsApp Web 语音笔记永不被转录 | Closed | 是 (已修复) |
| **S2** | #10697 | ZeroCode ACP 转录本丢弃工具调用前的助手文本 | Open | 否 |
| **S2** | #10667 | ZeroCode 可能重复渲染已完成的流式响应 | Open | 否 |
| **S2** | #10694 | PowerShell Shell 测试在 Windows 上间歇性超时 | Open | 否 |
| **S3** | #10690 | 集成页面 "Configure" 链接 Slug 化错误 (Z.AI -> z-ai) | Open | 否 |
| **S3** | #10326 | Reliable 流式错误报告请求模型而非实际服务模型 | Closed | 是 (已修复) |

**关键风险点：**
*   **History Trimming 连锁反应 (#10674, #10702):** 发现历史裁剪逻辑存在“滞回间隙”，导致工具密集型会话频繁重新裁剪，破坏 Prompt 缓存效率。这不仅是 Bug，更是性能隐患。
*   **Token Budget 与 Cache Miss (#10701):** 图片附件消息会无效化整个历史缓存前缀，建议关注后续优化方案。

---

## 6. 功能请求与路线图信号
多个 Feature Request 指向 **OpenAI Astra/Responses API** 的深度集成支持：

*   **#10708:** 支持 OpenAI Responses WebSocket 上的主动响应引导（Active-response steering）。
*   **#10707:** 支持通过 OpenAI Responses 进行有界的程序化工具调用。
*   **#10706:** 跨调用路径保留不透明的推理状态（Reasoning State）。
*   **#10705:** 支持兼容 OpenAI 模型的 `max` 推理努力级别。
*   **#10704:** 支持异步函数工具（允许模型在处理工具时继续独立工作）。

**路线图文信号：**
*   **多 Provider 配置简化：** #10709 请求补充 Astra API Key 和 Codex Subscription 的文档，表明官方正在完善不同订阅模式的支持。
*   **Keenable 搜索集成：** PR #10679 添加 Keenable 作为 Web Search Provider，扩展了搜索能力。
*   **Cost 追踪精细化：** #10700 指出成本记录使用 Daemon 生命周期 ID 而非会话 ID，导致无法按对话分离支出，这是财务可观测性的重要改进点。

---

## 7. 用户反馈摘要
*   **痛点：**
    *   “ZeroCode 在显示 Connected 时不回车提交，必须重试，非常打断心流。” (#10693)
    *   “WhatsApp 语音笔记下载后直接丢弃，没有任何转录尝试，配置了 transcription provider 也没用。” (#10688)
    *   “切换会话回来，刚才跑了一堆工具的 ACP 回合没了，以为数据丢失。” (#9333)
    *   “成本报表里所有会话共用一个 session_id，完全无法计算单次对话花了多少钱。” (#10700)
*   **满意/中性：**
    *   用户认可多模型 Provider 配置的需求（#9809），希望一个账号能复用多个模型。
    *   评测系统（Eval）的模块化设计受到区分贡献者关注，认为这是项目专业化的标志。

---

## 8. 待处理积压
以下 Issue 创建时间较长或涉及基础架构，需维护者重点关注：

1.  **#5514 [Bug] Telegram 媒体组批量处理** (Created: 2026-04-08)  
    *   **问题:** 发送多张图片时，Gateway 将每张图视为独立请求，导致 Agent 输出多条消息而非合并的多模态响应。  
    *   **建议:** 虽为 P2，但影响 Telegram 用户体验，且已开放近 5 个月，建议排期优化 Batch 逻辑。
2.  **#9727 [Feature] ZeroCode 多 Agent 侧边栏** (Created: 2026-08-04)  
    *   **问题:** 缺乏并行 Agent 监控能力。  
    *   **建议:** 与 #10695 (跨客户端会话刷新) 存在依赖关系，建议统筹规划 ZeroCode 的多会话架构重构。
3.  **#8966 [PR] Provider 身份与上下文窗口解析** (Created: 2026-07-11)  
    *   **问题:** Context Meter 计算基准错误，使用 Trim Budget 而非实际 Context Window。  
    *   **建议:** 这是一个 XL 规模的修复 PR，涉及 Gateway/Provider/Runtime 多处，需优先 Review 以避免 UI 误导用户。

---
*报告生成时间：2026-09-08 | 数据来源：GitHub API*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-09-08**

## 1. 今日速览
今日 PicoClaw 社区活跃度较高，聚焦于配置安全与 Provider 扩展。过去 24 小时内新增 2 个 Bug Issue 和 7 个 Pull Request，所有 PR 均处于待合并状态，无版本发布。值得注意的是，由核心贡献者 `@sting8k` 提出的两个并发安全和配置丢失 Bug 已迅速有对应的修复 PR 跟进（#3375），显示出良好的维护响应速度。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日有 7 个 PR 进入 Review 阶段，主要涵盖以下改进方向：

*   **安全性修复**：
    *   **#3375** ([链接](https://github.com/sipeed/picoclaw/pull/3375))：修复了 `Config.sensitiveCache` 在懒加载时的数据竞争问题，确保 `sync.Once` 能正确保护初始化过程。
*   **新功能扩展**：
    *   **#3371** ([链接](https://github.com/sipeed/picoclaw/pull/3371))：新增 `opencode-go` Provider，支持通过 `x-opencode-session` 头发送会话信息，路由到 `https://opencode.ai/zen/go/v1`。
    *   **#3370** ([链接](https://github.com/sipeed/picoclaw/pull/3370))：新增 `Keenable` 作为 `web_search` 工具提供商，支持无需 API Key 的公共端点搜索。
    *   **#3344** ([链接](https://github.com/sipeed/picoclaw/pull/3344))：添加 `Build Remote Agent` 配对适配器，支持通过 `gbr/1` 协议让手机 spectator 桌面 Agent。
*   **稳定性与体验优化**：
    *   **#3372** ([链接](https://github.com/sipeed/picoclaw/pull/3372))：修复 `reaction` 工具配置无效的问题，增加了独立的配置分支。
    *   **#3354** ([链接](https://github.com/sipeed/picoclaw/pull/3354))：支持 IRCv3 `draft/multiline` 接收，将多行消息合并为一条 cohesive 消息。
    *   **#3353** ([链接](https://github.com/sipeed/picoclaw/pull/3353))：限制 Tool 反馈动画时长（5分钟）及失败重试次数，防止消息无限编辑。

## 4. 社区热点
*   **Issue #3373** ([链接](https://github.com/sipeed/picoclaw/issues/3373)) & **Issue #3374** ([链接](https://github.com/sipeed/picoclaw/issues/3374))：均由 `@sting8k` 报告。
    *   **热点分析**：这两个 Issue 涉及配置管理的底层逻辑（数据丢失和并发安全），虽然当前评论数为 0，但因其直接影响生产环境的稳定性（静默数据丢失和 Panic），极易引起其他用户注意。目前已迅速催生对应 PR (#3372, #3375)，建议维护者优先评审。

## 5. Bug 与稳定性
今日报告 2 个严重 Bug，均已关联修复 PR：

| Issue | 描述 | 严重程度 | 状态 | 关联 PR |
| :--- | :--- | :--- | :--- | :--- |
| [#3374](https://github.com/sipeed/picoclaw/issues/3374) | `Config.initSensitiveCache` 数据竞争导致 `FilterSensitiveData` Panic | **高** (崩溃风险) | 待合并 | [#3375](https://github.com/sipeed/picoclaw/pull/3375) |
| [#3373](https://github.com/sipeed/picoclaw/issues/3373) | `SaveConfig` 静默删除多 `api_key` 并留下悬挂 `fallback` 引用 | **高** (数据丢失) | 待合并 | - (需关注是否已包含在 #3372 或其他 PR 中，或需单独修复) |

*注：Issue #3373 对应的具体修复 PR 在提供的列表未明确标注，需确认 #3372 是否涵盖此逻辑或需单独提交。*

## 6. 功能请求与路线图信号
*   **多 Provider 支持**：`opencode-go` (#3371) 和 `Keenable` (#3370) 的加入表明项目正积极扩展模型提供方和搜索工具源，以提升兼容性和用户选择。
*   **远程协作/伴游**：#3344 提出的手机配对 spectate 功能，暗示项目正在探索 Agent 的远程可视化与监控场景。
*   **协议增强**：IRCv3 多行消息支持 (#3354) 表明对即时通讯协议的完善是当前的重点任务之一。

## 7. 用户反馈摘要
*   **痛点**：用户对配置文件的持久化安全性（API Key 丢失）和并发下的稳定性（Panic）有强烈诉求，特别是 `LoadConfig` -> `SaveConfig` 过程中的数据完整性。
*   **需求**：需要更多开箱即用的第三方服务集成（如 Keenable 搜索、Opencode 提供商），减少手动配置复杂度。

## 8. 待处理积压
*   **PR #3344** ([链接](https://github.com/sipeed/picoclaw/pull/3344))：标记为 `[stale]`，最后更新于 2026-09-07。涉及远程配对功能，建议确认状态后决定是否关闭或重新激活。
*   **PR #3353** ([链接](https://github.com/sipeed/picoclaw/pull/3353)) & **PR #3354** ([链接](https://github.com/sipeed/picoclaw/pull/3354))：均标记为 `[stale]`，最后更新于 2026-09-07。涉及 IRC 和渠道动画优化，若维护者有意合并需重新 Trigger 审查。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 (2026-09-08)

**数据来源**: agentscope-ai/QwenPaw GitHub
**分析周期**: 2026-09-07 00:00 - 2026-09-08 23:59 UTC+8

---

## 1. 今日速览

QwenPaw 在 v2.2.1-beta.1 发布次日保持高活跃度，过去 24 小时共产生 **74 条**代码交互（32 Issues + 42 PRs），其中 Issue 关闭率 50%，PR 合并/关闭率 57%，显示维护团队响应迅速。今日核心焦点集中在**多模态兼容性修复**（PDF 处理）、**MCP 协议兼容**以及**Gemini 后台任务完成逻辑**的纠偏。社区对 v2.2.0 引入的 UI 回归（弹窗遮罩）和本地运行时静默回滚问题反馈强烈，需优先关注。

---

## 2. 版本发布

### v2.2.1-beta.1
**链接**: https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.1

**更新内容**:
*   **feat**: 新增 Agent 模型路由设置 (`agent model routing settings`)，增强多模型调度灵活性 [PR #7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)。
*   **docs**: 网站文档更新至 v2.2.0 版本说明 [PR #7517](https://github.com/agentscope-ai/QwenPaw/pull/7517)。
*   **fix(chat)**: 修复流式输出期间已解决会话状态同步问题 [PR #75xx](https://github.com/agentscope-ai/QwenPaw/pull/75xx) (注：摘要提及作者 @zhaozh，具体 PR 号需根据实际发布页确认，通常关联近期 chat 修复)。

**迁移注意**: 此为 Beta 版本，建议在生产环境使用前进行完整测试，特别是模型路由配置部分。

---

## 3. 项目进展

今日合并/关闭的高价值 PR 主要集中在修复关键稳定性问题和提升用户体验：

*   **PDF 多模态兼容性修复**:
    *   [#7621](https://github.com/agentscope-ai/QwenPaw/pull/7621) & [#7636](https://github.com/agentscope-ai/QwenPaw/pull/7636): 修复了当会话历史中包含 PDF `DataBlock` 时，向仅支持文本的 OpenAI 兼容端点（如 Zhipu GLM、vLLM 自托管等）发送请求导致 400 错误的严重 Bug。新增逻辑在所有 Chat Completions 请求前剥离 PDF 块，无论模型是否声明多模态支持。
*   **MCP 协议兼容性与认证**:
    *   [#7627](https://github.com/agentscope-ai/QwenPaw/pull/7627): 修复了部分仅支持旧版协议的 MCP 端点在 v2.2.0 下因 HTTP 401 误判为需要 OAuth 而失败的问题，恢复了对静态 `Authorization` 令牌的支持。
    *   [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) (Closed): 关联修复了 Tool 返回图片/PDF 二进制数据时因格式问题导致的 400 错误。
*   **GUI 与交互优化**:
    *   [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610): 修复了聊天提交绕过消息队列的问题，确保任务运行中发送的消息按序入队，防止竞态条件。
    *   [#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605): 改进插件商店体验，支持批量更新、保留浏览上下文，并增加更新通知机制（响应 Issue #7582）。
    *   [#7598](https://github.com/agentscope-ai/QwenPaw/pull/7598): 修复 Windows 下 Shell 工具子进程继承控制台 stdin 导致界面卡死的问题。
*   **内部构建与 CLI**:
    *   [#7631](https://github.com/agentscope-ai/QwenPaw/pull/7631): 修复了在 Hub 本地沙箱中执行内置 CLI 命令（如 `qwenpaw agents list`）时因缺少认证令牌而返回 401 的问题。

**整体进展**: 项目正快速迭代修复 v2.2.0 发布后的关键回归，并强化边缘场景（多模态、MCP、Windows 控制台）的健壮性。

---

## 4. 社区热点

以下 Issues 评论活跃，反映用户核心关切：

*   **模型回复从上下文中意外丢失**: [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) (8 评论, OPEN)
    *   *摘要*: 用户报告助手回复已持久化，但后续请求中模型"看不到自己刚说的话"，导致空响应。涉及 QwenPaw 2.2.0 后端与 agentscope 2.0.x 的交互问题。
    *   *诉求*: 排查会话状态同步或上下文构建逻辑的 Bug。
*   **同步调用阻塞事件循环**: [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) (5 评论, OPEN)
    *   *摘要*: Windows 上 QwenPaw Desktop 2.1.1b1 启动和发送消息时出现长达 118-135 秒的无响应，疑似同步调用阻塞了异步事件循环。
    *   *诉求*: 性能优化和异步架构合规性修复。
*   **RetryChatModel 硬编码上下文大小**: [#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576) (5 评论, OPEN)
    *   *摘要*: `RetryChatModel` 硬编码 32768 token 的 fallback context_size，导致超过此限制的模型（如 31130 tokens）报错 CONTEXT_UNFIT。
    *   *诉求*: 移除硬编码，动态获取模型实际上下文窗口。
*   **心跳 Cron 会话反馈循环**: [#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) (4 评论, OPEN)
    *   *摘要*: 高严重度 Bug，心跳 cron 作业导致重复消息堆积，Agent 无响应约 2 小时。
    *   *诉求*: 修复定时任务执行逻辑，防止消息队列积压和死锁。
*   **UI 弹窗背景透明**: [#7622](https://github.com/agentscope-ai/QwenPaw/issues/7622) (3 评论, OPEN)
    *   *摘要*: v2.2.0 升级后，后台设置页面的交互弹窗缺失背景遮罩层，影响视觉和交互。
    *   *诉求*: CSS/样式回归修复。

---

## 5. Bug 与稳定性

按严重程度排列：

1.  **[高] 心跳 Cron 会话反馈循环**: [#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) - Agent 无响应，消息堆积。*状态: Open*
2.  **[高] 模型回复从上下文丢失**: [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) - 核心对话功能异常。*状态: Open*
3.  **[高] Gemini 后台工具完成后 400 错误**: [#7625](https://github.com/agentscope-ai/QwenPaw/issues/7625) - 特定模型集成失败。*状态: Open, 已有关联 Fix PR [#7629](https://github.com/agentscope-ai/QwenPaw/pull/7629)*
4.  **[中] 同步调用阻塞事件循环**: [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) - 性能/稳定性问题，导致界面卡死。*状态: Open*
5.  **[中] ReMe 后台嵌入作业失败**: [#7469](https://github.com/agentscope-ai/QwenPaw/issues/7469) - 长期记忆功能异常。*状态: Closed (推测已修复)*
6.  **[中] PDF DataBlock 破坏纯文本模型会话**: [#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617) & [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) - 多模态兼容性 Bug。*状态: Closed, 已有 Fix PR [#7621](https://github.com/agentscope-ai/QwenPaw/pull/7621) 和 [#7636](https://github.com/agentscope-ai/QwenPaw/pull/7636)*
7.  **[中] llama.cpp 运行时被静默回滚**: [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) - 版本管理逻辑缺陷。*状态: Open*
8.  **[低] UI 弹窗背景透明**: [#7622](https://github.com/agentscope-ai/QwenPaw/issues/7622) - 样式回归。*状态: Open*
9.  **[低] 未知斜杠命令无反馈**: [#7479](https://github.com/agentscope-ai/QwenPaw/issues/7479) - 用户体验问题。*状态: Open, 已有 Fix PR [#7632](https://github.com/agentscope-ai/QwenPaw/pull/7632)*

---

## 6. 功能请求与路线图信号

*   **OpenViking 长期记忆后端**: [#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613) (Open, Under Review) - 新增可选的长期记忆后端，扩展 ReMe 生态。
*   **每会话模型覆盖**: [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) (Open, First-time contributor) - 允许同一 Agent 在不同会话中使用不同 LLM，增强灵活性。
*   **Skill 版本暴露与依赖验证**: [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) (Open) - 提升 Skill 市场的可维护性和安全性。
*   **ReMeLightMemoryCard Reranker UI 配置**: [#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399) (Open, Under Review) - 为重排序器提供可视化配置面板。
*   **上下文压缩预算感知改进**: [#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) (Open) - 建议基于完整请求而非仅当前可见上下文进行压缩，并增加安全溢出处理。
*   **社区联动功能**: [#7583](https://github.com/agentscope-ai/QwenPaw/issues/7583) (Open) - 用户希望集成 AgentScope 社区登录、信箱和快速反馈功能。

**预测**: 上述 PRs 中，#7613 (OpenViking), #5992 (会话模型覆盖), #7609 (Skill 验证) 可能纳入未来版本。#7628 的功能改进与近日 #7521 (折叠思考过程) 一脉相承，暗示上下文管理将持续优化。

---

## 7. 用户反馈摘要

*   **痛点**:
    *   **上下文管理故障**: 多个 Issue (#7579, #7576) 反映用户对模型上下文丢失、硬编码限制导致错误的不满，这是影响核心体验的关键。
    *   **稳定性问题**: 事件循环阻塞 (#7363)、心跳反馈循环 (#7589) 导致应用无响应，严重影响可用性。
    *   **兼容性回归**: v2.2.0 在 MCP 认证 (#7620/#7627)、PDF 处理 (#7597/#7617)、Shell 工具 stdin (#7554/#7598) 等方面引入兼容性问题，用户需手动规避或等待修复。
    *   **UI/UX 退化**: 弹窗遮罩丢失 (#7622)、插件管理操作繁琐 (#7582) 降低使用效率。
    *   **环境限制**: CPU 检测在虚拟机/云桌面误判 (#7630)，限制部署场景。
*   **满意点**:
    *   快速响应和修复: 对于 PDF 兼容性、MCP 旧协议、插件管理等问题，开发团队在 Issue 报告后短时间内提供了 Fix PR 或已合并修复。
    *   功能扩展: 新增模型路由、OpenViking 记忆后端等 PR 显示项目在持续增强能力。

---

## 8. 待处理积压

*   **#7363 [OPEN] 同步调用阻塞事件循环**: 长期存在的性能瓶颈，影响 Windows 用户组。需架构层面审查。
*   **#7579 [OPEN] 模型回复从上下文意外丢失**: 核心 Bug，尚未明确根因，影响多个用户。
*   **#7589 [OPEN] 心跳 Cron 会话反馈循环**: 高严重度稳定性问题，需紧急排查。
*   **#7633 [OPEN] llama.cpp 运行时静默回滚**: 版本管理逻辑缺陷，可能导致用户升级丢失。
*   **#7622 [OPEN] UI 弹窗背景透明**: 视觉回归，影响后台管理体验。
*   **#7625 [OPEN] Gemini 后台工具完成 400 错误**: 虽有关联 PR #7629，但 Issue 本身仍 Open，需确认修复已充分覆盖。
*   **#5992 [OPEN] 每会话模型覆盖**: 有价值的功能请求，处于 Review 阶段。

**建议维护者**: 优先处理 #7579, #7589, #7363 等影响核心稳定性和用户体验的 Open Issues。同时跟踪 #7625 的 Fix PR 合并状态。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：** 2026-09-08  
**数据周期：** 过去24小时

---

## 1. 今日速览

Hermes Agent 在过去24小时内保持了极高的社区活跃度，共处理 **391 条 Issues** 和 **500 条 PR** 更新，显示出项目处于快速迭代期。新版本 **v0.21.1 (v2026.9.7)** 作为补丁版本发布，主要修复了已知问题并稳定了主分支状态。

**核心亮点：** 社区重点关注会话状态持久化、提示词缓存优化以及多平台兼容性修复（特别是 Windows 和 macOS）。多项 P0/P1 级 Bug 已获得修复或正在处理中，项目整体健康度良好，但积压问题仍需谨慎对待。

---

## 2. 版本发布

### 📦 v0.21.1 (v2026.9.7)
- **发布日期：** 2026年9月7日
- **性质：** Patch release（补丁版本）
- **内容：** 此版本汇总了自 v0.21.0 以来的主分支更改，适用于标记化部署和下游消费者。
- **破坏性变更：** 无
- **迁移注意事项：** 建议所有用户升级以获取最新稳定性和修复。

---

## 3. 项目进展

### 已合并的重要 PR（今日/近期）

| PR | 作者 | 描述 | 关联 Issue |
|---|---|---|---|
| [#103721](https://github.com/NousResearch/hermes-agent/pull/103721) | @salch-cred | 为预持久化用户轮次修复行地址 api_content 回填，解决上下文丢失问题 | #102194 |
| [#103565](https://github.com/NousResearch/hermes-agent/pull/103565) | @itsflownium | 按精确行身份持久化预刷新用户上下文，确保重启后能重放确切发送的内容 | #102194 |
| [#102411](https://github.com/NousResearch/hermes-agent/pull/102411) | @JoaoMarcos44 | 修复持久化 CLI 会话中 API 调用丢失 provider prompt cache 的问题 | #102194 |
| [#105211](https://github.com/NousResearch/hermes-agent/pull/105211) | @albert748 | 修复主线程冷启动恢复时的 prompt cache 前缀断裂问题 | #103579 |
| [#103566](https://github.com/NousResearch/hermes-agent/pull/103566) | @itsflownium | 在内存重载期间保留 prompt 前缀，防止 compaction 重建导致缓存失效 | #103326 |
| [#103331](https://github.com/NousResearch/hermes-agent/pull/103331) | @w12391 | 将内置 MEMORY 块固定到 volatile band 末尾，减少 compaction 时的缓存损失 | #103326 |

**项目推进评估：** 本轮合并聚焦于**会话状态持久化**和**提示词缓存优化**两大核心领域，显著提升了长时间运行会话的稳定性，降低了因重启或 compaction 导致的性能回退。

---

## 4. 社区热点

### 最活跃 Issues（按评论数排序）

#### 🔥 #66616 [OPEN] Skills index is stale or degraded (degraded)
- **作者：** @nousbot-eng
- **评论数：** 178
- **状态：** 已降级
- **摘要：** 自动化新鲜度探针失败，Skills 索引超过26小时未更新（当前29.8小时）。涉及 `/docs/skills` 依赖的 unified index 重建流程。
- **链接：** [Issue #66616](https://github.com/NousResearch/hermes-agent/issues/66616)
- **诉求分析：** 用户对 Skills Hub 的实时性有高期待，索引过期直接影响技能发现和文档准确性，需关注 cron 工作流稳定性。

#### 🔥 #88584 [OPEN] Automated Nous integration is blocked
- **作者：** @echokos
- **评论数：** 77
- **状态：** 阻塞
- **摘要：** 计划的 Nous-to-Enterkey 合并存在冲突，位于 `cron/jobs.py`。
- **链接：** [Issue #88584](https://github.com/NousResearch/hermes-agent/issues/88584)
- **诉求分析：** 自动化集成流程受阻，可能影响持续交付管道。

#### 🔥 #97681 [OPEN] Bot Group Chats should keep working after Desktop closes
- **作者：** @dokterdok
- **评论数：** 27
- **状态：** 功能请求
- **摘要：** 请求支持跨设备会话连续性，Bot 可独立运行在不同设备（笔记本、VPS），Group Chat 可远程接入。
- **链接：** [Issue #97681](https://github.com/NousResearch/hermes-agent/issues/97681)
- **诉求分析：** 用户希望实现真正的分布式 Bot 协作，脱离单一桌面设备限制。

#### 🔥 #87093 [CLOSED] Debian installation broken; uv.lock & npm install failed
- **作者：** @thelightning87
- **评论数：** 25
- **点赞：** 4
- **状态：** 已关闭
- **摘要：** Debian 13.6 基础安装失败，仅额外安装了 Yum。
- **链接：** [Issue #87093](https://github.com/NousResearch/hermes-agent/issues/87093)
- **诉求分析：** 安装脚本在 Linux 发行版间的兼容性仍需加强。

### 高关注度 PR

#### PR #101462 [OPEN] fix(agent): show recovery steps after rate limits exhaust retries
- **作者：** @fangliquanflq
- **描述：** 当 provider 速率限制耗尽重试次数后，用户将收到恢复步骤而非仅显示 HTTP 429 错误，区分免费/付费模型并提供 actionable 建议。
- **链接：** [PR #101462](https://github.com/NousResearch/hermes-agent/pull/101462)

#### PR #105805 [OPEN] fix(sessions): prevent fresh state.db corruption during FTS setup
- **作者：** @fangliquanflq
- **描述：** 防止 FTS 初始化过程中因竞争条件导致 state.db 损坏。
- **链接：** [PR #105805](https://github.com/NousResearch/hermes-agent/pull/105805)

---

## 5. Bug 与稳定性

### P0 级 Bug

| Issue | 描述 | 状态 | Fix PR |
|---|---|---|---|
| [#87093](https://github.com/NousResearch/hermes-agent/issues/87093) | Debian 安装脚本失败，uv.lock 和 npm install 错误 | ✅ 已关闭 | - |
| [#104596](https://github.com/NousResearch/hermes-agent/issues/104596) | state.db WAL split-brain 导致数据库损坏（单进程内发生） | ✅ 已关闭 | 相关 |

### P1 级 Bug

| Issue | 描述 | 状态 | Fix PR |
|---|---|---|---|
| [#53004](https://github.com/NousResearch/hermes-agent/issues/53004) | Projects paradigm 破坏 folder → session → sidebar 工作流 | ⏳ 开放 | 待确认 |
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) | `--initial-status blocked` 任务1秒内自动升级为 ready，绕过人工审批 | ⏳ 开放 | 待确认 |
| [#90663](https://github.com/NousResearch/hermes-agent/issues/90663) | TUI Ink 在 Ghostty (macOS) 中小写化 Shift+字母输入 | ✅ 已关闭 | 待确认 |
| [#65038](https://github.com/NousResearch/hermes-agent/issues/65038) | `delegation.fallback_providers` 配置被忽略 | ✅ 已关闭 | 待确认 |
| [#105145](https://github.com/NousResearch/hermes-agent/issues/105145) | Windows 桌面驱动 `hermes update` 总是报告 FAILED (exit 8) | ⏳ 开放 | 待确认 |
| [#52261](https://github.com/NousResearch/hermes-agent/issues/52261) | 本地推理 (oMLX/MLX) 的 400 错误被误判为 `context_overflow`，导致破坏性压缩循环 | ⏳ 开放 | 待确认 |
| [#100401](https://github.com/NousResearch/hermes-agent/issues/100401) | cron fire-claim heartbeat 死锁导致运行>60s 的任务被标记为中断 | ⏳ 开放 | 待确认 |
| [#82874](https://github.com/NousResearch/hermes-agent/issues/82874) | SIGTERM 时 gateway 阻塞在 MCP 关闭，事件循环冻结 | ✅ 已关闭 | 待确认 |
| [#99956](https://github.com/NousResearch/hermes-agent/issues/99956) | bot-chat delivery 在目标 profile 有活动会话锁时失败 | ✅ 已关闭 | [PR #99956](https://github.com/NousResearch/hermes-agent/pull/99956) |
| [#100968](https://github.com/NousResearch/hermes-agent/issues/100968) | Gateway 启动失败，state_db_data_migrations 租赁锁死循环 | ⏳ 开放 | 待确认 |
| [#105235](https://github.com/NousResearch/hermes-agent/issues/105235) | Streaming TTS 首句独立调优 | ✅ 已关闭 | [PR #105235](https://github.com/NousResearch/hermes-agent/pull/105235) |

### P2 级 Bug（代表性）

- **#103015:** GPT-6 Astra 支持 tracker
- **#91130:** `drive_preview` 在分数 DPR 显示器上点击偏移 ~20%
- **#26665:** Desktop 语言设置重启后重置为英语
- **#98524:** Desktop assistant 消息在对话记录中渲染两次
- **#78820:** Windows TUI gateway 崩溃 (OSError [Errno 22])
- **#105840:** Gateway 用户总线 provision linger 问题

---

## 6. 功能请求与路线图信号

### 高优先级功能请求

#### [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) - Bot Group Chats 跨设备连续性
- **诉求：** 允许 Bot 在不同设备（笔记本、VPS）独立运行，Group Chat 可远程接入
- **路线图信号：** 强烈指示分布式会话管理是用户需求方向，可能影响未来架构设计

#### [#67347](https://github.com/NousResearch/hermes-agent/issues/67347) - 子 Agent 模型选择引导式选择器
- **诉求：** 在 Advanced Settings 提供模型/Provider 的图形化选择器而非自由文本输入
- **路线图信号：** 改善 UX 的明确需求，可能纳入下一版本改进

#### [#80222](https://github.com/NousResearch/hermes-agent/issues/80222) - per-call model 和 reasoning_effort 覆盖
- **诉求：** `delegate_task` 支持每次调用的模型和推理强度覆盖
- **路线图信号：** 增强委托灵活性，已有 PR 在评估中

### 正在进行的功能开发

- **#103015:** GPT-6 Astra 支持 tracker
- **#105235:** Streaming TTS 优化（已合并）
- **#105831:** Desktop Preview 添加 uBlock Origin Lite 支持（广告拦截）
- **#105845:** 添加 experimental expertise-pole pilot skill

---

## 7. 用户反馈摘要

### 痛点聚类

1. **会话状态持久化问题**
   - 用户反映重启后上下文丢失、prompt cache 断裂（#53004, #104596, #102194 系列）
   - 冷启动恢复导致缓存失效，影响性能和成本（多篇 PR 集中修复）

2. **跨平台兼容性**
   - Windows: 更新失败 (#105145)、TUI 崩溃 (#78820)、stdin 读取错误
   - Linux: 安装脚本兼容性问题 (#87093)、终端数字键显示异常 (#89157)
   - macOS: Wayland 下点击偏移 (#91130)、SIGSEGV 崩溃 (#97296)

3. **Cron 任务调度可靠性**
   - heartbeat 死锁导致长任务中断 (#100401)
   - bot-chat delivery 与活动会话锁冲突 (#99956)
   - 自动提交流程阻塞 (#88584)

4. **MCP 工具隔离**
   - 多 Profile 下 MCP 工具状态混淆 (#104534)
   - OAuth 认证流程脆弱性 (#80583, #93066, #93751)

### 满意度信号
- 对 Session 持久化修复的积极反馈（多个 PR 快速合并）
- TTS 流式优化的用户贡献被采纳（#105235）
- 速率限制恢复建议功能受关注（#101462）

---

## 8. 待处理积压

### 长期未响应的重要 Issue

| Issue | 创建时间 | 天数 | 优先级 | 风险标签 | 建议 |
|---|---|---|---|---|---|
| [#53004](https://github.com/NousResearch/hermes-agent/issues/53004) | 2026-06-26 | ~74 | P1 | `risk-session-state` | 需尽快确认修复路径 |
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) | 2026-06-05 | ~95 | P2 | - | 审批绕过可能影响安全性 |
| [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) | 2026-07-18 | ~82 | P3 | - | 索引老化影响用户体验 |
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) | 2026-08-17 | ~52 | P3 | - | 自动化集成阻塞 |
| [#52261](https://github.com/NousResearch/hermes-agent/issues/52261) | 2026-06-25 | ~75 | P1 | `risk-session-state` | 本地推理用户受影响 |
| [#100401](https://github.com/NousResearch/hermes-agent/issues/100401) | 2026-09-01 | ~7 | P1 | `risk-message-delivery` | 近期报告，需快速响应 |
| [#100968](https://github.com/NousResearch/hermes-agent/issues/100968) | 2026-09-02 | ~6 | P2 | `risk-compatibility` | 启动失败影响可用性 |
| [#105145](https://github.com/NousResearch/hermes-agent/issues/105145) | 2026-09-07 | ~1 | P1 | `risk-compatibility`, `risk-platform-windows` | 新报告，需优先处理 |

### 积压 PR

- [#101462](https://github.com/NousResearch/hermes-agent/pull/101462) - 速率限制恢复步骤（待合并）
- [#105805](https://github.com/NousResearch/hermes-agent/pull/105805) - state.db FTS 初始化修复（待合并）
- [#105840](https://github.com/NousResearch/hermes-agent/pull/105840) - Gateway user bus 修复（待合并）

---

## 总结

Hermes Agent 项目在本周展示了**高活跃度**和**快速响应能力**，特别是在会话持久化和缓存优化领域取得显著进展。社区贡献者积极参与 bug 修复和功能增强，体现了健康的开源生态。

**建议关注：**
1. Windows 平台稳定性（多个 P1 问题）
2. Cron 任务调度可靠性
3. 长期未响应的 P1 Issue（尤其是 #53004 和 #52261）

项目整体健康度：**良好**，但需平衡快速迭代与长期技术债务管理。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期**：2026-09-08  
**分析周期**：过去 24 小时

## 1. 今日速览
今日 AstrBot 发布了 **v4.28.0** 版本，社区活跃度维持高位，24小时内产生 9 条 Issues 和 15 条 PR。核心进展集中在 WebChat 子代理结果自动推送、插件 Hook 绑定修复以及 Google Gemini 内置工具兼容性优化。项目整体健康度良好，维护者对近期高价值贡献响应迅速，但部分长期积压的配置隔离问题仍需关注。

## 2. 版本发布
### v4.28.0 (2026-09-08)
- **更新内容**：包含 4.28.0-beta.1 之后的所有功能合并与依赖升级（#9975, #9973, #9974）。
- **破坏性变更**：**配置文件结构优化**。升级后再降级将导致部分配置内容重置。
- **迁移注意事项**：建议用户在升级后谨慎操作降级，避免配置丢失。请备份 `astrbot_config.json` 后再进行大版本回退。

## 3. 项目进展
今日合并/关闭了以下关键 PR，推动了核心稳定性与体验优化：

| PR # | 类型 | 内容摘要 | 贡献者 |
|------|------|----------|--------|
| #9975 | chore | 版本升级至 4.28.0，同步 Release 文本 | @Soulter |
| #9973 | feat | Metrics 上传新增 Python 版本指标，便于分析运行时分布 | @Soulter |
| #9974 | chore | GitHub Actions 依赖 `docker/setup-qemu-action` 升级 | Dependabot |
| #7895 | fix | **QQ官方平台**：主动发送消息适配 Markdown 渲染，修复格式丢失问题 | @bugkeep |
| #7883 | fix | **QQ官方平台**：`send_by_session` 统一使用 Markdown payload | @bugkeep |
| #8257 | fix | **插件系统**：强化 `plugin_set` 配置元数据校验，防止非法配置进入 WebUI | @he-yufeng |
| #9976 | fix | **插件系统**：修复子模块中注册的 Hook 未被正确绑定导致的 `TypeError` | @he-yufeng |

**整体评价**：今日合并重点在于**平台兼容性修复**（QQ Official Markdown）和**插件系统健壮性增强**（Hook 绑定与 Schema 校验），为 v4.28.0 的稳定运行打下基础。

## 4. 社区热点
以下 Issues/PRs 讨论热度较高，反映了用户核心诉求：

1. **[Feature] 插件按 Bot 隔离配置** (#9968)
   - **热度**：评论 2，新建仅 1 天
   - **诉求**：多 Bot 实例下，希望同一插件在不同 Bot 上使用不同配置（如归档目录、后端）。目前仅能通过多配置文件档案（abconf）解决启用/停用，无法实现**同插件参数差异化**。
   - **链接**：https://github.com/AstrBotDevs/AstrBot/issues/9968

2. **[Bug] WebChat 后台子代理结果不自动推送** (#9321) & PR #9322
   - **热度**：Issue 评论 2，PR 待合并
   - **诉求**：用户通过 WebChat 触发后台子代理任务后，任务完成但结果不自动刷新显示，需手动发消息才能看到。开发者已提交 PR #9322 通过轮询历史消息解决。
   - **链接**：Issue: https://github.com/AstrBotDevs/AstrBot/issues/9321 | PR: https://github.com/AstrBotDevs/AstrBot/pull/9322

3. **[Bug] 定时任务 Active Agent 重复调用工具并错误显示 Completed** (#9980)
   - **热度**：新建同日，评论 2
   - **诉求**：长会话 + 定时任务场景下，Agent 陷入重复工具调用死循环，最终状态虽为 ERROR 但 Cron Job 状态仍显示 `completed`，导致用户误判任务成功。
   - **链接**：https://github.com/AstrBotDevs/AstrBot/issues/9980

## 5. Bug 与稳定性
| 等级 | 问题描述 | Issue/PR | 状态 |
|------|----------|----------|------|
| **高** | **定时任务状态不一致**：Active Agent 在达到最大步骤失败后，Cron 状态误报 `completed`，掩盖真实错误。 | #9980 | OPEN |
| **中** | **WebChat 子代理结果延迟**：后台任务完成后前端不自动刷新，影响用户体验。 | #9321 | PR #9322 待合并 |
| **中** | **Hook 绑定失效**：插件子模块中定义的 Hook 函数未被绑定，调用时报 `missing 1 required positional argument`。 | #9938 | **已修复** PR #9976 |
| **低** | **Python 版本约束形同虚设**：`pyproject.toml` 要求 >=3.12，但环境可绕过安装旧版 Python。 | #9945 | OPEN |

## 6. 功能请求与路线图信号
1. **失败时保存会话历史** (#7620)
   - **需求**：Agent 运行失败（如 EmptyModelOutputError）时，希望保留本轮记录以便排查或断点续传。
   - **预测**：可能作为新配置项 `save_failed_agent_history` 纳入未来版本，优先级中等，需权衡“历史整洁性”与“调试便利性”。

2. **数字员工主动能力上下文隔离机制** (#9967)
   - **需求**：飞书等多用户场景下，当前隔离模式导致原始会话无法感知子任务数据收回，而统一上下文又导致用户串扰。
   - **预测**：涉及架构级调整，可能与 #9968 的多 Bot 配置需求相关联，短期内直接落地可能性低，建议关注后续讨论。

3. **ScitiX Provider 内置支持** (#9981)
   - **需求**：新增 ScitiX 作为官方支持的 OpenAI 兼容 Provider。
   - **预测**：若 API 稳定性得到验证，有望被纳入 v4.29.0+ 的内置 Provider 列表。

## 7. 用户反馈摘要
- **痛点**：
  - **多实例配置僵化**：#9968 指出当前多 Bot 架构无法支持“同插件不同参数”，强迫用户维护多个几乎相同的配置文件。
  - **异步任务反馈缺失**：#9321 反映 WebChat 对后台长任务的进度和结果反馈不及时，用户需主动轮询或重试。
  - **状态机逻辑漏洞**：#9980 揭示定时任务在执行失败时仍标记为完成，可能导致自动化流程后续步骤基于错误前提运行。
- **满意点**：
  - 对 QQ Official 平台 Markdown 渲染修复的关注（#7895, #7883）表明用户对跨平台消息格式一致性有较高期待，且快速修复获得认可。
  - 插件 Hook 机制的修复（#9976）解决了开发者社区的常见报错，提升了插件开发体验。

## 8. 待处理积压
- **#7620** [Feature] 失败时保存本轮记录：自 2026-04-17 创建，长期未响应。虽为小功能，但能显著降低调试成本，建议优先评估。
- **#9945** [Bug] pyproject.toml 约束失效：自 2026-09-04 创建，涉及依赖管理严谨性，可能引发环境兼容性问题，建议确认是否需在构建流程中强制检查。
- **#9967** [Feature] 数字员工上下文隔离：架构级问题，需长期规划，建议维护者在 v4.28.0 稳定后安排专题讨论。

---
*报告生成时间：2026-09-08 | 数据来源：GitHub API*

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：** 2026-09-08
**分析师：** Agnes (Sapiens AI)

## 1. 今日速览
2026年9月8日，DeepSeek Harness 项目处于**高度活跃的用户反馈与社区共建阶段**。过去24小时内无官方代码合并或新版本发布，但 GitHub Discussions 板块极其活跃，共录得 **146 条讨论**，其中多条置顶及热门议题在当日仍有高频更新。社区焦点主要集中在 **v0 到 v2 的会话迁移兼容性故障**、**Windows 平台的原生构建障碍**以及**第三方 API 适配规范**上。项目整体呈现“上游依赖变动引发下游兼容性阵痛”的特征，用户参与度高，但稳定性体验面临挑战。

## 2. 版本发布
**无新版本发布。**

当前社区反馈集中在 `0.1.2-rc.1` 及 `0.1.1-rc.2` 版本的兼容性问题，以及 `0.1.3-alpha.1` 的构建失败，表明项目正处于小版本迭代后的稳定化调整期，尚未推出正式的新 release。

## 3. 项目进展
今日无 PR 合并记录。项目推进主要依靠社区插件生态的自发补充：
- **定时任务能力扩展**：社区开发了 `dsh-schedule-tasks` 插件（Discussion #1563），填补了 DSH 原生缺乏定时自动执行 Agent 任务的空白，支持 5 段式 Cron 解析，无需依赖系统级 cron。
- **对话回溯功能增强**：社区推出 `dsh-rewind` 插件（Discussion #4592），实现了类似 Claude Code 的 `/rewind` 功能，允许在同窗口内原地回退至任意历史消息，提升了交互体验。

## 4. 社区热点
以下 Discussion 为今日热度最高、涉及痛点最集中的议题：

1.  **[综合] 插件实战指南共建与测试记录** (#1477)
    *   **热度**：评论 23 条 | **状态**：开放
    *   **分析**：作为持续更新的基建帖，用户分享不同配置下的计时器任务基准测试结果，旨在建立非官方的性能参照系，反映用户对模型推理效率的持续关注。
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/1477)

2.  **[意见] OpenCode Go API Header 强制要求** (#5495)
    *   **热度**：评论 20 条 | **状态**：开放
    *   **分析**：上游基础设施变动引发的连锁反应。OpenCode Go 自 09/05 起强制要求 `x-opencode-session` header，影响约 2.5 万用户组织。社区急需 DSH 层面统一处理此 Header 以保障路由优化，体现了 DSH 作为网关层的关键价值。
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)

3.  **[通用] 包族 npm dist-tag `latest` 不一致导致 ERESOLVE** (#2763)
    *   **热度**：评论 16 条 | **状态**：开放
    *   **分析**：严重的发布工程问题。`@deepseek-ai/dsh-*` 包族中大部分包的 `latest` tag 仍停留在 `0.0.1-rc.1`，而核心包已更新至 `0.1.0-rc.6`。这导致全新项目安装时因 peer dependency 冲突直接报错，严重影响开发者上手体验。
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/2763)

4.  **[通用] 会话损坏及 v0→v1→v2 Migration Failure** (#5909)
    *   **热度**：评论 8 条 | **状态**：开放 (今日新建)
    *   **分析**：直接关联今日多起反馈的迁移崩溃问题。重复的工具调用 ID 导致会话加载失败（空白会话），阻碍了从旧版本会话格式的平滑过渡。
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/5909)

5.  **[Windows平台无法从源代码运行]** (#5638)
    *   **热度**：评论 9 条 | **状态**：开放
    *   **分析**：`0.1.3-alpha.1` 版本在 Windows 下 `pnpm install` 构建 `node-gyp` (fs-ext) 时失败，暴露了项目对 Windows 原生模块支持的脆弱性。
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/5638)

## 5. Bug 与稳定性
今日 Bug 报告集中爆发，主要围绕**会话持久化**和**输入法兼容性**：

| 严重程度 | 问题描述 | 关联 Discussion | 状态 |
| :--- | :--- | :--- | :--- |
| **P0 (高危)** | **会话格式不兼容导致数据丢失**：Alpha 版本写入的新格式 `sourceEventSeqs` 不被 rc.2 识别，引发 `SessionPersistenceCorruptionError`；反之 v0 会话升级也出现解析错误。 | [#5160](https://github.com/deepseek-ai/deepseek-harness/discussions/5160), [#5909](https://github.com/deepseek-ai/deepseek-harness/discussions/5909) | 无 Fix PR |
| **P1 (高)** | **Windows 消息发送崩溃**：`0.1.2-rc.1` 在 Web UI 发送消息后 200ms 即报错 `Cannot read properties of undefined (reading 'find')`，会话持久化失败 (ENOENT)。 | [#5802](https://github.com/deepseek-ai/deepseek-harness/discussions/5802) | 无 Fix PR |
| **P1 (高)** | **RPC 版本断裂**：上游 Runtime 新版 RPC 重写，导致 VSCode 插件 (<v0.6.2) 和 IntelliJ 插件 (<v0.2.2) 失效，影响 IDE 集成用户体验。 | [#5739](https://github.com/deepseek-ai/deepseek-harness/discussions/5739) | 需升级插件 |
| **P2 (中)** | **IME 输入法乱码**：Windows 11 Edge/Chrome 下，微软拼音输入法输入中文导致文本乱码，但粘贴正常。 | [#5879](https://github.com/deepseek-ai/deepseek-harness/discussions/5879) | 无 Fix PR |
| **P2 (中)** | **输出 Token 限制错误**：用户在运行 dsh 时频繁遇到 "Output token limit reached"。 | [#1166](https://github.com/deepseek-ai/deepseek-harness/discussions/1166) | 配置讨论中 |

## 6. 功能请求与路线图信号
*   **自定义模型端点管理**：Discussion #3246 展示了社区对“模型高级配置”页面的强烈需求，支持自定义 URL、Header 及多种协议（OpenAI Completions/Responses, Anthropic Messages）。这提示官方可能需要内置更灵活的 Provider 配置能力。
*   **原生定时任务**：Discussion #1563 中的插件需求表明，用户希望 DSH 具备原生的计划任务能力，而非依赖外部 Cron，这是 Agent 自动化场景的关键需求。
*   **对话历史回溯**：Discussion #4592 的 `dsh-rewind` 插件反映了用户对类 Claude Code 交互模式（原地回退修正）的偏好，可能影响未来 UI/UX 的设计方向。

## 7. 用户反馈摘要
*   **痛点**：
    *   **升级即崩溃**：多位用户反馈从 Alpha 升级到 RC 版本后，历史会话无法加载或损坏（#5160, #5909, #5694），严重打击用户信任。
    *   **Windows 体验劣质**：除了代码构建失败（#5638），Windows 上的 Web UI 还存在 IME 乱码（#5879）和消息发送崩溃（#5802）等基础功能缺陷。
    *   **依赖管理混乱**：npm 包的 `latest` tag 不一致导致开箱即用的安装体验极差（#2763）。
*   **满意点**：
    *   社区插件生态丰富，能够快速响应特定需求（如定时任务、Rewind）。
    *   官方对公开测试数据的透明态度（#1477）有助于建立技术共识。

## 8. 待处理积压
*   **Release Engineering**: `latest` dist-tag 不一致问题（#2763）涉及包发布流程，需发布维护团队优先修复，否则新安装用户将面临大量 ERESOLVE 错误。
*   **Session Migration**: v0/v1/v2 迁移逻辑的健壮性（#5909, #5160）是当前的最大技术债，建议在下一个 Patch 版本中重点重构 Session 读写逻辑，确保前后向兼容。
*   **Windows 兼容性**: Windows 端的构建脚本（node-gyp）及 Web UI 的 IME 处理需要专项修复，建议提高其在 QA 流程中的优先级。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*