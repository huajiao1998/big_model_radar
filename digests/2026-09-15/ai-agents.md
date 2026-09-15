# OpenClaw 生态日报 2026-09-15

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-15 00:04 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报
**日期：2026-09-15 | 数据周期：过去24小时**

---

## 1. 今日速览

OpenClaw 过去24小时保持**极高活跃度**：新增/活跃 Issues 312条（已关闭188条），PR 282条待合并（已合并/关闭218条），Issue/PR 总量各达500条，社区参与密度显著。然而，**高流量伴随高故障率**——今日最引人注目的现象是 Gateway 在更新、子进程清理、MCP 初始化超时等多个关键路径上出现连锁崩溃和回归，P0/P1 级问题密集涌现，且多数与 2026.9.x 版本的升级流程相关。整体判断：项目处于**高频迭代但稳定性承压**的阶段，维护者需优先处理更新链路和进程生命周期管理。

---

## 2. 版本发布

> 过去24小时无新版本发布。当前最新稳定版本为 **2026.9.4**（`latest` 和 `beta` 频道均指向此版本）。

**相关追踪 Issue：**
- [#145252](https://github.com/openclaw/openclaw/issues/145252) [P0, Tracking] 2026.9.3 / 2026.9.4 更新、升级和恢复可靠性协调追踪 — 由 @roboclaw-bot 创建，覆盖 Doctor、迁移、回滚和重启可靠性

---

## 3. 项目进展

### 今日关闭/Closed PR（已合并）

| PR | 作者 | 说明 |
|---|---|---|
| [#140309](https://github.com/openclaw/openclaw/pull/140309) | @ylcn91 | **fix(gateway): Tailscale serve 启动时序修复** — 解决 Gateway 在 Tailscale daemon 连接前启动导致 `serve`/`funnel` 模式失效的问题（关闭 #139097） |
| [#148618](https://github.com/openclaw/openclaw/pull/148618) | @steipete | **fix: 手动插件重载测试确定性** — 消除测试中独立文件系统重载导致的非确定性失败 |
| [#148606](https://github.com/openclaw/openclaw/pull/148606) | @steipete | **fix(memory): watcher 清理前排空 agent 状态** — 修复 memory-watcher 测试 teardown 在异步数据库工作完成前删除临时状态的问题 |

### 今日关键 Open PR（等待审查/合并）

| PR | 作者 | 规模 | 状态 | 说明 |
|---|---|---|---|---|
| [#148213](https://github.com/openclaw/openclaw/pull/148213) | @steipete | XL | 👀 ready | **refactor(mcp): 共享 scoped worker 读取和批量请求器状态** — MCP OAuth 检查和 provider 准备重构，依赖 #148290 先行合并 |
| [#148256](https://github.com/openclaw/openclaw/pull/148256) | @zachisfine | XL | 👀 ready | **fix(ui): 恢复无 worker 的 repository sessions** — 解决用户返回 repository-only sessions 时无法继续控制的问题（关闭 #147495） |
| [#148494](https://github.com/openclaw/openclaw/pull/148494) | @dkattan | L | 📣 needs proof | **feat(imessage): narration progress bubble** — iMessage 对话中引入线程安全的进度气泡，修复群聊中 "working on it" 消息 spam 和生命周期 bug |
| [#148462](https://github.com/openclaw/openclaw/pull/148462) | @pfrederiksen | XL | 📣 needs proof | **fix(codex): 使用 managed auth 访问发现的 agent session stores** — 修复 Codex sidebar 发现其他 OpenClaw managed agent 的 session store 时使用过期凭证的问题（关闭 #145994） |
| [#148600](https://github.com/openclaw/openclaw/pull/148600) | @jalehman | M | 👀 ready | **fix: 避免 scope 关闭后错误的 context-engine quarantine** — 修复延迟的子 agent 完成清理继承已关闭 caller scope 导致健康引擎被隔离的问题（关闭 #148568） |
| [#148514](https://github.com/openclaw/openclaw/pull/148514) | @sla55er | S | 👀 ready | **fix(buzz): thread replies 共享 room session 问题** — Buzz 中 thread 内 @mention 机器人时错误使用 room 共享会话而非 thread 独立会话（关闭 #144331） |
| [#148348](https://github.com/openclaw/openclaw/pull/148348) | @ryannikolaidis | M | 📣 needs proof | **Report Workboard dispatch capacity skips** — Workboard 在 owner 容量满时静默跳过任务且无诊断信息 |
| [#148532](https://github.com/openclaw/openclaw/pull/148532) | @lrddrl | S | 📣 needs proof | **fix(browser): snapshot 响应无法区分 capture 是否实际发生** — `SnapshotResult` 增加 `captured: true` 字段（关闭 #148531） |

**进展评估：** 今日 PR 集中在**修复 2026.9.x 升级链路和 session/workflow 生命周期管理**，约 8 个关键 PR 等待 maintainer 审查，项目整体向前推进了 Gateway 稳定性和多 channel 一致性，但大规模 refactor（MCP worker、sessions archive）仍需前置 PR 落地。

---

## 4. 社区热点

### 讨论最活跃的 Issues（按评论数排序）

**🔴 P0 级热点：**

1. **[#146860](https://github.com/openclaw/openclaw/issues/146860)** — Windows 更新手谰无法获取进程启动身份，Scheduled Task `LogonType: InteractiveToken` 导致运行卡死在 `activating` 状态
   - 评论: 10 | 👍: 0 | 创建者: @rogerspires4452-dev
   - **热点原因：** P0 + UX release blocker，影响 Windows 用户群体的核心更新体验

2. **[#145252](https://github.com/openclaw/openclaw/issues/145252)** — [Tracking] 2026.9.3 / 2026.9.4 更新、升级和恢复可靠性
   - 评论: 9 | 创建者: @roboclaw-bot (官方bot)
   - **热点原因：** 官方协调追踪 issue，聚合了多个更新相关 bug

3. **[#145510](https://github.com/openclaw/openclaw/issues/145510)** — 2026.9.3 更新失败：`runtime-verification-failed`
   - 评论: 8 | 创建者: @amadeubordaneto
   - **热点原因：** 直接阻止用户升级到 2026.9.4，且有官方确认标签

4. **[#25592](https://github.com/openclaw/openclaw/issues/25592)** — agent 在 tool call 之间产生的文本泄漏到 messaging channels
   - 评论: 40 | 👍: 1 | P1 | 创建者: @doomclaw
   - **热点原因：** 最高评论数，严重影响 Slack/iMessage 等渠道的 UX，内部处理输出变成可见消息

**🟡 高关注功能需求：**

5. **[#48788](https://github.com/openclaw/openclaw/issues/48788)** — 集中式文件名编码工具，支持多编码 Content-Disposition 处理
   - 评论: 20 | P3 | 创建者: @alex-xuweilong
   - **热点原因：** 解决 Feishu 等 channel 中文文件名乱码的架构级需求

6. **[#119720](https://github.com/openclaw/openclaw/issues/119720)** — 同步 agent 持久化和 transcript 维护阻塞 Gateway event loop
   - 评论: 20 | P1 | 创建者: @todddickerson
   - **热点原因：** 规模化部署的关键瓶颈

---

## 5. Bug 与稳定性

### P0 级（发布阻塞/崩溃）

| Issue | 标题 | 类型 | fix PR? | 链接 |
|---|---|---|---|---|
| [#146860](https://github.com/openclaw/openclaw/issues/146860) | Windows 更新手谰无法获取进程身份，Gateway 卡在 activating | 崩溃/阻塞 | ❌ 无 | [#146860](https://github.com/openclaw/openclaw/issues/146860) |
| [#145510](https://github.com/openclaw/openclaw/issues/145510) | 2026.9.3 → 9.4 更新失败：runtime-verification-failed | 更新失败 | ❌ 无 | [#145510](https://github.com/openclaw/openclaw/issues/145510) |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP server 初始化超时崩溃 Gateway（未处理拒绝） | 崩溃 | ❌ 无 | [#144911](https://github.com/openclaw/openclaw/issues/144911) |
| [#123326](https://github.com/openclaw/openclaw/issues/123326) | 显式多 agent Codex 迁移导致 Gateway 启动 crash loop | 崩溃 | ❌ 无 | [#123326](https://github.com/openclaw/openclaw/issues/123326) |

### P1 级（严重功能缺陷）

| Issue | 标题 | 类型 | fix PR? | 链接 |
|---|---|---|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | agent tool call 间文本泄漏到 messaging channels | 数据泄漏/UX | ❌ 无 | [#25592](https://github.com/openclaw/openclaw/issues/25592) |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 未 reap 的子进程积累导致 zombie 和运行时退化 | 资源泄漏 | ❌ 无 | [#97616](https://github.com/openclaw/openclaw/issues/97616) |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 同步 agent 持久化阻塞 Gateway event loop | 性能/阻塞 | ❌ 无 | [#119720](https://github.com/openclaw/openclaw/issues/119720) |
| [#144809](https://github.com/openclaw/openclaw/issues/144809) | claude-cli turns > RUN_STALE_TAKEOVER_MS 丢失全部回复 | 数据丢失 | ❌ 无 | [#144809](https://github.com/openclaw/openclaw/issues/144809) |
| [#125570](https://github.com/openclaw/openclaw/issues/125570) | Skill Workshop update 覆盖 live skill description | 数据损坏 | ❌ 无 | [#125570](https://github.com/openclaw/openclaw/issues/125570) |
| [#141252](https://github.com/openclaw/openclaw/issues/141252) | ~~2026.9.2 回归：reply 运行失败 "no active tool authority snapshot"~~ | 已关闭 | ✅ 已关闭 | [#141252](https://github.com/openclaw/openclaw/issues/141252) |
| [#88312](https://github.com/openclaw/openclaw/issues/88312) | ~~2026.5.27 回归：Codex turn-completion stall~~ | 已关闭 | ✅ 已关闭 | [#88312](https://github.com/openclaw/openclaw/issues/88312) |

### P2 级（中等问题）

| Issue | 标题 | 类型 | 链接 |
|---|---|---|---|
| [#102175](https://github.com/openclaw/openclaw/issues/102175) | embedded prompt cache 跨 room-event/policy/Responses 边界失效 | 缓存失效 | [#102175](https://github.com/openclaw/openclaw/issues/102175) |
| [#139710](https://github.com/openclaw/openclaw/issues/139710) | mid-turn plugin-generation supersede 杀死 system-agent turn | 回归 | [#139710](https://github.com/openclaw/openclaw/issues/139710) |
| [#146004](https://github.com/openclaw/openclaw/issues/146004) | subagent completion 触发意外的 channel-less dashboard heartbeat | 回归 | [#146004](https://github.com/openclaw/openclaw/issues/146004) |
| [#125764](https://github.com/openclaw/openclaw/issues/125764) | Telegram adapter 网络失败后 dead-letter（仅1次尝试无重试） | 消息丢失 | [#125764](https://github.com/openclaw/openclaw/issues/125764) |
| [#142336](https://github.com/openclaw/openclaw/issues/142336) | Core /dashboard 阴影覆盖 Telegram Mini App launcher | 回归 | [#142336](https://github.com/openclaw/openclaw/issues/142336) |
| [#144876](https://github.com/openclaw/openclaw/issues/144876) | Tool-backed dashboard sessions 在 finalization 失败后静默结束 | 数据丢失 | [#144876](https://github.com/openclaw/openclaw/issues/144876) |
| [#125333](https://github.com/openclaw/openclaw/issues/125333) | totalTokens 通胀：memory-flush transcript 路径未受 #123065 修复覆盖 | 计量错误 | [#125333](https://github.com/openclaw/openclaw/issues/125333) |

**稳定性总评：** 过去24小时共报告 **4 个 P0、7 个 P1、7 个 P2** 级问题。其中 **P0 级问题占全部高优先级问题的 33%**，且全部与 **更新链路、进程生命周期、Gateway 启动** 相关，表明 2026.9.x 系列的稳定性存在系统性风险，尚未有对应 fix PR 的 P0/P1 问题占比超过 80%。

---

## 6. 功能请求与路线图信号

| Issue | 需求 | 呼声 | 可能纳入版本 | 链接 |
|---|---|---|---|---|
| [#48788](https://github.com/openclaw/openclaw/issues/48788) | 集中式文件名编码工具（支持 Shift-JIS/EUC-KR/GB18030 等多编码） | 评论20 | 2026.10+ | [#48788](https://github.com/openclaw/openclaw/issues/48788) |
| [#52640](https://github.com/openclaw/openclaw/issues/52640) | 持久化 task-status surface（长时 channel turns 的状态展示） | 评论8 👍2 | 2026.10+ | [#52640](https://github.com/openclaw/openclaw/issues/52640) |
| [#74077](https://github.com/openclaw/openclaw/issues/74077) | slash command 设置当前会话 streaming mode (`/stream` `/stream off` 等) | 评论8 👍1 | 低优先级 | [#74077](https://github.com/openclaw/openclaw/issues/74077) |
| [#74100](https://github.com/openclaw/openclaw/issues/74100) | Skill Graph 按需加载依赖链减少 Token 消耗 | 评论6 👍1 | 2026.11+ | [#74100](https://github.com/openclaw/openclaw/issues/74100) |
| [#51028](https://github.com/openclaw/openclaw/issues/51028) | Sessions panel 按最后有意义活动排序（非最后消息时间戳） | 评论7 | 低优先级 | [#51028](https://github.com/openclaw/openclaw/issues/51028) |

**路线图信号分析：**
- **#48788**（多编码文件名）与 **#148532**（snapshot captured 字段）和 **#148494**（iMessage progress bubble）形成功能互补，反映了 **channel adapter 质量提升** 是近期重点
- **#52640**（持久化任务状态）和 **#119720**（event loop 阻塞）都指向 **长时 agent turn 的可观测性** 需求
- **#74100**（Skill Graph 按需加载）与 **#125570**（Skill Workshop bug）相关——如果 skill 按需加载，skill description 覆盖 bug 的影响面也会缩小

---

## 7. 用户反馈摘要

### 核心痛点

1. **🔴 更新链路是不可接受的** — 多条独立报告指向同一问题域：
   - Windows Scheduled Task 更新手谰失败（#146860）
   - 2026.9.3 → 9.4 runtime verification 失败（#145510）
   - macOS npm global install swap 失败（#145072, 已关闭）
   - 官方 channel plugins 版本 skew 导致 Discord 加载失败（#135776, 已关闭）
   - **用户原话提炼：** "更新后 Discord 无法加载"、"Gateway 卡在 activating 状态"、"update 后核心版本和插件版本不一致"

2. **🔴 消息丢失和泄漏** — 两个相反方向的严重问题同时存在：
   - 内部处理文本泄漏到用户可见 channel（#25592，40条评论）
   - Telegram 网络失败后消息永久 dead-letter 无重试（#125764）
   - **用户原话：** "Slack 里出现了不应可见的内部 error handling 输出"、"一条重要消息在网络抖动后静默消失"

3. **🟡 子进程/资源泄漏影响长期运行** — 
   - zombie 进程积累（#97616）
   - MCP retry storm 耗尽 VM 资源（#68527，7条评论 👍1）
   - **用户原话：** "运行几天后 Gateway 内存持续增长"、"MCP server 配置错误导致 312 个子进程、10GB RSS"

4. **🟡 claude-cli 长时间 turn 丢失回复**（#144809）— 分钟级 turn 正常，之后回复消失，直接影响 Claude Code subscription 用户

### 满意度信号

- 👍 最高的已关闭 Issue：[#31331](https://github.com/openclaw/openclaw/issues/31331) (Docker sandbox +4👍)、[#76038](https://github.com/openclaw/openclaw/issues/76038) (Session Recovery +2👍)、[#108238](https://github.com/openclaw/openclaw/issues/108238) (totalTokens 计算 +1👍)
- 用户对 **修复后的回归问题** 反馈最为负面（多次提到 "之前是好的"）

---

## 8. 待处理积压

### 长期未响应的重要 Issue（维护者关注）

| Issue | 创建时间 | 天数未动 | 优先级 | 状态 | 链接 |
|---|---|---|---|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 2026-02-24 | **203天** | P1 | 40条评论，无 fix PR | [#25592](https://github.com/openclaw/openclaw/issues/25592) |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 2026-06-29 | **108天** | P1 | 30条评论，无 fix PR | [#97616](https://github.com/openclaw/openclaw/issues/97616) |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 2026-08-05 | **71天** | P1 | 20条评论，无 fix PR | [#119720](https://github.com/openclaw/openclaw/issues/119720) |
| [#125570](https://github.com/openclaw/openclaw/issues/125570) | 2026-08-18 | **58天** | P1 | 9条评论，无 fix PR | [#125570](https://github.com/openclaw/openclaw/issues/125570) |
| [#48788](https://github.com/openclaw/openclaw/issues/48788) | 2026-03-17 | **181天** | P3 | 20条评论，无 fix PR | [#48788](https://github.com/openclaw/openclaw/issues/48788) |
| [#102175](https://github.com/openclaw/openclaw/issues/102175) | 2026-07-08 | **99天** | P2 | 19条评论，无 fix PR | [#102175](https://github.com/openclaw/openclaw/issues/102175) |

### 待合并的 Open PR 积压

- [#148213](https://github.com/openclaw/openclaw/pull/148213) (XL, MCP refactor) — 依赖 #148290 先行
- [#148560](https://github.com/openclaw/openclaw/pull/148560) (M, skills metadata reads) — 同上依赖链
- [#147946](https://github.com/openclaw/openclaw/pull/147946) (M, archive publication) — 依赖 sessions worker 迁移

**建议优先级：**
1. 🔴 **立即关注：** #146860 (P0 Windows更新) 和 #145510 (P0 更新失败) — 直接影响用户升级
2. 🔴 **本周内：** #144911 (P0 MCP崩溃) — Gateway 稳定性关键
3. 🟡 **下周：** #25592 (P1 消息泄漏) — 最高评论数，用户痛点最明确
4. 🟡 ** backlog：** #97616 (P1 zombie进程) 和 #119720 (P1 event loop阻塞) — 规模化部署的前置条件

---

## 项目健康度评分

| 维度 | 评分 | 说明 |
|---|---|---|
| **活跃度** | ⭐⭐⭐⭐⭐ | 500+ Issues/PRs/24h，极高社区参与 |
| **响应速度** | ⭐⭐⭐☆☆ | 部分 P1 issue 超过 200 天未获 fix PR |
| **稳定性** | ⭐⭐☆☆☆ | P0 问题密集，更新链路系统性风险 |
| **代码质量** | ⭐⭐⭐⭐☆ | 今日关闭 PR 质量良好，refactor 方向正确 |
| **文档/沟通** | ⭐⭐⭐⭐☆ | 官方 bot 协调 issue、maintainer review 标签体系完善 |

**综合评级：B-（高活跃但稳定性承压）**

---

## 横向生态对比

基于 2026-09-15 的社区动态数据，以下是个人 AI 助手与自主智能体开源生态的横向对比分析报告。

### 1. 生态全景
2026 年 Q3，个人 AI 助手开源生态呈现“高频迭代与稳定性承压并存”的特征。项目重心从基础功能构建转向**生产级可靠性**（进程管理、会话持久化、MCP 兼容性）与**多模态渠道适配**。OpenClaw 和 hermes-agent 处于高并发维护状态，面临严峻的稳定性挑战；AstrBot 和 QwenPaw 则在快速修复核心链路 Bug；DeepSeek Harness 作为推理层工具，正解决本地部署的环境兼容痛点。

### 2. 各项目活跃度对比

| 项目 | 24h Issues | 24h PRs | Release | 健康度评级 | 核心状态 |
| :--- | :---: | :---: | :--- | :---: | :--- |
| **OpenClaw** | 312 | 282 | 无 (v2026.9.4) | **B-** | 高活跃但 P0 级更新/进程崩溃频发 |
| **hermes-agent** | ~500 | ~500 | v0.21.3 (补丁) | **B** | 极高流量，SQLite WAL 与多进程并发是主要风险 |
| **QwenPaw** | ~95 | ~11 (merged) | 无 | **B+** | 关注内存泄漏与 SubAgent 稳定性 |
| **Zeroclaw** | 22 | 50 | 无 (v0.8.5 收尾) | **A-** | 安全性加固，响应速度快，回归风险可控 |
| **AstrBot** | 11 | 19 | v4.28.1 | **A** | 响应迅速，WebUI 改版引发用户摩擦 |
| **PicoClaw** | 3 | 2 | 无 (v0.10.0 规划中) | **B+** | 中等活跃度，依赖兼容性待解 |
| **DeepSeek Harness**| 193 (Discussions)| N/A | 无 (rc 系列) | **B** | 聚焦本地部署环境与 UX 细节 |

### 3. OpenClaw 在生态中的定位
*   **规模与复杂度巅峰**：OpenClaw 以 500+ Issue/PR 的体量稳居生态核心，是功能最全面、渠道接入最广（Slack/iMessage/Telegram/Discord）的综合型网关。
*   **技术路线差异**：采用 Gateway + Worker 架构，强调多 Agent 协作与 MCP 生态集成。相比之下，hermes-agent 更侧重单机桌面体验与 SQLite 状态管理；AstrBot/QwenPaw 则更偏向轻量级、易部署的 Bot 框架。
*   **社区规模**：OpenClaw 拥有最密集的开发者参与，但也伴随最高的故障密度，是生态中“高风险高回报”的典型代表。

### 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
| :--- | :--- | :--- |
| **MCP 生态兼容性** | OpenClaw, QwenPaw, Zeroclaw | 解决 MCP Server 初始化超时、OAuth 凭证损坏、Java SDK 发现失败等问题；统一认证与状态管理。 |
| **长时运行稳定性** | OpenClaw, hermes-agent, QwenPaw | 解决子进程泄漏（zombie）、内存无限增长（OOM）、Gateway 事件循环阻塞等长期运行隐患。 |
| **会话与状态持久化** | OpenClaw, hermes-agent, QwenPaw | 优化 SQLite WAL 模式下的并发写入、避免重启后会话/配置丢失、确保流式传输不中断。 |
| **渠道消息完整性** | OpenClaw, AstrBot, hermes-agent | 修复消息泄漏（内部状态可见）、消息丢失（Telegram dead-letter）、流式协议收尾帧缺失等问题。 |
| **本地部署与启动体验** | DeepSeek Harness, AstrBot, PicoClaw | 改善 Windows/Linux 下的环境兼容性（Node/pnpm 版本、DPI 适配）、提供一键诊断工具（dsh doctor）。 |

### 5. 差异化定位分析

*   **OpenClaw**：**企业级多通道网关**。适合需要深度集成 Slack/Teams/iMessage 且具备一定运维能力的场景，技术栈复杂，维护成本高。
*   **hermes-agent**：**单机高性能智能体**。侧重桌面端体验、系统集成（Tray、DPI）及本地 SQLite 状态管理，适合个人强力助手场景。
*   **QwenPaw**：**阿里生态集成助手**。深度结合通义千问模型能力，侧重工具调用（MCP）与 UI 交互细节，适合国内用户及 ArXiv 等学术场景。
*   **AstrBot**：**轻量级多平台 Bot 框架**。以 QQ/Telegram 为核心，插件化生态丰富，部署简单，适合社群机器人快速搭建。
*   **Zeroclaw**：**安全优先的 Go 语言网关**。强调安全加固（OIDC、配对码强度）与代码整洁度，适合对安全性要求高的自托管用户。
*   **DeepSeek Harness**：**模型推理与交互层**。专注 DeepSeek 模型的本地 Web UI 体验，是连接模型与用户的桥梁，非全功能 Agent 框架。

### 6. 社区热度与成熟度

*   **快速迭代阶段**：**OpenClaw** 和 **hermes-agent**。Issue/PR 流量巨大，处于频繁修补生产环境 Bug 的状态，版本发布以补丁为主。
*   **质量巩固阶段**：**Zeroclaw** 和 **AstrBot**。活跃度适中，但 Bug 响应速度快（24h 内合并关键 Fix），版本节奏清晰，技术债务清理较为及时。
*   **稳定演进阶段**：**QwenPaw** 和 **DeepSeek Harness**。功能相对成熟，社区反馈集中在体验优化和特定场景适配（如中文输入法、MCP 兼容）。

### 7. 值得关注的趋势信号

1.  **MCP 成为新的稳定性瓶颈**：多个项目（OpenClaw, QwenPaw, Zeroclaw）同时爆发 MCP 相关 Bug，表明 MCP 协议在复杂生产环境（高并发、跨进程、OAuth 轮换）下的工程化成熟度仍不足，是未来半年的重点关注领域。
2.  **状态管理的并发挑战**：SQLite WAL 模式在多进程/多 Agent 场景下的数据损坏问题在 OpenClaw 和 hermes-agent 中集中暴露，提示开源社区需要重新评估轻量级状态存储在高负载下的适用性，或推动更严格的并发控制规范。
3.  **用户体验从“可用”转向“可靠”**：用户反馈从高阶功能需求转向“消息不丢失”、“更新不崩溃”、“内存不泄漏”等基础稳定性问题，表明行业已进入深水区，稳定性将成为区分优质项目与普通项目的关键指标。
4.  **本地部署环境标准化需求迫切**：DeepSeek Harness 的 `dsh doctor` 呼声及 OpenClaw 的 Windows 更新问题，反映出 Node/Python 混合栈项目在跨平台一致性上存在普遍短板，自动化环境诊断将成为标配功能。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：** 2026-09-15
**分析对象：** zeroclaw-labs/zeroclaw

## 1. 今日速览
ZeroClaw 在 2026-09-14 展现出极高的研发活跃度，过去 24 小时内共产生 72 次代码交互（22 个 Issues + 50 个 PR），净产出为正（关闭 11/合并 12）。今日重心明显转向**安全性加固**与**运行时稳定性修复**，特别是针对 OpenCode 会话头缺失、Telegram 轮询阻塞以及 Anthropic 拒绝处理等关键链路的修复。虽然无新版本发布，但多个 P1 级 Bug 的迅速响应表明维护团队处于高强度纠错模式，项目整体健康度良好，但存在近期引入的回归风险。

## 2. 版本发布
*   **状态：** 无新版本发布。
*   **关联里程碑：** 当前处于 **v0.8.5 finite weekly stabilization line** (Issue #9459) 的收尾阶段，该里程碑原定截止于 2026 年 8 月 30 日，目前仍在处理遗留的稳定性和安全议题。

## 3. 项目进展
今日合并/关闭了多项关键 PR，显著提升了系统的健壮性和安全性：

*   **OpenCode 会话关联修复 (PR #10640 / Issue #10603)**
    *   **进展：** 修复了 ZeroClaw 未向 OpenCode relay 发送 `x-opencode-session` 头的问题，该问题会导致 Go 模型无法正确关联会话并可能触发账户封禁。
    *   **后续：** 作者 @JordanTheJet 已在 Issue #10853 和 PR #10864 中整理了三个非阻塞性的后续优化项。
*   **强配对码默认化 (PR #10307)**
    *   **进展：** 将网关配对码默认策略从硬编码的 6 位数字（10^6 搜索空间）提升至可配置的更强策略，解决了 Issue #6613 中提出的安全隐患。
*   **HTTP 客户端统一代理路由 (PR #10748)**
    *   **进展：** 确保所有出站 HTTP 客户端均通过运行时代理配置，消除了部分 Channel 绕过代理策略的风险。
*   **转录管理器重构 (PR #10747)**
    *   **进展：** 统一了 8 个原生 Channel 的转录管理器构建方式，修复了因代码漂移导致的 4 个串行 Bug（#9153, #10032, #10487, #10494）。
*   **Docker 沙箱镜像可配置化 (PR #10745)**
    *   **进展：** 使 `[security.sandbox].image` 配置项真正生效，此前该配置项仅存在于文档中但无实际消费者。
*   **多模态图片大小默认值调整 (PR #10589)**
    *   **进展：** 将 `multimodal.max_image_size_mb` 默认值从 5MB 提升至 20MB（上限），解决了普通手机照片被误裁剪的问题（对应 Issue #10588）。

## 4. 社区热点
*   **RFC: 简化 RFC 投票流程 (Issue #10549)**
    *   **热度：** 10 条评论，处于 `status:in-progress` 和 `status:accepted`。
    *   **焦点：** 提议移除强制讨论窗口，使 `REVISE` 状态能立即停止当前快照。社区关注点在于减少流程摩擦与保证审查质量之间的平衡。
*   **RFC: 澄清 PR 审查证据与合并路径 (Issue #10366)**
    *   **热度：** 8 条评论。
    *   **焦点：** 引入了“快速合并通道”（expedited merge lane），允许在满足特定条件（如已有一个核心作者批准且无未解决发现）时加速审查。这反映了社区对提高贡献者留存率的诉求。
*   **OIDC Token 验证 Provider (PR #10255)**
    *   **焦点：** 由 @JordanTheJet 主导的大型安全增强 PR，支持 `oidc.<alias>` 配置边界，目前仍为 OPEN 状态，是下一步安全合规的关键依赖。
*   **原生 XMPP/Prosody Channel (Issue #9814)**
    *   **焦点：** 长期存在的功能请求，旨在支持 Home-lab 用户自托管轻量级聊天服务器。目前仍有 2 条评论，显示社区对此需求持续感兴趣。

## 5. Bug 与稳定性
今日集中爆发了一批 **P1 (Workflow Blocked)** 和 **P2** 级别的 Bug，主要集中在 Provider 集成和 Runtime 核心逻辑：

| 严重等级 | 组件 | 问题描述 | GitHub 链接 | 状态/Fix |
| :--- | :--- | :--- | :--- | :--- |
| **P1** | Provider | **OpenCode 缺失会话头**：导致 Go 模型工作流阻断，存在账户封禁风险。 | [Issue #10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) | **已修复** (PR #10640) |
| **P1** | Channel | **Telegram 语音更新无限重试**：拒绝的语音更新会阻塞长轮询，导致后续消息无法送达。 | [Issue #10863](https://github.com/zeroclaw-labs/zeroclaw/issues/10863) | **OPEN** (待修复) |
| **P1** | Agent/Runtime | **DateTimeSection 缓存失效**：系统提示词中的日期变化导致午夜时分所有打开会话的缓存前缀无效。 | [Issue #10858](https://github.com/zeroclaw-labs/zeroclaw/issues/10858) | **OPEN** (修复中) |
| **P1** | Provider | **ZeroCode 图片能力误判**：文本模型会话仍接收图片附件，导致 Provider 返回 400 错误。 | [Issue #10857](https://github.com/zeroclaw-labs/zeroclaw/issues/10857) | **OPEN** (待修复) |
| **S1** | Provider | **工具输出图片标记畸形**：工具输出中的文字图片标记被错误提升为 Provider 图片，导致解析失败。 | [Issue #10854](https://github.com/zeroclaw-labs/zeroclaw/issues/10854) | **OPEN** (待修复) |
| **S2** | Channel | **非视觉模型媒体占位符泄露**：文本模型对话历史中包含 `[media attachment]` 字面量而非被降解。 | [Issue #10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) | **OPEN** |
| **S2** | Daemon | **诊断信息丢失错误链**：Supervisor 仅记录 `to_string()`，丢弃了 anyhow 错误的底层原因。 | [Issue #10232](https://github.com/zeroclaw-labs/zeroclaw/issues/10232) | **已关闭** (修复中) |
| **S3** | TUI | **ZeroCode Delete 键无效**：聊天输入框中 Delete 键无响应。 | [Issue #10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) | **已关闭** |

**稳定性评估：** 今日有 5 个高优先级 Bug 尚未解决，尤其是 Telegram 阻塞和零代码图片处理问题，可能影响生产环境的用户体验。

## 6. 功能请求与路线图信号
*   **AnySearch Web Provider (Issue #10336) - [已关闭]**
    *   用户提议将 AnySearch 作为内置 `web_search_tool` 提供商。虽然 Issue 已关闭，但未明确说明是否纳入。考虑到零代码对其他搜索集成的态度，需观察是否会有后续 PR。
*   **PostgreSQL 内存测试 CI (Issue #10087) - [已关闭]**
    *   请求在必要 CI 中运行 `memory-postgres` 测试套件。已关闭表明需求已被采纳或解决，通常意味着测试基础设施已更新。
*   **LLMs.txt 文档生成 (PR #10840) - [OPEN]**
    *   新增 mdBook 渲染器以生成 `llms.txt` 和 `llms-full.txt`。这反映了项目对 AI 搜索引擎优化（AIO）和机器可读文档的需求增长。
*   **Docker 沙箱镜像可配置 (PR #10745) - [已合并]**
    *   此功能的实现表明路线图正在强化隔离性和部署灵活性，预计未来会有更多类似的安全配置选项。

## 7. 用户反馈摘要
*   **痛点：** 用户报告了 **ZeroCode TUI 的基础交互缺陷**（Delete 键无效，Issue #10796），以及 **Telegram 频道在生产环境中的阻塞问题**（Issue #10863），后者被描述为“workflow blocked”。
*   **满意度：** 用户对 **配对码强度增强**（PR #10307）和 **多模态图片默认大小调整**（PR #10589）表示认可，这些修复直接解决了长期存在的 usability 和 compatibility 问题。
*   **使用场景：** Home-lab 用户持续呼吁 **XMPP 原生支持**（Issue #9814），以便替代资源消耗较大的 Matrix 或依赖第三方服务。

## 8. 待处理积压
*   **Telegram 语音重试阻塞 (Issue #10863)**：P1 级 Bug，可能导致生产环境消息中断，需优先关注。
*   **DateTimeSection 缓存失效 (Issue #10858)**：P1 级 Bug，影响所有使用系统提示词缓存的会话，修复中但尚未合并。
*   **OpenCode Session 头后续优化 (Issue #10853)**：虽然是 follow-up 任务，但涉及安全 Header 的完整性，建议在下一个维护周期处理。
*   **原生 XMPP Channel (Issue #9814)**：长期未实现的功能请求，若团队有意扩展轻量级集成，建议评估优先级。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-09-15** | 数据来源：github.com/sipeed/picoclaw

---

## 1. 今日速览

PicoClaw 在过去 24 小时内保持中等活跃度，共处理 3 个活动项（1 个 Issue + 2 个 PR）。项目无新版本发布，核心关注点集中于技术债务清理（Issue #3365 诊断 QQ 频道 401 认证问题）和文档/功能迭代。一个关键 PR（#3379）已完成合并，推进了 v0.10.0 冲刺规划。社区整体健康度良好，但 Issue #3365 暴露的依赖兼容性风险需持续关注。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

### ✅ 已合并/关闭

**PR #3379** — [docs: v0.10.0 sprint plan](https://github.com/sipeed/picoclaw/pull/3379)  
- **作者：** @stpinkie  
- **状态：** CLOSED (2026-09-14)  
- **贡献：** 完成 v0.10.0 冲刺规划文档，将 `.todo.md` 草案深化为可实施细节，覆盖 Tracks 60–66，确立执行顺序 60→65→61→62→63→64→66。  
- **意义：** 为下一版本开发建立清晰路线图，减少需求模糊性。

---

## 4. 社区热点

### 🔥 活跃 Issue

**Issue #3365** — [QQ channel fails with 401 "Authorization参数格式错误"](https://github.com/sipeed/picoclaw/issues/3365)  
- **作者：** @crazysarah  
- **状态：** OPEN (stale) | 创建：2026-09-04 | 最后更新：2026-09-14  
- **互动：** 2 条评论 | 👍 1  
- **环境：** Orange Pi 3B (RK3566, aarch64), picoclaw v0.3.1, botgo v0.2.1, resty v2.17.1  
- **核心问题：** botgo v0.2.1 + resty >= v2.17 组合导致 QQ 频道 API 调用时 Authorization 头格式错误，引发 401 认证失败。  
- **用户诉求：** 需要明确依赖兼容性矩阵或提供 workaroumd，反映用户对国产 AI 助手硬件集成稳定性的期待。

### 💡 功能请求

**PR #3370** — [feat(tools): add Keenable web search provider](https://github.com/sipeed/picoclaw/pull/3370)  
- **作者：** @ilya-bogin-keenable  
- **状态：** OPEN (stale) | 创建：2026-09-07 | 最后更新：2026-09-14  
- **功能：** 新增 Keenable 作为 `web_search` 提供商，无需 API key，仅需设置 `tools.web.keenable.enabled=true`。  
- **技术细节：** 调用 Keenable 公开端点 (`POST /v1/search/public`)，通过 `X-Keenable-Title` 头传递请求。  
- **意义：** 扩展项目搜索能力，降低用户接入门槛，符合"零配置开箱即用"设计理念。

---

## 5. Bug 与稳定性

### ⚠️ 已报告问题

| Issue | 严重程度 | 描述 | Fix PR |
|-------|----------|------|--------|
| #3365 | **中** | QQ 频道 401 认证失败，botgo + resty 版本兼容性问题 | 无 |

**分析：** 该问题影响国产 AI 助手硬件（Orange Pi 3B）用户群，可能导致核心社交渠道功能失效。需维护者确认是否需在下一版本升级 botgo/resty 依赖或提供配置 workaround。

---

## 6. 功能请求与路线图信号

### 📋 潜在纳入 v0.10.0 的功能

1. **Keenable Web Search Provider** (PR #3370)  
   - 用户价值：提供免 API key 的搜索能力，扩展工具生态。  
   - 成熟度：代码已实现，等待合并。  
   - 建议：可考虑纳入 v0.10.0，丰富工具链。

2. **依赖兼容性修复** (Issue #3365)  
   - 用户需求：确保 QQ 频道等国产社交渠道稳定工作。  
   - 技术债务：botgo v0.2.1 + resty >= v2.17 组合需验证。  
   - 建议：可列为 v0.10.0 维护项，或发布补丁版本。

---

## 7. 用户反馈摘要

### 😤 痛点

- **依赖黑盒：** 用户难以定位 botgo/resty 版本冲突根因，需更清晰的兼容性文档。
- **国产渠道集成：** QQ 频道等国内社交场景稳定性直接影响硬件用户体验。

### 😊 满意点

- **零配置设计：** Keenable 搜索功能无需 API key，符合开箱即用理念。
- **文档规范化：** v0.10.0 冲刺规划文档提升开发透明度。

---

## 8. 待处理积压

### ⏳ 需维护者关注

| 类型 | 编号 | 链接 | 风险 |
|------|------|------|------|
| Issue | #3365 | [QQ 频道 401 错误](https://github.com/sipeed/picoclaw/issues/3365) | 高 | 影响核心社交功能，无临时方案 |
| PR | #3370 | [Keenable 搜索](https://github.com/sipeed/picoclaw/pull/3370) | 中 | 功能已实现，等待合并 |

**建议：** 
1. 优先响应 Issue #3365，确认依赖兼容性或提供 workaround。
2. 评估 PR #3370，考虑纳入 v0.10.0 以提升工具生态丰富度。

---

**项目健康度评估：** 🟡 良好 | 活跃度：中等 | 技术债务：中 | 用户满意度：待观察

**数据来源：** GitHub API (github.com/sipeed/picoclaw) | 生成时间：2026-09-15

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目日报 | 2026-09-15

## 1. 今日速览
QwenPaw 在过去 24 小时内保持高活跃度，共处理 **95 条** Issue/PR 更新。社区反馈显示系统稳定性面临挑战，主要集中在内存泄漏、会话持久化和配置丢失等问题上。开发侧反应积极，当日有 **11 条 PR 合并/关闭**，涵盖安全修复、MCP 兼容性改进及控制台体验优化。**无新版本发布**，但多个关键 Bug 修复正在审核中，预计将随后续版本跟进。

## 2. 版本发布
**无新版本发布。**

## 3. 项目进展
今日核心推进方向为**安全性加固**、**MCP 生态兼容性**及**UI/UX 细节优化**：

*   **安全加固**：PR [#7769](https://github.com/agentscope-ai/QwenPaw/pull/7769) 和 [#7766](https://github.com/agentscope-ai/QwenPaw/pull/7766) 修复了 Desktop 本地 API 认证缺失及 Hub 文件预览鉴权绕过问题，提升了本地部署和云端协作的安全性。
*   **MCP 兼容性修复**：针对 Java/Kotlin MCP SDK 的服务发现失败问题，PR [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) 和 [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735) 改进了错误信封解析和 HTTP 响应处理，直接回应了 Issue #7716 和 #7728 的痛点。
*   **控制台体验优化**：PR [#7704](https://github.com/agentscope-ai/QwenPaw/pull/7704) 实现了聊天文件抽屉移至右侧（响应 Issue #7739），PR [#7750](https://github.com/agentscope-ai/QwenPaw/pull/7750) 优化了文件发送后的展示逻辑，PR [#7681](https://github.com/agentscope-ai/QwenPaw/pull/7681) 修复了侧边栏折叠状态持久化问题。
*   **基础工具修复**：PR [#7761](https://github.com/agentscope-ai/QwenPaw/pull/7761) 支持了 glob 搜索中的花括号展开，修复了数据文件查找遗漏问题。

## 4. 社区热点
以下 Issue 评论数较高，反映了用户当前的核心关注点：

*   **[Bug] 定时任务无输出/结果折叠** ([#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709)): 6 条评论。用户反馈定时任务执行结果经常丢失或折叠在 thinking 步骤中，影响自动化工作流的可靠性。
*   **[Bug] Spawn subAgent 全部超时失败** ([#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)): 6 条评论。Windows 用户报告子智能体孵化后必然超时，即使延长 timeout 也无解，表明并发或资源隔离机制可能存在严重缺陷。
*   **[Question] 记忆遗忘与路径混乱** ([#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571)): 6 条评论。用户深入探讨了长期记忆（Memory）在多路径（开发/运行时）场景下的不一致性，反映了复杂工作流下记忆管理的成熟度不足。
*   **[Bug] 内存无界增长至 20GB+** ([#7222](https://github.com/agentscope-ai/QwenPaw/issues/7222)): 4 条评论。这是一个长期存在的性能隐患，用户提供了详细的复现路径（流缓冲区、keep-alive 实例堆积），建议维护者优先关注。
*   **[Bug] 会话丢失与大模型配置重置** ([#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724), [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708)): 各 4 条评论。多位用户报告非预期重启后会话历史和模型配置丢失，直接影响用户体验连续性。

## 5. Bug 与稳定性
按严重程度排列，今日主要问题如下：

| 级别 | 问题描述 | Issue | Fix PR/状态 |
| :--- | :--- | :--- | :--- |
| **Critical** | **内存泄漏/耗尽**：运行时内存持续增长至 20GB+ 或容器 OOM | [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722), [#7222](https://github.com/agentscope-ai/QwenPaw/issues/7222) | 未合并，需深入排查流缓冲和实例生命周期 |
| **Critical** | **SubAgent 挂起**：spawn 子代理必然超时失败 | [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) | 待调查 |
| **High** | **会话/配置持久化失效**：重启后历史会话丢失、大模型配置重置 | [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724), [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708), [#7745](https://github.com/agentscope-ai/QwenPaw/issues/7745) | PR [#7745] 相关讨论中 |
| **High** | **MCP 连接失败**：升级 2.2.x 后无法连接/注册 MCP 服务，尤其是 Java SDK | [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716), [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728) | **PR [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729), [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735) 已提交** |
| **Medium** | **定时任务输出折叠**：结果被折叠或隐藏 | [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) | 待修复 |
| **Medium** | **Daily Paper 静默失败**：arXiv 不可达时错误信息误导 | [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | 待修复 |
| **Low** | **工具权限回退**：ACP trusted 模式意外回退到交互式提示 | [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726) | **PR [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) 已提交** |

## 6. 功能请求与路线图信号
*   **右侧历史对话栏**：Issue [#7739](https://github.com/agentscope-ai/QwenPaw/issues/7739) 提出将历史对话移至右侧以适配小屏幕。PR [#7704](https://github.com/agentscope-ai/QwenPaw/pull/7704) 已实现该功能，预计下一版本可见。
*   **Skills 渠道隔离**：Issue [#7746](https://github.com/agentscope-ai/QwenPaw/issues/7746) 请求限制特定 Skills 仅在指定 Channel 可用，目前尚无对应 PR，属于有效需求。
*   **记忆系统增强**：Issue [#3995](https://github.com/agentscope-ai/QwenPaw/issues/3995) 和 [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) 反映了用户对记忆生命周期管理（归档、去重、多路径同步）的强烈需求，可能指引未来 ReMe 系统的演进方向。

## 7. 用户反馈摘要
*   **痛点**：
    *   **数据丢失恐惧**：多次出现“会话丢失”、“配置重置”的反馈（#7724, #7708），用户对数据的持久化稳定性缺乏信心。
    *   **内存压力**：长期运行任务导致内存暴涨（#7222, #7722），限制了 QwenPaw 在生产环境或长周期自动化场景中的应用。
    *   **MCP 集成阻力**：升级后 MCP 连接兼容性问题（#7716）阻碍了开发者接入外部工具链。
*   **满意点**：
    *   社区对 UI 细节（如文件展示位置 #7750、侧边栏折叠 #7681）的关注度高，表明用户注重交互体验。
    *   开发者对 `glob_search` 花括号展开（#7761）等小功能修复反应积极。

## 8. 待处理积压
*   **内存泄漏问题**：Issue [#7222](https://github.com/agentscope-ai/QwenPaw/issues/7222) 和 [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) 涉及根本性的架构问题（流缓冲、实例堆积），需分配资深工程师进行深入 profiling 和修复。
*   **SubAgent 稳定性**：Issue [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) 描述的子代理必败问题严重阻碍多步推理工作流，建议优先调查超时和状态同步机制。
*   **长期未结 Issue**：Issue [#4354](https://github.com/agentscope-ai/QwenPaw/issues/4354)（大 Excel 读取中断）和 [#4220](https://github.com/agentscope-ai/QwenPaw/issues/4220)（向量索引不同步）虽已关闭但反映出的工具链和记忆同步问题仍需关注。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：2026-09-15**

## 1. 今日速览
hermes-agent 项目在昨日发布了 v0.21.3 补丁版本，整合了约 338 个 PR 以修复远程网关登录及稳定性问题，目前项目活跃度极高，过去 24 小时内产生 500 条 Issue 更新和 500 条 PR 更新。社区对 SQLite `state.db` WAL 模式下的多进程并发稳定性问题高度关注，多个 P0/P1 级别的崩溃与数据损坏报告集中爆发，显示出生产环境下的潜在风险。同时，桌面端在 Windows/Linux 下的兼容性修复（如 DPI 适配、启动令牌传递）以及插件扫描器的行为优化成为今日 PR 的主要焦点。

## 2. 版本发布
**v2026.9.14: Hermes Agent v0.21.3**
- **发布日期**：2026 年 9 月 14 日
- **性质**：补丁发布（Patch release）
- **内容概要**：合并了自 v0.21.2 以来的约 338 个 PR，主要为下游消费者（Docker 镜像、Hermes Cloud、托管部署）提供稳定标签。重点修复了远程网关登录问题。
- **迁移注意**：作为补丁版本，建议所有生产环境用户升级以获取稳定性修复；无需大幅配置变更。

## 3. 项目进展
今日主要推进了以下修复与功能：
- **桌面端稳定性修复**：@KoNit-K 提交了一系列针对 Linux/Windows 桌面端的修复，包括保留自定义 `HERMES_HOME` (#100899)、传递已解析的 Dashboard Session Token (#101094)、修复 Windows 混合 DPI 下的玻璃材质丢失 (#106293) 以及保持活动指示器动画 (#106468)。
- **技能与插件扫描优化**：@teknium1 修复了插件扫描器因 Markdown 注释中提到攻击形状而硬阻断的问题 (#111274)，并允许技能命名其拒绝读取的密钥（如 `authorized_keys`）而不被隔离 (#111265, #111255)。
- **Computer Use 修复**：修复了 cua-driver 0.21+ 版本中元素点击失效的问题 (#111313)。
- **安全加固**：提升了 WhatsApp 桥接依赖 `qs` 的版本以修复 DoS 漏洞 (#105488)，并修复了 JWT 格式 API 密钥的脱敏逻辑 (#106520)。

## 4. 社区热点
- **Automated Nous integration is blocked** ([#88584](https://github.com/NousResearch/hermes-agent/issues/88584))
  - **热度**：100 条评论
  - **分析**：集成自动化流程中的冲突问题引发大量讨论，用户关注持续集成的稳定性。
- **Bot Group Chats should keep working after Desktop closes** ([#97681](https://github.com/NousResearch/hermes-agent/issues/97681))
  - **热度**：28 条评论
  - **分析**：用户期望在桌面端关闭后，Bot 群聊仍能跨设备工作，体现了对“无头”运行模式的高需求。
- **System tray support for background running** ([#38007](https://github.com/NousResearch/hermes-agent/issues/38007))
  - **热度**：11 条评论，19 个赞
  - **分析**：长期存在的功能请求，用户强烈希望避免冷启动开销，支持系统托盘后台运行。
- **web_server event loop stalls** ([#58576](https://github.com/NousResearch/hermes-agent/issues/58576))
  - **热度**：14 条评论
  - **分析**：高负载下 UI 冻结问题影响用户体验，用户报告了具体的 Python GIL 压力场景。

## 5. Bug 与稳定性
**高优先级 (P0/P1) 问题：**
- **state.db 损坏与 WAL 问题**：
  - [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) [P1]：5 周内发生 4 次 `state.db` 损坏，涉及多写入者 WAL 模式。
  - [#109966](https://github.com/NousResearch/hermes-agent/issues/109966) [P2]： fleet 重启期间 WAL 生成移交问题导致长期持有者阻塞（已验证在最新 commit 不再复现）。
  - [#109687](https://github.com/NousResearch/hermes-agent/issues/109687) [CLOSED P0]：单条 CLI 调用导致 live gateway 的 WAL 孤立，会话写入静默丢失（已修复）。
  - [#109728](https://github.com/NousResearch/hermes-agent/issues/109728) [CLOSED P0]：权限加固导致 SQLite 锁丢失，引发会话中断（已修复）。
  - [#109727](https://github.com/NousResearch/hermes-agent/issues/109727) [CLOSED P1]：第二个 Hermes 进程 unlink 了 live state.db-wal/-shm，导致运行中的 gateway  stranded（已修复）。
- **Streaming 挂起**：[#110769](https://github.com/NousResearch/hermes-agent/issues/110769) [P1]：更新到最新 main 后，流式传输在大上下文场景下仍然挂起，重新开放了此前关闭的 #29418。
- **MCP OAuth 并发损坏**：[#71335](https://github.com/NousResearch/hermes-agent/issues/71335) [P1]：多个 agent 进程共享 `HERMES_HOME` 时，旋转的 MCP OAuth 凭证（如 Notion）发生损坏。

## 6. 功能请求与路线图信号
- **Discord Markdown 表格渲染** ([#110591](https://github.com/NousResearch/hermes-agent/issues/110591))：用户请求为 Discord 平台添加专用的 Markdown 表格和状态字段渲染层，以保留列对齐和嵌入字段信息。
- **Intel Mac 支持** ([#42199](https://github.com/NousResearch/hermes-agent/issues/42199), [#40456](https://github.com/NousResearch/hermes-agent/issues/40456))：尽管有相关 Issue 讨论，但当前桌面应用仍为 ARM64-only，Intel Mac 用户无法原生运行。这是一个长期的兼容性需求。
- **上下文长度下限调整** ([#53347](https://github.com/NousResearch/hermes-agent/issues/53347))：用户请求允许 `context_length` 低于 64K，以便在资源受限的硬件上运行轻量级模型，目前为硬限制。
- **Bot 群聊持续运行** ([#97681](https://github.com/NousResearch/hermes-agent/issues/97681))：功能增强请求，允许 Bot 在桌面端关闭后继续工作并跨设备同步，符合项目“无头”运行的设计方向。

## 7. 用户反馈摘要
- **痛点**：
  - **数据一致性**：用户对 `state.db` 在多进程/多组件（gateway + dashboard）环境下的 WAL 管理极为不满，频繁的损坏和会话丢失严重影响了生产环境的信任度。
  - **平台兼容性**：Intel Mac 用户无法使用桌面应用，Windows 高分辨率缩放（DPI）下的 UI 异常（如点击失效、背景丢失）影响了部分用户的体验。
  - **启动性能**：桌面应用每次关闭后冷启动耗时较长，用户渴望支持系统托盘后台运行以减少等待时间。
- **满意点**：
  - 开发者对插件扫描器的误报问题响应迅速，通过细化规则（区分 prose/comments 与 executable code）提升了用户体验。
  - 远程网关登录等关键 Bug 在补丁版本中得到了集中修复。

## 8. 待处理积压
- **[OPEN] [Bug][auth] Concurrent agent processes sharing HERMES_HOME corrupt rotating MCP OAuth grants** ([#71335](https://github.com/NousResearch/hermes-agent/issues/71335))
  - **状态**：Open, P1
  - **提醒**：跨进程共享状态导致的 OAuth 凭证损坏是一个严重的架构级问题，尚未有明确的修复 PR，建议维护者优先关注。
- **[OPEN] Streaming still hangs on agent-sized context after update** ([#110769](https://github.com/NousResearch/hermes-agent/issues/110769))
  - **状态**：Open, P1
  - **提醒**：流式传输挂起问题在最新更新后仍未解决，且为重新开放项，需进一步调查根本原因。
- **[OPEN] web_server event loop stalls up to 51s under heavy agent work** ([#58576](https://github.com/NousResearch/hermes-agent/issues/58576))
  - **状态**：Open, P1
  - **提醒**：GIL 压力导致的 UI 冻结问题影响重度用户，需评估是否需要重构事件循环或优化工具调用方式。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目日报 | 2026-09-15
> **覆盖周期**: 2026-09-14 至 2026-09-15 00:00 UTC+8  
> **数据源**: GitHub Issues/PRs | **分析师**: AI 智能体与个人 AI 助手开源项目分析师

---

## 1. 今日速览

AstrBot 在过去 24 小时内保持**高度活跃**：11 条 Issue（新开/活跃: 6，已关闭: 5）、19 条 PR（待合并: 11，已合并/关闭: 8），并发布了 **v4.28.1** 补丁版本。今日核心进展集中在 **QQ C2C 流式回复协议修复**（issue #10066 → PR #10069 已合并）、**模型函数调用参数兼容性修复**（issue #10074 → PR #10076 待合并）以及 **Telegram 日志刷屏问题**（issue #10027 → PR #10046 已合并）。社区对用户反馈的响应速度较快，但仍有多个高价值功能请求（如编辑对话 UI、按 bot 隔离配置）处于待处理状态。整体项目健康度良好，但 WebUI 改版节奏与文档不同步的问题引发用户不满，需在下一版本中重点改进。

---

## 2. 版本发布

### **v4.28.1** (2026-09-14)
**PR**: [#10085](https://github.com/AstrBotDevs/AstrBot/pull/10085) | **状态**: ✅ 已合并

#### 更新内容
- **新增功能**:
  - 分页加载 ChatUI 历史对话记录
  - 改进聊天设置、消息生成器和流式交互体验
  - 默认启用 reasoning（推理过程）展示
  - 优化工作空间（workspace）操作

- **Bug 修复**:
  - 修复 QQ C2C 流式回复缺少 `state=10` 收尾帧导致的消息回滚问题（详见"Bug 与稳定性"章节）
  - 修复 Telegram 轮询日志刷屏问题
  - 修复 `api_base` 为空字符串时 OpenAI 端点解析失效问题

- **破坏性变更**: **无**
- **迁移注意事项**: 
  - 旧版本中未发送 `state=10` 收尾帧的自定义流式协议需同步调整
  - 建议升级到 v4.28.1 以获取完整的流式体验修复

---

## 3. 项目进展

### 今日合并/关闭的重要 PR

| PR | 作者 | 类型 | 说明 | 影响 |
|---|---|---|---|---|
| [#10069](https://github.com/AstrBotDevs/AstrBot/pull/10069) | @he-yufeng | fix | **QQ C2C 流式协议修复**：确保始终发送 `state=10` 收尾帧 | 🔴 高优先级 Bug 已修复 |
| [#10046](https://github.com/AstrBotDevs/AstrBot/pull/10046) | @nina-ysml | fix | **Telegram 日志刷屏优化**：隐藏 httpx 请求日志 | 🟡 用户体验提升 |
| [#10071](https://github.com/AstrBotDevs/AstrBot/pull/10071) | @piexian | fix | **CUA 沙箱坐标精度修复**：保留输入图片原始尺寸以避免点击漂移 | 🟡 精度问题修复 |
| [#10079](https://github.com/AstrBotDevs/AstrBot/pull/10079) | @wcqqq1214 | fix | **OpenAI API 端点解析修复**：统一 `api_base` 为空时的处理方式 | 🟡 配置问题修复 |
| [#10084](https://github.com/AstrBotDevs/AstrBot/pull/10084) | @Soulter | feat | **模型选择器优化**：支持按来源分组、置顶常用供应商、自定义过滤器 | 🟢 新功能 |
| [#10082](https://github.com/AstrBotDevs/AstrBot/pull/10082) | @Soulter | fix | **User-Agent 标准化**：所有请求使用 `astrbot/<version>` 标识 | 🟢 规范性改进 |
| [#10073](https://github.com/AstrBotDevs/AstrBot/pull/10073) | @leafliber | fix | **GitHub 分支查找回退**：API 失败时使用 HEAD 而非默认 `main` | 🟡 稳定性提升 |
| [#10085](https://github.com/AstrBotDevs/AstrBot/pull/10085) | @Soulter | chore | **v4.28.1 版本发布** | 🟢 版本管理 |

#### 项目整体进展评估
- **核心稳定性**: 今日合并的 4 个 fix PR 均针对已报告的高优先级 Bug，显著提升了 QQ 和 Telegram 适配器的可靠性。
- **新功能推进**: 模型选择器优化（#10084）改善了用户配置体验；User-Agent 标准化（#10082）增强了项目规范性。
- **技术债务清理**: 日志噪音（#10046）、端点解析（#10079）等问题得到解决，代码库质量有所提升。

---

## 4. 社区热点

### 高关注度 Issues

1. **[#10030](https://github.com/AstrBotDevs/AstrBot/issues/10030)** - 编辑对话功能缺失
   - **作者**: @MidoriDaisuki | **评论**: 9 | **状态**: 🟡 活跃
   - **诉求**: 新版数据与日志 UI 删除了编辑对话按钮，用户希望在机器人出现不想要回复时能手动删除。
   - **分析**: 此问题反映 WebUI 改版过程中功能倒退，用户强烈要求恢复旧版编辑功能。

2. **[#10068](https://github.com/AstrBotDevs/AstrBot/issues/10068)** - GitHub 源插件更新失败
   - **作者**: @iona-s | **评论**: 5 | **状态**: 🟡 活跃
   - **诉求**: 使用 GitHub 源安装/更新插件时，若 API 返回 403 或网络故障，会错误回退到 `main` 分支导致 404。
   - **分析**: 已有人提交 PR #10073 和 #10080 尝试修复，但待合并。此问题影响插件开发者的日常工作流程。

3. **[#9968](https://github.com/AstrBotDevs/AstrBot/issues/9968)** - 插件按 bot 隔离配置
   - **作者**: @baizi51676-source | **评论**: 3 | **状态**: 🟡 活跃
   - **诉求**: 单实例多 bot 场景下，希望同一插件在不同 bot 上使用不同参数（如归档目标群、导出目录）。
   - **分析**: 这是一个高级功能请求，涉及多配置档案（abconf）扩展，可能需下一版本规划。

4. **[#10086](https://github.com/AstrBotDevs/AstrBot/issues/10086)** - WebUI 改版节奏与文档不同步
   - **作者**: @lingyun14beta | **评论**: 1 | **状态**: 🔴 新建
   - **诉求**: 近几个月 WebUI 页面结构和菜单入口被反复重设计，但操作文档未同步更新，导致用户困惑。
   - **分析**: 此问题揭示了产品迭代与文档维护之间的脱节，可能影响新用户上手体验。

### 高关注度 PR

- **[#10076](https://github.com/AstrBotDevs/AstrBot/pull/10076)** - 工具调用参数嵌套解包
  - **作者**: @NayukiChiba | **状态**: 🟡 待合并
  - **关联 Issue**: #10074 | **说明**: 修复 DeepSeek 等模型返回多层嵌套 `{"arguments": {...}}` 时的参数不匹配问题。
  - **分析**: 此 PR 直接解决 v4.28.0 的核心兼容性 Bug，预计将在下一补丁版本中发布。

---

## 5. Bug 与稳定性

### 今日报告的 Bug（按严重程度排列）

| Issue | 标题 | 作者 | 状态 | Fix PR | 严重程度 |
|---|---|---|---|---|---|
| [#10074](https://github.com/AstrBotDevs/AstrBot/issues/10074) | 核心 v4.28.0 与所用模型在"函数调用参数格式"上不兼容 | @Sxd55 | 🟡 活跃 | [#10076](https://github.com/AstrBotDevs/AstrBot/pull/10076) | 🔴 高 |
| [#10066](https://github.com/AstrBotDevs/AstrBot/issues/10066) | QQ 官方机器人 C2C 流式回复：内容先变完整后被回滚成首包几个字（缺少 state=10 收尾帧） | @Linyesantan | ✅ 已修复 | [#10069](https://github.com/AstrBotDevs/AstrBot/pull/10069) | 🔴 高 |
| [#10078](https://github.com/AstrBotDevs/AstrBot/issues/10078) | openai_source: Azure 分支的 api_base 默认值是空字符串而非 None，会把端点解析静默关掉 | @xizhuomengcontin | ✅ 已修复 | [#10079](https://github.com/AstrBotDevs/AstrBot/pull/10079) | 🟡 中 |
| [#10068](https://github.com/AstrBotDevs/AstrBot/issues/10068) | 插件使用 github 源时更新因 github api 返回错误而导致的更新/安装失败 | @iona-s | 🟡 活跃 | [#10073](https://github.com/AstrBotDevs/AstrBot/pull/10073), [#10080](https://github.com/AstrBotDevs/AstrBot/pull/10080) | 🟡 中 |
| [#10027](https://github.com/AstrBotDevs/AstrBot/issues/10027) | Telegram 轮询和报错占满日志 | @MidoriDaisuki | ✅ 已修复 | [#10046](https://github.com/AstrBotDevs/AstrBot/pull/10046) | 🟡 中 |

### 稳定性评估
- **今日修复**: 5 个 Bug 已有对应 Fix PR，其中 3 个已合并（v4.28.1），2 个待合并。
- **回归风险**: 无已知回归问题，但 WebUI 改版的频繁变动可能引发新的配置不一致。
- **潜在风险**: 多 bot 隔离配置（issue #9968）尚未解决，多实例用户可能遇到功能瓶颈。

---

## 6. 功能请求与路线图信号

### 用户提出的新功能需求

| Issue | 标题 | 作者 | 评论数 | 优先级 | 纳入下一版本可能性 |
|---|---|---|---|---|---|
| [#10030](https://github.com/AstrBotDevs/AstrBot/issues/10030) | 希望新版数据与日志的 UI 可以加上编辑对话功能 | @MidoriDaisuki | 9 | 🟡 中 | **高**（用户呼声强烈，实现成本较低） |
| [#9968](https://github.com/AstrBotDevs/AstrBot/issues/9968) | 插件(Star)支持按配置档案(abconf)/bot 隔离：同一插件在不同 bot 上可用不同配置 | @baizi51676-source | 3 | 🟢 低 | **中**（涉及架构扩展，需下版本规划） |
| [#10086](https://github.com/AstrBotDevs/AstrBot/issues/10086) | 降低 WebUI 大改版的节奏，并让文档与前端改动同步更新 | @lingyun14beta | 1 | 🟡 中 | **高**（流程改进，可立即执行） |
| [#10081](https://github.com/AstrBotDevs/AstrBot/issues/10081) | 插件: astrbot_plugin_douyin_nahida（抖音下载） | @nahida-caicai | 1 | N/A | N/A（社区插件，非核心功能） |

### 路线图信号分析
- **短期（v4.29.x）**: 预计将修复编辑对话 UI（#10030）、优化 WebUI 文档同步流程（#10086）、合并参数解包修复（#10076）。
- **中期（v4.30.x）**: 可能开始探索多 bot 隔离配置（#9968）的架构设计。
- **长期**: 社区插件生态持续扩展（如抖音下载、磐石群管等），反映用户对多功能集成的需求。

---

## 7. 用户反馈摘要

### 真实用户痛点
1. **WebUI 功能倒退**: 用户抱怨新版删除了编辑对话按钮（#10030），导致无法删除不想要的机器人回复，必须依赖重启或手动修改数据库。
2. **插件更新不稳定**: 使用 GitHub 源时，网络波动或 API 限流会导致插件更新失败（#10068），增加开发者调试成本。
3. **模型兼容性**: DeepSeek-V4 等最新模型返回嵌套参数格式，核心未正确处理，导致工具调用失效（#10074）。
4. **日志噪音**: Telegram 适配器每轮询一次就打印大量 HTTP 请求日志，干扰问题排查（#10027）。

### 用户满意点
1. **流式体验改进**: v4.28.1 默认启用 reasoning 展示，用户可看到 AI 的思考过程，增强透明度。
2. **模型选择器优化**: 新版本支持按来源分组、自定义过滤器，提升配置效率（#10084）。
3. **响应速度**: 社区对 Bug 报告的反应较快，多数高优先级问题在 24 小时内获得 Fix PR。

### 用户不满意点
1. **文档不同步**: WebUI 改版频繁但文档未更新，用户按旧文档操作时找不到功能入口（#10086）。
2. **多 bot 场景限制**: 单实例多 bot 时无法按 bot 隔离插件配置，只能依赖外部路由方案（#9968）。

---

## 8. 待处理积压

### 长期未响应的重要 Issue/PR

| ID | 标题 | 作者 | 状态 | 未响应时长 | 提醒建议 |
|---|---|---|---|---|---|
| [#10076](https://github.com/AstrBotDevs/AstrBot/pull/10076) | 修复嵌套工具调用参数解包 | @NayukiChiba | 🟡 待合并 | **1 天** | 高优先级，建议尽快审核合并 |
| [#10080](https://github.com/AstrBotDevs/AstrBot/pull/10080) | GitHub 分支查找回退修复 | @iona-s | 🟡 待合并 | **1 天** | 与 #10073 重复，建议清理 |
| [#10030](https://github.com/AstrBotDevs/AstrBot/issues/10030) | 编辑对话功能缺失 | @MidoriDaisuki | 🟡 活跃 | **5 天** | 用户呼声强烈，建议排期 |
| [#9968](https://github.com/AstrBotDevs/AstrBot/issues/9968) | 插件按 bot 隔离配置 | @baizi51676-source | 🟡 活跃 | **8 天** | 高级功能，需架构评审 |
| [#10068](https://github.com/AstrBotDevs/AstrBot/issues/10068) | GitHub 源插件更新失败 | @iona-s | 🟡 活跃 | **2 天** | 有 PR 待合并，建议跟进 |

### 维护者关注建议
1. **加速 PR 审核**: #10076（参数解包）和 #10080（分支回退）均涉及核心稳定性，建议优先合并。
2. **功能恢复评估**: #10030 反映 UI 改版中的功能倒退，建议设立"功能完整性检查"清单，避免类似情况。
3. **文档同步机制**: 针对 #10086，建议建立 PR 模板中的文档核对项，确保前端改动同步更新文档。
4. **多实例架构规划**: #9968 虽为高级需求，但应提前调研多 bot 隔离配置的可行方案，纳入中长期路线图。

---

**报告生成时间**: 2026-09-15 08:00 UTC+8  
**数据来源**: [AstrBot GitHub 仓库](https://github.com/AstrBotDevs/AstrBot)  
**分析师**: Agnes-2.5-Flash (Sapiens AI)

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：** 2026-09-15
**数据来源：** GitHub Discussions (过去24小时更新 193 条)

## 1. 今日速览
DeepSeek Harness 社区在过去24小时内保持了极高的活跃度，共计产生 193 条 Discussion 更新。当前版本生态较为稳定（最新为 v0.1.5-rc.1 系列），无新 Release 发布。今日讨论重心主要集中在**本地部署稳定性**（Windows Node/pnpm 兼容性问题）、**工具调用规范对齐**（OpenCode 头部请求变更）以及**用户体验优化**（输入法联想、撤回功能插件）。开发者对 CLI 诊断工具和 Token 用量透明度的需求强烈，反映出用户群正从早期探索转向生产环境部署阶段。

## 2. 版本发布
*   **状态：** 无新版本发布 (Latest: `dsh-v0.1.5-rc.1` / `0.1.0-rc.7`)
*   **说明：** 根据仓库机制，代码合并通过 Releases 落地，今日无对应 Changelog 更新。建议关注即将推出的正式版稳定特性，特别是关于 `compaction/summary.usage` 折叠逻辑的修复（已在 `b565df344` 合并入 master，见 #1886）。

## 3. 项目进展
*   **后端修复确认：** #1886 指出 `tokenUsage` 投影不再折叠 `compaction/summary.usage` 的问题已在上游 master 分支（commit `b565df344`，随 `dsh-v0.1.2-alpha.1` 发布）得到解决。这标志着长期存在的 Token 统计偏差问题进入稳定期，后续版本将继承此修复。
*   **社区插件生态扩展：** 用户自发贡献的高质量插件被纳入视野，如 #3456 的 `dsh-easyrewrite`（气泡内联编辑+撤回）和 #4634 的 `weiwen-law-dsh`（因果守卫链），显示开源社区正在补全官方未覆盖的场景。

## 4. 社区热点
以下议题评论数最多，反映了当前核心痛点：

1.  **[Ideas] 建议添加 `dsh doctor` CLI 诊断命令** (#1719) - 60 条评论
    *   **链接：** https://github.com/deepseek-ai/deepseek-harness/discussions/1719
    *   **分析：** 本地环境配置（pnpm/binaries/Node版本/PATH）是新手最大门槛。60 条评论表明该需求极度迫切，社区期望官方提供一键式环境健康检查工具。

2.  **[Q&A] Bug: `pnpm dsh web` 启动失败报错 "--expose-internals is required for HMR service"** (#2699) - 43 条评论
    *   **链接：** https://github.com/deepseek-ai/deepseek-harness/discussions/2699
    *   **分析：** Windows 环境下 Node.js 启动参数缺失导致的 HMR 服务崩溃，复现路径明确（v22/v24 均复现），属于阻塞性环境问题。

3.  **[Show Your Plugins!] EasyRewrite 插件分享** (#3456) - 28 条评论
    *   **链接：** https://github.com/deepseek-ai/deepseek-harness/discussions/3456
    *   **分析：** 用户对“撤回/撤销”操作有强需求，且希望保持对话上下文的一致性（惰性修改），此类 UX 改进需求具有普遍性。

4.  **[Ideas] `tokenUsage` projection 折叠逻辑问题** (#1886) - 28 条评论
    *   **链接：** https://github.com/deepseek-ai/deepseek-harness/discussions/1886
    *   **分析：** 涉及重试步骤中的 Token 统计准确性，开发者和重度用户高度关注成本透明化。

5.  **[General] OpenCode API 请求头变更适配** (#5495) - 24 条评论
    *   **链接：** https://github.com/deepseek-ai/deepseek-harness/discussions/5495
    *   **分析：** 上游服务商（OpenCode Go）要求新增 `x-opencode-session` 头部以支持路由优化，涉及约 25k 用户组织，需官方尽快适配以避免服务中断。

## 5. Bug 与稳定性
按严重程度排列：

1.  **[Bug] npx @deepseek-ai/dsh web 无限卡死 (CPU 100%)** (#3786) - **严重**
    *   **链接：** https://github.com/deepseek-ai/deepseek-harness/discussions/3786
    *   **描述：** Windows 11 + npm 环境下，依赖解析陷入死循环，零网络流量但内存/CPU 持续增长。换镜像无效，影响 `npx` 直接启动场景。
2.  **[Bug] 多会话 Fork 后 Prompt 重载错误** (#6160) - **高**
    *   **链接：** https://github.com/deepseek-ai/deepseek-harness/discussions/6160
    *   **描述：** v0.1.5-rc.1 中，在开启其他对话时 Fork 旧会话并写入新 Prompt，内容会错误地重载为 Fork 前的 Prompt。涉及多任务并行工作流。
3.  **[Bug] 中文输入法拼音上屏前自动填充乱码** (#6138) - **中**
    *   **链接：** https://github.com/deepseek-ai/deepseek-harness/discussions/6138
    *   **描述：** Web UI 输入框在处理 IME 组合字符时，会将未选字的拼音错误转换为汉字（如 "wo xian zi" -> "沃仙兹..."），严重影响中文用户体验。
4.  **[Bug] Seeded/Forked 会话重启后标题回退为工作区名** (#5857) - **中**
    *   **链接：** https://github.com/deepseek-ai/deepseek-harness/discussions/5857
    *   **描述：** 冷启动列表跳过缓存标题，导致会话标识丢失，影响用户识别效率。
5.  **[Bug] Tool calls 因缺少 `description` 字段被拒绝** (#3874) - **低**
    *   **链接：** https://github.com/deepseek-ai/deepseek-harness/discussions/3874
    *   **描述：** `bash` 和 `run_code` 工具将 `description` 设为必填，导致部分模型生成的调用因缺少该字段而被校验拦截。建议改为可选。

## 6. 功能请求与路线图信号
*   **环境诊断工具：** #1719 强烈建议引入 `dsh doctor`，这是提升开发者体验的关键基础设施，应优先纳入路线图。
*   **外部模型接入通用性：** #611 持续询问如何接入非 DeepSeek 模型，#1166 和 #1116 反映了对长上下文输出限制（Token limit reached）的困扰，暗示需要更好的流式处理或分块输出策略。
*   **思考深度控制：** #1058 询问 llama-server 本地部署下的思考强度调整，表明用户对细粒度推理控制有需求。

## 7. 用户反馈摘要
*   **痛点：** 本地开发环境配置复杂（Node/pnpm 版本、启动参数），Windows 用户遇坑率高；多会话管理存在状态不同步的 Bug；中文输入法交互体验差。
*   **满意点：** 插件系统的开放性获得认可（EasyRewrite、因果守卫插件）；Token 统计问题的修复受到关注。
*   **场景：** 用户主要在 Windows 11 环境下进行本地模型部署和 Web UI 调试，高频使用 Fork/Seed 功能进行对话实验。

## 8. 待处理积压
*   **#5495 (OpenCode Header):** 上游接口变更，影响大规模用户，需官方快速响应适配。
*   **#1719 (dsh doctor):** 高票数功能请求，有助于降低社区支持成本。
*   **#3786 (npm 死循环):** 阻塞性 Bug，需排查 npm 包解析逻辑在特定 Windows 环境下的异常。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*