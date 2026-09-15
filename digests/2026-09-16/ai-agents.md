# OpenClaw 生态日报 2026-09-16

> Issues: 465 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-15 23:48 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 — 2026-09-16

## 1. 今日速览

OpenClaw 在过去24小时内保持高活跃度：新增/更新 **465 条 Issues**（新开 292 / 已关闭 173），**500 条 PR**（待合并 349 / 已合并 151）。今日无新版本发布，但社区对 Gateway 稳定性（内存泄漏、崩溃循环、进程泄漏）和消息传递可靠性（Telegram/飞书重复丢弃、回复快照丢失）的反馈高度集中，多问题指向 `2026.9.x` 系列的回归。多个 P0/P1 Bug 尚未见正式 fix PR 落地，社区维护压力较大。

---

## 2. 版本发布

**无新版本。** 当前最新稳定版为 `2026.9.4`（commit `3a9d69d`）。

---

## 3. 项目进展

### 今日重要合并/关闭

| 编号 | 类型 | 标题 | 作者 | 链接 |
|------|------|------|------|------|
| #148198 | refactor | consolidate history continuation scans | @steipete | [PR #148198](https://github.com/openclaw/openclaw/pull/148198) |
| #148576 | refactor | load fresh owner projections asynchronously | @steipete | [PR #148576](https://github.com/openclaw/openclaw/pull/148576) |
| #149500 | fix | avoid duplicate catalog refreshes under query pressure | @steipete | [PR #149500](https://github.com/openclaw/openclaw/pull/149500) |
| #149475 | fix | load plugin details with one catalog request | @Patrick-Erichsen | [PR #149475](https://github.com/openclaw/openclaw/pull/149475) |
| #149316 | refactor | reduce canonical schema validation reads | @steipete | [PR #149316](https://github.com/openclaw/openclaw/pull/149316) |
| #149521 | fix | stop Agent Plugin E2E launches after cancellation | @steipete | [PR #149521](https://github.com/openclaw/openclaw/pull/149521) |
| #149447 | fix | prefer Codex when both coding agents are available | @steipete | [PR #149447](https://github.com/openclaw/openclaw/pull/149447) |
| #149319 | fix | stop treating disabled context engines as failures | @jalehman | [PR #149319](https://github.com/openclaw/openclaw/pull/149319) |
| #149358 | fix | read remaining metadata-only session listings at list projection | @DakshK-02 | [PR #149358](https://github.com/openclaw/openclaw/pull/149358) |
| #135648 | perf | prepare profile defaults in one map | @steipete | [PR #135648](https://github.com/openclaw/openclaw/pull/135648) |

**推进方向：** 今日合并/活跃 PR 集中在三项主线——① Gateway 性能优化（catalog refresh、schema validation、session listing 去重/异步化）；② Agent/Task 系统重构（owner projection 异步加载、死信队列清理）；③ UI/UX 修复（任务进度折叠、owner 计数显示、侧边聊天超时）。整体呈"稳定性打底 + 性能瘦身"态势，无新功能面世。

---

## 4. 社区热点

### 🔥 Top 5 热议 Issue

| Issue | 标签 | 评论 | 👍 | 热度分析 |
|-------|------|------|-----|---------|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | P0, 🦞 diamond lobster | 40 | 1 | **工具调用间文本泄漏至消息通道** — 40条评论，用户反映内部处理输出被路由到 Slack/iMessage，严重影响生产环境信任度 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | P1, 🦐 gold shrimp | 31 | 1 | **未回收的子进程泄漏导致僵尸积累** — 长期运行时 CPU/内存退化，回归 bug |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | P1, 🦪 silver shellfish | 25 | 1 | **Gateway 内存泄漏：350MB → 15.5GB** — 2-3天触发 OOM，launchd 重启循环，影响最广 |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | P0, 🦪 silver shellfish | 24 | 2 | **Codex PreToolUse hook 引发 CPU 满载并卡死 Gateway RPC** — 与 #97616 关联 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | P1, 🦞 diamond lobster | 20 | 0 | **同步持久化阻塞 Gateway 事件循环** — 规模化场景下 turn 延迟显著 |

**趋势研判：** 今日热点高度集中在 **Gateway 稳定性**（内存泄漏、进程泄漏、事件循环阻塞）和 **消息传递可靠性**（Telegram/飞书丢弃、回复丢失、重复文本）。用户痛点明确：生产环境长时间运行后必然退化。维护者需优先处理这三类问题。

---

## 5. Bug 与稳定性

### P0 级（崩溃/阻断）

