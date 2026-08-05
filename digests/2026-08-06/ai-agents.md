# OpenClaw 生态日报 2026-08-06

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-05 22:48 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-06

> 数据来源：github.com/openclaw/openclaw | 统计窗口：2026-08-05 ~ 2026-08-06（过去 24 小时）

---

## 1. 今日速览

过去 24 小时 OpenClaw 仓库保持极高度活跃：500 条 Issue 更新（新开/活跃 471 条，关闭 29 条，**净增 442 条未关闭问题**）、500 条 PR 更新（待合并 423 条，合并/关闭 77 条，合并关闭率 15.4%）。**今日零版本发布**，项目正处于两线作战状态：一方面维护者 @vincentkoc 的「执行归因」5 步式重构（PR #116792–#116796）在密集推进；另一方面 2 个 P0 级问题（DB 迁移失败 #119263、持久化冷却锁定 #70903）和大量 P1 消息丢失/会话损坏 Bug 仍在积压。Issue 关闭率仅 5.8%，且多个高热度 Bug（#44925、#86519、#51429）已悬挂 3–5 个月，维持者评审与产品决策是当前主要瓶颈。

---

## 2. 版本发布

**今日无新版本发布**（最新 Releases 为空）。

---

## 3. 项目进展

今日 500 条 PR 更新中有 77 条合并/关闭（合并关闭率 15.4%），具体合并清单未在概览中逐一公布。以下为当前活跃推进、影响面最大的 PR：

### 3.1 🔧 核心重构：执行归因（Execution Attribution）5-步堆栈

维护者 @vincentkoc 主导，目标是将代理运行的身份追踪从"扁平复制字段"升级为"不可变执行归因"，根治跨网关/ACP/嵌入式/CLI 运行时的会话串线、审计错乱问题。全部标记为 `ready for maintainer look` 或 `waiting on author`，且带有兼容性/会话状态/安全边界等 `merge-risk` 标记，属于高风险高价值重构：

