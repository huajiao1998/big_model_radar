# OpenClaw 生态日报 2026-11-17

> Issues: 316 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-17 04:13 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 · 2026-11-17

> 数据窗口：2026-11-16 ~ 2026-11-17（UTC）｜来源：GitHub OpenClaw/openclaw

---

## 1. 今日速览

- **高活跃度**：过去 24 小时 PR 更新 **500 条**（待合并 226 / 已合并或关闭 274），Issues 更新 **316 条**（活跃 229 / 关闭 87），社区吞吐量处于项目高位区间。
- **新版发布**：发布 **v2026.11.4**，单版本含 **220 commits / 125 PR / 90 contributors**，节奏紧凑、贡献者来源分散。
- **主题集中在更新与迁移**：今日 PR 大量围绕 update / 迁移（SQLite↔PostgreSQL、Git checkout 安装、WAL 校验）展开，说明 2026.11.x 升级路径是当前主要压力点。
- **稳定性押注未卸下**：仍有 2 个 P0（网关崩溃循环、Windows 更新挂起）和至少 8 个 P1 问题开放，多数未挂载修复 PR，是健康度的主要拖累。
- **整体评估**：**活跃度 A / 稳定性 B-**。迭代非常快、合并率高，但高严重度问题的修复供给跟不上新增报告速度。

---

## 2. 版本发布

