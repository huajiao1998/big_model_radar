# OpenClaw 生态日报 2026-11-22

> Issues: 411 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-22 01:46 UTC

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
**日期：2026-11-22** ｜ 数据窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时 OpenClaw 维持**极高活跃度**：Issues 更新 411 条（新开/活跃 294、关闭 117），PR 更新 500 条（待合并 299、已合并/关闭 201），无新版本发布。项目吞吐量处于高位，但 **299 条待合并 PR** 表明评审环节仍是主要瓶颈。稳定性方面，更新/迁移链路集中爆发问题，2026.11.x 版本线的 Doctor、WAL 校验、插件迁移与 Windows 更新失败构成当前最大发布风险。最值得关注的是 P0 回归 [#160959](https://github.com/openclaw/openclaw/issues/160959)：大型外部插件采集导致 Gateway 事件循环阻塞数分钟，已持续约 8 周、85 条评论，仍无 fix PR。整体健康度评估：**活跃度高、修复吞吐强，但 P0 积压与更新可靠性拖累发布信心**。

---

## 2. 版本发布

过去 24 小时**无新版本发布**（0 个）。

当前版本线处于 2026.11.x 迭代期：稳定版 2026.11.3、候选/测试版 2026.11.5 及 beta.4 均有用户验证反馈。今日多条高优 Issue 直接指向该版本线的升级体验，建议下一版本发布前优先清理更新链路问题（见第 5 节）。

---

## 3. 项目进展

### 已合并/关闭（样本可见）

24 小时内共有 **201 条 PR 已合并/关闭、117 条 Issue 关闭**。从可见样本看，关闭方向集中在稳定性与跨平台修复：

- [#203358](https://github.com/openclaw/openclaw/pull/203358)（CLOSED）— 在 Settings 中为主模型/回退模型选择 harness；带 `merge-risk: compatibility` 标记，关闭原因需确认是否为合并或替代。
- [#203376](https://github.com/openclaw/openclaw/pull/203376)（CLOSED）— 修复 OpenClaw 工具图标重叠线条，属 UI 细节。
- [#185578](https://github.com/openclaw/openclaw/issues/185578)（CLOSED，P1）— Gateway 堆内存只升不降、system prompt/skills 字符串在运行后仍可达，约 25 MiB/h 直至 V8 上限。
- [#199155](https://github.com/openclaw/openclaw/issues/199155)（CLOSED，P1）— 跨进程写入 `transcript_events` 导致 `UNIQUE(session_id, seq)` 冲突；带 `fix-shape-clear`、`queueable-fix`，修复路径较明确。
- [#163139](https://github.com/openclaw/openclaw/issues/163139)（CLOSED）— Windows `plugins.reload` 准备 host-package link 时 EPERM 并卡住 Gateway。
- [#158817](https://github.com/openclaw/openclaw/issues/158817)（CLOSED）— Windows `openclaw.cmd` shim 截断多行 CLI 参数。
- [#163739](https://github.com/openclaw/openclaw/issues/163739)（CLOSED）— Control UI `Ctrl+Shift+A` 归档快捷键与浏览器冲突，产品决策类关闭。
- [#177506](https://github.com/openclaw/openclaw/issues/177506)（CLOSED）— Skill Workshop 评审破坏 prompt-cache 前缀，单晚约 1670 万 tokens 被丢弃。
- [#166336](https://github.com/openclaw/openclaw/issues/166336)（CLOSED）— Agent `automations` 工具在会话中静默消失、跨冷重启持续。

> 注意：部分关闭 Issue 带 `stale` 标签，可能属于机器人清理而非真实修复；上述带 `fix-shape-clear` 或 P1 的关闭更可能代表实际推进。

### 推进中的重点 PR

- [#202462](https://github.com/openclaw/openclaw/pull/202462)（P0）— 修复模型 setup 失败后恢复旧配置被误判为“配置体积骤降”而阻塞。
- [#203377](https://github.com/openclaw/openclaw/pull/203377)（P1）— 修复 FaceTime 播放被中断后无法保持打开。
- [#203375](https://github.com/openclaw/openclaw/pull/203375)（P1）— 修复纯文本模型下聊天图片生成后续回合无限重试。
- [#202973](https://github.com/openclaw/openclaw/pull/202973) — 主线程停顿导致 30 秒 state lease 被误判丢失、clone 被 SIGTERM。
- [#202960](https://github.com/openclaw/openclaw/pull/202960) — 后台模板刷新阻塞已就绪模板的首条消息。
- [#202937](https://github.com/openclaw/openclaw/pull/202937) — worker bundle 清理期间保持会话读写响应。
- [#203364](https://github.com/openclaw/openclaw/pull/203364) — Goal 预算计入已结算模型 tokens。

**进展评估**：净进展为正，Windows 兼容性与会话状态类问题有实际收敛；但 P0 更新链路与插件采集问题尚未见 fix PR，整体“向前迈进”幅度被高优积压抵消。

---

## 4. 社区热点

今日讨论最集中的 Issues 呈现三条主线：**更新可靠性、性能/成本、跨平台一致性**。

| Issue | 评论 | 优先级 | 状态 | 核心诉求 |
|---|---:|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) Gateway 采集大型插件时阻塞数分钟 | 85 | P0 | OPEN，无 fix PR | 插件生成采集在启动/模型运行时重发布时阻塞事件循环，属 2026.9.6 回归，直接影响可用性 |
| [#191944](https://github.com/openclaw/openclaw/issues/191944) macOS `gateway stop` 失败 | 38 | P2 | OPEN | 进程祖先检查失败，`stop`/`stop --force` 均不可用，需独立终端或托管交接 |
| [#197083](https://github.com/openclaw/openclaw/issues/197083) Doctor WAL 校验导致 11.3 更新半完成 | 32 | P0 | OPEN，无 fix PR | 升级后 WAL 发布无法验证，回滚被 `state-migrated-no-rollback` 拒绝，外部插件状态残留 |
| [#182891](https://github.com/openclaw/openclaw/issues/182891) Prompt cache 从不复用 | 22（👍1） | P2 | OPEN | 每次请求 `cache read dropped N -> 0`，envelope 重写与 runtimeContextCarrier 变化导致成本飙升 |
| [#200606](https://github.com/openclaw/openclaw/issues/200606) 11.5 候选 Doctor 阻止更新 | 19（👍1） | P1 | OPEN | 插件迁移义务冲突且 `changed=[]`，候选验证阶段即失败 |
| [#163739](https://github.com/openclaw/openclaw/issues/163739) Ctrl+Shift+A 可配置 | 16（👍1） | P2 | CLOSED | 快捷键与浏览器冲突且不可禁用/重映射 |
| [#200756](https://github.com/openclaw/openclaw/issues/200756) Windows beta.2→beta.4 更新失败 | 15 | P2 | OPEN | `package-swap` 基线扫描失败、回滚树变化 |
| [#169844](https://github.com/openclaw/openclaw/issues/169844) Windows Control UI 更新卡在 Activating | 14 | P0 | OPEN，无 fix PR | 计划任务被禁用、Gateway 停止、包未更新 |
| [#181432](https://github.com/openclaw/openclaw/issues/181432) 基线 RSS 约 1.9 GB | 14 | P1 | OPEN，无 fix PR | 升级后内存从约 300 MB 升至 1.89 GB，SQLite 事务超时、Telegram 消息崩溃 |
| [#196199](https://github.com/openclaw/openclaw/issues/196199) Codex helper 无法恢复父会话 | 13 | P1 | OPEN | 2026.10.10 后 helper 完成时唤醒失败，Goal 暂停、用户被锁在助手外 |

**背后诉求分析**：
1. **升级路径必须可回滚、可解释**。多条 Issue 集中在 Doctor/迁移/WAL 校验，用户并非反对升级，而是无法接受“半完成、不可回滚、错误信息不足”。
2. **性能与成本已成为一等公民**。插件采集阻塞、RSS 翻倍、prompt cache 失效、Skill Workshop 缓存击穿，均直接转化为延迟与账单。
3. **跨平台体验仍不均衡**。macOS 停止命令、Windows 更新与 shim、Scheduled Task 生命周期问题反复出现。

---

## 5. Bug 与稳定性

### P0（需立即处理）

| Issue | 问题 | 是否有 fix PR |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | Gateway 采集大型外部/workspace 插件时事件循环阻塞数分钟；2026.9.6 回归；`impact:crash-loop` | **无**（`no-new-fix-pr`、`needs-maintainer-review`） |
| [#197083](https://github.com/openclaw/openclaw/issues/197083) | 11.1→11.3 受管 npm 升级后 Doctor WAL 校验失败，更新半完成，回滚被拒 | **无** |
| [#169844](https://github.com/openclaw/openclaw/issues/169844) | Windows Control UI 更新卡在 4/7 “Activating”，计划任务禁用、Gateway 停止 | **无** |

### P1

| Issue | 问题 | 是否有 fix PR |
|---|---|---|
| [#200606](https://github.com/openclaw/openclaw/issues/200606) | 11.3→11.5 候选 Doctor 因插件迁移冲突阻止更新 | 未见 |
| [#181432](https://github.com/openclaw/openclaw/issues/181432) | 基线 RSS ~1.9 GB、SQLite 事务超时、消息丢失/崩溃循环 | 无（`no-new-fix-pr`） |
| [#196199](https://github.com/openclaw/openclaw/issues/196199) | Codex helper 完成后无法恢复父会话，Goal 暂停 | 未见 |
| [#197515](https://github.com/openclaw/openclaw/issues/197515) | Codex “data/settings upgrade is unfinished” 持续，已合并修复未进入发布 | 未见 |
| [#191476](https://github.com/openclaw/openclaw/issues/191476) | Matrix 房间在 `image_generate` 完成竞争后卡在 “consumer is closed” | 未见（`needs-live-repro`） |
| [#153899](https://github.com/openclaw/openclaw/issues/153899) | Gateway drain 等满 `TimeoutStopSec`，定时器继续访问已关闭资源 | 无 |
| [#169797](https://github.com/openclaw/openclaw/issues/169797) | 单 CPU 主机内存为 2026.9.4 的约 2.5 倍，启动/首回复慢 3–5 倍 | 无 |

### P2（代表性）

- [#191944](https://github.com/openclaw/openclaw/issues/191944) — macOS 进程祖先检查失败，`gateway stop` 不可用。
- [#182891](https://github.com/openclaw/openclaw/issues/182891) — prompt cache 每次归零，成本问题。
- [#200756](https://github.com/openclaw/openclaw/issues/200756) — Windows `package-swap` 失败、回滚树变化。
- [#200224](https://github.com/openclaw/openclaw/issues/200224) — 退休的 `agents.defaults.heartbeat` 导致 beta 升级二选一失败。
- [#200781](https://github.com/openclaw/openclaw/issues/200781) — Control UI Sessions 侧栏只渲染 agent 标题、无会话行。
- [#168743](https://github.com/openclaw/openclaw/issues/168743) — macOS Control UI 每 12–16 秒重连，4008 关闭无重试上限。

### 今日关闭的稳定性问题

[#185578](https://github.com/openclaw/openclaw/issues/185578)（P1 堆内存棘轮）、[#199155](https://github.com/openclaw/openclaw/issues/199155)（P1 transcript UNIQUE 冲突）、[#163139](https://github.com/openclaw/openclaw/issues/163139)（Windows plugins.reload EPERM）、[#158817](https://github.com/openclaw/openclaw/issues/158817)（Windows shim 多行截断）已关闭，对 Windows 与会话状态稳定性是实质利好。

**结论**：高优 Bug 的 fix PR 覆盖率偏低，尤其是 P0 三条均无关联修复；今日关闭的 P1 更多集中在内存与会话一致性，尚未覆盖更新链路。

---

## 6. 功能请求与路线图信号

| 需求 | Issue/PR | 纳入下一版本的可能性 | 判断依据 |
|---|---|---|---|
| Agent 运行级 turn/token 预算、工具循环检测默认开启 | [#178373](https://github.com/openclaw/openclaw/issues/178373) + [#203364](https://github.com/openclaw/openclaw/pull/203364) | **较高** | 已有 Goal 预算 PR 在审，方向一致 |
| 上下文压力感知的续跑（continue_work / continue_delegate / request_compaction） | [#129388](https://github.com/openclaw/openclaw/pull/129388) | 中 | XL PR 自 2026-08-25 长期开启，仍 `needs proof`，设计与安全边界复杂 |
| Provider 登录入口在插件设置中可见 | [#203379](https://github.com/openclaw/openclaw/pull/203379) | **较高** | 小型 UX PR，今日新开，风险低 |
| Workboard 完成后同卡片请求修改 | [#202961](https://github.com/openclaw/openclaw/pull/202961) | 中高 | 插件级功能，范围可控 |
| `sessions_send` 唤醒启动的网关准入/限流 | [#194376](https://github.com/openclaw/openclaw/pull/194376) | 中 | 安全与稳定性收益明确，但涉及面广 |
| GitHub 集成迁移为插件 | [#192350](https://github.com/openclaw/openclaw/pull/192350) | 中长期 | 依赖 SDK 基础 PR，架构性改造 |
| Memory FTS 增加 CJK bigram 分词 | [#170997](https://github.com/openclaw/openclaw/issues/170997) | 中 | 中文 2 字查询当前 trigram 命中为 0，需求真实，但未见 PR |
| MCP OAuth 支持预注册客户端 | [#116052](https://github.com/openclaw/openclaw/issues/116052) | 中长期 | 企业场景明确，涉及安全评审 |
| 多个 policy alias 解析到同一模型 | [#140213](https://github.com/openclaw/openclaw/issues/140213) | 中 | 已有 maintainer decision packet |
| Cron 增加 `--until` / `--max-runs` / 累计运行计数 | [#130247](https://github.com/openclaw/openclaw/issues/130247) | 中低 | 长期未动，P3 |
| Telegram `sendDice` | [#137110](https://github.com/openclaw/openclaw/issues/137110) | 低 | 垂直渠道能力，P3 |

**路线图信号**：下一版本更可能聚焦 **Agent 预算/Goal 计费、Provider 登录 UX、Workboard 协作、更新链路修复**；上下文续跑与 GitHub 插件化属于架构级投入，短期落地概率较低。

---

## 7. 用户反馈摘要

**真实痛点**

1. **更新/升级是最集中的不满来源**。用户反复描述“候选验证失败”“Doctor 阻止激活”“回滚被拒”“包已换但状态未迁移”。典型表述包括 `state-migrated-no-rollback`、`changed=[]`、`Baseline package scan failed`。受影响环境覆盖 npm 全局安装、Windows Scheduled Task、macOS 开发工具缺失。
2. **内存与启动性能回退明显**。有用户给出精确对比：2026.9.4 峰值 706 MB → 2026.9.9/10.1 峰值 1,815–1,938 MB；另一用户报告基线 RSS 从约 300 MB 升至 1.89 GB，并引发 SQLite 事务超时和消息崩溃。
3. **Prompt cache 失效带来直接成本压力**。用户测量“每次请求 cache read 从 N 掉到 0”，以及 Skill Workshop 评审单晚丢弃约 1,670 万 tokens；系统 prompt 分段增删导致后缀摘要变化，也被诊断为“history rewrite”。
4. **跨平台行为不一致**。macOS 上 `gateway stop` 因进程祖先无法检查而失败；Windows 上更新卡死、计划任务被禁用、shim 截断多行参数。
5. **会话与消息完整性**。Codex helper 完成后父会话无法恢复、Matrix consumer 关闭后房间永久失败、跨进程 transcript 写入触发 UNIQUE 冲突、多机器人群聊重复回声。
6. **Control UI 细节磨损体验**。Sessions 侧栏只显示 agent 标题、已完成回复缺少 Reply/Copy、会话恢复时的内部上下文注入直接展示给用户、快捷键冲突不可配置。

**满意/积极信号**

- 用户愿意提供详细环境、版本号、复现步骤和量化数据（内存、tokens、重连次数），说明核心用户群技术投入度高。
- 部分长期问题今日关闭（堆内存、transcript 冲突、Windows 插件重载、shim 截断），对社区信心有正向作用。
- 新 PR 持续覆盖具体场景（FaceTime 中断、纯文本模型图片生成、WhatsApp 慢网上传、Meme Maker PNG 导出），显示维护者仍在响应长尾需求。

---

## 8. 待处理积压

以下 Issue/PR 长期未获决定性推进，建议维护者排期关注。带 `stale` 标签者可能被机器人自动关闭，但其中含安全、数据丢失、崩溃循环标签的条目不应仅因 stale 清理。

| 条目 | 类型 | 创建时间 | 积压时长 | 风险/备注 |
|---|---|---:|---:|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | P0 Bug | 2026-09-29 | 约 54 天 | 最高优先；85 条评论、无 fix PR、`needs-maintainer-review` |
| [#136405](https://github.com/openclaw/openclaw/issues/136405) | P2 Bug | 2026-09-02 | 约 81 天 | `memory_search` 远程 embedding 卡住 15s，无 per-call timeout/retry |
| [#136271](https://github.com/openclaw/openclaw/issues/136271) | Feature | 2026-09-02 | 约 81 天 | msteams 动态解析 SharePoint site，影响频道文件上传 |
| [#124306](https://github.com/openclaw/openclaw/issues/124306) | P2 Bug/安全 | 2026-08-15 | 约 99 天 | exec 审批卡不提示目标是 mount point，`impact:data-loss` |
| [#130247](https://github.com/openclaw/openclaw/issues/130247) | P3 Feature | 2026-08-26 | 约 88 天 | Cron 无结束条件、无累计运行计数 |
| [#113159](https://github.com/openclaw/openclaw/issues/113159) | P2 Bug | 2026-07-23 | 约 122 天 | 使用限额冷却忽略真实重置时间，除 OpenAI/Codex 外均回退 30s–5min |
| [#116052](https://github.com/openclaw/openclaw/issues/116052) | Feature/安全 | 2026-07-29 | 约 116 天 | MCP OAuth 预注册客户端，企业接入阻塞 |
| [#101188](https://github.com/openclaw/openclaw/issues/101188) | P3 Bug | 2026-07-06 | 约 139 天 | Google Vertex 更名为 Google Enterprise AI，UI/文案未更新 |
| [#129388](https://github.com/openclaw/openclaw/pull/129388) | XL PR | 2026-08-25 | 约 89 天 | 上下文压力续跑，`needs proof`，安全/会话状态/兼容性多风险 |
| [#192350](https://github.com/openclaw/openclaw/pull/192350) | XL PR | 2026-11-03 | 约 19 天 | GitHub 集成插件化，依赖 SDK 基础 PR |
| [#199688](https://github.com/openclaw/openclaw/pull/199688) | XL PR | 2026-11-15 | 约 7 天 | Composer 中高亮 skill 引用，范围较大 |

**维护建议**

1. 为 [#160959](https://github.com/openclaw/openclaw/issues/160959) 指定负责人并给出阶段性结论（复现/规避/修复计划），避免 P0 长期无 fix PR。
2. 将 2026.11.x 更新链路问题（[#197083](https://github.com/openclaw/openclaw/issues/197083)、[#200606](https://github.com/openclaw/openclaw/issues/200606)、[#200756](https://github.com/openclaw/openclaw/issues/200756)、[#169844](https://github.com/openclaw/openclaw/issues/169844)）合并为发布阻断清单，统一验证回滚与迁移语义。
3. 对带 `impact:data-loss`、`impact:security`、`impact:crash-loop` 的 stale Issue 设置豁免，避免自动清理掩盖真实风险。
4. 299 条待合并 PR 中优先处理 P0/P1 与 `proof: sufficient` 的小型修复，提升评审吞吐。

---

**数据说明**：PR 评论区在样本中未返回评论数，故第 3、4 节以可见状态与标签分析为主；Issue 关闭数包含 stale 清理，不等同于全部修复。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析
**数据窗口：2026-11-22（过去 24 小时）｜覆盖 7 个可量化项目 + 1 个讨论型项目**

---

## 1. 生态全景

个人 AI 助手赛道已从“功能竞赛”进入“工程化深耕”阶段：头部项目的日 PR 更新量达 500 条量级（OpenClaw、hermes-agent），而中小项目普遍卡在评审带宽与发布工程上。**当前生态的核心矛盾不再是“能不能做”，而是“升级能不能不坏、成本能不能控住、插件能不能不互相拖死”**——今日 7 个项目中 6 个将更新/迁移链路或资源隔离列为主要风险（OpenClaw 的 Doctor/WAL、hermes-agent 的 staged venv、DeepSeek Harness 的 rc 依赖偏移）。第二个共性信号是**成本治理从“可见”走向“可执行”**：Zeroclaw 的子 agent 绕过上限、hermes-agent 的单卡 244 次计费重生、OpenClaw 的 prompt cache 归零，都指向同一件事——预算语义必须在架构层闭环，而非交给提示词。整体判断：**生态活跃度处于高位，但交付质量与评审吞吐已成为区分项目梯队的关键变量**。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新（新开/活跃｜关闭） | PR 更新（待合并｜合并/关闭） | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 411（294｜117） | 500（**299**｜201） | 0 | 🟢 吞吐极强／🔴 3 条 P0 无 fix PR，更新链路成发布阻断 |
| **hermes-agent** | 255（**236**｜19） | 500（**278**｜222） | 0 | 🟢 修复产能充足／🔴 Issue 净增 217，2 条 P1 无 PR |
| **Zeroclaw** | 18（12｜6） | 50（43｜7） | 0 | 🟢 S1 清零、S2 净减／🟡 43 条待合并，多条 XL 滞留 |
| **AstrBot** | 7（6｜1） | 34（31｜3） | 0 | 🟢 供给型活跃／🟠 75% PR 来自单一贡献者，3 条新 Bug 无 fix |
| **QwenPaw** | 4（2｜2） | 10（**10**｜0） | 0 | 🟠 输入活跃、输出停滞：**全日零合并**，最老 PR 65 天 |
| **PicoClaw** | 2（1｜1） | 5（1｜4 全 stale） | 0 | 🔴 低活跃、清理驱动，关闭≠修复 |
| **DeepSeek Harness** | 153 Discussions（无 Issues/PR） | — | 0 | 🟠 讨论密集、交付空窗，Top15 **0 关闭** |
| **全生态合计** | **697** | **1099（待合并 662）** | **0** | — |

**关键读数**：
- **待合并 PR 662 条中，OpenClaw（299）+ hermes-agent（278）合计占 87%**，说明头部两个项目的评审带宽已成生态级瓶颈。
- **Today Release = 0（7/7 项目）**，全生态处于“提交远大于发布”的窗口期，下一轮集中发布的风险敞口正在累积。
- **闭环能力差异显著**：hermes-agent 的 OSC 7501 需求（👍5）从提出到关闭最干净；QwenPaw 则是“报告即被修”（#8849/#8846 均在 1 天内出 PR）但卡在合并；PicoClaw 出现“Issue 关闭但无 fix PR”的可疑闭环。

---

## 3. OpenClaw 在生态中的定位

**规模：处于第一梯队，且是唯一被其他项目当作“参照系”的项目。** 单日 411 Issue + 500 PR 更新，是 Zeroclaw 的 8–10 倍、AstrBot 的 15 倍以上；在待合并 PR 总量中占 45%。

**优势**
1. **覆盖面最广**：唯一同时覆盖 Gateway 进程模型、Doctor 迁移体系、WAL 状态校验、Control UI、多平台（macOS/Windows/Linux）、Goal 预算、Codex helper、Matrix/WhatsApp/Telegram 的项目。
2. **修复密度最高**：今日关闭 P1 堆内存棘轮（#185578）、transcript UNIQUE 冲突（#199155）、Windows plugins.reload EPERM（#163139）三项实质问题，说明维护者具备“深入根因”的能力。
3. **生态引力**：其插件采集、harness 选择、Provider 登录等设计正在成为同类项目的事实参考。

**劣势（相对同类更突出）**
1. **发布工程是最大短板**。#197083（WAL 校验半完成 + `state-migrated-no-rollback`）、#200606（Doctor 阻止候选更新）、#169844（Windows 卡在 4/7 Activating）三条 P0 全部**无 fix PR**，而 Zeroclaw 同级问题当日清零、AstrBot 有完整根因定位。
2. **P0 响应速度不及中量级项目**。#160959（插件采集阻塞事件循环）持续 54 天、85 条评论、`needs-maintainer-review`，对比 Zeroclaw 对 #9946（S1 无界等待）的当日修复，形成鲜明反差。
3. **复杂度反噬体验**：内存从 ~300 MB 升至 1.89 GB、prompt cache 每次归零，这类“架构红利变架构债”的问题在中小项目尚未出现。

**技术路线差异**：OpenClaw 走“**进程级 Gateway + 强状态机（Doctor/WAL/迁移）+ 插件生态**”路线，把可靠性押注在启动期校验与迁移语义上；hermes-agent 则走“**单进程统一网关收敛所有入口**”，代价是长尾状态一致性问题（#146643 全量重读历史）；AstrBot/Zeroclaw 走“**适配器/插件分层 + 独立运行时**”，把风险隔离在插件边界内。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求（原文依据） |
|---|---|---|
| **成本/预算语义闭环** | OpenClaw、Zeroclaw、hermes-agent、AstrBot | OpenClaw：Goal 预算计入已结算 token（#203364）、prompt cache 复用（#182891）；Zeroclaw：`warn` 静默放行（#12628）、`route_down` 配置存在但无效果（#12626）、子 agent 绕过每跳上限（#12627）；hermes：单卡配额墙后重生 **244 次并全额计费**（#158748）、改用 provider 真实 token（#104462）；AstrBot：按完整用户轮次计截断（#11316） |
| **升级/迁移可靠性** | 全部 7 个 | OpenClaw：WAL 校验失败不可回滚（#197083）；hermes：staged venv 重建静默丢失插件依赖（#134469）；DeepSeek HS：rc.3→rc.5 升级后依赖仍钉在 rc.3（#13376/#13730）；AstrBot：v4.26.0 引入 MP3 转码回归（#10927）；Zeroclaw：`release:v0.9.1` 收尾；PicoClaw：Provider PR 长期 stale |
| **插件资源隔离 / 事件循环不阻塞** | OpenClaw、Zeroclaw、AstrBot、QwenPaw | OpenClaw：插件采集阻塞事件循环数分钟（#160959）；Zeroclaw：wasmtime 默认 10,000 memories 未限制（#12145）；AstrBot：SDK runtime worker 隔离（#11317）；QwenPaw：import map 双实例化致插件路由永不注册（#8851） |
| **作用域化凭据 / 工具执行审批** | Zeroclaw、hermes-agent、AstrBot、OpenClaw | Zeroclaw：agent 可执行任务但不向模型暴露底层凭据（#12422 RFC → #12596）；hermes：审批层阻断 `sed/perl -i` 原地改写（#45755）；AstrBot：工具运行前审批 + 会话级权限模式（#11283，7 PR 堆栈）；OpenClaw：exec 审批不提示 mount point（#124306，99 天未闭环） |
| **子代理 / 长任务不阻塞对话** | QwenPaw、Zeroclaw、OpenClaw、hermes-agent | QwenPaw：`notice_after_complete` 后台任务完成回调（#6475）；Zeroclaw：`spawn_subagent` 成本约束（#12627）；OpenClaw：上下文压力续跑 continue_work（#129388，89 天）；hermes：可配置 spawn 外部 CLI worker（#70547，121 天 needs-decision） |
| **多渠道行为一致性** | Zeroclaw、AstrBot、hermes-agent、OpenClaw | Zeroclaw：Telegram/Matrix 编辑消息、IRC/Twitch 插件化（#12443）；AstrBot：KOOK 流式回复（#11314）、aiocqhttp 空私聊挤掉真实消息（#11313）；hermes：飞书真实 @ 提及（#124952）；OpenClaw：Matrix “consumer is closed”（#191476） |
| **数据主权与可删除性** | DeepSeek Harness、QwenPaw、hermes-agent、OpenClaw | DeepSeek HS：`workspace.archiveSession` 全链路**无删除路径**（#4441，89 天）；QwenPaw：压缩失败建议 `/clear` 但未告知清空历史（#8848）；hermes：20s 超时污染会话存储并摧毁 turn（#147839）；OpenClaw：跨进程 transcript UNIQUE 冲突（已关闭） |
| **静默失败的可观测性** | AstrBot、hermes-agent、PicoClaw、OpenClaw | AstrBot：插件入口 handler 一行日志都没有（#11313）；hermes：插件依赖消失是静默的（#134469）；PicoClaw：`registry archive is not a valid skill` 不回显冲突技能名（#3462）；OpenClaw：用户抱怨“错误信息不足” |

**横向结论**：**“成本、升级、隔离”构成新一代 Agent 基础设施的三根支柱**。三者共同点在于——都要求架构层提供可验证的语义（预算执行点、回滚边界、资源上限），仅靠提示词或文档说明已经不够。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 通用个人助手 + 全渠道 + 插件生态 | 技术型个人用户、插件开发者 | 独立 Gateway 进程 + Doctor/WAL 强状态机 + 迁移体系；可靠性押注在“启动期校验” |
| **hermes-agent** | 统一网关 + Kanban 调度 + Desktop/编辑器/cron 全收敛 | 重度开发者、多项目并行者 | 单进程收敛 CLI/TUI/Desktop/API/机器人/cron/Kanban/Group Chat；独特子系统是 Kanban 调度器（重派、配额、breaker） |
| **Zeroclaw** | 安全与成本治理 + 频道插件化 | 注重隔离的企业/自托管用户 | Rust + wasmtime 插件沙箱 + 注册表插件（IRC/Twitch 移出二进制）；OIDC scope、凭据作用域 RFC 驱动 |
| **AstrBot** | IM/聊天机器人优先，多平台适配器 | QQ/KOOK/微信等社群运营者 | 适配器层 + astrbot-sdk 插件运行时（worker 隔离 + 类型化配置 + 拓扑调度）；流式能力向各平台下沉 |
| **QwenPaw** | AgentScope 生态 + Console/插件 + Skills | AgentScope 生态内深度用户 | Console import map + 插件路由注册；Skills 包对齐 Anthropic 上游；反代 base-path 部署 |
| **PicoClaw** | 轻量、硬件/嵌入式背景 | 低资源设备用户 | 极简内核 + 自定义 endpoint 接第三方网关；缺少 Provider 注册规范，同类 PR 反复涌入 |
| **DeepSeek Harness** | 桌面 Harness/IDE 形态 + 本地模型 | 桌面重度用户、离线推理场景 | Release-only 交付（无 Issues/PR，Discussions 驱动）；rc 通道 + bundle/profile 依赖体系；插件二次分发 |

**定位判断**：
- **平台型 vs 工具型**：OpenClaw、hermes-agent 是“平台型”（自身定义协议与入口）；AstrBot、PicoClaw 是“接入型”（价值取决于对接的 IM/协议端生态），因此 **NapCat 停服（AstrBot）能直接演变为项目风险**，而 OpenClaw 不受单一上游生死影响。
- **单进程 vs 多进程**：hermes 的单进程收敛带来运维简洁，但把状态一致性风险集中化（#146643、#141973、#152603 三条同源）；OpenClaw 的多进程边界清晰，代价是迁移与回滚语义复杂化。
- **明确的能力护城河**：hermes 的 Kanban 调度、Zeroclaw 的 wasm 隔离 + 凭据作用域、AstrBot 的平台矩阵，都是短期难以被复制的能力，比“再做一个通用 Agent”更有区分度。

---

## 6. 社区热度与成熟度分层

**第一层：超大规模 · 质量巩固期（Issue/PR 日均 500 量级）**
- **OpenClaw**：吞吐领先但 P0 积压 54 天，处于“能力已足够、可靠性待补课”阶段。成熟度特征：有明确的发布阻断概念、有分片迁移 PR、有 P0/P1 分级，但缺少 P0 owner 机制。
- **hermes-agent**：架构收敛已完成（网关合并），当前处于“合并后遗症清理期”。成熟度特征：修复 PR 与 Issue 强绑定（#158743 对应 #75444）、有 breaker/配额策略抽象，但 Issue 关闭率仅 7.5%（19/255），积压结构性问题。

**第二层：中量级 · 快速迭代期**
- **Zeroclaw**：唯一做到“S1 当日清零 + S2 净减”的项目，且 v0.9.1 收尾中。43 条待合并 + 8 条 XL 滞留是唯一明显短板，但主线（安全 + 成本）清晰，属于**生态中工程纪律最好的中量级项目**。
- **AstrBot**：典型的“供给型活跃”，代码产出大于问题反馈。但 **75% PR 来自单一贡献者**是结构性风险，且 3 条新 Bug 全部“根因已定位、无 fix PR”，说明诊断能力强于修复分配。

**第三层：小型 · 评审瓶颈期**
- **QwenPaw**：输入极健康（首次贡献者 + Issue→PR 当日闭环），输出为零（10 PR 全 OPEN，最老 65 天）。属于**“贡献者体验好于维护者带宽”的典型失衡**。

**第四层：低活跃 · 清理驱动期**
- **PicoClaw**：5 条 PR 更新中 4 条带 `[stale]`，两条超长周期 PR（7 个月、8 个月）以 stale 关闭。#3462（技能安装阻断）CLOSED 但无 fix PR，反映**闭环质量不足**。

**特殊形态：发布驱动型**
- **DeepSeek Harness**：唯一 Discussions-only 项目，153 条更新但 Top15 全 OPEN、0 关闭，说明**缺少收敛机制**。其风险全部集中在 rc 通道质量（#13376、#13730 同根因：升级不同步 profile 依赖），一旦修复版本落地，健康度可快速反转。

---

## 7. 值得关注的趋势信号

**① “升级即坏”已成为用户信任的第一杀手，而非功能缺失**
7 个项目中 6 个的主要风险指向升级链路，且症状高度一致：**包换了但状态/依赖没换**（OpenClaw WAL 半完成、hermes staged venv 丢依赖、DeepSeek rc 依赖偏移、AstrBot 版本回归）。**对开发者的启示**：迁移工具（`migrate --backends --apply/--restore/--status` 式的三态设计）与“升级后一致性自检”应作为发布门禁的强制项，而非事后补丁。

**② 成本从“可见”走向“可执行”，预算语义需要在架构层闭环**
今日最能说明问题的三个数据点：hermes 单卡 **244 次计费重生**、Zeroclaw `route_down` 配置存在但无实现、OpenClaw prompt cache 每次归零。用户的诉求已经从“给我看花了多少钱”升级为“**配置了就必须生效，且子 agent 不能绕过**”。任何把预算交给 LLM 自觉遵守的设计，都会在规模化后被证伪。

**③ 安全重心从“外围审批”转向“作用域凭据 + 资源上限”**
Zeroclaw 的 #12422（agent 可执行任务但不向模型暴露凭据）与 AstrBot 的 #11283（审批 + 会话级权限模式）指向同一范式：**不要问“要不要批准”，而是让 agent 手上根本没有那把钥匙**。配合 wasm 内存上限（#12145）、worker 进程隔离（#11317），安全正在从“策略层”下沉到“运行时层”。

**④ 插件沙箱化的分水岭：事件循环不能被插件阻塞**
OpenClaw #160959 是一个警示案例——插件采集导致 Gateway 阻塞数分钟、持续 54 天。同类项目已经在用 wasmtime 内存限制、worker 进程隔离、import map 修正来结构性避免这一问题。**结论：插件能力越强，越需要把“插件不阻塞主循环”作为一等约束写入架构。**

**⑤ 长任务异步化是 Agent 体验的下一个战场**
QwenPaw #6475（`notice_after_complete`）、Zeroclaw #12627（子 agent 委派）、hermes #70547（可配置外部 CLI worker）共同指向：**用户不接受“Agent 干活时不能对话”**。这要求的是“后台任务 + 完成回调 + 会话续跑”的完整交互模型，而非单一 API。OpenClaw 的 #129388（上下文压力续跑）已开 89 天仍 `needs proof`，说明会话状态机的复杂度是主要障碍。

**⑥ 数据主权进入合规视野，但实现路径仍缺共识**
DeepSeek Harness #4441（`archiveSession` 只追加 id，全链路无删除路径，89 天未闭环）是最尖锐的样本；QwenPaw #8848（`/clear` 未提示清空历史）、hermes #147839（超时污染存储）是同一主题的不同侧面。**当个人 AI 助手开始承载工作记忆时，“可删除、可解释、可恢复”会从 nice-to-have 变成采购门槛。**

**⑦ 静默失败比报错更伤信任，可观测性成为可靠性前提**
AstrBot #11313（消息被挤掉，插件侧一行日志都没有）、hermes #134469（插件依赖消失是静默的）、PicoClaw #3462（报错不回显冲突技能名）——三个项目、三种场景、同一个结论：**用户能容忍失败，但不能容忍“不知道为什么失败”**。建议把“关键路径失配必须有结构化日志/错误上下文”纳入代码评审清单。

**⑧ 讨论型仓库需要明确收敛机制**
DeepSeek Harness 的 Discussions 模式降低了提交门槛（153 条/日），但也导致 Top15 全 OPEN、0 关闭。**高讨论量 ≠ 高成熟度**——建议对其 Discussion 设置“转 Issue / 进 Roadmap / 明确不采纳”的三态收口，否则社区热度会退化为噪音。

---

**给技术决策者的一句话总结**：当前生态的竞争焦点已从“谁的 Agent 更聪明”转向“**谁的升级不坏、成本不失控、插件不互相拖死**”。OpenClaw 与 hermes-agent 拥有规模与修复产能，但发布工程与 P0 响应是其估值折价项；Zeroclaw 与 AstrBot 在安全/成本治理的架构选择上更超前，值得作为设计参考；QwenPaw 与 PicoClaw 的短板则提醒——**贡献者体验与闭环质量，才是小型项目能否穿越周期的决定因素**。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目日报 · 2026-11-22

> 数据窗口：2026-11-21 至 2026-11-22（过去 24 小时）
> 数据来源：GitHub Issues / Pull Requests 更新

---

## 1. 今日速览

过去 24 小时项目维持高位活跃：**18 条 Issue 更新**（新开/活跃 12、关闭 6）、**50 条 PR 更新**（待合并 43、合并/关闭 7），无新版本发布。关闭的 6 条 Issue 中包含 **1 条 S1 级浏览器工具挂起缺陷**（#9946）与 **2 条 S2 级插件/Windows 平台缺陷**（#12145、#12484），技术债继续得到清理。开发侧 43 条待合并 PR 显示功能推进强劲，但审查队列偏长，需关注积压。多条 Issue/PR 带 `release:v0.9.1` 标签，v0.9.1 准备进入尾声。今日新报问题集中在 Web Dashboard 的 UX 细节与**成本治理语义缺口**（warn/route_down/子 agent 绕过上限），未出现新的 S1 缺陷。

---

## 2. 版本发布

今日无新版本发布。`release:v0.9.1` 相关条目持续更新（#12400 已关闭、#12497 待合并、#12608 已合并），版本窗口临近。

---

## 3. 项目进展

### 今日合并/关闭的关键 PR

| PR | 状态 | 说明 |
|---|---|---|
| [#12608](https://github.com/zeroclaw-labs/zeroclaw/pull/12608) | ✅ 已关闭 | docs(runtime)：为 Okta 和 Entra ID 的 token 兼容性提议 ADR-016 例外，属于 `release:v0.9.1` 文档工作 |

> 注：概览显示 7 条 PR 合并/关闭，但展示列表中仅 #12608 明确标记 CLOSED，其余 6 条未在样本中呈现，无法逐条确认。

### 今日关闭的 Issue（已完成工作）

- **[#9946](https://github.com/zeroclaw-labs/zeroclaw/issues/9946)**（S1）——`browser` 工具对 `agent-browser` 子进程的两处无界等待，补齐 deadline 与 `kill_on_drop`，与 #8560 同属一类缺陷。
- **[#12145](https://github.com/zeroclaw-labs/zeroclaw/issues/12145)**（S2）——插件 store 限制器未限制 wasmtime 默认的 10,000 memories / 10,000 tables，可被绕过内存预算。
- **[#12484](https://github.com/zeroclaw-labs/zeroclaw/issues/12484)**（S2）——Windows 上删除目录已不存在的插件失败。
- **[#12400](https://github.com/zeroclaw-labs/zeroclaw/issues/12400)**——Windows 平台 reply-end 写截止时间 dashboard 测试，标记 `release:v0.9.1`。
- **[#9896](https://github.com/zeroclaw-labs/zeroclaw/issues/9896)**——v0.8.4 在有效后端为 sqlite 时错误显示 `Memory: none`。
- **[#10987](https://github.com/zeroclaw-labs/zeroclaw/issues/10987)**——WhatsApp Web 投票计票以 `[choice]` 入站消息 surface，与 Signal 对齐。

### 正在推进的功能方向（待合并 PR）

- **频道能力**：Telegram 编辑消息处理（[#12371](https://github.com/zeroclaw-labs/zeroclaw/pull/12371)）、Matrix 编辑消息（[#12426](https://github.com/zeroclaw-labs/zeroclaw/pull/12426)）、外部 peer 显式路由（[#12271](https://github.com/zeroclaw-labs/zeroclaw/pull/12271)）、Matrix 拒收通知（[#12442](https://github.com/zeroclaw-labs/zeroclaw/pull/12442)）。
- **认证与安全**：OIDC 可配置 OAuth scopes（[#12497](https://github.com/zeroclaw-labs/zeroclaw/pull/12497)）、浏览器用户名/密码与 TOTP 独立授权（[#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596)，依赖 RFC #12422）。
- **成本治理**：操作员覆盖超限成本（[#11589](https://github.com/zeroclaw-labs/zeroclaw/pull/11589)）、Cost Overview 条形图按配置 limits 绘制（[#12637](https://github.com/zeroclaw-labs/zeroclaw/pull/12637)）。
- **CLI/插件**：Codex 订阅用量展示（[#12641](https://github.com/zeroclaw-labs/zeroclaw/pull/12641)）、host-mediated agent wake dispatch（[#12440](https://github.com/zeroclaw-labs/zeroclaw/pull/12440)）。
- **破坏性重构**：IRC/Twitch 从二进制移出到注册表插件（[#12443](https://github.com/zeroclaw-labs/zeroclaw/pull/12443)，`breaking-change`）。

**整体推进评估**：一日内净清除 1 个 S1、2 个 S2 与 3 个中低优先级缺陷，严重缺陷存量下降；功能侧以 `size:L/XL` 的频道与安全改造为主，尚未合入主干，但方向集中、路线图清晰。

---

## 4. 社区热点

> 注：PR 评论数在数据中显示为 `undefined`，无法按评论数排序；以下按 Issue 评论热度与内容重要性综合判断。

| 条目 | 评论 | 状态 | 链接 |
|---|---|---|---|
| #12422 RFC：作用域化 operator-managed service credentials | 6 | OPEN | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) |
| #10987 WhatsApp Web 投票计票 → `[choice]` 消息 | 5 | CLOSED | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10987) |
| #9946 agent-browser 无界等待 | 4 | CLOSED | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9946) |
| #9896 Memory 状态误报 | 2 | CLOSED | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9896) |
| #12613 Deslop 清理 tracker | 1 | OPEN | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/12613) |

**诉求分析**：
- **#12422** 是今日讨论焦点，核心诉求是"让 agent 能对服务执行任务，但不向模型、聊天、技能文本或生成内容暴露底层凭据"。该 RFC 已直接派生出 [#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596)（浏览器凭据独立授权），说明讨论正在向可落地设计收敛。
- **#10987** 与 **#9946** 的关闭体现出"跨频道一致性"（Signal 已有 → WhatsApp 对齐）与"工具可靠性"两类社区关切正在被回应。

---

## 5. Bug 与稳定性

### S1 — 工作流阻塞
| Issue | 状态 | 说明 | Fix PR |
|---|---|---|---|
| [#9946](https://github.com/zeroclaw-labs/zeroclaw/issues/9946) | ✅ 已关闭 | `browser` 工具对 CLI 子进程两处无界等待，无 wall-clock deadline 与 `kill_on_drop`，CLI 卡死可无限阻塞 agent turn | 已修复 |

### S2 — 行为降级
| Issue | 状态 | 说明 | Fix PR |
|---|---|---|---|
| [#12145](https://github.com/zeroclaw-labs/zeroclaw/issues/12145) | ✅ 已关闭 | 插件 store 未限 wasmtime 默认 10,000 memories/tables，内存预算可被放大数千倍 | 已修复 |
| [#12484](https://github.com/zeroclaw-labs/zeroclaw/issues/12484) | ✅ 已关闭 | Windows 上删除目录已不存在的插件失败（`rename_new` 丢失 `NotFound`） | 已修复 |
| [#12633](https://github.com/zeroclaw-labs/zeroclaw/issues/12633) | 🔴 OPEN | 未刷新的语音设置界面把整条旧记录发回，把设备切回浏览器服务识别 | 未见 |
| [#12632](https://github.com/zeroclaw-labs/zeroclaw/issues/12632) | 🔴 OPEN | 听写结束后打字的文本可能被语音自动发送 | 未见 |
| [#12627](https://github.com/zeroclaw-labs/zeroclaw/issues/12627) | 🔴 OPEN | bounded delegation 中 `spawn_subagent` 子 agent 不受 delegate 每跳成本上限约束 | 未见 |
| [#12619](https://github.com/zeroclaw-labs/zeroclaw/issues/12619) | 🔴 OPEN | gateway 会话状态写入失败后 `running` 卡住直到重启，Stop 无法清除 | 未见 |

### S3 — 次要问题
| Issue | 状态 | 说明 | Fix PR |
|---|---|---|---|
| [#12638](https://github.com/zeroclaw-labs/zeroclaw/issues/12638) | 🔴 OPEN | 花费为 0 的 agent 显示 "<$0.01" 而非 "$0.00" | [#12639](https://github.com/zeroclaw-labs/zeroclaw/pull/12639) |
| [#12630](https://github.com/zeroclaw-labs/zeroclaw/issues/12630) | 🔴 OPEN | Dashboard Overview Channels 卡片固定 `max-h-48`，约只显示四个频道 | 未见 |
| [#9896](https://github.com/zeroclaw-labs/zeroclaw/issues/9896) | ✅ 已关闭 | sqlite 后端下 status/startup banner 显示 `Memory: none` | 已修复 |
| [#12400](https://github.com/zeroclaw-labs/zeroclaw/issues/12400) | ✅ 已关闭 | Windows 平台 reply-end 写截止时间测试 | 已修复 |

**稳定性评价**：严重缺陷（S1）清零、S2 存量下降，新增缺陷集中在 dashboard 语音与成本语义，尚未出现新的高影响回归。dashboard 与跨平台（Windows）是当前稳定性薄弱点。

---

## 6. 功能请求与路线图信号

| 功能请求 | 类型 | 关联 PR/信号 | 入版判断 |
|---|---|---|---|
| [#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) 作用域化服务凭据 | 安全 RFC | [#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596) 已跟进 | 设计已落地，v0.10 候选 |
| [#12628](https://github.com/zeroclaw-labs/zeroclaw/issues/12628) warn 模式越限告知会话 | 成本可观测 | 与 [#11589](https://github.com/zeroclaw-labs/zeroclaw/pull/11589) 同域 | 与 #11589 协同 |
| [#12626](https://github.com/zeroclaw-labs/zeroclaw/issues/12626) `route_down` 模式生效 | 成本治理 | 配置已存在但未实现 | 需修正文档或实现，v0.9.x 候选 |
| [#12625](https://github.com/zeroclaw-labs/zeroclaw/issues/12625) shell/script 工具不经过 shell 运行 | 安全增强 | 暂无 PR | 中期待评估 |
| [#12621](https://github.com/zeroclaw-labs/zeroclaw/issues/12621) 退役 Raspberry Pi 部署脚本 | 清理 | 暂无 PR | 清理批次 |
| [#12613](https://github.com/zeroclaw-labs/zeroclaw/issues/12613) Deslop pass tracker | 技术债 | 未拆分 PR | 持续 |
| [#12497](https://github.com/zeroclaw-labs/zeroclaw/pull/12497) OIDC 可配置 scopes | 安全/认证 | 已开 PR，`release:v0.9.1` | **高概率 v0.9.1** |
| [#12443](https://github.com/zeroclaw-labs/zeroclaw/pull/12443) IRC/Twitch 插件化 | 破坏性重构 | 已开 PR，`breaking-change` | v0.10 候选 |

**路线图信号**：安全（最小权限、OIDC scope、插件资源隔离）与成本治理（enforcement 模式语义闭环）构成两条并行主线；频道插件化（#12443/#12440）指向更长期的可扩展架构。

---

## 7. 用户反馈摘要

- **成本治理的一致性与可解释性是最强诉求**：零花费显示 "<$0.01"（#12638）、Cost Overview 条形图缩放错误（#12637）、`warn` 模式静默放行（#12628）、`route_down` 配置存在但无效果（#12626）、子 agent 绕过每跳上限（#12627）——用户反复遇到"配置存在但行为不符预期"，对可预测性要求高。
- **安全隔离是核心使用场景**：操作员希望"授权 agent 对服务执行任务，但不向模型/聊天/技能暴露底层凭据"（#12422），并关注插件资源预算可验证（#12145）；这不是理论需求，而已有跟进 PR（#12596）。
- **Dashboard 使用密度上升，细节缺陷随之暴露**：语音设置刷新与自动发送（#12633、#12632）、布局高度（#12630）、会话状态卡死（#12619）——说明 dashboard 已进入日常高频使用阶段。
- **Windows 平台可靠性被持续点名**：#12484、#12400 连续被修复，跨平台 CI 覆盖仍在补齐。
- **维护者侧技术债意识增强**：@JordanTheJet 连续提交 Deslop tracker（#12613）与 Pi 脚本退役（#12621），反映"删代码"与"删资产"被纳入路线图。

**今日最活跃贡献者**：@JordanTheJet（约 8 条 Issue）、@vadelma-agent（3 条 Issue + 多条 PR）、@GaijinSystems（2 条 Issue + 3 条 PR）、@RO-mix（4 条 PR）、@tidux（多条 OIDC/插件 PR）。

---

## 8. 待处理积压

> 43 条待合并 PR 中，以下条目时长较长或风险较高，建议维护者优先分流。

| 条目 | 创建 | 滞留 | 标签 | 备注 |
|---|---|---|---|---|
| [#11589](https://github.com/zeroclaw-labs/zeroclaw/pull/11589) | 2026-10-07 | **46 天** | `risk:high` `size:XL` `needs-author-action` | 成本超限操作员覆盖，与今日多条成本 issue 强相关，优先级应上调 |
| [#11931](https://github.com/zeroclaw-labs/zeroclaw/pull/11931) | 2026-10-21 | 32 天 | `risk:medium` | webhook 长超时，体量适中，适合尽快推进 |
| [#12198](https://github.com/zeroclaw-labs/zeroclaw/pull/12198) | 2026-11-02 | 20 天 | `size:L` `needs-author-action` | transcription 默认回退 |
| [#12271](https://github.com/zeroclaw-labs/zeroclaw/pull/12271) | 2026-11-06 | 16 天 | `size:XL` | 外部 peer 显式路由，与 #12116 叠放 |
| [#12371](https://github.com/zeroclaw-labs/zeroclaw/pull/12371) | 2026-11-10 | 12 天 | `size:L` | Telegram edited_message |
| [#12443](https://github.com/zeroclaw-labs/zeroclaw/pull/12443) | 2026-11-14 | 8 天 | `breaking-change` `risk:high` `size:XL` | IRC/Twitch 移出二进制，需明确迁移说明 |
| [#12440](https://github.com/zeroclaw-labs/zeroclaw/pull/12440) | 2026-11-14 | 8 天 | `risk:high` `size:XL` | 插件 wake dispatch |
| [#12426](https://github.com/zeroclaw-labs/zeroclaw/pull/12426) | 2026-11-14 | 8 天 | `needs-author-action` | Matrix 编辑消息 |
| [#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) | 2026-11-14 | 8 天 | RFC | 需给出 RFC 结论时间表，避免 #12596 长期挂起 |

**积压风险提示**：`needs-author-action` 标记出现在 #11589、#12198、#12426 三条，且其中两条为 `size:XL` 或 `size:L`，建议本周内定向催办，防止与 v0.9.1 分支产生大范围冲突。43 条待合并 PR 处于较高水位，若持续累积将拖慢 v0.9.1 收尾。

---

### 项目健康度小结

| 维度 | 评价 |
|---|---|
| 开发活跃度 | 🟢 高（PR 50 条/日更新） |
| 缺陷收敛 | 🟢 良好（S1 清零、S2 净减） |
| 审查吞吐 | 🟡 待改善（43 条待合并，多条 XL 滞留） |
| 安全与治理 | 🟢 主线清晰（凭证隔离、OIDC、插件资源限制） |
| 跨平台稳定性 | 🟡 Windows 缺陷反复出现，需补强 CI |
| 版本节奏 | 🟢 v0.9.1 收尾中，标记集中 |

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 · 2026-11-22

---

## 1. 今日速览

今日 PicoClaw 处于低活跃、偏清理状态：过去 24 小时无新版本发布，Issues 更新 2 条、PR 更新 5 条，核心动作是批量关闭 stale（长期未响应）条目。项目主线未出现新功能落地，4 条关闭的 PR 中多数为供应商接入类与旧 PR 的清理，而非明确的合并推进。值得注意的是，今日所有更新条目均带有 `[stale]` 标记，反映维护者响应存在明显积压。社区侧唯一持续有热度的是 LLMTR 供应商接入诉求（#3470 / #3471）。整体活跃度评估：**低（清理驱动）**，项目健康度的主要风险在维护者响应时效。

---

## 2. 版本发布

今日无新版本发布，暂无迁移与破坏性变更需要关注。

---

## 3. 项目进展

今日共有 5 条 PR 更新，其中 1 条待处理、4 条关闭。需强调：4 条关闭 PR **均携带 `[stale]` 标记**，从时间跨度看更可能属于 stale 机制触发的清理关闭，而非正常合并入主线。

| PR | 状态 | 内容 | 创建→更新 |
|---|---|---|---|
| [#3464](https://github.com/sipeed/picoclaw/pull/3464) | 已关闭 | 新增 CloudGPU 作为内置 OpenAI 兼容 Provider（`provider: cloudgpu`） | 2026-11-07 → 11-21 |
| [#3431](https://github.com/sipeed/picoclaw/pull/3431) | 已关闭 | 新增 Standard Compute 作为 OpenAI 兼容 Provider（`standardcompute`），作者为该服务方员工 | 2026-10-15 → 11-21 |
| [#2379](https://github.com/sipeed/picoclaw/pull/2379) | 已关闭 | Telegram codex orchestrator 功能分支（描述字段未填写完整） | 2026-04-06 → 11-21 |
| [#1559](https://github.com/sipeed/picoclaw/pull/1559) | 已关闭 | 合并修复 PR #1327 / #1319 / #1318 / #1313 的汇总补丁 | 2026-03-14 → 11-21 |

**推进评估**：从数据看，今日项目“向前迈进”的实质增量有限。三条 Provider 类 PR 的关闭意味着这些第三方网关接入路径暂时未能进入主线；两条超长周期 PR（#2379 长达 7 个月、#1559 长达 8 个月）以 stale 关闭收尾，说明历史积压清理在推进，但也暗示部分社区贡献被放弃。建议维护者在关闭时对贡献者留有明确说明，避免影响后续贡献意愿。

---

## 4. 社区热点

今日两条活跃条目评论数均为 2，👍 均为 0，整体讨论强度不高，但**诉求高度集中**：

- **[Issue #3470](https://github.com/sipeed/picoclaw/issues/3470)** · `[Feature]` 将 LLMTR 作为 OpenAI 兼容 Provider 内置到模型目录。作者 @knowhycodata 明确表示“已能通过自定义 endpoint 使用，但希望官方内置以降低配置门槛”。
- **[Issue #3462](https://github.com/sipeed/picoclaw/issues/3462)** · skills 安装失败问题，作者 @nelsonrochaa-creator 提交了可复现的描述（见下节）。

**诉求分析**：
1. **“内置 Provider”已成为社区主要诉求形态**。今日 5 条 PR 中有 3 条属于同一模式（CloudGPU / Standard Compute / LLMTR），说明大量 OpenAI 兼容网关服务方希望进入 PicoClaw 官方模型目录以获取分发渠道。这既是生态机会，也意味着维护者需要一个**低成本的 Provider 注册机制**（如插件式或清单式目录），否则同类 PR 会持续涌入并再次堆积为 stale。
2. **个人 AI 助手的能力边界（技能/skills）** 是用户实际使用的核心，其安装可靠性问题直接阻断使用，属高优先级。

---

## 5. Bug 与稳定性

**严重程度：高（阻断技能安装）**

- **[Issue #3462](https://github.com/sipeed/picoclaw/issues/3462)** — `picoclaw skills install` 以及 Agent 内置的 `install_skill` 工具在如下场景失败：
  - 报错：`failed to install "<slug>": registry archive is not a valid skill`
  - 触发条件：**已安装的另一个 skill 在 `SKILL.md` frontmatter 中使用了相同的 `name`**
  - 即使两个技能在功能上完全不同也会触发，说明问题根因更可能是**按 frontmatter `name` 而非唯一 slug 去重/索引**导致的命名空间冲突与校验失败。
  - 现状：Issue 已 **CLOSED**，但数据中**未检索到关联的 fix PR**（今日 4 条关闭 PR 均与 skills 安装逻辑无关），建议维护者确认是否已有对应修复提交或在后续版本中回归验证，避免“关闭但未修”的情况。
  - 影响面：`install_skill` 是 Agent 运行时自主扩展能力的关键路径，若技能仓库中存在同名技能，会直接导致 Agent 技能扩展失败。

暂未发现崩溃、性能回归类问题上报。

---

## 6. 功能请求与路线图信号

| 诉求 | 来源 | 已有 PR | 入版可能性评估 |
|---|---|---|---|
| LLMTR 作为内置 OpenAI 兼容 Provider | [#3470](https://github.com/sipeed/picoclaw/issues/3470) | [#3471](https://github.com/sipeed/picoclaw/pull/3471)（OPEN，含 catalog 默认 base `https://llmtr.com/v1`、不预置模型列表，由用户在 `model_list` 中显式 pin） | **中**。实现方式克制（不预置模型、不覆盖其他 provider 配置），符合最小侵入原则，但因同样带 `[stale]` 标记，需维护者主动介入评审 |
| 第三方 OpenAI 兼容网关批量内置 | #3464 CloudGPU、#3431 Standard Compute | 均已关闭 | **低（逐个接入路径受阻）**。更可行的路线是提供标准化 Provider 清单/插件机制 |
| Skills 安装的去重与命名空间隔离 | [#3462](https://github.com/sipeed/picoclaw/issues/3462) | 未见 | **高优先级需求**，建议纳入下一版本稳定性修复 |

**路线图信号**：社区与生态的重心正在从“功能特性”转向 **“接入层扩展性 + 技能生态可靠性”**。若项目希望在个人 AI 助手赛道保持竞争力，Provider 注册的开放化与 Skills 命名空间的健壮性应优先于新增单点功能。

---

## 7. 用户反馈摘要

从今日 Issue 正文与评论线索提炼：

- **不满意 / 痛点**
  1. **“配置可行但不符合期望”**：用户能够通过自定义 OpenAI 兼容 endpoint 接入第三方网关，但认为“内置命名 Provider”才是完整体验，说明当前自定义配置流程存在认知或操作成本。
  2. **错误信息的可诊断性不足**：`registry archive is not a valid skill` 这一报错未包含冲突技能名、冲突字段等上下文，用户需自行排查才能定位到“frontmatter name 重名”的真实原因，建议错误信息中直接回显冲突双方。
  3. **贡献者体验**：多条 PR 在数周至数月后以 stale 方式关闭，且 #2379 的 PR 模板段落未填写完整（可能为提交者遗漏，也可能是缺少引导），反映贡献流程的反馈闭环较弱。

- **使用场景**
  - 通过单一 API Key 聚合多家模型实验室的网关型服务（LLMTR、CloudGPU、Standard Compute）是当前主流接入形态，用户倾向于“一把 Key 打多个模型”。
  - Agent 侧通过 `install_skill` 自主安装/扩展技能，属于高频运行时路径。

- **满意点**：数据中未出现明确的正向反馈条目；用户普遍认可现有自定义 endpoint 机制“可用”，但期望官方收敛为开箱即用。

---

## 8. 待处理积压

以下为**今日更新但仍在开放状态**的条目，均带 `[stale]` 标记，建议优先处理：

| 条目 | 类型 | 已滞留 | 建议动作 |
|---|---|---|---|
| [#3471](https://github.com/sipeed/picoclaw/pull/3471) | PR（LLMTR Provider，对应 #3470） | 创建 2026-11-14，已 8 天 | 与 #3470 联动评审，明确 Provider 接入规范后合并或给出拒绝理由 |
| [#3470](https://github.com/sipeed/picoclaw/issues/3470) | Feature Issue | 创建 2026-11-14，已 8 天 | 与 #3471 合并讨论，避免 Issue/PR 双线并行 |

**长期积压观察（提醒）**：今日关闭的 #2379（2026-04 创建）与 #1559（2026-03 创建）分别滞留约 7 个月和 8 个月后才被清理，说明项目存在**结构性响应延迟**。建议维护者评估：

1. 是否引入更明确的 stale 周期与关闭前通知机制（如“再 7 天无响应将关闭”），减少贡献者的挫败感；
2. 是否设立 **Provider 接入专项标签与批量处理窗口**，将同类 PR 集中评审，降低逐个处理成本；
3. 对 #3462 这类“技能安装阻断”问题，建立**关闭即验证**流程，确保 CLOSED ≠ 未修复。

---

*数据来源：PicoClaw GitHub 仓库（github.com/sipeed/picoclaw）2026-11-21 至 2026-11-22 更新。本报告中“合并/关闭”未作区分，因数据源未提供细粒度状态；相关判断基于 `[stale]` 标记与时间跨度推断，建议维护者以仓库实际合并记录为准。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目日报 · 2026-11-22

> 数据窗口：2026-11-21（过去 24 小时）｜数据源：GitHub Issues / PRs / Releases

---

## 1. 今日速览

- **今天没有合并或发布**：10 个待处理 PR 全部处于 OPEN 状态，合并、关闭和新版本都是 0。这是本次报告最重要的信号：评审侧的处理速度偏低，积压继续加深。
- **社区提交很活跃**：今天新开了 4 个 PR（#8846、#8847、#8849、#8850），其中 2 个来自首次贡献者（first-time-contributor），新开的 Issue 有 2 个（#8851、#8848）。
- **社区对 Issue 的响应很快**：#8840（LICENSE 拼写错误）和 #8843（/envs 文档误导）都在报告后 1 天内分别对应出现了修复 PR #8849、#8846，体现出社区与维护者之间的正向互动。
- **2 个长期功能请求被关闭**：#6475（异步完成通知工具）、#7583（AgentScope 社区联动），但今天没有对应的合并 PR，关闭原因需要维护者补充说明。
- **健康度评估**：贡献者活跃度 🟢 良好；Issue 响应速度 🟢 良好；评审吞吐与版本节奏 🔴 需要关注。

---

## 2. 版本发布

无新版本发布，本节省略。

---

## 3. 项目进展

**今日合并/关闭的 PR：0 条。**

严格来说，今天项目主干没有向前合入任何代码。以下为“接近落地”的在途工作，按对项目价值的贡献度排序：

| PR | 类型 | 价值贡献 | 当前状态 |
|---|---|---|---|
| [#8770](https://github.com/agentscope-ai/QwenPaw/pull/8770) | fix(runtime) | 在后台启动完成前拒绝 chat 请求，修复半初始化工作区导致运行挂起、无日志无超时的问题（关联 #8746） | OPEN，已更新，size/XL |
| [#8303](https://github.com/agentscope-ai/QwenPaw/pull/8303) | fix(approvals) | 将审批请求投递到发起它的 chat 渠道，修复微信端收不到审批提示、5 分钟后静默超时的问题（关联 #6695/#6819） | OPEN，Under Review，size/M |
| [#8719](https://github.com/agentscope-ai/QwenPaw/pull/8719) | feat(console) | 支持 `QWENPAW_BASE_PATH`，让 Console/API 运行在反向代理子路径下（Fixes #8714） | OPEN，Under Review，size/XL |
| [#8588](https://github.com/agentscope-ai/QwenPaw/pull/8588) | fix(memory) | OpenViking 后续清理、HintBlock 预算适配、关闭边界修复 | OPEN，Under Review，size/XXL |
| [#8479](https://github.com/agentscope-ai/QwenPaw/pull/8479) | feat(skills) | DOCX/PPTX/XLSX 技能对齐 Anthropic 2026-07 更新 | OPEN，Under Review，size/XXXL |

**观察**：以上 5 个 PR 中，有 3 个已进入 `Under Review`，但其中最早的一个（#8303）已经停留 34 天。可以说，今天“向前推进”的工作是社区侧的输入（新增 4 个 PR），产品侧的推进几乎停滞。

---

## 4. 社区热点

按评论数排序：

| 排名 | 条目 | 评论 | 状态 | 讨论焦点 |
|---|---|---|---|---|
| 1 | [#6475](https://github.com/agentscope-ai/QwenPaw/issues/6475) `notice_after_complete` 异步完成通知工具 | 3 | CLOSED | Agent 长时间任务期间如何保持会话可用 |
| 2 | [#7583](https://github.com/agentscope-ai/QwenPaw/issues/7583) AgentScope 社区联动（登录/信箱/快速反馈） | 3 | CLOSED | 本地工具与社区闭环 |
| 3 | [#8840](https://github.com/agentscope-ai/QwenPaw/issues/8840) LICENSE 多余 “the” | 2 | OPEN | 许可证文本一致性 |
| 4 | [#8843](https://github.com/agentscope-ai/QwenPaw/issues/8843) /envs 文档缺失语义 | 2 | OPEN | 文档误导导致破坏性操作 |

**诉求分析**：

- **#6475 是最有产品价值的一条**。用户 @One-sixth 提出的并非简单 API，而是一整套“后台任务 + 完成回调 + 会话继续”的异步交互模型。它直接触及当前 Agent 系统的核心体验短板——长任务阻塞对话。该 Issue 已被关闭，但今天没有任何合并 PR，**建议维护者公开关闭理由**（是纳入路线图、还是设计上不采纳），否则容易打击深度用户的贡献意愿。
- **#7583 反映的是生态闭环诉求**：用户希望 QwenPaw 不只作为本地工具存在，而是接入 AgentScope 社区，并利用 Agent 能力自动结构化 Bug 报告。属于中期路线图议题。
- **#8843 是“文档即契约”的典型案例**：文档把 `/envs` 写成一行的 `GET/PUT/DELETE`，导致 QA 引导 Agent 建议用户直接执行 PUT，从而**清空所有其他环境变量**。这已不只是文档问题，而是“AI 助手基于不完整文档给出破坏性建议”的可靠性问题，值得提高到 P1 处理。

---

## 5. Bug 与稳定性

按影响面与严重程度排序：

### 🔴 严重（可能造成数据丢失 / 功能不可用）

**[#8843](https://github.com/agentscope-ai/QwenPaw/issues/8843) — 配置文档误导，PUT /envs 会删除其他全部环境变量**
- 报告人：@swf1996120｜OPEN｜2 条评论
- 根因：`website/public/docs/config.en.md:825` 把路由简写为 `GET/PUT/DELETE /envs`，实际路由还支持 PATCH（合并）、DELETE 有 reset 语义，PUT 为全量替换。
- **已有 fix PR：[#8846](https://github.com/agentscope-ai/QwenPaw/pull/8846)（docs: document envs merge, replace and reset semantics）**
- 建议：除文档外，考虑对 `PUT /envs` 在缺少完整键集时返回告警，或在 QA agent 的 system prompt 中加入“环境变量操作需二次确认”。

**[#8851](https://github.com/agentscope-ai/QwenPaw/issues/8851) — Console import map 将入口 chunk 重写为 `?v=…`，bundle 加载两次，插件路由永不注册**
- 报告人：@hxx0611｜OPEN｜1 条评论
- 现象：前端插件报 `PawApp <id> did not register its app route`；根因是 `console/index.html` 中的 import map（`id="qwenpaw-default-edit-unlock"`）把入口 chunk URL 改写为带 hash 的 `?v=`，与 modulepreload 加载的 URL 不一致，导致同一 bundle 实例化两次。
- **目前无 fix PR**。该问题会直接阻断所有前端插件的注册，属于插件生态的**阻断性（blocker）缺陷**，建议优先处理。

### 🟡 中等（体验/可靠性）

**[#8848](https://github.com/agentscope-ai/QwenPaw/issues/8848) — 压缩失败提示建议 `/clear`，易误导用户清空上下文**
- 报告人：@One-sixth｜OPEN（question 类）｜1 条评论
- 位置：`src/qwenpaw/agents/command_handler.py` 约 476–479 行，`_process_compact` 失败分支返回 `Use /clear to reset the context if needed`。
- 用户观点：AgentScope 官方对压缩失败的处理是**丢弃上下文**，但直接建议 `/clear` 会让用户在不知情的情况下丢失全部上下文，措辞应明确“会清空会话历史”。
- **目前无 fix PR**，属于文案/交互改进，改动成本低。

### 🟢 轻微（合规/一致性）

**[#8840](https://github.com/agentscope-ai/QwenPaw/issues/8840) — LICENSE 中 Contribution 定义多出一个 “the”**
- 报告人：@lieoyan｜OPEN｜2 条评论
- **已有 fix PR：[#8849](https://github.com/agentscope-ai/QwenPaw/pull/8849)**（首次贡献者，size/XS），与 Apache License 2.0 官方文本对齐。
- 对代码无影响，但对项目法律合规严谨性有意义，建议快速合并。

**另有 1 条文档类缺陷**：[#8850](https://github.com/agentscope-ai/QwenPaw/pull/8850) 修复 terraform-skill 中 404 的 AWS Security Best Practices 外链（已有 PR）。

---

## 6. 功能请求与路线图信号

今日**未新增**功能请求 Issue；2 条历史功能请求在今日被关闭：

| Issue | 诉求 | 关闭伴随 PR | 判断 |
|---|---|---|---|
| [#6475](https://github.com/agentscope-ai/QwenPaw/issues/6475) `notice_after_complete` 工具 | Agent 发起长任务后可先回复用户、完成时主动推送通知 | 无 | **可能纳入路线图但尚未实现**，需维护者确认；若采纳，建议先出 RFC |
| [#7583](https://github.com/agentscope-ai/QwenPaw/issues/7583) AgentScope 社区联动 | 登录、信箱、快速反馈、Agent 辅助生成结构化 Bug 报告 | 无 | 涉及账号体系与隐私边界，短期独立落地的可能性低 |

**从在途 PR 反推下一版本可能的落点**（信号强度由高到低）：

1. **插件生态可靠性**：#8851 是插件路由的阻断性缺陷，配合 #8719（base-path 部署），说明团队正在为“插件 + 反代部署”做基础设施准备。
2. **启动期稳定性**：#8770（启动完成前拒绝 chat）是典型的“上线前必须修复”的问题，落地概率高。
3. **渠道体验一致性**：#8303（审批提示回源渠道）解决微信端静默超时，属于多渠道体验对齐。
4. **技能包生态**：#8479 将 Office 三件套技能对齐 Anthropic 上游更新，是“跟随上游”的维护型投入。

---

## 7. 用户反馈摘要

**活跃用户画像**：@One-sixth 是今天最有代表性的深度用户，一人贡献了 2 条被关闭的功能请求 + 1 条新提问，且都指向真实使用中的摩擦点。

**真实痛点**：

1. **长任务阻塞对话**（#6475）——“用 shell 起个后台进程，Agent 就没法跟用户聊别的了”。这是对 Agent 并发/异步能力的结构性诉求，而非单点功能。
2. **AI 助手基于残缺文档给出危险建议**（#8843）——“QA/guidance agent 建议我 PUT，结果把所有环境变量都删了”。这说明 **文档质量已经直接影响 Agent 行为的正确性**，是一个值得系统化治理的议题。
3. **提示语与后果不匹配**（#8848）——“压缩失败让用户 /clear，用户根本不知道这会清空历史”。属于“系统主动制造的坑”。
4. **生态孤岛感**（#7583）——希望在 QwenPaw 内看到 AgentScope 社区讨论与反馈入口。

**满意信号**：
- 用户愿意花时间写出结构化 Issue（含文件路径、行号、根因分析、方案推演），说明社区对项目有归属感。
- 首次贡献者今天集中出现（#8849、#8846），且都直接响应 1 天内的新 Issue，说明新人上手路径通畅。

**不满意信号**：
- 10 个 PR 零合并，最早的在途 PR 已 65 天（#7828，2026-09-17 至今），容易让贡献者产生“投入无回报”的挫败感。

---

## 8. 待处理积压

按“停留时长 × 重要性”排序，以下条目建议维护者本周内明确表态（合并 / 需要修改 / 关闭）：

| 条目 | 停留天数 | 标签 | 风险 |
|---|---|---|---|
| [#7828](https://github.com/agentscope-ai/QwenPaw/pull/7828) Dev my fix | **65 天** | first-time-contributor, size/XXXL | ⚠️ 描述为空模板（未填写 Description），体量 XXXL，**最需要 review 引导**，也最容易被长期忽略 |
| [#8303](https://github.com/agentscope-ai/QwenPaw/pull/8303) fix(approvals) 投递审批到源渠道 | 34 天 | Under Review, size/M | 已有根因分析（#6695/#6819），size/M 属于易合范围，长期停留不寻常 |
| [#8479](https://github.com/agentscope-ai/QwenPaw/pull/8479) sync Office skills | 24 天 | first-time-contributor, Under Review, size/XXXL | 首次贡献者 + XXXL，需指定 reviewer 分批推进 |
| [#8588](https://github.com/agentscope-ai/QwenPaw/pull/8588) OpenViking 后续清理 | 16 天 | Under Review, size/XXL | 承接 #7613 的 follow-up，属于“已承诺事项” |
| [#8719](https://github.com/agentscope-ai/QwenPaw/pull/8719) base-path 部署 | 8 天 | Under Review, size/XL | 关联 #8714 的正式修复 |
| [#7583](https://github.com/agentscope-ai/QwenPaw/issues/7583) 社区联动 | — | CLOSED | **建议补充关闭理由**，避免深度用户误解 |

**给维护者的两条具体建议**：

1. **建立“1 天新 Issue → 1 周内 PR 有首次响应”的 SLA**。今天的 #8849、#8846 证明了“报告即被修”的闭环是可行的，把这种速度制度化，能显著提升贡献者留存。
2. **对 #7828 这类空模板 + XXXL 的首次贡献 PR 主动降级引导**：拆分为多个小 PR，或由维护者代为拆分，否则它大概率会变成永久积压。

---

*报告生成时间：2026-11-22｜数据统计窗口：2026-11-21 00:00 – 24:00（UTC）*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：2026-11-22** ｜ 数据窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时项目保持高强度运转：**255 条 Issue 更新**（新开/活跃 236、关闭 19）、**500 条 PR 更新**（待合并 278、已合并/关闭 222），但**无新版本发布**。当前主线仍是统一网关（#106742）合并后的长尾稳定工作——该主题占据了评论榜第 1、第 3 位，并与入口切换（#145171）、迁移工具链（#157430）形成一条完整的工作流。第二大问题簇是 **Kanban 调度子系统**：无限重派、配额墙重复计费、崩溃误判等一组相互关联的可靠性缺陷，今日已有多条针对性 fix PR 提交但尚未合入。需要警惕的是，**Issue 关闭数（19）显著低于新开/活跃数（236）**，而 PR 侧吞吐强劲（222 条关闭/合并），说明修复供给主要流向 PR 通道，Issue 侧积压正在累积；同时**两个 P1 缺陷（#147839、#134469）今日仍无对应 fix PR**。整体健康度评估：**活跃度极高、修复产能充足，但稳定性与积压管理承压**。

---

## 2. 版本发布

无新版本发布。据 Issue/PR 文本推断，当前主线版本为 **v0.23.x**（#156899 提及 v0.23.2，PR #158747 标题指向 v0.23.3），v0.23.3 的兼容性修复已在 PR 队列中，预计为下一个补丁版本的主要内容。

---

## 3. 项目进展

今日已合并/关闭的 PR 共 222 条，以下为其中可识别的重要项：

| PR | 状态 | 推进内容 |
|---|---|---|
| [#157430](https://github.com/NousResearch/hermes-agent/pull/157430) | ✅ CLOSED | serve→gateway 迁移第 6/9 部分：`migrate --backends --apply/--restore/--status`，含回滚、per-home 运行锁与更新标记。这是统一网关落地的关键一环 |
| [#149976](https://github.com/NousResearch/hermes-agent/pull/149976) | ✅ CLOSED | `hermes --tui` 支持 OSC 7501 程序状态协议，修复 #138147，使 Herdr 等终端工作区管理器能识别 Hermes 会话状态 |
| [#45755](https://github.com/NousResearch/hermes-agent/pull/45755) | ✅ CLOSED | 安全加固：审批层阻断对 `.yaml/.yml` 的 `sed/perl -i` 原地改写，堵住绕过结构化 `write_approval` 的旁路 |

**推进评估**：今日进展集中在“网关迁移收尾”与“终端集成体验”两条线上，方向明确且与既有路线图（#145171 入口切换）一致。但 222 条关闭/合并中绝大多数为小型修复，**尚未看到统一网关核心性能问题（#146643）或两个 P1 的修复进入合并**，主线风险未实质性下降。

---

## 4. 社区热点

### 🔥 讨论最活跃 Issues

1. **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547) — 统一网关合并后遗留问题追踪（85 评论，👍1）**
   项目当前最热的线程，持续近一个月仍在更新。10 月 14 日 #106742 将 CLI、TUI、Desktop、API Server、编辑器、消息机器人、cron、Kanban、Group Chat 全部收敛到单一网关进程后，暴露出跨组件的架构级问题。**诉求**：社区需要一个官方的“已知问题 + 修复进度”单一事实来源，避免同类问题被重复报告。

2. **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859) — 通过 API 无法创建 PR（69 评论，P3，blocked/cause-upstream）**
   仅影响特定账号的 `CreatePullRequest` 权限问题，已被标记为上游阻塞。讨论热度高但项目侧无法推进，属于“外部依赖型”热点。

3. **[#146643](https://github.com/NousResearch/hermes-agent/issues/146643) — 网关每次变更重读全部会话历史（22 评论，P2/perf）**
   数千会话规模下占用 1.5–2.5 个 CPU 核，Desktop 的 `session.resume`/`prompt.submit` 在 30s 后超时。**诉求**：会话存储需要增量索引或缓存层，这是统一网关架构下的结构性性能债。

4. **[#155595](https://github.com/NousResearch/hermes-agent/issues/155595) — Profile 创建与生命周期追踪（17 评论）**
   集中管理 profile 供给、凭据、模型继承、clone 安全、Honcho 抽取等剩余工作，是继网关之后的第二大架构campaign。

### 🔥 反应最多的 Issue

- **[#138147](https://github.com/NousResearch/hermes-agent/issues/138147) — OSC 7501 支持（已关闭，👍5，全场最高）**：用户希望在多标签/多窗格场景下直接看到会话“运行中/等待输入/完成/失败”状态。该需求已由 #149976 实现并关闭，是本周期**需求→实现→关闭**闭环最干净的案例。

> 数据说明：PR 侧评论数字段返回 `undefined`，无法按评论量排序，故本节以 Issue 为主。

---

## 5. Bug 与稳定性

### 🔴 P1（2 项，均无 fix PR）

- **[#147839](https://github.com/NousResearch/hermes-agent/issues/147839) — 单次 20s `worker_receipt_timeout` 污染会话存储并摧毁整个 turn**
  用户只看到 `⚠️ No reply: Hermes couldn't save…`。单一安装已复现 11 次且呈聚集分布。**影响**：数据写入路径的原子性缺失，属最高优先级。**fix PR：无**。
- **[#134469](https://github.com/NousResearch/hermes-agent/issues/134469) — `hermes update` 重建 staged venv 时丢失插件依赖**
  原生 provider 插件（如 mnemosyne）工具仍注册但 Python 依赖消失，失败是**静默的**。自 Python 3.14 staged venv 迁移后引入。**fix PR：无**。

### 🟠 P2（重点，按影响面排序）

| Issue | 问题 | fix PR |
|---|---|---|
| [#146643](https://github.com/NousResearch/hermes-agent/issues/146643) | 网关全量重读会话历史，CPU 随存储线性增长 | 无 |
| [#99943](https://github.com/NousResearch/hermes-agent/issues/99943) | 压缩器窗口被 `ollama_num_ctx` 钳制，云端 1M 窗口静默降为 65,536 | 无 |
| [#75444](https://github.com/NousResearch/hermes-agent/issues/75444) | Kanban 自动分解器重派已升级 triage 任务，形成无限阻塞弹跳 | 部分：[#158743](https://github.com/NousResearch/hermes-agent/pull/158743) |
| [#141973](https://github.com/NousResearch/hermes-agent/issues/141973) | 回合中发送消息不可靠：被排队而非转向、显示“已发送”但未达、Steer 按钮静默失效 | 无 |
| [#156709](https://github.com/NousResearch/hermes-agent/issues/156709) | `FooteredReply` 破坏 `copy.deepcopy`，开启 runtime_footer 即崩溃 | 无 |
| [#144413](https://github.com/NousResearch/hermes-agent/issues/144413) | 工具结果含孤立代理项时结算抛 `UnicodeEncodeError`，会话卡在 `paused` 不可恢复 | 无 |
| [#148958](https://github.com/NousResearch/hermes-agent/issues/148958) | 网关 owner 停滞被计为 crash，连续两次即封卡 | 无 |
| [#147873](https://github.com/NousResearch/hermes-agent/issues/147873) | 同一 PID 同时记录为 mapped 与 stopped_unmapped， owed-restart 告警永不清除（macOS） | 无 |
| [#156899](https://github.com/NousResearch/hermes-agent/issues/156899) | 并发首次查找 provider 插件导致 “Unknown provider” 直至重启 | 无 |
| [#152603](https://github.com/NousResearch/hermes-agent/issues/152603) | 中断/被取代的 turn 留下 `active=0` 且 `display_order` 回退，近期对话从转录中消失 | 无 |
| [#150617](https://github.com/NousResearch/hermes-agent/issues/150617) | 完成通知忽略 `completion_output_chars`，Bot Mode DM 回复为空 | 无 |
| [#151348](https://github.com/NousResearch/hermes-agent/issues/151348) | Windows 切换会话阻塞 Electron 主进程约 2s/次（git 调用走 python shim） | 无 |
| [#146035](https://github.com/NousResearch/hermes-agent/issues/146035) | bot-relay 邮箱根路径歧义，跨机器 agent DM 停滞 | 无 |
| [#154275](https://github.com/NousResearch/hermes-agent/issues/154275) | patchelf 补丁在 0.15.2 上失败（nixpkgs-unstable 当前版本） | 无 |
| [#156311](https://github.com/NousResearch/hermes-agent/issues/156311) | 密封 Docker 镜像每次 CLI 调用都告警 `install out of sync (pnpm)` | 无 |
| [#148414](https://github.com/NousResearch/hermes-agent/issues/148414) | Webapp UI scale ≠ 100% 时菜单溢出视口 | 无 |
| [#84102](https://github.com/NousResearch/hermes-agent/issues/84102) | 本地 TTS 向 `.ogg` 写入 Vorbis 而非 Opus，平台语音气泡静默降级 | 无 |

### 🟡 P3

- [#129973](https://github.com/NousResearch/hermes-agent/issues/129973) — `python3 -I -c` 启动器破坏 Herdr 类终端 agent 识别（macOS）。
- [#99251](https://github.com/NousResearch/hermes-agent/issues/99251) — Kanban 评审调度强制注入 `sdlc-review`，与 `skills.disabled` 冲突。
- [#62418](https://github.com/NousResearch/hermes-agent/issues/62418) — `active_pr` 重生守卫阻止合法返工。

### ✅ 今日新增的 fix PR（待合并，值得关注）

- [#158748](https://github.com/NousResearch/hermes-agent/pull/158748) — 限制 Kanban 限流重生循环，**防止配额墙下无限计费**（单卡已观测 244 次计费重生，成本风险最高）。
- [#158743](https://github.com/NousResearch/hermes-agent/pull/158743) — 让 breaker 升级的 triage 卡避开自动清扫（对应 #75444）。
- [#158166](https://github.com/NousResearch/hermes-agent/pull/158166) — 无解析模型的卡片在 spawn 前拒绝，避免烧掉 worker 与重试。
- [#158747](https://github.com/NousResearch/hermes-agent/pull/158747) — 让 v0.23.3 旧进程在懒加载新代码树时继续工作（hot-update 版本错配）。
- [#158739](https://github.com/NousResearch/hermes-agent/pull/158739) — 智能审批支持 list 形 content block。
- [#82451](https://github.com/NousResearch/hermes-agent/pull/82451) — 修复 legacy `SessionDB` 下压缩变 no-op。
- [#142424](https://github.com/NousResearch/hermes-agent/pull/142424) / [#158088](https://github.com/NousResearch/hermes-agent/pull/158088) — Desktop 归档会话 RPC 路由与搜索结果 profile 透传。
- [#141732](https://github.com/NousResearch/hermes-agent/pull/141732) — 恢复的 worker 路由不被外部完成事件覆盖。

---

## 6. 功能请求与路线图信号

| 需求 | 信号强度 | 判断 |
|---|---|---|
| **[#70547](https://github.com/NousResearch/hermes-agent/issues/70547) Kanban 调度器可配置 spawn（支持 Claude Code / Codex CLI 等外部 worker）** | P2、`needs-decision`、👍2、开放 4 个月 | 高价值但需产品决策，短期难落地 |
| **[#104462](https://github.com/NousResearch/hermes-agent/issues/104462) 所有压缩/溢出决策改用 provider 真实 token 用量** | P2、refactor、与 #99943 同源 | 与压缩器钳制 bug 强相关，**很可能被合并进同一轮修复** |
| **[#158289](https://github.com/NousResearch/hermes-agent/pull/158289) Hermes 自主安排日程（航班/习惯/欠回复），每个任务先出确认卡片** | 新 PR、`ci-reviewed` | 产品级新能力，若通过评审将显著扩展 Agent 主动性边界 |
| **[#145171](https://github.com/NousResearch/hermes-agent/issues/145171) 入口统一切换到网关会话权威** | P3/security、追踪 #134889 | 已由 #157430 等 PR 分片推进，是下一阶段主线 |
| **[#76863](https://github.com/NousResearch/hermes-agent/pull/76863) Desktop 巴西葡萄牙语（pt-BR）完整本地化** | 2,003 keys 100% 对齐、开放近 4 个月 | 质量高但长期未被合入，i18n 策略待明确 |
| **[#124952](https://github.com/NousResearch/hermes-agent/pull/124952) 飞书通过 `bot_mention_map` 发送真实 @ 提及** | P3、平台集成 | 小众但完整，取决于平台维护者带宽 |
| **[#92118](https://github.com/NousResearch/hermes-agent/pull/92118) 记忆预取的结构化观察侧通道** | P3、provider-neutral | 架构扩展性好，适合与 memory 重构一并评审 |

**路线图判断**：下一版本（v0.23.3）大概率聚焦 **hot-update 兼容性 + Kanban 计费/重派防护 + 压缩器 token 统计**三条线；统一网关入口切换与自主日程属于 v0.24 量级。

---

## 7. 用户反馈摘要

**核心痛点**

1. **统一网关的“合并后遗症”是当前最大不满来源**。用户描述的典型场景是：数千会话的日常使用下，Desktop 频繁出现 `Hermes gateway connection closed` / `Session unavailable`，且 CPU 占用与存储规模成正比（#146643）。用户并不反对架构收敛，但抱怨**缺少容量边界说明与迁移指引**（#143547）。

2. **Kanban 的可靠性直接关联真金白银**。#158748 披露单张卡在配额墙后重生 **244 次并全额计费**；#148958 中 worker 因网关 owner 停滞被当作 crash 而封卡；#75444 的无限阻塞弹跳让卡片永远出不来。用户诉求很明确：**成本可控 + 状态可解释**。

3. **更新/安装链路脆弱**。#134469（插件依赖静默丢失）、#147873（owed-restart 告警永不清除）、#156311（Docker 每次告警 pnpm）、#154275（nix patchelf 失败）四类问题叠加，让“升级”成为高风险操作。

4. **Desktop 打磨不足**：#148414 菜单溢出、#151348 Windows 切换卡顿 2s、#152603 对话顺序错乱且近期内容消失。这类问题不致命但**直接损害日常信任感**。

5. **多 profile / 多 provider 场景的边界问题**：#156899 并发插件查找竞态、#155595 profile 生命周期、#123184 macOS Keychain 截断导致 Claude Code 登出。

**满意信号**

- OSC 7501 需求（#138147）从提出到关闭获得全场最高 👍5，说明**终端工作流集成**是用户真正在意且能被快速满足的方向。
- 社区愿意提交高质量 PR（pt-BR 全量翻译、飞书真实提及、结构化记忆预取），显示核心用户群参与度高。

---

## 8. 待处理积压（提请维护者关注）

### 长期未闭环的高价值 Issue

| Issue | 创建 | 天数 | 备注 |
|---|---|---|---|
| [#62418](https://github.com/NousResearch/hermes-agent/issues/62418) Kanban `active_pr` 守卫阻止合法返工 | 2026-07-11 | ~134 天 | P3，有 👍1，与今日 Kanban 修复潮同源，宜一并处理 |
| [#70547](https://github.com/NousResearch/hermes-agent/issues/70547) 可配置 spawn 外部 CLI worker | 2026-07-24 | ~121 天 | `needs-decision`，阻塞生态扩展 |
| [#75444](https://github.com/NousResearch/hermes-agent/issues/75444) 自动分解器无限弹跳 | 2026-07-31 | ~114 天 | 已有部分 fix PR #158743，建议尽快评审 |
| [#84102](https://github.com/NousResearch/hermes-agent/issues/84102) TTS Ogg/Vorbis 编码错误 | 2026-08-11 | ~103 天 | 修复成本极低（显式 `-c:a libopus`），收益明确 |
| [#99943](https://github.com/NousResearch/hermes-agent/issues/99943) 压缩器窗口钳制 | 2026-09-01 | ~82 天 | P2，影响云端大窗口模型，用户可感知 |
| [#104462](https://github.com/NousResearch/hermes-agent/issues/104462) 真实 token 统计 | 2026-09-06 | ~77 天 | 与上条应合并规划 |
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) API 创建 PR 权限 | 2026-10-03 | ~50 天 | `blocked/cause-upstream`，建议在 issue 中明确“不可由本项目修复”并引导 workaround |
| [#123184](https://github.com/NousResearch/hermes-agent/issues/123184) macOS Keychain 截断 | 2026-09-25 | ~58 天 | P2，会导致 Claude Code 被登出，影响凭据借用场景 |

### 长期开放的 PR

| PR | 创建 | 天数 | 备注 |
|---|---|---|---|
| [#74395](https://github.com/NousResearch/hermes-agent/pull/74395) Kanban `board=` 透传 + worktree 错误映射 422 | 2026-07-29 | ~116 天 | 已被 review 收窄，接近可合 |
| [#76863](https://github.com/NousResearch/hermes-agent/pull/76863) pt-BR 本地化 | 2026-08-02 | ~112 天 | 质量高，缺的是 i18n 合并策略 |
| [#82451](https://github.com/NousResearch/hermes-agent/pull/82451) legacy SessionDB 压缩 no-op | 2026-08-09 | ~105 天 | 与 hot-update 兼容性主线相关 |
| [#92118](https://github.com/NousResearch/hermes-agent/pull/92118) 记忆结构化预取 | 2026-08-22 | ~92 天 | 架构类改动，需要 maintainer 设计评审 |
| [#124952](https://github.com/NousResearch/hermes-agent/pull/124952) 飞书真实提及 | 2026-09-27 | ~56 天 | 平台维护者带宽问题 |

---

## 项目健康度小结

| 维度 | 评估 |
|---|---|
| **活跃度** | 🟢 极高。255 Issue + 500 PR 更新/24h，社区与维护者同时高强度参与 |
| **修复吞吐** | 🟢 强。222 条 PR 关闭/合并，Kanban/Desktop/网关均有针对性修复在途 |
| **Issue 积压** | 🔴 承压。关闭 19 vs 新开/活跃 236，净增明显；7–9 月的老 Issue 仍有 10+ 条未闭环 |
| **高危缺陷** | 🟠 2 个 P1 无 fix PR，且均涉及**数据持久化**与**静默失败**，风险等级高 |
| **发布节奏** | 🟡 0 release，但 v0.23.3 兼容性修复已在队列，短期应有补丁 |
| **架构风险** | 🟠 统一网关带来的性能与状态一致性债务（#146643、#141973、#152603）尚未收敛，是未来 1–2 个 Sprint 的主要不确定性 |

**建议优先级**：① 为 #147839、#134469 指派 owner 并出 fix PR；② 尽快合并 #158748（计费风险）与 #158743（Kanban 弹跳）；③ 在 #143547 中维护一份官方“网关已知问题 + 修复状态”表，降低重复报告与用户焦虑。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**统计周期：2026-11-21 → 2026-11-22**

---

## 一、今日速览

今日 AstrBot 无新版本发布，但社区与代码侧保持**高位运转**：过去 24 小时共 7 条 Issue 更新（6 条新开/活跃、1 条关闭）与 34 条 PR 更新（31 条待合并、3 条已合并/关闭），Issue 与 PR 的比例约为 1:5，属于**典型的「代码产出大于问题反馈」供给型活跃**。PR 侧出现明显集束现象：所披露的 20 条 PR 中有 15 条来自同一贡献者 @JosephTian876，围绕 Gemini Provider、上下文压缩、媒体链路与日志归因形成密集补丁系列。今日最大风险信号来自 `aiocqhttp` 适配器的 [#11313](https://github.com/AstrBotDevs/AstrBot/issues/11313)——状态播报事件被误派发为空私聊消息，会「挤掉」紧随其后的真实消息，属于影响核心可用性的中等偏高危 Bug，且目前无对应 fix PR。生态层面，NapCatQQ 于 11 月 10 日宣布项目终止并清空仓库，导致 Docker 部署文档出现失效条目（[#11309](https://github.com/AstrBotDevs/AstrBot/issues/11309) 已关闭、[#11310](https://github.com/AstrBotDevs/AstrBot/issues/11310) 仍在跟进），这是今日唯一涉及**项目外部依赖健康度**的问题。整体评估：**社区活跃度健康，代码供给充裕，但合并吞吐偏低、审查带宽与单点贡献者集中度是当前主要瓶颈**。

---

## 二、版本发布

无新版本发布（Releases：0）。自上次发布以来的积累变更仍待下一次版本窗口收敛，主要集中在 Gemini Provider 兼容性与上下文管理两条主线。

---

## 三、项目进展

> 说明：数据显示 3 条 PR 已合并/关闭，但未出现在「评论数 Top 20」披露列表中，故本节以**推进方向**而非逐条合并明细呈现。

今日 PR 流呈现六条清晰的技术主线：

| 主线 | 代表 PR | 推进内容 |
|---|---|---|
| **Gemini Provider 健壮性** | [#11298](https://github.com/AstrBotDevs/AstrBot/pull/11298) / [#11185](https://github.com/AstrBotDevs/AstrBot/pull/11185) / [#10961](https://github.com/AstrBotDevs/AstrBot/pull/10961) / [#10894](https://github.com/AstrBotDevs/AstrBot/pull/10894) | 修复中转网关下 cache / thought token 恒为 0 的统计失真；保留工具调用身份并完整聚合流式批次；补齐 dated 2.5 模型与 relay 别名匹配；历史图片下载失败不再中断整轮对话 |
| **多模态原生视频输入** | [#10202](https://github.com/AstrBotDevs/AstrBot/pull/10202) → [#11018](https://github.com/AstrBotDevs/AstrBot/pull/11018) → [#11019](https://github.com/AstrBotDevs/AstrBot/pull/11019) | 将 video 提升为一等输入模态（对齐 `image_urls` / `audio_urls` 语义），并修复「走 audio 槽的视频被降级」与「按声明模态门控注入」两个下游问题，构成一条三级依赖链 |
| **上下文压缩与截断** | [#11297](https://github.com/AstrBotDevs/AstrBot/pull/11297) / [#11316](https://github.com/AstrBotDevs/AstrBot/pull/11316) | 修正压缩失败时被误判为「压缩完成」而跳过兜底截断的逻辑漏洞；改为按完整用户轮次而非成对消息计数，避免工具调用轮次吃掉轮数配额 |
| **插件运行时架构** | [#11317](https://github.com/AstrBotDevs/AstrBot/pull/11317) | 集成升级版 `astrbot-sdk` runtime 与隔离插件桥：worker 进程隔离、类型化配置治理、拓扑依赖调度、受限能力授予——**今日最具架构纵深的一条 PR** |
| **工具执行安全** | [#11283](https://github.com/AstrBotDevs/AstrBot/pull/11283) / [#11308](https://github.com/AstrBotDevs/AstrBot/pull/11308) | 工具运行前审批 + 会话级权限模式（7 个关联 PR 组成的堆栈）；隔离工具执行参数与已记录调用状态，修复 handler 原地修改嵌套参数污染 `tools_call_args` 的问题 |
| **平台能力对齐** | [#11314](https://github.com/AstrBotDevs/AstrBot/pull/11314) | KOOK 适配器消费响应流，首个文本分片即建 KMarkdown 消息并持续编辑，补齐频道与私聊的流式回复 |

**整体推进度判读**：今日代码供给覆盖了「模型接入层 → 上下文管理层 → 执行安全层 → 平台适配层」四个纵向切面，单日技术跨度显著；但 31 条待合并意味着绝大多数改动仍停留在审查队列，**实际向前迈进的距离取决于后续合并节奏而非提交量**。

---

## 四、社区热点

**1. [#11313](https://github.com/AstrBotDevs/AstrBot/issues/11313) — aiocqhttp 空私聊消息挤掉真实消息（3 条评论，今日讨论最活跃）**
用户 @PanQiMing 提供了罕见完整的排查链路：定位到 QQ 在对方「边打字边发消息」时会推送两条原始事件，AstrBot 将 `notice/input_status` 状态播报误派发为空私聊消息，进而导致后续真实消息在插件入口处完全无日志。诉求核心不是「回复慢」而是**「静默丢消息」**——这是一个难以自查的隐性故障，用户明确表达了「看起来像随机不回复」的困惑。3 条评论说明维护者已介入讨论，但尚无 fix PR。

**2. [#11310](https://github.com/AstrBotDevs/AstrBot/issues/11310) / [#11309](https://github.com/AstrBotDevs/AstrBot/issues/11309) — NapCat 停服引发文档失效（2 条评论，1 条已关闭）**
同一作者连开两条同源 Issue，指向 Docker 部署文档中「与 NapCat 一起部署」条目已不可用。背后诉求超出文档修正本身：**QQ 协议端生态正在发生断供**，用户需要的是 AstrBot 官方给出替代路径或迁移指引。这是今日最需要产品级回应的一条。

**3. [#11315](https://github.com/AstrBotDevs/AstrBot/issues/11315) — KOOK 流式回复（0 条评论，但已自带 PR）**
用户 @wcqqq1214 提 Issue 同时提交了 [#11314](https://github.com/AstrBotDevs/AstrBot/pull/11314)，形成「Issue→PR 同日闭环」，属于高质量贡献范式。

---

## 五、Bug 与稳定性

按严重程度降序：

| 严重度 | 问题 | 影响面 | Fix PR |
|---|---|---|---|
| 🔴 **高** | [#11313](https://github.com/AstrBotDevs/AstrBot/issues/11313) aiocqhttp 将 `notice/input_status` 派发为空私聊消息，挤掉紧随其后的真实消息 | QQ 私聊全量用户；间歇性、极难复现；插件侧无任何日志，故障不可观测 | ❌ 无 |
| 🟠 **中高** | [#11305](https://github.com/AstrBotDevs/AstrBot/issues/11305) 插件禁用后重新启用失败，`resolve_view` 早于 `activated` 更新，抛 `The view's plugin is unavailable` | 插件开发与热重载流程；`star_manager.py:1306` → `chatui.py:162` 调用链已定位 | ❌ 无 |
| 🟡 **中** | [#11300](https://github.com/AstrBotDevs/AstrBot/issues/11300) 首条消息可能使用「点击发送后」才选定的 provider / model / stream 配置 | 首次会话路径；send handler 在等待会话创建与列表刷新之后才读取设置，与既有会话路径行为不一致 | ❌ 无 |

**横向关联修复**：以下三项虽非今日新报 Bug，但属同一稳定性议题，值得维护者一并纳入审查：
- [#11223](https://github.com/AstrBotDevs/AstrBot/pull/11223) 旧会话中工具调用历史被截断后触发 OpenAI 400（`role 'tool' must be a response to a preceding 'tool_calls'`）
- [#10897](https://github.com/AstrBotDevs/AstrBot/pull/10897) 插件卸载时未注销 `register_provider_adapter`，导致重载报重复注册
- [#10928](https://github.com/AstrBotDevs/AstrBot/pull/10928) `ffmpeg` / `ffprobe` 子进程无墙钟超时，存在挂死风险

> **稳定性判断**：今日 3 条新 Bug 全部处于「已定位根因、无修复 PR」状态，其中 #11313 涉及消息静默丢失且不可观测，建议优先级高于所有功能型 PR。

---

## 六、功能请求与路线图信号

| 需求 | Issue | 对应 PR | 纳入下一版本的可能性 |
|---|---|---|---|
| KOOK 频道/私聊文本流式回复 | [#11315](https://github.com/AstrBotDevs/AstrBot/issues/11315) | [#11314](https://github.com/AstrBotDevs/AstrBot/pull/11314)（`Closes #11315`） | **高** — 需求与实现同日闭环，改动范围收敛于单一适配器，合并成本低 |
| 原生视频输入模态 | — | [#10202](https://github.com/AstrBotDevs/AstrBot/pull/10202) | **中** — 架构价值高，但已积压 60 天且下游有两个依赖 PR，需成组合并 |
| 工具运行前审批 + 会话级权限模式 | — | [#11283](https://github.com/AstrBotDevs/AstrBot/pull/11283) | **中** — 7 PR 堆栈，属于安全能力基建，但审查面较大 |
| SDK 插件运行时与 worker 隔离 | — | [#11317](https://github.com/AstrBotDevs/AstrBot/pull/11317) | **中低（本周期内）** — 依赖上游 `astrbot-sdk#7`，属跨仓库协同，落地周期更长 |
| 天气守护插件 | [#11296](https://github.com/AstrBotDevs/AstrBot/issues/11296) | — | 插件生态侧，不进本体路线图 |

**路线图信号解读**：今日功能侧最明确的方向是**「流式输出能力向各平台适配器下沉」**与**「工具调用安全边界收紧」**。#11315/#11314 的组合表明用户已自发承担适配器层的能力补齐工作，维护者可考虑将「适配器流式能力矩阵」正式列入路线图以牵引后续贡献。

---

## 七、用户反馈摘要

- **痛点一：故障不可观测性 > 故障本身。** #11313 用户反复强调「第三方插件的入口 handler 一行日志都没有」——对使用者而言，静默失败比报错更消耗信任。建议在处理该 Bug 的同时补充适配器层的事件丢弃可观测性。
- **痛点二：部署路径的外部依赖脆弱。** #11310 作者详细列明了 NapCatQQ 的时间线（11-10 宣布 Ending、11-12 清空仓库并重写历史、Releases 与 Tags 一并删除），说明用户对「官方文档回链到已死仓库」这一体验相当不满，也侧面反映 AstrBot 的部署文档与协议端生态强耦合。
- **痛点三：多轮工具调用的上下文成本被低估。** #11316 给出量化数据：单个任务产生 17 批工具调用 + 22 条结果 = 41 条非 system 消息，在 20 轮限制下直接触发截断。这是真实重度 Agent 使用场景暴露出的配额模型缺陷。
- **满意侧信号：** 用户愿意提交带环境矩阵、根因分析、复现步骤的高质量 Issue（#11313、#11305 均属此类），且出现「提 Issue 同时自带 PR」的贡献模式（#11315/#11314），说明项目文档与贡献流程对开发者友好，社区自组织能力健康。

---

## 八、待处理积压（提醒维护者关注）

**长期未合并 PR：**

| PR | 提交日期 | 积压时长 | 备注 |
|---|---|---|---|
| [#10202](https://github.com/AstrBotDevs/AstrBot/pull/10202) feat(provider): native video input modality | 2026-09-23 | **≈60 天** | 两个下游 PR（#11018 / #11019）被其阻塞，单点延迟放大为三倍积压 |
| [#10846](https://github.com/AstrBotDevs/AstrBot/pull/10846) 静默 provider 替换告警 | 2026-10-29 | ≈24 天 | 取代已被陈旧清理关闭的 #9484 |
| [#10893](https://github.com/AstrBotDevs/AstrBot/pull/10893) 工具调用轮次的 hook 派发 | 2026-10-31 | ≈22 天 | `Closes #10770`，Issue 侧已等待 |
| [#10894](https://github.com/AstrBotDevs/AstrBot/pull/10894) / [#10897](https://github.com/AstrBotDevs/AstrBot/pull/10897) / [#10912](https://github.com/AstrBotDevs/AstrBot/pull/10912) | 2026-10-31 | ≈22 天 | 均为修复型，属低风险高收益 |
| [#10927](https://github.com/AstrBotDevs/AstrBot/pull/10927) MP3 出站转码膨胀 | 2026-11-01 | ≈21 天 | 自 v4.26.0 引入的回归，影响所有出站语音 |
| [#10928](https://github.com/AstrBotDevs/AstrBot/pull/10928) ffmpeg 超时 | 2026-11-01 | ≈21 天 | 稳定性加固，合并成本低 |
| [#10961](https://github.com/AstrBotDevs/AstrBot/pull/10961) Gemini relay 别名 | 2026-11-02 | ≈20 天 | 与 #11219 / #11251 已合并内容衔接 |

**无修复 PR 的活跃 Bug：** [#11313](https://github.com/AstrBotDevs/AstrBot/issues/11313)、[#11305](https://github.com/AstrBotDevs/AstrBot/issues/11305)、[#11300](https://github.com/AstrBotDevs/AstrBot/issues/11300)

**结构性风险提示：**
1. **贡献集中度过高** — 披露的 20 条 PR 中 15 条（75%）来自单一贡献者，一旦其节奏中断，Gemini、上下文、媒体三条线将同时停摆。建议维护者主动拆分审查批次、邀请第二审查者介入。
2. **依赖链阻塞** — `#10202 → #11018 → #11019` 与 `#11283` 所在的 7-PR 堆栈，均存在「首个未合并则全部滞留」的串联风险，建议对链首 PR 设立明确的合并决策期限。
3. **生态断供响应缺失** — NapCat 停服已过去 12 天，文档侧仅有 Issue 而无 PR，建议尽快产出替代协议端指引，避免新用户在部署第一步即受阻。

---

*本报告基于 2026-11-21 至 2026-11-22 的 GitHub 公开数据生成，PR 合并/关闭明细以接口披露范围为限。*

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**报告日期：2026-11-22** ｜ 数据窗口：过去 24 小时 ｜ 数据源：GitHub Discussions（仓库未启用 Issues / PR）

---

## 1. 今日速览

1. **社区热度处于高位，但代码侧静默**：过去 24 小时 Discussions 更新 **153 条**，而 Releases 新增 **0 个**、无 changelog 合并摘要，呈现"讨论密集、交付空窗"的典型形态。
2. **热点高度集中在桌面端 0.2.2-rc.x 升级链**：Top 15 讨论中有 **7 条为 Bug 类**，其中 4 条（#13376、#13730、#13565、#12261）直指 rc.3→rc.5 升级/自动更新后的启动与会话可用性问题，已形成明显的**版本迁移质量事件簇**。
3. **本地模型与数据治理两条长期议题持续发酵**：#3157（本地 LLM 超时，25 评论）为今日互动量第一；#4441（会话无法真正删除）自 8 月提出至今仍开放，属合规级隐患。
4. **生态侧仍在正向生长**：社区插件 dsh-code-index 迭代至 v0.11.0（#5623，10 评论），同时出现对"插件过载"的反思帖（#12329），生态开始进入自我校准阶段。
5. **健康度判断**：活跃度 **A（高）**，响应度 **C（偏弱）**——Top 15 全部为 OPEN，样本内 **0 条关闭**，且 👍 计数全为 0（该指标在本仓库基本未被使用），说明讨论沉淀多、收敛少，积压风险上升。

---

## 2. 版本发布

**本次窗口无新版本发布（0 个），亦无 Releases changelog 可摘要。**

按项目机制，代码合并仅通过 Releases 落地；本报告周期内既无新版本、也无合并摘要，因此**无法归因任何新功能上线或缺陷修复**。需特别指出：社区正在集中反馈的 0.2.2-rc.3 / rc.5 相关问题（见第 5 节）**在当前窗口内均未获得修复版本覆盖**。

---

## 3. 项目进展

- **合并/关闭情况**：无。由于 Releases 为空且未提供 changelog，本日**没有可确认的功能合并或修复落地**。此处并非"PR 数为 0 导致无进展"的误判，而是发布通道本身在本窗口无输出。
- **可观测的间接进展**：社区侧在推进 API 层面的可行性论证，如 #524 提出基于 `ctx.tools.restrict()` 的作用域机制构建 provider-neutral 的 ToolSearch 插件，属于对现有公开 API 接缝（lifecycle seams）的实质性压力测试，其结论可直接反哺下一版插件 API 设计。
- **整体推进量评估**：本日代码推进 ≈ **0**；需求与缺陷信息净增 ≈ **显著正向**（153 条讨论更新）。项目处于"输入大于输出"的阶段，若下一版本仍未覆盖桌面端迁移问题，用户信任成本将进一步累积。

---

## 4. 社区热点

| 排名 | 讨论 | 分类 | 评论 | 核心诉求 |
|---|---|---|---|---|
| 1 | [#3157 llm-pi-ai 本地 LLM 超时上调](https://github.com/deepseek-ai/deepseek-harness/discussions/3157) | General | 25 | 5 分钟硬超时无法满足本地大模型长 prompt，用户尝试改 `settings.yaml` 失败，缺乏可配置项与文档 |
| 2 | [#5623 dsh-code-index v0.11.0 影响面透视](https://github.com/deepseek-ai/deepseek-harness/discussions/5623) | Show Your Plugins | 10 | 社区插件展示"潜在影响 + 源码证据"能力，生态能力向代码理解纵深发展 |
| 3 | [#4441 会话可归档但不可删除](https://github.com/deepseek-ai/deepseek-harness/discussions/4441) | General | 7 | 经核实 `workspace.archiveSession` 仅追加 id，**全链路无删除路径**，涉及隐私与合规 |
| 4 | [#12261 macOS 无边框窗口失去拖拽区（0.2.1-rc.5 → 0.2.2-rc.1 回归）](https://github.com/deepseek-ai/deepseek-harness/discussions/12261) | Q&A | 7 | 明确版本回归，窗口无法用鼠标移动 |
| 5 | [#11114 主窗口尺寸/位置/最大化状态不持久化](https://github.com/deepseek-ai/deepseek-harness/discussions/11114) | General | 6 | 每次重启回退 1280×820 居中，桌面端基础体验缺陷 |

**诉求分析**：Top 5 中 4 条为用户可直接感知的"可用性/信任"问题，而非能力扩展诉求。**#3157 的 25 条评论跨越 8 月至今近百日**，说明本地模型（Ollama/Gemma 等）用户群已形成稳定规模，而超时、配置可发现性等基础适配仍未跟进——这是当前性价比最高的改进点之一。

---

## 5. Bug 与稳定性

按严重程度排序（**修复状态：本窗口 0 个 Releases，故全部标记为"无修复版本落地"**；项目不走 PR，修复只能经 Release 验证）：

| 级别 | 问题 | 平台/版本 | 影响 | 状态 |
|---|---|---|---|---|
| 🔴 P0 | [#13376 升级迁移重新启用已禁用 bundle 并与依赖安装竞态，`sessionController` 不可用、无法新建会话](https://github.com/deepseek-ai/deepseek-harness/discussions/13376) | Win11，rc.2→rc.3 | **应用核心功能不可用** | OPEN，今日仍有更新，无修复版本 |
| 🔴 P0 | [#13730 自动更新后官方可选 bundle 仍停留在 rc.3，preflight 禁用 `session-query-sqlite`，会话控制器不可用](https://github.com/deepseek-ai/deepseek-harness/discussions/13730) | macOS arm64，rc.5 | 同上，且由**自动更新**触发，影响面更广 | OPEN，无修复版本 |
| 🟠 P1 | [#13565 Windows 启动握手 ECONNRESET，Host 实际健康，重试无效](https://github.com/deepseek-ai/deepseek-harness/discussions/13565) | Win10 22H2，rc.3 | 启动失败，`authenticateWebHost` 环节 | OPEN，无修复版本 |
| 🟠 P1 | [#13524 模型切换压缩时向**已不可用的旧模型**请求摘要，并丢弃用户输入](https://github.com/deepseek-ai/deepseek-harness/discussions/13524) | 0.2.2-rc.3，`dsh-compaction-basic` | **用户输入丢失**，数据完整性问题 | OPEN，无修复版本 |
| 🟡 P2 | [#12261 macOS 无边框窗口无拖拽区域（回归）](https://github.com/deepseek-ai/deepseek-harness/discussions/12261) | macOS，rc.1 回归 | 窗口无法移动，可用性受损 | OPEN，无修复版本 |
| 🟡 P2 | [#9407 Windows 沙箱将整个工作区标记为 Low 完整性，Explorer 图标全部显示为空白页](https://github.com/deepseek-ai/deepseek-harness/discussions/9407) | Windows，`workspace-write` | 可继承 ACE 污染工作区呈现 | OPEN（自 10-11），无修复版本 |
| 🟢 P3 | [#11114 窗口几何状态不持久化](https://github.com/deepseek-ai/deepseek-harness/discussions/11114) | Win11，rc.3 | 体验缺陷 | OPEN，无修复版本 |

**关键判断**：#13376 与 #13730 是同一根因的两种表现——**版本升级/自动更新流程未同步升级 profile 依赖，导致包版本偏斜（version skew）**。这会直接让 `desktop` profile 失效。建议将其提升为下一补丁版的**阻断级修复项**，并在 rc 通道增加升级后依赖一致性自检。

---

## 6. 功能请求与路线图信号

| 需求 | 讨论 | 纳入下一版概率 | 判断依据 |
|---|---|---|---|
| 本地 LLM 超时可配置（如 20 分钟） | [#3157](https://github.com/deepseek-ai/deepseek-harness/discussions/3157) | **高** | 改动面小（配置项 + 文档），25 评论形成明确共识，属低风险高收益 |
| `dsh://open?session=` 深链直达指定会话 | [#13820](https://github.com/deepseek-ai/deepseek-harness/discussions/13820) | 中高 | 现状仅聚焦主窗口，实现边界清晰，且被外部工具（Agent HUD、通知系统）实际需要 |
| 移动端（Android/iOS） | [#13724](https://github.com/deepseek-ai/deepseek-harness/discussions/13724) | 低（近期） | 架构级投入，与当前桌面端稳定性债务冲突 |
| 会话/transcript 真删除（擦除路径） | [#4441](https://github.com/deepseek-ai/deepseek-harness/discussions/4441) | 中 | 实现不复杂，但涉及数据模型与合规语义，需官方表态 |
| Provider-neutral ToolSearch 插件 API 接缝 | [#524](https://github.com/deepseek-ai/deepseek-harness/discussions/524) | 中 | 已列出 6 处生命周期阻塞点，属于高质量 API 设计输入，适合在插件 API 版本迭代中吸收 |
| Harness 层"侦察—筛选"轻量机制（降低 token 浪费） | [#13361](https://github.com/deepseek-ai/deepseek-harness/discussions/13361) | 低中 | 理念有价值，但缺可验证的最小实现方案 |

**路线图信号**：需求正从"加能力"转向"控成本、控副作用"（#12329 插件过载反思、#13361 token 浪费）与"补基础设施"（#13820 深链、#4441 数据擦除）。这与 #524 反映的 API 稳定性诉求同向——**下一阶段的竞争点可能是"可控性"而非"插件数量"**。

---

## 7. 用户反馈摘要

- **真实痛点（桌面端）**：升级即坏。用户明确指出从 rc.5/rc.3 一路升级后"依赖仍钉在 rc.3"，说明自动更新只换了外壳、没换 profile 依赖；#13376 进一步显示迁移逻辑会**把用户主动禁用的可选 bundle 重新打开**，属于违背用户意图的行为。
- **真实痛点（数据安全）**：#13524 的"压缩时丢弃用户输入"与 #4441 的"无法删除会话"共同指向一个敏感结论——**用户对自身数据的控制权不足**（既删不掉，也可能被意外丢掉）。
- **使用场景**：本地模型离线推理（Win11 + Ollama Gemma4:12b）、长 prompt 长任务（需要 20 分钟级超时）、远程/移动场景下调用 Agent（#13724）、外部工具与 DSH 联动（#13820 的 Agent HUD "return to session"）。
- **满意度正向面**：社区对插件机制的上手体验仍认可（#5623 持续迭代、#3157 开头即称"great successful start"），生态贡献者活跃且愿意做深度技术论证（#524 逐条列出 API 阻塞点）。
- **不满意集中点**：rc 通道质量门禁偏松；配置项可发现性差（改 `settings.yaml` "no or got it wrong"）；跨平台桌面细节（窗口拖拽、几何持久化、沙箱标签）长期未收口。

---

## 8. 待处理积压（请维护者关注）

| 讨论 | 提出时间 | 已开放 | 为何需要关注 |
|---|---|---|---|
| [#524 Provider-neutral ToolSearch API 接缝](https://github.com/deepseek-ai/deepseek-harness/discussions/524) | 2026-08-13 | **≈101 天** | 积压最久，含 6 项具体 API 阻塞点，是插件生态扩展的硬约束 |
| [#3157 本地 LLM 超时](https://github.com/deepseek-ai/deepseek-harness/discussions/3157) | 2026-08-18 | **≈96 天** | 全站互动第一（25 评论）却零官方收敛，成本最低、口碑收益最高 |
| [#4441 会话无删除路径](https://github.com/deepseek-ai/deepseek-harness/discussions/4441) | 2026-08-25 | **≈89 天** | 合规/隐私属性，长期挂起会形成治理风险 |
| [#9407 Windows 沙箱 Low 完整性标签污染工作区](https://github.com/deepseek-ai/deepseek-harness/discussions/9407) | 2026-10-11 | ≈42 天 | 影响 Windows 主力用户的工作区呈现，与沙箱安全语义纠缠 |
| [#11114 窗口状态不持久化](https://github.com/deepseek-ai/deepseek-harness/discussions/11114) | 2026-10-26 | ≈27 天 | 低复杂度、高感知度，适合作为"体验补丁"打包处理 |

---

### 数据说明与局限
- 本报告基于 Top 15（展示量约占 153 条更新的 **9.8%**）进行分析，样本内评论合计 **101 条**；全量 153 条中可能包含未被展示的新增讨论。
- 所有条目 👍 均为 0，表明该仓库社区**基本不使用 reaction 表达倾向**，故本报告以评论数与更新时间为活跃度主指标。
- 分类分布（Top 15）：General 7、Ideas 5、Q&A 2、Show Your Plugins 1；**Bug 类占比 46.7%**，显著偏高，是当前项目健康度的主要压力来源。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*