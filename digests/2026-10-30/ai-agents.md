# OpenClaw 生态日报 2026-10-30

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-30 01:25 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 (2026-10-30)

## 1. 今日速览

OpenClaw 项目当前处于高强度安全修复与状态一致性攻坚阶段，过去 24 小时内产生了 500 条 Issues 更新和 500 条 PR 更新，社区活跃度极高。项目今日发布了 `v2026.10.9` 安全补丁版本，重点修复了 MCP 依赖、Zod 集合校验及 IMAP 解析漏洞。大量高优先级 Issue 集中在 Gateway 状态数据库（SQLite）的写入阻塞、WAL 检查点失效及会话状态恢复失效，暴露出系统在非正常关闭场景下的韧性瓶颈。虽然核心功能在向前推进，但稳定性积压（Backlog）较为严重，需警惕长期未解决的状态一致性缺陷对整体系统可用性的影响。

## 2. 版本发布

*   **[v2026.10.9] (安全补丁版本)**
    *   **核心更新**：修复易受攻击的运行时依赖漏洞。
    *   **安全修复细节**：
        *   `fast-uri` 4.2.3：拒绝在 MCP Schema 校验中处理畸形 URI 方案及主机头。
        *   拒绝过大的 Zod 集合：在 A2UI 和 Discord 嵌入式应用 SDK 早期处理异常数据。
        *   `nodemailer` 10.1.4：强化 IMAP 发送者解析，防止恶意伪装发送者。
    *   **影响评估**：属于紧急安全修复，无破坏性变更。建议所有生产环境及暴露在互联网的 Gateway 立即升级。

*   **[v2026.9.36] (extended-stable / LTS 等效版本)**
    *   **核心更新**：基于 2026 年 9 月底的版本，包含关键安全更新、可靠性与性能修复以及新模型支持。
    *   **定位**：目前 OpenClaw 的 LTS 替代方案，适合需要长期稳定运行的用户部署。

## 3. 项目进展

今日 PR 活动极为频繁，主要聚焦于提升基础架构稳定性及修复特定渠道的解析问题：

