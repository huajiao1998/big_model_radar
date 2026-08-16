# OpenClaw 生态日报 2026-08-17

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-16 22:10 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-17

## 1. 今日速览

过去24小时项目活跃度极高：共产生 500 条 Issue 更新（新开/活跃 467 条，关闭 33 条）和 500 条 PR 更新（待合并 383 条，已合并/关闭 117 条），另有 1 个新 Release 发布。Issue 侧 P1 级消息丢失/会话状态类 Bug 仍占主导（#121058、#87744、#96834 等持续被社区追踪），但 PR 侧已出现针对 Gateway 事件循环阻塞（#124844）、队列消息压缩后上下文丢失（#124850）等核心问题的修复，说明维护团队正在积极消化积压。整体判断：项目处于高吞吐迭代期，社区反馈活跃，但 P1 级稳定性问题积压较多，健康度中等偏上。

---

## 2. 版本发布

### pr-124528-profiles — Gateway profile evidence（2026-08-16）

**内容**：为 PR #124528 提供的 CPU profile 归档，包含有界三节点、十二并发轮次 Gateway 测试台采集的 before 与 exact-head 两份 profile，用于事件循环热点对比分析。

**性质**：该 Release 为性能分析证据包，非功能版本。无破坏性变更，无迁移注意事项。它表明维护者正在针对 Gateway 事件循环阻塞问题（参见 #115908、#112423、#124844）进行系统性性能归因。

---

## 3. 项目进展

今日合并/关闭的 PR 中，以下几条对项目推进有实质意义：

- **fix(cli): emit one JSON failure contract for --json invocations**（#124849，已关闭）— 统一了 6 个 CLI 命令在 `--json` 模式下的失败输出契约，此前脚本需要兼容 4 种不同的错误 JSON 形状或纯文本 stderr。对自动化运维是实质性改进。
- **fix(agents): keep queued followups from missing post-compaction context**（#124850，已关闭）— 修复队列中的后续轮次在自动压缩后可能丢失工作区后压缩上下文（如启动/安全指令）的问题，关联 #75532。
- **feat(security): require acknowledgement for install policy warnings**（#116489，已关闭）— 外部 `security.installPolicy` 命令现可返回 `warn`，授权操作者可在安装可疑插件/技能前审阅风险并确认。配套 UI PR #120900 也已关闭。
- **fix(test): nested compiler checks time out under parent lock**（#124859，已关闭）— 修复嵌套编译器检查在父进程持有 heavy-check 锁时超时的问题，改善开发者测试体验。

此外，今日有 117 条 PR 被合并/关闭，383 条待合并，说明项目正在快速消化 PR 积压。待合并 PR 中值得关注的有 #124844（修复 Gateway 事件循环阻塞第三次复发）、#124862（v9 状态迁移行级决策报告）、#124865（测试夹具类型化重构 wave 2）。

---

## 4. 社区热点

### 最热 Issue：#121058 — Silent reply failures still recurring（97 条评论，已关闭）

https://github.com/openclaw/openclaw/issues/121058

P1 级消息丢失问题。尽管 #116277 已关闭，静默回复失败仍在发生，监控 cron 持续记录到新出现的事件。97 条评论说明大量用户受此影响，社区对"问题关闭但未真正解决"的模式表达了明显不满。该 Issue 今日被关闭，但关闭原因未在数据中体现，需关注是否真正修复。

### 高讨论量 Issue：#42475 — Per-agent cost budget enforcement（26 条评论）

https://github.com/openclaw/openclaw/issues/42475

用户要求 Gateway 层支持按代理设置每日/每月成本上限，防止失控支出。该 Issue 自 3 月创建至今仍为 OPEN，带有 `needs-product-decision` 标签，说明产品决策尚未落地。评论数高反映了自托管用户对成本可观测性和控制力的迫切需求。

### 高讨论量 Issue：#48003 — Steer mode does not inject messages mid-turn（21 条评论）

https://github.com/openclaw/openclaw/issues/48003

P1 级会话状态问题：`messages.queue.mode: "steer"` 未能在工具边界将用户消息注入正在运行的轮次，而是排队到轮次结束。4 个 👍 表明社区对实时交互体验的期待。

### 值得注意的 PR：#124848 — plain-language verbose progress mode（新开）

https://github.com/openclaw/openclaw/pull/124848

面向非技术用户的"通俗语言"进度模式，将 `check git status (repo)` 这类运维向标签转为更易理解的表述。反映了项目从开发者工具向更广泛用户群体扩展的信号。

---

## 5. Bug 与稳定性

### P1 级（严重，影响消息可靠性/会话状态）

