# OpenClaw 生态日报 2026-08-27

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-27 02:23 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-27

## 1. 今日速览

过去 24 小时项目活跃度极高：共 500 条 Issue 更新（新开/活跃 404 条，关闭 96 条）与 500 条 PR 更新（待合并 251 条，合并/关闭 249 条），社区讨论与代码提交均处于高位。今日无新版本发布，但大量 P1/P0 级 Bug 仍在流转，其中多智能体编排稳定性、消息投递可靠性、SQLite 数据安全是当前最集中的痛点。值得关注的是，已有多个针对性修复 PR 处于待合并或待审查状态，项目整体处于「高活跃、高压力、修复跟进中」的状态。

---

## 2. 版本发布

今日无新版本发布（最新 Releases 为空）。

---

## 3. 项目进展

今日共有 249 条 PR 被合并或关闭，以下为已关闭/合并的重点 PR（含今日关闭的 4 条高关注 PR）：

- **feat(ui): review install policy warnings**（[#120900](https://github.com/openclaw/openclaw/pull/120900)）— 已关闭。为 Control UI 增加安装策略警告审查能力，管理员可审阅并确认继续安装插件，强化了安全边界。
- **fix(models): keep Claude CLI OAuth available in Control UI**（[#125471](https://github.com/openclaw/openclaw/pull/125471)）— 已关闭。修复了 Gateway 重启后 Claude CLI OAuth 因遗留配置导致刷新所有权丢失、Control UI 中不可用的问题。
- **fix(release): authorize focused beta evidence**（[#128371](https://github.com/openclaw/openclaw/pull/128371)）— 已关闭。解决了 beta.3 发布阻塞，使冻结候选版本仅含已审查的 Slack 测试变更即可通过发布验证。
- **fix(agent-core): preserve explicit reasoning off through Agent Core handoff**（[#120020](https://github.com/openclaw/openclaw/pull/120020)）— 已关闭。修复了 Agent Core 交接时显式关闭推理状态被重置的问题，确保 Qwen 等托管模型不会意外启用高推理。

此外，以下高价值 PR 仍在推进中，值得关注：

- **fix(anthropic): prevent retired Claude CLI profile from breaking setup**（[#130225](https://github.com/openclaw/openclaw/pull/130225)）— 待维护者审查。修复用户从已退役的 `anthropic:claude-cli` 认证配置升级时，设置流程被错误中断的问题。
- **fix(auto-reply): queue instead of steering after a terminal source-reply receipt**（[#129001](https://github.com/openclaw/openclaw/pull/129001)）— 待补充证明。针对 Telegram 终态回复返回 `delivery_ambiguous` 时消息丢失的问题，改为入队而非转向。
- **fix(memory): isolate sqlite-vec KNN from the event loop**（[#128078](https://github.com/openclaw/openclaw/pull/128078)）— 待维护者审查。将 sqlite-vec KNN 查询移出 Gateway 事件循环，避免阻塞主线程，提升 `memory_search` 可用性。
- **fix(codex): reclaim binding capacity after session deletion**（[#128366](https://github.com/openclaw/openclaw/pull/128366)）— 待补充证明。修复 Codex 会话删除后绑定行残留、耗尽共享插件状态限制的问题。

---

## 4. 社区热点

今日讨论最活跃的 Issues 集中在**升级回归、多智能体稳定性、消息投递可靠性**三大主题：

- **[#38327](https://github.com/openclaw/openclaw/issues/38327)（15 评论）** — [Bug] "Cannot convert undefined or null to object" in 2026.3.2 with google-vertex/gemini-3.1-pro-preview。用户升级后任何消息都导致内嵌 Agent 崩溃，属于回归问题，影响面广。
- **[#53628](https://github.com/openclaw/openclaw/issues/53628)（14 评论）** — [Bug]: `${XDG_CONFIG_HOME}` is not process when installing a skill。Docker 环境下通过 ClawHub 安装技能时，环境变量未被解析，配置路径失效。
- **[#43367](https://github.com/openclaw/openclaw/issues/43367)（13 评论）** — Multi-agent orchestration is unstable: concurrent agents add/config overwrites, session-lock failures, and detached child work。多智能体并行编排时出现配置覆盖、会话锁失败、子任务脱离等问题，直接影响实际使用。
- **[#87561](https://github.com/openclaw/openclaw/issues/87561)（12 评论）** — Define durable final fallback delivery semantics across channels。用户反馈 Agent 回合结束时内部已生成兜底消息，但渠道层静默丢弃，导致用户看到「沉默」，需要跨渠道的最终投递语义保证。
- **[#113306](https://github.com/openclaw/openclaw/issues/113306)（12 评论）** — SQLite snapshot restore lacks end-to-end crash and identity guarantees。SQLite 快照创建/恢复可能报告成功但未持久化链接父目录，存在数据丢失风险。

**诉求分析**：社区对「升级后不破坏现有功能」的期望强烈，同时对多智能体场景下的并发安全与消息不丢失提出了更高要求。这些热点问题均已有对应修复 PR 在推进，但合并速度仍需加快。

---

## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列如下（标注是否已有修复 PR）：

### P0（发布阻断）

- **[#48920](https://github.com/openclaw/openclaw/issues/48920)（10 评论）** — Live Docs are ahead of release。文档中 `IsolatedSessions` 配置在最新版 2026.3.13 中不存在，用户按文档配置即报错。**无 fix PR**，需紧急对齐文档与发布版本。

### P1（高优先级）

- **[#38327](https://github.com/openclaw/openclaw/issues/38327)（15 评论）** — google-vertex/gemini-3.1-pro-preview 下任何消息触发 "Cannot convert undefined or null to object"。**无 fix PR**。
- **[#43367](https://github.com/openclaw/openclaw/issues/43367)（13 评论）** — 多智能体并发配置覆盖、会话锁失败、子任务脱离。**无 fix PR**。
- **[#87561](https://github.com/openclaw/openclaw/issues/87561)（12 评论）** — 跨渠道最终兜底投递语义缺失，用户看到沉默。**无 fix PR**。
- **[#113306](https://github.com/openclaw/openclaw/issues/113306)（12 评论）** — SQLite 快照恢复缺少崩溃与身份保证。**无 fix PR**。
- **[#83959](https://github.com/openclaw/openclaw/issues/83959)（11 评论）** — Codex app-server 启动重试在替换服务器就绪前耗尽，导致崩溃循环。**有 linked PR**。
- **[#97616](https://github.com/openclaw/openclaw/issues/97616)（9 评论）** — Hook/工具子进程未回收，僵尸进程累积导致运行时性能下降。**无 fix PR**。
- **[#92633](https://github.com/openclaw/openclaw/issues/92633)（9 评论）** — `memory_search corpus="all"` 超时，而单个 corpus 均正常。**无 fix PR**。
- **[#94939](https://github.com/openclaw/openclaw/issues/94939)（8 评论）** — 6.x 状态迁移导致渠道会话存储 SQLite 为空（0 字节），孤立引用并破坏 MS Teams 主动发送。**有 linked PR**。
- **[#114211](https://github.com/openclaw/openclaw/issues/114211)（8 评论）** — Matrix 房间 Agent 可循环处理可见 no-reply 输出、重启恢复后重放陈旧会话状态。**无 fix PR**。
- **[#126360](https://github.com/openclaw/openclaw/issues/126360)（7 评论）** — 显式多智能体所有权下 `AgentSelectionRequiredError` 刷屏日志。**无 fix PR**。
- **[#111372](https://github.com/openclaw/openclaw/issues/111372)（6 评论）** — macOS 上升级后 Gateway 无限 SIGTERM 重启循环。**无 fix PR**。
- **[#128971](https://github.com/openclaw/openclaw/issues/128971)（6 评论）** — Telegram 终态回复在 `delivery_ambiguous` 时静默丢失。**有 fix PR（[#129001](https://github.com/openclaw/openclaw/pull/129001)）**。
- **[#92241](https://github.com/openclaw/openclaw/issues/92241)（6 评论）** — 更新/回滚后 Gateway 持有陈旧模块路径，入站消息静默丢弃（ERR_MODULE_NOT_FOUND）。**无 fix PR**。
- **[#118793](https://github.com/openclaw/openclaw/issues/118793)（5 评论）** — Claude CLI 会话限制错误直接终止而非触发模型回退链。**无 fix PR**。

### P2（中优先级，部分有修复）

- **[#119087](https://github.com/openclaw/openclaw/issues/119087)（8 评论）** — Gateway 冷启动在 1-vCPU 容器上回归约 2.5 倍。**有 linked PR**。
- **[#90378](https://github.com/openclaw/openclaw/issues/90378)（7 评论）** — 5.28→6.1 升级时 cron 存储静默迁移至 SQLite，新任务默认 `delivery.mode=announce` 导致渠道报错。**无 fix PR**。
- **[#95840](https://github.com/openclaw/openclaw/issues/95840)（6 评论）** — `contextPruning mode: cache-ttl` 对 OpenAI 模型永不触发。**有 linked PR**。
- **[#112248](https://github.com/openclaw/openclaw/issues/112248)（6 评论）** — `@openclaw/codex` 插件注册失败，所有 `/codex` 命令静默无效。**无 fix PR**。
- **[#74378](https://github.com/openclaw/openclaw/issues/74378)（已关闭，6 评论）** — Windows 上 CLI 命令执行后残留 node.exe 进程。**已关闭**。

---

## 6. 功能请求与路线图信号

今日社区提出的功能需求中，以下方向值得关注：

- **模型回退链验证**（[#6599](https://github.com/openclaw/openclaw/issues/6599)）— 请求新增 `/models test-fallback` 命令，无需等待真实故障即可验证回退链配置。已有相关讨论但无 PR。
- **投递队列 TTL**（[#16555](https://github.com/openclaw/openclaw/issues/16555)）— 为投递队列消息增加 TTL/过期时间，防止 Gateway 重启后陈旧条目刷屏渠道。**无 PR**。
- **多槽位记忆架构**（[#60572](https://github.com/openclaw/openclaw/issues/60572)）— 将单一 `memory` 槽位拆分为多个专用记忆槽，支持不同记忆层并行。**无 PR**。
- **Agent 自主触发上下文压缩**（[#6757](https://github.com/openclaw/openclaw/issues/6757)）— 允许 Agent 自行调用压缩工具，无需用户干预。**无 PR**。
- **反应触发 Agent 回合**（[#17840](https://github.com/openclaw/openclaw/issues/17840)）— 支持表情反应等事件唤醒 Agent，用于投票、点赞等交互场景。**无 PR**。
- **压缩与 LCM 的模型回退链**（[#56781](https://github.com/openclaw/openclaw/issues/56781)）— 为压缩和 LCM summaryModel 增加回退模型链。**无 PR**。
- **Anthropic advisor 工具支持**（[#63930](https://github.com/openclaw/openclaw/issues/63930)）— 支持 Anthropic 服务端 advisor 工具及通用服务端工具块处理。**无 PR**。
- **TUI 无障碍配置**（[#9637](https://github.com/openclaw/openclaw/issues/9637)）— 增加禁用 emoji 和 Unicode 符号的选项，改善屏幕阅读器体验。**无 PR**。
- **WhatsApp 贴纸发送**（[#7476](https://github.com/openclaw/openclaw/issues/7476)）— 支持以贴纸形式发送 `.webp` 文件。**无 PR**。
- **子 Agent 超时前预警**（[#6625](https://github.com/openclaw/openclaw/issues/6625)）— 在 `runTimeoutSeconds` 到期前注入系统消息，给子 Agent 保存进度的机会。**无 PR**。
- **Agent 感知通信渠道**（[#20837](https://github.com/openclaw/openclaw/issues/20837)）— 让 Agent 知道消息来自控制台还是 Telegram 等渠道。**无 PR**。

**路线图信号**：今日合并的 PR 中，[#130103](https://github.com/openclaw/openclaw/pull/130103)（机器人入群时发送基于房间事实的简介）和 [#130591](https://github.com/openclaw/openclaw/pull/130591)（按消息渠道分组高级设置）为新增功能，说明项目在「渠道体验」和「UI 可用性」上持续投入。而 [#130225](https://github.com/openclaw/openclaw/pull/130225)（修复退役 Claude CLI profile）和 [#130601](https://github.com/openclaw/openclaw/pull/130601)（ACP 关闭会话重启后重新开始）则表明兼容性与 ACP 协议完善是当前重点。

---

## 7. 用户反馈摘要

从今日 Issues 评论中提炼的真实用户反馈：

- **升级回归是最大痛点**：多位用户反映升级到新版本后出现崩溃（[#38327](https://github.com/openclaw/openclaw/issues/38327)）、文档超前于版本（[#48920](https://github.com/openclaw/openclaw/issues/48920)）、配置迁移静默失败（[#90378](https://github.com/openclaw/openclaw/issues/90378)）等问题。用户对「升级后一切照旧」的期望非常强烈。
- **多智能体场景可靠性不足**：用户 `waliddafif` 在 [#43367](https://github.com/openclaw/openclaw/issues/43367) 中详细描述了并行编码批次中遇到的配置覆盖、会话锁失败、子任务脱离等系列问题，直言「多智能体运行在实践中不可靠」。
- **消息丢失影响信任**：多个 Issue（[#87561](https://github.com/openclaw/openclaw/issues/87561)、[#128971](https://github.com/openclaw/openclaw/issues/128971)、[#49223](https://github.com/openclaw/openclaw/issues/49223)）指向同一类问题：Agent 完成了工作但用户看不到最终回复。这种「沉默失败」对用户信任伤害极大。
- **数据安全与备份诉求**：用户 `verncake` 在 [#40786](https://github.com/openclaw/openclaw/issues/40786) 中请求备份 CLI 支持 `.gitignore` 式排除模式，指出当前备份包含 `node_modules` 等大目录且无法排除 `.env` 等敏感文件。
- **配置环境变量解析问题**：Docker 用户 `Devattom` 在 [#53628](https://github.com/openclaw/openclaw/issues/53628) 中反馈 `XDG_CONFIG_HOME` 在技能安装时未被解析，导致配置路径失效，影响容器化部署体验。
- **性能回归被关注**：用户 `xyrolle` 在 [#119087](https://github.com/openclaw/openclaw/issues/119087) 中报告 Gateway 冷启动在 1-vCPU 容器上回归约 2.5 倍，对资源受限环境不友好。

---

## 8. 待处理积压

以下为长期未关闭、且对项目健康度有重要影响的 Issue/PR，提醒维护者关注：

- **[#6599](https://github.com/openclaw/openclaw/issues/6599)（2026-02-01 创建，11 评论）** — 请求 `/models test-fallback` 命令。已积压近 7 个月，社区对模型回退链验证的需求持续存在。
- **[#6757](https://github.com/openclaw/openclaw/issues/6757)（2026-02-02 创建，8 评论）** — Agent 自主触发上下文压缩。积压 6 个多月，涉及会话管理核心体验。
- **[#16670](https://github.com/openclaw/openclaw/issues/16670)（2026-02-15 创建，9 评论）** — 引导向导应包含 Memory/Embedding 配置。新用户配置记忆功能时容易遗漏，影响上手体验。
- **[#16555](https://github.com/openclaw/openclaw/issues/16555)（2026-02-14 创建，8 评论）** — 投递队列消息 TTL。与消息可靠性直接相关，长期未解决。
- **[#40786](https://github.com/openclaw/openclaw/issues/40786)（2026-03-09 创建，11 评论）** — 备份 CLI 排除模式。涉及数据安全与备份体积，用户呼声较高。
- **[#56692](https://github.com/openclaw/openclaw/issues/56692)（2026-03-29 创建，8 评论）** — 群聊上下文处理可能混淆消息归属。影响多 Agent 群聊场景的正确性。
- **[#91223](https://github.com/openclaw/openclaw/issues/91223)（2026-06-07 创建，6 评论）** — 主动记忆注入破坏提示缓存命中率（99.9%→22%）。性能影响显著，但标记为 `needs-live-repro`，等待复现。
- **[#118785](https://github.com/openclaw/openclaw/issues/118785)（2026-08-03 创建，8 评论）** — 容器与外部应用 SDK 的 QA 主证据跟踪。维护者创建，涉及 23 个容器 ID 和 31 个 SDK ID 的审计。

**积压观察**：大量 2-3 月创建的 P2/P3 级 Issue 至今未关闭，部分标记为 `needs-maintainer-review` 或 `needs-product-decision`，说明维护者审查带宽有限。建议优先处理与消息可靠性、数据安全、多智能体稳定性相关的积压项，这些是社区反馈最集中的方向。

---

*本日报由 AI 助手基于 OpenClaw GitHub 公开数据自动生成，数据截至 2026-08-27。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-08-27**

---

## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态正处于**高活跃、高压力、快速演进**阶段。六个主要项目单日合计产生超 1,000 条 Issue 更新与 1,200 条 PR 更新，但无一发布新版本，说明社区正处在密集修复与功能沉淀期。**消息投递可靠性、多智能体并发安全、升级回归控制**三大问题跨项目反复出现，已成为制约用户体验的核心瓶颈。与此同时，MCP 工具链兼容性、记忆系统架构创新、多租户/团队协作能力正在成为下一阶段竞争焦点。整体来看，生态已从"功能堆叠"转向"稳定性与架构治理"。

---

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | PR 合并率 | Release | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃 404，关闭 96） | 500（待合并 251，合并/关闭 249） | 49.8% | 无 | ⚠️ 高活跃、高压力；P0/P1 Bug 流转多，修复跟进积极但积压明显 |
| **hermes-agent** | 468（新开/活跃 343，关闭 125） | 500（待合并 344，合并/关闭 156） | 31.2% | 无 | ⚠️ 极高活跃但合并率低，技术债积累；安装/更新/MCP 兼容性是主要痛点 |
| **Zeroclaw** | 22（新开/活跃 18，关闭 4） | 50（待合并 47，合并/关闭 3） | 6.0% | 无 | ⚠️ 功能扩张与安全加固并行，但维护者审查队列严重积压（47 个 PR 待合并） |
| **QwenPaw** | 31（新开/活跃 16，关闭 15） | 42（待合并 14，合并/关闭 28） | 66.7% | 无 | ✅ 功能迭代与质量加固并行；测试覆盖率显著提升，CI 分片落地 |
| **AstrBot** | 14（新开/活跃 9，关闭 5） | 113（待合并 9，合并/关闭 104） | 92.0% | 无 | ✅ 维护者响应极快，Dashboard 重构等大型 PR 高效合入，历史 PR 清理完成 |
| **PicoClaw** | 7（新开/活跃 5，关闭 2） | 5（待合并 2，合并/关闭 3） | 60.0% | 无 | ✅ 中等活跃，修复节奏稳定；Slack 媒体上传修复 PR 待合并 |

> **注**：PR 合并率 = 合并/关闭数 ÷ PR 更新总数。AstrBot 与 QwenPaw 合并效率显著优于其他项目；Zeroclaw 与 hermes-agent 的合并瓶颈值得警惕。

---

## 3. OpenClaw 在生态中的定位

### 核心参照地位
OpenClaw 是当前生态中**社区规模最大、问题密度最高、修复跟进最积极**的项目，单日 Issue/PR 更新均达 500 条，远超其他项目。其 GitHub 讨论量级（单 Issue 最高 15 评论）虽不及 hermes-agent 的极端案例（103 评论），但整体覆盖面更广。

### 技术路线差异
- **多智能体编排**：OpenClaw 将多智能体并发安全（#43367）作为核心痛点公开跟踪，而 Zeroclaw 通过 SupervisorSession V3 产品化（#10404）走架构先行路线。
- **消息投递**：OpenClaw 明确提出"跨渠道最终兜底投递语义"（#87561），试图从协议层解决"沉默失败"，比 hermes-agent 的渠道级修复（#94146）和 QwenPaw 的推送补漏（#7324）更具系统性。
- **存储层**：SQLite 数据安全（#113306）与 sqlite-vec KNN 性能（#128078）是当前重点，反映其在单机数据架构上的深度投入。

### 社区规模对比
| 指标 | OpenClaw | hermes-agent | QwenPaw | Zeroclaw | AstrBot | PicoClaw |
|---|---|---|---|---|---|---|
| 单日 Issue 更新 | 500 | 468 | 31 | 22 | 14 | 7 |
| 单日 PR 更新 | 500 | 500 | 42 | 50 | 113 | 5 |
| 高关注 Issue 评论峰值 | 15 | 103 | 11 | 19 | 7 | 8 |

### 优势与短板
- **优势**：生态规模最大，问题反馈全面；修复 PR 跟进速度快（多个 P1 已有对应修复）；功能覆盖面广（UI、模型、渠道、存储）。
- **短板**：P0 级文档超前于版本（#48920）暴露发布流程漏洞；多智能体稳定性（#43367）长期无 fix PR，影响实际使用信心；PR 合并率（49.8%）中等，251 个待合并 PR 形成积压。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **消息投递可靠性** | OpenClaw、Zeroclaw、QwenPaw、hermes-agent、AstrBot | 兜底投递语义缺失（OpenClaw #87561）、终端回退绕过投递合约（Zeroclaw #10186）、定时任务推送丢失（QwenPaw #7324）、微信限流后"只进不出"（hermes-agent #94146）、QQ 主动推送 ID 语义不一致（AstrBot #9831）——"沉默失败"已成行业共识 |
| **多智能体/会话稳定性** | OpenClaw、QwenPaw、hermes-agent、AstrBot | 并发配置覆盖与会话锁失败（OpenClaw #43367）、多步骤任务无提示停止（QwenPaw #6921）、共享 profile 会话分裂（hermes-agent #89346）、多平台会话共享限流桶（AstrBot #9796） |
| **升级/安装可靠性** | OpenClaw、hermes-agent、QwenPaw、PicoClaw | 升级后崩溃回归（OpenClaw #38327）、安装脚本失败（hermes-agent #87093）、Windows 文件锁导致更新失败（QwenPaw #6810）、配置项"假文档"（PicoClaw #3328）——用户对"升级后一切照旧"的期望强烈 |
| **MCP 工具链兼容性** | hermes-agent、Zeroclaw、AstrBot | MCP stdio 快速失败（hermes-agent #94335/#94637）、MCP SDK 2.0 兼容（hermes-agent #96002）、工具结果重复存储（Zeroclaw #10394）、MCP stdio 校验（AstrBot #7477） |
| **记忆/上下文管理** | OpenClaw、QwenPaw、hermes-agent、PicoClaw | SQLite 快照崩溃保证（OpenClaw #113306）、记忆串会话（QwenPaw #7193）、state.db 反复损坏（hermes-agent #90950）、路由代理上下文失效（PicoClaw #3316） |
| **安全加固** | Zeroclaw、hermes-agent、OpenClaw | SSRF 防护（Zeroclaw #10070）、Webhook 认证边界（Zeroclaw #9587）、shell payload 扫描绕过（hermes-agent #95240）、安装策略警告（OpenClaw #120900） |
| **多租户/团队协作** | QwenPaw、AstrBot、hermes-agent | QwenPaw Hub 多租户版 2.2.0（QwenPaw #7318）、平台实例级插件启停（AstrBot #9834）、profile 管理控制面（hermes-agent #83386）——从个人助手向团队协作平台延伸 |
| **渠道体验** | PicoClaw、QwenPaw、AstrBot、OpenClaw | IRC 长消息合并（PicoClaw #3287）、Telegram 话题支持（PicoClaw #3315）、钉钉共享上下文（QwenPaw #7208）、飞书混合消息丢文字（AstrBot #9839）、Telegram 终态回复丢失（OpenClaw #128971） |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 通用个人 AI 助手框架，覆盖 UI、模型、渠道、存储全栈 | 个人开发者、企业 PoC | 多智能体编排 + SQLite 存储 + 跨渠道消息网关；单机优先 |
| **hermes-agent** | 桌面端优先的 Agent 客户端，深度集成 MCP 工具链 | 桌面重度用户、MCP 生态开发者 | 桌面渲染器 + MCP stdio 工具链 + profile 管理；研究机构（NousResearch）出品 |
| **Zeroclaw** | 架构驱动 + 安全优先，RFC 文化浓厚 | 架构师、安全敏感型团队 | 类型化权限（SupervisorSessionV1）+ 线协议一等公民 + eval 子系统；强调治理与可审计性 |
| **QwenPaw** | 阿里生态集成，多租户 Hub 路线图明确 | 中国用户、团队/企业部署 | 多租户 Hub（2.2.0）+ 钉钉/微信渠道 + 测试基建（覆盖率 63%+）；云服务导向 |
| **AstrBot** | 多平台消息适配器，Dashboard 体验优先 | 多平台 bot 运营者、社区管理员 | 平台适配器层（QQ/飞书/钉钉/微信）+ 插件系统 + 限流/会话隔离；维护者响应极快 |
| **PicoClaw** | 轻量级/嵌入式部署，渠道兼容性修复 | 嵌入式开发者、ARM 边缘部署 | RKLLM 端侧推理 + 路由代理 + 多渠道（Slack/Telegram/IRC/LINE）；资源受限环境友好 |

---

## 6. 社区热度与成熟度

### 活跃度分层

| 层级 | 项目 | 特征 |
|---|---|---|
| **极高活跃（每日 400+ Issue/PR）** | OpenClaw、hermes-agent | 社区规模大，问题反馈全面，但 PR 合并率中等偏低（49.8% / 31.2%），处于"高压力修复"阶段 |
| **高活跃（每日 20-50 Issue/PR）** | Zeroclaw、QwenPaw | 功能迭代与架构讨论并行；Zeroclaw 受限于审查带宽，QwenPaw 合并效率较高（66.7%） |
| **中等活跃（每日 <20 Issue/PR）** | AstrBot、PicoClaw | 维护者响应快（AstrBot 合并率 92%），修复节奏稳定，处于"质量巩固"阶段 |

### 阶段判断

- **快速迭代期**：OpenClaw（功能覆盖面广但稳定性承压）、hermes-agent（功能推进快但技术债积累）、Zeroclaw（架构设计领先但落地效率待提升）
- **质量巩固期**：QwenPaw（测试覆盖率 +5.02pp、CI 并行分片）、AstrBot（历史 PR 清理、Dashboard 重构）、PicoClaw（定向修复渠道缺陷）

---

## 7. 值得关注的趋势信号

### ① "沉默失败"成为行业级痛点
五个项目同时出现消息丢失/静默丢弃问题（OpenClaw #87561、Zeroclaw #10186、QwenPaw #7324、hermes-agent #94146、AstrBot #9831）。用户对"Agent 完成了工作但看不到回复"的容忍度极低。**跨渠道最终投递语义**可能成为下一代 Agent 框架的标配能力。

### ② 多智能体从 Demo 走向生产，稳定性需求凸显
OpenClaw #43367（并发配置覆盖、会话锁失败）与 QwenPaw #6921（多步骤任务无提示停止）表明，多智能体编排已不再是概念验证，而是真实生产负载。**并发安全、任务自主执行、会话隔离**是当前最集中的技术债。

### ③ 升级回归正在消耗用户信任
OpenClaw #38327（升级后崩溃）、hermes-agent #91277（"安装/更新是最不可靠的能力"）、QwenPaw #6810（Windows 更新文件锁）——用户对"升级后一切照旧"的期望强烈。**版本兼容性测试与平滑升级机制**将成为项目竞争力的重要组成。

### ④ MCP 生态爆发但标准未定，兼容性阵痛明显
hermes-agent 的 MCP stdio 快速失败（#94335/#94637）与 SDK 2.0 兼容问题（#96002）、Zeroclaw 的工具结果重复存储（#10394）说明 MCP 生态正在快速扩张，但协议演进带来的破坏性变更需要 Agent 框架层做防御性适配。

### ⑤ 从个人助手向团队协作/多租户演进
QwenPaw 官方宣布 Hub 多租户版 2.2.0（#7318）、AstrBot 的平台实例级插件启停（#9834）、hermes-agent 的 profile 管理控制面（#83386）——**多用户、RBAC、团队部署**正在成为下一阶段的核心需求。

### ⑥ 记忆系统架构创新成为新方向
OpenClaw 的多槽位记忆架构（#60572）、QwenPaw 的可插拔长期记忆后端（#7080）、hermes-agent 的 state.db 损坏修复（#96011）——**记忆的可靠性、隔离性、可插拔性**是共同探索方向。

### ⑦ 安全左移成为标配
Zeroclaw 的 SSRF 防护（#10070）、Webhook 认证边界（#9587）、hermes-agent 的 shell payload 扫描绕过修复（#95240）、OpenClaw 的安装策略警告（#120900）——**供应链安全、输入边界、权限治理**正在从"可选"变为"必需"。

### ⑧ 测试基建投入加大，质量巩固信号明确
QwenPaw 单日新增 19 个测试文件（+5.02pp 覆盖率）并拆分 CI 分片；hermes-agent 修复本地测试运行器误报成功（#7250）；Zeroclaw 的 eval 系列 PR（8 个）构建完整评估栈——**社区正在从"功能优先"转向"质量优先"**。

---

**结论**：个人 AI 助手开源生态正处于从"功能竞赛"到"稳定性竞赛"的转折点。OpenClaw 作为生态核心，其多智能体编排与消息投递的系统性方案将影响行业走向；hermes-agent 与 Zeroclaw 的架构探索（MCP 深度集成、类型化权限）值得关注；QwenPaw 与 AstrBot 在合并效率与质量巩固上的表现，为其他项目提供了"高响应维护"的参考样本。对于技术决策者，建议优先关注**消息投递可靠性、多智能体并发安全、升级兼容性**三大方向的技术选型与投入。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-27

## 1. 今日速览

过去 24 小时项目保持高活跃度：共 22 条 Issue 更新（新开/活跃 18 条，关闭 4 条）与 50 条 PR 更新（待合并 47 条，合并/关闭 3 条），无新版本发布。当前积压的 47 条待合并 PR 中，约半数处于 `needs-author-action` 状态，且多个高优先级 RFC 仍在等待维护者审查，说明项目在架构决策与 PR 合并效率上存在一定瓶颈。安全加固（SSRF、symlink 竞态、Git shell 策略）与 eval 子系统（8 个系列 PR）是当前两条最集中的工作线。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日合并/关闭的 PR 数量较少（3 条），其中可见的重要进展：

- **#10404 [CLOSED] feat(supervisor): V3 supervisor session — fresh-context independent review through Tachi (vertical V3)** — 由 @kckylechen1 提交的 V3 监督者会话 PR 于今日关闭，该 PR 将 SA-29 类型化权限产品化为运行时 SupervisorSessionV1，是 gated-open 计划的纵向迭代。链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10404

- **#9587 [CLOSED] refactor(gateway): require authenticated webhook ingress before agent dispatch** — 该重构要求入站消息分发 Webhook 处理器在调用共享 agent 分发前必须经过显式认证入站边界，修复 #9565 发现的三个可被攻击者控制消息的 Webhook 处理器。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/9587

- **#10396 [CLOSED] reasoning_content is replayed for every assistant message in the history** — 修复 OpenAI provider 在历史消息中重放所有推理内容的问题，避免每次请求重复发送模型已消费的思考过程。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10396

此外，**#10103**（ZeroCode 健康状态法语/西班牙语标签对齐）与 **#10235**（SECURITY.md distroless 基础镜像更新至 Debian 13）两个低风险 Issue 也已关闭，说明小规模清理工作仍在持续推进。

## 4. 社区热点

今日讨论最活跃的 Issue 集中在架构 RFC 与维护者决策队列：

- **#8780 RFC: Realtime speech-to-speech channel for Gemini Live**（评论 19，👍 0）— 提议增加可选的实时语音通道，由 Gemini Live 作为对话模型。该 RFC 已迭代至 v2，从直接集成改为 broker 合约，风险等级 high，仍在等待维护者审查。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/8780

- **#8692 [Tracker]: Maintainer decision queue for RFCs and design issues**（评论 14）— 维护者决策队列 tracker，用于跟踪需要 maintainer 或 code-owner 关注的 RFC、设计问题与发布策略。该 tracker 本身的高评论数侧面反映了社区对决策效率的关注。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/8692

- **#8396 RFC: Make wire protocol first-class in provider construction and onboarding**（评论 13）— 提议将线协议作为 provider 构造与 onboarding 的一等公民，涉及 FND-003 Rev. 15 的治理约束，风险 high。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/8396

- **#9600 [Tracker]: Session-persistence contract ownership and layer ordering**（评论 12）— 会话持久化合约被四个独立工作流同时修改且无指定负责人，该 tracker 用于裁决所有权与层序。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/9600

**分析**：社区讨论高度集中在架构治理层面——多个高影响 RFC 同时处于 `needs-maintainer-review`，而维护者决策队列本身成为热点，说明项目在快速扩张期面临架构决策积压的挑战。

## 5. Bug 与稳定性

按严重程度排列：

**S0 - 数据丢失/安全风险**

- **#10379 [Bug] Unable to cancel ongoing message & request for message queuing in ZeroClaw Desktop** — Web 仪表盘中取消/停止按钮不可点击或无法终止运行进程，且文本输入框在 AI 处理期间被禁用，用户无法排队新消息。风险 high，尚无 fix PR。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10379

**S1 - 工作流阻塞**

- **#10230 [Bug] Daemon startup or reload can overflow during agent initialization** — 在守护进程运行时应用 ZeroCode Quickstart 配置可导致 Tokio 运行时 worker 栈溢出，影响 zerocode/tui，风险 high，标记 `r:needs-repro`。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10230

**S2 - 行为降级**

- **#10186 [Bug] Terminal fallback text bypasses live delivery seams** — 两条终端回退路径绕过实时投递合约：`run_tool_call_loop` 重试耗尽后返回显示安全回退字符串，以及另一条未指明路径。风险 medium。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10186

- **#10390 [Bug] Entering an inactive Chat pane blocks ZeroCode navigation** — 进入非活动 Chat 面板会同步等待初始化完成，导致全局模式切换阻塞，键盘输入与渲染停止响应。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10390

- **#10349 [Bug] SOP pane loading blocks ZeroCode navigation** — 与 #10390 同类问题，进入 SOP 面板时同步等待 `sops/list` RPC，期间 ZeroCode 停止处理键盘输入。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10349

**S3 - 轻微问题**

- **#10103 [CLOSED] ZeroCode Health status values misalign in French and Spanish** — 已关闭，修复了标签宽度导致的文本错位。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10103

**其他 Bug**

- **#10394 [Bug] MCP tool results are stored as the whole CallToolResult envelope, duplicating every payload** — MCP 工具结果以完整 `CallToolResult` 信封存储，FastMCP 服务器同时返回 `content[].text` 与 `structuredContent` 时造成重复存储，风险 high，状态 in-progress。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10394

- **#10396 [CLOSED] reasoning_content is replayed for every assistant message** — 已关闭，修复 OpenAI provider 历史消息中推理内容重放问题。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10396

## 6. 功能请求与路线图信号

今日活跃的功能请求与 RFC 信号：

**高优先级架构 RFC（均标记 `needs-maintainer-review`，风险 high）**

- **#8780 RFC: Realtime speech-to-speech channel for Gemini Live** — 实时语音通道，Gemini Live 作为对话模型，已迭代至 v2 broker 合约。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/8780

- **#8396 RFC: Make wire protocol first-class in provider construction and onboarding** — 将线协议提升为 provider 构造的一等公民。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/8396

- **#9998 RFC: Session-scoped persistent prompt attachments** — 会话级持久提示附件，解决历史裁剪/守护进程重启后目标丢失问题。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/9998

- **#10050 RFC: Verbatim channel send over the gateway, without an agent turn** — 网关逐字通道发送，不经过 agent turn。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10050

- **#10346 RFC: Gateway and channels don't share the heartbeat worker's MCP-registry-caching pattern** — 指出 stdio MCP 服务器每次启动被连接三次的问题，提议复用心跳工作器的缓存模式。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10346

**功能增强**

- **#10400 [Feature] Configurable Telegram unauthorized-sender notice** — 允许操作员替换未授权 Telegram 发送者收到的固定通知文本。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10400

- **#10298 [Feature] Make URLs clickable in ZeroCode transcripts** — 使 ZeroCode 转录中的 URL 可点击，当前 TUI 捕获鼠标输入导致终端原生 URL 交互不可用。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10298

- **#10305 [Task] generate the SOP syntax reference from source** — 从源码自动生成 SOP 语法参考文档，替代手工维护。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10305

**路线图判断**：多个 RFC 已进入 v2 迭代并附有详细设计，若维护者审查通过，实时语音通道（#8780）与线协议一等公民（#8396）可能成为下一版本的重要架构变更。Telegram 通知可配置（#10400）与 URL 可点击（#10298）属于低成本高用户感知度的改进，有望快速进入后续版本。

## 7. 用户反馈摘要

从今日 Issue 评论与描述中提炼的用户反馈：

- **桌面端取消操作失效（#10379）**：用户明确反馈 ZeroClaw Desktop 中取消按钮“unclickable/disabled”，且无法排队新消息。这是 S0 级体验问题，直接影响用户对 AI 处理流程的控制感。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10379

- **MCP 工具结果存储冗余（#10394）**：用户指出 FastMCP 服务器返回的 `structuredContent` 与 `content[].text` 被完整信封重复存储，导致存储膨胀。这是对存储效率的精细化诉求。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10394

- **推理内容重放（#10396，已关闭）**：用户发现 OpenAI provider 在每次请求中重放历史消息的全部 `reasoning_content`，既浪费 token 又可能泄露思考过程。该问题已修复，但反映了用户对隐私与成本的敏感。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10396

- **导航阻塞（#10390、#10349）**：多个用户报告 ZeroCode TUI 中进入非活动面板会阻塞全局导航，说明 TUI 的响应式设计需要改进，避免同步等待。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10390 、 https://github.com/zeroclaw-labs/zeroclaw/issues/10349

- **RFC 迭代参与度高（#8780）**：Gemini Live 实时语音通道 RFC 在 19 条评论中完成 v1→v2 的重写，从直接集成改为 broker 合约，说明社区参与者愿意深度参与架构设计并推动方案演进。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/8780

## 8. 待处理积压

**长期未合并的 PR 系列（eval 子系统）**

@IftekharUddin 提交的 8 个 eval 系列 PR 自 7 月 20 日起持续处于 `needs-author-action` 状态，已超过一个月未合并：

- #9214 feat(eval): live execution mode with sandboxed tool surface — https://github.com/zeroclaw-labs/zeroclaw/pull/9214
- #9217 refactor(eval): async Grader trait wired through the runner — https://github.com/zeroclaw-labs/zeroclaw/pull/9217
- #9219 feat(eval): workspace, budget, and json-field graders — https://github.com/zeroclaw-labs/zeroclaw/pull/9219
- #9220 feat(eval): comparable run receipts and failure transcript dumps — https://github.com/zeroclaw-labs/zeroclaw/pull/9220
- #9221 feat(eval): baseline files with paired regression gating — https://github.com/zeroclaw-labs/zeroclaw/pull/9221
- #9222 feat(eval): per-dimension LLM-judge grader — https://github.com/zeroclaw-labs/zeroclaw/pull/9222
- #9224 feat(eval): repeated live runs with pass@k — https://github.com/zeroclaw-labs/zeroclaw/pull/9224
- #9248 feat(eval): append-only run-history receipts — https://github.com/zeroclaw-labs/zeroclaw/pull/9248

该系列构成完整的 eval 能力栈（live 执行、异步 grader、回归门禁、LLM judge），若长期搁置可能导致分支冲突加剧与功能延迟。

**等待维护者审查的高风险 RFC**

- #8780（Gemini Live 实时语音，评论 19，风险 high）— https://github.com/zeroclaw-labs/zeroclaw/issues/8780
- #8396（线协议一等公民，评论 13，风险 high）— https://github.com/zeroclaw-labs/zeroclaw/issues/8396
- #9998（会话级持久提示附件，风险 high）— https://github.com/zeroclaw-labs/zeroclaw/issues/9998
- #10050（网关逐字发送，风险 high）— https://github.com/zeroclaw-labs/zeroclaw/issues/10050

**被阻塞的 PR**

- **#10070 feat(tools): gate file_download against SSRF with private-host opt-in** — 标记 `status:blocked` 与 `do-not-merge`，SSRF 加固的首个切片，等待前置条件解除。链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10070

- **#9584 feat(cli): add the egress grant ceremony to plugin install and list** — 依赖 #9582，属于插件出口策略第三阶段，XL 规模，风险 high。链接：https://github.com/zeroclaw-labs/zeroclaw/pull/9584

**长期未更新的 Tracker**

- **#9459 [Tracker]: v0.8.5 finite weekly stabilization line** — 创建于 7 月 27 日，评论 0，8 月 4 日已冻结 intake，8 月 30 日截止。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/9459

---

**项目健康度总结**：Zeroclaw 处于功能快速扩张与安全加固并行的高活跃阶段，社区参与度良好（RFC 多轮迭代、评论深入）。主要风险在于：① 维护者审查队列积压（多个 high-risk RFC 等待决策）；② eval 系列 PR 长期未合并可能产生技术债；③ 桌面端 S0 级取消操作缺陷需要优先修复。建议维护者优先处理 #10379（S0 体验）、#8780/#8396（架构决策）与 eval 系列 PR 的合并策略。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-27

## 1. 今日速览

过去 24 小时 PicoClaw 项目保持**中等活跃度**：共 7 条 Issue 更新（5 条活跃/新开，2 条关闭），5 条 PR 更新（2 条待合并，3 条已合并/关闭），无新版本发布。社区反馈集中在 **Slack 媒体上传失败**、**Web UI 输入延迟**、**IRC 长消息支持**等方向；3 个 PR 被合并/关闭，表明维护者正在持续消化积压修复。今日新增 1 条 Issue（#3346，RKLLM 模型异常回复），需关注 ARM 端侧推理场景的稳定性。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日有 3 个 PR 被合并/关闭，对应多个历史 Issue 的修复落地：

| PR | 内容 | 对应 Issue | 状态 |
|---|---|---|---|
| [#3316](https://github.com/sipeed/picoclaw/pull/3316) | **修复路由代理的上下文管理**：dispatch rules 路由到非默认 agent 时，历史记录、摘要、自动压缩和 seahorse 引导均未生效的问题 | #3301 | 已合并 |
| [#3315](https://github.com/sipeed/picoclaw/pull/3315) | **支持 Telegram 私有机器人聊天中的话题（topic）**：此前仅识别 `Chat.IsForum`，现补充 `IsTopicMessage` 场景 | — | 已合并 |
| [#3314](https://github.com/sipeed/picoclaw/pull/3314) | **修复 `customAllowPatterns` 不生效**：默认拒绝规则优先级过高，导致 `git push` 等命令即使加入白名单仍被拦截 | — | 已合并 |

**整体评估**：这 3 个合并分别覆盖了**上下文管理**、**渠道兼容性**和**命令白名单**三个方向，说明项目在修复社区反馈的实质性 bug 上保持节奏，尤其是 #3316 解决了多 agent 路由场景下的核心体验问题。

---

## 4. 社区热点

### 最活跃 Issue：#3287 — IRC 长消息支持（8 条评论）
[#3287](https://github.com/sipeed/picoclaw/issues/3287)（@superuser-does，创建于 2026-07-22）

> 诉求：IRCv3 协议下，超过 512 字节的消息会被客户端自动拆分，PicoClaw 应将拆分后的片段视为**同一条完整消息**，而非多条独立消息。

**分析**：这是 IRC 渠道的协议级体验问题，评论数最多（8 条），说明 IRC 用户群体对此有明确需求。该 Issue 已存在超过一个月，且被标记为 `stale`，建议维护者评估是否纳入近期迭代。

### 次活跃 Issue：#3281 — Web UI 输入延迟（7 条评论，1 👍）
[#3281](https://github.com/sipeed/picoclaw/issues/3281)（@xpader，创建于 2026-07-21）

> 复现路径：Web UI 中会话历史较长时，输入框出现明显卡顿。

**分析**：该问题直接影响 Web 端日常使用体验，且获得用户 👍 认可，属于**高频痛点**。已存在超过一个月，建议优先排查前端渲染或状态管理瓶颈。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 🔴 高 | [#3338](https://github.com/sipeed/picoclaw/issues/3338) | **Slack 媒体上传完全失败**：`SendMedia` 未设置 `FileSize`，slack-go SDK 在发起网络请求前即拒绝（`file size cannot be 0`） | 已有修复 PR [#3340](https://github.com/sipeed/picoclaw/pull/3340) 待合并 |
| 🟠 中 | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | **Web UI 输入延迟**：历史记录较长时输入卡顿 | 待处理 |
| 🟠 中 | [#3339](https://github.com/sipeed/picoclaw/issues/3339) | **Antigravity 生成请求返回 429**：OAuth 认证和模型发现均正常，但所有生成请求被限流 | 待处理 |
| 🟠 中 | [#3346](https://github.com/sipeed/picoclaw/issues/3346) | **RKLLM 模型回复异常**：ARM 开发板上 Qwen3.5-0.8B_w4 输出异常（今日新增） | 待处理 |
| 🟢 低 | [#3301](https://github.com/sipeed/picoclaw/issues/3301) | `/clear` 和自动压缩在路由代理中失效 | 已关闭（#3316 已修复） |
| 🟢 低 | [#3328](https://github.com/sipeed/picoclaw/issues/3328) | `line.settings.webhook_host/port` 配置项无消费者 | 已关闭（#3329 已修复） |

**关键信号**：Slack 媒体上传问题有明确的修复 PR（#3340）但尚未合并，建议维护者尽快 review 合并，避免该渠道功能持续不可用。

---

## 6. 功能请求与路线图信号

| 请求 | 来源 | 分析 |
|---|---|---|
| **IRC 长消息合并支持** | [#3287](https://github.com/sipeed/picoclaw/issues/3287) | 协议层体验优化，评论活跃，但已 stale。若 IRC 是重点渠道，建议纳入路线图 |
| **Telegram 私有聊天话题支持** | [#3315](https://github.com/sipeed/picoclaw/pull/3315) | **已合并**，说明项目对渠道兼容性请求响应积极 |
| **LINE webhook 配置告警** | [#3329](https://github.com/sipeed/picoclaw/pull/3329) | 待合并 PR，将无效配置从"静默忽略"改为"显式告警"，属于配置可观测性改进 |

**路线图判断**：项目当前更倾向于**修复既有功能缺陷**，而非快速扩展新功能。IRC 长消息支持是唯一较大的功能请求，若社区持续推动，有可能进入下一版本规划。

---

## 7. 用户反馈摘要

从今日活跃的 Issue 评论中提炼：

- **Web UI 性能是核心痛点**（#3281）：用户明确表示"历史稍长就卡顿"，影响日常聊天使用，且该问题已持续一个月未解决，用户耐心可能正在消耗。
- **Slack 渠道功能受损**（#3338）：媒体上传完全不可用，用户已主动提交修复 PR（#3340），说明社区具备自修复能力，但需要维护者及时响应。
- **配置项存在"假文档"问题**（#3328）：`webhook_host/port` 有默认值、有文档，但代码中无人读取，用户发现后提交了修复 PR（#3329）。这类问题损害项目文档可信度。
- **端侧部署场景受关注**（#3346）：RKLLM 在 ARM 开发板上的异常回复表明有用户在尝试边缘端部署，这是值得关注的落地场景。

---

## 8. 待处理积压

以下 Issue/PR 长期未得到有效响应，提醒维护者关注：

| 项目 | 创建时间 | 搁置时长 | 备注 |
|---|---|---|---|
| [#3287](https://github.com/sipeed/picoclaw/issues/3287) IRC 长消息支持 | 2026-07-22 | 36 天 | 8 条评论，已 stale，社区讨论充分但无维护者回应 |
| [#3281](https://github.com/sipeed/picoclaw/issues/3281) Web UI 输入延迟 | 2026-07-21 | 37 天 | 7 条评论，1 👍，高频痛点，无维护者介入 |
| [#3329](https://github.com/sipeed/picoclaw/pull/3329) LINE webhook 配置告警 | 2026-08-11 | 16 天 | 已 stale，修复 #3328 的 PR 待合并 |
| [#3340](https://github.com/sipeed/picoclaw/pull/3340) Slack 媒体上传修复 | 2026-08-17 | 10 天 | 对应 #3338，功能完全不可用，建议优先合并 |

**维护建议**：优先处理 #3340（Slack 功能恢复）和 #3281（Web UI 性能），两者均为直接影响用户日常使用的阻塞性问题；#3287 和 #3329 可安排进入下一迭代计划。

---

*本日报由 AI 助手基于 GitHub 公开数据自动生成，仅供参考。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-27

## 1. 今日速览

过去24小时项目保持高活跃度：**31条Issue更新**（新开/活跃16，关闭15）、**42条PR更新**（待合并14，合并/关闭28），无新版本发布。社区讨论热度集中在**多步骤任务中断**（#6921，11条评论）、**微信频道思考过程设置失效**（#7258）以及**QwenPaw Hub多租户版路线图**（#7318）等话题。今日合并的PR以**测试基建强化**（覆盖率提升、CI并行分片）和**稳定性修复**（workspace清理、console后台任务跟踪）为主，同时钉钉群聊共享上下文、Token Usage趋势图等用户可见功能已合入。整体来看，项目处于**功能迭代与质量加固并行**的健康状态，但仍有若干高影响Bug（如#7311工具全部损坏、#7298 TLS栈过旧）等待修复。

---

## 2. 版本发布

过去24小时内无新版本发布。

---

## 3. 项目进展

今日合并/关闭的PR共28条，以下为重要变更：

### 稳定性与生命周期
- **[#7194] fix(workspace): make startup failure cleanup cancellation-safe** — 修复工作区启动失败时的清理竞态，确保取消操作不会留下半构造/半启动的服务。由 @jinliyl 提交。
  https://github.com/agentscope-ai/QwenPaw/pull/7194
- **[#7319] refactor(console): track background agent runs** — 将 `/console/chat/task` 路由纳入 TaskTracker 管理，使后台 `submit_to_agent` 和 `spawn_subagent` 运行支持状态查询、停止、重载归属及Console重连。由 @zhijianma 提交。
  https://github.com/agentscope-ai/QwenPaw/pull/7319

### 测试与CI基建（今日重点）
- **[#7250] fix(scripts): local test runner skips suites and reports false success** — 修复 `scripts/run_tests.py` 跳过根级测试文件、静默漏测并误报成功的问题。由 @yutai78786 提交。
  https://github.com/agentscope-ai/QwenPaw/pull/7250
- **[#7292] test(coverage): add 19 unit test files (+5.02pp coverage)** — 新增19个单元测试文件（1,148个测试），后端覆盖率从58.04%提升至63.06%；同时修复 `/root` 被误判为系统目录的问题。由 @yutai78786 提交。
  https://github.com/agentscope-ai/QwenPaw/pull/7292
- **[#7325] test(console): expand console unit tests (+382 cases, +5.49pp)** — 为Console前端新增382个vitest用例，覆盖历史缺陷路径。由 @yutai78786 提交。
  https://github.com/agentscope-ai/QwenPaw/pull/7325
- **[#7326] feat(ci): split nightly E2E into three parallel priority shards + fail-closed summary** — 将夜间E2E拆分为p0/p1/p2三个并行分片，并改为fail-closed模式，超时或失败不再静默通过。由 @yutai78786 提交。
  https://github.com/agentscope-ai/QwenPaw/pull/7326
- **[#7293] feat(ci): split tests.yml integration tests into three parallel shards** — 将集成测试按优先级拆分为三个并行分片，缩短CI耗时。由 @yutai78786 提交。
  https://github.com/agentscope-ai/QwenPaw/pull/7293

### 功能增强
- **[#7219] feat(console): show all-agent LLM and tool-call trend on Token Usage** — 在设置→Token用量页新增全Agent的LLM调用与工具调用趋势图，后端新增 `GET /api/agent-stats/llm-tool-trend` 接口。由 @yuanxs21 提交。
  https://github.com/agentscope-ai/QwenPaw/pull/7219
- **[#7208] feat(dingtalk): support shared session context in group chats** — 钉钉群聊支持共享会话上下文模式，默认仍按成员隔离，可为指定群开启共享。由 @hongxicheng 提交。
  https://github.com/agentscope-ai/QwenPaw/pull/7208

### Provider与模型
- **[#7277] fix(providers): refresh Aliyun and Kimi model catalogs** — 刷新Kimi、阿里云Token Plan和Coding Plan的内置模型目录，移除已退役模型ID，补充新模型。由 @wangfei010313 提交。
  https://github.com/agentscope-ai/QwenPaw/pull/7277

### 数据应用
- **[#7190] feat(qwenpaw-data): PyPI runtime path, docker-compose one-shot demo, and env inheritance fix** — qwenpaw-data应用支持通过 `pip install qwenpaw[qwenpaw-data]` 安装运行，并提供docker-compose一键演示栈（Neo4j + PostgreSQL）。由 @cyruszhang 提交。
  https://github.com/agentscope-ai/QwenPaw/pull/7190

**整体评估**：今日项目在**测试覆盖率**（后端+5.02pp、前端+5.49pp）和**CI效率**（并行分片）上迈出显著一步，同时修复了本地测试运行器误报成功这一流程隐患。功能侧，钉钉共享上下文和Token用量趋势图直接回应用户此前诉求，模型目录的刷新也保持了与上游的一致性。

---

## 4. 社区热点

### 讨论最活跃的Issue

- **[#6921] [Bug] 多步骤任务经常无提示停止，需说“继续”才继续**（11条评论）
  用户 @rerbin 报告在Windows 11上执行多步骤任务时，模型输出“Now 2.1, 3.1, 3.2. Let me do all three.”等规划性消息后便停止，无任何视觉提示，必须手动说“继续”才能推进。该问题自8月12日创建以来持续活跃，评论数居今日之首，反映**任务自主执行可靠性**是用户核心痛点。
  https://github.com/agentscope-ai/QwenPaw/issues/6921

- **[#7258] [Bug] 微信频道“不显示思考过程”设置无效**（6条评论）
  用户 @rerbin 反馈在QwenPaw 2.1 Web版中，微信频道即使关闭“显示思考过程”，实际仍输出思考内容。该问题已关闭，但讨论热度高。
  https://github.com/agentscope-ai/QwenPaw/issues/7258

- **[#6810] [Bug] Windows安装/更新时文件被占用导致报错**（5条评论）
  用户 @0959linger 详细描述了v2.1.0b1自动更新卡死、b2安装时NSIS连续弹出多个“无法打开要写入的文件”错误的现象，根因是浏览器扩展NM host锁文件。该问题已关闭，但安装体验问题仍值得关注。
  https://github.com/agentscope-ai/QwenPaw/issues/6810

- **[#6490] [Feature] 添加Volcengine Agent Plan和Xiaomi MiMo Standard API为内置Provider**（5条评论）
  用户 @TinyBai 提议新增两个内置Provider，并修复现有provider的若干问题。该Issue已关闭，推测相关支持已合入。
  https://github.com/agentscope-ai/QwenPaw/issues/6490

- **[#7318] [Discussion] QwenPaw Hub多租户版将于2.2.0推出：你希望我们接下来做什么？**（4条评论）
  官方发起讨论，征集社区对多租户Hub的功能建议，关联了#2324、#5780、#4702等多个历史多用户需求。这是**路线图层面的重要信号**。
  https://github.com/agentscope-ai/QwenPaw/issues/7318

- **[#7177] [Feature] 优化 platform.agentscope.io/deploy 首页**（4条评论）
  用户 @rerbin 提出移动端操作便捷性问题，包括入口位置、按钮顺序等UI/UX建议。已关闭。
  https://github.com/agentscope-ai/QwenPaw/issues/7177

- **[#7306] [Bug] 输入框多行内容时焦点自动下移**（4条评论）
  用户 @xiaohushi512 报告在2.1.0 Windows版中，多行输入时焦点会异常下移一行。该问题仍开放。
  https://github.com/agentscope-ai/QwenPaw/issues/7306

### 分析
社区热点集中在三类诉求：**① 任务执行的自主性与可靠性**（#6921）；**② 多端体验一致性**（#7258微信、#7177移动端）；**③ 多用户/团队部署能力**（#7318及关联Issue）。其中#7318作为官方主动发起的讨论，预计将吸引大量企业用户参与，是观察2.2.0功能优先级的重要窗口。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 严重（影响核心功能）

- **[#7311] v2.1.1b2 缺少 `_qwenpaw_remote_backend` 模块，所有工具不可用**
  用户 @liuhu8207 报告在Windows 10上，所有Agent工具报 `ModuleNotFoundError: No module named '_qwenpaw_remote_backend'`，重装无效。该问题会导致桌面版核心功能瘫痪，**目前无对应fix PR**。
  https://github.com/agentscope-ai/QwenPaw/issues/7311

- **[#7298] Desktop和Docker捆绑的OpenSSL 3.0.x TLS栈导致运营商DPI重置握手**
  用户 @LUOSENGWA 报告桌面版（Tauri）和Docker镜像均携带Python 3.11时代的OpenSSL 3.0.x，在部分运营商网络下TLS握手被DPI重置，且桌面版无规避方案。**已有fix PR [#7328]**（将捆绑Python升级至3.13，TLS栈升至OpenSSL 3.5.x），目前待合并。
  https://github.com/agentscope-ai/QwenPaw/issues/7298
  https://github.com/agentscope-ai/QwenPaw/pull/7328

### 🟠 高（影响特定场景）

- **[#7296] OpenAI Responses多轮对话报400 “Referenced reasoning item not found or has expired”**
  用户 @huajiao1998 报告在无状态上游（OpenCode Zen/Go Muse Spark）上，Responses-API推理模型的第二轮对话即失败。**无对应fix PR**。
  https://github.com/agentscope-ai/QwenPaw/issues/7296

- **[#6921] 多步骤任务无提示停止**（详见社区热点）— **无对应fix PR**。
  https://github.com/agentscope-ai/QwenPaw/issues/6921

- **[#7193] Agent自动搜索记忆时错乱，串到同一Agent另一会话**
  用户 @rerbin 报告在2.1网页版中，Agent暂停后说“继续完成未完成的任务”时，搜索到了另一会话的内容。**无对应fix PR**。
  https://github.com/agentscope-ai/QwenPaw/issues/7193

### 🟡 中（影响体验或特定环境）

- **[#7312] Windows下 `execute_shell_command` 因继承stdin管道而挂起**
  用户 @sergmsv33-lab 报告在Windows 11上执行Python解释器时挂起，根因是缺少 `stdin=DEVNULL`。**无对应fix PR**。
  https://github.com/agentscope-ai/QwenPaw/issues/7312

- **[#7305] 自定义OpenAI兼容Provider模型发现成功但不自动填充**
  用户 @elain0205 报告2.1.1b3中，自定义Provider的 `/models` 发现成功，但模型ID选择器仍显示误导信息。**已有fix PR [#7320]**（恢复自定义Provider的自动模型发现），待合并。
  https://github.com/agentscope-ai/QwenPaw/issues/7305
  https://github.com/agentscope-ai/QwenPaw/pull/7320

- **[#7310] 疑似插件冲突导致软件崩溃**
  用户 @cmhaoso 报告datapaw插件运行时缺失导致启动报错，禁用后临时解决，但应用仍可能卡死。**无对应fix PR**。
  https://github.com/agentscope-ai/QwenPaw/issues/7310

- **[#7306] 输入框多行焦点异常**（详见社区热点）— **无对应fix PR**。
  https://github.com/agentscope-ai/QwenPaw/issues/7306

- **[#7212] 图片像素超限导致请求崩溃而非优雅降级**（已关闭）
  https://github.com/agentscope-ai/QwenPaw/issues/7212

- **[#7206] v2.1.1-beta.1 手动 `/compact` 在 `compact_threshold_ratio == 0.9` 时必现pydantic ValidationError**（已关闭，确认回归）
  https://github.com/agentscope-ai/QwenPaw/issues/7206

- **[#7229] 本地测试运行器跳过套件并误报成功**（已关闭，fix PR #7250已合并）
  https://github.com/agentscope-ai/QwenPaw/issues/7229

### 🟢 低（轻微问题）

- **[#7321] 工具调用已结束但界面仍显示“执行中”**
  https://github.com/agentscope-ai/QwenPaw/issues/7321
- **[#7324] 定时任务执行成功后收件箱缺失部分推送消息**
  https://github.com/agentscope-ai/QwenPaw/issues/7324
- **[#7258] 微信频道“不显示思考过程”设置无效**（已关闭）
  https://github.com/agentscope-ai/QwenPaw/issues/7258
- **[#7282] Console Markdown列表垂直间距过大**（已关闭）
  https://github.com/agentscope-ai/QwenPaw/issues/7282

---

## 6. 功能请求与路线图信号

### 明确的路线图信号

- **[#7318] QwenPaw Hub多租户版将于2.2.0推出** — 官方主动征集社区建议，关联多个历史多用户需求（#2324、#5780、#4702、#6335）。这确认了**多租户/团队管理**是下一版本的核心方向。
  https://github.com/agentscope-ai/QwenPaw/issues/7318

### 可能被纳入后续版本的需求

- **[#7252] OpenViking-backed长期记忆后端** — 用户提议基于现有 `BaseMemoryManager` 架构增加OpenViking后端。目前已有类似方向的PR **[#7080] PowerContext可插拔长期记忆后端**（first-time-contributor，Under Review），说明**可插拔记忆后端**正在推进中。
  https://github.com/agentscope-ai/QwenPaw/issues/7252
  https://github.com/agentscope-ai/QwenPaw/pull/7080

- **[#7279] 模型返回多个选项时用弹窗点选而非手动输入** — 用户 @rerbin 对比Hesmes的交互后提出，2.1.1 beta2中该体验不佳。属于**交互细节优化**，实现成本较低。
  https://github.com/agentscope-ai/QwenPaw/issues/7279

- **[#7280] 执行完成的后台任务自动清除** — 用户希望增加自动清除或提供设置项。属于**Console体验优化**。
  https://github.com/agentscope-ai/QwenPaw/issues/7280

- **[#7188] Windows卸载时“删除本地应用缓存”选项增加说明** — 用户希望悬停提示选中/不选中的影响。属于**安装体验优化**。
  https://github.com/agentscope-ai/QwenPaw/issues/7188

- **[#7158] 钉钉群聊上下文模式可配置** — 该需求已通过今日合并的PR [#7208] 实现（支持共享会话上下文），说明**社区反馈到功能落地周期较短**。
  https://github.com/agentscope-ai/QwenPaw/issues/7158
  https://github.com/agentscope-ai/QwenPaw/pull/7208

- **[#6490] Volcengine Agent Plan和Xiaomi MiMo Standard API内置Provider** — 该Issue已关闭，推测相关支持已合入或排期。
  https://github.com/agentscope-ai/QwenPaw/issues/6490

### 长期积累的多用户需求
- [#5780] Multi-user account management for team use（7月5日创建）
- [#4702] 考虑RBAC管理员多用户吗？（5月26日创建）
- [#6335] 多用户使用（7月22日创建）
  这些需求均指向**企业级多租户能力**，与2.2.0 Hub方向一致，预计将在后续版本集中释放。
  https://github.com/agentscope-ai/QwenPaw/issues/5780
  https://github.com/agentscope-ai/QwenPaw/issues/4702
  https://github.com/agentscope-ai/QwenPaw/issues/6335

---

## 7. 用户反馈摘要

### 真实痛点

- **任务自主执行不可靠**（#6921）：用户 @rerbin 多次遇到Agent规划完下一步就停止，需要手动“继续”。这直接影响**多步骤任务的自动化体验**，是当前最突出的可用性问题之一。
  https://github.com/agentscope-ai/QwenPaw/issues/6921

- **渠道设置不一致**（#7258）：微信频道忽略“不显示思考过程”设置，用户对**多端行为一致性**有明确期待。
  https://github.com/agentscope-ai/QwenPaw/issues/7258

- **Windows安装/更新体验差**（#6810）：文件锁导致安装失败、报错信息不明确，用户 @0959linger 详细记录了NSIS连续弹窗的过程。安装流程的**健壮性和提示清晰度**需要改进。
  https://github.com/agentscope-ai/QwenPaw/issues/6810

- **输入框焦点异常**（#7306）：多行输入时焦点自动下移，影响**高频打字场景**的流畅度。
  https://github.com/agentscope-ai/QwenPaw/issues/7306

- **定时任务推送不可靠**（#7324）：3条定时任务成功但只收到2条推送，用户对**通知可靠性**产生疑虑。
  https://github.com/agentscope-ai/QwenPaw/issues/7324

- **文件分类上传不符合预期**（#7322）：在知识库分类下上传文件却落到工作区根目录，用户 @andyhau520 明确询问是Bug还是设计如此，说明**信息架构的直观性**有待提升。
  https://github.com/agentscope-ai/QwenPaw/issues/7322

### 使用场景与期望

- **团队部署需求强烈**（#7318、#5780、#4702、#6335）：多位用户提出公司内部署、多账号管理、RBAC等需求，使用场景从个人助手向**团队协作平台**延伸。
- **交互效率优先**（#7279、#7280）：用户希望减少手动输入、自动清理已完成任务，追求**更少的操作步骤**。
- **移动端体验受关注**（#7177）：用户 @rerbin 多次提到手机上的操作便捷性问题，说明**移动端使用比例不低**。

### 满意/亮点

- 用户对**功能迭代速度**总体认可，如钉钉共享上下文从Issue（#7158，8月20日）到PR合并（#7208，8月26日）仅用6天。
- 测试覆盖率的持续提升（#7292、#7325）虽不直接可见，但有助于减少回归，长期利好用户体验。

---

## 8. 待处理积压

### 高优先级（影响核心体验，需尽快响应）

- **[#6921] 多步骤任务无提示停止** — 创建于8月12日，11条评论，至今无fix PR。这是当前**评论最多、用户影响面最广**的未解决问题。
  https://github.com/agentscope-ai/QwenPaw/issues/6921

- **[#7311] v2.1.1b2 缺少 `_qwenpaw_remote_backend`，所有工具损坏** — 创建于8月26日，严重程度高，需紧急确认是否为打包回归。
  https://github.com/agentscope-ai/QwenPaw/issues/7311

- **[#7298] OpenSSL 3.0.x TLS栈问题** — 创建于8月25日，已有fix PR [#7328] 但尚未合并，建议加速review。
  https://github.com/agentscope-ai/QwenPaw/issues/7298
  https://github.com/agentscope-ai/QwenPaw/pull/7328

- **[#7193] Agent搜索记忆错乱** — 创建于8月21日，涉及记忆隔离的正确性，建议优先排查。
  https://github.com/agentscope-ai/QwenPaw/issues/7193

### 中优先级（影响特定场景）

- **[#7296] OpenAI Responses多轮400错误** — 创建于8月25日，影响使用无状态上游的用户。
  https://github.com/agentscope-ai/QwenPaw/issues/7296
- **[#7312] Windows stdin管道挂起** — 创建于8月26日，影响Windows下执行shell命令的场景。
  https://github.com/agentscope-ai/QwenPaw/issues/7312
- **[#7305] 自定义Provider模型不自动填充** — 已有fix PR [#7320]，待合并。
  https://github.com/agentscope-ai/QwenPaw/issues/7305
  https://github.com/agentscope-ai/QwenPaw/pull/7320

### 长期未响应的PR（需维护者关注）

- **[#7080] PowerContext可插拔长期记忆后端** — 创建于8月17日，first-time-contributor，Under Review状态已持续10天。该PR与#7252功能请求直接相关，建议明确反馈。
  https://github.com/agentscope-ai/QwenPaw/pull/7080

- **[#6936] 修复字符串类型工具参数被JSON数字强制转换** — 创建于8月12日，Under Review状态已持续15天。该问题影响工具调用的健壮性。
  https://github.com/agentscope-ai/QwenPaw/pull/6936

- **[#7237] fix(console): freeze session identity for chat sends** — 创建于8月24日，修复会话切换时的消息路由竞态，建议尽快review。
  https://github.com/agentscope-ai/QwenPaw/pull/7237

---

**总结**：QwenPaw在2026-08-27展现出健康的社区活跃度和交付节奏，测试基建的强化为长期质量奠定基础。短期需重点关注**#7311（工具全部损坏）**和**#7298（TLS栈过旧）**两个高影响Bug的修复进度，同时#6921（任务自主停止）作为社区呼声最高的问题，建议纳入近期迭代计划。多租户Hub（2.2.0）的讨论已启动，预计将成为下一阶段社区贡献的主要方向。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-27

## 1. 今日速览

过去24小时项目活跃度极高：共产生468条Issue更新（新开/活跃343条，关闭125条）和500条PR更新（待合并344条，已合并/关闭156条）。Issue与PR的更新量均处于高位，但PR合并率仅31.2%，待合并PR积压明显。今日无新版本发布，项目处于密集开发与问题修复并行阶段。值得关注的是，大量Issue集中在安装更新、会话状态、MCP工具链三大领域，且多个P1级Bug（如xAI保留函数名冲突、MCP stdio快速失败、state.db损坏）正在被多个PR定向修复，项目健康度整体可控但存在系统性技术债。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

过去24小时有156条PR被合并/关闭，虽未展示具体合并列表，但从当前开放的PR中可以清晰看到项目正在推进以下关键方向：

- **MCP工具链修复**：PR #96002（[fix(mcp): stop stripping ecc-memory-mcp's tools/list and ping calls](https://github.com/NousResearch/hermes-agent/pull/96002)）修复MCP SDK 2.0升级后无条件注入`_meta`键导致部分旧版MCP服务器拒绝请求的问题；PR #96000（[fix(tools): rebuild DaemonThreadPoolExecutor on public Executor ABC](https://github.com/NousResearch/hermes-agent/pull/96000)）适配CPython 3.14对`ThreadPoolExecutor`私有方法的重构。

- **配置系统健壮性**：Aoshi-Dev 提交了一系列配置相关修复，包括PR #96003（[refuse to overwrite an unparseable config.yaml on save](https://github.com/NousResearch/hermes-agent/pull/96003)）、PR #96004（[key_env beats inline api_key for legacy custom_providers](https://github.com/NousResearch/hermes-agent/pull/96004)）、PR #96006（[warn on stderr when .env corruption repair cannot be written](https://github.com/NousResearch/hermes-agent/pull/96006)），这些修复直指配置丢失、凭据轮换失效、环境变量损坏静默失败等用户高频痛点。

- **CLI体验升级**：PR #95999（[feat(cli): /queue prompts are now listable, editable, and reorderable](https://github.com/NousResearch/hermes-agent/pull/95999)）将Factory Droid v0.203的"编辑排队消息"能力移植到Hermes CLI，使`/queue`从fire-and-forget变为可管理。

- **桌面端修复**：PR #95956（[collapsed panes must always leave a visible way back](https://github.com/NousResearch/hermes-agent/pull/95956)）修复了折叠面板后无法找回的UX缺陷；PR #96007（[roam pet overlay across desktop surfaces](https://github.com/NousResearch/hermes-agent/pull/96007)）让宠物浮层遵循Roam偏好设置。

- **安全加固**：PR #95240（[scan shell payloads behind bundled -c in the lifecycle guard](https://github.com/NousResearch/hermes-agent/pull/95240)）修复了`-c`短选项捆绑（如`bash -lc`）导致安全扫描绕过的问题；PR #94878（[compose child boundary and profile provenance](https://github.com/NousResearch/hermes-agent/pull/94878)）提出profile权限边界加固候选方案。

整体来看，项目正在系统性地解决安装更新、配置管理、MCP兼容性三大积压问题，且修复质量较高（多为根因修复而非打补丁）。

## 4. 社区热点

今日讨论最活跃的Issue和PR反映了社区的核心诉求：

- **[#66616 Skills index is stale or degraded](https://github.com/NousResearch/hermes-agent/issues/66616)**（103条评论）：自动化探针检测到Skills索引已29.8小时未更新（限制26小时），状态为`degraded`。该问题持续活跃一个多月，社区对文档/技能索引的可靠性表示担忧，且该问题被标记为`sweeper:risk-automation`，说明自动化运维本身存在风险。

- **[#88584 Automated Nous integration is blocked](https://github.com/NousResearch/hermes-agent/issues/88584)**（34条评论）：Nous-to-Enterkey的定时合并因`cron/jobs.py`冲突被阻塞，dashboard更新器停留在旧版本。这反映了跨仓库自动化集成的脆弱性。

- **[#91277 Fleet update reliability: one deployment plan](https://github.com/NousResearch/hermes-agent/issues/91277)**（22条评论）：teknium1提出的跟踪Issue，指出安装/更新是"最不可靠的能力"，约30个开放Issue和15个开放PR都在修补同一类问题。社区对统一部署方案的呼声很高。

- **[#52010 macOS Full Disk Access revoked after every update](https://github.com/NousResearch/hermes-agent/issues/52010)**（22条评论）：macOS用户每次更新桌面应用后都需要重新授予完全磁盘访问权限，这是一个持续两个月的痛点，涉及代码签名与TCC权限的深层冲突。

- **[#87093 Debian installation broken; uv.lock & npm install failed](https://github.com/NousResearch/hermes-agent/issues/87093)**（21条评论，👍4）：Debian 13.6上安装脚本失败，uv.lock同步错误。安装问题是社区最直接的痛点。

**社区诉求分析**：安装/更新的可靠性、macOS权限持久化、自动化运维的稳定性是社区最关心的三大问题。用户对"每次更新都要重新授权"和"安装脚本频繁失败"表现出明显不满。

## 5. Bug 与稳定性

按严重程度排列今日值得关注的Bug：

**P1级（严重）**

- **[#95003 xAI rejects requests: function name tool_search is reserved](https://github.com/NousResearch/hermes-agent/issues/95003)**（👍8）：xAI API拒绝所有包含`tool_search`函数名的请求，导致Grok提供商完全不可用。这是与上游API的兼容性冲突，需要快速适配。

- **[#94335 _stdio_children_dead() inverted liveness check](https://github.com/NousResearch/hermes-agent/issues/94335)**：MCP stdio调用在oneshot（-z）会话中全部快速失败，原因是`_stdio_children_dead()`的存活检查逻辑反转——活着的子进程被判定为"全部死亡"。已有相关PR #96002在修复MCP层问题。

- **[#94637 MCP stdio tool calls always fast-fail after #85125](https://github.com/NousResearch/hermes-agent/issues/94637)**：Windows 11上所有stdio传输的MCP服务器（ADO、GBrain、chrome-devtools）都报"subprocess has exited"。与#94335同源，均为#85125引入的fail-fast机制缺陷。

- **[#90950 state.db corruption recurs on SQLite 3.53.1](https://github.com/NousResearch/hermes-agent/issues/90950)**：SQLite WAL sidecar在并发写入时被错误unlink，导致state.db反复损坏，影响builder和reviewer两个profile。PR #96011（[identify state.db holders by dev+inode](https://github.com/NousResearch/hermes-agent/pull/96011)）正在修复路径字符串比较的根因。

- **[#89346 shared primary profile routes reload session history from root store](https://github.com/NousResearch/hermes-agent/issues/89346)**：共享主profile路由到次级profile后，会话历史从根存储加载，造成会话分裂。这是#88734修复引入的回归。

- **[#92145 hermes update leaves running services on stale sys.modules](https://github.com/NousResearch/hermes-agent/issues/92145)**：更新过程中auto-restart阶段遇到ImportError时，运行中的服务继续使用旧的`sys.modules`，导致更新不完整。

**P2级（中等）**

- **[#90473 "Show earlier messages" paging is a broken UX](https://github.com/NousResearch/hermes-agent/issues/90473)**：长会话（~900条消息）中"显示更早消息"的分页体验极差，用户直接吐槽"这设计是哪个傻逼做的"。

- **[#87697 Hermes Client cancels local LLM streams after ~1.5s](https://github.com/NousResearch/hermes-agent/issues/87697)**：本地Ollama后端的流式请求在1.5秒后被客户端取消，触发`<unused49>` token循环。

- **[#95189 Gateway exits uncleanly every ~2 minutes on WSL2](https://github.com/NousResearch/hermes-agent/issues/95189)**：WSL2上gateway每2分钟异常退出一次，日志显示122次`gateway.start`，驱动渲染器OOM。

- **[#94146 Weixin live replies silently dropped after rate-limit](https://github.com/NousResearch/hermes-agent/issues/94146)**：微信渠道在限流事件后变成"只进不出"，即使重新扫码登录也无法恢复。

**P3级（较低）**

- **[#81563 macOS missing NSLocalNetworkUsageDescription](https://github.com/NousResearch/hermes-agent/issues/81563)**：缺少本地网络权限描述，导致应用无法访问局域网设备且不弹出权限提示。

- **[#92095 hermes desktop writes broken .desktop Exec= on uv-based installs](https://github.com/NousResearch/hermes-agent/issues/92095)**：uv安装的Linux系统上，.desktop文件的Exec=指向裸uv解释器而非venv python，点击图标静默失败。

**已有fix PR的Bug**：#94335/#94637（PR #96002）、#90950（PR #96011）、#92095（PR #96001）、#88361（PR #96003）、#45657（PR #96008）。

## 6. 功能请求与路线图信号

今日值得关注的功能请求和路线图信号：

- **[#68871 Add messaging support for Buzz](https://github.com/NousResearch/hermes-agent/issues/68871)**（已关闭，👍16）：Block开源的本地团队工作区Buzz引发社区兴趣，希望Hermes agent能加入Buzz房间。虽然已关闭，但16个👍表明需求真实存在，可能以插件形式在后续版本中实现。

- **[#89995 Expose Bot Mode group chat rooms in web dashboard & gateway](https://github.com/NousResearch/hermes-agent/issues/89995)**：Bot Mode群聊目前仅限桌面端，社区希望Web dashboard和gateway也能访问。这与PR #95865（[add touch-first Hermes Desktop renderer](https://github.com/NousResearch/hermes-agent/pull/95865)）的方向一致——后者正在将桌面渲染器移植到移动端。

- **[#95028 Hermes Authority Execution Layer](https://github.com/NousResearch/hermes-agent/issues/95028)** 和 **[#95750 Refusal Algebra](https://github.com/NousResearch/hermes-agent/issues/95750)**：两个架构级提案，主张将12个相关Issue归纳为一个根本缺陷，并提出类型化语义边界。这类提案短期内不会落地，但反映了社区对系统性重构的期待。

- **PR #83386（[add managed profile control plane](https://github.com/NousResearch/hermes-agent/pull/83386)）**：为API服务器添加可选的profile管理控制面，支持命名profile、profile级技能和allowlist文件的确定性协调。这可能是解决profile相关一系列问题的基础设施。

- **PR #95620（[real-profile browsing no longer breaks on Chrome 136+](https://github.com/NousResearch/hermes-agent/pull/95620)）**：通过复制Chrome profile认证状态到托管快照，让agent能以用户真实登录态浏览网页。这是Browser Use集成的重要进展。

**路线图判断**：安装/更新统一方案（#91277）是当前最高优先级的路线图项目；移动端渲染器（#95865）和真实profile浏览（#95620）是下一版本可能纳入的功能；MCP兼容性修复（#96002等）预计会随下个patch版本发布。

## 7. 用户反馈摘要

从今日Issue评论中提炼的真实用户声音：

**满意之处**

- 社区对PR #95999（/queue可管理）的移植表示认可，认为"Factory Droid的编辑排队消息功能终于来了"。
- PR #95937（terminal工具schema诚实化）的"honesty fix"获得好评，用户认为"不再假装是Linux环境"是正确方向。

**痛点与不满**

- **安装体验**（#87093）："Debian 13.6上安装直接失败，uv.lock同步错误，这让我无法开始使用。"（👍4）
- **macOS权限**（#52010）："每次更新都要重新去系统设置里授予完全磁盘访问权限，这太烦了。"（22条评论持续两个月）
- **长会话分页**（#90473）：用户原话"显示更多消息是哪个傻逼的设计？"——Windows 11桌面端900条消息的会话中，分页加载体验极差。
- **xAI不可用**（#95003）："Grok提供商完全没法用，每次请求都被拒绝，这让我考虑换回其他客户端。"（👍8）
- **MCP快速失败**（#94637）："所有stdio MCP服务器都报'subprocess has exited'，我的ADO、GBrain、chrome-devtools全部瘫痪。"
- **WSL2稳定性**（#95189）："gateway每2分钟崩溃一次，日志里122次启动记录，这简直没法用。"

**使用场景**

- 用户@dizhaky在#52010中详细描述了macOS FDA权限与Accessibility/Automation/Microphone问题的区别，说明用户对权限体系有深入理解。
- 用户@lazy-idler在#89995中描述了Bot Mode群聊的使用场景："Bots面板的成员轮转循环"是桌面端独有的功能，Web端无法访问。
- 用户@apelican123在#94146中描述了微信渠道从正常到"只进不出"的状态变化过程，提供了完整的故障时间线。

## 8. 待处理积压

以下重要Issue或PR长期未得到响应，提醒维护者关注：

- **[#42199 Request: x86_64 (Intel) macOS build for Desktop App](https://github.com/NousResearch/hermes-agent/issues/42199)**（创建于2026-06-08，👍5）：Intel Mac用户无法使用Hermes Desktop，已积压近3个月。虽然标记为duplicate，但Intel Mac用户群体仍在增长。

- **[#45657 TUI and dashboard rebuild/reinstall on every launch](https://github.com/NousResearch/hermes-agent/issues/45657)**（创建于2026-06-13）：每次启动都触发30-120秒的TUI/frontend重建，已积压2.5个月。PR #96008正在修复相关测试问题，但核心的lockfile mismatch问题仍需解决。

- **[#72488 Gemini 3.5 Flash concatenates multiple JSON objects into one tool_call](https://github.com/NousResearch/hermes-agent/issues/72488)**（创建于2026-07-27）：Gemini模型偶尔将多个JSON对象拼接在单个tool_call中，已积压1个月。这是模型兼容性问题，需要agent层做防御性解析。

- **[#81563 macOS missing NSLocalNetworkUsageDescription](https://github.com/NousResearch/hermes-agent/issues/81563)**（创建于2026-08-08）：缺少本地网络权限描述导致局域网功能静默失败，已积压近3周。修复成本低（只需在Info.plist中添加描述），但尚未有PR。

- **PR #83386（[add managed profile control plane](https://github.com/NousResearch/hermes-agent/pull/83386)）**（创建于2026-08-10）：已开放17天，标记为`needs-decision`。该PR可能是解决profile相关一系列问题的关键基础设施，需要维护者尽快决策。

---

**日报总结**：Hermes Agent项目今日处于高活跃度、高问题密度的状态。社区最迫切的诉求集中在安装/更新可靠性、macOS权限持久化、MCP工具链兼容性三大领域。项目组已通过多个针对性PR（#96001-#96006、#96011）系统性地回应这些问题，修复质量较高。建议维护者优先处理P1级Bug（#95003、#94335/#94637、#90950）的合并，并对#91277（统一部署方案）和#83386（profile控制面）做出明确决策，以缓解积压压力。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-08-27

## 今日速览

过去 24 小时 AstrBot 项目保持高度活跃：共 14 条 Issue 更新（9 条新开/活跃、5 条关闭），113 条 PR 更新（104 条已合并/关闭、9 条待合并），无新版本发布。核心维护者 @Soulter 主导了 Dashboard 重构、认证控制改进等多项 Web UI 合并，同时清理了多笔历史遗留 PR（最早可追溯至 4 月）。社区侧涌现出 Synthorai、Serply 两个新 provider 适配 PR，以及飞书混合消息丢文字、QQ 官方群会话 ID 语义不一致等平台级 Bug 反馈。整体来看，项目迭代节奏快，维护者响应及时，但多平台适配器下的会话隔离与限流问题仍是稳定性短板。

---

## 项目进展

今日合并/关闭的 PR 中，以下变更对项目推进意义较大：

- **Dashboard 机器人管理工作区重构**（[#9825](https://github.com/AstrBotDevs/AstrBot/pull/9825)，XXL，已合并）：将机器人卡片替换为响应式双栏管理工作区，编辑操作移入右侧面板，分离连接设置与会话配置，并提供新手友好的会话-人格绑定引导。这是 Web UI 的一次重要体验升级。
- **QQ 官方群路由修复**（[#9833](https://github.com/AstrBotDevs/AstrBot/pull/9833)，S，已合并）：修复 `unique_session` 下 QQ 官方群会话 ID 仅包含发送者 openid 的问题，改为 `{group_openid}_{sender_openid}` 组合，解决主动推送时 "No cached msg_id" 报错（Refs #9831）。
- **主动代理历史保留修复**（[#9818](https://github.com/AstrBotDevs/AstrBot/pull/9818)，S，已合并）：修复定时任务/后台唤醒将完整会话历史序列化进 `system_prompt` 并清空 `contexts` 的问题，避免上下文截断失效（Fixes #9763）。
- **Gemini 历史轮次保留修复**（[#9738](https://github.com/AstrBotDevs/AstrBot/pull/9738)，XS，已合并）：修正 Gemini 适配器在历史以 assistant 开头时误删当前用户轮次的问题，并补充回归测试。
- **人格文件夹删除后状态重置**（[#9832](https://github.com/AstrBotDevs/AstrBot/pull/9832)，S，已合并）：删除当前人格文件夹后自动导航至父级/根目录，并重载文件夹树。
- **Dashboard 认证控制增强**（[#9830](https://github.com/AstrBotDevs/AstrBot/pull/9830)，L，已合并）：为登录表单添加原生语义以支持浏览器凭据自动填充，新增本地化登出操作。

此外，维护者集中关闭了 9 笔 4-5 月创建的历史 PR（如钉钉扫码注册 [#8198](https://github.com/AstrBotDevs/AstrBot/pull/8198)、飞书/微信扫码配置 [#8191](https://github.com/AstrBotDevs/AstrBot/pull/8191)、ChatUI 样式重构 [#7485](https://github.com/AstrBotDevs/AstrBot/pull/7485)、MCP stdio 校验 [#7477](https://github.com/AstrBotDevs/AstrBot/pull/7477)、文件系统 grep/read/write 工作区支持 [#7402](https://github.com/AstrBotDevs/AstrBot/pull/7402) 等），表明这些长期挂起的功能已合入主线或不再适用，代码库得到有效清理。

---

## 社区热点

- **[#9741 移动端人格设定界面不显示“创建文件夹”按钮](https://github.com/AstrBotDevs/AstrBot/issues/9741)**（7 条评论，已关闭）：用户反馈在 Android Via 浏览器移动端下 Web UI 缺失关键按钮，附带三端对比截图。该 Issue 今日关闭，对应修复已通过 [#9832](https://github.com/AstrBotDevs/AstrBot/pull/9832) 合入。背后诉求是移动端 WebUI 的响应式适配与功能完整性。
- **[#9796 限流器按裸 session_id 分桶导致多平台共享配额](https://github.com/AstrBotDevs/AstrBot/issues/9796)**（3 条评论，已关闭）：用户指出 `RateLimitStage` 以 `{sender_id}_{group_id}` 为键，不包含平台实例标识，导致同一进程挂载多个平台适配器时同名会话共享限流桶和互斥锁。该问题涉及核心并发安全，虽已关闭但值得关注后续是否引入回归测试。
- **[#9816 插件 Web 面板从侧边栏独立成页](https://github.com/AstrBotDevs/AstrBot/issues/9816)**（2 👍，开放中）：用户抱怨侧边栏插件过多、拥挤且无图标，希望重新设计为完整页面。该诉求已获 2 个 👍，并有对应 PR [#9823](https://github.com/AstrBotDevs/AstrBot/pull/9823) 处于待合并状态，社区关注度较高。

---

## Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 高 | [#9796](https://github.com/AstrBotDevs/AstrBot/issues/9796) | 限流器按裸 session_id 分桶，多平台适配器下同名会话共享限流配额与锁，可能造成跨平台流量干扰 | 已关闭，未见对应 fix PR |
| 高 | [#9831](https://github.com/AstrBotDevs/AstrBot/issues/9831) | qq_official 平台 `unique_session` 下 `/sid` 返回的群会话 ID 无法用于主动推送，报 "No cached msg_id" | 已有 fix PR [#9833](https://github.com/AstrBotDevs/AstrBot/pull/9833) 已合并 |
| 中 | [#9839](https://github.com/AstrBotDevs/AstrBot/issues/9839) | 飞书平台文字+图片混合消息文字被吞，只发送图片（`_convert_to_lark` 缓冲逻辑缺陷） | 开放中，无 fix PR |
| 中 | [#9819](https://github.com/AstrBotDevs/AstrBot/issues/9819) | 关闭 LLM 后 bot 仍会主动发言，疑似插件/定时任务未遵循全局开关 | 开放中，无 fix PR |
| 中 | [#9763](https://github.com/AstrBotDevs/AstrBot/issues/9763) | 定时任务使用 dashscope API 出现 system prompt 过长（90000 tokens），重试 10 次仍失败 | 已有 fix PR [#9818](https://github.com/AstrBotDevs/AstrBot/pull/9818) 已合并 |
| 低 | [#9778](https://github.com/AstrBotDevs/AstrBot/issues/9778) | 插件清空最终 messages 后框架无空校验，空请求直发 provider 产生 400 | 已关闭，已修复 |
| 低 | [#9645](https://github.com/AstrBotDevs/AstrBot/issues/9645) | Provider 图标在暗色模式下不可见（黑色图标） | 已关闭，已修复 |
| 低 | [#9741](https://github.com/AstrBotDevs/AstrBot/issues/9741) | 移动端 Web UI 人格设定界面不显示“创建文件夹”按钮 | 已关闭，已修复 |

---

## 功能请求与路线图信号

- **Synthorai provider adapter**（[#9807](https://github.com/AstrBotDevs/AstrBot/issues/9807)）：用户请求新增 Synthorai（OpenAI/Anthropic 兼容 LLM 网关，一个 key 打通 113 个模型）。已有对应 PR [#9840](https://github.com/AstrBotDevs/AstrBot/pull/9840) 提交，按 #9659 模式实现，预计可进入下一版本。
- **Serply 网页搜索提供商**（[#9837](https://github.com/AstrBotDevs/AstrBot/issues/9837)）：用户（Serply 员工）请求新增 Serply 以获取 Google 搜索结果，弥补现有六个提供商均不返回 Google 结果的空白。已有 PR [#9838](https://github.com/AstrBotDevs/AstrBot/pull/9838) 提交。
- **插件 Web 面板独立成页**（[#9816](https://github.com/AstrBotDevs/AstrBot/issues/9816)）：侧边栏插件过多，希望独立为完整页面并显示图标。对应 PR [#9823](https://github.com/AstrBotDevs/AstrBot/pull/9823) 已提交，XL 规模，可能进入下一版本。
- **平台实例级插件启停面板**（[#9834](https://github.com/AstrBotDevs/AstrBot/issues/9834)）：用户希望按平台实例控制插件启停，并让后台/定时任务遵循统一插件作用域。暂无对应 PR，属于架构级增强。
- **阿里云百炼对话模型提供商**（[#9817](https://github.com/AstrBotDevs/AstrBot/issues/9817)）：AstrBot 已在 Agent 执行器、TTS、Embedding 支持百炼，但缺少 LLM 对话提供商。暂无 PR。
- **`astrbot://` Skill URI 按需读取上传资源**（[#9813](https://github.com/AstrBotDevs/AstrBot/issues/9813)）：由维护者 @Soulter 提出，旨在解决 sandbox runtime 全量同步 Skill 的效率问题，属于路线图级设计。

---

## 用户反馈摘要

- **移动端 WebUI 体验**（[#9741](https://github.com/AstrBotDevs/AstrBot/issues/9741)）：用户使用 Android Via 浏览器访问 Dashboard 时，人格设定页面不显示“创建文件夹”按钮，切换“电脑模式”后恢复正常。反馈表明移动端响应式适配仍有盲区，但修复已随 [#9832](https://github.com/AstrBotDevs/AstrBot/pull/9832) 合入。
- **多平台实例隔离**（[#9796](https://github.com/AstrBotDevs/AstrBot/issues/9796)）：运行多个 aiocqhttp 实例或生产+仿真适配器的用户发现，同名会话会共享限流配额与锁，一个平台的高频流量会拖垮另一个平台。这是多平台部署场景下的真实痛点，用户对会话键设计提出了明确改进方向。
- **主动推送的会话 ID 困惑**（[#9831](https://github.com/AstrBotDevs/AstrBot/issues/9831)）：用户将 `/sid` 返回的会话 ID 填入插件定时推送列表，却因 ID 语义不一致（发送者维度 vs 群维度）导致推送失败。该问题暴露了 `unique_session` 模式下 ID 语义对用户不透明，修复后需关注文档同步。
- **关闭 LLM 后 bot 仍发言**（[#9819](https://github.com/AstrBotDevs/AstrBot/issues/9819)）：用户反馈执行 `/llm` 关闭后 bot 仍会主动发言，日志显示禁言事件触发了消息管道。这可能是事件过滤与 LLM 开关未联动导致，用户期望关闭 LLM 后所有主动行为立即停止。
- **飞书混合消息丢文字**（[#9839](https://github.com/AstrBotDevs/AstrBot/issues/9839)）：用户推送文字+图片混合消息时，文字内容被吞。问题定位在 `_convert_to_lark` 的缓冲逻辑，用户已提供代码级分析，修复难度较低。

---

## 待处理积压

- **飞书混合消息文字被吞**（[#9839](https://github.com/AstrBotDevs/AstrBot/issues/9839)）：新开 Bug，用户已定位到 `lark_event.py` L240-L244 的缓冲逻辑缺陷，建议尽快修复。
- **关闭 LLM 后 bot 仍主动发言**（[#9819](https://github.com/AstrBotDevs/AstrBot/issues/9819)）：涉及 LLM 开关与事件管道的联动，影响用户对机器人的控制力，建议排查 `waking_check` 与插件调度逻辑。
- **平台实例级插件启停**（[#9834](https://github.com/AstrBotDevs/AstrBot/issues/9834)）：多实例用户的核心诉求，当前插件开关仅影响消息管道，后台任务不受控。该功能涉及架构调整，建议纳入路线图评估。
- **历史 PR 清理完成度**：今日集中关闭了 9 笔 4-5 月 PR，但仍有部分早期 PR（如 #7388 repetition tool call 引导）在列表中显示为已关闭，需确认是否全部合入或明确关闭原因，避免社区困惑。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*