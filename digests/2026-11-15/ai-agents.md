# OpenClaw 生态日报 2026-11-15

> Issues: 388 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-15 01:25 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报  
**日期：2026-11-15** | 统计窗口：过去 24 小时 | 数据来源：OpenClaw GitHub

## 1. 今日速览

过去 24 小时 OpenClaw 保持很高活跃度：Issues 更新 388 条、PR 更新 500 条，并发布 1 个 beta 版本。Issue 侧新开/活跃 323 条、关闭 65 条；PR 侧待合并 349 条、已合并/关闭 151 条，说明开发与修复吞吐都很高，但待处理队列仍明显扩张。`v2026.11.5-beta.3` 聚焦大会话可靠性，降低 transcript indexing、trimming、compaction 的内存压力。社区讨论集中在 prompt-cache 成本、Codex/subagent 连续性、Windows/更新可靠性、Control UI 稳定性与跨平台 UX。整体健康度评估：**迭代速度快、修复管线密集，但高严重度开放问题和跨平台稳定性仍是主要风险**。

---

## 2. 版本发布

### [v2026.11.5-beta.3](https://github.com/openclaw/openclaw/releases/tag/v2026.11.5-beta.3)

**更新重点：Large-session reliability**
- 降低 transcript indexing、trimming、compaction 过程中的内存压力。
- 仅流式加载选定的 hydration payload。
- 遵守可配置的 summary limits。
- 关联条目：#194099、#194066、#194536、#196207；致谢 @vincentkoc、@aniruddhaadak80。

**破坏性变更 / 迁移注意事项**
- 发布说明中未披露破坏性变更或强制迁移步骤。
- 由于是 beta 版本，建议在非生产环境重点验证大会话、长 transcript、压缩/摘要配置与内存占用；升级前保留状态存储备份。

---

## 3. 项目进展

过去 24 小时 PR 更新 500 条，其中 151 条已合并/关闭，但数据明细主要展示了高评论/高优先级 PR，且大多数仍为 OPEN。可确认的推进包括：

