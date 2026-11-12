# OpenClaw 生态日报 2026-11-12

> Issues: 475 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-12 02:35 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 · 2026-11-12

---

## 1. 今日速览

项目今日维持**高热度运转**：24 小时内 Issues 更新 475 条、PR 更新 500 条，其中待合并 PR 高达 316 条，显示贡献者提交速度明显高于维护者审阅吞吐，合并侧出现积压信号。新版本 `v2026.11.5-beta.2` 发布，核心亮点是长对话的分页历史与归档读取能力。今日社区讨论高度集中于**插件捕获导致的 Gateway 阻塞/内存膨胀**、**Windows 服务可靠性**、**claude-cli 后端会话丢失**三大主线问题；同时 P0 级新问题（#194664 Codex 受保护续接阻塞后续对话）持续升温，需重点关注。整体判断：**迭代活跃、但稳定性议题与 PR 审阅压力并存**。

---

## 2. 版本发布

### 🚀 v2026.11.5-beta.2（最新 Beta）

**Highlights：**

- **长对话分页浏览**：长会话现在支持双向分页历史、可见的历史边界与有界归档读取（#188450 #188483 #188557 #188372 #190690），作者 @steipete，感谢 @xydt-tanshanshan 的贡献。
  - **影响面**：这是会话体验层面的一次结构调整，主要面向历史超长、消息量巨大的用户场景。
  - **迁移注意**：涉及历史读取边界语义变化，建议依赖 `chat.history` 分段翻页的下游集成方回归验证分页游标行为。
- **macOS 应用保留已保存的密钥**：（Release 说明被截断，从上下文推断为 macOS 端 secret 存储/恢复能力修复）——建议 macOS 用户在升级后验证已保存的 token / 凭据是否仍可正常读取。

> ⚠️ 本版本为 **beta**，暂不建议生产环境直接升级；关注后续正式版是否附带破坏性配置变更。

---

## 3. 项目进展

今日 PR 侧呈现**“大范围 UI 打磨 + 网关稳定性加固”**双主线：

### 已关闭/合并（184 条中代表性项）
- **#197326 [CLOSED] fix(models): 将纯类型化模型移出聊天选择器** — @obviyus
  修复 Decision-only 模型（如 `typesafe/jev-latest`）在 Control UI 中显示为“Sign-in needed”的误导问题。
  https://github.com/openclaw/openclaw/pull/197326
- **#197321 [CLOSED] fix(usage): 优先采用托管目录价格计费** — @obviyus
  修复已是 bundled 定价的模型仍按捆绑价计费、忽略活跃托管目录价格的计费偏差（示例：`openai/gpt-5.6-luna` 单次实际应为 $0.0249845 量级）。
  https://github.com/openclaw/openclaw/pull/197321
- **#193311 [CLOSED] fix(whatsapp): 群元数据缓存过期改为按实际经过时间判定** — @SunnyShu0925
  修复系统时钟回拨（NTP 校正/容器同步）导致缓存死锁的问题。
  https://github.com/openclaw/openclaw/pull/193311
- **#197459 [CLOSED] fix(infra): 为 sqlite worker 冷启动阶段加观测耗时** — @roboclaw-bot
  针对 SIGUSR2 关闭测试偶发超时的定位能力增强，无用户可见变化。
  https://github.com/openclaw/openclaw/pull/197459

### 待合并重点（316 条中高价值候选）
- **#197456 [P2] fix(gateway): 防止陈旧回复命中被复用的 question ID** — @WindriderQc（安全敏感，需安全评审）
  https://github.com/openclaw/openclaw/pull/197456
- **#197427 [P2] fix: RPC writer claim 之后最终投递保留恢复托管** — @vincentkoc（不涉及 schema/DDL 变更）
  https://github.com/openclaw/openclaw/pull/197427
- **#196706 [P1] fix(state): K8s fsGroup 重挂载后修复私有状态存储** — @shuisadev
  https://github.com/openclaw/openclaw/pull/196706
- **#197455 fix(gateway): 避免锁轮询阻塞请求** — @steipete
  修复 Gateway 请求与定时器同步重开 ownership 锁文件时被文件系统 stall 阻塞事件循环。
  https://github.com/openclaw/openclaw/pull/197455
- **#197301 [P2] perf(worktrees): main 前进时预热模板** — @steipete
  https://github.com/openclaw/openclaw/pull/197301
- **#197448 [P2] fix: 跨共享 Git 历史批量内容搜索** — @steipete
  解决共享 blobless worktree 中绕过 #197259 历史预取导致的海量惰性抓取。
  https://github.com/openclaw/openclaw/pull/197448
- **#197474 feat(exec): macOS 上跨 Gateway 重启保留持久后台命令** — @daniel-lxs
  https://github.com/openclaw/openclaw/pull/197474
- **#197469 feat(agents): sessions_spawn 支持定向到已配对设备** — @daniel-lxs
  https://github.com/openclaw/openclaw/pull/197469
- **#197471 feat(workboard): 记录可选的 claims/observations/verification** — @daniel-lxs
  https://github.com/openclaw/openclaw/pull/197471

### 推进评估
今日项目**向前迈进的幅度中等偏上**：UI 侧通过 @roboclaw-bot 一次性提交约 8 个 macOS 字体平滑修复 PR（#197470 #197472 #197475 #197476 #197477 #197478 #197479 等），系统性修复阅读面渲染一致性；网关稳定性侧 @steipete 集中处理锁、worktree 模板、Git 抓取等底层性能问题。但**合并侧仍以小型修复为主**，两个 XL 级功能（#197466 inline command trail、#197467 插件主题预览）仍待审。

---

## 4. 社区热点

| Issue/PR | 评论 | 关注点 |
|---|---|---|
| **#160959** [P0] Gateway blocks for minutes while capturing large external plugins（2026.9.6 回归） | **81** | 插件捕获阻塞事件循环 |
| **#164294** [P2] Gateway state DB WAL auto-checkpoint never completes | 40 | WAL 检查点被进程内 reader 钉住 |
| **#170956** [P0] Windows slow startup / unclean plugin shutdown / schtasks permission | 31 | Windows 服务化可靠性 |
| **#166634** [CLOSED] Late reclamation commit checkpoint failure leaves agent unavailable | 28 | 崩溃恢复后 agent 永久不可用 |
| **#162585** [P2] Windows plugin source-capture staging 永不收敛 | 16 | 插件源捕获+Windows 双重问题 |
| **#125764** [P1] Telegram 出站一次性 dead-letter | 14 | 消息静默丢失 |
| **#145309 / #144809** [P1] claude-cli 会话与长回合回复丢失 | 各 14 | CLI 后端会话状态一致性 |

