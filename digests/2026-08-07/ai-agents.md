# OpenClaw 生态日报 2026-08-07

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-07 01:27 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-07

---

## 1. 今日速览

过去 24 小时项目活跃度极高：共发生约 **500 条 Issue 更新**（新开/活跃 434 条，关闭 66 条）与 **500 条 PR 更新**（待合并 407 条，合并/关闭 93 条），无新版本发布。Issue 关闭率约 13%，PR 合并/关闭率约 19%，说明社区反馈 influx 强劲但收敛速度暂时落后于新增速度。当前有 **2 个 P0 级问题**（Agent 数据库迁移失败导致网关无法启动、token 统计膨胀引发过早压缩与数据丢失）处于活跃状态，稳定性是当下最突出短板；另一方面，维护者正在推进一项横跨 5 个 PR 的"执行归因（execution attribution）"架构重构（#116793–#116796），并有一批安全加固 PR 集中提交，显示项目正从功能扩张转向架构收敛与安全治理。

---

## 2. 版本发布

过去 24 小时**无新版本发布**。项目当前处于 2026.7.2 系列的修复密集期，结合今日 93 个 PR 被合并/关闭来看，下一个补丁版（2026.7.3）或 beta 版预计将批量携带今日合入的修复（见下文"项目进展"）。

---

## 3. 项目进展

### 今日已合并/关闭的 PR（今日 Top 评论榜内可见）