| Issue | 标题 | 状态 | Fix PR | 链接 |
|-------|------|------|--------|------|
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP server init timeout 导致 Gateway 崩溃（未处理 rejection） | OPEN | 无 | [Issue #144911](https://github.com/openclaw/openclaw/issues/144911) |
| [#148866](https://github.com/openclaw/openclaw/issues/148866) | gateway.bind=lan 导致永久重启循环（2026.9.1/9.4） | CLOSED | 已修复 | [Issue #148866](https://github.com/openclaw/openclaw/issues/148866) |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | SQLite WAL 无限增长至 2.8GB，阻断 Gateway 启动（Windows） | OPEN | 无 | [Issue #143524](https://github.com/openclaw/openclaw/issues/143524) |
| [#115642](https://github.com/openclaw/openclaw/issues/115642) | Billing cooldown 超出停机时间，缺乏探活恢复机制 | OPEN | 无 | [Issue #115642](https://github.com/openclaw/openclaw/issues/115642) |
| [#144739](https://github.com/openclaw/openclaw/issues/144739) | npm update 2026.9.3→9.4 时 schema-17 迁移失败 | OPEN | 无 | [Issue #144739](https://github.com/openclaw/openclaw/issues/144739) |
| [#146637](https://github.com/openclaw/openclaw/issues/146637) | npm update 全局安装 swap 失败（Linux Mint） | OPEN | 无 | [Issue #146637](https://github.com/openclaw/openclaw/issues/146637) |

### P1 级（严重功能退化）

| Issue | 标题 | 状态 | Fix PR | 链接 |
|-------|------|------|--------|------|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 工具调用间文本泄漏至消息通道 | OPEN | 无 | [Issue #25592](https://github.com/openclaw/openclaw/issues/25592) |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 子进程泄漏导致僵尸积累 | OPEN | 无 | [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | Gateway 内存泄漏 350MB→15.5GB | OPEN | 无 | [Issue #91588](https://github.com/openclaw/openclaw/issues/91588) |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex hook 引发 CPU 满载卡死 RPC | OPEN | 无 | [Issue #91009](https://github.com/openclaw/openclaw/issues/91009) |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 同步持久化阻塞事件循环 | OPEN | 部分修复（#140231/#138984） | [Issue #119720](https://github.com/openclaw/openclaw/issues/119720) |
| [#139847](https://github.com/openclaw/openclaw/issues/139847) | 回复运行中到达的消息被丢弃（2026.9.2 回归） | OPEN | 无 | [Issue #139847](https://github.com/openclaw/openclaw/issues/139847) |
| [#137332](https://github.com/openclaw/openclaw/issues/137332) | 混合批处理永远重试（请求方结算） | OPEN | 无 | [Issue #137332](https://github.com/openclaw/openclaw/issues/137332) |
| [#136311](https://github.com/openclaw/openclaw/issues/136311) | memory-core 重索引锁无法释放，19GB 临时 DB 堆积 | OPEN | 无 | [Issue #136311](https://github.com/openclaw/openclaw/issues/136311) |
| [#144809](https://github.com/openclaw/openclaw/issues/144809) | claude-cli 长 turn 丢失回复（超过 RUN_STALE_TAKEOVER_MS） | OPEN | 无 | [Issue #144809](https://github.com/openclaw/openclaw/issues/144809) |
| [#148707](https://github.com/openclaw/openclaw/issues/148707) | 第二轮 run 抢占导致第一轮的 reply 丢失（2026.9.4 回归） | OPEN | 无 | [Issue #148707](https://github.com/openclaw/openclaw/issues/148707) |
| [#149198](https://github.com/openclaw/openclaw/issues/149198) | stale_lane_task 过早释放导致 cron 失败 | OPEN | 无 | [Issue #149198](https://github.com/openclaw/openclaw/issues/149198) |

### P2 级（体验问题）

| Issue | 标题 | 状态 | 链接 |
|-------|------|------|------|
| [#102175](https://github.com/openclaw/openclaw/issues/102175) | embedded prompt cache 跨 room-event 边界失效 | OPEN | [Issue #102175](https://github.com/openclaw/openclaw/issues/102175) |
| [#53628](https://github.com/openclaw/openclaw/issues/53628) | 安装 skill 时 $XDG_CONFIG_HOME 未展开 | OPEN | [Issue #53628](https://github.com/openclaw/openclaw/issues/53628) |
| [#139710](https://github.com/openclaw/openclaw/issues/139710) | mid-turn plugin-generation 杀死 system-agent turn | OPEN | [Issue #139710](https://github.com/openclaw/openclaw/issues/139710) |
| [#80520](https://github.com/openclaw/openclaw/issues/80520) | Telegram 消息静默丢弃 | CLOSED | [Issue #80520](https://github.com/openclaw/openclaw/issues/80520) |
| [#143278](https://github.com/openclaw/openclaw/issues/143278) | Heartbeat 内部输出泄漏至 Telegram 用户聊天 | OPEN | [Issue #143278](https://github.com/openclaw/openclaw/issues/143278) |
| [#56692](https://github.com/openclaw/openclaw/issues/56692) | 群聊中 agent 响应目标错位 | OPEN | [Issue #56692](https://github.com/openclaw/openclaw/issues/56692) |
| [#128140](https://github.com/openclaw/openclaw/issues/128140) | memory_search tool 始终超时 15s | OPEN | [Issue #128140](https://github.com/openclaw/openclaw/issues/128140) |
| [#104719](https://github.com/openclaw/openclaw/issues/104719) | memory-wiki 忽略工具截止时间 | OPEN | [Issue #104719](https://github.com/openclaw/openclaw/issues/104719) |
| [#119411](https://github.com/openclaw/openclaw/issues/119411) | memory file watcher 永不重索引 | OPEN | [Issue #119411](https://github.com/openclaw/openclaw/issues/119411) |
| [#112313](https://github.com/openclaw/openclaw/issues/112313) | 死信队列条目永久无法清除 | OPEN | [Issue #112313](https://github.com/openclaw/openclaw/issues/112313) |

**稳定性健康度评估：** ⚠️ **偏高风险**。今日新增 P0 Bug 6 个、P1 Bug 11 个，其中 15+ 个尚无 fix PR。核心问题集中在 Gateway 运行时稳定性（内存、进程、事件循环）和消息传递可靠性（丢弃、泄漏、重复）。建议维护者优先处理 #91588（内存泄漏）、#25592（文本泄漏）、#144911（MCP timeout 崩溃）三个 P0/P1 级问题。

---

## 6. 功能请求与路线图信号

| Issue | 需求描述 | 已有 PR 信号 | 可能纳入下一版本？ |
|-------|---------|-------------|-------------------|
| [#51441](https://github.com/openclaw/openclaw/issues/51441) | 暴露 resolved backend model 到 session_status | 无 | ❌ 低优先级 |
| [#51572](https://github.com/openclaw/openclaw/issues/51572) | session-memory hook 在 reset/prune 时触发 | 无 | ⚠️ 中等 |
| [#60602](https://github.com/openclaw/openclaw/issues/60602) | Per-Agent Bedrock requestMetadata 成本归属 | 无 | ❌ 小众需求 |
| [#126781](https://github.com/openclaw/openclaw/issues/126781) | Detached managed Lobster runs | ✅ 已在 2026.9.1 部分覆盖 | ✅ 已落地 |
| [#46058](https://github.com/openclaw/openclaw/issues/46058) | Android chat-first 移动表面探索 | 独立 fork，不要求 upstream | ❌ 社区分支 |
| [#115362](https://github.com/openclaw/openclaw/issues/115362) | Billing cooldown 探活恢复 + 手动重置命令 | 无 | ⚠️ 中等（生产痛点） |

**路线图信号：** 社区近期诉求高度集中在**运行时稳定性修复**而非新功能。若有新功能纳入，最可能的是 billing cooldown 恢复机制（#115642）和 session-memory hook 扩展（#51572），两者均为现有架构的能力延伸，破坏性小。

---

## 7. 用户反馈摘要

### 核心痛点（按频率排序）

1. **生产环境不可靠**：多位用户反映 Gateway 运行 2-3 天后必然出现内存膨胀（#91588）、进程泄漏（#97616）、事件循环阻塞（#119720），迫使定期重启，严重影响 SLA。

2. **消息传递信任危机**：Telegram/飞书/Discord 消息静默丢弃（#80520, #149483）、工具调用间内部文本泄漏到用户聊天（#25592, #143278）、回复在 run 抢占时丢失（#139847, #148707）—— 用户明确表示"不敢在生产环境使用"。

3. **升级体验差**：npm global install swap 失败（#146637）、schema-17 迁移卡住（#144739）、更新后 Gateway 重启循环（#148866）—— 用户反映"升级比不升级还麻烦"。

4. **Windows 兼容性弱势**：SQLite WAL 不 checkpoint（#143524）、MCP cleanup 超时（#149005）—— Windows 用户反馈明显少于 Linux/macOS。

5. **正面反馈**：@steipete 今日密集贡献性能优化 PR（catalog refresh 去重、schema validation 减少、session listing 异步化），用户评论区出现"终于有人修了"的感谢。

---

## 8. 待处理积压

### 🚨 需立即关注的长期未响应 Issue

| Issue | 创建时间 | 天数 | 严重程度 | 风险 |
|-------|---------|------|---------|------|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 2026-06-09 | **99 天** | P1, 🦪 silver shellfish | Gateway 内存泄漏，生产环境必现 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 2026-06-29 | **79 天** | P1, 🦐 gold shrimp | 子进程泄漏，长期运行退化 |
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 2026-02-24 | **204 天** | P0, 🦞 diamond lobster | 工具调用间文本泄漏，40 条评论 |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | 2026-06-06 | **102 天** | P0, 🦪 silver shellfish | Codex hook CPU 满载卡死 RPC |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 2026-08-05 | **42 天** | P1, 🦞 diamond lobster | 同步持久化阻塞事件循环 |
| [#136311](https://github.com/openclaw/openclaw/issues/136311) | 2026-09-02 | **14 天** | P1, 🐚 platinum hermit | memory-core 重索引锁死，19GB 堆积 |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 2026-09-09 | **7 天** | P0, 🦐 gold shrimp | SQLite WAL 2.8GB 阻断启动 |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | 2026-09-11 | **5 天** | P1, 🦞 diamond lobster | MCP timeout 崩溃 Gateway |
| [#139847](https://github.com/openclaw/openclaw/issues/139847) | 2026-09-06 | **10 天** | P1, 🦞 diamond lobster | 回复运行中消息被丢弃（2026.9.2 回归） |
| [#148707](https://github.com/openclaw/openclaw/issues/148707) | 2026-09-15 | **1 天** | P1, 🦪 silver shellfish | 2026.9.4 新回归，reply 丢失 |

### 📋 建议维护者行动

1. **立即处理**：#91588（内存泄漏）、#25592（文本泄漏）、#144911（MCP crash）—— 三个问题直接阻断生产使用
2. **本周跟进**：#97616（进程泄漏）、#91009（CPU 满载）、#143524（WAL 增长）—— 长期运行稳定性三角
3. **回归管控**：#139847、#148707 均为 2026.9.x 系列回归，建议暂停新功能合入，先稳定核心路径
4. **积压清理**：#115642（billing cooldown）和 #112313（死信队列永久）已开放数月无修复，建议 assign 或关闭

---

**报告生成时间：** 2026-09-16  
**数据来源：** GitHub openclaw/openclaw Issues & PRs（过去24小时）  
**项目健康度评级：** ⚠️ **需关注** — 高活跃度背后是大量未修复的 P0/P1 Bug，生产环境风险较高

---

## 横向生态对比

# 2026-09-16 开源 AI 智能体生态横向对比分析报告

## 1. 生态全景
2026年9月中旬，个人 AI 助手开源生态呈现**“分化与收敛并存”**态势：底层框架（OpenClaw、Hermes）进入高频率的质量加固期，多智能体协作标准（A2A、MCP v2）正在快速确立。项目重心从单纯的功能堆砌转向**生产环境稳定性**（内存泄漏修复、会话持久化、状态同步）。与此同时，端侧轻量化（PicoClaw）与通用执行平台（DeepSeek Harness）在垂直领域寻求突破，社区对“可靠性”和“可观测性”的诉求已超过对新奇功能的渴望。

## 2. 各项目活跃度对比

| 项目 | Issues (24h) | PRs (24h) | 版本发布 | 健康度评估 | 核心关注点 |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **OpenClaw** | 465 | 500 | 无 (最新 2026.9.4) | ⚠️ **需关注** | Gateway 稳定性、内存泄漏、消息传递可靠性 |
| **Hermes Agent** | 500 | 500 | 无 (最新 v0.21.3) | ✅ **良好** | 多写者数据库损坏、CLI 回归修复、Cron 调度 |
| **QwenPaw** | 28 | 50 | 无 (围绕 2.2.x) | ✅ **良好** | Hub 多租户、多智能体协作触发、MCP 兼容性 |
| **DeepSeek Harness** | N/A (Discussions) | N/A | 🆕 v0.1.6-alpha.1 | ⚠️ **活跃但粗糙** | Browser/Computer Use 扩展、v0 会话迁移兼容性 |
| **ZeroClaw** | 50 | 50 | 无 | ✅ **良好** | A2A 协议落地、Anthropic 多模态稳定性、WhatsApp 修复 |
| **AstrBot** | 13 | 37 | 无 | ✅ **良好** | WebUI 文档同步、内存管理（base64 图片）、GIF 处理 |
| **PicoClaw** | 2 | 5 | 无 | 🟡 **一般** | 配置模块并发安全、静默数据丢失风险 |

## 3. OpenClaw 在生态中的定位

*   **优势**：**社区规模与活跃度最高**（Issues/PRs 数量级远超其他项目）。拥有最成熟的 Gateway 架构和广泛的渠道接入（Telegram/飞书/Discord）。`steipete` 等核心贡献者在性能优化上持续投入，体现了强大的工程执行力。
*   **技术路线差异**：侧重于**中心化 Gateway + 插件化 Agent** 架构，强调消息通道的可靠性和多租户隔离。相比之下，Hermes 更偏向“个人智能体操作系统”（Desktop/Web 一体化），DeepSeek Harness 则定位为“通用代码/桌面自动化执行器”。
*   **社区规模对比**：OpenClaw 的 Issue 讨论深度极高（如 #25592 有 40 条评论），表明其用户群体已深入生产环境，反馈质量高但痛点尖锐。ZeroClaw 和 QwenPaw 社区相对精英化，关注架构演进；AstrBot 社区更偏向中文开发者和轻量级部署用户。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求/动态 |
| :--- | :--- | :--- |
| **多模态/图像稳定性** | **OpenClaw, ZeroClaw, QwenPaw, AstrBot** | OpenClaw: 图像标记泄漏至消息通道 (#25592)；ZeroClaw: Anthropic 图像缓存断点丢失 (#10889, #10895)；QwenPaw: PDF 多模态路径残留 (#7689)；AstrBot: GIF 单帧处理缺陷 (#9854)。 |
| **多智能体协作标准** | **ZeroClaw, QwenPaw, DeepSeek Harness** | ZeroClaw 合并 A2A 协议 (#9324)；QwenPaw 优化多智能体触发机制 (#7737)；DeepSeek Harness 新增 Computer Use 支持。 |
| **状态持久化与同步** | **Hermes, OpenClaw, QwenPaw** | Hermes: `state.db` 多写者竞争导致损坏 (#100896)；OpenClaw: 回复快照丢失、run 抢占导致 reply 丢失 (#148707)；QwenPaw: 任务停止后 UI 与后台状态不同步 (#7567)。 |
| **MCP 生态集成** | **OpenClaw, QwenPaw, DeepSeek Harness** | OpenClaw: MCP init timeout 导致崩溃 (#144911)；QwenPaw: MCP 错误处理修复 (#7735)；DeepSeek Harness: 升级至 MCP v2 SDK。 |
| **内存与资源管理** | **OpenClaw, AstrBot** | OpenClaw: 内存泄漏 350MB→15.5GB (#91588)、子进程泄漏 (#97616)；AstrBot: base64 图片导致 MemoryError (#10092)。 |

## 5. 差异化定位分析

*   **OpenClaw**: **企业级消息通道网关**。适合需要高频、稳定、多渠道接入的生产环境，但对长期运行的稳定性（内存/进程）仍有显著顾虑。
*   **Hermes Agent**: **全功能个人智能体 OS**。强调 Desktop/Web 一体化体验、支付集成（x402）和复杂的 Cron 调度，适合追求“全能助手”的高级用户，但需警惕数据库损坏风险。
*   **QwenPaw**: **团队协作与多模态开发平台**。依托通义千问生态，Hub 多租户功能和 DeepSeek V4 Flash 支持是其亮点，适合团队部署和复杂工具链集成。
*   **DeepSeek Harness**: **代码与桌面自动化引擎**。通过 Browser/Computer Use 和 Headless 模式，填补了“代码执行+界面操作”的空白，适合研发效能提升场景。
*   **ZeroClaw**: **标准化多智能体实验场**。A2A 协议的早期落地使其成为探索 Agent 间协作标准的先行者，同时注重安全依赖和测试隔离。
*   **AstrBot**: **轻量级群聊机器人框架**。以低门槛、高兼容性（OrcaRouter、DeepSeek）著称，适合社群运营和快速部署，但需加强内存管理。
*   **PicoClaw**: **嵌入式/边缘侧 Agent**。关注 mesh 网络和配置安全性，适合资源受限或分布式边缘计算场景。

## 6. 社区热度与成熟度

*   **快速迭代阶段**：
    *   **DeepSeek Harness**: Alpha 版本频繁发版，功能扩张迅猛（Browser/Computer Use），但兼容性 Bug 较多，处于典型的“早中期高速迭代”特征。
    *   **ZeroClaw**: 架构级 RFC（A2A、OCI Regressies）密集推进，处于技术路线定型的关键期。
*   **质量巩固阶段**：
    *   **OpenClaw**: 高活跃度背后是大量 P0/P1 Bug 积压，核心工作是“救火”（内存泄漏、崩溃修复），表明其已超越功能探索期，进入生产可用性攻坚期。
    *   **Hermes**: 修复 CLI 崩溃、数据库损坏等基础设施问题，显示项目从功能构建转向系统稳定性加固。
    *   **QwenPaw**: 围绕 2.2.x 系列进行针对性的 Bug 修复和功能打磨（Hub、MCP），迭代节奏相对稳健。

## 7. 值得关注的趋势信号

1.  **从“能跑”到“稳跑”**: 所有主流项目均将**长期运行稳定性**（内存泄漏、进程管理、数据库完整性）作为首要技术债务。开发者应优先评估框架在生产环境下的资源泄漏情况。
2.  **多智能体协作标准化加速**: A2A 协议（ZeroClaw）、MCP v2（DeepSeek/QwenPaw）、多智能体触发机制（QwenPaw）的密集出现，表明生态正在形成事实上的通信标准，跨 Agent 互操作性将成为下一代项目的核心卖点。
3.  **多模态处理的“最后一公里”**: 图像/视频/GIF 的处理缺陷在多项目中集中爆发，提示框架层需要更 robust 的多模态预处理管道，特别是针对非静态图片的动态内容理解。
4.  **状态同步的复杂性被低估**: 无论是 OpenClaw 的回复丢失、QwenPaw 的停止不同步，还是 Hermes 的 DB 损坏，都反映出在异步、分布式、多轮对话场景下，**精确的状态一致性与取消语义**仍是行业难题。
5.  **安全与凭据管理日益重要**: 明文泄露（Hermes #84106）、深层安全漏洞（ZeroClaw #5869 rumqttc）、以及加密凭据库需求（DeepSeek #1457 dsh-vault）显示，安全性已从边缘问题转变为影响用户信任的核心指标。

---
*报告生成时间：2026-09-16*  
*分析师：Agnes (Sapiens AI)*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：** 2026-09-16
**数据来源：** GitHub (zeroclaw-labs/zeroclaw)

## 1. 今日速览
ZeroClaw 在 2026-09-16 保持高活跃度，过去 24 小时内共产生 50 个 Issues 和 50 个 PR 更新。核心工作集中在**多模态内容处理的稳定性修复**（特别是 Anthropic 提供者的图像标记与缓存问题）以及**安全依赖的升级**。项目架构层面持续推动 A2A 协议支持和运行时插件化，同时解决了 WhatsApp Web 链接等长期阻塞的生产环境问题。整体健康度良好，P1 级 Bug 处理响应迅速。

## 2. 版本发布
**无新版本发布。**

## 3. 项目进展
今日有 9 个 PR 被合并或关闭，主要进展如下：

*   **A2A 协议支持落地** (#9324): A2A 出站客户端（A2ATool）第一阶段实现已合并，引入了 `zeroclaw-tools` 中的四个 `a2a_*` 工具及共享的 A2A v1.0 wire model，标志着多智能体协作能力的重要突破。
*   **文档基础设施增强** (#10840): 新增 mdBook 渲染后端，自动生成 `llms.txt` 和 `llms-full.txt`，改善了面向 LLM 的文档索引能力。
*   **Telegram 安全模型选择器** (#9997): 实现了基于 Provider 分组的分页内联键盘，允许用户在 Telegram 中通过 `/model` 命令安全地切换模型。
*   **测试隔离加固** (#10125): 清理了浏览器、HTTP 认证、ACP 桥接等测试中的 25 处不安全环境变量变异，提升了 CI 稳定性。
*   **Docker 构建修复** (#2754): 解决了 heredoc 中 `chown` 命令放置错误及未引用 EOF 导致的配置写入问题。

**总体评估：** 项目在“多智能体通信标准化”和“测试可重复性”两个维度上有实质性推进，为后续更复杂的 Agent 编排奠定了基础。

## 4. 社区热点
以下 Issue 评论数最多，反映了社区对架构演进和关键 Bug 的高度关注：

*   **[RFC] Computer-use 桌面交互支持** (#6909, 16 条评论)
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/6909
    *   **分析:** 这是近期最活跃的 RFC，涉及桌面屏幕交互和输入控制的计算机使用能力。维护者在 2026-08-24 接管并澄清了安全边界，表明该功能已进入正式设计阶段，社区对其安全性（`risk:high`）和可用性极为关注。
*   **[任务] 强化并行运行时测试夹具** (#9965, 12 条评论)
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/9965
    *   **分析:** 针对 `cron` 调度器测试在非确定性并行环境下失败的问题，社区正在协作硬化测试夹具，体现了对 CI 稳定性的重视。
*   **[RFC] A2A 出站客户端** (#9106, 11 条评论)
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/9106
    *   **分析:** 旨在解决 ZeroClaw Agent 无法主动调用外部 A2A 兼容 Agent 的限制。该 RFC 的接受和实施（见合并的 #9324）是跨 Agent 协作的关键一步。
*   **[RFC] 统一包/能力/配置/运行时状态目录契约** (#9346, 9 条评论)
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/9346
    *   **分析:** 这是一个架构级的整合 RFC，试图统一插件、内置功能和集成产品的目录视图，对项目的长期可扩展性至关重要。
*   **WhatsApp Web 设备链接失败** (#8627, 1 条评论但优先级 P1)
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/8627
    *   **分析:** 由于 WhatsApp 新的 Passkey/SHORTCAKE 链接门控机制导致原生 WhatsApp 通道失效。这是一个阻塞性 Bug（S1），用户急需修复以恢复服务。

## 5. Bug 与稳定性
今日报告了多个 P1/P2 级 Bug，主要集中在 **Anthropic 多模态处理** 和 **运行时可靠性** 方面：

| 严重级别 | Issue ID | 描述 | 状态 | 关联 Fix PR |
| :--- | :--- | :--- | :--- | :--- |
| **P1** | #5869 | `rumqttc` 依赖链包含多个 RUSTSEC 安全漏洞 | Blocked | - |
| **P2** | #10885 | 工具返回的图像在同 Turn 内其他工具调用后消失 | Open | - |
| **P2** | #10889 | Anthropic 提供者在消息以图像结尾时丢失滚动缓存断点 | Open | **#10895** (今日提交) |
| **P2** | #9332 | 图像感知的预调度预算和上下文计量计算错误 | In-progress | - |
| **P2** | #10736 | 预输出流失败跳过了advertised的非流式回退 | In-progress | - |
| **P1** | #10659 | 预算超出的 Code Turn 在会话恢复后丢失可见进度 | Open | - |
| **P2** | #10887 | 非视觉能力门控在引用无可加载图像的文本标记时错误失败 Turn | Open | **#10894** (今日提交) |

**稳定性分析：** 开发团队今日集中提交了 **#10894** 和 **#10895** 两个 PR，直接修复 Anthropic 提供者在处理图像标记和缓存断点时的回归问题。这表明当前是多模态支持密集测试和修复期，建议用户关注即将发布的补丁版本。

## 6. 功能请求与路线图信号
*   **持久化会话 Prompt 附件** (#10407, Open): 允许每个 Chat 会话绑定最多 4 个持久化的 Prompt 附件（SQLite  backing）。这将增强会话的上下文保持能力，可能纳入下一版本。
*   **Native XMPP/Prosody 通道** (#9814, Open): 用户请求添加轻量级 XMPP 支持，以满足家庭实验室和低资源部署需求。与现有的 Matrix/Telegram 通道形成互补。
*   **Stream Mode 默认改为 Partial** (#10166, Open): 建议将 `stream_mode` 默认值从 `off` 改为 `partial`，以改善用户体验，使回复能够渐进式流式传输。
*   **Keenable 网络搜索 Provider** (#10679, Open): 新增除 DuckDuckGo 之外的第二个零配置网络搜索 Provider，丰富了工具集。
*   **Subagent 活动可视化** (#8763, Open): 在 ZeroCode TUI 中展示子 Agent 活动和展开的工具调用结果，提升可观测性。

## 7. 用户反馈摘要
*   **痛点：**
    *   **多模态处理不稳定：** 多个用户反馈图像标记在处理过程中丢失或导致缓存失效（#10885, #10889, #10888），严重影响依赖图像的 Agent 工作流。
    *   **WhatsApp 连接断裂：** #8627 指出 WhatsApp 的安全更新破坏了现有的链接机制，导致用户无法通过 ZeroClaw 发送消息。
    *   **内存共享粒度不足：** #8983 提出跨 Agent 内存共享目前是全有或全无的，缺乏按类别细粒度的访问控制，阻碍了复杂的多 Agent 协作场景。
*   **满意点：**
    *   **A2A 协议支持：** 社区对 #9106 RFC 的接受和 #9324 PR 的合并表示欢迎，认为这是实现真正 Agent 间协作的关键一步。
    *   **文档自动化：** #10840 提出的自动生成 `llms.txt` 受到关注，被认为有助于提高项目对 AI 工具的友好性。

## 8. 待处理积压
*   **[RFC] OCI-compliant Registries for Plugin Storage** (#7497): 自 2026-06-11 创建以来一直阻塞（Blocked），涉及 WASM 插件的存储和发现机制向 OCI 标准迁移，属于架构级重要变更，需维护者优先审视。
*   **Security: rumqttc dependency cluster** (#5869): 自 2026-04-18 发现以来一直阻塞（Blocked），`rumqttc` 旧版本引入了多个 RUSTSEC 漏洞，需尽快升级依赖或寻找替代品。
*   **RFC: Complete Emergency-stop Enforcement** (#9802): 尽管有 PR #9440 的部分实现，但完整的紧急停止强制执行（包括网络操作的中断）仍未完成，存在安全隐患。
*   **ACP: near-live JSON-RPC transport smoke** (#9370): 缺少针对 `deliver_file` 操作的端到端烟雾测试，可能影响 ACP 通道的稳定性验证。

---
**分析师备注：** ZeroClaw 当前处于多模态能力深化和 Agent 互操作性扩展的关键阶段。建议密切关注 Anthropic 提供商相关的 Bug 修复 PR（#10894, #10895）的合并情况，以及 WhatsApp 通道安全更新的跟进状态。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-09-16

## 1. 今日速览

过去24小时内，PicoClaw 社区活跃度中等偏高，共收到 **2 条 Issue** 更新和 **5 条 PR** 更新。所有 Issue 均为长期未解决的 Bug（均标记为 `[stale]`），且均无已合并的修复方案。PR 方面，有 **2 条已关闭/合并**（其中一条为历史遗留 PR 的重新整理），**3 条仍处于开放状态**，包括两条配置相关的修复和一条新功能 PR。整体而言，项目在功能扩展上有所推进，但在核心稳定性（尤其是并发安全和数据一致性）方面存在明显隐患，亟需关注。

## 2. 版本发布

暂无新版本发布。

## 3. 项目进展

**已合并/关闭的 PR：**
- **#1780 [CLOSED]** QQ 频道连接稳定性增强（作者: @xiang33）。该 PR 将重连间隔、重试次数和速率限制等参数变为可配置项，提升了系统在生产环境中的鲁棒性。虽然创建时间较早（2026-03-19），但于昨日完成闭环，属于一项累积性的稳定性改进。
- **#3380 [CLOSED]** Mesh 可观测性功能（Track 63，作者: @stpinkie）。引入了 `PeerStatus` 的丰富元数据（连接数、延迟、评分、最后活动时间）以及带宽监控和 SSE 事件流支持，显著增强了分布式 mesh 网络的调试与运维能力。

**开放中的关键 PR：**
- **#3375** 修复 `sensitiveCache` 的并发初始化问题，直接对应 Issue #3374。
- **#3372** 修复 `reaction` 工具的配置逻辑缺陷。
- **#3370** 新增 Keenable Web Search 提供商，扩展了搜索能力的选择。

## 4. 社区热点

今日讨论热度最高的是由 @sting8k 提交的两组关联性极强的 Issues 和 PR：

*   **Issue #3374**: [BUG] Data race in Config.initSensitiveCache can return a nil replacer and panic FilterSensitiveData
    *   链接: https://github.com/sipeed/picoclaw/issues/3374
    *   **分析**: 这是一个典型的 Go 并发 Bug。由于 `Config.sensitiveCache` 的惰性初始化缺乏同步保护，导致 `sync.Once` 失效，可能引发 nil 指针解引用导致 panic。这触发了维护者对核心配置模块线程安全性的担忧。

*   **Issue #3373**: [BUG] SaveConfig silently deletes every api_key after the first and leaves a dangling fallback
    *   链接: https://github.com/sipeed/picoclaw/issues/3373
    *   **分析**: 该 Bug 描述了配置持久化过程中的静默数据丢失。用户抱怨在 `LoadConfig` -> `SaveConfig` 循环后，多个 `api_keys` 被削减为仅保留第一个，且残留无效的 `fallbacks` 引用。这种“静默失败”比显式报错更难排查，严重影响用户信任。

## 5. Bug 与稳定性

今日报告的 Bug 主要集中在配置模块（`pkg/config`），严重程度较高：

1.  **高严重度 - 并发崩溃风险 (Issue #3374)**: `initSensitiveCache` 存在数据竞争，可能导致服务 panic。已有对应的修复 PR **#3375** 处于开放状态，尚未合并。
2.  **高严重度 - 数据完整性破坏 (Issue #3373)**: 配置保存时静默丢弃多 API Key 并留下悬空引用。目前尚无对应的修复 PR 提交。

这两个 Bug 均涉及配置系统的核心逻辑，且均标记为 `[stale]`，表明它们可能已经存在一段时间但未得到维护者的及时响应。

## 6. 功能请求与路线图信号

*   **Keenable Web Search 集成 (PR #3370)**: 新增了一个无需 API Key 即可使用的 Web Search 提供商，降低了用户的使用门槛，丰富了生态。
*   **Reaction Tool 配置化 (PR #3372)**: 修复了 `reaction` 工具无法通过配置正确启用的问题，反映了用户对细粒度工具控制的需求。
*   **Mesh 可观测性增强 (PR #3380)**: 虽然已关闭，但其引入的 `PeerStatus` 详细指标显示了项目在分布式系统可维护性上的持续投入。

从 PR 趋势来看，项目近期侧重于**底层稳定性加固**（并发、配置一致性）和**可观测性扩展**。

## 7. 用户反馈摘要

根据 Issue 描述，用户的痛点主要集中在：
*   **隐式数据丢失**: 对 Issue #3373 中 `SaveConfig` 静默删除 API Key 的行为表示强烈不满，认为这破坏了配置的原子性和可靠性。
*   **生产环境稳定性**: 对 Issue #3374 的并发 panic 表示担忧，特别是在高负载场景下。
*   **配置灵活性**: 对 QQ 连接参数（PR #1780）和 Reaction 工具（PR #3372）的配置化表示认可，认为这是提升用户体验的必要改进。

## 8. 待处理积压

以下 Issue 和 PR 需要维护者重点关注，因为它们涉及核心功能的正确性和稳定性，且长期处于未解决或开放状态：

*   **Issue #3374 & PR #3375**: 并发 Bug 修复。请尽快审查并合并 PR #3375 以消除潜在的 Panic 风险。
    *   Issue: https://github.com/sipeed/picoclaw/issues/3374
    *   PR: https://github.com/sipeed/picoclaw/pull/3375
*   **Issue #3373**: 配置数据丢失 Bug。**目前尚无对应的修复 PR**，建议优先处理或鼓励社区贡献修复方案。
    *   Issue: https://github.com/sipeed/picoclaw/issues/3373
*   **PR #3372**: Reaction 工具配置修复，开放中，建议尽快合并。
    *   PR: https://github.com/sipeed/picoclaw/pull/3372

**总结**: PicoClaw 项目在功能特性上保持稳健增长，但在配置模块的健壮性方面暴露出两个关键缺陷。建议维护团队优先处理 #3374 和 #3373，以恢复用户对核心配置功能的信心。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：** 2026-09-16
**分析对象：** [agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw)

## 1. 今日速览
今日项目活跃度维持高位，24小时内产生 78 条更新（28 Issues + 50 PRs），社区对 **2.2.0/2.2.1 版本** 的反馈集中爆发。核心亮点在于多租户 Hub 功能的实质性推进（模型网关、成员治理 PR 合并）以及多智能体协作触发机制的优化。与此同时，围绕 **MCP 连接稳定性**、**PDF 多模态处理逻辑** 以及 **Playwright 驱动健壮性** 的技术债务被集中识别并修复，显示项目在快速迭代后正进入质量加固期。

## 2. 版本发布
**无新版本发布。**
当前社区主要围绕 `2.2.x` 系列（特别是 `2.2.0` 和 `2.2.1`）进行问题反馈和修复。

## 3. 项目进展
今日合并/关闭了多项关键 PR，显著提升了系统稳定性和功能完备性：

*   **Hub 多租户能力增强 (PR #7779):** 合并了模型网关、成员治理和使用情况仪表板功能。管理员可发布模型并托管密钥，成员可选择使用组织模型而无需接触原始凭据，标志着 QwenPaw Hub 从概念走向实用化。
*   **多智能体协作触发优化 (PR #7737, #7795):** 扩展了内置技能描述中的触发关键词，解决了用户首次对话即请求团队协作时 Agent 识别不准的问题（Fix #3113）。
*   **DeepSeek V4 Flash 支持 (PR #7736, #7794):** 正式将 DeepSeek V4 Flash 的能力清单（图像输入、100万 token 窗口、推理力度配置）纳入打包的 Provider 目录，完善了生态适配。
*   **MCP 错误处理修复 (PR #7735):** 修复了 HTTP 错误响应体头残留导致 `httpx` 二次解压失败的问题，解决了 Java/Kotlin MCP 服务器连接不稳定的 Bug（关联 Issue #7716）。
*   **控制台可访问性与校验 (PR #7759, #7758, #7756):** 恢复了链接焦点指示器以符合无障碍标准；对齐了 Embedding 超时验证逻辑；改进了记忆模块空错误响应的通知区分。

## 4. 社区热点
以下是今日讨论最活跃、最具代表性的 Issues：

1.  **QwenPaw Hub 多租户版规划讨论 (Issue #7318)**
    *   **状态:** OPEN | **评论:** 27 | **点赞:** 4
    *   **链接:** https://github.com/agentscope-ai/QwenPaw/issues/7318
    *   **分析:** 这是今日最受关注的功能讨论。社区强烈渴望团队级部署方案，2.2.0 版本的 Hub 是官方回应。27 条评论显示用户对“接下来做什么”有高度参与感，暗示未来版本需在权限细粒度和协作工作流上继续深耕。

2.  **SubAgent 启动即失败/超时 (Issue #7678)**
    *   **状态:** OPEN | **评论:** 7
    *   **链接:** https://github.com/agentscope-ai/QwenPaw/issues/7678
    *   **分析:** 用户反映在 `win2.2.0` 中 `spawn subAgent` 必然导致任务超时失败。尽管用户尝试调整 timeout 无效，但该 Bug 可能与我们今日合并的 **PR #7796/7680**（诊断子 Agent 模型覆盖丢失问题）相关，建议跟进验证。

3.  **停止按钮失效导致任务后台持续运行 (Issue #7567)**
    *   **状态:** OPEN | **评论:** 7
    *   **链接:** https://github.com/agentscope-ai/QwenPaw/issues/7567
    *   **分析:** Web 端点击停止后 UI 显示已停止，但实际任务仍在执行，甚至导致后续 409 冲突。这是一个严重的用户体验与状态同步 Bug，需优先关注后端取消机制的可靠性。

4.  **MCP 连接注册失败 (Issue #7716)**
    *   **状态:** CLOSED | **评论:** 3
    *   **链接:** https://github.com/agentscope-ai/QwenPaw/issues/7716
    *   **分析:** 升级至 2.2.x 后 MCP 无法连接。此问题已通过 **PR #7735** 修复并关闭，体现了高效的闭环处理能力。

## 5. Bug 与稳定性
今日报告了多个影响生产环境稳定性的 Bug，按严重程度排列：

| 优先级 | Issue ID | 问题描述 | 状态 | Fix PR |
| :--- | :--- | :--- | :--- | :--- |
| **P0** | #7786 | **NFS/云端部署文件浏览器冻结:** 打开 Workspace 文件浏览器时整个进程挂起 5-6 分钟，阻塞事件循环。 | OPEN | 暂无 |
| **P0** | #7567 | **任务停止不同步:** UI 显示停止但后台仍在执行，引发状态混乱。 | OPEN | 暂无 |
| **P1** | #7678 | **SubAgent spawn 必然失败:** 所有 spawn 任务均超时，无法执行。 | OPEN | 疑似 #7796 |
| **P1** | #7792 | **微信音视频附件 URL 错误:** 附件被转为 `file://` URL 发送至 OpenAI 兼容 API 导致 400 错误。 | OPEN | 暂无 |
| **P1** | #7689 | **PDF 多模态路径残留:** 对于支持多模态的模型，tool-return 的 PDF block 仍被错误序列化发送。 | OPEN | **PR #7636** (Under Review) |
| **P2** | #7767 | **Guardrail 插件多处异常:** Console 附件过期 blob、Cron 误触发、`on_acting` 未触发等复合问题。 | OPEN | 暂无 |
| **P2** | #7775 | **Max Iterations 结束无响应:** 达到最大迭代次数时，Agent 直接结束且无最终回答或警告。 | OPEN | 暂无 |
| **P2** | #7764 | **Dagu MCP Client 解码错误:** `httpx.DecodingError` 导致客户端保持 inactive。 | CLOSED | PR #7764 (Close) / #7735 |

*注：Issue #3871 (SSE 流未正确关闭导致无限 Thinking) 和 Issue #5872 (Docker 内 dbus 错误) 虽近日关闭，但为历史遗留问题，已标记解决。*

## 6. 功能请求与路线图信号
*   **Advisor Mode (PR #7569):** 提出了一种新的循环模式，将“顾问”模型与“执行”代理分离，旨在通过更强模型规划、更弱模型执行来优化成本与效果。若合并，将丰富 Agent 的运行模式。
*   **统一 Chat Workbench (PR #7790):** 引入右侧工作台 Shell（包含文件、变更、终端、工具槽位），并将现有 Files 和 Coding Mode 整合。这反映了用户对更集成化开发体验的需求。
*   **自定义 IMAP/SMTP 支持 (PR #7791):** 允许通过 Provider "custom" 配置自建邮件服务器，填补了托管邮箱仅支持特定企业域名的空白。
*   **明确调用工具 (Issue #7778, #7780):** 用户希望支持通过 `//` 搜索并明确调用内置/MCP 工具，以解决相似工具调用不准确的问题。此需求与 **PR #7737/7795** 的技能触发优化方向一致，可能已在后续规划中。

## 7. 用户反馈摘要
*   **痛点 - 状态同步:** 用户对“点击停止但任务继续跑”（#7567）和“达到最大迭代无反馈”（#7775）极度不满，认为这破坏了交互的可控性。
*   **痛点 - 部署兼容性:** Docker 容器内的 dbus 错误（#5872）、NFS 部署下的性能冻结（#7786）以及 Windows 上的 SubAgent 超时（#7678）表明，随着版本迭代，跨平台/云原生部署的兼容性测试存在盲区。
*   **满意点 - 功能响应:** 用户对 Hub 多租户版（#7318）的推出表示期待，且对 MCP 连接问题得到快速修复（#7716 closed）感到欣慰。
*   **使用场景:** 用户开始深入使用多智能体协作（Multi-agent collaboration）和复杂工具链（MCP, Browser Use），这要求底层框架具备更高的健壮性。

## 8. 待处理积压
以下 Issue 需维护者重点关注：

1.  **Issue #7786 (Critical):** Cloud/NFS 部署文件浏览器导致进程挂起 5-6 分钟。这是一个严重的基础设施性能 Bug，直接影响生产环境可用性。
2.  **Issue #7689 (High):** PDF 多模态路径 Bug。虽然有 PR #7636 在审查中，但需确保其覆盖所有 OpenAI 兼容端点场景。
3.  **Issue #7678 (High):** SubAgent spawn 失败问题。需确认是否已由 PR #7796 完全解决，或存在更深层的逻辑缺陷。
4.  **Issue #7792 (Medium):** 微信音视频附件处理缺陷。涉及特定渠道（WeChat）的多媒体处理逻辑，影响移动端用户体验。
5.  **PR #7569 (Feature):** Advisor Mode 功能。这是一个重大的交互模式变革，需仔细评估其对现有 Agent 架构的影响及测试覆盖。

---
*报告生成时间：2026-09-16*
*数据来源：GitHub API (agentscope-ai/QwenPaw)*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：2026-09-16**  
**分析对象：** NousResearch/hermes-agent  
**数据来源：** GitHub API (过去24小时)

---

## 1. 今日速览

昨日项目处于**高活跃度开发状态**，共处理 Issues 500条、PR 500条，其中新问题/活跃讨论320条，显示社区参与度高。核心焦点集中在 **cron 调度稳定性**、**Desktop 端状态同步**及 **CLI 启动回归修复**。虽然当日无新版本发布（最近版本 v0.21.3/v0.21.0），但多个关键 Bug 已关闭或已有合并 PR 推进。整体健康度良好，但 `state.db` 多写者竞争导致的数据库损坏问题仍需持续关注。

---

## 2. 版本发布

**无新版本发布。**

- 最近已知版本：`v0.21.3` (commit `24fd22b94d`, 2026-09-14) 和 `v0.21.0` (2026-08-31)。
- 注意：`v0.21.3` 引入了一项回归 (`NameError: file_signature`)，已在 Issue #111942 关闭并伴随修复 PR #111943。

---

## 3. 项目进展

### 已合并/关闭的重要 PR & Issues

1.  **[CLI 回归修复] #111942 (CLOSED)**: `hermes update` 后 CLI 启动崩溃 (`NameError: file_signature`) 问题已确认并修复。
    - 链接: https://github.com/NousResearch/hermes-agent/issues/111942
    - 关联 PR: https://github.com/NousResearch/hermes-agent/pull/111943 (Closed)
    - **意义**: 恢复了 CLI 工具链的可用性，属于 P0 级紧急修复。

2.  **[安全修复] #84106 (CLOSED)**: `hermes config get mcp_servers` 泄露明文 MCP 凭据的问题已解决。
    - 链接: https://github.com/NousResearch/hermes-agent/issues/84106
    - **意义**: 修复了 P2 级安全隐患，防止敏感信息在 agent 会话中被意外加载到上下文。

3.  **[功能实现] #2919 (CLOSED)**: Native payment execution (x402 / agentpay-mcp) 集成提案被标记为 "implemented-on-main"。
    - 链接: https://github.com/NousResearch/hermes-agent/issues/2919
    - **意义**: 标志着 Hermes Agent 在自主支付能力上的一个重要里程碑已完成主干集成。

4.  **[持续开发的 PR] #112318**: Kanban worker 失败重试逻辑优化。
    - 链接: https://github.com/NousResearch/hermes-agent/pull/112318
    - **进展**: 正在推进中，旨在解决 cron agent 因 API 调用失败导致的静默终止问题。

5.  **[持续开发的 PR] #112356**: Desktop 后端进程意外退出后的自动恢复机制。
    - 链接: https://github.com/NousResearch/hermes-agent/pull/112356
    - **进展**: 正在推进中，提升 Desktop 端的稳定性。

---

## 4. 社区热点

以下 Issues 评论数最高，反映了当前用户最关心的问题：

1.  **#88584 [OPEN] Automated Nous integration is blocked** (104 评论)
    - **摘要**: Nous-to-Enterkey 的自动化合并任务在 `cron/jobs.py` 中存在冲突，导致工作流失败。
    - **诉求**: 基础设施维护与 CI/CD 流程的稳定性。
    - **链接**: https://github.com/NousResearch/hermes-agent/issues/88584

2.  **#97681 [OPEN] Bot Group Chats should keep working after Desktop closes** (28 评论)
    - **摘要**: 用户期望 Bot 群组聊天在 Desktop 客户端关闭后仍能继续运行，支持跨设备切换。
    - **诉求**: 增强的 Agent 连续性与多设备协同能力。
    - **链接**: https://github.com/NousResearch/hermes-agent/issues/97681

3.  **#87093 [CLOSED] Debian installation broken** (26 评论, 4 👍)
    - **摘要**: Debian 13.6 上通过 `install.sh` 安装时失败 (`uv.lock & npm install failed`)。
    - **状态**: 已关闭，可能通过文档更新或脚本修复解决。
    - **链接**: https://github.com/NousResearch/hermes-agent/issues/87093

4.  **#83390 [OPEN] Auxiliary title_generation fails on DeepSeek** (21 评论, 3 👍)
    - **摘要**: 当使用 DeepSeek 作为 provider 时，辅助标题生成任务因 HTTP 400 错误失败 (`response_format type unavailable`)。
    - **诉求**: 扩展对特定模型功能差异的兼容性支持。
    - **链接**: https://github.com/NousResearch/hermes-agent/issues/83390

5.  **#103483 [OPEN] muse-spark turns end mid-task** (15 评论, 11 👍)
    - **摘要**: Muse Spark 模型 (1.2/1.3) 有时会在 `finish_reason=stop` 时意外中止，并附带一个无关的随机词。
    - **诉求**: 优化与特定模型（尤其是通过 opencode-go 接入时）的流式响应处理逻辑。
    - **链接**: https://github.com/NousResearch/hermes-agent/issues/103483

6.  **#110912 [OPEN] Nous Portal billing discrepancy** (12 评论, 1 👍)
    - **摘要**: 用户报告在订阅积分用尽后，部分模型路由（如 glm/kimi）被收取全价费用，疑似折扣路由 bug。
    - **诉求**: 计费系统的透明度与正确性。
    - **链接**: https://github.com/NousResearch/hermes-agent/issues/110912

---

## 5. Bug 与稳定性

按严重程度排列的关键 Bug：

### P0 / 高危
1.  **#111942 [CLOSED] CLI Startup Crash (NameError: file_signature)**
    - **状态**: 已修复。
    - **影响**: 阻止用户启动 CLI。
2.  **#100896 [OPEN] state.db corruption (4 incidents in 5 weeks)**
    - **描述**: 在 gateway + dashboard 多写者 WAL 模式下，`state.db` 频繁损坏。已确认是已知问题类 (#90837, #100313) 的一部分。
    - **关联 PR**: #110848 (Closed) 提供了 virtiofs 环境下的可控复现。
    - **链接**: https://github.com/NousResearch/hermes-agent/issues/100896
3.  **#59293 [OPEN] hermes config set bypasses system-config write protection**
    - **描述**: CLI 命令可绕过安全审批层，直接修改系统配置，存在安全风险。
    - **链接**: https://github.com/NousResearch/hermes-agent/issues/59293

### P1 高优先级
4.  **#105104 [OPEN] Desktop Bot Mode click intermittently fails**
    - **描述**: Desktop 侧边栏点击 Bot 无响应，且无后端活动记录。
    - **链接**: https://github.com/NousResearch/hermes-agent/issues/105104
5.  **#100437 [OPEN] v0.21.0 cron agent-jobs ignore model pin & Ollama fallback fails**
    - **描述**: 定时任务忽略模型指定，且本地 Ollama 回退失败。
    - **链接**: https://github.com/NousResearch/hermes-agent/issues/100437
6.  **#86592 [OPEN] Cron agents without HERMES_KANBAN_TASK get mandatory kanban_show protocol**
    - **描述**: 非 Kanban 调度的 cron agent 被强制要求执行 `kanban_show()`，导致报错。
    - **链接**: https://github.com/NousResearch/hermes-agent/issues/68592
7.  **#97065 [OPEN] Keet gateway setup crashes with TypeError**
    - **描述**: 在 Windows 11 上使用 Keet gateway 时设置向导崩溃。
    - **链接**: https://github.com/NousResearch/hermes-agent/issues/97065
8.  **#111761 [OPEN] Reasoning promoted into assistant content on clean stop**
    - **描述**: 当模型仅返回推理内容而无可见文本时，推理过程被错误地写入助手消息历史，污染上下文。
    - **链接**: https://github.com/NousResearch/hermes-agent/issues/111761

### P2-P3 中等/低优先级
9.  **#45983 [OPEN] Chatloop in Skill-Heavy Orchestrator Profiles**
    - **描述**: 技能密集型配置文件中，后台审查与压缩器冲突导致约 19 轮后进入循环。
    - **链接**: https://github.com/NousResearch/hermes-agent/issues/45983
10. **#41225 [OPEN] Background processes killed by SIGTERM during release()**
    - **描述**: 会话结束或上下文压缩时，`terminal(background=true)` 启动的进程被强制终止。
    - **链接**: https://github.com/NousResearch/hermes-agent/issues/41225
11. **#62548 [OPEN] ACP drops background completion notifications**
    - **描述**: 通过 ACP 适配器使用时，后台任务完成后通知可能丢失。
    - **链接**: https://github.com/NousResearch/hermes-agent/issues/62548

---

## 6. 功能请求与路线图信号

1.  **#97681 [OPEN] Bot Group Chats after Desktop closes**
    - **需求**: 增强 Desktop 作为“网关”而非“终端”的角色，支持离线状态下的持续运营。
    - **可能性**: 高。这与 Hermes 的网关架构方向一致，且有专门 PR 关注相关稳定性。
2.  **#69659 [OPEN] WhatsApp bridge: expose message history and contacts**
    - **需求**: 为 WhatsApp 桥接器添加读取历史记录和联系人的 API。
    - **可能性**: 中。属于平台扩展功能，已有相关 PR (#80601) 在处理 WhatsApp 的其他方面。
3.  **#38519 [OPEN] Hermes Desktop frontend install only**
    - **需求**: 允许仅安装前端并连接远程网关。
    - **可能性**: 中。已获 12 个 👍，用户呼声较高，有助于轻量化部署。
4.  **#55170 [OPEN] feat(web): improve models fallback management**
    - **需求**: 在 Dashboard 中提供可视化的 fallback provider 管理界面。
    - **可能性**: 高。对应 PR #55170 正在推进中，属于用户体验改进。
5.  **#91230 [OPEN] Task Completion Verification — exact-object completion**
    - **需求**: 提出将“精确对象完成”作为第六大 Hermes 法则，涉及架构层面的验证机制。
    - **可能性**: 长期路线图。需要社区深入讨论和决策。

---

## 7. 用户反馈摘要

-   **正面反馈**:
    -   用户对 `v0.21.3` 修复 CLI 崩溃表示欢迎 (#111942, #111943)。
    -   DeepSeek 兼容性问题 (#83390) 受到关注，表明用户广泛使用该 provider。
    -   Musa Spark 模型的流式处理问题 (#103483) 获得大量点赞，说明这是高频痛点。

-   **负面反馈/痛点**:
    -   **稳定性担忧**: `state.db` 损坏 (#100896, #110848) 是生产环境用户的重大隐患，尤其是在 Docker/virtiofs 环境中。
    -   **计费不透明**: Nous Portal 的定价逻辑 (#110912) 引起用户不满，认为存在 bug。
    -   **Desktop 体验**: Bot 模式点击无响应 (#105104) 和状态指示器不准 (#86592) 影响了桌面用户的日常使用。
    -   **安全性**: 配置泄露 (#59293, #84106) 让用户对数据安全感到担忧，尽管后者已修复。

-   **使用场景**:
    -   用户在 Debian/Ubuntu 服务器上部署自动化 cron 任务 (#87093, #100437)。
    -   企业/团队希望通过 WhatsApp/Discord 等平台与 Bot 互动 (#69659, #82982)。
    -   开发者利用 Hermes 作为 MCP 服务器，需处理严格的 JSON-RPC 格式 (#105738)。

---

## 8. 待处理积压

以下 Issue 长期未得到最终解决，建议维护者优先关注：

1.  **#100896 [state.db corruption]**: 多写者 WAL 模式下的数据库损坏问题已持续数周，有多起案例和相关 PR，但尚未根本解决。
    -   链接: https://github.com/NousResearch/hermes-agent/issues/100896
2.  **#59293 [Security: config bypass]**: CLI 绕过系统配置保护的安全漏洞。
    -   链接: https://github.com/NousResearch/hermes-agent/issues/59293
3.  **#45983 [Chatloop in Skill-Heavy Profiles]**: 复杂配置文件下的循环问题，影响生产稳定性。
    -   链接: https://github.com/NousResearch/hermes-agent/issues/45983
4.  **#88584 [Automated Nous integration blocked]**: CI/CD 自动化流程受阻，可能影响后续版本发布效率。
    -   链接: https://github.com/NousResearch/hermes-agent/issues/88584
5.  **#103483 [muse-spark streaming bug]**: 特定模型的流式响应处理缺陷，已获高关注但尚无合并 PR。
    -   链接: https://github.com/NousResearch/hermes-agent/issues/103483

---
*本报告由 Agnes-2.5-Flash 生成，基于 2026-09-16 提供的 GitHub 数据。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期：** 2026-09-16  
**分析周期：** 过去 24 小时  
**数据来源：** GitHub Issues & Pull Requests

---

## 1. 今日速览

AstrBot 在过去 24 小时内保持了 **高活跃度**，共接收 13 个新 Issue 和 37 个 PR 更新。社区对 **WebUI 改版后的文档同步**、**多模态图片处理缺陷** 以及 **提供商（Provider）稳定性** 高度关注。今日无明显的新版本发布，但多个关键 Bug 修复已合并，包括定时任务归属权问题、OrcaRouter 作为一等公民提供者的实现，以及插件元数据版本解析的兼容性修复。整体项目健康度良好，核心维护者响应迅速。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

### 今日合并/关闭的重要 PR

| PR # | 类型 | 标题 | 作者 | 影响 |
|------|------|------|------|------|
| [#10104](https://github.com/AstrBotDevs/AstrBot/pull/10104) | Fix | `cron`: 定时任务显示所属者而非空列表 | @Pleiades1726 | **修复 Group Chat 中定时任务被唤醒后无法识别归属者的问题**，确保 `future_task` 能正确绑定会话 ID。 |
| [#10102](https://github.com/AstrBotDevs/AstrBot/pull/10102) | Feat | OrcaRouter 成为一等公民 Provider，支持 API Key & OAuth 2.0 + PKCE | @kuswardhanietidims-svg | **大幅增强模型选型体验**，解决之前模型选择器仅读取共享表导致实际不可用模型的问题，支持实时目录同步。 |
| [#10093](https://github.com/AstrBotDevs/AstrBot/pull/10093) | Docs | 同步 WebUI 指南与当前导航结构 | @Soulter | **修复文档与前端改版不同步问题**，更新中英文指南以匹配新的菜单入口和配置流程，直接回应 Issue #10086。 |
| [#9933](https://github.com/AstrBotDevs/AstrBot/pull/9933) | Fix | 插件安装时保留名称大小写 | @Sisyphbaous-DT-Project | **修复 Windows/macOS 上含大写字母的插件安装失败问题**，避免因 `_format_name` 强制转小写导致的“目录已存在”错误。 |
| [#10096](https://github.com/AstrBotDevs/AstrBot/pull/10096) | Fix | 本地沙箱策略反馈优化 | @RC-CHN | **改进 Docker 部署下的文件访问策略提示**，使 Agent 在遇到网络或文件策略拒绝时能获得更清晰的错误解释，避免无效重试。 |
| [#8445](https://github.com/AstrBotDevs/AstrBot/pull/8445) | Feat | 统一各 Provider 的 User-Agent 处理与 Header 规范化 | @Soulter | 提升跨 Provider 请求的兼容性与可追踪性，减少因 Header 缺失或格式错误导致的认证失败。 |
| [#9554](https://github.com/AstrBotDevs/AstrBot/pull/9554) | Feat (Open) | 支持 OpenAI Responses API 原生工具 | @Star-Moon10 | 尚未合并，但已在追踪中，旨在将 `web_search`、`file_search`、`code_interpreter` 等原生工具集成进 AstrBot 配置面板。 |

**整体推进：** 项目正在从“功能堆砌”转向“体验打磨”阶段，今日重点解决了 **稳定性 Bug**（cron、插件安装、TTS 客户端生命周期）和 **可用性缺口**（文档同步、模型目录准确性）。

---

## 4. 社区热点

### 热门 Issue

1. **[#10086](https://github.com/AstrBotDevs/AstrBot/issues/10086)** [CLOSED] **WebUI 大改节奏与文档不同步**
   - **热度：** 高评论互动
   - **核心诉求：** 用户抱怨近期 WebUI 菜单频繁重设计，但官方文档未及时更新，导致操作迷失。
   - **结果：** 已合并 PR #10093 同步文档，但用户呼吁建立“改动必同步文档”的 PR 检查机制，并建议增加“旧入口→新入口”迁移指引。

2. **[#9854](https://github.com/AstrBotDevs/AstrBot/issues/9854)** [OPEN] **群聊上下文 GIF 动图未进行多帧处理**
   - **热度：** 中等，技术深度讨论
   - **核心诉求：** 当前 GIF 仅提取单帧作为静态图传入视觉模型，丢失动态信息。用户希望支持抽帧或多帧拼贴以提升对动画/表情包的理解。
   - **关联：** 同主题功能请求见 [#10103](https://github.com/AstrBotDevs/AstrBot/issues/10103)，形成 “Bug 报告 + 功能增强” 双轨讨论。

3. **[#10092](https://github.com/AstrBotDevs/AstrBot/issues/10092)** [OPEN] **历史 base64 图片导致 MemoryError**
   - **热度：** 高（崩溃类）
   - **核心诉求：** 长期对话中，base64 编码的大图占用大量内存，且上下文压缩默认关闭轮数裁剪，最终导致服务崩溃甚至无法处理纯文本。
   - **风险：** 严重稳定性问题，影响生产环境长期运行的机器人。

4. **[#10024](https://github.com/AstrBotDevs/AstrBot/issues/10024)** [CLOSED] **skills_like + 流式回复下工具调用完成后未发送最终答案**
   - **核心诉求：** 特定工具模式（re-query）下，模型生成的最终回答未被写入流式输出通道，用户仅看到过程话术。
   - **结果：** 已关闭，推测已在后续版本中修复，但具体 PR 未在列表中明确展示。

---

## 5. Bug 与稳定性

| 严重程度 | Issue # | 标题 | 状态 | Fix PR |
|----------|---------|------|------|--------|
| 🔴 **Critical** | [#10092](https://github.com/AstrBotDevs/AstrBot/issues/10092) | 历史 base64 图片导致内存耗尽（MemoryError） | OPEN | 暂无 |
| 🟠 **High** | [#10033](https://github.com/AstrBotDevs/AstrBot/issues/10033) | `<system_reminder>` 每轮写入对话历史且不清理 | OPEN | 暂无（代码逻辑遗漏） |
| 🟠 **High** | [#10089](https://github.com/AstrBotDevs/AstrBot/issues/10089) | 图片预处理缺少字节体积兜底，导致 413 错误 | OPEN | 暂无 |
| 🟡 **Medium** | [#9854](https://github.com/AstrBotDevs/AstrBot/issues/9854) | GIF 动图仅处理单帧，丢失动态信息 | OPEN | 暂无 |
| 🟡 **Medium** | [#9771](https://github.com/AstrBotDevs/AstrBot/issues/9771) | DeepSeek 视觉模型在工具循环中报 unsupported image | OPEN | 暂无 |
| 🟡 **Medium** | [#10105](https://github.com/AstrBotDevs/AstrBot/issues/10105) | Gemini 流式叙述文本未保存到历史 | OPEN | 暂无 |
| 🟢 **Low** | [#10097](https://github.com/AstrBotDevs/AstrBot/issues/10097) | WebChat 定时任务推送消息不实时显示 | OPEN | 暂无 |

**稳定性评估：**
- **内存管理**是当前最大隐患（#10092, #10033），建议维护者优先关注。
- **图片处理链路**存在多处缺陷（单帧 GIF、大体积无兜底、格式校验缺失），可能需要系统性重构。
- 今日已修复多个 **TTS Provider 并发与认证问题**（PR #10101, #10100, #10099），提升语音服务稳定性。

---

## 6. 功能请求与路线图信号

1. **[#10103](https://github.com/AstrBotDevs/AstrBot/issues/10103)** **GIF 动图多帧拼图支持**
   - 用户希望 AI 能理解动图内容，或至少提供一个开关关闭此功能。
   - **判断：** 可能与 #9854 合并处理，纳入下一版本的“多模态增强”模块。

2. **[#10094](https://github.com/AstrBotDevs/AstrBot/issues/10094)** **小红书 Dots 模型支持**
   - 用户反馈当前对小红书模型兼容性差，出现重复调用工具、回复错误等问题。
   - **判断：** 属于特定模型适配需求，若社区呼声高，可能作为独立 Provider 或模型补丁纳入。

3. **[#9554](https://github.com/AstrBotDevs/AstrBot/pull/9554)** **OpenAI Responses API 原生工具支持**
   - 正在开放中的 PR，拟将 `web_search`、`code_interpreter` 等原生工具整合进配置面板。
   - **判断：** 极有可能纳入下一版本，显著提升 OpenAI 模型用户的使用体验。

4. **[#10086](https://github.com/AstrBotDevs/AstrBot/issues/10086)** **WebUI 改版节奏控制与文档同步机制**
   - 用户呼吁建立“前端改动必同步文档”的规范。
   - **判断：** 反映维护流程改进需求，可能推动项目引入更严格的 CI/CD 检查清单。

---

## 7. 用户反馈摘要

- **痛点：**
  - “文档跟不上前端改版，找功能像玩迷宫。”（#10086）
  - “GIF 动图被当成静态图处理，AI 完全看不懂表情包的内容。”（#9854）
  - “长期对话后内存爆掉，连发文字都报错，严重影响了稳定性。”（#10092）
  - “定时任务在群里触发了，但 Bot 自己不知道是谁的任务，权限混乱。”（#10104 相关）

- **满意点：**
  - “OrcaRouter 现在能正确显示可用模型了，不再出现选了不能用。”（#10102）
  - “插件安装终于能处理大小写了，Windows 用户福音。”（#9933）
  - “WebUI 视觉改进不错，就是文档需要快点跟上。”（#10086）

- **使用场景：**
  - 群聊上下文感知（GIF 理解、图片描述）
  - 定时任务自动化（Cron Jobs）
  - 多 Provider 切换（DeepSeek、Gemini、OrcaRouter、Azure TTS）

---

## 8. 待处理积压

| Issue # | 标题 | 提出时间 | 风险等级 | 建议行动 |
|---------|------|----------|----------|----------|
| [#10092](https://github.com/AstrBotDevs/AstrBot/issues/10092) | 历史 base64 图片导致内存耗尽 | 2026-09-15 | 🔴 Critical | 优先分配开发资源，评估添加图片大小阈值与自动压缩逻辑。 |
| [#10033](https://github.com/AstrBotDevs/AstrBot/issues/10033) | system_reminder 未标记为 temp 导致上下文膨胀 | 2026-09-10 | 🟠 High | 简单代码修复，建议快速合并。 |
| [#10089](https://github.com/AstrBotDevs/AstrBot/issues/10089) | 图片预处理缺少字节体积兜底 | 2026-09-15 | 🟠 High | 与 #10092 关联，建议一并处理。 |
| [#9854](https://github.com/AstrBotDevs/AstrBot/issues/9854) | GIF 多帧处理缺失 | 2026-08-28 | 🟡 Medium | 需评估实现成本，可考虑作为 vNext 特性。 |
| [#9771](https://github.com/AstrBotDevs/AstrBot/issues/9771) | DeepSeek 视觉模型格式报错 | 2026-08-22 | 🟡 Medium | 长期未动，需确认是否仍复现。 |

**总结：** AstrBot 近期在社区反馈响应上表现积极，尤其在 **文档同步** 和 **Provider 兼容性** 方面有明显改进。当前主要风险集中在 **内存管理** 和 **多模态处理** 两个领域，建议维护者优先解决 Critical 级别的 Issue #10092 和 #10033。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目日报
**日期：** 2026-09-16
**数据来源：** GitHub Discussions & Releases

## 1. 今日速览
DeepSeek Harness (dsh) 在 v0.1.6-alpha.1 版本中显著扩展了执行边界，新增了 **Browser Use、Computer Use、Headless stdin 交互**及 **MCP v2** 支持，标志着项目从“代码代理”向“通用智能体平台”演进。过去 24 小时 Discussions 活跃度高达 201 条，社区对加密凭据管理（dsh-vault）、诊断工具（dsh doctor）及插件市场化的呼声热烈。尽管发布活跃，但 v0 会话迁移兼容性（#6045）及 Web 启动报错（#2699）等稳定性问题仍需关注。

## 2. 版本发布
**新版本：dsh-v0.1.6-alpha.1**

本次发版合并了大量关键功能与安全增强，主要亮点包括：

*   **执行能力扩展**：新增实验性 **Browser Use**（Playwright/Chrome DevTools MCP、Stagehand）和 **Computer Use**（Cua Driver MCP）支持；**Headless 模式**现支持从 stdin 接收任务、`--session-id` 续会及 `--json` 事件流输出。
*   **MCP 协议升级**：MCP 升级至官方 SDK v2，支持协议协商、工具分页及 URI 模板资源读取；内置 Profile 配置后可使用共享资源工具。
*   **工作区与终端增强**：Web 侧边栏新增多标签终端（支持 Shell 选择及刷新恢复）；扩展文件/命令/PTC 工具，支持通过 SSH 使用远端工作区。
*   **体验优化**：新增已归档会话列表及恢复功能；调整 DeepSeek V4.1 适配的图片缩放与 Token 估算；优化文件预览、Trajectory 展开交互及连接提示逻辑。
*   **其他修复**：修复了会话排序、分叉逻辑、Linux 子进程清理及多处 UI 问题。

> 📌 **注意**：本次为 alpha 版本，部分功能（Browser Use, Computer Use, Auto review）处于实验阶段，生产环境使用前请评估稳定性。

## 3. 项目进展
*由于该项目未启用 PR/Issues，以下基于 v0.1.6-alpha.1 Changelog 及 Discussions 热度推断开发重心：*

*   **多模态交互突破**：通过引入 Browser 和 Computer Use，DSH 不再局限于 CLI 和文件系统，开始具备操作图形界面和浏览网页的能力，极大扩展了智能体适用场景。
*   **自动化与集成深化**：Headless stdin 支持和 SSH 远端工作区表明项目正在向 CI/CD 集成和远程运维场景渗透。
*   **生态标准对齐**：MCP v2 的升级意味着项目紧跟 Model Context Protocol 官方标准，有利于第三方工具链的兼容。

## 4. 社区热点
*今日 Discussions 更新 201 条，以下为最活跃讨论：*

1.  **[Ideas] dsh-vault — 加密凭据保险库插件** (#1457) - **246 评论**
    *   **热点分析**：用户对敏感信息（SSH Key, API Token, TOTP）的安全管理需求迫切。@Ox0400 提出的基于 Node crypto 的零外部依赖方案获得高度关注，反映了社区对“本地优先”安全实践的认可。
2.  **[Ideas] Add 'dsh doctor' CLI command** (#1719) - **64 评论**
    *   **热点分析**：环境配置（pnpm, Node 版本, PATH）是新手入门的最大 friction point。社区强烈期待官方提供诊断工具以降低支持成本。
3.  **[Q&A] Bug: pnpm dsh web 启动失败 "--expose-internals"** (#2699) - **43 评论**
    *   **热点分析**：Windows 环境下 HMR 服务启动参数缺失的 Bug 困扰较多用户，复现路径清晰（v22/v24 Node 均受影响），急需官方修复。
4.  **[Ideas] 求一个 memory 能力** (#14) - **36 评论**
    *   **热点分析**：跨会话记忆是智能体的核心能力之一，用户希望迁移 Codex/Claude Code 的 memory 机制，表明用户对长期上下文保持有高阶需求。
5.  **[Ideas] x-opencode-session header** (#5495) - **25 评论**
    *   **热点分析**：第三方 API 提供商（OpenCode Go）要求特定 header 以进行路由和优化，涉及 25k+ 用户组织，暴露了项目在与第三方服务对接时的兼容性细节问题。

## 5. Bug 与稳定性
*   **[严重] 会话迁移失败** (#6045)：`session-format-v0-to-v1` 拒绝 `subagent/descriptor` version 2，导致 v0.1.0-rc.7 至 v0.1.1-rc.2 期间创建的子代理会话无法打开。**建议**：官方需提供数据修复脚本或向下兼容补丁。
*   **[高] 启动崩溃** (#2699)：`pnpm dsh web` 在 Windows 下因缺少 `--expose-internals` 标志而 HMR 服务失败。
*   **[中] 依赖解析卡死** (#3786)：`npx @deepseek-ai/dsh web` 在 npm 11.17.0 下出现死循环，CPU 100%，内存泄漏。
*   **[中] 会话日志损坏导致启动阻塞** (#6651)：损坏的 `session.v3.jsonl.zstd` 文件会阻止 `dsh web` 启动和会话列表加载，需增加容错或清理机制。
*   **[低] SSRF Guard 过于严格** (#5202)：`web-fetch-http` 在 transparent-proxy fake-ip DNS (198.18.0.0/15) 环境下拒绝所有请求，缺乏 allowlist 绕过机制。

## 6. 功能请求与路线图信号
*   **插件市场** (#4792)：用户抱怨现有标签搜索失效，呼吁官方建立经过验证的插件市场，类似 VS Code Extension Marketplace。
*   **临时聊天模式** (#5765)：用户希望支持不绑定具体项目的“临时聊天”，用于快速技术咨询或资料调查，降低使用门槛。
*   **Memory 跨会话持久化** (#14)：持续的高频需求，预计将在后续版本中作为核心能力被纳入。
*   **Docker 部署标准化** (#1762)：社区贡献了 Docker 镜像，反映出用户对容器化部署的强烈需求，官方可考虑提供官方 Docker 支持。

## 7. 用户反馈摘要
*   **痛点**：
    *   环境配置复杂，缺乏一键诊断工具（#1719）。
    *   敏感凭据管理不安全，依赖手动存储或明文配置（#1457）。
    *   旧版会话（特别是子代理会话）升级后无法打开，数据兼容性差（#6045, #6651）。
    *   Web 界面启动不稳定，尤其在 Windows 和特定 npm 版本下（#2699, #3786）。
*   **满意点**：
    *   v0.1.6 新增的 Browser/Computer Use 能力激发了社区对自动化边界的想象。
    *   MCP v2 的升级提升了技术先进性。
    *   侧边栏终端和会话归档功能改善了日常操作体验。

## 8. 待处理积压
*   **#6045 (高优先级)**：v0 会话迁移兼容性 Bug，影响大量存量用户，建议尽快发布热修复或提供迁移脚本。
*   **#2699 & #3786**：启动失败类 Bug，直接影响新用户转化和日常使用，需纳入近期 Sprint。
*   **#4792**：插件市场诉求强烈，虽非紧急 Bug，但关乎生态健康，建议产品层面进行规划回应。
*   **#5495**：与 OpenCode Go 等第三方服务的兼容性 header 问题，需评估是否在核心网络栈中默认支持。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*