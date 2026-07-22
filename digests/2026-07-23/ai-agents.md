# OpenClaw 生态日报 2026-07-23

> Issues: 405 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-07-22 22:52 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

好的，这是为您生成的 OpenClaw 项目动态日报。

---

## OpenClaw 项目动态日报 (2026-07-23)

### 1. 今日速览

过去 24 小时内，OpenClaw 项目呈现出极高的活跃度：**405 条 Issues** 与 **500 条 PR** 发生更新。项目核心维护者 @steipete 主导了一轮大规模的内部重构冲刺（单日贡献 15+ PR），重点在于解耦代码、统一测试夹具和复用渠道逻辑（如会议机器人、频道诊断逻辑）。然而，社区反馈中 **2026.7.x 系列版本引发的回归问题** 成为焦点，特别是 Gateway 启动失败和工具链调用兼容性问题，使得项目在“偿还技术债务”与“紧急修复生产稳定性”之间激烈拉扯。整体来看，项目维护者投入力度极大，但近期发布的稳定性是当前最重要的健康度挑战。

### 2. 版本发布

（无新版本发布，本节省略。）

### 3. 项目进展

今日项目推进以**代码架构清理**与**核心稳定性修复**为主，同时有两项重要的新功能进入审查阶段。

- **大规模重构与代码复用**：@steipete 提交了多个旨在消除重复逻辑的重大重构 PR。这包括将分散在9个频道插件中的医生诊断迁移逻辑进行集中化 (`#112782`)、将会议机器人（Google Meet/Teams/Zoom）的胶水代码抽离 (`#112785`)、以及整合会话重启恢复和 CLI Runner 的测试夹具 (`#112789`, `#112779`)。这表明项目团队正致力于降低长期维护成本，防止因代码蔓延导致的潜在 Bug。
- **关键性能与稳定性修复**：
    - **`#112273`** (`fix(sessions): gateway becomes unusable when there are many sessions`) 修复了 Gateway 在拥有约 4900 个会话时出现长达 35-59 秒的事件循环阻塞的问题，这对高并发运维场景至关重要。
    - **`#112781`** (`fix: forced cloud worker teardown cannot be blocked by recovery`) 解决了云端工作区无法强制销毁的卡死问题，提升了 DevOps 操作的可靠性。
- **新功能预览**：
    - **`#112787`** (`feat(sessions): visibility states, membership, and server-enforced participation`) 引入了会话可见性状态和成员管理，这是支持**多操作员网关**的关键一步，指向了企业级协同路线图。
    - **`#112788`** (`feat(android): add OpenClaw settings chat`) & **`#112721`** (`feat(android): add Wear instant talk tile`) 正在补全 Android 及 Wear OS 平台的原生体验。

### 4. 社区热点

- **🥇 最热 Issue：`#75` [Linux/Windows Clawdbot Apps]**
    - **链接**: https://github.com/openclaw/openclaw/issues/75
    - **热度**: **115条评论**，**80个👍**。
    - **分析**: 这是社区最长期且最强烈的呼声——要求桌面端（Linux/Windows）功能与 macOS 对齐。该 Issue 自今年1月开启至今，虽然暂无明确的开发时间线，但其热度反映了用户对“跨平台统一体验”的深度渴望，是 OpenClaw 从开发者工具走向大众化产品的必经之路。

- **🥈 最受关注回归：`#108435` [Gateway fails to start w/ error]**
    - **链接**: https://github.com/openclaw/openclaw/issues/108435
    - **热度**: **9条评论**，`P0` 严重级别，影响：`ux-release-blocker`。
    - **分析**: 升级至 2026.7.1 后，Gateway 在 systemd、Ollama、手动启动等模式下均无法启动。这是典型的**发版阻塞级回归**，直接导致用户无法使用。这暴露了当前 CI/CD 流程在应对复杂环境配置时的覆盖不足。

