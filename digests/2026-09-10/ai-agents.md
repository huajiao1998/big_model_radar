# OpenClaw 生态日报 2026-09-10

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-09 23:39 UTC

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
**日期：** 2026-09-10  
**分析来源：** GitHub (github.com/openclaw/openclaw)

## 1. 今日速览
OpenClaw 在过去24小时内保持极高活跃度，处理了500条Issue更新和500条PR更新，其中新开/活跃Issue 308条，已关闭192条，显示社区反馈密集且维护者响应迅速。今日无新版本发布，但多个关键稳定性修复（如Gateway挂起、进程泄漏、语音笔记转录）已进入合并审查阶段。项目整体处于“高强度维稳”状态，主要集中在修复近期版本（2026.8.x/9.x）引入的回归问题和提升多代理编排的健壮性。

## 2. 版本发布
*无新版本发布。*

## 3. 项目进展
今日主要进展集中在**运行时稳定性**和**资源管理**的修复上，多个高优先级PR已关闭或待合并：

*   **Gateway挂起修复**：PR #142741 ([链接](https://github.com/openclaw/openclaw/pull/142741)) 解决了定时任务积压导致的Gateway无响应问题，直接影响可用性。
*   **子进程泄漏治理**：PR #143433 ([链接](https://github.com/openclaw/openclaw/pull/143433)) 修复了隔离心跳运行时MCP子进程泄漏问题；同时Issue #97616 ([链接](https://github.com/openclaw/openclaw/issues/97616)) 指出了更广泛的钩子/工具子进程泄漏导致僵尸进程积累。
*   **后台压缩状态保持**：PR #143426 ([链接](https://github.com/openclaw/openclaw/pull/143426)) 确保后台压缩操作在处置期间不会过早释放运行时，防止数据丢失。
*   **更新恢复机制**：PR #140339 ([链接](https://github.com/openclaw/openclaw/pull/140339)) 引入了中断更新的恢复能力，提升升级过程的安全性。
*   **Codex语音支持修复**：PR #143196 ([链接](https://github.com/openclaw/openclaw/pull/143196)) 修复了Telegram群组中绑定Codex时语音笔记转录被跳过的问题。

**整体评价**：项目正通过一系列精细化修复解决规模化部署中的性能瓶颈和资源泄漏问题，技术债务正在被积极清偿。

## 4. 社区热点
以下Issue获得了最多评论和关注，反映了用户对**稳定性**和**认证流程**的高度敏感：

1.  **[Bug] v2026.8.1 间歇性 "malformed JSON arguments"** - Issue #135111 ([链接](https://github.com/openclaw/openclaw/issues/135111))
    *   **热度**：26条评论，Platinum级评级。
    *   **焦点**：升级后Claude Sonnet 5模型调用频繁失败，严重影响生产环境。
2.  **[Bug] 子进程泄漏导致僵尸积累** - Issue #97616 ([链接](https://github.com/openclaw/openclaw/issues/97616))
    *   **热度**：15条评论，Silver级评级。
    *   **焦点**：长期运行的Agent出现性能退化，用户呼吁根本性修复。
3.  **[P1] Gateway事件循环阻塞** - Issue #119720 ([链接](https://github.com/openclaw/openclaw/issues/119720))
    *   **热度**：15条评论，Diamond级评级。
    *   **焦点**：大规模场景下同步持久化阻塞Gateway，影响实时响应。
4.  **[Bug] 内部上下文泄露到Telegram消息** - Issue #137927 ([链接](https://github.com/openclaw/openclaw/issues/137927))
    *   **热度**：14条评论。
    *   **焦点**：隐私和用户体验问题，内部标记可见于用户端。
5.  **[Bug] Codex OAuth刷新超时** - Issue #89278 ([链接](https://github.com/openclaw/openclaw/issues/89278))
    *   **热度**：12条评论，2个点赞。
    *   **焦点**：认证刷新时间与心跳超时不匹配，导致Cron任务失败。

## 5. Bug 与稳定性
今日报告了多个严重Bug，按影响程度排列：

