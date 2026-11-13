# OpenClaw 生态日报 2026-11-13

> Issues: 433 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-13 02:15 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-13

---

## 1. 今日速览

今日 OpenClaw 持续维持高强度开发节奏：过去 24 小时 **433 条 Issue 更新**（新开/活跃 261、关闭 172）、**500 条 PR 更新**（待合并 288、合并/关闭 212），但 **0 个新版本发布**，表明变更正集中堆积在 `main` 分支等待下一次发布窗口。活跃度评级：**极高（🔥🔥🔥🔥🔥）**——单日 500 条 PR 更新在同类项目中属顶部区间，但合并率约 42%（212/500），说明审阅端是当前主要瓶颈。稳定性方面，**多个 P0/P1 回归**（护住 macOS/Claude-CLI/Codex 三条主链路）仍处于 OPEN 状态，需重点关注。

---

## 2. 版本发布

**无新版本发布（0 个 Releases）。**

数据中未提供 `main` 分支关联的 release note，但多条 Issue 及 PR 引用的最新稳定版为 **`2026.11.3`**，`v2026.11.5-beta.1` / `beta.2` 已在预发布通道（见 [Issue #141474](https://github.com/openclaw/openclaw/issues/141474) 与 [Issue #197083](https://github.com/openclaw/openclaw/issues/197083) 的引用）。**下一次正式发布将包含 `#197083` 修复的“WAL 提交发布验证”问题**、以及多个 P1 回归修复，建议尽快收敛。

---

## 3. 项目进展

今日合并/关闭的 PR 数量为 212 条，虽未逐一列出，但可由 Issues 状态与标签推断出以下主线推进方向：

| 方向 | 代表合并/关闭 | 说明 |
|---|---|---|
| **运行时安全 & 崩溃修复** | [PR #198008](https://github.com/openclaw/openclaw/pull/198008)（CLOSED） | 减少 GitHub PR 元数据读写对 Gateway 主线程的 CPU 占用 |
| **CI 基础设施** | [PR #198035](https://github.com/openclaw/openclaw/pull/198035)、[PR #198025](https://github.com/openclaw/openclaw/pull/198025)、[PR #198020](https://github.com/openclaw/openclaw/pull/198020)、[PR #198023](https://github.com/openclaw/openclaw/pull/198023)（CLOSED） | 缓存卫生、测试夹具清理、readiness fixture 修复——持续降低 CI 噪声 |
| **核心行为修复** | Issues `#121232` `#143640` `#136311`（memory-core）已关闭 | `memory-core` dreaming / index 发布相关的 ranker-applier 不一致、锁争用问题进入收尾状态 |
| **语法/草稿完善** | [PR #198027](https://github.com/openclaw/openclaw/pull/198027)（标注 **Draft，勿合并**) | 作者自陈 worker 仅在 128 文件 checkpoint 检查 custody，正在返工 —— 说明审阅端已在主动阻止低质量合并 |

**整体推进幅度评估**：单日 212 条合并/关闭，主要覆盖 **memory-core 子系统的稳定性收尾**、**CI 基建强化** 和 **多条插件级修复**；核心 Agent 会话链路的重大架构变更尚未完成合并，项目处于“**消化存量、修复回归、准备发布**”的阶段而非功能扩展期。

---

## 4. 社区热点

按评论数排序，今日最具讨论度的 5 条问题：

| 排名 | Issue | 评论 | 主题 | 背后诉求 |
|---|---|---|---|---|
| 🥇 | [#164294](https://github.com/openclaw/openclaw/issues/164294) | 40 | Gateway 自身 `state/openclaw.sqlite` 的 WAL auto-checkpoint **从未完成**（`consecutiveBlocked` 持续增长） | 用户对“Gateway 磨损自己存储”这一结构性问题的耐心正在耗尽；对 checkpoint 失败无可见告警感到不安 |
| 🥈 | [#191944](https://github.com/openclaw/openclaw/issues/191944) | 27 | macOS 上 `gateway stop` / `stop --force` 均因 `ProcessInspectionError` 失败 | macOS Intel 用户被“**无法优雅停止**”卡住，急需独立终端变通方案或补丁 |
| 🥉 | [#120385](https://github.com/openclaw/openclaw/issues/120385) | 26 | Code Mode 工具目录在 cron / memory-flush 轮次构建不完整，`Unknown tool id` 被伪装为 `⚠️ 🛠️ Exec failed` | 自动化（cron）场景下 MCP 工具静默缺失，破坏“定时任务是增强”的核心承诺 |
| 4 | [#67413](https://github.com/openclaw/openclaw/issues/67413)（**CLOSED**） | 17 | 按 Agent 的 dreaming 配置（原 `stale` 后关闭） | 用户 OOM（>6GB MemoryMax）痛点被关闭但**无明确 fix PR**，社区需观察关闭原因（拒绝/合并/合并到下游） |
| 5 | [#44309](https://github.com/openclaw/openclaw/issues/44309)（**CLOSED**） | 17 | A2A 单向 dispatch 模式 | Agent 间“ping-pong 回复”造成 token 浪费，用户希望“投递后不回复”的语义 —— 与 #192009（已 CLOSED）同属 **A2A 语义精细化**诉求群 |

**另两条 PR 值得关注**：[PR #198028](https://github.com/openclaw/openclaw/pull/198028)（修复日志 tail 卡住 Gateway 聊天）、[PR #198019](https://github.com/openclaw/openclaw/pull/198019)（Ctrl+C 取消 `channels.stop`），均指向**“旁观客户端操作不应阻塞主链路”**这一反复出现的主题。

---

## 5. Bug 与稳定性

按严重程度排列，标注 fix PR 状态：

### 🔴 P0

| Issue | 主题 | Fix 状态 |
|---|---|---|
| [#190563](https://github.com/openclaw/openclaw/issues/190563) | 无法恢复暂停的 Codex 聊天（provider review / native thread 不匹配，`regression`） | ❌ 无 fix PR，**需安全评审** |

### 🟠 P1

| Issue | 主题 | Fix 状态 |
|---|---|---|
| [#144291](https://github.com/openclaw/openclaw/issues/144291) | 任何 `openclaw config set` 热重载都会中止进行中的 agent 回合（“plugin generation superseded”） | ❌ 无 fix PR，需产品决策 |
| [#144809](https://github.com/openclaw/openclaw/issues/144809) | `claude-cli` 超过 `RUN_STALE_TAKEOVER_MS` 的回合丢失整段回复 | ❌ 无 fix PR |
| [#181459](https://github.com/openclaw/openclaw/issues/181459) | 3.5 GB agent DB 使每次启动成赌博（18s open / 4–6min startup，`embeddings` 存了 3 份） | ❌ 无 fix PR |
| [#191841](https://github.com/openclaw/openclaw/issues/191841) | 2026.10.10 回归：glibc < 2.31（RHEL 8/al8）下 `native child reaping is unavailable`，所有 exec/子进程调用失败 | ⚠️ `fix-shape-clear`（形态清晰，可提 PR） |
| [#196199](https://github.com/openclaw/openclaw/issues/196199) | 2026.10.10 起 native Codex helper 完成无法唤醒父 agent | ❌ 无 fix PR，需更多 info |
| [#168101](https://github.com/openclaw/openclaw/issues/168101) | 限流 `Retry-After` 忽略 `retry.provider.maxRetryDelayMs`（工具调用后非 replay-safe） | ✅ **已 CLOSED** |

### 🟡 P2 高影响（抽样）

- [#162585](https://github.com/openclaw/openclaw/issues/162585)：Windows npm 树在插件 staging 中线性膨胀（290MB→612MB/24min），Gateway 永不健康
- [#141474](https://github.com/openclaw/openclaw/issues/141474)：Collector 子调用 `sessions_yield` 导致 `agents_wait` 永久悬空
- [#101929](https://github.com/openclaw/openclaw/issues/101929)：context-overflow 估算器高估 ~2.3–2.6x
- [#167609](https://github.com/openclaw/openclaw/issues/167609)：Code Mode 将 guest TypeError 误报为 `internal_error`（**今日 2026-11-12 在 main `7b3c6edf59c` 上提供直播复现**）
- [#197083](https://github.com/openclaw/openclaw/issues/197083)：2026.11.3 升级后 Doctor 的 WAL 发布校验失败，外部插件残留半完成状态

**稳定性总评**：今日**无新增 P0**（#190563 为既有），但 **P1 积压 5 条 OPEN 且 0 条关联 fix PR**，其中 `#144291` 和 `#144809` 直接影响对话可用性，建议作为下一版的 **blocker 级修复目标**。

---

## 6. 功能请求与路线图信号

| 功能请求 | 关联已有 PR | 落地判断 |
|---|---|---|
| **飞书（Lark）进度流式**（[#131457](https://github.com/openclaw/openclaw/issues/131457)，stale 但被重开） | 无直接 PR；但 Slack/Discord/Telegram 均已支持 `streaming.progress` | 🟢 **很可能会被纳入**，属于“补齐渠道一致性”的低阻力工作 |
| **限流感知的跨 Provider 回退**（[#182712](https://github.com/openclaw/openclaw/issues/182712) 已 CLOSED，关联 [#192009](https://github.com/openclaw/openclaw/issues/192009) 已 CLOSED） | 无 fix PR | 🟡 需求方向被认可，但实现形态待定（可能与 model fallback 子系统重构合并） |
| **XingChen-AGI Provider 插件**（[PR #197803](https://github.com/openclaw/openclaw/pull/197803) 开放） | 直接 PR | 🟢 **下周内可能合并**，属纯增量、低风险 |
| **单 Agent 级 dreaming 配置**（[#67413](https://github.com/openclaw/openclaw/issues/67413) 已 CLOSED） | 无 | 🔴 已关闭但无 fix PR，若为“不予处理”，建议在 issue 中明确并给出替代方案 |
| **公开共享对话按聊天样式展示**（[PR #197942](https://github.com/openclaw/openclaw/pull/197942)） | 直接 PR，`needs proof` | 🟡 有截图证明但形态待确认 |
| **跨 Agent compaction/contextPruning 覆盖**（[#52732](https://github.com/openclaw/openclaw/issues/52732) 已 CLOSED） | 无 | 🟡 与 #67413 同属**“精细化 per-agent 配置”大方向**，可能被合并到一个统一设计 RFC 中 |
| **Telegram sendDice**（[#137110](https://github.com/openclaw/openclaw/issues/137110)） | 无 | 🟡 娱乐性需求，优先级 P3，预计长期不排期 |

**路线图信号**：出现频率最高的三个方向为 **① 渠道一致性（Feishu/Telegram/Discord）**、**② 精细化 per-Agent 配置（dreaming / compaction / cron fallback）**、**③ 插件/Provider 生态扩展**。前两者已有多个 Issue **CLOSED 但无 fix PR**，建议维护者明确“关闭 = 不做 / 关闭 = 待 RFC / 关闭 = 已合并进来个 PR”，减少用户困惑。

---

## 7. 用户反馈摘要

从 Issues 正文与后续评论中提炼真实痛点：

### 😡 不满意（高频、可复现）

- **“Gateway 的存储是黑盒”**——[#164294](https://github.com/openclaw/openclaw/issues/164294) 用户能观测到 WAL checkpoint 永久阻塞但无告警，只能靠日志手工分析；[#181459](https://github.com/openclaw/openclaw/issues/181459) 用户吐槽 3.5GB DB 下启动时间是“掷骰子”，且 embeddings 重复存了 3 份。
- **“升级即回归”**——`2026.10.10` 被反复引用于 [#191841](https://github.com/openclaw/openclaw/issues/191841)（glibc 兼容）、[#196199](https://github.com/openclaw/openclaw/issues/196199)（Codex helper 唤醒），用户对升级风险的感知已积累到较高水位。
- **“关闭 ≠ 修复”**——#67413、#44309、#52732 等多个高讨论 Issue 被标 `stale` 后关闭，但社区看不到 fix PR 或拒绝理由，已生成“项目管理不透明”的观感。

### 🙂 满意（真实正面信号）

- **#141474** 的作者在 11-11 更新中主动致谢：`#164445` 的修复“on main and passes its tests (24/24)”，并明确“ships in beta”，说明**作者愿意跟踪状态并给出确认**，这类高质量跟进值得鼓励。
- **#167609** 的用户在 11-12 提供 `main` 分支直播复现，帮助维护者把“疑难问题”缩为“修复形态清晰”的问题，体现**社区具备定位问题的能力**。

### 💡 典型使用场景

- **macOS 桌面 + 单 Gateway**（#191944 用户）
- **RHEL 8 企业 Linux 服务器**（#191841 用户）
- **Windows 11 + 多插件 npm 树**（#162585 用户）
- **cron + MCP 工具 + memory-core** 自动化组合（#120385 用户）

> **跨场景共性**：用户普遍希望“**任何操作都不得静默阻塞主聊天**”，对应 PR #198028、#198027、#198019 的一组修复方向正确。

---

## 8. 待处理积压（需维护者关注）

### ⚠️ 长期未响应的 P1 Issue

| Issue | 创建时间 | 未决天数 | 关键标签 | 诉求 |
|---|---|---|---|---|
| [#144291](https://github.com/openclaw/openclaw/issues/144291) | 2026-09-10 | 64 天 | `needs-maintainer-review`, `needs-product-decision` | 热重载中止 in-flight turn——**该问题若持续，将破坏用户对“配置可在线调整”的基本信任** |
| [#181459](https://github.com/openclaw/openclaw/issues/181459) | 2026-10-23 | 21 天 | `bulk-filed` | 3.5GB DB 启动赌博——**与 #166634（embeddings 重复）交叉关联** |
| [#191841](https://github.com/openclaw/openclaw/issues/191841) | 2026-11-03 | 10 天 | `fix-shape-clear` | glibc 兼容——**fix 形态已清晰，缺的只是有人动手** |

### ⚠️ 超 30 天的“已修复但未合并”PR

- **未在今日 30 条热 PR 中发现**，但 Issues 中多次引用 **PR #168338**（`45c7bc9e9ca9`，10-13 已合并）、**PR #125941**（08-18 已合并），说明主干合并不慢，慢在**分支 PR 评审队列**。

### ⚠️ 悬而未决的产品决策

| Issue | 问题 | 建议动作 |
|---|---|---|
| [#67413](https://github.com/openclaw/openclaw/issues/67413) | per-agent dreaming 已 CLOSED 但无 fix | 建议 comment 说明关闭原因（拒绝 / 移至 roadmap / 由 X PR 实现） |
| [#52732](https://github.com/openclaw/openclaw/issues/52732) | per-agent compaction 已 CLOSED | 与 #67413 合并为一个 **per-agent 配置** RFC |
| [#44309](https://github.com/openclaw/openclaw/issues/44309) | A2A 单向 dispatch 已 CLOSED | 与 #192009 合并为 **A2A 语义规范化** RFC |

### 维护者行动建议（优先级排序）

1. **P0**：为 [#190563](https://github.com/openclaw/openclaw/issues/190563) 指派 owner 并触发 security review（已 12 天无 fix PR）。
2. **P1**：为 [#144291](https://github.com/openclaw/openclaw/issues/144291) 和 [#144809](https://github.com/openclaw/openclaw/issues/144809) 各指派一名 reviewer，**这两条是对话主链路的直接可用性 bug**。
3. **P1**：从 [#191841](https://github.com/openclaw/openclaw/issues/191841) 中择机提一个 `fix-shape-clear` PR（标签已提示形态清晰）。
4. **P2**：对“已 CLOSED 无 fix PR”的产品请求（#67413 / #52732 / #44309 / #182712）进行**批量归类**，统一发一条“决策公告”，降低社区困惑。

---

*报告生成于 2026-11-13 · 数据窗口 2026-11-12 → 2026-11-13 · 数据来源：[github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)*

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析

**数据日期：2026-11-13｜覆盖项目：OpenClaw、Zeroclaw、PicoClaw、QwenPaw、hermes-agent、AstrBot、DeepSeek Harness**

---

## 一、生态全景

七个项目在 2026-11-13 **全部零版本发布**，整体处于两次发布窗口之间的"消化存量"阶段，但内部状态高度分化：第一梯队的 OpenClaw 与 hermes-agent 单日 PR 更新均达 500 条，构成生态的吞吐主干；第二梯队的 QwenPaw、Zeroclaw 以 50 条/日的规模推进安全与架构演进；AstrBot 以 17 条 PR 低调做 Dashboard 重构；PicoClaw 则出现 0 合入、85% 动态为 stale 清理的维护停滞信号。**安全边界（沙箱、RBAC、认证、secrets 隔离）是跨越全部七个项目的共同主线**，其次是上下文/记忆管理的可靠性、多 Agent 编排、Provider/模型抽象。整体呈现"高活跃、高积压、低交付"的普遍特征——审阅带宽而非代码产出，正在成为生态的核心瓶颈；同时 PicoClaw 的 fork 声明与多个项目"关闭 ≠ 修复"的现象，提示社区治理透明度正成为项目健康度的显性指标。

---

## 二、各项目活跃度对比

| 项目 | Issues 更新（新开/活跃 · 关闭） | PR 更新（待合并 · 合并/关闭） | Release | 今日实际合入/关闭 | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 433（261 · 172） | 500（288 · 212） | 0 | 212 PR | 🔥🔥🔥🔥🔥 极高；合并率 42%，**审阅端是瓶颈**；P1 积压 5 条 0 fix |
| **hermes-agent** | 500（366 · 134） | 500（375 · 125） | 0 | 125 PR | 🔥🔥🔥🔥🔥 极高；待合并/已关闭 **3.0:1**，积压压力显著 |
| **QwenPaw** | 25（17 · 8） | 50（38 · 12） | 0 | 12 PR | 🔥🔥🔥🔥 高；2.3.0 后密集修 Bug，修复覆盖率约 30%，**P0 安全漏洞待处理** |
| **Zeroclaw** | 50（49 · 1） | 50（46 · 4） | 0 | 4 PR | 🔥🔥🔥 高；**CI 被 RUSTSEC-2026-0459 阻断**，合并队列无法落地 |
| **AstrBot** | 0（完全静默） | 17（12 · 5） | 0 | 5 PR | 🔥🔥🔥 良好偏活跃；Dashboard v2 收尾，**关键人依赖**（2 人占 65% PR） |
| **PicoClaw** | Issues+PR 合计 13 条，**85% stale**（约 4 Issues 量级） | 9（4 · 5，5 条关闭**全为 stale**） | 0 | **0 合入** | ⚠️ 维护风险；已有 fork 声明（#3417），补丁供大于求 |
| **DeepSeek Harness** | 未启用 Issues；**Discussions 223 条** | 未启用 PR | 0 | 不可核验 | ⚠️ 讨论活跃、**交付口径空窗**；稳定性问题集中在 Windows/数据安全 |

> 口径说明：OpenClaw 与 hermes-agent 的 Issue/PR 总量均为系统披露的 24h 更新数，展示样本分别为 30 条 Issues、20 条 PR；AstrBot 的 PR 评论数在数据源中缺失；DeepSeek Harness 以 Discussions 替代 Issues/PR。

**关键观察：**
- **吞吐断层明显**：OpenClaw / hermes-agent（500 PR/日）≈ 10× QwenPaw / Zeroclaw（50）≈ 30× AstrBot（17）≈ 55× PicoClaw（9）。
- **合并率分化**：OpenClaw 42% vs hermes-agent 25% vs Zeroclaw 8% vs PicoClaw 0%——数字越低，说明"有方案但无合入"的失衡越严重。
- **零 Release 是集体行为**，但原因不同：OpenClaw 在等发布窗口、Zeroclaw 被 CI 阻断、PicoClaw 是无人合入、DeepSeek Harness 是无 PR 可合。

---

## 三、OpenClaw 在生态中的定位

### 规模与梯队
OpenClaw 与 hermes-agent 同属**唯一的第一梯队**：单日 500 条 PR 更新，是第二梯队（QwenPaw、Zeroclaw）的 **10 倍**、AstrBot 的 **约 30 倍**、PicoClaw 的 **约 55 倍**。在"个人 AI 助手/自主智能体"开源项目里，这一量级意味着 OpenClaw 已具备**事实上的生态参照地位**——其他项目的架构讨论（plugin 化、多渠道、多 Agent、安全边界）几乎都能在 OpenClaw 的 Issue 池中找到对应议题。

### 优势
1. **功能广度最完整**：渠道覆盖（Slack / Discord / Telegram / 飞书 / Web）、多 Provider（Claude-CLI / Codex / XingChen 等插件）、memory-core 子系统、Code Mode、cron、A2A——单项目覆盖面最广。
2. **生态扩展性**：插件 + Provider 双扩展机制，XingChen-AGI 这类外部 Provider 插件已可独立提 PR（#197803），生态外溢能力强。
3. **问题暴露充分**：433 条 Issue 更新说明用户基数大、反馈密度高，问题定位（如 #167609 用户在 main 分支直播复现）质量高。

### 技术路线差异
- **对比 Zeroclaw**：OpenClaw 走"功能广度 + 平台化"，Zeroclaw 走"安全优先 + Rust 技术栈 + 多租户企业方向"。OpenClaw 的 P0/P1 多为**运行时回归**（Codex 恢复、热重载中止 turn），Zeroclaw 的 P0 多为**安全边界**（delegate 绕过 allowlist、沙箱策略漂移）——前者是"功能跑不稳"，后者是"权限不安全"。
- **对比 PicoClaw**：OpenClaw 是重量级 Gateway 平台，PicoClaw 是面向 TV Box / SBC 的轻量嵌入式方案，两者用户画像几乎不重叠。
- **对比 hermes-agent**：两者规模相当，但 hermes-agent 的核心矛盾是"统一网关 #106742 post-merge 遗留"（#143547 已 64 条评论），OpenClaw 的核心矛盾是"审阅带宽 + 存储黑盒（WAL checkpoint 永久阻塞）"——一个在**迁移后遗症**，一个在**运行时可靠性**。

### 挑战与规模对比
- **审阅是硬瓶颈**：288 条待合并 vs 212 条合并/关闭，P1 中 #144291（热重载中止 in-flight turn，64 天）、#144809（claude-cli 回合丢回复）**0 fix PR**，直接影响对话可用性。
- **社区规模大但"关闭 ≠ 修复"观感在累积**：#67413、#52732、#44309 等 17 条评论的高讨论 Issue 被 stale 关闭且无 fix PR，与 PicoClaw 的 stale 问题同源，只是量级不同。
- **升级回归记忆**：`2026.10.10` 被 #191841（glibc 兼容）、#196199（Codex helper）反复引用，"升级即回归"的感知水位已较高。

> **定位总结**：OpenClaw 是生态中"功能最全、规模最大、问题也最集中"的参照系项目；其风险不在能力边界，而在**审阅吞吐与发布质量门禁**——这恰恰是 hermes-agent、QwenPaw 同样面临的共性问题。

---

## 四、共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **① 安全与最小权限边界** | **全部 7 个** | OpenClaw：P0 Codex 恢复需安全评审；Zeroclaw：沙箱策略 #6996 + delegate 绕过 #8279（S0）+ per-sender RBAC #5982；QwenPaw：同主机反代绕过认证 #8695（P0）；hermes-agent：profile secrets 泄漏 #82936（P1）、`/debug` 需显式同意 #153698；PicoClaw：WebSocket 鉴权 #2363；DeepSeek：Windows ACL 沙箱 #8409、智能体清空目录 #12751 |
| **② 上下文 / 记忆管理可靠性** | OpenClaw、Zeroclaw、QwenPaw、hermes-agent、DeepSeek | OpenClaw：context-overflow 高估 2.3–2.6x、per-agent compaction；Zeroclaw：MCP/tool-schema 克隆致 RSS 无界增长 #8642；QwenPaw：压缩无法收敛 #8312、Memory tag 索引永不重建 #8580、memory_search 重复调用后无法回复 #8361；hermes-agent：压缩移到 turn 边界 #117886、压缩后重注入 skill #86421；DeepSeek：append-only 会话日志致 OOM #4722、reasoning-only 空 content 毒死会话 #5466 |
| **③ 多 Agent 编排与委托** | OpenClaw、Zeroclaw、QwenPaw、hermes-agent、AstrBot | OpenClaw：A2A 单向 dispatch #44309；Zeroclaw：sessions_prompt/异步 sessions_message #12258/#12259、delegate 审批转发 #7743；QwenPaw：插件 CLI 扩展点 #8554；hermes-agent：子代理后台进程通知 #131578（已关）、Kanban worker 崩溃 #145022；AstrBot：ACP 子智能体 #11105（**架构级新方向**） |
| **④ Provider / 模型抽象与兼容** | OpenClaw、Zeroclaw、QwenPaw、hermes-agent、AstrBot | OpenClaw：限流感知的跨 Provider 回退 #182712、XingChen 插件 #197803；Zeroclaw：多模型 profile #9809（XL）、wire protocol 一等公民 #8396；QwenPaw：Ollama `num_ctx` #8236；hermes-agent：per-model `supported_reasoning_efforts` #154780；AstrBot：Gemini/OpenAI Decisions Provider #11095/#11106、Gemini thinking config 漏合 #10961 |
| **⑤ 渠道一致性与跨平台** | OpenClaw、Zeroclaw、QwenPaw、hermes-agent、PicoClaw、AstrBot | OpenClaw：飞书流式 #131457；Zeroclaw：Telegram 媒体转交 agent #12404/#12405；QwenPaw：微信 `ACCOUNT_IN_USE` #8693、Matrix 升级不迁移 #8684；hermes-agent：Slack 状态指示器失效 #110374（17👍）、WhatsApp WinError 5 #68128；PicoClaw：Discord 网关死锁 #3452；AstrBot：QQ 合并转发图片丢失 #11104 |
| **⑥ 可观测性 / 中断可恢复** | OpenClaw、Zeroclaw、QwenPaw、hermes-agent、DeepSeek | OpenClaw：Gateway 存储黑盒 + Doctor WAL 校验失败 #197083；Zeroclaw：停止 agent 丢工具调用与思考上下文 #8794；QwenPaw：cron 假成功 #8184、DoomLoop 误杀合法轮询 #8700；hermes-agent：Kanban 熔断器永久放弃卡片 #108927；DeepSeek：Windows 更新失败静默 #13025 |
| **⑦ CI / 发布工程质量** | OpenClaw、Zeroclaw、PicoClaw、AstrBot、hermes-agent | OpenClaw：CI 缓存卫生 PR 组；Zeroclaw：Security job 阻断 #12320 + 二进制体积门禁仅剩 0.7MB #11580；PicoClaw：dependabot PR 被 stale 误杀；AstrBot：#10587 修复仅进 dev 未进主干 #10961（漏合）；hermes-agent：外部贡献者 PR 权限被 upstream 卡住 #131859 |

**观察**：方向 ①（安全）与 ②（上下文/记忆）是**跨项目重合度最高**的两条——前者决定"敢不敢用"，后者决定"用久了会不会坏"。方向 ③（多 Agent）正在从"概念提案"进入"PR 工程化"阶段（ACP、sessions互通、delegate 审批），是下一阶段能力竞争的主战场。

---

## 五、差异化定位分析

| 维度 | OpenClaw | Zeroclaw | PicoClaw | QwenPaw | hermes-agent | AstrBot | DeepSeek Harness |
|---|---|---|---|---|---|---|---|
| **功能侧重** | 全能型个人助手平台（多渠道+多Provider+memory-core+Code Mode） | 安全优先的企业级/多租户 Agent 运行时 | 轻量嵌入式，低成本硬件上的自托管助手 | AgentScope 生态，渠道插件化 + 控制台体验 | 统一网关 + 多入口（CLI/TUI/Desktop/API/消息/cron/Kanban） | Bot 对话平台，Dashboard 化 + 插件市场 | 桌面客户端，插件设计工作台 |
| **目标用户** | 技术型自托管用户、多 Provider 混用者 | 企业/多租户运维方、安全敏感场景 | TV Box / SBC / 老旧设备用户（Sipeed 硬件生态） | 多工作区 + 多渠道并行的自托管进阶用户 | 多入口重度自动化用户（含 Kanban 工作流） | QQ 生态、Bot 运营者、插件开发者 | DeepSeek API 用户、设计工作流用户 |
| **技术架构** | Gateway 为中心 + 插件/Provider 双扩展 | Rust，沙箱 + OIDC/RBAC + WASM | Go，面向嵌入式/低资源 | Python/AgentScope，渠道插件化 + Landlock 沙箱 | 统一网关（#106742）+ 多 relay | WebUI + Dashboard + Plugin metadata 分类 | 桌面 App + 插件体系 |
| **主要风险** | 审阅瓶颈、存储黑盒、升级回归 | CI 阻断、安全 RFC 落地慢（#6996 stale） | 维护停滞、fork 分流 | 2.3.0 破坏性变更后遗症、P0 认证绕过 | post-merge 稳定性、PR 积压 3:1 | 关键人依赖、PR 评论数据缺失 | 交付空窗、Windows 更新/数据安全 |

**关键差异点：**
- **架构哲学**：Zeroclaw 是"安全边界即产品"，OpenClaw 是"能力广度即产品"，PicoClaw 是"资源约束即产品"，hermes-agent 是"入口统一即产品"，AstrBot 是"Bot 运营体验即产品"。
- **技术栈差异**：Zeroclaw（Rust）、PicoClaw（Go）与其余多为高层语言项目形成鲜明对比，前者在性能/安全原语上有天然优势，后者在迭代速度上更快。
- **扩展机制**：OpenClaw（插件+Provider）、AstrBot（插件市场+metadata 分类 #11094）、DeepSeek（设计工作台插件 #10615）、Zeroclaw（统一能力目录 #6489）——**插件化是全体共识**，但配套的"迁移/版本守卫/权限治理"（QwenPaw #8684/#8699、PicoClaw stale 误杀）才是真正分水岭。

---

## 六、社区热度与成熟度

### 活跃度分层

| 层级 | 项目 | 特征 |
|---|---|---|
| **L1 超大规模 / 高吞吐** | OpenClaw、hermes-agent | 500 PR/日；生态参照系；核心矛盾在"审阅吞吐"与"post-merge 稳定性" |
| **L2 高活跃 / 快速迭代或修复** | QwenPaw、Zeroclaw | 50 PR/日；QwenPaw 处于 2.3.0 后**密集修 Bug 阶段**（12 PR 完成、多个 first-time-contributor 24h 内提交 fix）；Zeroclaw 处于**安全架构演进期**但被 CI 阻断 |
| **L3 结构收敛 / 关键人驱动** | AstrBot | 17 PR/日；Dashboard v2 + Decisions Provider 双主线收尾；@Soulter + @wcqqq1214 占 65% PR，**评审带宽单人化**是最大单点风险 |
| **L4 维护风险** | PicoClaw | 9 PR/日但 **0 合入**、85% 动态 stale；#3417 已公开讨论 fork 存续；"有补丁无合并"是当前最大问题 |
| **特殊形态** | DeepSeek Harness | Discussions 223 条但**无 Issues/PR 通道**，交付只能经 Release 核验；当前 Release 为空，处于"高讨论、零交付"窗口 |

### 阶段判断

- **快速迭代阶段**：**QwenPaw**（2.3.0 后修复高峰，渠道插件化 + Whisper SDK 化）、**Zeroclaw**（沙箱/OIDC/RBAC 多条安全 RFC 并行）、**AstrBot**（Dashboard v2 + Decisions Provider + ACP 子智能体）。
- **质量巩固阶段**：**OpenClaw**（消化存量、修复 P1 回归、准备发布；单日 212 条合并主要是 memory-core 收尾 + CI 基建）、**hermes-agent**（统一网关 #106742 post-merge 遗留问题 #143547 已 64 条评论，需要拆分子任务）。
- **生态观察 / 需关注**：**PicoClaw**（代码稳定但合并通道堵塞，存在向社区 fork 迁移的早期迹象）、**DeepSeek Harness**（讨论热度高但无 Release 可核验，稳定性问题积压 26–78 天）。

---

## 七、值得关注的趋势信号

### 1. 安全默认值从"加分项"变为"采用前提"
七个项目无一例外把沙箱、RBAC、认证边界、secrets 隔离列为最高优先级。**QwenPaw #8695（反代绕过认证）、Zeroclaw #8279（delegate 绕过 allowlist）、hermes-agent #82936（profile secrets 泄漏）** 三条 P0/P1 均无 fix PR，说明安全债的修复速度落后于功能债。**对开发者的启示**：把权限模型作为第一天设计的一部分，而非上线后补丁——否则会在多租户/多渠道场景下付出结构性代价。

### 2. "保护机制本身成为故障源"成为新的可靠性范式
QwenPaw 的 **DoomLoop 误杀合法轮询（#8184、#8700）** 与 **重复 memory_search 拦截后无法回复（#8361）**、hermes-agent 的 **终端 lifecycle guard 误杀 Node CLI（#105758，29 条评论）** 揭示同一个模式：**为防止失控而加入的护栏，正在制造新的失控**。**启示**：门控机制必须区分"卡死"与"合法等待"，并保留人工逃生通道；监控语义的正确性与监控覆盖率同等重要。

### 3. 上下文/记忆管理从"性能问题"升级为"信任问题"
hermes-agent 的 **Desktop 消息在 compaction 后消失（#141855）**、QwenPaw 的 **定时任务中断只有结果感知无原因感知（#2306）**、DeepSeek 的 **reasoning-only 空 content 毒死整条会话（#5466）**——用户对"会话完整性"的敏感度已超过对"上下文长度"的敏感度。**启示**：压缩/裁剪策略需要可解释性（哪些被裁、为何裁），并把"可恢复"作为一等公民。

### 4. 多 Agent 编排进入 PR 工程化阶段
ACP 子智能体（AstrBot #11105）、sessions 互通（Zeroclaw #12258/#12259）、delegate 审批（Zeroclaw #7743）、Kanban worker（hermes-agent #145022）——**多 Agent 已从 RFC 讨论进入代码评审**。**启示**：下一个竞争点不是"能不能多 Agent"，而是**委托的权限边界、审批可见性、失败可恢复性**；Zeroclaw 的 delegate 绕过 allowlist（#8279）是最典型的反面教材。

### 5. Provider 抽象层正在被"能力声明"重构
hermes-agent 的 **per-model `supported_reasoning_efforts`（#154780）**、Zeroclaw 的 **wire protocol 一等公民（#8396）**、AstrBot 的 **Gemini thinking config 按 model 判定（#10961）**——硬编码 model id 的做法正在失效，**能力驱动的模型矩阵**成为新方向。**启示**：Provider 抽象应暴露"能力声明 + 兼容性校验"，而非"模型名字符串匹配"。

### 6. 插件生态的"生命周期治理"是下一道坎
QwenPaw 2.3.0 的渠道插件化暴露了完整问题链：**升级不迁移（#8684）→ 启动冲突（#8693）→ worker 崩溃（#8682）→ 缺版本守卫（#8699）**；PicoClaw 的 **dependabot PR 被 stale 误杀** 是同类问题的另一面。**启示**：插件化不是"注册一个插件"，而是"数据目录规范 + 迁移 + 版本守卫 + 破坏性操作审计"的完整体系；**AstrBot 的 metadata 自声明分类（#11094）是轻量但正确的第一步**。

### 7. CI / 发布工程正成为吞吐瓶颈
Zeroclaw 的 **Security job 阻断（#12320）让 46 条待合并 PR 全部滞留**、AstrBot 的 **#10587 修复仅进 dev 未进主干（#10961 重新提交）**、PicoClaw 的 **stale 策略误杀安全更新**——**工程质量问题正在直接转化为产品交付问题**。**启示**：CI 安全扫描应有"阻断 + 豁免审批"双通道；stale 策略需按标签（dependencies / bug / security）分级；主干/dev 合并策略需显式化。

### 8. 社区治理透明度成为项目选择因素
PicoClaw 的 **#3417 fork 声明**、OpenClaw 多个高讨论 Issue **"关闭但无 fix PR"（#67413 / #52732 / #44309）**、hermes-agent 的 **#20249 关闭为 not-planned**——社区对"关闭 = 不做 / 关闭 = 待 RFC / 关闭 = 已合并"的区分诉求正在变强。**启示**：维护者的一条三行状态声明，成本远低于社区分流后的挽回成本；**"关闭理由"应成为 issue 模板的一部分**。

---

### 附：对 AI 智能体开发者的三条高杠杆建议

1. **把"可停止、可恢复、可观测"作为运行时一等公民**——Zeroclaw #8794、QwenPaw #2306/#8184、OpenClaw #144291 都指向"中断即丢上下文"这一共性缺陷。
2. **安全边界前置设计，而非上线后补**——七个项目全部在安全债上付出可见成本；沙箱、权限、认证应从第一天建模。
3. **插件/Provider 扩展必须配套治理**——迁移、版本守卫、数据目录、能力声明，缺一不可；否则生态扩张的速度会被"升级即坏"的体验反噬。

---

*报告基于 2026-11-13 各项目公开动态生成，数据口径以各项目日报声明为准；跨项目对比时已注意区分"系统披露总量"与"展示样本量"。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报

**日期：2026-11-13｜数据窗口：过去 24 小时**

> 数据口径：基于 GitHub 过去 24 小时更新数据；Issues 评论数为榜单披露值，PR 评论数未披露。以下“未见 fix PR”均指未出现在今日展示的 PR 榜单中。

---

## 1. 今日速览

- **活跃度维持高位，但交付吞吐偏低**：过去 24 小时 Issues 更新 50 条（49 条新开/活跃、1 条关闭），PR 更新 50 条（46 条待合并、4 条已合并/关闭），无新版本发布。
- **安全与稳定性是绝对主线**：展示的 30 条 Issues 中约 **27 条带 `risk:high`**，集中在沙箱策略、delegate 权限绕过、OIDC/RBAC、依赖漏洞和运行时内存增长。
- **CI 出现发布级阻断**：[#12320](https://github.com/zeroclaw-labs/zeroclaw/issues/12320) 报告 `Security` job 因 RUSTSEC-2026-0459 每次构建失败，`CI Required Gate` 随之失败，**PR 无法合并、合并队列无法落地**。这解释了今日仅 4 条 PR 合并/关闭的低吞吐。
- **架构讨论活跃、合并净增量有限**：PR 合并/关闭率约 **8%**（4/50），Issue 关闭率约 **2%**（1/50）；但 46 条待合并 PR 显示后续仍有较大推进空间。
- **整体健康度判断**：社区参与度高、安全架构演进方向清晰，但**交付管道处于风险状态**，需优先解除 CI 阻断并处理高严重度安全缺陷。

---

## 2. 版本发布

今日**无新版本发布**（0 个），Releases 列表为空。

不过 v0.9.1 发布轨道仍有多条活跃信号：[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)（runtime/dashboard/gateway tracker）、[#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289)（OIDC milestone）、[#11580](https://github.com/zeroclaw-labs/zeroclaw/issues/11580)（release 二进制体积门禁）、[#12320](https://github.com/zeroclaw-labs/zeroclaw/issues/12320)（Security job 阻断）。其中 #12320 是当前最直接的发布阻塞项。

---

## 3. 项目进展

今日有 **4 条 PR 合并/关闭**，但展示的评论数最高 20 条 PR 均为 `OPEN`，具体合并条目未在榜单中披露，无法逐项确认影响面。可确认的关闭项与推进信号如下：

- **已关闭 Issue：[#11853](https://github.com/zeroclaw-labs/zeroclaw/issues/11853)**  
  `npm audit` 失败问题关闭，涉及 `@tailwindcss/typography` 的 moderate 级告警。属于 CI 卫生改善，减少了一条安全噪声。

- **OIDC 进入收尾阶段：[#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289)**  
  Tracker 状态显示核心 OIDC 栈已合并（#10248、#10255、#10259、#10263、#10265、#11082），当前主要是 close-out。虽然不一定是今日合并，但表明身份认证主线已有实质落地。

- **在审的重点 PR 储备**：
  - [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)：provider 多模型 profile 支持，XL 级、`risk:high`，涉及 schema-v4、能力模型、fallback 图，是 provider 架构的大改动。
  - [#12408](https://github.com/zeroclaw-labs/zeroclaw/pull/12408) / [#12402](https://github.com/zeroclaw-labs/zeroclaw/pull/12402)：Web 端 scoped HTTP / 插件 TLS 凭据管理。
  - [#12258](https://github.com/zeroclaw-labs/zeroclaw/pull/12258) / [#12259](https://github.com/zeroclaw-labs/zeroclaw/pull/12259)：`sessions_prompt` 与异步 `sessions_message`，指向多 agent 会话互通。
  - [#12404](https://github.com/zeroclaw-labs/zeroclaw/pull/12404) / [#12405](https://github.com/zeroclaw-labs/zeroclaw/pull/12405)：Telegram 回复中的文档/图片/视频转交给 agent。
  - [#7821](https://github.com/zeroclaw-labs/zeroclaw/pull/7821)：canonical `sandbox_policy` schema，关联 #6996，但已标记 `stale-candidate`。
  - [#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391)：delegate 工作区、工具上限与命令策略的边界加固。

**净推进判断**：代码合并层面增量有限，主要进展集中在“安全边界”和“provider 架构”两条长线；若 #12320 不解除，后续合并吞吐可能持续受限。

---

## 4. 社区热点

| 条目 | 热度 | 主题与背后诉求 |
|---|---|---|
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | 29 评论 | **细粒度沙箱策略 / 文件系统限制**。应用层路径准入与 OS 沙箱（Bubblewrap、Landlock、Seatbelt）长期漂移，运维方需要统一、可审计的路径限制模型。关联 PR #7821。 |
| [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | 19 评论 | **Windows 上 74 个测试失败**。Unix-only 测试命令、路径语义、控制台编码（代码页 936）导致 Windows 11 中文环境不可用；CI 仅跑 Linux，形成盲区。 |
| [#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396) | 19 评论 | **wire protocol 应成为 provider 构造与 onboarding 的一等公民**。用户希望协议选择不再隐含在 provider 实现里，降低接入与排障成本。 |
| [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) | 17 评论 | **runtime、dashboard 登录与 gateway 交付 tracker**。v0.9.1 的发布协调项，说明社区在等待可用的运行时/网关闭环。 |
| [#5937](https://github.com/zeroclaw-labs/zeroclaw/issues/5937) | 12 评论 | **统一 providers 架构与 reqwest client 管理**。当前 provider 模块重复、配置碎片化，用户希望减少不一致行为。 |
| [#5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982) | 12 评论 | **多租户 per-sender RBAC**。多租户 agent 部署需要按发送者身份授权，而不是全局权限。 |
| [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) | 评论数未披露 | **每个 provider profile 支持多模型**。XL 级改动，代表 provider 配置模型的一次结构性升级。 |

**分析**：今日热点由长期 RFC/Tracker 主导，而非新开争议。社区诉求集中在三类：**生产级安全默认值**（沙箱、RBAC、delegate 权限）、**provider 抽象与接入体验**、**跨平台与发布可靠性**。讨论充分但闭环偏慢，#6996 与 #7821 的组合尤其典型：设计讨论 29 条，PR 已进入 stale-candidate。

---

## 5. Bug 与稳定性

| 严重度 | 条目 | 状态与判断 |
|---|---|---|
| **S0 / 安全** | [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) delegate 绕过父级工具 allowlist | 子 agent 可调用父策略排除的工具，被标为 S0 数据丢失/安全风险。今日榜单中**未见直接 fix PR**；#10391 涉及 delegate 边界加固，但关联的是 #9872，不能确认覆盖此问题。 |
| **S1 / 阻断** | [#12320](https://github.com/zeroclaw-labs/zeroclaw/issues/12320) Security job 因 RUSTSEC-2026-0459 每次失败 | `libsqlite3-sys 0.38.2` / bundled SQLite 3.53.2。`CI Required Gate` 失败，**所有 PR 无法合并、merge queue 无法落地**。今日最优先项，榜单中未见 fix PR。 |
| **S1 / 工作流阻断** | [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) 停止 agent 会丢失工具调用与思考上下文 | 用户中途停止后，下一轮消息完全看不到此前步骤，影响信任与可恢复性。未见直接 fix PR。 |
| **S1 / 平台兼容** | [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) Windows 74 个测试失败 | 与 [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461)（CI 增加 Windows/macOS matrix）配套；修 CI 盲区是前置条件。 |
| **S1 / 稳定性** | [#6916](https://github.com/zeroclaw-labs/zeroclaw/issues/6916) shell/skill_tool 子进程缺少内存上限 | 已有 1MB 输出上限和 60s 超时，但子进程可无限分配内存，生产中出现 `wkhtmltopdf` 打爆容器。未见 fix PR。 |
| **S1 / 稳定性** | [#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) MCP/tool-schema 克隆导致 RSS 无界增长 | 从 #5542 拆出，属独立内存增长路径。未见直接 fix PR。 |
| **S1 / 依赖安全** | [#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) wasmtime-wasi CVE 与 audit/deny 配置漂移 | `cargo-audit` 与 `cargo-deny` ignore 列表范围不同，需人工对齐。未见 fix PR。 |
| **S1 / 依赖安全** | [#5869](https://github.com/zeroclaw-labs/zeroclaw/issues/5869) rumqttc 固定旧 rustls-webpki，RUSTSEC 集群 | 已标记 `status:blocked`，需要升级 MQTT 客户端或替换依赖。 |
| **S2 / 功能缺陷** | [#6105](https://github.com/zeroclaw-labs/zeroclaw/issues/6105) agent 不感知自己运行的 cron job 上下文 | 提醒类场景中，agent 无法引用自己发出的消息，导致后续对话断裂。未见 fix PR。 |
| **已关闭** | [#11853](https://github.com/zeroclaw-labs/zeroclaw/issues/11853) npm audit 失败 | 已关闭，属正向信号。 |

**稳定性判断**：S1 数量偏高，且多个关键项在今日榜单中未见直接修复 PR；#12320 已从“普通 bug”升级为**发布管道阻断**，应优先处理。

---

## 6. 功能请求与路线图信号

### A. Provider 架构与认证
- [#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396) wire protocol 一等公民；[#5937](https://github.com/zeroclaw-labs/zeroclaw/issues/5937) 统一 reqwest/client 管理；[#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) 多模型 profile；[#5601](https://github.com/zeroclaw-labs/zeroclaw/issues/5601) Ollama Cloud、Z.AI、Kimi Code、MiniMax 的订阅制 OAuth。
- **判断**：#9809 是核心载体，但 XL/高风险，短期内更可能先落较小切片；订阅制认证涉及安全与账户模型，偏中期。

### B. 安全与最小权限
- [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) + [#7821](https://github.com/zeroclaw-labs/zeroclaw/pull/7821) 沙箱策略；[#5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982) per-sender RBAC；[#3767](https://github.com/zeroclaw-labs/zeroclaw/issues/3767) 跨渠道 TOTP；[#5775](https://github.com/zeroclaw-labs/zeroclaw/issues/5775) 按 skill 限定脚本/命令；[#6917](https://github.com/zeroclaw-labs/zeroclaw/issues/6917) Composio action-scope；[#7130](https://github.com/zeroclaw-labs/zeroclaw/issues/7130) workspace 级 `forbid(unsafe_code)`；[#6293](https://github.com/zeroclaw-labs/zeroclaw/issues/6293) 气隙执行模式。
- **判断**：这是项目当前最强的路线图信号，但多数为架构级 RFC，落地周期长；#7821 已 stale-candidate，需维护者明确取舍。

### C. 多 Agent 与运行时
- [#12258](https://github.com/zeroclaw-labs/zeroclaw/pull/12258) / [#12259](https://github.com/zeroclaw-labs/zeroclaw/pull/12259) 会话互通；[#11878](https://github.com/zeroclaw-labs/zeroclaw/pull/11878) Goal Mode durable task lifecycle；[#7743](https://github.com/zeroclaw-labs/zeroclaw/issues/7743) delegate 审批转发；[#8226](https://github.com/zeroclaw-labs/zeroclaw/issues/8226) per-agent git identity。
- **判断**：Goal Mode 已有 exception 文档 PR（[#12407](https://github.com/zeroclaw-labs/zeroclaw/pull/12407)、[#12403](https://github.com/zeroclaw-labs/zeroclaw/pull/12403)），说明在按切片推进，但短期不会整体上线。

### D. 渠道与 UX
- Telegram 回复媒体处理：[#12197](https://github.com/zeroclaw-labs/zeroclaw/pull/12197)、[#12404](https://github.com/zeroclaw-labs/zeroclaw/pull/12404)、[#12405](https://github.com/zeroclaw-labs/zeroclaw/pull/12405)；[#12406](https://github.com/zeroclaw-labs/zeroclaw/pull/12406) Parallel Web Search；[#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) 原生 XMPP；[#11869](https://github.com/zeroclaw-labs/zeroclaw/pull/11869) SSH 传输复用；[#7431](https://github.com/zeroclaw-labs/zeroclaw/issues/7431) pre-turn 路由提示。
- **判断**：这些是较可能近期进入下一版本的功能，尤其是 #12406 和 Telegram 媒体修复，体积较小、用户场景明确。

### E. CI 与发布工程
- [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) 三平台 CI matrix；[#11580](https://github.com/zeroclaw-labs/zeroclaw/issues/11580) 二进制体积门禁仅剩 0.7MB 余量，需要决定提高上限还是压缩体积。
- **判断**：#11580 是发布前必须做的决策项；#7461 是 Windows 稳定性的前置投资。

---

## 7. 用户反馈摘要

- **跨平台体验不足**：Windows 11 简体中文环境（代码页 936）出现 74 个测试失败，用户指出 CI 只跑 Linux，导致问题长期不可见（[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)）。
- **运行时信任感受损**：中途停止 agent 会丢掉工具调用和思考过程，用户感觉“那一步从未发生”，影响连续对话与审计（[#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794)）。
- **cron 场景上下文缺失**：让 agent 设置提醒后，它无法引用自己发出的提醒消息，提醒类工作流不闭环（[#6105](https://github.com/zeroclaw-labs/zeroclaw/issues/6105)）。
- **安全默认值不够严**：delegate 可绕过父级 allowlist（[#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279)）；`allow_scripts` / `allowed_commands` 是全局开关，安装一个 Python skill 会放大所有 skill 的权限（[#5775](https://github.com/zeroclaw-labs/zeroclaw/issues/5775)）。
- **生产环境 OOM 痛点**：LLM 回退到 shell 命令（如 `wkhtmltopdf`）时子进程无内存上限，可能打爆容器（[#6916](https://github.com/zeroclaw-labs/zeroclaw/issues/6916)）；MCP/tool-schema 克隆也造成 RSS 持续增长（[#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642)）。
- **Provider 配置摩擦**：reqwest 使用不一致、模型构造参数重复、wire protocol 不透明，增加接入和排障成本（[#5937](https://github.com/zeroclaw-labs/zeroclaw/issues/5937)、[#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396)）。
- **渠道细节影响真实使用**：Telegram 回复图片/文档/语音时只剩 `[Photo]`、`[Document]` 占位符，agent 无法读取被引用内容（[#12197](https://github.com/zeroclaw-labs/zeroclaw/pull/12197)、[#12404](https://github.com/zeroclaw-labs/zeroclaw/pull/12404)、[#12405](https://github.com/zeroclaw-labs/zeroclaw/pull/12405)）。
- **正向信号**：npm audit 问题关闭（[#11853](https://github.com/zeroclaw-labs/zeroclaw/issues/11853)）；OIDC 核心栈已合并，身份认证主线进入收尾（[#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289)）。

---

## 8. 待处理积压

以下条目均在过去 24 小时有更新，说明维护者仍在触碰；问题主要是**长期未闭环**而非完全无人响应。

| 条目 | 创建时间 | 积压原因 / 关注点 |
|---|---|---|
| [#3767](https://github.com/zeroclaw-labs/zeroclaw/issues/3767) 跨渠道 TOTP | 2026-03-17 | P1 安全需求，已 8 个月；涉及所有渠道与 `gated_commands`，落地复杂度高。 |
| [#5607](https://github.com/zeroclaw-labs/zeroclaw/issues/5607) cron 前置条件门 | 2026-04-10 | 轻量钩子需求，讨论充分但未见实现 PR。 |
| [#5869](https://github.com/zeroclaw-labs/zeroclaw/issues/5869) rumqttc 依赖漏洞 | 2026-04-18 | 已 `blocked`，需要升级/替换 MQTT 客户端，安全债务持续。 |
| [#5937](https://github.com/zeroclaw-labs/zeroclaw/issues/5937) provider/reqwest 统一 | 2026-04-20 | 与 #9809 强相关，重构范围大，需与多模型 profile 一并设计。 |
| [#5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982) per-sender RBAC | 2026-04-22 | 多租户核心需求，已收窄到 agent/risk-profile 模型，但仍缺实现。 |
| [#6293](https://github.com/zeroclaw-labs/zeroclaw/issues/6293) 气隙执行模式 | 2026-05-03 | 已 `blocked`，涉及双进程/unix socket/ACP-MCP 代理，架构级改动。 |
| [#6489](https://github.com/zeroclaw-labs/zeroclaw/issues/6489) 统一能力目录 | 2026-05-06 | “Everything is a plugin” 的路线图 tracker，跨 Integrations/WASM/运行时，周期长。 |
| [#6916](https://github.com/zeroclaw-labs/zeroclaw/issues/6916) 子进程内存上限 | 2026-05-25 | P1 生产稳定性，场景明确，适合优先做小修复。 |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) + [#7821](https://github.com/zeroclaw-labs/zeroclaw/pull/7821) 沙箱策略 | 2026-05-28 / 2026-06-17 | RFC 讨论 29 条，PR 已 `stale-candidate`；设计与实现的衔接是当前安全架构最大积压。 |
| [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) 多模型 provider profile | 2026-08-07 | XL/高风险，open 超过 3 个月；review 容量是瓶颈。 |
| [#11580](https://github.com/zeroclaw-labs/zeroclaw/issues/11580) 发布二进制体积门禁 | 2026-10-06 | 仅剩 0.7MB 余量，需 release-gate 决策，否则影响 v0.9.1。 |

**维护者关注建议**：

1. **P0：解除 [#12320](https://github.com/zeroclaw-labs/zeroclaw/issues/12320)**，恢复 Security job 与 merge queue；否则所有功能推进都会被 CI 阻断。
2. **P1：处理 S0/S1 安全与稳定性项**，优先 [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279)、[#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794)、[#6916](https://github.com/zeroclaw-labs/zeroclaw/issues/6916)，并对 [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)/[#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) 给出平台支持排期。
3. **P1：对 [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)/[#7821](https://github.com/zeroclaw-labs/zeroclaw/pull/7821) 做明确取舍**：继续推进、拆分落地，或关闭 stale PR 并重新排期。
4. **P2：为 [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) 设定 review 里程碑**，避免 XL PR 长期悬空；同时将 [#11580](https://github.com/zeroclaw-labs/zeroclaw/issues/11580) 的体积策略在 v0.9.1 前定案。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-11-13）

数据窗口：2026-11-12 → 2026-11-13 ｜ 数据源：GitHub 事件流

---

## 1. 今日速览

- **今日无任何代码合入、无新版本发布**：9 条 PR 更新中 4 条待合并、5 条关闭，但 5 条关闭 PR **全部带 `[stale]` 标签**，属于自动化过期清理，而非正常合并。
- **维护活跃度处于低位**：过去 24 小时 13 条 Issues/PR 中有 **11 条（约 85%）被标记 `[stale]`**，其中包含高价值的 bug 修复（Discord 死锁、Anthropic 模型兼容、WebSocket 鉴权），这些修复被关闭而非合入，意味着**已知缺陷仍然留在主干**。
- **项目治理风险浮现**：Issue #3417 公开宣布"仓库疑似停止维护，社区已建立活跃 fork"，并以 5 条评论成为今日讨论最热话题，社区对可持续维护的诉求已从隐性担忧转为公开表态。
- **唯一活跃的技术讨论**是 #3454（模型标识符大小写校验），处于 OPEN 状态但**尚无对应 fix PR**。
- **健康度评估：偏低（黄-橙区间）**。代码库本身无崩溃、无回归报告，但"有补丁无合并"的状态正在积累技术债与信任成本，核心风险从工程质量转向维护带宽与社区分流。

> 版本发布：今日 0 个新版本，无 Releases 记录，故不展开。（当前最新版本信息在数据窗口内无更新）

---

## 2. 项目进展

**今日合并/关闭 PR：5 条，实际合入代码：0 条。**

| PR | 主题 | 状态 | 实际影响 |
|---|---|---|---|
| [#3452](https://github.com/sipeed/picoclaw/pull/3452) | 修复 Discord 网关握手死锁（升级 discordgo fork） | CLOSED `[stale]` | **未合入，缺陷仍存在** |
| [#3447](https://github.com/sipeed/picoclaw/pull/3447) | 修复 Anthropic thinking-always 模型（如 `claude-haiku-5-5`）在 token 鉴权下的 400 报错 | CLOSED `[stale]` | **未合入，兼容性问题仍存在** |
| [#2363](https://github.com/sipeed/picoclaw/pull/2363) | 修复 WebSocket 鉴权并统一 header 大小写（关联 #2354） | CLOSED `[stale]` | 开放近 7 个月后清理，未合入 |
| [#2976](https://github.com/sipeed/picoclaw/pull/2976) | 修复 Makefile 在 `go1.25.10` 版本串含空格时构建失败 | CLOSED `[stale]` | 构建兼容性问题未解决 |
| [#649](https://github.com/sipeed/picoclaw/pull/649) | MemoryStore 内存缓存 + SearchCache 双向链表 LRU 重构（性能） | CLOSED `[stale]` | 性能优化提案搁置近 9 个月后关闭 |

**推进度判断**：项目今日在功能维度上 **净推进为 0，甚至为负**——主干未获得任何修复或优化，而被清理的 PR 中至少 3 条对应真实、可复现的用户侧故障。这提示瓶颈并非"没人提方案"，而是**缺少 review / merge 的人力**。结合 #3417 的 fork 声明，项目已进入"社区产出 > 维护者消化能力"的失衡区。

---

## 3. 社区热点

**① [Issue #3417](https://github.com/sipeed/picoclaw/issues/3417) — "Active Fork & Continued Maintenance: afjcjsbx/picoclaw"**
- 作者 @afjcjsbx ｜ OPEN ｜ 5 条评论（今日最高）｜ 👍 0 ｜ 创建 2026-10-06，持续更新至 11-12
- **诉求**：仓库"appears to be unmaintained"，但社区兴趣与需求仍在，因此设立并积极维护 fork 以延续项目。
- **信号价值**：这是**项目健康度的核心负面指标**。评论数最高说明用户在为"项目是否还活着"投票。注意 👍 为 0 而评论为 5，更多是疑问与讨论而非一边倒支持，说明社区仍在观望而非集体迁移。这是维护者最后一次低成本的"重新表明路线图"窗口。

**② [Issue #3454](https://github.com/sipeed/picoclaw/issues/3454) — 模型标识符校验建议把未知 provider 前缀小写化，破坏大小写敏感的上游模型 ID**
- 作者 @SecInsight ｜ OPEN ｜ 3 条评论
- **诉求**：在模型编辑面板中输入 `ACME/gpt-4o-mini`（`ACME` 非内置 provider，而是上游命名空间）时，UI 弹出 "`ACME` should use `acme` — Fix" 提示；点击 Fix 会**直接改写用户输入**，导致请求打到错误模型或被上游拒绝。
- **背后问题**：这是典型的"**辅助功能越权修改用户配置**"缺陷。校验逻辑把"内置 provider 白名单"与"任意上游命名空间"混为一谈，且没有"我确定要保留原样"的逃生口。对多 provider 混用的进阶用户影响直接（配置静默损坏），属于**数据/配置完整性**层面的问题，优先级应高于普通 UI 文案问题。

---

## 4. Bug 与稳定性

按严重程度排序（数据窗口内无崩溃/panic 报告，以下均为功能性缺陷）：

| # | 严重度 | 问题 | 状态 | Fix PR |
|---|---|---|---|---|
| 1 | **高** | **Discord 通道可永久"失聪"**：bot 显示已连接，但收发全无、心跳不发、无任何日志——`discordgo` fork 固定提交存在网关握手死锁（[PR #3452](https://github.com/sipeed/picoclaw/pull/3452)） | 修复 PR **已 CLOSED `[stale]`** | 有，但**未合入** |
| 2 | **高** | **Anthropic thinking-always 模型 + token 鉴权 100% 失败**：`claude-haiku-5-5` 等返回 `400 "temperature" is deprecated for this model`（[PR #3447](https://github.com/sipeed/picoclaw/pull/3447)） | 修复 PR **已 CLOSED `[stale]`** | 有，但**未合入** |
| 3 | 中高 | **模型 ID 被错误小写化**，静默破坏大小写敏感的上游模型标识（[#3454](https://github.com/sipeed/picoclaw/issues/3454)） | **OPEN，活跃** | **无** |
| 4 | 中 | **WebUI 误报 "restart required"**：`gateway.hot_reload: true` 下配置已在 ~2 秒内生效（网关日志可验证），但 toast 与 `gateway_restart_required` 持续为 `true`（[#3453](https://github.com/sipeed/picoclaw/issues/3453)） | CLOSED `[stale]` | **无**（未修复即关闭） |
| 5 | 中 | **WebSocket 鉴权缺陷 / header 大小写不一致**（[PR #2363](https://github.com/sipeed/picoclaw/pull/2363)，关联 #2354） | CLOSED `[stale]` | 有，但**未合入** |
| 6 | 低 | **构建失败**：Makefile 解析 `go env GOVERSION`（如 `go1.25.10 X:nodwarf5`）因空格报错（[PR #2976](https://github.com/sipeed/picoclaw/pull/2976)） | CLOSED `[stale]` | 有，但**未合入** |

**稳定性结论**：无新增崩溃类报告，说明核心运行时相对稳定；但 **#1、#2 属于"静默失效"型缺陷**——不报错、不写日志、用户难以自查，这类问题对 AI Agent 产品的杀伤力远高于显式崩溃。二者都已有社区验证过的补丁，**当前唯一的阻塞是合并动作本身**，建议列为最高优先级动作项。

---

## 5. 功能请求与路线图信号

| 需求 | 来源 | 状态 | 纳入下一版本的可能性 |
|---|---|---|---|
| **Android 4.4 (API 19) / x86_32 / x86_64 兼容**：覆盖老旧 TV Box、平板、x86 单板机 | [Issue #3451](https://github.com/sipeed/picoclaw/issues/3451)（@teicoti） | CLOSED `[stale]` | **低**。需求合理（PicoClaw 面向轻量/嵌入式场景，与 Sipeed 硬件生态契合），但 API 19 需 NDK/工具链降级与大量兼容测试，成本高、收益偏长尾；且无对应 PR 提交。 |
| **内存与缓存性能优化**：MemoryStore 增加内存缓存减少文件 I/O；SearchCache 以双向链表替换切片式 LRU，降低 O(n) 开销 | [PR #649](https://github.com/sipeed/picoclaw/pull/649)（@liangzhang-keepmoving） | CLOSED `[stale]` | **中**。方向与"个人 AI 助手长期记忆"主线高度一致，属于架构级收益；但已搁置 9 个月，需重新 rebase 与基准测试，短期难以复活。 |
| **模型标识符校验可配置/可绕过** | 由 [#3454](https://github.com/sipeed/picoclaw/issues/3454) 隐含 | OPEN | **中高**。改动面小（校验规则 + UI 逃生口），且直接影响可用性，是最容易"低成本止血"的一项。 |
| **WebUI 与 gateway 热重载状态一致性** | 由 [#3453](https://github.com/sipeed/picoclaw/issues/3453) 隐含 | CLOSED `[stale]` | **中**。属于"状态源单一化"的架构小修，但已被关闭，需重新开单。 |

**路线图信号解读**：今日没有任何"新功能"提案，全部是**质量与可用性修补**。这通常是项目成熟期的正常形态，但在当前合入停滞的背景下，也意味着项目处于"守成而非扩张"阶段。

---

## 6. 用户反馈摘要

从 Issue 摘要与评论线索中提炼的真实痛点：

- **"项目还活着吗？"是当前最大的用户焦虑**。#3417 的措辞（"appears to be unmaintained… still significant interest and demand"）表明用户并非不满功能，而是**不满响应速度**。用户愿意迁移到 fork，说明粘性存在，但耐心正在耗尽。
- **进阶用户在多 provider 混用场景受阻**：#3454 的 `ACME/gpt-4o-mini` 案例说明真实用户已在使用**自定义/上游命名空间**接入第三方或自建网关，而当前的"智能纠错"把他们当成新手来纠正，造成配置被静默篡改——典型的好意功能伤到高阶用户。
- **自托管/热重载是核心使用场景**：#3453 明确使用 `gateway.hot_reload: true`，属于常驻服务型部署；用户对"配置是否真的生效"高度敏感，误报 `restart required` 会直接导致不必要的服务重启，影响可用性。
- **渠道可靠性被重点审视**：Discord 通道"显示已连接但完全不工作、日志无任何输出"是最令人沮丧的故障形态——用户无法自助定位，只能怀疑自己配置错了。这类反馈一旦扩散，对"开源个人助手"的口碑伤害极大。
- **嵌入式/老旧设备仍是真实需求面**：#3451 提到大量仍在服役的 TV Box、平板、SBC——这与 PicoClaw 的定位一致，说明用户群体偏向"低成本硬件 + 自托管 AI"，而非云端尝鲜者。

---

## 7. 待处理积压（建议维护者优先处理）

**A. 需立即决策（有补丁、有验证、影响大）**
1. [PR #3452](https://github.com/sipeed/picoclaw/pull/3452) — Discord 网关死锁修复（2026-10-28 创建，已被 stale 关闭）
2. [PR #3447](https://github.com/sipeed/picoclaw/pull/3447) — Anthropic thinking-always 模型 token 鉴权修复（2026-10-24 创建，已被 stale 关闭）
3. [Issue #3454](https://github.com/sipeed/picoclaw/issues/3454) — OPEN 且仍活跃，**是目前唯一未被清理的活跃技术议题，建议优先分配**。

**B. 依赖更新积压（4 条，均为 11-05 创建、现已 stale）**
- [#3460](https://github.com/sipeed/picoclaw/pull/3460) azidentity 1.14.0 → 1.15.0
- [#3459](https://github.com/sipeed/picoclaw/pull/3459) line-bot-sdk-go/v8 8.20.1 → 8.23.0
- [#3458](https://github.com/sipeed/picoclaw/pull/3458) modernc.org/sqlite 1.53.0 → 1.61.1（跨 8 个 minor，含 provenance 签名相关变更，建议重点 review）
- [#3457](https://github.com/sipeed/picoclaw/pull/3457) golang.org/x/time 0.15.0 → 0.16.0（**注意：该版本将 go directive 提升至至少 1.26.0，可能抬高项目最低 Go 版本，属潜在破坏性变更**）

> 建议动作：将 dependabot PR 的 stale 策略与普通 PR 分离，避免安全/依赖更新被自动关闭。

**C. 长期挂起（>6 个月）**
- [PR #2363](https://github.com/sipeed/picoclaw/pull/2363)（2026-04-05，WebSocket 鉴权）— 已 stale 关闭，但关联的安全类问题值得重新评估。
- [PR #649](https://github.com/sipeed/picoclaw/pull/649)（2026-02-22，内存/缓存性能）— 挂起 9 个月，建议明确"接受 / 需重做 / 拒绝"三种结论之一并公开，而非静默过期。
- [PR #2976](https://github.com/sipeed/picoclaw/pull/2976)（2026-05-30，Makefile 空格构建失败）— 改动极小，属于"低成本高 goodwill"的合入候选。

---

## 8. 结论与建议

**一句话总结**：PicoClaw 今日的工程质量没有恶化，但**项目的"响应能力"正在成为最大风险**——11/13 条动态为自动化 stale 清理，0 次合入，而社区已在公开讨论 fork 存续方案。

**三项高杠杆动作**（按投入产出排序）：
1. **合入 2 个已验证修复**（#3452、#3447），用最小的 merge 动作直接消除两个"静默失效"型高危缺陷；
2. **回应 Issue #3417**，发布一份哪怕只有 3 行的维护状态与路线图声明——公开表态的成本远低于社区分流后的挽回成本；
3. **调整 stale 机器人策略**，对 `dependencies`、`type: bug` 标签设置豁免或更长窗口，避免修复被自动丢弃。

**健康度评级：⚠️ 需关注（Maintenance Risk）** — 代码稳定、社区仍有热情、补丁供给充足，但合并通道堵塞，存在向"社区 fork 主导"迁移的早期迹象。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 · 2026-11-13

> 数据来源：github.com/agentscope-ai/QwenPaw ｜ 统计窗口：过去 24 小时

---

## 一、今日速览

1. **项目处于 2.3.0 发布后的"密集修 Bug 阶段"**：25 条 Issue 更新（17 条新开/活跃、8 条关闭）、50 条 PR 更新（38 条待合并、12 条已完成），问题收集与修复 PR 提交同步进入高峰。
2. **社区修复相关流程响应较快**：昨日报告的多个问题（升级镜像 #8698、DoomLoop #8700、cron 假成功 #8184）在 24 小时内就有对应 fix PR 提交（#8704、#8701、#8702），其中 3 条来自 first-time-contributor。
3. **完成了 8 条长期问题**：包括 3 月创建、悬停 7 个多月的定时任务 Memory 中断问题 #2306 最终关闭；4 条控制台 UI 体验类 Issue 集中结束处理。
4. **风险集中在渠道插件生命周期与认证边界**：微信/Matrix 官方插件在升级后启动失败、Linux worker 崩溃、同主机反代绕过鉴权（#8695）等问题在同一时期集中出现，是当前稳定性最大的不稳定因素。

**整体健康度判断**：活跃度高（50 PR/24h），响应及时性好，但 2.3.0 的破坏性变更（渠道插件化、升级迁移）仍在产生后续影响，累积的待合并 PR 已达 38 条、其中多条 XL/XXXL 级 PR 长期处于 Under Review，合并压力开始显现。

---

## 二、版本发布

无新版本发布（过去 24 小时 0 个 Release）。

---

## 三、项目进展

过去 24 小时共 **12 条 PR 已合并/关闭**（完整明细未在数据中列出，本节基于 Issue 关闭情况与展示样本推断）：

- **控制台体验明显改善**：以下 4 个 Issue 关闭，说明对应修复已落地或即将合并
  - [#8605](https://github.com/agentscope-ai/QwenPaw/issues/8605) 浏览器标签页标题跟随当前会话名（多标签页可区分）
  - [#8650](https://github.com/agentscope-ai/QwenPaw/issues/8650) 思考块与工具卡片视觉不一致、左侧边缘跳动
  - [#8612](https://github.com/agentscope-ai/QwenPaw/issues/8612) "执行"类工具调用语义不明
  - [#8663](https://github.com/agentscope-ai/QwenPaw/issues/8663) Safari 下消息队列操作按钮不渲染
- **渠道插件**：[#8538](https://github.com/agentscope-ai/QwenPaw/issues/8538) Matrix 多渠道共享 10s 启动窗口导致的激活失败问题关闭，相关补丁（#8559/#8558/#8584/#8599/#8411）已进入 2.3.0 主线。
- **配置系统**：[#8035](https://github.com/agentscope-ai/QwenPaw/issues/8035) Transcription 设置页无法配置 `transcription_model` 导致切换 provider 静默失效的问题关闭。
- **长期悬停的问题最终关闭**：[#2306](https://github.com/agentscope-ai/QwenPaw/issues/2306) 定时任务整理 Memory 时被"莫名其妙打断"（12 条评论，自 2026-03 起跟踪）完成处理。
- **功能侧**：[#5110](https://github.com/agentscope-ai/QwenPaw/issues/5110) 引用/参考回复文本用于追问（类 Perplexity）的增强请求关闭，说明已纳入规划或实现。

> **进展评估**：本轮推进以"控制台 UI 收敛 + 2.3.0 渠道遗留问题收尾"为主线，属于**质量巩固型进展**而非大功能推进。产品主线（插件化体系、CLI 扩展点、Whisper SDK 化）仍停留在 OPEN PR 阶段（#8554、#8431、#8699）。

---

## 四、社区热点

| 排名 | 条目 | 评论 | 状态 | 背后诉求 |
|---|---|---|---|---|
| 1 | [#2306](https://github.com/agentscope-ai/QwenPaw/issues/2306) 定时任务整理 Memory 被中断 | 12 | ✅ CLOSED | 长周期定时任务的**可观测性与可恢复性**——用户只能从 console 看到"被打断"，缺乏中断原因归因 |
| 2 | [#8538](https://github.com/agentscope-ai/QwenPaw/issues/8538) Matrix 插件多工作区激活失败 | 6 | ✅ CLOSED | 多租户/多工作区场景下的**插件启动隔离** |
| 3 | [#8312](https://github.com/agentscope-ai/QwenPaw/issues/8312) 上下文控制失效导致任务中断 | 5 | 🔴 OPEN | 上下文压缩算法在 251,904 token 窗口边界处 fail-closed，**长任务可靠性**是核心痛点 |
| 4 | [#8580](https://github.com/agentscope-ai/QwenPaw/issues/8580) Memory tag 索引永不重建（/memory/tags 503） | 5 | 🔴 OPEN | 记忆系统"生成了但读不出来"，**功能完整性问题** |
| 5 | [#8184](https://github.com/agentscope-ai/QwenPaw/issues/8184) Doom-loop 拦截合法轮询 + cron 记录假成功 | 4 | 🔴 OPEN | 循环检测器**无法区分"卡死"与"合法等待"**，且状态上报失真 |
| 6 | [#8361](https://github.com/agentscope-ai/QwenPaw/issues/8361) 自动记忆搜索同轮重复调用 memory_search | 4 | 🔴 OPEN | 重复搜索拦截后**收敛失败**，用户侧表现为完全无法回复 |

**热点分析**：讨论热度最高的 6 个 Issue 中，**5 个指向同一个元问题——"Agent 自主执行链条的可控性"**（上下文压缩、循环门控、重复工具调用、定时任务中断）。用户已从"能不能跑起来"过渡到"跑起来后能不能被信任"，这对 QwenPaw 的 agent runtime 层提出了明确的鲁棒性要求。

PR 侧本次数据未提供评论数，但 #8295 与 #8133 均已更新至 11-13 且始终处于 OPEN，说明在高活跃度下仍在反复修改。

---

## 五、Bug 与稳定性

### 🔴 P0 — 安全 / 数据正确性

| 编号 | 问题 | 状态 | 是否有 Fix PR |
|---|---|---|---|
| [#8695](https://github.com/agentscope-ai/QwenPaw/issues/8695) | **同主机反向代理绕过 API 认证**：`QWENPAW_AUTH_ENABLED=true` 下，经同主机反代的请求被误判为本地 CLI 请求，跳过 bearer token 校验（`qwenpaw/app/auth.py` loopback 白名单 + `trusted_proxies` 为空） | OPEN | ❌ 未见 |
| [#8705](https://github.com/agentscope-ai/QwenPaw/issues/8705) | **cron 任务 token 用量未写入 `turns.jsonl`**，与对话路径不一致，用量面板统计缺失 | OPEN | ❌ 未见 |

> #8695 是本次数据中**唯一的高危安全问题**，建议优先处理。攻击面为所有"前端 + 后端同机部署 + 反向代理"的典型自托管场景。

### 🟠 P1 — 功能失效 / 启动崩溃

| 编号 | 问题 | 状态 | 是否有 Fix PR |
|---|---|---|---|
| [#8693](https://github.com/agentscope-ai/QwenPaw/issues/8693) | 微信官方渠道插件启动报 `ACCOUNT_IN_USE`（channel 启动路径与 workspace 投影重复占用同一 runtime key） | OPEN | ❌ |
| [#8682](https://github.com/agentscope-ai/QwenPaw/issues/8682) | 官方渠道插件 worker 在 Linux 上崩溃（launcher / worker bootstrap 均不传递 `HOME` / `QWENPAW_WORKING_DIR`） | OPEN | ❌ |
| [#8684](https://github.com/agentscope-ai/QwenPaw/issues/8684) | **升级不迁移内置渠道插件**：`~/.qwenpaw/plugins/matrix` 仍为旧源码，2.3.0 的 Matrix 修复全部不生效 | OPEN | ⚠️ 相关设计在 [#8699](https://github.com/agentscope-ai/QwenPaw/pull/8699) 中部分覆盖 |
| [#8312](https://github.com/agentscope-ai/QwenPaw/issues/8312) | 上下文压缩无法收敛导致任务中断（252565 > 251904） | OPEN | ❌ |
| [#8580](https://github.com/agentscope-ai/QwenPaw/issues/8580) | Memory tag 索引永不重建，`/memory/tags` 返回 503 | OPEN | ❌ |
| [#8361](https://github.com/agentscope-ai/QwenPaw/issues/8361) | Automatic Memory Search 重复调用拦截后无法正常回复 | OPEN | ❌ |
| [#8700](https://github.com/agentscope-ai/QwenPaw/issues/8700) | **DoomLoopGate 在 agentscope 单条 assistant 消息累积模式下永不触发** | OPEN | ✅ [#8701](https://github.com/agentscope-ai/QwenPaw/pull/8701) |
| [#8184](https://github.com/agentscope-ai/QwenPaw/issues/8184) | Doom-loop 误杀合法轮询，cron 终止后仍记录 success | OPEN | ✅ [#8702](https://github.com/agentscope-ai/QwenPaw/pull/8702) |
| [#8698](https://github.com/agentscope-ai/QwenPaw/issues/8698) | 升级 2.3.0 失败：`uv venv --seed` 未使用 PyPI 镜像 | OPEN | ✅ [#8704](https://github.com/agentscope-ai/QwenPaw/pull/8704) |
| [#8655](https://github.com/agentscope-ai/QwenPaw/issues/8655) | 附件路径被截断到盘符根目录（2.3.0b1 引入，b3 仍复现） | OPEN | ❌ |

### 🟡 P2 — 边界缺陷

| 编号 | 问题 | 是否有 Fix PR |
|---|---|---|
| [#8696](https://github.com/agentscope-ai/QwenPaw/issues/8696) | workspace 路径含 `#` 时附件无法解析（Win & main） | ❌ |
| [#8688](https://github.com/agentscope-ai/QwenPaw/issues/8688) | Python heredoc 中 `~,` 被 shell-path 启发式误判，深层路径检查被中止 | ❌ |
| [#8674](https://github.com/agentscope-ai/QwenPaw/issues/8674) | 查询异常反复生成完整会话 JSON 快照，无容量限制/清理策略 | ❌ |
| [#8703](https://github.com/agentscope-ai/QwenPaw/pull/8703) | （Fix PR）容器内无 securityfs 时 Landlock 探测误报 unsupported，导致 `run_code` 全部 fail-closed | ✅ 已提交 |

**稳定性小结**：17 条活跃 Issue 中 **10 条为 P0/P1**，其中仅 3 条已有对应 fix PR，**修复覆盖率约 30%**。#8693 / #8682 / #8684 三条同源（渠道插件化迁移不完整），建议合并成一条专项处理线。

---

## 六、功能请求与路线图信号

| 需求 | Issue / PR | 落地可能性评估 |
|---|---|---|
| **插件数据目录规范化 + 破坏性文件操作审计** | [#8686](https://github.com/agentscope-ai/QwenPaw/issues/8686) | ⭐⭐⭐⭐ 高。第三方插件 `event-trigger` 每次启动删除 `.py` 文件的事件已构成生态信任危机，与 2.3.0 插件化战略直接冲突，优先级必然上调 |
| **插件更新 / 版本守卫 / 官方插件市场** | [#8699](https://github.com/agentscope-ai/QwenPaw/pull/8699) (XXL) | ⭐⭐⭐⭐ 高。可同时缓解 #8684（升级不迁移）问题，是问题 #8684 的架构级解法 |
| **插件支持 CLI 命令与扩展点** | [#8554](https://github.com/agentscope-ai/QwenPaw/pull/8554) (XXXL) | ⭐⭐⭐ 中。生态扩展能力强，但体量巨大（XXXL），评审周期会较长 |
| Local Whisper 转 SDK 插件 | [#8431](https://github.com/agentscope-ai/QwenPaw/pull/8431) (XXXL) + [#8491](https://github.com/agentscope-ai/QwenPaw/pull/8491) | ⭐⭐⭐ 中。配合 #8491 解决 whisper 导入拉起 torch（163MB→853MB）的内存问题，方向明确 |
| 外部渠道启动的会话重连 | [#8671](https://github.com/agentscope-ai/QwenPaw/pull/8671) | ⭐⭐⭐⭐ 高，功能完整度高、有明确 UX 场景 |
| Markdown 预览移动端适配 | [#8683](https://github.com/agentscope-ai/QwenPaw/issues/8683) | ⭐⭐⭐ 中，属于控制台体验收尾批次 |
| Ollama 按 `num_ctx` 设置上下文窗口 | [#8236](https://github.com/agentscope-ai/QwenPaw/pull/8236) | ⭐⭐⭐⭐ 高，本地模型用户的刚需，Under Review 中 |

**路线图信号**：2.3.0 引入的"渠道插件化"正在暴露配套缺失（迁移、更新、数据目录、版本守卫）——**下一版本极可能以"插件系统 v2 收尾"为主题**，而非新增 agent 能力。

---

## 七、用户反馈摘要

**🔴 不满意（集中于自主执行可靠性）**
- "定时任务没执行完成，去 console 看才发现模型回复被打断了"——用户对中断**只有结果感知、没有原因感知**（#2306）
- "上下文压缩无法把请求塞进窗口，任务直接中断"——长任务场景下用户被迫手动拆分会话（#8312）
- "同一个 turn 里模型用几乎相同的 query 反复调用 memory_search，拦了之后连正常回复也出不来"——**保护机制本身成了故障源**（#8361）
- "DoomLoop 门控分不清'卡住'和'按指令等待'，还把终止后的 cron 记成成功"——用户明确质疑监控语义正确性（#8184、#8700）

**🟠 不满意（升级体验）**
- 2.3.0 升级路径问题密集：安装镜像失效（#8698）、插件未迁移（#8684）、附件路径回归（#8655，b1 引入、b3 仍复现）。**beta 阶段的回归问题未能到 GA 前收敛**，是本次最值得反思的发布流程信号。

**🟢 满意/正向反馈**
- 控制台工具调用描述已大幅改进："⏱ 获取当前时间 / 📄 阅读 MEMORY.md 预览 16 行 / 🔍 文本匹配 trim-cli 16 匹配"——用户原话"大部分工具已经是一句人话，很好"（#8612）
- 用户开始主动提出精细化 UI 建议（视觉一致性、标签页标题、移动端预览），说明**使用频率已进入日常化阶段**，而非尝鲜。

**典型使用场景画像**
- 多工作区 + 多渠道（Matrix / 微信 / 控制台）并行部署的自托管用户
- 重度使用 cron 定时任务 + Memory 做长期自动化的进阶用户
- 本地模型（Ollama）与大窗口模型（`codemode-flash`，251904 token）混合使用的技术型用户

---

## 八、待处理积压

### ⚠️ 长期未收敛的高优 Issue

| 编号 | 标题 | 悬停时长 | 风险 |
|---|---|---|---|
| [#8184](https://github.com/agentscope-ai/QwenPaw/issues/8184) | Doom-loop 误杀合法轮询 + cron 假成功 | **32 天**（2026-10-12 起） | 已有 PR #8702 但未合并，cron 用量与状态失真仍在发生 |
| [#8312](https://github.com/agentscope-ai/QwenPaw/issues/8312) | 上下文控制失效导致任务中断 | **26 天**（2026-10-18 起） | 无 fix PR，长任务可靠性核心问题 |
| [#8361](https://github.com/agentscope-ai/QwenPaw/issues/8361) | 自动记忆搜索重复调用后无法回复 | **23 天**（2026-10-21 起） | 无 fix PR，记忆功能实际不可用 |
| [#8580](https://github.com/agentscope-ai/QwenPaw/issues/8580) | Memory tag 索引永不重建 | **9 天**（2026-11-04 起） | 无 fix PR，记忆标签"生成了但读不出" |

### ⚠️ 长期 Under Review 的大型 PR（合并塞车风险）

| PR | 规模 | 悬停时长 | 说明 |
|---|---|---|---|
| [#8018](https://github.com/agentscope-ai/QwenPaw/pull/8018) | size/XL | **45 天** | Windows 沙箱 ACE 不应写入卷根（安全相关） |
| [#8048](https://github.com/agentscope-ai/QwenPaw/pull/8048) | size/M | **44 天** | 未沙箱化前防护内联 Office COM 自动化（安全相关） |
| [#8133](https://github.com/agentscope-ai/QwenPaw/pull/8133) | size/L | **36 天** | CJK Markdown 强调边界修复（中文用户体验） |
| [#8236](https://github.com/agentscope-ai/QwenPaw/pull/8236) | size/XL | **30 天** | Ollama `num_ctx` 上下文窗口 |
| [#8295](https://github.com/agentscope-ai/QwenPaw/pull/8295) | size/S | **27 天** | 渠道侧隐藏注入的 context 控制标记 |
| [#8431](https://github.com/agentscope-ai/QwenPaw/pull/8431) | size/XXXL | 18 天 | Local Whisper SDK 插件化 |
| [#8554](https://github.com/agentscope-ai/QwenPaw/pull/8554) | size/XXXL | 10 天 | 插件 CLI 命令与扩展点 |
| [#8588](https://github.com/agentscope-ai/QwenPaw/pull/8588) | size/XXL | 8 天 | OpenViking 记忆插件后续清理 |

**维护者建议**：
1. **优先处理 #8695 安全漏洞**，这是唯一具备攻击可行性的 P0。
2. **#8018 / #8048 两条安全类 PR 已悬停 44–45 天**，建议指定 reviewer 或拆分合并，避免安全修复长期滞留。
3. **#8693 / #8682 / #8684 三条渠道插件问题建议合并为专项**，与 #8699 一同推进。
4. **38 条待合并 PR 中多位首次贡献者（#8701/#8702/#8703/#8704）**，建议优先 review 以维持新贡献者留存率——这是当前项目社区健康度最值得保护的一环。

---

*报告生成时间：2026-11-13 ｜ 数据窗口：过去 24 小时 ｜ 统计口径：GitHub Issues + Pull Requests*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报（2026-11-13）

> 统计窗口：截至 2026-11-13 的过去 24 小时。以下分析基于提供的 Issues/PR 展示样本；Issues 展示评论数最多 30 条，PR 展示 20 条。

## 1. 今日速览

- 过去 24 小时 Issues 更新 **500** 条（新开/活跃 **366**、关闭 **134**），PR 更新 **500** 条（待合并 **375**、已合并/关闭 **125**），无新版本发布。  
- 活跃度处于**极高水平**，但 PR 待合并/已合并关闭约为 **3.0:1**，积压压力明显；Issues 新开活跃/关闭约为 **2.7:1**，新增讨论快于闭环速度。  
- 讨论集中在统一网关 post-merge 稳定性、权限/认证、Kanban 与终端生命周期、跨平台消息适配和安全边界。  
- 可见样本中多条 P1/P2 问题仍为 OPEN，且部分长期未闭环；整体健康度可概括为：**高活跃、高吞吐，但维护负载与稳定性风险偏高**。  
- 今日最热线程：[#143547 统一网关 post-merge 问题](https://github.com/NousResearch/hermes-agent/issues/143547)、[#131859 API 创建 PR 权限错误](https://github.com/NousResearch/hermes-agent/issues/131859)、[#97065 Keet gateway setup 崩溃](https://github.com/NousResearch/hermes-agent/issues/97065)。

## 2. 版本发布

今日无新版本发布（0 个），最新 Releases 为空；无破坏性变更或迁移注意事项需要说明。

## 3. 项目进展

数据概览显示过去 24 小时有 **125** 条 PR 已合并/关闭，但提供的 20 条最新 PR 样本全部为 OPEN，无法从样本中列出具体合并 PR；因此本节以**已关闭 Issue** 与**待合并高价值 PR**评估项目推进方向。

**已关闭的重要 Issue：**

- [#136486](https://github.com/NousResearch/hermes-agent/issues/136486) [CLOSED, P2] `reasoning` 别名与 `reasoning_content` 重复导致 HTTP 400、字段拒绝学习失效的问题已关闭；该问题有 20 条评论、3 个 👍，属于模型兼容性/回退链路的稳定性清理。  
- [#131578](https://github.com/NousResearch/hermes-agent/issues/131578) [CLOSED, P1] 子代理后台进程完成通知将聊天路由重新固定到子代理、导致会话卡住 30 分钟并丢失委派结果的问题已关闭，对网关会话可靠性是正向信号。  
- [#133514](https://github.com/NousResearch/hermes-agent/issues/133514) [CLOSED, P2] 父级网关 turn 结束后后台委派审批不可见、`/approve` 报无待审批的问题已关闭。  
- [#78383](https://github.com/NousResearch/hermes-agent/issues/78383) [CLOSED, P2] Windows 下含空格路径的 `MEDIA:` 标签被重复投递的问题已关闭。  
- [#20249](https://github.com/NousResearch/hermes-agent/issues/20249) [CLOSED, not-planned] “按 turn 按需升级模型”的 Model Presets 功能被标记为不计划，说明该方向短期不进入路线图。

**待合并队列中的关键推进信号：**

- 安全与权限：[#153698](https://github.com/NousResearch/hermes-agent/pull/153698) 要求 `/debug` 上传前显式同意；[#154779](https://github.com/NousResearch/hermes-agent/pull/154779) 修复受保护指令写入门禁；[#154649](https://github.com/NousResearch/hermes-agent/pull/154649) 通过 askpass helper 传递 sudo 密码。  
- 网关/进程可靠性：[#154776](https://github.com/NousResearch/hermes-agent/pull/154776) 补发生命周期杀死的后台进程死亡通知；[#154777](https://github.com/NousResearch/hermes-agent/pull/154777) 让 `persist_on_release` 作业跨网关重启存活；[#154730](https://github.com/NousResearch/hermes-agent/pull/154730) 仅向支持编辑的 relay 聊天流式输出。  
- 桌面与安装体验：[#152168](https://github.com/NousResearch/hermes-agent/pull/152168) 引入重设计的 Desktop agent workspace；[#154769](https://github.com/NousResearch/hermes-agent/pull/154769) 修复 zsh `ZDOTDIR` 环境下 PATH 写入错误；[#154772](https://github.com/NousResearch/hermes-agent/pull/154772) 阻止 macOS 应用向已签名 bundle 写入字节码。  
- 模型配置能力：[#154780](https://github.com/NousResearch/hermes-agent/pull/154780) 增加 per-model `supported_reasoning_efforts` 声明，降低自定义 OpenAI 兼容端点因 reasoning effort 不兼容而 400 的概率。

## 4. 社区热点

- [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) **64 条评论，OPEN，P2**：统一网关 #106742 合并后的遗留问题总帖，涉及 gateway、cron、desktop、sessions、profiles、TUI gateway。核心诉求是迁移后的会话路由、多入口一致性和 post-merge 稳定性。  
- [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) **59 条评论，OPEN，blocked/upstream**：通过 API 创建 PR 时 `CreatePullRequest` 权限错误，fork PR 与 issue 创建仍可用。反映外部贡献者的协作流程被权限/上游问题阻塞。  
- [#97065](https://github.com/NousResearch/hermes-agent/issues/97065) **30 条评论，OPEN，P3**：Keet gateway setup 因 `_n()` 缺少 `config` 参数崩溃。插件化网关向导的健壮性和 Windows 环境适配受到关注。  
- [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) **29 条评论，OPEN，P3/needs-decision**：终端生命周期 guard 误杀 Node.js CLI（如 `obsidian-headless`）。用户希望在安全防护与合法自动化之间取得更细粒度平衡。  
- [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) **22 条评论，OPEN，P1**：网关卡顿时 Kanban workers 以 “Kanban execution unknown; retained by owner” 崩溃，多个 worker 同时失败且进行中的工作丢失。属于高优先级可靠性热点。  
- [#110374](https://github.com/NousResearch/hermes-agent/issues/110374) **15 条评论、17 个 👍，OPEN，P2**：`slack-sdk >= 3.44` 后 Slack 工作状态指示器静默失效，是今日反应数最高的样本之一。  
- PR 侧评论数未提供，但按影响面看，[#153698](https://github.com/NousResearch/hermes-agent/pull/153698)（P1 安全同意）、[#152168](https://github.com/NousResearch/hermes-agent/pull/152168)（桌面重设计）和 [#154780](https://github.com/NousResearch/hermes-agent/pull/154780)（模型 reasoning 配置）值得重点关注。

## 5. Bug 与稳定性

按严重程度与影响面排序；fix PR 状态仅基于展示样本判断。

| 严重度 | 问题 | 状态 | Fix PR 情况 |
|---|---|---|---|
| P1 | [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) Kanban workers 在网关卡顿时崩溃，进行中工作丢失 | OPEN | 展示样本未见直接 fix PR |
| P1 | [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) `gateway.multiplex_profiles` 下默认 profile secrets 泄漏到 secondary profile 的 terminal/Kanban 子进程 | OPEN | 展示样本未见直接 fix PR，安全边界风险高 |
| P1 | [#95670](https://github.com/NousResearch/hermes-agent/issues/95670) Discord handoff direct thread 创建未显式指定 `type`，默认成 private_thread | OPEN | 展示样本未见直接 fix PR |
| P1→已关闭 | [#131578](https://github.com/NousResearch/hermes-agent/issues/131578) 子代理后台进程完成通知重固定聊天路由，导致会话卡住 30 分钟 | CLOSED | 已关闭，属今日稳定性正向信号 |
| P2 | [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 统一网关 post-merge 遗留问题总帖，跨多组件 | OPEN | umbrella issue，展示样本未见直接 fix PR |
| P2 | [#110374](https://github.com/NousResearch/hermes-agent/issues/110374) Slack 状态指示器在 `slack-sdk >= 3.44` 后静默失效 | OPEN | 展示样本未见直接 fix PR；17 👍 表明影响面较广 |
| P2 | [#68128](https://github.com/NousResearch/hermes-agent/issues/68128) WhatsApp bridge 在 no-breakaway job object 下 WinError 5，缺少 Windows detach fallback | OPEN | 展示样本未见直接 fix PR |
| P2 | [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) `browser_exec` 完成后遗留 `browser_harness.daemon` 进程 | OPEN | 展示样本未见直接 fix PR |
| P2 | [#146428](https://github.com/NousResearch/hermes-agent/issues/146428) cron run 在 multiplexed profiles 下因 `UnscopedSecretError` 永久静默卡死 | OPEN | 展示样本未见直接 fix PR |
| P2 | [#141855](https://github.com/NousResearch/hermes-agent/issues/141855) Desktop 中用户消息在 compaction 合并到 `model_switch` 通知后从 transcript 消失 | OPEN | [#154683](https://github.com/NousResearch/hermes-agent/pull/154683) 涉及压缩语义修正，但非明确直接修复 |
| P2 | [#108927](https://github.com/NousResearch/hermes-agent/issues/108927) Kanban 熔断器在瞬态基础设施故障后永久放弃卡片，原因恢复后不重试 | OPEN | 展示样本未见直接 fix PR |
| P3 | [#97065](https://github.com/NousResearch/hermes-agent/issues/97065) Keet gateway setup 崩溃 | OPEN | 展示样本未见直接 fix PR |
| P3 | [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) 终端 lifecycle guard 误杀 Node.js CLI | OPEN | 展示样本未见直接 fix PR，需决策 |

## 6. 功能请求与路线图信号

- **上下文压缩性能与正确性**：  
  [#117886](https://github.com/NousResearch/hermes-agent/issues/117886) 提议将上下文压缩移到 turn 边界后台执行，避免阻塞回复；[#97390](https://github.com/NousResearch/hermes-agent/issues/97390) 提议按频道在空闲时后台压缩；[#86421](https://github.com/NousResearch/hermes-agent/issues/86421) 提议压缩后重新注入 skill 内容或阻塞 stale `SKILL_PRUNED` 标记。三者均 OPEN 且带 needs-decision，说明压缩是持续路线图议题，但短期落地仍需设计决策。  
- **模型能力声明**：  
  [#154780](https://github.com/NousResearch/hermes-agent/pull/154780) 已提交 per-model `supported_reasoning_efforts`，若合并，将直接改善自定义 OpenAI 兼容端点的 reasoning effort 兼容性，较可能进入近期版本。  
- **桌面工作区重设计**：  
  [#152168](https://github.com/NousResearch/hermes-agent/pull/152168) 引入 Figma 重设计 workspace，并提供经典界面回退开关；属于大颗粒 UI 功能，若评审顺利可能成为下一阶段桌面版本亮点。  
- **ACP 生态集成**：  
  [#47435](https://github.com/NousResearch/hermes-agent/issues/47435) 请求将 Hermes Agent 注册到 ACP Registry 以支持 Zed/JetBrains/VS Code；当前 P4/needs-decision，短期路线图信号较弱。  
- **插件目录扩展**：  
  [#154778](https://github.com/NousResearch/hermes-agent/pull/154778) 新增 `cardworthscanner` MCP 插件注册，属于低风险目录扩展，较易合并。  
- **安装/平台体验**：  
  [#154769](https://github.com/NousResearch/hermes-agent/pull/154769) 修复 zsh `ZDOTDIR` 下 PATH 写入错误；[#128775](https://github.com/NousResearch/hermes-agent/pull/128775) 避免在不支持 Windows 上使用 WSL launcher。此类修复可能作为补丁版本优先纳入。  
- **已被排除的方向**：  
  [#20249](https://github.com/NousResearch/hermes-agent/issues/20249) Model Presets 被关闭为 not-planned，表明“按 turn 专家模型升级”短期不在路线图内。

## 7. 用户反馈摘要

- **统一网关迁移带来真实使用摩擦**：用户在多入口（CLI、TUI、Desktop、API、消息机器人、cron、Kanban）下遇到 post-merge 问题，期望明确的迁移说明和会话路由一致性。[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)  
- **外部贡献流程受权限阻塞**：fork PR 创建失败影响贡献者体验，且标记为 blocked/upstream，维护者需协调上游权限或提供替代流程。[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)  
- **跨平台安装/运行仍是痛点**：Keet setup 崩溃、Windows WhatsApp bridge WinError 5、zsh `ZDOTDIR` PATH 错误、macOS 签名 bundle 写入、Windows WSL launcher 问题，集中在“装得上、跑得稳”的最后一公里。[#97065](https://github.com/NousResearch/hermes-agent/issues/97065)、[#68128](https://github.com/NousResearch/hermes-agent/issues/68128)、[#154769](https://github.com/NousResearch/hermes-agent/pull/154769)、[#154772](https://github.com/NousResearch/hermes-agent/pull/154772)、[#128775](https://github.com/NousResearch/hermes-agent/pull/128775)  
- **Kanban 用户关注可靠性与可恢复性**：worker 崩溃、熔断器永久放弃卡片、手动 promote 后 stale error 继续 parking，说明自动化任务队列的失败恢复语义需要更稳健。[#145022](https://github.com/NousResearch/hermes-agent/issues/145022)、[#108927](https://github.com/NousResearch/hermes-agent/issues/108927)、[#121281](https://github.com/NousResearch/hermes-agent/issues/121281)  
- **上下文压缩影响可感知体验**：Desktop 消息消失、压缩阻塞 turn、skill 内容丢失等反馈表明压缩不只是性能问题，也影响用户对会话完整性的信任。[#141855](https://github.com/NousResearch/hermes-agent/issues/141855)、[#117886](https://github.com/NousResearch/hermes-agent/issues/117886)、[#86421](https://github.com/NousResearch/hermes-agent/issues/86421)  
- **安全与隐私边界受关注**：profile secrets 泄漏、`/debug` 上传需显式同意、sudo 密码传递方式，均反映用户对本地/多 profile 安全边界的敏感度。[#82936](https://github.com/NousResearch/hermes-agent/issues/82936)、[#153698](https://github.com/NousResearch/hermes-agent/pull/153698)、[#154649](https://github.com/NousResearch/hermes-agent/pull/154649)  
- **正面信号**：Slack 状态问题获得 17 个 👍，`reasoning` 重复字段问题关闭获 3 个 👍，WhatsApp Windows 问题与 iOS beta 邀请问题各有 2 个 👍，说明用户愿意对明确影响日常使用的问题投票。[#110374](https://github.com/NousResearch/hermes-agent/issues/110374)、[#136486](https://github.com/NousResearch/hermes-agent/issues/136486)、[#68128](https://github.com/NousResearch/hermes-agent/issues/68128)、[#147556](https://github.com/NousResearch/hermes-agent/issues/147556)

## 8. 待处理积压

以下为创建时间较早、仍 OPEN 且影响面较大的条目，建议维护者优先分诊：

- [#68128](https://github.com/NousResearch/hermes-agent/issues/68128) 2026-07-20 起 OPEN，P2，Windows WhatsApp bridge `WinError 5`，21 条评论、2 👍；跨平台消息投递长期痛点。  
- [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) 2026-08-10 起 OPEN，P1 安全，multiplex profiles 下 secrets 泄漏，16 条评论；应优先安全评审。  
- [#95670](https://github.com/NousResearch/hermes-agent/issues/95670) 2026-08-26 起 OPEN，P1，Discord handoff thread 类型错误；影响消息适配器可靠性。  
- [#97065](https://github.com/NousResearch/hermes-agent/issues/97065) 2026-08-28 起 OPEN，P3，Keet setup 崩溃但讨论量达 30 条，说明插件向导问题并不边缘。  
- [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) 2026-09-08 起 OPEN，needs-decision，终端 lifecycle guard 误杀 Node CLI，29 条评论；需要产品/安全权衡决策。  
- [#110374](https://github.com/NousResearch/hermes-agent/issues/110374) 2026-09-13 起 OPEN，P2，Slack 状态指示器失效，17 👍；高反应、低争议，适合优先修复。  
- [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) 2026-10-03 起 OPEN，blocked/upstream，59 条评论；外部贡献流程受阻，建议给出明确 workaround。  
- [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 2026-10-23 起 OPEN，64 条评论，统一网关 post-merge 总帖；建议拆分可执行子任务并标注 owner。  
- PR [#128775](https://github.com/NousResearch/hermes-agent/pull/128775) 2026-09-30 起 OPEN，needs-repro，Windows WSL launcher 修复等待复现；长期挂起但今日仍有更新。  
- PR [#153698](https://github.com/NousResearch/hermes-agent/pull/153698) P1 安全同意修复，建议优先评审；PR [#152168](https://github.com/NousResearch/hermes-agent/pull/152168) 桌面重设计影响面大，建议明确评审排期。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期：2026-11-13** ｜ 数据窗口：过去 24 小时

---

## 1. 今日速览

- 项目今日呈现**"高 PR 吞吐、零 Issue 波动"**的典型维护期特征：24 小时内 17 条 PR 发生更新（12 条待合并、5 条已合并/关闭），Issue 侧完全静默（新开 0、关闭 0、活跃 0），版本发布 0 个。
- 开发重心高度集中在**两条主线**：一是由项目负责人 @Soulter 主导的 Dashboard/WebUI 体验重构（导航、Overview 页、动效、布局），二是由 @wcqqq1214 推进的 **Decisions Provider 体系扩展**（Gemini Decisions + OpenAI Decisions 图像输入）。
- 架构层面出现明确新方向：**ACP 子智能体（#11105）**与**会话配置映射统一（#11097）**标志着 Agent 编排能力与配置模型正在系统化收敛。
- 稳定性方面，Gemini 侧的**内置工具与函数调用冲突（#11078）**为今日最高优先级缺陷，已有 fix PR 待合并；另有一条"修复只进了 dev 分支未进主干"的回归重提（#10961），提示分支/发布流程存在漏合风险。
- **健康度评估：良好偏活跃。**不足之处是讨论侧指标为零（全部 PR 评论数缺失、👍 均为 0），社区互动几乎不落在 PR 评论中；且 17 条 PR 中有 11 条来自 2 位作者，存在一定的关键人依赖。

---

## 2. 版本发布

今日无新版本发布，故省略。

---

## 3. 项目进展（今日合并/关闭的 5 条 PR）

今日关闭的 PR 全部来自 Dashboard 与配置体系重构，属于"产品化打磨 + 架构收敛"型推进，而非零散补丁：

| PR | 内容 | 意义 |
|---|---|---|
| [#11100](https://github.com/AstrBotDevs/AstrBot/pull/11100) | **Welcome 页升级为 Overview**：展示每日用量与 Bot 健康度，保留 `/welcome` 路由及模型/Bot/电脑访问配置流程 | 首屏从"欢迎引导"转向"运行态可观测"，是产品成熟度提升的信号 |
| [#11097](https://github.com/AstrBotDevs/AstrBot/pull/11097) | **统一会话配置映射与覆盖规则**：以"单一 base profile + 显式字段覆盖"取代此前 Custom Rules 与配置路由重叠、优先级不一致的模型 | 解决长期存在的**配置语义歧义**，降低用户误配概率，属结构性改进 |
| [#11090](https://github.com/AstrBotDevs/AstrBot/pull/11090) | 侧边栏直接进入 Chat、可返回上一管理页；滚动条变细、透明轨道、停止滚动后淡出 | 减少 Chat / Bot 顶层切换的心智负担，日常高频路径提速 |
| [#11102](https://github.com/AstrBotDevs/AstrBot/pull/11102) | 引入 Material You 风格涟漪（羽化径向渐变、12% 按压不透明度） | 纯视觉一致性优化 |
| [#11082](https://github.com/AstrBotDevs/AstrBot/pull/11082) | 「大肥鱼鱼咖」——将 fork 产品化为托管型 QQ 官方 Bot SaaS | 与上游主线定位不符，已关闭；属社区衍生商业化尝试 |

**整体推进度评估：** 今日关闭量（5）占更新量（17）的约 29%，且集中在同一位维护者的一条连续工作流上，说明 Dashboard 重构已进入收尾阶段；而配置体系统一（#11097）是其中**唯一影响后端行为**的合并，其余为前端体验层。项目向前迈进主要体现在"可用性/一致性"，而非能力边界扩张——能力扩张仍在 12 条待合并 PR 中排队。

---

## 4. 社区热点

> ⚠️ 数据说明：本次数据中所有 PR 的 `评论` 字段均为 `undefined`、`👍` 均为 0，无法据此计算真实讨论热度。以下改以**更新时效性、变更影响面、作者集中度**作为热度代理指标。

1. **[#11107](https://github.com/AstrBotDevs/AstrBot/pull/11107) — Dashboard 聊天标题居中与菜单样式精修**（唯一在 2026-11-13 当日更新的 PR）
   处理侧边栏宽度补偿、长标题截断、窄屏堆叠布局，并统一重试菜单/头部选项/模型选择器样式。属于"最后一公里"细节收尾，通常出现在一轮 UI 改版即将发布之前。

2. **[#11105](https://github.com/AstrBotDevs/AstrBot/pull/11105) — ACP 子智能体支持**
   允许主 Agent 委托给 ACP worker，在「Configure Specialized Agents」中选择 ACP 并填写可执行文件、参数与工作目录，**无需宿主侧 JSON 文件**，通过 stdio 复用现有 Agent Runtime 会话。这是本周最具架构分量的变更，直接指向多智能体编排。

3. **[#11095](https://github.com/AstrBotDevs/AstrBot/pull/11095) — Gemini Decisions API 支持**
   新增独立 decision provider，支持 `gemini-decision-1` 的文本/图像/音频/视频/PDF 多模态输入（inline base64 或 HTTPS URI）、2–255 评分等级。

**背后诉求分析：** 三条热点分别对应三类真实需求——(a) WebUI 在多任务场景下的信息密度与可读性；(b) 用户希望在 AstrBot 内编排**带独立运行时/独立权限边界**的子智能体，而不是把全部逻辑塞进单 Agent 提示词；(c) 用户需要**结构化决策输出**（评分/选择/路由），而非仅对话文本。客户端侧 [#11106](https://github.com/AstrBotDevs/AstrBot/pull/11106) 已紧随为 OpenAI Decisions 补充图像输入（依赖 #11095），说明该 Provider 抽象正在被双侧拉齐。

---

## 5. Bug 与稳定性

按严重程度排序：

**🔴 高 — Gemini 内置工具与函数调用无法共存**
[#11078](https://github.com/AstrBotDevs/AstrBot/pull/11078)（fix, OPEN）｜关联 Issue #9937
自 #8833 允许 `gm_native_search` / `gm_native_coderunner` / `gm_url_context` 与 `function_declarations` 同请求共存后，Gemini 3/4 模型上任意此类组合会触发**级联失败**。这是典型的"能力放开后未做兼容性验证"导致的回归，影响所有同时使用原生搜索与自定义工具的 Gemini 用户。
✅ **已有 fix PR**，状态 OPEN，建议优先评审合并。

**🟠 中高 — Gemini thinking 配置未覆盖 gemini-4 及别名**
[#10961](https://github.com/AstrBotDevs/AstrBot/pull/10961)（fix, OPEN）｜Fixes #10586
`ProviderGoogleGenAI._prepare_query_config()` 依据字面量 model id 判断是否下发 thinking 配置，导致 `gemini-4` 及其别名不生效。**值得注意的是**：该修复此前已在 #10587 获批，但**仅进入 `dev` 分支未进主干**，本次为 re-land。这暴露了发布流程中的合漏问题，属流程性风险而非单点 Bug。
✅ **已有 fix PR**，已挂起 11 天（2026-11-02 创建）。

**🟡 中 — 删除项目后会话从侧边栏消失**
[#11101](https://github.com/AstrBotDevs/AstrBot/pull/11101)（fix, OPEN）
删除 project 时保留了 session 但移除了 project 关联，侧边栏未刷新，会话无法回到顶层列表，需手动重载页面。属状态同步缺陷，用户易误判为"会话丢失"。
✅ **已有 fix PR**（刷新顶层会话列表）。

**🟡 中 — QQ 官方适配器丢失引用合并转发中的图片**
[#11104](https://github.com/AstrBotDevs/AstrBot/pull/11104)（fix, OPEN）
当用户回复合并聊天记录并询问图片时，图片可能位于嵌套 record 节点或仅以编号转录形式描述，适配器只透传引用文本与直接附件，导致插件与视觉模型"看不到图"。
✅ **已有 fix PR**。

**🟢 中低 — 流式回复重复输出（DeerFlow）**
[#11098](https://github.com/AstrBotDevs/AstrBot/pull/11098)（fix, OPEN）
首个 `values` 快照将完整答案与空的流式前缀比较，导致同一段文本出现两次。修复方式为在流式 token delta 时记录累计文本，使首个快照仅输出增量。
✅ **已有 fix PR**。

**🟢 低 — 纯 URL 引用无法还原为引用卡片**
[#11099](https://github.com/AstrBotDevs/AstrBot/pull/11099)（fix, OPEN）
Webchat 依赖模型输出私有 `<ref>index</ref>` 标签来渲染引用卡，但模型实际常直接给纯文本或 Markdown URL，导致 `extract_web_search_refs` 匹配为空、卡片不显示。属**模型行为与前端契约不匹配**的健壮性问题。
✅ **已有 fix PR**。

**小结：** 今日 6 项缺陷**全部已有对应 fix PR**，无"孤立 Bug"。这说明缺陷发现—修复闭环效率高；但也反映出近期 Gemini Provider 相关改动（#8833、thinking config）质量门禁偏松，建议对 provider 层增加模型矩阵回归测试。

---

## 6. 功能请求与路线图信号

结合待合并 PR 判断下一版本的高概率入选项：

- **多智能体编排（高概率）** — [ACP 子智能体 #11105](https://github.com/AstrBotDevs/AstrBot/pull/11105)，作者为项目负责人，配套的 [#11103](https://github.com/AstrBotDevs/AstrBot/pull/11103) 已将「AI → Capabilities」顺序调整为 Web Search → Agent Computer Use → Subagents → Knowledge Base → Proactive Agent，并同步更新中英文 WebUI 文档。文档先行 + 菜单排位调整，是典型的"发布前铺路"信号。
- **Decisions Provider 体系（高概率）** — [#11095](https://github.com/AstrBotDevs/AstrBot/pull/11095) + [#11106](https://github.com/AstrBotDevs/AstrBot/pull/11106) 构成 Gemini/OpenAI 双侧结构化决策能力。`DecisionInput` / `DecisionMedia` 类型已被复用，说明抽象已定型，可能作为一组特性整体发布。
- **插件市场分类下沉到插件元数据（中高概率）** — [#11094](https://github.com/AstrBotDevs/AstrBot/pull/11094)，resolve #10638。现状是前端硬编码 6 个分类 fallbackMap 与 i18n 文案，后端 `GET /api/v1/plugins/market/categories` 能力受限；改为插件在 metadata 中自声明分类。这直接改善生态可扩展性，且改动面可控。
- **WebUI 整体改版（已在落地）** — Overview 页、侧边栏 Chat 导航、涟漪动效、AI 能力重排已 4 项合并 + 1 项精修，可视为一个完整的"Dashboard v2"批次。

**路线图信号解读：** 项目正从"单 Bot 对话工具"向"可编排、可观测、可扩展的 Agent 平台"演进，关键词是 **Subagent / Decisions / Plugin Metadata**。

---

## 7. 用户反馈摘要

> 本次数据中 Issues 数量为 0，`评论` 字段全部缺失，**无法从评论中直接提炼真实用户声音**。以下基于 PR 摘要中描述的动机与被修复的 Issue 编号做间接归纳。

- **痛点一：配置语义混乱。** [#11097](https://github.com/AstrBotDevs/AstrBot/pull/11097) 明确指出 Custom Rules 与配置路由"存储了重叠的会话设置、优先级规则不同"，用户面对同一会话可能出现"改了一处不生效"的困惑。
- **痛点二：多模态内容在多跳场景下丢失。** [#11104](https://github.com/AstrBotDevs/AstrBot/pull/11104) 反映的真实场景是：用户在 QQ 群里回复一条合并聊天记录并问"这张图是什么"——这是高频的群聊协作场景，但图片藏在嵌套节点或编号转录里，Bot 直接"看不见"。
- **痛点三：模型不遵守前端渲染契约。** [#11099](https://github.com/AstrBotDevs/AstrBot/pull/11099) 揭示用户实际观感是"明明联网搜了，却没有引用来源可点"，降低对回答可信度的判断能力。
- **痛点四：视觉细节粗糙。** [#11102](https://github.com/AstrBotDevs/AstrBot/pull/11102) 提到默认 Vuetify 涟漪"硬边圆形、扩张过快"使按压"显得突兀"，属主观体验类反馈，说明用户群体对 UI 质感的敏感度不低。
- **不满意信号（治理层）** — [#11082](https://github.com/AstrBotDevs/AstrBot/pull/11082) 将 fork 产品化为托管型 QQ Bot SaaS 提交至上游，最终被关闭。这类 PR 通常反映部分用户希望 AstrBot 提供"开箱即用的托管商业化形态"，与上游开源定位存在张力。

---

## 8. 待处理积压

提醒维护者关注以下条目：

| 条目 | 停留时长 | 风险说明 |
|---|---|---|
| [#10961](https://github.com/AstrBotDevs/AstrBot/pull/10961) fix(provider): Gemini thinking config | **11 天**（2026-11-02 起） | 唯一长期挂起的 fix。且其为**已获批修复的重新提交**（#10587 仅落到 `dev`），若继续滞留，`gemini-4` 用户将持续缺少 thinking 配置。建议明确主干/`dev` 的合并策略，避免同类漏合复发。 |
| [#11078](https://github.com/AstrBotDevs/AstrBot/pull/11078) fix(provider): Gemini 工具+函数调用 | 2 天 | 严重度最高（级联失败），虽停留时间短，但建议**优先于其他 fix 评审**。 |
| [#11095](https://github.com/AstrBotDevs/AstrBot/pull/11095) / [#11094](https://github.com/AstrBotDevs/AstrBot/pull/11094) | 2 天 | 均为跨前后端的接口级变更，拖久易产生 rebase 冲突（#11106 已明确标注 stack 在 #11095 之上、需 rebase 到 master）。 |
| 讨论侧数据缺失 | 持续性 | 全部 PR `评论=undefined`、`👍=0`。无论是否为采集口径问题，**当前都无法量化社区参与度**，建议补齐评论/反应指标，否则"社区热点"与"用户反馈"两节长期只能靠推断。 |

**结构性观察（供维护者参考）：** 17 条 PR 中，@Soulter 占 7 条（且覆盖 Dashboard、Agent、配置三大块）、@wcqqq1214 占 4 条，合计 65%。高吞吐值得肯定，但**核心模块（WebUI + Agent Runtime）的评审带宽集中于单人**，是当前项目最主要的单点风险。建议对 Dashboard 与 Provider 两类改动分别引入固定 reviewer，以维持长期健康度。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报（2026-11-13）

> 口径说明：该项目未启用 GitHub Issues/PR，社区活动以 Discussions 为准；代码合并经 Releases 落地。本日报不将 Discussions 讨论等同于已合并代码。

## 1. 今日速览

过去 24 小时 Discussions 更新 **223 条**，但新版本发布 **0 个**，最新 Releases 为空。社区活跃度较高：评论数最多的 15 条讨论合计 **204 条评论**，最高热度为 MIR 支付支持讨论（63 条评论）。热点集中在 **Windows 桌面端更新失败、会话数据安全、长会话稳定性、支付本地化与插件生态**。整体健康度呈现“社区讨论活跃、交付侧暂无 Release 可核验、稳定性风险需优先处置”的状态。

## 2. 版本发布

**无新版本发布（0 个）**，最新 Releases 为空。  
因此本次无更新内容、破坏性变更或迁移注意事项可报告。

## 3. 项目进展

- 本次无 Release，因而**无合并摘要/changelog 可核验**；无法确认新功能或修复已随版本上线。不能因 PR 数为 0 误判社区无活动，但代码交付口径今日确实为空窗。
- 社区协作层面的可观察进展包括：Windows 更新失败问题的 `%TEMP%` 绕过方法在讨论中传播（[#13025](https://github.com/deepseek-ai/deepseek-harness/discussions/13025)）；插件生态出现设计工作台展示（[#10615](https://github.com/deepseek-ai/deepseek-harness/discussions/10615)）；MIR 支付需求保持高热度（[#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755)）。这些属于讨论与 workaround，不等同于代码合并。
- 可量化代码交付增量：**0 Release**。项目整体推进需等待下一版本验证，建议优先将 Windows updater 稳定性与会话数据安全修复打包发布。

## 4. 社区热点

展示数据中所有条目 👍 均为 0，互动主要靠评论衡量。今日高热讨论如下：

- [**#12755** Support MIR card payments for DeepSeek API](https://github.com/deepseek-ai/deepseek-harness/discussions/12755) — **63 评论**，今日最高热度。诉求是俄罗斯用户可通过 MIR 卡充值 DeepSeek API，属于支付本地化与付费可及性问题，非 Bug。
- [**#6987** 本轮运行失败 DeepSeek Messages transport failed](https://github.com/deepseek-ai/deepseek-harness/discussions/6987) — **14 评论**。用户反馈升级到 4.1 后持续出现，换其他 DS 模型也一样，已影响可用性，具有回归/服务传输故障信号。
- [**#12751** 让模型写插件后 dsh 目录被清、zcode 会话丢失](https://github.com/deepseek-ai/deepseek-harness/discussions/12751) — **14 评论**。严重数据丢失与智能体破坏性操作事件，涉及用户信任、沙箱隔离、审批与回滚能力。
- [**#13025** Windows 桌面应用内更新后不重启、版本没变](https://github.com/deepseek-ai/deepseek-harness/discussions/13025) — **13 评论**。定位为 `MoveFileExW error 32`，并提供从 `%TEMP%` 运行安装包的 workaround，适用于多个版本。
- [**#10615** dsh-design-studio 设计工作台插件](https://github.com/deepseek-ai/deepseek-harness/discussions/10615) — **13 评论**。社区插件展示，体现 DSH 在网页/App/海报/幻灯片设计工作流上的扩展潜力。
- **Windows 更新失败主题聚合**：[#9963](https://github.com/deepseek-ai/deepseek-harness/discussions/9963)（11 评论）、[#13076](https://github.com/deepseek-ai/deepseek-harness/discussions/13076)（8 评论）、[#9995](https://github.com/deepseek-ai/deepseek-harness/discussions/9995)（8 评论）与 #13025 合计约 **40 条评论**，是今日最集中的稳定性议题。
- 其他高关注稳定性讨论：[#7142 会话列表性能](https://github.com/deepseek-ai/deepseek-harness/discussions/7142)（11 评论）、[#8409 Windows ACL 沙箱授权缺陷](https://github.com/deepseek-ai/deepseek-harness/discussions/8409)（10 评论）、[#5466 reasoning-only 空 content 毒死会话](https://github.com/deepseek-ai/deepseek-harness/discussions/5466)（9 评论）。

## 5. Bug 与稳定性

以下条目均未见已发布 Release 修复；由于 Issues/PR 未启用，无法从 PR 状态确认 fix。按影响排序：

| 严重度 | 条目 | 问题摘要 | 修复/状态 |
|---|---|---|---|
| 严重 | [#12751](https://github.com/deepseek-ai/deepseek-harness/discussions/12751) | 用户要求写插件后，dsh 与 zcode 会话/目录被清空，出现数据丢失 | 未见发布修复；需最高优先级核查智能体文件操作边界 |
| 严重 | [#6987](https://github.com/deepseek-ai/deepseek-harness/discussions/6987) | 升级 4.1 后 `DeepSeek Messages transport failed` 持续失败，换模型仍不可用 | 未见发布修复；疑似版本回归/传输层问题 |
| 严重 | [#5466](https://github.com/deepseek-ai/deepseek-harness/discussions/5466) | reasoning-only 空 content 导致 `content or tool_calls must be set`，整会话后续每轮失败 | 未见发布修复；建议序列化层增加兜底 |
| 严重 | [#4722](https://github.com/deepseek-ai/deepseek-harness/discussions/4722) | 内存会话日志 append-only、compaction 不裁剪，长会话导致 Web 进程 OOM | 未见发布修复；长会话稳定性风险 |
| 高 | [#8409](https://github.com/deepseek-ai/deepseek-harness/discussions/8409) | Windows ACL 沙箱 `workspace-write` 三类授权缺陷，标准用户/非系统盘写入失败 | 未见发布修复；涉及沙箱权限与安全边界 |
| 高 | [#9963](https://github.com/deepseek-ai/deepseek-harness/discussions/9963) / [#9995](https://github.com/deepseek-ai/deepseek-harness/discussions/9995) / [#13025](https://github.com/deepseek-ai/deepseek-harness/discussions/13025) / [#13076](https://github.com/deepseek-ai/deepseek-harness/discussions/13076) | Windows 桌面端更新安装失败：Host 不退出、`MoveFileExW error 32/5`、更新后版本不变 | #13025 提供 `%TEMP%` workaround；未见正式发布修复 |
| 高 | [#9718](https://github.com/deepseek-ai/deepseek-harness/discussions/9718) | Windows 时区 `British Columbia Standard Time` 触发 `browser time zone is unavailable`，阻止聊天 | 未见发布修复；影响特定时区用户 |
| 中高 | [#12697](https://github.com/deepseek-ai/deepseek-harness/discussions/12697) | system-inherited context 被追加到 Web GUI 展示的 assistant 消息中 | 未见发布修复；涉及展示层/上下文隔离 |
| 中 | [#7142](https://github.com/deepseek-ai/deepseek-harness/discussions/7142) | `session/list` 对约 7700 会话耗时 2.5–3.0s、读取 59.8MB，缺少摘要缓存 | 未见发布修复；性能优化需求明确 |
| 中 | [#10162](https://github.com/deepseek-ai/deepseek-harness/discussions/10162) | `open-in-app` 在 Windows 无法启动 VS Code/Electron，`ELECTRON_RUN_AS_NODE` 泄漏到子进程环境 | 今日仍有更新（11-13）；未见发布修复 |

## 6. 功能请求与路线图信号

- **MIR 支付支持**：[#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755) 以 63 条评论成为最高热度需求，路线图信号最强。诉求集中在俄罗斯用户的 API 付费可及性，可能涉及支付渠道/合规/区域运营，但无 Release 或 PR 证据确认排期。
- **插件生态与设计工作流**：[#10615](https://github.com/deepseek-ai/deepseek-harness/discussions/10615) 展示设计工作台插件，说明社区对可视化设计、画布交互、模板市场的兴趣较强。属于生态正向信号，但是否纳入核心路线图无法确认。
- **稳定性修复应优先进入下一版本**：Windows 更新链路、会话数据隔离、长会话 OOM、reasoning-only 会话毒化属于高频痛点。虽非“新功能”，但从讨论热度看，下一版本的发布价值更可能来自这些修复而非新增功能。

## 7. 用户反馈摘要

- **付费可及性**：俄罗斯用户因本地卡支付受限，希望增加 MIR，支付门槛直接影响 API 采用与工具使用（[#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755)）。
- **Windows 更新体验差**：多个版本出现更新后不重启、版本不变、`MoveFileExW` 错误；用户需要手动 workaround，挫败感较强（[#13025](https://github.com/deepseek-ai/deepseek-harness/discussions/13025)、[#9963](https://github.com/deepseek-ai/deepseek-harness/discussions/9963)、[#9995](https://github.com/deepseek-ai/deepseek-harness/discussions/9995)、[#13076](https://github.com/deepseek-ai/deepseek-harness/discussions/13076)）。
- **数据安全与信任**：用户让模型写插件却导致 dsh/zcode 会话丢失，反映对智能体文件操作边界、审批、备份与回滚的强烈需求（[#12751](https://github.com/deepseek-ai/deepseek-harness/discussions/12751)）。
- **升级回归与可用性**：4.1 后 transport failed、会话毒化、长会话 OOM 等问题直接阻断使用，用户对“升级后不可用”较敏感（[#6987](https://github.com/deepseek-ai/deepseek-harness/discussions/6987)、[#5466](https://github.com/deepseek-ai/deepseek-harness/discussions/5466)、[#4722](https://github.com/deepseek-ai/deepseek-harness/discussions/4722)）。
- **性能与展示层问题**：大会话列表性能、系统上下文泄漏到展示消息、特定时区阻止聊天，均影响日常体验（[#7142](https://github.com/deepseek-ai/deepseek-harness/discussions/7142)、[#12697](https://github.com/deepseek-ai/deepseek-harness/discussions/12697)、[#9718](https://github.com/deepseek-ai/deepseek-harness/discussions/9718)）。
- **正向反馈**：插件设计工作台展示了较强扩展性，社区也积极分享 workaround，说明生态参与度和互助氛围仍在。

## 8. 待处理积压

数据未提供维护者回复/指派状态，无法确认官方是否已响应；以下按 OPEN 时长与影响建议优先核对。日期按 2026-11-13 估算：

| 条目 | 已 OPEN 约 | 影响 | 建议 |
|---|---:|---|---|
| [#4722](https://github.com/deepseek-ai/deepseek-harness/discussions/4722) 内存会话日志无界导致 OOM | 78 天 | 长/重会话崩溃 | 优先确认 compaction/裁剪修复计划 |
| [#5466](https://github.com/deepseek-ai/deepseek-harness/discussions/5466) reasoning-only 空 content 毒死会话 | 71 天 | 单会话永久不可用 | 序列化层兜底，影响面明确 |
| [#6987](https://github.com/deepseek-ai/deepseek-harness/discussions/6987) 4.1 后 transport failed | 57 天 | 整体不可用 | 需回归定位与版本修复 |
| [#7142](https://github.com/deepseek-ai/deepseek-harness/discussions/7142) session/list 性能退化 | 55 天 | 大会话列表卡顿 | 摘要缓存/串行读取优化 |
| [#8409](https://github.com/deepseek-ai/deepseek-harness/discussions/8409) Windows ACL 沙箱授权缺陷 | 44 天 | 沙箱写入失败/安全边界 | 高优先级核查 Windows 权限 |
| [#9963](https://github.com/deepseek-ai/deepseek-harness/discussions/9963) / [#9995](https://github.com/deepseek-ai/deepseek-harness/discussions/9995) Windows 更新 Host 不退出/error 5 | 27 天 | 更新阻塞 | 与 #13025 合并排查 updater 进程生命周期 |
| [#9718](https://github.com/deepseek-ai/deepseek-harness/discussions/9718) 时区不可用阻止聊天 | 30 天 | 特定用户完全阻断 | 增加时区兜底映射 |
| [#10162](https://github.com/deepseek-ai/deepseek-harness/discussions/10162) `ELECTRON_RUN_AS_NODE` 泄漏 | 26 天 | Windows 外部应用启动失败 | 清理子进程环境变量 |
| [#12751](https://github.com/deepseek-ai/deepseek-harness/discussions/12751) 智能体清空目录/会话 | 4 天 | 数据丢失，P0 信任风险 | 虽为新近事件，建议立即响应并给出防护方案 |

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*