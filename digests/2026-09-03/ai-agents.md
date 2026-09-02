# OpenClaw 生态日报 2026-09-03

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-09-02 23:40 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-09-03

## 1. 今日速览

过去24小时项目保持极高活跃度：共产生500条Issue更新（新开/活跃328条，关闭172条）和500条PR更新（待合并293条，已合并/关闭207条）。当前无新版本发布，项目处于版本准备期。值得关注的是，大量P1级Bug集中在会话状态（session-state）与消息丢失（message-loss）领域，且多数处于"无新修复PR"（no-new-fix-pr）状态，表明核心稳定性问题仍是社区与维护者关注焦点。PR侧则呈现密集修复态势，多个XL级PR（如会话维护、CLI历史、插件钩子可见性）正在推进中，项目整体处于"高活跃、高积压、修复密集"的健康但承压状态。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

过去24小时共有207条PR被合并或关闭，以下为值得关注的重要变更：

### 已合并/关闭的PR

- **[fix(codex): avoid stale ancestor binaries during managed startup](https://github.com/openclaw/openclaw/pull/136655)**（已关闭）— 修复托管Codex会话启动时可能运行过期祖先二进制文件的问题，与Windows升级/运行时调查（#136203）相关，属于独立复现的所有权Bug修复。

### 待合并的重要PR（今日活跃推进）

- **[fix(sessions): preserve conversations under maintenance pressure](https://github.com/openclaw/openclaw/pull/136639)** — 关闭#127970，修复归档会话饱和可能驱逐所有合格活动会话的问题。旧的500条上限被替换为更安全的保留策略，保护用户可恢复会话。状态：👀 待维护者查看。
- **[fix(sessions): archive stale sessions when entry cap is reached](https://github.com/openclaw/openclaw/pull/133366)** — 将超限会话从永久删除改为归档，保留搜索与恢复能力，并为每代理磁盘预算设置安全保留边界。状态：👀 待维护者查看。
- **[fix(telegram): prioritize finals over CLI commentary](https://github.com/openclaw/openclaw/pull/134826)** — 修复#134697，Claude CLI压缩时无可见进度，而冗长的CLI注释可能将持久化Telegram消息排在最终回复之前。状态：👀 待维护者查看。
- **[fix(a2a): reject peer control commands and approvals](https://github.com/openclaw/openclaw/pull/136726)** — 安全修复：防止经过认证的A2A对等方被视为OpenClaw操作员，控制命令尝试现在以可见的拒绝任务结束。状态：👀 待维护者查看。
- **[fix(cli): reject unknown proxy query presets](https://github.com/openclaw/openclaw/pull/136158)** — 修复`openclaw proxy query --preset error-burst --json`接受拼写错误的预设并静默返回空结果的问题。状态：待维护者查看。
- **[fix: CLI history returns newest messages for missing anchors](https://github.com/openclaw/openclaw/pull/136720)** — 修复用户锚点缺失时CLI历史返回错误消息的问题。状态：👀 待维护者查看。

**整体评估**：项目在会话数据保留、消息投递优先级、安全边界三个方向上有明确进展。特别是会话维护相关的两个PR（#136639、#133366）若合并，将显著改善用户数据安全与恢复体验。

---

## 4. 社区热点

### 最热Issue TOP3

1. **[#116201 Realtime voice work can retain unbounded provider and consult state](https://github.com/openclaw/openclaw/issues/116201)** — 评论59条，👍0
   - 实时语音会话在慢速/停滞/突发提供商行为下，资源限制以条目计数或取消信号而非硬所有权边界表达，导致过期的咨询工作、大型提供商帧、预就绪音频等被无限保留。
   - **诉求**：社区对实时语音会话的资源边界设计高度关注，期望更严格的所有权约束。

2. **[#44925 Subagent completion silently lost — no retry, no notification, no auto-restart on timeout](https://github.com/openclaw/openclaw/issues/44925)** — 评论26条，👍2
   - 子代理任务编排存在多种静默丢失结果的故障模式：完成通知失败、直接投递超时、条件队列回退失败后无重试、无通知、无自动重启。
   - **诉求**：用户对子代理结果可靠性有强烈需求，期望至少有一次重试和明确的通知机制。

3. **[#42475 Per-agent cost budget enforcement at the gateway level](https://github.com/openclaw/openclaw/issues/42475)** — 评论22条，👍1
   - 请求在网关级别增加每代理成本预算（日/月上限），在调度模型调用前强制执行，防止失控支出。
   - **诉求**：多代理部署场景下，运维人员需要更精细的成本控制手段。

### 最热PR TOP3

1. **[#135889 feat(cron): run provenance, job kinds, agentTurn token budget, typed completion causes](https://github.com/openclaw/openclaw/pull/135889)** — 评论数未显示，👍0
   - 为运行日志和Control UI自动化页面增加运行来源、作业类型、下次运行时间、成本、停止原因等操作员真正关心的信息。
   - **信号**：社区对可观测性的需求正在从"能否运行"转向"为何停止、花了多少钱"。

2. **[#136639 fix(sessions): preserve conversations under maintenance pressure](https://github.com/openclaw/openclaw/pull/136639)** — 评论数未显示
   - 修复自动会话维护达到容量/年龄截止时用户丢失可恢复会话的问题。
   - **信号**：会话数据安全是社区高度关注的核心问题。

3. **[#134826 fix(telegram): prioritize finals over CLI commentary](https://github.com/openclaw/openclaw/pull/134826)** — 评论数未显示
   - 修复Claude CLI压缩时无可见进度，CLI注释消息排在最终回复之前的问题。
   - **信号**：Telegram渠道的消息投递顺序问题直接影响用户体验。

---

## 5. Bug 与稳定性

### P0 严重

- **[#91009 Codex PreToolUse native hook relay spawns CPU-bound openclaw-hooks processes and stalls gateway RPC](https://github.com/openclaw/openclaw/issues/91009)** — P0，评论21，👍2
  - Codex集成中工具调用可生成多个短生命周期`openclaw-hooks`进程，每个消耗~100%+ CPU，导致网关RPC停滞。创建于2026-06-06，至今无修复PR。
  - **状态**：无修复PR，需维护者紧急关注。

### P1 高严重（无修复PR）

- **[#44925 Subagent completion silently lost](https://github.com/openclaw/openclaw/issues/44925)** — 评论26，👍2，创建于2026-03-13，已积压近6个月。
- **[#87744 Codex-backed Telegram turns repeatedly time out](https://github.com/openclaw/openclaw/issues/87744)** — 评论17，👍4，创建于2026-05-28。
- **[#115908 Session transcript projection reconcile can livelock](https://github.com/openclaw/openclaw/issues/115908)** — 评论14，创建于2026-07-29，持续写入下主线程阻塞，所有通道传输停滞。
- **[#85030 MCP tools not injected into subagent sessions](https://github.com/openclaw/openclaw/issues/85030)** — 评论13，👍6，创建于2026-05-21，MCP工具未注入子代理会话。
- **[#126360 AgentSelectionRequiredError floods logs under explicit multi-agent ownership](https://github.com/openclaw/openclaw/issues/126360)** — 评论12，创建于2026-08-19。
- **[#86215 Codex OAuth refresh failures can wedge an agent for hours](https://github.com/openclaw/openclaw/issues/86215)** — 评论11，👍1，创建于2026-05-24。
- **[#84516 Codex app-server: long agent replies silently truncated at ~1000-1100 chars](https://github.com/openclaw/openclaw/issues/84516)** — 评论12，👍2，创建于2026-05-20。
- **[#115424 Gateway V8 heap OOM during main-session turn](https://github.com/openclaw/openclaw/issues/115424)** — 评论7，OOM后重启恢复将一次崩溃变成7次核心转储循环。
- **[#134570 After upgrading to 2026.8.1: gateway crash-loop and silent dispatch failures](https://github.com/openclaw/openclaw/issues/134570)** — 评论6，👍1，升级后7个独立阻塞问题，误导性错误消息。

### P1 已有修复PR

- **[#127229 telegram: watchdog-released durable update is falsely tombstoned](https://github.com/openclaw/openclaw/issues/127229)** — 评论10，已有修复方向。
- **[#118185 One claude-cli turn is written to the transcript twice](https://github.com/openclaw/openclaw/issues/118185)** — 评论7，已有修复方向。
- **[#120735 Telegram inbound stickers arrive as raw file refs](https://github.com/openclaw/openclaw/issues/120735)** — 评论8，已有修复PR链接。

### 新报告Bug（2026-09-02创建）

- **[#135835 API key 耗尽充值后无法恢复](https://github.com/openclaw/openclaw/issues/135835)** — 评论8，中文用户报告2026.8.1版本token额度用完后充值无法恢复对话，标记为`fix-shape-clear`和`queueable-fix`，已有明确修复方向。

---

## 6. 功能请求与路线图信号

### 高潜力功能请求

1. **[#42475 Per-agent cost budget enforcement at the gateway level](https://github.com/openclaw/openclaw/issues/42475)** — 评论22，👍1
   - 每代理成本预算（日/月上限），网关级别强制执行。多代理部署场景的刚需，已有`session-cost-usage.ts`基础，实现成本可控。

2. **[#96675 Owner-signed responsibility gates for assistant memory, actions, skills, and evidence reuse](https://github.com/openclaw/openclaw/issues/96675)** — 评论9，👍2
   - 所有者确认门控：助手输出、技能结果、记忆不能成为持久记忆/规则/可复用证据，除非用户明确审查。个人AI助手隐私与安全方向的重要信号。

3. **[#16555 Add TTL/Expiry for Delivery Queue Messages](https://github.com/openclaw/openclaw/issues/16555)** — 评论7，创建于2026-02-14
   - 为投递队列消息添加可配置TTL，防止网关重启后陈旧/孤儿条目淹没频道。长期积压但需求明确。

4. **[#33975 Fallback approval mode + model attribution in messages](https://github.com/openclaw/openclaw/issues/33975)** — 评论7
   - 主模型失败时静默回退到备用模型，用户希望有审批模式和模型归属信息。

5. **[#43564 ACP Session Skill Context Injection](https://github.com/openclaw/openclaw/issues/43564)** — 评论7，👍1
   - 将OpenClaw技能注入ACP（Codex/Pi/OpenCode/Gemini）会话上下文。

### 路线图信号

- **可观测性升级**：PR #135889（cron运行来源、作业类型、token预算、类型化完成原因）和PR #136474（插件钩子注册可见性）表明项目正在系统性地提升运维可观测性。
- **会话数据安全**：PR #136639和#133366共同指向会话维护策略的全面重构，从"删除"转向"归档+保留"。
- **安全边界收紧**：PR #136726（A2A对等方控制命令拒绝）显示多代理/多协议场景下的安全策略正在加强。

---

## 7. 用户反馈摘要

### 真实用户痛点

1. **升级体验问题突出**：
   - [#134570](https://github.com/openclaw/openclaw/issues/134570)：用户从2026.6.x升级到2026.8.1后遭遇网关崩溃循环和静默调度失败，报告"7个独立阻塞问题，误导性错误消息"。
   - [#134353](https://github.com/openclaw/openclaw/issues/134353)：Xiaomi提供商在2026.7.1-2 → 2026.8.1升级后留下空安装负载，网关拒绝启动。
   - [#134608](https://github.com/openclaw/openclaw/issues/134608)：2026.8.1认证迁移归档JSON并写入成功回执但不含凭据，永久阻塞修复。

2. **资源泄漏与性能退化**：
   - [#97616](https://github.com/openclaw/openclaw/issues/97616)：钩子/工具子进程泄漏导致僵尸进程积累和运行时退化。
   - [#125344](https://github.com/openclaw/openclaw/issues/125344)：memory-core本地嵌入工作进程和codex应用服务器无空闲TTL，扼杀网关cgroup。
   - [#84983](https://github.com/openclaw/openclaw/issues/84983)：单个cron任务可使网关事件循环饱和，所有聊天传输数分钟无响应。

3. **消息丢失与投递问题**：
   - [#44925](https://github.com/openclaw/openclaw/issues/44925)：子代理完成结果静默丢失，无重试、无通知、无自动重启。
   - [#96692](https://github.com/openclaw/openclaw/issues/96692)：Slack线程回复已生成但未投递，原始投递元组丢失。
   - [#120735](https://github.com/openclaw/openclaw/issues/120735)：Telegram贴纸到达为原始文件引用，无描述且未暂存到磁盘，代理无法查看。

4. **多代理/多租户场景的混乱**：
   - [#126360](https://github.com/openclaw/openclaw/issues/126360)：显式多代理所有权下AgentSelectionRequiredError洪水般刷日志。
   - [#53783](https://github.com/openclaw/openclaw/issues/53783)：Telegram群组中跨代理会话列表可见性不匹配导致单向发送失败。
   - [#65374](https://github.com/openclaw/openclaw/issues/65374)：内置梦境系统在多代理设置中污染代理身份，跨代理记忆池化。

5. **中文用户反馈**：
   - [#135835](https://github.com/openclaw/openclaw/issues/135835)：API key额度耗尽充值后无法恢复对话，重启服务和电脑均无效，用户明确表示"昨天刚升级的2026.8.1版本出现的"。

### 用户满意度信号

- 正面：PR #136639和#133366获得维护者积极回应，会话保留策略改进方向正确。
- 负面：多个长期积压的P1问题（如#44925积压近6个月、#16555积压超6个月）未获修复，用户可能对维护响应速度产生疑虑。

---

## 8. 待处理积压

### 长期未响应的关键Issue

1. **[#16555 Add TTL/Expiry for Delivery Queue Messages](https://github.com/openclaw/openclaw/issues/16555)** — 创建于2026-02-14，评论7，P1
   - 投递队列消息TTL需求，积压超6个月，无修复PR。

2. **[#44925 Subagent completion silently lost](https://github.com/openclaw/openclaw/issues/44925)** — 创建于2026-03-13，评论26，👍2，P1
   - 子代理完成静默丢失，积压近6个月，无修复PR，社区关注度高。

3. **[#46786 tools.elevated.enabled: true breaks exec routing logic](https://github.com/openclaw/openclaw/issues/46786)** — 创建于2026-03-15，评论9，👍1，P1
   - 启用提权工具后所有exec调用路由到网关主机而非沙箱，安全相关，无修复PR。

4. **[#53408 Write/exec tool parameters silently dropped after long conversations](https://github.com/openclaw/openclaw/issues/53408)** — 创建于2026-03-24，评论11，👍2，P1
   - 长对话后工具参数静默丢失，影响核心功能，无修复PR。

5. **[#65374 Built-in dreaming system contaminates agent identity in multi-agent setups](https://github.com/openclaw/openclaw/issues/65374)** — 创建于2026-04-12，评论9，👍2，P1
   - 梦境系统跨代理污染身份，安全相关，无修复PR。

6. **[#85030 MCP tools not injected into subagent sessions](https://github.com/openclaw/openclaw/issues/85030)** — 创建于2026-05-21，评论13，👍6，P1
   - MCP工具未注入子代理会话，社区关注度高（👍6），无修复PR。

7. **[#91009 Codex PreToolUse native hook relay spawns CPU-bound processes](https://github.com/openclaw/openclaw/issues/91009)** — 创建于2026-06-06，评论21，👍2，P0
   - P0级问题，CPU耗尽+网关RPC停滞，无修复PR，需紧急关注。

### 长期未合并的重要PR

1. **[#112641 fix(sessions): enforce maxEntries/maxDiskBytes against durable conversation entries](https://github.com/openclaw/openclaw/pull/112641)** — 创建于2026-07-22，状态：📣 needs proof
   - 会话容量强制执行的修复，已开放超1个月，等待验证。

2. **[#120881 fix(config): route legacy migrations through doctor](https://github.com/openclaw/openclaw/pull/120881)** — 创建于2026-08-09，状态：⏳ waiting on author
   - 配置加载时静默执行遗留迁移的问题修复，等待作者更新。

3. **[#120902 fix(ai): parse trailing ChatGPT Responses SSE frame at EOF](https://github.com/openclaw/openclaw/pull/120902)** — 创建于2026-08-09，状态：⏳ waiting on author
   - ChatGPT SSE解析器在EOF时丢弃尾部帧的问题修复，等待作者更新。

---

**总结**：OpenClaw项目当前处于高活跃度、高积压状态。PR侧密集推进会话数据安全、可观测性和安全边界改进，方向正确。但Issue侧多个P0/P1级核心稳定性问题（子代理结果丢失、MCP工具注入、资源泄漏、升级迁移故障）长期无修复PR，且2026.8.1版本升级暴露的多个回归问题（#134570、#134353、#134608）可能影响用户信任。建议维护者优先处理P0级#91009和升级回归问题群，并关注社区高赞的#85030和#44925。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告

**报告日期：2026-09-03 | 数据来源：各项目 GitHub 社区动态**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**高活跃、双速分化**阶段：OpenClaw 与 hermes-agent 以每日各 500 条 Issue/PR 更新的体量构成第一梯队，但均面临显著合并积压（293/363 条待合并 PR）；Zeroclaw 与 QwenPaw 处于架构演进或快速迭代期，前者深陷 RFC 决策长周期，后者以 beta 版本高频发布验证新功能。跨项目涌现的共性痛点高度一致——**会话数据可靠性、多 agent 任务可观测性、安全边界收紧、成本治理**——表明生态已从"能否跑通"进入"能否长期稳定、可控、可审计地运行"的成熟化阶段。值得警惕的是，多个 P0/S0 级数据丢失与安全绕过问题（OpenClaw #91009、Zeroclaw #10495、QwenPaw #7447）长期无修复 PR，稳定性仍是全生态最大挑战。

---

## 2. 各项目活跃度对比

| 项目 | Issue 更新（新开/活跃） | PR 更新（待合并） | Release | 健康度评估 |
|------|------------------------|-------------------|---------|------------|
| **OpenClaw** | 500（328 新/172 关） | 500（293 待/207 合） | 无 | 高活跃、高积压、修复密集；P0 级 #91009 无修复 PR，承压运行 |
| **hermes-agent** | 500（282 新/218 关） | 500（363 待/137 合） | 无 | 极高活跃但合并瓶颈明显；存储优化为主线，12 个 P1 级 Bug 多数无修复 |
| **Zeroclaw** | 50（35 新/15 关） | 50（45 待/5 合） | 无 | 架构重构深水区；2 个 S0 级 Bug 待处理，合并吞吐偏低 |
| **QwenPaw** | 26（17 新/9 关） | 40（27 待/13 合） | **v2.2.0-beta.7** | 健康度良好；迭代节奏快，3 个严重级 Bug 无修复 PR |
| **AstrBot** | 6（6 新/0 关） | 21（17 待/4 合） | 无 | 稳定迭代修复期；知识库修复 PR 批量待合并 |
| **PicoClaw** | 1（1 新/0 关） | 2（0 待/2 合） | 无 | 稳步迭代；QQ 频道鉴权 Bug 影响核心功能，响应需加快 |

---

## 3. OpenClaw 在生态中的定位

**社区规模第一梯队**：与 hermes-agent 并列生态最大活跃度（500+500 日更新），但合并效率更高（207 vs 137 合入），积压压力相对可控。

**核心优势——会话数据安全与渠道投递可靠性**：PR #136639/#133366 将会话维护从"删除"转向"归档+保留"，PR #134826 修复 Telegram 消息投递优先级，直击个人 AI 助手最敏感的用户数据丢失与消息乱序问题。相比之下，hermes-agent 的存储优化集中在 FTS 索引瘦身（1.13MB→0.62MB），Zeroclaw 的会话持久化仍停留在 RFC 讨论阶段（#9487 修订至第 5 版），OpenClaw 已进入实际修复落地。

**技术路线差异**：OpenClaw 采用**网关中心化架构**，强调多通道（Telegram/CLI/A2A/Codex）统一调度与安全边界（PR #136726 拒绝 A2A 对等方控制命令）；QwenPaw 侧重桌面端 UI 与记忆系统（ReMe），hermes-agent 侧重 Desktop 应用与状态存储层，Zeroclaw 则押注架构级重构（wire protocol 一等公民、沙箱策略统一）。OpenClaw 的路线更接近"**个人 AI 助手基础设施**"，而非单一客户端或框架。

**短板**：P0 级 CPU 耗尽问题（#91009）积压近 3 个月无修复 PR，2026.8.1 升级回归问题群（#134570/#134353/#134608）可能侵蚀用户信任，需警惕被 hermes-agent 在稳定性口碑上反超。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|----------|----------|----------|
| **会话/数据可靠性** | OpenClaw、Zeroclaw、hermes-agent、QwenPaw | 会话归档而非删除（OpenClaw #136639/#133366）；会话持久化契约所有权（Zeroclaw #9487/#9600）；state.db 反复损坏与无界增长（hermes-agent #90837/#54189/#89737）；长上下文压缩后早期记录丢失（QwenPaw #7447） |
| **多 agent 任务可观测性** | OpenClaw、QwenPaw、Zeroclaw | 子代理完成结果静默丢失、无重试无通知（OpenClaw #44925，积压近 6 个月）；主 agent 不主动查询子 agent 进度（QwenPaw #7450）；delegate 子代理进度对父 agent 不可见（Zeroclaw #10531） |
| **安全边界收紧** | OpenClaw、Zeroclaw、QwenPaw | A2A 对等方控制命令拒绝（OpenClaw #136726）；delegate 绕过 `block_high_risk_commands`（Zeroclaw #10165，S0）；危险指令可绕过审查（QwenPaw #7443） |
| **成本治理与计费精度** | OpenClaw、hermes-agent、AstrBot | 网关级每代理成本预算（OpenClaw #42475）；Claude 订阅 OAuth 避免双重付费（hermes-agent #25267，53👍）；Gemini/Anthropic 缓存 token 计费修正（AstrBot #9880/#9881） |
| **存储/索引优化** | hermes-agent、OpenClaw、QwenPaw | FTS trigram 索引瘦身（hermes-agent #101266/#101725，1.13MB→0.62MB）；大工具结果有界索引（hermes-agent #101720，3.20MB→0.65MB）；会话容量强制与磁盘预算（OpenClaw #112641）；embedding 维度归一化（QwenPaw #7465） |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 |
|------|----------|----------|--------------|
| **OpenClaw** | 多通道网关、会话数据安全、A2A 协议 | 追求稳定性的个人/团队深度用户 | 网关中心化，多传输层适配，会话维护策略重构中 |
| **hermes-agent** | Desktop 应用、状态存储、Claude/Codex 集成 | 桌面端重度用户、Claude 订阅用户 | 状态存储层（state.db + FTS）深度优化，Desktop 与 gateway 双端 |
| **Zeroclaw** | 架构级重构、沙箱安全、wire protocol | 开发者/架构敏感型用户 | RFC 驱动，运行时与传输层解耦，OS 沙箱后端（Bubblewrap/Landlock） |
| **QwenPaw** | 桌面 UI、记忆系统（ReMe）、多 agent 编排 | 中文用户、桌面端偏好者 | 前端体验优先，MCP/A2A/ACP 统一 Driver 路线图，beta 快速迭代 |
| **AstrBot** | 聊天机器人框架、知识库、插件市场 | 中文社区、bot 开发者 | 插件生态驱动，知识库检索后端可插拔化，i18n 完善 |
| **PicoClaw** | 轻量部署、IM 渠道（QQ） | 嵌入式/轻量场景用户 | 聚焦单渠道深度集成，工程治理契约化 |

---

## 6. 社区热度与成熟度

**第一梯队——超大规模、成熟但承压**：OpenClaw、hermes-agent。日更新 500+500，社区反馈量大，维护者响应机制已建立（大量 salvage PR 修复既有问题），但 P1 级积压均超 10 个，处于"高活跃与高负债并存"状态。

**第二梯队——快速迭代/架构演进期**：QwenPaw、Zeroclaw。QwenPaw 以 beta 版本验证功能（v2.2.0-beta.7），迭代节奏快，健康度良好；Zeroclaw 处于架构重构深水区，RFC 讨论密度高但决策周期长（#6996 已 3 个月），合并吞吐偏低（45 待合并 vs 5 合入），贡献者耐心面临考验。

**第三梯队——质量巩固期**：AstrBot、PicoClaw。AstrBot 稳定迭代，知识库修复 PR 批量提交，社区贡献者活跃；PicoClaw 活跃度低但工程治理持续改进（仓库评审契约化），QQ 频道鉴权 Bug 是当前最大短板。

---

## 7. 值得关注的趋势信号

1. **会话数据从"可删除"变为"可恢复资产"**：OpenClaw 的归档+保留策略、Zeroclaw 的会话持久化 RFC、hermes-agent 的 state.db 恢复工具链，共同指向一个趋势——**会话数据正在被当作不可丢失的用户资产来治理**。开发者应默认采用"归档而非删除"的会话生命周期策略。

2. **多 agent 编排的"黑箱"问题成为众矢之的**：子代理结果静默丢失（OpenClaw #44925）、进度不可见（QwenPaw #7450）、delegate 绕过安全配置（Zeroclaw #10165）——**子代理的失败可观测性与安全隔离**是下一阶段多 agent 框架的核心竞争点。

3. **成本治理从"事后统计"走向"事前强制"**：OpenClaw 的网关级每代理预算（#42475）、hermes-agent 的 Claude 订阅 OAuth（#25267，53👍）、AstrBot 的缓存 token 计费修正，说明**用户已不满足于看账单，而是要求系统在花钱前就拦住**。预算执行点应放在调度层而非模型调用层。

4. **安全边界从"单机沙箱"扩展到"协议级信任"**：OpenClaw 拒绝 A2A 对等方控制命令、Zeroclaw 统一沙箱策略 RFC、QwenPaw 危险指令绕过——**多 agent 互联时代的信任模型正在重构**，认证对等方 ≠ 可信任操作员，需要显式的控制命令拒绝机制。

5. **可观测性需求从"能否运行"升级为"为何停止、花了多少"**：OpenClaw PR #135889（运行来源、作业类型、token 预算、类型化完成原因）与 hermes-agent 的 `hermes doctor` MCP 预检（#101727）表明，**运维视角正在从日志排查转向结构化、可审计的运行元数据**。

6. **升级迁移成为信任崩塌的高危环节**：OpenClaw 2026.8.1 升级引发 7 个独立阻塞问题（#134570）、认证迁移丢失凭据（#134608）；QwenPaw 升级后 custom provider 配置不可用（#7474）；hermes-agent `hermes update` 删除 Desktop 应用且退出码 0（#86443）——**升级路径的自动化测试与回滚机制**应成为所有项目的 CI 必选项。

---

*本报告基于 2026-09-03 各项目 GitHub 公开数据生成，供技术决策者与开发者参考。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-03

## 1. 今日速览

过去 24 小时项目保持高活跃度：共 50 条 Issue 更新（新开/活跃 35 条，关闭 15 条）和 50 条 PR 更新（待合并 45 条，合并/关闭 5 条），无新版本发布。当前项目处于密集的架构讨论期，多个 RFC（会话持久化、沙箱策略、wire protocol、内存存储分离）正在维护者评审中，同时有 2 个 S0 级安全/数据丢失 Bug 待处理（#10165、#10495）。整体来看，项目在架构演进与稳定性修复双线并行推进，但大量 PR 处于待合并状态（45 条），合并吞吐量偏低，需关注维护者评审带宽。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日无明确合并的 PR 记录，但以下已关闭 Issue 反映了相关修复/任务已完成：

- **[#10537] ZeroCode 本地会话覆盖 agent 工作区问题已关闭** — 对应修复 PR [#10565](https://github.com/zeroclaw-labs/zeroclaw/pull/10565)（pin local Code sessions to process cwd），修复了本地 Code 会话错误使用 TUI 启动目录作为工作区的问题。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10537

- **[#10434] 守护进程启动死锁防护加固任务已关闭** — 强化了并行负载下的启动死锁测试稳定性。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10434

- **[#10173] Docker CI 强制 Alpine 非 root 镜像元数据任务已关闭** — 扩展 CI 检查，确保 `Dockerfile.alpine` 镜像以 `65534:65534` 用户运行。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10173

- **[#10243] 废弃遗留 HMAC node transport 的决策已关闭** — 完成了对未使用的 `NodeTransport` 模块的退役/取代决策。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10243

- **[#10510] mdBook 升级至 0.5.4 并启用内置图片缩放已关闭** — 文档构建工具链更新。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10510

此外，多个长期跟踪的 RFC 仍在推进中（详见社区热点），项目整体处于架构重构的深水区。

---

## 4. 社区热点

今日讨论最活跃的 Issue 集中在架构级 RFC 与决策跟踪器：

- **[#9487] RFC: Runtime-owned conversation sessions and transport surface adapters**（32 条评论）
  这是当前社区讨论的焦点，已修订至第 5 版，涉及会话生命周期归属与传输层适配器设计。评论数远超其他 Issue，说明社区对会话架构变革高度关注。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9487

- **[#6996] RFC: Granular sandbox policy — filesystem and network restrictions**（21 条评论）
  讨论应用层路径准入与 OS 沙箱后端（Bubblewrap/Landlock/Seatbelt）的策略对齐问题，已持续 3 个月，仍在修订中。
  https://github.com/zeroclaw-labs/zeroclaw/issues/6996

- **[#8396] RFC: Make wire protocol first-class in provider construction and onboarding**（18 条评论）
  讨论将 wire protocol 提升为 provider 构建的一等公民，涉及 FND-003 Rev. 15 的约束。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8396

- **[#9103] RFC: separate authoritative memory storage from optional enrichment connectors**（18 条评论）
  讨论将权威内存存储与可选增强连接器分离，8 月经历维护者接管修订。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9103

- **[#9600] Tracker: Session-persistence contract ownership and layer ordering**（15 条评论）
  跟踪四个独立工作流同时修改会话持久化契约的协调问题，是 #9487 的配套协调 tracker。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9600

- **[#8692] Tracker: Maintainer decision queue for RFCs and design issues**（14 条评论）
  维护者决策队列，集中跟踪所有待决 RFC 和设计问题。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8692

**诉求分析**：社区当前最关心的是会话/运行时架构的重新定义——包括会话持久化契约的归属、传输层与运行时的解耦、沙箱策略的统一。这些讨论集中在 `domain:architecture` 和 `type:rfc` 标签下，表明项目正处于一次深度的架构演进期，而非单纯的功能迭代。

---

## 5. Bug 与稳定性

按严重程度排列：

### S0 — 数据丢失/安全风险

- **[#10165] 独立 delegate 绕过 `block_high_risk_commands` 风险配置**（`security/sandbox`，`priority:p1`，`status:in-progress`）
  高危险命令（如 `rm`）可通过独立 delegate 执行，即使 delegate 自身配置了 `block_high_risk_commands = true`。**暂无对应 fix PR**。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10165

- **[#10495] `Config::save()` 可能用近空文件覆盖操作员已填充的 config.toml**（`config/onboarding`，`priority:p0`，`status:accepted`）
  在拥有 109KB/25 个 agent 的配置机器上，测试运行将文件替换为 702 字节的仅含 schema_version 的配置。**暂无对应 fix PR**。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10495

### S1 — 工作流阻塞

- **[#8559] 退出 Web 仪表盘聊天窗口导致 agent 停止工作**（`web dashboard`，`priority:p1`，`status:in-progress`）
  用户退出聊天会话后，agent 的任务循环被中断，无法在后台继续工作。关联 feature 请求 [#7759](https://github.com/zeroclaw-labs/zeroclaw/issues/7759) 提出将 WebSocket 生命周期与 agent turn 解耦。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8559

### S2 — 功能降级

- **[#10068] 交互式 agent 会话上下文被限制在 32,000 tokens，忽略 `max_context_tokens = 131072`**（`runtime/daemon`，`priority:p2`，`status:in-progress`）
  会话显示 `ctx: 15,538 / 32,000` 并在 32k 处压缩/限制。相关 PR [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) 提出基于模型窗口比例的压缩策略，但仍在待合并状态。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10068

- **[#9284] config flush 可能覆盖并发写入**（`runtime/daemon`，`priority:p1`，`status:accepted`）
  `RpcDispatcher::flush_config` 的三步操作（读锁克隆 → await save → 写锁替换）存在竞态窗口。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9284

- **[#10501] MCP 工具结果图片在 OpenAI 兼容 provider 上返回 400**（`provider`，`priority:p1`，`status:in-progress`）
  图片被放入 `role: "tool"` 消息中，但 OpenAI 兼容端点只接受 `role: "user"` 中的图片。相关 PR [#10566](https://github.com/zeroclaw-labs/zeroclaw/pull/10566) 已提交。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10501

### 已关闭的 Bug

- [#9855] Matrix 频道无法通过 `.well-known/matrix/client` 解析 homeserver（已关闭）
  https://github.com/zeroclaw-labs/zeroclaw/issues/9855
- [#10193] Matrix 完整推理可能与生成的思考状态冲突（已关闭）
  https://github.com/zeroclaw-labs/zeroclaw/issues/10193
- [#10147] 显式配置初始化部分无法跨 CLI 进程完成（已关闭）
  https://github.com/zeroclaw-labs/zeroclaw/issues/10147
- [#10456] 持久 MCP SSE 读取器在超大事件后接受后缀（已关闭）
  https://github.com/zeroclaw-labs/zeroclaw/issues/10456
- [#10286] 恢复的 ZeroCode 转录在历史修剪后遗漏持久化 turns（已关闭）
  https://github.com/zeroclaw-labs/zeroclaw/issues/10286

---

## 6. 功能请求与路线图信号

当前路线图信号集中在以下方向：

### 架构级 RFC（可能进入下一版本）

- **会话持久化与传输解耦**（#9487、#9600、#10526）：将运行时会话与传输层解耦，引入 append-only 事件历史与确定性状态重放。这是当前最核心的架构演进方向。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10526

- **沙箱策略统一**（#6996）：整合应用层路径准入与 OS 沙箱后端，建立统一的策略层。
  https://github.com/zeroclaw-labs/zeroclaw/issues/6996

- **Wire protocol 一等公民**（#8396）：将 wire protocol 纳入 provider 构建与 onboarding 流程。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8396

- **内存存储与增强连接器分离**（#9103）：区分权威存储与可选 enrichment 连接器。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9103

### 功能增强（已有 PR 支撑）

- **MCP 多模态内容管线**（#10566）：将 MCP 工具结果的 `type:image/audio` 内容物化到多模态管线，解决 #10501 和 #9521。
  https://github.com/zeroclaw-labs/zeroclaw/pull/10566

- **Delegate 子代理进度可见性**（#10531）：向父 agent 暴露子代理的工具回执与部分输出。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10531

- **浏览器注册前端重新引入**（#10315）：在 #10142 拆分后，以非手写 TLS 的方式重新添加浏览器注册入口。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10315

- **上下文压缩锚定模型窗口比例**（#9535）：将压缩预算从固定 32k 改为基于所选模型窗口的比例。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9535

- **VoiceHost WebSocket 桥接**（#9740）：新增可选 `channel-voicehost`，支持外部 FunASR/SenseVoice 音频主机与 ZeroClaw 交换转录、回复、中断和审批事件。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9740

---

## 7. 用户反馈摘要

从今日活跃 Issue 评论中提炼的用户声音：

- **Web 后台任务中断是高频痛点**（#8559）：用户明确表示"完全无法在 agent 工作时做其他事情，甚至无法查看文件"。这反映了 Web 网关将 WebSocket 生命周期与 agent turn 绑定的设计缺陷，社区对此有强烈改进诉求。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8559

- **配置被覆盖引发信任危机**（#10495）：用户配置了 25 个 agent 的 109KB 配置文件被测试运行替换为 702 字节，属于 S0 级数据丢失。这类问题会严重影响用户对项目稳定性的信心。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10495

- **上下文窗口限制与配置不符**（#10068）：用户配置了 131072 的 `max_context_tokens`，但实际会话被限制在 32k。配置不生效的问题直接导致用户对文档和实现的信任度下降。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10068

- **MCP 多模态兼容性**（#10501）：OpenAI 兼容 provider 拒绝 `role: "tool"` 中的图片部分，说明多模态工具结果在跨 provider 场景下仍有兼容性缺口。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10501

- **RFC 讨论密度高但决策周期长**（#9487、#6996）：多个 RFC 已修订 4-5 版，社区参与度高，但维护者决策周期较长，可能影响贡献者积极性。

---

## 8. 待处理积压

以下 Issue/PR 长期未获维护者响应或处于停滞状态，建议关注：

- **[#6996] RFC: Granular sandbox policy** — 创建于 2026-05-28，已持续 3 个月，仍在修订中，`needs-maintainer-review`。
  https://github.com/zeroclaw-labs/zeroclaw/issues/6996

- **[#8396] RFC: Make wire protocol first-class** — 创建于 2026-06-27，已 2 个月，`needs-maintainer-review`。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8396

- **[#9635] PR: fix(config): resolve git subcommand past global options in risk classifier** — 创建于 2026-08-01，标记 `needs-author-action`，已 1 个月未推进。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9635

- **[#10283] PR: docs(mcp): add Build Remote Agent phone pairing (gbr/1)** — 创建于 2026-08-23，标记 `needs-author-action`，`risk:manual`。
  https://github.com/zeroclaw-labs/zeroclaw/pull/10283

- **[#10414] PR: fix(cron): guard agent manual trigger and history** — 创建于 2026-08-27，标记 `needs-author-action`，`risk:high`。
  https://github.com/zeroclaw-labs/zeroclaw/pull/10414

- **[#10411] PR: feat(channels): serialize same session messages** — 创建于 2026-08-27，标记 `needs-author-action`，`size:XL`。
  https://github.com/zeroclaw-labs/zeroclaw/pull/10411

- **[#9841] PR: fix(sop): drive headless SOP runs** — 创建于 2026-08-08，标记 `needs-author-action`，`size:XL`，涉及 5 个缺陷修复。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9841

**维护者提醒**：当前 45 个 PR 待合并，其中多个标记 `needs-author-action` 的 PR 已停滞 1-4 周。建议维护者优先处理 S0 级 Bug（#10165、#10495）的修复 PR，并加速 RFC 决策队列（#8692）的推进，以避免架构讨论长期悬置影响社区贡献热情。

---

*本日报由 AI 助手基于 GitHub 公开数据自动生成，仅供参考。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-09-03

## 今日速览

过去24小时内，PicoClaw 项目保持中等活跃度：新增/活跃 Issue 1 条，PR 关闭 2 条，无新版本发布。值得关注的是，两项已关闭 PR 分别涉及 QQ 频道功能增强与仓库评审契约强化，其中 QQ 频道相关 PR 与今日唯一活跃 Issue（#3349）直接关联，表明项目正在集中修复和增强 QQ 频道集成能力。整体来看，项目处于稳步迭代阶段，社区反馈集中于即时通讯渠道的可用性。

---

## 版本发布

今日无新版本发布。

---

## 项目进展

今日共关闭 2 个 PR，均为实质性代码变更：

- **[#1349] feat(qq): support parsing and replying to more attachment types**（作者：@aishannon，关闭于 2026-09-02）
  - 功能：支持解析 QQ 频道 emoji 结构；处理语音、图片、视频、文件消息；支持回复本地附件（先上传后发送）；优先使用 Markdown 消息回复，失败时降级。
  - 意义：显著扩展了 QQ 频道渠道的富媒体交互能力，与今日活跃 Bug #3349 同属 QQ 频道模块，可能为后续修复奠定基础。
  - 链接：https://github.com/sipeed/picoclaw/pull/1349

- **[#3359] feat(repository-reviews): enforce product and retention contracts**（作者：@dkropachev，关闭于 2026-09-02）
  - 功能：使 Repository Reviews 可通过规范的产品契约、资源分类法、有界 API 参考、生命周期/保留规则和确定性验收门重建；强制紧凑投影、`rrw_*`/`rdf_*`/`rrf_*` 资源所有权及 `rfn_*` 兼容性。
  - 意义：增强了项目在仓库评审流程中的结构化与可维护性，属于工程治理层面的改进。
  - 链接：https://github.com/sipeed/picoclaw/pull/3359

---

## 社区热点

- **[#3349] [BUG] QQ频道无法正常使用**（作者：@bxwl5，评论：2，更新于 2026-09-02）
  - 链接：https://github.com/sipeed/picoclaw/issues/3349
  - 分析：该 Issue 是今日唯一活跃 Issue，也是社区讨论焦点。用户报告在 Docker 和 Linux x86 版本中均无法使用 QQ 频道，gateway 日志显示 `code:401` 与 `请求头Authorization参数格式错误`，指向鉴权配置或实现问题。结合同日关闭的 PR #1349（QQ 频道附件支持增强），社区对 QQ 频道稳定性和功能完整性的需求较为迫切。

---

## Bug 与稳定性

- **[严重] QQ 频道无法正常使用**（#3349）
  - 现象：Docker 与 Linux x86 版本均复现，gateway 报错 `failed to get websocket info: code:401`，提示 Authorization 参数格式错误。
  - 影响：QQ 频道渠道完全不可用，影响所有依赖该渠道的用户。
  - 状态：Open，暂无直接关联的 fix PR；但 PR #1349 涉及 QQ 频道消息处理逻辑，可能间接改善相关代码路径。
  - 链接：https://github.com/sipeed/picoclaw/issues/3349

---

## 功能请求与路线图信号

- **QQ 频道富媒体消息支持**：PR #1349 已实现语音、图片、视频、文件消息的解析与回复，并支持 emoji 结构。该 PR 虽已关闭，但功能可能进入下一版本发布。结合 Issue #3349 的鉴权问题，QQ 频道模块的完整性和稳定性将是近期迭代重点。
  - 链接：https://github.com/sipeed/picoclaw/pull/1349

- **Repository Reviews 契约化**：PR #3359 引入产品契约、资源所有权和验收门等机制，属于后台工程治理增强，预计不会直接影响用户功能，但会提升项目长期可维护性。
  - 链接：https://github.com/sipeed/picoclaw/pull/3359

---

## 用户反馈摘要

- 用户 @bxwl5 在 #3349 中反馈：QQ 频道在 Docker 和 Linux x86 两种部署方式下均无法工作，说明问题具有普遍性，而非个别环境配置导致。
- 错误日志指向 `Authorization` 请求头格式错误，暗示可能是 QQ 开放平台鉴权参数拼接或凭证配置存在问题，用户期望项目方能快速定位并修复。
- 评论数（2）表明有维护者或其他用户参与讨论，但尚未给出明确解决方案或 workaround。

---

## 待处理积压

- **[#3349] QQ 频道无法正常使用**（创建于 2026-08-30，已开放 4 天）
  - 该 Issue 影响核心渠道功能，且用户已提供详细错误日志，建议维护者优先排查鉴权流程，并考虑在修复后发布补丁版本。
  - 链接：https://github.com/sipeed/picoclaw/issues/3349

---

**总结**：PicoClaw 今日无新版本，但 QQ 频道模块的增强 PR 已合并，同时存在一个高影响 Bug 待解决。项目整体健康度良好，工程治理持续改进，但需加快对社区反馈的响应速度，尤其是影响核心功能的鉴权问题。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-09-03

## 1. 今日速览

过去 24 小时 QwenPaw 保持高活跃迭代状态：共更新 26 条 Issue（新开/活跃 17 条，关闭 9 条）、40 条 PR（待合并 27 条，合并/关闭 13 条），并发布 v2.2.0-beta.7 新版本。社区讨论热度集中在多子 agent 任务执行的可观测性（#7450）、流式输出稳定性（#7417）与安全机制有效性（#7443）三大方向。修复侧重点明确：内存 embedding 维度归一化、暗色模式 UI 修复、macOS StdIO MCP 后端守护进程冲突等均已合入。整体项目健康度良好，但 cron 任务重复调度与上下文丢失问题需持续关注。

## 2. 版本发布

### v2.2.0-beta.7（2026-09-02 发布）

**更新内容：**
- **fix(memory)**：归一化不同后端间的 embedding 维度，修复 ReMe 记忆功能在 OpenAI-compatible embedding 后端下的索引失败问题（[PR #7465](https://github.com/agentscope-ai/QwenPaw/pull/7465)）
- **fix(webui)**：为 MCP 区块容器增加暗色模式样式覆盖，修复暗色模式下白色大圆角矩形问题（[PR #7473](https://github.com/agentscope-ai/QwenPaw/pull/7473)）
- **chore**：版本号提升至 v2.2.0b7（[PR #7485](https://github.com/agentscope-ai/QwenPaw/pull/7485)）

**破坏性变更：** 无。作为 beta 版本，建议用户在升级前备份配置与记忆数据。

**迁移注意事项：** 若使用自定义 embedding 后端，升级后需确认 embedding 维度配置与后端实际输出一致，避免索引任务静默失败。

## 3. 项目进展

今日合并/关闭 13 条 PR，重点推进以下修复与功能：

- **macOS StdIO MCP 稳定性修复**（[PR #7489](https://github.com/agentscope-ai/QwenPaw/pull/7489)）：修复打包版 Desktop 在 macOS 上调用 StdIO MCP 工具时，子进程重新进入 backend_guard 导致活跃后端被杀死的严重问题。对应 Issue [#7481](https://github.com/agentscope-ai/QwenPaw/issues/7481) 已关闭。
- **暗色模式 UI 修复**（[PR #7473](https://github.com/agentscope-ai/QwenPaw/pull/7473)）：为 MCP 客户端页面容器增加暗色模式样式覆盖，修复 `.mcpSection` 与 `.providerCard` 在暗色模式下渲染为白色背景的问题。对应 Issue [#7471](https://github.com/agentscope-ai/QwenPaw/issues/7471) 已关闭。
- **Make-Skill v2 工作流**（[PR #7508](https://github.com/agentscope-ai/QwenPaw/pull/7508)）：以审批驱动、脚本化方式创建可复用 Skill，替代旧版 materialize_skill 工具。该 PR 标记为 DO NOT MERGE 并已关闭，但 [#7509](https://github.com/agentscope-ai/QwenPaw/pull/7509) 仍开放，说明功能仍在迭代中。

整体来看，项目在修复 macOS 平台稳定性、完善暗色模式体验、推进 Skill 创建流程现代化方面均有实质进展。

## 4. 社区热点

| 排名 | Issue/PR | 评论数 | 核心诉求 |
|------|----------|--------|----------|
| 1 | [#7450 主agent+多子agent进度查询](https://github.com/agentscope-ai/QwenPaw/issues/7450) | 7 | 多子 agent 任务执行中，主 agent 不会主动查询子 agent 状态，用户必须主动询问“进度如何”才触发查询，导致任务长时间无动静 |
| 2 | [#7417 Console stream 重复文本块](https://github.com/agentscope-ai/QwenPaw/issues/7417) | 6 | Console 流式输出中途出现大量重复文本块，完成后又在末尾追加合并副本，影响阅读体验（已关闭） |
| 3 | [#7443 危险指令易规避](https://github.com/agentscope-ai/QwenPaw/issues/7443) | 5 | 安全机制存在漏洞，危险指令可绕过审查，用户对安全边界表示担忧 |
| 4 | [#7469 ReMe embedding 索引失败](https://github.com/agentscope-ai/QwenPaw/issues/7469) | 4 | ReMe 长时记忆在 OpenAI-compatible embedding 后端下后台任务静默失败，新记忆无法写入 |
| 5 | [#6464 连接测试失败](https://github.com/agentscope-ai/QwenPaw/issues/6464) | 4 | v2.0.1 部署后无法连接任何模型，模型下拉列表为空（已关闭） |

**热点分析：** 社区最关心的是**多 agent 任务执行的可观测性**——用户希望主 agent 能主动汇报子任务进度，而非被动等待询问。其次是**流式输出的稳定性**与**安全机制的有效性**，这两点直接影响日常使用体验与信任度。

## 5. Bug 与稳定性

### 严重级别

| 严重度 | Issue | 描述 | Fix PR 状态 |
|--------|-------|------|-------------|
| 🔴 严重 | [#7447 上下文丢失](https://github.com/agentscope-ai/QwenPaw/issues/7447) | 长上下文（约160页中文文档）场景下，手工压缩后早期上下文记录彻底丢失，任务无法继续 | 无 |
| 🔴 严重 | [#7450 多子agent进度不可见](https://github.com/agentscope-ai/QwenPaw/issues/7450) | 主 agent 不主动查询子 agent 状态，任务长时间无动静，影响复杂任务执行效率 | 无 |
| 🔴 严重 | [#7443 危险指令规避](https://github.com/agentscope-ai/QwenPaw/issues/7443) | 安全审查可被绕过，危险指令可被执行 | 无 |

### 中等级别

| 严重度 | Issue | 描述 | Fix PR 状态 |
|--------|-------|------|-------------|
| 🟠 中 | [#7469 ReMe embedding 失败](https://github.com/agentscope-ai/QwenPaw/issues/7469) | ReMe 后台 embedding 任务报 `as_embedding:default accessed before start()`，新记忆无法写入 | 已由 v2.2.0-beta.7 修复（[PR #7465](https://github.com/agentscope-ai/QwenPaw/pull/7465)） |
| 🟠 中 | [#7474 自定义提供商加载失败](https://github.com/agentscope-ai/QwenPaw/issues/7474) | PR #7337 引入 `max_tokens`→`max_output_length` 迁移后，custom provider 配置无法加载 | 无 |
| 🟠 中 | [#7480 cron 非计划补发](https://github.com/agentscope-ai/QwenPaw/issues/7480) | 后端升级重启后 cron 任务被非计划补发；cancelled 任务不写收件箱；收件箱自动已读 | 无 |
| 🟠 中 | [#7476 cron 重复调度](https://github.com/agentscope-ai/QwenPaw/issues/7476) | misfire_grace 窗口内 cron 任务被重复触发，备份脚本执行两次 | 无 |
| 🟠 中 | [#7431 codex 空响应](https://github.com/agentscope-ai/QwenPaw/issues/7431) | 后端不流式下发 agentMessage/delta 时，第三方智能体每轮回复“空响应”，usage 全 0 | 无 |

### 轻微级别

| 严重度 | Issue | 描述 | Fix PR 状态 |
|--------|-------|------|-------------|
| 🟡 轻 | [#7510 /memory/status 500](https://github.com/agentscope-ai/QwenPaw/issues/7510) | v2.2.0-beta.7 Desktop 上 ReMe 诊断接口返回 500 | 无 |
| 🟡 轻 | [#7507 企业微信流式慢](https://github.com/agentscope-ai/QwenPaw/issues/7507) | 企业微信 channel 逐字符输出，150ms 节流导致体验卡顿 | 无 |
| 🟡 轻 | [#7493 模型路由面板不渲染](https://github.com/agentscope-ai/QwenPaw/issues/7493) | Console UI 无法访问 Agent model routing 面板 | 有对应 PR [#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501) |
| 🟡 轻 | [#7496 CRITICAL 规则行为不符](https://github.com/agentscope-ai/QwenPaw/issues/7496) | CRITICAL 类型规则被直接拒绝执行，而非触发审批流程 | 有对应 PR [#7497](https://github.com/agentscope-ai/QwenPaw/pull/7497) |
| 🟡 轻 | [#7471 暗色模式白色背景](https://github.com/agentscope-ai/QwenPaw/issues/7471) | MCP 页面暗色模式下容器渲染为白色 | 已由 [PR #7473](https://github.com/agentscope-ai/QwenPaw/pull/7473) 修复 |

## 6. 功能请求与路线图信号

| 功能请求 | 对应 PR/信号 | 可能纳入版本 |
|----------|-------------|--------------|
| [A2A 协议官方支持](https://github.com/agentscope-ai/QwenPaw/issues/7484) | 架构文档提及 MCP/A2A/ACP 统一 Driver 机制，但当前仅实现 MCP | 路线图待定 |
| [官方主题定制支持](https://github.com/agentscope-ai/QwenPaw/issues/7406) | [PR #7487 主题 token 统一](https://github.com/agentscope-ai/QwenPaw/pull/7487)、[PR #7502 sidebar 与设置体验重构](https://github.com/agentscope-ai/QwenPaw/pull/7502) | 下一版本可能性高 |
| [消息渠道命令纠错](https://github.com/agentscope-ai/QwenPaw/issues/7479) | 拼写错误的命令（如 `/mew`）不应转发给 agent，应丢弃并提示用户 | 待定 |
| [Agent 模型路由设置](https://github.com/agentscope-ai/QwenPaw/issues/7493) | [PR #7501 添加 agent model routing 设置](https://github.com/agentscope-ai/QwenPaw/pull/7501) | 下一版本可能性高 |
| [从其他 agent 导入（Pawport）](https://github.com/agentscope-ai/QwenPaw/pull/6960) | 支持从 Codex、Qoder 导入指令、设置、技能、插件等 | 待定（已开放 3 周） |
| [Creator 1.1.2 大版本](https://github.com/agentscope-ai/QwenPaw/pull/7486) | 运行时通知总线、异步委派、多时间线 A/B 对比、T2V/I2V/S2V 调度等 | 待定 |

## 7. 用户反馈摘要

- **多子 agent 任务执行缺乏主动汇报**（[#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450)）：用户反映“经常看到长时间没有任务动静”，主 agent 仅在用户主动询问时才查询子 agent 状态，复杂任务执行效率受影响。
- **长文档处理中上下文丢失**（[#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447)）：用户处理约 160 页中文 Word 文档的 OCR 校对任务，手工压缩上下文后，早期记录彻底丢失，任务无法继续。这是数据丢失级别的严重问题。
- **cron 任务重复执行**（[#7480](https://github.com/agentscope-ai/QwenPaw/issues/7480)、[#7476](https://github.com/agentscope-ai/QwenPaw/issues/7476)）：升级重启后 cron 任务被非计划补发，备份脚本同一天执行两次，生成重复文件。用户对任务调度的可靠性表示担忧。
- **升级后自定义提供商不可用**（[#7474](https://github.com/agentscope-ai/QwenPaw/issues/7474)）：合并 PR #7337 后，custom provider 配置读取报错，模型无法加载，影响已有用户升级。
- **局域网 LLM 连接不稳定**（[#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505)）：访问局域网 LM Studio Server 时频繁出现 client disconnect，导致重试直至超时失败。
- **企业微信流式输出体验差**（[#7507](https://github.com/agentscope-ai/QwenPaw/issues/7507)）：企业微信 channel 逐字符输出，相比微信 channel 的整段输出明显更慢，用户感知“卡顿”。

## 8. 待处理积压

以下 Issue/PR 长期未获响应或推进缓慢，建议维护者关注：

| 类型 | 编号 | 描述 | 等待时长 |
|------|------|------|----------|
| PR | [#6399 reranker UI 配置面板](https://github.com/agentscope-ai/QwenPaw/pull/6399) | 为 ReMeLightMemoryCard 添加 reranker 可视化配置面板，已开放超 6 周 | 42 天 |
| PR | [#6936 string 类型工具参数强制转换](https://github.com/agentscope-ai/QwenPaw/pull/6936) | 模型将 string 类型参数输出为 JSON 数字时，jsonschema 校验失败，已开放 3 周 | 22 天 |
| PR | [#6960 Pawport 导入流程](https://github.com/agentscope-ai/QwenPaw/pull/6960) | 从 Codex/Qoder 导入指令、设置、技能等，first-time-contributor，已开放 3 周 | 21 天 |
| PR | [#7401 Windows ACP agent 启动卡顿](https://github.com/agentscope-ai/QwenPaw/pull/7401) | 修复 Windows 上 ACP agent 在工作区初始化期间挂起数分钟的问题，已开放 5 天 | 5 天 |
| Issue | [#6464 连接测试失败](https://github.com/agentscope-ai/QwenPaw/issues/6464) | v2.0.1 无法连接任何模型，虽已关闭但涉及核心连接功能，建议确认修复方案已覆盖 | 已关闭 |

---

*本日报基于 GitHub 公开数据自动生成，数据截至 2026-09-03。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报（2026-09-03）

## 1. 今日速览

项目保持极高活跃度：过去24小时内 **500 条 Issue 更新**（新开/活跃 282，关闭 218）与 **500 条 PR 更新**（待合并 363，已合并/关闭 137），社区讨论与代码提交均处于高位。但 **363 条 PR 待合并** 显示合并积压明显，可能成为短期瓶颈。今日 **无新版本发布**，项目处于版本间歇期。社区讨论焦点集中在 skills 索引老化、state.db 损坏/膨胀、god-file 分解等稳定性与架构健康问题上；多个 P1 级 Bug 已有对应修复 PR，维护团队响应较为积极。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日共合并/关闭 **137 条 PR**，其中展示的已关闭 PR 主要集中在 **状态存储性能优化** 与 **FTS 索引瘦身**，说明项目正在系统性解决存储膨胀问题：

- **[#101266](https://github.com/NousResearch/hermes-agent/pull/101266) [已合并] perf(state): keep cron runs from inflating the trigram index** — cron 会话不再进入 trigram 索引，保留标准关键词搜索，大幅降低机器生成文本的索引成本。
- **[#101725](https://github.com/NousResearch/hermes-agent/pull/101725) [已合并] perf(state): exclude cron sessions from the trigram FTS index (salvage #101266)** — 作为 #101266 的 salvage 版本，修正迁移门控编号（`< 27` → `< 29`），确保现有安装真正执行一次性重建。基准测试中 trigram 索引从 **1.13 MB → 0.62 MB**。
- **[#101720](https://github.com/NousResearch/hermes-agent/pull/101720) [已合并] fix(state): bound FTS indexing for large tool results (salvage #93834)** — 大工具结果仅索引有界前缀，全文保留在 `messages` 表。300 轮 / 300×40 KB 工具结果的会话中，`messages_fts` 从 **3.20 MB → 0.65 MB**，且不影响关键词搜索。

**项目整体向前迈进的判断**：存储层优化是当前主线之一，三项合并 PR 共同解决了 cron 会话和大工具结果导致的索引膨胀问题，对长期运行实例的磁盘占用和查询性能有直接改善。此外，今日新增的多个修复 PR（见下文 Bug 部分）覆盖了会话恢复、gateway 锁安全、Windows 兼容性等方向，修复广度较大。

## 4. 社区热点

今日讨论最活跃的 Issues 反映了社区对 **稳定性、架构健康、成本优化** 三大诉求：

- **[#66616](https://github.com/NousResearch/hermes-agent/issues/66616) [OPEN] Skills index is stale or degraded（143 评论）** — 自动化探针检测到 skills 索引已 29.8 小时未更新（限制 26 小时），状态为 `degraded`。高评论数说明用户对文档/技能索引的可用性非常敏感，且该问题已持续近两个月未解决。
- **[#78647](https://github.com/NousResearch/hermes-agent/issues/78647) [已关闭] Large-file decomposition: 20/20 done（79 评论）** — god-file 分解史诗任务全部完成，社区对架构重构的进展高度关注，关闭时获得大量讨论。
- **[#88584](https://github.com/NousResearch/hermes-agent/issues/88584) [OPEN] Automated Nous integration is blocked（56 评论）** — Nous-to-Enterkey 自动合并因 `cron/jobs.py` 冲突被阻塞，影响自动化集成流水线，用户持续关注阻塞时长。
- **[#6839](https://github.com/NousResearch/hermes-agent/issues/6839) [已关闭] Lazy Tool Schema Loading — Two-Pass Tool Injection（32 评论，18 👍）** — 用户强烈希望减少每次 API 调用注入全部工具 schema 的 token 开销（约 3,500-5,000 tokens/调用），该需求已关闭但讨论热度高，可能进入后续版本规划。
- **[#25267](https://github.com/NousResearch/hermes-agent/issues/25267) [OPEN] Claude Agent SDK model provider with subscription OAuth（18 评论，53 👍）** — 今日 👍 数最高的 Issue。Claude 订阅用户希望使用现有订阅而非单独支付 API 费用，避免"双重付费"。53 个 👍 表明该需求在社区中有广泛共鸣。

## 5. Bug 与稳定性

今日报告的 Bug 数量较多，按严重程度排列如下（标注是否已有修复 PR）：

### P1 级（严重）

| Issue | 问题描述 | 修复 PR |
|---|---|---|
| [#13834](https://github.com/NousResearch/hermes-agent/issues/13834) | `openai-codex` 在同一机器/网络下失败，而官方 Codex CLI 正常 | 无 |
| [#90837](https://github.com/NousResearch/hermes-agent/issues/90837) | gateway-only 写入下 state.db 反复损坏（11 次），已排除外部因素 | 无 |
| [#97948](https://github.com/NousResearch/hermes-agent/issues/97948) | 手动 `/compress` 报 120s 超时，后台 worker 却成功；大会话压缩失败 | 无 |
| [#88168](https://github.com/NousResearch/hermes-agent/issues/88168) | Windows 下 `contributors/emails/` 文件大小写冲突导致 git status 永久 dirty | 无 |
| [#54189](https://github.com/NousResearch/hermes-agent/issues/54189) | state.db 无界增长（2 周达 659MB），无会话生命周期清理机制 | 无 |
| [#97963](https://github.com/NousResearch/hermes-agent/issues/97963) | hygiene 压缩的 10s turn-hold 导致 thinking 模型长会话 100% 压缩失败（#92318 回归） | 无 |
| [#71047](https://github.com/NousResearch/hermes-agent/issues/71047) | `hermes config set` 重复创建顶层键；Telegram 流式+reply_to_mode 重复投递 | 无 |
| [#85422](https://github.com/NousResearch/hermes-agent/issues/85422) | 官方 macOS 安装器过时，强制本地引导，无法作为远程 Desktop 前端 | 无 |
| [#86443](https://github.com/NousResearch/hermes-agent/issues/86443) | `hermes update` 删除 Desktop 应用且 rebuild 失败时仍退出码 0 | 无 |
| [#68321](https://github.com/NousResearch/hermes-agent/issues/68321) | Desktop 切换会话后 assistant 消息消失（用户消息保留，DB 完好） | 无 |
| [#89737](https://github.com/NousResearch/hermes-agent/issues/89737) | state.db 结构性损坏（SQLite error 11），波及 canonical `messages` 表，重装无法恢复 | 无 |
| [#94196](https://github.com/NousResearch/hermes-agent/issues/94196) | Desktop gateway 切换需"Save and reconnect"才能恢复本地后端；ws_orphan_reap 导致会话反复断开 | 无 |

### P2 级（中等）

| Issue | 问题描述 | 修复 PR |
|---|---|---|
| [#87697](https://github.com/NousResearch/hermes-agent/issues/87697) | Hermes 客户端约 1.5s 后取消本地 Ollama 流，触发 `<unused49>` token 循环 | 无 |
| [#53004](https://github.com/NousResearch/hermes-agent/issues/53004) | Projects 范式（#49037）破坏"文件夹→会话→侧边栏"流程 | 无 |
| [#56004](https://github.com/NousResearch/hermes-agent/issues/56004) | Qwen3.6/vLLM 多轮推理（preserve_thinking）在回放时被剥离 | 无 |
| [#90663](https://github.com/NousResearch/hermes-agent/issues/90663) | TUI (Ink) 在 Ghostty/macOS 上 Shift+字母被小写化 | 无 |
| [#48000](https://github.com/NousResearch/hermes-agent/issues/48000) | kanban worker 以退出码 0 掩盖瞬时故障，误触发熔断器 | 无 |

### 已有修复 PR 的 Bug（今日新增）

- **[#101723](https://github.com/NousResearch/hermes-agent/pull/101723)** — 修复 `sessions recover --allow-partial` 按声明列序而非物理列序映射 `lost_and_found` 单元格的问题。
- **[#101724](https://github.com/NousResearch/hermes-agent/pull/101724)** — 修复 macOS 上 lock-probe 误判导致 live gateway 的 `gateway.pid`/`gateway.lock` 被 unlink（flock 被静默释放）。
- **[#101721](https://github.com/NousResearch/hermes-agent/pull/101721)** — 修复 SSH spawn 场景下 orphan-reap 对 `backend.lock.json` 声明的过度信任。
- **[#101726](https://github.com/NousResearch/hermes-agent/pull/101726)** — 容忍 `sessions.model_config` 中损坏的 marker JSON，避免会话列表/恢复崩溃。
- **[#101679](https://github.com/NousResearch/hermes-agent/pull/101679)** — 离线恢复时隔离损坏的 session model config，防止生成"物理完好但逻辑不可用"的数据库。
- **[#101729](https://github.com/NousResearch/hermes-agent/pull/101729)** — 从 trigram 索引中移除 `tool_calls` JSON，并宣传 v1 存储重建（salvage #88217）。
- **[#101728](https://github.com/NousResearch/hermes-agent/pull/101728)** — 修复 `/v1/responses` 命名会话 transcript 前缀匹配按严格 dict 相等导致消息数膨胀（3→8 条）的问题。
- **[#101696](https://github.com/NousResearch/hermes-agent/pull/101696)** — 修复 Homebrew formula 安装被识别为 `unknown` 导致 `hermes update` 误操作的问题。
- **[#101722](https://github.com/NousResearch/hermes-agent/pull/101722)** — 为 Windows 命令型 TTS/STT 添加 `CREATE_NO_WINDOW`，消除每次调用闪烁的 cmd.exe 窗口。

## 6. 功能请求与路线图信号

今日社区提出的新功能需求及可能的路线图信号：

- **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681) [OPEN] Bot Group Chats should keep working after Desktop closes** — 要求 Bot 群聊在 Desktop 关闭后继续运行。基础架构（gateway-owned authority、same-gateway runner、scoped cross-gateway transport）已在 `main` 上，剩余工作是连接桌面端。**可能进入下一版本**。
- **[#29531](https://github.com/NousResearch/hermes-agent/issues/29531) [OPEN] Per-session working directory for gateway sessions** — 当前 `TERMINAL_CWD` 是进程全局的，多会话共享一个 cwd。4 👍，社区有明确需求。**可能进入下一版本**。
- **[#25267](https://github.com/NousResearch/hermes-agent/issues/25267) [OPEN] Claude Agent SDK model provider with subscription OAuth** — 53 👍 的高热度需求，让 Claude 订阅用户无需 API key 即可使用 Hermes。**路线图信号强烈**。
- **[#19451](https://github.com/NousResearch/hermes-agent/issues/19451) [OPEN] Make global skills truly global across profiles** — 当前 `~/.hermes/skills/` 实际是"默认 profile"而非全局。6 👍，多 profile 用户痛点明确。
- **[#77111](https://github.com/NousResearch/hermes-agent/issues/77111) [OPEN] RealtimeVoiceProvider ABC** — 4 个并行的 duplex-voice PR 需要一个统一接口而非合并队列。2 👍，架构层面需求。
- **[#101552](https://github.com/NousResearch/hermes-agent/pull/101552) [OPEN] feat(desktop): make Lunar City an interactive world** — 将 Lunar City 从静态图片预览升级为 GLB-backed 交互世界，属于桌面端创新功能。
- **[#101727](https://github.com/NousResearch/hermes-agent/pull/101727) [OPEN] feat(cli): add MCP servers preflight section to hermes doctor** — 为 `hermes doctor` 增加 MCP 服务器预检，避免运行时才发现配置错误。

## 7. 用户反馈摘要

从今日 Issues 评论中提炼的真实用户声音：

- **对 openai-codex 失败的困惑**（[#13834](https://github.com/NousResearch/hermes-agent/issues/13834)）：用户明确表示"同一台 macOS、同一网络，官方 codex CLI 正常，Hermes 的 openai-codex 反复失败"，且 4 👍 说明非个例。用户对"官方工具正常而 Hermes 集成异常"的体验落差较大。
- **Claude 订阅用户的双重付费抱怨**（[#25267](https://github.com/NousResearch/hermes-agent/issues/25267)）：用户直言"Claude 订阅用户实际上付了两次钱（订阅 + 按 token API）"，53 👍 表明该诉求在社区中有广泛共鸣，是潜在的增长机会。
- **Projects 范式破坏工作流**（[#53004](https://github.com/NousResearch/hermes-agent/issues/53004)）：用户反馈 PR #49037 合并后，"右侧边栏选文件夹 → 在文件夹中启动会话 → 左侧边栏显示会话"的完整流程被破坏，每一步都出错。属于典型的"重构引入回归"案例。
- **Desktop 消息消失的困惑**（[#68321](https://github.com/NousResearch/hermes-agent/issues/68321)）：用户描述"切换会话再切回，所有 assistant 消息消失，用户消息保留，DB 数据完好"，这种"数据在但 UI 不显示"的问题严重影响信任感。
- **update 删除 Desktop 的愤怒**（[#86443](https://github.com/NousResearch/hermes-agent/issues/86443)）：用户指出 `hermes update` 在 Windows 上可能删除 `Hermes.exe` 且退出码为 0，属于"静默破坏"类问题，用户对更新机制的安全性产生质疑。
- **TUI 大写输入被破坏**（[#90663](https://github.com/NousResearch/hermes-agent/issues/90663)）：Ghostty 上 Shift+R 输出 `r`，用户称"大写输入被摧毁"，影响日常使用。

## 8. 待处理积压

以下为长期未响应或未解决的重要 Issue/PR，提醒维护者关注：

- **[#7335](https://github.com/NousResearch/hermes-agent/issues/7335) [OPEN] More than 1000 open issues（2026-04-10 创建，15 评论）** — 社区对 Issue 数量增长的担忧，至今未得到官方回应或治理方案。当前项目 Issue 积压问题可能仍在恶化。
- **[#52080](https://github.com/NousResearch/hermes-agent/pull/52080) [OPEN] test(url-safety): 100% coverage（2026-06-24 创建）** — 将 `tools/url_safety.py` 覆盖率从 49% 提升至 ~100% 的测试 PR，已搁置两个多月未合并。
- **[#52026](https://github.com/NousResearch/hermes-agent/pull/52026) [OPEN] test(tool-backend): 100% coverage（2026-06-24 创建）** — 同样搁置的测试覆盖率 PR，覆盖 `tool_backend_helpers.py` 的 fallback 路径。
- **[#86062](https://github.com/NousResearch/hermes-agent/pull/86062) [OPEN] fix(state): recover from malformed legacy FTS index during rebuild（2026-08-14 创建）** — 修复 SQLite 升级后 legacy FTS 虚拟表报 `malformed inverted index` 的问题，已近三周未合并。
- **[#48000](https://github.com/NousResearch/hermes-agent/issues/48000) [OPEN] kanban workers bypass rate-limit/failure exit-code mapping（2026-06-17 创建，10 评论）** — 瞬时故障被误判为 `protocol_violation` 并触发熔断器，影响自动化任务可靠性。
- **[#19451](https://github.com/NousResearch/hermes-agent/issues/19451) [OPEN] Make global skills truly global across profiles（2026-05-04 创建，6 👍）** — 术语/行为不一致问题，多 profile 用户认知负担高，已积压四个月。

---

**日报总结**：hermes-agent 项目今日活跃度极高，社区讨论与代码提交双旺。存储性能优化是当前合并主线，但 P1 级 Bug 数量较多（12 个），且多数尚无修复 PR，稳定性仍是最大挑战。高 👍 功能需求（Claude 订阅 OAuth、Lazy Tool Schema）为产品方向提供了明确信号。合并积压（363 条 PR）与长期未响应的测试 PR 值得维护团队关注。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-09-03

## 1. 今日速览

过去 24 小时项目活跃度较高：共 6 条 Issue 更新（全部为新增/活跃，无关闭），21 条 PR 更新（17 条待合并，4 条已合并/关闭），无新版本发布。PR 提交集中在知识库（KB）解析与检索修复（#9915-#9923 系列）、插件市场与插件生命周期管理（#9915-#9917、#9925）两大方向，另有 4 条 PR 完成合并（代码高亮扩展、i18n 翻译补齐、Gemini/Anthropic token 计费修复）。整体来看，项目处于稳定的迭代修复期，社区贡献者活跃，知识库与插件生态是当前关注焦点。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 项目进展

今日共有 4 条 PR 被合并/关闭，均为针对性修复：

- **[#9892] fix: expand shiki code highlight language support**（已合并）— 为 ChatUI 的 Shiki 精简包补充 C、C++、Rust、Go 等常用编程语言语法支持，修复 Markdown 代码块无法高亮的问题，同时保留未知语言回退纯文本的行为。来源：[@atqiyu](https://github.com/atqiyu) | [链接](https://github.com/AstrBotDevs/AstrBot/pull/9892)
- **[#9896] fix(i18n): add missing en-US dashboard translations**（已合并）— 补齐 en-US 缺失的 26 个翻译键，修复 MCP 服务器同步对话框渲染原始键名（如 `[MISSING: ...]`）及部分文案回退中文的问题。来源：[@yunyancuo](https://github.com/yunyancuo) | [链接](https://github.com/AstrBotDevs/AstrBot/pull/9896)
- **[#9880] fix(provider): exclude cached tokens from Gemini input usage accounting**（已合并）— 修正 Gemini 提供商 token 用量统计，避免缓存 token 被重复计入 `input_other`，提升计费准确性。来源：[@xiaoyuyu6420](https://github.com/xiaoyuyu6420) | [链接](https://github.com/AstrBotDevs/AstrBot/pull/9880)
- **[#9881] fix(provider): count Anthropic cache_creation tokens in input usage**（已合并）— 修正 Anthropic 提供商 token 用量统计，将 cache_creation tokens 正确计入输入用量。来源：[@xiaoyuyu6420](https://github.com/xiaoyuyu6420) | [链接](https://github.com/AstrBotDevs/AstrBot/pull/9881)

此外，知识库方向有 8 条待合并 PR（#9918-#9923、#9751 等）集中修复解析器路由、编码兼容、分块边界、检索查询清洗等问题，并引入可插拔知识库检索后端 API，预计将在后续版本中显著提升知识库功能的稳定性与扩展性。

## 4. 社区热点

- **[#8943] [Feature] 支持并行工具调用（Parallel Tool Execution）** — 评论 8 条，为今日讨论最活跃的 Issue。用户指出当前 `tool_loop_agent_runner` 对同一轮多个 tool call 采用串行 `for` 循环处理，请求改为并行执行以降低延迟。该诉求直指多工具场景下的响应速度瓶颈，涉及核心执行引擎，讨论热度高。作者：[@Fronut](https://github.com/Fronut) | [链接](https://github.com/AstrBotDevs/AstrBot/issues/8943)
- **[#9902] 知识库入库向量统一拼接文档标题，稠密检索被标题词主导的取舍讨论** — 评论 3 条。用户对 `kb_helper.py` 中 embedding 文本拼接文档标题的做法提出疑问，讨论标题词对稠密检索结果的过度主导问题，反映知识库检索质量的实际使用痛点。作者：[@xiaoyuyu6420](https://github.com/xiaoyuyu6420) | [链接](https://github.com/AstrBotDevs/AstrBot/issues/9902)

## 5. Bug 与稳定性

按严重程度排列：

- **[#9928] Windows 宿主机沙箱技能同步失效**（严重，环境特定）— `computer_client.py` 的 `_sync_skills_to_sandbox()` 在 Windows 下将 `skills.zip` 上传为带反斜杠字面量的文件，导致 apply 阶段空转。作者已核对 master 分支截至今日仍未修复，关联 PR #8182 处于 open 状态。作者：[@sun-equinox](https://github.com/sun-equinox) | [链接](https://github.com/AstrBotDevs/AstrBot/issues/9928)
- **[#9924] 插件市场中两个 metadata name 相同的插件，详情页信息互相错乱**（中等）— 详情链路使用 metadata `name` 而非唯一标识 `market_plugin_id` 作为 key，导致同名插件详情串扰。已有对应修复 PR #9925。作者：[@Hayston1001](https://github.com/Hayston1001) | [链接](https://github.com/AstrBotDevs/AstrBot/issues/9924)
- **[#9929] Tool call announcements break role-play immersion**（中等，体验类）— 工具调用前会输出"我先确认一下当前对话状态"等旁白式表达，破坏角色扮演沉浸感。暂无 fix PR。作者：[@x1051445024](https://github.com/x1051445024) | [链接](https://github.com/AstrBotDevs/AstrBot/issues/9929)

知识库相关 Bug 修复 PR 已批量提交（#9919 BOM 编码、#9920 txt/md 解析路由、#9921 mdx/mkd/html/csv 解析缺失、#9922 分块 overlap 超限、#9923 检索 query 清洗、#9918 分页 page_size=-1），均处于待合并状态，建议维护者优先 review 合并。

## 6. 功能请求与路线图信号

- **[#8943] 并行工具调用** — 核心执行引擎增强，社区讨论热度高，可能成为下一版本的重要优化方向。[链接](https://github.com/AstrBotDevs/AstrBot/issues/8943)
- **[#9902] 知识库向量拼接标题的取舍** — 涉及检索质量调优，与今日多个 KB 修复 PR 方向一致，可能推动知识库检索策略的进一步优化。[链接](https://github.com/AstrBotDevs/AstrBot/issues/9902)
- **[#9926] 新增 opencode go 模型提供商** — 新提供商接入请求，属于常规扩展需求，实现成本取决于 opencode go 的 API 兼容性。[链接](https://github.com/AstrBotDevs/AstrBot/issues/9926)
- **[#9703] 外发图片自适应提供商格式**（PR，待合并）— 自动转换图片格式为提供商支持的格式，动图转为 3×3 帧拼盘以节省 token，关联 issue #9295。若合并，将提升多模态场景的兼容性与成本效率。[链接](https://github.com/AstrBotDevs/AstrBot/pull/9703)
- **[#9751] 可插拔知识库检索后端 API**（PR，待合并）— 为插件提供统一的知识库发现与检索契约，属于架构级扩展点，值得关注。[链接](https://github.com/AstrBotDevs/AstrBot/pull/9751)

## 7. 用户反馈摘要

- **工具调用效率**：用户明确表达串行工具调用在 multi-tool 场景下的延迟痛点，期望并行执行（#8943）。
- **角色扮演体验**：工具调用前的"旁白式"提示被用户视为破坏沉浸感的干扰，说明部分用户将 AstrBot 用于角色扮演场景，对对话自然度有较高要求（#9929）。
- **知识库检索质量**：用户对 embedding 拼接标题导致检索结果被标题词主导的现象提出质疑，关注检索精度与标题权重之间的平衡（#9902）。
- **插件市场体验**：同名插件详情串扰问题被用户精准定位到根因（`name` vs `market_plugin_id`），说明用户对插件市场的唯一标识机制有一定理解，且该问题已影响实际使用（#9924）。

## 8. 待处理积压

- **[#8943] 并行工具调用** — 创建于 2026-06-21，已持续 2 个多月，评论 8 条，仍为 open 状态。作为核心执行引擎的增强需求，建议维护者评估实现方案并排期。[链接](https://github.com/AstrBotDevs/AstrBot/issues/8943)
- **[#9703] 外发图片格式自适应 PR** — 创建于 2026-08-15，已等待近 3 周，涉及 provider 核心逻辑与多模态兼容性，建议尽快 review。[链接](https://github.com/AstrBotDevs/AstrBot/pull/9703)
- **[#8182] Windows 沙箱技能同步修复 PR** — 关联 issue #9928 今日被重新报告，该 PR 仍处于 open 状态，建议优先处理。[链接](https://github.com/AstrBotDevs/AstrBot/pull/8182)
- **知识库修复 PR 系列（#9918-#9923）** — 8 条 PR 集中提交且相互关联，建议合并 review 以避免冲突和重复劳动。[链接](https://github.com/AstrBotDevs/AstrBot/pull/9918)

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*