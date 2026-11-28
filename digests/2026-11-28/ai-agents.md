# OpenClaw 生态日报 2026-11-28

> Issues: 350 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-28 03:38 UTC

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
**日期：2026-11-28** · 数据来源：OpenClaw GitHub 仓库（github.com/openclaw/openclaw）

---

## 一、今日速览

OpenClaw 今日维持**极高活跃度**：24 小时内 Issues 更新 350 条（新开/活跃 212、关闭 138，关闭率约 39%）、PR 更新 500 条（待合并 282、已合并/关闭 218），并发布 `v2026.12.1-beta.1`。更新链路（prepared-release）与 Gateway 内存/SQLite 长稳问题构成今日双主线：前者由 #204775 设计讨论（57 条评论）与多个 PR 集中推进，后者则持续产生 P0/P1 级缺陷报告。整体看，**合并能力（218 条）跟上了提交量（282 条待合并），但评审压力仍偏大**；同时 beta 版本围绕“更新不停服”和提示缓存复用展开，说明项目正从功能扩张转向**运行时稳定性与升级体验**的成熟化阶段。

---

## 二、版本发布：v2026.12.1-beta.1

**版本号**：`2026.12.1-beta.1`（预发布版本，非稳定通道）

**核心更新**
1. **更新链路重构（重点）**
   - Git 安装改为使用 **prepared releases（预准备发布）＋常驻启动器（resident launcher）**，减少更新时的进程重启与中断。
   - 包（package）更新改为**先准备、不停服**：更新准备阶段不再中断正在服务的 Gateway。
   - 来源：#203194、#203497（致谢 @obviyus）。
2. **提示缓存（Prompt caching）**
   - 压缩（compaction）流程将在不同路由间**复用暖提示缓存（warm prompt cache）**，降低长会话压缩的 token 与延迟成本。

**破坏性变更**：本次发布说明未标注 breaking change，但更新链路（resident launcher、prepared-release 状态机）属于**架构级改动**，对自定义部署脚本、systemd/launchd 单元、以及依赖“更新时 Gateway 会重启”这一假设的监控告警可能产生行为差异，建议在 beta 通道验证后再切换。

**迁移注意事项**
- Git 安装用户需确认常驻启动器已正确注册，避免更新后出现“旧启动器拉起新版本失败”。
- 包安装用户应验证：更新准备完成但未切换期间，Gateway 是否仍能正常接收请求。
- 关注 #207139（更新准备锁所有权修复）是否进入后续 beta，该 PR 直接对应“慢速更新丢失 preparation lock”的场景。

🔗 建议对照阅读：#204775（设计总览）、#207139（锁所有权修复 PR）

---

## 三、项目进展

> 说明：本次数据中展示的 30 条高互动 PR 中仅 1 条处于 CLOSED 状态，其余均为当日新开且在评审中；下列进展综合 PR 状态与 Issue 关闭情况判断。

**1. 更新机制进入“设计与实现并行”阶段**
- #204775 [OPEN] `Design: prepared-release updates (state, ownership and plan)` 已积累 **57 条评论**，作为更新路径的共享参考，明确“谁负责哪部分”，避免多人改同一批文件产生设计冲突。
- #207139 [OPEN] `fix(update): preserve preparation lock ownership`（size: L，状态：ready for maintainer look）修复慢速更新丢失 preparation lock、以及后续清理误删后继者锁的竞态问题。

**2. Gateway 启动/内存问题获得工程化收敛**
- #192547 [OPEN] `Reduce Gateway startup memory on constrained ARM64 hosts`（30 条评论）已定位 ARM64 低内存场景下“ready 后、首个模型响应前 OOM”的复现配置（Node 24.22.1、1 GiB cgroup、V8 堆上限 256 MiB），相关约束参数正在评审。
- #181432、#195497 等内存回归报告仍在跟踪，尚未见到对应 fix PR。

**3. 自动化 / Cron 体验的一批“小而准”修复**
- #207071 [OPEN] 修正 cron 前置提示中“the automation tool”这一模型无法解析的指代，改为明确工具名，避免 `record_result` 路由错误。
- #207182 [OPEN] 修正 `cron add` 在 `--session-key` 已指定 agent 时仍误报“使用默认 agent”的提示。
- #207191 [OPEN] 阻止已暂停的自动化发出“Turn yielded without a continuation source”的误报恢复提示。
- #193150 [OPEN] 与 #207185 [OPEN] 配对：前者报告 Dreaming Promotion 无进度上报导致每晚被 stuck-session watchdog 误判中断，后者提交修复使夜间 Promotion 不再在 6 分钟后被中止。

**4. 已关闭的重要 Issue**
- #153426 [CLOSED，P0] 精选记忆根（`MEMORY.md` / `USER.md`）被 provenance ratchet 永久排除出 bootstrap 注入的问题已关闭（28 条评论，安全与会话状态相关）。
- #114612 [CLOSED] `memory_index_chunks` / `memory_embedding_cache` 无保留策略、无限增长的问题已关闭。
- #202213 [CLOSED] 2026.11.6 无法读取压缩会话归档（`ERR_BUFFER_TOO_LARGE`）已关闭，指向 #192743 / #193548 进入稳定版。
- #167927 [CLOSED] TUI 客户端收不到审批卡片的问题已关闭。

**整体推进评估**：更新链路、自动化执行语义、会话归档兼容性三条线均有实质推进；但内存与 SQLite 类长稳问题**新增速度快于修复速度**，是当前项目健康度的主要拖累项。

🔗 #204775 / #207139 / #192547 / #207185 / #193150

---

## 四、社区热点

