# OpenClaw 生态日报 2026-09-23

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-22 23:54 UTC

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
**日期：** 2026-09-23
**分析对象：** github.com/openclaw/openclaw

## 1. 今日速览
OpenClaw 在 2026-09-22 期间保持了极高的活跃度，过去 24 小时内处理了 500 条 Issue 和 500 条 PR 更新，显示社区参与度旺盛且维护者团队响应迅速。尽管没有发布新版本，但大量关键的基础设施修复（如会话稳定性、日志持久化、插件身份管理）正在积压中等待合并。系统稳定性仍是当前最大挑战，多个 P0 级崩溃循环和内存泄漏问题仍无定论，需重点关注。

## 2. 版本发布
*   **无新版本发布。**
*   近期热点版本为 `2026.9.5`，但伴随多个回归问题（如 Codex catalog 重试循环、WorkerThread CPU 占用等）。

## 2. 项目进展
今日主要推进了以下技术修复和优化，虽未合并新版本，但核心稳定性正在修补：

*   **会话与日志持久化：** PR #155858 (fix(cron): persist command delivery evidence) 正在解决 Cron 任务执行证据链丢失问题，确保 `cron run receipt -> task run -> outbound delivery result` 的可追溯性。
*   **Gateway 性能优化：** PR #155997 (perf(gateway): reuse message text encodings during fanout) 和 #155995 (perf(gateway): reduce session list work during progress updates) 旨在减少大规模转发的重复编码开销和会话列表重建的 CPU 占用。
*   **浏览器扩展稳定性：** PR #156019 (fix(browser): scope tab group fallback to creation) 修复了 Chromium tab group 身份不稳定时的回退逻辑，防止临时创建状态被误用。
*   **iOS/Android 客户端体验：** PR #136197 (fix(ios): session list shows generated names) 修复了 iOS 端会话列表显示技术 Key 而非友好名称的问题。
*   **安全与权限：** PR #156020 (fix(agents): admit exec review outside retired plugin generations) 修复了插件生命周期结束后 `exec` 命令被错误阻断的安全策略问题。

## 3. 社区热点
**最活跃 Issue（按评论数排序）：**

1.  **#91588: Critical: Gateway Memory Leak (33 评论, P0)**
    *   **链接:** https://github.com/openclaw/openclaw/issues/91588
    *   **热度分析:** 这是当前最受关注的 P0 问题。Gateway RSS 从 350MB 飙升至 15.5GB 导致 OOM 崩溃循环，严重影响生产环境稳定性。用户 @petercheng 的反馈引发了广泛共鸣，因为这是系统性资源泄漏，涉及核心进程生命周期。
2.  **#44925: Subagent completion silently lost (30 评论, P1)**
    *   **链接:** https://github.com/openclaw/openclaw/issues/44925
    *   **热度分析:** 子代理任务完成结果静默丢失，且无重试或通知，导致数据丢失。用户 @IIIyban 详细描述了多种失败模式，反映了多代理编排场景下的可靠性痛点。
3.  **#119720: Synchronous agent persistence blocks event loop (22 评论, P1)**
    *   **链接:** https://github.com/openclaw/openclaw/issues/119720
    *   **热度分析:** 同步持久化阻塞 Gateway 事件循环，在高并发场景下严重影响响应速度。这表明随着代理规模扩大，架构瓶颈逐渐显现。
4.  **#126360: AgentSelectionRequiredError floods logs (18 评论, P1)**
    *   **链接:** https://github.com/openclaw/openclaw/issues/126360
    *   **热度分析:** 多代理显式所有权配置下，缺乏 `agentId` 目标导致日志泛滥，影响可观测性。
5.  **#97616: Leaks unreaped hook/tool child processes (17 评论, P1)**
    *   **链接:** https://github.com/openclaw/openclaw/issues/97616
    *   **热度分析:** 僵尸进程积累导致运行时退化，是内存泄漏问题的伴生现象，进一步加剧了系统不稳定性。

**关键 PR 动态：**
*   **#131153:** 修复 `openclaw configure --agent` 无法显式选择 setup owner 的问题，关联 Issue #126360。
*   **#156018:** 引入跨消息和模型调用追踪的代理身份标识，增强可观测性。

## 4. Bug 与稳定性
**P0 (Critical):**
*   **#91588:** Gateway 内存泄漏，RSS 增长至 15.5GB 后 OOM 崩溃。**状态:** 无 Fix PR，需维护者介入。
*   **#152689 (已关闭):** Codex resident catalog 重试循环填满 `os.tmpdir()`。**状态:** 已关闭，可能通过更新修复。
*   **#89278:** Codex OAuth 刷新成功但 cron/heartbeat 因 10s 超时失败。**状态:** 开放，无 Fix PR。
*   **#136203:** Windows de-DE 升级后 Doctor 维护阻塞。**状态:** 开放，无 Fix PR。
*   **#153377 (已关闭):** `openclaw update repair` 自争用导致失败。**状态:** 已关闭。

**P1 (High):**
*   **#44925:** 子代理完成结果静默丢失。**状态:** 无 Fix PR。
*   **#119720:** 同步持久化阻塞事件循环。**状态:** 部分修复已在 #140231 和 #138984 落地，但问题仍存在。
*   **#136183:** SSH 命令执行挂起（回归）。**状态:** 无 Fix PR。
*   **#113306:** SQLite 快照恢复缺乏端到端崩溃保障。**状态:** 无 Fix PR。
*   **#112259:** 零负载分发导致入站消息静默丢弃。**状态:** 无 Fix PR。
*   **#125570:** Skill Workshop 更新覆盖活动技能描述。**状态:** 无 Fix PR。
*   **#121617:** 压缩后 "Already compacted" 守卫误分类。**状态:** 无 Fix PR。
*   **#120600:** AGENTS.md 在沙箱 Codex 环境中未送达。**状态:** 无 Fix PR。
*   **#126246:** Telegram 出站交付卡在 `send_attempt_started` 并在重启后丢失。**状态:** 无 Fix PR。
*   **#125764:** Telegram 网络失败后出站消息死信丢失。**状态:** 无 Fix PR。
*   **#112313:** 死信队列入条目永久无法清除。**状态:** 无 Fix PR。
*   **#114234:** 使用成本刷新锁在容器重启后无法释放。**状态:** 无 Fix PR。
*   **#140129:** Anthropic 缓存卡在 ~46k tools+system prefix。**状态:** 无 Fix PR。
*   **#118560:** WebChat 画布在主会话重置后隐藏早期消息。**状态:** 无 Fix PR。
*   **#112349:** memory-core dreaming 深相促销忽略 minRecallCount。**状态:** 无 Fix PR。
*   **#55694:** 工具调用失败死循环导致消息刷屏。**状态:** 无 Fix PR。
*   **#50490:** 飞书群聊 activation 模式切换无效。**状态:** 无 Fix PR。

**P2/P3 (Medium/Low):**
*   **#114612:** SQLite memory tables 无限增长无保留策略。
*   **#79902:** 需要 SQLite transcript/session seams。
*   **#74586:** AM embedded run 中止 memory_search 调用。
*   **#96975:** 子代理完成隔离需求。
*   **#119411:** memory 文件监视器永不重新索引。
*   **#134993:** Gateway 在 ARM64/Pi 上单核 CPU 100%。
*   **#99659:** 连接 companion app 后 OOM。
*   **#85461:** 图像生成提供者使用元数据捕获。
*   **#120244:** RFC 用于 cron 维护窗口。

## 5. 功能请求与路线图信号
*   **#10687: Fully dynamic model discovery (10 评论, 👍 4)**
    *   **链接:** https://github.com/openclaw/openclaw/issues/10687
    *   **信号:** 用户强烈渴望支持 OpenRouter 等快速变化的模型目录，当前静态模型选择已无法满足需求。这是一个高优先级的功能缺口。
*   **#79902: Companion-friendly SQLite transcript/session seams (15 评论, 👍 2)**
    *   **链接:** https://github.com/openclaw/openclaw/issues/79902
    *   **信号:** 高级用户希望基于规范运行时状态构建工具，而非解析不透明 blob。这指向了未来 API 稳定性的需求。
*   **#53763: Built-in headless browser (12 评论)**
    *   **链接:** https://github.com/openclaw/openclaw/issues/53763
    *   **信号:** 用户对可靠网页访问的需求持续存在，减少对 Chrome 外部依赖。
*   **#120244: RFC cron maintenance window (8 评论)**
    *   **链接:** https://github.com/openclaw/openclaw/issues/120244
    *   **信号:** 社区对生产环境友好的 cron 调度有明确需求，支持维护窗口和 FIFO 回放。
*   **#148567: Sign in with ChatGPT through Responses (PR)**
    *   **链接:** https://github.com/openclaw/openclaw/pull/148567
    *   **信号:** OpenAI 官方正在推动 SIWC 作为公共 Responses API 的认证方式，这可能是即将到来的版本的重要集成。