- **🥉 安全与合规诉求：`#13583` 与 `#10659`**
    - **链接**: [#13583 (Hard Gates)](https://github.com/openclaw/openclaw/issues/13583) | [#10659 (Masked Secrets)](https://github.com/openclaw/openclaw/issues/10659)
    - **热度**: 分别收到 16/15 条评论，2/4 个👍。
    - **分析**: 社区对于**Agent 安全性**的诉求正在从“建议”转向“强制”。用户在量化金融、安全运维等场景中明确表示，“软提示”无法满足合规要求，必须要有**机械锁死**级别的执行前钩子（Hard Gates）和**不可见**的密钥管理（Masked Secrets）。这表明用户画像正从个人探索者向企业用户过渡。

### 5. Bug 与稳定性

今日报告的 Bug 数量庞大，尤其集中在**2026.7.x 版本回归**和**三方平台集成**上。

- **严重级别 (P0)**
    - **`#108435`** (Regresion): Gateway 在 2026.7.1 版本中完全无法启动。 (无关联修复 PR) [🔗](https://github.com/openclaw/openclaw/issues/108435)
    - **`#98674`** (Regresion): macOS 安装图标无法点击。**(已关闭/修复)** [🔗](https://github.com/openclaw/openclaw/issues/98674)

- **高优先级 (P1)**
    - **`#85333`** (性能回归): `doctor --fix` 命令相比上个版本慢 4-5 倍 (55s -> 229s+)，已被定位为会话快照路径遍历瓶颈。 [🔗](https://github.com/openclaw/openclaw/issues/85333)
    - **`#91009`** (CPU/崩溃): Codex 工具钩子调度产生大量 CPU 密集进程，阻塞 Gateway RPC。 [🔗](https://github.com/openclaw/openclaw/issues/91009)
    - **`#92043`** (逻辑缺陷): 180秒的压缩超时机制是单次墙钟，导致合法的大型会话压缩永远失败。 [🔗](https://github.com/openclaw/openclaw/issues/92043)
    - **`#108580`** (回归): `cron` 工具生成的 JSON Schema 与 `llama.cpp` 的语法约束调用不兼容，导致模型完全不可用。 [🔗](https://github.com/openclaw/openclaw/issues/108580)
    - **`#90840`** (回归): 子代理运行结果被直接作为原始输出投递给用户，绕过了父代理的摘要能力。 [🔗](https://github.com/openclaw/openclaw/issues/90840)
    - **`#86031`** (稳定性): Windows 版 Gateway 监听端口成功但健康检查超时，Telegram 长轮询挂起。 [🔗](https://github.com/openclaw/openclaw/issues/86031)
    - **`#99054`** (状态异常): Teams App 被移除后重新添加，其私信会话历史仍然保留。 (有关联 PR `#104690`) [🔗](https://github.com/openclaw/openclaw/issues/99054)

- **渠道集成 Bug (H1-H2)**
    - `#87212` (Telegram): 系统信封输出被直接发送到用户。 [🔗](https://github.com/openclaw/openclaw/issues/87212)
    - `#84092` (WhatsApp): 复杂回复（>500字符）被静默丢弃。 [🔗](https://github.com/openclaw/openclaw/issues/84092)
    - `#88955` (QQBot): WebSocket 重连后，消息发送通道未重建。 [🔗](https://github.com/openclaw/openclaw/issues/88955)
    - `#91941` (飞书): 流式卡片更新从增量改为全量后，长回复出现严重延迟。 [🔗](https://github.com/openclaw/openclaw/issues/91941)

### 6. 功能请求与路线图信号

- **高热度/高呼声功能需求：**
    - **`#75`** (Linux/Windows 客户端): 虽无 PR，但作为呼声最高的需求，一旦进入路线图将是里程碑事件。 [🔗](https://github.com/openclaw/openclaw/issues/75)
    - **`#13583`** (硬性执行钩子): 企业级风控的核心需求，与 `#112787`（会话可见性/权限）构成组合拳。 [🔗](https://github.com/openclaw/openclaw/issues/13583)
    - **`#10659`** (遮罩密钥): 防止 API Key 泄漏和提示注入，是 Agent 安全的最基础诉求之一。 [🔗](https://github.com/openclaw/openclaw/issues/10659)
    - **`#9912`** (`maxTurns`/`maxToolCalls`): 通过重试次数限制来防止 Agent 无限循环，是一个低成本高收益的控制手段。 [🔗](https://github.com/openclaw/openclaw/issues/9912)
    - **`#38568`** (上下文窗口注入): 将上下文占用率注入 System Prompt，帮助模型自省和决策。 [🔗](https://github.com/openclaw/openclaw/issues/38568)

- **路线图信号：** `#112787` (会话可见性/成员管理) 的合并标志着 OpenClaw 正在向**多租户、多操作员**的企业级网关演进。结合 `#102982` (批量应用 Claw 更新) 和 `#111391` (CLAW.md 清单支持)，项目正在构建一个可编程、可审计的工作区管理体系。

### 7. 用户反馈摘要

- **核心痛点：更新带来的不确定性。** 用户在升级 2026.6.x -> 2026.7.x 时遭遇了网关宕机、性能下降、工具不兼容等问题。反馈的原文如 “gateway doesn't start with...”、“regression (worked before, now fails)” 高频出现，反映了用户对**版本间兼容性**的高度敏感。
- **深度技术参与。** 社区用户展现了极高的技术素养。例如，在 `#85333` 中，用户直接指出了 `session snapshot path traversal` 的瓶颈；在 `#108580` 中，用户精准定位了 `cron` 工具 Schema 与 `llama.cpp` GBNF 格式的冲突。这种高质量的 Bug 报告极大地帮助了维护者定位问题。
- **对生产环境就绪性的关注。** 用户多次在安全 (`#13583`, `#10659`)、权限 (`#77807`)、消息可靠性 (`#94536`) 方面提出严苛要求。这表明 OpenClaw 已不再只是个人玩具，而是在被用于关键的商业和运营流程。

### 8. 待处理积压

以下为长时间未响应、但影响较大的 Issue 和 PR，亟需维护者关注：

- **平台支持缺口：**
    - **`#75`** (Linux/Windows Apps): 自1月起悬而未决的“白色巨塔”，无任何修复 PR 关联。 [🔗](https://github.com/openclaw/openclaw/issues/75)

- **维护者审查积压 (P1/P2，状态为 `needs-maintainer-review`)：**
    - **`#87318`** (Amazon Bedrock Haiku 4.5): 5月27日提交，推理配置被忽略。 [🔗](https://github.com/openclaw/openclaw/issues/87318)
    - **`#39807`** (402 计费错误导致无限重试): 3月8日提交，严重烧钱的 Bug。有关联 PR。 [🔗](https://github.com/openclaw/openclaw/issues/39807)
    - **`#41199`** (Agent 间通信工具参数冲突): 3月9日提交，破坏了核心的多智能体协作能力。有关联 PR。 [🔗](https://github.com/openclaw/openclaw/issues/41199)

- **待审查的 PR：**
    - **`#83988`** (Telegram TTS 最终模式文本抖动修复) [🔗](https://github.com/openclaw/openclaw/pull/83988) & **`#104690`** (Teams 会话重置修复) [🔗](https://github.com/openclaw/openclaw/pull/104690): 这两条 PR 已停留数周，状态为 “ready for maintainer look”，分别解决的是影响用户体验和隐私的重要问题。

---

## 横向生态对比

# 个人 AI 智能体开源生态横向对比分析报告
**报告日期：2026-07-23**  
**数据来源：OpenClaw、ZeroClaw、PicoClaw、QwenPaw、hermes-agent、AstrBot 项目社区动态**

---

## 1. 生态全景

当前个人 AI 助手与自主智能体开源生态正处于 **高密度迭代期**。社区贡献极为活跃，核心维护者投入强度极大（如 OpenClaw 单日 500+ PR、hermes-agent 367 条 Issue 动态），但频繁的版本回归（Gateway 启动失败、工具链不兼容、会话状态损坏）表明 **技术尚处于早期成熟阶段，稳定性仍是最大短板**。与此同时，用户群体正从个人探索者向企业用户快速过渡，对 **持久记忆、安全合规、多租户、跨平台一致性** 的需求已从“建议”转变为“强制”。语音交互、多模态、MCP（模型上下文协议）等新方向正快速落地，生态架构从单体走向可插拔、可观测的企业级平台趋势明显。

---

## 2. 各项目活跃度对比

| 项目 | 24h Issue 动态数 | 24h PR 动态数 | 新版本发布 | 健康度评估 |
|------|------------------|---------------|------------|------------|
| **OpenClaw** | 405 | 500 | 无 | 🔶 **极高活跃，稳定性承压**（严重回归#108435；大规模重构与功能并行，测试覆盖缺口明显） |
| **hermes-agent** | 367（+90关闭） | 500（+145合并） | 无 | 🔶 **迭代极快，响应积极**（P1 Worker死锁、会话损毁仍存，但大量Bug获定位修复，语音交互功能进入 Pipeline） |
| **ZeroClaw** | 50（40新开+10关闭） | 50（36待合并） | 无 | ✅ **活跃稳健**（内存/ZeroCode稳定性改善；Windows测试失败#7462长期未解，多数据库后端待合并） |
| **QwenPaw** | 极高活跃（未提供具体数字） | 极高活跃（列举合并7+ PR） | **v2.0.0.post4**（推理优化） | 🔶 **活跃但存在性能回归**（v2.0固定开销2s，MiniMax视觉Bug #6324；工具调用兼容性修复快速） |
| **AstrBot** | 10（7新开+3关闭） | 14（10合并/4待） | 无 | ✅ **中等活跃，修复效率高**（Faiss死锁、限流错乱、上下文重构快速合并；但GSV TTS #9334无修复） |
| **PicoClaw** | 4 | 5（1合并） | 无 | 🟡 **中等偏活跃，积压风险**（Matrix永久静默死Bug #3203搁置21天；Hook回归#3258无修复；大型PR停滞） |

> 注：QwenPaw 未在日报中给出精确 Issue/PR 总数，但描述为“极高活跃度”，合并关闭了多项关键修复，整体活跃度与 OpenClaw、hermes-agent 处于同一梯队。

---

## 3. OpenClaw 在生态中的定位

OpenClaw 以 **最大单日数据规模（405 Isssues / 500 PRs）** 领跑生态，是参照级项目。其核心优势体现在：

- **架构前瞻性**：正在推进会话可见性/成员管理（#112787），指向多操作员企业网关；大规模重构（医生诊断迁移、渠道逻辑复用）表明团队有意降低长期维护债务。
- **渠道覆盖广度**：Google Meet/Teams/Zoom 会议机器人、Telegram、WhatsApp、QQBot、飞书等全面覆盖。
- **社区规模与呼声**：Linux/Windows 桌面端 Issue（#75）115条评论、80个👍，为全生态最高热度需求之一；Agent安全（Hard Gates、Masked Secrets）亦是生态中呼声最强烈的安全功能。

但与其他项目相比，OpenClaw 的 **稳定性风险尤为突出**：#108435 Gateway 无法启动 (P0)、#108580 cron工具Schema与llama.cpp不兼容、#90840子代理输出绕过父代理，这些都是直接导致用户无法正常使用的回归问题。反观 hermes-agent 同样高频迭代但多数 Bug 当天即有修复 PR，AstrBot 的合并修复速度也更快。OpenClaw 当前的“技术债务偿还”与“生产稳定性”之间存在明显拉扯。

**定位小结**：OpenClaw 是生态中规模最大、架构最前沿的全栈智能体平台，但现阶段稳定性波动较大，用户信任度面临挑战。

---

## 4. 共同关注的技术方向

以下为多项目共同涌现的高频诉求，反映行业共识与痛点：

| 技术方向 | 涉及项目 | 具体表现 |
|----------|----------|----------|
| **跨会话持久记忆** | hermes-agent（#8457、#47349、#27013）、QwenPaw（#6307 上下文开销）、OpenClaw（#38568 上下文窗口注入） | 用户要求 Agent 跨重启、跨平台记住上下文，并对记忆后端可配置 |
| **企业级安全与合规** | OpenClaw（#13583 Hard Gates、#10659 Masked Secrets）、ZeroClaw（#7141 OIDC、#6613 弱配对码）、QwenPaw（#6354 授权UI误导） | 硬性执行钩子、密钥遮罩、准入认证、审计日志，用户画像从个人转向企业 |
| **跨平台客户端体验** | OpenClaw（#75 Linux/Windows 桌面端）、hermes-agent（桌面端回归#67600、#66875）、PicoClaw（Matrix永死#3203）、AstrBot（Desktop browser二进制#9352） | 桌面端、移动端（Wear OS）、Web 一致体验，以及渠道稳定性 |
| **工具调用与模型兼容性** | OpenClaw（#108580 cron schema冲突）、QwenPaw（#6363 tool_call 被Markdown污染、#5135 MiniMax 视觉）、AstrBot（#9354子代理工具不完整）、hermes-agent（#13834 Codex不兼容） | 多提供商、多模型下的工具调用一致性仍是最大工程障碍 |
| **语音交互与实时打断** | hermes-agent（#69511/#69602 流式TTS + Barge-in）、AstrBot（#9334 GSV TTS端点不兼容）、OpenClaw（Android Wear tile） | 从文本对话走向多模态实时交互是明显的下一站 |
| **多租户/会话治理** | OpenClaw（#112787 会话可见性/成员管理）、ZeroClaw（多数据库持久化#9250-9254）、QwenPaw（#6318 对话级别模型指定） | 从单用户到可审计的多操作员平台演进 |
| **配置模型与上下文管理正交化** | OpenClaw（重构测试夹具）、AstrBot（#9340 上下文配置正交化）、hermes-agent（#18733 模型级压缩阈值） | 关注配置解耦与组合性，提升可维护性 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | ZeroClaw | PicoClaw | QwenPaw | hermes-agent | AstrBot |
|------|----------|----------|----------|---------|--------------|---------|
| **功能侧重** | 全栈企业级网关 + 多操作员协作 | 技能生态 + 多渠道 + ZeroCode低代码 | 轻量嵌入 + 协议层（Matrix/IRC） + Hook扩展 | Agent推理优化 + 多模态 + 上下文滚动管理 | LLM集成广度 + 语音交互 + 桌面原生 | 适配器兼容 + 插件/MCP + 轻量部署 |
| **目标用户** | 企业运维/有复杂工作流的开发者 | 自托管社群/跨渠道部署团队 | 嵌入式/渠道极致定制的技术用户 | 高频对话/性能敏感的研究者与开发者 | 探索前沿LLM能力/语音交互的个人极客 | 中文社群/多平台消息机器人搭建者 |
| **技术架构特征** | 单体+渠道插件化 + 大规模重构中 | 技能市场 + DB持久化链（MySQL/Oracle等）+ OpenTelemetry | 协议层复用（fw-protocol） + 状态分离 | v2架构转向Agent推理简化（但引入性能损失） | 强调Provider多样性 + 桌面TUI + 插件发现机制 | 轻量核心 + 强适配器 + MCP客户端 + WebUI安全 |
| **核心挑战** | 版本回归频繁，测试覆盖需加强 | Windows支持缺口，大型PR堆积 | Matrix渠道可恢复性弱，Hook回归 | v2.0性能回归，MiniMax视觉兼容 | Worker死锁，会话损坏，跨平台缺陷 | TTS集成不稳定，子代理工具限制 |
| **社区贡献模式** | 核心维护者主导重構 + 社区反馈 | 社区贡献活跃（PR 36待合并） | 少数高级用户深度参与 | 新贡献者系列修复活跃 | 极高贡献量 + 快速响应 | PR提交与合并循环较快 |

---

## 6. 社区热度与成熟度分层

可将六个项目分为三个梯队：

### 第一梯队：超高活跃度，快速迭代与质量波动并存
- **OpenClaw**（405 Issues/500 PRs）、**hermes-agent**（367 Issues/500 PRs）、**QwenPaw**（极高活跃）
- 特征：单日代码活动量极大，功能推进与 Bug 修复并行跑，社区反馈量巨大。
- 成熟度评估：功能丰富性快速膨胀，但稳定性测试覆盖不足，部分回归问题对生产用户造成实际影响。属于 **“早期规模扩张期”**，技术债务开始显现。

### 第二梯队：活跃稳健，注重架构巩固
- **ZeroClaw**（50 Issues/50 PRs）
- 特征：更新频次合理，合并的 PR 集中在可观测性、内存超时、ZeroCode 等稳定性提升，同时多条多数据库持久化统一 PR 等待合并，展现平台化倾向。
- 成熟度评估：属于 **“平台化夯基期”**，在扩张新的数据库后端和企业级认证，同时解决跨平台问题。

### 第三梯队：中低活跃，局部高亮但积压隐患
- **AstrBot**（10 Issues/14 PRs）、**PicoClaw**（4 Issues/5 PRs）
- AstrBot 以合入修复速度快为亮点（Faiss死锁、限流log全天修复），但 Issue 积压不多，属于 **“稳健维护期”**。
- PicoClaw 活跃度明显偏低，Matrix 永死 Bug 搁置 21 天、Hook 回归未修复，几个大型功能 PR 停滞，属于 **“社区注意力稀释期”**，若维持者不介入可能用户流失。

---

## 7. 值得关注的趋势信号

1. **持久记忆不再是锦上添花，而是最低预期**  
   hermes-agent（#8457，#27013，#47349）、QwenPaw（#6307 性能开销）同时把记忆持久化作为最高呼声。行业正从“单轮对话”转向“长期协作”，Agent 需要跨会话、跨重启维持身份和知识，记忆后端可配置将成为标配。

2. **安全从“建议”走向“强制机制”**  
   OpenClaw 的 Hard Gates（机械锁死）与 Masked Secrets（不可见密钥）、ZeroClaw 的 OIDC（#7141）、AstrBot 的 MCP 安全加固 PR（#9351）表明：企业级用户不接受仅靠“提示词约束”的安全方案。执行前钩子、密钥隔离、审计日志将成为智能体平台的基线能力。

3. **语音与多模态交互成为差异化主战场**  
   hermes-agent 流式 TTS + Barge-in（#69511/#69602）和 AstrBot 的 GSV TTS 需求说明，语音交互已成下一个标配功能。流式合成、打断感知、多平台语音双向通道将是未来 3-6 个月的重点落地方向。

4. **工具调用兼容性仍是行业级难题**  
   cron schema 与 llama.cpp GBNF 冲突（OpenClaw #108580）、tool_call 被 Markdown 污染（QwenPaw #6363）、子代理工具集不完整（AstrBot #9354）反映出：**LLM 输出格式与工具接口之间的可靠映射** 是当前生态最薄弱的环节，也是提升 Agent 可靠性的最大杠杆点。

5. **跨平台统一体验成为用户体验的“底线”**  
   OpenClaw #75（115评论）、hermes-agent 桌面端 Bug、PicoClaw Matrix 通道、ZeroClaw #7462 74个Windows测试失败——用户正从单一平台转向多设备协作。**谁先补齐跨平台支持并确保渠道级可靠性，谁就能在下一阶段赢得更多生产级用户。**

6. **MCP（模型上下文协议）与插件生态标准化**  
   AstrBot 的 MCP 客户端安全加固（#9351）、ZeroClaw 的技能安装器迁移（#8638）表明：标准化插件/技能发现、安装及安全执行机制正从提议走向实施。未来项目将围绕 MCP 或类似协议形成工具生态护城河。

---

**总结**：2026年7月，开源个人AI智能体生态正处于高速发展但基础设施尚未完全稳固的阶段。高活跃度带来功能快速丰富，但也暴露出稳定性与兼容性的深层挑战。企业级特性、持久记忆、语音交互、工具兼容性将成为各家争夺的关键控制点。对于开发者而言，选择项目时应权衡 **功能前沿性** 与 **生产稳定性**，同时关注 **社区响应速度** 和 **核心维护者对技术债务的态度**。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 | 2026-07-23

## 今日速览

过去24小时内，ZeroClaw 保持高活跃度：**50条 Issue 更新**（40条新开/活跃，10条关闭），**50条 PR 更新**（36条待合并，14条合并/关闭）。核心开发集中在**会话持久化后端链**（MySQL/MariaDB/PostgreSQL/Oracle）、**OpenTelemetry span 嵌套**、**CI 缓存优化**以及多项高优 bug 修复。社区围绕 Windows 测试失败（#7462）与 OIDC 认证 RFC（#7141）展开热议。周期内**无新版本发布**。

## 版本发布

（无）

---

## 项目进展

过去24小时共合并/关闭 **14 个 PR**，以下为关键合入：

| PR | 模块 | 关键变更 | 状态 |
|----|------|----------|------|
| [#8752](https://github.com/zeroclaw-labs/zeroclaw/pull/8752) | 观测性 | 将 `memory.recall` / `memory.store` / `rag.retrieve` span 嵌套至 turn 级 `gen_ai.agent.invoke` 下，正式关闭 #6641 | ✅ 合并 |
| [#8638](https://github.com/zeroclaw-labs/zeroclaw/pull/8638) | 技能安装 | **破坏性变更**：移除内置 `clawhub:<slug>` 安装器，改为 `git-catalog --skill` 选择器 | ✅ 合并 |
| [#9105](https://github.com/zeroclaw-labs/zeroclaw/pull/9105) | 内存 | 修复 Lucid 冷启动，recall 超时 500ms→3s，store 超时 800ms→3s，并支持可配置 | ✅ 合并 |
| [#9169](https://github.com/zeroclaw-labs/zeroclaw/pull/9169) | ZeroCode | daemon 初始化 RPC 增加 10s 超时，防止终端无限阻塞 | ✅ 合并 |
| [#8779](https://github.com/zeroclaw-labs/zeroclaw/pull/8779) | ZeroCode | 无流式文本时 fallback 使用 daemon 最终文本 | ✅ 合并 |
| [#9174](https://github.com/zeroclaw-labs/zeroclaw/pull/9174) | CI | 增加 `dist-broad` feature 用于预构建测量 | ✅ 合并 |
| [#8991](https://github.com/zeroclaw-labs/zeroclaw/pull/8991) | 文档 | 补充 Bedrock 凭证、SigV4、IMDSv2 说明 | ✅ 合并 |
| [#8447](https://github.com/zeroclaw-labs/zeroclaw/pull/8447) | 固件 | ESP32 复用 `zeroclaw-fw-protocol` crate，统一协议解析 | ✅ 合并 |
| [#8684](https://github.com/zeroclaw-labs/zeroclaw/pull/8684) | 运行时 | 直接对话表面显示模型降级通知 | ✅ 合并 |

✅ 这批 PR 显著提升了**跨平台稳定性**（内存、ZeroCode）、**技能生态可审计性**、**观测一致性与人机交互反馈**。

---

## 社区热点

| 链接 | 标题 | 评论数 | 核心诉求 |
|------|------|--------|----------|
| [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | [Bug]: 74 test failures on Windows | **11** | CI 仅跑 Linux，Windows 下因路径、编码等导致大面积失败，用户要求补充 Windows CI 或官方变通方案 |
| [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) | RFC: OIDC authentication provider support | **7** | 企业级可插拔认证，v0.9.0 目标，讨论具体实现与配置结构 |
| [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) | RFC: Decouple memory lifecycle from storage | **6** | `MemoryStrategy` trait 解耦策略与后端，社区认可度高 |

**趋势分析**：社区当前最关注**跨平台覆盖缺失**（#7462）、**安全集成**（#7141）以及**核心架构解耦**（#6850），反映出用户群体的企业自托管倾向明显增强。

---

## Bug 与稳定性

| ID | 标题 | 严重度 | 状态 | 关联修复 |
|----|------|--------|------|----------|
| [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | 74 test failures on Windows | S2 degraded, risk high | Open | 暂无 fix PR |
| [#8837](https://github.com/zeroclaw-labs/zeroclaw/issues/8837) | History trimming occurs silently | S2 degraded, risk high | ✅ **已关闭** | 24h 内关闭，可能有修复或确认为预期行为 |
| [#6724](https://github.com/zeroclaw-labs/zeroclaw/issues/6724) | Empty credentials crashloop supervisor | risk high | Open | 未分配 |
| [#6548](https://github.com/zeroclaw-labs/zeroclaw/issues/6548) | Channel commands bypass localization | S3 minor | Open | 未分配 |

**已合入修复**：  
- [#9105](https://github.com/zeroclaw-labs/zeroclaw/pull/9105) 解决内存冷启动崩溃  
- [#9169](https://github.com/zeroclaw-labs/zeroclaw/pull/9169) 解决 ZeroCode 初始化阻塞  
- [#8779](https://github.com/zeroclaw-labs/zeroclaw/pull/8779) 解决无流式文本时输出空回复  

---

## 功能请求与路线图信号

| 目标版本 | 功能 | 状态 | 备注 |
|----------|------|------|------|
| v0.9.0 | OIDC 认证 (#7141) | RFC，p1 | 开始跟踪实现 PR |
| 未定 | 每模型能力 / context_window (#7100) | RFC，p1 | 链入 UI 显示 |
| 未定 | shell 子进程内存限制 (#6916) | 已确认，p1 | 生产环境 OOM 触发 |
| 未定 | 多协议会话持久化 (#9250-9254) | **待合并** (5个 XL 级 PR) | MySQL、MariaDB、PostgreSQL、Oracle、Db2 |
| 未定 | Agent 评估工具 (#7065) | in-progress，p2 | `zeroclaw eval` 回放/实时模式 |
| 未定 | Mastodon / Twilio SMS / Zulip 等新渠道 | Open，p2 | Rocket.Chat 已合并，说明渠道框架成熟 |

**📌 路线图信号增强**：多数据库后端的密集 PR 链表明项目正在向**高可用企业部署**倾斜，预计 v0.9.0 的存储弹性将有明显提升。

---

## 用户反馈摘要

1. **跨平台挫败感**（#7462）：“CI 跳过 Windows，导致 74 个测试失败无人问津”——希望官方重视 Windows 生态。
2. **配置文档缺口**（#8925, #6416）：Bedrock 配置反复踩坑，用户建议 quickstart 主动提醒不兼容组合。
3. **安全疑虑**（#6613）：6 位数字配对码“太弱”，要求支持字母数字混合、默认 32 位。
4. **本地化不完整**（#6548）：`zh-CN` 用户发现渠道命令仍是英文，影响体验。
5. **平台多样性需求**（#6423-6437）：自托管社群用户要求 Fediverse / 短信 / 即时通讯全面接入，Rocket.Chat 的合入增强了他们对 ZeroClaw “多通道” 定位的信心。

---

## 待处理积压

### 📌 长期未分配的高优 Issue

| ID | 标题 | 创建时间 | 优先级 | 风险 |
|----|------|----------|--------|------|
| [#6391](https://github.com/zeroclaw-labs/zeroclaw/issues/6391) | 节点真实心跳追踪 | 2026-05-05 | p2 | high |
| [#6390](https://github.com/zeroclaw-labs/zeroclaw/issues/6390) | `zeroclaw node add` CLI | 2026-05-05 | p2 | high |
| [#6916](https://github.com/zeroclaw-labs/zeroclaw/issues/6916) | shell 子进程内存限制 | 2026-05-25 | **p1** | high |
| [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | Windows 测试失败 | 2026-06-10 | **p1** | high |

### ⏳ 等待作者行动 (needs-author-action) 的 PR

| PR | 主题 | 备注 |
|----|------|------|
| [#8781](https://github.com/zeroclaw-labs/zeroclaw/pull/8781) | 移除过时 advisory 忽略 | 依赖图已更新，需确认 |
| [#9075](https://github.com/zeroclaw-labs/zeroclaw/pull/9075) | 模型缓存持久化 | 作者失联？ |
| [#8746](https://github.com/zeroclaw-labs/zeroclaw/pull/8746) | Goal 自恢复循环修复 (XL) | 与 #8996 连锁依赖，需核心维护者 review |
| [#8996](https://github.com/zeroclaw-labs/zeroclaw/pull/8996) | 重载时保留运行中 Goal (XL) | 同上 |

**建议**：  
- **#7462** 应优先分配一个 Windows CI 专家，补齐跨平台短板。  
- **#8746 / #8996** 尺寸大、依赖深，建议集中一次 review 会议推动。  
- 已“no-stale”但超过 2 个月未动的 #6391 / #6390 应考虑标记为 backlog 或由 maintainer 接手。

---

*日报生成时间：2026-07-23 09:00 UTC*  
*数据来源：ZeroClaw GitHub 仓库（截止 2026-07-22 23:59 UTC）*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

好的，以下是根据您提供的 GitHub 数据生成的 PicoClaw 项目动态日报。

---

# PicoClaw 项目日报 | 2026-07-23

## 1. 今日速览

截至 2026 年 7 月 23 日，PicoClaw 项目呈现**中等偏活跃**的态势。过去 24 小时内共有 **4 个 Issue** 和 **5 个 PR** 保持更新，其中 **1 个 PR** 被合并关闭。社区讨论集中于 **Matrix 同步机制的核心可靠性缺陷** 以及 **Hook 系统的序列化回归 Bug**。值得肯定的是，针对钉钉渠道的图片支持功能得到了快速开发，同时依赖安全更新也已被提交。不过，多个持续数周的大型功能 PR（如 Bedrock 缓存、DeltaChat 重构）仍处于停滞状态，维护者审阅压力依然存在。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日合并关闭的主要是维护性工作，同时有新的功能补丁提交：

- **文档清理**：**[#3285](https://github.com/sipeed/picoclaw/pull/3285)**（已合并）——移除了残留的 `picopaw` 相关文档。这是一个对仓库进行聚焦清理的合并操作。

- **安全与依赖修复**：**[#3286](https://github.com/sipeed/picoclaw/pull/3286)**（待合并）——更新了 Go 版本以及 `x/text` 依赖，以解决 `govulncheck` 扫描出的安全漏洞。此举维护了项目的供应链安全基线。

- **渠道能力增强（DingTalk）**：**[#3283](https://github.com/sipeed/picoclaw/pull/3283)**（待合并）——为钉钉渠道增加了图片消息的接收与处理能力，并实现了对 OpenAPI Token 的本地缓存。

整体上，项目在 **安全合规** 和 **特定渠道的功能补齐** 上正在稳定推进。

## 4. 社区热点

今日最受关注的社区讨论集中在两个关键问题上：

- **🔥 [#3203] Matrix 同步循环无重连逻辑（Silent Death）**
    - **[链接](https://github.com/sipeed/picoclaw/issues/3203)**
    - **热度**：评论 5 | 👍 2 | 开放时间：21天
    - **分析**：这是目前社区反映最强烈的基础设施级 Bug。Matrix 通道在经历网络抖动或服务器重启后，`/sync` 连接永久挂起且无任何重连机制。由于主进程未崩溃，systemd 的自动重启策略不生效，导致机器人静默死亡。用户 `@weissfl` 的诉求不仅是重连，还包括引入 Systemd Watchdog 或更完善的健康检查机制。该问题严重威胁到生产环境中 Matrix 通道的可用性，应列为当前最高优先级的待处理项。

- **⚠️ [#3258] before_tool Hook 因反序列化缺陷失效**
    - **[链接](https://github.com/sipeed/picoclaw/issues/3258)**
    - **热度**：评论 1 | 详细复现步骤
    - **分析**：高级用户 `@Shiniese` 定位到一个严重回归：`Process Hook` 在处理 `decision` 字段时出现反序列化错误，导致参数解析异常和决策被丢弃。该问题直接破坏了 PicoClaw 强大的可扩展性机制（Hook），影响了使用自定义 Python 脚本进行工具调用的用户工作流。

## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列如下：

1.  **严重 - 渠道层可靠性**：**[#3203](https://github.com/sipeed/picoclaw/issues/3203)** Matrix 同步永死 Bug。无自动恢复机制，进程假死。**（截至今日无关联修复 PR，积压 21 天）**
2.  **严重 - 核心扩展点**：**[#3258](https://github.com/sipeed/picoclaw/issues/3258)** `before_tool` 钩子损坏。因 `v0.3.1` 版本的序列化变更导致功能不进则退。**（截至今日无关联修复 PR）**
3.  **中等 - 依赖安全性**：**[#3286](https://github.com/sipeed/picoclaw/pull/3286)** `govulncheck` 报出的安全警告。修复 PR 已提交，为常规依赖升级。
4.  **低 - 功能瑕疵**：**[#3287](https://github.com/sipeed/picoclaw/issues/3287)** IRC 长消息被错误切割。该问题影响消息语义的完整性，但属于体验优化范畴。

## 6. 功能请求与路线图信号

- **Gateway 无状态模式**：**[#3257](https://github.com/sipeed/picoclaw/issues/3257)** 用户希望在 `picoclaw gateway` 模式下也能像 `--session` 命令行一样，通过参数或配置完全控制会话历史，实现无状态、脱钩的集成。这表明 Gateway 用户在向云原生/无状态架构靠拢。

- **IRC 消息完整性**：**[#3287](https://github.com/sipeed/picoclaw/issues/3287)** IRC 用户提出对 IRCv3 协议中因长度限制而被自动分割的消息进行智能合并。这是一个典型的协议适配需求，优先级主要取决于项目的 IRC 用户群规模。

- **路线图信号**：
    - **成本控制**：PR **[#3163](https://github.com/sipeed/picoclaw/pull/3163)**（Bedrock Converse Prompt Caching，停滞 30 天）是降低企业级 LLM 调用成本的关键特性，一旦合入将显著提升 PicoClaw 在企业级部署中的竞争力。
    - **架构收敛**：PR **[#3222](https://github.com/sipeed/picoclaw/pull/3222)**（DeltaChat 重构，停滞 20 天）移除了密码配置、统一了邀请链接命名，并强制 Secrets 走 JSON-RPC。这是项目推动配置中心化及安全标准化的体现。

## 7. 用户反馈摘要

- **运维痛点**（来自 #3203）：
    > *“Matrix 通道是组织的核心通信渠道，当前的 'Silent Death' 让我们完全无法信任机器人会在线。主进程活着但无法工作，这对于基于进程存活来做监控的运维策略是一个巨大的漏洞。我们需要 Watchdog 支持。”*
    - **分析**：反映 PicoClaw 在守护进程模式的健壮性设计上存在盲区，过度依赖进程存活来判断健康状态是不够的，必须引入业务层面的心跳/重连。

- **扩展性体验受挫**（来自 #3258）：
    > *“Hook 是我选择 PicoClaw 的主要原因，因为它允许我用 Python 动态修改 AI 的行为。现在 `before_tool` 完全不可用了，这迫使我们不得不暂停该功能的推进。”*
    - **分析**：Hook 是高阶用户的核心竞争力，该 Bug 的持续存在正在消耗用户的信任和对项目扩展性的信心。

- **集成场景的灵活性需求**（来自 #3257）：
    > *“在网关模式下，我无法像 CLI 模式那样简单的创建一个全新的会话。当前的 session 派生逻辑限制了我在微服务架构中的灵活调度。”*
    - **分析**：用户希望 Gateway 能提供更底层的 API，将会话管理权交给外部系统，而不是由内部逻辑自动派生。

## 8. 待处理积压

以下 PR/Issue 已长期未获合并或响应，建议维护者重点关注：

- **`[STALE] [LONG]`** **[#3163](https://github.com/sipeed/picoclaw/pull/3163) feat(bedrock): Converse prompt caching**：开放 30 天，核心维护者需确认 API 兼容性与性能测试结果。
- **`[STALE] [LONG]`** **[#3222](https://github.com/sipeed/picoclaw/pull/3222) refactor(deltachat): cleanup implementation**：开放 20 天，重构涉及破坏性变更（删除密码配置），需核心维护者 `@trufae` 进行最终 Code Review。
- **`[STALE] [CRITICAL]`** **[#3203](https://github.com/sipeed/picoclaw/issues/3203) [BUG] Matrix sync loop has no reconnection logic**：开放 21 天，无任何 Assignee 和 Milestone，这对渠道稳定性是极大的隐患，急需为社区提供修复时间表。
- **`[STALE] [NEW]`** **[#3257](https://github.com/sipeed/picoclaw/issues/3257)** 与 **[#3258](https://github.com/sipeed/picoclaw/issues/3258)**：开放约 1 周，建议维护者尽早进行 Triage，确认是否纳入近期里程碑，以避免社区反馈热情降温。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

好的，各位同仁早上好。以下是根据 QwenPaw 在 2026-07-22（UTC）至 2026-07-23 的活动数据生成的项目动态日报。

---

## QwenPaw 项目动态日报 — 2026-07-23

### 1. 今日速览

项目今日处于**极高活跃度**状态，社区贡献与核心开发双线并进。昨日发布了优化 Agent 推理的 **v2.0.0.post4** 补丁，旨在缓解用户反馈的性能问题(lululau)。Issue 侧，用户集中遇到了 **MiniMax-M3 视觉能力异常** 和 **v2.0 新架构引入的性能回归**；PR 侧则呈现出“小修小改”与“功能蓄力”并存的态势。大量由新贡献者提交的修复性 PR（如 `@patrick-andstar` 的系列修复）表明项目生态健康，外部贡献活跃。

### 2. 版本发布

- **v2.0.0.post4** 于昨日发布。
    - **更新内容**：优化了 Agent 的推理过程，减少了冗余的思考循环和重复的工具调用。这直接回应了近期社区关于“Agent 回答缓慢、重复思考”的反馈，也试图修复 #6307 中提及的固定开销问题的一部分。
    - **破坏性变更**：无。
    - **迁移注意**：该版本为小补丁，可直接通过 `pip install --upgrade qwenpaw` 升级。建议所有 v2.0.0 用户跟进此更新。

### 3. 项目进展

昨日合并/关闭了一系列重要 PR，项目在 **稳定性、安全性和基础设施** 方面取得了明显进展：

- **核心稳定与修复**：
    - **PR #6375**: 修复令牌用量持久化的重试机制，避免因临时写失败导致数据丢失。
    - **PR #6359**: 修复了被注入的 `system` 角色消息夹在对话中间，导致部分 API 报错的问题，统一将其改为 `user` 角色。
    - **PR #6358(关联)** 及其修复 PR 关闭，解决了 `context injection` 引起的 `ValueError` 问题。
- **安全与治理**：
    - **PR #6369**: 修复了 `GovernancePolicy.audit_level=none` 配置不生效，审计日志仍然被写入的 Bug。
    - **PR #6357**: 修改了 UI 中“一次授权”和“总是允许”按钮的视觉权重，将“仅本次”设为默认首选，降低用户误操作风险。
- **控制台与构建环境**：
    - **PR #6365**: 修复了 Console 测试脚本在 Windows 系统上无法运行的问题，提升了贡献者的开发体验。
    - **PR #6367**: 修复了 Console 覆盖率测试因超时而失败的问题，增强了 CI 稳定性。

### 4. 社区热点

- **Issue #6307: [Performance] v2.0 introduces ~2s fixed overhead per simple conversational reply vs v1.x**
    - **链接**: https://github.com/agentscope-ai/QwenPaw/issues/6307
    - **分析**: 该 Issue 获得了 4 条评论，反映了从 v1.x 升级到 v2.0.0.post3 的用户**最显著的感知损失**。用户 `@lululau` 精确测量出每次简单回复增加了约 2 秒的固定开销，并定位到是请求处理流程中的架构变化导致。这是一个关键的回归问题，严重影响了用户体验。
- **Issue #6318: [Feature]: 支持按 conversation 级别指定模型，而非仅绑定 agent**
    - **链接**: https://github.com/agentscope-ai/QwenPaw/issues/6318
    - **分析**: 此功能请求获得了 6 条评论，讨论热度高。用户希望在不同对话中灵活切换模型，而不是受限于 Agent 绑定的单一模型。这代表了高级用户对精细化控制工作流的需求，虽然 PR #6353 在 cron 任务中实现了类似功能，但更通用的方案仍在讨论中。
- **PR #6323: feat(scroll): add staged compaction and pointer-backed task continuity**
    - **链接**: https://github.com/agentscope-ai/QwenPaw/pull/6323
    - **分析**: 由 `@niceIrene` 提交的 PR，重构了 Scroll（滚动）上下文管理。大量新代码、高质量设计和评论，引发了社区的密切关注。虽然仍在审查中，但它可能是解决子Agent上下文压缩导致进程卡顿(#5218)等长上下文问题的关键改进。

### 5. Bug 与稳定性

昨日的 Bug 报告集中在 **v2.0 新架构、模型兼容性、和边界条件**上。

| 严重程度 | Issue | 摘要 | 当前状态 |
| :--- | :--- | :--- | :--- |
| **高** | #6324 | 大模型（MiniMax-M3）响应被截断 | **待修复**，无对应 PR |
| **高** | #6363 | `tool_call` 参数被 markdown 代码块污染，导致所有工具调用失败 | **已有 PR #6364 修复** |
| **高** | #6358 | 上下文注入的角色冲突导致 GLM/OpenAI API 报错 | **已有 PR #6359 关闭修复** |
| **中** | #6307 | v2.0 引入约 2 秒固定响应延迟 | **待修复**，v2.0.0.post4 部分缓解 |
| **中** | #6362 | MiniMax-M3 视觉能力异常(Déjà vu) | **待修复**，与 #5135 重复 |
| **中** | #6372 | 空闲队列清理可能意外移除刚重建的队列状态 | **已有 PR #6373 修复** |
| **中** | #6370 | 文件下载器超时后不会回退到下一方案 | **已有 PR #6371 修复** |
| **低** | #6354 | 审批对话框 UI 设计存在误导，有意外授权风险 | **已有 PR #6357 修复** |

**总结**: 尽管存在一些回归，但项目响应迅速，针对 `tool_call` 兼容性、上下文注入和文件下载等关键问题的修复 PR 已在同日提交。v2.0.0.post4 的发布也是对性能问题的积极回应。

### 6. 功能请求与路线图信号

昨日用户提出的新功能请求，结合已有 PR，呈现出以下信号：

- **明确的路线图信号**：
    - **`对话级别模型` 与 `Cron任务模型`**：`@earthjasonlin` 提出的 #6318 和 `@arcol` 提出的 #6316 都指向了对 `按需指定模型` 的强需求。虽然 #6316 已被 `@wananing` 的 PR #6353（为 cron 任务添加模型覆盖）实现，但 #6318 的通用解决方案（对话级别覆盖）将是下一阶段用户体验的重大提升。
    - **`Docker 热更新`**：`@ook826092-cloud` 的 #6344 被标记为 Feature，提出了在 Docker 容器内直接热更新的需求。这直击了频繁迭代用户的痛点，如果实现，将极大优化部署体验。
- **可能纳入下个版本的请求**：
    - **`插件市场排序`**: `@Osier-Yi` 的 **PR #6349** 已为插件市场增加了排序功能（按下载量、更新时间、收藏数）。该 PR 已经开放，很可能被合并到下一个版本。
    - **`文件拖拽上传`**：`@rerbin` 的 #6297 在短时间内关闭，但依然获得了 4 个赞。这可能是短期内 Console 前端易于实现的改进。

### 7. 用户反馈摘要

- **痛点与不满**:
    - **v2.0 性能退步**: #6307 的反馈非常尖锐：“升级到 v2.0 后，每个简单回复都慢了 2 秒”，用户坦言完全无法理解这个问题为何会出现，表达了对 v2.0 架构变更的强烈不满。
    - **模型兼容性困境**: #6363 和 #6362 展示了用户在使用 GLM、DeepSeek 和 MiniMax 等非 OpenAI 模型时频繁遇到的工具调用和视觉能力问题，表明这些模型与 QwenPaw 的集成尚需打磨。
    - **Docker 更新体验差**: #6344 的用户表示：“每次更新都要重装 Node、ffmpeg，严重影响自用体验”，点明了 Docker 标准更新流程的弊端。
- **功能诉求与建议**:
    - **灵活性与控制**: #6318、#6316、#6335 都指向用户希望获得更灵活的控制权，包括选择模型、多用户管理，表明 QwenPaw 正从单用户工具向更复杂的平台级应用演进。
    - **确认机制与安全**: #6354 的用户对 UI 细节的观察很仔细，指出“总是允许”按钮太突出可能导致误操作，并建议了更好的 UI 布局。这表明用户对安全和 UX 的期望在提高。

### 8. 待处理积压

以下 Issue 和 PR 长期未得到有效响应或解决，建议维护者关注：

- **Issue #5135: [Bug]: MiniMax-M3 大模型视觉能力异常** (2026-06-11 创建)
    - **链接**: https://github.com/agentscope-ai/QwenPaw/issues/5135
    - **状态**: **Open**。该 Bug 从 v1.1.11 版本持续到 v2.0.0.post4，长达 40 余天未修。虽有多位用户(@steelway666, @ky2312)重复报告，但仍无有效进展。这严重损害了使用该模型的用户体验，建议优先排查 MiniMax 供应商的协议兼容性。
- **Issue #6176: [Bug]: cron CLI update resets untouched runtime and metadata fields** (2026-07-16 创建)
    - **链接**: https://github.com/agentscope-ai/QwenPaw/issues/6176
    - **状态**: **CLOSED**。该 Issue 汇报了 CLI `cron update` 命令会重置未触及的字段。虽然昨天被标记为 Closed，但其关联的修复 PR 并未在列表中显示，需要 **重点关注** 此类“悄悄关闭但未提供明确修复方案”的问题，确保不是由于手动操作或沟通不畅导致的误关闭。
- **PR #6284: feat(apps): add qwenpaw-creator app** (2026-07-20 创建)
    - **链接**: https://github.com/agentscope-ai/QwenPaw/pull/6284
    - **状态**: **Open**。这是一个大型功能 PR，为 QwenPaw 引入了视频创作工作流。尽管评论很多，但它在过去 3 天里只有少量更新，且缺乏 Reviewer 的明确指示。建议 Reviewer 介入，给出修改意见或优先级判断，避免开发者进入漫长的等待期。

---
以上是今日的 QwenPaw 项目动态，我们明天见。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

好的，请查收以下基于您提供的 GitHub 数据（截至 2026-07-23）生成的 hermes-agent 项目动态日报。

---

# hermes-agent 项目动态日报 (2026-07-23)

## 今日速览

hermes-agent 项目今日保持着**极高强度**的迭代节奏。24 小时内产生了 367 条 Issue 动态与 500 条 PR 动态，反映出社区高度活跃与核心开发团队的密集作业。尽管今日无正式版本发布，但一个重要的积极信号是：90 个 Issue 与 145 个 PR 被关闭或合并，大量中高优先级 Bug 得到定位与修复（如 Z.AI 策略拦截、桌面端 TUI 路由错误等）。**项目健康度总体优秀，但 P1 级 Worker 死锁、多平台会话状态损坏等严重 Bug 的存在提醒我们，稳定性仍是当前快速演进中需要警惕的短板。**

## 版本发布

*无。过去 24 小时内无正式版本发布。*

## 项目进展

今日共合并/关闭了 **145 个 PR**，展示了项目问题修复与功能落地的强劲执行力。

- **已关闭与修复的关键 Bug**：
  - **`#47685`** (P2): Z.AI 提供商的 `glm-5.2` 模型将系统提示词中的精确短语 “Hermes Agent” 误判并返回 429 的问题已得到解决。([链接](https://github.com/NousResearch/hermes-agent/issues/47685))
  - **`#44456`** (P2): 桌面端的 `/compress` 指令失效的原因已查明 —— TUI 命令分发器未正确将内建指令路由至 slash 执行器，该回归问题已被关闭。([链接](https://github.com/NousResearch/hermes-agent/issues/44456))
  - **`#27683`** (P2): Web 搜索/提取/爬取工具在新安装环境静默失败的根源——插件系统在 Web 注册表查阅前未初始化，已通过添加 `_ensure_plugins_discovered()` 修复。([链接](https://github.com/NousResearch/hermes-agent/issues/27683))
  - **`#18733`** (P3): 支持为不同模型或提供商独立配置上下文压缩阈值（`compression.threshold`）的功能已合并。([链接](https://github.com/NousResearch/hermes-agent/issues/18733))

- **Pipeline 中的核心功能推进（待合并的重大 PR）**：
  - **流式语音交互**: `#69511` 使所有终端和 TTS 提供商支持流式逐句合成与插话（Barge-in），`#69602` 进一步将“用户打断”事件告知模型，形成完整的互动闭环。([PR 1](https://github.com/NousResearch/hermes-agent/pull/69511)) ([PR 2](https://github.com/NousResearch/hermes-agent/pull/69602))
  - **桌面端健壮性**: `#69666` 修复了大图像上传导致 WebSocket 连接溢出的问题，`#69661` 恢复了忙碌状态下按 Enter 键排队消息的行为，显著提升 UI 可靠性。([PR 1](https://github.com/NousResearch/hermes-agent/pull/69666)) ([PR 2](https://github.com/NousResearch/hermes-agent/pull/69661))
  - **Codex 集成优化**: `#69022` 通过账户级别目录鉴权来动态展示和限制 Codex Pro 模型。([链接](https://github.com/NousResearch/hermes-agent/pull/69022))

## 社区热点

今日讨论最为激烈与反应最多的议题，集中反映了用户对 **Agent 记忆持久化**和**核心集成稳定性**的迫切需求。

- **`#13834` - “开箱即崩”的 OpenAI Codex 集成 (18条评论)**：用户报告在同一个 macOS 机器和网络中，官方 `codex` CLI 可以正常工作，但 hermes-agent 的 `openai-codex` 配置却持续失败。这直接冲击用户对项目“作为 Codex 替代品”这一核心价值主张的信任。用户不仅需要功能整合，更苛求**零摩擦的兼容性**。([链接](https://github.com/NousResearch/hermes-agent/issues/13834))
- **`#8457` / `#47349` / `#27013` - “失忆的 Agent” (均 10+ 评论)**：这三大高频 Issue 形成了同一个呼声：**Agent 必须跨会话、跨重启、跨平台记忆上下文**。当前对话结束后一切归零、网关重启后 Agent 甚至产生身份幻觉（认为自己在做另一个项目）的体验，是阻碍用户将 Agent 用于严肃生产工作的最大心理障碍。社区诉求已从“是否需要”转向了“如何实现”（如 #47349 要求自定义记忆后端取代硬编码 memory.md）。([Issue 1](https://github.com/NousResearch/hermes-agent/issues/8457)) ([Issue 2](https://github.com/NousResearch/hermes-agent/issues/47349)) ([Issue 3](https://github.com/NousResearch/hermes-agent/issues/27013))
- **`#68915` - P1 级 Worker 死锁 (5条评论)**：当 LLM 指示 Agent 在 Shell 中通过 `&` 后台运行进程（如启动 Dev Server 进行验证）时，Worker 陷入不可恢复的 Python 级死锁。这触及了核心执行引擎的稳健性，尽管评论数不多，但其 **P1 严重级别**使其成为今日最需关注的社区痛点。([链接](https://github.com/NousResearch/hermes-agent/issues/68915))

## Bug 与稳定性

今日报告的 Bug 可圈可点，部分已附修复 PR。

- **P1 (严重)**:
  - **`#68915`**: Worker 在 Shell 后台启动进程（如 `node server.js &`）时永久死锁，会话无法恢复。**暂无关联 Fix PR。** ([链接](https://github.com/NousResearch/hermes-agent/issues/68915))

- **P2 (高)**:
  - **会话损毁与状态丢失**:
    - `#69078`: xAI `grok-4.5` 返回无效 PNG 图片，导致整个会话永久损坏（bricks session），即使重启网关也无法恢复。**暂无 Fix PR。** ([链接](https://github.com/NousResearch/hermes-agent/issues/69078))
    - `#67600`: 桌面端 `default` 配置文件下的会话侧边栏完全空白，实名配置文件正常。后端已验证数据正常，疑为前端渲染回归。([链接](https://github.com/NousResearch/hermes-agent/issues/67600))
    - `#66875`: 桌面端切换到非聊天 Tab 页后，无法通过点击选中最新会话。([链接](https://github.com/NousResearch/hermes-agent/issues/66875))
  - **平台集成异常**:
    - `#62936`: Telegram 上传 >15MB 文件始终超时，相关环境变量 `HERMES_TELEGRAM_HTTP_WRITE_TIMEOUT` 无效。([链接](https://github.com/NousResearch/hermes-agent/issues/62936))
    - `#69314`: Telegram 网关在通过 HTTP 代理运行时，陷入 `CLOSE_WAIT` 状态，数千个连接堆积，直到完全重启。([链接](https://github.com/NousResearch/hermes-agent/issues/69314))
    - `#63395`: Matrix 加密房间消息成功投递后，数据库连接池随即关闭，日志被刷屏。([链接](https://github.com/NousResearch/hermes-agent/issues/63395))
  - **Agent 逻辑错误**:
    - `#27178`: Kanban 工作流 Worker 在 Agent 以文本消息结束对话时，未调用 `kanban_complete` 即报告协议违规，无兜底重试。([链接](https://github.com/NousResearch/hermes-agent/issues/27178))
    - `#14091`: SSH 会话中无法传递 Skill 声明的环境变量。([链接](https://github.com/NousResearch/hermes-agent/issues/14091))

- **P3 (中)**:
  - `#63679`: 桌面端每次调用后，助手消息均渲染两次，属 UI 回归。([链接](https://github.com/NousResearch/hermes-agent/issues/63679))
  - `#28049`: Kimi CN 提供商使用 Brotli 压缩的 Streaming 接口可能导致空响应。([链接](https://github.com/NousResearch/hermes-agent/issues/28049))

## 功能请求与路线图信号

- **强烈路线图信号（高赞/高频）**:
  - **模型提供商扩展**: `#20859` (Mistral 支持) 以 **23 个 👍** 高居 Feature 请求榜首位，表明社区对标准化 Provider 之外的灵活选择有强烈渴望。([链接](https://github.com/NousResearch/hermes-agent/issues/20859))
  - **数据主权与回溯**: `#12238` (内置自动备份与版本控制) 获得 **19 个 👍**，用户对 `~/.hermes/` 下的技能、记忆、会话数据的安全意识显著提升。([链接](https://github.com/NousResearch/hermes-agent/issues/12238))
  - **跨平台与性能**: `#4335` (跨平台会话共享 CLI ↔ Telegram)、`#7489` (基于响应头的 RPM 预研节流) 持续获得讨论热度，指向全平台统一与高级限流策略的需求。([链接 1](https://github.com/NousResearch/hermes-agent/issues/4335)) ([链接 2](https://github.com/NousResearch/hermes-agent/issues/7489))

- **需要维护者决策 (needs-decision)**:
  - 以下高关注度 Feature 因携带 `needs-decision` 标签而处于停滞状态，建议维护团队尽快表态，避免挫伤开发者热情：
    - `#47349` (可配置记忆后端)
    - `#20859` (Mistral 提供商)
    - `#64900` (插件扩展 `send_message` 工具)

## 用户反馈摘要

- **痛点与不满**:
  - **Agent “健忘” 是最大痛点**: 用户普遍反映 Agent 无法记住跨会话的上下文，重启必失忆，甚至产生错误记忆（#27013）。这是社区最希望解决、但目前进展最慢的领域。
  - **集成体验仍需打磨**: 用户对“官方工具可用，Hermes 集成不可用”的情况感到困惑和沮丧（如 #13834 Codex 兼容性、#62936 Telegram 大文件超时）。
  - **回归问题侵蚀信任**: 桌面端的 `compress` 命令失效（已修复）和新版本带来的消息重复渲染（#63679）等问题，让部分用户感觉版本迭代存在“补丁摞补丁”的倾向。

- **满意与肯定**:
  - 项目**迭代速度令人惊叹**，社区对每日数百项动态已经习以为常，展现了极强的生命力。
  - **流式 TTS 与打断功能** (#69511, #69602) 获得了极高关注，被视为语音交互体验的里程碑，用户对此方向一致好评并充满期待。

## 待处理积压

以下为开放时间长、社区关注度高、但尚未得到有效推进或维护者响应的重点事项：

- **`#8457` (持久化会话记忆功能)**：自 **2026-04-12** 开放至今已逾三个月，评论数 14 条。这是解决 Agent 失忆问题的核心架构需求，目前仍无关联 PR 或明确排期。是该决定走向和实施路径的时候了。([链接](https://github.com/NousResearch/hermes-agent/issues/8457))
- **`#12238` (内置自动备份)**：自 **2026-04-18** 开放，19 个高赞。功能本身不涉及核心 AI 逻辑，但用户呼声极高，是提升整体信任度的优质切入点。([链接](https://github.com/NousResearch/hermes-agent/issues/12238))
- **`#20859` (Mistral 提供商)**：自 **2026-05-06** 开放，23 个高赞，仅需实现 Provider 层集成。长时间滞留给潜在贡献者发送了消极信号。([链接](https://github.com/NousResearch/hermes-agent/issues/20859))
- **`#4335` (跨平台会话共享)**：自 **2026-03-31** 开放，触及网关架构改造，是复杂的系统工程。建议至少将其放入 Roadmap 中长期规划中。([链接](https://github.com/NousResearch/hermes-agent/issues/4335))

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

以下是根据 AstrBot 仓库（github.com/AstrBotDevs/AstrBot）在过去 24 小时内的更新数据生成的 **2026-07-23 项目动态日报**。报告完全基于 Issues、PR 的标题、标签、摘要及更新情况，客观反映项目健康度与社区动态。

---

## 今日速览

过去 24 小时 AstrBot 共计更新 10 条 Issue（7 条新开/活跃、3 条已关闭）和 14 条 PR（4 条待合并、10 条已合并/关闭）。合并的 PR 主要聚焦于知识库稳定性、Gemini 与 OpenAI Embedding 提供者的健壮性修复、Faiss 回归问题回滚、限流时间错乱修复以及 WebUI 备份安全增强。社区讨论围绕 Discord 适配器完善、GSV TTS 兼容性、子代理工具集不完整以及 QQ 官方机器人按钮事件支持等展开，整体项目活跃度高，多个用户提交了 PR 直接贡献代码。

---

## 版本发布

无新版本发布（最新 Releases 为空）。

---

## 项目进展

今日共有 **10 项 PR 被合并或关闭**，涵盖核心稳定性、提供者适配器兼容性、WebUI 安全性和性能回滚修复，标志性进展如下：

| PR | 关键变更 | 所属领域 |
|----|---------|---------|
| [#8568](https://github.com/AstrBotDevs/AstrBot/pull/8568) | 知识库检索空查询崩溃修复，提高元数据容错 | `kb` |
| [#8544](https://github.com/AstrBotDevs/AstrBot/pull/8544) | Gemini Embedding 适配器鲁棒性：移除 assert，增加运行时检查 | `provider` |
| [#8787](https://github.com/AstrBotDevs/AstrBot/pull/8787) | Gemini 历史转换修复：assistant 消息同时包含 content 和 tool_calls 时不再丢失调用 | `provider` |
| [#8807](https://github.com/AstrBotDevs/AstrBot/pull/8807) | 通用修复 embedding_dimensions 参数校验（`0` 值导致 SiliconFlow 等平台 400） | `provider` |
| [#8547](https://github.com/AstrBotDevs/AstrBot/pull/8547) | OpenAI Embedding 增强：稳定性、空查询处理、SiliconFlow 域兼容 | `provider` |
| [#9130](https://github.com/AstrBotDevs/AstrBot/pull/9130) | WebUI 拒绝无效备份上传，安全加固 | `webui` |
| [#9350](https://github.com/AstrBotDevs/AstrBot/pull/9350) | 修复 PR #8323 引入的 `faiss` 顶级导入导致的进程挂起死锁回归（原 #8695 修复被意外回退） | `core` |
| [#9349](https://github.com/AstrBotDevs/AstrBot/pull/9349) | 修复并发会话限流中时间戳在锁外捕获导致的计算错误，避免超时窗口异常膨胀 | `core` |
| [#9340](https://github.com/AstrBotDevs/AstrBot/pull/9340) | **大规模重构**：上下文管理配置模型正交化（7 旧字段 → 12 正交字段），分离触发条件与处置行为，新增 `summary_provider` 字段 | `core` |
| [#8323](https://github.com/AstrBotDevs/AstrBot/pull/8323) | 修复 Windows 非 ASCII 用户路径下 Faiss 索引读写失败问题 | `core` |

这些合并使项目在知识库容错、多提供者兼容性、核心限流逻辑和配置模型可组合性上均向前迈进了一大步。

---

## 社区热点

以下 Issue / PR 在评论数、技术讨论深度或用户关注度上最为突出：

- **[#9334] GSV TTS (Local) 端点/参数类型不兼容导致 404/TypeError**  
  链接：https://github.com/AstrBotDevs/AstrBot/issues/9334  
  用户 @ludan0312 详细分析了 `gsv_selfhosted_source.py` 与 GPT-SoVITS API 的 4 处不兼容（端点、参数类型、字段名、多参数传参），并附源码对比。该 Issue 虽然是 Bug，但技术分析完整，吸引 2 条评论，是目前最急需处理的严重问题之一。

- **[#9354] 子代理内置工具不完整（缺失 web_search_tavily 等）**  
  链接：https://github.com/AstrBotDevs/AstrBot/issues/9354  
  用户 @tokenicrat 准确指出 `astrbot/core/astr_agent_tool_exec:267-281` 中仅公开了本地执行类和插件/MCP 工具，内置的 `web_search_tavily` 等未暴露，导致子代理编排功能大大受限。此类问题影响开发者体验，社区关注度高。

- **[#9258] Discord 适配器需要完善（中文指令注册/参数支持）**  
  链接：https://github.com/AstrBotDevs/AstrBot/issues/9258  
  该 Issue 已存在 9 天，有 2 条评论，且关联 PR #9125（尚未合并）。用户 @NLKASHEI 为 Discord 适配器提交了修复 18 个 Bug 的 PR，社区活跃贡献者持续跟进。

- **[#9208] 增加对 QQ 官方机器人 (ws) 回调按钮事件的响应**  
  链接：https://github.com/AstrBotDevs/AstrBot/issues/9208  
  该需求从 7 月 11 日提出，今日有 PR #9355 提交初步实现，社区响应迅速。

---

## Bug 与稳定性

按严重程度排列（高 → 低），其中部分已有修复 PR 对应：

| 严重度 | Issue / PR | 描述 | 状态 | 修复 PR |
|--------|------------|------|------|---------|
| 🔴 高 | [#9334](https://github.com/AstrBotDevs/AstrBot/issues/9334) | GSV TTS 端点错误、参数类型不匹配、字段名不一致，导致 404 / TypeError | OPEN | 无 |
| 🔴 高 | [#9348](https://github.com/AstrBotDevs/AstrBot/issues/9348) | 并发会话限流 `stall` 策略下等待时间逐轮指数级增长（60s → 120s → 240s → …） | **已关闭** | [#9349](https://github.com/AstrBotDevs/AstrBot/pull/9349)（今日已合） |
| 🟡 中 | [#9354](https://github.com/AstrBotDevs/AstrBot/issues/9354) | 子代理内置工具不完整：`web_search_tavily` 等函数未暴露给子代理 | OPEN | 无 |
| 🟡 中 | [#9352](https://github.com/AstrBotDevs/AstrBot/issues/9352) | AstrBot Desktop v4.26.7 + Shipyard Neo browser-python 报 `agent-browser binary not found`（确认 Gull 正常、FAQ 网站有效） | OPEN | 无 |
| 🟢 低 | [#9101](https://github.com/AstrBotDevs/AstrBot/issues/9101) | Discord 适配器中文命令被正则 `[a-z0-9_-]` 过滤，建议改为 `[\w-]` | **已关闭** | [#9125](https://github.com/AstrBotDevs/AstrBot/pull/9125)（待合并） |
| 🟢 低 | [#9350](https://github.com/AstrBotDevs/AstrBot/pull/9350) | PR #8323 意外将 `import faiss` 移回顶层，导致 faiss-cpu 1.14.2 进程挂起死锁 | **已合并** | 自身即为修复 |

特别注意：`#9348` 的修复 `#9349` 今日已合并，但 Issue 仍为 CLOSED，需确认是否彻底解决。`#9334` 目前无关联 PR，建议尽快排查。

---

## 功能请求与路线图信号

今日新增/活跃的功能请求及对应 PR 状态：

- **Discord 适配器增强**：  
  Issue [#9258](https://github.com/AstrBotDevs/AstrBot/issues/9258) 要求完善中文命令注册、附加参数支持等。关联 PR [#9125](https://github.com/AstrBotDevs/AstrBot/pull/9125)（修复 18 个 Bug）待合并。大概率纳入下一版本。

- **QQ 官方机器人按钮事件**：  
  Issue [#9208](https://github.com/AstrBotDevs/AstrBot/issues/9208) 提出需求，今日有 PR [#9355](https://github.com/AstrBotDevs/AstrBot/pull/9355) 提交实现（通过 WebSocket 接收 INTERACTION_CREATE 事件，新增 `@filter.on_qqofficial_interaction()`）。若合并，将补齐 QQ 平台回调交互能力。

- **消息发送后透传 message_id 以支持插件撤回联动**：  
  Issue [#9356](https://github.com/AstrBotDevs/AstrBot/issues/9356) 今日提出，要求在 `send()` 链路中透传 `message_id`，以便插件实现“用户撤回触发命令 → 机器人同步撤回回复”的功能。目前无 PR，但属于 OneBot 生态常见需求，可能作为未来增强方向。

- **Telegram 使用 Telegraph 代替 t2i 长文转图片**：  
  Issue [#9353](https://github.com/AstrBotDevs/AstrBot/issues/9353) 建议在 Telegram 平台改用 Telegraph 渲染 Markdown，避免图片压缩导致的阅读困难。用户给出了完整的配置建议和 API 参考。暂时无 PR，但思路清晰，可能被采纳。

- **上下文配置正交化重构**：  
  PR [#9340](https://github.com/AstrBotDevs/AstrBot/pull/9340) 今日已合并，将 7 个隐式字段重构为 12 个显式布尔字段，并新增 `/compact` 命令主动触发压缩。进一步，今日又出现 PR [#9346](https://github.com/AstrBotDevs/AstrBot/pull/9346)（Open），同样标题但更新了描述并重新提交，可能是在合并基础上继续优化。路线图信号显示项目正在核心模型上发力。

---

## 用户反馈摘要

从 Issue 描述和评论中可提炼出以下真实用户痛点：

- **Discord 中文命令注册困难**（#9101、#9258）：用户 @NLKASHEI 反馈部署 Discord 机器人时，斜杠命令使用中文会被 `[a-z0-9_-]` 正则过滤掉，重启后消失，严重影响非英文用户使用。该用户已提交修复 PR。

- **GSV TTS 配置繁琐且不兼容**（#9334）：用户 @ludan0312 详细报告了代码与 GSV API 之间的 4 处不兼容，包括硬编码 GET 端点、参数类型错用 `str.lower()`、字段重命名错误等，说明集成文档或测试缺失。

- **子代理功能受限**（#9354）：用户 @tokenicrat 表示子代理只能使用部分工具（插件、MCP、shell），而期待的 `web_search_tavily` 等内置工具不可用，降低了编排灵活性。

- **桌面版浏览器工具问题**（#9352）：用户使用 AstrBot Desktop + Shipyard Neo 的 browser-python profile，浏览器工具报 binary not found，尽管 Gull 健康且官网可访问。环境排障后仍存在问题，期待官方定位。

- **撤回联动需求**（#9356）：用户 @QingFeng-awa 提出 OneBot 生态常见优化：用户撤回触发命令的消息时，机器人自动撤回响应，需要 `message_id` 透传。

- **长文阅读体验优化**（#9353）：用户 @KumaTea 反馈 t2i 绘制的长图在 Telegram 经压缩后文字模糊，且未渲染 Markdown，建议采用 Telegraph 等公开页面替代。

---

## 待处理积压

以下 Issue / PR 重要性高但尚未被合并或响应，建议维护者近期关注：

| 类型 | 编号 | 标题 | 创建时间 | 当前状态 | 优先级说明 |
|------|------|------|----------|----------|-----------|
| Issue | [#9334](https://github.com/AstrBotDevs/AstrBot/issues/9334) | GSV TTS 端点/参数不兼容 | 2026-07-20 | OPEN，无关联 PR | 严重 Bug，影响 TTS 功能 |
| Issue | [#9354](https://github.com/AstrBotDevs/AstrBot/issues/9354) | 子代理内置工具不完整 | 2026-07-22 | OPEN，无关联 PR | 核心编排功能受限 |
| Issue | [#9352](https://github.com/AstrBotDevs/AstrBot/issues/9352) | Desktop 版 browser-python 报 binary not found | 2026-07-22 | OPEN，无评论 | 桌面端用户受阻 |
| PR | [#9125](https://github.com/AstrBotDevs/AstrBot/pull/9125) | Discord 适配器增强（修复 18 个 Bug） | 2026-07-03 | OPEN，等待审核 | 已悬停 20 天，需 review |
| PR | [#9355](https://github.com/AstrBotDevs/AstrBot/pull/9355) | QQ 按钮事件支持 | 2026-07-22 | OPEN，等待审核 | 新 PR，需尽快反馈 |
| PR | [#9351](https://github.com/AstrBotDevs/AstrBot/pull/9351) | MCP 客户端安全加固（SSRF、环境泄漏、npx 包执行、超长响应） | 2026-07-22 | OPEN，等待审核 | 安全增强，重要性高 |
| PR | [#9346](https://github.com/AstrBotDevs/AstrBot/pull/9346) | 上下文配置正交化重构（第二波） | 2026-07-22 | OPEN，与 #9340 冗余 | 需确认是否替代 #9340 或进一步演进 |

另外，Issue [#9208](https://github.com/AstrBotDevs/AstrBot/issues/9208) 和 [#9258](https://github.com/AstrBotDevs/AstrBot/issues/9258) 虽已有对应 PR，但 PR 尚未合并，也请维护者优先安排 review。

---

*报告生成基于 2026-07-23 的 GitHub 数据，所有链接指向具体 Issue/PR 页面。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*