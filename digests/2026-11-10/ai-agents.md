# OpenClaw 生态日报 2026-11-10

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-10 03:52 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-11-10

---

## 1. 今日速览

- OpenClaw 过去 24 小时保持高频运转：**500 条 Issue 更新**（新开/活跃 280，已关闭 220）、**500 条 PR 更新**（待合并 349，已合并/关闭 151），但**0 个新版本发布**，社区处于"大量修复堆积、等待发布窗口"的状态。
- 合并/关闭比率约为 **30.2%**，待合并 PR 占比 **69.8%**，说明 PR 流水线压力较大，积压量明显高于消化量。
- 稳定性是今天最集中的主题：多条 **P0/P1 崩溃循环、重启失败、SQLite 状态损坏**类 Issue 持续活跃；同时若干 P0/P1 关键问题（#193962、#167506、#172628、#192959）已在今天关闭，显示关键修复正在收敛。
- 记忆系统（dreaming / 短期召回 / REM 回填）是讨论热度第二高的领域，涉及数据丢失与状态一致性的 P2 Issue 评论数居高不下。
- 项目健康度评估：**活跃度极高，但待处理积压与 P1 稳定性压力并存；无新版本释出意味着这些修复尚未转化为用户可感知的收益。**

---

## 2. 版本发布

无新版本发布。今日合并的关键修复（见第 3 节）预计将进入下一版本。

---

## 3. 项目进展

今日 PR 侧的重点是将多个 P0/P1 稳定性修复推向收口，并推进 OpenClaw ID 的安全绑定设计。

### 已合并/关闭的关键 PR