## 6. 用户反馈摘要
*   **稳定性痛点:** 用户对内存泄漏 (#91588) 和僵尸进程 (#97616) 感到沮丧，这些 bug 导致服务频繁重启，影响生产可用性。
*   **数据丢失恐惧:** 子代理结果静默丢失 (#44925) 和 Telegram 消息死信 (#125764, #126246) 触发了用户对数据完整性的严重担忧。
*   **配置复杂性:** 多代理所有权配置 (#126360) 和升级后状态不一致 (#136203) 增加了运维负担。
*   **性能退化:** 在 ARM64 设备上 CPU 占用飙升 (#134993) 和冷启动变慢 (#119087) 影响了边缘部署体验。
*   **正面反馈:** 用户感谢 OpenClaw 成为家庭和业务流程的一部分 (#73537)，并认可其作为日常工作流工具的潜力。

## 7. 待处理积压
*   **#91588 (P0):** Gateway 内存泄漏 - 最高优先级，需紧急修复。
*   **#44925 (P1):** 子代理结果丢失 - 影响核心功能可靠性。
*   **#89278 (P0):** Codex OAuth 超时 - 影响认证流程。
*   **#126360 (P1):** AgentSelectionRequiredError 日志风暴 - 影响可观测性。
*   **#112313 (P1):** 死信队列永久条目 - 数据清理机制失效。
*   **#114234 (P1):** 使用成本刷新锁泄漏 - 容器环境下的功能性阻塞。

**建议:** 维护者应优先关注 P0/P1 级别的稳定性和数据丢失问题，特别是内存泄漏和多代理编排相关的 bug。同时，需要加速 #10687 (动态模型发现) 和 #148567 (SIWC 集成) 等功能性 PR 的审查和合并，以满足社区期待。

---

## 横向生态对比

## 2026-09-23 个人 AI 智能体开源生态横向分析报告

### 1. 生态全景
2026年9月下旬，开源个人 AI 助手生态进入**“稳定性重构”与“多模态深度集成”**的攻坚期。从 OpenClaw 的内存泄漏危机到 hermes-agent 的数据库损坏挑战，核心平台正从单纯的功能堆砌转向底层架构（并发安全、会话持久化）的加固。与此同时，生态呈现明显的**垂直分化**：既有 Zeroclaw 和 PicoClaw 这样专注于特定通道（WhatsApp/QQ）和边缘硬件（RISC-V/Pi）的精耕细作，也有 DeepSeek Harness 这样向通用 Agent 工作流平台演进的尝试。社区反馈显示，用户对“数据丢失”和“静默失败”的容忍度已降至冰点，可靠性成为比新功能更稀缺的资源。

### 2. 各项目活跃度对比

| 项目 | 今日 Issue 活动 | 今日 PR 活动 | 版本发布 | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500+ | 500+ | 无 (v2026.9.5 有回归) | 🟡 **高风险**：P0 级内存泄漏未解，稳定性是最大短板 |
| **hermes-agent** | ~500 | ~500 | 无 (v0.19.x) | 🟡 **中等风险**：WAL 数据库损坏频发，但修复响应迅速 |
| **QwenPaw** | 37 | 50 | 无 (v2.2.1 维稳期) | 🟢 **良好**：测试覆盖率提升至 73%，Bug 修复闭环快 |
| **DeepSeek Harness** | 219 Discussions | N/A (Release 驱动) | v0.1.7-alpha.1/2 | 🟢 **良好**：产品化迭代快，但 Windows/Firefox 兼容性待解 |
| **Zeroclaw** | 33 | 50 | 无 | 🟢 **良好**：RFC 治理成熟，安全审计跟进及时 |
| **AstrBot** | 6 | 18 | 无 | 🟢 **健康**：小而美，安全加固与 UX 优化并重 |
| **PicoClaw** | 2 | 4 | 无 | 🟢 **健康**：维护者响应极快，聚焦配置稳定性 |

### 3. OpenClaw 在生态中的定位
*   **规模效应与复杂性双刃剑**：OpenClaw 是生态中绝对的活动量巨头（Issue/PR 数千倍于垂类项目），这使其成为**企业级多代理编排**的事实标准参照，但也导致了严重的技术债积压（如 Gateway 内存泄漏 #91588）。
*   **技术路线差异**：与 AstrBot/Zeroclaw 侧重“通道连接”不同，OpenClaw 更侧重“基础设施层”（Gateway、Cron、Plugin 生命周期），是其他上层应用可能依赖的底层支撑。
*   **社区痛点映射**：OpenClaw 的高热度 Issue（如子代理结果丢失 #44925、同步持久化阻塞 #119720）反映了多代理系统从“玩具”走向“生产”时的典型阵痛，其解决方案将惠及整个生态。

### 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求/信号 |
| :--- | :--- | :--- |
| **会话/状态持久化可靠性** | OpenClaw, hermes-agent, QwenPaw | OpenClaw 的日志持久化、hermes-agent 的 `state.db` 损坏、QwenPaw 的子代理生命周期追踪，均指向**多代理并发写状态**是共性难题。 |
| **多代理/跨网关协作** | OpenClaw, hermes-agent, Zeroclaw | hermes-agent #97681 呼吁跨网关 Bot 协作；OpenClaw #44925 关注子代理结果传递；Zeroclaw #11027 探讨代理间消息传递。 |
| **可观测性与日志治理** | OpenClaw, Zeroclaw, AstrBot | OpenClaw 的 `AgentSelectionRequiredError` 日志风暴、Zeroclaw 的审计日志空白、AstrBot 的上下文过滤需求，显示用户急需**低成本、高信噪比**的可观测方案。 |
| **模型路由与成本优化** | OpenClaw, QwenPaw, DeepSeek Harness | OpenClaw #10687 动态模型发现、QwenPaw #4882 模型自动降级、DeepSeek Harness 的 Token 预算配置，反映对**多模型 Failover 和成本控制**的强烈需求。 |
| **多模态/富文本通道支持** | OpenClaw, Zeroclaw, AstrBot | 各平台均在补强图片、PDF、语音的通识能力（如 OpenClaw iOS 客户端、Zeroclaw WhatsApp 预览、AstrBot QQ 图片解析）。 |

### 5. 差异化定位分析

*   **OpenClaw**：**通用型 Agent OS**。侧重后端编排能力、插件生态和大规模会话管理，适合需要高度定制化工作流的技术团队。
*   **hermes-agent**：**桌面端多网关聚合器**。优势在于强大的 GUI 和本地桌面体验，适合个人用户作为统一的 AI 助手入口，但需解决数据库稳定性问题。
*   **Zeroclaw**：**通道专用型助手（Rust）**。深耕 WhatsApp/WeChat 等 IM 渠道，强调安全性和低资源占用，适合移动端优先的部署场景。
*   **AstrBot**：**轻量级社交机器人框架**。插件化设计成熟，对国内平台（QQ、微信）支持较好，适合快速搭建垂直场景 Bot。
*   **PicoClaw**：**边缘/嵌入式智能体**。依托 Sipeed 硬件生态，聚焦 RISC-V/树莓派等低功耗设备的本地 AI 推理，填补了物联网边缘侧的空白。
*   **QwenPaw**：**千问生态桌面客户端**。深度集成阿里云模型能力，侧重 C 端用户的易用性和 Pet 插件等情感化交互。
*   **DeepSeek Harness**：**代码/工程导向的 Agent 工作空间**。由 DeepSeek 官方驱动，侧重代码理解、文件操作和长会话管理，更像是一个智能版的 IDE/Copilot 伴侣。

### 6. 社区热度与成熟度分层

*   **快速迭代期（产品化冲刺）**：
    *   **DeepSeek Harness**：通过 Alpha 版本密集更新 UI 和协作功能，快速响应用户反馈，处于产品定义的关键窗口期。
    *   **QwenPaw**：通过高频率的测试覆盖和 Bug 修复，快速夯实 v2.2.x 版本的稳定性基础。

*   **质量巩固期（还技术债）**：
    *   **OpenClaw**：活跃度极高但陷入 P0 稳定性泥潭，目前主要精力用于修复内存泄漏和并发 Bug，属于“成长中的烦恼”。
    *   **hermes-agent**：同样面临数据库稳定性挑战，但社区治理和 RFC 流程相对成熟，正在有序地解决结构性问题。

*   **稳定运营期（垂直深耕）**：
    *   **Zeroclaw / AstrBot / PicoClaw**：用户基数相对垂直，需求明确，维护者能够小步快跑地解决具体问题，社区氛围更健康、反馈闭环更短。

### 7. 值得关注的趋势信号

1.  **“静默失败”成为最大用户体验杀手**：从 OpenClaw 的子代理结果丢失到 hermes-agent 的会话假死，用户不再容忍后台错误。未来项目的竞争力将取决于**错误可见性**和**自愈能力**的设计。
2.  **多代理编排的“可靠性陷阱”**：OpenClaw 和 hermes-agent 的共性 Bug 表明，当代理数量增加时，状态一致性和通信可靠性呈指数级复杂化。谁先解决了**分布式代理的状态同步**问题，谁就能定义下一代标准。
3.  **Token 经济性的显性化**：AstrBot 的上下文过滤需求和 OpenClaw 的动态模型发现，说明用户开始精细化计算 Agent 运行的边际成本，**成本控制工具**将成为标配。
4.  **边缘智能体的兴起**：PicoClaw 的成功表明，将 AI 助手下沉到低功耗设备是一个未被充分挖掘的蓝海，特别是在隐私敏感和本地化推理场景。
5.  **官方 vs 社区的博弈**：DeepSeek Harness 的官方快速迭代与 OpenClaw 的社区驱动模式形成对比。对于开发者而言，选择官方强主导的项目（如 Harness）可能获得更快的功能落地，而选择社区驱动项目（如 OpenClaw）则拥有更大的自定义空间，但需承担更高的不确定性。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**日期：** 2026-09-23  
**数据来源：** GitHub Issues & Pull Requests (过去24小时)

---

## 1. 今日速览

Zeroclaw 在 2026-09-23 保持高活跃度，过去24小时共产生 **33 条 Issue** 更新（18条新开/活跃，15条关闭）和 **50 条 PR** 更新（31条待合并，19条已合并/关闭）。今日工作重心集中在 **WhatsApp Web 通道修复**、**运行时稳定性改进** 及 **安全审计跟进**。无新版本发布。项目整体健康度高，核心维护者 @Audacity88、@RustLangLatam、@JordanTheJet 活跃推进多个高优先级议题。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

### 已合并/关闭的重要 PR

| PR | 作者 | 类型 | 摘要 |
|----|------|------|------|
| [#11038](https://github.com/zeroclaw-labs/zeroclaw/pull/11038) | @JordanTheJet | chore(security) | 忽略 RUSTSEC-2026-0292 (`imbl-sized-chunks` double free)，解决 CI Security job 失败问题 |
| [#11042](https://github.com/zeroclaw-labs/zeroclaw/pull/11042) | @VladimirLewisII | docs | 记录 replacement-first integration policy (RFC #6165)，完善文档 |
| [#10958](https://github.com/zeroclaw-labs/zeroclaw/pull/10958) | @ump45nose | fix(channels) | 使用长度前缀中断作用域键，修复跨组件边界碰撞问题 (#10948) |

### 推进中的关键 PR

- **#11060** ([RustLangLatam](https://github.com/zeroclaw-labs/zeroclaw/pull/11060)): WhatsApp Web 强制回复队列修复，使 `force_voice` 能正确路由到语音通道
- **#11057** ([RustLangLatam](https://github.com/zeroclaw-labs/zeroclaw/pull/11057)): 修复 `suppress_voice` 被忽略的问题，确保 TTS 队列前尊重用户抑制指令
- **#11054** ([RustLangLatam](https://github.com/zeroclaw-labs/zeroclaw/pull/11054)): WhatsApp Web 支持主题分隔符和 setext 标题渲染
- **#11080** ([RustLangLatam](https://github.com/zeroclaw-labs/zeroclaw/pull/11080)): PDF 文档附加首屏预览，改善 WhatsApp Web 文件发送体验
- **#10986** ([RustLangLatam](https://github.com/zeroclaw-labs/zeroclaw/pull/10986)): 为通道感知工具提供运行时的通道实例，解决 webhook/cron/SOP 场景下工具无法访问通道的问题

---

## 4. 社区热点

### 高讨论度 Issues

1. **#4853** - [Feature]: 从 `.well-known` agent-skills 发现索引安装技能  
   **作者:** @jonathanhefner | **评论:** 8 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/4853)  
   **热点分析:** Agent Skills 标准化探索，Cloudflare/Vercel 已内部使用，社区期待官方支持。

2. **#10970** - RFC: 主机级 admission control 与每代理资源限制  
   **作者:** @JordanTheJet | **评论:** 5 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10970)  
   **热点分析:** 多代理机器部署的稳定性需求，避免延迟降解转为稳定性崩溃。

3. **#10930** - RFC: 代理询问人类的持久化原语  
   **作者:** @JordanTheJet | **评论:** 5 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10930)  
   **热点分析:** 复用 SOP 审批门控机制，统一代理-人类交互的持久化模型。

4. **#10929** - RFC: 出站消息投递回执  
   **作者:** @JordanTheJet | **评论:** 5 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10929)  
   **热点分析:** 当前 `SendMessage` 无 ID，无法确认消息是否抵达，影响可靠性。

5. **#11027** - RFC: 代理间会话消息传递（接收方自由裁量）  
   **作者:** @Audacity88 | **评论:** 3 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11027)  
   **热点分析:** 多代理协作场景下的消息交换机制，避免历史合并或人工复制。

6. **#11017** - RFC: 保留适用审查并简化快速合并决策  
   **作者:** @Audacity88 | **评论:** 3 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11017)  
   **热点分析:** 治理流程优化，改进 #10677 实现的快速二审车道。

---

## 5. Bug 与稳定性

### 严重级别 S0 (数据丢失/安全风险)

| Issue | 描述 | 状态 | Fix PR |
|-------|------|------|--------|
| [#11058](https://github.com/zeroclaw-labs/zeroclaw/issues/11058) | `allowed_commands`  exempts 高风险命令，绕过审批且无日志 | OPEN | 无 |
| [#9187](https://github.com/zeroclaw-labs/zeroclaw/issues/9187) | WeChat 同步游标在消息入队前持久化，崩溃导致入站消息丢失 | CLOSED (in-progress) | 无 |

### 严重级别 S2 (行为降级)

| Issue | 描述 | 状态 | Fix PR |
|-------|------|------|--------|
| [#11059](https://github.com/zeroclaw-labs/zeroclaw/issues/11059) | WhatsApp Web 忽略 `force_voice`，无法路由到语音通道 | OPEN | [#11060](https://github.com/zeroclaw-labs/zeroclaw/pull/11060) |
| [#10922](https://github.com/zeroclaw-labs/zeroclaw/issues/10922) | WhatsApp Web 自动 TTS 忽略 `suppress_voice` | OPEN | [#11057](https://github.com/zeroclaw-labs/zeroclaw/pull/11057) |
| [#11052](https://github.com/zeroclaw-labs/zeroclaw/issues/11052) | WhatsApp 未渲染主题分隔符和 setext 标题 | OPEN | [#11054](https://github.com/zeroclaw-labs/zeroclaw/pull/11054) |
| [#10981](https://github.com/zeroclaw-labs/zeroclaw/issues/10981) | 出站 WhatsApp 图片无 `jpegThumbnail`，手机显示空卡片 | CLOSED (in-progress) | 无 |
| [#10885](https://github.com/zeroclaw-labs/zeroclaw/issues/10885) | 工具返回图片在同 turn 内无关工具调用后消失 | CLOSED | 无 |
| [#10889](https://github.com/zeroclaw-labs/zeroclaw/issues/10889) | Anthropic provider 在最后消息为图片块时丢失滚动缓存断点 | CLOSED | 无 |
| [#10594](https://github.com/zeroclaw-labs/zeroclaw/issues/10594) | Cron 任务未运行时不记录任何内容，静默不可见 | OPEN | 无 |
| [#10225](https://github.com/zeroclaw-labs/zeroclaw/issues/10225) | ZeroCode RPC 会话无法通过通道工具访问配置通道 | OPEN | [#10986](https://github.com/zeroclaw-labs/zeroclaw/pull/10986) |
| [#11055](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) | Daemon 未注册 channel-map 工厂，webhook/cron/SOP 无可用车通道 | OPEN | [#10986](https://github.com/zeroclaw-labs/zeroclaw/pull/10986) |
| [#10948](https://github.com/zeroclaw-labs/zeroclaw/issues/10948) | 中断作用域键在组件边界碰撞 | CLOSED | [#10958](https://github.com/zeroclaw-labs/zeroclaw/pull/10958) |
| [#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674) | 历史裁剪在上限处停止，工具密集型会话反复裁剪破坏 prompt caching | CLOSED | 无 |
| [#10952](https://github.com/zeroclaw-labs/zeroclaw/issues/10952) | Seam sanitizers 重写 signed reasoning，Anthropic 拒绝重放 | CLOSED | 无 |
| [#10918](https://github.com/zeroclaw-labs/zeroclaw/issues/10918) | 空尾部 chunk 错误标记精确匹配的 HTTP 响应为截断 | CLOSED | 无 |
| [#11036](https://github.com/zeroclaw-labs/zeroclaw/issues/11036) | OpenCode big-pickle 返回 403 FreeTierError | OPEN | 无 |
| [#9392](https://github.com/zeroclaw-labs/zeroclaw/issues/9392) | LINE 群消息跳过白名单和配对握手 | CLOSED | 无 |
| [#9391](https://github.com/zeroclaw-labs/zeroclaw/issues/9391) | 命令审计日志默认启用但写入空内容 | CLOSED | 无 |

### 严重级别 S3 (次要问题)

| Issue | 描述 | 状态 | Fix PR |
|-------|------|------|--------|
| [#10918](https://github.com/zeroclaw-labs/zeroclaw/issues/10918) | 空尾部 chunk 错误标记精确匹配的 HTTP 响应为截断 | CLOSED | 无 |

---

## 6. 功能请求与路线图信号

### 高优先级 RFC/功能请求

1. **#4853** - 从 `.well-known` 索引安装技能 ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/4853))  
   **路线图信号:** Agent Skills 标准化，与 Cloudflare/Vercel 生态对齐。

2. **#11053** - 知识图谱作为一等公民的代理记忆层 ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11053))  
   **路线图信号:** 区分"工具"与"记忆"，推动知识图谱从被动查询转向主动捕获。

3. **#10970** - 主机级 admission control 与资源限制 ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10970))  
   **路线图信号:** 多代理部署的稳定性保障，影响生产环境架构。

4. **#10930** - 代理-人类问题的持久化原语 ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10930))  
   **路线图信号:** 统一交互模型，复用 SOP 门控机制。

5. **#10929** - 出站消息投递回执 ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10929))  
   **路线图信号:** 可靠性提升，影响所有通道集成。

6. **#11027** - 代理间会话消息传递 ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11027))  
   **路线图信号:** 多代理协作能力，避免历史合并。

7. **#9597** - 对等代理 turn 持久化与可归因性 ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9597))  
   **路线图信号:** 长期功能，解决 detached `process_message` 的生命周期问题。

### 近期 PR 覆盖的功能

- WhatsApp Web 通道增强：PDF 预览 (#10980)、主题分隔符渲染 (#11054)、投票读取 (#10988)、房间创建/邀请 (#10979)
- 运行时修复：no-vision 错误门控 (#10904)、工具附件显式声明 (#10938)、历史追踪报告 (#9368)
- 多模型支持：#9809 允许单 provider profile 托管多模型

---

## 7. 用户反馈摘要

### 痛点
1. **WhatsApp 通道可靠性不足**：`force_voice`/`suppress_voice` 被忽略、图片无预览、标题渲染缺失，影响用户体验。
2. **通道工具在 daemon 场景不可用**：webhook/cron/SOP 触发的 turn 无法访问通道，限制自动化场景。
3. **历史裁剪破坏 prompt caching**：工具密集型会话反复触发裁剪，增加成本。
4. **审计日志空白**：默认启用但无写入，安全合规需求未满足。
5. **WeChat 消息丢失风险**：游标持久化顺序问题导致崩溃时数据丢失。

### 满意点
1. **RFC 流程活跃**：多个架构级 RFC 得到深入讨论，体现治理成熟度。
2. **快速响应 Bug**：高优先级 Bug 通常有对应 PR 或在途修复。
3. **文档改进**：replacement-first policy 等治理决策得到文档化。

---

## 8. 待处理积压

### 长期未响应的高优先级 Issue

| Issue | 创建日期 | 严重程度 | 备注 |
|-------|----------|----------|------|
| [#9392](https://github.com/zeroclaw-labs/zeroclaw/issues/9392) | 2026-07-26 | P1/High | LINE 群消息安全漏洞，已 closed 但需验证修复 |
| [#9391](https://github.com/zeroclaw-labs/zeroclaw/issues/9391) | 2026-07-26 | P1/High | 审计日志默认启用但无写入，已 closed 但需验证 |
| [#9187](https://github.com/zeroclaw-labs/zeroclaw/issues/9187) | 2026-07-20 | P1/High | WeChat 消息丢失，状态 in-progress |
| [#9597](https://github.com/zeroclaw-labs/zeroclaw/issues/9597) | 2026-07-31 | P2/High | 对等代理 turn 持久化，长期功能 |
| [#10225](https://github.com/zeroclaw-labs/zeroclaw/issues/10225) | 2026-08-21 | P1/High | ZeroCode RPC 无法访问通道，有 PR 但在途 |
| [#10594](https://github.com/zeroclaw-labs/zeroclaw/issues/10594) | 2026-09-03 | P1/Medium | Cron 静默不执行，无 Fix PR |
| [#11055](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) | 2026-09-22 | Medium | Daemon channel-map 工厂未注册，与 #10225 同源 |

### 建议关注
- **#10594** 和 **#11055** 为近期新增的中高优先级问题，尚无 Fix PR，建议维护者评估排期。
- **#11058** (S0 安全风险) 需尽快处理，`allowed_commands` 绕过机制可能导致未授权高风险命令执行。

---

**报告生成时间：** 2026-09-23  
**分析师：** AI 智能体与个人 AI 助手领域开源项目分析师  
**数据来源：** [Zeroclaw GitHub](https://github.com/zeroclaw-labs/zeroclaw)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：** 2026-09-23
**数据来源：** GitHub (sipeed/picoclaw)

## 1. 今日速览
过去24小时 PicoClaw 项目保持高活跃度，共处理 6 个活动项（2 个 Issues，4 个 PRs）。维护者 `@sting8k` 集中修复了配置模块中的两个关键 Bug（数据竞争和静默数据丢失），并关闭了相关长期未解决的 PR。整体项目状态健康，主要聚焦于配置稳定性的修复而非新功能发布。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日重点推进了配置系统的稳定性和渠道兼容性：
*   **配置线程安全修复**：PR [#3375](https://github.com/sipeed/picoclaw/pull/3375) 修复了 `Config.initSensitiveCache` 中的并发竞态条件，确保敏感数据缓存的懒加载是线程安全的，防止潜在的 Panic。
*   **反应工具配置修复**：PR [#3372](https://github.com/sipeed/picoclaw/pull/3372) 修正了 `reaction` 工具的开关配置路径问题，使其能够通过 `ToolsConfig` 正确启用或禁用，提升了配置管理的完备性。
*   **QQ Channel 功能增强**：PR [#1349](https://github.com/sipeed/picoclaw/pull/1349) 经过长期迭代后合并，增强了对 QQ 频道中更多附件类型（语音、图片、视频、文件）的解析、接收和回复能力，显著改善了该渠道的用户体验。

## 4. 社区热点
*   **配置 Bug 修复讨论**：Issue [#3373](https://github.com/sipeed/picoclaw/issues/3373) 和 [#3374](https://github.com/sipeed/picoclaw/issues/3374) 均由 `@sting8k` 提交并快速修复。这两个问题涉及 `LoadConfig` -> `SaveConfig` 循环中的数据静默丢失和并发崩溃，是配置层面的严重缺陷。社区对此类底层稳定性问题反应积极，迅速通过 PR 闭环。
*   **搜索提供商扩展**：PR [#3370](https://github.com/sipeed/picoclaw/pull/3370) 引入了 Keenable 作为新的 `web_search` 提供商，支持无需 API Key 的公开搜索端点，满足了用户对免费/低门槛搜索能力的潜在需求。

## 5. Bug 与稳定性
今日关闭了两个关键 Bug，均为配置模块：
1.  **严重 - 数据竞态导致 Panic**：Issue [#3374](https://github.com/sipeed/picoclaw/issues/3374) 描述 `sensitiveCache` 初始化缺乏同步保护，可能导致 `FilterSensitiveData` 返回 nil replacer 并引发 Panic。已由 PR [#3375](https://github.com/sipeed/picoclaw/pull/3375) 修复。
2.  **严重 - 静默数据丢失**：Issue [#3373](https://github.com/sipeed/picoclaw/issues/3373) 指出多个 `api_key` 在配置保存后仅保留第一个，且可能留下悬空引用。虽然具体修复 PR 未直接关联列出，但该 Issue 已关闭，暗示问题已解决。

## 6. 功能请求与路线图信号
*   **多模态 QQ 频道支持**：PR [#1349](https://github.com/sipeed/picoclaw/pull/1349) 的合并表明项目正致力于增强 QQ 渠道的多媒体处理能力，后续可能会看到更多关于 QQ 频道互动功能的优化。
*   **多样化搜索源**：PR [#3370](https://github.com/sipeed/picoclaw/pull/3370) 添加 Keenable 搜索 provider，显示项目在扩展默认工具集（特别是 `web_search`）方面保持开放，以提供无需密钥的备选方案。

## 7. 用户反馈摘要
*   **痛点**：用户对配置文件的持久化行为高度敏感。Issue [#3373](https://github.com/sipeed/picoclaw/issues/3373) 中描述的“静默删除多余 api_key”会导致严重的配置错误且难以察觉，这是典型的高优先级痛点。
*   **场景**：QQ 频道用户使用多种附件类型（语音、视频、文件）进行通信，原有支持不足限制了沟通效率，PR [#1349](https://github.com/sipeed/picoclaw/pull/1349) 的修复直接回应了这一场景需求。
*   **满意度**：维护者对并发安全和配置项暴露的控制权（如 reaction 工具开关）表现出细致的关注，修复速度快，提升了用户对系统稳定性的信心。

## 8. 待处理积压
*   **Keenable 搜索 PR 审查**：PR [#3370](https://github.com/sipeed/picoclaw/pull/3370) 当前状态为 OPEN，等待合并。这是一个新增功能请求，建议尽快审查以丰富搜索能力。
*   **长期未关闭 Issue**：部分 Issue 标记为 `[stale]`，需确认是否仍有实际需求或已废弃，建议维护者清理或归档。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：** 2026-09-23  
**分析对象：** [agentscope-ai/qwenpaw](https://github.com/agentscope-ai/qwenpaw)

## 1. 今日速览
过去24小时 QwenPaw 保持高活跃状态，共处理 **87 条** 社区反馈（37 Issues + 50 PRs）。核心亮点在于**测试覆盖率冲刺**（Batch-3 新增47个测试文件，覆盖率提升至73.79%）以及多项关键后端修复的合并。尽管无新版本发布，但针对 v2.2.1 的稳定性补丁（如超时恢复、Tool Call 序列化、零停机 reload 一致性）正在密集修复中，项目整体健康度良好，处于从 v2.2.1 向 v2.2.2 过渡的维稳期。

## 2. 版本发布
**无新版本发布。**  
当前最新版本为 v2.2.1，社区正在集中修复该版本暴露的若干 Bug（如 Issue #7935, #7883, #7567）。预计 v2.2.2 将包含本期多个已合并或待合并的修复项。

## 3. 项目进展
今日主要合并/关闭了以下重要 PR，推动了核心稳定性与用户体验改进：

*   **Pet 插件审批修复 (#7898, #7933)**: 修复了启用 `qwenpaw-pet` 插件后，所有工具审批请求返回 HTTP 500 的严重 Bug。`#7898` 解决了 ApprovalService 的错误逻辑，`#7933` 补充了调用者身份传递的修复。这直接恢复了桌面端宠物交互功能的可用性。
*   **单元测试覆盖冲刺 (#7938)**: 修复了因 PR `a461a95a26c2` 导致的 Windows 单元测试收集失败问题，确保了 CI 流程的稳定性，为后续功能迭代奠定了测试基础。
*   **本地模型 Tool Calls 支持 (#1512)**: 长期存在的本地模型不支持 OpenAI 风格嵌套 Tool Calls 的问题得到修复，增强了对非标准 API 实现的兼容性。
*   **子代理生命周期管理 (#4955)**: 为 `spawn_subagent(background=True)` 添加了父级生命周期追踪和取消传播机制，解决了 Issue #4923 中提到的子任务不可见、无法取消的问题。

## 4. 社区热点
以下是评论数最多、讨论最激烈的议题，反映了用户当前的核心痛点：

*   **对话级模型指定功能 (#6318)**: 用户强烈希望支持在 Conversation 级别覆盖 Agent 默认的模型绑定，而非全局统一。评论数 8，体现了多模型切换场景下的灵活性需求。
*   **停止任务后的状态不一致与 409 报错 (#7567, #7559, #7929)**: 同一作者 @rerbin 连续报告了两个紧密相关的问题：点击停止后任务仍在后台运行，且重新发消息触发 409 冲突错误。这是 v2.2 版本中影响体验最严重的并发控制 Bug，目前 Issue #7929 已关闭，但 #7567 和 #7559 仍在关注中，暗示修复可能尚未完全根除副作用。
*   **添加模型步骤繁琐 (#4036)**: 用户抱怨配置新模型需要多次点击跳转，呼吁简化 UI 流程。此诉求与 PR #3819（远程模型浏览与批量导入）高度相关，后者旨在替代现有的 Auto Discover 模式。
*   **历史对话移至右侧 (#7739)**: 针对 14 寸笔记本屏幕空间不足的问题，用户提议将历史列表移至右侧以优化布局。

## 5. Bug 与稳定性
今日报告的 Bug 按严重程度排列，部分已有 Fix PR：

| 问题描述 | 严重性 | 状态 | 关联 PR/Issue |
| :--- | :--- | :--- | :--- |
| **LLM 超时后进程永挂，需手动重启** (#7935) | **高** | OPEN | 新报告，无 Fix PR |
| **Tool 返回的 PDF 序列化错误导致 DeepSeek 400** (#7883) | **高** | OPEN | 修复被驳回或未完成，原 #7621 失效 |
| **Workspace 文件浏览器冻结整个服务器** (#7721) | **高** | OPEN | `watchfiles.awatch` 阻塞事件循环 |
| **Driver 卡片策略丢失更新** (#7850) | **中** | OPEN | 竞态条件导致配置被覆盖 |
| **Volcengine Ark API 拒绝 Assistant 结尾的请求** (#7549) | **中** | OPEN | 协议适配问题 |
| **Markdown 表格在 Telegram 不渲染** (#7585) | **低** | CLOSED | 渠道适配问题 |
| **上下文压缩产生无意义空白标签** (#7771) | **低** | CLOSED | UI 显示问题 |

**重点风险提示：** Issue #7935 描述了一个可能导致服务长时间不可用的稳定性漏洞（Timeout 后自愈失败），建议维护者优先调查。Issue #7721 涉及核心架构（SSE/Event Loop），影响大规模工作区用户。

## 6. 功能请求与路线图信号
*   **模型自动降级/回退链 (#4882, #5351, #5572, #3789)**: 多个 Issue 集中请求当主模型配额耗尽或超时时，自动切换至备选模型。虽然 PR #4955 等在处理子代理，但主模型的 Failover 机制仍是高频需求。目前代码中 `RoutingChatModel` 存在但未广泛实例化，未来版本有望引入更健壮的自动降级策略。
*   **模型管理界面优化 (#4036, #3819)**: 用户期望简化模型添加流程。PR #3819 已提出“可浏览的远程模型列表”方案，预计将在下一版本中替换现有的 Auto Discover 功能，显著改善模型配置体验。
*   **思考深度选择器 (#6229, #4840)**: 用户希望在 UI 中直接切换 Light/Medium/Deep/Auto 思考模式，无需修改配置文件。这是提升普通用户友好度的重要功能，已有明确的 Enhancement 请求。
*   **持久化聊天记录 (#7931)**: PR #7931 提出了基于 SQLite 的持久化转录历史记录功能，支持分页和去重，这可能标志着 QwenPaw 开始重视长周期会话的数据留存能力。

## 7. 用户反馈摘要
*   **痛点：**
    *   **并发控制缺陷**：多位用户反馈在任务执行中发送新消息或停止任务后，系统状态不同步，导致 409 错误或任务“假死”。
    *   **配置繁琐**：模型添加流程步骤过多，缺乏批量操作和直观的选择界面。
    *   **UI 适配不足**：在较小屏幕（14寸笔记本）上，左侧历史列表挤压了主要内容区域，用户急需布局调整（如 Issue #7739）。
    *   **稳定性焦虑**：一旦遇到 LLM 超时（Issue #7935），进程无法恢复，必须手动干预，这对依赖 QwenPaw 自动化运行的用户来说是致命体验。
*   **满意点：**
    *   **Plugin 生态修复**：Pet 插件的审批功能恢复让用户感到欣慰（PR #7898）。
    *   **测试质量提升**：用户和社区贡献者对测试覆盖率的提升（#7941）表示认可，认为这有助于长期稳定性。

## 8. 待处理积压
以下 Issue 已开放一段时间且尚未找到有效的 Fix PR，建议维护者关注：

1.  **#7935 [Bug] LLM Request timed out 后永不自动恢复**: 这是一个严重的稳定性问题，影响 v2.2.1 用户。目前尚无关联的 Fix PR，需优先排查重试机制或进程健康检查逻辑。
2.  **#7721 [Bug] Workspace 文件浏览器冻结服务器**: 根本原因在于 `watchfiles` 的同步初始化阻塞了 Asyncio 事件循环。需要评估是否切换至异步文件或调整 Watch 策略。
3.  **#7883 [Bug] Tool-returned PDF 序列化问题**: 之前标记为修复（#7621）但实际未解决，DeepSeek 等第三方 Provider 兼容性问题持续存在。
4.  **#7850 [Bug] Driver card policy lost update**: 竞态条件导致的配置丢失，影响 Driver 管理的可靠性。

---
*本报告由 Agnes (Sapiens AI) 生成，基于 2026-09-23 的 GitHub 公开数据。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报 — 2026-09-23

---

## 1. 今日速览

过去24小时 hermes-agent 保持高活跃节奏：500条 Issues + 500条 PR，其中104个 Issue 关闭、82个 PR 已合并，显示团队在稳定性修复上投入较重。全日本无新版本发布，但**多轮 Desktop/session-state 关键 Bug 同日涌现**（5个 P1），并伴随多个 fix PR 并行推进，说明底层数据库并发写入路径仍是当前最大风险面。社区对"跨网关机器人协作"和"系统托盘后台运行"功能诉求强烈（高评论+高 👍），路线图信号清晰。

---

## 2. 版本发布

**无新版本发布。**

上一个稳定版本号（v0.19.x 系列）仍在线上运行。今日关闭的 PR 均为功能增强和 Bug 修复，未触发版本 bump。

---

## 3. 项目进展

### 今日已合并/关闭的重要 PR（3个）

| PR | 作者 | 贡献内容 |
|----|------|----------|
| [#119651](https://github.com/NousResearch/hermes-agent/pull/119651) `Fix/desktop multi gateway` | @paul-forgeguard | 修复桌面端多网关切换会话列表不同步问题 |
| [#119649](https://github.com/NousResearch/hermes-agent/pull/119649) `fmt(js): auto-fix` | hermes-seaeye[bot] | 自动格式化 lint fix |
| [#119644](https://github.com/NousResearch/hermes-agent/pull/119644) `Installed plugins' MCP tools live in every open chat` | @alt-glitch | **体验重大改进**：安装插件后无需 `/reload-mcp` 或重启，MCP 工具立即在所有开放聊天中生效 |
| [#119633](https://github.com/NousResearch/hermes-agent/pull/119633) `Catalog install card with Advanced modal` | @alt-glitch | **插件目录安装 UX 重构**：每个 catalog 插件/技能独立成行，支持安装/调整/跳过 |
| [#81563](https://github.com/NousResearch/hermes-agent/pull/81563) `[macOS] missing NSLocalNetworkUsageDescription` | @HAOoool | 修复 macOS 本地网络访问被静默拒绝的问题 |
| [#71998](https://github.com/NousResearch/hermes-agent/pull/71998) `pre_llm_call plugin context dropped for multimodal` | @MikeSchulze97 | 修复多模态图片轮次中 plugin context 被静默丢弃的 Bug |
| [#50698](https://github.com/NousResearch/hermes-agent/pull/50698) `hermes config set strips comments` | @notwitcheer | 修复 `config set` 会删除 YAML 注释和模板块的问题 |
| [#99640](https://github.com/NousResearch/hermes-agent/pull/99640) `plugin context-engine cloning ignores clone_for_agent()` | @cnlapointe10 | 修复 LCM 插件在子 Agent 初始化时 context 克隆回退的问题 |

### 今日开放的强价值 PR（待合并）

| PR | 核心贡献 |
|----|----------|
| [#119444](https://github.com/NousResearch/hermes-agent/pull/119444) `feat(models): add Claude Opus 5.5` | 添加 Claude Opus 5.5 模型支持，1M token 上下文，已在 Anthropic/Bedrock 双目录注册 |
| [#119657](https://github.com/NousResearch/hermes-agent/pull/119657) `feat(catalog): hermes-session-warmer v0.1.0` | 引入 session warmer 插件（MIT 协议），用于预热冷启动会话 |
| [#102341](https://github.com/NousResearch/hermes-agent/pull/102341) `feat(provider-routing): pass through unknown keys` | 转发 OpenRouter `provider_routing` 未知字段，兼容未来路由策略 |
| [#119655](https://github.com/NousResearch/hermes-agent/pull/119655) `fix(voice): convert non-WAV to WAV for Linux` | 修复 Linux 上 TTS MP3 播放崩溃问题，统一转为 WAV |
| [#119654](https://github.com/NousResearch/hermes-agent/pull/119654) `fix(tools): honor tool_output.max_bytes in execute_code` | 统一 stdout 上限配置，`execute_code` 与 `terminal` 工具对齐 |
| [#119653](https://github.com/NousResearch/hermes-agent/pull/119653) `matrix: fix Beeper reaction-key mismatch` | 修复 Matrix/Beeper emoji 反应键不匹配导致的审批失败 |
| [#119652](https://github.com/NousResearch/hermes-agent/pull/119652) `fix(agent): clamp subscription reset_at` | 修复多凭证订阅归零时 cooldown 计算不准的问题 |
| [#119650](https://github.com/NousResearch/hermes-agent/pull/119650) `fix(sessions): keep session renames from freezing` | 会话重命名操作从主线程移至 worker，防止 Desktop 假死 |
| [#119648](https://github.com/NousResearch/hermes-agent/pull/119648) `fix(classifier): 403 transient upstream ≠ auth failure` | 修复上游瞬态失败被误判为认证失败导致凭证被错误 bench |
| [#119156](https://github.com/NousResearch/hermes-agent/pull/119156) `fix(desktop): retain provider setup connection` | 修复 ChatGPT/Codex 订阅提供者设置时连接归属丢失 |
| [#119183](https://github.com/NousResearch/hermes-agent/pull/119183) `fix(desktop): persist edit previews before flush` | 修复文件编辑预览在工具结果刷新后丢失的问题 |
| [#119184](https://github.com/NousResearch/hermes-agent/pull/119184) `fix(desktop): keep image frames stable` | 修复延迟加载图片导致帧高度抖动 |

> **整体前进评估**：今日合并/关闭的 PR 以**稳定性修复和体验打磨为主**，重点解决了 session-state 相关的多处崩溃/数据异常，同时完成了插件安装流程的 UX 重构。开放 PR 中有3个高价值新功能（Claude Opus 5.5、session-warm、i18n 印尼语），项目整体处于**"稳定冲刺期"**。

---

## 4. 社区热点

### 🔥 评论数 Top 5 活跃 Issue

| # | 标题 | 评论 | 👍 | 热度分析 |
|---|------|------|----|----------|
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) | Automated Nous integration blocked | 132 | 0 | 自动化集成 CI/CD 流程阻塞，严重威胁发布节奏，维护者需紧急关注 |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | Let Bots collaborate across gateways | 30 | 2 | **高价值路线图信号**：多网关跨设备机器人协作是高级用户的核心痛点，已有明确需求场景 |
| [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) | state.db corruption x4 in 5 weeks | 16 | 0 | 生产级数据损坏，多 writer WAL 路径有结构性缺陷，直接影响可靠性 |
| [#11941](https://github.com/NousResearch/hermes-agent/issues/11941) | HTML email support | 14 | 4 | 📈 高 👍 比，Markdown→HTML 邮件渲染需求强烈，发送端用户体验缺口明显 |
| [#38007](https://github.com/NousResearch/hermes-agent/issues/38007) | System tray background running | 14 | 19 | ⭐ **最高 👍 Issue**：Windows/Linux 系统托盘常驻，用户期望 Desktop 像普通桌面应用一样后台运行 |

### 🔥 最新同日报告（2026-09-22 创建）

| # | 标题 | 影响 |
|---|------|------|
| [#119003](https://github.com/NousResearch/hermes-agent/issues/119003) | kanban dispatch destroys task rows | 多路网关下真实任务被占位符覆盖，任务数据丢失风险 |
| [#118693](https://github.com/NousResearch/hermes-agent/issues/118693) | 后台 review 阻止轮次渲染 | 自审机制与 UI 渲染竞争，用户看到空白 |
| [#118670](https://github.com/NousResearch/hermes-agent/issues/118670) | 长流式回复重复渲染 | DB 仅一份但 UI 显示两次，streaming 路径竞争条件 |
| [#119195](https://github.com/NousResearch/hermes-agent/issues/119195) | 多级 fallback 配额耗尽时卡死 | primary + 第一 fallback 同时 bench 时无降级处理 |

---

## 5. Bug 与稳定性

### P1 严重级（今日重点关注）

| # | 摘要 | 状态 | 已有 Fix PR |
|---|------|------|-------------|
| [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) | `state.db` 5周内4次损坏，multi-writer WAL 路径结构性风险 | OPEN | ❌ 尚无直接 fix，属于追踪中 |
| [#117867](https://github.com/NousResearch/hermes-agent/issues/117867) | Desktop 热恢复时最新轮次消失 | OPEN | ❌ 暂无 |
| [#100573](https://github.com/NousResearch/hermes-agent/issues/100573) | Electron 40.10.2 on Linux SIGTRAP（string_view::substr OOB） | OPEN | ❌ 暂无，Electron 升级需评估 |
| [#68927](https://github.com/NousResearch/hermes-agent/issues/68927) | 长任务后 Enter 提交成功但 UI 不渲染 | OPEN | ❌ 暂无 |
| [#118693](https://github.com/NousResearch/hermes-agent/issues/118693) | 后台 review 运行时轮次不渲染 | OPEN | ❌ 暂无 |
| [#110054](https://github.com/NousResearch/hermes-agent/issues/110054) | deleted-WAL guard 触发后无产品内恢复路径（本周 9用户/13 Issue） | OPEN | ⚠️ [#119650](https://github.com/NousResearch/hermes-agent/pull/119650) 缓解而非根除 |
| [#72046](https://github.com/NousResearch/hermes-agent/issues/72046) | state.db 损坏时 Desktop 静默展示空会话列表 | OPEN | ❌ 尚无 |
| [#68502](https://github.com/NousResearch/hermes-agent/issues/68502) | Telegram 网关重复处理入站消息导致重复回复 | OPEN | ❌ 暂无 |

### P2 严重级

| # | 摘要 | 状态 | Fix PR |
|---|------|------|--------|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | 跨网关 Bot 协作（特性请求） | OPEN | — |
| [#119195](https://github.com/NousResearch/hermes-agent/issues/119195) | fallback 链全配额耗尽时卡死 | OPEN | ⚠️ [#119648](https://github.com/NousResearch/hermes-agent/pull/119648) 缓解阈值误判，未覆盖全链路 |
| [#118670](https://github.com/NousResearch/hermes-agent/issues/118670) | 长流式回复 UI 重复渲染 | OPEN | ❌ 暂无 |
| [#92352](https://github.com/NousResearch/hermes-agent/issues/92352) | 切换网关后会话列表不刷新 | OPEN | ✅ [#119651](https://github.com/NousResearch/hermes-agent/pull/119651) |
| [#86565](https://github.com/NousResearch/hermes-agent/issues/86565) | 会话等待审批时状态点颜色不更新 | OPEN | ❌ 暂无 |
| [#47742](https://github.com/NousResearch/hermes-agent/issues/47742) | vision_analyze 快路径破坏非工具结果视觉提供商 | OPEN | ❌ 暂无 |

> **稳定性评估**：`state.db` 相关 Bug 占据今日 P1 问题的半数以上，**WAL 并发写入路径是项目当前最大单点风险**，建议维护者优先排查 `agent_init.py` 与 `session_persistence.py` 的锁策略。

---

## 6. 功能请求与路线图信号

| 需求 | 来源 Issue | 对应 PR | 纳入下一版本可能性 |
|------|-----------|---------|------------------|
| 跨网关 Bot 协作（Group Chat，桌面无关） | [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | — | 🟡 中长期，架构改动大 |
| Windows/Linux 系统托盘后台运行 | [#38007](https://github.com/NousResearch/hermes-agent/issues/38007) | — | 🟢 高（19 👍，成熟需求） |
| HTML 邮件支持（Markdown→multipart/alternative） | [#11941](https://github.com/NousResearch/hermes-agent/issues/11941) | — | 🟢 高（4 👍，实现路径清晰） |
| Claude Opus 5.5 模型支持 | — | [#119444](https://github.com/NousResearch/hermes-agent/pull/119444) | 🟢 **极可能已纳入即将发布** |
| Session Warmer 预热插件 | — | [#119657](https://github.com/NousResearch/hermes-agent/pull/119657) | 🟢 已提交 catalog，低风险 |
| Indonesian i18n 文档 | — | [#92192](https://github.com/NousResearch/hermes-agent/pull/92192), [#93632](https://github.com/NousResearch/hermes-agent/pull/93632) | 🟢 已提交，文档补全 |
| OpenRouter provider_routing 透传 | — | [#102341](https://github.com/NousResearch/hermes-agent/pull/102341) | 🟢 兼容性强，低风险 |
| PowerShell 终端支持（Windows） | [#36929](https://github.com/NousResearch/hermes-agent/issues/36929) | — | 🟡 中等，需平台适配 |
| Home Assistant `deliver` 目标可配置 | [#35060](https://github.com/NousResearch/hermes-agent/issues/35060) | — | 🟡 中等，场景较窄 |

---

## 7. 用户反馈摘要

### 真实痛点提炼

1. **session-state 稳定性焦虑**：多位生产用户反映 `state.db` 损坏导致会话丢失或 UI 假死，且**产品内无恢复引导**，用户只能重启或手动运行 `doctor --fix`，反而加重问题（[#110054](https://github.com/NousResearch/hermes-agent/issues/110054)）。

2. **Desktop 冷启动体验差**：关闭窗口即完全退出，每次重新打开需数秒冷启动（Electron + Python backend），用户强烈期望系统托盘常驻（[#38007](https://github.com/NousResearch/hermes-agent/issues/38007)，👍19）。

3. **多网关切换后的状态不一致**：切换本地/远程网关后会话列表不刷新，用户感知为"新聊天没有路由到新网关"（[#92352](https://github.com/NousResearch/hermes-agent/issues/92352)）。

4. **长流式回复渲染重复**：DB 中只有一份回复但 UI 显示两条，影响专业场景可信度（[#118670](https://github.com/NousResearch/hermes-agent/issues/118670)）。

5. **邮件内容纯文本限制**：Markdown 格式的回复在邮件中完全失去格式，影响报告类场景（[#11941](https://github.com/NousResearch/hermes-agent/issues/11941)）。

### 用户满意点
- 插件安装体验大幅改善（[#119644](https://github.com/NousResearch/hermes-agent/pull/119644) 消除 `/reload-mcp` 手动操作）
- Catalog 安装卡片独立成行，支持安装/调整/跳过三态操作（[#119633](https://github.com/NousResearch/hermes-agent/pull/119633)）

---

## 8. 待处理积压

### ⚠️ 需维护者优先介入

| Issue | 风险 | 说明 |
|-------|------|------|
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) | 高 | 自动化 Nous 集成阻塞，132条评论无实质进展，阻碍发布流水线 |
| [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) | 高 | state.db 5周4次损坏，生产级数据安全风险，尚无根治方案 |
| [#110054](https://github.com/NousResearch/hermes-agent/issues/110054) | 高 | deleted-WAL 触发后无产品内恢复，本周影响9个独立用户/13个 Issue |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | 中 | 跨网关协作是高价值功能，社区呼声最强，建议排入路线图评估 |
| [#38007](https://github.com/NousResearch/hermes-agent/issues/38007) | 中 | 系统托盘需求 👍19，Desktop 基础体验短板，应优先排期 |

### 📋 建议跟进
- [#72046](https://github.com/NousResearch/hermes-agent/issues/72046)：state.db 损坏后的降级展示设计（与 #110054 相关）
- [#68502](https://github.com/NousResearch/hermes-agent/issues/68502)：Telegram 重复消息处理，影响消息可靠性
- [#119003](https://github.com/NousResearch/hermes-agent/issues/119003)：kanban 任务行被占位符覆盖，数据丢失风险

---

**报告生成时间**：2026-09-23  
**数据来源**：github.com/NousResearch/hermes-agent

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期：** 2026-09-23  
**分析时段：** 2026-09-22 00:00 - 2026-09-22 23:59 (UTC+8)  
**分析师：** AI Agent Analyst

---

## 1. 今日速览

AstrBot 社区在今日保持**高活跃度**，过去24小时内共产生 **6 个新 Issue** 和 **18 个 PR 活动**（13 个进行中，5 个已关闭/合并），无新版本发布。项目核心维护者及贡献者正集中修复一系列**关键稳定性与安全性问题**，包括路径遍历漏洞、历史消息上下文污染、Windows 长路径兼容性及知识库检索优化等。整体项目处于**高质量迭代周期**，代码审计与安全加固成为当前重心，社区反馈响应迅速。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

### 重要合并/关闭 PR

1.  **安全与核心修复批量合并**
    *   **#7660** [CLOSED] - `send_message_to_user` 相对路径解析修复：解决了发送文件时相对路径错误解析为工作目录而非 workspace 目录的问题，提升了工具调用的准确性。([链接](https://github.com/AstrBotDevs/AstrBot/pull/7660))
    *   **#7959** [CLOSED] - OpenAI Provider 最大重试次数可配置：将硬编码的 10 次重试改为可配置项（1-50），默认保持 10，缓解了超时等待过久的问题。([链接](https://github.com/AstrBotDevs/AstrBot/pull/7959))
    *   **#9786** [CLOSED] - Anthropic 非流式响应文本块累积修复：修正了 `completion_text` 在循环中被覆盖而非累积的 Bug，确保多块文本内容完整返回。([链接](https://github.com/AstrBotDevs/AstrBot/pull/9786))
    *   **#6186** [CLOSED] - 文档新增备份导入操作流程：补充了缺失的数据备份与恢复文档，改善了用户体验。([链接](https://github.com/AstrBotDevs/AstrBot/pull/6186))

2.  **正在进行的关键 PR**
    *   **#10201** [OPEN] - 安全加固与运行时 Bug 修复：包含 35 个提交，涵盖路径遍历（CWE-22）修复等多处安全性增强，是今日最重要的安全补丁包。([链接](https://github.com/AstrBotDevs/AstrBot/pull/10201))
    *   **#10200** [OPEN] - 插件 README 相对链接修复：直接修复 Issue #9950，将插件文档中的相对路径正确指向仓库文件，提升文档可读性。([链接](https://github.com/AstrBotDevs/AstrBot/pull/10200))
    *   **#10187** [OPEN] - Dashboard 静态资源 Gzip 压缩：针对 Issue #10186，为 JS/CSS/HTML 添加压缩支持，预计显著降低 Dashboard 直连时的带宽消耗。([链接](https://github.com/AstrBotDevs/AstrBot/pull/10187))

---

## 4. 社区热点

1.  **历史消息上下文优化请求** ([#10195](https://github.com/AstrBotDevs/AstrBot/issues/10195))
    *   **热度分析：** 用户提出希望过滤思维链（think blocks）、图片 URL 及工具调用原始数据，仅保留简洁语义对话进入历史上下文。这反映了用户对 **Token 成本控制**和**模型注意力稀释**的深层担忧，是高频痛点。
2.  **Web UI 搜索功能扩展** ([#10196](https://github.com/AstrBotDevs/AstrBot/issues/10196))
    *   **热度分析：** 用户希望为“技能”和“MCP”管理页面添加搜索功能，与现有的“插件”和“管理行为”页面保持一致。这体现了随着插件生态增长，**用户体验一致性**和**管理效率**的重要性日益凸显。
3.  **Dashboard 静态资源压缩** ([#10186](https://github.com/AstrBotDevs/AstrBot/issues/10186))
    *   **热度分析：** 用户通过实测数据（4.5MB JS 文件无压缩）指出 Dashboard 直连时的性能瓶颈，并提出了缓存策略建议。已有 PR #10187 正在处理此问题，显示了良好的社区互动闭环。

---

## 5. Bug 与稳定性

| 严重级别 | 问题描述 | Issue/PR | 状态 |
| :--- | :--- | :--- | :--- |
| **高** | 插件删除后重新上传失败，因 fork 修改导致 hardfork 冲突 | [#10198](https://github.com/AstrBotDevs/AstrBot/issues/10198) | OPEN |
| **高** | QQ (aiocqhttp) 引用图片消息无法解析内容，机器人无反应也无报错 | [#10179](https://github.com/AstrBotDevs/AstrBot/issues/10179) | OPEN (有 PR #10194 尝试修复) |
| **中** | 插件 README 中相对路径点击跳转错误 | [#9950](https://github.com/AstrBotDevs/AstrBot/issues/9950) | OPEN (有 PR #10200 修复) |
| **中** | Windows 下插件更新因路径过长报错 | - | OPEN (有 PR #10193 修复) |
| **低** | 历史消息中系统提醒被持久化，导致上下文膨胀和过时信息 | - | OPEN (有 PR #10191 修复) |

**稳定性评估：** 今日多个关键 Bug 已有对应 PR 在开发或审核中，项目稳定性正在快速改善。特别是 QQ 图片解析和插件路径问题，直接影响核心功能使用。

---

## 6. 功能请求与路线图信号

1.  **上下文精简与 Token 优化** ([#10195](https://github.com/AstrBotDevs/AstrBot/issues/10195))
    *   **信号：** 用户强烈要求提供开关以过滤历史消息中的非文本内容（思维链、图片 URL 等）。这符合 AI 助手领域对**成本优化**和**上下文质量**的追求，极有可能被纳入未来版本的核心功能。
2.  **UI 搜索功能扩展** ([#10196](https://github.com/AstrBotDevs/AstrBot/issues/10196))
    *   **信号：** 用户对 Web UI 的管理功能提出了更细致的需求。鉴于已有 PR 在推进类似功能，此需求很可能在下一版本中实现，以提升易用性。
3.  **Dashboard 性能优化** ([#10186](https://github.com/AstrBotDevs/AstrBot/issues/10186))
    *   **信号：** 用户对静态资源加载性能的关注，以及已有 PR #10187 的支持，表明项目团队正在响应此类基础设施优化请求。

---

## 7. 用户反馈摘要

*   **痛点：**
    *   **插件管理复杂：** 用户反映在插件因 fork 修改后难以重新上传，反馈渠道不畅（[#10198](https://github.com/AstrBotDevs/AstrBot/issues/10198)）。
    *   **功能缺失导致体验下降：** QQ 图片引用功能异常，严重影响多模态交互体验（[#10179](https://github.com/AstrBotDevs/AstrBot/issues/10179)）。
    *   **Token 浪费：** 用户明确指出历史消息中携带大量无用数据（思维链、图片 URL）导致 Token 消耗巨大且稀释上下文质量（[#10195](https://github.com/AstrBotDevs/AstrBot/issues/10195)）。
*   **满意点：**
    *   **响应速度：** 社区对用户反馈的响应较快，多个 Issue 在短时间内就有 PR 跟进。
    *   **文档完善：** 新增的备份导入文档受到用户认可（[#6186](https://github.com/AstrBotDevs/AstrBot/pull/6186)）。

---

## 8. 待处理积压

*   **#10198** [OPEN] [bug] 插件删除可以重传吗：插件更新机制存在缺陷，影响用户正常使用，需优先解决。
*   **#10179** [OPEN] [bug] QQ 引用图片消息无法解析：核心功能 Bug，虽已有 PR #10194 尝试修复，但需验证其有效性并确保合并。
*   **#10195** [OPEN] [enhancement] 历史消息回传上下文过滤：高价值功能请求，影响大规模部署的成本效率，建议纳入近期规划。

**总结：** AstrBot 项目在当前周期内表现出色，特别是在安全性和稳定性方面进行了大量实质性工作。社区参与度高，反馈渠道畅通。建议维护者优先处理 #10198 和 #10179 这两个影响核心功能的 Bug，并尽快评估 #10195 的功能实现可行性。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：** 2026-09-23  
**分析对象：** [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

---

## 1. 今日速览

DeepSeek Harness 今日保持高度活跃，过去 24 小时内 Discussions 新增 **219 条**更新，社区反馈渠道畅通。项目团队连续发布两个 Alpha 版本（v0.1.7-alpha.1 与 v0.1.7-alpha.2），密集推进了 UI 体验优化、文件预览能力增强及 Agent Team 交互逻辑的重构。整体来看，项目正处于从早期测试向产品化体验过渡的关键阶段，重点解决了长会话稳定性、多模态预览及后台任务管理等产品级痛点。

## 2. 版本发布

今日发布两个 Alpha 版本，累积了丰富的功能更新与关键修复。

### v0.1.7-alpha.1 (2026-09-22 前后)
**核心亮点：**
*   **会话管理重构：** 侧边栏新增置顶、归档、筛选及撤销归档功能；运行中会话归档时需确认受影响的回合与子代理，并新增「停止并归档」流程。
*   **工作区初始化优化：** 全新安装首次启动自动创建默认工作区和空白会话，降低新用户门槛。
*   **开发者工具内建：** 新增「工作过程展示」「性能与用量」及「开发者工具」设置，支持折叠/展开 Agent 思考链与工具调用记录。
*   **后台任务能力：** 支持长时间运行命令转入后台，工作流支持后台执行，且可在任务列表中实时查看输出。
*   **文件预览增强：** 统一 PDF、Office、图片的缩放控件；支持系统默认应用打开文件；文件改动审阅默认为左右分栏并支持同步滚动。

### v0.1.7-alpha.2 (2026-09-22 前后)
**核心亮点：**
*   **稳定性提升：** 稳定会话滚动跟随，改善历史分页与轮次跳转的视觉跳动问题。
*   **代码块体验：** 统一各代码块样式，支持复制/换行，优化 Diff 内容和行号展示。
*   **Agent Team 指引：** 优化成员初始任务指引，明确按成员名称发送消息，避免沟通混乱。
*   **关键 Bug 修复：**
    *   修复 Excel 文件含特殊内容时无法预览或内容丢失的问题。
    *   修复持久 PowerShell 命令完成后会话仍卡住等待输入的问题（默认不再限制连续唤醒次数）。
    *   修复 Web 服务重启后连接状态显示异常导致无法接收回复的问题。
    *   修复消息重新编辑排队时换行符丢失导致多行合并为单行的问题。

**破坏性变更/迁移注意：**
*   **Token 预算配置调整：** 自定义 `spill-policy` 配置中的 `maxInlineBytes` 已改为 `maxInlineTokens`，需按 token 数重新设置预算。
*   **依赖版本锁定：** Cordis 等 vendor 包与 Node Addon System 的自动依赖更新被限制为同一次版本内的补丁版本，避免安装时引入新的次版本（minor version）。

## 3. 项目进展

鉴于该项目未启用 Issues/PRs，以下进展基于上述 Releases Changelog 归纳：

*   **UI/UX 一致性推进：** 通过 v0.1.7-alpha.1 和 alpha.2，团队大幅统一了界面视觉样式（图标、状态标记、滚动条），并优化了长对话的初始化加载性能，表明项目正着力于提升用户感知的流畅度。
*   **Agent 协作能力深化：** Agent Team 模块持续迭代，从基础的成员状态显示（alpha.1）到明确的消息发送指引（alpha.2），显示出团队正在完善多 Agent 协作的实际可用性。
*   **文件处理能力增强：** 新增对 Excel/CSV/TSV 的只读预览及单元格操作支持，以及 PDF/Office 图片的统一缩放体验，显著扩展了 Harness 作为通用 AI 助手的工作边界。
*   **工程化稳定性：** 修复了 Web 部署在反向代理子路径下的访问问题，以及 Firefox 浏览器下的 JSON 验证历史加载失败问题，提升了多环境下的部署兼容性。

## 4. 社区热点

以下 Discussions 评论区活跃，反映了用户最关心的议题：

1.  **[Ideas] 求一个memory能力** (#14) | *38 评论*
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/14)
    *   **诉求分析：** 用户希望迁移 Codex/Claude Code 的 Memory 功能，以增强 Agent 的长期上下文记忆能力，这是高阶自动化场景的核心需求。
2.  **[General] 本轮运行失败 Cannot read properties of undefined (reading 'prepare')** (#7035 & #7224) | *共 42 评论*
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/7035), [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/7224)
    *   **诉求分析：** 多个用户反馈相同的启动/运行错误，主要集中在 Windows 环境及 pnpm 编译场景，属于高优先级的稳定性阻碍问题。
3.  **[Ideas] Please send x-opencode-session header** (#5495) | *35 评论*
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)
    *   **诉求分析：** 第三方 API 提供商（OpenCode Go）要求新增请求头以支持路由和优化，涉及 API 兼容性与第三方生态对接。
4.  **[General] 插件实战指南共建与测试记录** (#1477) | *23 评论*
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/1477)
    *   **诉求分析：** 社区知识库建设进展顺利，全书已正式发布，反映了用户群体对深度学习和插件开发的高度热情。
5.  **[General] 包族 npm dist-tag latest 不一致** (#2763) | *17 评论*
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/2763)
    *   **诉求分析：** 开发者反馈 `latest` 标签滞后导致全新项目安装时出现 ERESOLVE 依赖冲突，建议维护者统一发布标签。

## 5. Bug 与稳定性

**高风险/阻塞性问题：**

*   **Windows 环境启动崩溃：** `Cannot read properties of undefined (reading 'prepare')` 错误在多个 Discussion (#7035, #7224) 中被重复报告，影响本地开发和部分 Web 部署场景。
*   **Firefox 历史加载死循环：** #5677 报告在 Firefox 引擎浏览器中，包含 assistant raw chunk 记录的会话历史永远无法加载完成，提示 "Loading history…"。
*   **输入法拼音乱码：** #6138 报告在中文输入法选字过程中，输入框自动填充错误汉字，影响中文用户输入体验。
*   **Sandbox 权限死锁：** #5847 报告当会话模式为 `danger-full-access` 且审批策略为 `never` 时，请求当前 sandbox 模式的工具调用会陷入死锁而非直接执行。

**中等风险问题：**

*   **Excel 特殊内容预览失败：** v0.1.7-alpha.2 已修复，但在修复前影响文件分析场景。
*   **Web 服务重启后连接假死：** v0.1.7-alpha.2 已修复，此前重启后显示已连接但无法接收回复。
*   **npm 包版本标签混乱：** #2763 指出 `latest` 标签停留在旧版 rc.1，导致新手安装易遇依赖解析错误。

## 6. 功能请求与路线图信号

*   **Memory 持久化：** #14 的高热度讨论表明，社区对类似 Claude Code 的长期记忆功能有强烈需求，预计将在后续版本中作为独立模块或配置项被考虑。
*   **官方桌面客户端：** #6576 和 #358 持续请求 Electron 桌面版，虽然已有社区成员提交 PR，但官方是否内置仍需观察。
*   **API 头信息扩展：** #5495 反映了第三方服务对接的标准化需求，未来可能会开放更灵活的头信息配置能力。
*   **Compaction 阈值可调：** #6671 指出当前默认阈值在特定模型参数下无法触发压缩导致会话崩溃，用户期待更细粒度的压缩策略配置。

## 7. 用户反馈摘要

*   **正面反馈：** 用户对 alpha.1 中新增的「归档管理」、「后台任务实时输出」及「文件预览分栏」表示满意，认为显著提升了长会话管理效率。插件指南书的发布也获得了社区积极评价。
*   **负面反馈：**
    *   **UI 细节：** #7443 吐槽侧边栏动画不同步、图标风格与官网不一致（锯齿问题）、深潜模式蓝色不够“有灵魂”。
    *   **稳定性：** 反复出现的 `prepare` 报错和 Firefox 兼容性问题严重影响了部分技术用户的体验。
    *   **交互细节：** 输入法拼音乱码和文件预览响应局部变化不及时被提及为待改进点。

## 8. 待处理积压

*   **#2763 npm dist-tag 不一致：** 该问题直接阻碍新用户的快速上手，建议维护者优先同步 `latest` 标签与当前稳定 Alpha 版本。
*   **#5677 Firefox 历史加载失败：** 浏览器兼容性问题是 Web 应用的大忌，需定位 lossless-JSON validation 在 Firefox 下的具体差异并修复。
*   **#7035/#7224 Prepare 错误：** 建议维护者针对 Windows/pnpm 环境提供明确的复现步骤或临时 workaround。
*   **#358 Electron 桌面客户端：** 尽管有社区贡献，但主仓库未启用 PR，该功能尚未纳入主线，需关注官方对此类外部贡献的整合态度。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*