| PR | 说明 | 价值 |
|---|---|---|
| [#120091](https://github.com/openclaw/openclaw/pull/120091) `fix(release): restart gateway after migration convergence` | 修复预发布跨 OS 检查在插件迁移收敛后未重启网关导致的失败 | 提升发布流水线可靠性 |
| [#119202](https://github.com/openclaw/openclaw/pull/119202) `fix(doctor): list actual removed ids in stale heartbeat/modelByChannel changes` | `openclaw doctor --fix` 现在报告实际被清理的 ID 而非笼统描述 | 可观测性与 CLI 体验改进 |
| [#116291](https://github.com/openclaw/openclaw/pull/116291) `fix(cli): parent-death watch prevents orphaned hook relay processes` | 父进程退出后自动回收 `hooks relay` 子进程，关闭 #111370 | 修复长期存在的进程泄漏问题 |

### 值得关注的在途重大 PR（尚未合并）

- **执行归因五连重构**（[#116793](https://github.com/openclaw/openclaw/pull/116793) → [#116794](https://github.com/openclaw/openclaw/pull/116794) → [#116795](https://github.com/openclaw/openclaw/pull/116795) → [#116796](https://github.com/openclaw/openclaw/pull/116796)，作者 @vincentkoc）：核心目标是将 requester/session 身份、工具策略、审计投影统一绑定到不可变的执行归因上，消除各运行时（gateway/ACP/embedded/CLI）之间归因重建不一致的问题。该系列为跨网关、agents、web-ui 的 XL 级改动，当前状态均为 `waiting on author`，合并前需重点关注兼容性与会话状态风险。
- **安全加固三连**（[@steipete](https://github.com/steipete) 提交）：[#120011](https://github.com/openclaw/openclaw/pull/120011)（不再推荐已废弃的 `allowInsecurePath`/`allowSymlinkCommand` 安装策略绕过）、[#120024](https://github.com/openclaw/openclaw/pull/120024)（从 `openclaw status` 与日志诊断中脱敏网关 URL 内嵌凭据）、[#120025](https://github.com/openclaw/openclaw/pull/120025)（子代理硬拒绝列表不可被 allow 配置覆盖，修复策略绕过）。三者均为小到中型 PR，方向明确，有望快速合入。

**综合判断**：项目今日在架构层（归因体系）、安全层（凭据脱敏与策略强制）、可观测性层（diagnostics/doctor）三线并进，整体向前推进约一个"修复+加固"迭代的量级。

---

## 4. 社区热点

| 排名 | Issue/PR | 热度 | 诉求分析 |
|---|---|---|---|
| 1 | [#75 Linux/Windows Clawdbot Apps](https://github.com/openclaw/openclaw/issues/75)（已关闭） | 116 评论，**80 👍**（全场最高） | 社区对桌面端跨平台支持有极强需求。macOS/iOS/Android 已有应用，但 Linux/Windows 长期缺失。80 个 👍 表明这是用户基数最大的功能诉求之一，值得路线图优先考虑 |
| 2 | [#116277 DeepSeek v4 Flash 静默回复失败](https://github.com/openclaw/openclaw/issues/116277)（已关闭） | 114 评论，P1 | 模型层可靠性是用户最敏感的痛点。模型静默失败后仅回退一句 "No reply was generated..."，用户完全无感知、无日志、无重试。114 条评论说明大量用户在同一模型上踩坑 |
| 3 | [#7707 Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) | 28 评论 | 安全敏感型用户的代表诉求：防止恶意指令通过网页、第三方 skill 注入记忆，实施"记忆投毒"攻击。该 issue 挂着 `needs-security-review` + `needs-product-decision`，社区讨论热度持续但未进入实施 |
| 4 | [#27445 `announceTarget` 子代理完成路由](https://github.com/openclaw/openclaw/issues/27445) | 12 评论，5 👍 | 高级用户在试图用子代理编排多步骤工作流时，发现完成通告无法作为用户消息回灌给主代理。反映社区对 agent 自主编排能力的深层需求 |

**总体观察**：社区热度集中在三条主线——**跨平台桌面端覆盖**（#75）、**模型提供商可靠性**（#116277、#88657、#101445）与**安全/沙箱治理**（#7707、#15032）。这三条恰好对应了开源 AI 助手走向生产级应用的三道门槛。

---

## 5. Bug 与稳定性

按严重程度排列（P0 → P1 → 平台专项）：

### 🔴 P0 — 阻断级

| Issue | 问题 | 修复状态 |
|---|---|---|
| [#119263](https://github.com/openclaw/openclaw/issues/119263) | **Agent DB v14→v15 迁移失败**：`no such column: entry_valid`，事务回滚导致网关拒绝启动，标记为 `ux-release-blocker` | 尚无 fix PR（有 linked PR 线索），需优先处理 |
| [#118772](https://github.com/openclaw/openclaw/issues/118772) | **`sessionEntry.totalTokens` 膨胀**导致在上下文窗口仅使用 4–8% 时触发过早压缩，造成**数据丢失**（2026.7.1+ 回归） | 已有 linked PR，等待合入 |

### 🟠 P1 — 高影响

| Issue | 问题 | 修复状态 |
|---|---|---|
| [#119087](https://github.com/openclaw/openclaw/issues/119087) | 网关冷启动时间从 2026.7.1-beta.1 到 2026.7.2-beta.7 **回归约 2.5 倍**（1-vCPU 容器） | 待 maintainer review |
| [#115700](https://github.com/openclaw/openclaw/issues/115700) | `chat.send` 因 `expectedLeafEntryId` 过期被误判 "thread switched branches"，模型完成后持续拒绝发送 | ✅ 修复 PR [#116382](https://github.com/openclaw/openclaw/pull/116382) 已提交 |
| [#119557](https://github.com/openclaw/openclaw/issues/119557) | chat delta 150ms 节流无尾随 flush，被抑制的 chunk 需等下一次事件才送达 | 已有 linked PR |
| [#115546](https://github.com/openclaw/openclaw/issues/115546) | CLI-budget 转录压缩在大会话上 **100% 失败**，超时提前 4.9s–50s 触发，无重试导致死亡螺旋 | 待修复 |
| [#95553](https://github.com/openclaw/openclaw/issues/95553) | 预算触发的预检压缩被硬编码 ~60s 上限，忽略 `compaction.timeoutSeconds` | 待修复 |
| [#92186](https://github.com/openclaw/openclaw/issues/92186) | WhatsApp 群聊并发 @时，仅最新消息的回复被送达，较早完成回复在 dashboard 可见但**未投递** | 待修复（source-repro 已确认） |
| [#86012](https://github.com/openclaw/openclaw/issues/86012) | LINE 频道因 reply token 过期**静默丢消息**，无 push 回退保障 | 待修复 |
| [#86050](https://github.com/openclaw/openclaw/issues/86050) | `claude-cli` 后端流事件被网关缓冲，WebChat/TUI 全程看不到流式输出 | 已有 linked PR |
| [#90789](https://github.com/openclaw/openclaw/issues/90789) | `claude-cli` 注入合成消息 "No response requested." 导致 Telegram 整轮静默且无观测手段 | 待修复 |
| [#117445](https://github.com/openclaw/openclaw/issues/117445) | `@openclaw/feishu` 将入站 DM 解码为 `?`，ingress spool 抛异常，`replies=0` 永不回复 | 已有 linked PR |
| [#117209](https://github.com/openclaw/openclaw/issues/117209) | 运行时快照发布失败后 `AuthProfileStoreUnreadableError` 粘滞，WeCom/agent 回复持续失败 | 已有 linked PR |
| [#109881](https://github.com/openclaw/openclaw/issues/109881) | Bedrock Claude 4+ 扩展思考签名无重放保护，"Invalid signature" 会**永久性废掉会话** | 待修复 |
| [#86119](https://github.com/openclaw/openclaw/issues/86119) | 子代理/cron 嵌入运行后遗留孤儿 `node server.js` 进程 | 待修复 |
| [#101445](https://github.com/openclaw/openclaw/issues/101445) | 嵌入式 Ollama 对特定 prompt 确定性返回 `payloads=0 tools=0`（incomplete_result） | `not-repro-on-main`，待关闭或复现 |
| [#117609](https://github.com/openclaw/openclaw/issues/117609) | 瞬时 LLM/socket 错误在 embedded-assistant 阶段不重试，长任务整轮死亡 | 待修复 |

### 🟡 Windows/WSL 专项

| Issue | 问题 | 备注 |
|---|---|---|
| [#102755](https://github.com/openclaw/openclaw/issues/102755) | Windows/WSL 上第二次构建不清理会挂起，**标记为 beta blocker** | 需优先处理 |
| [#119796](https://github.com/openclaw/openclaw/issues/119796) | Windows 上 vitest teardown 因 agent state DB 句柄未释放报 `EBUSY` | 测试链路问题，非产品崩溃 |
| [#58139](https://github.com/openclaw/openclaw/issues/58139) | `memory-lancedb` 插件在 Windows Docker bind mount 下初始化失败（文件系统同步延迟） | 待补 info |

---

## 6. 功能请求与路线图信号

### 已有对应 PR、进入下一版本概率较大的功能

| 功能请求 | 对应 PR | 信号强度 |
|---|---|---|
| [#15032 子代理按 spawn 限制工具（DMZ 隔离）](https://github.com/openclaw/openclaw/issues/15032) | [#78441 `feat(subagents): add durable per-spawn tool policies`](https://github.com/openclaw/openclaw/pull/78441)（5/6 提交，已 `ready for maintainer look`） | ⭐⭐⭐ 高：功能完整、proof 充足，只差维护者合入 |
| [#115700 分支误判修复（见 Bug 章节）](https://github.com/openclaw/openclaw/issues/115700) | [#116382](https://github.com/openclaw/openclaw/pull/116382) | ⭐⭐⭐ 高：直接修复 P1 回归，预计随下个 patch 发布 |
| [#6599 `/models test-fallback` 命令](https://github.com/openclaw/openclaw/issues/6599) | 暂无专门 PR，但模型回退链是当前事故高发区 | ⭐⭐ 中：急需但未见排期 |

### 路线图信号

- **安全治理成为主线**：#7707（记忆信任标记）、#15032（子代理工具隔离）、#71736（Control UI 插件槽位 RFC）、#45771（节流限速）四个安全/治理类请求全部挂着 `needs-product-decision`，与今日 @steipete 的安全 PR 集群（#120011/120024/120025）相互印证——维护者正在系统性收敛攻击面。
- **Agent 编排能力深化**：#27445（announceTarget 路由）、#44309（A2A 单向派发）、#6757（agent 自助压缩）共同指向一个方向：让 agent 具备更自主的多步工作流编排能力。其中 #6757 是 agent 自己提交的请求（"I am Wyatt, an OpenClaw agent autonomously filing this feature request"），颇具标志性。
- **渠道插件补课**：Slack Modal（#88154）、Feishu 流式卡片（#77685）、LINE 投递保障（#86012）表明多 IM 渠道的成熟度参差，未来版本可能需要对渠道插件做一轮统一的质量加固。

---

## 7. 用户反馈摘要

**正面声音：**

- [#73537](https://github.com/openclaw/openclaw/issues/73537) 用户 @Reneb-cafe 反馈："We've been running it as a family and business assistant (Telegram integration, automations, cron jobs, Home Assistant control) and it has genuinely become part of our daily workflow." — 这是典型的深度使用场景（家庭+商业+智能家居），说明 OpenClaw 已经嵌入真实生活流。该用户同时提出**为 release 添加 production-readiness 稳定性标签**（2 👍），反映出成熟用户对版本选型稳定性的重视。

**核心痛点：**

1. **静默失败最伤信任**：#116277（DeepSeek 静默失败）114 条评论高居榜首，用户对"只回一句 fallback、无日志、无重试"的模式接受度极低。同样模式还出现在 LINE（#86012）、Feishu（#117445）——**"消息静默丢失"是跨渠道的系统性用户痛点**。
2. **升级即风险**：#119263 升级后数据库迁移失败、网关拒绝启动；#118772 升级后 token 统计膨胀导致数据被压缩丢弃。多起 P0 都发生在 2026.7.1→2026.7.2 升级路径上，用户对升级安全性的信心可能受挫。
3. **平台覆盖面焦虑**：#75 的 80 个 👍 说明 Linux/Windows 桌面用户"看得见 macOS 应用却用不上"的落差感强烈。
4. **安全敏感用户发声**：#7707（记忆投毒）、#15032（DMZ 搜索隔离）的提出者都是对 AI 安全有深度认知的用户，他们在用实际需求倒逼项目建立信任边界。

---

## 8. 待处理积压

以下 Issue/PR 长期未获维护者响应或产品决策，提请关注：

### 高热度积压 Issue

| Issue | 创建时间 | 积压时长 | 状态标签 | 建议 |
|---|---|---|---|---|
| [#7707 记忆信任标记](https://github.com/openclaw/openclaw/issues/7707) | 2026-02-03 | **6 个月** | 28 评论，`needs-maintainer-review` + `needs-product-decision` + `needs-security-review` | 社区热度最高的安全功能请求，应尽快给出产品决策（做/不做/改设计） |
| [#15032 子代理工具限制](https://github.com/openclaw/openclaw/issues/15032) | 2026-02-12 | ~6 个月 | 7 评论，`linked-pr-open` | 对应 PR #78441 已等维护者 3 个月，建议合入或明确拒绝 |
| [#6599 `/models test-fallback`](https://github.com/openclaw/openclaw/issues/6599) | 2026-02-01 | **6+ 个月** | `needs-maintainer-review` + `needs-product-decision`（且 `recovery-stuck`） | 模型回退故障频发的当下，该诊断命令的价值只增不减 |
| [#6757 agent 自助压缩](https://github.com/openclaw/openclaw/issues/6757) | 2026-02-02 | ~6 个月 | `needs-maintainer-review` + `needs-product-decision`（`recovery-stuck`） | 与 #118772（压缩导致数据丢失）直接相关，建议联动评估 |
| [#44309 A2A 单向派发模式](https://github.com/openclaw/openclaw/issues/44309) | 2026-03-12 | ~5 个月 | 已标记 `stale`，但 7 评论 + diamond lobster 评级 | 与 #27445 同属编排能力矩阵，建议合并考虑或关闭 |

### 长期滞留 PR

| PR | 等待时长 | 状态 | 建议 |
|---|---|---|---|
| [#78441 durable per-spawn tool policies](https://github.com/openclaw/openclaw/pull/78441) | 2026-05-06 提交，**3 个月** | `ready for maintainer look`，proof 充足，XL 级 | 项目最大功能 PR 之一，长期无人拍板会打击贡献者积极性，建议排期评审 |

---

## 附：项目健康度简评

| 维度 | 评分（5★） | 说明 |
|---|---|---|
| 社区活跃度 | ★★★★★ | 24h 1000 条 Issue/PR 事件，评论深度高 |
| 维护者响应性 | ★★★☆☆ | 安全/架构 PR 有人推进，但 #78441 等长尾滞留 3 个月 |
| 稳定性 | ★★☆☆☆ | 2 个 P0 + 15+ 个 P1 在飞，且集中在消息丢失、数据丢失、启动失败等高风险场景 |
| 架构演进 | ★★★★☆ | 执行归因重构 + 安全加固集群表明架构意识强 |
| 用户满意度 | ★★★★☆ | 深度用户口碑好，但升级事故与静默失败正在消耗信任 |

**风险提示**：P0 的数据库迁移失败（#119263）和 token 膨胀致数据丢失（#118772）均触及升级路径与数据安全，建议下个版本发布前必须关闭；否则再次出现 "升级即事故"，对项目公信力伤害将远超普通 bug。

---

*数据来源：github.com/openclaw/openclaw 公开 Issues/PRs/Releases 快照（统计窗口：2026-08-06 至 2026-08-07）*

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析 — 2026-08-07

## 1. 生态全景

个人 AI 助手开源生态正处于"功能扩张 → 架构收敛"的换挡期：头部项目单日社区事件均达千级（OpenClaw / Hermes 各 ~1000 条 Issue+PR 更新），但合并率普遍偏低（12.8%–19%），审查带宽已成为共同瓶颈。稳定性是全生态最突出的短板——OpenClaw 2 个 P0 全部落在升级路径（DB 迁移失败、token 膨胀致数据丢失），Zeroclaw 单日涌现 5 个 SOP 静默失败 bug，Hermes / QwenPaw 亦存在会话数据丢失类回归。与此同时，模型回退链、A2A 编排、记忆安全、渠道投递保障等技术方向在多项目中同步涌动，表明生态正从 demo 级走向生产级。下一阶段的关键门槛是重建"升级安全"的信任底线——所有项目过去 24 小时均无新版本发布，正处于修复密集期，正是治理稳定性债务的窗口。

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | 合并/关闭率 | 新版本 | 严重 Bug 积压 | 健康度评估 |
|---|---|---|---|---|---|---|
| **OpenClaw** | 500（关闭 66，13%） | 500（合并/关闭 93，~19%） | 无 | 2 P0 + 15+ P1 | ★★★☆☆ 活跃度满分，但稳定性承压，P0 触及数据安全 |
| **Hermes Agent** | 500（关闭 24，4.8%） | 500（合并/关闭 64，12.8%） | 无 | 1 P1 + 10+ P2 | ★★★☆☆ 高活跃但收敛率低，TUI 核心工作流中断 13 天 |
| **QwenPaw** | 34（关闭 17，50%） | 50（合并/关闭 30，60%） | 无 | 4 高严重度 | ★★★★☆ 合入率最高，无 Block 级事故，架构收敛见效 |
| **Zeroclaw** | 27（关闭 4，15%） | 50（合并 0，0%） | 无 | 1 安全高危 + 5 P1 | ★★☆☆☆ 提交密集但审查停摆，SOP 子系统静默失败成簇 |
| **AstrBot** | 16（关闭 5，31%） | 9（合并 1，11%） | 无 | 2 高严重度 | ★★★☆☆ 稳定推进，P0 关闭；插件市场故障集中待排查 |
| **PicoClaw** | 0 | 2（合并 1） | 无 | 0 | ★★★★☆ 无 Bug 积压、节奏平稳，但社区输入偏低 |

**共性特征**：六项目均处于"修复+加固"迭代周期，24 小时内无任何 Release；合并率分化明显（QwenPaw 60% vs Zeroclaw 0%），反映各项目审查机制健康度差异巨大。

## 3. OpenClaw 在生态中的定位

**核心优势：**

- **生态体量头部，且收敛效率领先**：与 Hermes 并列单日千级事件，但 Issue 关闭率（13% vs 4.8%）与 PR 合入率（~19% vs 12.8%）均明显占优，社区反馈转化为代码的速度更快。
- **平台覆盖面最完整**：gateway / ACP / embedded / CLI 四种运行时 + macOS/iOS/Android 桌面端，叠加渠道插件矩阵（Telegram、WhatsApp、LINE、飞书、微信等），是当前唯一具备"个人 AI 助手 OS"完整形态的项目。
- **架构治理节奏最前置**：执行归因五连重构（#116793–#116796，统一 requester/session 身份与审计投影）与安全加固集群（#120011/120024/120025）显示其已从功能扩张切换到体系化收敛阶段，先于 Hermes 启动 god-file 式架构债清零。

**技术路线差异：**

| 对比对象 | OpenClaw 的差异 |
|---|---|
| vs Hermes | 不以 monorepo 大而全取胜（Hermes 有 20 个 god-file 待拆分），而以小型针对性 fix PR + 模块化重构为主，架构债管理更前置 |
| vs QwenPaw | 保持框架中立，不绑定特定上游（QwenPaw 与 AgentScope 2.0 生命周期深度耦合） |
| vs Zeroclaw | 走插件生态广度路线，而非 Rust + 流程自动化的安全优先窄路线 |
| vs PicoClaw | 全面型平台 vs 轻量嵌入式/单渠道选手 |

**社区规模信号**：#75（80👍，跨平台桌面）、#116277（114 评论，模型静默失败）、#7707（6 个月高热度，记忆投毒防护）——讨论深度与用户基数均居生态之首，同时 6 个积压 5–6 个月的功能请求也说明头部项目面临更高的决策压力。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目（代表诉求） | 核心内容 |
|---|---|---|
| **模型回退链** | PicoClaw #3200、QwenPaw PR #6659、OpenClaw #6599、Zeroclaw PR #9262–9272 | 主模型限流/超时/失败时自动切换，需带冷却机制避免反复命中故障节点；OpenClaw 用户进一步要求 `/models test-fallback` 诊断命令 |
| **静默失败治理** | OpenClaw #116277（114 评论）、Zeroclaw #9779/#9786/#9792、QwenPaw #6601、Hermes #7237 | 跨项目最高频痛点：无日志、无重试、无用户感知的失败模式（模型空响应、SOP 不加载、消息丢投递）严重侵蚀信任 |
| **安全/信任边界** | OpenClaw #7707/#15032、Zeroclaw #9328、Hermes PR #80685/#80689、QwenPaw #6775 | 记忆防投毒、子代理工具隔离、MCP 不可见字符剥离、凭据脱敏、verifiable-intent 密码学链验证；QwenPaw 还面临杀软误报的信任危机 |
| **多智能体编排** | OpenClaw #27445/#44309、Zeroclaw #9106、Hermes #80450 | 子代理完成通告路由回主代理、A2A 出站调用、委托任务固定 provider/model 不被父级 fallback 链覆盖 |
| **上下文/压缩可靠性** | OpenClaw #118772/#115546、Hermes PR #80696/#80695、QwenPaw PR #6564 | token 统计准确性、压缩前 pending turns 刷新、压缩历史归档保留、压缩超时与重试——数据丢失类回归多发生于此 |
| **跨平台桌面端** | OpenClaw #75（80👍）、Hermes 桌面类 bug 群、AstrBot PR #9339 | Linux/Windows 桌面覆盖（OpenClaw 呼声最高）、macOS 更新保留 TCC 权限、Windows 更新无限循环、桌面 GPU 空转耗电 |

## 5. 差异化定位分析

| 项目 | 产品形态 | 核心目标用户 | 关键架构/生态差异 |
|---|---|---|---|
| **OpenClaw** | 全栈个人 AI 助手 OS | 深度个人/家庭用户、开发者、多平台使用者 | 多运行时 + 多平台 + 渠道插件矩阵；执行归因统一审计；最接近生产级形态 |
| **Hermes Agent** | 研究型桌面重负载工具 | 技术人群、桌面优先、多租户需求者 | monorepo 单仓大而全；xAI/Grok 对齐最激进；Claude 订阅 OAuth 诉求（48👍）指向降低使用成本 |
| **QwenPaw** | AgentScope 生态标杆 | 云端/自建服务用户、AgentScope 开发者 | 与 AgentScope 2.0 生命周期深度绑定；Scroll 统一上下文协议；共享文件系统持久化加固 |
| **Zeroclaw** | Rust 高安全偏好助手 | 安全敏感、SOP 流程自动化用户 | Rust 内存安全 + verifiable-intent + 可视化管理；XOR 加密漏洞关闭标志安全收口 |
| **PicoClaw** | 轻量嵌入式/渠道适配器 | QQ 等国内渠道、边缘设备用户 | sipeed 硬件背景；QQ 富媒体支持刚补齐；体量最小、专注单点突破 |
| **AstrBot** | 中文社区 IM 机器人框架 | 国内群聊 bot 运营者 | 插件市场生态 + 多 IM 适配 + Dashboard 配置；WebUI 改版引发老用户习惯冲突 |

## 6. 社区热度与成熟度分层

| 阶段 | 项目 | 判断依据 |
|---|---|---|
| **快速迭代 + 架构重构期** | OpenClaw、Hermes | 单日千级事件；OpenClaw 在执行归因/安全治理上重构，Hermes 在 god-file 分解与安全移植上重构；共同代价是稳定性债务累积 |
| **质量巩固期** | QwenPaw | 50% Issue 关闭率 + 60% PR 合入率，无 Block 事故，上下文架构收敛已完成；健康度全生态最佳 |
| **流程瓶颈期** | Zeroclaw | 提交密度高（50 PR）但 24h 合并数 0；RFC 决策积压 79 天（#6808），"决策债务"已超过代码债务 |
| **维护平稳期** | PicoClaw、AstrBot | PicoClaw 无 Bug 积压、按节奏合入；AstrBot P0 关闭、功能 PR 持续提交，均处于低风险稳态 |

## 7. 值得关注的趋势信号

1. **升级安全性 = 用户信任底线**：OpenClaw 2 个 P0 全在 2026.7.1→2026.7.2 升级路径上（DB 迁移失败、token 膨胀致数据丢失），QwenPaw 升级后命令行报错，AstrBot P0 修复耗时 2 个月——升级路径的回归测试应被各项目列为 P0 SLA，否则"升级即事故"将系统性消耗社区信任。

2. **模型层故障是生态级课题，而非单项目问题**：静默失败横跨 4 个项目 5+ 个 issue，集中发生在第三方 provider（DeepSeek、Ollama、xAI、Bedrock）。对智能体开发者的直接启示：**回退链 + 显式错误 + 可观测日志**应成为 agent 框架的默认能力，而非可选增强。

3. **安全治理正在从"修 bug"走向"信任边界系统设计"**：OpenClaw 的凭据脱敏与策略强制、Hermes 的 MCP 不可见字符剥离与 per-workspace trust store、Zeroclaw 关闭存活半年的 XOR 加密漏洞、QwenPaw 的杀软误报应对——安全已成为与功能并行的正式工程轨道。

4. **多智能体编排是下一个竞争高地**：A2A 出站（Zeroclaw #9106）、子代理完成路由（OpenClaw #27445）、委托任务隔离（Hermes #80450）——单 agent 能力趋同后，**编排层的自主性、可控性与可审计性**将成为差异化核心。

5. **桌面端 + 订阅经济的交汇需求**：OpenClaw #75 的 80👍 与 Hermes #25267 的 48👍 共同指向——用户渴望"桌面级体验 + 无需为订阅重复付费"的生产力工具。这对智能体产品的商业化与定价模式有直接参考价值：支持 Claude/GPT 订阅 OAuth 可能成为获客利器。

6. **审查带宽决定项目天花板**：Zeroclaw 0 合并与 QwenPaw 60% 合入率的鲜明对比表明，在社区贡献涌入期，维护者的 PR 审查机制（而非代码质量）正在成为生态位竞争的关键变量。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-07

## 1. 今日速览

过去 24 小时项目活跃度处于**高位但存在吞吐瓶颈**：共 27 条 Issue 更新（23 条活跃 / 4 条关闭）、50 条 PR 更新，但 **0 个 PR 被合并或关闭，0 个新版本发布**。Issue 侧热点集中在 SOP（标准操作流程）子系统——单日新增 5 个相关 bug（#9779、#9780、#9783、#9784、#9786、#9792），且多表现为"静默失败、无日志诊断"的共性问题。PR 侧则由 @IftekharUddin 的 Anthropic fallback 与渠道可靠性修复集群主导（约 20 条 pending），大量 PR 标记 `needs-author-action`，提示审查-作者响应循环存在积压。积极信号是 4 个 Issue 关闭，其中包括 **CRITICAL 级 XOR 加密漏洞（#1）** 与 2 个 P1 级 CLI/Bug 回归，安全与质量问题在收敛。

---

## 2. 版本发布

过去 24 小时无新版本发布。当前版本线参考：v0.8.3 为已确认稳定版（多个 Issue 复现基于 `0.8.3 fc8b4d83`），v0.8.4 已在开发引用中出现，v0.8.5 稳定线 tracker（[#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)）显示 intake 已于 8 月 4 日冻结，周度切片持续至 8 月 30 日。

---

## 3. 项目进展

**⚠️ 今日 PR 合并数为 0**，50 条 PR 全部处于待合并状态，项目"前轮"（PR 提交）远快于"后轮"（审查合并），这是当前最值得关注的流程信号。

**已关闭 Issue 代表的项目推进：**

- **[#1](https://github.com/zeroclaw-labs/zeroclaw/issues/1)（CRITICAL，已关闭）**：`SecretStore` 使用 XOR 重复密钥"加密"API 密钥与令牌（CWE-327，`src/security/secrets.rs:99-108`）。此漏洞自 2026-02-14 存活近半年后关闭，属重大安全收口。
- **[#9566](https://github.com/zeroclaw-labs/zeroclaw/issues/9566)（P1，已关闭）**：Unix 下 `allowed_commands` 大写条目永不匹配的回归（源自 #4552）已修复，安全策略模块的静默拒绝问题解决。
- **[#9672](https://github.com/zeroclaw-labs/zeroclaw/issues/9672)（P1，已关闭）**：`cron add --help` 三则示例全部无法运行、空状态提示存在第四种错误形式的 CLI 文档缺陷已修复，并衍生出 #9796 继续清理父命令帮助文本。
- **[#657](https://github.com/zeroclaw-labs/zeroclaw/issues/657)（已关闭）**：Kimi Code provider 支持请求关闭（Moonshot 与 Kimi Coding 为独立 provider，密钥不互通）。

**待合并 PR 中体现的重点工程方向（50 条 pending）：**

- **Anthropic refusals / fallback 完整技术栈**（7 连 PR）：[#9262](https://github.com/zeroclaw-labs/zeroclaw/pull/9262) 将原生 refusal 转为类型化错误 → [#9263](https://github.com/zeroclaw-labs/zeroclaw/pull/9263) 客户端侧 fallback 路由 → [#9265](https://github.com/zeroclaw-labs/zeroclaw/pull/9265) 服务端 fallback 请求 → [#9266](https://github.com/zeroclaw-labs/zeroclaw/pull/9266) 响应检测 → [#9268](https://github.com/zeroclaw-labs/zeroclaw/pull/9268) / [#9272](https://github.com/zeroclaw-labs/zeroclaw/pull/9272) 在消息渠道与 Web 聊天中呈现 safeguard notice。规模均为 XL，风险 high。
- **Eval 体系增强**：[#9244](https://github.com/zeroclaw-labs/zeroclaw/pull/9244)（memory seed/grade 断言）、[#9248](https://github.com/zeroclaw-labs/zeroclaw/pull/9248)（append-only 运行历史收据）。
- **渠道可靠性修复**：[#9313](https://github.com/zeroclaw-labs/zeroclaw/pull/9313) WeChat 仅入队后持久化游标、[#9314](https://github.com/zeroclaw-labs/zeroclaw/pull/9314) Telegram 仅在投递/永久跳过后再推进 offset、[#9321](https://github.com/zeroclaw-labs/zeroclaw/pull/9321) Telegram 媒体消息未授权通知、[#9326](https://github.com/zeroclaw-labs/zeroclaw/pull/9326) Signal Note to Self。
- **cron 引擎**：[#9320](https://github.com/zeroclaw-labs/zeroclaw/pull/9320) 为 agent 任务添加墙钟超时并释放 sqlite 锁。
- **新模型兼容**：[#9723](https://github.com/zeroclaw-labs/zeroclaw/pull/9723) 解析 DeepSeek DSML 与 `<|tool_call|>` 信封（此前原始信封文本直接暴露给用户）。

---

## 4. 社区热点

今日讨论最密集的 Issue 集中在**治理流程**与**多智能体架构**两个主题：

- **[#6808 — RFC: Work Lanes, Board Automation, and Label Cleanup](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)（19 评论）**：自 5 月 20 日创建、已修订 24 版、状态为"ratification deferred / rollout in progress"的治理类 RFC，讨论如何让工作路由更轻量、减少维护者负担。评论数全项目最高，说明治理痛点持续时间长、关注度高。
- **[#9106 — RFC: A2A outbound client（A2ATool）](https://github.com/zeroclaw-labs/zeroclaw/issues/9106)（11 评论）**：核心诉求是让 ZeroClaw agent 能主动调用外部 A2A 兼容 agent，打破当前只能被动接收（A2AServer）的协作模式，直指多智能体互操作路线图。
- **[#8692 — Maintainer decision queue tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)（11 评论）**：维护者决策队列本身持续累积 RFC/设计问题，社区实质上在等待维护者对积压决策表态。
- **[#9246 — RFC: Preserve Todo tracker configuration during ZeroCode ownership migration](https://github.com/zeroclaw-labs/zeroclaw/issues/9246)（11 评论）**：ZeroCode 所有权迁移时保留 Todo tracker 配置，涉及已被审查的 7 月决议的整合。
- **[#6954 — RFC: Provenance & reply contract for internally initiated agent turns](https://github.com/zeroclaw-labs/zeroclaw/issues/6954)（10 评论）**：8 月 5 日重写后补充了四项边界澄清（身份稳定性、绑定并发、回复生命周期等），是 cron/内部触发场景的契约基础。

**背后诉求分析**：社区讨论的重心已从单一功能转向"**流程效率**"（RFC 审批太慢 → #9496 提议精简流程）与"**架构互操作**"（A2A 出站、统一 catalog #9346）两个上层问题，这通常是一个项目进入规模化阶段的信号。

---

## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列：

**🔴 安全（高）**

- **[#9328](https://github.com/zeroclaw-labs/zeroclaw/issues/9328) — verifiable-intent 未验证凭据链即评估约束（risk:high，6 评论）**：`vi_verify` 的 `evaluate_constraints` 对调用方提供的 `fulfillment` 直接校验 L2 约束，而 VI 参考实现要求先经过密码学链验证。当前无对应 fix PR。

**🟠 高优先级（P1）**

- **[#9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779) — `sops_dir` 文档默认值未被守护进程采用，SOP 静默不加载**：两条启动路径均以 `is_some()` 门控整个 SOP 子系统，依赖默认值的部署无任何报错/日志。in-progress，无 fix PR。
- **[#9786](https://github.com/zeroclaw-labs/zeroclaw/issues/9786) — 畸形 `SOP.toml` 被静默丢弃，`sop list` 遗漏且 `sop validate` 报成功**：与"文件不存在"完全无法区分，CLI 诊断设计缺陷。
- **[#9784](https://github.com/zeroclaw-labs/zeroclaw/issues/9784) — 多步 agent 驱动 SOP 运行中途被误标 failed 且无审计事件**：agent 仍在执行当步工作，调用 `sop_advance` 才发现无活跃运行。
- **[#9780](https://github.com/zeroclaw-labs/zeroclaw/issues/9780) — cron 触发的 SOP 无法执行任何网络操作**：能力集无 HTTP 成员，`shell.exec`/`notify.channel` 为不可满足占位符，文档宣传的 watch-loop 模式实际不可用。
- **[#9770](https://github.com/zeroclaw-labs/zeroclaw/issues/9770) — `cron update` 静默丢弃声明式任务（六列）变更**：`command`、`name`、`expression`/`schedule`、`session_target`、`allowed_tools`、`uses_memory` 全部受影响。

**🟡 中优先级（P2）**

- **[#9792](https://github.com/zeroclaw-labs/zeroclaw/issues/9792) — git 渠道空 peer allowlist 在 DEBUG 级别静默丢弃全部事件（含 sop 路由）**：in-progress。
- **[#9783](https://github.com/zeroclaw-labs/zeroclaw/issues/9783) — `SopEngine::finish_run` 接受 failure reason 却丢弃**：失败运行只记录"失败"不记录"原因"。
- **[#9771](https://github.com/zeroclaw-labs/zeroclaw/issues/9771) — zeroclaw-gateway 默认 feature 面无法通过 `clippy -D warnings`**：四个测试辅助函数门控错位，一行修复，属 CI 质量门禁问题。
- **[#9796](https://github.com/zeroclaw-labs/zeroclaw/issues/9796) — `cron --help` 父命令仍打印无效的 add-at / add-every / once 示例**（accepted，#9672 的后续清理）。

**✅ 已关闭（回归/修复确认）**：[#1](https://github.com/zeroclaw-labs/zeroclaw/issues/1)（XOR 加密）、[#9566](https://github.com/zeroclaw-labs/zeroclaw/issues/9566)（大写 allowed_commands）、[#9672](https://github.com/zeroclaw-labs/zeroclaw/issues/9672)（cron add 示例）。其中 #9566 为回归修复，印证安全策略路径近期有改动。

---

## 6. 功能请求与路线图信号

**可能进入 v0.9.0 的功能信号**（依据 tracker [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) 的 A2A/多智能体/网关边界范围）：

- **A2A 出站能力**（[#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106)）：A2ATool 提案若获 ratify，将与 v0.8.2 已内置的 A2AServer 构成完整双向协作，是 v0.9.0 最重要的架构候选。
- **Per-model 能力与上下文窗口配置**（[#7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100)，P1）：解决 provider 族默认值误报 vision、未设置时回退 32k 上下文等源头不一致问题，直接影响 UI 展示与预算计算。
- **统一 catalog 契约**（[#9346](https://github.com/zeroclaw-labs/zeroclaw/issues/9346)）：将 #8908/#8909 的 CLI/网关视图收敛为产品级统一目录，属于架构演进项。
- **shell dialect 注入系统提示**（[#9788](https://github.com/zeroclaw-labs/zeroclaw/issues/9788)，P3，blocked）：让模型不再从 OS 名猜测 shell 语言，小而实用的 agent 可靠性改进。

**PR 侧可直接观测的路线图落地**：Anthropic 双路径 fallback（服务端 + 客户端）完整栈、eval 历史收据与内存断言、DeepSeek DSML 解析、Signal Note to Self。这些若在 v0.8.5 冻结前未合入，将顺延至 v0.9.0。

---

## 7. 用户反馈摘要

本期 Issue 评论/描述中反映的真实痛点可归纳为四类：

1. **静默失败是最大共性痛点**：至少 6 个独立问题表现为"无任何错误、无日志、无警告"。典型用户原话场景——"SOP 引擎从不加载，无错误无警告无日志行"（#9779）；"畸形 SOP 与不存在 SOP 无法区分"（#9786）；"唯一诊断是一条 DEBUG 行"（#9792）。说明项目在**可观测性与失败显式化**上存在系统性短板，用户被迫在不可见状态下排障。
2. **文档/帮助与实现脱节直接伤害操作者**：CLI help 三则示例全部失败（#9672 已修，但父命令仍带病 #9796）；文档宣传的 watch-loop 模式（cron 轮询 SOP）实际不具备网络能力（#9780），用户按文档操作必然碰壁。
3. **消息渠道存在数据丢失风险**：WeChat 游标先于入队持久化、Telegram offset 先于投递推进——用户在崩溃场景下会静默丢消息。对应的 fix PR（#9313、#9314）已就绪但未合并，用户暴露窗口仍在。
4. **模型兼容性痛点**：DeepSeek 用户的工具调用以原始信封文本呈现（#9723）；Ollama 小模型将流式用户轮次误读为日志/API 输出而回复协议评论（#9325）——真实用户对"模型方言"适配的需求明确。

此外，社区对流程本身表达了不满：RFC 流程"比它要支持的决策还慢"（#9496），7 天讨论期 + 广泛一致 + 手动投票协调被指为过重。

---

## 8. 待处理积压

**🚨 最高优先级信号：50 个 PR 待合并，24 小时合并数为 0。** 其中大量标记 `needs-author-action`（如 [#9248](https://github.com/zeroclaw-labs/zeroclaw/pull/9248)、[#9244](https://github.com/zeroclaw-labs/zeroclaw/pull/9244)、[#9229](https://github.com/zeroclaw-labs/zeroclaw/pull/9229)、[#9281](https://github.com/zeroclaw-labs/zeroclaw/pull/9281)、[#9313](https://github.com/zeroclaw-labs/zeroclaw/pull/9313)、[#9314](https://github.com/zeroclaw-labs/zeroclaw/pull/9314)、[#9320](https://github.com/zeroclaw-labs/zeroclaw/pull/9320) 等），表明部分阻塞在作者响应侧，但 0 合并也暗示维护者审查带宽不足。建议维护者优先处理渠道数据丢失类 fix（#9313/#9314）与安全相关项（#9328）。

**长期未决的治理/决策项：**

- **[#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)**：5 月 20 日开启的治理 RFC，24 次修订后仍处于"ratification deferred"，已积压 79 天。
- **[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)**：维护者决策队列自身已累积 11 条评论，涉及多个等待 accept/reject/defer 的 RFC（#6954、#7100、#9106、#9346、#9496、#9530），是当前最大的"决策债务"聚合点。
- **[#6954](https://github.com/zeroclaw-labs/zeroclaw/issues/6954)**：6 月 26 日重写后已补充完整性澄清，等待维护者批复。
- **[#1](https://github.com/zeroclaw-labs/zeroclaw/issues/1)**：CRITICAL 安全漏洞虽已关闭，但建议在 release notes 中确认修复版本与迁移说明，确保用户知晓升级。

**版本 tracker 提醒：** v0.8.5 稳定线（[#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)）intake 已于 8 月 4 日冻结，周度切片机制下，当前 50 个 pending PR 若未赶上本周切片，将自动顺延至下周或 v0.9.0（[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)）。

---

*数据来源：Zeroclaw GitHub 仓库（github.com/zeroclaw-labs/zeroclaw），统计窗口 2026-08-06 至 2026-08-07。PR 评论数在原始数据中未提供（undefined），本报告未对 PR 热度做排序。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-07

## 1. 今日速览

PicoClaw 项目过去 24 小时整体活跃度处于**中低水平**：Issues 侧完全静默（0 新开 / 0 关闭），社区问题反馈与讨论暂无明显波动；PR 侧有 2 条动态，其中 1 条于昨日被合并关闭（#1349），另 1 条（#3200）仍在开放中并保持活跃更新。无新版本 Release 发布。总体来看，项目当前处于**稳定推进期**，功能开发以合并既有 PR 为主，社区需求输入暂缓。

---

## 2. 版本发布

过去 24 小时无新版本 Release。此部分省略。

---

## 3. 项目进展

### 合并/关闭 PR

**[#1349] [已关闭] feat(qq): support parsing and replying to more attachment types**

- 作者：@aishannon
- 创建：2026-03-11 | 更新：2026-08-06 | 状态：已合并/关闭
- 链接：https://github.com/sipeed/picoclaw/pull/1349

该 PR 是近期 QQ Channel 适配工作的重要落地，主要推进了以下能力：

1. 支持解析 QQ 频道中的 emoji 结构；
2. 支持处理来自 QQ 频道的语音、图片、视频和文件消息；
3. 支持回复本地语音、图片、视频和文件附件（发送前自动上传）；
4. 回复时优先使用 Markdown 消息格式，失败时降级到其他方案。

**项目意义**：该 PR 补齐了 PicoClaw 在 QQ 频道场景下的多媒体消息处理能力，从纯文本/图片回复扩展到完整的富媒体交互，显著提升了该频道渠道的实用性与用户覆盖度。合并后，项目对 QQ 频道的支持已具备基本完整的消息收发闭环。

### 开放中 PR（今日有更新）

**[#3200] [OPEN] feat(models): add configurable default fallback chain**

- 作者：@lc6464
- 创建：2026-07-01 | 更新：2026-08-06 | 状态：开放中
- 链接：https://github.com/sipeed/picoclaw/pull/3200

该 PR 为 Web UI 引入可配置的默认模型回退链（fallback chain），并支持通过后端 API 持久化配置。用户可在模型页面设置默认模型、添加回退模型、调整链路顺序并保存完整配置。该功能当前仍处于开放状态，预计将在后续版本中合入，提升模型调度的健壮性。

---

## 4. 社区热点

过去 24 小时 Issues/PR 侧评论数据有限，无明显高热度讨论话题。两个 PR 的评论数均为 undefined（无可用数据），互动量较低。

相对而言，**#3200（模型默认 fallback chain）** 是当前最受关注的开放 PR。虽然今日无大量讨论，但其持续近 5 周的活跃更新（从 7 月 1 日创建至今持续修改）表明：**社区对模型管理灵活性的需求较为强烈**——用户不仅希望单一模型可用，更需要对多个模型进行优先级编排，以保证服务稳定性与高可用性。这一诉求也符合当前 AI 助手领域对多模型调度能力的普遍期待。

链接：https://github.com/sipeed/picoclaw/pull/3200

---

## 5. Bug 与稳定性

过去 24 小时无新报告的 Bug、崩溃或回归问题，Issues 侧为零更新。项目当前未暴露出明显的稳定性风险。

---

## 6. 功能请求与路线图信号

结合近期开放 PR 与今日动态，以下信号值得关注：

| 信号 | 来源 | 状态 | 可能纳入版本 |
|------|------|------|-------------|
| 可配置模型默认 fallback chain（Web UI + API） | #3200 | 开放中，持续活跃 | 下一个 minor 版本 |
| QQ 频道富媒体消息解析与回复 | #1349 | 已合并 | 已纳入当前代码库 |
| 回复优先 Markdown、失败降级策略 | #1349 子功能 | 已合并 | 已纳入当前代码库 |

**判断**：#3200 相关功能在合入后很可能进入下一版本 Release；同时，QQ 频道富媒体支持（#1349）标志着渠道适配已进入成熟阶段，未来可能继续扩展更多消息类型或渠道。

---

## 7. 用户反馈摘要

过去 24 小时无公开 Issues 评论数据，无法获得直接的用户反馈。但从 #1349 的 PR 摘要中可以推测：**QQ 频道用户此前受限于无法收发多媒体消息（语音/视频/文件），且表情解析缺失**；本次合入后这些问题得到了直接回应。若需更全面的用户声音，建议后续关注 Issues 中 QQ 频道相关反馈帖。

---

## 8. 待处理积压

以下条目建议维护者重点关注：

**[#3200] feat(models): add configurable default fallback chain**

- 开放时间：2026-07-01 至今（约 5 周）
- 当前状态：开放中，作者仍在持续更新
- 关注原因：属于模型管理层的重要功能需求，长期开放可能影响用户期望；且 PR 描述包含完整的前后端工作（模型页设置 + API 持久化），建议维护者尽快安排 review，避免 PR 过期或冲突扩大。
- 链接：https://github.com/sipeed/picoclaw/pull/3200

---

**总体健康度评价**：项目当前无 Bug 积压、无社区投诉热点，开发节奏稳健，渠道扩展与模型管能力两个方向同步推进，处于**健康稳定**状态。建议后续关注 #3200 的 review 进度，以及 QQ 频道富媒体支持上线后的用户反馈。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-07

## 1. 今日速览

过去24小时QwenPaw项目保持高活跃度：共处理34条Issue（新开/活跃17条，关闭17条，关闭率50%），50条PR（待合并20条，已合并/关闭30条，合入率60%），无新版本发布。当前开发重心集中在**稳定性修复**（MCP工具失效、长会话上下文溢出、Matrix/OneBot等通道适配）与**架构治理**（Scroll上下文协议与AgentScope生命周期对齐、CI门禁、共享文件系统持久化加固）两大方向，未出现Block级紧急事故，项目健康度良好。


## 2. 版本发布

过去24小时无新版本 Release。


## 3. 项目进展

今日合入/关闭的PR清晰反映出项目正从“功能扩张”转向“架构收敛与稳定性加固”：

- **配置持久化加固**：#6744（[fix(config): harden agent config persistence on shared filesystems](https://github.com/agentscope-ai/QwenPaw/pull/6744)）已合入，此前#6664（[fix(harnesses): degrade gracefully without Codex CLI](https://github.com/agentscope-ai/QwenPaw/pull/6664)）也已完成合并，针对OSSFS/FUSE等共享文件系统上的原子写入与容错做专项治理，直接回应了云环境/多机部署场景的配置损坏问题。
- **上下文架构收敛**：#6611（[refactor(context): align Scroll and memory with AgentScope lifecycle](https://github.com/agentscope-ai/QwenPaw/pull/6611)）合入，将Scroll收敛为唯一上下文协议，消除与AgentScope 2.0原生state/toolkit/middleware机制的重复实现，是降低长期维护成本的关键一步。
- **前端可用性修复**：#6530（[Fix editable per-tool call limit names](https://github.com/agentscope-ai/QwenPaw/pull/6530)）合入，修复工具级调用限制名称无法编辑的问题，并补充回归测试。
- **记忆链路完善**：#6741、#6739（feat/docs: ReMe embedding配置与文档）虽因源仓库fork删除而关闭，但已通过新PR #6772、#6771重新提交并合入最新main，引入了Embedding模型工厂、真实连通性验证及中英文配置指南。

总体来看，项目在“共享文件系统可靠性”和“上下文/记忆架构统一”两个方向上迈出了实质性步伐，且PR合入率健康，无长期悬挂的技术债。


## 4. 社区热点

- **[#6684 [Feature] 增加频道的重试功能](https://github.com/agentscope-ai/QwenPaw/issues/6684)** — 8条评论，今日最高热度。用户使用自建Matrix添加频道，因QwenPaw启动快于Matrix服务导致连接失败，且无自动重试/健康检测，每次重启服务器都要手动重新保存频道。诉求本质是**通道层连接生命周期的自愈能力**，反映了自建服务用户对“无人值守稳定性”的强烈需求。
- **[#6588 [Bug] spawn_subagent误将空batch占位符当作批量模式](https://github.com/agentscope-ai/QwenPaw/issues/6588)** — 6条评论。Responses兼容模型在单任务调用时返回空`batch`占位符，被框架误判为批量模式。该issue已关闭，但暴露的是**多提供商协议差异的兼容层缺陷**。
- **[#6601 [Bug] QwenPaw不报空响应错误](https://github.com/agentscope-ai/QwenPaw/issues/6601)** — 5条评论。长会话因工具调用累积逼近窗口上限后，模型空响应但不报错，会话彻底失去响应。用户直接定性为“框架层问题”，与#6726、#6700等构成同一痛点群：**长上下文场景下的失败可观测性不足**。
- **[#6667 [Bug] DeepSeek思考模式多轮失败](https://github.com/agentscope-ai/QwenPaw/issues/6667)** — 5条评论。`reasoning_content`经OpenAI格式化器跳过ThinkingBlock后，多轮对话中丢失，补充`" "`的降级机制仅首次生效。属于**思考型模型链路的兼容性缺陷**。


## 5. Bug 与稳定性

### 🔴 高严重度

| Issue | 问题 | 状态 |
|---|---|---|
| [#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) | **MCP工具规律性失效**：每隔数小时MCP工具自动失效，报“未注册或不存在”，重启Docker容器可恢复。影响所有依赖MCP的生产环境 | 无对应fix PR，需优先排查 |
| [#6700](https://github.com/agentscope-ai/QwenPaw/issues/6700) | **超大工具输出导致历史会话加载卡死**：数MB工具输出存入上下文后，网页端重开会话卡死，且触发上下文窗口超限 | 已关闭，但未见对应修复PR，建议确认修复落点 |
| [#6768](https://github.com/agentscope-ai/QwenPaw/issues/6768) | **Agent进入无限循环**：多步骤任务完成后仍持续空转，用户消息数小时不被处理（REST API导入金融数据场景） | 无fix PR，需复现定位 |
| [#6612](https://github.com/agentscope-ai/QwenPaw/issues/6612) | **qwenpaw 2.0.1与agentscope 2.0.4.post1不兼容**：proactive子系统崩溃+工具权限死锁（Msg.content类型断言失败） | [PR #6615](https://github.com/agentscope-ai/QwenPaw/pull/6615)仅覆盖config加载部分，未全量解决 |

### 🟡 中严重度

| Issue | 问题 | 状态 |
|---|---|---|
| [#6726](https://github.com/agentscope-ai/QwenPaw/issues/6726) | 长会话20-30+轮工具调用后，400 “tool role must be response to tool_calls” | 无fix PR |
| [#6755](https://github.com/agentscope-ai/QwenPaw/issues/6755) | 跨天长会话中模型对“今天日期/星期”判断错乱，日程任务定错日期（实际案例：周五日程被定到周六） | 无fix PR，模型侧+框架侧均需干预 |
| [#6760](https://github.com/agentscope-ai/QwenPaw/issues/6760) | 升级2.0.1后`qwenpaw task`命令行报错（sandbox不可用） | 已关闭，需确认是文档问题还是代码回退 |

### 🟢 低严重度 / 体验类

| Issue | 问题 | 状态 |
|---|---|---|
| [#6762](https://github.com/agentscope-ai/QwenPaw/issues/6762) | 桌面版工具调用块中长shell命令不换行（CodeMirror缺lineWrapping） | 已关闭，UI细节问题 |
| [#6731](https://github.com/agentscope-ai/QwenPaw/issues/6731) | `execute_shell_command`传入`sandbox_config`时崩溃（dataclass replace错误） | 已关闭 |
| [#6775](https://github.com/agentscope-ai/QwenPaw/issues/6775) | **Malware Bytes将桌面版标记为木马**，用户已卸载并等待官方回应 | **紧急**：需官方快速澄清误报，否则影响用户信任 |


## 6. 功能请求与路线图信号

- **[MCP 2026-07-28无状态规范支持](https://github.com/agentscope-ai/QwenPaw/issues/6761)** — 协议核心从有状态变为无状态（breaking change），用户询问是否已适配。**这是MCP生态的方向性变化，建议尽快纳入路线图并给出兼容计划。**
- **[可配置MCP工具调用超时](https://github.com/agentscope-ai/QwenPaw/issues/6724)** — `MCPClientConfig`无timeout字段（被Pydantic静默丢弃），慢/挂起的MCP server可无限期阻塞turn。与#6732（MCP工具失效）同属MCP体验短板。
- **[模型fallback+冷却机制 PR #6659](https://github.com/agentscope-ai/QwenPaw/pull/6659)** — 主模型因限流/超时/服务错误失败时自动切换，带冷却避免反复命中故障节点（fixes #2199/#1327/#2089）。该PR已在Review阶段，预计是下个版本高价值特性。
- **[Embedding配置体系（PR #6772）](https://github.com/agentscope-ai/QwenPaw/pull/6772)** — 统一模型工厂+真实连通性验证+运行时状态展示，补齐ReMe记忆的配置链路。配合文档PR #6771，属于记忆模块的体验升级。
- **[微信审批支持中文操作](https://github.com/agentscope-ai/QwenPaw/issues/6728)** — 审批通知已通，但Approve/Deny仍是英文标签；[用户Chrome标签生命周期可配置](https://github.com/agentscope-ai/QwenPaw/issues/6770) — 当前跨响应周期标签固定存活，希望可配置。均为典型的本地化/个性化小需求，实现成本低、社区感知好。
- **[欧盟语言支持（匈牙利语）](https://github.com/agentscope-ai/QwenPaw/issues/6765)** — 非开发者的热情用户请求，优先级低但代表了非英语社区的期待。
- **[会话标题优化（#6736、#6737）](https://github.com/agentscope-ai/QwenPaw/issues/6736)** — 多位用户吐槽自动生成的标题“无参考价值”，且与竞品（Hermes）对比差距明显。UI/UX层面呼声高，适合快速迭代。 |


## 7. 用户反馈摘要

- **“自建服务用户”是核心贡献群体，也是最脆弱的用户群**：Matrix频道用户遇到连接失败只能手动重存（#6684），MCP工具失效只能重启容器（#6732），这两个场景都指向**通道和工具运行时的自愈能力不足**，且用户在issue中给出了非常具体的复现步骤和环境信息。
- **长会话场景是当前体验最大的痛点**：跨天日期错乱（#6755）、空响应不报错（#6601）、tool消息400（#6726）三连击，让长期使用的用户感到“框架层问题”导致的无力感。有用户反馈“会话中彻底失去响应”，属于**P0级体验损伤**。
- **真实生产场景**：#6768显示有用户通过REST API导入财务记录，agent在多步骤任务后进入数小时无响应，说明项目已被用于**严肃的数据处理工作流**，稳定性直接关系业务结果。
- **安全信任危机**：#6775用户被杀软误报后已卸载并表示等待官方回应，虽然语气友善（“I love your work”），但误报若不及时澄清，会造成实际用户流失。
- **积极信号**：社区用户对MCP无状态规范、Embedding配置等新特性保持敏锐关注，提问质量高，且愿意提供详细日志和对比测试（如#6687 OpenRouter多模态探测覆盖问题、#6707/#6708的SSE流式错误重试），说明**开发者社区的专业度和参与度在提升**。


## 8. 待处理积压

| 项目 | 类型 | 创建时间 | 说明 |
|---|---|---|---|
| [#6557](https://github.com/agentscope-ai/QwenPaw/issues/6557) MCP工具名以`-`开头导致Kimi 400 | Bug | 2026-07-29 | 8天未修复，严格校验的LLM API（Kimi）直接拒绝请求，影响MCP生态可用性 |
| [#6564](https://github.com/agentscope-ai/QwenPaw/pull/6564) fix(memory): flush pending turns before compression | PR | 2026-07-30 | 补齐Scroll自动压缩前pending turns刷新的关键gap，已进Review但连续8天未被合并 |
| [#6659](https://github.com/agentscope-ai/QwenPaw/pull/6659) 模型fallback+冷却机制 | PR | 2026-08-03 | 用户呼声高（关联3个issue），建议加快Review并纳入下个版本 |
| [#6476](https://github.com/agentscope-ai/QwenPaw/issues/6476) Matrix端到端加密不可用 | Bug | 2026-07-26 | 12天前报告，matrix-nio需olm但自装失败，用户手动执行三步后仍不可用，已关闭但未见官方替代方案 |
| [#6452](https://github.com/agentscope-ai/QwenPaw/issues/6452) 取消“未检测到多模态能力”粗暴提示 | Enhancement | 2026-07-24 | 14天未处理，UI体验类问题，实现成本低 |

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-07

## 1. 今日速览

过去 24 小时项目活跃度极高：共产生 500 条 Issue 更新（其中 476 条新开/活跃、24 条关闭）及 500 条 PR 更新（其中 436 条待合并、64 条已合并/关闭），社区讨论与贡献力度处于高位。然而，合并率仅约 12.8%（64/500），大量 PR 仍在排队等待审查。最热门的 Issue 已积累 54 条评论（#7237，输出截断问题，已关闭）与 51 条评论（#78647，god-file 分解史诗任务）。目前无新版本发布，核心仓库仍在 0.20.x 迭代周期内。整体来看，项目处在高并发开发阶段，社区反馈活跃，但 PR 合并速度和积压问题值得关注。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

过去 24 小时共有 64 个 PR 被合并/关闭，其中可见的最重要合入：

- **[#80491] [CLOSED] fix(launchd): stop stranding the gateway label on plist reload (salvage #79868)** — 修复 macOS 网关自更新时 launchd 服务标签残留在 plist 重载后的问题；deferred reload helper 现在会等待旧网关进程真正退出后才引导新进程，并仅在 launchd 报告 supervised PID 时判定重载成功，消除了陈旧注册导致的标签残留。  
  https://github.com/NousResearch/hermes-agent/pull/80491

此外，以下高价值 PR 处于待合并状态，若合入将显著改善稳定性：

- **[#80687] fix(cron): stop jobs.json clobber dropping concurrent creates (#80624)** — 修复网关运行期间通过 CLI 创建的 `no_agent` cron 作业因内存快照覆盖而丢失的问题；`save_jobs` 现在先重读磁盘、合并意外 job id 后再原子写入。  
  https://github.com/NousResearch/hermes-agent/pull/80687

- **[#80696] fix(agent): stop reference-only compaction handoff from becoming the active turn** — 修复压缩（compaction）后 `[CONTEXT COMPACTION — REFERENCE ONLY]` 的 user 角色消息成为唯一活跃用户轮次、导致无人新指令的情况下恢复陈旧任务快照的问题（#80622）。  
  https://github.com/NousResearch/hermes-agent/pull/80696

- **[#80695] fix(gateway): preserve archived compaction history on /retry rewrite (#80216)** — 修复 `/retry` 时 `rewrite_transcript()` 调用 `replace_messages()` 误删所有软归档压缩历史行的问题。  
  https://github.com/NousResearch/hermes-agent/pull/80695

- **[#80647] fix(gateway): multiplex mode no longer aliases per-profile sessions (#64934)** — 在 multiplex 会话键中纳入 Mattermost profile id，确保同一频道各 profile 拥有独立会话。  
  https://github.com/NousResearch/hermes-agent/pull/80647

- **[#80691] fix: derive agent_context from platform for memory provider context-skip (#80646)** — 修复 `agent_context` 被硬编码为 `"primary"` 导致 memory provider（supermemory、honcho）无法跳过 cron/flush/subagent 会话写入的问题。  
  https://github.com/NousResearch/hermes-agent/pull/80691

这些 PR 覆盖了 cron 持久化、会话压缩与恢复、multiplex 会话隔离、内存写入跳过等多个关键稳定性路径，预计合并后将显著降低用户遇到的数据丢失和会话污染问题。

---

## 4. 社区热点

过去 24 小时评论最活跃的 Issue/PR：

- **[#7237] [CLOSED] [Bug]: Error: Response truncated due to output length limit** — 54 条评论、7 👍。使用 CLI 或 Telegram/Discord/Slack 网关生成长文本时频繁报错“输出长度超限导致截断”，影响长文生成场景。该 Issue 已关闭，但评论热度说明长输出处理是用户的刚需。  
  https://github.com/NousResearch/hermes-agent/issues/7237

- **[#78647] [OPEN] Epic: Shard all 20 god files — repo-wide god-file decomposition** — 51 条评论。仓库级大型重构史诗，由 @andrexibiza 发起，列出 20 个 god-file 并逐一分解，核心原则是“所有 god file 必须拆分且永不回退”。这是当前公认的架构债务清零计划，涉及面广、讨论激烈。  
  https://github.com/NousResearch/hermes-agent/issues/78647

- **[#64182] [OPEN] Tracking: Plugin Interface Expansion — community ideas, July 2026** — 27 条评论。追踪社区关于插件接口扩展的提案，目标是让长期排队的 PR 尽快以稳定的公共接口发布，涉及插件生态的下一步演进方向。  
  https://github.com/NousResearch/hermes-agent/issues/64182

- **[#25267] [Feature]: Claude Agent SDK model provider with subscription OAuth (Codex-style)** — 16 条评论但收获了 48 个 👍，是近期需求呼声最高的功能请求：用户希望使用 Claude 订阅（Max/Pro）的 OAuth 凭证运行 Hermes，而无需额外支付 per-token API 费用。  
  https://github.com/NousResearch/hermes-agent/issues/25267

**趋势分析：** 社区讨论集中在三类诉求——（1）长文本生成的可靠性；（2）插件/接口扩展的开放与标准化；（3）模型供应商的计费模式兼容（特别是订阅用户的“双重付费”问题）。此外 god-file 重构的 Epic 获取大量关注，反映出社区对代码健康度的重视度在提升。

---

## 5. Bug 与稳定性

过去 24 小时报告的 Bug/回归按严重程度排列：

### P1（严重）

- **[#69592] /sessions 和 /models 浮层在 ambient widget dock 下不可见 — TUI 无法恢复会话或切换模型；/reload 静默**  
  更新于 2026-08-04，当前为第 13 天未修复。加载 ambient widgets（配额仪表盘，文档推荐的 TUI dock 模式）后，`/sessions`、`/switch`、`/resume` 浮层被遮挡不可见，核心 TUI 工作流被阻断。  
  https://github.com/NousResearch/hermes-agent/issues/69592

### P2（重要）

- **[#78647 系列] god-file 分解明确为仓库级政策** — 涉及 `hermes_cli/auth.py`（9,180 行）、`hermes_state.py`（9,500 行）、`agent/context_compressor.py`（6,789 行）等。已有对应 shard 子 Issue（#78637、#78636、#78645）。  
  https://github.com/NousResearch/hermes-agent/issues/78647 | https://github.com/NousResearch/hermes-agent/issues/78637 | https://github.com/NousResearch/hermes-agent/issues/78636 | https://github.com/NousResearch/hermes-agent/issues/78645

- **[#76886] read_file 将合法 UTF-8 文本误判为二进制** — 当 1000 字节采样恰好截断多字节字符时回归（0.19.1 引入），导致 Obsidian 笔记等纯文本无法打开。  
  https://github.com/NousResearch/hermes-agent/issues/76886

- **[#77780] lifecycle_guard 因 `ValueError: embedded null byte` 崩溃，所有终端命令不可用** — cron/lifecycle_guard.py 扫描引用 heredoc/`-c` payload 路径时未处理 null 字节，崩溃传播至所有终端命令。已有讨论但未见对应 fix PR。  
  https://github.com/NousResearch/hermes-agent/issues/77780

- **[#69078] xAI grok-4.5 对有效 PNG 报 400 错误，永久损坏会话** — 原生视觉工具结果进入历史后，每次 API 调用（包括纯文本轮次）都返回 400，重启网关也无法恢复，只能删除会话。xAI 变体的 #25837 同类问题。  
  https://github.com/NousResearch/hermes-agent/issues/69078

- **[#52010] macOS 桌面版每次更新后 "完全磁盘访问"（FDA）权限被撤销** — 用户需每次手动在系统设置中重新授权，更新流程未保留 TCC 权限。  
  https://github.com/NousResearch/hermes-agent/issues/52010

- **[#29849] `no_agent=True` 的 cron 脚本忽略 `terminal.backend`，始终在调度器本机执行** — 远程 SSH 后端下的脚本执行位置错误，影响用 `terminal()` 写入远程文件系统的自动化任务。  
  https://github.com/NousResearch/hermes-agent/issues/29849

- **[#73082] 桌面版 Renderer/GPU 进程空闲时 100%+ CPU 旋转** — Electron 渲染循环导致高耗电、机身发热，重启才能缓解。同类 #53902（fontations+temporal_rs 循环，GPU 98%）。  
  https://github.com/NousResearch/hermes-agent/issues/73082 | https://github.com/NousResearch/hermes-agent/issues/53902

- **[#77277] Windows 桌面版应用内更新无限循环** — 更新程序将自身重新生成的 backend 进程视为“占用安装目录”的阻碍，手动杀 PID 无效。  
  https://github.com/NousResearch/hermes-agent/issues/77277

- **[#58619] 桌面版重连时生成无上限 serve 进程，旧进程不清理** — 建议添加 `--replace` 语义。  
  https://github.com/NousResearch/hermes-agent/issues/58619

- **[#67026] 桌面版重启后积累僵尸 profile serve 进程，发现 47 个孤儿进程**  
  https://github.com/NousResearch/hermes-agent/issues/67026

### 有 fix PR 的 Bug

- cron jobs.json 丢失（#80624）→ **PR #80687 待合并**  
  https://github.com/NousResearch/hermes-agent/pull/80687

- agent_context 硬编码导致 memory 写入逻辑失效（#80646）→ **PR #80691 待合并**  
  https://github.com/NousResearch/hermes-agent/pull/80691

- compaction reference-only 消息变为活跃轮次（#80622）→ **PR #80696 待合并**  
  https://github.com/NousResearch/hermes-agent/pull/80696

- /retry 删除归档压缩历史（#80216）→ **PR #80695 待合并**  
  https://github.com/NousResearch/hermes-agent/pull/80695

- multiplex 模式的 profile 会话串线（#64934）→ **PR #80647 待合并**  
  https://github.com/NousResearch/hermes-agent/pull/80647

- 桌面版 0.20.0 状态栏默认隐藏（#79407）→ **PR #80697 待合并**  
  https://github.com/NousResearch/hermes-agent/pull/80697

---

## 6. 功能请求与路线图信号

过去 24 小时出现的新功能请求与路线图信号：

- **[#80424] Grok/xAI Feature Parity & Alignment Campaign — meta-issue**（新开，9 条评论）：将 Hermes 的 Grok/xAI 能力与官方 xAI 开发平台全面对齐（Chat/Responses、Function calling、Reasoning、Streaming、Imagine、Voice/TTS），线索明显——xAI 方向正在系统化推进。  
  https://github.com/NousResearch/hermes-agent/issues/80424

- **[#25267] Claude Agent SDK model provider with subscription OAuth**（48 👍，高呼声）：用户不愿为订阅用户双重付费，希望复用 Claude Max/Pro 订阅进行 OAuth 认证。关联 [#40014]（已关闭）显示 Claude Code OAuth 仍走 per-token 端点。此需求若落地，将大幅降低 Claude 用户的使用成本。  
  https://github.com/NousResearch/hermes-agent/issues/25267

- **[#16004] Configurable bounded auto-continue when max tool-call iterations are reached**：达到工具调用预算后，允许配置自动继续（而非停止等待人工），对 ACP/VS Code 和长会话网关场景有实际价值。  
  https://github.com/NousResearch/hermes-agent/issues/16004

- **[#34352] Solving the Multi-Tenant Hermes Problem**：memory 操作绕过 hook 系统导致无法租户隔离，生产环境已有数月修复方案，社区期待合并入核心。  
  https://github.com/NousResearch/hermes-agent/issues/34352

- **[#80450] delegate_task 固定 provider/model 被运行时继承的父级 fallback 链覆盖**（新开 6 条评论）：固定委派的 provider/model 在 spawn 后未生效，子代理无条件继承父代理的 fallback 链。  
  https://github.com/NousResearch/hermes-agent/issues/80450

**路线图信号（来自新增 PR）：**

- **[#80685] 移植 grok-cli 的 per-workspace trust store**（未信任 → 强制 manual 审批，只收紧不放宽）→ 安全加固方向。  
  https://github.com/NousResearch/hermes-agent/pull/80685

- **[#80686] 移植 grok-cli 的 verify 子系统**（run-recipe 检测 + 环境清单 + `hermes verify` 冒烟测试）→ 工程效率方向。  
  https://github.com/NousResearch/hermes-agent/pull/80686

- **[#80692] 将 skills 路由到配置的 provider/model**（frontmatter 声明路由，覆盖 CLI/网关/TUI/桌面/隔离计算宿主）→ 技能路由灵活性方向。  
  https://github.com/NousResearch/hermes-agent/pull/80692

- **[#80689] 从 MCP 内容中剥离不可见 Unicode TAG 字符**（ASCII smuggling 提示注入防护，移植自 block/goose#10746）→ 安全方向。  
  https://github.com/NousResearch/hermes-agent/pull/80689

- **[#80533] webhook 完成脚本**（异步 agent 运行成功后调用外部脚本）→ 集成扩展方向。  
  https://github.com/NousResearch/hermes-agent/pull/80533

可见下一版本在安全加固（trust store、MCP 消毒）、工程化（verify、webhook 脚本）、模型供应商兼容（Claude OAuth、xAI parity）三条线上均有动作。

---

## 7. 用户反馈摘要

从近期 Issue 评论中提炼的真实用户痛点与场景：

- **长文本输出被截断（#7237）**：CLI 和 Telegram/Discord/Slack 网关中生成较长回复时频繁中断，用户需要在多个平台反复重试。该问题在 4 月创建、8 月关闭，期间大量用户参与确认，说明长文生成是重度用户的日常高频场景。

- **升级后笔记文件无法读取（#76886）**：用户升级到 0.19.1 后，Obsidian 中纯 UTF-8 Markdown 笔记被误判为二进制文件。“它们是纯文本，更新前完全正常”——回归类 bug 对用户信任打击明显。

- **macOS 权限在每次更新后被撤销（#52010）**：“每次 Hermes Desktop 更新后都必须重新去系统设置里授予完全磁盘访问权限”——桌面更新流程未保留 macOS TCC 权限，影响自动化工作流的中断体验。

- **会话被永久损坏（#69078）**：xAI 视觉结果进入历史后，任何 API 调用都返回 400，重启网关无效，唯一恢复办法是删除整个会话。用户评论中形容“会话被永久 brick”，该问题直接导致对话上下文全部丢失。

- **桌面版 CPU 耗尽（#73082/#53902）**：空闲时 Renderer/GPU 进程占用 50–100% CPU，macOS 电池报告将 Hermes 列为最高能耗应用，机器发烫。用户对桌面客户端的资源占用表达了强烈不满。

- **TUI 核心工作流中断 13 天（#69592）**：默认文档推荐的 ambient widget 加载后 `/sessions` 和 `/models` 不可见，“无法恢复会话、无法切换模型”——核心交互功能长时间不可用，社区抱怨情绪明显上升。

- **多租户场景的真实需求（#34352）**：用户在评论中表示已在生产环境运行修复方案数月，管理多个不同上下文的多租户代理。这说明 Hermes 已出现真实的企业级多租户部署需求，而核心尚未支持。

---

## 8. 待处理积压

以下 Issue/PR 长期未解决或已获得关注但停滞，提醒维护者关注：

- **[#34352] Solving the Multi-Tenant Hermes Problem** — 2026-05-29 创建，16 条评论，生产环境修复方案已就绪，等待核心决策。  
  https://github.com/NousResearch/hermes-agent/issues/34352

- **[#52010] macOS FDA 权限每次更新后被撤销** — 2026-06-24 创建，16 条评论，跨 6 周未修复，桌面端更新流程体验受损。  
  https://github.com/NousResearch/hermes-agent/issues/52010

- **[#69592] TUI /sessions 与 /models 不可见（P1）** — 2026-07-22 创建，已持续 13 天+，影响所有使用 ambient widget 的 TUI 用户。  
  https://github.com/NousResearch/hermes-agent/issues/69592

- **[#29849] `no_agent=True` cron 脚本忽略 `terminal.backend`** — 2026-05-21 创建，14 条评论、3 👍，远程后端场景的 cron 任务无法按配置执行。  
  https://github.com/NousResearch/hermes-agent/issues/29849

- **[#10251] 飞书（Feishu）命令审批卡片按钮报错 200340** — 2026-04-15 创建，9 条评论；同类的 [#7675]、[#13924] 也指向同一问题（错误码 200340/220340），4 月至今未修复，影响飞书平台的所有命令审批操作。  
  https://github.com/NousResearch/hermes-agent/issues/10251 | https://github.com/NousResearch/hermes-agent/issues/7675 | https://github.com/NousResearch/hermes-agent/issues/13924

- **[#7675] 飞书卡片交互事件被当作 `/card` 命令、审批按钮无效、流式卡片回复不支持** — 2026-04-11 创建，8 条评论，三个子问题均未解决。  
  https://github.com/NousResearch/hermes-agent/issues/7675

- **[#77780] lifecycle_guard 因 embedded null byte 崩溃，阻断所有终端命令** — 2026-08-03 创建，16 条评论，无 fix PR 链接。  
  https://github.com/NousResearch/hermes-agent/issues/77780

- **[#73082] 桌面版 Renderer/GPU 空闲 CPU 100%+** — 2026-07-28 创建，与 #53902（6-28 创建）疑似同源渲染循环问题，均无对应 fix PR。  
  https://github.com/NousResearch/hermes-agent/issues/73082 | https://github.com/NousResearch/hermes-agent/issues/53902

---

**项目健康度总结：** Hermes Agent 当前社区活跃度极高（日均 500+ Issue/PR 更新），修复型 PR 数量充足且覆盖面广，但 PR 合并率偏低、多个 P1/P2 级 Bug 悬而未决（特别是 TUI 工作流中断已超 13 天）、飞书平台问题积压超 3 个月未响应。建议维护者优先处理 P1 TUI 回归与飞书审批链路，同时加快已就绪 fix PR（#80687、#80695、#80696、#80647）的审查合并，以巩固社区信心。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-08-07

## 今日速览

过去 24 小时内，AstrBot 项目共产生 16 条 Issue 动态（11 条活跃/新开、5 条关闭）和 9 条 PR 动态（8 条待合并、1 条已合并），无新版本发布。项目整体活跃度稳定，社区围绕**插件市场安全检查失败**和**WebUI/ChatUI 体验问题**形成了较为集中的反馈；同时，一个持续两个月的 P0 级别崩溃问题（#8546）已于昨日关闭，反映了维护团队在核心稳定性问题上的收敛。今日值得关注的信号是：多个功能型 PR 进入待合并状态（包括 OpenAI Responses 原生工具支持、ChatUI 拖拽上传热区扩展），表明项目在功能迭代上仍在持续推进。

---

## 版本发布

过去 24 小时内无新版本发布。Issue 中提及的当前版本为 v4.27.1/v4.27.2（Docker 部署为主）。

---

## 项目进展

### 已合并/关闭

- **docs: add Windows Docker Desktop deployment guide**（[#9339](https://github.com/AstrBotDevs/AstrBot/pull/9339)）：新增 Windows 用户通过 Docker Desktop 部署的完整指南，覆盖 CMD 与 PowerShell 两种环境下的命令差异（`%cd%` 与 `${PWD}`），并补充 TZ 环境变量的 IANA 格式说明。这是今日唯一被合并的 PR，解决了 Windows 用户在部署环节的长期配置痛点。

### 值得关注的待合并 PR

- **feat: support native tools in OpenAI Responses provider**（[#9554](https://github.com/AstrBotDevs/AstrBot/pull/9554)，size:L）：为 OpenAI Responses API 接入原生工具支持（web_search、file_search、code_interpreter、image_generation、tool_choice），并增加对应的 Dashboard 配置项。这是对 provider 能力的重要扩展，关联 #9530。
- **feat(session_waiter): allow session_waiter handler to return MessageEventResult**（[#9551](https://github.com/AstrBotDevs/AstrBot/pull/9551)，size:M）：修改 `SessionWaiter.trigger` 使其返回 handler 的返回值，并同步调整内置控制 Agent 的处理逻辑，解决 #9548。改动涉及 3 个核心文件，属于非破坏性变更。
- **feat: add download-count sorting to plugin marketplace**（[#9570](https://github.com/AstrBotDevs/AstrBot/pull/9570)，size:M）：为插件市场增加按下载量排序的选项，直接回应用户对插件发现效率的诉求。
- **feat: expand webchat drag-and-drop upload to the whole chat area**（[#9564](https://github.com/AstrBotDevs/AstrBot/pull/9564)，size:L）：将 ChatUI 拖拽上传热区从底部输入栏扩展至整个聊天区域，与今日新开的 Issue #9561 形成呼应。

---

## 社区热点

### 1. 插件市场“自动安全检查失败”问题集中爆发

- [#9574](https://github.com/AstrBotDevs/AstrBot/issues/9574)（新开）：“把插件上传到新插件站显示安全检查失败，试了好几次都不行”
- [#9566](https://github.com/AstrBotDevs/AstrBot/issues/9566)（活跃）：“上传插件到astrbot插件市场时，连续多次出现'自动安全检查失败'”
- [#9526](https://github.com/AstrBotDevs/AstrBot/issues/9526)（已关闭）：“在新插件站发布插件报错”（origin server 返回 Cloudflare 无效响应）

三位不同的插件开发者/用户在过去两天内分别报告了同类问题，指向新插件站（cloud.astrbot.app）的安全检查服务存在稳定性或配置缺陷。这是当前社区反馈最集中的技术问题，且已影响到插件生态的发布流程，建议优先排查。

### 2. P0 崩溃问题关闭但处理周期值得关注

- [#8546](https://github.com/AstrBotDevs/AstrBot/issues/8546)（已关闭）：当 LLM 调用工具时把 `function.name` 设置为 `None` 会触发崩溃。该问题自 2026-06-03 创建至 2026-08-06 关闭，历时约两个月，累积 10 条评论。虽然已关闭，但作为 P0 级别问题，处理周期偏长。

### 3. WebUI 深色模式颜色异常（已修复）

- [#9521](https://github.com/AstrBotDevs/AstrBot/issues/9521)（已关闭）：v4.27.1 深色模式下侧栏文字颜色显示为 #80CBC4，与背景对比过强，影响可读性。该问题在 4 天内从报告到关闭，响应速度良好。

---

## Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 状态 |
|--------|-------|------|------|
| 高 | [#9572](https://github.com/AstrBotDevs/AstrBot/issues/9572) | SQLAlchemy 异步引擎连接池单一，且绑定在主事件循环上，高并发时 `sp.get` 等同步方法跨循环访问队列会导致 `RuntimeError: Queue ... is bound to a different event loop` | 新开，无 fix PR |
| 高 | [#9573](https://github.com/AstrBotDevs/AstrBot/issues/9573) | UMO 专属配置的 `max_context_length` 由于逻辑短路不生效，实际上下文无限增长；报告者提供了根因代码和修复建议 | 新开，无 fix PR |
| 中 | [#9567](https://github.com/AstrBotDevs/AstrBot/issues/9567) | ChatUI 新会话的第一条消息在侧栏会话列表中闪烁出现、AI 回复完成后消失 | 新开，无 fix PR |
| 中 | [#9565](https://github.com/AstrBotDevs/AstrBot/issues/9565) | QQ 群内引用小程序卡片消息时，bot 无法读取被引用的内容（OneBot/NapCat 4.18.14） | 新开，无 fix PR |
| 中 | [#9562](https://github.com/AstrBotDevs/AstrBot/issues/9562) | 插件被禁用后，“管理行为”中的指令仍显示为“已启用”状态，与实际行为不符 | 新开，无 fix PR |
| 低 | [#9521](https://github.com/AstrBotDevs/AstrBot/issues/9521) | WebUI 深色模式侧栏文字颜色异常 | 已关闭 |

此外，两个知识库相关的修复 PR（[#9576](https://github.com/AstrBotDevs/AstrBot/pull/9576)、[#9575](https://github.com/AstrBotDevs/AstrBot/pull/9575)）今日提交待合并，分别解决搜索请求竞态与加载错误与空状态混淆的问题，属于预防性稳定性改进。

---

## 功能请求与路线图信号

### 高概率进入下一版本

- **ChatUI 拖拽上传热区扩展**：用户请求 [#9561](https://github.com/AstrBotDevs/AstrBot/issues/9561) 与 PR [#9564](https://github.com/AstrBotDevs/AstrBot/pull/9564) 一一对应，功能已在实现中。
- **插件市场按下载量排序**：PR [#9570](https://github.com/AstrBotDevs/AstrBot/pull/9570) 已提交待合并，直接满足用户对插件发现效率的需求。
- **OpenAI Responses 原生工具支持**：PR #9554 覆盖 web_search/file_search/code_interpreter/image_generation 等能力，属于对 provider 层的重大增强。

### 讨论中、暂未进入实现

- **区分 Agent 执行模型和回复模型**（[#9569](https://github.com/AstrBotDevs/AstrBot/issues/9569)，已关闭）：用户反馈当前 Agent 使用同一模型存在“乱用工具”问题（尤其是深度求索模型），希望支持单独设置 Agent 执行模型。虽然 Issue 已关闭，但诉求明确，具备产品价值。
- **全局 LLM 不回复前缀配置**（[#9563](https://github.com/AstrBotDevs/AstrBot/issues/9563)）：多 Bot 共存的群聊场景下，希望支持配置 `/ ! .` 等前缀使 LLM 直接跳过处理。该建议契合多实例部署的实际需求。
- **恢复原始图片 URL 获取**（[#9034](https://github.com/AstrBotDevs/AstrBot/issues/9034)）：社区成员建议在保留图片有效期限定的同时，恢复直接获取图片 URL 的能力，以满足 Discord embed 等场景的刚需。

---

## 用户反馈摘要

- **对新版 WebUI 的不满情绪较强**：#9571 中用户直言“新界面是哪个天才搞的？丑，设置不方便，配置文件没法修改了”，反映出 v4.27.x 的 WebUI 改版在部分用户群体中引起了较大的使用习惯冲突，且配置文件入口的调整影响到了高级用户的操作流程。该 Issue 虽被标记为 Feature，但实质是 UI 回归投诉，值得维护团队关注。

- **技术型用户积极贡献问题根因**：#9573 的报告者不仅描述了 `max_context_length` 不生效的现象，还定位到了 `_decorate_llm_request()` 中的短路逻辑，并给出了具体的修复方向；#9572 同样附带了详细的修复建议。这类深度参与的社区反馈有助于加速问题解决，社区整体技术氛围健康。

- **插件开发者的生态痛点**：三位不同的插件作者/维护者（[#9574](https://github.com/AstrBotDevs/AstrBot/issues/9574)、[#9566](https://github.com/AstrBotDevs/AstrBot/issues/9566)、[#9526](https://github.com/AstrBotDevs/AstrBot/issues/9526)）均遭遇了插件市场上传/安全检查失败的问题，且错误的提示信息不明确，导致反复尝试仍无法解决。这表明插件市场的错误反馈机制和检查服务稳定性都有改进空间。

---

## 待处理积压

维护者可能需要关注以下长时间未闭合或等待响应的条目：

- **#9034 Preserve original im image url**（[链接](https://github.com/AstrBotDevs/AstrBot/issues/9034)）：创建于 2026-06-26，已有 👍 1，昨日仍有更新。涉及图片 URL 获取策略的变更讨论，属于消息平台适配层的设计取舍，建议维护者给出明确结论或排期。

- **#9445 feat: register Discord command groups**（[链接](https://github.com/AstrBotDevs/AstrBot/pull/9445)）：PR 自 2026-07-29 提交后长期处于 Draft 状态，等待维护者反馈。涉及 Discord 应用命令的注册机制调整，关联 #9258，搁置时间已超过一周。

- **#8546 P0 崩溃问题的处理周期反思**（[链接](https://github.com/AstrBotDevs/AstrBot/issues/8546)）：虽然已关闭，但该 P0 问题从报告到修复花费约 2 个月。建议维护团队复盘 P0 问题的响应流程，评估是否需要为高严重度问题设置更短的 SLA。

---

*数据来源：AstrBot GitHub 仓库（github.com/AstrBotDevs/AstrBot），统计窗口为 2026-08-06 至 2026-08-07。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*