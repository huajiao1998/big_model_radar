# OpenClaw 生态日报 2026-11-19

> Issues: 491 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-19 02:52 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-11-19

> 统计窗口：2026-11-18 → 2026-11-19（过去 24 小时）
> 数据来源：OpenClaw GitHub 仓库 Issues / PR / Releases

---

## 1. 今日速览

过去 24 小时 OpenClaw 保持高强度迭代：**Issues 更新 491 条**（新开/活跃 359、关闭 132），**PR 更新 500 条**（待合并 286、已合并/关闭 214），并发布 1 个 `extended-stable`（LTS 等价）版本 **v2026.10.33**。整体活跃度处于高位，合并/关闭比例约 42.8%，维护吞吐正常。今日热点集中在 **Gateway 生命周期与事件循环阻塞**（#119720、#191944）、**状态数据库/更新流程可靠性**（#197083、#198218）以及 **Prompt 缓存与转录重复渲染**（#182891、#198373、#123792）等深层稳定性问题上。社区反馈质量高，多个 P0/P1 issue 已附带可复现步骤与源码定位，但相当数量仍标记为 `no-new-fix-pr`，修复侧供给偏紧。

---

## 2. 版本发布

### v2026.10.33 — Gateway-only `extended-stable` 发布

- **定位**：仅面向 Gateway 的 `extended-stable` 通道，官方将其定义为当前 LTS 等价版本。基于 2026 年 10 月末的 OpenClaw 快照，叠加关键安全更新、可靠性与性能修复，以及新模型支持。
- **破坏性变更**：Release note 中未公开声明破坏性变更，但因其属于"十月末代码 + 关键补丁"的回移轨道，建议留意与 2026.11.x 主线在插件迁移义务、状态库 schema 上的差异（参见 #200606、#197083）。
- **迁移注意事项**：
  - 从 2026.11.x 降级/切回该 LTS 通道的用户需确认状态库 schema 兼容性；
  - 若曾使用 2026.11.5 beta 的插件迁移（#200606），回退到本版本可能触发 Doctor 迁移输入冲突；
  - macOS 用户留意 `gateway stop` 类无关系问题（#191944）在该版本是否仍存在。
- 链接：https://github.com/openclaw/openclaw/releases

---

## 3. 项目进展

今日合并/关闭 **214 条 PR**，重点推进方向如下：