*   **数据库与状态管理优化**：
    *   [PR #187989](https://github.com/openclaw/openclaw/pull/187989) 解决了慢速历史读取阻塞事务写入的问题，通过解除数据库写入器的预占，提升了并发下的系统吞吐量。
    *   [PR #188009](https://github.com/openclaw/openclaw/pull/188009) 避免了在复制检查快照时阻塞数据库写入，解决了大型 SQLite 数据库的 reflinking 性能瓶颈。
*   **渠道与工具兼容性修复**：
    *   [PR #188003](https://github.com/openclaw/openclaw/pull/188003) 修复了 Microsoft Teams 实时目录搜索中的 Unicode 规范性匹配问题，确保不同编码形式的通道名能被正确检索。
    *   [PR #188018](https://github.com/openclaw/openclaw/pull/188018) 优化了 Matrix 渠道在 `progress` 模式下的图片回复，解决了图片与说明文字分离及顺序颠倒的问题。
    *   [PR #187766](https://github.com/openclaw/openclaw/pull/187766) 修复了 MXC 沙盒中文件路径裁剪导致的逻辑错误，防止了因首尾空格引起的“假阴性”文件读取。
*   **发布与更新机制**：
    *   [PR #187994](https://github.com/openclaw/openclaw/pull/187994) 引入了发布监控器（Publication Watcher），强化了发布流程的审计与可追踪性。
    *   [PR #187996](https://github.com/openclaw/openclaw/pull/187996) 修复了发布过程中的 FRV（失败恢复验证）重跑机制，防止了无 Runner 的幽灵 Job。

## 4. 社区热点

高热度讨论主要集中在深层记忆机制失效及底层状态竞争问题：

*   **[Issue #164294] Gateway 状态 DB WAL 自动检查点失效**
    *   **热度**：38 条评论。
    *   **链接**：[https://github.com/openclaw/openclaw/issues/164294](https://github.com/openclaw/openclaw/issues/164294)
    *   **诉求分析**：用户反馈 Gateway 启动后 WAL 检查点一直被 `in-process reader` 阻塞，导致 `state/openclaw.sqlite` 数据库无法完成 checkpoint，长期挂起将极大增加磁盘 I/O 压力并可能导致状态膨胀。
*   **[Issue #150635] 短期记忆保留导致深度梦境（Dreaming Deep Phase）晋升失效**
    *   **热度**：23 条评论。
    *   **链接**：[https://github.com/openclaw/openclaw/issues/150635](https://github.com/openclaw/openclaw/issues/150635)
    *   **诉求分析**：由于短期存储达到 512 条目上限后，夜间转录摄入未能正确淘汰旧的无召回条目，导致 AI Agent 的长期记忆学习（Deep Phase）功能无法正常运转。
*   **[Issue #120385] 计划任务（Cron）中 MCP 工具目录构建不完整**
    *   **热度**：22 条评论。
    *   **链接**：[https://github.com/openclaw/openclaw/issues/120385](https://github.com/openclaw/openclaw/issues/120385)
    *   **诉求分析**：在自动化定时任务中，工具目录未能正确加载，导致 Agent 运行失败且仅显示通用的执行失败警告，排查难度极大。

## 5. Bug 与稳定性

今日发现的稳定性问题多涉及 P0 级别（阻断性）和 P1 级别（严重），部分问题已有对应的修复 PR 处于审查阶段。

*   **P0 级阻断性问题**：
    *   **[Issue #166634] 迟回收提交检查点失败导致崩溃恢复后 Agent 永久不可用**：Gateway 进程非正常终止后，背景 Agent 准备失败，导致后续所有 `chat` 请求报错。目前 [PR #187998](https://github.com/openclaw/openclaw/pull/187998) 正在修复更新账本延迟相关的取消与中断报告逻辑。
    *   **[Issue #162211] Gateway 启动时事件循环阻塞 40-200s**：启动期间的 CPU 阻塞被健康监控误判为断开连接，进而触发无限重启循环（Crash Loop）。
    *   **[Issue #186813] In-chat 管理更新在 SQLite 事务锁中挂起**：该问题已在 [PR #187996](https://github.com/openclaw/openclaw/pull/187996) 中部分缓解。

*   **P1 级严重性问题**：
    *   **[Issue #166017] MCP 会话 TTL 默认值未生效**：导致 MCP 运行时无法被驱逐，最终子进程数量达到 256 上限，引发全量执行失败。
    *   **[Issue #177656] 本地主机执行共享状态完整性验证失败**：在 2026.10.5 版本中，子进程清理时丢失身份标识，导致执行结果未返回。
    *   **[Issue #158592] 宿主机唤醒后 Agent 模型运行时发布超时**：macOS 休眠唤醒后，恢复路径失败导致所有入站消息请求均无法响应。

## 6. 功能请求与路线图信号

*   **Agent 触发的上下文压缩工具** ([Issue #6757](https://github.com/openclaw/openclaw/issues/6757))
    *   **信号**：用户强烈希望 Agent 能够自主判断上下文膨胀并执行压缩。此功能对于长生命周期 Agent 至关重要，预计未来版本会作为 Agent 核心工具集纳入。
*   **支持文件路径输入的 `infer model run`** ([Issue #140244](https://github.com/openclaw/openclaw/issues/140244))
    *   **信号**：为自动化脚本提供大载荷 Prompt 支持，增加 `--prompt-file` 参数。
*   **通道身份链接管理** ([PR #164607](https://github.com/openclaw/openclaw/pull/164607))
    *   **信号**：正在实现 Profile 中的多通道身份管理功能，表明 OpenClaw 正朝着更复杂的社交网络交互方向演进。
*   **模型目录架构重构** ([PR #187730](https://github.com/openclaw/openclaw/pull/187730))
    *   **信号**：将推理配置（Thinking Profile）下沉至模型 Catalog 行中，减少对 provider 钩子的依赖。此重构将显著降低新增模型的集成成本。

## 7. 用户反馈摘要

*   **痛点集中**：用户最大的不满来自于**“非正常状态恢复”的不可预测性**。无论是 macOS 休眠（#158592）、非正常关机（#176342）还是数据库锁死（#186813），系统目前缺乏优雅的降级机制，往往只能依赖重启 Gateway 来解决。
*   **使用场景**：大量关于 Telegram 和 WhatsApp 渠道的消息丢失与乱序反馈（#160762, #188018）表明，用户在高频、即时性交互场景下对消息的可靠性极其敏感。
*   **满意之处**：OpenClaw 的安全响应速度值得称道，针对 CVE 级别或依赖项漏洞（v2026.10.9）的响应非常迅速，维护团队在发布安全修复方面表现专业。

## 8. 待处理积压

提醒维护者关注以下长期未得到响应的关键问题，这些积压可能演变为更严重的系统瓶颈：

*   **[Issue #150635] (创建于 2026-09-17)**：短期记忆保留缺陷。该问题已挂起 40 多天，影响了 Agent 的核心学习能力。
*   **[Issue #120385] (创建于 2026-08-08)**：计划任务中 MCP 工具目录构建不完整。该自动化场景的缺陷已持续 2 个多月。
*   **[Issue #164294] (创建于 2026-10-03)**：WAL 检查点失效。虽然是新建 Issue，但由于是底层数据库问题，已有 38 条评论，说明社区关注度极高，需尽快指派开发人员介入排查。
*   **[Issue #126950] (创建于 2026-08-21)**：Telegram 回调 payload 静默丢弃。对于依赖 Telegram 按钮交互的用户而言，这是一个体验硬伤。

---

## 横向生态对比

# AI 智能体开源生态横向对比分析报告 (2026-10-30)

## 1. 生态全景
个人 AI 助手与自主智能体开源生态处于**高强度稳定性攻坚与多模态渠道扩展**的过渡期。各核心项目（OpenClaw, hermes-agent, DeepSeek Harness等）正集中修复状态一致性、并发锁冲突及桌面端环境兼容性等基础架构瓶颈。安全合规（RBAC、沙箱隔离、依赖漏洞）成为企业级部署的通用刚需，而“云脑本地手”（远程推理+本地执行）架构正成为社区强烈呼声。整体来看，社区活跃度极高，但版本发布节奏放缓，主要精力在于收敛 Beta/RC 版本的核心阻断性 Bug，以确保从功能堆叠向生产可用性的转变。

## 2. 各项目活跃度对比

| 项目 | Issues 更新数 | PR 更新/合并数 | 版本发布情况 | 健康度评估 | 核心风险点 |
| :--- | :---: | :---: | :--- | :--- | :--- |
| **OpenClaw** | 500+ | 500+ (密集迭代) | 发布 `v2026.10.9` (安全补丁) | **高活跃/高压力** | SQLite WAL 阻塞、状态恢复失效、P0 崩溃循环 |
| **Zeroclaw** | 50 | 50 (44 待合并) | 无新版本 (v0.8.7 文档修复) | **稳定迭代** | 知识图谱权限隔离缺失 (S0)、插件事务一致性 |
| **PicoClaw** | 0 | 20 (全部关闭/合并) | 无新版本 | **良好/收敛** | 技术债清理中，多代理框架尚在 WIP 阶段 |
| **QwenPaw** | 15 | 41 (27 待合并, 14 合并) | 无新版本 (Beta 收敛) | **中等/重构期** | 桌面端资源打包失败、Agent 无限循环耗资 |
| **hermes-agent** | 334 | 500 (82 合并) | 无新版本 | **高活跃/混乱** | 统一网关引发回归、远程会话恢复失败、计费异常 |
| **AstrBot** | 14 | 29 (3 合并) | 无新版本 | **健康/响应快** | 多机器人无限对话循环、FAISS 硬件兼容性崩溃 |
| **DeepSeek Harness** | 180 (Discussions) | N/A (直接 Release) | 停留 `0.2.1-rc.3` | **高危/阻断** | 认证 Cookie 溢出导致启动失败、Windows 沙箱 Shell 失效 |

## 3. OpenClaw 在生态中的定位

*   **技术路线差异**：OpenClaw 是唯一采用 **Gateway + SQLite 状态数据库** 重型架构的项目，相较于其他项目的轻量级状态管理，其优势在于复杂会话的高吞吐量，但劣势是状态一致性（WAL 检查点、锁竞争）成为主要痛点。
*   **安全响应标杆**：OpenClaw 在 24 小时内发布紧急安全补丁（`v2026.10.9`）修复 MCP、Zod 及 IMAP 漏洞，显示出维护团队对 CVE 级别风险的快速响应能力，这在生态中是较为突出的专业表现。
*   **社区规模与深度**：500+ 的日更新量远高于其他项目，表明其拥有最大的用户基数和最复杂的集成需求（包括 Teams, Matrix, Discord 等多渠道）。但其“非正常状态恢复”的不可预测性是其与轻量级项目（如 PicoClaw）相比最大的体验短板。
*   **功能演进方向**：OpenClaw 正在向“深度记忆”和“Agent 自主工具调用”（如上下文压缩工具）演进，试图解决长生命周期 Agent 的记忆膨胀问题，这在生态中属于领先的架构探索。

## 4. 共同关注的技术方向

1.  **状态一致性与崩溃恢复**：
    *   **OpenClaw** (#166634, #158592)、**hermes-agent** (#139818, #143767)、**Zeroclaw** (#11301) 均高度关注非正常终止、休眠唤醒或网关重启后的状态恢复。
    *   **诉求**：用户期望 Agent 具备“优雅降级”能力，而非简单的 Crash Loop 或数据丢失。
2.  **多租户安全与权限隔离 (RBAC/Sandbox)**：
    *   **Zeroclaw** (#5982, #9647) 正在构建基于发送者的细粒度 RBAC 和知识图谱隔离。
    *   **PicoClaw** (#1258) 强化了 Exec 工具的环境变量白名单。
    *   **DeepSeek Harness** 面临 Windows 沙箱失效问题。
    *   **诉求**：从“单用户可信”向“多代理/多租户企业级安全”过渡，防止数据泄露和权限提升。
3.  **远程推理与本地执行 ("云脑本地手")**：
    *   **hermes-agent** (#18715, #38519) 明确提出了云端推理 + 本地工具执行的架构需求。
    *   **QwenPaw** (#8499) 通过插件化本地模型管理来探索混合推理路径。
    *   **诉求**：保护本地隐私/利用本地算力，同时享受云端大模型的强大推理能力。
4.  **长程记忆与上下文管理**：
    *   **OpenClaw** (#150635) 尝试优化“深度梦境”记忆晋升。
    *   **QwenPaw** (#7613, #8500) 引入 OpenViking 记忆后端，并修复 Auto-Dream 静默丢数据问题。
    *   **诉求**：解决长期交互中的上下文膨胀与关键决策丢失问题。

## 5. 差异化定位分析

*   **功能侧重**：
    *   **OpenClaw / hermes-agent**：侧重**多渠道社交集成**（Teams, Slack, Discord, Matrix）和**企业级 Gateway** 架构，适合需要复杂交互的 B 端或重度 C 端用户。
    *   **PicoClaw**：侧重**多渠道适配广度**（飞书, iMessage, MQTT, 微信）和**轻量化部署**，适合物联网和快速接入场景。
    *   **DeepSeek Harness / QwenPaw**：侧重**本地模型支持与桌面端体验**，强调隐私安全和离线/混合推理能力。
    *   **Zeroclaw**：侧重**知识图谱与插件系统**，试图构建更结构化的智能体认知基础。
    *   **AstrBot**：侧重**即时通讯平台原生适配**（QQ 官方），在中文互联网场景下有独特优势。
*   **目标用户**：
    *   **技术极客/开发者**：OpenClaw, hermes-agent (复杂配置，高并发)。
    *   **隐私敏感型用户**：DeepSeek Harness, QwenPaw, PicoClaw (本地模型，沙箱隔离)。
    *   **内容创作者/运营**：AstrBot (群聊管理, 防循环)。
*   **技术架构**：
    *   **单体/重型 Gateway**：OpenClaw, hermes-agent (强一致性，高资源占用)。
    *   **模块化/插件化**：Zeroclaw, QwenPaw, PicoClaw (易扩展，解耦本地推理)。
    *   **轻量级/嵌入式**：PicoClaw (MQTT 支持，低资源消耗)。

## 6. 社区热度与成熟度

*   **快速迭代/高压力阶段 (High Velocity)**：
    *   **OpenClaw, hermes-agent**：日更新量巨大（500+），处于功能堆叠与稳定性修复的激烈拉扯中。社区热情高，但痛点也最密集，适合追求最新功能的激进用户。
    *   **DeepSeek Harness**：处于 RC 收尾的“冻结功能、专注稳定性”阶段，用户焦虑感强（阻断性 Bug 多），社区互助氛围浓。
*   **质量巩固/架构演进阶段 (Consolidation)**：
    *   **Zeroclaw, QwenPaw**：处于 Beta 收敛期，重点在于修复回归 Bug 和进行底层架构重构（如知识图谱隔离、SDK 重构）。稳定性较好，适合生产环境试用。
*   **稳定成熟/利基场景阶段 (Mature/Niche)**：
    *   **PicoClaw**：通过批量合并清理技术债，架构健康，虽无大版本发布，但底层能力（多代理 PoC、安全加固）正在夯实。
    *   **AstrBot**：社区响应迅速，针对特定平台（QQ）的适配非常成熟，整体健康度高。

## 7. 值得关注的趋势信号

1.  **“无状态”向“有状态”的回归治理**：早期 Agent 多为无状态对话，现在所有项目都在挣扎于**状态持久化**（SQLite, 知识图谱, 记忆后端）的一致性与崩溃恢复。未来将出现专门针对 Agent 状态管理的中间件或标准。
2.  **安全成为部署前置条件**：从 PicoClaw 的环境变量净化，到 Zeroclaw 的 RBAC，再到 DeepSeek Harness 的 Cookie 管理，**细粒度权限控制**和**沙箱隔离**已从“可选功能”变为“默认要求”。缺乏安全隔离的项目在企业市场将失去竞争力。
3.  **成本敏感度与资源熔断**：QwenPaw 的“Doom Loop”讨论和 OpenClaw 的上下文压缩需求表明，**Token 成本控制**和**防止无限循环**成为用户体验的核心指标。开发者需关注 Agent 的“自我监控”与“资源上限”机制。
4.  **混合架构 (Hybrid Inference) 的崛起**：hermes-agent 和 QwenPaw 都在探索**云端推理 + 本地执行**或**云端大模型 + 本地小模型**的混合模式。这种架构既能利用云端算力，又能保护本地数据隐私，预计将成为 2027 年的主流部署形态。
5.  **桌面端与 Web 端的体验割裂**：多个项目（DeepSeek, QwenPaw, hermes）在桌面端（Electron/Tauri）遇到路径编码、资源打包、剪贴板兼容性问题。**跨平台原生体验**的打磨将是下一个竞争焦点。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**日期：** 2026-10-30
**数据范围：** 过去24小时 (2026-10-29 至 2026-10-30)

## 1. 今日速览
Zeroclaw 项目处于**高度活跃状态**，过去24小时内新增/更新了 50 个 Issues 和 50 个 PR，其中 44 个 PR 处于待合并状态，显示出密集的代码迭代节奏。今日重点集中在**安全性强化**（如 RBAC、密钥轮转）、**插件系统稳定性**（安装/更新事务处理）以及 **ZeroCode UI 体验优化**。虽然暂无新版本发布，但针对 v0.8.7 的文档修复和 v0.9.0 的安全补丁已着手处理，表明团队正为下一版本做准备。

## 2. 版本发布
*无新版本发布。*
*注：存在针对 v0.8.7 的文档翻译修复 Issue [#12076](https://github.com/zeroclaw-labs/zeroclaw/issues/12076)，以及 v0.9.0 依赖安全更新 [PR #12095](https://github.com/zeroclaw-labs/zeroclaw/pull/12095)。*

## 3. 项目进展
今日合并/关闭的 PR 主要集中在基础设施稳定性与安全合规：

*   **依赖安全加固**：[PR #12095](https://github.com/zeroclaw-labs/zeroclaw/pull/12095) 已合并，将 `pulldown-cmark` 升级至 0.13.5 以修复 RUSTSEC-2026-0414，解除了因 CI 安全门禁阻塞所有合并的问题。
*   **插件安装健壮性**：[PR #11792](https://github.com/zeroclaw-labs/zeroclaw/pull/11792) 关闭，修复了插件安装中断后遗留临时文件（`.<name>.installing-v1-<id>`）导致后续操作失败的问题。
*   **文档与配置一致性**：[PR #12076](https://github.com/zeroclaw-labs/zeroclaw/pull/12076) 关闭，修复了 v0.8.7 中多个语言目录（fr, ja, es, zh-CN）的翻译错误，特别是插件接受流程页面。
*   **Web UI 状态管理**：[PR #11517](https://github.com/zeroclaw-labs/zeroclaw/pull/11517) 关闭，修复了 Web 聊天界面在轮次进行中刷新页面导致用户提示词丢失的问题，通过改进 hydration 逻辑保留本地状态。

## 4. 社区热点

**最活跃 Issue 讨论：**

1.  **多租户 RBAC 权限模型** ([#5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982), 11 评论)
    *   **热点分析**：用户强烈关注在代理部署中实现基于发送者的细粒度访问控制。讨论焦点在于如何在不创建独立 RBAC 子系统的前提下，利用现有的 agent/risk-profile 模型构建发送者角色。这是企业级部署的关键阻塞点。
2.  **会话事件历史与状态重放** ([#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526), 14 评论)
    *   **热点分析**：这是一个被接受的 RFC，讨论旨在建立 append-only 会话事件历史和确定性状态重放机制。核心诉求是解决当前可变对话消息模型在执行事实追踪上的局限性，提升审计与调试能力。
3.  **Discord 插件发布验证** ([#10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999), 9 评论)
    *   **热点分析**：团队正在验证 v0.8.6 发布的 Discord 插件安装流程。评论显示实时交付和回复已验证通过，但状态标记为 "blocked"，可能涉及后续自动化测试或更多平台兼容性问题。

**高关注 PR：**

*   **[PR #11301](https://github.com/zeroclaw-labs/zeroclaw/pull/11301)** (XL 大小, P1 优先级)：修复 agent 重命名后 CLI、Gateway 和 RPC 之间的持久化状态恢复不一致问题。由于涉及核心数据一致性且规模较大，需要仔细审查。
*   **[PR #9745](https://github.com/zeroclaw-labs/zeroclaw/pull/9745)** (XL 大小, P1 优先级)：实现知识图谱的每代理归属和范围限定，解决任何代理可读写其他代理知识的严重安全问题。

## 5. Bug 与稳定性

**按严重程度排列 (S0/S1 优先)：**

*   **[S0/S1] 知识图谱权限隔离缺失** ([#9647](https://github.com/zeroclaw-labs/zeroclaw/issues/9647))
    *   **描述**：知识图谱是全局共享的，缺乏每代理归属和所有权范围限制，导致任何代理都可以修改其他代理的知识。
    *   **Fix 状态**：已有高优先级修复 PR [PR #9745](https://github.com/zeroclaw-labs/zeroclaw/pull/9745) 进行中，状态为 Open，等待审查。
*   **[S1] Zerocode "Copy" 功能失效** ([#11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418))
    *   **描述**：ZeroCode TUI 中的复制按钮在 Linux 终端上无法将内容写入剪贴板，阻塞工作流。
    *   **Fix 状态**：已有修复 PR [PR #11529](https://github.com/zeroclaw-labs/zeroclaw/pull/11529) 进行中，使用本地 Linux 剪贴板写入器并区分报告结果。
*   **[S2] Skill 审查无法查看 skill_bundles 分配的 Skills** ([#11333](https://github.com/zeroclaw-labs/zeroclaw/issues/11333))
    *   **描述**：通过 `skill_bundles` 加载的技能在 skill review fork 中不可见，导致工具无法访问。
    *   **Fix 状态**：暂无直接 Fix PR，但相关架构改进 [PR #10993](https://github.com/zeroclaw-labs/zeroclaw/pull/10993) 可能间接影响。
*   **[S2] Matrix send_via 工具将用户身份误判为房间目的地** ([#10926](https://github.com/zeroclaw-labs/zeroclaw/issues/10926))
    *   **描述**：`SendViaTool` 在解析目标时错误地选择第一个外部对等体作为接收者，即使指定了房间。
    *   **Fix 状态**：暂无直接 Fix PR，需关注后续开发。
*   **[S3] Gateway pairing dashboard 配置未被读取且配对码不过期** ([#9394](https://github.com/zeroclaw-labs/zeroclaw/issues/9394))
    *   **描述**：`gateway.pairing_dashboard` 配置项被接受但未被使用，且配对码缺乏过期机制，存在安全风险。
    *   **Fix 状态**：暂无直接 Fix PR。

## 6. 功能请求与路线图信号

*   **每发送者 RBAC** ([#5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982))：高优先级。路线图信号显示将基于现有模型扩展，而非新建子系统。
*   **统一文件摄入/解析/交付** ([#11013](https://github.com/zeroclaw-labs/zeroclaw/issues/11013))：作为 RFC #9488 的跟踪器，涵盖文件模型、摄入、解析、投影、保留和交付。这是跨渠道（Channel/Web）的重要架构改进。
*   **Signal 媒体附件支持** ([#7891](https://github.com/zeroclaw-labs/zeroclaw/issues/7891))：已关闭并标记为 "parking-lot"，表明暂不实施，可能推迟到更远的未来版本。
*   **Telegram 未授权发送者通知可配置** ([#10400](https://github.com/zeroclaw-labs/zeroclaw/issues/10400))：增强 UX，允许操作员自定义通知内容以匹配授权路径。

## 7. 用户反馈摘要

*   **痛点**：
    *   **多租户安全性**：用户（如 @metalmon）明确指出当前模型在多代理部署下存在数据泄露风险（#9647, #5982），迫切需要隔离。
    *   **终端兼容性**：ZeroCode 在 Linux 环境下的剪贴板操作（#11418）和 Telegram 频道线程中的状态显示（#11416）存在问题，影响日常使用体验。
    *   **插件生命周期管理**：插件安装、更新和迁移过程中的锁文件和事务一致性问题（#11360, #11358, #11562）导致操作失败或状态不一致。
*   **满意点/进展**：
    *   **Discord 插件验证**：用户确认 v0.8.6 中 Discord 入站/出站功能正常工作（#10999），尽管状态标记为 blocked，但核心功能已验证。
    *   **Web UI 稳定性**：刷新页面导致提示词丢失的问题（#11517）已修复，提升了 Web 聊天的可靠性。

## 8. 待处理积压

*   **长期未响应的高风险 Issue**：
    *   [**#5982** Per-sender RBAC](https://github.com/zeroclaw-labs/zeroclaw/issues/5982)：创建于 2026-04-22，已过去半年，虽有方向共识，但实现进度需加速。
    *   [**#9647** Knowledge Graph Security](https://github.com/zeroclaw-labs/zeroclaw/issues/9647)：创建于 2026-08-01，S0 级安全问题，修复 PR #9745 已开放但尚未合并，需维护者优先处理。
    *   [**#9394** Gateway Pairing Security](https://github.com/zeroclaw-labs/zeroclaw/issues/9394)：创建于 2026-07-26，P1 优先级，涉及配对码不过期等安全缺陷，尚无明确修复计划。
*   **积压的 XL 大小 PR**：
    *   [**PR #11301**](https://github.com/zeroclaw-labs/zeroclaw/pull/11301) 和 [**PR #11265**](https://github.com/zeroclaw-labs/zeroclaw/pull/11265) 等涉及核心配置、安全和身份访问的大规模 PR 需要维护者进行深度审查，避免长期阻塞。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 (2026-10-30)

### 1. 今日速览
PicoClaw 在 24 小时内保持了较高的开发活跃度，尽管没有新的 Issue 提出，但集中清理并关闭了 **20 个 Pull Request**。这些 PR 主要涉及安全加固、多渠道适配（Feishu、iMessage、MQTT、Weixin）以及核心 Agent 架构的优化（Sub-turns PoC）。项目当前处于功能丰富化与基础设施成熟的过渡阶段，没有发布新版本，但底层能力得到了显著增强。整体评估：项目健康状况良好，社区贡献活跃，代码库正在通过批量合并解决技术债务。

### 2. 版本发布
**无新版本发布。**

### 3. 项目进展
今日合并/关闭的 PR 主要集中在以下几个关键领域，展示了项目向多模态、高安全性和复杂代理架构方向的演进：

*   **安全与健壮性加固**：
    *   **[增强] Exec 工具环境净化** ([#1258](https://github.com/sipeed/picoclaw/pull/1258))：为执行工具引入了可配置的环境变量白名单/黑名单机制，防止 LLM 覆盖敏感变量（如 `PATH`, `LD_PRELOAD`），提升了沙箱安全性。
    *   **[修复] 批量合并稳定性修复**：多个由 `@xuwei-xy` 发起的 PR ([#1541](https://github.com/sipeed/picoclaw/pull/1541), [#1559](https://github.com/sipeed/picoclaw/pull/1559), [#1555](https://github.com/sipeed/picoclaw/pull/1555), [#1552](https://github.com/sipeed/picoclaw/pull/1552), [#1545](https://github.com/sipeed/picoclaw/pull/1545), [#1542](https://github.com/sipeed/picoclaw/pull/1542), [#1549](https://github.com/sipeed/picoclaw/pull/1549)) 集中处理了媒体临时目录集中管理、Channel DoS 防护、凭据加密、OAuth 网关及技能助手等问题。这表明项目正在通过批量集成来解决长期积累的稳定性 Bug。

*   **多渠道与工具生态扩展**：
    *   **[功能] 飞书媒体交付** ([#1156](https://github.com/sipeed/picoclaw/pull/1156))：新增 `send_file` 工具，允许 Agent 主动在对话中发送图片或文件，并集成 `MediaStore` 优化内存传递。
    *   **[功能] iMessage 支持** ([#1268](https://github.com/sipeed/picoclaw/pull/1268))：增加 iMessage 渠道支持，同时加入了 LLM API 调用日志、会话日志、停止命令及隐私清洗器。
    *   **[功能] MQTT 渠道** ([#2653](https://github.com/sipeed/picoclaw/pull/2653))：添加 MQTT 渠道支持，扩展了物联网或低频消息场景下的 Agent 交互能力。
    *   **[增强] 微信渠道优化** ([#2606](https://github.com/sipeed/picoclaw/pull/2606))：增强了微信渠道的多实例支持和配置管理，改进了非法通道名称的校验。

*   **Agent 核心架构演进**：
    *   **[功能] Sub-turns PoC** ([#1584](https://github.com/sipeed/picoclaw/pull/1584))：引入层级代理执行的初步概念（Sub-turns），这是支持多代理引导和可中断执行的基础，对应 Issue #1316 的提案。
    *   **[功能] 多代理协作框架 WIP** ([#423](https://github.com/sipeed/picoclaw/pull/423))：虽然标记为 WIP，但该 PR 推进了基于 Blackboard 模式的多代理共享上下文池及代理交接机制。

*   **Provider 适配与修复**：
    *   **[功能] Z.AI 提供商支持** ([#177](https://github.com/sipeed/picoclaw/pull/177))：新增 Zhipu AI 国际版支持，包括自动路由到专用 Coding API。
    *   **[修复] 自定义模型协议支持** ([#664](https://github.com/sipeed/picoclaw/pull/664))：修复了未知协议（如 `zai-org/GLM-4.7`）导致的创建提供商错误。
    *   **[修复] Claude 工具调用与 OAuth** ([#1222](https://github.com/sipeed/picoclaw/pull/1222))：修复了 Claude 模型的工具调用字段填充问题，并更新了 OAuth token 检测逻辑以支持新的 beta header。
    *   **[文档] Antigravity 风险警告** ([#1205](https://github.com/sipeed/picoclaw/pull/1205))：在文档中添加了关于 Google Cloud Code Assist 服务条款及账号封禁风险的醒目警告。

### 4. 社区热点
今日无活跃的 Issue 讨论（0 条新开/活跃），因此社区热点主要体现为已关闭 PR 中的功能需求实现情况。
*   **诉求分析**：
    *   **即时反馈体验**：PR [#873](https://github.com/sipeed/picoclaw/pull/873) 解决了飞书渠道中 Agent 处理消息时的“黑盒”体验，通过增加工具进度反馈（verbose toggle）提升了用户体验。
    *   **隐私与安全**：PR [#1268](https://github.com/sipeed/picoclaw/pull/1268) 和 [#1258](https://github.com/sipeed/picoclaw/pull/1258) 反映出社区对日志隐私清洗和执行环境安全的高度关注。
    *   **CI 优化**：PR [#2516](https://github.com/sipeed/picoclaw/pull/2516) 禁用了定时的 sync-rebase 触发器，仅保留手动触发，旨在减少不必要的 CI 资源消耗。

### 5. Bug 与稳定性
今日没有新开 Bug Report，但通过合并的 PR 修复了多个已知问题：
*   **[高严重性] 执行环境安全风险**：Exec 工具之前可能暴露敏感环境变量，已被 [#1258](https://github.com/sipeed/picoclaw/pull/1258) 修复。
*   **[中严重性] 媒体文件访问路径限制**：媒体临时目录未纳入 Agent 读取允许路径，导致工具无法访问生成的临时文件，已被 [#1541](https://github.com/sipeed/picoclaw/pull/1541) 修复。
*   **[中严重性] 特定 Provider 协议错误**：使用自定义前缀模型（如 Z.AI GLM）时发生 `unknown protocol` 错误，已被 [#664](https://github.com/sipeed/picoclaw/pull/664) 修复。
*   **[中严重性] Claude 工具调用失效**：工具调用结构体字段缺失导致 Claude 模型无法正确调用工具，已被 [#1222](https://github.com/sipeed/picoclaw/pull/1222) 修复。
*   **[低严重性] 渠道 DoS 防护**：Channel 层存在潜在的拒绝服务风险，已在 [#1541](https://github.com/sipeed/picoclaw/pull/1541) 中加固。

### 6. 功能请求与路线图信号
基于合并的 PR，以下功能已被纳入代码库，预示着下一版本的可能特性：
*   **多代理系统（Multi-Agent System）**：Sub-turns PoC (#1584) 和多代理协作框架 (#423) 表明项目正逐步从单代理向支持子任务委派、中断恢复及共享上下文的多代理架构演进。
*   **更广泛的渠道覆盖**：iMessage (#1268), MQTT (#2653), Weixin 增强 (#2606) 的合并表明项目致力于降低接入各类消息平台和物联网设备的门槛。
*   **企业级安全与合规**：环境变量净化 (#1258), 凭据加密 (#1542 中的 #1522), 以及 Antigravity 文档警告 (#1205) 显示项目正在增强面向生产环境部署的安全属性。

### 7. 用户反馈摘要
由于今日无新开 Issue，且所有 PR 的评论数为 `undefined` (即 0 或无数据)，无法从今日数据中提炼新的用户痛点。
*   **历史痛点回顾（基于今日合并的修复）**：
    *   **透明度不足**：用户曾因 Agent 执行复杂工具调用时的静默状态而困惑，现通过 [#873](https://github.com/sipeed/picoclaw/pull/873) 增加进度反馈予以改善。
    *   **集成摩擦**：Z.AI 用户曾遭遇协议识别错误，现通过 [#177](https://github.com/sipeed/picoclaw/pull/177) 和 [#664](https://github.com/sipeed/picoclaw/pull/664) 解决了这一特定提供商的集成问题。

### 8. 待处理积压
*   **CI 定时任务清理**：PR [#2516](https://github.com/sipeed/picoclaw/pull/2516) 已关闭定时任务，这是一个良好的运维实践。
*   **多代理框架成熟度**：PR [#423](https://github.com/sipeed/picoclaw/pull/423) 标记为 WIP，虽然已关闭（可能是作为 PoC 存档或拆分），但完整的稳定版多代理框架可能仍需后续迭代。建议维护者关注多代理协作的稳定化实现。
*   **长期未更新 Issue**：由于今日无活跃 Issue，积压队列似乎处于静默状态，这可能意味着项目当前正专注于代码合并阶段，而非新的需求收集阶段。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

**QwenPaw 项目动态日报 (2026-10-30)**

**1. 今日速览**
QwenPaw 项目今日保持极高活跃度，过去24小时内处理了 **41条 PR** 和 **15条 Issues**，其中27个PR待合并，14个已闭环。项目当前主要精力集中在修复 **2.3.0-beta.1 版本**的启动稳定性问题及核心模块（Memory, Visual Compression, Desktop Build）的回归缺陷。尽管今日无新版本发布，但关于本地模型插件化、OpenViking 记忆后端及 SDK 架构重设计的 PR 显示团队正在推进大规模底层重构。社区对桌面端体验（路径编码、资源打包）及 CLI 安全性的关注度高，整体处于 Beta 版本收敛与功能预研并行阶段。

**2. 版本发布**
*今日无新版本发布。*

**3. 项目进展**
今日合并/关闭的 14 条 PR 主要集中在稳定性修复与架构优化，标志着 2.3.0-beta.1 关键阻断问题的解决：
*   **插件加载稳定性修复**：合并了 [PR #8497](https://github.com/agentscope-ai/QwenPaw/pull/8497)，修复了因 `importlib` 缓存刷新失败导致的后端插件无法加载问题（关联 Issue #8473），这是 Beta 版的核心阻断项。
*   **渠道命令路由优化**：合并了 [PR #8480](https://github.com/agentscope-ai/QwenPaw/pull/8480)，解决了飞书、QQ 等渠道在引用回复场景下无法正确解析 `/stop` 等控制命令的问题，提升了多渠道交互的准确性。
*   **思考模式参数对齐**：合并了 [PR #8358](https://github.com/agentscope-ai/QwenPaw/pull/8358)，修正了 OpenAI 兼容提供商中 `thinking` 参数与控制台显示状态不一致的问题，确保了模型推理配置的可靠性。
*   **官网评估系统上线**：合并了 [PR #8253](https://github.com/agentscope-ai/QwenPaw/pull/8253)，增加了基于 JSON 驱动的双语评估排行榜，为社区提供了更透明的性能基准参考。

**4. 社区热点**
*   **[PR #7613](https://github.com/agentscope-ai/QwenPaw/pull/7613) OpenViking 记忆插件引入**：由首次贡献者提交的大型 PR（size/XXL），引入了 OpenViking 记忆后端，支持自动召回与持久化。社区正在激烈讨论其并发安装 ID 处理及 REST API 交互模式，反映出社区对**长程记忆管理**的高度需求。
*   **[Issue #6116](https://github.com/agentscope-ai/QwenPaw/issues/6116) "Doom Loop" 无限循环问题**：该 Issue 虽标记为 wontfix，但今日仍有 9 条评论活跃。用户反映 Agent 在单轮对话中重复调用相同工具直至触发警告，浪费大量 Token 和 API 成本。这揭示了当前 Agent 循环控制机制在成本敏感度上的不足，是社区最痛点的体验问题之一。
*   **[PR #8499](https://github.com/agentscope-ai/QwenPaw/pull/8499) 本地模型管理插件化**：一个 WIP 状态的超大 PR（size/XXXL），旨在将 llama.cpp 等本地模型管理从核心解耦为 Plugin Provider。这不仅是代码结构的重构，更暗示了 QwenPaw 正在向**模块化、插件化架构**演进，以支持更灵活的本地推理方案。

**5. Bug 与稳定性**
今日报告的 Bug 主要集中在桌面端构建与资源加载，按严重程度排列如下：

| 严重程度 | Issue/描述 | 状态 | 修复 PR | 关联链接 |
| :--- | :--- | :--- | :--- | :--- |
| **High** | **[Bug] Auto-Dream 静默丢弃记忆**：提取步骤解析失败时仍写入 Checkpoint，导致数据丢失且无法重试。 | Open | 暂无 | [Issue #8500](https://github.com/agentscope-ai/QwenPaw/issues/8500) |
| **High** | **Desktop Build 缺失视觉压缩资源**：PyInstaller 打包未包含 `atlas-gray-native.ts` 等资产，导致 Visual Compact 功能在 Windows 桌面端完全失效。 | Open | 暂无 | [Issue #8488](https://github.com/agentscope-ai/QwenPaw/issues/8488) |
| **Medium** | **Whisper 设置页内存泄漏**：打开语音转录设置页会同步 `import whisper`，导致服务端进程 RSS 增加约 690MB 且无法释放。 | Open | 暂无 | [Issue #8490](https://github.com/agentscope-ai/QwenPaw/issues/8490) |
| **Low** | **桌面端 HTML 预览中文路径失效**：点击"在浏览器中打开"时，若路径含中文或位于工作区外，Edge 浏览器报"找不到文件"。 | Open | 暂无 | [Issue #8502](https://github.com/agentscope-ai/QwenPaw/issues/8502) |
| **Fixed** | **2.3.0-beta.1 插件加载失败**：所有后端插件因 `importlib.invalidate_caches()` 报错无法启动。 | Closed | [PR #8497](https://github.com/agentscope-ai/QwenPaw/pull/8497) | [Issue #8473](https://github.com/agentscope-ai/QwenPaw/issues/8473) |

**6. 功能请求与路线图信号**
*   **结构化决策持久化**：用户请求增加 `save_decision()` API [Issue #6189](https://github.com/agentscope-ai/QwenPaw/issues/6189)，以防止上下文压缩导致关键决策（如技术选型）丢失。该 Issue 今日被关闭，但结合 PR #7613（OpenViking 记忆）和 PR #8457（自动召回注入），**长期记忆与状态保持**极可能是 2.3.0 正式版的重点功能。
*   **Finer 文件/工具守卫控制**：用户希望将文件守卫从"黑名单"升级为支持"只读"或"白名单项目目录"的细粒度控制 [Issue #4356](https://github.com/agentscope-ai/QwenPaw/issues/4356)。此 Issue 今日关闭，可能因当前架构限制被推迟至未来版本，但**沙箱权限模型**的精细化是显而易见的趋势。
*   **Hub 模式管理员权限增强**：增加用户密码重置功能 [Issue #7740](https://github.com/agentscope-ai/QwenPaw/issues/7740)，今日关闭，暗示多租户管理功能可能随 2.3.0 稳定。

**7. 用户反馈摘要**
*   **痛点 - 资源浪费与静默失败**：用户对 Agent 陷入循环（Issue #6116）和 Auto-Dream 静默丢失数据（Issue #8500）表示强烈不满，认为这浪费了昂贵的 API 调用且难以排查。用户期望系统具备**失败可见性**和**资源熔断**机制。
*   **痛点 - 桌面端体验割裂**：Windows 桌面用户反馈路径中文编码、缺失静态资源（Issue #8488, #8502）导致功能不可用。这表明桌面端构建流程（PyInstaller）与 Web 端的一致性测试不足。
*   **诉求 - 安装简化**：用户询问如何简便安装 QwenPaw [Issue #8498](https://github.com/agentscope-ai/QwenPaw/issues/8498)，反映出文档或一键脚本对新手仍有一定门槛。
*   **安全性关注**：用户注意到 CLI `env list` 命令默认明文显示 API Key [PR #8501](https://github.com/agentscope-ai/QwenPaw/pull/8501)，社区已提交 PR 进行掩码处理，体现了良好的安全响应速度。

**8. 待处理积压**
*   **[PR #7874](https://github.com/agentscope-ai/QwenPaw/pull/7874) SDK 和控制平面重构**：创建于 9 月 19 日，size/XXXL。虽然今日有更新，但作为架构级变更，其漫长的 Review 周期可能阻塞其他 PawApp 相关特性。建议维护者明确该 PR 的优先级或拆分任务。
*   **[Issue #4129](https://github.com/agentscope-ai/QwenPaw/issues/4129) Rewind 功能**：创建于 5 月 8 日，用户多次提及在模型"幻觉"或文件损坏后回滚上下文的需求。该功能在 Claude Code 等竞品中已有成熟实现，QwenPaw 若纳入 2.3.0 将显著提升可用性，目前仍无实质进展。
*   **[PR #8034](https://github.com/agentscope-ai/QwenPaw/pull/8034) 媒体内联限制**：虽已 Under Review，但涉及核心 Provider 逻辑，修复多兆级请求体问题对降低用户带宽成本至关重要，需尽快合并。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报 (2026-10-30)

## 1. 今日速览
项目今日保持极高活跃度，过去24小时内共更新 **834** 条 Issue/PR 记录（Issues 334 条，PRs 500 条），其中已关闭/合并 **82** 条，显示核心开发团队正在密集解决积压问题。社区对**统一网关（Unified Gateway）**引发的状态同步、会话恢复及并发锁冲突问题的讨论尤为热烈。今日无新版本发布，重点投入在修复 `gateway` 组件的稳定性及 `Anthropic/OpenAI` 模型提供商的兼容性 Bug。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日共有 53 条 PR 完成合并或关闭，虽然数量较新增（447 条待合并）少，但主要集中在修复近期功能迭代引入的回归问题。
- **Windows 更新机制优化**：PR [#146396](https://github.com/NousResearch/hermes-agent/pull/146396) 修复了 Windows 下 ctypes 类型泄漏导致的内存增长问题，提升了长期运行网关的稳定性。
- **Webapp 与多档案支持**：PR [#146395](https://github.com/NousResearch/hermes-agent/pull/146395) 修复了次级档案（secondary profile）在 Webapp 标签页中无法正确保持实例醒目的逻辑错误。
- **工具链兼容性**：PR [#146695](https://github.com/NousResearch/hermes-agent/pull/146695) 修复了使用 Draft-07 Tuple Schema 的 MCP 工具在 Claude 和 Kimi 模型中导致请求 400 错误的问题。

## 4. 社区热点
今日讨论最激烈的 Issue 集中在**远程会话管理**与**网关统一化后的副作用**。

1.  **[Bug] 远程后端桌面会话无法在本地恢复** ([#139818](https://github.com/NousResearch/hermes-agent/issues/139818))
    - **热度**：34 评论，3 👍。
    - **核心诉求**：用户通过 `hermes serve` 连接远程后端建立的会话，在网关重启或进程消失后无法通过 `session.resume` 恢复，抛出 `not_found` 错误。这阻碍了跨设备协作的核心场景。
2.  **[Feature] 支持远程 Hermes Agent 配合本地工具执行** ([#18715](https://github.com/NousResearch/hermes-agent/issues/18715))
    - **热度**：33 评论，43 👍（高赞）。
    - **核心诉求**：用户希望将 Agent 推理能力部署在云端/服务器（拥有长期记忆和配置），但将工具（如终端、文件读写）保留在本地机器执行。这是典型的“云脑本地手”架构需求。
3.  **[Bug] 统一网关 (#106742) 合并后的遗留问题追踪** ([#143547](https://github.com/NousResearch/hermes-agent/issues/143547))
    - **热度**：27 评论。
    - **核心诉求**：统一网关将所有本地对话（CLI, TUI, Desktop, Bots）整合至单一进程后，引发了 Cron、Kanban 和消息传递的多个回归 Bug，该 Issue 作为追踪器汇总了这些问题。
4.  **[Bug] Cron 工作器在数据库锁竞争下崩溃** ([#135487](https://github.com/NousResearch/hermes-agent/issues/135487))
    - **热度**：10 评论，标记为 **P1**。
    - **核心诉求**：当 `executions.db` 锁持有时间超过 5 秒超时阈值时，Cron worker 无法重试而直接退出，导致定时任务丢失。

## 5. Bug 与稳定性
今日报告了大量 P1/P2 级别稳定性 Bug，主要集中在并发控制和状态一致性上。

| 严重程度 | 组件 | 问题描述 | 状态 | 相关链接 |
| :--- | :--- | :--- | :--- | :--- |
| **P1** | Cron | `database is locked` 错误导致 Worker 无法自愈，任务丢失 | 有报告 | [#135487](https://github.com/NousResearch/hermes-agent/issues/135487) |
| **P1** | Agent | Anthropic 凭证池轮换逻辑错误导致计费异常（两个订阅按一个计费） | 有报告 | [#118379](https://github.com/NousResearch/hermes-agent/issues/118379) |
| **P2** | Gateway | 仪表盘 (Dashboard) 在 Gateway 持有状态时变更返回 409 冲突 | 有报告 | [#138915](https://github.com/NousResearch/hermes-agent/issues/138915) |
| **P2** | Desktop | 会话恢复逻辑错误：尝试恢复已压缩（ended）的旧会话，导致模型切换失败 | 有报告 | [#143767](https://github.com/NousResearch/hermes-agent/issues/143767) |
| **P2** | Kanban | 并发 Worker 在保存时因 Gateway 延迟崩溃，报错 "execution unknown" | 有报告 | [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) |
| **P2** | Slack | 依赖 `slack-sdk >= 3.44` 时，状态指示器静默失败 | 有报告 | [#110374](https://github.com/NousResearch/hermes-agent/issues/110374) |

*注：多数 P2 Bug 目前处于 "有报告" 或 "正在调查" 状态，建议关注后续 Fix PR。*

## 6. 功能请求与路线图信号
- **移动端原生应用与语音通话**：Issue [#11911](https://github.com/NousResearch/hermes-agent/issues/11911) 请求 iOS/Android 原生应用支持实时语音通话。结合已有 PR [#128926](https://github.com/NousResearch/hermes-agent/pull/128926) 正在集成 OpenAI ChatGPT 登录支持，暗示官方可能正在完善多模态交互和统一认证体系。
- **OpenAI ChatGPT 计划集成**：PR [#128926](https://github.com/NousResearch/hermes-agent/pull/128926) 允许用户通过官方 OAuth 流程使用 ChatGPT 订阅额度，这将是降低用户接入门槛的重要路线图信号。
- **前端独立安装**：Issue [#38519](https://github.com/NousResearch/hermes-agent/issues/38519) 强烈要求 Windows 桌面端支持仅安装前端并连接远程 Agent，这与 #18715 的诉求一致，预计将成为下个版本的配置选项。

## 7. 用户反馈摘要
- **痛点**：**会话状态管理混乱**。用户在切换设备、重启网关或进行模型切换时，频繁遇到会话无法恢复、上下文丢失或状态不同步的问题（如 #139818, #143767）。
- **满意度**：社区对 **统一网关 (Unified Gateway)** 的架构方向表示认可，但对其合并后的稳定性回归（副作用）表示担忧。
- **使用场景**：越来越多的用户倾向于使用 **"远程推理 + 本地执行"** 的混合模式，对这种架构的支持成为核心需求。
- **负面反馈**：部分用户指出 CLI 错误提示不够友好（如错误建议使用 `sudo` 导致权限问题，见 PR #146697 修复）。

## 8. 待处理积压
- **长期未决 P2 Bug**：
    - [#105758](https://github.com/NousResearch/hermes-agent/issues/105758)：Lifecycle guard 误报阻断 Node.js CLI，该问题自 9 月 8 日提出，至今无明确 Fix PR，涉及底层安全机制。
    - [#122402](https://github.com/NousResearch/hermes-agent/issues/122402)：Ubuntu 下 `python-olm` 编译失败导致的安装兼容性问题，标记为 `awaiting-reporter`，阻碍 Linux 用户安装 Matrix 加密模块。
- **积压 PR**：
    - [#80041](https://github.com/NousResearch/hermes-agent/pull/80041)：修复桌面端更新后分支停留问题，自 8 月提交，已积压 2 个多月，涉及安装机制核心逻辑。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

**AstrBot 项目动态日报：2026-10-30**

### 1. 今日速览
过去 24 小时内，AstrBot 社区活跃度较高，累计产生 14 条 Issue 更新（12 条新开/活跃，2 条关闭）和 29 条 Pull Request（26 条待合并，3 条已合并/关闭）。项目当前聚焦于提升核心框架的稳定性与 API 兼容性，尤其是针对不同 LLM 提供商（Gemini、Anthropic、DeepSeek）的消息处理机制。社区针对 QQ 官方机器人平台的适配器 Bug 提出了大量反馈，且已涌现多个针对性修复方案。尽管今日无重大版本发布，但针对上下文截断、时间戳处理及消息发送逻辑的改进已在积极推进中，整体健康度良好，社区响应迅速。

### 2. 版本发布
今日无新版本发布。

### 3. 项目进展
今日共合并/关闭 3 条 Pull Request，主要涉及：
*   **群聊上下文时间改进**：PR #10864（已关闭/合并）优化了群聊消息的时间上下文，旨在修复积压消息导致的时间判断错误，关联 Issue #10859。
*   **其他合并进展**：虽然部分 PR 显示为 OPEN 状态，但数据中提及 3 条已合并/关闭，结合上下文主要推进了针对特定平台适配器和核心逻辑的修复。整体而言，项目正在通过精细化调整 LLM Provider 的数据处理逻辑，提升系统的鲁棒性。

### 4. 社区热点
今日讨论最活跃的焦点集中在**多机器人共存环境的防循环机制**以及**QQ 官方平台的消息收发异常**。
*   **机器人无限对话循环**：Issue #10724 提出了高优先级的痛点，即 AstrBot 在群聊中与 QQ 官方或其他第三方机器人互 @ 导致无限对话，目前社区正在讨论增加来源过滤与回环熔断机制。
    *   链接：https://github.com/AstrBotDevs/AstrBot/issues/10724
*   **QQ 官方机器人 WebSocket 消息丢失**：Issue #10839 和 #10840 集中反映了 QQ 官方机器人在无 `msg_id` 或引用消息解析时的逻辑错误，导致消息未发送或内容解析错误，多位开发者已提交相关 PR 进行修复。
    *   链接：https://github.com/AstrBotDevs/AstrBot/issues/10839

### 5. Bug 与稳定性
今日报告的 Bug 主要涉及底层架构兼容性与特定提供商的 API 限制，按严重程度排列如下：

*   **[严重] FAISS 知识库在无 AVX CPU 上导致进程崩溃**
    *   描述：在不支持 AVX 的 CPU（如 Intel Pentium G840）上创建知识库时，FAISS 初始化触发 SIGILL 非法操作码，导致 AstrBot 进程崩溃。
    *   状态：已报告，暂无明确 Fix PR。
    *   链接：https://github.com/AstrBotDevs/AstrBot/issues/9606
*   **[高] Anthropic 适配器无法处理空字符串 User 消息**
    *   描述：会话历史中存在 `content` 为空的 User 消息时，导致所有 Anthropic 请求返回 400 错误。
    *   状态：已有多个 Fix PR 待合并（#10862, #10853）。
    *   链接：https://github.com/AstrBotDevs/AstrBot/issues/10852
*   **[高] Gemini 原生 Provider 历史回放导致 400 循环**
    *   描述：当回退模型（OpenAI 兼容）处理请求后，生成的 `reasoning_content` 在 Gemini 原生 Provider 回放历史时产生空 text part，导致持续 400 错误。
    *   状态：已有 Fix PR #10867 待合并。
    *   链接：https://github.com/AstrBotDevs/AstrBot/issues/10866
*   **[中] 上下文截断导致 DeepSeek 前缀缓存命中率低**
    *   描述：`ContextTruncator` 的无状态滑动窗口导致每轮 Prompt 头部变化，使支持前缀缓存的供应商（如 DeepSeek）命中率从潜在的 96% 降至 40%-57%。
    *   状态：已关闭（可能已有方案或后续跟进），Issue #10847。
    *   链接：https://github.com/AstrBotDevs/AstrBot/issues/10847
*   **[中] 群聊消息显示截断**
    *   描述：插件行为页中长指令显示不全。
    *   状态：已有 Fix PR #10860 待合并。
    *   链接：https://github.com/AstrBotDevs/AstrBot/issues/10856

### 6. 功能请求与路线图信号
*   **插件页面结构化错误传递**：Issue #10849 指出插件桥接层丢弃了具体的错误字段（如 `code`, `confirmed`），导致前端只能显示兜底错误。已有 PR #10850 正在推进该改进，预计将显著提升插件开发体验。
*   **可移植消息按钮（Portable Message Buttons）**：PR #9809 提议增加跨平台的回调按钮和 URL 链接组件，虽为长期 PR，但体现了项目向富交互媒体消息发展的路线图信号。
*   **唤醒词与内置指令的关联提示**：Issue #10857 建议在 UI 中说明删除“/”唤醒词会导致 `/sid` 等指令失效。已有 PR #10861 针对此问题进行了文档/UI 优化。
*   **CUA 镜像选择优化**：Issue #10844 建议允许用户选择 CUA 镜像的容器或 VM 形式，以降低 QEMU 依赖门槛。

### 7. 用户反馈摘要
*   **痛点**：用户在运行群聊机器人时，对于多 Bot 共存场景下的“无限对话”缺乏控制手段，容易消耗资源并干扰群聊秩序（#10724）。
*   **场景**：在 Windows 11 及 Docker 部署环境下，用户发现时间戳处理不够精确，导致模型在处理积压消息时错误地将“今天中午”判断为“昨晚”，影响了时间敏感型任务的准确性（#10859）。
*   **满意度**：社区对于框架层面的性能优化（如避免深拷贝 #10858）和错误处理机制（如插件加载超时 #10855）表现出较高关注度，反馈多集中在提升底层稳定性和调试便利性上。

### 8. 待处理积压
*   **Issue #9606**：FAISS 兼容性 Bug 创建于 2026 年 8 月，涉及特定硬件环境下的崩溃，至今仍处于 OPEN 状态，且未有明确的修复 PR，建议维护者评估是否需要限制或修复该硬件下的知识库功能。
*   **PR #9809**：该功能 PR 创建于 8 月 25 日，涉及较大的消息组件重构，至今仍在待合并队列中，需关注其进度。
*   **Issue #10832**：关于 QQ 官方 Markdown 策略语义混乱的问题，虽然已有 1 条评论，但逻辑复杂度高，可能存在理解偏差，需维护者介入明确设计意图。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报 (2026-10-30)

## 1. 今日速览
DeepSeek Harness 在 2026-10-30 期间保持了极高的社区活跃度，24 小时内共产生 180 条 Discussions 更新，其中多起高热度问题集中在过去 3-4 天内创建且持续发酵。尽管今日无新的 GitHub Releases 发布（版本号停留在 0.2.1-rc.3），但社区讨论揭示了**桌面端（Desktop）稳定性**是当前最严重的阻碍因素。最突出的危机是“认证 Cookie 无限累积导致 HTTP 431 错误”引发的启动失败循环，以及 Windows 平台沙箱模式下 Shell 工具的全面失效。项目目前处于 0.2.1 Release Candidate 阶段，修复核心可用性 Bug 是最高优先级。

## 2. 版本发布
**无新版本发布。**
截至 2026-10-30，最新稳定/候选版本仍为 `0.2.1-rc.3`。由于该仓库未启用 PR 流程，代码合并直接通过 Releases 落地，今日无新的 changelog 发布，意味着 0.2.1 正式版尚未推出，当前焦点在于解决 RC 阶段暴露的阻断性问题。

## 3. 项目进展
鉴于无新 Release，今日无通过官方渠道“合并上线”的功能或修复。然而，从 Discussions 的更新频率来看，维护者正在积极响应当前的紧急 Bug 报告，尤其是针对 Desktop 端认证和 Windows 沙箱机制的问题。项目整体处于**“冻结功能、专注稳定性”**的 RC 收尾阶段。

## 4. 社区热点
今日讨论最活跃、用户关注度最高的议题主要集中在桌面端可用性和工具链兼容性上：

1.  **[Bug] Desktop "Web authentication failed" / Auth cookies overflow (HTTP 431)**
    *   **链接**: [#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924), [#10632](https://github.com/deepseek-ai/deepseek-harness/discussions/10632), [#11397](https://github.com/deepseek-ai/deepseek-harness/discussions/11397), [#11374](https://github.com/deepseek-ai/deepseek-harness/discussions/11374)
    *   **热度分析**: 这是今日最严重的用户痛点。多个独立用户（@Mooling0602, @Light-EI, @lookyouforever, @terryzwt）报告在 Linux、Windows、macOS 上反复重启应用后，旧的 `dsh-auth-*` Cookies 未在会话结束时清除，导致 Host 头超过 16KB 限制，应用直接无法启动。评论数高达 28 条（#9924），表明大量用户被阻断。
    *   **诉求**: 用户迫切需要一个热修复或手动清除 Cookie 的脚本/指令，以恢复应用的基本可用性。

2.  **[Bug] Windows Desktop Shell tools die with "PTY shell exited during startup"**
    *   **链接**: [#8322](https://github.com/deepseek-ai/deepseek-harness/discussions/8322), [#8420](https://github.com/deepseek-ai/deepseek-harness/discussions/8420)
    *   **热度分析**: Windows 用户在开启 `workspace-write` 沙箱模式时，所有 Shell 命令（pwsh, cmd）均因 ConPTY 初始化失败或权限/ACL 问题而报错（exit code 0xC0000142）。该问题自 9 月底提出，至今未解决，严重影响 Windows 用户核心功能的使用。

3.  **[Q&A] cua_driver_native__* tools not exposed to agents**
    *   **链接**: [#11207](https://github.com/deepseek-ai/deepseek-harness/discussions/11207)
    *   **热度分析**: 高级用户反馈 Native Computer Use 工具在 `2.0.20-next` 中注册了但未在 Agent 的工具表中暴露，导致无法调用。这暗示了底层架构在工具注入逻辑上可能存在回归或配置错误。

## 5. Bug 与稳定性
今日报告的 Bug 严重程度极高，多数为**阻断性（Blocker）**：

*   **[CRITICAL] Desktop 启动崩溃 (Auth Cookie Overflow)**
    *   **现象**: 应用反复重启后，`Cookie` 请求头超限，Web 认证失败，无法进入主界面。
    *   **影响范围**: 跨平台 (Linux NixOS, Windows 11, macOS arm64)。
    *   **状态**: 开放中，无官方 Fix PR 已合并至 RC.3。
    *   **相关链接**: [#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924)

*   **[CRITICAL] Windows 沙箱模式 Shell 工具全面失效**
    *   **现象**: `workspace-write` 模式下，PTY 启动即退出，所有命令执行失败。
    *   **影响范围**: Windows 桌面端用户。
    *   **状态**: 开放中，疑似 GUI 子系统 Electron 作为 ACL 沙箱宿主与 ConPTY 的兼容性问题。
    *   **相关链接**: [#8322](https://github.com/deepseek-ai/deepseek-harness/discussions/8322)

*   **[HIGH] 插件市场更新失败 (HMR 冲突)**
    *   **现象**: 在 Desktop profile 下，插件市场更新任何插件均失败，错误提示 `install_bundle` 因 HMR 可用而拒绝已安装包。
    *   **状态**: 开放中，导致用户无法升级插件。
    *   **相关链接**: [#9936](https://github.com/deepseek-ai/deepseek-harness/discussions/9936)

*   **[MEDIUM] DSML 输出泄漏**
    *   **现象**: 当模型认为有工具可用但实际未提供时，DSML 标记直接输出到普通文本中，破坏用户体验。
    *   **状态**: 开放中，社区正在讨论触发条件。
    *   **相关链接**: [#10100](https://github.com/deepseek-ai/deepseek-harness/discussions/10100)

## 6. 功能请求与路线图信号
*   **Workspace 多根路径支持**:
    *   **链接**: [#2474](https://github.com/deepseek-ai/deepseek-harness/discussions/2474)
    *   **分析**: 用户希望 Workspace 模型支持“主项目根 + 附加目录”的结构，以应对复杂的多仓库开发场景。这是一个结构性改进，可能对模型架构有影响，建议列入 0.2.2 或 0.3.0 路线图。
*   **ACP 扩展：不取消当前回合进行转向 (Steer)**:
    *   **链接**: [#593](https://github.com/deepseek-ai/deepseek-harness/discussions/593)
    *   **分析**: 现有 ACP 仅支持 `prompt` 和 `cancel`。用户希望在不终止当前任务的情况下注入新指令以修正方向。由于 `agent.steer()` 核心已存在，此功能主要为 ACP 桥接层的映射工作，开发成本较低，有望在下一版中实现。
*   **飞书/Lark 通道 SDK 兼容性更新**:
    *   **链接**: [#10074](https://github.com/deepseek-ai/deepseek-harness/discussions/10074)
    *   **分析**: 第三方桥接插件因 Pin 旧版 SDK 而无法适配 0.2.x。需要官方发布 SDK 事件契约文档或迁移指引，否则生态插件将长期停留在旧版本，阻碍 0.2.x 的全面推广。

## 7. 用户反馈摘要
*   **痛点**: 桌面端（Desktop）的体验远落后于 Web 端。Windows 用户尤其受挫，因为沙箱和 Shell 问题迫使他们要么放弃沙箱（安全隐患），要么完全无法使用核心功能。
*   **满意/不满意**: 用户认可 Harness 的架构设计和核心 Agent 能力（如 `agent.steer`），但对**工程稳定性**表示不满，特别是涉及认证和进程管理的部分。频繁的版本迭代（RC 号密集）并未解决基础稳定性问题，反而积累了如 Cookie 溢出这类低级但致命的 Bug。
*   **社区互助**: 在微信主群（#1128）中，社区氛围友好，用户之间在分享绕过 Bug 的临时方案（如手动清理 Cookie 路径），显示出强大的自救能力，但也侧面反映了官方修复的滞后。

## 8. 待处理积压
以下问题长期开放且影响广泛，需维护者优先关注：

1.  **#9924 / #10632 / #11397 / #11374**: Auth Cookie Overflow (431 Error)。**建议**: 立即在 0.2.1 正式版发布前，修复 Cookie 清理逻辑或提供官方重置脚本。
2.  **#8322 / #8420**: Windows PTY/Sandbox Failures。**建议**: 若无法快速修复 ConPTY 兼容性问题，考虑在 Windows 端默认禁用沙箱模式或提供“非沙箱”安全模式文档。
3.  **#4531**: Codex Subagent 错误类别未适配。**建议**: 更新 `@openai/codex` 适配器以识别 `misalignmentPolicyViolation`，避免子代理报错被误判为未知错误。
4.  **#11207**: Native Computer Use 工具不可见。**建议**: 检查 `2.0.20-next` 的工具注册逻辑，确保 `cua_driver_native__*` 正确注入到 Agent 上下文。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*