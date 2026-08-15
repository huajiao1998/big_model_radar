# OpenClaw 生态日报 2026-08-16

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-15 23:34 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-16

## 1. 今日速览

OpenClaw 项目过去 24 小时保持高活跃度，**Issues 更新 500 条（新开/活跃 485、关闭 15）、PR 更新 500 条（待合并 448、合并/关闭 52）**，并发布新 beta 版本 v2026.8.1-beta.2。Issue 侧呈现**“新开量大、关闭量极小”**的不对称态势（485 vs 15），说明大量问题正在被报告但尚未收敛。话题集中在 **会话状态/消息丢失（session-state/message-loss）**、**认证提供方（auth-provider）** 与 **记忆核心（memory-core）**，其中 Memory Core 的 SQLite 无界增长、会话上下文膨胀、以及多通道重复消息问题构成了当前稳定性的主要风险。PR 侧约有 52 条已合并/关闭，说明修复通道畅通，但 448 条待合并的积压提示维护者评审带宽可能成为瓶颈。两个正在进行的安全审查 PR（#116489、#120900）被关闭，可能已合入或暂缓。总体而言，项目迭代速度快，社区参与度高，但 **Bug 关闭率偏低**与**长期未解决问题较多**值得关注。


## 2. 版本发布

### v2026.8.1-beta.2
- **发布时间**：2026-08-15/16（根据数据窗口推断）
- **链接**：https://github.com/openclaw/openclaw/releases

**Highlights（来自 Release Notes）：**

1. **Secret egress host binding（安全加固）**：将每个共享存储（shared-store）的 secret 绑定到精确的 HTTPS 目标主机，覆盖 CLI、Gateway RPC 和 Control UI 三条路径。未绑定的 sentinel 替换将在明文出口前 fail closed。作者：@shakkernerd。
2. **GPT-5.6 Ultra 与运行时切换**：Release Notes 提到 GPT-5.6 Ultra 支持与运行时切换能力（具体细节在截断部分，建议查看完整 Release Notes）。

**潜在影响与注意事项：**
- Secret egress host binding 属于**安全边界变更**。如果用户通过 CLI/Gateway RPC/Control UI 使用共享存储 secret，且目标主机未显式绑定，替换将失败关闭。**升级后需要检查 secret 配置中是否已包含目标 host 绑定**，否则可能导致 secret 注入失败。
- 这是 beta 版本，建议生产环境谨慎升级。

**其他提示：** 数据概览中显示“最新 Releases 仅 1 个”，说明 24 小时内仅此一个新版本。


## 3. 项目进展

过去 24 小时有 52 条 PR 合并/关闭，以下为数据中可见的已关闭/合并 PR（“CLOSED”状态）及其意义：

### 已关闭 PR