### v2026.11.4（当前 latest）
- 版本摘要：`openclaw 2026.11.4`，**220 commits · 125 PRs · 90 contributors**。
- 发布说明与 changelog 同源双份呈现，官方文档入口：[docs.openclaw.ai/releases/202…](https://docs.openclaw.ai/releases/)（原始数据中链接被截断，实际路径请以官方页面为准）。
- **破坏性变更 / 迁移注意事项**：数据中未直接给出 breaking change 清单，但从今日 PR 主题反推，**升级路径敏感区**集中在：
  - `database port --family agent --to sqlite` 在更新后可能因 "observed changed canonical rows or allocations" 失败（见 #200383 / #200388）。
  - 受管 npm 升级 + post-install Doctor 的 WAL 发布校验可能失败并留下 partially finalized 状态（见 #197083）。
  - Git checkout 安装升级可能因 "Declaration input escapes checkout" 在 `preflight-build` 中止（见 #200387，闭合 #200357）。
  - **建议**：升级前备份 `state/openclaw.sqlite` 及 `agents/<id>/agent/*.sqlite`；升级后若遇到 WAL/迁移类错误，先等待 v2026.11.5 相关修复合并，不要强制降级（`state-migrated-no-rollback` 会拒绝回滚）。

---

## 3. 项目进展

今日已合并 / 关闭的 PR 可归为四条主线：

**① 网关稳定性（直接影响 P0/P1 事故面）**
- [#200374](https://github.com/openclaw/openclaw/pull/200374) CLOSED — 插件 reload 恢复期间避免阻塞 Gateway 事件循环（跟进 #198262 / #200320 / #200136），对应 #160959 的根因方向。
- [#200370](https://github.com/openclaw/openclaw/pull/200370) CLOSED — readiness 探测不再冻结主线程，针对 11/16 生产事故（~8 GB RSS Gateway 卡顿 3,682 ms）。
- [#200384](https://github.com/openclaw/openclaw/pull/200384) CLOSED — 网关启动数据库预检去掉逐目标 `statSync` 探测，提升多 agent 场景启动性能。
- [#200391](https://github.com/openclaw/openclaw/pull/200391) CLOSED — 修复 Goal authority E2E 回归（子结果已消费后取消需保留检查）。

**② 更新 / 迁移路径（今日最密集）**
- [#200389](https://github.com/openclaw/openclaw/pull/200389) OPEN — Gateway 安装检查在 `update --no-restart` 期间不再抢占正在被 update 持有的安装目录。
- [#200387](https://github.com/openclaw/openclaw/pull/200387) OPEN（**P1**）— 允许 Git 更新在嵌套 candidate checkout 中构建，闭合 #200357。
- [#200388](https://github.com/openclaw/openclaw/pull/200388) / [#200383](https://github.com/openclaw/openclaw/pull/200383) OPEN — 让 agent 在更新后能顺利 `database port` 回 SQLite（含 PostgreSQL→SQLite 反向迁移），闭合 #200356。
- [#200331](https://github.com/openclaw/openclaw/pull/200331) OPEN — 更新成功后 shell completion / service definition 刷新失败将可被记录与重试。

**③ UI / UX 精细化**
- [#200343](https://github.com/openclaw/openclaw/pull/200343) CLOSED — 插件卡展示安装/连接状态、MCP 授权取消与重试。
- [#200393](https://github.com/openclaw/openclaw/pull/200393) CLOSED — 长 session 菜单滚动条收进圆角。
- [#200400](https://github.com/openclaw/openclaw/pull/200400) CLOSED — Control UI 多语言刷新（bot 生成），走 protected-branch 流程。

**④ 测试 / CI 卫生**
- [#200397](https://github.com/openclaw/openclaw/pull/200397)、[#200390](https://github.com/openclaw/openclaw/pull/200390)、[#200382](https://github.com/openclaw/openclaw/pull/200382) CLOSED — 减少文档链接审计重复序列化、冷 worker manifest 只写一次、清理过时 agent command 策略 mock。
- [#200398](https://github.com/openclaw/openclaw/pull/200398) OPEN — 恢复 Full Release Validation 的 pinned watcher 工作流（此前 run 44009791580 因 GitHub 无法解析 workflow 被 block）。

> **向前推进量**：274 条已合并/关闭 PR，按主题估算，约 **50%+ 集中在更新/迁移与网关稳定性**，这是当前版本最需要的方向。

---

## 4. 社区热点

按评论数排序的热点如下：

| # | 议题 | 状态 | 评论 | 核心诉求 |
|---|---|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | Gateway 因捕获大型外部插件阻塞数分钟（2026.9.6 回归） | OPEN · **P0 · 崩溃循环** | 83 | 插件生成捕获（#144252 引入）让事件循环被大依赖树长期占用；**需同步/索引类操作异步化**。今日 #200374 已合并，方向对但根因未完全闭环。 |
| [#164294](https://github.com/openclaw/openclaw/issues/164294) | Gateway WAL 自动 checkpoint 从未完成（被 in-process reader 钉住） | OPEN · P2 | 41 | 连续 866/17091 frames blocked；用户担心长期磁盘膨胀与恢复失败。需修复 SQLite reader 生命周期。 |
| [#191944](https://github.com/openclaw/openclaw/issues/191944) | macOS `gateway stop` / `--force` 均失败（Process ancestry could not be fully inspected） | OPEN · P2 | 34 | Intel x64 macOS 特有；影响运维可控性。 |
| [#150635](https://github.com/openclaw/openclaw/issues/150635) | 短期召回淘汰让 dreaming deep phase 永不晋升 | OPEN · P2 | 28 | 512 容量满后 nightly 摄入全是零召回条目，memory 晋升链路堵塞。 |
| [#44309](https://github.com/openclaw/openclaw/issues/44309) | A2A 单向下发模式（无 reply-back ping-pong） | **CLOSED** · P2 | 19 · 👍1 | 社区对多 agent 协作语义的诉求，最终关闭（需核对是否被其他方案吸收）。 |
| [#197083](https://github.com/openclaw/openclaw/issues/197083) | 11.1→11.3 升级后 Doctor WAL 校验失败，更新 partially finalized | OPEN · P2 | 18 | 更新事务性不足；与 #200387/#200389 同源。 |
| [#143017](https://github.com/openclaw/openclaw/issues/143017) | 持久 session 五种前缀改写方式（实测 21.3M cache-write tokens） | OPEN · P2 | 18 | Prompt cache 命中率是可见成本，用户在做生产环境实测。 |
| [#169844](https://github.com/openclaw/openclaw/issues/169844) | Windows Control UI 更新卡在 "Activating"，Scheduled Task 被禁用 | OPEN · **P0 · 崩溃循环** | 13 | 与 #200398、#199617 同一 Windows 更新家族问题。 |

**分析**：热点高度集中在 **更新路径 + 网关稳定性 + memory/缓存成本** 三条线。P0 议题评论数远超 P1/P2，说明社区对崩溃循环高度敏感；同时 #143017 表明已有用户在做 wire 级生产流量取证，是产品成熟度信号。

---

## 5. Bug 与稳定性

按严重程度排序，**标注是否有修复 PR**：

### P0（崩溃 / 崩溃循环 / 可用性中断）
- [#160959](https://github.com/openclaw/openclaw/issues/160959) Gateway 捕获大型外部/workspace 插件时阻塞数分钟，startup 与 runtime 发布均触发 — **部分缓解**（#200374 已合并，未挂新 fix PR）。
- [#169844](https://github.com/openclaw/openclaw/issues/169844) Windows Control UI 更新卡 "Activating"（stage 4/7），Scheduled Task 留为 Disabled — **暂无直接 fix PR**。

### P1（高影响功能 / 数据丢失 / 安全）
- [#65624](https://github.com/openclaw/openclaw/issues/65624) Mattermost slash command 默认明文 callback URL 泄露可复用 token（CVSS v3.1 7.6 / v4.0 8.6）— **有 linked PR open，未合并**。安全优先级建议提升。
- [#185578](https://github.com/openclaw/openclaw/issues/185578) Gateway heap floor 只升不降，per-run 系统提示字符串在 run 后仍可达（~25 MiB/h，最终 V8 cap abort）— **无 fix PR**，标记 `not-repro-on-main`。
- [#194403](https://github.com/openclaw/openclaw/issues/194403) 辅助补全 continuation 使自身 authority 失效，后续对话被阻塞 — **无 fix PR**。
- [#162497](https://github.com/openclaw/openclaw/issues/162497) `SqliteWorkerBroker` `MAX_STORES = 64` 硬上限，~64 agent 网关每 turn 报 "temporary internal error" — **无 fix PR**。
- [#160762](https://github.com/openclaw/openclaw/issues/160762) claude-cli + Telegram `steer` 模式下 mid-turn 消息丢失 — **无 fix PR**。
- [#185111](https://github.com/openclaw/openclaw/issues/185111) 大 session（231,865 事件）context snapshot 读取 19–25 s — **无 fix PR**。
- [#196505](https://github.com/openclaw/openclaw/issues/196505) `memory index --force` 触发 "worker task capacity reached" 且不重试（~864 MiB 语料永不完成）— **无 fix PR**。
- [#200387](https://github.com/openclaw/openclaw/pull/200387)（**PR**）修复 Git 更新在 shipped v2026.11.4 updater 的 `preflight-build` 中止 — **本身就是 fix PR**，状态 OPEN。

### P2（UX 摩擦 / 行为错误，节选）
- [#164294](https://github.com/openclaw/openclaw/issues/164294) WAL checkpoint 长期 blocked — 无 fix PR。
- [#197083](https://github.com/openclaw/openclaw/issues/197083) 11.3 升级 WAL 校验失败，plugin 侧部分未完成 — 方向与 #200387/#200389 重叠。
- [#191944](https://github.com/openclaw/openclaw/issues/191944) macOS stop 失败 — 标记 `fix-shape-clear`。
- [#172969](https://github.com/openclaw/openclaw/issues/172969) `registerCliBackend` 缺 `modelProvider` 时静默丢弃，向用户暴露为 "Invalid URL" — 标记 `fix-shape-clear`。
- [#161158](https://github.com/openclaw/openclaw/issues/161158) `gateway restart` 误报失败却 exit 0，60 s 预算硬编码 — 标记 `fix-shape-clear`。
- [#169844](https://github.com/openclaw/openclaw/issues/169844) 同属 Windows 更新家族。
- [#199617](https://github.com/openclaw/openclaw/issues/199617) Windows 11.5-beta.3 升级 `gateway-stop-unverified`。
- [#191855](https://github.com/openclaw/openclaw/issues/191855) macOS 26.3.1 上更新器 EACCES 误报。
- [#177094](https://github.com/openclaw/openclaw/issues/177094)、[#149153](https://github.com/openclaw/openclaw/issues/149153)（已关闭）— Control UI webchat 渲染/重复回复类 UI 问题。

**趋势判断**：**更新/迁移类 P2 正在被 PR 化**（#200383/#200387/#200388 成串），但 **P1 内存/容量类（#185578、#162497、#196505）和 P1 安全（#65624）今日无修复供给**，是下一步最应优先清理的批次。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 信号强度 | 判断 |
|---|---|---|---|
| Memory slot owner 驱动 Dreams 页面（`MemoryPluginCapability.dreaming`） | [#138366](https://github.com/openclaw/openclaw/issues/138366) | 13 评论 · P2 · 已标记 `needs-product-decision` | Dreaming / memory 生态的插件化延伸，与今日多条记忆类 Bug 呼应，**中期方向**。 |
| 安装感知的升级后调查 + 可观测恢复窗口 | [#159743](https://github.com/openclaw/openclaw/issues/159743) | P3 · 有 narrowing 后的作者提案 | 与今日 update PR 群强相关，**很可能被并入 2026.11.5 更新可靠性工作**。 |
| 团队侧边栏手动排序（拖拽 + 键盘 Move up/down） | [#155039](https://github.com/openclaw/openclaw/issues/155039) | P2 · UX 类 | 低成本高感知的 UI 需求，等待产品决策。 |
| `/usage full` 暴露 model.auth_label | [#169428](https://github.com/openclaw/openclaw/issues/169428) | P3 · `fix-shape-clear` | 小型、清晰，**较可能进入近期版本**。 |
| Review 文件渲染 Markdown 预览 | [#128090](https://github.com/openclaw/openclaw/issues/128090) | **CLOSED** · 👍4 | 已关闭，需核对是已交付还是作为 dup 处理。 |
| A2A 单向下发（dispatch-only） | [#44309](https://github.com/openclaw/openclaw/issues/44309) | **CLOSED** | 已关闭；若未随版本交付，可能以 PR 形式重开。 |

**路线图信号**：今日已在推进的 open PR 中，[#184515](https://github.com/openclaw/openclaw/pull/184515)（guest 通过被邀请的 mention 访问 session，XL 体量）和 [#199706](https://github.com/openclaw/openclaw/pull/199706)（Git checkout 安装从 release 下运行，含兼容性风险标记）代表**权限模型**与**发行形态**两条战略线，值得作为下个版本的主线观察。

---

## 7. 用户反馈摘要

从 50 条高评论 Issue 中可提炼：

**核心痛点**
1. **升级即"高风险动作"**：从 #197083（11.1→11.3 WAL 校验失败）、#199617（11.5-beta.3 Windows 验证失败）、#191855（macOS EACCES 误报）到 #182616（3.4 GiB SQLite 状态升级耗时 **63m50s**，含 **28m33s** 停机），用户对 **update 的原子性、可恢复性与耗时** 容忍度已到临界点。
2. **memory / context 的可预测性**：#150635（deep dreaming 永不晋升）、#196505（大语料 index 不重试）、#185111（大 session 读取 19–25 s）、#143973（`view_image` 以 base64 全量落库，**1.3% 事件占 80% 存储**）——用户在做容量与成本实测，且数据已相当量化。
3. **平台差异带来的运维摩擦**：macOS（#191944、#191855、#192667）、Windows（#169844、#199617）三端各有独立故障族，Linux 相对干净。
4. **多 agent / 多租户规模化边界**：`MAX_STORES=64`（#162497）、worker `pending-byte` 预算（#196505）、共享 workspace 根目录被当作 live workspace（#173057）——用户已跑在接近设计上限的负载上。

**使用场景信号**
- 团队多 agent + 多 channel（Telegram / Slack / Discord / Signal / Mattermost / google-meet）是主流部署形态；#140455（Meet 语音）、#165615（Discord Components V2 编辑）、#196419（Signal 表情审批）说明 **渠道深度集成** 是真实需求。
- A2A 协作（#44309）、Goal / helper-completion（#194403）说明 **agent 编排语义** 已进入用户生产工作流。

**满意度分布（推断）**
- ✅ 满意：版本迭代速度快、对具体 Bug 有明确 tag（`fix-shape-clear` / `source-repro`）、bot 辅助 triage 有效。
- ⚠️ 不满：P0/P1 长期挂开、更新路径反复出问题、被标记 `stale` 的高价值 Issue 与 P1 并存（如 #140455 自 2026-09-06 起 stale 且 P1）。

---

## 8. 待处理积压（提醒维护者关注）

**高危但长期挂账**
- [#65624](https://github.com/openclaw/openclaw/issues/65624) · P1 · 安全 · 创建 **2026-04-13**（最老开放 P1）— Mattermost 明文 callback URL；有 linked PR 但未推进。**建议列入安全评审专项**。
- [#140455](https://github.com/openclaw/openclaw/issues/140455) · P1 · 创建 2026-09-06 · 已 stale — google-meet 语音链路在真实 Meet 上崩溃。
- [#143017](https://github.com/openclaw/openclaw/issues/143017) · P2 · 创建 2026-09-09 — 21.3M cache-write tokens 的实测报告，影响直接成本，长期无 fix。
- [#150635](https://github.com/openclaw/openclaw/issues/150635) · P2 · 创建 2026-09-17 · 标记 `needs-product-decision` — 短期召回淘汰策略需产品拍板。
- [#101929](https://github.com/openclaw/openclaw/issues/101929) · P2 · 创建 2026-07-08 — context-overflow 估算高估 2.3–2.6×，长期未闭环。
- [#92473](https://github.com/openclaw/openclaw/issues/92473) · P2 · 创建 2026-06-12 — model fallback 通知泄漏到外部用户频道，涉及信息暴露。
- [#114414](https://github.com/openclaw/openclaw/issues/114414) · P3 — "Dated TODO sweep" 机器人Issue，已累积至 18 条评论且仍在更新，建议降低其噪声或转为看板任务。

**高投入长周期 PR**
- [#184515](https://github.com/openclaw/openclaw/pull/184515) · XL · 自 2026-10-26 开放 — guest session 访问权限 + 插件 visitor-access，安全敏感（`security-sensitive-changed`），需专人 review。
- [#199706](https://github.com/openclaw/openclaw/pull/199706) · XL · 自 2026-11-15 — Git checkout 安装从 release 运行，标记 `merge-risk: compatibility`，与今日多条 update 类 PR 互相依赖，建议合并排序规划。

---

### 附：数据口径
- Issues 取过去 24 小时更新中评论数 Top 50；PR 取评论数 Top 30（原始数据中评论数显示为 `undefined`，按列表序与标签权重推断其热度排序）。
- 所有链接指向 `https://github.com/openclaw/openclaw/`（issue / pull 路径）。
- 严重度以 Issue 自带标签 `P0/P1/P2/P3` 与 `clawsweeper` 系列标签为准；"已有 fix PR" 的判断依据为 `clawsweeper:no-new-fix-pr` 标签的缺失或存在与文本中 linked PR 引用。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告

**数据窗口：2026-11-16 ~ 2026-11-17（UTC）**  
**口径说明**：Issues/PR 为过去 24 小时“更新数”，非总存量；“活跃/关闭”“待合并/已合并关闭”按各日报口径汇总。DeepSeek Harness 为 Discussions-only，Issues/PR 未启用，故不与其余项目完全同口径比较。

---

## 1. 生态全景

个人 AI 助手与自主智能体开源生态正进入“平台化 + 基础设施化”阶段：头部项目以高吞吐迭代、插件/MCP 生态和多渠道接入扩张，但**更新迁移、网关稳定性、成本可观测、多租户隔离**已成为跨项目共性瓶颈。社区关注点正从“能不能用”转向“可复现、可解释、可运维”。Windows/Linux/macOS 覆盖、安装升级首因体验和发版透明度，正在直接影响采用率与口碑。整体看，生态活跃度很高，但**审查带宽、缺陷闭环和发版节奏**是健康度分水岭。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新（活跃/关闭） | PR 更新（待合并/已合并关闭） | Release 情况 | 健康度简评 |
|---|---:|---:|---|---|
| **OpenClaw** | 316（229/87） | 500（226/274） | v2026.11.4；220 commits / 125 PR / 90 contributors | **活跃 A / 稳定 B-**；吞吐高、合并率高，但 P0/P1 修复供给不足 |
| **Zeroclaw** | 12（12/0） | 50（47/3） | 0 | 高活跃、低合并；PR 积压与审查吞吐风险上升 |
| **PicoClaw** | 0 | 4（2/2） | 0 | 中性偏谨慎；以历史 PR 清理为主，review 反馈偏慢 |
| **QwenPaw** | 45（27/18） | 50（37/13） | 0 | 高活跃；Review 带宽是主要瓶颈，v2.3.0 回归需关注 |
| **hermes-agent** | 334（317/17） | 500（434/66） | 2 个：v0.23.2 稳定版 + canary；v0.23.2 打包约 1,989 个已合并 PR | 开发活力极强；稳定性与审查带宽瓶颈明显 |
| **AstrBot** | 9（6/3） | 41（36/5） | 0 | 良好；修复闭环快，但 36 条待合并 PR 形成评审吞吐风险 |
| **DeepSeek Harness** | Discussions 185；Issues/PR 未启用 | — | 0 | 讨论热、交付冷；缺陷闭环与发版透明度是短板 |

**关键观察**：OpenClaw 与 hermes-agent 同处第一梯队吞吐量，但 OpenClaw 当日 PR 合并/关闭占比约 **54.8%**，hermes-agent 仅约 **13.2%**；OpenClaw 的合并效率更高，hermes 的待合并池更大。

---

## 3. OpenClaw 在生态中的定位

**优势**：OpenClaw 是当前生态中**核心参照型项目**。其单日 PR 更新 500 条、Issues 更新 316 条，且 v2026.11.4 单版本含 **220 commits / 125 PR / 90 contributors**，说明贡献者分散度和发布节奏均处于第一梯队。相比 hermes-agent 的 434 条待合并 PR，OpenClaw 当日 274 条已合并/关闭，**主干消化能力更强**。

**技术路线差异**：OpenClaw 更偏“**网关中心 + 插件/MCP + 多 agent/多渠道**”的通用个人 AI 助手底座，当前主要压力集中在 SQLite/PostgreSQL 迁移、Git checkout 安装、WAL 校验、更新原子性等**运行时升级路径**。hermes-agent 则把 CLI、TUI、Desktop、API server、消息 bot、cron、Kanban 收敛到统一网关，组件面更宽；AstrBot 更偏聊天机器人框架与 ChatUI 插件工作台；QwenPaw 更偏企业桌面 Agent 与 Plugin SDK；Zeroclaw 更偏安全执行、凭据与 Provider 基础设施。

**社区规模对比**：以公开吞吐和贡献者数看，OpenClaw 与 hermes-agent 同属第一梯队。OpenClaw 单版本 90 contributors 显示贡献者来源分散；hermes-agent 待合并 PR 434 条、v0.23.2 打包近 2,000 个 PR，贡献入口更宽但审查压力更重。OpenClaw 社区更聚焦核心网关/插件/升级可靠性，hermes 更偏全栈工作台与多组件协同。

---

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 / 证据 |
|---|---|---|
| **更新/迁移可靠性** | OpenClaw、hermes-agent、QwenPaw、DeepSeek Harness、AstrBot | OpenClaw #197083/#200387、hermes #152494、QwenPaw #8698、DeepSeek #11032、AstrBot #11174：原子更新、失败可恢复、发版透明、依赖单一来源 |
| **网关/运行时生命周期与超时契约** | OpenClaw、hermes-agent、DeepSeek Harness、Zeroclaw、QwenPaw | OpenClaw #160959、hermes #145022/#119070、DeepSeek #8827/#11258、Zeroclaw #11585、QwenPaw #8770：超时强制中止、worker 状态持久化、半初始化拒绝 |
| **成本/预算可观测** | Zeroclaw、hermes-agent、OpenClaw | Zeroclaw #11204（OpenRouter spend $0.00）、#11585（限额后只能重启）；hermes #118379/#155404；OpenClaw #143017（21.3M cache-write tokens）：usage 入库、缓存命中/节省、预算 override |
| **多租户/多渠道隔离与权限** | OpenClaw、hermes-agent、QwenPaw、Zeroclaw | OpenClaw #184515/#162497、hermes #3897（共享 bot RBAC）、QwenPaw #8755/#8771（微信/DingTalk 隔离）、Zeroclaw #12373/#12494：per-agent workspace、凭据不暴露、会话不串话 |
| **插件/技能 SDK 与市场生态** | OpenClaw、QwenPaw、AstrBot、Zeroclaw | OpenClaw 插件 UI/MCP；QwenPaw #8071/#8764（主题/Hook/SDK 1.1）；AstrBot #11179/#11192/#11191（插件工作台、市场分页）；Zeroclaw Provider V5 registry：插件成为一等公民 |
| **记忆/上下文/检索** | OpenClaw、DeepSeek Harness、QwenPaw、AstrBot | OpenClaw #150635/#185111、DeepSeek #8713/#1999/#9692、QwenPaw #8727、AstrBot #11167：长会话压缩、中文检索、Ctrl+F、记忆晋升可预测 |
| **跨平台与首因体验** | OpenClaw、hermes-agent、DeepSeek Harness、QwenPaw、Zeroclaw | OpenClaw Windows/macOS 更新问题；hermes Windows 卡死/文件系统风暴；DeepSeek Linux 缺失、Windows 沙箱失败；QwenPaw 中文 Windows/GBK；Zeroclaw PowerShell 裸 `@` 误伤 |
| **可观测性与日志可靠性** | Zeroclaw、QwenPaw、hermes-agent、DeepSeek Harness | Zeroclaw #12391 trace 丢失、#12476 日志刷屏；QwenPaw #7709 定时任务无输出；hermes #122609 索引告警疲劳；DeepSeek 缺 Issue 分级与状态追踪 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 通用个人 AI 助手底座、插件/MCP、多 agent/多渠道、更新迁移 | 技术型个人、团队、插件开发者 | 网关中心；SQLite/PostgreSQL 迁移与 Git checkout 安装复杂，升级路径是当前主压力 |
| **hermes-agent** | 全栈 Agent 工作台、统一网关、Kanban、Desktop/Mobile/Cloud | 重度多 profile、共享团队 bot 用户 | 单网关进程整合 CLI/TUI/Desktop/API/bot/cron/Kanban，组件耦合面大 |
| **AstrBot** | 多渠道聊天机器人框架、ChatUI、插件工作台与市场 | 社区/QQ 等渠道运营者、插件开发者 | 插件 UI 化、市场分页与依赖现代化并行，偏“聊天机器人平台” |
| **QwenPaw** | 企业桌面 Agent、Plugin SDK 1.1、MCP、微信/DingTalk、Creator | 企业 SaaS、多成员共享安装、插件生态 | 强调身份 Hook、凭据隔离、多 agent/多渠道一致性 |
| **Zeroclaw** | 安全执行、凭据管理、Provider 注册表、成本预算 | 安全敏感团队、平台基础设施开发者 | 任务级 SSH 隔离、canonical Provider registry、成本 enforcement |
| **PicoClaw** | 轻量技能安装、Perplexity 集成、硬件/低资源生态 | 轻量部署、嵌入式/硬件用户 | 低活跃、维护清理期；技能去重与集成标识是当前小切口 |
| **DeepSeek Harness** | 桌面客户端 harness、沙箱、会话检索、模型厂商工具链 | Windows/Linux 开发者、模型厂商用户 | Discussions-only、发版驱动弱，沙箱与发布工程是短板 |

---

## 6. 社区热度与成熟度

**第一梯队：超高吞吐、快速迭代但需质量巩固**  
- **OpenClaw、hermes-agent**：单日 PR 均达 500 条。OpenClaw 合并效率更高，但 P0/P1 修复供给不足；hermes 待合并 434 条、Issue 关闭率仅约 5%，积压增速快于消化速度。二者都处于“高速迭代 + 稳定性补课”并行阶段。

**第二梯队：中高活跃、产品化推进中**  
- **QwenPaw、AstrBot、Zeroclaw**：QwenPaw Issue/PR 双 45/50，Review 带宽是瓶颈；AstrBot PR 41 条、修复闭环快，但 36 条待合并形成评审压力；Zeroclaw PR 50 条但仅 3 条合并/关闭，处于高活跃低合并的早期积压阶段。

**第三梯队：低活跃维护/清理期**  
- **PicoClaw**：Issues 0、PR 4，关闭 2 条长期汇总型 PR，属于积压清理而非功能推进。

**特殊形态：讨论驱动、交付偏冷**  
- **DeepSeek Harness**：Discussions 185 条，但 0 Release、无 Issues/PR 跟踪。社区技术讨论质量高，但“修复已合入未发版”和缺少状态标签导致讨论量被动膨胀。

**成熟度判断**：OpenClaw、hermes 已进入“规模换质量”阶段；AstrBot 修复响应健康但需提升评审吞吐；QwenPaw 需处理 v2.3.0 回归；Zeroclaw 需解决合并瓶颈；PicoClaw 处于维护巩固；DeepSeek Harness 需补发布工程与缺陷跟踪。

---

## 7. 值得关注的趋势信号

1. **更新/迁移已成为 AI 助手运行时的最大风险源**  
   OpenClaw 的 WAL/迁移/安装问题、hermes 的配置迁移、QwenPaw 升级失败、DeepSeek “修复未进发布包”共同说明：**事务性更新、回滚、备份、发版清单**应作为运行时一等能力建设。

2. **统一网关/单进程化后，生命周期契约比功能更重要**  
   hermes 网关 post-merge 回归、Kanban worker 丢失；OpenClaw 网关崩溃循环；DeepSeek 工具超时仅通知不中止；QwenPaw 半初始化 workspace 挂起——行业需要**强制超时中止、worker lease、状态机持久化**。

3. **成本可解释性成为刚需**  
   Zeroclaw 的 spend $0.00、hermes 的凭证池合并计费、OpenClaw 的 cache-write 成本实测表明：用户接受付费，但不接受账目不可解释。**usage/cache/billing 遥测**将成平台标配。

4. **多租户/多渠道隔离从“nice-to-have”变为刚需**  
   共享 bot RBAC、微信/DingTalk 会话碰撞、per-agent 凭据隔离、`MAX_STORES=64` 等信号显示：用户已跑在设计上限附近，**per-agent workspace、凭据作用域、会话路由隔离**必须前置。

5. **插件 SDK/主题/Hook/市场正在成为平台竞争焦点**  
   OpenClaw 插件 UI/MCP、QwenPaw SDK 1.1 与主题扩展、AstrBot 插件工作台/市场分页、Zeroclaw Provider registry 均指向同一趋势：**插件不再只是扩展点，而是产品叙事核心**。

6. **跨平台与首因体验决定采用漏斗**  
   hermes Windows、DeepSeek Linux 缺失/Windows 沙箱、OpenClaw macOS/Windows 更新、QwenPaw 中文 Windows、Zeroclaw PowerShell 均显示：平台兼容与安装/升级体验是用户流失的高敏环节。

7. **发布透明与支持通道需要工程化**  
   DeepSeek “master 修复未发版”、hermes Skills 索引告警疲劳、Zeroclaw trace 丢失、QwenPaw 输出不可见，说明社区需要**“已确认/已定位/已修复待发版/已发版”状态标签**和公开修复清单，以降低重复追问与告警噪音。

**对 AI 智能体开发者的参考**：下一阶段竞争力不只在模型接入与功能数量，更在**运行时可靠性、升级事务性、成本遥测、隔离权限、插件边界和跨平台交付**。优先补齐这些基础设施的项目，更可能把高活跃度转化为长期社区信任。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报（2026-11-17）

> 数据窗口：过去 24 小时。说明：本次数据未提供 3 条已合并/关闭 PR 的编号与明细，PR 评论数字段缺失；因此“项目进展”以活跃待合并 PR 为主，不代表已合入或已发布。

## 1. 今日速览
- 过去 24 小时 Issues 更新 **12 条**，全部为新开/活跃，关闭 **0 条**；PR 更新 **50 条**，其中待合并 **47 条**，已合并/关闭仅 **3 条**；无新版本发布。
- 项目活跃度高，但合并吞吐与 Issue 关闭率偏低：按更新量粗略看，PR 合并/关闭占比约 6%，积压风险上升。
- 讨论集中在成本核算与预算控制、日志/追踪可观测性、安全策略与凭据管理、运行时可靠性。
- 今日没有发布级交付，主要进展是大型 stacked PR 持续更新与关键 Bug 的复现/设计讨论，整体属于“高活跃、低合并”的一天。

## 2. 版本发布
过去 24 小时无新 Release，无更新内容、破坏性变更或迁移事项。

## 3. 项目进展
- 今日 PR 更新 50 条，但仅 3 条合并/关闭，且数据源未给出具体编号，无法逐条评估其影响；无新版本，因此不构成版本级推进。
- 活跃待合并 PR 中，较重要的推进方向包括：
  - **安全执行与隔离**：[#11869](https://github.com/zeroclaw-labs/zeroclaw/pull/11869) 任务级 SSH 传输复用、[#12438](https://github.com/zeroclaw-labs/zeroclaw/pull/12438) 原生 Rust 任务代理、[#12418](https://github.com/zeroclaw-labs/zeroclaw/pull/12418) Python 任务助手收敛；对应 RFC [#12494](https://github.com/zeroclaw-labs/zeroclaw/issues/12494) 提出每 Agent 隔离开发构建运行器。
  - **凭据管理**：[#12373](https://github.com/zeroclaw-labs/zeroclaw/issues/12373) 写-only WebUI 凭据管理与作用域密钥引用，Issue 中提到 Draft PR [#12402](https://github.com/zeroclaw-labs/zeroclaw/pull/12402)；[#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) 提出操作员托管服务凭据的作用域使用。
  - **Provider 注册表与模型绑定**：[#12450](https://github.com/zeroclaw-labs/zeroclaw/pull/12450) 采用 canonical V5 registry、[#12455](https://github.com/zeroclaw-labs/zeroclaw/pull/12455)/[#12456](https://github.com/zeroclaw-labs/zeroclaw/pull/12456) Provider 连接与协议重构、[#12453](https://github.com/zeroclaw-labs/zeroclaw/pull/12453)/[#12452](https://github.com/zeroclaw-labs/zeroclaw/pull/12452) Web/Zerocode 模型选择。该组 PR 多为 XL、risk:high、needs-author-action，审查与合并链路较长。
  - **运行时与渠道稳定性**：[#12188](https://github.com/zeroclaw-labs/zeroclaw/pull/12188) 修复 tool-result envelope、[#12061](https://github.com/zeroclaw-labs/zeroclaw/pull/12061) 驱逐被污染的 MCP 连接、[#11868](https://github.com/zeroclaw-labs/zeroclaw/pull/11868) 阻止重复工具调用、[#11911](https://github.com/zeroclaw-labs/zeroclaw/pull/11911) 保留已完成工具结果、[#11874](https://github.com/zeroclaw-labs/zeroclaw/pull/11874) 长回合进度上报。
- **整体评估**：今日主要是“审查与堆叠推进”，而非“合并落地”。47 条待合并 PR 对维护者审查带宽形成压力，项目向前迈进的幅度有限，但安全、凭据、Provider 注册表三条主线信号清晰。

## 4. 社区热点
今日 Issues 评论最活跃的条目如下；所有条目 👍 均为 0，讨论更偏故障复现与架构安全，而非宣传型热点。

| Issue | 评论 | 热点诉求 |
|---|---:|---|
| [#11204](https://github.com/zeroclaw-labs/zeroclaw/issues/11204) OpenRouter spend $0.00 / tokens 全归类 free | 6 | 成本数据不可信，影响 Dashboard 与预算判断；P1、risk:high、status:accepted |
| [#12005](https://github.com/zeroclaw-labs/zeroclaw/issues/12005) PowerShell 方言拒绝参数中的裸 `@` | 5 | Windows 安全策略/allowlist 回归，导致合法 mail CLI 不可用 |
| [#10073](https://github.com/zeroclaw-labs/zeroclaw/issues/10073) 退役 StoragePolicy::Rolling | 4 | 日志存储性能回归与跨 segment 查询，p2 accepted in-progress |
| [#12373](https://github.com/zeroclaw-labs/zeroclaw/issues/12373) 写-only WebUI 凭据管理 | 4 | 操作员需要在不让模型/聊天/技能文本看到凭据的前提下授权任务 |
| [#12391](https://github.com/zeroclaw-labs/zeroclaw/issues/12391) runtime-trace.jsonl 跨重启丢失数小时事件 | 3 | 生产可观测性断裂，队列/写入器静默丢数据 |
| [#11585](https://github.com/zeroclaw-labs/zeroclaw/issues/11585) 成本限额触发后只能重启 daemon | 3 | 预算控制可用性差，`cost.allow_override` 未被读取；P1、risk:high |

PR 侧评论数字段缺失，无法按评论数排序。从标签与更新面看，潜在审查热点是 NiuBlibing 的 V5 registry 堆叠 PR：[#12450](https://github.com/zeroclaw-labs/zeroclaw/pull/12450)、[#12455](https://github.com/zeroclaw-labs/zeroclaw/pull/12455)、[#12456](https://github.com/zeroclaw-labs/zeroclaw/pull/12456)、[#12453](https://github.com/zeroclaw-labs/zeroclaw/pull/12453)、[#12452](https://github.com/zeroclaw-labs/zeroclaw/pull/12452)，均涉及面广、size:XL、risk:high。另有高风险的跨 Agent 会话提示工具 [#12258](https://github.com/zeroclaw-labs/zeroclaw/pull/12258) 值得关注。

## 5. Bug 与稳定性
按严重度与影响排列；以下“直接 fix PR”仅基于本次提供的数据判断。

| 严重度 | 问题 | 影响 | Fix PR 情况 |
|---|---|---|---|
| **S1** | [#12477](https://github.com/zeroclaw-labs/zeroclaw/issues/12477) `cost.enforcement.mode` 被忽略，默认 warn 模式仍阻断回合 | 工作流被预算逻辑错误阻断，S1 - workflow blocked | 本次数据中未见直接 fix PR |
| **P1/S2** | [#11204](https://github.com/zeroclaw-labs/zeroclaw/issues/11204) OpenRouter `usage.cost` 从未入库，spend 显示 $0.00，tokens 全为 free | 成本可观测性失真，影响预算与运营判断；risk:high | 未见直接修复；[#11845](https://github.com/zeroclaw-labs/zeroclaw/pull/11845) 仅补充 OpenRouter 余额展示，非成本入库修复 |
| **P1/S2** | [#11585](https://github.com/zeroclaw-labs/zeroclaw/issues/11585) 成本限额触发后只能重启 daemon，`cost.allow_override` 不生效 | 重启杀死所有活跃会话，生产可用性受损；risk:high | 未见直接 fix PR |
| **未标注/高影响** | [#12005](https://github.com/zeroclaw-labs/zeroclaw/issues/12005) PowerShell 方言拒绝裸 `@`，allowlisted mail CLI 不可用 | Windows 安全策略回归，可能属功能阻断 | 未见直接 fix PR |
| **S2** | [#12391](https://github.com/zeroclaw-labs/zeroclaw/issues/12391) `runtime-trace.jsonl` 跨 daemon 重启丢失数小时事件 | 追踪数据缺口，排障与审计可信度下降 | 未见直接 fix PR |
| **S2** | [#12476](https://github.com/zeroclaw-labs/zeroclaw/issues/12476) gateway 每个连接以 INFO 经 `spawn!` 刷日志，淹没 runtime trace | 日志噪声放大，与追踪丢失问题叠加 | 未见直接 fix PR |
| **S2** | [#12489](https://github.com/zeroclaw-labs/zeroclaw/issues/12489) cron 调度等待整个 due batch，一个长任务延迟其他任务 | 定时任务队头阻塞 | 未见直接 fix PR |
| **S2** | [#12492](https://github.com/zeroclaw-labs/zeroclaw/issues/12492) Dashboard 聊天忽略 runtime profile 的 thinking 设置 | Web 与 Agent 行为不一致，native thinking 配置不生效 | 未见直接修复；[#12479](https://github.com/zeroclaw-labs/zeroclaw/pull/12479) 涉及 Anthropic thinking 历史，但非该 Dashboard 配置问题 |
| **性能/架构债** | [#10073](https://github.com/zeroclaw-labs/zeroclaw/issues/10073) `StoragePolicy::Rolling` 在持续事件量下性能回归 | 默认日志策略存在性能风险，需跨 segment 查询 | Issue 为 accepted/in-progress，本次数据中未见直接 PR |

## 6. 功能请求与路线图信号
结合标签、状态与已有 PR，短期更可能进入修复/小步交付的是成本与稳定性修复；安全凭据与隔离属于中期主线；Provider V5 注册表属于大型堆叠工程。

| 需求/方向 | 信号 | 路线图判断 |
|---|---|---|
| [#10073](https://github.com/zeroclaw-labs/zeroclaw/issues/10073) 退役 Rolling 存储策略，扩展 `/api/logs` 跨 segment 查询 | p2、accepted、in-progress、risk:high | 已进入设计/推进状态，可能中期落地 |
| [#12373](https://github.com/zeroclaw-labs/zeroclaw/issues/12373) 写-only WebUI 凭据管理与作用域密钥引用 | 安全诉求明确，Issue 提到 Draft PR [#12402](https://github.com/zeroclaw-labs/zeroclaw/pull/12402) | 中期高概率推进；先覆盖既有插件 TLS 绑定 |
| [#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) 操作员托管服务凭据的作用域使用 | RFC，安全模型变更 | 早期设计，可能影响下一阶段安全路线 |
| [#12494](https://github.com/zeroclaw-labs/zeroclaw/issues/12494) 每 Agent 隔离开发构建运行器 | RFC，安全隔离 | 早期，但与 [#11869](https://github.com/zeroclaw-labs/zeroclaw/pull/11869)/[#12438](https://github.com/zeroclaw-labs/zeroclaw/pull/12438) SSH/任务代理方向呼应 |
| [#12198](https://github.com/zeroclaw-labs/zeroclaw/pull/12198) 为无 transcription alias 的 Agent 增加默认 provider fallback | size:M，直接解决配置摩擦 | 较易进入近期版本 |
| [#12061](https://github.com/zeroclaw-labs/zeroclaw/pull/12061) 驱逐被污染的 MCP 连接 | size:S、risk:high、修复明确 | 若审查通过，适合作为稳定性修复进入近期版本 |
| [#12216](https://github.com/zeroclaw-labs/zeroclaw/pull/12216) 支持多个插件 registry origin | size:XL、needs-author-action | 中期；需作者继续推进 |
| [#11845](https://github.com/zeroclaw-labs/zeroclaw/pull/11845) Dashboard 展示 OpenRouter 余额 | size:L，补成本可视化 | 可缓解成本可见性，但不替代 [#11204](https://github.com/zeroclaw-labs/zeroclaw/issues/11204) 的 usage.cost 入库修复 |
| [#12496](https://github.com/zeroclaw-labs/zeroclaw/pull/12496) ADR-017 增加 daemon 持有 OIDC refresh 与 Okta/Entra ID 支持 | docs、size:XS | 早期架构决策，短期不形成功能交付 |

## 7. 用户反馈摘要
> 基于 Issues 正文/摘要提炼；评论正文未提供，无法判断用户对具体回复的满意/不满意情绪。

- **生产成本数据不可信是最大痛点**：用户通过 OpenRouter 跑了约 90 次请求、约 210 万 tokens，Dashboard 成本仍显示 `$0.000000`，全部 token 被归为 `free tok`；同时预算限额触发后只能重启 daemon，`allow_override` 与 `enforcement.mode` 不生效。
- **安全策略与平台兼容存在误伤**：Windows PowerShell 方言把参数中的裸 `@` 判为非法，导致 allowlisted mail CLI 不可用；用户明确指向 `policy.rs` 与安全策略回归。
- **可观测性可靠性受质疑**：生产 Windows 服务上 `runtime-trace.jsonl` 出现数小时缺口；gateway 又对每个连接以 INFO 刷日志，用户担心追踪被噪声淹没或静默丢弃。
- **凭据管理与隔离需求强**：操作员希望授权 Agent 执行任务，但不把底层凭据暴露给模型、聊天、技能文本或生成代码；开发型 Agent 执行不可信构建/测试时需要独立运行隔离。
- **体验一致性仍需补齐**：Dashboard 聊天不读取 thinking 配置、transcription 需要逐 Agent 配置、cron 长任务造成队头阻塞，说明 Web、运行时与调度层的一致性仍是真实使用摩擦。
- **整体信号**：用户愿意在生产环境部署并提交详细复现，说明项目有实际黏性；但成本、安全策略、日志与调度问题直接影响信任与可用性，需优先处理。

## 8. 待处理积压
当前 **47 条 PR 待合并**，而过去 24 小时仅 3 条合并/关闭，审查吞吐是主要健康度风险。以下为长期未关闭或需维护者重点关注的项目：

| 项目 | 创建时间/年龄 | 状态 | 关注理由 |
|---|---|---|---|
| [#10073](https://github.com/zeroclaw-labs/zeroclaw/issues/10073) | 2026-08-18 / 约 91 天 | p2、accepted、in-progress、risk:high | 最老的重要 Issue；默认日志策略性能回归，影响面大 |
| [#11204](https://github.com/zeroclaw-labs/zeroclaw/issues/11204) | 2026-09-27 / 约 51 天 | P1、accepted、risk:high | 6 条评论，成本数据完全失真；仍未见直接修复 PR |
| [#11585](https://github.com/zeroclaw-labs/zeroclaw/issues/11585) | 2026-10-06 / 约 42 天 | P1、accepted、in-progress、risk:high | 仅 3 条评论但影响预算控制与 daemon 可用性 |
| [#12005](https://github.com/zeroclaw-labs/zeroclaw/issues/12005) | 2026-10-23 / 约 25 天 | OPEN、5 评论 | 安全策略回归，allowlisted CLI 不可用 |
| [#11845](https://github.com/zeroclaw-labs/zeroclaw/pull/11845) | 2026-10-18 / 约 30 天 | OPEN、size:L | OpenRouter 余额展示，与成本可见性相关 |
| [#11868](https://github.com/zeroclaw-labs/zeroclaw/pull/11868) | 2026-10-19 / 约 29 天 | needs-maintainer-review、risk:high、size:XL | 重复工具调用与 closeout 保留，需维护者审查 |
| [#11869](https://github.com/zeroclaw-labs/zeroclaw/pull/11869) | 2026-10-19 / 约 29 天 | needs-author-action、risk:high、size:XL | SSH 传输复用，安全/执行隔离主线 |
| [#11911](https://github.com/zeroclaw-labs/zeroclaw/pull/11911) | 2026-10-20 / 约 28 天 | OPEN、size:XL | 保留已完成工具结果与有界恢复，影响渠道稳定性 |
| [#12061](https://github.com/zeroclaw-labs/zeroclaw/pull/12061) | 2026-10-27 / 约 21 天 | OPEN、size:S、risk:high | 修复明确、体量小，适合优先审查的 quick win |
| [#12216](https://github.com/zeroclaw-labs/zeroclaw/pull/12216) | 2026-11-03 / 约 14 天 | needs-author-action、size:XL | 多插件 registry origin，需作者继续推进 |

**维护者提醒**：除上述条目外，[#12450](https://github.com/zeroclaw-labs/zeroclaw/pull/12450)、[#12455](https://github.com/zeroclaw-labs/zeroclaw/pull/12455)、[#12456](https://github.com/zeroclaw-labs/zeroclaw/pull/12456)、[#12453](https://github.com/zeroclaw-labs/zeroclaw/pull/12453)、[#12452](https://github.com/zeroclaw-labs/zeroclaw/pull/12452) 形成大型 stacked PR 链，均于 11-17 更新，建议明确依赖顺序与审查责任人，避免相互阻塞。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-11-17）

## 1. 今日速览
- 过去24小时 PicoClaw 的 Issues 更新为 **0 条**，PR 更新 **4 条**（待合并 2、已合并/关闭 2），新版本发布 **0 个**，整体活跃度偏低，以维护清理为主。
- 今日关闭了 2 个长期汇总型 PR：[#1546](https://github.com/sipeed/picoclaw/pull/1546)、[#1544](https://github.com/sipeed/picoclaw/pull/1544)，两者创建于 2026-03-14，均用于汇总多个修复 PR，显示历史积压清理信号。
- 当前仍有 2 个待合并 PR 带 `stale` 标签：[#3466](https://github.com/sipeed/picoclaw/pull/3466)、[#3463](https://github.com/sipeed/picoclaw/pull/3463)，均无评论数据和点赞，review 吞吐是当前主要瓶颈。
- 今日无新增 Bug Issue；唯一明确稳定性修复是 #3463，针对技能安装误判问题；#3466 为 Perplexity 搜索集成 header 增强。
- 项目健康度评估：**中性偏谨慎**。无新版本、无新 Issue、无社区讨论热度；积压清理有进展，但待合并 PR 缺少及时反馈。

## 2. 版本发布
无新版本发布，故不展开。

## 3. 项目进展
- **[#1546](https://github.com/sipeed/picoclaw/pull/1546) [CLOSED]**：作者 @xuwei-xy，摘要为汇总合并 PR #1480、#1479、#1478、#1473、#1467。该 PR 创建于 2026-03-14，2026-11-16 关闭，属于长期积压的汇总型修复 PR。
- **[#1544](https://github.com/sipeed/picoclaw/pull/1544) [CLOSED]**：作者 @xuwei-xy，摘要为汇总合并 PR #1514、#1513、#1512、#1510、#1509。同样创建于 2026-03-14，2026-11-16 关闭。
- 进展评估：若上述两个 CLOSED PR 为合并关闭，则涉及至少 **10 个修复 PR** 的汇总清理；但摘要未列出具体修复内容，无法量化功能影响。若仅为关闭未合并，则项目净进展主要体现在积压清理而非功能推进。整体看，今日项目向前推进幅度有限，**以历史 PR 清理为主**。

## 4. 社区热点
- 今日无 Issues 更新，因此无 Issue 讨论热点。
- PR 侧评论数据为 `undefined`，所有展示 PR 的 👍 均为 0；可观察到的公开互动很低，暂无明确社区热点。
- 相对值得关注的是两个待合并 PR：
  - [#3463](https://github.com/sipeed/picoclaw/pull/3463)：修复技能安装时因 frontmatter `name` 重复导致的误判问题，属于用户可感知的安装稳定性问题。
  - [#3466](https://github.com/sipeed/picoclaw/pull/3466)：为 Perplexity web search 请求增加 `X-Pplx-Integration: picoclaw` header，属于集成标识/兼容性增强。
- 背后诉求：前者反映技能安装流程的健壮性不足；后者反映与 Perplexity 集成时的标识或归属需求。两者均缺少公开讨论，维护者反馈是主要不确定性。

## 5. Bug 与稳定性
- **今日新增 Bug Issue：无**。数据中未出现崩溃、回归或新报告的 Bug。
- **中等严重度：[#3463](https://github.com/sipeed/picoclaw/pull/3463) [OPEN] [stale]**
  - 问题：`picoclaw skills install` 及 agent 的 `install_skill` 工具在另一个已安装技能共享相同 frontmatter `name` 时，会报 `registry archive is not a valid skill`，即使两个技能目录、作者和内容不同。
  - 影响：阻断技能安装流程，属于功能可用性问题；未报告数据丢失或崩溃。
  - 修复状态：已有 fix PR #3463，但当前为 OPEN + stale，尚未确认合并，稳定性风险仍存在。
- **[#1546](https://github.com/sipeed/picoclaw/pull/1546)、[#1544](https://github.com/sipeed/picoclaw/pull/1544)** 可能包含历史修复，但摘要未列明具体 Bug，无法按严重程度归类。

## 6. 功能请求与路线图信号
- 今日无新增功能请求 Issue。
- **[#3466](https://github.com/sipeed/picoclaw/pull/3466) [OPEN] [stale]**：为 Perplexity web search 的硬编码 `https://api.perplexity.ai/chat/completions` 请求增加静态 `X-Pplx-Integration: picoclaw` header。属于小型集成增强，若维护者接受，可能进入后续补丁版本；当前 stale 状态表明路线图信号较弱。
- **[#3463](https://github.com/sipeed/picoclaw/pull/3463) [OPEN] [stale]**：更偏稳定性修复而非新功能；若合并，可改善技能安装体验，优先级应高于 #3466。
- 结论：无明确新功能需求输入，下一版本是否纳入上述 PR 取决于维护者 review，当前数据不足以判断路线图变化。

## 7. 用户反馈摘要
- 今日无 Issues 评论数据，无法从评论中提炼满意度或不满情绪。
- 从 PR 描述可提炼的真实痛点：
  - [#3463](https://github.com/sipeed/picoclaw/pull/3463)：用户安装不同技能时，仅因 frontmatter 名称相同就被误判为无效技能，说明技能去重逻辑应按安装根目录而非名称处理。
  - [#3466](https://github.com/sipeed/picoclaw/pull/3466)：Perplexity 搜索集成需要额外的 integration header，反映集成标识或调用方识别需求。
- 公开反应数据：相关 PR 👍 均为 0，评论数据缺失，暂无法判断社区满意或不满意程度。

## 8. 待处理积压
- **[#3463](https://github.com/sipeed/picoclaw/pull/3463) [OPEN] [stale]**：创建于 2026-11-06，更新于 2026-11-16，已约 11 天未合并；涉及技能安装误判，用户影响较直接，建议优先 review。
- **[#3466](https://github.com/sipeed/picoclaw/pull/3466) [OPEN] [stale]**：创建于 2026-11-09，更新于 2026-11-16，已约 8 天未合并；改动范围较小，但需确认 header 的集成必要性与副作用。
- **[#1546](https://github.com/sipeed/picoclaw/pull/1546)、[#1544](https://github.com/sipeed/picoclaw/pull/1544)**：已关闭，不再属于待处理积压；但其存续约 8 个月，提示长期 PR 汇总和积压清理流程仍有优化空间。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报｜2026-11-17

## 1. 今日速览

今日 QwenPaw 维持**高活跃度**：过去 24 小时 Issues 更新 45 条（新开/活跃 27，关闭 18），PR 更新 50 条（待合并 37，已合并/关闭 13），无新版本发布。Issue 关闭率约 40%，但关闭项中含 `invalid`/`test` 类条目，真实修复信号需打折；PR 待合并占比 74%，**Review 带宽仍是主要瓶颈**。维护侧今日关闭了空答复、微信通道/定时任务、Skills 安装性能等关键修复，整体以稳定性与性能收敛为主。社区侧插件生态诉求最突出，插件主题扩展、SDK 1.1、Hook 能力、多智能体/多渠道隔离构成今日讨论主线。

## 2. 版本发布

今日无新版本发布（0 个），Releases 为空；无破坏性变更或迁移事项。

## 3. 项目进展

今日已合并/关闭的重要 PR 以**稳定性、性能、通道可靠性**为主，核心新功能仍多处于待审状态：

| PR | 状态 | 推进内容 | 链接 |
|---|---|---|---|
| #8477 `perf(skills)` | CLOSED | 优化 staged pool skill 安装路径，将第二次全量目录复制改为原地重命名，降低 Skills 安装开销。 | https://github.com/agentscope-ai/QwenPaw/pull/8477 |
| #8676 `fix(chat)` | CLOSED | 修复空响应被误判为成功完成的问题，并在输出达到限制时提示用户；关联 #8521。 | https://github.com/agentscope-ai/QwenPaw/pull/8676 |
| #8772 `fix(channels)` | CLOSED | 加固微信消息投递，避免 cron reload 死锁，提升通道与定时任务稳定性。 | https://github.com/agentscope-ai/QwenPaw/pull/8772 |

仍在推进、值得关注的高影响 PR：

| PR | 状态 | 内容 | 链接 |
|---|---|---|---|
| #8770 `fix(runtime)` | OPEN | 后台启动未完成前拒绝聊天请求，避免半初始化 workspace 导致 run 挂起；关联 #8746。 | https://github.com/agentscope-ai/QwenPaw/pull/8770 |
| #8756 `fix(channels)` | OPEN | 按 agent workspace 隔离微信凭据，解决同一安装下两个微信账号冲突；对应 #8755。 | https://github.com/agentscope-ai/QwenPaw/pull/8756 |
| #8764 `feat(sdk)` | OPEN | 扩展 Plugin SDK 1.1，覆盖身份、模型选择、会话历史、生命周期与开发工具。 | https://github.com/agentscope-ai/QwenPaw/pull/8764 |
| #8769 `fix(desktop)` | OPEN | 防止 Windows 升级期间 CLI 重启导致捆绑 Python 扩展文件被占用。 | https://github.com/agentscope-ai/QwenPaw/pull/8769 |
| #8781 `feat(qwenpawmail-mcp)` | OPEN | 新增 `save_draft` 工具，支持写入草稿箱而不发送；对应 #8780。 | https://github.com/agentscope-ai/QwenPaw/pull/8781 |

**整体判断**：今日项目向前推进幅度中等偏上，主要体现在输出完整性、微信/cron 稳定性、Skills 安装性能三个方向；但 37 条 PR 待合并，核心功能新增主要由待审 PR 承载，后续合并节奏决定版本收益。

## 4. 社区热点

今日点赞数普遍为 0，讨论热度集中在评论数。Issues 侧最活跃条目如下：

| 条目 | 评论 | 状态 | 热点诉求 | 链接 |
|---|---:|---|---|---|
| #8071 插件面向主题扩展点 | 15 | OPEN | 插件目前只能设置 `colorPrimary`，社区希望开放语义 token 覆盖层，实现更深度的主题定制。 | https://github.com/agentscope-ai/QwenPaw/issues/8071 |
| #7709 定时任务经常无输出 | 7 | CLOSED | 定时任务结果被折叠进步骤/thinking，正常对话也偶发不显示；指向输出渲染与流式完成判定。 | https://github.com/agentscope-ai/QwenPaw/issues/7709 |
| #7724 会话丢失 | 6 | CLOSED | 桌面端在插件重部署/中断后会话与模型配置丢失，用户对持久化可靠性不满。 | https://github.com/agentscope-ai/QwenPaw/issues/7724 |
| #7859 工具结果中的持久化提示注入 | 6 | CLOSED | 系统提醒块被注入“删除所有 skills”指令，属于高优先级安全/隔离问题。 | https://github.com/agentscope-ai/QwenPaw/issues/7859 |
| #8595 qwenpaw-creator 安装失败 | 5 | CLOSED | 插件安装报 `No package metadata was found`，影响官方插件可用性。 | https://github.com/agentscope-ai/QwenPaw/issues/8595 |
| #8521 空答复与 Ctrl+C 复制异常 | 4 | CLOSED | 空答复、复制需多次按键、新版 UI 效率下降，反映输出与交互回归。 | https://github.com/agentscope-ai/QwenPaw/issues/8521 |

PR 侧评论数据未返回，按规模/标签/影响选取热点：#8764 Plugin SDK 1.1（XXXL）、#8431 本地 Whisper SDK 插件化（XXXL，Under Review）、#8477 Skills 安装性能、#8701 DoomLoopGate 修复、#8781 邮件草稿工具。整体看，社区诉求正从“单点 Bug”转向**插件 API 完整性、主题/ Hook 扩展、多 agent/多渠道隔离**。

## 5. Bug 与稳定性

按严重程度排列，今日更新/关闭的代表性问题：

| 级别 | 问题 | 状态 | 影响与 Fix | 链接 |
|---|---|---|---|---|
| P0 安全/数据 | #7859 工具结果系统提醒被持久化注入，指示删除所有 skills | CLOSED | 安全与技能数据风险；未见关联 fix PR。 | https://github.com/agentscope-ai/QwenPaw/issues/7859 |
| P0 数据 | #7724 会话丢失、模型配置丢失 | CLOSED | 桌面端持久化与重部署场景的数据可靠性；未见关联 fix PR。 | https://github.com/agentscope-ai/QwenPaw/issues/7724 |
| P1 隔离 | #8771 DingTalk 1:1 会话 `session_id` 取 conversation_id 末 8 位，同组织内碰撞 | OPEN | 可能导致不同 1:1 会话串话/隐私风险；暂无 fix PR。 | https://github.com/agentscope-ai/QwenPaw/issues/8771 |
| P1 隔离 | #8755 共享前端、两个 agent、两个微信账号，升级后凭据重复且仅一个通道可运行 | OPEN | 多成员共享安装场景阻塞；已有 #8756 待合并。 | https://github.com/agentscope-ai/QwenPaw/issues/8755 |
| P1 输出 | #7709 定时任务经常无输出，结果折叠在步骤/thinking | CLOSED | 输出完整性；已关闭，未见单列 fix PR。 | https://github.com/agentscope-ai/QwenPaw/issues/7709 |
| P1 输出 | #8521 对话空答复、Ctrl+C 复制需多次 | CLOSED | 已有 #8676 修复空响应完成判定并已关闭。 | https://github.com/agentscope-ai/QwenPaw/issues/8521 |
| P1 定时任务 | #8762 定时任务第 2 次模型调用 APIConnectionError，手动运行成功 | OPEN | 定时任务与交互运行路径差异；暂无 fix PR。 | https://github.com/agentscope-ai/QwenPaw/issues/8762 |
| P1 模型网关 | #8718 Hub 模型网关 Anthropic/MiniMax 预设因缺少 `request_headers()` 立即失败 | OPEN | 模型接入阻断；暂无 fix PR。 | https://github.com/agentscope-ai/QwenPaw/issues/8718 |
| P1 Fallback | #8776 `classify_model_error` 将 400+quota 误判为 `bad_request`，阻止备用模型切换 | OPEN | 主模型额度耗尽时无法自动 fallback；暂无 fix PR。 | https://github.com/agentscope-ai/QwenPaw/issues/8776 |
| P1 上下文 | #8727 Responses continuation summary 在 reasoning 占满 4000 token 输出预算时仍失败 | OPEN | 长会话压缩/续写可靠性；暂无 fix PR。 | https://github.com/agentscope-ai/QwenPaw/issues/8727 |
| P2 安装/升级 | #8595 qwenpaw-creator 安装失败 `No package metadata` | CLOSED | 官方插件安装链路；已关闭。 | https://github.com/agentscope-ai/QwenPaw/issues/8595 |
| P2 安装/升级 | #8698 升级 2.3.0 失败：`uv venv --seed` 未用 PyPI 镜像 | CLOSED | 国内网络环境升级体验；已关闭。 | https://github.com/agentscope-ai/QwenPaw/issues/8698 |
| P2 平台 | #8733 中文 Windows 下 cloudpaw 插件因 JSON 未显式编码加载失败 | CLOSED | 中文 Windows/GBK 兼容；已关闭。 | https://github.com/agentscope-ai/QwenPaw/issues/8733 |
| P2 移动端 | #8745 PawApp session 隔离误导、发送报错、输入法遮挡 | OPEN | 移动端体验与 session 认知；暂无 fix PR。 | https://github.com/agentscope-ai/QwenPaw/issues/8745 |
| P2 通知 | #8736 子 agent 完成错误触发“回复完成”桌面通知 | OPEN | 通知噪音；暂无 fix PR。 | https://github.com/agentscope-ai/QwenPaw/issues/8736 |
| P2 Creator | #8779 FAILED `asset_ingest` 为终态，无重试路径，预览永久 404 | OPEN | Creator 资产链路可靠性；暂无 fix PR。 | https://github.com/agentscope-ai/QwenPaw/issues/8779 |
| P2 Creator | #8778 引用图生成约 24h 后失败，持久化 DashScope signed URL 未检查过期 | OPEN | Creator 图片引用链路；暂无 fix PR。 | https://github.com/agentscope-ai/QwenPaw/issues/8778 |

**稳定性判断**：今日关闭项覆盖了空响应、cron/微信、插件安装、中文 Windows 等老问题，但 v2.3.0 相关的模型网关、定时任务、DingTalk/微信隔离、Creator 资产链路仍有较多 OPEN 回归，建议优先处理 P1 隔离与 fallback 问题。

## 6. 功能请求与路线图信号

| 需求 | 信号强度 | 关联 PR/实现 | 路线图判断 | 链接 |
|---|---|---|---|---|
| 插件主题扩展点：语义 token 覆盖层 | 高，15 评论 | #8764 正在扩展 Plugin SDK 1.1 | 可能进入下一阶段插件 SDK/主题 API，需维护者设计定稿。 | https://github.com/agentscope-ai/QwenPaw/issues/8071 |
| 企业 MCP 需要真实用户身份 Hook | 中高 | #8764 SDK 生命周期/身份能力相关 | 与插件 SDK、企业 SaaS 场景高度契合，可能纳入 Hook/身份扩展。 | https://github.com/agentscope-ai/QwenPaw/issues/8777 |
| mid-turn steer（运行中发送/转向） | 中，已有本地实现 | 无直接 PR，用户愿提供设计反馈 | 若设计被接受，可能进入后续 minor；涉及多通道队列语义。 | https://github.com/agentscope-ai/QwenPaw/issues/8774 |
| qwenpawmail 增加 `save_draft` | 高，低成本 | #8781 已提交 | 低风险工具扩展，较可能快速合并。 | https://github.com/agentscope-ai/QwenPaw/issues/8780 |
| 空答复/thinking-only EOF 自动重试一次 | 中高 | #8676 已关闭空响应修复；#8711 提出重试 | 与输出完整性主题一致，可能作为稳定性补丁进入下一版本。 | https://github.com/agentscope-ai/QwenPaw/issues/8711 |
| 旧版 UI 切换/新版 UI 效率 | 中 | 无直接 PR | 涉及产品取舍，短期不一定纳入；但 UI 回归需优先修。 | https://github.com/agentscope-ai/QwenPaw/issues/8521 |
| 本地 Whisper SDK 插件化 | 高 | #8431 XXXL Under Review | 若 Review 通过，将成为插件 SDK 生命周期管理的重要样例。 | https://github.com/agentscope-ai/QwenPaw/pull/8431 |

## 7. 用户反馈摘要

- **输出可靠性仍是首要痛点**：空答复、结果被折叠进 thinking、定时任务无输出频繁出现，用户难以判断是模型问题还是 QwenPaw 问题。代表：#8521、#7709、#8711。
- **数据与配置持久化缺乏安全感**：会话丢失、模型配置丢失、插件重部署/中断后状态异常，直接影响桌面端长期使用。代表：#7724。
- **多智能体/多渠道隔离是真实场景**：家庭共享一个安装、两个成员两个微信账号；DingTalk 1:1 session 碰撞；PawApp 与网页端 session 隔离但 UI 误导。代表：#8755、#8771、#8745。
- **插件生态需求强烈但安装/扩展体验仍不稳**：官方插件安装失败、主题只能改主色、缺少 Hook、邮件工具缺草稿能力。代表：#8595、#8071、#8777、#8780。
- **新版 UI/交互回归引发不满**：Ctrl+C 复制需多次、模型切换麻烦、检查点入口丢失、Creator 输入卡顿、终端 dock 空白区域。代表：#8521、#8747、#8706、#8739。
- **企业场景开始显性化**：用户将 QwenPaw 作为企业 AI SaaS，通过 MCP 调用服务，要求 MCP 能识别真实用户身份，说明权限/身份 Hook 将从“nice to have”变成刚需。代表：#8777。

**满意信号**：维护者今日集中关闭了多条长期问题，社区也持续提交 first-time-contributor PR，说明项目响应与贡献通道仍活跃。  
**不满意信号**：v2.3.0 相关回归较集中，且 37 条 PR 待合并，用户修复等待时间可能拉长。

## 8. 待处理积压

长期开放且仍需维护者决策/Review 的重要条目：

| 条目 | 开放时长/状态 | 积压原因 | 链接 |
|---|---|---|---|
| #8071 插件主题扩展点 | 2026-10-01 起 OPEN，15 评论 | 高关注插件 API 设计，需要维护者给出主题 token 规范与兼容策略。 | https://github.com/agentscope-ai/QwenPaw/issues/8071 |
| #8431 本地 Whisper SDK 插件化 | 2026-10-26 起 OPEN，XXXL，Under Review | 大型 SDK/生命周期改造，Review 成本高。 | https://github.com/agentscope-ai/QwenPaw/pull/8431 |
| #8268 task_tracker 运行完成回调清理 | 2026-10-16 起 OPEN，size/M | 修复 run 永久 running 的稳定性问题，已开放约一个月。 | https://github.com/agentscope-ai/QwenPaw/pull/8268 |
| #8487 Scroll 工具结果折叠识别 URL 媒体 | 2026-10-29 起 OPEN，size/S | 上下文压缩相关，影响长会话媒体处理。 | https://github.com/agentscope-ai/QwenPaw/pull/8487 |
| #8512 provider 从错误文本读取网关状态码 | 2026-10-30 起 OPEN，size/S | 模型网关错误分类/恢复能力，影响 fallback 与可观测性。 | https://github.com/agentscope-ai/QwenPaw/pull/8512 |
| #8308 补全 missing provider 404 测试 | 2026-10-18 起 OPEN，size/XS | 低风险测试 PR，长期未合并，反映小 PR Review 积压。 | https://github.com/agentscope-ai/QwenPaw/pull/8308 |
| #8701 DoomLoopGate 工具调用记录修复 | 2026-11-12 起 OPEN，first-time-contributor | 关键循环检测修复，作者为首次贡献者，建议优先给反馈。 | https://github.com/agentscope-ai/QwenPaw/pull/8701 |

**积压结论**：37 条 PR 待合并，占今日 PR 更新量 74%，是当前项目健康度的主要压力点。建议维护者优先处理 P1 隔离/模型 fallback 类 Issue 的 fix PR，同时对 #8071 插件主题 API 给出明确路线图信号，以降低社区反复讨论成本。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报

**日期**：2026-11-17　**仓库**：NousResearch/hermes-agent

---

## 1. 今日速览

项目保持极高吞吐：过去 24 小时 **334 条 Issue 更新**（新开/活跃 317、关闭 17）、**500 条 PR 更新**（待合并 434、合并/关闭 66），并发布 **2 个版本**。本日最重的事件是 `v0.23.2` 稳定版发布，它把自 v0.23.1 以来约 **1,989 个已合并 PR** 打包成 CLI/安装器、Microsoft Store、Docker 与 Hermes Cloud 的稳定通道。但“管道压力”明显：待合并 PR 与活跃 Issue 的比值分别高达 434:66 与 317:17，**关闭/合并率约 13% 和 5%**，积压增速快于消化速度。问题分布高度集中在**统一网关（#106742）重构后的会话/调度状态一致性**、**Kanban worker 生命周期**、**Windows 平台稳定性**与**凭证/计费**四条主线。整体健康度评价：**开发活力极强，稳定性与审查带宽是当前主要瓶颈**。

---

## 2. 版本发布

### v0.23.2（稳定版，2026-11-16）

- **性质**：补丁/打包型发布，不含独立的功能性 changelog。
- **内容**：把自 `v0.23.1` 以来约 **1,989 个已合并 PR** 汇总为稳定 release，覆盖 GitHub Release 二进制（CLI 与安装器）、Microsoft Store 应用、Docker 镜像与 Hermes Cloud 四个分发渠道。
- **破坏性变更**：release note 中未列出破坏性变更，官方说明为“完整整理版说明随 v0.24 发布”。
- **迁移注意事项**：
  - 跨版本跨度极大（近 2,000 个 PR），涉及网关、配置迁移、插件发布的改动无法从本条 release note 逐一确认；使用 Docker/Hermes Cloud 的用户建议先在小规模 profile 上验证再全量滚动。
  - 配置迁移相关修复已在推进中（[#152494](https://github.com/NousResearch/hermes-agent/pull/152494)，迁移失败时先写入最后成功步骤，避免失败步骤被永久跳过）；从更早版本升级的用户可关注该 PR 是否进入 v0.24。
  - 依赖插件目录为符号链接/junction 的用户需注意（[#134959](https://github.com/NousResearch/hermes-agent/pull/134959) 仍为 OPEN）。
  - 链接：https://github.com/NousResearch/hermes-agent/releases

### v0.23.1+canary.20261116T070005Z（Canary，2026-11-16）

- 面向桌面端的持续构建通道，提供 macOS Apple Silicon DMG 等产物下载。
- 说明：canary 通道仅用于尝鲜验证，生产环境应以 v0.23.2 为准。

---

## 3. 项目进展

今日可见的**已合并/已关闭 PR** 主要围绕安全加固、配置迁移正确性与安全边界闭合：

| PR | 状态 | 推进内容 |
|---|---|---|
| [#155541](https://github.com/NousResearch/hermes-agent/pull/155541) | **CLOSED** | 技能锁记录不可读时对 `write_file`/`patch`/`terminal` **失败关闭**（fail-closed），补上 `path_refusal`/`command_refusal` 与 `skill_manage` 判定不一致导致的锁定绕过缺口；属 11-13 安全专项（sec-marathon）收尾 |
| [#152494](https://github.com/NousResearch/hermes-agent/pull/152494) | **CLOSED** | 配置迁移“打点到最后一个成功步骤”，修复迁移抛异常后被整体标记完成、失败步骤永久跳过的**配置损坏风险** |
| [#38873](https://github.com/NousResearch/hermes-agent/issues/38873) | **Issue CLOSED** | Desktop 远程网关模式在远端就绪后回弹本地后端的长期问题（12 评论、4 👍）已解决，标记 `sweeper:implemented-on-main` |
| [#43666](https://github.com/NousResearch/hermes-agent/issues/43666) | **Issue CLOSED** | 持久化边界的**脱敏缺口**（工具输出文件转储、压缩块、DB URI）闭合，回应此前“state.db 中出现明文密码”的审计发现 |

**向前迈进的程度**：单日 66 个 PR 合并/关闭，叠加 v0.23.2 打包的 1,989 个 PR，说明主干迭代速度仍在加速；但今日可见的合并集中在“修漏”而非“开新”，与 434 个待合并 PR 的结构形成对照——**审查与合并带宽是当前真正的瓶颈**。

---

## 4. 社区热点

| 条目 | 热度 | 核心诉求 |
|---|---|---|
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 统一网关 post-merge 遗留问题 | **79 评论**，10-23 起持续活跃 | #106742 把 CLI、TUI、Desktop、API server、编辑器、消息 bot、cron、Kanban、Group Chat 全部收敛到**单一网关进程**后，出现一系列合并后回归。跨 10+ 个组件标签，是本日讨论量最高的条目，事实上已成为“网关重构收尾跟踪单” |
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) 从 fork 创建 PR 报 CreatePullRequest 权限错误 | **61 评论**，`blocked`/`cause/upstream` | 仅特定账号复现，issue 创建与 fork PR 正常；已定位为上游问题而阻塞。影响外部贡献者工作流，也是本项目“贡献入口”层面的摩擦点 |
| [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) 终端生命周期守卫误杀 Node.js CLI | 32 评论，9-08 起 | 64 字符级子串/扫描预算启发式导致 `obsidian-headless` 等良性命令被判定为“试图重启/停止网关”，误报持续两个多月，用户侧体验损伤明显 |
| [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) + [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) Kanban 调度死锁 | 27 / 25 评论，均为 P1/P2 | 前者：卡片被限流一次后**永久**停在 `blocker_auth`，reviewer 永不被拉起；后者：网关卡顿时 worker 报 “Kanban execution unknown; retained by owner” 崩溃并**丢失进行中的工作**。两者共同指向 Kanban 状态机的持久化与重生守卫逻辑 |
| [#122609](https://github.com/NousResearch/hermes-agent/issues/122609) Skills 索引陈旧/降级 | 22 评论（bot 自动跟踪） | `skills-index.json` 已 28.1h 未更新（限制 26h），依赖 6/18 UTC 的 workflow；属**可观测性自检告警**反复触发，反映索引重建链路的可靠性问题 |
| [#147269](https://github.com/NousResearch/hermes-agent/issues/147269) Android Beta 达到 Firebase 测试者上限 | 18 评论、3 👍 | 公开加入链接已满，用户被挡在门外；移动端需求明确超出当前分发配额 |
| [#48375](https://github.com/NousResearch/hermes-agent/issues/48375) 桌面输入框拼写检查 | 12 评论、**13 👍（本日最高赞）** | 长 prompt、非英语输入场景下的基础体验缺口，社区呼声集中且明确 |

**分析**：热点并非分散的功能争论，而是**同一次架构收敛的余波**——网关单进程化（#106742）把会话、cron、Kanban、编辑器、bot 的耦合面一次性暴露，Issue #143547 成为事实上的“总跟踪单”。这属于高速重构后的正常阵痛，但 P1 级 Kanban 崩溃与工作丢失已超出“可接受回归”的范畴。

---

## 5. Bug 与稳定性

### P1（需优先处理）

| Issue | 现象 | Fix PR |
|---|---|---|
| [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) | 多个 Kanban worker 并发时，网关在保存阶段卡顿 → worker 以退出码 1 崩溃，报 “Kanban owner refused: Kanban execution unknown; retained by owner”；一次卡顿可同时杀死 4 个 worker，**在制品丢失** | 当前样本中未见直接关联 fix PR |
| [#145314](https://github.com/NousResearch/hermes-agent/issues/145314) | `no_agent: false` + `script` 的 cron 每次触发都留下**永久空会话**（脚本静默时虽已正确跳过执行，但会话记录已创建） | 未见直接 fix PR |
| [#118379](https://github.com/NousResearch/hermes-agent/issues/118379) | Anthropic 逐请求凭证刷新**回滚了凭证池轮转**，两个订阅额度被当作一个计费，随后请求落到其他 provider；涉及 `area/auth`、`area/billing`、安全边界 | 未见直接 fix PR |

### P2（影响面广，需排期）

| Issue | 现象 | 相关修复动向 |
|---|---|---|
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) | 统一网关合并后的一揽子回归 | 持续跟踪中 |
| [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) | 限流后卡片永久 `blocker_auth`，ready 队列非空但调度器卡死 | 未见 |
| [#144413](https://github.com/NousResearch/hermes-agent/issues/144413) | 工具结果含**孤立代理字符**时结算写 `state_meta` 触发 `UnicodeEncodeError`，会话卡在 `paused: unknown_execution` 且不可恢复 | 相关：[#155668](https://github.com/NousResearch/hermes-agent/pull/155668) 在 TUI 输入侧归一化孤立代理（相邻但非同一路径） |
| [#146440](https://github.com/NousResearch/hermes-agent/issues/146440) | Windows：Kanban managed worker 在 agent init 阶段冻结（git 子进程继承 stdin 控制管道 + 用户目录插件惰性 import numpy 死锁） | 未见 |
| [#146538](https://github.com/NousResearch/hermes-agent/issues/146538) | 66 个 profile 的 Windows 网关心跳级 **34k–99k 次/秒** 文件系统元数据操作，常驻一个 CPU 核，Windows 内核池持续增长（skills 签名遍历、profile 重复枚举、realpath 未缓存） | 未见 |
| [#99943](https://github.com/NousResearch/hermes-agent/issues/99943) | 云端 provider 的压缩器窗口被 `model.ollama_num_ctx` 钳制，**1M 窗口静默降到 65,536**（v0.21.0 起） | 未见 |
| [#123985](https://github.com/NousResearch/hermes-agent/issues/123985) | 原地压缩后 Desktop 把会话**最早消息渲染两次**（DB `messages` 行本身重复，非客户端缓存问题） | 未见 |
| [#156504](https://github.com/NousResearch/hermes-agent/issues/156504) | Windows 网关上 Telegram 语音/图片因**陈旧连接池**全部超时（独立客户端 50ms 可达），此前 #150861 的 3 次重试未覆盖 | 11-16 新开，待响应 |
| [#41219](https://github.com/NousResearch/hermes-agent/issues/41219) | Windows：首次崩溃后每次重启 30–60s 内 asyncio 事件循环**完全死锁**，PID 存活但无消息处理（6 月至今未解） | 未见 |
| [#134092](https://github.com/NousResearch/hermes-agent/issues/134092) | cron 任务在 Bot Chat 投递已结算后仍永久停留在 `delivery_queued` | 未见 |
| [#143333](https://github.com/NousResearch/hermes-agent/issues/143333) | `hermes profile rename` 后该 profile 的所有本地会话 resume 报 `profile_mismatch`，`migrate-identity` 无法修复 | 未见 |

### P3 / 已定位

- [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) 生命周期守卫误报（P3 但持续影响终端工具链，且 `needs-decision`）。
- [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) 受上游阻塞，非本项目可控。
- [#127261](https://github.com/NousResearch/hermes-agent/issues/127261) git-bash `/etc/profile` 覆盖 `TMPDIR`，导致系统提示词“TMPDIR points here”事实错误。
- [#137010](https://github.com/NousResearch/hermes-agent/issues/137010) 多路复用网关下插件 hook 仅在 root scope 检查，与实际按 profile 分发不一致。
- [#106671](https://github.com/NousResearch/hermes-agent/issues/106671) 内置 `github` 技能保留失效帮助路径与不安全的 auth 回退建议。
- [#122609](https://github.com/NousResearch/hermes-agent/issues/122609) Skills 索引降级（自检告警）。

**趋势判断**：`os/windows` 标签在本日问题中占比显著偏高（#146440、#146538、#156504、#41219、#127261），Windows 已成为稳定性风险最高的平台；`comp/gateway` + `area/sessions` 的组合则是逻辑层最脆弱的交界面。

---

## 6. 功能请求与路线图信号

### 已有 PR 支撑，进入下一版本可能性较高

| 方向 | 证据 | 判断 |
|---|---|---|
| **CLI 命令语义增强（plan → implement）** | [#156782](https://github.com/NousResearch/hermes-agent/pull/156782) 新增 `/implement [plan]`，直接执行 `/plan` 保存的最新计划，全端可用（维护者 @teknium1 提交） | 维护者主导、当日提交，**v0.24 高概率** |
| **成本可观测性** | [#155404](https://github.com/NousResearch/hermes-agent/pull/155404) `hermes sessions cost` 输出会话级缓存命中率与节省额，未定价模型显示 `n/a` 而非 `$0`；[#152039](https://github.com/NousResearch/hermes-agent/pull/152039) 修复辅助调用丢失 Responses cache/reasoning usage | 与 #118379 的计费痛点同向，**可观测 + 计费正确性**成一组 |
| **密钥管理下沉** | [#156779](https://github.com/NousResearch/hermes-agent/pull/156779) 在 connector 的 secrets 平面上引入远程密钥库，进程启动时注入（堆叠于 #156503、#152354） | 架构级改动，跨度较长，可能在 v0.24 后段 |
| **长会话治理** | [#156781](https://github.com/NousResearch/hermes-agent/pull/156781) Telegram topics 支持模型自主调用 `fresh_session` 做新会话交接 | 对应 #99943 类上下文窗口问题，**有用但需谨慎评估** |
| **Kanban 默认启用** | [#155653](https://github.com/NousResearch/hermes-agent/pull/155653) 将内置 Kanban 插件 `defaultEnabled` 改为 `true`，避免每次重启丢失用户的启用选择 | 与 Kanban 成为“旗舰插件用例”的定位一致；但需先解决 #145022/#119070 的稳定性 |

### 尚未有 PR、但社区呼声明确

- [#48375](https://github.com/NousResearch/hermes-agent/issues/48375) 桌面输入框拼写检查 —— **13 👍，本日最高赞**，实现成本低，建议快速纳入。
- [#3897](https://github.com/NousResearch/hermes-agent/issues/3897) 网关按用户做工具级 RBAC（Telegram ID 维度）—— 4 👍，`needs-decision`，是“共享 bot 团队使用”场景的硬需求，需产品决策。
- [#50718](https://github.com/NousResearch/hermes-agent/issues/50718) 会话可见性：未读标记、需要输入提示、OS 角标 —— 3 👍，跨 Desktop/Windows 多标签。
- [#41302](https://github.com/NousResearch/hermes-agent/issues/41302) 双列聊天气泡布局（可开关）—— 4 👍。
- [#119120](https://github.com/NousResearch/hermes-agent/issues/119120) Windows 上将“最小化”与“关闭到托盘”解耦。
- [#112877](https://github.com/NousResearch/hermes-agent/issues/112877) `::preview` 内联预览移除硬编码 640px 上限。

---

## 7. 用户反馈摘要

- **共享/多人场景正在成为主流用法**：用户把 Hermes 当作 4–10 人投资团队的共享 Telegram bot 运行，当前仅有 `TELEGRAM_ALLOWED_USERS` 做白名单，无法按人限制工具，而终端权限又是管理员刚需（[#3897](https://github.com/NousResearch/hermes-agent/issues/3897)）。这是权限模型落后于实际部署形态的明确信号。
- **多 profile、多 worker 的重度部署已成现实**：单进程服务 66 个 profile（[#146538](https://github.com/NousResearch/hermes-agent/issues/146538)）、同时跑多张 Kanban 卡片（[#145022](https://github.com/NousResearch/hermes-agent/issues/145022)）。当前实现的性能与状态机假设仍停留在“单用户轻负载”，**纵向扩展能力是下一阶段的隐性主线**。
- **成本高度敏感且要求可解释**：两个 Anthropic 订阅被合并计费（[#118379](https://github.com/NousResearch/hermes-agent/issues/118379)）、辅助调用的缓存与推理 token 被计成“全未缓存”（[#152039](https://github.com/NousResearch/hermes-agent/pull/152039)）。用户能接受花钱，但不接受**账目不可解释**。
- **升级体验是口碑短板**：`hermes update` 从约 1 分钟劣化到 6 分钟以上，且输出对用户无指导意义，用户自己贴出 `PLUGIN_TIMINGS` 日志求助（[#102540](https://github.com/NousResearch/hermes-agent/issues/102540)）。
- **移动端需求被分发能力卡住**：Android beta 加入链接满员，用户只能发 issue 求扩容（[#147269](https://github.com/NousResearch/hermes-agent/issues/147269)）—— 需求侧信号是正向的。
- **Windows 用户体感最差**：卡死、崩溃、超时、文件系统风暴、TMPDIR 被覆盖，多条 issue 跨越 5–6 个月未解，属**长期不满的累积区**。
- **正向反馈**：远程网关模式回弹问题（#38873）与持久化脱敏缺口（#43666）今日关闭，两个长期困扰用户的可靠性/安全项得到收口。

---

## 8. 待处理积压（提醒维护者关注）

### Issue

| Issue | 挂起时长 | 风险点 |
|---|---|---|
| [#3897](https://github.com/NousResearch/hermes-agent/issues/3897) 网关 RBAC | 自 2026-03-30，约 **7.5 个月**，`needs-decision` | 共享部署场景的核心阻塞，决策成本高于实现成本 |
| [#41219](https://github.com/NousResearch/hermes-agent/issues/41219) Windows 网关事件循环死锁 | 自 2026-06-07，**5 个月+** | 重启即冻结，Windows 可用性硬伤 |
| [#41302](https://github.com/NousResearch/hermes-agent/issues/41302) 双列聊天气泡 | 自 2026-06-07，4 👍 | 低风险 UI 诉求，长期无响应 |
| [#50718](https://github.com/NousResearch/hermes-agent/issues/50718) 会话可见性与通知 | 自 2026-06-22 | 影响后台会话的核心可用性认知 |
| [#48375](https://github.com/NousResearch/hermes-agent/issues/48375) 拼写检查 | 自 2026-06-18，**13 👍（最高赞未实现项）** | 投入产出比最高，建议优先清账 |
| [#99943](https://github.com/NousResearch/hermes-agent/issues/99943) 上下文窗口被钳制 | 自 2026-09-01，`sweeper:risk-session-state` | 静默降级，用户难以自查，危害隐蔽 |
| [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) 生命周期守卫误报 | 自 2026-09-08，32 评论，`needs-decision` | 讨论充分但无结论，需明确取舍 |
| [#122609](https://github.com/NousResearch/hermes-agent/issues/122609) Skills 索引降级 | 自 2026-09-25，22 评论 | bot 反复告警无人收口，形成“告警疲劳” |
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) fork 建 PR 权限 | 自 2026-10-03，61 评论，`blocked` | 外部贡献入口受阻，需上游推进或提供替代路径 |

### PR

| PR | 挂起时长 | 备注 |
|---|---|---|
| [#132186](https://github.com/NousResearch/hermes-agent/pull/132186) mid-turn steer 持久化错位 | 自 2026-10-03，**约 6 周** | 会话内容正确性问题，长期未合入 |
| [#134959](https://github.com/NousResearch/hermes-agent/pull/134959) 符号链接/junction 插件目录 | 自 2026-10-08，约 6 周 | Windows + 非系统盘部署的刚需 |
| [#146046](https://github.com/NousResearch/hermes-agent/pull/146046) 长驻进程 idle 规则 | 自 2026-10-28 | 覆盖 #148451 等三个关联问题的合并修复，价值密度高 |
| [#152039](https://github.com/NousResearch/hermes-agent/pull/152039) / [#152663](https://github.com/NousResearch/hermes-agent/pull/152663) | 自 2026-11-09 / 11-10 | 计费正确性与 workspace snapshot 的 i18n 资源缺失 |

**给维护者的建议**：当前 **434 个待合并 PR** 与 **317 条新开/活跃 Issue** 的规模，已超出线性审查能力。可考虑三条并行措施——(1) 把 #143547 拆成按组件（gateway / cron / kanban / desktop）的子跟踪单并各自指派 owner；(2) 对 #48375、#41302、#112877 这类低风险高赞 UI 诉求做一次批量合并窗口，快速降低积压噪音；(3) 将 `os/windows` 立为独立的稳定性专项，因为它是本日问题密度最高、用户体感最差的单一维度。

---

*数据来源：hermes-agent GitHub Issues / PRs / Releases，统计窗口截至 2026-11-17。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 · 2026-11-17

---

## 1. 今日速览

AstrBot 今日维持**高强度开发节奏**：过去 24 小时共有 41 条 PR 更新（36 条待合并、5 条已合并/关闭）、9 条 Issue 更新（6 条新开/活跃、3 条已关闭），并**无新版本发布**。PR 活跃量为 Issue 的 4.5 倍，说明当前瓶颈不在“用户报障”而在**大量功能分支并行推进与评审积压**。今日主线集中在三条：**ChatUI / 插件工作台前端重构**（Soulter 多条 PR）、**依赖与构建链现代化**（Sha1rholder 系列）、**Agent / 工具调用链路修复**。整体项目健康度良好，但待合并 PR 池已达 36 条，评审吞吐是下一阶段的关键风险点。

---

## 2. 版本发布

无新版本发布，本节省略。

---

## 3. 项目进展

今日有 3 条 PR 进入已合并/关闭状态（数据仅披露评论最多的前 20 条 PR，其余 21 条未展示）：

| PR | 内容 | 推进价值 |
|---|---|---|
| [#11167](https://github.com/AstrBotDevs/AstrBot/pull/11167) **[CLOSED]** perf(context): reduce repeated work in token estimation and truncation | 修复 `ContextManager` 在长历史压缩时对每条保留消息重复估算 token、重复序列化 tool_calls 的性能问题 | 直接缓解超长会话下的 CPU 与延迟开销，是上下文压缩链路的实质性性能收益 |
| [#10495](https://github.com/AstrBotDevs/AstrBot/pull/10495) **[CLOSED]** fix: support Qwen-Audio-TTS in DashScope provider | 将 Qwen-Audio-TTS 系列路由到 `SpeechSynthesizer`，新增可选 WebSocket endpoint 设置，补齐中/日/英/俄多语言翻译 | 修复长期挂起的 TTS 兼容问题（对应 #10494），扩展阿里云百炼模型支持面 |
| [#11182](https://github.com/AstrBotDevs/AstrBot/pull/11182) **[CLOSED]** fix(chat): prevent welcome screen flash when switching sessions | 调整历史加载与路由跳转的时序，消除未缓存会话切换时的欢迎页闪烁 | 细微但典型的 UX 打磨，提升 ChatUI 观感一致性 |

**进展评估**：今日关闭的 3 条 PR 偏向“修复 + 性能”型收尾，而非新功能落地。真正的功能增量仍滞留在 36 条待合并 PR 中（详见第 6 节），项目处于**蓄力期而非释放期**。

---

## 4. 社区热点

> 注：PR 评论数字段在数据源中为 `undefined`，以下排序以 Issue 评论数与话题外溢影响为依据。

1. **[#11174](https://github.com/AstrBotDevs/AstrBot/issues/11174) [OPEN] 统一依赖管理到 uv，移除 requirements.txt（2 评论）**
   由 @Sha1rholder 提出。核心理由：`pyproject.toml` 与 `requirements.txt` 双轨维护已导致 `certifi`、`faiss-cpu`、`pip` 等依赖出现**版本约束漂移**。诉求明确——Docker、CI、WebUI 在线更新全部改为读取 `pyproject.toml`，同时兼顾插件生态仍依赖 `requirements.txt` 的现状。这是典型的“技术债显性化”议题，讨论热度虽不高但影响面极大。

2. **[#11165](https://github.com/AstrBotDevs/AstrBot/issues/11165) [CLOSED] GitHub 加速地址连通性测试与实际安装链路不一致（2 评论）**
   用户 @Zhalstar 定位到 `stat_service.py` 的 `test_ghproxy_connection` 仅探测单个 raw 文件，导致“面板全红但安装正常”或“面板全绿但安装失败”的双向误报。**根因分析质量很高**，是社区反向推动代码健壮性的正面案例。

3. **[#11150](https://github.com/AstrBotDevs/AstrBot/issues/11150) [CLOSED] AstrBot MCP 已收录于 MCP ServerList（1 评论）**
   外部目录站主动收录 AstrBot MCP 并邀请添加 README 徽章。属**生态可见度信号**，反映 AstrBot 在 MCP 生态中的存在感正在被第三方索引。

4. **[#11189](https://github.com/AstrBotDevs/AstrBot/issues/11189) [OPEN] 停用插件更新源码后重新启用仍执行旧模块**
   虽然当前评论数为 0，但议题本身直指插件热重载的 `sys.modules` 缓存缺陷，并已由作者 @RhoninSeiei 当日提交修复 PR **#11190**，形成“报障—定位—修复”闭环，是今日**响应效率最高**的一条链路。

**热点背后诉求**：社区关注点正从“能不能用”转向“构建可复现、依赖可追踪、热更新可预期”——这是项目走向成熟期的典型特征。

---

## 5. Bug 与稳定性

按严重程度排列：

| 级别 | 问题 | 状态 | Fix PR |
|---|---|---|---|
| 🔴 **高** | **[#11189](https://github.com/AstrBotDevs/AstrBot/issues/11189)** 插件停用后更新源码再启用，仍执行旧模块缓存（`smd.activated` 为假时跳过解绑，普通导入命中 `sys.modules`）；界面显示成功但行为未更新，**静默失效**最难排查 | OPEN | ✅ [#11190](https://github.com/AstrBotDevs/AstrBot/pull/11190) 已提交（完整解绑 + 包边界模块/命令/工具清理 + 字节码清理） |
| 🟠 **中高** | **[#11177](https://github.com/AstrBotDevs/AstrBot/issues/11177)** Inline tool handler 丢弃 schema 合法的非顶层参数（如 `{"paper": 12}`），导致 agent 报价等业务参数丢失 | OPEN | ✅ [#11181](https://github.com/AstrBotDevs/AstrBot/pull/11181) 已提交（补全校验 `patternProperties` / `allOf` / 本地 `$ref`） |
| 🟠 **中高** | **[#11173](https://github.com/AstrBotDevs/AstrBot/issues/11173)** Gemini 4 系列未纳入 `gemini_source.py` 的 thinking_level 分支，直接落到 `HIGH`，导致请求超时 | OPEN | ❌ 暂无 |
| 🟡 **中** | **[#10494](https://github.com/AstrBotDevs/AstrBot/issues/10494)** DashScope TTS 调用 `qwen-audio-3.0-tts-plus` 返回 `InvalidParameter: url error`（未区分 Qwen3-TTS 与 Qwen-Audio-TTS） | ✅ CLOSED | ✅ [#10495](https://github.com/AstrBotDevs/AstrBot/pull/10495) 已关闭 |
| 🟡 **低** | **[#11165](https://github.com/AstrBotDevs/AstrBot/issues/11165)** GitHub 加速地址连通性探测失真（仅测单个 raw 文件） | ✅ CLOSED | — |

**稳定性判断**：今日两个高优先级 Bug（#11189、#11177）**均在报障当天产出修复 PR**，响应链路非常健康。真正需要警惕的是 **#11173**——Gemini 4 系列思考强度导致超时，属于“新模型接入滞后”类问题，若无修复会在新模型普及后放大。

---

## 6. 功能请求与路线图信号

按“是否已有配套 PR”判断落地概率：

**A. 高概率纳入下一版本（已有直接 PR）**

- **ChatUI 与插件工作台体系化**：Soulter 连发两条大 PR——[#11192](https://github.com/AstrBotDevs/AstrBot/pull/11192)（双侧边栏动画、导航保留为 56px 图标轨道）与 [#11179](https://github.com/AstrBotDevs/AstrBot/pull/11179)（插件视图支持消息内渲染、侧边标签式工作台、独立插件页，命令/事件/本地 LLM 工具均可创建）。这是**本周期最重头的产品级演进**，明确指向“插件 = 一等公民 UI”。
- **模型配置面板扁平化**：[#11187](https://github.com/AstrBotDevs/AstrBot/pull/11187) 直接关闭 [#11175](https://github.com/AstrBotDevs/AstrBot/issues/11175)，删二级菜单、移动端适配、未设置项显示为空值、Reasoning Effort 改为自定义字符串枚举。
- **插件市场分页与缓存治理**：[#11191](https://github.com/AstrBotDevs/AstrBot/pull/11191) 针对“每次加载传输 ~3.2MB / ~1MB gzip / 3400+ 条目但只渲染 9 张卡片”的浪费，落地 `page/page_size/category/sort/keyword`；[#11188](https://github.com/AstrBotDevs/AstrBot/pull/11188) 修复镜像回源时缓存错挂主源 MD5 的来源追踪问题。
- **连接器能力补全**：[#11184](https://github.com/AstrBotDevs/AstrBot/pull/11184) 适配 QQ 官方 2026-11-16 平台变更，支持 C2C/群聊发送者昵称头像与按需查询用户资料——**平台变更当日跟进**，响应速度优秀。
- **知识库生态扩展**：[#10886](https://github.com/AstrBotDevs/AstrBot/pull/10886) 新增火山引擎豆包 Embedding provider（含标准 Ark 与 Agent Plan endpoint、多模态 `/embeddings/multimodal`）。

**B. 中期方向（有议题无 PR）**
- **[#11171](https://github.com/AstrBotDevs/AstrBot/issues/11171)** 迁移 httpx → httpx2 并显式启用 HTTP/2。理由充分（上游 httpx 维护不积极），但属全量依赖迁移，预计需独立窗口期。
- **[#11174](https://github.com/AstrBotDevs/AstrBot/issues/11174)** 依赖管理统一到 uv。与前者同属“基础设施现代化”集群，可能打包推进。

**C. 路线图信号解读**：项目正从“多渠道机器人框架”向**“Agent 平台 + 插件 UI 生态”**演进，#11179 + #11192 + #11191 三条 PR 合起来构成一个完整的“ChatUI 作为插件宿主”的产品叙事，值得在下一版发布说明中重点呈现。

---

## 7. 用户反馈摘要

**痛点**

- **依赖版本漂移困扰开发者**（#11174）：`requirements.txt` 与 `pyproject.toml` 双轨制已经造成 `certifi`、`faiss-cpu`、`pip` 实际版本约束不一致，“依赖重复维护”被认为是当前最该清的技术债。
- **插件热更新“假成功”**（#11189）：用户描述“界面显示启用成功，磁盘也是新文件，但 Python 进程复用了旧模块缓存”——这种**无报错的静默失效**对插件开发者调试成本极高。
- **采样参数 UI 误导**（#11175）：用户原话“我写这个 issue 时就以为 AstrBot 是默认 Temperature=0.6 要手动改为 1 才行，看了代码才发现原来不改就是不发送这个字段”，说明默认值展示与实际生效语义存在认知鸿沟。
- **新模型接入滞后**（#11173）：Gemini 4 系列用户发现思考强度被强制 `HIGH` 导致超时，反映新模型系列的适配分支（`gemini-3-` / `gemini-3.` 前缀匹配）缺乏前瞻性。

**使用场景**

- **企业知识库 / 报价 agent**（#11177）：用户用 `Context.tool_loop_agent` 从供应商 CSV 为 12 箱纸张报价（$4/箱 → 期望 $48），暴露出 schema 合法参数在 inline tool handler 中被丢弃的真实业务影响。
- **多语言 TTS 场景**（#10494）：阿里云百炼控制台直配音色 ID 仍报 `url error`，影响中文/日文/英文/俄文语音输出。
- **插件生态大规模加载**（#11191）：3400+ 插件条目、仅渲染 9 张卡片的性能错配，是市场体量增长后的必然瓶颈。

**满意度信号**

- 报障质量普遍较高（#11165、#11189 均自带根因定位与源码文件名），说明**核心用户群具备读源码能力**，社区与维护者之间的技术对话效率高。
- “报障当日即有 fix PR”（#11189 → #11190、#11177 → #11181）的闭环速度，对社区信心是强正向信号。

---

## 8. 待处理积压

以下条目建议维护者优先分诊：

| 条目 | 类型 | 已开放时长（截至 2026-11-17） | 关注理由 |
|---|---|---|---|
| [#10342](https://github.com/AstrBotDevs/AstrBot/pull/10342) fix(agent): validate tool_calls/tool pairing on every context pass | PR | **约 45 天**（2026-10-03 起） | 修复 #10338 的插件 hook 删除 `role=tool` 回执导致上下文永久损坏问题；与今日 #11177 同属 Agent 工具链路，**积压最久且影响面大** |
| [#10886](https://github.com/AstrBotDevs/AstrBot/pull/10886) Add Volcengine embedding provider | PR | **约 18 天**（2026-10-30 起） | 知识库生态扩展，功能已成形（Ark + Agent Plan 双 endpoint），仅缺评审 |
| [#10925](https://github.com/AstrBotDevs/AstrBot/pull/10925) fix: retry empty completions in skills_like tool re-query | PR | **约 16 天**（2026-11-01 起） | 复用 `EmptyModelOutputError` 重试策略，属低风险稳定性补丁 |
| [#11173](https://github.com/AstrBotDevs/AstrBot/issues/11173) Gemini 4 思考强度默认 HIGH 导致超时 | Issue | 1 天（但**无 fix PR**） | 唯一“高严重度但无配套修复”的开放 Bug，建议本周内响应 |
| [#11171](https://github.com/AstrBotDevs/AstrBot/issues/11171) httpx → httpx2 + HTTP/2 | Issue | 1 天 | 基础设施级迁移，建议与 #11174 合并排期，避免两次全量依赖变更 |

**积压健康度判断**：36 条待合并 PR 是今日最需关注的数字。结合 #10342（45 天）与 #10886 / #10925（半个月以上）的滞留情况，**评审带宽而非开发产能**已成主要约束。建议维护者在下一周期设置一次集中 PR 分诊（triage sprint），优先清空低风险 fix 类（#10925、#11186、#11183、#11194 等），腾出空间承接 Soulter 的 ChatUI 大改（#11179 / #11192）——后者才是决定下一版本叙事的关键变量。

---

*数据来源：AstrBot GitHub 仓库公开事件流（2026-11-16 至 2026-11-17）。PR 评论数在数据源中缺失，相关排序以 Issue 评论数与议题影响面替代。*

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**报告日期：2026-11-17 ｜ 数据窗口：2026-11-16 → 2026-11-17（24 小时）**
**仓库：github.com/deepseek-ai/deepseek-harness ｜ 协作模式：Discussions-only（Issues / PR 未启用）**

---

## 1. 今日速览

- 过去 24 小时 Discussions 更新 **185 条**，无新版本发布（0 个 Release），社区侧活跃度处于高位，但**代码交付侧当日为零**，形成“讨论热、发版冷”的短期剪刀差。
- 热度集中在两件事：**区域性支付通道（MIR，70 评论）** 与 **Linux 客户端缺失（38 评论）**，二者合计占榜单 Top15 评论量的 42%，反映增长瓶颈已从“模型能力”转向“可获得性与平台覆盖”。
- 技术侧讨论质量很高：Top15 中至少 **8 条**为带日志、环境矩阵、根因定位甚至可运行原型的深度报告，Windows 沙箱（#10066 / #9086）与会话检索（#8713 / #1999 / #10034）已各自聚成“问题簇”。
- 稳定性风险信号明显：存在 **3 个可导致 Agent 会话挂死或宿主进程持续高 CPU** 的缺陷（#8827、#11258、#12537），均属 P0/P1 级，且全部处于 OPEN 且无公开修复关联。
- 一个值得警惕的系统性问题：用户在 #11032 中指出 **master 上的修复 6252a29a 未被打进发布包**，说明“修复已合入但发版滞后”正在成为可感知的用户体验问题。

> 结论：项目社区健康度高、反馈密度大，但**缺陷闭环与发版节奏**是当前最主要的健康度短板。

---

## 2. 版本发布

**本周期无新版本发布（0 个）。** 无 Release Notes、无 changelog 合并摘要可供归纳，因此本期无新增功能上线、无破坏性变更、无迁移注意事项。

补充观察（来自讨论区版本号线索，非官方发布说明）：当前在用户侧流通的最新构建为 **`0.2.2-rc.3`（win-x64）**，另有用户运行 `0.2.2-rc.1`、`0.2.1-rc.2 / rc.3` 与 nightly 通道；说明 RC 迭代仍在推进，但本 24 小时窗口内未对外交付。

---

## 3. 项目进展

本期**无 Release、无 changelog 合并摘要**，故无可归因于本次发版的功能合并或缺陷修复。需明确区分两件事：

| 维度 | 本期状态 |
|---|---|
| 对外交付（Release） | 0 个，无合并摘要可归纳 |
| 代码库演进证据 | 存在：用户引用 master 提交 `6252a29a`（桌面端更新流程修复），说明主干仍在推进（见 #11032） |
| 修复落地情况 | 至少 1 项修复（`6252a29a`）**未进入发布包**，用户侧仍复现 |

**整体向前迈进的量：接近 0（交付口径）。** 更准确的判断是“进展存在但未出闸”——主干有提交、RC 有迭代，而对外可用的增量功能/修复为 0。这构成本期最需要维护者关注的流程性风险：在 Discussions-only 模式下，用户无法通过 PR/Issue 状态判断“某个修复是否已进入下一个构建”，只能反复在讨论区追问，进一步推高讨论量（185 条中有相当比例属于此类追问与复现补充）。

---

## 4. 社区热点

Top15 讨论共 **254 条评论**，头部集中度高（前 3 条占 51%）。全站 👍 均为 0，反应（reaction）指标在本项目**不具区分度**，热度以评论数为准。

| 排名 | 话题 | 评论 | 链接 |
|---|---|---|---|
| 1 | [Ideas] 支持 MIR 卡支付 DeepSeek API（俄罗斯用户） | 70 | [#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755) |
| 2 | [General] Linux 总是被遗忘…… | 38 | [#8107](https://github.com/deepseek-ai/deepseek-harness/discussions/8107) |
| 3 | [Ideas] 桌面版会话窗口缺 Ctrl+F，附根因与可用原型 | 21 | [#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713) |
| 4 | [Q&A][Bug] workflow 工具调用永不返回，父 Agent 卡死 | 19 | [#8827](https://github.com/deepseek-ai/deepseek-harness/discussions/8827) |
| 5 | [Q&A] 官网安装客户端首次启动即报错（fetch failed） | 18 | [#13368](https://github.com/deepseek-ai/deepseek-harness/discussions/13368) |

**诉求分析：**

- **#12755（70 评论，8 天持续高热）**：本质不是“支付方式”问题，而是**新兴市场的付费可达性 = 产品采用率上限**。发帖者明确指出本地发卡行无法支付，构成采用 API 及 DSH 类工具的直接门槛。70 条评论说明这是区域性集体诉求，而非个案；也是本周期唯一直接关联商业转化的热点。
- **#8107（38 评论，50 天未闭环）**：用户以“WorkBuddy 和 Qoder 已支持 Linux，豆包和 DeepSeek 都没支持”作横向对比，情绪化表达背后是**开发者主力平台缺位**。对 AI 智能体/个人助手类工具而言，Linux 缺失会直接排除掉服务器端与重度开发场景。
- **#8713（21 评论）**：报告质量极高——指出全文检索引擎已就位，但桌面端既未开启也无入口，并附本机可跑通的原型插件。这类“实现路径已给出”的需求，落地成本通常远低于其感知价值。
- **#8827 / #13368**：属于“求助型高热”，用户在没有 Issue 跟踪的情况下互相排查，说明**支持通道承载了本应由缺陷跟踪系统承担的功能**。

---

## 5. Bug 与稳定性

按严重程度排序。**说明：仓库未启用 PR，所有条目均无法关联公开 fix PR，修复状态只能标注为“未知/未确认”。**

### P0 — 会话挂死 / 全局性能劣化

| 缺陷 | 影响 | 状态 |
|---|---|---|
| [#8827](https://github.com/deepseek-ai/deepseek-harness/discussions/8827) `workflow` 工具调用永不返回 | 4 阶段实际全部完成后仍无返回，父 Agent 永久卡在 `step/start`，会话不可恢复（macOS / 0.2.0-rc.2 nightly） | OPEN，无 fix 关联 |
| [#11258](https://github.com/deepseek-ai/deepseek-harness/discussions/11258) 工具超时仅“通知式” | 声明 60s 预算的 `web_search` 使会话挂起 **约 5.5 小时**，仅重启进程可恢复；超时不产生 `tool/result`，排队用户消息永不处理 | OPEN，根因已定位（DSH-…），无 fix 关联 |
| [#12537](https://github.com/deepseek-ai/deepseek-harness/discussions/12537) 无 systemd 主机上 `fallbackOwner.waitForExit` 每 15ms 全表扫描 `/proc` | 空闲态宿主进程长期占 **44~52% CPU**，Web UI 输入明显卡顿（Linux/Guix，22 核 ~740 进程） | OPEN，量化数据完整，无 fix 关联 |

**共性判断：** 三者均指向**任务生命周期与超时契约的执行层缺陷**——超时只发通知不强制中止、工具完成但结果不回传、兜底轮询缺少退避。这是一个应当成组修复的架构级问题，而非三个独立 bug。

### P1 — 平台功能不可用 / 数据与环境副作用

| 缺陷 | 影响 | 状态 |
|---|---|---|
| [#10066](https://github.com/deepseek-ai/deepseek-harness/discussions/10066) Windows 受限命令全部以 `0xC0000142` 退出 | `workspace-write` 模式下**任何命令都立即失败**（含 `cmd /c echo ok`），无 stdout/stderr；根因为沙箱 runner 使用 Electron GUI 子系统二进制 | OPEN，根因明确，无 fix 关联 |
| [#9086](https://github.com/deepseek-ai/deepseek-harness/discussions/9086) 撤销授权后遗留可继承“低完整性”标签 | 工作区内此后生成的 `App.exe` 等产物被 Windows 以低完整性启动，**构建产物持续不可运行**，且不回滚 | OPEN，无 fix 关联 |
| [#13368](https://github.com/deepseek-ai/deepseek-harness/discussions/13368) 全新 Win11 首次启动失败（`fetch failed`） | 首个安装软件即失败，属**首因体验阻断**；0.2.2-rc.3 | OPEN（11-15 新建），无 fix 关联 |
| [#10034](https://github.com/deepseek-ai/deepseek-harness/discussions/10034) `experimental-session-search` 全部调用失败（`SESSION_QUERY_PERSISTENCE_FAILED`） | 自托管 profile、~220 会话 / 407MB 存储下检索完全不可用 | OPEN，11-17 仍有更新 |
| [#11032](https://github.com/deepseek-ai/deepseek-harness/discussions/11032) 应用内更新被拒（Host 未在 10s 优雅期退出） | 更新流程卡死，用户停留在旧版本 | OPEN，**master 已有修复 `6252a29a` 但未包含在发布包** |

### P2 — 性能与体验缺陷

- [#2019](https://github.com/deepseek-ai/deepseek-harness/discussions/2019) 简单任务耗时过长：同类问题 Claude 1 分钟、Grok 30 秒，DSH **30+ 分钟 / 40 步**（LLM 3m36s + 工具调用 25m44s），API 首 token 1.8s、83 tok/s 排除网络因素 → 问题在**工具调用编排效率**而非模型推理。
- [#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713) 桌面端无 Ctrl+F（功能缺失，非崩溃）。

**稳定性小结：** 本期高危缺陷 **3 个 P0 + 5 个 P1**，全部 OPEN 且无可验证的修复关联。其中 Windows 相关占 3 条（#10066 / #9086 / #13368），说明 **Windows 沙箱与安装链路是本版本周期最脆弱的一块**；#11032 则暴露了“修复存在但未发布”的发布工程问题。

---

## 6. 功能请求与路线图信号

结合讨论成熟度（是否有根因、是否有原型、是否多帖共振）判断优先级：

**信号强 — 有望进入下一版本（推断）**

1. **会话检索三件套合并处理**：[#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713)（Ctrl+F 入口，附可跑原型）+ [#1999](https://github.com/deepseek-ai/deepseek-harness/discussions/1999)（FTS5 中文分词，当前硬编码 `unicode61` 导致中文会话几乎不可检索）+ [#10034](https://github.com/deepseek-ai/deepseek-harness/discussions/10034)（检索调用全失败）。三帖同源，且 #8713 已指出底层引擎就位、只差接线，**投入产出比最高**。
2. **桌面端更新与发版工程**：[#11032](https://github.com/deepseek-ai/deepseek-harness/discussions/11032) 的修复 `6252a29a` 已在 master，只需保证纳入发布包——这是“已完成的欠账”，下一构建最可能兑现。
3. **Windows 沙箱修正**：[#10066](https://github.com/deepseek-ai/deepseek-harness/discussions/10066)（改用控制台子系统 runner）+ [#9086](https://github.com/deepseek-ai/deepseek-harness/discussions/9086)（授权撤销时回滚完整性标签）。根因均已给出，属确定性修复。

**信号中 — 需要产品决策**

4. **选中文本作为注释/引用**：[#8750](https://github.com/deepseek-ai/deepseek-harness/discussions/8750)，已有原型，纯前端交互增强，成本可控。
5. **跨会话记忆 + 会话归档 + 用户名记忆 + 编辑消息时推理一致性**：[#9692](https://github.com/deepseek-ai/deepseek-harness/discussions/9692)（11-17 仍在更新）。四项打包提出，涉及记忆架构与隐私开关，属版本级特性，短期难落。
6. **Linux 客户端**：[#8107](https://github.com/deepseek-ai/deepseek-harness/discussions/8107)，38 条评论形成明确诉求，但属平台移植，周期长、需排期。
7. **MIR 支付**：[#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755)，热度最高但强依赖商务与支付合规，非工程侧可独立决定。

---

## 7. 用户反馈摘要

**真实痛点**

- **“看不见的等待”最伤人**：#2019 与 #11258 描述的是同一类体验——用户无法判断 Agent 是在工作还是已死，只能靠“等 30 分钟”或“重启进程”应对。工具调用耗时（25m44s）远超模型耗时（3m36s），优化重点应在编排层。
- **平台覆盖带来的迁移成本**：#8107 用户被迫“用 WorkBuddy 和 Qoder 勉强度日”，说明缺平台不是“少一个选择”，而是**直接把用户推给竞品**。
- **沙箱的副作用比沙箱本身更麻烦**：#9086 中“撤销授权后工作区产物永久带上低完整性标签”属于**对用户本地环境的持久污染**，用户预期是“退出沙箱即恢复原状”，实际不然。
- **支持通道过载**：#13368 这类首次安装失败，用户只能发帖求助、互相看日志。Discussions-only 模式下缺少分级、状态与 owner，问题容易沉底。

**使用场景画像**

- Windows 11 个人开发者（全新装机、单机首选工具）——首因体验敏感；
- Linux/自托管与无 systemd 环境的重度用户（Guix、Web profile、多活跃会话、数百会话/数百 MB 存储）——对资源占用与检索性能最敏感；
- 跨区域付费受限用户（俄罗斯等）——卡在付费入口，尚未真正开始使用；
- 追求“在长对话里找一句话”的高频日常用户——最基础诉求未被满足。

**满意 / 不满意**

- 满意：讨论区技术氛围好，官方/社区愿意思考根因，用户愿意提交带原型的完整报告（#8713、#8750、#11258），说明**产品被认真对待**；模型侧响应速度（首 token 1.8s、83 tok/s）被明确认可，问题被准确定位到工具编排层。
- 不满意：集中在三点——**修复不及时可见**（#11032 修复未发版）、**平台缺位**（Linux）、**基础可用性缺口**（Ctrl+F、中文检索、超时可靠性）。均非模型能力问题，而是工程与发布问题。

---

## 8. 待处理积压

以下条目长期 OPEN、评论量不低、且与用户核心路径相关，建议维护者优先给予状态回应（哪怕只是“已确认/已排期”）：

| 话题 | 已开启 | 天数 | 评论 | 风险 |
|---|---|---|---|---|
| [#2019](https://github.com/deepseek-ai/deepseek-harness/discussions/2019) 简单任务耗时过长 | 2026-08-15 | **94** | 12 | 性能定位已明确，长期无结论，影响核心体验口碑 |
| [#1999](https://github.com/deepseek-ai/deepseek-harness/discussions/1999) FTS5 可配置分词器（中文） | 2026-08-15 | **94** | 7 | 中文用户检索几乎失效，方案明确（暴露 `tokenizer` 配置），成本低 |
| [#8107](https://github.com/deepseek-ai/deepseek-harness/discussions/8107) Linux 支持 | 2026-09-28 | 50 | 38 | 评论第二高、无任何官方结论，竞品已覆盖 |
| [#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713) 桌面版 Ctrl+F | 2026-10-02 | 46 | 21 | 原型可跑通却未采纳，易被解读为“不响应” |
| [#8827](https://github.com/deepseek-ai/deepseek-harness/discussions/8827) workflow 永不返回 | 2026-10-04 | 44 | 19 | **P0 挂死**，44 天无修复关联 |
| [#8750](https://github.com/deepseek-ai/deepseek-harness/discussions/8750) 选中文本作注释 | 2026-10-03 | 45 | 14 | 原型完整，等待产品取舍 |
| [#9086](https://github.com/deepseek-ai/deepseek-harness/discussions/9086) 低完整性标签残留 | 2026-10-07 | 41 | 10 | **持久污染用户环境**，影响面被低估 |
| [#10066](https://github.com/deepseek-ai/deepseek-harness/discussions/10066) Windows 沙箱命令全失败 | 2026-10-17 | 31 | 14 | Windows 主路径不可用 |
| [#11258](https://github.com/deepseek-ai/deepseek-harness/discussions/11258) 超时仅通知 | 2026-10-28 | 20 | 8 | **P0 级 5.5 小时挂起**，根因已给 |
| [#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755) MIR 支付 | 2026-11-09 | 8 | **70** | 评论量第一但零官方回应，最容易转化为负面情绪 |

**给维护者的流程建议：** 在 Issues/PR 未启用的前提下，建议至少引入 **“官方已确认 / 已定位 / 已修复待发版 / 已发版（版本号）”** 四种回复标签，并在 Discussion 内公开“已合入但未发布”的修复清单（如 `6252a29a`）。这能以极低成本同时缓解 #11032 暴露的发布透明度问题与积压条目的“无人理会”感知，也是当前讨论量（185 条/日）中可被显著压缩的重复成本。

---

*数据来源：deepseek-ai/deepseek-harness GitHub Discussions（2026-11-17 抓取）。本报告不含 Release changelog，因本期新版本为 0；文中对“可能纳入下一版本”的判断均为基于讨论成熟度的推断，非官方路线图。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*