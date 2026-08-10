# OpenClaw 生态日报 2026-08-11

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-10 22:25 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-11

## 1. 今日速览

过去 24 小时 OpenClaw 仓库保持极高度活跃：Issues 更新 500 条（新开/活跃 382，关闭 118），PR 更新 500 条（待合并 359，合并/关闭 141）。今日无新版本 Release。项目在 Telegram 重复消息、会话 compaction 挂起、模型注册表 schema 等问题上关闭了多项历史高优 Bug，但同时出现了 #121058 这类“修复后复发”的沉默失败问题，说明部分根因尚未彻底解决。整体来看，项目迭代速度极快，社区需求集中在**会话稳定性、消息可靠投递、安全/信任模型、成本控制**四大方向，维护者需要在高速合并与稳定性之间保持平衡。

## 2. 版本发布

今日无新版本发布（Releases: 0）。

## 3. 项目进展

过去 24 小时共合并/关闭 PR 141 个，其中可见的关闭 PR 主要包括：

- [fix(ci): refresh generated Swift protocol models (#121746)](https://github.com/openclaw/openclaw/pull/121746)：刷新 Swift 协议生成模型，恢复阻塞所有 PR 的 `protocol-gen-swift --check` CI。
- [refactor(cloud-workers): centralize placement lifecycle fences (#121658)](https://github.com/openclaw/openclaw/pull/121658)：集中化 Cloud Workers 的调度/激活/回收生命周期隔离逻辑，减少重复的 session-store 与 worktree 管理。
- [fix(protocol): refresh approval reviewer models (#121725)](https://github.com/openclaw/openclaw/pull/121725)：刷新审批 reviewer 元数据的 Swift 模型，修复客户端解码问题。该 PR 已被 #121751 继承。

关闭的高优 Issue 也反映了项目在稳定性上的推进：

- Telegram 重复消息类回归：#86519、#96242 均已关闭。
- 会话挂起/锁死：#43661（P0，compaction 超时导致重复发送）、#70334（session lock stuck）已关闭。
- Stuck-session 误杀长任务：#88870 已关闭。
- 上下文溢出静默杀死嵌入会话：#84536 已关闭。
- Compaction 保留孤立 tool_use 块导致会话永久损坏：#93321 已关闭。
- Claude CLI 合成占位符导致静默无响应：#90789 已关闭。
- 模型注册表 schema 违规导致所有 models CLI 崩溃：#116116 已关闭。

这些修复覆盖了多个“消息丢失/重复/挂起”类 P0/P1 问题，是项目健康度的重要正向信号。

## 4. 社区热点

讨论最活跃的 Issues：

- [#121058 Silent reply failures still recurring after #116277 closed (40 评论)](https://github.com/openclaw/openclaw/issues/121058)  
  最热议题。用户指出 #116277 关闭后监控 cron 仍持续记录静默回复失败，甚至当天再次发生。社区情绪明显对“修复未生效”感到挫败，是当前最需关注的问题。

- [#7707 Feature Request: Memory Trust Tagging by Source (33 评论)](https://github.com/openclaw/openclaw/issues/7707)  
  高关注安全功能。用户希望给 agent 记忆按来源（用户命令、网页抓取、第三方 skill）打信任标签，防止恶意指令通过不可信内容投毒记忆。这已成为社区安全讨论的核心。

- [#42475 [Feature]: Per-agent cost budget enforcement at the gateway level (15 评论)](https://github.com/openclaw/openclaw/issues/42475)  
  多云/多 agent 部署者希望在不依赖外部监控的情况下，在网关层做日/月成本预算封顶。该 issue 已带 linked PR，预计会进入后续版本。

- [#86519 [Bug]: Agent repeats identical replies 2-10x on Telegram after 5.20 update (15 评论)](https://github.com/openclaw/openclaw/issues/86519)  
  虽然已关闭，但讨论热度高，是 5.20 更新引入的回归，5.22 只降低严重程度未根治。

- [#40001 Write tool lacks append mode — isolated cron sessions destroy shared files (13 评论)](https://github.com/openclaw/openclaw/issues/40001)  
  社区强烈关注。多个 cron 会话用 `write` 工具覆盖共享 memory 文件造成静默数据丢失，用户希望能有 append 模式。

- [#115908 Session transcript projection reconcile livelock (13 评论)](https://github.com/openclaw/openclaw/issues/115908)  
  核心会话稳定性问题：持续写入时主线程被同步重建循环卡死，导致所有渠道停摆。

- [#27445 [Feature]: `announceTarget` option for sub-agent completion announce routing (12 评论, 👍 5)](https://github.com/openclaw/openclaw/issues/27445)  
  多 agent 编排需求，用户希望子代理完成时先回到父会话再触发工作流，而非直接发到渠道。已有 linked PR。

PR 侧，最受关注的新功能包括 Mattermost 进度/最终回复分离（#120854）、Control UI 团队密钥管理（#121724）、从注册项目启动会话（#121465）、Codex 实时语音绑定现有会话（#119001）等。

## 5. Bug 与稳定性

按严重程度排列，仅列出代表性条目：

### P0 / Release Blocker（今日已关闭）
- [#43661 Session hangs indefinitely when compaction times out, causing repeated duplicate message sends (已关闭)](https://github.com/openclaw/openclaw/issues/43661)  
  压缩超时后会话进入静默失败循环，每 10 分钟重发同一消息。已关闭，影响面大。

### P1 开放 / 无明确 fix PR（高风险）
- [#121058 Silent reply failures still recurring (40 评论)](https://github.com/openclaw/openclaw/issues/121058)  
  静默回复失败在 #116277 关闭后仍复发，无 queued reply payload，需根因定位。
- [#115908 Session transcript projection livelock (P1)](https://github.com/openclaw/openclaw/issues/115908)  
  持续写入下主线程被同步重建循环卡死，事件循环阻塞数十秒。
- [#47975 Subagent sessions persist after completion, main session becomes unresponsive (P1)](https://github.com/openclaw/openclaw/issues/47975)  
  多个子代理结束后主会话无响应。
- [#97983 iOS/WebChat messages append to transcript but do not trigger/deliver assistant replies (P1)](https://github.com/openclaw/openclaw/issues/97983)  
  WebChat 消息入 transcript 但不触发回复，`--deliver` 也无法送达。
- [#92516 Containerized/self-hosted deploys can't use externalized channel plugins (P1)](https://github.com/openclaw/openclaw/issues/92516)  
  插件解耦后自托管渠道无法信任外部插件，导致 msteams 等渠道启动即崩溃。
- [#89278 Codex OAuth refresh succeeds but cron/heartbeat fail with 10s auth refresh timeout (P1)](https://github.com/openclaw/openclaw/issues/89278)  
  OAuth 探测成功但刷新超过 10s，所有 agent 流量 dead-end。
- [#113181 Cron delivery.mode="none" + isolated agent → silent no-op (P1)](https://github.com/openclaw/openclaw/issues/113181)  
  状态 ok 但 delivered=false 且无错误，cron 静默不执行。
- [#100941 Gateway drops concurrent in-process WEBSOCKET connections under parallel tool fan-out (P1)](https://github.com/openclaw/openclaw/issues/100941)  
  并行工具调用导致 1006 断开，误报 Gateway crash。
- [#119333 [codex] request_user_input is exposed in Default mode but rejected at runtime (P1)](https://github.com/openclaw/openclaw/issues/119333)  
  工具描述与运行时行为不一致，模型被引导调用非法工具。

### P1 开放 / 已有 fix PR 在途
- [#119087 Gateway cold start regressed ~2.5x (P1, linked-pr-open)](https://github.com/openclaw/openclaw/issues/119087)
- [#118793 Claude CLI "session limit" error dies instead of triggering fallback (P1, linked-pr-open)](https://github.com/openclaw/openclaw/issues/118793)
- [#120735 Telegram inbound stickers not staged to disk (P2, linked-pr-open)](https://github.com/openclaw/openclaw/issues/120735)
- [#119796 Windows vitest teardown EBUSY on agent state DB (P2, linked-pr-open)](https://github.com/openclaw/openclaw/issues/119796)
- [#40919 Session memory sync full delete-reinsert performance degradation (P2, linked-pr-open)](https://github.com/openclaw/openclaw/issues/40919)

### P1 / P2 已关闭（修复已落地）
- 重复/丢失消息类：Telegram 重复回复（#86519、#96242）、Claude CLI `No response requested.` 占位符（#90789）、Feishu/Telegram dispatch 失败（#114020）等。
- 会话卡死/溢出类：#70334、#84536、#88870、#93321 等。

### 值得关注的新 Bug
- [#119401 Direct/DM NO_REPLY suppression ignores silentReply policy](https://github.com/openclaw/openclaw/issues/119401)：小/本地模型无法强制可见回复，影响定制化部署。
- [#114154 bundle-mcp tool never bundled in agent sessions (P2)](https://github.com/openclaw/openclaw/issues/114154)：MCP 工具通过策略和 probe，但 agent 会话中 ToolSearch 找不到。
- [#49381 Feishu duplicate final replies after model failover (P2)](https://github.com/openclaw/openclaw/issues/49381)：限流后模型切换可能产生两条最终回复。

## 6. 功能请求与路线图信号

社区呼声最高的功能请求（按评论与 👍 排序）：

| Issue | 功能 | 热度 | 状态信号 |
|---|---|---|---|
| [#7707](https://github.com/openclaw/openclaw/issues/7707) | Memory Trust Tagging by Source | 33 评论 | 长期开放，无 linked PR |
| [#42475](https://github.com/openclaw/openclaw/issues/42475) | Gateway 层 per-agent 成本预算 | 15 评论 | linked-pr-open |
| [#27445](https://github.com/openclaw/openclaw/issues/27445) | 子代理完成 announceTarget 路由 | 12 评论，👍5 | linked-pr-open |
| [#33413](https://github.com/openclaw/openclaw/issues/33413) | Slack 线程显示工具级进度 | 9 评论，👍3 | 长期开放 |
| [#40786](https://github.com/openclaw/openclaw/issues/40786) | backup CLI 添加 .gitignore-like 排除规则 | 9 评论 | linked-pr-open |
| [#15032](https://github.com/openclaw/openclaw/issues/15032) | 子代理 per-spawn 工具限制（DMZ 防注入） | 7 评论 | linked-pr-open |
| [#38568](https://github.com/openclaw/openclaw/issues/38568) | 系统提示注入 context window % | 6 评论，👍2 | 长期开放 |
| [#28300](https://github.com/openclaw/openclaw/issues/28300) | Control UI 主题定制系统 | 6 评论，👍5 | 长期开放 |
| [#26037](https://github.com/openclaw/openclaw/issues/26037) | 阿里云百炼 Coding Plan 支持 | 5 评论，👍4 | linked-pr-open |
| [#9986](https://github.com/openclaw/openclaw/issues/9986) | 上下文超限触发模型 fallback | 5 评论 | 长期开放 |
| [#66010](https://github.com/openclaw/openclaw/issues/66010) | 子代理级联故障熔断器 | 4 评论 | 长期开放 |

结合今日 PR 动态，以下功能很可能进入下一版本：

- **Control UI 团队密钥管理**：#121724 已提交，提供浏览器端 typed 管理 SQLite secret store。
- **从注册项目启动会话**：#121465，替代裸 Gateway 路径，改善安全性与可用性。
- **Mattermost 进度隔离**：#120854，将临时进度与最终回复分离，降低渠道噪音。
- **Codex 原生实时语音绑定现有会话**：#119001，让 Codex Realtime 直接作为已有会话的“大脑”。
- **Codex 本地 hook relay kill-switch**：#121668，提供配置开关以缓解安全边界问题。
- **Slack 已加入线程 24h 后保持活跃**：#121708。
- **UI 队列消息重排**：#121682，允许在 composer 中调整等待发送消息的顺序。

## 7. 用户反馈摘要

- **修复不彻底，信任度受损**：  
  #121058 用户明确表示“监控 cron 在 #116277 关闭后继续记录新失败”——这会让社区对修复质量产生怀疑。
- **升级回归困扰**：  
  #86519 用户反馈从 2026.5.12 升到 5.20 后，Telegram 重复回复 2-10 次，升级到 5.22 只是从 8-10 次降到 2-3 次，仍未根治。
- **数据丢失痛点**：  
  #40001 指出 `write` 工具没有 append 模式，隔离 cron 会话共享 `memory/YYYY-MM-DD.md` 时必然产生覆盖，用户形容为“静默数据丢失”。
- **成本敏感**：  
  #80131 用户通过 profiling 发现 43 秒 TTFT 中约 14 秒消耗在 per-request auth（5.5s）与 tool bundling（8.9s）上，希望缓存这些不变化的阶段。
- **本地/小模型部署被策略“卡死”**：  
  #119401 反馈 `silentReply` 无法覆盖 DM 中的 `NO_REPLY` 抑制，本地模型用户无法选择总是可见回复，灵活性不足。
- **多 agent 工作流被阻塞**：  
  #47975 与 #27445 都显示子代理生命周期/路由设计尚未成熟，用户在构建多步骤协作时频繁遇到无响应或无法编排。
- **安全诉求上升**：  
  #7707 和 #15032 都从提示注入防御角度提出需求，用户希望 memory 与子代理工具权限能按信任来源隔离。

## 8. 待处理积压

以下为创建超过 5 个月、讨论热度高但仍开放的重要 Issue，建议维护者优先审视：

- [#7707 Memory Trust Tagging by Source（2026-02-03，33 评论）](https://github.com/openclaw/openclaw/issues/7707)  
  安全基础能力长期缺失，社区持续关注。
- [#9986 Trigger model fallback on context length exceeded（2026-02-05，5 评论）](https://github.com/openclaw/openclaw/issues/9986)  
  上下文超限时直接冻结，影响长会话可靠性。
- [#15032 Per-spawn tool restrictions for sub-agents（2026-02-12，7 评论）](https://github.com/openclaw/openclaw/issues/15032)  
  多 agent 安全关键功能，有 linked PR 但尚未合入。
- [#27445 `announceTarget` for sub-agent completion（2026-02-26，👍5）](https://github.com/openclaw/openclaw/issues/27445)  
  重要编排能力，linked PR 需尽快收敛。
- [#40001 Write tool lacks append mode（2026-03-08，13 评论）](https://github.com/openclaw/openclaw/issues/40001)  
  P1 数据丢失问题，已积压近 5 个月。
- [#42475 Per-agent cost budget at gateway（2026-03-10，15 评论）](https://github.com/openclaw/openclaw/issues/42475)  
  企业采用的关键需求，linked PR 应获得更高优先级。
- [#83598 anthropic:claude-cli OAuth refresh still dead-ends（2026-05-18，P1）](https://github.com/openclaw/openclaw/issues/83598)  
  针对 #73682 修复的复发问题，仍无 fix PR。
- [#89278 Codex OAuth 10s timeout breaks cron（2026-06-02，P1）](https://github.com/openclaw/openclaw/issues/89278)  
  影响所有 cron/心跳，无 fix PR。
- [#97983 iOS/WebChat 不触发回复（2026-06-30，P1）](https://github.com/openclaw/openclaw/issues/97983)  
  移动端核心链路缺陷，开放超一个月。

此外，长期开放的 PR 中，[#105643 fix(cli-runner): sweep orphaned bundle MCP temp dirs（2026-07-12）](https://github.com/openclaw/openclaw/pull/105643) 已等待近 1 个月，且涉及安全泄漏风险，建议维护者加速审查。

---

**总结**：OpenClaw 目前处于高吞吐迭代期，修复速度与问题产生速度都很快。社区最关心的三件事是：**消息不再重复/丢失、会话不再挂起、配置能细粒度控制安全与成本**。建议维护者优先处理 #121058 的根因复现，并推动 #7707、#42475 等长期高优功能落地，以增强社区信任。

---

## 横向生态对比

# AI 智能体开源生态横向对比分析报告

**日期：2026-08-11**
**分析对象：OpenClaw / Zeroclaw / PicoClaw / QwenPaw / hermes-agent / AstrBot**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正经历**高吞吐迭代与可靠性爬坡并存的阶段**：六个项目单日合计产生近千条 Issue/PR 动态，但共同挑战高度一致——消息重复/丢失、会话挂起、静默失败、安全隔离与成本治理。生态已从"能对话"的功能竞赛，转向**"可信赖、可治理、可嵌入生产环境"**的工程化竞赛。值得注意的是，头部项目（OpenClaw、hermes-agent）日合并 PR 量级已达百级，而中小项目（PicoClaw、AstrBot）仍以个位数吞吐运行，生态内部呈现明显的**梯度分化**。跨项目观察，会话稳定性、记忆安全、成本控制与多 Agent 编排是当前所有项目共同攻坚的核心方向。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | PR 合并/关闭率 | Release | 关键健康度信号 |
|------|------------|--------|---------------|---------|---------------|
| **OpenClaw** | 500（活跃382/关闭118） | 500（待合并359/关闭141） | 28.2% | 无 | 高吞吐但 #121058 修复复发损害信任，稳定性是短板 |
| **Zeroclaw** | 50 | 50（待合并50/关闭0） | **0%** ⚠️ | 无 | 社区活跃但合并通道完全停滞，贡献者积极性面临风险 |
| **PicoClaw** | 4（新开2/关闭2） | 9（待合并2/关闭7） | 77.8% | 无（v0.3.1） | 合并效率高，但长尾积压明显，最老 PR 耗时近5个月 |
| **QwenPaw** | 40（活跃34/关闭6） | 50（待合并30/关闭20） | 40% | 无（v2.1.0 发布准备中） | 修复存量+准备新版双线并行，健康度良好 |
| **hermes-agent** | 375（活跃335/关闭40） | 500（待合并398/关闭102） | 20.4% | 无 | 高吞吐修复，桌面端/macOS 稳定性欠账明显 |
| **AstrBot** | 4 | 10（合并2） | 20% | 无 | 稳定但规模较小，知识库 bug 1天内修复体现出高响应性 |

**关键发现**：
- **OpenClaw 与 hermes-agent 构成第一梯队**，单日 PR 合并量级均在百以上，远超其余项目。
- **Zeroclaw 的 0% 合并率是异常信号**——50 条 PR 全部待合并，若持续将导致社区贡献逆转。
- **PicoClaw 合并率高（77.8%）但绝对量小**，且积压 PR 周期过长，显示审查管道存在瓶颈。

---

## 3. OpenClaw 在生态中的定位

### 3.1 社区规模：绝对领先

| 指标 | OpenClaw | 对比说明 |
|------|----------|---------|
| 单日 Issue 动态 | 500 条 | 是 hermes-agent 的 1.3 倍、Zeroclaw/QwenPaw 的 10 倍 |
| 单日 PR 动态 | 500 条 | 与 hermes-agent 持平，但合并数更高（141 vs 102） |
| Open Issues 总量 | 11,000+（被外部引用） | hermes-agent 社区将其引为"需避免的膨胀案例" |
| 社区讨论深度 | 单 Issue 最高 40 评论 | 同类中最深，需求挖掘充分 |

### 3.2 技术路线差异

- **全功能聚合网关 + Agent 运行时**：OpenClaw 是六者中渠道覆盖最广（Telegram、Feishu、Slack、Mattermost、WebChat、iOS 等）、模型适配最全的项目。其设计目标是"一站式个人 AI 助手基础设施"。
- **对比参照**：
  - **Zeroclaw** 可视为 OpenClaw 的**安全重构对标者**——Rust 实现，强调安全审计与最小权限，在 Web 网关、插件出口策略上比 OpenClaw 更激进。
  - **PicoClaw** 是 OpenClaw 的**轻量边缘版**——面向 Raspberry Pi 等低算力环境，功能裁剪但保留核心 agent 循环。
  - **QwenPaw** 则围绕**通义模型生态**（Qwen/DeepSeek）构建，ReMe 记忆系统是其显著差异化。

### 3.3 优势与软肋

| 维度 | 评价 |
|------|------|
| **优势** | 社区规模第一、渠道/模型兼容性最强、新功能迭代速度最快（PR 合并率 28% 且绝对量大） |
| **软肋** | 修复质量受质疑——#121058"修复后复发"事件被社区点名；超大规模 issue 积压损害透明度（另一项目社区已将其作为反面案例引用） |

**定位总结**：OpenClaw 是生态的"基础设施型"项目，定义了大量通用范式（如 Telegram 渠道实现、compaction 机制），但其稳定性问题也为 Zeroclaw 等重构者提供了替代理由。

---

## 4. 共同关注的技术方向

以下方向在多个项目中独立涌现，说明是生态级共性需求：

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|---------|---------|
| **静默失败与可观测性** | OpenClaw（#121058）、PicoClaw（#3311）、AstrBot（#9600）、QwenPaw（#6820）、hermes-agent（#63047） | 用户无法区分"正在处理"与"卡死"；需要可感知的进度、错误反馈与超时机制 |
| **记忆安全与隔离** | OpenClaw（#7707 信任标签）、Zeroclaw（#9647 知识图谱隔离）、hermes-agent（#34352 多租户）、PicoClaw（#3297 远程元数据剥离） | 记忆按来源打信任标签；多 Agent/多租户场景下的数据隔离成为安全刚需 |
| **成本控制** | OpenClaw（#42475 网关预算）、hermes-agent（#37059 service_tier flex）、QwenPaw（#6724 超时配置） | 从"能用"到"用得起的"——网关级预算封顶、低成本模型自动切换、按调用覆盖服务层级 |
| **多 Agent 编排成熟化** | OpenClaw（#27445 announceTarget）、Zeroclaw（#7100 per-model config）、QwenPaw（子代理）、hermes-agent（#8457 持久会话内存）、PicoClaw（#3301 dispatch 路由） | 子代理生命周期管理、路由目标可配置、会话状态跨 Agent 正确传递 |
| **本地/小模型部署适配** | QwenPaw（#6831 ffmpeg PATH）、hermes-agent（#56004 本地 LLM 推理丢失）、Zeroclaw（#8999 小模型误解）、OpenClaw（#119401 NO_REPLY 策略） | 小模型无法处理复杂指令、本地推理超时、上下文压缩质量不足——轻量部署的体验鸿沟普遍存在 |
| **WebChat/移动端体验** | OpenClaw（#97983）、Zeroclaw（#9562 自动滚动）、QwenPaw（#6820 流式输出） | 移动/Web 端消息不触发回复、交互细节粗糙，渠道覆盖 ≠ 渠道可用 |
| **API 兼容性** | QwenPaw（#6803）、Zeroclaw（#8486 OpenAI 端点）、OpenClaw（#121746 Swift 模型刷新）、AstrBot（#9610 Telegram 贴纸） | 生态互操作成为增长杠杆——严格兼容 OpenAI 协议、修复 SDK/协议层模型生成问题 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 | 代表性特色 |
|------|---------|---------|---------|-----------|
| **OpenClaw** | 全功能个人 AI 助手；渠道、模型、插件全覆盖 | 重度个人用户、自托管爱好者、多模型/多渠道需求者 | Python + 中央网关 + 插件化渠道/模型适配层 | 生态最大、功能最全；Telegram/Feishu/Slack 等全渠道支持 |
| **Zeroclaw** | 安全优先的个人 AI 助手 | 安全敏感用户、企业 PoC、Rust 技术栈偏好者 | Rust + 安全审计内置（SSRF 门禁、命令风险分类、审计日志） | 将安全作为一等公民；多轮安全审计驱动开发（@belumume 系列） |
| **PicoClaw** | 轻量级边缘 Agent | Raspberry Pi / 低算力设备用户、嵌入式场景 | 轻量运行时 + Telegram/Discord 渠道 + 多 Agent dispatch | 低资源占用；分片消息稳定性、远程 exec 安全收紧 |
| **QwenPaw** | 通义/DeepSeek 生态桌面助手 | Qwen 模型用户、桌面端（macOS/Windows）重度用户、中文社区 | 桌面客户端（Tauri）+ ReMe 记忆系统 + MCP 工具生态 | ReMe 记忆系统（重排序、Auto-Dream）；v2.1.0 发布在即 |
| **hermes-agent** | AI 原生开发流程 Agent | 开发者/技术先驱、多租户部署者、TUI 爱好者 | Python + 网关/桌面/TUI 三端 + delegate 子代理 + 插件系统 | 社区深度参与开发（AI-assisted issue）；delegate 会话隔离；profile 导出密文擦除 |
| **AstrBot** | 中文 IM 渠道助理（QQ/Telegram） | 中文用户、QQ 生态依赖者、插件市场消费者 | Python + 插件市场 + 知识库混合检索引擎 | 中文社区活跃；知识库检索快速修复（1天闭环）；QQ 官方频道支持 |

**关键差异维度**：
- **OpenClaw vs Zeroclaw**：同一目标市场的"广度优先"与"安全优先"路线之争。
- **PicoClaw vs OpenClaw**：边缘轻量 vs 云端全能，而非直接竞争。
- **QwenPaw vs 其他**：唯一绑定特定模型生态（Qwen/DeepSeek）的桌面型选手。
- **hermes-agent vs OpenClaw**：开发者向 AI 原生协作 vs 消费者向全功能，但两者在渠道、插件上形成正面竞争。
- **AstrBot vs 其他**：最垂直——聚焦中文 IM + 插件市场 + 知识库，规模最小但用户粘性强。

---

## 6. 社区热度与成熟度

### 6.1 活跃度分层

```
第一梯队（单日百级合并）   OpenClaw (141)  >  hermes-agent (102)
第二梯队（单日十级合并）   QwenPaw (20)   >   Zeroclaw (0) ⚠️
第三梯队（个位数合并）     PicoClaw (7)   >   AstrBot (2)
```

### 6.2 阶段判断

| 阶段 | 项目 | 特征 |
|------|------|------|
| **快速迭代期** | OpenClaw、hermes-agent | 功能与修复并行，吞吐极高；但稳定性/桌面端质量存在欠账，属于"跑得快、磨得少" |
| **发布前收敛期** | QwenPaw | v2.1.0 Release Notes PR 已提交，正在进行存量 bug 清理与体验打磨，处于"收口"阶段 |
| **安全加固与治理期** | Zeroclaw | 安全审计驱动 + RFC 流程改革并行，但合并停滞表明治理尚未理顺，处于"转型阵痛"期 |
| **质量巩固期** | PicoClaw、AstrBot | 合并率高、修复迅速、社区响应好，但因规模限制，功能覆盖面和迭代速度有限 |

### 6.3 社区健康度交叉信号

- **最健康**：QwenPaw（40% 合并率 + 1 天修复响应）、AstrBot（KB bug 24 小时闭环）
- **最需关注**：Zeroclaw（0% 合并率）、OpenClaw（修复复发 + 11000+ open issues 的声誉压力）
- **隐性风险**：PicoClaw 的 stale 比例偏高（5 个月未合并的 PR 今日才关闭），贡献者体验预警

---

## 7. 值得关注的趋势信号

### 7.1 "可靠性"已取代"功能"成为第一竞争力
- **信号**：OpenClaw #121058"修复后复发"引爆社区情绪；PicoClaw #3311"静默重试无人应答"；AstrBot #9600"会话锁 30 分钟卡死"。三个不同规模的项目不约而同地被同类问题困扰。
- **启发**：Agent 具备"自我报告异常"的能力（区分处理中/已失败/需人工介入）将成为基础要求。

### 7.2 记忆系统从"存储"走向"信任管理"
- **信号**：OpenClaw #7707 提出记忆按来源打信任标签；Zeroclaw #9647 知识图谱隔离；hermes-agent #34352 多租户 memory 绕过 hook；QwenPaw ReMe 系统持续增强。
- **启发**：记忆投毒（prompt injection via memory）是 Agent 安全的下一主战场。"可信记忆"架构（来源标记、写权限隔离、审计恢复）将成标配。

### 7.3 成本治理成为企业采纳的前置条件
- **信号**：OpenClaw #42475 网关级预算封顶（linked PR）；hermes-agent #37059 service_tier flex 节省约 50% 成本；QwenPaw #6724 MCP 超时配置；OpenClaw #80131 profiling 显示 43 秒 TTFT 中 14 秒浪费在固定开销。
- **启发**：网关级预算、缓存优化、模型自动降级将成为多 Agent 部署的必选项。

### 7.4 多 Agent 协作急需"编排协议"
- **信号**：OpenClaw #27445 子代理完成路由（announceTarget）+ #47975 子代理后主会话无响应；Zeroclaw #7100 per-model 配置；hermes-agent delegate 会话隔离修复。
- **启发**：子代理生命周期（创建→执行→归还控制权→资源清理）缺乏标准模式，是事故高发区。具备明确编排语义（如回父会话 vs 直接发渠道）的框架将胜出。

### 7.5 本地/小模型部署的"体验鸿沟"被正视
- **信号**：QwenPaw #6831（ffmpeg PATH）、hermes-agent #56004（vLLM 推理丢失）、Zeroclaw #8999（小模型误解消息）、OpenClaw #119401（小模型无声）。
- **启发**：随着本地模型普及，Agent 需要针对小模型调整行为模式（更显式的输出、更保守的工具调用、更长的超时），而非假设所有模型能力均等。

### 7.6 安全不再是被动补丁，而是主动架构
- **信号**：Zeroclaw 的安全审计系列（7 个 P1 级发现持续推进）、PicoClaw #3297 远程 exec 默认禁用 + schema v4 迁移、hermes-agent profile 密文擦除合并。
- **启发**：安全默认值（deny-by-default）、可审计性、配置迁移路径，将成为 Agent 开源项目的"及格线"。

### 7.7 AI 原生开发流程被社区接受并期待
- **信号**：hermes-agent #56004 用户主动说"发 issue 比提交 PR 更适合让 agentic 工具实现修复"；#46260 AI-assisted 报告；PicoClaw #3298 第三方服务商主动提预设。
- **启发**：开源社区已开始习惯"与 AI 协作开发"。项目方应主动设计 AI-friendly 的贡献流程（结构化 issue 模板、自动 triage、AI 辅助 review），这将成为吸引贡献者的新变量。

---

**结论**：个人 AI 助手生态正处于"规模扩张→质量收敛"的转折点。OpenClaw 以绝对规模定义赛道，但稳定性信任危机正给 Zeroclaw、hermes-agent 等挑战者创造窗口。对技术决策者而言，**功能选型之外，需重点评估：可靠性记录（修复复发率）、记忆安全架构、成本治理能力、多 Agent 编排成熟度**——这四项将成为下一代 Agent 基础设施的分水岭。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-11

> 数据统计周期：2026-08-10 至 2026-08-11 | 数据来源：Zeroclaw GitHub 仓库

---

## 1. 今日速览

过去 24 小时 Zeroclaw 仓库保持极高活跃度：**50 条 Issue 更新、50 条 PR 更新**，但**合并/关闭数为 0**，说明社区提交与讨论旺盛，而维护侧合并通道出现积压。安全审计类 Issue（@belumume 系列）进入持续跟进阶段，多项 P1 安全缺陷仍处 in-progress；治理层面，RFC 流程改革（#9496）和决策队列追踪（#8692）成为社区讨论焦点。整体项目健康度良好，但需关注 **PR 合并停滞风险** 与 **累积的安全/稳定性修复积压**。

---

## 2. 版本发布

**无新版本发布。**

距离上一个版本 v0.8.3（Issue #9562 中用户提及）已有一段时间，当前 master 上已有大量待合并特性（OpenAI 兼容端点 #8486、Hailo-Ollama 支持 #9109 等），预计下一版本将包含较大变更。

---

## 3. 项目进展

今日**无 PR 被合并或关闭**，但这并不代表项目止步。值得关注的进展信号如下：

| 方向 | 代表 PR | 状态 |
|------|---------|------|
| **网关能力扩展** | #8486 [OpenAI Chat Completions 端点](https://github.com/zeroclaw-labs/zeroclaw/pull/8486) — 让 LangChain/OpenAI SDK/Continue.dev 等生态工具可直接接入 | 待合并，size:XL，needs-author-action |
| **提供商适配** | #9900 [OpenAI Codex 重试修复](https://github.com/zeroclaw-labs/zeroclaw/pull/9900)、#9109 [Hailo-Ollama 原生支持](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) | 待合并 |
| **渠道补全** | #9894 / #9893 [WhatsApp Web add_reaction/remove_reaction（#7535 rebase）](https://github.com/zeroclaw-labs/zeroclaw/pull/9894)、#8561 [Telegram 多消息流式模式](https://github.com/zeroclaw-labs/zeroclaw/pull/8561) | 待合并 |
| **CI/基础设施** | #9115 [Blacksmith 快速 runner](https://github.com/zeroclaw-labs/zeroclaw/pull/9115)、#9771 [clippy -D warnings 修复](https://github.com/zeroclaw-labs/zeroclaw/issues/9771) | 待合并 |
| **安全加固** | #9839 [禁止不可逆破坏性命令](https://github.com/zeroclaw-labs/zeroclaw/pull/9839)、#8713 [file_download SSRF 门禁](https://github.com/zeroclaw-labs/zeroclaw/pull/8713) | 待合并 |

**今日重大信号**：出现两项几乎相同的 WhatsApp Web reaction 实现 PR（#9894 与 #9893），均为 #7535 的 rebase。两个贡献者独立完成相同工作，提示维护者需尽快处理 #7535 的合并问题，避免社区重复劳动。

---

## 4. 社区热点

### 4.1 讨论最热 Issue TOP 3

| 排名 | Issue | 评论数 | 主题 |
|------|-------|--------|------|
| 1 | [#6808 RFC: Work Lanes, Board Automation, and Label Cleanup](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) | 23 | 工作流治理：板自动化与标签清理 |
| 2 | [#7100 RFC: Per-model capability & context-window config](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) | 13 | 模型能力与上下文窗口配置 |
| 3 | [#8692 Tracker: Maintainer decision queue](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) + [#9397 RFC: WhatsApp allowed_groups 默认 deny](https://github.com/zeroclaw-labs/zeroclaw/issues/9397) | 12×2 | 维护者决策队列 / WhatsApp 安全策略 |

### 4.2 热点分析

- **治理效率是当前社区最大诉求**。`#6808`（Work Lanes）与 `#9496`（RFC 流程简化）均指向同一个痛点：**决策速度跟不上项目增长**。#8692 维护者决策队列追踪器被创建，意味着社区试图通过结构化方式解决「RFC 积压、无人拍板」的问题。
- **安全审计引发广泛共鸣**。@belumume 发起的系列安全审计 Issue（#9397、#9393、#9395、#9392、#9389、#9391）每条都有 2-4 条评论且持续更新，社区对安全问题的关注度明显提升，且多为 P1 高优先级。
- **重复 PR 提示协作需要引导**。#9894 与 #9893 是同一功能的两份独立 rebase，说明社区贡献意愿强烈但沟通不足，维护者需要及时同步「已有人在做」的信息。

---

## 5. Bug 与稳定性

今日无新关闭的 Bug，但 50 条活跃 Issue 中包含大量已确认问题。按严重程度排列如下：

### S0 — 数据丢失 / 安全风险

| Issue | 描述 | 是否有 fix PR |
|-------|------|--------------|
| [#9647 知识图谱无 per-agent 归属](https://github.com/zeroclaw-labs/zeroclaw/issues/9647) | 任何 agent 可读写其他 agent 的知识，单一全局图 | ❌ 无 |
| [#9855 Matrix 无法解析 .well-known 委托](https://github.com/zeroclaw-labs/zeroclaw/issues/9855) | 绕过标准 homeserver 发现流程 | ❌ 无 |
| [#9627 git 写操作绕过风险分类器](https://github.com/zeroclaw-labs/zeroclaw/issues/9627) | `-C`/`--git-dir` 等全局选项绕过审批门禁 | ❌ 无 |

### S1 — 工作流阻塞

| Issue | 描述 | 是否有 fix PR |
|-------|------|--------------|
| [#9207 web_fetch 压缩响应乱码](https://github.com/zeroclaw-labs/zeroclaw/issues/9207) | gzip/brotli/deflate 响应返回垃圾二进制 | ❌ 无 |
| [#9425 运行中 SOP 无取消路径](https://github.com/zeroclaw-labs/zeroclaw/issues/9425) | Web 面板无法 Stop/Cancel 活跃 SOP | ❌ 无 |
| [#9035 Docker Compose 网关回环绑定](https://github.com/zeroclaw-labs/zeroclaw/issues/9035) | 端口映射后仍 Connection refused | ❌ 无 |
| [#9393 Bluesky/Reddit 无发送者授权](https://github.com/zeroclaw-labs/zeroclaw/issues/9393) | 无 central gate 覆盖 | ❌ 无 |
| [#9395 wasi:http 出口无目标策略](https://github.com/zeroclaw-labs/zeroclaw/issues/9395) | 插件 egress 无策略、无配置项 | ❌ 无 |
| [#9392 LINE 群消息跳过 allowlist](https://github.com/zeroclaw-labs/zeroclaw/issues/9392) | 绕过配对握手 | ❌ 无 |
| [#9389 未认证 /api/pair 锁定基于攻击者可控 header](https://github.com/zeroclaw-labs/zeroclaw/issues/9389) | 暴力破解防护可被绕过 | ❌ 无 |
| [#9779 sops_dir 默认值不生效](https://github.com/zeroclaw-labs/zeroclaw/issues/9779) | 文档默认值导致 SOP 静默不加载 | ❌ 无 |
| [#9391 命令审计日志默认开启但什么都不写](https://github.com/zeroclaw-labs/zeroclaw/issues/9391) | 安全审计形同虚设 | ❌ 无 |

### S2 — 降级行为

| Issue | 描述 | 是否有 fix PR |
|-------|------|--------------|
| [#9768 SIGUSR1 重载无效且警告误导](https://github.com/zeroclaw-labs/zeroclaw/issues/9768) | 告诉用户发信号，实际会杀死守护进程 | ✅ [#9897](https://github.com/zeroclaw-labs/zeroclaw/pull/9897) |
| [#8999 零代码流式用户消息被本地小模型误解](https://github.com/zeroclaw-labs/zeroclaw/issues/8999) | llama3.2 将问候当作协议/日志数据 | ❌ 无 |
| [#9562 WebChat 自动滚动覆盖手动滚动](https://github.com/zeroclaw-labs/zeroclaw/issues/9562) | 流式回复期间无法阅读历史 | ❌ 无 |
| [#9796 cron 帮助信息示例非法](https://github.com/zeroclaw-labs/zeroclaw/issues/9796) | add-at/add-every/once 示例有误 | ❌ 无 |

### S3 — 轻微问题

| Issue | 描述 |
|-------|------|
| [#9844 ZeroCode 仪表盘 CPU 指标误导](https://github.com/zeroclaw-labs/zeroclaw/issues/9844) | 显示的是 daemon CPU 而非 ZeroCode 进程 CPU |

---

## 6. 功能请求与路线图信号

### 6.1 高概率进入下一版本的功能

| 功能 | 依据 |
|------|------|
| **OpenAI 兼容端点**（#8486） | 大量外部工具依赖该协议，PR 已准备就绪，属于生态关键路径 |
| **自定义 CA 信任**（#9339） | 私有网络 MCP 服务器的刚需，已有 PR 相关讨论 |
| **PR 风险/尺寸标签自动重算**（#9345） | 已被 accepted，配合 CI 改进 |
| **rustdoc 警告门禁**（#9545） | 已被 accepted，防止文档质量回归 |

### 6.2 路线图信号 — RFC 状态一览

| RFC | 状态 | 方向 |
|-----|------|------|
| [#6808 Work Lanes / Board Automation](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) | Ratification deferred / rollout in progress | 工作流治理改进 |
| [#7100 Per-model capability & context-window](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) | accepted | 配置模型能力与上下文预算 |
| [#9496 Streamline RFC process](https://github.com/zeroclaw-labs/zeroclaw/issues/9496) | accepted | 降低决策门槛，加速 RFC |
| [#9530 Test-only changes risk precedence](https://github.com/zeroclaw-labs/zeroclaw/issues/9530) | accepted | 明确高风险路径测试变更的 risk 标定 |
| [#9397 WhatsApp allowed_groups 默认 deny](https://github.com/zeroclaw-labs/zeroclaw/issues/9397) | in-progress | 安全默认值 |

### 6.3 值得关注的新特性 PR（今日新提交）

- **#9900** [OpenAI Codex 非流式重试修复](https://github.com/zeroclaw-labs/zeroclaw/pull/9900) — 修复后端强制要求 streaming 时的错误重试
- **#9897** [修复 SIGUSR1 误导警告](https://github.com/zeroclaw-labs/zeroclaw/pull/9897) — 直接响应 #9768
- **#9898** [status 内存横幅后端解析修正](https://github.com/zeroclaw-labs/zeroclaw/pull/9898) — 修复「Memory: none」误导显示

---

## 7. 用户反馈摘要

### 真实痛点

1. **安全默认值不足**（多用户反馈）
   - `@belumume` 在 #9391 中指出：「命令审计日志默认开启但什么都不写」，安全功能形同虚设
   - `@metalmon` 在 #9647 中反馈：「任何 agent 可以读取和修改另一个 agent 捕获的知识」，多租户场景下数据隔离缺失

2. **文档与实现不一致**（`@Pratiikpy` 在 #9779 反馈）
   - 「文档说 sops_dir 有默认值，但 daemon 直接跳过 SOP 子系统，没有错误、没有警告、没有任何日志」

3. **工具可用性受损**（`@jhugard` 在 #9207 反馈）
   - 「web_fetch 对压缩响应返回垃圾数据，agent 完全无法解析」

4. **运维体验问题**（`@AngryPacifist` 在 #9768 反馈）
   - 「安全警告让操作员发送一个会杀死 daemon 的信号」，这不是一个可接受的建议

### 使用场景亮点

- `@Mental-Vortex` 引用上游 OpenClaw 的同类问题报告（#9562），说明用户在不同 AI 助手项目间迁移、对比体验，WebChat 的交互细节直接影响用户留存
- `@tidux`（#9545）提到「当前 workspace 已达到零 rustdoc 警告」，说明部分用户愿意投入时间维护工程质量，期待 CI 能守住这一成果

---

## 8. 待处理积压

### 8.1 长期未响应的关键 Issue

| Issue | 创建时间 | 沉默时长 | 优先级 | 备注 |
|-------|---------|---------|--------|------|
| [#5842 Codex CLI extra_args 安全告警](https://github.com/zeroclaw-labs/zeroclaw/issues/5842) | 2026-04-17 | ~116 天 | P2 / risk:high | 有过更新，仍在 in-progress |
| [#6808 Work Lanes RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) | 2026-05-20 | ~83 天 | P2 | 社区讨论 23 条，维护者未拍板 |
| [#7100 Per-model capability RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) | 2026-06-02 | ~70 天 | P1 / risk:high | 已 accepted，需落地 |

### 8.2 需要维护者关注的 PR（needs-author-action 之外）

以下 PR 长期处于待合并状态，且涉及安全或核心功能：

| PR | 创建时间 | 关注点 |
|----|---------|--------|
| [#8713 file_download SSRF 门禁](https://github.com/zeroclaw-labs/zeroclaw/pull/8713) | 2026-07-04 | 安全修复，size:XL |
| [#9002 Agent 回合在查看器断开后保持存活](https://github.com/zeroclaw-labs/zeroclaw/pull/9002) | 2026-07-11 | 核心体验修复 |
| [#8561 Telegram 多消息流式模式](https://github.com/zeroclaw-labs/zeroclaw/pull/8561) | 2026-06-30 | 渠道功能增强，size:XL |

### 8.3 风险提示

- **50:0 的 PR 合并比**（50 条 PR 待合并，0 条合并/关闭）值得警惕。如果这一趋势持续，社区贡献者的积极性可能受挫。
- 两项重复的 WhatsApp reaction PR（#9894 / #9893）同时存在，**维护者应尽快合并其一并关闭另一**，避免贡献者困惑。
- @belumume 的安全审计系列（#9389-#9397）已持续 2 周以上仍全部未关闭，建议维护者安排专项处理。

---

> **报告完**。本日报由 AI 分析师基于 GitHub 公开数据自动生成，旨在帮助维护者与社区快速掌握项目动态。如有数据偏差，以 GitHub 实际状态为准。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-11

## 今日速览

过去24小时项目整体活跃度中等偏上：共产生 **4 条 Issue 更新**（2 开 / 2 关）和 **9 条 PR 更新**（2 待合并 / 7 已合并关闭），无新版本发布。值得注意的是，今日闭合的 PR 中包含了 1 个**安全加固更新**（#3297）和 1 个**Telegram 富文本表格渲染功能**（#3327），显示项目在安全边界与渠道体验两个方向均有实质推进。但同时，多数待处理 Issue/PR 均带 `[stale]` 标记，且最老的 PR #1547（3月创建）与 #2132（3月创建）今日才被关闭，反映出项目存在**长尾积压与审查延迟**的迹象，需要维护团队关注。

---

## 版本发布

**无新版本发布。** 当前最新版本仍为 v0.3.1（commit `2cf030d2`）。

---

## 项目进展

今日合并/关闭的 PR 中，以下几项值得关注：

- **安全加固：远程提示与执行边界增强**（[#3297](https://github.com/sipeed/picoclaw/pull/3297)，已关闭）  
  将远程发送者与聊天元数据从 provider 系统指令中剥离，纳入标准化的 user-role envelope；远程 exec 默认禁用，启用时需逐调用独立审批，并在执行时强制校验来源策略；配置迁移至 schema v4。这是今日最重量级的变更，直接关系到多租户/远程场景下的安全模型。

- **Telegram 原生富消息表格渲染**（[#3327](https://github.com/sipeed/picoclaw/pull/3327)，已关闭）  
  在 Telegram 渠道中用 Bot API 富消息呈现 GFM/HTML 表格，替代以往等宽代码块方案，提升可读性。对重度使用 Telegram 机器人做数据汇报的用户是体验升级。

- **SplitMessage 围栏头挂起修复**（[#3295](https://github.com/sipeed/picoclaw/pull/3295)，已关闭）  
  修复了开 fence 信息字符串超过 `maxLen` 时 `SplitMessage` 死循环/挂起的问题，并补充回归测试。属于消息分片稳定性的关键修复。

- **Web 前端 pnpm 锁文件修复**（[#3326](https://github.com/sipeed/picoclaw/pull/3326)，已关闭）  
  移除 `pnpm-lock.yaml` 中重复的 `semver@7.8.5` 映射项，修复 `pnpm install --frozen-lockfile` 失败问题，保障 CI/开发环境可复现性。

- **旧 PR 收尾**：[#1547](https://github.com/sipeed/picoclaw/pull/1547) 将较早的 #1466/#1465 修复合并；[#2132](https://github.com/sipeed/picoclaw/pull/2132)（3月创建）实现了模型级 `max_tokens` 覆盖并修复配置键冲突——这两项延迟数月后今日终于关闭，说明维护者正在清理积压。

**总体判断**：项目在安全、渠道渲染、稳定性三个维度均有进展，且开始处理历史遗留 PR，是一个积极信号；但单日无新 release 落地，上述能力尚需等待下一版本整合发布。

---

## 社区热点

今日讨论最集中的是下面两个 Issue：

- **[#3301](https://github.com/sipeed/picoclaw/issues/3301)（[BUG] /clear 与自动压缩在经 dispatch rules 路由到非默认 agent 的聊天中失效）** — 评论 3 条，目前 OPEN  
  用户 `@j-v` 在 Raspberry Pi 环境（Discord/Telegram 渠道）使用 DeepSeek 模型时发现，当聊天通过 dispatch rules 路由到非默认 agent 后，`/clear` 命令和会话自动压缩均不生效。该问题直接关联多 agent 路由场景下的会话生命周期管理，反映测试覆盖可能偏重默认 agent 路径。

- **[#3311](https://github.com/sipeed/picoclaw/issues/3311)（[BUG] 工具反复以相同错误失败时静默循环至 max_tool_iterations，用户得不到任何答复）** — 评论 1 条，目前 OPEN  
  `@lucapette` 在生产环境（Telegram）观察到：当某个工具（如 `git` 命令）因缺少凭据等原因每次返回相同错误时，agent 会持续静默重试直到 `max_tool_iterations` 上限，用户消息石沉大海。这是一个**对用户信任伤害较大**的故障模式。

两个 Issue 的共性诉求是：**agent 行为可观测性不足**——无论是会话清理失效还是静默失败循环，用户都无法感知系统内部状态，最终表现为"机器人不理我"。该信号值得维护者在 agent 日志与用户反馈机制上做文章。

---

## Bug 与稳定性

按严重程度排列：

| 严重度 | Issue/PR | 状态与说明 |
|--------|----------|-----------|
| 🔴 高 | [#3311](https://github.com/sipeed/picoclaw/issues/3311)：相同工具错误反复触发时，agent 静默循环至 `max_tool_iterations`，用户无应答 | **已有修复 PR**：[#3312](https://github.com/sipeed/picoclaw/pull/3312) 已提交（OPEN），在重复相同工具失败时提前终止本轮，避免长时间无响应。 |
| 🟠 中 | [#3301](https://github.com/sipeed/picoclaw/issues/3301)：dispatch rules 路由到非默认 agent 后 `/clear` 与自动压缩失效 | 目前 OPEN，**无对应 fix PR**，需进一步定位——很可能与会话管理器未感知 dispatch 重定向有关。 |
| 🟡 中 | [#3314](https://github.com/sipeed/picoclaw/pull/3314)：`customAllowPatterns` 配置不生效，默认 deny 模式覆盖了用户添加的白名单命令 | 该 PR 本身即修复（修改 `guardCommand` 优先级），当前 OPEN，等待合并。 |
| 🟢 低 | [#3295](https://github.com/sipeed/picoclaw/pull/3295)：`SplitMessage` 在超大 fence 头时挂起 | **已关闭**（修复完成），有回归测试覆盖。 |

另外，[#3297](https://github.com/sipeed/picoclaw/pull/3297) 涉及远程 exec 安全边界收紧，会带来配置 schema 升级至 v4 的**破坏性变更**，部署时需按迁移指引更新配置文件，否则可能导致远程执行功能失效或被禁用。

---

## 功能请求与路线图信号

- **AI Router 官方预设支持**（[#3298](https://github.com/sipeed/picoclaw/issues/3298)，已关闭）  
  AI Router 维护者主动提议为 PicoClaw 添加一个 OpenAI 兼容 provider 预设，使用户可直接选择命名路由而非手动拼 `api_base`。虽然该 Issue 已被关闭（可能因维护者拒绝或转至内部讨论），但它揭示了第三方服务商对 PicoClaw 插件生态的兴趣。

- **Telegram 表格富消息渲染**（[#3327](https://github.com/sipeed/picoclaw/pull/3327)，已合并）  
  这不仅是 bug fix，也是 Telegram 渠道体验的功能增强，预计进入下一版本。

- **模型级 `max_tokens` 覆盖**（[#2132](https://github.com/sipeed/picoclaw/pull/2132)，已合并）  
  PR 支持按模型粒度配置 `max_tokens`，并修复配置键冲突，这是对多模型部署场景（如混合使用大上下文与小模型）的重要补充。

**路线图信号**：从近期合并内容看，开发重心集中在 ① 渠道消息体验（Telegram 富文本、SplitMessage 稳定性）、② 多 agent/多模型配置能力、③ 安全边界强化。`/list models` 只显示当前模型的问题（#3294）虽然被关闭，但用户对"配置可见性"的需求可能仍会回归。

---

## 用户反馈摘要

- **配置可见性不足**（来自 [#3294](https://github.com/sipeed/picoclaw/issues/3294)）：用户配置了多个模型后，`/list models` 仅显示当前模型，与命令"Configured models"的描述不符。用户期望看到全部配置项，暗示当前配置管理对多模型用户不够友好。

- **自定义命令白名单失效**（来自 [#3314](https://github.com/sipeed/picoclaw/pull/3314)）：用户按测试预期将 `git push` 加入 exec allow list 后仍无法执行，说明 `customAllowPatterns` 的文档与实际行为存在偏差，且默认 deny 策略优先级过高，让用户感到"配置被无视"。

- **长时间无响应导致信任危机**（来自 [#3311](https://github.com/sipeed/picoclaw/issues/3311)）：生产环境用户等待数分钟后仍无 reply，且没有任何错误提示，这是最影响口碑的体验问题——用户无法区分"正在处理"与"卡死"。

- **多 agent 路由场景体验割裂**（来自 [#3301](https://github.com/sipeed/picoclaw/issues/3301)）：会话清理/压缩只对默认 agent 生效，非默认 agent 的会话状态管理缺失，说明 dispatch rules 功能覆盖仍不完整。

---

## 待处理积压

以下为长期未闭环、需要维护者重点关注的项目：

| 项目 | 创建时间 | 问题 |
|------|----------|------|
| [#3311](https://github.com/sipeed/picoclaw/issues/3311) + [#3312](https://github.com/sipeed/picoclaw/pull/3312) | 2026-08-02 | 高影响 Bug 与修复 PR 均已停滞近 10 天且带 `[stale]` 标记，建议优先 review 合入。 |
| [#3301](https://github.com/sipeed/picoclaw/issues/3301) | 2026-07-29 | 多 agent 路由会话管理 Bug，当前无修复 PR，已 stale 且评论 3 条，用户持续关注中。 |
| [#3314](https://github.com/sipeed/picoclaw/pull/3314) | 2026-08-03 | 修复自定义命令白名单失效的 PR，处于 OPEN 且 stale，等待审查。 |
| [#3298](https://github.com/sipeed/picoclaw/issues/3298) | 2026-07-26 | 外部贡献者提出的 AI Router 预设需求，已被关闭但未给出替代方案说明，存在沟通不透明的风险。 |
| [#1547](https://github.com/sipeed/picoclaw/pull/1547) | 2026-03-14 | 今日终于关闭，但耗时近 5 个月，反映 PR 审查管道存在严重延迟——建议检查投入产出比，优化审查流程。 |

**项目健康度小结**：代码产出稳定（单日 7 个 PR 合并），但 issue/PR 的 stale 比例偏高，长尾积压明显。建议维护者：① 优先合入 #3312 与 #3314 两个已有修复；② 为 #3301 分配负责人并同步进展；③ 在项目文档中明确 stale 标记的判定与处置策略，避免社区贡献者困惑。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-11

---

## 1. 今日速览

过去 24 小时项目保持高强度迭代：**40 条 Issue 更新（新开/活跃 34 条，关闭 6 条）** 与 **50 条 PR 更新（待合并 30 条，已合并/关闭 20 条）**，二者均处于近期高位，社区活跃度显著。版本方面无新 Release，但 `v2.1.0` 的 Release Notes PR 已提交（#6875），预示发布进入倒计时。值得关注的是，Issue 中有多条指向 **2.0.1 与 2.1.0b2 的兼容性和稳定性问题**（插件市场维护、MCP 工具失效、前端渲染异常等），而 PR 侧则密集推进 Creator 插件增强、内存系统（ReMe）优化与窗口体验修复，整体呈现"修复存量 + 准备新版本"双线并行的健康态势。

---

## 2. 版本发布

**无**（过去 24 小时未发布新版本）

---

## 3. 项目进展

今日合并/关闭的 PR 中，4 项代表实质性的功能推进：

- **#6809 — fix(providers): sanitize Chat Completions content for strict providers** [已关闭]  
  修复严格 OpenAI 兼容提供商（如 StepFun）拒绝请求的问题，移除消息中的内部运行时字段。直接回应了 Issue #6803 的根因，对 API 兼容性意义重大。
  https://github.com/agentscope-ai/QwenPaw/pull/6809

- **#6878 — feat(console): add hidden-folders toggle to project directory picker** [已关闭]  
  为项目目录选择器增加隐藏文件夹显示开关，改善用户工作区文件浏览体验，尤其对使用点文件组织项目的用户友好。
  https://github.com/agentscope-ai/QwenPaw/pull/6878

- **#6615 — fix(config): handle corrupted agent config and invalid JSON in load_agent_config** [已关闭]  
  修复 `agent.json` 损坏或非法 UTF-8/JSON 时抛异常的问题，增强了配置加载的容错性 —— 对桌面用户升级/异常退出后恢复尤为重要。
  https://github.com/agentscope-ai/QwenPaw/pull/6615

- **#6398 — feat: add reranker support for ReMe memory search (backend)** [已关闭]  
  为 ReMe 记忆搜索新增后端重排序能力，支持候选过取 + 外部重排序 + 结果裁剪，是 ReMe4 路线图的重要组成。
  https://github.com/agentscope-ai/QwenPaw/pull/6398

此外，以下开放 PR 虽未合并但关键路径明确：

- **#6875 — chore: update release notes for v2.1.0**（准备 v2.1.0 正式版文档）
- **#6880 — feat(console): unify apps, plugins, and skills in the marketplace**（统一应用/插件/技能市场）
- **#6772 — feat(memory): add embedding hot updates and Daily Paper to ReMe Light**（扩展 ReMe Light 记忆能力）

**总体判断**：项目在 3 条主线上稳步前进 —— API 兼容性修复、记忆系统持续演进、v2.1.0 发布准备就绪。

---

## 4. 社区热点

| 排名 | Issue/PR | 评论数 | 核心诉求 |
|------|----------|--------|----------|
| 1 | [#6782 [Bug] 2.0.1 docker版本，插件市场、应用市场始终提示维护中](https://github.com/agentscope-ai/QwenPaw/issues/6782) | 9 | Docker 用户无法使用插件/应用市场，疑似版本更新后的核心功能不可用 |
| 2 | [#6803 [Bug] OpenAI-compatible chat requests carry Responses-API input_text content type + raw streaming fields](https://github.com/agentscope-ai/QwenPaw/issues/6803) | 6 | 严格提供商（StepFun）拒绝请求，API 兼容层存在结构性缺陷（已有 #6809 修复） |
| 3 | [#6811 [Bug] OpenAI Responses continuation summary ignores disable_thinking and misreports 60-second cancellation](https://github.com/agentscope-ai/QwenPaw/issues/6811) | 5 | 滚动压缩摘要调用不尊重 `disable_thinking`，且误判 60 秒取消为"格式错误" |
| 4 | [#6826 [Bug] 对话中助手消息结束时间显示异常](https://github.com/agentscope-ai/QwenPaw/issues/6826) | 5 | UI 显示助手耗时与实际思考耗时严重不符（2 分钟实际用时显示为几秒） |

**热点分析**：今日讨论热度集中在 **版本升级后的功能回归** 与 **多模型提供商兼容性** 两大主题。Docker 用户遭遇市场服务不可用，侧面反映镜像分发链路的健康度问题；API 兼容性问题则暴露出 QwenPaw 在对接异构模型提供商时的协议适配压力。值得注意的是 #6826 关联了 PR #6845 的修复（保留助手真实完成时间），预计将在 v2.1.0 中解决。

---

## 5. Bug 与稳定性

### 🔴 严重（核心功能不可用/崩溃）

- **#6782 — 2.0.1 docker版本，插件市场、应用市场始终提示维护中**  
  Docker 环境核心功能不可用，影响面广。尚无明确修复 PR，建议优先排查镜像内网络配置与市场服务地址连通性。
  https://github.com/agentscope-ai/QwenPaw/issues/6782

- **#6814 — SIGBUS (FS pagein 22) in sqlite3WalFindFrame while opening Scroll history.db on macOS**  
  macOS 上打开 Scroll 历史数据库时崩溃，属 SQLite WAL 模式底层崩溃，非模型推理问题。数据损坏风险高。
  https://github.com/agentscope-ai/QwenPaw/issues/6814

### 🟠 中等（功能异常/兼容性问题）

- **#6811 — OpenAI Responses continuation summary ignores `disable_thinking` and misreports 60-second cancellation**  
  压缩摘要调用不遵守思考禁用设置，且错误报告超时原因，影响长对话连续性。
  https://github.com/agentscope-ai/QwenPaw/issues/6811

- **#6828 — Console frontend at idle keeps repainting (~20% CPU) due to infinite CSS animations**  
  前端空闲时持续重绘，CPU 占用高达 18-22%（WebKit + WindowServer 合计约 40%），导致界面卡顿。属资源浪费型 Bug。
  https://github.com/agentscope-ai/QwenPaw/issues/6828

- **#6831 — Desktop (macOS) local Whisper shows "ffmpeg: disabled"**  
  macOS 下后端 PATH 不包含 `/opt/homebrew/bin`，无法发现 Homebrew 安装的 ffmpeg，本地语音识别不可用。
  https://github.com/agentscope-ai/QwenPaw/issues/6831

- **#6821 — reasoning_content relay fails for thinking-mode models → 400 BadRequestError**  
  基于 DeepSeek V4 等多轮对话时未回传 `reasoning_content`，严格思维模式 API 报错。影响使用思维链模型的用户。
  https://github.com/agentscope-ai/QwenPaw/issues/6821

- **#6803 — OpenAI-compatible requests rejected by strict providers**  
  **✅ 已有修复：#6809（已合并）**。该修复清理了消息中的内部字段，预计后续版本生效。
  https://github.com/agentscope-ai/QwenPaw/issues/6803

### 🟡 轻度/体验类

- **#6820 — 前端 UI 未实时显示模型输出/工具调用/思考过程**  
  流式响应全部完成后一次性展示，用户无法观察过程。体验类 Bug，暂无明确修复 PR。
  https://github.com/agentscope-ai/QwenPaw/issues/6820

- **#6839 — MCP 工具调用时，像数字的字符串以数字格式传参**  
  参数类型推导错误导致 MCP 调用失败，影响工具生态稳定性。
  https://github.com/agentscope-ai/QwenPaw/issues/6839

- **#6826 — 助手消息结束时间显示异常**  
  **✅ 已有修复：#6845（待合并）**。修复保留 `finished_at` 真实时间戳，避免历史加载时时间被替换为消息创建时间。
  https://github.com/agentscope-ai/QwenPaw/issues/6826

---

## 6. 功能请求与路线图信号

### 高频信号（可能进入近期版本）

- **窗口大小和位置记忆**（#4634，5月22日提出）  
  已有对应 PR **#6877 — feat(desktop): remember window geometry**（开放中），使用 Tauri 官方 window-state 插件持久化位置和尺寸。预计随 v2.1.0 或后续版本上线。
  - Issue: https://github.com/agentscope-ai/QwenPaw/issues/4634
  - PR: https://github.com/agentscope-ai/QwenPaw/pull/6877

- **MCP 工具调用超时可配置**（#6724，8月5日提出）  
  当前无超时上限，慢 MCP 服务器可无限阻塞回合。尚无对应实现 PR，但代码级别已明确 `MCPClientConfig` 缺少 `timeout` 字段，属中等优先级增强。
  https://github.com/agentscope-ai/QwenPaw/issues/6724

- **Auto-Dream 单单元失败容错**（#6841，8月9日提出） + **#6884 PR（fix: make Auto-Dream integration resilient）**  
  单个集成单元返回空 schema 导致整个任务标记为 error，成功单元也受影响。已有开源贡献者提交修复 PR（开放中），采纳概率高。
  - Issue: https://github.com/agentscope-ai/QwenPaw/issues/6841
  - PR: https://github.com/agentscope-ai/QwenPaw/pull/6884

- **会话标题随自动记忆更新自动刷新**（#6881，8月10日提出）  
  结合 ReMe 自动记忆的会话标题同步能力，可能被纳入后续 ReMe 迭代。
  https://github.com/agentscope-ai/QwenPaw/issues/6881

### 值得关注

- **任务面板折叠/收纳**（#6876，已关闭） — 用户反馈后台任务卡片占满聊天窗口，虽已关闭但需求真实存在，未来可能以 UI 优化形式回归。
- **ReMe4 路线图时间线**（#6840） — 用户明确询问 ReMe Light 到全套 ReMe4 的规划时间线，提示社区对该路线图有较高期待。
- **按字符接收数动态显示的关闭开关**（#6585） — UI 细节优化，社区有共鸣但仍待采纳。

---

## 7. 用户反馈摘要

从今日活跃的 Issue 评论中提炼的关键声音：

**真实痛点**

- **Docker 用户被边缘化**（#6782）：2.0.1 版本插件市场不可用，多名用户反馈，目前仍无 workaround，影响核心使用。
- **杀软误杀问题**（#6847）：QwenPaw 执行任务时频繁被杀软拦截甚至强制关停，同一任务在其他 Agent 工具未被拦截。"Qwenpaw会被杀软打死，WorkBuddy不会" —— 可见行为差异可能源于代码签名缺失或行为模式被误判，对 Windows 用户体验影响深刻。
- **工作区文件污染**（#6866）：agent 执行过程中自动生成大量临时 py/sh 文件，用户试图用提示词指定临时目录但不确定是否有效，侧面反映沙箱隔离能力不足。
- **记忆系统提示误导**（#6853）：`prompts.py` 声称 dream 流程会同步摘要到 MEMORY.md，但实际从未实现，用户基于文档理解功能时产生认知偏差，信任受损。

**满意之处**

- 部分用户对 2.1.0b2 的 ReMe Light 集成持积极态度（#6840），主动对照代码与路线图文档核验实现进度，说明核心用户群具备较深的技术参与度。
- 多个功能请求（窗口记忆、MCP 超时、Auto-Dream 容错）均在短时间内获得 PR 响应，社区对维护团队的响应速度整体认可。

---

## 8. 待处理积压

以下为长期未关闭、值得维护者重点关注的 Issue/PR 清单：

| 编号 | 类型 | 标题 | 创建时间 | 最近更新 | 积压时长 | 备注 |
|------|------|------|----------|----------|----------|------|
| [#4237](https://github.com/agentscope-ai/QwenPaw/issues/4237) | Feature | In-chat observability for running shell commands — see, kill, or extend timeout per command | 2026-05-12 | 2026-08-10 | **91 天** | 高价值功能：会话内查看命令执行 +  kill/续时。已有明确技术方案（复用 approval-card）。至今无 PR |
| [#4634](https://github.com/agentscope-ai/QwenPaw/issues/4634) | Feature | 窗口大小和位置记忆 | 2026-05-22 | 2026-08-10 | **81 天** | 已有 PR #6877，期待尽快合入 |
| [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) | PR | Add per-session model overrides | 2026-07-12 | 2026-08-10 | **30 天** | 首个贡献者 PR，单 Agent 支持不同会话使用不同模型。开放 30 天未获 review，需关注 |
| [#6405](https://github.com/agentscope-ai/QwenPaw/issues/6405) | Question | 升级 2.0 后 MCP 工具总是提示 Tool not found | 2026-07-23 | 2026-08-10 | **19 天** | 影响面广（Docker 用户 + MCP 工具链），至今无官方回复 |
| [#6772](https://github.com/agentscope-ai/QwenPaw/pull/6772) | PR | feat(memory): add embedding hot updates and Daily Paper to ReMe Light | 2026-08-06 | 2026-08-10 | **5 天** | 大规模 ReMe 增强（5 天未合并尚属正常，但需持续跟踪） |

**维护者建议**：优先响应 #6405（MCP 找不到工具）和 #6782（Docker 市场不可用）—— 两者均涉及 2.0.1 核心可用性，且用户已等待 **3-5 天** 无官方介入。同时，首个贡献者 PR #5992 已静默 30 天，建议安排 reviewer 评估，避免挫伤外部贡献积极性。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报 — 2026-08-11

## 1. 今日速览

过去 24 小时 hermes-agent 仓库保持极高活跃度：共产生 **375 条 Issue 动态**（新开/活跃 335 条，关闭 40 条）与 **500 条 PR 动态**（待合并 398 条，合并/关闭 102 条），合计约 900 项事件，PR 合并/关闭率 20.4%，修复吞吐健康。**无新版本 Release**。今日无新增 P0 级事故，但桌面端稳定性问题（macOS 27 beta 卡死、FDA 权限被撤销、TUI overlay 不可见）持续发酵且仍无修复 PR；社区讨论热度最高的 xAI OAuth 403 问题（31 评论）已关闭。安全侧有一项重要进展：**profile 导出密文擦除 PR 已合并**，另有 delegate 会话隔离的 P1 修复合入。整体判断：项目处于"高吞吐修复 + 桌面端与 Windows 平台稳定性欠账并存"的状态。

## 2. 版本发布

（过去 24 小时无新版本发布，本节省略）

## 3. 项目进展

过去 24 小时共合并/关闭 **102 个 PR**。在展示的 Top 20 PR 中，已合并/关闭的重点如下：

- **P1 delegate 会话隔离修复落地**：[PR #81343](https://github.com/NousResearch/hermes-agent/pull/81343) `fix(delegate): subagents get a dedicated SessionDB, not the parent's`，关闭 [#81267](https://github.com/NousResearch/hermes-agent/issues/81267)。修复 cron 任务在 `finally` 中关闭 per-job SessionDB 后，后台 fire-and-forget 委托子代理仍在 daemon 线程 flush 同一句柄导致的崩溃（`'NoneType' object has no attribute`）。这是对 session-state 风险类问题的一次核心补强。
- **安全：profile 导出密文擦除**：[PR #83458](https://github.com/NousResearch/hermes-agent/pull/83458) `Scrub secrets from profile export archives`。此前导出包已排除 `auth.json`/`.env`，但 skills、`SOUL.md`、memories 中的 secret 形状字符串仍会随 `.tar.gz` 流出；现在对暂存副本强制执行 `redact_sensitive_text(force=True)`。属应写入 release notes 的安全改进。
- **插件能力：受信任的同轮最终回复按钮**：[PR #83254](https://github.com/NousResearch/hermes-agent/pull/83254) 新增 `PluginContext.attach_final_reply_link_buttons`，通过 `ContextVar` 实现 task-local 状态隔离、一次性替换语义与并发隔离，为网关/桌面端最终回复附加可点击操作按钮提供了正式通道。

同时 40 个 Issue 被关闭，包括今日热度最高的 **[#26847](https://github.com/NousResearch/hermes-agent/issues/26847)（xAI OAuth 403）**、**[#77780](https://github.com/NousResearch/hermes-agent/issues/77780)（lifecycle_guard nul-byte 崩溃）**、**[#46260](https://github.com/NousResearch/hermes-agent/issues/46260)（Windows 安装器失败）**、**[#34120](https://github.com/NousResearch/hermes-agent/issues/34120)（cronjob create 必现失败）**、**[#58437](https://github.com/NousResearch/hermes-agent/issues/58437)（MoA quiet 模式丢 tool_calls）** 以及 **[#82616](https://github.com/NousResearch/hermes-agent/issues/82616)（state.db FTS 损坏下的会话连续性追踪）**，说明对应修复已合入或完成追踪闭环。

## 4. 社区热点

- **[#26847] xAI OAuth 对标准 SuperGrok 订阅者返回 HTTP 403**（31 评论，已关闭）：[链接](https://github.com/NousResearch/hermes-agent/issues/26847)。今日热度最高。用户确认 OAuth 登录流与 token 存储均正常，失败发生在 xAI 后端——只对 Heavy 档放行，与 2026-05-15 集成公告"所有档位可用"的文档承诺冲突。核心诉求是**文档准确性**与**订阅档位映射透明化**。
- **[#63047] Desktop 在 macOS 27 beta 上约 5 条消息后完全无响应**（27 评论，P1）：[链接](https://github.com/NousResearch/hermes-agent/issues/63047)。UI 完全冻结且 Settings 也被锁死，只能等待或强退；与 #40692 的输入延迟不同，属完全冻结，评论区持续补充复现细节。
- **[#34352] 多租户 Hermes 问题**（20 评论）：[链接](https://github.com/NousResearch/hermes-agent/issues/34352)。作者在生产环境跑了数月修复，指出 memory 操作完全绕过 hook 系统，不 fork 核心就无法实现租户隔离。带 `needs-decision` 标签，属架构级讨论。
- **[#8457] 持久 Session Memory + 跨会话搜索 + 自动压缩**（19 评论）：[链接](https://github.com/NousResearch/hermes-agent/issues/8457)。会话内存目前是瞬态的，网关重启即丢失；用户希望 MemoryManager 具备跨重启持久化能力。
- **[#52010] macOS 每次更新后 Full Disk Access 被撤销**（18 评论，P1）：[链接](https://github.com/NousResearch/hermes-agent/issues/52010)。FDA 与 Accessibility/Microphone 问题相互独立，每次升级都需手动重授，桌面端用户摩擦感强。
- **[#7335] "超过 1000 个 open issues"**（14 评论，已关闭）：[链接](https://github.com/NousResearch/hermes-agent/issues/7335)。社区对 issue 膨胀速度表示担忧，援引 OpenClaw 11000+ open issues 作为反面案例，反映出**维护容量焦虑**。
- **[#56004] Qwen3.6/vLLM 重放时丢失 prior-turn reasoning**（9 评论，5 👍）：[链接](https://github.com/NousResearch/hermes-agent/issues/56004)。用户刻意选择发 issue 而非直接提交 PR，理由是"相信 agentic 工具能实现同样修复"——这本身也是社区对项目 AI 原生开发流程的认可信号。

## 5. Bug 与稳定性

按严重程度排列（P0 → P2），并标注是否已有修复 PR：

**P0**
- **rewind truncation 定位不稳定**：[PR #83202](https://github.com/NousResearch/hermes-agent/pull/83202)（open，P0）为 [#82959](https://github.com/NousResearch/hermes-agent/issues/82959) 提供 durable SQLite `row_id` 寻址，替代按 user-turn 序号的截断方式，覆盖 Gateway 与 Desktop 的 rewind/edit/regenerate 场景。修复已提交但**尚未合并**。

**P1**
- **Desktop 约 5 条消息后完全无响应**（macOS 27 beta）：[#63047](https://github.com/NousResearch/hermes-agent/issues/63047)。无关联 fix PR。
- **TUI `/sessions`、`/models` overlay 不可见**：[#69592](https://github.com/NousResearch/hermes-agent/issues/69592)。已影响 13+ 天，核心 TUI 工作流（恢复会话/切换模型）不可用，`/reload` 静默失败。无关联 fix PR。
- **macOS 每次更新后 FDA 权限被撤销**：[#52010](https://github.com/NousResearch/hermes-agent/issues/52010)。无关联 fix PR。
- **state.db FTS 损坏导致网关会话连续性破坏**：[#82616](https://github.com/NousResearch/hermes-agent/issues/82616)（tracking 类，已关闭）。涉及孤儿会话 fork 与重启后 stale-session 恢复，关闭原因未在数据中说明。

**P2**
- **压缩后 agent turn 失败并误导提示 "full disk"**：[#82001](https://github.com/NousResearch/hermes-agent/issues/82001)。根因是 session-identity 交接缺口，磁盘与 `state.db` 均健康。无 fix PR。
- **MCP Client 未保留 Mcp-Session-Id**：[#81793](https://github.com/NousResearch/hermes-agent/issues/81793)。initialize 握手后所有调用返回 HTTP 400。无 fix PR。
- **Windows `search_files` 绝对路径失败**（双报告）：[#63177](https://github.com/NousResearch/hermes-agent/issues/63177) 与 [#67629](https://github.com/NousResearch/hermes-agent/issues/67629)（后者标记为 duplicate）。`_bash_safe_path` 将 `D:\` 改写为 `/d/`，原生 rg 无法解析。无 fix PR。
- **Desktop 空闲时 Renderer/GPU 进程 100%+ CPU**：[#73082](https://github.com/NousResearch/hermes-agent/issues/73082)。macOS 上报为最高耗电应用，机器明显发热。无 fix PR。
- **Python 3.14 下 DaemonThreadPoolExecutor 崩溃**：[#58596](https://github.com/NousResearch/hermes-agent/issues/58596)。`_initializer`/`_initargs` 属性被移除，影响 delegate_task、async delegation、skills hub fan-out、memory sync。无 fix PR。
- **`terminal.cwd` 配置被本地后端静默丢弃**：[#42961](https://github.com/NousResearch/hermes-agent/issues/42961)。无 fix PR。
- **WeChat 网关对同一消息生成两条独立回复**：[#44497](https://github.com/NousResearch/hermes-agent/issues/44497)。带 `needs-repro`。无 fix PR。

**今日新增/活跃的修复 PR（尚未合并）**
- **[#83480](https://github.com/NousResearch/hermes-agent/pull/83480)**：关闭泄漏 `state.db` fd 的临时 SessionDB 句柄，解决长跑网关 `[Errno 24] Too many open files`。
- **[#83476](https://github.com/NousResearch/hermes-agent/pull/83476)**：跨平台 `StableProcessHandle`（Linux pidfd / Windows process handle）防止 stale-process 清理误杀 recycled PID，并加固 WhatsApp bridge 启动。
- **[#83477](https://github.com/NousResearch/hermes-agent/pull/83477)**：cron 按精确名称运行/暂停/恢复任务时，避免先触发全量 list 扫描导致模型漏判。

## 6. 功能请求与路线图信号

- **多租户/租户隔离（架构级）**：[#34352](https://github.com/NousResearch/hermes-agent/issues/34352) 带 `needs-decision`，若采纳将触及 memory 层 hook 架构，属大版本级路线图项。
- **持久会话内存 + 跨会话搜索 + 自动压缩**：[#8457](https://github.com/NousResearch/hermes-agent/issues/8457)。与今日活跃 PR **[#69606](https://github.com/NousResearch/hermes-agent/pull/69606)**（memory prefetch/query 超时改为可配置，解决 ByteRover 等本地 LLM 冷启动）方向一致，说明外部 memory provider 支持正在持续推进。
- **cron 硬编码 `skip_memory=True`**：[#9763](https://github.com/NousResearch/hermes-agent/issues/9763)。若 memory 可配置化落地，此问题大概率顺带解决。
- **Mistral `reasoning_effort` 原生支持**：[#11243](https://github.com/NousResearch/hermes-agent/issues/11243)，8 👍。与 PR **[#37059](https://github.com/NousResearch/hermes-agent/pull/37059)**（OpenAI/Gemini `service_tier: flex`，约 50% 成本节省）及 **[#83398](https://github.com/NousResearch/hermes-agent/pull/83398)**（TUI/Desktop 会话漏传已配置的 service_tier）共同指向"**服务层级与推理参数从配置到线上的全链路透传**"这一明确方向。
- **agent 自我配置白名单**：[#28024](https://github.com/NousResearch/hermes-agent/issues/28024)。允许 agent 修改 `stt.enabled`、`tts.provider`、`display.skin` 等非安全配置，恢复 PR #14639 删除的能力。
- **无障碍改进（VoiceOver）**：[#26689](https://github.com/NousResearch/hermes-agent/issues/26689)。盲人用户提交，TUI/CLI 对屏幕阅读器不友好。
- **image_generate 支持按调用覆盖模型**：[PR #83478](https://github.com/NousResearch/hermes-agent/pull/83478)（open）。FAL 等后端已支持 per-call model override，当前被 `config.yaml` 锁死。
- **技能认证 SkillSeal**：[PR #83487](https://github.com/NousResearch/hermes-agent/pull/83487)（open）。新增 bundled skill 用于第三方技能的可信验证（`SKL-XXXX-XXXX-XX`）与认证签发。

## 7. 用户反馈摘要

- **订阅档位与文档不符（信任受损）**：[#26847](https://github.com/NousResearch/hermes-agent/issues/26847) 中用户明确表示"OAuth 流程和 token 存储都正常，失败在 xAI 后端"——标准 SuperGrok（$30/月）用户被 403，而文档宣称 all tiers。这是"文档承诺 vs 实际执行"的典型摩擦点，也是今日评论数最高的议题。
- **macOS 桌面端权限与稳定性噩梦**：[#52010](https://github.com/NousResearch/hermes-agent/issues/52010) 用户反馈每次更新后都要手动重授 FDA，高频且强制；[#63047](https://github.com/NousResearch/hermes-agent/issues/63047) 用户面对完全冻结的 UI，连 Settings 都无法打开。
- **Windows 平台是明显薄弱环节**：[#63177](https://github.com/NousResearch/hermes-agent/issues/63177) 与 [#67629](https://github.com/NousResearch/hermes-agent/issues/67629) 双报告证明 `search_files` 绝对路径问题真实且高频；[#46260](https://github.com/NousResearch/hermes-agent/issues/46260) 的 Windows 安装器失败（已关闭）亦佐证平台适配欠账。
- **社区认可 AI 原生协作方式**：[#56004](https://github.com/NousResearch/hermes-agent/issues/56004) 用户主动说明"发 issue 比提交 PR 更适合让 agentic 工具实现修复"；[#46260](https://github.com/NousResearch/hermes-agent/issues/46260) 标注为 AI-assisted 报告。用户已习惯并接受项目的 AI 驱动开发协作模式。
- **维护容量焦虑**：[#7335](https://github.com/NousResearch/hermes-agent/issues/7335) 用户担心 open issues 超过 1000 后增长失控，并援引 OpenClaw 11000+ issues 作为反面案例，希望项目方控制膨胀。

## 8. 待处理积压

以下为长期未修复/未决策且重要性较高的事项，建议维护者优先关注：

- **[#63047] P1 Desktop 完全无响应（macOS 27 beta）** — 创建 2026-07-12，已 30 天，27 条评论，无 fix PR。
- **[#52010] P1 macOS FDA 每次更新被撤销** — 创建 2026-06-24，已 48 天，18 条评论，无 fix PR。
- **[#69592] P1 TUI `/sessions` overlay 不可见** — 创建 2026-07-22，已 20 天，用户标注 "Day 13"，11 条评论，无 fix PR。
- **[#34352] P3 多租户方案（needs-decision）** — 创建 2026-05-29，已 74 天，20 条评论，带生产验证修复方案，等待架构决策。
- **[#8457] P3 持久 Session Memory（needs-decision）** — 创建 2026-04-12，已 121 天，19 条评论。
- **[#56004] P2 Qwen prior-turn reasoning 丢失** — 创建 2026-07-01，已 41 天，5 👍。
- **[#26689] P3 VoiceOver 无障碍改进** — 创建 2026-05-16，已 87 天，13 条评论。
- **[#58596] P2 Python 3.14 兼容（DaemonThreadPoolExecutor）** — 创建 2026-07-05，已 37 天，3 👍，影响所有并发功能。
- **[#22054] P2 venv PATH 注入遮蔽系统 Python 3.11** — 创建 2026-05-08，已 95 天，2 👍，影响 Linux/macOS 开发环境。
- **[#81793] P2 MCP Client 不保留 Mcp-Session-Id** — 创建 2026-08-08，影响面大（所有后续 MCP 调用 400），等待修复。

---

*数据来源：NousResearch/hermes-agent GitHub 仓库，统计窗口 2026-08-10 ~ 2026-08-11。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-08-11

## 今日速览

AstrBot 项目今日处于高度活跃状态，过去 24 小时内收到 4 条 Issue 更新和 10 条 PR 更新，其中 2 条 PR 已合并、2 条 Issue 已关闭。社区贡献者持续为项目注入活力，最值得关注的是知识库检索回归问题（#9613）在 1 天内即获得修复 PR（#9618）并被合并，修复效率非常高。同时，Windows 本地 Shell 支持 PowerShell 7（#9614 → #9622）和插件市场下载量排序（#9570）两个功能类 PR 均在推进中。整体项目健康度良好，社区参与度活跃，但仍有部分功能请求（如 #9600 会话锁异常）和积压 PR 需要维护者关注。

## 项目进展

今日合并/关闭了 2 个 PR，项目在稳定性和细节体验上持续打磨：

- **PR #9618 — 修复知识库混合检索引擎回归**（fix(kb): restore complete knowledge base retrieval results）：这是针对 Issue #9613 的快速修复。PR #9455 引入的文档级去重和每库独立 min-max 归一化导致长文档中相关内容块被丢弃、单文档知识库被放大。该 PR 恢复了完整的检索结果，改进了多知识库场景的排序逻辑。从 Issue 提出到修复仅 1 天，体现了项目组对检索质量的高度重视。
- **PR #9610 — 修复 Telegram 动画表情缩略图**（fix(telegram): use static thumbnail for animated stickers）：此前 Telegram 动画贴纸（animated stickers）不会被作为图片传给模型，模型只能根据贴纸关联的 emoji 猜测内容。此 PR 让动画贴纸使用静态缩略图（thumbnail）传递，修复了 Telegram 平台的视觉理解能力。

上述修复后，项目整体在知识库检索准确性、Telegram 平台兼容性两方面向前迈进了一步。

## 社区热点

- **[Issue #9600] 事件循环触发会话锁异常（2 条评论）** — [链接](https://github.com/AstrBotDevs/AstrBot/issues/9600)
  这是今日最值得关注的社区讨论点。用户 @FeiLongQi 报告，在私聊中发送文件（如 xlsx/pdf）或引用这类文件的消息时，会话锁被触发但无法自动调用文件处理工具，直到 30 分钟超时后才释放。用户提到关闭所有第三方插件后仍复现，触发频率高达 90%，且 `event_loop_watchdog.log` 中没有记录任何日志。
  
  分析：该问题波及核心会话管理机制，且高频复现，背后可能涉及事件循环竞态条件或会话锁代码路径的逻辑缺陷。目前尚无对应修复 PR，建议维护者优先排查。

- **[Issue #9614] Windows 本地 Shell 支持 PowerShell 7（👍 1）** — [链接](https://github.com/AstrBotDevs/AstrBot/issues/9614)
  用户 @C10H14N2O5 提出 AstrBot 在 Windows 本地运行时硬编码使用 `powershell.exe`（即 Windows PowerShell 5.1），希望支持在 WebUI 中配置使用 PowerShell 7，以使用 `&&`、`??` 等新语法。

  分析：此请求反映了开发者用户群体对现代 Shell 工具链的需求，社区响应积极。该 Issue 已在发布后数小时内收到对应的 PR #9622，这是一次典型的社区驱动的快速需求响应。

## Bug 与稳定性

| 严重程度 | 问题 | 状态 | 对应修复 |
|---------|------|------|---------|
| 🔴 高 | **#9600 事件循环触发会话锁异常**：发文件消息导致会话锁无法自动释放，直至 30 分钟超时，任务卡死 | OPEN | 暂无 |
| 🟠 中 | **#9613 知识库混合检索结果数量骤减**：v4.27.2 升级后单文档只返回一个分块、多知识库排序被带偏（回归自 #9455） | CLOSED | ✅ PR #9618 已合并 |
| 🟡 低 | **#9610 Telegram 动画贴纸无法被模型识别**：动画贴纸不传图，模型只能看到 emoji | CLOSED | ✅ PR #9610 已合并 |
| 🟢 极低 | **#9619 空配置 schema 导致插件加载失败**：插件携带空的 `_conf_schema.json`（`{}`）时，配置初始化逻辑跳过加载 | OPEN（PR #9619 待合并） | 对应 PR #9619 |

**今日稳定性总结**：知识库检索回归问题已快速修复，但 #9600 的会话锁异常仍在调查中，值得关注。

## 功能请求与路线图信号

- **[PowerShell 7 支持（#9614）→ PR #9622]**：Windows 用户希望在保留默认 PowerShell 5.1 的前提下，通过 WebUI 选择使用 PowerShell 7。PR #9622 已实现该功能，保持默认值不变，兼容性风险低。
- **[插件市场下载量排序（#9570）→ PR #9570（待合并）]**：插件市场已展示下载量但排序菜单没有对应选项，用户希望在寻找应用广泛插件时能按下载量排序。该 PR 在 8 月 6 日提交，目前仍在待合并状态。
- **[日志时间戳增加日期（#9617）→ PR #9617]**：后台日志只有时分秒，日志轮转后无法区分跨天事件。PR 在 `console` sink 格式中增加 `YYYY-MM-DD`。

这些功能请求均已有对应 PR，表明社区需求和实际开发高度同步，预计下一版本有望纳入 PowerShell 7 支持和日志时间戳改进。

## 用户反馈摘要

- **知识库检索问题（#9613）**：用户 @CyreneLian 反馈升级 v4.27.2 后，检索结果 "数量明显减少、覆盖不全"，配置 `kb_final_top_k=5` 时最终注入的上下文往往来自 5 个不同文档，存在明显的「同一文档被去重过度」问题。多知识库场景下 "单文档知识库的结果会被每库独立 min-max 归一化放大，与多文档库分数不可比"。该问题已通过 #9618 修复。
- **Windows shell 开发痛点（#9614）**：用户明确表达对 Windows 内置 PowerShell 5.1 的局限性不满，指出 `&&` 和 `??` 等现代语法无法使用，这是日常开发脚本中常用的语法特性。
- **插件开发困扰（#9566）**：用户在上传插件到 AstrBot 插件市场时，WebUI 频繁出现 "自动安全检查失败"，且发生在 `https://cloud.astrbot.app/` 平台。该 Issue 已关闭，但说明插件市场的 CI/安全审查机制仍有待优化。

## 待处理积压

- **[PR #9570] 插件市场下载量排序（待合并 5 天）** — [链接](https://github.com/AstrBotDevs/AstrBot/pull/9570)：功能完整（M 级改动），但 5 天未合并。插件市场的可发现性改进值得尽快收尾。
- **[PR #9616] QQ 官方频道大文件分块上传（size:XL）** — [链接](https://github.com/AstrBotDevs/AstrBot/pull/9616)：解决 QQ v2 内联上传 10MB 上限，属于较大改动，需充分测试。
- **[Issue #9600] 会话锁异常** — [链接](https://github.com/AstrBotDevs/AstrBot/issues/9600)：高频触发但原因未明，且涉及核心事件循环，建议标记为 `priority: high` 并重点排查。
- **[PR #9615] QQ 主动消息发送窗口过期修复** — [链接](https://github.com/AstrBotDevs/AstrBot/pull/9615)：针对 5 分钟被动回复窗口过期的修复，虽为 S 级改动，但长任务场景下会频繁触发，建议尽快合入。

---

*本日报基于 AstrBot GitHub 仓库 2026-08-11 数据生成，数据来源真实可靠。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*