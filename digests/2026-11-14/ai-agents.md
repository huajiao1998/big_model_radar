# OpenClaw 生态日报 2026-11-14

> Issues: 326 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-14 01:53 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报（2026-11-14）

> 数据口径：过去 24 小时；Issues 更新 326 条（展示 50 条），PR 更新 500 条（展示 30 条）。`CLOSED` 表示已合并或已关闭，需以仓库最终状态为准；`no-new-fix-pr` 表示当前无新修复 PR，`linked-pr-open` 表示存在关联但未合并 PR。

## 1. 今日速览

2026-11-14，OpenClaw 过去 24 小时 Issues 更新 326 条（新开/活跃 214、关闭 112），PR 更新 500 条（待合并 282、已合并/关闭 218），无新版本发布。项目活跃度很高，合并/关闭吞吐不低，但待合并 PR 与新开/活跃 Issue 均高于关闭量，积压压力明显。稳定性焦点集中在 Windows 启动/更新、Gateway 事件循环阻塞与内存增长、子代理/消息投递丢失，以及托管更新卡死等 P0/P1 问题。社区讨论最热的是 Windows 可靠性 [#170956](https://github.com/openclaw/openclaw/issues/170956)（32 评论）和持久化阻塞事件循环 [#119720](https://github.com/openclaw/openclaw/issues/119720)（26 评论），说明“可运维性 + 规模化稳定性”是当前核心矛盾。健康度判断：活跃度高、维护吞吐中高，但积压与发布阻断风险偏高。

## 2. 版本发布

无新版本发布（0 个），无破坏性变更或迁移注意事项。

## 3. 项目进展

- PR 侧吞吐较高：过去 24 小时 218 条 PR 已合并/关闭，但仍有 282 条待合并。展示样本中的 CLOSED PR 主要集中在会话过读、Google Meet 中断清理、CI 依赖检查与人工步骤交接等工程健康问题。
- 已关闭/合并的重点 PR 样本：
  - [#196951](https://github.com/openclaw/openclaw/pull/196951) `feat(agents): support required manual-step handoffs in chat`：支持聊天中需要人工步骤的交接。
  - [#197633](https://github.com/openclaw/openclaw/pull/197633) `fix(sessions): avoid transcript overreads when recovering nested tool activity`：减少恢复嵌套工具活动时的 transcript 过读。
  - [#198372](https://github.com/openclaw/openclaw/pull/198372) `fix(google-meet): cancel interrupted status, transcript and doctor reads`：修复 Google Meet CLI 中断后挂起问题。
  - [#198510](https://github.com/openclaw/openclaw/pull/198510) `fix(ci): unused exports fail the dependency check`：修复主 CI 依赖检查中的未使用导出失败。
  - [#198544](https://github.com/openclaw/openclaw/pull/198544) `fix(ci): keep the model picker target helper private`：清理模型选择器内部导出，改善 CI 健康。
- Issue 关闭/清理样本显示消息投递、认证回退、CJK 搜索等方向得到推进：[#126950](https://github.com/openclaw/openclaw/issues/126950) Telegram 回调丢弃、[#192009](https://github.com/openclaw/openclaw/issues/192009) 跨 provider cron fallback、[#142037](https://github.com/openclaw/openclaw/issues/142037) Slack mute/thread mismatch、[#140736](https://github.com/openclaw/openclaw/issues/140736) CJK `sessions_search`、[#158421](https://github.com/openclaw/openclaw/issues/158421) 默认模型 profile 阻塞 fallback。
- 总体判断：项目在稳定性清理和 CI 健康上持续前进，但大功能跨越有限；当前更像“高强度维护期”，而非版本功能冲刺期。

## 4. 社区热点

| 热点 Issue | 评论 | 状态/标签 | 核心诉求 |
|---|---:|---|---|
| [#170956](https://github.com/openclaw/openclaw/issues/170956) Windows slow startup, unclean plugin shutdown, schtasks permission error | 32 | OPEN，P0，crash-loop，release-blocker | Windows 托管服务安装下启动慢、插件关闭不干净、`schtasks` 权限错误导致重启/更新不可靠。 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) Synchronous agent persistence and transcript maintenance block Gateway event loop | 26 | OPEN，P1，message-loss，crash-loop | 大规模会话下同步持久化和 transcript 维护阻塞 Gateway 事件循环，影响消息处理与稳定性。 |
| [#126950](https://github.com/openclaw/openclaw/issues/126950) Telegram opaque callback payloads silently dropped | 16 | CLOSED，P1 | `message` 工具内联按钮的 `tgcb1:` 回调被 Telegram ingress 静默丢弃，非插件调用方受影响。 |
| [#192009](https://github.com/openclaw/openclaw/issues/192009) Explicitly authorize cross-provider cron fallback accounts | 14 | CLOSED，P2，needs-product-decision | 允许自动化任务显式授权主模型与 fallback 模型使用不同 provider/account。 |
| [#142037](https://github.com/openclaw/openclaw/issues/142037) Embedded runtime records message-tool replies as “mute” | 14 | CLOSED，P2，message-loss | Slack 顶层消息线程匹配错误，导致 `message` 工具回复被记为 mute，消息投递记账不一致。 |

热点分析：讨论集中在“生产可运维性”而非新功能。Windows 托管更新、Gateway 事件循环、消息投递正确性是最能引发长讨论的议题；其中 #170956 仍是 OPEN P0 且 `no-new-fix-pr`，需要优先关注。PR 评论数在当前数据中未提供，因此热点以 Issues 评论数为准。

## 5. Bug 与稳定性

当前高严重度问题仍以 `no-new-fix-pr` 为主，发布阻断风险偏高。

| 严重度 | 问题 | 状态与修复信号 |
|---|---|---|
| P0 | [#170956](https://github.com/openclaw/openclaw/issues/170956) Windows 启动慢、插件关闭不干净、`schtasks` 权限错误 | OPEN；`no-new-fix-pr`；`impact:ux-release-blocker`。 |
| P0 | [#190563](https://github.com/openclaw/openclaw/issues/190563) 无法恢复暂停的 Codex 聊天，provider review/native thread 不匹配 | OPEN；`no-new-fix-pr`；`needs-security-review`；回归。 |
| P0 | [#193094](https://github.com/openclaw/openclaw/issues/193094) 托管更新在 validating 阶段挂起 57 分钟后被 SIGKILL | OPEN；`no-new-fix-pr`；`impact:ux-release-blocker`。 |
| P0 | [#141413](https://github.com/openclaw/openclaw/issues/141413) macOS App 对使用 SecretRef 的本地 Gateway 省略 token | OPEN；`no-new-fix-pr`；`needs-security-review`。 |
| P1 | [#191847](https://github.com/openclaw/openclaw/issues/191847) 大会话反复杀死 512 MB SQLite worker，报 `ERR_WORKER_OUT_OF_MEMORY` | OPEN；`no-new-fix-pr`；回归。 |
| P1 | [#182369](https://github.com/openclaw/openclaw/issues/182369) Gateway RSS 每小时约增长 0.1 GiB，内部阈值监控不触发 | OPEN；`no-new-fix-pr`。 |
| P1 | [#181120](https://github.com/openclaw/openclaw/issues/181120) macOS Gateway 主线程阻塞在关闭 worker MessagePort | OPEN；`no-new-fix-pr`；crash-loop。 |
| P1 | [#185085](https://github.com/openclaw/openclaw/issues/185085) exec 完成唤醒丢失 `SESSION_DELIVERY_GENERATION_UNAVAILABLE`，且不重试 | OPEN；`no-new-fix-pr`；修复 #177063 未进入 stable。 |
| P1 | [#155119](https://github.com/openclaw/openclaw/issues/155119) 子代理最终答案丢失、重复 settle、`deliveryStatus` 卡 pending | OPEN；`no-new-fix-pr`。 |
| P2 | [#197083](https://github.com/openclaw/openclaw/issues/197083) 安装后 Doctor WAL 发布校验失败，11.3 更新部分收尾 | OPEN；`no-new-fix-pr`。 |
| P2 | [#197374](https://github.com/openclaw/openclaw/issues/197374) 长会话压缩被 120s idle timeout 截断，质量守卫无原因 | OPEN；`no-new-fix-pr`。 |
| P2 | [#182467](https://github.com/openclaw/openclaw/issues/182467) 项目父会话 `sessions_spawn` 模型校验失败 | OPEN；`linked-pr-open`，有关联 PR。 |
| P2 | [#177633](https://github.com/openclaw/openclaw/issues/177633) Slack huddle bidi 音频采集在 join 后超时 | OPEN；`linked-pr-open`。 |

今日新开修复 PR 信号：[#198547](https://github.com/openclaw/openclaw/pull/198547) 修复 `agents.delete` 被其他 agent 模型目录构建阻塞；[#198531](https://github.com/openclaw/openclaw/pull/198531) 限制共享 Git 内容搜索；[#198565](https://github.com/openclaw/openclaw/pull/198565) 修复 Claude 在子进程专用配置目录下的 resume。整体看，修复 PR 在增加，但尚未覆盖最严重的 P0 项。

## 6. 功能请求与路线图信号

| 功能/PR | 信号 | 路线图判断 |
|---|---|---|
| [#197395](https://github.com/openclaw/openclaw/pull/197395) `feat(cron): back automation off when a provider or memory pushes back` | OPEN，P2，waiting on maintainer；依赖 #197394 | 较可能进入近期版本，属于自动化稳定性增强。 |
| [#192009](https://github.com/openclaw/openclaw/issues/192009) 显式授权跨 provider cron fallback | CLOSED，P2，needs-product-decision | 产品决策已推进，可能以配置项或授权模型落地。 |
| [#170997](https://github.com/openclaw/openclaw/issues/170997) memory FTS 增加 CJK bigram tokenizer | OPEN，P2，`linked-pr-open` | 较可能近期推进，中文用户需求明确。 |
| [#137110](https://github.com/openclaw/openclaw/issues/137110) Telegram `sendDice` 支持 | OPEN，P3，`linked-pr-open` | 小体量 channel 增强，若 PR 质量达标可进入后续版本。 |
| [#136271](https://github.com/openclaw/openclaw/issues/136271) msteams 动态解析团队 SharePoint 站点 | OPEN，stale，P2 | 企业场景有价值，但需产品排期。 |
| [#166586](https://github.com/openclaw/openclaw/issues/166586) 消费 MCP Events，每事件启动 agent run | OPEN，P3，needs-product-decision | 长周期方向，偏平台能力。 |
| [#192350](https://github.com/openclaw/openclaw/pull/192350) GitHub 仓库集成迁移为插件 | OPEN，XL，security-review-required | 架构级迁移，周期较长。 |
| [#129388](https://github.com/openclaw/openclaw/pull/129388) 上下文压力感知 continuation | OPEN，XL，needs proof，security-sensitive | 高风险高价值，短期不宜期待合入。 |
| [#56349](https://github.com/openclaw/openclaw/issues/56349) 不可绕过的出站策略强制 | OPEN，老 Issue，needs-security-review | 安全价值高，但落地复杂度大。 |

较可能进入下一版本的信号：cron 自动化退避、CJK bigram、Telegram dice、Claude resume 修复。需要更多设计/证明的信号：continuation、GitHub 插件化、MCP Events。

## 7. 用户反馈摘要

- Windows 托管服务用户痛点最突出：重启/更新“多次重试才成功”，偶发客户端 1006 断开，插件关闭不干净，`schtasks` 权限错误。[#170956](https://github.com/openclaw/openclaw/issues/170956)
- 长会话/大历史场景下性能与内存压力明显：SQLite worker OOM 导致每轮失败，Gateway 事件循环被同步持久化阻塞，RSS 持续增长。[#191847](https://github.com/openclaw/openclaw/issues/191847)、[#119720](https://github.com/openclaw/openclaw/issues/119720)、[#182369](https://github.com/openclaw/openclaw/issues/182369)
- 消息可靠性是高频抱怨：子代理最终答案丢失、`deliveryStatus` 卡 pending、Slack 线程记账错误、Telegram 回调丢弃、exec 完成唤醒丢失。[#155119](https://github.com/openclaw/openclaw/issues/155119)、[#142037](https://github.com/openclaw/openclaw/issues/142037)、[#185085](https://github.com/openclaw/openclaw/issues/185085)
- 更新运维体验不稳：托管更新 validating 阶段超时被 SIGKILL，安装后 Doctor WAL 校验失败导致更新部分收尾。[#193094](https://github.com/openclaw/openclaw/issues/193094)、[#197083](https://github.com/openclaw/openclaw/issues/197083)
- 跨平台客户端问题分散：macOS SecretRef token 缺失、iOS 原生聊天字号不生效、Safari 27.3 聊天输入框缺失。[#141413](https://github.com/openclaw/openclaw/issues/141413)、[#170428](https://github.com/openclaw/openclaw/issues/170428)、[#195192](https://github.com/openclaw/openclaw/issues/195192)
- 本地化搜索仍有明显缺口：CJK transcript 查询返回 0 结果，`trigram` 无法匹配两字中文查询。[#140736](https://github.com/openclaw/openclaw/issues/140736)、[#170997](https://github.com/openclaw/openclaw/issues/170997)
- 典型使用场景包括：单用户自托管 Gateway + 约 50 个 cron + Discord + 浏览器自动化；长生命周期 Telegram 直聊；Slack huddle 实时音频；Teams 频道文件上传。[#182369](https://github.com/openclaw/openclaw/issues/182369)、[#191847](https://github.com/openclaw/openclaw/issues/191847)、[#177633](https://github.com/openclaw/openclaw/issues/177633)、[#136271](https://github.com/openclaw/openclaw/issues/136271)
- 积极信号：多个高讨论 Issue 已关闭/清理，包括 Telegram 回调、跨 provider cron fallback、Slack mute 记账、CJK sessions_search、默认模型 profile 阻塞 fallback，说明维护者正在处理消息与认证路径的历史问题。

## 8. 待处理积压

| 事项 | 创建时间 | 状态 | 关注理由 |
|---|---|---|---|
| [#56349](https://github.com/openclaw/openclaw/issues/56349) 不可绕过的出站策略强制 | 2026-03-28 | OPEN，P2，needs-security-review | 最老的高安全价值 Issue 之一，涉及所有出站消息统一边界。 |
| [#113159](https://github.com/openclaw/openclaw/issues/113159) 使用限额冷却忽略非 OpenAI/Codex provider 的真实重置时间 | 2026-07-23 | OPEN，P2 | 影响多 provider 自动化的恢复策略。 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) 同步持久化阻塞 Gateway 事件循环 | 2026-08-05 | OPEN，P1，26 评论 | 高讨论、高影响，但仍 `no-new-fix-pr`。 |
| [#124306](https://github.com/openclaw/openclaw/issues/124306) exec 审批卡不提示目标路径是挂载点 | 2026-08-15 | OPEN，P2，data-loss | 安全审批信息不足，误操作风险高。 |
| [#136271](https://github.com/openclaw/openclaw/issues/136271) msteams 动态 SharePoint 站点解析 | 2026-09-02 | OPEN，stale，P2 | 企业文件上传场景受阻，已 stale。 |
| [#155119](https://github.com/openclaw/openclaw/issues/155119) 子代理完成投递丢失 | 2026-09-21 | OPEN，P1 | 消息可靠性核心问题，仍无新修复 PR。 |
| [#170956](https://github.com/openclaw/openclaw/issues/170956) Windows 启动/更新可靠性 | 2026-10-13 | OPEN，P0，32 评论 | 当前最高讨论度发布阻断项，需优先排期。 |
| [#129388](https://github.com/openclaw/openclaw/pull/129388) 上下文压力感知 continuation | 2026-08-25 | OPEN，XL，needs proof，security-sensitive | 长期大型 PR，评审与证明成本高。 |
| [#156393](https://github.com/openclaw/openclaw/pull/156393) msteams 附件与 ingress 测试重构 | 2026-09-23 | OPEN，waiting on author | 长期等待作者更新。 |
| [#163377](https://github.com/openclaw/openclaw/pull/163377) SQLite worker 崩溃无日志/指标原因 | 2026-10-02 | OPEN，needs proof | 与多个崩溃/OOM 问题相关，需补证据。 |

维护者优先级建议：先处理 P0 [#170956](https://github.com/openclaw/openclaw/issues/170956)、[#193094](https://github.com/openclaw/openclaw/issues/193094)、[#190563](https://github.com/openclaw/openclaw/issues/190563)、[#141413](https://github.com/openclaw/openclaw/issues/141413)；同时关注老 P2 安全项 [#56349](https://github.com/openclaw/openclaw/issues/56349)、高讨论 P1 [#119720](https://github.com/openclaw/openclaw/issues/119720)/[#155119](https://github.com/openclaw/openclaw/issues/155119)，以及长期大型 PR [#129388](https://github.com/openclaw/openclaw/pull/129388)/[#156393](https://github.com/openclaw/openclaw/pull/156393)/[#163377](https://github.com/openclaw/openclaw/pull/163377)。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告
**数据日期：2026-11-14**  
**口径说明**：各项目统计口径不完全一致；`CLOSED` 未区分“已合并”与“直接关闭”；部分项目 PR 评论数缺失；DeepSeek Harness 未启用 Issues/PR，以 Discussions 与 Release 为准。

---

## 1. 生态全景

2026-11-14，生态整体处于**高强度维护与生产化打磨期**，而非功能冲刺期：OpenClaw、hermes-agent 单日 Issues/PR 更新均达 500 量级，头部项目活跃度显著领先。项目分化明显：平台型项目集中处理稳定性、安全与积压，垂直项目分别围绕凭据隔离、企业 IM、插件生态、低成本部署和桌面体验展开。共同矛盾已从“模型能力”转向**可运维性、消息可靠性、安全默认值与成本可观测性**。评审带宽成为普遍瓶颈：Zeroclaw PR 合并率约 2%、QwenPaw 待合并 PR 占 85.7%、hermes-agent 待合并 355 条、OpenClaw 待合并 282 条。生态呈“头部高吞吐、中部积压、尾部维护”的结构，PicoClaw 已呈维护模式，DeepSeek Harness 以 Discussions + rc 迭代维持社区热度。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新（活跃/关闭） | PR 更新（待合并/合并关闭） | Release | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 326（214/112） | 500（282/218） | 无 | **高活跃、高吞吐，但积压与 P0 发布阻断风险偏高**；Windows 托管更新、Gateway 事件循环、消息投递是核心风险。 |
| **Zeroclaw** | 9（9/0） | 50（49/1） | 无 | **提交热、合并停滞**；安全与凭据架构主线清晰，但 PR 合并率约 2%，XL/high-risk PR 滞留 3–4 周。 |
| **PicoClaw** | 1（活跃1/关闭0） | 4（待0/关闭4；无新建） | 无 | **低活跃/维护模式**；集中关闭历史 PR，功能演进停滞，stale 策略偏激进。 |
| **QwenPaw** | 19（15/4） | 35（30/5） | 无 | **中高活跃、响应强、合并吞吐低**；2.3.0 后稳定性承压，Hub 网关、微信/飞书通道、升级迁移是重点。 |
| **hermes-agent** | 500（170/330） | 500（355/145） | canary 1 | **极高活跃、强清理**；安全冲刺主导，Issue 关闭率 66%，但 355 条待合并 PR 构成 review 瓶颈。 |
| **AstrBot** | 6（6/0） | 19（16/3） | 无 | **中频稳定、修复响应好**；Provider 生态扩张明显，但长周期 PR 与 Issue 收尾缺口存在。 |
| **DeepSeek Harness** | N/A；Discussions 191 | N/A | rc.3 1 | **社区高度活跃、无公开 PR 通道**；Windows 更新/认证、工作区可用性、Agent 文件操作安全是主要风险。 |

**关键对比**：以 PR 更新量计，OpenClaw 与 hermes-agent 同处第一梯队（均 500 条），约为 Zeroclaw 的 10 倍、QwenPaw 的 14 倍、AstrBot 的 26 倍。以 Issue 更新量计，hermes-agent 500 条最高，OpenClaw 326 条次之，其余项目均低于 20 条。

---

## 3. OpenClaw 在生态中的定位

**定位**：OpenClaw 是当前生态中**平台化、通用型自托管智能体核心参照**，覆盖多通道、子代理、cron、会话、插件与托管服务，功能广度与社区规模均处第一梯队。

**优势**：
- **规模优势明显**：单日 PR 更新 500 条，与 hermes-agent 并列第一；Issues 更新 326 条，仅次于 hermes-agent 的 500 条，远高于 QwenPaw 19、Zeroclaw 9、AstrBot 6。
- **集成广度最大**：覆盖 Telegram、Slack、Google Meet、msteams、macOS/iOS/Web 客户端、cron、agents、sessions、托管更新等，平台型特征最强。
- **维护吞吐不低**：单日 PR 合并/关闭 218 条，Issue 关闭 112 条，说明维护团队具备较强清理能力。

**技术路线差异**：
- 以 **Gateway 为中心**统一会话、代理、通道与 cron，优势是单一会话权威与多入口一致；代价是同步持久化、transcript 维护与事件循环阻塞成为规模化瓶颈（#119720）。
- 与 **hermes-agent** 相比，二者都走向统一网关，但 hermes 更强调“统一 gateway + 安全马拉松”的集中治理，OpenClaw 更强调多通道/托管/插件集成；hermes 今日 Issue 关闭 330 条，清理力度强于 OpenClaw 的 112 条。
- 与 **Zeroclaw** 相比，OpenClaw 安全治理更分散，Zeroclaw 则把“凭据不暴露给模型、出网管控、沙箱审批”作为架构主线。
- 与 **QwenPaw/AstrBot** 相比，OpenClaw 更偏底层运行时与平台能力，后两者更偏企业 IM / 聊天机器人应用层与插件生态。

**社区规模对比**：OpenClaw 处于“头部平台”层级；hermes-agent 同量级但更偏多入口消息 copilot；QwenPaw、AstrBot、Zeroclaw 为中部活跃项目；PicoClaw 已进入低活跃维护期。

**主要风险**：P0 问题仍以 `no-new-fix-pr` 为主，Windows 启动/更新（#170956）、托管更新卡死（#193094）、Codex 会话恢复（#190563）、macOS SecretRef token（#141413）构成发布阻断风险。

---

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **安全默认值与凭据隔离** | Zeroclaw、hermes-agent、OpenClaw、AstrBot、DeepSeek Harness | 不让模型看见密钥；分层凭据/作用域引用；MITM 出网代理；工具结果 Unicode/ANSI 脱敏；危险命令审批；Agent 文件操作确认与备份。Zeroclaw #12373/#12422/#12001、hermes sec-marathon、OpenClaw #56349/#141413、AstrBot #11112、DeepSeek #12751 均指向此。 |
| **稳定性与可运维性** | OpenClaw、hermes-agent、DeepSeek Harness、PicoClaw、QwenPaw | Windows/macOS/Linux 更新、启动、沙箱、事件循环、OOM、长会话内存增长。OpenClaw #170956/#119720/#193094、hermes #56524/#138974/#123118、DeepSeek #13025/#9995/#9924、PicoClaw #3461、QwenPaw #8684/#7943。 |
| **消息投递可靠性** | OpenClaw、QwenPaw、hermes-agent、AstrBot | 子代理最终答案丢失、deliveryStatus 卡 pending、Telegram/Slack 回调丢弃、微信/飞书/KOOK/BlueBubbles 通道事件丢失；需要幂等、重试、状态可见与 debounce。OpenClaw #155119/#185085/#142037、QwenPaw #8709/#8669、hermes #30989、AstrBot #11115。 |
| **Provider / 模型网关兼容与成本** | QwenPaw、AstrBot、Zeroclaw、DeepSeek Harness、OpenClaw | Provider 配置化、请求头模板、主备 Key 故障转移、模型目录/上下文窗口发现、token 统计、prompt-cache 亲和性、预算与审查开关。QwenPaw #8718/#8705、AstrBot #10535/#11113/#10826、Zeroclaw #12412/#12413、DeepSeek #12109、OpenClaw #192009。 |
| **插件 / 扩展生态契约** | QwenPaw、AstrBot、Zeroclaw、PicoClaw、hermes-agent、OpenClaw | 稳定扩展点、插件 CLI、主题 token、Agent Runner 插件化、WASM 宿主、skills 安装/版本化、插件目录治理。QwenPaw #8071/#8554、AstrBot #9942/#9984、Zeroclaw #12416、PicoClaw #714、OpenClaw #192350。 |
| **多入口统一与 GUI/CLI 对等** | hermes-agent、OpenClaw、PicoClaw、QwenPaw、AstrBot | 统一 gateway 后会话/路由/配置收口；Web UI 与 CLI 能力对等；反向代理 base path；WebUI 信息架构与长标题适配。hermes #143547、PicoClaw #3461、QwenPaw #8714、AstrBot #11103。 |
| **本地化 / CJK / i18n** | OpenClaw、QwenPaw、AstrBot | 中文搜索 bigram、CJK Markdown 强调边界、运行时指令多语言。OpenClaw #170997/#140736、QwenPaw #8133、AstrBot #9984。 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 路线关键差异 |
|---|---|---|---|
| **OpenClaw** | 通用自托管智能体平台：多通道、子代理、cron、会话、托管服务、插件 | 高级自托管用户、多通道运营者、平台集成者 | Gateway 为中心，统一事件循环与会话/代理编排；集成广度最大；当前受同步持久化、Windows 托管更新与事件循环阻塞制约。 |
| **Zeroclaw** | 安全优先的智能体运行时：凭据分层、出网管控、沙箱审批、供应链安全 | 安全敏感团队、运维/平台工程 | Rust/Tokio + SQLite 倾向明显；强调沙箱、Seatbelt、审批、凭据作用域与 MITM 代理；PR 体量大、评审慢。 |
| **PicoClaw** | 轻量个人助手、低成本网关、skills 安装 | 入门用户、个人自托管、低成本试用 | CLI/Web UI 双通道，轻量 Go 风格模块化（agent_*.go、pkg/tools）；当前维护模式，功能演进停滞。 |
| **QwenPaw** | 企业 IM 与插件生态：飞书/微信/钉钉、Hub 模型网关、Creator、Console/WebUI | 企业用户、中文用户、插件作者 | 多通道插件 + Hub 模型网关 + Creator；2.3.0 后稳定性与升级迁移是主矛盾；插件主题与 CLI 扩展点在推进。 |
| **hermes-agent** | 多入口消息 copilot：CLI/TUI/Desktop/API/编辑器/消息 bot/cron 统一 gateway | 单操作员多端用户、自托管桌面用户 | 统一 gateway 收敛多入口；安全马拉松集中治理；桌面/平台一致性（Windows ACL、macOS LaunchAgent、Docker）是主要摩擦。 |
| **AstrBot** | 多平台聊天机器人框架与 Provider 扩展 | 社区机器人运营者、插件开发者 | Adapter/Provider/插件/WebUI 分层；Provider 接入成本与配置化是主线；修复响应快，长周期架构 PR 待评审。 |
| **DeepSeek Harness** | 官方模型工作区、桌面 Agent、实验性会话导入插件 | DeepSeek API 用户、桌面开发者 | 无公开 Issues/PR，Discussions 驱动；rc 迭代；Windows 桌面更新、认证 cookies、工作区服务、Agent 文件操作安全是核心风险。 |

---

## 6. 社区热度与成熟度

| 层级 | 项目 | 阶段判断 |
|---|---|---|
| **第一梯队：极高活跃** | OpenClaw、hermes-agent、DeepSeek Harness | OpenClaw/hermes 处于“高吞吐维护 + 质量巩固”阶段；DeepSeek 以 rc 迭代和 Discussions 保持高社区热度，但开发过程透明度较低。 |
| **第二梯队：中高活跃** | QwenPaw、AstrBot、Zeroclaw | QwenPaw 处于 2.3.0 后稳定性巩固期；AstrBot 处于 Provider/插件生态快速扩张期；Zeroclaw 处于安全架构设计期，但评审积压严重。 |
| **第三梯队：低活跃/维护** | PicoClaw | 维护模式：无新增功能流入、无发版，以历史 PR 清账为主；stale 策略和评审周期需修正。 |

**成熟度判断**：
- **快速迭代**：AstrBot（Provider 扩展、KOOK/Edge TTS/Anthropic failover）、DeepSeek Harness（rc.3、会话导入）、QwenPaw（2.3.0 后通道与 Hub 修复）、hermes-agent（统一网关收尾）。
- **质量巩固**：OpenClaw（P0/P1 稳定性清理）、hermes-agent（安全马拉松）、QwenPaw（通道可靠性/升级迁移）、Zeroclaw（安全模型与凭据分层）。
- **维护模式**：PicoClaw。
- **注意**：成熟度不等于代码质量。OpenClaw/hermes 社区规模大但 P0/P1 积压明显；Zeroclaw 安全设计成熟但 PR 合并率仅约 2%。

---

## 7. 值得关注的趋势信号

1. **Agent 安全从“能力约束”转向“机密性 + 出网 + 工具输出 + 持久化”全链路**  
   Zeroclaw 的写-only 凭据目录、MITM 出网代理；hermes 的 Unicode TAG/ANSI 脱敏、审批规则绕过修复；OpenClaw 的出站策略强制；AstrBot 的 shell 黑名单绕过；DeepSeek 的 Agent 清空目录事件。开发者应默认采用**分层凭据、模型不可见密钥、工具结果脱敏、危险操作确认与可恢复机制**。

2. **可运维性成为 AI Agent 的发布门槛**  
   Windows 托管更新、macOS LaunchAgent、Docker 首启、事件循环阻塞、SQLite OOM、长会话内存增长，已取代“模型效果”成为发布阻断主因。Agent 运行时需要像传统服务一样具备**日志、指标、健康检查、更新回滚、跨平台安装器**。

3. **消息投递可靠性正在工程化**  
   子代理最终答案丢失、deliveryStatus 卡 pending、Slack 线程记账、Telegram 回调丢弃、微信/飞书/KOOK 事件丢失——多项目共同指向**幂等投递、重试、状态可见、通道 debounce 与统一事件账本**。

4. **成本与性能可观测性成为刚需**  
   prompt-cache 亲和性（Zeroclaw #12421）、Gemini thinking token 统计（AstrBot #10826）、Auto preset 全上下文审查占账单 42%（DeepSeek #12109）、cron token 未写入 turns.jsonl（QwenPaw #8705）说明用户需要**预算上限、审查开关、用量归因与缓存命中率**。

5. **插件生态从“可用”走向“可深度定制与契约标准化”**  
   QwenPaw 主题 semantic token、AstrBot Agent Runner 插件化、Zeroclaw WASM 宿主、PicoClaw skills 版本化安装、OpenClaw GitHub 插件化——共同信号是**扩展点需要版本化、生命周期统一、配置发现标准化**。

6. **多入口统一后，GUI/CLI 对等与迁移期稳定性成为新矛盾**  
   hermes 统一 gateway 后 66 条评论追踪 post-merge 问题；PicoClaw Web UI 无法启动 gateway；QwenPaw 升级不迁移插件；OpenClaw 托管更新卡死。统一架构带来会话权威，但也放大了**迁移、路由、配置隔离与 GUI 能力缺口**。

7. **社区治理信号：评审带宽比代码质量更常成为瓶颈**  
   Zeroclaw 49 条待合并、QwenPaw 30 条待合并、hermes 355 条待合并、OpenClaw 282 条待合并；PicoClaw 出现 235 天平均 PR 存续与 7 天 stale 误伤。对开发者而言，**小步 PR、依赖链分批、明确合入/关闭 SLA、避免重复 PR** 比一次性大改更可持续。

**对 AI 智能体开发者的参考价值**：下一阶段竞争力不只在模型编排，而在**安全默认值、投递可靠性、成本可观测、插件契约、跨平台可运维性与社区评审效率**。优先把 Agent 当作生产服务来设计，而不是一次性 Demo。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 · 2026-11-14

> 数据来源：github.com/zeroclaw-labs/zeroclaw ｜ 统计窗口：过去 24 小时

---

## 1. 今日速览

- **活跃度高、吞吐低**：24 小时内 Issues 更新 9 条（新开/活跃 9、关闭 0），PR 更新 50 条（待合并 49、合并/关闭 1），新版本 0 个。提交侧热度很高，但合并侧几乎停滞——PR 合并率约 2%。
- **主题高度集中**：今日 9 条 Issue 中有 4 条、展示的 20 条 PR 中有 6 条直接围绕**凭据/密钥的受控使用与出网管控**（#12373、#12422、#12001、#12418、#12408、#12402、#12335），"让智能体使用服务但不让模型看见密钥"已成为当前最明确的架构主线。
- **贡献集中度偏高**：展示的 20 条 PR 中 @CastelloBrancoTecnologia 占 13 条，且多为 XL 级、跨模块改动，存在单点依赖与评审负载风险。
- **质量信号**：今日新增 2 个 S2 级 provider Bug（OpenCode Go，均无 fix PR），1 个 S3 级性能问题（cron 任务丢失 prompt-cache 亲和性）。
- **健康度判断**：项目方向清晰、安全治理投入扎实，但**评审积压是当前首要风险**——多条 10 月中旬开启的 XL/high-risk PR 已滞留 3～4 周未合并。

---

## 2. 版本发布

无新版本发布。当前主线版本仍为 **v0.9.0**（commit `6c78ba5`，见 #12415、#12413、#12412 的复现环境）。

---

## 3. 项目进展

今日**合并/关闭 PR 仅 1 条**（未出现在展示的前 20 条中，具体内容无法从现有数据确认）。因此从"净推进"角度看，今日项目主要处于**评审与冲突消解阶段**，尚无实质性功能落地。

值得关注的、已接近可合并状态的修复：

| PR | 内容 | 意义 |
|---|---|---|
| [#12322](https://github.com/zeroclaw-labs/zeroclaw/pull/12322) | 将内置 SQLite 升级至 3.54.1，并移除继承的 `RUSTSEC-2026-0459` 豁免 | 供应链安全实质改进；`cargo deny check advisories` 已可在无豁免下通过 |
| [#12150](https://github.com/zeroclaw-labs/zeroclaw/pull/12150) | 修正 macOS Seatbelt 中 home-dotfile 正则的多余反斜杠 | 修复 `~/.cargo`、`~/.nvm` 等目录未被沙箱规则匹配的问题（#12137） |
| [#12323](https://github.com/zeroclaw-labs/zeroclaw/pull/12323) | 将缓存的 HTTP client 绑定到其所属 Tokio runtime | 消除跨 runtime 复用导致的偶发失败，属稳定性补强 |
| [#11859](https://github.com/zeroclaw-labs/zeroclaw/pull/11859) | `send_via` 在无活跃回复上下文时强制要求非空消息体 | 修复后台发送空消息的行为缺陷 |

**整体推进度评估**：功能增量 ≈ 0，修复增量集中在依赖、沙箱、运行时绑定等"底座"层面；安全与稳定性在改善，但用户可见的新能力需等待积压 PR 批量合入。

---

## 4. 社区热点

> 说明：PR 评论数字段缺失（`undefined`），以下依据 Issue 评论数、标签权重与议题跨度综合排序。

1. **[#11138](https://github.com/zeroclaw-labs/zeroclaw/issues/11138)** — define caller tool-level approval in bounded delegation（3 评论，👍 0）
   跨度最长（2026-09-26 创建，49 天），标签含 `status:accepted`、`priority:p2`、`risk:high`、`topic:agent-loop`。核心诉求：**有界委托给子智能体时，子智能体继承的工具是否必须遵守调用方的工具级审批策略**。这是多智能体安全模型的边界定义问题，已被接受但仍在讨论，说明设计上存在真实分歧。

2. **[#12373](https://github.com/zeroclaw-labs/zeroclaw/issues/12373)** — Write-only WebUI 凭据管理与作用域密钥引用（1 评论）
   提出 Storage → Secrets 下的运维专用凭据目录：仅元数据可见、写入即不可读、可禁用/删除，并为已批准任务提供受控引用。已有 [#12402](https://github.com/zeroclaw-labs/zeroclaw/pull/12402)（插件 TLS 绑定）作为 Draft 落地。

3. **[#12001](https://github.com/zeroclaw-labs/zeroclaw/issues/12001)** — RFC: MITM 出网代理（1 评论）
   直指现有安全模型的空白：目前大量机制约束"智能体能做什么"，但**对已被攻陷的智能体缺乏出网层面的强约束**，且密钥仍可能暴露给模型。这是当日最具架构分量的提案。

**分析**：社区讨论绝对量偏低（最高 3 评论），但议题质量高、聚焦在"智能体安全的最后一公里"——**能力约束已较完善，机密性与出网管控仍是短板**。

---

## 5. Bug 与稳定性

| 严重度 | Issue | 问题 | Fix PR |
|---|---|---|---|
| **S2 降级** | [#12413](https://github.com/zeroclaw-labs/zeroclaw/issues/12413) | `zeroclaw doctor update-context-windows --model-provider opencode.go --dry-run` 返回"provider 不暴露上下文窗口或获取失败"，OpenCode Go 别名下上下文窗口发现失效 | ❌ 未见 |
| **S2 降级** | [#12412](https://github.com/zeroclaw-labs/zeroclaw/issues/12412) | `zeroclaw models refresh --model-provider opencode-go` 拉取到 Zen 的 139 个模型目录而非 Go 的，导致缺失 Go 独有模型、混入 Zen 模型 | ❌ 未见 |
| **S3 性能** | [#12421](https://github.com/zeroclaw-labs/zeroclaw/issues/12421) | cron 触发的 agent job 在 `run_agent_job_inner` 中直接调用 `agent::run`，未进入 `scope_session_key`，因此**无法获得 provider prompt-cache 亲和性**，成本与延迟上升 | ❌ 未见 |
| 行为缺陷 | [#12415](https://github.com/zeroclaw-labs/zeroclaw/issues/12415) | Dashboard 登出仅结束本地会话，未走 OIDC RP-initiated logout（`end_session_endpoint`），用户在 IdP 侧仍保持登录，下次登录静默通过 | ❌ 未见 |

**关联修复进展**：#12150 修复了 macOS 沙箱 dotfile 规则未生效的回归（原始问题 #12137）；#12323 修复缓存 HTTP client 跨 runtime 复用。

**小结**：#12412/#12413 是同一子系统（OpenCode Go provider）的成对缺陷，指向 provider 与模型目录的路由映射错误，建议合并排查。今日 3 个新缺陷均无对应 fix PR，响应窗口尚在合理范围，但需避免堆积。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 关联 PR / 状态 | 进入下一版本的可能性 |
|---|---|---|---|
| 只写式凭据目录 + 作用域密钥引用 | [#12373](https://github.com/zeroclaw-labs/zeroclaw/issues/12373) | [#12402](https://github.com/zeroclaw-labs/zeroclaw/pull/12402)（Draft）→ [#12408](https://github.com/zeroclaw-labs/zeroclaw/pull/12408)（HTTP Basic/API Token）→ [#12418](https://github.com/zeroclaw-labs/zeroclaw/pull/12418)（SSH 传输） | **高**。已形成清晰的三级落地链路 |
| 运维托管服务凭据的作用域化使用 | [#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) | 与 #12418 依赖链（#11869、#12408）呼应 | **中高**。RFC 当日提出，但已有实现基础 |
| MITM 出网代理管控 | [#12001](https://github.com/zeroclaw-labs/zeroclaw/issues/12001) | 无 PR | **中**。属重大安全模型变更，需 RFC 评审周期 |
| WASM 插件宿主中介唤醒派发 | [#12416](https://github.com/zeroclaw-labs/zeroclaw/issues/12416) | 无 PR，需 ADR-016 holding-crate 例外 | **中低**。受架构治理流程约束 |
| OIDC RP-initiated logout | [#12415](https://github.com/zeroclaw-labs/zeroclaw/issues/12415) | 无 PR | **中**。改动面小、收益明确，适合作为"顺手修复"窗口项 |
| 有界委托的调用方工具级审批 | [#11138](https://github.com/zeroclaw-labs/zeroclaw/issues/11138) | 无 PR，状态 accepted | **中**。设计已接受但缺实现 |

**额外路线图信号（来自 PR 侧）**：原生 Rust XMPP + 可选 OMEMO（[#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847)）、仪表盘 OpenRouter 余额展示与隐私开关（[#11845](https://github.com/zeroclaw-labs/zeroclaw/pull/11845)、[#11846](https://github.com/zeroclaw-labs/zeroclaw/pull/11846)）、配对设备语音设置（[#12269](https://github.com/zeroclaw-labs/zeroclaw/pull/12269)）——渠道扩展与运维可观测性是第二条并行主线。

---

## 7. 用户反馈摘要

- **核心痛点：密钥必然暴露给模型**。多位用户指出，现有机制让智能体"带着密钥去调用服务"，密钥因此可能出现在模型上下文、聊天记录、技能文本或通用工具输出中。#12422 的表述最典型："operator 需要授权 agent 对某服务执行任务，但不能把底层凭据披露给模型、聊天、技能文本或通用工具"。
- **被攻陷智能体的兜底缺失**（#12001）：用户明确区分了两类风险——"限制 agent 能做什么"已投入很多，但"agent 被攻陷后如何限制其出网"几乎没有手段。
- **OIDC 用户的实际不满**（#12415）：企业 SSO 环境下，登出后 IdP 会话残留导致"下次登录静默通过、不再要求凭据"，在多用户共用设备的场景下是真实的安全与体验双重问题。
- **Provider 兼容性摩擦**（#12412/#12413）：OpenCode Go 用户遇到模型目录与上下文窗口双重失效，属于开箱即用的阻断型体验问题，且两个 Bug 相互掩盖、排查成本高。
- **满意度侧写**：Issue 与 PR 中大量出现"依赖 X、关联 Y"的显式依赖声明与分步落地策略（#12402 → #12408 → #12418），说明核心贡献者对架构分层有共识，评审文化偏严谨；代价是单条改动体量大（多为 XL）、合并周期长。

---

## 8. 待处理积压

> 提醒维护者：以下条目滞留时间已超出正常评审窗口，且多数带 `risk:high` / `size:XL` / `needs-maintainer-review` 标签。

**Issue**

| 条目 | 滞留 | 说明 |
|---|---|---|
| [#11138](https://github.com/zeroclaw-labs/zeroclaw/issues/11138) | **49 天** | `status:accepted` 但无实现 PR，多智能体审批语义悬而未决 |
| [#12001](https://github.com/zeroclaw-labs/zeroclaw/issues/12001) | 22 天 | MITM 出网代理 RFC，仅 1 条评论，需明确是否进入设计阶段 |

**Pull Requests**

| PR | 滞留 | 标签要点 |
|---|---|---|
| [#11845](https://github.com/zeroclaw-labs/zeroclaw/pull/11845) | 27 天 | OpenRouter 余额展示 |
| [#11846](https://github.com/zeroclaw-labs/zeroclaw/pull/11846) | 27 天 | OpenRouter 余额上报开关 |
| [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) | 27 天 | 原生 XMPP + OMEMO，`risk:high`、`needs-maintainer-review`、`size:XL` |
| [#11859](https://github.com/zeroclaw-labs/zeroclaw/pull/11859) | 26 天 | `send_via` 空消息体修复 |
| [#11868](https://github.com/zeroclaw-labs/zeroclaw/pull/11868) | 26 天 | 重复调用拦截，`risk:high`、`needs-maintainer-review`、`size:XL` |
| [#11869](https://github.com/zeroclaw-labs/zeroclaw/pull/11869) | 26 天 | 任务级 SSH 传输复用 |
| [#11874](https://github.com/zeroclaw-labs/zeroclaw/pull/11874) | 26 天 | 长回合进度上报 |
| [#11911](https://github.com/zeroclaw-labs/zeroclaw/pull/11911) | 25 天 | 保留已完成工具结果 + 有界恢复，`size:XL` |
| [#12015](https://github.com/zeroclaw-labs/zeroclaw/pull/12015) | 21 天 | 统一 ChaCha20Poly1305 消费者，`risk:high` |
| [#12150](https://github.com/zeroclaw-labs/zeroclaw/pull/12150) | 14 天 | macOS SBPL 正则修复，改动小、收益明确，**建议优先处理** |

**观察与建议**

1. **评审带宽是唯一瓶颈**。49 条待合并 PR 中大量为 XL 级且跨 agent/runtime/config/channel 多模块，单人贡献占比过高，容易形成"提交快、评审慢"的剪刀差。
2. **建议按依赖链分批放行**：`#12402 → #12408 → #12418` 构成一条完整的"分层凭据"能力链，逐段合并比分批审查整条链更可控。
3. **小改动应走快速通道**：#12150（14 天）、#12265 / #12266 / #12267（docs，仅记录例外审批）改动极小，长期滞留会无谓消耗贡献者耐心。
4. **风险标签需配对应评审资源**：#11847、#11868、#12015 均标记 `risk:high`，若近期无指定 reviewer，应主动下调优先级或拆分，避免无限期悬挂。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-11-14** ｜ 数据源：GitHub `sipeed/picoclaw`

> **数据口径说明**：本期数据仅含 Issue/PR 的标题、状态、时间戳与摘要，PR 评论数返回 `undefined`，且 `CLOSED` 状态无法区分"已合并"与"未合并直接关闭"。下述分析中涉及合并性质的判断均以标注方式给出。

---

## 1. 今日速览

- 今日项目**输入侧近乎静默**：24 小时内仅 1 条 Issue 更新、0 个新版本、0 条 PR 新建，社区讨论热度处于极低水位（该 Issue 仅 1 条评论、0 个 👍）。
- 输出侧出现**集中清理**：4 条 PR 在同一日（11-13/11-14）被关闭，但**全部为历史积压的收尾**，其中最新一条 PR 创建于 2026-05-07，今日无任何新代码提案进入流水线。
- 这 4 条 PR 的**平均存续时长约 235 天（≈7.8 个月）**，最久的 #714 挂起 262 天，说明 PR 评审环节存在显著瓶颈，今日的关闭更像"批量结账"而非"敏捷交付"。
- 唯一活跃 Issue #3461 已被标记 `stale`，而其创建时间仅 2026-11-06 —— **7 天内即触发 stale 判定**，存在合法 Bug 被自动清理误伤的风险。
- **综合活跃度评级：低（Low）**。项目当前处于"维护模式"特征：无新增功能流入、无发版、以积压清理为主，短期健康度可接受但**开发动能指标偏弱**。

---

## 2. 版本发布

本期无新版本发布（过去 24 小时 0 个 Release），无破坏性变更与迁移事项。

---

## 3. 项目进展

今日 4 条 PR 全部关闭，均属**历史遗留项收敛**，而非新功能推进。

| PR | 作者 | 创建 → 关闭 | 存续 | 内容 | 链接 |
|---|---|---|---|---|---|
| #1558 | @xuwei-xy | 2026-03-14 → 2026-11-14 | 245 天 | 批量合并 #1344 / #1342 / #1341 / #1331 四个既有 PR 的修复 | [链接](https://github.com/sipeed/picoclaw/pull/1558) |
| #1546 | @xuwei-xy | 2026-03-14 → 2026-11-13 | 244 天 | 批量合并 #1480 / #1479 / #1478 / #1473 / #1467 五个既有 PR | [链接](https://github.com/sipeed/picoclaw/pull/1546) |
| #2810 | @nuestraai | 2026-05-07 → 2026-11-13 | 190 天 | 同步 upstream/main 共 **1095 个提交**，并将下游 6 个定制提交前向移植到新目录结构 | [链接](https://github.com/sipeed/picoclaw/pull/2810) |
| #714 | @seanly | 2026-02-24 → 2026-11-13 | 262 天 | skills 安装/重装 CLI，重构为 `skillsCmd`，新增 `repo@branch` + 子路径支持、GitHub Trees API 全目录拉取、强制覆盖重装 | [链接](https://github.com/sipeed/picoclaw/pull/714) |

**推进评估：**

- **#1558 + #1546 是"聚合式清账"**。同一作者将 9 个散落的旧 PR（编号集中在 #1331–#1480，跨度约 150 个编号）打包为两个合并 PR，说明维护者倾向于用批处理方式消化历史积压。**净效果是 9 条待评审分支被一次性收敛，主干的待合并队列（今日待合并：0）被清空**——这是今日对项目健康度最实质的贡献。
- **#2810 揭示上游已完成一次结构性重构**：agent 主循环被拆分为 `agent_*.go`，工具层重组为 `pkg/tools/{fs,integration}/`，channel 配置迁址。1095 个提交的落差意味着**下游 fork（如 nuestraai/magicform）的重基成本已非常高**。该 PR 以 `CLOSED` 收尾（大概率未合入主干，属下游侧同步记录），但它是最有价值的架构信号。
- **#714 是唯一带有明确用户价值的功能型 PR**：把 skills 从手工放置升级为可版本化安装（支持私有仓库、分支、子路径与强制重装），实质是把"技能"变成一等公民的可分发单元。挂起 9 个月后才关闭，无论最终是否合入，都说明该能力长期未被排进优先级。

**整体前进步长**：以"关闭积压"衡量的**清账进度良好**，以"新增能力"衡量的**功能进度接近于零**。

---

## 4. 社区热点

今日**不存在真正意义上的热点**。全量数据中最高互动量仅为 1 条评论、0 个 reaction。

| 排名 | 条目 | 互动数据 | 链接 |
|---|---|---|---|
| 1 | Issue #3461 `[BUG] start gateway not available via web ui` | 1 评论 / 0 👍 | [链接](https://github.com/sipeed/picoclaw/issues/3461) |
| 2–5 | PR #1558 / #1546 / #2810 / #714 | 评论数未返回 / 0 👍 | 见上表 |

**诉求分析（针对 #3461）**：报告者明确指出"**console 侧一切正常，但 Web UI 里没有任何入口能启动 gateway**"。其配置使用 `provider: ""`（空 provider 名）+ `model: kilo-auto/free` + 自定义 `api_base`，属于**无 API Key 的 OpenAI 兼容网关**接入方式。这暴露出一个典型的**双通道能力不对等**问题：CLI/配置文件路径支持的能力，Web UI 的表单校验与启动逻辑未同步覆盖。对于面向个人用户的项目，Web UI 恰恰是新手第一入口，这类"GUI 缺失一步"的问题会直接转化为流失，**其影响面大于它的评论数所显示的程度**。

---

## 5. Bug 与稳定性

| 严重度 | 条目 | 状态 | 是否已有 Fix PR | 影响 |
|---|---|---|---|---|
| **中高（P2）** | [#3461](https://github.com/sipeed/picoclaw/issues/3461) Web UI 无法启动 gateway（无 API Key 的 provider 场景） | OPEN，已标 `stale` | **未发现** | 阻断 Web UI 用户接入免费/自建网关（如 Kilo AI free），需回退到 console 才能使用 |

**补充说明：**

- 今日**无崩溃、无回归、无数据丢失类问题**上报，稳定性面整体平稳。
- #3461 的配置特征值得单列：`provider` 为空字符串是一个**边界输入**，很可能未被 Web UI 的必填校验逻辑覆盖。同类风险还存在于其他"可留空的 provider + 自定义 api_base"组合，建议维护者按**校验分支缺陷**而非单点 Bug 处理。
- **流程风险高于技术风险**：该 Issue 创建 7 天即被标 `stale`，若 stale bot 阈值确实设置为 ~7 天，则用户在被要求补充信息后极易因自动关闭而放弃反馈。建议将 `[BUG]` 标签排除在 stale 自动流程之外，或延长至 30 天。

---

## 6. 功能请求与路线图信号

今日无新增功能请求 Issue，但可从关闭的 PR 与 Bug 中反推三条路线图信号：

1. **Skills 生态化管理（信号强度：高）**
   #714 已完整实现 install / reinstall 子命令、`repo@branch` + subpath 解析、GitHub Trees API 全量目录拉取与覆盖式重装。若该 PR 被合入，下一版本极可能出现"技能市场/一键安装"类能力；若被关闭未合并，则说明该方向被明确降级，**建议维护者公开表态以避免社区重复投入**。

2. **Web UI 与 CLI 能力对齐（信号强度：中高）**
   由 #3461 直接驱动。纳入下一版本的可能性较高，因为改动域局限于 Web UI 的 provider 校验与 gateway 启停入口，属于低风险高收益修复。

3. **上游架构模块化带来的插件契约变更（信号强度：中）**
   #2810 显示主干已把 agent 循环拆为 `agent_*.go`、工具层迁入 `pkg/tools/{fs,integration}/`。**这类目录级重构对下游 fork 和自定义工具作者等同破坏性变更**，但本期无 Release 说明，存在"代码已重构、文档未同步"的窗口期风险。建议在下一版本发布时补充迁移指引。

---

## 7. 用户反馈摘要

样本仅 1 条（#3461），如实提炼，不做过度外推：

- **使用场景**：用户通过 `model_list` 手工配置第三方聚合网关（`api.kilo.ai` 的 `kilo-auto/free`），走**无密钥免费额度**路线，属于典型的低成本试用/个人自托管场景。
- **满意点**：`console`（命令行）路径功能完整、开箱可用 —— 说明核心运行时与配置解析是可靠的。
- **不满意点**：**能力割裂**。"everything works from the console, but no way to start it via the web ui" —— 用户对 Web UI 的期待是"控制台能做的它都能做"，实际却发现最基础的启动动作缺失，且**没有任何错误提示或降级指引**（用户只能自己判断是 UI 没做，而非自己配错了）。
- **隐含诉求**：希望 Web UI 对非标准 provider 配置给出**显式反馈**（例如"检测到 provider 为空，已按自定义 api_base 模式加载"），而不是静默地不显示启动按钮。

---

## 8. 待处理积压

| 类型 | 编号 | 滞留时长 | 风险等级 | 建议 |
|---|---|---|---|---|
| Issue（**最需关注**） | [#3461](https://github.com/sipeed/picoclaw/issues/3461) | 创建 8 天，已 `stale` | 🔴 高 | 属有效 Bug 而非待补充信息，**应立即摘除 stale 标签并纳入近期修复**；否则将损失一位明确定位了问题的贡献者 |
| PR 评审流程 | #1558 / #1546 / #714 / #2810 | 平均 235 天 | 🟠 中高 | 4 条 PR 全部跨季度才关闭，说明**评审带宽而非代码质量是主要瓶颈**。建议引入"每月积压清理日"与 S/M/L 分级，避免再出现 245 天量级的挂起 |
| 聚合 PR 的溯源完整性 | #1558（原 #1344/#1342/#1341/#1331）、#1546（原 #1480/#1479/#1478/#1473/#1467） | — | 🟡 中 | 现有数据无法确认这 9 个原子 PR 是否同步关闭。若仅关闭聚合 PR 而原子 PR 仍 OPEN，将造成**幽灵积压**，建议核对并批量收尾 |
| 下游 fork 同步 | #2810 | 190 天 | 🟡 中 | 1095 提交的落差不会因关闭 PR 而消失。建议上游在重大结构性重构后提供 `CHANGELOG` 或重构说明，降低下游重基成本 |

---

## 附：项目健康度指标卡

| 维度 | 本期数值 | 评价 |
|---|---|---|
| 新增 Issue（24h） | 0（仅 1 条存量更新） | 输入枯竭，需警惕社区关注度下滑 |
| Issue 关闭（24h） | 0 | 零闭环 |
| PR 关闭/合并（24h） | 4 | 清账力度尚可 |
| PR 平均存续时长 | ≈235 天 | 🔴 严重偏高 |
| 待合并 PR 存量 | 0 | 🟢 队列健康 |
| 新版本节奏 | 0（24h） | 无发版 |
| 社区互动强度 | 1 评论 / 0 reaction | 🔴 极低 |
| **综合评级** | **低活跃 / 维护模式** | 主干未被积压堵塞，但**功能演进停滞、评审周期过长、stale 策略过激**是三项需优先修正的健康度短板 |

> **给维护者的三条最小行动建议**：① 立即复查 #3461 并解除 stale；② 调高 `[BUG]` 类 Issue 的 stale 阈值至 30 天；③ 为长期挂起 PR 设立明确的"合入 / 关闭"答复 SLA，避免贡献者的 200+ 天等待成为常态。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报｜2026-11-14

## 1. 今日速览
- 过去24小时 Issues 更新 **19 条**（新开/活跃 15，关闭 4），PR 更新 **35 条**（待合并 30，已合并/关闭 5），**无新版本发布**，整体活跃度处于中高水平。
- PR 待合并比例约 **85.7%**（30/35），说明提交与修复跟进积极，但合并吞吐偏低，评审队列是当前主要瓶颈。
- 2.3.0 后续稳定性问题集中暴露：Hub 模型网关 502、微信通道启动/回执异常、升级不迁移插件、Creator 输入卡顿等。
- 社区讨论主要集中在插件主题扩展、定时任务可观测性、飞书通道启动竞态；多个关键 Bug 已有对应 fix PR，但尚未合并。
- 项目健康度判断：**响应及时、修复意愿强；但合并落地和长期积压需重点关注**。

## 2. 版本发布
今日无新版本发布。当前问题仍主要围绕 2.3.0 的通道插件、Hub 模型网关、升级迁移与 Creator 体验，暂无新增破坏性变更或迁移说明。

## 3. 项目进展
- 数据概览显示今日有 **5 条 PR 已合并/关闭**，但给定明细未展开；可见的 20 条 PR 样本均为 OPEN。因此今日实际合并影响以“问题关闭 + PR 推进”综合评估。
- 今日关闭 4 条 Issues，覆盖通道启动、Windows 沙盒安全、定时任务问答和 AGENTS.md 规则：
  - [#8669](https://github.com/agentscope-ai/QwenPaw/issues/8669) 飞书通道启动竞态导致 `CHANNEL_NOT_CONNECTED`，已关闭。
  - [#7943](https://github.com/agentscope-ai/QwenPaw/issues/7943) Windows 沙盒 ACL 在盘根工作区可能锁卷，已关闭。
  - [#2306](https://github.com/agentscope-ai/QwenPaw/issues/2306) 定时任务整理 Memory 文件时回复被打断的问答，已关闭。
  - [#6321](https://github.com/agentscope-ai/QwenPaw/issues/6321) AGENTS.md 工具调用前置条件规则，已关闭。
- 重要推进中的修复 PR 包括：
  - [#8729](https://github.com/agentscope-ai/QwenPaw/pull/8729) 修复 Hub 中 Anthropic/MiniMax preset 缺少 `request_headers` 导致的即时 502。
  - [#8728](https://github.com/agentscope-ai/QwenPaw/pull/8728) 修复 Responses 协议 thinking-off 控制，关联续写 summary 失败。
  - [#8720](https://github.com/agentscope-ai/QwenPaw/pull/8720)、[#8715](https://github.com/agentscope-ai/QwenPaw/pull/8715)、[#8721](https://github.com/agentscope-ai/QwenPaw/pull/8721) 分别处理微信 Bot 冲突、发送回执和插件恢复重试。
  - [#8719](https://github.com/agentscope-ai/QwenPaw/pull/8719) 支持运行时 base path 部署。
  - [#8723](https://github.com/agentscope-ai/QwenPaw/pull/8723) 处理 Codex app-server 断连后的回复收尾与线程恢复。
  - [#8722](https://github.com/agentscope-ai/QwenPaw/pull/8722) 限制 Harness 工具输出实时预览大小。
  - [#8724](https://github.com/agentscope-ai/QwenPaw/pull/8724) 修复 loopback 代理头场景下跳过认证的问题。
- 总体看，项目今日向前推进以“定位问题并提交修复”为主，实际合并落地有限；若上述 PR 合并，将覆盖 Hub 网关、Responses 续写、微信通道、部署前缀、Codex 稳定性等关键路径。

## 4. 社区热点
- [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) **13 条评论**，插件主题扩展点（semantic token override layer），是今日评论最多 Issue。诉求是插件作者需要比 `colorPrimary` 更深层的主题定制能力，反映插件生态正在从“可用”走向“可深度定制”。
- [#2306](https://github.com/agentscope-ai/QwenPaw/issues/2306) **12 条评论**，已关闭。定时任务执行 Memory 文件整理时模型回复被打断，用户需要更清晰的执行状态、日志与可观测性。
- [#8669](https://github.com/agentscope-ai/QwenPaw/issues/8669) **5 条评论**，已关闭。打包桌面版飞书通道每次启动均失败，属于通道可靠性和生产可用性问题。
- [#7608](https://github.com/agentscope-ai/QwenPaw/issues/7608) 获得今日可见 Issue 中唯一的 **1 个 👍**，诉求是钉钉渠道在 stream 模式下支持交互卡片回调，属于企业 IM 深度集成能力。
- PR 评论数字段缺失，难以按讨论热度排序；按规模和影响，重点 PR 包括 [#8554](https://github.com/agentscope-ai/QwenPaw/pull/8554) 插件 CLI 与扩展点、[#8532](https://github.com/agentscope-ai/QwenPaw/pull/8532) 追加式会话存储、[#8431](https://github.com/agentscope-ai/QwenPaw/pull/8431) 本地 Whisper SDK 插件、[#8648](https://github.com/agentscope-ai/QwenPaw/pull/8648) 本地引擎/GPU/自动更新。

## 5. Bug 与稳定性
### 高严重度
- [#8718](https://github.com/agentscope-ai/QwenPaw/issues/8718) Hub 模型网关对 Anthropic/MiniMax preset 即时失败，HTTP 502 `hub_upstream_error`，请求未离开 Hub 进程。**已有 fix PR [#8729](https://github.com/agentscope-ai/QwenPaw/pull/8729) OPEN**。
- [#8709](https://github.com/agentscope-ai/QwenPaw/issues/8709) 微信通道无法启动（`ACCOUNT_IN_USE`），且成功发送被报告为 `PLATFORM_RESULT_UNKNOWN`。**相关 PR [#8720](https://github.com/agentscope-ai/QwenPaw/pull/8720)、[#8715](https://github.com/agentscope-ai/QwenPaw/pull/8715)、[#8721](https://github.com/agentscope-ai/QwenPaw/pull/8721) OPEN**。
- [#8684](https://github.com/agentscope-ai/QwenPaw/issues/8684) 升级不迁移内置通道插件，Matrix 仍停留旧源码，导致 2.3.0 修复不生效。**样本中未见 fix PR**。
- [#7943](https://github.com/agentscope-ai/QwenPaw/issues/7943) 已关闭：Windows 沙盒 ACL 在盘根工作区可能锁卷，属于高风险平台问题，已收敛。
- [#8669](https://github.com/agentscope-ai/QwenPaw/issues/8669) 已关闭：飞书通道启动竞态，打包桌面版每次启动失败。

### 中高严重度
- [#8727](https://github.com/agentscope-ai/QwenPaw/issues/8727) Responses continuation summary 在模型默认 reasoning 耗尽 4000-token 输出预算时仍失败。**相关 PR [#8728](https://github.com/agentscope-ai/QwenPaw/pull/8728) OPEN**。
- [#8725](https://github.com/agentscope-ai/QwenPaw/issues/8725) 渠道内 `/model` 无法切换已钉住的会话级模型，钉住模型故障时无法自救。**暂无 fix PR**。
- [#8705](https://github.com/agentscope-ai/QwenPaw/issues/8705) cron 任务 token usage 未写入 `turns.jsonl`，用量面板统计缺失。**暂无 fix PR**。
- [#8696](https://github.com/agentscope-ai/QwenPaw/issues/8696) Windows 工作区路径含 `#` 时附件无法解析。**暂无 fix PR**。
- [#8706](https://github.com/agentscope-ai/QwenPaw/issues/8706) Creator 创作助手输入逐键卡顿，AgentDock 全量重渲染且无 memoization。**暂无 fix PR**。
- [#8712](https://github.com/agentscope-ai/QwenPaw/issues/8712) `execute_shell_command` 资源保护终止结果对模型不可见，模型重复调用。**暂无 fix PR**。
- [#8716](https://github.com/agentscope-ai/QwenPaw/issues/8716) Creator Windows source-intelligence 写路径使用 raw `source_id` 作为目录分量。**暂无 fix PR**。

### 功能稳定性/体验
- [#8711](https://github.com/agentscope-ai/QwenPaw/issues/8711) 建议 HTTP 200 空流或仅 thinking EOF 时自动重试一次。**暂无 PR**。
- [#8710](https://github.com/agentscope-ai/QwenPaw/issues/8710) 消息渠道缺少按会话绑定、切换和真正轮换 session 的能力。**暂无 PR**。

## 6. 功能请求与路线图信号
- **部署能力**：[#8714](https://github.com/agentscope-ai/QwenPaw/issues/8714) 希望 Console/API 支持反向代理前缀挂载；已有 PR [#8719](https://github.com/agentscope-ai/QwenPaw/pull/8719) OPEN，较可能进入下一版本。
- **插件生态**：[#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) 插件主题扩展点、[#8554](https://github.com/agentscope-ai/QwenPaw/pull/8554) 插件 CLI 与扩展点。前者长期讨论无 PR，后者为 XXXL 大 PR，短期落地难度较高。
- **通道能力**：[#7608](https://github.com/agentscope-ai/QwenPaw/issues/7608) 钉钉卡片回调、[#8710](https://github.com/agentscope-ai/QwenPaw/issues/8710) 渠道会话绑定。均为长期/无 PR 需求；微信相关修复更可能优先进入近期版本。
- **模型与推理控制**：[#8711](https://github.com/agentscope-ai/QwenPaw/issues/8711) 空流自动重试、[#8626](https://github.com/agentscope-ai/QwenPaw/pull/8626) cron 任务按 job 覆盖 `thinking_level`。后者已有 PR，可能优先讨论。
- **Console/文件预览**：[#8726](https://github.com/agentscope-ai/QwenPaw/pull/8726) 支持 docx/xlsx/pptx 只读预览；[#8133](https://github.com/agentscope-ai/QwenPaw/pull/8133) 修复 CJK Markdown 强调边界，均在评审队列。
- **本地化与端侧能力**：[#8431](https://github.com/agentscope-ai/QwenPaw/pull/8431) 本地 Whisper SDK 插件、[#8648](https://github.com/agentscope-ai/QwenPaw/pull/8648) 本地引擎/GPU/自动更新控制，均为大型 PR，需较长评审周期。
- 综合判断：下一版本更可能优先吸收**小/中规模稳定性修复**（Hub provider、Responses thinking-off、微信通道、base path、cron thinking override）；XXXL 功能与大重构短期入版概率较低。

## 7. 用户反馈摘要
- **通道生产可用性承压**：飞书启动失败、微信 `ACCOUNT_IN_USE` 与发送结果未知，直接影响企业/个人用户部署与消息可靠性。
- **升级体验不佳**：2.3.0 升级后 Matrix 等内置插件未迁移，用户遇到“升级了但修复不生效”的困惑。
- **故障自救能力不足**：渠道内 `/model` 无法切换已钉住模型，钉住模型故障时整条会话不可用。
- **可观测性需求明显**：定时任务 Memory 整理被中断、cron token 不计入 `turns.jsonl`，用户需要更完整的执行日志和用量归因。
- **Windows 兼容性仍是痛点**：路径含 `#` 附件无法解析、盘根 ACL 锁卷、Creator 写路径 raw `source_id` 等均与 Windows/路径处理相关。
- **Creator 性能影响创作体验**：中文输入逐键延迟随对话增长，用户对实时编辑流畅度不满意。
- **插件作者诉求升级**：从单一主色配置走向语义 token 级主题覆盖，说明插件生态开始进入深度定制阶段。
- 正面信号：维护者对 #8669、#7943 等高严重问题进行了关闭处理，关键 Bug 也有 fix PR 跟进；但 2.3.0 稳定性口碑仍承压。

## 8. 待处理积压
- [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) 创建于 2026-10-01，OPEN，13 条评论，插件主题扩展点，长期讨论但未见对应 PR，建议明确设计边界或排期。
- [#7608](https://github.com/agentscope-ai/QwenPaw/issues/7608) 创建于 2026-09-07，OPEN，钉钉交互卡片回调，已积压约 2 个月，影响企业 IM 深度集成。
- [#8268](https://github.com/agentscope-ai/QwenPaw/pull/8268) 创建于 2026-10-16，OPEN，`TaskTracker` 运行完成回调边界与清理修复，约 1 个月待评审。
- [#8133](https://github.com/agentscope-ai/QwenPaw/pull/8133) 创建于 2026-10-08，OPEN，Under Review，CJK Markdown 强调边界修复，约 1 个月。
- [#8431](https://github.com/agentscope-ai/QwenPaw/pull/8431) 创建于 2026-10-26，OPEN，Under Review，XXXL 本地 Whisper SDK 插件，评审周期较长。
- 大型 PR/发布 PR 积压：[#8554](https://github.com/agentscope-ai/QwenPaw/pull/8554) 插件 CLI、[#8532](https://github.com/agentscope-ai/QwenPaw/pull/8532) 会话存储、[#8648](https://github.com/agentscope-ai/QwenPaw/pull/8648) 本地引擎、[#8654](https://github.com/agentscope-ai/QwenPaw/pull/8654) Creator 2.0.5 发布。此类 PR 体量大，建议维护者分批评审，避免与小修复争抢合并窗口。
- 当前 30 条待合并 PR 是主要积压面；建议优先清理已有明确 Issue 关联的小/中规模 fix PR，以提升修复落地速度和社区信心。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-14**

---

## 1. 今日速览

- **高活跃、强清理**：过去 24 小时 Issues 更新 500 条（新开/活跃 170、关闭 330），PR 更新 500 条（待合并 355、已合并/关闭 145），关闭率为 Issue 66%、PR 29%，表明维护团队正在进行大规模积压清理与安全收敛。
- **安全冲刺主导**：今日 PR 中大量带有 `sec-marathon-2026-11-13` 标签，覆盖 Docker 镜像权限、工具结果 Unicode 隐藏字符、API 流式错误脱敏、MCP 配置注入、审批规则绕过等，安全加固是当前最高优先级。
- **统一网关（Unified Gateway）余波未平**：#143547 以 66 条评论位居讨论榜首，说明 #106742 合并后的会话/路由/配置问题仍在持续消化。
- **平台稳定性问题集中**：Windows ACL、macOS LaunchAgent、Docker 网关启动、Linux GPU 占用等平台/桌面端问题占据 P2 队列。
- **版本节奏**：发布 1 个 canary 构建（v0.23.1+canary.20261113T064447Z），属 nightly/canary 通道自动构建，非稳定版。

**健康度判断**：活跃度极高，关闭吞吐量健康；但 355 条待合并 PR 与多条 P2 平台缺陷并存，review 带宽是当前瓶颈。

---

## 2. 版本发布

### v0.23.1+canary.20261113T064447Z（2026-11-13）

- **通道**：canary（预发布自动构建），版本号格式为 `v0.23.1+canary.<UTC时间戳>`，对应 2026-11-13 06:44:47 UTC 构建。
- **内容**：数据源仅提供 release 标题与 Hermes Desktop 下载表（macOS Apple Silicon DMG 等），**未提供完整 changelog、破坏性变更或迁移说明**。基于 canary 语义，该构建反映 `main` 分支截至该时间戳的最新提交，不承诺 API/配置稳定性。
- **建议**：生产环境继续使用 stable 通道（当前 Issues 中可见 v0.22.0 / v0.22.3 用户）；canary 用户需关注统一网关相关回归（见 #143547、#137010）。
- **链接**：仓库 Releases 页（数据源未给出该 release 的独立 URL）

---

## 3. 项目进展

今日可见的已合并/关闭 PR 集中在**安全边界加固**，属于"纵深防御"而非新功能：

| PR | 内容 | 价值 |
|---|---|---|
| [#155289](https://github.com/NousResearch/hermes-agent/pull/155289) ✅ CLOSED | 修复 `_mask_control_split_tokens`：ANSI 着色（`\x1b[32msk-…`）与 Unicode 粘连 token 在 prefix/Bearer 扫描中漏脱敏 | 堵住终端彩色输出中的密钥泄漏 |
| [#155288](https://github.com/NousResearch/hermes-agent/pull/155288) ✅ CLOSED | 在存储边界对 `reasoning` / `reasoning_content` / `reasoning_details` 脱敏（对应 #43666 gap 3） | 防止模型思维链中的凭据明文落库 |

**整体推进度**：
- Issues 侧关闭 330 条，其中大量为历史安全 Issue 的收口（#107356 安全依赖、#74078 审批绕过、#94455 消息投递、#70942 auth.json 写保护、#84551/#76218 危险命令绕过、#81828 Steer-Marker 伪造、#43666 脱敏缺口、#78515 Skills 扫描、#145171 入口切换、#133659 Windows Edge 快照等）。
- PR 侧合并/关闭 145 条，但**可见的合并 PR 均标记 CLOSED 而非 MERGED 状态明细**，无法逐一确认是合并还是关闭；从 Issue 联动看，多项安全 Issue 的 fix PR 已进入关闭流程。
- 结论：本轮推进以**"还技术债 + 收安全口子"**为主，新功能净增有限。

---

## 4. 社区热点

按评论数排序，讨论最集中的话题：

1. **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547) Unified gateway 合并后遗留问题**（66 评论，OPEN，P2，跨 8+ 组件）
   - 背景：#106742 将 CLI、TUI、Desktop、API server、编辑器、消息 bot、cron、Kanban、Group Chat 全部收敛到单一 gateway 进程。#143547 追踪 post-merge 问题，并延续 #134889。
   - 诉求：统一进程是架构级收益（单一会话权威），但迁移期带来的会话路由、profile 隔离、cron 调度、桌面端连接问题需要系统性收口。评论量说明**用户在真实多入口场景下踩坑密集**。

2. **[#129455](https://github.com/NousResearch/hermes-agent/issues/129455) 默认安装下测试套件大面积失败**（28 评论，OPEN，P3）
   - `pm/environments.py` 的 import-time PM 激活链在 `$HERMES_HOME` 内 checkout 时触发 `home_io_guard`，导致 broad suite failures。
   - 诉求：**开发者体验（DX）问题**——默认安装即 red，抬高贡献门槛。

3. **[#62336](https://github.com/NousResearch/hermes-agent/issues/62336) 终端环境快照把凭据写盘**（19 评论，OPEN，P3，安全）
   - `tools/environments/base.py` 用 `export -p` 捕获**全部**环境变量（含 `bws run --` / Bitwarden 注入的密钥），持久化到 `cache/terminal/`。
   - 诉求：安全默认值缺失，属"看不见的泄漏面"；评论持续 4 个月仍未关闭，值得优先处理。

4. **[#107356](https://github.com/NousResearch/hermes-agent/issues/107356) npm 安全漏洞堆积（24/30 High）**（15 评论，已关闭）
   - 用户长期呼吁更新 npm 依赖，最终关闭，说明依赖治理已排期/处理。

5. **[#77253](https://github.com/NousResearch/hermes-agent/issues/77253) Desktop 无语言标签代码块不渲染**（13 评论，👍3，OPEN，P3）
   - `isLikelyProseFence` 误判；用户对**渲染正确性**的细节体验敏感。
   - 附：[#55287](https://github.com/NousResearch/hermes-agent/issues/55287) 可配置聊天宽度（11 评论，👍4）——桌面端 UI 可定制性是持续诉求。

**信号**：社区热点从"功能"转向"**合并后的稳定性 + 安全默认值 + 桌面端体验细节**"。

---

## 5. Bug 与稳定性

按严重程度排列（P2 优先），标注修复状态：

### P2（高优先级）

| Issue | 问题 | Fix PR 状态 |
|---|---|---|
| [#148898](https://github.com/NousResearch/hermes-agent/issues/148898) | Codex 后端对部分 zstd 压缩 `/responses` 返回不可重试 HTTP 400（#136916 引入） | 未见关联 PR，`cause/upstream` 标注 |
| [#56524](https://github.com/NousResearch/hermes-agent/issues/56524) | Telegram 内 `hermes update` 在 macOS/launchd 下 drain 超时后 gateway 离线 | 未见 |
| [#68911](https://github.com/NousResearch/hermes-agent/issues/68911) | Gateway 强制脱敏独立 E.164 号码，无 trusted-profile 白名单 | 未见，`needs-decision` |
| [#137010](https://github.com/NousResearch/hermes-agent/issues/137010) | 多路复用 gateway 的 session reset 插件检查仅在 root scope 运行 | 未见 |
| [#30989](https://github.com/NousResearch/hermes-agent/issues/30989) | BlueBubbles 文本+附件拆成两事件，打断进行中 turn（无 Telegram 式 debounce） | 未见 |
| [#144413](https://github.com/NousResearch/hermes-agent/issues/144413) | 工具结果含孤立代理字符时 gateway 结算 `UnicodeEncodeError`，会话卡 `paused: unknown_execution` | 同日 [#155392](https://github.com/NousResearch/hermes-agent/pull/155392) 处理"broken emoji JSON escape"相关场景，属同族修复 ✅ 有 PR |
| [#89732](https://github.com/NousResearch/hermes-agent/issues/89732) | Linux+AMD 桌面环境动画使 iGPU 长期 50–69% | 未见 |
| [#154701](https://github.com/NousResearch/hermes-agent/issues/154701) ✅ CLOSED | 最小化窗口时流式输出使独显 0↔100% 锯齿（1c75623ca1 回归） | 已关闭，修复已落地 |
| [#94455](https://github.com/NousResearch/hermes-agent/issues/94455) ✅ CLOSED | `notify_on_complete` 在 poll 内联处理后仍发陈旧合成 turn | 已关闭 |

### P3（中低优先级）

- [#138974](https://github.com/NousResearch/hermes-agent/issues/138974) Windows 升级破坏 `%LOCALAPPDATA%\hermes\tools\*` 继承 ACL，桌面后端 `Access is denied`（重复项，跨 P2 影响）。
- [#142743](https://github.com/NousResearch/hermes-agent/issues/142743) v0.22.3 Docker 全新 profile 启动崩溃循环，`unsafe_control_permissions`。
- [#123118](https://github.com/NousResearch/hermes-agent/issues/123118) macOS LaunchAgent 在隐私与安全中显示为不透明 `osascript`。

### 今日安全类 PR（修复在途）

`sec-marathon-2026-11-13` 系列，均 OPEN：

- [#155397](https://github.com/NousResearch/hermes-agent/pull/155397) `chat -Q` / `-z` 阻止模型文本触发 OSC 52 剪贴板写入、OSC 0 标题、`ESC[2J` 清屏。
- [#155391](https://github.com/NousResearch/hermes-agent/pull/155391) 剥离工具结果中的 Unicode TAG 字符（ASCII smuggling）与 bidi 控制符。
- [#155396](https://github.com/NousResearch/hermes-agent/pull/155396) Docker 首启即 `auth.json` 600，消除 0644 窗口。
- [#155399](https://github.com/NousResearch/hermes-agent/pull/155399) 清理镜像内 world-writable uv `.lock` 文件。
- [#155394](https://github.com/NousResearch/hermes-agent/pull/155394) API server 流式 `chat/completions` 错误脱敏。
- [#155388](https://github.com/NousResearch/hermes-agent/pull/155388) 审批规则 `DELETE FROM` 仅在同一语句自带 WHERE 时豁免。
- [#155372](https://github.com/NousResearch/hermes-agent/pull/155372) MCP 配置在 `${VAR}` 插值后再校验，防 `command: sh, args: [-c, '${X}']` 绕过。
- [#155387](https://github.com/NousResearch/hermes-agent/pull/155387) 插件 liveness 端点 URL 钉死 loopback。
- [#155390](https://github.com/NousResearch/hermes-agent/pull/155390) / [#126040](https://github.com/NousResearch/hermes-agent/pull/126040) 跳过解析到项目外的 context 文件（符号链接逃逸）。

### Bug 类 PR（待处理）

- [#155398](https://github.com/NousResearch/hermes-agent/pull/155398) `/goal` turn 失败时暂停并给原因，而非静默 idle。
- [#155373](https://github.com/NousResearch/hermes-agent/pull/155373) "keep-forever" retention 大数导致 cron `OverflowError`，任务从不触发。
- [#155395](https://github.com/NousResearch/hermes-agent/pull/155395) `x-should-retry: false` 的 503 与 TLS 证书失效立即失败，不再重试数分钟。
- [#155349](https://github.com/NousResearch/hermes-agent/pull/155349) 消息端 `/moa` turn 进入会话台账独立行，可排队与恢复。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 信号强度 | 可能纳入下一版本？ |
|---|---|---|---|
| 桌面端配置聊天宽度（`--composer-width`） | [#55287](https://github.com/NousResearch/hermes-agent/issues/55287)（👍4，OPEN，`needs-decision`） | 中 | 低—需决策，无 PR |
| 按 ownership 限定 background-review skill 写入范围 | [#142933](https://github.com/NousResearch/hermes-agent/issues/142933)（已关闭） | — | 已收口 |
| 插件目录新增 VividSites 影视化网站设计组件 | [#154155](https://github.com/NousResearch/hermes-agent/pull/154155)（OPEN） | 低 | 目录类增量，易合 |
| BlueBubbles 附件 debounce/merge（对齐 Telegram） | [#30989](https://github.com/NousResearch/hermes-agent/issues/30989) | 中 | 未见 PR |
| E.164 电话号码 trusted-profile 白名单 | [#68911](https://github.com/NousResearch/hermes-agent/issues/68911) | 中（`needs-decision`） | 需安全策略决策 |

**路线图判断**：当前版本周期的主线是**统一网关收尾 + 安全马拉松（sec-marathon-2026-11-13）+ 桌面端性能回归**，功能类需求（聊天宽度、BlueBubbles 合并、E.164 白名单）均停留在 `needs-decision`，短期不会进入 v0.23.x。VividSites 目录条目是低风险增量，可能随 canary 进入。

---

## 7. 用户反馈摘要

从 Issue 评论与摘要提炼：

**痛点（不满意）**

1. **安全默认值不足是长期抱怨主线**：终端环境快照泄漏凭据（#62336）、`auth.json` 可被 agent 自身删除（#70942）、审批规则可被 `timeout`/`bash -c`/ANSI-C 引号/数字 PID 绕过（#84551/#76218/#74078）、脱敏在持久化边界留缺口（#43666）。用户反复以 `type/security` 标签提交，部分挂起 4 个月以上。
2. **依赖与供应链卫生**：#107356 用户直指 "npm audit 24/30 are High"，语气强烈（"Keeps Stacking up"），反映对第三方包过期的不满。
3. **平台一致性差**：macOS LaunchAgent 显示为 `osascript`（#123118）、Windows ACL 破坏（#138974）、Docker 首启崩溃（#142743）、Linux/AMD GPU 占用（#89732/#154701）——**跨平台质量是 Desktop 用户的核心摩擦点**。
4. **开发者体验**：#129455 默认安装即测试 red，被标记 P3 但评论 28 条，说明贡献者受阻。
5. **升级/更新链路脆弱**：Telegram 内 `hermes update` 导致 gateway 离线（#56524）。

**满意/正面信号（间接）**

- 大量安全 Issue 在今日被 CLOSED（#107356、#74078、#70942、#84551、#76218、#81828、#43666、#78515、#145171、#133659），说明维护团队对安全报告**响应与收口意愿强**。
- `sec-marathon-2026-11-13` 集中冲刺表明团队主动治理，而非被动挨打。
- 用户提交的 PR 质量提升（#155397 等带有清晰的威胁模型与修复范围说明）。

**使用场景画像**：单操作员消息 copilot（Telegram/Slack/BlueBubbles/iMessage 多端）、Docker 自托管部署、macOS launchd 与 Windows 桌面安装、Linux+AMD 图形环境、编辑器/API 集成——**多入口、多平台、自托管**是典型用户形态，也解释了统一网关合并为何引发广泛连锁问题。

---

## 8. 待处理积压

提醒维护者关注长期未响应或高影响项：

| 项目 | 类型 | 悬置时长 | 备注 |
|---|---|---|---|
| [#62336](https://github.com/NousResearch/hermes-agent/issues/62336) 终端环境快照捕获凭据 | 安全 / P3 | 2026-07-10 起（约 4 个月） | 19 评论，安全默认值类，建议升级优先级 |
| [#30989](https://github.com/NousResearch/hermes-agent/issues/30989) BlueBubbles 附件拆事件打断 turn | Bug / P2 | 2026-05-23 起（近 6 个月） | 跨平台消息一致性 |
| [#55287](https://github.com/NousResearch/hermes-agent/issues/55287) 桌面聊天宽度设置 | Feature / P3 | 2026-06-30 起 | 👍4，`needs-decision` |
| [#68911](https://github.com/NousResearch/hermes-agent/issues/68911) E.164 强制脱敏无白名单 | Bug / P2 | 2026-07-21 起 | `needs-decision`，需安全策略拍板 |
| [#123118](https://github.com/NousResearch/hermes-agent/issues/123118) macOS LaunchAgent 不可识别 | Bug / P2 | 2026-09-25 起 | 影响 macOS 隐私授权体验 |
| [#137010](https://github.com/NousResearch/hermes-agent/issues/137010) multiplexed gateway 插件 scope | Bug / P2 | 2026-10-12 起 | 与统一网关收尾强相关，建议并入 #143547 跟踪 |
| [#126040](https://github.com/NousResearch/hermes-agent/pull/126040) 跳过项目外 context 文件 | 安全 PR | 2026-09-28 起 OPEN | 与 #155390 同题，**重复 PR，建议择一合并并关闭另一个** |
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) Unified gateway post-merge | 跟踪 / P2 | 2026-10-23 起 | 66 评论，建议设里程碑与子任务拆分 |

**积压特征**：
- **安全默认值类 Issue 悬置偏长**（#62336 近 4 个月），与今日 sec-marathon 的冲刺形成反差，建议把老 Issue 纳入同一批次。
- **重复 PR 治理**：#126040 vs #155390 同题，需明确取舍，避免 review 资源浪费。
- **355 条待合并 PR** 是当前最大吞吐瓶颈，建议按 `sec-marathon` → `P2 bug` → `needs-decision` 分层 triage。

---

**数据说明**：本日报基于过去 24 小时 500 条 Issue 与 500 条 PR 的抽样（评论数 Top 30 / Top 20）及 1 个 canary release 元数据生成；canary release 未提供完整 changelog，版本细节以官方发布页为准。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报（2026-11-14）

> **数据窗口**：过去 24 小时（截至 2026-11-13）｜**数据源**：GitHub [AstrBotDevs/AstrBot](https://github.com/AstrBotDevs/AstrBot)
> **概览**：Issues 更新 6 条（新开/活跃 6，关闭 0）｜PR 更新 19 条（待合并 16，合并/关闭 3）｜Release 0 个

---

## 1. 今日速览

- 项目维持**高频提交、低频发布**的常规开发节奏：24 小时内 6 条 Issue 活跃、19 条 PR 更新、3 条 PR 关闭，但无新版本发布。
- 贡献高度集中：**@wcqqq1214** 单日贡献 5 个 PR + 2 个 Issue（DeepSeek 语音、Gemini Decisions、KOOK 媒体、Edge TTS 超时、Anthropic key 故障转移），**@lingyun14beta** 贡献 5 个 PR（文档清理、WebUI、i18n），**@Soulter** 贡献 3 个 PR + 1 个架构级 Issue。
- 技术主线清晰：① **Provider 生态扩张与接入成本下降**（#10535/#11120、#11117/#11095、#11119/#11118）；② **稳定性与安全修复**（shell 命令解析绕过、上游误判 429、渠道媒体事件丢失）；③ **中长期架构重构**（#10077 事件日志存储、#9942 插件化 Agent Runner）。
- 健康度评估：PR 吞吐量与反馈质量良好，但 9 月起创建的长周期 PR 仍有 2 条未决（#10077、#9984）；且 #9934 已关闭、对应 Issue #7949 仍为 OPEN，存在“修复已合并但未验证/未发布”的收尾缺口，建议维护者补充状态同步。

---

## 2. 版本发布

今日无新版本发布（0 个 Release），无破坏性变更与迁移注意事项。

---

## 3. 项目进展

今日合并/关闭 3 条 PR，其中 1 条为功能性修复、2 条为 WebUI 打磨：

| PR | 状态 | 内容与影响 |
|---|---|---|
| [#9934](https://github.com/AstrBotDevs/AstrBot/pull/9934) | CLOSED | **会话级插件禁用规则补齐**：此前禁用规则只作用于 `AdapterMessageEvent` 处理器，事件钩子（`OnLLMRequestEvent`、`OnDecoratingResultEvent` 等）、function call tools 与 plugin skills 仍会执行，导致被禁用插件的 prompt 继续注入。该 PR 将规则覆盖到全部执行路径，直接对应 #7949 描述的现象。 |
| [#11107](https://github.com/AstrBotDevs/AstrBot/pull/11107) | CLOSED | **Dashboard 视觉一致性**：桌面端会话标题居中、菜单/弹窗/圆角样式统一，长标题按可用空间截断，窄屏保留堆叠头部布局。 |
| [#11103](https://github.com/AstrBotDevs/AstrBot/pull/11103) | CLOSED | **WebUI 信息架构调整**：配置 → AI → 能力顺序重排为 Web Search、Agent Computer Use、Subagents、Knowledge Base、Proactive Agent，并同步更新中英文 WebUI 指南。 |

**推进评估**：今日“净推进”以**修复与小步优化**为主——插件隔离正确性得到实质性修复（待确认是否随版本发布），WebUI 体验持续打磨；而 Provider 扩展、存储重构等核心能力型 PR 仍在评审队列中，项目整体向前迈进的幅度属于**中等偏稳健**。

---

## 4. 社区热点

按评论数与活跃度排序：

| 排名 | 条目 | 数据 | 链接 |
|---|---|---|---|
| 1 | #7949 自定义规则禁用插件但依然没生效 | 3 条评论，2026-05-01 创建、11-13 更新，跨 6 个月 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/7949) |
| 2 | #10535 Provider 请求头变量化模板 | 1 条评论，2026-10-12 创建、11-13 更新 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10535) |
| 3 | #9942 插件化 Custom Agent Runner | 1 条评论，2026-09-03 创建、11-13 更新 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/9942) |

**诉求分析**：

- **#7949** 是今日讨论最活跃的 Issue，核心诉求是**配置的可信性**：用户在指定群手动禁用 `astrbot_meme_plugin`，但追踪中仍看到该插件 prompt 被发送。这类“看似生效、实际未生效”的问题对多群、多 UMO 场景的运维信任度伤害较大，也解释了为何该 Issue 能跨越半年仍被反复顶起。
- **#10535** 反映的是**供应商接入的边际成本**：新增一个中转站需同时改 6 处（`sources/xxx_source.py` 新增类、`manager.py::dynamic_import_provider` 硬编码 `match` 等）。作者希望把“接入新供应商”从改代码变成写配置。
- **#9942** 由维护者 @Soulter 亲自提出，指向**扩展点标准化**：当前 `ThirdPartyAgentSubStage` 通过静态 `if/elif` 维护封闭集合，希望 Agent Runner 成为可版本化的插件扩展点，由 Core 统一管理配置、会话、Turn 生命周期、事件流、取消、交互与资源清理。这是路线图级别的信号。

> 注：PR 侧评论数在数据源中缺失（`undefined`），热度主要以创建/更新时间与改动规模判断。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | 问题 | 说明 | Fix PR |
|---|---|---|---|
| 🔴 高（安全） | [#11112](https://github.com/AstrBotDevs/AstrBot/pull/11112) shell 命令黑名单可绕过 | `_is_safe_command` 直接在原始命令行中做子串匹配，且每个模式都带前后空格，**改变被禁命令的拼写即可通过校验**。属于 Computer Use 能力的安全边界问题（Fixes #11039）。 | 已有（OPEN，建议优先合并） |
| 🔴 高（可用性） | [#11114](https://github.com/AstrBotDevs/AstrBot/pull/11114) 安全模式人设规则触发上游误判 429 | 自 2026-11-13 起，默认开启的 `safety_mode` 注入的 `LLM_SAFETY_MODE_SYSTEM_PROMPT` 被 Google Cloud Code / Antigravity 端点误判为异常流量，导致请求失败。 | 已有（OPEN，改写措辞规避） |
| 🟠 中（功能缺陷） | [#7949](https://github.com/AstrBotDevs/AstrBot/issues/7949) 插件禁用规则未覆盖事件钩子/工具/skills | 被禁用插件的 prompt 仍注入上下文，浪费 token 且可能污染对话。 | [#9934](https://github.com/AstrBotDevs/AstrBot/pull/9934) 已关闭，但 Issue 仍 OPEN，**需确认是否已进入发布版本** |
| 🟠 中（渠道兼容） | [#11115](https://github.com/AstrBotDevs/AstrBot/pull/11115) KOOK 媒体消息丢失 | 独立的图片/文件/音频/视频事件被忽略，文件卡片附件丢失可下载 URL。 | 已有（OPEN，含回归测试） |
| 🟠 中（配置失效） | [#11116](https://github.com/AstrBotDevs/AstrBot/pull/11116) Edge TTS 超时配置未生效 | `timeout` 被存储但从未传给 SDK，需转发到 `connect_timeout` / `receive_timeout` 并转 int。 | 已有（OPEN） |
| 🟠 中（可用性/成本） | [#11113](https://github.com/AstrBotDevs/AstrBot/pull/11113) Anthropic 主 Key 失败不切换备用 | 遇 401/403/429 时不尝试备用 Key；修复覆盖普通与流式对话，且流已开始输出时不重放。 | 已有（OPEN） |
| 🟡 低（统计准确性） | [#10826](https://github.com/AstrBotDevs/AstrBot/pull/10826) Gemini thinking tokens 未计入输出 | 仅统计 `candidates_token_count`，导致记录用量低于实际计费。 | 已有（OPEN，10-27 起挂起） |
| 🟡 低（展示） | [#11098](https://github.com/AstrBotDevs/AstrBot/pull/11098) DeerFlow 流式快照重复 | 首个 `values` 快照与已流式输出的前缀比较为空，用户看到重复文本。 | 已有（OPEN） |
| 🟡 低（展示） | [#11109](https://github.com/AstrBotDevs/AstrBot/pull/11109) 春节问候逻辑缺陷 | 日期表止于 2030 年、两个谓词重复实现同一查表逻辑。 | 已有（OPEN） |
| 🟡 低（UI） | [#11111](https://github.com/AstrBotDevs/AstrBot/pull/11111) 分组 subtitle 从未渲染 | `systemConfig.groups.*.subtitle` 自 #8777 起存在但 `createGroup` 只读 title。 | 已有（OPEN） |
| 🟡 低（渠道） | [#11021](https://github.com/AstrBotDevs/AstrBot/pull/11021) Discord 斜杠命令未遵循路由插件集 | 全局注册所有活跃插件的命令，被路由配置禁用的插件命令仍对外展示但不可用（Fixes #11013）。 | 已有（OPEN） |

**小结**：今日 Bug 面以“**安全边界 + 上游兼容 + 渠道适配**”为主，且几乎每条都有对应 fix PR 在队列中，响应速度健康；风险点在于 #11112、#11114 两条高优修复尚未合并。

---

## 6. 功能请求与路线图信号

| 需求 | 对应 PR | 落地判断 |
|---|---|---|
| [#10535](https://github.com/AstrBotDevs/AstrBot/issues/10535) Provider `custom_headers` 支持请求时变量模板（会话 ID、UMO、请求 ID、模型，支持 SHA-256 / UUID v5 转换） | [#11120](https://github.com/AstrBotDevs/AstrBot/pull/11120)（Refs #10535，OPEN） | **高概率进入下一版本**。直接削减供应商适配器数量，符合“配置替代代码”的演进方向，且 PR 已提交。 |
| [#11117](https://github.com/AstrBotDevs/AstrBot/issues/11117) 新增 Gemini Decisions API Provider（`gemini-decision-1`、多模态 `DecisionInput`、2–255 评分、概率分布） | [#11095](https://github.com/AstrBotDevs/AstrBot/pull/11095)（Closes #11117，OPEN） | **高概率落地**。复用现有 `DecisionService`，改动边界清晰，并提供中英文文档。 |
| [#11119](https://github.com/AstrBotDevs/AstrBot/issues/11119) 新增 DeepSeek STT / TTS Provider（音频归一化、流式 WAV、音色选择、Markdown 过滤） | [#11118](https://github.com/AstrBotDevs/AstrBot/pull/11118)（Closes #11119，OPEN） | **较可能进入下一版本**。补齐语音输入输出链路，减少对第三方插件的依赖。 |
| [#11108](https://github.com/AstrBotDevs/AstrBot/issues/11108) 移除 NapCat 部署方案文档 | [#11110](https://github.com/AstrBotDevs/AstrBot/pull/11110)（fix #11108，OPEN） | **快速落地**。属文档清理，但需跟进 7 个根 README 的同步修改。 |
| [#9942](https://github.com/AstrBotDevs/AstrBot/issues/9942) 插件化 Custom Agent Runner：统一协议、生命周期与配置发现 | 暂无对应 PR | **中长期方向**。属架构级扩展点设计，需设计文档与分阶段落地计划，短期内不会进入版本。 |
| [#9984](https://github.com/AstrBotDevs/AstrBot/pull/9984) 多语言指令支持（`/lang`、`multi_alias`、`get_lang`、`desc_i18n`） | 自身即 PR（OPEN，2026-09-08 起） | **待评审**。解决运行时指令输出的 i18n 缺口（现有机制仅覆盖 WebUI 展示层），与插件生态中文开发现状高度契合。 |

---

## 7. 用户反馈摘要

**真实痛点**

1. **配置可信性**（#7949）：用户按群配置禁用插件后，仍在追踪中看到该插件的 prompt 被发送。场景是典型的多群、多 UMO 差异化运营，用户需要的是“配了就一定生效”的确定性，而非事后排查。
2. **供应商接入成本**（#10535）：每接一个中转站都要改 6 处代码，用户明确提出“接入新供应商从改代码变成写配置”，本质是对**可维护性**的诉求，而非单一功能缺失。
3. **文档与生态脱节**（#11108）：NapCat 已删库停用，但文档中大量一键部署教程仍在，新用户按文档操作会直接踩空。用户诉求是及时清理过时内容并给出替代路径。
4. **成本可见性**（#10826）：Gemini thinking tokens 未计入输出 token，导致记录用量与实际计费不符，影响用户对成本的判断。

**使用场景特征**

- 多群/多会话的差异化插件编排（#7949、#11021 的 Discord 路由插件集）；
- 通过中转站/第三方网关接入多家模型与语音服务（#10535、#11113）；
- 多模态内容处理：图片、文件、音频、视频与 PDF（#11115、#11117）；
- 语音消息转文本参与对话、回复合成语音（#11119）。

**满意 / 正面信号**

- Issue 普遍附带复现步骤、截图、改动点清单与测试说明（如 #10535 的“6 处改动”表格、#11112 的绕过样例对照表），说明核心用户群技术素养高、反馈质量好，降低了维护者的定位成本。
- 单日出现多名贡献者批量提交成组 PR（@wcqqq1214 5 个、@lingyun14beta 5 个），且多数 PR 自带测试或文档，体现较强的自组织贡献氛围。

**不满意点**

- 长期 Issue 的收尾沟通不足：#7949 自 5 月创建至今仍 OPEN，修复 PR 已关闭但用户侧无明确状态回执。

---

## 8. 待处理积压

| 条目 | 创建时间 | 积压时长 | 提醒 |
|---|---|---|---|
| [#10077](https://github.com/AstrBotDevs/AstrBot/pull/10077) refactor: 会话存储迁移到事件日志后端 | 2026-09-14 | ≈2 个月 | 影响面最大的重构：统一消息数组、压缩/插件编辑覆盖、WebChat checkpoint、Agent 执行状态。建议拆分阶段目标并给出评审排期。 |
| [#9984](https://github.com/AstrBotDevs/AstrBot/pull/9984) feat(lang): 多语言指令支持 | 2026-09-08 | ≈2 个月 | 运行时 i18n 缺口明确（fix #10406），社区有实际需求，长期悬置易造成重复实现。 |
| [#9942](https://github.com/AstrBotDevs/AstrBot/issues/9942) 插件化 Custom Agent Runner | 2026-09-03 | ≈2 个月 | 架构级 Issue，建议先输出设计文档与兼容性方案，再拆分 PR，避免长期停留在讨论阶段。 |
| [#10535](https://github.com/AstrBotDevs/AstrBot/issues/10535) Provider 请求头模板 | 2026-10-12 | ≈1 个月 | 已有 PR #11120，建议尽快 review，避免 Issue 与 PR 双挂起。 |
| [#10826](https://github.com/AstrBotDevs/AstrBot/pull/10826) Gemini token 统计修正 | 2026-10-27 | ≈2.5 周 | 修复逻辑明确、范围可控，建议尽快合并。 |
| [#11021](https://github.com/AstrBotDevs/AstrBot/pull/11021) Discord 路由插件集 | 2026-11-06 | ≈1 周 | 修复 #11013，属渠道一致性缺陷，等待评审。 |
| [#7949](https://github.com/AstrBotDevs/AstrBot/issues/7949) 插件禁用规则未生效 | 2026-05-01 | ≈6.5 个月 | **状态收尾项**：#9934 已关闭，但 Issue 仍 OPEN。建议维护者确认修复是否已进入发布版本并回复用户，避免“已修复但用户不知情”。 |

---

**数据说明**：本报告基于给定 GitHub 数据快照生成；PR 评论数在数据源中缺失，相关热度判断以创建/更新时间与改动描述为依据。CLOSED 状态包含“已合并”与“未合并关闭”两种可能，涉及具体合并结论时建议以仓库实际状态为准。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报（2026-11-14）

> 数据口径：过去 24 小时 Discussions 更新 191 条；项目未启用 GitHub Issues/PR，社区讨论集中在 Discussions；Release changelog 视为合并摘要。  
> 健康度判断：**社区高度活跃、rc 迭代持续，但 Windows 桌面稳定性、认证/工作区可用性与 Agent 高风险操作安全是当前主要风险点。**

---

## 1. 今日速览

- 项目今日保持高社区活跃：过去 24 小时 Discussions 更新 **191 条**，评论最多的 15 条讨论合计 **232 条评论**。
- 发布 **dsh-v0.2.2-rc.3**，落地 2 项变更：实验性 DeepSeek 会话导入插件、Windows 桌面应用内更新失败修复。
- 社区热度集中在 **支付可及性、Windows 更新/认证失败、工作区不可用、Agent 误操作导致数据丢失、成本控制**。
- 整体看，项目迭代节奏正常、插件生态有活跃信号；但多个高影响问题长期开放，稳定化仍是主线。

---

## 2. 版本发布

### dsh-v0.2.2-rc.3

链接：[Full Changelog](https://github.com/deepseek-ai/deepseek-harness/compare/dsh-v0.2.2-rc.2...dsh-v0.2.2-rc.3)

**新增功能**
- 新增实验性「DeepSeek 会话导入」插件，支持将 DeepSeek App 或网页版历史会话导入工作区并继续对话。作者：@imccyu。
- 该功能扩展了工作区会话连续性，但标注为**实验性**，适合先在非关键工作区试用。

**问题修复**
- 修复 Windows 桌面版应用内更新可能失败、无法自动重新打开的问题。作者：@winewill。
- 该修复直接指向近期社区高频反馈的 Windows 更新链路问题，建议 Windows 用户升级后验证版本号与自动重启行为。

**破坏性变更**
- Release note 未声明破坏性变更。

**迁移与注意事项**
- 仍为 `rc` 预发布版本，建议升级前备份重要工作区与会话数据。
- 会话导入插件涉及历史会话数据迁移，建议先在测试工作区验证导入结果与继续对话行为。
- 若 Windows 更新仍失败，社区讨论 [#13025](https://github.com/deepseek-ai/deepseek-harness/discussions/13025) 提供了从 `%TEMP%` 运行已下载安装包的临时规避方案；该方案来自社区，非官方 release note 承诺。

---

## 3. 项目进展

项目未启用 Issues/PR，因此不以 PR 数量判断进展。本次 **dsh-v0.2.2-rc.3** 的合并摘要显示，项目向前推进了两项实质变更：

1. **会话导入能力进入实验阶段**：DeepSeek App/网页版历史会话可导入工作区并继续对话，提升跨端/跨工作区的会话连续性。  
   链接：[Release changelog](https://github.com/deepseek-ai/deepseek-harness/compare/dsh-v0.2.2-rc.2...dsh-v0.2.2-rc.3)
2. **Windows 桌面更新可靠性修复**：针对应用内更新失败、无法自动重新打开的问题进行修复，对 Windows 分发体验有直接正向作用。  
   链接：[Release changelog](https://github.com/deepseek-ai/deepseek-harness/compare/dsh-v0.2.2-rc.2...dsh-v0.2.2-rc.3)

**整体评价**：这是一次增量 rc 迭代，不是大版本跃迁。功能侧新增实验性会话迁移，稳定性侧修复 Windows 更新问题；但社区热门讨论中的认证、工作区不可用、OOM、Agent 误操作等高风险问题，未在本版 release note 中明确体现修复。项目“向前一小步”，稳定化与安全边界仍是后续重点。

---

## 4. 社区热点

今日讨论最活跃的条目主要集中在可用性、支付与数据安全。以下按评论数排序：

| 讨论 | 评论 | 核心诉求 |
|---|---:|---|
| [#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755) Support MIR card payments for DeepSeek API | 64 | 俄罗斯用户无法用本地卡充值 API，支付可及性成为采用门槛；涉及区域支付与合规。 |
| [#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) Desktop “Web authentication failed”: stale `dsh-auth-*` cookies overflow Host header limit (431) | 35 | 桌面端认证因陈旧 cookies 溢出 Host header 触发 431，阻断登录；用户希望清理/迁移机制。 |
| [#8357](https://github.com/deepseek-ai/deepseek-harness/discussions/8357) 添加工作区出现错误 | 17 | `workspaceController` 不可用导致无法创建工作区，属核心流程阻断。 |
| [#12751](https://github.com/deepseek-ai/deepseek-harness/discussions/12751) 让写插件却清空 dsh/zcode 目录 | 16 | Agent 自主文件操作造成目录清空、会话丢失，用户对权限边界与数据安全强烈不满。 |
| [#10100](https://github.com/deepseek-ai/deepseek-harness/discussions/10100) DSML 输出问题何时能解决 | 14 | 模型在工具未实现时自生成工具调用，DSML 标记泄漏到普通文本，影响输出可用性。 |
| [#13025](https://github.com/deepseek-ai/deepseek-harness/discussions/13025) Desktop 应用内更新后不重启、版本没变 | 14 | Windows 更新 `MoveFileExW error 32`，用户提供 `%TEMP%` 规避方案；与本版修复方向相关。 |

**分析**：社区讨论已从单纯功能诉求转向“能否稳定用、是否安全、成本是否可控”。支付区域化、Windows 更新/认证、Agent 破坏性操作是三大焦点；其中 #12751 的情绪强度最高，说明用户对 Agent 文件操作的信任成本很敏感。

---

## 5. Bug 与稳定性

> 说明：以下为今日活跃讨论中的稳定性问题。项目未启用 PR，无法确认公开 fix PR；状态以 release note 是否明确提及为准。

| 严重度 | 问题 | 状态 / 修复信号 |
|---|---|---|
| **P0** | [#12751](https://github.com/deepseek-ai/deepseek-harness/discussions/12751) Agent 写插件时清空 `dsh`/`zcode` 目录，会话丢失 | OPEN；无公开 fix PR；release note 未提及。属数据安全与权限确认问题，建议优先处理。 |
| **P1** | [#13025](https://github.com/deepseek-ai/deepseek-harness/discussions/13025) Windows 应用内更新后不重启，`MoveFileExW error 32` | OPEN；v0.2.2-rc.3 已声明修复“应用内更新可能失败/无法自动重开”，但未明确确认覆盖该场景，需验证。 |
| **P1** | [#9995](https://github.com/deepseek-ai/deepseek-harness/discussions/9995) 更新安装失败，备份重命名 `error 5` | OPEN；本版修复方向相关，但 release note 未点名该错误码；需确认是否缓解。 |
| **P1** | [#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) 桌面认证失败 431，陈旧 `dsh-auth-*` cookies 溢出 | OPEN；release note 未提及；无公开 fix PR。 |
| **P1** | [#8357](https://github.com/deepseek-ai/deepseek-harness/discussions/8357) `workspaceController` 不可用，无法创建工作区 | OPEN；release note 未提及；核心流程阻断。 |
| **P1** | [#4722](https://github.com/deepseek-ai/deepseek-harness/discussions/4722) `dsh web` 内存日志无界增长，长会话 OOM | OPEN；创建于 2026-08-27，长期未在 release note 中明确关闭；高负载场景风险大。 |
| **P1** | [#12109](https://github.com/deepseek-ai/deepseek-harness/discussions/12109) Auto preset 每次工具调用触发全上下文审查，占 13 天账单 42% | OPEN；非崩溃但成本风险高；release note 未提及成本优化。 |
| **P2** | [#9086](https://github.com/deepseek-ai/deepseek-harness/discussions/9086) Windows 沙箱低完整性标签残留，影响构建产物运行 | OPEN；release note 未提及；涉及沙箱权限回滚。 |
| **P2** | [#9662](https://github.com/deepseek-ai/deepseek-harness/discussions/9662) `subagent` 空字符串 provider/model 被当显式选择并报错 | OPEN；错误信息缺少补救指引；release note 未提及。 |
| **P2** | [#10162](https://github.com/deepseek-ai/deepseek-harness/discussions/10162) `ELECTRON_RUN_AS_NODE` 泄漏导致 VS Code 等 Electron 应用无法启动 | OPEN；release note 未提及。 |
| **P2** | [#7874](https://github.com/deepseek-ai/deepseek-harness/discussions/7874) Windows「打开方式」始终显示无法获取应用列表 | OPEN；单个 shell handler 失败导致整个列表作废；release note 未提及。 |

**稳定性判断**：本版修复了 Windows 更新类问题的一部分，是明确正向信号；但 P0 数据丢失与多项 P1 核心流程问题仍未在 release note 中体现，稳定性风险仍偏高。

---

## 6. 功能请求与路线图信号

> 项目无公开 PR 通道，以下结合 release note 与 Discussions 热度推断，非官方路线图。

| 需求 | 讨论 | 信号与判断 |
|---|---|---|
| 支持 MIR 卡支付 DeepSeek API | [#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755) | 64 条评论，热度最高；但涉及支付合规、区域商务与结算，短期进入 rc 的概率较低，更可能作为中长期商务议题。 |
| 重启后到达的人工审批 | [#6989](https://github.com/deepseek-ai/deepseek-harness/discussions/6989) | 面向服务端多租户、非线程内审批人；涉及运行时架构与权限模型，中期需求，短期落地难度高。 |
| Auto preset 成本控制/审查开关 | [#12109](https://github.com/deepseek-ai/deepseek-harness/discussions/12109) | 用户给出 42% 账单占比的明确数据；属高优先级优化信号，可能比支付/审批更早进入后续版本。 |
| DSML 输出修复 | [#10100](https://github.com/deepseek-ai/deepseek-harness/discussions/10100) | 14 条评论，问题可复现；属模型/工具调用鲁棒性修复，适合优先排期。 |
| DeepSeek 会话导入 | [dsh-v0.2.2-rc.3](https://github.com/deepseek-ai/deepseek-harness/compare/dsh-v0.2.2-rc.2...dsh-v0.2.2-rc.3) | 已作为实验性插件落地，后续应关注导入成功率、隐私边界与跨端兼容反馈。 |

**下一版本可能优先项**：Windows 更新修复的验证与扩展、认证 cookies 清理、工作区服务可用性、成本控制/审查开关。支付集成与重启后审批周期较长，短期不宜期待。

---

## 7. 用户反馈摘要

**真实痛点**
- **Windows 更新链路脆弱**：多个版本出现 `MoveFileExW error 32/5`，应用退出不重启、版本不变；社区自行总结 `%TEMP%` 规避方案，说明官方修复前用户已形成“自救”路径。
- **Agent 高风险操作缺乏安全感**：#12751 中用户让 Agent 写插件，结果 `dsh`/`zcode` 目录被清空、会话丢失；用户对“自主执行 + 文件操作”的信任明显受损，需要权限确认、回收站/备份与可恢复机制。
- **认证与工作区核心流程阻断**：431 cookies 溢出、`workspaceController` 不可用，直接阻断登录与创建工程。
- **成本不可控**：Auto preset 每次工具调用触发全上下文审查，用户观察到占 13 天账单 42%；需要预算上限、审查开关与费用审计。
- **错误信息不友好**：`subagent` 空字符串路由字段被直接拒绝且无补救提示，增加排障成本。
- **区域支付门槛**：俄罗斯用户无法用本地卡充值 API，影响 API 采用与工具链落地。

**使用场景**
- 俄罗斯用户 API 充值与企业采用；
- 服务端多租户运行时、跨角色人工审批；
- Windows 桌面日常更新与工作区创建；
- 长会话/重度编排的 `dsh web` 使用；
- 通过 open-in-app 启动 VS Code 等 Electron 应用；
- 社区插件开发与展示，如 [dsh-code-index v0.11.0](https://github.com/deepseek-ai/deepseek-harness/discussions/5623)。

**满意/不满意**
- 正向：rc 迭代持续，Windows 更新修复与会话导入是可见改进；社区插件生态有活跃展示。
- 负向：高影响问题长期开放，部分错误缺少官方状态与修复计划；数据安全与成本控制是用户最敏感的两类反馈。

---

## 8. 待处理积压

以下讨论创建时间较早、持续更新且影响较大，建议维护者补充状态标签、修复计划或官方规避方案：

| 讨论 | 创建 | 评论 | 积压原因 |
|---|---:|---:|---|
| [#4722](https://github.com/deepseek-ai/deepseek-harness/discussions/4722) `dsh web` 长会话 OOM | 2026-08-27 | 9 | 内存日志无界增长，长会话/重度编排场景崩溃；长期开放。 |
| [#6989](https://github.com/deepseek-ai/deepseek-harness/discussions/6989) 重启后人工审批 | 2026-09-18 | 7 | 服务端多租户架构需求，涉及审批持久化与权限模型。 |
| [#7874](https://github.com/deepseek-ai/deepseek-harness/discussions/7874) Windows 打开方式列表失败 | 2026-09-25 | 8 | 单个 shell handler 失败导致整个应用列表作废。 |
| [#8357](https://github.com/deepseek-ai/deepseek-harness/discussions/8357) 工作区创建失败 | 2026-09-30 | 17 | `workspaceController` 不可用，核心流程阻断，评论较多。 |
| [#9086](https://github.com/deepseek-ai/deepseek-harness/discussions/9086) Windows 沙箱标签残留 | 2026-10-07 | 9 | 低完整性标签不回滚，影响构建产物运行。 |
| [#9662](https://github.com/deepseek-ai/deepseek-harness/discussions/9662) `subagent` 空字符串路由报错 | 2026-10-14 | 7 | 错误信息无补救，影响子代理配置体验。 |
| [#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) 桌面认证 431 | 2026-10-17 | 35 | 评论数高、阻断登录；长期开放。 |
| [#9995](https://github.com/deepseek-ai/deepseek-harness/discussions/9995) Windows 更新 `error 5` | 2026-10-17 | 9 | 更新失败不可完成，与本版修复方向相关但未确认覆盖。 |
| [#10100](https://github.com/deepseek-ai/deepseek-harness/discussions/10100) DSML 输出问题 | 2026-10-18 | 14 | 可复现的输出污染问题，影响工具调用可信度。 |

**维护建议**：优先对 P0/P1 问题给出明确状态与时间表；对 Windows 更新问题发布官方验证清单；对 Agent 文件操作增加权限确认/备份/恢复能力说明；对成本与认证问题提供临时规避方案，降低社区重复排障成本。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*