| Issue | 问题 | 状态 |
|-------|------|------|
| [#121058](https://github.com/openclaw/openclaw/issues/121058) | 静默回复失败在 #116277 关闭后仍复发，无排队回复负载 | 已关闭（需验证修复有效性） |
| [#87744](https://github.com/openclaw/openclaw/issues/87744) | Codex 后端 Telegram 轮次反复超时，无法到达 turn/completed | OPEN，需维护者决策 |
| [#96834](https://github.com/openclaw/openclaw/issues/96834) | WhatsApp 1:1 图片消息阻塞主通道约 3 分钟 | OPEN，需维护者决策 |
| [#115908](https://github.com/openclaw/openclaw/issues/115908) | 会话转录投影在持续写入下可活锁，阻塞主线程 | OPEN，有 source-repro |
| [#112423](https://github.com/openclaw/openclaw/issues/112423) | 大型 SQLite 转录清理阻塞 Gateway 事件循环 | OPEN，有 source-repro |
| [#50093](https://github.com/openclaw/openclaw/issues/50093) | WhatsApp 断线重连后错过消息不补发 | OPEN，需维护者决策 |
| [#53408](https://github.com/openclaw/openclaw/issues/53408) | 长对话后 write/exec 工具参数静默丢失 | OPEN，需维护者决策 |
| [#87561](https://github.com/openclaw/openclaw/issues/87561) | 跨渠道最终回退投递语义未定义 | OPEN，需维护者决策 |
| [#92186](https://github.com/openclaw/openclaw/issues/92186) | 前台回复栅栏取消已完成回复的投递（WhatsApp 群） | OPEN，需维护者决策 |
| [#112259](https://github.com/openclaw/openclaw/issues/112259) | 可见入站消息零负载分发无重试/死信/用户可见失败 | OPEN，需维护者决策 |

### P1 级（性能/进程）

| Issue | 问题 | 状态 |
|-------|------|------|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | hook/tool 子进程泄漏，僵尸进程累积 | OPEN，需维护者 review |
| [#100941](https://github.com/openclaw/openclaw/issues/100941) | 并行工具扇出时 Gateway WebSocket 连接被丢弃（1006） | OPEN，需维护者 review |
| [#53540](https://github.com/openclaw/openclaw/issues/53540) | 大参数工具调用生成延迟超过请求超时，报"网络连接丢失" | OPEN，需维护者决策 |

### 已有修复 PR 的 Issue

- **#119869**（Gateway 启动时恢复的 settle wake 过早分发）→ PR [#124803](https://github.com/openclaw/openclaw/pull/124803) 已提交，待验证
- **#75532**（队列后续消息丢失压缩后上下文）→ PR [#124850](https://github.com/openclaw/openclaw/pull/124850) 已合并
- **#124294**（WhatsApp 概率性回复率）→ PR [#124305](https://github.com/openclaw/openclaw/pull/124305) 已提交

### 值得关注的 PR 修复

- **fix(gateway): preserve prepared plugin metadata under load**（[#124844](https://github.com/openclaw/openclaw/pull/124844)）— 针对 Gateway 事件循环阻塞的第三次复发，CPU profile 显示单一主导热点，非 GC 问题。这是对 #115908/#112423 系列问题的持续攻坚。

---

## 6. 功能请求与路线图信号

### 高潜力功能请求（评论多、👍 多、有产品决策标签）

| Issue | 功能 | 信号 |
|-------|------|------|
| [#42475](https://github.com/openclaw/openclaw/issues/42475) | Gateway 级每代理成本预算（日/月上限） | 26 评论，1 👍，`needs-product-decision` |
| [#22438](https://github.com/openclaw/openclaw/issues/22438) | 分层引导文件加载，按需加载节省上下文 | 19 评论，`needs-product-decision` |
| [#67413](https://github.com/openclaw/openclaw/issues/67413) | 每代理 dreaming 配置（避免内存峰值/OOM） | 9 评论，5 👍 |
| [#6757](https://github.com/openclaw/openclaw/issues/6757) | 代理自主触发上下文压缩（self-compact 工具） | 9 评论，2 👍 |
| [#45508](https://github.com/openclaw/openclaw/issues/45508) | WebChat 自托管 STT/TTS 支持 | 8 评论，2 👍 |
| [#28300](https://github.com/openclaw/openclaw/issues/28300) | 主题定制系统（预设 + 自定义主题工作室） | 6 评论，5 👍 |

### 路线图信号

- **成本控制**成为明确主题：#42475（预算上限）、#67413（dreaming 配置）均指向用户对资源消耗的可控性需求。
- **上下文管理**持续是痛点：#22438（分层加载）、#6757（自主压缩）、#95553（预算触发压缩硬编码 60s）表明上下文窗口管理是自托管用户的核心诉求。
- **渠道可靠性**：#50093（WhatsApp 回填）、#87561（最终回退投递语义）说明多渠道消息投递的端到端可靠性是 P1 级关注点。
- **UI 现代化**：#124848（通俗语言进度模式）、#124301（多行 composer）、#123356（斜杠命令参数暂存）显示 Web UI 正在从开发者工具向更友好的交互形态演进。

---

## 7. 用户反馈摘要

### 核心痛点

1. **消息丢失是最强烈的负面反馈**：#121058 的 97 条评论中，用户反复报告"问题关闭了但还在发生"，对修复流程的信任度受到影响。#92186 中用户指出"回复在 dashboard 可见但从未投递到 WhatsApp"，这种"假成功"状态比显式失败更令人困扰。

2. **事件循环阻塞影响多租户场景**：#115908 和 #112423 的评论中，用户描述了"所有通道传输停滞数十秒"的严重场景，对生产环境可用性构成直接威胁。

3. **配置项被静默拒绝**：多个 PR（#117287、#118157、#119356）指出 Feishu、Mattermost、IRC 等渠道的配置 schema 拒绝了运行时实际读取的键，用户设置了文档中的配置却收到"拒绝整个配置"的错误。这类问题虽非 P1，但严重损害配置体验。

4. **Windows 平台回归**：#74378（CLI 进程残留）、#105528（exec/read 工具空输出）表明 Windows 平台的稳定性存在持续问题。

### 积极反馈

- 安全方向的进展获得认可：#116489 和 #120900 的安装策略警告确认机制，回应了用户对插件供应链安全的担忧。
- 测试基础设施改进（#124859、#124865）虽不直接面向用户，但社区对 CI 稳定性的关注度在提升。

---

## 8. 待处理积压

### 长期未响应的 P1 级 Issue（创建超 3 个月，仍 OPEN）

| Issue | 创建时间 | 问题 | 标签 |
|-------|---------|------|------|
| [#48003](https://github.com/openclaw/openclaw/issues/48003) | 2026-03-16 | Steer 模式无法中途注入消息 | `needs-maintainer-review` |
| [#42475](https://github.com/openclaw/openclaw/issues/42475) | 2026-03-10 | 每代理成本预算 | `needs-product-decision` |
| [#50093](https://github.com/openclaw/openclaw/issues/50093) | 2026-03-19 | WhatsApp 断线消息回填 | `needs-maintainer-review` |
| [#53408](https://github.com/openclaw/openclaw/issues/53408) | 2026-03-24 | 长对话工具参数静默丢失 | `needs-maintainer-review` |
| [#45494](https://github.com/openclaw/openclaw/issues/45494) | 2026-03-13 | Cron 任务在 LLM 故障时耗尽超时窗口 | `needs-maintainer-review` |

### 需维护者关注

- **#121058 的关闭决定**：该 Issue 今日被关闭，但 97 条评论中大量用户报告问题仍在发生。建议维护者发布关闭说明，明确修复 commit 或验证方法，避免社区信任进一步流失。
- **#42475 的产品决策**：成本预算是多用户明确诉求（26 评论），且与 #67413（dreaming 配置）形成"资源控制"主题。建议产品团队评估纳入近期路线图。
- **#115908 / #112423 的事件循环阻塞系列**：PR #124844 正在修复第三次复发，但该问题已影响生产环境数月。建议考虑成立专项组系统性解决 Gateway 主线程阻塞问题，而非逐个 hotspot 打补丁。

---

*本日报由 AI 分析师基于 OpenClaw GitHub 公开数据自动生成，数据截至 2026-08-17。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：** 2026-08-17
**数据窗口：** 过去 24 小时


## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态呈现 **"头部高吞吐迭代、中部架构演进、尾部安全补课"** 的三层格局。以 OpenClaw（500 Issue / 500 PR）和 Hermes Agent（425 Issue / 500 PR）为代表的第一梯队处于极高强度的功能迭代与缺陷修复并行期，但 P1 级稳定性问题（消息丢失、事件循环阻塞）的持续积压表明规模扩张已开始反噬质量；Zeroclaw 等第二梯队正通过密集的 RFC 评审推进架构级转型（协议无关运行时、统一附件架构）；PicoClaw、QwenPaw、AstrBot 等第三梯队则分别聚焦安全加固、社区贡献吸纳与配置体验打磨。跨项目来看，**成本控制、上下文管理、安全加固、多通道可靠性**是生态共同的核心痛点，而 **"从开发者工具走向普通用户"** 的 UI 现代化信号已在多个项目中浮现。


## 2. 各项目活跃度对比

| 项目 | Issues（新开/活跃） | PRs（待合并） | Releases | 合并/关闭 | 健康度评估 |
|------|-------------------|--------------|----------|----------|-----------|
| **OpenClaw** | 500（467 活跃 / 33 关闭） | 500（383 待合并） | 1（性能分析包） | 117 合并/关闭 | 中等偏上：高吞吐但 P1 积压较多，消息丢失类问题反复 |
| **Hermes Agent** | 425（279 活跃 / 146 关闭） | 500（414 待合并） | 1（v0.20.2 补丁版） | 86 合并/关闭 | 高：核心缺陷修复效率好，大型 Epic 收官，但 PR 积压明显 |
| **Zeroclaw** | 50（48 活跃 / 2 关闭） | 50（46 待合并） | 0 | 4 合并/关闭 | 良好：RFC 驱动架构演进，合并速度略低于提交速度 |
| **QwenPaw** | 9（7 活跃 / 2 关闭） | 9（9 待合并） | 0 | 0 合并 | 活跃但合并滞后：7/9 PR 来自首次贡献者，需及时响应 |
| **AstrBot** | 7（4 活跃 / 3 关闭） | 10（8 待合并） | 0 | 2 合并（分支同步） | 稳定：功能迭代与缺陷修复并行，无重大稳定性问题 |
| **PicoClaw** | 2（2 活跃 / 0 关闭） | 5（4 待合并） | 0 | 1 关闭（stale） | 中等：安全修复集中提交但审查停滞，功能请求长期无响应 |

**规模梯度：** OpenClaw / Hermes Agent 处于 **日均数百级** 更新量级；Zeroclaw 处于 **数十级**；QwenPaw / AstrBot / PicoClaw 处于 **个位数到十位数**。


## 3. OpenClaw 在生态中的定位

**生态地位：** OpenClaw 是当前个人 AI 助手赛道中 **Issue/PR 吞吐量最高、社区讨论最活跃** 的项目，其单日 500 条 Issue 更新的量级约为第二梯队（Zeroclaw）的 10 倍，社区规模优势显著。

**核心优势：**
- **多通道覆盖广度**：WhatsApp、Telegram、Feishu、Mattermost、IRC、WebChat 等渠道的深度集成，使其成为事实上的"多渠道消息网关"参照实现
- **配置灵活性与安全机制**：`security.installPolicy` 警告确认机制（#116489）等安全设计领先于同类项目
- **性能归因能力**：通过 CPU profile 归档（pr-124528-profiles）系统性定位 Gateway 事件循环阻塞，体现了成熟的性能工程方法

**技术路线差异：**
- 与 **Zeroclaw**（追求协议无关的运行时核心、Chat Completions 兼容层）相比，OpenClaw 更偏向 **"渠道优先"** 的实用主义路线，深度绑定各 IM 平台的原生能力
- 与 **Hermes Agent**（桌面端优先、多租户架构）相比，OpenClaw 更侧重 **"自托管服务端"** 形态，桌面端并非核心场景
- 与 **PicoClaw**（轻量级、嵌入式场景）相比，OpenClaw 功能完整度更高，但资源消耗与部署复杂度也更高

**潜在风险：** P1 级消息丢失问题（#121058 达 97 条评论）反复出现且关闭后仍复发，已开始侵蚀社区信任；事件循环阻塞系列问题（#115908/#112423）影响生产环境数月，第三次复发（#124844）表明需要系统性解决方案而非逐个打补丁。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|---------|---------|
| **成本控制与 Token 优化** | OpenClaw（#42475 每代理成本预算、#67413 dreaming 配置）、Hermes（#6839 Lazy Tool Schema 两段式注入，👍18）、QwenPaw（#7003 ViBo 记忆方案 97.5% token 削减） | 用户对 Token 消耗高度敏感，要求按代理/会话级精细化控制成本，本地模型场景尤甚 |
| **上下文管理与压缩策略** | OpenClaw（#22438 分层引导加载、#6757 自主压缩、#95553 压缩硬编码）、Hermes（#8457 持久化会话记忆）、QwenPaw（#7065 多轮历史丢失） | 长会话场景下上下文窗口管理是核心痛点，压缩后上下文丢失、历史不可见等问题频发 |
| **安全加固** | PicoClaw（#3322-#3324 SSRF 三连修复）、Zeroclaw（#9580 HTTP egress 加固、#9745 知识图谱数据隔离）、Hermes（#82936 默认 profile 密钥泄漏）、OpenClaw（#116489 安装策略警告） | 媒体下载 SSRF、多租户数据隔离、密钥泄漏是当前安全焦点，供应链安全机制开始普及 |
| **多通道消息可靠性** | OpenClaw（#50093 WhatsApp 回填、#87561 回退投递语义、#92186 前台回复栅栏）、Zeroclaw（#9811 /health 误报）、Hermes（#83683 桌面重启吞网关） | 消息投递的端到端可靠性（不丢失、不重复、状态可观测）是自托管用户的核心诉求 |
| **多 Agent 编排与协作** | Zeroclaw（#10025 临时 agent swarm + TUI）、QwenPaw（#7072 后台任务列表 API）、Hermes（#34352 多租户方案） | 从单 Agent 向多 Agent 协作演进，需要任务编排、会话隔离、成本分摊等基础设施 |
| **UI/UX 现代化** | OpenClaw（#124848 通俗语言进度模式、#124301 多行 composer）、AstrBot（#9708 插件列表自定义布局、#9709 拖拽切换）、PicoClaw（#3325 Telegram 原生表格） | 从开发者工具向普通用户扩展，降低使用门槛，提升交互体验 |


## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent | Zeroclaw | QwenPaw | AstrBot | PicoClaw |
|------|----------|--------------|----------|---------|---------|----------|
| **功能侧重** | 多渠道消息网关 + 全功能 Agent | 桌面端优先 + 多租户 + 企业级 | 协议无关运行时 + 架构标准化 | Qwen 生态 + 多 Agent 协调 | 中文社区 + 插件生态 + 轻量部署 | 嵌入式/轻量级 + 多通道 |
| **目标用户** | 自托管高级用户、开发者 | 桌面端重度用户、企业多租户 | 架构敏感型开发者、生态集成方 | Qwen 模型用户、企业 B 端 | 中文用户、插件爱好者 | 资源受限环境、极简部署 |
| **技术架构** | 单体仓库 + Gateway 事件循环 + 渠道适配器 | 桌面应用 + messaging gateway + 多 profile | 运行时核心 + 传输适配层 + RFC 驱动 | Python + provider 抽象层 + 插件 API | Python + provider 抽象 + WebUI 配置 | Go（推断）+ 轻量通道适配 |
| **社区规模** | 极大（500 Issue/日） | 极大（425 Issue/日） | 中（50 Issue/日） | 小（9 Issue/日） | 小（7 Issue/日） | 小（2 Issue/日） |
| **当前阶段** | 高吞吐迭代 + P1 积压 | 高吞吐迭代 + 架构治理收官 | 架构转型期（RFC 密集评审） | 社区贡献吸纳期 | 稳定功能迭代 | 安全补课期 |
| **核心风险** | P1 稳定性问题反复 | PR 积压 414 条 | 合并速度低于提交速度 | 合并节奏过慢（0 合并/日） | 配置同步缺陷 | 维护者响应严重滞后 |


## 6. 社区热度与成熟度

**第一梯队（日均数百级更新）— 快速迭代期：**
- **OpenClaw**：社区规模最大，但 P1 问题积压与"关闭未修复"模式引发信任危机。处于 **"规模扩张 vs 质量巩固"** 的博弈期。
- **Hermes Agent**：修复效率较高（146 Issue 关闭），大型 Epic 收官显示架构治理能力。处于 **"高活跃 + 质量改善"** 的良性循环，但 414 条待合并 PR 是隐患。

**第二梯队（日均数十级更新）— 架构演进期：**
- **Zeroclaw**：RFC 驱动的开发模式体现了较强的治理成熟度，社区讨论质量高（架构级议题为主）。处于 **"设计驱动开发"** 阶段，合并速度需跟上。

**第三梯队（日均个位数更新）— 质量巩固/功能迭代期：**
- **QwenPaw**：首次贡献者占比高（7/9 PR），社区参与度上升但合并响应慢，需警惕贡献者流失。
- **AstrBot**：社区反馈活跃但问题集中在配置体验细节，项目处于 **"稳定打磨"** 阶段。
- **PicoClaw**：安全修复 PR 等待 8 天无审查，功能请求全部 stale，维护者响应是最大瓶颈。处于 **"低活跃 + 安全补课"** 阶段。


## 7. 值得关注的趋势信号

**① 成本治理成为自托管 Agent 的刚需**
OpenClaw（#42475 预算上限）、Hermes（#6839 Token 优化，👍18）、QwenPaw（#7003 记忆压缩）三个独立项目同时涌现成本控制诉求，且均未得到官方及时响应。**信号：** 随着 LLM API 调用成为自托管 Agent 的主要运营成本，"成本可观测 + 精细化管控"将成为下一阶段的基础能力，而非可选项。

**② 安全左移：从"功能安全"到"供应链安全"**
PicoClaw 的 SSRF 三连修复、Zeroclaw 的网络出口加固、OpenClaw 的安装策略警告确认机制，共同指向 **"插件/渠道/媒体下载链路的供应链安全"**。**信号：** 随着 Agent 生态的插件化程度加深，对不可信输入（恶意 URL、可疑插件）的默认拒绝将成为标配。

**③ 架构演进：从"渠道绑定"到"协议无关"**
Zeroclaw 的 Chat Completions 兼容层 RFC（#8603）和运行时拥有会话架构（#9487）代表了 **"核心运行时与传输层解耦"** 的演进方向。**信号：** 未来 Agent 项目的竞争将从"支持多少渠道"转向"支持多少协议生态"（Open WebUI、LobeChat、Continue.dev 等），协议兼容层将成为生态入口。

**④ 多 Agent 编排从概念走向实用**
Zeroclaw 的 swarm 提案（#10025）、QwenPaw 的后台任务列表 API（#7072）、Hermes 的多租户方案（#34352）表明，**多 Agent 协作已从实验性功能变为用户明确诉求**，且社区已出现"生产级方案等待官方采纳"的局面（Hermes #34352 存在 fork 风险）。**信号：** 谁能率先提供开箱即用的多 Agent 编排体验（含成本分摊、会话隔离、任务可视化），谁就能占据下一轮竞争高地。

**⑤ 桌面端与移动端体验成为留存关键**
Hermes 的 Windows 更新连环故障（#63717）、桌面重启吞网关（#83683）、OpenClaw 的通俗语言进度模式（#124848）表明，**Agent 项目正在从"服务端工具"向"终端用户产品"过渡**，桌面端稳定性与 UI 友好度将直接影响用户留存。

**⑥ 配置可观测性：隐蔽的信任杀手**
AstrBot 的"已删除模型仍显示"（#9711，用户重复提交 3 次）、"隐藏 timezone 覆盖全局"（#9706）、OpenClaw 的"配置 schema 拒绝运行时实际读取的键"（#117287 等）共同指向 **配置系统的透明性与一致性缺陷**。**信号：** 配置项被静默接受/拒绝、UI 与持久化不同步，这类"非致命但持续消耗信任"的问题，值得所有 Agent 项目在架构设计阶段就建立配置 schema 与运行时读取的强一致性校验。


**结论建议：** 对于技术决策者，当前生态的 **成本控制、安全加固、多 Agent 编排** 三个方向存在明确的工具缺口，且头部项目响应滞后，是创业/贡献的窗口期；对于开发者，选择项目时需权衡 OpenClaw/Hermes 的 **功能丰富度与稳定性风险**，以及 PicoClaw/QwenPaw 的 **轻量与响应速度**。对于维护者，OpenClaw 的"关闭未修复"信任危机和 PicoClaw 的"安全 PR 无人审查"是两种典型的社区治理警示。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-17

## 1. 今日速览

过去24小时内，Zeroclaw 项目保持高活跃度：共产生 50 条 Issue 更新（48 条新开/活跃，2 条关闭）和 50 条 PR 更新（46 条待合并，4 条已合并/关闭），无新版本发布。当前项目正处于密集的 RFC 评审与架构决策期，多个高优先级 RFC（如 Chat Completions 协议支持、统一附件架构、运行时会话管理等）正在持续迭代讨论中，同时有 3 个 P1 级 Bug 处于已接受状态（其中 2 个已有对应修复 PR）。整体来看，项目健康度良好，社区讨论活跃，但 PR 合并速度略低于新提交速度，存在一定的积压压力。

## 2. 版本发布

过去 24 小时内无新版本发布。

## 3. 项目进展

今日共有 4 个 PR 被合并/关闭，其中值得关注的有：

- **[#9580 fix(security): harden built-in HTTP egress on the shared network guard](https://github.com/zeroclaw-labs/zeroclaw/pull/9580)**（已关闭，P1，XL）：由 @JordanTheJet 提交的安全加固 PR，强化了内置 HTTP 出口边界，并将网络分类原语移入 `zeroclaw-infra::net_guard` 供插件出口复用。该 PR 拒绝所有审计过的非全局 IPv4/IPv6 地址，是项目安全架构的重要一步。
- **[#9416 docs(tools): document that AllToolsResult.tools is the pre-filter registry](https://github.com/zeroclaw-labs/zeroclaw/pull/9416)**（已合并，XS）：补充了 `AllToolsResult.tools` 字段的文档说明，澄清其与 `unfiltered_tool_arcs` 的语义差异，属于小型文档改进。
- **[#10010 test(cron): avoid ETXTBSY race in custom shell test](https://github.com/zeroclaw-labs/zeroclaw/pull/10010)**（已合并，XS）：修复了 cron 自定义 shell 测试中的 ETXTBSY 竞态问题，将运行时写入的可执行脚本替换为指向 PATH 中 `sh` 的符号链接，提升了并行测试稳定性。

此外，Issue [#9953](https://github.com/zeroclaw-labs/zeroclaw/issues/9953)（SOP step schema 验证拒绝双重编码输出对象）已关闭，表明该 Bug 已得到解决。

## 4. 社区热点

今日讨论最活跃的 Issues 集中在架构级 RFC 上，反映了社区对以下方向的高度关注：

- **[#6808 RFC: Work Lanes, Board Automation, and Label Cleanup](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)**（23 条评论）：治理类 RFC，讨论工作流路由、看板自动化和标签清理。已进入"已批准/推广中"状态，修订至第 25 版，是当前最受关注的项目治理议题。
- **[#8603 RFC: ZeroClaw Chat Completions profile](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)**（22 条评论）：提议为 ZeroClaw 增加 OpenAI Chat Completions 协议兼容层，使 Open WebUI、LobeChat、Continue.dev、Aider、LangChain 等生态工具可直接接入。该 RFC 若落地将显著扩大项目的生态兼容性。
- **[#9488 RFC: Unified attachment architecture for web chat and channels](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)**（17 条评论）：由 @NiuBlibing 提出的统一附件架构方案，旨在统一 Web 聊天与各渠道的附件处理方式，涉及安全与网关层设计。
- **[#9487 RFC: Runtime-owned conversation sessions and transport surface adapters](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)**（17 条评论）：与 #9488 配套的会话管理 RFC，提出运行时拥有会话生命周期、各入口统一提交 `InboundAction` 的架构调整。

这些 RFC 的共同诉求是：**将 ZeroClaw 从"多渠道 WebSocket/Webhook 绑定"的架构，演进为更通用、协议无关的运行时核心**，以支持更广泛的客户端生态和更灵活的信道接入。

## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列如下：

**P1（高优先级）**

- **[#9965 runtime-written executable test fixtures hit ETXTBSY under the parallel runtime gate](https://github.com/zeroclaw-labs/zeroclaw/issues/9965)**（已接受，6 条评论）：并行运行时测试门禁下，测试写入的可执行脚本触发 ETXTBSY 错误。已有对应修复 PR [#10010](https://github.com/zeroclaw-labs/zeroclaw/pull/10010) 已合并。
- **[#10013 Edge TTS cancellation test can miss fake child startup under parallel load](https://github.com/zeroclaw-labs/zeroclaw/issues/10013)**（已接受，3 条评论）：Edge TTS 取消测试在并行负载下可能漏检假子进程启动，导致 `Parallel Runtime Test` 间歇性失败。
- **[#9655 approval cards carry no position, so back-to-back cards from one message are indistinguishable before tapping](https://github.com/zeroclaw-labs/zeroclaw/issues/9655)**（已接受，3 条评论）：审批卡片不携带位置信息，单条消息触发的多个连续审批卡片在点击前无法区分。影响 Telegram 渠道的操作体验。
- **[#9811 /health reports a channel healthy that has never connected](https://github.com/zeroclaw-labs/zeroclaw/issues/9811)**（已接受，2 条评论）：Telegram 渠道配置无效 token 时，`/health` 仍报告渠道健康，误导运维判断。

**P2（中优先级）**

- **[#10020 Agentic independent delegates ignore the target thinking policy](https://github.com/zeroclaw-labs/zeroclaw/issues/10020)**（进行中，1 条评论）：独立模式的 agentic delegate 调用未应用目标 agent 的 thinking 配置。
- **[#10037 POST /api/cron silently stores invalid session_target as isolated](https://github.com/zeroclaw-labs/zeroclaw/issues/10037)**（进行中，1 条评论）：API 接受非法 `session_target` 值并静默降级为 `isolated`，与 `cron_add` 工具的行为不一致。

**已关闭**

- **[#9953 SOP step schema validation rejects a double-encoded output object instead of unwrapping it](https://github.com/zeroclaw-labs/zeroclaw/issues/9953)**：已关闭，表明已修复。

## 6. 功能请求与路线图信号

今日值得关注的新功能请求与路线图信号：

- **[#10025 RFC: zeroclaw swarm — ephemeral agent swarms with a crush-style TUI](https://github.com/zeroclaw-labs/zeroclaw/issues/10025)**（新开，1 条评论）：提议为 ZeroClaw 增加临时 agent 集群（swarm）能力，配备类似 crush 的 TUI。该提案直指当前配置繁琐的痛点——搭建多 agent 协作需要大量静态配置且缺乏编排器。若被接受，将是项目能力边界的重大扩展。
- **[#8780 RFC: Realtime speech-to-speech channel for Gemini Live](https://github.com/zeroclaw-labs/zeroclaw/issues/8780)**（13 条评论）：已修订至 v2，改为 broker 合约设计，为实时语音对话通道铺路。
- **[#6998 Schema-validated memory consolidation with bounded fallback](https://github.com/zeroclaw-labs/zeroclaw/issues/6998)**（已接受，5 条评论）：改进记忆整合的 JSON 解析可靠性，通过 schema 验证替代脆弱的文本解析。
- **[#7887 Add date-range conditional schedules for cron jobs](https://github.com/zeroclaw-labs/zeroclaw/issues/7887)**（已接受，P3）：为 cron 任务增加日期范围条件调度能力。

结合现有 PR 判断，**Chat Completions 协议兼容（#8603）** 和 **统一附件架构（#9488/#9487）** 最有可能进入下一版本规划；**swarm 能力（#10025）** 虽刚提出，但回应了社区对多 agent 编排的明确需求，值得关注。

## 7. 用户反馈摘要

从今日 Issues 评论中提炼的用户反馈：

- **审批流程体验问题**（[#9655](https://github.com/zeroclaw-labs/zeroclaw/issues/9655)）：用户 @ZiBibro 反馈，Telegram 渠道中单条消息触发多个工具调用时，生成的多个审批卡片无法区分先后顺序，操作员在点击前无法判断哪个卡片对应哪个调用。这是实际使用中影响效率的痛点。
- **健康检查误导**（[#9811](https://github.com/zeroclaw-labs/zeroclaw/issues/9811)）：用户 @bryankwandou 报告，配置错误的 Telegram bot token 后，`/health` 仍报告渠道健康，导致运维无法及时发现渠道失效。
- **API 行为不一致**（[#10037](https://github.com/zeroclaw-labs/zeroclaw/issues/10037)）：用户 @zyw02 指出，`POST /api/cron` 对非法 `session_target` 静默接受并降级，而 `cron_add` 工具会明确拒绝，API 与 CLI 行为不一致增加了使用困惑。
- **代理策略未生效**（[#10020](https://github.com/zeroclaw-labs/zeroclaw/issues/10020)）：用户 @vrurg 反馈，独立模式的 delegate 调用未应用目标 agent 的 thinking 配置，导致子代理行为与配置不符。

整体来看，用户反馈集中在**实际使用中的行为一致性与可观测性**问题上，而非功能缺失，说明项目核心功能已基本满足需求，当前重点在于打磨细节和提升运维体验。

## 8. 待处理积压

以下 Issue/PR 长期未获响应或处于等待作者操作状态，建议维护者关注：

- **[#9853 chore(workspace): remove aardvark-sys and zeroclaw-robot-kit](https://github.com/zeroclaw-labs/zeroclaw/pull/9853)**（P2，needs-author-action，8 天未更新）：移除两个阻碍 crates.io 发布的依赖，对发布流程有直接影响。
- **[#9002 fix(gateway): keep agent turns alive after viewer disconnect](https://github.com/zeroclaw-labs/zeroclaw/pull/9002)**（P1，needs-author-action，XL）：修复 WebSocket 断开导致 agent 任务被取消的问题，涉及核心网关行为，影响面较大。
- **[#9109 feat(providers): add native Hailo-Ollama support](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)**（needs-author-action，XL）：新增 Hailo-Ollama 原生支持，扩展硬件生态。
- **[#9212 feat(eval): gate CI on the replay regression suite](https://github.com/zeroclaw-labs/zeroclaw/pull/9212)**（needs-author-action）：将回归测试套件设为 CI 硬性门禁，对质量保障有重要意义。
- **[#9745 fix(memory): add per-agent attribution and scoping to the knowledge graph](https://github.com/zeroclaw-labs/zeroclaw/pull/9745)**（needs-author-action，XL，安全相关）：修复知识图谱中 agent 间数据隔离缺失的安全问题。
- **[#9854 fix(providers): derive context-window discovery from the family registry](https://github.com/zeroclaw-labs/zeroclaw/pull/9854)**（needs-author-action，XL）：消除硬编码的 provider 列表，改为从家族注册表派生。
- **[#9241 feat(channels): add Microsoft Teams (Bot Framework) channel](https://github.com/zeroclaw-labs/zeroclaw/pull/9241)**（needs-author-action，XL）：新增 Teams 渠道支持，扩展企业级通信能力。
- **[#9447 fix(anthropic): classify incomplete terminal responses](https://github.com/zeroclaw-labs/zeroclaw/pull/9447)**（P1，needs-author-action，XL）：修复 Anthropic 终端响应分类问题，依赖 #9424。

此外，多个长期未合并的 RFC（如 [#6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165)、[#6954](https://github.com/zeroclaw-labs/zeroclaw/issues/6954)、[#6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971)）已进入 `no-stale` 状态，建议维护者安排评审，避免设计决策长期悬置。

---

**报告生成时间**：2026-08-17 | **数据来源**：github.com/zeroclaw-labs/zeroclaw | **统计窗口**：过去 24 小时

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-17

## 今日速览

过去24小时内，PicoClaw 项目保持中等活跃度：新增/活跃 Issue 2 条，PR 更新 5 条（其中 4 条待合并，1 条已关闭）。当前无新版本发布。值得关注的是，安全加固类 PR（SSRF 防护）占据 PR 流水的 3/5，且均处于待合并状态，表明项目正在系统性地修复跨渠道的媒体下载安全漏洞。社区侧，OAuth 2.1 支持和 Telegram 富文本表格渲染是两个主要讨论点，均带有 stale 标记，说明长期未获得维护者明确回应。整体来看，项目处于"安全修复集中提交、功能请求等待响应"的阶段。

---

## 版本发布

无新版本发布。

---

## 项目进展

今日无新合并的 PR。唯一关闭的 PR 为 **#3193 "Added simplex channel type"**（[链接](https://github.com/sipeed/picoclaw/pull/3193)），该 PR 自 2026-06-27 创建，历时约 7 周后于 2026-08-16 关闭，状态为 stale。该 PR 旨在新增 Simplex 聊天通道类型，属于新功能扩展，但最终未合并，可能因长期未更新或维护者未回应而自动关闭。

**项目整体推进评估：** 核心进展集中在 4 个待合并 PR 上，尤其是 @SashaMIT 提交的 3 个安全修复 PR（#3322、#3323、#3324），它们共同解决了一个系统性问题——各渠道媒体下载过程中的 SSRF 漏洞。若这些 PR 被合并，将显著提升项目在不可信网络环境下的安全性。

---

## 社区热点

### 1. Issue #3302 — 支持 OAuth 2.1 for MCP servers（评论 3 条）
[链接](https://github.com/sipeed/picoclaw/issues/3302)

该 Issue 由 @sunboy0523 于 2026-07-30 创建，引用 #2546 作为背景，请求为 MCP 服务器支持 OAuth 2.1 认证。这是今日评论数最多的 Issue（3 条），但 👍 数为 0，且已带 stale 标记。**诉求分析：** 用户希望 PicoClaw 在 MCP（Model Context Protocol）集成中支持更现代的 OAuth 2.1 标准，这反映了开发者对 MCP 服务器安全认证的持续关注。由于该 Issue 已存在 18 天且无维护者回应，社区可能对响应速度有所不满。

### 2. Issue #3325 — Telegram 表格富文本渲染（评论 1 条）
[链接](https://github.com/sipeed/picoclaw/issues/3325)

@As-tsaqib 于 2026-08-09 提出，当前 Telegram 回复使用 `sendMessage` 的 HTML/MarkdownV2 格式，结构化 Markdown 表格会退化为纯文本或等宽代码块，无法利用 Telegram Bot API 10.1 引入的原生表格 UI。**诉求分析：** 用户期望更丰富的消息展示效果，属于体验优化类需求。该 Issue 同样带有 stale 标记。

---

## Bug 与稳定性

今日无新报告的 Bug 或崩溃类 Issue。但以下 3 个待合并 PR 均针对安全漏洞（SSRF），按严重程度排列：

| 严重程度 | PR | 问题描述 | 修复方案 | 状态 |
|---------|-----|---------|---------|------|
| **高** | [#3322](https://github.com/sipeed/picoclaw/pull/3322) | QQ / Telegram / Discord / LINE / Slack 入站附件下载未使用 `BlockPrivateTargets`，恶意媒体 URL 可访问 loopback、link-local 或 RFC1918 内网地址 | 在 `utils.DownloadFile` 中启用 SSRF 加固（安全拨号 + 重定向复检） | 待合并 |
| **高** | [#3323](https://github.com/sipeed/picoclaw/pull/3323) | WeCom 的 `mediaClient` 使用普通 `http.Client`，入站 `storeRemoteMedia` 和出站 `downloadRemoteMediaToTemp` 可能被重定向到内网 | 改用 `utils.CreateSafeHTTPClient` + `ValidateSafeHTTPURL` | 待合并 |
| **高** | [#3324](https://github.com/sipeed/picoclaw/pull/3324) | Weixin CDN/远程媒体使用普通 iLink `api.HttpClient`，重定向可触达 loopback/私有主机 | 新增专用 `mediaClient`，使用安全 HTTP 客户端 + URL 校验 | 待合并 |

**分析：** 这三个 PR 由同一作者 @SashaMIT 提交，且 #3323 和 #3324 互为 sibling PR，说明这是一次有计划的跨渠道安全加固行动。目前均无维护者评论或合并动作，建议优先审查。

---

## 功能请求与路线图信号

### 活跃功能请求

1. **OAuth 2.1 支持 for MCP servers**（[#3302](https://github.com/sipeed/picoclaw/issues/3302)）
   - 类型：Nice-to-Have / Enhancement
   - 状态：stale，无维护者回应
   - 路线图信号：与 #2546 关联，说明 MCP 认证是用户持续关注的方向，但优先级可能不高

2. **Telegram 原生表格渲染**（[#3325](https://github.com/sipeed/picoclaw/issues/3325)）
   - 类型：体验优化
   - 状态：stale，无维护者回应
   - 路线图信号：Telegram Bot API 10.1 的新能力跟进，属于平台适配类需求

### 待合并 PR 中的新功能

- **#3299 "Add native Exa web search provider"**（[链接](https://github.com/sipeed/picoclaw/pull/3299)）：新增 Exa 作为原生 `tools.web` / `web_search` 提供方，支持 `d`/`w`/`m`/`y` 时间范围过滤。该 PR 自 2026-07-26 创建，已存在 3 周，若合并将扩展 PicoClaw 的搜索能力。

**路线图判断：** 安全修复 PR（#3322-#3324）大概率会优先合并；Exa 搜索 PR 属于功能增强，可能进入下一版本；两个 Feature Issue 目前缺乏维护者互动，短期内纳入路线图的可能性较低。

---

## 用户反馈摘要

由于今日数据中未包含 Issue 评论的具体内容，以下基于 Issue 摘要和状态推断：

- **痛点 1：MCP 认证标准滞后**（#3302）— 用户明确要求支持 OAuth 2.1，说明现有认证方式（可能是 API Key 或 OAuth 2.0）已无法满足部分用户的安全或互操作需求。引用 #2546 表明这不是孤立诉求。
- **痛点 2：Telegram 消息展示能力不足**（#3325）— 用户对 Markdown 表格降级为纯文本/代码块不满意，期望利用 Telegram 新 API 能力获得原生表格 UI，属于对"消息呈现质量"的追求。
- **潜在不满：响应速度** — 两个 Issue 均被标记为 stale，且 PR #3299 和 #3193 也长期无维护者互动，可能暗示维护者响应周期较长，社区存在等待焦虑。

---

## 待处理积压

### 长期未响应的重要 Issue

| Issue | 创建时间 | 停滞天数 | 重要性 | 说明 |
|-------|---------|---------|--------|------|
| [#3302](https://github.com/sipeed/picoclaw/issues/3302) OAuth 2.1 for MCP | 2026-07-30 | 18 天 | 中 | 有 3 条评论但无维护者回应，已 stale |
| [#3325](https://github.com/sipeed/picoclaw/issues/3325) Telegram 表格渲染 | 2026-08-09 | 8 天 | 低 | 1 条评论，已 stale |

### 长期未合并的 PR

| PR | 创建时间 | 停滞天数 | 重要性 | 说明 |
|----|---------|---------|--------|------|
| [#3299](https://github.com/sipeed/picoclaw/pull/3299) Exa 搜索提供方 | 2026-07-26 | 22 天 | 中 | 新功能，无维护者评论 |
| [#3322](https://github.com/sipeed/picoclaw/pull/3322) SSRF 加固（多通道） | 2026-08-09 | 8 天 | **高** | 安全修复，建议优先审查 |
| [#3323](https://github.com/sipeed/picoclaw/pull/3323) WeCom 安全客户端 | 2026-08-09 | 8 天 | **高** | 安全修复，与 #3324 联动 |
| [#3324](https://github.com/sipeed/picoclaw/pull/3324) Weixin 安全客户端 | 2026-08-09 | 8 天 | **高** | 安全修复，与 #3323 联动 |

**维护者提醒：** 3 个 SSRF 安全修复 PR 已等待 8 天且无任何维护者互动，考虑到其安全影响，建议尽快安排 code review。同时，#3299（Exa 搜索）已停滞 22 天，若项目仍计划支持该功能，应明确回应作者。

---

*本日报由 AI 自动生成，数据截至 2026-08-17。所有链接均指向 GitHub 原始内容。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-17

## 今日速览

过去24小时项目活跃度较高：共产生9条Issue更新（7条活跃、2条关闭）和9条PR提交（全部待合并），无新版本发布。值得关注的是，9条PR中有7条来自首次贡献者（first-time-contributor），涵盖视频处理、OAuth2令牌持久化、Cron CLI同步、控制台路由等多个修复方向，社区参与度显著提升。与此同时，一个严重的工具调用崩溃问题（#7063）被报告，涉及`async for`对coroutine的错误遍历，需要维护者优先响应。整体来看，项目处于功能迭代与社区贡献涌入的活跃期，但合并节奏偏慢（今日0合并），需关注积压PR的处理效率。

## 版本发布

今日无新版本发布。

## 项目进展

今日无PR被合并或关闭，9个PR均处于待合并状态。不过从PR内容可看出项目正在多个方向推进：

- **Provider 体系重构**（#6302）：由 @wangfei010313 提交的大型PR，统一了provider发现、模型元数据、模型路由和agent模型控制，引入目录驱动的provider模型系统、运行时模型发现、能力感知路由和fallback支持。该PR自7月21日创建，已近一个月，是当前最重要的待合并项。
- **DataPaw 原生应用运行时**（#6940）：@cyruszhang 提交，为项目增加原生DataPaw应用运行时和持久化分析工作区，已标记`ready-for-human-review`，等待维护者审查。
- **后台任务列表API**（#7072）：实现#7056提案的最小部分，为多agent协调场景提供任务状态列表查询能力。
- **控制台深链路由**（#7067）：新增`/chat/:agentId/:sessionId`路由，修复多agent场景下URL深链无法定位正确会话的问题。

## 社区热点

今日讨论最活跃的Issue是 **#7003「Memory for QwenPaw agents — 97.5% fewer tokens (ViBo)」**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/7003)），获得3条评论，虽已关闭但引发了对agent记忆管理的关注。该提案直指两个核心痛点：agent跨会话遗忘、全量记忆发送导致token成本高昂。这反映了用户对长期记忆和成本优化的迫切需求，值得维护者考虑将记忆管理纳入路线图。

其次是 **#7052「插件API增加system_prompt权限」**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/7052)），2条评论，来自企业用户场景——公司希望在插件互动界面注入自己的提示词，同时避免用户在QwenPaw会话界面看到。这涉及插件权限模型和企业级隐私控制，是B端用户的典型诉求。

**#7063「Agent执行工具调用时必现崩溃」**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/7063)）也获得2条评论，是今日最严重的Bug报告，详见下文。

## Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 状态 |
|--------|-------|------|------|
| 🔴 严重 | [#7063](https://github.com/agentscope-ai/QwenPaw/issues/7063) | Agent执行工具调用时必现崩溃。`agentscope`在`_execute_tool_call`中用`async for`遍历`self._acting(tool_call)`，但`_acting`返回coroutine而非async generator，导致`TypeError`。影响所有使用工具调用的agent。 | 待修复，无关联PR |
| 🟠 高 | [#7074](https://github.com/agentscope-ai/QwenPaw/issues/7074) | 正常运行崩溃，需刷新页面才能重启，频次高发。日志显示在获取session state dict时出现问题。 | 待诊断，无关联PR |
| 🟡 中 | [#7065](https://github.com/agentscope-ai/QwenPaw/issues/7065) | 多轮对话（约7轮）后无法查看早期聊天历史，滚动到顶部也只能看到最近3-4条。 | 待修复，无关联PR |
| 🟢 低 | [#6471](https://github.com/agentscope-ai/QwenPaw/issues/6471) | Cron任务在事件循环长时间空闲后misfire（APScheduler AsyncIOScheduler不触发），已在v2.0.1中报告，今日关闭。 | 已关闭 |

**已有修复PR的Bug**（来自PR描述）：
- **#7059**：OpenAI Responses API路径下`view_video`静默失败，模型未收到视频帧 → 修复PR [#7070](https://github.com/agentscope-ai/QwenPaw/pull/7070)
- **#7060**：`view_video`硬编码2MB内联上限，导致2MB-50MB视频被替换为占位文本 → 修复PR [#7071](https://github.com/agentscope-ai/QwenPaw/pull/7071)
- **#7051**：会话重载后历史消息中的data-URL图片显示为破损缩略图 → 修复PR [#7069](https://github.com/agentscope-ai/QwenPaw/pull/7069)
- **#7053**：OAuth2授权码模式轮换的refresh_token未持久化，导致token最终失效 → 修复PR [#7066](https://github.com/agentscope-ai/QwenPaw/pull/7066)
- **#7048**：`cron update --text`仅更新嵌套字段，顶层`text`字段未同步 → 修复PR [#7064](https://github.com/agentscope-ai/QwenPaw/pull/7064)

## 功能请求与路线图信号

今日用户提出的新功能需求：

1. **插件API增加system_prompt权限**（[#7052](https://github.com/agentscope-ai/QwenPaw/issues/7052)）：企业用户希望在插件层注入私有提示词，且对用户不可见。这指向插件权限模型的扩展，可能需要在插件API中增加`system_prompt`级别的权限控制。

2. **按agent/会话级配置reasoning_effort**（[#7062](https://github.com/agentscope-ai/QwenPaw/issues/7062)）：当前`reasoning_effort`只能在provider/model级设置，全局生效。用户希望不同角色（快速问答vs深度研究）使用不同思考强度，无需为每个档位单独建模型条目。这是一个合理的配置粒度优化，实现成本较低，有望进入下一版本。

3. **文件查看器支持更多语言**（[#7068](https://github.com/agentscope-ai/QwenPaw/issues/7068)）：C#和shader文件（.shader/.gdshader/.hlsl等）在Console/桌面应用中显示为纯文本，影响游戏开发工作流。属于体验优化类需求。

4. **Skill名称去重**（[#7073](https://github.com/agentscope-ai/QwenPaw/issues/7073)）：当工作区自定义skill与内置skill同名时，两者都会被加载，导致重复。`builder.py`仅做了路径去重。这更像是一个Bug修复，但以Feature形式提交，预计会快速被接受。

**路线图信号**：结合PR #7072（后台任务列表API）来看，后台任务管理正在逐步完善，多agent协调场景是项目重点方向之一。PR #6302（provider统一体系）若合并，将为模型管理带来重大架构升级。

## 用户反馈摘要

从今日Issues和PR评论中提炼的真实用户反馈：

- **记忆与成本**（#7003）：用户对agent跨会话遗忘和全量记忆发送的高昂token成本表示不满，认为这是影响实际使用的关键瓶颈。ViBo提案虽被关闭，但问题本身值得关注。
- **企业隐私需求**（#7052）：企业用户明确表示"不想提交会话后在qwenpaw的会话界面被用户看到"公司提示词，说明B端部署场景对提示词隐私有硬性要求。
- **工具调用稳定性**（#7063）：用户报告"必现崩溃"，且错误信息清晰指向`async for`对coroutine的错误使用，说明该问题在v2.1.0中可稳定复现，严重影响agent工具调用功能。
- **视频处理静默失败**（#7070、#7071）：用户反馈`view_video`在OpenAI Responses API路径下"Video loaded"但模型实际未收到视频帧，属于完全静默的失败，排查困难。另有2MB硬编码上限导致中等大小视频被丢弃的问题。
- **多轮对话历史丢失**（#7065）：用户反馈约7轮对话后早期消息不可见，即使滚动到顶部也无法恢复，影响长会话的连续性体验。
- **OAuth2 token轮换问题**（#7066）：使用XMind等MCP服务器时，轮换的refresh_token未持久化，导致token最终失效，需要重新授权。

## 待处理积压

以下Issue/PR长期未获响应或合并，建议维护者关注：

1. **[PR #6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)「feat: unify provider discovery, model metadata, routing, and agent controls」**：自7月21日创建，已近4周无合并进展。该PR涉及provider体系重大重构，改动面大，可能需要更多审查时间，但长期搁置会增加合并冲突风险。

2. **[PR #6940](https://github.com/agentscope-ai/QwenPaw/pull/6940)「feat(pawapp): add native DataPaw app runtime and durable analysis workspace」**：8月12日创建，已标记`ready-for-human-review`，但4天过去仍无维护者响应。该PR附带截图和infra repo链接，看起来完成度较高。

3. **[Issue #6471](https://github.com/agentscope-ai/QwenPaw/issues/6471)「Cron任务misfire」**：虽已关闭，但关闭原因未明确说明（是修复了还是关闭了事？）。APScheduler在事件循环空闲后不触发的问题在v2.0.1中报告，建议确认修复是否已合入主线。

4. **9个待合并PR中有7个来自首次贡献者**：这些PR集中在视频处理、OAuth2、Cron CLI等具体修复上，代码量不大，建议维护者尽快review合并，以维持社区贡献者的积极性。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-17

## 1. 今日速览

过去24小时项目活跃度极高：共产生 **425 条 Issue 更新**（新开/活跃 279，关闭 146）和 **500 条 PR 更新**（待合并 414，合并/关闭 86），并发布 **1 个新版本** v0.20.2。社区讨论集中在多租户架构、Token 开销优化、桌面端稳定性三大方向；7 个 P1/P2 级 Issue 于今日关闭，显示核心缺陷修复效率良好。长期悬而未决的「大型文件分解」重构 Epic（#78647）宣告 20/20 全部完成，是项目架构治理的重要里程碑。

---

## 2. 版本发布

### v2026.8.16 — Hermes Agent v0.20.2（Patch Release）

- **发布日期：** 2026-08-16
- **性质：** 稳定补丁版，面向 Docker 镜像、托管部署及新安装用户
- **内容：** 汇总自 v0.20.1 以来合并的 **~397 个 PR**，形成可追溯的稳定标签

**迁移注意事项：** 作为 Patch Release，预期无破坏性变更；但涉及 SQLite FTS5 索引兼容性（见 #86027）与 Windows 更新链路（见 #83569）的已知问题，建议升级前备份 `state.db`。

🔗 [查看 Release](https://github.com/NousResearch/hermes-agent/releases)

---

## 3. 项目进展

今日 **86 个 PR 被合并/关闭**，多个长期 Issue 闭环，项目整体向前推进显著：

### 已闭环的重要工作

| 项目 | 说明 |
|---|---|
| **大型文件分解 Epic 完成** | [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) 20/20 子任务全部完成，仓库级 god-file 分片政策落地 |
| **桌面端重启吞网关回归修复** | [#83683](https://github.com/NousResearch/hermes-agent/issues/83683)（P1）Windows 桌面端重启不再误杀 messaging gateway |
| **Agent flush 压缩续接修复** | [#82001](https://github.com/NousResearch/hermes-agent/issues/82001)（P1）压缩后会话身份交接缺口已修复 |
| **Windows 更新自锁问题修复** | [#83569](https://github.com/NousResearch/hermes-agent/issues/83569)（P1）`cryptography._rust.pyd` 自锁导致更新失败已解决 |
| **google-antigravity 遗留问题闭环** | [#50530](https://github.com/NousResearch/hermes-agent/issues/50530) 子代理崩溃/并发掉线/400 错误汇总关闭 |
| **Gateway 系统提示刷新修复** | [#68563](https://github.com/NousResearch/hermes-agent/issues/68563) SOUL.md 变更后 durable session 不再使用旧 system prompt |

### 活跃 PR 推进（今日更新）

- **修复类：** curator dry-run 机械只读（[#87821](https://github.com/NousResearch/hermes-agent/pull/87821)）、sanitizer 空 tool_call_id 与 CWD 误报（[#87221](https://github.com/NousResearch/hermes-agent/pull/87221)）、TUI 首条 skill slash 不触发 agent turn（[#87961](https://github.com/NousResearch/hermes-agent/pull/87961)）、Codex 流被陈旧超时误杀（[#86246](https://github.com/NousResearch/hermes-agent/pull/86246)）、Termux Rust 构建 OOM（[#87951](https://github.com/NousResearch/hermes-agent/pull/87951)）
- **功能类：** 桌面端 wake/TTS 开关迁移至标题栏（[#87960](https://github.com/NousResearch/hermes-agent/pull/87960)）、Matrix 项目会话路由（[#86355](https://github.com/NousResearch/hermes-agent/pull/86355)）、Nix home-manager 模块（[#9087](https://github.com/NousResearch/hermes-agent/pull/9087)）
- **平台适配：** Discord 线程自由回复（[#86351](https://github.com/NousResearch/hermes-agent/pull/86351)）、Slack 线程根文档附件水合（[#85747](https://github.com/NousResearch/hermes-agent/pull/85747)）、WhatsApp 原子化持久化配对状态（[#84180](https://github.com/NousResearch/hermes-agent/pull/84180)）

---

## 4. 社区热点

今日讨论热度最高的议题反映了社区对 **架构演进** 与 **稳定性** 的双重关注：

| Issue | 评论数 | 诉求分析 |
|---|---|---|
| [#78647 大型文件分解 Epic](https://github.com/NousResearch/hermes-agent/issues/78647) | 79 | 社区对 god-file 分片的高度关注，最终 20/20 完成，是架构治理的标杆事件 |
| [#66616 Skills 索引失活](https://github.com/NousResearch/hermes-agent/issues/66616) | 44 | 自动化探针持续报警，索引 29.8h 未刷新（限制 26h），影响文档站与技能发现 |
| [#6839 Lazy Tool Schema 加载](https://github.com/NousResearch/hermes-agent/issues/6839) | 40（👍 18） | 每次 API 调用注入全部工具 schema 消耗 3,500-5,000 tokens，社区强烈希望两段式注入优化 |
| [#34352 多租户 Hermes 方案](https://github.com/NousResearch/hermes-agent/issues/34352) | 34（👍 3） | 内存操作绕过 hook 系统导致租户隔离无法实现，已有生产级修复方案，等待官方决策 |
| [#83683 桌面端重启吞网关](https://github.com/NousResearch/hermes-agent/issues/83683) | 33 | Windows 用户高频遭遇，已关闭并修复 |
| [#8457 持久化会话记忆](https://github.com/NousResearch/hermes-agent/issues/8457) | 21 | 会话记忆跨重启丢失，要求跨会话搜索与自动压缩 |
| [#82001 Agent flush 压缩续接](https://github.com/NousResearch/hermes-agent/issues/82001) | 20 | 压缩后会话续接失败且误导用户为「磁盘满」，已修复 |

**核心信号：** 社区对 Token 成本敏感度极高（#6839 获 18 👍），多租户与内存隔离是高频诉求，桌面端稳定性问题虽多但修复响应迅速。

---

## 5. Bug 与稳定性

### P1 级（严重）

| Issue | 状态 | 说明 |
|---|---|---|
| [#83683 桌面重启吞网关](https://github.com/NousResearch/hermes-agent/issues/83683) | ✅ 已关闭 | Windows 回归，已修复 |
| [#82001 Agent flush 续接失败](https://github.com/NousResearch/hermes-agent/issues/82001) | ✅ 已关闭 | 压缩后会话身份交接缺口，已修复 |
| [#80439 .desktop Exec 路径错误](https://github.com/NousResearch/hermes-agent/issues/80439) | ⚠️ 开放 | KDE 任务栏固定失效，`sys.argv[0]` 解析错误 |
| [#83569 Windows 更新自锁](https://github.com/NousResearch/hermes-agent/issues/83569) | ✅ 已关闭 | `cryptography._rust.pyd` 自映射导致更新失败 |

### P2 级（重要）

| Issue | 状态 | 说明 |
|---|---|---|
| [#82936 默认 profile 密钥泄漏](https://github.com/NousResearch/hermes-agent/issues/82936) | ⚠️ 开放 | 多 profile 下默认密钥泄漏至次级 profile 的 terminal 与 Kanban 子进程，**安全边界问题** |
| [#81048 审批超时误判为拒绝](https://github.com/NousResearch/hermes-agent/issues/81048) | ⚠️ 开放 | 危险命令审批超时被归因为「用户拒绝」，**Tier 1 安全关键** |
| [#58619 桌面端 serve 进程无限累积](https://github.com/NousResearch/hermes-agent/issues/58619) | ⚠️ 开放 | 重连时旧进程未清理，建议增加 `--replace` 语义 |
| [#82887 terminal 工具空字节崩溃](https://github.com/NousResearch/hermes-agent/issues/82887) | ⚠️ 开放 | 引用二进制路径时 `embedded null character` 崩溃 |
| [#32528 QQ Bot C2C 审批被拒](https://github.com/NousResearch/hermes-agent/issues/32528) | ⚠️ 开放 | chat_type 不匹配导致按钮审批永远 unauthorized |
| [#68321 桌面端助手消息消失](https://github.com/NousResearch/hermes-agent/issues/68321) | ⚠️ 开放 | 切换会话后 assistant 消息渲染丢失，DB 完好 |
| [#86027 SQLite FTS5 升级不兼容](https://github.com/NousResearch/hermes-agent/issues/86027) | ⚠️ 开放 | 3.46.1 → 3.53.4 升级后 `messages_fts_trigram` 报 malformed |
| [#63717 Windows 更新连环故障](https://github.com/NousResearch/hermes-agent/issues/63717) | ⚠️ 开放 | 7 个关联根因导致更新反复失败 |
| [#48000 Kanban 误触发熔断](https://github.com/NousResearch/hermes-agent/issues/48000) | ⚠️ 开放 | 瞬时故障退出码 0 被误判为 protocol_violation |

### P3 级（一般）

- [#83390 DeepSeek 标题生成 400](https://github.com/NousResearch/hermes-agent/issues/83390)（👍 2）：`response_format` 类型不可用
- [#51327 Electron chrome-sandbox 静默失败](https://github.com/NousResearch/hermes-agent/issues/51327)：Linux .desktop 启动无窗口
- [#85695 TERMINAL_CWD 误报弃用警告](https://github.com/NousResearch/hermes-agent/issues/85695)：已有修复 PR [#87221](https://github.com/NousResearch/hermes-agent/pull/87221)
- [#81563 macOS 本地网络权限缺失](https://github.com/NousResearch/hermes-agent/issues/81563)：无 NSLocalNetworkUsageDescription

---

## 6. 功能请求与路线图信号

### 高潜力纳入下一版本

| 功能 | 支持度 | 分析 |
|---|---|---|
| **Lazy Tool Schema 两段式注入**（[#6839](https://github.com/NousResearch/hermes-agent/issues/6839)） | 👍 18 | 直击 Token 成本痛点，已有明确技术方案，社区呼声最高 |
| **多租户 Hermes**（[#34352](https://github.com/NousResearch/hermes-agent/issues/34352)） | 👍 3 | 生产环境验证过的修复方案，等待官方架构决策 |
| **Per-Chat 内存隔离**（[#28279](https://github.com/NousResearch/hermes-agent/issues/28279)） | 👍 2 | 多聊天场景隐私刚需，与多租户诉求同源 |
| **统一 Deadline 层**（[#85125](https://github.com/NousResearch/hermes-agent/issues/85125)） | 新 | 4 阶段架构方案，目标消除 400+ 超时/挂起类问题 |

### 值得关注的路线图信号

- **生命周期 Hook 共享运行时契约**（[#67798](https://github.com/NousResearch/hermes-agent/issues/67798)）：Hook 系统从 gateway-owned 转向 runtime-owned，影响所有执行面
- **桌面端 Response-only 模式**（[#71870](https://github.com/NousResearch/hermes-agent/issues/71870)）：隐藏思考过程，已有 PR [#87960](https://github.com/NousResearch/hermes-agent/pull/87960) 迁移相关 UI 控件
- **持久化会话记忆**（[#8457](https://github.com/NousResearch/hermes-agent/issues/8457)）：跨重启会话恢复 + 自动压缩，与 #82001 修复形成互补

---

## 7. 用户反馈摘要

- **多租户生产用户**（[#34352](https://github.com/NousResearch/hermes-agent/issues/34352)）："我们已在生产环境运行修复方案数月，多租户 agent 在不同上下文工作正常" — 表明社区已领先官方实现，存在 fork 风险
- **Windows 桌面端用户**（[#83683](https://github.com/NousResearch/hermes-agent/issues/83683)）："每次桌面重启后 WeChat/QQ/Telegram 全部静默，必须手动重启 gateway" — 回归类问题对 IM 机器人用户伤害极大
- **DeepSeek 用户**（[#83390](https://github.com/NousResearch/hermes-agent/issues/83390)）："辅助标题生成任务直接 400 失败" — 国产模型兼容性诉求上升
- **Windows 更新困难户**（[#63717](https://github.com/NousResearch/hermes-agent/issues/63717)）："3 周内反复失败，形成关联根因链" — 更新体验是桌面端留存关键
- **隐私敏感用户**（[#28279](https://github.com/NousResearch/hermes-agent/issues/28279)）："全局内存注入所有会话，多聊天场景存在明显隐私漏洞" — 内存隔离是 multi-chat 场景的硬需求
- **Token 成本敏感用户**（[#6839](https://github.com/NousResearch/hermes-agent/issues/6839)）："本地模型上工具格式占 3,500-5,000 tokens/调用" — 直接制约本地模型可用性

---

## 8. 待处理积压

### 长期未响应的关键 Issue

| Issue | 创建时间 | 状态 | 提醒 |
|---|---|---|---|
| [#66616 Skills 索引持续 degraded](https://github.com/NousResearch/hermes-agent/issues/66616) | 2026-07-18 | 开放（44 评论） | 自动化探针报警近 30 天，影响文档站与技能发现 |
| [#6839 Lazy Tool Schema](https://github.com/NousResearch/hermes-agent/issues/6839) | 2026-04-09 | 开放（40 评论，👍 18） | 4 个月未决策，社区高赞需求 |
| [#34352 多租户方案](https://github.com/NousResearch/hermes-agent/issues/34352) | 2026-05-29 | 开放（34 评论） | 生产级方案等待官方回应，有 fork 风险 |
| [#8457 持久化会话记忆](https://github.com/NousResearch/hermes-agent/issues/8457) | 2026-04-12 | 开放（21 评论） | 4 个月未推进 |
| [#58619 serve 进程无限累积](https://github.com/NousResearch/hermes-agent/issues/58619) | 2026-07-05 | 开放（11 评论） | 建议 `--replace` 语义，长期未实现 |
| [#51327 chrome-sandbox 静默失败](https://github.com/NousResearch/hermes-agent/issues/51327) | 2026-06-23 | 开放（10 评论） | Linux 桌面端启动可靠性问题 |
| [#48000 Kanban 误触发熔断](https://github.com/NousResearch/hermes-agent/issues/48000) | 2026-06-17 | 开放（7 评论） | 自动化任务稳定性隐患 |
| [#63717 Windows 更新连环故障](https://github.com/NousResearch/hermes-agent/issues/63717) | 2026-07-13 | 开放（7 评论） | 综合诊断已完成，待修复方案 |

### 长期未合并的 PR

| PR | 创建时间 | 提醒 |
|---|---|---|
| [#9087 Nix home-manager 模块](https://github.com/NousResearch/hermes-agent/pull/9087) | 2026-04-13 | 4 个月未合并，Nix 用户持续等待 |

---

**总结：** Hermes Agent 项目处于高活跃、高迭代状态。v0.20.2 的发布与大型文件分解 Epic 的完成标志着架构治理进入新阶段；但多租户、Token 优化、内存隔离三大社区高赞诉求仍待官方决策，安全类 Issue（#82936、#81048）需优先响应。建议维护者关注长期积压的「高赞 + 久未决策」类 Issue，避免社区方案 fork 与用户流失。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-08-17

## 今日速览

过去 24 小时项目活跃度较高：共 7 条 Issue 更新（4 条新开/活跃、3 条已关闭），10 条 PR 更新（8 条待合并、2 条已合并/关闭），无新版本发布。社区讨论集中在 WebUI 配置管理体验（时区隐藏字段、布局自定义）与模型配置残留问题；代码侧则有 6 个功能修复/增强 PR 待合并，其中 5 个来自同一贡献者 @SweetenedSuzuka，覆盖核心 Agent 图像转述、OpenAI 重试机制、知识库解析降级等关键路径。整体来看，项目处于稳定的功能迭代与缺陷修复并行阶段，社区反馈活跃，维护者需关注待合并 PR 的积压情况。

## 版本发布

今日无新版本发布。

## 项目进展

今日合并/关闭的 PR 均为分支同步操作，未引入新功能，但为后续开发扫清了障碍：

- **[#9697 [CLOSED] chore: sync master into dev (2026-08-15)](https://github.com/AstrBotDevs/AstrBot/pull/9697)** — 将 master 上 3 个 commit 同步至 dev，包括：插件市场详情页显示插件更新时间（#9690）、插件归属指南文档、dashboard trace 颜色适配主题（#9688）。
- **[#9710 [CLOSED] chore: sync master into dev](https://github.com/AstrBotDevs/AstrBot/pull/9710)** — 以双亲合并提交解决 #9697 的冲突，保留 dev 新架构的同时承接 master 对应行为，涉及 dashboard 等模块。

此外，今日有 8 个 PR 处于待合并状态，其中多个为实质性修复（详见下文 Bug 与稳定性部分），若全部合入将显著提升核心链路稳定性与可观测性。

## 社区热点

- **[#7344 [CLOSED] [plugin-publish] astrbot_plugin_localmemes](https://github.com/AstrBotDevs/AstrBot/issues/7344)** — 今日评论数最多（5 条），为插件作者 @WhiteCloudOL 发布的“本地表情包”插件，支持自定义分类表情发送与学习、LLM 规划发送或替换人设关键词发送。该 Issue 虽已关闭，但反映出社区对表情包类趣味功能的持续需求，插件生态活跃。

- **[#9711 / #9712 / #9713 已删除模型在配置文件中依旧显示](https://github.com/AstrBotDevs/AstrBot/issues/9711)** — 同一用户连续提交 3 条几乎相同的 Issue（1 条 OPEN、2 条 CLOSED），说明该问题对用户造成明显困扰。用户截图显示模型供应商仅剩豆包，但配置文件中仍残留已删除模型条目。这暴露了配置持久化与 UI 展示之间的同步缺陷，是今日最集中的用户痛点。

- **[#9706 [OPEN] 配置档 WebUI 不显示 timezone，但隐藏值仍会覆盖全局时区](https://github.com/AstrBotDevs/AstrBot/issues/9706)** — 用户 @leviathan-kt 详细描述了配置档表单缺少 timezone 字段、但 JSON 中隐藏值仍生效且优先级高于全局设置的矛盾，属于隐蔽的配置优先级问题，容易造成用户困惑。

## Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue/PR | 描述 | 状态 |
|---------|----------|------|------|
| 高 | [#9711 [OPEN] 已删除模型在配置文件中依旧显示](https://github.com/AstrBotDevs/AstrBot/issues/9711) | 模型供应商删除后，配置文件中残留已删除模型条目，UI 与配置不同步；用户重复提交 3 次 | 无 fix PR |
| 中 | [#9706 [OPEN] 配置档 WebUI 不显示 timezone，但隐藏值覆盖全局时区](https://github.com/AstrBotDevs/AstrBot/issues/9706) | 配置档表单缺少 timezone 字段，隐藏值运行时仍生效且优先于全局设置，用户只能通过 JSON 编辑器修改 | 无 fix PR |
| 中 | [#9669 [OPEN] fix(provider): 关闭 OpenAI SDK 内建重试](https://github.com/AstrBotDevs/AstrBot/pull/9669) | OpenAI provider 的 `request_max_retries` 与 SDK 内建重试嵌套，导致实际 HTTP 请求数翻倍；显式传入 `max_retries=0` 使 AstrBot 重试层成为唯一控制源 | 待合并 |
| 中 | [#9686 [OPEN] fix(core): 主模型缺少图像模态时由转述模型处理图片](https://github.com/AstrBotDevs/AstrBot/pull/9686) | 工具返回的图片在主模型不支持图像输入时被静默丢弃，现调用配置的转述模型生成文字描述注入上下文 | 待合并 |
| 中 | [#9680 [OPEN] fix: 从 QQ 引用消息的 JSON 卡片中提取文本](https://github.com/AstrBotDevs/AstrBot/pull/9680) | 引用 QQ 小程序分享等 JSON 卡片消息时，机器人无法看到引用内容，两条抽取路径均静默丢弃非 `com.tencent.multimsg` 卡片 | 待合并 |
| 低 | [#9676 [OPEN] fix(kb): markitdown 不可用时回退纯文本解析器](https://github.com/AstrBotDevs/AstrBot/pull/9676) | 可选依赖 `markitdown-no-magika` 未安装时，上传 txt/md 文件报通用“解析失败”错误，掩盖真实原因；现回退到纯文本解析器 | 待合并 |
| 低 | [#9707 [OPEN] fix: sanitize incomplete tool history before provider fallback](https://github.com/AstrBotDevs/AstrBot/pull/9707) | 在 provider 分发前校验工具调用与结果的配对完整性，防止上下文压缩失败后回退到无效工具历史 | 待合并 |
| 低 | [#9705 [OPEN] fix(qqofficial): restore @ mentions in group messages](https://github.com/AstrBotDevs/AstrBot/pull/9705) | 修复 QQ 官方群组消息中 @ 提及丢失问题，序列化 `<@openid>` 标记并以 Markdown 发送 | 待合并 |

## 功能请求与路线图信号

- **[#9708 [OPEN] 插件列表自定义选择布局](https://github.com/AstrBotDevs/AstrBot/issues/9708)** — 用户希望插件列表可自定义每行显示数量（2/3/4 个），认为当前一排 2 个过少。属于 WebUI 布局灵活性需求，与 #9709 同属 dashboard 体验优化方向。
- **[#9709 [OPEN] 设置布局支持拖拽切换](https://github.com/AstrBotDevs/AstrBot/issues/9709)** — 用户建议设置页的布局调整从“点箭头”改为拖拽切换，认为当前操作耗时较长。
- **[#9670 [OPEN] feat(provider): 重试日志包含提供商 ID 和模型名称](https://github.com/AstrBotDevs/AstrBot/pull/9670)** — 改进可观测性：重试警告日志从静态适配器标签（如 `[OpenAI]`）扩展为包含提供商实例 ID 与模型名，便于定位 429/超时等故障源。该 PR 修复 #9453，属于运维体验增强。

结合已有 PR（#6325 dev 分支包含 dashboard 部署与 README 改进），WebUI 布局与配置管理优化是当前社区呼声较高的方向，上述功能请求有较大概率被纳入后续版本。

## 用户反馈摘要

- **配置残留困扰**：用户 @missybeatrixswire 连续提交 3 条 Issue 报告“已删除模型在配置文件中依旧显示”，说明该问题在 UI 上无法直接解决，用户被迫手动编辑配置文件，体验不佳。
- **时区配置隐蔽性**：用户 @leviathan-kt 指出配置档表单无法查看/修改 timezone 字段，但隐藏值仍生效且优先于全局设置，只能通过 JSON 编辑器发现真正生效的配置来源，反映了 WebUI 表单覆盖不完整的问题。
- **布局效率诉求**：用户 @mjy1113451 认为设置布局的箭头切换方式“时间有些长”，希望拖拽切换；用户 @1592363624 认为插件列表一排 2 个“太少了”，希望自定义密度。
- **插件生态活跃**：插件作者 @WhiteCloudOL 发布本地表情包插件，支持 LLM 规划发送与人设关键词替换，获得 5 条评论，说明社区对个性化、趣味性插件有持续兴趣。

## 待处理积压

- **[#6325 [OPEN] dev（dashboard 部署至 GitHub Pages + README 改进）](https://github.com/AstrBotDevs/AstrBot/pull/6325)** — 创建于 2026-03-15，已积压 5 个月，size:XXL，涉及 dashboard 部署工作流、README 全面改进及 smoke test 格式调整。长期未合并可能阻碍 WebUI 相关功能的推进，建议维护者评估拆分或加速 review。
- **[#9711 [OPEN] 已删除模型在配置文件中依旧显示](https://github.com/AstrBotDevs/AstrBot/issues/9711)** — 用户重复提交 3 次，暂无 fix PR，需维护者确认是否为已知问题并给出修复计划。
- **[#9706 [OPEN] 配置档 WebUI 不显示 timezone 但隐藏值覆盖全局时区](https://github.com/AstrBotDevs/AstrBot/issues/9706)** — 配置优先级逻辑缺陷，暂无 fix PR，建议纳入近期修复。
- **@SweetenedSuzuka 的 5 个 PR（#9686、#9680、#9669、#9676、#9670）** — 均为实质性修复且已就绪，目前全部处于待合并状态，建议维护者优先 review 合并，避免分支冲突加剧。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*