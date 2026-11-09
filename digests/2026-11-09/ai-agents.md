# OpenClaw 生态日报 2026-11-09

> Issues: 488 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-09 01:17 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 · 2026-11-09

> 数据来源：github.com/openclaw/openclaw ｜ 统计周期：过去 24 小时

---

## 1. 今日速览

OpenClaw 今日维持高强度工程节奏：过去 24 小时共记录 **488 条 Issue 更新**（新开/活跃 364，关闭 124）与 **500 条 PR 更新**（待合并 346，合并/关闭 154），并发布 **v2026.11.2**。活跃度评级：**极高（健康偏高压）**。值得注意的是，Issue 净增约 +240 条，待合并 PR 占比高达 69%，表明提交速度明显快于评审消化速度，维护带宽存在压力。今日主线仍是**运行时稳定性**——SQLite 争用、事件循环阻塞、网关内存持续增长三大问题家族合计占据评论榜前列的一半以上。版本层面则进一步强化"隐私与信任边界"，与社区长期呼声（SecretRef、身份隔离）方向一致。

**关键数据一览**

| 指标 | 数值 | 环比信号 |
|---|---|---|
| Issue 更新 | 488（活跃 364 / 关闭 124） | 净积压上升 |
| PR 更新 | 500（待合并 346 / 已合并关闭 154） | 评审队列偏长 |
| 新版本 | 1（v2026.11.2） | 正常节奏 |
| P0 级未关闭 Issue | 3（#162211、#193962、#158592） | ⚠️ 需优先关注 |

---

## 2. 版本发布：v2026.11.2

**主题：隐私与信任边界（Privacy and trust boundaries）**

官方 Highlights 要点：

1. **诊断日志脱敏**：配置密钥（secrets）、对话内容、工具错误详情、Channel 原始载荷（payloads）不再进入诊断日志。
2. **强制信任边界**：锁定所选 Provider 与导航（navigation）信任边界。
3. **MCP 授权回收**：在 warm CLI 轮次结束后主动释放 MCP grants，避免会话外残留授权。
4. 关联 Issue/PR：#191318、#174998。

**破坏性变更与迁移提示**

- 数据侧无 schema 破坏，属**行为性收窄**：依赖诊断日志中包含完整 payload / 错误详情进行排障的运维者会发现日志信息量下降，建议改用 `openclaw doctor` 的结构化输出与显式 debug 开关。
- 若自定义脚本解析日志中提取 conversation 或 channel payload，需在升级前复测。
- MCP grants 回收对长驻 warm CLI 场景可能表现为"下一轮需重新授权"，属预期行为。

---

## 3. 项目进展

今日 **154 条 PR 完成合并/关闭**，方向高度集中于"低风险正确性修复 + 可观测性"：

**已关闭 PR（部分代表）**

- **#195488** `fix: reduce GitHub publication delays in fragmented clones` — 解决 refs 数千、pack 碎片化仓库中 Control UI 发布动作缓慢的问题（作者 @steipete）。
- **#195472** `fix(active-memory): expire recall circuit breaker on elapsed time` — 熔断器改用单调时间计时，修复 NTP 回拨导致 recall 永久停摆。
- **#194500** `fix(gateway): cancel steer document rendering on active run abort` — 用户打断时不再遗留文档抽取后台任务。

**待评审但已具备合并条件（👀 ready for maintainer look）**

- **#195493** — 进度卡更新不再误清无关 session 缓存。
- **#195483** — 修复 CJK 输入法回车误提交插件凭据草稿（IME `isComposing` 处理）。
- **#195241** — Gemini CLI 账户"显示就绪但不可用"的校验缺口（`security-sensitive-changed`，需安全评审）。
- **#194682** — 浏览器崩溃标签页改为 tab 级失败上报，不再拖累整个 browser 工具。

**Issue 侧关闭的长期条目**

- **#53408**（长对话后 write/exec 参数静默丢失，17 评论）
- **#67413**（Per-agent dreaming 配置，16 评论）
- **#165421**（Control UI context window 显示陈旧 maxTokens）
- **#184658**（Windows npm 更新后清理报错）
- **#131150**（Slack DM 重启后静默丢失）— 以 needs-info 关闭
- #55372、#137188、#126727、#168794 同期关闭

**项目前进量评估**：新增功能推进有限（仅 Slack 推理卡片、Apple ID 节点基础两项大型 PR 在排队），主要收益来自**正确性修复与内存/句柄泄漏清理**，属于"偿还技术债"的一天。整体向前推进约 **中等偏上**，但积压增长速度值得警惕。

---

## 4. 社区热点

按评论数与反应数排序：

