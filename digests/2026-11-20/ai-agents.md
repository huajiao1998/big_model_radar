# OpenClaw 生态日报 2026-11-20

> Issues: 459 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-20 02:44 UTC

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
**日期：2026-11-20** ｜ 数据窗口：过去 24 小时 ｜ 来源：github.com/openclaw/openclaw

---

## 1. 今日速览

1. **活跃度处于极高水平**：24 小时内 Issues 更新 459 条、PR 更新 500 条，两项均达到"日均数百"的头部开源项目量级，同时发布了 2 个版本。
2. **处理效率偏低**：Issues 侧新增/活跃 330 条 vs 关闭 129 条（关闭率 28.1%）；PR 侧待合并 307 条 vs 已合并/关闭 193 条（合并率 38.6%），待合并队列仍在累积，评审侧已成为主要瓶颈。
3. **升级链路是当前第一大风险面**：在评论数 Top 50 的 Issue 中，与更新/升级（updater、Doctor、state migration、插件迁移）直接相关的至少 10 条，且包含 3 条 P0 级发布阻断问题。
4. **修复供给明显不足**：Top 50 高评论 Issue 中约 42 条带有 `clawsweeper:no-new-fix-pr` 标记（其中 38 条仍 open），说明高热度问题多数仍停留在诊断/复现阶段，尚无对应修复 PR。
5. **新功能线仍在推进**：ClawHub Agent 模板、OpenClaw ID 权限体系、ChatGPT/OpenAI 登录优先、Prompt 缓存前缀稳定性是今日 PR 侧最集中的四条主线。

**健康度判断**：开发吞吐强、迭代速度快，但"高频发版 + 脆弱的升级器"形成负向循环——用户升级受挫的反馈正在成为社区情绪的主要来源，建议下一阶段把评审资源优先倾斜到升级链路与 Prompt 缓存两类问题上。

---

## 2. 版本发布

今日共 2 个版本（注：Release Note 原文被截断，以下为可见部分的归纳）。

### 2.1 v2026.11.10-beta.1

- **Agent 模板（Agent templates）**：支持直接从 ClawHub 包安装 Agent，采用单一 `CLAW.md` manifest 描述，随包携带的 skill 目录会经过原生信任流程校验。
  - PR：#195707、#196322、#196348 ｜ 作者 @steipete，致谢 @Patrick-Erichsen
- **OpenClaw ID**：新增节点连接能力（原文在此处截断，具体范围待确认）。

### 2.2 v2026.11.6

- **更平滑的升级体验**：将 2026.11.5 的 updater 桥接到当前发布路径；在 Windows 上正确校验分阶段插件依赖。
  - PR：#200662、#200595 ｜ 作者 @steipete，致谢 @RomneyDa、@desksk
- **更健壮的会话**：保持 subagent 与…（原文截断）。

### 2.3 升级风险提示（基于今日 Issues 反推）

版本号序列显示当前处于**快速补丁密集期**（社区同时提到 2026.11.3 / 11.4 / 11.5-beta.2 / beta.3 / 11.6 / 11.10-beta.1）。今日多条高优 Issue 直接指向升级过程：

