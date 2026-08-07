# OpenClaw 生态日报 2026-08-08

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-07 22:24 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报（2026-08-08）

> 数据来源：github.com/openclaw/openclaw ｜ 统计窗口：2026-08-07 → 2026-08-08 ｜ 注：PR 列表未提供评论数字段，相关分析基于标签、描述与状态推断。

## 1. 今日速览

过去 24 小时内，OpenClaw 仓库保持极高活跃度，但风险信号同样明显：

- **Issues 更新 500 条**：新开/活跃 459 条，关闭 41 条，关闭/新增比例约 1:11，Issue 积压持续扩大。
- **PR 更新 500 条**：待合并 381 条，已合并/关闭 119 条，合并率约 23.8%，PR 审阅队列拥挤。
- **新版本发布：0 个**。项目仍处于 2026.7.x 迭代窗口，暂无新 stable/beta 推送。
- 核心维护者（@steipete、@joshavant 等）当天密集提交了 UI、CI、架构收敛类 PR（#120325、#120348、#120362、#120365、#120368、#120370），说明团队当前重点在**工程质量与内部一致性**。
- **项目健康度判断：活跃但承压**。大量 P0/P1 级数据丢失、数据库损坏、迁移失败、消息静默丢弃问题仍开放，且多个关键问题已滞留数周甚至数月；自动化修复（clawsweeper[bot]）已开始承担一部分补丁生成工作，但维护者审阅仍是明显瓶颈。