**诉求分析：**
1. **“插件捕获”成为 Top 级结构性问题**：#160959（阻塞分钟级）与 #162585（Windows 包体线性膨胀 290MB→612MB）指向同一根因族——插件生成捕获（#144252 引入）在大型依赖树场景下缺少增量与边界控制，**建议将其作为下一个重要版本的系统性治理项**。
2. **Windows 是当前最不稳定的平台**：慢启动、插件未干净关闭、`schtasks` 权限错误三者叠加，使“重启/更新”成功率显著偏低，直接影响 Windows 端的用户留存。
3. **消息投递可靠性是跨渠道共性痛点**：Telegram (#125764 #178717)、claude-cli (#144809 #191818) 均出现“回复静默丢失/after 单次尝试即 dead-letter”的案例，用户对**“没有重试、没有可见错误”**的反馈尤其强烈。

---

## 5. Bug 与稳定性

### 🔴 P0 / 崩溃循环 / 发布阻塞
| 编号 | 状态 | 标题 | Fix PR |
|---|---|---|---|
| #160959 | OPEN | Gateway 捕获大型外部插件时阻塞事件循环数分钟（2026.9.6 回归） | 无 |
| #170956 | OPEN | Windows 慢启动、插件关闭不干净、schtasks 权限错误 | 无 |
| #146791 | OPEN | App Store iOS 2026.9.2 连接但从不发布 APNs relay 注册 | 无 |
| #178441 | OPEN | Owner Telegram 会话被 providerReview 误判身份别名而卡死，无后续动作 | 无 |
| #194664 | OPEN（今日新增关注） | Codex 受保护续接阻止所有后续消息，而 UI Stop 报告无活跃运行（2026.11.1） | 无 |

### 🟠 P1 / 消息丢失 / 会话状态
- **#125764** Telegram 出站一次性 dead-letter，无重试、无告警 — 无 fix PR
- **#144809** claude-cli 长回合（>RUN_STALE_TAKEOVER_MS）丢失整段回复 — 无 fix PR
- **#181432** 2026.10.5 基线 RSS ~1.9GB + SQLite 事务超时 — 无 fix PR
- **#168101** 工具调用后 Rate-limit Retry-After 忽略 `maxRetryDelayMs`，独占会话 lane 整段 sleep — 无 fix PR
- **#191818** 2026.10.10 仍 shipped claude-cli “no recorded inference account”，请求 backport #180492 — 无 fix PR
- **#159638** [已关闭] Gateway 每分钟启动约 7 个短生命 SQLite worker（各 512MB）拉高 CPU — **已关闭**
- **#145690** 子代理完成释放模型运行时 generation，下一 lane 任务 ~15ms 内失败 — 无 fix PR

### 🟡 P2 / 会话与 UX 摩擦
- #164294 WAL auto-checkpoint 永不完成（40 评论，stale）
- #162585 Windows 插件源捕获永不收敛
- #101929 context-overflow 预估器 2.3–2.6x 过度计数
- #172986 WebChat 长路径中截断 + 间歇 payload 变化
- #186973 `/clear` 状态检查渲染数周前的陈旧更新横幅（重启/断电后仍复现）
- #167854 Home 在 20+ 会话有待处理活动时丢弃通知
- #180978 Active Memory 超时熔断器在聊天节奏下永不打开
- #170496 只读 state-DB 每次读取复制完整 SQLite 副本

### ✅ 今日已修复/关闭（值得肯定）
- **#166634** 崩溃恢复后 agent 永久不可用 — 已关闭
- **#159638** SQLite worker churn — 已关闭
- **#179481** `doctor --fix` 拒绝 `transcript-directives` — 已关闭
- **#173095** Control UI 冷启动侧栏为空 — 已关闭
- **#181958** 更新失败 package-doctor — 已关闭（needs-info 关闭）
- **#164907** 分离 cron agentTurn 失败 — 已关闭

> 综合评估：P0 存量 5 项全部 **无修复 PR**，是当前稳定性面板上的最重风险；P1 层消息丢失类问题同样缺少合并中的 fix，**建议优先把 #125764、#144809、#191818 三类归并为“投递可靠性专项”处理**。

---

## 6. 功能请求与路线图信号

| 需求 | 编号 | 结合已有 PR 判断 |
|---|---|---|
| 跨提供商 cron 备用账户显式授权 | #192009 | 高优先级产品决策项，与 provider 抽象紧密相关，**可能进入下一版本会话路由能力** |
| 原生 progress-card SDK + 可信插件准入（Claw Orchestrator） | #176273 | 与 #197029（Advisor 移出 Labs）同源——插件生态治理方向，**下一版本可能预埋 SDK 能力** |
| memory 可按条目自定义分块路径 | #179954 | 与现有 `chunkMarkdown({perEntry})` 已实现能力最接近，**改动面小、最可能被采纳** |
| Android 通知 QoL（会话感知、来源标签、跨设备抑制） | #143387 | 尚无对应 PR，中期待合并 |
| 用 `model.auth_label` 暴露服务该回合的 auth profile 到使用页脚 | #169428 | 与 #197321 计费修复互补，**可能同期纳入** |
| 支持在工具结果之后追加内容的插件钩子 | #164355 | 无 PR，架构层面较深层，短期难落地 |
| Doctor 恢复：对卡住的 requester settle wake 提供运维工具 | #170562 | 与 #179481 已关闭的 doctor 修护形成系列，**可能下一版本续上** |

**路线图信号判断：**
- **“插件能力与生态治理”** 正在成为主线：Advisor 移出 Labs（#197029）、progress-card SDK（#176273）、Workboard claims（#197471）、运行时 skill 使用审计（#141004）共同勾勒出“可信插件 + 可观测性”的下一阶段方向。
- **“多设备/分布式协作”** 初现雏形：#197469 `sessions_spawn` 支持定向配对设备，是与 worktree、durable background exec（#197474）配套的能力铺垫。

---

## 7. 用户反馈摘要

**真实痛点（按强度排序）：**

1. **“没有错误、也没有重试”的静默失败最伤体验**
   - #125764 Telegram 出站消息一次尝试即 dead-letter，“no retry, no user-visible error, no alert”（@ksiyuna-claw）
   - #144876 工具支撑的 dashboard 会话静默结束、无任何可见回复
   - 用户普遍期望：**静默失败必须至少产生一次性可见告警与一次可观测的重试链路**。

2. **重启/更新可靠性是 Windows 与 npm 安装用户的核心挫败点**
   - #170956（@Rene-F：“pas na veel proberen”——多次尝试才成功）、#181662（npm update 期间 Gateway 停机约 19 分钟）、#181958（package-doctor 更新失败）。
   - 使用场景画像：**运维人员、托管网关、公司网络环境**。

3. **长会话与记忆场景下的“最后一公里”缺陷**
   - #144809 长回合丢失整段回复、#141172 首次提交前崩溃会永久泄漏 `agent.run.started`、#186973 状态横幅陈旧数周仍复现——直接影响**“把 OpenClaw 当长期助手”**的信任度。

4. **满意度亮点**
   - 长对话分页历史、macOS 密钥保留获得正面反馈（v2026.11.5-beta.2）；
   - 今日已关闭的 #166634、#159638、#179481 均属用户长期跟踪问题，闭环提升信心。

5. **开发者侧诉求**：希望**插件钩子能覆盖工具结果之后**（#164355）、希望**运行时 skill 使用可审计**（#141004）——反映出插件/Agent 生态进入“要可观测、要可编排”的第二阶段。

---

## 8. 待处理积压（提醒维护者关注）

### 🧊 长期 stale 且高影响
- **#160959**（2026-09-29 起，81 评论，P0，bug 回归 #144252）——回归问题已持续 6 周以上，**最高优先级**。
- **#164294**（2026-10-03，40 评论，P2）——WAL checkpoint 永不完成，直接影响写放大与磁盘增长。
- **#125764**（2026-08-18 起，P1）——跨 3 个月未解决的 Telegram dead-letter，建议**与 #178717 #126xxx 类归并为渠道可靠性专项**。
- **#101929**（2026-07-08 起）——context-overflow 预估器 2.3–2.6x 过度计数，#168338 已合并“对齐 provider 侧”但 issue 仍 OPEN，**建议核实是否可关闭**。
- **#91931**（2026-06-10 起，P1）——预置 SOUL/IDENTITY/USER 导致自动完成 bootstrap 并删 BOOTSTRAP.md，涉及**首次运行流程 + 用户数据丢失**，跨 5 个月未闭环。
- **#132767**（2026-08-29 起，P2）——通用 CLI host 遗漏 assemble-before-prompt，历史 PR #100984 未合并，**架构层长期欠债**。

### 📥 PR 侧积压
- **待合并 PR 316 条**，其中「现在可合并」（status: ready for maintainer look）的有多项（#197427 #196706 #197440 #197288 #197462 等）——建议**本周做一轮 ready-for-look 清理**，防止贡献者热情被消磨。
- **XL 级待审**：#197466（inline command trail）、#197467（插件主题预览）、#141004（skill 使用审计）——每一项都需要 @steipete / @vincentkoc 等核心维护者单独排期，**建议显式标注预期审阅窗口**。
- **安全敏感类**需优先分流：#197456（question ID 复用）、#197474（exec 持久后台命令）均打上 `security-review-required`，不应无限期停留待审。

---

## 附：维护者行动建议（优先级排序）

1. 为 **#160959 / #162585 插件捕获问题** 立项治理，考虑合并成一个“插件捕获边界与增量”大规模改进。
2. 对 **channels 消息可靠性**（#125764 #178717 #144809 #191818）建立专项 track，统一“至少一次重试 + 可见告警 + `/health` 指标”行为。
3. 快速清理 **ready-for-maintainer-look** 类别 PR，缓解 316 条待合并的审阅阻塞。
4. 对 **Windows 平台**建立独立 smoke 矩阵（schtasks、插件关闭、启动耗时），作为发布门禁的一部分。
5. 复查 **#101929** 等已在 main 上修复但仍 OPEN 的 Issue，减少 stale 噪声。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告  
**数据窗口：2026-11-12｜基于所给项目日报摘要**

> 口径说明：Issues/PR 为过去 24 小时“更新数”，不等同于新开数；DeepSeek Harness 未启用 GitHub Issues/PR，以 Discussions 与 Releases 为观测口径。

---

## 1. 生态全景

个人 AI 助手与自主智能体开源生态正处在“**高迭代、强插件化、稳定性债集中暴露**”的阶段。项目普遍从单机对话助手转向多代理协作、插件生态、多租户/多设备与统一网关架构。发布节奏加快，但 PR 审阅吞吐、渠道/插件初始化失败、静默丢消息、安全控制 fail-open 等问题成为共同瓶颈。竞争焦点已从“模型对话能力”转向**插件治理、可靠交付、成本透明、跨平台部署与安全边界**。生态开始分层：平台底座型、轻量自托管型、渠道机器人型、专业开发工作流型并行发展。

---

## 2. 各项目活跃度对比

| 项目 | 今日 Issues | 今日 PR | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 更新 475 | 更新 500；待合并 316 | `v2026.11.5-beta.2` | **超高活跃，审阅积压明显**。插件捕获阻塞、Windows 可靠性、claude-cli 会话丢失等稳定性议题突出；P0 存量 5 项无 fix PR。 |
| **hermes-agent** | 更新 500；新开/活跃 453，关闭 47 | 更新 500；待合并 275，合并/关闭 225 | 无 | **超高活跃，安全响应积极**。`sec-marathon` 集中修复认证/凭据隔离；但统一网关 post-merge 问题、P1 安全/兼容问题与 275 条待合并 PR 构成压力。 |
| **QwenPaw** | 更新 8；活跃/新开 7，关闭 1 | 更新 31；待合并 22，合并/关闭 9 | `v2.3.0` 稳定版 | **高迭代、发布落地**。Piccolo 本地决策模型、agent 插件化、OpenSandbox 推进明显；但飞书/Matrix/Linux 渠道启动回归集中。 |
| **Zeroclaw** | 更新 8；全部 OPEN，零关闭 | 更新 49；待合并 45，合并/关闭 4 | `v0.9.0` | **发布健康，评审瓶颈突出**。首个非 operator 用户登录版本落地；开闭比约 11:1，缺陷响应待加强。 |
| **AstrBot** | 更新 5；活跃 4，关闭 1 | 更新 20；待合并 16，合并/关闭 4 | 无 | **中等活跃，修复响应快**。Telegram per-bot 代理、future_task 修复当日有 PR；但 16 条待合并与长期 PR 形成审查积压。 |
| **PicoClaw** | 变更 4；关闭 3，其中 2 条 stale | 0 | 无 | **低活跃，工程产出空**。PR/Release 双零；安全 Issue #3456 被标 stale，存在被自动关闭风险。 |
| **DeepSeek Harness** | 未启用 Issues/PR；Discussions 更新 185 | — | `dsh-v0.2.2-rc.2` | **高迭代，质量债与数据安全舆情突出**。3 项新功能 + 20 余项优化；但 cookie 堆积、上下文不可恢复、AI 误删目录等问题未见明确修复。 |

**总体判断**：OpenClaw 与 hermes-agent 处于同一流量量级，属于“平台级社区”；QwenPaw、Zeroclaw 处于版本化交付与评审瓶颈并存阶段；AstrBot 小而快；PicoClaw 进入低活跃/流程风险区；DeepSeek Harness 以 RC 高频迭代但质量债需优先清理。

---

## 3. OpenClaw 在生态中的定位

**定位：平台底座型参照项目。** OpenClaw 在功能覆盖、社区规模、插件与网关复杂度上均处于生态前列，是“个人 AI 助手 + 自主智能体 + 多渠道网关”的综合实现。

**优势：**
- **社区规模领先**：Issues 更新 475、PR 更新 500，与 hermes-agent 同属超高流量项目；待合并 316 条，说明贡献者提交速度显著高于维护者审阅吞吐。
- **平台能力完整**：中心化 Gateway、插件捕获、Control UI、长对话分页历史、worktree、durable background exec、`sessions_spawn` 定向配对设备。
- **生态治理先发**：Advisor 移出 Labs、progress-card SDK、Workboard claims、skill 使用审计等信号，表明其正在从“功能堆叠”走向“可信插件 + 可观测性”。
- **版本节奏稳定**：beta 版本持续输出，长对话分页与 macOS 密钥保留获得正向反馈。

**技术路线差异：**
- 对比 **QwenPaw**：OpenClaw 更偏中心 Gateway + 插件运行时；QwenPaw 更强调 Piccolo 本地决策模型、agent 插件化与 OpenSandbox 云沙箱。
- 对比 **Zeroclaw**：OpenClaw 社区更大、插件/多设备能力更复杂；Zeroclaw 更轻量，以 OIDC 多用户、自托管团队共享为切入点。
- 对比 **hermes-agent**：二者均为高流量平台型项目；OpenClaw 更突出 Gateway 插件捕获与多设备/多 worktree，hermes 更突出统一网关、多平台消息接入与 `sec-marathon` 安全加固。
- 对比 **DeepSeek Harness**：OpenClaw 面向通用个人助手与自托管集成；DSH 更聚焦仓库级开发工作流、AgentTeam 与代码审阅。

**主要风险：**
- 插件捕获导致 Gateway 阻塞/内存膨胀（#160959、#162585）是结构性治理项；
- Windows 启动/服务化可靠性、claude-cli 会话丢失、Telegram dead-letter 等静默失败影响信任；
- P0 存量无 fix PR，316 条待合并 PR 对贡献者热情形成消耗。

**结论**：OpenClaw 是生态中功能最全、社区最大、复杂度最高的参照实现之一。其下一阶段的关键不是继续加功能，而是**把插件捕获边界、失败显式化、Windows 发布门禁和 PR 审阅吞吐补齐**。

---

## 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **插件生命周期与失败隔离** | OpenClaw、QwenPaw、PicoClaw、AstrBot、hermes-agent、DSH | OpenClaw 插件捕获阻塞/内存膨胀；QwenPaw 渠道插件启动竞态、多工作区仅首个激活；PicoClaw approval-hook 重初始化失败后 fail-open、MCP 初始化失败导致 agent 挂死；AstrBot 需要统一出站文本预处理钩子与插件市场分类；hermes 插件目录准入、MCP 凭据隔离；DSH 自定义浮层需适配新定位接口。共同指向：插件必须有生命周期状态机、失败隔离、准入与兼容性治理。 |
| **消息/任务投递可靠性** | OpenClaw、Zeroclaw、AstrBot、hermes-agent、DSH | OpenClaw Telegram 一次性 dead-letter、claude-cli 长回合丢失；Zeroclaw 中断 Agent 抹掉工具调用、cron 误报 Ok；AstrBot `future_task` 缺省失败、重复工具调用；hermes Kanban rate-limit 后永久 `blocker_auth`、cron venv 包丢失；DSH 子代理空字符串路由失败、上下文溢出不可恢复。共同诉求：至少一次重试、可见告警、失败状态区分。 |
| **可观测性与健康检查真实性** | OpenClaw、Zeroclaw、PicoClaw、QwenPaw、hermes-agent、DSH | OpenClaw WAL checkpoint 不完成、RSS 膨胀；Zeroclaw `runtime-trace.jsonl` 丢失数小时、shell stderr 为空；PicoClaw `/health` 返回 ok 但 agent loop 挂死；QwenPaw 渠道启动失败；DSH cookie 堆积、SIGSEGV 无显式恢复。共同指向：`/health` 应纳入依赖状态，失败必须显式化。 |
| **多租户/多工作区/多设备权限隔离** | Zeroclaw、QwenPaw、hermes-agent、OpenClaw、DSH | Zeroclaw v0.9.0 支持非 operator 用户 OIDC 登录与 scoped chat；QwenPaw Matrix 多工作区并发启动；hermes multiplex_profiles 密钥泄漏到 secondary profile、Team Gateway Slack BYO app；OpenClaw `sessions_spawn` 定向配对设备；DSH AgentTeam 多层协作。共同需求：账户作用域、并发启动模型、凭据隔离。 |
| **本地模型与成本可控** | QwenPaw、hermes-agent、DSH、OpenClaw、AstrBot | QwenPaw 引入 Piccolo 4B/9B/27B 本地决策模型；hermes 子代理共享 prompt cache、skills index 缓存降 token；DSH Auto 预设隐性全上下文审阅占账单 42%；OpenClaw 修复托管目录计价；AstrBot 将 Gemini thinking tokens 计入 usage。共同趋势：本地/远程路由、usage 计量透明、成本可审计。 |
| **安全边界与 fail-closed** | PicoClaw、hermes-agent、DSH、OpenClaw、Zeroclaw | PicoClaw reload 失败后工具失去审批门禁；hermes `sec-marathon` 集中修复 pairing、SSH、dashboard 凭据、webhook HMAC、MCP 凭据隔离；DSH AI 写插件误删 dsh/zcode 目录；OpenClaw question ID 复用与持久后台命令安全评审；Zeroclaw shell 空 stderr 削弱纠错。共同结论：安全控制失败必须拒绝服务，破坏性操作需确认/沙箱/回滚。 |
| **跨平台真实部署可靠性** | OpenClaw、QwenPaw、hermes-agent、Zeroclaw、DSH、PicoClaw | OpenClaw Windows 慢启动/schtasks 权限；QwenPaw Windows 飞书与 Linux worker 崩溃；hermes Windows/macOS 崩溃与更新循环；Zeroclaw CI 仅 Linux 跑 nextest；DSH Windows 沙箱 DACL 与 Linux 支持缺口；PicoClaw Windows MCP 初始化挂死。共同诉求：CI 矩阵覆盖 Windows/macOS/Linux，作为发布门禁。 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 通用个人 AI 助手、Gateway、插件、多渠道、多设备、worktree/durable exec | 自托管高级用户、集成方、插件贡献者 | 中心化 Gateway + 插件捕获 + Control UI + 多设备会话定向；复杂度最高，生态治理先发。 |
| **hermes-agent** | 统一网关、多平台消息、子代理、cron、Kanban、IDE/ACP、安全加固 | 多平台消息接入、自动化、多 profile 部署用户 | 单 Gateway 集中 turn + 多端 + `sec-marathon` 安全修复集群；强调统一接入与安全隔离。 |
| **QwenPaw** | 本地决策模型、agent 插件化、OpenSandbox、多渠道路由 | 企业内网、多工作区、桌面打包与二次集成用户 | 插件化 agent/channel + Piccolo 本地模型 + 云沙箱；发布节奏强，渠道插件迁移阵痛明显。 |
| **Zeroclaw** | 轻量自托管、多用户 OIDC、Agent 运行时、SOP、cron、通道 | 家庭实验室、团队共享实例、Windows service 部署 | 多用户作用域 + 通道/插件 + Rust 依赖栈；v0.9.0 标志从单人自托管转向多租户形态。 |
| **AstrBot** | 聊天机器人、渠道插件、WebUI、插件市场、Provider | QQ/Telegram 等机器人部署者、插件作者 | 插件/Provider/渠道 + Dashboard；小步快跑，修复响应快，但审查积压。 |
| **PicoClaw** | 轻量 Launcher Web UI、网关、MCP、approval hooks | Windows 本地网关、受管/多人环境 | Go + Web UI + 轻量网关；当前活跃度低，安全 Issue 与 stale 策略风险突出。 |
| **DeepSeek Harness** | 专业开发工作流、Git Worktree 审阅、SubAgent/AgentTeam、桌面端 | 开发者、仓库级工程协作、多代理任务用户 | 桌面 + Web GUI，Releases 驱动，插件生态与 AgentTeam；功能密度高，质量债与数据安全舆情需优先处理。 |

---

## 6. 社区热度与成熟度

| 分层 | 项目 | 阶段判断 |
|---|---|---|
| **超高活跃 / 平台期** | OpenClaw、hermes-agent | 贡献者输入强劲，PR 待合并分别 316 / 275，审阅吞吐成为核心瓶颈；同时 P0/P1 稳定性与安全债并存，处于“快速迭代 + 质量巩固”双重压力期。 |
| **高活跃 / 发布落地期** | QwenPaw、DeepSeek Harness | QwenPaw 发布 v2.3.0，插件化与本地模型落地，但渠道启动回归集中；DSH 以 RC 高频迭代，功能密度高，但 cookie、上下文恢复、误删目录等质量债未清。 |
| **中活跃 / 评审瓶颈期** | Zeroclaw、AstrBot | Zeroclaw v0.9.0 发布健康但开闭比 11:1；AstrBot 修复响应快但 16 条待合并。二者均需提升评审吞吐，避免小修复积压。 |
| **低活跃 / 流程风险期** | PicoClaw | PR/Release 双零，Issue 关闭主要依赖 stale 自动清理；安全类 #3456 被 stale 标记，存在被静默结案风险。属于维护静默期而非质量巩固期。 |

**成熟度判断：**
- **平台型项目**（OpenClaw、hermes-agent）功能最成熟、社区最大，但复杂度最高，稳定性与安全治理决定下一阶段口碑。
- **发布型项目**（QwenPaw、Zeroclaw）已进入版本化交付，但需把“插件/渠道初始化失败”纳入发布门禁。
- **轻量/垂直项目**（AstrBot、PicoClaw、DSH）分别在机器人渠道、轻量网关、开发工作流上差异化，但流程治理与质量债清理速度决定用户留存。

---

## 7. 值得关注的趋势信号

1. **从“单助手”走向“多代理/团队/多租户”**  
   OpenClaw `sessions_spawn` 定向配对设备、QwenPaw Matrix 多工作区、Zeroclaw OIDC 非 operator 登录、hermes Team Gateway/Slack BYO app、DSH AgentTeam 均指向同一方向：**权限模型、并发启动、任务协调与账户作用域将成为下一代核心架构能力**。

2. **插件生态进入“治理期”**  
   社区不再只要求“能写插件”，而是要求**准入、分类、可信标识、SDK 稳定性、失败隔离与安全隔离**。OpenClaw 的 progress-card SDK/Workboard、AstrBot 的插件市场分类、hermes 的 verified 与盗版规则、PicoClaw 的 approval-hook fail-open 都是治理信号。

3. **“静默失败”成为最伤信任的体验问题**  
   OpenClaw Telegram dead-letter、Zeroclaw 空 stderr/丢 trace、PicoClaw `/health` 误报、DSH cookie 溢出与上下文不可恢复，共同说明：**没有错误、没有重试、没有告警的失败，比显式崩溃更伤用户信任**。开发者应把“失败显式化 + 至少一次重试 + 可见告警”作为基础设计约束。

4. **安全控制必须 fail-closed，破坏性操作需可回滚**  
   PicoClaw approval-hook 失败后继续放行、DSH AI 误删目录、hermes 多 profile 密钥泄漏，均表明 Agent 执行本地文件/命令/凭据操作时，**默认拒绝、沙箱隔离、操作确认与回滚机制**将从“加分项”变为“准入项”。

5. **成本透明与本地模型成为产品差异化**  
   QwenPaw 引入 Piccolo 本地决策模型，hermes 优化子代理 prompt cache/token，DSH 暴露 Auto 预设隐性全上下文成本，OpenClaw 修复计费偏差。趋势是：**本地/远程路由、usage 计量、缓存复用与账单归因**将直接影响用户留存与商业化。

6. **PR 审阅吞吐与社区流程治理成为生态瓶颈**  
   OpenClaw 316 条待合并、hermes 275 条、Zeroclaw 开闭比 11:1、AstrBot 16 条待合并，说明“贡献者热情”正在被评审延迟消耗。同时 PicoClaw 的 stale 策略对安全 Issue 与高质量提案缺乏豁免。建议项目建立：**ready-for-look 清理机制、安全/feature-request stale 白名单、XL PR 明确审阅窗口、贡献者 API 权限保障**。

7. **跨平台 CI 矩阵应从“可选”变为“发布门禁”**  
   Windows schtasks、Linux worker、macOS gateway、DSH Windows 沙箱 DACL、Zeroclaw 仅 Linux 跑 nextest，均说明真实部署环境与 CI 覆盖存在差距。对 AI 智能体开发者而言，**Windows/macOS/Linux 三平台 smoke 矩阵 + 渠道初始化测试 + 安全回归测试**应成为发布前硬性门槛。

---

**面向技术决策者的三条建议：**
1. **优先投资插件/渠道生命周期与可观测性**：失败隔离、状态机、health 真值、可见告警，比继续堆功能更能提升留存。
2. **把多租户/多设备权限模型前置设计**：OIDC、scoped chat、profile 隔离、配对设备权限若后补，成本会指数上升。
3. **建立“可靠性专项”而非零散修 bug**：将消息投递、插件初始化、Windows 启动、安全 fail-closed 归并为发布门禁，避免 P0/P1 长期悬置。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 · 2026-11-12

> 数据窗口：过去 24 小时｜Issues 更新 8 条｜PR 更新 49 条｜新版本 1 个

---

## 1. 今日速览

- **版本节奏强劲**：v0.9.0 正式发布，包含 **117 个提交、22 位贡献者**，是项目首次支持“非 operator 用户登录”的版本，标志着 Zeroclaw 从单人自托管工具向**多用户/多租户形态**迈出关键一步。
- **PR 流量高位运行，但合并吞吐偏低**：24 小时内 49 条 PR 有更新，其中 **45 条仍待合并、仅 4 条合并/关闭**，开闭比约 **11:1**，代码评审已成为当前最主要的瓶颈。
- **Issue 侧零关闭**：8 条更新 Issue 全部为 OPEN，其中 5 条为近两日新建（#12390、#12391、#12394、#12396、#12397），新问题流入速度高于消化速度。
- **质量信号需关注**：今日新增/活跃缺陷中包含 1 条 **S1（workflow blocked）** 与 1 条 **S2（degraded behavior）**，集中在运行时持久化与上下文保真度上。
- **整体健康度评估**：贡献者活跃度 **高**、发布节奏 **健康**、评审吞吐 **偏紧**、缺陷响应 **待加强**。

---

## 2. 版本发布

### 🚀 v0.9.0

**核心内容（据 release notes）：**

| 项目 | 说明 |
|---|---|
| 提交规模 | 117 commits |
| 贡献者 | 22 人 |
| 里程碑意义 | **首个支持非 operator 用户登录的版本** |
| 认证 | 仪表盘可通过**自建 OpenID Connect 提供方**完成登录 |
| 权限模型 | 非管理员账户拥有**各自独立的、作用域受限的聊天空间** |

**破坏性变更与迁移注意事项：**

- Release 摘要未显式列出 breaking changes，但从「首个非 operator 可登录」这一描述可判断，**身份认证与账户作用域模型发生了实质性扩展**。自托管部署在升级后应重点复核：
  1. OIDC Provider 配置项（issuer / client id / secret / redirect URI）是否需新增；
  2. 现有会话与账户数据在引入 scoped chat 后的归属映射；
  3. 反向代理与回调地址白名单是否需要同步调整。
- 配套动作已就绪：文档翻译已通过 [#12380](https://github.com/zeroclaw-labs/zeroclaw/pull/12380) 固定到 v0.9.0 目录，[#12215](https://github.com/zeroclaw-labs/zeroclaw/pull/12215)（36 项 rust-all 依赖升级）亦随版本线关闭，说明发布流程收尾规范。

> 建议：由于涉及认证面变更，建议维护者在 Release 页面补充一段「升级检查清单」，降低自托管用户的升级摩擦。

---

## 3. 项目进展

今日合并/关闭 4 条 PR，均为**发布收尾与安全/文档类**改动，属于“稳态维护”而非功能推进：

| PR | 状态 | 内容 | 价值 |
|---|---|---|---|
| [#12392](https://github.com/zeroclaw-labs/zeroclaw/pull/12392) | ✅ CLOSED | `rustix` 1.1.4 → 1.1.6，修复 **RUSTSEC-2026-0486**（`getxattr`/`listxattr` 等 xattr 读取越界） | **安全修复**，优先级最高的一条 |
| [#12380](https://github.com/zeroclaw-labs/zeroclaw/pull/12380) | ✅ CLOSED | 文档翻译 gitlink 从 v0.8.7 目录推到 v0.9.0 目录 | 发布一致性 |
| [#12215](https://github.com/zeroclaw-labs/zeroclaw/pull/12215) | ✅ CLOSED | rust-all 组 36 项依赖升级（已被 #12393 的 35 项版本接续） | 依赖健康度 |
| （第 4 条未在 Top20 列表中展示） | ✅ CLOSED | — | — |

**推进程度评估**：今日的“向前迈进”主要体现在 **v0.9.0 发布落地**上，而非 PR 合并。功能面的实质进展几乎全部堆积在 45 条待合并 PR 中（详见第 8 节），项目的**产能 > 消化能力**特征明显。

---

## 4. 社区热点

> 注：本次数据中 PR 的评论数字段缺失（`undefined`），故热点分析以 Issue 评论数为主要依据。

| 排名 | 条目 | 评论 | 类型 | 链接 |
|---|---|---|---|---|
| 1 | #7461 CI 扩展到 Windows/macOS | 6 | enhancement / ci | [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) |
| 2 | #8794 中断 Agent 会抹掉工具调用与思考 | 5 | bug / **p1 / S1** | [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) |
| 3 | #9814 原生 XMPP / Prosody 通道 | 4 | enhancement / parking-lot | [#9814](https://github.com/zeroclaw-labs/zeroclaw/issues/9814) |
| 4 | #12397 区分 Agent 任务结果与 cron 执行状态 | 1 | enhancement | [#12397](https://github.com/zeroclaw-labs/zeroclaw/issues/12397) |

**诉求分析：**

- **#7461（CI 平台矩阵）**：Lint/Build 已跑三平台矩阵，但 `cargo nextest run` 仍只在 `ubuntu-latest` 上跑。作者 @NiuBlibing 的诉求本质是**跨平台可信度**——Zeroclaw 大量用户部署在 Windows 服务与 macOS 上（#12391 的生产环境即 Windows service），仅 Linux 测试会漏掉平台相关的运行时缺陷。该 Issue 已带 `status:in-progress`，是最接近落地的一条。
- **#8794（中断即丢失上下文）**：被评为 **S1 - workflow blocked**，是今日社区情绪最强的一条。用户真实场景是「Agent 正在调用工具时按下停止」，随后下一轮对话中**整段工具调用与思考过程凭空消失**，等同步骤从未发生。这直接破坏了「人机协作中途干预」这一核心交互范式。
- **#9814（XMPP）**：家庭实验室 / 低资源部署用户希望复用已有的 Prosody / ejabberd 服务，而不是为每个 IM 通道单独维护凭据。已有对应实现 PR [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847)，但 Issue 打了 `status:parking-lot`，**社区意愿与维护者优先级存在温差**。

---

## 5. Bug 与稳定性

按严重程度排序：

### 🔴 P1 / S1 — 工作流阻断

**#8794 · 停止 Agent 会抹除工具调用与思考上下文**
- 组件：`runtime/daemon` + Web Dashboard UI
- 现象：在 Agent 调用工具/推理过程中中断，该步骤**完全不进入下一轮上下文**，如同从未发生
- 影响：破坏「中途介入—继续对话」的核心协作流程
- 状态：`OPEN`、`status:accepted`、`risk:high`，创建于 2026-07-07，**已悬置 4 个月**
- Fix PR：❌ 本次提供的 PR 列表中**未见直接关联的修复**
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/8794

### 🟠 S2 — 行为降级

**#12391 · `runtime-trace.jsonl` 跨守护进程重启丢失数小时事件**
- 组件：`runtime/daemon`；环境：生产实例，Windows service，v0.8.7
- 现象：繁忙 daemon 上 trace 出现**多小时覆盖缺口**，但 Agent 工作在缺口期间确证仍在继续
- 根因方向（作者推测）：handoff buffer / 队列丢弃 / 静默写入失败
- 影响：**可观测性失真**——排障时 trace 不可信，间接影响 #8794 这类上下文问题的定位
- Fix PR：❌ 未见关联 PR
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/12391

### 🟡 功能正确性缺陷

**#12390 · `shell` 工具在非零退出时返回空错误串（stderr 被吞）**
- 现象：命令向 stderr 写入错误并非零退出，工具结果为 `"error":""`，模型只能得知「失败了」而不知「为什么」
- 影响：Agent 的**自我纠错能力被直接削弱**，会反复盲试同一条错误命令
- 版本：v0.8.7｜Fix PR：❌ 未见
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/12390

**#12396 · `history_pruning.keep_recent` / `collapse_tool_results` 成为死配置**
- 自 #8196 移除旧版 history pruner/compressor 后，`HistoryPrunerConfig` 的两个字段**已无任何运行时读取方**，却仍留在配置 schema 中
- 影响：用户按文档调整这两个参数**完全无效且无告警**，属典型的“静默失效”型配置债
- Fix PR：❌ 未见
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/12396

**#12397 · Agent 型 cron 任务误报 `Ok`**
- 现象：Agent 明确得出 `BLOCKED` 结论、任务实际未完成，仪表盘仍显示 `Ok`
- 影响：**调度可信度受损**，失败被静默吞掉
- 版本：v0.8.7｜Fix PR：❌ 未见
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/12397

### ✅ 今日已有修复动作的稳定性项

| 修复 PR | 内容 |
|---|---|
| [#12389](https://github.com/zeroclaw-labs/zeroclaw/pull/12389) | 在 CLI 输出前剥离 ANSI 转义序列（CSI/OSC/DCS）与不可打印控制字符，防止 **memory 字段注入终端控制序列** |
| [#12388](https://github.com/zeroclaw-labs/zeroclaw/pull/12388) | Discord reaction URL 校验自定义 emoji 语法并对不安全字符百分号编码 |
| [#12392](https://github.com/zeroclaw-labs/zeroclaw/pull/12392) | `rustix` 升级修复 RUSTSEC-2026-0486（已合并） |

> **稳定性小结**：今日 4 条缺陷中有 3 条（#12390/#12391/#12396）指向同一个模式——**失败被静默吞掉**（空 stderr、静默丢事件、死配置无声失效）。这不是巧合，建议维护者将其作为一个统一的「可观测性与失败显式化」主题来治理。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 对应 PR | 落地概率判断 |
|---|---|---|---|
| **原生 XMPP / Prosody 通道** | [#9814](https://github.com/zeroclaw-labs/zeroclaw/issues/9814) | [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) 原生 Rust XMPP + 可选 legacy OMEMO，`needs-maintainer-review` | ⚠️ **中等**。实现已存在且近期仍在迭代（TLS replay cache 修复），但 Issue 带 `status:parking-lot`，卡在维护者评审 |
| **CI 三平台矩阵** | [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) | 未见 | 🟢 **较高**。已 `status:in-progress`，改动面小，且有 Windows/macOS 缺陷（#12391）作为现实论据 |
| **SOP step agent 工具上限绑定** | [#12394](https://github.com/zeroclaw-labs/zeroclaw/issues/12394) | 思想同源：[#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391) 把 delegate 的 workspace / tool ceiling / command policy 绑定延展到 turn 之外 | 🟡 **中等**。属同一安全边界议题的延伸，但 #10391 本身仍 `needs-author-action` |
| **cron 状态区分执行成功 vs 任务完成** | [#12397](https://github.com/zeroclaw-labs/zeroclaw/issues/12397) | 未见 | 🟡 **中等偏低**。需求明确、范围可控，但需要模型侧引入结构化结论信号 |
| **多模型 / 单 Provider Profile** | — | [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)（`size:XL`，`needs-author-action`，自 8 月挂起） | ⚠️ **不确定**。这是路线图级别的 provider 抽象重构（schema-v4 connections、capability models、fallback graphs），但作者待响应已超 3 个月 |
| **Agent 间会话互通** | — | [#12258](https://github.com/zeroclaw-labs/zeroclaw/pull/12258) `sessions_prompt` 同步版 + [#12259](https://github.com/zeroclaw-labs/zeroclaw/pull/12259) `sessions_message` 异步骨架（RFC #11027 / tracker #11119） | 🟢 **较高**。成对推进、有 RFC 依据，是当前最成体系的功能线 |

**路线图判断**：下一版本（v0.10.x）最可能的内容组合为 **XMPP 通道 + CI 平台矩阵 + 多 Agent 会话互通**；而 **provider 多模型支持** 因 PR 体量与作者响应状态，存在继续延期的风险。

---

## 7. 用户反馈摘要

**真实痛点（来自 Issue 描述与评论）：**

1. **「中断即失忆」严重伤害信任**（#8794，5 条评论）
   > 用户原话大意：停止正在工作的 Agent 后，「整个步骤像从未发生过」。用户不得不重新描述上下文，等于**每次干预都要付一次重复沟通成本**。这是 S1 级体验断裂。

2. **「失败了但不告诉我为什么」**（#12390）
   > 模型侧看到 `"error":""`，只能得出「失败」而无法诊断。用户实际感受到的是 Agent **反复试错、浪费 token、绕圈**。

3. **可观测性在真实生产负载下失效**（#12391）
   > 报告者在**生产环境的 Windows 服务实例**上观察到多小时 trace 缺口。这类用户不是玩票，而是把 Zeroclaw 当生产基础设施跑——**他们对 trace 的期待是审计级，而非调试级**。

4. **配置项「看起来能用其实不能用」**（#12396）
   > 用户按 schema 调整 `keep_recent` / `collapse_tool_results`，结果毫无变化且无任何告警。这类**文档与实现脱节**最消耗长期用户耐心。

5. **调度报告不可信**（#12397）
   > 仪表盘显示 `Ok`，任务其实 `BLOCKED`。用户的核心诉求是「我需要知道哪些定时任务真的没干成」。

**使用场景画像：**
- 🏠 **家庭实验室 / 低资源自托管**（#9814 明确提到 Prosody、ejabberd、low-resource deployment）
- 🖥️ **Windows 服务形态的生产部署**（#12391）
- 🔁 **Agent + 外部工具链自动化**（#12397 提到 Chrome DevTools MCP + 定时任务）
- 👥 **团队共享实例**（v0.9.0 的 OIDC 多用户登录正是对此的正面回应）

**满意信号**：v0.9.0 的 OIDC 支持直接命中了「多人共用一套部署」的诉求，是本次发布最有价值的用户-facing 改进。

**不满意信号**：集中在 **「静默失败」** 与 **「长时间未修的 P1」** 两点，#8794 悬置 4 个月是最可能引发社区不满的引信。

---

## 8. 待处理积压

### 🔥 高优先级积压（建议本周处理）

| 条目 | 类型 | 滞留时长 | 状态 | 风险 |
|---|---|---|---|---|
| [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) | Bug **P1/S1** | **~4 个月**（2026-07-07） | accepted, risk:high，无 fix PR | 极高：workflow blocked + 社区高关注 |
| [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) | Enhancement CI | **~5 个月**（2026-06-10） | in-progress | 中：已有 Windows 缺陷佐证其必要性 |
| [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) | PR `size:XL` | **~3 个月**（2026-08-07） | `needs-author-action` | 高：provider 抽象基石，长期悬空会阻塞后续 provider 工作 |
| [#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391) | PR `size:XL` 安全边界 | **~2.5 个月**（2026-08-26） | `needs-author-action`，与 #12394 同源 | 高：delegate 安全边界悬而未决 |
| [#9814](https://github.com/zeroclaw-labs/zeroclaw/issues/9814) | Enhancement | **~3 个月**（2026-08-07） | `parking-lot` | 中：已有可用实现 #11847，等待评审 |

### 📌 结构性积压（非单点，但值得维护者正视）

- **45 条待合并 vs 4 条已合并**：单日开闭比 11:1。若此比例持续，PR 队列将线性膨胀，且 `size:XL` 类 PR 的 rebase 成本会随时间指数上升（#10391 的描述中已可见反复 merge master 的痕迹）。
- **`needs-author-action` 标签聚集**：#9809、#10391、#11730、#11698、#11589、#11731、#11633 均为此状态，且多条来自同一作者。这更像**评审响应延迟 → 作者等待 → 变更漂移**的循环，而非作者失联。
- **新 Issue 零关闭**：今日 8 条更新全部 OPEN。其中 #12390 / #12396 / #12390 类“小而明确”的缺陷（空 stderr、死配置）**修复成本极低但价值感知强烈**，是提升社区信心的性价比之选。

### ✅ 给维护者的三条建议

1. **优先关闭 #8794 或给出明确排期**：S1 + 4 个月 + 5 条评论，是最容易演变为公开不满的一条。
2. **批量处理「静默失败」小修**：#12390（stderr）、#12396（死配置）、#12397（cron 状态）三条合起来可作为一个「失败显式化」主题 PR 批次，成本低、口碑收益高。
3. **为 #11847（XMPP）给出结论**：要么 `needs-maintainer-review` 转正式评审，要么明确告知 `parking-lot` 的原因，避免贡献者（@CastelloBrancoTecnologia 同时挂着 #11869）持续投入无反馈的工作。

---

### 📎 数据说明

- PR 评论数字段在本次数据源中缺失（`undefined`），故社区热度以 Issue 评论数为主要排序依据。
- 「最新 Pull Requests」仅展示评论数最多的前 20 条（共 49 条），第 4 条合并 PR 未在列表中呈现，其内容无法确认。
- 所有结论均基于所给数据推导，未引入外部信息。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 · 2026-11-12

> 数据窗口：2026-11-11 至 2026-11-12｜数据源：GitHub Issues / PRs / Releases

---

## 1. 今日速览

过去 24 小时项目共发生 **4 条 Issue 状态变更、0 条 PR 活动、0 次版本发布**，提交—合并链路的工程产出为**空**。表面上看关闭了 3 条 Issue、关闭率 75%，但其中 **2 条（#3449、#3450）是 stale 机器人自动清理**而非实质性解决，真正与问题内容相关的关闭仅有 #3468 一条。活跃度评估：**低（Low）**——Issue 侧靠自动清理维持数字，代码侧零流动。更值得警惕的是，**唯一仍处于 OPEN 状态的 #3456 是安全类缺陷，且已被打上 stale 标签**，若沿用当前约 15 天的自动关闭节奏，存在被机器人静默结案的风险。

---

## 2. 版本发布

无新版本发布（过去 24 小时 0 个），本节省略。

---

## 3. 项目进展

**今日无 PR 合并或关闭**（PR 更新 0 条，待合并 0 条），说明本次报告期内项目在代码维度**没有向前推进**。

从 Issue 侧看，「关闭」的含金量需要拆解：

| Issue | 状态 | 关闭性质 | 实际进展 |
|---|---|---|---|
| [#3450](https://github.com/sipeed/picoclaw/issues/3450) | CLOSED / stale | 自动清理 | 无（功能请求未实现） |
| [#3449](https://github.com/sipeed/picoclaw/issues/3449) | CLOSED / stale | 自动清理 | 无（报告模板空白，无有效信息） |
| [#3468](https://github.com/sipeed/picoclaw/issues/3468) | CLOSED | 人工关闭 | 待核实（未观察到关联修复 PR） |

**结论**：当日「项目净推进量」接近于零。3 条关闭中仅 1 条为人工处置，#3468 在创建当天即被关闭（创建与更新均为 2026-11-11），但窗口内 PR 计数为 0，说明**修复并未通过当日合并的 PR 进入主干**，其关闭原因（重复 / 环境问题 / 已在其他分支修复）需要维护者在关闭说明中固化，否则会削弱 Issue 追踪的可信度。

---

## 4. 社区热点

今日讨论规模整体低迷：4 条 Issue 合计仅 **6 条评论、0 个 👍**，无 PR 参与。按评论数排序：

**1) [#3450 [Feature] Web UI: chat folders to organize launcher session history](https://github.com/sipeed/picoclaw/issues/3450)** — 2 评论
诉求很具体且带实现路径：`GET /api/sessions`（`web/backend/api/session.go` → `handleListSessions`）返回扁平的 `[]sessionListItem`，前端把全部会话渲染进一个 300px 高的下拉框（`components/chat/session-history-m...`）。用户遇到的瓶颈是**会话语义组织缺失**——单一时间序列表在长期使用后不可索。提出者甚至定位到了后端 API 与前端组件，属于「可低成本评估」的需求。

**2) [#3449 [BUG]](https://github.com/sipeed/picoclaw/issues/3449)** — 2 评论
评论数与上条持平，但**正文只有空白模板**（Environment & Tools 各字段均未填写）。2 条评论大概率是维护者追问环境信息（版本 / Go 版本 / 模型提供方 / OS / Channel）。该条的热度是「无效热度」，反映的是报告流程问题而非技术讨论，见第 7 节。

**3) [#3456 Security / 3) [#3468 BUG]** — 各 1 评论
两条均只有 1 条评论，其中 #3456 作为安全议题、#3468 作为跨通道服务不可用缺陷，**讨论深度与实际风险严重不匹配**，缺乏复现细节、影响面评估与维护者定级回复。

**背后信号**：社区不是没有表达欲（#3450 的提案质量明显高于平均），而是**缺少维护者的回应闭环**——当高质量提案也只换来 stale 标签时，用户的下一步往往是沉默而非继续提交。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 严重 1｜[#3456] Security: reload 时 approval-hook 重初始化失败，网关继续以「工具无门禁」状态运行
- 链接：https://github.com/sipeed/picoclaw/issues/3456
- 状态：**OPEN**（创建 2026-11-04，更新 2026-11-11，已被标记 `stale`）
- 性质：**安全绕过 / fail-open**。PicoClaw 支持 process approval hooks，工具执行前由 hooks 审批，拒绝则产生 `exec_skipped`。但网关在 `/reload` 或配置重载时会拆除旧 hook 并重建；**若重建失败，网关不会拒绝服务，而是带着「工具不再受审批门禁」的状态继续对外服务**。
- 影响：安全控制从「默认拒绝」退化为「默认放行」，且无显式告警。这是本次报告中风险最高的一项。
- Fix PR：**无**（窗口内 PR 数为 0）。建议的修复方向很明确——重初始化失败应 fail-closed（拒绝重启或降级为禁用工具），并输出显式错误日志。

### 🟠 严重 2｜[#3468] MCP 初始化失败导致 agent 循环挂死（0.5.4 / Windows）
- 链接：https://github.com/sipeed/picoclaw/issues/3468
- 状态：**CLOSED**（创建与关闭均在 2026-11-11，1 评论）
- 现象：0.5.4 上，只要任一已配置的 MCP server 在网关启动时连接失败，agent loop 就**完全停止处理 turn，且波及所有 channel**。用户侧表现为 "Thinking" 占位符永久停留，`GET /health` 仍返回 `{"status":"ok"}`，`gateway.log` 直接停写。
- 严重点在于**三重静默**：健康检查误报正常、日志无异常、UI 无错误提示。这是典型的**可观测性缺口**——`/health` 未纳入 MCP 依赖状态与 agent loop 存活度，属于应当同步修复的次生问题。
- Fix PR：**未观察到**。该条在创建当日关闭，但同日 PR 活动为 0，修复路径与关闭依据缺乏公开可查证的材料，建议补充关闭说明。

### 🟡 次要｜[#3449] [BUG]（无效报告）
- 链接：https://github.com/sipeed/picoclaw/issues/3449
- 状态：CLOSED / stale。内容为空模板，无版本、无环境、无复现步骤，**不构成有效缺陷**。此类 Issue 的价值仅在于暴露 Issue Form 校验缺失。

**稳定性小结**：今日暴露的两个真实缺陷**都指向同一个根因模式——依赖初始化失败后的降级策略不当**。MCP 失败 → 整个 agent loop 挂死（过度耦合，未隔离）；approval hook 失败 → 门禁被静默卸除（fail-open，未 fail-closed）。二者合看，说明初始化与重载路径缺乏统一的「失败时必须显式降级并可见」的设计约束。这是下一阶段最值得投入的架构级改进点。

---

## 6. 功能请求与路线图信号

今日仅 1 条功能请求：

**[#3450] Web UI: chat folders to organize launcher session history**（已因 stale 关闭）
- 链接：https://github.com/sipeed/picoclaw/issues/3450
- 需求本质：为 launcher 的会话历史引入**分组/文件夹能力**，改变现有「单层时间序列表 + 300px 下拉框」的信息架构。
- 技术切入点是现成的：`web/backend/api/session.go::handleListSessions` 的返回结构需要引入分组维度（folder / tag / project），前端 `session-history-m...` 组件需要从 dropdown 升级为分栏或树形视图。
- **是否可能进入下一版本**：**短期内可能性低**。理由是 (a) 当前无相关 PR，(b) 该请求虽被关闭但并非基于设计决策否决，而是 stale 超时，(c) 同期的稳定性缺陷（#3456 / #3468）优先级显著更高。若维护者有意承接，建议**先以「明确拒绝 / 延后至 v0.x 路线图」的形式重开或归档**，而不是交给机器人静默关闭——后者会丢失一个实现路径已经被写清楚的提案。

---

## 7. 用户反馈摘要

从 4 条 Issue 正文与评论分布中提炼：

**真实痛点**
1. **会话规模化的组织能力缺失**（#3450）：用户已经积累到「一个平铺列表看不完」的会话量，说明产品在真实场景中已进入长期使用阶段，UI 信息架构开始成为瓶颈。
2. **故障不可观测**（#3468）：用户最不能接受的不是 MCP 连不上，而是「chat 不回复、`/health` 说一切正常、日志停止写入」三者同时发生——**没有任何一个信号告诉用户发生了什么**。这是运维信任度的核心损耗点。
3. **安全边界不透明**（#3456）：报告者对重载语义（`/reload` 通道命令、配置重载）和 hook 生命周期有清晰的认知，说明其处于受管部署场景，对「安全控制失效时必须显式失败」有硬性预期。

**使用场景**
- Windows 桌面/本地网关部署（#3468 明确标注 Windows）。
- 受管/多人环境下的网关重载与审批门禁（#3456）。
- Launcher Web UI 的日常高频会话切换（#3450）。

**不满意的地方**
- 高质量提案（带代码定位的 #3450）与高质量安全报告（#3456）均未获得维护者实质回应，前者被 stale 关闭，后者被 stale 标记。
- Bug 报告体验不佳：#3449 的空白模板说明 Issue Form 未对关键字段（版本、OS、复现步骤）做必填校验，导致报告者与维护者双方空耗（2 条评论全部用于追问基础信息）。

**满意的地方**
- 数据中未观察到正面反馈（0 👍、无致谢类评论），本日样本不足以支撑满意度结论。

---

## 8. 待处理积压

| 优先级 | 条目 | 状态 | 滞留时长 | 风险说明 |
|---|---|---|---|---|
| 🔴 P0 | [#3456](https://github.com/sipeed/picoclaw/issues/3456) 安全：reload 失败导致工具失去门禁 | **OPEN / stale** | 已 8 天（创建 11-04） | 唯一开放项且为安全类。**已被 stale 标记，按 #3449/#3450 的约 15 天节奏，预计 11-19 前后可能被自动关闭**。强烈建议维护者立即移除 stale 标签并回复定级与修复计划。 |
| 🟠 P1 | [#3468](https://github.com/sipeed/picoclaw/issues/3468) MCP 初始化挂死（0.5.4 / Windows） | CLOSED | — | 已关闭但**无可查证的修复 PR**。建议补充关闭原因（是否重复于其他 Issue、是否已在特定 commit 修复），否则同一现象可能在 0.5.5 上以新 Issue 形式重现。 |
| 🟡 P2 | [#3450](https://github.com/sipeed/picoclaw/issues/3450) 会话文件夹 | CLOSED / stale | 已 16 天 | 关闭依据缺失。建议转为 `feature-request` 长期看板或明确归档，避免提案流失。 |
| 🟡 P2 | [#3449](https://github.com/sipeed/picoclaw/issues/3449) 空模板 Bug | CLOSED / stale | 已 17 天 | 关闭合理，但应同步改进 Issue Form（版本/OS/复现步骤设为必填），从源头降低此类噪声。 |
| ⚪ — | PR 队列 | 0 条 | — | 无积压，但也**无任何在途工作**。连续零 PR 活动是项目节奏的先行指标，建议关注后续数日是否恢复。 |

---

## 项目健康度提示

- **活跃度**：低。Issue 关闭数（3）全部来自自动清理或即时关闭，PR 与 Release 双零。
- **可观测性**：存在结构性缺口。`/health` 与实际服务可用性不一致（#3468），安全控制失败无告警（#3456）。
- **流程风险**：stale 策略对**安全类 Issue 与高质量功能提案**缺乏豁免机制，正在把「沉默」转化为「关单」。
- **建议优先级**：① 对 #3456 去 stale 并定级；② 确立「初始化/重载失败必须 fail-closed + 显式可观测」的设计约定；③ 为 Issue Form 增加必填校验；④ 为 stale 自动关闭增加 `security` 与 `feature-request` 白名单。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目日报 · 2026-11-12

---

## 1. 今日速览

过去 24 小时项目保持高强度迭代：**31 条 PR 更新**（22 待合并、9 已合并/关闭）、**8 条 Issue 更新**（7 活跃/新开、1 关闭），并发布 **v2.3.0 稳定版**。今日主线是“发布收尾 + 插件化重构落地”，`feat(agent): extract third-party agent into plugins`、OpenSandbox 后端、飞书 Windows 修复等多个长期 PR 集中关闭。与此同时，渠道插件（飞书、Matrix、微信/Linux worker）启动失败类问题集中爆发，成为当前项目健康度的主要压力点。整体活跃度高，但稳定性风险与升级兼容性值得重点关注。

---

## 2. 版本发布

### v2.3.0（Stable）
🔗 https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.0

**核心更新：Piccolo 本地决策模型**

- 新增 **Piccolo 4B / 9B / 27B** 作为本地决策模型，用于两类场景：
  - 工具调用审查（tool review）
  - 上下文压缩（context compaction）
- 提供 **BF16** 与 **Q8_0** 两种量化推荐配置，兼顾质量与显存占用。
- 支持运行时安装与更新，模型可从 **Hugging Face** 或 **ModelScope** 下载。

**迁移注意事项（结合社区反馈）**：

- v2.3.0 延续了将内置渠道转为**官方 Channel Plugin** 的架构调整（Matrix、微信等已在 beta 阶段完成迁移，见 #8538、#8682）。升级后需确认插件依赖与运行环境变量（如 `HOME`、`QWENPAW_WORKING_DIR`）在目标平台可用。
- 本地模型安装路径、下载源（HF / ModelScope）与量化配置需按新模型重新核对。
- Release Duty 安装验证 Issue #8681 仍在 OPEN 状态，建议关注各平台安装验证结论后再批量升级。

---

## 3. 项目进展

今日合并/关闭的 PR 覆盖插件化架构、沙箱后端、渠道修复与发布流程四条线：

| PR | 状态 | 内容 | 意义 |
|---|---|---|---|
| [#8426](https://github.com/agentscope-ai/QwenPaw/pull/8426) | CLOSED | `feat(agent)`: 将第三方 agent 抽取为插件（size/XXXL） | 插件化架构关键一步，agent 层解耦 |
| [#1972](https://github.com/agentscope-ai/QwenPaw/pull/1972) | CLOSED | `feat(sandbox)`: 集成 OpenSandbox 云沙箱后端（first-time-contributor） | 历经约 8 个月的长周期 PR 落地，agent 工具操作可远程容器执行 |
| [#8675](https://github.com/agentscope-ai/QwenPaw/pull/8675) | CLOSED | `fix(channels)`: 诊断启动失败 + 修复 Windows 飞书原生库加载 | 直接回应 #8669 类 `CHANNEL_NOT_CONNECTED` 问题 |
| [#8680](https://github.com/agentscope-ai/QwenPaw/pull/8680) | CLOSED | `fix(desktop)`: 修复 Windows 桌面版飞书 import 超时 | 缩短桌面端渠道启动耗时 |
| [#8542](https://github.com/agentscope-ai/QwenPaw/pull/8542) | CLOSED | `chore`: 更新 v2.3.0 发布说明 | 发布流程收尾 |
| [#8667](https://github.com/agentscope-ai/QwenPaw/pull/8667) | CLOSED | Release Duty v2.3.0-beta.4 安装验证 Issue 关闭 | beta 验证闭环 |

**推进评估**：本日最重要的结构性进展是 #8426（agent 插件化）与 #1972（云沙箱）关闭，意味着项目在“插件化 + 远程执行”两条长期路线上均有实质推进。渠道侧则以 #8675、#8680 两笔修复收口 Windows 飞书问题，但 Matrix / Linux 场景仍有未闭合问题。

---

## 4. 社区热点

按评论数排序的今日讨论焦点：

1. **[#8669](https://github.com/agentscope-ai/QwenPaw/issues/8669) 飞书渠道启动竞态 — 5 条评论**（@justsavo）
   - 打包桌面版 2.3.0b4 在 Windows 上每次启动均报 `CHANNEL_NOT_CONNECTED`，`_wait_connected` 把初始 `platform_state="disconnected"` 当作致命错误。
   - 背后诉求：**渠道插件生命周期状态机**需要容忍正常的“初始未连接”瞬态，而非直接判死。

2. **[#8538](https://github.com/agentscope-ai/QwenPaw/issues/8538) Matrix 多工作区激活失败 — 4 条评论**（@MCQSJ）
   - 官方 Matrix 插件 `matrix-0.1.0.dev0` 在三个工作区同时启用时，仅第一个能激活，10 秒共享启动窗口不足。
   - 背后诉求：**多工作区 / 多租户场景**下的插件启动并发模型需要重新设计。

3. **[#8616](https://github.com/agentscope-ai/QwenPaw/issues/8616) Windows 11 IoT LTSC 启动失败 — 3 条评论**（@ArsenicumAlbum）
   - 2.3.0-beta.1 报 "path not found" 后 AppHang，2.2.2 在同机正常工作，属明确**升级回归**。

4. **[#8682](https://github.com/agentscope-ai/QwenPaw/issues/8682)**、**[#8674](https://github.com/agentscope-ai/QwenPaw/issues/8674)**、**[#8683](https://github.com/agentscope-ai/QwenPaw/issues/8683)** — 各 1 条评论，分别涉及 Linux worker 环境变量缺失、临时目录诊断快照失控、Markdown 预览 UI。

**热点分析**：今日社区热度并非集中在“新功能”，而是高度集中于**渠道插件在升级后的启动稳定性**。这与 v2.3.0 将多渠道转为官方插件的架构切换直接相关，属于典型的“架构升级阵痛期”。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 严重（渠道不可用 / 应用无法启动）

| Issue | 现象 | 平台 | 是否已有 Fix PR |
|---|---|---|---|
| [#8669](https://github.com/agentscope-ai/QwenPaw/issues/8669) | 飞书渠道每次启动 `CHANNEL_NOT_CONNECTED` | Windows 桌面 2.3.0b4 | 部分相关修复 [#8675](https://github.com/agentscope-ai/QwenPaw/pull/8675)、[#8680](https://github.com/agentscope-ai/QwenPaw/pull/8680) 已关闭，但初始状态机问题（`_wait_connected`）仍待确认 |
| [#8538](https://github.com/agentscope-ai/QwenPaw/issues/8538) | Matrix 多工作区仅首个激活 | 2.3.0b2 | ❌ 暂无明显对应 PR |
| [#8616](https://github.com/agentscope-ai/QwenPaw/issues/8616) | 2.3.0-beta.1 启动报 path not found 后 AppHang | Windows 11 IoT LTSC | ❌ 暂无明显对应 PR |
| [#8682](https://github.com/agentscope-ai/QwenPaw/issues/8682) | 官方渠道插件 worker 在 Linux 崩溃（`Could not determine home directory`） | Linux | ❌ 暂无明显对应 PR |

### 🟡 中等（资源占用 / 稳定性隐患）

| Issue | 现象 | 是否已有 Fix PR |
|---|---|---|
| [#8674](https://github.com/agentscope-ai/QwenPaw/issues/8674) | 查询异常反复生成完整会话 JSON，无容量/清理策略，临时目录持续膨胀 | ✅ 已有对应 PR [#8678](https://github.com/agentscope-ai/QwenPaw/pull/8678)（first-time-contributor，OPEN） |

### 🟢 低（体验类）

| Issue | 现象 | 类型 |
|---|---|---|
| [#8683](https://github.com/agentscope-ai/QwenPaw/issues/8683) | 竖屏 Pad 浏览器下 Markdown 预览固定小尺寸、按钮消失 | enhancement |

**稳定性判断**：插件化迁移引入的启动路径问题是当前最大风险，且集中于 **Windows 桌面版** 与 **Linux worker** 两端；#8674 类的磁盘膨胀问题已有修复 PR，属可控项。

---

## 6. 功能请求与路线图信号

结合 OPEN PR 与 Issue，以下需求最有可能进入下一版本：

| 方向 | 信号来源 | 判断 |
|---|---|---|
| **本地模型 / 引擎管理插件化** | [#8499](https://github.com/agentscope-ai/QwenPaw/pull/8499)（XXXL，OPEN）、[#8647](https://github.com/agentscope-ai/QwenPaw/pull/8647)（MLX 引擎）、[#8648](https://github.com/agentscope-ai/QwenPaw/pull/8648)（Console 控制） | 强烈信号。三个 PR 构成同一 feature（见 #8647/#8648 描述中的合并顺序说明），与 v2.3.0 Piccolo 本地模型形成配套 |
| **MCP 插件化** | [#8469](https://github.com/agentscope-ai/QwenPaw/pull/8469)（XXXL，OPEN） | 与 #8426 agent 插件化同属架构主线，优先级高 |
| **QQ 渠道流式消息** | [#8409](https://github.com/agentscope-ai/QwenPaw/pull/8409)（Under Review） | 渠道能力补齐，处于评审中 |
| **Ollama 上下文窗口修正** | [#8236](https://github.com/agentscope-ai/QwenPaw/pull/8236)（Under Review） | 本地模型体验优化，likely 下一版 |
| **社区版登录 / 密码策略** | [#8679](https://github.com/agentscope-ai/QwenPaw/pull/8679)、[#8673](https://github.com/agentscope-ai/QwenPaw/pull/8673) | 部署侧体验优化 |
| **Markdown 预览改进** | [#8683](https://github.com/agentscope-ai/QwenPaw/issues/8683) | 新提出，暂无 PR，属 UI 打磨项 |

---

## 7. 用户反馈摘要

**主要痛点（按频次）**

1. **升级后渠道“必挂”**：飞书（#8669）在打包桌面版上“每次启动都失败”，用户明确给出 `_wait_connected` 状态机根因，说明这不是偶发，而是确定性回归。
2. **多工作区场景被忽视**：#8538 用户同时运行 A/B/C 三个工作区，插件 10 秒共享窗口只够第一个激活，反映官方插件默认按“单实例”设计假设。
3. **平台兼容性缺口**：Windows 11 IoT LTSC（#8616）与 Linux（#8682）均出现启动崩溃/挂起，说明 CI 覆盖的“主流平台”与实际企业部署环境存在差距。
4. **资源无界增长**：#8674 用户观察到基于 QwenPaw 的 WorkMate 集成部署中，查询异常持续写满临时目录，属生产环境隐患。

**使用场景画像**：桌面打包版（Windows）、多工作区/多租户部署、企业内网 Linux 部署、Pad 竖屏浏览器访问、基于 QwenPaw 的二次集成（WorkMate）。

**满意度信号**：正面反馈较少直接体现在评论中；v2.3.0 引入 Piccolo 本地决策模型获得发布层面的认可，但用户当前情绪更集中于“升级后能否正常起来”。

---

## 8. 待处理积压

以下 Issue/PR 创建时间较早、评论稀少或长期处于评审状态，建议维护者优先排期：

| 条目 | 创建时间 | 状态 | 积压说明 |
|---|---|---|---|
| [#8236](https://github.com/agentscope-ai/QwenPaw/pull/8236) Ollama num_ctx 修复 | 2026-10-14 | Under Review | 近 1 个月未合并，本地模型体验相关，建议与 #8499 本地模型插件化协同评审 |
| [#8268](https://github.com/agentscope-ai/QwenPaw/pull/8268) task_tracker 清理 | 2026-10-16 | OPEN | 近 1 个月，解决 run 永不释放的稳定性问题，价值明确 |
| [#8308](https://github.com/agentscope-ai/QwenPaw/pull/8308) API 404 测试 | 2026-10-18 | OPEN | 近 1 个月，测试类小 PR，合并成本低 |
| [#8409](https://github.com/agentscope-ai/QwenPaw/pull/8409) QQ C2C 流式 | 2026-10-24 | Under Review | 渠道能力补齐，长期评审中 |
| [#8469](https://github.com/agentscope-ai/QwenPaw/pull/8469) MCP 插件化 | 2026-10-28 | OPEN | XXXL 体量，与已关闭的 #8426 同属架构主线，建议明确排期 |
| [#8499](https://github.com/agentscope-ai/QwenPaw/pull/8499) 本地模型管理插件化 | 2026-10-29 | OPEN | XXXL 体量，与 #8647/#8648 构成 feature 链，需整体协调 |
| [#8616](https://github.com/agentscope-ai/QwenPaw/issues/8616) Windows 11 LTSC 启动失败 | 2026-11-07 | OPEN | 明确回归问题，3 条评论但无 fix PR，建议优先响应 |
| [#8538](https://github.com/agentscope-ai/QwenPaw/issues/8538) Matrix 多工作区 | 2026-11-02 | OPEN | 4 条评论、无 fix PR，影响多租户用户 |

**积压健康度小结**：PR 侧积压以“大体量重构 PR”为主（#8469、#8499、#8647、#8648），属于正常的长评审周期；Issue 侧积压则集中在**渠道插件启动类回归**，建议维护者将 #8616、#8538 与已关闭的 #8675/#8680 放在同一问题簇下统一跟进，避免修复碎片化。

---

*数据来源：QwenPaw GitHub 仓库（agentscope-ai/qwenpaw），统计窗口 2026-11-11 ~ 2026-11-12。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报（2026-11-12）

> 数据口径：过去 24 小时 Issues 更新 500 条、PR 更新 500 条；基于展示的 30 条高评论 Issues 与 20 条高评论 PR 分析。PR 评论数在数据中多为 `undefined`，PR 侧以标签、集中度和内容判断。

## 1. 今日速览

过去 24 小时项目维持高活跃：Issues 与 PR 各更新 500 条，PR 已合并/关闭 225 条、待合并 275 条，合并吞吐尚可但积压仍高；Issues 新开/活跃 453 条、关闭 47 条，社区输入强劲而关闭率偏低（约 9.4%）。今日无新版本发布，主线处于“统一网关合并后稳定化 + 安全加固 + 性能优化”阶段。讨论焦点集中在统一网关遗留问题、贡献者 API 权限、安全边界、看板调度可靠性和移动端/IDE 集成需求。整体健康度：社区活跃度和安全响应积极，但 P1 安全/兼容问题、275 个待合并 PR 与统一网关稳定性是当前主要风险。

## 2. 版本发布

今日新版本发布 0 个，无 Releases。故省略更新内容、破坏性变更与迁移注意事项。

## 3. 项目进展

今日展示的高评论 PR 中，已关闭/合并的重点 PR 主要推进了工具正确性与子代理 token 成本优化：

- [#128014](https://github.com/NousResearch/hermes-agent/pull/128014) `fix(tools): read file dedup overlap`：修复 `read_file` 去重守卫只匹配完全相同的 `(path, offset, limit)` 导致重叠读取未去重的问题，减少重复读取与误阻塞。
- [#153665](https://github.com/NousResearch/hermes-agent/pull/153665) `execute_code warns when a cell runs a module edited after import`（替代 [#127819](https://github.com/NousResearch/hermes-agent/pull/127819)）：当 agent 修改 Python 文件后继续用 `execute_code` 运行旧内核模块时，结果会提示哪些模块在导入后被编辑以及如何重新加载，降低“修复看似失败”的排查成本。
- [#153275](https://github.com/NousResearch/hermes-agent/pull/153275) 子代理从缓存读取 skills index：在 147 个技能的库中，每个任务文本不同的子代理首调用少写约 5,940 tokens，降低多子代理场景成本。
- [#153385](https://github.com/NousResearch/hermes-agent/pull/153385) 兄弟子代理共享 prompt cache：OpenAI 模型上子代理从“不共享”变为可读彼此缓存，Claude 子代理共享比例提升，进一步优化 delegate 场景的 token 与延迟。

整体看，今日已关闭 PR 更偏“正确性修复 + 成本优化”，项目在工具链可靠性和多代理经济性上向前推进；但无新版本，这些变更尚未版本化交付。安全类 PR 多以 `sec-marathon` 标签集中待审，尚未体现在已关闭列表中。

## 4. 社区热点

### Issues 讨论热度 Top 5

1. [#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（60 评论，P2，OPEN）  
   **统一网关 #106742 合并后遗留问题**：CLI、TUI、Desktop、API server、编辑器、消息机器人、cron、Kanban、Group Chats 均把 turn 交给单一 gateway 进程。讨论持续近三周，说明统一网关的稳定性、隔离与故障恢复仍是最大社区焦点。

2. [#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（58 评论，P3，blocked，cause/upstream）  
   **通过 API 创建 PR 失败：CreatePullRequest 权限错误**，但建 Issue 和 fork PR 仍可用。该问题影响外部贡献者工作流，且被标记为上游阻塞，需维护者协调平台权限。

3. [#143379](https://github.com/NousResearch/hermes-agent/issues/143379)（36 评论，P4，type/security）  
   **RFC：DOC-CHAIN SUBSTRATE 的读取、治理与压缩网络**。属于架构/安全设计讨论，关注持久记录在会话压缩后仍保留 provenance，并由 agent 重新读取而非让用户重复输入。

4. [#119070](https://github.com/NousResearch/hermes-agent/issues/119070)（24 评论，P2）  
   **Kanban 卡片一次 rate-limit 后永久停在 `blocker_auth`**，reviewer 永不 spawn，dispatcher 持续报 ready queue 非空。自动化调度可靠性痛点。

5. [#11911](https://github.com/NousResearch/hermes-agent/issues/11911)（22 评论，16 👍，P3，needs-decision）  
   **官方 iOS/Android 移动 App + 语音通话**。今日展示中点赞最高，是明确的长期产品诉求。

### PR 侧热点

PR 评论数未展示，但按集中度看，`sec-marathon` 安全修复集群最显著：  
[#153644](https://github.com/NousResearch/hermes-agent/pull/153644) pairing 撤销后 pending code 失效、[#154127](https://github.com/NousResearch/hermes-agent/pull/154127) SSH ControlMaster 目录防抢占、[#154136](https://github.com/NousResearch/hermes-agent/pull/154136) dashboard 凭据文件写入拦截、[#154153](https://github.com/NousResearch/hermes-agent/pull/154153) webhook HMAC 防重放、[#154135](https://github.com/NousResearch/hermes-agent/pull/154135) WhatsApp bridge bearer 鉴权、[#153846](https://github.com/NousResearch/hermes-agent/pull/153846) skills-guard 解码绕过、[#153855](https://github.com/NousResearch/hermes-agent/pull/153855) dashboard basic-auth 会话失效、[#153845](https://github.com/NousResearch/hermes-agent/pull/153845) MCP 子进程凭据隔离。  
插件目录治理也较活跃：[#154204](https://github.com/NousResearch/hermes-agent/pull/154204) 拒绝盗版内容插件规则、[#154207](https://github.com/NousResearch/hermes-agent/pull/154207) Tripo3D 标记 verified、[#154205](https://github.com/NousResearch/hermes-agent/pull/154205) 新增 openalgo-charts、[#153202](https://github.com/NousResearch/hermes-agent/pull/153202) 新增 rekindra、[#154206](https://github.com/NousResearch/hermes-agent/pull/154206) 维护者署名修正。

**背后诉求**：统一网关需要更清晰的故障边界；外部贡献流程需要解除权限阻塞；多平台/多 profile 部署需要更强安全隔离；插件生态在快速扩张的同时需要准入规则和可信标识。

## 5. Bug 与稳定性

按严重程度整理今日更新/活跃的重点 Bug。标注“展示数据中未见直接 fix PR”表示当前 20 条 PR 展示中未看到对应修复。

### P1 / 高优先级

- [#122529](https://github.com/NousResearch/hermes-agent/issues/122529) **cron 外部 worker 缺少 venv site-packages 的 PYTHONPATH**，报 `ModuleNotFoundError: ruamel`；P1，影响 cron 调度与安装更新兼容性。展示数据中未见直接 fix PR。
- [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) **`gateway.multiplex_profiles` 下默认 profile 密钥泄漏到 secondary profile 的 terminal 工具与 Kanban worker 子进程**；P1，安全边界问题。展示数据中未见直接 fix PR。
- [#153846](https://github.com/NousResearch/hermes-agent/pull/153846) **skills-guard 解码绕过**（无效 UTF-8、coding cookie、NUL 字节、结构化 docstring 行）；P1，已有 fix PR，修复 #132192。
- [#153655](https://github.com/NousResearch/hermes-agent/pull/153655) **完成回复中回显 `<memory-context>` 记忆上下文**；P1，安全/隐私，已有 fix PR。
- [#153644](https://github.com/NousResearch/hermes-agent/pull/153644) **撤销用户后未失效其 pending pairing code**；P1，认证安全，已有 fix PR。
- [#153845](https://github.com/NousResearch/hermes-agent/pull/153845) **MCP secret-source 值将 Hermes 凭据带入 stdio MCP 子进程**；P1，凭据隔离，已有 fix PR。

### P2 / 中高影响

- [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) Kanban 卡片 rate-limit 后永久 `blocker_auth`，reviewer 不 spawn；自动化流水线阻塞。未见直接 fix PR。
- [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) `browser_exec` 完成后遗留 `browser_harness.daemon` 进程，无超时、不退出；长期运行会积累僵尸进程。未见直接 fix PR。
- [#137838](https://github.com/NousResearch/hermes-agent/issues/137838) macOS gateway 在错过 liveness probe 后反复退出 75，根因未确认；平台稳定性风险。未见直接 fix PR。
- [#122656](https://github.com/NousResearch/hermes-agent/issues/122656) Desktop 每次 backend boot 触发 no-op updater，重建应用并重启 gateway，循环杀掉活跃聊天。未见直接 fix PR。
- [#69889](https://github.com/NousResearch/hermes-agent/issues/69889) Hermes 重建 venv 后 cron `.py` 脚本任务丢失用户 pip 包；与 #122529 同属 cron/venv 脆弱性。未见直接 fix PR。
- [#54572](https://github.com/NousResearch/hermes-agent/issues/54572) `patch` replace 模式在 `old_string` 非精确匹配时可能编辑错误区域；文件编辑正确性风险。未见直接 fix PR。
- [#112961](https://github.com/NousResearch/hermes-agent/issues/112961) Windows Desktop 长 WS 会话中 `FAST_FAIL_FATAL_APP_EXIT`，固定 faulting offset；状态 `awaiting-reporter`。
- [#142488](https://github.com/NousResearch/hermes-agent/issues/142488) Desktop 模型切换 `prepare_model` 在 tuple `moved` 上崩溃（rename map 被遮蔽）；profile-following session 受影响。未见直接 fix PR。
- [#96027](https://github.com/NousResearch/hermes-agent/issues/96027) gateway 泄漏 SQLite `state.db` 连接，22 天累计 48 db + 46 wal fd，可能触及 launchd 256-fd 限制。未见直接 fix PR。
- [#146440](https://github.com/NousResearch/hermes-agent/issues/146440) Windows Kanban managed workers 在 agent init 阶段冻结（git 子进程继承 stdin 控制管道 + 用户目录插件 lazy numpy import 死锁）。未见直接 fix PR。

### P3 / 其他值得关注

- [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) terminal lifecycle guard 误杀 Node.js CLI（如 `obsidian-headless` 的 `ob`），28 评论，P3 但讨论热度高。未见直接 fix PR。
- [#74078](https://github.com/NousResearch/hermes-agent/issues/74078) 审批守卫绕过：`kill <numeric-PID>` 绕过自终止保护，`execute_code` 阻塞前缀不匹配；安全加固项。未见直接 fix PR。
- [#122239](https://github.com/NousResearch/hermes-agent/issues/122239) Windows cp936 区域下 `hermes update` 打印 `UnicodeDecodeError`，`version_info.py` 解码 git 输出未指定编码。未见直接 fix PR。

**稳定性判断**：P1 安全修复 PR 集中出现，说明维护者正在系统性处理认证、凭据隔离和扫描绕过；但 P1 的 cron/venv 与 profile 密钥泄漏问题仍缺直接修复。P2 中 Windows/macOS 平台问题、Desktop 更新循环、cron/Kanban 自动化可靠性是影响日常使用的重点。

## 6. 功能请求与路线图信号

- [#11911](https://github.com/NousResearch/hermes-agent/issues/11911) **原生移动 App（iOS/Android）+ 语音通话**：22 评论、16 👍，是展示数据中支持度最高的功能请求，标签 P3、`needs-decision`。暂无对应 PR，短期进入下一版本概率较低，但属于明确长期路线图信号。
- [#153396](https://github.com/NousResearch/hermes-agent/issues/153396) **Team Gateway：每个 agent 自带 Slack app，保留 bot 名称与头像**：P2、8 评论、7 👍，创建于 2026-11-11。与 Team Gateway/Slack 多租户场景高度相关，若维护者推进团队协作方向，可能较早进入版本。
- [#47435](https://github.com/NousResearch/hermes-agent/issues/47435) **将 Hermes Agent 注册到 ACP Registry，支持 Zed/JetBrains/VS Code**：P4、`needs-decision`、10 评论。已有原生 `hermes acp`，但 Zed 已弃用自定义 `agent_servers`，注册需求明确；生态集成价值高但优先级偏低。
- [#143379](https://github.com/NousResearch/hermes-agent/issues/143379) **DOC-CHAIN SUBSTRATE 的读取/治理/压缩 RFC**：P4 安全架构讨论，可能影响后续记忆压缩与 provenance 设计，偏设计输入而非短期功能。
- 插件目录 PR 集群：[#153202](https://github.com/NousResearch/hermes-agent/pull/153202) rekindra、[#154205](https://github.com/NousResearch/hermes-agent/pull/154205) openalgo-charts、[#154207](https://github.com/NousResearch/hermes-agent/pull/154207) Tripo3D verified、[#154204](https://github.com/NousResearch/hermes-agent/pull/154204) 盗版内容准入规则、[#154206](https://github.com/NousResearch/hermes-agent/pull/154206) 维护者署名。插件生态扩张与治理规则可能较快随目录更新落地。

**下一版本可能纳入**：已关闭的 [#128014](https://github.com/NousResearch/hermes-agent/pull/128014)、[#153665](https://github.com/NousResearch/hermes-agent/pull/153665)、[#153275](https://github.com/NousResearch/hermes-agent/pull/153275)、[#153385](https://github.com/NousResearch/hermes-agent/pull/153385) 等工具正确性与 token 优化；若 `sec-marathon` PR 合并，安全加固也会成为版本重点。移动端与 ACP 注册仍需产品决策。

## 7. 用户反馈摘要

**真实痛点**

- **统一网关成为单点依赖**：[#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 显示用户从 CLI/TUI/Desktop/API/机器人/cron/Kanban 全面切到单 gateway 后，post-merge 问题影响面广，故障隔离和恢复能力是核心担忧。
- **外部贡献流程受阻**：[#131859](https://github.com/NousResearch/hermes-agent/issues/131859) 的 API PR 权限错误让 fork 贡献者无法正常提 PR，58 条评论说明这不是边缘问题。
- **cron/venv 脆弱**：[#122529](https://github.com/NousResearch/hermes-agent/issues/122529)、[#69889](https://github.com/NousResearch/hermes-agent/issues/69889) 反映安装/重建 venv 后 cron 任务因包丢失或 PYTHONPATH 缺失而中断，影响自动化用户。
- **多 profile 安全隔离不足**：[#82936](https://github.com/NousResearch/hermes-agent/issues/82936) 的密钥泄漏问题让 least-privilege secondary profile 的承诺失效，是安全敏感部署的硬痛点。
- **平台兼容与更新可靠性**：Windows cp936 更新报错 [#122239](https://github.com/NousResearch/hermes-agent/issues/122239)、Windows Desktop 崩溃 [#112961](https://github.com/NousResearch/hermes-agent/issues/112961)、macOS gateway 退出 75 [#137838](https://github.com/NousResearch/hermes-agent/issues/137838)、Remote Desktop 更新误报失败 [#106592](https://github.com/NousResearch/hermes-agent/issues/106592)，说明跨平台安装/更新/长会话稳定性仍是主要不满来源。
- **记忆契约与国际化**：[#85622](https://github.com/NousResearch/hermes-agent/issues/85622) 外部 memory provider 抑制内置 MEMORY.md/USER.md，与“additive”文档矛盾；[#105163](https://github.com/NousResearch/hermes-agent/issues/105163) stall-guard 仅匹配英文短语，非英语 agent 的反卡死保护失效。

**使用场景**

多平台消息接入（Slack/WhatsApp/Telegram/Discord/WeCom）、Desktop/TUI/CLI 多端协作、cron 与 Kanban 自动化、本地文件与浏览器工具、多 profile 隔离部署、IDE/ACP 集成、移动语音助手。

**满意/积极信号**

- 16 👍 的移动 App 请求、7 👍 的 Slack BYO app 请求说明用户对产品扩展有明确期待。
- 子代理缓存与 token 优化 PR 显示项目关注真实成本；插件 verified 与准入规则提升生态信任；`sec-marathon` 集中修复回应安全担忧。

## 8. 待处理积压

当前待合并 PR 275 条，Issues 新开/活跃 453 条而关闭 47 条，积压压力明显。建议维护者优先关注：

- **P1 安全/兼容积压**：[#82936](https://github.com/NousResearch/hermes-agent/issues/82936)（2026-08-10，profile 密钥泄漏，15 评论）、[#122529](https://github.com/NousResearch/hermes-agent/issues/122529)（2026-09-25，cron venv PYTHONPATH，P1）。二者均未见直接 fix PR，优先级应高于普通 P2。
- **统一网关 post-merge 主线**：[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（2026-10-23，60 评论）持续活跃，需明确拆分修复项与负责人，避免长期挂在单一 umbrella issue。
- **贡献流程阻塞**：[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（2026-10-03，58 评论，blocked upstream）影响外部贡献者，建议维护者同步上游权限/平台进展。
- **高讨论长期 Bug**：[#105758](https://github.com/NousResearch/hermes-agent/issues/105758)（2026-09-08，28 评论）、[#121095](https://github.com/NousResearch/hermes-agent/issues/121095)（2026-09-24，21 评论）、[#119070](https://github.com/NousResearch/hermes-agent/issues/119070)（2026-09-22，24 评论）。分别涉及 Node CLI 误杀、浏览器 daemon 泄漏、Kanban 卡死，均为自动化场景高频问题。
- **长期功能请求**：[#11911](https://github.com/NousResearch/hermes-agent/issues/11911)（2026-04-18，22 评论、16 👍，移动 App+语音）已积累高支持度但 `needs-decision`，建议至少给出路线图表态。
- **待审安全 PR 集群**：`sec-marathon` 下 [#153644](https://github.com/NousResearch/hermes-agent/pull/153644)、[#154127](https://github.com/NousResearch/hermes-agent/pull/154127)、[#154136](https://github.com/NousResearch/hermes-agent/pull/154136)、[#154153](https://github.com/NousResearch/hermes-agent/pull/154153)、[#154135](https://github.com/NousResearch/hermes-agent/pull/154135)、[#153846](https://github.com/NousResearch/hermes-agent/pull/153846)、[#153855](https://github.com/NousResearch/hermes-agent/pull/153855)、[#153845](https://github.com/NousResearch/hermes-agent/pull/153845) 集中待合并，建议批量 review 以防安全修复长期滞留。
- **较早开放 PR**：[#144701](https://github.com/NousResearch/hermes-agent/pull/144701)（2026-10-25，P2，gateway bounded control reads off serial queue）仍 OPEN，涉及会话控制读超时，建议评估是否进入下一版本。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报  
**报告日期：2026-11-12**｜数据窗口：过去 24 小时（截至数据快照）

## 1. 今日速览
- AstrBot 今日**无新版本发布**；Issues 更新 5 条（新开/活跃 4、关闭 1），PR 更新 20 条（待合并 16、已合并/关闭 4），PR 侧活跃度明显高于 Issue 侧。
- 社区关注集中在**统一出站文本预处理钩子**（[#7457](https://github.com/AstrBotDevs/AstrBot/issues/7457)，5 条评论、3 个 👍）与 **Telegram 独立代理**（[#11083](https://github.com/AstrBotDevs/AstrBot/issues/11083) → [#11096](https://github.com/AstrBotDevs/AstrBot/pull/11096)），反映插件扩展点与多机器人部署是核心诉求。
- 稳定性方面，`future_task` 省略 `run_once` 导致一次性任务失败（[#11084](https://github.com/AstrBotDevs/AstrBot/issues/11084)）已有 fix PR [#11085](https://github.com/AstrBotDevs/AstrBot/pull/11085)，响应迅速；但重复工具校验失败（[#11086](https://github.com/AstrBotDevs/AstrBot/issues/11086)）提示 Agent 工具循环仍需韧性策略。
- 健康度评估：**维护响应快、修复型 PR 多**，但 16 条待合并 PR 与 [#10077](https://github.com/AstrBotDevs/AstrBot/pull/10077) 等长期开放项构成审查积压，建议优先清理小修复并给大型重构设里程碑。

## 2. 版本发布
今日无新版本发布（最新 Releases 为空），故无版本更新内容、破坏性变更或迁移注意事项。

## 3. 项目进展
> 数据将“已合并/关闭”归为 CLOSED；以下按今日关闭项汇总，是否实际合并以仓库最终记录为准。

| PR | 状态 | 推进内容 | 影响 |
|---|---|---|---|
| [#11089](https://github.com/AstrBotDevs/AstrBot/pull/11089) | CLOSED | 为非流式响应发送增加 per-event guards，避免分段回复等待期间被同会话新输入取代后仍发送旧回复 | 提升消息发送正确性与并发一致性 |
| [#10505](https://github.com/AstrBotDevs/AstrBot/pull/10505) | CLOSED | 修复 Dashboard 缺失 i18n key，增加 CI key 检查，清理孤立 ru-RU 条目 | 提升 Dashboard 国际化质量与 CI 防线 |
| [#10562](https://github.com/AstrBotDevs/AstrBot/pull/10562) | CLOSED | 修复移动端插件视图信息 popover 点击后闪退/不保持打开 | 改善移动端 WebUI 可用性 |
| [#11082](https://github.com/AstrBotDevs/AstrBot/pull/11082) | CLOSED | “大肥鱼鱼咖”将 fork 产品化为托管 QQ 官方机器人 SaaS | 与核心仓库路线关联度较低，需确认关闭原因与合并意图 |

**整体推进判断**：今日关闭项覆盖发送正确性、Dashboard i18n/CI、移动端 UI，属于“质量与体验修复”型推进；但核心架构 PR [#10077](https://github.com/AstrBotDevs/AstrBot/pull/10077) 及大量 provider/搜索修复仍在待合并，净推进幅度中等，审查队列是主要瓶颈。

## 4. 社区热点
> PR 评论数在数据中未提供，热度以 Issues 评论/👍 与关联 PR 响应速度判断。

- **#7457 统一出站文本预处理钩子**（OPEN，5 评论，👍3）  
  链接：https://github.com/AstrBotDevs/AstrBot/issues/7457  
  这是今日讨论最活跃、反应最多的 Issue。作者指出普通回复路径与主动发送路径分离，插件作者缺少稳定统一的“最终出站文本预处理”扩展点。背后诉求是**插件生态需要核心层提供稳定钩子**，而非各自适配两条发送链路。

- **#11076 面板账号管理插件提交**（CLOSED，2 评论）  
  链接：https://github.com/AstrBotDevs/AstrBot/issues/11076  
  插件可用聊天指令修改 WebUI 用户名/密码，仅管理员可用、改密需验证旧密码。该 Issue 已关闭，说明插件提交/审核流程正常运转。

- **#11083 Telegram 单独代理请求 → #11096 当日 PR**  
  Issue：https://github.com/AstrBotDevs/AstrBot/issues/11083  
  PR：https://github.com/AstrBotDevs/AstrBot/pull/11096  
  用户希望 Telegram 不再只能使用全局代理，而是支持 per-bot 代理。请求提出后当日出现对应 PR，显示该需求实现路径明确、维护响应积极。

- **#11084 future_task 缺省 run_once 失败 → #11085 fix PR**  
  Issue：https://github.com/AstrBotDevs/AstrBot/issues/11084  
  PR：https://github.com/AstrBotDevs/AstrBot/pull/11085  
  自然语言提醒场景下，模型只给 `note` 和 `run_at`、省略 `run_once` 时会被误判为周期任务并因缺 `cron_expression` 被拒。该问题当日即有 fix PR，属于高响应热点。

## 5. Bug 与稳定性
| 严重度 | 条目 | 说明 | Fix 状态 |
|---|---|---|---|
| 中 | [#11084](https://github.com/AstrBotDevs/AstrBot/issues/11084) `future_task` 省略 `run_once` 时一次性任务创建失败 | 影响自然语言提醒可靠性，非崩溃，但会造成用户可见功能失败 | 已有 fix PR [#11085](https://github.com/AstrBotDevs/AstrBot/pull/11085)，OPEN |
| 中 | [#11086](https://github.com/AstrBotDevs/AstrBot/issues/11086) 限制重复工具校验失败并允许修正调用 | 调度事故中出现 16 次无效 `future_task` 调用，属于 Agent 工具循环韧性/恢复策略问题 | 无直接 fix PR；[#11085](https://github.com/AstrBotDevs/AstrBot/pull/11085) 可缓解相关触发源之一 |

**PR 侧稳定性修复（OPEN，建议优先审查）**：
- [#11081](https://github.com/AstrBotDevs/AstrBot/pull/11081) 防止已删除会话历史重新出现，涉及 Dashboard 历史编辑与原生回复最终提交的竞态，数据一致性风险中等。
- [#11093](https://github.com/AstrBotDevs/AstrBot/pull/11093) 恢复 WebChat 中 Exa/AnySearch/Firecrawl 搜索引用。
- [#11092](https://github.com/AstrBotDevs/AstrBot/pull/11092) 规范化 Brave 搜索 freshness 值，避免 `week` 等触发 HTTP 422。
- [#11088](https://github.com/AstrBotDevs/AstrBot/pull/11088) 保留 Anthropic 会话历史中的图片，避免后续轮次丢失视觉上下文。
- [#11087](https://github.com/AstrBotDevs/AstrBot/pull/11087) 将 Gemini thinking tokens 计入 usage，避免生成用量少计。
- [#10869](https://github.com/AstrBotDevs/AstrBot/pull/10869) 在 MIME 错误或取消后清理 HTTP 图片临时 `.bin` 文件。

## 6. 功能请求与路线图信号
| 需求/PR | 信号 | 下一版本可能性判断 |
|---|---|---|
| [#7457](https://github.com/AstrBotDevs/AstrBot/issues/7457) 统一出站文本预处理钩子 | 插件作者核心扩展点诉求，5 评论、3 👍，但涉及两条发送路径与核心管线设计 | 需求强，但复杂度高；更可能进入中长期设计，不宜承诺近期版本 |
| [#11083](https://github.com/AstrBotDevs/AstrBot/issues/11083) + [#11096](https://github.com/AstrBotDevs/AstrBot/pull/11096) Telegram per-bot 代理 | 请求与 PR 同日出现，改动范围明确 | 较高，属于下一版本候选小功能 |
| [#11084](https://github.com/AstrBotDevs/AstrBot/issues/11084) + [#11085](https://github.com/AstrBotDevs/AstrBot/pull/11085) future_task 从 `run_at` 推断一次性任务 | 明确 bugfix，已有 PR | 较高，建议尽快合并 |
| [#11086](https://github.com/AstrBotDevs/AstrBot/issues/11086) 重复工具校验失败的有界恢复策略 | Agent 调度稳定性诉求，需策略设计 | 中长期；可先通过 [#11085](https://github.com/AstrBotDevs/AstrBot/pull/11085) 降低触发率 |
| [#11094](https://github.com/AstrBotDevs/AstrBot/pull/11094) 插件在元数据中声明市场分类 | 解决 #10638，插件市场分类从“前端写死”转向后端元数据 | 中等，若评审通过可进入近期版本 |
| [#11095](https://github.com/AstrBotDevs/AstrBot/pull/11095) Gemini Decisions API 支持 | Provider 能力扩展 | 中等，取决于 provider 路线优先级 |
| [#11091](https://github.com/AstrBotDevs/AstrBot/pull/11091) Dashboard 使用数据 opt-out 开关 | 隐私/遥测设置补齐 | 中低，属于设置项完善 |
| [#11090](https://github.com/AstrBotDevs/AstrBot/pull/11090) 侧边栏聊天导航与滚动条淡出 | WebUI 体验优化 | 中低，UI 迭代候选 |

**路线图判断**：下一版本更可能优先纳入 **#11085、#11096、#11093、#11092、#11087、#11088** 这类范围明确的小修复；**#7457、#11086、#10077** 属于核心扩展点、Agent 韧性与会话存储架构议题，更适合中长期设计。

## 7. 用户反馈摘要
> 数据未包含评论文本，以下从 Issue 描述、评论数/点赞与关联 PR 提炼，不代表逐条评论原话。

- **插件作者痛点明确**：两条用户可见消息发送路径导致插件难以找到稳定统一的文本预处理扩展点，[#7457](https://github.com/AstrBotDevs/AstrBot/issues/7457) 的 5 条评论与 3 个 👍 表明该诉求有共识。
- **多机器人/代理部署场景真实**：Telegram 只能配置全局代理不够用，需要 per-bot 代理；[#11083](https://github.com/AstrBotDevs/AstrBot/issues/11083) 当日引出 [#11096](https://github.com/AstrBotDevs/AstrBot/pull/11096)，说明用户场景清晰。
- **Agent 调度需要更宽容的工具 schema 与恢复策略**：自然语言提醒依赖模型显式传 `run_once`，缺省即失败；更严重时出现 16 次无效工具调用（[#11084](https://github.com/AstrBotDevs/AstrBot/issues/11084)、[#11086](https://github.com/AstrBotDevs/AstrBot/issues/11086)）。
- **数据一致性与多模态/搜索体验是信任型问题**：历史删除被覆盖、WebChat 引用丢失、Anthropic 图片历史丢失、Brave 422、Gemini usage 少计等，单项影响不大，但会累积影响用户信任。
- **插件生态管理需求持续**：插件市场分类元数据（[#11094](https://github.com/AstrBotDevs/AstrBot/pull/11094)）与面板账号管理插件提交（[#11076](https://github.com/AstrBotDevs/AstrBot/issues/11076)）反映插件分发、分类与权限管理的实际使用场景。

## 8. 待处理积压
| 类型 | 条目 | 积压情况 | 建议 |
|---|---|---|---|
| Issue | [#7457](https://github.com/AstrBotDevs/AstrBot/issues/7457) 统一出站文本预处理钩子 | 创建于 2026-04-11，更新于 2026-11-11，OPEN，5 评论、👍3，已持续约 7 个月 | 高共识设计请求，建议给出设计结论或明确不纳入路线图 |
| PR | [#10077](https://github.com/AstrBotDevs/AstrBot/pull/10077) 会话存储迁移到事件日志后端 | 创建于 2026-09-14，OPEN，大型重构 | 架构影响大，建议拆分/设里程碑并同步评审计划 |
| PR | [#10297](https://github.com/AstrBotDevs/AstrBot/pull/10297) 跳过仅空白的工具前导文本 | 创建于 2026-09-30，OPEN | 范围较小，建议尽快评审或反馈修改意见 |
| PR | [#10739](https://github.com/AstrBotDevs/AstrBot/pull/10739) 尊重系统时区并保存前校验 cron | 创建于 2026-10-24，OPEN | 影响定时任务正确性，建议优先处理 |
| PR | [#10869](https://github.com/AstrBotDevs/AstrBot/pull/10869) HTTP 图片 MIME 错误/取消后清理临时文件 | 创建于 2026-10-30，OPEN | 稳定性小修复，适合纳入近期清理批次 |

**维护建议**：当前 16 条待合并 PR 占今日 PR 更新的 80%，建议按“小修复快速合并、大型重构拆分评审、长期 Issue 给出路线图结论”三轨处理，以降低积压并保持社区响应优势。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目日报 · 2026-11-12

---

## 一、今日速览

过去 24 小时 Discussions 更新 **185 条**，发布候选版本 **dsh-v0.2.2-rc.2**，合并上线 3 项新功能（Git Worktree 审阅、SubAgent 具名/多层协作与 AgentTeam、桌面端更新渠道切换）及 20 余项体验优化，产品迭代密度处于高位。整体活跃度评估为**高**：社区讨论量大、版本节奏紧、插件生态出现自发分享。但需注意，社区侧多个长期稳定性问题仍在持续发酵——桌面端 cookie 堆积导致启动失败、上下文溢出后会话不可恢复、AI 误删工作目录等严重问题均未在本次 release 中看到明确修复记录，**功能推进速度与质量债清理速度存在明显反差**。此外所有热点讨论的 👍 计数均为 0，说明社区更多处于"发声/求助"状态而非"点赞认同"状态。

---

## 二、版本发布：dsh-v0.2.2-rc.2

> ⚠️ 该版本为 **Release Candidate**，非稳定版。生产环境用户建议保持在正式版更新渠道。

### 新增功能（3 项）

| 功能 | 说明 | 贡献者 |
|---|---|---|
| **Git Worktree 审阅增强** | 支持按分支、提交、文件类型审阅改动，可直接处理 GitHub 评审、同步已审阅进度、更新分支 | @LegGasai |
| **SubAgent 具名与多层协作** | SubAgent 支持具名与多层协作，AgentTeam 可按会话开启，成员与任务面板共用 | @Dudu-0223, @Yifffan |
| **桌面端更新渠道切换** | 设置中可在正式版与开发版更新渠道之间切换 | @winewill |

### 体验优化（按领域归类）

- **代码审阅与阅读**：优化评论、文件导航与窄屏布局，减少大型改动卡顿，放宽大型仓库创建工作树的等待时间；代码差异显示增删行颜色并按语言高亮；补丁编辑回执可在折叠态查看修改文件并直接打开。@LegGasai / @mektpoy / @sjw1231
- **多代理与任务协调**：改善多层子代理浏览与任务协调，优先展示任务描述，支持逐层展开与读取失败重试。@Dudu-0223
- **侧栏与导航**：插件入口收纳至"更多"且重固定保持原顺序；侧栏查找文件支持按名称/路径搜索并调整排除规则；侧栏长列表滚动与拖动体验优化，工作区工具栏常驻。@Yifffan / @yudshj
- **布局与浮层定位**：页面缩放、平移及长列表下菜单与触发位置对齐；暗色模式文件树浮层改用背景层次区分面板。@Stevring / @turtle2099
- **聊天与上下文**：向上回看自动加载更早消息并保持阅读位置；可展开工作区指令、技能目录等模型上下文；压缩/恢复后明确运行信息与旧信息替换关系；粘贴图片/文件在未聚焦时也可路由到最近输入框。@imccyu / @turtle2099 / @kermanx / @std4453
- **任务与重试**：暂停/恢复定时任务的焦点与显示稳定；目标栏操作统一为"编辑、清除、暂停或恢复"；模型请求失败可在设置中选择重试条件/次数/等待时间；临时失败可直接"继续生成"。@turtle2099 / @LegGasai
- **安全与配置**：API Key 已保存值掩码显示，支持整体替换或清除；多问题检索单次网页搜索默认支持最多 10 查询 / 10 来源。@Magolor / @turtle2099
- **终端**：Agent 终端命令在侧栏运行，用户输入即可接管；允许读取的用户终端内容进入模型与会话记录。@LegGasai
- **其他**：个性化页面移除"保留"按钮、统一撤销/恢复；自定义主题覆盖通知/卡片/计划等界面颜色；文件右键菜单加速打开并先给默认应用入口；会话首页交互动画优化。@ZiyaZhang / @turtle2099 / @yudshj

### 破坏性变更与迁移注意

1. **浮层/菜单定位接口变更（需插件作者适配）**：本次调整了菜单定位实现，"自定义浮层需适配新定位接口"（@Stevring, @LegGasai）。自行实现浮层的插件需回归验证对齐行为。
2. **个性化页面交互变更（非破坏性，但影响习惯）**：移除"保留"按钮后统一为撤销/恢复，相关文档与引导应同步更新。
3. **未发现数据结构/配置格式的破坏性迁移**：changelog 未提及数据库、配置文件或 API 签名的兼容性断裂。
4. **渠道切换便利性**：桌面端可直接在设置中切换正式/开发渠道，rc 用户可便捷回退。

---

## 三、项目进展

> 该项目未启用 GitHub Issues/PR，代码合并经 Releases 落地，以下基于 changelog 合并摘要。

**本版本（dsh-v0.2.2-rc.2）合并上线的功能与修复**：

- **工程协作能力向纵深推进**：Git Worktree 审阅（分支/提交/文件类型维度 + GitHub 评审闭环）与 SubAgent 具名/多层协作 + AgentTeam 是本版本最有分量的两项新功能，标志产品从"单会话个人助手"向"多代理、仓库级工程协作"演进。
- **交付基础设施成熟**：桌面端正式版/开发版渠道切换，意味着客户端具备了可控的灰度与回退能力。
- **体验打磨密度高**：20 余项优化覆盖审阅、导航、主题、聊天、重试、密钥、终端等主路径，多为细节交互修复。

**向前迈进的量化判断**：本次发版带来 3 项显性新功能 + 26 项体验优化条目（末条"优化批量查询文件"在提供的数据中被截断），是本周期单版本改动量较大的一次。产品形态上从"通用助手"向"专业开发工作流"的定位进一步清晰。

**但需指出**：本轮 changelog 中的"改善会话恢复或压缩后的上下文提示""改善多层子代理的浏览与任务协调"与社区讨论的 #9635（上下文溢出不可恢复）、#9662（子代理空字符串路由失败）**仅部分相关**，并未直接点名修复前述 bug，稳定性问题仍是积压项。

---

## 四、社区热点

> 按评论数排序（全部 👍 均为 0，无高赞帖）。

| 排名 | 讨论 | 评论 | 核心诉求 |
|---|---|---|---|
| 1 | [#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755) [Ideas] 支持 MIR 卡支付 | 56 | 俄罗斯用户因本地卡无法支付而受阻，请求接入 MIR 支付体系。属**商业/支付可用性**诉求，非工程迭代可解，反映新兴市场付费转化障碍。 |
| 2 | [#8107](https://github.com/deepseek-ai/deepseek-harness/discussions/8107) [General] linux 总是被遗忘… | 37 | 用户抱怨 Linux 长期缺席（WorkBuddy/Qoder 已支持），被迫使用替代品。**平台覆盖缺口**，自 9-28 起持续近两个月。 |
| 3 | [#11095](https://github.com/deepseek-ai/deepseek-harness/discussions/11095) [General] desktop: stale dsh-auth-* cookies overflow | 19 | 每次启动生成新 auth cookie 且不清理，撑爆 Node 16KB header 上限导致启动认证失败。 |
| 4 | [#12751](https://github.com/deepseek-ai/deepseek-harness/discussions/12751) [Q&A] AI 写插件把我 dsh 目录清了 | 14 | 让模型写插件导致 dsh 与 zcode 目录被清空、全部会话丢失，**数据安全信任受损**。 |
| 5 | [#7504](https://github.com/deepseek-ai/deepseek-harness/discussions/7504) [Q&A] Windows workspace-write 沙箱 DACL 失败 | 13 | Windows 沙箱 SetNamedSecurityInfoW 报 Win32 5，用户已实现修复但在等策略决策。 |
| 6 | [#10100](https://github.com/deepseek-ai/deepseek-harness/discussions/10100) [Q&A] DSML 输出问题何时解决 | 13 | 模型在"以为有工具可用"时输出 DSML 标记到普通文本，影响输出纯净度。 |
| 7 | [#5505](https://github.com/deepseek-ai/deepseek-harness/discussions/5505) [Ideas] 多文件夹工作区与 primary 文件夹 | 11 | 单工作区绑单目录限制真实多仓项目，请求对齐 Codex 多文件夹项目模型。 |
| 8 | [#10615](https://github.com/deepseek-ai/deepseek-harness/discussions/10615) [Show Your Plugins!] dsh-design-studio | 11 | 社区插件展示：画布式设计工作台，体现**插件生态自发繁荣**的正面信号。 |

**热点分析**：讨论呈"两极化"——一端是**平台/商业化诉求**（MIR 支付、Linux），另一端是**稳定性与数据安全焦虑**（cookie、误删、沙箱）。支付与 Linux 属长期结构性议题，短期内工程团队难以在版本迭代中回应；而 cookie 溢出与误删问题直接侵蚀用户信任，是最应优先处置的舆情焦点。

---

## 五、Bug 与稳定性

> 按严重程度排列。项目未启用 PR，无法标注 fix PR；以下以"是否在 dsh-v0.2.2-rc.2 changelog 中出现对应修复"为判断依据。

### 🔴 P0 — 数据丢失 / 不可恢复

1. **[#12751] AI 生成插件时清空 dsh 与 zcode 目录，全部会话丢失**（14 评论）
   → 用户仅要求"写个 token 统计插件"，结果 dsh 及 zcode 会话全丢。这是**最严重的数据安全事件**，直接冲击"让 Agent 操作本地文件"的核心信任。本轮 release **无对应修复记录**。
   https://github.com/deepseek-ai/deepseek-harness/discussions/12751

2. **[#9635] 上下文溢出后会话永久不可用**（7 评论）
   → token 低估 + 摘要器重放溢出 + 无手动恢复路径，会话彻底卡死。本轮"改善会话恢复或压缩后的上下文提示"**仅改善提示层面，未解决不可恢复性**。
   https://github.com/deepseek-ai/deepseek-harness/discussions/9635

### 🟠 P1 — 崩溃 / 启动失败

3. **[#11095] + [#11624] dsh-auth cookie 无限堆积撑爆 16KB 请求头，桌面端反复重启后必定启动失败**（19 + 7 评论，同一根因的两个讨论）
   → 每次启动铸造带随机端口名的新 cookie，30 天不清理，Chromium 回放全部 cookie 触发 431。自 10-26 持续至今，**无修复信号**。
   https://github.com/deepseek-ai/deepseek-harness/discussions/11095 ｜ https://github.com/deepseek-ai/deepseek-harness/discussions/11624

4. **[#12596] dsh web 空闲时 SIGSEGV 自动退出**（7 评论，0.2.2-rc.1）
   → 无用户操作、无命令下发时端口 3080 停止监听，VM 存活无 OOM。**无修复信号**。
   https://github.com/deepseek-ai/deepseek-harness/discussions/12596

### 🟡 P2 — 核心功能异常 / 成本风险

5. **[#7504] Windows workspace-write 沙箱 SetNamedSecurityInfoW Win32 5**（13 评论）
   → 工作区目录 DACL 缺 WRITE_OWNER 时沙箱失败；**用户已在帖中给出已实现修复，正在等待策略决策**，属可快速落地项。
   https://github.com/deepseek-ai/deepseek-harness/discussions/7504

6. **[#9322] Windows 沙箱临时目录缺失后同会话所有命令持续失败**（9 评论）
   → 含只读命令全部失败且重试不可恢复，与 #7504 同属 Windows 沙箱健壮性。
   https://github.com/deepseek-ai/deepseek-harness/discussions/9322

7. **[#12109] Auto 预设下每次工具调用都发起全上下文审阅请求，占 13 天账单 42%**（5 评论，**今日仍有更新**）
   → 成本可控性隐患，用户通过本地代理逐请求归因。**无修复信号**。
   https://github.com/deepseek-ai/deepseek-harness/discussions/12109

8. **[#9662] subagent 空字符串 provider/model/reasoning_effort 被当成显式选择而失败**（6 评论）
   → 报错"child LLM provider must be non-empty"且无补救指引；本轮"改善多层子代理浏览与协调"**未涉及该路由校验缺陷**。
   https://github.com/deepseek-ai/deepseek-harness/discussions/9662

9. **[#12697] system-inherited context 泄漏到展示的 assistant 消息**（7 评论）
   → 约 2026-11-07 起系统继承上下文被附加到可见回复末尾，污染展示层。
   https://github.com/deepseek-ai/deepseek-harness/discussions/12697

10. **[#10100] DSML 标记泄漏到普通文本输出**（13 评论）
    → 模型"以为有工具可用"时生成工具调用并输出 DSML 标记，长期未解决。
    https://github.com/deepseek-ai/deepseek-harness/discussions/10100

---

## 六、功能请求与路线图信号

| 请求 | 热度 | 纳入下一版本的可能性判断 |
|---|---|---|
| **[#5505] 多文件夹工作区 + primary 文件夹**（11 评论，9-03 提出） | 中 | **中等偏高**。本次 Git Worktree 审阅 + AgentTeam 表明团队正朝"仓库/项目级工程能力"演进，与多文件夹项目模型同源；但涉及工作区核心模型改造，短期内更可能先做"多 worktree"而非"多根目录"。 |
| **[#8107] Linux 桌面端支持**（37 评论，9-28 提出） | 高 | **偏低**。连续两个月高热度但 release 无任何提及，推测受桌面端 Electron 打包与沙箱适配成本制约，短期难排期。 |
| **[#12755] MIR 卡支付**（56 评论，11-09 提出） | 最高 | **不在工程迭代范围**。属支付渠道/商业决策，需与 DeepSeek API 计费侧协同，Harness 团队无法单方推进。 |
| **[#10615] dsh-design-studio 插件**（11 评论） | 中 | 已在社区落地，反映**插件 API 稳定性诉求**——本轮"自定义浮层需适配新定位接口"恰好印证插件作者需跟进入口变更，建议官方补充插件兼容性说明。 |

**路线图信号总结**：从本版本改动看，官方明确押注**"多代理协作 + 代码审阅 + 客户端交付通道"**三条主线；社区呼声最高的 Linux 与支付问题属于"产品外延"，短期内不会体现在版本节奏中。

---

## 七、用户反馈摘要

**满意点**
- **迭代速度快、功能密度高**：单版本 20+ 项优化，审阅、导航、主题等主路径持续打磨。
- **插件生态活跃**：社区自发分享 dsh-design-studio 等插件，说明扩展能力具备吸引力。
- **专业工作流增强**：Git Worktree 与 AgentTeam 获得开发者群体正面响应（体现为讨论参与而非点赞）。

**痛点（按情绪强度）**
1. **数据安全焦虑（最强）**：#12751 用户情绪激烈（"我 tm 真服了"），反映 Agent 执行破坏性操作时**缺少确认/沙箱/回滚机制**。
2. **稳定性疲惫**：cookie 堆积、SIGSEGV、沙箱失败等"重启即崩"类问题反复出现，用户被迫贴长日志、自行定位根因（如用本地代理逐请求归因账单）。
3. **成本不可控**：#12109 显示 Auto 预设存在隐性全上下文请求，用户对"账单为何这么高"缺乏透明解释。
4. **平台被遗忘感**：Linux 用户明确表达"总是被遗忘"，并用竞品替代，存在流失风险。
5. **上下文/会话可靠性**：压缩后不可恢复、系统上下文泄漏到展示层，影响长会话重度用户。

**使用场景画像**：以 Windows 桌面端 + Web GUI 为主，重度使用 subagent/多代理、代码审阅、插件开发；存在企业/长周期任务用户（13 天账单、多会话依赖）。

---

## 八、待处理积压（提醒维护者关注）

| 讨论 | 创建时间 | 积压时长 | 风险等级 | 备注 |
|---|---|---|---|---|
| [#8107](https://github.com/deepseek-ai/deepseek-harness/discussions/8107) Linux 支持 | 2026-09-28 | ~45 天 | 高 | 37 评论无 release 回应，存在用户流失。 |
| [#5505](https://github.com/deepseek-ai/deepseek-harness/discussions/5505) 多文件夹工作区 | 2026-09-03 | ~70 天 | 中 | 结构性强需求，可与 worktree 路线合并规划。 |
| [#7504](https://github.com/deepseek-ai/deepseek-harness/discussions/7504) Windows 沙箱 DACL | 2026-09-22 | ~51 天 | 高 | **用户已提交实现修复，只差策略决策**，属低成本高收益项，建议优先闭环。 |
| [#9635](https://github.com/deepseek-ai/deepseek-harness/discussions/9635) 上下文溢出不可恢复 | 2026-10-13 | ~30 天 | 高 | 会话级死锁，影响重度用户；本轮仅改善提示层。 |
| [#11095](https://github.com/deepseek-ai/deepseek-harness/discussions/11095) / [#11624](https://github.com/deepseek-ai/deepseek-harness/discussions/11624) cookie 溢出 | 2026-10-26 / 10-31 | ~17 天 | 高 | 两个重复讨论（19+7 评论）应合并跟踪，根因明确（cookie 未清理 + 随机端口命名），修复成本低。 |
| [#10100](https://github.com/deepseek-ai/deepseek-harness/discussions/10100) DSML 输出 | 2026-10-18 | ~25 天 | 中 | 影响输出纯净度，跨模型侧协作。 |
| [#9322](https://github.com/deepseek-ai/deepseek-harness/discussions/9322) Windows 沙箱临时目录失效 | 2026-10-10 | ~33 天 | 中 | 与 #7504 同域，建议合并排期。 |

**维护者行动建议**：
1. **合并重复讨论**：#11095 与 #11624 同根因，合并后可降低沟通成本。
2. **优先闭环低成本高影响项**：#7504 已有用户修复、#11095 cookie 清理逻辑简单，二者若纳入下个 rc 可显著改善"启动即崩"口碑。
3. **对 #12751 给出官方安全声明**：明确 Agent 写文件/删目录的操作边界与后续防护计划，避免信任进一步流失。
4. **对 Linux 与支付给出明确答复**（哪怕是否定或长期路线图），37/56 评论的高热度帖长期无官方回应会放大负面情绪。

---

*数据来源：DeepSeek Harness GitHub Releases 与 Discussions，统计截至 2026-11-12。该项目未启用 GitHub Issues/PR，版本合并以 Releases changelog 为准。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*