| 排名 | 条目 | 评论 | 状态/优先级 | 核心诉求 |
|---|---|---|---|---|
| 1 | [#204775 Design: prepared-release updates](https://github.com/openclaw/openclaw/issues/204775) | 57 | OPEN / P2 | 更新路径的**设计共识与责任划分**，避免多人并行改动冲突 |
| 2 | [#178359 doctor --fix --non-interactive 挂起 15+ min](https://github.com/openclaw/openclaw/issues/178359) | 33 | OPEN / P1 crash-loop | 非交互式修复流程**无输出、永不进入 DB 修复**，macOS 上可稳定复现 |
| 3 | [#192547 降低 ARM64 受限主机 Gateway 启动内存](https://github.com/openclaw/openclaw/issues/192547) | 30 | OPEN / P2 | 1 GiB 限制下“先 ready 后 OOM”，**边缘/家用服务器部署**受阻 |
| 4 | [#153426 精选记忆根被永久排除注入](https://github.com/openclaw/openclaw/issues/153426) | 28 | CLOSED / P0 | 普通 web-search 行为即可将 `originClass` 置为 untrusted，**静默、无 CLI、无恢复** |
| 5 | [#114612 memory-core SQLite 无界增长](https://github.com/openclaw/openclaw/issues/114612) | 20 | CLOSED / P2 | 两张表无保留/淘汰策略，**长期运行必然撑爆磁盘** |
| 6 | [#181432 RSS ~1.9 GB + SQLite 事务超时](https://github.com/openclaw/openclaw/issues/181432) | 16 | OPEN / P1 | 升级后基线内存从 ~300 MB 涨至 1.89 GB |
| 7 | [#127195 十六处相同错误串无可辨识原因码](https://github.com/openclaw/openclaw/issues/127195) | 15 | OPEN / P2 | 生产排障困难，需要 reason code / call-site tag |
| 8 | [#112638 session.maintenance enforce 不生效](https://github.com/openclaw/openclaw/issues/112638) | 14 | OPEN / P2 | thread/channel 条目豁免回收，`maxEntries`/`maxDiskBytes` 被静默突破 |

**分析**：今日热点的共同底色是**“可运维性”**——用户不再只关心功能，而是要求：更新可解释、错误可追溯（原因码）、资源可约束（内存/磁盘上限真的生效）、状态可恢复（记忆根、会话归档）。#204775 的高评论量说明更新机制已是**跨团队协作瓶颈**，需要设计文档先行；而 #178359、#192547、#181432 三连则直指“低配主机 + 长期驻留”这一真实主流部署形态尚未被充分支持。

---

## 五、Bug 与稳定性

### P0（发布阻塞级）

| Issue | 问题 | 状态 | Fix PR |
|---|---|---|---|
| [#126821](https://github.com/openclaw/openclaw/issues/126821) | 全新重建的 SQLite 在 15–24h 内复发 freelist 计数错误，并出现“瘫痪 Gateway”模式（拒绝服务但永不退出） | OPEN | 未见 |
| [#152275](https://github.com/openclaw/openclaw/issues/152275) | 插件替换 commit 成功后激活失败，导致模型目录与回复分发不可用，需重启 | OPEN | 未见 |
| [#194664](https://github.com/openclaw/openclaw/issues/194664) | Codex 受保护续接阻断所有后续消息，而 Stop 显示无活动运行 | OPEN | 有 linked PR |
| [#202518](https://github.com/openclaw/openclaw/issues/202518) | `claude-cli` 在 `sessions_spawn` + `sessions_yield` 后永不关闭，后续轮次复用已死会话 | OPEN | 未见 |
| [#188563](https://github.com/openclaw/openclaw/issues/188563) | macOS 应用恢复先卸载 Gateway，再把 LaunchAgent 移到废纸篓时 EPERM 失败 | OPEN | fix-shape-clear / queueable-fix |
| [#141443](https://github.com/openclaw/openclaw/issues/141443) | Linux AppImage 在 CachyOS Wayland 下白屏/黑屏 | OPEN | 未见 |
| [#153426](https://github.com/openclaw/openclaw/issues/153426) | 记忆根被永久排除注入 | **CLOSED** | 已关闭 |

### P1（高影响）

- [#178359](https://github.com/openclaw/openclaw/issues/178359) `doctor --fix --non-interactive` 挂起 15+ 分钟无输出（crash-loop）— OPEN
- [#181432](https://github.com/openclaw/openclaw/issues/181432) 基线 RSS ~1.9 GB + SQLite 事务超时 >1.5s — OPEN
- [#194403](https://github.com/openclaw/openclaw/issues/194403) helper 完成后的续接使自身执行权限失效，阻塞后续人工消息 — OPEN
- [#195497](https://github.com/openclaw/openclaw/issues/195497) Gateway 进程 17 小时内存涨至 ~3 GB（systemd 常驻 + Feishu + 13 个 cron）— OPEN
- [#206669](https://github.com/openclaw/openclaw/issues/206669) Windows SQLite 完整性 worker 交付结论后仍存活，每个库多等 ~300s — OPEN
- [#200148](https://github.com/openclaw/openclaw/issues/200148) macOS 进程内 `/restart` 永久挂起（端口已关、pid 存活、launchd 不重启）— OPEN
- [#149406](https://github.com/openclaw/openclaw/issues/149406) `sessions_spawn` 子会话只拿到 `mcp__openclaw__*`，第三方 MCP 全部缺失 — OPEN
- [#206030](https://github.com/openclaw/openclaw/issues/206030) 迁移后回收无法排空积压（commit checkpoint expired → 会话库降级 → 拒收消息）— OPEN
- [#205566](https://github.com/openclaw/openclaw/issues/205566) Control UI 长会话回复永不完成，360s watchdog 误杀 pre-flight 压缩/记忆刷写 — OPEN
- [#196820](https://github.com/openclaw/openclaw/issues/196820) Control UI 在 `Element.getAnimations()` 循环中 ~100% CPU 卡死 — OPEN

### 当日新报（11-28）
- [#207190](https://github.com/openclaw/openclaw/issues/207190) [UX] Gateway 会话内的 agent 无法停止该 Gateway，自死锁至 `TimeoutStopSec`（默认 330s）而非快速拒绝。clawsweeper:intake:bug，刚进入分诊。

**稳定性判断**：今日 P0 中 **3 项与会话/续接状态机相关**（#194664、#202518、#206030），叠加 #194403/#205566，说明**长会话 + 多 agent + CLI 后端**组合是当前最脆弱路径；**4 项与内存/SQLite 相关**（#126821、#181432、#195497、#206669），且多数无 fix PR，属最高优先级技术债。

---

## 六、功能请求与路线图信号

| 需求 | Issue | 判断 |
|---|---|---|
| 更新流程“设置页一键完成 + 状态可见” | [#204775](https://github.com/openclaw/openclaw/issues/204775)（设计）、[#207139](https://github.com/openclaw/openclaw/pull/207139)（实现） | **高概率进入 2026.12 稳定版**，已有设计文档 + 实现 PR 双支撑 |
| `backup git create` 可配置 git 超时 + 表级排除 | [#204701](https://github.com/openclaw/openclaw/issues/204701) | 中高。硬编码 120s 超时导致定时备份反复失败，修复成本低，易被采纳 |
| 运营商可覆盖模型请求失败的对外文案 | [#167341](https://github.com/openclaw/openclaw/issues/167341) | 中。P3 + 需产品决策，短期难落地 |
| 按 provider 真实 reset 时间冷却（非 OpenAI/Codex 之外的通用 30s→5min） | [#113159](https://github.com/openclaw/openclaw/issues/113159) | 中。涉及 auth provider 语义，需 maintainer + 产品双审 |
| 内置记忆搜索排序可配置（衰减半衰期、混合权重、MMR） | [#178914](https://github.com/openclaw/openclaw/issues/178914) | 低（已 CLOSED，未排期） |
| CLI live-session 容量可配置（默认 16 保留） | [#167177](https://github.com/openclaw/openclaw/issues/167177) | 低（已 CLOSED） |
| 非主 agent 在 provider plan 为空时生成 models.json | [#58289](https://github.com/openclaw/openclaw/issues/58289) | 低—中。存在 linked PR，但长期 stale |
| Dream Diary 语言/提示词可配置 | [#79223](https://github.com/openclaw/openclaw/issues/79223) | 低（已 CLOSED，stale） |

**路线图信号**：下一版本（2026.12 稳定线）的核心主题大概率是**更新体验 + 自动化执行语义**（#207071/#207182/#207191/#207185 一组），而**记忆可调性（#178914/#158897/#79223）已被系统性关闭**，说明维护者在主动收敛插件配置面，避免 `memory-core` 成为参数沼泽。

---

## 七、用户反馈摘要

**真实痛点（高频出现）**
1. **“静默失效”最伤信任**：记忆根被永久排除（#153426）、`session.maintenance` 上限被静默突破（#112638）、同一错误串在 16 处无法区分（#127195）——用户反复强调“无诊断、无 CLI、无恢复”是核心不满点。
2. **低配常驻部署未被认真对待**：ARM64 / 1 GiB cgroup / 无 swap / systemd 常驻 / 多 cron + WebSocket 频道，是 #192547、#181432、#195497 的共同画像；用户期待的是“能长期跑住”，而非峰值性能。
3. **升级即风险**：从 2026.9.4 → 2026.9.6 的 canary 超时（#157332）、media-persistence 阶段失败（#158373）、更新后内存翻 6 倍（#181432），多次升级事故让用户倾向“锁版本 + 离线包”。

**使用场景画像**
- 自建 Gateway（systemd user unit）+ Telegram/Feishu 频道 + 多 agent + cron 自动化，是 Issue 中最常见的生产拓扑。
- macOS 桌面应用 + LaunchAgent，是第二大类（#188563、#200148、#206669）。
- 容器化（Docker/Linux arm64）用户关注 HEIC 转换、AppImage Wayland 兼容（#163107、#141443）。

**满意点**
- 错误分类（billing / rate_limit / auth / overloaded）替代原始 provider 文本，被明确认可为“big improvement”（#167341）。
- 上下文压缩与 session 归档能力持续增强，用户主动催更“请把 #192743/#193548 发到稳定版”（#202213）。

**不满意点**
- Watchdog 与真实工作节奏不匹配：360s 回复 watchdog（#205566）、stuck-session 误杀 Dreaming Promotion（#193150）——**“健康检查误伤正常长任务”**是新的抱怨类型。
- 多 agent 群聊场景下 transcript 逐账号重复回显（#146311），语音消息体验受损。

---

## 八、待处理积压（提醒维护者关注）

| 条目 | 创建时间 | 已挂起 | 风险 |
|---|---|---|---|
| [#58289](https://github.com/openclaw/openclaw/issues/58289) 非主 agent 缺 models.json → "Unknown model" | 2026-03-31 | **~8 个月** | 多 agent 部署启动即失败；有 linked PR 但长期未决 |
| [#92473](https://github.com/openclaw/openclaw/issues/92473) 模型 fallback 提示泄漏到外部渠道 | 2026-06-12 | ~5.5 个月 | 泄露内部路由信息，含 ux-friction 标签，仅 1 👍 |
| [#112638](https://github.com/openclaw/openclaw/issues/112638) session.maintenance enforce 不限制存储 | 2026-07-22 | ~4 个月 | 磁盘无界增长，与已关闭的 #114612 同源风险，具备 fix-shape-clear / source-repro |
| [#127195](https://github.com/openclaw/openclaw/issues/127195) 16 处相同错误串无原因码 | 2026-08-21 | ~3 个月 | 🦞 diamond lobster 评级，fix-shape-clear，是排障体验的关键卡点 |
| [#158373](https://github.com/openclaw/openclaw/issues/158373) 离线更新在 media-persistence 失败 | 2026-09-25 | ~2 个月 | 已有多轮诊断更新但**未闭环**，与新版更新链路直接相关 |
| [#149406](https://github.com/openclaw/openclaw/issues/149406) sessions_spawn 子会话缺第三方 MCP | 2026-09-15 | ~2.5 个月 | P1 + 需安全评审，多 agent 能力受限 |
| [#158144](https://github.com/openclaw/openclaw/issues/158144) claude-cli 会话锁定到已限额 profile | 2026-09-25 | ~2 个月 | 每周限额触发后每轮都走 fallback，成本与体验双损 |

**PR 侧积压**：`#201285`（choose where automations run）、`#201275`（task prompts for scheduled reminders）、`#201280`（move ended one-time automations to run history）、`#201274`（remove unused automation wake setting）四条 XL 级 PR 均标注 **“Do not land”** 并自 2026-11-18 停留在 waiting on author，属自动化重构的**关键路径阻塞项**，建议明确 owner 与拆分计划，否则 2026.12 线的自动化相关工作会持续悬空。

---

### 附：今日健康度小结

| 维度 | 评价 |
|---|---|
| 社区活跃度 | 🟢 极高（350 Issues / 500 PR / 24h） |
| 合并吞吐 | 🟡 尚可（218 已合并/关闭 vs 282 待合并，积压净增 +64） |
| 发布节奏 | 🟢 正常（beta 迭代中） |
| 稳定性 | 🔴 偏弱（P0 未解 6 项，内存/SQLite 类无 fix PR） |
| 可运维性 | 🟡 改善中（更新链路重构 + 一批错误文案/诊断修复） |
| 长期积压 | 🟡 需关注（最老 OPEN Issue 已达 8 个月，4 条 XL PR 停摆） |

**一句话结论**：OpenClaw 今日在**更新体验与自动化语义**上明显向前，但**长稳与资源治理**仍是拖累发布信心的主要短板，建议将 #126821、#181432、#195497、#206669 归并为“Gateway 长期驻留资源”专项，并为本期 4 条 XL 自动化 PR 指定明确 owner。

---

## 横向生态对比

# 横向对比分析报告｜个人 AI 助手 / 自主智能体开源生态（2026-11-28）

## 1. 生态全景

个人 AI 助手与自主智能体开源生态已从“功能堆叠”转入“长期运行、可运维性与数据可信”竞争，头部项目单日 Issues/PR 更新达数百条，但稳定性债与评审积压同步放大。OpenClaw 与 Hermes Agent 构成第一梯队双中心：前者推进更新链路与运行时稳定化，后者承载插件化、桌面重设计与大规模合并吞吐。中长尾项目分化明显：AstrBot、QwenPaw 以修复闭环和体验补齐为主，Zeroclaw 呈“高讨论、低合并”，PicoClaw 处于存量清理与发行版滞后状态。共同痛点集中在 MCP 治理、Provider 兼容、长会话压缩、资源上限、多渠道可靠性与安全边界，DeepSeek Harness 则以 Discussions 高热度暴露产品化与交付透明度缺口。

## 2. 各项目活跃度对比

> 数据为过去 24 小时“更新量”，不等同项目存量；DeepSeek Harness 未启用 Issues/PR，以 Discussions 计。

| 项目 | Issues 24h（活跃/关闭） | PR 24h（待合/已合关） | Release | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 350（212/138） | 500（282/218） | `v2026.12.1-beta.1` | 活跃极高；Issue 关闭率约 39%、PR 合并/关闭 218 条；但 P0 未解 6 项，内存/SQLite 长稳问题拖累稳定性 |
| **Hermes Agent** | 282（264/18） | 500（406/94） | `v0.23.5` | 高流入、高积压；Issue 关闭率仅 6.4%、PR 关闭率 18.8%；平台插件化与桌面重设计并行，风险面大 |
| **AstrBot** | 16（8/8） | 75（45/30） | 无 | 良好偏强；Issue 关闭率 50%、PR 流转率 40%；MCP、ChatUI、Provider 修复密集，评审带宽是主要瓶颈 |
| **QwenPaw** | 11（8/3） | 25（18/7） | 无 | 活跃 A、稳定性 B-、审阅 C+；P0/P1 多但 3 项 24h 内有 fix PR，Code Mode 双重缺陷无 fix |
| **Zeroclaw** | 11（11/0） | 43（43/0） | 无 | 高讨论、低合并；0 Issue 关闭、0 PR 合并，43 条待合并队列继续膨胀 |
| **PicoClaw** | 2（2/0） | 5（1/4） | 无 | 中上；集中清理 12 个历史子 PR，报告—修复闭环良好；但发行版仍落后于主干修复 |
| **DeepSeek Harness** | Discussions 137 | Issues/PR 未启用 | 无 | 社区热度高、代码交付不可观测；超大会话 OOM、启动变慢、token 成本问题突出 |

## 3. OpenClaw 在生态中的定位

**规模与吞吐处于第一梯队。** OpenClaw 与 Hermes 同为单日 350/282 Issues、500 PR 量级项目，但 OpenClaw 的 Issue 关闭率约 39.4%，显著高于 Hermes 的 6.4%；PR 已合并/关闭 218 条，也高于 Hermes 的 94 条。其合并能力相对更强，但 PR 待合并仍净增约 64 条，评审压力未消。

**技术路线更偏“Gateway 中心化平台”。** OpenClaw 以 Gateway 为运行核心，当前重点推进 prepared-release + resident launcher 的不停服更新、prompt cache 跨路由复用、cron/automation 语义修正、记忆根与 SQLite 长稳治理。与 Hermes 的插件平台化/桌面重设计、QwenPaw 的 Console/Code Mode/企业扩展、AstrBot 的 IM 机器人框架、Zeroclaw 的 Provider/MCP 安全弹性、PicoClaw 的轻量跨平台路线相比，OpenClaw 更接近“个人 Agent 运行时基础设施”。

**生态位是核心参照，但短板明确。** 优势在于更新机制有设计文档先行（#204775，57 条评论）、自动化修复成组推进、合并吞吐较强；短板是长期驻留资源治理与 P0 稳定性：ARM64 1 GiB OOM、RSS ~1.9 GB、SQLite freelist/事务超时等多项无 fix PR，且 4 条 XL 自动化 PR 长期停摆。社区规模上，OpenClaw 与 Hermes 同处头部，远高于 AstrBot（75 PR）、QwenPaw（25 PR）、Zeroclaw（43 PR）、PicoClaw（5 PR）。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 / 证据 |
|---|---|---|
| **长期驻留与资源治理** | OpenClaw、Hermes、DeepSeek Harness | OpenClaw ARM64 1 GiB OOM、RSS ~1.9 GB、SQLite 无界增长；Hermes `state.db` 写锁 20–35s、Kanban worker 崩溃；DeepSeek 1GB 会话 OOM、`dsh web` 启动 12s→25s |
| **会话/记忆/压缩与数据可信** | OpenClaw、Hermes、QwenPaw、AstrBot、DeepSeek | OpenClaw 记忆根被永久排除、SQLite 表无保留策略；Hermes 可插拔 SessionDB、自动备份、压缩时机错位；QwenPaw 注入上下文持久化、压缩历史不可达；AstrBot `mark_as_temp()` 内容回归；DeepSeek 超大会话崩溃死循环 |
| **MCP / 工具生态治理** | Zeroclaw、AstrBot、OpenClaw、QwenPaw | Zeroclaw MCP 启动期健康检查误判、无法排除单工具（S0）；AstrBot MCP 重连自愈、结构化结果为空、工具命名空间隔离；OpenClaw 子会话缺第三方 MCP；QwenPaw Code Mode 子代理工具泄漏 |
| **Provider / 模型兼容性** | OpenClaw、Zeroclaw、AstrBot、PicoClaw、Hermes | OpenClaw `claude-cli` 会话锁定/续接；Zeroclaw OpenRouter 图片附件丢失、Gemini 迁移；AstrBot Gemini `functionResponse` 配对；PicoClaw Claude ToolCall 工具名为空；Hermes Qwen CLI 认证不兼容 |
| **多渠道 / IM 可靠性** | OpenClaw、Zeroclaw、PicoClaw、QwenPaw、Hermes、AstrBot | Feishu/Telegram/QQ/WeCom/DingTalk/Weixin 等通道的配置、代理、重连、消息切分与投递失败问题反复出现 |
| **升级/发布与可运维性** | OpenClaw、PicoClaw、Hermes、Zeroclaw、DeepSeek | OpenClaw 不停服更新与锁所有权；PicoClaw 主干已修但发行版未发；Hermes patch 汇总 338 PR 但无逐条说明；Zeroclaw 0 合并；DeepSeek 无 Release 信号 |
| **安全边界与权限治理** | Zeroclaw、Hermes、AstrBot、OpenClaw、QwenPaw | Zeroclaw MCP 单工具排除、RPC 拒绝原因、skills argv；Hermes dashboard 密钥回显；AstrBot spoiler 切分泄露；OpenClaw 记忆 provenance；QwenPaw 治理层规则不可配置 |
| **成本与 token 效率** | OpenClaw、Hermes、DeepSeek | OpenClaw 暖 prompt cache 复用；Hermes 压缩重构；DeepSeek 启动税 8,188 token、29 个工具暴露 vs 对比工具 4 个 |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 路线关键差异 |
|---|---|---|---|
| **OpenClaw** | 全栈个人 Agent Gateway：多渠道、自动化、记忆、更新体验 | 自建/技术型个人与团队、长期驻留部署 | Gateway 中心化 + resident launcher + prepared-release + prompt cache + cron/automation |
| **Hermes Agent** | 大规模 Agent 基础设施：Kanban、多 Agent、插件平台、桌面工作区 | 重度自托管、多机多 profile、企业 IM 集成 | plugin host、可插拔 SessionDB、平台插件迁移、Desktop/Web 双壳 |
| **AstrBot** | IM 聊天机器人框架：插件、MCP、ChatUI、Provider/适配器 | 社区运营、群聊机器人、插件开发者 | 适配器/Provider/MCP 分层，社区 PR 密集，MCP 与 ChatUI 体验打磨 |
| **QwenPaw** | Console、Code Mode、Creator、企业私有化 | 企业/团队、私有化部署、代码模式用户 | Console/API + 插件 + 企业扩展接口；base-path 部署与治理层配置 |
| **Zeroclaw** | Provider 兼容、MCP 弹性、安全策略、桌面 computer-use | 开发者、安全敏感、K8s/容器部署 | 配置校验、RPC 拒绝语义、skills argv、feature-flagged computer_use |
| **PicoClaw** | 轻量跨平台 Web/Telegram 助手 | 个人用户、受限网络、低门槛部署 | 简单 channel + Web 聊天 + 代理配置；当前以存量清理和体验修复为主 |
| **DeepSeek Harness** | 插件优先的 Web/桌面/CLI 形态探索 | 开发者、成本敏感、IDE 工作流用户 | 公开数据以 Discussions 为主；插件生态活跃，但 Releases/PR 交付透明度低 |

## 6. 社区热度与成熟度

**第一梯队：OpenClaw、Hermes。**  
两者均达数百级 Issues/PR 更新，是生态注意力中心。OpenClaw 处于“成熟化/质量巩固”阶段：更新链路、自动化语义、错误文案有实质推进，但长稳与资源治理仍是发布信心短板。Hermes 处于“快速扩张 + 高积压”阶段：v0.23.5 汇总约 338 个 PR，插件化迁移和桌面重设计并行，但 406 条待合并 PR、P1 Kanban 崩溃与 Windows 稳定性问题构成风险。

**第二梯队：AstrBot、QwenPaw、DeepSeek Harness。**  
AstrBot 是“质量巩固 + 功能蓄力”型：Issue 关闭率 50%、PR 流转率 40%，MCP 修复与 ChatUI 打磨成组推进。QwenPaw 是“高强度修复 + 企业信号”型：P0/P1 多但 24h 内 fix 闭环率高，Code Mode 与企业扩展接口是后续关键。DeepSeek Harness 社区讨论热度高（137 条 Discussions），但无 Release、无 PR 可观测，属于“需求先行、交付待验证”。

**第三梯队：Zeroclaw、PicoClaw。**  
Zeroclaw 呈“高讨论、低合并”：43 条 PR 全部待合并、0 关闭，S0/S1 缺陷与 MCP 健康检查问题需要快速响应。PicoClaw 处于“中低强度维护 + 存量清理”：单日 7 条事件但关闭 4 条 PR，报告—修复闭环良好；主要风险是发行版落后、聚合关闭 PR 的落地透明度不足。

## 7. 值得关注的趋势信号

1. **“可运维性”成为 Agent 平台核心指标。** 用户不再只问“能不能跑”，而是要求资源可约束、错误可追溯、状态可恢复。OpenClaw 的原因码/静默失效、Zeroclaw 的 `/health` 语义、PicoClaw 的代理配置一致性均指向同一结论：**无诊断能力的功能等于不可用**。

2. **长会话与记忆正在成为“资产”而非缓存。** Hermes 的自动备份 29👍、可插拔 SessionDB、OpenClaw 记忆根/SQLite、QwenPaw 注入上下文持久化、DeepSeek 1GB 会话 OOM，说明开发者需要把会话存储、压缩、归档、恢复做成完整生命周期，而非单点压缩优化。

3. **MCP 从“接入能力”进入“治理能力”阶段。** 健康检查、重连自愈、工具命名空间、单工具排除、结构化结果、安全权限正在成为刚需。Zeroclaw 的 S0 单工具排除、AstrBot 的 MCP 重连自愈、OpenClaw 的子会话 MCP 缺失、QwenPaw 的 Code Mode 工具泄漏共同证明：**MCP 生态的竞争点已从“支持多少 Server”转向“能否安全稳定地管住工具”**。

4. **升级/发布体验成为平台竞争力。** OpenClaw 以 prepared-release + resident launcher 追求不停服更新；PicoClaw 出现“主干已修、发行版未修”的窗口；Hermes 用 patch 汇总 338 PR 但缺少逐条叙事；DeepSeek 无 Release 信号。对开发者而言，**可回滚、可观测、可灰度**比单次功能数量更重要。

5. **多渠道与多 Provider 兼容是长尾成本中心。** Telegram 引用语义、Feishu quickstart、QQ 重连、OneBot 帧上限、Gemini/Claude/OpenRouter schema 差异反复出现。建议将 Provider/Channel 兼容性矩阵与回归测试作为基础设施，而非逐 bug 修补。

6. **安全边界需要前置到默认配置。** Hermes dashboard 密钥回显、AstrBot spoiler 切分泄露、Zeroclaw RPC 拒绝语义与 skills argv、OpenClaw 记忆 provenance、PicoClaw 代理绕过，说明安全不再是“企业版附加项”，而是个人自托管场景的默认要求。

7. **成本与 token 效率重新回到路线图。** OpenClaw 暖 prompt cache、Hermes 压缩重构、DeepSeek 启动税与工具暴露对比，表明在模型能力趋同后，**上下文组装、工具选择、缓存复用**将直接决定产品经济性与用户体验。

8. **审查带宽与社区治理成为项目健康度分水岭。** Hermes 406 条待合并 PR、Zeroclaw 43 条 0 合并、OpenClaw 4 条 XL PR 停摆、PicoClaw 聚合关闭 PR 的透明度问题，均提示维护者需要模块 owner、批量评审与 RFC 收敛机制。对 AI 智能体开发者而言，**优先投资可观测性、资源上限、升级回滚、MCP 治理与会话持久化**，比继续扩张工具数量更具长期价值。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报（2026-11-28）

> 数据口径：过去24小时 Issues 更新 11 条（新开/活跃 11、关闭 0）；PR 更新 43 条（待合并 43、已合并/关闭 0）；新版本 0 个。PR 评论数字段缺失，PR 热度排序不做臆测，社区讨论热度以 Issues 评论数为准。

## 1. 今日速览

- 今日项目协作面维持高活跃：共 54 条 Issue/PR 更新（11 条 Issue + 43 条 PR），但交付吞吐为 0。
- 无 Issue 关闭、无 PR 合并/关闭、无新版本发布，说明审查与合并瓶颈明显，PR 待合并队列继续膨胀。
- 讨论焦点集中在 provider 兼容与工具结果完整性、MCP 启动弹性与健康检查、Web 聊天焦点可用性、桌面 computer-use 和 Gemini provider 迁移。
- 健康度判断：社区输入充足、问题定位具体，但 S0/S1 缺陷和 43 条待合并 PR 带来积压风险；整体呈“高讨论、低合并”状态。

## 2. 版本发布

本日无新版本发布，无破坏性变更或迁移注意事项。

## 3. 项目进展

本日 **0 个 PR 合并/关闭、0 个 Issue 关闭**，因此没有已落地功能或修复；项目合并交付量为 0。当前进展主要体现在 43 条待合并 PR 的在途工作：

- [#12780](https://github.com/zeroclaw-labs/zeroclaw/pull/12780) `fix(providers): deliver declared OpenRouter tool-result images across chat paths`：直接修复 #12774 的 S1 问题，涉及 OpenRouter 工具结果图片投递。
- [#12779](https://github.com/zeroclaw-labs/zeroclaw/pull/12779) `fix(gateway): validate on-disk config before admin reload`：在管理端 reload 前校验磁盘配置，避免无效配置被确认后触发 teardown。
- [#12778](https://github.com/zeroclaw-labs/zeroclaw/pull/12778) `fix(config): parse allowed_commands entries once for every policy check`：统一 `allowed_commands` 解析，提升安全策略一致性。
- [#12744](https://github.com/zeroclaw-labs/zeroclaw/pull/12744) `feat(skills): pass literal arguments to executables without a shell`：为 skills 引入固定 executable 与 `argv` 数组，降低 shell 注入面。
- [#12776](https://github.com/zeroclaw-labs/zeroclaw/pull/12776) `feat(tools): add feature-flagged macOS computer_use tool and OpenRouter tool-result image delivery`：对接 #11015 的桌面 computer-use 方向，同时覆盖 OpenRouter 图片投递。
- [#12691](https://github.com/zeroclaw-labs/zeroclaw/pull/12691) `feat(gateway): show Codex subscription usage in web chat`：增强 Web 聊天中的订阅用量可观测性。

**评估**：以上均为待合并状态，不构成已交付。若集中合并，下一版本可覆盖 provider 兼容、配置安全、skills 执行安全与 computer-use 实验能力；但今日实际向前推进的合并量为 0。

## 4. 社区热点

- [#11005](https://github.com/zeroclaw-labs/zeroclaw/issues/11005) `[Task]: Stable RPC denial reasons and localized selector denials`：2 评论，更新于 11-28，标签含 `accepted`、`in-progress`、`risk:high`、`domain:security`。诉求是将 RPC 授权拒绝拆为稳定机器标识与本地化人类消息，并完成 selector 拒绝本地化。
- [#11658](https://github.com/zeroclaw-labs/zeroclaw/issues/11658) `[Bug]: Web chat input doesn't regain focus after a reply finishes`：2 评论，S3，web dashboard。用户希望回复结束后输入框自动恢复焦点，减少连续对话点击成本。
- [#12746](https://github.com/zeroclaw-labs/zeroclaw/issues/12746) `[Bug]: Chat message box doesn't get focus back when a turn ends after the page reconnected`：1 评论，S3，属于 #11658 的重连场景延伸，Web 聊天焦点恢复问题具有重复相关性。
- [#11015](https://github.com/zeroclaw-labs/zeroclaw/issues/11015) `[Tracker]: Desktop computer-use protocol and spike implementation`：1 评论，accepted tracker，high risk。诉求是协调桌面 computer-use 协议与首个实现切片。
- [#12669](https://github.com/zeroclaw-labs/zeroclaw/issues/12669) `[Tracker]: Gemini provider modernization`：1 评论，涉及因 Google 退役 Gemini CLI/Code Assist consumer OAuth 而迁移至 Gemini API keys、Vertex/Agent Platform、Gemini Enterprise 等支持路径。

**分析**：今日热点不是单纯的新功能扩张，而是稳定性、兼容性与安全边界：Web 可用性细节、provider 迁移、桌面自动化风险。PR 评论数缺失，无法可靠判断 PR 讨论热度。

## 5. Bug 与稳定性

按严重程度排列：

- **S0 / 数据丢失或安全风险**：[#12772](https://github.com/zeroclaw-labs/zeroclaw/issues/12772) `support excluding individual MCP tools inside mcp_bundles`，标注 S0 - data loss/security risk；当前无法仅禁用某个 MCP server 内的特定工具。未见 fix PR。
- **S1 / 工作流阻塞**：[#12774](https://github.com/zeroclaw-labs/zeroclaw/issues/12774) `OpenRouter drops declared tool-result image attachments`；provider 兼容问题，已有修复 PR [#12780](https://github.com/zeroclaw-labs/zeroclaw/pull/12780)（待合并）。
- **S1 / 工作流阻塞**：[#12773](https://github.com/zeroclaw-labs/zeroclaw/issues/12773) `Quickstart cannot configure Lark/Feishu credentials; writes an invalid channel block dropped on reload`；quickstart 未采集 `app_id`/`app_secret`，并持久化无效 channel block。未见 fix PR。
- **S1 / 工作流阻塞**：[#12766](https://github.com/zeroclaw-labs/zeroclaw/issues/12766) `gateway does not answer /health during startup while MCP tool listings connect`；MCP 故障时 liveness probe 可能重启 daemon。未见 fix PR。
- **S2 / 降级行为**：[#12767](https://github.com/zeroclaw-labs/zeroclaw/issues/12767) `transient MCP failure at channel startup leaves the agent without MCP tools until restart, and /health stays green`；启动期 HTTP 429/503/connection refused 后 MCP 工具丢失，健康检查仍为绿色。未见 fix PR。
- **S3 / 轻微问题**：[#11658](https://github.com/zeroclaw-labs/zeroclaw/issues/11658) Web 聊天回复结束后输入框丢失焦点；未见 fix PR。
- **S3 / 轻微问题**：[#12746](https://github.com/zeroclaw-labs/zeroclaw/issues/12746) 重连后 turn 结束不恢复输入框焦点；未见 fix PR。

**稳定性观察**：MCP 相关 S1/S2 集中在启动期依赖失败与健康检查语义，Kubernetes 场景影响较大；OpenRouter 图片附件问题已有修复 PR，但尚未合并。

## 6. 功能请求与路线图信号

- [#12765](https://github.com/zeroclaw-labs/zeroclaw/issues/12765) 请求新增 Buzz（buzz.xyz）channel，定位为免费开源 Slack 替代；暂无对应 PR，短期落地信号较弱。
- [#12772](https://github.com/zeroclaw-labs/zeroclaw/issues/12772) 请求支持在 `mcp_bundles` 中排除单个 MCP 工具；虽为功能请求/ Bug 混合，但 S0 风险可能推动优先处理。
- [#11015](https://github.com/zeroclaw-labs/zeroclaw/issues/11015) Desktop computer-use tracker 已 accepted；PR [#12776](https://github.com/zeroclaw-labs/zeroclaw/pull/12776) 提供 feature-flagged `computer_use` 工具，方向一致，可能进入实验版本。
- [#12669](https://github.com/zeroclaw-labs/zeroclaw/issues/12669) Gemini provider modernization 属于 provider 路线图重要迁移，当前展示数据中无直接实现 PR。
- [#11005](https://github.com/zeroclaw-labs/zeroclaw/issues/11005) Stable RPC denial reasons 已 accepted/in-progress；PR [#12062](https://github.com/zeroclaw-labs/zeroclaw/pull/12062) 提出 bounded RPC denial reason exception，属于配套设计信号。
- 其他可能影响下一版本的在途 PR：[#12264](https://github.com/zeroclaw-labs/zeroclaw/pull/12264) LLMTR provider、[#12691](https://github.com/zeroclaw-labs/zeroclaw/pull/12691) Codex 订阅用量、[#12744](https://github.com/zeroclaw-labs/zeroclaw/pull/12744) skills literal argv、[#11727](https://github.com/zeroclaw-labs/zeroclaw/pull/11727) zerocode 会话恢复、[#12459](https://github.com/zeroclaw-labs/zeroclaw/pull/12459) OIDC browser voice（当前 blocked/do-not-merge）。

**判断**：下一版本更可能优先 provider 兼容修复、MCP 健康/弹性、配置校验与安全策略一致性；Buzz 渠道和大型桌面 computer-use 仍需更多审查与实现配套。

## 7. 用户反馈摘要

- **Web 连续对话体验痛点**：回复结束或页面重连后输入框不恢复焦点，用户需额外点击才能继续对话（[#11658](https://github.com/zeroclaw-labs/zeroclaw/issues/11658)、[#12746](https://github.com/zeroclaw-labs/zeroclaw/issues/12746)）。
- **Provider 兼容痛点**：OpenRouter 丢弃工具结果中声明的图片附件，直接阻塞工作流（[#12774](https://github.com/zeroclaw-labs/zeroclaw/issues/12774)）。
- **配置引导痛点**：quickstart 创建 Lark/Feishu 渠道时不采集 `app_id`/`app_secret`，并写出 reload 后丢失的无效配置（[#12773](https://github.com/zeroclaw-labs/zeroclaw/issues/12773)）。
- **MCP 弹性与可观测性痛点**：K8s/容器环境下，启动期 MCP 429/503/连接拒绝会使 agent 无 MCP 工具，`/health` 仍绿；启动时 `/health` 不应答又会触发 liveness 重启 daemon（[#12766](https://github.com/zeroclaw-labs/zeroclaw/issues/12766)、[#12767](https://github.com/zeroclaw-labs/zeroclaw/issues/12767)）。
- **MCP 粒度治理痛点**：无法排除某个 MCP server 内的单个工具，存在数据丢失/安全风险（[#12772](https://github.com/zeroclaw-labs/zeroclaw/issues/12772)）。
- **使用场景**：Web dashboard 重度使用、OpenRouter 多模态工具结果、Kubernetes 部署、Lark/Feishu 接入、MCP bundle 治理。
- **满意/不满意**：数据中未见明确满意反馈；不满意主要集中在配置引导、provider 兼容、MCP 弹性与健康检查语义。社区反馈以具体复现和建设性诉求为主，但 S0/S1 问题需要快速响应。

## 8. 待处理积压

- [#11005](https://github.com/zeroclaw-labs/zeroclaw/issues/11005)：创建于 2026-09-20，更新于 2026-11-28，accepted/in-progress/high risk，2 评论；长期安全与本地化任务，需关注闭环。
- [#11015](https://github.com/zeroclaw-labs/zeroclaw/issues/11015)：创建于 2026-09-20，accepted tracker，high risk；桌面 computer-use 跨度大，建议明确里程碑。
- [#11658](https://github.com/zeroclaw-labs/zeroclaw/issues/11658)：创建于 2026-10-11，S3 但长期未修；与 #12746 同属 Web 焦点问题，建议合并处理。
- [#11727](https://github.com/zeroclaw-labs/zeroclaw/pull/11727)：创建于 2026-10-14，`needs-author-action`，size XL；zerocode 会话恢复，等待作者推进。
- [#12062](https://github.com/zeroclaw-labs/zeroclaw/pull/12062)：创建于 2026-10-27，`needs-author-action`，risk high/manual；RPC denial reason 文档例外提案。
- [#12188](https://github.com/zeroclaw-labs/zeroclaw/pull/12188)：创建于 2026-11-02，仍 OPEN；tool-result envelope 修复链的一环，与 #12704、#12781 相关，建议优先审查。
- [#12459](https://github.com/zeroclaw-labs/zeroclaw/pull/12459)：创建于 2026-11-15，`status:blocked`、`do-not-merge`；OIDC browser voice 需要明确阻塞原因与后续路径。
- [#12318](https://github.com/zeroclaw-labs/zeroclaw/pull/12318)：创建于 2026-11-09，`needs-author-action`；FieldForm 本地草稿恢复，等待作者响应。

**维护建议**：43 条 PR 全部待合并且今日 0 合并，建议对队列分级处理：优先 S0/S1 修复、provider 兼容、安全策略一致性；对 `needs-author-action`、`blocked`、`do-not-merge` 项及时清理或关闭，降低审查噪声与积压。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-11-28** ｜ 数据窗口：过去 24 小时 ｜ 数据源：github.com/sipeed/picoclaw

---

## 1. 今日速览

1. 项目今日处于**中低强度维护态**：24 小时内共 7 条 Issue/PR 事件（2 Issue + 5 PR），无新版本发布，属于典型的"清理存量、处理反馈"日，而非功能迭代日。
2. **PR 侧表现健康**：5 条 PR 更新中 4 条被关闭/合并，关闭/新开比约 4:1，合并队列净减 3 条，其中包含一批自 2026 年 3 月滞留至今的历史 PR，说明维护者正在做积压清理。
3. **Issue 侧呈净流入**：新增/活跃 2 条、关闭 0 条，Issue 积压 +2，且两条均为**用户可感知的质量问题**（Telegram 附件下载绕过代理、Web 端输入卡顿），非新功能诉求。
4. **良性信号**：Issue #3475（Web 输入卡顿）报告当天即由同一作者 @momomobinx 提交修复 PR #3476，形成"报告—修复"闭环，反映核心用户具备贡献能力。
5. **主要风险**：对外版本仍停留在 0.3.1（用户报告中的版本），今日关闭的修复（含 Claude Provider 关键修复）均未随版本发布，**主线与发行版差距持续扩大**；同时批量"聚合式关闭"历史 PR 的做法存在修复被静默丢弃的隐患。

> 综合健康度评估：**中上**。合并吞吐与响应速度良好，但发布节奏与历史 PR 的处置透明度是两项明显短板。

---

## 2. 版本发布

过去 24 小时**无新版本发布**（0 个），故本节省略。

⚠️ 但需提示：用户报告基于 **v0.3.1**，而今日关闭的 #238 等修复尚未进入任何发行版，建议维护者评估是否需要一次 patch release 以收口累积修复。

---

## 3. 项目进展

今日共 **4 条 PR 被关闭/合并**，另有 1 条待合并。

| PR | 状态 | 内容 | 推进价值 |
|---|---|---|---|
| [#238](https://github.com/sipeed/picoclaw/pull/238) `fix(claude): resolve empty tool name in Claude API requests` | CLOSED | 修复 Claude/Anthropic Provider 请求中 `ToolCall` 工具名恒为空的问题（代码读 `tc.Name`，实际存于 `Function.Name`），并兼容 `Arguments` 以 JSON 字符串存储的场景 | ⭐⭐⭐ **高**。直接消除 Anthropic 用户使用工具调用时的 400 Bad Request，属于核心可用性修复 |
| [#1546](https://github.com/sipeed/picoclaw/pull/1546) `fix: merge PR #1480 #1479 #1478 #1473 #1467` | CLOSED | 聚合 5 个历史 PR 的修复 | ⭐⭐ 中。队列瘦身明显（单条处置 5 个 PR），但**实际改动范围不可从元数据核验** |
| [#1555](https://github.com/sipeed/picoclaw/pull/1555) `fix: merge PR #1390 #1389 #1383 #1381` | CLOSED | 聚合 4 个历史 PR 的修复 | ⭐⭐ 同上 |
| [#1560](https://github.com/sipeed/picoclaw/pull/1560) `fix: merge PR #1312 #1311 #1308` | CLOSED | 聚合 3 个历史 PR 的修复 | ⭐⭐ 同上 |

**推进量化**：
- 单日处置 PR 4 条，关联被合并/关闭的子 PR 共 **12 个**（#1480/1479/1478/1473/1467/1390/1389/1383/1381/1312/1311/1308）。
- PR 队列本窗口净变化：**−3**（开 1、关 4）。
- 历史存量消化周期：这批 PR 创建于 **2026-03-14**，至关闭历时约 **8.5 个月**，说明审查瓶颈长期存在，今日属集中清账而非流程改善。

**待合并关注**：[#3476](https://github.com/sipeed/picoclaw/pull/3476) `fix(web): isolate chat draft updates from message rendering` — 将草稿状态下沉至 `ChatComposer`，避免每次输入触发历史消息重渲染与重复 Markdown 解析、语法高亮，是针对 #3475 的定向修复，**建议优先审查合并**。

---

## 4. 社区热点

今日整体讨论热度**偏低**：两条 Issue 各仅 1 条评论，PR 数据中评论数为 `undefined`（数据缺失），无高赞或高互动条目。按讨论量并列首位：

- 🔗 [#3477 Telegram channel: attachment download bypasses settings.proxy](https://github.com/sipeed/picoclaw/issues/3477) — 1 条评论
- 🔗 [#3475 Web 聊天界面输入明显卡顿](https://github.com/sipeed/picoclaw/issues/3475) — 1 条评论

**背后诉求分析**：
- #3477 反映的是**配置语义一致性**诉求：用户期望 `settings.proxy` 是"全局生效"的网络出口配置，但实现中仅 Bot API 客户端（telego）遵守该配置，附件下载走独立直连。这既是功能缺陷，也涉及**企业/受限网络下的隐私与合规预期**（用户可能假设所有流量均经代理）。
- #3475 反映的是**前端性能退化**诉求：长会话、且开启 reasoning/tool 输出可见时，输入抖动直接影响日常使用体验，属于高频路径上的体验损耗。

> 解读：今日社区无"功能争论"，热度集中在**质量与配置正确性**，说明项目已进入以稳定性与体验为主要矛盾阶段。

---

## 5. Bug 与稳定性

按严重程度排序：

### 🔴 高｜#3477 Telegram 附件下载绕过 proxy 设置
- **链接**：https://github.com/sipeed/picoclaw/issues/3477 ｜ 作者 @vervolk ｜ 状态 OPEN ｜ 评论 1
- **现象**：Telegram 频道下载附件（图片、文件）时使用直连，忽略 `settings.proxy`；仅 Bot API 客户端（telego）走代理。在只有经代理才能访问 `api.telegram.org` 的网络中，`getFile` 成功但文件下载挂起。
- **影响**：功能不可用（下载永久挂起）+ 配置失效 + 流量出口与用户预期不符，属于可能引发**意外流量泄露**的配置类缺陷。
- **Fix PR**：❌ 暂无。建议抽出 HTTP client 工厂，统一注入代理配置，避免各下载路径各自建 client。

### 🟡 中｜#3475 Web 聊天界面输入卡顿（v0.3.1 回归体验问题）
- **链接**：https://github.com/sipeed/picoclaw/issues/3475 ｜ 作者 @momomobinx ｜ 状态 OPEN ｜ 评论 1
- **现象**：在 Windows Chrome 客户端连接 Ubuntu 22.04 服务端（deepseek 模型、web 频道）时，输入显著卡顿；长会话且展示 reasoning/tool 输出时尤甚。
- **影响**：交互体验退化，不阻塞功能但影响留存。
- **Fix PR**：✅ 已有 [#3476](https://github.com/sipeed/picoclaw/pull/3476)（同作者当日提交），待合并。

### 稳定性小结
今日 **0 条崩溃/数据丢失级问题**，2 条均为可定位、可修复的质量缺陷，其中 50% 已在 24 小时内配套 fix PR，**修复响应速度是今日最正向的指标**。

---

## 6. 功能请求与路线图信号

今日**无显式功能请求（feature request）**，两条 Issue 均为缺陷报告。但可从缺陷推导出三项潜在路线图信号：

| 信号 | 依据 | 纳入下一版本的可能性 | 判断理由 |
|---|---|---|---|
| **统一网络出口/代理层**（所有 channel 与附件下载共享同一 HTTP client 与代理配置） | #3477 指出只有 telego 遵守代理 | 中高 | 改动面局部、语义明确，属"配置应然行为"，适合作为 patch/minor 收口；但需跨模块重构，可能排入 minor |
| **Web 前端渲染性能治理**（草稿态与消息渲染解耦、Markdown/高亮缓存） | #3475 + 已有 PR #3476 | **高** | 修复已成型，仅待审查，最快可进入下一版本 |
| **多 Provider 兼容性矩阵/回归测试**（OpenAI 与 Anthropic 数据结构差异） | #238 暴露 `Function.Name` 与 `tc.Name` 字段语义偏差、Arguments 序列化差异 | 中 | 属工程基建，通常不写入用户可见 changelog，但决定 Provider 稳定性 |

> 未见社区对"新能力"的呼声，**下一版本主题大概率是"稳定化 + 兼容性收口"而非新特性**。

---

## 7. 用户反馈摘要

从 Issue 正文与场景描述提炼：

**真实使用场景**
- 自托管、跨平台混合部署：服务端 Ubuntu 22.04，客户端 Windows + Chrome 浏览器访问 Web 频道（#3475）。
- 受限网络环境（需代理访问 Telegram API）的 Telegram 频道重度使用（#3477）。
- 国内模型（deepseek）与海外模型（Claude/Anthropic）混用。

**痛点**
1. **配置承诺与实际行为不一致** —— 用户已显式配置 `settings.proxy`，仍出现直连，这类"配置被静默忽略"最伤信任。
2. **长会话性能衰减** —— 会话越长、输出越丰富（reasoning/tool 可见）越卡，恰好命中重度用户路径，形成"越用越难用"的负反馈。
3. **诊断信息不足** —— #3477 描述为"下载挂起"，用户难以自行定位是代理、鉴权还是超时问题，建议补充下载路径的日志与错误码。

**满意/不满意**
- 满意：报告当日即有维护者/作者响应（各 1 条评论），#3475 作者同日提交修复，社区自愈能力可见。
- 不满意：Issue 模板存在摩擦——#3475 的 "Steps to Reproduce" 为空白（`1. 2. 3.`），说明模板必填约束不足，增加维护者复现成本。

---

## 8. 待处理积压

| 项目 | 状态 | 风险提示 |
|---|---|---|
| [#3477](https://github.com/sipeed/picoclaw/issues/3477) Telegram 附件绕过代理 | OPEN，无 fix PR | 已进入"新报告即积压"状态，涉及流量出口语义，建议 48 小时内给出结论或指派 owner |
| [#3476](https://github.com/sipeed/picoclaw/pull/3476) Web 草稿态隔离 | OPEN，待合并 | 修复已就绪但无审查者，拖延会直接延长 #3475 的用户痛点周期 |
| [#1546](https://github.com/sipeed/picoclaw/pull/1546) / [#1555](https://github.com/sipeed/picoclaw/pull/1555) / [#1560](https://github.com/sipeed/picoclaw/pull/1560) | 已 CLOSED，但**处置方式需复核** | 三条"聚合合并 PR"均以关闭收尾，其引用的 12 个子 PR（#1308–#1312、#1381–#1390、#1467–#1480）是否真正落地到主干**无法从元数据确认**。若为"关闭而不合并"，则存在修复被静默丢弃、贡献者体验受损的风险。**建议维护者公开说明处置结论，并在 changelog 中逐条对应。** |
| [#238](https://github.com/sipeed/picoclaw/pull/238) Claude Provider 修复 | CLOSED | 创建（2026-02-15）至关闭（2026-11-27）历时 **9.5 个月**，属典型长滞留关键修复。建议复盘审查 SLA，避免同类核心兼容性修复再次长期悬置 |

**维护者行动建议（按优先级）**
1. 合并 #3476，同时回复 #3475 确认修复将进入下一版本。
2. 为 #3477 指派 owner，明确"代理配置全局生效"的设计决策。
3. 复核 3 条聚合关闭 PR 的实际落地情况，补充 changelog 追溯。
4. 评估发布一次 patch 版本，收口 #238 等已合并修复，缩短"主干已修 / 发行版未修"的窗口。
5. 强化 Issue 模板校验（复现步骤必填），降低复现成本。

---

*数据说明：本报告基于给定 24 小时窗口的 GitHub 元数据生成；PR 评论数字段返回 `undefined`，未纳入活跃度计算。Issue 编号已达 #34xx，显示项目历史交互量较大，今日新增 2 条属相对低位水平。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 · 2026-11-28

> 数据窗口：2026-11-27 → 2026-11-28（UTC）｜数据源：GitHub Issues / Pull Requests

---

## 1. 今日速览

**高活跃、高产出，但稳定性风险集中暴露。** 过去 24 小时 Issues 更新 11 条（新开/活跃 8、关闭 3）、PR 更新 25 条（待合并 18、合并/关闭 7），无新版本发布，属于"高强度修复日"而非"发布日"。今日新增问题集中在 **Cron API 全面 500、Code Mode 子代理工具泄漏、QQ 通道重连失效、Creator 测试在 main 变红**四类严重缺陷，但其中 3 项已在一日内对应 fix PR（#8965 / #8957 / #8963），响应速度良好。同时，`video_memory` / `creator` 相关的一批小体积健壮性 PR（#8905–#8933）持续堆积，反映贡献者活跃但审阅带宽仍偏紧，**整体健康度：活跃度 A、稳定性 B-、审阅吞吐 C+**。

---

## 2. 版本发布

无新版本发布（Latest Releases：无）。主力版本仍为 `2.3.0.post1`，另有企业用户基于 `v2.2.2.post1` 基线开展上游整合讨论（见 #8959）。

---

## 3. 项目进展

今日以**已合并/关闭的修复**与**一日内闭环的 fix PR**为主，核心推进如下：

| 进展 | 说明 | 链接 |
|---|---|---|
| **Doom-Loop 检测修复闭环** | 长期"同参数工具调用从不中断"的 #8712 已关闭，对应 #8713（记录回复期间追加的每个工具调用，使 doom-loop gate 可触发）同步关闭。这是 agent 循环安全性的关键修复。 | [#8712](https://github.com/agentscope-ai/QwenPaw/issues/8712) · [#8713](https://github.com/agentscope-ai/QwenPaw/pull/8713) |
| **Console 聊天稳定性三连修** | #8951（导航/滚动/steer 时间戳）、#8953（历史分页与滚动稳定）、#8952（Relay 中断恢复与关闭）均已关闭，直接改善长会话与迁移会话的可用性。 | [#8951](https://github.com/agentscope-ai/QwenPaw/pull/8951) · [#8953](https://github.com/agentscope-ai/QwenPaw/pull/8953) · [#8952](https://github.com/agentscope-ai/QwenPaw/pull/8952) |
| **Cron API 500 一日出 fix** | #8960 报告 cron 三个端点全 500（`mam._workspaces` 笔误），当日即有 #8965 用 `get_agent("default")` 异步解析默认工作区，并兼容同步/异步 manager resolver。 | [#8960](https://github.com/agentscope-ai/QwenPaw/issues/8960) · [#8965](https://github.com/agentscope-ai/QwenPaw/pull/8965) |
| **QQ 通道自愈修复** | #8962 指出清理错误会永久终止重连 supervisor；#8963 改为清理错误后继续重连，属单通道最小化修复。 | [#8962](https://github.com/agentscope-ai/QwenPaw/issues/8962) · [#8963](https://github.com/agentscope-ai/QwenPaw/pull/8963) |
| **CI 红灯止血** | #8956 致 Creator App Tests 在 main 变红（#8785 引入共享恢复预算后，以对象身份判定放弃失效）；#8957 改用以标记异常停止循环。 | [#8956](https://github.com/agentscope-ai/QwenPaw/issues/8956) · [#8957](https://github.com/agentscope-ai/QwenPaw/pull/8957) |

**整体推进度评估：** 修复侧净前进明显（3 个 issue 关闭、7 个 PR 关闭），但 18 个待合并 PR 中多为 `size/S`–`size/XS` 的防御性小修，主版本功能面（如 #8719 base-path 部署、#7211 注入上下文持久化）仍卡在人工审阅，**功能交付节奏慢于修复节奏**。

---

## 4. 社区热点

1. **[#8845](https://github.com/agentscope-ai/QwenPaw/issues/8845) Console Markdown 表格溢出（评论 5、👍1）** — 讨论最活跃。表格超出消息气泡、溢出列表边界且无法横向滚动，溢出列"可见不可选"。典型前端渲染 + 容器 overflow 问题，影响所有在 Console 中阅读富文本回答的用户，诉求是"可读性优先"的渲染兜底。

2. **[#8956](https://github.com/agentscope-ai/QwenPaw/issues/8956) main 分支测试变红（评论 4）** — 高价值工程讨论。核心是"放弃语义靠对象身份判定"的脆弱设计，社区已给出更稳健的标记异常方案。反映项目对 CI 红灯的敏感度较高、协作修复链路顺畅。

3. **[#8962](https://github.com/agentscope-ai/QwenPaw/issues/8962) QQ 通道重连 supervisor 永久退出（评论 3）** — 通道可靠性问题，且作者明确把"完整自愈设计"与"最小修复 PR #8963"做了边界划分，体现务实的贡献方式。

4. **[#8959](https://github.com/agentscope-ai/QwenPaw/issues/8959) 企业版 Platform-Worker 上游整合建议（评论 2、👍1）** — 战略级讨论。企业用户基于 `v2.2.2.post1` 实现完整可运行的企业版，希望维护者评审"哪些适合上游、哪些保持独立扩展、是否需要通用扩展接口"。**背后诉求：扩展接口标准化与上游/下游边界治理**，是路线图层面的强信号。

5. **[#7211](https://github.com/agentscope-ai/QwenPaw/pull/7211) 防止注入上下文持久化（first-time-contributor，08-21 创建）** — 非今日新热点，但今日仍在更新，是**积压时间最长的高质量修复之一**（详见第 8 节）。

---

## 5. Bug 与稳定性

按严重程度排列（P0 > P1 > P2）：

| 级别 | 问题 | 状态 | Fix PR |
|---|---|---|---|
| **P0** | [#8960](https://github.com/agentscope-ai/QwenPaw/issues/8960) **Cron REST API 全部返回 500**（`GET/POST /crons/jobs`、`DELETE /crons/jobs/{id}`），定时任务功能完全不可用 | OPEN（11-27 报） | ✅ [#8965](https://github.com/agentscope-ai/QwenPaw/pull/8965) |
| **P0** | [#8954](https://github.com/agentscope-ai/QwenPaw/issues/8954) **Code Mode 子代理泄漏父级 `_execution_toolkit`**，子会话所有 `run_code` 报 `ToolNotFoundError`，代码模式子代理功能实质不可用 | OPEN | ❌ 暂无 |
| **P0** | [#8956](https://github.com/agentscope-ai/QwenPaw/issues/8956) **main 分支 Creator App Tests 变红**（共享恢复预算以对象身份判放弃失效），持续阻塞 CI | OPEN | ✅ [#8957](https://github.com/agentscope-ai/QwenPaw/pull/8957) |
| **P1** | [#8962](https://github.com/agentscope-ai/QwenPaw/issues/8962) **QQ 通道一次清理错误即永久停止重连**，worker 显示就绪但实际断连 | OPEN | ✅ [#8963](https://github.com/agentscope-ai/QwenPaw/pull/8963) |
| **P1** | [#8903](https://github.com/agentscope-ai/QwenPaw/issues/8903) **代码模式下 `run_tool_batch` 调用失败**（CodeModeToolkit 仅暴露 run_code，真实工具在 catalog 中） | OPEN | ❌ 暂无 |
| **P1** | [#8712](https://github.com/agentscope-ai/QwenPaw/issues/8712) **重复工具调用从不中断**（doom-loop gate 每次回复最多只记 1 次调用，实测同一 Bash 被批准 14 次） | CLOSED | ✅ [#8713](https://github.com/agentscope-ai/QwenPaw/pull/8713) |
| **P2** | [#8845](https://github.com/agentscope-ai/QwenPaw/issues/8845) Console 内 Markdown 表格溢出、无横向滚动，内容不可见 | OPEN | ❌ 暂无 |
| **P2** | [#8955](https://github.com/agentscope-ai/QwenPaw/issues/8955) 治理层内置规则无法配置/禁用，与 tool_guard 开关相互独立造成困惑 | OPEN | ❌ 暂无 |
| **P2** | [#8941](https://github.com/agentscope-ai/QwenPaw/issues/8941) 12 个插件安装测试在 Windows 失败（符号链接权限、包初始化超 5s 预算、venv launcher pid） | CLOSED | — |

**稳定性研判：** 今日 P0/P1 共 6 项，其中 3 项在 24 小时内获得 fix PR，**响应闭环率高**；但 **Code Mode 相关的 #8903 + #8954 形成"工具调用 + 子代理继承"双重缺陷且均无 fix PR**，是当前最需要维护者投入的区域。

---

## 6. 功能请求与路线图信号

| 需求 | 信号强度 | 是否可能进入下一版本 |
|---|---|---|
| **[#8959](https://github.com/agentscope-ai/QwenPaw/issues/8959) 通用扩展接口 / 企业版上游整合** — 企业用户已基于 `v2.2.2.post1` 建成可运行企业版，请求评审上游化路径、模块拆分与通用扩展接口补充 | ★★★★★（战略级） | **很可能**以 RFC / 分阶段 PR 形式纳入；短期先出接口评估，代码开放受内部流程约束 |
| **[#8955](https://github.com/agentscope-ai/QwenPaw/issues/8955) 治理层内置规则可配置/可禁用** — 与 tool_guard 双层拦截语义统一 | ★★★★ | **较可能**，属配置面统一问题，改动面小、诉求明确 |
| **[#8744](https://github.com/agentscope-ai/QwenPaw/issues/8744) Console 查看被压缩归档历史轮次**（已关闭）— 压缩后早期对话在 UI 上不可达，用户理解为"历史丢了" | ★★★ | 已关闭，**需确认是已实现还是转为后续需求**；该诉求对长会话产品体验关键 |
| **[#8719](https://github.com/agentscope-ai/QwenPaw/pull/8719) 运行时 base-path 部署**（`QWENPAW_BASE_PATH`，size/XXXL，Under Review）— 支持反向代理前缀下托管 Console 与 API | ★★★★ | **取决于审阅进度**；企业/私有化部署强需求，但体量大、审阅周期长 |
| **[#8958](https://github.com/agentscope-ai/QwenPaw/pull/8958) e2e 分页历史中提示-回复配对** | ★★（测试基础设施） | 属质量加固，预期随主分支合入 |

**路线图解读：** 本期最强信号来自 **#8959（扩展接口治理）** 与 **#8719（私有化部署）** 两条，均指向"QwenPaw 从单机助手走向可嵌入/可私有化平台"的演进方向；与之配套的 **#8955 治理层开关统一** 是低成本、高感知的体验补齐项。

---

## 7. 用户反馈摘要

- **企业/私有化场景正在真实落地：** #8959 用户已在实际项目部署企业版，关注点已从"能不能用"转向"如何贡献上游、如何拆分模块"，说明项目在生产环境具备可用性，但**缺少官方扩展契约**成为上游化的主要摩擦。
- **多通道可靠性是痛点：** #8962（QQ 重连永久退出）与 #8955（微信 iLink 插件 + 治理规则）显示通道插件在异常恢复与安全策略上仍不够健壮；用户对"显示就绪但实际断连"这类静默故障容忍度低。
- **代码模式（Code Mode）体验不完整：** #8903、#8954 连续暴露 `run_tool_batch` 失败、子代理工具上下文泄漏，**代码模式用户在批量工具调用与子代理委派两条主路径上均遇阻**，是当前最集中的不满来源。
- **Windows 开发者体验欠佳：** #8941 指出 12 个测试在原生 Windows 检出即失败（符号链接权限、5s 预算、venv launcher pid），影响新贡献者本地开发信心（虽已关闭）。
- **长会话"历史丢失"焦虑：** #8744 反映上下文压缩后早期轮次在 UI 完全不可达，用户会直接判定数据丢失——**这是信任型体验问题**，需明确的产品答复。
- **小细节但高频：** #8961（单波浪线被误解析为删除线，导致 `600~1500 t/s` 被划掉）、#8845（表格溢出）这类渲染细节，是日常使用中"小但扎眼"的负面反馈来源。

---

## 8. 待处理积压

| 条目 | 积压时长 | 风险 |
|---|---|---|
| **[#7211](https://github.com/agentscope-ai/QwenPaw/pull/7211) fix(runtime): 防止注入上下文持久化**（first-time-contributor、size/L、`ready-for-human-review`） | **约 3 个月**（08-21 创建，11-28 仍在更新） | ⚠️ **高**。修复的是公共插件钩子 `inject_context()` 把系统提醒写入持久会话存储的语义错误，影响所有插件作者；长期挂起会挫伤首次贡献者积极性，并让该 bug 持续面世。 |
| **[#8719](https://github.com/agentscope-ai/QwenPaw/pull/8719) feat(console): 运行时 base-path 部署**（size/XXXL、Under Review） | 约 2 周 | ⚠️ 中高。私有化/反代部署刚需，体量大需拆分审阅策略，否则可能长期悬空。 |
| **[#8905](https://github.com/agentscope-ai/QwenPaw/pull/8905)–[#8933](https://github.com/agentscope-ai/QwenPaw/pull/8933) `creator`/`video_memory` 系列 9 个 XS–S 修复**（同一贡献者批量提交） | 2–3 天 | 中。单点改动小但数量集中，**建议打包批次审阅**，避免零散 PR 长期占用列表。 |
| **[#8954](https://github.com/agentscope-ai/QwenPaw/issues/8954) / [#8903](https://github.com/agentscope-ai/QwenPaw/issues/8903) Code Mode 双重缺陷** | 1–3 天（但属 P0/P1 且无 fix） | ⚠️ **高**。功能级不可用且 24h 内无 fix PR，建议优先指派负责人。 |

**给维护者的建议：**
1. 优先处理 **#7211**——三个月的 `ready-for-human-review` 是当前最伤社区信任的积压项，建议明确给出"合并 / 需修改 / 暂缓"的结论性回复。
2. 对 **Code Mode 系列（#8903、#8954）** 建立单一追踪 issue，避免缺陷分散、修复重复。
3. 对 **#8719** 给出拆分审阅计划（如先合基础路径注入、再合静态资源改写），降低 XXXL PR 的合入门槛。
4. 明确 **#8744（压缩历史查看）** 的关闭原因与后续计划，回应用户的"历史丢失"信任焦虑。

---

*报告生成时间：2026-11-28｜数据口径：过去 24 小时 GitHub 活动｜PR 评论数在原始数据中部分未返回，热点排序以 Issues 评论/反应为主并结合 PR 更新频次*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-28

> 数据窗口：2026-11-27 → 2026-11-28（UTC）｜数据源：NousResearch/hermes-agent

---

## 1. 今日速览

- 项目处于**高活跃、高流入**状态：24 小时内 Issues 更新 **282** 条（新开/活跃 264，关闭 18），PR 更新 **500** 条（待合并 406，合并/关闭 94），并发布了补丁版 **v0.23.5**（汇总约 338 个 PR）。
- 整体节奏是"**合并速度快、提交速度更快**"：PR 关闭率约 18.8%，Issue 关闭率约 6.4%，待合并 PR 池已达 406 条，积压压力显著。
- 稳定性焦点集中在**Kanban 工作进程崩溃/卡死**、**网关会话状态与压缩**、**SQLite 锁竞争**三条主线，其中 3 个 P1 问题仍在讨论中。
- 生态侧信号明确：**WeCom / DingTalk / Weixin / Feishu 等平台集成正从 core 迁移到 Hermes Labs 插件**，core 在持续"瘦身"。
- 桌面端与服务端正在并行大改：桌面工作区重设计（#152168）、可插拔 SessionDB、后台压缩等 RFC 同时在推进。

---

## 2. 版本发布

### v0.23.5（2026-11-27）— 补丁发布

**性质**：Patch release，**汇总自 v0.23.4 以来合并的约 338 个 PR**，是一次将大量增量收敛为稳定基线的"打包式"补丁版。

**覆盖渠道**：
- GitHub Release（CLI 与安装器）
- Microsoft Store 应用
- Docker 镜像
- Hermes Cloud

**破坏性变更 / 迁移注意**：
- 本次 release notes **未单独列出破坏性变更**，属滚动汇总型补丁；完整的、逐条精选的变更说明将随 **v0.24.0** 一起发布。
- 建议升级路径：从 v0.23.4 直接升级即可；如果使用 Docker/Cloud，建议按渠道 tag 对齐 v0.23.5。
- ⚠️ 因为本版囊括约 338 个 PR（含插件化迁移），**行为层面可能存在隐式变更**，特别是 WeCom/DingTalk/Weixin 渠道配置（见第 3 节）。建议在灰度环境先验证多 profile / 多网关场景。

🔗 https://github.com/NousResearch/hermes-agent/releases

---

## 3. 项目进展

### 已合并 / 关闭（今日 94 条 PR、18 条 Issue，以下为可见代表）

| 类型 | 条目 | 说明 |
|---|---|---|
| ✅ 已关闭 Issue | [#7335](https://github.com/NousResearch/hermes-agent/issues/7335) | "超过 1000 个 open issues"的元讨论终于关闭，说明社区层面的 issue 治理告一段落 |
| ✅ 已关闭 Issue | [#79357](https://github.com/NousResearch/hermes-agent/issues/79357) | **idle_compact_after_seconds 在 gateway 模式永不上火**的核心 bug 关闭，压缩链路一致性前进一大步 |
| ✅ 已关闭 Issue | [#155638](https://github.com/NousResearch/hermes-agent/issues/155638) | Matrix 回执恢复无限循环（UnscopedSecretError）已修 |
| ✅ 已关闭 PR | [#160971](https://github.com/NousResearch/hermes-agent/pull/160971) | 单文件 1,982 行的 plugin host 测试拆分为三个聚焦套件，降低插件测试维护成本 |

### 进行中的主线（待合并 406 条中的高优先级）

1. **平台插件化迁移（core 减重）** — [#159649](https://github.com/NousResearch/hermes-agent/pull/159649)（WeCom）、[#159638](https://github.com/NousResearch/hermes-agent/pull/159638)（DingTalk）、[#159644](https://github.com/NousResearch/hermes-agent/pull/159644)（Weixin 官方插件、默认安装）。三条 PR 已迭代至 Round 18，均修复了"仅有 .env、无 config.yaml 的新 home 首次启动就下载 Labs 代码"的问题，说明迁移已进入收尾打磨期。
2. **桌面重设计** — [#152168](https://github.com/NousResearch/hermes-agent/pull/152168) 引入新的 Desktop/Web 工作区作为默认 shell，并保留一键恢复经典界面的开关，属于本周期 UI 最大变动。
3. **会话/依赖稳定性修复** — [#157087](https://github.com/NousResearch/hermes-agent/pull/157087) 修复"同时打开多个聊天时 provider 插件消失 → Unknown provider"的回归；[#160942](https://github.com/NousResearch/hermes-agent/pull/160942) 修复畸形 `gateway_state.json` 阻断 Docker 启动。
4. **安全加固** — [#160988](https://github.com/NousResearch/hermes-agent/pull/160988) 修复 `/api/config` 与 `/api/config/raw` **直接回显 dashboard 登录密钥**（basic_auth、oauth client_secret）的高危泄露问题，并补齐多词环境变量脱敏。

**总体推进评价**：本周期的推进以"**收敛 338 个历史 PR + 平台插件化 + 桌面重设计**"为主，功能面大、风险面也大，v0.24.0 将承载完整的变更叙事。

---

## 4. 社区热点

### 讨论最活跃的 Issues（按评论数）

| # | Issue | 评论 | 👍 | 核心诉求 |
|---|---|---|---|---|
| 1 | [#143379](https://github.com/NousResearch/hermes-agent/issues/143379) RFC: DOC-CHAIN SUBSTRATE'S NETWORK | 72 | 0 | 提出"持久记录应在会话压缩中保留出处，agent 再读而非让用户重复"的文档链底座设计，涉及 compression、memory、security 多组件，是当前讨论最深的设计题 |
| 2 | [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) P1 Kanban workers crash | 32 | 0 | 网关卡顿时多 Kanban worker 同时 exit 1，**运行中的工作丢失**，生产可用性级别的痛 |
| 3 | [#23717](https://github.com/NousResearch/hermes-agent/issues/23717) RFC: Pluggable SessionDB | 26 | **11** | 热更新时共享 `state.db` 触发"Hot-Update Death Spiral"，要求 PostgreSQL/MySQL 等后端 |
| 4 | [#7335](https://github.com/NousResearch/hermes-agent/issues/7335) 超过 1000 open issues | 22 | 0 | 社区治理元讨论（已关闭） |

### 点赞最多（情绪最强）的 Issue

- [#12238](https://github.com/NousResearch/hermes-agent/issues/12238) 内置自动备份与版本控制 `~/.hermes/` — **29 👍**，用户对"agent 学习状态丢失/不可追溯"的焦虑最高。
- [#48375](https://github.com/NousResearch/hermes-agent/issues/48375) 桌面聊天输入框拼写检查 — **13 👍**，低频但明确、易实现的体验缺口。
- [#23717](https://github.com/NousResearch/hermes-agent/issues/23717) 可插拔 SessionDB — **11 👍**。

### 讨论最活跃的 PR

- [#159649](https://github.com/NousResearch/hermes-agent/pull/159649) / [#159638](https://github.com/NousResearch/hermes-agent/pull/159638) / [#159644](https://github.com/NousResearch/hermes-agent/pull/159644) — 平台插件化三件套，Round 18，维护者亲自推。
- [#152168](https://github.com/NousResearch/hermes-agent/pull/152168) — 桌面重设计，影响面最大。

> **诉求分析**：社区的深层关注点已从"缺功能"转向 **"数据可信、状态不丢、可运维"**——持久记录（#143379）、SessionDB 可插拔（#23717）、自动备份（#12238）、Kanban 工作不丢（#145022）都指向同一件事：**把 Hermes 当作长期运行的 agent 基础设施来用，而不是一次性会话工具**。

---

## 5. Bug 与稳定性

按严重程度排列（结合今日可见数据）：

### 🔴 P1（阻塞/丢数据）

| Issue | 现象 | 是否有 fix PR |
|---|---|---|
| [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) | 网关卡顿 → 多 Kanban worker 同时崩溃，WIP 丢失；一次 stall 杀掉 4 个 worker | 未见直接关联 PR；[#160984](https://github.com/NousResearch/hermes-agent/pull/160984) 修复了"无 pid 认领 + claimer 消失"的相邻分支 |
| [#135487](https://github.com/NousResearch/hermes-agent/issues/135487) | 重启安全 cron worker 在 `adopt_claimed_execution()` 遇 `database is locked`，无重试，occurrence 丢失 | 未见直接 fix PR |
| [#145215](https://github.com/NousResearch/hermes-agent/issues/145215) | 转发提示时 resume snapshot 超 1 MiB（websocket max_size）导致**用户消息彻底丢失** | 未见 |

### 🟠 P2（功能受损/高危环境）

- **Windows 上的 Kanban 大面积卡死**（同一天多条，呈现环境系统性风险）：
  - [#146440](https://github.com/NousResearch/hermes-agent/issues/146440)：git 子进程继承 stdin 控制管道 + 插件懒加载 numpy 死锁
  - [#145156](https://github.com/NousResearch/hermes-agent/issues/145156)：`holographic` memory provider 下 import numpy 永久挂起
  - [#146955](https://github.com/NousResearch/hermes-agent/issues/146955)：worker 已准入绑定但 prompt 从未送达，read_frame 空转至超时
- **网关/会话状态**：
  - [#156978](https://github.com/NousResearch/hermes-agent/issues/156978)：全量路由重写在 GIL 争用下持 `state.db` 写锁 **20–35 秒**
  - [#131848](https://github.com/NousResearch/hermes-agent/issues/131848)：桌面聊天约 1/5 概率重复上一轮对话（temp-id → server-id 竞态）
  - [#149979](https://github.com/NousResearch/hermes-agent/issues/149979)：远程网关下 Bot Chat 媒体下载报 "Session not found"
- **内存/记忆正确性**：[#109215](https://github.com/NousResearch/hermes-agent/issues/109215) 已失效提案被入队，`/memory approve all` 反复失败。
- **交付链路**：[#134092](https://github.com/NousResearch/hermes-agent/issues/134092) cron 长期停在 `delivery_queued`；[#78975](https://github.com/NousResearch/hermes-agent/issues/78975) Feishu cron 因 `receive_id_type="thread_id"` 100% 失败。

### 🟡 P3（体验类，已有修复在途）

- [#160972](https://github.com/NousResearch/hermes-agent/pull/160972) 修复无序输出的 shell hook 无限吃内存（曾使进程涨到 53.7 GB），超过 1 MiB 即截断 —— **已有 PR**。
- [#160942](https://github.com/NousResearch/hermes-agent/pull/160942) 畸形 `gateway_state.json` 不再阻断 boot —— **已有 PR**。

**健康度判断**：P1 均无明确 fix PR，是本周期最大风险点；Windows 环境相关 bug 在同一窗口集中爆发，建议维护者优先交付一个针对性修复包。

---

## 6. 功能请求与路线图信号

| 功能 | Issue | 信号强度 | 是否可能在 v0.24.0 落地 |
|---|---|---|---|
| **可插拔 SessionDB（PG/MySQL）** | [#23717](https://github.com/NousResearch/hermes-agent/issues/23717)（26 评论 / 11👍 / needs-decision） | ⭐⭐⭐⭐ | 中高：与 #156978 的锁竞争、#143379 的持久记录形成合力，架构方向已明确 |
| **自动备份与版本控制（~/.hermes/）** | [#12238](https://github.com/NousResearch/hermes-agent/issues/12238)（29👍，2026-04 提出） | ⭐⭐⭐⭐ | 中：呼声最高但长期未动，可能拆成 CLI 子命令先行 |
| **轮次后后台压缩** | [#117886](https://github.com/NousResearch/hermes-agent/issues/117886) | ⭐⭐⭐ | 高：与已关闭的 #79357 同属压缩重构，语义一致 |
| **按频道空闲时后台压缩** | [#97390](https://github.com/NousResearch/hermes-agent/issues/97390) | ⭐⭐⭐ | 中高：与上条同源 |
| **Per-Chat 记忆隔离（Scoped Memory）** | [#28279](https://github.com/NousResearch/hermes-agent/issues/28279) | ⭐⭐⭐ | 中：隐私诉求明确，但牵涉全局记忆架构 |
| **桌面聊天输入框拼写检查** | [#48375](https://github.com/NousResearch/hermes-agent/issues/48375)（13👍） | ⭐⭐ | 高（工作量小）：与 #152168 桌面重设计可一并纳入 |
| **Bot Mode 群活动实时转录** | [#91813](https://github.com/NousResearch/hermes-agent/issues/91813) | ⭐⭐ | 中 |

**路线图判断**：下一版大概率沿**"压缩重构 + 会话存储可插拔 + 桌面新壳"** 三轴推进；平台插件化已完成收尾，进入"默认安装 + 自动迁移"阶段。安全类修复（#160988）通常直接进补丁。

---

## 7. 用户反馈摘要

**真实痛点**

1. **长会话与压缩**：用户最不满的不是"压缩慢"，而是**压缩时机错位**——#79357（idle 压缩永不上火）、#117886（压缩发生在轮内、把成本算进用户等待）、#97390（空闲时也在涨上下文）共同勾勒出"消息发出去先等摘要"的体验。
2. **数据丢失焦虑**：#12238（29👍）、#145022（WIP 丢失）、#145215（消息丢失）反复出现，说明用户把 Hermes 当"长期 agent 资产"经营。**这是当前最强的产品情绪信号。**
3. **多 profile / 多网关复杂度**：#146035（bot-relay mailbox root-ambiguous）、#149979（远程网关 Session not found）、#146955（多 profile 下 Windows 全挂）显示多机多 profile 部署是"能用但脆弱"的状态。
4. **Windows 是洼地**：#146440 / #145156 / #146955 同窗口集中爆发，Windows 用户的实际体验显著落后于 Linux/macOS。

**使用场景**

- 多 agent 协作（Bot Mode / Kanban 群组）→ 对可观测性（#91813）、可恢复性（#145022）要求高。
- 本地模型 + 自建服务器（#156978 的 20–35 秒锁、#158660 的推理调优 skill）→ 用户群在往"自托管重负载"迁移。
- 企业 IM 集成（Feishu / WeCom / DingTalk / Weixin / Matrix）→ 交付可靠性（#78975、#134092、#155638）是硬门槛。

**满意点**

- 技能自改进（#136931 虽指出质量问题，但承认"best features"）。
- 插件体系（#93434、#160939、#160943、#160946、#160947 大量社区目录 PR）。
- v0.23.x 的稳定收敛节奏。

**不满意点**

- Windows 稳定性、多机部署一致性、压缩透明性、数据可恢复性。

---

## 8. 待处理积压

> 今日 **406 条 PR 待合并**，而 24 小时仅关 94 条 —— 长期未响应项值得维护者排期。

### 长期未响应的 Issue

| Issue | 创建至今 | 状态 | 说明 |
|---|---|---|---|
| [#23717](https://github.com/NousResearch/hermes-agent/issues/23717) 可插拔 SessionDB | ~6.5 个月 | needs-decision | 与热更新死锁强相关，社区期待明确结论 |
| [#28279](https://github.com/NousResearch/hermes-agent/issues/28279) Scoped Memory | ~6 个月 | needs-decision | 多租户隐私的核心诉求 |
| [#46771](https://github.com/NousResearch/hermes-agent/issues/46771) Qwen CLI 认证不兼容 | ~5.5 个月 | cause/upstream | 第三方 provider 集成长期悬挂 |
| [#48375](https://github.com/NousResearch/hermes-agent/issues/48375) 桌面拼写检查 | ~5.5 个月 | P3 | 13👍，实现成本低，值得"顺手关闭" |
| [#12238](https://github.com/NousResearch/hermes-agent/issues/12238) 自动备份 | ~7.5 个月 | 高赞未动 | 社区情绪最高但无里程碑 |
| [#97390](https://github.com/NousResearch/hermes-agent/issues/97390) / [#117886](https://github.com/NousResearch/hermes-agent/issues/117886) 后台压缩 | ~3 个月 | needs-decision | 与压缩重构同源，建议合并为一个设计文档 |

### 长期挂起的 PR

- [#93434](https://github.com/NousResearch/hermes-agent/pull/93434)（2026-08-24，插件 system prompt 预算可配置）— 已挂 3 个月，sweeper:risk-compatibility。
- [#47863](https://github.com/NousResearch/hermes-agent/pull/47863)（2026-06-17，跨平台审批委派）— 已挂 5.5 个月，含 security-boundary 风险。

### 风险提示

- **Windows Kanban 系列（#146440 / #145156 / #146955）无 fix PR**，若持续累积将影响 v0.24.0 的稳定性口碑。
- **406 条待合并 PR 池**中不少为插件目录更新（如 #160943 / #160946 / #160947），建议批量处理以降低审阅噪声。
- 安全修复 #160988 涉及 dashboard 密钥回显，**建议优先合入补丁而不是等 v0.24.0**。

---

### 维护者行动建议（TL;DR）

1. 🔥 优先排期 **P1：Kanban worker 崩溃 / 消息丢失** 三件套（#145022 / #145215 / #135487）。
2. 🐞 集中交付一个 **Windows Kanban 修复包**（#146440 / #145156 / #146955）。
3. 🔐 将 **#160988 dashboard 密钥泄露修复** 提前进入补丁通道。
4. 📦 对 **插件目录类 PR** 批量合并，压缩 406 待合并池。
5. 🗺️ 把 **#23717 / #117886 / #97390 / #143379** 收敛为一份"会话存储与压缩"统合设计，避免 RFC 分散。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期：2026-11-28** | 数据窗口：过去 24 小时 | 报告人：AI 开源项目分析

---

## 一、今日速览

- **整体活跃度：高位运行。** 过去 24 小时 Issues 更新 16 条（新开/活跃 8、关闭 8），PR 更新 75 条（待合并 45、已合并/关闭 30），Issues 关闭率达到 **50%**，PR 流转率达到 **40%**，说明维护与评审节奏健康。
- **节奏特征：合并端与提交端双旺。** 今日 30 条 PR 成功合并/关闭，叠加 4 条长周期 PR（最早可追溯至 10-08）完成闭环，积压清理成效明显；但待合并数仍高达 45 条，评审队列存在压力。
- **核心方向：** 本日工作集中在 **MCP 生态完善**（服务器配置表单、工具命名空间隔离、结构化结果与重连自愈）、**ChatUI 交互打磨**（集中 5 条体验类 PR）、以及 **Provider/适配器健壮性**（Gemini 工具配对、OneBot 语音帧、Telegram 消息切分）。
- **风险信号：** 无新版本发布；由 8 月遗留的 Gemini `functionResponse` 配对问题（#9760 / #9876）今日正式关闭，属于长期存量 Bug 收口。
- **健康度评价：良好偏强。** 关闭率高、核心维护者（@Soulter）亲自推进 MCP 主线，社区贡献者（@wcqqq1214、@liquidtoy001）持续提交成批修复；主要压力点在 45 条待合并 PR 的评审带宽。

---

## 二、版本发布

**无。** 过去 24 小时未发布新版本（最新 Releases 为空），本日进展均以 PR 形式沉淀，预计将在下一次常规版本中随车发布。

---

## 三、项目进展（今日已合并/关闭的重要 PR）

> 今日共 30 条 PR 完成合并/关闭，以下为公开可见信息中代表性最强的 4 条（其余为未进入 Top20 展示列表的合并项）。

| PR | 内容 | 意义 |
|---|---|---|
| [#11264](https://github.com/AstrBotDevs/AstrBot/pull/11264) `fix: recover MCP tool calls after a failed reconnect` | MCP 重连失败后丢弃半初始化会话，并复用替换会话，避免后续工具调用拿到不可用 session | **MCP 稳定性关键补强**，解决"一次重连失败→后续调用连环失效"的雪崩问题 |
| [#11338](https://github.com/AstrBotDevs/AstrBot/pull/11338) `fix: preserve spoilers when splitting long Telegram messages` | 先渲染 Markdown 再切分，按 UTF-16 重算实体偏移，保留 spoiler 实体 | **安全相关修复**：避免长消息切分把 `\|\|` 分隔符拆到不同消息而泄露隐藏文本 |
| [#11396](https://github.com/AstrBotDevs/AstrBot/pull/11396) `fix(dashboard): restore sticky header background on plugin detail page` | 修正 v4.29.0 后 `.page-content` 滚动容器导致 `scrollTop` 永远为 0、吸顶头部背景丢失 | **前端回归修复**：v4.29.0 引入的可用性回退问题闭环 |
| [#10458](https://github.com/AstrBotDevs/AstrBot/pull/10458) `fix(webchat): preserve reasoning in non-streaming replies` | 非流式回复改为通过既有 reasoning 消息类型单独下发思维链，不再混入正文 | **质量修复**：解决以普通文本展示思考过程导致的展示/存档污染，跨月 PR 落地 |

**项目向前推进度评估：** 今日合并侧内容以**修复类为主（3/4 为 fix）**，无破坏性变更，属于"夯实基础"型迭代；配合下方待合并队列，整体处于**功能蓄力、质量收口**的阶段。

---

## 四、社区热点（评论/点赞最多）

| 排名 | Issue/PR | 数据 | 链接 | 背后诉求 |
|---|---|---|---|---|
| 1 | **#10232** Telegram 回复机器人消息时 `sender_id` 与 `self_id` 不一致，引用唤醒失效 | 评论 **5**，👍 0，**仍 OPEN** | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10232) | **核心交互链路断裂**：通用引用唤醒被 Telegram 数字 ID 与用户名双轨制破坏，非文本消息彻底失效，是跨平台一致性设计的典型痛点 |
| 2 | **#10926** 出站语音转码 WAV 导致 base64 超 OneBot 帧上限（1009 断连） | 评论 **4**，已 CLOSED | [链接](https://github.com/AstrBotDevs/AstrBot/issues/10926) | **长音频/音乐点播场景不可用**：MP3 URL 转 WAV 体积膨胀数十倍，触发 WebSocket 帧上限，需协议层分片或编码优化 |
| 3 | **#11377** 移除 QQ 官方适配器「主动消息使用 Markdown」配置项 | 评论 **3**，已 CLOSED | [链接](https://github.com/AstrBotDevs/AstrBot/issues/11377) | **配置项技术债清理**：灰度期开关已失效，且造成"主动消息/普通回复"策略认知不一致（#10832 的诱因），用户主动要求删除 |
| 4 | **#11437** 插件页面中待更新的插件置顶 | 👍 **1**，0 评论 | [链接](https://github.com/AstrBotDevs/AstrBot/issues/11437) | **插件治理界面诉求**：与 #11444 同作者同日提出，形成"更新前看 changelog + 待更新置顶"的完整插件更新 UX 组合拳 |
| 5 | **#11434** 为不同地区和语言的用户提供不同的 bot 语言提示 | 👍 **1**，已 CLOSED | [链接](https://github.com/AstrBotDevs/AstrBot/issues/11434) | **国际化缺失**：`reset`/`help` 等指令回复全英文，中文用户感知明显退化（"很久以前是有中文的"），反映本地化未随功能迭代同步 |

> **总结：** 今日社区最集中的呼声是**跨平台与国际化的一致性**——Telegram 引用语义、OneBot 帧限制、指令语言本地化三处均属于"功能具备但边界场景失配"。

---

## 五、Bug 与稳定性

### 🔴 严重（影响核心交互 / 数据安全）

**1. [#10232](https://github.com/AstrBotDevs/AstrBot/issues/10232) — Telegram 引用唤醒失效（OPEN，无 fix PR）**
- 适配器将 Telegram 数字 ID 写入 `sender_id`，而 `message.self_id` 使用机器人用户名，唤醒判定必然不匹配。
- 现有兼容路径仅为文本消息合成 `/@bot_username`，**非文本消息或移除唤醒前缀后稳定复现**。
- **影响范围**：所有 Telegram 群聊的引用唤醒场景；属于 #1602 / #1810 确立的通用机制的跨平台回归。
- **风险判断**：⏳ 已挂起约 2 个月（创建 2026-09-25），是今日最需关注的一条。

### 🟠 中等（功能错误 / 资源异常）

**2. [#11430](https://github.com/AstrBotDevs/AstrBot/issues/11430) — OneBot v11 私聊文件下载回显被误判为用户消息（OPEN，无 fix PR）**
- 用户点击下载机器人刚发送的文件，协议端推送 `type: 'file'` 的消息事件，AstrBot 误判为用户新输入，甚至被 `follow_up` 捕获进当前 Agent Run。
- **后果**：模型重复读取自己发出的文件，触发重复回复乃至递归风险。

**3. [#11432](https://github.com/AstrBotDevs/AstrBot/issues/11432) — MCP 纯结构化结果到达模型时变为空工具消息（OPEN，已有 fix PR）**
- 当 `content=[]` 且 `structuredContent={"total": 3}` 时，模型收到 `The tool returned no content.`，工具事件本身却含对象。
- ✅ **已有修复**：[#11433](https://github.com/AstrBotDevs/AstrBot/pull/11433) 将结构化结果序列化为 JSON 走既有通道。

**4. [#11412](https://github.com/AstrBotDevs/AstrBot/issues/11412) — Grep 工具 `result_limit` 在无边界收集后才生效，内存放大（OPEN，无 fix PR）**
- 仅需 10 组结果也可能为整棵目录树分配内存，大仓库场景下代价显著。
- **建议**：将 `result_limit` 下推为搜索阶段的上限参数。

**5. [#11405](https://github.com/AstrBotDevs/AstrBot/issues/11405) — `mark_as_temp()` 内容在 `add_message_pair()` 后回归历史（OPEN，无 fix PR）**
- 使用自定义 Agent SDK 构建场景（代数辅导示例）中，临时工作纸上下文在下轮被重新注入。
- **性质**：属于会话状态管理语义缺陷，影响多轮上下文正确性。

### 🟢 已闭环（今日关闭）

- **#9876 / #9760** Gemini Provider 以 `tool_call_id` 充当 `functionResponse.name` → 函数调用历史配对失败（HTTP 400）。两条 8 月提出的存量 Bug 今日关闭，**标志着 Gemini 工具调用兼容性修复收口**。
- **#10926** OneBot 语音帧超限断连（见社区热点）。
- **#11244** 本地工具 list 参数被消耗后擦除动作记录与下轮单号引用 → 已由 #11162 修复关闭；另有余量加固 PR [#11308](https://github.com/AstrBotDevs/AstrBot/pull/11308) 在队列中（工具执行参数与调用记录状态隔离）。
- **#11423** 「用户识别」内联前缀两处行为问题（额外唤醒前缀导致识别失效 / 语义变化）——由 PR #11393 引入，今日关闭。

---

## 六、功能请求与路线图信号

### 🌟 高概率纳入近期版本

| 需求 | 判断依据 | 链接 |
|---|---|---|
| **OpenAI TTS 模板默认模型迁移** | 标记 `open-for-contribution`，`tts-1`/`tts-1-hd`/`gpt-4o-mini-tts` 将于 **2027-01-06 下线**，硬截止时间驱动，`default.py:1778` 改动量小 | [#11390](https://github.com/AstrBotDevs/AstrBot/issues/11390) |
| **插件更新 UX 组合：changelog 预览 + 待更新置顶** | 同作者 @XTsat 同日连发两单（#11437 / #11444），诉求互补、实现面集中在插件管理页，与 #11337 一脉相承，适合打包为一个 feature 分支 | [#11444](https://github.com/AstrBotDevs/AstrBot/issues/11444) · [#11437](https://github.com/AstrBotDevs/AstrBot/issues/11437) |
| **MCP 服务器配置表单化 + 工具命名空间隔离** | 核心维护者 @Soulter 亲自提交 [#11408](https://github.com/AstrBotDevs/AstrBot/pull/11408)，支持 stdio 与 HTTP/SSE（None/Bearer Token），解决不同 MCP Server 同名函数冲突 | [#11408](https://github.com/AstrBotDevs/AstrBot/pull/11408) |
| **结构化 MCP 结果上下文保留** | #11432 / #11433 已成对出现，评审路径清晰 | [#11433](https://github.com/AstrBotDevs/AstrBot/pull/11433) |

### 🔍 观望 / 已关闭

- **[#11434](https://github.com/AstrBotDevs/AstrBot/issues/11434) 指令回复语言本地化** — 创建次日即关闭，推测与 i18n 架构规划或既有方案冲突；但"中文用户感知退化"是真问题，值得以更聚焦的 Issue 重提。
- **[#11402](https://github.com/AstrBotDevs/AstrBot/issues/11402) 移动端远程管理客户端** — 用户 @Wings-030 自研 Flutter 应用（内置 SSH 隧道、免公网暴露 WebUI），已发布 v0.1.0。属于**生态外延信号**，可考虑列入官方"社区工具"清单。
- **[#11377](https://github.com/AstrBotDevs/AstrBot/issues/11377) 移除 QQ 官方适配器 Markdown 开关** — 已关闭，属配置清理型变更，**建议在 release notes 中标注为配置项移除**，避免用户升级后疑惑。

---

## 七、用户反馈摘要

**痛点一：跨平台语义不一致带来的"看起来能用、实际不能用"。**
> "文本消息目前还有一条合成 `/@bot_username` 的兼容路径，所以部分纯文本场景看起来可以工作；非文本消息或移除 `/` 唤醒前缀后，问题会稳定暴露。" — #10232
> 反映用户对**兼容性兜底路径掩盖真实缺陷**的不满，排查成本高。

**痛点二：Agent 上下文管理的"记忆泄漏"。**
> "The assistant loses an order's reference even though the order was successfully saved." — #11244
> "Content marked with `.mark_as_temp()` is included again in restored user history after `add_message_pair()`." — #11405
> 两位不同作者在**同一周**报告上下文状态问题，说明 Agent SDK 会话状态机是当前用户信任的薄弱环节。

**痛点三：插件生态运维成本偏高。**
> "全部更新插件不会显示更新日志，而有些插件想要知道具体多了什么新功能，有些插件又不需要。" — #11437
> 用户期望的是**细粒度、可控的更新决策**，而非"全量更新"的粗放模式。

**痛点四：国际化体验落差。**
> "输入 reset 和 help 之类的指令时，目前 BOT 回复的全都是英文，我记得很久以前是有中文的。" — #11434
> 典型的**功能迭代中本地化被遗漏**的体感落差。

**满意侧反馈（隐含信号）：**
- #11402 用户主动为 AstrBot 开发完整移动端管理客户端并内置 SSH 隧道方案，说明**产品形态具备足够的自部署吸引力**，能激发社区自建工具体系。

---

## 八、待处理积压（维护者关注清单）

| 优先级 | 条目 | 停留时长 | 状态 | 提醒 |
|---|---|---|---|---|
| 🔴 **P0** | [#10232](https://github.com/AstrBotDevs/AstrBot/issues/10232) Telegram 引用唤醒 `sender_id`/`self_id` 语义不一致 | **约 2 个月**（2026-09-25 起） | OPEN，5 评论，**无 fix PR** | 影响所有 TG 群聊引用唤醒，长期无 PR 跟进，建议指定 owner |
| 🟠 **P1** | [#11390](https://github.com/AstrBotDevs/AstrBot/issues/11390) OpenAI TTS 默认 `tts-1` 将于 2027-01-06 下线 | 2 天 | OPEN，`open-for-contribution`，**无 PR** | 有硬截止时间，建议纳入下一版本必做清单 |
| 🟠 **P1** | [#11430](https://github.com/AstrBotDevs/AstrBot/issues/11430) OneBot 文件回显触发模型重复读取 | 1 天 | OPEN，无 PR | 存在**递归触发**风险，建议优先级上调 |
| 🟡 **P2** | [#11412](https://github.com/AstrBotDevs/AstrBot/issues/11412) Grep 内存放大 | 1 天 | OPEN，无 PR | 大仓库场景性能隐患，改动相对局部 |
| 🟡 **P2** | [#11405](https://github.com/AstrBotDevs/AstrBot/issues/11405) 临时内容回归历史 | 1 天 | OPEN，无 PR | 与 #11244 同族问题，建议合并为一个"Agent 会话状态"专项 |
| 🔵 **PR 队列** | 45 条待合并 PR | — | — | **评审带宽是当前最大瓶颈**：仅 @liquidtoy001 一人今日即提交 6 条 ChatUI PR（#11439–#11443 + #11303），建议引入批量评审或模块 owner 分工 |
| 🔵 **PR 队列** | [#11290](https://github.com/AstrBotDevs/AstrBot/pull/11290) SIGTERM 优雅关闭（Docker PID 1 场景） | 8 天 | OPEN | 影响容器化部署数据安全，改动小、收益高，建议优先合入 |

---

## 附：数据健康度指标一览

| 指标 | 数值 | 解读 |
|---|---|---|
| Issues 关闭率（24h） | 8 / 16 = **50%** | 达标，问题消化能力良好 |
| PR 流转率（24h） | 30 / 75 = **40%** | 中等，**待合并 45 条为主要风险面** |
| 存量 Bug 闭环 | 2 条（#9876 / #9760，均始于 8 月） | 长尾问题清理有进展 |
| 新增 Bug（24h） | 5 条 OPEN（含 2 条高影响） | 新增速度与修复速度基本持平 |
| 版本节奏 | 0 个新版本 | 距上一版本可能进入稳定期，关注后续 release 计划 |

---

*本报告基于 2026-11-27 至 2026-11-28 的 GitHub 公开数据生成，PR 评论数因数据源缺失未纳入排序。*

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目日报（2026-11-28）

> 数据口径：过去 24 小时 GitHub Discussions 更新 137 条；Releases 0 个；Issues/PR 未启用。以下 Top 15 讨论合计 215 条评论，样本中 👍 均为 0，故热度主要按评论数衡量。

## 1. 今日速览

- 过去 24 小时 Discussions 更新 **137 条**，社区活跃度高；Top 15 讨论合计 **215 条评论**，注意力高度集中在支付准入、客户端形态、成本效率与稳定性。
- 本期 **0 个新版本、0 条 Release changelog**，代码交付进展缺少可验证的版本信号；因 Issues/PR 未启用，无法从 PR 侧观察修复中状态。
- 最高热度为 [MIR 支付支持 #12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755)，**75 条评论**，占 Top 15 评论量约 **34.9%**；第二为 [独立客户端+CLI+VSCode 插件 #172](https://github.com/deepseek-ai/deepseek-harness/discussions/172)，**39 条评论**。
- 稳定性侧出现 P0 级 [超大会话 OOM 与崩溃死循环 #12708](https://github.com/deepseek-ai/deepseek-harness/discussions/12708)，另有长上下文流超时、`dsh web` 启动变慢、网络传输失败等高影响反馈。
- 项目健康度判断：**社区需求密度高、插件生态有亮点，但版本交付透明度与关键性能/稳定性闭环是主要观察点**。

## 2. 版本发布

本期**无新版本发布（0 个）**，无 Release changelog。  
因此无版本号、更新内容、破坏性变更或迁移注意事项可列；本期也无法按版本评估合并上线的功能与修复。

## 3. 项目进展

- 本期无 Releases，故**没有可引用的合并摘要**。仓库未启用 Issues/PR，代码合并经 Releases 落地；在本统计窗口内，代码侧进展无法从公开数据量化。
- 社区侧仍在推进需求聚合与问题澄清，主要集中在：
  - 支付与区域准入：[#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755)
  - 客户端/CLI/IDE 形态：[#172](https://github.com/deepseek-ai/deepseek-harness/discussions/172)
  - 容器化部署：[#1271](https://github.com/deepseek-ai/deepseek-harness/discussions/1271)、[#9440](https://github.com/deepseek-ai/deepseek-harness/discussions/9440)
  - Intel Mac 桌面端：[#8807](https://github.com/deepseek-ai/deepseek-harness/discussions/8807)、[#12977](https://github.com/deepseek-ai/deepseek-harness/discussions/12977)
  - token 成本与性能：[#8934](https://github.com/deepseek-ai/deepseek-harness/discussions/8934)
- 插件生态有展示型进展：[tvision Borland 风格窗口管理器 #7574](https://github.com/deepseek-ai/deepseek-harness/discussions/7574)，8 条评论，体现扩展性，但不等同官方版本合并。
- 结论：**社区参与度向前，代码交付进度在本窗口不可观测；不能将 Discussions 热度直接等同于已合并功能。**

## 4. 社区热点

| 排名 | 讨论 | 评论 | 核心诉求 |
|---|---:|---:|---|
| 1 | [支持 MIR 卡支付 DeepSeek API #12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755) | 75 | 俄罗斯用户本地卡无法支付，支付可用性阻碍 API 与 Harness 采用；偏商业/运营准入问题。 |
| 2 | [建议出独立客户端+CLI+VSCode 插件 #172](https://github.com/deepseek-ai/deepseek-harness/discussions/172) | 39 | Web 形态“不得劲”，希望原生客户端、CLI 与 IDE 集成；客户端分发与开发体验诉求强。 |
| 3 | [产品工程能力是否跟上模型能力 #11942](https://github.com/deepseek-ai/deepseek-harness/discussions/11942) | 15 | 模型能力受认可，但 Windows 文件选择器卡顿、AMD GPU 渲染异常等产品层问题削弱体验。 |
| 4 | [DSH 跑 V4.1 Flash 更费 token #8934](https://github.com/deepseek-ai/deepseek-harness/discussions/8934) | 13 | 实测启动税 8,188 token，为 Hermes 3.3 倍、Claude Code 1.8 倍；暴露 29 个工具 vs Pi 4 个；成本与上下文效率问题突出。 |
| 5 | [dsh 桌面端不好用 #6931](https://github.com/deepseek-ai/deepseek-harness/discussions/6931) | 10 | “一切皆插件”受认可，但预设太少、安装配置负担重，开箱即用体验不足。 |

补充信号：Intel Mac 需求在 [#8807](https://github.com/deepseek-ai/deepseek-harness/discussions/8807)（9 评论）与 [#12977](https://github.com/deepseek-ai/deepseek-harness/discussions/12977)（4 评论）重复出现；Docker 需求在 [#1271](https://github.com/deepseek-ai/deepseek-harness/discussions/1271)（6 评论）与 [#9440](https://github.com/deepseek-ai/deepseek-harness/discussions/9440)（4 评论）重复出现。Top 1+Top 2 占 Top 15 评论量约 **53.0%**，Top 5 占约 **70.7%**，热点集中度高。

## 5. Bug 与稳定性

> 修复状态说明：仓库未启用 PR，本期亦无修复 Release，故无法从 PR/Release 核验 fix 是否在途。以下“状态”指本期公开数据可见性。

| 严重度 | 讨论 | 问题 | 影响 | 修复状态 |
|---|---|---|---|---|
| **P0** | [#12708](https://github.com/deepseek-ai/deepseek-harness/discussions/12708) | 超大会话导致 OOM：约 1GB 会话、已解码 308MB/8.3 万行，assistant 消息 176MB；Node 子进程堆上限约 4GB，组装上下文时崩溃；崩溃恢复又自动重开同一会话形成死循环。 | 长期项目会话不可用，存在反复崩溃与数据风险。 | 本期未见对应 Release；无 PR 可核验。 |
| **P1** | [#14176](https://github.com/deepseek-ai/deepseek-harness/discussions/14176) | `llm-pi-ai` stream idle watchdog 忽略 SSE keepalive comment 帧，长 llama.cpp prefill 在 300s 被错误中止。 | 本地长上下文推理/预填充场景中断。 | 本期未见修复 Release。 |
| **P1** | [#11608](https://github.com/deepseek-ai/deepseek-harness/discussions/11608) | `dsh web` 启动时 eager projection-cache load：969 条记录/209MB，5.3s 校验占 26%；启动 12s→25s，RSS 1.42GB vs 空目录 454MB。 | 随会话积累持续劣化，长期安装启动变慢、内存升高。 | 本期未见修复 Release。 |
| **P1** | [#11541](https://github.com/deepseek-ai/deepseek-harness/discussions/11541) | 间歇性 `DeepSeek Messages transport failed`：DNS 混入 TCP 可连但 TLS 握手不完成的边缘节点，10s 超时导致连续数分钟无法请求。 | 中国大陆网络等场景下模型请求间歇不可用。 | 本期未见修复 Release。 |
| **P2** | [#11942](https://github.com/deepseek-ai/deepseek-harness/discussions/11942) | Windows 文件选择器因过长 `accept` 扩展名列表卡顿/卡死；AMD 独显开启硬件加速时输入光标异常等。 | 产品层 UX 与兼容性问题，影响日常使用。 | 本期未见修复 Release。 |
| **P2** | [#4452](https://github.com/deepseek-ai/deepseek-harness/discussions/4452) | 每次编辑前需先 read，用户质疑为何 agent 不自动先 read。 | 编辑流程摩擦，非崩溃类问题。 | 本期未见修复 Release。 |

## 6. 功能请求与路线图信号

因 PR 未启用且本期无 Release，无法用 PR 判断纳入概率；以下基于评论量、重复度与实现边界给出候选信号：

- **MIR 支付支持**：[#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755)，75 评论，热度最高。强区域准入信号，但更偏支付/商业运营决策，不纯是代码功能。
- **独立客户端+CLI+VSCode 插件**：[#172](https://github.com/deepseek-ai/deepseek-harness/discussions/172)，39 评论，自 2026-08-13 持续开放。反映 Web 形态不足与 IDE 工作流需求，若路线图强调开发者分发，可能成为候选。
- **官方 Docker 镜像/容器化部署**：[#1271](https://github.com/deepseek-ai/deepseek-harness/discussions/1271)、[#9440](https://github.com/deepseek-ai/deepseek-harness/discussions/9440)。重复出现，且容器内 `npm install -g` 编译 native 依赖实测 >12 分钟、slim 镜像缺工具链，需求边界清晰，是较具体的打包候选。
- **Intel Mac 桌面端**：[#8807](https://github.com/deepseek-ai/deepseek-harness/discussions/8807)、[#12977](https://github.com/deepseek-ai/deepseek-harness/discussions/12977)。官方仅 Apple Silicon/arm64，Intel 用户被阻断；重复需求，属于桌面分发扩展候选。
- **token 效率与工具暴露优化**：[#8934](https://github.com/deepseek-ai/deepseek-harness/discussions/8934)。启动税 8,188 token、29 个工具 vs 4 个，直接影响成本；可能驱动上下文组装、工具选择和启动开销优化。
- **产品工程质量硬化**：[#11942](https://github.com/deepseek-ai/deepseek-harness/discussions/11942)。不是单一功能，而是 Windows/GPU/文件选择器等兼容性与 UX 质量信号，适合纳入稳定性与体验治理。

## 7. 用户反馈摘要

**正面反馈**
- Web 版体验被认可：[#8807](https://github.com/deepseek-ai/deepseek-harness/discussions/8807) 用户称 `npx @deepseek-ai/dsh web` 体验很好。
- 插件化与自定义 agent 受认可：[#6931](https://github.com/deepseek-ai/deepseek-harness/discussions/6931) 认可“一切皆插件”和用户可修改 agent 的设置。
- 模型能力印象深刻：[#11942](https://github.com/deepseek-ai/deepseek-harness/discussions/11942)。
- 社区插件有创意：[#7574](https://github.com/deepseek-ai/deepseek-harness/discussions/7574) 的 tvision 窗口管理器展示扩展生态活力。

**主要痛点**
- **支付/区域准入**：俄罗斯用户无法用本地卡充值 API，形成采用障碍（[#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755)）。
- **客户端形态与开箱体验**：Web 不够、桌面端配置繁琐、预设少，插件优先带来上手负担（[#172](https://github.com/deepseek-ai/deepseek-harness/discussions/172)、[#6931](https://github.com/deepseek-ai/deepseek-harness/discussions/6931)）。
- **成本效率**：启动税高、工具暴露多，同模型下 token 消耗显著高于对比工具（[#8934](https://github.com/deepseek-ai/deepseek-harness/discussions/8934)）。
- **规模与稳定性**：3 个月长项目会话膨胀至约 1GB 后 OOM/死循环（[#12708](https://github.com/deepseek-ai/deepseek-harness/discussions/12708)）；968 个会话目录使 `dsh web` 启动从 12s 增至 25s（[#11608](https://github.com/deepseek-ai/deepseek-harness/discussions/11608)）。
- **平台覆盖**：Intel Mac 无官方桌面版（[#8807](https://github.com/deepseek-ai/deepseek-harness/discussions/8807)、[#12977](https://github.com/deepseek-ai/deepseek-harness/discussions/12977)）；Docker 缺失（[#1271](https://github.com/deepseek-ai/deepseek-harness/discussions/1271)、[#9440](https://github.com/deepseek-ai/deepseek-harness/discussions/9440)）；本地 llama.cpp 长 prefill 被 300s 看门狗错误中止（[#14176](https://github.com/deepseek-ai/deepseek-harness/discussions/14176)）。

## 8. 待处理积压

以下为创建时间较早、仍 OPEN 且影响面较大的讨论，建议维护者优先同步状态：

- [#172](https://github.com/deepseek-ai/deepseek-harness/discussions/172)（2026-08-13，39 评论）：独立客户端+CLI+VSCode 插件。长期高热度，已开放约 3.5 个月。
- [#1271](https://github.com/deepseek-ai/deepseek-harness/discussions/1271)（2026-08-14，6 评论）与 [#9440](https://github.com/deepseek-ai/deepseek-harness/discussions/9440)（2026-10-11，4 评论）：官方 Docker 镜像/容器化部署重复需求。
- [#4452](https://github.com/deepseek-ai/deepseek-harness/discussions/4452)（2026-08-25，6 评论）：编辑前必须 read 的流程摩擦，已开放约 3 个月。
- [#6931](https://github.com/deepseek-ai/deepseek-harness/discussions/6931)（2026-09-17，10 评论）：桌面端开箱体验与预设不足，反映产品化短板。
- [#8807](https://github.com/deepseek-ai/deepseek-harness/discussions/8807)（2026-10-04，9 评论）与 [#12977](https://github.com/deepseek-ai/deepseek-harness/discussions/12977)（2026-11-11，4 评论）：Intel Mac 桌面版重复需求。
- [#8934](https://github.com/deepseek-ai/deepseek-harness/discussions/8934)（2026-10-05，13 评论）：token 成本与工具暴露问题，影响付费/重度使用意愿。
- [#11608](https://github.com/deepseek-ai/deepseek-harness/discussions/11608)（2026-10-31，6 评论）：`dsh web` 启动性能随会话增长劣化，属长期安装场景的关键性能债。
- [#12708](https://github.com/deepseek-ai/deepseek-harness/discussions/12708)（2026-11-09，8 评论）：P0 会话 OOM/死循环，虽创建不足 1 个月，但严重度高，建议优先跟踪。
- [#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755)（2026-11-09，75 评论）：MIR 支付虽非长期积压，但热度最高且涉及商业决策，需要明确产品/运营回应。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*