| 严重程度 | 问题描述 | Issue链接 | Fix PR状态 |
| :--- | :--- | :--- | :--- |
| **P0/P1** | Windows网关更新后无法启动 (`--task-supervisor` 静默退出) | [#137813](https://github.com/openclaw/openclaw/issues/137813) | 待修复 |
| **P0/P1** | 2026.9.2 npm更新后状态卡在"running" | [#141617](https://github.com/openclaw/openclaw/issues/141617) | 已关闭 |
| **P1** | Gateway控制请求 Stall 157-276秒 | [#138042](https://github.com/openclaw/openclaw/issues/138042) | 待修复 |
| **P1** | Sleep/Resume后WebSocket重连失败 | [#140010](https://github.com/openclaw/openclaw/issues/140010) | 待修复 |
| **P1** | 内部上下文块泄露至可见消息 | [#137927](https://github.com/openclaw/openclaw/issues/137927) | 已关闭 |
| **P1** | 多代理编排不稳定 (配置覆盖/会话锁失败) | [#43367](https://github.com/openclaw/openclaw/issues/43367) | 待修复 |
| **P2** | SQLite memory tables无限增长 | [#114612](https://github.com/openclaw/openclaw/issues/114612) | 待修复 |
| **P2** | Prompt-cache前缀失效导致缓存未命中 | [#95610](https://github.com/openclaw/openclaw/issues/95610) | 待修复 |
| **Regression** | v2026.8.1 JSON参数解析错误 | [#135111](https://github.com/openclaw/openclaw/issues/135111) | 无新Fix PR |
| **Regression** | Feishu插件工具在消息驱动运行中丢失 | [#140971](https://github.com/openclaw/openclaw/issues/140971) | 已关闭 |

**稳定性评估**：近期版本（特别是2026.8.1和2026.9.x）引入了若干回归问题，主要集中在**认证刷新**、**进程管理**和**平台兼容性**（Windows/macOS）方面。社区对P0/P1级问题的关注度极高，维护者需优先处理Gateway稳定性和子进程泄漏问题。

## 6. 功能请求与路线图信号
1.  **Android Chat-First Surface** - Issue #46058 ([链接](https://github.com/openclaw/openclaw/issues/46058))
    *   **诉求**：用户希望有一个独立的、轻量级的Android原生Chat界面，而非依赖iOS/macOS生态。
    *   **路线图信号**：已有独立Fork验证需求，若维护者接受PR或上游整合，可能成为官方Mobile策略的一部分。
2.  **Agent-triggered Context Compaction** - Issue #6757 ([链接](https://github.com/openclaw/openclaw/issues/6757))
    *   **诉求**：允许Agent自主触发上下文压缩，减少用户干预。
    *   **路线图信号**：与memory-core优化相关，符合“更智能的Agent自主性”趋势。
3.  **Sub-agent Timeout Warning** - Issue #6625 ([链接](https://github.com/openclaw/openclaw/issues/6625))
    *   **诉求**：子Agent超时前给予保存进度的机会。
    *   **路线图信号**：提升多代理协作的可靠性，适合纳入Agent核心功能改进。
4.  **Fallback Chain Test Command** - Issue #6599 ([链接](https://github.com/openclaw/openclaw/issues/6599))
    *   **诉求**：提供命令测试模型降级链是否正常。
    *   **路线图信号**：运维工具增强，有助于生产环境稳定性监控。
5.  **Wear OS Direct Gateway Conversations** - PR #143216 ([链接](https://github.com/openclaw/openclaw/pull/143216))
    *   **诉求**：Wear OS设备直接连接Gateway，不依赖手机中转。
    *   **路线图信号**：扩展生态系统，若有Proof则可能纳入下一版本。

## 7. 用户反馈摘要
*   **痛点1：升级后的稳定性焦虑**。多位用户反馈升级至2026.8.x/9.x后遇到OAuth超时、Gateway卡死、进程泄漏等问题（#89278, #138042, #97616），对“Beta Release Blocker”缺失表示不满。
*   **痛点2：多代理编排复杂性**。用户在使用多代理并行工作时遭遇配置覆盖和会话锁失败（#43367），认为当前多代理功能“不可靠”。
*   **痛点3：资源浪费**。SQLite memory tables无保留策略导致磁盘无限增长（#114612），以及子进程泄漏（#97616）引发运维困扰。
*   **满意点**：部分用户赞赏维护者对高评论Issue的快速响应（如#137813已关闭），以及文档和诊断工具（Doctor）的持续改进。
*   **使用场景**：Telegram Bot、Codex集成、多代理批量编码任务、Windows服务部署是主要使用场景，对这些场景的稳定性要求极高。

## 8. 待处理积压
以下Issue长期未得到根本性解决，建议维护者重点关注：

1.  **Issue #119720** ([链接](https://github.com/openclaw/openclaw/issues/119720)) - *Synchronous agent persistence blocks Gateway event loop*. 大规模场景下的核心性能瓶颈，Diamond级评级，需架构层修复。
2.  **Issue #97616** ([链接](https://github.com/openclaw/openclaw/issues/97616)) - *Child process leak*. 长期存在的资源泄漏问题，影响长期运行的稳定性。
3.  **Issue #114612** ([链接](https://github.com/openclaw/openclaw/issues/114612)) - *SQLite unbounded growth*. 缺乏数据保留策略，导致生产环境磁盘耗尽风险。
4.  **Issue #43367** ([链接](https://github.com/openclaw/openclaw/issues/43367)) - *Multi-agent orchestration instability*. 多代理功能的根基性问题，阻碍了高级用法的采用。
5.  **Issue #95610** ([链接](https://github.com/openclaw/openclaw/issues/95610)) - *Prompt-cache prefix churn*. 影响OpenAI模型的成本和延迟优化，技术难度较高但收益显著。
6.  **Issue #115367** ([链接](https://github.com/openclaw/openclaw/issues/115367)) - *Provider-owned read gate locks external plugins*. 安全策略与插件生态的兼容性问题，阻碍了第三方插件的功能完整性。

**总结**：OpenClaw项目目前处于**高活跃、高负荷维稳**阶段。社区反馈集中爆发于近期版本引入的回归问题和资源管理缺陷。维护者已成功关闭了一些阻塞性Issue（如#141617），但Gateway性能、多代理稳定性和子进程管理等深层架构问题仍需持续关注。建议优先解决P0/P1级稳定性Bug，并建立更严格的Beta发布测试流程以避免此类回归。

---

## 横向生态对比

## 2026-09-10 AI 智能体开源生态横向分析报告

### 1. 生态全景
当前开源 AI 助手生态正从“单点功能迭代”转向“系统级稳定性与架构标准化”攻坚。主流项目均处于高强度维稳期，核心矛盾集中在资源泄漏、多代理编排可靠性及跨平台兼容性上。技术路线呈现两极分化：OpenClaw 与 hermes-agent 致力于统一网关架构以解决会话碎片化，而 Zeroclaw 与 DeepSeek Harness 则聚焦于协议标准化（WASM/Session V3）与插件生态的互操作性。

### 2. 各项目活跃度对比

| 项目 | Issues (24h) | PRs (24h) | 新版本 | 健康度评估 |
| :--- | :---: | :---: | :---: | :--- |
| **OpenClaw** | 308 活跃/192 关闭 | ~500 | 无 | ⚠️ **高负荷维稳**：回归问题集中爆发，维护者响应极快但技术债务沉重 |
| **hermes-agent** | 259 活跃/144 关闭 | ~500 | 无 | ⚠️ **高风险重构期**：核心架构整合中，P1 Bug 数量多，合并率约 40% |
| **QwenPaw** | 22 | 34 | 无 | ✅ **良好**：Issue-to-PR 比健康，移动端与内存优化是重点 |
| **AstrBot** | 15 | 33 | 无 | ✅ **良好**：知识库模块修复密集，响应速度极快，测试覆盖待加强 |
| **Zeroclaw** | 36 | 50 | 无 | ⚠️ **架构演进期**：RFC 讨论热烈，成本计算与沙箱安全是痛点 |
| **PicoClaw** | 低 | 低 | 无 | ✅ **稳定维护**：高内聚修复，边缘设备适配是独特切入点 |
| **DeepSeek Harness** | Discussion 157+ | N/A (Release驱动) | v0.1.5-alpha.2 | ⚠️ **过渡期**：插件生态扩张快，但迁移兼容性与长上下文稳定性存忧 |

### 3. OpenClaw 在生态中的定位
OpenClaw 是目前生态中**社区反馈密度最高、规模化部署压力最大**的项目。
*   **优势**：拥有最活跃的社区反馈闭环（500+ Issue/PR/24h），对 Gateway 阻塞、进程泄漏等深层架构问题响应迅速。
*   **技术路线差异**：不同于 Zeroclaw 的 WASM 插件运行时探索，OpenClaw 更侧重于**多代理编排的健壮性**与**原生运行时稳定性**；不同于 hermes-agent 的“单网关统一会话”激进重构，OpenClaw 正在修补现有混合架构下的回归问题。
*   **社区规模**：从 Issue 评论数（如 #135111 达 26 条）和严重程度评级（Diamond/P0 频发）来看，其用户群体更接近生产环境，对稳定性容忍度极低。

### 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
| :--- | :--- | :--- |
| **子进程/资源泄漏治理** | OpenClaw, hermes-agent, AstrBot | OpenClaw (#97616) 与 hermes-agent (#77311) 均面临长期运行的内存/CPU 泄漏问题；AstrBot 关注知识库模块的并发控制。 |
| **多代理编排稳定性** | OpenClaw, hermes-agent, DeepSeek Harness | OpenClaw (#43367) 与 hermes-agent (#80488) 均需解决会话锁失败、状态丢失及子代理超时问题。 |
| **认证与成本透明化** | Zeroclaw, OpenClaw | Zeroclaw (#9816) Anthropic 成本计算错误；OpenClaw (#89278) OAuth 刷新超时导致任务失败。 |
| **移动端/边缘适配** | PicoClaw, QwenPaw, OpenClaw | PicoClaw (#3345) 轻量级 Worker 模式；QwenPaw (#7378) 原生移动客户端；OpenClaw (#46058) Android Chat 界面。 |
| **上下文压缩与记忆** | OpenClaw, QwenPaw, AstrBot | OpenClaw (#6757) Agent 自主触发压缩；QwenPaw (#7656) 持久化记忆；AstrBot (#10010) 跨会话记忆。 |

### 5. 差异化定位分析

*   **OpenClaw**：**企业级多代理编排平台**。侧重底层运行时稳定性、Gateway 性能优化及大规模部署的容错能力，适合需要高可靠性的生产环境。
*   **hermes-agent**：**全平台统一会话架构探索者**。正在执行史上最大规模的重构（#106742），旨在消除 CLI/TUI/Desktop/Bot 间的会话分裂，技术激进，风险与收益并存。
*   **Zeroclaw**：**协议标准化与安全沙箱先锋**。聚焦 OpenAI Responses 协议深度适配、WASM 插件运行时及细粒度沙箱策略，适合关注可移植性与安全合规的场景。
*   **DeepSeek Harness**：**插件生态丰富的 Web 端工作台**。通过 v0.1.5-alpha.2 强化多模态预览与文件交互，拥有最活跃的插件社区（1700+ 插件），适合注重交互体验与生态扩展的用户。
*   **PicoClaw**：**边缘计算与物联网适配者**。专注于 RISC-V/ARM 低端设备及 QQ/IRC 等特定渠道集成，填补了轻量级、低资源占用场景的空白。
*   **QwenPaw**：**多模态与移动端体验优先**。依托通义千问生态，重点优化原生移动端、本地知识库 FTS 及多模态输入鲁棒性。
*   **AstrBot**：**插件化机器人框架**。以快速响应社区 Bug（如知识库 5 个 Critical 同日修复）和扩展搜索引擎/模型提供商见长，适合中国本土化部署需求。

### 6. 社区热度与成熟度

*   **快速迭代/重构阶段**：**hermes-agent**（架构大重构）、**DeepSeek Harness**（插件生态扩张期）。这两个项目正处于功能快速扩张或核心结构重塑期，伴随较高的不稳定性和迁移成本。
*   **高强度维稳/质量巩固阶段**：**OpenClaw**、**Zeroclaw**、**AstrBot**。OpenClaw 和 Zeroclaw 正通过密集修复回归问题和架构债务来巩固基础；AstrBot 虽版本迭代不快，但对用户反馈的响应速度极快，处于高质量维护期。
*   **稳定演进阶段**：**PicoClaw**、**QwenPaw**。项目节奏平稳，专注于特定领域（边缘设备、移动端）的功能深化，而非激进的架构变革。

### 7. 值得关注的趋势信号

1.  **Session 格式统一化**：DeepSeek Harness 推出 Session V3，Zeroclaw 推进 Append-only event history，OpenClaw 探索统一 Gateway 会话。这表明生态正在从“各自为政”走向“标准化持久化”，未来跨工具迁移和数据备份将成为关键能力。
2.  **可观测性与成本控制**：Zeroclaw (#9816) 和 OpenClaw (#89278) 的用户对认证超时、成本计算错误高度敏感。未来项目若不能在**预算透明度**和**超时熔断机制**上取得突破，将难以进入生产环境。
3.  **边缘智能崛起**：PicoClaw (#3345) 和 OpenClaw (#46058) 对低端硬件和移动原生界面的需求，反映出用户不再满足于云端 API 调用，而是希望在资源受限设备上运行本地化、低延迟的 Agent。
4.  **插件生态的双刃剑**：DeepSeek Harness 和 AstrBot 的繁荣证明插件生态能迅速丰富功能，但 Zeroclaw (#918) 和 DeepSeek (#918) 的自定义事件兼容性问题也警示：**插件接口的稳定性**是生态健康的关键瓶颈，缺乏规范会导致会话损坏。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**日期：** 2026-09-10
**分析对象：** [zeroclaw/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

## 1. 今日速览
过去24小时内，Zeroclaw 社区保持高活跃度，共产生 **86** 条活动记录（36 Issues / 50 PRs）。项目处于架构演进的关键期，核心工作集中在 **会话历史持久化 (RFC #10526)**、**WASM 插件运行时** 以及 **OpenAI Responses 协议深度适配** 三大方向。虽然无新版本发布，但多个阻塞性 Bug（如 Anthropic 成本计算错误、ACP 转录丢失）已引发关注，显示出用户对系统稳定性与可观测性的强烈需求。

## 2. 版本发布
*   **无新版本发布。**
*   当前处于 v0.8.5 后的维护与功能迭代期，重点在于消化已合并的 RFC 设计并修复近期发现的回归问题。

## 3. 项目进展
今日 **0** 个 PR 被合并，**1** 个 Issue 被关闭（#9731, #9730, #9729 相关的 Sidebar 重构工作持续推进中）。

**关键在途进展：**
*   **OpenAI Responses 深度集成：** 作者 @IftekharUddin 提交了4个紧密相关的 PR/Issue（[#10706](https://github.com/zeroclaw-labs/zeroclaw/issues/10706), [#10708](https://github.com/zeroclaw-labs/zeroclaw/issues/10708), [#10707](https://github.com/zeroclaw-labs/zeroclaw/issues/10707), [#10704](https://github.com/zeroclaw-labs/zeroclaw/issues/10704)），旨在支持响应中的推理状态保留、WebSocket 主动引导、有界工具调用及异步函数工具。这标志着 ZeroClaw 正试图对齐 OpenAI 最新 Responses API 的能力边界。
*   **会话事件历史架构：** [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) (Append-only session event history) 正在取代传统的可变消息持久化模式，为实现确定性状态重放和派生代理流奠定基础。这是项目长期稳定性的关键基础设施升级。
*   **安全与沙箱强化：** [#10381](https://github.com/zeroclaw-labs/zeroclaw/pull/10381) 修复了主机启动器在工作目录应用前的解析问题，进一步收紧了 Bubblewrap/Docker 沙箱的安全边界。

## 4. 社区热点
以下 Issues 讨论最为激烈，反映了开发者与核心维护者对架构一致性的深度关切：

1.  **[RFC] Runtime-owned conversation sessions and transport surface adapters (#9487)** | 36 条评论
    *   *链接:* https://github.com/zeroclaw-labs/zeroclaw/issues/9487
    *   *分析:* 作为 Revision 5 的材料性替代方案，此 RFC 正在重新定义会话所有权与传输适配器之间的关系。高评论数表明社区对“运行时”与“网关”职责边界的划分非常敏感，亟需明确以避免后续集成混乱。

2.  **[RFC] Unified file and attachment architecture (#9488)** | 29 条评论
    *   *链接:* https://github.com/zeroclaw-labs/zeroclaw/issues/9488
    *   *分析:* Revision 10 再次重置了投票快照。文件与附件的统一架构是跨渠道（Web, Telegram, ACP）体验一致性的前提，讨论热烈说明现有实现存在明显的碎片化痛点。

3.  **[RFC] Granular sandbox policy - filesystem restrictions (#6996)** | 28 条评论
    *   *链接:* https://github.com/zeroclaw-labs/zeroclaw/issues/6996
    *   *分析:* 应用层路径 admit 与 OS 层沙箱（Bubblewrap/Landlock）的漂移问题已存在较长时间。用户迫切希望统一这两层策略，以实现更细粒度的安全控制。

4.  **[RFC] Simplify RFC voting process (#10549)** | 6 条评论
    *   *链接:* https://github.com/zeroclaw-labs/zeroclaw/issues/10549
    *   *分析:* 旨在消除强制讨论窗口带来的摩擦。虽然评论数较少，但触及了治理流程的效率问题，可能影响未来所有 RFC 的推进速度。

## 5. Bug 与稳定性
今日报告了多个中高严重程度的 Bug，部分已影响生产使用：

| 严重程度 | 问题描述 | Issue ID | 状态/链接 |
| :--- | :--- | :--- | :--- |
| **P1** | Anthropic 提供商报告 $0.00 花费，导致每日/每月预算上限无法触发 | #9816 | [Open](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) |
| **P1** | ZeroCode ACP 转录本丢弃工具调用前的助手文本，仅渲染最后一段文本 | #10697 | [Open](https://github.com/zeroclaw-labs/zeroclaw/issues/10697) |
| **High** | Cost ledger 缓存写入价格使用纯输入费率，低估了缓存未命中的成本 | #10699 | [Open](https://github.com/zeroclaw-labs/zeroclaw/issues/10699) |
| **High** | OAuth 系统前缀缓存标记低于 Anthropic 最小值，占用断点槽位 | #10662 | [Open](https://github.com/zeroclaw-labs/zeroclaw/issues/10662) |
| **Medium** | 集成页面 "Configure" 链接对 Z.AI 等 Provider 使用了 slugified 显示名而非 family key，导致 404 | #10690 | [Open](https://github.com/zeroclaw-labs/zeroclaw/issues/10690) |
| **Medium** | 使用非视觉模型时，内部 `[media attachment]` 占位符直接泄露给最终用户 | #10625 | [Open](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) |
| **Medium** | `knowledge.db_path` 中的 `~` 展开是全字符串替换而非前缀替换，导致路径错误 | #10721 | [Open](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) |
| **Low** | zerocode v0.8.5 中代理回复在聊天窗格中渲染两次（仅显示问题，工具调用正常） | #10720 | [Open](https://github.com/zeroclaw-labs/zeroclaw/issues/10720) |

**注：** [#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) 和 [#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699) 涉及成本计算的底层逻辑错误，建议维护者优先处理。

## 6. 功能请求与路线图信号
*   **Gemini 实时语音转语音通道：** PR [#10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430) 推进了 RFC #8780 的实施，允许 Gemini Live 模型直接拥有调用者音频。这填补了 ZeroClaw 在原生实时语音交互领域的空白。
*   **Anthropic 提示缓存 TTL 配置：** Issue [#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663) 请求将缓存标记的 TTL 从默认的 5 分钟增加到 1 小时。鉴于 Anthropic 缓存昂贵的写入成本和较短的有效期，这将是降低运营成本的关键功能，极可能被纳入下一版本。
*   **A2A 出站客户端支持：** PR [#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324) 实现了 A2A v1.0 _wire model 和四个基础工具，标志着 ZeroClaw 向开放代理互操作性迈进的重要一步。
*   **多模型共享 Provider Profile：** PR [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) 允许单个凭证/端点托管多个模型别名，简化了多模型配置的维护负担。

## 7. 用户反馈摘要
*   **成本透明度缺失：** 用户对 Anthropic 成本报告为 $0.00 感到困惑和担忧（#9816），认为这破坏了预算控制的信任基础。
*   **UI/UX 不一致：** 集成页面的链接生成逻辑错误（#10690）和媒体附件占位符泄露（#10625）表明，尽管后端架构在演进，前端展示层的容错处理仍有疏忽。
*   **开发体验痛点：** ZeroCode 中 ACP 转录丢失历史文本（#10697）和回复重复渲染（#10720）直接影响调试效率，用户期望 IDE 级别的可靠性和准确性。
*   **安全焦虑：** 对文件系统沙箱策略漂移（#6996）的持续关注，说明企业级用户对 agent 权限边界高度敏感。

## 8. 待处理积压
*   **Maintainer Decision Queue (#8692):** 作为 RFC 和设计问题的决策队列，该 Tracker 本身需要维护者定期审查以清除积压的等待决策项。
*   **npm Audit 失败 (#10728):** `js-yaml` 存在高危漏洞，虽然 PR [#10729](https://github.com/zeroclaw-labs/zeroclaw/pull/10729) 已提出修复，但需尽快合并以通过 CI。
*   **Log 命令跨平台一致性：** Issue [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) 指出 `service logs` 在非 Linux/systemd 平台上行为异常，PR [#10732](https://github.com/zeroclaw-labs/zeroclaw/pull/10732) 提供了修复方案，建议优先合并。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-09-10**

## 1. 今日速览
今日项目呈现“高内聚修复、低活跃度发布”的状态。过去24小时内，团队集中关闭了3个历史遗留 Issue（包括关键稳定性Bug），并合并了1个涉及 QQ 频道多媒体支持的重要增强 PR。尽管有4个 PR 仍处于待合并状态，但未见新版本发布或新增 Issue，表明当前处于版本间维护期的稳定阶段。整体健康度良好，代码库正在通过清理冗余逻辑和优化边缘情况来提升质量。

## 2. 版本发布
**无新版本发布。**

## 3. 项目进展
**今日合并/关闭的重要 PR：**
*   **[PR #1349](https://github.com/sipeed/picoclaw/pull/1349)** (已合并): 完善了 QQ 频道（QQ Channel）的消息处理协议。新增了对表情结构解析、语音/图片/视频/文件消息的接收与回复支持，并将 Markdown 作为优先回复格式。这显著提升了 PicoClaw 在 QQ 生态中的集成深度和用户体验。

**今日关闭的 Issue 对开发的影响：**
*   通过关闭 Issue #3269 和 #3265，解决了 Gateway 启动失败及 Agent 循环挂起的问题，直接提升了系统的基础稳定性。

## 4. 社区热点
**讨论活跃 Issue/PR：**

1.  **[Issue #3269](https://github.com/sipeed/picoclaw/issues/3269) - MCP 服务器连接失败导致 Agent 循环挂起**
    *   **热度：** 评论 9 条，👍 1
    *   **分析：** 这是今日最关键的稳定性修复点。用户反馈在 Qwen3 模型环境下，若 MCP 服务不可用，Chat 界面会完全停止响应。该 Issue 现已关闭，意味着潜在的无限循环或阻塞逻辑已被处理，保障了边缘计算场景下的服务可用性。
2.  **[Issue #3265](https://github.com/sipeed/picoclaw/issues/3265) - Gateway 启动报错 'channel deltachat has unknown type'**
    *   **热度：** 评论 4 条，👍 1
    *   **分析：** 针对未配置 Deltachat 但仍报错启动失败的缺陷。关闭此 Issue 表明团队修复了配置加载时的类型推断逻辑，降低了新用户的配置门槛。
3.  **[Issue #3345](https://github.com/sipeed/picoclaw/issues/3345) - 轻量级 PicoClaw Worker 模式提案**
    *   **热度：** 评论 2 条
    *   **分析：** 用户提议针对低成本 RISC-V/ARM 设备优化运行模式。虽然未直接推动代码变更，但反映了社区对“分布式代理系统”在低端硬件上落地的强烈需求，可能影响后续架构设计方向。

## 5. Bug 与稳定性
**今日修复的关键 Bug：**

| 问题描述 | 关联 Issue/PR | 严重程度 | 状态 |
| :--- | :--- | :--- | :--- |
| MCP 连接失败导致 Agent 循环挂起，界面无响应 | [Issue #3269](https://github.com/sipeed/picoclaw/issues/3269) | **高** (可用性) | ✅ 已修复/关闭 |
| Gateway 启动时因 Deltachat 类型未知而失败（即使未配置） | [Issue #3265](https://github.com/sipeed/picoclaw/issues/3265) | **中** (稳定性) | ✅ 已修复/关闭 |
| 工具反馈动画在生命周期清理缺失时持续编辑消息 | [PR #3353](https://github.com/sipeed/picoclaw/pull/3353) | **低** (体验) | 🔄 待合并 (OPEN) |

*注：PR #3353 修复了一个边界情况下的 UI 卡顿 Bug，预计随代码合并纳入下一修复版本。*

## 6. 功能请求与路线图信号
**潜在纳入下版本的功能：**

1.  **IRCv3 多行消息支持 ([PR #3354](https://github.com/sipeed/picoclaw/pull/3354))**
    *   申请合并中。若合并，将增强 IRC 渠道的消息完整性，避免长消息被截断或断裂。
2.  **Deltachat 模块重构与文档完善 ([PR #3222](https://github.com/sipeed/picoclaw/pull/3222))**
    *   申请合并中。通过清理遗留代码（减少 200+ LOC）、移除密码认证旧特性并更新配置规范，旨在降低维护成本。该 PR 的合并暗示路线图倾向于简化配置复杂度并提升代码可维护性。
3.  **Agent 回复线程化 ([PR #3358](https://github.com/sipeed/picoclaw/pull/3358))**
    *   申请合并中。解决群聊中机器人回复与触发问题脱节的问题，提升群聊场景下的对话连贯性。

## 7. 用户反馈摘要
*   **痛点：** 用户高度关注**边缘设备（如旧 Android 手机、Pi）的资源占用与运行模式**（见 Issue #3345），希望 PicoClaw 能更好地适配 10-20MB 可用空间的极端环境。
*   **满意度：** 用户对 **QQ 频道多媒体支持** 的完善表示认可（PR #1349），特别是对本地文件上传和 Markdown 优先回复的支持，满足了复杂的群聊互动需求。
*   **不满意：** 早期版本的**配置错误容忍度低**（如 Issue #3265 中未配置却报错）以及**错误处理机制不完善**（如 Issue #3269 中连接失败导致挂起）是主要抱怨点，今日修复解决了这两大痛点。

## 8. 待处理积压
**需关注的重要开放 PR：**

1.  **[PR #3358](https://github.com/sipeed/picoclaw/pull/3358)** - `fix(agent): thread responses to the originating question message`
    *   **风险提示：** 该 PR 解决了群聊 bot 回复丢失上下文的体验问题。由于创建时间较早（2026-09-01），建议维护者优先审核，以提升群聊场景的用户体验。
2.  **[PR #3354](https://github.com/sipeed/picoclaw/pull/3354)** - `feat(irc): assemble IRCv3 multiline messages`
    *   **风险提示：** 涉及 IRC 协议能力的扩展，需确保向后兼容性测试通过。

**长期未响应 Issue：**
*   **[Issue #3345](https://github.com/sipeed/picoclaw/issues/3345)** 提出的“轻量级 Worker 模式”虽已关闭，但作为功能请求尚未有对应的 PR 跟进，可作为未来技术预研的方向。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：** 2026-09-10
**来源：** agentscope-ai/qwenpaw

## 1. 今日速览
过去24小时 QwenPaw 社区活跃度较高，共更新 Issue 22 条、PR 34 条，保持 **1:1.5** 的 Issue-to-PR 更新比，显示团队正高效消化用户反馈。今日无新版本发布，但修复与功能增强并行：关键稳定性问题（如历史记录 FTS 损坏、上下文压缩预算溢出）已有对应 PR 跟进。整体项目健康度良好，移动端适配、内存插件化及多模态支持是近期重点演进方向。

## 2. 版本发布
**无新版本发布。**

## 3. 项目进展
今日重点推进了以下合并/关闭项，显著提升了系统稳定性与可扩展性：

*   **MCP 客户端超时可配置化** (#7649 [CLOSED]): 解决了长期存在的 MCP 客户端超时硬编码问题，允许用户根据网络环境自定义 `http_timeout`，提升了长任务处理的可靠性。
*   **Skill 版本与依赖校验** (#7609 [CLOSED]): 引入了 Skill 版本暴露及依赖验证机制，防止因缺失环境依赖导致的工作区启动失败，增强了生态系统的健壮性。
*   **工作流消息队列修复** (#7577 [CLOSED]): 修复了会话运行中提交后续消息返回 409 冲突的问题，改为排队机制，改善了并发场景下的用户体验。

**进展评估：** 项目在“稳定性加固”与“配置灵活性”两个维度上取得了实质性突破，特别是针对历史数据完整性和外部工具调用的容错能力有了明显提升。

## 4. 社区热点
以下 Issue/PR 因涉及核心功能缺陷或新功能愿景，引发了较多关注：

*   **[Bug] 同步调用阻塞事件循环** (#7363 [OPEN]): 用户反映 Windows 版 Desktop 2.1.1b1 启动和发送消息时出现长时间无响应（118-135s），疑似同步操作阻塞了异步事件循环。*诉求：优化桌面端异步架构，确保 UI 响应性。*
*   **[Feature] 本地知识库首页入口优化** (#7177 [OPEN]): 用户建议将本地知识库入口置顶并调整顺序，以提升手机端操作便捷性。*诉求：移动端优先的 UI/UX 改进。*
*   **[Feature] 新增 Advisor Mode** (#7569 [OPEN]): 提出一种双模型协作模式（强模型规划 + 弱模型执行），旨在平衡成本与效果。*诉求：探索更高效的 Agent 运行策略。*
*   **[Bug] llama.cpp 版本回滚误判** (#7633 [OPEN]): 5 位 build 号的新版 llama.cpp 被错误识别为“有更新”并静默回滚至旧版 b8744。*诉求：修复版本解析逻辑，支持非标准版本号格式。*

## 5. Bug 与稳定性
今日报告的主要 Bug 按严重程度排列：

| 优先级 | 问题描述 | Issue ID | 状态 | 关联 Fix PR |
| :--- | :--- | :--- | :--- | :--- |
| **P0** | **历史数据库 FTS 损坏导致清理静默失败**：`history.db` 全文检索索引损坏，触发 `SQLITE_CORRUPT_VTAB`，且完整性检查未能检出。 | #7596 | CLOSED | #7655 (已提交) |
| **P1** | **Console 流式渲染在 Chrome 失效**：Chrome 浏览器下 Console 聊天引擎在轮次完成前无法渲染内容，Safari 正常。 | #7642 | OPEN | - |
| **P1** | **弹窗遮罩层失效**：v2.2.0 升级后，部分后台弹窗背景变透明，遮罩层不生效，影响视觉干扰。 | #7622 | CLOSED | - |
| **P2** | **上下文压缩预算溢出**：Context compaction 基于可见上下文计算预算，可能导致实际发送给 Provider 的请求超出限制。 | #7628 | OPEN | - |
| **P2** | **Tool 返回图片/PDF Base64 报错**：工具返回二进制数据时，前端格式处理不当触发 400 错误。 | #7597 | CLOSED | - |

**稳定性分析：** 今日最高优先级的 Bug #7596 已有修复 PR (#7655)，预计下一版本将解决历史数据维护的核心痛点。#7642 和 #7628 仍需持续关注。

## 6. 功能请求与路线图信号
用户反馈揭示了以下潜在路线图方向：

1.  **原生移动端体验**：#7378 提出了基于 Expo/React Native 的原生移动客户端方案，尽管标记为 Draft 且未合并，但反映了社区对移动端深度支持的强烈需求。
2.  **持久化记忆系统**：#7656 提议集成 MemCode 实现跨会话的持久化记忆，保留用户偏好和习惯。这与内部 #7557 (Skill 版本管理) 类似，显示了用户对 Agent 长期价值和个人化的追求。
3.  **多模态输入增强**：#7654 修复了音频回退分类器，增强了对 llama-server 和 DashScope 音频拒绝错误的识别。结合 #7597 的图像/PDF 处理，可见多模态支持的完善是近期重点。
4.  **通知渠道扩展**：#7657 提议增加 ntfy 推送支持，满足自托管用户将 Agent 任务结果推送到手机的需求。

**预测：** 原生移动端、记忆系统接入及多模态鲁棒性优化极有可能纳入 2.2.x 或 2.3.0 版本。

## 7. 用户反馈摘要
*   **痛点：**
    *   **移动端操作不便**：#7177, #5329 多次提及手机端入口隐藏深、Agent 切换困难、历史按钮被挤出屏幕等问题，急需移动端 UI 重构。
    *   **版本管理混乱**：#7633 用户对 llama.cpp 被静默回滚表示不满，认为缺乏透明度且破坏了手工升级的成果。
    *   **环境兼容性**：#7601 抱怨 v2.2.0 移除了多级目录手动编辑路径的功能，增加了使用复杂度。
*   **满意点：**
    *   **功能完善**：用户对 #7649 (MCP 超时配置) 和 #7609 (Skill 依赖校验) 的合并表示认可，认为提升了系统的可控性。
    *   **测试覆盖**：#7653 大规模增加后端单元测试 (+5.02pp 覆盖率)，虽然用户不可见，但体现了项目对稳定性的重视，间接增强用户信心。

## 8. 待处理积压
以下 Issue 长期未得到有效响应或修复，建议维护者关注：

*   **#7642 [Bug] Console streaming renders nothing until turn completes in Chrome**: 影响主流浏览器用户体验，且无关联 PR，建议优先排查前端渲染逻辑。
*   **#7628 [Bug] Context compaction can still exceed the complete provider request budget**: 可能导致生产环境调用失败，虽有描述但无修复方案。
*   **#7378 [Feature] QwenPaw native mobile experience**: 这是一个大型特性 PR，目前状态为 `[DO NOT MERGE]` 且为 Draft，需要维护者明确评估是否继续推进或关闭。
*   **#7656 [Question] Durable memory support**: 涉及第三方集成（MemCode），需评估商业化合作可能性或技术可行性。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目日报 — 2026-09-10

## 1. 今日速览

今日项目活跃度**极高**：24小时内 Issues 403条（新开/活跃259、关闭144），PR 500条（待合并301、已合并199）。核心突破是 **#106742**——实现"One gateway owns every session"架构重构，CLI/TUI/Desktop/API/ACP/Bots/Cron 全部挂接同一 live gateway，这是项目成立以来最重大的架构整合之一。同时修复了多个关键 Gateway session eviction 导致的 in-flight run 泄露问题（#106966、#106964）。无新版本发布。

**健康度评估**: ⚠️ **高负载+高风险** —— 大量 P1 Gateway/session 类 Bug 涌现，但核心维护者正在集中修复中；合并节奏健康（199/500 ≈ 40%），说明 CI/Review 流程运转正常。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

### 🔥 核心架构推进

**#106742 [OPEN] One gateway owns every session: CLI, TUI, Desktop, API, ACP, bots and cron attach to the same live conversation**
- 作者: @teknium1
- 666 文件变更，实现全平台会话统一
- **意义**: 消除多实例各自跑 agent 导致的会话分裂问题，构建单一 FIFO + durable queue + single writer
- 状态: OPEN，待合并

### ✅ 已合并/关闭的重要 PR

| PR | 类型 | 说明 |
|---|---|---|
| #106889 [CLOSED] | fix(compression) | 修复压缩过程中 in-flight task 重复问题 (#106864) |
| #106796 [CLOSED] | fix(desktop) | 修复侧边栏焦点导致聊天区域变暗的 UI bug |
| #105617 [CLOSED] | fix(delegation) | 重写 `delegate_task` 描述，明确并行vs线性路由规则 |
| #106967 [CLOSED] | fmt(js) | 自动格式化修复 |
| #106809 [CLOSED] | ci(lint) | ty 新增 `invalid-method-override` 诊断现在阻塞 lint job（需 Teknium 批准） |
| #106742 [部分已处理] | feat(gateway) | 核心架构 PR 已进入 review |

### 📌 待合并关键 PR

- **#106966** fix(gateway): session turn slot 被 evict 时中断运行中的 agent — **P1**
- **#106964** fix(gateway): reaped session eviction 时中断 in-flight run — **P1**
- **#106773** fix(tools): bare session ID 跨 profile 解析时 fail closed — **安全修复**
- **#106860** fix(desktop): group chat 中 (you) 标记改为基于连接而非 profile 名
- **#106838** fix(desktop): 防止大型 legacy transcript 耗尽 gateway 内存
- **#104024** fix(google-workspace): revoke() 中关闭 HTTP response 防止 socket 泄漏

---

## 4. 社区热点

### 🔥 讨论最活跃的 Issues

1. **#66616 [OPEN] Skills index is stale or degraded** — 186条评论
   - 作者: @nousbot-eng
   - Skills Hub 索引 29.8h 过时（限制26h）
   - 链接: https://github.com/NousResearch/hermes-agent/issues/66616

2. **#88584 [OPEN] Automated Nous integration is blocked** — 81条评论
   - 作者: @echokos
   - Nous-to-Enterkey 合并冲突，cron/jobs.py 阻塞
   - 链接: https://github.com/NousResearch/hermes-agent/issues/88584

3. **#97681 [OPEN] Bot Group Chats should keep working after Desktop closes** — 27条评论，1👍
   - 作者: @dokterdok
   - 用户希望 Bots 在桌面关闭后仍能在不同 gateway 间协作
   - 链接: https://github.com/NousResearch/hermes-agent/issues/97681

4. **#10421 [OPEN] Turn-level live time context for current date/time awareness** — 20条评论，9👍
   - 作者: @oqpsk
   - 请求 agent 具备 turn-level 的"现在"感知能力
   - 链接: https://github.com/NousResearch/hermes-agent/issues/10421

5. **#5528 [OPEN] Configurable approval-locked command patterns** — 8条评论，12👍
   - 作者: @Jackten
   - 请求可配置的 dangerous command 审批模式（当前硬编码）
   - 链接: https://github.com/NousResearch/hermes-agent/issues/5528

---

## 5. Bug 与稳定性

### 🚨 P1 关键 Bug（影响生产/核心功能）

| Issue | 摘要 | 状态 | Fix PR |
|---|---|---|---|
| **#105145** Windows `hermes update` 总是报告 FAILED (exit 8) | Windows 桌面更新后工作目录错误 | CLOSED | ✅ 已修复 |
| **#100401** cron fire-claim heartbeat 死锁 | 运行>60s 的 job 被误报为 "Interrupted by shutdown" | OPEN | 待分配 |
| **#52261** Provider 内存不足被误判为 context_overflow → 破坏性压缩循环 | MLX/oMLX 本地推理场景 | CLOSED | ✅ 已修复 |
| **#77311** Desktop renderer 内存无限增长 — 5GB fleet 占用 | session 内容永不释放 | OPEN | **#106838** (待合并) |
| **#88275** Renderer 进程空闲占用 40-70% CPU | macOS Intel 热节流 | CLOSED | ✅ 已修复 |
| **#106665** Windows 125% 缩放渲染/click 问题 | 分组、卡顿、无响应 | OPEN | 待分配 |
| **#48860** OAuth prompt sanitizer 贪婪替换导致文档链接失效 | hermes-agent → claude-code 错误替换 | OPEN | 待分配 |

### ⚠️ P2 重要 Bug

- **#106005** Multiplex profiles: MCP connections 非 profile 隔离 — 仅首个 profile 获取工具
- **#106179** [CLOSED] Hermes Console cancel 后 executor worker 和 LLM 请求仍在运行 — **已修复**
- **#106195** [CLOSED] kanban promote --force 假成功 — **已修复**
- **#106935** Desktop SSH backend pool recovery 中断 sibling connections — **#106969** (待合并)
- **#102792** 新建 session 丢失 owner metadata → "Couldn't open this session"
- **#85495** `--in <dir>` 在 one-shot 模式下被恢复的 cwd 静默覆盖
- **#67458** `-w/--worktree` 在 one-shot 模式下被静默忽略

---

## 6. 功能请求与路线图信号

### 🌟 高优先级 Feature Requests

1. **#11911 [OPEN] Native Mobile App (iOS & Android) with Voice Calling** — 7条评论，2👍
   - 作者: @chefroger
   - 用户希望有官方移动端 + 语音通话功能
   - 链接: https://github.com/NousResearch/hermes-agent/issues/11911

2. **#70421 [OPEN] Desktop: show all chats under a project (remove 3-session cap)** — 5条评论，7👍
   - 作者: @networthexplained
   - 项目侧边栏限制显示3个会话，用户希望全部展示
   - 链接: https://github.com/NousResearch/hermes-agent/issues/70421

3. **#26277 [OPEN] Email session isolation by normalized subject** — 12条评论，2👍
   - 作者: @rshi0212
   - 请求按 email subject 隔离会话（当前按 sender 聚合）
   - 链接: https://github.com/NousResearch/hermes-agent/issues/26277

4. **#80222 [OPEN] Per-call model/reasoning_effort overrides on delegate_task** — 6条评论，1👍
   - 作者: @pearonjames
   - 请求每次 delegation 调用可覆盖 model 和 reasoning_effort
   - 链接: https://github.com/NousResearch/hermes-agent/issues/80222

5. **#106267 [OPEN] Per-tool-scope YOLO mode via /yolo allow/deny** — 5条评论
   - 作者: @sabira-shaik
   - 请求细粒度工具级 YOLO 控制（当前是 session-wide）
   - 链接: https://github.com/NousResearch/hermes-agent/issues/106267

### 📋 已有 PR 支持的功能

- **#80488 [OPEN] Durable retained subagents** — 持久化 delegated subagents，支持 follow-up messaging
- **#106742 [OPEN] Unified gateway session** — 全平台统一会话（已在进展中）
- **#104562 [OPEN] Configurable memory prefetch timeout** — 可配置的 memory provider prefetch 超时

---

## 7. 用户反馈摘要

### 😤 主要痛点

1. **会话状态不稳定** — 多个用户报告 session 内容丢失、聊天消失、bot 无响应
   - #93618: "Disappearing chats, bot chats not updating"
   - #102792: 新建 session 立即报错 "Couldn't open this session"
   - #105104: 点击 bot 无响应，非确定性失败

2. **Desktop 性能问题** — macOS/Windows 均有渲染和内存问题
   - #77311: renderer 内存无限增长（5GB+）
   - #88275: CPU 占用 40-70%（已修复）
   - #106665: Windows 125% 缩放渲染/click 问题

3. **跨平台体验不一致** — CLI 能正常工作但 Desktop 连接失败
   - #63472: Desktop 报告 "no models" 但 CLI 正常（llama.cpp endpoint）
   - #85495: `--in` 参数在 one-shot 模式下被忽略

4. **配置 persistence 问题**
   - #26665: Desktop 语言设置重启后重置为 English
   - #106195: kanban promote --force 假成功（已修复）

### 😊 正面反馈

- **#10421** 获得 9👍 — 用户对 turn-level 时间感知需求强烈
- **#5528** 获得 12👍 — 可配置审批模式是高频需求
- **#70421** 获得 7👍 — 移除3会话限制是清晰痛点

---

## 8. 待处理积压

### ⏳ 长期未响应的重要 Issue

| Issue | 创建时间 | 天数 | 严重度 | 建议 |
|---|---|---|---|---|
| **#100401** cron heartbeat 死锁 | 2026-09-01 | 9天 | P1 | 需分配开发资源 |
| **#48860** OAuth sanitizer 链接失效 | 2026-06-19 | 83天 | P1 | 安全影响，优先处理 |
| **#77311** Renderer 内存无限增长 | 2026-08-03 | 38天 | P1 | **#106838** 待合并 |
| **#88584** Nous integration 阻塞 | 2026-08-17 | 24天 | P3 | CI/CD 流程问题 |
| **#66616** Skills index 过时 | 2026-07-18 | 54天 | P3 | 186条评论，需决策 |

### 📌 维护者关注建议

1. **#106742** (One gateway owns every session) — 这是666文件的重大重构，需确保 CI 通过并尽快合并
2. **#100401** — cron 死锁影响生产调度，建议 P1 优先级
3. **#48860** — OAuth sanitizer 的安全/可用性影响，应尽快修复
4. **#77311** — 内存泄漏问题，#106838 已提交待合并

---

## 附录：今日关键数据

| 指标 | 数值 |
|---|---|
| 总 Issues (24h) | 403 |
| 新开/活跃 | 259 |
| 已关闭 | 144 |
| 总 PR (24h) | 500 |
| 待合并 | 301 |
| 已合并/关闭 | 199 |
| 合并率 | 39.8% |
| 新版本 | 0 |

**整体判断**: 项目处于**高强度重构+修复期**，核心架构正在整合（#106742），同时大量历史债务（session 管理、内存泄漏、跨平台一致性）被集中清理。社区参与度极高（多个 issue 80-186条评论），但 P1 Bug 数量需要关注。建议维护者优先处理 #100401、#48860、#77311 三个长期未解决的稳定性问题。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# 📊 AstrBot 项目日报 — 2026-09-10

> **数据周期**: 2026-09-09 00:00 ~ 2026-09-10 00:00 (UTC+8)
> **分析对象**: [AstrBot](https://github.com/AstrBotDevs/AstrBot) (github.com/AstrBotDevs/AstrBot)
> **分析师**: Agnes AI 开源项目分析智能体

---

## 1. 今日速览

AstrBot 在过去24小时内保持高度活跃，共新增 **15 个 Issues**（13 活跃/2 已关闭）和 **33 个 PRs**（18 待合并/15 已合并）。今日最大亮点是知识库（KB）模块的深度质量修复——作者 @L4XB 连续提交 5 个修复 PR，覆盖了 Markdown 分块、Xinference Rerank、RateLimiter 并发、会话等待器等核心路径，直接修复了 5 个严重 Bug。另有 7 个 Issue 已被对应 PR 关闭，显示项目响应速度极快。整体健康度：**良好**，但知识库模块暴露了若干并发与异常处理缺陷，需持续关注。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

### 今日合并/关闭的重要 PR（15 个）

| PR # | 标题 | 作者 | 关联 Issue | 影响 |
|------|------|------|------------|------|
| [#10003](https://github.com/AstrBotDevs/AstrBot/pull/10003) | fix: resolve persisted current conversation before deletion | @wcqqq1214 | #9997 | 修复冷缓存下对话删除静默失效 |
| [#9993](https://github.com/AstrBotDevs/AstrBot/pull/9993) | fix: correct At/AtAll branch order in message outline | @DFGHJ43 | — | 修复 @All 消息路由错误 |
| [#9979](https://github.com/AstrBotDevs/AstrBot/pull/9979) | fix: resolve field loss, error code swallowing... in web search | @WangPan59 | #9767 | 修复网络搜索工具 5 个问题 |
| [#9983](https://github.com/AstrBotDevs/AstrBot/pull/9983) | fix(webui): fall back to WebChat session titles | @heerxingen | — | 改善 WebUI 会话列表展示 |
| [#9991](https://github.com/AstrBotDevs/AstrBot/pull/9991) | fix(dashboard): batch automatic log console scrolling | @Elysium-Seeker | #9988 | 修复日志页面 7~10 秒卡顿 |
| [#10008](https://github.com/AstrBotDevs/AstrBot/pull/10008) | fix(cron): deliver proactive agent final text | @xiaoyuyu6420 | — | 修复定时任务结果未推送问题 |
| [#9987](https://github.com/AstrBotDevs/AstrBot/pull/9987) | fix(cron): record active-agent job failure | @he-yufeng | #9980 | 修复定时任务状态误报 completed |
| [#10007](https://github.com/AstrBotDevs/AstrBot/pull/10007) | perf: improve provider dialog | @Soulter | — | 优化服务商选择交互 |
| [#10006](https://github.com/AstrBotDevs/AstrBot/pull/10006) | perf: improve provider dialog | @Soulter | — | 同上（重复提交） |
| [#9990](https://github.com/AstrBotDevs/AstrBot/pull/9990) | fix: batch console log rendering | @nina-ysml | #9988 | 修复 WebUI 日志页面冻结 |
| [#9933](https://github.com/AstrBotDevs/AstrBot/pull/9933) | fix: preserve plugin name case during installation | @Sisyphbaous-DT-Project | — | 修复 Windows/macOS 插件安装失败 |
| [#10004](https://github.com/AstrBotDevs/AstrBot/pull/10004) | feat: unify /new and /reset behavior | @w31r4 | — | 统一对话重置命令语义 |
| [#10005](https://github.com/AstrBotDevs/AstrBot/pull/10005) | feat(provider): add OpenCode Go protocol providers | @piexian | — | 新增 OpenCode Go 订阅支持 |
| [#9838](https://github.com/AstrBotDevs/AstrBot/pull/9838) | feat(websearch): add Serply as a web search provider | @googio | — | 新增 Serply 搜索引擎（Google 实时结果） |
| [#9703](https://github.com/AstrBotDevs/AstrBot/pull/9703) | feat: normalize model input images to PNG | @piexian | #9295 | 图片格式标准化，支持 GIF/APNG 转换 |

**项目向前迈进的关键点**:
- ✅ 知识库模块 5 个严重 Bug 进入修复流程（见下节）
- ✅ 定时任务（cron/active_agent）状态传播问题得到修复
- ✅ WebUI 性能优化（日志页面渲染、服务商选择交互）
- ✅ 新增 2 个搜索引擎提供商（Serply、OpenCode Go）
- ⚠️ 仍有 18 个 PR 待合并，部分关键修复尚未合入主分支

---

## 4. 社区热点

### 🔥 讨论最活跃的 Issues

| Issue # | 标题 | 评论数 | 作者 | 链接 | 热度分析 |
|---------|------|--------|------|------|----------|
| [#9989](https://github.com/AstrBotDevs/AstrBot/issues/9989) | [bug] 飞书私聊 open_id 无法发送文件 | 6 | @NayukiChiba | [链接](https://github.com/AstrBotDevs/AstrBot/issues/9989) | 🔴 **高** — 飞书平台适配问题，6 条评论持续讨论，用户已提供 workaround（使用 chat_id 替代 open_id） |
| [#9980](https://github.com/AstrBotDevs/AstrBot/issues/9980) | [Bug] 定时任务 Active Agent Cron 重复调用工具 | 5 | @camera-2018 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/9980) | 🔴 **高** — 定时任务状态误报 completed，影响生产环境可靠性 |
| [#9321](https://github.com/AstrBotDevs/AstrBot/issues/9321) | [Bug] webchat 子代理结果不自动推送 | 3 | @CMKH1337 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/9321) | 🟡 **中** — 后台模式子代理结果未推送，长期未解决（创建 2026-07-18） |
| [#9929](https://github.com/AstrBotDevs/AstrBot/issues/9929) | Tool call announcements break role-play | 2 | @x1051445024 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/9929) | 🟡 **中** — 角色扮演沉浸感问题，影响用户体验 |
| [#9988](https://github.com/AstrBotDevs/AstrBot/issues/9988) | WebUI 日志页面 7~10 秒卡顿 | 0 | @C10H14N2O5 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/9988) | 🟢 **已修复** — 已通过 PR #9991/#9990 关闭 |

### 💬 热点 Issue 深度分析

**Issue #9989 — 飞书私聊文件发送失败**
- **诉求**: 飞书机器人使用 open_id 发送文件时触发未文档化的 230101 错误
- **用户已找到 workaround**: 使用 chat_id（oc_ 开头）替代 open_id（ou_ 开头）
- **影响**: 飞书平台用户无法在私聊中发送文件，限制机器人功能
- **状态**: 开放，暂无 PR，需平台适配器维护者关注

**Issue #9980 — 定时任务状态误报**
- **诉求**: cron active_agent 任务失败后仍显示 `status=completed`
- **根本原因**: `runner.step_until_done()` 消费了最终回复，但未更新 cron_jobs 表的状态字段
- **影响**: 用户看到"已完成"但实际任务失败，导致数据不一致
- **状态**: ✅ 已通过 PR #9987 修复（待合并）

**Issue #9321 — 子代理结果不推送（长期积压）**
- **诉求**: 后台模式子代理任务完成后，结果未自动发送到当前对话
- **创建时间**: 2026-07-18（超过 2 个月未解决）
- **影响**: 后台任务模式的核心功能缺陷
- **状态**: 开放，无 PR，需优先级提升

---

## 5. Bug 与稳定性

### 🐛 今日报告的 Bug（按严重程度排列）

| 严重度 | Issue # | 标题 | 模块 | 状态 | 关联 PR |
|--------|---------|------|------|------|---------|
| 🔴 **Critical** | [#10000](https://github.com/AstrBotDevs/AstrBot/issues/10000) | Xinference rerank 吞掉上游异常并返回空列表 | 知识库/检索 | 开放 | ✅ #10014 |
| 🔴 **Critical** | [#9999](https://github.com/AstrBotDevs/AstrBot/issues/9999) | 知识库 URL 清洗回退时丢失 chunk_size/chunk_overlap | 知识库/分块 | 开放 | ✅ #10013 |
| 🔴 **Critical** | [#9998](https://github.com/AstrBotDevs/AstrBot/issues/9998) | Markdown 长父标题压缩正文预算后分块失败 | 知识库/分块 | 开放 | ✅ #10012 |
| 🔴 **Critical** | [#9996](https://github.com/AstrBotDevs/AstrBot/issues/9996) | 同一 session 注册新等待器后旧等待器删除新等待器 | 会话管理 | 开放 | ✅ #10011 |
| 🔴 **Critical** | [#9995](https://github.com/AstrBotDevs/AstrBot/issues/9995) | 知识库 URL 清洗 RateLimiter 并发请求间隔失控 | 知识库/限流 | 开放 | ✅ #10015 |
| 🟠 **High** | [#9989](https://github.com/AstrBotDevs/AstrBot/issues/9989) | 飞书私聊 open_id 无法发送文件 | 平台适配/飞书 | 开放 | ❌ 无 PR |
| 🟠 **High** | [#10009](https://github.com/AstrBotDevs/AstrBot/issues/10009) | 疑似与 napcat 最新版交互不完全兼容 | 平台适配/QQ | 开放 | ❌ 无 PR |
| 🟠 **High** | [#9980](https://github.com/AstrBotDevs/AstrBot/issues/9980) | 定时任务状态误报 completed | 定时任务/cron | 开放 | ✅ #9987 (已关闭) |
| 🟡 **Medium** | [#9321](https://github.com/AstrBotDevs/AstrBot/issues/9321) | 子代理结果不自动推送 | 后台任务 | 开放 | ❌ 无 PR |
| 🟡 **Medium** | [#9929](https://github.com/AstrBotDevs/AstrBot/issues/9929) | Tool call 旁白破坏角色扮演沉浸感 | 用户体验 | 开放 | ❌ 无 PR |
| 🟡 **Medium** | [#10002](https://github.com/AstrBotDevs/AstrBot/issues/10002) | 建议：插件页显示多语言 README 图标 | 功能建议 | 开放 | ❌ 无 PR |

### 📊 Bug 统计

- **今日新增 Bug**: 11 个
- **已有关闭 Bug**: 2 个（#9988、#9997）
- **有对应 Fix PR**: 5 个（全部来自 @L4XB，集中在知识库模块）
- **无 Fix PR**: 6 个（需维护者关注）
- **知识库模块 Bug 占比**: 5/11 = **45%** ⚠️ 建议加强该模块测试覆盖

### 🔍 重点 Bug 分析

**知识库模块集中爆发 5 个 Critical Bug**
- **根本原因**: 多个边界条件处理不完善（异常吞没、参数丢失、并发竞争）
- **共同特征**: 均涉及 `_clean_and_rechunk_content()` 和相关工具链
- **修复进度**: 5 个 PR 已由 @L4XB 提交，待合并
- **风险评估**: 合并后知识库稳定性将显著提升，但需回归测试

**飞书平台适配问题（Issue #9989）**
- **影响范围**: 飞书私聊场景
- **Workaround**: 使用 chat_id 替代 open_id
- **建议**: 在平台适配器中自动检测并替换 ID 类型

---

## 6. 功能请求与路线图信号

### 💡 用户提出的新功能需求

| Issue # | 标题 | 作者 | 链接 | 实现难度 | 路线图信号 |
|---------|------|------|------|----------|------------|
| [#10016](https://github.com/AstrBotDevs/AstrBot/issues/10016) | webchat 默认显示思考内容 | @Rain-0x01-39 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10016) | 🟢 低 | 可快速实现，作为 WebUI 增强功能 |
| [#10010](https://github.com/AstrBotDevs/AstrBot/issues/10010) | 跨会话持久化记忆支持 | @memcodeoff | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10010) | 🟡 中 | 与 MemCode 合作机会，战略级功能 |
| [#10002](https://github.com/AstrBotDevs/AstrBot/issues/10002) | 插件页显示多语言 README 图标 | @mjy1113451 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10002) | 🟢 低 | UI 增强，优先级低 |

### 🚀 已实现/即将实现的功能（PR）

| PR # | 功能 | 作者 | 链接 | 状态 |
|------|------|------|------|------|
| [#9838](https://github.com/AstrBotDevs/AstrBot/pull/9838) | 新增 Serply 搜索引擎 | @googio | [链接](https://github.com/AstrBotDevs/AstrBot/pull/9838) | ✅ 已合并 |
| [#10005](https://github.com/AstrBotDevs/AstrBot/pull/10005) | 新增 OpenCode Go 订阅服务 | @piexian | [链接](https://github.com/AstrBotDevs/AstrBot/pull/10005) | ✅ 已合并 |
| [#9703](https://github.com/AstrBotDevs/AstrBot/pull/9703) | 图片格式标准化（PNG/GIF/APNG） | @piexian | [链接](https://github.com/AstrBotDevs/AstrBot/pull/9703) | ✅ 已合并 |
| [#10004](https://github.com/AstrBotDevs/AstrBot/pull/10004) | 统一 /new 和 /reset 命令行为 | @w31r4 | [链接](https://github.com/AstrBotDevs/AstrBot/pull/10004) | ✅ 已合并 |

### 📈 路线图信号分析

1. **搜索引擎扩展**: 新增 Serply（Google 实时结果），填补现有 7 个提供商的空白
2. **多模态能力增强**: 图片标准化 PR 支持 GIF/APNG 转换，提升模型兼容性
3. **订阅服务集成**: OpenCode Go 专用协议支持，扩展服务商生态
4. **用户体验优化**: /new 和 /reset 行为统一，降低用户认知负担
5. **待观察**: MemCode 持久化记忆合作（Issue #10010）可能成为战略级功能

---

## 7. 用户反馈摘要

### 😤 真实用户痛点

1. **飞书私聊文件发送限制**（Issue #9989）
   - **痛点**: 使用 open_id 发送文件触发未文档化的 230101 错误
   - **用户原话**: "这个错误码在飞书的文档中并未提及，应该是内部的限制"
   - **Workaround**: 手动切换为 chat_id（oc_ 开头）

2. **定时任务状态误导**（Issue #9980）
   - **痛点**: 任务实际失败但显示 completed，导致用户误判
   - **用户原话**: "Agent 最终状态为 ERROR，但 cron_jobs 中仍显示 status=completed"
   - **影响**: 生产环境可靠性风险

3. **WebUI 日志页面卡顿**（Issue #9988）
   - **痛点**: 进入日志页面时浏览器完全无响应 7~10 秒
   - **用户原话**: "约 20 次进入日志页面中有 18 次能够复现"
   - **状态**: ✅ 已修复（PR #9991/#9990）

4. **知识库检索结果丢失**（Issue #10000）
   - **痛点**: Xinference 模型故障时吞没异常，返回空列表覆盖有效候选
   - **用户原话**: "预设降级路径未生效"
   - **影响**: 知识库检索可靠性

### 😊 用户满意点

1. **响应速度快**: 5 个 Critical Bug 在同一天内收到 Fix PR
2. **功能扩展**: 新增 Serply、OpenCode Go 等提供商
3. **图片标准化**: 支持 GIF/APNG 转换为单帧，提升兼容性

### 😐 中性/改进建议

1. **角色扮演沉浸感**（Issue #9929）: 用户希望减少 tool call 前的"旁白式"表达
2. **插件多语言 README**（Issue #10002）: 建议添加语言切换图标

---

## 8. 待处理积压

### ⚠️ 长期未响应的重要 Issue

| Issue # | 标题 | 创建时间 | 评论数 | 链接 | 建议优先级 |
|---------|------|----------|--------|------|------------|
| [#9321](https://github.com/AstrBotDevs/AstrBot/issues/9321) | 子代理结果不自动推送 | 2026-07-18 | 3 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/9321) | 🔴 **P0** — 超过 2 个月，核心功能缺陷 |
| [#9929](https://github.com/AstrBotDevs/AstrBot/issues/9929) | Tool call 旁白破坏角色扮演 | 2026-09-02 | 2 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/9929) | 🟡 **P2** — 体验问题，需 UX 设计 |
| [#9989](https://github.com/AstrBotDevs/AstrBot/issues/9989) | 飞书私聊文件发送失败 | 2026-09-09 | 6 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/9989) | 🟠 **P1** — 平台适配问题，有 workaround |
| [#10009](https://github.com/AstrBotDevs/AstrBot/issues/10009) | 与 napcat 最新版兼容性问题 | 2026-09-09 | 0 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10009) | 🟠 **P1** — QQ 平台适配，需版本对齐 |

### 📋 维护者行动建议

1. **立即处理**:
   - 合并知识库模块 5 个 Fix PR（#10011-#10015）
   - 关闭已修复的 Issue（#9988、#9997）
   - 关注 Issue #9321（长期积压）

2. **本周内**:
   - 调查飞书 open_id 限制，考虑在适配器中自动处理
   - 与 napcat 团队对齐版本，解决兼容性问题
   - 评估 Issue #10010（MemCode 持久化记忆合作）

3. **长期优化**:
   - 加强知识库模块测试覆盖（今日 5 个 Critical Bug 集中爆发）
   - 建立平台适配器自动化测试流程
   - 优化定时任务状态传播机制

---

## 📊 项目健康度评分

| 维度 | 评分 | 说明 |
|------|------|------|
| **活跃度** | ⭐⭐⭐⭐⭐ | 24 小时内 48 个更新，高度活跃 |
| **响应速度** | ⭐⭐⭐⭐⭐ | 5 个 Critical Bug 同日收到 Fix PR |
| **代码质量** | ⭐⭐⭐☆☆ | 知识库模块暴露多处边界条件问题 |
| **社区参与** | ⭐⭐⭐⭐☆ | 多位贡献者提交 PR，讨论活跃 |
| **文档完善** | ⭐⭐⭐☆☆ | 飞书错误码未文档化（Issue #9989） |
| **整体健康度** | **⭐⭐⭐⭐☆** | **良好** — 响应迅速，但需加强测试覆盖 |

---

**报告生成时间**: 2026-09-10 00:00 UTC+8
**数据来源**: GitHub API (github.com/AstrBotDevs/AstrBot)
**分析师**: Agnes-2.5-Flash (Sapiens AI)

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：** 2026-09-10  
**分析视角：** AI 智能体与个人 AI 助手开源项目分析师

## 1. 今日速览
DeepSeek Harness (dsh) 在过去 24 小时内保持高度活跃，Discussions 新增 157 条，社区生态（插件、凭据安全、多模态预览）扩展迅速。v0.1.5-alpha.2 版本正式发布，重点强化了 Web 端的多媒体预览能力、文件交互体验及本地化无障碍支持，同时明确了 Session V3 格式升级路径。项目当前正处于从早期快速迭代向标准化插件架构过渡的关键阶段，社区对迁移兼容性和 Agent 稳定性关注度极高。

## 2. 版本发布
**新版本：v0.1.5-alpha.2**

本次发版合并了多项核心功能与修复，主要变更如下：

### 新增功能
*   **多模态预览增强：** 右侧 Sidebar 新增 Markdown、代码高亮、HTML、PDF 及图片预览能力，显著提升内容消费体验。
*   **文件交付与交互：** 支持模型在会话中显式交付文件，用户可直接在 Sidebar 预览、用默认应用打开或在文件管理器中定位文件。
*   **反馈机制细化：** `/feedback` 命令支持提交明细反馈内容，便于社区收集具体痛点。

### 关键修复
*   **配置稳定性：** 修复因模型目录变化导致 pi-ai 配置失效、模型设置入口消失的问题；校验并规范化 Base URL，防止无效地址导致启动失败。
*   **平台兼容性：** 修复 Windows Web 界面原生文件夹选择器被遮挡问题，以及 npm 安装依赖 `fs-ext` 本地编译的兼容性问题。
*   **工具链逻辑：** 修复工具筛选后子代理仍收到不可用文件/Web 工具指导的 Bug；拒绝 MCP 工具发现中的重复分页游标，避免同步死锁。

### 破坏性变更与迁移注意事项
*   **Session 数据格式升级至 V3：** 跨版本迁移需参考 [session-format-v2-to-v3/README.zh.md](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.1.5-alpha.2/packages/session/session-format-v2-to-v3/README.zh.md)。
*   **Web 插件面板 API 调整：** 插件注册方式变更，原 `conversation` Slot 迁移为 `main` 的 `conversation` key，插件开发者需同步更新代码。
*   **极简模式工具调整：** Web `minimal` 与 Python `sdk-minimal` 默认仅保留持久 shell，`str_replace_editor` 改为显式启用。

## 3. 项目进展
虽然该项目未启用 PR 流程（代码合并经 Releases 落地），但通过 v0.1.5-alpha.2 的 Release Notes 可见以下实质性推进：
*   **前端体验深化：** 通过引入多格式预览和文件操作支持，Web 界面正从纯对话工具向全功能工作台演进。
*   **底层架构规范化：** Session V3 格式的引入和插件 API 的重构，表明项目正在清理历史技术债，为后续更大的功能模块（如实验性 Agent Teams）打下基础。
*   **稳定性加固：** 针对 Windows 平台、MCP 同步死锁、工具调用冲突等问题的修复，显示了维护团队对生产环境稳定性的重视。

## 4. 社区热点
以下 Discussions 评论数最多，反映了社区当前的核心关注点：

1.  **[Ideas] dsh-vault — 加密凭据保险库插件** (#1457) | **237 条评论**
    *   *链接:* [https://github.com/deepseek-ai/deepseek-harness/discussions/1457](https://github.com/deepseek-ai/deepseek-harness/discussions/1457)
    *   *分析:* 社区对 AI Agent 安全存储敏感凭据（SSH、API Key、TOTP）的需求极度强烈。该插件提供零外部依赖的加密存储方案，回应了用户对数据隐私的深层担忧。

2.  **[Show Your Plugins!] EasyRewrite — 简单好用的撤回键** (#3456) | **25 条评论**
    *   *链接:* [https://github.com/deepseek-ai/deepseek-harness/discussions/3456](https://github.com/deepseek-ai/deepseek-harness/discussions/3456)
    *   *分析:* 用户渴望拥有类似 ChatGPT 的“撤回”体验，以便在不破坏会话上下文的情况下修正对话方向。这反映了用户对**可逆性操作**和**交互容错**的高需求。

3.  **[General] Docker 部署在线体验** (#1762) | **21 条评论**
    *   *链接:* [https://github.com/deepseek-ai/deepseek-harness/discussions/1762](https://github.com/deepseek-ai/deepseek-harness/discussions/1762)
    *   *分析:* 持续有用户分享和询问 Docker 部署方案，表明**轻量化、一键部署**是新手入门和快速试用的重要场景。

4.  **[Ideas] OpenCode Go 请求头兼容** (#5495) | **21 条评论**
    *   *链接:* [https://github.com/deepseek-ai/deepseek-harness/discussions/5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)
    *   *分析:* 第三方 API 服务（OpenCode Go）对 header 的新要求（`x-opencode-session`）影响了大量用户，显示了 DSH 与外部生态系统的紧密耦合及兼容性维护的重要性。

## 5. Bug 与稳定性
今日报告了多个影响稳定性和兼容性的 Bug，按严重程度排列：

*   **[Critical] 会话损坏及迁移失败** (#5909)
    *   *现象:* 工具调用 ID 重复导致会话加载失败（空白会话）及 v0→v1→v2 迁移失败。
    *   *链接:* [https://github.com/deepseek-ai/deepseek-harness/discussions/5909](https://github.com/deepseek-ai/deepseek-harness/discussions/5909)
    *   *状态:* 需官方关注，可能涉及 Session V3 迁移的通用性问题。

*   **[High] 超长上下文下 Agent 思考退化循环** (#5976)
    *   *现象:* 在 `max reasoning effort` 模式下，Agent 在超长上下文中陷入零产出循环，无自动熔断机制，需手动中止。
    *   *链接:* [https://github.com/deepseek-ai/deepseek-harness/discussions/5976](https://github.com/deepseek-ai/deepseek-harness/discussions/5976)
    *   *状态:* 影响高难度任务处理能力，建议增加超时/步数熔断策略。

*   **[High] 工具调用参数耗尽输出预算** (#6059)
    *   *现象:* 错误模型产生的超长工具参数流式传输直到耗尽输出令牌，仅显示通用错误，缺乏有效诊断。
    *   *链接:* [https://github.com/deepseek-ai/deepseek-harness/discussions/6059](https://github.com/deepseek-ai/deepseek-harness/discussions/6059)
    *   *状态:* 需改进输出截断和错误提示机制。

*   **[Medium] 插件写入自定义事件导致会话无法恢复** (#918)
    *   *现象:* 第三方插件声明合并自定义事件类型后，重启会话失败。
    *   *链接:* [https://github.com/deepseek-ai/deepseek-harness/discussions/918](https://github.com/deepseek-ai/deepseek-harness/discussions/918)
    *   *状态:* 影响插件开发者和其用户，需明确 Session Event 白名单机制。

## 6. 功能请求与路线图信号
*   **插件升级辅助工具：** #5120 询问是否有 Skill 帮助插件作者从 v0.1.1 升级到 v0.1.2，暗示官方可能需要考虑提供**插件迁移工具或文档**。
*   **插件发现与筛选：** #1597 指出 1700+ 插件难以筛选，用户希望有 AI 总结 + 智能搜索功能，这与当前 Web 端引入预览功能的趋势一致，**官方可能考虑强化插件市场的展示能力**。
*   **Agent 团队协作：** v0.1.5-alpha.2 已发布实验性 Agent Teams 包，但需显式启用，表明**多 Agent 协作**已在路线图中，但尚处于早期实验阶段。

## 7. 用户反馈摘要
*   **正面反馈：** 对新版本的 Sidebar 预览功能和文件交互表示期待；EasyRewrite 等插件填补了官方功能的空白，提升了使用流畅度。
*   **痛点：**
    *   **迁移焦虑：** 用户对 Session 格式升级（V2→V3）和插件 API 变更感到担忧，担心数据丢失或插件失效（#5120, #918）。
    *   **稳定性担忧：** 超长上下文下的 Agent 崩溃和会话损坏问题严重影响了高级用户的使用体验（#5909, #5976）。
    *   **入门门槛：** 尽管有 Docker 方案，但首次运行时的进度反馈缺失（#176）和安装依赖问题（#982）仍劝退部分用户。

## 8. 待处理积压
*   **插件升级路径缺失：** 多个用户询问如何升级插件代码以适配新版本，官方尚未提供标准化的迁移指南或工具（#5120）。
*   **长上下文 Agent 稳定性：** 关于 `max reasoning effort` 下 Agent 退化循环的问题（#5976）尚无明确修复计划，这在高阶用户中是一个显著痛点。
*   **自定义事件兼容性：** #918 描述的插件写入自定义事件导致会话损坏的问题，影响了插件生态的健康度，需要官方明确支持边界。

---
*生成时间：2026-09-10 | 数据来源：DeepSeek Harness GitHub Discussions & Releases*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*