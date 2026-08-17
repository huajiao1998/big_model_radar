# OpenClaw 生态日报 2026-08-18

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-17 22:13 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-18

> 数据周期：2026-08-17 00:00 UTC 至 2026-08-18 00:00 UTC | 数据来源：github.com/openclaw/openclaw


## 1. 今日速览

过去 24 小时项目活跃度处于**高位**：共产生 500 条 Issue 更新（其中 492 条新开/活跃，8 条关闭）和 500 条 PR 更新（410 条待合并，90 条已合并/关闭）。**今日无新版本发布**，但提交了大量修复性 PR，覆盖会话状态、消息投递、UI 稳定性、macOS 权限、Codex 集成等关键路径。值得关注的是，**今日提交的 PR 中有相当比例由 @steipete（项目维护者）亲自提交**，且多个 PR 标注了 `merge-risk: 🚨 compatibility` 或 `🚨 security-boundary`，说明项目正在推进一批涉及兼容性和安全边界的重构。社区侧，长期悬而未决的会话状态/消息丢失类问题（如 #62505、#96834）持续获得高关注度，但多数仍停留在 `needs-maintainer-review` 阶段，修复节奏有待加快。

**项目健康度评估**：🟡 中高活跃，修复密集但积压严重（大量 P1 问题等待维护者决策）。


## 2. 版本发布

**无新版本发布。** 上一个已知版本为 2026.6.1（来自 Issue #91009 的版本引用）。建议关注近期 PR 合入节奏，预计下一版本将包含今日合入的多项稳定性修复。


## 3. 项目进展

今日合入/关闭的 PR 中，以下几条对项目推进意义较大：