| 风险点 | 相关 Issue |
|---|---|
| Doctor 的 WAL 发布校验失败导致 11.3 半完成 | [#197083](https://github.com/openclaw/openclaw/issues/197083)（P0） |
| Candidate Doctor 因插件迁移冲突阻断 11.3→11.5 | [#200606](https://github.com/openclaw/openclaw/issues/200606)（P1） |
| Windows 计划任务校验失败阻断更新 | [#199617](https://github.com/openclaw/openclaw/issues/199617) |
| 已废弃的 `agents.defaults.heartbeat` 造成"改也错、不改也错" | [#200224](https://github.com/openclaw/openclaw/issues/200224) |
| 停在 `state-migrated-no-rollback` 且 Gateway 停摆 | [#194655](https://github.com/openclaw/openclaw/issues/194655)（P1） |

**建议**：在 11.10 正式版发布前，把上述 5 条纳入发布门禁检查清单；尤其 `state-migrated-no-rollback` 属于"不可回滚 + 服务不可用"的组合，是当前最坏的用户体验路径。

---

## 3. 项目进展

今日合并/关闭 193 条 PR，以下为可见范围内较有代表性的推进（PR 评论数在数据源中缺失，按优先级与影响面筛选）。

### 3.1 已关闭 / 已合并

| PR | 内容 | 意义 |
|---|---|---|
| [#202142](https://github.com/openclaw/openclaw/pull/202142) | 修复自动化在重复记录结果后误发裸 "Tool Call failed" 气泡 | 消除"其实没失败却报失败"的误导性提示，直接改善自动化场景信任度 |
| [#202174](https://github.com/openclaw/openclaw/pull/202174) | 升级失败报告保留 Doctor 发现项的目标信息 | 提升升级排障可诊断性 |
| [#202181](https://github.com/openclaw/openclaw/pull/202181) | Control UI 本地化刷新（机器人） | 常态化 i18n 同步 |
| [#202186](https://github.com/openclaw/openclaw/pull/202186) | 11.5 Release Note 补充规模数据：9,900+ PR、745 位贡献者 | 项目规模里程碑 |
| [#202131](https://github.com/openclaw/openclaw/pull/202131) | 修复 UI 测试对分数像素几何的误判 | 降低 CI 抖动 |

### 3.2 待合并中的高价值 PR

**① Agent 运行时正确性**
- [#201710](https://github.com/openclaw/openclaw/pull/201710)（P1，waiting on author）：**在首个请求时冻结 prompt 序列的工具集**，直接针对 #155868 / #202001 / #198373 三条"工具表漂移导致 prompt cache 全失效"的问题——这是今日最值得关注的单点修复。
- [#201723](https://github.com/openclaw/openclaw/pull/201723)（XL）：把 prefix-stability 测试扩展到 cron、steer、overflow 与并发聊天、五种传输通道，为上述修复提供回归护栏。

**② 升级与运维**
- [#201893](https://github.com/openclaw/openclaw/pull/201893)（P0）：`recover-lock` 可清理阻塞 Doctor 维护的遗留 config lock（Linux 侧，配套 #201912 的 macOS 方案）。

**③ ClawHub 模板与 OpenClaw ID（与今日 beta 版本同源）**
- [#202013](https://github.com/openclaw/openclaw/pull/202013)：私密模板草稿可直接在会话内登录 ClawHub 预览。
- [#202120](https://github.com/openclaw/openclaw/pull/202120)：Template 分类 "View all" 不再二次读取。
- [#202175](https://github.com/openclaw/openclaw/pull/202175)：Template 自动化按"添加设备的时区"调度。
- [#201610](https://github.com/openclaw/openclaw/pull/201610) + [#202184](https://github.com/openclaw/openclaw/pull/202184)：统一 OpenClaw ID 与 Gateway 角色体系，并修复"提权后已配对浏览器仍持旧权限"。

**④ 模型接入体验**
- [#201411](https://github.com/openclaw/openclaw/pull/201411)：OpenAI 首次连接优先提供 "Sign in with ChatGPT"（带 `merge-risk: compatibility / auth-provider` 与安全评审要求）。
- [#201296](https://github.com/openclaw/openclaw/pull/201296)：macOS 端合并为单一 provider 列表 + 页内登录。
- [#202180](https://github.com/openclaw/openclaw/pull/202180)：ChatGPT 登录用户可在 GA 模型上使用 Discord 实时语音。

**整体推进评估**：今日进展呈现"两条腿走路"——一条是 11.x 版本线的**升级器加固**（#201893、#202174、#202142），另一条是 11.10 版本线的**模板/身份/登录**新能力铺路（#202013、#202120、#201610、#201411）。核心 Agent 性能问题（#119720 事件循环阻塞、#169797 内存回归）今日无明显推进。

---

## 4. 社区热点

### 4.1 评论最多的 Issue（Top 8）

| Issue | 优先级 | 评论 | 核心诉求 |
|---|---|---|---|
| [#197083](https://github.com/openclaw/openclaw/issues/197083) Doctor WAL 校验失败致 11.3 半完成 | **P0** / ux-release-blocker | 29 | 升级中断后外部插件状态不确定，需要可恢复的"半完成"语义 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) 同步持久化阻塞 Gateway 事件循环 | P1 / diamond lobster | 29 | 规模化下的架构级性能问题，历经多次部分修复仍未根治 |
| [#123792](https://github.com/openclaw/openclaw/issues/123792) CLI 后端下助手回复渲染两次 | P2 | 20 | 会话记录被双写，影响所有 CLI 后端用户 |
| [#125764](https://github.com/openclaw/openclaw/issues/125764) Telegram 出站失败单次即死信 | P1 | 15 | 高价值消息静默丢失，无重试、无告警 |
| [#200606](https://github.com/openclaw/openclaw/issues/200606) Candidate Doctor 阻断 11.3→11.5 | P1 | 14 | `changed=[]` 却判为冲突，升级被卡死 |
| [#199617](https://github.com/openclaw/openclaw/issues/199617) Windows 计划任务校验失败 | P2 | 14 | Windows 平台升级路径可靠性 |
| [#141172](https://github.com/openclaw/openclaw/issues/141172) 首提交前死亡导致 `agent.run.started` 永久泄漏 | P2 | 13 | 轨迹数据完整性 / 外键失败 |
| [#162914](https://github.com/openclaw/openclaw/issues/162914) rootless Podman 沙箱 5–12 秒后中断 | P1 | 12 | 沙箱供给稳定性，影响 cron 与面板任务 |

### 4.2 讨论背后的三条主线

**主线一：升级器是"信任瓶颈"。** 升级类 Issue 占据了高评论榜的近 1/5，且横跨 macOS/Linux/Windows 三平台、覆盖从 2026.9.7 到 2026.11.5 的多个版本区间。用户反复描述的路径高度一致：*能装、能跑，但升不动，且升失败后服务处于不确定状态*。这不是单点 bug，而是"多阶段状态迁移 + 不可回滚"设计在高频发版下的结构性摩擦。典型证据是 [#164800](https://github.com/openclaw/openclaw/issues/164800)（P0，2026-10-04 创建，11-18 更新为"仍未解决"）与 [#200289](https://github.com/openclaw/openclaw/issues/200289)（P0，今日已关闭）。

**主线二：Prompt 缓存失效成为"隐性成本黑洞"。** [#155868](https://github.com/openclaw/openclaw/issues/155868)、[#202001](https://github.com/openclaw/openclaw/issues/202001)、[#198373](https://github.com/openclaw/openclaw/issues/198373) 三条独立报告指向同一现象：同一会话内相邻请求的系统提示/工具表发生漂移，导致 cacheRead 跌至 1–3%。对重度用户意味着成本与延迟的数倍放大。**这是今日信号最强的技术议题**——已有 P1 修复 PR #201710 与 XL 测试 PR #201723 在推进，具备进入下一版本的条件。

**主线三：消息投递的"静默失败"最伤用户信任。** [#125764](https://github.com/openclaw/openclaw/issues/125764)（Telegram 死信）、[#191476](https://github.com/openclaw/openclaw/issues/191476)（Matrix consumer closed）、[#196199](https://github.com/openclaw/openclaw/issues/196199)（Codex helper 无法唤醒父会话导致用户被锁在助手之外）共同特征是：**没有报错、没有告警、用户只看到"AI 不理我"**。这类问题对个人助理类产品的杀伤力远大于崩溃。

---

## 5. Bug 与稳定性

按严重程度排列（"Fix PR"列依据 `clawsweeper:*` 标签推断）。

### P0 — 发布阻断 / 服务不可用

| Issue | 现象 | 状态 | Fix PR |
|---|---|---|---|
| [#197083](https://github.com/openclaw/openclaw/issues/197083) | Doctor 的 SQLite WAL 提交发布无法校验，11.3 升级半完成，拒绝回滚 | OPEN，29 评论 | ❌ `no-new-fix-pr`，待维护者评审 |
| [#164800](https://github.com/openclaw/openclaw/issues/164800) | 托管更新在 Doctor 后停摆且 Gateway 已停止（2026.9.7→9.8） | OPEN，11-18 确认仍未解决 | ❌ `no-new-fix-pr` |
| [#158277](https://github.com/openclaw/openclaw/issues/158277) | Apple Watch 上 Talk 报 "Voice changed its remote network address"，实时音频无法建立 | OPEN，`fix-shape-clear` | ⚠️ 修复形态清晰，未见 PR |
| [#200289](https://github.com/openclaw/openclaw/issues/200289) | 11.3→11.4 更新耗时数小时，Gateway 交接时 SQLite 锁失败，需 SSH 抢救 | **CLOSED** ✅ | 今日已关闭 |

### P1 — 数据丢失 / 崩溃循环 / 核心功能受损

| Issue | 现象 | 状态 | Fix PR |
|---|---|---|---|
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 同步写入与 transcript 维护阻塞事件循环，规模化下退化 | OPEN，自 08-05 | ❌ 但 `fix-shape-clear` |
| [#125764](https://github.com/openclaw/openclaw/issues/125764) | Telegram 出站网络失败单次即死信，无重试/告警 | OPEN，自 08-18 | ❌ 需产品决策 + 现场复现 |
| [#200606](https://github.com/openclaw/openclaw/issues/200606) | Candidate Doctor 插件迁移冲突阻断 11.5 升级 | OPEN | ❌ 主分支未复现 |
| [#198218](https://github.com/openclaw/openclaw/issues/198218) | Gateway 停止时 Doctor/update 维护活锁，反复哈希未变的 state DB | OPEN | ❌ `needs-info` |
| [#196199](https://github.com/openclaw/openclaw/issues/196199) | 自 2026.10.10 起 Codex helper 完成后无法恢复父会话，用户被锁出助手 | OPEN | ❌ |
| [#162914](https://github.com/openclaw/openclaw/issues/162914) | rootless Podman 沙箱 5–12 秒内 "Aborted \| sandbox_provisioning" | OPEN | ❌ |
| [#194655](https://github.com/openclaw/openclaw/issues/194655) | 插件 DB 迁移延后导致 `state-migrated-no-rollback` + Gateway 停止（workboard schema 38 vs 0） | OPEN | ❌ |
| [#191476](https://github.com/openclaw/openclaw/issues/191476) | Matrix 房间卡在 "Plugin matrix consumer is closed" | OPEN | ❌ |
| [#169797](https://github.com/openclaw/openclaw/issues/169797) | Gateway 内存为 2026.9.4 的 ~2.5 倍，首响慢 3–5 倍 | OPEN | ❌ |
| [#173714](https://github.com/openclaw/openclaw/issues/173714) | Provider/model HTTP 路径缺少 TCP keepalive 与可配置 pool 空闲超时（WSL2/NAT 下挂起） | OPEN | ❌ |
| [#153899](https://github.com/openclaw/openclaw/issues/153899) | Gateway drain 等满 `TimeoutStopSec`，定时器持续打已关闭资源 | OPEN（stale） | ❌ `needs-info` |
| [#201796](https://github.com/openclaw/openclaw/issues/201796) | Cron agentTurn 在 stall 恢复后无限重放已完成的副作用工具调用 | **CLOSED** ✅ | 今日已关闭 |
| [#199155](https://github.com/openclaw/openclaw/issues/199155) | 跨进程写入的 transcript 行对驻留 session actor 不可见 → UNIQUE 冲突 | **CLOSED** ✅ | `fix-shape-clear` + `queueable-fix` |

### P2 — 功能错误 / 体验摩擦（选摘）

- [#123792](https://github.com/openclaw/openclaw/issues/123792) 助手回复渲染两次（CLI 后端）——20 评论，影响面广，无 fix PR。
- [#191847](https://github.com/openclaw/openclaw/issues/191847) 大会话反复打死 512MB SQLite worker（`ERR_WORKER_OUT_OF_MEMORY`），整会话不可用。
- [#112638](https://github.com/openclaw/openclaw/issues/112638) `session.maintenance enforce` 模式下 maxEntries/maxDiskBytes 被静默突破（thread/channel 条目被豁免回收）。
- [#198373](https://github.com/openclaw/openclaw/issues/198373) / [#202001](https://github.com/openclaw/openclaw/issues/202001) prompt cache 失效（详见 §4.2）。
- [#170496](https://github.com/openclaw/openclaw/issues/170496) 每次只读访问都复制一份 state DB 快照，cron 每 tick 触发。
- [#163107](https://github.com/openclaw/openclaw/issues/163107) `view_image` 处理 HEIC 失败后每次泄漏 250–400MB RSS。
- [#186973](https://github.com/openclaw/openclaw/issues/186973) `/clear` 状态检查持续渲染数周前的陈旧更新横幅。
- [#199621](https://github.com/openclaw/openclaw/issues/199621) 切到 All owners 时侧栏仍被 agent 过滤器收窄。

**稳定性小结**：今日关闭了 3 条 P0/P1（#200289、#201796、#199155），是实质进展；但 P0 仍有 3 条 open，P1 有 12 条 open，且绝大多数无 fix PR。**升级链路 + 会话状态一致性**是修复投入回报最高的两个方向。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 已有 PR / 信号 | 纳入下一版本可能性 |
|---|---|---|---|
| Prompt 序列工具集冻结（解决缓存失效） | [#155868](https://github.com/openclaw/openclaw/issues/155868)、[#202001](https://github.com/openclaw/openclaw/issues/202001)、[#198373](https://github.com/openclaw/openclaw/issues/198373) | **#201710（P1）+ #201723（XL 测试）** | 🔥 **高** — 唯一"高优问题 + 现成修复 + 回归测试"三件套齐全的方向 |
| Cron 任务终止条件（`--until` / `--max-runs` / 累计计数） | [#130247](https://github.com/openclaw/openclaw/issues/130247) | 无 PR | 中 — 需求明确、实现成本低，但已 stale |
| memory 分级 chunking（`MEMORY.md` 之外的清单型记忆文件） | [#179954](https://github.com/openclaw/openclaw/issues/179954) | `linked-pr-open` ✅ | 中高 — 已有 PR 挂接 |
| memory FTS 中文/CJK bigram 分词（trigram 对 2 字查询 0 命中） | [#170997](https://github.com/openclaw/openclaw/issues/170997) | `linked-pr-open` ✅ | 中高 — 中文用户刚需，已有 PR |
| Active Memory 检索上限可配置 + 进度可见 | [#181774](https://github.com/openclaw/openclaw/issues/181774) | 无 PR，但配套 #180978（熔断器永不打开） | 中 — 两个问题应合并处理 |
| 插件在工具结果之后追加内容的扩展点 | [#164355](https://github.com/openclaw/openclaw/issues/164355) | **已 CLOSED** | 已进入决策闭环 |
| 非 owner 渠道请求的调用者作用域调度 | [#187264](https://github.com/openclaw/openclaw/issues/187264) | 需安全评审 | 低-中 — 涉及权限边界，节奏会较慢 |
| Durable owner-native 执行溯源（中断恢复） | [#181791](https://github.com/openclaw/openclaw/issues/181791) | 无 PR | 低 — 属长期架构议题 |
| Home Assistant OS 受支持安装路径与文档 | [#200692](https://github.com/openclaw/openclaw/issues/200692) | `fix-shape-clear` + `queueable-fix` ✅ | 高（文档级）— 已具备排队修复条件 |

**路线图判读**：11.10 版本线已明确押注 **ClawHub 模板 + OpenClaw ID + ChatGPT 登录**（release note 与 PR 双向印证）；11.6.x 补丁线聚焦 **升级器加固**。真正"用户呼声高但尚未被版本线吸收"的是 **Cron 生命周期管理**与 **Agent 性能/内存回归**。

---

## 7. 用户反馈摘要

**① 升级体验：从"期待"转为"戒备"**
多条 Issue 的语气已从报 bug 转为陈述风险流程，例如 #200224 描述的是"改也错、不改也错"的两难：保留已废弃的 heartbeat 配置升级失败，删掉它则在 stable 上重新开启 heartbeat。#164800 的作者在 11-18 追加"仍未解决"，是典型的长期跟踪疲劳。**用户要的不是更多功能，而是"升级后我还能找回我的 Gateway"。**

**② 平台覆盖的真实长尾**
Windows 计划任务校验（#199617）、macOS 26 iMessage 编辑选择器（#173599）、Apple Watch 实时语音（#158277）、Home Assistant OS 的 Alpine 容器（#200692）、WSL2/NAT 下的 HTTP 挂起（#173714）——**自托管 + 边缘平台的组合是 bug 高发区**，且这些用户往往缺乏自救手段（#200289 需要 SSH 抢救）。

**③ 重度用户的成本敏感**
#198373 / #202001 的作者提供了详尽的 cacheRead 比例测量（1–3%）与诊断方法，属于高投入型用户的自发根因分析。#170496 指出 cron 每 tick 复制整份 state DB —— 这类"平时看不出来、规模化后成本翻倍"的问题，是重度自托管用户的核心关切。

**④ 满意度所在**
- **模板生态**：#202013 的动机描述（"创作者不得不离开会话去 Gateway 主机登录"）表明用户已在真实使用 ClawHub 私有模板工作流，只是流程有断点。
- **多通道覆盖**：Telegram / Matrix / iMessage / WhatsApp / Discord 均有独立 Issue，说明用户确实把这些通道当作主入口在用——这也是 #125764 这类"静默丢消息"问题格外刺眼的原因。

**⑤ 不满意的共性表达**
"没有报错、没有告警、我不知道发生了什么"——#125764、#191476、#196199、#186973 都是同一模式。**建议把"失败必须可见"提升为设计原则**（例如投递死信进入可见告警、维护活锁上报状态页）。

---

## 8. 待处理积压

以下为长期未闭环、且影响面较大的条目，建议维护者本周排期确认。

### 8.1 长期开放的架构级问题

| Issue | 创建时间 | 积压时长 | 说明 |
|---|---|---|---|
| [#112638](https://github.com/openclaw/openclaw/issues/112638) session 维护不设上限 | 2026-07-22 | **~4 个月** | 存储可无限增长，属数据安全类隐患；仍 `no-new-fix-pr` |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) 事件循环阻塞 | 2026-08-05 | **~3.5 个月** | 29 评论、历经 #140231/#138984 部分修复仍未根治，是最高价值的性能债 |
| [#123792](https://github.com/openclaw/openclaw/issues/123792) 回复双写 | 2026-08-14 | ~3 个月 | 20 评论，影响所有 CLI 后端 |
| [#125764](https://github.com/openclaw/openclaw/issues/125764) Telegram 死信 | 2026-08-18 | ~3 个月 | P1 消息丢失，卡在 `needs-product-decision` + `needs-live-repro` |
| [#130247](https://github.com/openclaw/openclaw/issues/130247) Cron 无终止条件 | 2026-08-26 | ~3 个月 | 已 `stale`，但实现成本低、需求明确 |
| [#141172](https://github.com/openclaw/openclaw/issues/141172) `agent.run.started` 泄漏 | 2026-09-07 | ~2.5 个月 | 轨迹完整性 + 外键失败 |
| [#153899](https://github.com/openclaw/openclaw/issues/153899) Gateway drain 等满超时 | 2026-09-20 | ~2 个月 | P1 却已 `stale` + `needs-info`，重启体验长期劣化 |
| [#164800](https://github.com/openclaw/openclaw/issues/164800) 更新停摆（P0） | 2026-10-04 | ~1.5 个月 | 11-18 明确"仍未解决"，是最该被认领的 P0 |
| [#169797](https://github.com/openclaw/openclaw/issues/169797) 内存 2.5x 回归 | 2026-10-12 | ~1 个月 | 单核主机用户受直接影响 |

### 8.2 停滞的 PR

| PR | 创建时间 | 状态 | 说明 |
|---|---|---|---|
| [#141004](https://github.com/openclaw/openclaw/pull/141004) feat(audit): 记录运行时 skill 使用 | 2026-09-07 | **~2.5 个月**，XL，`needs proof` | 审计能力是合规场景刚需，长期停滞可惜 |
| [#199798](https://github.com/openclaw/openclaw/pull/199798) Settings 表单去重 | 2026-11-15 | 作者自行标注"已取消，字段隐藏会删除无其他编辑入口的设置" | 建议正式关闭以避免干扰排队 |
| [#201411](https://github.com/openclaw/openclaw/pull/201411) ChatGPT 优先登录 | 2026-11-18 | `merge-risk: compatibility / auth-provider` + 安全评审 | 需安全团队明确 SLA，否则会阻塞 11.10 的登录体验主线 |
| [#201610](https://github.com/openclaw/openclaw/pull/201610) OpenClaw ID 角色统一 | 2026-11-19 | `merge-risk: security-boundary` | 与 #202184 堆叠，建议合并评审 |

### 8.3 流程建议

1. **设立"升级链路"专题看板**：把散落在 #197083 / #200606 / #199617 / #200224 / #194655 / #164800 / #200289 的碎片归并为一个里程碑，避免每个版本重复踩坑。
2. **对 `no-new-fix-pr` 占比过高（~84%）做一次分流**：区分"确实无法复现"（补 `needs-info` 并设超时关闭策略）与"修复形态已清晰但无人认领"（打 `good first issue` / `help wanted` 并指定 owner）。
3. **307 条待合并 PR 需要分级**：优先消化 P0/P1 + 安全敏感项，其余按 `status:` 标签批量推进或礼貌关闭，防止评审带宽被稀释。

---

## 附：数据说明与口径

- 统计窗口为 2026-11-19 至 2026-11-20（以 GitHub 更新时间计）。
- Issues 明细仅展示按评论数排序的前 50 条（共 459 条）；PR 明细展示前 30 条（共 500 条），**PR 的评论数字段在数据源中缺失**，故 PR 部分按优先级标签、规模标签与更新时间综合筛选，未做"评论最多"排序。
- 两条 Release Note 原文均被截断，"OpenClaw ID：connect nodes thr…" 与 "keep subagent and …" 的完整内容需回源确认。
- "是否已有 Fix PR"依据 Issue 上的 `clawsweeper:no-new-fix-pr` / `clawsweeper:fix-shape-clear` / `clawsweeper:queueable-fix` / `clawsweeper:linked-pr-open` 标签推断，可能与实际分支状态存在偏差。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告
**日期：2026-11-20 ｜ 数据窗口：过去 24 小时**

> 口径说明：OpenClaw、Zeroclaw、QwenPaw、hermes-agent、AstrBot 以 GitHub Issues/PR 为主；PicoClaw 今日 Issues 为 0；DeepSeek Harness 未启用 Issues/PR，以 Discussions 184 条更新为热度口径。

---

## 1. 生态全景

个人 AI 助手开源生态已进入“平台化 + 多通道 + 插件生态”竞争阶段：头部项目日更数百 Issue/PR、高频发版，功能覆盖从 Agent 编排、模板/插件、多 IM 通道到企业连接与权限隔离。与此同时，社区矛盾正从“功能有没有”转向“能不能长期无人值守稳定运行”——升级可靠性、长跑断联、静默失败、缓存成本、安全边界成为跨项目共性问题。生态分层明显：OpenClaw、hermes-agent 处于超高吞吐第一梯队；AstrBot、QwenPaw、Zeroclaw 在中高活跃区间垂直推进；PicoClaw 进入维护清理；DeepSeek Harness 以 Discussions + RC 密集迭代，但修复可验证性偏低。整体仍处快速迭代期，**生产级可靠性与可观测性**是下一阶段分水岭。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新（活跃/关闭） | PR 更新（待合并/合并关闭） | Release | 健康度评估 |
|---|---:|---:|---:|---|
| **OpenClaw** | 459（330/129，关闭率 28.1%） | 500（307/193，合并率 38.6%） | 2 | 超高活跃、发版快；评审与升级链路是主要瓶颈 |
| **hermes-agent** | 338（305/33，关闭率 9.8%） | 500（328/172，处理率 34.4%） | 2（v0.23.3 + canary） | 超高吞吐；统一网关稳定性承压，P1 缺可见 fix PR |
| **AstrBot** | 5（4/1） | 46（28/18，约 39%） | 0 | 中高活跃；安全/CI 推进，但 P0 QQ 断联无 fix 归属 |
| **QwenPaw** | 23（11/12，关闭率 52.2%） | 31（24/7，合并率 22.6%） | 0 | 高活跃；Issue 清理快、PR 合入慢，通道静默失败突出 |
| **Zeroclaw** | 12（10/2） | 50（50/0，0 合并） | 0 | 输入活跃、输出受限；0 合并 + S1 daemon 启动阻塞 |
| **PicoClaw** | 0 | 5（0/5） | 0 | 低活跃；集中清理长期积压，需求侧信号弱 |
| **DeepSeek Harness** | N/A（Discussions 184） | N/A（未启用 PR） | 0 | 讨论活跃；RC 密集，但缺陷收敛与修复可验证性低 |

**关键读数**：  
- OpenClaw 与 hermes-agent 今日 PR 更新均达 **500 条**，并列样本最高。  
- OpenClaw Issue 更新 **459 条**，高于 hermes-agent 的 **338 条**，为样本最高。  
- QwenPaw Issue 关闭率 **52.2%** 较高，但 PR 合并率仅 **22.6%**；Zeroclaw 今日 **0 PR 合并**，评审吞吐是硬约束。  
- AstrBot PR 合并率约 **39%**，但 Issue 样本仅 5 条，P0 故障响应优先级更突出。  

---

## 3. OpenClaw 在生态中的定位

**优势：规模最大、平台化最完整。**  
OpenClaw 今日 Issues 459、PR 500、Release 2，处于样本第一梯队；Release Note 披露累计 **9,900+ PR、745 位贡献者**，社区规模显著领先。其能力覆盖 Agent 模板、ClawHub、OpenClaw ID、Gateway 角色体系、多通道、Doctor/updater 升级链路，属于“全栈个人 AI 助手平台”路线。

**技术路线差异：以 Gateway 为中心 + 模板/身份生态 + 升级链路治理。**  
与 hermes-agent 的“统一网关集中化”相似但更强调模板与身份体系：ClawHub Agent 模板采用单一 `CLAW.md` manifest，随包 skill 走原生信任流程；OpenClaw ID 统一 Gateway 角色权限；同时把 Prompt 前缀稳定性作为核心性能议题（#201710 工具集冻结、#201723 回归测试）。

**社区规模对比：第一梯队，但评审与升级器是短板。**  
OpenClaw 今日 Issue 更新量为 hermes-agent 的约 1.36 倍；PR 待合并 **307 条**，与 hermes-agent 的 **328 条**同处高位。Top 50 高评论 Issue 中约 **42 条**带 `no-new-fix-pr` 标记，说明高热度问题多停留在诊断阶段。其最大风险不是功能不足，而是“高频发版 + 脆弱升级器”形成负向循环：P0 级 Doctor WAL 校验失败、`state-migrated-no-rollback`、Windows 计划任务校验失败等直接侵蚀升级信任。

**结论**：OpenClaw 是生态中功能最全、规模最大的参照项目；优势在模板/身份/多通道/平台化，短板在升级可靠性与评审吞吐。与 hermes-agent 相比，OpenClaw 更“模块化 + 模板生态”，hermes-agent 更“单进程统一网关 + 企业连接”。

---

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 / 证据 |
|---|---|---|
| **升级与生命周期可靠性** | OpenClaw、Zeroclaw、hermes-agent、AstrBot、DeepSeek Harness | OpenClaw Doctor WAL/state migration 半完成；Zeroclaw daemon 启动因临时文件泄漏挂起；hermes `owed-restart` 无法清除；AstrBot QQ 长跑断联；DeepSeek workspaceController 不可用 |
| **Prompt/前缀缓存与成本可控** | OpenClaw、QwenPaw、AstrBot、hermes-agent | OpenClaw 工具表漂移致 cacheRead 跌至 1–3%；QwenPaw 工具 schema 未排序/env_context 交错致 prefix cache 不稳定；AstrBot 需 Anthropic 缓存开关；hermes 网关重复全量读会话历史占 1.5–2.5 CPU 核 |
| **静默失败与可观测性** | OpenClaw、Zeroclaw、QwenPaw、hermes-agent、AstrBot、DeepSeek Harness | Telegram 死信、Matrix consumer closed；插件安装“假成功”；微信 128 条后双向静默失效、QQ `enabled` 被重置；hermes “No reply”/worker receipt timeout；AstrBot QQ 单向断联；DeepSeek workflow 永不返回/认证 431 |
| **多 IM 通道生产化** | OpenClaw、QwenPaw、hermes-agent、AstrBot、Zeroclaw | Telegram/Matrix/iMessage/WhatsApp/Discord；QQ/微信/Telegram topic 隔离；Slack/BlueBubbles；QQ 官方机器人；Discord/Matrix/Signal/XMPP。共同诉求：重连、投递保证、审批交互、健康状态 |
| **安全边界与凭据隔离** | OpenClaw、Zeroclaw、hermes-agent、AstrBot、DeepSeek Harness | OpenClaw ID/非 owner 渠道作用域；Zeroclaw scoped credentials/TOTP/SSH broker；hermes mTLS 与凭据落盘；AstrBot PyPI TLS 校验/shell 出站审批；DeepSeek Windows 沙箱 ACL 与数据损毁事件 |
| **插件/模板生态治理** | OpenClaw、Zeroclaw、hermes-agent、QwenPaw、AstrBot、DeepSeek Harness | ClawHub 私有模板；多 plugin registry origins；插件目录批量提交需审核；插件 SDK/MCP；插件配置与 i18n；插件 API 兼容性检查 |
| **Agent 编排正确性** | OpenClaw、QwenPaw、AstrBot、DeepSeek Harness、hermes-agent | 工具表漂移；DoomLoopGate 不触发；命令别名吞参数/工具参数丢失；workflow 死锁；Kanban worker 崩溃。共同指向幂等、重试、可恢复与超时 |
| **UI/跨平台体验** | QwenPaw、AstrBot、hermes-agent、DeepSeek Harness、OpenClaw | 移动端窄屏/safe-area；Safari 裁切；桌面转录重复/错序；中文输入法损坏；窗口状态不持久化；Control UI 本地化 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 全栈个人 AI 助手平台：Agent 模板、ClawHub、OpenClaw ID、Gateway、多通道、Doctor/updater | 自托管重度用户、模板/插件创作者、多通道个人助理 | Gateway 中心 + Doctor/updater 状态迁移 + 模板信任流程 + Prompt 缓存稳定性 |
| **hermes-agent** | 统一网关、企业连接、插件目录、Kanban/cron/Desktop/CLI/API | 企业内网、多 profile 长期在线、桌面工作区 | 单进程统一网关，吞吐强但故障隔离承压；mTLS 是差异化企业能力 |
| **QwenPaw** | Console UI/UX、多 IM 通道、插件化、本地模型/MCP/Reranker | 中文/多 IM 社群、生产通道集成、本地模型用户 | 插件 SDK + provider 回退 + 通道适配；当前 PR 合入偏慢 |
| **Zeroclaw** | 安全凭据、canonical provider/model registry、Rust 原生 SSH/XMPP、插件多源 registry | 安全敏感自托管、私有模型路由、多通道 | canonical V5 registry + scoped credentials；高风险大 PR 多，评审重 |
| **AstrBot** | QQ 官方机器人、插件生态、知识库、Provider 聚合、WebUI | 中文社群/QQ/多 IM 运营者 | 插件系统 + Provider 适配 + Dashboard；长跑稳定性是主要痛点 |
| **PicoClaw** | 轻量维护清理、provider 工具调用解析、CI 降噪 | 轻量/小型部署场景，需求侧信号不足 | 规模较小，当前以关闭长期积压 PR 为主 |
| **DeepSeek Harness** | 桌面端、Windows 沙箱、插件 seam、长流程 Agent 编排 | Windows 桌面个人开发者、插件自扩展用户 | Release 驱动 + Discussions 反馈；Windows ACL + ConPTY 沙箱是集中问题模块 |

---

## 6. 社区热度与成熟度

**第一梯队：超高活跃、高速迭代，但稳定性与评审债同步上升**
- **OpenClaw**：459 Issues / 500 PR / 2 Releases；规模最大、发版最快，但 307 条待合并 PR、升级链路 P0 问题集中。
- **hermes-agent**：338 Issues / 500 PR / 2 Releases；v0.23.3 一次性滚动约 370 个 PR，吞吐极强；但 Issue 关闭率仅 9.8%，统一网关带来故障放大效应。

**第二梯队：中高活跃、垂直推进，评审吞吐是共同瓶颈**
- **QwenPaw**：23 Issues / 31 PR，Issue 关闭率 52.2%，但 PR 合并率 22.6%；Console 移动端、通道静默失败是热点。
- **AstrBot**：5 Issues / 46 PR，约 39% 合并；安全、CI、知识库并发上传有实质推进，但 P0 QQ 断联无 fix 归属。
- **Zeroclaw**：12 Issues / 50 PR，但 **0 合并**；输入活跃、输出受限，S1 daemon 启动阻塞需优先处理。

**第三梯队：低活跃维护清理或“讨论活跃但修复不可验证”**
- **PicoClaw**：0 Issues / 5 PR 全部关闭，集中清理 2–9 个月积压；健康度偏维护型，需求信号弱。
- **DeepSeek Harness**：184 Discussions、0 Release；Top 15 中 12 条为 Bug（80%），Windows 沙箱相关 4 条；RC 密集但修复闭环不可见，属“高讨论、低可验证”状态。

**成熟度判断**：OpenClaw/hermes-agent 功能覆盖最广，但均处“高吞吐、高复杂度、稳定性承压”阶段；AstrBot/QwenPaw/Zeroclaw 在垂直场景快速迭代，需解决评审带宽；PicoClaw 进入质量巩固；DeepSeek Harness 仍处 RC 缺陷收敛期。

---

## 7. 值得关注的趋势信号

1. **“长期无人值守”成为生产级分水岭。**  
   OpenClaw 升级半完成/不可回滚、Zeroclaw daemon 启动挂起、AstrBot 30–40 小时单向断联、hermes `owed-restart` 无法清除，均说明用户已把项目当长期在线服务运行。开发者应优先设计：可回滚升级、健康检查、自愈、状态迁移门禁、重启义务可视化。

2. **缓存与成本从“优化项”升级为“一等公民”。**  
   OpenClaw prompt cache 失效、QwenPaw prefix cache 工具 schema 排序问题、AstrBot Anthropic 缓存开关、hermes 网关重复读历史，均直接放大成本与延迟。建议：稳定 prompt 前缀、冻结工具集、缓存命中率指标、可配置关闭缓存、工具 schema 确定性排序。

3. **“失败必须可见”应成为设计原则。**  
   Telegram 死信、微信 128 条静默失效、QQ `enabled` 重置、provider disabled 仅显示 Internal error、workflow 永不返回——共同模式是“没有报错、没有告警”。建议死信队列、状态页、错误分类、重试/降级、通道健康检查。

4. **安全边界从“功能安全”走向“运行时最小权限”。**  
   Zeroclaw scoped credentials、hermes mTLS 与凭据落盘、AstrBot PyPI TLS/shell 审批、DeepSeek 沙箱 ACL 与数据损毁事件，说明凭据不可见、危险操作二次确认、沙箱隔离、插件准入是刚需。

5. **统一网关/单进程集中化需配套故障隔离。**  
   hermes 单次卡顿杀死 4 个 Kanban worker、OpenClaw Gateway 与 Doctor 升级耦合，显示集中化收益伴随故障放大。建议 worker 隔离、背压、超时、局部降级、可观测性。

6. **插件/模板生态进入“治理期”。**  
   OpenClaw ClawHub 模板、Zeroclaw 多 registry、hermes 插件目录批量提交、DeepSeek 插件 API 兼容检查，均指向同一问题：生态扩张后需要 semver/deprecation policy、兼容性检查、审核与质量门禁。

7. **多 IM 通道生产化与移动端体验成为留存因素。**  
   QQ/微信/Telegram/Matrix/Slack/BlueBubbles 等通道问题高频出现；QwenPaw 窄屏布局、AstrBot Safari 裁切、DeepSeek 中文输入法/窗口状态，说明跨平台与响应式体验已直接影响日常使用信心。

**对 AI 智能体开发者的参考**：下一阶段竞争力不只在模型接入和 Agent 能力，而在**可靠升级、失败可见、成本可控、权限隔离、插件治理**五项工程化能力。谁先把“能跑”变成“可长期放心跑”，谁就更可能获得生产级用户。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报（2026-11-20）

> 数据窗口：过去 24 小时。  
> 说明：PR 评论数字段缺失，且 50 条 PR 中仅展示 20 条；因此 PR 讨论热度无法精确量化，积压与关联修复判断存在可见性限制。

## 1. 今日速览

过去 24 小时，Zeroclaw 的 Issue 活跃度中等偏高：12 条更新，其中 10 条新开/活跃、2 条关闭。PR 侧更新量很高但合并吞吐为 0：50 条均为待合并，今日无 PR 合并或关闭。版本发布为 0，release:v0.9.1 标签已出现在个别 Issue 上，但尚无实际 Release 产出。整体健康度呈现“开发与提案活跃、评审与集成瓶颈明显”的状态，且存在 1 条 S1 级 daemon 启动阻塞问题，需要优先关注。

## 2. 版本发布

无新版本发布。过去 24 小时 Releases 数量为 0。  
相关信号：[#11580](https://github.com/zeroclaw-labs/zeroclaw/issues/11580) 与 [#12476](https://github.com/zeroclaw-labs/zeroclaw/issues/12476) 带有 `release:v0.9.1` 标签，但数据中未见对应 GitHub Release。

## 3. 项目进展

今日没有 PR 合并或关闭，代码集成层面的推进为 0/50。Issue 侧关闭 2 条，主要涉及文档与可观测性收尾：

- [#12217](https://github.com/zeroclaw-labs/zeroclaw/issues/12217) `[CLOSED]`：Email tools-only 文档需说明 approval routes 也会启动 IMAP listener。
- [#12476](https://github.com/zeroclaw-labs/zeroclaw/issues/12476) `[CLOSED]`：gateway 通过 `spawn!` 以 INFO 记录每个连接，导致 runtime trace 被淹没；已关闭，但具体修复方式未在数据中说明。

待合并 PR 中，推进方向较明确的功能包括：

| PR | 方向 | 信号 |
|---|---|---|
| [#12450](https://github.com/zeroclaw-labs/zeroclaw/pull/12450) | 采用 canonical V5 registry 与运行时模型绑定 | `risk:high`、`size:XL`、`needs-author-action`，属于 provider/model 基础设施大改动 |
| [#12453](https://github.com/zeroclaw-labs/zeroclaw/pull/12453) | Web 端编辑 canonical registry 并选择精确模型引用 | 与 #12450/#12452 构成依赖栈 |
| [#12452](https://github.com/zeroclaw-labs/zeroclaw/pull/12452) | Zerocode 配置与选择 canonical provider models | 同上，属于模型选择链路 |
| [#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596) | 浏览器用户名/密码与 TOTP 授权独立作用域 | 与 RFC #12422 相关，安全权限细化 |
| [#12579](https://github.com/zeroclaw-labs/zeroclaw/pull/12579) | MCP 声明的 MP4 资源路由到 Qwen 视频输入 | 多模态输入能力扩展 |
| [#12438](https://github.com/zeroclaw-labs/zeroclaw/pull/12438) | 原生 Rust SSH task broker | 工具/执行通道基础设施 |
| [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) | 原生 Rust XMPP，可选 legacy OMEMO | 新 channel 与安全通信 |
| [#12216](https://github.com/zeroclaw-labs/zeroclaw/pull/12216) | 支持多个 plugin registry origins | 插件生态与私有/公共 registry 并存 |
| [#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391) | 有界 delegate 的 workspace、tool ceiling、command policy 持续约束 | 安全边界修复，长期开放 |

总体看，项目正在集中推进 provider/model registry、凭据作用域、channel/transport 和插件生态，但由于今日 0 合并，所有推进仍停留在评审或待合并阶段。

## 4. 社区热点

可量化的讨论热度集中在 Issues；PR 评论数未提供，无法按评论量排序。Issues 中评论最多的是：

| Issue | 评论 | 热度原因 |
|---|---:|---|
| [#11296](https://github.com/zeroclaw-labs/zeroclaw/issues/11296) | 7 | llama.cpp/custom provider 使用错误 URL/URI 抓取模型，影响自定义 router 场景 |
| [#9345](https://github.com/zeroclaw-labs/zeroclaw/issues/9345) | 7 | 每次 PR diff 变化时重算 `size:*`/`risk:*` 标签，涉及 CI 自动化与维护者负担 |
| [#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635) | 5 | runtime profile 成本上限与实际全局日预算不一致，造成“显示无上限但实际被拒绝” |
| [#11580](https://github.com/zeroclaw-labs/zeroclaw/issues/11580) | 5 | x86_64 Linux release binary 距 64 MiB 上限仅约 0.7 MB，发布 size gate 需定策 |
| [#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) | 3 | RFC：operator-managed service credentials 的作用域使用，避免凭据暴露给模型/聊天/技能文本 |

背后的核心诉求是：provider 配置必须可靠、成本与预算展示必须一致、发布门禁需要明确策略、PR 风险标签应自动化，以及安全凭据需要“可授权但不可见”的细粒度模型。

PR 侧值得重点关注的不是评论热度，而是规模与风险：[#12450](https://github.com/zeroclaw-labs/zeroclaw/pull/12450)、[#12453](https://github.com/zeroclaw-labs/zeroclaw/pull/12453)、[#12452](https://github.com/zeroclaw-labs/zeroclaw/pull/12452) 构成 canonical registry 依赖栈；[#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596)、[#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847)、[#12438](https://github.com/zeroclaw-labs/zeroclaw/pull/12438) 均涉及安全或高风险管理。

## 5. Bug 与稳定性

按严重程度排列。注：以下“未见直接 fix PR”仅基于今日展示的 20 条 PR，无法排除未展示的 30 条 PR 中已有修复。

| 严重度 | Issue | 状态 | 问题 | Fix PR 判断 |
|---|---|---|---|---|
| S1 | [#12570](https://github.com/zeroclaw-labs/zeroclaw/issues/12570) | OPEN | daemon 启动时因数百万个失败的 rolling trim 泄漏 `runtime-trace.tmp.*` 文件而挂起，workflow blocked | 展示 PR 中未见直接修复 |
| S2 | [#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635) | OPEN, in-progress | runtime profile 成本上限未反映有效全局日预算，出现“显示无上限但实际拒绝” | 展示 PR 中未见直接修复 |
| S2 | [#12569](https://github.com/zeroclaw-labs/zeroclaw/issues/12569) | OPEN | `plugin install` / `plugin list --verify` 在插件名与内置工具名冲突时误报加载成功 | 展示 PR 中未见直接修复 |
| S2 | [#12476](https://github.com/zeroclaw-labs/zeroclaw/issues/12476) | CLOSED | gateway 每个连接以 INFO 日志记录，淹没 runtime trace | 已关闭，修复方式未在数据中说明 |
| S3 | [#11296](https://github.com/zeroclaw-labs/zeroclaw/issues/11296) | OPEN | llama.cpp/custom provider 未正确使用非 localhost/127.0.0.1 的 URI 抓取模型 | 展示 PR 中未见直接修复 |
| S3 | [#12568](https://github.com/zeroclaw-labs/zeroclaw/issues/12568) | OPEN | Dashboard Cost Overview 条形图按最大值缩放，Monthly bar 永远满格 | 展示 PR 中未见直接修复 |

最高优先级是 [#12570](https://github.com/zeroclaw-labs/zeroclaw/issues/12570)：它直接阻塞 daemon 启动，且涉及日志 writer 的临时文件泄漏与启动扫描两个缺陷叠加。其次是 [#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635) 的成本预算一致性问题，属于运营与用户信任层面的 S2。

## 6. 功能请求与路线图信号

结合已有 Issue/PR，较明确的功能信号包括：

- [#12557](https://github.com/zeroclaw-labs/zeroclaw/issues/12557)：为 Discord 和 Matrix 增加类似 Telegram 的审批/拒绝交互，例如 emoji reaction。诉求是补齐非 CLI channel 的工具调用审批体验。当前未见直接 PR，但属于明确的 UX parity 需求。
- [#11955](https://github.com/zeroclaw-labs/zeroclaw/issues/11955)：实现 Signal channel 的 `listener_health()`，并让 dashboard 的 channel readiness 使用该信号。与现有 dashboard/channel 健康展示方向一致，可能进入后续版本。
- [#9345](https://github.com/zeroclaw-labs/zeroclaw/issues/9345)：每次 PR diff 变化时重算 `size:*` 与 `risk:*` 标签，避免人工维护。已 `status:in-progress`、`status:accepted`，但自 7 月开放至今，仍需推进。
- [#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422)：operator-managed service credentials 的作用域使用 RFC。与 [#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596) 的浏览器凭据独立授权、[#12490](https://github.com/zeroclaw-labs/zeroclaw/pull/12490) 的 HTTP Authorization Token、[#12438](https://github.com/zeroclaw-labs/zeroclaw/pull/12438) 的 SSH broker 形成较强的“凭据不暴露给模型”路线图信号。
- [#11580](https://github.com/zeroclaw-labs/zeroclaw/issues/11580)：release binary size gate 策略。带有 `release:v0.9.1` 标签，属于发布前必须决策的事项。

从 PR 方向看，下一阶段最可能聚焦于 canonical provider/model registry、模型精确引用、MCP 多模态输入、scoped credentials、插件 registry 多源支持与 channel/transport 扩展。但当前所有相关 PR 均未合并，实际进入下一版本的时间取决于评审与依赖栈清理速度。

## 7. 用户反馈摘要

从 Issue 摘要与标签提炼，当前真实痛点主要集中在：

- **自定义 provider 配置不可靠**：[#11296](https://github.com/zeroclaw-labs/zeroclaw/issues/11296) 中，用户为 llama.cpp/custom provider 配置非本机 URI 后，Zeroclaw 未能正确抓取 router 模型。场景是本地/私有模型路由接入。
- **成本预算展示与实际行为不一致**：[#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635) 显示 profile 看似无上限，但进程级成本账本超过 $10.00 后仍拒绝 agent turn，造成运营困惑。
- **插件安装反馈存在“假成功”**：[#12569](https://github.com/zeroclaw-labs/zeroclaw/issues/12569) 中，与内置工具同名的插件安装和校验均显示会加载，但运行时拒绝注册，模型永远看不到该工具。
- **日志噪声影响可观测性**：[#12476](https://github.com/zeroclaw-labs/zeroclaw/issues/12476) 反映 gateway 每个连接都打 INFO，runtime trace 被淹没；该 Issue 已关闭。
- **非 CLI channel 审批体验不均衡**：[#12557](https://github.com/zeroclaw-labs/zeroclaw/issues/12557) 认为 Telegram 的审批按钮明显优于 Discord/Matrix，后两者缺少便捷审批交互。
- **健康状态不可见**：[#11955](https://github.com/zeroclaw-labs/zeroclaw/issues/11955) 希望 Signal listener 健康状态进入 `/health` 和 dashboard channel readiness。
- **Dashboard 成本可视化误导**：[#12568](https://github.com/zeroclaw-labs/zeroclaw/issues/12568) 中 Daily/Monthly 金额正确，但条形图不按预算测量，Monthly 永远满格。
- **daemon 启动可靠性风险**：[#12570](https://github.com/zeroclaw-labs/zeroclaw/issues/12570) 是今日最严重的用户阻塞型问题，涉及日志临时文件泄漏导致启动挂起。

满意信号方面，公开数据中缺少直接正向评论；可观察到的是用户对 Telegram 审批交互的偏好，以及对 dashboard/channel 健康可视化的明确期待。整体反馈偏向“功能已具备但一致性、可观测性和错误反馈仍需加强”。

## 8. 待处理积压

今日 PR 积压为 50 条待合并、0 条合并/关闭，评审吞吐是当前最明显的健康度风险。长期未响应或高风险重点项包括：

| 类型 | 条目 | 开放时间/状态 | 关注理由 |
|---|---|---|---|
| PR | [#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391) | 2026-08-26 创建，约 86 天 | 有界 delegate 的 workspace/tool ceiling/command policy 安全修复，`risk:high`、`size:XL`、`needs-author-action` |
| Issue | [#9345](https://github.com/zeroclaw-labs/zeroclaw/issues/9345) | 2026-07-24 创建，约 119 天 | PR risk/size 标签自动重算，已 accepted/in-progress，但长期未闭环 |
| Issue | [#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635) | 2026-09-05 创建，约 76 天 | P1 成本预算一致性，影响用户信任与运行时行为 |
| Issue | [#11296](https://github.com/zeroclaw-labs/zeroclaw/issues/11296) | 2026-09-30 创建，约 51 天 | 7 条评论，自定义 provider URI 问题仍未修复 |
| Issue | [#11580](https://github.com/zeroclaw-labs/zeroclaw/issues/11580) | 2026-10-06 创建，约 45 天 | `release:v0.9.1` 发布 size gate 决策事项 |
| PR | [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) | 2026-10-19 创建，约 32 天 | 原生 XMPP/OMEMO，安全与 channel 大改动，`needs-maintainer-review` |
| PR | [#11911](https://github.com/zeroclaw-labs/zeroclaw/pull/11911) | 2026-10-20 创建，约 31 天 | channel 完成态工具结果保留与有界恢复，`size:XL` |
| Issue | [#11955](https://github.com/zeroclaw-labs/zeroclaw/issues/11955) | 2026-10-22 创建，约 29 天 | Signal listener health 与 dashboard readiness，影响 channel 可观测性 |
| PR | [#12450](https://github.com/zeroclaw-labs/zeroclaw/pull/12450) / [#12453](https://github.com/zeroclaw-labs/zeroclaw/pull/12453) / [#12452](https://github.com/zeroclaw-labs/zeroclaw/pull/12452) | 2026-11-15 创建，约 5 天 | canonical registry/model 引用依赖栈，规模大且相互依赖，需协调评审顺序 |

建议维护者优先处理：  
1. S1 [#12570](https://github.com/zeroclaw-labs/zeroclaw/issues/12570) 的 daemon 启动阻塞；  
2. 决策 [#11580](https://github.com/zeroclaw-labs/zeroclaw/issues/11580) 的 release size gate，避免 v0.9.1 发布受阻；  
3. 清理 [#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391) 与 canonical registry 依赖栈的评审状态；  
4. 对 [#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) 安全 RFC 及其关联 PR 给出明确路线图判断。  

整体而言，Zeroclaw 今日“输入活跃、输出受限”：社区和贡献者仍在持续提交高价值 Issue/PR，但 0 合并与 50 条待合并 PR 表明评审与集成是当前项目健康度的主要约束。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报  
**报告日期：2026-11-20**  
**数据口径：**过去 24 小时 Issues 更新 0 条；PR 更新 5 条（待合并 0，已合并/关闭 5）；新版本 0 个。下列 PR 评论字段为 `undefined`，视为数据缺失，不作“0 评论”推断。

## 1. 今日速览

今日 PicoClaw 的 Issue 侧无新增/活跃/关闭记录，Release 侧无新版本，社区讨论信号偏弱；PR 侧有 5 条更新且全部为已合并/关闭，过去 24 小时待合并 PR 为 0。活跃度评估为**低至中等**：并非新提交驱动，而是维护侧对积压 PR 的集中清理。项目健康度呈现“维护清理积极、需求侧信号不足、发布节奏空白”的特征。重点进展集中在 provider 工具调用解析健壮性修复、CI 工作流降噪，以及多个旧修复 PR 的聚合关闭。  

---

## 2. 版本发布

无新版本发布，本节省略。今日无 Release 数据可供分析。

---

## 3. 项目进展

今日 5 条 PR 全部为已合并/关闭，待合并 0 条。其中 3 条为 `xuwei-xy` 发起的聚合修复 PR，摘要显示分别合并/收拢多个旧 PR 的修复；另外 2 条分别涉及 provider 工具调用解析和 CI 定时任务调整。整体看，项目今日主要向前推进了**积压清理、工具调用稳定性、CI 维护成本降低**三件事。

| PR | 状态 | 类型 | 推进内容 | 链接 |
|---|---|---|---|---|
| #586 | CLOSED | provider / bug | 改进 tool call 提取与 stripping，支持更复杂的模型输出；引入状态感知扫描以处理嵌套对象、JSON 字符串和转义字符 | [链接](https://github.com/sipeed/picoclaw/pull/586) |
| #2516 | CLOSED | CI / chore | 移除 sync-rebase workflow 的每日 cron 定时触发，保留手动 `workflow_dispatch` | [链接](https://github.com/sipeed/picoclaw/pull/2516) |
| #1560 | CLOSED | 聚合修复 | 合并/收拢 PR #1312、#1311、#1308 的修复 | [链接](https://github.com/sipeed/picoclaw/pull/1560) |
| #1555 | CLOSED | 聚合修复 | 合并/收拢 PR #1390、#1389、#1383、#1381 的修复 | [链接](https://github.com/sipeed/picoclaw/pull/1555) |
| #1551 | CLOSED | 聚合修复 | 合并/收拢 PR #1428、#1422、#1417 的修复 | [链接](https://github.com/sipeed/picoclaw/pull/1551) |

**推进量化：**今日关闭 5 个 PR，其中 3 个聚合修复 PR 摘要共引用 10 个旧 PR（#1312/#1311/#1308、#1390/#1389/#1383/#1381、#1428/#1422/#1417），叠加 #586 和 #2516，说明维护侧正在处理较长周期的 PR 积压。项目整体前进幅度中等，主要体现在稳定性与维护流程，而非新功能发布。

---

## 4. 社区热点

今日无 Issues 更新；PR 评论数为 `undefined`、点赞均为 0，**未形成可量化的评论/反应热点**。按技术影响看，最值得关注的是 provider 工具调用解析修复 #586；其次是 CI 定时 rebase 触发调整 #2516。

- [#586 provider tool call extraction/stripping 修复](https://github.com/sipeed/picoclaw/pull/586)：背后诉求是兼容多模型、复杂输出下的工具调用解析，降低代理调用工具时的解析失败风险。
- [#2516 禁用 scheduled sync-rebase trigger](https://github.com/sipeed/picoclaw/pull/2516)：背后诉求是减少自动 rebase 带来的 CI 噪音和维护不确定性，改为手动触发以增强可控性。

**分析：**今日社区互动数据不足，无法判断真实讨论热度；热点更偏“维护者/贡献者技术修复”而非用户侧讨论。

---

## 5. Bug 与稳定性

今日 Issues 更新 0 条，无新报告的 Bug、崩溃或回归问题。已关闭 PR 中，#586 属于 provider 侧稳定性修复，影响工具调用提取与剥离逻辑，严重程度可评估为**中高**：若解析失败，可能影响 Agent 工具调用链路；该问题已有 fix PR 且已关闭。

| 问题/修复 | 严重程度 | 状态 | 说明 | 链接 |
|---|---|---|---|---|
| provider tool call 提取与 stripping 健壮性 | 中高 | 已有 fix PR，已关闭 | 支持嵌套对象、JSON 字符串、转义字符等复杂输出，降低解析错误 | [#586](https://github.com/sipeed/picoclaw/pull/586) |

**稳定性结论：**今日无新增稳定性告警；#586 对 provider 兼容性有正向作用。CI 侧 #2516 降低定时 workflow 干扰，属于维护稳定性优化。

---

## 6. 功能请求与路线图信号

今日无新 Issues，无法从用户侧提炼新增功能请求。结合已关闭 PR，可识别两类路线图信号：

- **多 provider / 复杂模型输出兼容性**： #586 表明工具调用解析需要更强鲁棒性，可能继续影响后续 provider 适配和 Agent 工具调用稳定性。[链接](https://github.com/sipeed/picoclaw/pull/586)
- **CI 与协作流程可控性**：#2516 移除每日定时 sync-rebase，保留手动触发，反映项目倾向于减少自动化噪音、提高维护可控性。[链接](https://github.com/sipeed/picoclaw/pull/2516)

由于今日无新版本发布，且无法确认这些关闭 PR 是否进入具体 release，暂不能判断下一版本的明确功能范围；若已合并，则上述修复可能进入后续版本。

---

## 7. 用户反馈摘要

今日无 Issues 评论数据，无法提炼真实用户痛点、使用场景和满意/不满意反馈。仅能从 PR 摘要观察贡献者/维护者反馈：

- #586 反映的实际痛点是：复杂模型输出中的 tool call 提取需要状态感知解析，避免嵌套 JSON、字符串和转义字符导致解析失败。[链接](https://github.com/sipeed/picoclaw/pull/586)
- #2516 反映的维护痛点是：每日定时 sync-rebase 可能带来不必要的 CI 触发和 rebase 噪音，手动触发更符合当前维护需求。[链接](https://github.com/sipeed/picoclaw/pull/2516)

**结论：**今日用户侧反馈样本为 0，不能推断用户满意度变化；贡献者侧反馈集中在稳定性与 CI 降噪。

---

## 8. 待处理积压

今日关闭的 PR 创建时间跨度较长：#586 创建于 2026-02-21，#2516 创建于 2026-04-14，#1560/#1555/#1551 创建于 2026-03-14，均在 2026-11-19 更新并关闭。说明维护者正在清理长期积压 PR，这是积极信号；但也提示历史 PR 审查周期偏长。

| 长期 PR | 创建时间 | 关闭/更新时间 | 提醒 | 链接 |
|---|---:|---:|---|---|
| #586 | 2026-02-21 | 2026-11-19 | 从创建到关闭约 9 个月，建议关注同类 provider 修复的审查时效 | [链接](https://github.com/sipeed/picoclaw/pull/586) |
| #2516 | 2026-04-14 | 2026-11-19 | CI 调整经历较长周期，建议后续小范围 workflow 变更加快合入 | [链接](https://github.com/sipeed/picoclaw/pull/2516) |
| #1560 | 2026-03-14 | 2026-11-19 | 聚合修复 PR 关闭，建议确认被引用修复的后续跟踪 | [链接](https://github.com/sipeed/picoclaw/pull/1560) |
| #1555 | 2026-03-14 | 2026-11-19 | 聚合修复 PR 关闭，建议确认被引用修复的后续跟踪 | [链接](https://github.com/sipeed/picoclaw/pull/1555) |
| #1551 | 2026-03-14 | 2026-11-19 | 聚合修复 PR 关闭，建议确认被引用修复的后续跟踪 | [链接](https://github.com/sipeed/picoclaw/pull/1551) |

**维护建议：**今日 Issue 更新为 0，建议维护者确认 issue tracker 与社区渠道是否正常；同时继续关注长期 open PR 的审查周期，避免积压再次形成。整体健康度：**积压清理积极，稳定性有正向修复；但需求侧信号和发布节奏偏弱，需持续观察。**

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报（2026-11-20）

## 1. 今日速览

- 过去 24 小时 Issues 更新 **23 条**（新开/活跃 11，已关闭 12），PR 更新 **31 条**（待合并 24，已合并/关闭 7），**无新版本发布**。
- Issue 关闭率约 **52.2%**，PR 合并/关闭率约 **22.6%**，项目保持高活跃，但 **PR 审查与合入吞吐是当前主要瓶颈**。
- 今日焦点集中在 **Console 移动端/窄屏适配**、**provider 禁用后的通道稳定性**、**QQ/微信等通道静默失败**，以及 **UI/UX 与数据生命周期**。
- 多个修复 PR 已在同日开出，包括 #8823、#8824、#8825，但均处于 OPEN 状态，实际修复尚未落地。
- 社区侧对“静默失败、缺少日志与降级、移动端体验差”的反馈较集中，维护者需优先处理高严重度通道问题。

## 2. 版本发布

本周期无新版本发布，故省略版本更新内容、破坏性变更与迁移说明。

## 3. 项目进展

- 今日关闭 **12 条 Issue**，覆盖调度任务可见性 #8815、DoomLoopGate #8700、QQ 群消息丢弃 #8313、Checkpoint/微信通道 #8627、小艺通道 #8394、安全门 #8513、QQ 流式 #6421/#8307、清理页 #6593、远程 Playwright #4617、服务器代理客户端 #7002、记忆检索 #7019。Issue 侧呈现明显的历史积压清理。  
  代表链接：  
  - https://github.com/agentscope-ai/QwenPaw/issues/8815  
  - https://github.com/agentscope-ai/QwenPaw/issues/8700  
  - https://github.com/agentscope-ai/QwenPaw/issues/8313  
  - https://github.com/agentscope-ai/QwenPaw/issues/8513

- 可见 PR 样本中，#8822 `docs: update website for v2.3.0` 已关闭，属于文档站点同步；其余展示的 20 条 PR 仍为 OPEN。代码合入侧今日可见的功能性推进有限，更多是修复 PR 排队等待审查。  
  https://github.com/agentscope-ai/QwenPaw/pull/8822

- 已开出的关键修复 PR 包括：  
  - #8823 修复宽表格/代码块无法横向滚动与窄屏剪裁，对应 #8811；  
  - #8824 修复移动端全屏容器顶部安全区，对应 #8796；  
  - #8825 provider 被禁用后回退全局默认模型，对应 #8579。  
  三者均未合并，修复效果待验证。  
  https://github.com/agentscope-ai/QwenPaw/pull/8823  
  https://github.com/agentscope-ai/QwenPaw/pull/8824  
  https://github.com/agentscope-ai/QwenPaw/pull/8825

- 架构主线仍在推进插件化与模块解耦：插件 SDK 1.1 #8764、本地模型管理插件 #8499、MCP 插件 #8469、Reranker 模型中心 #8472。项目整体呈“Issue 清理较快、PR 合入偏慢”的状态，净进展更偏向整理积压，功能合入速度落后于问题关闭速度。  
  https://github.com/agentscope-ai/QwenPaw/pull/8764  
  https://github.com/agentscope-ai/QwenPaw/pull/8499  
  https://github.com/agentscope-ai/QwenPaw/pull/8469  
  https://github.com/agentscope-ai/QwenPaw/pull/8472

## 4. 社区热点

- **#8811 [OPEN] 窄屏下消息文字被剪裁，表格/代码块无法横向滚动**：4 条评论，今日最活跃 Bug Issue。用户覆盖桌面 Chrome 与 375px 移动端，说明 Console 消息气泡布局在标准宽度下存在系统性溢出问题。已有 #8823 修复 PR。  
  https://github.com/agentscope-ai/QwenPaw/issues/8811

- **#8817 [OPEN] Web UI/UX 专项优化**：虽然仅 1 条评论，但正文集中批评组件风格不统一、小屏适配差、布局重叠、长会话切换卡顿无加载反馈、模型配置分散等。该 Issue 与 #8811、#8796 共同构成今日 Console 体验热点。  
  https://github.com/agentscope-ai/QwenPaw/issues/8817

- **#8815 [CLOSED] 调度任务执行完成前会话无消息**：3 条评论，已关闭。反映后台任务可观测性痛点，用户需要看到触发消息、模型响应与执行进度。  
  https://github.com/agentscope-ai/QwenPaw/issues/8815

- **#8700 [CLOSED] DoomLoopGate 在回复被合并为单条 assistant message 时不触发**：3 条评论，已关闭，属于 Agent 循环保护机制的可靠性问题。  
  https://github.com/agentscope-ai/QwenPaw/issues/8700

- **#6952 [OPEN] prefix cache 因工具 schema 未排序和 env_context 交错而不稳定**：3 条评论，长期性能 Issue，直接影响多轮推理成本与缓存命中率，今日仍未解决。  
  https://github.com/agentscope-ai/QwenPaw/issues/6952

- PR 侧评论数未在数据中提供，👍 均为 0，反应指标不显著；讨论热度更多体现在大体量架构 PR：插件 SDK #8764、本地模型插件 #8499、MCP 插件 #8469、Reranker 中心 #8472。  
  https://github.com/agentscope-ai/QwenPaw/pull/8764  
  https://github.com/agentscope-ai/QwenPaw/pull/8499  
  https://github.com/agentscope-ai/QwenPaw/pull/8469  
  https://github.com/agentscope-ai/QwenPaw/pull/8472

## 5. Bug 与稳定性

按严重程度排列。注意：#8823、#8824、#8825 均为 OPEN 修复 PR，尚未合入。

| 严重度 | 问题 | 状态 / Fix PR |
|---|---|---|
| 高 | **#8814** `RESPONSE_SCOPE_LIMIT`：活跃响应路由从不淘汰，微信通道在 128 条后双向静默失效，日志仅有 `-32603 internal error` | OPEN，未见到 fix PR。长运行部署高风险。https://github.com/agentscope-ai/QwenPaw/issues/8814 |
| 高 | **#8475** QQ 通道 `enabled` 在配置重载/重启后被静默重置为 `false`，停止收发且无 warning 日志 | OPEN，未见到 fix PR。https://github.com/agentscope-ai/QwenPaw/issues/8475 |
| 高 | **#8579** 禁用 provider 后 agent run-config 仍指向旧模型，通道报 `ProviderError: Provider is disabled`，用户仅见 “Internal error”，无降级/重试 | OPEN；fix PR #8825 已开但未合并。https://github.com/agentscope-ai/QwenPaw/issues/8579 ｜ https://github.com/agentscope-ai/QwenPaw/pull/8825 |
| 高 | **#8513** shell 包装的出站动作（SMTP/HTTP POST/@file-to-network）在 AUTO/SMART 下未触发检测或审批，属安全门禁缺口 | CLOSED；数据未展示对应修复 PR，需核实修复是否合入。https://github.com/agentscope-ai/QwenPaw/issues/8513 |
| 中 | **#8811** 窄屏下整条消息文字被剪裁，超宽表格/代码块无法横向滚动 | OPEN；fix PR #8823 已开未合并。https://github.com/agentscope-ai/QwenPaw/issues/8811 ｜ https://github.com/agentscope-ai/QwenPaw/pull/8823 |
| 中 | **#8796** 移动端全屏容器渲染到系统状态栏下方，顶部 safe-area-inset 缺失 | OPEN；fix PR #8824 已开未合并。https://github.com/agentscope-ai/QwenPaw/issues/8796 ｜ https://github.com/agentscope-ai/QwenPaw/pull/8824 |
| 中 | **#8815** 调度任务运行中会话不显示触发消息、模型响应与执行进度 | CLOSED；未见 fix PR 展示，建议回归验证。https://github.com/agentscope-ai/QwenPaw/issues/8815 |
| 中 | **#8700** DoomLoopGate 在 agentscope 将回复累积为单条 assistant message 时不触发 | CLOSED；未见 fix PR 展示，建议补充回归用例。https://github.com/agentscope-ai/QwenPaw/issues/8700 |
| 中 | **#6952** 工具 schema 排序与 env_context 交错导致 prefix cache 不稳定，增加重复推理成本 | OPEN，长期未解决。https://github.com/agentscope-ai/QwenPaw/issues/6952 |

另有一批今日关闭的通道/环境问题值得回归验证：#8313 QQ 群消息静默丢弃、#8627 Windows 长路径与微信通道依赖歧义、#8394 小艺通道长回合无状态帧且 WS 静默断开。  
https://github.com/agentscope-ai/QwenPaw/issues/8313  
https://github.com/agentscope-ai/QwenPaw/issues/8627  
https://github.com/agentscope-ai/QwenPaw/issues/8394

## 6. 功能请求与路线图信号

- **#8821 Windows 原生系统通知**：希望在 Agent 长任务结束后弹出右下角通知，减少盯浏览器标签页的负担。实现成本相对低，若维护者接受，较可能进入后续小版本。  
  https://github.com/agentscope-ai/QwenPaw/issues/8821

- **#8827 Telegram forum topic 隔离 agent session**：面向 Telegram forum supergroup 的 topic 级会话隔离，属于渠道深度适配需求。需要通道层与 session key 设计配合。  
  https://github.com/agentscope-ai/QwenPaw/issues/8827

- **#8826 增加 Rapid-MLX 本地 OpenAI-compatible provider preset**：面向 Apple Silicon 本地推理用户，属于低复杂度 preset 与文档需求，若维护者希望扩大本地模型生态，较容易纳入。  
  https://github.com/agentscope-ai/QwenPaw/issues/8826

- **#8817 UI/UX 专项优化**：范围很广，涉及组件规范、小屏适配、性能与信息架构。与 #8823/#8824 的局部修复形成互补，但短期更像“Console 体验专项”而非单个 PR。  
  https://github.com/agentscope-ai/QwenPaw/issues/8817

- **#8816 Chat 存储生命周期**：可恢复删除、范围化保留、可见性；与已关闭的 #6593 清理页诉求一致。该方向涉及 `sessions/*.json`、`history.db`、`mem_session` 等多条写入路径，预计需要设计文档。  
  https://github.com/agentscope-ai/QwenPaw/issues/8816  
  https://github.com/agentscope-ai/QwenPaw/issues/6593

- **QQ 流式输出**：#6421、#8307 已关闭，说明该渠道能力诉求已被处理或明确排期；结合多 IM 渠道 Issue，下一阶段路线图信号是“通道能力补齐 + 静默失败可观测性”。  
  https://github.com/agentscope-ai/QwenPaw/issues/6421  
  https://github.com/agentscope-ai/QwenPaw/issues/8307

- 结合已有 PR 判断，下一版本更可能优先吸收：**Console 移动端/布局修复**、**provider 回退与通道稳定性**、**插件化架构**、**MCP OAuth token 持久化**、**Cron/Heartbeat token 统计**。UI/UX 全面重构与存储生命周期管理仍需产品级排期。  
  https://github.com/agentscope-ai/QwenPaw/pull/8823  
  https://github.com/agentscope-ai/QwenPaw/pull/8825  
  https://github.com/agentscope-ai/QwenPaw/pull/8828  
  https://github.com/agentscope-ai/QwenPaw/pull/8707

## 7. 用户反馈摘要

- **UI/UX 是当前最强烈的不满来源**：#8817 集中反映组件风格不统一、小屏适配差、布局重叠、长会话切换卡顿且无加载反馈；#8811、#8796 进一步佐证移动端与窄屏布局问题。  
  https://github.com/agentscope-ai/QwenPaw/issues/8817  
  https://github.com/agentscope-ai/QwenPaw/issues/8811  
  https://github.com/agentscope-ai/QwenPaw/issues/8796

- **“静默失败”最伤用户信任**：QQ `enabled` 被重置无 warning（#8475）、微信通道 128 条后静默死（#8814）、provider 禁用后只显示 Internal error（#8579）。用户需要明确日志、状态提示、自动回退与重试。  
  https://github.com/agentscope-ai/QwenPaw/issues/8475  
  https://github.com/agentscope-ai/QwenPaw/issues/8814  
  https://github.com/agentscope-ai/QwenPaw/issues/8579

- **后台长任务可观测性不足**：调度任务执行前会话空白（#8815），以及希望任务结束系统通知（#8821），说明用户常把长任务放后台，需要进度、完成与异常反馈。  
  https://github.com/agentscope-ai/QwenPaw/issues/8815  
  https://github.com/agentscope-ai/QwenPaw/issues/8821

- **存储与清理诉求持续存在**：自动记忆、工具调用、备份与历史数据膨胀，用户希望统一清理页、可恢复删除、保留策略与可见性控制（#6593、#8816）。  
  https://github.com/agentscope-ai/QwenPaw/issues/6593  
  https://github.com/agentscope-ai/QwenPaw/issues/8816

- **多 IM 深度适配是真实使用场景**：QQ 流式、Telegram topic 隔离、微信/QQ 稳定性问题均表明用户不仅用 Web Console，还在生产/社群场景中依赖通道集成。  
  https://github.com/agentscope-ai/QwenPaw/issues/8827  
  https://github.com/agentscope-ai/QwenPaw/issues/6421

- **正面信号**：社区贡献与修复响应较快，同日已有 #8823、#8824、#8825 针对热点 Bug 开出修复 PR；但合并速度与回归验证仍是用户信心的关键。  
  https://github.com/agentscope-ai/QwenPaw/pull/8823  
  https://github.com/agentscope-ai/QwenPaw/pull/8824  
  https://github.com/agentscope-ai/QwenPaw/pull/8825

## 8. 待处理积压

- **#6952 [OPEN] prefix cache 不稳定**：创建于 2026-08-12，已超过 3 个月，3 条评论，仍未解决。属于性能与推理成本问题，建议维护者给出设计结论或明确不修复理由。  
  https://github.com/agentscope-ai/QwenPaw/issues/6952

- **#8475 [OPEN] QQ 通道 enabled 静默重置**：创建于 2026-10-28，高严重度通道可用性问题，约 3 周未关闭，且未见 fix PR。建议优先排查配置重载路径。  
  https://github.com/agentscope-ai/QwenPaw/issues/8475

- **PR #8133 [OPEN] 修复 CJK Markdown 强调边界**：创建于 2026-10-08，Under Review / size XL，已超过 6 周。影响中文 Markdown 渲染，建议明确 review 结论。  
  https://github.com/agentscope-ai/QwenPaw/pull/8133

- **PR #8268 [OPEN] TaskTracker 完成回调清理**：创建于 2026-10-16，超过 1 个月，修复 run 永久 `running` 的清理问题，属于稳定性相关小/中体量 PR。  
  https://github.com/agentscope-ai/QwenPaw/pull/8268

- **PR #8308 [OPEN] 补充 missing provider 404 测试**：创建于 2026-10-18，size XS，超过 1 个月未合入。小体量测试 PR 长期滞留，是 review 吞吐瓶颈的信号。  
  https://github.com/agentscope-ai/QwenPaw/pull/8308

- **PR #8512 [OPEN] 从错误文本读取网关状态码**：创建于 2026-10-30，size S，约 3 周未合入；与 provider 错误识别和通道稳定性相关。  
  https://github.com/agentscope-ai/QwenPaw/pull/8512

- **大型架构 PR 积压**：#8469 MCP 插件、#8499 本地模型插件、#8472 Reranker 模型中心、#8764 插件 SDK 1.1 均为 OPEN 大体量 PR，审查成本高。建议维护者拆分或设定阶段性合入计划，避免与小型 fix PR 争抢 review 资源。  
  https://github.com/agentscope-ai/QwenPaw/pull/8469  
  https://github.com/agentscope-ai/QwenPaw/pull/8499  
  https://github.com/agentscope-ai/QwenPaw/pull/8472  
  https://github.com/agentscope-ai/QwenPaw/pull/8764

**维护建议**：当前 24 条 PR 待合并，建议优先清理小体量修复/测试 PR（#8823、#8824、#8825、#8308、#8512），快速降低积压并提升社区信心；同时对 #8814、#8475 两个通道静默失效问题给出明确修复排期。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**报告日期：2026-11-20** ｜ 数据窗口：过去 24 小时
**数据来源：** [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日速览

项目维持极高水平运转：24 小时内 500 条 PR 更新（328 条待合并、172 条已合并/关闭）、338 条 Issue 更新（305 条新开/活跃、33 条已关闭），并发布 1 个稳定补丁版与 1 个 canary 版。v0.23.3 一次性滚动合入自 v0.23.2 以来约 370 个 PR，说明项目处于"高速合并、集中稳定"的节奏。但活跃度背后，**统一网关（Unified Gateway #106742）的合并后遗留问题**已成为最主要的系统性风险源，围绕网关性能、会话状态持久化和 Kanban worker 崩溃的 P1/P2 议题占据讨论榜首。整体健康度评价：**吞吐量优秀，稳定性与可观测性承压，Issue 关闭率偏低（约 9.8%）**。

---

## 2. 版本发布

### v0.23.3（2026-11-19）— 稳定补丁版
- **性质：** Patch release，将 v0.23.2 以来约 370 个已合并 PR 汇总为稳定版本。
- **分发渠道：** GitHub Release（CLI 与安装器）、Microsoft Store 应用、Docker、Hermes Cloud。
- **显著特点：** 本版本**未附带逐条精选变更日志**，官方说明完整 curated notes 将随 **v0.24.0** 发布。
- **破坏性变更：** 发布说明中未声明。
- **迁移注意事项：**
  1. **更新后务必重启网关**。现有 Issue [#147873](https://github.com/NousResearch/hermes-agent/issues/147873) 显示，`hermes update` 拉取新代码但未重启运行中的网关时，会持续出现 "mixed sys.modules" 警告，且该 owed-restart 义务在某些 PID 状态组合下**无法自动清除**。
  2. Windows 用户需注意 [#41219](https://github.com/NousResearch/hermes-agent/issues/41219)：首次崩溃后网关事件循环可能在 30–60 秒内确定性死锁。
  3. 由于缺少逐条 changelog，建议对稳定性敏感的生产部署先在小范围验证，或等待 v0.24.0 的完整说明。

### v0.23.2+canary.20261119T064637Z（2026-11-19）
- 每日构建通道版本，包含桌面端多平台下载（macOS Apple Silicon DMG 等），表明 CI/CD 与多平台打包链路正常。

---

## 3. 项目进展

24 小时内 172 条 PR 被合并/关闭，以下为可见的高价值变更：

| PR | 方向 | 意义 |
|---|---|---|
| [#158068](https://github.com/NousResearch/hermes-agent/pull/158068) | **mTLS 支持**（salvage 自 [#22479](https://github.com/NousResearch/hermes-agent/pull/22479)） | 通过 `agent.mtls` 配置块，让所有模型请求与远程 MCP 服务器支持客户端证书。这是**企业内网/合规场景的关键解锁项**，属于长期悬置需求的重启落地。 |
| [#130816](https://github.com/NousResearch/hermes-agent/pull/130816) | 网关 clarify 解析绑定所属会话 | 安全加固：防止泄露/猜测的 prompt ID 解析他人会话的待答问题。 |
| [#155395](https://github.com/NousResearch/hermes-agent/pull/155395) | `x-should-retry: false` 与 TLS 证书错误不再重试数分钟 | 显著改善失败体验：从"长时间退避后报 Connection error"变为快速失败并给出明确原因。 |
| [#157886](https://github.com/NousResearch/hermes-agent/pull/157886) | 长回合期间保持本地网关 WebSocket 存活 | 修复繁忙网关延迟 pong 导致客户端误判断连的问题。 |
| [#147441](https://github.com/NousResearch/hermes-agent/pull/147441) | 微信（iLink）不可达回复暂存至下次入站 | 解决"回复窗口关闭即丢消息"的通道级可靠性问题。 |
| [#85310](https://github.com/NousResearch/hermes-agent/pull/85310) | 压缩时将重建后的 prompt 与 transcript 同事务持久化 | 防止"旧 prompt + 新摘要"的不一致提交，属于数据完整性修复。 |
| [#158073](https://github.com/NousResearch/hermes-agent/pull/158073) | `/copy` 跳过错误卡片，复制最后一条真实回答 | 终端与 CLI 体验细节修复。 |
| [#95875 / #94875](https://github.com/NousResearch/hermes-agent/pull/94875) | `read_file` 在沙箱中返回稳定结果 | 提升 `execute_code` 内工具 API 的可编程性。 |
| [#81067](https://github.com/NousResearch/hermes-agent/pull/81067) | ACP 0.11+ 会话配置项 | 编辑器/客户端协议兼容性跟进。 |

**插件生态扩张：** [#158074](https://github.com/NousResearch/hermes-agent/pull/158074)（slack-history）、[#158067](https://github.com/NousResearch/hermes-agent/pull/158067)（hermes-habitica）、[#158071](https://github.com/NousResearch/hermes-agent/pull/158071)/[#158070](https://github.com/NousResearch/hermes-agent/pull/158070)/[#158069](https://github.com/NousResearch/hermes-agent/pull/158069)（三个 China* MCP 插件，同一作者批量提交）。插件目录（plugin-catalog）已成为社区贡献的主要入口，但**同一作者短时间批量提交三个结构相似的插件**，建议维护者加强目录准入与质量审核。

**已关闭：** [#156642](https://github.com/NousResearch/hermes-agent/pull/156642)（桌面冷启动恢复后光标与中途键入丢失）、[#157860](https://github.com/NousResearch/hermes-agent/pull/157860)（PLUR1BUS 目录 pin 升级至 7.20.2）。

**整体推进评估：** 功能面上，mTLS 与通道可靠性是本月最有分量的增量；修复面上以"网关连接稳定性 + 持久化一致性"为主线。考虑到 v0.23.3 一次性滚动 370 个 PR，项目**净前进量很大，但审查带宽与回归风险同步上升**。

---

## 4. 社区热点

| 排名 | 议题 | 评论 | 状态 | 核心诉求 |
|---|---|---|---|---|
| 1 | [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 统一网关合并后遗留问题 | 83 | OPEN, P2 | 10 月 14 日 #106742 将 CLI/TUI/Desktop/API/编辑器/机器人/cron/Kanban/群聊全部转入单一网关进程后，出现系统性 post-merge 问题。 |
| 2 | [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) 无法通过 API 创建 PR | 64 | OPEN, P3, blocked/upstream | 仅该账号复现的 `CreatePullRequest` 权限错误，属上游阻塞，已挂起近 7 周。 |
| 3 | [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) Kanban worker 崩溃 | 28 | OPEN, **P1** | 网关在 worker 保存期间卡顿时，报 "Kanban execution unknown; retained by owner"，单次卡顿可同时杀死 4 个 worker，丢失进行中的工作。 |
| 4 | [#62336](https://github.com/NousResearch/hermes-agent/issues/62336) 终端环境快照泄露凭据 | 22 | OPEN, 安全, P3 | `export -p` 将 Bitwarden Secrets Manager 注入的凭据写入磁盘缓存，属安全边界问题。 |
| 5 | [#146643](https://github.com/NousResearch/hermes-agent/issues/146643) 网关重复读取全部会话历史 | 21 | OPEN, P2 | 数千会话规模下占用 1.5–2.5 CPU 核，Desktop 请求 30 秒超时。 |
| 6 | [#137287](https://github.com/NousResearch/hermes-agent/issues/137287) 桌面转录重复/错序/丢消息 | 18 | OPEN, P2 | 会话中途渲染损坏，影响用户对记录可信度的判断。 |

**分析：** 讨论热度高度集中于**统一网关的架构后果**——单进程集中承载所有入口带来三类连锁问题：① 局部卡顿放大为全局故障（#145022、#146643）；② 会话状态与 UI 渲染的一致性难以保证（#137287、#138915）；③ 性能开销随 store 规模线性增长。这实质上是**架构集中化后的可扩展性与故障隔离问题**，而非零散 bug。#131859 则反映出贡献者侧的基础设施摩擦，虽被标为 blocked/upstream，但 64 条评论说明其对社区工作流影响不小。

> 注：PR 侧评论数在数据中为 `undefined`，故本节以 Issue 讨论为主；PR 活跃度按更新时间与影响面近似判断。

---

## 5. Bug 与稳定性

### P1 — 需优先处理
| Issue | 问题 | 影响 | 修复 PR |
|---|---|---|---|
| [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) | Kanban worker 因网关卡顿崩溃 | 并发 worker 批量死亡、WIP 丢失 | 未见关联 PR |
| [#147839](https://github.com/NousResearch/hermes-agent/issues/147839) | 单次 20 秒 `worker_receipt_timeout` 污染 store 并摧毁整个回合 | 用户只看到 "No reply"，同一安装已复现 11 次 | 未见关联 PR |
| [#145314](https://github.com/NousResearch/hermes-agent/issues/145314) | 静默 cron 脚本每次触发留下永久空会话 | 会话库持续膨胀 | 未见关联 PR |

### 安全
- [#62336](https://github.com/NousResearch/hermes-agent/issues/62336)：终端环境快照把凭据写入磁盘（P3 但性质严重，已挂 4 个月）。**无 fix PR**。

### 性能 / 资源
- [#146643](https://github.com/NousResearch/hermes-agent/issues/146643)：网关重复全量读会话历史，CPU 随 store 线性增长。
- [#146538](https://github.com/NousResearch/hermes-agent/issues/146538)：Windows 多 profile（66 个）下每秒 3.4 万–9.9 万次文件元数据操作，内核池持续增长。
- [#155028](https://github.com/NousResearch/hermes-agent/issues/155028)：心跳轮询每 5 秒全扫 `state_meta`；gated cron 留下空会话与约 35 KB policy receipts。
- [#89732](https://github.com/NousResearch/hermes-agent/issues/89732)：Linux + AMD 核显下桌面环境动画持续占用 50–69% iGPU。

### 数据一致性 / 会话状态
- [#137287](https://github.com/NousResearch/hermes-agent/issues/137287)：桌面转录重复、错序、丢失。
- [#138915](https://github.com/NousResearch/hermes-agent/issues/138915)：网关持有 `state.db` 时 Dashboard 变更一律 409，批量操作必然失败。
- [#117894](https://github.com/NousResearch/hermes-agent/issues/117894)：`background_review` 暂存队列无界且不可见。

### 平台 / 回归
- [#41219](https://github.com/NousResearch/hermes-agent/issues/41219)：Windows 首次崩溃后网关事件循环 30–60 秒内死锁（自 6 月悬置）。
- [#147873](https://github.com/NousResearch/hermes-agent/issues/147873)：owed-restart 义务在 PID 同时被记录为 mapped 与 stopped_unmapped 时永远无法清除。
- [#143908](https://github.com/NousResearch/hermes-agent/issues/143908)：Windows 上网关持有 SQLite 句柄导致 Kanban 板删除/归档 500。
- [#128770](https://github.com/NousResearch/hermes-agent/issues/128770)：无 WSL 的 Windows 上创建/切换会话时弹出 `wsl.exe` 安装提示窗。
- [#148538](https://github.com/NousResearch/hermes-agent/issues/148538)：iPhone Safari 缺 `requestIdleCallback` 导致页面全挂。

**小结：** 可见的高优先级 Bug 中，**明确存在关联 fix PR 的极少**（#147441 对应微信投递、#85310 对应压缩一致性、#155395 对应重试策略、#157886 对应连接保活，但这些并非针对上述 P1）。这说明 **P1 问题的修复尚未进入可见的 PR 流程**，是当前最需要维护者投入的缺口。

---

## 6. 功能请求与路线图信号

| 需求 | Issue/PR | 纳入下一版本的可能性 |
|---|---|---|
| **mTLS 客户端证书**（模型端点 + MCP） | [#158068](https://github.com/NousResearch/hermes-agent/pull/158068) / [#22479](https://github.com/NousResearch/hermes-agent/pull/22479) | **高**。已有可合并实现且被官方账号 salvage，属企业采用硬门槛，预计进入 v0.24.0。 |
| 远程 MCP 与本地模型兼容性（Ollama `num_ctx` 误注入） | [#142239](https://github.com/NousResearch/hermes-agent/issues/142239) | 中。影响 relayed Gemini 模型，属兼容性回归。 |
| MiniMax 新模型目录发现 | [#152406](https://github.com/NousResearch/hermes-agent/issues/152406)、[#143065](https://github.com/NousResearch/hermes-agent/issues/143065) | 中高。新旗舰模型"实际上不可用"，供应商插件层修复成本较低。 |
| Tool Search 白名单（指定插件/MCP 工具常驻 eager） | [#86620](https://github.com/NousResearch/hermes-agent/issues/86620) | 中。`needs-decision` 标签，涉及兼容性权衡。 |
| 桌面端可配置聊天宽度 | [#55287](https://github.com/NousResearch/hermes-agent/issues/55287) | 低。P3 且为纯 UI 偏好，👍 4。 |
| 插件目录扩容（Slack 历史、Habitica、MCP 工具集） | [#158074](https://github.com/NousResearch/hermes-agent/pull/158074)、[#158067](https://github.com/NousResearch/hermes-agent/pull/158067) 等 | 高（逐条审核后）。属低风险增量合并。 |
| Profile 创建/生命周期体系化 | [#155595](https://github.com/NousResearch/hermes-agent/issues/155595) | 中长期。属跟踪型 epic，涉及 gateway ownership、凭据共享、模型继承等多块。 |

**路线图判断：** v0.24.0 的主题大概率是 **"统一网关的稳定化 + 企业连接能力（mTLS）+ 插件目录治理"**。UI 类请求与 Tool Search 白名单更可能延后。

---

## 7. 用户反馈摘要

**真实痛点（按频次与情绪强度）**
1. **网关是单点故障源。** 多处反馈"一次卡顿杀死 4 个 worker"、"Desktop 请求 30 秒超时"、"事件循环死锁但进程仍存活"。用户已从"功能缺失"转向**"可靠性不可预测"**的不满。
2. **会话状态不可信。** 转录重复/错序/丢消息（#137287）、单次超时导致整轮丢失并只显示 "No reply"（#147839）、Dashboard 批量操作恒 409（#138915）。这类问题直接侵蚀用户对助手"记忆"的信任。
3. **资源消耗异常。** Windows 上 3.4 万–9.9 万 IOPS、macOS 上 1.5–2.5 核空转、Linux/AMD 上 iGPU 50–69%。多 profile 重度用户感受最明显。
4. **安全边界令人担忧。** #62336 的凭据落盘问题虽标 P3，但评论持续 4 个月，反映用户对"默认安全"的期待未被满足。
5. **平台细节摩擦。** Windows 弹 WSL 安装窗、iPhone Safari 白屏、Google 登录拒绝 Bot Desktop 浏览器（#137774，`navigator.webdriver`）。

**使用场景画像**
- **多 profile 的长期在线部署**（66 个 profile、常开 Dashboard + cron + Kanban 并发）；
- **桌面端为主力工作区**（长会话、代码块渲染、冷启动恢复）；
- **消息通道集成**（BlueBubbles/iMessage、微信、Slack、Telegram、Discord）；
- **企业内网**（mTLS、自定义 OpenAI 兼容网关、Bitwarden Secrets Manager）。

**满意信号**
- 插件生态贡献活跃，社区愿意为目录提交新集成；
- 官方对长期悬置 PR 采取 salvage 策略（#158068），响应了"别让好 PR 烂在队列里"的诉求；
- 快速失败重试策略（#155395）、连接保活（#157886）等"体验型修复"获得正面期待。

**不满意集中点**
- 缺乏 v0.23.3 的逐条 changelog，升级决策缺少依据；
- P1 议题长期无 fix PR，社区讨论多、闭环少；
- "duplicate" 标记的 [#34372](https://github.com/NousResearch/hermes-agent/issues/34372)（BlueBubbles 每条 iMessage 处理两次）自 5 月挂至今，用户感知为"被搁置"。

---

## 8. 待处理积压（建议维护者关注）

| 议题 | 创建 | 悬置时长 | 为何重要 |
|---|---|---|---|
| [#34372](https://github.com/NousResearch/hermes-agent/issues/34372) BlueBubbles 重复处理 iMessage | 2026-05-29 | ~6 个月 | 已标 duplicate 但无明确归并目标，消息通道正确性问题。 |
| [#41219](https://github.com/NousResearch/hermes-agent/issues/41219) Windows 网关事件循环死锁 | 2026-06-07 | ~5.5 个月 | 确定性复现的 P2，Windows 用户核心可用性。 |
| [#62336](https://github.com/NousResearch/hermes-agent/issues/62336) 凭据落盘 | 2026-07-10 | ~4 个月 | 安全问题，带 `sweeper:risk-security-boundary` 标签，应升级优先级。 |
| [#77253](https://github.com/NousResearch/hermes-agent/issues/77253) 无语言标记代码块不渲染 | 2026-08-03 | ~3.5 个月 | 👍 3，桌面端高频渲染缺陷。 |
| [#78888](https://github.com/NousResearch/hermes-agent/issues/78888) checkpoint `git add -A` 因 root-owned 缓存中止 | 2026-08-04 | ~3.5 个月 | 导致受影响目录**零 checkpoint**，数据保护失效。 |
| [#86620](https://github.com/NousResearch/hermes-agent/issues/86620) Tool Search 白名单 | 2026-08-15 | ~3 个月 | `needs-decision`，涉及工具调用核心路径。 |
| [#89732](https://github.com/NousResearch/hermes-agent/issues/89732) 桌面动画持续占用 iGPU | 2026-08-19 | ~3 个月 | 笔记本续航/发热，体验口碑项。 |
| [#22479](https://github.com/NousResearch/hermes-agent/pull/22479) mTLS 原始 PR | 2026-05-09 | ~6 个月 | 已被 #158068 salvage，建议明确关闭原 PR 并说明归属，避免贡献者困惑。 |
| [#81067](https://github.com/NousResearch/hermes-agent/pull/81067) ACP 0.11+ | 2026-08-07 | ~3.5 个月 | 编辑器集成兼容性，长期 OPEN 易漂移。 |

---

## 项目健康度评估

| 指标 | 数值 | 解读 |
|---|---|---|
| Issue 关闭率（24h） | 33 / 338 ≈ **9.8%** | 偏低，新增/活跃远超关闭，积压扩大。 |
| PR 处理率（24h） | 172 / 500 ≈ **34.4%** | 健康，合并吞吐强劲。 |
| 待合并 PR | **328** | 队列偏长，review 带宽是瓶颈。 |
| P1 开放议题（可见） | **3** | 绝对值不高，但均集中在会话持久化关键路径。 |
| 版本节奏 | 补丁 + 每日 canary | 持续交付成熟，但 changelog 供给不足。 |

**结论：** hermes-agent 处于**高吞吐、高复杂度、稳定性承压**的阶段。统一网关带来的架构收益（单进程统一状态）正在被其故障放大效应部分抵消。短期最值得投入的三件事：① 为 #145022 / #147839 / #145314 三个 P1 建立修复 PR；② 补齐 v0.23.3 的变更说明或加速 v0.24.0；③ 对 328 条待合并 PR 做分类清理（salvage / close / 标记 stale），避免贡献者流失。

---

*说明：本报告基于给定数据窗口内的 GitHub 元数据与摘要生成。PR 评论数字段缺失，相关活跃度判断为基于更新时间与影响面的近似推断；"是否已有 fix PR"仅依据可见数据，可能与实际关联关系存在偏差。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**报告日期：2026-11-20** ｜ 数据窗口：过去 24 小时 ｜ 仓库：[AstrBotDevs/AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## 一、今日速览

1. 项目维持高强度迭代节奏：24 小时内 **46 条 PR 更新**（待合并 28 / 已合并或关闭 18），**5 条 Issue 更新**（活跃 4 / 关闭 1），无新版本发布。
2. PR 合并吞吐率约 **39%**，但待合并队列（28 条）明显高于关闭数，代码评审侧存在压力，建议关注积压消化。
3. 今日关闭的改动覆盖**知识库并发上传、安全修复（PyPI 镜像 TLS 校验）、新增 Provider** 三条主线，属于实质性推进而非纯维护性提交。
4. 稳定性方面出现一条**高优先级生产故障**（[#11130](https://github.com/AstrBotDevs/AstrBot/issues/11130)）：QQ 官方机器人长时间运行后单向断联，目前尚无 fix PR。
5. 整体判断：**活跃度高、健康度中性偏正面**，但“待合并 PR 增长 + 关键 Bug 无归属”是当前两个主要风险点。

> 数据说明：本次 PR 列表的评论数字段缺失（显示为 `undefined`），因此社区热度以 Issue 评论/点赞、PR 存续时长与变更范围作为替代信号。

---

## 二、版本发布

今日无新版本发布（0 个），无破坏性变更公告。仓库处于功能累积阶段，多个已合并 PR（如知识库并发上传、Provider 新增）预计随下一版本统一放出。

---

## 三、项目进展

今日合并/关闭的 18 条 PR 中，代表性推进如下：

| PR | 类型 | 推进内容 | 影响 |
|---|---|---|---|
| [#9638](https://github.com/AstrBotDevs/AstrBot/pull/9638) | `area:webui` / `feature:knowledge-base` / `size:XL` | 知识库文档并发上传进度追踪（前后端全链路） | 长期挂起的大型改动落地，显著改善多文件上传体验 |
| [#10685](https://github.com/AstrBotDevs/AstrBot/pull/10685) | 安全 | 默认 PyPI 镜像强制 TLS 校验（`PipInstaller`） | 修复插件安装链路的中间人风险，安全基线提升 |
| [#10267](https://github.com/AstrBotDevs/AstrBot/pull/10267) | Provider | 新增 Requesty（OpenAI 兼容聚合网关）作为一等 Provider | 降低多模型接入配置成本 |
| [#10760](https://github.com/AstrBotDevs/AstrBot/pull/10760) | Dashboard | 原生滚动条样式限定 Firefox，修复 Safari 18.2 配置页裁切 | 前端跨浏览器兼容性 |
| [#11258](https://github.com/AstrBotDevs/AstrBot/pull/11258) | CI/测试 | 修复 `ddcab3238` 引入的 tool-loop 测试失败 | 恢复 master 全平台 CI 绿灯，阻断性回归解除 |
| [#10781](https://github.com/AstrBotDevs/AstrBot/pull/10781) | 文档 | README 贡献者图上限 300→500、列数 17 | 仓库元数据修正 |

另有一条值得注意的**关闭决定**：[#11082](https://github.com/AstrBotDevs/AstrBot/pull/11082)（将 fork 产品化为「大肥鱼鱼咖」托管 QQ 官方机器人 SaaS）被关闭，表明项目当前不接受将主干改造为商业托管服务的变更，维护边界清晰。

**净评估**：今日进展集中在「基础设施健壮性 + 安全 + 生态接入」三块，属于对项目长期健康度正向的投入；用户可见的新功能增量有限。

---

## 四、社区热点

| 对象 | 互动信号 | 核心诉求 |
|---|---|---|
| [#11130](https://github.com/AstrBotDevs/AstrBot/issues/11130) Bug / QQ 官方机器人断联 | 3 条评论，24h 内最活跃 Issue | 面向**无人值守长跑场景**的可用性。30–40 小时周期性复发、100 小时内触发 3 次、只能靠 Dashboard 手动重启，日志反复出现 `[QQOfficial] Websocket session starting.` 但无法建立会话 |
| [#10406](https://github.com/AstrBotDevs/AstrBot/issues/10406) 多语言指令支持（已关闭） | 👍 2，评论 1 | 插件生态以中文开发、内置指令为英文；现有 i18n **只覆盖 WebUI 展示层，不覆盖运行时指令名/描述/回复**，多语言部署用户被迫二选一 |
| [#11246](https://github.com/AstrBotDevs/AstrBot/issues/11246) Anthropic 缓存开关 | 1 条评论，带 `open-for-contribution` 标签 | 第三方计费渠道/代理网关对 `cache_control: ephemeral` 支持不完整，需要可关闭缓存以避免额外费用与请求异常 |
| [#9956](https://github.com/AstrBotDevs/AstrBot/pull/9956) 命令别名吞参数 | 自 2026-09-05 起 OPEN（约 2.5 个月） | 与今日新提交的 [#11252](https://github.com/AstrBotDevs/AstrBot/pull/11252) 为**同一问题的两套实现**，需维护者裁定合并方向 |

**背后趋势**：讨论重心正从「功能有没有」转向「能不能稳定跑生产」。断联、计费、i18n 三个热点共同指向同一类用户——把 AstrBot 当作长期在线服务运营的部署者，而非本地尝鲜者。

---

## 五、Bug 与稳定性

按严重程度排序：

**🔴 P0：[#11130](https://github.com/AstrBotDevs/AstrBot/issues/11130) — QQ 官方机器人长时间运行后单向断联**
- 现象：约 30–40 小时出现「用户→Bot」单向失联（提示“机器人的灵魂不在线”），但 Bot→用户的主动推送仍正常。
- 影响：生产不可用，且**故障自愈失败**，必须人工重启平台适配器；100 小时内复发 3 次。
- 状态：**无 fix PR**，Issue 已 OPEN 6 天，建议优先定位 WebSocket 重连逻辑（日志显示 `starting` 卡死）。

**🟠 P1：[#11244](https://github.com/AstrBotDevs/AstrBot/issues/11244) — 本地工具消费 list 参数导致动作记录与下一轮引用丢失**
- 现象：订单已成功写入 CSV（引用、数量均正确），但模型丢失了订单引用，下一轮对话无法回溯。
- 影响：Agent 多轮任务的一致性与可信度受损，属**上下文/工具回填缺陷**，非崩溃类。
- 状态：无 fix PR，1 条评论。

**🟡 P2：[#11266](https://github.com/AstrBotDevs/AstrBot/issues/11266) — 外链图片下载使用默认 aiohttp UA 被站点 403**
- 现象：`send_message_to_user` 发送公开图床直链（如 Wikimedia Commons）返回 403，浏览器可正常打开。
- 关键影响：**若图文同条消息，下载失败会导致整条消息在提交 QQ 前中止，配文一并丢失**——故障被放大到文本通道。
- 状态：今日新开，0 评论，无 fix PR。修复成本低（可配置 UA / Referer），建议快速纳入。

**相关在办修复（可缓解上述问题域）**：
- [#11253](https://github.com/AstrBotDevs/AstrBot/pull/11253)：`PluginManager.load()` 清理 pip handler 时误删 loguru 根桥接，导致插件加载后日志丢失——**该缺陷会直接削弱 #11130 这类连接问题的可诊断性**。
- [#11078](https://github.com/AstrBotDevs/AstrBot/pull/11078)：Gemini 3+ 内置工具与 function calling 共存时请求级联失败。
- [#11252](https://github.com/AstrBotDevs/AstrBot/pull/11252) / [#9956](https://github.com/AstrBotDevs/AstrBot/pull/9956)：命令别名吞掉同名参数（`hello h` → 参数 `h` 被剥离）。

---

## 六、功能请求与路线图信号

| 需求 | 信号强度 | 判断 |
|---|---|---|
| [#11246](https://github.com/AstrBotDevs/AstrBot/issues/11246) Anthropic Prompt Caching 开关 | **高** — 带 `open-for-contribution` 标签，改动面小（配置项 + 注入条件） | 很可能在近期版本纳入，适合新贡献者切入 |
| [#10406](https://github.com/AstrBotDevs/AstrBot/issues/10406) 运行时指令 i18n | **中高** — 已关闭但关联 PR [#9984](https://github.com/AstrBotDevs/AstrBot/pull/9984) 仍在 review | 关闭不等于放弃，需确认是否转为由 #9984 承载；否则存在需求“悬空”风险 |
| [#10992](https://github.com/AstrBotDevs/AstrBot/pull/10992) 保留群聊 @ 顺序与机器人身份 | 中 — 已有完整实现，影响 Agent 输入格式 | 若合并将改善群聊多 @ 场景的模型理解，需评估提示词兼容性 |
| [#10596](https://github.com/AstrBotDevs/AstrBot/pull/10596) 插件文件配置图片预览 | 中 — 纯 Dashboard 增强 | 低风险、体验向，适合随版本放出 |
| [#11271](https://github.com/AstrBotDevs/AstrBot/pull/11271) 移除 “Gemini OpenAI API” Provider | 中 — 作者自述实际无破坏性 | 属配置项瘦身，需同步迁移说明以免旧配置失效 |
| [#11082](https://github.com/AstrBotDevs/AstrBot/pull/11082) fork 商品化为托管 SaaS | 已关闭 | 明确信号：主干不接受商业化托管改造，第三方可走 fork/插件路线 |

---

## 七、用户反馈摘要

- **痛点 1｜长跑稳定性是首要不满**：用户明确描述“运行一百小时内触发三次”，且故障后必须人工介入。这类反馈的潜台词是——当前版本尚不足以支撑「部署一次、长期不管」的运维预期。
- **痛点 2｜成本与网关兼容性**：Anthropic 缓存默认开启对使用第三方转售渠道的用户构成不可控成本，且部分网关对 `cache_control` 支持不完整会直接报错。用户希望的是「默认智能、但可显式关闭」。
- **痛点 3｜生态语言割裂**：内置指令英文 vs 插件中文，多语言部署用户必须在「用不了中文指令」与「放弃插件生态」之间取舍，i18n 只做到展示层被认为不完整。
- **痛点 4｜Agent 可靠性**：订单写入成功但引用丢失——用户对「操作成功但模型不记得」这类**静默失败**尤为敏感，因为它破坏信任且难以自查。
- **痛点 5｜外部资源抓取鲁棒性**：默认 UA 被拒是典型工程细节，但连锁效应（图文整条消息丢失）让用户感知强烈。
- **正面信号**：Issue 普遍附带完整复现步骤、日志与截图（如 #11130、#11266），说明活跃用户具备较强工程素养，反馈质量高，利于快速定位。

---

## 八、待处理积压（建议维护者关注）

| 对象 | 存续时长 | 风险 |
|---|---|---|
| [#9956](https://github.com/AstrBotDevs/AstrBot/pull/9956) 命令别名吞参数 | **约 2.5 个月**（2026-09-05） | 与新 PR #11252 功能重复，长期双开易造成评审精力浪费，建议择一合并、关闭另一 |
| [#10649](https://github.com/AstrBotDevs/AstrBot/pull/10649) 合并相邻 plain/face 组件 | 约 1 个月 | 修复 `seg_reply` 下表情被拆成独立气泡，用户可见体验问题 |
| [#10596](https://github.com/AstrBotDevs/AstrBot/pull/10596) 插件配置图片预览 | 约 1 个月 | 低风险体验增强，长期挂起易流失贡献者积极性 |
| [#10850](https://github.com/AstrBotDevs/AstrBot/pull/10850) 插件页桥接保留结构化错误字段 | 约 3 周 | 影响插件开发者能否区分业务错误与兜底默认值 |
| [#11078](https://github.com/AstrBotDevs/AstrBot/pull/11078) Gemini 工具组合修复 | 约 9 天 | 关联 #9937，属功能性缺陷修复，建议优先评审 |
| [#11130](https://github.com/AstrBotDevs/AstrBot/issues/11130) QQ 官方机器人断联 | 6 天，3 条评论 | **唯一无 fix 归属的 P0 问题**，建议至少给出定位结论或临时规避方案 |
| [#10406](https://github.com/AstrBotDevs/AstrBot/issues/10406) 运行时 i18n | 已关闭但 PR #9984 待审 | 状态不一致，建议补充关闭理由说明，避免贡献者误解为“已实现” |

---

**健康度小结**：迭代吞吐与修复质量均属上游水平，安全与 CI 治理到位；主要改进空间在**评审带宽**（28 条待合并）与**P0 故障响应时效**。若本周内能为 #11130 指派负责人并裁定 #9956/#11252 的重复实现，项目健康度可进一步上行。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目日报 · 2026-11-20

> 数据来源：github.com/deepseek-ai/deepseek-harness（该项目未启用 GitHub Issues / Pull Requests，社区讨论全部集中在 Discussions；代码变更通过 Releases 落地）
> 说明：本日无新 Release，因此“变更摘要”类信息缺失，分析以 184 条 Discussions 更新为主。所有讨论的 👍 计数均为 0，故热度排序只能按评论数计算。

---

## 1. 今日速览

1. **讨论活跃度处于高位**：过去 24 小时 Discussions 更新 **184 条**，Top 15 热帖累计评论 **174 条**，单帖最高 36 条。
2. **版本节奏为零**：今日 **0 个新版本、0 份 Release changelog**；讨论中可观察到的最新预发布通道为 `0.2.2-rc.1`，上一可见版本为 `0.2.1-rc.5`。
3. **活跃度结构不同一般**：Top 15 中仅 3 条是 11 月新建，其余 **12 条创建于 9 月至 10 月**，最老的已持续 78 天（#5532，2026-09-03），说明是长期跟踪的积压缺陷在延续讨论，并非由新话题驱动。
4. **缺陷密度偏高**：Top 15 议题中 **12 条属于 Bug/异常（80%）**，仅 1 条 Ideas、2 条社区插件展示；其中 Windows 沙箱相关问题占 4 条，构成最集中的问题模块。
5. **健康度判断**：社区参与度高、反馈质量好、插件生态活跃，但**缺陷收敛速度与社区热度不匹配**，无 Issues/PR 机制进一步降低了外部对修复进度的可见性，属于“活跃度高、修复可验证性低”的状态。

---

## 2. 版本发布

**今日新版本：0 个。** 无 Release 可供拆解，故无破坏性变更与迁移说明。

补充观察（来自社区讨论的版本线索）：

- 讨论中可确认的版本序列为 `0.2.0-rc.2` → `0.2.1-alpha.4/alpha.5` → `0.2.1-rc.1/rc.3/rc.5` → `0.2.2-rc.1`，项目仍处于 **RC 密集迭代期**。
- [#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) 明确指出：该缺陷在 `0.2.1-alpha.4`（git `86a4022`）上被报告，**同样的代码在 `dsh-v0.2.1-alpha.5` 与 `dsh-v0.2.1-rc.1` 上依然存在**，跨 3 个构建未修复。
- 由于修复仅通过 Release 落地、且今日无 Release，**外部无法确认任何 Top 15 缺陷是否已进入主干**。建议官方在 Release Notes 中增加“关联 Discussion 编号”字段，否则社区反馈的闭环无法被验证。

---

## 3. 项目进展

**今日无 Release，因此无官方合并摘要可引用**（该仓库以 Release 作为唯一的合并落地口径，本次 changelog 为空）。

可观测到的进展来自社区问题解决和社区工具发布：

| 方向 | 内容 | 链接 |
|---|---|---|
| 插件工具链 | 社区工具 **dsh-seam v0.1.0** 发布：一行命令对插件做编译期 DSH 接口兼容性检查，可定位到源码行号，已在 `0.2.2-rc.1` 上验证 | [#13379](https://github.com/deepseek-ai/deepseek-harness/discussions/13379) |
| 跨平台沙箱 | **dsh-plugin-wsl-env**：把会话的 shell/文件/终端整体迁入 WSL 发行版，用内核级隔离替代 Windows ACL 沙箱，附六发行版兼容矩阵 | [#11251](https://github.com/deepseek-ai/deepseek-harness/discussions/11251) |

**推进度评估**：官方侧今日推进量按可验证口径计为 **0**；社区侧推进量约为 2 项生态基础设施。两件事都指向同一个缺口：**Windows 沙箱方案不可靠，插件 API 稳定性不足。** 这两个缺口目前都由社区自行解决，官方尚未在 Release 中给出回应。

---

## 4. 社区热点

按评论数排列的 Top 6：

1. **[#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) · 36 条评论 · Desktop「Web 认证失败」**（General / Bug，2026-10-17 创建）
   陈旧的 `dsh-auth-*` Cookie 不断累积，触发了 Host 头长度限制，服务端返回 **HTTP 431**，导致打包版 Desktop 应用完全无法完成 Web 认证。报告者环境为 NixOS + Wayland + Electron 44.3.0。诉求本质：认证态缺乏过期清理，且 Cookie 无上限增长，属于**登录入口级阻断**。

2. **[#8827](https://github.com/deepseek-ai/deepseek-harness/discussions/8827) · 20 条评论 · `workflow` 工具调用永不返回**（Q&A / Bug，2026-10-04）
   4 个阶段实际已全部完成，但 `workflow` 调用没有回传结果，父 Agent 永久卡在 `step/start turn=1`，之后没有任何事件。这是**Agent 编排层的死锁**，对自动化长流程是致命打击；20 条评论表明用户在做大量复现与变体排查。

3. **[#12751](https://github.com/deepseek-ai/deepseek-harness/discussions/12751) · 19 条评论 · 指令让 Agent 写插件，结果清空了 dsh 与 zcode 目录**（Q&A，2026-11-09）
   用户仅要求“加一个今日 token 用量统计面板”，结果是 DSH 全部会话丢失、zcode 会话一并丢失。这是**唯一的数据损毁级事故**，讨论量高说明用户对“权限边界与文件删除保护”存在普遍焦虑。

4. **[#8357](https://github.com/deepseek-ai/deepseek-harness/discussions/8357) · 18 条评论 · 添加工作区失败**（Q&A，2026-09-30）
   `workspace create failed: gateway/service-unavailable: typert gateway: workspace/create: active Service "workspaceController" is unavailable`。这是**首次配置就卡住**的入口缺陷，用户在安装阶段就受阻，是最影响留存的问题之一。

5. **[#8322](https://github.com/deepseek-ai/deepseek-harness/discussions/8322) · 14 条评论 · Windows 下 workspace-write 模式全部 shell 工具秒退**（2026-09-29）
   报错恒定为 `PTY shell exited during startup`，pwsh 与 `cmd /c` 都一样。根因定位到 **GUI 子系统的 Electron 被当作 ACL 沙箱 runner host + ConPTY** 的组合。等同于 Windows 沙箱的受限模式无法使用。

6. **[#9086](https://github.com/deepseek-ai/deepseek-harness/discussions/9086) · 11 条评论 · Windows 沙箱遗留可继承 Low 完整性标签**（2026-10-07）
   撤销授权后，强制完整性标签不会被回滚，导致工作区内产出的 `.exe` 此后一律以低完整性运行，无法写入自身配置或注册表。

**热点分析**：评论最多的问题集中在 **认证、Agent 编排可靠性、数据安全、Windows 沙箱** 四条主线上，且平均存在时长超过 45 天。社区并未转向新需求，而是在**反复推动旧缺陷修复**；这一信号应被读作“修复吞吐不足”，而非“话题不足”。

---

## 5. Bug 与稳定性

> 该项目未启用 Issues/PR，任何缺陷都**没有可查的 Fix PR**；“修复进度”一栏以 Release 是否覆盖为唯一口径，今日全部为“不可确认”。

### P0 · 数据损毁 / 阻断
- **[#12751](https://github.com/deepseek-ai/deepseek-harness/discussions/12751)** Agent 在“写插件”类指令下删除 `dsh` 目录与 `zcode` 会话，**永久丢失历史会话**。19 条评论未见回滚或恢复方案。**修复进度：不可确认。**
   建议：文件删除操作进入二次确认，并对 `~/.dsh` 等配置根目录加只读保护。

### P1 · 核心功能不可用
- **[#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924)** Desktop 认证 431，登录入口阻断；已确认**跨 alpha.5 / rc.1 未修复**。36 条评论为今日最高。
- **[#8827](https://github.com/deepseek-ai/deepseek-harness/discussions/8827)** `workflow` 调用无返回，父 Agent 死锁于 `step/start`，长流程自动化不可用。
- **[#8322](https://github.com/deepseek-ai/deepseek-harness/discussions/8322)** Windows `workspace-write` 模式下所有 shell 工具启动即退出，受限模式在 Windows 等同废置。
- **[#8357](https://github.com/deepseek-ai/deepseek-harness/discussions/8357)** `workspaceController` 服务不可用，工作区无法创建，阻塞初次使用。

### P2 · 有明确绕行成本 / 回归
- **[#9086](https://github.com/deepseek-ai/deepseek-harness/discussions/9086)** ↔ **[#10593](https://github.com/deepseek-ai/deepseek-harness/discussions/10593)** 同一根因的两个独立报告：整树 Low 完整性标签会导致工作区内程序以低权限运行，写不了配置或注册表，托盘图标失效。撤销授权不回滚，问题持续存在。
- **[#12261](https://github.com/deepseek-ai/deepseek-harness/discussions/12261)** **明确回归**：macOS `0.2.2-rc.1` 无边框窗口失去拖拽区，`0.2.1-rc.5` 正常。属版本迭代引入的功能回退。
- **[#5630](https://github.com/deepseek-ai/deepseek-harness/discussions/5630)** Web GUI Lexical 编辑器下微软拼音连续输入 2–3 字即损坏草稿，中文用户核心输入链路受损。
- **[#6661](https://github.com/deepseek-ai/deepseek-harness/discussions/6661)** macOS 宿主异常退出后，`bootstrap.py` 子进程残留为高 CPU 僵尸进程，长期驻留会拖垮机器。

### P3 · 体验瑕疵
- **[#5532](https://github.com/deepseek-ai/deepseek-harness/discussions/5532)** Windows 每条沙箱命令弹出新控制台窗口（runner 自身无父控制台）。
- **[#11114](https://github.com/deepseek-ai/deepseek-harness/discussions/11114)** 主窗口尺寸/位置/最大化状态不持久化，固定回到 1280×820。

**系统性判断**：Top 15 中 **4 条（#8322 / #9086 / #10593 / #5532）指向同一模块 `@deepseek-ai/dsh-sandbox-windows-acl`**，累计约 35 条评论。这已经不是单点缺陷，而是 **Windows 沙箱架构（ACL + Low IL + ConPTY）需要整体重做** 的信号。

---

## 6. 功能请求与路线图信号

| 需求 | 信号强度 | 判断 |
|---|---|---|
| **[#7569](https://github.com/deepseek-ai/deepseek-harness/discussions/7569) Agent 暂停/完成时外部通知**（9 条评论，2026-09-23 至今 OPEN） | 中高 | 实现成本低（系统托盘 / Webhook / 桌面通知），直接解决“必须开着标签页盯着”的场景痛点，**最有可能被纳入下一版本的 Ideas 项** |
| **[#11114](https://github.com/deepseek-ai/deepseek-harness/discussions/11114) 窗口状态持久化** | 中 | 典型的“一行配置即可修”的桌面端补齐项，适合随下个 RC 一起发出 |
| **[#13379](https://github.com/deepseek-ai/deepseek-harness/discussions/13379) 插件 API 兼容性检查** | 中 | 由社区自行解决，但反过来暴露了官方**缺少插件 API 稳定性承诺（deprecation policy）**，建议官方提供 semver 约束或破坏性变更公告机制 |
| **[#11251](https://github.com/deepseek-ai/deepseek-harness/discussions/11251) WSL 内运行会话** | 中 | 与 Windows 沙箱的 P1/P2 缺陷形成互补，可视为社区对官方沙箱失效的路线替代方案，值得官方评估是否吸收 |
| **[#10593](https://github.com/deepseek-ai/deepseek-harness/discussions/10593) / [#9086](https://github.com/deepseek-ai/deepseek-harness/discussions/9086) 放弃 Low IL 打标，改 AppContainer / Job Object** | 高（隐性架构需求） | 实质是路线图层面的取舍，不是功能点，需要官方明确表态 |

**综合判断**：下一版本最可能纳入的是 **桌面端体验补齐类**（#11114、#7569）与 **Windows 沙箱架构调整**；前者是低风险高收益，后者已成为不解决就持续失血的技术债。

---

## 7. 用户反馈摘要

**不满意（占主导）**
- **“受限模式在 Windows 上没法用”**：shell 工具秒退、控制台窗口刷屏、产物 exe 无法运行，三段式抱怨集中在 #8322 / #5532 / #9086 / #10593，用户已自行给出根因分析，说明问题并不罕见，而是反复出现。
- **“不敢让它碰文件”**：#12751 之后出现明显的信任下滑，用户开始担心 Agent 对配置目录的破坏性操作。
- **“登录都进不去”**：#9924 的 36 条评论说明这已经影响到大量 Desktop 用户的日常使用。
- **“卡死之后完全不知道发生了什么”**：#8827 中父 Agent 停在 `step/start` 且无任何事件输出，用户既无日志也无超时提示，可观测性不足被反复提及。
- **输入体验**：#5630 中文母语用户在 Web GUI 输入中文时会直接把草稿连同文字一起损坏，属于高感知度痛点。

**满意 / 正向**
- **插件体系获得真实认可**：用户愿意投入时间开发 `dsh-plugin-wsl-env`、`dsh-seam` 等工程化工具，说明 seam provider 的扩展设计具备吸引力。
- **社区互助质量高**：多个缺陷帖附带完整环境、根因定位与建议修复方案，贡献者技术水平显著高于一般社区。

**使用场景画像**
- 主力为 **Windows 桌面 + 本地受限权限** 的个人开发者，其次是 macOS arm64 与 NixOS/Wayland 用户；
- 典型任务为 **长流程 Agent 编排**（workflow、多阶段）与 **插件自扩展**，两者都直接落在当前最不稳定的模块上。

---

## 8. 待处理积压（提醒维护者关注）

按“开放时长 × 严重度”排序：

| 讨论 | 主题 | 已开放 | 评论 | 备注 |
|---|---|---|---|---|
| [#5532](https://github.com/deepseek-ai/deepseek-harness/discussions/5532) | Windows 沙箱控制台窗口刷屏 | **78 天**（09-03 起） | 5 | 根因与修复建议已给出，仍 OPEN |
| [#5630](https://github.com/deepseek-ai/deepseek-harness/discussions/5630) | 中文输入法输入损坏 | **77 天** | 9 | 中文用户核心链路，长期无收敛 |
| [#6661](https://github.com/deepseek-ai/deepseek-harness/discussions/6661) | macOS 孤儿 Python 僵尸进程 | **67 天** | 5 | 资源泄漏类，影响长时间驻留 |
| [#7569](https://github.com/deepseek-ai/deepseek-harness/discussions/7569) | Agent 状态外部通知 | **58 天** | 9 | 成本最低、收益明确，建议优先排期 |
| [#8322](https://github.com/deepseek-ai/deepseek-harness/discussions/8322) | Windows 全 shell 工具启动即退 | **52 天** | 14 | P1 且根因明确，积压时间偏长 |
| [#8357](https://github.com/deepseek-ai/deepseek-harness/discussions/8357) | workspaceController 不可用 | **51 天** | 18 | 阻断首次使用，评论数为积压项最高 |
| [#8827](https://github.com/deepseek-ai/deepseek-harness/discussions/8827) | workflow 调用永不返回 | **47 天** | 20 | P1，Agent 编排核心能力 |
| [#9086](https://github.com/deepseek-ai/deepseek-harness/discussions/9086) / [#10593](https://github.com/deepseek-ai/deepseek-harness/discussions/10593) | Low 完整性标签残留 | 44 / 30 天 | 11 / 5 | 建议合并归档，统一到 Windows 沙箱重构项下 |
| [#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) | Desktop 认证 431 | 34 天 | **36（最高）** | 跨 3 个构建未修，建议本周内升级优先级 |

**给维护者的三条建议**

1. **公开 Windows 沙箱重构状态**：4 条关联讨论合并跟踪，给出“是否重构、目标版本”的明确回答，比逐条修复更能快速减少问题讨论量。
2. **建立 Discussion → Release 的闭环标记**：在没有 Issues/PR 的治理模式下，Release Notes 里标注关联 Discussion 编号，是唯一能让社区确认“问题已被处理”的手段。
3. **优先处理评论数 ≥ 18 的 4 条**（#9924 / #8827 / #12751 / #8357）：这四条合计 93 条评论，约占 Top 15 总量的 53%，也是留存风险最集中的位置。

---

*报告口径说明：本项目未启用 Issues 与 Pull Requests，全部社区活动以 Discussions 呈现；今日无 Release，因此“合并上线内容”无数据可填。所有严重度与路线图判断均基于讨论文本、版本线索与开放时长推导，未包含官方未公开的内部进度。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*