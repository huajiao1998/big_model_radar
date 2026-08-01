# OpenClaw 生态日报 2026-08-02

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-01 22:45 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-02

## 1. 今日速览

过去 24 小时 OpenClaw 仓库保持超高活跃度：Issue 更新 500 条（新开/活跃 476 条，关闭 24 条），PR 更新 500 条（待合并 390 条，合并/关闭 110 条），并发布 v2026.7.2-beta.6。新版本以状态安全与崩溃恢复为核心，直接回应近期多起 P0 级数据损坏报告。然而 Issue 侧仍积压大量 P1 级消息丢失、崩溃循环与安全类问题，多个已标记 `linked-pr-open` 的修复长期未能合并，维护者审查与产品决策已成为当前迭代的主要瓶颈。整体判断：项目处于高频迭代期，工程投入显著，但用户侧稳定性感知仍受未修复回归的拖累。

## 2. 版本发布

**v2026.7.2-beta.6**（[Release 页面](https://github.com/openclaw/openclaw/releases)）

该版本聚焦"状态安全与恢复"，针对近期密集出现的持久化数据损坏、迁移丢失问题：

- 引入**隔离存储（quarantine store）**：在主数据库受损时保护持久化数据
- **崩溃可恢复的 SQLite 快照**机制
- **崩溃持久的文件系统发布**机制
- **Schema 升级数据丢失拒绝**：升级路径中发现可能丢数据的操作时直接拒绝执行
- **回滚写入者快照恢复**：支持从回滚场景中恢复状态

背景关联：该版本方向与两个未解决 P0 直接相关——[#101290](https://github.com/openclaw/openclaw/issues/101290)（CLI 预检损坏活动状态库）与 [#115421](https://github.com/openclaw/openclaw/issues/115421)（schema 降级恢复清除状态库导致 cron 任务丢失）。**迁移注意**：此为 beta 版本且涉及状态存储层的结构性变更，升级前务必完整备份 `~/.openclaw/` 目录。

## 3. 项目进展

今日合并/关闭 110 个 PR。基于可见数据，主要推进如下：

**已关闭的重点 PR**

| PR | 内容 | 关联 |
|---|---|---|
| [#117640](https://github.com/openclaw/openclaw/pull/117640) | fix(google)：实时语音启动音频保持有界且有序，防止启动/重连时音频缓冲无界保留与乱序 | 缓解 #116201 |
| [#117658](https://github.com/openclaw/openclaw/pull/117658) | fix(tui)：切换会话时保持模式作用域隔离，防止 fast/verbose/trace/reasoning 模式串台 | 关闭 #117654 |
| [#117667](https://github.com/openclaw/openclaw/pull/117667) | refactor(android)：简化 durable outbox 测试场景，76 个测试去重 | — |
| [#117662](https://github.com/openclaw/openclaw/pull/117662) | refactor(infra)：移除未使用的 Windows 防火墙探测代码路径 | — |

**值得关注的待合并 PR**

- **fix(agents)：将 fallback 委托门应用到 CLI 后端运行**（[#115405](https://github.com/openclaw/openclaw/pull/115405)，P1）— 补上 fallback 模型完成时阻塞新委托的遗漏路径
- **fix(agents)：透出 sessions_yield 等待状态**（[#117509](https://github.com/openclaw/openclaw/pull/117509)，P1）— 修复子代理产生时父回合无任何消息返回用户的问题
- **fix(compaction)：使用规范化会话上下文投影修复压缩估算器**（[#117400](https://github.com/openclaw/openclaw/pull/117400)，P1）— 修复压缩边界被忽略导致 token 高估、误触发压缩
- **fix(auth)：默认 agent 在次要 paste-api-key 后丢失密钥**（[#116248](https://github.com/openclaw/openclaw/pull/116248)，P1，关闭 #116243）
- **fix(line)：为 LINE 频道推送增加幂等重试键**（[#94680](https://github.com/openclaw/openclaw/pull/94680)，P1，关闭 #86012）— 修复 5xx/429/网络瞬时失败导致的静默丢消息
- **fix(memory-core)：从 fallback 嵌入提供商恢复主提供商**（[#116562](https://github.com/openclaw/openclaw/pull/116562)，关闭 #96534）
- **fix(plugins)：畸形构建元数据不再导致插件加载崩溃**（[#117639](https://github.com/openclaw/openclaw/pull/117639)）

**方向判断**：项目当前集中发力三条主线——状态持久化安全、渠道消息可靠性、上下文处理正确性。同时 ClawSweeper 自动化机器人持续产出修复（如 [#117443](https://github.com/openclaw/openclaw/pull/117443) 状态频道模型覆盖修复），但大量自动生成 PR 仍在等待人工审查，形成新的队列瓶颈。

## 4. 社区热点

**① DeepSeek v4 Flash 静默回复失败**（[#116277](https://github.com/openclaw/openclaw/issues/116277)，73 条评论，P1）
2026-07-30 起，`deepseek-v4-flash` 在 Telegram 群组中静默失败，仅回退为 "No reply was generated"。已标记 `needs-live-repro`，**无 fix PR**。背后诉求：用户对模型失败的**可观察性**要求极高——宁可看到错误详情，也不要一条泛化 fallback。

**② 工具调用间文本泄漏到消息通道**（[#25592](https://github.com/openclaw/openclaw/issues/25592)，39 条评论，P1/security）
Agent 在工具调用之间产生的内部叙述（错误处理、处理确认、旁白）被当作可见消息路由到 Slack/iMessage。已标记 `linked-pr-open` 并进入安全评审。这是"内部处理输出外泄"类问题中持续时间最长（2 月报告）、影响面最广的一条。

**③ 实时语音会话状态无界保留**（[#116201](https://github.com/openclaw/openclaw/issues/116201)，34 条评论，P1）
慢速/突发 provider 行为下，废弃 consult 工作、大型 provider 帧、pre-ready 音频被无界保留。今日 [#117640](https://github.com/openclaw/openclaw/pull/117640) 关闭，Google 实时音频路径已部分缓解，但整体架构性上限仍未解决。

**④ 崩溃循环抑制器永久压制 Discord/WhatsApp**（[#115326](https://github.com/openclaw/openclaw/issues/115326)，24 条评论，P1）
Gateway 启动成功后因 crash-loop breaker 永久抑制 Discord/WhatsApp，文档化恢复路径 `channels.start` 遇到 WebSocket 1006 失败。用户**无法自行恢复**，已标记 `needs-maintainer-review` 与 `needs-product-decision`。

## 5. Bug 与稳定性

按严重程度排列，标注修复进展：

**🔴 P0 — 数据完整性**

| Issue | 描述 | 修复状态 |
|---|---|---|
| [#101290](https://github.com/openclaw/openclaw/issues/101290) | CLI 启动预检可损坏运行中的状态库；macOS 上 4 天内损坏 4 次，vanilla SQLite 无法复现 | 无 fix PR；新版本快照机制或部分覆盖 |
| [#115421](https://github.com/openclaw/openclaw/issues/115421) | Schema 降级恢复隔离/清空状态库，导致 cron 任务全部丢失 | 标 `linked-pr-open`，有开放 PR |

**🟠 P1 — 消息丢失 / 崩溃循环**

- **[#116277](https://github.com/openclaw/openclaw/issues/116277)** DeepSeek v4 Flash 静默失败（73 评论，无 fix PR）
- **[#115326](https://github.com/openclaw/openclaw/issues/115326)** 崩溃循环抑制器永久压制 Discord/WhatsApp（无 fix PR）
- **[#115424](https://github.com/openclaw/openclaw/issues/115424)** Gateway V8 堆 OOM 后重启恢复将一个崩溃放大为 7 次 core dump 循环
- **[#88657](https://github.com/openclaw/openclaw/issues/88657)** DeepSeek v4 Flash 不完整回合（5 月报告，`payloads=0, tools=2`，仍开放）
- **[#94939](https://github.com/openclaw/openclaw/issues/94939)** 6.x 迁移将 MS Teams 会话存储留为 0 字节，破坏主动消息发送（标 `linked-pr-open`）

**🟠 P1 — 安全**

- **[#25592](https://github.com/openclaw/openclaw/issues/25592)** 工具调用间文本泄漏到消息通道（有 open PR，安全评审中）
- **[#31583](https://github.com/openclaw/openclaw/issues/31583)** `exec` 工具不继承 `skills.entries.*.env` 密钥（3 月报告，有 open PR）
- **[#98976](https://github.com/openclaw/openclaw/issues/98976)** Provider refusal（Anthropic/OpenAI content_filter）不触发 fallback 链，回合以泛化错误终止（有 open PR）
- **[#115909](https://github.com/openclaw/openclaw/issues/115909)** 浏览器扩展设备身份连接被 auth 门禁拒绝为 `token_missing`，配对永远不会发生
- **[#91804](https://github.com/openclaw/openclaw/issues/91804)** 2026.6.5 起内部推理内容暴露给用户（6 月报告，仍开放）

**趋势提示**：今日无新增 P0，但既有 P0 已悬挂 3 周以上；多个 P1 带 `linked-pr-open` 却迟迟无法合并，安全评审与维护者审查是当前最短的木板。

## 6. 功能请求与路线图信号

高讨论度 / 已有 PR 关联的功能诉求：

- **语音与文本上下文对齐**（[#110171](https://github.com/openclaw/openclaw/issues/110171)，no-stale，P1）：iOS Talk 实时语音应获得与文本聊天同等的长期记忆（MEMORY.md、USER.md、SOUL.md）与对话历史。与今日语音状态治理 PR（#117640）属同一能力域，**大概率进入 2026.8 规划**。
- **反应触发 agent turns**（[#17840](https://github.com/openclaw/openclaw/issues/17840)，P2）：emoji 轮询、反应式交互等场景。2 月提出，至今未动，路线图信号偏弱。
- **/label 与 /new \<name\> 会话命名**（[#93422](https://github.com/openclaw/openclaw/issues/93422)，P2）：WebChat/Control UI 多会话识别需求，社区 2 👍。
- **按目录索引记忆，而非按 agent**（[#95724](https://github.com/openclaw/openclaw/issues/95724)，P2）：同一 workspace 多 agent 共享向量索引，避免重复建库。与开放中的 XL 级 PR [#88504](https://github.com/openclaw/openclaw/pull/88504)（multi-slot memory 架构）方向一致，值得关注。
- **技能生命周期管理**（[#95516](https://github.com/openclaw/openclaw/issues/95516)，P3）：失败自动优化 + 使用量退休。
- **生产就绪稳定性标签**（[#73537](https://github.com/openclaw/openclaw/issues/73537)，P2）：用户明确希望区分 beta/stable 发布，反映对当前版本频繁回退的不安。

## 7. 用户反馈摘要

- **深度依赖与真实代入感**（[#73537](https://github.com/openclaw/openclaw/issues/73537)）："它已经真正成为我们日常流程的一部分"——家庭 + 商业助手（Telegram、自动化、cron、Home Assistant）的长时间稳定使用案例。
- **稳定性焦虑弥漫**：多条 issue 描述升级后出现消息丢失、崩溃循环、数据库损坏，用户被迫回滚或手动恢复。[#101290](https://github.com/openclaw/openclaw/issues/101290) 用户在 4 天内经历 4 次 DB 损坏；[#115326](https://github.com/openclaw/openclaw/issues/115326) 用户被文档中的恢复路径误导，实际 WebSocket 1006 直接失败。
- **强可观察性诉求**：用户在多个场景下不知道"到底发生了什么"——fallback 切换不可见（[#94919](https://github.com/openclaw/openclaw/issues/94919)）、refusal 无提示（[#98976](https://github.com/openclaw/openclaw/issues/98976)）、模型静默失败（[#116277](https://github.com/openclaw/openclaw/issues/116277)）。
- **隐私敏感度上升**：内部推理泄漏（[#91804](https://github.com/openclaw/openclaw/issues/91804)）与工具间文本外泄（[#25592](https://github.com/openclaw/openclaw/issues/25592)）均获 👍 并被标记 security，社区对"内部 vs 外部"边界问题高度关注。
- **无障碍用户的正向反馈**（[#95601](https://github.com/openclaw/openclaw/issues/95601)）：VoiceOver 用户感谢 v2026.6.9 将剩余用量信息移到模型选择器旁，同时请求聊天历史的 VoiceOver 友好化——说明无障碍改进会被真实用户感知并进一步提出需求。

## 8. 待处理积压

**长期未响应的关键 Issue**

| Issue | 报告时间 | 优先级 | 备注 |
|---|---|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) 工具间文本泄漏 | 2026-02-24 | P1/安全 | 有 open PR，等待安全评审 |
| [#17840](https://github.com/openclaw/openclaw/issues/17840) 反应触发 turn | 2026-02-16 | P2 | 5 个月无实质进展 |
| [#30381](https://github.com/openclaw/openclaw/issues/30381) chatCompletions 忽略模型身份 | 2026-03-01 | P1 | `x-openclaw-agent-id` 语义不完整 |
| [#31583](https://github.com/openclaw/openclaw/issues/31583) exec 不继承 env 密钥 | 2026-03-02 | P1 | 有 open PR，3 个多月未合入 |
| [#73537](https://github.com/openclaw/openclaw/issues/73537) 稳定性标签 | 2026-04-28 | P2 | 产品决策未定 |
| [#88657](https://github.com/openclaw/openclaw/issues/88657) DeepSeek 不完整回合 | 2026-05-31 | P2 | 2 个月未解决 |
| [#91804](https://github.com/openclaw/openclaw/issues/91804) 推理泄漏 | 2026-06-10 | P1/安全 | 严重隐私回归，无 fix PR |

**长期开放的重要 PR**

- **[#88504](https://github.com/openclaw/openclaw/pull/88504)** feat(memory)：multi-slot memory 角色架构 —— 5 月提出，XL 尺寸，已开放 2 个月，目前仍标 `needs proof`
- **[#94680](https://github.com/openclaw/openclaw/pull/94680)** fix(line)：LINE 频道幂等重试 —— 6 月提出，P1 级消息丢失修复，已开放 6 周

**给维护者的优先级建议**：① 先合并/关闭已具备 `linked-pr-open` 的 P1（#31583、#98976、#94939）；② 对 #25592 与 #91804 给出明确安全评审结论；③ 为两个悬挂 P0（#101290、#115421）确认新版本是否已实质修复，避免用户重复上报。

---

*报告基于 2026-08-02 抓取的 GitHub 公开数据生成，样本覆盖过去 24 小时全部 500 条 Issue 更新、500 条 PR 更新及 1 个新 Release。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比报告 — 2026-08-02

## 1. 生态全景

当前生态已全面进入“工程化攻坚期”：头部项目（OpenClaw、hermes-agent）日处理 500 条 Issue/PR，迭代频率接近大型商业软件，但社区普遍将重心从“堆功能”转向“保稳定、防数据损坏、堵安全泄漏”。数据完整性（状态库损坏、消息丢失、静默写坏文件）与内部/外部输出边界（推理泄漏、工具旁白外发、环境变量泄漏）成为跨项目最高频的 P0/P1 议题，反映用户对助手“可信赖”的底线要求。同时，维护者评审速度成为所有项目的共同瓶颈——高赞功能需求长期悬置、大量已修复 PR 无法合入，开源社区正面临“贡献过剩、治理稀缺”的结构性矛盾。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 合并/关闭 PR | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（关闭 24） | 500（合并 110） | v2026.7.2-beta.6 | 110 | 高频迭代，但 P0 悬挂 3 周+，稳定性感知受回归拖累 |
| **hermes-agent** | 446（关闭 121） | 500（合并 115） | 无 | 115 | 良好；核心工具审计批量落地，但 385 条 PR 积压 |
| **Zeroclaw** | 50（关闭 5） | 50（合并 7） | 无 | 7 | ⭐⭐⭐⭐☆；安全响应快，RFC 质量高，维护者队列是瓶颈 |
| **QwenPaw** | 14（关闭 0） | 13（合并 1） | 无 | 1 | 社区活跃但维护积压严重，14 条 Issue 零关闭 |
| **AstrBot** | 9（关闭 2） | 12（合并 5） | 无 | 5 | 健康；两大架构 PR 合并，问题收敛速度较快 |
| **PicoClaw** | 1 | 3（关闭 1） | 无 | 1 | 中等；贡献者积极但关键 Matrix Bug 31 天未修 |

> 注：OpenClaw 与 hermes-agent 数据口径为“全部 500 条更新”，其余项目为该仓库全部更新量，绝对值差异直接反映社区规模差距。

## 3. OpenClaw 在生态中的定位

**社区规模绝对领先**：日更新量是 Zeroclaw 的 10 倍、AstrBot 的 55 倍、PicoClaw 的 500 倍，是生态中唯一达到“500/500 满采样”的项目，具备参照系地位。

**技术路线差异**：以“状态安全”立身——隔离存储（quarantine store）、崩溃可恢复 SQLite 快照、Schema 升级丢数据拒绝，是六项目中唯一对持久化层做系统性防损坏设计的。hermes-agent 更侧重文件/终端等工具的写入正确性（非 UTF-8 损坏、符号链接覆盖），Zeroclaw 聚焦安全策略执行与架构抽象，三家技术侧重形成清晰错位。

**核心短板**：审查吞吐与迭代速度不匹配。390 条待合并 PR、多个 P1 修复长期悬挂、两个 P0 悬而未决——社区贡献能力已明显超出维护者处置能力，这是 OpenClaw 当前最大风险。

## 4. 共同关注的技术方向

| 方向 | 涉及项目与具体诉求 |
|---|---|
| **状态持久化与崩溃恢复** | OpenClaw 状态库损坏（#101290）、SQLite 快照；Zeroclaw cron 锁永久持有（#9320）、微信游标竞态（#9313）；hermes-agent kanban 高并发损坏（#53819）、会话看门狗（#76354） |
| **消息可靠性** | OpenClaw LINE 静默丢消息（#94680）、DeepSeek 静默失败（#116277）；Zeroclaw CLI cron 输出被丢弃（#9340）；PicoClaw Matrix 断线静默死亡（#3203）；AstrBot QQ 首字丢失（#9299） |
| **可观察性** | OpenClaw fallback/refusal 切换不可见（#94919/#98976）；Zeroclaw OTel 跨轮关联（#8933）；QwenPaw 假成功状态（#9340）；AstrBot 429 自定义重试（#9494）——用户普遍要求“看到错误详情，而非泛化 fallback” |
| **内部/外部边界安全** | OpenClaw 工具间文本泄漏（#25592）、推理泄漏（#91804）；hermes-agent Teams `.env` 泄漏（#76438）；Zeroclaw WhatsApp 策略形同虚设（#9348）；QwenPaw `<eom>` 泄漏进 UI |
| **记忆架构分层** | OpenClaw 按目录索引记忆（#95724）；Zeroclaw 会话历史 ≠ 长期记忆（#9048）；QwenPaw 自动压缩不触发记忆（#6624）；均为“短期对话/长期记忆/向量索引”三层拆分的同向演进 |
| **外部互操作** | Zeroclaw OpenAI 兼容适配器（#8603）、A2A 出站（#9106）；hermes-agent A2A（28👍）；QwenPaw/PicoClaw 同时接入 OrcaRouter；OpenClaw 尚未显式布局 |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 架构特征 |
|---|---|---|---|
| **OpenClaw** | 全功能个人 AI 助手（多渠道、语音、自动化、cron） | 深度个人/家庭用户、自托管者 | 单体仓库高频迭代，ClawSweeper 机器人辅助贡献，工程投入最大 |
| **Zeroclaw** | 安全优先的 agent 运行时 | 安全敏感的自托管者、企业评估者 | RFC 驱动，v0.9.0 为“架构治理”里程碑（密钥抽象、策略管线、身份认证） |
| **hermes-agent** | 多 profile 隔离 + 核心工具正确性 | 开发者、桌面/SSH 远程重度用户 | 维护者主导审计式迭代，385 PR 积压反映外部贡献接入效率低 |
| **AstrBot** | IM 平台 Bot 框架（QQ/微信/Telegram） | 中文社区 bot 运营者 | WebUI 管理 + 插件生态；刚合并 `/responses` API，向统一对话架构演进 |
| **QwenPaw** | 基于 agentscope 的多智能体开发框架 | Agent 应用开发者 | 强依赖上游 agentscope 版本，2.0.1 与 2.0.4.post1 不兼容致两次崩溃 |
| **PicoClaw** | 轻量聚合型助手（多搜索/provider 接入） | 轻量自托管用户 | 社区贡献驱动，代码量小但路线图清晰（Exa、OrcaRouter、i18n） |

## 6. 社区热度与成熟度分层

**第一梯队 · 超高频迭代期**：OpenClaw、hermes-agent——日更新 500 条量级，自动化机器人参与贡献（ClawSweeper、sweeper 风险标签），但均面临“PR 积压 > 审查吞吐”的治理危机。

**第二梯队 · 架构收敛/质量巩固期**：Zeroclaw——50 条量级，无新版本发布，刻意放慢节奏做 RFC 评审与安全加固，S1 漏洞 24 小时内即有修复 PR，自我修正机制（#9397 状态纠正）体现成熟度。

**第三梯队 · 功能积累/问题收敛期**：AstrBot、QwenPaw——个位数到十几个更新，AstrBot 保持“架构合并 + bug 修复”的稳定节奏；QwenPaw 社区贡献意愿高（5 个首次贡献者 PR）但维护方吞吐不足，Issue 零关闭是明显警示信号。

**第四梯队 · 社区驱动待激活**：PicoClaw——日更新个位数，外部贡献者主动提交功能但缺乏维护者响应，关键可靠性问题滞留超 30 天，存在“贡献流失”风险。

## 7. 值得关注的趋势信号

**① “稳定性即功能”——数据完整性成为购买决策的第一要素**
OpenClaw 两个 P0 悬挂三周、hermes-agent 批量修复非 UTF-8 静默损坏、Zeroclaw 修复 cron 锁泄漏——多个项目在同一时期对持久化层和工具写入层做“外科手术”，说明行业已接受共识：agent 的价值上限由“不出错”决定，而非“多智能”。

**② 静默失败是用户最不能接受的失败模式**
从 OpenClaw 的 “No reply was generated”、Zeroclaw 的 “run recorded as ok”、到 QwenPaw 的 “假成功” 丢弃输出，用户一致要求“宁可报错，不可装死”。**可观察性（observability）正从运维概念上升为产品伦理**。

**③ 内部与外部边界正在成为安全主战场**
工具间文本泄漏、推理内容外发、`.env` 被插件吸入、终端标记泄漏进 UI——这些问题的共性在于 **agent 内部协议与外部消息通道缺乏强制隔离层**。预计 2026 下半年会出现“内部叙述通道”相关标准化提案。

**④ 维护者瓶颈成为开源 AI Agent 项目的第一治理矛盾**
六个项目中五个明确出现 review 积压或决策悬置。对于开发者而言，这意味着：**向高活跃项目提交 PR 要做好“长期等待”预期，选择项目时应评估维护者吞吐而非仅看 star 数**。Zeroclaw 的“维护者决策队列”跟踪器（#8692）是值得借鉴的治理实验。

**⑤ 互操作性从“加分项”变为“默认要求”**
OpenAI 兼容适配器、A2A 协议、OrcaRouter 类聚合网关在四个项目中同时出现——用户在生态割裂中强烈期望“一个 agent 连接所有模型与所有 agent”。**A2A 与 OpenAI `/responses` 的同时推进，预示 2026 下半年 agent 间通信将进入标准化竞争的关键窗口**。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-02

> 数据窗口：2026-08-01 至 2026-08-02 · 数据来源：github.com/zeroclaw-labs/zeroclaw

---

## 1. 今日速览

过去 24 小时 Zeroclaw 仓库保持极高活跃度：**50 条 Issue 更新 + 50 条 PR 更新**，其中 45 条 Issue 新开/活跃、43 条 PR 待合并，但**无新版本发布**。社区讨论高度集中在安全加固与架构演进两大主题：WhatsApp Web 频道曝出 S1 级安全漏洞（被误读为已锁定配置实际全开），已有多条修复 PR 在途；与此同时，围绕记忆生命周期、密钥来源抽象、OpenAI 兼容适配器等 RFC 的讨论持续升温，其中 6 个高热度议题评论数均超过 10 条。整体来看，项目正处于 v0.8.x 与 v0.9.0 之间密集的 RFC 评审与安全修复期，维护者决策队列（#8692）是当前最重要的瓶颈节点。

---

## 2. 版本发布

过去 24 小时无新版本发布。项目当前处于功能积累与安全修复密集提交阶段，多个 v0.9.0 相关 breaking-change 议题（见跟踪器 #7432）仍在评审中。

---

## 3. 项目进展

过去 24 小时共有 **7 条 PR 合并/关闭**，另有 43 条 PR 待合并。值得关注的高价值 PR 进展如下：

- **WhatsApp Web 安全修复双线推进**
  - [#9382 fix(channels): enforce WhatsApp Web chat policies under both modes](https://github.com/zeroclaw-labs/zeroclaw/pull/9382)：修复 business 模式下 `dm_policy`/`group_policy` 完全不被执行的问题。值得注意：维护者注明已**纠正 #9397 的过早接受状态**，体现了社区 RFC 流程的自我修正机制。
  - [#9609 fix(channels): enforce WhatsApp Web chat policies under both modes](https://github.com/zeroclaw-labs/zeroclaw/pull/9609)（08-01 新建）：与 #9382 解决同一问题的新提交 PR，目前存在两条实现路线，需维护者协调合并策略。

- **安全缺陷修复新 PR**
  - [#9612 fix(channels): tie the WhatsApp Cloud approval token to a guard so no exit orphans it](https://github.com/zeroclaw-labs/zeroclaw/pull/9612)（08-01 新建）：修复 `request_approval` 在发送失败/取消时泄漏审批令牌的问题，对应 issue #9417（S2）。

- **核心运行时稳定性修复（待合并）**
  - [#9320 fix(cron): bound agent job runs with a wall-clock timeout that releases the lock](https://github.com/zeroclaw-labs/zeroclaw/pull/9320)：修补 cron 任务因 provider 无响应导致 `locked_at` 锁永久持有的问题。
  - [#9494 fix(sop): drive cron-started headless runs](https://github.com/zeroclaw-labs/zeroclaw/pull/9494)：解决 cron 触发的 headless 运行没有 agent loop 维护、`ExecuteStep` 永远停在 pending 的问题。
  - [#9313 fix(wechat): persist sync cursor only after inbound batch is enqueued](https://github.com/zeroclaw-labs/zeroclaw/pull/9313)：修复崩溃窗口导致微信消息丢失的竞态条件。

- **架构文档与开发流程补强**（均于 08-01 新建）
  - [#9639 docs(architecture): document provider routing lifecycle](https://github.com/zeroclaw-labs/zeroclaw/pull/9639)：新增 provider 路由生命周期的源码级文档，覆盖 hint 路由、重试/回退顺序、冷却、流式恢复、no-replay 边界等。
  - [#9637 fix(ci): guard temporary React Router RSC exception](https://github.com/zeroclaw-labs/zeroclaw/pull/9637)：为 npm 依赖审查添加临时例外，并强制 client-only 边界。
  - [#9638 feat(acp): select standalone default agent](https://github.com/zeroclaw-labs/zeroclaw/pull/9638)：为独立 ACP 启动器增加 `--agent <alias>` 参数。

**整体判断**：项目正在围绕 WhatsApp 安全问题、cron 可靠性、WeChat 数据一致性进行密集修复，同时通过文档和 CI 门禁加固工程基础设施，整体向 v0.9.0 安全架构目标稳步推进。

---

## 4. 社区热点

今日评论数最高的议题集中在**架构边界**与**外部互操作**两大主题：

| 议题 | 评论数 | 核心诉求 |
|---|---|---|
| [#9048 RFC: Separate conversation history from agent-curated long-term memory](https://github.com/zeroclaw-labs/zeroclaw/issues/9048) | 16 | 会话历史 ≠ 长期记忆。当前 runtime/gateway/channel 自动保存仍将对话轮次写入通用记忆后端（`MemoryCategory::Conversation`），与生命周期管理理念相悖，需要清晰拆分。 |
| [#9127 RFC: Abstract a `KeySource` trait — classify master-key material by source / deployment form](https://github.com/zeroclaw-labs/zeroclaw/issues/9127) | 13 | 93 个 `#[secret]` 字段、59 个凭据分类，但主密钥来源（env、file、KMS 等）缺少统一抽象，部署形态各异导致密钥管理碎片化。 |
| [#8603 RFC: OpenAI Chat Completions compatibility adapter](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) | 12 | 目前仅支持 WebSocket 和 webhook，Open WebUI、LobeChat 等 OpenAI 协议客户端无法直接接入。这是**外部生态接入**呼声很高的议题。 |
| [#8933 RFC: Add cross-turn conversation correlation to OTel export](https://github.com/zeroclaw-labs/zeroclaw/issues/8933) | 12 | 可观测性增强：在 OTel export 中携带 `gen_ai.conversation.id` 属性（OTel Semantic Conventions v1.41.0 experimental），实现跨轮次会话追踪。 |
| [#7155 RFC: Add a per-execution confirmation tier for high-risk shell commands](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) | 11 | 安全 UX 核心诉求：在“完全允许”和“完全阻止”之间增加 Claude Code 风格的 allow/ask/deny 命令策略层，按命令模式而非工具级授权。 |
| [#9106 RFC: A2A outbound client (A2ATool)](https://github.com/zeroclaw-labs/zeroclaw/issues/9106) | 10 | 补全 A2A 能力短板：当前只有 A2AServer（入站），agent 无法主动调用外部 A2A agent，跨 agent 协作被迫走渠道绕行。 |

**诉求分析**：今日热点呈现清晰的“内部分层 + 外部连接”双主线——一方面社区强烈希望把记忆、密钥、策略、认证等横切关注点从 runtime 中解耦为独立抽象层（#9048、#9127、#6850、#7141）；另一方面急切需要与 OpenAI 生态、A2A 生态、Gemini Live 等外部系统对接（#8603、#9106、#8780），减少自建适配成本。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 S1 — 安全风险
- **[#9348 [Bug] WhatsApp Web answers every DM and every group under mode = business](https://github.com/zeroclaw-labs/zeroclaw/issues/9348)**（p1，in-progress，accepted）
  **现象**：business 模式下 `dm_policy`/`group_policy` 完全未执行，且空的 `allowed_groups` 被解释为放行所有群聊。配置看起来是锁定状态，实际完全开放。
  **修复状态**：已有两条修复 PR（#9382、#9609），并配套 RFC #9397（将空 `allowed_groups` 改为 permit-none）。⚠️ 注意 #9382 与 #9609 为竞争实现，需尽快协调合并。

### 🟠 S2 — 降级行为
- **[#9417 WhatsApp Cloud request_approval leaks a live approval token on send failure and on cancellation](https://github.com/zeroclaw-labs/zeroclaw/issues/9417)**（p1，in-progress）
  **现象**：审批令牌注册在进程全局 `PENDING_APPROVALS` map 中，发送失败或取消时未清理，令牌成为可被利用的悬挂凭据。
  **修复状态**：已有 fix PR [#9612](https://github.com/zeroclaw-labs/zeroclaw/pull/9612)（08-01 新建）。

### 🟡 P1 高优先功能缺陷
- **[#9340 [Bug] CLI-created cron jobs cannot deliver output; delivery is hardcoded to None](https://github.com/zeroclaw-labs/zeroclaw/issues/9340)**（p1，accepted，in-progress）
  **现象**：通过 CLI 创建的 cron 任务 `delivery.mode` 被硬编码为 `"none"`，agent 定时运行、调用工具、结果被丢弃，且运行状态显示 `ok`——用户完全无感知。
  **修复状态**：关联 PR #9320（超时释放锁）与 #9494（驱动 headless 运行），但 delivery 硬编码问题本身仍需单独修复。
- **[#6157 [Bug] Nextcloud Talk use correct bot message API](https://github.com/zeroclaw-labs/zeroclaw/issues/6157)**（S3，p2，in-progress，accepted）
  **现象**：Nextcloud Talk 响应消息构建的 URL 格式错误，bot secret 传递方式有误，导致回复发送失败。
  **修复状态**：无明确 fix PR，已接受待处理。

### 🟢 其他已定位问题（有对应 PR）
- **流式输出泄漏终端标记**（#9006）：`<eom>` 字样以纯文本形式出现在 ZeroCode Code 标签页，并持久化进会话历史。修复 PR：[#9037 fix(runtime): strip trailing provider terminal markers](https://github.com/zeroclaw-labs/zeroclaw/pull/9037)。
- **LoopDetector 深拷贝性能**（#8936）：每次工具调用都对 `args` 做深拷贝后哈希。修复 PR：[#8937 fix(agent): stream-hash tool args in loop_detector](https://github.com/zeroclaw-labs/zeroclaw/pull/8937)。

---

## 6. 功能请求与路线图信号

### 可能进入 v0.9.0 的议题

| 方向 | 代表性议题/PR | 信号强度 |
|---|---|---|
| **统一记忆架构**（分离会话历史/权威存储/增强连接器） | [#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048)、[#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103)、[#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) | 三个高度关联 RFC 均处于 accepted/no-stale 状态，记忆后端与策略解耦已是 v0.9.0 明确方向 |
| **安全策略体系升级**（KeySource 抽象、认证主体、沙箱策略、命令确认分层、安全决策管线） | [#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127)、[#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141)、[#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142)、[#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)、[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)、[#6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971) | 多个 RFC 已迭代至 Rev 4/5，跟踪器 #7432 显示这是 v0.9.0 核心 milestone |
| **对外互操作层**（OpenAI 兼容、A2A 出站、Gemini Live 实时语音） | [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)、[#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106)、[#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) | OpenAI 兼容适配器为外部生态刚需，A2A 出站是 #3566 的既定后续，预计为 v0.9.x 重点 |
| **可观测性增强**（OTel 跨轮关联、rustdoc 门禁） | [#8933](https://github.com/zeroclaw-labs/zeroclaw/issues/8933)、[#9545](https://github.com/zeroclaw-labs/zeroclaw/issues/9545) | #8933 已 accepted；#9545 获得 👍，对应 CI 工程质量诉求 |
| **统一交互体验**（附件架构、斜杠命令统一、桌面 computer-use） | [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)、[#7929](https://github.com/zeroclaw-labs/zeroclaw/issues/7929)、[#6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909) | 均处于 RFC 讨论期，需 maintainer 决策是否纳入路线图 |

### 信号解读
- **暂缓信号**：#8568（Mixture-of-Agents 虚拟模型提供商）已关闭，该功能未进入路线图——但关闭而非拒绝，可能在 v0.10+ 重新评估。
- **架构收拢信号**：多个 RFC 主张将横切能力（记忆、安全、密钥、可观测性）抽象为运行时拥有的独立 trait/管线，而非由各 channel/gateway 各自实现。这指向 ZeroClaw 正在从“功能叠加”转向“架构治理”。

---

## 7. 用户反馈摘要

从今日 Issues 评论中提炼的真实用户声音：

- **安全配置反直觉（最强烈的声音）**
  > “A config that reads as locked down behaves as fully open, so an operator who believes they configured an allowlist gets an agent that replies to every inbound message, including unrelated group chats.”
  
  来自 [#9348](https://github.com/zeroclaw-labs/zeroclaw/issues/9348)。用户以“S1 - security risk”定性，核心痛点是**配置语义与实际行为不符**，信任链条被打破。同类诉求出现在 #9397（要求空列表 = permit-none）中。

- **任务静默失败，用户无感知**
  > “The run is recorded as `ok`, so nothing indicates the result went nowhere.”
  
  来自 [#9340](https://github.com/zeroclaw-labs/zeroclaw/issues/9340)。CLI cron 任务输出被静默丢弃，但状态显示成功——用户对“假成功”的容忍度极低，反馈直指可观测性缺口。

- **终端标记泄漏到 UI，破坏使用体验**
  通过 [#9037](https://github.com/zeroclaw-labs/zeroclaw/pull/9037) 的 PR 描述可见：`<eom>` 字面量出现在 ZeroCode 代码标签页的可见 transcript 中，并**持久化到对话历史**，下游渠道投递还会重复转义。这是典型的“内部协议泄漏到用户界面”问题。

- **外部生态接入受阻，被迫自建适配器**
  [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) 的诉求非常直接：Open WebUI、LobeChat 等 OpenAI 协议客户端“cannot connect without building an adapter of their own”，用户希望开箱即用。

- **模型能力配置分散导致误报**
  [#7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) 反映了 provider 默认能力与模型实际能力不一致的问题（如未设置 context window 时错误回退到 32K、视觉能力误报），影响上下文预算计算和 UI 展示。

---

## 8. 待处理积压

以下重要议题长期处于 `needs-maintainer-review` 状态，等待维护者决策：

| 议题 | 创建时间 | 优先级 | 等待时长 | 状态说明 |
|---|---|---|---|---|
| [#6850 RFC: Decouple memory lifecycle policy from storage backends](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) | 2026-05-22 | p2 | 72 天 | 已进入今日 #9048/#9103 的统一讨论主线，但原议题仍卡在维护者评审 |
| [#6909 RFC: Computer-use support for desktop screen interaction](https://github.com/zeroclaw-labs/zeroclaw/issues/6909) | 2026-05-25 | p2 | 69 天 | 桌面端重要能力，回复 8 条但无维护者定论 |
| [#6971 RFC: Security UX, runtime credential boundaries, and isolation defaults](https://github.com/zeroclaw-labs/zeroclaw/issues/6971) | 2026-05-27 | p2 | 67 天 | 安全 UX 核心设计，与 #7141/#7142 联动，需统一决策 |
| [#6996 RFC: Granular sandbox policy — filesystem and network restrictions](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | 2026-05-28 | p2 | 66 天 | 已 in-progress 但仍标注 needs-maintainer-review |
| [#7100 RFC: Per-model capability & context-window config](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) | 2026-06-02 | **p1** | 61 天 | 高优先级却 61 天未获维护者明确指令，与 #8878/#9037 等 PR 直接相关 |
| [#7155 RFC: Per-execution confirmation tier for high-risk shell commands](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) | 2026-06-03 | **p1** | 60 天 | 今日 11 评论的热门议题，仍无维护者回应 |
| [#7141 RFC: Pluggable inbound authentication and canonical principals](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) | 2026-06-03 | **p1** | 60 天 | v0.9.0 IAM milestone 核心，已迭代至 Rev 5，等待拍板 |
| [#7897 RFC: Apply security policy and channel config updates without full daemon reload](https://github.com/zeroclaw-labs/zeroclaw/issues/7897) | 2026-06-17 | p3 | 46 天 | 运维体验关键项，长期 no-stale 但无进展 |

**维护者提醒**：跟踪器 [#8692 Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 正是为缓解此类积压而设，目前已有 7 条评论，涉及决策队列的运转方式。建议维护者优先处理 p1 级且已迭代多轮 Rev 的 RFC（#7100、#7155、#7141），避免社区力量在长期等待中流失。

---

**总体健康度评估**：⭐⭐⭐⭐☆（4.5/5）
- ✅ 社区活跃度极高，高质量 RFC 与安全修复并行推进
- ✅ 安全漏洞响应迅速（#9348 → #9382/#9609/#9397 的修复链条完整）
- ⚠️ 维护者评审队列是当前最大瓶颈，61 天未决的 p1 议题已出现社区情绪积累风险
- ⚠️ 存在重复 PR（#9382 vs #9609），需尽快合并避免分叉

*日报生成时间：2026-08-02 · 数据源：Zeroclaw GitHub 仓库*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-02

## 1. 今日速览

过去 24 小时 PicoClaw 保持中等活跃度：1 条 Issue 更新、3 条 PR 更新，无新版本发布。社区贡献集中在功能扩展方向，新增 Exa 搜索与 OrcaRouter 两条 provider 待合并 PR，zh-TW 本地化 PR 已关闭收尾。Matrix 同步断线重连问题（#3203）昨日再获评论，是当前社区最关注的稳定性议题。综合来看，社区外部贡献活跃、功能迭代信号明确，但 Matrix 关键 Bug 已滞留一个月未修复，维护响应速度是当前健康度的主要短板。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

- **#3261（已关闭）**：添加 zh-TW locale 及繁体中文翻译。该 PR 为 WebUI 与文档提供符合台湾用语习惯的本地化内容，属非破坏性新功能。状态为 CLOSED 且带 [stale] 标签，具体为合并关闭还是过期关闭需维护者确认。
  https://github.com/sipeed/picoclaw/pull/3261

另有 2 条功能型 PR 处于待合并状态，为下一版本蓄力：

- **#3299**：新增原生 Exa `web_search` provider，支持现有 `d/w/m/y` 时间范围过滤与 `X-Api-Key` 认证。https://github.com/sipeed/picoclaw/pull/3299
- **#3309**：新增 OrcaRouter OpenAI 兼容 provider（`orcarouter`），支持 `vendor/model` 形式的多厂商路由。https://github.com/sipeed/picoclaw/pull/3309

## 4. 社区热点

- **#3203（7 评论，2 👍）** Matrix sync loop 无重连逻辑 — 网络/服务器中断后静默死亡。该 Issue 为昨日讨论最活跃的条目，社区围绕 Matrix 通道的可靠性展开讨论。背后诉求是：PicoClaw 作为常驻自托管服务应具备进程内自愈能力，而非依赖外部 systemd 守护兜底。
  https://github.com/sipeed/picoclaw/issues/3203

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | 是否有 Fix PR |
|---|---|---|---|
| 高 | #3203 | Matrix `/sync` 长轮询在任意网络中断或 homeserver 重启后永久终止，无自动重连；主进程存活导致 systemd `Restart=on-failure` 无法触发，形成"静默死亡" | 无 |

该 Bug 直接威胁 Matrix 通道可用性，属于服务"看似在线、实则失联"的隐蔽故障。Issue 已开放 31 天（自 2026-07-02）并被标记 [stale]，无任何关联修复 PR，建议维护者提升优先级。
https://github.com/sipeed/picoclaw/issues/3203

## 6. 功能请求与路线图信号

当前外部贡献者集中提交功能型 PR，释放出清晰的路线图信号：

- **搜索后端扩展**：#3299 新增 Exa 原生搜索 provider，延续项目"接入多种搜索后端"的演进方向，预计将丰富 `tools.web`/`web_search` 生态。https://github.com/sipeed/picoclaw/pull/3299
- **模型网关扩展**：#3309 将 OrcaRouter 纳为 OpenAI 兼容 provider，采用与现有 provider 相同的 `vendor/model` 地址形状，接入成本低，有望随 0.3.x 系列合入。https://github.com/sipeed/picoclaw/pull/3309
- **国际化**：#3261（已关闭）表明社区对多语言界面存在持续需求，后续可能演进为完整的 i18n 框架支持。

若上述两条 PR 合入，下一版本将同时获得"更多搜索来源"与"更多模型路由"能力，进一步巩固其作为聚合型 AI 助手的定位。

## 7. 用户反馈摘要

- **Matrix 自托管用户的稳定性痛点**（来自 #3203）：用户 @weissfl 报告在 PicoClaw v0.2.9 上，Matrix 通道在 homeserver 重启或网络抖动后静默失效；用户曾尝试以 systemd `Restart=on-failure` 兜底，但主进程未退出导致机制失效。该反馈说明真实部署场景为无人值守常驻服务，用户对断线自愈有明确预期，当前实现未满足。
  https://github.com/sipeed/picoclaw/issues/3203

## 8. 待处理积压

- **#3203（关键 Bug，已开放 31 天）** Matrix 重连逻辑缺失，昨日仍有新评论，却已进入 stale 状态。核心通道可用性问题长期未被响应，建议维护者优先处理，避免社区信任流失。
  https://github.com/sipeed/picoclaw/issues/3203

- **#3299（待 Review 7 天）** Exa 搜索 provider PR 自 2026-07-26 开启后无任何维护者评论或审阅，功能完整度较高（含配置与过滤支持），建议尽快安排 review。
  https://github.com/sipeed/picoclaw/pull/3299

- **#3261（已关闭，收尾待确认）** zh-TW 翻译 PR 以 [stale] 关闭，若其中包含尚未合入的完整本地化成果，建议维护者评估是否需要重新基于最新主干提交，避免重复劳动。
  https://github.com/sipeed/picoclaw/pull/3261

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-02

## 1. 今日速览

过去24小时内，QwenPaw 社区保持了较高的活跃度：新增/活跃 Issue 14 条，新增/活跃 PR 13 条。但需要注意的是，14 条 Issue 中有 **0 条被关闭**，13 条 PR 中仅有 **1 条被合并/关闭**（#6598），其余 12 条仍处于待合并状态，维护响应吞吐存在明显瓶颈。今日无新版本发布。生态兼容性（agentscope 2.0.4.post1 破坏性变更）引发的多个崩溃类 Bug 成为社区关注焦点，同时社区贡献者提交了 5 个 first-time-contributor PR 尝试修复，整体呈现“社区活跃、维护积压”的状态。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日仅 1 条 PR 被合并/关闭：

- **[#6598] fix(skills): preserve plugin-sourced skill tags across reconcile cycles (#6537)**（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6598)）— 由 @BlackBox-Labs 提交。修复了插件来源技能（plugin-sourced skills）在重启后标签丢失的问题。根因是 `reconcile_pool_manifest()` 和 `reconcile_workspace_manifest()` 会无条件移除磁盘目录不存在（但实际来自插件）的 manifest 条目。该修复保障了插件技能配置的持久性。

除此之外，有 12 条 PR 仍在等待审核与合并，其中包含多个指向明确 Bug 的修复 PR（详见下文第 5 部分），以及 5 个来自首次贡献者的 PR。**项目整体推进速度受限于维护方的 PR 审核与合并效率，大量修复完成了代码却未能落地。**

## 4. 社区热点

今日评论数最高的 Issue 集中在 API 设计缺陷、数据损坏和 UI 稳定性三个方向：

- **[#6588] [Bug]: spawn_subagent 单任务模式不可用（评论 4 条）**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6588)）— 用户 @BLUE0818 报告 `spawn_subagent` 支持 `batch=None` 单任务模式，但 model-facing tool schema 却将 `batch` 设为必填，导致前台单 subagent 无法创建：省略 `batch` 通不过 schema 校验，传空值又被特殊处理。该设计矛盾直接导致 API 不可用，是社区今日讨论最热烈的技术议题。

- **[#6520] agent.json 系统性损坏：BOM、缺失引号、双重编码（评论 3 条）**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6520)）— @easyaha 报告 `agent.json` 出现跨 20+ 字段的三种损坏类型（BOM 头、字符串缺失结束引号、中文双重编码），导致系统完全故障。该 Issue 自 7 月 28 日创建至今未获修复，社区关注度持续上升。

- **[#6589] [Bug]: execute_shell_command 大量输出导致 UI 冻结（评论 3 条）**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6589)）— @adolfishxu 报告前端控制台一次性渲染数万行 stdout 导致 UI 主线程阻塞、界面完全卡死，用户只能强制关闭应用。这属于高频场景下的严重体验问题。

**分析**：社区热点集中在 API 设计一致性和使用时的高频稳定性问题。三者共同点是都会直接阻断用户的核心工作流（创建子代理、读取配置、查看命令输出），说明 2.0.1 版本在基础可用性上仍需补强。

## 5. Bug 与稳定性

按严重程度排列（标注是否已有 fix PR）：

**🔴 严重 — 崩溃/完全不可用**

- **[#6619] "ToolCallBlock" object has no field "extra_content" — openai_chat_model_compat._parse_stream_response 崩溃**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6619)）— qwenpaw 2.0.1 + agentscope 2.0.4.post1 组合下，流式工具调用携带 Gemini thought_signature 时必崩。**已有 fix PR：[#6620](https://github.com/agentscope-ai/QwenPaw/pull/6620)**（@namphamdev，首次贡献者，待合并）。

- **[#6612] QwenPaw 2.0.1 与 agentscope 2.0.4.post1 不兼容：主动/记忆子系统崩溃 + 工具权限死锁**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6612)）— 两种独立运行时故障（Msg.content 类型变更引发崩溃、工具权限死锁），均由 agentscope API 变更导致 qwenpaw 2.0.1 未同步适配。**暂无 fix PR**。

- **[#6520] agent.json 系统性损坏导致系统完全故障**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6520)）— 详见社区热点。**暂无 fix PR**。

**🟠 中等 — 功能阻塞/会话挂起**

- **[#6608] 长时 shell 命令绕过 shell_command_timeout，阻塞飞书会话 1.5 小时**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6608)）— 无 per-channel 总超时机制，底层子进程也未在取消时正确回收，后续消息全部排队。**暂无 fix PR**。

- **[#6588] spawn_subagent 单任务模式因 batch 必填而不可用**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6588)）— 设计矛盾导致 API 不可用。**暂无 fix PR**。

- **[#6624] 自动压缩（Scroll）不触发 summarize_when_compact 记忆流程**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6624)）— 手动 `/compact` 可触发，但 token 超阈值自动 eviction 时记忆流程静默失效。**已有 fix PR：[#6629](https://github.com/agentscope-ai/QwenPaw/pull/6629)**（@BlackBox-Labs，待合并）。

- **[#6625] ACP delegate_external_agent 偶发返回 "completed without text output"**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6625)）— notification 与 prompt response 同 TCP 段到达时存在竞态，文本输出丢失。**已有 fix PR：[#6623](https://github.com/agentscope-ai/QwenPaw/pull/6623)**（@cocoakekeyu，首次贡献者，待合并）。

**🟡 轻微 — 体验/流程问题**

- **[#6626] Real behavior proof CI gate 误剥落 fenced Evidence 代码块**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6626)）— 仅含 fenced code block 的 Evidence 内容被整体剥离导致 PR 被拒，属于 CI 流程缺陷。**暂无 fix PR**。

## 6. 功能请求与路线图信号

- **[#6593] 增加统一且专业的 QwenPaw 专用清理页面**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6593)）— 自动记忆、工具调用、备份、历史对话等数据长期累积导致空间臃肿，用户希望有全局的手动+自动清理能力，并能一并清理对应工作区目录。

- **[#6568] 全局快捷键唤出浮动快速输入框（豆包式）**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6568)）— 桌面端当前只能唤出 1280×800 主窗口，用户希望类似 macOS `Option+Space` 的轻量快速提问入口，降低“随手问一句”的操作摩擦。

- **[#6621] 多智能体协作引导缺失**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6621)）— 用户运行 50+ 轮多智能体对话才发现必须手动在 PROFILE.md 中显式声明才能让 Default Agent 调用其他 Agent，文档未能覆盖该关键细节，产生大量无效调试。

- **[#6627] 如何使用 loongsuite-python 做 LLM trace**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6627)）— 用户希望将 alibaba/loongsuite-python 与 QwenPaw 集成，需要官方提供指引。

**路线图信号**：从 PR 侧看，以下新功能/增强可能进入下一版本——**[#6622] OrcaRouter 内置 provider**（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6622)）、**[#6526] NVIDIA NIM provider 支持**（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6526)）、**[#6302] provider 发现/模型元数据/路由/Agent 控制统一**（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6302)）、**[#6306] 桌面端工作区快捷入口**（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6306)）、**[#5490] 工具卡片图片内联展示与画廊导航**（[链接](https://github.com/agentscope-ai/QwenPaw/pull/5490)）。其中 provider 生态扩展（OrcaRouter、NIM）与 #6627 的诉求方向一致，说明用户对模型接入的广度有持续需求。

## 7. 用户反馈摘要

- **API 设计矛盾直接阻断使用**（[#6588](https://github.com/agentscope-ai/QwenPaw/issues/6588)）：用户 @BLUE0818 明确表达了对 `spawn_subagent` 单任务模式不可用的困惑——“omitting batch fails schema validation, while supplying an empty value is treated...”（省略 batch 通不过校验、传空值又被特殊处理），API 文档语义与实际行为不匹配，对开发者极不友好。

- **多智能体协作的发现成本过高**（[#6621](https://github.com/agentscope-ai/QwenPaw/issues/6621)）：用户 @monicfenga 自述完整阅读了官方 Multi-Agent 文档，但仍花了 50+ 轮对话才发现需要显式在 PROFILE.md 中写调用指令。“引导缺失，而非用户未读文档”——这是对文档完备性和产品默认行为设计的直接批评。

- **不兼容组合导致双重故障**（[#6612](https://github.com/agentscope-ai/QwenPaw/issues/6612)）：@LeviDIAO 在用 qwenpaw 2.0.1 + agentscope 2.0.4.post1 的常规安装组合时遭遇崩溃与死锁，说明依赖版本约束未做好，用户按默认方式安装就可能踩坑，信任成本很高。

- **自动压缩与手动压缩行为不一致**（[#6624](https://github.com/agentscope-ai/QwenPaw/issues/6624)）：@Cederys 记录了 Scroll 自动压缩不触发记忆、手动 `/compact` 却正常的差异，措辞克制（“不确定是设计如此还是缺陷”），但实际上这一行为差异直接导致配置项 `summarize_when_compact` 在自动场景下失效，用户预期没有被满足。

- **长命令挂起影响真实工作流**（[#6480](https://github.com/agentscope-ai/QwenPaw/issues/6480)）：@focus883 的 `nohup`/`&` 命令导致 agent 永远不回到 idle，在钉钉渠道上会话被长期占住。这类问题对通过 IM 渠道使用 QwenPaw 的用户影响被放大——不仅命令失败，整个会话通道都被阻塞。

## 8. 待处理积压

- **[#6480] [Question] 运行 nohup 命令 agent 都会卡住（2026-07-26 创建，已 7 天无解决）**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6480)）— 2.0 版本遗留问题，detached process 永远不会释放会话。无人认领，连 workaround 也没有。

- **[#6520] agent.json 系统性损坏致系统完全故障（2026-07-28 创建，已 5 天无解决）**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6520)）— 数据层损坏，影响面最大（“complete system failure”），且三种损坏类型具有代表性，当前只有用户侧描述，无维护方介入。

- **[#5490] PR: 工具卡片图片内联展示与画廊导航（2026-06-24 创建，已滞留 39 天）**（[链接](https://github.com/agentscope-ai/QwenPaw/pull/5490)）— 最早提交的 PR 之一，提升聊天中图片查看体验，至今未合并也未关闭，处于长时间失焦状态。

- **[#6302] PR: provider discovery/模型元数据/路由/Agent 控制统一（2026-07-21 创建，13 天）**（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6302)）— 属于架构级增强，关联 #6167，长期无人 review，可能影响后续 provider 生态扩展的节奏。

- **[#6306] PR: 桌面端工作区快捷入口（2026-07-21 创建，13 天）**（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6306)）— 关闭 #6083，功能简单明确，但同样长时间未获 review。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报 — 2026-08-02

> 数据窗口：2026-08-01 ~ 2026-08-02（过去 24 小时）｜数据来源：GitHub NousResearch/hermes-agent

---

## 1. 今日速览

过去 24 小时项目处于**极高活跃度**状态：446 条 Issue 更新（新开/活跃 325 条，关闭 121 条），500 条 PR 更新（待合并 385 条，合并/关闭 115 条）。今日**无新版本发布**。维护者 @teknium1 批量完成了一轮「核心工具审计」修复（#76447/#76445/#76450/#76451/#76452），涵盖多处**数据丢失与静默错误替换**高危缺陷；同时落地了 Teams 插件 `.env` 环境变量泄漏修复（#76438、#62973、#62947）。社区侧热度集中在 A2A 协议（28 👍）、Mistral 支持（24 👍）与 token 成本优化（73% 固定开销）三个方向。整体健康度良好——issue 关闭速度快、自动化 triage 机制（sweeper 风险标签、bot 探针）运转正常；但 **385 条待合并 PR 积压**与多个高赞功能请求长期未决是当前主要隐忧。

---

## 3. 项目进展

### 🛠 核心工具审计修复批次（@teknium1 当日合并/关闭）

这是今日最重要的技术推进——针对文件/终端/补丁工具的系统性审计，多数为**数据正确性与数据丢失级**修复：

- **[PR #76447] [P1] 修复非 UTF-8 内容静默损坏与符号链接数据丢失** — `ShellFileOperations` 中 latin-1/8859 文件因 `errors="replace"` 解码导致写入时静默损坏；同时阻止符号链接被覆盖造成真实文件数据丢失。已关闭
  https://github.com/NousResearch/hermes-agent/pull/76447
- **[PR #76445] [P2] 修复读去重缓存失效与 cwd 泄漏** — 非默认任务下写入后缓存未失效；终端工具向进程注入错误工作目录。已关闭
  https://github.com/NousResearch/hermes-agent/pull/76445
- **[PR #76450] [P2] 修复 `context_aware` 模糊匹配静默替换错误内容** — 兜底策略可能替换文件中错误位置的内容，且未命中时性能病态低下。已关闭
  https://github.com/NousResearch/hermes-agent/pull/76450
- **[PR #76451] [P2] 修复 CRLF 补丁体解析与 Move-then-Update 场景** — 消除 `\r` 混入补丁行导致混合换行符的写入错误。已关闭
  https://github.com/NousResearch/hermes-agent/pull/76451
- **[PR #76452] [P2] 工具健壮性：超时校验、拒绝空白 old_string、收窄 /private/var 限制** — 修复 `timeout or default` 将 `0` 静默转为默认值等三类问题。已关闭
  https://github.com/NousResearch/hermes-agent/pull/76452

### 🖥 CLI / 安装体验

- **[PR #76437] [P1] 无 key 首次运行改为引导进入 provider onboarding** — 此前完全未配置的安装会直接进入一个必然无法工作的聊天（空转 36 秒后报错）。已关闭
  https://github.com/NousResearch/hermes-agent/pull/76437
- **[PR #76439] [P2] 设置向导在无可用 provider 时大声告警** — 修复取消 API-key 输入后向导仍「成功」完成的问题。已关闭
  https://github.com/NousResearch/hermes-agent/pull/76439
- **[PR #76440] [P3] `/quickstart`、`/installation` 短路径重定向** — 消除文档 404（用户引导审计发现）。已关闭
  https://github.com/NousResearch/hermes-agent/pull/76440

### 🔒 安全 / 环境隔离

- **[PR #76438] [P2] Teams 插件 import 期 `.env` 泄漏修复**（salvage #62947）— 阻断 cwd 发现式 `load_dotenv` 将第三方 `.env` 注入进程全局环境，修复多 profile 密钥隔离被破坏的问题（#62935）。已关闭
  https://github.com/NousResearch/hermes-agent/pull/76438
- **[PR #62973] / [PR #62947] [P2] 插件发现期间 `os.environ` 快照与恢复** — 两条原始修复于今日关闭，与 #76438 形成完整修复链。已关闭
  https://github.com/NousResearch/hermes-agent/pull/62973 ｜ https://github.com/NousResearch/hermes-agent/pull/62947

### ✅ 今日关闭的重要 Issue（对应修复已落地）

| Issue | 标题 | 级别 | 链接 |
|---|---|---|---|
| #69551 | Desktop SSH 远程模式在非默认 profile 下损坏（token 路径校验错位） | P2 | https://github.com/NousResearch/hermes-agent/issues/69551 |
| #46260 | Windows 安装器在 desktop 阶段 npm install 失败 | P2 | https://github.com/NousResearch/hermes-agent/issues/46260 |
| #74836 | macOS 陈旧 `~/.hermes/hermes-setup` 永久破坏应用内更新 | P1 | https://github.com/NousResearch/hermes-agent/issues/74836 |
| #74942 | 更新器 PID 误判自身为「另一实例」 | P1 | https://github.com/NousResearch/hermes-agent/issues/74942 |
| #74532 | Codex 适配器将已完成 Responses 对象当 SSE 流迭代 | P2 | https://github.com/NousResearch/hermes-agent/issues/74532 |
| #74570 | pin/unpin 被 `pullRemotePins` 竞态静默回滚 | P2 | https://github.com/NousResearch/hermes-agent/issues/74570 |
| #72348 | Discord allow/deny 网关进程级共享，破坏多 profile 隔离 | P2 | https://github.com/NousResearch/hermes-agent/issues/72348 |
| #73298 | 预检 token 估算按 chars/4 计 reasoning envelope，压缩提前至实际 27% 触发 | P1 | https://github.com/NousResearch/hermes-agent/issues/73298 |

### 🚧 待合并的下一批 PR（进入下一版本候选）

- **[PR #76354] [P1] gateway 会话活动看门狗** — 会话心跳、卡死检测、有界压缩等待；干净重放 #73031（含提交阶段上限修复）。这是会话稳定性方向的重要功能。
  https://github.com/NousResearch/hermes-agent/pull/76354
- **[PR #76427] Kimi K3 专属 `reasoning_effort: max` 透传** — 修复配置 `max` 被降级为 thinking 开关的问题。https://github.com/NousResearch/hermes-agent/pull/76427
- **[PR #76428] `approvals.noninteractive_mode` 非交互审批模式** — 非 CLI/gateway/cron 上下文提供可配置的危险命令策略。https://github.com/NousResearch/hermes-agent/pull/76428
- **[PR #76432] 修复 Windows 桌面端 venv-blocker 探针崩溃导致的更新中止**。https://github.com/NousResearch/hermes-agent/pull/76432
- **[PR #76433] macOS 上 YOLO 守护进程经签名 CuaDriver.app 启动**，保留 TCC 身份。https://github.com/NousResearch/hermes-agent/pull/76433
- **[PR #70046] sudo 提示取消语义权威化**（解决 #14483，并发 sudo 竞态）。https://github.com/NousResearch/hermes-agent/pull/70046
- **[PR #76449] skills 诊断增强、非交互 `hermes tools --summary`、快照保留 skill 身份**。https://github.com/NousResearch/hermes-agent/pull/76449
- **[PR #76454] Telegram 保留显式话题标题**，不再被自动重命名覆盖。https://github.com/NousResearch/hermes-agent/pull/76454

---

## 4. 社区热点

今日讨论最活跃的议题（按评论数排序），背后诉求清晰指向**互操作性、成本与稳定性**：

- **[Issue #514] A2A（Agent-to-Agent）协议支持** — 25 评论 / 28 👍（全榜最高赞）。用户希望引入 Linux 基金会 A2A 标准，让 agent 之间可发现、可通信、可互操作，作为 MCP（"what tools can I use?"）的补充（"who can help me?"）。这是明显的路线图级信号。
  https://github.com/NousResearch/hermes-agent/issues/514
- **[Issue #4379] Token 开销分析：73% 为固定开销（约 13.9K tokens/次）** — 20 评论。用户自建监控面板，实测 6 份会话转储后指出每次 API 调用近四分之三是固定 overhead，直接推高使用成本，等待决策（needs-decision）。
  https://github.com/NousResearch/hermes-agent/issues/4379
- **[Issue #64231] 插件生命周期事件目录与钩子批量处置** — 15 评论。社区/维护者提出以一份文档化的 hook 分类法一次性裁决十余个零散 `VALID_HOOKS` PR，避免腐烂或盲目合入。
  https://github.com/NousResearch/hermes-agent/issues/64231
- **[Issue #4505] Ollama 集成优化：原生 `/api/chat` vs OpenAI 兼容端点** — 15 评论 / 4 👍。原生端点提供真正的 delta 流式，用户期待显著性能收益。
  https://github.com/NousResearch/hermes-agent/issues/4505
- **[Issue #69078] xAI grok-4.5 'Invalid PNG image' 400 永久砖化会话** — 13 评论。一个会让整个会话「永久报废」的严重 bug，社区高度关注。
  https://github.com/NousResearch/hermes-agent/issues/69078
- **[Issue #20859] 支持 Mistral 作为 LLM provider** — 11 评论 / 24 👍，仅次于 A2A。用户指出 Mistral 用户规模大于部分已支持厂商，且语音模型已接入，LLM 接入难度应不高。
  https://github.com/NousResearch/hermes-agent/issues/20859
- **[Issue #40347] 俄语本地化（含安装器）** — 10 评论，8-01 刚更新 v2：99% UI 字符串已翻译并有对应 PR。连同 #52137（8 评论），非英语用户诉求正在累积。
  https://github.com/NousResearch/hermes-agent/issues/40347 ｜ https://github.com/NousResearch/hermes-agent/issues/52137
- **[Issue #69551] Desktop SSH 远程模式在非默认 profile 下损坏** — 12 评论，已闭环关闭，社区对多 profile 场景的配置一致性敏感。
  https://github.com/NousResearch/hermes-agent/issues/69551

---

## 5. Bug 与稳定性

今日报告/活跃的 Bug 按严重程度排列：

### 🔴 P1（严重）

- **[Issue #37968] cron 网关审批受环境变量污染** — OPEN，needs-decision。CVSS v3.1 6.3 / v4.0 7.0（High），涉及审批安全边界，需尽快决策修复方案。
  https://github.com/NousResearch/hermes-agent/issues/37968
- **[PR #76447] 非 UTF-8 写入损坏 + 符号链接数据丢失** — 已修复（见进展）。
  https://github.com/NousResearch/hermes-agent/pull/76447
- **[PR #76437] 无 key 安装引导进死胡同聊天** — 已修复。
  https://github.com/NousResearch/hermes-agent/pull/76437
- 更新链路三连 bug（#74836 陈旧 binary / #74942 PID 误判 / #74531 更新循环）— 均已关闭；macOS 更新链路是近期高发区。
  https://github.com/NousResearch/hermes-agent/issues/74836 ｜ https://github.com/NousResearch/hermes-agent/issues/74942 ｜ https://github.com/NousResearch/hermes-agent/issues/74531

### 🟠 P2（中等）

- **[Issue #69078] xAI grok-4.5 图片 400 永久砖化会话** — OPEN，**尚无对应 fix PR**。非重试 400 使整个 session（含纯文本轮次）永久失败，重启无法恢复，只能删除会话。sweeper 标记 `risk-session-state`。
  https://github.com/NousResearch/hermes-agent/issues/69078
- **[Issue #75670] 更新后 TUI 因 node_modules 完整性未校验而失败** — OPEN，7-31 新报。
  https://github.com/NousResearch/hermes-agent/issues/75670
- **[Issue #53819] kanban DB 高并发下损坏** — OPEN，根因已确认：多 worker 进程未串行化 SQLite 写导致 `idx_events_task` 条目错乱。
  https://github.com/NousResearch/hermes-agent/issues/53819
- **[Issue #52010] macOS 每次更新后 Full Disk Access 被撤销** — OPEN，与已知的 Accessibility/Microphone 问题（#43365/#43788）相互独立。
  https://github.com/NousResearch/hermes-agent/issues/52010
- 已闭环：**#73298**（预检 token 估算偏差，P1）、**#74570**（pin 竞态）、**#72348**（Discord profile 隔离）、**#46260**（Windows 安装器）。

### 🟡 P3（较低）

- **[Issue #66616] skills-index 过期（degraded）** — bot 探针报告索引 29.8h 未更新（阈值 26h），属自动化监控发现的轻度问题。
  https://github.com/NousResearch/hermes-agent/issues/66616
- **[Issue #2788] cron 任务从不执行或失败无记录** — 已挂起 4 个月（3-24 创建），影响面较大但无进展。
  https://github.com/NousResearch/hermes-agent/issues/2788
- **[Issue #49529] PyPI wheel 安装 doctor 误报 + 可选 skills 缺失** — 已标记 `wontfix`，建议用户关注下个 wheel 版本。
  https://github.com/NousResearch/hermes-agent/issues/49529

---

## 6. 功能请求与路线图信号

- **A2A 协议（#514，28 👍）**：当前社区第一诉求。已有明确标准（Apache 2.0 / Linux Foundation），与 MCP 互补。暂无对应 PR，但从点赞趋势看是下一阶段互操作方向的最强候选。
  https://github.com/NousResearch/hermes-agent/issues/514
- **Mistral provider（#20859，24 👍）**：高赞但未排期。语音已支持，LLM 接入成本低，预期有较大概率进入后续版本。
  https://github.com/NousResearch/hermes-agent/issues/20859
- **温度参数可配置（#17565，13 👍）**：当前温度由 `_fixed_temperature_for_model()` 硬编码，用户反馈引发严重幻觉问题。属于低改动量、高用户价值的小功能。
  https://github.com/NousResearch/hermes-agent/issues/17565
- **俄语本地化（#40347 + #52137）**：#40347 已更新为「99% 翻译完成 + 已提交 PR」，若 PR 通过将被纳入桌面端第三语言。
  https://github.com/NousResearch/hermes-agent/issues/40347
- **`delegate_task` 每任务模型/提供商覆盖（#5012 + #18591）**：两条均已关闭（后者为 duplicate），提示该需求已被维护者受理或整合，值得关注后续实现。
  https://github.com/NousResearch/hermes-agent/issues/5012 ｜ https://github.com/NousResearch/hermes-agent/issues/18591
- **MLX Whisper 本地 STT（#3491）**：macOS Apple Silicon 用户希望免去 `faster-whisper` 中转，P4 低优先级但仍开放。
  https://github.com/NousResearch/hermes-agent/issues/3491
- **今日进入 PR 阶段的新功能**（下一版本候选）：gateway 会话看门狗（#76354）、非交互审批模式（#76428）、Kimi K3 `reasoning_effort: max` 透传（#76427）、Telegram 显式话题标题保留（#76454）、skills 诊断增强（#76449）。这些 PR 反映项目正同时推进**会话稳定性、审批安全、模型参数透传、插件治理**四条线。

---

## 7. 用户反馈摘要

从今日 Issue 讨论中提炼的真实用户声音：

- **成本焦虑是硬痛点**：「每次 API 调用 73% 是固定开销（~13.9K tokens）」——用户 @Bichev 为量化问题自建了监控仪表盘（hermes-dashboard），并给出逐步优化建议。此类"用户自带数据"的报告质量很高，值得维护者优先回应。
  https://github.com/NousResearch/hermes-agent/issues/4379
- **会话被永久砖化的无助感**：@paultaki 描述 xAI 报错后"任何 API 调用都失败、重启无效、唯一恢复方式是删除会话"。session 状态安全性是当前用户信任的关键短板。
  https://github.com/NousResearch/hermes-agent/issues/69078
- **更新机制反复消磨信任**：macOS 陈旧 binary、PID 误判、"另一个更新正在进行"死循环、FDA 权限被撤销、Windows 安装器失败、TUI node_modules 损坏——单日出现 6+ 条更新链路相关反馈，说明**跨平台更新管线需要一次系统性加固**。
  https://github.com/NousResearch/hermes-agent/issues/74836 ｜ https://github.com/NousResearch/hermes-agent/issues/52010 ｜ https://github.com/NousResearch/hermes-agent/issues/75670
- **cron 可靠性痛点**：「昨天创建的 cron 任务今天就没跑，失败也不留任何有用信息」（#2788）——对自动化用户是核心功能失效。
- **对灵活性的明确期待**：Mistral 支持（"用户规模比部分已支持厂商都大"）、Ollama 原生端点对比（"真实 delta 流式"）、温度可调（"硬编码导致幻觉"）、每任务模型覆盖（"应对 Zhipu GLM 等严格限流"）——用户希望 Hermes 在模型层更加开放可控。
- **修复速度获得认可**：@teknium1 今日批量关闭的审计修复（数据丢失、错误替换）均附有"在主分支上实机复现"的细节，这种修复质量与透明度获得了正面关注。

---

## 8. 待处理积压

### ⏳ 长期未响应的重要 Issue

| Issue | 创建时间 | 状态 | 说明 |
|---|---|---|---|
| [#514] A2A 协议支持（28 👍） | 2026-03-06 | OPEN | 5 个月无 PR，社区热度最高 |
| [#4379] Token 73% 固定开销 | 2026-04-01 | OPEN, needs-decision | 4 个月，直接影响用户成本 |
| [#4505] Ollama 原生 API 优化 | 2026-04-01 | OPEN, needs-decision | 4 个月，性能优化明确 |
| [#2788] Cron 任务静默失败 | 2026-03-24 | OPEN | 4 个月，核心自动化功能可靠性 |
| [#3491] MLX Whisper 本地 STT | 2026-03-28 | OPEN | 4 个月，Apple Silicon 用户等待 |
| [#17565] 温度参数可配置（13 👍） | 2026-04-29 | OPEN | 3 个月，改动量小、价值高 |
| [#20859] Mistral 支持（24 👍） | 2026-05-06 | OPEN | 3 个月，第二高赞功能请求 |
| [#37968] cron 审批环境污染（P1） | 2026-06-03 | OPEN, needs-decision | 2 个月，安全级别 P1，建议尽快决策 |
| [#64231] 插件钩子目录化批量处置 | 2026-07-14 | OPEN, needs-decision | 2.5 周，15 评论，关联"待合并 PR 积压"问题 |

### ⚠️ 需要维护者关注的信号

- **385 条待合并 PR 积压**：与 #64231 描述的"一打互不相关的 `VALID_HOOKS` 单点 PR 等待裁决"互相印证。建议通过生命周期事件目录 + 分类法批量分流，防止 PR 腐烂。
  https://github.com/NousResearch/hermes-agent/issues/64231
- **#69078（xAI 会话砖化）虽然只有 13 评论但破坏性极强**——永久丢失会话 + 无恢复手段，作为 P2 已挂起 10 天，建议提升优先级并确认是否有配套 image-recovery matcher 修复。
  https://github.com/NousResearch/hermes-agent/issues/69078
- **多个高赞功能（A2A、Mistral）停留在 needs-decision**：这类"社区高期待 + 无维护者回应"的组合长期存在会积累失望情绪，建议给出明确的 roadmap 承诺或暂缓说明。

---

*报告生成时间：2026-08-02 ｜ 数据口径：GitHub Issues/PRs 过去 24 小时更新 ｜ 项目仓库：https://github.com/NousResearch/hermes-agent*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-08-02

## 1. 今日速览

今日项目活跃度高，24小时内共有9条Issue更新（新开7条、关闭2条）和12条PR更新（待合并7条、合并/关闭5条），无新版本发布。核心进展集中在三大主线：一是OpenAI `/responses` API支持（#5051）和扩展/人格管理统一（#9499）两项大型PR合并落地，架构层面有显著推进；二是修复了TTS回退管线中断、ChatUI输入框遮挡、工具图片缓存目录被删等多个具体问题；三是社区反馈主要集中在AI工具重复调用、Embedding维度被覆盖、QQ消息丢失等实际使用痛点，Bug修复请求多于纯功能需求，整体项目处于快速迭代与问题收敛并行的健康状态。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日共有5个PR被合并或关闭，其中包含多项重大架构级变更，标志着项目在多个方向迈出实质性一步：

- **OpenAI `/responses` API 支持（#5051 已合并）**：[PR链接](https://github.com/AstrBotDevs/AstrBot/pull/5051)。该PR历经近6个月（2月11日创建）后于今日合并，为项目接入OpenAI `/responses` API，提供更统一的对话、推理和工具调用能力，并利用原生compact接口实现更高效的上下文压缩。这将显著增强对OpenAI系模型的兼容性和上下文管理效率。
- **统一扩展与人格管理架构（#9499 已合并）**：[PR链接](https://github.com/AstrBotDevs/AstrBot/pull/9499)。将插件管理、应用市场、MCP、Skills和行为管理整合为路由标签页工作区，避免页面全部挂载；同时为插件、MCP服务、工具和Skills提供更清晰的全局状态与来源元数据展示。这是一次面向WebUI体验和扩展生态的大规模重构。
- **简化Updater架构（#9493 已合并）**：[PR链接](https://github.com/AstrBotDevs/AstrBot/pull/9493)。将AstrBot Core和Dashboard的更新流程统一为高层工作流（下载→验证→应用），并将Dashboard资源管理和重启行为拆分为独立模块，同时修正了代码库中`updator`命名不一致问题。降低了更新模块的维护成本。
- **修复ChatUI输入框行为（#9496 已合并）**：[PR链接](https://github.com/AstrBotDevs/AstrBot/pull/9496)。为输入框预留消息列表空间，避免展开的文本、回复和附件遮挡对话内容；同时将超过10,000字符的粘贴文本自动转为UTF-8 `.txt`附件，并柔化浅色主题下输入框阴影。直接回应了Issue #9478中用户报告的输入框遮挡问题。
- **修复TTS回退后管线中断（#9166 已合并）**：[PR链接](https://github.com/AstrBotDevs/AstrBot/pull/9166)。该PR（7月6日创建，今日合并）修复了`ResultDecorateStage.process()`异步生成器在TTS失败时未yield回退文本，导致后续`RespondStage`无法执行的问题。注意：#9495为该问题的另一修复方案，目前仍处于待合并状态，与#9166构成替代关系。

## 4. 社区热点

今日讨论最活跃的Issue集中在AI调用行为异常和数据配置安全话题：

- **【热点】** [Issue #9497 [Bug] AI重复调用4次工具（3条评论）](https://github.com/AstrBotDevs/AstrBot/issues/9497)：报告在Mattermost平台上AI正常调用工具时重复执行4次。该Issues为昨日新开即获得3条评论，说明影响面可能较广，且目前无法确定是平台适配器问题还是核心调度逻辑问题，社区关注度高。同类问题此前也有零散报告，可能需要维护者重点排查。
- **【热点】** [Issue #9489 [Bug] 控制台自动检测Embedding维度时覆写用户显式配置（3条评论）](https://github.com/AstrBotDevs/AstrBot/issues/9489)：新版本(v4.26.0+)中`ConfigService.get_embedding_dimension`会向服务商发起无维度约束的测试请求，并将返回的默认维度无条件覆写到用户配置中，导致已建立的FAISS知识库因维度不匹配而崩溃。该问题触及知识库数据安全性，用户反馈强烈，目前已在今日关闭，疑已修复。
- **【关注】** [Issue #9474 WebChat超长会话在升级后不显示在新版UI对话记录中（2条评论）](https://github.com/AstrBotDevs/AstrBot/issues/9474)：用户报告升级后两个月、16,078条消息的会话在新版WebUI中消失，但数据库中数据完整。这让用户对升级造成数据不可见的焦虑较高，评论区可能有维护者指引，但Issue仍处于开放状态，建议尽快给出明确恢复方案。

## 5. Bug 与稳定性

今日共报告7个Bug类Issue，按严重程度排列如下：

| 严重程度 | Issue | 问题描述 | 修复状态 |
|---------|-------|---------|---------|
| 🔴 严重 | [#9489 Embedding维度被静默覆写](https://github.com/AstrBotDevs/AstrBot/issues/9489) | 自动检测维度时覆写用户显式配置，导致已建立的FAISS知识库检索时抛`ValueError`，数据无法使用 | 已关闭（今日） |
| 🟠 较高 | [#9474 超长会话升级后不出现在新版UI记录中](https://github.com/AstrBotDevs/AstrBot/issues/9474) | 16,078条消息的会话在升级后在WebUI不可见，数据未丢失但不可访问 | 开放中 |
| 🟠 较高 | [#9497 AI重复调用工具4次](https://github.com/AstrBotDevs/AstrBot/issues/9497) | Mattermost平台上正常调用AI工具时重复执行4次 | 开放中，无PR |
| 🟡 中等 | [#9299 QQ群聊回复消息前几个字消失](https://github.com/AstrBotDevs/AstrBot/issues/9299) | QQ官方机器人（Websocket）群聊中首字缺失，单聊正常；追踪数据完整，疑为平台发送编码问题 | 开放中，已存在约两周，无PR |
| 🟡 中等 | [#9492 插件TTS同时输出时文字引用失效](https://github.com/AstrBotDevs/AstrBot/issues/9492) | `plugin_tts_emotion_router`开启"文字与语音同时输出"后，文字消息无法正确引用用户原消息，疑似reply_to_msg_id取错 | 开放中，无PR |
| 🟢 较轻 | [#9478 输入框过长遮挡对话信息](https://github.com/AstrBotDevs/AstrBot/issues/9478) | 输入内容过长时遮挡对话区域 | 已通过PR #9496修复 |
| 🟢 较轻 | [#9490 工具图片缓存目录被删后无法写入](https://github.com/AstrBotDevs/AstrBot/issues/9490) | Dashboard清理缓存后`tool_images`目录被删除，导致工具图片无法保存 | 已有修复PR #9490待合并 |

其中，#9489已在今日关闭，收到修复；#9478由#9496修复；#9490已有针对性的修复PR。#9497、#9299、#9492三个问题均暂无明确修复方案，建议维护者优先排查。

## 6. 功能请求与路线图信号

今日共3个功能增强请求：

- **[#9498 为`astrbot init`指令添加`-y`参数](https://github.com/AstrBotDevs/AstrBot/issues/9498)**：用户希望实现无人值守快速部署AstrBot+Napcat+Ollama，当前交互式确认阻碍了自动化部署流程。该需求贴合社区中广泛存在的"一键部署"诉求，实现成本较低（仅需增加非交互模式参数），被纳入后续版本的可能性较高。
- **[#9494 retryable error 自定义重试策略](https://github.com/AstrBotDevs/AstrBot/issues/9494)**：用户希望针对API返回429等配额限制类错误提供自定义重试策略配置。当前遇到限流时机械重试会浪费更多时间。该需求直指Provider层错误处理能力，与近期构建的Provider可观测性/可靠性改进方向一致，有望被纳入路线图。
- **[#9486 插件报错自动删除目录（1个👍）](https://github.com/AstrBotDevs/AstrBot/issues/9486)**：建议在插件安装出错时自动清理已落地的插件目录，避免残留脏数据。这是针对插件系统生态管理的细节优化，获得的👍数表明一定用户认可，但优先度可能低于前两项。

## 7. 用户反馈摘要

从今日Issues评论中可提炼以下真实用户反馈：

- **配置被静默修改引发信任危机**：[Issue #9489](https://github.com/AstrBotDevs/AstrBot/issues/9489)用户明确指出系统在保存配置时"无条件自动覆写"了用户显式设置的维度，导致已有知识库无法使用。这种静默修改用户配置的行为是用户最不希望看到的，幸好该Issue已在今日关闭，建议维护者关注此问题的修复方式及后续回归测试。
- **升级后数据不可见的焦虑**：[Issue #9474](https://github.com/AstrBotDevs/AstrBot/issues/9474)用户详细记录了升级前后数据完整性的对比（2万条消息仍在数据库中），但UI上无法访问，这属于"数据没丢但体验全丢"的典型场景，用户情绪总体克制但期待快速解决。
- **平台差异性问题困扰实际用户**：[Issue #9497](https://github.com/AstrBotDevs/AstrBot/issues/9497)用户在Mattermost平台遇到AI重复调用工具，且明确表示"其他平台没有测试"，反映了多平台适配的一致性问题；[Issue #9299](https://github.com/AstrBotDevs/AstrBot/issues/9299)QQ群聊消息首字丢失持续已久（7月16日开启），至今仍无修复，对实际群聊体验影响显著。
- **插件生态反馈**：[Issue #9492](https://github.com/AstrBotDevs/AstrBot/issues/9492)用户对插件`plugin_tts_emotion_router`的功能进行了细致测试，并给出了合理的根因推测（reply_to_msg_id取错），表明社区中存在深度使用插件的用户群体，对TTS等衍生功能的稳定性和精确性有较高要求。

## 8. 待处理积压

- **[Issue #9299 QQ机器人群聊消息前几个字消失（开放中，自7月16日）](https://github.com/AstrBotDevs/AstrBot/issues/9299)**：已存在超过两周，仅1条评论，长期无维护者回复。该问题影响QQ官方机器人用户的日常群聊使用体验，属于实际功能性Bug，建议维护者尽快排查是否为平台API消息分片问题。
- **[PR #5051 OpenAI /responses支持（已合并，但开发周期近6个月）](https://github.com/AstrBotDevs/AstrBot/pull/5051)**：虽然已于今日合并，但从2月11日创建到今日关闭，跨度漫长（约5个半月）。大型PR长期未能合并可能反映维护者审查资源紧张或争议较多，建议后续对该PR的使用效果进行跟踪验证。
- **[PR #9166 与 #9495 TTS回退修复双PR并存](https://github.com/AstrBotDevs/AstrBot/pull/9495)**：#9166已合并、#9495仍开放，两者解决同一问题（Fixes #9131）。建议维护者明确#9495的处置方案（关闭或补充变更），避免重复PR堆积和社区混淆。
- **[Issue #9474 升级后WebChat会话不可见（开放中，自7月30日）](https://github.com/AstrBotDevs/AstrBot/issues/9474)**：涉及版本升级的数据兼容性问题，目前暂无修复PR。考虑到用户数据体量大、影响时间长（会话跨近两个月），建议优先处理并为受影响用户提供数据迁移或恢复指引。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*