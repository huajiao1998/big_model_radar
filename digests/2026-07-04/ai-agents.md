# OpenClaw 生态日报 2026-07-04

> Issues: 221 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-07-03 22:54 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

好的，这是基于 OpenClaw 2026年7月3日 GitHub 数据生成的 2026-07-04 项目动态日报。

---

# OpenClaw 项目动态日报 | 2026-07-04

## 1. 今日速览

过去 24 小时，OpenClaw 项目呈现出 **“高活跃度与高不稳定性并存”** 的复杂态势。项目共产生 221 条 Issue 更新（其中新开/活跃 142 条）和 500 条 PR 更新（待合并 463 条），反映出社区极高的参与热情。**然而，最新版本 v2026.6.11 发布后触发了一系列严重的回归性 Bug**（工具输出渲染异常、重入保护缺失等），成为今日讨论的绝对焦点。值得肯定的是，核心维护者正发起大规模的内部重构（如错误处理标准化、公用工具函数统一），旨在彻底解决深层次的稳定性问题并为未来的 QA 体系奠定基础。总体来看，项目目前处于**快速迭代伴随阵痛、长期健康度与短期稳定性激烈博弈**的阶段。

## 2. 版本发布

无

## 3. 项目进展

今日合并和推进了多项关键修复与内部重构，项目正朝着更安全和更具工程可持续性的方向发展。

- **【安全加固核心修复】** 针对近期严重的安全追踪题 `#99551`，PR `#99581` 正在推进中，旨在阻止 Codex Worker 对受保护根目录执行危险的递归搜索，从根本上解决工作流逃逸问题。同时，PR `#98972` 修复了渠道集成白名单可以被绕过的问题，强化了安全边界。
- **【发布 Bug 紧急修复】** 今日合入了多个针对 QA 流程的修复（`#99632`、`#99628`、`#99629`），旨在收紧测试流程，防止类似 `#98416`（发布版与源码不符）的事故再次发生。PR `#99647` 已合并，修复了 Slack 频道在会话初始化冲突时的重试机制。
- **【模型生态更新】** PR `#99462` 已提交，新增了对 Anthropic 刚发布的 Claude Sonnet 5（1M Token 上下文窗口）的原生支持。
- **【大规模架构重构（QA Lab 铺垫）】** 维护者 @RomneyDa 今日发起了多起重构 PR，包括简化传输适配器（`#99632`），以及将错误处理（`#99315`）、数字解析（`#99671`）、重试逻辑（`#99672`）等核心机制抽象成共享库。这表明项目正在进行大规模“还债”，为长期的可维护性和可测试性做准备。

## 4. 社区热点

- **🔥 最热话题：工具输出渲染危机（“The Tool Output Rendering Crisis”）**
  这是今日压倒性的社区焦点。多个独立 Issue 指向同一个核心问题：**工具的正常文本输出（命令执行、网页抓取等）被错误渲染为 `“(see attached image)”` 或 `“(no output)”`**，导致 Agent 完全“失明”，无法读取自己的工具返回结果。
  - **相关 Issue：** `#96857`、`#99241`、`#98874`、`#99168`、`#99586`、`#98673`
  - **社区诉求：** 用户迫切需要回归一个稳定、可预期的工具输出机制。许多人认为这是 v2026.6.11 中 `sanitizeContentBlocksImages` 函数的逻辑缺陷。该问题已严重干扰所有依赖命令行/网页工具的复杂自动化流程。

- **💬 高评论量 Issue：文本泄漏**
  Issue `#25592`（工具调用间内部文本泄漏至 IM 频道）以 **33 条评论** 位列今日讨论量第一。这不仅是严重的 UX 问题，更是隐私和安全风险，用户强烈要求维护者尽快给出产品决策。

- **⚠️ 信任危机：发布质量问题**
  用户 @yaaboo-gif 在 `#98416` 中直言“v2026.6.11 的已发布 dist 包缺少了源码中的重入保护提交”，这种情况直接导致了社区对版本发包质量的信任度下降。

## 5. Bug 与稳定性

今日报告了多个影响严重的回归和崩溃问题。按严重程度排列如下：

**紧急 (P1 / Diamond Lobster - 多无有效 Fix PR，风险极高)**

- **`#25592`** 工具间文本泄漏（安全/隐私/UX - 等待产品决策与安全审查）
- **`#98416`** v2026.6.11 发布版缺失重入保护（发布事故）
- **`#98673`** v6.11 的 `sanitizeContentBlocksImages` 函数错误地将文本结果转为图片块（*与上方热点问题高度关联*）
- **`#92043`** 180秒合并超时逻辑为单次壁钟，导致长时间合并每次都失败（死循环）
- **`#85714`** Agent 忘记调用投递工具时，最终消息丢失
- **`#72015`** Active-memory 插件阻塞回复，导致多 Agent 网关过载
- **`#38327`** Vertex AI (`google-vertex/gemini-3.1-pro-preview`) 出现 “Cannot convert undefined or null to object” 回归错误
- **`#87876`** Bedrock Converse 在长上下文会话中静默中止（约 6分钟超时，无重试）
- **`#70024`** 频道停止超时导致频道永久死亡（`running: true` 但无响应）
- **`#99253`** 安全性：AI 助手自行捏造用户对话轮次并回答（严重安全问题）

**高危 (P1-P2 / Platinum Hermit - 部分有 PR 或正在排查)**

- **`#99586`** v6.11 回归：运行时工具表面在网关操作后返回空白体
- **`#97983`** iOS / WebChat 消息无法触发回复
- **`#99263`** Node 26 环境下，Gateway 因 FileHandle 被 GC 关闭而崩溃
- **`#99499`** 消息卡在 `pendingFinalDelivery` 状态，永远无法投递到 UI
- **`#99449`** 开启 Codex 插件导致忽略主模型配置，切换到 OpenAI Codex 并失败
- **`#94220`** `session-medic` 修复后的会话恢复了旧的任务，导致多会话活锁

**其他值得关注的已关闭 Bug：**

- `#98528` (v6.11 工具调用后返回空) — 已关闭
- `#97314` (Google Provider LLM 路径不轮转 Key) — 已关闭
- `#99168` (大型工具输出毒化后续结果) — 已关闭

## 6. 功能请求与路线图信号

- **多智能体协作增强（路线级）：** Issue `#35203` 提出了一份详尽的 RFC，包含了能力画像、共享黑板、分层记忆和 Token 成本治理等机制，这很可能是 OpenClaw 下一代多 Agent 架构的蓝本。
- **按失败类型供应商回退：** Issue `#47910` 提出的按错误类别进行 Provider 回退，避免在已知 Auth 失败上浪费时间，是提升生产环境鲁棒性的关键特性。
- **智能会话自动命名：** Issue `#99583` 提议利用已有的 `llm-slug-generator` 实现懒加载的智能会话重命名，这是一个实用且低耦合的特性，很可能被快速采纳。
- **路线图信号 - “质量之年”：** 从今日 @RomneyDa 主导的一系列重构 PR 来看，项目短期内的发展重心可能放在**内部质量（测试、可维护性）和开发者体验**上，而非爆发式的新功能。

## 7. 用户反馈摘要

- **“工具输出消失”是第一痛点：** “Agent 盲了”、“工具返回了 `(see attached image)` 导致我看不到结果”、“在长任务工作流中这完全无法工作”。这是今日用户反馈中出现频率最高、情绪最强烈的吐槽。
- **对发布流程的不信任感增加：** 用户发现已发布版本的代码与源码不一致（`#98416`），直接削弱了对官方 Release 的依赖感，部分用户开始考虑自行从源码构建。
- **多 Agent 配置的“牢骚”：** 高级用户抱怨“两个 Agent 共享一个全局配置”的架构过于原始，无法满足生产环境的差异化配置需求（`#55401`）。配置页面的设计也被批评为“看起来像 AI 生成的代码”（`#75947`）。
- **隐忧：安全性感知下降：** 除了 `#25592` 的文本泄漏，`#99253` 中 AI 自行捏造用户输入的现象引发了社区对模型行为安全性的严肃讨论。

## 8. 待处理积压

维护者需重点关注以下久拖未决的问题：

