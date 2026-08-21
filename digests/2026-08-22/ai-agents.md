# OpenClaw 生态日报 2026-08-22

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-21 22:12 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 · 2026-08-22

> 数据窗口：2026-08-21 00:00 - 23:59 UTC | 统计来源：github.com/openclaw/openclaw

### 1. 今日速览

OpenClaw 昨日保持超高活跃度：**Issues 更新 500 条（新开/活跃 488，关闭仅 12），PR 更新 500 条（待合并 397，已合并/关闭 103）**，1000+ 事件显示社区与核心团队并行高强度迭代，但 Issue 关闭率仅 2.4% 表明积压持续扩大。无新版本发布，当前焦点集中于 `v2026.8.1-beta.2` 的发布验证 [#125626](https://github.com/openclaw/openclaw/issues/125626)。PR 侧修复密度高，多为网关、Control UI 与 Agent 运行时稳定性补丁，整体健康度评估：**开发活跃、交付承压、稳定性债务需重点关注**。

### 2. 版本发布

**本周期无新版本发布。**

当前处于 `v2026.8.1-beta.2` 验证阶段，验证 Issue [#125626](https://github.com/openclaw/openclaw/issues/125626) 昨日新增 17 条评论，为全站最活跃 Issue。验证流程要求测试员通过 validation skill 提交真实网关升级报告，暂未合入主线。建议关注该 Issue 的 Release Validation 结果以判断正式版发布时间。

### 3. 项目进展

昨日共关闭/合并 103 个 PR，其中 4 个为重点 PR（展示评论榜 Top 30 中已关闭项）：

| PR | 类型 | 关键推进 |
|---|---|---|
| [#126424](https://github.com/openclaw/openclaw/pull/126424) `fix(gateway)` [CLOSED] | 安全边界 / 消息投递 | 修复多 Agent 场景下 `conversations_send` 可越权发现其他 Agent 会话的问题，收敛消息投递至 Agent 绑定范围内。`P1 / platinum hermit`，已 Ready for maintainer。 |
| [#125471](https://github.com/openclaw/openclaw/pull/125471) `fix(models)` [CLOSED] | 认证提供方 | 修复 Claude CLI OAuth 在网关重启后因遗留 `auth.profiles["anthropic:claude-cli"]` 导致刷新归属丢失、Control UI 显示 `anthropic: missing` 的矛盾状态。 |
| [#116489](https://github.com/openclaw/openclaw/pull/116489) `feat(security)` [CLOSED] | 安全策略 | 新增 `security.installPolicy` 的 `warn` 状态，CLI/UI 安装可疑插件/技能时需显式确认目标名称，增强供应链安全。`size: XL` |
| [#120900](https://github.com/openclaw/openclaw/pull/120900) `feat(ui)` [CLOSED] | Control UI | 允许已认证管理员在 Control UI 内复核并 `acknowledgeInstallPolicyWarning: true` 后继续安装，与 116489 配套。 |

**待合并但已就绪的高价值 PR（Ready for maintainer look）：**
*   [#127572](https://github.com/openclaw/openclaw/pull/127572) fix(onboard): 修复 `--agent-name` 首个 Agent 凭证被错误写入 `main` 的问题
*   [#127660](https://github.com/openclaw/openclaw/pull/127660) fix(gateway): 云会话清理失败后可重试，避免永久 draining
*   [#117748](https://github.com/openclaw/openclaw/pull/117748) fix(anthropic): 保留 `model_context_window_exceeded` 时的局部成功响应与 usage
*   [#127648](https://github.com/openclaw/openclaw/pull/127648) / [#127242](https://github.com/openclaw/openclaw/pull/127242) 等网关与 Agent 工具推荐逻辑修复

> 评估：项目在安全边界、认证、多租户隔离方向取得实质性进展，但大量 `size: XL / availability & compatibility` 风险 PR 仍在 `needs proof` 状态，合入节奏受验证阻塞。

### 4. 社区热点

按评论数排序的 Top 10 活跃讨论：

1.  **[#48788](https://github.com/openclaw/openclaw/issues/48788) [19 评论] feat: centralized filename encoding utility** - 最热议题。PR #48578 仅修复了飞书中文文件名 UTF-8 被误判为 Latin-1 的常见 case，社区要求提供支持 Shift-JIS/EUC-KR/GB18030 等多编码的中央化解码工具，属架构级诉求。标签 `off-meta tidepool / needs-product-decision`，自 3 月 17 日悬而未决。
2.  **[#125626](https://github.com/openclaw/openclaw/issues/125626) [17 评论] Release validation: v2026.8.1-beta.2** - Beta 验证主战场，维护者 @Patrick-Erichsen 牵头。
3.  **[#53628](https://github.com/openclaw/openclaw/issues/53628) [14 评论] ${XDG_CONFIG_HOME} not process when installing a skill** - Docker 用户安装 skill 时环境变量未展开，复现明确，`linked-pr-open`。
4.  **[#119796](https://github.com/openclaw/openclaw/issues/119796) [14 评论] Windows: vitest teardown EBUSY on openclaw-agent.sqlite** - Windows 专用，Zalo 轮询套件因 sqlite 句柄未释放导致测试清理失败。
5.  **[#42840](https://github.com/openclaw/openclaw/issues/42840) [8 评论 | 👍10] MathJax/LaTeX Support** - 点赞最高的需求，AI 助手场景下公式无法渲染。
6.  **[#97616](https://github.com/openclaw/openclaw/issues/97616) [8 评论] leaks unreaped hook/tool child processes** - 僵尸进程累积导致性能退化，`P1 / gold shrimp`。
7.  **[#50490](https://github.com/openclaw/openclaw/issues/50490) [7 评论] Feishu 群聊 activation 模式切换无效** - 回归问题，`/activation mention` 后仍响应所有消息。
8.  **[#120735](https://github.com/openclaw/openclaw/issues/120735) [7 评论] Telegram stickers arrive as raw file refs** - 贴纸无法落盘，Agent 的 `image` 工具不可见。
9.  **[#58957](https://github.com/openclaw/openclaw/issues/58957) [7 评论] Model switch fails silently when context too large** - 超长上下文切换模型无报错，用户无法自诊断。
10. **[#46031](https://github.com/openclaw/openclaw/issues/46031) [7 评论] auth.order ignored for GitHub Copilot** - `auth.order` 配置对 Copilot 失效，始终取 `auth.profiles` 首键。

### 5. Bug 与稳定性

昨日更新的 Bug 按严重度分级：

**P0 - 数据丢失 / 核心可用性**
*   [#119270](https://github.com/openclaw/openclaw/issues/119270) `P0 / diamond lobster` file tools strip leading `@` - 写入/编辑时错误剥离目标路径前的 `@`，静默写错文件并可能删除。可致数据丢失，已有 `linked-pr-open`。
*   [#126821](https://github.com/openclaw/openclaw/issues/126821) `P0 / platinum hermit` SQLite corruption recurs in 15-24h (WSL2) - 全新重建的 DB 在 5 天内出现 5 次 freelist 错误，甚至进入“拒绝服务但不退出”的瘫痪模式。`Beta.2` 回归，**无 fix PR，需紧急关注**。

**P1 - 消息丢失 / 崩溃循环 / 认证**
*   [#97616](https://github.com/openclaw/openclaw/issues/97616) 僵尸进程泄露 `P1 / gold shrimp` - `needs-info`，无 PR。
*   [#49381](https://github.com/openclaw/openclaw/issues/49381) Feishu 主模型限流后备切换导致重复最终回复 `P1` - 无 PR。
*   [#86612](https://github.com/openclaw/openclaw/issues/86612) Docker gateway restart loop (SANDBOX=1, HOME=/mnt/...) `P1` - 无 PR。
*   [#83598](https://github.com/openclaw/openclaw/issues/83598) anthropic:claude-cli OAuth refresh dead-ends `P1` - 关联 PR [#125471](https://github.com/openclaw/openclaw/pull/125471) 已关闭，待验证是否彻底修复。
*   [#86050](https://github.com/openclaw/openclaw/issues/86050) Gateway buffers claude-cli stream events `P1 / regression / linked-pr-open` - 仅显示最终消息，流式体验回归。
*   [#84486](https://github.com/openclaw/openclaw/issues/84486) Feishu streaming card 丢失 tool-call 前文本 `P1 / queueable-fix / linked-pr-open`
*   [#85027](https://github.com/openclaw/openclaw/issues/85027) 2026.5.6→5.19 升级致 macOS LaunchAgent 不可恢复 `P1`
*   [#108215](https://github.com/openclaw/openclaw/issues/108215) Context usage 57%→13% 无压缩异常 `P1` - 可能静默丢上下文。
*   [#125838](https://github.com/openclaw/openclaw/issues/125838) QQBot slash command 无回复 `P1 / recovery-stuck`
*   [#125792](https://github.com/openclaw/openclaw/issues/125792) llama.cpp embeddings 占用 5.3GB 不可配置 `P1 / queueable-fix`
*   [#124284](https://github.com/openclaw/openclaw/issues/124284) vLLM + thinking 导致子 Agent 恶性 XML `P1 / linked-pr-open`

**P2 - 行为异常 / UX 摩擦**
*   飞书相关：[#42803](https://github.com/openclaw/openclaw/issues/42803) `/stop|/new|/status` 不再 bypass 队列、`[#41860](https://github.com/openclaw/openclaw/issues/41860) 含下划线链接截断`
*   平台相关：[#119796](https://github.com/openclaw/openclaw/issues/119796) Windows EBUSY、`[#124394](https://github.com/openclaw/openclaw/issues/124394) settings.json 并发丢失`
*   网关/认证：[#46031](https://github.com/openclaw/openclaw/issues/46031) Copilot auth.order、`[#86174](https://github.com/openclaw/openclaw/issues/86174) WebChat + New Session 模型继承错误`

> 整体：飞书渠道占 P1/P2 的 40%，为当前最脆弱集成；SQLite/进程管理类 P0/P1 显示底层运行时稳定性债务上升。约 50% 的 P1 已有 `linked-pr-open` 或 `queueable-fix`，但 P0 的 [#126821](https://github.com/openclaw/openclaw/issues/126821) 仍裸奔。

### 6. 功能请求与路线图信号

| 需求 Issue | 诉求 | 关联 PR / 信号 | 入选概率 |
|---|---|---|---|
| [#48788](https://github.com/openclaw/openclaw/issues/48788) 多编码 Content-Disposition 中央化 | 飞书等渠道中文/日韩文件名乱码根治 | PR #48578 已做 UTF-8 补丁，提案要求架构级重构 | **中** - 需产品决策，已标记 `needs-product-decision` 5 个月 |
| [#42840](https://github.com/openclaw/openclaw/issues/42840) Control UI MathJax/LaTeX `👍10` | AI 输出数学公式可视化 | 无对应 PR，但为最高赞功能请求 | **高** - 用户价值明确，UI 侧改造成本可控 |
| [#28300](https://github.com/openclaw/openclaw/issues/28300) Theme Customization System `👍5` | 6 套预设 + 自定义主题工作室 | 无 PR | **低-中** - `off-meta` 优先级 P3 |
| [#121729](https://github.com/openclaw/openclaw/issues/121729) Daily spending allowances | 后台 Agent 成本熔断 | 无 PR | **中** - 契合多 Agent 运营痛点 |
| [#50481](https://github.com/openclaw/openclaw/issues/50481) Slack `setSuggestedPrompts` | Slack 动态建议提示 | 无 PR | **低** |
| [#38714](https://github.com/openclaw/openclaw/issues/38714) Discord reaction hooks `👍2` | 表情反应触发自动化 | 无 PR | **中** - Discord 生态活跃 |
| [#46844](https://github.com/openclaw/openclaw/issues/46844) Talk Mode Idle Timeout | 语音唤醒后自动休眠省 token | 无 PR | **中** |

**可与今日 PR 联动的信号：** [#124557](https://github.com/openclaw/openclaw/pull/124557) `feat(plugins): give pre-model agent hooks authenticated message id` 正在推进插件钩子能力，若合入将为 [#38714](https://github.com/openclaw/openclaw/issues/38714) 等 Hook 扩展铺路。

### 7. 用户反馈摘要

从昨日评论提炼的真实痛点：

*   **飞书用户最痛苦：** 群聊激活、指令队列、流式卡片、超链接四类问题反复出现（[#50490](https://github.com/openclaw/openclaw/issues/50490), [#42803](https://github.com/openclaw/openclaw/issues/42803), [#84486](https://github.com/openclaw/openclaw/issues/84486), [#41860](https://github.com/openclaw/openclaw/issues/41860)），反映飞书适配层与核心路由/渲染耦合过深，回归频繁。
*   **Windows/容器环境脆弱：** EBUSY sqlite 句柄、NVM/Volta Node 路径警告无法修复（[#60612](https://github.com/openclaw/openclaw/issues/60612), [#52184](https://github.com/openclaw/openclaw/issues/52184)）、Docker SB 模式重启循环，用户反馈“doctor --fix 无法自愈，需 Time Machine 恢复”[#85027](https://github.com/openclaw/openclaw/issues/85027)。
*   **认证与模型切换不透明：** Copilot `auth.order` 失效、Claude CLI OAuth 过期无感知、超长上下文静默失败（[#46031](https://github.com/openclaw/openclaw/issues/46031), [#83598](https://github.com/openclaw/openclaw/issues/83598), [#58957](https://github.com/openclaw/openclaw/issues/58957)），用户无法区分是配额、上下文还是 Bug。
*   **Telegram/QQBot 媒体体验差：** 贴纸、文件引用无法被 `image` 工具消费（[#120735](https://github.com/openclaw/openclaw/issues/120735)），QQBot 轻量命令无回显（[#125838](https://github.com/openclaw/openclaw/issues/125838)）。
*   **正面信号：** 主题系统 [#28300](https://github.com/openclaw/openclaw/issues/28300) 与 LaTeX [#42840](https://github.com/openclaw/openclaw/issues/42840) 获得持续点赞，用户对 Control UI 个性化与专业内容渲染有强期待。

### 8. 待处理积压

标记 `needs-maintainer-review` + `needs-product-decision` 且超过 5 个月未解决的高关注 Issue，需维护者优先 triage：

*   [#48788](https://github.com/openclaw/openclaw/issues/48788) 2026-03-17 至今 5 个月，19 评论，`P3` 但为架构债，涉及所有渠道文件编码
*   [#53628](https://github.com/openclaw/openclaw/issues/53628) 2026-03-24，14 评论，Docker + XDG 场景复现稳定
*   [#42840](https://github.com/openclaw/openclaw/issues/42840) 2026-03-11，👍10，产品决策悬停
*   [#28300](https://github.com/openclaw/openclaw/issues/28300) 2026-02-27，主题系统，👍5
*   [#50490](https://github.com/openclaw/openclaw/issues/50490) 2026-03-19，飞书群聊核心功能回归，`recovery-stuck`
*   [#42803](https://github.com/openclaw/openclaw/issues/42803) 2026-03-11，飞书指令队列回归，`linked-pr-open` 但长期未合入

**PR 积压风险：** 397 个待合并 PR 中，多个 `P1 / session-state / auth-provider` 高风险 PR（如 [#120443](https://github.com/openclaw/openclaw/pull/120443), [#121576](https://github.com/openclaw/openclaw/pull/121576), [#120491](https://github.com/openclaw/openclaw/pull/120491)）处于 `needs proof` 超 10 天，建议维护者在 Beta 冻结前加速验证，避免与 `v2026.8.1` 正式版冲突。

---
*日报生成器：OpenClaw Analyzer | 数据截止 2026-08-21 23:59 UTC | 明日关注：Beta 验证结论与 P0 SQLite 修复进展*

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告
**2026-08-22 | 基于 6 个核心项目 24h 动态**

### 1. 生态全景

个人 AI 助手开源生态已进入**高并发分化期**：头部项目日均事件 800+，呈现“高活跃、强分化、稳定性承压”的共性特征。技术重心正从单一对话能力向**网关多租隔离、安全供应链、自动化工作流（SOP/Cron）、多端渠道一致性**四维演进。生态内部出现明显分层：OpenClaw、Hermes-agent 以千级事件领跑基础设施建设；QwenPaw、Zeroclaw 聚焦工作流与企业化部署；AstrBot 深耕多 IM 插件生态；PicoClaw 进入存量清理。共同瓶颈是**交付转化率低、静默失败与数据层债务集中爆发**。

### 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | 新版本 | 健康度评估 | 核心信号 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500条 (488活跃/12关闭) | 500条 (397待合/103已合) | 无, 验证 `v2026.8.1-beta.2` | **开发活跃、交付承压** | 1000+事件全生态最高，关闭率仅2.4%积压扩大 |
| **Hermes-agent** | 393条 (337活跃/56关闭) | 500条 (461待合/39已合) | **有, `v0.20.5` 聚合323 PR** | **亚健康-高负荷** | 893事件次高，完成20/20大文件拆分史诗，但Windows链路P1集中爆发 |
| **QwenPaw** | 34条 (19活跃/15关闭) | 36条 (21待合/15已合) | 无, 已 bump `v2.1.1b2` | **健康-质量巩固期** | 70事件，关闭率44%，测试基建大面积收口 |
| **Zeroclaw** | 50条 (46活跃/4关闭) | 50条 (48待合/2已合) | 无 | **承压-合并瓶颈** | 合并转化率仅4%，48个PR拥堵，SOP模块占P1的50% |
| **AstrBot** | 16条 (7活跃/9关闭) | 11条 (7待合/4已合) | 无 | **健康-响应及时** | 关闭率56%全场最高，前瞻修复NVIDIA模型弃用，插件审核高效 |
| **PicoClaw** | 1条 (1活跃/0关闭) | 5条 (0待合/5关闭*) | 无 | **平稳-需关注活跃度** | *5条均为180天积压PR的非合并关闭，存量出清，无实质合入 |

> 数据窗口：2026-08-21 00:00-23:59 UTC

**分层结论：** 第一梯队(OpenClaw/Hermes)是数量级领先的“基础设施战场”；第二梯队(QwenPaw/Zeroclaw)是功能迭代期；第三梯队(AstrBot)是稳定增量期；PicoClaw处于迭代间歇期。

### 3. OpenClaw 在生态中的定位

**规模定位：生态规模参照系，无可争议的活跃度第一。**
单日 1000 事件约为 QwenPaw 的14倍、AstrBot的37倍，与 Hermes-agent 同处千级档，但 Hermes 刚发布大版本处于消化期，OpenClaw正处于 `beta.2` 验证冲刺，实时的社区压力更大。

**优势：**
1.  **最完整的网关-UI-多租户底座：** 唯一同时在网关安全边界(`conversations_send`越权修复 #126424)、Control UI策略(`security.installPolicy warn` #116489)与认证提供方(OAuth刷新 #125471)三线取得闭环修复的项目。
2.  **渠道纵深最强：** 飞书适配虽占P1/P2的40%暴露脆弱性，但也意味着在企业IM场景的覆盖深度远超竞品。Zeroclaw/QwenPaw仍在解决Matrix/钉钉的基础接入。
3.  **社区议题广度：** Top10热点覆盖编码、Docker、Windows、公式渲染、进程管理等全栈议题，反映用户基数与场景多样性。

**技术路线差异：**
*   vs **Hermes-agent (Electron桌面中心化)**：OpenClaw为 **Gateway中心化**，Hermes为 **Desktop/Electron中心化**。前者解决多Agent云端隔离与Control UI远程管控，后者解决本地 `state.db` 并发损坏与渲染器功耗。前者偏向团队/云原生部署，后者偏向个人桌面重度用户。
*   vs **Zeroclaw (SOP工作流引擎)**：Zeroclaw All-in SOP/Cron自动化编排，OpenClaw则无独立工作流引擎，通过 Gateway工具推荐与Session调度实现编排，路线更通用但自动化确定性弱于Zeroclaw。
*   vs **QwenPaw/AstrBot (Hub/插件分发)**：QwenPaw已落地 `self-hosted multi-user Hub` #7112 走向企业多用户隔离，OpenClaw的 `acknowledgeInstallPolicyWarning` 仍停留在单机安全策略层，企业化晚一步；AstrBot的插件市场已实现批量日审，OpenClaw Skill生态仍受 `XDG_CONFIG_HOME` 等环境问题阻塞。

### 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求与共性表现 |
| :--- | :--- | :--- |
| **安全边界与多租隔离** | OpenClaw, Zeroclaw, Hermes | `forbidden_paths被allowed_roots覆盖`[#9815], `secrets跨profile泄露`[#82936], `conversations_send越权`[#126424]。从“功能可用”转向“隔离可信”，成为企业采用门槛。 |
| **会话/上下文/存储可靠性** | OpenClaw, Hermes, QwenPaw, Zeroclaw, PicoClaw | `SQLite WSL 15h必现损坏`[#126821], `state.db WAL脑裂`[#90950/90871], `history.db撑爆7.6G`[#7168], `SOP session未持久化`[#9929], `after-turn排队vs打断`[#3342]。所有项目均遇DB膨胀、上下文静默丢失、长会话卡顿。 |
| **IM渠道稳定性** | 全部6个项目 | OpenClaw飞书40% Bug占比、Zeroclaw Matrix .well-known绕过、QwenPaw钉钉共享上下文、Hermes Telegram重复、AstrBot Discord白条/企业微信死锁。IM适配是最大回归源。 |
| **成本与可观测性** | Zeroclaw, QwenPaw, OpenClaw | `Anthropic cost_usd:0.0熔断失效`[#9816], QwenPaw `按agent统计token`[#7207], OpenClaw `Daily spending allowances`[#121729]。从“能跑”到“可控成本”成为运营刚需。 |
| **Provider/Auth兼容** | OpenClaw, AstrBot, QwenPaw, Zeroclaw | Claude CLI OAuth刷新丢失、Gemini functionResponse name错位[#9760]、DashScope prompt超限9万token[#9763]、Volcengine品牌升级。模型生态碎片化导致适配层脆弱。 |
| **静默失败治理** | Zeroclaw, QwenPaw | `sops_dir默认值不生效无日志`[#9779], `非法SOP.toml仍validate成功`[#9786], `/health误报健康`[#9811]。社区共识：无报错的失败比崩溃更损害信任。 |

### 5. 差异化定位分析

| 维度 | OpenClaw | Hermes-agent | Zeroclaw | QwenPaw | AstrBot | PicoClaw |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **功能侧重** | 网关+Control UI+多Agent隔离 | Electron桌面+Bot Mode全平台化 | SOP工作流+ZeroRelay安全传输 | 长会话性能+多用户Hub | 多IM适配器+插件市场 | 轻量Agent+硬件端 |
| **目标用户** | 开发者/小团队，需自托管网关与飞书/Telegram深度集成 | 重度桌面用户、多Profile隔离需求 | 自动化运维，需Cron/SOP编排 | 企业/团队自托管，多用户隔离 | 社区运营者、QQ/微信生态用户 | 嵌入式/边缘硬件用户 |
| **技术架构** | Gateway常驻 + SQLite + Control UI | Electron + `state.db`(WAL) + LaunchAgent | Daemon + SOP引擎 + WASI插件沙箱 | Console前端性能优化 + Hub控制面 | Python异步 + 平台适配层 + WebUI | Go + 轻量运行时 |
| **护城河** | 最成熟的多租隔离与安全策略体系 | 唯一的Bot-Telegram Topic路由与桌面体验 | 唯一的声明式SOP与mTLS Relay | 唯一的官方多用户Hub与token归因 | 最活跃的插件分发审核体系 | 多智能体Blackboard底座(已归档) |

### 6. 社区热度与成熟度

**快速迭代期（高吞吐、低合入、债务累积）：**
*   **OpenClaw & Hermes-agent：** 双双500 PR待合并，Issue关闭率<15%。处于大版本前夜的“稳定性还债”阶段，需重点关注Beta验证与P0修复能否收敛。Hermes已完成架构重构史诗(20/20)，正消化 `v0.20.5`；OpenClaw仍在 `beta.2` 验证中[#125626 17评论]，风险更高。
*   **Zeroclaw：** 4%合并率全场最低，3个XL级功能(PR #10142/#10146)阻塞，处于“功能预研拥堵期”，SOP子系统是最大不稳定源。

**质量巩固期（高关闭率、测试收口）：**
*   **QwenPaw：** 唯一实现前端/后端测试覆盖率集中收口(关闭5个里程碑Issue)，并合并`长会话响应性能`核心补丁[#7176]，处于 `v2.1.1` 发布前的质量门禁期。
*   **AstrBot：** 56%关闭率+24h内所有P0 Bug均关联Fix PR，4个修复已合入，处于Patch发布前的收敛期，工程纪律最佳。

**存量清理/间歇期：**
*   **PicoClaw：** 日活1 Issue，5个170天+陈年PR集中关闭，社区互动为0。已清空积压队列，处于新迭代基线起点，新提案[#3342]能否快速响应是关键。

### 7. 值得关注的趋势信号

**对AI智能体开发者的参考价值：**

1.  **调度策略从“即时打断”转向“可控排队”：** PicoClaw #3342提出的 `after-turn` 排队模式直击长任务痛点，OpenClaw飞书指令队列[#42803]同类问题频发。建议新Agent设计默认提供`interrupt vs queue`可配置策略，而非强制打断。

2.  **网关/桌面功能平权成为标配：** Hermes将桌面独占的Bot Mode下沉至Gateway[#91666]，QwenPaw推出Hub自托管。单一桌面端已无法满足需求，**“Gateway为源、Desktop/Web为视图”**的多端一致性架构将成下一代标准。

3.  **安全从“事后审计”变为“安装时拦截”：** OpenClaw `installPolicy: warn`+显式确认、Zeroclaw `forbidden_paths`修复、Hermes密钥泄露，三项目同步加固供应链。建议插件/Skill市场强制引入安装时风险分级与显式授权。

4.  **可观测性与成本归因是商业化分水岭：** `按Agent统计token`、`SOP run_id贯穿追踪去重`、`Daily Allowances`需求同步涌现。无法提供会话/代理级成本与健康度可信数据的项目，难以进入团队付费场景。

5.  **“静默失败”是比崩溃更致命的流失因子：** 6个项目中评论最痛的并非闪退，而是“配置了不生效且无日志”、“上下文57%→13%无压缩却静默丢上下文”。建议将 `validate --strict` 与启动时配置自检作为默认能力。

6.  **IM渠道适配进入“精细化运营”阶段：** 通用Bot框架红利结束，竞争点落在`中文文件名GB18030`、`Telegram贴纸落盘`、`飞书流式卡片文本丢失`等细节。选择框架时应重点考察其对目标IM（尤其飞书/企业微信）的回归测试覆盖度，而非仅看支持的平台数量。

> **给技术决策者的建议：** 若选型追求**云端多租与安全合规**优先评估 OpenClaw；追求**桌面重度与Bot协作**评估 Hermes-agent；追求**自动化工作流**关注Zeroclaw但需容忍其SOP成熟度风险；追求**企业多用户与稳定性**QwenPaw当前质量债最低；追求**QQ/微信生态与插件丰富度**AstrBot响应最快。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 | 2026-08-22

### 1. 今日速览

> **活跃度：高 | 健康度：承压 — 修复密集但合并瓶颈明显**

过去 24 小时项目保持高强度运转：共 **50 条 Issues 更新（46 活跃/4 关闭）+ 50 条 PR 更新（48 待合并/仅 2 合并）**，无新版本发布。技术重心高度聚焦 **SOP 工作流引擎、Security 安全边界、Provider 计费与稳定性** 三大主线。Issue 存量以 P1 高优 Bug 为主（占比超 60%），而 PR 合并转化率仅 4%，大量 XL/L 尺寸重构类 PR 长期停留在 `needs-author-action` 状态，合并积压成为主要瓶颈。整体处于“高讨论、低交付”的修复冲刺期。

---

### 2. 版本发布

**本周期无新版本发布。** 最新 Release 列表为空，`master` 分支以修复与重构 PR 为主，尚未形成 Release Gate。

---

### 3. 项目进展

24小时内仅 **2 个 PR 被合并/关闭**，均为高价值缺陷修复，项目向前小步快跑：

| PR | 类型 | 核心进展 | 关联 Issue |
| :--- | :--- | :--- | :--- |
| [#10150](https://github.com/zeroclaw-labs/zeroclaw/pull/10150) `fix(zerocode): accept paste during active turns` **[已合并]** | Bugfix / ZeroCode TUI | 修复了 ZeroCode 在 Agent Turn 执行期间静默丢弃终端 `bracketed paste` 的问题。粘贴内容现可进入输入框并排队等待当前轮次结束后自动派发，显著改善高频交互体验。含回归测试。 | Closes [#10089](https://github.com/zeroclaw-labs/zeroclaw/issues/10089) |
| [#10092](https://github.com/zeroclaw-labs/zeroclaw/pull/10092) `fix(providers): redact Anthropic credential fragments` **[已关闭/已修复]** | Security / Provider | **S0 级安全修复**。彻底移除 Anthropic 鉴权 Debug 日志中的 `credential_head/tail`（前8后4位明文），仅保留 header 类型与长度等非敏感诊断信息，消除密钥泄露风险。 | Closes [#9976](https://github.com/zeroclaw-labs/zeroclaw/issues/9976) |

> **解读：** 两个已关闭 PR 均为 `S0/S2` 阻塞性问题的精准修复，但 **48 个 PR 仍待合并**，其中包含 `feat(zerorelay)`、逻辑通道激活等 XL 级核心功能，表明主线功能演进处于 Code Review 拥堵期。

同时关闭的 Issues 侧：

*   [#9832](https://github.com/zeroclaw-labs/zeroclaw/issues/9832) `zeroclaw-hardware --features hardware` 编译失败 (`aardvark_sys::AardvarkHandle`) - aarch64 构建链路已打通
*   [#9925](https://github.com/zeroclaw-labs/zeroclaw/issues/9925) `model thinking output leaks to daemon stdout` - Daemon 终端污染问题已关闭

### 4. 社区热点

按评论数排序，社区讨论最集中的均为 **SOP 引擎与安全边界** 相关 P1 缺陷：

**1. [#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965) [7 评论] `runtime-written executable test fixtures hit ETXTBSY`** 
`priority:p1 / type:test` - 唯一评论数破 7 的热点。在 `Parallel Runtime Test` 并行门控下，测试固件写入可执行 shim 后立即 spawn 触发 `ETXTBSY`。反映 CI 基础设施的竞态稳定性痛点，已标记 `in-progress`。

**2. [#9815](https://github.com/zeroclaw-labs/zeroclaw/issues/9815) [5 评论] `security: forbidden_paths is unreachable`** 
`priority:p1 / risk:high / domain:security` - 安全策略被绕过。`is_path_allowed` 在命中 `allowed_roots` 后直接返回 `true`，永不执行 `forbidden_paths` 校验，导致黑名单配置形同虚设。社区关注度高，因涉及多 Agent 文件隔离底座。

**3. [#9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779) [4 评论] `[sop] sops_dir: documented default is not honoured`** 
`priority:p1 / risk:high` - 文档称 `sops_dir` 有默认值，但 Daemon 两处启动路径均以 `is_some()`  gate 整个 SOP 子系统。导致静默不加载 SOP，无任何日志告警，Cron/Channel 触发的 SOP 全部失效。

**4. [#9929](https://github.com/zeroclaw-labs/zeroclaw/issues/9929) [3 评论] `headless SOP step turns are given a session path but never persisted`**
`priority:p1 / status:blocked` - 无头 SOP 执行的核心缺陷：`sop-{run_id}-step-{n}` 的 Session 身份未落盘，导致历史不可追溯、重启丢失。

**5. [#9855](https://github.com/zeroclaw-labs/zeroclaw/issues/9855) [3 评论] `Matrix channel fails to resolve homeserver via .well-known`** 
`priority:p2 / S0` - Matrix 通道直接拼接 host，跳过标准 `/.well-known/matrix/client` 发现流程，导致自托管 Homeserver 无法接入。

> **PR 侧热点：** [#10146](https://github.com/zeroclaw-labs/zeroclaw/pull/10146) `feat(plugins): activate logical channel instances` (XL) 和 [#10142](https://github.com/zeroclaw-labs/zeroclaw/pull/10142) `feat(zerorelay): secure transport and browser enrollment` (XL) 持续被置顶讨论，标志着插件化通道与远程安全传输是下一版本主航道。

### 5. Bug 与稳定性

按严重度排序，今日活跃的 **高危回归/安全类 Bug** 清单：

| 严重度 | Issue | 简述 | 状态与 Fix 关联 |
| :--- | :--- | :--- | :--- |
| **S0** | [#9855](https://github.com/zeroclaw-labs/zeroclaw/issues/9855) | Matrix 家目录发现绕过 | 无 Fix PR, `in-progress` |
| **S0** | [#9947](https://github.com/zeroclaw-labs/zeroclaw/issues/9947) | Cron 工具未按 Agent 隔离，任意 Agent 可增删他人任务 | 无 Fix PR, `in-progress` |
| **S0** | [#9976](https://github.com/zeroclaw-labs/zeroclaw/issues/9976) | Anthropic 凭证片段被 Debug 日志明文记录 | **已修复 -> [#10092](https://github.com/zeroclaw-labs/zeroclaw/pull/10092)** |
| **S1** | [#9946](https://github.com/zeroclaw-labs/zeroclaw/issues/9946) | `agent-browser` 子进程无超时/无 kill_on_drop，永久挂起 Turn | 无 Fix PR |
| **S1** | [#10042](https://github.com/zeroclaw-labs/zeroclaw/issues/10042) | CI MSRV 任务 `apt_install libudev-dev` 耗尽 20min 超时 | 关联 Fix [#10156](https://github.com/zeroclaw-labs/zeroclaw/pull/10156) |
| **P1/High** | [#9815](https://github.com/zeroclaw-labs/zeroclaw/issues/9815) | `forbidden_paths` 被 `allowed_roots` 完全覆盖 | 无 Fix PR |
| **P1/High** | [#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) | Anthropic Provider `cost_usd: 0.0` 导致预算熔断永不触发 | 无 Fix PR |
| **P1/High** | [#9883](https://github.com/zeroclaw-labs/zeroclaw/issues/9883) | WebP 入站转换在共享校验器前无界解码 | 无 Fix PR |
| **P1/High** | [#9872](https://github.com/zeroclaw-labs/zeroclaw/issues/9872) | Bounded Delegate 错误写入委托方 Workspace | 无 Fix PR |
| **P1/High** | [#9805](https://github.com/zeroclaw-labs/zeroclaw/issues/9805) | `auto` 模式 SOP 从 Channel/Cron 触发后永久 `running` | 无 Fix PR |
| **P1/High** | [#9786](https://github.com/zeroclaw-labs/zeroclaw/issues/9786) | 非法 `SOP.toml` 被静默丢弃，`sop validate` 仍报成功 | 无 Fix PR |

> **稳定性信号：** SOP 子系统占 P1 缺陷的 50%（#9779, #9929, #9805, #9786, #9783），已成为系统最不稳定模块；`risk:high` 标签在 24h 活跃 Issue 中出现 14 次，需优先回归。

### 6. 功能请求与路线图信号

**用户侧新需求（Enhancement）：**
*   [#9970](https://github.com/zeroclaw-labs/zeroclaw/issues/9970) `Authorize Discord members by role` - 诉求从 UserID 白名单扩展到 Role 授权，已有进行中 PR，**高概率进入下个版本**。
*   [#9943](https://github.com/zeroclaw-labs/zeroclaw/issues/9943) `upgrade DashScope/Qwen to QwenCloud` - 兼容性品牌升级，涉及文档与 Provider 别名，优先级 P2。
*   [#9780](https://github.com/zeroclaw-labs/zeroclaw/issues/9780) `Clarify cron-triggered SOP limits` - 要求明确 Cron 触发 SOP 无网络能力的限制并增加告警。
*   [#10019](https://github.com/zeroclaw-labs/zeroclaw/issues/10019) `Align prompt-injection deprecation deadline after Schema V4` - 文档与配置校验对齐。

**PR 侧已布局的路线图功能（预示下一版本）：**
*   [#10146](https://github.com/zeroclaw-labs/zeroclaw/pull/10146) `feat(plugins): activate logical channel instances` (XL) - 插件逻辑通道实例化，Daemon 构建核心，**是 #9126/#9137 后的关键拼图**。
*   [#10155](https://github.com/zeroclaw-labs/zeroclaw/pull/10155) `feat(sop): add interoperable run logs and trigger deduplication` (L) - 补齐 SOP 可观测性短板，增加 `zeroclaw.sop_run_id` 贯穿追踪与去重。
*   [#10142](https://github.com/zeroclaw-labs/zeroclaw/pull/10142) `feat(zerorelay): secure transport and browser enrollment frontdoor` (XL) - 强制 mTLS + 每 Daemon 独立 CA 的远程 WSS 平面，替代 #9080。
*   [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) `anchor context compaction to model window ratio` (XL) - 上下文压缩从固定 32K 阈值改为模型窗口比例，解决长窗模型截断问题。

> **判断：** 下一版本将以 **SOP 可观测性 + 插件通道 + ZeroRelay 安全传输** 为三大 Feature，Discord Role 等小增强可能作为伴随功能合入。

### 7. 用户反馈摘要

基于 Issues 评论提炼的真实痛点：

1.  **配置“静默失败”最伤信任：** [#9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779) 与 [#9786](https://github.com/zeroclaw-labs/zeroclaw/issues/9786) 共同暴露“文档有默认值但代码不生效/非法配置不报错”的体验断层。用户期望 `sop list/validate` 能给出明确诊断而非静默忽略。
2.  **安全心智负担重：** [#9815](https://github.com/zeroclaw-labs/zeroclaw/issues/9815) 用户按文档配置 `forbidden_paths` 期望实现黑名单，但实际被 `allowed_roots` 覆盖，产生“配置了但不安全”的错觉。对多租户/多 Agent 场景是阻断性问题。
3.  **成本与健康度不可信：** [#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) `$0.00` 计费与 [#9811](https://github.com/zeroclaw-labs/zeroclaw/issues/9811) `/health` 误报健康，均让运营侧无法依赖 `zeroclaw status` / `/health` 做自动化告警与预算熔断。
4.  **SOP“跑不起来/跑不完”：** [#9805](https://github.com/zeroclaw-labs/zeroclaw/issues/9805) `auto` SOP 永久 running 占并发槽位、[#9929](https://github.com/zeroclaw-labs/zeroclaw/issues/9929) 无头执行无持久化，反映用户将 SOP 用于 Watch-Loop/Cron 自动化时，核心执行链路尚未闭环。
5.  **正向反馈：** 硬件与 ZeroCode 的快速响应获得认可，[#9832](https://github.com/zeroclaw-labs/zeroclaw/issues/9832) 硬件编译问题与 [#10089](https://github.com/zeroclaw-labs/zeroclaw/issues/10089) 粘贴问题在 1-3 天内即被关闭，体现维护者对 TUI/边缘硬件场景的跟进速度。

### 8. 待处理积压

提醒维护者关注的 **长期未合并/易腐化** 项（>2周且标记 `needs-author-action` / `stale-candidate`）：

*   **[PR] [#9319](https://github.com/zeroclaw-labs/zeroclaw/pull/9319) `refactor(runtime): seal engine tool registry as ScopedToolRegistry` (XL, 2026-07-23)** - 标记 `stale-candidate`，重构引擎工具注册表为作用域隔离，是安全加固的底座，停滞近 1 个月需决策。
*   **[PR] [#9110](https://github.com/zeroclaw-labs/zeroclaw/pull/9110) `fix(lark): use constant_time_eq` (XS, 2026-07-17)** - Lark Token 时序攻击修复，`stale-candidate` 超 1 个月未合入，安全 Fix 不应久置。
*   **[PR] [#9574](https://github.com/zeroclaw-labs/zeroclaw/pull/9574) `fix(channels): authorize approval responders` (L, 2026-07-31)** - Telegram/Slack 等 4 通道审批授权绑定，已滞留 3 周。
*   **[PR] [#9637](https://github.com/zeroclaw-labs/zeroclaw/pull/9637) `fix(ci): guard temporary React Router RSC exception` (XL, 2026-08-01)** - 依赖审查临时豁免，标记 `do-not-merge` 且需 maintainer review，阻塞 CI 依赖门禁。
*   **[Issue] [#10008](https://github.com/zeroclaw-labs/zeroclaw/issues/10008) `[Task]: prove wasi:http hook dials pinned address set` (P1/High)** - WASI 插件网络出口的变异测试缺口，虽为测试任务但关联安全边界，需排期。

> **建议：** 当前待合并 PR 中 `needs-author-action` 占比超 50%，建议维护者对 `stale-candidate` 的 P1 安全类 PR（#9319, #9110, #9574）进行批量 Triage，或拆小合入以降低 XL PR 的 Review 负载。

---
*数据来源：GitHub API 2026-08-21T...Z 24h 增量 | 统计口径：Issues 50 / PRs 50 / Releases 0 | 生成器：Muse Spark*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报 | 2026-08-22

> 数据窗口：2026-08-21 00:00 - 2026-08-22 00:00 UTC | 数据来源：github.com/sipeed/picoclaw

### 数据概览
- **Issues：** 1 条更新 [新开/活跃 1 | 已关闭 0]
- **Pull Requests：** 5 条更新 [待合并 0 | 已合并/关闭 5]
- **Releases：** 0 个新版本

---

### 1. 今日速览

PicoClaw 今日整体处于**低活跃度的存量清理期**。24小时内无新代码合入主分支、无版本发布，仅新增 1 条功能型 Issue，另有 5 条积压长达 5-6 个月的历史 PR 集中关闭。项目未出现新增 Bug 或稳定性告警，但核心功能演进在当日无实质性推进，社区互动指标[评论数、👍]均为 0，短期健康度评估为 **平稳 / 需关注活跃度**。

核心信号：维护团队正在进行历史 PR 的批量归档清理，而非功能冲刺；新提出的会话调度机制值得关注。

### 2. 版本发布

**今日无新版本发布。**
最新 Releases 列表为空，项目近 24 小时未发布任何 Tag / Pre-release。

### 3. 项目进展

今日 **0 条 PR 待合并，5 条历史 PR 被关闭**。经核查，5 条均为 2026 年 2-3 月创建、于 2026-08-21 集中关闭的存量 PR，**状态均为 `CLOSED`，未显示明确 `Merged` 标识**，更倾向于过期/被替代/冲突关闭的仓库卫生清理，而非新功能合入。

| PR | 类型 | 标题与价值 | 作者 | 状态分析 |
|---|---|---|---|---|
| [#647](https://github.com/sipeed/picoclaw/pull/647) | `type: enhancement, domain: tool` | **Improve WebFetchTool text extraction** - 增加 HTML 实体解码`&amp;/&lt;`等、保留块级元素换行以提升可读性 | @liangzhang-keepmoving | 创建于 02-22，积压 180 天后关闭。功能完整但未合入，现有 WebFetch 的文本清洗能力提升可能需重新提交 |
| [#1158](https://github.com/sipeed/picoclaw/pull/1158) | `feat` | **add anthropic-messages protocol for native Anthropic API** Fixes #269 - 新增 `anthropic-messages` 协议前缀以支持 `/v1/messages` 原生端点，解决代理服务兼容性问题 | @hyperwd | 创建于 03-06，核心的协议层扩展，关闭原因待确认是否已由其他 PR 替代实现 |
| [#714](https://github.com/sipeed/picoclaw/pull/714) | `type: enhancement, domain: skill` | **skills: install/reinstall CLI and refactor into skillsCmd** - 支持 `repo@branch` + subpath 安装、新增 reinstall 强制覆盖、基于 GitHub Trees API 的全目录拉取 | @seanly | 创建于 02-24，Skill 生态的 CLI 关键能力，关闭意味着 Skill 分发机制短期内无更新 |
| [#1182](https://github.com/sipeed/picoclaw/pull/1182) | `type: documentation` | **feat: add agents.md** - 将 AGENTS.md 重构为原则导向的轻量级贡献指南，以 `go.mod` 为 Go 版本单一可信源 | @bumu | 创建于 03-06，文档类改进，关闭可能因规范已通过其他方式落地 |
| [#423](https://github.com/sipeed/picoclaw/pull/423) | `type: enhancement` WIP | **base multi-agent collaboration framework & shared context** - 基于 #213/#131 的多智能体协作底座，提供 Blackboard 共享上下文、Agent Handoff、Discovery 工具 | @Leeaandrob | 创建于 02-18，最重量的 WIP，积压 184 天后关闭。标志着官方多智能体路线短期内未以此分支合入 |

**综合研判：** 本日无实质性代码向前推进，项目进展为**负向的存量出清**。5 个方向[工具链、协议兼容、Skill 生态、多智能体]的长期提案被集中关闭，短期内可能导致对应 Roadmap 延期，维护者需在后续明确这些能力的替代实现路径。

### 4. 社区热点

今日无高评论/高点赞的热点讨论，**唯一活跃项即为今日新开 Issue**：

**[#3342 [OPEN] Opt-in "after-turn" steering mode: queue busy-session messages instead of interrupting the running turn](https://github.com/sipeed/picoclaw/issues/3342)** | 作者 @unedtamps | 👍 0 | 评论 0

**诉求分析：** 用户痛点非常明确——当前 Steering 策略在 Agent 仍在执行 Task #1 的工具调用时，若用户追加消息 #2，会直接打断并跳过剩余工具调用`Skipped due to queued user message.`，并立即注入新消息。这在长任务、批量工具调用场景下极易造成任务中断与状态不一致。
提案请求增加一个**可选的 `after-turn` 模式**：忙碌会话中的消息仅排队，不中断当前 turn，待当前 turn 自然结束后再处理。这本质是从“即时纠偏”向“有序排队”的调度策略补充，反映了用户对**可控性、确定性执行**的强烈需求，对 Agent 交互的稳定性有直接价值。

> 该 Issue 虽暂无互动，但属于架构级交互设计讨论，若被采纳将影响核心会话调度器。

### 5. Bug 与稳定性

**今日 0 条 Bug 报告。**

- 新 Issue #3342 为 `Feature` 类型，非缺陷。
- 5 条已关闭 PR 中无 Bugfix 标签，未关联线上崩溃、回归或性能退化问题。
- 无新增 Crash / 异常日志类 Issue，已有稳定性风险敞口为 0。

**状态：平稳。**

### 6. 功能请求与路线图信号

**今日新增 1 条明确的功能请求：**

*   **#3342 After-turn Steering 排队模式** - 优先级：**中高**。该需求与现有 Steering 中断机制互补，实现成本中等但收益明确[减少误中断、提升长任务成功率]，极有可能作为配置项`opt-in`被纳入下一版本的 Session/Steering 模块。

**历史 PR 折射的路线图信号[虽已关闭但代表社区方向]：**
1.  **协议兼容层：** #1158 反映社区对原生 Anthropic API 兼容的持续需求，#269 关联问题仍可能存在，未来版本仍需解决。
2.  **多智能体协作：** #423 的关闭不代表需求消失，Blackboard + Handoff 仍是 PicoClaw 区别于单 Agent 助手的长期壁垒，需关注是否会以新 RFC 形式重启。
3.  **工具与生态：** #647 和 #714 分别代表对 Web 能力和 Skill 分发能力的精细化打磨，方向符合个人 AI 助手的产品定位。

**预测：** 下一版本若有规划，`after-turn` 调度选项 + Anthropic 协议兼容的重新实现是最可能被优先捡起的两项。

### 7. 用户反馈摘要

由于今日 Issue 评论数为 0，用户反馈仅能从 Issue 正文提炼：

*   **核心痛点：** 用户在 Agent 执行中追加指令时，不希望当前任务被“粗暴打断”，现有“跳过剩余工具调用”的行为被视为副作用而非特性。
*   **使用场景：** 长链路工具调用、多步任务执行中，用户需要补充信息或追加子任务，但期望保持原子性。
*   **满意度信号：** 提案语气建设性，提出 `Opt-in` 而非强制替换，体现用户对现有 Steering 价值的认可，同时寻求更细粒度的控制权。暂无负面情绪或满意度评价。

### 8. 待处理积压

今日的 5 条 PR 关闭本身就是**长期积压的出清动作**，需引起维护者重视：

*   以上 5 条 PR 平均积压时长 **>170 天**，最长 #423 达 184 天[02-18 至 08-21]，最短 #1158/#1182 也有 168 天。长时间无响应/无合并决策会挫伤贡献者积极性[@liangzhang-keepmoving, @hyperwd, @seanly 等]。
*   **提醒：** 建议维护团队对关闭原因进行补充说明[如 `Closed as stale / superseded by #xxx / conflict` ]，避免贡献者困惑。并对同类长期开放的 enhancement 类 PR 进行一轮 triage，明确哪些方向已废弃、哪些计划重启。
*   当前**无遗留待合并 PR**，积压队列已清空，是建立新一轮迭代基线的好时机。

---
**健康度小结：** 代码合入停滞但仓库卫生得到改善。短期需关注 #3342 是否能快速得到维护者回应与标签分类，避免新的高质量提案再次进入长周期等待。建议下一周期重点：1) 回应 #3342 并给出调度方案设计取舍；2) 公示已关闭 5 条 PR 的后续替代计划。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-22

### 1. 今日速览

过去24小时项目保持**高活跃度**：共计 **70** 条 Issues/PRs 更新（Issues 34 条，PRs 36 条），其中新开/活跃 19 个 Issues，15 个已关闭；PR 侧 21 个待合并，15 个已合并/关闭。无新版本发布，当前预发布版本推进至 `v2.1.1b2`。
整体健康度良好：**工程侧**以性能优化、测试覆盖率补齐和 `Hub 多用户` 大功能收尾为主；**社区侧** Bug 报告集中于 `2.1.0 -> 2.1.1-beta.1` 的回归问题及稳定性（MCP 重连、Tool 404、WebView2 崩溃）。待合并 PR 存量略高（21），需关注长期 Review 积压。

### 2. 版本发布

> **今日无新版本发布。**
> 最新已合并的版本相关 PR 为 `chore: bump the version to v2.1.1b2` [#7200](https://github.com/agentscope-ai/QwenPaw/pull/7200)，表明 `v2.1.1-beta.2` 已进入打包阶段，预计将包含近期的性能与稳定性修复。

### 3. 项目进展

今日共 **4 个 PR 已合并/关闭**，**9 个 Issues 已关闭**，项目在性能与工程化上取得实质推进：

**已合并核心 PR：**
*   **perf(console): keep long chat sessions responsive** [#7176](https://github.com/agentscope-ai/QwenPaw/pull/7176) — **已关闭/合并**。解决长会话流式响应卡顿的核心痛点，修复了 Markdown 重复解析、历史消息同步重渲染的问题。对 `2.1.0` 用户体验影响显著。
*   **feat(hub): add self-hosted multi-user Hub** [#7112](https://github.com/agentscope-ai/QwenPaw/pull/7112) — **已关闭/合并**。引入 `qwenpaw hub` 自托管多用户控制面，支持为本地账户运行隔离的 App 实例，`qwenpaw app` 单用户流程保持不变。这是向团队/企业级部署迈出的关键一步。
*   **test(coverage): fix Windows integration coverage always reading 0** [#7205](https://github.com/agentscope-ai/QwenPaw/pull/7205) — **已关闭/合并**。修复自 #5531 (6/26) 以来 Windows 夜间集成覆盖率始终为 0 的静默失败，并增加 fail-closed 守护，防止空采集物无感上传。工程质量保障类修复。
*   **chore: bump the version to v2.1.1b2** [#7200](https://github.com/agentscope-ai/QwenPaw/pull/7200) — **已关闭/合并**。版本推进信号。

**已关闭 Issues（工程债务清零）：**
前端与后端测试覆盖率计划集中收尾，一次性关闭 5 个里程碑 Issues：[#5580](https://github.com/agentscope-ai/QwenPaw/issues/5580) (app-infra 后端单测)、[#5437](https://github.com/agentscope-ai/QwenPaw/issues/5437) / [#5433](https://github.com/agentscope-ai/QwenPaw/issues/5433) (前端 M3 单元测试)、[#5419](https://github.com/agentscope-ai/QwenPaw/issues/5419) (runner 模块)、[#5007](https://github.com/agentscope-ai/QwenPaw/issues/5007) / [#5006](https://github.com/agentscope-ai/QwenPaw/issues/5006) / [#5005](https://github.com/agentscope-ai/QwenPaw/issues/5005) (前端 Vitest 规划)。表明测试基建已成体系，有利于降低后续回归风险。

### 4. 社区热点

按评论数排序，今日最受关注的讨论：

| 排名 | Issue/PR | 标题 | 评论 | 热度分析 |
|---|---|---|---|---|
| 1 | [#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524) | [bug] MCP 后端重启后客户端无法自动恢复 | 6 | **最热 Bug**，自 7/28 持续活跃至今。`streamable_http` 场景下复用失效的 `mcp-session-id`，需手动 `list mcp` 恢复。反映 MCP 长连接健壮性诉求强烈。 |
| 2 | [#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) | 2.0.1版不使用时几十分钟后自己卡死 | 4 | 已关闭。桌面端空闲卡死问题，用户需杀进程重启，关注度高但疑似已通过其他修复缓解。 |
| 3 | [#7016](https://github.com/agentscope-ai/QwenPaw/issues/7016) | 工具调用404 | 3 | `2.1.0` 流式会话中 `offload` 接口 404 `Tool call not found`，高频调用，影响工具链路稳定性。 |
| 3 | [#7156](https://github.com/agentscope-ai/QwenPaw/issues/7156) | embedding health check 超时硬编码 | 3 | Ollama 已预热仍超时 10.4s 降级为 BM25-only，暴露硬编码 5s 超时无配置项的设计缺陷。 |

### 5. Bug 与稳定性

今日新增/活跃 Bug 按严重程度排序：

**🔴 严重/阻塞 (Regression)：**
*   **[回归] v2.1.1-beta.1: manual /compact always fails** [#7206](https://github.com/agentscope-ai/QwenPaw/issues/7206) — `compact_threshold_ratio == 0.9` 时触发 Pydantic ValidationError，`2.1.0` 正常。**暂无关联 Fix PR，需紧急修复以免阻塞 beta 发布。**
*   **[阻塞] Tool config all enabled but tools not injected** [#7210](https://github.com/agentscope-ai/QwenPaw/issues/7210) — `agent.json` 全启用但会话 `function schema` 未注入，工具完全不可用。**暂无 Fix PR。**
*   **[崩溃] WebView2 渲染进程启动约7秒后崩溃** [#6427](https://github.com/agentscope-ai/QwenPaw/issues/6427) — `v2.0.0+post.4` 回归，`msedge.dll+0x36c7f6d` 异常码 `0x80000003`，`post.3` 正常。长期未解决。
*   **[崩溃/卡死] startup hang** [#6430](https://github.com/agentscope-ai/QwenPaw/issues/6430) — 桌面端启动稳定卡死 ~85s。**已有潜在修复 PR：** `fix(workspace): make startup failure cleanup cancellation-safe` [#7194](https://github.com/agentscope-ai/QwenPaw/pull/7194) 正在解决异步启动取消安全问题，建议关联验证。

**🟠 高 (功能降级/数据异常)：**
*   **[数据膨胀] history.db 被撑爆到 7.6G** [#7168](https://github.com/agentscope-ai/QwenPaw/issues/7168) — **已关闭**。`ToolResultCapMiddleware` 将完整工具输出写入 `conversation_history` 导致重复落库，需关注是否已通过限制落库修复。
*   **embedding health check 超时** [#7156](https://github.com/agentscope-ai/QwenPaw/issues/7156) — 向量召回降级。
*   **工具调用404** [#7016](https://github.com/agentscope-ai/QwenPaw/issues/7016) — 流式会话高频 404。
*   **File card name 百分号编码乱码** [#7136](https://github.com/agentscope-ai/QwenPaw/issues/7136) — `send_file_to_user` 中文文件名显示为 percent-encoded。
*   **agent 自动搜索记忆错乱** [#7193](https://github.com/agentscope-ai/QwenPaw/issues/7193) — `2.1` 网页版跨会话记忆污染，搜索到同 agent 另一会话内容。
*   **daily_paper `write_atomic` 崩溃** [#7199](https://github.com/agentscope-ai/QwenPaw/issues/7199) — PDF 含代理字符 (U+D800–U+DFFF) 时 `encode("utf-8")` 抛 `UnicodeEncodeError`，导致整批任务退出。

**🟡 中：**
*   **MCP 重连失败** [#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524)
*   **桌面模式全屏被图标遮挡** [#7195](https://github.com/agentscope-ai/QwenPaw/issues/7195)

> **稳定性评估：** `2.1.1-beta` 回归类 Bug 集中爆发，建议在 `b2` 发布前优先修复 #7206 / #7210，并验证 #7194 对启动问题的覆盖度。

### 6. 功能请求与路线图信号

**今日新增功能请求：**
*   **希望可以选择是否显示工具调用信息** [#7203](https://github.com/agentscope-ai/QwenPaw/issues/7203) — 合同审核、研报场景下工具调用为视觉噪音，诉求类似 Hermes 的开关。
*   **Separate per-provider max_image/video/audio bytes caps** [#7201](https://github.com/agentscope-ai/QwenPaw/issues/7201) — 将单一 `max_inline_media_bytes` 拆分为三项独立配置并暴露到高级设置。
*   **推理过程默认折叠** [#7196](https://github.com/agentscope-ai/QwenPaw/issues/7196) — 默认展开的思考过程造成视觉干扰，希望可配置。
*   **审批模式优化** [#7198](https://github.com/agentscope-ai/QwenPaw/issues/7198) — 会话开始前已有文件未被修改时，任务执行中的中间产物操作不应触发审批，否则夜间无人值守任务会被弹窗阻塞。

**路线图信号（已在 PR 中实现/待合并）：**
*   **极可能进入下一版本：** `perf: keep long chat sessions responsive` [#7176](https://github.com/agentscope-ai/QwenPaw/pull/7176) 已合并；`feat(token-usage): attribute token usage by agent` [#7207](https://github.com/agentscope-ai/QwenPaw/pull/7207) (按 Agent 维度的 Token 统计)、`feat(dingtalk): support shared session context` [#7208](https://github.com/agentscope-ai/QwenPaw/pull/7208) (钉钉群聊共享上下文)、`feat(tools): transactional patching & PTY` [#7113](https://github.com/agentscope-ai/QwenPaw/pull/7113) 均处于活跃 Review，解决用户高频痛点。
*   **中长期方向：** `feat(creator) 1.1.0` [#7167](https://github.com/agentscope-ai/QwenPaw/pull/7167) 聚合多模态生态 (Anthropic/Gemini 协议、图像/视频生成器)、`feat(qwenpaw-data): PyPI runtime & docker-compose demo` [#7190](https://github.com/agentscope-ai/QwenPaw/pull/7190)、`feat: session-scoped multi project directories` [#6976](https://github.com/agentscope-ai/QwenPaw/pull/6976) 指向数据与多项目能力扩展。

### 7. 用户反馈摘要

*   **核心痛点 1 - 视觉与交互噪音：** 用户 @rerbin 连续提交 [#7203](https://github.com/agentscope-ai/QwenPaw/issues/7203) / [#7196](https://github.com/agentscope-ai/QwenPaw/issues/7196)，明确表示在专业场景（审合同、研报）中，强制展示的工具调用与推理过程是“严重的视觉干扰”，强烈呼吁提供折叠/隐藏开关，参考 Hermes 的设计。
*   **核心痛点 2 - 审批疲劳：** [#7198](https://github.com/agentscope-ai/QwenPaw/issues/7198) 指出当前审批策略过于敏感，连任务中间产物的删除也要弹框，导致“希望一夜干完的活儿早上看到的是待审批弹窗”，对自动化/无人值守场景不友好。
*   **核心痛点 3 - 稳定性与可预期性：** 多名用户反馈空闲卡死 [#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780)、启动卡死 [#6430](https://github.com/agentscope-ai/QwenPaw/issues/6430)、MCP 断连不恢复 [#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524)，期望“开箱即稳”。
*   **使用场景：** 出现了自定义 Tool [#7204](https://github.com/agentscope-ai/QwenPaw/issues/7204)、自定义频道 MCP 授权 [#7197](https://github.com/agentscope-ai/QwenPaw/issues/7197) 等深度定制需求，说明开发者生态正在从“使用”向“扩展”演进。
*   **满意点：** 测试覆盖率 PR 的密集关闭获得正向信号，表明项目工程化在持续改善。

### 8. 待处理积压

**需维护者优先关注的长期未响应/积压项：**

*   **超期 Bug (>3周未解决)：**
    *   [#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524) MCP 重连 (7/28 开启，6 评论)
    *   [#6427](https://github.com/agentscope-ai/QwenPaw/issues/6427) WebView2 崩溃 (7/24 开启)
    *   [#6430](https://github.com/agentscope-ai/QwenPaw/issues/6430) startup hang (7/24 开启)
*   **长期 Review 中 PR (>4周)：**
    *   [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) Add per-session model overrides (7/12 开启，Under Review)
    *   [#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399) reranker UI config panel (7/23 开启，Under Review)
    *   [#6515](https://github.com/agentscope-ai/QwenPaw/pull/6515) Volcengine/MiMo providers (7/28 开启)
    *   [#6607](https://github.com/agentscope-ai/QwenPaw/pull/6607) global-hotkey floating window (7/31 开启)
*   **建议：** 对 [#6524] / [#6427] 补充复现与优先级标签；对 `Under Review` 超期 PR 安排集中 Review，避免功能分支过久偏离主干。

---
*数据来源：GitHub API 2026-08-21~2026-08-22，统计口径为过去24小时有更新的 Issues/PRs。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-22

> 数据窗口：2026-08-21 00:00 ~ 2026-08-21 23:59 UTC | 统计来源：hermes-agent (NousResearch/hermes-agent)

### 数据概览
- **Issues:** 393 条更新 (新开/活跃 337 | 已关闭 56)
- **PRs:** 500 条更新 (待合并 461 | 已合并/关闭 39)
- **Releases:** 1 个新版本

---

### 1. 今日速览

项目处于**极高活跃度**状态，单日合计 893 条 Issue/PR 更新，远超日常基线。核心特征是**“高吞吐、低合入”**：500 条 PR 中有 461 条仍处于待合并状态，积压明显，但合并关闭的 39 条 PR 质量较高，集中解决数据完整性与桌面端稳定性问题。8月19日发布的 `v0.20.5` 作为补丁聚合版本已进入下游分发阶段，为近期的高频修复提供了稳定锚点。当前主要风险集中在 **Windows 平台安装/更新链路、Desktop 端性能与会话状态、以及 state.db 数据库可靠性** 三大领域。

**健康度评估：** 开发动能强劲，但待合并队列与 P1 级稳定性缺陷需优先疏通，整体健康度为 **亚健康-高负荷运转**。

### 2. 版本发布

#### v2026.8.19: Hermes Agent v0.20.5
- **链接:** `v2026.8.19`
- **类型:** Patch Release / 稳定标签版本
- **发布日期:** 2026-08-19
- **核心内容:** 
  > 此版本为补丁发布，聚合了自 `v0.20.4` 以来已合并的 **约 323 个 PR**，打包为下游消费者（Docker 镜像、托管部署、全新安装）可用的稳定 Tag。
- **破坏性变更:** 无。本次为滚动聚合，无 API / 配置不兼容变更说明。
- **迁移建议:** 
  1. 使用 Docker / 托管部署的用户可直接拉取 `v0.20.5` 镜像，无需手动迁移。
  2. 源码部署用户建议跟进 `main` 分支或切换至此 Tag 以获取近一个月的稳定性修复，尤其包含 state.db 相关的前置修复。
  3. 下游如 `enterkey-io` 分支需关注上游合并冲突（见 [#88584](https://github.com/NousResearch/hermes-agent/issues/88584)）。

### 3. 项目进展

今日 **已合并/关闭 39 个 PR + 56 个 Issues**，完成度最高的里程碑是架构治理与核心稳定性。

**A. 已关闭的重要 Issues (代表已完成/已验证的进展):**
- **[COMPLETE] 大文件拆分史诗 20/20 完成** [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) (77评论) — **已关闭**。全仓 `god-file` 分片策略落地，标志着自 2026-08 以来的架构重构阶段性收官，不再回滚。
- **Desktop 渲染器空转 100%+ CPU / GPU 98% 功耗问题** [#73082](https://github.com/NousResearch/hermes-agent/issues/73082) / [#53902](https://github.com/NousResearch/hermes-agent/issues/53902) — **已关闭**。两个长期高能耗渲染循环问题在近两日被集中关闭，表明 Electron 桌面端重渲染问题已找到根因并修复。
- **Cron 外部记忆提供商被硬编码禁用** [#9763](https://github.com/NousResearch/hermes-agent/issues/9763) — **已关闭**。解除 `cron/scheduler.py` 中 `skip_memory=True` 的硬编码，`mem0` 等外部记忆可在定时任务中使用。
- **支持按 Cron 任务覆盖推理强度** [#23524](https://github.com/NousResearch/hermes-agent/issues/23524) — **已关闭**。已支持 `agent.reasoning_effort` 的 per-job 覆盖。
- **Windows/macOS 网关更新/启动链路** [#84185](https://github.com/NousResearch/hermes-agent/issues/84185) / [#38053](https://github.com/NousResearch/hermes-agent/issues/38053) / [#38873](https://github.com/NousResearch/hermes-agent/issues/38873) — **已关闭**。修复了 Windows 更新后网关静默死亡、macOS 多 profile 下 launchd 未全量重启、以及远程网关模式回弹至本地的问题。

**B. 今日已合并/关闭的关键 PR:**
- **fix(state): 阻止实时 FTS 重建导致 state.db 损坏** [#90871](https://github.com/NousResearch/hermes-agent/pull/90871) — **已关闭(已合并)**。核心数据可靠性修复：当 `gateway run` 和 `hermes serve` 双进程共享 `state.db` 时，自动 FTS 重建会替换 WAL 文件导致脑裂损坏。此 PR 为关键稳定性补丁。
- 其姊妹 PR [#91839](https://github.com/NousResearch/hermes-agent/pull/91839) (待合并) 进一步对三条自动 FTS 重建路径增加了跨进程文件占用检测，完善了该修复。

> **推进评估:** 项目今日向前迈进 **一大步**：完成了持续近一个月的“神文件治理”史诗，并攻克了困扰桌面端数个版本的功耗/数据库损坏两大顽疾，为 `v0.20.5` 后的下一个稳定版奠定了基础。

### 4. 社区热点

按评论数排序，反映社区最关切的议题：

| 排名 | Issue | 评论 | 关注点 |
|---|---|---|---|
| 1 | [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) Large-file decomposition: 20/20 done | 77 | 架构讨论。社区对“强制分片、永不回滚”的政策有大量决策讨论，已完结。 |
| 2 | [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) Skills index is stale or degraded | 71 | **自动化告警**。Skills Hub 索引已过期 29.8h (阈值 26h)，持续 degraded，关注度极高。 |
| 3 | [#87093](https://github.com/NousResearch/hermes-agent/issues/87093) Debian installation broken | 18 👍3 | P1 安装阻断。Debian 13.6 下 `uv.lock & npm install` 失败，`curl | bash` 无法完成。 |
| 4 | [#73082](https://github.com/NousResearch/hermes-agent/issues/73082) Desktop renderer 100%+ CPU at idle | 17 | 性能热点。已关闭但讨论集中，反映大量 Mac 用户受高功耗困扰。 |
| 5 | [#89675](https://github.com/NousResearch/hermes-agent/issues/89675) Desktop: no sessions load for any profile | 16 👍2 | 会话状态。更新后多 profile 会话无法加载，`--profile` 参数丢失。 |
| 6 | [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) Secrets leak into secondary profile | 15 | **安全边界**。多 profile 复用下默认 profile 密钥泄露至次级 profile 的 terminal/Kanban 子进程。 |
| 7 | [#90473](https://github.com/NousResearch/hermes-agent/issues/90473) Show earlier messages paging UX | 13 | UX 差评。长会话(~900条) “显示更多消息”分页被用户直言“设计愚蠢”。 |

### 5. Bug 与稳定性

今日报告与高频回归问题，按严重程度排序：

**P1 - 阻断/崩溃级**
- [#89614](https://github.com/NousResearch/hermes-agent/issues/89614) **[Windows] Hermes 误杀 svchost.exe 导致蓝屏 0xEF** — `taskkill /F /PID` 使用过期 PID 导致 `CRITICAL_PROCESS_DIED` 反复蓝屏。 **暂无对应 Fix PR，需紧急处理。**
- [#87093](https://github.com/NousResearch/hermes-agent/issues/87093) **Debian 安装完全阻断** — `uv.lock` 与 `npm install` 失败。 **暂无 Fix PR。**
- [#83846](https://github.com/NousResearch/hermes-agent/issues/83846) **Windows ZIP fallback 删除已构建桌面应用且永不重建** — 更新后应用静默消失，后续更新显示 Already up to date。 **暂无 Fix PR。**
- [#84185](https://github.com/NousResearch/hermes-agent/issues/84185) **Windows 网关更新后静默死亡** — `hermes update` 后网关无日志、无 PID 死亡，离线至手动重启。 **已关闭，视为已修复。**
- [#90950](https://github.com/NousResearch/hermes-agent/issues/90950) **state.db 在 SQLite 3.53.1 上反复损坏** — WAL sidecar 在并发写入下被 unlink。 **已有 Fix PR:** [#90871](https://github.com/NousResearch/hermes-agent/pull/90871) (已合入) & [#91839](https://github.com/NousResearch/hermes-agent/pull/91839) (待合入)。

**P2 - 功能受损/高影响**
- [#89675](https://github.com/NousResearch/hermes-agent/issues/89675) **Desktop 多 profile 会话全量丢失** — 后端未带 `--profile` 启动。 **关联 PR:** [#90913](https://github.com/NousResearch/hermes-agent/pull/90913) fix connection identity authoritative, [#89849](https://github.com/NousResearch/hermes-agent/pull/89849) preserve session owner。
- [#54189](https://github.com/NousResearch/hermes-agent/issues/54189) **state.db 无限膨胀** — 2周达 659MB/938 sessions，无清理机制。 **暂无 Fix PR。**
- [#75756](https://github.com/NousResearch/hermes-agent/issues/75756) **Desktop 编辑历史消息失败 session not found** — rewind 缺少 resume+retry。 **暂无 Fix PR。**
- [#71047](https://github.com/NousResearch/hermes-agent/issues/71047) **Telegram 首次回复模式消息重复 + config set 重复顶层键**
- [#76312](https://github.com/NousResearch/hermes-agent/issues/76312) **Playwright Chromium 在 Node 26 上解压卡死**

**P3 - 安全/兼容性**
- [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) **多 profile 密钥泄露** (Security Boundary) — **暂无 Fix PR，高优先级安全债。**
- [#88168](https://github.com/NousResearch/hermes-agent/issues/88168) **大小写冲突文件导致 Windows 检出永久 dirty** — `contributors/emails/` 大小写冲突。

> **稳定性观察:** Windows 平台 P1 缺陷集中爆发（安装、更新、进程管理），Desktop 端围绕 `comp/desktop` + `area/sessions` 的缺陷占比超 40%，`state.db` 相关问题已出现系统性修复迹象。

### 6. 功能请求与路线图信号

**用户侧新功能请求 (Issues):**
- [#89995](https://github.com/NousResearch/hermes-agent/issues/89995) **在 Web Dashboard & Gateway 暴露 Bot Mode 群聊室** — Bot Mode 群聊目前仅限 Electron 桌面，Web 端无法访问。诉求强烈，`needs-decision`。
- [#20765](https://github.com/NousResearch/hermes-agent/issues/20765) **浏览器 Dashboard 语音模式 (WebRTC)** — 远程 TUI/PTY 无法使用麦克风，请求 WebRTC 音频采集。 👍6
- [#25833](https://github.com/NousResearch/hermes-agent/issues/25833) **自创建 Skills 缺乏正确性保障机制** — 要求对 Agent 自动持久化的 Skill 增加执行一致性验证。

**开发侧已准备的 Feature PRs (高概率进入下一版本):**
- [#91666](https://github.com/NousResearch/hermes-agent/pull/91666) `feat(bot-mode): enable protocol in routed Telegram topics` — 将 Bot Mode 协作协议扩展到 Telegram Topic 路由，补齐 [#89995](https://github.com/NousResearch/hermes-agent/issues/89995) 的网关侧能力，**有望下个版本合入**。
- [#90075](https://github.com/NousResearch/hermes-agent/pull/90075) `feat(gateway): add per-chat-type display overrides` — 支持 `display.platforms.<platform>.chat_types` 最细粒度显示覆盖。
- [#90491](https://github.com/NousResearch/hermes-agent/pull/90491) `openviking: add OPENVIKING_SKIP_TOOL_OUTPUTS` — 降低记忆同步成本，保留工具元数据但丢弃输出文本。
- [#89607](https://github.com/NousResearch/hermes-agent/pull/89607) `feat(agent): configure intent-ack vocabulary` — 支持多语言模型的 intent-ack 词表配置，解决非英语模型续写中断问题。
- [#90693](https://github.com/NousResearch/hermes-agent/pull/90693) `feat(feishu): add stale message filter` — 飞书适配器增加基于时间戳的过期消息过滤，防止重启后重放。

> **信号解读:** 路线图正从“桌面独占功能”向“网关/多平台一致性”演进，Bot Mode、Telegram/Feishu 等平台能力是下个小版本 (`v0.21.0`) 的核心增量。

### 7. 用户反馈摘要

从高评论 Issue 中提炼的真实声音：

- **痛点-安装即失败:** “Debian 13.6 纯净环境 `curl | bash` 就失败”、“Termux 全设备报错” ([#87093](https://github.com/NousResearch/hermes-agent/issues/87093), [#90687](https://github.com/NousResearch/hermes-agent/issues/90687)) — 新用户首日体验受阻，对 `uv.lock` 依赖与 Node 版本兼容性不满。
- **痛点-桌面不可用:** “更新后所有 profile 会话都不加载”、“ZIP 更新后应用直接消失” ([#89675](https://github.com/NousResearch/hermes-agent/issues/89675), [#83846](https://github.com/NousResearch/hermes-agent/issues/83846)) — 更新链路被视为最不稳定的环节。
- **痛点-性能与续航:** “Renderer/GPU 空转 100%+ CPU，机器发烫”、“13W 持续功耗，4倍于正常空闲” — Mac 用户对 Electron 功耗极度敏感，虽已修复但修复前负面情绪集中。
- **UX 差评:** “显示更多消息是哪个傻逼的设计？” ([#90473](https://github.com/NousResearch/hermes-agent/issues/90473)) — 长会话分页体验被认为割裂，900条消息场景下可用性差。
- **满意点:** 大文件拆分史诗完成获得架构层面认可；`v0.20.5` 聚合 323 PR 的稳定发布被视为对下游友好的举措。

### 8. 待处理积压

提醒维护者优先关注的长期未解/高风险积压：

| Issue / PR | 创建时间 | 状态 | 风险 |
|---|---|---|---|
| [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) Skills index stale/degraded | 2026-07-18 (34天) | OPEN, P3 | **自动化基础设施失效**。索引 `generated_at` 停留在 2026-07-20，工作流 15分19秒被取消。已有 Fix PR [#89608](https://github.com/NousResearch/hermes-agent/pull/89608) 待合入，需立即合并。 |
| [#54189](https://github.com/NousResearch/hermes-agent/issues/54189) state.db unbounded growth | 2026-06-28 (55天) | OPEN, P1 | 数据规模失控，单用户 659MB/2周，无生命周期清理，需设计会话归档策略。 |
| [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) Secrets leak across profiles | 2026-08-10 | OPEN, P2 Security | 安全边界缺陷，多 profile 隔离失效，建议提升至 P1 处理。 |
| [#20765](https://github.com/NousResearch/hermes-agent/issues/20765) Voice mode in browser dashboard | 2026-05-06 (108天) | OPEN | 长期 Feature 请求，呼声高但无对应 PR。 |
| [#25833](https://github.com/NousResearch/hermes-agent/issues/25833) Self-created skills guarantees | 2026-05-14 | OPEN | 影响 Agent 自进化可靠性的机制债。 |
| PR [#68499](https://github.com/NousResearch/hermes-agent/pull/68499) fix(delegation): separate lifecycle | 2026-07-21 (31天) | OPEN, 待合并 | 涉及 TUI/Desktop/Gateway 的委托任务生命周期重构，影响面广 (`sweeper:blast-broad`)，需加速评审。 |
| PR [#89608](https://github.com/NousResearch/hermes-agent/pull/89608) fix(skills): unstick stale index | 2026-08-19 | OPEN | 解决 #66616 的直接补丁，应优先于其他 P3 合入。 |

> **建议:** 下周维护重点：1) 紧急合入 [#89608](https://github.com/NousResearch/hermes-agent/pull/89608) 与 [#91839](https://github.com/NousResearch/hermes-agent/pull/91839) 解决索引与数据库两大基础设施问题；2)  triage Windows P1 三连（[#89614](https://github.com/NousResearch/hermes-agent/issues/89614) 蓝屏 / [#87093](https://github.com/NousResearch/hermes-agent/issues/87093) 安装 / [#83846](https://github.com/NousResearch/hermes-agent/issues/83846) 更新）；3) 清理 461 个待合并 PR 队列，避免发布后再次堆积。

---
*日报生成器: hermes-agent Daily Bot | 数据截至 2026-08-21 23:59 UTC*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 | 2026-08-22

> 数据区间：2026-08-21 00:00 - 2026-08-21 23:59 UTC | 统计来源：GitHub Issues / PRs

### 1. 今日速览

过去 24 小时项目保持中高活跃度，共更新 16 条 Issues（新开/活跃 7，关闭 9）与 11 条 PR（待合并 7，已合并/关闭 4），无新版本发布。核心动向呈现“稳定性修复为主、插件生态持续扩张”的特征：4 个关键修复已合并落地，同时 5 个社区插件完成审核上架。平台兼容性与 Provider 适配问题成为当日焦点，Discord/企业微信/Gemini 等多端 Bug 均有对应修复 PR 快速跟进，项目响应健康度良好，整体处于版本发布前的修复收敛期。

**健康度评估：** 🟢 健康 - Issue 关闭率 56%，PR 合并及时，核心缺陷 24h 内均有 Fix 关联。

### 2. 版本发布

今日无新版本发布。`v4.27.3` 仍为最新稳定版。
> 注：本日已合并的 4 个修复（含 NVIDIA 模型弃用、Windows SVG MIME）预计将在下一 Patch 版本集中发布。

### 3. 项目进展

今日共 **4 个 PR 已合并/关闭**，为下一版本扫清阻塞性缺陷：

*   **[fix] 更新已弃用的 NVIDIA 检索模型 [#9750](https://github.com/AstrBotDevs/AstrBot/pull/9750) [已合并 | S]** - 作者 @C10H14N2O5。响应 Issue [#9729](https://github.com/AstrBotDevs/AstrBot/issues/9729)，将默认 Embedding 模型由已公告 08/24 弃用的旧模型迁移至 `nvidia/nemotron-3-embed-1b`，Rerank 模型迁移至 `llama-nemotron-rerank-vl-1b-v2`。避免 8 月下旬后的服务中断，属于高优先级前瞻性修复。
*   **[fix] 修复 Windows 下 SVG 错误 MIME 类型 [#9735](https://github.com/AstrBotDevs/AstrBot/pull/9735) [已合并 | XS]** - 作者 @wcqqq1214。修复 Issue [#9734](https://github.com/AstrBotDevs/AstrBot/issues/9734)，解决 Windows 注册表将 `.svg` 解析为 `image/svg` 导致 WebUI 插件图标与 favicon 破图的问题。已注册标准 `image/svg+xml`。
*   **[feat] 支持重置会话级 Provider 覆盖 [#8752](https://github.com/AstrBotDevs/AstrBot/pull/8752) [已关闭 | M]** - 作者 @Rat0323。补充 `/provider reset/default` 子命令，用于清除 `provider_perf_<type>` 中持久化的会话级偏好，补齐了之前只能设置无法清除的功能缺口。
*   **[fix] 使 StarTools.get_data_dir() 在子模块/调试环境下更健壮 [#8588](https://github.com/AstrBotDevs/AstrBot/pull/8588) [已关闭 | L]** - 作者 @Rat0323。修复插件从子模块调用 API 时无法正确推断 `plugin_name` 而导致数据目录错误的问题，提升插件开发体验。

> **推进度评估：** 今日合并均为稳定性与开发者体验向改进，无大型功能合入，项目正处于以修复为主的迭代阶段。

### 4. 社区热点

按评论数/互动热度排序，今日热点集中在**插件生态**：

| 排名 | Issue/PR | 标题 | 热度 | 分析 |
| :--- | :--- | :--- | :--- | :--- |
| 1 | [#8557](https://github.com/AstrBotDevs/AstrBot/issues/8557) | [Plugin] astrbot_plugin_smart_silence - 智慧沉默控制 Pro | 评论 11, 已关闭 | 最热。轻量级沉默控制插件，支持主动拦截。反映社区对 Bot 拟人化、自主决定何时不说话的高度需求。 |
| 2 | [#8541](https://github.com/AstrBotDevs/AstrBot/issues/8541) | [Plugin] astrbot_plugin_meme_api_python - 表情包制作 | 评论 8, 已关闭 | 调用 meme-generator API。显示娱乐/内容生成类插件仍是生态主力。 |
| 3 | [#8690](https://github.com/AstrBotDevs/AstrBot/issues/8690) | [Plugin] astrbot_plugin_astrshell - zsh 适配器 | 评论 5, 已关闭 | 开发者工具类插件，将 AstrBot 接入终端，体现生态向开发者效率工具延伸。 |
| 4 | [#9763](https://github.com/AstrBotDevs/AstrBot/issues/9763) | [Bug] 定时任务使用 dashscope api 出现 system prompt 过长 | 新开 1 评论 | 技术讨论热点，涉及 Cron 上下文与 Token 管理机制缺陷。 |
| 5 | [#9744](https://github.com/AstrBotDevs/AstrBot/issues/9744) | [Feature] 将 AnySearch 添加为可选网页搜索工具 | 新开 1 评论 | 厂商主动提案，希望通过 MCP/原生工具接入，代表“搜索能力”成为模型能力扩展的关键诉求。 |

**诉求洞察：** 插件上架审核流高效（3 个 6月提交的插件于昨日集中关闭），说明维护者正在批量清理积压的 `plugin-publish` 队列，生态扩容速度加快。

### 5. Bug 与稳定性

按严重程度排序，今日新增 5 个待修复 Bug，3 个已有关联 Fix PR：

**P0 - 高 / 已有 Fix**
*   **[Bug] Gemini functionResponse 未保留 name/id 导致工具调用失败 [#9760](https://github.com/AstrBotDevs/AstrBot/issues/9760) [OPEN]** -> Fix: [#9761](https://github.com/AstrBotDevs/AstrBot/pull/9761) [OPEN | M]。`functionResponse.name` 被错误地填为 `tool_call_id`，被严格校验的 Gemini 后端拒绝。影响所有 Gemini 工具链。
*   **[Bug] 企业微信初始响应非空时触发等待超时 [#9758](https://github.com/AstrBotDevs/AstrBot/issues/9758) [OPEN]** -> Fix: [#9759](https://github.com/AstrBotDevs/AstrBot/pull/9759) [OPEN | S]。长连接接收循环内联等待回调处理器，与“等待命令响应”机制死锁导致 10s 循环超时。
*   **[Bug] Discord 文转图显示为白色横条 [#9756](https://github.com/AstrBotDevs/AstrBot/issues/9756) [OPEN]** -> Fix: [#9762](https://github.com/AstrBotDevs/AstrBot/pull/9762) [OPEN | M]。`text_to_image()` 返回的 `127.0.0.1` 回环 URL 被当作公网 URL 填入 Embed，Discord 服务器无法拉取。Fix 改为作为附件上传。
*   **[Bug] 沙盒缓存残留误判内置 Skill 为 sandbox preset [#9754](https://github.com/AstrBotDevs/AstrBot/issues/9754) [OPEN]** -> Fix: [#9755](https://github.com/AstrBotDevs/AstrBot/pull/9755) [OPEN | XS]。`is_sandbox_only_skill()` 未检查 plugin-provided skills，导致 `pdf/documents` 等内置 skill 在 WebUI 无法查看。
*   **[Bug] Windows WebUI SVG MIME 错误导致破图 [#9734](https://github.com/AstrBotDevs/AstrBot/issues/9734) [CLOSED]** -> **已修复** via [#9735](https://github.com/AstrBotDevs/AstrBot/pull/9735)

**P1 - 中 / 待修复**
*   **[Bug] 定时任务 dashscope system prompt 超长 90000 tokens [#9763](https://github.com/AstrBotDevs/AstrBot/issues/9763) [OPEN]** - 阿里 DashScope 400 报错，Cron 管理器 `manager.py:L455` 虽有 10 次弹上下文重试仍失败。暴露定时任务场景下 system prompt 拼接与自动压缩策略失效。**暂无 Fix PR，需优先处理。**

**P2 - 低**
*   **[Bug] WebUI 自定义侧边栏功能打开错位 [#5405](https://github.com/AstrBotDevs/AstrBot/issues/5405) [CLOSED]** - 历史遗留 UI 问题，昨日关闭，疑似已随 WebUI 重构修复。

### 6. 功能请求与路线图信号

*   **[Feature] 集成 AnySearch 作为可选网页搜索工具 [#9744](https://github.com/AstrBotDevs/AstrBot/issues/9744) [OPEN]** - 提案方 AnySearch 团队提供 API/MCP/Skill 三种接入形态，支持垂直领域搜索。契合 AstrBot 工具系统扩展方向，与现有 Tavily/Bing 搜索形成补充。**纳入下一版本概率：高**，若 PR 质量达标，很可能以原生 Tool 或 MCP 形式合入。
*   **[Feature] 针对 QQ 自动回复导致 API 余额浪费的解决方案 [#9757](https://github.com/AstrBotDevs/AstrBot/issues/9757) [OPEN]** - 用户痛点：QQ 忙碌状态自动回复无冷却，与 LLM 无限互聊浪费 Token。用户已自研插件 `astrbot_plugin_auto_shutup` 并建议集成到核心设置。**纳入概率：中**，可作为平台层防刷策略，可先以官方推荐插件形式存在，核心集成需评估通用性。
*   **[feat] 为 /new 命令添加权限检查 [#9739](https://github.com/AstrBotDevs/AstrBot/pull/9739) [OPEN | M]** - 补齐与 `/reset` 不一致的权限漏洞，防止共享会话下任意成员重置上下文。**大概率合入**，属于一致性修复。

### 7. 用户反馈摘要

*   **痛点集中在平台适配：** 企业微信、Discord、QQ 三个主流 IM 平台在同一天暴露边界问题（超时、白条、无限回复），反映多平台适配器长期维护压力。用户临时解决方案（如 Discord 改用本地路径发送）体现对稳定性强需求。
*   **对 Provider 兼容性敏感：** NVIDIA 模型弃用公告引发用户主动预警 [#9729](https://github.com/AstrBotDevs/AstrBot/issues/9729)；Gemini、DashScope 的严格校验/Token 限制暴露 AstrBot 在协议层细节（functionResponse 字段、system prompt 管理）上仍需精细化。
*   **插件开发者体验：** `get_data_dir()` 子模块问题 [#8588](https://github.com/AstrBotDevs/AstrBot/pull/8588) 和 README 本地资源加载问题 [#8360](https://github.com/AstrBotDevs/AstrBot/pull/8360) 来自真实开发者的反馈，说明插件生态复杂度提升后，工具链需跟进。
*   **正面信号：** 插件发布类 Issue 均顺利关闭且无负面评论，WebUI SVG 修复后用户确认生效，社区对维护者响应速度满意。

### 8. 待处理积压

提醒维护者关注的长期未决项（> 2 个月）：

*   **[PR] Fix/plugin readme local assets [#8360](https://github.com/AstrBotDevs/AstrBot/pull/8360) [OPEN | 2026-05-26 | L]** - 解决插件 README 相对路径图片在 WebUI 加载失败，利于低带宽服务器。已停滞近 3 个月，建议 Review。
*   **[PR] Feat: Opencode Zen & Go as Provider [#8179](https://github.com/AstrBotDevs/AstrBot/pull/8179) [OPEN | 2026-05-13 | XL]** - 新增 Provider 支持，体积大（XL），已悬置 3 个月，需明确是否继续跟进或关闭。
*   **[PR] 权限检查 /new 命令 [#9739](https://github.com/AstrBotDevs/AstrBot/pull/9739) [OPEN | 2026-08-19]** - 已有明确场景与实现，建议尽快合入以避免共享会话被误操作。
*   **待修复 Bug 无 PR 关联：** [#9763](https://github.com/AstrBotDevs/AstrBot/issues/9763) DashScope 定时任务 Token 超限，目前仍无 Fix，需分配处理。

---
*日报生成：Muse Spark | 数据截止 2026-08-22 00:00 UTC | 建议关注：Provider 模型迁移与多平台稳定性回归测试*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*