| PR | 标题 | 状态 | 影响 |
|---|---|---|---|
| [#120900](https://github.com/openclaw/openclaw/pull/120900) | feat(ui): review install policy warnings | ✅ 已关闭 | 为 Control UI 增加安装策略警告的审核流程，管理员可确认后继续安装插件，强化安全边界 |
| [#116489](https://github.com/openclaw/openclaw/pull/116489) | feat(security): require acknowledgement for install policy warnings | ✅ 已关闭 | 与 #120900 配套，外部 `security.installPolicy` 命令可返回 `warn`，交互式 CLI 安装需确认可疑插件/技能，属安全加固 |
| [#125403](https://github.com/openclaw/openclaw/pull/125403) | fix(plugins): load replaced public artifacts after metadata refresh | 🆕 今日新开 | 修复插件公共接口在元数据刷新后仍提供旧导出物的问题，影响插件热更新可靠性 |
| [#125407](https://github.com/openclaw/openclaw/pull/125407) | fix(agents): stop canceled subagents reporting timeouts | 🆕 今日新开 | 修复取消子代理被误报为超时的问题，改进任务取消语义 |
| [#125163](https://github.com/openclaw/openclaw/pull/125163) | fix: archived channel sessions resume on new messages | 🆕 今日新开 | 修复归档频道收到新消息后无响应的问题，涉及会话状态恢复 |

**整体判断**：今日合入的 PR 集中在**安全策略审核**和**插件生命周期管理**两个方向，说明项目正在收紧安全边界并提升插件系统的健壮性。新提交的 PR 则聚焦于会话状态、消息投递、UI 稳定性等长期痛点。


## 4. 社区热点

今日讨论最活跃的 Issue 集中在**会话状态丢失**和**消息投递可靠性**两大主题，反映出用户对核心通信链路稳定性的高度关注：

| Issue | 标题 | 评论数 | 核心诉求 |
|---|---|---|---|
| [#77598](https://github.com/openclaw/openclaw/issues/77598) | Track live dev agent behavior and trajectory | 23 | 维护者 @pashpashpash 的 24 小时开发代理行为观察记录，社区关注 AI 辅助开发的实际效果 |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex PreToolUse native hook relay spawns CPU-bound processes | 20 | Codex 集成导致 CPU 占用飙升和网关 RPC 停滞，影响生产可用性 |
| [#68596](https://github.com/openclaw/openclaw/issues/68596) | Configurable streaming watchdog timeout threshold | 16 | 长推理模型（如 DeepSeek-R1）频繁触发流式看门狗误报，用户希望可配置超时阈值 |
| [#62505](https://github.com/openclaw/openclaw/issues/62505) | Coding Agent never completes anything | 15 | **回归问题**：编码代理在 2026.4.2 之后完全无法完成任务，已持续 4 个月未解决 |
| [#96834](https://github.com/openclaw/openclaw/issues/96834) | WhatsApp inbound image wedges main lane | 15 | WhatsApp 图片消息导致主通道阻塞约 3 分钟，多模态处理链路存在缺陷 |

**趋势分析**：社区讨论热度最高的议题从"功能请求"转向了"稳定性投诉"。特别是 #62505（编码代理完全失效）和 #96834（WhatsApp 图片阻塞）均为 P1 级问题且持续多月未修复，用户耐心正在消耗。


## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列如下：

### 🔴 P0 / 严重

| Issue | 标题 | 状态 | 是否有 Fix PR |
|---|---|---|---|
| [#70903](https://github.com/openclaw/openclaw/issues/70903) | Persistent file-based provider cooldown blocks user for hours after billing recovery | OPEN, P0 | ❌ 无 |
| [#86612](https://github.com/openclaw/openclaw/issues/86612) | Docker gateway container restart loop when OPENCLAW_SANDBOX=1 | OPEN, P1, security | ❌ 无 |

### 🟠 P1 / 高

| Issue | 标题 | 状态 | 是否有 Fix PR |
|---|---|---|---|
| [#62505](https://github.com/openclaw/openclaw/issues/62505) | Coding Agent never completes anything (regression) | OPEN, 4个月+ | ❌ 无 |
| [#96834](https://github.com/openclaw/openclaw/issues/96834) | WhatsApp inbound image wedges main lane ~3min | OPEN | ❌ 无 |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex PreToolUse hook relay spawns CPU-bound processes | OPEN | ❌ 无 |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | "Cannot convert undefined or null to object" with google-vertex | OPEN | ❌ 无 |
| [#86215](https://github.com/openclaw/openclaw/issues/86215) | Codex OAuth refresh failures wedge agent for hours | OPEN | ❌ 无 |
| [#78493](https://github.com/openclaw/openclaw/issues/78493) | sudo openclaw update creates mixed ownership, doctor overwrites config | OPEN | ❌ 无 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | OpenClaw leaks unreaped hook/tool child processes (zombies) | OPEN | ❌ 无 |
| [#87109](https://github.com/openclaw/openclaw/issues/87109) | Gateway heap grows to 1073MB+ at idle on macOS | OPEN | ❌ 无 |

### 🟡 P2 / 中

| Issue | 标题 | 状态 | 是否有 Fix PR |
|---|---|---|---|
| [#51429](https://github.com/openclaw/openclaw/issues/51429) | 工作路径被 hardcode 进代码（/Users/wangtao） | OPEN | ❌ 无 |
| [#77930](https://github.com/openclaw/openclaw/issues/77930) | Discord channel not loaded in 2026.5.4 (regression) | OPEN | ✅ 有（#linked-pr-open） |
| [#69242](https://github.com/openclaw/openclaw/issues/69242) | exec tool intermittently SIGKILLs broad find/grep commands | OPEN | ❌ 无 |
| [#71689](https://github.com/openclaw/openclaw/issues/71689) | tasks registry restore fails on malformed SQLite image | OPEN | ❌ 无 |
| [#62328](https://github.com/openclaw/openclaw/issues/62328) | node:sqlite missing FTS5 module — memory search broken | OPEN | ✅ 有（#linked-pr-open） |

**关键发现**：今日**没有**任何 P1 级 Bug 获得修复 PR。所有高严重度问题仍处于 `needs-maintainer-review` 或 `needs-product-decision` 状态，修复进展缓慢。今日新提交的 PR 中，[#125407](https://github.com/openclaw/openclaw/pull/125407)（取消子代理误报超时）和 [#125302](https://github.com/openclaw/openclaw/pull/125302)（停止静默压缩失败）与部分 P1 问题相关，但尚未直接关联。


## 6. 功能请求与路线图信号

今日活跃的功能请求中，以下几条值得关注：

| Issue | 标题 | 评论数 | 信号强度 |
|---|---|---|---|
| [#68596](https://github.com/openclaw/openclaw/issues/68596) | Configurable streaming watchdog timeout threshold | 16 👍8 | 🟢 高 — 长推理模型用户群体扩大，看门狗误报已成为普遍痛点 |
| [#67413](https://github.com/openclaw/openclaw/issues/67413) | Per-agent dreaming configuration | 9 👍5 | 🟢 高 — 多代理场景下内存峰值问题突出，用户需要细粒度控制 |
| [#42840](https://github.com/openclaw/openclaw/issues/42840) | Add MathJax/LaTeX Support to Control UI | 8 👍10 | 🟢 高 — 学术/科学用户需求明确，👍 数在今日列表中最高 |
| [#67419](https://github.com/openclaw/openclaw/issues/67419) | Session context bloat: bootstrap files re-injected every turn | 10 👍2 | 🟡 中 — 上下文膨胀浪费 20-30% token，影响成本与效率 |
| [#60572](https://github.com/openclaw/openclaw/issues/60572) | Multi-Slot Memory Architecture | 7 👍3 | 🟡 中 — 内存架构演进方向，但短期优先级可能不高 |
| [#45758](https://github.com/openclaw/openclaw/issues/45758) | Support YAML as config file format | 9 👍2 | 🟡 中 — 开发者体验改进，实现成本较低 |

**路线图判断**：结合今日 PR 动态，`per-agent` 配置方向（GitHub 身份 #125199、TTS/STT #66252、dreaming #67413）正在成为项目重点。流式看门狗超时配置（#68596）和 LaTeX 支持（#42840）虽呼声高，但暂无对应 PR，可能需等待下一轮规划。


## 7. 用户反馈摘要

从今日活跃的 Issues 评论中提炼的用户真实反馈：

**😤 最强烈的痛点：**

1. **编码代理完全失效（#62505）**：用户 @drpau 表示"这个代理已经为我工作了好几周，现在什么都不做了，只给出模糊的状态更新然后道歉"。该问题已持续 4 个多月，用户情绪明显沮丧。

2. **工作路径被硬编码（#51429）**：中文用户 @buggiant-coder 发现代码中硬编码了 `/Users/wangtao` 路径，讽刺地评论"这位 wangtao 是谁？"。这暴露了代码审查流程的漏洞。

3. **内存泄漏导致静默失败（#87109）**：用户 @Tanklive 详细记录了 Gateway 堆内存从 558MB 增长到 1073MB+ 的过程，cron 任务在内存压力下**静默失败**——"无输出、无推送、无错误上报"。

**🙏 积极的反馈：**

1. **生产环境使用**（#73537）：用户 @Reneb-cafe 表示"我们一直在将它作为家庭和商务助手运行（Telegram 集成、自动化、cron 任务、Home Assistant 控制），它已经成为我们日常工作流程的一部分"，并感谢团队的工作。

2. **功能认可**（#71195）：用户 @JackHalfordDev 对比了 Mac Talk Mode 与 voice-call 插件的延迟差异，认可 voice-call 的 sub-second 体验，希望 Talk Mode 也能达到同等水平。

**📊 数据洞察：**

- 今日评论数 Top 50 的 Issues 中，**约 60% 标注了 `impact:session-state` 或 `impact:message-loss`**，说明会话状态和消息丢失是用户最关心的稳定性问题。
- **约 70% 的活跃 Issues 带有 `clawsweeper:no-new-fix-pr` 标签**，意味着这些问题的修复 PR 尚未出现，积压情况严重。


## 8. 待处理积压

以下为长期未响应或需维护者重点关注的重要 Issue/PR：

### 🔴 超长待机（>90 天未解决）

| Issue | 标题 | 创建时间 | 严重度 | 备注 |
|---|---|---|---|---|
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | "Cannot convert undefined or null to object" in 2026.3.2 | 2026-03-06 | P1 | 已 165 天，google-vertex 用户受影响 |
| [#62505](https://github.com/openclaw/openclaw/issues/62505) | Coding Agent never completes anything | 2026-04-07 | P1 | 已 133 天，回归问题 |
| [#50093](https://github.com/openclaw/openclaw/issues/50093) | WhatsApp: Backfill missed messages after reconnection | 2026-03-19 | P1 | 已 152 天，消息丢失 |
| [#70903](https://github.com/openclaw/openclaw/issues/70903) | Persistent provider cooldown blocks user for hours | 2026-04-24 | **P0** | 已 116 天，计费恢复后仍被封锁 |

### 🟡 长期未合并的 PR（>60 天）

| PR | 标题 | 创建时间 | 状态 | 备注 |
|---|---|---|---|---|
| [#65065](https://github.com/openclaw/openclaw/pull/65065) | Add missing message channel admin subcommands | 2026-04-12 | OPEN, needs proof | 已 128 天，功能完整但缺验证 |
| [#63112](https://github.com/openclaw/openclaw/pull/63112) | fix(cron): warn when --system-event contains shell commands | 2026-04-08 | OPEN, needs proof | 已 132 天，安全提示改进 |
| [#90703](https://github.com/openclaw/openclaw/pull/90703) | Support compat reasoning levels for thinking xhigh | 2026-06-05 | OPEN, needs proof | 已 74 天，模型能力扩展 |

### ⚠️ 维护者行动建议

1. **优先处理 #70903（P0）**：计费恢复后用户仍被封锁数小时，直接影响付费用户体验，且已有明确的修复方向（冷却时间戳不应跨重启持久化）。
2. **关注 #62505（P1 回归）**：编码代理完全失效已 4 个月，作为核心卖点功能，此问题对项目声誉影响较大。
3. **清理长期 `needs-proof` 的 PR**：如 #65065、#63112，功能完整但缺少验证，建议维护者协助补充测试或明确关闭。
4. **今日新 PR 密集提交**（#125199、#125302、#125384、#125391、#125407、#125408、#125423、#125424、#125426、#125428、#125429），建议尽快安排 review，避免形成新的积压。

---

*本日报由 AI 自动生成，数据基于 2026-08-17 的 GitHub 公开信息。如需人工复核或有任何疑问，请联系项目维护者。*

---

## 横向生态对比

好的，这是基于您提供的各项目动态摘要生成的横向对比分析报告。

---

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：** 2026-08-18

## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态正处于**从“功能堆叠”向“稳定性与架构演进”过渡的关键阶段**。头部项目（如 OpenClaw、Hermes Agent）在经历高速迭代后，正面临严峻的稳定性挑战，大量 P1 级 Bug（会话丢失、安装失败、资源泄漏）积压，反映出核心链路在复杂场景下的韧性不足。与此同时，社区对**生态互操作性**（如兼容 OpenAI 协议）和**架构可插拔性**（如可替换的数据库、安全策略）的呼声日益高涨，标志着用户不再满足于单一功能，而是期待构建可集成、可定制的个人 AI 工作流。各项目在解决自身问题的同时，也在共同探索多代理协作、上下文管理与成本控制等下一代核心能力。

## 2. 各项目活跃度对比

| 项目 | Issues 更新数 | PR 更新数 | 今日 Release | 健康度评估 | 核心状态 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 (492新开/活跃, 8关闭) | 500 (410待合并, 90已合并/关闭) | 无 | 🟡 **中高活跃，修复密集但积压严重** | 核心维护者主导安全与兼容性重构，但大量 P1 问题（如编码代理失效）长期未解。 |
| **Hermes Agent** | 500 (399新开/活跃, 101关闭) | 500 (410待合并, 90已合并/关闭) | **v0.20.3** (补丁) | 🟡 **高活跃，但安装/更新链路存在短板** | 发布补丁版本，但安装器重构引入多个回归，影响新用户 onboarding。 |
| **Zeroclaw** | 50 | 50 | 无 | 🟢 **高活跃，处于重大架构升级期** | 围绕 v0.9.0 安全与架构升级，密集讨论高风险 RFC，方向明确。 |
| **QwenPaw** | 14 (8新开/活跃, 6关闭) | 35 (13待合并, 22已合并/关闭) | 无 | 🟢 **活跃，处于密集修复与功能迭代期** | v2.1.0 发布后，社区反馈集中在 MCP 工具、媒体 URL 等稳定性问题。 |
| **AstrBot** | 9 | 7 | 无 | 🟢 **中等活跃，功能迭代与反馈收集并行** | 社区反馈聚焦 WebUI 可定制性，安全 PR 在搁置后重新获得更新。 |
| **PicoClaw** | 4 (3新开/活跃, 1关闭) | 4 (1待合并, 3已合并/关闭) | 无 | 🟢 **中等活跃，稳定迭代期** | 社区提交的修复与 Bug 报告形成快速闭环，维护者正在清理积压队列。 |

## 3. OpenClaw 在生态中的定位

OpenClaw 凭借其**庞大的社区规模和极高的 Issue/PR 流量**（日更新量达 500 条），稳居生态的**核心参照系**地位。其优势在于：

- **社区规模与影响力**：Issue 讨论和 PR 提交量级远超其他项目，拥有庞大的用户基础和贡献者群体，是生态中当之无愧的“恒星”。
- **技术路线**：作为核心参照，其技术决策（如安全边界重构、插件生命周期管理）对生态有风向标意义。当前正通过 `compatibility` 和 `security-boundary` 标签的 PR 收紧核心架构。

**与同类相比的劣势与挑战**：

- **稳定性危机**：大量 P1 级 Bug（如 #62505 编码代理失效）持续数月未修复，与其社区规模形成鲜明反差，正消耗用户耐心。
- **维护瓶颈**：高流量导致维护者成为瓶颈，大量 PR 和 Issue 积压，`needs-maintainer-review` 标签泛滥，修复节奏跟不上问题产生速度。

**结论**：OpenClaw 是生态的“规模之王”，但正经历“大公司病”——社区庞大但决策和修复效率低下。其未来走向将深刻影响整个生态对“成熟度”的定义。

## 4. 共同关注的技术方向

多个项目不约而同地涌现出以下技术需求，代表了行业共同面临的挑战与机遇：

1.  **上下文管理与成本控制**：
    - **涉及项目**：OpenClaw、QwenPaw、AstrBot。
    - **具体诉求**：OpenClaw 用户抱怨上下文膨胀浪费 20-30% token（#67419）；QwenPaw 修复了图片 base64 被错误计为文本 token 的问题（#6968）；AstrBot 的 PR #9673 旨在通过注入工具调用结果来节省 token。**优化 token 使用、降低推理成本是普遍痛点。**

2.  **多代理/多会话状态隔离与协作**：
    - **涉及项目**：OpenClaw、QwenPaw、Hermes Agent。
    - **具体诉求**：QwenPaw 出现 Console 停止请求误取消飞书会话的 Bug（#7011）；Hermes Agent 存在多 profile 间密钥泄露的安全问题（#82936）；OpenClaw 则在修复取消子代理被误报超时的问题（#125407）。**在多代理、多用户、多通道场景下，保证状态和数据的严格隔离是核心挑战。**

3.  **生态互操作性与协议兼容**：
    - **涉及项目**：Zeroclaw、AstrBot。
    - **具体诉求**：Zeroclaw 的 RFC #8603 提议兼容 OpenAI Chat Completions 协议，以接入 Open WebUI 等主流客户端；AstrBot 社区出现外部项目 VOKO 的推广，暗示了 A2A（Agent-to-Agent）通信的需求。**打破数据孤岛，与主流 AI 工具链集成是扩大用户基础的关键。**

4.  **安全边界与权限管理**：
    - **涉及项目**：OpenClaw、Zeroclaw、AstrBot、Hermes Agent。
    - **具体诉求**：OpenClaw 合入了安装策略警告的审核流程；Zeroclaw 修复了邮件附件隐式读取漏洞；AstrBot 有两条关于工作区权限边界的安全 PR 待合并；Hermes Agent 存在 profile 间密钥泄露问题。**随着智能体权限增强，安全已成为所有项目的生命线。**

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | 全功能、多平台、高度可配置的个人 AI 助手 | 技术爱好者、开发者、追求极致可定制性的用户 | 插件化架构，功能全面但复杂度高，对维护要求高。 |
| **Hermes Agent** | 强调稳定性和会话管理，提供桌面端和 TUI | 开发者、追求高效工作流的专业人士 | 重视会话状态管理和恢复，但近期安装器重构引入稳定性问题。 |
| **Zeroclaw** | 安全、架构现代化、协议兼容 | 开发者、企业用户、对安全和互操作性有高要求的用户 | 正在重构安全与网关架构，积极拥抱 OpenAI 生态，强调可插拔设计。 |
| **QwenPaw** | 数据分析（DataPaw）、多通道集成、丰富的 UI 功能 | 数据分析师、企业用户、需要可视化交互的用户 | 提供原生数据分析应用，注重控制台 UI 体验，与阿里云生态（如 Qwen 模型）集成紧密。 |
| **AstrBot** | 轻量、易用、插件化、WebUI 管理 | 个人用户、非程序员、快速搭建聊天机器人的用户 | 架构轻量，部署简单，社区活跃，但功能深度和生态规模不及头部项目。 |
| **PicoClaw** | 轻量级、嵌入式、多平台适配 | 极简主义者、嵌入式开发者、资源受限环境用户 | 代码库小，专注于核心功能，强调在低功耗设备上的运行能力。 |

## 6. 社区热度与成熟度

- **快速迭代阶段（高活跃，功能演进为主）**：
    - **Zeroclaw**：处于重大架构升级期，RFC 讨论密集，方向明确，社区参与度高，是生态中最具活力的项目之一。
    - **QwenPaw**：在 v2.1.0 发布后，正处于密集的 Bug 修复和功能迭代期，社区反馈积极，迭代速度快。

- **质量巩固阶段（高活跃，但受稳定性问题困扰）**：
    - **OpenClaw**：虽然提交量巨大，但大量精力被用于处理积压的 Bug 和 PR，处于“负重前行”的巩固阶段。
    - **Hermes Agent**：发布补丁版本试图巩固稳定性，但安装/更新链路的回归问题表明其仍在质量巩固的阵痛期。

- **稳定迭代阶段（中等活跃，按部就班）**：
    - **AstrBot**：功能迭代与社区反馈收集并行，节奏稳健，处于健康的成长阶段。
    - **PicoClaw**：项目体量小，维护者能快速响应社区提交，处于稳定的维护和迭代期。

## 7. 值得关注的趋势信号

1.  **稳定性成为核心竞争力**：OpenClaw 和 Hermes Agent 的遭遇表明，当功能趋于同质化时，**稳定性和可靠性将成为用户选择智能体框架的首要考量**。对于开发者而言，投资于健壮的测试、错误处理和状态管理，比堆叠新功能更具长期价值。

2.  **“默认安全”与“最小权限”原则的普及**：从 OpenClaw 的安装策略审核到 AstrBot 的工作区权限限制，再到 Hermes Agent 的密钥泄露问题，都指向一个趋势：**智能体权限的每一次扩大，都必须伴随更严格的安全审查**。开发者需要将安全视为架构的一部分，而非事后补救。

3.  **上下文管理是下一个技术高地**：多个项目都在为 token 浪费和上下文膨胀问题寻找解决方案。**能够高效管理上下文、控制推理成本的智能体，将在实际应用中更具竞争力**。这不仅是成本问题，更是用户体验和智能体性能的关键。

4.  **互操作性决定生态位**：Zeroclaw 主动兼容 OpenAI 协议，AstrBot 生态出现 A2A 通信方案，表明**智能体不再是孤岛，而是需要融入更广泛的 AI 工具链**。开发者应关注开放标准和协议，以便让自己的智能体能与其他系统无缝协作。

5.  **“小而美”与“大而全”的分化**：PicoClaw 和 AstrBot 代表轻量、易用的路线，而 OpenClaw 和 Hermes Agent 则走向功能全面、高度可配置的路线。**未来生态将更加多元化，不同定位的项目将服务于不同层次的用户需求**，开发者可根据目标场景选择最适合的基座。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

好的，我是 Zeroclaw 开源项目分析师。根据您提供的 GitHub 数据，我为您生成了 2026-08-18 的项目动态日报。

---

# Zeroclaw 项目动态日报 - 2026-08-18

## 1. 今日速览

Zeroclaw 项目今日活跃度极高，24小时内共有 50 条 Issue 和 50 条 PR 更新，显示出强劲的开发势头。项目当前正处于 **v0.9.0 安全与架构升级** 的关键阶段，大量围绕认证、安全策略、网关边界的高风险 RFC 正在密集讨论和推进中。虽然今日无新版本发布，但核心维护者（如 @Audacity88）和资深贡献者（如 @NiuBlibing、@vrurg）在解决历史遗留问题（如 Windows 测试失败、ETXTBSY 竞态）和推进重大架构重构（如 Chat Completions profile、统一附件架构）上投入显著，项目整体健康度良好，但需关注大量待合并 PR 的积压问题。

## 2. 版本发布

**无新版本发布。**

## 3. 项目进展

今日有 9 个 PR 被合并或关闭，主要集中在 Bug 修复和 CI 改进，为项目稳定性与安全性带来了实质性提升：

- **安全修复（高优先级）**：
    - **[fix(email): stop implicit attachment file reads](https://github.com/zeroclaw-labs/zeroclaw/pull/9993)**：修复了邮件附件可能导致的隐式本地文件读取漏洞，消除了一个潜在的高危安全问题。
    - **[fix(channels): tie the WhatsApp Cloud approval token to a guard so no exit orphans it](https://github.com/zeroclaw-labs/zeroclaw/pull/9612)**：修复了 WhatsApp Cloud 审批令牌可能因异常退出而残留的问题，避免了凭证泄露风险。
    - **[fix(sop): load SOP definitions from the shared workspace, not data_dir](https://github.com/zeroclaw-labs/zeroclaw/pull/9765)**：修复了 SOP 定义加载路径错误，确保 SOP 从共享工作区而非数据目录加载，保证了配置的一致性和正确性。
- **CI/测试改进**：
    - **[ci(tests): add scheduled macOS and Windows tests](https://github.com/zeroclaw-labs/zeroclaw/pull/9398)**：新增了定时运行的 macOS 和 Windows 测试工作流，这将有助于捕获类似 #7462 中报告的跨平台问题，是提升项目稳定性的重要一步。

这些合并的 PR 不仅修复了关键的安全漏洞，还通过增强 CI 覆盖范围，从流程上预防了未来可能出现的跨平台兼容性问题。

## 4. 社区热点

今日讨论最热烈的 Issue 反映了社区对**核心架构演进**和**开发者体验**的强烈关注：

- **[RFC: Work Lanes, Board Automation, and Label Cleanup (#6808)](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)** (评论: 23)：这是一个关于项目治理和自动化的工作流 RFC，讨论热度最高。社区成员积极参与，希望优化维护者的工作流程，减少手动维护负担，这表明项目在快速发展后，社区开始关注治理效率。
- **[RFC: ZeroClaw Chat Completions profile (#8603)](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)** (评论: 23)：该 RFC 提议让 Zeroclaw 兼容 OpenAI Chat Completions 协议，以接入 Open WebUI、LobeChat 等主流客户端。高讨论度表明社区对**生态互操作性**有强烈需求，希望将 Zeroclaw 无缝集成到现有的 AI 工具链中。
- **[RFC: Goal mode v1 — bounded foreground Matrix work (#8303)](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)** (评论: 22)：该 RFC 旨在为代理引入“目标模式”，以在多次交互中持久化地追求一个用户目标。这反映了社区对**更复杂、更自主的代理行为**的期待。

**分析**：社区热点集中在通过 RFC 推动的重大架构改进上，涉及互操作性、代理能力和项目治理。这些讨论表明 Zeroclaw 正在从一个单纯的聊天机器人框架，向一个更通用、更强大的 AI 代理平台演进。

## 5. Bug 与稳定性

今日报告的 Bug 主要集中在跨平台兼容性、并发安全和配置正确性方面：

- **严重 (S2 - 功能降级)**：
    - **[\[Bug\]: 74 test failures on Windows (#7462)](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)**：这是一个长期存在的问题，导致 Windows 平台上有 74 个测试失败。虽然 CI 已新增 Windows 测试（见 PR #9398），但该 Issue 仍开放，需要后续修复。
- **中高优先级 (P1)**：
    - **[\[Task\]: runtime-written executable test fixtures hit ETXTBSY (#9965)](https://github.com/zeroclaw-labs/zeroclaw/issues/9965)**：这是一个测试基础设施问题，在并行运行时会导致测试竞态失败。已有对应的修复 PR **[test(cron): avoid ETXTBSY race in custom shell test (#10010)](https://github.com/zeroclaw-labs/zeroclaw/pull/10010)** 和 **[\[Task\]: avoid runtime-written executable in daemon heartbeat test (#10011)](https://github.com/zeroclaw-labs/zeroclaw/issues/10011)** 正在处理中。
    - **[Failure logs claim the requested model, not the pinned fallback model (#10023)](https://github.com/zeroclaw-labs/zeroclaw/issues/10023)**：这是一个新报告的 Bug，会导致故障日志信息不准确，误导排查。目前尚无关联的修复 PR。

**稳定性评估**：项目正在积极解决测试基础设施的顽疾（如 ETXTBSY），并已通过 CI 改进来预防跨平台问题。但 Windows 测试失败和日志信息不准确等问题仍需关注。

## 6. 功能请求与路线图信号

今日的功能请求和 RFC 清晰地勾勒出 Zeroclaw 未来的技术路线图：

- **明确的路线图信号**：
    - **协议兼容层**：**[RFC: ZeroClaw Chat Completions profile (#8603)](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)** 是向 OpenAI 生态兼容迈出的重要一步，极有可能被纳入下一版本。
    - **安全架构升级**：多个高优先级 RFC，如 **[RFC: Pluggable inbound authentication (#7141)](https://github.com/zeroclaw-labs/zeroclaw/issues/7141)** 和 **[RFC: Runtime-owned security decision pipeline (#7142)](https://github.com/zeroclaw-labs/zeroclaw/issues/7142)**，是 v0.9.0 里程碑的核心，旨在构建更健壮、可插拔的安全模型。
    - **核心轻量化**：**[RFC: Prefer a lighter ZeroClaw core through external integrations (#6165)](https://github.com/zeroclaw-labs/zeroclaw/issues/6165)** 的持续讨论表明，项目有意将非核心功能外置，以保持核心的简洁和可维护性。
- **新功能请求**：
    - **[\[Feature\]: Support Option-Backspace word deletion in ZeroCode text inputs (#10059)](https://github.com/zeroclaw-labs/zeroclaw/issues/10059)**：这是一个针对 macOS 用户体验的“good first issue”，实现难度低，可能会在近期被合并。

**结论**：Zeroclaw 的路线图非常清晰，即围绕 **v0.9.0 安全架构升级** 和 **生态互操作性** 两大主题展开。同时，项目也通过“good first issue”等方式吸引新贡献者，保持社区活力。

## 7. 用户反馈摘要

从今日的 Issue 和 PR 评论中，可以提炼出以下用户反馈：

- **痛点**：
    - **跨平台支持不足**：Issue #7462 明确指出了 Windows 平台测试失败的问题，反映了 Windows 用户对项目跨平台成熟度的担忧。
    - **配置与日志不透明**：Issue #10023 抱怨故障日志不准确，这增加了用户排查问题的难度。此外，多个 RFC（如 #7897）也提到配置更新后需要完整重载守护进程，这影响了运维体验。
    - **安全默认策略**：Issue #9397 指出 WhatsApp 频道的 `allowed_groups` 默认为空列表，但实际行为是允许所有群组，这是一个危险的默认配置，用户期望更安全的“默认拒绝”策略。
- **使用场景与期望**：
    - **工具链集成**：RFC #8603 的讨论表明，用户希望将 Zeroclaw 接入到 Open WebUI、Aider 等主流 AI 客户端中，将其作为后端代理使用。
    - **更智能的代理行为**：RFC #8303 关于“Goal mode”的讨论，反映了用户对代理执行多步骤、有明确目标任务的强烈需求。

## 8. 待处理积压

以下 Issue 和 PR 长期未得到响应或解决，需要维护者重点关注：

- **重要 Issue**：
    - **[\[Bug\]: 74 test failures on Windows (#7462)](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)**：创建于 6 月，至今仍开放，是影响项目跨平台声誉的关键问题。
    - **[RFC: Prefer a lighter ZeroClaw core through external integrations (#6165)](https://github.com/zeroclaw-labs/zeroclaw/issues/6165)**：创建于 4 月，讨论持续但似乎尚未形成最终决策，需要维护者推动定论。
- **待合并 PR**：
    - **[feat(providers): add native Hailo-Ollama support (#9109)](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)**：一个功能丰富的 PR，但标记为 `needs-author-action`，可能因作者未响应而停滞。
    - **[fix(providers): surface cause-specific provider failure diagnostics (#9056)](https://github.com/zeroclaw-labs/zeroclaw/pull/9056)**：同样标记为 `needs-author-action` 和 `stale-candidate`，该 PR 旨在改进错误信息，对用户体验有直接帮助，需要作者或维护者介入。
    - **[fix(channels): populate the typed media envelope from Telegram (#9563)](https://github.com/zeroclaw-labs/zeroclaw/pull/9563)**：一个重要的功能修复，但同样因 `needs-author-action` 和 `stale-candidate` 标签而陷入停滞。

**维护者行动建议**：优先处理标记为 `needs-maintainer-review` 的高风险 PR，并联系 `needs-author-action` 的 PR 作者，推动这些有价值的贡献尽快合并或关闭，避免技术债累积。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报

**日期：2026-08-18** | **数据来源：github.com/sipeed/picoclaw**


## 1. 今日速览

PicoClaw 项目在过去 24 小时内保持中等活跃度：共产生 4 条 Issue 更新（3 条新开/活跃，1 条关闭）和 4 条 PR 更新（1 条待合并，3 条已合并/关闭）。值得关注的是，社区提交的 Slack 媒体上传修复 PR（#3340）与同日报告的 Bug（#3338）形成快速闭环，体现了良好的社区响应机制。同时，两个长期积压的 Issue/PR（#3311/#3312、#3287）在今日被标记为 stale 并关闭，项目维护者正在清理积压队列。无新版本发布，项目处于稳定的迭代期。


## 2. 版本发布

今日无新版本发布。


## 3. 项目进展

今日合并/关闭了 3 个 PR，其中 2 个为实质性变更：

| PR | 类型 | 说明 |
|---|---|---|
| [#271](https://github.com/sipeed/picoclaw/pull/271) | 修复 | **env 覆盖修复**：修复了 config.json 缺失时（常见于 Fly 等平台仅用 secrets/env 部署）环境变量覆盖不生效的问题。此前应用会回退到默认模型（glm-4.7）并因缺少凭据而启动失败。修复后始终执行 `env.Parse(cfg)`，并补充了回归测试。 |
| [#2606](https://github.com/sipeed/picoclaw/pull/2606) | 增强 | **微信渠道多实例支持**：增强了微信渠道的多实例处理与配置管理，涵盖后端、前端和文档，包括渠道目录与动态实例处理、非法渠道名校验、多实例流程稳定性强化。 |
| [#3312](https://github.com/sipeed/picoclaw/pull/3312) | 修复（stale 关闭） | **工具重复失败提前终止**：修复了工具以相同错误反复失败时 agent 循环静默空转到 `max_tool_iterations` 的问题。该 PR 因长期未合并被标记为 stale 关闭，但其修复目标与 Issue #3311 对应，建议维护者重新评估。 |

**整体评估**：今日合并的 PR 主要解决了部署配置健壮性和渠道功能完整性两个方向的问题，项目在稳定性与多平台适配方面持续推进。


## 4. 社区热点

今日最受关注的 Issue 为 **[#3287 - IRC 长消息支持](https://github.com/sipeed/picoclaw/issues/3287)**（6 条评论，创建于 2026-07-22，今日被标记为 stale 关闭）。

**诉求分析**：IRC 协议默认限制单条消息 512 字节，超长消息会被客户端自动拆分。用户希望 PicoClaw 能将 IRCv3 协议下拆分的长消息识别并合并为一条完整消息处理。该需求涉及消息协议层的语义理解，属于功能性增强而非简单 Bug 修复。Issue 虽被标记为 stale 关闭，但需求本身仍然有效，建议维护者考虑将其纳入路线图或明确回复处理计划。


## 5. Bug 与稳定性

今日报告 2 个新 Bug，按严重程度排列：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 🔴 高 | [#3338](https://github.com/sipeed/picoclaw/issues/3338) | **Slack 图片上传失败**：`SendMedia` 构建 `slack.UploadFileParameters` 时未设置 `FileSize` 字段，导致 slack-go SDK 在发起网络请求前即拒绝所有上传（报错 `file size cannot be 0`）。**影响所有 Slack 渠道的图片/媒体发送功能。** | ✅ 已有修复 PR [#3340](https://github.com/sipeed/picoclaw/pull/3340)（待合并） |
| 🟡 中 | [#3339](https://github.com/sipeed/picoclaw/issues/3339) | **Google Antigravity 生成请求返回 429**：OAuth 认证和模型发现均正常，但所有生成请求返回 `RESOURCE_EXHAUSTED`，响应中无配额详情。疑似服务端配额限制或请求参数问题。 | ⏳ 待排查 |

**历史 Bug 关闭**：[#3311](https://github.com/sipeed/picoclaw/issues/3311)（工具重复失败静默空转）今日关闭，但对应的修复 PR #3312 也被 stale 关闭，**问题可能仍未解决**，建议维护者跟进。


## 6. 功能请求与路线图信号

| 功能请求 | 来源 | 分析 |
|---|---|---|
| **IRC 长消息合并** | [#3287](https://github.com/sipeed/picoclaw/issues/3287) | 涉及 IRCv3 协议层的消息重组，属于消息渠道的协议适配增强。当前被 stale 关闭，但需求明确，若纳入路线图可提升 IRC 渠道的实用性。 |
| **Slack 媒体上传修复** | [#3338](https://github.com/sipeed/picoclaw/issues/3338) + PR [#3340](https://github.com/sipeed/picoclaw/pull/3340) | 社区已提交修复 PR，若合并将恢复 Slack 渠道的媒体发送能力。预计将随下个 patch 版本发布。 |

**路线图信号**：今日无新版本发布，但两个 PR（#3340、#271）已就绪，预计下个版本将包含 Slack 媒体修复、env 覆盖修复和微信渠道增强。


## 7. 用户反馈摘要

- **Slack 媒体上传不可用**（#3338）：用户报告所有 Slack 图片上传均失败，错误信息为 `file size cannot be 0`。该问题影响 Telegram 之外的主流聊天渠道的媒体功能，用户期望尽快修复。
- **工具失败无反馈**（#3311）：用户在生产环境（Telegram）中遇到 agent 执行 `git` 命令时因凭据缺失反复失败，但用户始终未收到任何回复，直到 `max_tool_iterations` 耗尽。用户痛点在于**错误反馈缺失**和**超时等待过长**。
- **Antigravity 配额异常**（#3339）：用户已完成 OAuth 认证和模型发现，但生成请求全部返回 429，且无配额详情。用户困惑于认证成功但无法使用的问题。
- **IRC 长消息处理**（#3287）：用户希望 PicoClaw 能理解 IRCv3 拆分后的长消息为单一完整消息，当前行为会导致消息被截断或语义割裂。


## 8. 待处理积压

| 项目 | 类型 | 创建时间 | 最后更新 | 说明 |
|---|---|---|---|---|
| [#3312](https://github.com/sipeed/picoclaw/pull/3312) | PR（stale 关闭） | 2026-08-02 | 2026-08-17 | **修复工具重复失败静默空转**的 PR 被 stale 关闭，但对应 Issue #3311 的用户痛点仍然存在。建议维护者重新打开并评估合并。 |
| [#3287](https://github.com/sipeed/picoclaw/issues/3287) | Issue（stale 关闭） | 2026-07-22 | 2026-08-17 | **IRC 长消息支持**需求被 stale 关闭，但无替代方案或维护者回复。建议明确回应或纳入路线图。 |
| [#3340](https://github.com/sipeed/picoclaw/pull/3340) | PR（待合并） | 2026-08-17 | 2026-08-17 | **Slack 媒体上传修复**，对应 Bug #3338 影响所有 Slack 用户。建议尽快 review 并合并。 |

---

*本日报由 AI 自动生成，数据截至 2026-08-18。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-18

## 1. 今日速览

QwenPaw 项目过去24小时保持高度活跃：共产生 14 条 Issue 更新（8 条新开/活跃、6 条已关闭）和 35 条 PR 更新（13 条待合并、22 条已合并/关闭），无新版本发布。社区反馈集中在 v2.1.0 的稳定性问题（MCP 工具调用崩溃、图片 URL 过期、插件热重载钩子丢失等），同时有多个功能增强请求（按频道独立配置模型、定时任务运行细节展示等）和 4 个 first-time-contributor 提交的 PR，显示社区参与度良好。项目当前处于 v2.1.0 发布后的密集修复与功能迭代期，整体健康度良好，但需关注若干影响核心体验的 Bug 修复进度。

## 2. 版本发布

过去24小时内无新版本发布。当前最新版本为 v2.1.0。

## 3. 项目进展

今日共 22 条 PR 被合并/关闭，以下为重要变更：

**功能推进：**
- [#6940 feat(pawapp): add native DataPaw app runtime and durable analysis workspace](https://github.com/agentscope-ai/QwenPaw/pull/6940)（已合并）— 新增 DataPaw 原生应用运行时和持久化分析工作区，为数据分析场景提供独立的应用体验。配套 PR [#7089](https://github.com/agentscope-ai/QwenPaw/pull/7089) 为其建立独立的版本驱动发布流水线，使其可独立于主项目发布节奏更新。
- [#7017 fix(console): open newly installed PawApps without reload](https://github.com/agentscope-ai/QwenPaw/pull/7017)（已合并）— 新安装的 PawApps 可立即从 App Center 和桌面打开，无需手动刷新页面；更新已安装应用时自动重载前端 bundle。
- [#7036 feat(console): add media download controls](https://github.com/agentscope-ai/QwenPaw/pull/7036)（已合并）— 为聊天中的媒体附件增加统一的下载功能，音频下载按钮置于播放器控制栏中。
- [#6975 fix(console): update context-usage ring after compact](https://github.com/agentscope-ai/QwenPaw/pull/6975)（已合并）— 修复 `/compact` 后上下文使用率环形指示器不更新的问题。
- [#6968 fix(token-usage): stop counting image base64 as text tokens](https://github.com/agentscope-ai/QwenPaw/pull/6968)（已合并）— 修复图片 base64 被错误计为文本 token 的问题（一张 2MB 照片曾被计为约 70 万 token），避免上下文窗口虚满。
- [#5151 fix(GitPanel): fix tabs styles not applied due to incorrect class prefix](https://github.com/agentscope-ai/QwenPaw/pull/5151)（已合并）— 修复 GitPanel 标签页样式因 CSS 类前缀不匹配而未生效的问题。
- [#6981 feat(console): remove approval hints from i18n placeholders](https://github.com/agentscope-ai/QwenPaw/pull/6981)（已合并）— 从七个语言文件的聊天输入占位符中移除 `/approve` 和 `/deny` 提示。

**待合并的重要 PR（13 条待合并中）：**
- [#7087 fix(agents): localize remote media URLs client-side before model requests](https://github.com/agentscope-ai/QwenPaw/pull/7087) — 在发送模型请求前将远程媒体 URL 本地化，解决热链接保护和后端网络受限问题。
- [#7086 fix(console): unify language options between settings gear and dropdown](https://github.com/agentscope-ai/QwenPaw/pull/7086) — 统一设置齿轮和下拉菜单的语言选项（7 种 vs 5 种）。
- [#6515 feat(providers): add Volcengine Agent Plan and Xiaomi MiMo V2.5 API](https://github.com/agentscope-ai/QwenPaw/pull/6515) — 新增火山引擎 Agent Plan 和小米 MiMo V2.5 作为内置模型提供商。
- [#6719 feat(chat): add persistent workspace artifact cards](https://github.com/agentscope-ai/QwenPaw/pull/6719) — 实现 WorkBuddy 风格的工作区产物卡片，持久化到会话中。
- [#6976 feat: session-scoped multi project directories](https://github.com/agentscope-ai/QwenPaw/pull/6976) — 支持一个会话绑定多个项目目录。
- [#6302 feat: unify provider discovery, model metadata, routing, and agent controls](https://github.com/agentscope-ai/QwenPaw/pull/6302) — 大规模统一模型提供商发现、元数据、路由和智能体模型控制。

## 4. 社区热点

**最热 Issue：**
- [#6405 [CLOSED] 升级2.0以后，mcp工具总是提示Tool not found](https://github.com/agentscope-ai/QwenPaw/issues/6405)（7 条评论）— 用户升级到 2.0 后 MCP 工具持续报 "Tool not found"，工具名已变为 `[mcp-key]__[tool_name]` 格式但仍无法找到。该问题已关闭，但反映了 MCP 工具命名规范变更对用户的影响。

- [#7011 [OPEN] Console stop request can cancel an active Feishu session under multiple UI sessions](https://github.com/agentscope-ai/QwenPaw/issues/7011)（6 条评论）— 多 UI 会话下，Console 的停止请求会错误取消活跃的飞书会话。涉及会话身份标识在多 UI 会话间串扰的问题，属于多通道并发场景下的严重 Bug。

**最热 PR：**
- [#6940 feat(pawapp): add native DataPaw app runtime](https://github.com/agentscope-ai/QwenPaw/pull/6940)（已合并）— 作为新功能 PR 获得较多关注，展示了数据分析场景的完整 UI 截图，社区对独立数据分析应用表现出兴趣。

**诉求分析：** 社区热点集中在两个方向：一是 MCP 工具集成体验（命名规范、工具发现），二是多通道/多会话并发下的状态隔离问题。前者影响工具生态的可用性，后者影响企业级多通道部署的可靠性。

## 5. Bug 与稳定性

按严重程度排列：

**高严重度：**
- [#7063 [CLOSED] Agent 执行工具调用时必现崩溃](https://github.com/agentscope-ai/QwenPaw/issues/7063) — `_execute_tool_call` 中对 coroutine 使用 `async for` 导致 `TypeError`，工具调用必然崩溃。已关闭（标记为 invalid），但需确认是否已通过其他 PR 修复。
- [#7011 [OPEN] Console stop request 可取消活跃的飞书会话](https://github.com/agentscope-ai/QwenPaw/issues/7011) — 多 UI 会话下会话身份串扰，Console 停止请求会中断飞书会话。尚无 fix PR。

**中严重度：**
- [#7088 [CLOSED] OneBot 通道传递短期有效的 QQ 图片 URL 导致 400 错误和会话中毒](https://github.com/agentscope-ai/QwenPaw/issues/7088) — QQ 图片签名 URL（约 2 小时有效期）被直接传给模型后端，过期后下载失败且历史会话中的过期 URL 持续污染后续回复。已关闭。
- [#7077 [CLOSED] 插件运行时钩子在 workspace 重载后静默丢失](https://github.com/agentscope-ai/QwenPaw/issues/7077) — 热安装插件后 workspace 重载导致 `register_runtime_hook()` 等钩子丢失。已关闭。
- [#7082 [OPEN] `_StructuredOutputDynamicClass` is not fully defined](https://github.com/agentscope-ai/QwenPaw/issues/7082) — Pydantic 动态类未完全定义导致控制台通道初始化失败。尚无 fix PR。
- [#7084 [OPEN] 历史对话只有一条时无法打开](https://github.com/agentscope-ai/QwenPaw/issues/7084) — 仅有一条历史会话时，新聊天中点击历史会话无响应。尚无 fix PR。

**低严重度：**
- [#7051 [CLOSED] Console 聊天中图片附件在会话重载后丢失](https://github.com/agentscope-ai/QwenPaw/issues/7051) — 关闭重开会话后图片缩略图损坏。已关闭。
- [#7048 [CLOSED] `cron update --text` 返回成功但 prompt 未更新](https://github.com/agentscope-ai/QwenPaw/issues/7048) — agent 类型定时任务的文本更新无效。已关闭（标记为 invalid）。

## 6. 功能请求与路线图信号

**高潜力纳入下一版本：**
- [#7085 [Feature] 按频道独立配置模型](https://github.com/agentscope-ai/QwenPaw/issues/7085) — 用户希望不同渠道（钉钉、微信、控制台）可独立配置不同模型。当前模型配置是全局或智能体级别的。结合 [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)（统一模型路由和控制）和 [#6515](https://github.com/agentscope-ai/QwenPaw/pull/6515)（新增模型提供商）的推进，渠道级模型配置很可能在后续版本中实现。
- [#7079 [Feature] 可插拔 PowerContext 长期记忆后端](https://github.com/agentscope-ai/QwenPaw/issues/7079) — 已有对应 PR [#7080](https://github.com/agentscope-ai/QwenPaw/pull/7080) 提交，实现 `BaseMemoryManager` 抽象，与现有 `ReMeLightMemoryManager` 并列可选。

**中低潜力：**
- [#6925 [Feature] 智能体协作希望在一个会话窗口里](https://github.com/agentscope-ai/QwenPaw/issues/6925) — 用户希望多智能体协作在同一会话窗口内完成，而非每次创建新会话并手动切换。
- [#7075 [Feature] 增加定时任务的运行细节](https://github.com/agentscope-ai/QwenPaw/issues/7075) — 希望展示定时任务的开始时间、运行时长、结束时间、运行结果等详细信息。

## 7. 用户反馈摘要

**真实痛点：**
- **MCP 工具升级断裂**（#6405）：用户升级 2.0 后 MCP 工具不可用，工具命名规范变更（`[mcp-key]__[tool_name]`）导致现有配置失效，升级体验受损。
- **图片 URL 过期导致会话中毒**（#7088）：QQ 图片签名 URL 过期后，模型端下载失败且历史会话中的过期 URL 持续影响后续对话，用户需要手动清理会话。
- **多智能体协作体验割裂**（#6925）：协作对话每次创建新会话，用户需要手动切换智能体查看对话内容，操作成本高。
- **定时任务黑盒**（#7075）：长时间运行的任务（5-10 分钟）无法确认是否准时触发、是否仍在运行，缺乏过程可见性。

**满意/积极反馈：**
- 社区对 DataPaw 原生应用（#6940）表现出兴趣，数据分析场景的独立应用体验获得关注。
- 多个 first-time-contributor 提交的 PR（#7086、#7080、#7081）显示项目对新贡献者友好，文档和贡献指南有效。

## 8. 待处理积压

**长期未响应的 PR：**
- [#6302 feat: unify provider discovery, model metadata, routing, and agent controls](https://github.com/agentscope-ai/QwenPaw/pull/6302) — 自 2026-07-21 创建，已近一个月，涉及大规模架构调整，需维护者评估并推进。
- [#6719 feat(chat): add persistent workspace artifact cards](https://github.com/agentscope-ai/QwenPaw/pull/6719) — 自 2026-08-05 创建，已两周，实现 WorkBuddy 风格的工作区产物卡片，功能完整但尚未合并。
- [#6515 feat(providers): add Volcengine Agent Plan and Xiaomi MiMo V2.5 API](https://github.com/agentscope-ai/QwenPaw/pull/6515) — 自 2026-07-28 创建，已三周，新增两个常用模型提供商，建议尽快评审。

**需关注的重要 Issue：**
- [#7011 Console stop request can cancel an active Feishu session](https://github.com/agentscope-ai/QwenPaw/issues/7011) — 多 UI 会话状态串扰问题，影响多通道并发部署的稳定性，尚无 fix PR，建议优先处理。
- [#7082 `_StructuredOutputDynamicClass` is not fully defined](https://github.com/agentscope-ai/QwenPaw/issues/7082) — 控制台通道初始化失败，影响核心功能，尚无 fix PR。

---

*本日报由 AI 自动生成，数据截至 2026-08-18。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-18

> 数据来源：github.com/NousResearch/hermes-agent | 统计窗口：2026-08-17 ~ 2026-08-18


## 1. 今日速览

过去 24 小时项目保持高活跃度：**500 条 Issue 更新**（新开/活跃 399，关闭 101）与 **500 条 PR 更新**（待合并 410，合并/关闭 90），其中新提交的 PR 集中在 8 月 17 日当天，说明社区贡献节奏紧凑。昨日发布补丁版本 **v0.20.3 (v2026.8.16.2)**，汇总了自 v0.20.2 以来约 125 个 PR，为下游 Docker 镜像和托管部署提供稳定基线。值得关注的是，**P1 级 Bug 数量有所抬头**（安装流程、Windows 更新、CLI 审批面板等），且多个 P1 问题集中在安装/更新链路，提示近期重构可能引入了回归，需要维护团队优先排查。


## 2. 版本发布

### Hermes Agent v0.20.3 (v2026.8.16.2) — 补丁版本

- **发布日期：** 2026-08-16
- **性质：** Patch release，汇总自 v0.20.2 以来约 125 个合并 PR
- **目标受众：** 下游 Docker 镜像、托管部署、新安装用户
- **变更范围：** 未在 Release Notes 中列出具体破坏性变更，但考虑到 PR 数量较大，建议下游用户关注以下风险点：
  - 多个与 `uv.lock` 和安装脚本相关的 Bug 在 v0.20.3 发布后仍处于开放状态（见 #88361、#87093），说明安装链路可能仍有遗留问题
  - Windows 平台更新机制存在已知缺陷（#86093、#83846），升级前建议备份安装目录

> ⚠️ **迁移注意：** 若从 v0.20.2 升级，建议先在测试环境验证安装脚本和依赖同步流程；Windows 用户需特别注意 `hermes update` 的已知问题。


## 3. 项目进展

### 今日合并/关闭的重要 PR

| PR | 标题 | 状态 | 影响 |
|---|---|---|---|
| [#86046](https://github.com/NousResearch/hermes-agent/pull/86046) | fix(termux): ddgs web provider falls back to requests on Android (primp panic) | 已关闭 | 修复 Termux/Android 上 `ddgs` 搜索 worker 因 `primp` Rust HTTP 客户端 panic 导致的 SIGABRT 崩溃，回退到 `requests` 实现 |
| [#69931](https://github.com/NousResearch/hermes-agent/issues/69931) | Track upgrade to mcp==2.0.0b2 and MCP 2026-07-28 stateless migration | 已关闭 | MCP 协议升级跟踪完成，为后续协议迁移铺路 |
| [#80450](https://github.com/NousResearch/hermes-agent/issues/80450) | delegate_task: pinned delegation.provider/model silently replaced at runtime | 已关闭 | 修复委派任务中固定模型被父级回退链静默替换的问题 |
| [#41662](https://github.com/NousResearch/hermes-agent/issues/41662) | Windows gateway cron scheduler circular dependency + os.kill(pid,0) broken | 已关闭 | 修复 Windows 上网关崩溃后 cron 任务无法自动恢复的问题 |
| [#4667](https://github.com/NousResearch/hermes-agent/issues/4667) | Auto-discover project-local skills from working directory | 已关闭 | 支持从项目工作目录自动发现本地 skills（如 `.claude/skills/`） |

### 今日新提交的高质量 PR（待合并）

- **#88696** — [fix(state): rebuild wrong-shaped FTS vtables before the optimize backfill](https://github.com/NousResearch/hermes-agent/pull/88696)：修复 FTS 索引形状错误导致的恢复问题
- **#88692** — [refactor(agent): extract agent tool dispatch](https://github.com/NousResearch/hermes-agent/pull/88692)：将 agent 工具路由逻辑抽取为独立模块，提升可维护性
- **#88693** — [fix(gateway): preserve configured context window in /context](https://github.com/NousResearch/hermes-agent/pull/88693)：修复 `/context` 接口在无驻留 agent 时丢失上下文窗口配置的问题
- **#88685** — [Fix/memory new text](https://github.com/NousResearch/hermes-agent/pull/88685)：修复 `memory` 工具 `new_text` 参数始终报错的问题

**整体判断：** 项目在会话状态管理、FTS 索引、委派任务生命周期等核心链路上持续加固，同时社区贡献者开始关注桌面端体验（Bot 聊天、Kanban 移动端适配）和插件化扩展（worker lane 协议）。


## 4. 社区热点

### 今日讨论最活跃的 Issues

| Issue | 标题 | 评论数 | 核心诉求 |
|---|---|---|---|
| [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) | Skills index is stale or degraded | 47 | 自动化探针检测到 Skills Hub 索引过期（29.8h > 26h 限制），影响文档站可用性 |
| [#23717](https://github.com/NousResearch/hermes-agent/issues/23717) | RFC: Pluggable SessionDB Provider — PostgreSQL, MySQL, and Beyond | 17 | 社区强烈要求将 SQLite 替换为可插拔的数据库后端，解决热更新时的 "Death Spiral" 问题 |
| [#73082](https://github.com/NousResearch/hermes-agent/issues/73082) | Desktop client renderer/GPU processes spin at 100%+ CPU at idle | 14 | Electron 桌面端空闲时 CPU 占用过高，macOS 用户报告机器发热严重 |
| [#83390](https://github.com/NousResearch/hermes-agent/issues/83390) | Auxiliary title_generation fails on DeepSeek: HTTP 400 | 13 | DeepSeek 模型不支持 `response_format` 参数，导致辅助标题生成失败 |
| [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) | Default profile's secrets leak into secondary profile's terminal tool | 13 | **安全问题：** 多 profile 场景下默认 profile 的密钥泄露到次级 profile 的子进程中 |

### 分析

- **#23717（Pluggable SessionDB）** 获得 7 个 👍，是社区呼声最高的架构级需求。SQLite 在热更新场景下的文件锁问题（"Hot-Update Death Spiral"）已影响大量用户，但该 RFC 自 5 月提出至今仍处于 `needs-decision` 状态，需要维护团队明确表态。
- **#82936（密钥泄露）** 是今日最严重的安全隐患，涉及多 profile 隔离边界，建议优先处理。
- **#66616（Skills index 过期）** 评论数最多（47 条），但属于自动化探针报警，实际影响有限，不过持续未修复会影响文档站体验。


## 5. Bug 与稳定性

### P1 级（严重）

| Issue | 标题 | 状态 | 是否有 Fix PR |
|---|---|---|---|
| [#87093](https://github.com/NousResearch/hermes-agent/issues/87093) | Debian installation broken; uv.lock & npm install failed | 开放 | ❌ 无 |
| [#83846](https://github.com/NousResearch/hermes-agent/issues/83846) | ZIP fallback deletes the built desktop app and never rebuilds it | 开放 | ❌ 无 |
| [#86093](https://github.com/NousResearch/hermes-agent/issues/86093) | Windows: hermes update always fails (live hermes.exe cannot be renamed) | 开放 | ❌ 无 |
| [#88197](https://github.com/NousResearch/hermes-agent/issues/88197) | TUI shutdown leaves dirty ended_at on live session → rotation aborts | 开放 | ❌ 无 |
| [#87183](https://github.com/NousResearch/hermes-agent/issues/87183) | CLI approval panel never renders (env-leak family) | 已关闭 | ✅ 已修复 |
| [#82627](https://github.com/NousResearch/hermes-agent/issues/82627) | Telegram gateway hangs at 'Connecting to Telegram' on macOS 26 | 已关闭 | ✅ 已修复 |

### P2 级（中等）

| Issue | 标题 | 状态 |
|---|---|---|
| [#88361](https://github.com/NousResearch/hermes-agent/issues/88361) | uv.lock needs update / sync error during installation | 开放 |
| [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) | Default profile's secrets leak into secondary profile's terminal tool | 开放（安全） |
| [#69672](https://github.com/NousResearch/hermes-agent/issues/69672) | messages_fts_trigram indexes NUL sentinel → FTS integrity SQLite-version-dependent | 开放 |
| [#50765](https://github.com/NousResearch/hermes-agent/issues/50765) | ACP session/prompt hangs after conversation turn on Windows (0.17.0 regression) | 开放 |
| [#73804](https://github.com/NousResearch/hermes-agent/issues/73804) | Cron: no-agent script jobs with workdir needlessly serialized | 开放 |

### 趋势判断

**安装/更新链路是当前最大的稳定性短板**：Debian 安装失败（#87093）、Windows 更新死锁（#86093）、ZIP 回退删除应用（#83846）、uv.lock 同步错误（#88361）——四个独立问题指向同一区域。v0.20.3 发布后这些 Bug 仍开放，说明补丁版本未完全覆盖安装器重构引入的回归。建议维护团队将安装/更新链路作为下一补丁版本的最高优先级。


## 6. 功能请求与路线图信号

### 高潜力功能（已有对应 PR 或明确社区需求）

| 功能 | 相关 Issue/PR | 信号强度 |
|---|---|---|
| **Pluggable SessionDB Provider**（PostgreSQL/MySQL） | [#23717](https://github.com/NousResearch/hermes-agent/issues/23717) | 高（7 👍，17 评论，RFC 已充分讨论） |
| **统一 deadline 层**（解决 timeout/hang 积压） | [#85125](https://github.com/NousResearch/hermes-agent/issues/85125) | 高（400+ 相关 issue，架构级修复方案） |
| **自动 fresh-session 交接**（压缩风险时） | [#20372](https://github.com/NousResearch/hermes-agent/issues/20372) | 中（2 👍，与 #88197 压缩 Bug 相关） |
| **Voice mode in browser dashboard**（WebRTC） | [#20765](https://github.com/NousResearch/hermes-agent/issues/20765) | 中（5 👍，远程场景刚需） |
| **Generic plugin worker lane protocol** | [#88346](https://github.com/NousResearch/hermes-agent/pull/88346) | 中（PR 已提交，插件化方向） |
| **home-manager 模块**（NixOS 用户） | [#9087](https://github.com/NousResearch/hermes-agent/pull/9087) | 低（长期开放，Nix 用户群体较小） |

### 路线图判断

- **#85125（统一 deadline 层）** 是当前最有价值的架构改进提案，直指 400+ 个 timeout/hang 类 issue 的根因。若被采纳，将大幅减少此类 Bug 的复发。
- **#23717（Pluggable SessionDB）** 已讨论 3 个月，社区耐心在消耗。建议维护团队给出明确的时间表或阶段性方案。
- **#88346（plugin worker lane）** 若合并，将显著提升 Kanban 和 cron 的扩展性，值得关注。


## 7. 用户反馈摘要

### 痛点与不满

1. **安装体验差（多平台）**
   - Debian 用户 @thelightning87："Basic Debian 13.6 installation. Only Yum installed additionally." 安装脚本直接失败（[#87093](https://github.com/NousResearch/hermes-agent/issues/87093)）
   - Windows 用户 @baoyu0："hermes update always fails at the dependency-install step because the live hermes.exe cannot be renamed"（[#86093](https://github.com/NousResearch/hermes-agent/issues/86093)）
   - Windows 用户 @ArcGG33："The desktop app silently disappears. Start Menu and desktop shortcuts still exist but point at a deleted Hermes"（[#83846](https://github.com/NousResearch/hermes-agent/issues/83846)）

2. **安装脚本"越界"行为引发强烈不满**
   - 用户 @ttomiczek 在 [#18357](https://github.com/NousResearch/hermes-agent/issues/18357) 中措辞激烈："Never seen that before - it borders criminal behavior, seriously, computer sabotage"——安装脚本将 npm 全局安装劫持到 `~/.hermes/node`，破坏其他软件的正常使用。该 Issue 已开放 3 个多月，仍未解决。

3. **桌面端资源占用**
   - macOS 用户 @Heybinshao："The macOS battery/power menu reports Hermes as the highest energy consumer and the machine gets noticeably hot"（[#73082](https://github.com/NousResearch/hermes-agent/issues/73082)）

4. **多 profile 隔离失效（安全担忧）**
   - 用户 @neo-wanderer："A secondary profile configured to be least-privilege (no cred...) still has access to the default profile's secrets"（[#82936](https://github.com/NousResearch/hermes-agent/issues/82936)）

### 满意点

- 社区对 MCP 协议升级跟踪（#69931）的关闭表示认可
- 项目对 P1 级 Bug 的响应速度尚可（#87183、#82627 均在数日内关闭）
- 桌面端 Bot 聊天体验的持续改进（#88678、#88690）获得正面反馈


## 8. 待处理积压

### 长期未响应的关键 Issue

| Issue | 标题 | 创建时间 | 开放时长 | 优先级 | 备注 |
|---|---|---|---|---|---|
| [#18357](https://github.com/NousResearch/hermes-agent/issues/18357) | Setup SABOTAGES computer integrity - npm global installs hijacked | 2026-05-01 | **109 天** | P2 | 用户措辞激烈，影响面广（所有 npm 全局安装），需尽快回应 |
| [#23717](https://github.com/NousResearch/hermes-agent/issues/23717) | RFC: Pluggable SessionDB Provider | 2026-05-11 | **99 天** | P2 | 社区高呼声架构需求，7 👍，需明确决策 |
| [#32528](https://github.com/NousResearch/hermes-agent/issues/32528) | QQ Bot C2C button approvals always rejected | 2026-05-26 | **84 天** | P2 | 影响 QQ 平台用户的核心交互 |
| [#4667](https://github.com/NousResearch/hermes-agent/issues/4667) | Auto-discover project-local skills | 2026-04-02 | **138 天** | P3 | 今日已关闭 ✅ |
| [#9087](https://github.com/NousResearch/hermes-agent/pull/9087) | feat(nix): home-manager module | 2026-04-13 | **127 天** | P3 | 长期未合并，Nix 用户持续等待 |

### 建议

1. **#18357** 已开放超过 100 天且用户情绪激烈，建议维护团队至少给出官方回应（修复计划或设计取舍说明），避免社区信任流失。
2. **#23717** 需要明确决策：是采纳、拒绝还是给出替代方案。长期 `needs-decision` 状态会消耗社区贡献热情。
3. **#32528**（QQ Bot）涉及特定平台适配，若维护团队无精力维护，建议明确标注"欢迎社区贡献"。


## 项目健康度总评

| 维度 | 评分 | 说明 |
|---|---|---|
| 社区活跃度 | ⭐⭐⭐⭐⭐ | 24h 内 500+ Issue/PR 更新，贡献者众多 |
| 版本迭代速度 | ⭐⭐⭐⭐ | 补丁版本发布及时，但安装链路回归较多 |
| Bug 响应速度 | ⭐⭐⭐ | P1 级 Bug 多数在数日内关闭，但安装/更新链路积压严重 |
| 架构演进 | ⭐⭐⭐ | 有 RFC 讨论（SessionDB、deadline 层），但决策周期长 |
| 用户满意度 | ⭐⭐ | 安装体验、桌面端资源占用、profile 隔离问题引发较多不满 |

**核心风险：** 安装/更新链路的多个 P1 级 Bug 在 v0.20.3 发布后仍未修复，可能影响新用户 onboarding 和现有用户升级意愿。建议下一补丁版本聚焦此区域。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报

**日期：2026-08-18** | **数据周期：2026-08-17 00:00 - 2026-08-18 00:00 (UTC)**


## 1. 今日速览

过去24小时项目活跃度**中等偏高**，共产生 9 条 Issue 更新和 7 条 PR 更新。社区反馈集中在 **WebUI 布局与交互体验**（4条相关Issue），表明用户对界面可定制性的需求正在上升。值得关注的是，两条**安全修复 PR**（#9082、#9328）在搁置数周后于今日获得更新，可能意味着维护者正在重新审视安全补丁的合并。此外，一条**大型功能 PR**（#9673，工具调用结果注入）已进入第4天等待审查，是当前最值得关注的待合并改动。整体来看，项目处于**功能迭代与社区反馈收集并行的健康状态**。


## 2. 版本发布

过去24小时内无新版本发布。最近一次发布信息请参阅项目 Releases 页面。


## 3. 项目进展

今日无 PR 被合并，但以下 PR 有实质性更新，值得关注：

| PR | 标题 | 状态 | 说明 |
|---|---|---|---|
| [#9673](https://github.com/AstrBotDevs/AstrBot/pull/9673) | fix: consume injected tool call results in tool loop runner | OPEN (size:L) | 由 @Rail1bc 提交，允许插件注入伪造的 `assistant(tool_calls) → tool(result)` 消息对，强制 LLM 跳过工具调用决策，从而**节省 token、降低延迟、增加确定性**。已在 LivingMemory 插件中长期验证。该 PR 已开放4天，是当前最大的待合并功能改动。 |
| [#9082](https://github.com/AstrBotDevs/AstrBot/pull/9082) | fix: disable workspace skills in group sessions | OPEN (size:XS) | 安全修复：防止非管理员用户在共享群工作区植入 `SKILL.md` 并在后续管理员请求中被注入执行（权限边界漏洞）。今日有更新，可能正在推进审查。 |
| [#9328](https://github.com/AstrBotDevs/AstrBot/pull/9328) | fix: constrain custom workspace paths | OPEN (size:XS) | 安全修复：限制自定义工作区路径不能超出 AstrBot 工作区根目录，防止低权限用户通过绝对路径扩大文件读写范围。同样于今日更新。 |
| [#9714](https://github.com/AstrBotDevs/AstrBot/pull/9714) | feat(webui): add compact view for installed plugins | OPEN (size:L) | 新增插件列表紧凑视图模式，直接回应 Issue #9708 的诉求。 |

**项目进展评估**：两条安全 PR 的更新表明维护者正在处理权限边界相关的安全问题，这是积极信号。但 #9673 作为大型功能 PR 已等待4天，建议社区关注其审查进度。


## 4. 社区热点

### 最热 Issue：#9709 — WebUI 布局拖拽调整（8条评论）

[Issue #9709](https://github.com/AstrBotDevs/AstrBot/issues/9709) 由 @mjy1113451 提出，建议设置页面的布局调整支持**拖拽切换**而非当前的箭头点击。该 Issue 获得 8 条评论，是今日讨论最活跃的话题。

**诉求分析**：用户对 WebUI 的交互效率有明确期待。箭头切换在布局项较多时操作繁琐，拖拽是更直觉化的交互方式。结合 #9708（插件列表自定义列数）和 #9715（插件拖拽排序），可以看出**用户对 WebUI 可定制性的需求正在集中爆发**，且都指向"让界面适配个人使用习惯"这一核心诉求。

### 值得关注：#9716 — VOKO 项目推广

[Issue #9716](https://github.com/AstrBotDevs/AstrBot/issues/9716) 是 VOKO 项目作者的推广帖，介绍其跨 Agent 通信层方案，目前已支持对接 AstrBot 生态。虽然属于推广性质，但反映了**外部项目对 AstrBot 生态的认可**，也暗示了 A2A（Agent-to-Agent）通信可能是未来的方向之一。


## 5. Bug 与稳定性

今日报告了 2 个 Bug，按严重程度排列：

| 严重程度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 🟡 中等 | [#9711](https://github.com/AstrBotDevs/AstrBot/issues/9711) | **已删除的模型在配置文件中依旧显示**。用户反馈删除模型供应商后，配置文件中仍残留已删除的模型条目。 | 已关闭（可能已解决或转为讨论） |
| 🟢 轻微 | [#9717](https://github.com/AstrBotDevs/AstrBot/issues/9717) | **Bot 重复发送消息**。用户反馈 bot 发了2次消息，附带了完整的 ChatCompletion 调用链日志。 | 待处理，无 fix PR |

**分析**：#9711 已关闭，但关闭原因未明确标注（是修复了还是转讨论？），建议维护者确认。 #9717 的日志信息完整，包含 `tool_calls` 相关数据，可能与 #9673 中提到的工具调用循环问题相关，建议关联分析。


## 6. 功能请求与路线图信号

今日收到 5 条功能请求，按与现有 PR 的关联度排序：

| 功能请求 | Issue | 关联 PR | 纳入可能性 |
|---|---|---|---|
| **插件列表自定义列数**（一排显示2/3/4个） | [#9708](https://github.com/AstrBotDevs/AstrBot/issues/9708) | [#9714](https://github.com/AstrBotDevs/AstrBot/pull/9714) 已提交实现 | ⭐⭐⭐⭐⭐ 已有实现 PR |
| **设置布局拖拽切换** | [#9709](https://github.com/AstrBotDevs/AstrBot/issues/9709) | 无 | ⭐⭐⭐ 社区呼声高，但暂无实现 |
| **插件拖拽排序**（常用插件置顶） | [#9715](https://github.com/AstrBotDevs/AstrBot/issues/9715) | 无 | ⭐⭐⭐ 与 #9709 同属布局优化方向 |
| **日志搜索功能** | [#9718](https://github.com/AstrBotDevs/AstrBot/issues/9718) | 无 | ⭐⭐ 实用性高，但优先级可能靠后 |
| **LLM 元数据获取代理接口** | [#9719](https://github.com/AstrBotDevs/AstrBot/issues/9719) | 无 | ⭐⭐ 解决中国大陆访问 models.dev 受限问题，对国内用户友好 |

**路线图信号**：WebUI 布局优化是当前最明确的需求方向，且 #9714 已提供实现，预计将进入下一版本。建议维护者将 #9709 和 #9715 合并考虑，统一规划 WebUI 布局交互的改进。


## 7. 用户反馈摘要

从今日 Issues 评论中提炼的用户声音：

- **界面交互效率**（#9709）："现在只能点箭头切换，时间有些长" — 用户对重复性操作有明确的效率诉求。
- **信息密度**（#9708）："现在一排显示2个太少了" — 用户希望单屏展示更多插件信息。
- **可读性**（#9672，已关闭）："英文看不懂" — 内置指令输出的中英文转换需求，该 Issue 已关闭但未说明解决方案。
- **配置管理**（#9711）：已删除的模型仍显示在配置文件中，用户对配置同步的准确性有期待。
- **网络可达性**（#9719）："models.dev 在中国大陆部分地区连接受限" — 国内用户的网络环境限制是实际痛点。

**整体满意度**：用户对 AstrBot 的功能深度持认可态度（如 #9717 中"终于修好了"的表述），但对 WebUI 的交互细节和可定制性有持续改进的期待。


## 8. 待处理积压

以下 Issue/PR 长期未获响应或推进，建议维护者关注：

| 类型 | 编号 | 标题 | 等待时长 | 备注 |
|---|---|---|---|---|
| PR | [#9071](https://github.com/AstrBotDevs/AstrBot/pull/9071) | fix: skip stable update prompt for newer prereleases | **51天** | 修复预发布版本更新提示逻辑，size:XS，改动小但长期未合并 |
| PR | [#9082](https://github.com/AstrBotDevs/AstrBot/pull/9082) | fix: disable workspace skills in group sessions | **49天** | 安全漏洞修复，今日有更新，建议加速审查 |
| PR | [#9328](https://github.com/AstrBotDevs/AstrBot/pull/9328) | fix: constrain custom workspace paths | **29天** | 安全漏洞修复，今日有更新，建议加速审查 |
| PR | [#9673](https://github.com/AstrBotDevs/AstrBot/pull/9673) | fix: consume injected tool call results in tool loop runner | **4天** | 大型功能 PR，涉及 token 优化，建议尽快安排审查 |

**特别提醒**：两条安全 PR（#9082、#9328）涉及权限边界漏洞，长期未合并存在安全风险。虽然今日有更新迹象，但仍建议维护者优先处理。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*