- **🔥 紧急积压 Issue：**
  - `#25592`（文本泄漏）：已获得大量关注和评论，目前仍卡在“产品决策”与“安全审查”阶段，急需推动。
  - `#92043`（合并超时逻辑）：被多位用户反馈，作为 P1 级别 Bug 却迟迟没有 Fix PR，设计亟待重做。
  - `#92241` 等一系列由 `@steipete` 提出的老牌稳定性修复 PR（`#77559`、`#77542`、`#77045`、`#77020` 等），提交于 5 月初，至今仍处于“需提供证据”或“等待审查”状态。这些修复（如 Gateway Stall 诊断、Slack 错误处理）非常成熟，长时间搁置可能造成了社区贡献者的挫败感。

- **长期未响应的社区高赞问题：**
  - `#73148`（Image 工具在缺失 `sharp` 包时返回模糊错误）：4月28日提出，获得 3 个 👍，现已标记为 `stale`。这反映了对常见生产环境配置错误（缺依赖）处理不友好的问题长期被忽视。

---

## 横向生态对比

# AI智能体与个人AI助手开源生态横向对比分析报告

**报告日期**：2026-07-04  
**数据来源**：OpenClaw、Zeroclaw、PicoClaw、QwenPaw、hermes-agent 五个开源项目的社区动态日报  
**分析性质**：横向对比，趋势识别，定位研判

---

## 1. 生态全景

当前个人AI助手/自主智能体开源生态正处于 **“规模爆发与质量阵痛并行”** 的关键转折期。今日五个项目合计产出了超过 **800条Issue更新** 和 **1000条PR更新**，社区参与能量惊人。然而，多项目同时暴露了严重影响稳定性的回归Bug（工具输出失明、上下文压缩错误、连接静默中断）和安全短板（密钥明文泄漏、白名单绕过），迫使维护者密集投入重构和质量基建。**多Agent协作、内存上下文治理、安全合规**成为跨越几乎所有项目的共同主题，生态正在从“功能竞赛”向“工程成熟度竞赛”切换。

---

## 2. 各项目活跃度对比

| 项目 | Issues更新数 | PR更新数 | 新Release | 健康度评级 |
|------|-------------|---------|-----------|------------|
| **OpenClaw** | 221（新开/活跃142） | 500（待合并463） | 无 | 🔴 高活跃但高不稳定，质量问题集中爆发 |
| **Zeroclaw** | 极高，具体数未公布 | 极高，具体数未公布 | 无 | 🟢 健康度良好，高强度迭代 |
| **PicoClaw** | 未公布（约10项新issue） | 5合并+12新提交=17 | v0.3.1 | 🟡 活跃度较高，Android端问题待认领 |
| **QwenPaw** | 40（讨论量）+关闭26=至少66 | 34（新提交+合并） | 无 | 🟡 中等，2.0 Beta上下文管理致命不稳 |
| **hermes-agent** | 281（新开/活跃249） | 500（待合并351，合并/关闭149） | 无 | 🟢 极高活跃，安全修复迅速，P2积压较多 |

> 注：Zeroclaw未披露精确计数，但从项目进展列出的PR数量和社区热点密度判断，其体量接近OpenClaw/hermes-agent的第二梯队上限；PicoClaw为单位贡献者驱动，总量较小但特征清晰。

---

## 3. OpenClaw 在生态中的定位

**核心优势**：体量最大、生态最全。Issue/PR吞吐量与hermes-agent持平，社区讨论覆盖面最广（工具调用、安全、渠道、模型支持等全链路）。其“核心参照”的自我定位意味着许多项目会跟踪OpenClaw的路线图决策。

**技术路线差异**：
- 相比 **Zeroclaw（Rust+WASM+Goal Mode）**，OpenClaw更偏向全栈Node.js实现，动态灵活但运行时稳定性受质疑，特别是v2026.6.11的发布事故直接削弱了用户对Release质量的信任。
- 相比 **QwenPaw（Python+审批流+多Agent工作台）**，OpenClaw缺乏原生多Agent编排层，目前的多Agent能力更多靠社区PR私搭，但社区要求提升的呼声极高（RFC #35203）。
- 相比 **PicoClaw（Go+轻量通道）**，OpenClaw功能覆盖面广但启动重量级，配置复杂度高。
- 相比 **hermes-agent**，二者社区规模相当，但hermes-agent在安全修复速度和发布纪律上目前领先（P1漏洞均当日有Fix PR），OpenClaw的“质量之年”重构尚在进行中。

**当前定位评价**：OpenClaw仍是生态中功能最全的参考实现，但短期内“工具输出危机”和发布信任问题可能促使一部分用户转向更稳定的替代方案或自行从源码构建。其大规模重构（QA Lab、共享库抽象）如果落地成功，有望重新确立稳定性标杆。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|---------|---------|
| **Agent 工具输出解析与感知** | OpenClaw, Zeroclaw, QwenPaw | 工具返回结果被错误渲染、空输出或误判为图片；SSE流解析将EOF视为成功；上下文压缩误伤任务关键消息 |
| **内存与上下文管理** | OpenClaw, Zeroclaw, QwenPaw, hermes-agent | 无限增长OOM（Zeroclaw#8642）；Scroll策略折叠当前任务（QwenPaw#5746）；消息泄漏到其他会话（OpenClaw#25592）；记忆路由设计（hermes-agent#31776） |
| **多Agent协作架构** | OpenClaw, Zeroclaw, PicoClaw, QwenPaw | RFC#35203共享黑板；Goal Mode自主任务；协作总线PR#2937；前端单会话约束阻碍多Agent UI（QwenPaw#5767） |
| **安全基线加固** | 全部五个项目 | 密钥脱敏/日志泄漏；目录遍历/白名单绕过；重入保护缺失；OIDC企业认证；WASM隔离执行；危险命令审批 |
| **渠道/连接长稳** | OpenClaw, PicoClaw, hermes-agent | IM通道静默中断、无限重连；支持指数退避重连；WhatsApp/QQ/Matrix/Slack等的重试与诊断 |
| **质量保障与测试基建** | OpenClaw（QA Lab重构）、hermes-agent（AI Review Bot）、Zeroclaw（修复PR审查清单） | 防止发布版与源码不一致；引入自动化审查；统一错误处理与重试逻辑 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Zeroclaw | PicoClaw | QwenPaw | hermes-agent |
|------|----------|----------|----------|---------|--------------|
| **功能侧重** | 全功能AI助手，工具调用+渠道集成+插件 | 自主Agent任务（Goal Mode）、SOP图形化、WASM插件生态 | 轻量多通道网关（WhatsApp/Matrix/DeltaChat等），嵌入式关联 | 企业级多Agent工作台，审批流，2.0上下文管理重架构 | 社区驱动全栈，网关/桌面/安全/本地化，模型灵活覆盖 |
| **目标用户** | 个人开发者/社区高级用户 | 自动化专家、Rust生态开发者、需要可编程Agent行为的团队 | 嵌入式爱好者、个人助手追求低资源占用、通道集成者 | 企业团队、需要审批控制和多Agent编排的组织 | 开源社区贡献者、追求快速迭代和广泛模型支持的开发者 |
| **技术架构** | Node.js/TypeScript，插件化，社区贡献开放 | Rust + WASM，强隔离，出进程执行，技能市场将去中心化 | Go，并发优良，通道模块轻量独立 | Python + React + Tauri（桌面），以Runtime 2.0为核心重构 | 未明确主语言（推测多语言），但渠道/网关/FTS5、AI Bot等组件化 |
| **当前阶段** | 大规模还债/重构（QA Lab、错误处理标准化） | 功能落地密集期（WASM、Goal Mode、SOP图形化），健康度好 | 通道成熟化+连接稳定性攻坚 | 2.0 Beta稳定性修复为主，安全需求冒头 | 安全加固+性能优化（FTS5），Per-turn模型覆盖待合入 |
| **社区成熟度信号** | 发布信任危机，维护者主导重构 | 贡献者增长，标签/流程自动化讨论热 | 新贡献者活跃（多个first-time PR） | 用户深度审计源码，社区有架构辩题 | PR合入节奏快，P1安全当日修，积压P2待缓解 |

---

## 6. 社区热度与成熟度分层