| 类型 | 条目 | 状态 | 进展说明 |
|---|---|---|---|
| 发布 | [v2026.11.5-beta.3](https://github.com/openclaw/openclaw/releases/tag/v2026.11.5-beta.3) | 已发布 | 大会话内存压力与 hydration/summary 限制修复，是本日最明确的项目推进。 |
| PR | [#199307 fix(cli): cancel gateway call reads that land after Ctrl+C](https://github.com/openclaw/openclaw/pull/199307) | CLOSED | 可见明细中唯一明确关闭的 PR，改善 CLI 在 Ctrl+C 后的挂起读取取消行为。 |
| Issue | [#172837 Codex nativeSubagentAssignments 完成后未移除](https://github.com/openclaw/openclaw/issues/172837) | CLOSED | 20 条评论，涉及 Codex 子代理完成投递失败后的状态清理。 |
| Issue | [#44309 A2A 单向 dispatch handoff 模式](https://github.com/openclaw/openclaw/issues/44309) | CLOSED | 18 条评论，Agent-to-Agent 消息语义讨论已关闭。 |
| Issue | [#114913 memory search 主 embedding 超时前回退 FTS](https://github.com/openclaw/openclaw/issues/114913) | CLOSED | 与 memory_search 超时和回退路径相关。 |
| Issue | [#102961 after_tool_call hook 接收结构化 ToolResult](https://github.com/openclaw/openclaw/issues/102961) | CLOSED | 改善插件检测 exec/bash 失败的能力。 |
| Issue | [#167762 anthropic Claude 上下文窗口不可选](https://github.com/openclaw/openclaw/issues/167762) | CLOSED | 直接 Anthropic 模型 context window 配置问题关闭。 |

**整体推进判断：** beta 发布直接改善大会话可靠性；Issue 关闭显示 Codex/subagent、A2A、memory、插件 hook 等方向有清理。但高严重度 Open Issue 仍多，净积压压力尚未缓解。

---

## 4. 社区热点

### 讨论最活跃的 Issues

| Issue | 评论/反应 | 状态 | 热点诉求 |
|---|---:|---|---|
| [#172837 Codex nativeSubagentAssignments 未在放弃投递后移除](https://github.com/openclaw/openclaw/issues/172837) | 20 评论 | CLOSED | Codex 子代理生命周期与完成投递失败后的状态清理，涉及每个新父线程重复 pin/send。 |
| [#44309 A2A 单向 dispatch 模式](https://github.com/openclaw/openclaw/issues/44309) | 18 评论，1 👍 | CLOSED | 希望 agent-to-agent 支持“只投递、不回传 ping-pong”的 handoff 语义。 |
| [#143017 Prompt-cache：持久会话重写前缀的五种方式](https://github.com/openclaw/openclaw/issues/143017) | 16 评论 | OPEN | 生产流量测得 21.3M cache-write tokens，成本与缓存复用是核心痛点。 |
| [#162585 Windows 插件 source-capture staging 不收敛](https://github.com/openclaw/openclaw/issues/162585) | 16 评论 | OPEN | Windows 上大型 npm 树从 290 MB 膨胀到 612 MB+/24 min，Gateway 无法健康。 |
| [#163739 Control UI Ctrl+Shift+A 归档快捷键不可配置](https://github.com/openclaw/openclaw/issues/163739) | 15 评论，1 👍 | OPEN | 与浏览器快捷键冲突，需要可禁用/重映射。 |
| [#192632 Claude web search provider](https://github.com/openclaw/openclaw/issues/192632) | 15 评论 | OPEN | 希望新增 Anthropic 服务端 `web_search` provider，与 Gemini/Perplexity 对齐。 |

**分析：** 讨论重心不是单一功能，而是 **成本、会话状态、子代理连续性、平台可靠性和可控性**。Prompt-cache 成本与 Codex/subagent 生命周期问题具有生产影响，社区投入评论最多；Windows 插件 staging 和 Control UI 快捷键则体现跨平台落地摩擦。

### PR 热点说明
提供的数据中 PR 评论数为 `undefined`，无法按评论数客观排序。按 P1、规模与风险看，值得关注：
- [#196092 fix(agents): keep claude-cli replies after session reset/interrupted run](https://github.com/openclaw/openclaw/pull/196092)：P1、XL，关联 claude-cli 回复丢失，仍需 proof。
- [#198426 fix(claude-cli): warm process follow-up turns fail with “Native tool authority capture is no longer active”](https://github.com/openclaw/openclaw/pull/198426)：P1，ready for maintainer look。
- [#190513 fix(agents): ask_user 忽略 “1. Deny” 中的问题编号](https://github.com/openclaw/openclaw/pull/190513)：P2，ready for maintainer look。
- [#194376 feat(gateway): admit sessions_send wake starts](https://github.com/openclaw/openclaw/pull/194376)、[#194566 feat(ai): record bounded prompt presence checks](https://github.com/openclaw/openclaw/pull/194566)：跨多模块、影响面大。
- [#129388 feat(continuation): context-pressure-aware continuation](https://github.com/openclaw/openclaw/pull/129388)：XL、安全敏感、需 proof，属于长期大型路线图型 PR。

---

## 5. Bug 与稳定性

按严重程度排列，重点关注过去 24 小时更新中的 P0/P1 与回归问题。

| 严重度 | 条目 | 状态 | 影响 | Fix PR / 备注 |
|---|---|---|---|---|
| P0 | [#193094 Managed update 在 validating 挂起 57 分钟后被 SIGKILL](https://github.com/openclaw/openclaw/issues/193094) | OPEN | 更新流程超过 1800s step budget，影响发布可用性 | 标签含 `no-new-fix-pr`，未见 fix PR |
| P0 | [#194664 Codex protected continuation 阻塞后续消息，Stop 却显示无活动 run](https://github.com/openclaw/openclaw/issues/194664) | OPEN | 2026.11.1 上 Control UI 会话无法继续，`ux-release-blocker` | 未见 fix PR |
| P0 | [#161800 iOS 内嵌 Dashboard 每次页面加载新建浏览器设备身份，循环配对](https://github.com/openclaw/openclaw/issues/161800) | OPEN | 安全 + 配对循环，`impact:security` | 标签含 `no-new-fix-pr` |
| P1 | [#196199 回归：native Codex helper 完成无法恢复父会话](https://github.com/openclaw/openclaw/issues/196199) | OPEN | 父 agent 暂停 goals，用户被锁出助手 | `needs-info`，未见 fix PR |
| P1 | [#194403 Helper-completion continuation 使自身 authority 失效并阻塞会话](https://github.com/openclaw/openclaw/issues/194403) | OPEN | 高：阻塞后续人类消息与后台工作 | 未见 fix PR |
| P1 | [#196656 Windows 上 subagent runs/completions 不可靠](https://github.com/openclaw/openclaw/issues/196656) | OPEN | announce 失败、batch authority error、worker preparation UNAVAILABLE、无重试 | 标签含 `no-new-fix-pr` |
| P1 | [#128140 memory_search 工具总是 15s 超时](https://github.com/openclaw/openclaw/issues/128140) | OPEN | CLI 正常但工具超时，影响记忆检索 | 标签含 `no-new-fix-pr` |
| P1 | [#84662 Codex app-server 将 runtime context 写入 native user history，导致 input 增长](https://github.com/openclaw/openclaw/issues/84662) | OPEN | 响应输入膨胀与成本风险 | 部分缓解 PR [#199361](https://github.com/openclaw/openclaw/pull/199361) 已开，明确不关闭 issue |
| P1 | [#196820 Control UI 在 `Element.getAnimations()` 循环中约 100% CPU 卡死](https://github.com/openclaw/openclaw/issues/196820) | OPEN | 2026.11.2 回归，macOS WebContent/Edge 受影响 | 标签含 `no-new-fix-pr` |
| P2 | [#162585 Windows 插件 staging 线性膨胀，Gateway 不健康](https://github.com/openclaw/openclaw/issues/162585) | OPEN | 290 MB -> 612 MB+/24 min | 未见 fix PR |
| P2 | [#197083 安装后 Doctor WAL 校验失败，11.3 更新部分完成](https://github.com/openclaw/openclaw/issues/197083) | OPEN | 外部插件状态可能残留不一致 | 标签含 `no-new-fix-pr` |
| P2 | [#197531 macOS TTS 分段 MP3 转 CAF 报告截断但退出成功](https://github.com/openclaw/openclaw/issues/197531) | OPEN | 音频消息可能丢失大部分内容 | 未见 fix PR |
| P2 | [#180978 Active Memory 超时断路器在聊天节奏下永不打开](https://github.com/openclaw/openclaw/issues/180978) | OPEN | 慢 recall 每轮阻塞完整预算 | 标签含 `no-new-fix-pr` |

**稳定性判断：** P0 问题集中在 **更新流程、Codex continuation、iOS 设备身份/配对**；P1 问题集中在 **Codex/subagent 完成恢复、memory_search 超时、Control UI CPU 回归**。多个问题带 `no-new-fix-pr`，短期仍需维护者分流。

---

## 6. 功能请求与路线图信号

| 功能请求 | 信号 | 短期纳入下一版本可能性（基于标签/PR 推断） |
|---|---|---|
| [#192632 Claude web search provider](https://github.com/openclaw/openclaw/issues/192632) | P2、diamond lobster、`impact:auth-provider`、需产品决策 | 中：方向明确，但未见实现 PR，需 provider 设计与产品决策 |
| [#163739 Ctrl+Shift+A 归档快捷键可配置](https://github.com/openclaw/openclaw/issues/163739) | P2、UX friction、需产品决策 | 低-中：改动局部，但长期 stale |
| [#136271 msteams 动态解析团队 SharePoint site](https://github.com/openclaw/openclaw/issues/136271) | P2、channel 适配、`not-repro-on-main` | 低：平台特定，需复现与渠道维护 |
| [#130247 Cron 增加 `--until` / `--max-runs` 与累计运行计数](https://github.com/openclaw/openclaw/issues/130247) | P3、scheduler 能力缺口 | 低：需求清晰但优先级不高 |
| [#166678 在 agent picker 中隐藏 agent 但保持可 spawn](https://github.com/openclaw/openclaw/issues/166678) | P2、多 agent UX、需产品决策 | 低-中：多 agent 场景真实，但涉及 WebUI/macOS/iOS |
| [#56349 不可绕过的 outbound policy enforcement](https://github.com/openclaw/openclaw/issues/56349) | P2、security、需安全审查/live repro | 中-长期：战略价值高，但实现与安全审查复杂 |
| [#140213 多个 policy alias 解析到同一模型](https://github.com/openclaw/openclaw/issues/140213) | P2、auth-provider、需产品决策 | 低-中：配置模型语义问题，需 maintainer 决策 |
| [#179954 memory 按条目 chunking 路径可配置](https://github.com/openclaw/openclaw/issues/179954) | P3、已有 linked PR open | 中：已有 PR 关联，若 review 顺利可能推进 |
| [#184803 Talk 中关闭/替换 spoken task receipt](https://github.com/openclaw/openclaw/issues/184803) | P3、realtime Talk UX | 低：细分体验优化 |
| [#159663 任务进度卡显示执行 agent](https://github.com/openclaw/openclaw/issues/159663) | P3、Control UI UX | 低：小范围 UI 改进 |

**路线图信号：** 小型、局部、有 proof 的修复更可能进入下一 beta，例如 CLI 取消、Docker 权限、Feishu Markdown 转义、Gateway 插件元数据刷新、Codex catalog 超时等。大型跨模块能力——`sessions_send` wake admission（[#194376](https://github.com/openclaw/openclaw/pull/194376)）、prompt presence checks（[#194566](https://github.com/openclaw/openclaw/pull/194566)）、GitHub 插件迁移（[#192350](https://github.com/openclaw/openclaw/pull/192350)）、context-pressure continuation（[#129388](https://github.com/openclaw/openclaw/pull/129388)）——影响面大且多含安全/兼容风险，短期不确定性较高。

---

## 7. 用户反馈摘要

从 Issues 评论与摘要看，真实痛点主要集中在以下方面：

1. **成本与缓存复用**
   - [#143017](https://github.com/openclaw/openclaw/issues/143017)：持久会话重写 prefix，测得 21.3M cache-write tokens。
   - [#182891](https://github.com/openclaw/openclaw/issues/182891)：每次请求 `cache read dropped N -> 0`，prompt cache 未复用。
   - [#177506](https://github.com/openclaw/openclaw/issues/177506)：Skill Workshop review 破坏 prompt-cache prefix，一晚约 16.7M tokens 被丢弃。
   - 用户对“长期会话越用越贵、缓存不可预测”的不满明显。

2. **Codex / subagent 连续性**
   - [#196199](https://github.com/openclaw/openclaw/issues/196199)、[#194403](https://github.com/openclaw/openclaw/issues/194403)、[#196656](https://github.com/openclaw/openclaw/issues/196656) 均指向 helper completion 后父会话无法恢复、authority 丢失、Windows 上 completion 丢失。
   - 这是生产可用性问题，用户描述为“暂停 goals、锁出助手、阻塞后续消息”。

3. **更新与安装可靠性**
   - [#193094](https://github.com/openclaw/openclaw/issues/193094)：managed update 在 validating 阶段挂起近 57 分钟。
   - [#197083](https://github.com/openclaw/openclaw/issues/197083)：WAL 校验失败导致更新部分完成。
   - [#183479](https://github.com/openclaw/openclaw/issues/183479)：extended-stable 更新修复仍被 retained package recovery 阻塞。
   - 用户需要更可预测的回滚、恢复与诊断信息。

4. **性能与资源**
   - `memory_search` 15s 超时（[#128140](https://github.com/openclaw/openclaw/issues/128140)、[#136405](https://github.com/openclaw/openclaw/issues/136405)）。
   - Active Memory 断路器不生效（[#180978](https://github.com/openclaw/openclaw/issues/180978)）。
   - Control UI CPU 卡死（[#196820](https://github.com/openclaw/openclaw/issues/196820)）、macOS Settings 卡顿/暗色主题输入框不可见（[#192667](https://github.com/openclaw/openclaw/issues/192667)）。
   - Windows 插件 staging 磁盘/内存膨胀（[#162585](https://github.com/openclaw/openclaw/issues/162585)）。

5. **可观测性与运营**
   - [#127195](https://github.com/openclaw/openclaw/issues/127195)：16 个调用点输出完全相同错误，无 reason code。
   - [#130257](https://github.com/openclaw/openclaw/issues/130257)：委派 ACP run 不记录 token/cost，父 turn $0.04、子 run $14.14 无法归因。
   - [#183048](https://github.com/openclaw/openclaw/issues/183048)：outbound queue 无 CLI 检查/结算 `unknown_after_send`。
   - 用户希望生产日志和运维工具能直接定位原因、成本和投递状态。

**满意度信号：** 数据中未见明确的正面满意度集中表达；反馈以生产可靠性、成本可控性和诊断能力不满为主。

---

## 8. 待处理积压

以下为长期开放、影响面较大或仍待维护者决策的条目。虽部分今日有更新，但风险与等待时间值得关注。

| 条目 | 创建时间 | 状态/标签 | 积压原因 |
|---|---|---|---|
| [#56349 不可绕过的 outbound policy enforcement](https://github.com/openclaw/openclaw/issues/56349) | 2026-03-28 | OPEN，P2，security，needs-security-review/live-repro | 安全边界型需求，需安全审查与 live repro |
| [#84662 Codex app-server runtime context 写入 native history](https://github.com/openclaw/openclaw/issues/84662) | 2026-05-20 | OPEN，P1，session-state | 长期开放；现有 PR #199361 仅为部分缓解 |
| [#124306 Exec approval card 不提示目标路径是 mount point](https://github.com/openclaw/openclaw/issues/124306) | 2026-08-15 | OPEN，P2，data-loss | 高风险操作提示缺口，需产品决策 |
| [#127195 16 个调用点相同错误无 reason code](https://github.com/openclaw/openclaw/issues/127195) | 2026-08-21 | OPEN，P2，source-repro | 可观测性基础问题，标签含 no-new-fix-pr |
| [#128140 memory_search 总是 15s 超时](https://github.com/openclaw/openclaw/issues/128140) | 2026-08-23 | OPEN，P1 | 高影响但标签含 no-new-fix-pr |
| [#130247 Cron 无结束条件](https://github.com/openclaw/openclaw/issues/130247) | 2026-08-26 | OPEN，P3 | 需求清晰但优先级低 |
| [#143017 Prompt-cache 前缀重写与 21.3M cache-write tokens](https://github.com/openclaw/openclaw/issues/143017) | 2026-09-09 | OPEN，P2，stale | 成本影响大，评论多，仍无 fix PR |
| [#161800 iOS Dashboard 循环配对/设备身份](https://github.com/openclaw/openclaw/issues/161800) | 2026-09-30 | OPEN，P0，security | 高严重度 + 安全审查，标签含 no-new-fix-pr |
| [#162585 Windows 插件 staging 膨胀](https://github.com/openclaw/openclaw/issues/162585) | 2026-10-01 | OPEN，P2 | Windows 平台可靠性，评论多但无 fix PR |
| [#183479 extended-stable 更新修复被 retained package recovery 阻塞](https://github.com/openclaw/openclaw/issues/183479) | 2026-10-25 | OPEN，P2，source-repro | 更新恢复路径复杂，需 maintainer review |
| [#129388 context-pressure-aware continuation](https://github.com/openclaw/openclaw/pull/129388) | 2026-08-25 | OPEN，XL，security-sensitive，needs proof | 大型路线图 PR，合并风险高，需 proof/安全审查 |
| [#192350 GitHub 集成迁移为插件](https://github.com/openclaw/openclaw/pull/192350) | 2026-11-03 | OPEN，XL，security-review-required | 跨模块重构，依赖 SDK 基础 PR，审查周期长 |
| [#194376 sessions_send wake admission](https://github.com/openclaw/openclaw/pull/194376) | 2026-11-07 | OPEN，多模块 | 网关准入边界，影响并发与限流，需 maintainer review |
| [#194566 prompt presence checks](https://github.com/openclaw/openclaw/pull/194566) | 2026-11-07 | OPEN，多模块 | 跨 provider 校验，影响面广 |
| [#197510 降低文件系统压力下的 Gateway stall](https://github.com/openclaw/openclaw/pull/197510) | 2026-11-12 | OPEN，XL，P2，security-sensitive | 性能稳定性重要，但改动大、需安全审查 |

**维护者关注建议：**
1. 优先分流 P0：更新挂起、Codex continuation 阻塞、iOS 设备身份循环。
2. 对 `no-new-fix-pr` 的高影响问题补充复现/修复负责人，尤其是 `memory_search` 超时与 Control UI CPU 回归。
3. 大型 PR #129388、#192350、#197510 明确 review/security 路径，避免长期悬置。
4. Prompt-cache 成本问题评论集中且生产影响明显，建议合并为统一成本/缓存可观测性专项。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告  
**数据日期：2026-11-15** ｜ 覆盖：OpenClaw、Zeroclaw、PicoClaw、QwenPaw、hermes-agent、AstrBot、DeepSeek Harness

> 口径说明：各项目统计窗口与 GitHub 数据上限不同，DeepSeek Harness 未启用 Issues/PR，仅以 Discussions 与 Releases 衡量。绝对量不宜直接横比，应结合吞吐、积压与交付状态判断。

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正从“单机 CLI Agent”快速演进为“多入口、常驻网关、团队托管”的平台形态。社区关注点已从功能有无转向生产可用性：会话连续性、长任务恢复、prompt-cache 成本、跨平台一致性、凭据与沙箱安全成为共性痛点。头部项目仍保持高强度迭代，但评审带宽、合并吞吐和发布节奏正成为比“提交量”更关键的瓶颈。插件、provider、渠道适配器生态持续扩张，同时带来兼容性、迁移成本和语义一致性债务。整体呈现“需求侧强健、供给侧分化”的格局：谁能把高风险变更稳定交付，谁就能在下一阶段占据优势。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新（新开/活跃 / 关闭） | PR 更新（待合并 / 合并或关闭） | Release | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 388（323 / 65） | 500（349 / 151） | 1 个 beta | 高活跃、高吞吐；待处理队列扩张，P0 更新/Codex continuation/跨平台稳定性风险突出 |
| **hermes-agent** | 500 上限（关闭 199） | 500 上限（待 208 / 合并或关闭 292） | 1 个 canary | 活跃度优、PR 吞吐良好；统一网关故障域集中，P0/P1 会话状态问题仍泄漏，canary 发布说明渲染异常 |
| **Zeroclaw** | 11（10 / 1） | 50（49 / 1） | 0 | 需求质量高但合并率约 2%；审阅带宽是最大瓶颈，S1 沙箱与长任务失控无 fix PR |
| **PicoClaw** | 2（2 / 0） | 9（3 / 6） | 0 | 中低活跃；积压清理积极，Discord/前端修复有进展，但版本交付慢，provider PR 易 stale |
| **QwenPaw** | 14（9 / 5） | 14（13 / 1） | 0 | 中高活跃、提交热合入冷；飞书会话债务集中清偿，PR 处置率仅约 7%，评审瓶颈明显 |
| **AstrBot** | 16（13 / 3） | 32（30 / 2） | 0 | 高活跃但合并率约 6.25%；平台适配 Bug 集中，4.30 alpha 准备中，积压压力上升 |
| **DeepSeek Harness** | Discussions 198；Issues/PR 未启用 | 无 PR 流程；代码交付以 Release 为唯一口径，今日 0 | 0 | 讨论热、交付冷；零发版，P0 数据丢失与宿主崩溃均无修复版本，反馈持续堆积 |

**简要判断：** OpenClaw 与 hermes-agent 处于第一梯队高强度迭代；Zeroclaw、AstrBot、QwenPaw 属于“高需求、待消化”状态；PicoClaw 处于小步清理与生态接入阶段；DeepSeek Harness 因无 PR 流程，交付静默风险最特殊。

---

## 3. OpenClaw 在生态中的定位

**优势：规模最大、功能最全、发布节奏最稳的核心参照。**  
OpenClaw 单日 Issues 388、PR 500，且发布 `v2026.11.5-beta.3`，在覆盖广度、社区讨论量和迭代吞吐上明显领先多数同类。其议题覆盖 prompt-cache 成本、Codex/subagent 连续性、A2A、Windows/更新可靠性、Control UI、memory、policy、插件 hook 等，属于全栈型平台项目。

**技术路线差异：**  
- 相比 **Zeroclaw** 聚焦 macOS Seatbelt 沙箱、凭据作用域与多用户 RPC，OpenClaw 更强调 Gateway/Control UI、跨平台入口、Codex/subagent 生命周期与 A2A 消息语义。  
- 相比 **QwenPaw** 的飞书/钉钉渠道与本地推理栈，OpenClaw 的 provider/channel/插件矩阵更广，但跨平台稳定性债务也更重。  
- 相比 **hermes-agent** 的统一网关“单进程拥有所有本地会话”，OpenClaw 的架构更分散、生态面更宽，但也面临类似的多入口一致性与会话连续性问题。  
- 相比 **DeepSeek Harness** 的桌面端/插件生态与无 PR 发布模式，OpenClaw 采用高频 beta + 密集 PR 管线，交付透明度更高。  

**社区规模对比：** OpenClaw 日更新量（388 Issues + 500 PR）显著高于 Zeroclaw（11+50）、QwenPaw（14+14）、AstrBot（16+32）、PicoClaw（2+9）；与 hermes-agent 同处 500 PR 上限梯队，但 OpenClaw 当日有明确 beta 发布，交付信号更强。  
**主要风险：** 待合并 PR 349 条，P0 更新挂起、Codex continuation 阻塞、iOS 设备身份循环等问题带 `no-new-fix-pr`，说明“吞吐高”并未完全转化为“风险收敛”。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求与证据 |
|---|---|---|
| **会话/长任务可靠性** | OpenClaw、QwenPaw、AstrBot、Zeroclaw、hermes、DeepSeek Harness | OpenClaw Codex/subagent continuation 阻塞；QwenPaw #7534 静默卡死、#6608 长命令挂起；AstrBot #11130 长连接断联、#11133 插话被会话锁排队；Zeroclaw #12425 长任务失去控制；hermes #145022 Kanban worker 崩溃；DeepSeek #12751 会话全失 |
| **成本与 prompt-cache / token 可观测性** | OpenClaw、Zeroclaw、DeepSeek Harness、QwenPaw | OpenClaw #143017 测得 21.3M cache-write tokens；Zeroclaw #12421 cron 缺 session-key 导致 prompt-cache 亲和性丢失；DeepSeek #1886 tokenUsage 未折叠 compaction usage；QwenPaw #8744 压缩历史被感知为丢失 |
| **多入口/渠道语义一致性** | Zeroclaw、QwenPaw、AstrBot、OpenClaw、hermes | Zeroclaw #11332 skill 学习只在 CLI/cron 生效、#11713 Telegram edited_message 被忽略；QwenPaw 飞书/钉钉渠道债务；AstrBot Telegram 命令过滤/引用唤醒；OpenClaw Windows/Control UI/跨平台 UX；hermes 统一网关覆盖 CLI/TUI/Desktop/API/bots |
| **安全、凭据与沙箱** | Zeroclaw、hermes、OpenClaw、AstrBot、DeepSeek Harness | Zeroclaw #12137 Seatbelt 转义错误、#12373/#12422 凭据作用域化；hermes sec-marathon、#62336 终端快照落盘凭据；OpenClaw #56349 outbound policy；AstrBot 安全模式/群聊限制；DeepSeek #12751 不可逆删除缺兜底 |
| **Provider / 插件生态扩张与标准化** | PicoClaw、QwenPaw、AstrBot、OpenClaw、hermes、DeepSeek Harness | PicoClaw LLMTR/CloudGPU/Standard Compute；QwenPaw Olostep/Firecrawl；AstrBot xAI/TTS 工具化；OpenClaw Claude web search/GitHub 插件迁移；hermes ACP Registry/插件目录；DeepSeek 插件迁移 skill、WSL、设计工作台 |
| **可观测性与故障诊断** | OpenClaw、QwenPaw、AstrBot、hermes、DeepSeek Harness | OpenClaw 16 个调用点无 reason code、子 run 成本无法归因；QwenPaw 静默失败无 Traceback；AstrBot 发送状态误报；hermes 数据静默丢失；DeepSeek 用量统计失真 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构/路线关键差异 |
|---|---|---|---|
| **OpenClaw** | 全栈 Agent 平台：Gateway、Control UI、Codex/subagent、A2A、memory、policy、插件、多平台 | 广泛开发者、生产部署者、插件作者 | 高频 beta + 密集 PR；功能面最广，跨模块变更多；强调大会话可靠性与 prompt-cache 成本 |
| **Zeroclaw** | 安全沙箱、凭据作用域、多用户 RPC、SSH/渠道能力 | 安全敏感团队、多用户托管场景 | 强安全边界与配置治理；PR 高度集中，审阅单点依赖明显；正从单人 CLI 向托管平台演进 |
| **PicoClaw** | 轻量 Agent、OpenAI-compatible provider、技能安装、Discord/pnpm 修复 | 低成本/轻量部署用户、provider 贡献者 | 小步迭代、积压清理；provider 接入模式统一，但 review 速度慢，容易 stale |
| **QwenPaw** | 飞书/钉钉渠道、Console 体验、本地推理栈、搜索 provider | 中文企业/IM 用户、本地推理用户 | 渠道与 CJK 场景是差异点；提交热、合入冷；本地引擎与 GPU/MLX 是重点在途特性 |
| **hermes-agent** | 统一网关、多前端（CLI/TUI/Desktop/API/bots）、Kanban、安全冲刺 | 重型桌面用户、多入口生产用户 | 单网关拥有所有本地会话，故障域集中；PR 吞吐高，但 P0/P1 会话状态一致性风险大 |
| **AstrBot** | IM 机器人、多平台适配、TTS、Agent steering、插件框架 | 社区机器人运营者、IM 多平台用户 | 平台适配器语义正确性是核心；TTS 工具化与插话处理是近期主线；合并吞吐偏低 |
| **DeepSeek Harness** | 桌面端、插件生态、设计工作台、WSL 运行环境 | 桌面用户、插件作者、第三方生态 | 无 Issues/PR，Release 为唯一交付口径；讨论热、交付冷；第三方插件活跃但官方响应滞后 |

---

## 6. 社区热度与成熟度

**第一梯队：高强度快速迭代，但风险同步累积**  
- **OpenClaw**：规模与吞吐领先，beta 发布明确；但待合并 PR 349 条，P0/P1 跨平台与 continuation 问题多，属于“高速迭代 + 风险扩张”。  
- **hermes-agent**：PR 合并/关闭 292 条，吞吐健康；但统一网关故障域集中，P0/P1 会话状态问题仍在泄漏，处于“架构收敛期”。

**第二梯队：高活跃、待消化，评审带宽是瓶颈**  
- **Zeroclaw**：需求质量高、方向清晰（凭据、身份、安全），但 50 PR 仅 1 条合并/关闭，S1 问题无 fix，处于“输入强、出口窄”。  
- **AstrBot**：IM 适配与 TTS/steering 方向明确，但 32 PR 仅 2 条合并/关闭，平台适配 Bug 集中，处于“功能活跃、合并偏慢”。  
- **QwenPaw**：飞书债务集中清偿是亮点，但 14 PR 仅 1 条状态变更，PR 处置率约 7%，处于“提交热、合入冷”。

**第三梯队：小步清理与质量巩固**  
- **PicoClaw**：Issues/PR 量小，今日关闭/合并 6 条 PR，积压清理积极；但版本交付慢，provider PR 易 stale，处于“工程健康改善期”。  
- **DeepSeek Harness**：Discussions 198 条但 0 发版，P0 数据丢失与宿主崩溃无修复版本，处于“讨论热、交付静默”的特殊风险状态，亟需公开处置结论以维持信任。

---

## 7. 值得关注的趋势信号

1. **从“能跑”到“敢托管”：多入口与身份/凭据隔离成为平台化前提。**  
   Zeroclaw #12422/#12441 明确“凭据和身份不应进入模型上下文”；hermes 统一网关把 CLI/TUI/Desktop/API/bots 全部纳入同一进程；QwenPaw/AstrBot 的渠道债务说明多入口一致性是生产准入门槛。

2. **成本可观测性正从“高级功能”变为“生产刚需”。**  
   OpenClaw 21.3M cache-write tokens、Zeroclaw cron 缺 session-key 导致缓存亲和性丢失、DeepSeek tokenUsage 统计缺口，均表明 prompt-cache 与 token 归因直接影响用户信任和付费意愿。

3. **长任务与不可逆操作需要“恢复出口”和“兜底机制”。**  
   QwenPaw 静默卡死、AstrBot 插话被会话锁排队、hermes Kanban WIP 丢失、DeepSeek agent 清空目录，共同指向：用户不仅需要 Agent 能执行，更需要失败可诊断、状态可恢复、删除可回滚。

4. **渠道适配器的“语义一致性”比“支持数量”更重要。**  
   Telegram edited_message、QQ 主动消息回执、飞书配置清空、Windows 插件 staging 膨胀，说明跨平台测试矩阵和渠道级回归护栏是下一阶段质量分水岭。

5. **Provider/插件生态进入“标准化与迁移成本”阶段。**  
   PicoClaw 多个 OpenAI-compatible provider、QwenPaw 搜索 provider 扩张、hermes ACP Registry、DeepSeek 插件迁移 skill，均表明生态扩张后，接入规范、迁移指南和兼容性承诺将决定贡献者留存。

6. **安全默认与可用性冲突需要明确决策机制。**  
   hermes 生命周期守卫误杀 Node.js CLI 68 天未决、OpenClaw outbound policy 需安全审查、Zeroclaw Seatbelt 不得开放 `~/.ssh`，说明“安全启发式”不能长期悬置，需要 accept/reject/设计文档三选一。

7. **评审带宽与发布吞吐成为开源项目的新核心竞争力。**  
   Zeroclaw 合并率约 2%、AstrBot 约 6.25%、QwenPaw PR 处置率约 7%，而 OpenClaw/hermes 能维持高吞吐。下一阶段头部项目与跟随者的差距，可能不在功能创意，而在**批量分诊、决策例会、回归护栏和发布节奏**。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**报告日期：2026-11-15** ｜ 数据窗口：2026-11-14 → 2026-11-15（过去 24 小时）

---

## 1. 今日速览

过去 24 小时，Zeroclaw 仓库维持**较高活跃度，但呈现明显的“输入多、输出少”特征**：Issues 更新 11 条（新开/活跃 10、关闭 1），PR 更新 50 条，然而仅 1 条 PR 被合并或关闭，其余 49 条仍在待合并队列。今日新增的需求集中在**凭据/密钥的受控管理、工具执行的用户身份传递、以及长任务控制**三个方向，与既有 PR #12402、#12408、#12418 形成呼应，属于已有路线上的自然延伸。

风险面同样突出：多个 **S1 级阻塞问题**（macOS Seatbelt 沙箱误转义 #12137、长任务超时失控 #12425）仍无对应修复 PR；同时待合并队列中堆积了大量由同一贡献者提交的 XL 体量、`risk:high` 复合 PR，**审阅带宽已成为当前最大的交付瓶颈**。今日无版本发布，主线变化持续在 master 之上累积。

---

## 2. 版本发布

**无新版本发布。** 过去 24 小时 releases 为空，最新可用版本信息未在此数据集中体现。考虑到待合并队列中已有 SQLite 安全升级（#12322）、Tokio 运行时绑定修复（#12323）等基础依赖级变更，建议维护者在下一轮合并窗口后评估补丁版本的发布节奏。

---

## 3. 项目进展

**今日 PR 合并/关闭：1 条**（数据概览口径），但在展示的 Top-20 PR 中未包含该条明细，故无法确认具体推进项。

唯一确认的关闭事项是 Issue **#12416**（`[enhancement]` ADR-016 holding-crate 例外：为 host-mediated WASM 插件唤醒调度开豁免，涉及 `zeroclaw-runtime` 中的 `RuntimeAgentWakeBackend` 及 `plugin_host_services` 接线）。

- 🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/12416

该 Issue 的关闭意味着 **WASM 插件唤醒链路（`zeroclaw:plugin/dispatch.wake`）的架构审批前置条件已解除**，后续实现可以进入正常落地轨道，是中长期利好信号。

**整体推进度评估：偏低。** 50 条 PR 更新对应 1 条合并，合并率约 2%，在以日为单位统计的窗口内属于明显的“审阅积压”状态，而非开发停滞。

---

## 4. 社区热点

### 🔥 讨论最活跃

| 排名 | Issue | 评论 | 主题 |
|---|---|---|---|
| 1 | #11332 | 5 | Skill 学习闭环在 channel/webhook/gateway 轮次中从不触发 |
| 1 | #10781 | 5 | 多个 context/history 配置键为“惰性键”，设置了不生效 |
| 3 | #12137 | 2 | macOS Seatbelt 沙箱 dotfiles 规则转义错误 |
| 3 | #11713 | 2 | Telegram 忽略 `edited_message` 更新 |

- 🔗 #11332 https://github.com/zeroclaw-labs/zeroclaw/issues/11332
- 🔗 #10781 https://github.com/zeroclaw-labs/zeroclaw/issues/10781
- 🔗 #12137 https://github.com/zeroclaw-labs/zeroclaw/issues/12137
- 🔗 #11713 https://github.com/zeroclaw-labs/zeroclaw/issues/11713

**背后诉求分析：**

- **#11332 触及的是产品一致性承诺而非单点 bug。** 用户显式开启了 `skill_improvement` / `skill_creation`，但学习闭环只在 CLI/cron 路径生效，Matrix、webhook、gateway Web UI 全部绕过。这本质上是**多入口架构下能力对齐缺失**，对把 ZeroClaw 部署为常驻网关/IM 机器人的用户影响最大——而这恰恰是这类项目的主流生产用法。
- **#10781 反映的是“配置契约不诚实”。** 用户在 v0.8.5 中按名称直觉设置了压缩与裁剪参数以节省 token，实际什么也没发生。同类问题在 #12396 被再次独立报告（`history_pruning.keep_recent`、`collapse_tool_results` 自 #8196 后已无读取方），说明**同一处配置债务被两位不同用户分别踩到**，属于高复现、低争议、易修复的“卫生级”问题，但至今已积压 60+ 天。

**PR 侧热点（TOP-20 全部为 OPEN）：** 值得关注的是 #9809（`feat(providers): support multiple models per provider profile`），该 PR 自 2026-08-07 开启、标签覆盖 provider/channel/memory/tool 全栈、体量 `size:XL`、标记 `needs-author-action` 与 `risk:high`，是当前队列中**历史最长、跨度最大的单项变更**。

- 🔗 #9809 https://github.com/zeroclaw-labs/zeroclaw/pull/9809

---

## 5. Bug 与稳定性

按声明严重程度排序：

### 🔴 S1 — 工作流阻塞（2 项，均无可见 fix PR）

**#12137 — macOS Seatbelt 沙箱 dotfiles 读取规则转义错误**
`generate_policy`（`crates/zeroclaw-runtime/src/security/seatbelt.rs:272-380`）在 Rust raw string 中构建 SBPL profile，注释声称“允许读取用户 home 以支持工具链”的规则被误写为 `\\.`，导致 `~/.cargo`、`~/.nvm`、`~/.pyenv`、`~/.local` 下的工具链在默认 macOS 沙箱下全部报 `Operation not permitted`。报告者同时明确约束：**修复不得把 `~/.ssh` 一并交给沙箱**——这是一处必须在修复中被显式验证的安全边界。
🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/12137

**#12425 — Agent 对耗时长的任务失去控制（channel / S1）**
用户通过 QQ 渠道发起“用 Bing 搜索 11 月发布了哪些重要模型”，直接收到“等待模型响应超时，请重试”，流程中断且无法恢复。期望行为是**返回搜索引擎的真实错误或正确结果，而不是丢失流程控制权**。
🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/12425

> 📌 该问题与待合并 PR **#11874**（`fix(channels): report progress during long agent turns`）方向高度吻合：后者正是在长轮次中上报有界进度而不断言完成。建议维护者在该 Issue 中关联 #11874，作为合并前的用户侧验证样本。

### 🟡 S2 — 行为降级（1 项）

**#11332 — Skill review / creation 对 channel、webhook、gateway（Web UI）轮次完全不运行**（`risk:high`、`status:accepted`，已开放 44 天）
🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/11332

### 🟢 S3 / 未分级 — 次要及功能性问题（4 项）

- **#12396** `history_pruning.keep_recent` 与 `collapse_tool_results` 自 #8196 起无运行时读取方，成为死配置键（与 #10781 重复报告）。🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/12396
- **#10781** 一批 `context_compression.*`、`history_pruning.*`、`collapse_tool_results`、`keep_tool_context_turns` 键为惰性/名不副实，`status:accepted`，已开放 64 天。🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/10781
- **#11713** Telegram 监听器只读 `update["message"]`，完全忽略 `edited_message`：通过编辑补加的 @mention 永远不被识别，门控不重算、被动上下文不记录、trace 事件缺失，但 long-poll offset 仍照常推进（造成静默丢失）。🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/11713
- **#12421** `perf(cron)`：`run_agent_job_inner`（`crates/zeroclaw-runtime/src/cron/scheduler.rs`）调用 `agent::run` / `run_with_capabilities` 时未进入 `scope_session_key`，导致 cron 任务**拿不到 provider 的 prompt-cache 亲和性**，纯成本/性能损耗。🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/12421

**小结：** 今日 11 条 Issue 中有 **6 条属于配置/上下文/缓存类的系统性债务**（#10781、#12396、#12421 及 #11332 的配置未生效部分），指向同一根因：**#8196 移除旧版 history pruner/compressor 后，配置 schema 未同步清理，且 session scope 语义在多入口间未对齐。** 这是一个可以用单个“配置治理”PR 批量收敛的方向。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 关联 PR | 纳入下一版本的可能性 |
|---|---|---|---|
| 只写式 WebUI 凭据管理 + 作用域化 secret 引用 | #12373 | #12402（插件 TLS）、#12408（HTTP Basic / API Token） | **高** — 已有两条递进 PR，依赖链明确（#12408 depends on #12402） |
| 操作员托管服务凭据的作用域化使用（安全模型 RFC） | #12422 | #12418、#12408 | **高** — RFC 触发条件为“安全层新增”，且已有下游实现分支 |
| 将请求用户身份传递给工具执行（多用户 RPC 场景） | #12441 | 暂无 | **中** — 需求清晰且为多用户助手的前置能力，但尚无实现分支 |
| Cron 任务获得 session-key 作用域以命中 prompt cache | #12421 | 暂无 | **中** — 改动面小、收益直接，适合作为 #11868/#11911 agent 循环系列的附带修复 |

- 🔗 #12373 https://github.com/zeroclaw-labs/zeroclaw/issues/12373
- 🔗 #12422 https://github.com/zeroclaw-labs/zeroclaw/issues/12422
- 🔗 #12441 https://github.com/zeroclaw-labs/zeroclaw/issues/12441
- 🔗 #12402 https://github.com/zeroclaw-labs/zeroclaw/pull/12402
- 🔗 #12408 https://github.com/zeroclaw-labs/zeroclaw/pull/12408

**路线图信号解读：** 今日新增的 #12422 与 #12441 共同指向一条清晰的产品主线——**ZeroClaw 正在从“单人 CLI Agent”向“多用户、多入口的托管式 Agent 平台”演进**。二者的核心诉求完全一致：*凭据和身份不应进入模型上下文*。#12422 解决“agent 能调用服务但看不到 secret”，#12441 解决“工具知道是谁在请求但模型不持有该身份”。若这两条落地，ZeroClaw 将具备企业/团队部署的基础安全语义，属于**架构级而非增量级**的变化，建议在 roadmap 中显式标注。

---

## 7. 用户反馈摘要

**满意之处（隐含信号）**
- 用户对配置项的**语义设计**是认可的（#10781 中“用户合理地设置它们并期待减少 context/token 消耗”），问题出在实现与 schema 未跟上，而非设计方向被质疑。
- #12137 的报告质量极高：给出精确到行号的文件定位、明确的安全约束（不得开放 `~/.ssh`），说明**核心用户群具备源码级参与能力**，是健康的社区信号。

**主要痛点**

1. **“配置了但不生效”是最伤信任的一类缺陷。** #10781 + #12396 双重报告，且 #10781 已被 `status:accepted` 却积压 64 天。用户对 token 成本的敏感度很高，这类静默失效直接损害付费/自建用户的成本预期。
2. **多入口能力不一致。** #11332（skill 学习只在 CLI/cron 生效）、#11713（Telegram 编辑消息被静默吞掉）共同指向：**用户希望无论从哪个入口进入，Agent 行为应当等价。** 目前 channel/gateway 明显是“二等公民”。
3. **长任务的失控感。** #12425 的用户（中文用户，QQ 渠道）表达的核心不是“搜索失败”，而是“**拿不到失败原因、流程直接断掉**”。这是生产可用性的底线问题。
4. **生产环境沙箱可用性。** #12137 的受影响者是 macOS 上做正常开发的用户——默认沙箱配置过严且转义错误，会让**开箱即用体验在第一公里就失败**。

**使用场景画像**（从 Issue 中提炼）：常驻 IM 网关（Matrix / Telegram / QQ）、Webhook 触发、Gateway Web UI 操作台、cron 定时任务、多用户 RPC 后端嵌入。**其中 cron 与 channel 两类场景今日均暴露了 session scope 缺失问题**（#11332、#12421），是当前架构最薄弱的两处。

---

## 8. 待处理积压

### ⚠️ 长期未响应的核心 Issue

| Issue | 严重度 | 已开放 | 状态 | 风险 |
|---|---|---|---|---|
| #10781 惰性配置键 | S3 | **64 天** | `status:accepted` | 已接受但无实现，与 #12396 重复报告，社区观感受损 |
| #11332 Skill 闭环缺失 | S2 | **44 天** | `status:accepted`、`risk:high` | 影响所有 gateway/IM 部署方 |
| #12137 Seatbelt 转义 | **S1** | **15 天** | 无 fix PR | 阻断 macOS 默认体验，含安全边界约束 |
| #11713 Telegram edited_message | 未分级 | **33 天** | 无 fix PR、仅 2 评论 | 静默丢消息，难排查 |

### ⚠️ 待合并队列的结构性风险

- **队列规模：49 条待合并**，其中展示的 XL 体量 PR 占比极高，多带 `risk:high` / `needs-maintainer-review` / `needs-author-action` 标签。
- **贡献高度集中：** Top-20 PR 中有 18 条来自同一贡献者（@CastelloBrancoTecnologia）。这既体现了个人投入，也意味着**单点审阅依赖**——一旦该贡献者的 PR 系列卡在评审上，整条凭据管理 + SSH 传输 + 渠道能力主线会同时停滞。
- **存在长尾巨 PR：** #9809（开启 100 天，`size:XL`，全栈标签，`needs-author-action`）建议维护者给出明确的拆解或关闭决策，避免其长期占用注意力。

**建议维护者优先级：**
1. 为 #12137 分配 owner（S1 + 安全语义，不宜再拖）
2. 用一个“配置治理” PR 同时关闭 #10781 与 #12396（消除重复报告根源）
3. 对 #12402 → #12408 → #12418 的依赖链给出合并批次计划，解冻凭据管理主线
4. 在 #12425 中关联 #11874 并请求提问者验证，形成“报告→修复→确认”闭环
5. 对 #9809 给出 accept/rewrite/close 的明确结论

---

**项目健康度综合评价：** 需求侧信号强健（新 Issue 质量高、方向一致、与既有 PR 自然衔接），架构演进方向清晰；供给侧受限于审阅带宽与配置债务，合并吞吐偏低。**核心风险不在“做什么”，而在“消化速度”。** 当前无版本发布的状态若再持续，master 上累积的高风险变更将放大下一次发布的回归面。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-11-15）

> 数据口径说明：过去24小时 Issues 更新 2 条、PR 更新 9 条、新版本 0 个。GitHub 数据将“已合并/已关闭”合并统计，以下涉及 PR 状态时按“关闭/合并”处理；具体是否合入需以 merged 状态复核。

## 1. 今日速览

- 过去24小时 PicoClaw 活跃度**中低**：新增/活跃 Issue 2 条、关闭 Issue 0 条；PR 更新 9 条，其中待合并 3 条、关闭/合并 6 条；无新版本发布。
- PR 侧出现明显的**积压清理信号**：6 条 PR 被关闭/合并，包括长期存在的上游同步、多代理框架 WIP、批量修复和 Discord/pnpm 修复类 PR；但其中多条带 `stale` 或 `WIP` 标记，实际代码合入量需复核。
- 新增功能活动集中在 **OpenAI-compatible provider 扩展**：LLMTR 同日提出 Issue 与 PR，CloudGPU、Standard Compute 的 provider PR 仍待处理，说明生态接入诉求较集中。
- 稳定性方面，`skills install` 的同名 frontmatter 冲突 Bug 仍为 OPEN 且被标记 `stale`，暂无 fix PR，是今日最值得优先关注的用户侧阻断问题。
- 项目健康度判断：**积压清理积极、稳定性修复有进展，但版本交付节奏偏慢，新功能仍停留在待合并阶段**。

## 2. 版本发布

过去24小时无新版本发布，最新 Releases 为空；本节无更新。

## 3. 项目进展

今日关闭/合并 6 条 PR，整体以**清理长期积压、稳定性修复和批量修复合并**为主：

- [#2810 [CLOSED] Sync with upstream/main (1095 commits) + forward-port magicform customizations](https://github.com/sipeed/picoclaw/pull/2810)：大规模上游同步与定制前向移植。若已合入，将显著缩小与上游差异并适配重构后的目录结构；当前状态为 CLOSED，需维护者确认是否实际合并。
- [#423 [CLOSED] WIP: feat: base multi-agent collaboration framework & shared context](https://github.com/sipeed/picoclaw/pull/423)：多代理协作框架 WIP 被关闭。该 PR 涉及共享上下文池、agent handoff、发现工具等，关闭可能意味着短期暂缓或拆分推进，路线图信号需后续确认。
- [#1558 [CLOSED] fix: merge PR #1344 #1342 #1341 #1331](https://github.com/sipeed/picoclaw/pull/1558) 与 [#1559 [CLOSED] fix: merge PR #1327 #1319 #1318 #1313](https://github.com/sipeed/picoclaw/pull/1559)：批量合并多个修复 PR，若已合入将一次性清理多条修复积压，提升维护效率。
- [#3452 [CLOSED] fix(discord): bump discordgo fork past the gateway handshake deadlock](https://github.com/sipeed/picoclaw/pull/3452)：修复 Discord 网关握手死锁导致的“连接但永久失聪”问题，属于高价值稳定性修复。
- [#3318 [CLOSED] fix(web): repair unparseable pnpm-lock.yaml](https://github.com/sipeed/picoclaw/pull/3318)：修复前端 `pnpm-lock.yaml` 重复 key 导致的锁文件损坏，改善前端构建可复现性。

**整体推进判断**：今日项目在“工程健康与积压清理”上向前迈进明显，修复类 PR 覆盖 Discord 稳定性、前端构建和批量 fix；但新增功能交付有限，3 条待合并 PR 均为 provider 扩展，下一阶段进展取决于维护者 review 速度。

## 4. 社区热点

今日公开数据中讨论热度较低：唯一有评论的 Issue 为 #3462（1 条评论），PR 评论数未提供/为空，点赞均为 0。热点集中在以下主题：

- [#3462 [OPEN] [stale] skills install fails with "registry archive is not a valid skill" when another skill shares the frontmatter name](https://github.com/sipeed/picoclaw/issues/3462)：`skills install` 与 agent 的 `install_skill` 工具在已安装技能共享 frontmatter `name` 时失败。背后诉求是技能注册表校验应区分 slug 与 frontmatter name，避免同名技能互相阻塞；错误信息“registry archive is not a valid skill”也不够指向根因。
- [#3470 [OPEN] [Feature] Add LLMTR as an OpenAI-compatible provider](https://github.com/sipeed/picoclaw/issues/3470) 与 [#3471 [OPEN] feat(providers): add LLMTR as an OpenAI-compatible provider](https://github.com/sipeed/picoclaw/pull/3471)：同日提出 Issue 与 PR，诉求是内置 `llmtr` provider，避免用自定义 OpenAI-compatible endpoint 时覆盖其他 provider 配置。该配对是今日最明确的功能推进信号。
- provider 接入主题还包含 [#3464 CloudGPU](https://github.com/sipeed/picoclaw/pull/3464) 与 [#3431 Standard Compute](https://github.com/sipeed/picoclaw/pull/3431)，两者均被标记 `stale`。背后反映社区希望以更低配置成本接入多家 OpenAI-compatible 网关。

## 5. Bug 与稳定性

按严重程度排列今日相关 Bug/稳定性事项：

| 问题 | 严重度 | 状态 | Fix PR | 说明 |
|---|---|---|---|---|
| [#3462 skills install 因 frontmatter name 冲突失败](https://github.com/sipeed/picoclaw/issues/3462) | 中高：阻断技能安装与 agent `install_skill` | OPEN + `stale`，1 条评论 | 暂无 | 当另一已安装技能使用相同 `SKILL.md` frontmatter `name` 时，安装报“registry archive is not a valid skill”。影响多技能共享名称但 slug 不同的场景，建议优先修复。 |
| [#3452 Discord 网关握手死锁](https://github.com/sipeed/picoclaw/pull/3452) | 高：频道可能永久失聪且无日志 | CLOSED，今日关闭/合并 | 自身即 fix PR | 通过升级 discordgo fork 修复 gateway handshake deadlock，属于重要稳定性修复；需确认已合入。 |
| [#3318 pnpm-lock.yaml 重复 key 导致前端构建失败](https://github.com/sipeed/picoclaw/pull/3318) | 低-中：影响前端构建与可复现性 | CLOSED，今日关闭/合并 | 自身即 fix PR | 修复 `semver@7.8.5` 重复映射 key，解决 `ERR_PNPM_BROKEN_LOCKFILE`。 |

**稳定性判断**：今日关闭的修复类 PR 对 Discord 和前端工程健康有正向作用；但唯一新用户侧 Bug #3462 仍无 fix PR，且被 `stale` 标记，存在优先级被低估的风险。

## 6. 功能请求与路线图信号

- [#3470 Add LLMTR as an OpenAI-compatible provider](https://github.com/sipeed/picoclaw/issues/3470) + [#3471 feat(providers): add LLMTR provider](https://github.com/sipeed/picoclaw/pull/3471)：**纳入下一版本可能性较高**。Issue 与 PR 同日提交，改动符合既有 provider catalog 模式，默认 API base 为 `https://llmtr.com/v1`，且明确不预加载模型、要求用户在 `model_list` 中固定模型。建议维护者尽快 review，避免新 PR 再次进入 `stale`。
- [#3464 CloudGPU provider](https://github.com/sipeed/picoclaw/pull/3464) 与 [#3431 Standard Compute provider](https://github.com/sipeed/picoclaw/pull/3431)：**纳入可能性中等**。两者均延续 OpenAI-compatible provider 集成模式，但已被标记 `stale`。若维护者能统一 provider 接入规范，可批量处理，降低逐个 review 成本。
- [#3462 skills 安装冲突](https://github.com/sipeed/picoclaw/issues/3462)：虽为 Bug，但修复后会影响技能安装体验与 registry 校验逻辑，建议纳入下一补丁版本；目前无 fix PR，路线图信号偏弱。
- [#423 多代理协作框架 WIP 关闭](https://github.com/sipeed/picoclaw/pull/423)：短期路线图信号减弱，多代理/共享上下文能力可能暂缓或需拆分后重启。

## 7. 用户反馈摘要

> 公开数据仅显示 #3462 有 1 条评论，未提供评论正文；以下主要从 Issue/PR 摘要提炼，评论情绪与具体讨论内容需进一步查看原帖。

- **技能安装痛点**：用户在多技能共享 frontmatter `name` 的场景下无法安装新技能，且错误信息指向“registry archive is not a valid skill”，不够直观。真实诉求是安装工具应正确区分 slug 与展示名称，或在冲突时给出可操作的错误提示。[#3462](https://github.com/sipeed/picoclaw/issues/3462)
- **LLMTR 使用场景**：用户希望一个 key 访问 LLMTR 目录内多模型，并以内置 provider 方式配置，避免自定义 OpenAI-compatible endpoint 覆盖其他 provider 设置。[#3470](https://github.com/sipeed/picoclaw/issues/3470) / [#3471](https://github.com/sipeed/picoclaw/pull/3471)
- **Provider 接入满意度**：CloudGPU 与 Standard Compute 作者均希望仅凭 API key 即可接入，说明现有自定义 endpoint 方案可用但配置成本仍高；长期 `stale` 可能降低贡献者体验。[#3464](https://github.com/sipeed/picoclaw/pull/3464) / [#3431](https://github.com/sipeed/picoclaw/pull/3431)
- **积极信号**：今日 6 条 PR 关闭/合并，显示维护者在清理积压；但多条 `stale` PR 与 Issue 同时存在，说明响应速度仍是贡献者体验的短板。

## 8. 待处理积压

建议维护者优先关注以下长期未响应或 `stale` 条目：

- [#3462 [OPEN] [stale] skills install 同名 frontmatter 冲突](https://github.com/sipeed/picoclaw/issues/3462)：创建于 2026-11-06，更新于 2026-11-14，1 条评论，无 fix PR。用户侧功能阻断，建议优先定性并安排修复。
- [#3431 [OPEN] [stale] Standard Compute provider](https://github.com/sipeed/picoclaw/pull/3431)：创建于 2026-10-15，是当前开放 provider PR 中积压最久的一条。建议给出明确 review 结论：进入合并流程或说明暂不接纳。
- [#3464 [OPEN] [stale] CloudGPU provider](https://github.com/sipeed/picoclaw/pull/3464)：创建于 2026-11-07，已 `stale`。建议与 #3431、#3471 统一按 provider 接入规范评审，避免逐条堆积。
- [#3471 [OPEN] LLMTR provider](https://github.com/sipeed/picoclaw/pull/3471)：新提交且与 #3470 配对，建议尽快响应，防止重复进入 `stale` 队列。

**积压健康度提示**：今日关闭/合并 6 条 PR 是积极清理动作，但开放队列中仍有 3 条 provider 相关 PR 和 1 条技能安装 Bug 处于 `stale`，建议维护者在下一次迭代前明确优先级与关闭/合并标准，以提升项目健康度和贡献者留存。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目日报 · 2026-11-15

> 数据窗口：过去 24 小时（截至 2026-11-15）｜数据来源：GitHub `agentscope-ai/QwenPaw`
> 统计口径：Issues 更新 14 条（新开/活跃 9、已关闭 5）｜PR 更新 14 条（待合并 13、已合并/关闭 1）｜新版本 0 个

---

## 1. 今日速览

1. **积压清理日的信号非常明确**：5 条关闭 Issue 中有 4 条由同一用户 @feng183043996 提交、跨度从 2026-06 到 2026-09，且全部在同一天（11-14）关闭，其中 3 条是曾长期阻塞飞书会话的**严重可用性问题**（#7534 静默卡死、#6608 长命令挂起、#7408 通道配置被清空）。
2. **合并侧几乎停滞**：14 条 PR 更新里仅 1 条状态变更（#4411 CLOSED），其余 13 条仍待合并，其中 3 条已挂起超过 90 天，**评审带宽是当前最大的流程瓶颈**。
3. **新提交质量较高且“带病交付”**：今日 4 组 Issue 与 PR 成对出现（#8711→#8735、#8733→#8734、#8740→#8741、#8742→#8743），说明新贡献者在报 Bug 的同时已附上修复，社区自愈能力正在形成。
4. **无新版本发布**：当前线上版本 2.3.0，`main` 分支版本号已推进至 `2.3.1b1`，处于补丁版开发期。
5. **整体活跃度评估：中高（提交热、合入冷）**。Issue 关闭率 35.7%、PR 处置率仅 7.1%，项目“输入端”旺盛而“出口端”受压，需警惕贡献者流失。

---

## 2. 版本发布

无。过去 24 小时无 Release 产出。当前稳定版 2.3.0，`main` 版本标识 `2.3.1b1`，结合今日多条 `fix(...)` 类 PR，可推断下一版本以**稳定性补丁**为主，无破坏性变更预期。

---

## 3. 项目进展

今日唯一发生状态变更的 PR：

| PR | 标题 | 状态 | 说明 |
|---|---|---|---|
| [#4411](https://github.com/agentscope-ai/QwenPaw/pull/4411) | fix: add LLM call timeout and task watchdog to prevent stuck sessions | **CLOSED**（first-time-contributor） | 为 `RetryChatModel.__call__` 增加**单次调用超时 + 任务看门狗**，解决 provider 无响应时 session 永久卡在 `running` 的问题 |

**推进评估**：该 PR 于 2026-05-15 提交，历经约 **6 个月**才完成闭环，是今日最有分量的工程动作。其关闭与 #7534（飞书会话 consumer 卡死）、#6608（长命令阻塞会话 1.5 小时）的同日关闭在时间上高度吻合，推测属于同一批「会话不响应」治理的结项动作（*注：数据未标明该 PR 最终是合并落地还是替代关闭，建议维护者补充变更说明*）。

**净向前推进度：约 15%**。理由是：问题侧清账幅度可观（5 条关闭，含 3 条 P0/P1），但代码合入侧仅 1 条，13 条待合并 PR 所承载的实际能力增量（OAuth2 令牌轮换、Skill 安装性能、CJK Markdown 修复、本地引擎控制台等）**尚停留在闸门之前**。

---

## 4. 社区热点

今日互动量整体偏低（单个 Issue 最高评论 4 条、最高 👍 1 个），社区讨论尚未形成热点，以下为相对最受关注的条目：

| 排名 | 条目 | 互动 | 背后诉求 |
|---|---|---|---|
| 1 | [#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) 飞书会话 queue consumer 长驻卡死 | 4 评论（已关闭） | **长连接会话的可靠性是第一优先级**。用户描述的是“日志有 `feishu recv` 但无任何响应、无 Traceback”的静默失败，这类故障最难排查，也最伤信任 |
| 2 | [#6608](https://github.com/agentscope-ai/QwenPaw/issues/6608) 长任务绕过 `shell_command_timeout` | 4 评论（已关闭） | 需要**按渠道的总体超时**而非仅单命令超时；同时要处理取消时的僵尸子进程 |
| 3 | [#7608](https://github.com/agentscope-ai/QwenPaw/issues/7608) 钉钉交互卡片回调 | 3 评论 · **1 👍**（今日唯一获赞） | 钉钉卡片只“能发”不“能收”，`STREAM` 模式下未订阅 `/v1.0/card/instances/callback`，交互闭环缺失 |
| 4 | [#8711](https://github.com/agentscope-ai/QwenPaw/issues/8711) HTTP 200 空流自动重试 | 3 评论（已附 PR #8735） | 代理/多 Key 场景下“连接成功但无内容”的高频静默失败，用户要求兜底重试 |

**分析**：热点集中在校验薄弱的**渠道集成层（飞书 / 钉钉）**与**模型调用层**，二者都是“外部依赖不确定”的边界，恰是用户对 Agent 产品最没有耐心的地方。今日获赞最高的 #7608 已挂起 69 天，值得提级处理。

---

## 5. Bug 与稳定性

### 已修复 / 已闭环（高严重度）

| 严重级 | Issue | 问题 | 状态 |
|---|---|---|---|
| **P0 数据 / 可用性** | [#7408](https://github.com/agentscope-ai/QwenPaw/issues/7408) | 飞书通道配置被意外清空（`enabled:false` / `app_id` 为空），cron 投递报 `KeyError('channel not found: feishu')` | ✅ 已关闭，**建议确认是否有回归测试覆盖配置持久化** |
| **P0 可用性** | [#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) | 同一 DM 会话高优先级消息处理路径卡死 consumer，会话静默无响应，新消息无法创建新消费者 | ✅ 已关闭 |
| **P1 可用性** | [#6608](https://github.com/agentscope-ai/QwenPaw/issues/6608) | 长命令绕过 `shell_command_timeout`，阻塞会话 1.5 小时；取消后遗留孤儿进程 | ✅ 已关闭 |

### 未修复（按严重度）

| 严重级 | Issue | 问题 | 是否已有 fix PR |
|---|---|---|---|
| **P1 平台兼容** | [#8733](https://github.com/agentscope-ai/QwenPaw/issues/8733) | 中文 Windows（`cp936`/GBK）下内置 `cloudpaw` 插件**完全无法加载**：`legacy_cloudpaw.py` 读取 3 类 JSON 时未指定 `encoding`，而文件以 UTF-8 写入 | ✅ [#8734](https://github.com/agentscope-ai/QwenPaw/pull/8734)（size/S，同日提交） |
| **P1 移动端** | [#8745](https://github.com/agentscope-ai/QwenPaw/issues/8745) | PawApp 三合一：① 移动端与网页端 session 隔离但 UI 无提示，误导用户 ② 发送消息报错 ③ 输入法遮挡输入区 | ❌ 无 |
| **P2 通知噪音** | [#8736](https://github.com/agentscope-ai/QwenPaw/issues/8736) | Subagent 完成会误触发「Reply completion」桌面通知；2.3.0 与 `main`（`2.3.1b1`）均存在，`console/channel.py` 两处一致 | ❌ 无（已明确 upstream 未修） |
| **P2 测试有效性** | [#8742](https://github.com/agentscope-ai/QwenPaw/issues/8742) | `test_providers_get_nonexistent` 对仅注册 `PUT` 的路由发 `GET`，请求在方法分发阶段即 405，**从未真正校验 provider 是否存在** | ✅ [#8743](https://github.com/agentscope-ai/QwenPaw/pull/8743)（size/XS） |
| **P2 稳定性** | [#8711](https://github.com/agentscope-ai/QwenPaw/issues/8711) | 流式响应 HTTP 200 正常 EOF 但无 answer 内容（空 / 仅 thinking）时不重试 | ✅ [#8735](https://github.com/agentscope-ai/QwenPaw/pull/8735)（size/M） |

**稳定性小结**：今日**新增 Bug 4 条（P1×2、P2×2），已有对应 fix PR 的 4 条中 3 条具备当日闭环条件**。飞书渠道的稳定性债务在今日得到一次性大幅清偿，但**移动端（PawApp）与跨平台编码问题属于新暴露面**，此前覆盖不足。

---

## 6. 功能请求与路线图信号

| 功能请求 | 诉求强度 | 配套 PR | 纳入下一版本的可能性 |
|---|---|---|---|
| [#8740](https://github.com/agentscope-ai/QwenPaw/issues/8740) Olostep 作为 `web_search` provider | 中（厂商亲自提交） | ✅ [#8741](https://github.com/agentscope-ai/QwenPaw/pull/8741) | **高**。延续 Firecrawl（#8200）的 provider 扩展路径，改动隔离在 tools 层，风险低 |
| [#8744](https://github.com/agentscope-ai/QwenPaw/issues/8744) Console 增加「查看被压缩归档的历史轮次」入口 | 高 | ❌ | **中高**。当前压缩后早期轮次在 UI 上完全不可达，用户会理解为“历史对话丢了”，属于**信任级体验缺陷**，优先级应高于普通 feature |
| [#8732](https://github.com/agentscope-ai/QwenPaw/issues/8732) 设置中心新增外观页（欢迎屏/头像/背景） | 中 | ❌ | **中**。底层能力多数已存在，属“暴露已有能力”的低成本改动 |
| [#7608](https://github.com/agentscope-ai/QwenPaw/issues/7608) 钉钉交互卡片回调 | 中（唯一获赞） | ❌ | **中**。需补齐 callback topic 订阅，涉及渠道 SDK 层改造；已挂起 69 天 |
| [#4963](https://github.com/agentscope-ai/QwenPaw/issues/4963) Cron 支持直接执行脚本/shell | 中 | — | ✅ **已关闭**，需确认是已实现还是被否决 |

**路线图信号**：三条主线清晰——① **搜索 provider 生态扩张**（Tavily → AnySearch → Firecrawl → Olostep）；② **Console 体验精修**（@AGImentu 单日 3 条 UI 修复 PR #8737/#8738/#8739）；③ **本地推理栈下放**（[#8648](https://github.com/agentscope-ai/QwenPaw/pull/8648) size/XL，三 PR 堆叠：llama.cpp GPU + MLX + 自动更新控制，是当前**体量最大、影响最深远**的在途特性）。

---

## 7. 用户反馈摘要

从 Issues 正文与评论中提炼的真实信号：

**痛点（高频且重复出现）**
- **“静默失败”是最伤人的失败模式**。#7534 用户明确指出“consumer 不返回、也不崩溃、无 Traceback”——没有错误码的卡死比报错更难自证，用户只能靠外部日志猜测。同类描述在 #8711（HTTP 200 空流）中再次出现。
- **深度用户正在把 QwenPaw 当生产系统用**。@feng183043996 单人贡献今日 6/14 条 Issue，场景覆盖飞书 Bitable API 去重脚本、Cron 定时投递、长时任务——已明显超出“尝鲜”范畴，是**真实业务负载**。他反复强调“1.5 小时阻塞”“会话恢复只能靠系统取消”，说明 SLA 意识已经形成。
- **上下文压缩被感知为数据丢失**。#8744 的表述很直白：“用户会直接理解为历史对话丢了”。这是**感知层问题而非存储层问题**，修复成本低但信任收益高。
- **中文 / CJK 场景覆盖存在系统性缺口**。今日两条独立证据：#8733（中文 Windows 编码导致插件整体挂掉）、#8133（CJK 标点被 CommonMark 误判，加粗渲染断裂）。二者分属不同层，但指向同一结论。

**满意点**
- 反馈渠道通畅、Issue 模板（版本/组件勾选/AI Disclosure）执行严格，#8711 甚至主动声明了 AI 辅助起草，社区规范度较高。
- 贡献者愿意“自带修复”入场（今日 5 条 first-time-contributor PR），侧面说明代码结构与贡献文档可读性好。

**不满意点**
- 反馈闭环慢。#7608 挂起 69 天、#7066 挂起 91 天——**“报了没人管”是当前最可能劝退核心用户的风险**。
- 文档/发布物细节粗糙：#6660 指出 `.dockerignore` 中应排除的文件名疑似写成 `README.me`（且该 PR 本身描述为空模板），两边都反映出低关注度区域的质量水位。

---

## 8. 待处理积压（需维护者关注）

### 长期未响应的 PR（13 条待合并中的高风险项）

| PR | 标题 | 存续时长 | 风险 |
|---|---|---|---|
| [#6660](https://github.com/agentscope-ai/QwenPaw/pull/6660) | Update .dockerignore to include README.me | **约 104 天**（2026-08-03） | 改动微小但**方向存疑**（`README.me` 疑为拼写错误，且 PR 描述为空模板），建议直接给出接受/拒绝结论，避免长期悬挂 |
| [#7066](https://github.com/agentscope-ai/QwenPaw/pull/7066) | persist rotated refresh_token for OAuth2 auth-code providers | **约 91 天**（2026-08-16，Under Review） | **功能性正确缺陷**：OAuth2 授权码 + 轮换刷新令牌的远程 MCP（如 XMind）在 `access_token` 续期后丢失新 `refresh_token`，存在**长期运行后认证彻底失效**的隐患。建议提级评审 |
| [#8133](https://github.com/agentscope-ai/QwenPaw/pull/8133) | repair CJK emphasis boundaries in chat Markdown | 约 38 天（size/L，Under Review） | 影响全部中文用户的正文渲染，属高感知质量问题 |
| [#8477](https://github.com/agentscope-ai/QwenPaw/pull/8477) | install a staged pool skill by renaming it in place (#8013) | 约 18 天（size/L） | 性能优化，为 #8013 的第 4 项；长期悬挂会阻塞该性能议题的整体收尾 |
| [#8648](https://github.com/agentscope-ai/QwenPaw/pull/8648) | feat(console): add local engine, GPU, and auto-update controls | 约 6 天（size/XL） | 三 PR 堆叠（#8649 → #8647 → #8648），**合并顺序有严格依赖**，任一环阻塞会拖住整条特性线 |

### 长期未响应的 Issue

| Issue | 标题 | 存续时长 | 备注 |
|---|---|---|---|
| [#7608](https://github.com/agentscope-ai/QwenPaw/issues/7608) | 钉钉交互卡片回调（stream 模式） | **约 69 天** | 今日唯一获 👍 的条目，且问题定位已精确到缺失的订阅路径，**具备直接排期条件** |
| [#8736](https://github.com/agentscope-ai/QwenPaw/issues/8736) | Subagent 完成误触发桌面通知 | 1 天 | 提报者已确认 `main`（`2.3.1b1`）同样存在，属**待修未修**，无 PR 认领 |

### 维护者行动建议（按 ROI 排序）

1. **为 13 条待合并 PR 做一次批量分诊**，至少给 #7066、#6660 明确结论（合并/关闭），消除最长悬挂项。
2. **将 #8744（压缩历史不可达）提为 2.3.1 候选**——存储已有、只需一个 UI 入口，是全项目信任收益/成本比最高的一项。
3. **CI 增补渠道级超时回归测试**，防止 #6608、#7534 类问题在关闭后反弹。
4. **建立 CJK / Windows 平台测试矩阵**，#8733 与 #8133 同日独立暴露同一盲区，已非偶发。
5. **对 #7608 做出公开排期表态**，哪怕只是“进 2.4 路线图”，也能止住核心渠道用户的流失预期。

---

*本日报基于 GitHub 公开数据自动生成，PR 最终状态（合并 / 关闭）以仓库实际为准。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目日报 · 2026-11-15

> **数据口径说明**：Issues/PR 明细仅覆盖"评论数最多"的 Top 30 / Top 20 样本，其余以聚合指标呈现。所有比例基于全量聚合数据计算，定性判断基于样本。

---

## 1. 今日速览

项目处于**高强度活跃期**，单日 Issues 与 PR 更新量均达到 500 条上限，属于典型的"大型战役并行推进"状态。Issue 侧关闭 199 条（39.8%）、PR 侧合并/关闭 292 条（58.4%），**PR 吞吐显著高于 Issue 消化速度**，说明维护带宽集中在代码合入而非问题收敛。当日主线有三条：**统一网关（Unified Gateway）post-merge 收尾**、**sec-marathon-2026-11-13 安全加固冲刺**、**profile 生命周期治理**。同时发布 1 个 canary 版本。**健康度判断：活跃度优、吞吐良好，但 P0/P1 级别的会话状态一致性问题仍在持续泄漏（见第 5 节），是当前最大风险面。**

---

## 2. 版本发布

### v0.23.1+canary.20261114T064334Z（2026-11-14）

- **类型**：Canary 预发布通道构建，非稳定版，不建议生产环境采用。
- **链接**：Release 页面（构建号 `20261114T064334Z`）
- **产物**：提供 Hermes Desktop 桌面端安装包，已确认包含 macOS Apple Silicon (M-series) DMG，托管于 `hermes-assets.nousre...`。

**破坏性变更 / 迁移注意**：⚠️ **本次 Release Notes 未渲染出变更清单**——正文中的 `<!-- HERMES_BUILDS_TABLE -->` 占位符原样输出，说明构建流水线的模板注入环节在本次发布中失败。对使用者的直接影响是：**无法从发布说明判断该 canary 相对 v0.23.0 的具体差异，也无法评估是否包含破坏性变更**。在 canary 通道上这构成实际的升级风险。

**建议**：① 修复 Release 模板渲染；② 若该构建已包含统一网关（#106742）相关的会话状态改动，应在下一版说明中明确标注 canary 用户需关注的 session/profile 兼容性提示。

---

## 3. 项目进展

当日 292 个 PR 完成合并/关闭，但**样本中可确认的已关闭 PR 仅 #155378**，说明高评论量 PR 多为长期审议中的大改动，快速合入的多为低讨论度的小型修复。

### 已确认关闭
- **#155378** `fix(skills): keep plaintext secrets out of oss-forensics working files` — 修复 `oss-forensics` 技能在第 1 阶段就把 `API_KEY`/`SECRET` 的 IOC 值写入 `iocs.md`、仅要求最终报告脱敏的问题。属于技能指令层的合规加固。[链接](https://github.com/NousResearch/hermes-agent/pull/155378)

### 推进中的重点方向（样本内活跃 PR）

| 方向 | PR | 进展 |
|---|---|---|
| 统一网关稳定性 | [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) | 继 #134889 关闭后的接续 tracker，仍在开放 |
| profile 生命周期 | [#155595](https://github.com/NousResearch/hermes-agent/issues/155595) / [#155925](https://github.com/NousResearch/hermes-agent/pull/155925) | tracker 建立次日即出语法统一 PR，节奏紧凑 |
| 技能可用性 | [#155370](https://github.com/NousResearch/hermes-agent/pull/155370) | `hermes skills lint` 新增缺失文件/CLI 检测（salvage #115176） |
| Fast 模式韧性 | [#155375](https://github.com/NousResearch/hermes-agent/pull/155375) | fast tier 429/529/5xx 时先降速重试同模型，再走 fallback |
| 网关媒体缓存 | [#155479](https://github.com/NousResearch/hermes-agent/pull/155479) | 入站附件按 `<platform>/<chat id>` 分桶，解决共享目录混杂 |

**整体推进评估**：项目在"安全加固 + 工程卫生"两条线上有明显增量，但在**架构级问题（统一网关）上处于"打补丁"阶段**——#134889 关闭当日即有 #143547 接棒，且新问题仍在持续上报，距收敛尚有距离。

---

## 4. 社区热点

### 🔥 #134889 [CLOSED] · 229 条评论 · P0
**Tracking: one gateway owns every local session (#106742) — post-merge fixes**
[链接](https://github.com/NousResearch/hermes-agent/issues/134889)
全项目评论数最高的议题，跨越 2026-10-08 → 11-14 共 37 天，最终关闭。它追踪的是统一网关改造（#106742，10 月 14 日合入 main）后的所有修复。**关闭本身是里程碑，但含金量需打折**——见下条。

### 🔥 #143547 [OPEN] · 69 条评论 · P2
**Unified gateway (#106742): open post-merge problems on main**
[链接](https://github.com/NousResearch/hermes-agent/issues/143547)
明确声明"继 #134889 继续"。摘要点出改造范围之广：CLI、TUI、Desktop、API server、编辑器、消息机器人、cron、Kanban、Group Chats **全部**把 turn 交给同一个进程。**诉求本质**：单点架构把原本隔离的故障域合并了，任何一处 stall 会横向传染。这是当前项目最大的架构性风险。

### 🔥 #105758 [OPEN] · 30 条评论 · P3 · needs-decision
**Lifecycle guard false-positive blocks Node.js CLIs**
[链接](https://github.com/NousResearch/hermes-agent/issues/105758)
生命周期守卫因 9 月 3 日的 scan-budget 提交产生误判，把合法的 Node.js CLI（如 `obsidian-headless` 的 `ob`）判为"试图重启/停止网关"而阻断。**跨 68 天未决，卡在 needs-decision**——安全启发式与可用性的边界如何划定，缺乏明确裁决机制。

### 🔥 #145022 [OPEN] · 23 条评论 · P1
**Kanban workers crash: "Kanban execution unknown; retained by owner"**
[链接](https://github.com/NousResearch/hermes-agent/issues/145022)
网关 stall 时并发 Kanban worker 集体崩溃（一次 stall 杀死 4 个 worker），WIP 全部丢失。与 #143547 同源。

### #136486 [CLOSED] · 20 条评论 · P1
**Replayed `reasoning` alias → HTTP 400 `duplicate field`，字段拒绝学习从未触发**
[链接](https://github.com/NousResearch/hermes-agent/issues/136486)
OpenAI 兼容端点上别名与正式字段同时回放导致每轮 fallback。**关闭说明供应商兼容层的一处长期缺陷已解决。**

**热点洞察**：评论量 Top 5 中有 3 条（#134889/#143547/#145022）指向同一个根因——**统一网关的故障域集中化**。社区讨论能量高度聚焦，既是关注度的体现，也是风险集中的信号。

---

## 5. Bug 与稳定性

按严重程度排序（P0 > P1 > P2）：

| 严重度 | Issue | 问题 | Fix PR |
|---|---|---|---|
| **P0** | [#134889](https://github.com/NousResearch/hermes-agent/issues/134889) | 统一网关本地会话归属 post-merge 修复 | ✅ 已关闭 |
| **P1** | [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) | Kanban worker 因网关 stall 崩溃，WIP 丢失 | ❌ 未见 |
| **P1** | [#135487](https://github.com/NousResearch/hermes-agent/issues/135487) | cron 重启安全 worker 遇 `database is locked` 单次尝试即退出，occurrence 丢失 | ❌ 未见 |
| **P1** | [#136486](https://github.com/NousResearch/hermes-agent/issues/136486) | `reasoning` 别名重复字段 → HTTP 400，每轮 fallback | ✅ 已关闭 |
| **P2** | [#148898](https://github.com/NousResearch/hermes-agent/issues/148898) | Codex 后端对部分 zstd 压缩 `/responses` 返回 400（#136916 引入的回归） | ❌ 未见，`cause/upstream` |
| **P2** | [#139532](https://github.com/NousResearch/hermes-agent/issues/139532) | 网关重启 fence turn 为 `unknown`，整个 session FIFO 永久阻塞，桌面端无恢复入口 | ❌ 未见，`cause/fallout` |
| **P2** | [#147839](https://github.com/NousResearch/hermes-agent/issues/147839) | 单次 20s `worker_receipt_timeout` 污染 store 并销毁整个 turn（用户见 "No reply"，单机复现 11 次） | ❌ 未见 |
| **P2** | [#137287](https://github.com/NousResearch/hermes-agent/issues/137287) | 桌面转录重复/乱序/丢消息 | ❌ 未见，`needs-repro` |
| **P2** | [#146440](https://github.com/NousResearch/hermes-agent/issues/146440) | Windows Kanban managed worker 初始化死锁（git 子进程继承 stdin 管道 + 插件 lazy numpy import） | ❌ 未见 |
| **P2** | [#143313](https://github.com/NousResearch/hermes-agent/issues/143313) | Python 3.14 下 `Pillow==13.0.0` 与 `browser-harness` 的 `pillow==12.3.0` 冲突，`pip install -e .` 不可解 | ❌ 未见 |
| **P2** | [#122813](https://github.com/NousResearch/hermes-agent/issues/122813) | `gateway_state.json` 的 `active_agents` 在 cron/API run 期间不落盘 | ❌ 未见 |
| **P2** | [#134092](https://github.com/NousResearch/hermes-agent/issues/134092) | cron 交付已结算但状态卡在 `delivery_queued` | ❌ 未见 |
| **P2** | [#140080](https://github.com/NousResearch/hermes-agent/issues/140080) | Android/Termux 上 `os.link` 不存在，fallback 只捕获 `OSError` → `hermes update` 失败 | ❌ 未见 |
| **P3** | [#62336](https://github.com/NousResearch/hermes-agent/issues/62336) | 终端环境快照把含凭据的环境变量（Bitwarden Secrets 注入）明文落盘 | ❌ 未见，**安全类** |
| **P3** | [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) | 生命周期守卫误杀 Node.js CLI | ❌ 未见，`needs-decision` |
| **P3** | [#125702](https://github.com/NousResearch/hermes-agent/issues/125702) | `.muse-plugin` 未被跳过，`superpowers` 持续报 schema 警告（#101962 修复不完整） | ❌ 未见 |

**稳定性研判**：P1 级 3 条中仅 1 条有关闭记录；**样本内 16 条 Bug 中 13 条无对应 fix PR**，修复供给明显落后于报告速度。回归类问题（#148898 由 #136916 引入、#125702 为 #101962 的不完整修复、#105758 源于 scan-budget 提交）占比约 20%，提示**近期快速迭代的变更缺少足够的回归护栏**。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 信号强度 | 判断 |
|---|---|---|---|
| **ACP Registry 注册**（Zed/JetBrains/VS Code） | [#47435](https://github.com/NousResearch/hermes-agent/issues/47435) | 12 评论，`needs-decision`，P4 | Zed v1.5.0 已弃用自定义 `agent_servers`，**外部生态倒逼**，不做即失去编辑器入口。可能进入中期路线图 |
| **桌面聊天输入支持换行** | [#52952](https://github.com/NousResearch/hermes-agent/issues/52952) | 11 评论，3 👍 | 低成本高频痛点，且已被标为 `area/config`，**最可能被快速纳入** |
| **未知模型 id 的视觉能力探测** | [#131208](https://github.com/NousResearch/hermes-agent/issues/131208) | 7 评论 | 与多模态路线一致，实现成本低（live probe），有较大概率被采纳 |
| **终端环境快照脱敏** | [#62336](https://github.com/NousResearch/hermes-agent/issues/62336) | 20 评论，安全 | 与本期 sec-marathon 主题高度契合，**具备搭车合入条件** |
| **profile 创建/生命周期治理** | [#155595](https://github.com/NousResearch/hermes-agent/issues/155595) | 新建 tracker + 次日即有 PR | 明确已立项，配套 [#155925](https://github.com/NousResearch/hermes-agent/pull/155925) 语法统一已在评审 |
| **插件目录扩充** | [#155929](https://github.com/NousResearch/hermes-agent/pull/155929) applysent / [#155604](https://github.com/NousResearch/hermes-agent/pull/155604) listeningkit-log 迁移 | 当日新开 | 生态建设常态化，但 [#155924](https://github.com/NousResearch/hermes-agent/pull/155924) 显示安装扫描器误伤"文档化拒绝行为"的插件，**目录扩张与安全扫描存在摩擦** |

**路线图信号**：本期无新增版本级特性提案，重心明确在**架构收敛与安全加固**，而非功能扩张。

---

## 7. 用户反馈摘要

从评论内容提炼的真实诉求：

**😣 不满意 / 高频痛点**
1. **故障恢复缺 UI 出口**（#139532）："桌面端没有提供任何操作入口，唯一恢复手段是终端命令"——单点卡死导致整个会话队列永久阻塞，普通用户无自救路径。这是**架构决策直接转化为用户体验债务**的典型。
2. **数据静默丢失**（#145022、#147839、#135487）：Kanban 卡片重试但 WIP 丢失、单次 receipt 超时销毁整个 turn、cron occurrence 消失。三者共性——**系统"看起来失败"，实际是工作成果不可恢复地蒸发**，比显式报错更伤信任。
3. **安全机制与正常使用冲突**（#105758）：守卫把 `ob` 这类正常 CLI 判为攻击行为，且 68 天无裁决。
4. **平台覆盖缺口**：Android/Termux（#140080）、Windows（#146440）上的失败模式说明**跨平台测试矩阵存在盲区**。

**😐 使用场景观察**
- **单操作员消息助手**（#68911，已关闭）：需要展示精确客户标识，但被强制脱敏边界拦截——反映"安全默认"与"窄域业务需求"的张力。
- **并发 Kanban 工作流**（#145022、#147839）：多 worker 并行是真实生产用法，而非边缘场景，但系统对并发的容错设计不足。
- **自托管/源码安装用户**（#122656，已关闭、#46276）：更新链路的重建、PATH 不匹配问题反复出现，这类用户占比不小。

**🙂 正面信号**
- `oss-forensics` 明文密钥、`p5js` 关闭 Chrome sandbox 等技能级安全问题在同日被快速修复，说明社区贡献者的安全响应是及时的。
- #155370 `skills lint` 直接回应"技能坏了只能等 agent 用的时候才发现"的抱怨，属于**从用户反馈反推工具建设**的良性循环。

---

## 8. 待处理积压

以下条目**开放时间超过 4 个月且今日仍有更新**，建议维护者优先裁决或明确关闭理由：

| 类型 | 编号 | 主题 | 开放天数 | 阻塞原因 |
|---|---|---|---|---|
| Issue | [#62336](https://github.com/NousResearch/hermes-agent/issues/62336) | **终端快照落盘凭据**（安全） | ~128 天 | 无 assignee，`needs-decision` |
| Issue | [#47435](https://github.com/NousResearch/hermes-agent/issues/47435) | ACP Registry 注册 | ~152 天 | `needs-decision`，P4 |
| Issue | [#46276](https://github.com/NousResearch/hermes-agent/issues/46276) | per-profile systemd 单元 PATH 不匹配导致持续"outdated" | ~154 天 | 无 fix PR |
| Issue | [#52952](https://github.com/NousResearch/hermes-agent/issues/52952) | 桌面输入不支持换行 | ~142 天 | 低成本但排期靠后 |
| Issue | [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) | 生命周期守卫误判 | ~68 天 | `needs-decision` |
| **PR** | [#35944](https://github.com/NousResearch/hermes-agent/pull/35944) | WhatsApp 同账号群消息 | **~168 天** | 长期未合并，涉及 `sweeper:blast-moderate`，需明确取舍 |

**积压研判**：⚠️ **`needs-decision` 标签是主要堵塞点**——#62336、#47435、#105758 三条均因等待产品/安全边界裁决而停滞，最长 152 天。这类问题通常不复杂，缺的是**决策机制而非实现能力**。建议设立定期决策例会，对 `needs-decision` 条目给出"接受 / 拒绝 / 转为设计文档"的三选一结论，避免议题在开放状态下无限期沉淀。**#62336（凭据明文落盘）与本期 sec-marathon 主题直接相关，是最值得借势清仓的一条。**

---

### 数据看板（今日）

| 指标 | 数值 | 解读 |
|---|---|---|
| Issue 更新 | 500 | 达数据上限，实际可能更高 |
| Issue 关闭率 | 199 / 500 = **39.8%** | 消化能力中等 |
| PR 更新 | 500 | 达数据上限 |
| PR 合并/关闭率 | 292 / 500 = **58.4%** | 吞吐健康 |
| 待合并 PR | 208 | 评审队列偏长 |
| 样本 Bug 无 fix PR 比例 | **13 / 16 = 81.3%** | ⚠️ 修复供给不足 |
| 回归类 Bug 占比 | 3 / 16 ≈ **18.8%** | ⚠️ 迭代护栏偏弱 |
| 新版本 | 1（canary） | 发布说明渲染异常 |

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报（2026-11-15）

> 数据窗口：截至 2026-11-14 的过去 24 小时。今日无新 Release。过去 24 小时 Issue 更新 16 条（新开/活跃 13，已关闭 3），PR 更新 32 条（待合并 30，已合并/关闭 2）。开发侧活跃度高，但 PR 合并/关闭率约 6.25%，积压压力明显。

## 1. 今日速览

- AstrBot 今日保持高活跃：Issue 与 PR 更新合计 48 条，Issue 端有 13 条新开/活跃，PR 端有 30 条待合并。
- 维护吞吐偏低：PR 合并/关闭仅 2/32，Issue 关闭 3/16；项目处于“讨论与提交活跃、合并消化偏慢”的状态。
- 今日无新版本发布，但 [#11140](https://github.com/AstrBotDevs/AstrBot/pull/11140) 已提出将版本提升至 `4.30.0-alpha.1`，显示下一版本进入准备阶段。
- 讨论热点集中在 Telegram 适配器命令/引用唤醒、QQ 官方机器人长时运行稳定性、Agent 插话与 TTS/流式输出互斥。
- 整体健康度评估：**活跃度高、方向明确；主要风险是平台适配类 Bug 集中、长期 PR 积压和合并吞吐不足**。

## 2. 版本发布

过去 24 小时无新 Release。  
[#11140](https://github.com/AstrBotDevs/AstrBot/pull/11140) `chore: bump version to 4.30.0-alpha.1` 仍为待合并状态，仅代表版本准备信号，不构成正式发布。

## 3. 项目进展

今日可确认关闭的重要 PR 为：

- [#10077 refactor: migration to event log backend for conversation storage](https://github.com/AstrBotDevs/AstrBot/pull/10077) — 已关闭。该 PR 描述将对话消息与执行记录改为有序事件日志后端，目标是解决压缩/插件编辑覆盖上下文、WebChat checkpoint 与 Agent 执行状态分离等问题。若最终落地，属于会话存储层的重要架构推进；但 GitHub 状态为 `CLOSED`，数据未明确区分“合并”与“关闭未合并”，需后续确认。

待合并 PR 显示的主要推进方向：

- [#11140](https://github.com/AstrBotDevs/AstrBot/pull/11140) 准备 `4.30.0-alpha.1` 版本。
- [#11135](https://github.com/AstrBotDevs/AstrBot/pull/11135) 新增 `send_voice` TTS 工具与 `tool` 语音模式，直接回应 TTS 工具化诉求。
- [#11141](https://github.com/AstrBotDevs/AstrBot/pull/11141)、[#11142](https://github.com/AstrBotDevs/AstrBot/pull/11142) 推进 steering input 与工具等待期间的后台接管，关联 Agent 插话问题。
- [#11143](https://github.com/AstrBotDevs/AstrBot/pull/11143) 修复 Gemini 历史消息中 URL 音频处理；[#11134](https://github.com/AstrBotDevs/AstrBot/pull/11134) 修复 Discord 引用回复未包含 embed/附件；[#11113](https://github.com/AstrBotDevs/AstrBot/pull/11113) 增加 Anthropic 备份 API Key 故障转移。
- [#11138](https://github.com/AstrBotDevs/AstrBot/pull/11138) 升级 Dashboard Markdown 渲染依赖。

**推进评估**：架构层有 1 个大型重构 PR 关闭；功能层多项修复与新能力仍在待合并队列；发布层为 0。整体处于 4.30 alpha 准备与积压消化期，净向前推进有限但方向清晰。

## 4. 社区热点

今日展示条目 👍 均为 0，反应数据不构成热点信号；以下按评论数排序。

| 条目 | 评论 | 热点内容 | 背后诉求 |
|---|---:|---|---|
| [#10240 Telegram 群聊中发给其他机器人的命令会误唤醒 AstrBot](https://github.com/AstrBotDevs/AstrBot/issues/10240) | 5 | `/help@OtherBot` 仍可能唤醒 AstrBot 并进入 LLM 处理 | Telegram 适配器应过滤非当前机器人命令，避免误唤醒、额外成本与错误响应 |
| [#10232 Telegram 回复机器人消息时 sender_id 与 self_id 不一致，导致引用唤醒失效](https://github.com/AstrBotDevs/AstrBot/issues/10232) | 4 | Telegram 数字 ID 与机器人用户名语义不一致，引用唤醒无法命中 | 统一消息 ID 语义，提升通用引用唤醒可靠性；该 Issue 标注 `[invalid]`，但仍反映适配器边界复杂 |
| [#11137 一个插件能不能同时写 astrbot 和 deepseek harness 两个插件框架](https://github.com/AstrBotDevs/AstrBot/issues/11137) | 3 | 插件跨框架兼容与迁移成本 | 生态兼容诉求：降低插件在 AstrBot 与其他框架间复用成本 |
| [#10839 QQ官方机器人群聊主动发言无 msg_id 时未发送但返回成功](https://github.com/AstrBotDevs/AstrBot/issues/10839) | 2 | 发送状态与实际结果不一致 | 主动消息能力需要真实发送回执与可靠错误反馈 |
| [#11144 安全模式系统提示词在 CLIProxyAPI → Antigravity 场景下可复现 429](https://github.com/AstrBotDevs/AstrBot/issues/11144) | 1 | 内置安全模式提示词触发 `RESOURCE_EXHAUSTED` | 安全模式提示词需可配置或对代理/上游兼容 |
| [#11130 AstrBot + QQ官方机器人长时间运行后单向断联](https://github.com/AstrBotDevs/AstrBot/issues/11130) | 1 | 约 30 小时后用户消息无法到达 Bot，主动消息仍可发送 | 长连接自愈、重连与平台会话健康检查 |
| [#11139 让 AI 更自主调用工具](https://github.com/AstrBotDevs/AstrBot/issues/11139) | 1 | 希望 AI 主动规划、调用工具、写日记/目标 | 从“命令驱动”走向“主动 Agent”的产品预期 |

**热点分析**：今日讨论并非集中在单一新功能，而是集中在“平台适配器语义正确性”和“长时运行可靠性”。Telegram 相关 Issue 占据评论榜前列，说明多机器人共存、引用回复、消息链处理是当前适配器层的高频摩擦点。

## 5. Bug 与稳定性

按影响面与严重程度排列：

| 严重度 | 问题 | 状态与 fix 判断 |
|---|---|---|
| 高 | [#11130 QQ官方机器人长时间运行后用户单方向断联](https://github.com/AstrBotDevs/AstrBot/issues/11130) | OPEN。约 30–40 小时复发，需手动重启平台；未见明确 fix PR，影响生产可用性 |
| 高 | [#11133 Agent 执行期间插话只在工具结果边界生效，且被会话锁排队到整轮结束](https://github.com/AstrBotDevs/AstrBot/issues/11133) | OPEN。长任务 40–120s 期间用户消息不可见，直接影响交互体验；相关方向 PR [#11141](https://github.com/AstrBotDevs/AstrBot/pull/11141)、[#11142](https://github.com/AstrBotDevs/AstrBot/pull/11142) 待合并，但未标注为该 Issue 的直接 fix |
| 高 | [#10240 Telegram 发给其他机器人的命令误唤醒 AstrBot](https://github.com/AstrBotDevs/AstrBot/issues/10240) | OPEN。多机器人群聊场景可复现，可能引发误响应与 LLM 成本；未见 fix PR |
| 中 | [#10138 开启流式输出后 TTS 完全不生效](https://github.com/AstrBotDevs/AstrBot/issues/10138) | OPEN。已有修复 PR [#9986](https://github.com/AstrBotDevs/AstrBot/pull/9986) 待 review，属长期未落地问题 |
| 中 | [#11144 安全模式提示词在 CLIProxyAPI → Antigravity 场景触发 429](https://github.com/AstrBotDevs/AstrBot/issues/11144) | OPEN。代理/上游兼容问题；未见 fix PR |
| 中 | [#10232 Telegram 引用机器人消息时 sender_id/self_id 不一致导致引用唤醒失效](https://github.com/AstrBotDevs/AstrBot/issues/10232) | OPEN，标注 `[invalid]`。影响非文本消息或移除 `/` 前缀后的引用唤醒；未见 fix PR |
| 中 | [#11125 Telegram 同一 MessageChain 发送两次会重复 mention](https://github.com/AstrBotDevs/AstrBot/issues/11125) | OPEN。插件广播/重试场景会出现重复 @；未见 fix PR |
| 低-中 | [#11123 Telegram 相册 debounce 超过最大等待时间](https://github.com/AstrBotDevs/AstrBot/issues/11123) | OPEN。媒体组最后一片接近截止时间时被重新计时；未见 fix PR |
| 已关闭 | [#10839 QQ官方机器人主动发言无 msg_id 时未发送但返回 “Message sent”](https://github.com/AstrBotDevs/AstrBot/issues/10839) | CLOSED。发送状态误报问题已关闭，但数据未展示修复 PR |
| 已关闭 | [#11129 WebUI list editor 可选解码转义序列](https://github.com/AstrBotDevs/AstrBot/issues/11129) | CLOSED。P2 feature 请求已关闭 |

## 6. 功能请求与路线图信号

| 需求 | 对应 Issue/PR | 纳入下一版本可能性判断 |
|---|---|---|
| TTS 工具化：模型按轮决定是否发语音，自动 TTS 变为可选策略 | [#11131](https://github.com/AstrBotDevs/AstrBot/issues/11131) + [#11135](https://github.com/AstrBotDevs/AstrBot/pull/11135) | **较高**。#11135 已实现 `send_voice` 工具与 `provider_tts_settings.mode=tool`，若 review 顺利，可能进入 4.30 alpha 系列 |
| Agent 插话即时进入上下文，不被会话锁排队到整轮结束 | [#11133](https://github.com/AstrBotDevs/AstrBot/issues/11133) + [#11141](https://github.com/AstrBotDevs/AstrBot/pull/11141)、[#11142](https://github.com/AstrBotDevs/AstrBot/pull/11142) | **较高**。已有明确 PR 方向：steering input 作为用户消息追加、工具等待时后台接管 |
| 让模型参与分段回复，新增 `segmented_reply.model_controlled` | [#11132](https://github.com/AstrBotDevs/AstrBot/issues/11132) | 中低。需求清晰，但今日数据中未见对应 PR |
| 插件注册的平台适配器提供可扩展引导式接入流程 | [#11146](https://github.com/AstrBotDevs/AstrBot/issues/11146) | 中低。属平台接入体验重构，未见 PR |
| Shell/apt 等群聊安全限制可配置，并提供调试入口 | [#11145](https://github.com/AstrBotDevs/AstrBot/issues/11145) | 中低。涉及安全策略权衡，未见 PR |
| AI 更自主调用工具、主动规划与写日记 | [#11139](https://github.com/AstrBotDevs/AstrBot/issues/11139) | 中长期。产品方向明确，但今日未见对应实现 PR |
| 下一版本准备 | [#11140](https://github.com/AstrBotDevs/AstrBot/pull/11140) `4.30.0-alpha.1` | **高**。版本号提升 PR 已提出，处于发布准备信号 |

**路线图判断**：最明确的近期功能信号是 **TTS 工具化** 与 **Agent steering/插话处理**，二者均有开放 PR；分段回复模型控制、适配器引导接入、安全设置可配置仍停留在需求讨论阶段。

## 7. 用户反馈摘要

从今日 Issues 描述与讨论量提炼：

- **平台适配器边界是最大痛点**：Telegram 的命令过滤、引用唤醒、消息链重复 mention、相册 debounce，以及 QQ 官方机器人的主动消息路由和长连接断联，均说明多平台适配的语义一致性仍需加强。
- **长任务 Agent 的交互体验需改善**：用户在 Agent 连续调用工具、单轮 40–120s 时发送消息，期望插话能即时进入上下文，而不是被会话锁静默排队到整轮结束。
- **TTS 与流式输出互斥、自动 TTS 不灵活**：用户希望模型能按轮决定是否发语音，而不是由核心管线强制触发；#11131 与 #11135 形成需求到 PR 的闭环信号。
- **安全策略被指“过度严格且缺少调试入口”**：4.29.X 用户希望群聊代码权限、包管理权限可配置，并提示提示词注入风险。
- **插件生态存在跨框架兼容诉求**：#11137 虽已关闭，但反映用户希望插件能在 AstrBot 与 DeepSeek harness 等框架间复用。
- **用户对 AI 自主性有更高预期**：希望 AI 主动调用工具、自主规划、写日记/目标，而非仅响应命令。
- **满意度信号**：今日无明确正向反馈数据；部分 Issue 关闭说明维护者有响应，但多个长期 Bug 仍开放，用户耐心可能受长时稳定性问题影响。

## 8. 待处理积压

以下长期未响应或长期待合并项建议维护者优先关注：

| 条目 | 起始时间 | 状态 | 关注理由 |
|---|---|---|---|
| [#10138 流式输出 + TTS 完全不生效](https://github.com/AstrBotDevs/AstrBot/issues/10138) | 2026-09-19 | OPEN，fix PR [#9986](https://github.com/AstrBotDevs/AstrBot/pull/9986) 待 review | 长期 Bug，直接影响 TTS 核心功能；修复 PR 已存在但未推进 |
| [#10240 Telegram 其他机器人命令误唤醒](https://github.com/AstrBotDevs/AstrBot/issues/10240) | 2026-09-26 | OPEN，5 评论 | 多机器人群聊高频场景，可能造成误响应与成本 |
| [#10232 Telegram 引用唤醒失效](https://github.com/AstrBotDevs/AstrBot/issues/10232) | 2026-09-25 | OPEN，4 评论，标注 invalid | 通用引用唤醒语义问题，影响非文本消息 |
| [#10152 fix(qqofficial): 保留重启后的主动消息路由](https://github.com/AstrBotDevs/AstrBot/pull/10152) | 2026-09-20 | OPEN | QQ 官方机器人主动消息在重启后可能被静默跳过 |
| [#9728 fix: 启用 xAI Responses 原生 web search](https://github.com/AstrBotDevs/AstrBot/pull/9728) | 2026-08-18 | OPEN | 长期功能 PR，涉及 provider 能力与 WebChat 来源卡片 |
| [#9865 fix: 避免持久化 usage 导致过早上下文压缩](https://github.com/AstrBotDevs/AstrBot/pull/9865) | 2026-08-28 | OPEN | 影响上下文压缩与 token 统计准确性 |
| [#10768 fix: 立即持久化主动消息历史](https://github.com/AstrBotDevs/AstrBot/pull/10768) | 2026-10-25 | OPEN | 主动消息历史持久化，关联会话一致性 |
| [#10739 fix: 遵循系统时区并保存前校验 cron](https://github.com/AstrBotDevs/AstrBot/pull/10739) | 2026-10-24 | OPEN | 定时任务时区与校验问题，影响调度可靠性 |

**维护建议**：优先清理长期 Bug 的 fix PR（尤其 #9986 与 TTS/流式相关），并对 Telegram/QQ 官方机器人适配器的边界问题做集中归类；PR 队列中多条 `wcqqq1214` 的修复已积累较久，建议按平台/模块批量 review，以降低 30 条待合并 PR 的积压风险。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目日报 · 2026-11-15

> 数据口径说明：该仓库未启用 GitHub Issues / Pull Requests，代码变更仅经 Releases 落地；本文所有社区素材来自 Discussions（过去 24 小时更新 198 条，取评论数 Top 15）。顶部 👍 数据全为 0，疑为采集口径问题，故本文**不将点赞数作为支持度依据**，仅以评论数与参与深度衡量热度。

---

## 1. 今日速览

- 2026-11-15，deepseek-harness 过去 24 小时 Discussions 更新 **198 条**，新版本发布 **0 个**，可确认的代码合并 **0 项**（该仓库以 Release 为唯一合并出口）。
- 社区侧处于高位活跃，交付侧完全静默，形成明显的 **"讨论热、交付冷"剪刀差**：单日近 200 条讨论更新却无任何用户可见变更进入分发渠道。
- 热度前二均非核心工程议题：俄罗斯 MIR 支付通道（#12755，65 评论）与第三方推理服务 OpenCode Go 的 `x-opencode-session` 头兼容（#5495，48 评论），说明**接入与可付费性**已成为社区第一矛盾。
- 稳定性侧出现两起高严重度问题：agent 误删工作目录导致会话全失（#12751）、inspector 未捕获异常直接终止宿主进程（#11218），截至本日均**未见修复版本**。
- 生态侧仍在正向生长：WSL 运行环境插件（#8644）、设计工作台（#10615，今日仍有更新）等第三方扩展持续迭代，插件作者群体是当前最稳定的活跃子集。

---

## 2. 版本发布

**今日无新版本发布。** 最新 Releases 为空，故无更新内容、破坏性变更与迁移注意事项可列。

需要提示的是：由于本仓库不存在 PR 流程，**Release 是唯一的功能与修复交付口径**，因此"0 发版"等价于"0 交付"，而非"数据缺失"。

---

## 3. 项目进展

**今日合并上线：无。** 因 Releases 为 0，本次无 changelog 条目可摘要，即过去 24 小时内 **0 项功能、0 项修复**进入用户可分发的版本。

对存量进展的核对（来自讨论区自述，非今日变更）：

| 事项 | 状态 | 版本锚点 | 链接 |
|---|---|---|---|
| `tokenUsage` 重试步骤"替换而非累加"问题 | 已修复并随版本发布（2026-08-25, commit `b565df344`） | `dsh-v0.1.2-alpha.1` | [#1886](https://github.com/deepseek-ai/deepseek-harness/discussions/1886) |
| `compaction/summary.usage` 未被折叠（D-3） | 仍未修复，讨论持续 | — | [#1886](https://github.com/deepseek-ai/deepseek-harness/discussions/1886) |

**健康度判断**：单日 198 条讨论更新对应 0 发版，说明社区输入速率显著高于版本吞吐速率。若该状态持续，主要风险不是"没人用"，而是**高价值反馈在等待中衰减**——尤其 #1886 已跨 3 个月、累计 29 条评论仍在同一议题上拉锯。

---

## 4. 社区热点

### 4.1 支付通道：#12755 MIR 卡支付（65 评论，今日榜首）
[@Egor-Liadsky](https://github.com/deepseek-ai/deepseek-harness/discussions/12755)｜创建 11-09，更新 11-14｜OPEN
诉求：为俄罗斯用户增加本国 MIR 卡充值通道，理由是本地发卡行无法支付导致 API 与 Harness 整体不可用。
**背后**：这不是产品功能请求，而是**市场准入/计费覆盖**问题。65 条评论、跨 6 天持续发酵，说明受影响的是一整个区域的付费意愿用户，且讨论已从"能不能加"转向支付路径的实际可行性。这类议题无法靠工程排期解决。

### 4.2 生态兼容：#5495 `x-opencode-session` 请求头（48 评论）
[@thdxr](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)｜创建 09-03，更新 11-14｜OPEN
诉求：OpenCode Go 托管推理服务自 09/05 起强制要求该头（用于按会话路由与优化），而据发帖人测算**约 2.5 万个用户组织**通过 deepseek-harness 调用其服务。
**背后**：这是**第三方服务方主动上门提出的互操作断裂**，且带硬性时间点。它揭示了一个结构性事实——Harness 已成为他人推理链路上的关键客户端，任何请求头/会话标识策略的缺省行为都会外溢成生态级故障。距今已逾两月未闭环，风险等级应上调。

### 4.3 遥测准确性：#1886 `tokenUsage` 投影（29 评论）
[@lizhuojunx86](https://github.com/deepseek-ai/deepseek-harness/discussions/1886)｜创建 08-15，更新 11-14｜OPEN
诉求：`compaction/summary.usage` 未被折叠进用量统计。发帖人已主动把议题收敛为单点（D-3），并自行核对 merge-base，属高质量报告。
**背后**：用量/成本数据的可信度问题。对按量付费与团队成本分摊场景，统计缺口会直接转化为信任缺口。

### 4.4 插件开发者体验：#5120 插件从 0.1.1 升级到 0.1.2 的 skill（21 评论）
[@tianyicui](https://github.com/deepseek-ai/deepseek-harness/discussions/5120)｜创建 08-30，更新 11-14｜OPEN
诉求：希望官方提供**面向插件作者**的版本迁移指南/skill，而非面向终端用户。
**背后**：小版本迭代已在真实磨损第三方作者。插件生态是当前最活跃的子集，迁移成本会直接压制供给。

### 4.5 桌面端基础体验：#8713 会话内 Ctrl+F 搜索（20 评论）
[@furoute](https://github.com/deepseek-ai/deepseek-harness/discussions/8713)｜创建 10-02，更新 11-14｜OPEN
诉求：桌面版会话窗口缺少关键字搜索。发帖人给出了根因定位（底层全文检索引擎已就位但未接线、无入口）并附**本机跑通的原型插件**。
**背后**：典型的"能力已具备、只差接线"的低成本高收益项，且报告质量极高。

### 4.6 数据安全事故：#12751 agent 清空工作目录（16 评论）
[@wlfzsd](https://github.com/deepseek-ai/deepseek-harness/discussions/12751)｜创建 11-09，更新 11-14｜OPEN
用户仅要求"写一个统计 token 用量的插件"，结果 dsh 目录被清空、**所有会话丢失，同时 zcode 的会话也全部丢失**。
**背后**：情绪强烈但诉求清晰——**缺少不可逆操作的兜底**（删除前确认/隔离/备份）。这是当前社区信任度最大的单点威胁。

### 4.7 生态展示：#10615 设计工作台 dsh-design-studio（15 评论，今日仍有更新）
[@OrderG-X](https://github.com/deepseek-ai/deepseek-harness/discussions/10615)
在画布上直排模型产出的界面、按平台规范校验、内置设计市场，是把 Harness 推向"设计工作流"的完整第三方产品化尝试。

其余进入 Top 15 的议题：#9921 跨对话消息（11）、#9995 Windows 安装器升级失败（10）、#11218 inspector 崩溃（8）、#9662 subagent 空字符串路由（8）、#8644 WSL 插件（8）、#5684 单 `$` 数学解析（7）、#6989 重启后人工审批（7）、#5908 记忆实现踩坑（6）。

---

## 5. Bug 与稳定性

按严重程度排列；因该仓库无 PR 机制，"修复状态"以是否出现已发布版本为准。

| 级别 | 问题 | 影响 | 修复状态 | 链接 |
|---|---|---|---|---|
| **P0** | agent 执行中清空 DSH 目录，会话全失并波及 zcode 会话 | 用户数据不可逆丢失 | ❌ 无修复版本 | [#12751](https://github.com/deepseek-ai/deepseek-harness/discussions/12751) |
| **P0** | `InspectorSourceBuffer.setState` 未捕获异常（source-frame 字节上限），宿主进程直接退出 | 桌面宿主崩溃，任务中断 | ❌ 无修复版本，10-26 起未闭环 | [#11218](https://github.com/deepseek-ai/deepseek-harness/discussions/11218) |
| **P1** | Windows 安装器 backup 重命名恒定返回 error 5，`0.2.0-rc.2 → 0.2.1-rc.2` 升级 100% 失败 | 阻断升级通道（应用内与手动均复现，排除 ACL/杀软/残留进程） | ❌ 无修复版本 | [#9995](https://github.com/deepseek-ai/deepseek-harness/discussions/9995) |
| **P1** | `subagent` 的 `provider/model/reasoning_effort` 传空字符串被判定为"显式选择"后遭非空校验拒绝，报错无补救指引 | 子模型委派失败，main 同样受影响 | ❌ 无修复版本 | [#9662](https://github.com/deepseek-ai/deepseek-harness/discussions/9662) |
| **P2** | `tokenUsage` 未折叠 `compaction/summary.usage` | 用量统计偏低，成本核算失真 | ⚠️ 同议题另一子项已随 `dsh-v0.1.2-alpha.1` 修复，本项仍开 | [#1886](https://github.com/deepseek-ai/deepseek-harness/discussions/1886) |
| **P2** | 缺少 `x-opencode-session` 头导致第三方推理服务拒绝请求 | 约 2.5 万组织的调用链面临失败（外部已设硬性生效日） | ⚠️ 未见修复版本，属跨项目协同项 | [#5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495) |
| **P3** | `singleDollarTextMath` 默认开启，普通 `$` 被解析为 KaTeX 行内公式 | 文本渲染错乱（已给出目标路径 `packages/client/ui-primitives/src/markdown/`） | ❌ 无修复版本 | [#5684](https://github.com/deepseek-ai/deepseek-harness/discussions/5684) |

**小结**：两起 P0 均涉及"不可恢复"——一个丢数据、一个杀进程，且都已存续 2 周以上（#12751 自 11-09、#11218 自 10-26）。在当前零发版的背景下，这两项应视为发版阻断级候选。

---

## 6. 功能请求与路线图信号

结合议题成熟度（是否附根因/原型/明确接口）判断落地可能性：

**高可能（成本低、方案已成形）**
- **会话内 Ctrl+F 搜索**（[#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713)）：全文检索引擎已存在，缺接线与入口，且已有可运行原型。此类"能力已有、只差 UI"的项最容易进入下一个小版本。
- **单 `$` 数学解析开关**（[#5684](https://github.com/deepseek-ai/deepseek-harness/discussions/5684)）：一行默认值变更 + 目标文件已定位，属可快速收敛的渲染修复。

**中等可能（需跨版本规划）**
- **受支持的跨对话消息能力**（[#9921](https://github.com/deepseek-ai/deepseek-harness/discussions/9921)）：要求 Agent 侧工具 + 文档化本地 API/CLI + 发送方来源与授权开关，涉及权限模型，非小改动。但场景真实（1 编排 + 3 工程会话并行，需广播 PDK 路径）。
- **插件作者迁移 skill**（[#5120](https://github.com/deepseek-ai/deepseek-harness/discussions/5120)）：官方已进入讨论语境，属文档/工具链投入，可随版本节奏补齐。
- **重启后的人工审批**（[#6989](https://github.com/deepseek-ai/deepseek-harness/discussions/6989)）：多租户服务端部署下"审批人不在会话内"的审批落地问题，指向企业级能力缺口。

**低可能 / 非工程路径**
- **MIR 支付**（[#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755)）：取决于商务与支付合规，不由版本节奏决定；社区应被明确告知决策路径，否则讨论将持续占用热度首位。

**生态信号（非官方路线图）**：WSL 沙箱化（[#8644](https://github.com/deepseek-ai/deepseek-harness/discussions/8644)）与设计工作台（[#10615](https://github.com/deepseek-ai/deepseek-harness/discussions/10615)）显示第三方正在把 Harness 从"编码助手"推向"运行环境层"与"设计工作流"，官方对 seam provider（`ctx.shell` / `ctx.fs`）的稳定性承诺将决定这批插件的寿命。

---

## 7. 用户反馈摘要

- **可付费性是第一道门槛（不满）**：#12755 的 65 条评论表明，对部分区域用户而言，产品体验的起点不是功能而是"卡能不能刷"。这类用户并非不认可产品，而是根本进不来。
- **不敢放手让 agent 动手（信任受损）**：#12751 的表述情绪激烈，但指向明确——一个"加个小统计"的轻量请求演变为全量会话丢失，还外溢到 zcode。用户对不可逆操作的容忍度已到临界点，缺的是确认、隔离与回滚，而非更多能力。
- **升级路径不可靠（不满）**：#9995 用户已做完整排查（无残留进程、ACL 正常、关杀软仍失败），仍 100% 卡在安装器 backup 步骤。桌面端用户的升级体验是留存的关键一环。
- **用量数据要能对得上账（不满）**：#1886 的报告者持续三个月自证、自行核对 merge-base，说明用户对 token 统计的准确性有审计级需求（团队分摊、成本归因）。
- **"找一句话"这种基础动作仍缺（不满但建设性）**：#8713 用户没有停在抱怨，而是给出根因与可跑原型——这是最容易被满足的一类反馈，也是最容易被忽视的一类。
- **作为被依赖的客户端（认知升级）**：#5495 由服务提供方上门提出，附带用户规模测算与生效日期。社区已把 Harness 当作生产链路组件，而非玩具。
- **满意面**：插件作者群体的正向输出最明显（#8644、#10615、#5908），#5908 甚至主动把 deer-flow 与 TencentDB-Agent-Memory 的生产踩坑（删除 agent 后记忆仍被防抖任务写回、清空与写入竞态、同一消息被归档钩子重复写 8 次）整理成经验供他人避坑——生态的自助文化正在形成。

---

## 8. 待处理积压

以下议题均处 OPEN 且长期无版本侧回应，建议维护者按"老化天数 × 影响面"排优先级：

| 议题 | 存续 | 评论 | 老化风险 | 链接 |
|---|---|---|---|---|
| `tokenUsage` 未折叠 `compaction/summary.usage`（D-3） | 自 08-15，约 3 个月 | 29 | ⭐⭐⭐ 高：报告者已把范围收敛到单点，仍无结论 | [#1886](https://github.com/deepseek-ai/deepseek-harness/discussions/1886) |
| 插件 0.1.1 → 0.1.2 迁移 skill | 自 08-30，约 2.5 个月 | 21 | ⭐⭐⭐ 高：直接压制插件供给 | [#5120](https://github.com/deepseek-ai/deepseek-harness/discussions/5120) |
| `x-opencode-session` 头兼容 | 自 09-03，约 2.4 个月，含已过期生效日 | 48 | ⭐⭐⭐ 高：外部硬期限 + 万级组织影响面 | [#5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495) |
| 单 `$` 数学解析 | 自 09-05 | 7 | ⭐ 低（成本低，宜顺手清掉） | [#5684](https://github.com/deepseek-ai/deepseek-harness/discussions/5684) |
| 重启后的人工审批 | 自 09-18 | 7 | ⭐⭐ 中：企业部署场景的准入项 | [#6989](https://github.com/deepseek-ai/deepseek-harness/discussions/6989) |
| 桌面版 Ctrl+F 搜索 | 自 10-02 | 20 | ⭐⭐ 中：附原型，等待接线 | [#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713) |
| Windows 安装器 error 5 | 自 10-17 | 10 | ⭐⭐⭐ 高：阻断升级，影响面随时间扩大 | [#9995](https://github.com/deepseek-ai/deepseek-harness/discussions/9995) |
| 跨对话消息能力 | 自 10-17 | 11 | ⭐⭐ 中：需架构级决策，宜先给结论 | [#9921](https://github.com/deepseek-ai/deepseek-harness/discussions/9921) |
| inspector 宿主崩溃 | 自 10-27 | 8 | ⭐⭐⭐ 高：P0 崩溃，13 天仅 8 评论——**关注度显著低于其严重度** | [#11218](https://github.com/deepseek-ai/deepseek-harness/discussions/11218) |

**给维护者的三点提醒**
1. **#11218 存在"严重度—关注度倒挂"**：一个能杀死宿主进程的未捕获异常，讨论量却低于一个支付渠道请求。评论数不等于优先级，此类静默崩溃最易被漏掉。
2. **#5495 与 #9995 有明确的外部时钟**：一个是第三方服务已生效的硬性要求，一个是用户完全无法升级。这两项拖延的成本随时间非线性上升。
3. **零发版日更需要"倾听信号"**：198 条讨论更新 / 0 发版说明反馈在持续堆积。建议即使不发版，也对 Top 5 议题给出公开处置结论（采纳 / 排期 / 不采纳及原因），以维持社区对流程的信任。

---

*本报告基于 2026-11-15 抓取的 GitHub Discussions 数据生成；该仓库不使用 Issues/PR，故所有社区信号均来自 Discussions，代码交付状态以 Releases 为唯一依据。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*