1. **[#116489] feat(security): require acknowledgement for install policy warnings**（由 @jesse-merhi 提交）
   - 标签：安全、CLI、Gateway、macOS app、agents、commands、docs、size: XL
   - 摘要：允许 `security.installPolicy` 外部命令返回 `warn` 状态，让授权操作者在安装可疑插件或技能前审阅风险并确认目标名称。
   - 关闭状态：CLOSED
   - **意义**：安装策略警告确认机制已合入或处理，增强了供应链安全防线。
   - 链接：https://github.com/openclaw/openclaw/pull/116489

2. **[#120900] feat(ui): review install policy warnings**（由 @jesse-merhi 提交）
   - 标签：安全、Control UI、Gateway、docs、size: XL、proof: video
   - 摘要：在 Control UI 中允许管理员审阅安装策略警告并决定是否继续安装插件；`plugins.install` 接受 `acknowledgeInstallPolicyWarning: true`。
   - 关闭状态：CLOSED
   - **意义**：与 #116489 配套，完成了“CLI + UI”双端的安全安装确认闭环——管理员可以在图形界面中处理可疑安装。这两个 PR 同时关闭可能代表安全确认功能已完整落地。
   - 链接：https://github.com/openclaw/openclaw/pull/120900

3. **[#124209] fix: keep Codex plugin aligned during stable upgrades**（由 @jalehman 提交）
   - 标签：commands、maintainer、size: XS、P1、diamond lobster
   - 摘要：修复稳定版升级时 Codex 插件版本未对齐的问题。
   - 关闭状态：CLOSED
   - **意义**：修复了插件/核心版本漂移问题（与 Issue #83337 相关），避免升级后因插件版本不匹配导致静默故障。
   - 链接：https://github.com/openclaw/openclaw/pull/124209

### 整体进展评估

从合并/关闭的 PR 看，项目近期重点在：
- **供应链安全**：安装策略警告（#116489、#120900）
- **插件/核心版本对齐**（#124209）
- **Telegram 富文本消息修复**（#124222）
- **Web UI 多账户会话标签修复**（#124228）
- **Windows cron 持久化围栏修复**（#124293）

项目整体在安全性、跨平台稳定性和通道可靠性方面持续向前推进，但多数高质量 PR（如 #121287、#120887、#121004、#121116 等 platinum/diamond 级）仍停留在 `ready for maintainer look`，尚未合并。


## 4. 社区热点

### 最热议题 TOP 3

1. **[#121953] Cron agent turns stall on DeepSeek — '[cron:...]' 前缀被降级处理**
   - 作者：@Dytchem | 评论：20 | 创建：2026-08-11 | 更新：2026-08-15
   - 标签：P1、platinum hermit、needs-live-repro、linked-pr-open、needs-product-decision
   - **内容摘要**：在 DeepSeek（deepseek-v4-flash）API 上，OpenClaw 每次 cron agent turn 的用户消息都会加上 `[cron:<jobId> <name>] ` 前缀，而 DeepSeek 的 API 边缘节点会将首条消息以该前缀开头的请求路由到更低优先级队列，导致 cron agent turn 停滞数十秒至数分钟。
   - **背后诉求**：用户希望 cron 任务的可靠性不受底层模型 API 的边缘策略影响；此外 `needs-product-decision` 标签说明可能需要产品层面决定是否将 cron 前缀改为系统提示而不是用户消息前缀。
   - 链接：https://github.com/openclaw/openclaw/issues/121953

2. **[#91009] Codex PreToolUse native hook relay 生成 CPU-bound 进程并阻塞 Gateway RPC**
   - 作者：@aspalagin | 评论：20 | 创建：2026-06-06 | 更新：2026-08-15
   - 标签：P1、platinum hermit、message-loss、crash-loop、recovery-stuck
   - **内容摘要**：在 2026.6.1 版本中，Codex 集成在每次 tool call 时会生成多个短暂的 `openclaw-hooks`/`openclaw hooks relay --provider codex --event pre_tool_use` 进程，每个进程占用 100%+ CPU 并导致 Gateway RPC 停滞。
   - **背后诉求**：核心问题是**原生 hook 中继机制的性能与稳定性**——这类时间跨度已达 2 个月有余的 P1 问题迄今仍未解决，社区的焦虑/反馈热度可见一斑。
   - 链接：https://github.com/openclaw/openclaw/issues/91009

3. **[#79902] 添加 companion-friendly SQLite transcript/session seams**
   - 作者：@100yenadmin | 评论：13 | 创建：2026-05-09 | 更新：2026-08-15
   - 标签：P3、off-meta tidepool、needs-maintainer-review、needs-product-decision
   - **内容摘要**：在 database-first runtime 之上提供 SQLite 会话/转录接口，让高级用户可以基于规范的运行时状态构建应用，而不必解析不透明的 blob 或重复实现内部分支/会话逻辑。
   - **背后诉求**：开发者希望 OpenClaw 的运行时状态可被外部程序消费，开放接口的需求正在增长。`needs-product-decision` 意味着产品团队尚未表态。
   - 链接：https://github.com/openclaw/openclaw/issues/79902

### 高赞议题

- **[#80498] Subagent completion announcements can be premature or duplicated** — 👍 3（P1, diamond lobster, session-state/message-loss）
- **[#90361] Intermittent memory_search "index metadata is missing"** — 👍 3（P1, diamond lobster，本地 hotfix，但未官方修复）
- **[#53654] Discord messageUpdate/messageDelete 事件支持** — 👍 3（功能请求，社区呼声较高）


## 5. Bug 与稳定性

### P0（1 条）

1. **[#119270] 文件工具会去掉目标路径开头的 @，静默写到/删除错误文件**
   - 创建：2026-08-04 | 更新：2026-08-15 | 评论：6
   - 标签：P0、data-loss、source-repro、bulk-filed
   - 状态：**无 fix PR**
   - 链接：https://github.com/openclaw/openclaw/issues/119270
   - 风险：可以静默覆盖用户文件，数据丢失风险极高。

### P1 高影响（选择重点条目）

| Issue | 问题 | 影响 | Fix PR |
|-------|------|------|--------|
| #121953 | DeepSeek 上 cron agent turn 停滞 | 任务延迟 | 有 linked PR |
| #91009 | Codex hook relay 生成 CPU-bound 进程 | Gateway RPC 阻塞 | ❌ |
| #69208 | 跨渠道 transcript/replay/context 重复（umbrella） | 会话状态/消息丢失 | ❌ |
| #41744 | Feishu 读取图片工具结果丢失媒体附件 | 消息丢失 | 有 linked PR |
| #90098 | 大附件导致浏览器/Gateway 栈溢出 | 崩溃 | 有 linked PR |
| #85844 | 自动更新后 Gateway 使用过期 hash bundle | 模块加载错误 | ❌ |
| #86214 | Codex app-server 在 image/tool 请求中途关闭 | 消息丢失 | ❌ |
| #90944 | sessions_yield 回复被记录但未投递 | 消息丢失 | 有 linked PR |
| #78493 | sudo update 导致混合文件所有权，doctor 覆盖配置 | 数据丢失 | ❌ |
| #94939 | 6.x 迁移导致 channel conversation-store SQLite 为 0 字节 | 数据丢失（MS Teams） | 有 linked PR |
| #123799 | 生产环境 Codex compact 404 需要升级/回滚指南 | 生产阻塞 | ❌ |
| #123073 | dev 通道更新失败：npm vs pnpm（workspace: 协议） | 更新失败 | ❌ |
| #119087 | Gateway 冷启动 1-vCPU 容器回归 2.5x | 性能回归 | 有 linked PR |
| #43374 | 多智能体并发导致所有 LLM API 调用同时超时 | 全局限时 | ❌ |
| #92633 | memory_search corpus=all 超时 | 功能不可用 | ❌ |
| #118793 | Claude CLI session limit 报错不触发 fallback | 功能不可用 | 有 linked PR |
| #84662 | Codex 将运行时上下文写入原生历史导致输入无界增长 | 资源膨胀 | 有 linked PR |
| #120735 | Telegram 贴纸到达时无描述、未暂存到磁盘 | 功能不可用 | 有 linked PR |
| #90378 | 5.28→6.1 cron store 静默迁移导致 delivery 错误 | 配置静默变化 | 有 linked PR |
| #119401 | DM 的 NO_REPLY 抑制无视 silentReply 策略 | 行为回归 | ❌ |

### 值得注意的回归

- **#119087**: Gateway 冷启动时间从 2026.7.1-beta.1 到 2026.7.2-beta.7 在 1-vCPU 容器上中位数回归约 2.5 倍。
- **#77930**: Discord 通道在 2026.5.4 以及 beta.2/beta.3 中未加载，beta.1 和 2026.4.29 正常——回归矩阵表明曾在 beta 过程中引入又修复过，但最终版本仍存在（但 `not-repro-on-main` 可能表示已在 main 修复）。

### 稳定性亮点

- **#121287**（memory-core 候选晋升拒绝误报）已有 PR 且为 platinum hermit 评分、`ready for maintainer look`，说明修复质量较高。
- **#120979**（Gateway 取消断连 hook admission）也是 platinum、proof: sufficient、`ready for maintainer look`。

### Windows 专项

- **#119796**: vitest teardown 在 Windows 上因 SQLite handle 未释放导致 EBUSY。
- **#124293**（PR）: 修复 Windows 上 cron 任务因进程身份读取失败而永不运行的问题（修复 #124125）。


## 6. 功能请求与路线图信号

### 高活跃功能请求

1. **[#6599] 添加 /models test-fallback 命令**（P3、12 评论）
   - 用户希望能够在真实故障前主动验证 fallback 链路是否可用。
   - 链接：https://github.com/openclaw/openclaw/issues/6599

2. **[#10687] 完全动态的模型发现（OpenRouter 等）**（P2、10 评论、👍3）
   - 诉求：当前模型目录是静态生成的，无法应对 OpenRouter 等快速变化的模型列表。
   - 链接：https://github.com/openclaw/openclaw/issues/10687

3. **[#79902] SQLite transcript/session 接口**（P3、13 评论）
   - 开发者生态诉求强烈，希望运行时状态可编程消费。
   - 链接：https://github.com/openclaw/openclaw/issues/79902

4. **[#44309] A2A 单向调度模式**（P2、9 评论）
   - 在 agent-to-agent 消息传递中增加“只投递不回弹”的模式，避免乒乓式往返。
   - 链接：https://github.com/openclaw/openclaw/issues/44309

5. **[#45771] 内置 pace-aware 速率限制**（P3、7 评论、👍2）
   - 自主 agent 循环容易耗尽 Anthropic 等 API 配额，需要内置速率感知。
   - 链接：https://github.com/openclaw/openclaw/issues/45771

### 低优先级但社区有持续呼声

- **#45758** YAML 配置文件支持（P3、9 评论）
- **#66252** 每 Agent TTS/STT 覆盖（P3、8 评论）
- **#13219** 按模型 usage 日志实现成本追踪（P2、8 评论）
- **#53654** Discord 编辑/删除事件支持（P2、👍3、6 评论）
- **#73537** 为发布添加生产就绪稳定性标签（P2、8 评论、👍2）

### 路线图判断

- **安全优先**：安装策略确认（#116489/#120900）已关闭，说明安全加固正在推进；Secret egress host binding 已随 v2026.8.1-beta.2 发布。
- **可靠性优先**：大量 session-state/message-loss 标签的 P1 问题仍在积压，产品团队可能需要优先分配资源。
- **模型层灵活性**：动态模型发现（#10687）和 fallback 验证（#6599）说明用户对多模型/多提供商场景的诉求在增强，预计下一版本可能会纳入。
- **开发者生态**：SQLite transcript/session seams（#79902）如果获得 product-decision 绿灯，将显著提升平台的可扩展性。


## 7. 用户反馈摘要

### 真实用户痛点

1. **生产环境升级困难**
   - #123799：生产部署在 2026.5.12 遇到 Codex compact 404 后，需要官方提供安全升级/回滚指南——“我们是一个受影响的生产部署，需要操作指引”。
   - #90378：5.28→6.1 升级中 cron store 静默从 JSON 迁移到 SQLite，且新任务默认 `delivery.mode=announce` 导致通道报错——升级路径不透明。

2. **升级导致静默故障**
   - #83337：核心升级后插件版本不同步，Discord 通道静默进入禁用/损坏状态，没有明确的不兼容警告。
   - #77930：Discord 通道某个版本无法加载，另一个版本正常——通道稳定性存在“开/关”式波动。

3. **资源消耗与成本控制**
   - #67419：bootstrap 文件每轮重新注入，浪费 20-30% token。
   - #114612：Memory Core 的 SQLite 表无保留策略，最终会填满磁盘。
   - #13219：缺少按模型的 usage 日志，无法做成本追踪。

4. **Windows 支持仍是短板**
   - #119796：Windows vitest teardown EBUSY（测试层面，影响小）。
   - #124293（PR）：Windows 上 cron 永不运行（修复 #124125）——调度任务在 Windows 上的可靠性是真实痛点。

5. **社区对 P0/P1 长期未修复的容忍度在下降**
   - #119270（P0 文件工具 @ 前缀 bug）创建于 08-04，至今 12 天未闭合。
   - #91009（P1 Codex hook CPU 问题）已存在 2 个多月。

### 积极反馈

- #73537 用户明确表达了对 OpenClaw 的感谢：“我们作为家庭和商业助手运行（Telegram 集成、自动化、cron 任务、Home Assistant 控制），它已经成为我们日常工作流的一部分。” 同时提出了希望增加生产就绪标签的诉求。
- #79902 社区的诉求说明开发者希望基于 OpenClaw 做二次开发，体现平台生态开始成型。


## 8. 待处理积压

### 长期未响应的关键 Issue

1. **[#91009] Codex PreToolUse hook relay CPU-bound 进程阻塞 Gateway RPC**
   - 创建：2026-06-06 | P1 | 至今 2 个多月 | 20 评论 | 无 fix PR
   - 链接：https://github.com/openclaw/openclaw/issues/91009
   - 维护者提醒：这是 P1 且影响 Gateway 核心稳定性，建议优先处理。

2. **[#69208] 跨渠道重复 transcript/replay/context assembly（umbrella）**
   - 创建：2026-04-20 | P1 | 至今近 4 个月 | 13 评论 | 无 fix PR
   - 链接：https://github.com/openclaw/openclaw/issues/69208
   - 维护者提醒：umbrella issue 涉及面广，建议拆分并逐个击破。

3. **[#51429] 工作路径 hardcode 进代码并被合并发布**
   - 创建：2026-03-21 | P2 | 至今近 5 个月 | 13 评论 | 无 fix PR
   - 链接：https://github.com/openclaw/openclaw/issues/51429
   - 用户情绪可见（中文用户），影响信任度。

4. **[#67419] Session 上下文膨胀：bootstrap 文件每轮重注入浪费 20-30% tokens**
   - 创建：2026-04-15 | P2 | 至今 4 个月 | 12 评论 | 无 fix PR
   - 链接：https://github.com/openclaw/openclaw/issues/67419
   - 与成本直接相关，用户诉求强烈。

5. **[#43374] 多智能体并发导致所有 LLM API 调用同时超时**
   - 创建：2026-03-11 | P1 | 至今 5 个月 | 7 评论 | 无 fix PR
   - 链接：https://github.com/openclaw/openclaw/issues/43374

### 长期未合并的高质量 PR

1. **[#115670] feat(claws): adopt an existing workspace directory in claws add**
   - 创建：2026-07-29 | platinum hermit | `ready for maintainer look`
   - 链接：https://github.com/openclaw/openclaw/pull/115670

2. **[#121287] fix(memory): stop ranking candidates promotion rejects**
   - 创建：2026-08-10 | platinum hermit | `ready for maintainer look`
   - 链接：https://github.com/openclaw/openclaw/pull/121287

3. **[#120887] fix(agents): preserve content when joining file read pages**
   - 创建：2026-08-09 | platinum hermit | `ready for maintainer look`
   - 链接：https://github.com/openclaw/openclaw/pull/120887

4. **[#121004] fix(slack): avoid duplicate commentary delivery**
   - 创建：2026-08-09 | platinum hermit | `ready for maintainer look`
   - 链接：https://github.com/openclaw/openclaw/pull/121004

5. **[#121116] fix(msteams): stop retrying non-idempotent activity creates on ambiguous 408/5xx**
   - 创建：2026-08-09 | diamond lobster | `ready for maintainer look`
   - 链接：https://github.com/openclaw/openclaw/pull/121116

### 建议

- **P0 #119270 应立即修复**：文件工具 @ 前缀静默误写属于数据丢失级缺陷。
- **考虑批量评审 `ready for maintainer look` 的高评分 PR**：目前 448 条待合并 PR 中有多条 platinum/diamond 级修复等待人工评审，积压可能进一步拉长修复周期。
- **对 500 条/日的 Issue 流速**，建议增加 triage 自动化或维护者人力，避免高质量反馈被淹没。

---
*本日报由 AI 分析师生成，数据来源：github.com/openclaw/openclaw（2026-08-15 至 2026-08-16 数据窗口）。*

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告（2026-08-16）

## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态正处于**高活跃、高速迭代但质量收敛滞后**的密集演进期：头部项目单日 Issues+PR 流量可达 500+500 条，但普遍存在 PR 评审积压（OpenClaw 448 条、hermes-agent 444 条待合并），维护者带宽已成为共同瓶颈。安全加固与数据隔离（宿主绑定、安装策略确认、per-agent 权限校验）成为各项目同步推进的主线，说明生态正从"功能扩张"转向"可信基建"。与此同时，会话状态可靠性与存储无界增长（消息丢失、SQLite 膨胀、上下文 token 浪费）是跨项目浮现的共性技术债，尚未出现系统性解法。生态已明显分化为**全功能框架型**（OpenClaw、hermes-agent）、**协议/架构导向型**（Zeroclaw）、**生态绑定型**（QwenPaw、AstrBot）与**轻量嵌入式**（PicoClaw）等差异化路线。

## 2. 各项目活跃度对比

| 项目 | Issues（新开/关闭） | PR（合并/待合并） | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500（485/15） | 500（52/448） | ✅ v2026.8.1-beta.2 | ⚠️ 高活跃但关闭率仅 3%，PR 积压严重，P0 数据丢失 bug 12 天未闭合 |
| **hermes-agent** | 500（283/217） | 500（56/444） | ❌ | ✅ 高活跃且关闭率 43%，大量 P1 修复落地；但 444 条 PR 积压是交付隐患 |
| **Zeroclaw** | 50（46/4） | 50（6/44） | ❌ | 🔶 中等活跃，Anthropic 拒答闭环合并完成；44 条 risk:high PR 待合并 |
| **QwenPaw** | 10（9/1） | 11（0/11） | ❌ | 🔶 中高活跃，bug 响应快但今日 0 合并；外部贡献者增多，评审积压初现 |
| **AstrBot** | 21（8/13） | 17（6/11） | ❌ | ✅ 最健康：关闭率 62%，关键 Bug 当日修复并合入 |
| **PicoClaw** | 0（0/0） | 2（0/2，stale） | ❌ | 🔻 低频维护，无新 Issue/PR，2 个修复（含 WhatsApp 通道不可用）陷入 stale |

## 3. OpenClaw 在生态中的定位

OpenClaw 是当前生态中**社区规模最大、迭代速度最快、覆盖维度最全**的核心参照项目：

- **优势**：单日 500+500 的活动量约为 Zeroclaw 的 10 倍、AstrBot 的 25 倍；安全能力已有具体版本交付（v2026.8.1-beta.2 的 secret egress host binding）；"CLI+UI 双端安装策略警告"（#116489/#120900）标志着供应链安全闭环在主流框架中率先落地；版本发布节奏快（beta 周更）。
- **技术路线差异**：采用共享存储 + 多通道（Telegram/Discord/Feishu/Teams 等）+ Memory Core + 插件体系的**全功能单体框架**路线，与 hermes-agent（桌面端 + 多租户）、Zeroclaw（Rust 实现 + 协议兼容层）、AstrBot（中文社区 + 群聊插件生态）形成明显区隔。
- **主要短板**：Issue 关闭率仅 3%（485 vs 15），大量 P1（如 #91009 已 2 个月+）滞压；448 条待合并 PR 意味着即便是 platinum/diamond 级高质量修复也无法及时触达用户；P0 文件工具 @ 前缀静默误写（#119270）暴露了高速迭代下的稳定性治理缺口。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **PR 评审带宽与积压** | 全部 6 个项目 | 448/444/44/11 条待合并 PR；Zeroclaw 维护者决策队列 tracker（#8692）成为固定热点 |
| **安全加固与隔离** | OpenClaw、Zeroclaw、hermes-agent、AstrBot | secret 宿主绑定、安装策略警告确认、per-agent 数据隔离（#9745/#9746）、allowed_tools 三态 fail-open 修复、密码静默轮换修复、提示词注入中和 |
| **会话状态与消息丢失** | OpenClaw（session-state/message-loss 标签）、QwenPaw（ACP 通知竞态 #6623）、hermes-agent（上下文压缩丢链 #79278） | 跨通道消息重复/丢弃、工具链中断、静默失败 |
| **存储无界增长与成本** | OpenClaw（Memory Core SQLite）、hermes-agent（state.db 659MB）、OpenClaw（bootstrap 浪费 20-30% token） | 需要保留策略、生命周期管理、上下文压缩优化 |
| **协议兼容与生态接入** | Zeroclaw（OpenAI Chat Completions #8603）、QwenPaw（统一 provider 发现 #6302） | 让 Open WebUI/LobeChat/LangChain 等主流生态工具可直接接入 |
| **多租户与权限模型** | hermes-agent（#34352 生产级补丁等待官方采纳）、Zeroclaw（per-agent 隔离）、QwenPaw（插件 system_prompt 权限 #7052、Matrix 会话隔离 #7001） | 记忆/工具/会话的租户级隔离，不能靠 fork 实现 |
| **升级与更新信任** | hermes-agent（更新后 FDA 撤销、网关静默死亡、ZIP 回退删应用）、AstrBot（备份跨版本不兼容 #8615）、OpenClaw（插件版本漂移 #124209） | 更新路径可预测、可回滚、不破坏配置 |
| **跨平台稳定性** | OpenClaw（Windows cron #124293）、hermes-agent（Windows 网关 #83683/#84185、macOS 卡死 #63047）、Zeroclaw（macOS 空白窗口 #7527） | 桌面端与 Windows/macOS 的可靠性是用户信任基石 |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 |
|---|---|---|---|
| **OpenClaw** | 全功能个人 AI 助手：多通道、插件体系、Memory Core、cron、安全治理 | 个人/家庭/企业通用，追求功能完整性与生态广度 | 多语言单体框架 + 共享存储 + 插件市场；迭代速度优先 |
| **hermes-agent** | 桌面端优先（macOS/Windows/TUI）+ 多租户扩展 | 桌面重度用户、企业多租户部署 | 桌面应用 + 网关架构；当前正执行"反上帝文件"大规模重构（20/20 完成） |
| **Zeroclaw** | 架构清晰的 Rust 实现 + 协议兼容层（OpenAI/Gemini Live） | 开发者/技术用户，关注架构透明度与协议标准化 | Rust + RFC 驱动设计；Anthropic 拒答闭环、per-agent 隔离先行 |
| **QwenPaw** | Qwen 模型生态绑定 + 多模态输入链路 | Qwen/阿里云生态用户、多模态场景 | 围绕 Qwen 模型能力做深度集成；外部贡献者驱动的功能补强期 |
| **AstrBot** | 中文社区群聊机器人 + 插件市场 + WebUI | 中文用户、群聊/社区运营者 | 插件化架构 + Cloud 插件市场；Bug 关闭率高，迭代稳健 |
| **PicoClaw** | 轻量/嵌入式场景（Sipeed 硬件背景） | 资源受限设备、极简部署 | 轻量化实现；当前处于低频维护期，2 个关键修复待合并 |

## 6. 社区热度与成熟度

按活跃度与阶段可分为四个梯队：

- **快速迭代期（高活跃，质量治理滞后）**：OpenClaw、hermes-agent。日均 500+500 流量，功能与修复双双高频，但 OpenClaw 的 Bug 关闭率（3%）显著低于 hermes-agent（43%），前者更需关注 triage 效率，后者则面临 PR 积压导致的交付延迟。
- **架构讨论与质量巩固期（中高活跃，方向明确）**：Zeroclaw、AstrBot。Zeroclaw 正处于密集 RFC 设计阶段（Chat Completions、runtime 会话、统一附件、Gemini Live v2），Anthropic 拒答闭环的完整落地证明其"先设计后实现"路径有效；AstrBot 关闭率 62%、当日修复当日合入，是六者中健康度最高的项目。
- **功能补强期（中活跃，依赖外部贡献）**：QwenPaw。bug 响应快（视频链路、cron 假成功均已有关联 PR），但今日 0 合并、多模块 PR 同时等待首轮审查，维护者带宽成为下一步的关键变量。
- **低频维护期（低活跃）**：PicoClaw。无新 Issue、无 Release、无合并，仅剩 2 条 stale PR 触及 WhatsApp 连接与缓存效率两个真实痛点，需要维护者明确介入或对外说明。

## 7. 值得关注的趋势信号

**1. PR 评审积压已成为生态级瓶颈，自动化 triage 是刚需。** 头部项目 400+ 条待合并 PR 意味着高质量修复的"最后一公里"正在系统性失速。Zeroclaw 的"维护者决策队列 tracker"（#8692）和 hermes-agent 的"AI 辅助 PR 预审"（#9330）是值得借鉴的解法方向。

**2. 多租户与 per-agent 隔离正从企业需求演变为社区共识。** hermes-agent 用户带着生产级补丁等待官方采纳（#34352）、Zeroclaw 的 per-agent 数据隔离 PR（#9745/#9746）、QwenPaw 的插件权限控制（#7052）——三方同步推进，说明"单机单用户"范式正在松动，隔离能力将决定框架能否向上进入企业市场。

**3. 协议兼容层成为生态卡位的新战场。** Zeroclaw 的 OpenAI Chat Completions RFC（#8603，20 评论为全项目最高）直指"用现有 OpenAI 生态工具直接连接"的刚需；QwenPaw 的统一 provider 发现（#6302）同样在解决模型层碎片化。未来框架的竞争力将部分取决于能否无缝接入主流 LLM 工具生态。

**4. 用户对"静默失败"零容忍，可观测性成为隐性需求。** QwenPaw 视频"returns success but model never receives"、OpenClaw 文件工具静默误写、AstrBot 密码静默轮换——三起事件的共同点是系统不报错地做错事。开发者应将 fail-closed 与显式告警作为默认设计原则，而非事后补丁。

**5. 存储与 token 的无界增长是跨项目的普遍技术债。** OpenClaw Memory Core SQLite 填满磁盘、hermes-agent state.db 两周 659MB、OpenClaw bootstrap 每轮浪费 20-30% token——这既是成本问题也是可用性问题。具备保留策略、压缩与生命周期管理的存储设计将成为下一阶段差异化竞争点。

**6. 更新/升级路径的可靠性正在成为信任分水岭。** hermes-agent 的"更新创伤"（权限撤销、网关静默死亡、应用被删不重建）与 AstrBot 的"备份≠白备"（跨版本恢复失败）表明：功能再强，一次破坏性的更新就足以流失用户。将升级视为"一等公民"功能（可回滚、可保留本地修改、配置向后兼容）应被各项目提升至路线图高位。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目日报 — 2026-08-16

## 1. 今日速览

过去 24 小时项目维持高活跃度：共 50 条 Issue 更新（46 条新开/活跃、4 条关闭）与 50 条 PR 更新（44 条待合并、6 条已合并/关闭），无新版本发布。社区讨论重心集中在 OpenAI Chat Completions 协议兼容（#8603，20 评论）、runtime 自有会话架构（#9487，17 评论）与统一附件架构（#9488，15 评论）三个 RFC 上。值得注意的进展是 Anthropic 拒绝/回退处理的功能栈 5 个 PR 全部关闭，提供商可靠性能力形成闭环；Gemini Live 实时语音通道 RFC 于今日发布 v2 重写（#8780）。整体看，项目处于"大量架构 RFC 密集讨论 + 大量 high-risk PR 待合并"的阶段，管线存在积压，但方向明确。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日最重要的合并是 **Anthropic 拒绝/回退处理功能栈**（5 个 PR 全部关闭/合并）：

- [#9262](https://github.com/zeroclaw-labs/zeroclaw/pull/9262) — 将 Anthropic 的 `stop_reason: "refusal"` 安全拒绝识别为类型化 `AnthropicRefusalError`，不再把空拒绝当成成功
- [#9263](https://github.com/zeroclaw-labs/zeroclaw/pull/9263) — 客户端可靠性层将拒绝路由至 client-side fallback 条目，`is_non_retryable` 正确分类
- [#9265](https://github.com/zeroclaw-labs/zeroclaw/pull/9265) — 新增 `server_fallback_models` 配置，支持 Anthropic 服务端回退的 opt-in
- [#9266](https://github.com/zeroclaw-labs/zeroclaw/pull/9266) — 读取原生响应信号，识别实际服务模型与 `AnthropicUsage.iterations`
- [#9268](https://github.com/zeroclaw-labs/zeroclaw/pull/9268) — 在频道编排器中向用户呈现 safeguard fallback 通知，打通端到端链路

该栈实现了从"拒绝检测 → 类型化错误 → 客户端/服务端回退 → 用户可见通知"的完整闭环，显著提升了 Anthropic 供应商的可靠性。另有 1 个合并/关闭的 PR 未在统计列表中展示。Issue 方面，[#4760](https://github.com/zeroclaw-labs/zeroclaw/issues/4760)（记忆整合使用 schema 校验工具调用）以 duplicate 关闭，说明已有覆盖方案；[#7527](https://github.com/zeroclaw-labs/zeroclaw/issues/7527)（macOS 空白窗口）关闭。

## 4. 社区热点

- [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) **RFC: Chat Completions profile**（20 评论）— 当前讨论度最高。用户要求 ZeroClaw 暴露 OpenAI Chat Completions 协议，以便 Open WebUI、LobeChat、Continue.dev、Aider、LangChain、OpenAI SDK 等生态直接接入。背后诉求是降低接入门槛、拥抱主流 LLM 工具生态。
- [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) **RFC: Runtime-owned conversation sessions**（17 评论）— 重构会话所有权边界，所有入口统一提交 `InboundAction`，引入持久化准入语义，是架构层的核心争议点。
- [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) **RFC: Unified attachment architecture**（15 评论）— 统一 web chat 与各 channel 的附件处理模型。
- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) **Tracker: 维护者决策队列**（13 评论）— 作为 RFC/设计问题的决策协调器持续活跃，反映维护者评审带宽是当前瓶颈。
- [#6954](https://github.com/zeroclaw-labs/zeroclaw/issues/6954) 与 [#6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971)（各 12 评论）— 内部发起 turn 的来源/绑定/回复契约，以及安全态势与统一入口策略。
- [#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) **Gemini Live 实时语音通道 RFC v2**（11 评论）— 今日发布重写版，方案从直连改为 broker 合约，处于活跃设计期。

热点背后的三条主线：**对外兼容**（OpenAI 协议）、**架构所有权澄清**（runtime/会话/附件边界）、**安全与隔离**（凭证、记忆、多租户）。

## 5. Bug 与稳定性

**今日报告的 Bug/稳定性问题：**

| 严重度 | 编号 | 描述 | 状态 |
|---|---|---|---|
| S1 | [#7527](https://github.com/zeroclaw-labs/zeroclaw/issues/7527) | macOS 15.7.7 权限检测失败、空白页面、重开窗口消失（工作流阻塞） | 已关闭（needs-repro，作者未响应） |
| P1 | [#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965) | cron custom-shell 测试在并行运行时门禁下触发 ETXTBSY 竞态，导致无关 PR 失败 | 已接受，暂无直接 fix PR |
| P2 | [#7870](https://github.com/zeroclaw-labs/zeroclaw/issues/7870) | agent runtime options 可能从首个配置的 provider 泄漏（应按所选 provider 解析） | accepted tracker |

**待合并的修复 PR（全部 risk:high，多数需作者响应）：**

- [#9320](https://github.com/zeroclaw-labs/zeroclaw/pull/9320) fix(cron)：为 agent job 增加墙钟超时，释放 sqlite `locked_at` 锁（挂起 run 不再永久占锁）
- [#9753](https://github.com/zeroclaw-labs/zeroclaw/pull/9753) fix(config)：区分 `allowed_tools` 的"缺省=不限制 / 空数组=全拒绝 / 非空=白名单"三态，修复空列表 fail-open 的安全问题
- [#9995](https://github.com/zeroclaw-labs/zeroclaw/pull/9995) fix(hooks)：加固 webhook 审计导出，脱敏凭证、provider token 与内联图片标记
- [#9281](https://github.com/zeroclaw-labs/zeroclaw/pull/9281) fix(config)：`config/set` 失败时事务性回滚自动创建的 map 别名
- [#9002](https://github.com/zeroclaw-labs/zeroclaw/pull/9002) fix(gateway)：dashboard 客户端断开后保持 agent turn 存活，避免导航/休眠中断任务
- [#9745](https://github.com/zeroclaw-labs/zeroclaw/pull/9745) / [#9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746) fix(memory/tools)：知识图谱与 session 工具增加 per-agent 归属与权限校验，修复跨 agent 数据读写泄漏
- [#9954](https://github.com/zeroclaw-labs/zeroclaw/pull/9954) fix(sop)：解包双重编码的 step 输出后再做 schema 校验（需维护者评审）
- [#9957](https://github.com/zeroclaw-labs/zeroclaw/pull/9957) fix(sop)：记录 run 失败原因，不再丢弃

安全相关修复占比很高，表明多租户隔离与配置安全是当前稳定性工作的重点。

## 6. 功能请求与路线图信号

- **OpenAI Chat Completions 协议**（[#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)）— 评论最多、生态价值最高，大概率进入路线图。
- **Gemini Live 实时语音通道**（[#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780)）— v2 今日重写为 broker 合约，设计仍在演进。
- **Agent Plugins 1.0 标准加载**（[#9810](https://github.com/zeroclaw-labs/zeroclaw/issues/9810)）— 支持 `plugin.json` + `skills/` + `mcp.json` 的社区插件生态，是生态扩展信号。
- **可选产品遥测**（[#9621](https://github.com/zeroclaw-labs/zeroclaw/issues/9621)）— staged opt-in + operator 审查报告，帮助维护者做功能取舍决策。
- **AI 辅助 PR 预审/复审**（[#9330](https://github.com/zeroclaw-labs/zeroclaw/issues/9330)）— 用 CI 结果触发 AI review，人工保留最终审批权。
- **桌面 computer-use**（[#6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909)）— 屏幕感知 + 键鼠控制的桌面自动化能力。
- **泄露检测器豁免公开区块链地址**（[#9825](https://github.com/zeroclaw-labs/zeroclaw/issues/9825)）— 修复支付链接被误 redact 的生产问题。
- **渠道功能**：[Discord 提及触发 thread](https://github.com/zeroclaw-labs/zeroclaw/issues/7849)、[wecom_ws 主动消息与媒体发送](https://github.com/zeroclaw-labs/zeroclaw/issues/7824)。
- **开发者体验**：PR size 标签自动化（[#9867](https://github.com/zeroclaw-labs/zeroclaw/pull/9867)）、risk/size 标签随 diff 重算（[#9345](https://github.com/zeroclaw-labs/zeroclaw/issues/9345)）、CI gate 动机注释（[#9512](https://github.com/zeroclaw-labs/zeroclaw/issues/9512)）。

结合已有 PR 判断，**OpenAI 兼容 API、per-agent 数据隔离（#9745/#9746）、SOP 控制面（#8288）**最可能进入下一版本。

## 7. 用户反馈摘要

- **生态接入受阻**（[#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)）：用户明确表达"我只想用现有 OpenAI 生态工具连 ZeroClaw"，当前仅有 WebSocket/ACP/webhook 导致 Open WebUI、LobeChat、LangChain 等无法接入，迁移门槛高。
- **生产误报伤及业务**（[#9825](https://github.com/zeroclaw-labs/zeroclaw/issues/9825)）：泄漏检测器将公开区块链地址识别为高熵密钥，导致支付请求 URL 不可投递。"检测器工作正常，但它要检测的东西与应用场景冲突"— 需要发布安全的例外列表。
- **macOS 桌面体验差**（[#7527](https://github.com/zeroclaw-labs/zeroclaw/issues/7527)）：安装后权限检测失效、界面空白、重开无窗口，属 S1 阻塞，但因缺乏可复现信息已关闭，建议维护者主动跟进复现。
- **成本敏感型自部署**（[#7762](https://github.com/zeroclaw-labs/zeroclaw/issues/7762)）：用户希望 cron 可指定最便宜模型（如 gemma）跑低优先级任务，同时抱怨 cron 文档缺失 — 反映小型自部署用户的资源约束。
- **CI 不稳定打击信心**（[#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965)）：并行运行时门禁的 ETXTBSY 竞态让无关 PR 变红，社区对此类基础设施问题容忍度低。
- **配置语义混淆**（[#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103)）：`memory.backend` 同时承担"权威存储选择"和"连接器挂载"两个职责，让 Lucid 这类非权威组件被建模成完整 backend，运维困惑。

## 8. 待处理积压

**长期未决的 RFC/设计问题（需维护者评审）：**

- [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) Chat Completions profile（2026-07-02 创建，20 评论，risk:high）
- [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) / [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) 会话与附件架构（2026-07-28，17/15 评论）
- [#6954](https://github.com/zeroclaw-labs/zeroclaw/issues/6954) （2026-05-26）、[#6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971)（2026-05-27）、[#6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909)（2026-05-25）三个 RFC 已挂起近三个月
- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 维护者决策队列 tracker 建议作为优先处理入口

**待合并 PR（44 条，以下长期未动且 risk:high）：**

- [#9137](https://github.com/zeroclaw-labs/zeroclaw/pull/9137) 插件共享出口策略基础（2026-07-18，依赖 #9580）
- [#9745](https://github.com/zeroclaw-labs/zeroclaw/pull/9745) / [#9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746) per-agent 数据隔离（2026-08-04）
- [#9320](https://github.com/zeroclaw-labs/zeroclaw/pull/9320) cron 锁超时（2026-07-23，p1）
- [#9002](https://github.com/zeroclaw-labs/zeroclaw/pull/9002) gateway turn 存活（2026-07-11，p1）
- [#9954](https://github.com/zeroclaw-labs/zeroclaw/pull/9954) 标注 needs-maintainer-review，等待维护者过目

**已接受但未启动的功能：**

- [#7130](https://github.com/zeroclaw-labs/zeroclaw/issues/7130) 工作区级 `forbid(unsafe_code)`（2026-06-03）
- [#7089](https://github.com/zeroclaw-labs/zeroclaw/issues/7089) Windows shell host 评估（2026-06-02）
- [#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108) Rust 构建缓存与 CI 关键路径优化（2026-06-02）

以上高优先级、长时间未推进的 RFC 与 PR 建议在 [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 决策队列中优先排期，避免架构讨论持续空转。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-16

## 1. 今日速览

过去 24 小时 PicoClaw 项目活跃度较低：无新开或关闭的 Issues，无新版本发布，仅有 2 条 PR 处于待合并状态且均已被标记为 stale。两条 PR 均为 @grrowl 于 8 月 7 日提交的修复型变更，最近一次更新停留在 8 月 15 日，说明维护节奏放缓，社区讨论也近乎停滞。整体来看，项目处于低频维护期，但仍有待处理的稳定性修复任务积压，需要维护者加速推进或明确处理。

## 2. 版本发布

过去 24 小时无新版本发布，最新 Releases 保持为空。无版本更新内容、破坏性变更或迁移注意事项可汇报。

## 3. 项目进展

今日没有 PR 被合并或关闭，因此项目代码库没有新增变更。需要特别关注的是，当前积压的 2 条 PR 均来自同一作者 @grrowl，覆盖 agent 上下文机制和 WhatsApp 通道两个方向，若后续合并将为项目带来以下改进：

- **#3321** 修复 agent 动态上下文位置导致前缀缓存失效的性能问题，优化长对话场景下的推理响应效率。
- **#3320** 升级 whatsmeow 依赖，修复 WhatsApp 通道因客户端版本过旧而连接被拒（405）的故障，恢复原生通道可用性。

这两项修复对成熟度提升有直接价值，但当前均处于 stale 状态，尚未进入合并流程。

- #3321: [fix(agent): move dynamic context after history to preserve prefix caching](https://github.com/sipeed/picoclaw/pull/3321)
- #3320: [fix(deps): bump whatsmeow to unblock WhatsApp "client outdated (405)"](https://github.com/sipeed/picoclaw/pull/3320)

## 4. 社区热点

过去 24 小时没有产生任何新的 Issues 或 PR 评论，无高讨论量或高互动话题。两条待合并 PR 的评论数均为 undefined（可能为 0），点赞数也为 0，说明社区关注度偏低。核心诉求集中在两个方面：

- **长对话场景的性能优化**：#3321 指出将 per-request 动态上下文块（`## Current Time`、`## Runtime`、`## Current Session`、`## Current Sender`）置于系统消息中、位于全部对话历史之前，会因前缀缓存的位置敏感性导致每次请求都可能使缓存失效。这背后反映了用户对多轮/长上下文场景下响应延迟的敏感。
- **消息渠道的可用性**：#3320 直接关系到 WhatsApp 通道能否正常连接。WhatsApp 服务端已拒绝当前 whatsmeow 版本宣告的客户端标识，socket 连接约 5 秒后被断开且不自动重连，导致原生通道彻底不可用。该问题对依赖 WhatsApp 接入的用户影响严重。

## 5. Bug 与稳定性

过去 24 小时未报告新的 Bug 或崩溃回归，但当前积压的 2 个已知问题值得关注，按严重程度排列如下：

| 严重度 | 问题描述 | 关联 PR | 状态 |
|--------|---------|--------|------|
| 高 | WhatsApp 原生通道持续不可用：服务端拒绝过旧客户端版本（error 405），连接后约 5 秒被断开，且无自动重连机制 | [#3320](https://github.com/sipeed/picoclaw/pull/3320) | 已有修复 PR，待合并 |
| 中 | 长对话场景下前缀缓存效率低下：动态上下文块置于历史之前，导致每次请求触发缓存失效，增加推理延迟与 token 成本 | [#3321](https://github.com/sipeed/picoclaw/pull/3321) | 已有修复 PR，待合并 |

两个问题的修复方案均已提交，但 8 月 15 日后无进一步动态，处于 stale 风险之中，建议维护者尽快介入。

## 6. 功能请求与路线图信号

过去 24 小时无新的功能请求 Issues 提交。从现有 PR 中可提取两个信号：

- **系统消息结构优化**（#3321）暗示开发者对 token 效率与缓存命中率有持续追求，未来路线图可能会进一步细化系统提示词的动态/静态分段策略。
- **WhatsApp 依赖升级**（#3320）说明跨平台消息通道的长期可维护性依赖底层库的最新化，后续可能涉及更多渠道（如 Telegram、Signal 等）的依赖定期升级机制。

这两项虽为修复性质，但在 PR 合并后有可能解锁更优架构或带来渠道功能的间接增强（如 WhatsApp 新特性的兼容）。

## 7. 用户反馈摘要

过去 24 小时无用户评论或 Issues 反馈记录，无法提取具体的用户痛点或满意度数据。从两个 PR 的摘要描述中间接可得：

- 有用户（或开发者）实际运行 WhatsApp 原生通道并遭遇了连接被拒且无重连的死局，这是直接影响使用的稳定性痛点。
- 长对话场景下的响应性能问题是用户可感知的体验瓶颈，尤其是在前缀缓存机制生效不佳时延迟与成本都会上升。

若维护者希望获取更丰富的用户意见，建议在后续合并 PR 后主动发起版本验证反馈征集。

## 8. 待处理积压

当前积压的 2 条 PR 均陷入 stale 状态，需要维护者关注：

- [#3321 fix(agent): move dynamic context after history to preserve prefix caching](https://github.com/sipeed/picoclaw/pull/3321)
  - 创建于 2026-08-07，最后更新 2026-08-15，已被机器人标记为 stale
  - 若长期无维护者响应，存在被自动关闭的风险，导致性能修复丢失
  
- [#3320 fix(deps): bump whatsmeow to unblock WhatsApp "client outdated (405)"](https://github.com/sipeed/picoclaw/pull/3320)
  - 创建于 2026-08-07，最后更新 2026-08-15，同样处于 stale 状态
  - 该修复直接关系 WhatsApp 通道的生死，建议优先处理

**提醒**：两个 PR 自提交以来已过去 9 天，且已经历 stale 标记。若修复本身无争议，建议维护者尽快完成 review 与合并；若存在阻塞或设计分歧，也应在 issue 中明确说明，避免贡献者积极性受挫。

---

*报告生成时间：2026-08-16 | 数据来源：github.com/sipeed/picoclaw | 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 · 2026-08-16

## 1. 今日速览

过去 24 小时 QwenPaw 社区活跃度处于 **中高水平**：共产生 10 条 Issue 更新（其中 9 条新开/活跃，1 条关闭）和 11 条 PR 更新（全部处于待合并状态）。值得关注的是，**今日没有 PR 被合并或关闭**，合并通道存在积压；但有多位外部贡献者提交了新 PR，覆盖视频、Matrix、CLI 等模块，社区参与度明显提升。Matrix 端到端加密不可用的老 Issue（#6476）在历经近三周后终于关闭（但对应的 PR #7001 仍在审查中，需确认是否真正修复）。此外，视频处理路径（#7059/#7060）和 cron 更新假成功（#7048）是今日被发现的两个高影响缺陷，且均已出现对应修复 PR，修复响应速度较快。

---

## 2. 版本发布

今日无新版本发布（最新版本仍为 v2.1.0）。

---

## 3. 项目进展

**今日无 PR 被合并**，所有活跃 PR 均停留在待合并/审查状态。以下为当前处于关键审查节点、预计将合并的 PR：

- **[#6940] feat(pawapp): add native DataPaw app runtime and durable analysis workspace** — `ready-for-human-review`，新增 DataPaw 原生应用运行时与持久化分析工作区，属较大的功能引入，值得关注。
  链接：https://github.com/agentscope-ai/QwenPaw/pull/6940

- **[#6623] fix(acp): prevent final text loss when notifications race the prompt response** — `Under Review`，修复 ACP 传输层通知与响应竞争导致的最终文本丢失问题，直接对应 Issue #6625。
  链接：https://github.com/agentscope-ai/QwenPaw/pull/6623

其余 9 条 PR 均为最新提交的首个版本，尚未进入正式审查阶段（详见第 6 节）。整体而言，**项目今日在功能合并层面处于停滞状态**，但贡献者提交了大量新代码，后续几天若审查跟上，合并量可期。

---

## 4. 社区热点

### 4.1 本周最高讨论热度（3 条评论并列）

1. **[#6476] [Bug]: Matrix 端到端加密不可用**（已关闭）
   - 3 条评论，围绕 `matrix-nio` 需要 `olm`/`vodozemac` 解密、系统库安装、数据包依赖等问题展开，最终于今日关闭。
   - 链接：https://github.com/agentscope-ai/QwenPaw/issues/6476

2. **[#3915] [Feature]: Console WebUI 引入虚拟滚动解决长对话性能退化**
   - 3 条评论，创建于 2026-04-28，至今未解决，社区对长会话卡顿问题有持续关注。
   - 链接：https://github.com/agentscope-ai/QwenPaw/issues/3915

### 4.2 新增热点：视频内联限制引发的连环讨论

- **[#7060] view_video 的 2MB 硬编码上限问题**（1 条评论）+ **[#7059] view_video 结果被静默丢弃**（1 条评论）
  - 同一作者 @xiaoka76 连续提交两个高影响视频缺陷，并已提交关联修复 PR #7061。社区对多模态视频输入的完整链路（文件大小限制、API 兼容性、错误提示）有明确诉求。
  - https://github.com/agentscope-ai/QwenPaw/issues/7060
  - https://github.com/agentscope-ai/QwenPaw/issues/7059

---

## 5. Bug 与稳定性

以下按严重程度降序排列：

| 严重度 | Issue | 描述 | 修复状态 |
|---|---|---|---|
| 🔴 高 | [#7059] view_video 视频块被**静默丢弃**（OpenAI Responses API / Volcengine Ark） | 模型完全收不到视频帧，无任何错误提示 | 已有 PR #7061 |
| 🔴 高 | [#7053] OAuth2 refresh token **不轮转、不主动续期** | 远程 MCP 永久降级为手动重新认证 | 暂无 |
| 🟠 中 | [#7048] `qwenpaw cron update --text` 返回成功但 **prompt 未更新** | CLI 假成功，数据不一致 | 已有 PR #7055 |
| 🟠 中 | [#7060] view_video 内联上限**硬编码 2MB**，配置无效 | 视频无法输入模型，被文本占位符替代 | PR #7061 部分解决 |
| 🟠 中 | [#7051] 图片附件在会话重载后丢失（前端显示裂图） | 后端返回 data URL，前端历史视图无法渲染 | 暂无 |
| 🟡 低 | [#6476] Matrix 端到端加密不可用 | 已关闭（今日） | 已关闭，需确认修复范围 |

**质量观察**：今日 Issue 中 6/10 为 bug 报告，但三分之二已有关联修复 PR 或已关闭，bug 响应率较高。视频链路（#7059 + #7060 + #7061）和 cron 假成功（#7048 + #7055）属于典型的"修复 PR 紧跟 bug 报告"的良性社区循环，项目维护者响应速度值得肯定。

---

## 6. 功能请求与路线图信号

今日新增/活跃的功能请求及相关 PR 如下：

| 请求 | 类型 | 相关 PR | 纳入下一版本的可能性 |
|---|---|---|---|
| [#7056] 后台任务回调/通知机制 | 增强（异步任务完成时自动通知） | 无 | 中——用户明确提及轮询体验差，但需要设计统一回调协议 |
| [#7058] 恢复 Web UI 中 native context 策略选项 | UI 回归/功能恢复 | 无 | 高——后端已支持 `native`，仅缺前端入口，改动小 |
| [#7052] 插件 API 增加 system_prompt 权限控制 | 企业级权限 | 无 | 中——企业用户刚需，涉及安全模型，需谨慎设计 |
| [#7049] `GET /chats/{chat_id}` 支持 limit/before 分页 | 长会话性能（呼应 #3915） | PR #7049，first-time-contributor | 高——与虚拟滚动需求同源，后端分页是前置条件 |
| [#7033] 动态技能加载 + 自动卸载 + frontmatter 修复 | 技能系统运行时能力 | PR #7033（非首次贡献者） | 较高——直接补齐了运行时技能管理缺口 |
| [#7050] Cron 任务模型覆盖选择器 | UI 增强 | PR #7050，first-time-contributor | 高——后端已支持 `request.model_slot_override`，纯前端补齐 |
| [#7001] Matrix 群组房间内按发送者隔离会话/记忆 | 渠道语义修复 | PR #7001，first-time-contributor | 高——修正 Matrix 群聊中所有成员共享同一上下文的安全/隐私问题 |
| [#7054] Chrome 插件支持远程 bridge 端点（LAN 浏览器） | 多机扩展 | PR #7054，first-time-contributor | 中——部署场景明确，但涉及安全边界设计 |
| [#6302] 统一 provider 发现/模型元数据/路由/agent 控制 | 架构级重构 | 大型 PR，持续近一个月 | 不确定——改动面大，需重点审查 |

路线图信号：**视频、Matrix 会话隔离、cron 管理、长会话性能** 是当前社区投入最多的四个方向。

---

## 7. 用户反馈摘要

从今日 Issue 评论与描述中提炼用户真实反馈：

- **"静默失败" 是用户最反感的体验**：@xiaoka76 在 #7059 中明确写道视频调用"returns success but model never receives any video frames — no error, no warning, a completely silent failure"，视频块被直接丢弃，这种无感知的失败机制比报错更伤害用户信任。
- **CLI 工具的"假成功"同样困扰用户**：@Ray-lyy 在 #7048 中描述 cron update 命令返回 rc=0 且输出任务 JSON，但实际数据未更新，这种"看起来成功但没生效"的状态需要复现步骤详查。
- **企业/专业用户对安全与隐私有明确要求**：@xiaohushi512 在 #7052 中请求插件 API 的 system_prompt 权限，明确表态"不想提交会话后在 qwenpaw 的会话界面被用户看到"，提示企业级部署需要更强的提示词隔离能力。
- **对"配置不生效"的抱怨集中在硬编码限制**：@xiaoka76 在 #7060 中指出 `max_inline_media_bytes` 设置对视频路径无效，2MB 上限被硬编码，用户期望配置项全面接管此类限制。
- **Matrix 加密问题关闭但留下疑问**：#6476 关闭值得高兴，但社区中评论的后续讨论并未公开，需观察是否有更完善的 E2E 支持计划。

---

## 8. 待处理积压

以下为长期未获得充分关注或长期开放的重要项目项，建议维护者优先跟进：

| 项目 | 创建时间 | 持续时长 | 说明 |
|---|---|---|---|
| [#3915] Console WebUI 虚拟滚动 | 2026-04-28 | **110 天** | 长对话性能核心需求，3 条评论但始终无 PR 认领或维护者排期回复 |
| [#6302] 统一 provider 发现/模型元数据/路由 | 2026-07-21 | **26 天** | 大型架构 PR，无 review 记录，长期处于 OPEN |
| [#6940] DataPaw 原生应用运行时 | 2026-08-12 | 4 天 | 已标记 `ready-for-human-review`，但今日仍无任何 review 评论，有被搁置风险 |
| [#6623] ACP 通知竞态修复 | 2026-08-01 | 15 天 | 已标记 `Under Review`，修复明确且对应一个确切的 bug，已持续两周无人推进 |

**建议**：
- #3915 作为 110 天的老 Issue 应至少给出排期表态或与 #7049 分页 PR 联动回应；请在后续版本中明确是否已列入路线图。
- #6302 与 #6940 两个大 PR 若缺少 reviewer 带宽，建议在 Issue 下召唤维护者或调整 review 流程。
- 注意 Matrix 相关（#6476 关闭 + #7001 待审）的沟通衔接，确保社区对"加密修复"的认知是准确的。

---

*本日报基于 QwenPaw GitHub 仓库 2026-08-15 至 2026-08-16 公开数据自动生成，所有链接均指向对应 Issue/PR 原始页面。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

好的，这是根据您提供的 hermes-agent GitHub 数据生成的 2026-08-16 项目动态日报。

---

# hermes-agent 项目动态日报 (2026-08-16)

## 1. 今日速览

项目在过去 24 小时内维持极高活跃度：**500 条 Issue 更新**（新开/活跃 283，关闭 217）与 **500 条 PR 更新**（待合并 444，合并/关闭 56）。最关键的里程碑是史诗级重构 **#78647** 宣告完成（大型文件分解 20/20 全部完成），表明项目正在坚定执行“反上帝文件”架构策略。然而，**444 条待合并 PR** 形成的积压与关闭率偏低（约 11%）值得关注，可能成为未来交付瓶颈。今日无新版本 Release，但大量 P1/P2 级 Bug 被关闭（如 Windows 网关重启、macOS 桌面冻结等），显示修复速度正在加快，项目整体健康度良好，但稳定性问题仍是当前社区关注的第一焦点。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日虽无 Release，但核心架构重构取得标志性进展，同时一批高优先级缺陷修复已完成。

**架构与重构**
- **[#78647] [COMPLETE] 大型文件分解 Epic 20/20 完成** (78 评论) — 这是全仓库范围内的“上帝文件”分片史诗任务，宣告全部完成。该任务明确了“所有 god-files 必须分片，永不回退”的长期政策，是项目可维护性的重大胜利。([链接](https://github.com/NousResearch/hermes-agent/issues/78647))
- **[#84834] Webhook 功能包（graph-gated 修复）** (16 评论) — 针对整个 Webhook 面（入口、执行、交付、配置、UI、部署、文档）提出的 5×2×3 修复主追踪 Issue，规划了系统性的能力补齐。([链接](https://github.com/NousResearch/hermes-agent/issues/84834))

**PR 合并/关闭**
- **[#87312] feat(desktop): Capabilities 全视图 Profile 作用域 + Skills 标签页一键安装** (CLOSED) — 将 Profile 选择器从仅限 Tools/MCP 扩展到整个 Capabilities 视图，并为 Skills 标签页增加了 Bot Mode 式的一键安装器，是 #86548 的后续增强。([链接](https://github.com/NousResearch/hermes-agent/pull/87312))
- **[#75811] fix(clarify): 让 CLI 遵循 agent.clarify_timeout** (CLOSED) — 修复了 `load_cli_config()` 中一个合并冲突问题（"bug" vs "fix"），该问题导致配置被忽略，CLI 无法正确遵循超时设置。([链接](https://github.com/NousResearch/hermes-agent/pull/75811))

**Bug 修复关闭情况（部分）**
- Windows 桌面重启后网关不被拉起（[#83683](https://github.com/NousResearch/hermes-agent/issues/83683)）
- macOS 27 beta 桌面完全无响应（[#63047](https://github.com/NousResearch/hermes-agent/issues/63047)）
- 上下文压缩丢弃在途工具链（[#79278](https://github.com/NousResearch/hermes-agent/issues/79278)）
- TUI overlay 不可见导致会话/模型切换失效（[#69592](https://github.com/NousResearch/hermes-agent/issues/69592)）
- 更新后 Windows 网关静默死亡（[#84185](https://github.com/NousResearch/hermes-agent/issues/84185)）

## 4. 社区热点

今日最受关注和讨论的议题反映了用户对**稳定性、架构透明度和自主权**的强烈关注：

- **[#78647] 大型文件分解 Epic 完成** (78 评论) — 虽然已关闭，但其长期讨论热度最高，表明社区对“上帝文件”和代码可维护性有高度共识。([链接](https://github.com/NousResearch/hermes-agent/issues/78647))
- **[#66616] 技能索引过期/降级告警** (36 评论, OPEN) — 自动化探针连续触发告警（索引年龄 29.8h > 26h 限制），持续引发对文档系统可靠性的讨论。([链接](https://github.com/NousResearch/hermes-agent/issues/66616))
- **[#34352] 解决多租户 Hermes 问题** (32 评论, 3 👍) — 这是最具战略意义的社区提案。用户指出记忆操作完全绕过了钩子系统，导致租户隔离需要分叉核心才能实现。作者声称已在生产环境运行数月修复方案，明确表达了希望项目官方支持的意愿。([链接](https://github.com/NousResearch/hermes-agent/issues/34352))
- **[#83683] Windows 桌面重启网关静默死亡回归** (31 评论) — P1 级回归，桌面重启会强制杀死网关且不自动拉起，导致 WeChat/QQ/Telegram 全部失联，用户反应激烈。([链接](https://github.com/NousResearch/hermes-agent/issues/83683))
- **[#63047] macOS 桌面 5 条消息后完全卡死** (28 评论) — P1 级，影响 macOS 27 beta 用户，且状态栏设置均被锁定，恢复手段有限。([链接](https://github.com/NousResearch/hermes-agent/issues/63047))

**诉求分析：** 社区讨论集中于两大核心诉求：**1) 高优先级回归必须在短时间内修复**（大量用户依赖网关与桌面应用作为日常生产力工具）；**2) 高级用户需要更灵活的架构能力**（如多租户、插件编排），他们不满足于现有单体模式，并愿意为此提供生产级补丁。

## 5. Bug 与稳定性

今日 Bug 报告和修复密集，按严重程度分级如下，多数最高优先级问题已有固定方案或已关闭。

**P1 严重级别**
- **[#65365] (OPEN)** OAuth (Claude Pro/Max) 会话中暴露 `memory`/`session_search` 工具 schema 会确定性触发 HTTP 400 "out of extra usage"。影响所有通过订阅 OAuth 使用 Anthropic 模型的用户。([链接](https://github.com/NousResearch/hermes-agent/issues/65365))
- **[#51327] (OPEN)** Linux 下通过 `.desktop` 启动器启动时，因 Electron `chrome-sandbox` 缺少 setuid 导致应用**静默失败**，无任何窗口和错误提示。([链接](https://github.com/NousResearch/hermes-agent/issues/51327))
- **[#82001] (CLOSED)** Agent flush 在上下文压缩后不采用活动继续机制，导致会话死于误导性的“磁盘已满”对话框。已关闭，指向已修复。([链接](https://github.com/NousResearch/hermes-agent/issues/82001))
- **[#69592] (CLOSED)** TUI 中 `/sessions` 和 `/models` 叠加层在环境组件存在时不可见，导致无法恢复会话或切换模型。已修复。([链接](https://github.com/NousResearch/hermes-agent/issues/69592))
- **[#78069] (CLOSED)** 工具自由文本响应间歇性无法绑定到待处理的 clarify 调用，导致回合无限期挂起。已修复。([链接](https://github.com/NousResearch/hermes-agent/issues/78069))
- **[#79278] (CLOSED)** 上下文压缩可能丢弃在途工具链——副作用完成但结果未达 agent，导致不安全重放。已修复。([链接](https://github.com/NousResearch/hermes-agent/issues/79278))
- **[#84185] (CLOSED)** Windows 更新后冷启动网关静默死亡，无日志无 PID。已修复。([链接](https://github.com/NousResearch/hermes-agent/issues/84185))

**P2 严重级别**
- **[#52010] (OPEN)** macOS 用户每次桌面应用更新后，全磁盘访问 (FDA) 权限被撤销，必须手动重新授权，体验受损严重。([链接](https://github.com/NousResearch/hermes-agent/issues/52010))
- **[#53004] (OPEN)** “项目”范式 (Projects paradigm) 破坏文件夹→会话→侧边栏流程，称“无打开项目”，无法在选定文件夹中启动会话。([链接](https://github.com/NousResearch/hermes-agent/issues/53004))
- **[#58619] (OPEN)** Window 桌面在重连时产生无界 `serve` 进程且不清理旧进程，约每 15-30 分钟累积一个。([链接](https://github.com/NousResearch/hermes-agent/issues/58619))
- **[#83846] (OPEN)** ZIP 回退更新会删除已构建的桌面应用且不重建，后续更新错误地报告“已是最新”。([链接](https://github.com/NousResearch/hermes-agent/issues/83846))
- **[#86027] (OPEN, duplicate)** 从 v0.18.2 升级到 v0.20.1 时，旧版 FTS5 索引 `messages_fts_trigram` 被新版 SQLite 报告为格式错误。([链接](https://github.com/NousResearch/hermes-agent/issues/86027))

**P3 严重级别 / 积压关注**
- **[#66616] (OPEN)** 技能索引延迟/降级，自动化探针持续失败。([链接](https://github.com/NousResearch/hermes-agent/issues/66616))
- **[#54189] (OPEN)** `state.db` 无界增长，2 周内达 659MB，无生命周期清理机制。([链接](https://github.com/NousResearch/hermes-agent/issues/54189))
- **[#58596] (OPEN)** `DaemonThreadPoolExecutor` 在 Python 3.14 上崩溃，影响所有并发特性。([链接](https://github.com/NousResearch/hermes-agent/issues/58596))

## 6. 功能请求与路线图信号

今日新功能需求活跃，部分已通过 PR 得到响应，具有明确的版本演进信号。

**强烈路线图信号（已有对应 PR）**
- **多租户架构 (Multi-tenancy)**: **[#34352](https://github.com/NousResearch/hermes-agent/issues/34352)** 社区已有生产级修复方案，这是项目未来支持“多智能体”协作的关键，但目前尚未看到官方采纳信号。
- **插件编排透明度**: **[PR #87311](https://github.com/NousResearch/hermes-agent/pull/87311)** 要求插件作者声明是否编排 agent 或分发任务，未声明的将拒绝激活，是提升安全边界的重要一步。
- **看板分发安全**: **[PR #87315](https://github.com/NousResearch/hermes-agent/pull/87315)** 防止网关启动时自动分发 Kanban 卡片导致主机过载，需显式开启 `kanban.dispatch_in_gateway`。
- **后台审查工具**: **[PR #82146](https://github.com/NousResearch/hermes-agent/pull/82146)** 允许在后台审查中配置特定工具，同时保持默认禁止未列明工具的安全策略。
- **桌面多 Profile 隔离**: **[PR #83708](https://github.com/NousResearch/hermes-agent/pull/83708)** 完成桌面端到端 Profile 隔离，使消息传递范围严格限定在活动远程 Profile 内。
- **Telegram 反应动作**: **[PR #54599](https://github.com/NousResearch/hermes-agent/pull/54599)** 允许用户通过表情符号长按触发 agent 动作，默认配置为空以保持完全兼容。
- **Agent 响应转储**: **[PR #87302](https://github.com/NousResearch/hermes-agent/pull/87302)** 新增 `dump_api_response_debug`，与请求转储对称，方便调试与审计。

**早期需求（需观察）**
- **[#86146] (OPEN)** 模型切换时应使用当前 Profile 而非主 Profile 的模型列表（未提供复现步骤）。([链接](https://github.com/NousResearch/hermes-agent/issues/86146))
- **[#84047] (OPEN)** 针对 77 个开放 stall/hang 报告的七种机制分类，其中约 1/3 被确认是安装器问题而非运行时问题，有助于未来精准治理。([链接](https://github.com/NousResearch/hermes-agent/issues/84047))

## 7. 用户反馈摘要

从今日评论区提炼的用户声音：

**关键痛点**
- **更新 PTA (Post-Traumatic Update)**: 大量 Windows 和 macOS 用户因更新而遭遇配置回滚、权限撤销（FDA）、网关静默死亡、应用被删但重建失败等，更新流程已成为最大的信任破坏点（[#52010](https://github.com/NousResearch/hermes-agent/issues/52010), [#83846](https://github.com/NousResearch/hermes-agent/issues/83846), [#84185](https://github.com/NousResearch/hermes-agent/issues/84185), [#83569](https://github.com/NousResearch/hermes-agent/issues/83569)）。
- **桌面端稳定性焦虑**: 反复出现的桌面卡死（[#63047](https://github.com/NousResearch/hermes-agent/issues/63047)）、静默失败（[#51327](https://github.com/NousResearch/hermes-agent/issues/51327)）、后台进程泄漏（[#58619](https://github.com/NousResearch/hermes-agent/issues/58619)）严重影响了用户对桌面应用的信心。
- **架构限制的痛苦**: 多租户用户明确指出“没有官方支持就无法安全扩展”，这是社区走在项目前面的典型案例（[#34352](https://github.com/NousResearch/hermes-agent/issues/34352)）。

**满意之处**
- 复杂问题（如上下文压缩丢链、TUI 覆写层失效）在报告后快速被识别和关闭，展示了高效维护能力。
- 对正在进行的“反上帝文件”重构，社区通过大量参与评论表示支持，并认可这一长期投资的价值（[#78647](https://github.com/NousResearch/hermes-agent/issues/78647)）。

## 8. 待处理积压

以下 Issue 与 PR 长期未获响应或行动，建议维护者重点排查：

**长期未闭环的重大 Issue**
- **[#34352] 多租户问题 (2026-05-29 开启, 32 评论, 3 👍)** — 社区已给出生产验证的补丁，是极具战略价值的功能，悬置过久。([链接](https://github.com/NousResearch/hermes-agent/issues/34352))
- **[#51327] .desktop 启动静默失败 (2026-06-23, P1)** — 影响所有 Linux 桌面用户，点击图标无任何反应，缺少有效变通方案。([链接](https://github.com/NousResearch/hermes-agent/issues/51327))
- **[#53004] Projects 范式回归 (2026-06-26, P2)** — 破坏了核心工作流，且每日仍有点赞表示受影响，但未见 PR 关联。([链接](https://github.com/NousResearch/hermes-agent/issues/53004))
- **[#52010] macOS FDA 权限反复撤销 (2026-06-24, P2)** — 已确认与 ad-hoc 签名有关，关联 PR #49110 已提出正式签名方案，但该 PR 状态未明。([链接](https://github.com/NousResearch/hermes-agent/issues/52010))
- **[#58619] 无界 serve 进程泄漏 (2026-07-05, P2)** — 长期内存/进程泄漏风险，有明确的解决建议。([链接](https://github.com/NousResearch/hermes-agent/issues/58619))
- **[#54962] 从 gateway/run.py 提取路由 (2026-06-29, P3)** — 针对 858KB 巨型文件的架构债，与 #78647 史诗目标一致但至今无对应 PR。([链接](https://github.com/NousResearch/hermes-agent/issues/54962))

**长时间待合并的 PR（可能影响功能交付）**
- **[#64288] fix(memory): 中和提示词分隔符 (2026-07-14)** — 安全修复，防止提示注入，合并周期已超一个月。([链接](https://github.com/NousResearch/hermes-agent/pull/64288))
- **[#56011] fix(tools): 可配置终端审批规则 (2026-07-01)** — 安全增强功能，用户呼声较高。([链接](https://github.com/NousResearch/hermes-agent/pull/56011))
- **[#54599] feat(telegram): 消息反应动作 (2026-06-29)** — 交互增强功能的实现，等待太久。([链接](https://github.com/NousResearch/hermes-agent/pull/54599))
- **[#57607] fix(dashboard): 通过主题令牌路由排版 (2026-07-03)** — UI 一致性与 CJK 字体回退改进。([链接](https://github.com/NousResearch/hermes-agent/pull/57607))
- **[#76063] fix(approval): 命令前缀后拒绝规则执行 (2026-08-01)** — 安全策略绕过风险，应优先处理。([链接](https://github.com/NousResearch/hermes-agent/pull/76063))
- **[#75154] fix(update): 保留本地提交而不是静默丢弃 (2026-07-31)** — 直接针对更新流程用户信任痛点。([链接](https://github.com/NousResearch/hermes-agent/pull/75154))
- **[#80286] fix(kanban): active_pr 重生守卫不阻止任务首次生成 (2026-08-06)** — 存在逻辑缺陷，阻塞合法任务。([链接](https://github.com/NousResearch/hermes-agent/pull/80286))

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报（2026-08-16）

## 1. 今日速览

AstrBot 项目在 2026-08-16 保持健康的社区活跃度：过去 24 小时共更新 21 条 Issues（其中 13 条已关闭）、17 条 Pull Requests（其中 6 条已合并/关闭），显示维护者响应及时、处理效率良好。合并的 PR 覆盖了 WebUI 主题适配、知识库上传限制、配置密码安全等多个维度，项目在功能完善与稳定性提升上同步推进。社区讨论集中在**并行工具调用**、**备份兼容性**、**WebUI 深色模式可读性**等真实使用痛点，开发者与用户之间形成了良性互动。无新版本发布，但多个高质量 PR 已合入主线，为下一版本积蓄了实质性改进。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日合并/关闭了 6 个 PR，集中修复了 WebUI 体验、知识库可用性和核心配置安全三个方向：

| PR | 内容 | 影响 |
|---|---|---|
| [#9688](https://github.com/AstrBotDevs/AstrBot/pull/9688) | **修复 Dashboard 追踪页面主题适配**：将硬编码的追踪记录文字颜色替换为 Vuetify 语义化主题色，深色模式下可读性显著提升 | WebUI 视觉体验全面优化 |
| [#9701](https://github.com/AstrBotDevs/AstrBot/pull/9701) | **移除知识库上传文件数量限制**：取消 10 文件上限，改用任务级临时目录分批处理，控制内存占用 | 知识库批量导入能力增强 |
| [#9665](https://github.com/AstrBotDevs/AstrBot/pull/9665) | **修复 Dashboard 密码静默轮换**：移除 `password_change_required=True` 时每次配置加载都重新生成密码的逻辑，避免已有密码失效 | 解决严重配置安全 Bug |
| [#9699](https://github.com/AstrBotDevs/AstrBot/pull/9699) | **分离推理元数据与 Provider 配置**：`reasoning: true` 等能力描述标记不再被复制进模型配置 | 防止配置编辑器暴露非请求参数 |
| [#9698](https://github.com/AstrBotDevs/AstrBot/pull/9698) | **修复 ChatUI 侧边栏在中等宽度不可见**：当侧边栏处于临时模式时始终显示切换按钮，对齐断点行为 | WebUI 响应式布局完善 |
| [#9451](https://github.com/AstrBotDevs/AstrBot/pull/9451) | **修正尾部伪造工具调用消息顺序**：确保 `assistant(tool_calls) → tool(result)` 消息对按时间顺序正确排列 | 提升确定性工具调用可靠性 |

这些合入表明项目在 **WebUI 体验精细化**、**知识库能力扩展**和**配置安全加固**三个方向均有实际交付，整体向更稳定、更易用的方向稳步迈进。

---

## 4. 社区热点

### 讨论热度 TOP 3

1. **[#8943 支持并行工具调用](https://github.com/AstrBotDevs/AstrBot/issues/8943)** — 7 条评论
   - 当前 `tool_loop_agent_runner` 对同轮多个工具调用采用串行 `for` 循环处理。用户要求支持并行工具执行以降低延迟。
   - **诉求分析**：这反映了用户对大模型 Agent 场景下性能优化的直接需求——串行工具调用是响应延迟的主要瓶颈之一。并行执行可显著提升多工具协作场景的效率，属于技术栈核心增强。

2. **[#8615 基础设置备份兼容性建议](https://github.com/AstrBotDevs/AstrBot/issues/8615)** — 6 条评论
   - 群晖 Docker 版升级后无法启动，重装后无法用旧版本备份恢复（提示版本不兼容），所有设置需手动重配。
   - **诉求分析**：强烈的"备份≠白备"痛点。用户期望基础配置能跨版本迁移（至少核心设置），跳版本也能恢复。这触及部署运维环节的信任问题，社区对升级安全感的诉求明显。

3. **[#7466 群唤醒增强插件](https://github.com/AstrBotDevs/AstrBot/issues/7466)** — 5 条评论
   - 插件发布请求（多群独立唤醒规则、指令拦截、持续活跃等），今日被关闭。
   - **诉求分析**：群聊场景下精细化权限控制和唤醒策略是高频需求，关闭说明已完成审核流程或进入合并阶段。

### 重点关注

- [#9672 内置指令中英文转换](https://github.com/AstrBotDevs/AstrBot/issues/9672)：用户反映内置指令输出只有英文，建议增加中英文切换。此贴仅有 3 条评论但直接触及非英语用户的日常使用障碍，值得关注。
- 作者 **@landamao** 今日有 6 条历史 Issue 被关闭（#7466、#5058、#5084、#5059、#6086、#7755），说明其此前反馈的多个 Bug 已由维护者跟进处理完毕。

---

## 5. Bug 与稳定性

### 严重（已提供修复 PR）

| Issue | 严重程度 | 状态 |
|---|---|---|
| [#9662](https://github.com/AstrBotDevs/AstrBot/issues/9662) **Dashboard 密码静默轮换**：`password_change_required=True` 时每次配置加载都会生成新随机密码并覆写磁盘，且不打印——用户可能永久丢失 Dashboard 访问权限 | **高**（凭据安全） | ✅ 已由 [#9665](https://github.com/AstrBotDevs/AstrBot/pull/9665) 修复 |
| [#9683](https://github.com/AstrBotDevs/AstrBot/issues/9683) **深色模式追踪页面文字不可读**：硬编码颜色导致对比度极低，追踪记录几乎无法阅读 | **中**（视觉可用性） | ✅ 已由 [#9688](https://github.com/AstrBotDevs/AstrBot/pull/9688) 修复 |

### 中等（有修复方案）

| Issue | 严重程度 | 状态 |
|---|---|---|
| [#9693](https://github.com/AstrBotDevs/AstrBot/issues/9693) **登录密码无法查看**：最新版随机密码在运行日志中无任何输出 | **中**（新用户门槛） | 已由 #9665 的逻辑覆盖，应已修复 |
| [#9695](https://github.com/AstrBotDevs/AstrBot/issues/9695) **WebChat 侧边栏特定尺寸下消失**：UI 拉伸至 `1388×884` ~ `1968×1054` 时历史会话侧边栏不显示 | **中**（响应式缺陷） | ✅ 已由 [#9698](https://github.com/AstrBotDevs/AstrBot/pull/9698) 修复 |
| [#9700](https://github.com/AstrBotDevs/AstrBot/issues/9700) **插件仓库转移后市场更新被拒**：GitHub 仓库转移到新组织后，Cloud 插件市场以"必须继续使用首次验证的发布空间"为由拒绝 v2.1.2 发布 | **中**（影响插件作者） | 🟡 暂无修复 PR，需维护者确认转移仓库的重新验证流程 |

### 低（历史遗留，已关闭）

- [#5084](https://github.com/AstrBotDevs/AstrBot/issues/5084)：关闭 AI 对话总开关后仍调用图片描述接口——已关闭
- [#5058](https://github.com/AstrBotDevs/AstrBot/issues/5058)：连续两次唤醒触发 40 秒延迟阻塞——已关闭
- [#5059](https://github.com/AstrBotDevs/AstrBot/issues/5059)：配置文件关闭分段回复后仍检测分段——已关闭

> 说明：上述低级别历史问题今日被关闭，但 Issue 页未显示对应的修复 PR 链接，建议维护者补充关闭原因/修复提交引用，方便社区追溯。

---

## 6. 功能请求与路线图信号

### 可能被纳入下一版本的功能

| 功能请求 | 评论/赞 | 信号强度 | 判断依据 |
|---|---|---|---|
| [#8943 并行工具调用](https://github.com/AstrBotDevs/AstrBot/issues/8943) | 7 条评论 | **强** | 技术债明确、影响核心 Agent 性能；已有明确代码位置和实现路径（串行 `for` 循环 → 并行编排） |
| [#8615 跨版本配置备份恢复](https://github.com/AstrBotDevs/AstrBot/issues/8615) | 6 条评论 | **强** | 触及升级安全信心，是用户留存的重要影响因素；实现方案清晰（基础设置单独备份 + 版本兼容恢复） |
| [#9186 插件独立 Logger](https://github.com/AstrBotDevs/AstrBot/issues/9186) | 2 👍 | **中** | 开发者体验类需求，可避免插件日志干扰核心日志，对插件生态健康有帮助 |
| [#9074 自定义数据存储位置](https://github.com/AstrBotDevs/AstrBot/issues/9074) | 3 条评论 | **中** | Windows 用户 C 盘空间受限是现实痛点，属于部署灵活性需求 |
| [#9672 内置指令中英文转换](https://github.com/AstrBotDevs/AstrBot/issues/9672) | 3 条评论 | **中** | 国际化基础能力，低实现成本，高用户感知度 |
| [#8331 约束插件优先级范围](https://github.com/AstrBotDevs/AstrBot/issues/8331) | 1 条评论 | **低** | 建议对 `priority` 1-10 范围提供校验提示，属健壮性改进 |
| [#7503 屏蔽部分插件更新提醒](https://github.com/AstrBotDevs/AstrBot/issues/7503) | 1 条评论 | **低** | 插件管理细节优化，用户对稳定版本更有信任感 |

### 今日新增功能请求

- [#9704 插件审核结果邮件通知](https://github.com/AstrBotDevs/AstrBot/issues/9704)：用户希望在 Cloud 插件市场每次安全审核完成后通过邮箱收到通知。
- [#9700 仓库转移后的更新权限](https://github.com/AstrBotDevs/AstrBot/issues/9700)：既是 Bug 也是流程缺失——组织转移后缺少重新验证路径。

---

## 7. 用户反馈摘要

综合今日 Issue 与评论，真实用户反馈主要集中在以下维度：

### 配置与数据安全（最强烈痛点）
> 「重装完用之前的备份恢复，提示版本不同无法恢复，相当于备份了个寂寞」— [#8615](https://github.com/AstrBotDevs/AstrBot/issues/8615)

> 「每次 AstrBotConfig 构造都会静默生成新随机密码并覆写磁盘，新密码从不在启动横幅之外打印，已有密码变成无效」— [#9662](https://github.com/AstrBotDevs/AstrBot/issues/9662)

### WebUI 可用性
> 「深色模式下追踪页面的文字几乎无法辨认」— [#9683](https://github.com/AstrBotDevs/AstrBot/issues/9683)

> 「UI 拉伸至部分尺寸会导致 webchat 界面不显示历史会话侧边栏」— [#9695](https://github.com/AstrBotDevs/AstrBot/issues/9695)

### 部署与存储
> 「插件和数据被塞在 C 盘里面」— [#9074](https://github.com/AstrBotDevs/AstrBot/issues/9074)

### 本地化与易用性
> 「内置指令输出加一个中英文转换，英文看不懂」— [#9672](https://github.com/AstrBotDevs/AstrBot/issues/9672)

### 插件生态诉求
> 「部分插件能屏蔽更新提醒，有的插件更新后反而不稳定」— [#7503](https://github.com/AstrBotDevs/AstrBot/issues/7503)

> 「插件市场审核结果可以通过邮箱渠道通知用户」— [#9704](https://github.com/AstrBotDevs/AstrBot/issues/9704)

**整体满意度判断**：用户对插件生态和核心功能的认可度较高（多个插件发布请求被接受），但部署可靠性（备份恢复、密码可见性）和国际化（中英文切换）是两个最常见的负面反馈来源。好消息是绝大多数反馈均已获得修复或在同批次 PR 中解决。

---

## 8. 待处理积压

### 长期未关闭的 OPEN Issues（需维护者关注）

| Issue | 创建时间 | 待处理天数 | 说明 |
|---|---|---|---|
| [#7503 屏蔽部分插件更新提醒](https://github.com/AstrBotDevs/AstrBot/issues/7503) | 2026-04-13 | **~125 天** | 用户已 fork 修改插件但无法屏蔽市场更新提醒，长期无进展 |
| [#8331 约束插件优先级范围](https://github.com/AstrBotDevs/AstrBot/issues/8331) | 2026-05-25 | **~83 天** | 改善插件开发体验的小改进，建议纳入下个迭代 |
| [#8615 跨版本备份恢复](https://github.com/AstrBotDevs/AstrBot/issues/8615) | 2026-06-06 | **~71 天** | 高用户共鸣，需产品层面设计备份兼容策略 |
| [#8943 并行工具调用](https://github.com/AstrBotDevs/AstrBot/issues/8943) | 2026-06-21 | **~56 天** | 核心性能增强，讨论充分但尚无实现 PR |
| [#9074 自定义数据存储位置](https://github.com/AstrBotDevs/AstrBot/issues/9074) | 2026-06-29 | **~48 天** | Windows 部署痛点，涉及数据目录架构调整 |

### 待合并 PR（较长寿，需及时 review）

| PR | 等待天数 | 影响模块 |
|---|---|---|
| [#9378 空提及等待按发送者隔离](https://github.com/AstrBotDevs/AstrBot/pull/9378) | **~23 天** | 会话管理核心 |
| [#9467 Telegram 多媒体文件下载到本地临时路径](https://github.com/AstrBotDevs/AstrBot/pull/9467) | **~17 天** | 平台适配（Telegram 消息链完整度） |
| [#9422 空提及等待绑定发送者](https://github.com/AstrBotDevs/AstrBot/pull/9422) | **~19 天** | 会话管理（与 #9378 有重叠，需协调合并） |
| [#9458 session_waiter 超时后任务跟踪](https://github.com/AstrBotDevs/AstrBot/pull/9458) | **~17 天** | 会话生命周期管理 |
| [#9651 音频 magic bytes 校验](https://github.com/AstrBotDevs/AstrBot/pull/9651) | **~4 天** | 语音消息兼容性 |
| [#9592 QQ 官方消息 4000 字切分](https://github.com/AstrBotDevs/AstrBot/pull/9592) | **~9 天** | 平台适配（QQ 官方） |

**关注重点**：#9378 与 #9422 均修复同一问题（#9377），但方案不同（一个从 filter 层面隔离，一个从 waiter 绑定层面处理），需要维护者协调选择一个合并，避免逻辑冲突。此外，#9467 等待已达 17 天，修复的是 Telegram 文件消息被静默丢弃的严重问题，建议优先推进。

---

**总结**：AstrBot 项目今日处于**平稳而高效的迭代节奏**——WebUI 主题、密码安全、知识库上传等多个改进已落地，社区反馈的处理闭环率较高。核心挑战在于：**性能类需求（并行工具调用）和运维类需求（跨版本备份）** 已沉淀较长时间，建议在后续版本规划中明确优先级；同时需及时处理待合并 PR 中的会话管理重叠方案，避免技术债累积。整体项目健康度良好，值得持续关注。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*