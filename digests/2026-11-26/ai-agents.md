# OpenClaw 生态日报 2026-11-26

> Issues: 361 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-26 03:50 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-26

---

## 1. 今日速览

OpenClaw 今日维持**高活跃度**：24 小时内 Issues 更新 361 条（新开/活跃 247、关闭 114），PR 更新 500 条（待合并 277、已合并/关闭 223），并发布 2 个版本（含一个 `extended-stable` / LTS 型版本）。工程推进力度大，但社区注意力高度集中在**内存泄漏、SQLite WAL 与状态 DB、更新/升级路径失败**三类稳定性问题上，其中多个 P0 议题持续活跃超过 2 个月。整体看，**项目功能推进健康，但可靠性债务和升级路径的健壮性仍是当前最大的用户信任风险。**

---

## 2. 版本发布

### ✅ v2026.11.10 最新版本

- **链接**：[openclaw 2026.11.10](https://docs.openclaw.ai/releases)（release notes 与 changelog 同源呈现）
- **规模信号**：本版本汇聚 **8,309 commits、7,671 PRs、349 contributors**，属于累计式发行说明，反映社区贡献规模极大。
- **内容**：官方说明采用 Release notes / changelog 双格式呈现，具体条目详见官方文档。
- **破坏性变更 / 迁移注意**：⚠️ 本批数据未列出明确 breaking changes 清单；但因同期存在多条与 **update 激活阶段 Doctor 校验失败**相关的 P0/P1 议题（见 §5，如 #197083、#200606、#204816、#203442），建议升级前先在候选版本上跑一遍 `openclaw doctor`，并**避免在有大量外部插件的环境下执行无回滚保护的手动升级**。

### ✅ v2026.10.34 extended-stable 发布

- **链接**：[openclaw 2026.10.34](https://docs.openclaw.ai/releases)
- **定位**：`gateway-only` 的 **extended-stable**，即当前项目对标 LTS 的通道。
- **内容**：2026 年 10 月底版 OpenClaw 基线 + **关键安全更新、可靠性与性能修复、新模型支持**。
- **适用建议**：对稳定性敏感的生产部署建议优先停留在本通道；尚未采纳 11.x 新特性的用户可暂不迁移。

---

## 3. 项目进展

> 注：本期 PR 列表以新开 PR 为主（大多数仍为 OPEN），明确完成合并或关闭的 PR 较少，以下为可确认的进展。

**今日关闭/合并的重要 PR：**

- **#157192** `fix: honor opt-in heartbeat busy guard for agent lanes` — **CLOSED**（2026-09-24 → 2026-11-26，历时约 2 个月）
  链接：https://github.com/openclaw/openclaw/pull/157192
  修复 `heartbeat.skipWhenBusy` 在 `session:` / `nested:` 兄弟 lane 上不生效的问题，避免心跳唤醒与同一 agent 的活跃任务冲突。

- **#205707** `fix(workboard): preserve pasted board names and column text` — **CLOSED**
  链接：https://github.com/openclaw/openclaw/pull/205707
  修复 Workboard 粘贴列标签时，"bed 12" 被截断为 "bed 1" 的前端文本长度计问题，属于用户体验 bug。

**今日新开的关键修复/功能 PR（待合并，但方向明确）：**

| PR | 主题 | 关联 Issue |
|---|---|---|
| [#205726](https://github.com/openclaw/openclaw/pull/205726) | 允许 owner 恢复被 provenance quarantine 的 `MEMORY.md` 信任 | 修 #204738 / #203532 / #153426 |
| [#205723](https://github.com/openclaw/openclaw/pull/205723) | 阻止大型 MCP 工具目录在会话启动时导致 Gateway 卡顿 | 修 #199327，接续 #199346 |
| [#205730](https://github.com/openclaw/openclaw/pull/205730) | cron `sessionTarget` 在首次 send 后不再提前结束 turn（消息丢失修复） | 修 #205660 |
| [#205712](https://github.com/openclaw/openclaw/pull/205712) | 修复 helper（子 agent）在命令完成后被错误提示"保持沉默" | 修 #205705 |
| [#204794](https://github.com/openclaw/openclaw/pull/204794) | update 历史账本保留可操作告警，不再静默截断 | 修 #204768 |
| [#197030](https://github.com/openclaw/openclaw/pull/197030) | Codex 原生 app 不再被插件工具 deny 连带禁用 | 社区反馈 |
| [#205731](https://github.com/openclaw/openclaw/pull/205731) | 新增 opt-in Antigravity 会话 + 安全重启恢复 | 新能力 |

**整体判断**：今日 PR 以**小范围可靠性修复 + 文档/测试收敛**为主（如 #205732 CLI 监听器复用、#205728 凭据刷新跳过未用模型行、#205720 清理未用导出），特征鲜明地指向 "**削峰填谷**" 式的质量修复期，而非大功能冲刺期。

---

## 4. 社区热点

按评论数排名，今日社区注意力高度集中于**基础设施稳定性**：

### 🔥 讨论最激烈的 Issues

1. **#164294** — Gateway state DB WAL auto-checkpoint 从未完成（**44 评论**，P2，打开 54 天）
   https://github.com/openclaw/openclaw/issues/164294
   核心诉求：WAL 被进程内 reader 长期 pin 住，`PASSIVE` checkpoint 次次 blocked，只能手工干预。指向**状态数据库的读写并发设计**。

2. **#91588** — 严重内存泄漏：RSS 350MB → 15.5GB，反复 OOM（**42 评论**，P0，打开超 5 个月）
   https://github.com/openclaw/openclaw/issues/91588
   用户明确报告 `launchd-handoff` 重启循环，属于**生产事故级**问题。

3. **#197083** — 升级后 Doctor 的 WAL 发布校验失败，使 11.3 更新"半完成"（**40 评论**，P0，UX 发布阻断）
   https://github.com/openclaw/openclaw/issues/197083
   关键诉求：由于 `state-migrated-no-rollback` 拒绝回滚，外部插件状态被卡在中间态——这是**升级安全性**的核心争议点。

4. **#159662** — `prepared-model-catalog.worker.js` 无界内存泄漏（约 4–5 GB/h）（**28 评论**，P0）
   https://github.com/openclaw/openclaw/issues/159662
   与 #91588 共同指向**worker 线程生命周期管理**，属于系统性问题。

5. **#153426** — `MEMORY.md` / `USER.md` 被 provenance ratchet 静默永久排除于 bootstrap（**25 评论**，🦞 diamond lobster，P0）
   https://github.com/openclaw/openclaw/issues/153426
   高评级（diamond lobster）且附带安全影响标签，已有对应修复 PR #205726 在途。

### 🔥 讨论最活跃的 PR

- **#204431** `feat: let plugins explain provider errors in chat`（P2，🦐 gold shrimp，`merge-risk: compatibility`）
  https://github.com/openclaw/openclaw/pull/204431
  让插件能把 provider 错误翻译成用户可读解释，**直接改善最常见的"通用错误提示"体验**。

- **#205726** `fix(memory): let owners restore reviewed MEMORY.md trust`（P2，`merge-risk: security-boundary`）
  https://github.com/openclaw/openclaw/pull/205726
  与 #153426 热点直接呼应，是**信任/恢复机制**的关键补丁。

- **#205723** `fix: stop large MCP tool catalogs from stalling the Gateway`（P2，🐚 platinum hermit，ready for maintainer）
  https://github.com/openclaw/openclaw/pull/205723
  经过多轮 proof 与 supersede 讨论后，是**MCP 大型工具目录**场景中少见的 ready-for-review 关键修复。

**背后诉求解读**：社区情绪已经非常清楚——**"能不能稳定地跑起来、能不能安全地升级、能不能恢复被我弄坏的状态"已经比新功能更重要**。这从 #204775（"Design: prepared-release updates"）以 17 条评论位列高频即可印证，社区在自发组织更新路径的设计讨论。

---

## 5. Bug 与稳定性

按严重度（P0 → P1 → P2）排列：

### 🔴 P0 / 崩溃与数据级

| Issue | 主题 | 是否有 fix PR |
|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | Gateway 内存泄漏 RSS 15.5GB，反复 OOM（🦐 gold shrimp） | ❌ `no-new-fix-pr` |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | `prepared-model-catalog.worker.js` 每小时泄漏 4–5GB（provider 无关） | ❌ |
| [#197083](https://github.com/openclaw/openclaw/issues/197083) | 升级后 Doctor WAL 校验失败，留下 "半完成" 11.3 状态 | ❌ |
| [#153426](https://github.com/openclaw/openclaw/issues/153426) | MEMORY.md / USER.md 被静默排除于 bootstrap（含 security + session-state 影响） | 🟡 **#205726 在途** |
| [#158912](https://github.com/openclaw/openclaw/issues/158912) | 2026.9.6 起 `MEMORY.md` 不再注入 bootstrap，与文档不符 | 🟡 相关 #205726 |
| [#190563](https://github.com/openclaw/openclaw/issues/190563) | Codex 对话无法 resume：provider review / native thread 不一致 | ❌ |

### 🟠 P1 / 会话与消息丢失

- **[#148707](https://github.com/openclaw/openclaw/issues/148707)** — 第二个 run 替换进行中的 turn 时，回复丢失并报 `no active tool authority snapshot`（2026.9.4 回归）。❌ 无 fix PR
- **[#196199](https://github.com/openclaw/openclaw/issues/196199)** — 2026.10.10 起 Codex helper 完成后约"每启动一次失败一次"，用户被锁在 assistant 之外。❌
- **[#185085](https://github.com/openclaw/openclaw/issues/185085)** — exec 完成唤醒丢失 `SESSION_DELIVERY_GENERATION_UNAVAILABLE`；#177063 的修复**未进入 stable**。⚠️ 需 backport
- **[#154812](https://github.com/openclaw/openclaw/issues/154812)** — V8 heap 之外的 RSS 失控，导致 OOM 与 shutdown 超时。❌
- **[#181432](https://github.com/openclaw/openclaw/issues/181432)** — 2026.10.5 基线 RSS ~1.9GB + SQLite 事务超时（ARM64）。❌
- **[#200606](https://github.com/openclaw/openclaw/issues/200606)** — 2026.11.5 candidate Doctor 因插件迁移冲突阻止更新。❌
- **[#204816](https://github.com/openclaw/openclaw/issues/204816)** — 2026.11.4 → 2026.11.8 stable 回滚：activation 阶段 Doctor "Invalid config"。❌
- **[#203442](https://github.com/openclaw/openclaw/issues/203442)** — 更新至 11.10-beta.1 后 plugin deepseek Doctor source 未准备。❌

### 🟡 P2 / UX 与显示问题

- **[#123792](https://github.com/openclaw/openclaw/issues/123792)** — claude-cli 后端下，assistant turn 被双重渲染（Control UI / Android）。❌
- **[#200224](https://github.com/openclaw/openclaw/issues/200224)** — 11.5 beta 升级拒绝已废弃的 `agents.defaults.heartbeat`，但 stable 上移除又会导致心跳复活（配置不可迁移）。❌
- **[#200756](https://github.com/openclaw/openclaw/issues/200756)** — Windows 11 beta.2 → beta.4 更新在 `package-swap` 失败（baseline package scan failed）。
- **[#127195](https://github.com/openclaw/openclaw/issues/127195)** — 16 处调用点抛出**完全相同**的 "changed while starting work" 错误，无 reason code，无法定位根因。

**结论**：内存/RSS 类问题（#91588、#159662、#154812、#181432）**全部处于 `no-new-fix-pr` 状态**，是当前项目稳定性的**最大系统性风险**；升级路径问题（#197083 / #200606 / #204816 / #203442）呈现"**新版本持续复现**"的恶性循环，说明 update 流程本身需要一次系统性重构。

---

## 6. 功能请求与路线图信号

| 功能请求 | 信号强度 | 判断 |
|---|---|---|
| [#56349](https://github.com/openclaw/openclaw/issues/56349) 不可绕过的出站策略执行（pre-send 单一通道）——🐚 platinum hermit，含安全影响 | 🔵 高（有 security 标签 + 长期维护者关注） | 属结构性安全设计，可能作为中期路线图 |
| [#150238](https://github.com/openclaw/openclaw/issues/150238) Skill Workshop Experience Review 的 context budget / skip policy | 🔵 高（已有 **linked PR**） | **大概率进入下一版本** |
| [#140213](https://github.com/openclaw/openclaw/issues/140213) 多个 policy alias 解析到同一 model | 🟢 中（已有 maintainer decision packet） | **有望近期落地** |
| [#169428](https://github.com/openclaw/openclaw/issues/169428) `/usage full` footer 暴露 auth profile（`model.auth_label`） | 🟢 中（功能边界清晰） | **快速可实现** |
| [#143387](https://github.com/openclaw/openclaw/issues/143387) Android 通知 QoL（session-aware / 来源标签 / 跨设备抑制） | 🟡 低（作者已声明**不再推动实现**） | **已停滞，仅保留提案价值** |
| [#103067](https://github.com/openclaw/openclaw/issues/103067) 集中化会话命名 + subagent 生命周期模型 | 🟢 中（涉及多模块，需协调） | 中长期 |
| [#192009](https://github.com/openclaw/openclaw/issues/192009) 显式授权跨 provider 的 cron fallback 账户 | **今日 CLOSED** | 已进入落地流程 |

**路线图信号**：结合 #205731（Antigravity session 支持）和 #205614（Knowledge Scribes 定时读 Slack），可以判断 **11.x 后续版本的功能重心在 "多后端运行时 + 自动化/定时任务"**；可靠性侧则以 #204775（prepared-release updates 设计）为核心组织更新路径的下一轮重构。

---

## 7. 用户反馈摘要

从今日高热度 Issue 评论可提炼以下真实痛点：

**🔴 满意度低 / 强不满**

- **"升级比新功能更让我焦虑"**：多条 update 路径 Issue（#197083、#200606、#204816、#203442、#200756）显示，用户普遍在 Windows / npm-global / 大插件环境下遇到 **candidate 校验通过但 activation 失败、且拒绝回滚**的困境。用户的核心恐惧是"**升到一半，无法回退，也无法继续**"。
  > 典型语气（#204816）："passed candidate Doctor, lint, config, plugin, schema and Gateway startup checks" 但 activation 依然失败——**校验与激活之间的差异**是用户最不理解的部分。

- **"内存泄漏让我们不得不重启生产服务"**：来自 #91588、#159662、#181432 的报告者是长期使用单机/小型部署的个人或小团队，**RSS 从约 350MB 涨到 GB 级**让其 host 直接 OOM。这类用户不是"负载型"用户，说明泄漏**与流量无关**。

- **"MEMORY.md 静默消失"**：#153426、#158912 的读者对"**没有诊断、没有 CLI、没有恢复路径**"的静默失效尤其不满，认为这是**信任型功能失效**，比崩溃更伤。

**🟢 满意度高 / 正向反馈**

- **更新路径设计有社区自组织信号**：#204775 这类"设计集"型 Issue 有 17 条评论、大量具体分工讨论，说明**核心贡献者正在主动收敛设计，避免重复修改同一批文件**——这是项目健康的正面信号。

- **小修复响应快**：#205707（粘贴文本截断）、#205718（Unicode 附件名）、#205719（归档 skill 描述显示）等小 UX bug，有 bot 或维护者当天修复、当天关单，体现 **ClawSweeper bot + 维护者响应链在正常运转**。

**📌 使用场景画像**
- 大量 Issue 来自 **macOS / Linux ARM64 / 单机 systemd / 单机 launchd** 场景，说明用户基础以**个人开发者 / 小团队自托管者**为主。
- #123792、#143387 显示 **Control UI webchat + Android app + Telegram / Discord / Signal** 多端并行使用是主流形态。

---

## 8. 待处理积压（提醒维护者关注）

### 🥇 最高优先级积压

| Issue / PR | 状态 | 积压时长 | 建议动作 |
|---|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) 内存泄漏 15.5GB | OPEN，42 评论，P0 | **> 5 个月** | 需专门 owner 认领，否则持续消耗信任 |
| [#153426](https://github.com/openclaw/openclaw/issues/153426) MEMORY 静默排除（diamond lobster） | OPEN，25 评论，P0 | **> 2 个月** | 关联 #205726 应尽快 merge 或明确拒绝 |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) catalog worker 4–5GB/h 泄漏 | OPEN，28 评论，P0 | **> 2 个月** | 与 #91588 属同一族问题，建议合并处理 |
| [#154812](https://github.com/openclaw/openclaw/issues/154812) V8 heap 外 RSS 失控 | OPEN，15 评论，P1 | **> 2 个月** | 需 heap 外 profile 工具支持 |
| [#190563](https://github.com/openclaw/openclaw/issues/190563) Codex paused 对话无法 resume | OPEN，13 评论，P0 | ~ 1 个月 | 阻塞用户回归，需人工诊断 |

### 🥈 值得关注的长期开放设计型 Issue

- **[#164294](https://github.com/openclaw/openclaw/issues/164294)** WAL checkpoint 永不完成（**44 评论，积压最久的高热 Issue**，> 54 天）——建议明确**是否设计上就允许 reader pin WAL**，否则每个用户都会踩。
- **[#148707](https://github.com/openclaw/openclaw/issues/148707)** `no active tool authority snapshot` 回归（> 72 天，P1，无 fix PR）
- **[#112638](https://github.com/openclaw/openclaw/issues/112638)** `session.maintenance` enforce 模式未真正约束 store（> 4 个月）
- **[#127195](https://github.com/openclaw/openclaw/issues/127195)** 16 处同字符串错误无 reason code（> 3 个月）
- **[#170562](https://github.com/openclaw/openclaw/issues/170562)** stranded requester settle wake 的 Doctor 恢复能力（> 1.5 个月）

### 🥉 明确需 backport 的修复

- **#177063** 已修复于 `main`（10-19），但**未进入 stable**，导致 #185085 在 stable 上持续复现——**建议列入下一个 extended-stable（如 v2026.10.xx 系列）的 backport 清单**。

### ⚠️ 已宣告停滞的须做状态清理

- **[#143387](https://github.com/openclaw/openclaw/issues/143387)** Android 通知 QoL：作者已声明不再推动实现，建议标记 `won't fix` 或转为 `proposal` 分类，减少社区误投入。

---

## 📊 项目健康度一句话总结

> **贡献吞吐健康（8k+ commits / 349 contributors / 2 版本今日发布），但"稳定性债务"已成为主线矛盾**——P0 内存泄漏类问题平均积压超 60 天且全部无 fix PR，升级路径问题在新版本中持续复现。**建议下一迭代将重心从"新能力"转向"内存治理 + 更新管线重构 + extended-stable backport 机制"**，否则社区讨论热度会继续停留在"能不能正常跑"上，而非产品演进本身。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析  
**数据日期：2026-11-26 ｜ 口径：GitHub 24h“更新量”，非净新增；部分项目 PR 评论缺失或未启用 Issues/PR，已在文中标注。**

---

## 1. 生态全景

个人 AI 助手与自主智能体开源生态已进入“**功能扩张与可靠性债务并存**”阶段：头部项目仍保持数百级 Issue/PR 日吞吐，但社区注意力明显从“新能力”转向**稳定运行、安全升级、记忆/上下文治理与工具调用可靠性**。MCP、插件、多后端 provider、多会话/多租户与桌面端覆盖成为共同技术战场，同时 Windows、ARM64、Mac Intel、中文编码等平台差异正在放大用户可感知故障。发布治理开始分化：OpenClaw 已形成 stable + extended-stable/LTS 通道，Hermes 以 canary 日更，AstrBot 进入存量清偿，Zeroclaw 在 1.0 前做架构收敛，DeepSeek Harness 则呈现“讨论活跃、交付不可见”的早期形态。整体判断：**生态热度健康，但“能不能稳定跑、能不能安全升级、能不能恢复状态”已成为下一阶段的分水岭。**

---

## 2. 各项目活跃度对比

| 项目 | 今日 Issues 更新 | 今日 PR 更新 | Release | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 361（活跃 247 / 关闭 114，关闭率 31.6%） | 500（待合并 277 / 合并关闭 223，关闭率 44.6%） | **2**：v2026.11.10、v2026.10.34 extended-stable | **高吞吐、强发布治理，但稳定性债务高**：内存泄漏、SQLite WAL、升级 activation 失败是主线风险 |
| **Zeroclaw** | 11（活跃 8 / 关闭 3） | 50（待合并 39 / 关闭 11，关闭率 22%） | 0 | **方向清晰、合并积压**：v1.0.0 与 runtime 拆分 tracker 活跃，但 CI 稳定性、大型堆叠 PR、审查吞吐不足 |
| **PicoClaw** | 0 | 3（全部 CLOSED，待合并 0） | 0 | **低活跃清理型**：积压归零、无新增 Bug 报告，但样本量低，用户可见收益待版本验证 |
| **QwenPaw** | 28（活跃 22 / 关闭 6） | 50（待合并 29 / 合并关闭 21，关闭率 42%） | 0（v2.3.1 待发窗口） | **高强度迭代，评审带宽承压**：稳定性修复持续，但模型元数据、解析健壮性、多平台体验存在结构性风险 |
| **hermes-agent** | 342（活跃 323 / 关闭 19，关闭率 5.6%） | 500（待合并 383 / 合并关闭 117，关闭率 23.4%） | 1 个 canary（v0.23.4） | **开发吞吐极高、收敛偏弱**：待合并:已合并≈3.3:1；Windows P0 数据回滚无可见 fix，决策瓶颈明显 |
| **AstrBot** | 10（新开 2 / 关闭 8） | 41（待合并 22 / 合并关闭 19） | 0 | **维护态良好、存量清偿**：MCP 可靠性专项集中落地，但安全 PR 与依赖栈仍需 review 带宽 |
| **DeepSeek Harness** | Discussions 更新 127；Issues/PR 未启用 | N/A | 0 | **讨论活跃、交付不可见**：数据丢失、OOM、MCP 绕过审批等高风险反馈存在，但无 Release changelog 可核验修复 |

> 注：OpenClaw 版本说明显示累计 **8,309 commits、7,671 PRs、349 contributors**，社区规模在样本中最大；Hermes 今日更新量与 OpenClaw 同量级，但未披露可比累计贡献者数据。

---

## 3. OpenClaw 在生态中的定位

**定位：通用型个人 AI 助手平台 + Gateway 中心化运行时 + 插件/多端生态 + 发布治理最完整的核心参照。**

- **优势**
  1. **社区与贡献规模最大**：今日 361 Issue / 500 PR 更新，版本说明含 349 contributors、8k+ commits，样本中唯一同时具备 stable 与 extended-stable/LTS 通道的项目。
  2. **发布治理最成熟**：`openclaw doctor`、candidate/activation 校验、extended-stable 通道，说明其已进入“平台化运维”阶段。
  3. **功能面最广**：Gateway、Workboard、MEMORY.md、MCP、插件 provenance、多端 Control UI/Android/IM 等并行推进。
  4. **社区自组织强**：#204775 prepared-release updates 设计讨论、多个 P0 长议题持续高评论，核心贡献者在主动收敛更新路径设计。

- **风险与差异**
  - 与 Hermes 同属“超大规模吞吐”，但 OpenClaw **Issue 关闭率 31.6%、PR 关闭率 44.6%**，明显高于 Hermes 的 5.6% / 23.4%，收敛能力更强。
  - 技术路线偏 **Gateway + state DB + doctor/update pipeline + plugin provenance**；Hermes 更偏多智能体 Kanban、Desktop 工作区、插件执行面与云端 dashboard；QwenPaw 偏多 provider/harness；AstrBot 偏 IM/MCP；Zeroclaw 偏 Rust runtime 拆分与 1.0 治理。
  - 当前最大短板不是功能，而是 **内存/RSS、SQLite WAL、升级 activation 失败** 三类可靠性债务；P0 内存问题平均积压超 60 天且无 fix PR，是用户信任风险。

**结论**：OpenClaw 是生态中“**规模最大、发布治理最完整、但可靠性债最显性**”的平台型项目；其 LTS 通道与 doctor 体系是差异化优势，但下一阶段必须从“新能力”转向“内存治理 + 更新管线重构 + backport 机制”。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **长期运行稳定性 / 资源治理** | OpenClaw、Hermes、QwenPaw、AstrBot、DeepSeek Harness、Zeroclaw | OpenClaw RSS 15.5GB/OOM、WAL checkpoint；Hermes state.db 活锁误判、Windows 文件元数据 churn；QwenPaw llama-server 孤儿进程；AstrBot MCP 管道冻死；DeepSeek 1GB 会话 OOM；Zeroclaw CI 脆弱性 |
| **升级/迁移安全与可回滚** | OpenClaw、Hermes、QwenPaw、AstrBot、Zeroclaw | OpenClaw candidate 通过但 activation 失败且拒绝回滚；Hermes 更新误回滚 state.db；QwenPaw v2.3.1 Beta 回归待收敛；AstrBot QQ Markdown 配置破坏性变更需自动迁移；Zeroclaw 1.0 前 breaking-change 窗口 |
| **MCP / 工具调用可靠性** | OpenClaw、AstrBot、DeepSeek Harness、QwenPaw、Hermes、Zeroclaw | OpenClaw 大型 MCP 目录卡顿；AstrBot 重连、stderr 编码、SDK 版本校验；DeepSeek MCP 绕过 `ctx.approval`；QwenPaw `run_tool_batch` 失败、媒体块 400；Hermes 非 shell 工具审批缺口；Zeroclaw 对等消息绕过 autonomy/budget |
| **上下文/记忆/压缩治理** | OpenClaw、Hermes、QwenPaw、DeepSeek Harness、AstrBot | OpenClaw MEMORY.md provenance 静默排除；Hermes doc-chain compaction/provenance、跨会话记忆；QwenPaw 记忆 TTL/引用计数/租户隔离、上下文窗口元数据；DeepSeek 跨会话 memory provider；AstrBot 知识库工具名重复导致检索失败 |
| **安全默认值与多租户硬化** | QwenPaw、Hermes、DeepSeek Harness、OpenClaw、Zeroclaw、AstrBot | QwenPaw skill 扫描 fail-open、沙箱资源上限未执行；Hermes Tirith 审批不覆盖非 shell；DeepSeek MCP 审批绕过；OpenClaw 出站策略执行；Zeroclaw autonomy level 一致性；AstrBot Slack webhook 重放 |
| **平台覆盖与桌面体验** | OpenClaw、Hermes、QwenPaw、DeepSeek Harness、AstrBot | Windows：OpenClaw package-swap、Hermes P0/更新器、QwenPaw ReMe 索引、DeepSeek 启动失败、AstrBot cp936 编码；Mac Intel 适配；Linux deb/AppImage；Android 通知 |
| **插件生态治理** | OpenClaw、AstrBot、QwenPaw、Zeroclaw、DeepSeek Harness | OpenClaw provenance quarantine；AstrBot 批量安装/卸载、分类自声明、市场深链；QwenPaw 插件 CLI 与扩展点；Zeroclaw 渠道 WASM 插件；DeepSeek “一切皆插件”但预设不足 |
| **模型/Provider 元数据与多后端** | QwenPaw、OpenClaw、Hermes、AstrBot、Zeroclaw | QwenPaw context window 缺失回落 128k、agent/session 模型作用域混乱；OpenClaw model catalog worker 泄漏；Hermes 允许 <64K 上下文；AstrBot OpenAI/Gemini tool_call 兼容；Zeroclaw Qwen 视频输入/provider 扩张 |
| **CI / 测试 / 可观测性** | Zeroclaw、QwenPaw、AstrBot、Hermes | Zeroclaw `curl \| tar` CI 单点失败；QwenPaw pytest xdist collection 中止；AstrBot Trace 多维过滤；Hermes Skills 索引 bot 连续告警 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 通用个人 AI 助手、Gateway、Workboard、多端 Control UI、插件/MCP、LTS | 自托管个人开发者、小团队生产部署 | Gateway 中心化 + state DB + doctor/update pipeline + plugin provenance；发布治理最完整 |
| **Zeroclaw** | Rust 运行时、v1.0 路线图、runtime 拆分、ACP/OIDC、渠道插件化 | 架构敏感型开发者、长期平台贡献者 | Rust crates/runtime 分层，WASM 渠道插件，1.0 前主动 breaking-change 收敛 |
| **PicoClaw** | 轻量 Web launcher、配置稳定性、本地化 | 轻量尝鲜、硬件/嵌入式周边用户 | 轻量配置 ModelList + Web UI；当前以积压清理为主，功能推进弱 |
| **QwenPaw** | 多 provider/harness、记忆/沙箱、插件化、多通道 | 长上下文、多通道、多 agent 的生产型用户 | 多 provider + ReMe 记忆 + CodeMode + 插件 harness；模型注册表与解析层待统一 |
| **hermes-agent** | 多智能体 Kanban、Desktop 工作区、插件执行面、云端 dashboard、主动性 | 多智能体战役、常驻多 profile、IM 集成用户 | Gateway/session/state.db + Kanban dispatcher + Desktop + 插件公共接缝；产品形态最广 |
| **AstrBot** | IM 机器人、QQ 官方适配、MCP、插件市场、WebUI | QQ/IM 社区运营者、插件用户 | MCP 子系统 + QQ Markdown 策略 + 插件市场；维护态成熟，存量清偿能力强 |
| **DeepSeek Harness** | 插件化桌面/Web、Agent 自定义、跨会话记忆、CUA | 插件开发者、桌面 Agent 用户 | “一切皆插件” + Discussions 驱动；Issues/PR 未启用，交付透明度低 |

**关键判断**：OpenClaw 与 Hermes 都是平台型，但 OpenClaw 更偏“个人助手 Gateway + 多端 + 发布治理”，Hermes 更偏“多智能体工作流 + Desktop + 云端形态”；QwenPaw 与 AstrBot 分别在“多 provider/记忆沙箱”和“IM/MCP 插件市场”上更垂直；Zeroclaw 是架构治理型，PicoClaw 是轻量清理型，DeepSeek Harness 是插件化早期形态。

---

## 6. 社区热度与成熟度

### 活跃度分层

1. **超大规模高吞吐层：OpenClaw、hermes-agent**
   - 日更新 300+ Issues、500 PR，均有版本/预发布动作。
   - 差异：OpenClaw 关闭率更高、发布治理更完整；Hermes 新增远快于关闭，待合并 PR 383 条，决策瓶颈更突出。

2. **中高活跃迭代层：QwenPaw、Zeroclaw、AstrBot**
   - QwenPaw：50 PR 更新、21 合并关闭，迭代快但 XXXL PR 占用评审带宽。
   - Zeroclaw：50 PR 更新但仅 11 关闭，合并积压与 CI 稳定性是主要风险。
   - AstrBot：41 PR 更新、19 关闭，MCP 专项集中落地，属“高质量维护态”。

3. **低活跃清理层：PicoClaw**
   - 0 Issue、3 PR 全关闭、待合并归零；健康但样本低，需观察下一版本是否兑现配置修复。

4. **讨论驱动 / 交付不可见层：DeepSeek Harness**
   - 127 条 Discussions、0 Release、Issues/PR 未启用；社区反馈充分，但修复进展无法从 Release 核验。

### 成熟度判断

- **质量巩固阶段**：AstrBot、OpenClaw（局部）、PicoClaw。AstrBot 已进入“存量技术债集中清偿”；OpenClaw 虽有质量修复期特征，但 P0 内存/升级问题仍未收敛，属于“边扩张边还债”。
- **快速迭代阶段**：QwenPaw、Zeroclaw、Hermes、DeepSeek Harness。QwenPaw 功能/修复并行；Zeroclaw 在 1.0 前做架构减法；Hermes 架构演进清晰但收敛弱；DeepSeek Harness 仍处早期插件生态建设。
- **发布治理最成熟**：OpenClaw（stable + extended-stable/LTS + doctor）；AstrBot 维护流程稳定；Hermes canary 日更但稳定通道与决策机制待观察。

---

## 7. 值得关注的趋势信号

1. **“可靠性”取代“功能数量”成为信任门槛**  
   OpenClaw 的内存/WAL/升级失败、Hermes 的 state.db 回滚、QwenPaw 的 Windows 索引失败、DeepSeek 的数据丢失/OOM 均说明：用户已把项目用于生产型长会话、多通道、多 agent 场景，**资源生命周期、升级回滚、故障自愈**比新功能更重要。

2. **MCP/工具调用成为新的系统性故障面**  
   AstrBot 一次性合入 4 个 MCP 修复、OpenClaw 大型 MCP 目录卡顿、DeepSeek MCP 绕过审批、QwenPaw 工具批处理失败，表明 MCP 客户端需要**版本校验、重连、编码健壮性、审批门禁、大目录性能**五件套。仅“能连上”已不够。

3. **上下文工程从“记忆”转向“可治理的记忆”**  
   OpenClaw MEMORY.md provenance、Hermes doc-chain/compaction、QwenPaw TTL/引用计数/租户隔离、DeepSeek 跨会话 memory provider，共同指向：**记忆要有来源、作用域、过期、隔离与恢复机制**。“Never forgets”叙事正在被“可审计地记住/忘记”替代。

4. **安全默认值正在硬化**  
   QwenPaw skill 扫描 fail-open、沙箱资源上限未执行；Hermes Tirith 审批不覆盖非 shell；DeepSeek MCP 审批绕过；Zeroclaw autonomy/budget 不一致；OpenClaw 出站策略。趋势是：**审批、沙箱、租户隔离、出站策略需要跨工具一致生效**，而非单点拦截。

5. **发布治理成为竞争力**  
   OpenClaw extended-stable、Hermes canary、QwenPaw Release Duty、AstrBot 配置自动迁移、Zeroclaw 1.0 breaking-change 窗口，说明头部项目正在把 **candidate/activation、backport、release duty、迁移兼容** 产品化。对开发者而言，**可回滚的更新管线**是下一阶段基础设施。

6. **平台覆盖是隐性增长瓶颈**  
   Windows 在 OpenClaw、Hermes、QwenPaw、DeepSeek、AstrBot 中均出现高影响问题；Mac Intel、Linux 桌面、ARM64、中文编码同样反复出现。**跨平台 CI 与默认编码/路径/权限处理**将直接影响开箱体验。

7. **插件生态从“能装”进入“好管、可扩展执行面”**  
   AstrBot 批量管理/分类、OpenClaw provenance、QwenPaw 插件 CLI、Zeroclaw WASM 渠道、Hermes 插件公共接缝、DeepSeek 预设不足，说明插件竞争点已从数量转向**分类治理、权限边界、执行面扩展与开发者体验**。

**对 AI 智能体开发者的参考**：优先投资四类基础能力——① 资源/会话生命周期治理；② 可回滚升级与迁移校验；③ MCP/工具调用容错与统一审批；④ 结构化输出解析共享层 + 属性测试。功能迭代仍重要，但下一阶段的用户留存将更多取决于**稳定运行与安全恢复能力**。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报（2026-11-26）

## 1. 今日速览

过去 24 小时共记录 **61 条 Issue/PR 更新**（Issue 11 条、PR 50 条），**0 个新版本发布**。PR 侧呈现明显的“进多出少”：39 条待合并、仅 11 条合并/关闭（关闭率约 22%），审查与合并吞吐低于提交速度。Issue 侧 8 条新开/活跃、3 条关闭，其中 **4 条为 tracker**（占开放 Issue 的 50%），说明项目正处于架构收敛与发布治理阶段——昨日刚创建 v1.0.0 路线图与 runtime 拆分 tracker。整体活跃度高、方向清晰，但合并积压、CI 稳定性与长周期大型 PR 是当前主要健康度风险。

| 指标 | 数值 | 解读 |
|---|---|---|
| Issue 更新 | 11（活跃 8 / 关闭 3） | 关闭率 27%，以 S2 问题为主 |
| PR 更新 | 50（待合并 39 / 关闭 11） | 合并率 22%，积压比例偏高 |
| 新版本 | 0 | 距 v1.0.0 路线图发布尚早 |
| 新增 tracker | 4 条开放 | 规划/协调类工作占比高 |

---

## 2. 项目进展

今日可见的合并/关闭 PR 集中在**可靠性修复与测试可移植性**，属于“降噪”而非“上新”：

- **[#11872](https://github.com/zeroclaw-labs/zeroclaw/pull/11872)（CLOSED）fix(mcp): replay a tool call rejected for a stale HTTP session** — 处理 Streamable HTTP MCP 服务端终止会话后返回 404 的场景，客户端改为重建会话并重放工具调用，修复长连接场景下的工具调用失败。
- **[#12345](https://github.com/zeroclaw-labs/zeroclaw/pull/12345)（CLOSED）fix(rpc): rehydrate reaped ACP sessions on provider switch** — ZeroCode Code 面板 turn 失败后丢弃 ACP 实例，`/model-provider` 切换时只查 live map 导致会话丢失；修复后可从持久化记录重建 provider-safe 历史。
- **[#12700](https://github.com/zeroclaw-labs/zeroclaw/pull/12700)（CLOSED）test: make path, input polling and gateway drain fixtures portable** — 修复 Windows verbatim path、调度器轮询切片假设、监听器关闭三类平台敏感测试，降低跨平台 CI 噪声。

关闭的 3 条 Issue 同样偏“治理”：

- **[#12167](https://github.com/zeroclaw-labs/zeroclaw/issues/12167)（CLOSED）** `send_message_to_peer` 未校验发送方 autonomy level 与 action budget，`readonly` agent 仍可发起对等 turn；与 `a2a_send` 行为不一致，属安全策略缺口，现已关闭（对应修复 PR 未出现在 Top20 样本中，建议核对关联链接）。
- **[#12107](https://github.com/zeroclaw-labs/zeroclaw/issues/12107)（CLOSED）** dashboard 聊天 socket 中途断开、turn 仍在网关运行时，重连后丢失答案；已关闭。
- **[#8415](https://github.com/zeroclaw-labs/zeroclaw/issues/8415)（CLOSED）** Telegram Bot API 10.1 Rich Messages（含表格渲染），挂起近 5 个月后关闭；标签仍含 `status:icebox`，是“已实现”还是“策略性关闭”需维护者补充结论。

**推进幅度评估**：今日净进展主要体现在 MCP/ACP 会话健壮性、安全策略一致性与跨平台测试三条线；与之相对，Goal V1 十二连发、OIDC、插件化等大型特性仍在队列中，功能面净增量有限。

---

## 3. 社区热点

> 注：本次数据中 PR 评论区显示为 `undefined`，无法按评论数排序，以下以 Issue 讨论度与反应数为准。

1. **[#9363](https://github.com/zeroclaw-labs/zeroclaw/issues/9363)（5 条评论，👍0）** — ZeroCode 与 Web 端配置元数据在非英文 locale 下仍为英文。创建于 2026-07-25，是当前评论最多的活跃 Issue，反映国际化“半成品”状态：外壳已翻译，Config 分组标题、字段标签、RPC 元数据未翻译。
2. **[#12697](https://github.com/zeroclaw-labs/zeroclaw/issues/12697)（3 条评论，👍1）** — 将 `crates/zeroclaw-runtime` 拆分为更小 crate 的 epic tracker，明确记录待决事项、PR 顺序与认领人，是架构治理的强信号。
3. **[#8415](https://github.com/zeroclaw-labs/zeroclaw/issues/8415)（2 条评论，👍2）** — Telegram 富消息/表格渲染，是今日反应数最高的 Issue，渠道体验诉求明确。
4. **[#12712](https://github.com/zeroclaw-labs/zeroclaw/issues/12712)（1 条评论，👍1）** — v1.0.0 路线图，替代 FND-001 §6 的版本计划，定义发布顺序、目标日期与各版本定位。

**背后诉求**：讨论重心正从“加功能”转向“定架构、定版本、定边界”——两个 tracker（runtime 拆分、v1.0.0）同日活跃，配合多条 `breaking-change` PR，说明维护者在为 1.0 做减法和分层；用户侧热点则集中在本地化完整度与渠道渲染质量。

---

## 4. Bug 与稳定性

按严重程度排列（本批次无 S1/Critical）：

| Issue | 严重度 | 状态 | 是否已有 fix PR |
|---|---|---|---|
| [#12710](https://github.com/zeroclaw-labs/zeroclaw/issues/12710) Containerfile `check` 阶段在 StageX 镜像中测试失败，且无 workflow 构建该阶段 | S2（tooling/ci） | OPEN，今日新建 | 未见 |
| [#11760](https://github.com/zeroclaw-labs/zeroclaw/issues/11760) 邮件渠道 active 模式从不设置 `\Seen`，重启后重复回复同一邮件 | S2（channel） | OPEN，in-progress（10-15 起） | 未见 |
| [#12703](https://github.com/zeroclaw-labs/zeroclaw/issues/12703) 同上：live 处理过的邮件保持 UNSEEN，每次重启重放积压 | 未标 Severity，实为同一根因 | OPEN，11-24 新建 | 未见 |
| [#9363](https://github.com/zeroclaw-labs/zeroclaw/issues/9363) 本地化后 Config 元数据仍为英文 | S2（degraded behavior） | OPEN，accepted | 部分：[#12718](https://github.com/zeroclaw-labs/zeroclaw/pull/12718) 修复 schema 查找 miss 时字段帮助丢失，非完整本地化修复 |
| [#12167](https://github.com/zeroclaw-labs/zeroclaw/issues/12167) 对等消息绕过 autonomy/budget | 安全策略 | CLOSED（今日） | 已关闭，修复 PR 待核对 |

**稳定性信号（非 Bug 单，但值得关注）**：

- CI 可靠性债务集中暴露：[#12636](https://github.com/zeroclaw-labs/zeroclaw/pull/12636) 指出 CI 用单条 `curl | tar` 下载 `cargo-nextest`/`cargo-deny`/`cargo-audit`，一次 5xx 即整 job 失败（11-09 已发生）；[#11907](https://github.com/zeroclaw-labs/zeroclaw/pull/11907) 定位 provider 测试偶发失败源于共享状态而非时序。
- [#11881](https://github.com/zeroclaw-labs/zeroclaw/pull/11881) 自述“本地校验未通过、review FAIL、hosted Security 与 CI Required Gate 均失败”，是 Goal V1 系列阻塞的直接证据。
- 邮件渠道同一根因被两次报告（#11760、#12703），间隔 6 周且均无 fix PR，属**重复用户可感知故障**，建议提升优先级。

---

## 5. 功能请求与路线图信号

**已明确进入实施轨道的：**

- **OIDC 设备会话**：[#12707](https://github.com/zeroclaw-labs/zeroclaw/issues/12707)（tracker，ADR-017）昨日创建，今日即落地两个切片 PR——[#12716](https://github.com/zeroclaw-labs/zeroclaw/pull/12716)（enrollment 增加 refresh/revocation 请求，slice 1）与 [#12717](https://github.com/zeroclaw-labs/zeroclaw/pull/12717)（refresh grant 的持有、封存与证书账本存储，slice 2–3）。响应速度是今日最佳，进入下一版本的确定性高。
- **ACP/网关身份与重连**：[#12653](https://github.com/zeroclaw-labs/zeroclaw/pull/12653) 为 `/acp` 增加 OIDC 认证、principal 作用域与 turn 重连回放，与已关闭的 #12107 形成同一条 UX 主线。
- **渠道插件化（breaking）**：[#12443](https://github.com/zeroclaw-labs/zeroclaw/pull/12443) 将 IRC/Twitch 移出二进制改为 WASM 插件；[#12440](https://github.com/zeroclaw-labs/zeroclaw/pull/12440) 新增 host 介导的 `dispatch.wake`；[#12678](https://github.com/zeroclaw-labs/zeroclaw/pull/12678) 移除已被 Antigravity CLI 取代的 `gemini_cli` 工具。三者均标注 `breaking-change`/`!`，明显瞄准 1.0 的破坏性窗口。
- **Provider 能力扩张**：[#12578](https://github.com/zeroclaw-labs/zeroclaw/pull/12578) 支持 Qwen MP4 视频文件输入（`video_url` + base64，覆盖流式/非流式/历史/原生工具调用）；[#12452](https://github.com/zeroclaw-labs/zeroclaw/pull/12452) 让 ZeroCode 配置并选择 canonical provider model。

**存在不确定性的：**

- **Goal V1 十二连发**（[#11879](https://github.com/zeroclaw-labs/zeroclaw/pull/11879) / [#11880](https://github.com/zeroclaw-labs/zeroclaw/pull/11880) / [#11881](https://github.com/zeroclaw-labs/zeroclaw/pull/11881) 等）自 10-19 起堆叠，头部 PR 仍为 Draft 且校验失败。建议维护者明确“继续推进 / 拆分降级 / 关闭重开”的决策，避免长期占用审查带宽。
- **Telegram 富消息** #8415 已关闭但无对应实现 PR 可见，若为“暂缓”，建议在 Issue 中留下结论以免重复提出。

---

## 6. 用户反馈摘要

- **国际化体验不完整（不满）**：#9363 的 5 条评论显示，用户接受“部分翻译”，但 Config 元数据、分组标题、RPC 返回仍是英文，形成中英混排；这类“半本地化”比不翻译更影响专业用户观感。
- **邮件渠道重复回复（强不满，可信度高的真实场景）**：#11760 与 #12703 从不同作者、不同时间报告同一现象——daemon 运行期间处理的邮件未置 `\Seen`，重启后 startup drain 重新取回全部 UNSEEN 并再次派发/回复。对真实收件人而言这是“机器人重复回信”，属对外可见事故，修复优先级应高于其标签所示。
- **对等 agent 安全边界（安全感诉求）**：#12167 指出 `readonly` agent 仍可通过 `send_message_to_peer` 启动他人 turn 且不消耗 action budget，与 `a2a_send` 行为不一致。用户期待的是**策略在同类工具间一致生效**，而非单点拦截。
- **渠道渲染质量（功能期待）**：#8415 获得今日最高 👍（2），诉求是 Telegram 端表格/富文本可用，属“能看懂”的基础体验，而非锦上添花。
- **贡献者体验（挫败感）**：#12636、#12700、#11907 三份 PR 均源于 CI 脆弱性——下载失败、平台路径差异、共享状态导致的偶发失败，直接消耗外部贡献者的重试成本。
- **作者响应性**：#11510、#11727、#11881 均带 `needs-author-action`，说明部分 PR 卡在作者侧而非 reviewer 侧。

---

## 7. 待处理积压（建议维护者关注）

| 条目 | 滞留时长 | 风险点 |
|---|---|---|
| [#9363](https://github.com/zeroclaw-labs/zeroclaw/issues/9363) Config 本地化 | 自 07-25，约 4 个月 | 评论最多（5 条）却仅有部分修复 PR #12718，易反复被报告 |
| [#11760](https://github.com/zeroclaw-labs/zeroclaw/issues/11760) 邮件重复回复 | 自 10-15，约 6 周 | `in-progress` 但无 fix PR；已有重复报告 #12703，对外可见故障 |
| [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) 持久化 session prompt attachments | 自 08-27，约 3 个月 | size:XL + risk:high，跨 agent/channel/runtime 多模块，审查成本极高 |
| [#11881](https://github.com/zeroclaw-labs/zeroclaw/pull/11881) / [#11880](https://github.com/zeroclaw-labs/zeroclaw/pull/11880) / [#11879](https://github.com/zeroclaw-labs/zeroclaw/pull/11879) Goal V1 系列 | 自 10-19，约 5 周 | Draft + 校验失败 + `needs-author-action`，且为 12 连发堆叠，阻塞后续切片 |
| [#11510](https://github.com/zeroclaw-labs/zeroclaw/pull/11510) / [#11727](https://github.com/zeroclaw-labs/zeroclaw/pull/11727) ZeroCode 配置删除确认 / 会话恢复 | 自 10-03 / 10-14 | 均 `needs-author-action`，UX 改进长期悬置 |
| [#11119](https://github.com/zeroclaw-labs/zeroclaw/issues/11119) 接收方自主决定的会话消息 tracker | 自 09-25，约 2 个月 | risk:high + 跨 identity/agent-loop/zerocode，评论仅 1 条，协调度低 |
| [#11907](https://github.com/zeroclaw-labs/zeroclaw/pull/11907) 测试共享状态修复 | 自 10-20，约 5 周 | size:XS 却长期未合，属“低成本高收益”却被忽略的类型 |

**建议动作**：① 为邮件渠道 #11760 指派 owner 并关联 fix PR，合并 #12703 去重；② 就 Goal V1 系列给出明确的合并/关闭决策；③ 优先合并 #11907、#12636 这类小体量 CI 修复，直接改善后续所有 PR 的通过率；④ 在 #8415 关闭时补充结论文档。

---

### 数据说明

本报告基于过去 24 小时更新的 11 条 Issue 与 50 条 PR 中已展示的 20 条 PR 样本；PR 评论数在该数据源中为 `undefined`，故未做评论维度排序；39 条待合并 PR 中仅 3 条关闭/合并记录在样本内可见，其余 8 条合并情况未纳入分析。所有结论以可见数据为限，未对未展示内容做推断。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-11-26）

## 1. 今日速览

- 过去24小时：Issues 更新 **0 条**，PR 更新 **3 条且全部为 CLOSED**，待合并 PR **0 条**，新版本 **0 个**。
- 今日整体属于**低讨论、维护清理型活跃**：没有新 Issue、没有新 Release，但关闭了 3 条历史 PR。
- 关闭项覆盖配置覆盖 Bug、多 PR 修复整合，以及一条因 `[stale]` 关闭的法语 UI 本地化功能。
- 社区互动数据较弱：PR 评论数据缺失（`undefined`），点赞均为 0，难以形成讨论热度或情绪判断。
- 项目健康度信号：**PR 积压得到清理、待合并归零、无新增 Bug 报告**；但用户可见变更是否落地仍需等待后续版本发布确认。

## 2. 版本发布

今日无新版本发布，暂无破坏性变更或迁移注意事项。

## 3. 项目进展

今日 PR 队列净关闭 3 条，待合并为 0，维护侧清理明显。

- **[#1558] fix: merge PR #1344 #1342 #1341 #1331 — CLOSED**  
  链接：https://github.com/sipeed/picoclaw/pull/1558  
  该 PR 汇总合并多个开放 PR 的修复，属于历史修复整合与 PR 积压清理。其价值在于减少分散待合并项，但摘要未展开具体修复内容，建议后续 Release Notes 补充可追溯说明。

- **[#957] fix(config): prevent default ModelList from overriding user config — CLOSED**  
  链接：https://github.com/sipeed/picoclaw/pull/957  
  关联 Issue #680：https://github.com/sipeed/picoclaw/issues/680  
  修复部分配置用户省略 `api_base` 时错误继承默认值、进而触发 401 的问题。该修复对配置稳定性和首次/部分配置用户体验有直接影响。

- **[#3467] feat(web): add French UI locale — CLOSED [stale]**  
  链接：https://github.com/sipeed/picoclaw/pull/3467  
  为 Web launcher 增加完整法语 locale，包括 `fr.json`、i18next 资源注册、dayjs locale 处理及登录/设置/仪表盘语言菜单入口。但因标记 `[stale]` 关闭，是否进入主线需维护者后续确认。

**整体推进评估**：今日以“关闭/清理”为主，关闭 3 条 PR、待合并归零；其中 2 条与修复相关，1 条为本地化功能。由于无新版本发布，实际用户可见收益需等待后续发布验证。

## 4. 社区热点

今日无新增 Issues；3 条 PR 的评论数据未返回（`undefined`），点赞均为 0，无法按评论数或反应数排序形成真实热点。相对值得关注的是：

- **#1558 多 PR 修复整合**：https://github.com/sipeed/picoclaw/pull/1558  
  体现维护者清理长期分散 PR、集中收口修复的诉求。
- **#957 配置覆盖 Bug 修复**：https://github.com/sipeed/picoclaw/pull/957  
  背后是部分配置用户对 `api_base` 被默认值覆盖导致 401 的真实使用痛点。
- **#3467 法语 UI 本地化**：https://github.com/sipeed/picoclaw/pull/3467  
  反映 Web 端国际化需求，但因 stale 关闭，社区贡献延续性存在不确定性。

## 5. Bug 与稳定性

- 今日新报告 Bug：**0 条**；无崩溃、回归类新 Issue。
- **已关闭修复：配置覆盖导致 401，严重度中高（影响配置可用性与认证）**  
  PR #957：https://github.com/sipeed/picoclaw/pull/957  
  Issue #680：https://github.com/sipeed/picoclaw/issues/680  
  问题场景：用户仅配置 `model_name` 和 `api_key`、省略 `api_base` 时，默认 ModelList 错误覆盖用户配置，返回 `401 令牌已过期或验证不正确`。修复后部分配置用户不再被错误覆盖，新用户仍获得默认模型模板。已有 fix PR 且已关闭。
- **#1558 汇总多个修复 PR**：https://github.com/sipeed/picoclaw/pull/1558  
  具体缺陷细节未在摘要展开，建议发布说明中补充，以便确认是否覆盖其他稳定性问题。
- 稳定性判断：今日无新增故障信号，但样本量极低；配置类问题建议在下一版本发布后重点观察回归。

## 6. 功能请求与路线图信号

- 今日无新功能请求 Issue。
- **法语 UI locale（#3467）**：https://github.com/sipeed/picoclaw/pull/3467  
  功能完整度较高，包含翻译文件、i18next/dayjs 注册和多页面语言菜单。但因 `[stale]` 关闭，短期纳入下一版本的概率偏低，除非维护者重新激活或由新 PR 重提。
- **#1558 多 PR 整合**：https://github.com/sipeed/picoclaw/pull/1558  
  显示当前路线图信号更偏向修复收口与积压清理，而非大型新功能推进。
- 下一版本可能优先体现配置稳定性与历史修复整合；国际化需求是否进入路线图仍需维护者明确表态。

## 7. 用户反馈摘要

注：今日无 Issue 评论数据，以下提炼自 PR 摘要及关联 Issue，并非评论情绪统计。

- **配置痛点**：部分配置用户遇到 `api_base` 被默认 ModelList 覆盖，导致 401，影响实际使用。用户期望省略字段时仍尊重用户配置，而不是被默认值错误覆盖。  
  链接：https://github.com/sipeed/picoclaw/pull/957 、https://github.com/sipeed/picoclaw/issues/680
- **国际化诉求**：Web launcher 需要完整法语 UI，包括登录、设置、仪表盘和 dayjs 本地化。  
  链接：https://github.com/sipeed/picoclaw/pull/3467
- **满意度判断**：评论与反应数据缺失，无法量化满意/不满意；但从 PR 关闭看，维护侧对配置修复和积压清理有响应。`stale` 关闭本地化 PR 可能让贡献者对后续合并预期不明确。

## 8. 待处理积压

- 根据提供数据，今日**无开放 Issue、无待合并 PR**，积压清理明显。
- **#1558 长期 PR 已关闭**：创建于 2026-03-14，更新并关闭于 2026-11-25。建议在发布说明中记录其汇总的 #1344/#1342/#1341/#1331，避免修复不可追溯。  
  链接：https://github.com/sipeed/picoclaw/pull/1558
- **#957 长期配置 Bug 修复已关闭**：创建于 2026-03-01，关闭于 2026-11-25。需确认修复是否进入正式发布。  
  链接：https://github.com/sipeed/picoclaw/pull/957
- **#3467 法语 locale 因 stale 关闭**：创建于 2026-11-10，关闭于 2026-11-25。若社区仍有国际化需求，建议维护者明确重开、替代 PR 或暂缓策略。  
  链接：https://github.com/sipeed/picoclaw/pull/3467

**维护提醒**：今日无新增 Issue 不等于无问题，可能只是报告量低；建议在下一版本发布后重点观察配置覆盖类问题是否回归，并对 stale 关闭的本地化功能给出明确路线图信号。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 · 2026-11-26

---

## 1. 今日速览

过去 24 小时项目维持高强度迭代节奏：**28 条 Issue 更新**（新开/活跃 22，关闭 6）、**50 条 PR 更新**（待合并 29，已合并/关闭 21），**无新版本发布**。合并侧以稳定性修复为主（llama-server 孤儿进程、Telegram 论坛话题会话隔离），另有大批小颗粒度修复 PR 处于评审队列。Issue 侧出现两波明显的"体系化提交"：@passionworkeer 的 JSON/解析边界缺陷审计（9 条，含 2 条已关闭）与 @tanbopiao 的记忆隔离、沙箱与安全默认值设计议题（5 条）。平台差异问题依旧突出——Windows 上 ReMe 标签索引失败（#8863）与内置 provider 上下文元数据缺失（#8891）持续拉低开箱体验。**活跃度评估：高（PR 吞吐 42%、Issue 关闭率 21%），但评审队列中积压多个 XXL/XXXL 级 PR，且 2.3.0/post1 仍有 P1 级缺陷未落地修复。**

> 数据说明：本批次所有 Issue 的 👍 计数均为 0，PR 评论数未返回（`undefined`），因此社区声量判断主要依据评论数与提交者分布。

---

## 2. 版本发布

无新版本发布。相关信号：Release Duty 跟踪 issue **#8861（v2.3.1-beta.1 安装验证）已于 11-25 关闭**，说明 Beta 版四平台安装校验已完成，v2.3.1 正式版进入待发窗口。建议维护者在 GA 前确认下列 Beta 期回归已被覆盖（尤其 #8888 报告于 2.3.1-beta.1）。

- https://github.com/agentscope-ai/QwenPaw/issues/8861

---

## 3. 项目进展

今日合并/关闭的 PR 数量可观（21 条），但展示样本中仅 2 条明确关闭，二者均属"用户可感知的稳定性修复"：

| PR | 内容 | 价值 |
|---|---|---|
| [#8841](https://github.com/agentscope-ai/QwenPaw/pull/8841) `fix(plugins)` | 修复 `llama-server.exe` 在 backend 崩溃后继续存活的问题；补丁打到 #8499 迁移后的新路径 `plugins/provider/local-llamacpp/` | 消除本地模型场景下的进程泄漏与端口占用，属长期困扰的运维级缺陷 |
| [#8857](https://github.com/agentscope-ai/QwenPaw/pull/8857) `feat(telegram)` | 按 forum topic 隔离 agent 会话，此前同一 forum 内所有 topic 共享 `telegram:<chat_id>` 的会话、记忆与 Console 对话 | 首次贡献者提交，通道侧多租户语义补齐；关联 issue [#8827](https://github.com/agentscope-ai/QwenPaw/issues/8827) 同步关闭 |

同步关闭的 Issue 还包括：[#8464](https://github.com/agentscope-ai/QwenPaw/issues/8464)（手动 `/compact` 无视会话级模型切换）、[#8856](https://github.com/agentscope-ai/QwenPaw/issues/8856)（Console 表格/长行被裁切无横向滚动）、[#8918](https://github.com/agentscope-ai/QwenPaw/issues/8918)/[#8919](https://github.com/agentscope-ai/QwenPaw/issues/8919)（`video_memory` 分段与图合并崩溃）。

**推进评估**：今日进展集中在"消除崩溃与资源泄漏"这一层，未涉及架构级能力；但 #8857 为通道隔离建立了可复用模式（topic/thread → session key），对后续 Discord thread、飞书话题等同类需求有直接参考价值。

---

## 4. 社区热点

按评论数排序：

1. **[#8464](https://github.com/agentscope-ai/QwenPaw/issues/8464)（6 评论，已关闭）** — 手动 `/compact` 始终使用 `agent.json` 的 `active_model`，忽略会话级模型切换。背后诉求：**模型解析作用域混乱**。用户明确在 UI 切到 M2，但后台仍走 M1；当 M1 严格校验参数返回 400 时，压缩功能对该会话永久不可用（复现上下文 34 万 token）。
2. **[#8863](https://github.com/agentscope-ai/QwenPaw/issues/8863)（5 评论，OPEN）** — Windows 上 ReMe 标签索引永久失败（`Invalid workspace-relative tag-index path`），`2.3.0` 与 `2.3.0.post1` 双版本、两台独立机器均复现。背后诉求：**Windows 一等公民地位**。记忆标签页在 Windows 上完全不可用，且已升级版本仍未解决。
3. **[#8727](https://github.com/agentscope-ai/QwenPaw/issues/8727)（3 评论，OPEN）** — `disable_thinking=True` 在 OpenAI Responses 协议下剥离 `reasoning` 字段而非表达"不重新推理"，导致默认 reasoning 吃掉 4000 token 输出预算时续写摘要失败。诉求：**协议语义映射需精确对齐厂商实现**。
4. **[#8892](https://github.com/agentscope-ai/QwenPaw/issues/8892)（3 评论，OPEN）** — 请求在输入区增加 "AI Prompt Polishing" 按钮，自动改写用户输入为更结构化的提示词。诉求：把"提示词工程"下沉为产品能力。
5. **[#8891](https://github.com/agentscope-ai/QwenPaw/issues/8891)（3 评论，OPEN）** — 静态上下文表缺少 `glm-5.3/5.4` 且无 `glm` 家族回退；`catalog_only` provider 从不拉取上下文元数据，导致新模型一律回落 128k 默认值。诉求：**上下文窗口探测应与模型目录解耦**。

**观察**：热门议题高度集中在"模型解析与元数据"这一条主线上（#8464、#8891、#8893、#8727），说明模型层抽象在 v2.3.x 已成为体验瓶颈，建议作为 2.4 的主题式重构项。

---

## 5. Bug 与稳定性

按严重程度排列（含是否已有修复 PR）：

### P1 — 功能整体不可用 / 会话级污染

- **[#8863](https://github.com/agentscope-ai/QwenPaw/issues/8863) Windows ReMe 标签索引永久失败**（OPEN，影响 2.3.0 及 post1 全部 Windows 用户）
  → 已有修复 PR **[#8786](https://github.com/agentscope-ai/QwenPaw/pull/8786) `chore(deps): bump reme-ai to 0.4.2.3`**（size/XS，Under Review 已 9 天），根因在 ReMe #717 修复；同时有 **[#8921](https://github.com/agentscope-ai/QwenPaw/pull/8921)** 改善 503 的错误可解释性与重建入口。**建议优先合并 #8786——XS 改动解锁 P1 缺陷。**
- **[#8887](https://github.com/agentscope-ai/QwenPaw/issues/8887) 工具结果中的媒体块导致非多模态模型 400，并使后续所有消息返回 "Internal error"**（OPEN）
  → 修复 PR **[#8920](https://github.com/agentscope-ai/QwenPaw/pull/8920)**：对 generic `400 Invalid request parameters` 做一次去媒体重试。属"会话被污染后无法自愈"的高危形态。
- **[#8464](https://github.com/agentscope-ai/QwenPaw/issues/8464) `/compact` 忽略会话级模型**（已关闭，需确认修复随 2.3.1 发布）

### P2 — 特定路径失败 / 可绕过

- **[#8877](https://github.com/agentscope-ai/QwenPaw/issues/8877) OpenAI 兼容流的"无状态码过载"绕过重试**（OPEN，`2.3.0.post1` 与 `main@228e303` 复现）——HTTP 200 后通过 SSE 下发 overloaaded 错误，现有重试逻辑不识别。**无 PR，建议尽快补。**
- **[#8727](https://github.com/agentscope-ai/QwenPaw/issues/8727) 续写摘要在 reasoning 占满输出预算时失败**（OPEN，13 天无 PR）
- **[#8903](https://github.com/agentscope-ai/QwenPaw/issues/8903) 代码模式 `run_tool_batch` 调用失败（ToolNotFoundError）**（OPEN）
  → 修复 PR **[#8923](https://github.com/agentscope-ai/QwenPaw/pull/8923)**（first-time-contributor），根因为 `CodeModeToolkit.call_tool` 把调用转发进只含单工具的 `_execution_toolkit`。
- **[#8888](https://github.com/agentscope-ai/QwenPaw/issues/8888) Console 转录区在内容高度收缩时回跳数屏**（OPEN，**报告于 2.3.1-beta.1**，属 Beta 期未收敛回归）
  → 修复 PR **[#8901](https://github.com/agentscope-ai/QwenPaw/pull/8901)**（XL），采用锚定消息视口偏移方案。
- **[#8893](https://github.com/agentscope-ai/QwenPaw/issues/8893) Console 模型设置缺少 agent 作用域，chat picker 仅会话级，已配置的 agent 模型可能显示为"无模型"**（OPEN）——与 #8464 同源。

### P3 — 边界/健壮性缺陷批量上报（多为 1 行级修复）

@passionworkeer 于 11-25 集中提交 9 条解析层缺陷，**8 条已有或可对应到配套 PR**，三检响应迅速：

| Issue | 缺陷 | 状态 |
|---|---|---|
| [#8919](https://github.com/agentscope-ai/QwenPaw/issues/8919) | `merged_graph_payload()` 遇 null 主题崩溃 | CLOSED |
| [#8918](https://github.com/agentscope-ai/QwenPaw/issues/8918) | `plan_segments()` 返回超 `max_scene_sec` 片段 | CLOSED |
| [#8916](https://github.com/agentscope-ai/QwenPaw/issues/8916) | `extract_json()` 被散文中的游离括号误导 | OPEN |
| [#8914](https://github.com/agentscope-ai/QwenPaw/issues/8914) | `extract_json_payload()` 在散文括号前停下 | OPEN |
| [#8912](https://github.com/agentscope-ai/QwenPaw/issues/8912) | 飞书 `extract_json_key()` 对非对象 JSON 抛 AttributeError | OPEN → PR [#8913](https://github.com/agentscope-ai/QwenPaw/pull/8913) |
| [#8910](https://github.com/agentscope-ai/QwenPaw/issues/8910) | `_schema_permits_string()` 忽略 `allOf`，字符串字段不被强转 | OPEN |
| [#8908](https://github.com/agentscope-ai/QwenPaw/issues/8908) | `as_list()` 把 null 关键字变成字符串 `"None"` | OPEN |
| [#8906](https://github.com/agentscope-ai/QwenPaw/issues/8906) | `_first_text_in_list()` 遇空文本块返回 `""`，丢弃真实答案 | OPEN |
| [#8904](https://github.com/agentscope-ai/QwenPaw/issues/8904) | JSON Pointer 数组索引用裸 `int()`，负中间段静默写错元素（违反 RFC 6901 §4） | OPEN |

> **稳定性判断**：这批缺陷单独看均属边界情形，但共同指向一个系统性问题——**LLM 输出的非结构化文本与结构化解析之间缺少统一、经模糊测试的入口层**。建议维护者不只逐个 merge，而是规划一个共享的 `json_extract` 工具模块 + 属性测试（hypothesis），否则同类 issue 会持续涌入。

### 测试基建

- **[#8925](https://github.com/agentscope-ai/QwenPaw/issues/8925) `pytest -n` 在 collection 阶段中止**（OPEN）——handler 契约参数化基于 `set` of class objects，各 xdist worker 按 identity 哈希导致顺序不一致。
  → 修复 PR **[#8926](https://github.com/agentscope-ai/QwenPaw/pull/8926)**（XS）排序参数化。另有 **[#8927](https://github.com/agentscope-ai/QwenPaw/pull/8927)** 消除 shutdown 测试的时序抖动。CI 可信度类修复，建议快车道。

---

## 6. 功能请求与路线图信号

| 需求 | 来源 | 纳入下一版本的可能性 |
|---|---|---|
| **AI Prompt Polishing 按钮**（输入区一键改写提示词） | [#8892](https://github.com/agentscope-ai/QwenPaw/issues/8892) | 中。纯前端 + 一次模型调用，实现成本低；但需定义"改写后是否覆盖原输入"的交互与 token 计费口径，暂无 PR |
| **Telegram 论坛话题会话隔离** | [#8827](https://github.com/agentscope-ai/QwenPaw/issues/8827) → PR [#8857](https://github.com/agentscope-ai/QwenPaw/pull/8857) | **已落地**（11-26 关闭） |
| **模型上下文元数据自动探测**（glm-5.3/5.4 及 catalog_only provider） | [#8891](https://github.com/agentscope-ai/QwenPaw/issues/8891) | 高。属正确性缺陷而非新特性，且与 #8893 模型作用域问题同批，适合合并为一次"模型注册表"改造 |
| **Agent 级模型作用域** | [#8893](https://github.com/agentscope-ai/QwenPaw/issues/8893) | 高。Console 已有 agent card 入口，缺的是后端 scope 语义，属 v2.3.x 补丁级可解 |
| **自定义 decision model endpoint** | PR [#8928](https://github.com/agentscope-ai/QwenPaw/pull/8928) | 中高。first-time-contributor，size/L，扩展现有 custom provider 解析器，风险面小 |
| **ReMeLight 独立记忆写入模型** | PR [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) | 中。解决"记忆写入烧贵模型"的成本痛点，但已挂 75 天，需 reviewer 介入 |
| **Reranker 模型中心 + 多查询精度历史** | PR [#8472](https://github.com/agentscope-ai/QwenPaw/pull/8472) | 中。XXXL，与 Embedding 模型中心对齐，属检索质量基础设施 |
| **Linux 桌面打包（deb / AppImage）** | PR [#8444](https://github.com/agentscope-ai/QwenPaw/pull/8444) | 中。补齐 Windows/macOS 之外的第三平台，size/XL，需 CI 侧配合 |
| **插件 CLI 命令与扩展点** | PR [#8554](https://github.com/agentscope-ai/QwenPaw/pull/8554) | 中。XXXL，把插件从"配置项"升级为"可注册 Click 命令"，生态化关键一步 |
| **Antigravity CLI (ACP) harness 插件** | PR [#8922](https://github.com/agentscope-ai/QwenPaw/pull/8922) | 中。第三方 harness 后端，验证插件架构的开放性 |

**路线图信号解读**：项目正在从"单一 Agent 助手"向"多 harness / 多 provider / 可插件化"演进（#8922、#8554、#8928 三者构成同一方向）。同时 @tanbopiao 提交的 5 条设计议题（[#8881](https://github.com/agentscope-ai/QwenPaw/issues/8881) 检索层租户隔离、[#8882](https://github.com/agentscope-ai/QwenPaw/issues/8882) 引用计数的记忆归档、[#8880](https://github.com/agentscope-ai/QwenPaw/issues/8880) skill 扫描默认 fail-open、[#8879](https://github.com/agentscope-ai/QwenPaw/issues/8879) 沙箱资源上限未实际执行、[#8878](https://github.com/agentscope-ai/QwenPaw/issues/8878) 编码模式最小出网策略）实质是**一份"安全与多租户硬化"提案集**，若被接受，将是 2.4 的主要工程量。

---

## 7. 用户反馈摘要

**真实痛点**

1. **模型切换的"最后一公里"断裂**——用户在 UI 上做的选择没有被后端一致地尊重：手动压缩走 agent 默认模型（#8464），Console 无法为单个 agent 配模型、picker 仅会话级（#8893）。用户的实际心智模型是"我在这个会话选了 M2，就该全用 M2"，而实现是三层（agent / session / global）语义混用。
2. **Windows 体验断层**——两台独立 Win10 机器复现标签索引失败（#8863），且 `2.3.0.post1` 内置的 `reme-ai 0.4.2.0` 仍含该缺陷；同时 Windows 11 26H2 + WebView2 157 上出现转录区回跳（#8888）。桌面端是 Windows 优先分发，此类问题杀伤面大。
3. **上下文窗口被"猜"成 128k**——新模型（glm-5.3/5.4）落表缺失即回落默认值（#8891），用户面对的是"明明配了 1M 上下文却提前压缩"的困惑，且无从自查。
4. **记忆"该记的忘、该忘的留"**——#8882 引用 #7571（8 评论）指出 agent "keeps forgetting"重要信息而陈旧条目堆积，根因是蒸馏记忆无 TTL、无引用计数、无衰减，只能靠目录约定隔离（#8881）。这是对 README "Never forgets" 承诺的直接反讽。
5. **安全默认值偏松**——skill 扫描默认 `warn` 模式在 CRITICAL 发现下仍然安装、扫描超时也 fail open（#8880）；`max_processes`/`max_memory_mb` 文档诚实标注"未被任何 backend 执行"（#8879）。反馈者语气克制且明确肯定了 Landlock 文件系统隔离的真实性（#8878），属高质量建设性批评。

**使用场景线索**：34 万 token 长会话手动压缩（#8464）、Docker 部署 + Python 3.11（#8727）、Telegram 论坛超群多话题并行（#8827）、`view_video`/`send_file_to_user` 等媒体工具链（#8887）、多 agent 工作区共存（#8881）——用户已把 QwenPaw 用在**长上下文 + 多通道 + 多 agent** 的生产型场景，而非单纯尝鲜。

**满意点**：沙箱实现的"诚实文档"被明确表扬（#8878）；Release Duty 自动化流程运转正常（#8861 按期关闭）；一次贡献者能顺利提交通道级特性（#8857）。

---

## 8. 待处理积压（提醒维护者关注）

### 高优先级 × 低改动量（应插队）

- **[PR #8786](https://github.com/agentscope-ai/QwenPaw/pull/8786)** — `bump reme-ai to 0.4.2.3`，size/XS，已挂 **9 天**，直接决定 P1 缺陷 #8863 是否修复。这是当前投入产出比最高的一个动作。
- **[Issue #8727](https://github.com/agentscope-ai/QwenPaw/issues/8727)** — Responses 续写摘要失败，**13 天无 PR**，影响长会话续写主路径。
- **[Issue #8877](https://github.com/agentscope-ai/QwenPaw/issues/8877)** — SSE 无状态码过载绕过重试，已有 mock transport 复现，**无 PR**，属网关兼容性的常见踩坑点。

### 长期挂起的大 PR（需指派 reviewer 或明确取舍）

| PR | 类型 | 挂起时长 | 备注 |
|---|---|---|---|
| [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) | feat(memory) 独立记忆写入模型 | **75 天**（2026-09-12） | XXL，Under Review；成本优化诉求明确，长期无人推进易流失贡献者 |
| [#8444](https://github.com/agentscope-ai/QwenPaw/pull/8444) | feat(desktop) Linux deb/AppImage | 31 天 | XL，需 CI 与 RELEASING.md 同步改动，跨团队协调成本高 |
| [#8472](https://github.com/agentscope-ai/QwenPaw/pull/8472) | feat(memory) Reranker 模型中心 | 29 天 | XXXL，Under Review |
| [#8554](https://github.com/agentscope-ai/QwenPaw/pull/8554) | feat(plugins) CLI 命令与扩展点 | 23 天 | XXXL，插件生态关键路径 |
| [#8707](https://github.com/agentscope-ai/QwenPaw/pull/8707) | fix(crons) 定时任务 token 用量落账 | 13 天 | L，Console 用量面板长期少计，属数据准确性问题 |
| [#8785](https://github.com/agentscope-ai/QwenPaw/pull/8785) | fix(media) 内联预算与拒绝后重缩放 | 9 天 | XXL，与 #8887 媒体链路同域，建议合并评审 |

### 设计议题待表态

[@tanbopiao 的 5 条 design/security issue](https://github.com/agentscope-ai/QwenPaw/issues/8881)（#8878–#8882）均只有 1 条评论，尚未见维护者给出"接受 / 拒绝 / 转 RFC"的明确结论。这类议题若长期沉默，会同时损失贡献者意愿与安全债的可见性，建议至少在 issue 上标注 milestone 或 `needs-design`。

---

**健康度小结**：吞吐健康（PR 关闭 21/50），响应及时（多数新 issue 24h 内有评论或配套 PR），但存在三处结构性风险——① **评审带宽被多个 XXXL PR 占用**，导致 XS 级关键修复（#8786）排队；② **模型解析与元数据层缺乏统一抽象**，同类 issue 反复出现（#8464/#8891/#8893/#8727）；③ **解析健壮性缺少共享入口与属性测试**，@passionworkeer 的 9 条审计只是抽样结果。建议 2.4 规划中把"模型注册表"与"结构化输出解析层"列为两个独立工作流。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：2026-11-26** ｜ 数据窗口：过去 24 小时 ｜ 来源：GitHub 公开数据

---

## 1. 今日速览

- **高活跃、强积压并存**：24 小时内 Issues 更新 342 条（新开/活跃 323、关闭 19），PR 更新 500 条（待合并 383、已合并/关闭 117），另发布 1 个 canary 版本，属于典型的“开发吞吐高、但关闭速度跟不上新增”的状态。
- **Issue 关闭率偏低**：关闭/更新比约 **5.6%**（19/342），说明今日大部分动作是新增与讨论，而非收敛；PR 侧关闭/合并比约 **23.4%**（117/500），仍有 **383 条待合并**，评审队列压力显著。
- **讨论焦点集中在架构与自动化可靠性**：RFC #143379 以 57 条评论遥遥领先；Kanban 调度器 `blocker_auth` 死锁类问题（#119070、#121281）持续发酵，是当前最具“系统性”特征的缺陷簇。
- **存在 1 个未收敛的 P0**：#147938（Windows 上 state.db 校验把活锁误判为损坏，回滚到数月前快照），已开放 24 天，本次采样中未见对应 fix PR。
- **版本节奏稳定**：v0.23.x canary 持续日更，桌面端构建产物正常发布，但发布说明在本次数据中不完整，无法确认破坏性变更。

---

## 2. 版本发布

### canary.20261125T064800Z-v0.23.4
- **发布时间**：2026-11-25
- **通道**：canary（预发布，非稳定通道）
- **链接**：https://github.com/NousResearch/hermes-agent/releases/tag/canary.20261125T064800Z-v0.23.4
- **已知内容**：发布说明包含构建产物表，提供 **Hermes Desktop** 桌面端下载，含 macOS Apple Silicon（M 系列）DMG 等条目（说明文本在数据源中被截断）。
- **破坏性变更 / 迁移注意事项**：本次提供的发布摘录中**未包含**破坏性变更、配置迁移或数据库升级说明。结合项目近期 Issue 语境（v0.22.1 → v0.23.2 期间存在 `state.db` 校验、更新器重启、provider 插件注册等变更），建议：
  - 生产/常驻实例继续停留在 stable 通道，canary 仅用于验证；
  - 升级前手动备份 `state.db`（参见下方 P0 #147938 的风险场景）；
  - 关注 `webapp.public_url`、`secrets:` 外部密钥源相关迁移提示（PR #160224 正在补充该报错文案）。

> 说明：仅有 1 个 release 且描述不完整，故本节不做逐条 changelog 还原，避免推测。

---

## 3. 项目进展

今日已合并/关闭 117 条 PR，以下为采样中可见的**有明确价值**的收敛项：

### 已关闭 PR（功能/修复落地）
| PR | 内容 | 价值 |
|---|---|---|
| [#128785](https://github.com/NousResearch/hermes-agent/pull/128785) | 限制单次完成通知携带的文档产物数量 | 修复生产环境中“一次完成通知上传数百个文件、刷爆聊天窗口”的体验问题；该 PR 自 9-30 开放，历时近两月收敛 |
| [#123498](https://github.com/NousResearch/hermes-agent/pull/123498) | Skills 生产实践文档：builtin 技能不可删除、agy 输出格式/effort、opencode `--model` id、xlsx 批量读取 | 降低新用户踩坑成本，来自真实多智能体 Kanban 战役的实践总结 |
| [#122191](https://github.com/NousResearch/hermes-agent/pull/122191) | Kanban 相对路径产物改为基于**任务工作区**解析 | 修复产物“静默丢失”（此前按调用进程 cwd 解析，导致 `is_relative_to` 校验失败） |
| [#159834](https://github.com/NousResearch/hermes-agent/pull/159834) | macOS `/usr/bin/git` CLT 桩保护，覆盖运行时与 doctor | 消除 macOS 上因未安装 Command Line Tools 触发的弹窗与 doctor 误报 |

### 已关闭 Issue（对应缺陷收敛）
- [#156709](https://github.com/NousResearch/hermes-agent/issues/156709)（P2）：`FooteredReply` 导致 `gateway/session_events.py` 中 `copy.deepcopy` 抛 `TypeError`，开启 `display.runtime_footer` 后会话事件发布失败。
- [#150617](https://github.com/NousResearch/hermes-agent/issues/150617)（P2）：完成通知忽略 `completion_output_chars` 且硬编码 `_LIMIT=2000`，可把尾部截断为 0 字符，导致 **Bot Mode 私信回复为空**。
- [#146254](https://github.com/NousResearch/hermes-agent/issues/146254)（P2）：`bot_relay.deliver` 在 legacy（SSH/dashboard）路由上拒绝 Desktop 的 `id` 参数，跨机器 Bot 私信静默丢失。
- [#159067](https://github.com/NousResearch/hermes-agent/issues/159067)（P2）：网关 `SIGUSR1` 优雅重启时 `stop()` 抛异常不被记录、看门狗被解除，进程卡在 `draining`。

**整体推进评估**：今日收敛集中在**消息投递链路**（通知、Bot 私信、网关重启）与**Kanban 产物持久化**两条主线，属于“可靠性补丁”而非新能力；配合 #128785 的限流，说明维护者正在系统性治理“通知/投递类”长尾缺陷。

---

## 4. 社区热点

### 讨论最活跃 Issues
1. **[#143379](https://github.com/NousResearch/hermes-agent/issues/143379) — 57 条评论（今日第一）**
   `RFC: THE DOC-CHAIN SUBSTRATE'S NETWORK — the read, the governance, the compaction`
   诉求：让“持久记录”在会话压缩（compaction）后仍保留来源（provenance），智能体应**重新读取存档**而不是让用户重复输入。涉及 `comp/agent`、`comp/tools`、`tool/memory`、`tool/file`、`area/compression`，虽标 P4，但实质是上下文工程的核心架构议题，讨论热度说明社区对“压缩丢信息”痛点高度共鸣。

2. **[#119070](https://github.com/NousResearch/hermes-agent/issues/119070) — 29 条评论**
   Kanban 卡片被限流后重试成功，却永久停在 `blocker_auth`，reviewer 永不 spawn；网关持续打印 `kanban dispatcher stuck: ready queue non-empty`。
   与 **[#121281](https://github.com/NousResearch/hermes-agent/issues/121281)（10 条）** 属同一根因族：手动 `blocked → ready` 保留了过期 `last_failure_error`，被 `_RESPAWN_BLOCKER_RE` 命中后永久 park。两条均带 `needs-decision`，说明**修复方向需要产品决策**而非纯代码改动。

3. **[#122609](https://github.com/NousResearch/hermes-agent/issues/122609) — 26 条评论**
   `hermes-seaeye[bot]` 的 Skills 索引新鲜度探针连续告警（索引 28.1h，超过 26h 上限，状态 `degraded`）。属于自动化监控长期未闭环，反映站点构建流水线（`skills-index.yml` / `deploy-site.yml`）稳定性不足。

4. **[#129993](https://github.com/NousResearch/hermes-agent/issues/129993) — 20 条评论，2 👍**
   Desktop 转录中助手回复**渲染两次**（像素级相同），但持久化记录只有一条 → 纯前端渲染层重复。

5. **[#53347](https://github.com/NousResearch/hermes-agent/issues/53347) — 12 条评论，10 👍（今日最高反应）**
   要求允许 `model.context_length` 低于 64K，改为警告而非硬失败。典型 16GB MacBook + Ollama 本地部署场景。

### 值得关注的 PR 方向
- [#152168](https://github.com/NousResearch/hermes-agent/pull/152168)：Desktop **重新设计的 agent 工作区**集成分支（由 #157276→…→#157894 的堆叠 PR 组成），是近期最大的 UI 变更。
- [#159876](https://github.com/NousResearch/hermes-agent/pull/159876)：在**无 agent 的主机**上运行 Webapp，服务于 Hermes Cloud 托管式 dashboard（`agent.nousresearch.com` 形态）——产品形态层面的重要信号。
- [#160269](https://github.com/NousResearch/hermes-agent/pull/160269)：为“在别处执行工作”的插件开放 5 个公共接缝（`wrap_argv`、`judge_command`、插件自有工具调用、session-kernel opt-out 等），插件生态正在从“配置扩展”走向“执行面扩展”。

---

## 5. Bug 与稳定性

按严重程度排列（本次采样未出现 P1 标签项）：

### P0 — 数据安全
| Issue | 问题 | 状态 |
|---|---|---|
| [#147938](https://github.com/NousResearch/hermes-agent/issues/147938) | Windows 上更新后 `state.db` 校验**无法区分“被运行时持有的活锁”与“文件损坏”**，头读取失败即触发“自动恢复”，用数月前的快照覆盖健康数据；随后又把成功的恢复误报为“did not complete”。属数据丢失级故障 | OPEN，创建 2026-11-02，14 条评论；**本次采样的 20 条 PR 中未见对应 fix PR** |

### P2 — 高影响功能缺陷
| Issue | 问题 | 是否有可见 fix PR |
|---|---|---|
| [#129993](https://github.com/NousResearch/hermes-agent/issues/129993) | Desktop 助手回复重复渲染气泡（持久化仅一条） | 未见 |
| [#138915](https://github.com/NousResearch/hermes-agent/issues/138915) | 网关持有 `state.db` 时 Dashboard 变更一律 409，批量操作必失败 | 未见 |
| [#146538](https://github.com/NousResearch/hermes-agent/issues/146538) | 66 个 profile 的 Windows 网关持续 34k–99k 次/秒文件元数据操作，占满一核并导致内核池增长 | 未见 |
| [#144413](https://github.com/NousResearch/hermes-agent/issues/144413) | 工具结果含孤立代理项（lone surrogate）时结算抛 `UnicodeEncodeError`，会话卡在 `paused: unknown_execution` 且不可恢复 | 未见 |
| [#149979](https://github.com/NousResearch/hermes-agent/issues/149979) | Desktop 连远程网关时，Bot Chat 会话的 MEDIA 下载报 “Session not found” | 未见 |
| [#156899](https://github.com/NousResearch/hermes-agent/issues/156899) | 并发首次查找 profile 的 provider 插件导致其未注册，之后所有会话报 `Unknown provider`，需重启 | 未见 |
| [#159438](https://github.com/NousResearch/hermes-agent/issues/159438) | 网关在 `terminal` 命令执行中被杀后，恢复会话不显示该调用，模型会**重复执行**命令 | 未见 |
| [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) / [#121281](https://github.com/NousResearch/hermes-agent/issues/121281) | Kanban 卡片被 `blocker_auth` 永久 park，调度器空转 | 未见（`needs-decision`） |
| [#144694](https://github.com/NousResearch/hermes-agent/issues/144694) | `no_agent` cron 任务投递到 bot-chat 后永远 `delivery_queued`（结算路径只读从未写入的 delivery_queue 账本） | 未见 |
| [#154275](https://github.com/NousResearch/hermes-agent/issues/154275) | patchelf 补丁在 patchelf-0.15.2（当前 nixpkgs-unstable）上构建失败 | 未见 |
| [#131864](https://github.com/NousResearch/hermes-agent/issues/131864) | Windows 更新清理会停掉无 unit 的 `hermes serve`，且 win32 上无 respawn 路径，每次更新退出码 1 | 未见 |

### P3 / 其他
- [#129973](https://github.com/NousResearch/hermes-agent/issues/129973)：0.21.5 POSIX 启动器改用 `python3 -I -c`，破坏 Herdr 等终端工作区管理器的 agent 识别（回归）。
- [#131630](https://github.com/NousResearch/hermes-agent/issues/131630)：`hermes doctor` 因检查 `install.json` 而把活跃源码安装误报为 “Stale channel record”。
- [#127942](https://github.com/NousResearch/hermes-agent/issues/127942)：MCP `lazy: true` 因 SDK 默认 `ttlMs=0` 永不生效，启动时仍 eager spawn（标记 duplicate）。
- [#46800](https://github.com/NousResearch/hermes-agent/issues/46800)：`_kanban_dispatcher_watcher` 在 hook 占满并发上限时误报“stuck”（**附有 patch**，自 6-15 起未合入）。

**稳定性结论**：今日缺陷分布呈明显**平台集中性**——Windows 相关占 4 条（数据安全、更新器、文件系统churn、登录任务），Kanban 调度占 3 条，会话/投递占 4 条。已关闭的 4 条 P2 属投递链路，方向正确，但**P0 尚无可见修复路径**，是当前最大健康度风险。

---

## 6. 功能请求与路线图信号

| 需求 | 热度/状态 | 纳入下一版本的可能性 |
|---|---|---|
| [#53347](https://github.com/NousResearch/hermes-agent/issues/53347) 允许 `context_length < 64K`，改为警告 | 10 👍（今日最高）、12 评论、`needs-decision`、`sweeper:risk-compatibility` | **较高**。改动面小、诉求明确（16GB 机器跑 Ollama），但涉及兼容性策略，需决策“警告 vs 硬失败” |
| [#158538](https://github.com/NousResearch/hermes-agent/issues/158538) 主动性（proactivity）路线图：对标 Hark Pro / OpenAI dots / Meta Muse / Grok Bot | 由维护者 @teknium1 发起，12 评论 | **高（方向性）**。明确主张“每一次主动运行都是用户批准过的 job，提示词可见”，与现有 cron + memory 能力衔接 |
| [#35357](https://github.com/NousResearch/hermes-agent/issues/35357) Tirith 审批门禁未覆盖非 shell 工具（`send_message`、`write_file` 等静默执行） | 8 评论，安全类，长期开放 | 中。安全模型缺口明确，但涉及所有内置工具的审批语义，改动大 |
| [#90579](https://github.com/NousResearch/hermes-agent/issues/90579) Project 分组视图隐藏 Messaging / Cron 分区 | 9 评论、1 👍 | 中。属 Desktop 信息架构，可能被 #152168 重设计吸收 |
| [#156164](https://github.com/NousResearch/hermes-agent/issues/156164) 主动式工具结果裁剪（prune）的遗留决策 | 9 评论，承接 #156081/#156163 | 中高。上下文成本优化的直接抓手 |
| [#160297](https://github.com/NousResearch/hermes-agent/pull/160297) OSC 7577 程序恢复协议（CLI/TUI/Ink） | 新 PR | 已有实现，取决于评审 |
| [#160269](https://github.com/NousResearch/hermes-agent/pull/160269) 插件公共接缝（wrap_argv / judge_command 等） | 新 PR，配套 #158807 tether 0.3.1、#159905 antigravity 1.0.35 | 高。插件目录（plugin-catalog）连续更新，生态扩张是明确路线 |

**路线图判读**：三条主线清晰——(1) **上下文/压缩经济学**（#143379、#156164、tool-result prune）；(2) **主动性与后台任务**（#158538 + 今日的 memory review nudge 修复 PR #160295）；(3) **插件执行面与云端形态**（#160269、#159876、#152168）。

---

## 7. 用户反馈摘要

**真实痛点**
1. **Windows 是当前最脆弱平台**：更新器会把健康的 `state.db` 回滚成旧快照（#147938）；更新结束会停掉手动启动的 `hermes serve` 且永不重启（#131864）；登录自启任务早于 wscript 启动器导致桌面端不识别（#160294）；大量 profile 下文件系统空转（#146538）。用户 @kabirMas 给出的 66 profile 场景说明 Hermes 已被用于**多租户/多身份常驻部署**。
2. **自动化“卡死”比“报错”更伤**：Kanban 卡片永久 park（#119070、#121281）、cron 任务永久 `delivery_queued`（#144694）、会话永久 `paused: unknown_execution`（#144413）——共同特征是**无告警、无自愈、需人工介入**，用户被迫盯日志。
3. **通知与投递的“量”与“空”两端失衡**：一端是完成通知上传数百个文档刷屏（#128785 已修），另一端是 Bot Mode 私信正文被截成 0 字符（#150617 已修）。
4. **本地/小模型用户被门槛挡住**：#53347 的 10 个 👍 表明 64K 硬下限把 16GB 设备与 32K 模型排除在外。
5. **更新体验**：#102540 报告更新耗时从约 1 分钟恶化到 6 分钟以上，且提示信息无用（插件耗时明细 `@rolldown/plugin-babel` 等）。

**使用场景画像**
- 常驻安装：dashboard + gateway 同机（#138915）；
- 跨机拓扑：Desktop 在 B 机、gateway 在 A 机，走 SSH/dashboard WebSocket（#149979、#146254）；
- 多智能体 Kanban 战役：外部 CLI worker + 自定义 bridge（#123498、#46800）；
- IM 集成：Feishu 合并转发、Telegram 话题、Bot Mode 私信（#160291、#160298、#150617）；
- 受限硬件本地推理：MacBook 16GB + Ollama（#53347）。

**满意/不满意**
- 正面：用户愿意投入高质量复现与**直接附 patch**（#46800）、撰写长篇 RFC（#143379），说明核心用户粘性高、对项目方向有认同。
- 负面：集中在“长时间不收敛”——多个 P2 自 9 月开放至今无 fix PR，且部分带 `needs-decision` 标签，用户能感知到**决策瓶颈而非工程瓶颈**。

---

## 8. 待处理积压（提醒维护者关注）

### 长期开放且影响面大的 Issue
| Issue | 严重度 | 已开放 | 备注 |
|---|---|---|---|
| [#35357](https://github.com/NousResearch/hermes-agent/issues/35357) Tirith 审批不覆盖非 shell 工具 | P3 / 安全 | **约 180 天**（2026-05-30） | 安全模型缺口，建议至少给出设计结论 |
| [#46800](https://github.com/NousResearch/hermes-agent/issues/46800) Kanban watcher 误报 stuck | P3 | **约 164 天**（2026-06-15） | **用户已附 patch**，评审成本低，建议优先处理 |
| [#53347](https://github.com/NousResearch/hermes-agent/issues/53347) 允许 <64K 上下文 | P2 / `needs-decision` | **约 152 天**（2026-06-27） | 今日最高 👍（10），社区期待明确 |
| [#90579](https://github.com/NousResearch/hermes-agent/issues/90579) 侧栏分组隐藏 Messaging/Cron | P3 | **约 98 天**（2026-08-20） | 可并入 #152168 重设计 |
| [#102540](https://github.com/NousResearch/hermes-agent/issues/102540) 更新耗时过长且提示无用 | P2 | **约 84 天**（2026-09-03） | 直接影响升级意愿 |
| [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) / [#121281](https://github.com/NousResearch/hermes-agent/issues/121281) `blocker_auth` 永久 park | P2 / `needs-decision` | 65 / 63 天 | 同根因，建议合并决策一次性解决 |
| [#122609](https://github.com/NousResearch/hermes-agent/issues/122609) Skills 索引降级（bot 自动告警） | P2 | **约 62 天**（2026-09-25） | 机器人已反复告警 26 次，属“监控失效” |
| [#127942](https://github.com/NousResearch/hermes-agent/issues/127942) MCP `lazy` 永不生效 | P2 / duplicate | 约 58 天 | 标记重复但未见主 issue 收敛 |
| [#147938](https://github.com/NousResearch/hermes-agent/issues/147938) **P0 数据回滚** | **P0** | 24 天 | 唯一 P0，建议指定 owner 并给出时间表 |

### 长期开放 PR
| PR | 已开放 | 备注 |
|---|---|---|
| [#109513](https://github.com/NousResearch/hermes-agent/pull/109513) / [#109514](https://github.com/NousResearch/hermes-agent/pull/109514) Skills 索引缓存语义修复 | **约 74 天**（2026-09-13） | 与 #122609 的索引降级可能相关，建议一并评估 |
| [#152168](https://github.com/NousResearch/hermes-agent/pull/152168) Desktop 工作区重设计（集成分支） | 17 天 | 堆叠 10+ PR，属预期长期分支，但需明确合并窗口以免长期分叉 |

### 结构性积压
- **383 条待合并 PR** 对 **117 条已合并/关闭**，比例约 **3.3:1**；若按今日吞吐，清空队列需数日全力评审，但新增仍在持续流入。建议维护者：
  1. 对 `plugin-catalog` 类低风险 PR（如 #159905、#158807）批量快速通道；
  2. 对 `needs-decision` 标签建立定期决策会议机制（当前至少 3 条高热度 Issue 卡在决策）；
  3. 为 Windows 平台缺陷设立专项（今日 4 条高影响缺陷均与 Windows 相关）。

---

## 项目健康度小结

| 维度 | 评价 | 依据 |
|---|---|---|
| 开发活跃度 | **高** | 24h 内 342 Issue / 500 PR 更新，canary 日更，桌面端产物正常 |
| 收敛能力 | **偏弱** | Issue 关闭率 5.6%，PR 待合并:已合并 ≈ 3.3:1 |
| 架构演进 | **活跃且方向清晰** | #143379 上下文/压缩、#158538 主动性、#159876 云端 dashboard、#160269 插件接缝 |
| 稳定性风险 | **中等偏高** | 1 个 P0 无可见 fix；Windows 平台缺陷密集；自动化“静默卡死”类问题反复出现 |
| 社区参与度 | **健康** | 用户提交 RFC、附带 patch、详尽复现；最高 👍 10，讨论深度优于广度型项目 |
| 主要风险 | 决策瓶颈 > 工程瓶颈 | 多条 `needs-decision` 长期悬置，P2 积压 2 个月以上 |

> 数据说明：本报告基于给定的 24 小时快照（Issues 采样 30 条、PRs 采样 20 条，PR 评论数字段缺失），百分比为“更新量”口径而非净新增，不代表存量趋势；未在采样中出现的修复 PR 不代表不存在。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目日报 · 2026-11-26

> 数据窗口：2026-11-25 ~ 2026-11-26 ｜ 数据源：GitHub Issues / PR / Releases

---

## 一、今日速览

今日 AstrBot 处于**高强度维护态**：24 小时内 PR 更新 41 条、Issues 更新 10 条，其中 PR 关闭/合并 19 条、Issue 关闭 8 条，关闭率显著高于新开量（新开仅 2 条），是一个典型的“清偿存量 + 收敛质量”日。

全场主线是 **MCP 子系统可靠性专项**：围绕重连失败、子进程编码、SDK 版本不兼容等一连串老大难问题，今日一次性合入 4 个修复 PR，并关闭了沉睡近 10 个月的 #4664。

次级主线是 **工具调用链路的多网关兼容修复**，覆盖 OpenAI 兼容网关的流式 tool_call 标识归一化与 Gemini 内置工具混用两类高频报错。

风险面在于 **22 个 PR 仍待合并**、且部分已开启超过 3 周（如安全修复 #10915），review 带宽可能成为后续瓶颈。

综合评估：**活跃度 高 / 健康度 良好（有积压压力）**。

---

## 二、版本发布

过去 24 小时无新版本发布，本节略。

---

## 三、项目进展

今日合并/关闭的 19 条 PR 集中在五个方向，项目在“稳定性与兼容性”维度向前推进明显。

### 1. MCP 可靠性专项（最大推进项）

| PR | 说明 | 关联 Issue |
|---|---|---|
| [#10838](https://github.com/AstrBotDevs/AstrBot/pull/10838) | 修复 MCP 会话中断后的自动重连与初始连接失败恢复，并保证恢复失败时不吞掉原始工具错误 | 关闭 [#4664](https://github.com/AstrBotDevs/AstrBot/issues/4664) |
| [#10982](https://github.com/AstrBotDevs/AstrBot/pull/10982) | 子进程 stderr 采用健壮解码，避免单条非 ASCII 日志导致 drain 线程退出、管道写满、全部工具调用超时 | 修复 [#10981](https://github.com/AstrBotDevs/AstrBot/issues/10981) |
| [#10825](https://github.com/AstrBotDevs/AstrBot/pull/10825) | 主动拒绝不兼容的 mcp SDK 大版本，把真实错误立即抛出，而非伪装成 180s 初始化超时 | 修复 [#10824](https://github.com/AstrBotDevs/AstrBot/issues/10824) |
| [#11264](https://github.com/AstrBotDevs/AstrBot/pull/11264) | 重连失败后丢弃半初始化 session，允许下一次工具调用重新建连；并发场景复用替换后的 session | 同上系列 |

**价值判断**：这四条合起来把“MCP 连不上就摆烂、且看不到真实报错”的经典体验问题从三个层面（会话生命周期、I/O 健壮性、版本前置校验）一次性兜住，属于对用户可感知体验提升最大的改动。

### 2. 工具调用链路兼容修复

- [#10703](https://github.com/AstrBotDevs/AstrBot/pull/10703) `fix(openai): normalize streamed tool call identity` —— 解决不同 OpenAI 兼容网关在流式 tool_call 标识上“字段重复 / 分帧拆分 / 缺 index”的差异，统一成一致的工具调用对象。
- [#9978](https://github.com/AstrBotDevs/AstrBot/pull/9978) + [#11078](https://github.com/AstrBotDevs/AstrBot/pull/11078) —— 修复 Gemini API 格式下“内置工具（原生搜索等）+ function calling”同时启用必定 400 的问题，通过 `tool_config.include_server_side_tool_invocations` 显式 opt-in 并支持两者共存。
- 直接收益：关闭 [#7694](https://github.com/AstrBotDevs/AstrBot/issues/7694)（知识库工具名被重复拼接成 `astr_kb_searchastr_kb_search` 导致检索失败）与 [#9937](https://github.com/AstrBotDevs/AstrBot/issues/9937)（gemini 格式工具调用必报错）。

### 3. QQ 官方适配器 Markdown 策略统一（含破坏性变更）

- [#11378](https://github.com/AstrBotDevs/AstrBot/pull/11378) `refactor(qqofficial)!` —— 移除平台级 `use_markdown` 配置项。主动消息固定使用 Markdown；`MessageChain.use_markdown(False)` 仍可强制纯文本。**旧配置中的该键会在加载时被自动删除**，属于配置层破坏性变更，但具备兼容的自动迁移逻辑，用户侧无需手工干预。
- [#10873](https://github.com/AstrBotDevs/AstrBot/pull/10873) —— 普通回复也遵循平台默认 Markdown 策略，消除主动消息与普通回复表现不一致的问题。
- 背景见 [#11377](https://github.com/AstrBotDevs/AstrBot/issues/11377)：QQ 开放平台自 2026-04-23 起已对单聊/群聊全量开放自定义 Markdown，灰度期的开关已失去意义。

### 4. 插件管理与插件市场体验

- [#10800](https://github.com/AstrBotDevs/AstrBot/pull/10800) —— 实现已安装插件批量卸载与市场未安装插件批量安装，支持跨页选择、逐项执行、失败不中断、结束统一刷新状态，并补齐四种语言文案。关闭 [#10763](https://github.com/AstrBotDevs/AstrBot/issues/10763)。
- [#11375](https://github.com/AstrBotDevs/AstrBot/pull/11375) —— WebUI 支持 `market_plugin_id=author/name` 形式的市场插件安装深链，并保留登录重定向前的目标。
- [#11376](https://github.com/AstrBotDevs/AstrBot/pull/11376) —— 无有效分类的市场下保留本地化「全部」筛选与插件总数展示。

### 5. 可观测性与工程规范

- [#10765](https://github.com/AstrBotDevs/AstrBot/pull/10765) —— 追踪（Trace）页新增平台、消息类型、会话、运行状态、时间窗口等多维历史过滤器，解决长期运行后数万条追踪记录难以定位单次异常的问题。
- [#11277](https://github.com/AstrBotDevs/AstrBot/pull/11277) —— `docs(AGENTS)` 增加 PR 指令规则，要求 agent 使用 `PULL_REQUEST_TEMPLATE` 撰写描述。

**整体推进度**：一次性关闭 8 个 Issue、19 个 PR，其中 6 个是存在 1–10 个月的长期问题，属于“存量技术债集中清偿”，对项目健康度是明确正向信号。

---

## 四、社区热点

> 说明：本次数据中 PR 的评论数未采集（展示为 `undefined`），热点分析以 Issue 评论数与 👍 为主。

| 条目 | 热度信号 | 讨论焦点 |
|---|---|---|
| [#7694](https://github.com/AstrBotDevs/AstrBot/issues/7694) `[CLOSED]` 知识库工具名重复导致检索失败 | 4 条评论 | Agentic 知识库检索在真实法律条文场景下**概率性**失败，且报错信息把两个工具名粘连，误导性强 |
| [#10763](https://github.com/AstrBotDevs/AstrBot/issues/10763) `[CLOSED]` 多项功能建议 | 4 条评论 | 插件数量增长后，管理成本成为痛点：批量删除、市场页可直接读 README |
| [#10638](https://github.com/AstrBotDevs/AstrBot/issues/10638) `[CLOSED]` 插件元数据新增分类声明 | 3 条评论 / **2 👍** | 插件分类目前依赖 AI 审核，导致绝大多数插件被归入「其他」；希望作者在 metadata 中主动声明 `category` |
| [#4664](https://github.com/AstrBotDevs/AstrBot/issues/4664) `[CLOSED]` MCP 重连机制优化 | **2 👍** | 源自 2026-01 的 discussion，MCP 「连不上就关闭且不再重连」，局域网 N8N 亦不可用 |
| [#11282](https://github.com/AstrBotDevs/AstrBot/pull/11282) `[OPEN]` WebChat 轮次合并历史 + 按钮回调不阻塞 | 7 PR 堆叠 | 多条相关 PR 形成依赖栈，需按顺序合并，反映 WebChat 链路改动面较大 |

**诉求分析**：
1. **“报错不可读”是共性痛点**——#7694 的工具名粘连、#10824 的 180s 超时掩盖 AttributeError，本质都是错误信息损耗，用户无法自行定位。
2. **插件生态已进入“规模管理”阶段**——分类、批量操作、README 预览三项需求同时出现，说明插件市场从“能装”过渡到“好管”。
3. **ChatUI 正被当作生产力工具使用**（见 #11367），用户对上下文管理的要求开始向 IDE 级对话产品看齐。

---

## 五、Bug 与稳定性

按严重程度排序，今日报告/关闭的缺陷及修复状态：

| 严重度 | Issue | 问题 | 影响面 | Fix 状态 |
|---|---|---|---|---|
| 🔴 高 | [#10981](https://github.com/AstrBotDevs/AstrBot/issues/10981) | `LogPipe` 未显式指定编码，中文 Windows 下按 cp936 解码，一条非 ASCII 日志即抛 `UnicodeDecodeError`，drain 线程退出 → 管道写满 → **MCP 工具调用静默冻死** | 所有在中文 Windows 上运行、且 MCP 服务端输出中文日志的用户 | ✅ 已由 [#10982](https://github.com/AstrBotDevs/AstrBot/pull/10982) 修复并合并 |
| 🔴 高 | [#10824](https://github.com/AstrBotDevs/AstrBot/issues/10824) | 环境存在 `mcp>=2.x` 时 MCP 服务端工具**永不注册**，握手成功后卡 180s 超时，真实 `AttributeError` 被隐藏 | 升级 mcp SDK 的用户，工具全量不可用 | ✅ 已由 [#10825](https://github.com/AstrBotDevs/AstrBot/pull/10825) 修复并合并（前置版本校验） |
| 🟠 中高 | [#7694](https://github.com/AstrBotDevs/AstrBot/issues/7694) | Agentic 知识库检索概率性失败，报 `Tool astr_kb_searchastr_kb_search not found` | 知识库 + Agentic 检索组合场景 | ✅ 已由 [#10703](https://github.com/AstrBotDevs/AstrBot/pull/10703) 流式 tool_call 标识归一化修复 |
| 🟠 中 | [#9937](https://github.com/AstrBotDevs/AstrBot/issues/9937) | `google_gemini` API 格式下，启用内置工具（如原生搜索）+ 函数调用必定 400 | Gemini 3+ 用户 | ✅ 已由 [#9978](https://github.com/AstrBotDevs/AstrBot/pull/9978) / [#11078](https://github.com/AstrBotDevs/AstrBot/pull/11078) 修复 |
| 🟡 低 | [#11377](https://github.com/AstrBotDevs/AstrBot/issues/11377) | 「主动消息使用 Markdown」开关与新平台策略不一致，属历史遗留配置 | QQ 官方适配器用户 | ✅ 已由 [#11378](https://github.com/AstrBotDevs/AstrBot/pull/11378) 移除 |
| 🟡 低（待审） | [#10915](https://github.com/AstrBotDevs/AstrBot/pull/10915) | Slack webhook 校验了 HMAC 签名但**未校验请求时效**，旧签名请求可被重放 | Slack 接入用户，安全类 | ⏳ PR 已开启 25 天，仍未合并 |

**结论**：今日**无新增已知崩溃类 Bug**，且高严重度缺陷全部闭环。唯一悬而未决的是 #10915 这一安全问题，建议优先 review。

---

## 六、功能请求与路线图信号

| 需求 | Issue | 纳入下一版本的概率 | 判断依据 |
|---|---|---|---|
| 启动期重型可选依赖懒加载 / 导入门禁 | [#11370](https://github.com/AstrBotDevs/AstrBot/issues/11370) | **高** | 同一作者已提交配套 PR [#11371](https://github.com/AstrBotDevs/AstrBot/pull/11371)（限制 SQLite `cache_size`、关闭默认 `mmap_size`，针对 64.05 MiB 峰值）。数据详实（Memray 采样、火焰图、62.6% 导入占比），路径清晰 |
| ChatUI 检查点回溯与 `/fork` 分支 | [#11367](https://github.com/AstrBotDevs/AstrBot/issues/11367) | **中** | 需求真实（用户把 ChatUI 当 Agent 工作区，多方案并行时无法分叉），但涉及消息历史存储模型改造，工作量较大，目前无关联 PR |
| 插件元数据 `category` 自声明 | [#10638](https://github.com/AstrBotDevs/AstrBot/issues/10638) | 已关闭，需确认落地方式 | Issue 已关闭且获 2 👍，但展示的 PR 列表中未见直接对应实现 PR，建议维护者在日报确认是否已在其他 PR 落地 |
| WebChat 会话历史与交互阻塞 | [#11282](https://github.com/AstrBotDevs/AstrBot/pull/11282) | **高（待合并）** | 属 7 个 PR 组成的依赖栈，已明确合并顺序，需按序推进 |

**路线图信号解读**：项目当前的重心正从“功能扩张”转向 **“性能/内存占用 + 长期运行稳定性”**。#11370 使用 `nightly-20261125` 镜像、Memray 采样并给出精确到 MiB 的数据，配合 #11371 的 PR，是典型的“可观测驱动优化”路线，预计会成为 v4.30.x 系列的重点。

---

## 七、用户反馈摘要

**痛点上：**

1. **错误信息不可自解释**（#7694、#10824）——用户拿到的是“工具不存在”“连接超时”，而非根因。这类反馈反复出现，说明**错误链路的信息保真度**需要作为独立质量指标跟踪。
2. **MCP 生态稳定性是最集中的不满来源**——#4664 由用户 zzz6839 于 2026-01 提出，原文“一直有连不上就关了然后开摆死活不重连的问题”，情绪直白。该用户甚至提出“把问题抛给 N8N，AstrBot 只负责组织语言”的降级方案，反映其当时已对内置 MCP 客户端失去信心。
3. **Windows 中文环境是隐性雷区**——#10981 的 cp936 编码问题说明跨平台 I/O 默认值处理仍存在盲区，非中文开发者难以复现。
4. **插件生态“量变引发管理焦虑”**——#10638 作者明确指出“现在所有插件都靠 AI 审核，导致全是其他分类”，说明分类治理已影响插件市场的可用性。

**满意/正向信号：**

- 插件批量管理（#10763）、追踪页增强（#10765）等需求由社区提出后快速进入 PR 并被合并，说明**从 Issue 到 PR 的转化路径通畅**。
- 多位长期贡献者（`@OMSociety`、`@mantoujun12`、`@Soulter`）在本日集中提交，`@OMSociety` 一人贡献 5 个 MCP/Provider 相关 PR 并全部合并，社区核心贡献者活跃度健康。

**使用场景画像（来自 Issue 原文）：**

- 法律领域知识库检索（#7694）；
- ChatUI 作为 Agent 协作工作台，需要多方案试错（#11367）；
- 容器化部署 + Memray 性能调优（#11370）——说明已有用户在生产环境做深度性能治理。

---

## 八、待处理积压

**需要维护者关注的高优先级项：**

| 条目 | 已开启 | 风险 | 建议 |
|---|---|---|---|
| [#10915](https://github.com/AstrBotDevs/AstrBot/pull/10915) `fix: reject stale Slack webhook requests` | **25 天**（2026-11-01） | 安全类修复，允许签名请求重放，可能导致事件重复处理 | 优先 review 并合并，或明确说明阻塞原因 |
| [#11282](https://github.com/AstrBotDevs/AstrBot/pull/11282) WebChat 历史/回调修复 | 6 天（2026-11-20） | 属 7 PR 依赖栈，栈内任一被拒将影响其余 5 个 | 由维护者给出整栈 review 结论，避免长期悬挂 |
| [#11294](https://github.com/AstrBotDevs/AstrBot/pull/11294) `fix: allow the CLI to remove editable plugin installs` | 6 天（2026-11-20） | 开发者工作流：`-e` 安装的插件无法卸载，`shutil.rmtree` 拒绝删除目录符号链接 | 改动面小，可快速处理 |
| [#11374](https://github.com/AstrBotDevs/AstrBot/pull/11374) 超大工具结果写入活动沙箱 | 1 天 | 沙箱模式下工具结果被写入宿主机临时目录，沙箱内读不到，功能实际不可用 | 关联 #8978，建议与沙箱相关 PR 合并评审 |
| [#11367](https://github.com/AstrBotDevs/AstrBot/issues/11367) ChatUI 检查点与 fork | 1 天 | 暂无 assignee / label 反馈 | 建议给出路线图回应或标记 `feature-request / future` |

**积压结构性问题：**

- 今日待合并 PR 达 **22 条**，占 24h 更新量的 54%。虽然关闭量（19）可观，但净流入压力仍存在，建议关注 review 人力是否匹配。
- 本日关闭的 Issue 中，#7694（4/20 创建，历时 ~7 个月）、#4664（1/24 创建，历时 ~10 个月）、#9937（9/3 创建，历时 ~2.8 个月）均为**长期挂起后集中解决**。这既体现了维护成果，也提示早期 issue 的**响应时延**仍有改进空间——建议对 >30 天未响应且带 `bug` 标签的 issue 设置自动化提醒。

---

*报告生成时间：2026-11-26 ｜ 数据基于 GitHub 公开事件流，PR 评论数本次未完整采集。*

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报  
**日期：2026-11-26**  
**数据源：GitHub Discussions / Releases（仓库未启用 Issues、Pull Requests）**

---

## 1. 今日速览

- 过去 24 小时 Discussions 更新 **127 条**，社区讨论活跃度较高；但新版本发布 **0 个**，最新 Releases 为空。
- 讨论热点集中在插件编写体验、数据丢失风险、跨会话记忆、Mac Intel 桌面端适配、Windows CUA 后台操作与会话性能问题。
- 稳定性侧出现多项高风险信号：Agent 误删目录/会话丢失、超大会话 OOM、MCP 工具调用绕过审批、桌面端启动失败等。
- 整体健康度呈“**讨论侧高活跃、交付侧低可见度**”：社区反馈充分，但本次无 Release changelog 可核验合并与修复进展。

---

## 2. 版本发布

**无新版本发布。**  
本次周期新版本数为 **0**，最新 Releases 为空，因此无版本号、更新内容、破坏性变更或迁移注意事项可汇总。  
参考：[Releases 页面](https://github.com/deepseek-ai/deepseek-harness/releases)

---

## 3. 项目进展

- 仓库未启用 GitHub Issues/PR，代码合并经 Releases 落地；但本次 **Releases 为空、changelog 缺失**，因此无法从合并摘要确认今日上线了哪些功能或修复。
- 不能仅因 PR 数为 0 判定“无进展”；更准确的表述是：**本次交付信息不可见，项目进展无法从 Release 维度量化**。
- 从讨论侧看，社区仍在密集提出架构级需求与稳定性反馈，说明项目使用面在扩展，但维护者响应与交付节奏需结合后续 Release 观察。

参考：[Releases](https://github.com/deepseek-ai/deepseek-harness/releases)

---

## 4. 社区热点

今日评论最集中的讨论如下（👍 均为 0，热度主要由评论驱动）：

| 讨论 | 评论 | 核心诉求 |
|---|---:|---|
| [#8634 使用 DSH 一小时糟糕的体验](https://github.com/deepseek-ai/deepseek-harness/discussions/8634) | 23 | 插件编排“最后收官”困难，文档与沟通方式不够大白话，预设/捆绑插件能力不足。 |
| [#12751 写插件导致 dsh 目录和 zcode 会话被清](https://github.com/deepseek-ai/deepseek-harness/discussions/12751) | 19 | Agent 执行写插件任务时造成目录/会话数据丢失，用户对权限边界、备份与恢复机制强烈不满。 |
| [#13749 跨会话记忆作为可插拔 provider](https://github.com/deepseek-ai/deepseek-harness/discussions/13749) | 18 | 现有 compaction/session-query 仅限单会话，希望增加跨会话记忆 seam，服务长期运行 Agent。 |
| [#8807 希望适配 Mac Intel 桌面版](https://github.com/deepseek-ai/deepseek-harness/discussions/8807) | 8 | 官网仅提供 Apple Silicon 安装包，Intel Mac 用户无法使用桌面端。 |
| [#10129 会话标题插件几乎不更新](https://github.com/deepseek-ai/deepseek-harness/discussions/10129) | 7 | 64 token 输出额度被思考模型吃光，标题失败且完全静默。 |
| [#14221 DSH 启动老是失败](https://github.com/deepseek-ai/deepseek-harness/discussions/14221) | 6 | Windows 桌面端 0.2.2-rc.3 启动失败，需排查日志与兼容性。 |
| [#3904 MCP 工具调用绕过 ctx.approval](https://github.com/deepseek-ai/deepseek-harness/discussions/3904) | 6 | 有副作用 MCP 桥接工具缺少审批门禁，属安全边界问题。 |
| [#12708 超大会话导致崩溃](https://github.com/deepseek-ai/deepseek-harness/discussions/12708) | 6 | 约 1GB 会话触发 OOM，崩溃后自动恢复又形成死循环。 |

**分析：** 热点从“功能好不好用”上升到“数据安全、权限审批、会话生命周期与跨会话记忆”等架构问题；同时 Mac Intel、Windows 启动失败等平台覆盖问题重复出现，说明桌面端分发与稳定性仍是主要摩擦点。

---

## 5. Bug 与稳定性

以下为今日更新讨论中值得关注的 Bug/稳定性问题，含持续活跃的存量问题。仓库无 PR 机制，**均未见公开 fix PR**；是否修复需以后续 Release changelog 为准。

### 严重 / 数据安全与崩溃

1. **[严重] Agent 写插件导致 dsh/zcode 目录与会话丢失**  
   [#12751](https://github.com/deepseek-ai/deepseek-harness/discussions/12751)  
   用户让 Agent 写 token 统计插件后，dsh 与 zcode 会话全部丢失。涉及写操作边界、备份/恢复、危险命令确认。**未见 fix PR。**

2. **[严重] 超大会话 OOM 并形成崩溃恢复死循环**  
   [#12708](https://github.com/deepseek-ai/deepseek-harness/discussions/12708)  
   约 1GB 会话在 host 组装上下文时 OOM；崩溃后自动重开同一会话造成循环。缺少会话体积保护与降级策略。**未见 fix PR。**

3. **[严重/安全] MCP 工具调用绕过 `ctx.approval`**  
   [#3904](https://github.com/deepseek-ai/deepseek-harness/discussions/3904)  
   `dsh-mcp-client` 未引用 approval seam，有副作用的桥接工具可能无审批执行。**未见 fix PR。**

### 高影响可用性问题

4. **Windows 桌面端启动失败**  
   [#14221](https://github.com/deepseek-ai/deepseek-harness/discussions/14221)  
   Desktop 0.2.2-rc.3 / Windows x64 启动异常。**未见 fix PR。**

5. **内置会话标题插件静默失败**  
   [#10129](https://github.com/deepseek-ai/deepseek-harness/discussions/10129)  
   64 token 被思考内容耗尽，标题长期不更新且无提示。**未见 fix PR。**

6. **`subagent_codex` 与新版 Codex CLI 不兼容**  
   [#9949](https://github.com/deepseek-ai/deepseek-harness/discussions/9949)  
   固定依赖 Codex CLI 0.153.4，较新模型/CLI 调用失败且无行动建议。**未见 fix PR。**

7. **`llm-pi-ai` SSE keepalive 未续期 idle watchdog**  
   [#14176](https://github.com/deepseek-ai/deepseek-harness/discussions/14176)  
   长 llama.cpp prefill 在 300s 被误杀，连接实际仍存活。**未见 fix PR。**

8. **Windows `workspace-write` 子目录缺少 Low mandatory label / capability ACE**  
   [#11154](https://github.com/deepseek-ai/deepseek-harness/discussions/11154)  
   预存子目录权限标签不完整，可能影响 workspace-write 策略执行。**未见 fix PR。**

---

## 6. 功能请求与路线图信号

结合讨论热度与实现复杂度，以下需求可能进入后续版本或设计讨论；因本次无 Release/PR 信息，均需官方确认：

- **跨会话记忆 provider**：[#13749](https://github.com/deepseek-ai/deepseek-harness/discussions/13749)  
  提出在 `SessionPersistence` 旁增加 memory seam，将跨会话决策、偏好、工具映射经验作为可插拔 provider。评论 18，架构信号较强，**较可能进入设计讨论**。

- **Mac Intel 桌面端适配**：[#8807](https://github.com/deepseek-ai/deepseek-harness/discussions/8807)、[#10126](https://github.com/deepseek-ai/deepseek-harness/discussions/10126)  
  多次重复提出，属于平台覆盖缺口；但涉及构建/分发成本，短期优先级待确认。

- **Computer Use 后台投递**：[#14126](https://github.com/deepseek-ai/deepseek-harness/discussions/14126)  
  希望不移动系统鼠标、不抢前台地操作应用；涉及 Windows 辅助程序与权限架构，实现复杂度较高。

- **“已编辑 N 个文件”卡片增加关闭悬停预览开关**：[#14335](https://github.com/deepseek-ai/deepseek-harness/discussions/14335)  
  低风险 UI 偏好项，较可能作为小改进纳入后续版本。

- **增强预设/捆绑插件与插件编排引导**：[#8634](https://github.com/deepseek-ai/deepseek-harness/discussions/8634)、[#6931](https://github.com/deepseek-ai/deepseek-harness/discussions/6931)  
  用户认可“一切皆插件”，但认为默认预设太少、文档门槛高；属于体验与生态建设信号。

---

## 7. 用户反馈摘要

- **正向反馈：** 有用户明确认可 Web 版 `npx @deepseek-ai/dsh web` 体验很好，并希望桌面端覆盖更多平台（[#8807](https://github.com/deepseek-ai/deepseek-harness/discussions/8807)）。也有用户认可“一切皆插件”和自定义 Agent 理念，但认为预设和易用性不足（[#6931](https://github.com/deepseek-ai/deepseek-harness/discussions/6931)）。
- **插件编写门槛高：** 用户能写插件，但“最后收官细节”做不到；希望官方用大白话说明预设捆绑插件方式（[#8634](https://github.com/deepseek-ai/deepseek-harness/discussions/8634)）。
- **数据安全意识强烈：** 写插件导致目录/会话被清后，用户对 Agent 写权限、危险操作确认、会话恢复非常不满（[#12751](https://github.com/deepseek-ai/deepseek-harness/discussions/12751)）。
- **长会话场景痛点：** 长期项目导致会话体积膨胀至约 1GB，触发 OOM 与崩溃循环（[#12708](https://github.com/deepseek-ai/deepseek-harness/discussions/12708)）。
- **平台与安装摩擦：** Mac Intel 用户无法安装桌面端；Windows 用户遇到启动失败；CUA 用户关注非管理员、后台操作能力（[#8807](https://github.com/deepseek-ai/deepseek-harness/discussions/8807)、[#14221](https://github.com/deepseek-ai/deepseek-harness/discussions/14221)、[#14126](https://github.com/deepseek-ai/deepseek-harness/discussions/14126)）。
- **细节体验待完善：** 会话标题静默失败、文件卡片悬停预览无法关闭等小问题影响日常使用（[#10129](https://github.com/deepseek-ai/deepseek-harness/discussions/10129)、[#14335](https://github.com/deepseek-ai/deepseek-harness/discussions/14335)）。

---

## 8. 待处理积压

以下为开放时间较长、影响面较大且今日仍有更新/讨论的条目，建议维护者优先关注：

| 讨论 | 创建时间 | 评论 | 积压原因 |
|---|---:|---:|---|
| [#3904 MCP 调用绕过 approval](https://github.com/deepseek-ai/deepseek-harness/discussions/3904) | 2026-08-21 | 6 | 安全边界问题，长期开放，涉及有副作用工具审批。 |
| [#6931 桌面端不好用/预设太少](https://github.com/deepseek-ai/deepseek-harness/discussions/6931) | 2026-09-17 | 4 | 体验与生态建设反馈，影响新用户留存。 |
| [#8807 Mac Intel 桌面版适配](https://github.com/deepseek-ai/deepseek-harness/discussions/8807) | 2026-10-04 | 8 | 平台覆盖缺口，重复诉求。 |
| [#9949 subagent_codex 兼容性](https://github.com/deepseek-ai/deepseek-harness/discussions/9949) | 2026-10-17 | 6 | 子代理与外部 CLI 版本耦合，影响可用性。 |
| [#10129 会话标题插件静默失败](https://github.com/deepseek-ai/deepseek-harness/discussions/10129) | 2026-10-18 | 7 | 根因明确但未见修复版本，影响日常识别会话。 |
| [#11154 workspace-write 权限标签缺失](https://github.com/deepseek-ai/deepseek-harness/discussions/11154) | 2026-10-27 | 4 | Windows 安全策略执行问题，需平台专项排查。 |
| [#12708 超大会话 OOM/崩溃循环](https://github.com/deepseek-ai/deepseek-harness/discussions/12708) | 2026-11-09 | 6 | 高影响稳定性问题，涉及会话装载保护与恢复策略。 |

**维护建议：** 优先对安全类（#3904）、数据丢失类（#12751）和崩溃类（#12708）给出明确状态说明；即使暂无 fix，也建议在 Discussion 中标注“已确认/调查中/计划版本”，以降低社区不确定性。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*