| PR | 步骤 | 说明 | 风险 |
|---|---|---|---|
| [#116792](https://github.com/openclaw/openclaw/pull/116792) | Stack 1/5 | 跨 Node 运行保留网关会话归因 | 🚨 兼容性/会话状态/安全边界 |
| [#116793](https://github.com/openclaw/openclaw/pull/116793) | Stack 2/5 | 集中不可变执行归因 | 待评估 |
| [#116794](https://github.com/openclaw/openclaw/pull/116794) | Stack 3/5 | 跨执行运行时传播归因 | 🚨 安全边界 |
| [#116795](https://github.com/openclaw/openclaw/pull/116795) | Stack 4/5 | 工具策略绑定到执行归因 | 🚨 兼容性/会话状态/安全边界 |
| [#116796](https://github.com/openclaw/openclaw/pull/116796) | Stack 5/5 | 审计投影保持归因生成感知 | 🚨 兼容性 |

### 3.2 🤖 自动化修复（clawsweeper[bot]）

今日出现 3 个机器人自动生成的修复 PR，表明项目已建立自动化的 Issue 分诊→补丁生成→人工复核流水线：

- [#119731](https://github.com/openclaw/openclaw/pull/119731) — 限制任务完成结果提示词长度（6,000 UTF-16 单位上限），修复 #57148
- [#119737](https://github.com/openclaw/openclaw/pull/119737) — Slack 终端回执必须确认线程放置（`threadTs`），修复长期悬挂的 #96692
- [#119717](https://github.com/openclaw/openclaw/pull/119717) — Telegram 配置的菜单命令优先展示，修复 #89252

### 3.3 📱 渠道与体验修复

- [#119766](https://github.com/openclaw/openclaw/pull/119766) — Telegram DM 主题名同步到会话标签（M 规模，已提交 4 天）
- [#119729](https://github.com/openclaw/openclaw/pull/119729) — 修复 Control UI 返回时聊天历史丢失/运行计时不准确
- [#119748](https://github.com/openclaw/openclaw/pull/119748) — 修复 `/compact` 显示误导性增长标签（如 `Compacted (20 → 30)`）
- [#119325](https://github.com/openclaw/openclaw/pull/119325) — 新增 `/model -s` 会话级别模型选择，填补 #115717 留下的空白

### 3.4 ⚡ 供应商与基础设施

- [#119745](https://github.com/openclaw/openclaw/pull/119745) — 优化 Ollama 插件非活跃启动成本（延迟加载 setup/embedding/web-search 等运行时）
- [#119762](https://github.com/openclaw/openclaw/pull/119762) — 发布验证覆盖 Windows Node 正式/预发布版本产物
- [#119441](https://github.com/openclaw/openclaw/pull/119441) — systemd 网关重启时正确应用 `.env` 变更（之前快照导致旧值残留）
- [#118442](https://github.com/openclaw/openclaw/pull/118442) — `model_call` 分支也应用 15 分钟中止底线，避免卡死恢复误杀健康长任务

---

## 4. 社区热点

| Issue | 标题 | 评论 | 点赞 | 焦点分析 |
|---|---|---|---|---|
| [#116201](https://github.com/openclaw/openclaw/issues/116201) | Realtime voice work can retain unbounded provider and consult state | **58** | 0 | 实时语音会话在慢/停滞/突发 provider 行为下无界保留 superseded consult 数据。资源上限设计缺失，社区高度关注 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | Subagent completion silently lost — no retry, no notification | 25 | 2 | 子代理完成信号在 E31/E42/E45 等模式下静默丢失，无重试。**已持续 5 个月** |
| [#118846](https://github.com/openclaw/openclaw/issues/118846) | Gateway main thread saturated from boot by plugin-metadata snapshot + fs statting | 19 | 0 | 网关主线程从启动即 100% 被打满，本地 RPC 在 ws_upgrade 时 1006 死亡。**今日已关闭** |
| [#86519](https://github.com/openclaw/openclaw/issues/86519) | Agent repeats identical replies 2-10x on Telegram after 5.20 update | 14 | 1 | 5.20 回归：每条用户消息触发 2–10 次相同回复。**持续 2.5 个月未治愈** |

**趋势判断**：社区讨论聚焦在「消息可靠性与会话一致性」——投递重复（#86519）、静默丢失（#44925）、无界状态累积（#116201）是三大高频痛点。这些表面上分散的问题，背后是同一类分布式会话状态管理缺陷，社区整体期待系统性根治，而非逐个渠道打补丁。

---

## 5. Bug 与稳定性

### 🔴 P0 — 发布阻断级

| Issue | 描述 | 状态 |
|---|---|---|
| [#119263](https://github.com/openclaw/openclaw/issues/119263) | Agent DB v14→v15 迁移失败：`no such column: entry_valid`，事务回滚，**网关拒绝启动**（2026.7.2 b4f01af 回归） | ✅ 已有 linked PR |
| [#70903](https://github.com/openclaw/openclaw/issues/70903) | 文件持久化 provider 冷却在计费恢复后仍阻塞用户数小时（`disabledUntil` 跨重启存活且自动续期） | ✅ 已有 linked PR |

### 🟠 P1 — 高严重度

**消息丢失 / 重复（impact:message-loss）**

- [#44925](https://github.com/openclaw/openclaw/issues/44925) 子代理完成静默丢失，无重试/通知/自动重启（3 月创建，至今未关闭）
- [#86519](https://github.com/openclaw/openclaw/issues/86519) Telegram 重复回复 2–10x，5.20 引入，5.22 仅缓解未根治
- [#84583](https://github.com/openclaw/openclaw/issues/84583) cron 播报投递触发 `EmbeddedAttemptSessionTakeoverError`，打断用户正在进行的会话
- [#85251](https://github.com/openclaw/openclaw/issues/85251) Codex app-server 发出 `turn/started` 后静默，嵌入式运行卡死直至 360s 超时强制中止
- [#109490](https://github.com/openclaw/openclaw/issues/109490) 客户端委托工具返回 `terminate:true`，承诺的后续工作永不执行（2026.7.1 引入）
- [#117445](https://github.com/openclaw/openclaw/issues/117445) 飞书插件（@openclaw/feishu）将入站 DM 解码为 `?`，ingress spool 抛 `undefined.catch`，`replies=0`

**会话状态损坏（impact:session-state）**

- [#113306](https://github.com/openclaw/openclaw/issues/113306) SQLite 快照恢复缺乏端到端崩溃与身份保障，可谎报成功
- [#116022](https://github.com/openclaw/openclaw/issues/116022) `/new` 重用稳定会话 ID，无法恢复已退役的 Codex 绑定墓碑（`state:"cleared", retired:true`）
- [#115700](https://github.com/openclaw/openclaw/issues/115700) `chat.send` 因 "thread switched branches" 持续被拒，stale `expectedLeafEntryId` 未刷新
- [#67419](https://github.com/openclaw/openclaw/issues/67419) 引导文件（MEMORY.md 等）每轮重复注入，浪费 20–30% token

**稳定性 / 性能**

- [#118846](https://github.com/openclaw/openclaw/issues/118846) 网关主线程被插件元数据快照+文件 stat 打满（**已关闭，修复已验证**）
- [#97616](https://github.com/openclaw/openclaw/issues/97616) hook/工具子进程未回收，Zombie 进程累积导致运行时劣化
- [#106231](https://github.com/openclaw/openclaw/issues/106231) 循环检测阻止 exec 但不终止卡死代理运行，资源持续空烧数小时
- [#112423](https://github.com/openclaw/openclaw/issues/112423) 大型 SQLite 转录清理（物化/压缩/回读）阻塞网关事件循环

### 🟡 P2 — 值得关注

- [#51429](https://github.com/openclaw/openclaw/issues/51429) 工作路径被硬编码为 `/Users/wangtao`（中文社区高关注）
- [#77306](https://github.com/openclaw/openclaw/issues/77306) qqbot 渠道消息重复发送：`message_sending` hook 在 WebChat 历史回放时被误触发
- [#96007](https://github.com/openclaw/openclaw/issues/96007) Discord 内联错误文本后的内容被静默截断

---

## 6. 功能请求与路线图信号

### 高热度新需求

| Issue | 需求 | 👍 | 路线图判断 |
|---|---|---|---|
| [#53654](https://github.com/openclaw/openclaw/issues/53654) | Discord 支持 `messageUpdate`/`messageDelete`（编辑重触发、删除取消） | 3 | 结合 #119737 Slack 线程修复、#96692，说明"渠道事件完整性"是当前迭代重点 |
| [#8892](https://github.com/openclaw/openclaw/issues/8892) | TUI 增加 `--agent` 参数选择会话处理代理 | 3 | 与 #119766 的会话标签工作联动，多代理体验正在补齐 |
| [#79902](https://github.com/openclaw/openclaw/issues/79902) | 在 database-first 运行时之上提供伴生型 SQLite 转录/会话读写接口 | 2 | 数据库优先架构的自然延伸，属生态开放性需求 |
| [#50798](https://github.com/openclaw/openclaw/issues/50798) | ACP 线程绑定会话的可视 Agent 间消息（免主会话创建） | 0 | 与 #112326 A2A 会话限制 PR 相关，属多代理编排路线 |
| [#48918](https://github.com/openclaw/openclaw/issues/48918) | 用户级技能偏好/约定（避免覆盖整个 SKILL.md） | 0 | 暂无 PR，优先级较低 |

### 路线图强信号

- **#119325**（`/model -s` 会话级模型选择）已进入 PR 阶段 → "多模型按会话隔离"正在落地，预计进入下一版本
- **#114636**（Standard Hosting Profile 配置检测与合规工具）——若合并将大幅改善部署可观测性；依赖 #113422，目前 `waiting on author`
- **#97046**（Gee 运行时所有权信封）——将 Gee 托管工具/auth/压缩/故障转移纳入类型化契约，安全边界风险高，暂无维护者明确表态

---

## 7. 用户反馈摘要

- **中文社区信任危机**：[#51429](https://github.com/openclaw/openclaw/issues/51429) 用户发现 `wangtao` 的绝对路径被硬编码进代码并被合并发布，文件自述"这位 wangtao 是谁？"，直指代码审查流程漏洞；[#77306](https://github.com/openclaw/openclaw/issues/77306) qqbot 渠道在 WebChat 历史回放时向 QQ API 重复发消息。
- **Telegram 重度用户信心受挫**：[#86519](https://github.com/openclaw/openclaw/issues/86519) 反馈升级 2026.5.20 后每条消息收到 2–10 条相同回复，5.22 降为 2–3 次但未根治。事件已持续 2.5 个月且伴随多次版本更新，用户表示"不知道能升级到什么版本才算安全"。
- **订阅计费惩罚过重**：[#115642](https://github.com/openclaw/openclaw/issues/115642) 与 [#70903](https://github.com/openclaw/openclaw/issues/70903) 评论区：一次 402 计费错误触发固定 ~5 小时冷却，即使充值恢复后仍被拒——"自动化故障惩罚超过了实际故障持续时间"。用户建议：探测恢复、缩短 usage-limit 错误 TTL、提供手动重置命令。
- **本地部署受阻**：[#106779](https://github.com/openclaw/openclaw/issues/106779) macOS M5 Max + llama.cpp（build 9950）在 2026.7.1 上全部本地 provider 请求失败，报 `Unable to generate parser for this template`。
- **对自动化维护的期待**：今日 3 个 clawsweeper 自动修复 PR（#119731/#119737/#119717）均为 24h 内创建。社区潜在期待：若这些自动修复在人工复核后质量稳定，将显著缓解 471 条活跃 Issue 的积压。

---

## 8. 待处理积压

### ⚠️ 长期未闭环的高影响 Issue

| Issue | 创建时间 | 严重度 | 悬挂时长 | 备注 |
|---|---|---|---|---|
| [#44925](https://github.com/openclaw/openclaw/issues/44925) 子代理完成静默丢失 | 2026-03-13 | P1 | **~5 个月** | 25 评论，高热度，无修复 PR |
| [#70903](https://github.com/openclaw/openclaw/issues/70903) 持久化冷却阻塞用户 | 2026-04-24 | **P0** | **~3.5 个月** | 发布阻断级，已有 linked PR 但未合并 |
| [#51429](https://github.com/openclaw/openclaw/issues/51429) 硬编码路径 | 2026-03-21 | P2 | **~4.5 个月** | 中文社区观感极差 |
| [#86519](https://github.com/openclaw/openclaw/issues/86519) Telegram 重复回复 | 2026-05-25 | P1 | **~2.5 个月** | 回归 Bug，`needs-maintainer-review` |
| [#69208](https://github.com/openclaw/openclaw/issues/69208) 重复转录 Umbrella | 2026-04-20 | P1 | **~3.5 个月** | 跨 MSTeams/webchat/Telegram 的总括 Issue |

### ⏳ 等待审查/决策的大型 PR（维护者瓶颈）

| PR | 合并风险 | 等待状态 |
|---|---|---|
| [#112326](https://github.com/openclaw/openclaw/pull/112326) A2A 反向 `sessions_send` 限制 | 🚨 兼容性/会话状态/消息投递 | `needs proof` |
| [#97046](https://github.com/openclaw/openclaw/pull/97046) Gee 运行时所有权信封 | 🚨 兼容性/auth-provider/安全边界 | `needs proof` |
| [#89985](https://github.com/openclaw/openclaw/pull/89985) 更新时保留本地包覆盖 | 🚨 兼容性/安全边界 | `waiting on author`，已悬挂 2 个月 |
| [#114636](https://github.com/openclaw/openclaw/pull/114636) Standard Hosting Profile 工具链 | 🚨 自动化/兼容性/可用性 | `waiting on author`，依赖 #113422 |

### 🤖 自动化修复的待验证项

#119731、#119737、#119717 由 clawsweeper[bot] 生成，虽标称 `ready for maintainer look`，仍需人工验证语义正确性与回归风险。若该类自动修复可持续稳定产出，将对缓解当前 471 条活跃 Issue 的积压起到实质作用。

---

**健康度总评**：项目活跃度极高、维护者投入大，但 **Issue 净增速度快于关闭速度**、2 个 P0 长期未愈、P1 消息丢失类 Bug 盘旋数月，当前健康度评级：⚠️ **活跃但承压**。建议优先闭环 P0 迁移与冷却问题，并在执行归因重构合并后系统性收割一批 P1 消息可靠性 Issue。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告

**报告日期**：2026-08-06
**数据窗口**：2026-08-05 ~ 2026-08-06（过去 24 小时）
**分析对象**：OpenClaw、Zeroclaw、PicoClaw、QwenPaw、hermes-agent、AstrBot

---

## 1. 生态全景

个人 AI 助手开源生态正处于"规模爆发与质量承压并存"的阶段。以 OpenClaw、hermes-agent 为代表的核心运行时日 PR 更新均达 500 条量级，但合并率（15%/29%）与 Issue 关闭率（6%/9%）普遍偏低，维护瓶颈已成为全行业共性制约。跨项目高度同频的话题——消息重复/丢失、Token 固定开销、模型路由、会话状态一致性——表明行业正从"能跑"转向"可靠、省钱、可控"的第二阶段。安全加固在多个项目中首次成为占比最高的 PR 类别（Zeroclaw 约 1/3），自动化修复机器人（clawsweeper）也开始进入生产流水线，预示着维护方式的变革已经开始。

---

## 2. 各项目活跃度对比

| 项目 | Issue 更新（关闭） | PR 更新（合并/关闭） | 合并率 | Release | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（29，**净增 +442**） | 500（77） | 15.4% | 无 | ⚠️ 活跃但承压，P0 悬挂 3.5 个月，Issue 增速远超关闭速度 |
| **hermes-agent** | 460（41） | 500（143） | 28.6% | 无 | 峰值活跃，吞吐健康，P0/P1 集中关闭 |
| **Zeroclaw** | 50（11） | 50（1） | 2% | 无 | 讨论深化、产出积压，49 条 PR 待合并 |
| **QwenPaw** | 23（6） | 50（21） | 42% | 无 | 良好，长周期 PR 集中落地，新人贡献活跃 |
| **AstrBot** | 7（1） | 16（8） | 50% | **v4.27.2** | 稳健，补丁节奏正常，存在历史 PR 积压 |
| **PicoClaw** | 0（0） | 2（0） | 0% | 无 | 中低活跃，功能持续推进但社区交互趋零 |

**关键读数**：OpenClaw 活跃度最高但 Issue 净增 +442 条，是唯一"失血"项目；AstrBot 合并率 50% 与 PicoClaw 近零流转形成鲜明对照；Zeroclaw 合并率仅 2%，处于刻意降速的稳定化周期。

---

## 3. OpenClaw 在生态中的定位

OpenClaw 是当前生态**规模最大、覆盖面最广的通用智能体运行时**，日 500 Issue + 500 PR 的流量是 Zeroclaw/QwenPaw 的 10 倍量级，被社区视为核心参照项目。

**核心优势：**

- **深度架构投入领先**：执行归因（Execution Attribution）5 步重构（#116792–#116796）是生态中唯一针对"跨运行时会话串线、审计错乱"的系统性根治方案，而非头痛医头。对比 hermes-agent 的 SQL LIKE 转义、AstrBot 的重复检测升级，OpenClaw 选择的是从身份追踪模型层重建。
- **多运行时覆盖最广**：网关 / ACP / 嵌入式 / CLI 四种运行时形态，远超 hermes-agent（桌面优先）与 Zeroclaw（网关+CLI）的覆盖范围。
- **自动化维护先行**：clawsweeper[bot] 已建立"Issue 分诊 → 补丁生成 → 人工复核"流水线，24h 内产出 3 个修复 PR（#119731/#119737/#119717），是其余项目尚未具备的能力。

**相对短板：**

- **合并/评审瓶颈最严重**：合并率 15.4% 仅为 hermes-agent 的一半，大量高热度 Bug（#44925、#86519）悬挂 2.5–5 个月未闭环，社区信任正被消耗（如中文社区 #51429 硬编码路径事件）。
- **技术与 Zeroclaw 呈两极化**：OpenClaw 走 TypeScript/Node + 功能优先，Zeroclaw 走 Rust + 安全优先 + 可验证意图，两者代表了"广度"与"纵深"两种路线，短期不会趋同。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目与具体诉求 |
|---|---|
| **Token 成本治理** | hermes-agent（#6839 Lazy Tool Schema，用户实测固定开销占 73%）；QwenPaw（#6699 技能描述挤占 25–30% system prompt）；OpenClaw（#67419 引导文件每轮重复注入浪费 20–30% token）；Zeroclaw（#9631 请求 session_id 以启用 prompt caching） |
| **消息可靠性与去重** | OpenClaw（#86519 Telegram 重复回复 2–10x、#44925 子代理完成静默丢失）；Zeroclaw（#6350 WhatsApp 绕过 allowed-numbers 丢消息）；QwenPaw（#6696 微信一次性 token 被输入指示器消耗）；AstrBot（#7786 重复检测升级为"工具名+参数指纹"） |
| **模型路由与自动切换** | QwenPaw（#5597 LLM 回退已合并、#6436 自动路由）；OpenClaw（#119325 会话级 /model -s）；PicoClaw（#3200 默认后备链）；Zeroclaw（#8603 OpenAI Chat Completions 兼容 profile） |
| **会话状态一致性** | OpenClaw（#116022 /new 复用稳定会话 ID、#113306 SQLite 快照恢复误报）；hermes-agent（#8457 跨会话持久记忆）；Zeroclaw（#9487 运行时拥有会话所有权 RFC）；QwenPaw（#6722 子代理失败误报成功） |
| **安全架构化** | Zeroclaw（#7155 shell 三档策略、#9428 频道强制鉴权、#8826 SSRF 防护）；OpenClaw（执行归因含安全边界风险标记）；hermes-agent（Electron 41 沙箱绕过升级）；AstrBot（#9525 备份鉴权大小写修复）；QwenPaw（#6713 敏感目录审计） |
| **渠道事件完整性** | OpenClaw（#119737 Slack 线程回执、#53654 Discord 编辑/删除事件）；AstrBot（#9558 Telegram 独立代理）；Zeroclaw（#9774 Signal sourceUuid 静默丢弃）；QwenPaw（#6684 频道自动重试/健康检测） |
| **自动化维护与 CI** | OpenClaw（clawsweeper bot）；hermes-agent（#79735 测试分片 8→12，merge-gate 缩短 33%）；QwenPaw（#6727 修复 66 个被静默跳过的 Windows 测试）；AstrBot（#9556 插件重载回归测试） |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 | 关键差异化 |
|---|---|---|---|---|
| **OpenClaw** | 通用多智能体运行时，多运行时 + 多频道 | 自托管重度用户，追求功能广度 | TypeScript/Node，网关中心，ACP/嵌入/CLI | 生态最大；系统性重构投入最深；自动化修复流水线 |
| **hermes-agent** | 桌面优先的会话管理 + 数据完整性 | 开发者个人主力工具 | Electron 桌面 + TUI，会话/记忆管理 | 合并吞吐最高；桌面端体验与数据安全并重 |
| **Zeroclaw** | 安全/隐私优先，可验证意图 | 安全敏感组织与个人 | Rust，WASM 插件，链验证器 | 安全能力标准化（shell 策略、OAuth、SSRF）；RFC 驱动开发 |
| **QwenPaw** | 生产级 Agent 平台，模型路由与容错 | 团队、API 重度用户 | Agent 平台 + Console UI，多 Provider | LLM 回退/重试/DeepSeek 兼容等生产可用性能力率先落地 |
| **AstrBot** | 多平台机器人框架 | 机器人开发者、社区运营 | Provider 适配器 + 插件系统 | 轻量、合并率高、发布节奏稳定；平台适配广度见长 |
| **PicoClaw** | 轻量/边缘部署 | 嵌入式与资源受限场景 | 极小化运行时 + 基础 Web UI | 与其余项目的"大而全"路线完全不同，占位边缘场景 |

---

## 6. 社区热度与成熟度

**活跃度分层：**

- **T1 极速迭代**（PR 500/日）：**OpenClaw、hermes-agent**。两者共享同一量级的流量，但 OpenClaw 处于功能快速扩张 + 债台高筑状态，hermes-agent 则通过 28.6% 合并率与 P0/P1 集中关闭展现了更强的收敛能力。
- **T2 高活跃**（PR 50/日）：**Zeroclaw、QwenPaw**。Zeroclaw 在质量/安全性上刻意收口，QwenPaw 则保持着全生态最好的投入产出比之一。
- **T3 稳健迭代**：**AstrBot**。16 条 PR/日、50% 合并率、v4.27.2 补丁发布，属于"小而健康"的典型。
- **T4 低活跃**：**PicoClaw**。24h 零 Issue、0 合并，接近维护模式，两条 PR 分处"新鲜功能"与"135 天积压"两个极端。

**阶段判断：**

- **功能扩张期（透支型）**：OpenClaw —— 净增 +442 Issue、P0 悬挂 3.5 个月，需要一次系统性收割。
- **质量巩固期**：hermes-agent —— 高吞吐合并 + 数据完整性修复集中关闭；Zeroclaw —— v0.8.5 intake 冻结，RFC 驱动的刻意降速。
- **功能落地期**：QwenPaw —— 3 个月长周期 PR（LLM 回退、重试逻辑）同日集中合并。
- **稳定维护期**：AstrBot；**准维护期**：PicoClaw。

---

## 7. 值得关注的趋势信号

1. **Token 成本治理成为第一优先级优化目标。** hermes-agent 用户实测 73% 调用为固定开销、QwenPaw 用户量化技能描述占 25–30% system prompt、OpenClaw 引导文件浪费 20–30% token，四个项目在"成本"上形成了罕见共识，且已有 lazyschema 加载、按需技能、prompt caching 等具体方案。**对开发者的参考价值**：在设计工具注册与技能注入机制时，应默认按需加载而非全量注入。

2. **消息可靠性正从"逐渠道打补丁"转向"系统级重构"。** OpenClaw 的执行归因 5 步重构与 Telegram 重复回复 2.5 个月未愈形成鲜明对比，社区已对补丁式修法失去耐心。**参考价值**：会话归因、幂等投递、重试语义应在一等公民的设计层面解决，而非事后补救。

3. **模型路由是下一个标配能力。** 同一天内，QwenPaw 合并 LLM 回退、PicoClaw 推进后备链、OpenClaw 落地会话级 /model -s、Zeroclaw 讨论 OpenAI 协议兼容——四个项目不约而同指向"单模型绑定 → 策略化路由"。**参考价值**：开发 agent 时应预留 provider_extra、session_id、reasoning_content 回传等模型路由兼容细节。

4. **安全从配置项升级为合并门槛。** Zeroclaw 以 verifiable-intent 停止注册未验证工具、OpenClaw 将安全边界作为重构合并风险标记、hermes-agent 升级 Electron 修复沙箱问题——安全已从"用户自行配置"变为"维护者评审红线"。**参考价值**：新功能的架构设计阶段就应附带安全边界说明。

5. **自动化维护机器人正式进入生产流水线。** OpenClaw clawsweeper 24h 产出 3 个修复 PR，hermes-agent 用 CI 分片压缩 merge-gate 1/3，QwenPaw 修复了 66 个被静默跳过的测试。**参考价值**：在维护者人力成为瓶颈的当下，"bot 生成 + 人工复核"是唯一可规模化的解药，值得各项目跟进。

6. **协议兼容层成为中小项目对抗头部运行时的重要策略。** Zeroclaw #8603（OpenAI Chat Completions profile）与 AstrBot（Responses API 原生工具）不约而同选择用 OpenAI 协议暴露能力，以接入 Open WebUI、LobeChat、Aider 等既有生态。**参考价值**：与其自建生态，不如协议兼容——这是资源有限项目扩大影响力的最短路径。

---

*本报告基于各项目 2026-08-06 公开社区数据整理，健康度评估为主观判断，供技术决策与路线图参考。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报

**日期**：2026-08-06  
**数据来源**：[github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)  
**统计周期**：2026-08-05 至 2026-08-06（过去 24 小时）

---

## 1. 今日速览

- **整体活跃度：极高**。24 小时内 50 条 Issue 更新（新增/活跃 39 条，关闭 11 条）、50 条 PR 更新，但 PR 合并率仅 2%（49 条待合并，仅 1 条合并/关闭），社区讨论与产出之间存在明显积压。
- **无新版本发布**，项目正处于 v0.8.5 有限稳定化周期内（参考 tracker #9459），核心工作偏向安全加固、架构 RFC 评审与 bug 修复。
- **新增 3 个 S1/S2 级高影响 Bug**：OpenRouter 流式请求丢失 `provider_extra`（S1）、Signal 频道静默丢弃 `sourceUuid` 发送者（S1）、daemon reload 信号错误且安全警告误导操作者（S2）。
- **架构讨论持续升温**：多个高评论数 RFC（Goal mode #8303、Chat Completions profile #8603、shell 策略 #7155、可插拔认证 #7141）正在向可执行规范靠拢，多个长期 RFC 在 8 月 5 日获得 Revision 更新。
- **安全领域占据主导**：今日新增 Issue 和 PR 中约 1/3 涉及安全策略（shell 策略、vi_verify、SSRF、OAuth、授权校验），安全加固是当前阶段的明确主线。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日合并/关闭的 PR 数量极少（1 条），项目整体处于“产出积压、讨论深化”阶段。主要进展体现在 Issue 关闭和既有 PR 的持续推进上。

### 3.1 今日合并/关闭的 PR

- **#9750 [fix(service): bound launcher-owned daemon logs]** — 已合并/关闭。将无界固定文件 daemon 输出重定向替换为共享服务主管，每个 launcher 拥有的日志文件限制在 8 MiB 内，同时保留近期输出。这是 daemon 日志管理的重要稳定性修复，为其后续 launchd 版本（#9773）提供了基础。  
  [PR #9750](https://github.com/zeroclaw-labs/zeroclaw/pull/9750) *(size:XL，涉及 core/gateway/runtime/service/cli)*

### 3.2 今日关闭的 Issue（共 11 条中代表项）

| Issue | 说明 | 状态 |
|---|---|---|
| [**#9432**](https://github.com/zeroclaw-labs/zeroclaw/issues/9432) | verifiable-intent：在存在链验证器之前停止将 `vi_verify` 注册为模型可调用工具，并输出启动警告 | 关闭，v0.8.4 安全防护落地 |
| [**#9462**](https://github.com/zeroclaw-labs/zeroclaw/issues/9462) | `zeroclaw-plugins` 在 `plugins-wasmtime` feature 下的 lib 单元测试从未在 CI 中执行 | 关闭，CI 修复 |
| [**#6350**](https://github.com/zeroclaw-labs/zeroclaw/issues/6350) | WhatsApp Web LID 联系人的 allowed-numbers 被绕过，导致静默丢弃消息 | 关闭，高严重度 bug 已处理 |
| [**#7467**](https://github.com/zeroclaw-labs/zeroclaw/issues/7467) | Zerocode 字符串设置编辑时支持光标导航 | 关闭，用户可用性改进 |
| [**#9335**](https://github.com/zeroclaw-labs/zeroclaw/issues/9335) | 支持 data 包装的 OpenAI-compatible 聊天响应 | 关闭，兼容层增强 |
| [**#9652**](https://github.com/zeroclaw-labs/zeroclaw/issues/9652) | `config set` 拒绝 cron key 的连字符别名，而 `config list/get` 可读取同一 key | 关闭，CLI 一致性修复 |
| [**#9728**](https://github.com/zeroclaw-labs/zeroclaw/issues/9728) | `session/new` 需要退出空闲同级驱逐的 opt-out 机制（多 agent 并行的前置条件之一） | 关闭 |

### 3.3 持续推进的重要 PR

以下 PR 在今日获得更新但尚未合并，反映了安全加固与架构调整的活跃度：

- **#9428** — 要求 Bluesky 与 Reddit 频道强制发送者授权（`peer_groups` 校验），此前这两个频道是唯一从不检查 `is_user_allowed` 的入站适配器，风险极高，涉及 17 个频道相关标签。  
  [PR #9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428) *(size:XL)*
- **#9678** — 加固 Git shell 策略参数：统一命令策略边界的 shell 词规范化，使可执行文件 allowlist、Git 风险分类、环境变量赋值检查使用同一套引号/转义感知表示。  
  [PR #9678](https://github.com/zeroclaw-labs/zeroclaw/pull/9678) *(size:L)*
- **#9403** — 为 WASM 导出绑定墙钟截止时间（默认 30 秒），防止插件导出的工具/内存/频道调用无限挂起。  
  [PR #9403](https://github.com/zeroclaw-labs/zeroclaw/pull/9403) *(size:XL)*
- **#9109** — 新增原生 Hailo-Ollama 支持（Hailo 硬件上的本地模型推理）。  
  [PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) *(size:XL)*

---

## 4. 社区热点

### 4.1 评论最多的 Issue

| Issue | 评论数 | 关注点 |
|---|---|---|
| [**#8303** RFC: Goal mode v1 — bounded foreground Matrix work](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) | 17 | 如何在多次 agent 轮次中持久化地追求有界用户目标；控制面方向已确认，但首次实现边界过宽 |
| [**#8603** RFC: ZeroClaw Chat Completions profile](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) | 16 | 让 ZeroClaw 适配 OpenAI Chat Completions 协议，以支持 Open WebUI、LobeChat、Aider、LangChain 等生态工具 |
| [**#7155** RFC: 针对高风险 shell 命令增加逐执行确认层级 + Claude Code 风格命令策略](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) | 16 | shell 命令的 allow/ask/deny 三档策略，8 月 5 日发布 Revision 3，收窄规范性范围 |
| [**#7141** RFC: 可插拔入站认证与规范化主体](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) | 12 | Rev 8，OIDC 与可插拔 provider 方案，面向 Identity & Access 里程碑 |
| [**#8692** Tracker: 维护者决策队列](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 10 | RFC 与设计 issue 的维护者决策跟踪器，当前积压量大 |
| [**#9487** RFC: 运行时拥有的会话与传输表面适配器](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | 10 | Rev 2，会话生命周期所有权边界重新划分，所有迁移入口提交 `InboundAction` |

### 4.2 热点诉求分析

1. **OpenAI 生态兼容性**（#8603）：社区希望 ZeroClaw 的能力通过 Chat Completions 协议暴露给主流 AI 客户端工具。这是 ZeroClaw 从“自有协议”走向“开放生态”的关键信号，若被接受，将大幅降低第三方工具接入门槛。
2. **目标驱动执行**（#8303、#6954）：多条 RFC 意味着 agent 不应只做单轮响应，需要有边界、可恢复、可绑定的多轮目标执行机制。
3. **安全管理标准化**（#7155、#7141、#9428）：shell 策略分层、可插拔认证、频道发送者授权——安全能力正从单一配置走向标准化框架。

---

## 5. Bug 与稳定性

### 5.1 新增高严重度 Bug

| 严重度 | Issue | 描述 | Fix PR |
|---|---|---|---|
| **S1 - 工作流阻断** | [**#9775**](https://github.com/zeroclaw-labs/zeroclaw/issues/9775) | **OpenRouter 流式请求丢失 `provider_extra`**：`stream_chat` 未调用 `merge_extra_body`，所有配置的 `provider_extra` 参数在流式模式下被静默丢弃 | 无 |
| **S1 - 工作流阻断** | [**#9774**](https://github.com/zeroclaw-labs/zeroclaw/issues/9774) | **Signal 频道静默丢弃 `sourceUuid` 发送者**：当发送者为隐私模式、`source` 和 `sourceNumber` 均为 null、仅提供 `sourceUuid` 时，入站消息被无提示丢弃 | 无 |
| **S2 - 行为降级** | [**#9768**](https://github.com/zeroclaw-labs/zeroclaw/issues/9768) | **daemon reload 不在 SIGUSR1 上**，且降级安全警告提示操作者发送的信号实际会杀死 daemon。两处严重误导 | 无 |

### 5.2 新增中低严重度 Issue

- **#9770** — `cron update` 静默丢弃声明式 job 的更改（command、name、expression 等 6 列）。应拒绝或清晰提示。  
  [Issue #9770](https://github.com/zeroclaw-labs/zeroclaw/issues/9770)
- **#9771** — `zeroclaw-gateway` 在默认 feature 面上无法通过 `clippy -D warnings`，4 个测试助手因 feature 门控错位成为死代码。  
  [Issue #9771](https://github.com/zeroclaw-labs/zeroclaw/issues/9771)
- **#9769** — 当 `observability.log_persistence = "none"` 时，`vi_verify` withheld 操作者通知无处送达，需要决定替代渠道。  
  [Issue #9769](https://github.com/zeroclaw-labs/zeroclaw/issues/9769)

### 5.3 既有高优先级 Bug 状态

| Issue | 优先级 | 当前状态 |
|---|---|---|
| [**#8642**](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) MCP/tool-schema 克隆导致 agent 循环中 RSS 无界增长 | p1 | status:in-progress + accepted，无直接 fix PR |
| [**#9328**](https://github.com/zeroclaw-labs/zeroclaw/issues/9328) `vi_verify` 在未验证凭据链的情况下评估约束 | p2 | status:accepted，#9432 已关闭（停止注册工具，作为缓解） |
| [**#9697**](https://github.com/zeroclaw-labs/zeroclaw/issues/9697) ZeroCode 无法连接 Windows 任务计划程序启动的 daemon | p1 | status:accepted，#9117 的同类问题，无 fix PR |

---

## 6. 功能请求与路线图信号

### 6.1 新功能请求（今日新增）

- [**#9772** feat(telegram): 共享群组会话的 `per_user_session` 切换](https://github.com/zeroclaw-labs/zeroclaw/pull/9772) — Telegram 群组当前硬编码为 `ChannelConversationScope::Sender`，多人协作时无法共享上下文。此 PR 试图解决真实的多人协作场景。
- [**#9716** 为 provider 错误添加结构化本地化边界](https://github.com/zeroclaw-labs/zeroclaw/issues/9716) — provider 返回的英文错误字符串会到达 CLI、RPC、频道等所有用户面，需支持本地化。
- [**#9727** Epic: 在 ZeroCode 侧边栏运行和监控多个 agent](https://github.com/zeroclaw-labs/zeroclaw/issues/9727) — 当前 UI 一个面板只能有一个会话，多 agent 并行时无法侧视。这条 epic 将推动 TUI 的会话管理重构。

### 6.2 可能纳入下一版本的方向（结合既有 PR）

- **OpenRouter 提示缓存**（#9631）：OC 用户请求稳定的 `session_id`，使 OpenRouter 的 prompt caching 生效。当前 `stream_chat` 还有 bug（#9775），修复后此功能链路将完整。
- **Hailo-Ollama 原生支持**（[PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)）：边缘 AI 硬件集成，面向低成本本地推理场景。
- **JUnit XML 测评报告**（[PR #9223](https://github.com/zeroclaw-labs/zeroclaw/pull/9223)）：`zeroclaw eval` 增加 `--format junit`，服务 CI 测试报告器。
- **WebSocket keepalive**（[PR #9701](https://github.com/zeroclaw-labs/zeroclaw/pull/9701)）：Web UI 聊天 WebSocket 空闲时发送 Ping，防止中间设备断连。
- **Anthropic 存储的 OAuth profiles**（[PR #9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420)）：显式 `auth_mode = "oauth"`，别名解析同名的 Anthropic 存储配置，替代 legacy 静态 API key。

### 6.3 路线图信号

从 [**#9459 (v0.8.5 稳定化 tracker)**](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) 来看，8 月 4 日 intake 已冻结，当前只发布已就绪的工作。因此上述新功能 PR（#9772、#9727 等）更可能落点在 **v0.9.0**（其 tracker 为 #7432），尤其与 v0.9.0 的 auth/security/gateway 破坏性变更队列直接相关。

---

## 7. 用户反馈摘要

- **OpenRouter 成本抱怨**（[#9631](https://github.com/zeroclaw-labs/zeroclaw/issues/9631)）：用户指出“一次对话产生数十次 LLM 请求，系统提示和工具 schema 每次完整重放，浪费巨大”。这是典型的实际部署成本痛点，社区已有具体解决方案提案（session_id）。
- **ZeroCode 可用性问题**（[#9697](https://github.com/zeroclaw-labs/zeroclaw/issues/9697)）：Windows 任务计划程序启动 daemon 时 ZeroCode 连接失败，且该问题在“上一版本”中也存在，用户表示此前期望已修复但落空。关联 #9117，属 Windows 场景的反复回归。
- **配置文件 CLI 不一致**（[#9652](https://github.com/zeroclaw-labs/zeroclaw/issues/9652)）：用户通过文档工作流重设 cron job 时，`config list/get` 能读到的 key 但 `config set` 拒绝写入，问题很具体、可复现。
- **安全策略诉求**（[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)）：用户引用 Claude Code 的命令策略模式，要求 allow/ask/deny 三档，表明用户对高危 shell 命令的防护需求已经“对标竞品”。
- **工作区内敏感文件保护**（[#8424](https://github.com/zeroclaw-labs/zeroclaw/issues/8424)）：用户明确指出当前 `forbidden_paths` 只能屏蔽工作区外路径，而工作区内的 `.env`、`config.yaml`、`rust-toolchain.toml` 等敏感文件无法被保护。这是一个合理且迫切的功能缺口。
- **MCP 内存增长**（[#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642)）：WSL2 用户反馈 OOM，已有根因拆分，社区参与者积极协作定位到工具 schema 克隆路径。

---

## 8. 待处理积压

### 8.1 长期未决 RFC（需维护者决策）

| Issue | 创建 | 评论数 | 状态 |
|---|---|---|---|
| [**#6954** RFC: 内部启动 agent 轮次的 Provenance/会话绑定/回复契约](https://github.com/zeroclaw-labs/zeroclaw/issues/6954) | 2026-05-26 | 8 | Rev 2 已发布，等待维护者批准 |
| [**#7155** RFC: 高危 shell 命令逐执行确认层级](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) | 2026-06-03 | 16 | Rev 3 已发布，scope 已收窄 |
| [**#7141** RFC: 可插拔入站认证与规范化主体](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) | 2026-06-03 | 12 | Rev 8，等待维护者 |
| [**#7432** Tracker: v0.9.0 auth/security/breaking-change 队列](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) | 2026-06-09 | 2 | 长期 tracker，多项依赖此队列 |
| [**#8303** RFC: Goal mode v1](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) | 2026-06-24 | 17 | 讨论最热，边界被多次修订 |
| [**#8424** RFC: 工作区相对 forbidden 路径模式与 .zeroclawignore](https://github.com/zeroclaw-labs/zeroclaw/issues/8424) | 2026-06-28 | 9 | 等待作者回应 |

### 8.2 长期未合并的重要 PR

| PR | 创建 | 说明 | 阻塞因素 |
|---|---|---|---|
| [**#8496** fix(tools/mcp): 集中化延迟 MCP 访问策略](https://github.com/zeroclaw-labs/zeroclaw/pull/8496) | 2026-06-29 | #8054 Surface 1(b) 的修复 | needs-author-action |
| [**#8928** feat(zerocode): Doctor 中显示已解析的活动日志路径](https://github.com/zeroclaw-labs/zeroclaw/pull/8928) | 2026-07-10 | #8650/#8647，改善日志可观测性 | needs-author-action |
| [**#8826** fix(tools): 对 image_gen 下载 URL 做 SSRF 防护](https://github.com/zeroclaw-labs/zeroclaw/pull/8826) | 2026-07-08 | fal.ai 返回 URL 为服务端提供的不可信数据 | needs-author-action |
| [**#9428** fix(channels): Bluesky 和 Reddit 强制发送者授权](https://github.com/zeroclaw-labs/zeroclaw/pull/9428) | 2026-07-27 | 安全漏洞修复，等待作者回复 | needs-author-action |
| [**#9420** fix(anthropic): 支持 OAuth profiles](https://github.com/zeroclaw-labs/zeroclaw/pull/9420) | 2026-07-26 | 大规模改动（涉及 28 个标签） | needs-author-action |
| [**#9403** fix(plugins): WASM 导出绑定截止时间](https://github.com/zeroclaw-labs/zeroclaw/pull/9403) | 2026-07-26 | 防止插件无限挂起 | needs-author-action |

### 8.3 需维护者关注的风险

- **PR 积压严重**：49 条 PR 待合并，其中至少 13 条标记 `needs-author-action`、多条为安全修复（#9428、#9678、#8826 等），建议维护者按安全优先级批量推进。
- **维护者决策队列**（[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)）本身就有大量条目待处理，成了“决策积压的积压”，需要加急处理或拆分。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-06

## 今日速览

PicoClaw 项目在过去 24 小时内无新 Issue 提交、无 Issue 关闭，也无新版本发布；PR 侧保持 2 条待合并状态，其中 #3200 为近期活跃的新功能 PR（昨日仍有更新），#1951 则属于长期积压的工程整合项。整体活跃度处于中低水平，核心开发仍在持续推进，但社区交互与问题反馈层面暂无明显波动。

---

## 项目进展

**今日无合并或关闭的 PR。**

当前有 2 条待合并 PR 值得关注：

- **#3200 [OPEN]** — `feat(models): add configurable default fallback chain`（作者 @lc6464，创建于 2026-07-01，最近更新 2026-08-05）  
  该 PR 在模型页面引入可配置的默认后备链（default fallback chain），用户可设置默认模型、添加后备模型、调整排序并保存完整链路，同时支持持久化到后端 API。这项功能补全了 Web UI 侧的模型降级与容错能力，是近期最主要的功能进展。  
  https://github.com/sipeed/picoclaw/pull/3200

- **#1951 [OPEN]** — `[type: enhancement, domain: build] chore: move installation scripts from docs repo to here`（作者 @lc6464，创建于 2026-03-24，最近更新 2026-08-05）  
  将原先存放在 docs 仓库中的安装脚本迁移至主仓库，便于用户直接从项目仓库获取安装支持，减少跨仓库跳转成本。  
  https://github.com/sipeed/picoclaw/pull/1951

两条 PR 均尚未合并，项目在当前阶段更偏向功能完善和工程整理的增量推进，而非大规模迭代。

---

## 社区热点

今日两个待合并 PR 有活跃更新，但评论数均未公开显示（暂无有效互动数据）。从关注度来看：

- **#3200** 因涉及模型配置与 Web UI 功能、且为近期新建并持续更新，是当前社区最有可能的讨论焦点。  
  https://github.com/sipeed/picoclaw/pull/3200

- **#1951** 时隔 4 个月后于昨日（08-05）再次更新，可能表明维护者重新开始处理积压的工程任务，值得观察后续合并节奏。  
  https://github.com/sipeed/picoclaw/pull/1951

整体而言，社区讨论热度较低，暂无高评论量或高反应度的 Issue/PR 出现。

---

## Bug 与稳定性

**今日无新上报的 Bug、崩溃或回归问题。**

没有发现与稳定性相关的修复 PR 提交，也未检测到活跃的缺陷类 Issue。项目在当前时间窗口内稳定性状态平稳。

---

## 功能请求与路线图信号

最明确的功能信号来自 **#3200**：用户可在模型页面设置默认模型、添加后备模型并调整优先级。这一需求预示项目在模型管理方向上的演进路径：

- 多模型容错与自动降级策略将成为后续 Web UI 的核心能力之一；
- 后端 API 需要支持完整的默认链配置持久化。

结合 #1951 的安装脚本迁移动作，可以推断维护者正在着手改善项目的可安装性与可配置性，这两项内容大概率会进入下一版本的基础能力范围。

- 功能信号 #3200：https://github.com/sipeed/picoclaw/pull/3200
- 工程改进信号 #1951：https://github.com/sipeed/picoclaw/pull/1951

---

## 用户反馈摘要

当前无新增 Issue 或评论可供提炼。基于 PR 内容推断出的用户诉求主要为：

- **更灵活的模型配置方式**：用户需要能够设定默认模型并为其配置后备模型，以实现单入口、多模型自动切换的使用场景（源自 #3200）；
- **更便捷的安装流程**：用户希望直接从主仓库获取安装脚本，减少访问 docs 仓库的额外步骤（源自 #1951）。

目前缺少显式满意度或不满意的评论反馈，项目用户的真实声音暂无法有效捕捉。

---

## 待处理积压

- **#1951**（创建于 2026-03-24，已累计 135 天未合并）  
  安装脚本迁移属于低风险、基础性的工程改进，长期未合并可能影响用户对项目可安装性的体验。昨日出现更新迹象，建议维护者优先跟进合并或给出明确时间表。  
  https://github.com/sipeed/picoclaw/pull/1951

- **#3200**（创建于 2026-07-01，当前仍处于等待评审状态）  
  该 PR 对应明确用户需求，应尽快完成 review 与测试，以确定是否纳入近期版本。  
  https://github.com/sipeed/picoclaw/pull/3200

---

**项目健康度评估**：日常 Issue 流转量归零，PR 评审与合并节奏有待加快，但已有功能性 PR 在持续迭代中。建议维护者优先推进 #1951 和 #3200 的评审合并，以激活社区参与与项目活跃度。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报（2026-08-06）

## 1. 今日速览

过去 24 小时 QwenPaw 保持高活跃度：23 条 Issue 更新（新开/活跃 17 条，关闭 6 条），50 条 PR 更新（待合并 29 条，合并/关闭 21 条），无新版本发布。合并节奏明显加快——多个长周期大型 PR（LLM 回退、模型重试、DeepSeek 兼容）于今日集中落地，同时一批测试基础设施修复和新人贡献 PR 进入队列。整体项目健康度良好，社区反馈集中在渠道稳定性、模型路由智能化、技能系统 Token 开销三个方向。

## 2. 版本发布

今日无新版本 Release。

## 3. 项目进展

今日共 21 条 PR 合并/关闭，以下几项有里程碑意义：

- **LLM 模型回退功能全量上线**：[#5597（后端）](https://github.com/agentscope-ai/QwenPaw/pull/5597) + [#5598（Console UI）](https://github.com/agentscope-ai/QwenPaw/pull/5598) 同日合并。用户现在可在 Agent 级或全局配置候选模型列表，主模型遇 transient/权限错误时按序自动切换，是提升生产可用性的关键能力。
- **DeepSeek 多轮对话兼容修复**：[#6675](https://github.com/agentscope-ai/QwenPaw/pull/6675) 合入，强制向 DeepSeek 思维链模型回传 `reasoning_content`，修复上下文压缩后多轮请求被上游拒绝的问题（对应 issues #6667、#6541）。这是首次贡献者提交，质量达到合并标准。
- **控制台不再无限等待**：[#5447](https://github.com/agentscope-ai/QwenPaw/pull/5447) 合入，模型/运行时错误时向 UI 正常返回失败响应，消除“永久 waiting”体验。
- **模型重试逻辑打磨**：[#3874](https://github.com/agentscope-ai/QwenPaw/pull/3874) 历时超 3 个月（4/27 创建）终于合入，重试策略进一步完善。
- **前端基础与审计**：[#5462](https://github.com/agentscope-ai/QwenPaw/pull/5462) 引入全局响应式工具类，为移动端适配打底；[#6713](https://github.com/agentscope-ai/QwenPaw/pull/6713) 为敏感目录排除增加审计可见性。

此外，今日新提交的待合并 PR 中有两点值得关注：

- **测试基础设施修复**：[#6727](https://github.com/agentscope-ai/QwenPaw/pull/6727) 修复 Windows 路径分隔符导致 66 个集成测试被静默跳过的问题——此前 CI 在 Windows 上报绿但实际未跑这些用例，属于显著的工程质量隐患。
- **新贡献者活跃**：#6725（fork 子代理失败上报）、#6723（capability 缓存过期）均来自首次贡献者，且直接对应今日新报 Bug。

## 4. 社区热点

- **[#6684 增加频道的重试功能（4 条评论，最热）](https://github.com/agentscope-ai/QwenPaw/issues/6684)**：自建 Matrix 用户反馈 QwenPaw 启动快于 Matrix 服务导致频道连接失败，且无自动重试/健康检测，每次服务器重启都必须手动重新保存频道。这暴露了渠道初始化时序和自愈能力的缺失，属于通用渠道层问题，目前无对应修复 PR。
- **[#6436 Automatic Model Routing（3 条评论）](https://github.com/agentscope-ai/QwenPaw/issues/6436)**：社区希望按消息复杂度/模态自动路由模型（轻量任务走小模型、图片触发视觉模型、难题走大模型），而非把每个 Agent 固定绑定单一模型。该诉求与今日合并的 LLM 回退（#5597）方向一致，但更进一步，具备明确的路线图信号。
- **[#6480 nohup/& 分离进程导致 Agent 卡住（2 条评论）](https://github.com/agentscope-ai/QwenPaw/issues/6480)**：`execute_shell_command` 对 `nohup`/`&` 启动的后台进程无法正确回归 idle，工具调用永不返回。这是真实的终端用户场景，涉及 Shell 工具执行模型的设计缺陷。

## 5. Bug 与稳定性

按严重程度排序：

**严重 ⚠️**
- **[#6697](https://github.com/agentscope-ai/QwenPaw/issues/6697) v2.1.0b1 桌面版注入 `PYTHONHOME`，所有 python 子进程崩溃**（`encodings ModuleNotFoundError`）。PyInstaller 后端 + Tauri 壳的进程边界问题，影响所有依赖 python 子进程的功能。**无 fix PR**。
- **[#6696](https://github.com/agentscope-ai/QwenPaw/issues/6696) WeChat iLink 一次性 `context_token` 被输入指示器消耗**，导致正式回复被上游拒绝（ret=-2），“正在输入”状态卡死。同渠道的审批可达性问题（[#6695](https://github.com/agentscope-ai/QwenPaw/issues/6695)）已关闭，但 token 消耗问题仍开放。**无 fix PR**。

**中等 🟡**
- **[#6726](https://github.com/agentscope-ai/QwenPaw/issues/6726) 长会话大量工具调用后报 400**：`Messages with role 'tool' must be a response to a preceding message with 'tool_calls'`，影响 QwenPaw 2.0.0 桌面版。**无直接 fix PR**。
- **[#6708](https://github.com/agentscope-ai/QwenPaw/issues/6708) SSE 流内 503 错误不触发重试**：上游网关在 HTTP 200 流内上报 503 时直接被判失败。**已有 fix PR [#6714](https://github.com/agentscope-ai/QwenPaw/pull/6714)**。
- **[#6707](https://github.com/agentscope-ai/QwenPaw/issues/6707) thinking-mode 上游 + 工具调用历史导致 400**：`reasoning_content` 回传失败。**已有相关 PR [#6721](https://github.com/agentscope-ai/QwenPaw/pull/6721)**。
- **[#6722](https://github.com/agentscope-ai/QwenPaw/issues/6722) 后台 fork 子代理在 worktree 终结失败时仍报告成功**。**已有新人修复 PR [#6725](https://github.com/agentscope-ai/QwenPaw/pull/6725)**。

**较低 🟢**
- [#6698](https://github.com/agentscope-ai/QwenPaw/issues/6698) v2.1.0b1 browser SDK `open()` 全部失败（Target crashed），隔离 Playwright 会话问题。
- [#6687](https://github.com/agentscope-ai/QwenPaw/issues/6687) OpenRouter 多模态探测把文档声明的能力覆盖为 false。
- [#6690](https://github.com/agentscope-ai/QwenPaw/issues/6690)（已关闭）cron pause/resume 不持久化 enabled 状态。
- [#6700](https://github.com/agentscope-ai/QwenPaw/issues/6700)（已关闭）超大工具输出导致历史会话加载卡死，建议确认对应修复所属版本。

## 6. 功能请求与路线图信号

- **模型自动路由**（[#6436](https://github.com/agentscope-ai/QwenPaw/issues/6436)）：与今日合并的 LLM 回退（#5597）属于同一演进路线，且与大型重构 PR [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) 直接相关，预计是下阶段模型层重点。
- **按需加载技能**（[#6699](https://github.com/agentscope-ai/QwenPaw/issues/6699)）：27+ 技能时描述占 system prompt 约 25–30%（8k–10k tokens），用户明确要求改为按需加载。技能 API 重构（[#6729](https://github.com/agentscope-ai/QwenPaw/pull/6729)）可能为其铺垫基础设施。
- **Workspace 产物可视化**（[#6730](https://github.com/agentscope-ai/QwenPaw/issues/6730)）：需求为在 Console 侧栏渲染 agent 生成的 HTML 产物；PR [#6719](https://github.com/agentscope-ai/QwenPaw/pull/6719) 已实现持久化 workspace artifact 卡片，方向一致。
- **MCP 工具调用超时**（[#6724](https://github.com/agentscope-ai/QwenPaw/issues/6724)）：当前 MCP 调用无超时上限，慢服务可无限拖住 turn，建议增加 per-client 配置 + 调用级 guard。
- **渠道自动重试/健康检测**（[#6684](https://github.com/agentscope-ai/QwenPaw/issues/6684)）：社区呼声最高的渠道稳定性改进。
- **微信审批中文化**（[#6728](https://github.com/agentscope-ai/QwenPaw/issues/6728)）：审批按钮目前为英文 "Approve/Deny"，中文用户希望本地化，低成本高感知的改进。
- **Agent 级 Token 统计**（[#6392](https://github.com/agentscope-ai/QwenPaw/issues/6392)，已关闭）：用户期望细分到每次对话和 Agent 级别，并询问官方是否提供或依赖插件。

## 7. 用户反馈摘要

- **渠道稳定性是最大痛点**：Matrix 用户必须手动重存频道才能恢复连接（[#6684](https://github.com/agentscope-ai/QwenPaw/issues/6684)）；微信 iLink 的 token 消耗机制导致“输入中”状态卡死且回复被拒（[#6696](https://github.com/agentscope-ai/QwenPaw/issues/6696)）。两者均发生在真实自建部署场景。
- **beta 版本回归引起警觉**：v2.1.0b1 连续出现 python 子进程崩溃（[#6697](https://github.com/agentscope-ai/QwenPaw/issues/6697)）和浏览器工具不可用（[#6698](https://github.com/agentscope-ai/QwenPaw/issues/6698)），测试覆盖需前移到 beta 发布前。
- **技能系统 Token 开销影响实际使用**（[#6699](https://github.com/agentscope-ai/QwenPaw/issues/6699)）：用户量化了技能描述对 system prompt 的挤占，说明这是多技能/重度用户必然遇到的问题。
- **UI 交互概念令人困惑**（[#6413](https://github.com/agentscope-ai/QwenPaw/issues/6413)，已关闭）：Windows 用户认为“完整模式/精简模式”的说法不直观，建议直接用配置按钮入口取代。这是对 Console 信息架构的明确简化信号。
- **社区有二次开发诉求**：在 loongsuite 链路追踪集成（[#6627](https://github.com/agentscope-ai/QwenPaw/issues/6627)）和 token 统计插件化路径（[#6392](https://github.com/agentscope-ai/QwenPaw/issues/6392)）上均有用户提问，建议官方提供集成指引文档。

## 8. 待处理积压

- **[#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) Provider 发现/元数据/路由/Agent 控制统一重构**：7 月 21 日创建，已开放 16 天。这是与 #6436（自动模型路由）直接相关的大型 PR，可能因 scope 过大而进展缓慢，建议拆分或明确里程碑。
- **[#6436](https://github.com/agentscope-ai/QwenPaw/issues/6436) Automatic Model Routing**：开放 13 天，讨论充分但无 assignee、无明确排期，建议结合 #6302 统一规划。
- **[#6580](https://github.com/agentscope-ai/QwenPaw/pull/6580) e2e 测试（Sprint 4/5，15 个用例）**：7 月 30 日提交，已等待 7 天未合并，测试类 PR 建议加快 review 以免产生大量冲突。
- **[#6627](https://github.com/agentscope-ai/QwenPaw/issues/6627) loongsuite 集成咨询**：8 月 1 日提问，仅 2 条评论，建议给出官方文档或示例仓库形式的指引。
- **[#6684](https://github.com/agentscope-ai/QwenPaw/issues/6684) 频道重试/健康检测**：今日社区最热 Issue，涉及多频道通用能力，且影响自建 Matrix/微信等实际部署场景，建议纳入近期迭代计划。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-06

## 今日速览
过去 24 小时 Hermes Agent 项目更新量达到近期峰值：460 条 Issue 更新（新开/活跃 419，关闭 41）、500 条 PR 更新（待合并 357，已合并/关闭 143），社区参与深度与维护节奏均处于高位。今日最重要的代码进展是围绕**会话数据完整性**的一组 P0/P1 修复（SQL LIKE 通配符转义）今日集中关闭，同时 **Token 固定开销**成为社区讨论最密集、共鸣最强的话题（多条高赞 Issue 指向同一痛点）。虽暂无新版本 Release，但大量 P0/P1 修复与安全升级已提交或合入主干，预示近期可能有版本收敛。

## 项目进展

- **会话数据完整性修复今日集中关闭**：`#79722`（P0）、`#78927`（P1）与 `#78681`（P1）三个 PR 今日均处于 Closed 状态，分别覆盖 `prune/archive` 过滤器与 `cwd-prefix` 子句中的 LIKE 通配符转义。该组修复避免了 `%` 与 `_` 被当作通配符导致**错误匹配并删除会话**的严重问题——例如 `title_like='user_auth'` 原本可能匹配到 `user-auth`、`userXauth` 等非目标会话。这是本轮最值得关注的数据安全补丁。
  [#79722](https://github.com/NousResearch/hermes-agent/pull/79722) · [#78927](https://github.com/NousResearch/hermes-agent/pull/78927) · [#78681](https://github.com/NousResearch/hermes-agent/pull/78681)
- **CI 工程效率优化已提交**：`#79735` 将测试分片从 8 提升至 12，目标将 merge-gate 关键路径缩短约 33%，直指当前“其他检查 90s 内完成、测试分片却要 200-230s”的瓶颈。
  [#79735](https://github.com/NousResearch/hermes-agent/pull/79735)
- **Electron 安全升级在途**：`#79730` 将桌面端 Electron 从 40.10.x 升至 41.10.3，以修复 GHSA-9f4c-93c8-jc8g（沙箱 iframe 可绕过 allow-popups 限制）；重复的 `#79703` 今日被关闭，实际补丁尚未合入，仍在等待评审。
  [#79730](https://github.com/NousResearch/hermes-agent/pull/79730) · [#79703](https://github.com/NousResearch/hermes-agent/pull/79703)
- **`hermes update` 虚报成功问题已有修复 PR**：`#79734` 修复更新流程在 detached/pinned checkout 上报告 “Code updated!” 但实际上 HEAD 未移动的问题，与本周 `#44580` 等用户反馈相呼应。
  [#79734](https://github.com/NousResearch/hermes-agent/pull/79734)

## 社区热点

- **Token 固定开销 / API 成本**成今日最热议题：
  - `#6839`（32 评论 / 18👍）提出 **Lazy Tool Schema Loading**——目前每次 API 调用都注入全部 50+ 工具的完整 schema，固定消耗约 3,500–5,000 tokens；建议改为两阶段注入，按需加载工具。
  - `#4379`（21 评论）提供一份基于监控面板的实测分析：**每个 API 调用中约 73% 的 token 是固定开销（约 13.9K tokens）**，与 #6839 形成数据侧验证。
  两条 Issue 共同把“为本地模型减负”推向路线图优先级。
  [#6839](https://github.com/NousResearch/hermes-agent/issues/6839) · [#4379](https://github.com/NousResearch/hermes-agent/issues/4379)
- **Claude 订阅用户强烈要求 OAuth 接入**：`#25267`（48👍，15 评论）希望支持 Claude 订阅 OAuth（Codex 模式），避免“订阅费 + API 按量费”双重支出。这是当前 Issue 中赞数最高的功能请求之一。
  [#25267](https://github.com/NousResearch/hermes-agent/issues/25267)
- **网关权限模型向分级演进**：`#527`（20 评论 / 11👍）要求引入 Owner/Admin/User/Guest 四级角色，替代当前“全授权或全阻断”的二元模型，社区多提及团队/家庭共享场景下的终端访问控制诉求。
  [#527](https://github.com/NousResearch/hermes-agent/issues/527)
- **插件接口标准化讨论活跃**：`#64182`（25 评论）为 7 月社区插件扩展想法建立跟踪，配合 `#64231`（19 评论）提出的生命周期事件目录与 hook 分类标准，表明插件体系正从“堆功能”转向“定规范”。
  [#64182](https://github.com/NousResearch/hermes-agent/issues/64182) · [#64231](https://github.com/NousResearch/hermes-agent/issues/64231)

## Bug 与稳定性

按严重程度与影响面排序：

- **[P0 · 已关闭] 会话误删风险**：`#79722` 修复 `hermes sessions prune/archive` 中 LIKE 通配符注入导致的非目标会话删除问题；关联的 `#78927`、`#78681` 也一并于今日关闭。该 Bug 会静默损失会话记录，属于数据完整性级缺陷。
  [#79722](https://github.com/NousResearch/hermes-agent/pull/79722)
- **[P1 · 开放 · 已持续 13 天] TUI 核心功能不可用**：`#69592` 报告在 ambient widget dock 下 `/sessions`、`/models` 覆盖层不可见，`/reload` 静默失败，用户无法恢复会话或切换模型。目前尚无 fix PR，影响面覆盖所有采用文档推荐 TUI 模式的用户。
  [#69592](https://github.com/NousResearch/hermes-agent/issues/69592)
- **[P1 · 已关闭] 预检 token 估算错误导致压缩过早触发**：`#73298` 在 thinking 模型（Kimi K3 / Anthropic wire）上复现，`reasoning_details` 以 chars/4 粗估，使自动压缩在真实用量仅约 27% 时就被触发，白白损失上下文。该问题今日关闭，修复已落库。
  [#73298](https://github.com/NousResearch/hermes-agent/issues/73298)
- **[P2 · 已有修复 PR 待合并] 终端工具被崩溃阻断**：`#77780`（NUL 字节导致 lifecycle_guard 崩溃）与 `#77703`（ELF 二进制全路径触发同样崩溃）指向同一根因——`cron/lifecycle_guard.py` 未捕获 `ValueError: embedded null byte`。修复 PR `#78201` 已提交，覆盖这两类崩溃路径。
  [#77780](https://github.com/NousResearch/hermes-agent/issues/77780) · [#78201](https://github.com/NousResearch/hermes-agent/pull/78201)
- **[P2 · 已提交修复 PR] `read_file` 把合法 UTF-8 文本误判为二进制**：`#76886` 回归自 0.19.1——`head -c 1000` 在采样边界切断多字节字符时触发误判，使纯 Markdown 文件无法打开。
  [#76886](https://github.com/NousResearch/hermes-agent/issues/76886)
- **[P2 · 回归] 桌面端“项目”范式破坏既有工作流**：`#53004` 指出 #49037 合入后，“选择文件夹 → 在文件夹中启动会话 → 侧边栏归属显示”链路断裂，且右侧栏出现 “no project open” 误导信息。
  [#53004](https://github.com/NousResearch/hermes-agent/issues/53004)
- **[P2 · 开放]`hermes update` 虚报成功**：`#44580` 报告桌面端 rebuild 失败仅作为 warning 打印，主流程仍提示 “✓ Code updated!”；对应修复 PR `#79734` 今日已提交。
  [#44580](https://github.com/NousResearch/hermes-agent/issues/44580)

## 功能请求与路线图信号

- **Token 成本治理**明确成为下一阶段重点方向：`#6839`（Lazy Tool Schema 两阶段注入）与 `#4379`（固定开销占比实证）相互印证，且 `#4379` 作者已提供监控仪表盘作为后续优化基线。
- **Provider 订阅认证**呼声最强：`#25267`（48👍）Claude 订阅 OAuth 若落地，将复制 Codex 模式，减少自部署用户“双重付费”的阻力；这可能推动 provider 层统一支持 OAuth 订阅源。
- **网关权限分级**（`#527`）与**多租户隔离**（`#34352`，15 评论）正在并行推进，后者还指出 memory 操作绕过 hook 系统导致租户隔离必须 fork 核心，这是需要架构决策的深水区。
- **可配置性补完**：`#17565`（temperature 硬编码导致幻觉，13👍）与 `#16004`（自动继续受限于迭代预算后卡死）均在等待交互设计，倾向于把内部硬编码参数交给用户。
- **会话模型升级**：`#8457`（跨会话持久记忆 + 自动压缩）、`#54204`（创建后可迁移项目）与 `#34352`（多租户会话）共同指向会话不再是单一、短暂、孤立的单元，而需要“可检索、可移动、可隔离”的完整生命周期管理。

## 用户反馈摘要

- **成本与部署是最大痛点**：多位用户在 `#6839`、`#4379` 中表示，工具 schema 固定开销让本地模型“还没说话先烧掉 4K tokens”，`#4379` 作者更直言“73% 的调用是固定开销，这是把用户的钱直接烧掉”。
- **桌面端回归引发挫败感**：`#53004` 中出现“之前能一步完成的工作流，更新后直接不能用了”的反馈；`#60693`（缩放 110% 间歇性重置）与 `#68927`（长任务后消息不渲染）也拉低了日常体验稳定性。
- **安全与可审计诉求增强**：`#46199`（Windows 便携/隔离部署）与 `#36755`（非标准 systemd 部署误报警）反映高级用户正以 NixOS/Ansible/安全加固等企业级方式使用 Hermes，希望官方部署模型更贴近生产环境。
- **订阅用户被“双重收费”阻塞**：`#25267` 评论区呈现强烈的付费意愿与使用成本矛盾，不少用户表示“我很想用 Claude 但没法接受同时付订阅和 API”。
- **插件生态的“孤儿插件”隐忧**：`#52389`（Langfuse SDK 占位 API key 静默失败）与 `#64231` 的 hook 积压体现了用户希望“插件要么被正式收录、要么明确不维护”，而不是长期处于半可用状态。

## 待处理积压

- **`#527` 网关权限分级**（2026-03-06 开启，20 评论 / 11👍）——拖延近 5 个月，社区讨论仍在持续，且与多租户需求 `#34352` 相互依赖，建议维护者排期评估。
  [#527](https://github.com/NousResearch/hermes-agent/issues/527)
- **`#6839` Lazy Tool Schema Loading**（2026-04-09 开启，32 评论 / 18👍）——社区已给出明确设计与数据支撑，至今未进入实现阶段，且与 `#4379` 可合并为一个 roadmap 项推进。
  [#6839](https://github.com/NousResearch/hermes-agent/issues/6839) · [#4379](https://github.com/NousResearch/hermes-agent/issues/4379)
- **`#25267` Claude 订阅 OAuth**（2026-05-13 开启，48👍）——当前全仓库赞数最高的功能请求之一，长期处于 needs-decision，属于直接影响用户增长的功能。
  [#25267](https://github.com/NousResearch/hermes-agent/issues/25267)
- **`#34352` 多租户隔离**（2026-05-29 开启，15 评论）——用户已在生产环境运行 fork 修复数月，核心问题（memory 操作绕过 hook）需要架构级响应。
  [#34352](https://github.com/NousResearch/hermes-agent/issues/34352)
- **`#8457` 持久会话记忆**（2026-04-12 开启，17 评论）——“会话结束即丢上下文”是高频使用场景的主要短板，跨会话检索与自动压缩方案仍待讨论定稿。
  [#8457](https://github.com/NousResearch/hermes-agent/issues/8457)
- **`#69592` TUI overlay 不可用**（2026-07-22 开启，8 评论）——P1 影响，已第 13 天无 fix PR，是当前积压中最需要立即介入的稳定性问题。
  [#69592](https://github.com/NousResearch/hermes-agent/issues/69592)

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报（2026-08-06）

## 1. 今日速览

过去24小时内，AstrBot 项目保持高活跃度：共产生 7 条 Issue 更新（6 条新开/活跃，1 条已关闭）和 16 条 PR 更新（8 条待合并，8 条已合并/关闭），并发布了 v4.27.2 修复版本。项目在 **Telegram 代理配置、OpenAI Responses API 原生工具支持、插件重载修复** 等方向均有实质推进。社区侧，性能优化（aiocqhttp 图片发送）与配置体验（插件配置恢复默认、代理设置）是今日讨论重点。整体来看，项目迭代节奏稳定，PR 合入率健康（50%），维护者响应及时。

## 2. 版本发布

### v4.27.2（2026-08-05 发布）

**🔧 修复内容：**
- **备份下载鉴权修复**：现在接受大小写不敏感的 `Bearer` 授权头，解决部分 HTTP 客户端（如某些代理工具）小写 `bearer` 导致备份下载失败的问题。（[#9525](https://github.com/AstrBotDevs/AstrBot/issues/9525)）
- **UI 优化**：精简能力列表，移除冗余的来源徽章；优化欢迎卡片边框样式。
- **品牌更新**：使用最新的 AstrBot favicon。

**⚠️ 迁移注意事项：** 本次为补丁版本，无破坏性变更，常规升级即可。

## 3. 项目进展

今日合并/关闭的 8 个 PR 中，以下推进了实质性功能或修复：

| PR | 类型 | 说明 |
|---|---|---|
| [#9554](https://github.com/AstrBotDevs/AstrBot/pull/9554) | 功能（合并） | 在 `openai_responses` Provider 中原生支持 `web_search`、`file_search`、`code_interpreter` 等 OpenAI Responses API 内置工具，并新增 Dashboard 配置入口，回应了 [#9530](https://github.com/AstrBotDevs/AstrBot/issues/9530)。 |
| [#7786](https://github.com/AstrBotDevs/AstrBot/pull/7786) | 修复（合并） | 连续工具调用重复检测从“按工具名累计”升级为“工具名+参数指纹”，避免浏览器批量操作等场景下误报“重复调用过高”，修复 [#7784](https://github.com/AstrBotDevs/AstrBot/issues/7784)。 |
| [#7640](https://github.com/AstrBotDevs/AstrBot/pull/7640) | 功能（合并） | WebUI 仪表盘新增主题颜色自定义，提供 8 种预设配色。 |
| [#7598](https://github.com/AstrBotDevs/AstrBot/pull/7598) | 修复（合并） | 当 LLM 返回 `tool_calls` 但工具列表为空时，优雅处理而非直接结束对话，改善 Agent 稳定性。 |
| [#8259](https://github.com/AstrBotDevs/AstrBot/pull/8259) | 修复（合并） | 删除知识库时，同步清理所有会话级 `kb_config.kb_ids` 中的引用，避免残留绑定，修复 [#8251](https://github.com/AstrBotDevs/AstrBot/issues/8251)。 |
| [#9523](https://github.com/AstrBotDevs/AstrBot/pull/9523) | 修复（合并） | 修复深色模式下 WebUI 文字颜色异常（全部变为青绿色）的问题，根因为 Vue `:global()` 选择器的编译缺陷。 |
| [#9544](https://github.com/AstrBotDevs/AstrBot/pull/9544) | 修复（合并） | 紧急修复 Bug report 模板不显示分类选项的问题。 |

**总体评价：** 以上合入覆盖了 **Agent 稳定性、WebUI 体验、知识库数据一致性、平台适配** 四大方向，并在同日发布了 v4.27.2 紧承这些修复，项目迭代闭环完整。

## 4. 社区热点

### 🔥 最活跃 Issue：优化 aiocqhttp 图片发送机制（[#6717](https://github.com/AstrBotDevs/AstrBot/issues/6717)）
- **状态**：OPEN，6 条评论
- **内容**：建议取消 aiocqhttp 适配器强制将 Image/Record 消息段转为 base64 的机制，以降低大图（5MB+）的内存占用、CPU 消耗和网络传输膨胀。
- **热点分析**：该 Issue 自 3 月创建以来持续获关注，今日仍有更新且评论数最多。背后诉求是 **“性能敏感型用户对资源占用优化的迫切需求”** ，此类问题是机器人框架在大规模/多平台部署时的关键瓶颈。

### 💬 次活跃 Issue：插件源代理选项（[#9555](https://github.com/AstrBotDevs/AstrBot/pull/9555)）
- **状态**：OPEN，2 条评论
- **内容**：希望识别插件源是否为 GitHub，若是则提供单独的代理开关，避免网络问题导致插件更新失败。
- **热点分析**：与今日新开的 Telegram 独立代理 PR（[#9558](https://github.com/AstrBotDevs/AstrBot/pull/9558)）指向同一类需求——**“不同渠道的流量需要独立可控的网络路径”**。这在国内用户网络环境和多平台部署场景下是高频痛点。

## 5. Bug 与稳定性

| 严重程度 | Issue/PR | 说明 | 是否已有修复 PR |
|---|---|---|---|
| 🟠 中 | [#9552](https://github.com/AstrBotDevs/AstrBot/issues/9552) | v4.27.1 发送图片时报错：`Failed to download file from https URL host='gchat.qpic.cn' ... HTTP 400`。疑似 QQ 图片 URL 过期或鉴权问题。 | 无，待确认 |
| 🟡 低 | [#9523](https://github.com/AstrBotDevs/AstrBot/pull/9523)（已合并） | 深色模式 WebUI 文字颜色异常 | ✅ 已修复（v4.27.2 或下版） |
| 🟡 低 | [#9544](https://github.com/AstrBotDevs/AstrBot/pull/9544)（已合并） | Bug report 模板缺失分类选项 | ✅ 已修复 |

**稳定性评估：** 今日新报告 Bug 仅 1 条（#9552），且未确认是否为普遍问题。已合并的修复 PR 覆盖了 UI 显示与模板问题，整体稳定趋势向好。

## 6. 功能请求与路线图信号

| 功能请求 | 对应 Issue | 关联 PR | 信号强度 |
|---|---|---|---|
| OpenAI Responses 原生工具支持 | [#9530](https://github.com/AstrBotDevs/AstrBot/issues/9530) | [#9554](https://github.com/AstrBotDevs/AstrBot/pull/9554)（待合入已实现） | 🔥 高——功能已实现，等待合入 |
| Telegram 适配器独立代理 | 隐含于 [#7558?](https://github.com/AstrBotDevs/AstrBot/issues/7584) | [#9558](https://github.com/AstrBotDevs/AstrBot/pull/9558)（OPEN） | 🔥 高——PR 已提交，评论区暂无异议 |
| aiocqhttp 图片发送性能优化 | [#6717](https://github.com/AstrBotDevs/AstrBot/issues/6717) | 无 | 📊 中——长期讨论，暂无人认领 |
| 插件源 GitHub 代理识别 | [#9555](https://github.com/AstrBotDevs/AstrBot/issues/9555) | 无 | 📊 中——与 #9558 可协同解决 |
| 插件配置页“恢复默认”按钮 | [#9557](https://github.com/AstrBotDevs/AstrBot/issues/9557) | 无 | 🌱 低——已有 1 👍，暂无 PR |
| 唤醒词留空时插件指令直接触发 | [#9559](https://github.com/AstrBotDevs/AstrBot/issues/9559) | 无 | 🌱 低——新提交，无评论 |

**路线图研判：** OpenAI Responses 原生工具是当前最具确定性的下一版本特性（PR 已实现且关闭了对应 Issue）。网络代理能力（Telegram + 插件源）正在形成两条并行 PR，或将在 v4.28 前陆续合入。

## 7. 用户反馈摘要

- **关于重试策略（来自 #9494）**：用户反馈当 API 返回 429（配额耗尽）时，当前的重试策略反而“花费更多时间无效等待”，期望能自定义 `retryable error`。这反映了对**成本控制和异常场景精细化处理**的需求。该 Issue 今日已被关闭，但未注明是否解决，建议维护者补充关闭原因。（[#9494](https://github.com/AstrBotDevs/AstrBot/issues/9494)）
- **关于插件重载（来自 [#9556](https://github.com/AstrBotDevs/AstrBot/pull/9556)）**：社区发现当指定不存在的插件名执行 `reload` 时，`PluginManager` 会错误地触发全量重载（`reload(None)`），带来不必要的资源消耗。已提交 PR 修复并附带回归测试。
- **关于唤醒词（来自 #9559）**：部分用户在“先引用信息再跟指令”的复杂交互场景下，希望留空唤醒词时无需唤醒词/艾特即可直接触发插件指令，以简化操作步骤。这是一个交互体验优化诉求。

## 8. 待处理积压

| 项目 | 创建时间 | 最后更新 | 说明 |
|---|---|---|---|
| [#6717](https://github.com/AstrBotDevs/AstrBot/issues/6717) 优化 aiocqhttp 图片发送 | 2026-03-20 | 2026-08-05（今日） | 重要性能优化请求，讨论已久（6条评论），但无 PR 认领。建议维护者评估是否排期。 |
| [#6727](https://github.com/AstrBotDevs/AstrBot/pull/6727) 插件市场列表视图与每页数量持久化 | 2026-03-20 | 2026-08-05 | 长期 OPEN 的 PR，功能已实现（列表视图+每页数量选择器+localStorage 持久化），但已搁置 4 个月以上，需维护者决定去留。 |
| [#8362](https://github.com/AstrBotDevs/AstrBot/pull/8362) StepFun ASR Provider | 2026-05-26 | 2026-08-05 | 新增阶跃星辰语音转文字 Provider 的 PR（对应 #7774 需求），待合入已超 2 个月，建议关注。 |
| [#9294](https://github.com/AstrBotDevs/AstrBot/pull/9294) 修复命令别名被误删的参数解析 Bug | 2026-07-15 | 2026-08-05 | `CommandFilter` 存在静默参数丢失问题，PR 已提交近一个月，仍处于 OPEN 状态，建议优先评审。 |
| [#9303](https://github.com/AstrBotDevs/AstrBot/pull/9303) 删除知识库时清理关联文档与媒体 | 2026-07-17 | 2026-08-05 | 与 #8259 同源（同为知识库清理），但该 PR 更彻底（处理 `KBDocument` 和 `KBMedia` 孤儿数据），建议与 #8259 一并闭环。 |

---

**日报总结：** 项目当前处于 v4.27.2 刚发布后的稳定期，社区讨论集中于**网络代理、性能优化、配置易用性**三大主题。历史遗留的 PR 积压问题是当前健康度的主要隐患，建议维护者在下个版本周期前对 3 个长期 OPEN 的功能 PR（#6727、#8362、#9294）进行明确决策（合入/关闭/请求修改）。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*