```
Tier 1 – 超大规模（日均500级PR/Issue）  
  ├─ hermes-agent: 快速响应 + 安全敏锐，P2队伍较长但整体健康  
  └─ OpenClaw: 同等规模但稳定性阵痛，维护者正重建质量基线  

Tier 2 – 高速成长（日均30-100级PR/Issue）  
  ├─ QwenPaw: 2.0架构迭代期，核心稳定性仍是软肋，但社区维护者回应积极  
  └─ Zeroclaw: 功能进展迅速，健康度最佳，但CI仅覆盖Linux是明显短板  

Tier 3 – 聚焦突破（日均10-20级PR/Issue）  
  └─ PicoClaw: 通道集成精专，社区规模小但协作密度高，Android问题阻碍用户增长
```

**成熟度排序**（从高到低）：  
hermes-agent > Zeroclaw > OpenClaw > PicoClaw > QwenPaw（2.0阶段不成熟）

---

## 7. 值得关注的趋势信号

### 1) “Agent失明”是当前最大的可用性杀手
OpenClaw、Zeroclaw、QwenPaw 均报告了Agent无法正常读取工具返回结果的问题，根因涉及sanitize逻辑、SSE解析、上下文压缩等不同层面。**对开发者启示**：需要对Agent的输入-输出回路做端到端断言测试，不能假设模型总能正确解析结构化输出。

### 2) 多Agent不再是远景，而是当前配置瓶颈
QwenPaw 的用户通过代码审计指出“前端SDK单会话模型阻碍多Agent”，OpenClaw有社区RFC，PicoClaw已有协作总线PR。**信号**：下一波竞争将从单Agent能力转向多Agent编排、共享记忆和成本治理。

### 3) 安全性要求从“可选加固”变为“基线门槛”
密钥明文落盘（hermes-agent、OpenClaw）、日志未脱敏（QwenPaw）、Zip Bomb（Zeroclaw）、白名单绕过（OpenClaw）—— 几乎每个项目都在同日遭遇安全Issue。同时OIDC、能审批模式、WASM出进程隔离等特性被明确需求。**启示**：新项目立项之初就应将安全审计纳入CI，否则后期重构成本极高。

### 4) 渠道连接稳定性成为留存关键
WhatsApp/Matrix/QQBot 的无提示断连让用户直接弃用。PicoClaw 和 hermes-agent 的修复集中在指数退避与重连诊断。**对开发者**：IM网关的长稳设计（心跳、重试预算、可观测性）不应推迟到上线后。

### 5) “质量之年”从口号变为具体行动
OpenClaw 的重构、hermes-agent 的AI Review Bot、Zeroclaw 的PR审查清单，均指向测试和可维护性的基建投资。**趋势**：2026下半年，具备CI/CD成熟度（发布校验、FTS5性能、错误处理标准化）的项目将获得更高社区信任。

### 6) 本地推理与Token治理受关注
Ollama原生API（hermes-agent）、每轮Token用量（PicoClaw）、上下文窗口显示（Zeroclaw PR#7946）说明社区正从“能跑”转向“跑得省、跑得快”。**对开发者**：关注推理成本的可观测性、按失败类型回退（OpenClaw#47910）、支持可变模型覆盖将成为Agent框架标配。

---

**总结**：今日生态全景展示了一个快速但有所分化的智能体开源世界。**OpenClaw** 和 **hermes-agent** 作为流量两极，分别代表“综合平台”和“敏捷社区”两种路径；**Zeroclaw** 则在Rust安全性和自主任务上建立了差异化；**QwenPaw** 的2.0野心最大但阵痛最烈；**PicoClaw** 专注于通道毛细血管。选择哪个项目作为依赖或贡献起点，取决于对稳定性、语言偏好、多Agent需求以及安全合规的权重判断。跨项目共同指向的下一波浪潮是：**让Agent可靠地理解工具、安全地协作、持久地连接**。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

好的，以下是根据您提供的 GitHub 数据生成的 Zeroclaw 项目动态日报。

---

# Zeroclaw 项目动态日报 | 2026-07-04

**数据统计周期：** 2026-07-03 00:00 UTC - 2026-07-03 23:59 UTC

## 1. 今日速览

今日 Zeroclaw 项目社区与开发活动极度活跃，PR 与 Issue 提交量均处于高位。核心开发团队正集中力量推进数个大规模功能（如 Goal Mode、SOP 图形化、WASM 插件重构）的落地，同时快速响应了 Windows 平台测试崩溃、技能解析器 panic 等多个高优先级 Bug。最值得注意的是，一项旨在解决长期困扰用户的 WSL2 OOM 问题（#5542）的根本性修复已取得突破，其根因之一被归因于 MCP/工具架构中的内存泄漏（#8642）。此外，一项重大的技能安装架构变更——用通用 Git 目录取代硬编码的 ClawHub——正在 PR 流程中，预示着项目生态策略的转变。整体而言，项目处于高强度迭代期，健康度良好，但仍有大量特性代码等待合并与审查。

**活跃度评估：** 🔥🔥🔥🔥🔥 (极高)

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日没有大规模的代码合并事件，但多个关键性、高复杂度 PR 进入了活跃开发与评审状态，表明项目核心功能正在稳步推进。新提交的修复性 PR 则表明团队正在积极解决由新功能和回归测试暴露的问题。

**重要进展与新增 PR (今日新提交)：**