| PR | 内容 | 意义 |
|---|---|---|
| [#196415](https://github.com/openclaw/openclaw/pull/196415)（CLOSED） | 修复 npm 发布预检模块死锁（unsettled top-level await） | 打通发布流程，使后续 publication-lineage 校验能正常执行，为下一版本发布清障 |
| [#196420](https://github.com/openclaw/openclaw/pull/196420)（CLOSED） | 记录 2026.11.3 Kova 性能豁免授权 | 释放发布审批链路，影响后续版本可用性 |
| [#196401](https://github.com/openclaw/openclaw/pull/196401)（CLOSED） | 网关可在存在冲突/非法 `exec-approvals.json` 时启动 | 修复由遗留审批文件导致的 Gateway 重启循环，属于稳定性关键修复 |
| [#196207](https://github.com/openclaw/openclaw/pull/196207)（CLOSED） | 压缩摘要字符上限 `maxSummaryChars` 可配置 | 面向长会话/大上下文的可调优能力 |
| [#192348](https://github.com/openclaw/openclaw/pull/192348)（CLOSED） | 修复 `tts.auto:"inbound"` 下纯文本回语音触发语音回复 | 渠道行为一致性修复 |
| [#154904](https://github.com/openclaw/openclaw/pull/154904)（CLOSED） | 会话去重在转录索引瞬时脏时降级处理 | 提升会话消息去重的健壮性 |

### 今日关闭的重要 Issue（修复落地信号）

- [#193962](https://github.com/openclaw/openclaw/issues/193962)（**P0**，24 评论）— SQLite 头部探测超时修复无法从 2026.10.10 触达，导致包更新失败。**已关闭**，意味 update 路径阻塞被清除。
- [#167506](https://github.com/openclaw/openclaw/issues/167506)（**P0**，11 评论）— 临时交接数据库被删除后阻塞包恢复与后续更新。**已关闭**。
- [#172628](https://github.com/openclaw/openclaw/issues/172628)（**P1**，8 评论）— 全新 2026.10.3 网关启动后 `agents/main` 准入被 superseded。**已关闭**。
- [#192959](https://github.com/openclaw/openclaw/issues/192959)（**P1**，7 评论）— Kubernetes fsGroup 重挂载后凭证目录被拒、网关无法启动。**已关闭**，并已有配套 PR [#196394](https://github.com/openclaw/openclaw/pull/196394) 修复私有存储。
- [#149631](https://github.com/openclaw/openclaw/issues/149631)（13 评论）— CI preflight 121 jobs 超出 120 Node 矩阵上限。**已关闭**。
- [#168794](https://github.com/openclaw/openclaw/issues/168794)（9 评论）— Codex relay 对 >32 MiB 图像请求误报 502。**已关闭**。
- [#175926](https://github.com/openclaw/openclaw/issues/175926)（9 评论）— SQLite 快照回收每周期被跳过（Unrecognized snapshot directory）。**已关闭**。
- [#172547](https://github.com/openclaw/openclaw/issues/172547) 与 [#151173](https://github.com/openclaw/openclaw/issues/151173) 的 linked PR 依旧开放，记忆索引与召回锚点问题正在推进。

**整体判断：今日项目在"重启/更新可靠性、SQLite 状态恢复、K8s 部署、CI 容量"四条主线上实质推进，但尚无新版本承载这些修复。**

---

## 4. 社区热点

今日讨论最活跃的条目集中在**可靠性/状态一致性**，且多为长评论线程的"深挖型" Issue，说明社区在做真实生产环境的持续复现。

### 评论最多的 Issues Top 6

1. [#170956](https://github.com/openclaw/openclaw/issues/170956)（**P0**，30 评论，🦐 gold shrimp）— Windows `schtasks` 托管安装下启动慢、插件关闭不干净、权限错误，导致重启/更新极不可靠。**诉求**：Windows 作为一类生产部署环境的稳定性急需系统化治理。
2. [#150635](https://github.com/openclaw/openclaw/issues/150635)（**P2**，27 评论，🦞 diamond lobster）— 短期召回 512 条上限导致夜间淘汰已回忆条目，dreaming 深度阶段永不提升。**诉求**：记忆生命周期（短期↔长期）的淘汰/提升策略存在设计冲突。
3. [#166634](https://github.com/openclaw/openclaw/issues/166634)（**P2**，27 评论）— 崩溃恢复后 late reclamation checkpoint 失败，agent 永久不可用。**诉求**：崩溃恢复后的自愈能力。
4. [#193962](https://github.com/openclaw/openclaw/issues/193962)（**P0**，24 评论，🦞 diamond lobster）— update 路径被已安装 updater 的 10s 探测卡住（今日已关闭）。
5. [#166133](https://github.com/openclaw/openclaw/issues/166133)（**P2**，16 评论）— MCP 整数参数被包装器强制转为字符串，导致 `-32602` 拒绝。**诉求**：MCP 工具调用的类型保真性。
6. [#158127](https://github.com/openclaw/openclaw/issues/158127)（**P2**，14 评论）— 多 agent 运行时发布失败与 Codex 启动超时。**诉求**：多 agent 场景下的竞态与超时治理。

### 反应最多的条目

社区 👍 整体偏低（最高仅 2），说明用户主要通过**长篇复现与日志**参与，而非点赞表达：
- [#119294](https://github.com/openclaw/openclaw/issues/119294)（👍 2）— 跟踪迁移到 MCP 2.0（2026-07-28 stateless spec）。
- [#182891](https://github.com/openclaw/openclaw/issues/182891)（👍 1）— 提示缓存从不复用，`cache read dropped N -> 0`。
- [#92473](https://github.com/openclaw/openclaw/issues/92473)（👍 1）— 模型回退通知泄漏到外部用户渠道。

### 值得注意的 PR 热点

- [#196138](https://github.com/openclaw/openclaw/pull/196138)（设计稿）+ [#196388](https://github.com/openclaw/openclaw/pull/196388) + [#196402](https://github.com/openclaw/openclaw/pull/196402) — OpenClaw ID **owner re-bind**（密钥丢失/疑似泄漏后的重绑定仪式）三条 PR 集中在今日更新，标志身份安全是当前重点方向，且 [#196402](https://github.com/openclaw/openclaw/pull/196402) 带 `merge-risk: security-boundary` 标签，需安全评审。

---

## 5. Bug 与稳定性

按严重程度排列（标注是否已有 fix PR / 相关修复方向）：

### P0（崩溃循环 / 发布阻断）

- **[OPEN] [#170956](https://github.com/openclaw/openclaw/issues/170956)** — Windows 启动慢、插件关闭不干净、`schtasks` 权限错误 → 重启/更新不可靠。标签含 `impact:crash-loop`、`impact:ux-release-blocker`、`clawsweeper:needs-maintainer-review`。**无新 fix PR**，需维护者介入。
- **[CLOSED] [#193962](https://github.com/openclaw/openclaw/issues/193962)** — SQLite 头部探测超时修复无法从 2026.10.10 到达；今日已关闭。
- **[CLOSED] [#167506](https://github.com/openclaw/openclaw/issues/167506)** — 删除临时交接数据库阻塞包恢复与后续更新；今日已关闭。

### P1

- **[OPEN] [#144336](https://github.com/openclaw/openclaw/issues/144336)** — SIGUSR1 延迟重启在 shutdown 步骤失败（"service child cleanup identity lost"）。**无新 fix PR**，标签 `needs-live-repro`。
- **[OPEN] [#157255](https://github.com/openclaw/openclaw/issues/157255)** — lane timeout 后 turn claim 未释放，session 卡死 90+ 分钟。**无新 fix PR**。
- **[OPEN] [#190307](https://github.com/openclaw/openclaw/issues/190307)** — 网关重启后大量 agent 永久 "degraded"（admission timeout），修复提示指向全量 `doctor --fix`。**无新 fix PR**。
- **[OPEN] [#166641](https://github.com/openclaw/openclaw/issues/166641)** — `web_fetch` 冷回退在主线程同步捕获无关插件，导致 liveness 停顿。**已有 linked PR open**。
- **[OPEN] [#191841](https://github.com/openclaw/openclaw/issues/191841)** — 2026.10.10 回归：`native child reaping is unavailable` 使 glibc < 2.31（RHEL 8 / al8）上所有 exec 失效。**无新 fix PR**，影响面大。
- **[OPEN] [#192141](https://github.com/openclaw/openclaw/issues/192141)** — 中断续接只发样板文本、丢失原始用户消息，assistant 误判真实消息为空。**无新 fix PR**。
- **[OPEN] [#174895](https://github.com/openclaw/openclaw/issues/174895)** — 活跃 Gateway 状态 owner 被误判为 stale，锁文件被第二个进程回收，引发虚假重启（Windows）。**无新 fix PR**。
- **[OPEN] [#91931](https://github.com/openclaw/openclaw/issues/91931)** — 预置 SOUL.md/IDENTITY.md/USER.md 导致 bootstrap 自动完成并删除用户 BOOTSTRAP.md。标签含 `fix-shape-clear`，**修复方向明确**。
- **[CLOSED] [#172628](https://github.com/openclaw/openclaw/issues/172628)** — 2026.10.3 全新启动后 main-agent 准入 superseded；今日已关闭。
- **[CLOSED] [#192959](https://github.com/openclaw/openclaw/issues/192959)** — K8s fsGroup 重挂载后 Gateway 拒绝启动；今日已关闭，配套修复 PR [#196394](https://github.com/openclaw/openclaw/pull/196394)。

### P2（状态 / 数据一致性）

- [#166634](https://github.com/openclaw/openclaw/issues/166634) — 崩溃恢复后 checkpoint 失败致 agent 永久不可用。
- [#166133](https://github.com/openclaw/openclaw/issues/166133) — MCP 整数参数被强制转字符串。
- [#158127](https://github.com/openclaw/openclaw/issues/158127) — 多 agent 运行时发布失败 + Codex 启动超时。
- [#182891](https://github.com/openclaw/openclaw/issues/182891) — Prompt cache 从不复用。
- [#177094](https://github.com/openclaw/openclaw/issues/177094) — WebChat 系统通知镜像挤掉最后一轮回答（已有 linked PR）。
- [#112313](https://github.com/openclaw/openclaw/issues/112313) — 死信出站队列条目永久无法清理（自 2026-07-21）。
- [#157827](https://github.com/openclaw/openclaw/issues/157827) — 短路召回种子只引用合并 REM 项的第一个 ref（已有 linked PR）。
- [#173839](https://github.com/openclaw/openclaw/issues/173839) — 传输层预检查在 CJK 重负载下先于优雅压缩拒绝。
- [#172031](https://github.com/openclaw/openclaw/issues/172031) — 晚到的 `modelPromptProjection` 使自定义 context-engine 准入失效。
- [#138918](https://github.com/openclaw/openclaw/issues/138918) — macOS 上可见 WebChat 标签页持续占用 WindowServer CPU。
- [#193929](https://github.com/openclaw/openclaw/issues/193929)（CLOSED）— Control UI spinner 每帧占用 WebKit GPU 进程（#189847 回归），今日已关闭。
- [#173313](https://github.com/openclaw/openclaw/issues/173313)（CLOSED）— `config get` 掩码敏感值导致 Funnel 恢复时误导诊断，今日已关闭。
- [#173167](https://github.com/openclaw/openclaw/issues/173167)（CLOSED）— `timeoutSeconds` 不能延长 Code Mode 墙钟预算，今日已关闭。

---

## 6. 功能请求与路线图信号

结合已有 PR 判断，以下功能需求具有较高的"下一版本纳入"可能性：

### 强信号（已有实现或配套 PR）

- **OpenClaw ID owner re-bind（身份安全）**：[#196138](https://github.com/openclaw/openclaw/pull/196138)（设计稿）+ [#196388](https://github.com/openclaw/openclaw/pull/196388)（重绑定仪式实现）+ [#196402](https://github.com/openclaw/openclaw/pull/196402)（客户端跟随重绑定）。三条 PR 同日更新，方向明确，但带 `security-boundary` 标签需安全评审。
- **压缩摘要字符上限可配置** [#194408](https://github.com/openclaw/openclaw/issues/194408) → 已由 [#196207](https://github.com/openclaw/openclaw/pull/196207) 关闭。
- **Signal 审批者的 emoji 反应审批**：由 [#196419](https://github.com/openclaw/openclaw/pull/196419) 修复（Closes #195620）。
- **网关重启后恢复被中断的回合**：由 [#196423](https://github.com/openclaw/openclaw/pull/196423) 推进（工作区准备完成后恢复）。
- **沙箱命名主机根目录** [#116175](https://github.com/openclaw/openclaw/pull/116175)：允许 `allowedBindSources` 白名单，带兼容性/安全双标签，仍在开放。

### 中等信号（有明确诉求但无实现）

- **Dreams 页面由 memory slot owner 驱动** [#138366](https://github.com/openclaw/openclaw/issues/138366)（12 评论）— 与 [#150635](https://github.com/openclaw/openclaw/issues/150635)、[#172547](https://github.com/openclaw/openclaw/issues/172547) 共同指向"记忆生命周期可观测/可控"的需求簇。
- **前台 WebChat 强制检查点与有界 yield** [#138990](https://github.com/openclaw/openclaw/issues/138990)。
- **多策略别名解析到同一模型** [#140213](https://github.com/openclaw/openclaw/issues/140213)（7 评论）。
- **sessions_send 可选的 wakeOnReply 延迟完成** [#112372](https://github.com/openclaw/openclaw/issues/112372)（今日关闭为 stale，非实现）。
- **Android 对齐浏览器的内联问题与原生审批** [#175826](https://github.com/openclaw/openclaw/issues/175826)。
- **团队侧边栏手动排序** [#155039](https://github.com/openclaw/openclaw/issues/155039)。

### 长期路线图信号

- **MCP 2.0（2026-07-28 stateless spec）迁移** [#119294](https://github.com/openclaw/openclaw/issues/119294) — 今日关闭为 stale，但协议升级是结构性问题，仍值得列入路线图审查。
- **Skill Workshop 学习覆盖率与行为复用验证** [#150250](https://github.com/openclaw/openclaw/issues/150250)。

---

## 7. 用户反馈摘要

从 Issue 评论与复现细节中提炼的真实痛点：

1. **Windows 是最脆弱的一等公民**：`schtasks` 托管安装、锁文件误判 stale、CLI 短进程与 Gateway 的 PID 命名空间冲突（[#170956](https://github.com/openclaw/openclaw/issues/170956)、[#174895](https://github.com/openclaw/openclaw/issues/174895)）。用户描述"只有反复尝试很多次才能重启成功"。
2. **升级/回滚路径是信任瓶颈**：多条 P0 都指向"修复已经存在，但用户升级不到"（[#193962](https://github.com/openclaw/openclaw/issues/193962)、[#167506](https://github.com/openclaw/openclaw/issues/167506)）。用户对"更新不可达"的容忍度极低。
3. **崩溃恢复后的自愈不足**：崩溃后 agent 可能永久不可用（[#166634](https://github.com/openclaw/openclaw/issues/166634)），或网关重启后 agent 集体降级（[#190307](https://github.com/openclaw/openclaw/issues/190307)）。用户希望有针对性 `doctor` 恢复命令，而不是全量 `--fix`。
4. **记忆系统的"不可解释性"**：短期召回淘汰、REM 合并引用错位、dreaming 永不提升（[#150635](https://github.com/openclaw/openclaw/issues/150635)、[#157827](https://github.com/openclaw/openclaw/issues/157827)、[#151173](https://github.com/openclaw/openclaw/issues/151173)）。用户能观察到计数异常，但缺少可解释的原因字段，这与功能请求 [#165685](https://github.com/openclaw/openclaw/issues/165685)（机器可读 reason）呼应。
5. **平台部署覆盖面被反复验证**：Kubernetes（fsGroup、PVC）、RHEL 8/al8（glibc）、macOS（WindowServer CPU、Apple Event 权限）、Android、Linux arm64 — 用户在生产中用多种形态部署，稳定性预期很高。
6. **数据暴露/安全细节被认真对待**：模型回退通知泄漏到外部渠道（[#92473](https://github.com/openclaw/openclaw/issues/92473)）、CDP WebSocket URL 携带凭证进入模型可见结果（[#158966](https://github.com/openclaw/openclaw/issues/158966)，已关闭）——社区对"内部信息不应出现在对外通道"很敏感。
7. **可观测性缺口**：用户多次指出"没有显式的掩码标识""没有 reason 字段""没有针对性修复命令"，说明诊断与运维可观测性是系统性缺口。

**满意度方面**：关闭节奏明确、每条 Issue 都有 clawsweeper 标签与评级（🦐/🦪/🦞/🐚/🌊），社区对分类体系与复现质量有较高认可；不满意主要集中在"修复到位但版本未释出"的时间差。

---

## 8. 待处理积压

以下长期未收敛的重要条目建议维护者优先关注：

| 条目 | 类型 | 创建时间 | 状态 | 备注 |
|---|---|---|---|---|
| [#112313](https://github.com/openclaw/openclaw/issues/112313) | P2 稳定性 | 2026-07-21 | OPEN | 死信出站队列条目永久不可清理，`openclaw health` 永久计数，无 CLI/RPC/TTL |
| [#92473](https://github.com/openclaw/openclaw/issues/92473) | P2 安全/UX | 2026-06-12 | OPEN | 模型回退通知泄漏到外部用户渠道，已近 5 个月未修复 |
| [#91931](https://github.com/openclaw/openclaw/issues/91931) | P1 数据丢失 | 2026-06-10 | OPEN | 预置 bootstrap 文件导致删除用户 BOOTSTRAP.md；`fix-shape-clear` 但自 6 月未合并 |
| [#116175](https://github.com/openclaw/openclaw/pull/116175) | 沙箱特性 | 2026-07-30 | OPEN | 允许命名主机根目录，`merge-risk: compatibility` + `security-boundary`，长时间待评审 |
| [#142470](https://github.com/openclaw/openclaw/pull/142470) | 修复 | 2026-09-08 | OPEN | 排队后续消息丢失隐式回复目标，`stale`，需 proof |
| [#143329](https://github.com/openclaw/openclaw/pull/143329) | macOS 修复 | 2026-09-09 | OPEN | Apple Event 权限探测占用协作线程池导致 macOS App 假死；`proof: sufficient` 但评分 P3 待推进 |
| [#166133](https://github.com/openclaw/openclaw/issues/166133) | P2 MCP | 2026-10-06 | OPEN | MCP 整数参数被转字符串，影响所有带整型参数的 MCP 工具 |
| [#170956](https://github.com/openclaw/openclaw/issues/170956) | **P0** Windows | 2026-10-13 | OPEN | 今日最活跃 Issue，仍 `needs-maintainer-review`，无 fix PR，是当前最需要介入的 P0 |
| [#194993](https://github.com/openclaw/openclaw/pull/194993) | 文档 | 2026-11-08 | OPEN | npm trusted publisher 管理文档，`status: ⏳ waiting on maintainer`，属发布流程阻塞项 |

**维护者关注建议优先级**：
1. 立即分诊 **#170956（P0，30 评论，无 fix PR）**，并评估是否可纳入 Windows 专项；
2. 推动 **#91931（P1，数据丢失，修复方向明确）** 与 **#166641（P1，已有 linked PR）** 的合并；
3. 安排 **#116175 / #143329** 的评审窗口，避免高 proof 质量 PR 因 stale 流失；
4. 回应 **#194993** 的 waiting-on-maintainer 状态，解除发布文档阻塞。

---

*数据来源：OpenClaw GitHub 仓库（github.com/openclaw/openclaw），统计窗口 2026-11-09 → 2026-11-10。*

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析
**数据窗口：2026-11-10（单日快照）**

---

## 1. 生态全景

个人 AI 助手与自主智能体开源生态正处在**"功能竞赛转入工程可靠性竞赛"**的转折点：头部项目单日 Issue+PR 更新量已达千级，但当日合计仅 3 个版本发布，绝大多数修复停留在待合并队列。共同的技术重心从"能不能做"迁移到**统一网关/多平台部署的稳定性、升级与崩溃自愈路径、审批安全边界、记忆系统可解释性**四条主线。同时，桌面端（尤其 Windows）与本地模型接入（MLX / Ollama / llama.cpp）成为新增缺陷最密集的两个面，反映出用户已把这类工具当作日常生产工具而非玩具。生态已明显分层：少数高吞吐核心项目（OpenClaw、hermes-agent）与一批垂直定位项目（QwenPaw 桌面优先、AstrBot 群聊机器人、DeepSeek Harness 闭源式交付）并行演进。

---

## 2. 各项目活跃度对比

> 口径说明：OpenClaw 与 hermes-agent 的 500 为 API 抽样上限，实际量级更高；DeepSeek Harness 未启用 Issues/PR，仅统计 Discussions；PicoClaw 当日无 Issue 更新。

| 项目 | Issues（更新 / 关闭） | PR（更新 / 合并·关闭） | 合并率 | Release | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500 / 220（关闭率 44%） | 500 / 151 | 30.2% | 0 | ⭐⭐⭐⭐ 活跃度顶级，**待合并积压 69.8%**；P0 Windows #170956 无 fix PR 是最大隐患 |
| **hermes-agent** | 500 / 76（15.2%） | 500 / 84 | 16.8% | **v0.23.1**（rollup 618 PR） | ⭐⭐⭐⭐ 交付能力最强，但**输入:审核 ≈ 5:1**，审核带宽是硬瓶颈 |
| **QwenPaw** | 17 / 2（11.8%） | 50 / 8 | 16% | **v2.3.0-beta.3** | ⭐⭐⭐⭐ 响应快（P0 当日出 PR），但桌面端/Windows 三线并发的 P0-P1 风险偏高 |
| **Zeroclaw** | 28 / 8（28.6%） | 50 / 12 | 24% | 0（v0.9.0 酝酿中） | ⭐⭐⭐ **S1 CI 阻塞（RUSTSEC）卡住整条 merge queue**，发布节奏被动 |
| **AstrBot** | 10 / 0（0%） | 21 / 3 | 14.3% | 0 | ⭐⭐ 高输入、低吞吐；Issue 零关闭 + 18 条待合并，含多条核心 fix |
| **PicoClaw** | 0 / 0 | 5 / 1 | 20% | 0 | ⭐⭐ 低活跃、stale 信号出现，评审响应是主要观察点 |
| **DeepSeek Harness** | 177 Discussions / 0 | 不适用（未启用 PR） | — | 0 | ⭐ **零发布周期 + P0 数据安全报告未回应**，闭环能力最弱 |

**关键读数**：OpenClaw 的 Issue 关闭率（44%）在所有项目中最高，说明其分诊与收敛机制最成熟；hermes-agent 的绝对交付量最大（单版本 618 PR）；AstrBot 与 DeepSeek Harness 呈现"输入充足、闭环缺失"的典型积压形态。

---

## 3. OpenClaw 在生态中的定位

**规模：唯一的第一梯队参照系。** 单日 Issue+PR 更新 1000 条，是第二梯队（hermes-agent 同为上限抽样）之外所有项目的 10–100 倍；QwenPaw（67）、Zeroclaw（78）、AstrBot（31）、PicoClaw（5）在体量上不在同一量级。其 PR 合并率 30.2% 也是全生态最高，说明**"大而不僵"**。

**技术路线差异：**

| 维度 | OpenClaw | 生态对比 |
|---|---|---|
| 架构核心 | 常驻 Gateway 进程 + 本地 SQLite 状态 + 多渠道接入 | hermes-agent 同样走统一网关（#106742），但收敛期长尾更重（#143547，60 评论） |
| 记忆系统 | 最重：dreaming / REM 回填 / 短期召回 512 上限，已形成独立议题簇 | QwenPaw 走"多模态记忆 + Memory Tags"文档化路线；hermes 走 memory provider 插件化 |
| 身份安全 | **OpenClaw ID owner re-bind**（密钥丢失/泄漏后的重绑定仪式），3 条 PR 同日推进，含 `security-boundary` 评审 | 生态内唯一把"身份可恢复性"作为独立产品能力的项目 |
| 平台覆盖 | K8s(fsGroup/PVC)、RHEL8/al8(glibc<2.31)、macOS(WindowServer/AppleEvent)、Android、Linux arm64 | 覆盖最广，也因此 P1 缺陷面最宽 |
| 社区治理 | clawsweeper 标签 + 🦐/🦞/🦪 评级体系，每条 Issue 有分级 | 生态内唯一具备**结构化缺陷分级**的项目，可运维性最强 |

**优势**：体量、分诊机制、记忆系统深度、身份安全前瞻性。
**相对短板**：**零发布周期**——今日关闭的 4 个 P0/P1（#193962、#167506、#172628、#192959）尚未转化为用户可感知收益；Windows P0 #170956（30 评论、`impact:crash-loop`、`needs-maintainer-review`）无 fix PR，是当前最需介入的单点。

---

## 4. 共同关注的技术方向

| 方向 | 涉及项目与具体诉求 | 信号强度 |
|---|---|---|
| **桌面端 / Windows 一等公民化** | OpenClaw #170956（schtasks 启动慢、锁文件误判 stale、反复重启才成功）；QwenPaw #8616（Win11 LTSC 启动 AppHang，2.2.2 正常→明确回归）、#8627（长路径+微信双卡死）；hermes #68128（WhatsApp bridge WinError 5）；DeepSeek #9995（MoveFileExW error 5 阻断升级）、#11095（cookie 累积溢出 maxHeaderSize 破坏启动） | 🔥🔥🔥 五项目共振 |
| **升级 / 崩溃自愈路径** | OpenClaw #193962（修复"到不了"用户）、#166634（崩溃后 agent 永久不可用）、#190307（重启后集体 degraded）；hermes #125437（P1，5 种失败机制、本周 15 条 Discord）；DeepSeek #9995；Zeroclaw #12153（install.sh 误选 musl） | 🔥🔥🔥 已成为**首要信任瓶颈** |
| **审批安全边界可信化** | hermes #141346（smart 模式误批 osascript 致不可恢复数据丢失）+ #151019（封堵三条旁路）；OpenClaw ID re-bind 三件套；Zeroclaw #10359（hash-chain 写入顺序污染审计）、#12064（Discord 对端 bot 可回答明文审批）；AstrBot #11039（shell blocklist 一刀切误杀） | 🔥🔥🔥 从"有审批"转向"审批可审计、不可旁路" |
| **记忆系统可解释 / 可控** | OpenClaw #150635（短期召回淘汰已回忆条目）、#157827（REM 合并 ref 错位）、#165685（机器可读 reason 字段）；QwenPaw 多模态记忆文档；hermes #152405（memory provider 转发 MCP） | 🔥🔥 从"有记忆"到"可解释记忆" |
| **本地模型接入与成本可观测** | QwenPaw MLX/GPU 三件套（#8649→#8647→#8648）；DeepSeek #3157（Ollama 5 分钟硬超时可配）；hermes #99943（云端 1M 窗口被 ollama_num_ctx 钳制）、#87697；AstrBot #11069（MALLOC_ARENA_MAX 实测 RSS −33%）；PicoClaw #3455（Termux+NVIDIA） | 🔥🔥 云/本配置语义隔离是共性痛点 |
| **MCP / 协议兼容与类型保真** | OpenClaw #119294（MCP 2.0 stateless spec 迁移）、#166133（整数参数被强制转字符串致 -32602）；hermes #152405；AstrBot 腾讯元宝 Provider #10745、System One #11062；PicoClaw Perplexity header #3466 | 🔥🔥 协议层仍是适配器鲁棒性短板 |
| **配置 / UI 一致性** | QwenPaw #8521（要求旧版 UI 切换）、#8612/#8650（工具卡片视觉割裂）；AstrBot #11058/#11067（插件配置折叠）；OpenClaw Control UI spinner 占 GPU（#193929）；Zeroclaw #12087（工具启停自动保存冲突） | 🔥 体验债普遍存在，但多为小步 PR |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 通用个人 AI 助手 + 长期记忆 + 身份安全 | 自托管高级用户、多平台部署者（K8s/RHEL/macOS/Android） | Gateway 常驻 + SQLite 状态机 + dreaming 记忆管线；Node 生态 |
| **hermes-agent** | 统一网关 + 插件目录生态 | 开发者、多端（CLI/TUI/Desktop/API/IM）重度用户 | 单 gateway 进程统一所有前端（#106742），正在把 turn/队列/审批收敛进 `SessionState` |
| **Zeroclaw** | 企业向安全与审计、原生 XMPP | 安全敏感型部署、合规场景 | **Rust**；AuditLogger hash-chain、OIDC/设备证书、ChaCha20Poly1305 统一 |
| **QwenPaw** | 桌面优先 + 本地模型（MLX/llama.cpp）+ 中文 IM 渠道 | 中文桌面用户（飞书/微信/QQ/元宝）、Apple Silicon 本地模型玩家 | AgentScope 系；渠道插件化 + 运行时 ABI 校验；Beta 快速迭代 |
| **AstrBot** | 群聊机器人 / 插件市场 | QQ 群、社群运营者、插件开发者 | Python；WebUI 配置驱动；插件市场分发链路 |
| **PicoClaw** | 轻量 / 嵌入式 / 移动终端 | Sipeed 硬件用户、Termux 移动场景 | 极简体量，PR 以单点修复与 i18n 为主 |
| **DeepSeek Harness** | 桌面客户端 + 本地 LLM 编排 | 桌面重度用户、多会话并行编排 | **闭源式交付**：仅 Release + Discussions，无 Issues/PR 通道；沙箱完整性标签机制（#10270） |

**定位判断**：OpenClaw 与 hermes-agent 争夺"通用自托管助手"心智，前者以记忆与身份安全为矛、后者以架构统一与生态目录为盾；QwenPaw 与 AstrBot 分别锁定"中文桌面"与"中文群聊"两个垂直场景；Zeroclaw 走 Rust + 合规的窄而深路线；DeepSeek Harness 的交付模式最特殊，也最脆弱。

---

## 6. 社区热度与成熟度

### 活跃度分层

| 层级 | 项目 | 特征 |
|---|---|---|
| **T1 极高活跃** | OpenClaw、hermes-agent | 日千级更新、有明确 release 动作；瓶颈在审核吞吐而非输入 |
| **T2 高活跃·质量巩固** | QwenPaw、Zeroclaw | 处于 beta / v0.9.0 前的收敛期；P0 响应快，但平台缺陷面集中 |
| **T3 中小活跃·局部推进** | AstrBot、PicoClaw | 有稳定贡献流入但评审滞后；AstrBot 尤为典型（Issue 关闭率 0%） |
| **T4 异常态** | DeepSeek Harness | 讨论热度 T1 级（177 条/日），交付为零，**热度与闭环严重脱节** |

### 成熟度判断

- **快速迭代期**：QwenPaw（beta.3，三件套 MLX 分层落地）、Zeroclaw（v0.9.0 前夜）。
- **质量巩固期**：hermes-agent（618 PR 稳定化 rollup 后进入统一网关长尾收敛）、OpenClaw（修复堆积等发布窗口）。
- **治理待改善**：AstrBot（#7409 挂起 7 个月、#8037 挂起 6 个月，#8050 PR 挂起 6 个月）、DeepSeek Harness（#3157 挂起 84 天，全站最高热度却改动最小）。
- **健康度最强的单点**：hermes-agent 的发布工程（Release Duty 自动化 + 目录 re-pin 让用户当日拿到修复）；**最需警惕的单点**：OpenClaw 零发布 + Windows P0 无 fix。

---

## 7. 值得关注的趋势信号

**① "修复已存在但用户拿不到"正在取代"功能缺失"成为首要信任问题。**
OpenClaw #193962/#167506（P0，update 路径阻塞）与 DeepSeek #9995（升级 100% 失败）指向同一结论：**发布工程本身就是产品能力**。对开发者的启示是——把 updater、migration、rollback、health check 当作一级模块设计，而非附属脚本。

**② 稳定性缺陷的共性根因是"状态清理与残留回收"，而非逻辑错误。**
跨项目高度同构：cookie 代际不回收（DeepSeek #11095）、锁文件误判 stale（OpenClaw #174895）、完整性标签残留外溢（DeepSeek #10270）、死信队列永久计数（OpenClaw #112313）、checkpoint 残留致 agent 不可用（#166634）。这提示**状态生命周期管理应成为 Agent 运行时的一等抽象**（TTL、代际、可观测的清理账本）。

**③ 安全语义从"是否审批"升级为"审批是否可信、是否可审计"。**
hermes #141346 的不可恢复数据丢失 + #151019 的三条旁路封堵 + 审计日志 PR #90186，Zeroclaw 的 hash-chain 顺序缺陷，共同说明：**smart/auto 审批必须在破坏性动作上强制显式确认，且决策需可回放**。对开发者的参考：审批策略应绑定"命令语义解析结果"而非"字符串白名单"（AstrBot #11039 的教训）。

**④ 成本可观测性从小众诉求变成竞争维度。**
DeepSeek #8934 用实测数据（每轮启动税 8,188 token、工具数 29 vs 4、R²=0.99）把"体感抱怨"升级为架构议题；AstrBot #11069 给出 RSS −33% 的实测参数；Zeroclaw #12353 要求会话成本显示；OpenClaw #182891（prompt cache 从不复用）。**上下文装配策略、缓存命中率、工具暴露数量将直接影响留存**。

**⑤ 平台一等公民化：Windows / K8s / Termux / RHEL8 都不能是二等。**
五个项目同时出现 Windows 缺陷，OpenClaw 单列 RHEL8 glibc<2.31 使所有 exec 失效（#191841）。这说明用户部署形态已高度碎片化，"只支持 macOS + Ubuntu"不再是可接受答案。

**⑥ 记忆系统进入"可解释性"阶段。**
OpenClaw 的记忆议题簇（淘汰策略冲突、REM ref 错位、缺 reason 字段）表明用户已能观察到计数异常但无法归因。**带机器可读 reason 的记忆决策日志**可能成为下一代助手的差异化能力。

**⑦ 社区治理本身成为项目竞争力。**
OpenClaw 的 clawsweeper 评级让千级更新仍可分诊；DeepSeek Harness 关闭 Issues 后，P1 阻断缺陷只能沉没在 Discussions（#8827 明确记录该处境）。**缺陷追踪通道的开放度与标签体系，直接决定高质量报告是否被消化**。

---

### 一句话结论

**生态整体处于"输入远超闭环"的状态：功能供给充足、修复方案大量存在，但发布节奏、审核带宽、状态清理机制与安全审批可信度是四个共同的系统性瓶颈；OpenClaw 以规模、分诊机制与身份安全领先，但零发布与 Windows P0 是其当前最大扣分项——这与 hermes-agent 的高交付、AstrBot/DeepSeek 的低闭环形成三种截然不同的健康度画像。**

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报（2026-11-10）

## 1. 今日速览

过去 24 小时 Zeroclaw 保持高活跃：Issues 更新 28 条（新开/活跃 20、关闭 8），PR 更新 50 条（待合并 38、已合并/关闭 12），但新增版本为 0。当前最突出的健康度风险是 [Issue #12320](https://github.com/zeroclaw-labs/zeroclaw/issues/12320)：`Security` job 因 RUSTSEC-2026-0459 每次构建失败，并连带 `CI Required Gate` 失败，直接阻塞 PR 合并与 merge queue。PR 侧待合并占比达 76%（38/50），合并队列压力明显。与此同时，围绕 zerocode OIDC 登录/设备证书的 #12317 衍生出多项安全与文档跟进 Issue，显示该方向正在集中推进但仍需收口。

> 数据说明：PR 评论数在提供数据中为 `undefined`，且未列出已合并/关闭 PR 的具体条目；以下 PR 分析主要依据状态、标签、规模与关联 Issue。所有反应数均为 0。

---

## 2. 版本发布

无新版本发布（过去 24 小时 0 个），暂无更新内容、破坏性变更或迁移注意事项。  
但 #12320、#12355、#12359 带有 `release:v0.9.0` 标签，说明 v0.9.0 相关修复正在推进；其中 #12320 是当前发布/合并阻塞项。

---

## 3. 项目进展

今日完成 8 个 Issue 关闭和 12 个 PR 合并/关闭，项目在安全、配置与 UI 细节上完成了一批闭环；但 PR 具体合并明细未在数据中给出，无法逐条复盘。已关闭的重要 Issue 包括：

| 进展项 | 状态 | 意义 |
|---|---|---|
| [Issue #10359](https://github.com/zeroclaw-labs/zeroclaw/issues/10359) AuditLogger 在写入前推进 hash-chain 状态，失败写入后污染验证 | CLOSED | 高风险安全/审计一致性修复闭环 |
| [Issue #11009](https://github.com/zeroclaw-labs/zeroclaw/issues/11009) Agent alias 重命名未级联 permission-profile selectors | CLOSED | 身份与权限配置一致性改进 |
| [Issue #12153](https://github.com/zeroclaw-labs/zeroclaw/issues/12153) `install.sh` 在 glibc 主机误选 musl 构建 | CLOSED | 安装/引导体验修复 |
| [Issue #12064](https://github.com/zeroclaw-labs/zeroclaw/issues/12064) Discord 明文审批可被 allowlist 对端 bot 回答 | CLOSED | 渠道审批安全边界修复 |
| [Issue #12312](https://github.com/zeroclaw-labs/zeroclaw/issues/12312) OIDC enrollment 使用发现的 `authorization_endpoint` 未受 URL 策略约束 | CLOSED | OIDC 安全策略收口 |
| [Issue #12087](https://github.com/zeroclaw-labs/zeroclaw/issues/12087) 工具启停按钮自动保存与保存按钮状态冲突 | CLOSED | Web 仪表盘交互一致性修复 |
| [Issue #11919](https://github.com/zeroclaw-labs/zeroclaw/issues/11919) Web chat 增加保持 Thinking 框折叠的开关 | CLOSED | 聊天体验优化闭环 |
| [Issue #11952](https://github.com/zeroclaw-labs/zeroclaw/issues/11952) 生命周期目录修复命令对以 `-` 开头的相对路径失效 | CLOSED | 启动修复路径健壮性改进 |

整体看，项目在安全与配置健壮性上有所前进，但 #12320 的 S1 CI 阻塞会限制新 PR 进入合并队列，净推进速度受明显影响。

---

## 4. 社区热点

按评论数看，今日讨论最集中的是：

| 热点 | 评论/反应 | 分析 |
|---|---|---|
| [Issue #12320](https://github.com/zeroclaw-labs/zeroclaw/issues/12320) `Security` job 因 RUSTSEC-2026-0459 每次失败 | 3 评论 / 0 👍 | 今日最高讨论项。它不仅是依赖漏洞问题，更是 merge queue 和 v0.9.0 的发布阻塞项，维护者需优先处理。 |
| [Issue #10359](https://github.com/zeroclaw-labs/zeroclaw/issues/10359) AuditLogger hash-chain 写入顺序缺陷 | 2 评论 / 0 👍 | 已关闭，但属于高风险审计安全问题，社区关注其验证链一致性。 |
| [Issue #11009](https://github.com/zeroclaw-labs/zeroclaw/issues/11009) alias 重命名未级联权限配置 | 2 评论 / 0 👍 | 已关闭，反映配置生命周期与授权模型之间的耦合问题。 |
| [Issue #12153](https://github.com/zeroclaw-labs/zeroclaw/issues/12153) `install.sh` 误判 musl | 1 评论 / 0 👍 | 安装脚本误判会直接影响新用户首次部署体验。 |
| [Issue #12351](https://github.com/zeroclaw-labs/zeroclaw/issues/12351) Anthropic fallback 测试偶发失败 | 1 评论 / 0 👍 | CI 稳定性问题，虽然严重度为 S3，但会消耗维护者排障时间。 |

PR 侧因评论数缺失无法按讨论热度排序。但从关联关系和标签看，[PR #12317](https://github.com/zeroclaw-labs/zeroclaw/pull/12317)（zerocode OIDC 免配对登录与保存远程凭据，`size:XL`、`risk:high`）衍生出 #12331—#12340 多项跟进 Issue，是当前最值得关注的功能/安全集群；[PR #11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847)（原生 Rust XMPP，`size:XL`、`needs-maintainer-review`）则长期占用高审查成本。

---

## 5. Bug 与稳定性

按严重程度排列今日需关注的 Bug：

| 严重度 | Issue | 状态 | 影响 | 是否已有 fix PR |
|---|---|---|---|---|
| S1 | [Issue #12320](https://github.com/zeroclaw-labs/zeroclaw/issues/12320) Security job 因 RUSTSEC-2026-0459 每次构建失败 | OPEN | 阻塞所有 PR 合并与 merge queue，v0.9.0 发布风险高 | 提供数据中未见对应 PR |
| S1 | [Issue #12354](https://github.com/zeroclaw-labs/zeroclaw/issues/12354) zerorelay 不 flush TLS 写入，dashboard 资源挂起至 idle timeout | OPEN | relay 服务下仪表盘可能等待 300 秒，frontdoor 资源延迟 | 有 [PR #12355](https://github.com/zeroclaw-labs/zeroclaw/pull/12355) |
| S2 | [Issue #12357](https://github.com/zeroclaw-labs/zeroclaw/issues/12357) 受限账号启动 zerocode 时因 config/log pane 被当作 fatal 而退出 | OPEN | 非管理员/受限账户连接后立即 exit 1，影响可用性 | 有 [PR #12359](https://github.com/zeroclaw-labs/zeroclaw/pull/12359) |
| S2 | [Issue #12330](https://github.com/zeroclaw-labs/zeroclaw/issues/12330) `zerocode-config.toml` 解析/读取失败时丢弃远程连接并回退本地 daemon | OPEN | 配置损坏会静默切到本地，可能导致用户连错环境 | 有 [PR #12336](https://github.com/zeroclaw-labs/zeroclaw/pull/12336) |
| S2 | [Issue #12325](https://github.com/zeroclaw-labs/zeroclaw/issues/12325) docs canonical URL 指向 release 目录，每次稳定版发布都移动全部 canonical | OPEN | SEO 与外部链接稳定性受损 | 未见对应 PR |
| S3 | [Issue #12351](https://github.com/zeroclaw-labs/zeroclaw/issues/12351) Anthropic fallback 测试间歇失败 | OPEN | CI 偶发失败，降低测试可信度 | 未见对应 PR |
| S3 | [Issue #12350](https://github.com/zeroclaw-labs/zeroclaw/issues/12350) Telegram channel 测试在 Parallel Runtime Test 中挂起至 30 分钟超时 | OPEN | CI 资源浪费与流水线不稳定 | 未见对应 PR |
| S3 | [Issue #12347](https://github.com/zeroclaw-labs/zeroclaw/issues/12347) zerocode 配置写入器可能覆盖并发更新 | OPEN | 并发写 `zerocode-config.toml` 可能丢更新 | 未见对应 PR |
| S3 | [Issue #12326](https://github.com/zeroclaw-labs/zeroclaw/issues/12326) 被裁剪 docs 版本链接落到 GitHub Pages 通用 404 | OPEN | 旧版本文档外链体验差 | 未见对应 PR |
| S3 | [Issue #12324](https://github.com/zeroclaw-labs/zeroclaw/issues/12324) docs 部署使 rustdoc API 树和 per-locale 404 可被索引 | OPEN | SEO 与文档站质量受影响 | 未见对应 PR |

已关闭的 bug/安全问题中，#10359、#12064、#12153、#12312 属于较有价值的稳定性与安全修复，建议在下一个 release note 中明确列出。

---

## 6. 功能请求与路线图信号

| 需求 | 信号 | 路线图判断 |
|---|---|---|
| [Issue #12353](https://github.com/zeroclaw-labs/zeroclaw/issues/12353) 在 ZeroCode/Web Chat 中显示当前会话预估美元成本 | 已有 [PR #12358](https://github.com/zeroclaw-labs/zeroclaw/pull/12358) 记录 bounded holding-crate exception，说明在推进合规/架构收口 | 有近期落地信号，但仍处设计/例外审批阶段，需观察实现 PR |
| [Issue #12337](https://github.com/zeroclaw-labs/zeroclaw/issues/12337) OIDC 自助设备证书 bootstrap 增加 operator opt-in，默认关闭 | 与 #12317 同批，默认关闭、安全敏感 | 若 #12317 合并，可能作为后续安全加固项进入 v0.9.x |
| [Issue #12269](https://github.com/zeroclaw-labs/zeroclaw/pull/12269) 配对设备语音设置与聊天控制 | `size:XL`，涉及 docs/config/gateway/security:pairing/web | 路线图候选，但审查成本高，短期不一定进入 v0.9.0 |
| [PR #11845](https://github.com/zeroclaw-labs/zeroclaw/pull/11845) / [PR #11846](https://github.com/zeroclaw-labs/zeroclaw/pull/11846) Dashboard 展示/配置 OpenRouter 余额 | 长期开放，涉及 provider/gateway/web | 可能延后，需维护者排优先级 |
| [PR #11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) 原生 Rust XMPP + 可选 legacy OMEMO | `size:XL`、`risk:high`、`needs-maintainer-review`，并有 follow-up #12319 | 长期特性，短期更可能停留在审查/依赖清理阶段 |
| [Issue #11919](https://github.com/zeroclaw-labs/zeroclaw/issues/11919) / [Issue #12087](https://github.com/zeroclaw-labs/zeroclaw/issues/12087) Web chat 折叠 Thinking、工具启停保存状态 | 均已 CLOSED | 已进入关闭闭环，建议确认是否已实际合入并在 release note 中体现 |

---

## 7. 用户反馈摘要

基于 Issues 描述（未提供评论正文，以下为诉求提炼）：

- **CI/发布阻塞是最大痛点**：贡献者面临“每个新 CI run 都失败、没有 PR 能合并”的困境，直接影响 v0.9.0 节奏。
- **受限账户与远程连接场景易失败**：非管理员账号连接后 zerocode 直接退出；配置文件解析失败时静默回退本地 daemon，用户可能误以为仍在连远程。
- **Dashboard/relay 可靠性影响实际使用**：relay 下 dashboard 资源可能挂起至 300 秒，frontdoor 资源延迟到达，属于明显可感知的体验问题。
- **安全边界需要更明确**：Discord 对端 bot 可回答明文审批、OIDC endpoint 策略、设备证书 CA 语义、凭据代际清理等，均反映用户/维护者对默认安全姿态的关注。
- **安装与文档体验仍有细节缺口**：glibc 主机误装 musl、旧版本文档 404、canonical URL 随 release 漂移、rustdoc 可索引等，都会影响新用户与外部引用。
- **UI 一致性反馈明确**：工具启停自动保存但保存按钮仍变脏、Thinking 框每次展开、缺少会话成本可见性，说明用户希望更可控、更少打扰的交互。
- **满意度信号**：8 个 Issue 今日关闭，说明部分反馈得到响应；但 S1 CI 阻塞和 38 条待合并 PR 会削弱社区对合并效率的体感。

---

## 8. 待处理积压

以下为长期开放、规模较大或明确需要维护者关注的事项，建议排期复查：

| 事项 | 创建时间 | 状态/标签 | 积压原因 |
|---|---|---|---|
| [PR #11845](https://github.com/zeroclaw-labs/zeroclaw/pull/11845) Dashboard 展示 OpenRouter 余额 | 2026-10-18 | OPEN，`web`、`risk:medium`、`size:L` | 开放约 23 天，涉及 provider/gateway/web |
| [PR #11846](https://github.com/zeroclaw-labs/zeroclaw/pull/11846) Web 设置控制 OpenRouter 余额上报 | 2026-10-18 | OPEN，`size:XL`、`risk:medium` | 与 #11845 配套，审查面较大 |
| [PR #11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) 原生 Rust XMPP + 可选 OMEMO | 2026-10-19 | OPEN，`size:XL`、`risk:high`、`needs-maintainer-review` | 高风险大特性，依赖 #12015，另有 follow-up #12319 |
| [PR #11868](https://github.com/zeroclaw-labs/zeroclaw/pull/11868) 阻止重复工具调用并保留 closeout | 2026-10-19 | OPEN，`needs-maintainer-review`、`risk:high` | 运行时行为变更，需维护者审查 |
| [PR #11869](https://github.com/zeroclaw-labs/zeroclaw/pull/11869) 任务级 SSH transport 复用 | 2026-10-19 | OPEN，`size:L` | 已有例外文档 #12266，但仍待推进 |
| [PR #11874](https://github.com/zeroclaw-labs/zeroclaw/pull/11874) 长 agent turn 进度上报 | 2026-10-19 | OPEN，`size:M`、`risk:medium` | 开放约 22 天，涉及 channel/runtime |
| [PR #11911](https://github.com/zeroclaw-labs/zeroclaw/pull/11911) 保留已完成工具结果并复用 bounded recovery | 2026-10-20 | OPEN，`size:XL` | 依赖 #12323，链路较长 |
| [PR #12015](https://github.com/zeroclaw-labs/zeroclaw/pull/12015) 统一 ChaCha20Poly1305 消费者 | 2026-10-24 | OPEN，`risk:high`、`size:S` | 安全相关依赖重构，需谨慎审查 |
| [Issue #12320](https://github.com/zeroclaw-labs/zeroclaw/issues/12320) Security job 阻塞 | 2026-11-09 | OPEN，S1、`release:v0.9.0` | 虽非长期积压，但为当前最高优先级阻塞项，建议今日跟进 |

**维护者关注建议**：优先解除 #12320 的 CI 阻塞；随后处理带 `release:v0.9.0` 的 #12355、#12359；对 #11847、#11868、#12015 等高风险/XL 项明确审查负责人，避免 10 月中旬以来的 PR 继续堆积。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报  
**日期：2026-11-10｜数据窗口：过去 24 小时**

## 1. 今日速览
- 今日项目**无 Issues 更新、无新版本发布**，可观测用户侧问题流入为 0；主要动态集中在 PR 队列。  
- 过去 24 小时共 **5 条 PR 更新**：4 条待合并、1 条关闭（#3448 状态为 CLOSED，数据未区分是否已合并）。  
- 待处理 PR 覆盖国际化、Skills 安装修复、Perplexity 搜索集成头、Termux/NVIDIA 兼容性修复，代码贡献仍有延续。  
- 但 PR 评论数为 `undefined`、点赞均为 0，社区讨论热度无法量化；结合 2 条 `[stale]` 标记，评审响应与积压清理是当前健康度观察点。

## 2. 版本发布
无新版本发布，省略详细说明。

## 3. 项目进展
今日唯一关闭/合并统计项为 **#3448**，其余 4 条 PR 仍待合并。整体推进幅度**偏低至中等**：有 1 条 provider 相关 PR 关闭，但无 release 落地，功能进入主线的确定性有限。

| PR | 状态 | 进展与影响 | 链接 |
|---|---|---|---|
| #3448 feat(provider): add Runcrate OpenAI-compatible provider | CLOSED / `[stale]` | 新增 Runcrate 作为 OpenAI-compatible provider（`runcrate/` 前缀，base `https://api.runcrate.ai/v1`）。但单条状态为 CLOSED，数据未说明是否合并，不能确认已进入主线。 | https://github.com/sipeed/picoclaw/pull/3448 |
| #3467 feat(web): add French UI locale | OPEN | 为 Web launcher 增加完整法语 UI locale，注册 i18next/dayjs，并加入登录、初始化、Dashboard 语言菜单。若合并将提升国际化覆盖。 | https://github.com/sipeed/picoclaw/pull/3467 |
| #3463 fix(skills): deduplicate installed skills per root, not by frontmatter name | OPEN | 修复 Skills 安装时因 frontmatter `name` 重复导致误判 `registry archive is not a valid skill` 的问题。 | https://github.com/sipeed/picoclaw/pull/3463 |
| #3466 feat(tools): send X-Pplx-Integration header on Perplexity web search | OPEN | 为 Perplexity web search 请求增加静态 `X-Pplx-Integration: picoclaw` 头，属于小型工具集成改进。 | https://github.com/sipeed/picoclaw/pull/3466 |
| #3455 Fix/nvidia model id termux shell | OPEN / `[stale]` | 标题指向 NVIDIA model ID 与 Termux shell 的修复，但 PR 描述模板未有效填写，评审信息不足。 | https://github.com/sipeed/picoclaw/pull/3455 |

## 4. 社区热点
今日数据中 **Issues 为 0，PR 评论数为 `undefined`，点赞均为 0**，因此无法按评论/反应排序识别真实热点。可观测的“关注点”主要是新开 PR 与 stale PR：

- **#3467 法语 UI locale**：今日新开，属于用户可见的国际化功能，若维护者响应及时，可能成为近期 Web 端体验改进点。  
  https://github.com/sipeed/picoclaw/pull/3467
- **#3455 Termux/NVIDIA 修复**：带 `[stale]` 标记，创建于 2026-11-01，更新于 2026-11-09，说明已进入积压区；背后诉求可能是移动端/Termux 与 NVIDIA 模型 ID 兼容性。  
  https://github.com/sipeed/picoclaw/pull/3455
- **#3463 Skills 去重修复**：直接指向 `picoclaw skills install` 与 `install_skill` 工具的失败场景，属于影响使用流程的稳定性问题。  
  https://github.com/sipeed/picoclaw/pull/3463

**分析**：今日社区互动数据缺失或极低，热点更多体现为“待评审 PR 队列”，而非讨论驱动。

## 5. Bug 与稳定性
今日无新 Issues 报告；从 PR 描述可识别以下稳定性相关项：

| 严重程度 | 问题 | 状态 / Fix PR | 链接 |
|---|---|---|---|
| 中 | Skills 安装失败：当多个已安装 skill 共享相同 frontmatter `name` 时，`picoclaw skills install` 或 `install_skill` 可能报 `registry archive is not a valid skill`，即使 skill 目录、作者、内容不同。 | 已有 fix PR **#3463**，待合并；PR 描述称修复 #3462。 | https://github.com/sipeed/picoclaw/pull/3463 |
| 中低 | NVIDIA model ID 在 Termux shell 场景下的兼容/修复问题。 | **#3455** 为修复 PR，但仍 OPEN 且 `[stale]`，描述不完整，需补充复现与变更说明。 | https://github.com/sipeed/picoclaw/pull/3455 |

**稳定性判断**：未观察到崩溃、回归类新 Issue；主要风险集中在 Skills 安装路径的可用性，以及 Termux/NVIDIA 场景的修复推进速度。

## 6. 功能请求与路线图信号
今日无 Issues 形式的功能请求；从 PR 可提取以下路线图信号：

| 功能方向 | 信号 | 下一版本纳入可能性判断 | 链接 |
|---|---|---|---|
| Web UI 国际化 | 新增法语 locale，覆盖登录、初始化、Dashboard 语言菜单 | 中高：功能完整、用户可见，若评审通过可进入近期版本 | https://github.com/sipeed/picoclaw/pull/3467 |
| Skills 安装可靠性 | 按安装根目录而非 frontmatter name 去重 | 高：直接修复安装失败，属于稳定性修复 | https://github.com/sipeed/picoclaw/pull/3463 |
| Perplexity 工具集成 | 增加 `X-Pplx-Integration` 请求头 | 中：改动小，但需确认集成标识是否被上游要求/认可 | https://github.com/sipeed/picoclaw/pull/3466 |
| Provider 扩展 | Runcrate OpenAI-compatible provider | 低至中：PR 已 CLOSED，除非重新开启或已有替代实现，否则短期纳入不确定 | https://github.com/sipeed/picoclaw/pull/3448 |
| Termux/NVIDIA 兼容 | 修复 NVIDIA model ID 与 Termux shell | 中：若补充说明并通过评审可纳入；当前 stale 状态降低优先级 | https://github.com/sipeed/picoclaw/pull/3455 |

## 7. 用户反馈摘要
今日无 Issues，且 PR 评论字段为 `undefined`，因此**无法从评论中提炼真实满意度或不满情绪**。仅能从 PR 描述推断使用场景与痛点：

- **多语言使用场景**：Web launcher 需要法语 UI，说明存在非英语用户或本地化部署需求。  
  https://github.com/sipeed/picoclaw/pull/3467
- **Skills 安装痛点**：不同 skill 共享 frontmatter name 时安装失败，影响 `skills install` 与 agent 的 `install_skill` 工具使用。  
  https://github.com/sipeed/picoclaw/pull/3463
- **Termux / NVIDIA 场景**：存在移动终端或 Termux 环境下使用 NVIDIA 模型的兼容需求。  
  https://github.com/sipeed/picoclaw/pull/3455
- **第三方工具集成需求**：Perplexity web search 需要携带集成标识头；Runcrate provider 曾被提交，反映 provider 扩展诉求。  
  https://github.com/sipeed/picoclaw/pull/3466  
  https://github.com/sipeed/picoclaw/pull/3448

## 8. 待处理积压
| 项目 | 积压情况 | 建议关注 | 链接 |
|---|---|---|---|
| #3455 Fix/nvidia model id termux shell | OPEN，`[stale]`，创建于 2026-11-01，已约 9 天；描述模板未有效填写 | 建议维护者要求补充复现步骤、变更点和测试结果，或标记关闭/延期 | https://github.com/sipeed/picoclaw/pull/3455 |
| #3448 Runcrate provider | CLOSED，`[stale]`，创建于 2026-10-25 | 已关闭，但若社区仍有 provider 需求，可确认关闭原因并归档结论 | https://github.com/sipeed/picoclaw/pull/3448 |
| #3463 Skills 去重修复 | OPEN，创建于 2026-11-06，更新于 2026-11-09 | 属明确 bug fix，建议优先评审，避免 Skills 安装失败持续影响用户 | https://github.com/sipeed/picoclaw/pull/3463 |
| #3466 Perplexity header | OPEN，创建于 2026-11-09 | 改动较小，可快速确认集成头是否符合上游规范 | https://github.com/sipeed/picoclaw/pull/3466 |

**总体健康度评估**：项目今日无 Issue 噪声、无 release 风险，但 PR 评审队列存在 stale 信号；建议优先处理 **#3463 稳定性修复**，并清理 **#3455 stale PR**。社区互动数据缺失，后续日报若能补充评论数/反应数，将更利于判断真实热度。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-11-10

---

## 1. 今日速览

过去 24 小时项目**维持高位运转**：Issues 更新 17 条（新开/活跃 15、关闭 2），PR 更新 50 条（待合并 42、合并/关闭 8），并发布 `v2.3.0-beta.3`。热门问题集中在桌面端（Desktop）打包构建的渠道插件激活失败、Windows 平台兼容性与 UI 细节体验上，其中 #8644 已在同日提交修复 PR #8653，响应速度良好。整体判断：**项目健康度高、迭代速度快（v2.3.0 beta 周期内第 3 个预发布），但桌面端与渠道体系仍是稳定性的主要风险面**。

---

## 2. 版本发布

### v2.3.0-beta.3（Beta）
🔗 https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.0-beta.3

**更新内容**
- `docs(memory)`：为「多模态记忆（Multimodal Memory）」与「Memory Tags」补充独立的双语博客文档（PR #8506，@wang-qisen）。
- `fix(channels)`：修复桌面端（Desktop）的插件安装与修复流程失败问题（PR by @Luohh5）。

**破坏性变更**：数据未显示有破坏性变更。作为 beta 预发布，建议仅在测试环境使用。

**迁移注意事项**
- 该版本修复了渠道插件的安装/修复路径，若此前在 Beta 环境下遇到插件安装失败（参见 #8595、#8644），升级后应复验。
- 属于 2.3.0 系列的 beta 迭代，正式升级前建议先行运行 Release Duty 验证任务（见 #8643）。

> 另有 PR #8542「chore: update the release note for v2.3.0」仍处于待合并状态，提示 v2.3.0 正式版正在酝酿中。

---

## 3. 项目进展

今日合并/关闭的重要 PR 共 8 条，已展示的主要包括：

| PR | 类型 | 说明 |
|---|---|---|
| [#8653](https://github.com/agentscope-ai/QwenPaw/pull/8653) | fix(channels) | 保留桌面端渠道启动时的运行时 ABI 检查，直接针对 #8644 中 `validate_runtime_identity` 读取 `supported_tags` 的 AttributeError。**同日提出、同日提交修复**，响应及时。 |
| [#8645](https://github.com/agentscope-ai/QwenPaw/pull/8645) | feat(local-models) | 原「MLX 引擎 + GPU 控制」超大 PR 已关闭，并被拆分为 #8649 → #8647 → #8648 三层递进 PR，由同一作者 @LXD-8 分阶段推进。这是合理的评审降载，而非功能搁置。 |
| [#8641](https://github.com/agentscope-ai/QwenPaw/pull/8641) | fix(ci) | 将 macOS 桌面构建超时提升至 90 分钟，缓解桌面端 CI 超时。 |
| [#8639](https://github.com/agentscope-ai/QwenPaw/pull/8639) | fix(test) | 修复依赖安装测试中的 BOM 解码问题。 |
| [#8640](https://github.com/agentscope-ai/QwenPaw/pull/8640) | test | 修复 Windows 平台文件权限与 UTF-8 BOM 断言的跨平台问题。 |

**推进进度小结**
- **渠道稳定性**：v2.3.0-beta.3 修复插件安装失败，叠加 #8653 的 ABI 检查修复，桌面端渠道启动链路是本轮重点修复对象。
- **本地模型能力**：MLX / llama.cpp GPU 控制以 3 个 PR 形式重新入队，是 2.3.x 之后最值得跟踪的功能线。
- **跨平台测试基建**：3 个 XS 级测试/CI PR 关闭，明显在清理 Windows/macOS 的 CI 噪声。

---

## 4. 社区热点

### 🔥 讨论最活跃 Issues（按评论数排序）

1. **#8595 [Bug] `qwenpaw-creator` 插件安装失败**（4 评论）
   🔗 https://github.com/agentscope-ai/QwenPaw/issues/8595
   - 用户在扩展 UI 与 CLI 双路径安装 `qwenpaw-creator` v2.0.4 时，均报 `No package metadata was found`。
   - **诉求**：官方插件应当开箱可用。今日 beta.3 的 `fix(channels)` 恰好涉及插件安装问题，但 issue 仍为 OPEN，需作者确认是否已覆盖修复。

2. **#8521 [Bug] 对话无回复 + Ctrl+C 需多次复制 + 新版 UI 卡顿**（4 评论，持续更新 5 天）
   🔗 https://github.com/agentscope-ai/QwenPaw/issues/8521
   - 用户反馈：回复内容随机缺失、复制需多次按 Ctrl+C、新版 UI 反应迟缓且模型切换入口难找。
   - **诉求**：希望增加「旧版 UI 切换按钮」，实质是对新版交互效率的不满。

3. **#8644 [Bug] 打包 Desktop 构建上所有渠道插件无法激活**（2 评论，当日更新）
   🔗 https://github.com/agentscope-ai/QwenPaw/issues/8644
   - 飞书 / 微信 / 元宝在 `2.3.0b3` 打包构建上全部卡在 `validation pending`，根因是 `DependencyReadEvidence` 上读取 `supported_tags` 抛 AttributeError → `WORKER_START_FAILED`。
   - **已配套修复 PR #8653**，是本日社区关注度最高的严重缺陷。

4. **#8643 [Release Duty] v2.3.0-beta.3 安装验证**（0 评论，但为 Release Bot 自动化跟踪项）
   🔗 https://github.com/agentscope-ai/QwenPaw/issues/8643
   - 四项跨平台检查点，可作为 v2.3.0 发布前的健康度指标。

### 🔧 关注度较高的 PR
- **#8654** Creator 2.0.5 发布（XXXL）：🔗 https://github.com/agentscope-ai/QwenPaw/pull/8654
- **#8234** GBK/CP936 解码修复（XXL，已挂 Under Review 27 天）：中文 Windows 用户的关键数据完整性修复。🔗 https://github.com/agentscope-ai/QwenPaw/pull/8234

**分析**：社区关注焦点已从「功能增加」转向「桌面端基线可用性与交互质感」。插件/渠道安装链路（#8595、#8644、#8627）是当前最主要的信任风险；UI 一致性（#8612、#8650、#8521）则是最集中的体验抱怨来源。

---

## 5. Bug 与稳定性

按严重程度排序：

### 🔴 P0 — 阻断级
| Issue | 现象 | 是否有 Fix PR |
|---|---|---|
| **#8644** [打包 Desktop 渠道插件全部无法激活](https://github.com/agentscope-ai/QwenPaw/issues/8644) | 飞书/微信/元宝在 2.3.0b3 packaged 构建上全部失效，`WORKER_START_FAILED` | ✅ PR [#8653](https://github.com/agentscope-ai/QwenPaw/pull/8653) |
| **#8595** [qwenpaw-creator 安装失败](https://github.com/agentscope-ai/QwenPaw/issues/8595) | UI 与 CLI 双路径均报 `No package metadata was found` | ⚠️ 可能被 beta.3 的 `fix(channels)` 覆盖，待确认 |
| **#8616** [2.3.0-beta.1 Windows 11 IoT LTSC 无法启动](https://github.com/agentscope-ai/QwenPaw/issues/8616) | 报「path not found」后 AppHang，2.2.2 可正常运行，属明确回归 | ❌ 无 |

### 🟠 P1 — 功能受损
| Issue | 现象 | 是否有 Fix PR |
|---|---|---|
| **#8651** [QQ 渠道静默丢弃纯图片 C2C 消息](https://github.com/agentscope-ai/QwenPaw/issues/8651) | 模型无关（发生在模型调用前），纯图片消息被吞 | ❌ 无 |
| **#8627** [Windows 长路径致 Checkpoint 服务失败 + 微信渠道卡死](https://github.com/agentscope-ai/QwenPaw/issues/8627) | `LongPathsEnabled=1` 下仍失败，微信停在 `DEPENDENCY_ENVIRONMENT_AMBIGUOUS` | ❌ 无 |
| **#8629** [超大历史图片每次模型调用都重发](https://github.com/agentscope-ai/QwenPaw/issues/8629) | Token/成本浪费，且重试成功后仍保留误导性「Image loaded」文本 | ✅ PR [#8636](https://github.com/agentscope-ai/QwenPaw/pull/8636) |
| **#8603** [自定义 OpenAI 兼容 Provider 下 `run_code` 参数为空](https://github.com/agentscope-ai/QwenPaw/issues/8603) | `'code' is a required property`，kimi / k3.1-pro 类渠道全部工具调用失败 | ❌ 无 |
| **#8652** [Mission 任务切模型后派发脚本仍用旧模型](https://github.com/agentscope-ai/QwenPaw/issues/8652) | 模型切换状态未同步到下游派发层 | ❌ 无 |

### 🟢 P2 — 性能与体验
- **#8619** [相同搜索命中重复查询轮次边界](https://github.com/agentscope-ai/QwenPaw/issues/8619)、**#8620** [Search deadline 超时后吞掉 SQLite 错误](https://github.com/agentscope-ai/QwenPaw/issues/8620) — 同一作者两连报，`MemorySpace.search` 的性能与可观测性问题，均无 PR。
- **#8521** [对话无回复 + 复制需多次](https://github.com/agentscope-ai/QwenPaw/issues/8521) — 归类于体验层，长期未修复。

### ✅ 今日关闭
- **#8585** [Windows `\\?\` 扩展路径破坏 SQLite 只读 URI](https://github.com/agentscope-ai/QwenPaw/issues/8585) — 已关闭，`recall_history` 在 Windows 上的阻塞问题解除。
- **#8502** [桌面端 HTML 预览「在浏览器中打开」失效（中文路径）](https://github.com/agentscope-ai/QwenPaw/issues/8502) — 已关闭。

---

## 6. 功能请求与路线图信号

| 功能请求 | 关联 PR | 纳入下一版本可能性 |
|---|---|---|
| **#8646** [为 QwenPaw Local 增加托管 MLX 引擎与 GPU 控制](https://github.com/agentscope-ai/QwenPaw/issues/8646) | ✅ 三件套 PR [#8649](https://github.com/agentscope-ai/QwenPaw/pull/8649) / [#8647](https://github.com/agentscope-ai/QwenPaw/pull/8647) / [#8648](https://github.com/agentscope-ai/QwenPaw/pull/8648)（分层递进，需按顺序合并） | ⭐⭐⭐ **高**。已拆解为可评审单元，且覆盖 Apple Silicon 用户核心诉求（MLX 常比 llama.cpp 快），最可能进入 2.3.x / 2.4。 |
| **#8650** [思考块与工具卡片视觉不一致、左侧边缘跳动](https://github.com/agentscope-ai/QwenPaw/issues/8650)、**#8612** [执行类工具调用可读性差](https://github.com/agentscope-ai/QwenPaw/issues/8612) | ✅ PR [#8638](https://github.com/agentscope-ai/QwenPaw/pull/8638) 为 `execute_shell_command` 增加可选 `title` 参数（意图标题） | ⭐⭐ 中高。#8638 是 #8612 的直接回应，但 #8650 的视觉统一尚未见对应 PR。 |
| **#8521** 希望提供旧版 UI 切换按钮、优化模型切换入口 | 未见直接 PR；PR [#8631](https://github.com/agentscope-ai/QwenPaw/pull/8631) 优化了浏览器标签标题与未读标记，属相邻的交互优化 | ⭐ 低—中。属产品级取舍，需产品决策。 |
| 嵌套（分类化）技能目录 | ✅ PR [#8178](https://github.com/agentscope-ai/QwenPaw/pull/8178)（首次贡献者，XXL，已挂 30 天） | ⭐⭐ 中。功能明确、向后兼容（扁平布局保持可用），但评审周期偏长。 |
| 本地 Whisper SDK 插件化 | ✅ PR [#8431](https://github.com/agentscope-ai/QwenPaw/pull/8431)（XXXL） | ⭐ 中低。体量大、依赖框架生命周期改造。 |
| Ollama `num_ctx` 上下文窗口修正 | ✅ PR [#8236](https://github.com/agentscope-ai/QwenPaw/pull/8236)（已挂 27 天） | ⭐⭐ 中。修复本地模型被误判为 128k 云窗口的问题。 |

**路线图判断**：v2.3.0 正式版正在收尾（#8542 发布说明、#8643 验证任务并行），主力方向是**渠道/桌面端稳定性 + 本地模型能力（MLX / GPU / Whisper）**；交互一致性属增量打磨，短期内以「小步 PR」形态穿插推进。

---

## 7. 用户反馈摘要

**😤 不满意 — 桌面端与打包链路**
- @justsavo（#8644）：打包构建后**所有**渠道插件都不可用，控制台一直显示 `validation pending` — 这是最伤信任的「一票否决」体验。
- @3chet（#8595）：官方 `qwenpaw-creator` 插件在 UI 与 CLI 两条路径上都装不上，错误信息 `No package metadata was found` 缺乏可操作性。
- @ArsenicumAlbum（#8616）：2.2.2 在同一台机器上正常，2.3.0-beta.1 直接启动失败并 AppHang — 明确的**版本回归**。
- @mylover19821003（#8627）：Windows 长路径 + 微信渠道双重卡死。

**😕 不满意 — 交互与可读性**
- @perm2580（#8521）：新 UI 「大量空闲区域」「切换模型非常麻烦」「整体反应迟缓」，并明确要求**旧版 UI 切换按钮**；同时 Ctrl+C 需多次才成功，Chrome/Edge 均可复现。
- @sslnv88（#8650 / #8612）：长任务中思考块与工具卡片视觉风格割裂，左侧边缘一直在跳；执行类工具「看不出在做什么」。
- @dxww123（#8629）：超限图片被反复回传，产生**实际 Token 浪费**，且失败重试后仍保留误导性成功文案。

**🙂 认可与正向场景**
- 同一用户在 #8612 中先肯定了多数工具已具备「一句人话」的可读性（⏱ 获取当前时间、📄 阅读 MEMORY.md、📁 文件匹配等），说明工具卡片可读性改造方向被认可，问题只集中在**执行类**工具。
- @LXD-8（#8646）认可 QwenPaw Local 的封装，但指出「控制台一直显示 CPU is used by default，实际 macOS 运行时已含 Metal」— 属于**信息透明度**问题，而非能力缺失。

**典型使用场景画像**
1. **Windows 桌面用户**（企业/个人）：LTSC、长路径、中文路径、GBK 编码文件、中文区域系统 — 是当前 Bug 报告最密集的群体。
2. **IM 渠道部署者**：飞书 / 微信 / QQ / 元宝，关注稳定性与消息完整性（尤其是纯媒体消息）。
3. **本地模型玩家**：Apple Silicon / Ollama / llama.cpp，关注 GPU offload 可见性与上下文窗口正确性。
4. **长任务 Agent 用户**：关注工具调用可读性与步骤视觉连续性。

---

## 8. 待处理积压（提醒维护者关注）

| 条目 | 已开启时长 | 关注理由 |
|---|---|---|
| 🔴 [#8236](https://github.com/agentscope-ai/QwenPaw/pull/8236) `fix(ollama): size context window from num_ctx`（Under Review, XL） | **27 天** | 已进入 Under Review 却长期停滞；直接影响所有本地 Ollama 用户的上下文正确性。 |
| 🔴 [#8234](https://github.com/agentscope-ai/QwenPaw/pull/8234) `fix(tools): decode GBK/CP936`（Under Review, XXL） | **27 天** | 中文 Windows 用户「静默丢字节」的数据完整性问题，与今日多条 Windows Bug 形成同类簇，建议一并排期。 |
| 🟠 [#8178](https://github.com/agentscope-ai/QwenPaw/pull/8178) `feat(skills): nested skill directories`（首次贡献者, XXL） | **30 天** | 长期挂起且为首次贡献者 PR，存在贡献者流失风险；功能向后兼容、边界清晰，建议尽快给出评审结论。 |
| 🟠 [#8431](https://github.com/agentscope-ai/QwenPaw/pull/8431) `feat: local Whisper as SDK plugin`（XXXL） | **15 天** | 体量大、影响插件框架生命周期，需明确是否进入 2.3.x。 |
| 🟠 [#8512](https://github.com/agentscope-ai/QwenPaw/pull/8512) `fix(providers): read gateway-reported status`（S） | **11 天** | 小体量、低风险，与 #8615 同属 provider 错误码识别簇，建议合并处理。 |
| 🟡 [#8542](https://github.com/agentscope-ai/QwenPaw/pull/8542) `chore: update release note for v2.3.0`（M） | **8 天** | 与 v2.3.0 正式版发布直接绑定，需在 GA 前落地。 |
| 🟡 [#8615](https://github.com/agentscope-ai/QwenPaw/pull/8615) `fix(providers): recognize gateway context-overflow 400s`（Under Review, XS） | **3 天** | 极小改动，可与 #8512 合批评审。 |
| 🟡 [#8651](https://github.com/agentscope-ai/QwenPaw/issues/8651) QQ 渠道丢弃纯图片消息 | **0 天（新）** | 消息静默丢失属数据完整性问题，虽为新报但建议尽早定性。 |
| 🟡 [#8603](https://github.com/agentscope-ai/QwenPaw/issues/8603) 自定义 Provider 下 `run_code` 空参 | **4 天** | 影响所有 OpenAI 兼容第三方渠道，属「适配器鲁棒性」类共性缺陷，尚无 PR。 |

---

## 📊 项目健康度总评

| 维度 | 评价 | 依据 |
|---|---|---|
| **活跃度** | ⭐⭐⭐⭐⭐ 极高 | 24h 内 50 PR + 17 Issue + 1 Release，多人并行（@Luohh5、@LXD-8、@sslnv88、@txohyeah 等） |
| **响应速度** | ⭐⭐⭐⭐ 良好 | #8644 → #8653 当日发现当日提交修复 |
| **发布节奏** | ⭐⭐⭐⭐ 稳健 | Beta 周期内第 3 个预发布，Release Duty 自动化验证就位 |
| **稳定性风险** | ⭐⭐ 偏高 | 桌面端打包 / Windows 平台 / 渠道插件三条线同时存在 P0-P1 缺陷，且部分尚无 fix PR |
| **积压治理** | ⭐⭐ 待改善 | 2 个 Under Review PR 挂起 27 天，1 个首次贡献者 PR 挂起 30 天 |

**建议维护者优先级**：① 在 v2.3.0 GA 前闭环 #8644 / #8595 / #8616 三个桌面端阻塞项；② 对 #8234 / #8236 两个 27 天 Under Review 的 PR 给出明确结论；③ 集中回应 UI 体验簇（#8521 / #8612 / #8650），这已是社区情绪最集中的抱怨源。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目日报 · 2026-11-10

> 数据窗口：2026-11-09 → 2026-11-10（UTC）｜数据源：GitHub API 快照（Issues/PR 各 500 条抽样）

---

## 1. 今日速览

- **极致高活跃日**：24 小时内 Issues 更新 500 条（新开/活跃 424、关闭 76），PR 更新 500 条（待合并 416、合并/关闭 84），新发布 **v0.23.1**，一次性 rollup 自 v0.23.0 以来约 **618 个已合并 PR**。
- **健康度信号两极**：合并侧表现强劲（618 PR 进入稳定版、84 PR 今日落地），但社区侧积压压力显著——Issue 新开/关闭比约 **5.6:1**，PR 待合并/合并比约 **5:1**，审核吞吐是当前主要瓶颈。
- **讨论焦点**：统一网关（#106742）合并后的遗留问题、智能审批（smart approval）安全事件、安装/更新失败恢复路径，是今日评论量最高的三条主线。
- **社区扩张**：插件目录生态持续扩容（VRM 虚拟形象、Draftroom 写作伴侣、job-hunt-tracker 等），并出现 MCP surface 转发、音频转写等能力补齐型 PR。

**活跃度评估：极高（Very High）**。发布节奏、PR 吞吐、社区参与度均处历史高位；主要风险在审核带宽与安全类回归的收敛速度。

---

## 2. 版本发布

### v0.23.1（Patch Release，2026-11-09）

- **定位**：补丁版本，将自 v0.23.0 以来约 **618 个已合并 PR** 汇总为一个稳定版本，覆盖 GitHub Release（CLI 与安装器）、Microsoft Store 应用、Docker 镜像与 Hermes Cloud。
- **说明来源**：完整精选发行说明将随 **v0.24.0** 一并发布；本 tag 本身未附逐条 changelog。
- **破坏性变更**：Release notes **未声明**破坏性变更，按语义化版本属补丁级。但需注意——**618 PR 的体量远超常规 patch**，实质内容接近一次 minor 的累积，建议升级前关注 v0.24.0 的完整说明。
- **迁移注意事项**：
  1. 由于完整说明延后，生产环境建议先在预发环境验证，尤其是 **gateway、cron、plugins、desktop** 四个受统一网关改动影响的组件。
  2. 与 #143547（统一网关合并后遗留问题）相关的场景，升级前建议先确认相关 workaround 是否仍然适用。
  3. Docker/Hermes Cloud 用户应同步核对沙箱镜像标签（相关 CI 修复见 #152401）。

链接：https://github.com/NousResearch/hermes-agent/releases

---

## 3. 项目进展

### 今日已合并/关闭（共 84 条，择要）

| PR | 状态 | 内容 |
|---|---|---|
| [#149952](https://github.com/NousResearch/hermes-agent/pull/149952) | CLOSED | **插件目录 15 个 re-pins**：将官方与 labs 插件目录指针前移到各仓库最新 main，使目录安装用户获得当日修复（涉及插件、浏览器工具、MCP、Copilot provider、鉴权等）。 |
| [#148533](https://github.com/NousResearch/hermes-agent/pull/148533) | CLOSED | **TTS 修复**：Piper 合成产出零 chunk 时避免 `wave.Error`（修复 #148502）。 |

> 注：84 条合并/关闭中，其余多为常规修复与依赖更新；PR 评论数在当前快照中缺失，无法按讨论热度进一步排序。

### 高价值在途 PR（今日更新，推进方向明确）

- **安全收敛**：[#151019](https://github.com/NousResearch/hermes-agent/pull/151019)（P2）——设置 `allow_admin_from` 后，非管理员仍可通过输入 `always`、点击 Allow 或斜杠命令绕过审批；该 PR 封堵三条旁路，并阻止 `always` 写入跨 profile 白名单。与 #141346、#74078 同属审批安全主线。
- **网关稳定性**：
  - [#151729](https://github.com/NousResearch/hermes-agent/pull/151729)（P2）——回复中图片 URL 不再整幅读入内存（受 `gateway.max_inbound_media_bytes` 约束）；Telegram 语音消息不再因双路径缓存被重复转写计费。
  - [#151872](https://github.com/NousResearch/hermes-agent/pull/151872)（P2）——排队跟进消息前清理进度气泡；`/model --once` 后附加身份说明；`channel_overrides` 正确显示固定模型。
  - [#152106](https://github.com/NousResearch/hermes-agent/pull/152106)——Telegram `token_in_use_elsewhere` 采用有界退避重连，随后上报明确状态。
- **桌面端**：[#152407](https://github.com/NousResearch/hermes-agent/pull/152407)（本地重建版本号从 `0.0.0` 修正为真实版本，关联 #91115 类问题）；[#152138](https://github.com/NousResearch/hermes-agent/pull/152138)（Android PWA 手势区适配）。
- **能力补齐**：[#152400](https://github.com/NousResearch/hermes-agent/pull/152400)（附件音频在 Desktop/TUI/CLI/gateway 均以转写文本抵达 agent，`stt.transcribe_audio_files` 开关）；[#152405](https://github.com/NousResearch/hermes-agent/pull/152405)（memory provider 的 `_ProviderCollector` 转发 `call_mcp`，打通 MCP 内存读取）。
- **架构重构**：[#152161](https://github.com/NousResearch/hermes-agent/pull/152161)、[#152162](https://github.com/NousResearch/hermes-agent/pull/152162)——将 gateway 的 turn 时间戳、溢出队列、过期审批、`/model` 会话覆盖统一收敛到 `SessionState`，删除四类 side-list，属统一网关后续的结构性治理。
- **测试稳定性**：[#109935](https://github.com/NousResearch/hermes-agent/pull/109935)——六个 gateway/agent/tools 测试 hermetic 化，不触碰生产代码。

**整体推进评估**：今日项目在 **安全审批、网关稳定性、桌面可用性、生态目录** 四条主线上均有实质推进；618 PR 的稳定化发布 + 84 PR 当日落地，构成本周最强交付日。统一网关的结构性收尾（#152161/#152162）是后续质量的关键前置。

---

## 4. 社区热点

### 讨论最活跃 Issues

| Issue | 评论 | 关注点 |
|---|---|---|
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（P2，OPEN） | 60 | **统一网关合并后遗留问题**：10 月 14 日 #106742 将本地对话统一到单一 gateway 进程，CLI、TUI、Desktop、API、编辑器、消息机器人、cron、看板、群聊全部改走该进程，由此产生一系列 post-merge 问题。这是当前**架构级技术债的总入口**。 |
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（P3，OPEN，blocked/upstream） | 60 | **API 创建 PR 权限错误**：fork 账号下的 `CreatePullRequest` 权限失败（issue 创建与 fork PR 仍可用），已标记为上游阻塞。属外部依赖问题。 |
| [#141346](https://github.com/NousResearch/hermes-agent/issues/141346)（P3，OPEN，security） | 38 | **智能审批误批导致数据丢失**：macOS 上 smart 模式下自动批准 `osascript`，驱动用户运行中的 PowerPoint 关闭未保存文稿并删除导出，**不可恢复**。高情感强度、高安全权重。 |
| [#129455](https://github.com/NousResearch/hermes-agent/issues/129455)（P2，OPEN，test） | 28 | **默认安装下测试套件大面积失败**：import-time PM activation 触发 `home_io_guard`，影响默认安装（checkout 位于 `$HERMES_HOME`）用户的测试可信度。 |
| [#97065](https://github.com/NousResearch/hermes-agent/issues/97065)（P3，OPEN） | 27 | **Keet gateway setup 崩溃**（`_n()` 缺 `config` 参数），Windows 11 + v0.20.6 环境。 |
| [#125437](https://github.com/NousResearch/hermes-agent/issues/125437)（P1，OPEN） | 19 | **更新失败致半应用安装**：Desktop 启动即关、gateway venv 缺 `pydantic_core`、git 处于 partial-clone 状态，**无产品内恢复路径**，本周 Discord 15 条相关讨论。 |

### 讨论最活跃 PR（评论数缺失，按覆盖面择要）

- [#151019](https://github.com/NousResearch/hermes-agent/pull/151019) 审批权限旁路封堵（安全 P2）
- [#151729](https://github.com/NousResearch/hermes-agent/pull/151729) 网关媒体与 Telegram 语音计费
- [#149952](https://github.com/NousResearch/hermes-agent/pull/149952) 插件目录 15 个 re-pins（已关闭）

**诉求分析**：社区讨论已从"功能是否有"转向"**统一架构后是否稳、安全边界是否可靠、升级失败能否自愈**"。统一网关是多数 P2 问题的共同根因，属于典型的"大重构后的长尾收敛期"。

---

## 5. Bug 与稳定性

### P1（最高优先级）

| Issue | 问题 | Fix PR |
|---|---|---|
| [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) | 更新失败留在半应用状态，无内建恢复；5 种机制、本周 15 条 Discord 讨论 | 未见直接 fix PR；与 #152407（桌面版本号）等周边修复相关但非根治 |
| [#122529](https://github.com/NousResearch/hermes-agent/issues/122529) | cron 外部 worker 的 `PYTHONPATH` 缺 venv site-packages，`ModuleNotFoundError: ruamel` | 未见明确 fix PR |

### P2（重点）

| Issue | 问题 | Fix PR |
|---|---|---|
| [#143720](https://github.com/NousResearch/hermes-agent/issues/143720) | Discord 线程完成唤醒每 60s 被拒 `admission_conflict`，尝试上限不触发、`notify-mode=off` 无效（单日志 494 次） | 未见明确 fix PR |
| [#139347](https://github.com/NousResearch/hermes-agent/issues/139347) | 有界 hosted-room transcript 驱逐源用户后仍保留其回复与 settled 事件，导致 `DiscussionValidationError` | 未见明确 fix PR |
| [#136486](https://github.com/NousResearch/hermes-agent/issues/136486) | `reasoning` 与 `reasoning_content` 并列重放触发 HTTP 400 `duplicate field`，字段拒绝学习不生效 → 每轮回退 | 未见明确 fix PR |
| [#99943](https://github.com/NousResearch/hermes-agent/issues/99943) | 云端 provider 的 compressor window 被 `model.ollama_num_ctx` 错误钳制（1M → 65,536） | 同域 PR [#66635](https://github.com/NousResearch/hermes-agent/pull/66635)（本地压缩超时本地化）相关但非同一问题 |
| [#79357](https://github.com/NousResearch/hermes-agent/issues/79357) | gateway 模式下 `idle_compact_after_seconds` 永不触发（watchdog 重置时间戳） | 未见明确 fix PR；#152161 的 SessionState 收敛可能间接受益 |
| [#84207](https://github.com/NousResearch/hermes-agent/issues/84207) | 工具调用中断（exit 130）无任何用户反馈，无法区分主动停止与客户端断连 | 未见明确 fix PR |
| [#140222](https://github.com/NousResearch/hermes-agent/issues/140222) | 带 monitor 的 agent cron 任务每次 tick 建空会话 | 未见明确 fix PR |
| [#141988](https://github.com/NousResearch/hermes-agent/issues/141988) | `process_manage` 分页后台输出时 `TypeError: slice indices` | 未见明确 fix PR |
| [#68128](https://github.com/NousResearch/hermes-agent/issues/68128) | Windows 无 breakaway job object 下 WhatsApp bridge 启动 `WinError 5` | 未见明确 fix PR |
| [#122402](https://github.com/NousResearch/hermes-agent/issues/122402) | Ubuntu 24.04 历史接管构建 `python-olm` 缺 clang++ | 未见明确 fix PR |
| [#126524](https://github.com/NousResearch/hermes-agent/issues/126524) | Desktop 助手回复重复渲染（DB 单行）、会话列表同样双渲染 | 未见明确 fix PR |
| [#62726](https://github.com/NousResearch/hermes-agent/issues/62726) | Dashboard 跨标签会话串扰 + `/new` 挂起需整体重启容器 | 未见明确 fix PR |
| [#70445](https://github.com/NousResearch/hermes-agent/issues/70445) | Desktop 远程/VPS 会话加载慢、切走即取消、内容闪回 | 未见明确 fix PR |
| [#91115](https://github.com/NousResearch/hermes-agent/issues/91115) | macOS 每次更新后 keychain 重新授权（ad-hoc cdhash 变化） | [#152407](https://github.com/NousResearch/hermes-agent/pull/152407) 相关（本地重建版本号），但 keychain ACL 问题未见根治 |

### P3（安全与可用性）

- [#141346](https://github.com/NousResearch/hermes-agent/issues/141346)（安全，smart approval 误批致数据丢失）——与 [#151019](https://github.com/NousResearch/hermes-agent/pull/151019)、[#74078](https://github.com/NousResearch/hermes-agent/issues/74078)（审批守卫旁路）同域，安全边界是当前最值得投入的方向。
- [#97065](https://github.com/NousResearch/hermes-agent/issues/97065) Keet setup 崩溃；[#123926](https://github.com/NousResearch/hermes-agent/issues/123926) 插件 `_evict_modules` 遍历 `sys.modules` 时字典变更导致随机插件静默丢失；[#47954](https://github.com/NousResearch/hermes-agent/issues/47954) honcho memory provider 竞态警告；[#45983](https://github.com/NousResearch/hermes-agent/issues/45983) 技能密集型配置的聊天循环。
- [#143364](https://github.com/NousResearch/hermes-agent/issues/143364) **已关闭**：多路复用二级 profile 的中途进度/后台评审通知误经主 bot 送达——本日已修复关闭，属正向信号。

**稳定性小结**：P1 两项（更新自愈、cron venv）均缺直接 fix PR，是**最高风险敞口**；P2 中统一网关相关（#143720、#79357、#62726）与压缩域（#99943）为长尾主战场。安全域今日有 #151019 在途，方向正确但需加快覆盖 #141346 这类"误批致损"场景。

---

## 6. 功能请求与路线图信号

### 生态与插件（高概率纳入 v0.24.x 目录更新）

- [#152387](https://github.com/NousResearch/hermes-agent/pull/152387) `hermes-psfn-avatar`：3D VRM 0.x/1.0 + Holo-Rig VTuber 悬浮头像，支持 Desktop 与 Web Dashboard，要求 Hermes ≥ 0.21.5。
- [#152383](https://github.com/NousResearch/hermes-agent/pull/152383) **Draftroom** 写作伴侣：`/blog` 开草稿，选中文本改写以 Original/Suggested/Diff 提案呈现，人审 Accept/Reject。
- [#151314](https://github.com/NousResearch/hermes-agent/pull/151314) **job-hunt-tracker**：单文件目录条目，会话内记录投递（公司/职位/渠道/地点/状态/投递日期/跟进）。

### 核心能力（需维护者决策，存在不确定性）

- [#90186](https://github.com/NousResearch/hermes-agent/pull/90186) 审批决策 **JSONL 审计日志**（opt-in）——与安全主线高度契合，若与 #151019 协同，有望成为审批可观测性的基础件。
- [#121178](https://github.com/NousResearch/hermes-agent/pull/121178) `/btw` **浮动侧聊天窗**——交互形态类改动，需产品判断。
- [#152400](https://github.com/NousResearch/hermes-agent/pull/152400) 附件音频**默认转写**（`stt.transcribe_audio_files`）——补齐"无转写工具 profile 听不到语音"的能力缺口。
- [#152405](https://github.com/NousResearch/hermes-agent/pull/152405) memory provider 转发 **MCP surface**——为 MCP 读取型内存 provider 打开公共入口。

### 架构治理（长期路线）

- [#78645](https://github.com/NousResearch/hermes-agent/issues/78645) `agent/context_compressor.py` **6,789 行** god-file 拆分
- [#78642](https://github.com/NousResearch/hermes-agent/issues/78642) `tools/mcp_tool.py` **7,230 行** god-file 拆分
- [#84834](https://github.com/NousResearch/hermes-agent/issues/84834) Webhook Feature Package 元 issue（5×2×3 图门控修复）

**判断**：生态目录类 PR 大概率随 v0.24.x 陆续合并；核心能力类中 **#90186（审计日志）与 #152405（MCP 转发）** 与现有安全/插件主线协同度高，纳入下一版本的可能性较大。God-file 拆分属"needs-decision"，短期难有进展。

---

## 7. 用户反馈摘要

- **"升级是最大的不稳定源"**：P1 #125437 汇聚 5 种失败机制、本周 15 条 Discord 讨论，用户明确诉求是**产品内可恢复路径**，而非手打修复配方。这是当前满意度最大的负向来源。
- **"智能审批不等于安全"**：#141346 的不可恢复数据丢失（关闭未保存 PowerPoint 并删除导出）在安全语义上冲击很大；用户期望 smart 模式下的**破坏性命令需显式确认**，而非按命令白名单一刀切。
- **"统一网关有收益也有代价"**：#143547 的长尾（Desktop 连接、会话、压缩、TUI 网关、profile 隔离）让多平台用户感到"能力统一了，边界模糊了"；#143364（二级 profile 通知串到主 bot）虽已关闭，但暴露的**profile 隔离**问题值得系统性复查。
- **"本地模型体验仍有断层"**：#87697（本地 Ollama 流约 1.5s 被取消）、#99943（云端 1M 窗口被 Ollama 配置钳制）反映**云端/本地共存的配置语义不清晰**，用户难以判断配置项作用域。
- **"桌面端远程场景体验不佳"**：#70445（远程/VPS 加载 20s+、切走即取消）、#126524（回复双渲染）是 Desktop 重度用户的常见抱怨，直接影响日常留存。
- **正向信号**：#148533（TTS 零 chunk 崩溃）当日修复关闭；#149952 插件目录 15 项 re-pin 让目录用户当日拿到修复，说明**分发链路响应速度在改善**。

---

## 8. 待处理积压（建议维护者关注）

### 长期未响应的重要 Issue

| Issue | 年龄（相对 2026-11-10） | 评论 | 为何值得关注 |
|---|---|---|---|
| [#45983](https://github.com/NousResearch/hermes-agent/issues/45983) 聊天循环（P3） | 约 5 个月（2026-06-14） | 13 | 技能密集型 orchestrator 配置的核心可用性问题，长期无结论 |
| [#47954](https://github.com/NousResearch/hermes-agent/issues/47954) honcho 竞态警告（P2） | 约 5 个月（2026-06-17） | 12 | memory provider 启动竞态，影响首会话体验 |
| [#62726](https://github.com/NousResearch/hermes-agent/issues/62726) Dashboard 跨标签串扰（P2） | 约 4 个月（2026-07-11） | 14 | 会话隔离类问题，修复成本可能被低估 |
| [#68128](https://github.com/NousResearch/hermes-agent/issues/68128) WhatsApp WinError 5（P2） | 约 4 个月（2026-07-20） | 20 | Windows 平台消息通道，评论数高但无 fix |
| [#70445](https://github.com/NousResearch/hermes-agent/issues/70445) Desktop 远程加载慢（P2） | 约 3.5 个月（2026-07-24） | 13 | 远程/VPS 场景刚需 |
| [#74078](https://github.com/NousResearch/hermes-agent/issues/74078) 审批守卫旁路（P2） | 约 3.5 个月（2026-07-29） | 13 | 与 #141346、#151019 同域，安全债 |
| [#84834](https://github.com/NousResearch/hermes-agent/issues/84834) Webhook 元 issue（P3） | 约 3 个月（2026-08-12） | 25 | 评论高但为 tracker，需明确 owner 与里程碑 |
| [#97065](https://github.com/NousResearch/hermes-agent/issues/97065) Keet setup 崩溃（P3） | 约 2.5 个月（2026-08-28） | 27 | 评论数高，社区参与强，修复路径应已清晰 |

### 长期挂起的 PR

| PR | 年龄 | 说明 |
|---|---|---|
| [#66635](https://github.com/NousResearch/hermes-agent/pull/66635) 本地压缩超时本地化 | 约 4 个月（2026-07-18） | 与 #99943 同域，若合并可缓解压缩域部分症状 |
| [#90186](https://github.com/NousResearch/hermes-agent/pull/90186) 审批审计日志 | 约 3 个月（2026-08-19） | 安全主线基础件，建议与 #151019 合并节奏对齐 |
| [#109935](https://github.com/NousResearch/hermes-agent/pull/109935) 测试 hermetic 化 | 约 2 个月（2026-09-13） | 低风险、纯测试，长期未合影响 CI 可信度 |
| [#121178](https://github.com/NousResearch/hermes-agent/pull/121178) `/btw` 浮动窗口 | 约 1.5 个月（2026-09-24） | 交互改动，需产品决策，不宜无限期挂着 |

### 积压结构性提醒

- **发布时间差**：#131859 已 `blocked/upstream` 两个月，建议建立"外部阻塞"定期复核机制，避免长期静默。
- **tracker 化**：#84834 这类元 issue 评论高但缺少明确关闭条件，建议公开里程碑与子项进度。
- **PR 审核带宽**：416:84 的待合并/合并比是当前最突出的运营指标，建议评估 review 轮值或引入 area owner 分流（尤其 gateway、desktop、plugins 三大高负载域）。

---

### 一句话结论

**v0.23.1 的 618 PR 稳定化发布与 84 PR 当日落地，印证 hermes-agent 处于高速交付期；但统一网关长尾、审批安全误批、更新失败自愈三项是当前健康度的最大扣分项，且均缺乏直接 fix PR——建议下一周期将审核带宽优先向这三条主线倾斜。**

---

*报告基于 2026-11-10 的 Issues/PR 抽样快照生成；PR 评论数字段在本次数据中缺失，相关排序以覆盖面与标签层级替代。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报

**日期：2026-11-10** ｜ 数据来源：GitHub `AstrBotDevs/AstrBot`

---

## 1. 今日速览

- 今日共 **10 条 Issue 更新，全部为新开/活跃，关闭 0 条**；**21 条 PR 更新，其中 18 条待合并、3 条已关闭/合并**；无新版本发布。
- 社区讨论集中在 **GPT-5 推理模型兼容性**（#7409，9 条评论）与**插件新版本检测失效**（#11050，6 条评论），两者均直接影响核心使用链路。
- 维护端关闭了 3 条 PR：shell blocklist 误杀修复（#11045）、WebUI 隐藏配置项渲染修复（#8169）、设置页滚动条间距打磨（#11070）。
- 项目呈 **“高活跃、低吞吐”** 状态：PR 关闭率约 **14.3%**（3/21），Issue 关闭率 **0%**，且存在多条挂起超过 1 个月甚至 6 个月的 PR，维护带宽是当前主要瓶颈。
- 值得注意的积极信号：cron 定时间隔修复 PR #10373 今日仍在更新，配置折叠（#11067）、LLM 工具默认权限（#10923）等功能型 PR 已进入待合并队列。

---

## 2. 版本发布

今日无新版本发布。根据 Issue 中用户环境信息，社区当前主要使用 **v4.29.4**，另有用户仍停留在 **v4.22.3** 并报告 GPT-5 系列兼容问题。

---

## 3. 项目进展

今日关闭/合并的 3 条 PR：

| PR | 内容 | 影响 |
|---|---|---|
| [#11045](https://github.com/AstrBotDevs/AstrBot/pull/11045) | `fix(computer): parse rm targets in local shell blocklist`，修复 #11039 | 将 shell blocklist 从“原始子串匹配”改为解析 `rm` 目标路径，允许 `/tmp`、`/var/tmp` 及工作目录内的合法清理，同时保留对危险路径的拒绝。安全策略从“一刀切”走向“按目标判定”。 |
| [#8169](https://github.com/AstrBotDevs/AstrBot/pull/8169) | `fix(dashboard): render previously hidden system config options and subtitles`，修复 #10405 | 恢复 WebUI 中被隐藏的系统配置项与副标题渲染，`disable_metrics` 等配置重新可见，降低用户“配置存在但找不到”的困惑。该 PR 自 2026-05-13 挂起，今日关闭。 |
| [#11070](https://github.com/AstrBotDevs/AstrBot/pull/11070) | `fix(dashboard): add spacing beside the settings scrollbar` | 设置页内容与滚动条之间增加 12px 内边距，纯 UI 打磨，创建当天关闭。 |

**整体推进评估**：今日净关闭 3 条 PR、0 条 Issue。修复集中在 WebUI 渲染与 shell 安全策略两个局部面，核心链路的 cron（#10373）、provider 空输出（#10925）、会话锁（#10960）等修复仍处于待合并状态，项目今日“向前迈进”幅度有限，更多是存量问题的收尾与打磨。

---

## 4. 社区热点

按评论数与影响面排序：

1. **[#7409](https://github.com/AstrBotDevs/AstrBot/issues/7409) GPT-5 系列推理模型报 “OpenAI completion has no usable output”（9 条评论，2026-04-07 创建，仍 OPEN）**
   - 用户升级至 v4.22.3 后，`gpt-5.3-codex`、`gpt-5.4` 在 Provider 测试中返回 `content=None`、`tool_calls=None`、`reasoning_content=None`，仅有少量 `reasoning_tokens`，被 AstrBot 判定为无可用输出。此前 v4.20.0 报的是“API 返回的 completion 为空”。
   - **诉求**：对 reasoning 模型的返回结构做兼容，不能仅以 `content`/`tool_calls` 判断有效性。该问题已挂起 7 个月、9 条评论，是当前最长尾的高优先级兼容性议题。

2. **[#11050](https://github.com/AstrBotDevs/AstrBot/issues/11050) 插件无法检测到有新版本（6 条评论）**
   - 插件市场新版本已审核通过，但客户端不提示更新。
   - **诉求**：插件分发链路中的版本比对/缓存刷新存在缺陷，直接影响插件作者发布新版本后的用户触达，属于生态健康度问题。

3. **[#10363](https://github.com/AstrBotDevs/AstrBot/issues/10363) 定时间隔被转换为不等价 Cron（3 条评论，今日仍有更新）**
   - “每 60 分钟”生成 `*/59 * * * *`，实际 59/1 分钟交替；“每 24 小时”生成 `0 */23 * * *`，实际 23/1 小时交替。
   - **诉求**：间隔语义应保持固定间隔，不应静默截断或跨周期缩短。已有对应修复 PR [#10373](https://github.com/AstrBotDevs/AstrBot/pull/10373)（改用 APScheduler `IntervalTrigger` + UTC 锚点），今日仍在更新，是最接近落地的核心修复。

4. **[#8037](https://github.com/AstrBotDevs/AstrBot/issues/8037) /未知命令不再唤醒 LLM（3 条评论，1 👍）**
   - 用户给出 `waking_check/stage.py` 的具体改法，希望未知命令不触发 LLM 调用。
   - **诉求**：降低误触发带来的 token 消耗与响应噪声，属于核心 pipeline 的成本/体验优化。

5. **[#11058](https://github.com/AstrBotDevs/AstrBot/issues/11058) 插件配置项支持折叠（3 条评论）**
   - 当前插件配置页完全平铺，字段多的插件被拉成超长页面。对应 PR [#11067](https://github.com/AstrBotDevs/AstrBot/pull/11067) 已于同日提交，响应速度较快。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 高严重度

| Issue | 问题 | 状态 / Fix PR |
|---|---|---|
| [#11063](https://github.com/AstrBotDevs/AstrBot/issues/11063) | `active_agent` 类型 cron 任务在运行中调用 `future_task` 删除自身时协程死锁，`cron_jobs` 行永久停在 `status='running'`，任务不再被调度；事件循环本身未死。 | **无 fix PR**。属于定时任务状态机缺陷，可能导致用户自动化任务“静默死亡”。 |
| [#7409](https://github.com/AstrBotDevs/AstrBot/issues/7409) | GPT-5 推理模型返回仅有 `reasoning_tokens`，`content`/`tool_calls`/`reasoning_content` 均为空，被判定无可用输出，Provider 不可用。 | **无直接 fix PR**。[#10925](https://github.com/AstrBotDevs/AstrBot/pull/10925) 为 `skills_like` 工具重查询增加空补全重试，方向相关但未覆盖该场景。 |
| [#11050](https://github.com/AstrBotDevs/AstrBot/issues/11050) | 插件市场新版本审核通过后，客户端检测不到更新。 | **无 fix PR**。影响插件生态更新分发。 |

### 🟠 中严重度

| Issue | 问题 | 状态 / Fix PR |
|---|---|---|
| [#10363](https://github.com/AstrBotDevs/AstrBot/issues/10363) | 定时间隔被错误转换为 Cron 步长，60 分钟变 59/1、24 小时变 23/1、40 分钟变 40/20。 | 已有 [#10373](https://github.com/AstrBotDevs/AstrBot/pull/10373) 待合并（2026-10-04 创建，今日仍更新）。 |
| [#11039](https://github.com/AstrBotDevs/AstrBot/issues/11039) | shell blocklist 以原始子串拒绝任何含 `rm -rf` 的命令，误杀 `/tmp` 下的合法清理。 | 修复 PR [#11045](https://github.com/AstrBotDevs/AstrBot/pull/11045) 已关闭（大概率已合并），但 Issue 仍 OPEN，建议验证后关闭。 |

### 🟡 低严重度

| Issue | 问题 | 状态 / Fix PR |
|---|---|---|
| [#11060](https://github.com/AstrBotDevs/AstrBot/issues/11060) | 文档声明 `log_base` 支持 `1.0–10.0`，但 resolver 会将 `1.0` 静默替换为 `2.6`，文档与实际行为不一致。 | 已有 [#11064](https://github.com/AstrBotDevs/AstrBot/pull/11064) 待合并，选择从文档范围中排除 `1.0`。 |
| [#11066](https://github.com/AstrBotDevs/AstrBot/issues/11066) | TTS 语音被自动存储为文件，无开关、无缓存上限，长期运行后清理困难。 | **无 fix PR**，属体验/运维问题。 |

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 对应 PR | 纳入下一版本可能性 |
|---|---|---|---|
| 插件配置分组折叠 | [#11058](https://github.com/AstrBotDevs/AstrBot/issues/11058) | [#11067](https://github.com/AstrBotDevs/AstrBot/pull/11067) 已开，新增 `collapsed` schema 标志 | **较高**。实现完整、当日响应，属 WebUI 体验改进。 |
| LLM 工具声明默认权限 | — | [#10923](https://github.com/AstrBotDevs/AstrBot/pull/10923)，为 `@filter.llm_tool` 增加默认权限声明，Closes #8947 | **较高**。与现有 `@filter.permission_type` 对齐，补齐插件工具的安全能力。 |
| 腾讯元宝 Web Search Provider | — | [#10745](https://github.com/AstrBotDevs/AstrBot/pull/10745)，支持多 API Key 故障转移 | **中高**。Provider 生态扩展，Closes #10654。 |
| 插件文件配置图片预览 | — | [#10596](https://github.com/AstrBotDevs/AstrBot/pull/10596)，复用插件鉴权做字段级图片预览 | **中**。纯增强，Closes #10595。 |
| 内存优化默认参数 | [#11069](https://github.com/AstrBotDevs/AstrBot/issues/11069) | 无 PR | **中**。用户给出生产实测：`MALLOC_ARENA_MAX=2` + BLAS 单线程，RSS 从 1008 MiB 降至 672 MiB（−33%）。数据详实，若维护者采纳可直接改镜像/compose 默认值。 |
| TTS 语音存储开关/缓存上限 | [#11066](https://github.com/AstrBotDevs/AstrBot/issues/11066) | 无 PR | **中低**。实现成本低，但需设计配置项与清理策略。 |
| 未知命令不唤醒 LLM | [#8037](https://github.com/AstrBotDevs/AstrBot/issues/8037) | 无 PR，但用户附代码建议 | **中低**。涉及核心 pipeline 行为变更，需评估兼容性。 |
| System One 布尔 criteria 兼容 | — | [#11062](https://github.com/AstrBotDevs/AstrBot/pull/11062)，为 `DecisionBooleanQuestion` 增加可选 `criteria` | **中**。修复第三方兼容端点的 HTTP 400。 |

**路线图信号**：近期 PR 明显向三个方向聚集——**Agent/工具链可靠性**（#10463、#10923、#11048、#10965）、**Provider 兼容与扩展**（#8050、#10745、#11062、#10925）、**WebUI 配置体验**（#11067、#10596、#11064）。可预期下一版本的重点是“工具调用正确性 + Provider 生态 + 配置可用性”。

---

## 7. 用户反馈摘要

- **推理模型适配不足**（#7409）：用户并非配置错误，而是模型返回结构变化后 AstrBot 的“可用输出”判定过窄。9 条评论说明该问题影响面广，且跨版本长期存在。
- **插件更新链路不可靠**（#11050）：插件作者最受伤——市场审核通过却无法触达用户，直接影响迭代积极性。
- **小内存部署的真实压力**（#11069）：用户在 4 GiB 主机、20 插件、NapCat + Docker 的生产环境中实测，给出 `/proc`、cgroup v2、`smaps` 三类数据，诉求是“官方镜像默认就省内存”，而非让用户自行调参。
- **安全策略误伤**（#11039）：用户理解 blocklist 的初衷，但希望基于解析后的目标路径判断，而不是拒绝一切含 `rm -rf` 的命令。
- **定时任务是刚需但可靠性存疑**（#10363、#11063）：间隔语义错乱与自删死锁都会让“自动任务”静默失效，用户对 cron 的确定性要求很高。
- **配置页面过长**（#11058）：插件配置完全平铺，字段多的插件（如群聊分析类）几乎无法快速定位，折叠是明确的体验诉求。
- **文件生命周期管理缺失**（#11066）：TTS 语音默认落盘且无清理策略，用户“偶然点开服务器文件才发现”，反映缓存/临时文件治理需要统一设计。

---

## 8. 待处理积压

以下条目挂起时间较长或影响核心链路，建议维护者优先分诊：

| 条目 | 创建时间 | 挂起时长 | 说明 |
|---|---|---|---|
| [#7409](https://github.com/AstrBotDevs/AstrBot/issues/7409) GPT-5 推理模型无可用输出 | 2026-04-07 | **约 7 个月** | 9 条评论仍 OPEN，provider 核心兼容性，建议至少给出临时规避方案或追踪计划。 |
| [#8037](https://github.com/AstrBotDevs/AstrBot/issues/8037) 未知命令不唤醒 LLM | 2026-05-06 | **约 6 个月** | `area:core` enhancement，用户已附代码建议，缺维护者表态。 |
| [#8050](https://github.com/AstrBotDevs/AstrBot/pull/8050) 按调用合并流式工具结果 | 2026-05-07 | **约 6 个月** | `area:provider, size:M`，修 #8028，长期待合并，建议 review 或明确挂起原因。 |
| [#10363](https://github.com/AstrBotDevs/AstrBot/issues/10363) / [#10373](https://github.com/AstrBotDevs/AstrBot/pull/10373) cron 固定间隔 | 2026-10-03 / 10-04 | **约 1 个月** | 修复方案清晰（`IntervalTrigger` + UTC 锚点），今日仍在更新，建议尽快合并以闭环。 |
| [#10463](https://github.com/AstrBotDevs/AstrBot/pull/10463) 子代理白名单保留 computer-use 工具 | 2026-10-09 | 约 1 个月 | 修 #10456，涉及 Agent 工具可见性，影响子代理可用性。 |
| [#10745](https://github.com/AstrBotDevs/AstrBot/pull/10745) 腾讯元宝搜索 Provider | 2026-10-25 | 约 2 周 | 功能完整、含测试，属生态扩展，建议排期 review。 |
| [#10906](https://github.com/AstrBotDevs/AstrBot/pull/10906) / [#10923](https://github.com/AstrBotDevs/AstrBot/pull/10923) / [#10925](https://github.com/AstrBotDevs/AstrBot/pull/10925) / [#10960](https://github.com/AstrBotDevs/AstrBot/pull/10960) | 2026-10-31 ~ 11-02 | 约 1 周 | 分别覆盖 cron 工具注入、工具权限、空补全重试、会话锁释放，均为核心链路的可靠性修复，建议集中分诊。 |

**健康度小结**：今日 Issue 关闭率为 0%，PR 关闭率约 14.3%，18 条 PR 待合并，其中多条为 `fix` 类核心修复。项目社区输入充足、修复供给也在增加，但 **review/合并吞吐** 是当前最需要改善的环节；建议维护者对长期挂起的 provider/agent 类 PR 给出明确的“合并 / 需修改 / 暂缓”结论，避免贡献者流失。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：2026-11-10 | 数据窗口：过去 24 小时**

---

## 一、今日速览

过去 24 小时 Discussions 更新 **177 条**，但**新版本发布 0 个**，仓库未启用 Issues/PR，因此没有任何代码合并或修复进入发布通道——社区讨论虽然活跃，项目交付侧本期没有新版本。热度集中在**本地 LLM 超时配置**（#3157，22 评论）、**支付可及性**（#12755，19 评论）与**桌面版基础可用性缺陷**（#8713、#11095，各 19/17 评论）。风险面同样突出：出现一条**疑似清空用户 D 盘数据**的高危报告（#11906），以及多条会阻断启动认证、升级安装与 Agent 执行的呈 OPEN 状态的严重缺陷。整体判断：**社区参与度高、议题讨论长期活跃，但版本发布节奏停滞，累积的修复需求正在明显积压**。

---

## 二、版本发布

本期**无新版本发布（0 个）**，Releases 通道为空，因此不存在需要说明的更新内容、破坏性变更或迁移注意事项。这意味着过去 24 小时内**没有任何修复或功能通过发版触达用户**——下方“Bug 与稳定性”中列出的所有问题均仍处于未发布状态。

---

## 三、项目进展

由于本期 Releases 为空、且仓库未启用 PR 流程（合并仅经 Releases 落地），**本次发版合并上线的功能与修复为 0 项**，项目在可观测的交付维度上本期无推进。

不过从 Discussions 可以看到社区侧已产出可直接复用的成果，构成“待合入的潜在进展”：

| 来源 | 产出的可落地资产 | 状态 |
|---|---|---|
| [#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713) | Ctrl+F 会话内搜索：已给出根因定位（全文检索引擎已就位但桌面版未开启）**及本机实测可跑通的原型插件** | 未合入 |
| [#10615](https://github.com/deepseek-ai/deepseek-harness/discussions/10615) | 第三方插件 `dsh-design-studio` 设计工作台，展示插件生态可扩展性 | 生态侧 |
| [#8844](https://github.com/deepseek-ai/deepseek-harness/discussions/8844) / [#8848](https://github.com/deepseek-ai/deepseek-harness/discussions/8848) / [#9995](https://github.com/deepseek-ai/deepseek-harness/discussions/9995) | 三份带版本号、复现步骤、甚至已对照 upstream `master` 验证缺陷仍存在的根因分析 | 未合入 |

**判断**：问题定位与原型供给是充足的，瓶颈位于“讨论 → 修复 → 发版”的转化环节。建议维护者优先安排一次包含 #8713、#11095、#9995 的版本发布，以打破零发布周期。

---

## 四、社区热点

评论数 Top 7（本期所有展示讨论的 👍 均为 **0**，反应指标对排序无区分度，故以评论数衡量热度）：

| 排名 | 讨论 | 分类 | 评论 | 创建 → 最近更新 | 核心诉求 |
|---|---|---|---|---|---|
| 1 | [#3157](https://github.com/deepseek-ai/deepseek-harness/discussions/3157) llm-pi-ai 本地 LLM 超时 | General | 22 | 08-18 → 11-09 | 长 prompt 撞上 5 分钟硬超时，需可配置到 20 分钟 |
| 2 | [#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755) 支持 MIR 卡支付 | Ideas | 19 | 11-09 → 11-10 | 俄罗斯用户无法充值 DeepSeek API，支付成为使用门槛 |
| 3 | [#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713) 桌面版缺少 Ctrl+F 搜索 | Ideas | 19 | 10-02 → 11-09 | 对话内查找这一最基础场景无入口，附原型 |
| 4 | [#11095](https://github.com/deepseek-ai/deepseek-harness/discussions/11095) 过期 auth cookie 溢出 maxHeaderSize | General | 17 | 10-26 → 11-09 | 每次启动新增 cookie 不回收，最终破坏启动认证 |
| 5 | [#8827](https://github.com/deepseek-ai/deepseek-harness/discussions/8827) workflow 工具调用永不返回 | Q&A | 16 | 10-04 → 11-09 | 父 Agent 卡死在 step/start，长任务不可用 |
| 6 | [#11942](https://github.com/deepseek-ai/deepseek-harness/discussions/11942) 产品工程能力是否跟上模型能力 | General | 15 | 11-03 → 11-10 | 模型强但产品层问题频发，集中吐槽 Windows/GPU 兼容 |
| 7 | [#8934](https://github.com/deepseek-ai/deepseek-harness/discussions/8934) DSH 跑 V4.1 Flash 更费 token | General | 12 | 10-05 → 11-09 | 每轮“启动税”8,188 token，为 Hermes 的 3.3 倍 |

**诉求分析**：
- **本地化与自托管是当前最强需求线**（#3157），用户已在 Win11 + Ollama + Gemma4:12b 上跑通，卡点纯粹是超时策略不可调，属于“小改动、高收益”类型。
- **支付与地域可及性**（#12755）是从“能用模型”到“能付费用 API”的商业化阻塞点，但不由仓库代码决定，需要商务侧响应。
- **桌面端基础体验欠账**（#8713、#11095、#9995）反复出现，指向 Desktop 客户端的工程质量与状态清理机制。
- **成本敏感度上升**（#8934）：用户用实测数据（地板税、工具数量 29 vs 4、R²=0.99）质疑上下文装配策略，这已从“体感抱怨”升级为可量化的架构议题。

---

## 五、Bug 与稳定性

按严重程度排列。**说明：仓库未启用 Issues/PR，因此全部缺陷均无 fix PR，只能等待随 Releases 落地；以下 7 条均为 OPEN 状态。**

| 级别 | 问题 | 影响 | 链接 | Fix 状态 |
|---|---|---|---|---|
| **P0 数据安全** | 报告称操作后**直接将 D 盘数据全部清空** | 用户数据不可逆丢失，属最高危 | [#11906](https://github.com/deepseek-ai/deepseek-harness/discussions/11906) | 无 fix，需优先确认是沙箱越界还是误操作 |
| **P1 阻断启动** | 桌面版每次启动生成新 `dsh-auth-*` cookie（名称含随机端口、30 天 Max-Age），旧代从不清理，Chromium 回放全部 cookie 导致请求头超 `maxHeaderSize`(16384)，启动认证失败 | 应用可能完全无法进入 | [#11095](https://github.com/deepseek-ai/deepseek-harness/discussions/11095) | 无 fix |
| **P1 阻断升级** | `0.2.0-rc.2 → 0.2.1-rc.2` 升级时 `MoveFileExW` 备份重命名 100% 返回 error 5，应用内更新与手动安装均失败 | 用户被锁在旧版本，阻断修复分发 | [#9995](https://github.com/deepseek-ai/deepseek-harness/discussions/9995) | 无 fix |
| **P1 Agent 挂死** | `workflow` 工具 4 个阶段全部完成后永不返回，父 Agent 永久卡在 `step/start`，无后续事件 | 长任务工作流不可用 | [#8827](https://github.com/deepseek-ai/deepseek-harness/discussions/8827) | 无 fix |
| **P1 环境破坏** | `workspace-write` 模式对 workspace 根目录（如 `C:\Users\<u>\Downloads`）打上**可继承的 Low integrity 标签**，会话结束仍残留并向下传播，破坏从该目录启动的安装器 | 副作用外溢到系统层，难以自查 | [#10270](https://github.com/deepseek-ai/deepseek-harness/discussions/10270) | 无 fix |
| **P2 可恢复性** | pi-ai adapter 丢弃上游稳定 error code，流中断一律归为 `PI_AI_ERROR`，导致本可重试的错误被判定为不可重试 | 网络抖动被放大为失败 | [#8844](https://github.com/deepseek-ai/deepseek-harness/discussions/8844) | 无 fix |
| **P2 策略不一致** | `write`/`edit` 在空白 justification 下拒绝重复的同模式提权，而 `bash` 接受同参数 | 权限语义不统一，行为不可预期 | [#8848](https://github.com/deepseek-ai/deepseek-harness/discussions/8848) | 无 fix |

**趋势提示**：P1 中三条（#11095/#9995/#10270）均属**状态清理与文件系统副作用**类问题，指向同一类设计缺口；“残留不回收”这一模式会随使用时长线性恶化，建议合并成一次专项治理。

---

## 六、功能请求与路线图信号

本期无 PR 可供交叉验证，以下为基于需求成熟度与实现成本的纳入可能性判断：

| 需求 | 链接 | 成熟度信号 | 下一版本纳入可能性 |
|---|---|---|---|
| 会话内 Ctrl+F 关键字搜索 | [#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713) | **极高**：底层全文检索引擎已就位，仅桌面端未开启入口；已附本机实测原型 | 高，最应优先合入 |
| 本地 LLM 超时上限可配置 | [#3157](https://github.com/deepseek-ai/deepseek-harness/discussions/3157) | 高：`settings.yaml` 已有尝试痕迹，属配置项扩展 | 高，改动面小 |
| 永久删除会话（释放磁盘、清理 workspace 记账） | [#3075](https://github.com/deepseek-ai/deepseek-harness/discussions/3075) | 高：已给出验收条件与需清理的四类数据 | 中高，需注意不可逆操作确认 |
| 跨对话消息（Agent 工具 + 本地 API/CLI + 授权与来源标识） | [#9921](https://github.com/deepseek-ai/deepseek-harness/discussions/9921) | 中：场景清晰（1 编排 + 3 工程会话广播），但涉及权限模型设计 | 中低，架构级 |
| MIR 卡支付支持 | [#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755) | 中：需求明确但依赖支付/商务侧 | 不由本仓库控制，需官方表态 |
| 设计工作台插件化能力 | [#10615](https://github.com/deepseek-ai/deepseek-harness/discussions/10615) | 已由第三方实现并演示 | 信号：插件 API 值得官方文档化支持 |

**路线图信号**：插件生态（#10615）与全文检索（#8713）表明**能力底座其实已经具备，缺的是暴露与打磨**。下一版本的性价比最优组合是“搜索入口 + 本地超时配置 + 会话真删除”。

---

## 七、用户反馈摘要

**痛点**
1. **本地大模型可用性被超时策略卡死**：Windows 11 + Ollama Gemma4:12b 起步顺利，但稍长 prompt 即撞 5 分钟超时，用户改 `settings.yaml` 无效，缺乏文档化配置路径（#3157）。
2. **基础交互缺失导致“无路可走”**：对话内查找一句话无入口，用户措辞直指这是最基础场景（#8713）。
3. **成本体感明确恶化**：同模型下 DSH 每轮启动税 8,188 token，为 Hermes 的 3.3 倍、Claude Code 的 1.8 倍；向模型暴露 29 个工具而 Pi 仅 4 个，“启动税 × 轮数”对每任务 token 量的预测 R²=0.99（#8934）。
4. **产品工程质量滞后于模型能力**：Windows 文件选择器因过长 `accept` 列表卡死、AMD 独显开启硬件加速后输入光标异常等，用户明确表达“不吐不快”（#11942）。
5. **版本升级与启动可靠性**：升级安装包备份步骤稳定失败、启动认证因 cookie 累积而崩溃，形成“想修也修不了”的死循环（#9995、#11095）。
6. **沙箱副作用外溢**：workspace 目录被打上残留的完整性标签，用户难以归因（#10270）。

**使用场景**
- 单机多会话并行编排：1 个编排会话 + 3 个工程会话，需向正在运行的长会话广播配置（#9921）。
- 以宽泛用户目录（如 Downloads）作为 workspace 直接作业（#10270）。
- 设计与前端产出流水线：模型生成界面 → 画布预览 → 点选元素后追加指令迭代（#10615）。

**满意点**
- 对模型能力普遍认可（#11942 开篇即肯定“模型能力确实让我印象深刻”）。
- 插件可扩展性与社区共创氛围活跃，第三方插件已能跑通完整演示（#10615）。
- 本地模型接入门槛可接受，Ollama 起步“非常成功”（#3157）。

**不满意点**：问题反馈渠道受限——官方仓库 Issues 已关闭，用户只能走 Discussions，导致缺陷缺乏可追踪状态与关闭机制（#8827 明确记录了这一处境）。

---

## 八、待处理积压

以下讨论**长期 OPEN 且在报告期内仍有更新**，即“活着但没被消化”，建议维护者按优先级清理：

| 讨论 | 类型 | 已挂起 | 评论 | 关注理由 |
|---|---|---|---|---|
| [#3157](https://github.com/deepseek-ai/deepseek-harness/discussions/3157) 本地 LLM 超时 | General | **约 84 天**（08-18 起） | 22 | 全站最高热度，改动成本却最低，长期未闭环损失最大 |
| [#3075](https://github.com/deepseek-ai/deepseek-harness/discussions/3075) 永久删除会话 | Ideas | **约 84 天**（08-18 起） | 7 | 已有完整验收条件，磁盘占用随时间累积 |
| [#8713](https://github.com/deepseek-ai/deepseek-harness/discussions/8713) Ctrl+F 搜索 | Ideas | **约 39 天**（10-02 起） | 19 | 附可用原型仍无落地，社区投入未被回应 |
| [#8827](https://github.com/deepseek-ai/deepseek-harness/discussions/8827) workflow 永不返回 | Q&A | 约 37 天（10-04 起） | 16 | P1 级阻断性缺陷 |
| [#8844](https://github.com/deepseek-ai/deepseek-harness/discussions/8844) / [#8848](https://github.com/deepseek-ai/deepseek-harness/discussions/8848) | General | 约 37 天（10-04 起） | 10 / 7 | 已对照 upstream master 验证仍存在，修复价值明确 |
| [#8934](https://github.com/deepseek-ai/deepseek-harness/discussions/8934) token 效率实测 | General | 约 36 天（10-05 起） | 12 | 数据翔实，直接关系用户成本与留存 |
| [#9995](https://github.com/deepseek-ai/deepseek-harness/discussions/9995) 升级安装失败 | Q&A | 约 24 天（10-17 起） | 7 | 升级通道阻塞，会放大所有其他缺陷的存续时间 |
| [#10270](https://github.com/deepseek-ai/deepseek-harness/discussions/10270) 完整性标签残留 | General | 约 22 天（10-19 起） | 8 | 环境破坏类，用户难以自行发现 |

**给维护者的三点提醒**
1. **零发布周期是最大风险**：#11095、#9995 本身就会削弱用户获取修复的能力，建议尽快安排一次修复型发版。
2. **#11906 需在 24 小时内给出官方回应**，明确是否存在沙箱越界导致的数据删除路径；即便是误操作，也需公开澄清以免信任受损。
3. **建议明确 Discussions 的缺陷追踪约定**（标签、认领、关闭标准）。177 条日更新却零关闭，会让高价值报告沉没在长尾讨论中。

---

**项目健康度小结**：社区活跃度**高**（177 条/日更新、多条 20 评论级深度讨论），需求信号**清晰且可落地**；但交付节奏**停滞**（0 版本、0 合并），稳定性风险**偏高**（1 条 P0 数据安全 + 4 条 P1 阻断类缺陷全部无 fix）。当前项目的主要问题不在于缺少输入，而在于缺少闭环。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*