| 排名 | 条目 | 评论 | 👍 | 核心诉求 |
|---|---|---|---|---|
| 1 | [#166634](https://github.com/openclaw/openclaw/issues/166634) 崩溃恢复后 agent 永久不可用 | 26 | 0 | 崩溃恢复路径缺乏可重试性，agent 进入永久 `UNAVAILABLE` |
| 2 | [#191944](https://github.com/openclaw/openclaw/issues/191944) macOS `gateway stop` 失败 | 25 | 0 | 进程谱系检查过于严格，无逃生口 |
| 3 | [#38327](https://github.com/openclaw/openclaw/issues/38327) Gemini Vertex 回归 | 18 | 3 | 老版本回归长期未闭环（自 2026-03 起） |
| 4 | [#67413](https://github.com/openclaw/openclaw/issues/67413) Per-agent dreaming | 16 | 5 | 全量 dreaming 触发 OOM，需要按 agent 开关 |
| 5 | [#126950](https://github.com/openclaw/openclaw/issues/126950) Telegram 不透明 callback 被丢弃 | 15 | 1 | 内联按钮回调对非插件调用方不可用 |
| 6 | [#193962](https://github.com/openclaw/openclaw/issues/193962) SQLite 探针超时修复无法抵达 | 15 | 0 | **修复存在但更新路径自身超时**，形成死锁 |
| 7 | [#164394](https://github.com/openclaw/openclaw/issues/164394) WebChat 滚动抖动 | 15 | 0 | 长 transcript 渲染稳定性 |
| 8 | [#76493](https://github.com/openclaw/openclaw/issues/76493) SecretRef 被 schema 拒绝 | 14 | 6 | 安全最佳实践与配置 schema 相冲突 |
| 9 | [#162211](https://github.com/openclaw/openclaw/issues/162211) 启动阻塞事件循环 | 14 | 0 | 40–200s 阻塞被误判为断连 → 重启风暴 |

**PR 侧热点**（评论数字段缺失，按标签与体量判断）

- **#143882** [feat(slack)](https://github.com/openclaw/openclaw/pull/143882) — 流式推理渲染为 task cards（XL，`merge-risk: compatibility`，等待维护者决策，自 9-10 挂起）。
- **#194201** [feat(apple)](https://github.com/openclaw/openclaw/pull/194201) — OpenClaw ID 节点基础（XL，`merge-risk: security-boundary / availability`，明确 draft 状态）。
- **#195484** [fix(worktrees)](https://github.com/openclaw/openclaw/pull/195484) — 恢复引用过期后遗留孤儿分支（XL）。

**背后诉求分析**：高评论 Issue 呈现两个共性——（a）**故障不可自愈**（#166634、#193962、#158592），用户愿意长时间跟帖是因为没有 workaround；（b）**安全策略与架构相冲突**（#76493、#162164），属于"想合规但被能力限制"。这两类是高价值、可被产品化吸收的信号。

---

## 5. Bug 与稳定性

按严重程度排列（P0 → P2）：

### P0（发布阻断 / 崩溃循环）

| Issue | 现象 | Fix PR 状态 |
|---|---|---|
| [#162211](https://github.com/openclaw/openclaw/issues/162211) | 启动期阻塞事件循环 40–200s，健康监控误判为断连并升级为重启循环（macOS/launchd） | ❌ 无（`no-new-fix-pr`） |
| [#193962](https://github.com/openclaw/openclaw/issues/193962) | 从 2026.10.10 无法升级到 2026.11.5-beta.1——**更新器自身运行旧版 10s 探针**，修复无法触达 | ❌ 无（相关缓解 PR #195487 已提） |
| [#158592](https://github.com/openclaw/openclaw/issues/158592) | Host 休眠唤醒后 `runtime owner was not published`，整机所有入站消息失败直至重启 | ❌ 无（需 live repro） |

### P1（数据丢失 / 崩溃 / 消息丢投）

- [#38327](https://github.com/openclaw/openclaw/issues/38327) — google-vertex/gemini-3.1-pro-preview 下所有消息报 `Cannot convert undefined or null to object`（回归，已有 linked PR）。
- [#126950](https://github.com/openclaw/openclaw/issues/126950) — Telegram `tgcb1:` 回调被 ingress 层直接丢弃（linked PR open）。
- [#117262](https://github.com/openclaw/openclaw/issues/117262) — 3 个并发写句柄导致 `state/openclaw.sqlite` 上约 33s 事件循环停顿（DEF-61）。
- [#181432](https://github.com/openclaw/openclaw/issues/181432) — 2026.10.5 基线 RSS 从 ~300MB 飙至 ~1.89GB，SQLite 事务 >1.5s。
- [#185578](https://github.com/openclaw/openclaw/issues/185578) — 堆内存下限只升不降，约 25 MiB/h 直至 V8 上限。
- [#182369](https://github.com/openclaw/openclaw/issues/182369) — 网关 RSS 每小时 +0.1 GiB，内部 `rss_threshold` 监控不触发。
- [#191847](https://github.com/openclaw/openclaw/issues/191847) — 大会话反复打死 512MB SQLite worker（`ERR_WORKER_OUT_OF_MEMORY`）。
- [#157255](https://github.com/openclaw/openclaw/issues/157255) — lane 超时后 turn claim 未释放，会话 wedge 90+ 分钟。
- [#163566](https://github.com/openclaw/openclaw/issues/163566) — `session-rebound` 卡死，`session-resource-loader` 每轮消耗 ~100s CPU。
- [#126906](https://github.com/openclaw/openclaw/issues/126906) — **`tools.deny` 禁止 write 会静默关闭记忆持久化，且 agent 仍上报成功**（静默数据丢失）。
- [#155396](https://github.com/openclaw/openclaw/issues/155396) / [#155627](https://github.com/openclaw/openclaw/issues/155627) — Codex harness 两类失败：`provenance_rejected` 丢最终答案、context-worker 超时被包装成 HTTP 408。

### P2（体验摩擦 / 状态异常）

- [#166634](https://github.com/openclaw/openclaw/issues/166634) — 崩溃恢复后 commit checkpoint 过期，agent 永久拒绝请求（今日评论第一，`not-repro-on-main`）。
- [#191944](https://github.com/openclaw/openclaw/issues/191944) — macOS `gateway stop` / `stop --force` 双双失败。
- [#164394](https://github.com/openclaw/openclaw/issues/164394) — WebChat transcript 持续亚像素抖动。
- [#194662](https://github.com/openclaw/openclaw/issues/194662) — 通知桥唤醒让 agent **虚构发送者与电话号码**并延续线程（`isolatedSession=false`）。
- [#177909](https://github.com/openclaw/openclaw/issues/177909) — transcript 幂等冲突被误判为模型失败，触发跨 provider 回退链。
- [#166526](https://github.com/openclaw/openclaw/issues/166526) — 幂等 Doctor 在大型状态需 ~473s（预算 60s）。
- [#182891](https://github.com/openclaw/openclaw/issues/182891) — prompt cache 从不复用（`cache read dropped N -> 0`）。
- [#167609](https://github.com/openclaw/openclaw/issues/167609) — Code Mode 把 guest TypeError 报成 `internal_error`。

**稳定性结论**：今日未出现新增 P0，但**存量 P0 均无修复 PR**；内存/SQLite 家族（#117262、#181432、#182369、#185578、#191847）横跨 5 个独立报告，已构成系统性问题，建议升级为专项。值得肯定的是，今日有 #195481（浏览器句柄释放）、#195298（usage 刷新致 agent 准入饥饿）、#195487（header snapshot 清理失败导致更新失败）等针对性修复进场。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 信号强度 | 判断 |
|---|---|---|---|
| **MCP env 支持 SecretRef 对象** | [#76493](https://github.com/openclaw/openclaw/issues/76493) | 👍6 / 14 评论 / 已有 needs-security-review | **高**。与 v2026.11.2 隐私主题同向，近期吸纳概率较高 |
| **Per-agent dreaming 配置** | [#67413](https://github.com/openclaw/openclaw/issues/67413) | 👍5 / 16 评论（已 stale 关闭） | 中。OOM 诉求真实，但被标记 `needs-product-decision`，短期难落地 |
| **降低工具 schema token 开销（~3,500 tok/会话）** | [#14785](https://github.com/openclaw/openclaw/issues/14785) | 12 评论 | 中高。成本敏感型用户刚需，属长期架构优化 |
| **iOS/macOS 个人身份 + 保留共享 owner** | [#162164](https://github.com/openclaw/openclaw/issues/162164) | 11 评论 | **高**。已有 XL 级 PR #194201（OpenClaw ID 节点基础）在路上，进度可见 |
| **Onboarding Wizard 强制 Memory/Embedding 步骤** | [#16670](https://github.com/openclaw/openclaw/issues/16670) | 👍2 / 10 评论 | 中。低成本高收益，易被纳入下个小版本 |
| **Review 面板 Markdown 渲染预览** | [#128090](https://github.com/openclaw/openclaw/issues/128090) | 👍4 / 10 评论 | 中。UI 侧小型增强 |
| **Android 通知 QoL（会话感知/跨设备抑制）** | [#143387](https://github.com/openclaw/openclaw/issues/143387) | 👍1 | 中低。移动端体验欠账 |
| **backup 支持 manifest 声明式跳过受保护路径** | [#107433](https://github.com/openclaw/openclaw/issues/107433) | 8 评论 / needs-security-review | 中。运维可靠性方向 |

**下一版本候选预测**：结合 v2026.11.2 的隐私主题与现有 PR，**SecretRef for MCP（#76493）** 与 **Apple 身份节点（#194201 → #162164）** 是最可能进入 2026.11.x 的两项。Slack 流式推理卡片（#143882）因标有 `compatibility` 风险且已挂起两个月，仍需产品决策。

---

## 7. 用户反馈摘要

**真实痛点（按情绪强度）**

1. **"升级修不了 Bug"的悖论**（#193962，P0）：用户明确指出修复存在于 beta，但更新器自身受同一 10s 探针限制，形成闭环死区。这是信任度杀伤最大的一类反馈。
2. **故障不可自愈**：#166634、#158592 的用户均描述了"agent 一直不可用，直到重启/重装"的长尾故障；#191944 用户反映 macOS 上 `stop --force` 也无效，缺少手工逃生口。
3. **静默失败**：#126906（禁止 write → 记忆不落盘但报告成功）、#131150（Slack DM 静默丢弃）、#194662（编造发送者）——共同指向"系统对失败保持沉默"，用户更在意可观测性而非性能。
4. **资源增长不可控**：#181432、#182369、#185578 三位不同用户（Linux ARM64 / systemd / 14.8GB 机器）独立报告同向问题，说明非环境特异性。
5. **配置与安全策略冲突**：#76493 用户抱怨"遵循密钥间接引用最佳实践反而配置被拒"，这是文档推荐与实现能力脱节的典型。

**使用场景画像**：自托管单用户网关为主（systemd / launchd），多渠道并行（Telegram、Slack 19 个账号、Discord、iMessage、macOS 原生），多 agent（3–3+）与大量 cron（约 50 个）组合，长期运行数周至数月。**这批用户对"重启可解决"的容忍度正在下降**。

**满意侧**：v2026.11.2 的隐私边界方向获得默许性支持（#76493 的高赞可视为对同一理念的延伸诉求）；ClawSweeper 的自动分级（🦞 diamond lobster 等）与复现标签被用户主动引用，说明社区已接受该治理机制。

---

## 8. 待处理积压（提醒维护者关注）

**长期未闭环的高价值 Issue**

| Issue | 首次创建 | 已挂起 | 备注 |
|---|---|---|---|
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | 2026-03-06 | **~8 个月** | P1 回归，有 linked PR 但未合并；Google Vertex 用户至今受影响 |
| [#14785](https://github.com/openclaw/openclaw/issues/14785) | 2026-02-12 | **~9 个月** | 工具 schema token 税，影响每一会话成本 |
| [#16670](https://github.com/openclaw/openclaw/issues/16670) | 2026-02-15 | ~9 个月 | Onboarding 缺 Memory 步骤 |
| [#76493](https://github.com/openclaw/openclaw/issues/76493) | 2026-05-03 | ~6 个月 | SecretRef，需安全评审推进 |
| [#107433](https://github.com/openclaw/openclaw/issues/107433) | 2026-07-14 | ~4 个月 | backup 声明式跳过 |
| [#117262](https://github.com/openclaw/openclaw/issues/117262) | 2026-08-01 | ~3 个月 | P1 SQLite 争用，zero fix PR |
| [#162211](https://github.com/openclaw/openclaw/issues/162211) | 2026-09-30 | ~40 天 | **P0 且无 fix PR**，建议设 owner |
| [#158592](https://github.com/openclaw/openclaw/issues/158592) | 2026-09-26 | ~44 天 | P0，需 live repro，缺复现资源 |

**长期挂起的 PR**

- [#143882](https://github.com/openclaw/openclaw/pull/143882) Slack 推理卡片 — 自 2026-09-10，XL + compatibility 风险，`waiting on author`。
- [#155238](https://github.com/openclaw/openclaw/pull/155238) iMessage 群组激活模式 — 自 2026-09-21，`needs proof`。
- [#166357](https://github.com/openclaw/openclaw/pull/166357) Telegram 群组提及语义 — 自 2026-10-07，`needs proof`。
- [#185548](https://github.com/openclaw/openclaw/pull/185548) CLI 外部插件全量加载（~0.5GB / 20s CPU）— 自 2026-10-27，`waiting on maintainer`。
- [#194201](https://github.com/openclaw/openclaw/pull/194201) Apple ID 节点 — 明确 draft，但已涉及 security-boundary，建议尽早指定评审人。

**治理建议**

1. 为 **P0 三项（#162211 / #193962 / #158592）设立明确 owner 与 SLA**，避免"高评论 = 已关注 = 无进展"的错觉。
2. **内存/SQLite 家族合并为单一追踪史诗（epic）**，现有 5+ 独立 Issue 分散了诊断线索（DEF-61、runtime owner 发布、write 句柄、堆下限）。
3. 待合并 PR 已达 346 条，建议引入 **按 `merge-risk` 分级的两级评审队列**，优先清空 `ready for maintainer look` 队列以缩短反馈周期。

---

*报告生成时间：2026-11-09 ｜ 数据口径：GitHub 公开事件流 24h 窗口 ｜ 评级标签沿用项目内置 ClawSweeper 体系*

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析
**数据窗口：2026-11-09 过去 24 小时**  
> 口径说明：Issue/PR 为“更新量”而非存量；DeepSeek Harness 未启用 Issues/PR，以 Discussions 计；PicoClaw 当日样本极少，判断置信度较低。

## 1. 生态全景

个人 AI 助手与自主智能体开源生态正从“单点对话能力”转向“自托管网关 + 多渠道接入 + 多 Agent 协作 + 插件/Provider 生态”的平台化竞争。头部项目活跃度极高，但普遍出现 **Review/合并吞吐不足、稳定性债务累积、P0/P1 问题缺少 fix owner** 等工程化瓶颈。安全边界、静默失败可观测性、升级恢复、存储与资源生命周期，已成为跨项目的共同技术主线。生态分层明显：OpenClaw、hermes-agent 属高流量平台型项目；Zeroclaw、AstrBot 处架构重构与版本交付期；QwenPaw 贡献活跃但合入偏慢；DeepSeek Harness 呈“讨论热、发版静默”；PicoClaw 当前低活跃。

## 2. 各项目活跃度对比

| 项目 | Issues 今日更新 | PR 今日更新 | Release | 健康度评估 |
|---|---:|---:|---:|---|
| **OpenClaw** | 488（活跃 364 / 关闭 124） | 500（待合并 346 / 合关 154） | 1（v2026.11.2） | **极高，健康偏高压**：净积压约 +240，待合并占比 69%，3 个 P0 无 fix PR |
| **Zeroclaw** | 13（活跃 12 / 关闭 1） | 50（待合并 42 / 合关 8） | 0 | **高活跃，Review 瓶颈**：v0.9.0 关键路径 PR 仍 `do-not-merge`，S2 权限/沙箱问题待处理 |
| **PicoClaw** | 0 | 1（#423 关闭） | 0 | **低活跃，信号不足**：仅一条 WIP 多 Agent PR 关闭，状态未区分 merged/closed |
| **QwenPaw** | 4 | 15（合关 0） | 0 | **中高贡献、合入停滞**：7 条当日新 PR，first-time contributor 活跃，但当日 0 合入；最长积压 84 天 |
| **hermes-agent** | 470（活跃 437 / 关闭 33） | 500（待合并 433 / 合关 67） | 0 | **极高活跃，高积压与稳定性债务**：净积压约 +404；P0 state.db 数据完整性、P1 安装/更新恢复问题突出 |
| **AstrBot** | 8 | 24（合关 5） | 0 | **高活跃，响应快但审阅吞吐承压**：#11054 当日提交 fix PR；大 PR 堆叠与两周长审阅周期并存 |
| **DeepSeek Harness** | Discussions 201；Issues/PR 未启用 | — | 0 | **讨论活跃优秀，响应偏弱**：头部 15 帖 199 评论，7/15 超 30 天未闭环；cookie 泄漏跨 rc.2/rc.3 未修 |

## 3. OpenClaw 在生态中的定位

**规模与地位：生态核心参照，平台型基础设施项目。**  
OpenClaw 当日 488 条 Issue 更新、500 条 PR 更新、1 个版本发布，流量与 hermes-agent 同处第一梯队，但相比 Zeroclaw（13/50）、AstrBot（8/24）、QwenPaw（4/15）、PicoClaw（0/1）具有明显更大的社区基数与更完整的发布节奏。其问题已进入 **SQLite 争用、事件循环阻塞、网关 RSS 增长、SecretRef、MCP 授权、身份隔离** 等系统级议题，说明项目成熟度和架构复杂度高于多数同类。

**优势：**
- **平台覆盖面最广**：自托管网关、多渠道、多 Agent、cron、MCP、身份与安全边界并行推进。
- **治理与发布机制相对成熟**：v2026.11.2 主动收窄隐私与信任边界，ClawSweeper 分级、复现标签已被社区引用。
- **问题信号质量高**：高评论 Issue 多涉及“故障不可自愈”“安全策略与架构冲突”，具备产品化吸收价值。

**技术路线差异：**
- OpenClaw 更接近 **“个人 AI 网关/运行时发行版”**：重本地状态（SQLite）、网关稳定性、SecretRef/MCP 授权、身份隔离与多渠道会话。
- Zeroclaw 当前更聚焦 **团队多用户 Dashboard/Gateway 权限与 scoped chat**；AstrBot 正进行 **Agent Runtime 与插件生态重构**；hermes-agent 也走统一网关路线，但 Windows/state.db/安装恢复债务更重；DeepSeek Harness 更偏 **桌面端 + 插件目录 + 本地模型工作流**。

**主要短板：** 高压运行。待合并 PR 346 条、占比 69%，3 个 P0 均无 fix PR，维护带宽已成为社区规模继续扩张的硬约束。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **静默失败与可观测性** | OpenClaw、QwenPaw、hermes-agent、AstrBot、DeepSeek Harness | 记忆不落盘却报成功、渠道 `enabled` 被静默重置、模型 fallback 无提示、Slack 状态静默消失、workflow 卡死无事件外抛。用户要求“失败可见、可恢复、可审计” |
| **权限/沙箱/安全边界** | OpenClaw、Zeroclaw、QwenPaw、hermes-agent、AstrBot、DeepSeek Harness | SecretRef 被 schema 拒绝、bounded delegate 写错工作区、禁用 agent 仍可运行、smart approval 自动执行破坏性 `osascript`、shell 黑名单误杀 `/tmp`、workspace-write 残留 Low IL |
| **存储/会话/资源生命周期** | OpenClaw、QwenPaw、hermes-agent、AstrBot、DeepSeek Harness | SQLite 争用、FTS 死锁、session store 全量重读、cookie 无限累积、前缀缓存失效、空 ThinkPart 落库。需要 TTL、自愈、fencing 与资源指标 |
| **多 Agent / 多用户隔离** | OpenClaw、Zeroclaw、PicoClaw、hermes-agent、AstrBot | Per-agent dreaming、non-admin scoped chat、bounded delegate 隔离、shared context/Blackboard、跨 gateway bot 协作、Subagent runtime。隔离从“功能”变为“基础设施” |
| **Provider 生态与成本可观测** | OpenClaw、QwenPaw、hermes-agent、AstrBot | Gemini Vertex 回归、模型 fallback 可见化、NagaAI/Volcengine Provider、`temperature` 可配置、`service_tier: flex` 降本、工具 schema token 开销、cron thinking_level |
| **安装/升级/跨平台恢复** | OpenClaw、Zeroclaw、QwenPaw、hermes-agent、DeepSeek Harness | 更新器自身超时导致修复无法触达、Windows 更新失败留半安装、长路径/AppContainer 权限、macOS `gateway stop` 失败、CI 三平台矩阵缺位 |
| **贡献者体验与 Review 带宽** | OpenClaw、Zeroclaw、QwenPaw、hermes-agent、AstrBot | 待合并 PR 高企、first-time contributor 等待过长、外部贡献者 PR 权限阻塞、大 PR 长期 `needs-author-action`。Review 吞吐已成为生态竞争变量 |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 通用自托管个人 AI 网关、多渠道、多 Agent、cron、MCP、隐私边界 | 高级自托管用户、长期运行个人助手用户 | 网关 + 本地 SQLite + 运行时稳定性；强隐私/信任边界与授权回收 |
| **Zeroclaw** | 团队 Dashboard、Gateway 身份与访问控制、scoped chat、多 Agent 委托 | 团队多用户部署、需要权限隔离的用户 | 追加式 session event history、operator WebSocket/RPC、v0.9.0 权限模型 |
| **PicoClaw** | 多智能体协作框架、共享上下文池、Blackboard、agent handoff | 框架实验者、多 Agent 贡献者 | 基于 provider protocol 与 model fallback routing 的协作层；当前活跃度低 |
| **QwenPaw** | QQ/微信渠道机器人、Desktop、fallback 链、cron、memory 检索 | 中文渠道自动化用户、个人助手重度用户 | 渠道配置 + Console + Desktop + scroll/memory 子系统；Windows 适配摩擦明显 |
| **hermes-agent** | 统一网关、跨平台 bot、Desktop、Kanban、插件、审批安全 | 重度个人/小团队跨平台自动化用户 | 单 gateway 汇聚 CLI/TUI/Desktop/API/bot/cron；Scope/owner/fence 权限模型改造中 |
| **AstrBot** | 插件生态、Dashboard、Agent Runtime、Provider 模板 | 插件作者、自建 Bot 用户 | 插件桥 + `astr_agent_runtime` 重构 + Provider 扩张；三段式堆叠 PR |
| **DeepSeek Harness** | 桌面端、插件目录、工作流、本地模型 QoL | 工程师、本地/混合部署用户 | Discussions 驱动、桌面生命周期与插件生态；代码经 Release 落地，当前发版静默 |

## 6. 社区热度与成熟度

**第一层：极高活跃、平台级高压运行**
- **OpenClaw**：发布节奏与治理最成熟，但积压与 P0 压力最大，处于“质量巩固 + 平台扩张”并行期。
- **hermes-agent**：社区流量与 OpenClaw 同级，但无新版本、净积压更重，P0/P1 稳定性债务更突出，处于“快速迭代但恢复能力不足”阶段。

**第二层：高活跃、架构重构/版本交付期**
- **Zeroclaw**：v0.9.0 关键路径明确，但 42 条待合并 PR 显示 Review 带宽是首要瓶颈。
- **AstrBot**：响应速度快，#11054 当日修复；但大 PR 堆叠与两周审阅周期表明进入“架构重构期”。
- **QwenPaw**：贡献侧旺盛、first-time contributor 活跃，但当日 0 合入、最长 84 天积压，成熟度受合入吞吐制约。

**第三层：讨论驱动、发版静默**
- **DeepSeek Harness**：社区自组织与报告质量高，但讨论产出未及时转化为 Release；桌面生命周期管理是系统性薄弱环节。

**第四层：低活跃、观察样本**
- **PicoClaw**：当日仅 1 条 WIP PR 关闭，无 Issue/Release，社区信号不足，暂不构成直接竞争压力。

## 7. 值得关注的趋势信号

1. **“可信可恢复”取代“功能可用”成为第一诉求。** 多个项目的高热问题不是缺功能，而是失败不可见、状态不可恢复、升级后不可自救。对开发者的启示：可观测性、恢复路径、状态校验应与功能同步设计。

2. **多 Agent/多用户隔离正在基础设施化。** OpenClaw 的 per-agent/身份隔离、Zeroclaw 的 bounded delegate/scoped chat、hermes 的 owner-role-fence、AstrBot 的 Subagent runtime，均指向同一方向：权限、身份、会话、工作区必须成为运行时一等公民。

3. **存储与资源生命周期是稳定性主战场。** SQLite 争用、FTS 死锁、session store 扩展性、cookie 泄漏、缓存前缀失效、空块落库，说明“本地优先”架构的长期运行成本被低估。TTL、自愈、fencing、资源指标应成为标配。

4. **Provider 生态竞争进入“成本与透明度”阶段。** 用户不再满足于多模型接入，而要求 fallback 可见、token/缓存可观测、`temperature`/`service_tier` 可配置、工具 schema 开销可优化。成本敏感型重度用户正在成为核心留存群体。

5. **跨平台安装/更新/沙箱是留存门槛。** Windows 半安装、长路径、AppContainer DACL、macOS launchd、state.db 误判损坏，均直接杀伤信任。跨平台质量保障不能再是 CI 的边角料。

6. **Review 带宽成为生态竞争变量。** OpenClaw 待合并 346、hermes 433、Zeroclaw 42、QwenPaw 当日 0 合入，说明社区供给旺盛但维护者吞吐有限。按 `merge-risk` 分级、明确 P0 owner/SLA、为高频贡献者设响应机制，将直接影响贡献者留存与版本节奏。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目日报 · 2026-11-09

## 1. 今日速览

- Zeroclaw 今日维持**高活跃度**：过去 24 小时 Issues 更新 13 条、PR 更新 50 条，但无新版本发布。
- PR 侧待合并 42 条、已合并/关闭 8 条，合并/关闭率约 16%，**Review 带宽是当前主要瓶颈**。
- v0.9.0 相关工作是今日主线：[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) 运行时/网关交付 tracker 与 [#12298](https://github.com/zeroclaw-labs/zeroclaw/pull/12298) scoped dashboard chat 构成关键路径。
- Issue 侧新开/活跃 12 条、关闭 1 条，**净积压增加**；另有 3 条 S2 级 Bug 待处理，涉及沙箱隔离与权限开关失效。
- 整体判断：贡献者活跃、路线图方向明确，但高 risk/XL 大 PR 堆积与 P1 修复等待合并，需关注交付节奏。

## 2. 项目进展

今日共有 8 条 PR 合并/关闭、1 条 Issue 关闭。数据仅展示评论数最多的 20 条 PR，以下为其中已关闭/合并的重点项：

| PR | 状态 | 推进内容 | 影响 |
|---|---|---|---|
| [#11921](https://github.com/zeroclaw-labs/zeroclaw/pull/11921) | CLOSED | `feat(session): implement append-only session event history`：以统一追加式会话历史替换分散的 transcript writer，记录输入、模型尝试与推理、工具执行、审批、失败、模型变更、上下文压缩及子 agent 活动 | 架构级重构，size:XL、risk:high，覆盖 core/agent/channel/runtime 等多模块，为会话可审计性与回放奠定基础 |
| [#10502](https://github.com/zeroclaw-labs/zeroclaw/pull/10502) | CLOSED | `fix(mcp): relocate tool-result images to a user message`：修复 OpenAI 兼容 provider 在 `role:"tool"` 消息中携带图片导致的 400 | 关闭 P1 Issue [#10501](https://github.com/zeroclaw-labs/zeroclaw/issues/10501)，MCP 工具结果兼容性恢复 |
| [#11406](https://github.com/zeroclaw-labs/zeroclaw/pull/11406) | CLOSED | `fix(config)!: refuse macOS broad roots in the filesystem channel`：拒绝文件系统通道监控 macOS 广域根目录 | 安全加固，带 `!` 破坏性标记；与 Windows 侧 [#11394](https://github.com/zeroclaw-labs/zeroclaw/pull/11394) 堆叠 |
| [#11268](https://github.com/zeroclaw-labs/zeroclaw/pull/11268) | CLOSED | `docs(auth): align gateway policy publication guidance`：修正网关策略发布与子系统重载边界说明 | 文档一致性 |

**整体推进评估**：会话历史架构、MCP 兼容性、文件系统通道安全三条线有实质落地；v0.9.0 的 dashboard scoped chat 仍停留在 [#12298](https://github.com/zeroclaw-labs/zeroclaw/pull/12298)（标记 `do-not-merge`），尚未形成可交付闭环。另有 4 条合并/关闭 PR 未出现在展示列表中，实际推进量高于上表。

## 3. 社区热点

PR 的评论数字段在数据中缺失，以下按 Issue 评论数排序：

| 条目 | 评论 | 类型 | 热点分析 |
|---|---|---|---|
| [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) | 16 | v0.9.0 tracker | 讨论 release 分配、剩余缺口、排序与验收证据。社区对 **v0.9.0 交付节奏和范围**高度关注，是当前路线图讨论的中心 |
| [#9872](https://github.com/zeroclaw-labs/zeroclaw/issues/9872) | 5 | P1 Bug | `bounded` 委托模式下，被委托 agent 的文件操作写入委托者工作区。触及**多 agent 沙箱隔离**这一安全底线，讨论集中在隔离边界与修复方式 |
| [#9597](https://github.com/zeroclaw-labs/zeroclaw/issues/9597) | 5 | P2 Feature | 希望 peer-agent 轮次成为**可持久、可归属的运行时任务**，而非脱离生命周期的 `process_message` 调用。反映多 agent 协作的可观测性诉求 |
| [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) | 5 | P2 Feature | 要求 CI 测试从仅 Linux 扩展到 Windows/macOS 矩阵。反映**跨平台用户**对质量保障的期待 |

**诉求归纳**：社区当前最关心三件事——v0.9.0 能否按期交付、多 agent 隔离是否可信、跨平台与可观测性是否达标。

## 4. Bug 与稳定性

按严重程度排列：

| 条目 | 严重度 | 状态 | 问题 | Fix PR |
|---|---|---|---|---|
| [#9872](https://github.com/zeroclaw-labs/zeroclaw/issues/9872) | P1 / S2 | OPEN | `bounded` delegate 目标将文件系统解析到委托者工作区，`file_write`/`file_edit`/`shell` 写错位置 | 未见直接 fix PR |
| [#10501](https://github.com/zeroclaw-labs/zeroclaw/issues/10501) | P1 | CLOSED | MCP 工具结果图片在 OpenAI 兼容 provider 返回 400 | [#10502](https://github.com/zeroclaw-labs/zeroclaw/pull/10502) 已关闭 |
| [#12289](https://github.com/zeroclaw-labs/zeroclaw/issues/12289) | S2 | OPEN | `enabled = false` 的 agent 仍可通过 operator WebSocket chat 和 restricted RPC 运行 turns | 未见 fix PR |
| [#12288](https://github.com/zeroclaw-labs/zeroclaw/issues/12288) | S2 | OPEN | **Discard all** 只清除全局横幅，保留已挂载表单的本地草稿，后续 Save 可能持久化已放弃的值 | 可能相关 [#12039](https://github.com/zeroclaw-labs/zeroclaw/pull/12039)（Save all 后刷新表单），但非直接修复 |
| [#11301](https://github.com/zeroclaw-labs/zeroclaw/pull/11301) | P1 | OPEN | agent rename 中途失败导致 CLI/gateway/RPC 状态残留，修复 PR 待合并 | 自身即 fix PR，`needs-author-action` |
| [#11313](https://github.com/zeroclaw-labs/zeroclaw/pull/11313) | P1 | OPEN | `config set/patch` 修改授权后运行中 daemon 仍执行旧策略 | 自身即 fix PR，`needs-maintainer-review` |
| [#11868](https://github.com/zeroclaw-labs/zeroclaw/pull/11868) | — | OPEN | 重复相同工具调用在 dispatch 前被拦截，closeout 保留已完成结果 | 自身即 fix PR |

**稳定性判断**：P1 层面今日有 1 条闭环（#10501），但 #9872 与两条 P1 修复 PR 仍待推进；S2 层面新增 #12289、#12288 两条，**权限开关与前端状态一致性**是新的风险点。

## 5. 功能请求与路线图信号

| 需求 | 条目 | 关联 PR / 信号 | 纳入下一版本的可能性 |
|---|---|---|---|
| 非管理员 dashboard chat | [#11984](https://github.com/zeroclaw-labs/zeroclaw/issues/11984) | [#12298](https://github.com/zeroclaw-labs/zeroclaw/pull/12298) 已实现但 `do-not-merge`，带 `release:v0.9.0` | **高**，v0.9.0 关键路径 |
| 非管理员创建自有 agent | [#12290](https://github.com/zeroclaw-labs/zeroclaw/issues/12290) | 与 identity-access 系列 PR 同主题 | 中高，可能紧随 #11984 之后 |
| IdP 不可达时保留登录 | [#12096](https://github.com/zeroclaw-labs/zeroclaw/issues/12096) | 依赖 #11984 的会话校验逻辑 | 中，属 v0.9.0 韧性补强 |
| zsh 语法级命令检查 | [#12296](https://github.com/zeroclaw-labs/zeroclaw/issues/12296) | [#11994](https://github.com/zeroclaw-labs/zeroclaw/pull/11994) 已覆盖 bash，zsh 待做 | 中，macOS 默认 shell 场景明确 |
| peer-relay 链路上限 | [#12287](https://github.com/zeroclaw-labs/zeroclaw/issues/12287) | 源自 [#9597](https://github.com/zeroclaw-labs/zeroclaw/issues/9597) 的维护者 follow-up | 中，需先落地 #9597 |
| CI 三平台矩阵 | [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) | 长期 in-progress | 中低，取决于 CI 资源 |
| Gemini speech-to-speech | — | [#10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430) 处于 `status:parking-lot` | 低，短期不进入 v0.9.0 |
| 插件 webhook RPC | — | [#11317](https://github.com/zeroclaw-labs/zeroclaw/pull/11317)/[#11320](https://github.com/zeroclaw-labs/zeroclaw/pull/11320)/[#11322](https://github.com/zeroclaw-labs/zeroclaw/pull/11322) 栈式 PR 均未合并 | 中低，依赖链较长 |

**路线图判断**：v0.9.0 大概率聚焦 **dashboard/gateway 身份与访问控制 + scoped chat**；插件 webhook、语音通道更可能进入后续版本。

## 6. 用户反馈摘要

**核心痛点**

1. **权限边界不可信**：[#9872](https://github.com/zeroclaw-labs/zeroclaw/issues/9872) 工作区串写、[#12289](https://github.com/zeroclaw-labs/zeroclaw/issues/12289) 禁用不生效，用户对“配置即约束”的信任受损，尤其影响多 agent 生产部署。
2. **非管理员权限粒度过粗**：[#12290](https://github.com/zeroclaw-labs/zeroclaw/issues/12290) 指出当前只能通过 `config_write_paths = ["agents.*"]` 放权，风险过大；[#11984](https://github.com/zeroclaw-labs/zeroclaw/issues/11984) 则反映非管理员登录后无法 chat。
3. **前端状态一致性**：[#12288](https://github.com/zeroclaw-labs/zeroclaw/issues/12288) 的 Discard all 不彻底，用户可能误保存已放弃的值，属于“看起来成功、实际未生效”的体验问题。
4. **外部依赖故障韧性**：[#12096](https://github.com/zeroclaw-labs/zeroclaw/issues/12096) 要求 IdP 不可达或返回 429/5xx 时区分“拒绝令牌”与“服务不可用”，避免故障期间强制登出。

**典型使用场景**：团队多用户 dashboard 部署、macOS 默认 zsh 环境、实时语音通道、插件 webhook 集成、多 agent 委托协作。

**满意/不满意信号**：tracker [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) 的 16 条评论与 50 条 PR 更新显示贡献者参与度高、讨论透明；但 42 条待合并 PR 与多条 `needs-author-action` 标签，可能让贡献者感到 Review 等待过长。

## 7. 待处理积压

| 条目 | 类型 | 创建时间 | 停留时长 | 标签 | 提醒 |
|---|---|---|---|---|---|
| [#10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430) | PR | 2026-08-28 | ~73 天 | `status:parking-lot`、`needs-author-action`、`size:XL` | Gemini speech-to-speech PR1 长期停放，建议给出明确结论或拆分 |
| [#9597](https://github.com/zeroclaw-labs/zeroclaw/issues/9597) | Issue | 2026-07-31 | ~101 天 | `status:in-progress`、`risk:high` | peer-agent 持久化任务，已衍生 #12287，需确认里程碑 |
| [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) | Issue | 2026-06-10 | ~152 天 | `status:in-progress` | CI 三平台矩阵长期未闭环，影响跨平台信心 |
| [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) | Issue | 2026-06-09 | ~153 天 | `type:tracker`、`release:v0.9.0` | 活跃 tracker，建议持续更新验收证据与 release 分配 |
| [#11264](https://github.com/zeroclaw-labs/zeroclaw/pull/11264) | PR | 2026-09-30 | ~40 天 | `needs-author-action`、`risk:high` | 密码认证 provider 第一片，等待作者响应 |
| [#11265](https://github.com/zeroclaw-labs/zeroclaw/pull/11265) | PR | 2026-09-30 | ~40 天 | `do-not-merge`、`risk:high` | roster 密码生命周期 CLI，依赖 #11264/#11313 |
| [#11301](https://github.com/zeroclaw-labs/zeroclaw/pull/11301) | PR | 2026-10-01 | ~39 天 | `priority:p1`、`needs-author-action` | P1 修复等待作者动作，建议优先推动 |
| [#11313](https://github.com/zeroclaw-labs/zeroclaw/pull/11313) | PR | 2026-10-01 | ~39 天 | `priority:p1`、`needs-maintainer-review` | P1 授权发布修复，等待维护者 Review |
| [#11320](https://github.com/zeroclaw-labs/zeroclaw/pull/11320) / [#11322](https://github.com/zeroclaw-labs/zeroclaw/pull/11322) | PR | 2026-10-01 | ~39 天 | `needs-author-action`、`release-gate` | 插件 webhook RPC 栈，依赖链长，需整体评估 |
| [#11984](https://github.com/zeroclaw-labs/zeroclaw/issues/11984) / [#11985](https://github.com/zeroclaw-labs/zeroclaw/issues/11985) | Issue | 2026-10-22 | ~18 天 | `release:v0.9.0` | scoped dashboard chat 及其测试任务，与 #12298 同步推进 |

**维护者关注建议**：
1. 42 条待合并 PR 与多条 `needs-maintainer-review` 表明 **Review 带宽是当前首要瓶颈**，建议按 v0.9.0 关键路径（#12298、#11313）和 P1（#11301）排优先级。
2. [#12298](https://github.com/zeroclaw-labs/zeroclaw/pull/12298) 标记 `do-not-merge` 且为 v0.9.0 关键路径，建议明确剩余阻塞项与合入时间。
3. [#10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430) 已停放超过两个月，建议给出“继续/拆分/关闭”的明确结论，避免贡献者长期等待。

---

*数据说明：PR 列表仅展示评论数最多的 20 条，剩余 30 条未包含在本次分析中；PR 评论数字段缺失，社区热点以 Issue 评论数为排序依据。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报  
**日期：2026-11-09**｜数据口径：过去 24 小时 GitHub 动态

## 1. 今日速览
- PicoClaw 过去 24 小时无新增/活跃 Issue、无新版本发布，仅 1 条 PR 状态更新，整体活跃度低。
- 唯一动态为 [#423](https://github.com/sipeed/picoclaw/pull/423) 关闭：主题为多智能体协作框架与共享上下文，涉及 Blackboard、agent handoff、discovery tools。
- 该 PR 标记为 **WIP** 且状态为 **CLOSED**，数据未区分“已合并”或“未合并关闭”，因此无法确认是否进入主线。
- 当前待合并 PR 为 0、新增 Issue 为 0，维护队列压力较小；但社区互动数据缺失，健康度呈“低活跃、队列稳定、信号不足”状态。
- 今日无 Bug、崩溃或回归报告，稳定性方面无新增风险信号。

## 2. 版本发布
今日无新版本发布（过去 24 小时 Release 数为 0），故无更新内容、破坏性变更或迁移注意事项可说明。

## 3. 项目进展
今日唯一 PR 变更为 [#423 [CLOSED] [type: enhancement] WIP: feat: base multi-agent collaboration framework & shared context](https://github.com/sipeed/picoclaw/pull/423)。
- 作者：@Leeaandrob
- 创建：2026-02-18；更新：2026-11-08
- 状态：CLOSED；评论数数据为 `undefined`；👍 0
- 内容：基于已合并的 [#213](https://github.com/sipeed/picoclaw/pull/213)（provider protocol refactor）与 [#131](https://github.com/sipeed/picoclaw/pull/131)（model fallback chain + multi-agent routing），提出多智能体协作基础框架，包括共享上下文池、Blackboard、agent handoff 与 discovery tools。
- 推进判断：若该 PR 实际已合并，将补齐多智能体协作的基础设施层；若为未合并关闭，则更多是候选方案清理或搁置。由于状态仅显示 CLOSED 且带 WIP 标记，今日可确认的项目推进幅度有限，需维护者核验关闭原因与后续拆分计划。

## 4. 社区热点
今日唯一可追踪 PR 热点为 [#423](https://github.com/sipeed/picoclaw/pull/423)。
- 评论数为 `undefined`，👍 为 0，无法量化讨论活跃度；从现有数据看，社区热度低或数据不完整。
- 背后诉求集中在多智能体协作能力：共享上下文池、智能体交接、发现工具与线程安全 Blackboard，说明贡献者关注多 Agent 路由后的协作层建设。
- 该 PR 从创建到更新跨度较长，且以 WIP 状态关闭，建议维护者补充关闭说明，避免相关设计线索丢失。

## 5. Bug 与稳定性
今日无新增 Issues 更新，未报告 Bug、崩溃或回归问题；无对应 fix PR。
- 严重程度：无新增可评估项。
- 稳定性判断：今日数据未暴露稳定性风险，但也不能据此推断长期稳定性；建议关注 [#423](https://github.com/sipeed/picoclaw/pull/423) 关闭后多智能体协作相关能力是否出现后续问题。

## 6. 功能请求与路线图信号
今日 Issues 为 0，无用户直接提出的新功能请求。路线图信号主要来自 [#423](https://github.com/sipeed/picoclaw/pull/423)：
- 功能方向：多智能体协作框架、共享上下文池、agent handoff、discovery tools、线程安全 Blackboard。
- 依赖基础：[#213](https://github.com/sipeed/picoclaw/pull/213) provider protocol refactor 与 [#131](https://github.com/sipeed/picoclaw/pull/131) model fallback chain + multi-agent routing。
- 纳入下一版本判断：方向与既有合并 PR 一致，但 #423 为 WIP 且 CLOSED，评论与合并状态不明确，短期纳入信号偏弱；建议维护者明确是否重开、拆分或转为设计文档。

## 7. 用户反馈摘要
今日无 Issues 评论可供提炼；[#423](https://github.com/sipeed/picoclaw/pull/423) 评论数为 `undefined`，无法判断用户满意/不满意。
- 仅从 PR 描述可见贡献者侧关注点：多智能体需要共享上下文、智能体交接和发现工具。
- 真实用户痛点、使用场景与反馈今日数据不足，暂无可归纳的用户声音。

## 8. 待处理积压
今日无长期未响应的 Issue 或待合并 PR 暴露；待合并 PR 为 0，Issues 更新为 0。
- [#423](https://github.com/sipeed/picoclaw/pull/423) 已关闭，不构成当前待处理积压，但其为长期 WIP PR 且以 CLOSED 结束，建议维护者记录关闭原因、后续计划或拆分项，避免多智能体协作路线图信息断层。
- 其他积压项：无。

**数据完整性说明**：PR #423 评论数显示为 `undefined`，且 CLOSED 状态未区分 merged/closed，相关热度与合并判断存在限制。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：2026-11-09**（数据统计窗口：2026-11-08 00:00 UTC 前后 24 小时）

> 数据口径说明：本文所有时间与作者均来自 GitHub API 快照；日报日期为 2026-11-09，事件时间截至 2026-11-08。

---

## 1. 今日速览

- **活跃度评级：中高（仅在于贡献侧），但审阅与合入侧为“零”**。过去 24 小时内 15 条 PR 更新、4 条 Issue 更新，但**合并/关闭 PR 数为 0**，意味着今日没有一行代码进入主线，所有 PR 均处于待合并状态。
- **社区供给旺盛**：出现 7 条当日新建 PR（#8622–#8630），其中 4 条来自 first-time-contributor（#8568、#7066、#8628、#8623），说明新贡献者持续流入。
- **Bug 与修复响应很快**：#8475（QQ 渠道 `enabled` 被静默重置）在 11-08 当天即获得同生态贡献者的修复 PR [#8630](https://github.com/agentscope-ai/QwenPaw/pull/8630)；#8103（静默模型回退）同日获得 PR [#8628](https://github.com/agentscope-ai/QwenPaw/pull/8628)，属于“报告—修复”闭环的两次正面表现。
- **风险信号**：`scroll`/`MemorySpace.search` 子系统在当天集中出现 4 条修复 PR（#8622、#8623、#8624、#8625），指向 SQLite 超时语义、turn 边界重复解析、锁错误被吞掉等一组**同源稳定性缺陷**，值得维护者按“一个缺陷族”统一审阅。
- **健康度小结**：社区贡献与问题发现健康，**合入带宽是当前项目的主要瓶颈**，8 条 PR 已等待 4 天以上，最长者已达 84 天。

---

## 2. 版本发布

**过去 24 小时无新版本发布**，`最新 Releases` 为空，本节省略。

> 备注：Issue #8627 报告的问题出现在 `2.3.0-beta.2` 版本上，说明 beta 通道仍在验证中，但今日未见 beta 补丁版本发布。

---

## 3. 项目进展

### 今日合并/关闭：0 条

严格意义上，今日**没有任何 PR 被合并或关闭**，项目主线代码未向前推进。以下为“管道中最接近可合入、且推进价值最高”的 PR，供维护者优先审阅：

| PR | 规模/状态 | 推进内容 | 关联 Issue |
|---|---|---|---|
| [#8630](https://github.com/agentscope-ai/QwenPaw/pull/8630) | size/L · OPEN | 合并已保存渠道配置与请求字段，修复“部分更新把 `enabled` 重置为 schema 默认值”的根因 | 修复 [#8475](https://github.com/agentscope-ai/QwenPaw/issues/8475) |
| [#8628](https://github.com/agentscope-ai/QwenPaw/pull/8628) | size/M · first-time-contributor | 在 chat response metadata 与 fallback event 中新增 `model_used`、`model_requested` 等 4 个字段 | 呼应 [#8103](https://github.com/agentscope-ai/QwenPaw/issues/8103) |
| [#8433](https://github.com/agentscope-ai/QwenPaw/pull/8433) | size/M · OPEN | `edit_file` 改为按字节原样写回，修复 CRLF 被转 LF、非 UTF-8 文件被破坏 | 修复 #8414、#8415 |
| [#8568](https://github.com/agentscope-ai/QwenPaw/pull/8568) | size/S · Under Review | 把临时技能目录移入目标 workspace，解决 Windows AppContainer 下 DACL 权限导致默认技能安装失败 | — |
| [#8419](https://github.com/agentscope-ai/QwenPaw/pull/8419) | size/S · OPEN | 修复 shell 自杀防护误拦 `kill $PID` 的合法 `pgrep` 工作流 | 修复 #8413 |

**推进度评估**：功能面（console 流程精简 #7307/#8434、agent 的 `/steer` 命令 #8318、cron 的 `thinking_level` 覆盖 #8626）与修复面（渠道、工具链、memory 检索）均有成熟补丁待合入。若本周完成一轮批量合入，项目在**渠道稳定性、可观测性、Windows 兼容性**三条线上将明显前移。

---

## 4. 社区热点

按“评论数 + 关联 PR 数”排序，今日社区关注度最高的三条线索：

### ① 渠道配置静默失效（热度最高）
- **Issue**：[#8475](https://github.com/agentscope-ai/QwenPaw/issues/8475) · 2 条评论 · `@gcy529`
- **配套修复**：[#8630](https://github.com/agentscope-ai/QwenPaw/pull/8630) · `@AdityaxDeore`（size/L）
- **诉求分析**：问题本质不是“配置被改”，而是**契约不一致**——部分更新只校验请求里的字段，未提交的字段被重置为 schema 默认值。用户真正的痛点在于**“无日志、无告警”**：机器人静默停止收发消息，运维侧没有任何线索定位。这类“静默失败”在个人 AI 助手场景中代价极高，因为用户往往数小时后才发现助手不工作了。

### ② 静默模型回退的可观测性
- **Issue**：[#8103](https://github.com/agentscope-ai/QwenPaw/issues/8103) · 2 条评论 · `@veveyluo`
- **配套修复**：[#8628](https://github.com/agentscope-ai/QwenPaw/pull/8628) · `@AdityaxDeore`（first-time-contributor）
- **诉求分析**：provider 401/403/超时后 daemon 会按 fallback chain 切换模型，但响应中**不携带任何“已切换”的信号**。用户 @veveyluo 描述了自己实际撞上 401 后拿到“另一个模型的回答”却毫无察觉的经历。这是典型的**信任层问题**——不是功能缺失，而是“用户不知道系统做了什么”。

### ③ Windows + beta 版本的环境适配
- **Issue**：[#8627](https://github.com/agentscope-ai/QwenPaw/issues/8627) · 1 条评论 · `@mylover19821003`
- **诉求分析**：Windows 11 Build 26300 + `LongPathsEnabled=1` + Git 2.51 的组合下，Checkpoint 服务在长路径前缀上失败，微信渠道卡在 `DEPENDENCY_ENVIRONMENT_AMBIGUOUS`。报告者提供了完整的环境矩阵，属于**高质量 issue**，但**目前尚无对应 fix PR**，是今日最需要维护者回应的空白点。

> 另：`@txohyeah` 一人当天提交 3 条 `scroll` 相关 PR（#8623/#8624/#8625），加上 `@pcbeingused333` 的 [#8622](https://github.com/agentscope-ai/QwenPaw/pull/8622)，形成今日最集中的**单人攻关集群**，建议合并审阅以避免语义冲突。

---

## 5. Bug 与稳定性

按严重程度降序排列：

### 🔴 严重 / 阻断

**#8627 — Checkpoint 服务在 Git 长路径下失败，微信渠道卡在 DEPENDENCY_ENVIRONMENT_AMBIGUOUS**
- 状态：OPEN，**无 fix PR**
- 环境：QwenPaw Desktop `2.3.0-beta.2` / Windows 11（Build 26300）
- 影响：beta 用户在 Windows 上**无法完成 checkpoint 持久化**，微信渠道初始化直接卡死，属于完全不可用级别
- 链接：https://github.com/agentscope-ai/QwenPaw/issues/8627

### 🟠 高

**#8475 — QQ 渠道 `enabled` 被静默重置为 `false`，消息收发中断**
- 状态：OPEN，**已有 fix PR [#8630](https://github.com/agentscope-ai/QwenPaw/pull/8630)**
- 触发条件：系统优化/重启（config reload）后
- 影响：QQ 渠道完全失效，且**无启动告警、无日志**
- 链接：https://github.com/agentscope-ai/QwenPaw/issues/8475

### 🟡 中高

**#8629 — 超大历史图片在每次模型调用时被重复发送；剥离重试后仍保留误导性 “Image loaded: `<name>`” 文案**
- 状态：OPEN，**无 fix PR**
- 影响：provider 因像素/尺寸限制拒绝当前媒体负载后，系统既未在重试中正确剥离图片，又向用户展示了“已加载”的假象，造成**token 与带宽的持续浪费 + 用户认知误导**
- 版本：`2.2.2.post1`
- 链接：https://github.com/agentscope-ai/QwenPaw/issues/8629

### 🟢 中（增强/可观测性）

**#8103 — daemon 静默回退到其他模型时未通知用户**
- 状态：OPEN，**部分由 PR [#8628](https://github.com/agentscope-ai/QwenPaw/pull/8628) 覆盖**（新增响应元数据），但 issue 要求的“用户可见提示”是否随之落地，需在 PR review 中确认
- 链接：https://github.com/agentscope-ai/QwenPaw/issues/8103

**稳定性聚合观察**：`scroll` 子系统今日 4 条 PR 全部围绕同一根因族——`OperationalError` 在搜索截止时间后被无条件改写为 `TimeoutError`（#8622、#8624）、turn 边界被重复解析两次（#8623）、`recall_history` 未透传 `include_turn`（#8625）。建议将其视为**一次小型稳定性专项**统一验收。

---

## 6. 功能请求与路线图信号

| 需求 | 来源 | 已有实现 PR | 纳入下一版本的可能性 |
|---|---|---|---|
| 模型回退可见化 | [#8103](https://github.com/agentscope-ai/QwenPaw/issues/8103) | [#8628](https://github.com/agentscope-ai/QwenPaw/pull/8628) | **高**——PR 已实现元数据层，若补上 UI/日志提示即可闭环；且作者为 first-time-contributor，维护者友好度关键 |
| Console 模型添加流程精简 | #4036 | [#7307](https://github.com/agentscope-ai/QwenPaw/pull/7307)、[#8434](https://github.com/agentscope-ai/QwenPaw/pull/8434) | **高**——两条 PR 已覆盖“五步变一步”的完整路径，但 #7307 已积压 74 天 |
| Agent 执行中干预（`/steer`） | #1775 | [#8318](https://github.com/agentscope-ai/QwenPaw/pull/8318) | **中高**——属于能力型新特性，语义需谨慎设计（中途纠偏 vs 破坏当前轮次） |
| Cron 任务级 `thinking_level` 覆盖 | 新需求 | [#8626](https://github.com/agentscope-ai/QwenPaw/pull/8626) | **中**——直接回应“定时管道任务为 reasoning 付全价延迟与 token”的成本痛点，价值明确但需评估配置面膨胀 |
| `recall_history` 只取行、不展开 turn | 性能需求 | [#8625](https://github.com/agentscope-ai/QwenPaw/pull/8625) | **中**——以 trailing keyword 保持兼容，变更风险低 |
| OAuth2 轮换 refresh_token 持久化 | 新需求 | [#7066](https://github.com/agentscope-ai/QwenPaw/pull/7066) | **待定**——自 8 月积压至今，长期挂起可能意味着设计分歧 |

**路线图判断**：短期内最可能进入下一个 release 的是 **渠道配置修复（#8630）+ 回退可见化（#8628）+ console 精简（#8434）** 这一“用户可感知体验”组合；`scroll` 系列属于内部稳定性，预计以 patch 形式合并。

---

## 7. 用户反馈摘要

从 4 条 Issue 的正文与评论中提炼：

**真实痛点**
1. **“静默失败”是贯穿性主题**。用户 @gcy529 明确点出 `no startup warning and no log entry`（#8475），@veveyluo 强调 `no indication that a fallback occurred`（#8103）。两个完全不同的子系统，同一种抱怨——**系统做了影响结果的事，却不告诉用户**。这是当前最一致的用户不满来源。
2. **资源浪费被用户精确量化**。#8629 用户指出超大图片在**每次**模型调用时重复发送，即使重试被剥离仍保留“Image loaded”文案，属于对 token 成本高度敏感的重度用户才会发现的问题。
3. **Windows 桌面端的环境适配仍是长尾**。#8627 与 #8568（AppContainer 下 DACL 权限）指向同一现实：Windows 的权限模型、长路径、临时目录策略与 QwenPaw 的运行时假设存在系统性摩擦。

**使用场景**
- QQ / 微信**双渠道机器人长期在线**（#8475、#8627），用户依赖“重启后自动恢复”，对配置持久化的正确性要求高；
- **多 provider fallback 链**已成生产配置（#8103），用户在 401 时依赖自动切换，但要求知情；
- **定时/管道型任务**（#8626）与**长历史记忆检索**（#8625）说明用户已从“聊天玩具”转向“自动化工作流”。

**满意侧信号**
- 贡献者愿意为当天发现的 Bug **当日提 PR**（#8630、#8628），说明对项目结构与代码可读性认可；
- #8627 报告者提供了极其详尽的环境矩阵（注册表项、Git 版本、数据目录），属于高信任度反馈。

**不满意侧信号**
- 多条修复 PR 长期停留在 OPEN（#7066 已 84 天、#7307 已 74 天），贡献者可能有“提了没人审”的挫败感——这是**贡献者留存**的隐性风险。

---

## 8. 待处理积压

以下条目按等待时长降序，**建议维护者本周优先 triage**：

| 类型 | 编号 | 标题摘要 | 作者 | 等待时长 | 状态 |
|---|---|---|---|---|---|
| PR | [#7066](https://github.com/agentscope-ai/QwenPaw/pull/7066) | 为 OAuth2 auth-code provider 持久化轮换后的 refresh_token | @suantea | **约 84 天** | OPEN · first-time-contributor · Under Review |
| PR | [#7307](https://github.com/agentscope-ai/QwenPaw/pull/7307) | Console 中 provider 配置直连模型管理（#4036） | @suantea | **约 74 天** | OPEN |
| Issue | [#8103](https://github.com/agentscope-ai/QwenPaw/issues/8103) | daemon 静默回退模型时通知用户 | @veveyluo | **约 35 天** | OPEN（已有 #8628 覆盖部分诉求） |
| PR | [#8318](https://github.com/agentscope-ai/QwenPaw/pull/8318) | 新增 `/steer` 命令实现执行中引导（#1775） | @suantea | 约 20 天 | OPEN |
| Issue | [#8475](https://github.com/agentscope-ai/QwenPaw/issues/8475) | QQ 渠道 `enabled` 被静默重置 | @gcy529 | 约 11 天 | OPEN（已有 #8630） |
| PR | [#8419](https://github.com/agentscope-ai/QwenPaw/pull/8419) | shell 自杀防护误拦 `kill $PID` | @suantea | 约 14 天 | OPEN |
| PR | [#8434](https://github.com/agentscope-ai/QwenPaw/pull/8434) | Models 页新增 Quick Add Model 按钮（#4036） | @suantea | 约 13 天 | OPEN · Under Review |
| PR | [#8433](https://github.com/agentscope-ai/QwenPaw/pull/8433) | `edit_file` 保留行尾与编码（#8414/#8415） | @suantea | 约 13 天 | OPEN |
| PR | [#8524](https://github.com/agentscope-ai/QwenPaw/pull/8524) | 桌面端用解码后的本地路径打开 workspace HTML | @wxhking | 约 7 天 | OPEN · Under Review |
| PR | [#8568](https://github.com/agentscope-ai/QwenPaw/pull/8568) | 把技能副本暂存到目标 workspace 内 | @ysf7762-dev | 约 4 天 | OPEN · first-time-contributor · Under Review |

**积压结构性问题**：
- **贡献者集中度过高**：`@suantea` 一人在积压清单中占 6 条（#7066、#7307、#8318、#8419、#8434、#8433），占今日 PR 更新的 40%。若其 PR 长期得不到审阅，存在**核心外部贡献者流失**的风险，建议维护者为其建立响应 SLA 或指定 reviewer。
- **#7066 与 #7307 的 84/74 天积压**已超出正常 review 周期，需明确回复“接受/需改/暂缓”三种结论之一，避免长期悬空。
- **#8627 是今日唯一“高严重度且零响应”的 Bug**，且涉及最新 beta 版本，建议在 24 小时内至少给出 triage 标签与复现计划。

---

*本日报由 AI 智能体基于 GitHub 公开数据自动生成，统计口径为 2026-11-08 前后 24 小时快照。所有判断仅代表对数据信号的解读，不构成对项目路线的决策建议。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报（2026-11-09）

> 数据口径：过去 24 小时 Issues 更新 470 条、PR 更新 500 条、Releases 0 个。以下分析基于展示的 30 条高评论 Issues 与 20 条高关注 PR 样本；PR 评论数字段未返回，相关判断以标签、更新时间与摘要为依据。

---

## 1. 今日速览

- 项目活跃度处于极高水平：24 小时内 Issues 更新 470 条、PR 更新 500 条，但新增/活跃 Issues 437 条、关闭仅 33 条，待合并 PR 433 条、合并/关闭 67 条，净积压压力明显。
- 今日无新版本发布，工作重心集中在统一网关后续问题、Windows 安装/会话稳定性、审批安全、平台集成修复与安全加固。
- 社区讨论最集中在 [#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（59 评论）、[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（56 评论）、[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)（40 评论）和 [#141346](https://github.com/NousResearch/hermes-agent/issues/141346)（37 评论）。
- 风险面较突出：存在 P0 级 state.db 数据完整性问题 [#147938](https://github.com/NousResearch/hermes-agent/issues/147938)，以及多条 P1 安装/更新恢复问题；统一网关与 session store 的性能和一致性问题仍在持续发酵。
- 整体健康度判断：**社区需求旺盛、修复投入活跃，但 review/merge 吞吐不足，稳定性债务与平台兼容性债务并存，建议优先处理 P0/P1 与高赞长期积压。**

---

## 2. 版本发布

今日 **0 个新版本发布**，无 Releases 数据。  
从 Issues 引用看，近期版本线索包括 v0.22.5（2026-10-23）与 v0.22.2；今日无新增版本变更说明、破坏性变更或迁移注意事项可报告。

---

## 3. 项目进展

### 今日可见的已关闭/合并 PR 与 Issue

| 条目 | 类型 | 进展与意义 |
|---|---|---|
| [#150370](https://github.com/NousResearch/hermes-agent/pull/150370) | PR，CLOSED | 修复 config migration 中 stamp-independent steps 在当前 stamp 下的执行问题，降低配置迁移/升级路径的隐性不一致。 |
| [#151534](https://github.com/NousResearch/hermes-agent/pull/151534) | PR，CLOSED | 改进 e2e-upgrade 测试：从 merge release 的第二父提交启动、无 release 时 CI 失败、oracle 可任意运行，提升升级路径测试可信度。 |
| [#149825](https://github.com/NousResearch/hermes-agent/pull/149825) | PR，CLOSED | Dependabot 批量更新 GitHub Actions 依赖，属于维护性清理。 |
| [#141917](https://github.com/NousResearch/hermes-agent/issues/141917) | Issue，CLOSED | 插件加载时 `_evict_modules` 遍历 live `sys.modules` 导致 `RuntimeError`，已关闭，插件加载稳定性得到修复。 |
| [#38989](https://github.com/NousResearch/hermes-agent/issues/38989) | Issue，CLOSED | Desktop 侧边栏 session 列表偶发遗漏/隐藏，已关闭，属于桌面端会话可见性修复。 |

### 今日推进中的重点 PR

- **安全加固**
  - [#133011](https://github.com/NousResearch/hermes-agent/pull/133011)：WhatsApp bridge API 增加 per-session token，防止本地伪造监听者读取收件箱或冒充用户。
  - [#144738](https://github.com/NousResearch/hermes-agent/pull/144738)：审批卡片防止 agent 命令闭合代码块并注入卡片文本。
  - [#148254](https://github.com/NousResearch/hermes-agent/pull/148254)：共享挂载下 control socket 权限无法保障时的 fallback。
- **稳定性与一致性**
  - [#151553](https://github.com/NousResearch/hermes-agent/pull/151553)：在 session store 自身事务中 fence 已认领 turn 的写入，针对会话写入一致性。
  - [#151577](https://github.com/NousResearch/hermes-agent/pull/151577)：pnpm 安装成功前保留旧 `node_modules`，避免构建失败后目录被清空。
  - [#151579](https://github.com/NousResearch/hermes-agent/pull/151579)：`skill_view` 超限结果改为“显式降级”，避免静默替换为通用截断块。
- **平台与交付**
  - [#151071](https://github.com/NousResearch/hermes-agent/pull/151071)：Telegram flood control 后等待窗口并原生重传文件，而不是立即发文字道歉。
  - [#151477](https://github.com/NousResearch/hermes-agent/pull/151477)：通过共享 bot 创建的命名 DM topic 保存到正确 profile。
  - [#151578](https://github.com/NousResearch/hermes-agent/pull/151578)：Docker 镜像加入 poppler-utils，修复 PDF 页面工具缺失。
- **权限/作用域架构**
  - [#141877](https://github.com/NousResearch/hermes-agent/pull/141877)、[#149200](https://github.com/NousResearch/hermes-agent/pull/149200)：将 home、secrets、terminal policy 收敛为统一 Scope，并为 turn 引入 owner/role/fence 语义，属于中长期权限模型改造。

**整体推进评估**：今日进展以维护性、安全性和平台可靠性修复为主，属于“稳态修复日”；统一网关、session store、安装更新恢复等架构级问题仍在消化，尚未看到版本级交付。

---

## 4. 社区热点

| 排名 | 条目 | 热度 | 核心诉求与背后信号 |
|---|---|---|---|
| 1 | [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) | 59 评论，P3，blocked/upstream | 外部贡献者通过 API 创建 PR 遭遇 `CreatePullRequest` 权限错误，issue 创建与 fork PR 仍可用。高评论说明**外部贡献流程存在账户级/上游权限摩擦**，且已阻塞近一个月。 |
| 2 | [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) | 56 评论，P2，跨 gateway/cron/plugins/desktop/sessions | 统一网关 #106742 合并后，CLI、TUI、Desktop、API、bot、cron、Kanban 等全部汇入单一 gateway 进程，遗留问题持续。诉求是**统一架构的 post-merge 稳定性与责任边界**。 |
| 3 | [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | 40 评论，4👍，feature | 让不同 gateway 上的 bot 跨机器、跨 owner 协作，同时不牺牲控制权。反映用户对**多智能体互操作与联邦式个人 agent**的强需求。 |
| 4 | [#141346](https://github.com/NousResearch/hermes-agent/issues/141346) | 37 评论，P3，security | smart approval 自动批准 `osascript` 命令，导致关闭用户未保存的 PowerPoint 并删除导出文件，造成不可恢复数据丢失。虽标 P3，但**影响为数据安全/信任级**，严重度标签与实际影响不匹配。 |
| 5 | [#129455](https://github.com/NousResearch/hermes-agent/issues/129455) | 26 评论，P2，test | 默认安装下 import-time PM activation 触发 `home_io_guard`，造成大范围测试失败。说明**默认安装路径与测试隔离仍不健壮**，影响贡献者体验。 |
| 6 | [#146643](https://github.com/NousResearch/hermes-agent/issues/146643) | 19 评论，P2，perf | 数千 session 的 store 上，gateway 每次变更重读全量历史，占用 1.5–2.5 CPU 核，Desktop `session.resume`/`prompt.submit` 30 秒超时。指向**会话存储扩展性瓶颈**。 |
| 7 | [#17565](https://github.com/NousResearch/hermes-agent/issues/17565) | 13 评论，17👍，feature | 希望暴露模型推理 `temperature` 配置；用户称硬编码/默认值导致严重幻觉。高赞说明**配置灵活性是明确痛点**。 |
| 8 | [#110374](https://github.com/NousResearch/hermes-agent/issues/110374) | 14 评论，16👍，P2 | Slack 状态指示在 `slack-sdk >= 3.44` 后静默失效。高赞说明**平台集成回归影响面广**。 |
| 9 | [#4256](https://github.com/NousResearch/hermes-agent/issues/4256) | 7 评论，7👍，feature | 支持通过 `config.yaml` 配置快捷键，解决 tmux/screen 冲突与可访问性问题。属于**长期未满足的 UX 基础需求**。 |

**热点分析**：今日社区情绪集中在三类：  
1. **可信安全**——审批系统不应自动执行破坏性命令；  
2. **架构稳定性**——统一网关与会话存储的扩展性、迁移后兼容性；  
3. **开放协作**——外部贡献者被权限/流程阻塞，测试环境不稳定。  
同时，高赞 feature 表明用户对配置自由度、平台集成质量有持续期待。

---

## 5. Bug 与稳定性

### P0 / 数据完整性风险

| 级别 | Issue | 问题 | 影响 | Fix PR |
|---|---|---|---|---|
| **P0** | [#147938](https://github.com/NousResearch/hermes-agent/issues/147938) | Windows 上 state.db 更新后校验把“live lock”误判为损坏，自动恢复数月前快照覆盖健康数据，并把成功恢复误报为“未完成” | 数据丢失/回滚风险，升级路径严重不可信 | 可见样本中未发现直接 fix PR |

### P1 / 安装与更新恢复

| 级别 | Issue | 问题 | 影响 | Fix PR |
|---|---|---|---|---|
| **P1** | [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) | `hermes update` / Desktop updater 失败后留下半应用安装，仅打印原始错误，无产品内恢复路径；涉及 5 种机制、15 个 Discord 线程 | Windows 用户升级失败后难以自救 | 可见样本中未发现直接 fix PR |
| **P1** | [#127284](https://github.com/NousResearch/hermes-agent/issues/127284) | `source-completion-pending` 无 TTL、无自愈；被 kill 的 tail 会永久滞留，后续每次启动都重新进入 | 安装/更新流程可被永久卡死 | 可见样本中未发现直接 fix PR |

### P2 / 稳定性与平台回归

| Issue | 问题 | 影响 | Fix PR 线索 |
|---|---|---|---|
| [#146643](https://github.com/NousResearch/hermes-agent/issues/146643) | Gateway 每次变更重读全量 session history，CPU 与 Desktop 超时随 store 规模增长 | 大规模部署不可用 | 未见直接 PR |
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) | 统一网关合并后跨组件 post-merge 问题 | CLI/Desktop/API/bot/cron 全链路受影响 | 需跨组件协调 |
| [#112961](https://github.com/NousResearch/hermes-agent/issues/112961) | Windows Desktop 主进程长 WS 会话中 `FAST_FAIL_FATAL_APP_EXIT` | 桌面端周期性崩溃 | 未见直接 PR |
| [#146955](https://github.com/NousResearch/hermes-agent/issues/146955) | v0.22.5 Windows 多 profile gateway 下 Kanban worker 已 admitted/bound 但 prompt 未送达，idle 至超时 | Kanban 任务不可执行 | 未见直接 PR |
| [#143150](https://github.com/NousResearch/hermes-agent/issues/143150) | 多 profile 从 standalone 迁移到 multiplex 后，Desktop session resume 报 `storage_unavailable` | 迁移后历史会话不可恢复 | 未见直接 PR |
| [#148958](https://github.com/NousResearch/hermes-agent/issues/148958) | Kanban gateway-owner stall 退出 1 被计为 crash，两次即阻塞卡片 | 任务被错误熔断 | 未见直接 PR |
| [#141919](https://github.com/NousResearch/hermes-agent/issues/141919) | ACP 在 `transform_llm_output` hook 下重复输出完整最终回复 | 客户端显示重复回复 | 未见直接 PR |
| [#139347](https://github.com/NousResearch/hermes-agent/issues/139347) | 有界 hosted-room transcript 驱逐 `message.user` 后仍保留 settlement 引用，触发 `DiscussionValidationError` | 讨论流程中断 | 未见直接 PR |
| [#125537](https://github.com/NousResearch/hermes-agent/issues/125537) | `hermes pm gc` 以执行快照的 install key 计量，静默不回收任何 generation | 依赖清理失效 | 未见直接 PR |
| [#135977](https://github.com/NousResearch/hermes-agent/issues/135977) | Windows 上 `hermes acp` 的 `session/new` 因 `subprocess.run(timeout=5)` 被孙进程持有 stdout 永久挂起 | ACP 不可用 | 未见直接 PR |
| [#147839](https://github.com/NousResearch/hermes-agent/issues/147839) | 单次 20s `worker_receipt_timeout` 污染 store 并毁掉整个 turn，用户只看到 “No reply” | 会话持久化失败 | 未见直接 PR |
| [#95670](https://github.com/NousResearch/hermes-agent/issues/95670) | Discord handoff 直接创建 thread 时未显式指定 type，默认 private_thread | 线程类型错误 | 未见直接 PR |
| [#150369](https://github.com/NousResearch/hermes-agent/issues/150369) | iPhone Safari Webapp 麦克风按钮需双击启停，AudioContext resume 受用户手势限制 | 移动端录音体验受损 | 未见直接 PR |
| [#131630](https://github.com/NousResearch/hermes-agent/issues/131630) | `hermes doctor` 因检查 `install.json` 将活跃 source install 误报为 “Stale channel record” | 诊断误导 | 未见直接 PR |
| [#110374](https://github.com/NousResearch/hermes-agent/issues/110374) | Slack `agents.sessions.setStatus` 在 slack-sdk >= 3.44 拒绝 free-text/empty status，状态指示静默消失 | Slack 用户体验回归，16👍 | 未见直接 PR |

### P3 / 安全与集成问题

| Issue | 问题 | 备注 |
|---|---|---|
| [#141346](https://github.com/NousResearch/hermes-agent/issues/141346) | smart approval 自动批准 `osascript`，导致用户未保存 PPT 被关闭、导出被删 | **标签 P3 但实际为数据丢失级安全事件**；相关审批加固 PR [#144738](https://github.com/NousResearch/hermes-agent/pull/144738) 针对卡片注入，非同一问题 |
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) | API 创建 PR 遭遇 `CreatePullRequest` 权限错误 | blocked/upstream，外部贡献受阻 |
| [#76175](https://github.com/NousResearch/hermes-agent/issues/76175) | 原生 iMessage poll 投票被静默丢弃，spectrum-ts 8 pollSchema 要求非空 title | 平台适配问题 |
| [#145314](https://github.com/NousResearch/hermes-agent/issues/145314) | 静默 cron script 每次触发留下永久空 session | 会话垃圾累积 |
| [#80280](https://github.com/NousResearch/hermes-agent/issues/80280) | Kanban 超时/被替代 worker 的 descendant 进程组仍存活，可能与新 worker 并发修改同一 worktree | 进程生命周期风险 |

**稳定性判断**：今日 Bug 集中在 **Windows 安装/更新、state.db 完整性、gateway/session 扩展性、Kanban worker 生命周期、平台适配** 五个方向。P0/P1 均未在可见样本中看到直接 fix PR，建议维护者优先 triage。

---

## 6. 功能请求与路线图信号

| 需求 | Issue/PR | 社区信号 | 纳入下一版本的可能性判断 |
|---|---|---|---|
| 可配置 `temperature` | [#17565](https://github.com/NousResearch/hermes-agent/issues/17565) | 17👍，13 评论，自 2026-04-29 长期开放 | **较高**。实现成本相对低，用户痛点明确（幻觉/确定性），但涉及 agent 推理默认策略，需要决策。 |
| 可配置快捷键 | [#4256](https://github.com/NousResearch/hermes-agent/issues/4256) | 7👍，自 2026-03-31 | **中等偏高**。UX/可访问性需求清晰，但需处理 CLI/TUI 键位冲突与配置 schema。 |
| 多用户偏好记忆隔离 | [#17254](https://github.com/NousResearch/hermes-agent/issues/17254) | 7 评论，群组/频道场景 | **中期**。需 memory 工具支持 `user_id` 分区与存储隔离，涉及数据模型变更。 |
| Bot 跨 gateway 协作 | [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | 40 评论，4👍 | **长期/架构级**。涉及跨机器、跨 owner 控制权与信任模型，非单版本可完成。 |
| OpenAI/Gemini `service_tier: flex` | [#37059](https://github.com/NousResearch/hermes-agent/pull/37059) | 自 2026-06-01，已 rebase 到当前 main | **中等偏高**。可带来约 50% 成本节省，但需覆盖 OpenAI/Gemini 多 provider 路径与静默丢弃问题。 |
| 结构化 memory prefetch | [#92118](https://github.com/NousResearch/hermes-agent/pull/92118) | 自 2026-08-22 | **中等**。provider-neutral 侧信道，保持现有格式化契约不变，风险可控但需 review 带宽。 |
| 统一 Scope / owner-role-fence | [#141877](https://github.com/NousResearch/hermes-agent/pull/141877)、[#149200](https://github.com/NousResearch/hermes-agent/pull/149200) | 权限模型重构，stacked PR | **中期**。涉及 home/secrets/terminal policy 与 turn fence，属于平台治理基础。 |
| 插件目录更新（Smart Dictation、Super Artifacts） | [#151371](https://github.com/NousResearch/hermes-agent/pull/151371)、[#150151](https://github.com/NousResearch/hermes-agent/pull/150151) | 社区插件生态 | **较高**。目录类变更通常可较快合入，体现插件生态活跃。 |
| Telegram 文件重传、Docker PDF、cron topic 归属 | [#151071](https://github.com/NousResearch/hermes-agent/pull/151071)、[#151578](https://github.com/NousResearch/hermes-agent/pull/151578)、[#151477](https://github.com/NousResearch/hermes-agent/pull/151477) | 平台可靠性修复 | **较高**。范围明确、用户可感知，适合进入近期补丁版本。 |

**路线图信号**：短期更可能落地的是**安全加固、平台集成修复、构建/测试可靠性、配置迁移修正**；中期看 **Scope/权限模型、service_tier 成本优化、memory prefetch**；长期则是 **多用户记忆隔离与跨 gateway bot 协作**。

---

## 7. 用户反馈摘要

从 Issues 评论与摘要中可提炼出以下真实痛点与使用场景：

1. **Windows 是当前最集中的痛点平台**
   - 更新失败后半应用安装、无恢复路径：[#125437](https://github.com/NousResearch/hermes-agent/issues/125437)
   - `source-completion-pending` 永久卡死：[#127284](https://github.com/NousResearch/hermes-agent/issues/127284)
   - Desktop 长 WS 会话崩溃：[#112961](https://github.com/NousResearch/hermes-agent/issues/112961)
   - state.db 误判 live lock 为损坏并回滚旧快照：[#147938](https://github.com/NousResearch/hermes-agent/issues/147938)
   - Kanban worker prompt 未送达：[#146955](https://github.com/NousResearch/hermes-agent/issues/146955)
   - ACP `session/new` 永久挂起：[#135977](https://github.com/NousResearch/hermes-agent/issues/135977)

2. **用户对“智能审批”的信任受损**
   - [#141346](https://github.com/NousResearch/hermes-agent/issues/141346) 中 agent 通过 `osascript` 操作用户正在运行的 PowerPoint，关闭未保存文件并删除导出，造成不可恢复数据丢失。用户核心诉求不是“少审批”，而是**审批系统必须识别破坏性操作并避免自动放行**。

3. **统一网关方向被认可，但 post-merge 稳定性不足**
   - [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 汇集 CLI、Desktop、API、bot、cron、Kanban、Group Chats 等多组件问题，说明用户已在实际使用统一网关，但**迁移后的路由、会话恢复、消息投递**仍有明显摩擦。

4. **大规模 session store 下性能不可接受**
   - [#146643](https://github.com/NousResearch/hermes-agent/issues/146643) 中数千 session 即导致 gateway 占用 1.5–2.5 CPU 核、Desktop 请求 30 秒超时。用户场景是**长期使用、会话历史持续增长的个人 agent**，不是短生命周期 demo。

5. **平台集成回归影响日常使用**
   - Slack 状态静默失效且高赞：[#110374](https://github.com/NousResearch/hermes-agent/issues/110374)
   - iMessage poll 投票丢失：[#76175](https://github.com/NousResearch/hermes-agent/issues/76175)
   - Telegram flood 后文件被文本道歉替代：[#151071](https://github.com/NousResearch/hermes-agent/pull/151071) 正在修复
   - Discord handoff thread 类型错误：[#95670](https://github.com/NousResearch/hermes-agent/issues/95670)
   - iPhone Safari 麦克风双击：[#150369](https://github.com/NousResearch/hermes-agent/issues/150369)

6. **配置自由度与多用户场景存在明确缺口**
   - `temperature` 不可配：[#17565](https://github.com/NousResearch/hermes-agent/issues/17565)
   - 快捷键硬编码：[#4256](https://github.com/NousResearch/hermes-agent/issues/4256)
   - 群组/频道下多用户偏好混在一起：[#17254](https://github.com/NousResearch/hermes-agent/issues/17254)

7. **外部贡献者体验受权限与测试环境阻塞**
   - [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) 账户级 PR 创建权限错误，59 条评论仍 blocked；
   - [#129455](https://github.com/NousResearch/hermes-agent/issues/129455) 默认安装下测试大面积失败，影响贡献门槛。

**满意/不满意信号**：用户对统一网关、插件生态、跨平台 bot 的方向有持续投入意愿；不满意主要集中在**升级不可恢复、数据安全、Windows 稳定性、平台回归静默失败**。高赞 Issue 多集中在“配置能力”和“集成可靠性”，说明需求已从“能用”转向“可控、可信、可扩展”。

---

## 8. 待处理积压

以下为长期开放、讨论/反应较高或严重度较高、建议维护者优先关注的条目：

| 条目 | 创建时间 | 积压原因/风险 | 建议 |
|---|---|---|---|
| [#4256](https://github.com/NousResearch/hermes-agent/issues/4256) 快捷键配置 | 2026-03-31 | 7👍，UX/可访问性长期需求 | 评估配置 schema，纳入 CLI/TUI 路线图 |
| [#17254](https://github.com/NousResearch/hermes-agent/issues/17254) 多用户偏好记忆 | 2026-04-29 | 涉及 memory 数据模型隔离 | 明确是否进入中长期路线图 |
| [#17565](https://github.com/NousResearch/hermes-agent/issues/17565) temperature 配置 | 2026-04-29 | 17👍，高赞但长期未落地 | 优先给出设计决策或拒绝理由 |
| [#76175](https://github.com/NousResearch/hermes-agent/issues/76175) iMessage poll 投票丢失 | 2026-08-01 | 平台适配 + 上游 schema | 确认是否等待 upstream 或本地兼容 |
| [#80280](https://github.com/NousResearch/hermes-agent/issues/80280) Kanban 进程组残留 | 2026-08-06 | 并发修改 worktree 风险 | 与 Kanban worker 生命周期修复合并处理 |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) 跨 gateway bot 协作 | 2026-08-29 | 40 评论，架构级 | 拆分为可落地子问题，避免长期悬空 |
| [#110374](https://github.com/NousResearch/hermes-agent/issues/110374) Slack 状态失效 | 2026-09-13 | 16👍，平台回归 | 适配 slack-sdk >= 3.44，补回归测试 |
| [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) 更新失败无恢复 | 2026-09-27 | **P1**，Windows 高发 | 优先设计产品内恢复/回滚路径 |
| [#127284](https://github.com/NousResearch/hermes-agent/issues/127284) source-completion-pending 无 TTL | 2026-09-29 | **P1**，可永久卡死 | 增加 TTL/自愈与启动清理 |
| [#129455](https://github.com/NousResearch/hermes-agent/issues/129455) 默认安装测试失败 | 2026-09-30 | 影响贡献者/CI | 修复 home_io_guard 与默认安装路径隔离 |
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) API 创建 PR 权限错误 | 2026-10-03 | 59 评论，外部贡献阻塞 | 需 GitHub 权限/上游支持，建议明确 owner 与 workaround |
| [#131630](https://github.com/NousResearch/hermes-agent/issues/131630) doctor 误报 stale channel | 2026-10-02 | 诊断误导 | 修正 install.json 检查逻辑 |
| [#147938](https://github.com/NousResearch/hermes-agent/issues/147938) state.db 误判损坏 | 2026-11-02 | **P0**，数据完整性 | 最高优先级 triage，确认是否已有内部修复 |
| [#37059](https://github.com/NousResearch/hermes-agent/pull/37059) service_tier flex | 2026-06-01 | 长期 PR，已 rebase | 安排 review，拆分 provider 变更降低风险 |
| [#92118](https://github.com/NousResearch/hermes-agent/pull/92118) memory 结构化 prefetch | 2026-08-22 | 长期 PR | 明确是否接受 side-channel 设计 |

---

## 总结

hermes-agent 在 2026-11-09 保持**极高社区活跃度与持续修复投入**，安全加固、平台可靠性、构建/测试改进均有实质 PR 推进。但项目同时面临**净积压扩大、review 吞吐不足、Windows/安装/state.db 稳定性债务、统一网关 post-merge 问题**等压力。当前最需要维护者关注的是：

1. **P0 [#147938](https://github.com/NousResearch/hermes-agent/issues/147938) 数据完整性问题**；
2. **P1 [#125437](https://github.com/NousResearch/hermes-agent/issues/125437)、[#127284](https://github.com/NousResearch/hermes-agent/issues/127284) 安装/更新恢复问题**；
3. **统一网关与会话存储的扩展性/迁移兼容性**；
4. **高评论/高赞长期积压**，尤其是 [#131859](https://github.com/NousResearch/hermes-agent/issues/131859)、[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)、[#17565](https://github.com/NousResearch/hermes-agent/issues/17565)、[#110374](https://github.com/NousResearch/hermes-agent/issues/110374)。

若能在下一补丁版本前完成 P0/P1 triage，并批量清理依赖/平台修复 PR，项目健康度将明显改善。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报

**日期：2026-11-09** ｜ 数据窗口：过去 24 小时 ｜ 数据来源：GitHub (AstrBotDevs/AstrBot)

---

## 1. 今日速览

过去 24 小时项目维持**高活跃度**：Issues 更新 8 条、PR 更新 24 条，PR 流量是 Issue 的 3 倍，说明当前处于**集中开发/审阅期**而非问题爆发期。核心维护者 @Soulter 连续推送 #11051→#11052→#11053 三段式堆叠 PR，将原 #10986 的大型 Agent Runtime 重构拆分为可审阅单元，是今日最重要的架构信号。社区侧 #11050（插件更新检测失效）以 3 条评论成为最热议题，直指插件市场生态链路。Bug 侧出现一个**成本相关的隐性回归**（#11054 群聊共享会话前缀缓存失效），并已在数小时内由 #11055 提交修复，响应闭环速度快。整体健康度良好，无新版本发布，无崩溃级事故。

---

## 2. 版本发布

本周期**无新版本发布**（0 个），故省略。

---

## 3. 项目进展

今日合并/关闭 5 条 PR，均为稳定性与体验向修复，其中 4 条可见：

| PR | 类型 | 推进内容 | 关联 |
|---|---|---|---|
| [#10792](https://github.com/AstrBotDevs/AstrBot/pull/10792) | fix | 编辑 Provider 配置时保留模型能力徽章与上下文上限；跨 Provider 抓取增加回归覆盖 | 修复 [#10689](https://github.com/AstrBotDevs/AstrBot/issues/10689) |
| [#10903](https://github.com/AstrBotDevs/AstrBot/pull/10903) | fix | QQ 按钮回调恢复图片/文件附件，复用群聊/C2C/频道媒体发送路径 | — |
| [#10794](https://github.com/AstrBotDevs/AstrBot/pull/10794) | fix | EPUB 解析保留页内锚文本（如 `离线备份`），修正 `#` 脚注误匹配 | — |
| [#11046](https://github.com/AstrBotDevs/AstrBot/pull/11046) | feat | 通过插件桥向 Plugin Views 暴露 `themeColors.primary/secondary`，解决 iframe 隔离下的主题色缺失 | — |

**进展评估**：今日合并项集中在「细节正确性」层面（配置元数据保真、多媒体通道补齐、解析器边界、插件 UI 桥接），单体影响有限但覆盖面广，属于典型的**债务偿还期**。真正的结构性推进来自尚未合并的 Agent Runtime 三段式重构（见下节），一旦落地将影响后续版本的核心架构。

> ⚠️ 注意：#10792、#10794 均创建于 2026-10-26，至 11-08 才关闭，**PR 平均审阅周期约 2 周**，建议维护团队关注合并吞吐。

---

## 4. 社区热点

按评论数排序，今日讨论焦点如下：

**① [#11050](https://github.com/AstrBotDevs/AstrBot/issues/11050) 插件无法检测到新版本（3 条评论，最热）**
插件市场新版本审核已通过，但用户端插件不提示升级。这是**插件分发链路的端到端信任问题**——审核通过 ≠ 用户可达，涉及版本元数据同步、客户端缓存或更新检查逻辑。诉求明确：插件作者需要可预期的发布生效时延。

**② [#11028](https://github.com/AstrBotDevs/AstrBot/issues/11028) Telegram 媒体上传超时未暴露（2 条评论，已有 PR）**
用户 @skyirm 提供了完整的调用栈定位（`TimedOut <- httpx.WriteTimeout <- httpcore.WriteTimeout`），指出 `ApplicationBuilder()` 未暴露 `media_write_timeout`，弱上行网络下大视频必然 20 秒失败。**技术论证质量高**，属高质量 Issue 范例。已由 [#11043](https://github.com/AstrBotDevs/AstrBot/pull/11043) 部分响应（补充超时成因日志），但**配置项暴露本身尚未解决**。

**③ [#11038](https://github.com/AstrBotDevs/AstrBot/issues/11038) 新增 NagaAI Provider 模板（2 条评论）**
请求将 NagaAI（OpenAI 兼容、聚合多厂模型、支持推理）加入 Provider 模板列表，与 302.AI、TokenPony、Compshare 并列。反映用户对**聚合型 Provider 一站式接入**的持续需求。

**④ [#10689](https://github.com/AstrBotDevs/AstrBot/issues/10689) 模型配置预览图标被重置（已关闭，2 条评论）**
由 #10792 闭环，属"报告—修复"标准样本。

**PR 侧焦点**：@Soulter 的 [#11051](https://github.com/AstrBotDevs/AstrBot/pull/11051) / [#11052](https://github.com/AstrBotDevs/AstrBot/pull/11052) / [#11053](https://github.com/AstrBotDevs/AstrBot/pull/11053) 三段式堆叠虽评论数为空，但**体量与影响面最大**：将内置 Agent builder/tools/computer-use 迁入 `astr_agent_runtime`，引入 runtime session、`ctx.agent.run_turn()`、typed runtime output，并新增 profile 级 Subagent 管理 UI（配置 → AI → Capabilities → Subagents）。这实质是 #10986 的**可审阅化拆分**，是下一版本的头号路线图信号。

---

## 5. Bug 与稳定性

按影响面与严重程度降序：

**🔴 高｜[#11050](https://github.com/AstrBotDevs/AstrBot/issues/11050) 插件更新检测失效**
插件市场审核通过后用户端无升级提示，直接阻断插件迭代分发。**当前无 fix PR**，需优先确认是服务端元数据、客户端版本比对还是缓存层问题。影响所有插件作者与终端用户。

**🟠 中高｜[#11054](https://github.com/AstrBotDevs/AstrBot/issues/11054) 逐发言人权限提示污染共享 system prompt，导致前缀缓存整轮失效**
场景：`computer_use_runtime = local` + 群聊不隔离会话 + OpenAI 兼容自动前缀缓存（DeepSeek）。`LOCAL_NETWORK_POLICY_NOTICE` 按发言人权限动态插入 system_prompt 中段，管理员与普通成员交替发言即导致**每轮缓存 miss**，直接抬高推理成本与延迟。属**隐性成本回归**，用户难以自查。✅ **已有 fix PR [#11055](https://github.com/AstrBotDevs/AstrBot/pull/11055)**（将策略移出共享前缀），当日提交，响应迅速。

**🟠 中｜[#11039](https://github.com/AstrBotDevs/AstrBot/issues/11039) shell 黑名单对 `rm -rf` 做裸子串匹配，误杀 /tmp 清理**
`astrbot_execute_shell` 将 `/tmp` 下的正常清理命令与 `rm -rf /` 同等对待，影响 v4.29.4 及之后。✅ **已有 fix PR [#11045](https://github.com/AstrBotDevs/AstrBot/pull/11045)**（解析 token、逐目标校验、放行 `/tmp`、`/var/tmp`、cwd 内路径，保留拒绝项）。

**🟡 中低｜[#11033](https://github.com/AstrBotDevs/AstrBot/issues/11033) `reasoning_content` 为空串仍生成空 ThinkPart 并落库**
`data_v4.db` 的 assistant 消息普遍以空 `think` 块开头，个别轮次模型会复制该结构。属**数据污染 + 上下文噪声**，长期累积可能影响模型行为。**无 fix PR**，建议尽快处理，改动面应较小（空串判空）。

**🟢 已关闭｜[#11035](https://github.com/AstrBotDevs/AstrBot/issues/11035) Firefox WebChat 向上滚动回弹**
定位到 `markstream-vue` 的 scoped 样式，长会话与表格消息更明显，Chrome 正常。已关闭，浏览器兼容性噪声。

**🟢 已关闭｜[#10689](https://github.com/AstrBotDevs/AstrBot/issues/10689) 编辑模型配置重置预览图标** — 由 #10792 修复。

**另需关注（PR 侧防御性修复）**：
- [#11044](https://github.com/AstrBotDevs/AstrBot/pull/11044) Telegram 群组流首段 `msg` 未绑定即读 `message_id`，可能抛 `UnboundLocalError`；断流后还可能误编辑上一段消息。属于**潜在崩溃路径**，建议优先合并。
- [#11042](https://github.com/AstrBotDevs/AstrBot/pull/11042) 本地 HTTP 协议错误（如非法 URL scheme）被误判为可重试，导致无意义重试等待。
- [#10811](https://github.com/AstrBotDevs/AstrBot/pull/10811) 备份列表并发删除触发 `FileNotFoundError`，单行失败拖垮整页。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 对应 PR | 纳入判断 |
|---|---|---|---|
| Telegram 媒体上传超时可配置 | [#11028](https://github.com/AstrBotDevs/AstrBot/issues/11028) | [#11043](https://github.com/AstrBotDevs/AstrBot/pull/11043)（仅补日志） | **短期可纳入**：#11043 只解决可观测性，`media_write_timeout` 配置暴露仍待补，维护者已回帖要求，跟进意愿明确 |
| NagaAI Provider 模板 | [#11038](https://github.com/AstrBotDevs/AstrBot/issues/11038) | 无 | **中期**：模板类改动成本低，但需评估聚合 Provider 的稳定性与合规；与 #10886、#11047 同属 Provider 扩张潮 |
| Volcengine 豆包 Embedding | — | [#10886](https://github.com/AstrBotDevs/AstrBot/pull/10886) | **较可能纳入**：知识库多模态 embedding，补齐国内云厂商矩阵，已挂 10 天待审 |
| Decisions 动态模型目录 + 多模态 | — | [#11047](https://github.com/AstrBotDevs/AstrBot/pull/11047) | **需维护者裁决**：作者明示与 #10968 为**互斥备选方案**（同名适配器不可共存），属路线选择而非叠加 |
| SpecStream 搜索 Provider | — | [#11037](https://github.com/AstrBotDevs/AstrBot/pull/11037) | **谨慎**：作者为 SpecStream 员工，自述"全球最准"并附自测榜单，需独立验证，注意供应商中立性 |
| 插件市场按平台筛选 | — | [#11049](https://github.com/AstrBotDevs/AstrBot/pull/11049) | **易纳入**：Closes #10484，纯前端多选筛选，风险低、体验收益直接 |
| Subagent 体系与 Agent Runtime | — | [#10986](https://github.com/AstrBotDevs/AstrBot/pull/10986) → [#11051](https://github.com/AstrBotDevs/AstrBot/pull/11051)/[#11052](https://github.com/AstrBotDevs/AstrBot/pull/11052)/[#11053](https://github.com/AstrBotDevs/AstrBot/pull/11053) | **下一版本主线**：涉及模块重组 + runtime session + 可复用 AgentConfig，是三段式堆叠的核心目标 |

**路线图判读**：项目正沿三条线并行——**① Agent 架构重构**（Soulter 堆叠 PR）、**② Provider 生态扩张**（NagaAI/Volcengine/Decisions）、**③ Dashboard 体验打磨**（#11046/#11049）。架构线权重最高，Provider 线存在方案冲突需收敛。

---

## 7. 用户反馈摘要

- **插件作者的发布焦虑**（#11050）：审核通过却不生效，缺少可观测的"发布→生效"链路反馈，是插件生态最敏感的信任点。
- **弱网/自建服务器用户的媒体痛点**（#11028）：自建 Bot 常部署在上行带宽有限的 VPS 上，20 秒硬超时不可调，且失败日志缺少"卡在传输阶段还是响应阶段"的信息，排障困难——用户已自行完成根因定位，说明**默认配置对边缘部署场景不友好**。
- **成本敏感的高级用户**（#11054）：能精确识别"前缀缓存失效"并追溯到 system prompt 中段插入，反映核心用户群对**推理成本与缓存命中率**高度敏感，此类问题会显著影响留存。
- **安全策略的误伤**（#11039）：沙箱黑名单采用裸子串匹配，安全性与可用性失衡，用户对"安全但不可用"的容忍度低。
- **前端兼容性**（#11035）：Firefox 用户遭遇滚动回弹，暴露 Vue 组件 scoped 样式的跨浏览器验证缺口。
- **满意度信号**：多条 Issue 报告者提供了截图、调用栈、SQLite 数据实证与版本号，**Issue 质量整体偏高**，说明用户群体技术素养好、对项目有投入意愿；同时 #11054 报出后当日即有 PR，正向反馈明确。

---

## 8. 待处理积压

以下条目等待时间较长或影响面较大，建议维护者优先排期：

| 条目 | 创建时间 | 停留时长 | 风险提示 |
|---|---|---|---|
| [#10992](https://github.com/AstrBotDevs/AstrBot/pull/10992) fix: 保留群聊中 @机器人 的模型上下文 | 2026-11-04 | 5 天 | 群聊场景模型无法感知"被 @"，方案采用 `⚠️[DIRECTED AT YOU]` 标记且不恢复原始文本，兼容性设计较好，建议尽快评审 |
| [#10811](https://github.com/AstrBotDevs/AstrBot/pull/10811) fix(dashboard): 备份列表并发删除容错 | 2026-10-27 | 12 天 | 已定位根因（`list_backups` 遍历期间文件消失），修复范围小，长期挂起收益比低 |
| [#10886](https://github.com/AstrBotDevs/AstrBot/pull/10886) feat: Volcengine Embedding | 2026-10-30 | 10 天 | 国内知识库用户刚需，需确认 Ark 与 Agent Plan 双端点维护成本 |
| [#10986](https://github.com/AstrBotDevs/AstrBot/pull/10986) refactor: 全新 agent runtime | 2026-11-04 | 5 天 | 已被 #11051-11053 拆分替代，**建议明确关闭或标注 superseded**，避免审阅队列重复占用 |
| [#11033](https://github.com/AstrBotDevs/AstrBot/issues/11033) 空 ThinkPart 落库 | 2026-11-07 | 2 天 | 尚无 PR，数据污染会持续累积，越晚修复历史库清洗成本越高 |
| [#11050](https://github.com/AstrBotDevs/AstrBot/issues/11050) 插件更新检测失效 | 2026-11-08 | 1 天 | 虽新但影响全量插件用户，且为今日最热议题，**无 fix PR**，建议置顶排查 |

**整体健康度结论**：Issues 关闭率 2/8、PR 关闭率 5/24，当日闭环比例偏低但**响应及时性良好**（#11054→#11055 当日闭环、#11028→#11043 当日响应）。主要风险不在响应速度，而在**大 PR 审阅吞吐**（两周期 + 堆叠 PR 并行）与**少数高影响 Issue 缺少 fix 归属**（#11050、#11033）。建议维护者本周优先处理 #11050 与 #11033，并明确 #10986 与 #11051-11053 的替代关系。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报

**日期：2026-11-09** ｜ 数据窗口：过去 24 小时 ｜ 数据源：GitHub Discussions（仓库未启用 Issues/PR）

---

## 1. 今日速览

- 社区讨论维持高位运转：过去 24 小时 **201 条 Discussions 更新**，其中 15 条高互动帖合计承载 **199 条评论**，讨论高度集中在少数长帖上，长尾帖数量众多。
- **本期无新版本发布、无 Release changelog**，因此没有可核验的代码合并落地；项目当前处于讨论密集、发版静默的阶段（讨论中可观察到 `0.2.0-rc.2` / `rc.3` 预发布线正在被用户实测）。
- 话题结构呈"**稳定性 > 生态 > 功能**"：15 条头部帖中 General 类 6 条、Q&A 类 4 条、插件展示 3 条、Ideas 2 条，其中至少 6 条属于缺陷/性能类报告。
- 头部讨论**偏"老"**：15 条中 7 条创建已超 30 天（最久 88 天），热度由长尾老帖持续供能，说明部分问题长期未闭环，维护者响应存在积压。
- 全部头部帖 👍 均为 0，社区表达以**长篇技术复现报告**为主，而非轻量点赞投票——这是一个"工程师驱动型"社区，但也意味着优先级信号需要靠评论数而非反应数来读。

---

## 2. 版本发布

**本期无新版本发布（0 个 Release），无 changelog 合并摘要可供分析。**

补充观察（来自讨论内容，非官方发布说明）：用户报告中反复出现 `DSH Desktop 0.2.0-rc.2 (nightly)` 与 `rc.3`（见 [#8827](https://github.com/deepseek-ai/deepseek-harness/discussions/8827)、[#11366](https://github.com/deepseek-ai/deepseek-harness/discussions/11366)），可推断当前处于 0.2.x 预发布周期。值得注意的是，**rc.2 与 rc.3 上同一缺陷仍稳定复现**（[#11366](https://github.com/deepseek-ai/deepseek-harness/discussions/11366)），提示该回归跨越了两个候选版本。

---

## 3. 项目进展

> 说明：该仓库未启用 PR，代码合并经 Releases 落地。**本期 Releases 为空，故无版本级合并摘要可引用**，以下为社区侧可观测到的实际推进。

尽管无发版，社区在"问题定位深度"上有明显向前推进，多条讨论已从"报障"升级为"**根因定位 + 可运行原型**"：

| 推进类型 | 讨论 | 进展内容 |
|---|---|---|
| 桌面端功能落地路径已就绪 | [#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713) | 指出底层全文检索引擎已存在，仅缺桌面端启用与 Ctrl+F 入口；**附带原型插件已在本机跑通**，可直接参考实现 |
| 启动失败根因锁定 | [#11095](https://github.com/deepseek-ai/deepseek-harness/discussions/11095) / [#11366](https://github.com/deepseek-ai/deepseek-harness/discussions/11366) | 两个独立用户将"启动即失败"归因到同一机制：`dsh-auth-*` cookie 按随机端口命名、30 天 Max-Age、旧代从不清理，导致 Cookie 头超 16 KB |
| 工具层死锁机制拆解 | [#9695](https://github.com/deepseek-ai/deepseek-harness/discussions/9695) | 定位 `session_search` 30s 超时为 `:memory:` FTS 索引 + 单事务对账 + 工具超时中止三者叠加，大语料必然死锁 |
| 插件生态外扩 | [#1045](https://github.com/deepseek-ai/deepseek-harness/discussions/1045) / [#5390](https://github.com/deepseek-ai/deepseek-harness/discussions/5390) / [#10615](https://github.com/deepseek-ai/deepseek-harness/discussions/10615) | 社区目录更名为 `deepseek-harness-community-catalog` 并持续收录；新增本地模型 QoL 补丁、设计工作台等垂直插件 |

**净评估：** 本期项目在"代码向前迈进"维度为 0（无 Release），但在"**可修复性向前迈进**"维度进展显著——至少 3 个高严重度问题已具备明确修复入口（cookie 清理策略、FTS 索引落盘、桌面端启用既有引擎），只待进入发版流程。

---

## 4. 社区热点

按评论数排序的 Top 5 热点与其背后诉求：

**① [#14 [Ideas] 求 memory 能力](https://github.com/deepseek-ai/deepseek-harness/discussions/14) — 43 评论，跨 88 天持续活跃**
诉求：希望把 Codex / Claude Code 的 memory 迁移过来，并询问快速方案。这是全站互动最高的帖子，且**诉求已从"要一个功能"演化为"要迁移路径"**——用户已在竞品中积累上下文资产，迁移成本成为切换门槛。背后是留存问题，而非单纯功能缺失。

**② [#8713 [Ideas] 桌面版缺少 Ctrl+F 关键字搜索](https://github.com/deepseek-ai/deepseek-harness/discussions/8713) — 18 评论**
诉求：在对话中检索历史内容是最高频基础操作，而"引擎已就位、入口未打开"的落差让用户尤其不满。作者给出了根因定位与实测原型，属于**投入产出比最高的需求**。

**③ [#8827 [Q&A/Bug] workflow 工具调用永不返回](https://github.com/deepseek-ai/deepseek-harness/discussions/8827) — 15 评论**
诉求：4 个阶段实际已完成，但调用永不返回，父 Agent 永久卡在 `step/start turn=1`，且**无任何事件外抛**，用户无从诊断。核心诉求是可观测性——失败要能被看见。

**④ [#11095 [General] cookie 溢出破坏启动鉴权](https://github.com/deepseek-ai/deepseek-harness/discussions/11095) — 14 评论**
诉求：每次启动新增一个 cookie 且永不回收，属于**随使用时长单调恶化的资源泄漏**，用户最不能接受的是"用得越久越必然坏"。

**⑤ [#11942 [General] 产品工程能力是否跟上模型能力](https://github.com/deepseek-ai/deepseek-harness/discussions/11942) — 13 评论，6 天内上榜**
诉求：一条元讨论，作者汇总自己提交过的多个产品层问题（Windows 文件选择器卡顿、AMD 独显光标渲染异常等）。**它把分散缺陷上升为"工程质量"判断**，是最需要重视的声誉类信号。

---

## 5. Bug 与稳定性

以下按严重程度排列。"修复状态"一律依据讨论内容判断（本期无 Release，故均无版本级修复确认）。

### 🔴 严重（功能完全不可用 / 会话报废）

| 问题 | 现象 | 链接 | 修复状态 |
|---|---|---|---|
| workflow 调用永不返回 | 父 Agent 永久卡死，无事件可诊断 | [#8827](https://github.com/deepseek-ai/deepseek-harness/discussions/8827) | 未见修复，悬置约 36 天 |
| `session_search` 必然死锁 | 大语料下永久 30s 超时 | [#9695](https://github.com/deepseek-ai/deepseek-harness/discussions/9695) | 根因已定位（`:memory:` FTS + 单事务 + 超时中止），无版本级修复 |
| 桌面端启动失败 | 约 70 次启动后 Cookie 头超 16 KB，必然无法启动 | [#11366](https://github.com/deepseek-ai/deepseek-harness/discussions/11366) / [#11095](https://github.com/deepseek-ai/deepseek-harness/discussions/11095) | **rc.2 → rc.3 未修**，属跨版本回归，双来源独立复现 |
| 单轮异常毒化整会话 | 一次 reasoning-only 空 content 后，该会话每轮 400 `INVALID_REQUEST`，无法续用 | [#5466](https://github.com/deepseek-ai/deepseek-harness/discussions/5466) | 定位到序列化层缺兜底，悬置约 67 天 |

### 🟠 高（核心流程受阻）

| 问题 | 现象 | 链接 | 修复状态 |
|---|---|---|---|
| Windows GUI 更新必失败 | Host 永不退出（koffi 保持事件循环存活），更新链路中断 | [#9963](https://github.com/deepseek-ai/deepseek-harness/discussions/9963) | 未见修复，约 23 天 |
| `workspace-write` 残留 Low 完整性标签 | 沙箱安全描述符含可继承 Low IL，会话后残留并传播，破坏从该目录启动的安装器 | [#10270](https://github.com/deepseek-ai/deepseek-harness/discussions/10270) | 未见修复；**兼有安全隐患**，建议优先评估 |

### 🟡 中（体验/输出质量）

| 问题 | 现象 | 链接 |
|---|---|---|
| 简单任务耗时不合理 | 单次读码问答 30+ 分钟、40 步（LLM 3m36s，工具调用 25m44s），首 Token 1.8s / 83 tok/s 说明非网络问题 | [#2019](https://github.com/deepseek-ai/deepseek-harness/discussions/2019) |
| DSML 标记泄漏到正文 | 模型以为工具可用但实际未提供实现时，DSML 标记被输出为普通文本 | [#10100](https://github.com/deepseek-ai/deepseek-harness/discussions/10100) |

**稳定性小结：** 4 个严重问题中，**cookie 累积是唯一被两个独立用户、跨两个 RC 版本复现的缺陷**，且恶化曲线与使用次数正相关（约 70 次启动即失效），是最应被下一版本优先拦截的项。

---

## 6. 功能请求与路线图信号

结合"实现成本 / 已有基础 / 社区呼声"给出纳入下一版本的判断：

| 需求 | 信号强度 | 落地判断 |
|---|---|---|
| **桌面版 Ctrl+F 搜索**（[#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713)） | 18 评论 + **已跑通原型** + 底层引擎已存在 | ⭐ 最可能近期落地：仅需启用既有能力并加 UI 入口 |
| **Memory 能力及竞品迁移**（[#14](https://github.com/deepseek-ai/deepseek-harness/discussions/14)） | 43 评论、88 天持续、跨工具迁移明确 | 呼声最高但工程量大，更可能先出"导入 Codex / Claude Code memory"的过渡方案 |
| **工具调用可观测性**（源自 [#8827](https://github.com/deepseek-ai/deepseek-harness/discussions/8827)） | 缺陷倒逼的隐式需求 | 建议与 workflow 卡死同批处理：补齐 step 级事件外抛 |
| **插件计费/多模型成本可视化**（[#1045](https://github.com/deepseek-ai/deepseek-harness/discussions/1045) 收录 `dsh-billing`） | 生态侧自发补齐 | 已由社区插件覆盖，短期无需官方内置 |
| **设计工作台式可视化编辑**（[#10615](https://github.com/deepseek-ai/deepseek-harness/discussions/10615)） | 8 评论、演示完整 | 属插件生态创新，官方路线图信号弱 |

---

## 7. 用户反馈摘要

**真实痛点**

1. **"用得越久越坏"的信任损耗**——cookie 泄漏（[#11095](https://github.com/deepseek-ai/deepseek-harness/discussions/11095)、[#11366](https://github.com/deepseek-ai/deepseek-harness/discussions/11366)）与 Windows 更新失败（[#9963](https://github.com/deepseek-ai/deepseek-harness/discussions/9963)）共同指向：**桌面端生命周期管理（清理、退出、升级）是系统性薄弱环节**，而非孤立 bug。
2. **失败不可见、不可恢复**——[#8827](https://github.com/deepseek-ai/deepseek-harness/discussions/8827) 的 Agent 静默卡死与 [#5466](https://github.com/deepseek-ai/deepseek-harness/discussions/5466) 的整会话报废，用户都得不到任何可操作信息。**"降级可恢复"比"永不失败"更被期待**。
3. **性能预期落差**——[#2019](https://github.com/deepseek-ai/deepseek-harness/discussions/2019) 中用户明确对标："Claude 1 分钟、Grok 30 秒、DSH 30+ 分钟"。用户已用工具调用耗时（25m44s vs LLM 3m36s）自行完成归因，直指**编排层而非模型层**。
4. **基础交互缺位**——[#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713) 的措辞值得维护者注意："在'在对话里找一句话'这个最基础的场景上无路可走"。

**满意之处 / 正向信号**

- 模型能力获得一致认可（[#11942](https://github.com/deepseek-ai/deepseek-harness/discussions/11942)：*"DeepSeek 的模型能力确实让我印象深刻"*），不满**几乎全部落在产品工程层**。
- 插件生态具备自组织能力：社区目录（[#1045](https://github.com/deepseek-ai/deepseek-harness/discussions/1045)）、本地模型 QoL 补丁（[#5390](https://github.com/deepseek-ai/deepseek-harness/discussions/5390)）、设计工作台（[#10615](https://github.com/deepseek-ai/deepseek-harness/discussions/10615)）均由用户自发建设并互相索引。
- 报告质量极高：多个帖子附带最小复现、环境矩阵、崩溃日志与可用原型，**社区实际承担了大量定位工作**，修复成本已被显著降低。

**使用场景画像**：本地/混合部署（WSL2 + V4-Pro、本地 Qwen3.8）、代码库阅读问答、桌面端长会话、多模型网关代理（Anthropic 兼容层）、UI 设计生成。

---

## 8. 待处理积压

按"悬置时长 × 影响面"排序，建议维护者优先关注：

| 讨论 | 悬置 | 互动 | 为何值得优先 |
|---|---|---|---|
| [#14](https://github.com/deepseek-ai/deepseek-harness/discussions/14) memory 能力 | **约 88 天** | 43 评论（全站第一） | 互动最高的需求帖长期无官方结论，且直接关系竞品迁移与留存 |
| [#2019](https://github.com/deepseek-ai/deepseek-harness/discussions/2019) 简单任务耗时过长 | **约 86 天** | 10 评论 | 性能体验是竞品对比中最直观的失分项，用户已给出可用归因数据 |
| [#5466](https://github.com/deepseek-ai/deepseek-harness/discussions/5466) 空 content 毒化会话 | **约 67 天** | 7 评论 | 影响面大（会话级不可恢复），根因清晰（序列化层缺兜底），修复成本应不高 |
| [#5390](https://github.com/deepseek-ai/deepseek-harness/discussions/5390) Qwen3.8 本地 QoL 插件 | 约 68 天 | 11 评论 | 社区插件长期未获官方回应，影响生态贡献者积极性 |
| [#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713) Ctrl+F 搜索 | 约 38 天 | 18 评论 + 原型 | **投入产出比最高的待办**：原型已跑通，缺的只是排期 |
| [#8827](https://github.com/deepseek-ai/deepseek-harness/discussions/8827) workflow 卡死 | 约 36 天 | 15 评论 | 严重级缺陷且诊断信息完全缺失，长期无回应易劝退重度用户 |
| [#11095](https://github.com/deepseek-ai/deepseek-harness/discussions/11095) / [#11366](https://github.com/deepseek-ai/deepseek-harness/discussions/11366) cookie 泄漏 | 14 / 12 天 | 14 + 7 评论 | 虽悬置最短，但**跨 rc.2/rc.3 未修 + 双来源复现 + 必然触发**，应作为下一版本的头号拦截项 |

**健康度结论：** 活跃度**优秀**（201 条更新/日，社区自组织能力强、报告质量高），响应度**偏弱**（头部 15 帖中 7 帖超 30 天未闭环，最高热度需求悬置近三个月）。当前项目的主要风险不在"没人讨论"，而在**讨论产出（根因与原型）未能及时转化为 Release**——建议下一版本以 cookie 清理、Ctrl+F 启用、序列化层兜底这三项低成本高感知修复作为切入点，可同时改善稳定性指标与社区信心。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*