-   **功能：Cron Job 内存标志暴露** (#8676): 实现了 RFC #8397 的要求，将 `uses_memory` 标志添加到 CLI 和 `cron_add`/`cron_update` 工具中，增强了 Cron 功能的可用性。
-   **功能：SOP 可视化创作** (#8590): 这是一个巨大（Size: XL）的 PR，引入了 SOP 的图形化创作界面，并伴有渠道接入、测试和文档。这标志着 SOP 功能从配置文件向用户友好型的重大转变。
-   **基础设施：Git 目录技能安装源** (#8638): 这是一个具有战略意义的 PR，移除了内置的 ClawHub 源，替换为通用的 `git-catalog` 方式安装技能。这去除了对单一第三方来源的强依赖，扩展了技能生态的灵活性。
-   **Bug 修复：插件框架稳定性**:
    -   `fix(plugins): feature-graph...` (#8641): 修复了 Feature 选择逻辑和配置播种问题，解决了插件框架中因配置缺失导致的部分崩溃。
    -   `fix(plugins): seed config entry...` (#8662): 修复了安装插件后自动写入配置的问题，并处理了配置文件格式错误的情况。
-   **Bug 修复：SSE 流解析** (#8663): 修复了流式 API（SSE）将非正常断开 EOF 误判为成功响应的严重问题，这解决了部分情况下模型回复为空或截断的 Bug。
-   **文档：大量文档更新**: 涵盖了插件创作指南 (#8621)、架构指南 (#8669)、Issue 提交模板 (#8666)、PR 审查清单 (#8651) 和标签文档 (#8668) 等多个方面，持续规范化社区贡献流程。

**项目里程碑进展：**
多个与 `v0.8.3` 相关的跟踪 Issue（#7314, #8070, #8071, #8073）在今日均有更新，显示该版本的发布工作依然在按计划推进，主要聚焦于 WASM 插件、运行时执行、网关/ZeroCode 以及文档/基础设施四大块。

## 4. 社区热点

今日社区讨论焦点集中于项目治理、平台兼容性和核心安全架构。

-   **#6808 - RFC: 工作泳道、看板自动化和标签清理 (13 条评论)**
    -   **状态：** 开放，评审中
    -   **链接：** `https://github.com/zeroclaw-labs/zeroclaw/issues/6808`
    -   **分析：** 这是社区当前最核心的管理议题。它旨在设计一套更高效的工作流路由系统，减少维护人员手动管理的负担。该讨论持续得到关注，表明社区在项目规模增长后，对贡献流程自动化和清晰化有强烈的需求。

-   **#7462 - [Bug]: Windows 平台上 74 项测试失败 (8 条评论)**
    -   **状态：** 开放，已接受
    -   **链接：** `https://github.com/zeroclaw-labs/zeroclaw/issues/7462`
    -   **分析：** 这是一个严重的平台兼容性问题，指出了项目 CI 仅覆盖 Linux 的短板。在 Windows 环境下，大量因 Unix 风格命令、路径语义和控制台编码导致的测试失败，严重阻碍了 Windows 开发者参与贡献。此问题的高活跃度反映出社区对支持非 Linux 平台的强烈呼声。

-   **#7141 - RFC: OIDC 认证提供者支持 (7 条评论)**
    -   **状态：** 开放，已接受
    -   **链接：** `https://github.com/zeroclaw-labs/zeroclaw/issues/7141`
    -   **分析：** 作为企业级部署的关键特性，OIDC 支持自提出以来一直受到高度关注。该讨论聚焦于如何通过“可插拔的认证提供者”架构来实现，这直接关系到项目的安全性和在企业环境中的适用性。

-   **#5542 - [Bug]: WSL2 中连续 OOM (7 条评论)**
    -   **状态：** 已关闭
    -   **链接：** `https://github.com/zeroclaw-labs/zeroclaw/issues/5542`
    -   **分析：** 尽管已经关闭，但此 Issue 是今日社区关注的焦点之一。它被标记为数据丢失/安全风险（S0）且在长达三个月后才解决。社区在追踪此 Bug 的同时，也关注到了新拆分出来的内存泄漏问题 (#8642)，显示了社区对长期稳定性问题的耐心与关注。

## 5. Bug 与稳定性

今日报告的 Bug 数量较多，涵盖了从核心运行时到上层 UI 的多个层面。

**严重 Bug（S0/S1级）：**

-   **#5542 - WSL2 连续 OOM (S0)**: **已关闭**。根本原因之一指向工具架构导致的内存泄漏。**相关修复 PR：** (#8642 已拆分跟踪，为解决此问题而生)
-   **#8642 - MCP/工具克隆导致 RSS 无限增长 (S1)**: **新提交**，从 #5542 拆分而来，明确指出是 Agent 循环中的内存泄漏源。**无直接修复 PR。**
-   **#8645 - 环境变量注入的 Secret 显示持续漂移 (S1)**: **新提交**，影响多 Agent 部署的配置管理。
-   **#8627 - WhatsApp Web 设备链接失效 (S1)**: **新提交**，状态为“blocked”，受限于 WhatsApp 的认证协议变更。**无直接修复 PR。**
-   **#8675 - 原生工具调用参数格式错误导致空回复 (S1)**: **新提交**，影响与 OpenAI 格式兼容的多个提供商。

**中等严重 Bug (S2级)：**

-   **#8631 - 确定性 SOP 步骤未执行即标记完成 (S2)**: **新提交**，影响基于 SOP 的自动化工作流的可靠性。
-   **#8554 - Zip Bomb 提取漏洞 (S2)**: **已关闭**。**已通过 PR 修复。**
-   **#8654 - 技能审查分叉 Panic 导致守护进程 SIGSEGV (S2)**: **新提交**，严重影响代理稳定性。
-   **#8644 - ZeroCode 无输出完成 Code Turn (S2)**: **新提交**，影响 ZeroCode 用户体验。
-   **#8664 - ZeroCode 复制包含 Markdown 围栏 (S2)**: **新提交**，影响 ZeroCode 用户体验。

**Bug 修复 PR：**
-   **#8641, #8662**: 修复了插件框架的安装和配置问题。
-   **#8663**: 修复了 SSE 流解析将 EOF 误判为成功的问题。
-   **#8554** 相关的修复应已在 `main` 分支。

## 6. 功能请求与路线图信号

用户需求热点集中于提升开发/运维效率、增强代理自主性及平台扩展性。

-   **Goal Mode (目标模式)** (#8303, PR #8393): 社区和开发者对此有高度共识。它旨在提供一种 Durable 模式，让代理在有约束的预算内自主完成任务。**PR #8393** 已有实现，是 `v0.8.3` 的核心候选功能之一。
-   **上下文窗口显示** (PR #7946 by @eugeneb50): 在 ZeroCode、Web 和 CLI 界面中添加模型上下文窗口使用量指示条。这反映了用户对 Token 消耗和模型上下文上限的普遍关注，该 PR 已是 `v0.8.3` 跟踪列表的一部分。
-   **SOP 图形化创作** (PR #8590 by @singlerider): 用户不再满足于编写 `toml` 和 `md` 文件。此 PR 代表了 SOP 功能从“面向开发者”向“面向用户”的重大转变，体验提升巨大。
-   **WASM 插件出进程执行** (PR #8661 by @singlerider): 这是一个原型 PR，探索将 WASM 插件运行在独立进程中以增强安全隔离性。这表明项目在安全架构上的前瞻性思考，可能会成为未来版本的重要安全特性。
-   **ZeroCode 体验优化** (#8653, #8650, #8652): 用户对 ZeroCode 工具的便捷性提出了更高要求，包括自动恢复最近会话、显示日志路径等。这些 P3 级别的优化需求表明了用户对 ZeroCode 的深度使用和认可，并期待其可以作为主力交互工具。

## 7. 用户反馈摘要

从今日的 Issue 中，可以提炼出以下用户痛点和使用场景：

-   **“我在 Windows 上无法正常开发和测试”**: Issue #7462 揭示了项目的 CI/CD 和测试环境对 Windows 支持不足，导致开发者被迫使用 Linux 环境。这是贡献者入门的主要障碍。
-   **“我的代理在 WSL2 上频繁 OOM 崩溃”**: Issue #5542 的解决过程漫长而复杂，反映了 Agent 在长时间高强度运行下的内存管理压力。用户对此类“数据丢失”级别的 Bug 容忍度极低。
-   **“配置的 SOP 在 Web 界面下看不到”**: Issue #8563 指出了 Web Dashboard 与 SOP 功能集成的缺失，用户期望在一个统一的界面上完成所有操作，而不仅仅是命令行。这是从运维人员到终端用户转化过程中的典型诉求。
-   **“WhatsApp 渠道突然无法连接了”**: Issue #8627 指出用户依赖的社交渠道因第三方协议变更而失效，提示项目需要更强的渠道适配能力和更灵活的降级/通知机制。
-   **“新版本安装/编译失败，提示生成的文件不存在”**: Issue #8632 反映了 `embedded-web` 等复杂功能的安装流程对构建顺序敏感，这可能会让初次接触源码构建的用户感到困惑。

## 8. 待处理积压

以下 Issue 和 PR 长期未得到响应或处于停滞状态，可能需要注意：

-   **PR #6717, #6716, #6718 (风险低，中等，作者 @JordanTheJet)**: 创建于 5 月 16 日，旨在为 Skills 增加 PR 架构审查和 Issue 分类提示。这些技能本身有利于提升项目维护效率，但已超过 1.5 个月未合并，可能需要审查者介入。
    -   链接: `https://github.com/zeroclaw-labs/zeroclaw/pull/6717`
    -   链接: `https://github.com/zeroclaw-labs/zeroclaw/pull/6716`
    -   链接: `https://github.com/zeroclaw-labs/zeroclaw/pull/6718`

-   **Issue #8519 (P1, 已接受，作者 @singlerider)**: 创建于 6 月 30 日，处理 `cargo audit` 和 `cargo deny` 之间关于 WASM 运行时 CVE 的偏差。作为安全相关的 P1 问题，本周还未被分配具体 PR。
    -   链接: `https://github.com/zeroclaw-labs/zeroclaw/issues/8519`

-   **Issue #8632 (P1, 已接受，作者 @JordanTheJet)**: 关于 `embedded-web` 的源码构建错误。虽然已接受并有进展，但作为阻止用户从源码顺利构建的障碍，可能需要优先定位。
    -   链接: `https://github.com/zeroclaw-labs/zeroclaw/issues/8632`

-   **Issue #8626 (P2, enhancement, zerocode by @singlerider)**: 建议 ZeroCode 接收守护进程的完整 RPC 规范并验证。虽不是紧急 Bug，但作为一项架构性改进，可以显著提升客户端与后台通信的鲁棒性，值得规划。
    -   链接: `https://github.com/zeroclaw-labs/zeroclaw/issues/8626`

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

PicoClaw 项目动态日报 | 2026-07-04
AI 智能体与个人 AI 助手领域开源项目分析师

---

### 1. 今日速览

今日项目整体 **活跃度较高**，过去 24 小时内共产出 1 个维护版本、合并/关闭 5 个 PR 并新增 12 个待合并 PR，社区贡献量显著攀升。

开发重心明显向 **连接层稳定性** 倾斜：多位贡献者同时针对 WhatsApp / Matrix 通道提起了指数退避重连修复。与此同时，新通道集成（Simplex、DeltaChat 成熟化）和复杂Agent架构（Agent Collaboration Bus）也在稳步推进中。Android 平台的关键 Bug 报告目前仍无人认领，需维护者关注。

---

### 2. 版本发布

**v0.3.1** — [查看 Release](https://github.com/sipeed/picoclaw/releases/tag/v0.3.1)
- **更新内容**：本版本为快速迭代 Patch，追踪到两条主要合并：
  - `Merge pull request #2917 from PierreLeGuen/nearai-provider`：兼容 Near AI Provider。
  - `Merge pull request #3053 from chengzhichao-xydt/codex/store-lock-type-assert`：修复 Store Lock 类型断言错误。
- **破坏性变更**：无。
- **迁移建议**：建议所有用户升级至此版本以获得最新兼容性修正。

---

### 3. 项目进展

#### 合并/关闭的关键 PR

- **[#3063] feat: add deltachat gateway** (已关闭)
  DeltaChat 通道正式合入主线，为用户提供了去中心化邮件通信的新选择。
- **[#3156] feat(pico): emit per-turn LLM token usage on finalized message** (已关闭)
  现在 Pico 通道会在最终消息中发出每个轮次的 Token 用量，便于下游监控和计费对接。
- **[#3142] fix(spawn): clear ForUser in sub-turn ToolResult** (已关闭)
  修复了异步子 Agent 任务完成时由于 `ForUser` 字段未清空，导致用户侧收到重复消息的问题，提升了多 Agent 协作的可靠性。
- **[#3128] fix(web): explicitly ignore resp.Body.Close() errors** (已关闭)
  清理了 Bing / Tavily / Sogou / Perplexity 四个搜索 provider 中未处理的 `Body.Close()` 错误，按 Go 最佳实践显式忽略，提升了代码静态质量。

#### 社会技术演进

- `#3223` 提出的 Agent 会话清理方案在评审后由作者 @Ethan1918 以更优方案 `#3224` 替代提交，展示了活跃的社区 Code Review 机制。

---

### 4. 社区热点

- **Agent 协作架构（PR #2937）**
  [链接](https://github.com/sipeed/picoclaw/pull/2937)
  这是目前社区最受瞩目的架构级特性——提出了一等公民的 Agent 协作总线，包含 Agent 间邮箱、协作线程、结构化消息信封及权限感知路由。开放 40 天仍在活跃，代表了 PicoClaw 走向复杂工作流编排的关键一步，社区期待值极高。

- **连接稳定性修复集中爆发（PR #3219 / #3220 / #3179）**
  [PR #3219](https://github.com/sipeed/picoclaw/pull/3219) | [PR #3220](https://github.com/sipeed/picoclaw/pull/3220) | [PR #3179](https://github.com/sipeed/picoclaw/pull/3179)
  @AMEOBIUS 和 @Alix-007 几乎同时针对 WhatsApp 和 Matrix 通道提交了带有指数退避的重连机制。用户社区对“通道无提示静默死亡”的修复诉求非常强烈，这两组 PR 直接命中了长期痛点，引发了高度关注。

---

### 5. Bug 与稳定性

| 严重程度 | Issue / PR | 摘要 | 状态 |
|---|---|---|---|
| **严重** | [#3178](https://github.com/sipeed/picoclaw/issues/3178) | **WhatsApp Websocket 超时**：用户反馈在生产环境 Docker 中长期运行后超时，无自动恢复。 | 已有修复 PR #3220 / #3179 待合入 |
| **严重** | [#3220 / #3219](https://github.com/sipeed/picoclaw/pull/3220) | **WhatsApp / Matrix 静默断线**：`ReadMessage` 循环在死连接上重试，永不恢复，需手动重启。 | 新提交，待 Review |
| **高** | [#3218](https://github.com/sipeed/picoclaw/pull/3218) | **v2→v3 配置迁移失败**：`legacyDiagnosticConfig` 缺少 `BuildInfo` 字段，导致 v0.2.5+ 保存的配置迁移时报错 "unknown field(s)"。 | 已提交修复 PR |
| **中** | [#3182](https://github.com/sipeed/picoclaw/issues/3182) | **Android 版无法启动服务**：用户已授权所有权限，但无法从设置更改路径，服务启动失败。 | **无人认领，待维护者分配** |
| **中** | [#3221](https://github.com/sipeed/picoclaw/pull/3221) | **撤销测试**：撤回关于 Windows 沙箱路径处理的测试，暗示该模块在当前版本中存在不确定性问题。 | 回退已提交 |

---

### 6. 功能请求与路线图信号

以下功能已具备实现 PR，**有望进入下一版本**：

| PR | 功能 | 趋势信号 |
|---|---|---|
| [#2937](https://github.com/sipeed/picoclaw/pull/2937) | **Agent 协作总线** | 标志性架构升级，项目从单 Agent 向多 Agent 协同进化 |
| [#3193](https://github.com/sipeed/picoclaw/pull/3193) | **支持 Simplex 通道** | 持续拓宽通信协议覆盖 |
| [#3200](https://github.com/sipeed/picoclaw/pull/3200) | **WebUI 模型降级链配置** | 面向非开发者用户的易用性增强 |
| [#3217](https://github.com/sipeed/picoclaw/pull/3217) | **Discord 基于角色的访问控制** | 团队协作场景下的安全治理需求浮现 |
| [#3222](https://github.com/sipeed/picoclaw/pull/3222) | **DeltaChat 实现精简（-320LOC）** | 代码去重维护，标志通道模块进入成熟稳定期 |

---

### 7. 用户反馈摘要

- **Android 端体验受阻（#3182）**：用户 @Monessem 反馈在 Android 上虽已授予全部权限，依然无法正常启动服务，且应用内路径设置面板不可用。随附截图直观展示了崩溃状态。该问题自6月26日提交至今无 Assignee，是现有用户群体中 **最急迫的移动端负面体验**。
- **WhatsApp 生产环境超时（#3178）**：用户 @Jh123x 汇报在 Docker + Deepseek 模型下，WhatsApp Websocket 在无感知情况下超时。项目方应在下个版本择优合入现成的重连方案（#3220 / #3179），避免用户持续流失。
- **社群开发正向循环**：多位贡献者正针对自己亲自遇到的痛点编写修复（如 @AMEOBIUS 的配置迁移与重连修复），形成了良好的“问题发现—代码修复—社区评审”循环，项目健康度信号积极。

---

### 8. 待处理积压

| 链接 | 类型 | 悬停时间 | 建议 |
|---|---|---|---|
| [#3182](https://github.com/sipeed/picoclaw/issues/3182) Android Bug | Issue | 8天 (Stale) | **重要客户触点，且无 Assignee** —— 建议核心维护者认领或标记为 P0 优先级，与社区开发者协同排期。 |
| [#2937](https://github.com/sipeed/picoclaw/pull/2937) Agent 协作 | PR | 40+天未合入 | 代码量大且触及核心架构，建议组织专项 Review 会议或给出阶段性反馈，避免社区重大贡献因长期沉默而流失。 |
| [#3165](https://github.com/sipeed/picoclaw/pull/3165) Seed XML 工具调用修复 | PR | 10天停滞 | 若无 Review 动力，可能在下次清理中被标记为 Stale 关闭。 |
| [#3193](https://github.com/sipeed/picoclaw/pull/3193) Simplex 通道 | PR | 6天停滞 | 新通道集成类 PR 通常有清晰的评审边界，建议优先安排 Review。 |

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

好的，作为AI智能体与个人AI助手领域开源项目分析师，我已根据您提供的QwenPaw GitHub数据，完成了对项目动态的深度分析。以下是 **QwenPaw 项目动态日报 (2026-07-04)**。

---

### QwenPaw 项目动态日报
**日期：** 2026-07-04 | **数据周期：** 2026-07-03 ~ 2026-07-04

---

#### 1. 今日速览

过去24小时，QwenPaw 项目依然保持高度活跃，但显示出**“高修复、高反馈、高压积”**的三高特征。社区Issue讨论量（40条）和PR提交量（34条）均处于高位，但大量Issue集中在Bug报告和功能请求，反映出用户对稳定性和功能深度有较高期待。维护者响应迅速，关闭了26个Issue和15个PR，显示出强大的问题处理能力。然而，仍有大量新PR（19个）处于待合并状态，且多个关于核心架构（多Agent、上下文管理）的讨论被反复提出，表明项目在向2.0版本演进过程中，正面临关键性的架构决策和稳定性挑战。**整体健康度：中等，社区贡献活跃，但核心稳定性问题亟待解决。**

#### 2. 版本发布

无新版本发布。

#### 3. 项目进展

今日合并/关闭的PR展示了项目在**稳定性修复、平台适配和开发者体验**三个维度的持续投入。

- **核心功能修复与稳定性提升：**
    - **执行策略同步修复** ([PR #5506](https://github.com/agentscope-ai/QwenPaw/pull/5506)): 修复了2.0升级后，前端配置的工具执行策略无法同步到后端 `policy.yaml` 文件的问题，同时修复了即使配置为“off”仍然会触发审批的Bug。这对于生产环境下的审批流控制至关重要。
    - **插件残留问题修复** ([Issue #5689](https://github.com/agentscope-ai/QwenPaw/issues/5689)): 修复了删除Remote SSH插件后，因卸载不干净导致对话报`ModuleNotFoundError`的错误。这提升了插件系统的健壮性。
    - **模型请求增强** ([PR #5764](https://github.com/agentscope-ai/QwenPaw/pull/5764)): 为`abort`信号添加了`AbortController`支持。这一基础设施层面的改进，为前端实现用户主动取消长时间请求提供了可能，显著提升用户体验。
    - **MCP客户端配置容错** ([PR #5755](https://github.com/agentscope-ai/QwenPaw/pull/5755)): 修复了单个MCP客户端错误配置（如transport字段名写错）导致整个Agent配置无法加载的问题。这让MCP集成更具鲁棒性。

- **新功能与平台集成：**
    - **内存搜索加入排序机制** ([PR #5647](https://github.com/agentscope-ai/QwenPaw/pull/5647) & [#5648](https://github.com/agentscope-ai/QwenPaw/pull/5648)): 后端新增可配置的`Reranker`支持，前端新增相应的配置面板。这意味着用户可以接入外部Rerank API（如SiliconFlow）对记忆搜索结果进行二次排序，有效提升了上下文检索质量。
    - **GitHub Models 端点更新** ([PR #5735](https://github.com/agentscope-ai/QwenPaw/pull/5735)): 及时跟进上游变更，将GitHub Models的API端点迁移至新地址，并支持更细粒度的PAT令牌。保证了该项服务的可用性和安全性。
    - **Windows 原生沙箱** ([PR #5525](https://github.com/agentscope-ai/QwenPaw/pull/5525)): 由社区贡献者实现了Windows原生沙箱。这对于Windows用户安全地执行代码或运行有风险的工具来说是一个里程碑式的功能。
    - **桌面端构建转向Tauri** ([PR #5734](https://github.com/agentscope-ai/QwenPaw/pull/5734)): 一个代号`codex`的PR开始将桌面端发布流程切换到Tauri框架。Tauri相比Electron在性能和体积上优势明显，预示着QwenPaw桌面版的未来方向。
    - **Azure Bot Channel 集成** ([PR #5762](https://github.com/agentscope-ai/QwenPaw/pull/5762)): 新功能PR，集成了Azure Bot Framework，理论上可以接入Teams、Slack、Telegram等几乎所有主流聊天平台，极大地扩展了外部渠道连接能力。

- **开发者体验与维护：**
    - **引入AI代码Review Bot** ([PR #5736](https://github.com/agentscope-ai/QwenPaw/pull/5736)): 项目开始引入自动化AI代码审查工具，有助于提高PR审查效率和代码质量标准。
    - **会话列表组件统一** ([PR #5754](https://github.com/agentscope-ai/QwenPaw/pull/5754)): 将侧边栏和抽屉中的会话列表组件进行了统一重构，提升了前端代码的可维护性和一致性。
    - **Slash命令优先级修复** ([PR #5751](https://github.com/agentscope-ai/QwenPaw/pull/5751)): 修复了聊天中输入`/new`会被自动补全为技能名`/news`的冲突问题，提升了用户体验。此PR正在审查中。

#### 4. 社区热点

1.  **密钥安全与日志脱敏** ([Issue #5705](https://github.com/agentscope-ai/QwenPaw/issues/5705)): 6条评论，社区对“security”的呼声最高。这个Feature Request不仅提出了密钥在`agent.json`中的引用问题，还深入挖掘了Dialog和ReMe日志中未脱敏的敏感信息。这表明社区用户已经对项目进行了深度代码审计，背后诉求是**对生产环境安全合规性的极大关注**。

2.  **2.0 Beta：Scroll上下文压缩导致“失忆”** ([Issue #5746](https://github.com/agentscope-ai/QwenPaw/issues/5746)): 4条评论，严重Bug。用户报告在2.0beta版本中，`scroll`策略错误地压缩了当前任务，导致模型输出完全无关的历史回复。这直接动摇了用户对2.0版本的信任。该问题是**2.0稳定性的头号威胁**。好在已有专门的修复PR([#5765](https://github.com/agentscope-ai/QwenPaw/pull/5765))提交。

3.  **Console前端架构阻塞多Agent演进** ([Issue #5767](https://github.com/agentscope-ai/QwenPaw/issues/5767)): 2条评论，这是一条极具技术深度的反馈。用户通过分析源码指出，Console所使用的`@agentscope-ai/chat` SDK的“单会话pull”模型，从根本上限制了多Agent和工作空间在UI层的实现。这揭示了**项目从“单智能体助手”向“多智能体平台”演进的核心架构瓶颈**。

#### 5. Bug 与稳定性（按严重程度排列）

| 严重程度 | Bug 描述 | Issue | 状态 | 关联修复 PR |
| :--- | :--- | :--- | :--- | :--- |
| **致命** | **[2.0 Beta] Scroll 上下文压缩错误折叠当前任务，导致模型回复错乱** | [#5746](https://github.com/agentscope-ai/QwenPaw/issues/5746) | 开放等待修复 | [#5765](https://github.com/agentscope-ai/QwenPaw/pull/5765) (已提交) |
| **致命** | **Runtime 2.0 工具调用历史损坏，导致模型无限重复执行** | [#5717](https://github.com/agentscope-ai/QwenPaw/issues/5717) | 开放等待修复 | [#5761](https://github.com/agentscope-ai/QwenPaw/pull/5761) (已提交) |
| **高** | **[2.0.0b2] API路由404: `/api/api/workspace/...` 路径双写bug** | [#5769](https://github.com/agentscope-ai/QwenPaw/issues/5769) | 开放 | - |
| **高** | **上下文压缩无保护锚点，导致关键消息（如渠道、任务指令）被截断** | [#5710](https://github.com/agentscope-ai/QwenPaw/issues/5710) | 开放 | - |
| **中** | **计划模式执行期间，同一脚本文件被反复读取** | [#5759](https://github.com/agentscope-ai/QwenPaw/issues/5759) | 开放 | - |
| **中** | **执行偏重型任务时，会经常无故卡死/中断** | [#5763](https://github.com/agentscope-ai/QwenPaw/issues/5763) | 开放 (待确认) | - |
| **中** | **自动化任务无端终止，无任何手动干预** | [#5616](https://github.com/agentscope-ai/QwenPaw/issues/5616) | 开放 (待确认) | - |

**稳定性洞察**：过去24小时内报告的Bug呈现出高度集中的趋势，**大部分核心问题都指向了QwenPaw 2.0 Beta版本的上下文管理机制（#5746, #5710, #5717）**。这表明2.0虽然在架构上有所创新，但其内存和上下文管理机制尚不稳定，是当前版本的“阿喀琉斯之踵”。

#### 6. 功能请求与路线图信号

| 功能请求 | Issue | 关联PR/状态 | 趋势判断 |
| :--- | :--- | :--- | :--- |
| **密钥安全存储与日志脱敏** | [#5705](https://github.com/agentscope-ai/QwenPaw/issues/5705) | 无，但有强烈社群共识 | **下一版本必入**。安全是上线前决不可妥协的红线。 |
| **能力短板分析与改进方案** | [#5711](https://github.com/agentscope-ai/QwenPaw/issues/5711) | 无，但内容详实，价值高 | **中长期路线图参考**。用户贡献的系统性分析，对内核迭代有极高指导意义。 |
| **自定义模型协议** | [#5609](https://github.com/agentscope-ai/QwenPaw/issues/5609) | 无 | **短期可期待**。支持非标准API路径（如图片生成模型），能极大扩展可用模型生态。 |
| **插件内获取当前SessionId** | [#5547](https://github.com/agentscope-ai/QwenPaw/issues/5547) | 无 | **低代码/集成场景关键需求**。解决插件与外部业务系统对接时的身份和状态同步问题。 |
| **系统级解决Windows GBK编码问题** | [#4481](https://github.com/agentscope-ai/QwenPaw/issues/4481) | 无 (长期Issue) | **长期顽疾**。用户在呼唤根本性的解决方案，而非零散修补。 |
| **增强浏览器自动化稳定性** | [#4584](https://github.com/agentscope-ai/QwenPaw/issues/4584) | 无 (长期Issue) | **核心功能优化**。建议将驱动从CDP转向Playwright，以提升稳定性。 |

**路线图信号**：从今日的PR合并看，项目短期发力点在于：1）**稳固2.0核心**（修复上下文压缩）；2）**完善流程层**（执行策略修复、新增`AbortSignal`）；3）**合并功能PR**（Tauri桌面端、Azure Bot Channel）。社区对**安全**和**基础架构思辨**的热情高涨，可能影响QwenPaw后续版本的设计哲学。

#### 7. 用户反馈摘要

- **“稳定性是首要痛点”**: 多位用户（@huangreason-blip, @vipcys001-bot, @biaobiaobiao108）反馈了任务执行中反复读文件、无故中断、上下文丢失等问题，尤其在执行“偏重型”或“计划模式”任务时表现突出。这说明QwenPaw在复杂、长周期的任务场景下，稳定性和资源管理能力有待加强。
- **“我们真的在认真用”**: 从#5705和#5711的深入分析可以看出，一部分用户已将QwenPaw深度集成到生产或准生产环境，并进行源码级审计。他们提出的建议不再是浅层体验，而是涉及架构、安全、数据持久化的深层优化，是项目最宝贵的“顾问团”。
- **“功能深度足够，但还不够顺手”**: 用户@freeliuade提出的在插件中获取SessionId的需求，以及@xiehaitang希望支持非标准API协议，都反映了开发者在使用QwenPaw构建应用时，遇到了由于框架抽象层级带来的“最后一公里”阻碍。
- **“社区有很强的自我驱动力”**: 多个“first-time-contributor” PR (如#5525, #5736, #5750, #5766) 的提交，表明社区不仅会提问题，更会动手解决问题，项目的新人友好度和贡献引导做得不错。

#### 8. 待处理积压

- **亟待解决的架构问题**:
    - **Console前端“单会话”约束** ([#5767](https://github.com/agentscope-ai/QwenPaw/issues/5767)): 这是限制QwenPaw向多智能体平台发展的顶层设计问题，需要项目维护者给出明确的技术决策。
    - **系统级Windows GBK编码** ([#4481](https://github.com/agentscope-ai/QwenPaw/issues/4481)): 该Issue已持续近2个月，虽非致命Bug，但严重影响Windows用户的日常体验，长期未解决可能积累不满。

- **待解决的 Bug 趋势**:
    - **任务无故中断/卡死**：`#5616`、`#5759`、`#5763` 等多个Issue指向任务执行稳定性问题，可能存在一个未被发现的通用根因（如线程死锁、资源泄露），需要集中排查和回复。

- **长期停滞的 PR**:
    - **`[codex] fix chat input queue session id migration`** ([PR #5514](https://github.com/agentscope-ai/QwenPaw/pull/5514)): 一个关键的聊天队列Session ID修复，与`@agentscope-ai/chat` SDK升级有关。已开启超过一周仍未合并，可能与外部SDK依赖相关，属于“阻塞性”积压，应推动解决。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes-Agent 项目动态日报 | 2026-07-04

> 数据区间：2026-07-03 00:00 – 2026-07-04 00:00 UTC  
> 来源：GitHub [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日速览

过去 24 小时项目继续保持极高活跃度：共处理 **281 条 Issue 更新**（新开/活跃 249，关闭 32）和 **500 条 PR 更新**（待合并 351，已合并/关闭 149）。虽然没有新版本发布，但社区和贡献者在安全加固、桌面 UI 修复、网关功能扩展以及性能优化四大方向提交了大量代码。**P1 安全漏洞（终端快照明文泄漏、CDP 私有网络绕过）均已有修复 PR，反馈迅速的维护节奏体现了项目健康度。** QQBot 无限重连、桌面 `/compress` 失效等 P2 回归问题仍待合并解决。

---

## 2. 版本发布

无（过去 24 小时无新 Release）。

---

## 3. 项目进展

过去一天 **149 个 PR 被合并或关闭**，以下是其中对项目影响较大的变更：

### 🚀 功能推进
- **`/sessions search` 网关搜索**（[#57595](https://github.com/NousResearch/hermes-agent/pull/57595)）— 已合并。网关用户现在可在 Telegram 等消息端直接搜索可恢复会话，并保持可见性隔离。  
- **Kanban 完成需附证据**（[#57960](https://github.com/NousResearch/hermes-agent/pull/57960)）— 已合并。Kanban 看板完成流增加强制性证据引用校验，拒绝空或不安全路径。

### 🐛 重要 Bug 修复
- **桌面认证页面崩溃**（[#57959](https://github.com/NousResearch/hermes-agent/pull/57959)）— 修复了只启用密码认证提供者时首屏 500 崩溃。  
- **会话存储 FTS5 性能优化**（[#57965](https://github.com/NousResearch/hermes-agent/pull/57965)）— 将全文索引从内联模式切换为外部内容视图，消除消息文本的三重冗余存储，预计可显著减少磁盘占用与写放大。

### 🔒 安全修复
- **桌面 FS 编辑器写保护**（[#57953](https://github.com/NousResearch/hermes-agent/pull/57953)）— 已合并。`/api/fs/write-text` 端点之前未应用共享的保护路径守卫，远程编辑器可绕过限制写入危险位置。
- **Shell 钩子脚本重认可**（[#57952](https://github.com/NousResearch/hermes-agent/pull/57952)）— 接入中，解决脚本内容变更后信任仍滞留的问题（关联 #57558）。

### 🌍 本地化
- **俄语翻译补全**（[#48264](https://github.com/NousResearch/hermes-agent/pull/48264)）— 已合并。完善了桌面应用设置字段与缺失的 Web 密钥翻译。

此外，位于队列中的 **per‑turn / per‑image 模型覆盖**（[#29923](https://github.com/NousResearch/hermes-agent/pull/29923)）仍在活跃推进，其 `/model --once` 支持及生成模型级覆盖将对工作流灵活性产生重要影响。

---

## 4. 社区热点

过去 24 小时议论最集中、互动最高的议题：

### 🔥 xAI OAuth 403 争议（[#26847](https://github.com/NousResearch/hermes-agent/issues/26847)）— 31 条评论
标准 SuperGrok（$30/月）订阅用户在 OAuth 流程成功后仍被 xAI 后端返回 `HTTP 403`，违反官方文档声称的“所有层级均支持”承诺。用户指责 xAI 在人机协同工具中强制仅限 Heavy 订阅，社区讨论激烈，目前该 Issue 已被关闭，但未给出具体修复细节，需留意后续。

### 🎨 Dashboard 主题可读性（[#18080](https://github.com/NousResearch/hermes-agent/issues/18080)）— 45 👍 / 26 条评论
用户痛斥现有配色和衬线字体在小字号下对比度极差，导致长时间使用视觉疲劳。贡献者提议通过 CSS 变量系统支持社区主题插件，并呼吁改善默认主题的 WCAG 合规性。

### 🤖 QQBot 无限重连（[#52914](https://github.com/NousResearch/hermes-agent/issues/52914)）— 13 条评论，4 👍
更新至 `43b8ba4181` 后 QQ 网关因 `connect()` 缺少 `is_reconnect` 参数陷入重试黑循环，完全无法使用。用户多次提供日志，问题明确且复现简单，但尚无关联 PR 合并。

### ⚡ Ollama 原生 API 优化（[#4505](https://github.com/NousResearch/hermes-agent/issues/4505)）— 13 条评论
推动从 OpenAI 兼容端点切换到 Ollama `/api/chat` 原生端点以获得真增量流式、原生工具支持等。该议题已持续 3 个月，期间持续有用户补充性能数据，**显示出社区对本地推理效率的强烈需求**。

---

## 5. Bug 与稳定性

### 🔴 严重等级

| 编号 | 标题 | 优先级 | 状态 | 关联修复 PR |
|------|------|--------|------|-------------|
| [#48441](https://github.com/NousResearch/hermes-agent/issues/48441) | 终端快照明文泄漏 .env 密钥 | **P1** | 已关闭 | 已在早期修复 |
| [#36934](https://github.com/NousResearch/hermes-agent/issues/36934) | `/steer` 被高抗注入模型误报 | **P1** | 已关闭 | 会话状态保护已合并 |
| [#52914](https://github.com/NousResearch/hermes-agent/issues/52914) | QQBot 无限重连 | **P2** | 待修复 | 无 |
| [#44456](https://github.com/NousResearch/hermes-agent/issues/44456) | Desktop `/compress` 无法使用 | **P2** | 待修复 | 无 |
| [#55658](https://github.com/NousResearch/hermes-agent/issues/55658) | 更新后桌面无法启动 | **P2** | 待修复 | 无 |
| [#38989](https://github.com/NousResearch/hermes-agent/issues/38989) | 侧边栏会话列表随机缺失 | **P2** | 待修复 | 无 |
| [#21734](https://github.com/NousResearch/hermes-agent/issues/21734) | `/sessions` 在网关平台无响应 | **P2** | 待修复 | 无 |
| [#7746](https://github.com/NousResearch/hermes-agent/issues/7746) | Qwen OAuth 刷新 JSON 错误 | **P2** | 待修复 | 无 |
| [#6147](https://github.com/NousResearch/hermes-agent/issues/6147) | 安装程序键盘输入卡住 | **P2** | 已关闭 | 已修复 |
| [#20866](https://github.com/NousResearch/hermes-agent/issues/20866) | Qwen 辅助任务 400 格式错误 | **P3** | 待修复 | 无 |
| [#24860](https://github.com/NousResearch/hermes-agent/issues/24860) | Dashboard 粘贴不可用 | **P3** | 待修复 | 无 |
| [#55416](https://github.com/NousResearch/hermes-agent/issues/55416) | Photon iMessage gRPC 流中断 | **P3** | 待修复 | 无 |

### 🛡️ 今日新增的安全修复 PR（审查中）
- [#57966](https://github.com/NousResearch/hermes-agent/pull/57966) — 屏蔽 CDP `Target.createTarget` 对私有地址的调用  
- [#57963](https://github.com/NousResearch/hermes-agent/pull/57963) — 转录路径在调用提供者前经过凭证读取守卫  
- [#57953](https://github.com/NousResearch/hermes-agent/pull/57953) — 桌面 FS 编辑器写保护  
- [#57952](https://github.com/NousResearch/hermes-agent/pull/57952) — Shell 钩子脚本重认可  

**总结：P1 类问题均已闭环；P2 数量虽多，但多数有清晰复现路径，未出现持续阻塞开发的严重问题。**

---

## 6. 功能请求与路线图信号

从今日讨论和高赞 Issue 中可识别出以下重点功能需求，部分已有对应 PR 推进：

| 特性 | 链接 | 社区关注度 | 状态 / 可能性 |
|------|------|------------|----------------|
| **每轮 / 每次生成模型覆盖** | [#29923](https://github.com/NousResearch/hermes-agent/pull/29923) | 长期在途 PR | 高 — 接近完善 |
| **命令审批自定义模式** | [#5528](https://github.com/NousResearch/hermes-agent/issues/5528) | 👍 12，讨论6 | 中 — 已有 approval.py 抽象，待插件化 |
| **Linear 网关适配器** | [#5826](https://github.com/NousResearch/hermes-agent/issues/5826) | 👍 7 | 中低 — 尚未进入 sprint |
| **OpenAI 通用图像生成** | [#13798](https://github.com/NousResearch/hermes-agent/issues/13798) | 👍 4 | 中 — 社区有原型 |
| **Agent 迁移系统** | [#524](https://github.com/NousResearch/hermes-agent/issues/524) | 创建3个月 | 低 — 长期需规划 |
| **Google Cloud STT/TTS（无 API Key）** | [#57120](https://github.com/NousResearch/hermes-agent/issues/57120) | 今日新增 | 高 — 与现有语音栈契合 |
| **记忆作为背景而非用户消息** | [#31584](https://github.com/NousResearch/hermes-agent/issues/31584) | 9条评论 | 中 — 设计复杂，安全性受关注 |
| **Hindsight 多存储路由** | [#31776](https://github.com/NousResearch/hermes-agent/issues/31776) | 4条评论 | 低 — 等待 memory 重构 |

**路线图信号：** 从合并的 PR 看，维护者优先优化 **性能（FTS5）、网关操作（会话搜索、Chunking）、安全护栏**，对 **模型灵活性**（per‑turn 覆盖）也在稳步推进。用户体验类（主题、粘贴、本地化）不会阻塞，但持续有贡献者填补。

---

## 7. 用户反馈摘要

> 从 Issue 评论中提炼的真实用户声音，按主题归类。

### 😠 文档与实现冲突 — xAI OAuth
> “我严格按照文档流程订阅了标准 SuperGrok，却得到 403。你们的文档说‘所有层级都可用’，但后端只允许 Heavy。”  
> —— [@Roehrbacher](https://github.com/NousResearch/hermes-agent/issues/26847)

### 😣 升级后核心功能断裂 — QQBot 网关
> “更新后 QQ 机器人彻底不能用了，一直重连。回退版本才恢复。请尽快修复，这个严重影响用户。”  
> —— [@fishlikeX](https://github.com/NousResearch/hermes-agent/issues/52914)

### 🧐 桌面可用性抱怨 — 主题与粘贴
> “Ember 主题下代码块文字浅灰色 + 衬线字体完全看不清。Ctrl+V 粘贴还有问题，Dashboard 作为主要交互界面体验远差于 TUI。”  
> —— [@sccasupercat](https://github.com/NousResearch/hermes-agent/issues/24860) / [@ogermer](https://github.com/NousResearch/hermes-agent/issues/18080)

### ✅ 认可与建议 — Ollama 性能
> “切换到原生 API 后延迟降低了 40%，终于能在本地跑满意的流程了。希望官方早日合并这个优化。”  
> —— [@declan2010](https://github.com/NousResearch/hermes-agent/issues/4505)（评论中）

### 🔒 安全担忧 — 快照泄漏
> “终端环境变量直接明文落盘，这个太危险了。我的 API Key 全在里面。希望尽快修复。”  
> —— [@Fjustice9308](https://github.com/NousResearch/hermes-agent/issues/48441)（已修）

---

## 8. 待处理积压

以下为长期开放但仍未获得实质性进展或维护者反馈的重要事项，建议重点关注：

| 编号 | 标题 | 创建时间 | 优先级/关注度 | 现状 |
|------|------|----------|---------------|------|
| [#524](https://github.com/NousResearch/hermes-agent/issues/524) | Agent 迁移系统 — 自动导入竞争对手配置 | 2026-03-06 | P3 / 👍 1 | 无人认领，初始对新手重要 |
| [#4505](https://github.com/NousResearch/hermes-agent/issues/4505) | Ollama 原生 API 优化 | 2026-04-01 | P3 / 👍 2，持续三周讨论 | 有 PR 雏形但未进入主仓库 |
| [#5528](https://github.com/NousResearch/hermes-agent/issues/5528) | 可配置危险命令审批模式 | 2026-04-06 | P3 / 👍 12 | 高票需求，设计清晰但未排期 |
| [#5826](https://github.com/NousResearch/hermes-agent/issues/5826) | Linear 网关适配器 | 2026-04-07 | P3 / 👍 7 | 社区有热情，缺少主程领办 |
| [#12188](https://github.com/NousResearch/hermes-agent/issues/12188) | Docker Compose 环境变量配置模型 | 2026-04-18 | P3 / 👍 2 | 文档缺失，改进范围明确 |
| [#52914](https://github.com/NousResearch/hermes-agent/issues/52914) | QQBot 无限重连 **（Bug）** | 2026-06-26 | P2 / 👍 4 | 影响明确，至今无 PR 提交 |
| [#38989](https://github.com/NousResearch/hermes-agent/issues/38989) | 桌面侧边栏会话隐藏 **（Bug）** | 2026-06-04 | P2 / 👍 3 | 有截图但未定位 |

**建议维护者优先关注 #52914（QQBot 回归）和 #5528（审批配置）两个既有热度又有清晰边界的工作项。**

---

> 本报告基于 Hermes-Agent 开源仓库公开数据自动生成，如有错误或遗漏请通知作者。  
> 项目链接：https://github.com/NousResearch/hermes-agent

</details>

---
*本日报由 [Big Model Radar](https://github.com/w409401768/big_model_radar) 自动生成。*