| 方向 | 代表 PR | 推进内容 |
|---|---|---|
| **更新流程健壮性** | [#201579](https://github.com/openclaw/openclaw/pull/201579)、[#201545](https://github.com/openclaw/openclaw/pull/201545)、[#201538](https://github.com/openclaw/openclaw/pull/201538)、[#201463](https://github.com/openclaw/openclaw/pull/201463) | 放宽 `update` 磁盘预检（不再要求 ~5× 数据库大小的可用空间）、允许 Gateway 写入 agent 数据库时启动包更新、修复"半切换 Git 更新"被误报为最新、修复 schema 变更/数据库繁忙时切换发布链接即失败的问题。 |
| **Gateway 启动期可用性** | [#201569](https://github.com/openclaw/openclaw/pull/201569)（已关闭）、[#201582](https://github.com/openclaw/openclaw/pull/201582) | 启动期 chat metadata 读取改为可重试；`doctor` 仅在本次调用真正可修复时才建议 `--fix` 外部 launchd 任务。 |
| **多 Agent 编排正确性** | [#201563](https://github.com/openclaw/openclaw/pull/201563)、[#201567](https://github.com/openclaw/openclaw/pull/201567)（已关闭） | 修复单个子任务完成失败导致同批兄弟结果整体丢失的问题；对齐 Goal 权威证明与准入策略。 |
| **跨环境状态存储** | [#196706](https://github.com/openclaw/openclaw/pull/196706)、[#201583](https://github.com/openclaw/openclaw/pull/201583) | 修复 K8s `fsGroup` 重挂载后私有状态库（含 GitHub 身份、Codex worker 配置目录）损坏；修复 `database port` 在 `sqlite_sequence.seq=0` 时误中止。 |
| **Web UI/登录体验** | [#201584](https://github.com/openclaw/openclaw/pull/201584)、[#201495](https://github.com/openclaw/openclaw/pull/201495) | 代理登录过期时显示可理解的登录说明而非死循环重试；空会话不再显示"加载消息"占位气泡。 |
| **测试与发布可诊断性** | [#201578](https://github.com/openclaw/openclaw/pull/201578)（已关闭）、[#198918](https://github.com/openclaw/openclaw/pull/198918)、[#201568](https://github.com/openclaw/openclaw/pull/201568)（已关闭） | 让发布验证失败输出可诊断的内存/阶段信息；削减重叠的 agent 策略与执行测试套件；适配 hook 隐私用例新增的 `turnTainted: "unknown"` 字段。 |

**整体判断**：今日进展主要落在"**更新/迁移路径的可靠性**"与"**跨平台状态存储修复**"两条主线，属于典型的稳定性收敛阶段；功能侧推进相对温和，大特性（如 continuation、GitHub 插件化）仍停留在待合并状态。

---

## 4. 社区热点

### 评论最活跃 Issues

1. **[#191944](https://github.com/openclaw/openclaw/issues/191944)（37 条评论，P2）** — macOS Intel 上 `gateway stop` / `stop --force` 均失败，报 `Process ancestry could not be fully inspected`。**诉求**：进程血缘探测在 macOS 上的健壮性与可回退路径（提示用户走 Gateway update 的 managed handoff）需要更明确的产品设计。
2. **[#119720](https://github.com/openclaw/openclaw/issues/119720)（28 条评论，P1）** — 同步 agent 持久化与转录维护在规模下阻塞 Gateway 事件循环。**诉求**：将持久化路径异步化/分批化，是老生常谈但影响面最大的架构级性能问题。
3. **[#197083](https://github.com/openclaw/openclaw/issues/197083)（25 条评论，P2）** — 从 2026.11.1 → 2026.11.3 的托管 npm 升级在 post-install Doctor 阶段 WAL 校验失败，回滚被 `state-migrated-no-rollback` 拒绝，造成"半完成"状态。**诉求**：升级事务化与可恢复回滚语义。
4. **[#153426](https://github.com/openclaw/openclaw/issues/153426)（18 条评论，P0）** — `MEMORY.md` / `USER.md` 因 provenance ratchet 被静默永久排除出 bootstrap 注入，无诊断、无 CLI、无恢复路径。**诉求**：记忆可信度机制需要可观测性与人工恢复入口。

### 评论最活跃/受关注 PR

- **[#119052](https://github.com/openclaw/openclaw/pull/119052)（长期开放，P1）** — 拒绝 Windows 上由现有进程导致的虚假服务激活，native 资格验证持续推进（11-19 修复了 Startup-folder 接管回归）。
- **[#129388](https://github.com/openclaw/openclaw/pull/129388)（XL，P2）** — 上下文压力感知的 continuation（`continue_work` / `continue_delegate` / `request_compaction`），横跨 20+ 模块，社区关注度高但风险标签密集。
- **[#201296](https://github.com/openclaw/openclaw/pull/201296)（XL，P2）** — macOS onboarding 的单列表 AI 选择器 + 纯 ChatGPT 登录，属用户体验显著改善。

**背后诉求归纳**：社区当前最关心的不是"新功能"，而是 **① 升级/迁移不破坏现有安装；② 大型长期会话下的性能与内存上限；③ 静默失败的可观测性（记忆、缓存、进程探测）**。

---

## 5. Bug 与稳定性

### P0 / 严重

| Issue | 描述 | Fix PR |
|---|---|---|
| [#153426](https://github.com/openclaw/openclaw/issues/153426) **P0** | 精选记忆根被 provenance ratchet 静默永久排除，无诊断与恢复 | ❌ `no-new-fix-pr`，需产品决策 + 安全评审 |
| [#198218](https://github.com/openclaw/openclaw/issues/198218) **P1** | Doctor/update 在 Gateway 停止时因 update-run 准入反复重哈希不变的状态库而活锁（2026.10.6、2026.11.3 复现） | ❌ |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) **P1** | 同步持久化阻塞事件循环，规模下引发消息丢失/崩溃循环 | ❌（历史部分修复已落地） |
| [#196199](https://github.com/openclaw/openclaw/issues/196199) **P1** | 2026.10.10 起原生 Codex helper 完成无法恢复父 agent，导致目标暂停、用户被锁出助手 | ❌ `needs-info` |
| [#152965](https://github.com/openclaw/openclaw/issues/152965) **P1** | 热重载非通道插件会 dispose 所有通道插件且不重连，切断活跃流并丢消息 | ❌ |
| [#157712](https://github.com/openclaw/openclaw/issues/157712) **P1** | 每次 CLI 状态读取泄漏 162 MB 只读 DB 快照，25 分钟产生 23 GB | ❌（已有 linked PR） |
| [#191476](https://github.com/openclaw/openclaw/issues/191476) **P1** | Matrix 房间卡在 "Plugin matrix consumer is closed" | ❌ |
| [#200606](https://github.com/openclaw/openclaw/issues/200606) **P1** | 2026.11.5 candidate Doctor 因插件迁移冲突阻断更新（`changed=[]`） | ❌ `not-repro-on-main` |

### P2 / 回归与功能缺陷（选摘）

- [#197083](https://github.com/openclaw/openclaw/issues/197083) — 安装后 WAL 校验失败导致 11.3 升级半完成。
- [#182891](https://github.com/openclaw/openclaw/issues/182891) — Prompt cache 每次请求 `cache read dropped N -> 0`，疑因 envelope 重写。
- [#198373](https://github.com/openclaw/openclaw/issues/198373) — 转录在轮次间被重写（assistant tool-call id 重新生成），OpenAI 兼容路由下缓存命中坍缩至 ~1%。
- [#123792](https://github.com/openclaw/openclaw/issues/123792) — CLI 后端下 assistant 回合渲染两次（实时 block + 聚合记录）。
- [#162585](https://github.com/openclaw/openclaw/issues/162585) — Windows 插件源码捕获使 npm 目录线性膨胀，Gateway 永不健康。
- [#112638](https://github.com/openclaw/openclaw/issues/112638) — `session.maintenance` 的 `maxEntries`/`maxDiskBytes` 对 thread/channel 条目完全失效。
- [#200224](https://github.com/openclaw/openclaw/issues/200224) — 2026.11.5 beta 拒绝已退役的 `agents.defaults.heartbeat`，但移除会重新启用心跳。

### 已关闭修复

- [#194451](https://github.com/openclaw/openclaw/issues/194451)（P1）`/think` 等指令在 agent 轮次中触发 `SqliteTranscriptMutationConflictError` — 已关闭。
- [#185578](https://github.com/openclaw/openclaw/issues/185578)（P1）Gateway 堆下限只增不减、约 25 MiB/h 泄漏 — 已关闭（`not-repro-on-main`）。
- [#192667](https://github.com/openclaw/openclaw/issues/192667) macOS 设置缓慢 + 暗色主题输入不可见 — 报告者确认升级 2026.11.5 后解决。

**健康度判断**：稳定性问题仍以"**持久化/状态库/更新事务**"为震中，且高优先级 issue 中无 fix PR 的比例偏高，是当前维护侧的主要压力点。

---

## 6. 功能请求与路线图信号

结合现有 PR，以下需求有较大概率进入下一版本：

| 需求 | Issue | 关联 PR | 判断 |
|---|---|---|---|
| **有选择地参与群聊**（关闭 mention gating 后避免噪声） | [#155868](https://github.com/openclaw/openclaw/issues/155868) 等相关 | [#159478](https://github.com/openclaw/openclaw/pull/159478)（XL，`waiting on author`） | 方向明确，但体量大、含 message-delivery 风险 |
| **Cron/自动化在 provider 限流时退避** | — | [#197395](https://github.com/openclaw/openclaw/pull/197395)（P2，`waiting on maintainer`） | 高确定性，与 #197394 已合并的槽位扩容配套 |
| **sessions_send 唤起准入边界** | — | [#194376](https://github.com/openclaw/openclaw/pull/194376) | 解决并发 sender 绕过限流，属安全/公平性增强 |
| **上下文压力感知 continuation** | — | [#129388](https://github.com/openclaw/openclaw/pull/129388)（XL） | 设计文档完整，但兼容/会话状态/安全边界三重风险标签 |
| **记忆按条目分块**（`memory/` 列表式文件） | [#179954](https://github.com/openclaw/openclaw/issues/179954) | 暂无 | 与 #153426 记忆可信度问题相互关联 |
| **Usage footer 暴露 auth profile** | [#169428](https://github.com/openclaw/openclaw/issues/169428) | 暂无 | 低风险、易实现 |
| **Team 侧栏 agent 手动排序** | [#155039](https://github.com/openclaw/openclaw/issues/155039) | 暂无 | UI 层需求 |
| **无障碍：聊天消息暴露为标题** | [#154524](https://github.com/openclaw/openclaw/issues/154524) | 暂无 | 长期积压 |

**路线图信号**：功能侧正在从"新增能力"转向"**可治理性**"——审计技能使用（#141004）、GitHub 集成本地化（#192350）、session 准入控制（#194376）均属可观测性与治理基础设施。

---

## 7. 用户反馈摘要

**真实痛点**

- **升级即风险**：多位用户报告从 2026.11.x 升级时在 Doctor/迁移阶段卡住或半完成（#197083、#200606、#198218），出现 `state-migrated-no-rollback` 后既不能回滚也难以继续。用户明确要求"**更新要么完成要么干净回滚**"。
- **静默失败不可接受**：记忆根被排除（#153426）、prompt cache 从不复用（#182891、#198373）、16 个调用点吐同一错误字符串（#127195）——用户反复强调"**从生产日志无法判断原因**"。
- **规模下的性能墙**：35k 事件 / 228 MB 主会话导致多秒快照读（#181084）；事件循环被同步持久化阻塞（#119720）；堆内存单调增长（#185578）。属重度用户（多 agent、多通道、长会话）的核心场景。
- **平台差异**：macOS 进程探测（#191944）、Safari 27.3 缺失输入框（#195192）、Windows 插件暂存膨胀（#162585）——跨平台体验一致性仍是短板。

**满意信号**

- 报告者主动确认更新后症状消失（#192667），说明迭代修复可被用户感知；
- 大量 issue 由用户（或其 OpenClaw agent）附带源码定位、日志格式与复现步骤，社区协作质量高。

**不满意集中点**

- 高优先级 issue 长期停留在 `no-new-fix-pr` / `needs-maintainer-review`；
- 错误信息缺少 reason code 与 call-site tag，排障成本高。

---

## 8. 待处理积压（提醒维护者关注）

| 条目 | 类型 | 停留时长 | 备注 |
|---|---|---|---|
| [#112638](https://github.com/openclaw/openclaw/issues/112638) P2 | session 维护不封顶 | 自 2026-07-22（约 4 个月） | `needs-product-decision`，影响磁盘无界增长 |
| [#119052](https://github.com/openclaw/openclaw/pull/119052) P1 | Windows 服务虚假激活 | 自 2026-08-04（约 3.5 个月） | 仍在 native 资格验证，11-19 有新提交 |
| [#127195](https://github.com/openclaw/openclaw/issues/127195) P2 | 16 处相同错误无 reason code | 自 2026-08-21（约 3 个月） | 排障体验根因，改动面小但需产品决策 |
| [#141172](https://github.com/openclaw/openclaw/issues/141172) P2 | 早夭 run 泄漏 `agent.run.started` | 自 2026-09-07（约 2.5 个月） | 轨迹 flush 外键失败 |
| [#152965](https://github.com/openclaw/openclaw/issues/152965) P1 | 热重载切断通道插件 | 自 2026-09-19（约 2 个月） | 需 live repro |
| [#129388](https://github.com/openclaw/openclaw/pull/129388) P2 | Continuation 大特性 | 自 2026-08-25（约 3 个月） | XL、多风险标签，需明确取舍 |
| [#159478](https://github.com/openclaw/openclaw/pull/159478) P2 | 群聊选择性参与 | 自 2026-09-27（约 2 个月） | `waiting on author` |
| [#167854](https://github.com/openclaw/openclaw/issues/167854) P2 | Home 系统事件队列 20 条上限 | 自 2026-10-09 | 超 20 会话即丢通知 |

**建议**：优先为 **#153426（P0 记忆）、#198218（P1 活锁）、#191944（P2 但 37 评论）** 派发 maintainer 复核或明确"won't fix / 转设计文档"，以降低社区在无 fix PR 高优问题上的等待焦虑。

---

*本报告基于 OpenClaw 公开 GitHub 数据自动生成，评论数与状态以统计窗口为准。*

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告
**统计窗口：2026-11-18 → 2026-11-19｜样本项目：OpenClaw、Zeroclaw、PicoClaw、QwenPaw、Hermes Agent、AstrBot、DeepSeek Harness**

> 口径说明：各项目数据结构不同，表中“Issues 更新”含新开/活跃/关闭；“PR 更新”含待合并与已合并/关闭；DeepSeek Harness 未启用 Issues/PR，以 Discussions 计。关闭/合并率为当日可见关闭数/更新数，仅作吞吐参考。

---

## 1. 生态全景

个人 AI 助手与自主智能体开源生态正从“功能竞赛”进入“平台化 + 治理化”阶段：Gateway/运行时、状态库、插件体系、权限审批成为主战场。社区高频诉求不再是单点新能力，而是**可回滚升级、上下文成本控制、安全审批闭环、静默失败可观测**。项目活跃度分层明显：OpenClaw、Hermes Agent 处于大规模高频迭代；QwenPaw、AstrBot、Zeroclaw 处于活跃迁移/治理期；PicoClaw 进入低活跃积压清理；DeepSeek Harness 呈讨论驱动、稳定性风险偏高。维护带宽、跨平台质量与高优 Issue 的 fix 供给，正成为生态共同瓶颈。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新（关闭） | PR 更新（待合/关闭） | Release | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | **491**（132，关闭率 26.9%） | **500**（286/214，合并关闭率 42.8%） | **v2026.10.33** extended-stable | 高位迭代、吞吐正常；但 P0/P1 中 `no-new-fix-pr` 偏多，维护决策压力大 |
| **Zeroclaw** | 50（10，20%） | 50（48/2，4%） | 无 | 高活跃但净扩张；安全清账明显，PR 消化弱，registry V5 待评审 |
| **PicoClaw** | 1（1，100%，基数极小） | 4（0/4，100%，基数极小） | 无 | 低活跃、队列收敛；安全 Issue 以 stale 关闭，修复闭环需复核 |
| **QwenPaw** | 16（8，50%） | 30（18/12，40%） | **v2.3.0.post1** | 中等偏上；插件化高投入，post1 回归需 48h 内处置 |
| **Hermes Agent** | **325**（28，8.6%） | **500**（399/101，20.2%） | **v0.23.2+canary** | 高活跃、高积压；serve→gateway 九段迁移带来架构级风险 |
| **AstrBot** | 12（6，50%） | 53（35/18，34%） | **v4.30.0-beta.1** | 高位活跃；工程化/性能优化推进，35 条待合并审查压力 |
| **DeepSeek Harness** | Discussions **162**；Issues/PR 未启用 | 无 PR 数据 | **dsh-v0.2.2-rc.5** | 讨论活跃；数据丢失/Windows 兼容/重试策略风险偏高，修复进度不可从 PR 观测 |

**数据结论**：OpenClaw 与 Hermes Agent 构成第一梯队（日 Issue/PR 更新 300–500 量级）；QwenPaw、AstrBot、Zeroclaw 为第二梯队（数十量级）；PicoClaw 明显低活跃；DeepSeek Harness 以 Discussions 驱动，工程协作透明度低于 GitHub Issues/PR 型项目。

---

## 3. OpenClaw 在生态中的定位

**优势：规模最大、迭代最快、具备 LTS 双通道。**  
OpenClaw 单日 Issues 更新 491、PR 更新 500，高于 Hermes 的 325/500，显著高于 QwenPaw 16/30、Zeroclaw 50/50、AstrBot 12/53。其 Issue 关闭率 26.9%、PR 合并/关闭率 42.8%，在大型项目中吞吐较强；同时发布 `extended-stable` 的 v2026.10.33，形成“主线高频 + LTS 稳定”的双轨节奏。

**技术路线差异：Gateway 中心化 + 状态库/迁移可靠性 + 多 Agent 编排。**  
OpenClaw 今日修复集中在更新磁盘预检、半切换 Git 更新、schema/数据库繁忙切换、K8s `fsGroup` 状态库损坏、多 Agent 兄弟结果丢失等，说明其核心不是单一聊天入口，而是**长期运行的个人 AI 助手运行时**。相较 Zeroclaw 的 SOP/安全治理、QwenPaw 的轻核心插件化、AstrBot 的多平台聊天适配器，OpenClaw 更偏通用 Agent 平台。

**社区规模与质量对比：反馈质量高，但高优 fix 供给偏紧。**  
OpenClaw 多个 P0/P1 附带复现步骤与源码定位，社区协作质量高；但 #153426（P0 记忆静默排除）、#198218（P1 活锁）、#191944（37 评论）等仍缺 fix PR。与 Hermes 的 8.6% Issue 关闭率相比，OpenClaw 消化能力更强；但与 QwenPaw/AstrBot 的 50% 关闭率相比，其高优 Issue 的决策周期仍是主要短板。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **升级/迁移/状态库可靠性** | OpenClaw、Zeroclaw、QwenPaw、Hermes、AstrBot、DeepSeek | OpenClaw #197083/#198218 要求升级事务化与可回滚；Zeroclaw registry V5 配置迁移；QwenPaw post1 Channel 回归 #8812；Hermes gateway 迁移 #143547；AstrBot v4.30 数据库/配置迁移；DeepSeek 更新失败 #13076 |
| **上下文/会话持久化与成本** | OpenClaw、Zeroclaw、QwenPaw、Hermes、AstrBot、DeepSeek | OpenClaw #119720 事件循环阻塞、#182891 prompt cache 失效；Zeroclaw #11696 每轮重建 system prompt 打穿缓存；QwenPaw #8802 上下文超限、#8712 DoomLoop；Hermes #99943 窗口误钳制、#97390 空闲压缩；AstrBot #10553 摘要失败后裁剪；DeepSeek #11577 重试策略 |
| **安全审批与权限边界** | Zeroclaw、QwenPaw、Hermes、PicoClaw、OpenClaw | Zeroclaw #12146 SSRF、#12144 文件越权、#12280 SOP 鉴权；QwenPaw #7757 破坏性命令、#8028 Office COM、#8810 Shell 邮件/上传审批；Hermes #59293 config set 绕过写保护、#62336 凭据落盘；PicoClaw #3456 reload 后审批 hook 失效；OpenClaw 记忆 provenance 需可恢复 |
| **静默失败与可观测性** | OpenClaw、Zeroclaw、QwenPaw、Hermes、DeepSeek | OpenClaw #153426 记忆根静默排除、#127195 无 reason code；Zeroclaw #9770 cron 改动静默丢弃、#9896 `Memory: none` 误报；QwenPaw #8798 配额错误裸暴露；Hermes #147839/#145215 无声失败；DeepSeek #11577 单条非法 tool_use 整轮硬失败 |
| **插件化与生态治理** | QwenPaw、OpenClaw、Hermes、AstrBot、DeepSeek | QwenPaw MCP/本地模型/Whisper 插件化、插件 SDK 1.1；OpenClaw GitHub 插件化、技能审计；Hermes plugin catalog SHA 固定；AstrBot 插件子模块 hook 绑定；DeepSeek 社区插件 dsh-seam/Tiana |
| **跨平台与多通道质量** | OpenClaw、Hermes、DeepSeek、AstrBot、QwenPaw | OpenClaw macOS 进程探测/Windows 插件膨胀；Hermes Windows 误判、iPhone Safari 白屏、CJK 输入法；DeepSeek Windows 时区/打开方式/工作区创建集群；AstrBot Windows stdout 阻塞、微信 session；QwenPaw 窄屏剪裁、Windows 长路径 |
| **模型/provider 兼容与缓存** | OpenClaw、Zeroclaw、AstrBot、DeepSeek | OpenClaw prompt cache 与转录重写；Zeroclaw Claude Opus 5.5 thinking signature、Anthropic 签名；AstrBot OpenRouter reasoning、Gemini 内置工具+函数调用；DeepSeek 搜索路由与 Search API |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 通用个人 AI 助手运行时、Gateway 生命周期、多 Agent 编排、LTS | 重度开发者、多 Agent/多通道生产用户 | Gateway 中心化；状态库/schema/Doctor/迁移事务是核心路径；主线 + extended-stable 双轨 |
| **Zeroclaw** | SOP 决策门、安全治理、多 Agent 权限、canonical registry V5 | 安全敏感团队、多 Agent 权限场景 | SOP fail-closed、MCP SSE 凭据治理、registry V5 配置迁移；PR 体量大但消化慢 |
| **PicoClaw** | 轻量运行、上游同步、WebSocket/通道认证 | 轻量部署/硬件相关用户、小规模社区 | 上游 main 同步 + 定制 forward-port；活跃度低，偏维护与兼容 |
| **QwenPaw** | 轻核心 + 插件化、多频道（钉钉/飞书/微信）、本地模型/Whisper/MCP | 中文多频道用户、插件开发者 | 非核心能力拆插件；插件 SDK 1.1；post1 补丁引入回归 |
| **Hermes Agent** | 统一 gateway、Desktop/CLI/TUI、Kanban、插件 catalog | 桌面 + 多工作流 + 任务编排用户 | 九段式 serve→gateway 迁移；高影响面架构切换；积压高 |
| **AstrBot** | 聊天机器人框架、多平台适配器、Dashboard、插件 | QQ/微信/Discord 等聊天机器人运维者 | Adapter + Plugin + Dashboard；工程化/CI/测试加速明显 |
| **DeepSeek Harness** | 桌面端 AI Harness/IDE、搜索、MCP、全栈发布插件 | 桌面 AI 编码/工具链用户、插件作者 | Electron 桌面端；Discussions 驱动、无 PR；搜索路由与 MCP 是主线 |

---

## 6. 社区热度与成熟度

**第一层：大规模高频迭代**
- **OpenClaw**：Issue/PR 均约 500/日，LTS 已发布；处于“快速迭代 + 稳定性收敛”并行阶段。成熟度最高，但高优 Issue 决策压力最大。
- **Hermes Agent**：Issue 325、PR 500，但 Issue 关闭率仅 8.6%；处于架构迁移高风险期，社区热度高、消化率低。

**第二层：中高活跃、治理/迁移期**
- **QwenPaw**：关闭率健康（Issue 50%、PR 40%），插件化投入期；post1 回归是短期风险。
- **AstrBot**：工程化推进明显，PR 待合并 35 条；成熟度较高，审查队列是瓶颈。
- **Zeroclaw**：安全清账日特征明显，但 PR 关闭率仅 4%，net backlog 扩张；治理强、功能交付慢。

**第三层：低活跃维护/收敛**
- **PicoClaw**：新开 0、待合 PR 0，关闭历史积压；队列收敛但安全关闭需复核，成熟度与维护节奏待确认。

**讨论驱动型**
- **DeepSeek Harness**：24h Discussions 162 条，社区活跃；但无 PR 可观测，P0 数据丢失与 Windows 兼容问题尚未见官方修复信号，处于早期/风险暴露期。

---

## 7. 值得关注的趋势信号

1. **“升级即风险”成为生态级痛点，事务化更新是刚需。**  
   OpenClaw #197083/#198218、QwenPaw #8812、Hermes #143547、AstrBot v4.30 迁移、DeepSeek #13076 均指向：升级/迁移必须支持 dry-run、回滚、状态库 schema 校验与健康状态暴露。开发者应将“可回滚发布”作为运行时基础设施，而非售后补丁。

2. **上下文与成本从“优化项”升级为“一等公民”。**  
   OpenClaw prompt cache 失效、Zeroclaw #11696 缓存打穿、Hermes #99943 窗口误钳制、AstrBot #10553 摘要失败、QwenPaw #8802 上下文超限，说明社区开始以账单和任务完成率审视上下文管理。建议产品化：上下文预算、压缩策略、缓存命中率、reasoning/signature 生命周期可观测。

3. **安全审批从“有拦截”走向“fail-closed + 可恢复”。**  
   Zeroclaw SOP 决策门、QwenPaw Shell/Office COM、Hermes config set 绕过、PicoClaw reload 后审批 hook 失效，均要求异常态默认拒绝、提供操作员清除路径与审计日志。多 Agent 场景下，权限作用域必须跨调用传递，不能因兄弟工作区或 peer 调用而逃逸。

4. **静默失败比崩溃更伤信任。**  
   OpenClaw 记忆根静默排除、Zeroclaw cron 静默丢改动、Hermes 消息静默丢失、DeepSeek MALFORMED_RESPONSE 整轮硬失败，共同指向 reason code、call-site tag、健康状态与用户可读归因。开发者应把“可诊断性”纳入 API 契约。

5. **插件化进入“零信任外部工具接入”阶段。**  
   QwenPaw MCP OAuth 2.1 + PKCE、Zeroclaw registry V5、Hermes plugin catalog SHA、AstrBot 插件 hook 绑定、DeepSeek 社区插件兼容检查，说明插件生态正从“能装”走向“可授权、可审计、可迁移”。插件 SDK 与注册表版本化将决定生态扩展速度。

6. **跨平台质量成为落地门槛，Windows/移动/CJK 不再边缘。**  
   Hermes 的 Windows/iPhone Safari/CJK 输入法、DeepSeek 的 Windows 时区/打开方式/工作区创建集群、AstrBot 的 Windows stdout 阻塞、QwenPaw 的窄屏剪裁，说明真实生产部署已覆盖多平台。测试矩阵需从 Linux 优先转向 Windows/macOS/移动端并重。

7. **维护带宽是比代码更稀缺的资源，社区协作质量高但需决策闭环。**  
   OpenClaw 高优 Issue 缺 fix PR、Hermes `needs-decision` 长期挂起、AstrBot 35 条待合并、Zeroclaw XL PR 堆叠，均反映 review/决策瓶颈。建议项目设置“清积压配额”、明确 `won't fix/转设计文档` 结论，并对长期高优项指定 owner，否则社区投入会因等待而流失。

**对开发者的参考价值**：下一阶段竞争点不在“是否支持多 Agent/插件/MCP”，而在**升级可回滚、上下文可预算、权限可审计、失败可解释、跨平台可运行**。OpenClaw 的规模与 LTS、Hermes 的 gateway 迁移、Zeroclaw 的安全清账、QwenPaw/AstrBot 的插件与多通道实践，分别提供了运行时、架构切换、安全治理、生态扩展的参考样本。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**日期：2026-11-19** ｜ 数据窗口：过去 24 小时 ｜ 数据来源：GitHub Issues / PRs

---

## 1. 今日速览

- 过去 24 小时 Issues 更新 **50 条**（新开/活跃 40，关闭 10），PR 更新 **50 条**（待合并 48，合并/关闭 2），**新版本 0 个**。
- 活跃度处于高位，但消化能力偏弱：Issues 新开/活跃与关闭之比约 **4:1**，PR 待合并与关闭之比高达 **24:1**，待办队列呈净扩张态势。
- 今日关闭的 10 个 Issue 高度集中在**安全加固与 SOP 正确性**（MCP SSE 凭据重定向、文件工具越权、Windows 安装包校验、`/api/docs` 脚本完整性、SOP 取消鉴权等），说明前期安全审计的整改正在批量落地。
- PR 侧由 NiuBlibing 的 **canonical registry V5 系列**（#12450/#12452/#12453/#12454/#12455/#12456/#12457，均为 XL 体量）主导，多为 stacked 依赖链，尚未进入合并阶段。
- v0.9.1 处于稳定化窗口：**#12401（Claude Opus 5.5 工具上下文塌陷，S1）** 与 **#12504（Anthropic thinking 块缺签名）** 是当前最需关注的阻断类缺陷。

---

## 2. 版本发布

今日**无新版本发布**。当前开发线仍为 `release:v0.9.1`，相关标签出现在 #12401、#12237 上。

---

## 3. 项目进展

今日共关闭 10 个 Issue、2 个 PR（可见的已关闭 PR 为 #12237）。**质量与安全维度推进明显，功能维度推进有限。**

### 已关闭 Issue（10/10 均可见）

| Issue | 主题 | 推进价值 |
|---|---|---|
| [#12146](https://github.com/zeroclaw-labs/zeroclaw/issues/12146) | MCP SSE 客户端接受服务端 `endpoint` 事件的绝对 URL，可把带密钥头的请求重定向到任意源（含本机 loopback admin 路由） | 高危 SSRF / 凭据外泄面收敛 |
| [#12144](https://github.com/zeroclaw-labs/zeroclaw/issues/12144) | `file_upload` / `file_upload_bundle` / `file_edit` 走 write 权限层，导致仅授 `Write` 的兄弟工作区可被读取 | 多智能体权限模型修正 |
| [#12122](https://github.com/zeroclaw-labs/zeroclaw/issues/12122) | Windows 预编译安装器（`setup.bat --prebuilt` 与 PowerShell 块）跳过 SHA256SUMS 校验 | 供应链完整性与 `install.sh` 对齐 |
| [#12053](https://github.com/zeroclaw-labs/zeroclaw/issues/12053) | `/api/docs` 在同源仪表盘加载未固定版本、无完整性校验的第三方脚本 | 仪表盘 XSS 面收敛 |
| [#12280](https://github.com/zeroclaw-labs/zeroclaw/issues/12280) | SOP 取消鉴权把"转发回环地址"误判为本地 | 鉴权边界修正 |
| [#12169](https://github.com/zeroclaw-labs/zeroclaw/issues/12169) | `send_message_to_peer` 使被调方脱离调用步骤的工具作用域运行 | 跨 agent 权限上下文传递修复 |
| [#11124](https://github.com/zeroclaw-labs/zeroclaw/issues/11124) | SOP 决策门在 mode 答案有效时忽略 strict fallback（**S0**），可导致高危自动启动 | 由 [#12237](https://github.com/zeroclaw-labs/zeroclaw/pull/12237) 以 fail-closed 方式修复 |
| [#9736](https://github.com/zeroclaw-labs/zeroclaw/issues/9736) | RPC prompt 路径从不写持久化 `SessionState` | 状态一致性与可观测性 |
| [#9655](https://github.com/zeroclaw-labs/zeroclaw/issues/9655) | 审批卡片无位置标识，同一消息产生的连续卡片无法区分 | 交互可用性 |
| [#10318](https://github.com/zeroclaw-labs/zeroclaw/issues/10318) | SOP 创作写入（create/save/delete/rename）并发序列化 | 数据一致性 |

### 已关闭 PR

- [#12237](https://github.com/zeroclaw-labs/zeroclaw/pull/12237) `fix(sop): use the fail-closed mode when the decision answers are unusable`（`release:v0.9.1`）——直接把 S0 级的 SOP 决策门问题改为"不可用即拒绝"，是今日安全性价比较高的一笔落地。

**整体评价：** 今日是典型的"安全清账日"——6 条安全类、3 条 SOP 正确性类问题同时关闭，项目在可信度上明显前进；但功能交付侧仅 1 个 PR 关闭，registry V5 主线仍停留在 review 阶段，**向前迈进的幅度约为"中等偏质量、偏慢于功能"**。

---

## 4. 社区热点

> 注：数据源中 PR 的评论数字段为 `undefined`，无法按讨论热度对 PR 排序，以下按体量与标签选取。

### 讨论最活跃的 Issues

| 排名 | Issue | 评论 | 核心诉求 |
|---|---|---|---|
| 1 | [#12401](https://github.com/zeroclaw-labs/zeroclaw/issues/12401) Claude Opus 5.5 工具上下文塌陷 | **6** | 旧工具轮次滑出 `keep_tool_context_turns` 窗口后 thinking signature 丢失，此后**每个请求都永久 400**，会话不可恢复 |
| 2 | [#9770](https://github.com/zeroclaw-labs/zeroclaw/issues/9770) `cron update` 静默丢弃 declarative job 改动 | 3 | 六列（command/name/expression/session_target/allowed_tools/uses_memory）改动无声失效 |
| 3 | [#9655](https://github.com/zeroclaw-labs/zeroclaw/issues/9655) 审批卡片无位置标识 | 3 | 连续卡片在点击前无法区分 |
| 4 | [#9736](https://github.com/zeroclaw-labs/zeroclaw/issues/9736) RPC prompt 不写 SessionState | 3 | 会话状态与实际执行不一致 |
| 5 | [#11696](https://github.com/zeroclaw-labs/zeroclaw/issues/11696) 每轮从磁盘重建 system prompt | 3 | 一次性格文件编辑即打穿所有活跃会话的 prompt cache，**直接体现为成本** |
| 6 | [#12504](https://github.com/zeroclaw-labs/zeroclaw/issues/12504) Anthropic 重放无签名 thinking 块 | 2 | 每次重试均失败于 `signature: Field required` |

### 最受关注的 PR（按体量/风险标签）

- [#12453](https://github.com/zeroclaw-labs/zeroclaw/pull/12453) `feat(web): edit canonical registry and select exact model references`（XL, risk:high）
- [#12452](https://github.com/zeroclaw-labs/zeroclaw/pull/12452) `feat(zerocode): configure and select canonical provider models`（XL）
- [#12450](https://github.com/zeroclaw-labs/zeroclaw/pull/12450) `feat(providers): adopt the canonical V5 registry and runtime model bindings`（XL, needs-author-action）
- [#12449](https://github.com/zeroclaw-labs/zeroclaw/pull/12449) `feat(mcp): generic OAuth 2.1 authorization-code + PKCE sign-in for remote MCP servers`（XL）

### 背后的诉求分析

1. **"长工具链会话必须能稳定跑完"** 是今日第一诉求。最热的两条（#12401、#12504）都指向 Anthropic 原生 provider 对 `thinking` 块与 signature 的生命周期管理，且与上下文裁剪策略耦合在一起——这说明 v0.9.x 在推理链路与上下文管理两个子系统的边界上存在设计缺口，而非单点 bug。
2. **成本敏感度上升**。#11696 把"prompt cache 被打穿"明确量化为成本问题（S2 - degraded behavior (cost)），用户开始以账单视角审视运行时行为。
3. **"静默失败"最招致不满**。#9770、#9896 都属于"系统不报错但行为与配置不符"，这类问题对信任的侵蚀大于崩溃。

---

## 5. Bug 与稳定性

今日可见 Bug 按严重度排列（S0 > S1 > S2）：

| 严重度 | Issue | 状态 | 是否已有 fix PR |
|---|---|---|---|
| **S1** 工作流阻断 | [#12401](https://github.com/zeroclaw-labs/zeroclaw/issues/12401) Claude Opus 5.5 工具上下文塌陷，v0.9.0 起**回归**，会话进入永久失败态 | OPEN / in-progress / `release:v0.9.1` | 数据中未见 |
| **S0** 数据丢失/安全 | [#11124](https://github.com/zeroclaw-labs/zeroclaw/issues/11124) SOP 决策门忽略 strict fallback | **CLOSED** | ✅ [#12237](https://github.com/zeroclaw-labs/zeroclaw/pull/12237) 已关闭 |
| **S2** 安全 | [#11823](https://github.com/zeroclaw-labs/zeroclaw/issues/11823) shell 扫描器漏检未加引号 heredoc 体内的命令替换 | OPEN | 未见 |
| **S2** | [#12504](https://github.com/zeroclaw-labs/zeroclaw/issues/12504) Anthropic provider 重放无签名 thinking 块，重试必失败 | OPEN / in-progress | 未见 |
| **S2** | [#9896](https://github.com/zeroclaw-labs/zeroclaw/issues/9896) 有效后端为 sqlite 时，启动横幅/`status` 仍报 `Memory: none` | OPEN | 未见 |
| **S2** | [#12559](https://github.com/zeroclaw-labs/zeroclaw/issues/12559) 配置 setter 接受 `inf` / `NaN` / `1e999` 写入十进制项 | OPEN（今日新增） | 未见 |
| **S2** | [#12558](https://github.com/zeroclaw-labs/zeroclaw/issues/12558) Matrix 在 `reply_in_thread=true` 时把审批提示发到房间时间线而非所在线程 | OPEN（今日新增） | 未见 |
| **S2** | [#12412](https://github.com/zeroclaw-labs/zeroclaw/issues/12412) OpenCode Go 拉取到 Zen 的 139 个模型目录 | OPEN / in-progress | 未见 |
| **S2** | [#12413](https://github.com/zeroclaw-labs/zeroclaw/issues/12413) OpenCode Go 上下文窗口发现返回空容量 | OPEN / in-progress | 未见 |
| **P1** | [#9770](https://github.com/zeroclaw-labs/zeroclaw/issues/9770) `cron update` 静默丢弃 declarative job 六列改动 | OPEN / accepted | 未见 |
| **P1** | [#9492](https://github.com/zeroclaw-labs/zeroclaw/issues/9492) 外部客户端轮换共享 OpenAI-Codex refresh token 后 `auth refresh` 死锁 | OPEN / accepted | 未见 |

**稳定性判断：**
- 今日**无新增 S0/S1**，最高级别新增为 S2（#12558、#12559），风险面可控。
- 但 **#12401 作为 v0.9.0 引入的回归已挂起 7 天仍未修复**，且直接阻断 Claude Opus 5.5 用户，是当前最该被指派的单点。
- #12401 与 #12504 疑似同源（都在 thinking/signature 与上下文裁剪的交界处），建议合并排查，避免两次修复互相冲突。

---

## 6. 功能请求与路线图信号

### 今日/近期新增需求

| Issue | 需求 | 落地可能性判断 |
|---|---|---|
| [#12562](https://github.com/zeroclaw-labs/zeroclaw/issues/12562) | Telegram `trusted_groups`：允许指定群内任意成员免 sender-allowlist 对话 | 中低——目前无对应 PR，且涉及鉴权模型扩展 |
| [#12561](https://github.com/zeroclaw-labs/zeroclaw/issues/12561) | Matrix 定期清理已拒绝的房间邀请，防止存储被灌满 | 中——属于 #12495 的收尾，改动范围小 |
| [#11768](https://github.com/zeroclaw-labs/zeroclaw/issues/11768) | Provider 429 尊重 HTTP `Retry-After` | **较高**——同源切片 #11767 已完成，仅剩该部分 |
| [#11050](https://github.com/zeroclaw-labs/zeroclaw/issues/11050) | 把原生 poll 纳入 per-recipient 出站限速队列 | 中——依赖 #10984 的 WhatsApp poll 能力 |
| [#9914](https://github.com/zeroclaw-labs/zeroclaw/issues/9914) | 明确并保持 Docker 一次性编码 CLI 的 workspace-root + 相对 cwd 契约 | 中——属 #9607 review 的 follow-up |
| [#10869](https://github.com/zeroclaw-labs/zeroclaw/issues/10869) | 避免 ZeroCode 对专用工具输入反复全量解析 | 中——性能类，需配合渲染层改动 |
| [#9685](https://github.com/zeroclaw-labs/zeroclaw/issues/9685) | `sops/cancel` JSON-RPC 方法 | **低（已显式 deferred）**，需等 #9476 合并后再激活 |

### 结合 PR 的路线图信号

1. **Provider 注册表 V5 将是下一版本主线。** #12450（V5 registry + runtime model bindings）明确写明"promote V4 configuration to V5"，一旦合入即为**配置格式迁移**，需提前准备迁移说明与回滚路径。该 PR 带 `needs-author-action`，当前阻塞在作者侧。
2. **远程工具与凭据治理是第二条主线。** #12449（MCP OAuth 2.1 + PKCE）与 #12408（WebUI 管理 scoped HTTP Basic/Bearer/X-API-Key 凭据，默认拒绝、换 origin 即撤权）方向一致，指向"零信任式的外部工具接入"。
3. **#10412 带 `breaking-change` + `priority:p1`**，把原子 session 所有权 claim 抽成共享 `SessionBackend` 契约。若合入，将影响所有 `SessionBackend` 实现方与 RPC/WebSocket 准入路径，需列入破坏性变更清单。
4. **频道侧需求（Telegram / Matrix / WhatsApp）目前只有 Issue、没有对应 PR**，短期进入版本的概率偏低，建议维护者在 roadmap 中显式排序，避免社区反复提同类需求。

---

## 7. 用户反馈摘要

**真实痛点（按情绪强度排序）**

1. **"一旦坏就永远坏"** —— #12401 用户描述为 "fails for good"，即会话进入不可恢复状态，只能丢弃重开。这类不可逆失败对日常使用的杀伤力远大于偶发报错。
2. **成本焦虑** —— #11696 明确指出编辑一次 personality 文件会让**所有在线会话**的 prompt cache 失效。这是典型的"运维动作引发全局成本抖动"。
3. **静默失效不可接受** —— #9770（cron 改动无声丢弃）、#9896（`Memory: none` 误报）都属于配置与实际不一致，用户无法从界面判断系统是否按预期工作。
4. **权限模型的语义漏洞** —— #12144 指出 `Write` 权限被用来**读取**兄弟工作区内容；#12169 指出工具作用域在跨 agent 调用时丢失。提出者均为深度使用者，反馈质量高。
5. **平台细节已进入生产场景** —— #12558（Matrix 审批提示跑到房间时间线）、#12562（Telegram 群组信任）说明用户已在多频道、多租户环境下真实部署，而非试用。

**满意/正向信号**

- 响应速度可接受：#12504 于 11-17 创建，11-18 即获 2 条评论并进入 `status:in-progress`；多条安全 Issue 在 1–2 周内闭环。
- 安全类 Issue 批量关闭且描述详实（附文件行号、复现路径），说明**安全审计 → 修复 → 关闭**的链路是通的。

**不满意信号**

- P1 级问题长期挂起：#9492（约 114 天）、#9770（约 106 天）仍在 OPEN，容易累积"提了也没人管"的观感。
- 3 条 XL 系列 PR 带 `needs-author-action`，评审意见与作者响应之间存在往返延迟。

---

## 8. 待处理积压

以下为长期未闭环、且重要性较高的事项，建议维护者本周内明确 owner 或状态：

| 编号 | 类型 | 挂起时长（约） | 状态标签 | 风险提示 |
|---|---|---|---|---|
| [#9492](https://github.com/zeroclaw-labs/zeroclaw/issues/9492) | Bug / P1 | **114 天** | `status:accepted`, `risk:high` | 最久的 P1；OAuth 单次性 refresh token 轮换导致的鉴权死锁，影响所有共用 Codex 凭据的用户 |
| [#9685](https://github.com/zeroclaw-labs/zeroclaw/issues/9685) | Enhancement | 109 天 | 显式 `deferred` | 状态明确，但依赖 #9476，需跟踪依赖是否已解除 |
| [#9770](https://github.com/zeroclaw-labs/zeroclaw/issues/9770) | Bug / P1 | 106 天 | `status:accepted`, `risk:high` | 静默数据丢失类，影响 cron 声明式作业的可维护性 |
| [#9896](https://github.com/zeroclaw-labs/zeroclaw/issues/9896) | Bug / P2 | 101 天 | `status:accepted` | 状态误报，修复面小，适合作为新人切入点 |
| [#9914](https://github.com/zeroclaw-labs/zeroclaw/issues/9914) | Enhancement / P2 | 100 天 | `status:accepted` | Docker 工作目录契约缺失，影响一次性编码 CLI 的可用性 |
| [#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391) | PR / XL | **85 天** | `needs-author-action`, `risk:high` | bounded delegate 的工作区/工具上限/命令策略约束，安全相关，长期滞留 |
| [#10412](https://github.com/zeroclaw-labs/zeroclaw/pull/10412) | PR / XL | 84 天 | `breaking-change`, `priority:p1` | 破坏性变更 + P1，越晚合入迁移成本越高，建议尽快给出取舍结论 |
| [#10869](https://github.com/zeroclaw-labs/zeroclaw/issues/10869) | Bug / P2 | 65 天 | `status:accepted`, `zerocode` | 性能类，影响 ZeroCode 卡片渲染 |
| [#11050](https://github.com/zeroclaw-labs/zeroclaw/issues/11050) | Feature / P3 | 58 天 | `status:in-progress` | 优先级低，可作为 backlog 清理对象 |
| [#11289](https://github.com/zeroclaw-labs/zeroclaw/pull/11289) | PR / XL | 50 天 | **`do-not-merge`** | 带 `do-not-merge` 且已挂 50 天，建议在 PR 中写明阻塞原因与解除条件，否则会持续占用评审注意力 |

**额外提醒：** [#12401](https://github.com/zeroclaw-labs/zeroclaw/issues/12401) 虽仅挂起 7 天，但为 S1 且带 `release:v0.9.1` 标签，应优先于上述多数 P2 项处理。

---

### 数据说明与口径

- 今日 Issues 更新 50 条，本报告仅基于其中**按评论数排序的前 30 条**做定性分析；PR 同理，仅覆盖前 20 条。
- 数据源中 PR 的 `评论数` 字段为 `undefined`，因此 PR 热度以体量（XL）、风险标签与跨模块覆盖面替代衡量，未做评论数排名。
- "合并/关闭"在数据中合并统计（共 2 条），无法区分 merged 与 closed，报告中统一表述为"关闭"。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-11-19）

> 数据口径：过去24小时（截至2026-11-19）。PR 状态为 CLOSED，数据源未细分“已合并/仅关闭”，下文统称“关闭”。部分 PR 评论数显示为 undefined，无法量化讨论热度。

## 1. 今日速览

- PicoClaw 过去24小时活跃度偏低：新开/活跃 Issue 0 条、待合并 PR 0 条、新版本 0 个。
- 队列收敛明显：关闭 1 条 Issue、4 条 PR，且 4 条 PR 均创建于 2026 年 3—5 月，属于历史积压清理而非当日新增开发。
- 唯一可量化的社区讨论集中在安全 Issue #3456（2 条评论），涉及 reload 时 approval hook 初始化失败导致工具未受审批门控的高风险场景。
- 整体健康度判断：维护队列短期改善，但安全类 Issue 以 stale 状态关闭，修复闭环质量与后续发布节奏仍需维护者确认。

## 2. 版本发布

过去24小时新版本发布 0 个，最新 Releases 为空。无破坏性变更或迁移注意事项可报告。

## 3. 项目进展

今日关闭 4 条 PR，待合并 PR 为 0。由于未提供 merged 标记，无法确认代码是否全部落地，但可确认维护队列明显收敛。

- [#2810 CLOSED] Sync with upstream/main (1095 commits) + forward-port magicform customizations  
  链接：https://github.com/sipeed/picoclaw/pull/2810  
  摘要显示该 PR 合并约 1095 个上游提交，并将 6 个定制提交 forward-port 到上游重构后的目录结构。若已实际合并，将显著缩小与上游的同步差距，并适配 agent loop、tools、channel config 等布局变化；若仅为关闭，需确认是否有替代同步 PR。

- [#2363 CLOSED] Fix WebSocket authentication and standardize header casing  
  链接：https://github.com/sipeed/picoclaw/pull/2363  
  针对 WebSocket 认证与 header 大小写标准化，关联 #2354 等 Issue。属于 channel/通信层修复，若落地可改善 WebSocket 接入兼容性和认证稳定性。

- [#1546 CLOSED] fix: merge PR #1480 #1479 #1478 #1473 #1467  
  链接：https://github.com/sipeed/picoclaw/pull/1546  
  聚合多个修复 PR，反映维护者/贡献者在集中清理分散补丁。具体修复内容未在摘要展开。

- [#1558 CLOSED] fix: merge PR #1344 #1342 #1341 #1331  
  链接：https://github.com/sipeed/picoclaw/pull/1558  
  同样为聚合修复 PR，关闭后有助于降低历史 PR 积压；具体影响需结合被聚合 PR 复核。

**推进幅度评估**：以队列指标看，24小时内关闭 4 条 PR 和 1 条 Issue，待合并 PR 归零，积压清理效果明显；但今日无新 PR、无新版本，代码净推进量无法从现有数据量化。

## 4. 社区热点

今日讨论最集中的条目为：

- [#3456 CLOSED] [stale] Security: a failed approval-hook re-initialization during reload leaves the gateway serving with tools ungated  
  链接：https://github.com/sipeed/picoclaw/issues/3456  
  数据：评论 2 条，👍 0；创建于 2026-11-04，更新于 2026-11-18，已关闭并带 stale 标签。  
  分析：该 Issue 指向 gateway reload 流程中的安全一致性问题——旧 approval hook 被拆除后，新 hook 初始化失败可能导致 gateway 继续运行但工具调用不再受审批门控。背后的核心诉求是：reload 应具备原子性/失败回滚，审批 hook 初始化失败时应默认拒绝工具执行，并提供明确健康状态或错误暴露。虽然评论数不高，但安全影响高于普通讨论热度。

其余 PR 评论数未提供或为 undefined，无法判断讨论活跃度。PR 👍 均为 0。

## 5. Bug 与稳定性

按严重程度排列：

1. **高：审批门控失效风险**  
   [#3456](https://github.com/sipeed/picoclaw/issues/3456) 描述 reload 时 approval-hook 重新初始化失败，gateway 可能继续以“工具未门控”状态服务。  
   状态：CLOSED，[stale]，评论 2。  
   Fix PR：今日数据中未见明确对应 fix PR；Issue 以 stale 关闭不等同于修复确认，建议维护者复核根因、回归测试与关闭原因。

2. **中：WebSocket 认证与 header 兼容问题**  
   [#2363](https://github.com/sipeed/picoclaw/pull/2363) 修复 WebSocket 认证并标准化 header casing，关联 #2354 等。  
   状态：CLOSED。  
   Fix PR：该 PR 自身即修复项；是否已合并需结合仓库状态确认。

3. **未分级：批量修复聚合**  
   [#1546](https://github.com/sipeed/picoclaw/pull/1546)、[#1558](https://github.com/sipeed/picoclaw/pull/1558) 聚合多个修复 PR。  
   状态：CLOSED。  
   说明：摘要未展开具体 Bug 与严重性，无法逐项评估回归风险。

## 6. 功能请求与路线图信号

- 今日无新功能请求 Issue。
- 从已关闭 PR 看，路线图信号偏“维护与兼容”而非新功能：
  - [#2810](https://github.com/sipeed/picoclaw/pull/2810) 显示项目持续跟踪上游并 forward-port 定制能力，后续版本可能受益于上游同步与目录重构适配。
  - [#2363](https://github.com/sipeed/picoclaw/pull/2363) 显示 channel/WebSocket 认证与协议标准化仍是稳定性重点。
  - [#1546](https://github.com/sipeed/picoclaw/pull/1546)、[#1558](https://github.com/sipeed/picoclaw/pull/1558) 体现社区补丁聚合与积压清理需求。
- 由于无 merged 标记和新版本发布，当前数据不足以判断哪些功能会进入下一版本。

## 7. 用户反馈摘要

> 评论正文未提供，以下基于 Issue/PR 摘要与标题提炼，非直接评论引用。

- **安全与 reload 可靠性是核心痛点**：[#3456](https://github.com/sipeed/picoclaw/issues/3456) 反映用户/审计者对 reload 期间安全钩子恢复失败的担忧，期望失败时默认拒绝工具调用、保持旧 hook 或回滚，并暴露明确健康状态。
- **通信通道兼容性影响接入体验**：[#2363](https://github.com/sipeed/picoclaw/pull/2363) 指向 WebSocket 认证和 header 大小写问题，属于实际接入与互操作场景中的稳定性痛点。
- **社区补丁分散、合并成本偏高**：[#1546](https://github.com/sipeed/picoclaw/pull/1546)、[#1558](https://github.com/sipeed/picoclaw/pull/1558) 通过聚合多个修复 PR 关闭，侧面反映历史补丁积压较多，维护者需要批量整合。

## 8. 待处理积压

严格按今日数据，待合并 PR 为 0，新开/活跃 Issue 为 0，未列出明确 open 积压项。但仍建议维护者关注：

- [#3456](https://github.com/sipeed/picoclaw/issues/3456)：安全类 Issue 以 stale 状态关闭，需复核是否已有实际修复、回归测试和替代跟踪 Issue；若未修复，建议重开或补充安全公告/修复 PR。
- [#2810](https://github.com/sipeed/picoclaw/pull/2810)：约 1095 个上游提交的大同步 PR 已关闭，建议确认是否已合并或由后续 PR 接替，避免上游同步工作丢失。
- [#2363](https://github.com/sipeed/picoclaw/pull/2363)：WebSocket 认证修复已关闭，建议确认最终落地情况，尤其是 header casing 标准化是否覆盖相关通道。
- [#1546](https://github.com/sipeed/picoclaw/pull/1546)、[#1558](https://github.com/sipeed/picoclaw/pull/1558)：聚合修复已关闭，建议抽查被聚合 PR 的最终状态，避免“关闭聚合 PR 但子修复未落地”的遗漏。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报

**报告日期：2026-11-19** · 数据窗口：2026-11-18 → 2026-11-19（UTC）

---

## 1. 今日速览

QwenPaw 今日维持**高活跃度**：24 小时内 Issues 更新 16 条（8 开 / 8 关）、PR 更新 30 条（18 待合并 / 12 已合并或关闭），并发布 **v2.3.0.post1** 补丁版本。项目主线清晰聚焦于**「轻核心 + 插件化」重构**——MCP、本地模型管理、本地 Whisper 三条非核心能力正并行拆分为插件，同时官方通过 #8808 正式对外公布这一路线图。安全治理是第二条主线，今日合并/提交了 3 个安全相关 PR（破坏性命令、Office COM、Shell 邮件/上传审批）。稳定性方面，DoomLoopGate 死循环问题的修复分支已闭环（#8701 关闭），但主分支修复 #8713 仍在评审；同时 `v2.3.0.post1` 升级引入两处回归（#8811 窄屏剪裁、#8812 WARNING 刷屏与 Channel 默认不可用）需重点关注。整体健康度**中等偏上**：关闭率健康，但 20+ 天的长期 PR 积压与 review 集中度是潜在瓶颈。

---

## 2. 版本发布

### 🚀 v2.3.0.post1（2026-11-18 发布）

> Release 页：https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.0.post1
> 安装验证跟踪：[#8807](https://github.com/agentscope-ai/QwenPaw/issues/8807)

**更新内容（基于发布说明）：**

| 类别 | 变更 | 关联 PR |
|---|---|---|
| feat(agent) | 将第三方 agent 提取为插件（插件化推进的正式落地点） | [#8426](https://github.com/agentscope-ai/QwenPaw/pull/8426) |
| feat(console) | 在后续草稿中引用响应的选区内容 | [#8609](https://github.com/agentscope-ai/QwenPaw/pull/8609) |
| fix(console) | 恢复 Safari 浏览器支持（发布说明被截断） | — |

**破坏性变更评估：** 作为 `.post1` 补丁版本，理论上应保持向后兼容；但「第三方 agent 提取为插件」属于架构级调整，**自定义 agent 集成方式可能需要适配新的插件接口**，建议依赖第三方 agent 的用户关注插件 SDK 1.1（#8764）的演进。

**迁移注意事项（来自社区反馈）：**

- ⚠️ 升级后 `qwenpaw update` 出现大量 WARNING 级 `startup_diagnostic` 日志刷屏，且**钉钉、飞书 Channel 默认不可用，需手动更新后才恢复** —— [#8812](https://github.com/agentscope-ai/QwenPaw/issues/8812)（OPEN，2 评论）
- ⚠️ 窄屏（375px 移动端 / 标准消息宽度）下整条消息文字被剪裁，超宽表格/代码块无法横向滚动，疑为 post1 回归 —— [#8811](https://github.com/agentscope-ai/QwenPaw/issues/8811)（OPEN，2 评论）

**建议：** 面向使用 Channel 集成或移动端访问的生产用户，建议暂缓升级或按 #8812 手动更新 Channel 插件后再上线。

---

## 3. 项目进展

### 今日已合并/关闭的重要 PR（12 条中精选）

| PR | 内容 | 意义 |
|---|---|---|
| [#8701](https://github.com/agentscope-ai/QwenPaw/pull/8701) | **fix(loop): 记录追加到同一条回复中的工具调用**（首次贡献者） | 修复 `DoomLoopGate` 在 agentscope 2.0.10 将多轮块累积到同一 assistant message 时永不触发的核心 bug，与 #8700 闭环 |
| [#8756](https://github.com/agentscope-ai/QwenPaw/pull/8756) | **fix(channels): 微信凭据按 agent 工作区隔离** | 解决同一安装中多 agent 无法持有独立微信账号的凭据污染问题 |
| [#7757](https://github.com/agentscope-ai/QwenPaw/pull/7757) | **fix(governance): 强制破坏性命令与系统凭据防护** | 补齐治理路径对灾难性命令的检测，默认 auto-deny 生效 |
| [#8028](https://github.com/agentscope-ai/QwenPaw/pull/8028) | **fix(security): 标记 shell 命令中的内联 Office COM 自动化** | 修复 Windows auto 模式 + 沙箱关闭时 agent 可劫持用户 PowerPoint/Excel 单实例的风险（对应 #8002） |
| [#8730](https://github.com/agentscope-ai/QwenPaw/pull/8730) | **fix(pawapp): 关闭 chat/tool-call SSE 流的代理缓冲** | 跟进 #8522，修复 pawapp 与 tool-call 两个 SSE 端点的流式响应延迟 |
| [#8809](https://github.com/agentscope-ai/QwenPaw/pull/8809) | chore: 版本号提升至 **2.3.1b1** | 为下一个 beta 周期开启版本线 |

**推进力度评估：** 今日合并的 PR 以**安全加固 + 稳定性修复**为主，直接关闭了 8 条 Issue，其中 4 条为跨版本的长期问题（#7197、#8002、#8718、#8736）。项目在「安全边界收紧」与「Channel 可靠性」两条线上实质向前推进，但**核心插件化功能尚未在今日合并**——大型重构 PR 仍处于待评审状态。

### 插件化重构——正在推进的三条并行线

| PR | 规模 | 内容 |
|---|---|---|
| [#8469](https://github.com/agentscope-ai/QwenPaw/pull/8469) | size/XXXL | 将 MCP 提取为插件 |
| [#8499](https://github.com/agentscope-ai/QwenPaw/pull/8499) | size/XXXL | 将本地模型管理（下载 / llama.cpp / 服务生命周期）提取为插件 Provider |
| [#8431](https://github.com/agentscope-ai/QwenPaw/pull/8431) | size/XXXL | 将本地 Whisper 转为 SDK 插件，生命周期由框架托管 |

这三个 PR 均为 10 月下旬提交、更新至 11-18，尚未合入，是下一阶段项目形态的决定性变更。

---

## 4. 社区热点

### 🔥 讨论最活跃

**① [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) — 插件主题扩展点（21 条评论，持续 49 天）**
- 作者 @BeiMu-new，2026-10-01 创建，至今 OPEN
- **诉求：** Console 主题系统（#7741）仅允许用户选色板，但插件只有一个 `colorPrimary` 旋钮，无法覆盖语义化 token。插件作者需要「语义 token 覆盖层」来做真正的主题适配。
- **已有关联行动：** [#8787](https://github.com/agentscope-ai/QwenPaw/pull/8787) 已提交，将 `bg / surface / surface-raised / border / text / text-secondary` 等语义色角色暴露给插件主题（#8422 已落地第一批 6 个角色）。
- **分析：** 这是插件生态从「能装」走向「能定制」的标志性需求，讨论深度高，预计将随插件 SDK 1.1 一同落地。

**② [#8808](https://github.com/agentscope-ai/QwenPaw/issues/8808) — 官方路线图：「更轻、更易扩展」（1 👍，1 评论）**
- 作者 @Luohh5（同时也是 #8426、#8469 的作者）
- **内容：** 宣布 v2.3.0 是「轻量化 + 可扩展」的第一步，计划逐步将非核心功能与模块转为插件，保留更精简的核心 harness。
- **分析：** 这是对全部插件化 PR 的官方背书，社区可据此判断 roadmap 优先级。

### 💬 高评论已关闭 Issue（反映真实痛点）

- [#8806](https://github.com/agentscope-ai/QwenPaw/issues/8806)（3 评论，CLOSED）— agent 在回复结束后 2~3 秒又自发开始新一轮工具调用并循环，上下文出现「从未发送过的 user 消息」。**高危会话可控性问题**，今日关闭。
- [#8627](https://github.com/agentscope-ai/QwenPaw/issues/8627)（3 评论，CLOSED）— Windows 11 + Git 长路径 + 微信 Channel 卡在 `DEPENDENCY_ENVIRONMENT_AMBIGUOUS`。Windows 兼容性长期痛点。
- [#8798](https://github.com/agentscope-ai/QwenPaw/issues/8798)（3 评论，CLOSED）— `MODEL_QUOTA_EXCEEDED` 直接抛给用户的体验问题，用户抱怨「不应把上游配额错误裸暴露」。

---

## 5. Bug 与稳定性

### 🔴 高严重度（升级回归 / 数据/会话安全）

| 问题 | 状态 | Fix PR | 说明 |
|---|---|---|---|
| [#8806](https://github.com/agentscope-ai/QwenPaw/issues/8806) 上下文中出现从未发送的 user 消息并驱动 agent 继续执行 | ✅ CLOSED | 未在 PR 列表体现 | 会话可控性 & 潜在上下文污染，最严重，已关闭 |
| [#8812](https://github.com/agentscope-ai/QwenPaw/issues/8812) post1 后 WARNING 刷屏、钉钉/飞书 Channel 默认不可用 | 🔴 OPEN | 暂无 | **post1 升级回归**，影响 Channel 可用性 |
| [#8811](https://github.com/agentscope-ai/QwenPaw/issues/8811) 窄屏消息剪裁、超宽内容无法横向滚动 | 🔴 OPEN | 暂无 | **post1 回归**，移动端可用性受损 |

### 🟠 中严重度（功能中断 / 安全）

| 问题 | 状态 | Fix PR | 说明 |
|---|---|---|---|
| [#8802](https://github.com/agentscope-ai/QwenPaw/issues/8802) 同轮连续调用 MCP 后 `MODEL_CONTEXT_LENGTH_EXCEEDED` 任务中断 | 🟠 OPEN | 暂无 | 单轮 20 次工具调用后上下文超限，与 #8312 同源 |
| [#8712](https://github.com/agentscope-ai/QwenPaw/issues/8712) 重复工具调用永不中断，DoomLoopGate 每轮最多记录一次 | 🟠 OPEN | [#8713](https://github.com/agentscope-ai/QwenPaw/pull/8713) 待合并 | #8701 已关闭但仅覆盖「追加到同一 message」场景，#8713 是更完整修复 |
| [#8810](https://github.com/agentscope-ai/QwenPaw/pull/8810) Shell 邮件发送 / HTTP 写入 / 上传在 AUTO、SMART 模式下无审批 | 🟠 待合并（安全） | 本 PR 即修复 | 补 Tool Guard 与治理规则缺失，风险面大 |

### 🟡 低-中严重度（性能 / 兼容）

| 问题 | 状态 | 说明 |
|---|---|---|
| [#8805](https://github.com/agentscope-ai/QwenPaw/issues/8805) 基础镜像缺少 `MALLOC_ARENA_MAX` 上限，56 核机器上 glibc 29 个 arena 抢占 1.78 GB | 🟡 OPEN | #8654 只修了 Creator 入口，`deploy/entrypoint.sh` 未覆盖 |
| [#8718](https://github.com/agentscope-ai/QwenPaw/issues/8718) Hub 网关 Anthropic/MiniMax 预设立即失败（`provider_headers()` 调用缺失方法） | ✅ CLOSED | 模型接入阻塞，已解决 |
| [#8736](https://github.com/agentscope-ai/QwenPaw/issues/8736) 子代理完成错误触发「回复完成」桌面通知 | ✅ CLOSED | 通知噪音 |
| [#8627](https://github.com/agentscope-ai/QwenPaw/issues/8627) Windows Git 长路径 + 微信 Channel 卡死 | ✅ CLOSED | Windows 兼容性 |

**趋势判断：** 今日关闭 8 条 Issue 中至少 4 条为长期存在的稳定/安全问题，说明**修复节奏良好**；但 `post1` 引入的 2 条新回归（#8811、#8812）拉高了短期风险，建议维护者优先响应。

---

## 6. 功能请求与路线图信号

### 明确将进入下一版本的候选

| 需求 | Issue / 依据 | 判断 |
|---|---|---|
| **插件主题语义 token 扩展点** | [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) + PR [#8787](https://github.com/agentscope-ai/QwenPaw/pull/8787) 已提交 | 🟢 高概率，PR 已就绪 |
| **插件 SDK 1.1（身份/权限/资源生命周期）** | PR [#8764](https://github.com/agentscope-ai/QwenPaw/pull/8764)（size/XXXL，11-16 提交） | 🟢 高概率，是插件化重构的底座 |
| **媒体内联预算强制与拒后重缩放** | PR [#8785](https://github.com/agentscope-ai/QwenPaw/pull/8785)（fix/media，11-17 提交） | 🟢 高概率，且为 #8632 的直接补丁 |
| **Shell 危险操作审批（邮件/HTTP 写/上传）** | PR [#8810](https://github.com/agentscope-ai/QwenPaw/pull/8810) | 🟢 高概率，安全优先 |
| **启动性能：延迟加载 Anthropic/Gemini SDK** | PR [#8804](https://github.com/agentscope-ai/QwenPaw/pull/8804) | 🟡 中概率，收益明确但需回归验证 |
| **插件化：MCP / 本地模型管理 / 本地 Whisper** | PR [#8469](https://github.com/agentscope-ai/QwenPaw/pull/8469) / [#8499](https://github.com/agentscope-ai/QwenPaw/pull/8499) / [#8431](https://github.com/agentscope-ai/QwenPaw/pull/8431) | 🟡 中概率（本周期内），三个 XXXL 级变更合并节奏取决于评审带宽，预计分版本逐步落地 |

### 路线图信号

- **#8808（官方声明）** 确立了「非核心模块 → 插件」的长期方向，意味着未来 Release Note 中 **feat(x): extract … into plugin** 将成为高频句式。
- **#8712 / #8713** 表明社区对「agent 自我循环可控性」有持续关注，DoomLoop 机制可能在后续版本被强化（如按工具签名去重、跨 message 计数）。
- **#8802** 暴露出「同轮连续 MCP 调用 → 上下文爆炸」的架构性问题，**上下文预算管理**是下一个值得投入的方向，目前尚无对应 PR。

---

## 7. 用户反馈摘要

**😣 主要痛点**

1. **升级体验脆弱**：多位用户反映从 2.3.0 升到 2.3.0.post1 后出现「此前历次升级从未出现的」WARNING 噪音，且 Channel（钉钉/飞书）默认失效，需要手动更新才可用（#8812）。用户对补丁版本引入 UI/日志回归的容忍度较低。
2. **上下文与配额错误裸暴露**：#8798 用户对 `MODEL_QUOTA_EXCEEDED … Sign up for free to continue` 直接弹给终端用户表达强烈不满（"this should not…"）；#8802 用户报告连续 MCP 调用后 `MODEL_CONTEXT_LENGTH_EXCEEDED` 中断任务，认为系统应在中途主动压缩或提示。
3. **Agent 自主行为边界**：#8806 描述的「回复结束后 2~3 秒又自行开始新一轮工具调用并循环」是典型的失控感体验，虽然已关闭，但暴露出用户对 agent 生命周期可见性的需求。
4. **Windows / 移动端适配薄弱**：#8627（Windows Git 长路径 + 微信）、#8811（375px 移动端消息剪裁）说明跨平台体验仍是短板。

**😀 正面信号**

- #8808 获得 👍，社区对官方「轻量 + 插件化」方向表示认可。
- 用户在 Issue 中主动提供详尽的环境表、复现步骤、dump 文件（#8806、#8627、#8811 均格式规范），**报告质量高**，利于维护者定位。
- 首次贡献者 PR（#8701）被接受，说明社区参与门槛友好。

**🗣️ 使用场景观察**

- 多 agent 单机部署（#8756 微信凭据隔离）已成为真实生产场景。
- Docker 部署（`agentscope/qwenpaw:v2.3.0`）+ 多核主机（#8805 56 核）是主要运行形态，对**内存效率**敏感。
- MCP 工具被高频、连续调用（#8802 单轮 20 次），是重负载用户的核心工作流。

---

## 8. 待处理积压

### ⏳ 长期未合并的 OPEN PR（按等待时长排序）

| PR | 创建时间 | 已等待 | 类型 | 提醒 |
|---|---|---|---|---|
| [#8268](https://github.com/agentscope-ai/QwenPaw/pull/8268) fix(task_tracker): 绑定 run 完成回调并始终清理 | 2026-10-16 | **34 天** | 稳定性 | 修复 run 永久 `running` 的泄漏，影响长会话 |
| [#8308](https://github.com/agentscope-ai/QwenPaw/pull/8308) test(api): 缺失 provider 返回 404 | 2026-10-18 | **32 天** | 测试 | 小而独立，可快速合入 |
| [#8512](https://github.com/agentscope-ai/QwenPaw/pull/8512) fix(providers): 从错误文本读取网关状态码 | 2026-10-30 | **20 天** | 健壮性 | 与 #8718 同类问题，建议一并处理 |
| [#8487](https://github.com/agentscope-ai/QwenPaw/pull/8487) fix(scroll): 识别 url 引用媒体 | 2026-10-29 | **21 天** | 上下文压缩 | 影响 scroll folding 正确性 |
| [#8133](https://github.com/agentscope-ai/QwenPaw/pull/8133) fix(console): 修复中文 Markdown 强调边界 | 2026-10-08 | **42 天** | CJK 体验 | 中文用户长期痛点，已 Under Review |
| [#8431](https://github.com/agentscope-ai/QwenPaw/pull/8431) feat(local whisper): 转为 SDK 插件 | 2026-10-26 | **24 天** | 插件化 | XXXL，需与 #8764 协同评审 |

> 注：上表多为 `passionworkeer`、`BeiMu-new`、`lalaliat` 等少数贡献者的独立 PR，**review 带宽可能是主要瓶颈**。

### 📌 长期 OPEN 的高热度 Issue

| Issue | 创建 | 持续 | 评论 | 状态 |
|---|---|---|---|---|
| [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) 插件主题扩展点 | 2026-10-01 | **49 天** | 21 | OPEN，已有 #8787 部分实现，建议明确剩余范围与关闭条件 |
| [#8812](https://github.com/agentscope-ai/QwenPaw/issues/8812) post1 WARNING/Channel 回归 | 2026-11-18 | 1 天 | 2 | OPEN，**post 版本回归，建议 24h 内响应** |
| [#8811](https://github.com/agentscope-ai/QwenPaw/issues/8811) 窄屏剪裁回归 | 2026-11-18 | 1 天 | 2 | OPEN，post 版本回归 |
| [#8805](https://github.com/agentscope-ai/QwenPaw/issues/8805) 镜像缺少 MALLOC_ARENA_MAX | 2026-11-18 | 1 天 | 1 | OPEN，与已合并 #8654 同源，修复成本低 |

---

## 附录：项目健康度速览

| 指标 | 数值 | 评价 |
|---|---|---|
| 当日 Issue 关闭率 | 8/16 = **50%** | 🟢 健康 |
| 当日 PR 合并/关闭率 | 12/30 = **40%** | 🟡 中性（大量新提交涌入） |
| 待合并 PR 数 | 18 | 🟡 偏高 |
| 超 20 天未合并 PR | **6 个** | 🟠 需关注 review 瓶颈 |
| 当日安全相关 PR | 3（#7757、#8028 已关，#8810 待合） | 🟢 响应积极 |
| 当日新回归 | 2（#8811、#8812） | 🔴 需 48h 内处置 |
| 主要贡献者集中度 | passionworkeer(4)、cuiyuebing(3)、BeiMu-new(3)、lalaliat(2) | 🟡 社区活跃但核心 reviewer 集中 |

**结论：** QwenPaw 处于**插件化架构迁移的高投入期**，功能方向清晰、安全响应及时、关闭率健康；短期风险集中在 `v2.3.0.post1` 的两处回归与 20+ 天 PR 积压。建议维护者本周优先：(1) 处置 #8811 / #8812 回归；(2) 批量评审 #8308 / #8268 / #8512 等小体量 PR 以降低积压；(3) 为三个 XXXL 插件化 PR 设置明确的评审里程碑。

---

*本报告由 AI 智能体基于 QwenPaw GitHub 公开数据自动生成，数据截至 2026-11-19。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-19** · 仓库：`NousResearch/hermes-agent`

> 数据说明：本报告基于过去 24 小时的聚合指标，以及 Issues 评论数 Top 30、PR 评论数 Top 20 的样本切片。统计窗口内 Issues 更新 325 条、PR 更新 500 条、新版本发布 1 个。

---

## 1. 今日速览

项目保持着很高强度的迭代节奏：24 小时内 325 条 Issue 更新、500 条 PR 更新，并推送了 1 个 canary 版本；但 **待处理/合并比接近 4:1**（399 待合并 vs. 101 已合并/关闭），Issue 关闭率仅 8.6%，“流入快于消化”的形态明显。当前主线是一场 **serve→gateway 的九段式迁移**（`#157376`→`#157430` 的堆叠 PR 链），它同时也带来大量合并后问题（`#143547` 的单条讨论已达 83 条评论）。稳定性焦点集中在 **Kanban 调度器**、**Windows 桌面端**和**会话持久化**三条线上，其中 4 个 P1 级 Issue 均仍未关闭。安全侧两条长期 Issue（`#59293`、`#62336`）今日仍在活跃，说明审计类问题尚未得到收敛。

**活跃度评估：高（High）** — 但“高活跃 + 高积压”的组合意味着维护带宽是当前最稀缺的资源。

---

## 2. 版本发布

### v0.23.2+canary.20261118T064620Z（2026-11-18）

这是 v0.23.2 系列的自动构建版（canary 通道），随附多平台 Hermes Desktop 安装包（macOS Apple Silicon DMG 等，详见 Release 页下载表）。

> ⚠️ **说明与建议**：本次数据切片中的 Release Notes 仅包含标题、日期与下载表格，**未包含变更清单、破坏性变更声明或迁移注意事项**。作为 canary 通道构建，按项目惯例不建议直接用于生产环境；建议升级前核对 `v0.23.1 → v0.23.2` 的完整 CHANGELOG，并关注 `#143547`（v0.23.2 统一网关合并后遗留问题跟踪）中已登记的已知回归。

- Release 页：https://github.com/NousResearch/hermes-agent/releases

---

## 3. 项目进展

今日合并/关闭 PR 共 101 条（占当日 PR 活动的 20.2%）。从可观测的 PR 切片看，推进集中在三个方向：

**(a) Gateway 架构迁移（当前最大工程主线）**
一系列堆叠 PR 正在把 `hermes dashboard` / `hermes serve` 的旧后台形态统一迁移到 gateway Webapp：
- `#157376` feat(gateway): 允许 `webapp.host` 绑定本机单 IP（LAN / Tailscale，IPv4/IPv6）— https://github.com/NousResearch/hermes-agent/pull/157376
- `#157387` fix(dashboard): 当 gateway 占用端口时，旧 `dashboard`/`serve` 能正确识别本 home — https://github.com/NousResearch/hermes-agent/pull/157387
- `#157393` feat(dashboard): `hermes dashboard password` 支持无 TTY 非交互设置凭据（适配脚本/容器）— https://github.com/NousResearch/hermes-agent/pull/157393
- `#157403` / `#157430` feat(gateway): `migrate --backends` 的 dry-run 计划输出与 apply/restore/status 全套（含按 home 的运行锁、回滚与 update marker）— https://github.com/NousResearch/hermes-agent/pull/157430

> 这一串是 9 段式迁移的第 2–6 段，属于高影响面改动，也是 `#143547` 那类合并后问题的直接来源。

**(b) 工具链可用性打磨**
- `#157545` 文件工具补齐：日志尾部、目录带大小列举、搜索完整性提示、`execute_code` 单元格直出结果 — https://github.com/NousResearch/hermes-agent/pull/157545
- `#157517` 终端工具描述中加入引导语，使 Opus 在有文件工具时基本改用文件工具 — https://github.com/NousResearch/hermes-agent/pull/157517
- `#157646` `read_file` 遇到超长单行（压缩包/JSONL）时给出继续读取的路径 — https://github.com/NousResearch/hermes-agent/pull/157646

**(c) 插件生态维护**
`#157643` Worktable 0.1.5、`#157640` laso-finance 1.1.4 —— 均为 catalog 版本/SHA 提升，属于低风险例行推进。

**今日关闭的 Issue（2 例可见）**
- `#71998` pre_llm_call 插件上下文在多模态图像轮次被丢弃 → 已关闭 https://github.com/NousResearch/hermes-agent/issues/71998
- `#135872` cua-driver 0.34 下 `computer_use` 元素点击报 `unknown argument element_index` → 已关闭 https://github.com/NousResearch/hermes-agent/issues/135872

**整体推进幅度**：架构层（gateway 统一）推进显著但风险同步外溢；工具层与插件层为稳健增量。以 20% 的消化率看，今日净推进入度**中等偏上，但积压增速更快**。

---

## 4. 社区热点

| 排名 | 条目 | 评论 | 关注点 |
|---|---|---|---|
| 1 | `#143547` Unified gateway (#106742) 合并后遗留问题 | 83 | 架构级 |
| 2 | `#59293` `hermes config set` 绕过系统配置写保护 | 29 | 安全 |
| 3 | `#119070` Kanban 卡片限流后成功却被永久判定 `blocker_auth` | 28 | 调度器 |
| 4 | `#145022` [P1] Kanban worker 大面积崩溃丢工作进度 | 26 | 稳定性 |
| 5 | `#62336` 终端环境快照把凭据类 env 落盘 | 20 | 安全 |

**分析**

- **`#143547`（83 评论）** 是今日的绝对中心。统一网关（#106742）于 10 月 14 日把 CLI、TUI、Desktop、API server、编辑器、消息机器人、cron、Kanban、Group Chat 的全部对话收敛到单一 gateway 进程，随之而来的是跨组件状态一致性、会话归属、resume 快照体积等连锁问题。83 条评论说明这不是“一个 bug”，而是**架构切换期的公共收容所**——社区在其中自发做分组归因。https://github.com/NousResearch/hermes-agent/issues/143547
- **`#59293`（29 评论，7 月提出至今未决）** 揭示了经典的“后门绕过”：approval layer 对 shell 写 `config.yaml` 会拦，但 `hermes config set` 走正门却能无提示关闭审批层。这是**审批模型完整性**的根本缺口，`needs-decision` 标签已挂 4 个月，属于需要立项而非打补丁的问题。https://github.com/NousResearch/hermes-agent/issues/59293
- **Kanban 调度器问题形成集群**：`#119070`、`#29458` 与 `#145022` 指向同一族缺陷——respawn guard 的状态机缺少操作员可干预的清除路径，且对限流、PR 关闭、gateway 停顿等外部事件不敏感。今日已有 `#157624` 尝试修复其中的配额头部分。https://github.com/NousResearch/hermes-agent/issues/119070
- **`#62336`（20 评论）** 是长期安全项：`tools/environments/base.py` 通过 `export -p` 把包括 Bitwarden Secrets Manager 注入的凭据整份落盘到 `cache/terminal/`。对于“个人 AI 助手”这类高权限常驻进程，凭据落盘等于把威胁模型从“进程内存”扩大到“磁盘持久化”。https://github.com/NousResearch/hermes-agent/issues/62336

---

## 5. Bug 与稳定性

按严重程度排列（P1 优先）。**当前 4 个 P1 Issue 均无直接对应的已合并 fix PR。**

### P1 — 高优先级

| Issue | 症状 | Fix PR 状态 |
|---|---|---|
| `#145022` Kanban worker 崩溃 | 多 worker 并发时，gateway 在 worker 保存阶段停顿 → `"Kanban execution unknown; retained by owner"`，exit code 1，**在途工作全部丢失**；单次停顿曾同时杀死 4 个 worker。 | 无直接 fix；相关但有距离的 `#157624` 仅处理配额挂起。 |
| `#79087` Windows Desktop 误判 | 运行时探测超时 → 健康安装被路由到首次引导，**并建议覆盖重装**。（原“双后端”结论已被作者撤回） | 无。 |
| `#147839` 会话持久化 | 单次 20s `worker_receipt_timeout` 即“毒化”store 并摧毁整个 turn，用户只看到 `No reply`；单一安装已出现 11 次。 | 无。 |
| `#145215` Owner forward 丢消息 | 会话 resume 快照 > 1 MiB（websocket 默认 max_size）后，非 owner 转发中断，**用户消息静默丢失**。 | 无。 |

### P2 — 功能性回归 / 数据一致性

| Issue | 症状 | Fix PR 状态 |
|---|---|---|
| `#156709` FooteredReply 破坏 deepcopy | `display.runtime_footer.enabled: true` 时，`gateway/session_events.py:publish()` 抛 `TypeError: missing 'footer'`，完成事件发布失败。**11-16 新报，疑似近期引入的回归。** | 无；建议优先处理，影响面是“所有开启 footer 的会话”。 |
| `#137287` Desktop 转录错乱 | 用户/助手消息随机重复、错位或整体消失。 | 无，`needs-repro`。 |
| `#119070` Kanban 永久 blocked | 限流一次后重试成功，但 `check_respawn_guard` 每 tick 都返回 `blocker_auth`，reviewer 永不 spawn。 | 间接：`#157624` fix(kanban) 处理 quota wall 挂起逻辑。 |
| `#29458` active_pr 守卫僵死 | PR 已关闭仍被判定为活跃，且**没有操作员清除路径**。 | 无，5 月提出至今未解。 |
| `#99943` 上下文窗口被误钳制 | 只要设置了 `model.ollama_num_ctx`，云 provider 的 1M 窗口被静默降到 65,536（v0.21.0 引入）。 | 无。 |
| `#126622` Windows `write_file` 永久拒写 | `stat()/fstat()` 的 `st_ctime_ns` 来源不一致，全盘符复现。 | 无。 |
| `#149979` 远程 gateway 媒体下载失败 | Bot Chat 会话下载 MEDIA 文件报 `Session not found`。 | 无；`#157642` 修复同类远程 Desktop 的 cwd 校验阻塞，可能同源。 |
| `#148538` iPhone Safari 白屏 | 缺 `requestIdleCallback` 导致 `/capabilities`、`/workspace` 全部渲染失败。 | 无。 |
| `#139002` Desktop 群组创建必失败 | `invalid_params`，`local_profiles()` 只认自身 profile。 | 无。 |
| `#98634` `file.attach` 引用失效 | 返回的 `@file:` 指向 `attachments/`，但权限根是 `cwd`，导致 prompt 展开永远拒绝。 | 无。 |
| `#128770` 无 WSL 机器弹安装框 | 纯 Windows 环境切换/新建会话时拉起 `wsl.exe` 安装提示，干扰性优于危害性。 | ✅ **有**：`#156661` fix(desktop): 无注册发行版时跳过 WSL 桥接 — https://github.com/NousResearch/hermes-agent/pull/156661 |
| `#140080` Termux 更新失败 | `os.link` 在 Android/bionic 不存在，且 fallback 只 catch `OSError`。 | 无。 |
| `#146254` 跨机 Bot DM 静默丢失 | legacy 路由拒绝 Desktop 的 `id` 参数。 | 无。 |
| `#106487` CJK 输入法不可靠 | Dashboard 聊天中拼音输入乱码/丢字，只剩粘贴可用（👍2）。 | 无。 |

### P3 — 次要

`#59293`（安全，见上）、`#62336`（安全，见上）、`#117894`（`background_review` 暂存队列无上限且不暴露，是 #105921 修复的二阶问题，今日仍活跃）。

**稳定性小结**：今日未见大面积新崩溃，但 **`#156709` 具备“新引入回归”的全部特征**（11-16 首报、单一配置开关触发、影响事件发布路径），建议维护者列为今日第一优先级复核对象。P1 集群的共同特征是**状态机缺少“补救出口”**——无论是 Kanban 守卫、会话 store 还是 owner 转发，一旦进入异常态就无法自愈，这是比单个 bug 更值得系统性对待的模式。

---

## 6. 功能请求与路线图信号

| 需求 | 信号强度 | 判断 |
|---|---|---|
| **可配置 temperature**（`#17565`，👍18，评论 14，4 月至今） | 🔥 高 | 全项目 👍 数最高的功能请求之一。硬编码 `_fixed_temperature_for_model()` 已导致实际幻觉投诉。实现成本极低、阻力主要在设计决策（`needs-decision`），**是最容易“低成本收割社区好感”的一项**，建议纳入 v0.24 前的窗口。 |
| **按渠道的后台空闲压缩**（`#97390`，9 评论） | 中 | 长驻 Telegram 会话在空闲期不压缩，导致下条消息必须等待 compaction。与 `#99943` 的窗口钳制 bug 强相关，两者宜合并规划。 |
| **Tool Search 延迟豁免白名单**（`#86620`，👍1） | 中 | 当前只能改源码 `_HERMES_CORE_TOOLS` 才能让某插件/MCP 工具常驻 eager。对插件生态扩展性是硬约束，与近期 plugin-catalog 的活跃度形成矛盾。 |
| **Codex Responses 的中间态消息**（`#142663`） | 中 | Telegram 多步任务只出最终回复，`interim_assistant_messages` 配置对 Codex 网关无效。影响“过程可见性”这一助手类产品的核心体验。 |
| **Desktop 按 profile 记忆上次会话**（`#77952`） | 中低 | 体验类，实现清晰，适合作为“顺手做掉”的入门 issue 吸引贡献者。 |

**已具备 PR 支撑、大概率进入下一版本的**：
- 文件工具四件套（`#157545`、`#157517`、`#157646`）— 已标 `ci-reviewed`，成熟度最高。
- Cron 夏令时重复触发修复（`#157639`，salvage 自 `#128024` + `#146444`）— 季节性但确定性强的正确性修复。
- 插件凭据归因生产者（`#156606`，`llm.credential_scope` / `llm.quota_observation`）— 为 AutoRouter 免费额度契约铺路，属于平台化埋点。

---

## 7. 用户反馈摘要

**真实痛点**

1. **“无声失败”是最伤信任的模式。** `#147839`（只显示 `No reply: Hermes couldn't save t…`）、`#145215`（消息静默丢失）、`#146254`（Bot DM 永不送达）、`#119070`（卡片永久卡死无提示）共同指向：**系统进入异常态时缺乏用户可读的归因**。用户能接受失败，不能接受“不知道为什么失败、也无法自救”。
2. **Windows 是今日质量洼地。** `#79087`（建议覆盖重装健康安装）、`#126622`（写入永久拒绝）、`#128770`（WSL 弹窗）三条独立路径，说明 Windows 平台路径的测试覆盖与 Linux/macOS 存在系统性差距。
3. **移动端 / 非桌面浏览器场景被低估。** `#148538`（iPhone Safari 直接白屏）、`#106487`（CJK 输入法不可用）——后者对中文用户是**阻塞级**问题，却只有 2 个 👍，说明该用户群在 issue 表达上更沉默，不能以反应数衡量其重要性。
4. **成本与上下文是高频焦虑。** `#99943`（1M 窗口静默降为 65,536）与 `#97390` 都源于用户对“我付了多少钱 / 我的上下文还剩多少”缺乏可见性。

**满意侧**
- 插件生态活跃度良好：外部作者主动提交 catalog 更新（`#157643` Worktable、`#157640` laso-finance），并附 SHA 固定与变更加变更说明，说明**插件上架流程已形成可用的外部契约**。
- 有用户（`#139002`）明确披露“报告与根因分析由 AI 编码助手完成”——社区已开始用 Hermes 自身调试 Hermes，这是自举式采用的正面信号。

**不满意侧**
- `needs-decision` 标签被长期挂起（`#59293` 已 4 个月、`#119070` 已 2 个月），用户反复追问却无决策结论，容易演化为“提了也没用”的预期。
- 旧 issue 反复被“顶起”而非关闭（`#29458` 自 5 月、`#17565` 自 4 月），会稀释社区对 issue tracker 的信噪比感知。

---

## 8. 待处理积压（请维护者关注）

### 长期未决的高价值 Issue

| Issue | 年龄 | 卡点 |
|---|---|---|
| `#17565` 可配置 temperature（👍18） | **约 7 个月** | `needs-decision`，社区热度最高、实现成本最低 https://github.com/NousResearch/hermes-agent/issues/17565 |
| `#29458` Kanban active_pr 守卫无清除路径 | **约 6 个月** | 需产品决策：操作员如何介入状态机 https://github.com/NousResearch/hermes-agent/issues/29458 |
| `#59293` config set 绕过写保护 | **约 4.5 个月** | 安全模型层面的决策 https://github.com/NousResearch/hermes-agent/issues/59293 |
| `#62336` env 快照落盘凭据 | **约 4 个月** | 已挂 `sweeper:risk-security-boundary`，属威胁模型级问题 https://github.com/NousResearch/hermes-agent/issues/62336 |
| `#86620` Tool Search 豁免白名单 | 约 3 个月 | 插件生态扩展性的硬约束 https://github.com/NousResearch/hermes-agent/issues/86620 |

### 长期挂起的 PR

| PR | 年龄 | 说明 |
|---|---|---|
| `#122181` fix(agent): Gemini contents 不得以模型 function call 开头 | **约 2 个月** | 修的是“一次坏写入导致整个会话报废直到 `/new`”的**会话级致命态**，价值/成本比很高，却长期 OPEN，建议优先 review。https://github.com/NousResearch/hermes-agent/pull/122181 |
| `#130365` fix(vision): 缩放/裁剪保留 EXIF 方向 | **约 1.5 个月** | 照片上传后方向错乱的确定性 bug，改动局部。https://github.com/NousResearch/hermes-agent/pull/130365 |

### 结构性提醒

1. **消化率**：今日 PR 合并/关闭率 20.2%（101/500），Issue 关闭率 8.6%（28/325）。若该比率持续，积压将以每周数百条的速度复合增长。建议设置**“每周固定比例用于清积压”**的配额（例如 20% 维护带宽专用于关闭/合并超过 60 天的条目）。
2. **提交者集中度**：今日 PR 切片中 `@teknium1` 一人贡献 4 条（`#157646`、`#157639`、`#157545`、`#157517`、`#157522`），`@unsupportedpastels` 一人承担 5 段迁移链。**关键路径上存在明显的人员单点**，迁移链的 review 应避免串行阻塞。
3. **迁移风险预警**：九段式 serve→gateway 迁移尚在推进中（3/9 至 6/9 已开），而 `#143547` 已积压 83 条评论的合并后问题。建议在推进第 7–9 段前，先对 `#143547` 做一次**分组归因与分级**，否则新问题会持续叠加到同一收容所中，失去可追踪性。

---

*报告生成时间：2026-11-19 · 数据窗口：过去 24 小时*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报｜2026-11-19

> 数据口径：过去 24 小时 Issues 更新 12 条、PR 更新 53 条、Release 1 个。PR 评论区数据缺失，社区热度主要以 Issue 评论数为依据。

## 1. 今日速览

- 项目活跃度处于高位：24 小时内 PR 更新 53 条，其中合并/关闭 18 条、待合并 35 条，说明开发提交与审查吞吐都很活跃，但审查队列压力仍较明显。
- Issues 侧新开/活跃 6 条、关闭 6 条，关闭与新开基本平衡，问题流转正常。
- 发布 `v4.30.0-beta.1`，涉及对话数据库、Agent 配置和会话设置迁移，属于需要重点关注的 Beta 版本。
- 今日关闭/合并的 PR 主要集中在 CI 简化、Dashboard 测试加速、前端性能优化和 MDI 字体构建修复，工程效率提升明显。
- 稳定性与兼容性修复仍在排队：插件注册回退、Anthropic 工具调用 ID、Gemini 内置工具与函数调用组合、上下文压缩失败后的历史裁剪等均有待合并 PR。

整体健康度评估：**活跃度高、工程化推进明显；但 35 条待合并 PR 和若干长期 Issue/PR 需要维护者分配审查资源。**

---

## 2. 版本发布

### v4.30.0-beta.1  
链接：https://github.com/AstrBotDevs/AstrBot/releases/tag/v4.30.0-beta.1

**发布状态：Beta 测试版。** 官方提示可能存在不稳定或兼容性问题，建议先在测试环境验证。

**本版本可见更新：**
- 用户追加指令（Steering）时，自动将等待中的工具调用移至后台任务，前台继续处理新输入。（[#11142](https://github.com/AstrBotDevs/AstrBot/pull/11142)）
- 修复 QQ 官方群聊流式回复被合并的问题。（[#11229](https://github.com/AstrBotDevs/AstrBot/pull/11229)）
- QQ 官方适配器支持获取私聊用户名字，群聊显示名称优先使用群内用户昵称。发布说明此处有截断，具体以 Release 页面为准。

**迁移与升级注意事项：**
- 本次涉及**对话数据库、Agent 配置和会话设置迁移**。
- 升级前需备份数据与配置。
- 回退旧版时需同时恢复升级前备份。
- 由于是 Beta 版本，建议先在测试环境验证插件、平台适配器和数据库迁移流程。

**风险判断：中等偏高。** 迁移面涉及数据库与核心配置，虽然属于 Beta 通道，但仍建议生产用户暂缓或严格按备份流程操作。

---

## 3. 项目进展

今日关闭/合并的 PR 以工程效率和前端性能为主，核心稳定性修复更多仍在待合并队列。

| PR | 状态 | 推进内容 | 影响 |
|---|---|---|---|
| [#11226](https://github.com/AstrBotDevs/AstrBot/pull/11226) | 已关闭/合并 | 简化并加速 CI，统一工具链版本，移除 Python bootstrap uv 再跑 Python 的冗余链路；修复 #11222 遗留问题 | 对开发者可能有 CI 工具链破坏性，对用户无直接影响 |
| [#11228](https://github.com/AstrBotDevs/AstrBot/pull/11228) | 已关闭/合并 | 通过 mock 失败登录延迟，减少 Dashboard 测试中约 21 秒等待 | 提升测试速度与稳定性 |
| [#11237](https://github.com/AstrBotDevs/AstrBot/pull/11237) | 已关闭/合并 | Dashboard 复用聊天块、优化插件名称比较 | 前端渲染性能优化 |
| [#11222](https://github.com/AstrBotDevs/AstrBot/pull/11222) | 已关闭/合并 | 临时 Git 仓库测试中禁用 git 签名要求，避免 PIN 弹窗阻塞测试 | 改善项目交付测试可靠性 |
| [#11193](https://github.com/AstrBotDevs/AstrBot/pull/11193) | 已关闭/合并 | 修复 MDI 字体扫描误匹配，升级 MDI 字体版本 | 减少 Dashboard 构建警告 |

**待合并中的重要 PR：**
- [#11250](https://github.com/AstrBotDevs/AstrBot/pull/11250)：停止跟踪生成的 MDI 字体资产，避免构建产物入库。
- [#11249](https://github.com/AstrBotDevs/AstrBot/pull/11249)：修复插件注册表回退失败，复用 TLS 上下文，减少 CA bundle 重复加载。
- [#11247](https://github.com/AstrBotDevs/AstrBot/pull/11247)：增加按适配器配置代理。
- [#11248](https://github.com/AstrBotDevs/AstrBot/pull/11248)：缩短超过 Anthropic 64 字符限制的工具调用 ID。
- [#11078](https://github.com/AstrBotDevs/AstrBot/pull/11078)：支持 Gemini 内置工具与函数调用组合。
- [#10553](https://github.com/AstrBotDevs/AstrBot/pull/10553)：上下文摘要失败时强制裁剪超限历史。
- [#9976](https://github.com/AstrBotDevs/AstrBot/pull/9976)：修复插件子模块中注册的 hook 未绑定到插件实例。
- [#10779](https://github.com/AstrBotDevs/AstrBot/pull/10779)：纯文本 Provider 下对工具返回图片做降级处理。

**整体推进判断：** 今日工程化与性能优化落地较多，Beta 版本覆盖了数据库/配置迁移和 QQ 官方适配器修复；但多项核心稳定性修复仍待 review，项目“向前迈进”更多体现在开发效率和兼容性积累，而非单点重大功能发布。

---

## 4. 社区热点

按 Issue 评论数排序，今日讨论热点集中在依赖管理、TTS 存储、平台适配器稳定性和兼容性。

| 条目 | 评论数 | 热点诉求 |
|---|---:|---|
| [#11174](https://github.com/AstrBotDevs/AstrBot/issues/11174) 统一依赖管理到 uv，移除 requirements.txt | 4 | 依赖重复维护已导致 certifi、faiss-cpu、pip 等版本约束不一致；希望 Docker、CI、WebUI 在线更新统一读取 `pyproject.toml`，同时兼顾插件生态 |
| [#11066](https://github.com/AstrBotDevs/AstrBot/issues/11066) TTS 语音自动存储文件，希望增加选项 | 3 | 每条语音自动落盘，清理麻烦；希望支持不存、缓存条数上限或下载开关 |
| [#9477](https://github.com/AstrBotDevs/AstrBot/issues/9477) 未来任务执行不稳定 | 2 | 个人微信 clawbot 定时任务不按时触发，疑似 `weixin_oc` 适配器 session 间歇断开，报 `ret=-2, prepare failed` |
| [#10898](https://github.com/AstrBotDevs/AstrBot/issues/10898) stdout 受阻阻塞主事件循环，WebUI 无响应 | 2 | Windows 本地 WebChat 使用中 Dashboard 整体无响应，后端 HTTP 请求超时，已关闭 |
| [#10920](https://github.com/AstrBotDevs/AstrBot/issues/10920) SystemOne `noul` 类型请求未兼容标准格式 | 2 | 缺少 `criteria` 字段导致部分兼容协议无法调用，已关闭 |
| [#11038](https://github.com/AstrBotDevs/AstrBot/issues/11038) 增加 NagaAI Provider 模板 | 2 | 希望像 302.AI、TokenPony、Compshare 一样内置 OpenAI 兼容 Provider，已关闭 |
| [#11163](https://github.com/AstrBotDevs/AstrBot/issues/11163) OpenRouter 非流式丢失思考内容 | 2 | `reasoning_details` 数组未解析，GLM-5.3-Flash 等模型思维链丢失，已关闭 |

**背后诉求分析：**
1. **工程规范与插件生态兼容**：依赖管理问题不仅是仓库整洁，还影响 Docker、CI、WebUI 在线更新和插件安装一致性。
2. **可配置性与存储控制**：TTS 自动落盘、Anthropic 提示词缓存开关等需求都指向“默认行为应可关闭/可限制”。
3. **平台适配器可靠性**：微信、QQ 等平台 session 稳定性仍是用户真实使用中的高频痛点。
4. **多 Provider 兼容性**：OpenRouter reasoning、SystemOne 协议、NagaAI/UberLLM 模板等说明用户对多模型网关和协议兼容有持续需求。

---

## 5. Bug 与稳定性

按影响程度排列，基于过去 24 小时更新中的 Bug、回归和稳定性相关条目。

| 严重度 | 条目 | 状态 | 问题概述 | Fix PR / 备注 |
|---|---|---|---|---|
| 高 | [#10898](https://github.com/AstrBotDevs/AstrBot/issues/10898) | 已关闭 | Windows 本地运行 AstrBot 时，stdout 受阻阻塞主事件循环，导致整个 WebUI 无响应，后端 HTTP 请求约 4 秒超时 | 已关闭，说明已有处理 |
| 高 | [#9477](https://github.com/AstrBotDevs/AstrBot/issues/9477) | OPEN | 定时任务触发不稳定，`weixin_oc` 适配器 session 间歇断开，需在微信发消息重新激活 | 暂未看到对应 fix PR |
| 中高 | [#10138](https://github.com/AstrBotDevs/AstrBot/issues/10138) | OPEN | 开启流式输出后 TTS 完全不生效，`trigger_probability` 形同虚设 | 已有修复 PR [#9986](https://github.com/AstrBotDevs/AstrBot/pull/9986) 待 review |
| 中 | [#11244](https://github.com/AstrBotDevs/AstrBot/issues/11244) | OPEN | 本地工具消费 list 参数后擦除已记录 action，导致下一轮订单引用丢失；CSV 中数据正确但助手失去引用 | 暂未看到 fix PR |
| 中 | [#11163](https://github.com/AstrBotDevs/AstrBot/issues/11163) | 已关闭 | OpenRouter 非流式模式未解析 `reasoning_details`，思考内容丢失 | 已关闭 |
| 中 | [#10920](https://github.com/AstrBotDevs/AstrBot/issues/10920) | 已关闭 | SystemOne `noul` 类型缺少 `criteria`，部分兼容协议无法调用 | 已关闭 |
| 中低 | [#10970](https://github.com/AstrBotDevs/AstrBot/issues/10970) | 已关闭 | 项目事件同步误报合并交付进度，`any(MERGED)` 覆盖集成结果 | 已关闭 |
| 稳定性 PR | [#11249](https://github.com/AstrBotDevs/AstrBot/pull/11249) | OPEN | 插件注册表回退在首次 URL 失败后可能失败，因关闭 session 同时关闭了复用 connector | 待合并 |
| 兼容性 PR | [#11248](https://github.com/AstrBotDevs/AstrBot/pull/11248) | OPEN | Anthropic 工具调用 ID 超过 64 字符导致兼容问题 | 待合并，Fixes #11221 |
| 兼容性 PR | [#11078](https://github.com/AstrBotDevs/AstrBot/pull/11078) | OPEN | Gemini 内置工具与自定义函数声明组合在 Gemini 3+ 上失败 | 待合并，Fixes #9937 |
| 上下文稳定性 PR | [#10553](https://github.com/AstrBotDevs/AstrBot/pull/10553) | OPEN | 上下文摘要失败后未裁剪超限历史，可能提前返回并继续超限 | 待合并，Fixes #10551 |

**稳定性判断：** 今日关闭了 WebUI 阻塞、OpenRouter reasoning 丢失、SystemOne 兼容和事件同步误报等问题，问题收敛迹象明显；但微信定时任务、流式 TTS、工具调用状态保持等仍影响真实使用场景，需继续跟踪。

---

## 6. 功能请求与路线图信号

| 需求 | 状态 | 纳入下一版本的可能性 | 判断依据 |
|---|---|---|---|
| [#11174](https://github.com/AstrBotDevs/AstrBot/issues/11174) 统一依赖到 uv，移除 `requirements.txt` | OPEN，4 评论 | 中高 | 与 [#11226](https://github.com/AstrBotDevs/AstrBot/pull/11226) CI 简化、[#11250](https://github.com/AstrBotDevs/AstrBot/pull/11250) 停止跟踪生成资产方向一致；但涉及 Docker、CI、WebUI 在线更新和插件生态，需分阶段 |
| [#11066](https://github.com/AstrBotDevs/AstrBot/issues/11066) TTS 语音存储开关/缓存上限 | OPEN，3 评论 | 中 | 需求明确且实现成本可能较低，但目前未看到对应 PR |
| [#11246](https://github.com/AstrBotDevs/AstrBot/issues/11246) Anthropic Prompt Caching 开关 | 新开 OPEN | 中 | 属于 Provider 配置项，适合小版本加入；但尚无 PR，需评估默认行为兼容性 |
| [#10138](https://github.com/AstrBotDevs/AstrBot/issues/10138) 流式输出 + TTS 修复 | OPEN | 高 | 已有 [#9986](https://github.com/AstrBotDevs/AstrBot/pull/9986) 待 review，若通过则可能进入后续修复版本 |
| [#11247](https://github.com/AstrBotDevs/AstrBot/pull/11247) 按适配器代理设置 | PR OPEN | 中高 | 功能已以 PR 形式提交，涉及 WebUI 适配器设置 |
| [#11078](https://github.com/AstrBotDevs/AstrBot/pull/11078) Gemini 内置工具 + 函数调用 | PR OPEN | 中高 | 兼容性修复，Fixes #9937 |
| [#9976](https://github.com/AstrBotDevs/AstrBot/pull/9976) / [#10632](https://github.com/AstrBotDevs/AstrBot/pull/10632) 插件子模块 hook 与 Discord slash 命令 | PR OPEN | 中 | 插件生态兼容性主线，但已积压一段时间 |
| [#11038](https://github.com/AstrBotDevs/AstrBot/issues/11038) NagaAI / [#10999](https://github.com/AstrBotDevs/AstrBot/issues/10999) UberLLM Provider 模板 | 已关闭 | 需查关闭原因 | 已关闭不等同于已合入，需确认是已添加、重复还是暂不接受 |

**路线图信号：** 下一阶段较可能围绕 **Provider 兼容性、插件生态兼容、依赖/CI 工程化、TTS 流式修复** 推进。TTS 存储控制和 Anthropic 缓存开关目前仍停留在需求阶段，短期落地存在不确定性。

---

## 7. 用户反馈摘要

- **依赖维护痛点真实存在**：用户指出 `requirements.txt` 与 `pyproject.toml` 重复维护，已出现 certifi、faiss-cpu、pip 等版本约束不一致，影响 Docker、CI、WebUI 在线更新和插件生态。见 [#11174](https://github.com/AstrBotDevs/AstrBot/issues/11174)。
- **TTS 默认落盘造成运维负担**：用户偶然发现每条语音都被存储，清理麻烦，希望支持不存、限制缓存条数或按需下载。见 [#11066](https://github.com/AstrBotDevs/AstrBot/issues/11066)。
- **流式输出与 TTS 组合失效影响体验**：开启流式后 TTS 永不触发，`trigger_probability` 配置无效；用户已明确指出修复 PR 待 review。见 [#10138](https://github.com/AstrBotDevs/AstrBot/issues/10138)。
- **平台 session 稳定性影响定时任务**：个人微信 clawbot 场景下，`weixin_oc` session 间歇断开，定时任务不按时触发，且常需手动发消息激活。见 [#9477](https://github.com/AstrBotDevs/AstrBot/issues/9477)。
- **Windows 本地部署存在阻塞风险**：WebChat 测试期间 Dashboard 整体无响应，后端 HTTP 请求超时，排障指向 stdout 日志阻塞主事件循环。该问题已关闭。见 [#10898](https://github.com/AstrBotDevs/AstrBot/issues/10898)。
- **推理内容可见性受关注**：OpenRouter 非流式模式下 `reasoning_details` 未解析，导致 GLM-5.3-Flash 等模型思考内容丢失。见 [#11163](https://github.com/AstrBotDevs/AstrBot/issues/11163)。
- **成本与第三方网关兼容性驱动配置需求**：Anthropic 默认启用 Prompt Caching，部分第三方计费渠道或代理网关需要关闭该功能以避免额外费用或请求异常。见 [#11246](https://github.com/AstrBotDevs/AstrBot/issues/11246)。
- **工具调用状态保持影响真实业务**：保存订单到 CSV 后，助手丢失订单引用，说明工具结果消费与下一轮上下文关联仍需加强。见 [#11244](https://github.com/AstrBotDevs/AstrBot/issues/11244)。

**满意度信号：** 今日数据中未出现明确的正面满意度评论；反馈主要集中在可靠性、可配置性、成本控制和插件开发体验，属于成熟项目常见的“深度使用后的精细化需求”。

---

## 8. 待处理积压

以下条目持续时间较长或修复 PR 等待较久，建议维护者优先分配 review/响应资源。

| 条目 | 类型 | 创建时间 | 积压情况 | 建议 |
|---|---|---|---|---|
| [#9235](https://github.com/AstrBotDevs/AstrBot/pull/9235) 规范化无 scheme 的 HTTP 代理设置 | PR OPEN | 2026-07-13 | 约 129 天，Fixes #8292 | 小范围核心配置修复，建议尽快确认 |
| [#9477](https://github.com/AstrBotDevs/AstrBot/issues/9477) 未来任务执行不稳定 | Issue OPEN | 2026-07-31 | 约 111 天，涉及微信适配器 session | 影响定时任务可靠性，建议补充复现与适配器侧重连策略 |
| [#9976](https://github.com/AstrBotDevs/AstrBot/pull/9976) 插件子模块 hook 绑定/卸载 | PR OPEN | 2026-09-08 | 约 72 天，Fixes #9938 | 插件生态兼容性重要修复，建议 review |
| [#10138](https://github.com/AstrBotDevs/AstrBot/issues/10138) 流式输出 + TTS 不生效 | Issue OPEN | 2026-09-19 | 约 61 天，已有 [#9986](https://github.com/AstrBotDevs/AstrBot/pull/9986) 待 review | 用户影响明确，建议推动 PR 收敛 |
| [#10553](https://github.com/AstrBotDevs/AstrBot/pull/10553) 上下文摘要失败时裁剪历史 | PR OPEN | 2026-10-14 | 约 36 天，Fixes #10551 | 影响长上下文稳定性，建议评估合入 |
| [#10779](https://github.com/AstrBotDevs/AstrBot/pull/10779) 纯文本 Provider 工具图片降级 | PR OPEN | 2026-10-26 | 约 24 天，Fixes #10702 | 多模态兼容修复，建议跟进 |
| [#10878](https://github.com/AstrBotDevs/AstrBot/pull/10878) faiss 后端错误可操作化 | PR OPEN | 2026-10-30 | 约 20 天，Refs #9392 | 诊断改进，需与 faiss wheel/版本问题分开推进 |
| [#10632](https://github.com/AstrBotDevs/AstrBot/pull/10632) Discord slash 命令按包根解析插件 | PR OPEN | 2026-10-19 | 约 31 天，Fixes #10626 | 插件子模块兼容问题，建议与 #9976 一并审查 |
| [#10965](https://github.com/AstrBotDevs/AstrBot/pull/10965) 保留 wakeup 事件身份 | PR OPEN | 2026-11-03 | 约 16 天，Fixes #10958 | 影响插件权限/缓存/机器人循环检测，建议确认 |

**维护建议：** 当前 PR 待合并数为 35，建议按“核心稳定性 > 插件生态兼容 > 性能优化 > 工程化”分层 review；对长期 Issue 至少给出状态更新或复现结论，避免用户重复反馈。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：2026-11-19** ｜ 数据来源：GitHub Discussions / Releases ｜ 仓库：deepseek-ai/deepseek-harness

---

## 1. 今日速览

1. **讨论更新量达 162 条/24h（约每小时 6.8 条）**，社区活跃度处于高位，既有新帖，也包含多条持续数月发酵的长期讨论。
2. **发布 dsh-v0.2.2-rc.5**，本版聚焦搜索体验与计费优化：DeepSeek 模型改用服务端搜索且不按次收费，其他模型默认使用 DeepSeek Search API（贡献者 @LegGasai）。
3. **数据安全与稳定性议题占据讨论热度前列**：P0 级“宿主进程删除 86k 文件”与“写插件清空 DSH 目录”两个数据丢失类讨论位居今日更新焦点。
4. **搜索能力成为串联社区需求的线索**：Ctrl+F 会话搜索（#8713）与 FTS5 中文分词（#1999）持续获讨论，与 rc.5 的搜索优化方向一致。
5. **社区插件生态持续活跃**：今日仍有 2 个社区插件项目（dsh-seam、Tiana）进入评论榜，显示生态自驱力。

**整体健康度评估**：活跃度 **高**（24h 162 条更新 + 1 个 rc 版本）；但**稳定性风险偏高**——多个高严重度数据丢失 / 启动失败议题尚未见官方修复信号，而仓库未启用 PR，无法从 GitHub 侧确认修复进度。

---

## 2. 版本发布

### dsh-v0.2.2-rc.5
📎 [Release 对比：rc.4…rc.5](https://github.com/deepseek-ai/deepseek-harness/compare/dsh-v0.2.2-rc.4...dsh-v0.2.2-rc.5)

**更新内容（体验优化）**
- DeepSeek 模型使用 DeepSeek 服务端搜索，**搜索不按次收费**；
- 其他模型默认使用 DeepSeek Search API。
- 贡献者：@LegGasai

**破坏性变更**
- 无。本次为 rc 候选版本的小范围优化，未声明 API 或配置层面的破坏性变更。

**迁移注意事项**
- **使用 DeepSeek 模型的用户**：搜索改为服务端搜索且不再按次计费，可直接受益，无需额外配置。
- **使用非 DeepSeek 模型的用户**：默认搜索通道切换为 DeepSeek Search API，请留意该通道的额度、计费与网络策略；若此前有自建搜索配置，建议核对是否被默认行为覆盖。
- 仍为 `rc` 预发布版本，生产环境使用请关注后续正式版。

---

## 3. 项目进展

> **说明**：该仓库未启用 GitHub Issues/PR，代码合并经 Releases 落地。本节将上方 changelog 作为合并摘要分析，不以 PR 数为 0 判定“无进展”。

**本次发版合并上线的功能（v0.2.2-rc.5）**
- **搜索路由重构**：按模型类型分流搜索通道——DeepSeek 模型走服务端搜索（免按次计费），其他模型走 DeepSeek Search API。
- **成本体验优化**：DeepSeek 模型用户搜索成本归零，属于面向用户体验与使用成本的正面改动。

**推进幅度评估**
- 本迭代为 `rc.4 → rc.5` 的单点功能优化，范围集中、影响面明确，**不涉及架构级变化**。
- 结合社区搜索类需求（#8713、#1999）来看，**“搜索体验”是当前版本线的主线方向之一**，本次从“计费/通道”层面先行优化，为后续产品化搜索能力（桌面端入口、中文分词）做了铺垫。

---

## 4. 社区热点

### 热度榜（按评论数）

| 排名 | 讨论 | 分类 | 评论 | 状态 | 关注点 |
|---|---|---|---|---|---|
| 1 | [#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713) 桌面版会话窗口缺少 Ctrl+F 搜索 | Ideas | 23 | OPEN | 基础功能缺失 + 已附可行原型 |
| 2 | [#12751](https://github.com/deepseek-ai/deepseek-harness/discussions/12751) 让 AI 写插件，DSH / ZCode 目录被清空 | Q&A | 19 | OPEN | 数据丢失恐慌 |
| 3 | [#1999](https://github.com/deepseek-ai/deepseek-harness/discussions/1999) FTS5 中文分词器可配置 | Ideas | 10 | OPEN | 中文 session 搜索失效 |
| 4 | [#13076](https://github.com/deepseek-ai/deepseek-harness/discussions/13076) 桌面端 rc.2 更新失败 | Q&A | 10 | OPEN | 更新链路可靠性 |
| 5 | [#7874](https://github.com/deepseek-ai/deepseek-harness/discussions/7874) Windows「打开方式」应用列表失效 | General | 9 | OPEN | 平台兼容 |
| 6 | [#9718](https://github.com/deepseek-ai/deepseek-harness/discussions/9718) Windows 时区不可用阻塞聊天 | General/Bug | 9 | OPEN | 聊天完全不可用 |
| 7 | [#11577](https://github.com/deepseek-ai/deepseek-harness/discussions/11577) MALFORMED_RESPONSE 整轮硬失败 | General/Bug | 7 | OPEN | 重试策略缺陷 |

### 诉求分析
- **#8713**：用户不仅提出问题，还附上**根因定位（FTS 引擎其实已就位，只是桌面端未启用）与已在本地跑通的原型插件**，技术准备度极高的功能需求。背后诉求是“对话内检索”这一最基础场景的可用性。
- **#12751**：19 条评论的讨论，反映出用户对 **AI Agent 执行破坏性文件操作时缺乏安全边界**的强烈不安，与 #13675 形成今天“数据安全”双热点。
- **#1999**：直指 `session-query-sqlite` 硬编码 `unicode61` 分词器导致中文几乎搜不到，提出 `tokenizer` / `tokenizerExtension` 两个配置项，方案具体、落地成本低。

---

## 5. Bug 与稳定性

> 仓库未启用 PR，无法从 PR 侧确认修复进度；以下“修复状态”依据讨论内容判断。

### 🔴 P0 — 数据丢失
- **[#13675](https://github.com/deepseek-ai/deepseek-harness/discussions/13675) 宿主进程永久删除 `%USERPROFILE%` 下 86,406 个文件（17 个 AI 工具配置目录）**
  - 版本 0.2.2-rc.3（Electron 44.x）；34 秒内删除，**无二次确认、不进回收站、日志无记录**；波及 `~/.dsh`、`~/.codex`、`~/.zcode`、`~/.vscode`、`~/.copilot`、`~/.ssh` 等。
  - 创建 2026-11-18，今日（11-19）仍在更新，**暂无官方修复回应迹象**。属最高优先级数据安全风险。
- **[#12751](https://github.com/deepseek-ai/deepseek-harness/discussions/12751) 让 AI 写插件后 DSH 与 ZCode 会话全部丢失**
  - 用户诉求为“加一个 token 统计面板”却触发目录清理；19 条评论讨论热度高，**未见官方结论**。

### 🟠 P1 — 功能完全阻塞 / 启动失败
- **[#9718](https://github.com/deepseek-ai/deepseek-harness/discussions/9718) Windows「British Columbia Standard Time」时区导致所有消息被拒（`browser time zone is unavailable`）**
  - Electron 运行时无法将 Windows 时区解析为 IANA 标识，**聊天功能完全不可用**。
- **[#13542](https://github.com/deepseek-ai/deepseek-harness/discussions/13542) Windows 0.2.2-rc.3 首个 welcome RPC 遇 ECONNRESET 被判致命，启动反复失败**
  - 禁用第三方插件无效，涉及启动链路容错策略。
- **[#13076](https://github.com/deepseek-ai/deepseek-harness/discussions/13076) 桌面端 rc.1 → rc.2 更新失败，更新后自动退出且未生效**
  - 管理员权限无效，影响升级体验。
- **[#11577](https://github.com/deepseek-ai/deepseek-harness/discussions/11577) MALFORMED_RESPONSE 不在默认重试码，单条 tool_use 参数非法即整轮硬失败**
  - 汇总了 #7705/#8920/#8976/#9402/#9503/#10406 等多个同源讨论，附 rc.5 复现与**补丁建议**，是社区期望最高、修复路径最清晰的稳定性问题之一。

### 🟡 P2 — 可用性 / 兼容性
- **[#10724](https://github.com/deepseek-ai/deepseek-harness/discussions/10724) Windows 创建工作区 EPERM rename 失败**（首次创建即失败）。
- **[#12217](https://github.com/deepseek-ai/deepseek-harness/discussions/12217) MCP Streamable HTTP 会话被服务端回收后不自动重连**，持续报 `session not found`，需重启 Host。
- **[#7874](https://github.com/deepseek-ai/deepseek-harness/discussions/7874) Windows「打开方式」永远显示“无法获取应用列表”**，单个 shell handler 返回 E_FAIL 即拖垮整个列表。
- **[#9592](https://github.com/deepseek-ai/deepseek-harness/discussions/9592) 冗余 `sandbox_permissions` / `justification` 参数导致无害调用被拒**，模型陷入猜参重试循环（实测单回合连续 8 次失败）。
- **[#6661](https://github.com/deepseek-ai/deepseek-harness/discussions/6661) macOS 上 Python runtime 子进程变孤儿高 CPU 僵尸**，Host 重启/异常退出后不清理。

**共性观察**：今日高优 Bug 呈现两个集中趋势——**Windows 平台兼容性**（#9718、#13542、#13076、#10724、#7874 共 5 条）与**工具调用/权限模型容错**（#11577、#9592）。

---

## 6. 功能请求与路线图信号

| 需求 | 链接 | 信号强度 | 纳入下一版本可能性判断 |
|---|---|---|---|
| 桌面端 Ctrl+F 会话搜索 | [#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713) | ★★★★★（23 评论、附原型、底层引擎已就位） | **高**——落地成本低、社区准备度高，且与 rc.5 搜索主线同向 |
| FTS5 中文分词可配置 | [#1999](https://github.com/deepseek-ai/deepseek-harness/discussions/1999) | ★★★★（方案具体，`tokenizer`/`tokenizerExtension` 配置项明确） | **中高**——可与 #8713 打包为“搜索能力升级”，一次性解决入口与中文命中 |
| MALFORMED_RESPONSE 纳入重试码 | [#11577](https://github.com/deepseek-ai/deepseek-harness/discussions/11577) | ★★★★（附补丁建议，多帖汇总） | **中高**——改动面小、收益大，属稳定性补丁 |
| 对话内搜索之外的检索增强 | #8713 与 #1999 联动 | ★★★ | 当前版本线已从“计费/通道”优化切入，后续产品化入口顺理成章 |

**路线图信号解读**：rc.5 的搜索优化 + #8713/#1999 的高热度，构成清晰的 **“搜索体验”演进线**；同时 #11577 这类“改一处、救一轮”的稳定性补丁，是下一 rc 版本的高性价比候选。

**插件生态信号**（社区自驱，非官方路线图）：
- [#13379](https://github.com/deepseek-ai/deepseek-harness/discussions/13379) **dsh-seam**：插件编译期兼容性检查工具，一行命令定位破坏性变更到源码行号（MIT，tested with 0.2.2-rc.1）。
- [#13561](https://github.com/deepseek-ai/deepseek-harness/discussions/13561) **Tiana**：为 DSH 带来类 ChatGPT Sites 的全栈发布能力，最新 `v0.11.2`。

---

## 7. 用户反馈摘要

**痛点**
- **数据安全焦虑是今日最强情绪**：#12751 用户原话“我tm真服了……所有会话全丢了”，#13675 描述“无确认、不进回收站、日志里也没有一行”。用户对 Agent 执行写/删操作的**边界与可回滚性**提出明确质疑。
- **中文场景被系统性忽视**：#1999 指出连续中文被当作单个超长 token，中文 session 搜索“几乎无法命中”；#8713 进一步说明即使有引擎也没有入口。
- **升级链路不可靠**：#13076 反映更新后自动退出、版本未变；#13542 反映启动即失败，用户尝试禁用第三方插件仍无效，排障成本高。
- **工具调用容错不足**：#11577 与 #9592 均描述“模型自己猜参数、连续重试直至整轮报废”，用户感到“白烧一个回合”。
- **Windows 体验落差明显**：时区、打开方式、工作区创建、启动 RPC 等多个基础功能在 Windows 上失效或降级。

**使用场景**
- 桌面端日常对话检索（#8713）；
- 中文用户长会话回溯（#1999）；
- 第三方插件开发与版本兼容维护（#13379）；
- 全栈应用一键发布（#13561）；
- MCP 工具链长期挂载（#12217）。

**满意 / 不满意**
- 满意侧：社区插件作者活跃、愿意贡献工具与原型（#8713 原型、#13379 工具），说明生态对平台扩展性认可；rc.5 的搜索免计费属用户可感知的正向体验。
- 不满意侧：集中在**可靠性（更新/启动/重连）** 与**安全性（破坏性操作无护栏）**，且多条讨论显示用户已自行完成根因定位，期待官方响应速度匹配社区投入。

---

## 8. 待处理积压

> 以下讨论均仍在更新（非“无人理会”），但**创建时间久、问题未闭环**，建议维护者优先排期或给出明确结论。

| 讨论 | 创建时间 | 积压时长 | 评论 | 为何值得关注 |
|---|---|---|---|---|
| [#1999](https://github.com/deepseek-ai/deepseek-harness/discussions/1999) FTS5 中文分词 | 2026-08-15 | ≈3 个月 | 10 | 影响全部中文用户的搜索可用性，方案现成 |
| [#6661](https://github.com/deepseek-ai/deepseek-harness/discussions/6661) macOS Python 僵尸进程 | 2026-09-14 | ≈2 个月 | 4 | 资源泄漏类问题，长期影响本机性能 |
| [#7874](https://github.com/deepseek-ai/deepseek-harness/discussions/7874) Windows 打开方式失效 | 2026-09-25 | ≈2 个月 | 9 | 根因已定位到 shell handler 枚举，修复路径清晰 |
| [#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713) Ctrl+F 搜索 | 2026-10-02 | ≈1.5 个月 | 23 | 今日热度第一，用户已附原型，悬置成本高 |
| [#9592](https://github.com/deepseek-ai/deepseek-harness/discussions/9592) sandbox 参数冗余致失败 | 2026-10-13 | ≈1 个月 | 6 | 直接影响工具调用成功率 |
| [#9718](https://github.com/deepseek-ai/deepseek-harness/discussions/9718) 时区阻塞聊天 | 2026-10-14 | ≈1 个月 | 9 | 功能完全不可用级别 |
| [#10724](https://github.com/deepseek-ai/deepseek-harness/discussions/10724) EPERM 创建工作区 | 2026-10-23 | ≈1 个月 | 5 | 阻断首次使用流程 |
| [#11577](https://github.com/deepseek-ai/deepseek-harness/discussions/11577) MALFORMED_RESPONSE 不重试 | 2026-10-30 | ≈3 周 | 7 | 已汇总 6 个同源帖，附补丁，宜尽快定调 |

**维护者关注建议**
1. **#13675 / #12751（数据丢失）应作为最高优先级公开回应**，即使修复未完成，也应给出风险说明与临时规避指引，避免信任进一步流失。
2. **#11577 / #9592** 改动面小、社区已给补丁，适合作为下一 rc 的稳定性批次。
3. **#8713 + #1999** 建议合并评估为“搜索能力升级”专项，一次性解决入口与中文分词，避免两条需求各自悬置。

---

*报告生成于 2026-11-19 ｜ 数据窗口：过去 24 小时 Discussions 162 条更新 + 1 个 Release ｜ 该项目未启用 Issues/PR，社区讨论集中于 GitHub Discussions。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*