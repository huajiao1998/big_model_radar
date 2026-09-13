# OpenClaw 生态日报 2026-09-14

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-13 23:45 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-09-14

> 数据来源：OpenClaw (github.com/openclaw/openclaw) GitHub Issues/PRs，统计窗口为过去24小时。

---

## 1. 今日速览

OpenClaw 在过去24小时内保持高度活跃，共产生 **500 条 Issue** 和 **500 条 PR** 更新，其中新开/活跃 Issue 287条、已关闭213条，PR待合并232条、已合并/关闭268条，**关闭率约为 55%**，显示维护团队正在积极处理积压问题。今日**无新版本发布**，但多项关键 Bug 修复和安全补丁已进入合并流程。整体来看，项目处于高强度迭代期，主要围绕更新可靠性、会话状态一致性和子代理管理进行攻坚。

---

## 2. 版本发布

**无新版本发布。**

当前最新稳定版本为 **2026.9.x** 系列，但有多个更新失败报告（#146394、#145192、#147160）表明 2026.9.3/9.4 升级流程存在稳定性风险，维护者已在 Issue #145252 中建立专项协调追踪。

---

## 3. 项目进展

### 今日合并/关闭的重要 PR

| PR | 类型 | 简述 | 影响 |
|----|------|------|------|
| [#147531](https://github.com/openclaw/openclaw/pull/147531) | Bug Fix | 修复 replay cleanup 后 assistant 丢失当前任务和工具结果的问题 | 提升会话恢复可靠性 |
| [#147508](https://github.com/openclaw/openclaw/pull/147508) | 性能优化 | 减少未变更远程分支的重复 Git 刷新工作 | 降低启动开销 |
| [#147555](https://github.com/openclaw/openclaw/pull/147555) | 测试清理 | 移除过时的 E2E smoke 检查 | CI 健康度维护 |

### 待合并的关键 PR（按优先级）

- **[#145117](https://github.com/openclaw/openclaw/pull/145117)** — 持久化终端收据（Terminal Receipts），解决进程重启后 run 状态丢失问题，**高风险高影响**。
- **[#143840](https://github.com/openclaw/openclaw/pull/143840)** — 长上下文 turn 在工具完成后正确收尾，修复输出耗尽时无法生成可用答案的问题。
- **[#146913](https://github.com/openclaw/openclaw/pull/146913)** — 隔离延迟配置重载的异步上下文，防止 turn 作用域泄漏。
- **[#147552](https://github.com/openclaw/openclaw/pull/147552)** — 防止云会话归档卡住或重新出现，改善 Control UI 体验。
- **[#145043](https://github.com/openclaw/openclaw/pull/145043)** — 防止过期 Codex 迁移阻塞升级，直接影响更新可靠性。

---

## 4. 社区热点

### 评论数 Top Issue

| Issue | 标题摘要 | 评论数 | 热度标签 | 链接 |
|-------|---------|--------|----------|------|
| #25592 | 工具调用间的文本泄露到消息频道 | 40 | 🦞 diamond lobster, P1, security | [链接](https://github.com/openclaw/openclaw/issues/25592) |
| #97616 | 子进程泄漏导致僵尸积累和运行时退化 | 30 | 🦪 silver shellfish, P1 | [链接](https://github.com/openclaw/openclaw/issues/97616) |
| #44925 | 子代理完成结果静默丢失 | 28 | 🦞 diamond lobster, P1 | [链接](https://github.com/openclaw/openclaw/issues/44925) |
| #135111 | malformed JSON arguments 间歇性错误 | 27 | 🐚 platinum hermit, P1, regression | [链接](https://github.com/openclaw/openclaw/issues/135111) |
| #91009 | Codex PreToolUse hook 引发 CPU 100% 并卡住 Gateway | 23 | P0, crash-loop | [链接](https://github.com/openclaw/openclaw/issues/91009) |

**热点分析：**
- **安全与数据泄露**是最大关切：#25592 涉及内部处理文本泄露到用户可见频道，被标记为 diamond lobster 级别安全相关 Issue。
- **子代理可靠性**是高频痛点：#44925、#143334 等多个 Issue 指向子代理完成通知丢失、挂起等问题，反映多代理编排仍处于成熟度爬升期。
- **更新机制脆弱**：多个 P0 级更新失败报告（#146394、#145192、#147160、#146958）集中爆发，说明 2026.9.3→9.4 升级路径需要紧急稳定。

---

## 5. Bug 与稳定性

### P0 级（发布阻断 / 崩溃）

| Issue | 描述 | Fix PR | 链接 |
|-------|------|--------|------|
| #91009 | Codex PreToolUse hook 导致 CPU 100% 并卡住 Gateway RPC | — | [链接](https://github.com/openclaw/openclaw/issues/91009) |
| #144911 | MCP server 初始化超时引发 Gateway 崩溃（未处理拒绝） | — | [链接](https://github.com/openclaw/openclaw/issues/144911) |
| #145252 | 2026.9.3/9.4 更新/升级/恢复可靠性追踪 | — | [链接](https://github.com/openclaw/openclaw/issues/145252) |
| #145192 | 2026.9.2→9.4 managed update 在 Doctor 阶段失败 | — | [链接](https://github.com/openclaw/openclaw/issues/145192) |
| #140162 | Windows gateway restart 将正在启动的进程误杀为 stale | — | [链接](https://github.com/openclaw/openclaw/issues/140162) |
| #145563 | 微信渠道 reply dispatch 失败（PreparedModelCatalogConfigReplacedError） | — | [链接](https://github.com/openclaw/openclaw/issues/145563) |
| #147160 | 2026.9.4 update finalize:doctor 失败 | — | [链接](https://github.com/openclaw/openclaw/issues/147160) |
| #146958 | 2026.9.2→9.3 升级在 llm-task 包元数据切换时失败 | — | [链接](https://github.com/openclaw/openclaw/issues/146958) |

### P1 级（高影响 Bug / 回归）

| Issue | 描述 | Fix PR | 链接 |
|-------|------|--------|------|
| #25592 | 工具调用间文本泄露到消息频道 | — | [链接](https://github.com/openclaw/openclaw/issues/25592) |
| #97616 | 子进程泄漏导致僵尸积累 | — | [链接](https://github.com/openclaw/openclaw/issues/97616) |
| #44925 | 子代理完成静默丢失 | — | [链接](https://github.com/openclaw/openclaw/issues/44925) |
| #135111 | malformed JSON arguments 回归（v2026.8.1） | — | [链接](https://github.com/openclaw/openclaw/issues/135111) |
| #119720 | 同步持久化阻塞 Gateway 事件循环 | — | [链接](https://github.com/openclaw/openclaw/issues/119720) |
| #139847 | 回复运行中收到的消息被丢弃（2026.9.2 回归） | — | [链接](https://github.com/openclaw/openclaw/issues/139847) |
| #137332 | 混合 requester-settle 批次无限重试 | — | [链接](https://github.com/openclaw/openclaw/issues/137332) |
| #143334 | 子代理完成投递丢失导致请求者饥饿 | — | [链接](https://github.com/openclaw/openclaw/issues/143334) |
| #144809 | claude-cli 长 turn 丢失整个生成回复 | — | [链接](https://github.com/openclaw/openclaw/issues/144809) |
| #145152 | stuck-session recovery 错误报告 force-clear 为 abort | — | [链接](https://github.com/openclaw/openclaw/issues/145152) |
| #132765 | agents_wait 忽略 timeoutSeconds，约60s后失败 | — | [链接](https://github.com/openclaw/openclaw/issues/132765) |
| #113701 | 大工具输出超出上下文窗口导致 failure loop | — | [链接](https://github.com/openclaw/openclaw/issues/113701) |
| #101929 | context-overflow 预检查高估 2.3-2.6x | — | [链接](https://github.com/openclaw/openclaw/issues/101929) |
| #143524 | SQLite WAL 无限增长至 GB 级，阻塞 Gateway 启动 | — | [链接](https://github.com/openclaw/openclaw/issues/143524) |
| #85030 | MCP 工具未注入子代理 session（已关闭） | — | [链接](https://github.com/openclaw/openclaw/issues/85030) |
| #137927 | 内部 context block 泄露到 Telegram 消息（已关闭） | — | [链接](https://github.com/openclaw/openclaw/issues/137927) |

### 有 Fix PR 的 Bug

- **#146118** → [#123737](https://github.com/openclaw/openclaw/pull/123737)（overflow recovery compaction guard 覆盖不全）
- **#146257** → [#146257](https://github.com/openclaw/openclaw/pull/146257)（Codex 用户准入镜像丢失）
- **#147531** → [#147531](https://github.com/openclaw/openclaw/pull/147531)（replay cleanup 后任务丢失）

---

## 6. 功能请求与路线图信号

| Issue/PR | 需求描述 | 关联 PR | 纳入下一版本可能性 |
|----------|---------|---------|-------------------|
| #27445 | `announceTarget` 选项：子代理完成通知路由到父会话而非直接到频道 | — | 中高（已有关联 PR #27445 linked-pr-open） |
| #79904 | SQLite transcript 游标读取 API（companion consumers） | #78595（refactor） | 中（依赖底层 refactor 完成） |
| #79903 | 跨旋转的 durable session lineage 和 sessionId 发现 | #78595 | 中 |
| #79905 | 类型化 transcript projections 和 companion rebuild contract | #78595 | 中 |
| #60381 | browser tool 增加 `force` 参数和 `evaluate` action | — | 低（feature request，stale） |
| #58057 | 动态身份解析用于 allowlists（dmPolicy: dynamic） | — | 低（stale） |
| #79047 | 跨后端模型切换时保留对话上下文 | — | 低（stale） |
| #79752 | Node v26 下 gzip 解压缩失败（已关闭） | — | — |
| #143840 | 长上下文 turn 在工具完成后正确收尾 | #143840 | **高**（已在待合并 PR 中） |
| #143944 | Feishu opt-in replaceable public-body previews | #143944 | **高**（已在待合并 PR 中） |
| #143882 | Slack streamed reasoning 渲染为 task cards | #143882 | **高**（已在待合并 PR 中） |
| #147238 | iOS Cloudflare Access browser 和 profile admission | #147238 | 中（iOS 原生功能扩展） |

**路线图信号：**
- 维护团队正在大力投入 **会话状态一致性** 和 **子代理编排可靠性**，多项 P0/P1 Bug 聚焦于此。
- **SQLite 运行时重构**（#78595）是长期基础工程，将支撑 transcript API、session lineage 等上层功能。
- **多渠道 UX 改进**（Feishu、Slack、iOS）持续推进，表明项目在多平台体验上的投入加大。

---

## 7. 用户反馈摘要

### 核心痛点

1. **子代理可靠性不足**：多个用户报告子代理完成结果静默丢失、挂起不通知、超时处理不当（#44925、#143334、#137332、#132765）。用户期望子代理像主代理一样有可靠的完成回调和错误传播。

2. **更新机制脆弱**：2026.9.3/9.4 系列升级频繁失败，表现为 Doctor 阶段拒绝、handoff lease 冲突、WAL 增长阻塞启动等（#145252、#146394、#145192、#147160、#146958）。用户对产品稳定性信心受影响。

3. **会话状态丢失**：context overflow 估计不准确导致过早截断（#101929）、大工具输出引发 failure loop（#113701）、replay cleanup 后任务丢失（#147531）等问题反复出现。

4. **内部状态泄露**：工具调用间文本泄露到消息频道（#25592）、内部 context block 可见于 Telegram（#137927）等安全问题引发用户担忧。

5. **资源管理缺陷**：子进程泄漏（#97616）、SQLite WAL 无限增长（#143524、#114612）导致长期运行的实例磁盘占满和性能退化。

### 用户满意点

- `openclaw doctor` 自动修复能力有所提升（#145503 确认修复流程正确运行）。
- 多渠道支持持续完善（Feishu preview、Slack reasoning cards、iOS Cloudflare Access）。
- 维护团队对高优先级 Issue 响应较快，多个 P0 Issue 在数天内获得关注。

---

## 8. 待处理积压

### 长期未关闭的重要 Issue（需维护者关注）

| Issue | 创建时间 | 状态 | 备注 |
|-------|---------|------|------|
| #25592 | 2026-02-24 | OPEN | 安全相关，工具调用间文本泄露，40条评论，近7个月未关闭 |
| #69208 | 2026-04-20 | OPEN | Umbrella Issue：跨渠道重复 transcript/replay/context 组装问题 |
| #114612 | 2026-07-27 | OPEN | memory-index SQLite 无界增长，无 retention policy |
| #63216 | 2026-04-08 | CLOSED (stale) | 重复硬重置问题，可能被 stale 关闭但根因未解 |
| #123009 | 2026-08-13 | OPEN | Codex subscription 每5分钟重新检查阻塞 |
| #98753 | 2026-07-01 | OPEN | CLI health/cron 命令关闭 Gateway WebSocket |
| #81182 | 2026-05-12 | OPEN | Overflow recovery 应提前截断工具结果而非等待完整 compaction 超时 |

### 待合并的高价值 PR

| PR | 创建时间 | 状态 | 备注 |
|----|---------|------|------|
| #145117 | 2026-09-11 | OPEN | 持久化终端收据，解决重启后状态丢失，merge-risk: compatibility/security/availability |
| #143840 | 2026-09-10 | OPEN | 长上下文 turn 正确收尾，size: XL |
| #146913 | 2026-09-13 | OPEN | 隔离延迟配置重载上下文，防止 turn 作用域泄漏 |
| #145043 | 2026-09-11 | OPEN | 防止过期 Codex 迁移阻塞升级，P1 优先级 |
| #147552 | 2026-09-13 | OPEN | 防止云会话归档卡住，改善 UI 体验 |

---

## 附录：项目健康度指标

| 指标 | 数值 | 评估 |
|------|------|------|
| Issue 日新增/活跃 | 287 | 高 |
| Issue 日关闭 | 213 | 中等（关闭率 42.5%） |
| PR 日待合并 | 232 | 高积压 |
| PR 日合并/关闭 | 268 | 中等（合并率 53.6%） |
| P0 Issue 数 | 8 | ⚠️ 需关注 |
| P1 Issue 数 | 15+ | ⚠️ 较多 |
| 新版本发布 | 0 | 无 |
| 安全相关 Issue | 2 (#25592, #137927) | 已处理1个，1个待跟进 |

**总体评估：** 项目活跃度很高，但 P0/P1 Bug 集中爆发，尤其是更新可靠性和子代理管理领域。维护团队正在通过大量 PR 推进修复，但部分核心 Issue 已积压数月。建议优先关注更新流程稳定性和子代理完成通知机制的修复。

---

## 横向生态对比

以下是基于 2026-09-14 社区动态的个人 AI 助手/自主智能体开源生态横向对比分析报告。

---

# 个人 AI 智能体开源生态日报分析 (2026-09-14)

## 1. 生态全景
当前个人 AI 智能体开源生态正处于**“从功能演示向生产级稳定性攻坚”**的转折期。主流项目如 OpenClaw、hermes-agent 和 DeepSeek Harness 均集中在修复 SQLite 并发、会话状态一致性及子代理可靠性等底层核心问题，表明生态已越过单纯追求 LLM 调用上限的阶段，进入对**持久化存储健壮性**和**多进程编排稳定性**的深度打磨期。同时，跨平台协议适配（如 OpenCode Go、MCP OAuth）和长期记忆管理成为新的技术高地，反映出用户对智能体在复杂环境中长期运行的实际期望正在快速提升。

## 2. 各项目活跃度对比

| 项目 | 今日 Issues | 今日 PRs | Release | 健康度评估 | 核心关注点 |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **OpenClaw** | 287 (活跃) | 232 (待合) | 无 | ⚠️ **高负荷** | 更新机制脆弱、子代理可靠性、WAL 膨胀 |
| **hermes-agent** | 394 (新/活跃) | 167 (已合) | 无 | ⚠️ **P0 密集** | Linux SQLite WAL 并发冲突、Gateway 架构重构 |
| **DeepSeek Harness** | N/A (Disc) | N/A | 无 | 🟡 **中等** | 0.1.5 回归测试、Windows 兼容性、配置迁移 |
| **Zeroclaw** | 37 | 50 | 无 | 🟢 **稳健** | v0.8.5 稳定化、RFC 流程规范化、安全准入 |
| **QwenPaw** | 5 | 7 | 无 | 🟢 **正常** | 会话持久化丢失、多智能体协作关键词优化 |
| **AstrBot** | 13 | 15 | 无 | 🟢 **健康** | QQ C2C 流式体验、OpenCode Go 协议适配 |
| **PicoClaw** | 9 | 4 | 无 | 🟡 **低活跃** | Web UI 性能瓶颈、嵌入式设备适配 |

## 3. OpenClaw 在生态中的定位

*   **规模优势**：OpenClaw 以每日 ~500 条 Issue/PR 吞吐量占据绝对头部地位，其 Issue 关闭率（~55%）和 PR 合并率（~54%）显示其拥有最强的维护团队执行力，是目前生态中**工程化程度最高**的项目。
*   **技术路线差异**：与 hermes-agent 和 AstrBot 相比，OpenClaw 更早触及**多代理（Multi-Agent）编排的深水区**。其社区热点集中在“子代理结果静默丢失”和“工具调用间状态泄露”，这表明 OpenClaw 的用户群更深地使用了子代理并行工作流，而不仅仅局限于单轮对话。
*   **短板暴露**：OpenClaw 的 2026.9.3→9.4 升级路径频繁失败，暴露了大型单体应用在版本迭代中的技术债累积风险，这是其目前面临的最大信任危机，也是 hermes-agent 试图通过“单 Gateway 统一架构”去规避的同类型问题。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求/痛点 |
| :--- | :--- | :--- |
| **SQLite/存储并发稳定性** | OpenClaw, hermes-agent, PicoClaw | Linux/Windows 下 WAL 文件被错误 unlink、状态.db 并发写入导致会话丢失或崩溃。hermes-agent 甚至出现了 Gateway 重启循环的 P0 级事故。 |
| **子代理/多智能体可靠性** | OpenClaw, QwenPaw, DeepSeek Harness | 子代理完成通知丢失、`reasoningEffort` 参数透传失败、多 Agent 协作时的上下文断裂。用户不再满足于单 Agent 流畅，而是要求多 Agent 编排的确定性。 |
| **会话持久化与状态恢复** | OpenClaw, QwenPaw, DeepSeek Harness | 重启后会话历史丢失（QwenPaw #7724）、Replay 清理后任务状态丢失（OpenClaw #147531）、自定义事件导致恢复崩溃（DSH #3191）。 |
| **协议兼容性适配** | AstrBot, Zeroclaw, PicoClaw | 快速跟进 OpenCode Go 新协议（需 `x-opencode-session` 头）、MCP OAuth 跨平台一致性、微信/飞书渠道的特定格式支持。 |

## 5. 差异化定位分析

*   **OpenClaw**：**企业级/高级个人助手**。功能最全，集成最多渠道（微信、Slack、Feishu），但复杂度极高，适合有较强运维能力的用户，主要挑战在于维持自身稳定性。
*   **hermes-agent**：**极客/本地优先型智能体**。强调“单 Gateway 拥有所有 Session”的架构革新，深度绑定 NousResearch 生态，对 Linux 环境下的并发细节处理有严苛要求，适合本地部署重度用户。
*   **DeepSeek Harness**：**模型研究与基准测试平台**。依托 DeepSeek 官方背景，聚焦于模型能力边界探索（如 reasoningEffort 调试）和插件化实验，更偏向开发者和技术研究者的 playground。
*   **AstrBot**：**国内社交渠道集成商**。强项在于 QQ/Telegram/WeChat 等国内主流平台的即时通讯集成，对国内网络环境和协议适配（如 C2C 流式回滚）响应最快。
*   **QwenPaw**：**阿里系多模态实验田**。侧重于 DeepSeek/V4 Flash 等新模型的快速适配以及多智能体协作的易用性，是验证通义千问生态能力的窗口。
*   **Zeroclaw**：**安全与规范化先行者**。在 v0.8.5 阶段强调零信任安全模型、RFC 投票流程和严格准入，适合对代码质量和安全合规有极高要求的团队。
*   **PicoClaw**：**边缘/嵌入式端侧助手**。专注于 RV1106 等低性能设备的 Web UI 优化，填补了资源受限环境下的智能体空白。

## 6. 社区热度与成熟度

*   **快速迭代/攻坚期**：**OpenClaw** 和 **hermes-agent**。两个项目均处于高频发布和大量 Bug 修复窗口，P0 级问题集中爆发，说明功能扩张速度快于稳定性治理速度。
*   **稳定化/固化期**：**Zeroclaw** 和 **DeepSeek Harness**。Zeroclaw 进入 v0.8.5 稳定线，Intake 冻结；DSH 专注于 0.1.5 候选版的回归测试，节奏相对沉稳。
*   **垂直深耕期**：**AstrBot**、**QwenPaw**、**PicoClaw**。这类项目垂直领域明确（社交渠道、国产模型、边缘设备），活跃度适中，主要解决特定场景下的痛点，而非通用性的系统重构。

## 7. 值得关注的趋势信号

1.  **SQLite 并发灾难成为行业通病**：OpenClaw 和 hermes-agent 同日爆发因 SQLite WAL 处理不当导致的 P0 级事故，这表明随着智能体从“单进程同步”向“多进程异步+持久化”演进，**现有的 SQLite 默认配置已成为架构瓶颈**。建议开发者关注 WAL 模式的配置优化或考虑引入更严格的数据库隔离机制。
2.  **配置迁移的“静默破坏”风险**：DeepSeek Harness 的 `text` 到 `prefix` 重命名导致内容静默丢失，OpenClaw 的升级 Doctor 阶段失败，反映出**缺乏破坏性变更（Breaking Change）警告机制**是开源项目的通病。用户开始对版本升级产生焦虑，项目方需重视配置校验和迁移向导。
3.  **OpenCode/MCP 协议碎片化加剧**：AstrBot、Zeroclaw、PicoClaw 均在处理 `x-opencode-session` 头或 MCP OAuth 兼容性问题，说明底层通信协议尚未完全标准化。**协议适配器层**的抽象能力将成为未来项目竞争力的关键指标。
4.  **子代理（Sub-agent）是下一个战场**：OpenClaw 和 QwenPaw 的用户反馈高度一致地指向子代理结果丢失和不通知问题。这意味着**多智能体编排的确定性**是下一版本的必争之地，谁解决了子代理状态同步问题，谁就能抓住高阶用户。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：** 2026-09-14
**数据源：** GitHub (zeroclaw-labs/zeroclaw)

## 1. 今日速览
ZeroClaw 在 v0.8.5 稳定化阶段保持高度活跃，过去24小时内产生 **37条 Issue** 更新和 **50条 PR** 活动，虽无新发布版本，但开发节奏紧凑。核心进展集中在安全策略落地（Shell V1权限、RPC认证强化）、运行时稳定性修复（SOP引擎、Config校验）及文档工具链完善。社区参与度极高，多个高优先级Bug和RFC讨论并行推进，项目整体处于“严格准入、快速迭代”的健康状态。

## 2. 版本发布
**无新版本发布。**
当前处于 v0.8.5 稳定化线（Tracker #9459）， intake 已冻结，重点在于修复遗留问题而非引入新功能。

## 3. 项目进展
今日虽无重大合并记录（0条已合并/关闭PR），但多个关键功能分支持续演进：
*   **持久化会话增强：** PR #10407 推进了“持久化会话提示附件”功能，支持SQLite-backed的多媒体附件管理，提升用户体验连续性。
*   **安全架构深化：** PR #10259 继续完善 RPC 认证机制（Stage 3），结合 PR #10255（OIDC令牌验证），零信任模型逐步落地。
*   **文档自动化：** PR #10840 新增 `llms.txt` 生成器，提升了项目对AI爬虫的友好度；PR #10839 补全了 Webhook-Ingress 能力标记文档。
*   **插件权限治理：** PR #10750 实现了渠道插件的出口（egress）控制，强化了沙箱边界。

## 4. 社区热点
以下为评论数最多或关注度最高的讨论：

*   **[Tracker] Maintainer decision queue for RFCs (#8692)**
    *   **评论:** 15 | **作者:** @Audacity88
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/8692
    *   **分析:** 建立维护者决策队列的追踪Issue，反映社区对RFC流程规范化的高度重视，旨在减少设计问题的积压和决策模糊性。

*   **RFC: Simplify RFC voting (#10549)**
    *   **评论:** 10 | **作者:** @Audacity88
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/10549
    *   **分析:** 提议简化RFC投票流程，移除强制讨论窗口，旨在降低贡献门槛，加速从提案到落地的周期。

*   **RFC: Clarify PR review evidence (#10366)**
    *   **评论:** 7 | **作者:** @Audacity88
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/10366
    *   **分析:** 澄清PR审查证据和快速合并通道的标准，涉及“无作者核心批准”时的处理逻辑，直接影响贡献者体验。

*   **OpenCode providers never send x-opencode-session (#10603)**
    *   **评论:** 3 | **点赞:** 3
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/10603
    *   **分析:** 这是一个高赞Bug，指出OpenCode中继缺少关键Header导致账户被标记风险，直接阻塞用户工作流，紧迫性高。

## 5. Bug 与稳定性
今日报告了多个中高风险Bug，主要集中在运行时行为和配置验证：

*   **[P1] SOP engine promotes steps before recording rejection (#10066)**
    *   **严重程度:** S1 - 工作流阻塞
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/10066
    *   **描述:** SOP引擎在记录输出模式拒绝前错误地推进后续步骤，导致状态不一致。
*   **[P1] config set and RPC config/set persist values without running validation (#10320)**
    *   **严重程度:** S2 - 降级行为
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/10320
    *   **描述:** CLI和RPC配置写入跳过校验，允许非法值持久化。
    *   **进展:** 已有跟进Issue #10837 确认并部分修复（RPC侧），CLI侧仍需处理。
*   **[P1] Failed Code/ACP turn discards durable history (#10788)**
    *   **严重程度:** S2 - 降级行为
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/10788
    *   **描述:** 代码/ACP轮次失败时，已接受的提示词和工具交换被丢弃，未写入持久历史，影响调试和审计。
*   **[P2] RpcDispatcher stack overflow on Windows (#10734)**
    *   **严重程度:** S2 - 降级行为
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/10734
    *   **描述:** Windows平台上RPC分发器接近2MB栈限制，存在崩溃风险。
*   **[P2] Notification lag cancels running turns (#10785)**
    *   **严重程度:** S2 - 降级行为
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/10785
    *   **描述:** zerocode通知延迟导致正在运行的Turn被错误取消。
*   **[P3] session/list-acp message_count mismatch (#10802)**
    *   **严重程度:** S3 - 轻微问题
    *   **链接:** https://github.com/zeroclaw-labs/zeroclaw/issues/10802
    *   **描述:** RPC接口返回的消息计数逻辑不一致。

## 6. 功能请求与路线图信号
*   **原子批量配置变更 (#10822):** 请求 `config/set-many` RPC方法，以支持原子性写入，确保复杂配置操作的幂等性和一致性。
*   **Explicit ZeroCode session root selection (#10826):** 要求使ZeroCode会话根目录选择更明确，并保留恢复时的根目录，改善开发者体验。
*   **WhatsApp PDF预览优化 (#10812):** 请求为WhatsApp渠道填充 `jpegThumbnail`，使PDF发送时能展示预览，属体验型增强。
*   **Hailo-Ollama原生支持 (#9109):** 尽管标记为Blocked，但仍作为长期功能请求存在，表明用户群体对特定边缘硬件支持的需求。

## 7. 用户反馈摘要
*   **痛点:** 用户对**配置校验缺失**（#10320, #10837）反应强烈，因为这可能导致系统处于不可预期的状态；**SOP引擎的状态机缺陷**（#10066）被标记为工作流阻塞级，严重影响自动化任务可靠性。
*   **场景:** 在长上下文ACR会话（如#10785描述的~200k token）中，稳定性问题（通知延迟导致的取消）是主要投诉点。
*   **满意度:** 社区对**RFC流程简化**（#10549）和**审查证据澄清**（#10366）持积极态度，认为这有助于降低参与门槛。
*   **安全关注:** OpenCode Session Header缺失（#10603）被广泛点赞，说明用户对API合规性和账户安全高度敏感。

## 8. 待处理积压
*   **[High Risk] crates.io publishing follow-ups (#9381):** 自7月底创建，涉及Windows检查点符号链接等高风险问题，虽不阻塞v0.8.4发布，但影响分发质量。
*   **[High Risk] Knowledge tool db_path tilde expansion (#10721):** 已关闭但问题根源在于全局替换导致的静默数据丢失风险，需确保修复彻底。
*   **[Medium Risk] Model routing config rejects custom providers (#10533):** 工具校验与配置Schema不一致，已关闭但可能遗留回归风险。
*   **[Ongoing] v0.8.5 Stabilization (#9459):** 需持续关注高优先级Bug的关闭情况，确保里程碑按时达成。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-09-14**

## 1. 今日速览
过去24小时，PicoClaw 项目保持中等活跃度，共处理 9 条 Issue 和 PR。社区对**Web UI 性能瓶颈**的关注显著上升，多条高评论 Issue 聚焦于低性能设备上的输入卡顿及长历史记录导致的 UI 响应问题。同时，长消息 IRC 支持和 OpenCode session 头兼容性成为新的功能讨论焦点。无新版本发布，整体项目处于功能优化与稳定性修复阶段。

## 2. 版本发布
*无新版本发布。*

## 3. 项目进展
今日合并/关闭了 4 条 PR，主要集中在国际化补全和历史遗留代码清理：
- **PR #3348**: 完成了捷克语 (Czech) 的 i18n 标签包装，提升了本地化完整性。
- **PR #1545**: 合并了早期的一系列修复 (PRs #1500, #1490, #1488, #1487, #1485)，有助于代码库的整洁。
- **PR #20**: 修复了 README 中的配置示例错误（OpenRouter `api_base` 及 JSON 键名），改善了新手上手体验。
- **PR #1268**: 合并了 iMessage 支持相关的日志优化、停止命令及隐私清洗功能。

**评估**：项目正在逐步清理早期积压的技术债并完善多语言支持，但核心功能的重大迭代较少。

## 4. 社区热点
以下 Issue 在今日讨论活跃，反映了用户的核心痛点：

1.  **[BUG] Web UI chat input is very laggy when history has a little bit long** (#3281)
    *   **作者**: @xpader | **评论**: 11 | **👍**: 2
    *   **链接**: https://github.com/sipeed/picoclaw/issues/3281
    *   **分析**: 用户反馈在 Web UI 中，随着聊天记录增加，输入框出现明显卡顿。这是一个影响用户体验的性能瓶颈，且在嵌入式设备上更为严重（见 Issue #3350）。

2.  **[Feature] Better support long messages in IRC** (#3287)
    *   **作者**: @superuser-does | **评论**: 12 | **👍**: 0
    *   **链接**: https://github.com/sipeed/picoclaw/issues/3287
    *   **分析**: 针对 IRCv3 协议中超过 512 字节的消息被分割的问题，用户期望 PicoClaw 能将其识别为单条连贯消息。12 条评论显示社区对此功能有较强需求。

3.  **[Feature] Add OpenCode Go session header support** (#3369)
    *   **作者**: @w33ble | **评论**: 1 | **👍**: 2
    *   **链接**: https://github.com/sipeed/picoclaw/issues/3369
    *   **分析**: 需要为 OpenCode Go 请求添加 `x-opencode-session` 头。虽然评论数较少，但获得了 2 个 👍，表明特定用户群体对此有明确需求。

## 5. Bug 与稳定性
今日关闭的 Issues 中暴露了以下关键稳定性问题：

1.  **[BUG] 嵌入式/低性能设备下 Web UI 输入框打字严重卡顿** (#3350) - *已关闭*
    *   **严重程度**: 高
    *   **描述**: 在 RV1106、RISC-V 等低性能硬件上，输入框因聊天记录长度导致 CPU 飙升和输入延迟。
    *   **状态**: 已标记为 stale 并关闭，可能需通过后续性能优化解决，而非单纯的行为修改。

2.  **[BUG] 自动压缩会物理删除 session 原始记录** (#3351) - *已关闭*
    *   **严重程度**: 中
    *   **描述**: `JSONLStore` 在 `SetHistory` 时会重写整个文件，导致历史数据不可恢复。用户质疑持久化存储的设计逻辑。
    *   **状态**: 已标记为 stale 并关闭，但根因（`rewriteJSONL` 行为）仍需关注，防止数据丢失风险。

3.  **[BUG] Web UI chat input lag** (#3281) - *保持 OPEN*
    *   **严重程度**: 中
    *   **描述**: 通用场景下的 Web UI 输入延迟，未限定硬件。
    *   **状态**: 待处理，是后续优化的重点方向。

## 6. 功能请求与路线图信号
-   **长消息 IRC 支持** (#3287): 用户希望改善 IRCv3 长消息处理。这可能暗示项目正在拓展或优化对传统即时通讯协议的兼容层。
-   **OpenCode Go Session 头** (#3369): 针对特定集成场景的兼容性增强需求。如果此类集成需求增加，可能会推动 API Provider 层的抽象改进。
-   **持久化存储机制优化**: Issue #3351 反映出的“压缩即删除”痛点，提示未来版本可能需要引入真正的 Append-Only 日志或独立的压缩备份机制，而非原地重写。

## 7. 用户反馈摘要
-   **性能焦虑**: 多位用户（@xpader, @chentianxiong123）集中反馈 Web UI 在长会话后的输入延迟，尤其是在资源受限的嵌入式设备上。这是当前最大的用户体验短板。
-   **数据安全感**: 用户（@chentianxiong123）对自动压缩导致的原始记录物理删除表示担忧，强调“失忆后历史无法找回”是不可接受的，呼吁改进存储策略。
-   **协议兼容性**: 高级用户（@superuser-does, @w33ble）关注 IRC 和 OpenCode 的细粒度兼容性，希望 PicoClaw 能更智能地处理协议边界情况。

## 8. 待处理积压
-   **#3281 [OPEN] Web UI input lag**: 通用场景下的性能问题，建议纳入下一版本前端渲染优化路线图。
-   **#3287 [OPEN] Long messages in IRC**: 功能增强需求，评论数较多，建议评估是否在当前维护周期内提供支持。
-   **#3369 [OPEN] OpenCode Go session header**: 特定集成需求，虽新但已获认可，可考虑小版本更新支持。

**维护者提醒**: 尽管 Issue #3350 和 #3351 已被标记为 stale 关闭，但其反映的性能和数据持久化问题仍是用户痛点，建议在版本更新说明中明确解决方案或提供临时规避指南。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：2026-09-14**
**数据来源：github.com/agentscope-ai/qwenpaw**

## 1. 今日速览
QwenPaw 社区昨日保持高活跃度，共更新 12 个议题（5 Issues + 7 PRs）。代码贡献方面，有 6 项待合并的改进提议，主要聚焦于修复 OpenAI 兼容层兼容性、扩展多智能体协作关键词及完善巴西葡萄牙语本地化。**未发布新版本**。整体来看，项目正处于稳定性修复与国际化完善的阶段，社区参与度良好。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
昨日共 **1 条 PR 已合并/关闭**，主要涉及语言支持的基础建设：
- **#4009 [CLOSED]**: 巴西葡萄牙语 (pt-BR) 本地化支持。该 PR 虽早在 5 月创建，但于昨日正式关闭（合并），为后续修复奠定了基础。

同时有 **6 条 PR 处于开放/审查状态**，预计近期将对版本产生直接影响：
- **#7738**: 修复 OpenAI 兼容层因中间件注入未知 kwargs 导致的 `TypeError`，提升代理兼容性。
- **#7737**: 扩展多智能体协作触发关键词，改善用户意图识别的第一轮准确率。
- **#7736**: 新增 DeepSeek V4 Flash 能力定义（100万 token 上下文、图像输入支持），丰富模型生态。
- **#7735**: 修复 MCP 协议中 HTTP 错误响应解码丢失的问题，提升调试体验。
- **#7734**: 修复 #4009 引入的 pt-BR 翻译错误，确保本地化完整性。
- **#7732**: 优化 ACP 权限选项匹配逻辑，解决跨代理会话中的误判问题。

## 4. 社区热点
以下是今日讨论最活跃或最具代表性的议题：

*   **#7724 [Bug]: 会话丢失** (@xiaohushi512)
    *   [链接](https://github.com/agentscope-ai/QwenPaw/issues/7724)
    *   **热度分析**: 用户反馈桌面端在长时间运行后出现会话历史丢失、模型配置重置的问题。这触及了用户核心工作流（长期任务连续性），评论数 3，反映了用户对数据持久化的焦虑。
*   **#7571 [Question]: 总是记不住，还是会遗忘** (@xiaohushi512)
    *   [链接](https://github.com/agentscope-ai/QwenPaw/issues/7571)
    *   **热度分析**: 插件开发场景下的上下文管理痛点。用户描述了“遗忘”指令和路径覆盖的多重问题，这不仅是 LLM 能力问题，也暴露了工具链与 Agent 交互边界的设计挑战。
*   **#7733 [Enhancement]: Agent-autonomous context management** (@MCQSJ)
    *   [链接](https://github.com/agentscope-ai/QwenPaw/issues/7733)
    *   **热度分析**: 提出让 Agent 自主参与上下文裁剪决策，而非单纯依赖 Token 阈值。这是进阶用户对于长任务稳定性的核心诉求。

## 5. Bug 与稳定性
昨日共报告 **2 个新 Bug** 和 **1 个持续性问题**：

1.  **#7724 [Critical]: 会话丢失**
    *   **描述**: 桌面端重启或长时间闲置后，对话历史和模型配置丢失，导致无法恢复工作。
    *   **状态**: 开放，暂无 Fix PR。
2.  **#7709 [Major]: 定时任务输出折叠/缺失**
    *   **描述**: v2.2.1 中定时任务结果常被折叠在 Thinking 步骤中或直接消失，影响监控体验。
    *   **状态**: 开放，暂无 Fix PR。
3.  **#7735 [Fix Available]: MCP HTTP 错误响应保留**
    *   **描述**: 原 Issue #7716，PR #7735 已提交修复方案，通过过滤过时的 HTTP 头来保留错误信息。

## 6. 功能请求与路线图信号
*   **DeepSeek V4 Flash 支持 (#7736)**: 用户/贡献者主动补充新模型能力，表明社区对扩展主流开源模型支持的强烈需求。
*   **多智能体协作优化 (#7737)**: 针对 #3113 的修复，显示项目正致力于降低多 Agent 协作的配置门槛，提高“开箱即用”的准确性。
*   **自主上下文管理 (#7733)**: 这是一个前瞻性的功能请求，建议未来版本探索让 Agent 具备上下文感知能力，而不仅仅是被动的 Token 截断。

## 7. 用户反馈摘要
*   **痛点**:
    *   **状态持久化不可靠**: 用户 (@xiaohushi512) 多次提及会话丢失、配置重置，这是当前桌面端最严重的用户体验短板。
    *   **路径与文件覆盖风险**: 在插件开发场景中，A/B/C 路径的混乱部署导致代码被意外覆盖，用户希望有更严格的沙箱或路径管理机制。
    *   **UI 信息呈现**: 定时任务的输出折叠问题影响了可观测性。
*   **满意点**:
    *   社区对多语言支持（pt-BR）和新模型适配（DeepSeek）积极响应。
    *   底层兼容性修复（如 OpenAI kwargs 过滤）受到重视，体现了对复杂部署环境的关注。

## 8. 待处理积压
*   **#7709**: 定时任务输出折叠问题，涉及 UI 渲染逻辑，需优先排查。
*   **#7724**: 会话丢失问题，涉及数据持久化层，可能影响用户信任，建议高优先级跟进。
*   **#7571**: 虽然归类为 Question，但反映了 Agent 记忆与工作流管理的深层设计缺陷，需架构层面评估。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报 — 2026-09-14

## 1. 今日速览
今日项目处于**高强度维护窗口**：过去24小时新增/活跃 Issue 394 条，合并/关闭 106 条；PR 总数 500 条（待合并 333，已合并 167）。核心焦点集中在 **state.db WAL 生成在 Linux 上的并发 unlink 问题**（多个 P0 级 Issue 同日爆发），同时围绕 Gateway 重启确认、模型选择器增强、Kanban 完整性校验等方向密集推进修复与特性 PR。无新版本发布，但大量 P0/P1 修复正快速入仓。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
**已合并/关闭的重要 PR：**
- **#105431** (feat/cli): 为辅助模型配置增加委托推理努力度选择，简化用户配置路径。
- **#110346** (feat): 在所有模型选择器（CLI/TUI/Gateway）中支持直接设置推理努力度，实现“一次选择同步配置”。
- **#108456** (fix/cron): 增强 cron 调度器的防竞态能力，保护运行输出，修复 Windows 下作业存储锁等待问题。
- **#106742** (feat/gateway): 核心架构推进 — 单一 Gateway 拥有所有本地 Session（CLI/TUI/Desktop/ACP/Bot/Cron 统一接入），减少状态分裂风险。

**进行中的关键 PR：**
- **#110379** (fix/state): 修复单进程多句柄导致的 WAL 生成分裂（macOS launchd 重启循环根因）。
- **#110345** (fix/update): 修正 Gateway 重启 credited by successor incarnation 而非 service name 的误判。
- **#110395** (feat/desktop): Desktop MCP 服务器发现与逐 Profile 启用功能。
- **#110397** (feat/cli): 模型选择器显示列表来源（live/discovered/catalog/bundled），解决“模型消失”排查难题。

整体判断：项目正在快速收敛 SQLite 并发稳定性问题，并向“单 Gateway 拥有所有 Session”的架构目标迈进。

## 4. 社区热点
**最活跃 Issues（按评论数）：**
- **#88584** [OPEN] (97 comments): Automatised Nous integration 合并冲突阻塞，cron/jobs.py 存在 conflict，无 release branch 变更。**诉求**：要求澄清集成流程与分支策略。
- **#109243** [CLOSED] (18 comments): cron external-worker 握手超时（5s vs 冷启动 12s）。**已关闭**，推测相关修复已在 #108456 中覆盖。
- **#109552** [OPEN] (17 comments): Label audit — 警告不要批量关闭 duplicate/invalid 标签。**诉求**：流程透明化。
- **#107402** [OPEN] (16 comments): `hermes update` 在推迟重启场景下留下永久警告并标记 fleet stale。**关联 PR**: #110345 正在修复。
- **#87654** [CLOSED] (12 comments): Vision 工具在首次可用性探测后消失，_AuxProbeClientStub 被缓存。**已关闭**，预计已修复。

**最活跃 PR：**
- **#106742** (One gateway owns every local session): 架构级重构，长期讨论后进入合并阶段，社区关注度极高。
- **#108914** (Bot Screen): 为无头 Linux Gateway 上的 Bot 提供 Xfce 桌面流式传输，支持人工接管后交还。**特色功能**，引发强烈兴趣。

## 5. Bug 与稳定性
**P0 级（严重，影响会话状态/兼容性）：**
- **#109687** [CLOSED]: 单次 CLI 调用在 Linux 上 orphan 活跃 Gateway 的 state.db WAL 生成，Gateway 静默丢弃会话写入。
- **#109728** [OPEN]: #109509 权限加固导致 SQLite 锁被释放，引发删除 WAL 生成与 Linux 会话中断。
- **#109786** [CLOSED]: 短生命周期写连接关闭时 unlink state.db-wal/-shm，毒化长运行 Gateway 的处理句柄。
- **#109727** [OPEN]: 第二个 Hermes 进程 unlink 在线 state.db-wal/-shm，导致运行中 Gateway 进入 DeletedWalGenerationError 死锁。
  - **关联修复 PR**: #110379 正在处理单进程多句柄 WAL 分裂问题。

**P1 级：**
- **#107402** [OPEN]: `hermes update`  deferred restart 场景下错误标记 fleet stale。
- **#87654** [CLOSED]: Vision 工具缓存失效导致工具静默消失。
- **#102792** [CLOSED]: Desktop 多 Profile 下新建 Session 丢失 owner metadata。
- **#105104** [OPEN]: Desktop Bot Mode 侧边栏点击无响应（非确定性，零后端活动）。
- **#77311** [OPEN]: Desktop renderer 内存随会话内容无界增长（重度使用后 5GB+）。
- **#71335** [OPEN]: 并发 Agent 进程共享 HERMES_HOME 时 MCP OAuth grants 损坏（Notion 示例）。
- **#80670** [OPEN]: Desktop 历史会话消息反应失败（4040 error）。
- **#103375** [CLOSED]: Bot tiles 无限重连循环占用后端池。
- **#86366** [CLOSED]: archive_and_compact 重复插入 tail 数据。
- **#92758** [OPEN]: MCP OAuth 桌面端失败（dashboard callback 丢失 RFC 9207 iss 参数）。

**稳定性总体评估：** SQLite WAL 并发问题今日集中爆发，多为 P0，反映 Linux 环境下多进程访问 state.db 的潜在竞争条件。部分问题已通过关闭 Issue 暗示修复，但仍有 #109728 和 #109727 开放，需密切关注 #110379 合并进展。

## 6. 功能请求与路线图信号
**近期高热度 Feature Requests：**
- **#19451** (9 comments, 7 👍): 使 global skills 真正跨 Profile 全局共享（当前仅 default）。
- **#5941** (8 comments, 30 👍): 将 Searxng 添加为默认 Web 搜索提供程序（支持 reranker 扩展）。
- **#16084** (9 comments, 2 👍): 飞书平台使用 CardKit streaming card 替代 im.v1.message.update 以改善流式体验。
- **#51217** (9 comments, 1 👍): 为 Hermes Desktop 添加德语（de）本地化。
- **#17543/#17542** (8 comments): TUI 状态栏官方插件 API 请求。

**可能纳入下一版本的功能（基于合并 PR 推断）：**
- **#105431/#110346**: 推理努力度配置融入模型选择器 — **高概率**。
- **#110395**: Desktop MCP 服务器自动发现与逐 Profile 启用 — **高概率**。
- **#110397**: 模型列表来源可见性 — **高概率**。
- **#108914**: Bot Screen（Xfce 桌面流式 + 接管）— **潜力功能**，视测试情况定版。
- **#106742**: 单 Gateway 统一 Session 架构 — **核心路线图中**。

## 7. 用户反馈摘要
**痛点集中区：**
1. **SQLite 并发与 WAL 丢失**：多个用户报告在 Linux 上运行 `hermes doctor`、`hermes sessions list` 等命令时导致 Gateway 会话中断，甚至陷入重启循环。用户情绪焦虑，直接影响生产环境稳定性。
2. **更新后状态不一致**：`hermes update` 在 deferred restart 场景下错误标记 fleet stale，用户困惑于“已更新但仍提示过旧”。
3. **Vision 工具静默消失**：长进程运行后 vision_analyze/browser_vision 工具不可用，Dashboard 显示启用但实际缺失，排查困难。
4. **多 Profile 会话创建故障**：Desktop 多 Profile 安装中新建 Session 丢失 owner metadata，立即报错“Couldn't open this session”。
5. **MCP OAuth 跨平台不一致**：桌面端发起的 MCP OAuth 登录因缺少 iss 参数而在支持 RFC 9207 的授权服务器上失败。
6. **内存泄漏**：Desktop renderer 随会话内容线性增长，重度使用后达 5GB+，影响多会话用户。

**满意点：**
- 模型选择器增强（推理努力度、来源可见性）被评价为“减少排查时间”。
- Cron 任务防竞态与输出保护增强受到认可。
- Bot Screen 功能引发热烈讨论，被视为“独特差异化特性”。

## 8. 待处理积压
**需维护者重点关注：**
1. **#109728** [OPEN, P0]: 权限加固导致 WAL 删除问题仍未彻底解决，#110379 PR 尚未合并。
2. **#109727** [OPEN, P0]: 多进程 unlink WAL 导致 Gateway 死锁，与 #109728 同类问题，需协同修复。
3. **#107402** [OPEN, P1]: `hermes update` 停滞重启警告问题，#110345 PR 已提出但待合并。
4. **#105104** [OPEN, P1]: Desktop Bot Mode 非确定性无响应，影响用户体验但难复现。
5. **#77311** [OPEN, P1]: Renderer 内存无界增长，长期技术债，需架构层面优化。
6. **#71335** [OPEN, P1]: 并发 MCP OAuth 令牌损坏，涉及跨进程锁机制，需安全边界评估。
7. **#88584** [OPEN, invalid]: 高评论数（97）的集成阻塞问题，需明确流程或关闭并归档。
8. **#19451** [OPEN, P3]: Global skills 跨 Profile 共享需求强烈（7 👍），但优先级较低，需排期。

**建议行动：**
- 优先合并 #110379 以解决 P0 级 WAL 分裂问题。
- 验证 #110345 修复 #107402 的有效性。
- 对 #88584 进行正式响应，澄清集成策略或关闭并记录决策。
- 评估 #77311 内存泄漏的优化方案，纳入长期技术债追踪。

---
*数据来源：GitHub API (2026-09-14)*  
*分析师：Agnes-2.5-Flash (Sapiens AI)*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目日报 — 2026-09-14

## 1. 今日速览
AstrBot 社区活跃度维持高位，过去24小时产生 **13 条 Issues** 和 **15 条 PR**，无版本发布。核心亮点是 **QQ C2C 流式回复回滚 Bug** 获得多个并行修复 PR，显示维护团队对平台兼容性的快速响应。同时，OpenCode Go 协议适配和 Windows 路径映射等长期积压问题取得进展。项目整体健康度良好，Bug 修复与功能扩展同步推进。

## 2. 版本发布
无新版本发布。

## 3. 项目进展

### 已合并/关闭的 PR
- **#10065** [CLOSED] WebChat 侧边线程模型选择修复
  - 作者: @Soulter
  - 链接: https://github.com/AstrBotDevs/AstrBot/pull/10065
  - 进展：修复了 WebChat 侧边线程未传递 `selected_provider` 和 `selected_model` 的问题，解决用户在使用非默认模型时侧边线程仍调用后端默认模型的体验缺陷。

- **#9703** [CLOSED] 图片预处理优化（本地进程阶段）
  - 作者: @piexian
  - 链接: https://github.com/AstrBotDevs/AstrBot/pull/9703
  - 进展：新增智能图片预处理逻辑，对 JPEG/PNG 静图保留原样，对非标准格式进行方向修正和缩放，对动图采样生成拼盘，提升多模态输入兼容性。

- **#8875** [CLOSED] Windows 路径映射崩溃修复
  - 作者: @he-yufeng
  - 链接: https://github.com/AstrBotDevs/AstrBot/pull/8875
  - 进展：修复 `PreProcessStage` 处理 Windows 盘符路径（如 `C:/remote:D:/local`）时的 `ValueError` 崩溃，提升 Windows 平台稳定性。

### 重要进行中的 PR
- **#10071** CUA 沙箱图片几何保持修复
  - 作者: @piexian
  - 链接: https://github.com/AstrBotDevs/AstrBot/pull/10071
  - 进展：解决电脑使用场景下图片缩放导致像素坐标点击漂移的问题，确保 CUA 沙箱中鼠标点击位置准确。

- **#10005** OpenCode Go 协议适配器
  - 作者: @piexian
  - 链接: https://github.com/AstrBotDevs/AstrBot/pull/10005
  - 进展：新增 OpenCode Go 订阅服务专用接入，自动补齐 `x-opencode-session` 请求头等必需字段，支持 Chat Completions、Responses 和 Messages 三种协议。

## 4. 社区热点

### 高关注度 Issues
1. **#10066** QQ C2C 流式回复回滚 Bug
   - 作者: @Linyesantan
   - 评论: 2 | 链接: https://github.com/AstrBotDevs/AstrBot/issues/10066
   - 热度分析：该 Issue 引发多个并行修复 PR（#10069、#10067、#9875），是今日最活跃的技术讨论点，反映用户对 QQ 私聊流式体验的高度关注。

2. **#10033** `<system_reminder>` 上下文污染
   - 作者: @lingyun14beta
   - 评论: 2 | 链接: https://github.com/AstrBotDevs/AstrBot/issues/10033
   - 热度分析：揭示框架设计漏洞——临时内容被持久化导致上下文线性增长，影响 token 效率和压缩触发时机，引发维护者对框架内部机制的重视。

3. **#10054** OpenCode Go 会话头缺失
   - 作者: @Rain-0x01-39
   - 评论: 2 | 链接: https://github.com/AstrBotDevs/AstrBot/issues/10054
   - 热度分析：用户反馈新版 OpenCode Go 要求 `x-opencode-session` 头但 AstrBot 未支持，直接关联到 #10005 PR 的提出，体现用户对新 API 变化的快速响应。

### 高关注度 PR
- **#8050** 流式工具结果合并
  - 作者: @he-yufeng
  - 链接: https://github.com/AstrBotDevs/AstrBot/pull/8050
  - 热度分析：长期开放 PR（创建于 2026-05-07），解决异步生成器工具调用的结果分片合并问题，对工具使用场景有重要意义。

- **#7779** Shipyard Neo 沙箱就绪检测
  - 作者: @RhoninSeiei
  - 链接: https://github.com/AstrBotDevs/AstrBot/pull/7779
  - 热度分析：同样为长期 PR（创建于 2026-04-24），改进沙箱运行时的就绪探针逻辑，提升容器化部署可靠性。

## 5. Bug 与稳定性

### 今日报告的高严重度 Bug
1. **#10066** [Bug] QQ C2C 流式回复回滚
   - 严重程度：**高**
   - 描述：流式消息先完整显示后回滚至首包几字，或长期停留"生成中"
   - Fix PR：**#10069**（@he-yufeng）、**#10067**（@Linyesantan）、**#9875**（@VZService-AI）
   - 状态：多个修复 PR 并行开发中，预计近期合并

2. **#10033** [Bug] `<system_reminder>` 上下文持续增长
   - 严重程度：**中**
   - 描述：临时时间提醒未标记为 temp，每轮重复写入对话历史
   - Fix PR：**#10060**（@lingyun14beta，相关标签唯一化改进）
   - 状态：需确认修复方案

3. **#10027** [Bug] Telegram 轮询日志 spam
   - 严重程度：**低**
   - 描述：频繁报错占满日志，影响问题排查
   - Fix PR：无
   - 状态：待处理

4. **#10068** [Bug] GitHub 插件源更新失败
   - 严重程度：**低**
   - 描述：GitHub API 限流时默认回退分支名导致 404
   - Fix PR：无
   - 状态：待处理

### 已关闭的 Bug
- **#10063** Desktop 4.28.0 启动失败（WebUI index digest mismatch）
  - 链接: https://github.com/AstrBotDevs/AstrBot/issues/10063
  - 状态：已关闭，可能通过版本更新或缓存清理解决

## 6. 功能请求与路线图信号

### 近期功能请求
1. **#10002** 插件页多语言 README 查看图标
   - 作者: @mjy1113451
   - 链接: https://github.com/AstrBotDevs/AstrBot/issues/10002
   - 诉求：提升插件市场的国际化体验
   - 路线图判断：低优先级 UI 改进，可能纳入后续版本

2. **#10030** 数据与日志界面添加编辑对话功能
   - 作者: @MidoriDaisuki
   - 链接: https://github.com/AstrBotDevs/AstrBot/issues/10030
   - 诉求：新版 UI 移除编辑功能导致用户无法删除不当回复
   - 路线图判断：用户体验回归问题，建议优先恢复

3. **#10054** OpenCode Go 会话头支持
   - 已通过 **#10005** PR 实现，显示维护团队对用户反馈的快速响应

4. **#10030** 编辑对话功能恢复
   - 链接: https://github.com/AstrBotDevs/AstrBot/issues/10030
   - 诉求：新版 UI 移除编辑功能导致用户无法删除不当回复
   - 路线图判断：用户体验回归问题，建议优先恢复

### 潜在路线图信号
- **OpenCode Go 协议适配**：#10005 PR 表明项目正在扩展对新 AI 协议的支持
- **平台兼容性增强**：QQ、Telegram、OpenCode 多平台适配并行推进
- **Windows 支持改善**：路径映射、沙箱坐标等多 Windows 专属问题修复

## 7. 用户反馈摘要

### 痛点
1. **QQ 流式体验差**：#10066 用户描述"完整 850 字回复只显示开头 5 个字"，严重影响私聊场景可用性
2. **上下文管理缺陷**：#10033 用户发现框架设计漏洞，临时内容持久化导致 token 浪费和压缩提前触发
3. **UI 功能倒退**：#10030 用户不满新版移除编辑对话功能，影响问题修复能力
4. **日志噪音**：#10027 用户抱怨 Telegram 轮询报错频繁，干扰正常日志查看
5. **插件更新不稳定**：#10068 用户遇到 GitHub API 限流时插件安装失败，缺乏容错机制

### 满意点
- **响应速度**：#10066 等多个 Bug 迅速获得社区关注和并行修复
- **新协议支持**：OpenCode Go 适配显示项目对生态变化的敏感度
- **Windows 兼容性**：路径映射等 Windows 专属问题得到重视和修复

## 8. 待处理积压

### 长期未响应的重要 Issue/PR
1. **#8050** 流式工具结果合并（创建于 2026-05-07，开放 4+ 个月）
   - 链接: https://github.com/AstrBotDevs/AstrBot/pull/8050
   - 影响：工具调用场景的流式响应完整性

2. **#7779** Shipyard Neo 沙箱就绪检测（创建于 2026-04-24，开放 5+ 个月）
   - 链接: https://github.com/AstrBotDevs/AstrBot/pull/7779
   - 影响：容器化部署的可靠性

3. **#9859** MCP 服务 Session terminated 错误
   - 作者: @jiangxiaoxuan0721
   - 链接: https://github.com/AstrBotDevs/AstrBot/issues/9859
   - 状态：用户提供临时修复脚本，但需官方整合

4. **#10027** Telegram 日志 spam
   - 链接: https://github.com/AstrBotDevs/AstrBot/issues/10027
   - 状态：无修复进展，影响日志可读性

### 建议维护者关注
- 优先合并 QQ C2C 流式修复 PR（#10069/#10067/#9875），解决高严重度 Bug
- 评估长期开放 PR（#8050、#7779）的当前状态，决定是否继续维护或关闭
- 回应 #10030 的 UI 功能恢复诉求，避免用户体验倒退
- 建立插件更新的容错机制，应对 GitHub API 限流等网络波动

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：** 2026-09-14  
**数据周期：** 过去 24 小时  
**分析师：** Agnes (Sapiens AI)

## 1. 今日速览
DeepSeek Harness (DSH) 社区在过去 24 小时内保持高度活跃，共计产生 **229 条** Discussions 更新。尽管当日无新版本发布（Releases），但社区围绕 `0.1.5` 版本候选版的回归测试、Windows 平台兼容性以及第三方插件生态进行了密集的技术交流。整体项目健康度良好，用户参与度高，但同时也暴露出若干影响核心体验的稳定性问题，需维护者重点关注。

## 2. 版本发布
**无新版本发布。**  
（注：由于该仓库未启用标准 PR 流程，代码合并通过 Releases 落地。当日无新 Release 生成，故无最新 changelog 摘要。）

## 3. 项目进展
当前项目处于 `0.1.5-rc.2` 阶段（基于社区核实基准提交 `c291e7961a`）。今日重点进展体现在社区对主干代码的**破坏性变更验证**上：
*   **配置键重命名排查：** 社区确认了 `0.1.5` 中将 agent persona config key 从 `text` 重命名为 `prefix` 的变更。虽然新版本静默接受旧配置而不报错，但会导致 persona 内容丢失（Discussion #6484）。这表明 `0.1.5` 的迁移路径存在设计缺陷，需在后续补丁中修复。
*   **插件标准化推进：** 第三方插件 `dsh-easyrewrite`（Discussion #3456）已获收录进 `awesome-dsh-plugin`，显示了社区工具链的逐步完善。

## 4. 社区热点
以下是过去 24 小时讨论最活跃的议题（按评论数排序）：

*   **[Bug] Web 启动失败：HMR 服务参数缺失**
    *   **讨论：** #2699 | **评论：** 39
    *   **链接：** https://github.com/deepseek-ai/deepseek-harness/discussions/2699
    *   **摘要：** 用户在 Windows 11 环境下执行 `pnpm dsh web` 时报错 `--expose-internals is required for HMR service`。此问题与路径无关，纯属启动参数缺失，影响面较广。
*   **[General] 微信交流6群招募**
    *   **讨论：** #1431 | **评论：** 65
    *   **链接：** https://github.com/deepseek-ai/deepseek-harness/discussions/1431
    *   **摘要：** 社区自建微信群持续活跃，用于插件开发与日常问题排查。
*   **[Plugin] EasyRewrite 插件分享**
    *   **讨论：** #3456 | **评论：** 26
    *   **链接：** https://github.com/deepseek-ai/deepseek-harness/discussions/3456
    *   **摘要：** 分享支持气泡内联编辑及撤回功能的插件，强调“惰性修改”特性，即在不发送前不污染会话上下文。
*   **[Bug] 0.1.5 已验证问题清单**
    *   **讨论：** #6520 | **评论：** 5
    *   **链接：** https://github.com/deepseek-ai/deepseek-harness/discussions/6520
    *   **摘要：** 社区成员 PerryLink 对 master 分支的 48 个已知问题进行收敛核实，包括 `sandbox_permissions` 导致的模型整轮循环失败等严重问题。

## 5. Bug 与稳定性
今日报告的 Bug 主要集中在平台兼容性和核心逻辑缺陷，按严重程度排列：

| 严重程度 | 问题描述 | 讨论链接 | 状态 |
| :--- | :--- | :--- | :--- |
| **高** | **write 工具在 exFAT 卷上必然失败**：Windows 下 write 工具因 exFAT 不支持硬链接而报错，但错误码误导为 `EISDIR`，极难排查。 | [#5704](https://github.com/deepseek-ai/deepseek-harness/discussions/5704) | 未修复 |
| **高** | **Subagents 丢失 reasoningEffort**：spawn-backed 子代理静默丢弃 `reasoningEffort` 参数，导致依赖 thinking 模型的端点拒绝所有委托请求。 | [#4666](https://github.com/deepseek-ai/deepseek-harness/discussions/4666) | 未修复 |
| **中** | **Windows Explorer 窗口永久隐藏**："Reveal in File Explorer" 操作在 Windows 上生成的窗口不可见且无报错。 | [#6505](https://github.com/deepseek-ai/deepseek-harness/discussions/6505) | 未修复 |
| **中** | **Session 恢复崩溃**：自定义会话事件（如 `dsh-click/action`）未被识别时，会导致会话恢复被拒绝。 | [#3191](https://github.com/deepseek-ai/deepseek-harness/discussions/3191) | 未修复 |
| **低** | **输入法拼音乱码**：中文输入法未上屏时，输入框自动填充错误汉字。 | [#6138](https://github.com/deepseek-ai/deepseek-harness/discussions/6138) | 未修复 |

## 6. 功能请求与路线图信号
*   **多 Preset 共存需求：** 讨论 #4675 指出 `tool-cordis` 的 inspect providers 是进程级全局的，导致两个基于 cordis 的 preset 无法在同一进程中共存。这反映了用户对**多 Agent 协作或隔离环境**的需求，当前架构存在瓶颈。
*   **数据持久化版本管理：** 讨论 #4910 强烈呼吁解决持久化格式（Session Log/Descriptor/Replay）的迁移问题。当前格式硬拒绝非当前版本，且无任何迁移路径，用户建议建立版本升级机制以避免数据丢失。

## 7. 用户反馈摘要
*   **痛点：**
    *   **排障困难：** exFAT 写入错误和 HMR 启动报错等错误信息晦涩难懂，用户感到沮丧（#5704, #2699）。
    *   **配置断裂感：** `0.1.5` 的 `text` 到 `prefix` 重命名不仅破坏了向后兼容性，还静默丢弃内容，用户认为缺乏迁移警告是重大体验倒退（#6484）。
    *   **第三方插件兼容性：** 插件写入的自定义事件导致主程序会话恢复崩溃，用户希望有明确的插件事件注册机制（#3191）。
*   **满意点：**
    *   社区互助氛围浓厚，微信群和问题排查帖响应及时。
    *   插件生态初具规模，EasyRewrite 等工具提供了官方缺失的编辑能力。

## 8. 待处理积压
*   **[Critical] 格式化版本迁移缺失：** Discussion #4910 长期未获官方回应。若未来强制升级 DSH 版本，用户现有的本地会话日志将全部变为不可读，存在数据丢失风险。建议尽快评估增加迁移工具或向下兼容支持。
*   **[High] 构建兼容性：** Discussion #3581 报告了在 pnpm 11 和 Node.js 24 下的构建失败问题（`npm_execpath` 被误执行），影响开发者贡献体验。

---
*报告生成时间：2026-09-14*  
*数据来源：DeepSeek Harness GitHub Discussions*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*