链接：[Issues](https://github.com/openclaw/openclaw/issues) ｜ [Pull Requests](https://github.com/openclaw/openclaw/pulls)

## 2. 版本发布

过去 24 小时内无新 Release，本节省略。

## 3. 项目进展

过去 24 小时共有 **119 条 PR 合并/关闭**。尽管高评论 PR 样本中大部分仍在待合并队列，但可见的推进方向非常清晰：

**已合并/关闭的显著条目**

- **#111528 fix(agents): prevent false mid-turn overflow recovery**（[链接](https://github.com/openclaw/openclaw/pull/111528)）
  修复了工具结果密集轮次中优化型 mid-turn precheck 误判溢出、导致工具结果被截断的回归，状态已关闭，对应 issue #101929。

**与 Issue 强关联、进入合并通道的 PR**

- **#120332 fix(config): config validate rejects replacement plugin's own channel config keys**（[链接](https://github.com/openclaw/openclaw/pull/120332)，AI 生成）
  修复替换插件（`preferOver`）自有 channel config 被 `config validate` 拒绝的问题，目标关闭 #92884。注意：该 issue 在快照中已标记 CLOSED，但 PR 仍为 OPEN，最终闭环状态需维护者确认。

- **#119516 fix(update): recover the managed gateway after a failed CLI update**（[链接](https://github.com/openclaw/openclaw/pull/119516)）
  解决 `openclaw update` 中途失败后托管网关无法自动重启恢复的问题。

- **#120366 fix(codex): keep configured apps available in scheduled turns**（[链接](https://github.com/openclaw/openclaw/pull/120366)）
  修复 Codex 用户在 scheduled/cron 轮次中无法使用已配置 MCP apps 的问题，关闭 #113475。

- **#119520 fix(cron): remove deleted job sessions**（[链接](https://github.com/openclaw/openclaw/pull/119520)）
  关闭 #46369：删除 cron 任务后，其可复用 base session 也会被清理，避免会话管理界面残留陈腐项。

- **#119119 fix(talk): persist fractional transcript timestamps**（[链接](https://github.com/openclaw/openclaw/pull/119119)）
  关闭 #119079：修复 iOS Talk 场景下小数毫秒时间戳导致 transcript 无法持久化的问题。

- **#119717 fix(telegram): prioritize configured commands in capped menus**（[链接](https://github.com/openclaw/openclaw/pull/119717)，clawsweeper 自动修复）
  修复 Telegram 菜单因条数/载荷上限截断时，自定义命令被原生命令挤出菜单的问题。

- **#119778 fix(gateway): return retryable chat send error during transcript rebuild**（[链接](https://github.com/openclaw/openclaw/pull/119778)，clawsweeper 自动修复）
  将 transcript 重建期间的内部错误从 `INVALID_REQUEST` 转为可重试错误，避免前端生命周期误判。

- **#120368 fix(deps): update nanoid past denial-of-service advisory**（[链接](https://github.com/openclaw/openclaw/pull/120368)）
  升级 `nanoid` 以规避 HIGH 级安全通告 GHSA-2v37-7h3g-55p8，解除 CI 与 exact-head 部署阻塞。

**架构与工程投入**

- **#120325 refactor: restore canonical execution identity architecture**（[链接](https://github.com/openclaw/openclaw/pull/120325)，XL 级，@joshavant）
  修复 5 个堆叠 PR 引入的第二套非规范执行身份系统，使其回归 F0 identity 契约；同时修复 activity projector 从可变 session 拓扑推断 principal 的问题。当前状态为 "waiting on author"。
- **#120348 refactor(ui): derive gateway types from protocol and consolidate navigation/error helpers**（[链接](https://github.com/openclaw/openclaw/pull/120348)）
  消除 Control UI 与 Gateway 协议类型之间的手工镜像漂移（presence 字段、时间戳可选性等已不一致），统一导航与错误处理。
- **#120362 test(qa): cover session and Workboard managed-worktree lifecycles**（[链接](https://github.com/openclaw/openclaw/pull/120362)）
  在 #120335 基础上补充 session-owned 与 Workboard-owned worktree 清理生命周期测试，并修复 symlinked state-dir 下进程锁失效问题。

这些合并/推进表明：项目当前重点在于**修复数据完整性、收敛架构、补齐测试验证**。但这与 381 条待合并 PR 形成鲜明对比——大量修复已生成，却卡在审阅环节。

## 4. 社区热点

以下 Issue 在过去 24 小时讨论最集中、评论数最高，反映了用户最强烈的诉求：

- **#116277 DeepSeek v4 Flash silent reply failure**（[链接](https://github.com/openclaw/openclaw/issues/116277)，评论 **125 条**，状态 CLOSED）
  尽管已经关闭，仍是绝对热度中心。用户报告 DeepSeek v4 Flash 在 Telegram 群聊中静默失败，只输出 "No reply was generated" 的 fallback。该 issue 同时带 `impact:message-loss`、`impact:ux-friction` 和 `linked-pr-open`。**125 条评论说明"静默失败"是对用户信任伤害最大的问题之一**，模型层失败时的兜底机制需要被提升到产品级优先级。

- **#101290 CLI startup preflight can corrupt the live state DB**（[链接](https://github.com/openclaw/openclaw/issues/101290)，P0，评论 14 条）
  2026-07-07 创建后持续获得关注。macOS 用户遭遇 `openclaw.sqlite` 四次损坏（"database disk image is malformed"），且 vanilla SQLite 无法复现。深层焦虑是：**官方 CLI 工具可能在 gateway 运行时并发破坏会话数据库**——对个人 AI 助手项目而言，这是最致命的信任危机类型。

- **#85030 MCP tools not injected into subagent sessions**（[链接](https://github.com/openclaw/openclaw/issues/85030)，P1，评论 10 条，👍 6）
  即便配置了 `bundle-mcp` + per-tool 白名单 + per-agent allowlist，`sessions_spawn` 子代理仍然收不到任何 MCP 工具。**这说明多代理架构下的 MCP 工具传递链存在结构性缺陷**，而非简单配置问题。

- **#118785 QA: primary proof for containers and external app SDK**（[链接](https://github.com/openclaw/openclaw/issues/118785)，评论 9 条）
  维护者 @vincentkoc 发起的 QA 追踪：要求为 23 个容器 ID + 31 个外部 App SDK ID 提供主要验证证据。反映项目在快速扩张官方支持矩阵的同时，**验证覆盖尚未跟上**。

用户诉求共性：一是"功能必须真的可用"（MCP 透传、多模型、多渠道）；二是"数据/消息绝对不能静默丢失"。一旦出现静默失败，社区情绪会迅速放大。

## 5. Bug 与稳定性

以下按严重程度排列过去 24 小时出现的重点问题：

### P0 — 数据损坏 / 启动阻断 / 发布阻断

- **#119263 Agent DB v14→v15 migration fails: 'no such column: entry_valid'**（[链接](https://github.com/openclaw/openclaw/issues/119263)）
  升级到 2026.7.2 后，`openclaw doctor --fix` 无法完成 v14→v15/v16 迁移，整个事务回滚，网关拒绝启动。当前未见 `linked-pr-open`，是硬性的升级阻断。

- **#118772 sessionEntry.totalTokens inflation causes premature compaction at 4–8% of context window**（[链接](https://github.com/openclaw/openclaw/issues/118772)）
  2026.7.1 起 `totalTokens` 被多工具循环的累计 usage 污染，导致压缩在上下文实际占用仅 4–8% 时触发，造成真实数据丢失。带 `linked-pr-open`，修复 PR 在途。

- **#101290 CLI startup preflight can corrupt the live state DB**（[链接](https://github.com/openclaw/openclaw/issues/101290)）
  长期 P0（maturity: stable），macOS + 2026.6.6 可复现，影响会话数据安全。当前无新修复 PR 信号。

- **#108520 iOS app update breaks Talk Mode and chat**（[链接](https://github.com/openclaw/openclaw/issues/108520)，紧急）
  iOS 应用自动更新后，gateway 显示已连接但所有功能不可用，等待 live-repro 与产品决策。

### P1 — 消息/回复静默丢失

- **#116277** DeepSeek v4 Flash 静默失败（已关闭，有修复 PR 在途）
- **#86012** LINE 频道 reply token 过期 + 无 push fallback，消息静默丢失（[链接](https://github.com/openclaw/openclaw/issues/86012)，被 `clawsweeper-recovery-stuck` 标记）
- **#117445** Feishu 入站 DM 被解码为 "?"，永不回复（[链接](https://github.com/openclaw/openclaw/issues/117445)，linked PR 存在）
- **#96827** `message_tool_only` 模式下 agent 交付后不终止，产生级联自回复（[链接](https://github.com/openclaw/openclaw/issues/96827)）
- **#111778** Mattermost 非 terminal 工具警告把真正的回复 gate 掉（[链接](https://github.com/openclaw/openclaw/issues/111778)，Discord/Slack/Telegram 均无此事）

共性问题：**渠道层失败既无显式报错也无 fallback 推送**，对用户体验伤害极大。

### P1 — 会话/上下文管理回归

- **#86684** `sessions_yield` 子代理唤醒在低上下文占用时压缩父分支（[链接](https://github.com/openclaw/openclaw/issues/86684)，linked PR 存在）
- **#118185** 同一 claude-cli 轮次被两个 writer 写入 transcript 两次，内容不一致（[链接](https://github.com/openclaw/openclaw/issues/118185)）
- **#118018** 过期子代理完成结果投递给被替换的 requester lifecycle（[链接](https://github.com/openclaw/openclaw/issues/118018)）
- **#117358** 轮次后压缩忽略既有压缩/重置边界，延迟已完成的回复（[链接](https://github.com/openclaw/openclaw/issues/117358)）
- **#53408** 长对话后 `write`/`exec` 工具参数被静默丢弃（[链接](https://github.com/openclaw/openclaw/issues/53408)，自 2026-03-24 开放）

会话/上下文管理是 2026.6/2026.7 版本中最集中的回归域，多个问题已带 linked PR，但尚未完全闭环。

### P1 — 性能与资源泄漏

- **#119087** Gateway 冷启动从 2026.7.1 到 2026.7.2 退化约 2.5 倍，1-vCPU 容器尤甚（[链接](https://github.com/openclaw/openclaw/issues/119087)）
- **#97616** hook/tool 子进程未被收割，zombie 累积导致运行时退化（[链接](https://github.com/openclaw/openclaw/issues/97616)）
- **#74378** Windows 上 CLI 命令执行后残留 node.exe 进程（[链接](https://github.com/openclaw/openclaw/issues/74378)）

## 6. 功能请求与路线图信号

**多代理与扩展能力**

- **#85030 MCP tools not injected into subagent sessions**（[链接](https://github.com/openclaw/openclaw/issues/85030)）
  虽为 bug 报告，但社区 6 👍 + 10 条评论显示其作为"多代理 MCP 能力基线"的路线图优先级极高。
- **#95724 Index memory by source directory, not by agent**（[链接](https://github.com/openclaw/openclaw/issues/95724)）
  多个 agent 共享同一 workspace 时构建重复 vector store，浪费资源且索引易不一致。这是多代理架构的重要优化方向。
- **#81061 Hook: before_route_inbound_message**（[链接](https://github.com/openclaw/openclaw/issues/81061)，3 👍）
  在路由决策之前提供 pre-routing 拦截 hook，以支持 channel bridging/proxying 等场景。当前 hook 体系无法满足此类需求。

**渠道与接入方式**

- **#87325 Support Azure Foundry GPT Realtime Talk via gateway relay**（[链接](https://github.com/openclaw/openclaw/issues/87325)）
  Azure/Foundry 用户仍无法使用 GPT Realtime Talk，目前仅有诊断能力。
- **#17840 Opt-in reaction-triggered agent turns**（[链接](https://github.com/openclaw/openclaw/issues/17840)）
  表情回应触发 agent 轮次，支持 emoji 投票、轻量交互等场景。

**会话体验与效率**

- **#99583 Intelligent Session Auto-Titling**（[链接](https://github.com/openclaw/openclaw/issues/99583)，2 👍）
  基于已有 `llm-slug-generator` 做懒加载、低成本自动标题，并支持话题漂移后重命名。
- **#95516 Skill lifecycle management**（[链接](https://github.com/openclaw/openclaw/issues/95516)，2 👍）
  技能失败自动优化 + 使用率低自动归档。
- **#110171 Voice chat should behave identically to text chat — context parity**（[链接](https://github.com/openclaw/openclaw/issues/110171)，已关闭）
  Talk 模式需要获得与文本聊天相同的长期记忆/会话上下文，该事项已关闭，可能已纳入处理。

**可访问性**

- **#95601 VoiceOver-friendly chat history**（[链接](https://github.com/openclaw/openclaw/issues/95601)，2 👍）
  用户明确认可 v2026.6.9 将 usage 信息移到 model selector 附近的无障碍改进，并继续要求历史聊天记录支持 VoiceOver。

从 PR 通道看，**#120366（Codex scheduled turns 支持 MCP apps）** 与 **#119342（system-agent QR 设置步骤）** 是下一版本较确定的功能增量；**#120325 执行身份架构收敛**若合并，将显著降低 session 状态类 bug 的复发概率。

## 7. 用户反馈摘要

**真实痛点**

1. **静默失败是信任杀手。** DeepSeek、LINE、Feishu、Mattermost 场景下，用户反复遭遇"无报错、无回复、消息消失"。开发者普遍表示：宁可看到显式 error，也不愿收到 "No reply was generated" 这类无信息量 fallback。
2. **升级有"赌性"。** #119263（v14→v15 迁移失败）、#94939（conversation-store 迁移后留下 0 字节文件）等案例使部分用户对 minor 版本升级产生畏惧，担心会话/数据库不可恢复。
3. **低资源/本地部署被边缘化。** #119087（1-vCPU 冷启动 2.5x 退化）、#119401（小模型无法强制可见回复）反映出重量级代码路径正在挤压个人用户的小规模部署场景。
4. **配置验证"过度执法"。** #92884 的关闭与 #120332 的提出说明 `config validate` 曾错误拒绝合法插件配置，增加运维困惑。

**正面信号**

1. **v2026.6.9 无障碍改进获点名表扬**（#95601），方向正确。
2. **自动修复管线开始产生实际价值。** #119717、#119778 均为 clawsweeper[bot] 生成的修复 PR，说明项目已具备"自动分类 → 自动补丁 → 维护者确认"的工程闭环。
3. **架构收敛意愿强。** #120325 这类大型重构 PR 的提交，说明团队有意愿在功能推进的同时解决技术债。

## 8. 待处理积压

**长期未解决的高危 Issue（按开放时长排序）**

- **#30381** chatCompletions 应在存在 `x-openclaw-agent-id` 时忽略请求 model 字段（[链接](https://github.com/openclaw/openclaw/issues/30381)，2026-03-01 开放，P2，已 5 个月）
- **#53408** 长对话后 `write`/`exec` 参数静默丢失（[链接](https://github.com/openclaw/openclaw/issues/53408)，2026-03-24 开放，P1）
- **#74378** Windows CLI 命令残留 node.exe 进程（[链接](https://github.com/openclaw/openclaw/issues/74378)，2026-04-29 开放，P2）
- **#75380** `provider-payload.jsonl` 与 `cache-trace.jsonl` 无上限增长（[链接](https://github.com/openclaw/openclaw/issues/75380)，2026-05-01 开放，P1）
- **#84662** Codex app-server 在原生用户历史中存储每次运行上下文（[链接](https://github.com/openclaw/openclaw/issues/84662)，2026-05-20 开放，P1，`clawsweeper-recovery-stuck`）
- **#85030** MCP 工具无法注入子代理会话（[链接](https://github.com/openclaw/openclaw/issues/85030)，2026-05-21 开放，P1）
- **#86012** LINE 消息因 reply token 过期静默丢失（[链接](https://github.com/openclaw/openclaw/issues/86012)，2026-05-24 开放，P1，`clawsweeper-recovery-stuck`）
- **#86684** `sessions_yield` 子代理唤醒误压缩父分支（[链接](https://github.com/openclaw/openclaw/issues/86684)，2026-05-26 开放，P1）
- **#101290** CLI startup preflight 损坏实时数据库（[链接](https://github.com/openclaw/openclaw/issues/101290)，2026-07-07 开放，P0）

**等待维护者裁决的标签集群**

大量 Issue 同时带有 `clawsweeper:needs-maintainer-review` 与 `clawsweeper:needs-product-decision`，例如：

- **#98435** MCP loopback transport 在网关重启后不自动重连，`recovered=1` 具有误导性（[链接](https://github.com/openclaw/openclaw/issues/98435)）
- **#94919** Z.AI Coding-Plan 的 ECONNRESET fallback 在异步上下文中对用户不可见（[链接](https://github.com/openclaw/openclaw/issues/94919)）
- **#89228** 隔离 cron 会话中 `exec` 间歇性不可用，2026.4.1 曾修复、现已回归（[链接](https://github.com/openclaw/openclaw/issues/89228)）

这些带有"自动流程已确认可复现/已有修复"标签但迟迟未闭环的 issue，是 381 条待合并 PR 背后"人肉审阅瓶颈"的直接体现。**建议维护者优先处理带 P0/P1 + `linked-pr-open` 标签的条目**，以最快速度压缩数据安全类风险敞口。

---

*报告完。本日报仅基于提供的 GitHub 数据快照生成，所有链接均指向 openclaw/openclaw 仓库实际 Issue/PR。*

---

## 横向生态对比

## 横向对比分析报告：个人 AI 助手开源生态（2026-08-08）

### 1. 生态全景

今日六大项目合计处理约 960 条 Issue 与 1135 条 PR 更新，个人 AI 助手/自主智能体赛道仍处于高强度迭代期。生态明显分化为两个层：OpenClaw、hermes-agent 这类头部项目体量庞大，但 PR 审阅积压严重，普遍进入“功能推进快于质量闭环”的承压阶段；QwenPaw、AstrBot 等中等体量项目则以快速响应、高频修复合入换取用户信任。跨项目最集中的用户情绪触发点是**静默失败**——消息丢失、更新后功能消失、校验假成功；同时 MCP/工具调用链路稳定性与数据安全/权限边界正在成为全生态的共同瓶颈。

### 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | 待合并 PR | 合并/关闭 PR | Release | 健康度评估 |
|---|---|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃 459，关闭 41） | 500 | 381 | 119 | 无 | 活跃但承压：P0/P1 数据安全积压多，审阅瓶颈明显 |
| **hermes-agent** | 364（新开/活跃 313，关闭 51） | 500 | 345 | 155 | 无 | 极活跃：架构重构与 bug 修复并行，积压同样严重 |
| **Zeroclaw** | 50（活跃 45，关闭 5） | 50 | 47 | 3 | 无 | 活跃：功能开发与安全加固并行，修复 PR 排队 |
| **QwenPaw** | 30（新开/活跃 19，关闭 11） | 49 | 27 | 22 | v2.1.0-beta.2 | 健康：迭代节奏好，社区反馈响应及时 |
| **AstrBot** | 12（新开/活跃 9，关闭 3） | 22 | 8 | 14 | 无 | 高活跃：快节奏修复合入，整体状态较健康 |
| **PicoClaw** | 4（均被标记 stale） | 14（Dependabot 为主，3 个功能 PR） | 12 | 2 | 无 | 中等：稳定依赖迭代，社区贡献持续但量小 |

### 3. OpenClaw 在生态中的定位

**OpenClaw 是当前生态中功能覆盖最全、社区体量最大的“核心参照”项目。** 其 Issue/PR 双 500 的日更新量远超其他项目，且拥有强大的维护者投入（@steipete、@joshavant 等高密度提交）和自动化修复管线（clawsweeper[bot] 已能生成有效补丁）。

- **优势**：在多渠道、多模型、多代理的完整功能面上积累最深；架构治理意愿强，近期 PR 集中在执行身份架构收敛、协议类型派生、配置验证等底层正确性问题上。
- **技术路线差异**：当前重心不是新增功能，而是**工程质量与数据完整性**。这与 Zeroclaw 的“安全边界加固”、PicoClaw 的“极致轻量”、QwenPaw 的“中文用户与插件生态”形成明显区别。
- **社区规模对比**：与 hermes-agent 同处第一梯队，但 OpenClaw 在 issue 讨论深度上更突出（单条 issue 曾达 125 评论），用户对数据安全和消息可靠性有极高敏感度。其 381 条待合并 PR 也从侧面说明：社区贡献量大，但维护者审阅带宽已成为生态最大瓶颈。

### 4. 共同关注的技术方向

- **“静默失败”是跨项目信任杀手**  
  涉及：OpenClaw（DeepSeek 静默无回复、LINE/Feishu 消息丢失）、hermes-agent（update 显示成功但 extras 消失）、Zeroclaw（SOP 畸形文件被静默丢弃、健康检查假阳性）、AstrBot（QQ 长消息被截断无提示）。  
  诉求：所有失败都必须显式、可诊断、可重试，不能假装成功。

- **MCP/工具调用链路普遍不稳定**  
  涉及：OpenClaw（MCP 工具无法注入子代理）、QwenPaw（MCP 工具周期性失效）、PicoClaw（MCP OAuth 2.1 支持）、AstrBot（tool_call.index 非标准导致整体崩溃）、Zeroclaw（模型输出伪工具语法、流式请求丢配置）。  
  诉求：工具互操作层需要更强的标准化、兼容性和可观测性。

- **数据安全与权限边界成为硬需求**  
  涉及：OpenClaw（CLI preflight 损坏数据库、DB 迁移失败）、Zeroclaw（forbidden_paths 绕过、API key 泄漏、shell 逃逸）、QwenPaw（26GB 临时文件泄漏）、hermes-agent（上下文压缩后非幂等重放风险）。  
  诉求：默认安全、最小权限、路径与密钥边界必须可验证。

- **多代理/子代理的上下文隔离仍缺架构级支撑**  
  涉及：OpenClaw（sessions_yield 误压缩父分支、子代理拿不到 MCP）、hermes-agent（委托子上下文泄漏）、QwenPaw（新任务导致 ACL 重置）、Zeroclaw（SOP 调度卡死）、AstrBot（子代理委托被工具解析 bug 击穿）。  
  诉求：子代理生命周期、上下文边界、权限继承需要跨项目共同沉淀最佳实践。

### 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构/关键差异 |
|---|---|---|---|
| **OpenClaw** | 全功能个人 AI 助手平台：多渠道、多模型、多代理 | 极客、重度自动化用户、自托管玩家 | 功能最全、社区最大；当前重点在架构收敛与数据完整性 |
| **hermes-agent** | 高密度开发者框架：桌面端 + CLI + gateway，平台 parity | 开发者、团队用户 | 迭代速度极快；repo 级 god-file 分片、plugin 接口扩展 |
| **Zeroclaw** | 安全优先的自动化 agent：SOP、工作流、可观测性 | 安全敏感用户、运营自动化 | Rust 生态特征明显；追求零 unsafe、OTel 标准化、工具面收敛 |
| **QwenPaw** | 中文友好、应用型 AI 助手：桌面端、插件、记忆 | 中文个人/企业用户 | 与 AgentScope 生态绑定深；Windows 桌面和 IM 渠道体验优先 |
| **AstrBot** | 轻量易用的 IM 机器人框架 | 中文社区、非专业用户 | Python + 插件市场 + WebUI 知识库；围绕 QQ/Telegram 等 IM 平台 |
| **PicoClaw** | 超轻量低资源 agent | 嵌入式/边缘/低配硬件用户 | Go 实现，目标 <10MB RAM、秒级启动；社区贡献聚焦成本优化与稳定性 |

### 6. 社区热度与成熟度

- **第一梯队：超大规模，快速迭代与质量承压并存**  
  OpenClaw、hermes-agent 日更新量均达 500 PR 量级，但合并/关闭占比分别约 23.8% 和 31%，审阅积压严重。二者都已进入**架构重构/质量巩固**阶段，但“产出速度-审阅带宽”矛盾突出。

- **第二梯队：中高活跃，成长期**  
  Zeroclaw、QwenPaw 日更新约 50 条。QwenPaw 已进入 beta 版本节奏，社区反馈闭环较好；Zeroclaw 处于功能密集开发与安全加固并行期，修复 PR 排队说明维护资源仍在追赶。

- **第三梯队：中等活跃，稳定/维护期**  
  AstrBot 虽然体量小，但合并率高（14/22），响应迅速，状态健康；PicoClaw 以 Dependabot 自动化依赖维护为主，社区功能贡献是亮点但仍未形成主力，整体处于稳定维护、缓慢演进状态。

### 7. 值得关注的趋势信号

1. **“显式失败”将取代“尽力而为”成为产品底线**：多个项目最大的信任危机都源于静默失败或假成功。AI agent 需要在失败时给出可诊断、可重试、可审计的反馈，而不是一句无信息量的 fallback。

2. **安全左移与最小权限从加分项变为必需项**：API key 泄漏、路径策略绕过、临时文件泄漏、更新后依赖消失，说明个人 AI 助手的默认安全、更新原子性和数据完整性若做不到，用户会直接流失。

3. **MCP/工具调用标准化仍是最大基建缺口**：子代理拿不到工具、provider 返回非标字段、模型输出伪语法等多重问题并存，工具层兼容性测试和协议适配将是长期投入方向。

4. **配置与迁移的稳定性决定升级信任**：DB 迁移失败、config validate 误杀合法配置、更新后功能静默消失已多次出现。项目需要为 minor 升级提供可回滚、可验证的迁移路径。

5. **成本透明与可观测性需求快速上升**：OTel 会话关联、Anthropic 成本计为 $0.00、prefix caching 优化、冷启动性能退化等议题，显示社区要求模型调用既“看得见”也“算得清”。

6. **开源维护自动化进入新阶段，但人工审阅成为新瓶颈**：clawsweeper 自动生成补丁、Dependabot 批量升级、stale bot 自动关闭已成为常态；随之而来的问题是如何在高吞吐自动化与有限维护者带宽之间建立分级处理机制。

7. **本地/边缘部署与云端大模型形成长期张力**：PicoClaw 的“低资源运行”目标、OpenClaw 在 1-vCPU 上的 2.5x 冷启动退化、Zeroclaw 在 Raspberry Pi 上的工具调用兼容性问题，共同指向一个清晰需求：AI agent 必须同时适配轻量硬件与主流云端模型。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-08

## 1. 今日速览

过去 24 小时项目保持高强度迭代：共 50 条 Issue 更新（45 条活跃/新开，5 条关闭）与 50 条 PR 更新（47 条待合并，3 条已合并/关闭），无新版本发布。社区讨论集中在可观测性标准（OTel 会话关联）、配置架构统一（ZeroCode 迁移、统一 Catalog 契约）与安全边界（forbidden_paths 绕过、shell 逃逸）三大方向，均有对应 RFC 或修复 PR 在推进中。今日新开多个 P1 级 Bug（Anthropic 成本核算失效、SOP 执行卡死、forbidden_paths 不可达等），但对应的修复 PR 多数尚在排队，需要维护者优先关注。整体来看，项目处于功能密集开发与安全加固并行的活跃阶段。

---

## 2. 版本发布

无。

---

## 3. 项目进展

今日 5 个 Issue 关闭，其中两项 RFC 获接受，一项高危安全 Bug 确认修复：

| 项目 | 状态 | 说明 |
|------|------|------|
| [#8933 OTel 跨轮次会话关联 RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/8933) | ✅ 关闭 | 接受方案：通过 opaque conversation ID 携带跨轮次关联，导出为 `gen_ai.conversation.id`（OTel Semantic Conventions v1.41.0），提升可观测性标准符合度 |
| [#9246 ZeroCode 迁移保留 Todo tracker 配置 RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/9246) | ✅ 关闭 | 接受方案：配置所有权迁移期间保留 TodoWrite 显示配置，配合 [#9013 PR](https://github.com/zeroclaw-labs/zeroclaw/pull/9013)（移动至 zerocode 侧）落地 |
| [#9386 Gemini API key 经 URL 泄漏](https://github.com/zeroclaw-labs/zeroclaw/issues/9386) | ✅ 关闭 | 高危安全漏洞修复完成，`sanitize_api_error` 现在清除查询参数中的密钥再输出 |
| [#6055 Slack 线程上下文回填](https://github.com/zeroclaw-labs/zeroclaw/issues/6055) | ✅ 关闭 | 首次提及 bot 时通过 `conversations.replies` 回填线程历史，增强 Slack 使用体验 |
| [#7232 结构化可观测性增强 RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/7232) | ✅ 关闭 | OTel 追踪关联与 Bridge 重构方案收尾，与 #8933 递进落地 |

当前 47 个 PR 等待合并中，其中 [@JordanTheJet](https://github.com/zeroclaw-labs/zeroclaw/issues/9826) 今日连续提交 7 个 PR，形成一组清晰的攻坚方向：

- **安全加固**：[#9826 CLI 拒绝在 agent shell 环境下运行](https://github.com/zeroclaw-labs/zeroclaw/pull/9826)、[#9827 修补 shell 子进程逃逸（sandbox 工作目录、权限降级等 3 项）](https://github.com/zeroclaw-labs/zeroclaw/pull/9827)、[#9828 agent 配置写入需 operator 审批](https://github.com/zeroclaw-labs/zeroclaw/pull/9828)
- **Web 工具集重构**：[#9829 web_fetch 大响应落盘](https://github.com/zeroclaw-labs/zeroclaw/pull/9829)、[#9830 浏览器自动化改为显式 opt-in](https://github.com/zeroclaw-labs/zeroclaw/pull/9830)、[#9831 搜索结果内容上限与解析器硬化](https://github.com/zeroclaw-labs/zeroclaw/pull/9831)、[#9833 新增 web_research 子代理](https://github.com/zeroclaw-labs/zeroclaw/pull/9833)

这组 PR 将默认工具面从五个重叠的 web 工具收敛为三个清晰动词（`web_fetch`/`web_research`/`http_request`），同时强化 shell 与 CLI 权限边界，整体向"默认安全 + 最小工具面"方向迈出一大步。

---

## 4. 社区热点

今日讨论最活跃的 Issue：

| Issue | 评论数 | 状态 | 核心诉求 |
|-------|--------|------|----------|
| [#8933 OTel 跨轮次会话关联](https://github.com/zeroclaw-labs/zeroclaw/issues/8933) | 13 | ✅ 已关闭 | 可观测性需要跨 turn 的会话视角，团队对 attribute 命名与实现方案有充分讨论后达成共识 |
| [#9246 ZeroCode 迁移保留 Todo tracker 配置](https://github.com/zeroclaw-labs/zeroclaw/issues/9246) | 12 | ✅ 已关闭 | 配置所有权迁移时避免破坏用户已有显示配置，涉及多轮评审与修订 |
| [#5937 providers 架构统一重构](https://github.com/zeroclaw-labs/zeroclaw/issues/5937) | 12 | 🟡 开放中 | 社区持续要求消除 provider 模块的 reqwest 重复代码与模型构造参数碎片化，是长期技术债 |
| [#8424 workspace 内禁止路径 + .zeroclawignore](https://github.com/zeroclaw-labs/zeroclaw/issues/8424) | 10 | 🟡 等待作者行动 | 用户需要保护 `.env`、`config.yaml` 等 workspace 内部敏感文件不被 agent 访问，是明确的安全需求 |
| [#8043 淘汰 aardvark-sys 独立 crate](https://github.com/zeroclaw-labs/zeroclaw/issues/8043) | 9 | 🟡 等待作者行动 | 架构简化提议：将硬件抽象层并入 zeroclaw-hardware，减少 crate 边界维护成本 |

**诉求分析**：社区当前最关心三件事——① 可观测性标准化要跟上 OpenTelemetry 生态演进；② 配置体系复杂化（ZeroCode、TodoWrite、Catalog、forbidden_paths）需要统一治理；③ 技术债清理（providers 架构、aardvark-sys 折叠）被反复提及，说明项目成长速度已让社区感到架构维护压力。

---

## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列：

### 🔴 P1 — 高危

| Issue | 描述 | Fix PR |
|-------|------|--------|
| [#9815 forbidden_paths 被 allowed_roots 绕过](https://github.com/zeroclaw-labs/zeroclaw/issues/9815) | `forbidden_paths` 对 allowed_roots/workspace 内路径完全失效，安全策略形同虚设 | ❌ 无 |
| [#9816 Anthropic 成本恒为 $0.00，预算上限永不触发](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) | 所有 usage 记录 `cost_usd: 0.0`，`zeroclaw status` 显示 $0.0000，日/月预算保护完全失效 | ❌ 无 |
| [#9805 SOP auto 模式从 channel/cron 触发后永挂 running](https://github.com/zeroclaw-labs/zeroclaw/issues/9805) | headless 调度无 agent loop，第一步 ExecuteStep 永远不执行；占 concurrency slot 且 survive daemon reload，可能导致调度雪崩 | ❌ 无 |
| [#9786 畸形 SOP.toml 被静默丢弃](https://github.com/zeroclaw-labs/zeroclaw/issues/9786) | `sop list` 省略、`sop validate` 报成功、`sop validate <name>` 报 not found——与文件不存在完全无法区分，诊断困难 | ❌ 无 |
| [#9811 Telegram 频道从未连接却报告健康](https://github.com/zeroclaw-labs/zeroclaw/issues/9811) | bot token 无效时 404 持续 19 小时，`/health` 仍显示 healthy，监控失去意义 | ❌ 无 |
| [#9770 cron update 静默丢弃 declarative job 变更](https://github.com/zeroclaw-labs/zeroclaw/issues/9770) | 6 个字段（command/name/expression 等）的修改被无声吞掉，用户无法感知 | ❌ 无 |
| [#9775 OpenRouter 流式请求丢失 provider_extra](https://github.com/zeroclaw-labs/zeroclaw/issues/9775) | `stream_chat` 未调用 `merge_extra_body`，所有自定义 body 配置在流式模式下失效 | 🟡 in-progress（无 PR） |
| [#9656 Telegram typing 指示器在审批等待期间持续运行](https://github.com/zeroclaw-labs/zeroclaw/issues/9656) | 被阻塞的 turn 看起来像在工作中，误导用户等待 | ✅ [#9823](https://github.com/zeroclaw-labs/zeroclaw/pull/9823) 已提交 |
| [#9386 Gemini API key 泄漏（今日关闭）](https://github.com/zeroclaw-labs/zeroclaw/issues/9386) | 密钥随 URL 传入错误信息并发送到聊天中，已被修复 | ✅ 已合并 |

### 🟡 P2 — 中等

| Issue | 描述 | Fix PR |
|-------|------|--------|
| [#9783 SOP finish_run 丢弃失败原因](https://github.com/zeroclaw-labs/zeroclaw/issues/9783) | 接受 `reason: Option<String>` 却从不使用，失败 SOP 记录不到原因 | ❌ 无 |
| [#9784 多步 SOP 运行中途失败无审计事件](https://github.com/zeroclaw-labs/zeroclaw/issues/9784) | agent 驱动时 SOP 被标记 failed，但无任何 audit event，agent 下游调用才发现 | ❌ 无 |
| [#9708 daemon 服务日志无界增长](https://github.com/zeroclaw-labs/zeroclaw/issues/9708) | 桌面 daemon stdout/stderr 重定向到固定文件，无 size/age/file-count 限制 | 🟡 in-progress |
| [#9825 熵启发式误伤公链地址，支付 URL 不可用](https://github.com/zeroclaw-labs/zeroclaw/issues/9825) | leak detector 将公开区块链地址判定为高熵泄漏并打码 | ❌ 无 |
| [#9832 zeroclaw-hardware --features hardware 编译失败](https://github.com/zeroclaw-labs/zeroclaw/issues/9832) | `unresolved import aardvark_sys::AardvarkHandle`，aarch64 Linux（Raspberry Pi）构建阻断 | ❌ 无 |
| [#9821 cron 工具 agent 从不调用](https://github.com/zeroclaw-labs/zeroclaw/issues/9821) | agent 总是 fallback 到 shell `crontab`（被 policy 拦截），工具形同虚设（Raspberry Pi + NVIDIA NIM 实测） | ❌ 无 |
| [#9820 calculator 工具：模型输出伪语法](https://github.com/zeroclaw-labs/zeroclaw/issues/9820) | 模型生成字面 `<TOOLCALL>` 伪语法而非真实 function call，`allowed_tools` 配置未生效 | ❌ 无 |

### 🟢 S3 — 轻微

| Issue | 描述 |
|-------|------|
| [#9834 zeroclaw-runtime 测试间歇性失败](https://github.com/zeroclaw-labs/zeroclaw/issues/9834) | 共享进程全局状态（turn_streamed receipts + model_switch）导致 clean master 上 2/6 次运行出现 6 个失败 |

---

## 6. 功能请求与路线图信号

### 新需求（今日提出）

| Issue | 方向 | 路线图判断 |
|-------|------|------------|
| [#9810 Agent Plugins 1.0 标准支持](https://github.com/zeroclaw-labs/zeroclaw/issues/9810) | 加载社区 `plugin.json + skills/ + mcp.json` 插件包 | ⭐ 高潜力：与 #9346 统一 Catalog、#8908/#8909 包管理形成完整插件生态闭环，且是 vendor-neutral 行业标准，大概率进入下个版本规划 |
| [#9824 简化默认 web 工具面](https://github.com/zeroclaw-labs/zeroclaw/issues/9824) | 五个重叠工具收敛为三个动词 + 子代理封装 research + 浏览器自动化 opt-in | ✅ 已被 [#9829/#9830/#9831/#9833](https://github.com/zeroclaw-labs/zeroclaw/pull/9833) 系列 PR 落地，预计近期合入 |

### 进行中的路线图信号

- **统一 Catalog 契约**（[#9346](https://github.com/zeroclaw-labs/zeroclaw/issues/9346)）：跨 integrations/built-ins/plugins 的产品级目录，配合 Agent Plugins 标准是清晰演进路径
- **Hindsight 记忆后端**（[#9063 PR，stack 1/7](https://github.com/zeroclaw-labs/zeroclaw/pull/9063)）：七层栈的首个 PR 已等待近一个月，合并后将打开长期记忆后端选型空间
- **零 unsafe 代码**（[#7130](https://github.com/zeroclaw-labs/zeroclaw/issues/7130)）：workspace 级 `forbid(unsafe_code)` 讨论进行中，配合 #8043（aardvark-sys 折叠）将收敛安全面
- **Matrix 单消息进度草稿**（[#8443 PR](https://github.com/zeroclaw-labs/zeroclaw/pull/8443)）：跨 9 个 channel 的流式进度统一机制

---

## 7. 用户反馈摘要

从今日 Issue 评论中提炼的真实反馈：

**😡 SOP 功能是重灾区**（[@JordanTheJet](https://github.com/zeroclaw-labs/zeroclaw/issues/9805) 连报 4 个）：auto 模式永久卡死、失败原因丢失、畸形文件静默吞掉、多步执行失败无审计。用户核心诉求是"要么给出明确诊断，要么不要假装成功"——尤其是 `sop validate` 对畸形文件报成功这一点，严重损害信任。

**🤖 本地模型部署用户面临实际可用性问题**（[@fabricioartur](https://github.com/zeroclaw-labs/zeroclaw/issues/9820)，Raspberry Pi + NVIDIA NIM）：`cron` 工具 agent 从不调用、`calculator` 工具模型输出伪语法、`hardware` 特性编译失败。反映出在非 OpenAI 协议模型（尤其自托管）场景下，工具调用协议兼容性仍是短板。

**💰 成本透明是刚需**（[@bitsbyritik](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)）：Anthropic provider 显示 $0.00 花费，"显示是小事，预算保护失效才是大事"。用户在意的不是数字，而是防失控。

**🔒 安全策略的"形同虚设"最令用户不安**（[@bitsbyritik](https://github.com/zeroclaw-labs/zeroclaw/issues/9815)）：`forbidden_paths` 在 `allowed_roots` 下完全不生效，"读配置时以为有保护，实际完全没保护"。

**📱 频道体验细节被关注**（[@ZiBibro](https://github.com/zeroclaw-labs/zeroclaw/issues/9656)）：Telegram typing 指示器全程闪烁让用户误以为 agent 在思考，实际是在等审批——"一个被阻塞的 turn 看起来像在工作"，体验误导性很强。

**⚡ 泄漏检测需要业务上下文**（[@bitsbyritik](https://github.com/zeroclaw-labs/zeroclaw/issues/9825)）：公链地址被误判为高熵泄漏，导致支付 URL 无法投递。用户理解检测器设计意图，但希望"检测器能知道什么是公开的、什么是私密的"。

---

## 8. 待处理积压

### 长期未响应的关键 Issue

| Issue | 打开时间 | 已等待 | 说明 |
|-------|----------|--------|------|
| [#5937 providers 架构统一重构](https://github.com/zeroclaw-labs/zeroclaw/issues/5937) | 2026-04-20 | 110 天 | 12 条评论的热门架构议题，无 assignee，长期技术债未排期 |
| [#7130 forbid(unsafe_code) workspace-wide](https://github.com/zeroclaw-labs/zeroclaw/issues/7130) | 2026-06-03 | 66 天 | 安全增强提案，已 accepted 但无实施 PR |
| [#8043 折叠 aardvark-sys 到 zeroclaw-hardware](https://github.com/zeroclaw-labs/zeroclaw/issues/8043) | 2026-06-20 | 49 天 | 与 #7130 相关，等待维护者评审 |
| [#8424 workspace 内 forbidden paths + .zeroclawignore](https://github.com/zeroclaw-labs/zeroclaw/issues/8424) | 2026-06-28 | 41 天 | 10 条评论，安全需求明确，等待作者补充 |
| [#6663 Telegram 流式工具调用进度](https://github.com/zeroclaw-labs/zeroclaw/issues/6663) | 2026-05-14 | 86 天 | 已 accepted 的增强，长期无 PR |

### 长期未合并的 PR

| PR | 打开时间 | 已等待 | 阻塞原因 |
|----|----------|--------|----------|
| [#8965 skills 声明式自动激活](https://github.com/zeroclaw-labs/zeroclaw/pull/8965) | 2026-07-11 | 28 天 | Size:XL，stacked on #9563（也待合并），需要先合并 #9563 |
| [#9013 TodoWrite 配置移动至 zerocode](https://github.com/zeroclaw-labs/zeroclaw/pull/9013) | 2026-07-12 | 27 天 | Size:XL，principal contributor，破坏性变更，需要慎重评审 |
| [#9063 Hindsight 记忆后端 stack 1/7](https://github.com/zeroclaw-labs/zeroclaw/pull/9063) | 2026-07-14 | 25 天 | 七层栈的第一块基石，1/7 都不合并会阻塞后续全部记忆工作 |
| [#8443 Matrix 单消息进度草稿](https://github.com/zeroclaw-labs/zeroclaw/pull/8443) | 2026-06-28 | 41 天 | Size:XL，跨 9 个 channel 的公共改动，needs-author-action |
| [#9757 Anthropic 工具图片嵌套块传递](https://github.com/zeroclaw-labs/zeroclaw/pull/9757) | 2026-08-04 | 4 天 | needs-author-action，多模态链路修复，建议尽快跟进 |

### 维护者提醒

今日新提交的 7 个安全/工具重构 PR（[#9826–#9833](https://github.com/zeroclaw-labs/zeroclaw/pull/9833)）质量较高且相互关联，建议作为一组整体评审优先合并；同时 P1 级 Bug 中有 7 个尚无对应修复 PR（尤其是 #9815 安全策略绕过和 #9816 预算失效），需要尽快排期。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-08

## 1. 今日速览

过去24小时内 PicoClaw 仓库共有 18 项 Issue/PR 更新，整体活跃度处于**中等水平**。PR 活动（14条）明显高于 Issue 活动（4条），但绝大多数 PR 为 Dependabot 自动化的依赖升级请求。值得关注的是，社区贡献者今日提交了 3 个功能/修复导向的新 PR（#3319、#3320、#3321），涉及 exec 工具超时修复、WhatsApp 渠道 405 错误修复以及 context 顺序优化以提升 prefix caching 命中率，显示出社区开发活跃且方向务实。Issue 侧 3 条新/活跃条目均被标记为 stale，缺乏高频讨论；项目目前无新版本发布，整体处于**稳步迭代依赖、社区贡献持续涌入**的状态。


## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

**今日合并/关闭 PR：2 个**（均为依赖升级，无功能性变更）

- [PR #3291](https://github.com/sipeed/picoclaw/pull/3291) [CLOSED] build(deps): bump github.com/github/copilot-sdk/go from 0.2.0 to 1.0.8 — Copilot SDK 跨版本升级（0.2.0 → 1.0.8），可能包含破坏性 API 变更，合并后需关注兼容性表现。
- [PR #3289](https://github.com/sipeed/picoclaw/pull/3289) [CLOSED] build(deps): bump github.com/pion/rtp from 1.10.2 to 1.10.5 — WebRTC 底层 RTP 库补丁版本升级。

**新增功能性 PR（今日提交，待合并）**

- [PR #3319](https://github.com/sipeed/picoclaw/pull/3319) fix(tools): honor exec timeout and boolean run options — 修复 exec 工具忽略每次运行的 timeout 参数、schema 中 background/pty 类型声明错误的问题。@MrTreasure
- [PR #3320](https://github.com/sipeed/picoclaw/pull/3320) fix(deps): bump whatsmeow to unblock WhatsApp "client outdated (405)" — 升级 whatsmeow 依赖以恢复 WhatsApp 渠道连接。@grrowl
- [PR #3321](https://github.com/sipeed/picoclaw/pull/3321) fix(agent): move dynamic context after history to preserve prefix caching — 将动态 context 块移至对话历史之后，避免破坏 prefix cache，可显著降低长会话的 token 消耗（尤其对 Anthropic 等按 cache 计价的 provider 有益）。@grrowl

> 整体评价：今日无核心功能合并，项目主体进展有限；但 3 个新提交的修复 PR 分别指向实际使用中的痛点（exec 超时、WhatsApp 断连、prefix cache 优化），对提升用户体验和运营成本优化有直接价值，预计后续审核通过后将改善项目稳定性。


## 4. 社区热点

今日社区互动整体偏低（评论数均为个位数），相对活跃的条目如下：

- **[Issue #3093](https://github.com/sipeed/picoclaw/issues/3093)：请求接入 SimpleX/Wire/Tox 网关（6 条评论，👍1）**
  由 @Damian-o2 于 6 月提出，昨日因 stale 标记关闭。从评论数来看是近期被讨论最多的 Issue，反映了部分用户对**去中心化/隐私优先通信渠道**的明确诉求。由于该 Issue 已标记 stale 并关闭，说明维护者短期内不太可能优先处理此需求。

- **[Issue #3302](https://github.com/sipeed/picoclaw/issues/3302)：为 MCP servers 支持 OAuth 2.1（2 条评论）**
  延续 #2546 的讨论方向，社区希望 MCP server 认证方式跟上行业标准。

- **[PR #3321](https://github.com/sipeed/picoclaw/pull/3321)：动态 context 移位优化 prefix caching（今日提交）**
  虽然评论为 0，但该 PR 技术含量高，触及了 LLM API 成本优化的核心问题（prefix caching 命中率），预计会引发维护者和资深用户的关注。

> 社区诉求洞察：用户对**新渠道接入**（SimpleX/tox/Wire）和**现代认证协议**（OAuth 2.1）有期待，但当前维护重心可能更倾向于修复现有渠道的稳定性和性能优化。


## 5. Bug 与稳定性

按严重程度排序：

| 严重程度 | 描述 | 链接 | 状态 |
|---------|------|------|------|
| 🟠 高 | **SeaHorse、Channel Manager、Hooks 存在并发隐患、goroutine 泄漏和内存/速度可优化点** — 社区成员 @Rehanasharmin 提交了代码审查报告，描述了相关问题 | [#3308](https://github.com/sipeed/picoclaw/issues/3308) | OPEN，无对应 fix PR |
| 🟡 中 | **WhatsApp 渠道持续 405 "client outdated" 错误** — 当前锁定的 whatsmeow 版本被 WhatsApp 服务端拒绝，连接建立约 5 秒后被断开且无重连机制，导致 WhatsApp 渠道"名存实亡" | [#3320](https://github.com/sipeed/picoclaw/pull/3320) | ✅ 已有 fix PR（#3320），待合并 |
| 🟡 中 | **exec 工具的 timeout 参数失效** — 同步执行时总是使用全局超时，忽略每次运行的 timeout 设置；此外 background/pty 在 schema 中声明为字符串类型，与布尔用法不符 | [#3319](https://github.com/sipeed/picoclaw/pull/3319) | ✅ 已有 fix PR（#3319），待合并 |
| 🟢 低 | **工具调用格式泄漏到 LLM summaries** — seahorse 的 partsToReadableContent 路径会导致 tool-call 格式文本出现在用户消息中，混淆模型 | [#3279](https://github.com/sipeed/picoclaw/pull/3279) | ✅ PR #3279 已提交（stale，待维护者关注） |

> 稳定性观察：今日无崩溃级 P0 问题被报告。最需关注的是 #3308 指出的**架构层面的并发设计隐患**（若属实，可能在特定负载下引发 goroutine 泄漏导致内存增长），建议维护者尽快评估。WhatsApp 渠道的问题则属于"渠道持续不可用"的服务降级状态，#3320 的合入应能快速恢复。


## 6. 功能请求与路线图信号

今日出现的新功能/增强请求：

- **[OAuth 2.1 支持（MCP servers）](https://github.com/sipeed/picoclaw/issues/3302)** — 社区希望 MCP server 的认证能力跟上行业标准，与 #2546 同源。考虑到 MCP 是 PicoClaw 的重要集成方向，且 OAuth 2.1 已是行业趋势，此需求**有较大概率被纳入后续版本**。
- **[会话列表/切换命令（Telegram 等聊天渠道）](https://github.com/sipeed/picoclaw/issues/3307)** — Web UI 已有完整的会话管理，但聊天渠道（Telegram 等）无法列表/切换/删除会话，功能不对等明显。若项目持续强化多渠道体验，此请求**有望进入路线图**。
- **[SimpleX/Wire/Tox 网关接入](https://github.com/sipeed/picoclaw/issues/3093)** — 已被 stale 关闭，短期内**纳入可能性较低**。

与功能请求相关的已有 PR：

- **[PR #3270](https://github.com/sipeed/picoclaw/pull/3270)**：新增 DashScope TTS provider 和微信语音消息发送 — 说明项目正在扩展**多模态输出能力**和**中国主流 IM 渠道**的深度集成。
- **[PR #3200](https://github.com/sipeed/picoclaw/pull/3200)**：可配置的默认模型 fallback 链 — 已提交 38 天仍未合并，该功能将增强 Web UI 的模型管理体验。
- **[PR #3271](https://github.com/sipeed/picoclaw/pull/3271)**：9 个 provider 默认模型名更新至 2026-07 最新版本 — 涉及 OpenAI gpt-5.6 系列等，被 stale 标记，需维护者处理。


## 7. 用户反馈摘要

- **对架构长期健康度的关切**：用户在 [#3308](https://github.com/sipeed/picoclaw/issues/3308) 中表达了对项目本身的认可（"building a native Go AI assistant that runs on $10 hardware with <10MB RAM and sub-second boot times is seriously awesome"），但同时以代码审查形式提交了并发/内存方面的隐患报告。说明**开发者社区对项目代码质量有较高期待，愿意投入时间做深度技术评审**。
- **Telegram 用户体验的落差**：用户在 [#3307](https://github.com/sipeed/picoclaw/issues/3307) 中明确描述了 Web UI 与 Telegram 在会话管理能力上的不对称，指出现有用户**在移动端无法完成基本会话操作**，这是"移动端优先/随时随地访问"场景下的明显短板。
- **对新渠道的渴望**：[#3093](https://github.com/sipeed/picoclaw/issues/3093) 的作者明确表达了需要 SimpleX/Wire/Tox 网关，指向用户对**私密通信场景**的诉求。该诉求虽被 stale，但评论数较为活跃，说明并非孤例。


## 8. 待处理积压

以下 Issue/PR 长期未获维护者响应或有重要影响，建议关注：

**高优先级**

- [PR #3200](https://github.com/sipeed/picoclaw/pull/3200)（38 天）：可配置默认模型 fallback 链 — 功能完整且直接影响 Web UI 核心体验，长时间未合并，可能因 review 资源不足或方案分歧而卡住。
- [PR #3270](https://github.com/sipeed/picoclaw/pull/3270)（19 天）：DashScope TTS + 微信语音发送 — 涉及新 provider 和渠道能力扩展，体积较大，建议维护者抽时间 review 或给予反馈。
- [Issue #3308](https://github.com/sipeed/picoclaw/issues/3308)（9 天）：并发隐患/goroutine 泄漏代码审查报告 — 即使报告的部分结论需要验证，也应给予回应和致谢，避免挫伤社区深度贡献的积极性。
- [PR #3279](https://github.com/sipeed/picoclaw/pull/3279)（18 天）：工具调用格式泄漏修复 — 直接关联模型输出质量，且作者明确标注为"same symptom"类 bug 修复，建议优先审核。

**中优先级**

- [Issue #3302](https://github.com/sipeed/picoclaw/issues/3302)（9 天）：MCP OAuth 2.1 支持 — 如路线图尚未考虑，建议维护者明确表态或标记 future-consideration。
- [Issue #3307](https://github.com/sipeed/picoclaw/issues/3307)（9 天）：Telegram 会话管理命令 — 建议与 Web UI 会话功能合并规划。

> 积压观察：项目 PR 积压的主要瓶颈可能在于**维护者 review 带宽有限**，大量 Dependabot PR 被自动标记 stale 后仍未合入/关闭（如 #3306、#3305、#3304、#3303 等已 stale 8 天），依赖版本已落后于上游最新版。建议维护者批量处理以下 stale 依赖 PR：aws-sdk-go-v2/config (#3306)、bedrockruntime (#3305)、anthropic-sdk-go (#3304)、actions/stale (#3303)，以降低后续升级的累积成本。


## 项目健康度总评

| 维度 | 评分 | 说明 |
|------|------|------|
| 社区活跃度 | ⭐⭐⭐☆ | 有外部贡献者持续提交高质量 PR，但 Issue 讨论量偏低 |
| 代码迭代速度 | ⭐⭐⭐☆ | 依赖更新自动化运行良好；功能 PR 审核效率有待提升 |
| 项目稳定性 | ⭐⭐⭐⭐ | 无严重崩溃报告，但有 WhatsApp 断连、exec 超时失效等中等问题在途修复 |
| 维护响应性 | ⭐⭐☆☆ | PR 积压较多（最老 38 天），大量 PR/Issue 被自动 stale，维护者介入频率低 |

**核心建议**：今日社区贡献的 3 个高价值 PR（#3319、#3320、#3321）应尽快 review 合并；同时处理长期积压的 #3200 和 #3270，并向 #3308 作者做出正式回应，以维持社区贡献者的积极性。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-08

## 1. 今日速览

过去24小时内，QwenPaw 项目保持着非常高的社区活跃度：共更新 30 条 Issue（新开/活跃 19 条，关闭 11 条）和 49 条 PR（待合并 27 条，已合并/关闭 22 条），并发布了 v2.1.0-beta.2 版本。值得关注的是，今日出现了多个针对 Windows 桌面端（安装失败、文本无法选中复制、杀毒软件误报）和插件系统（邮件插件、视频生成插件在 Windows 上不可用）的集中反馈，同时修复 PR 跟进速度较快——已知的 Telegram 访问控制、严格 OpenAI 兼容 provider 拒绝、自定义 Profile 文件和桌面文本选择等问题均有对应 PR 已提交。总体来看，项目处于健康、活跃的迭代节奏中，社区反馈响应及时。

## 2. 版本发布

### v2.1.0-beta.2（最新，Beta 预发布）

**更新内容：**
- `fix(ci)`: 在 real-behavior-proof 中实现基于 fence-aware 的 section 提取（修复 #6626，PR #6653，作者 @hanson-hex）
- `fix(checkpoints)`: 在 web workspace bootstrap 中恢复自动快照（PR #6，作者 @qbc2016）

**破坏性变更：** 无已知破坏性变更。

**迁移注意事项：** 该版本为 Beta 预发布。已安装 v2.1.0-b1 的用户需注意，升级到 b2 时，Windows 平台可能遇到安装程序需覆盖文件时进程占用的报错（详见 #6810），建议先手动退出所有 QwenPaw 相关进程再进行安装。

发布链接：https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.2

## 3. 项目进展

今日 PR 活动密集，共 22 条 PR 被合并/关闭。从可追踪数据来看，主要进展集中在以下方面：

| PR 链接 | 状态 | 内容 | 影响 |
|---------|---------|--------|---------|
| [#6772](https://github.com/agentscope-ai/QwenPaw/pull/6772) | OPEN | ReMe 记忆配置、Embedding 生命周期与 Daily Paper 功能增强 | 重构 Console 记忆配置页，新增 Embedding 真实连通性验证、安全热更新和 Cron 定时论文简报 |
| [#6809](https://github.com/agentscope-ai/QwenPaw/pull/6809) | OPEN | 清理 Chat Completions 中的内部运行时段/Response API 文本类型字段 | 修复严格 OpenAI 兼容 provider（如 StepFun）返回 400 的问题，对应 Issue #6803 |
| [#6808](https://github.com/agentscope-ai/QwenPaw/pull/6808) | OPEN | Console 页面展示自定义 Profile Markdown 文件 | 修复 Files 页面隐藏自定义 persona 文件的回归，对应 Issue #6785 |
| [#6788](https://github.com/agentscope-ai/QwenPaw/pull/6788) | OPEN | 使用共享 root profile 工作区存储 ACL，而非 per-task 工作区 | 解决 multica 新任务导致 Telegram 白名单失效的问题，对应 Issue #6786/#6787 |
| [#6802](https://github.com/agentscope-ai/QwenPaw/pull/6802) / [#6801](https://github.com/agentscope-ai/QwenPaw/pull/6801) | OPEN | 恢复桌面模式下的文本选中与复制 | 对应 Issue #6797（v2.1.0b2 桌面模式无法选中文本） |
| [#6799](https://github.com/agentscope-ai/QwenPaw/pull/6799) | OPEN | 修复 shell 临时输出文件泄漏，限制捕获输出大小 | 解决真实场景下 26GB 孤儿文件问题 |
| [#6750](https://github.com/agentscope-ai/QwenPaw/pull/6750) | OPEN | 修复会话身份死锁、早保存会话、超大提示词折叠 | 修复前端 session 交互三大问题 |
| [#4694](https://github.com/agentscope-ai/QwenPaw/pull/4694) | CLOSED | 官网下载页 UI 重构与优化 | 5 月底发起，今日关闭 |

**总体评估：** 今日无重大新功能合并（最新合并 PR #4694 为官网下载页 UI 优化），但多项针对性 Bug 修复 PR 已在评审/待合并状态，覆盖了社区今日最集中的痛点（MCP 失效、ACL 重置、桌面文本选择等），预计未来几天将迎来一波修复合入。

## 4. 社区热点

今日讨论最活跃的话题集中在以下几处：

**🔥 最热问题：Docker 版插件市场/应用市场不可用（8 条评论）**
[#6782](https://github.com/agentscope-ai/QwenPaw/issues/6782) — 2.0.1 Docker 版本插件市场、应用市场始终提示维护中。8 条评论说明有不少用户遇到同样问题。未看到明确的原因回复或修复 PR。

**🔥 高热度：Doom loop 问题（8 条评论，已关闭，wontfix）**
[#6116](https://github.com/agentscope-ai/QwenPaw/issues/6116) — Agent 在同一轮对话中重复调用同一工具，系统约在连续 6 次后检测并告警，但已浪费大量 API 调用和 token。该问题最终以 wontfix 关闭，可能已在后续版本中通过其他机制解决。

**🔥 高活跃：MCP 工具规律性失效（6 条评论）**
[#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) — 用户反馈每隔数小时（或过夜）MCP 工具即失效，agent 无法自动调用，提示"未注册或不存在"，重启 Docker 容器后恢复。这是当前影响面较大的稳定性问题，值得高度重视。

**🔥 关注度高：Telegram 通道访问控制白名单重置（4 条评论）**
[#6786](https://github.com/agentscope-ai/QwenPaw/issues/6786) — multica-daemon 通过 ACP 协议启动新任务时，新实例使用全新的 workspace 目录，导致 `access_control.json` 为空，已批准用户被拒绝访问。已有对应 PR [#6788](https://github.com/agentscope-ai/QwenPaw/pull/6788) 提交。

**其他焦点话题：**
- [#6490](https://github.com/agentscope-ai/QwenPaw/issues/6490)（4 评论）— 请求内置 Volcengine Agent Plan 和 Xiaomi MiMo API
- [#6770](https://github.com/agentscope-ai/QwenPaw/issues/6770)（3 评论）— 请求将 Chrome 标签生命周期设为可配置
- [#6285](https://github.com/agentscope-ai/QwenPaw/issues/6285)（3 评论）— 阿里云 Token Plan 模型列表未更新，未包含 qwen3.8-max-preview

## 5. Bug 与稳定性

按严重程度排列今日新报告的 Bug：

**🔴 严重 — 功能完全不可用 / 阻塞性**

| 问题 | 描述 | 状态 |
|------|--------|---------|
| [#6810](https://github.com/agentscope-ai/QwenPaw/issues/6810) | Windows v2.1.0b1 自动更新报错卡死；卸载后安装 b2 时 NSIS 弹出 4+ 个"无法打开要写入的文件"错误（涉及 python.exe、VCRUNTIME140.dll 等），浏览器扩展 NM host 锁文件未释放导致 | 待处理 |
| [#6807](https://github.com/agentscope-ai/QwenPaw/issues/6807) | qwenpaw-creator 插件在 Windows 上视频/图像生成与资源发布完全无法工作 | 待处理 |
| [#6806](https://github.com/agentscope-ai/QwenPaw/issues/6806) | qwenpaw-creator 插件在 Windows 上保存模型配置时始终返回 Internal Server Error | 待处理 |
| [#6782](https://github.com/agentscope-ai/QwenPaw/issues/6782) | Docker 版 2.0.1 插件市场/应用市场始终提示"维护中"，无法使用 | 待处理 |
| [#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) | MCP 工具每隔数小时规律性失效，重启 Docker 容器后恢复 | 待处理 |

**🟠 高 — 数据/稳定性风险**

| 问题 | 描述 | 状态 |
|------|--------|---------|
| [#6768](https://github.com/agentscope-ai/QwenPaw/issues/6768) | Agent 完成多步骤任务后进入无限循环，会话被阻塞数小时 | 待处理 |
| [#6799](https://github.com/agentscope-ai/QwenPaw/pull/6799) 对应缺陷 | Windows 上每次 shell 调用产生临时文件泄漏，出现 26GB 无法删除的孤儿文件 | 已有修复 PR |
| [#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) | 2.0.1 版闲置几十分钟后自动卡死，只能关闭进程重启 | 待处理 |
| [#6794](https://github.com/agentscope-ai/QwenPaw/issues/6794) | Agent Kanban 创建 Issue 返回 405，热重载期间暂时 404 | 待处理 |
| [#6785](https://github.com/agentscope-ai/QwenPaw/issues/6785) | 回归：Files 页面对自定义 persona .md 文件不再显示切换开关 | 已有修复 PR #6808 |
| [#6811](https://github.com/agentscope-ai/QwenPaw/issues/6811) | OpenAI Responses 续写摘要忽略 disable_thinking，60 秒取消被误报为 malformed output | 待处理 |

**🟡 中 — 平台/兼容性问题**

| 问题 | 描述 | 状态 |
|------|--------|---------|
| [#6803](https://github.com/agentscope-ai/QwenPaw/issues/6803) | OpenAI 兼容 Chat 请求携带 Responses API 的 `input_text` 类型和原始流式字段，被严格 provider（StepFun）以 400 拒绝 | 已有修复 PR #6809 |
| [#6812](https://github.com/agentscope-ai/QwenPaw/issues/6812) | Gemini provider 工具 schema 包含 `$schema` 额外字段，Google API 报 Model 'unknown' execution failed | 待处理 |
| [#6775](https://github.com/agentscope-ai/QwenPaw/issues/6775) | Malware Bytes 将 Windows Desktop 版标记为 Trojan Loader（用户怀疑误报，已卸载等待官方回复） | 待处理 — 建议安全团队尽快响应 |
| [#6810](https://github.com/agentscope-ai/QwenPaw/issues/6810) | Windows 安装/更新前未终止占用安装目录的进程 | 待处理 |

## 6. 功能请求与路线图信号

**可能纳入下一版本的功能需求（已有实现/PR 支撑）：**

| 功能 | 证据 | 判断 |
|------|---------|---------|
| 内置 Volcengine Agent Plan 与 Xiaomi MiMo API Provider（[#6490](https://github.com/agentscope-ai/QwenPaw/issues/6490)） | 4 条评论，用户详细给出了 endpoint 修复方案 | 中等概率，社区有需求，实现成本低 |
| 阿里云 Token Plan 模型列表更新至 qwen3.8-max-preview（[#6285](https://github.com/agentscope-ai/QwenPaw/issues/6285)） | 用户指出硬编码模型列表未更新 | 高概率，纯配置修改类任务 |
| 用户 Chrome 标签生命周期跨响应周期可配置（[#6770](https://github.com/agentscope-ai/QwenPaw/issues/6770)） | 3 条评论，用户已验证到最新 main 分支仍可复现 | 中等概率，需要产品决策 |
| 智能邮件管理助手（[#6800](https://github.com/agentscope-ai/QwenPaw/pull/6800)） | 新 PR 提交：支持多邮箱自动接收、分类、回复、实时推送 | 待评审，能力较大，可能会走插件生态 |

**路线图信号：**
- 从 [#6772](https://github.com/agentscope-ai/QwenPaw/pull/6772) 来看，ReMe 记忆模块在持续增强，包括 Embedding 配置的完整生命周期管理、Daily Paper 定时论文简报能力，说明项目团队在"记忆"方向有明确产品规划
- [#6804](https://github.com/agentscope-ai/QwenPaw/pull/6804) 为微信通道加入了中文审批回复支持，体现对中文用户交互习惯的重视
- [#6715](https://github.com/agentscope-ai/QwenPaw/pull/6715) 为 OneBot 通道增加远程媒体（语音/图片 URL）处理，推动 IM 渠道基建完善

## 7. 用户反馈摘要

**🗣️ 真实用户痛点：**

> **Docker 市场不可用（#6782）**："2.0.1 docker版本，插件市场、应用市场始终提示维护中，无法使用" —— 多位用户确认，影响面较大。

> **MCP 工具失效（#6732）**："每隔一些时间（可能是一个晚上或者几个小时），mcp工具就无效了，没法自动被调用，答复未注册或者不存在。然后，重启qwenpaw docker容器后，就能恢复。" —— 对依赖 MCP 工具的自动化工作流影响严重。

> **桌面模式不便（#6790）**："桌面模式左键点击两次应用才能打开，建议修改为鼠标左键点击一次。而且进入桌面模式后没有回到完整模式相关按键。"

> **Windows 安装阻塞（#6810）**：用户经历了自动更新卡死 → 强制退出 → 手动卸载 → 重新安装多个文件写入报错的完整链路，安装体验不佳。

> **杀毒软件误报（#6775）**：英文用户因 Malware Bytes 报毒已卸载软件，等待官方回应。"IS this really malware or a false positive? I'm uninstalling until I hear back from your team. PS. I love your work." —— 语气友善但行为已受影响，安全团队需重视。

> **多任务/新会话冲突（#6796）**："2.1 beta2 任务执行时不能在对话框提交新会话了，以前可以的" —— 回归类问题直接影响日常使用。

**😊 满意度信号：**
- 多数 Issue 提交者语言友善，对项目整体持正面态度
- 针对 #6789 的 GitHub 授权问题，用户寻求社区帮助而非常规途径，说明文档指引还需完善

## 8. 待处理积压

**⚠️ 长期未响应但重要的问题：**

| 问题 | 创建时间 | 当前状态 | 需要关注的原因 |
|------|---------|---------|--------------|
| [#6285](https://github.com/agentscope-ai/QwenPaw/issues/6285) — 阿里云 Token Plan 模型列表未包含 qwen3.8-max-preview | 2026-07-20（19 天） | OPEN，3 评论 | 模型更新类配置问题，修复成本低但长期未处理，可能影响阿里云 Token Plan 用户的体验 |
| [#6490](https://github.com/agentscope-ai/QwenPaw/issues/6490) — 新增 Volcengine 与 Xiaomi 内置 Provider | 2026-07-27（12 天） | OPEN，4 评论 | 用户给出了完整 endpoint 配置和修复建议，可低成本落地 |
| [#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) — MCP 工具规律性失效 | 2026-08-06（2 天） | OPEN，6 评论 | 高热度稳定性问题，影响 MCP 重度用户，建议优先排查 |
| [#6619](https://github.com/agentscope-ai/QwenPaw/issues/6619) — ToolCallBlock 缺少 extra_content 字段崩溃 | 2026-08-01（7 天） | CLOSED | 已关闭，但涉及 qwenpaw 2.0.1 + agentscope 2.0.4.post1 的兼容性问题，值得确认是否真正解决 |

**👀 PR 积压关注：**

- [#6623](https://github.com/agentscope-ai/QwenPaw/pull/6623) — 修复 ACP 通知与 prompt 响应竞争导致的最终文本丢失，8 月 1 日提交，已标记 Under Review，但目前仍在待合并状态。
- [#6617](https://github.com/agentscope-ai/QwenPaw/pull/6617) — 流式重试路径上对 Retry-After 上限的遵循，7 月 31 日提交，仍然 open 且 Under Review，涉及 rate-limit 可靠性。
- [#6615](https://github.com/agentscope-ai/QwenPaw/pull/6615) — 处理损坏的 agent 配置和无效 JSON，7 月 31 日提交，尚未合并，配置健壮性改进建议加快评审。

---

**日报总结：** 项目保持着稳定且热情的开源社区生态，v2.1.0-beta.2 的发布和 49 条 PR 的密集流动展现了良好的迭代效率。当前最需要关注的三个方向为：（1）MCP 工具稳定性问题（#6732）；（2）Windows 桌面端安装/杀毒/交互体验问题集群；（3）Docker 市场不可用问题（#6782）。这些问题共性是影响面大、用户感知强，建议在 v2.1.0 正式版前优先修复。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes-Agent 项目动态日报 · 2026-08-08

## 今日速览

过去 24 小时项目保持非常高的活跃度：Issues 更新 364 条（新开/活跃 313，关闭 51），PR 更新 500 条（待合并 345，合并/关闭 155），无新版本发布。社区讨论重心集中在 **repo 级 god-file 分片重构**（#78647 达 59 评论）、**插件接口扩展**（#64182）以及 **xAI/WhatsApp parity campaign** 等架构议题；同时多个 P1 级 bug（macOS 桌面端冻结、更新静默丢依赖、Telegram 僵尸网关）受到广泛关注。整体看项目迭代节奏极快，但 PR 待合并积压已达 345 条，合并吞吐值得关注。

## 项目进展

从可见的已关闭条目来看，今日主要收尾工作集中在桌面端与 skills 目录修复：

- **desktop 修复**：修复“Show earlier messages”误隐藏大部分会话内容的 UI 计数逻辑，[#80718](https://github.com/NousResearch/hermes-agent/pull/80718) 当日创建并关闭。
- **desktop 修复**：新会话首条消息不再因 "session not found" 死链，用户草稿得以保留，[#67503](https://github.com/NousResearch/hermes-agent/pull/67503) 已关闭（对应 issue #67502）。
- **skills 修复**：根级 skill 目录重复分类的修复 PR [#81328](https://github.com/NousResearch/hermes-agent/pull/81328) 已关闭；修订版 [#81338](https://github.com/NousResearch/hermes-agent/pull/81338) 当日提交，通过 v2 snapshot 使已有安装重建修正索引。
- **Bug 收尾**：desktop 新会话消息被错误路由到旧 TUI 会话的问题 [#68358](https://github.com/NousResearch/hermes-agent/issues/68358) 已关闭（标记 implemented-on-main）；Matrix 手动 cron 投递失败 [#61495](https://github.com/NousResearch/hermes-agent/issues/61495) 已关闭。
- 另有约 **152 条 PR** 在统计窗口内合并/关闭（完整列表未在展示数据中）。

## 社区热点

评论数最多、讨论最集中的条目：

1. **[#78647 — Epic: Shard all 20 god files](https://github.com/NousResearch/hermes-agent/issues/78647)**（59 评论）  
   Repo 级 god-file 分片总控 issue，确立“所有 god-file 必须分片、禁止回退”的仓库政策，是当前架构重构主线。

2. **[#64182 — Plugin Interface Expansion tracking](https://github.com/NousResearch/hermes-agent/issues/64182)**（29 评论）  
   社区插件接口扩展的统筹跟踪，整理自 Discord 社区讨论，目标是让长期排队贡献者的 PR 能稳定落地。

3. **[#78645 — Shard agent/context_compressor.py](https://github.com/NousResearch/hermes-agent/issues/78645)**（25 评论）  
   针对 6,789 行 context_compressor.py 的分片提案，压缩模块是当前核心路径，拆分风险较高，讨论充分。

4. **[#29849 — cron job 忽略 terminal.backend](https://github.com/NousResearch/hermes-agent/issues/29849)**（14 评论，👍3）  
   `no_agent=True` 定时任务脚本始终在 scheduler 本地执行，忽略远程 SSH backend，涉及自动化 + 安全边界。

5. **[#63047 — macOS Desktop 全 UI 冻结](https://github.com/NousResearch/hermes-agent/issues/63047)**（13 评论，P1）  
   约 5 条消息后桌面 app 完全无响应，Settings 也无法操作，是当前最受关注的稳定性问题之一。

背后诉求：**架构债务清理**（god-file）、**插件生态开放**、**跨平台 parity**，以及**桌面端稳定性**是社区最关心的四个方向。

## Bug 与稳定性

按严重程度排列：

**P1**

- **[#63047 — macOS 27 beta 桌面端完全无响应](https://github.com/NousResearch/hermes-agent/issues/63047)** — 包括 Settings 在内全部锁定，无可见 fix PR。
- **[#72924 — hermes update 静默丢弃已声明 extras](https://github.com/NousResearch/hermes-agent/issues/72924)** — Telegram/voice/test 模块在更新后消失，update 显示成功，无可见 fix PR。
- **zombie gateway**（对应 [#81335](https://github.com/NousResearch/hermes-agent/pull/81337)）— Telegram 轮询重试耗尽后网关僵尸化，**[PR #81337](https://github.com/NousResearch/hermes-agent/pull/81337) 已提交待合并**。

**P2**

- **[#79278 — 上下文压缩丢弃 in-flight 工具链](https://github.com/NousResearch/hermes-agent/issues/79278)** — side effect 已发生但结果丢失，agent 重放非幂等操作，存在安全风险。
- **[#75269 — SessionDB WAL reader 泄漏耗尽文件描述符](https://github.com/NousResearch/hermes-agent/issues/75269)** — 长生命周期 worker 的只读连接不释放。
- **[#73381 — Windows Desktop 更新失败](https://github.com/NousResearch/hermes-agent/issues/73381)** — venv 缺 cryptography + Windows 文件锁导致 uv pip install 退出码 2。
- **[#79407 — 0.20.0 回归：桌面操作面板整体消失](https://github.com/NousResearch/hermes-agent/issues/79407)** — app 变成 viewer-only shell。
- **[#71941 — 委托子上下文经共享终端快照泄漏](https://github.com/NousResearch/hermes-agent/issues/71941)** — `HERMES_DELEGATED_CHILD_CONTEXT` 无法正确隔离。
- **[#75801 — gpt-5.6-luna 缺 finish_reason 导致假续传](https://github.com/NousResearch/hermes-agent/issues/75801)** — OpenCode Go 集成 + desktop 流式回答被吞。

已有 fix PR 的条目：gateway 僵尸（[#81337](https://github.com/NousResearch/hermes-agent/pull/81337)）、kanban worktree 缺失（[#81336](https://github.com/NousResearch/hermes-agent/pull/81336)）、kanban 使用 live source dir（[#81341](https://github.com/NousResearch/hermes-agent/pull/81341)）、kanban dependency hook（[#81339](https://github.com/NousResearch/hermes-agent/pull/81339)）、skills 根名重复（[#81338](https://github.com/NousResearch/hermes-agent/pull/81338)）、computer_use 占位 id（[#81340](https://github.com/NousResearch/hermes-agent/pull/81340)）。两个 P1（#63047、#72924）尚无公开 fix。

## 功能请求与路线图信号

值得关注的功能需求与对应实现线索：

- **跨平台 session 共享**：[#4335](https://github.com/NousResearch/hermes-agent/issues/4335)（CLI ↔ Telegram 会话上下文互通）仍处 needs-decision，属于 gateway 架构核心演进方向。
- **插件接口扩展**：[#64182](https://github.com/NousResearch/hermes-agent/issues/64182) 持续跟踪，目标是让社区插件 PR 有路可走。
- **xAI/Grok parity**：[#80424](https://github.com/NousResearch/hermes-agent/issues/80424) 新立 meta-issue，对齐 xAI 官方全功能面。
- **WhatsApp parity**：[#79890](https://github.com/NousResearch/hermes-agent/issues/79890) 对齐 WhatsApp Business Platform Cloud API。
- **skill 体系去重**：[#67582](https://github.com/NousResearch/hermes-agent/issues/67582) 要求阻止近重复 skill 创建，今日已有对应修复 PR [#81338](https://github.com/NousResearch/hermes-agent/pull/81338)。
- **法语文档**：[#60535](https://github.com/NousResearch/hermes-agent/issues/60535) 社区请求新增 README/CONTRIBUTING 法语版。

本期功能型 PR 信号：

- `delegate_task` 支持 per-call model/provider override — [#77953](https://github.com/NousResearch/hermes-agent/pull/77953)
- agent-facing `model_override` 工具（会话内切模型） — [#77993](https://github.com/NousResearch/hermes-agent/pull/77993)
- cron 强制 `required_skills` — [#79808](https://github.com/NousResearch/hermes-agent/pull/79808)
- Windows 关闭时最小化到系统托盘 — [#81342](https://github.com/NousResearch/hermes-agent/pull/81342)
- Desktop 自包含安装器（payload/channels/eject） — [#79599](https://github.com/NousResearch/hermes-agent/pull/79599)
- WhatsApp history API 可选端点 — [#69670](https://github.com/NousResearch/hermes-agent/pull/69670)

结合 god-file sharding 的持续推进，**0.21+ 的架构重组方向已经比较明确**：模块拆分、契约化分解、平台 parity 并行推进。

## 用户反馈摘要

从今日活跃 issue 中提炼的用户反馈：

- **macOS 桌面端体验堪忧**：约 5 条消息后整个 app 冻结，用户只能“碰运气”等待解冻（[#63047](https://github.com/NousResearch/hermes-agent/issues/63047)）。
- **更新机制伤害信任**：`hermes update` 成功后 Telegram/voice 等 extras 悄悄消失，功能静默损坏（[#72924](https://github.com/NousResearch/hermes-agent/issues/72924)）。
- **Windows 用户更新受阻**：venv 缺 cryptography + 文件锁直接阻断安装（[#73381](https://github.com/NousResearch/hermes-agent/issues/73381)）；0.20.0 升级后操作面板整个消失，应用沦为只读 shell（[#79407](https://github.com/NousResearch/hermes-agent/issues/79407)）。
- **Feishu 审批链路不可用**：卡片按钮点击一律报 error 200340，另有卡片事件被误解析为 `/card` 命令、流式卡片支持缺失（[#10251](https://github.com/NousResearch/hermes-agent/issues/10251)、[#7675](https://github.com/NousResearch/hermes-agent/issues/7675)）。
- **长会话稳定性痛点**：SessionDB 文件描述符耗尽影响长时间运行（[#75269](https://github.com/NousResearch/hermes-agent/issues/75269)）；压缩触发时非幂等工具链存在危险重放（[#79278](https://github.com/NousResearch/hermes-agent/issues/79278)）。
- **多平台用户希望更好 onboarding**：法语用户请求文档翻译（[#60535](https://github.com/NousResearch/hermes-agent/issues/60535)）。

## 待处理积压

以下重要条目长期未合入/未关闭，建议维护者关注：

- **[PR #28006 — azure-foundry /model picker 修复](https://github.com/NousResearch/hermes-agent/pull/28006)** — 自 2026-05-18 开启至今约 2.5 个月未合并。
- **[PR #63375 — codex kanban worktree headless worker](https://github.com/NousResearch/hermes-agent/pull/63375)** — 自 2026-07-12 开启，涉及安全边界与 CI 协作。
- **[Issue #4335 — 跨平台 session 上下文共享](https://github.com/NousResearch/hermes-agent/issues/4335)** — 2026-03-31 创建，仍停在 needs-decision。
- **[Issue #10251 — Feishu 审批卡片按钮 error 200340](https://github.com/NousResearch/hermes-agent/issues/10251)** — 2026-04-15 创建，长期无 fix。
- **[Issue #7675 — Feishu 卡片交互/审批/流式三问题](https://github.com/NousResearch/hermes-agent/issues/7675)** — 2026-04-11 创建，与 #10251 叠加影响 Feishu 用户。
- **[Issue #29849 — cron 脚本忽略 terminal.backend](https://github.com/NousResearch/hermes-agent/issues/29849)** — 2026-05-21 创建，14 条讨论但无 fix PR。
- **[Issue #63047 / #72924](https://github.com/NousResearch/hermes-agent/issues/63047)** — 两个 P1 尚无公开修复，建议优先处理。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报（2026-08-08）

## 1. 今日速览

过去 24 小时内 AstrBot 项目保持高活跃度：共更新 12 条 Issues（9 条新开/活跃、3 条关闭）和 22 条 PR（8 条待合并、14 条已合并/关闭），无新版本发布。核心开发者（@Soulter）亲自合入了多项关键重构，包括移除废弃的同步 SharedPreferences 桥接、支持无密码桌面会话、知识库 WebUI 错误状态区分等。值得注意的是，今日修复的多个 Bug（SQLAlchemy 跨事件循环连接池冲突、QQ 官方长消息截断、流式 tool_call 索引错位）均已在当天内提交修复 PR，体现了项目对稳定性问题的快速响应能力。社区侧对插件市场「自动安全检查失败」的集中反馈和 WebUI 新界面的体验争议是当前主要热点。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日共合并/关闭 14 条 PR，核心进展集中在以下几个方面：

### 🔧 架构层面：弃用同步 SharedPreferences 桥接
- **[#9582](https://github.com/AstrBotDevs/AstrBot/pull/9582) Refactor/remove sync shared preferences**（[area:core, size:L]）— 移除了废弃的同步 `SharedPreferences` 方法。这些方法将 DB 操作调度到独立后台事件循环，与主循环共享 SQLAlchemy 异步引擎连接池时存在跨事件循环访问风险，是今日 [#9572](https://github.com/AstrBotDevs/AstrBot/issues/9572) 连接池并发占满问题的根因之一。
- **[#9584](https://github.com/AstrBotDevs/AstrBot/pull/9584) refactor: migrate config preferences to async**（[area:webui, area:core, size:L]）— 将 `AstrBotConfigManager` 从废弃的同步桥接迁移至异步实现，与 #9582 配套消除了配置管理中的跨事件循环隐患。

### 🖥️ WebUI 体验持续优化
- **[#9585](https://github.com/AstrBotDevs/AstrBot/pull/9585) feat: support passwordless desktop sessions**（[area:webui, area:core, size:L]）— 支持桌面托管场景的无密码会话，通过 loopback 客户端和进程级会话密钥发放 Dashboard JWT，并在该模式下抑制首次运行密码设置提示。
- **[#9578](https://github.com/AstrBotDevs/AstrBot/pull/9578) / [#9575](https://github.com/AstrBotDevs/AstrBot/pull/9575) fix(kb): distinguish loading errors from empty states**（[area:webui, feature:knowledge-base, size:M]）— 修复知识库加载失败被误显示为空数据的问题，增加可重试错误状态与文档级/分块级独立错误展示。
- **[#9577](https://github.com/AstrBotDevs/AstrBot/pull/9577) fix(kb): stabilize document search behavior**（[area:webui, feature:knowledge-base, size:S]）— 知识库文档搜索增加 300ms 防抖与过期请求失效处理，修复输入时搜索结果被旧响应覆盖的问题。
- **[#9564](https://github.com/AstrBotDevs/AstrBot/pull/9564) feat: expand webchat drag-and-drop upload to the whole chat area**（[feature:chatui, size:L]）— 将聊天界面拖拽上传热区从底部输入栏扩展到整个对话区域（对应 #9561）。
- **[#9547](https://github.com/AstrBotDevs/AstrBot/pull/9547) fix: use favicon as default plugin icon**（[area:webui, size:XS]）— 插件默认图标改用当前官方 favicon，替换遗留的旧版 `plugin_icon.png`。
- **[#9579](https://github.com/AstrBotDevs/AstrBot/pull/9579) fix: inherit configured timezone for cron jobs**（[area:webui, size:S]）— 修复 WebUI 创建的定时任务未继承目标会话时区、回退到服务器本地时区的问题。
- **[#9581](https://github.com/AstrBotDevs/AstrBot/pull/9581) feat: show effective AstrBot time in settings**（[area:webui, size:L]）— 系统设置中显示 AstrBot 当前有效时间，帮助用户识别服务器时钟/时区配置问题。
- **[#9570](https://github.com/AstrBotDevs/AstrBot/pull/9570) feat: add download-count sorting to plugin marketplace**（[area:webui, feature:plugin, size:M]）— 插件市场排序菜单增加「按下载量排序」。

### 🐛 稳定性修复
- **[#9568](https://github.com/AstrBotDevs/AstrBot/pull/9568) fix: refresh in-memory provider config after deleting provider**（[area:provider, size:XS]）— 修复删除 Provider 后 Dashboard 列表中仍残留展示已删除 Provider 的问题。

整体来看，项目今日在架构清理（移除同步桥接）、WebUI 体验、知识库功能稳定性和多渠道适配（Telegram、QQ 官方）等多个方向同步推进，维护节奏健康。

## 4. 社区热点

### 插件市场「自动安全检查失败」集中反馈（最热话题）
- **[#9574](https://github.com/AstrBotDevs/AstrBot/issues/9574) 把插件上传到新插件站显示安全检查失败**（[CLOSED]）— 用户反馈连续多次尝试均失败。
- **[#9566](https://github.com/AstrBotDevs/AstrBot/issues/9566) 上传插件到 astrbot 插件市场时频繁出现“自动安全检查失败”**（[OPEN]）— 同一问题的另一起反馈，附插件仓库链接。
- **[#9526](https://github.com/AstrBotDevs/AstrBot/issues/9526) 在新插件站发布插件报错**（[CLOSED]）— 更早的同类反馈，Cloudflare 网关层报错。

**分析**：三起独立反馈指向插件市场（cloud.astrbot.app）的安全检查/发布链路存在不稳定或过载问题，且 #9526 已关闭却仍复现，说明问题可能未彻底根治。这涉及开发者生态的核心路径，建议维护者优先排查。

### WebUI 新界面设计争议
- **[#9571](https://github.com/AstrBotDevs/AstrBot/issues/9571) [Feature]** — 用户直言「新界面是哪个天才搞的？丑，设置不方便，配置文件没法修改了」，情绪化吐槽背后反映的是新 WebUI 在信息密度、配置可达性上的体验回退。同属 WebUI 反馈的还有 [#9589](https://github.com/AstrBotDevs/AstrBot/issues/9589) 建议增加布局调整按钮。

### 数据层并发稳定性讨论
- **[#9572](https://github.com/AstrBotDevs/AstrBot/issues/9572) SQLAlchemy 异步引擎连接池跨事件循环 Bug** — 评论 2 条，是今日技术上讨论最深入的 Issue，直接催生了 #9582/#9584 两个重构 PR。

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 高严重度
- **[#9590](https://github.com/AstrBotDevs/AstrBot/issues/9590) 上游 tool_call.index 从 1 开始编号导致工具调用整体失败**（[area:provider, priority: p0]，[OPEN]）
  当 OpenAI 兼容网关（如 new-api 风格代理）以非标准方式从 1 开始编号流式 `tool_call.index` 时，会产出 `id=None` 的畸形 tool_call 并抛 pydantic 校验异常，导致子代理委托、多工具并行场景整体崩溃。与已关闭的 #8911、#6661 属同一故障链。
  **✅ 修复 PR 已提交**：[#9593](https://github.com/AstrBotDevs/AstrBot/pull/9593) 归一化 1-based index 并兜底缺失 id。

- **[#9572](https://github.com/AstrBotDevs/AstrBot/issues/9572) SQLAlchemy 异步引擎连接池跨事件循环访问崩溃**（[area:core]，[OPEN]）
  同步 SharedPreferences 方法将 DB 操作调度到独立后台事件循环，但连接池的 `asyncio.Queue` 绑定在主循环上，并发占满时跨循环访问抛出 `RuntimeError`。
  **✅ 已通过重构修复**：[#9582](https://github.com/AstrBotDevs/AstrBot/pull/9582)、[#9584](https://github.com/AstrBotDevs/AstrBot/pull/9584) 移除同步桥接并迁移至异步实现。

### 🟠 中严重度
- **[#9594](https://github.com/AstrBotDevs/AstrBot/issues/9594) QQ 语音(AMR)因 convert_audio_format 后缀短路导致 STT 失败**（[area:core]，[OPEN]）
  `convert_audio_format()` 仅依据文件名后缀判断是否需要转换，不校验文件实际内容。NapCat 接入的 QQ AMR 语音因其后缀不在目标格式列表中被跳过转换，导致 Whisper 兼容接口返回 HTTP 400。
  **暂无修复 PR。**

- **[#9591](https://github.com/AstrBotDevs/AstrBot/issues/9591) QQ 官方适配器长回复被平台截断**（[area:platform]，[OPEN]）
  回复超 4000 字符时平台报错 40054007 并截断消息内容。
  **✅ 修复 PR 已提交**：[#9592](https://github.com/AstrBotDevs/AstrBot/pull/9592) 按 4000 字符限制拆分长消息。

### 🟡 低严重度/体验问题
- **插件市场安全检查失败**：[#9574](https://github.com/AstrBotDevs/AstrBot/issues/9574)（[CLOSED]）、[#9566](https://github.com/AstrBotDevs/AstrBot/issues/9566)（[OPEN]）— 上传插件到 cloud.astrbot.app 时频繁失败，原因未知。
- **WebUI 新界面可用性回退**：[#9571](https://github.com/AstrBotDevs/AstrBot/issues/9571) — 用户投诉设置不便、配置文件无法修改、界面观感差。

## 6. 功能请求与路线图信号

- **[#9583](https://github.com/AstrBotDevs/AstrBot/issues/9583) 自动更新开关**（[feature:updater]）— 用户希望提供一键自动更新能力。考虑到已有 [feature:updater] 标签且今日有相关 PR 活动，该功能被纳入路线图的概率较高。
- **[#9481](https://github.com/AstrBotDevs/AstrBot/issues/9481) 通用 TTS API 配置**（[enhancement, area:provider]）— 提议建立低代码通用请求体构建器，让用户自行映射 TTS API 参数，避免为每个新 TTS 供应商编写适配。创建一周但暂无评论，建议维护者关注。
- **[#9589](https://github.com/AstrBotDevs/AstrBot/issues/9589) WebUI 布局调整按钮**（[area:webui, feature:chatui]）— 为左侧菜单增加布局调整能力。
- **[#9561](https://github.com/AstrBotDevs/AstrBot/issues/9561) 扩展 ChatUI 拖拽上传热区**（[CLOSED]）— 已被 [#9564](https://github.com/AstrBotDevs/AstrBot/pull/9564) 合并实现，确认进入下一版本。

**待合并功能 PR（可能进入下一版本）**：
- **[#9554](https://github.com/AstrBotDevs/AstrBot/pull/9554) feat: support native tools in OpenAI Responses provider**（[area:webui, area:provider, size:L]）— 为 OpenAI Responses 提供商增加原生工具支持（web_search、file_search、code_interpreter 等），关闭 #9530。
- **[#9558](https://github.com/AstrBotDevs/AstrBot/pull/9558) feat(telegram): add dedicated proxy configuration**（[area:platform, size:S]）— 为 Telegram 适配器增加独立代理配置，避免只能依赖全局代理波及无关模块（#7584）。

## 7. 用户反馈摘要

- **插件开发者生态受阻**：多位开发者反馈向插件市场（cloud.astrbot.app）上传插件时反复遇到「自动安全检查失败」或网关错误（[#9574](https://github.com/AstrBotDevs/AstrBot/issues/9574)、[#9566](https://github.com/AstrBotDevs/AstrBot/issues/9566)、[#9526](https://github.com/AstrBotDevs/AstrBot/issues/9526)）。该问题直接影响第三方插件发布，且 #9526 在 8 月 3 日创建、8 月 7 日关闭后仍复现，需确认是否为服务端未根治或偶发过载。

- **WebUI 改版引发明显不满**：[#9571](https://github.com/AstrBotDevs/AstrBot/issues/9571) 用户对新界面表达了强烈负面情绪（「丑」「设置不方便」「配置文件没法修改了」）。核心痛点在于：新界面如何平衡视觉设计与功能可达性，尤其是高级用户依赖的配置文件编辑能力不应被移除。同类建议（[#9589](https://github.com/AstrBotDevs/AstrBot/issues/9589) 布局调整）说明用户对 UI 自定义有实际需求。

- **长文本场景在 QQ 官方渠道受限**：用户反馈（[#9591](https://github.com/AstrBotDevs/AstrBot/issues/9591)）超过 4000 字符的回复被 QQ 平台直接截断，影响依赖长输出的使用场景（如长文总结、报告生成），社区普遍期待像 Telegram 适配器那样自动拆分。

## 8. 待处理积压

- **[#9481](https://github.com/AstrBotDevs/AstrBot/issues/9481) 通用 TTS API 配置**（[enhancement, area:provider]）— 创建于 2026-07-31，已过一周无维护者响应。该功能可显著降低新 TTS 接入成本，建议排期评估。
- **[#9558](https://github.com/AstrBotDevs/AstrBot/pull/9558) Telegram 独立代理配置 PR**（[area:platform, size:S]）— 创建于 2026-08-05，已搁置 3 天。Discord 适配器已有 `discord_proxy`，此 PR 补齐 Telegram 适配器的能力对等性，改动量小（S），建议尽快 review。
- **[#9554](https://github.com/AstrBotDevs/AstrBot/pull/9554) OpenAI Responses 原生工具支持 PR**（[area:webui, area:provider, size:L]）— 功能价值高但改动量大，已等待 3 天，建议安排核心维护者 review，避免与 [#9590](https://github.com/AstrBotDevs/AstrBot/issues/9590) 等工具调用相关问题产生耦合。
- **[#9583](https://github.com/AstrBotDevs/AstrBot/issues/9583) 自动更新开关**（[feature:updater]）— 用户呼声较高，暂无维护者回应，建议确认是否纳入路线图。

---

*日报生成时间：2026-08-08 · 数据来源：AstrBot GitHub 仓库*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*