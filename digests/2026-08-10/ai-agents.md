# OpenClaw 生态日报 2026-08-10

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-09 22:18 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-10

## 1. 今日速览

过去 24 小时项目保持**高活跃度**：Issues 更新 500 条（其中新开/活跃 424 条，关闭 76 条），PR 更新 500 条（待合并 320 条，合并/关闭 180 条，合并率约 36%），无新版本发布。社区讨论热度高度集中于**「静默消息丢失」**主题——#116277（DeepSeek v4 Flash 回复失败，196 条评论）虽已关闭，但用户当日即报告问题复现（#121058），说明该修复并未真正生效。与此同时，安全类议题（工具调用间文本泄漏 #25592、API 密钥保护 #11829、记忆投毒防护 #7707）持续升温，已成为社区最强烈的改进诉求。整体来看，项目吞吐量大，但**消息可靠性问题反复出现**与**长期积压的 P0/P1 议题未被消化**是当前健康度的主要隐患。

---

## 2. 版本发布

今日无新版本发布（Releases: 0）。

---

## 3. 项目进展

今日 Top 30 高讨论度 PR 中仅 2 个已合并/关闭，均为**维护性改动**：

- [#121243 refactor(tests): simplify internal test-only seams](https://github.com/openclaw/openclaw/pull/121243) — 清理内部测试专用接缝与重复断言，降低维护成本（已合并）。
- [#121114 chore(i18n): refresh native locales](https://github.com/openclaw/openclaw/pull/121114) — 自动机器人提交的原生应用本地化刷新（已合并）。

**值得关注的待合并 PR（评审管线中的实质进展）：**

- [#121113 refactor(agents)!: remove the session write lease](https://github.com/openclaw/openclaw/pull/121113) — 移除跨会话 SQLite 写租约。该机制继承自 2026 年 1 月的 JSONL 文件锁架构，已随两次存储迁移失去存在意义。标为破坏性变更（`!`），涉及兼容性与会话状态风险，已进入维护者评审。
- [#120881 fix(config): route legacy migrations through doctor](https://github.com/openclaw/openclaw/pull/120881) — 修复运行时读取配置时静默执行遗留迁移的问题，将迁移统一收口到 `doctor`，降低正常读写路径的副作用。
- [#121063 fix(agent-core): bound runaway loops with turn/error-batch/idle-repeat guards](https://github.com/openclaw/openclaw/pull/121063) — 针对真实案例（外部服务 429 被伪装成"成功"工具输出，驱动 219 轮助手回合 / 177 次工具调用 / 约 15M tokens 的失控循环）增加三层防护，是本次 PR 集中最实质的稳定性修复。
- [#120734 fix(anthropic): reject leaked Claude tool protocol output](https://github.com/openclaw/openclaw/pull/120734) — 阻止 Claude Code 遗留的 `<invoke>`/`<parameter>` 协议文本、伪造命令输出被当作正常聊天内容持久化与投递，直接呼应社区高频的"文本泄漏"类问题。
- [#120248 fix(amazon-bedrock): avoid O(n²) tool-call arg re-parsing](https://github.com/openclaw/openclaw/pull/120248) — 修复大字符串参数（多 KB 文档体）被静默丢弃为 `{}`/截断的问题。
- [#120044 fix(gateway): usage.status no longer waits on provider HTTP](https://github.com/openclaw/openclaw/pull/120044) — 冷缓存下 Usage 页面阻塞 6.4 秒的问题，改为不等待 provider HTTP。

**平台与新能力扩展：** [#120373](https://github.com/openclaw/openclaw/pull/120373) 新增 Meta Muse Spark 1.2 及 Contributor 模型；[#118499](https://github.com/openclaw/openclaw/pull/118499) / [#118505](https://github.com/openclaw/openclaw/pull/118505) 为 macOS 增加 realtime Gateway-relay Talk 支持与设置面板；[#120854](https://github.com/openclaw/openclaw/pull/120854) 为 Mattermost 实现进度帖与最终回复分离；[#120768](https://github.com/openclaw/openclaw/pull/120768) 实现 `oc-pair` 一键粘贴设备配对流程。

整体判断：项目今日无重大功能合入，但**一大批高价值修复与重构正聚集在评审队列**，未来数日可能有集中合并。

---

## 4. 社区热点

| 议题 | 评论数 | 状态 | 核心诉求 |
|---|---|---|---|
| [#116277 DeepSeek v4 Flash 静默回复失败](https://github.com/openclaw/openclaw/issues/116277) | 196 | 已关闭 | 模型静默不生成回复，仅回退提示 "No reply was generated"；带 `impact:message-loss`，且已关联开放 PR |
| [#25592 工具调用间文本泄漏到消息通道](https://github.com/openclaw/openclaw/issues/25592) | 41 | 开放 | 内部处理输出、错误处理、叙述性文本被当作可见消息路由到 Slack/iMessage，属严重 UX 与安全问题 |
| [#7707 记忆信任标签（按来源标记）](https://github.com/openclaw/openclaw/issues/7707) | 32 | 开放 | 防止网页/第三方 skill 中的恶意指令通过记忆投毒影响后续行为 |
| [#44925 子代理完成结果静默丢失](https://github.com/openclaw/openclaw/issues/44925) | 25 | 开放 | 完成通知失败、超时后无重试/通知/自动重启，存在 E31/E42/E45 多种失败模式 |
| [#121058 #116277 关闭后问题仍复现](https://github.com/openclaw/openclaw/issues/121058) | 19 | 开放 | 监控 cron 在 #116277 关闭后仍持续记录到新发生，包括当天（08-09） |

**分析：** 社区最集中的情绪是**对"静默失败"类问题反复出现的疲惫感**——#116277 以 196 条评论成为绝对热点，而当天就有用户开新 issue 指出其关闭无效（#121058）。其次是**安全与信任边界**议题（#25592、#7707、#11829、#45740），用户越来越关注 agent 的输入/输出边界是否可控。此外，[#48920（P0，文档超前于发布）](https://github.com/openclaw/openclaw/issues/48920) 获得 4 个 👍，反映用户对"文档与版本脱节"的明确不满。

---

## 5. Bug 与稳定性

按严重程度排列（P0 > P1 > P2）：

### P0 发布阻断
- **[#48920 Live Docs 超前于发布版本](https://github.com/openclaw/openclaw/issues/48920)** — 文档中的 `IsolatedSessions` 等配置在最新版 2026.3.13 中不存在，标记 `impact:ux-release-blocker`。⚠️ 无 fix PR，已积压近 5 个月。

### P1 消息丢失 / 回复失败（最高发类别）
- **[#121058 静默回复失败在 #116277 关闭后仍复现](https://github.com/openclaw/openclaw/issues/121058)** — 无 fix PR，需维护者重新评估 #116277 的修复是否完整。
- **[#44925 子代理完成结果静默丢失](https://github.com/openclaw/openclaw/issues/44925)** — 无重试、无通知、无自动重启。⚠️ 无 fix PR。
- **[#25592 工具调用间文本泄漏](https://github.com/openclaw/openclaw/issues/25592)** — 已关联开放 PR，待合入。
- **[#92201 Anthropic thinking 签名重放间歇失效](https://github.com/openclaw/openclaw/issues/92201)** — 错误文本被泛化导致恢复包装器不触发。⚠️ 无 fix PR。
- **[#91009 Codex PreToolUse hook 进程 CPU 占满、网关 RPC 停滞](https://github.com/openclaw/openclaw/issues/91009)** — 多个 `openclaw-hooks` 进程各占 ~100% CPU，`impact:crash-loop`。⚠️ 无 fix PR。

### P1 会话状态 / 数据完整性
- **[#115546 CLI-budget 压缩在截止时间前数秒（4.9s–50s）即超时，大会话 100% 失败](https://github.com/openclaw/openclaw/issues/115546)** — 无重试，触发"唤醒死亡螺旋"。⚠️ 无 fix PR。
- **[#94939 6.x 迁移后渠道会话 SQLite 为 0 字节](https://github.com/openclaw/openclaw/issues/94939)** — 旧 JSON 被改名标记完成但新库为空，导致 MS Teams 主动发送失败。已有关联 PR。
- **[#48003 steer 模式无法在回合中注入消息](https://github.com/openclaw/openclaw/issues/48003)** — `KeyedAsyncQueue` 引入的回归。已有关联 PR。
- **[#97616 hook/工具子进程未回收，僵尸进程累积](https://github.com/openclaw/openclaw/issues/97616)** — 运行时性能逐渐劣化。⚠️ 无 fix PR。

### 迁移 / 平台回归
- **[#90378 5.28→6.1 升级：cron 存储静默迁移至 SQLite 且默认投递模式变更](https://github.com/openclaw/openclaw/issues/90378)** — 已有关联 PR。
- **[#105528 Windows 上 exec/read 工具间歇性返回空输出](https://github.com/openclaw/openclaw/issues/105528)** — 6.x 回归，子会话正常而主会话异常。⚠️ 无 fix PR。
- **[#119796 Windows vitest 清理阶段 EBUSY](https://github.com/openclaw/openclaw/issues/119796)** — 测试 teardown 失败，已有关联 PR。

### 渠道类
- [#51049 WhatsApp 入站消息在 k3s 嵌套容器中收不到](https://github.com/openclaw/openclaw/issues/51049)（P1，⚠️ 无 PR）
- [#120735 Telegram 贴纸以裸文件引用到达、未落盘](https://github.com/openclaw/openclaw/issues/120735)（P2，`fix-shape-clear` 可排队修复）
- [#88079 WebChat 不渲染 Kimi Code / DeepSeek Reasoner 的 reasoning 流](https://github.com/openclaw/openclaw/issues/88079)（P2）

**小结：** 今日 Bug 报告以"消息丢失/静默失败"为主线，且相当一部分 **P1 尚无关联 fix PR**（#121058、#44925、#91009、#92201、#115546、#97616、#105528），修复资源存在明显缺口。

---

## 6. 功能请求与路线图信号

### 高热度安全类需求（多获 🦞 diamond lobster 评级，但均卡在"需产品决策"）
- [#11829 安全路线图：保护 API Key 不被 Agent 访问](https://github.com/openclaw/openclaw/issues/11829) — 21 评论；提出密钥会序列化进 prompt、可在聊天中泄露等多个攻击面。
- [#10659 掩码密钥系统：Agent 可用但不可见](https://github.com/openclaw/openclaw/issues/10659) — 15 评论、4 👍；防止提示注入提取凭据。
- [#7722 文件系统沙箱配置（tools.fileAccess）](https://github.com/openclaw/openclaw/issues/7722) — 9 评论、4 👍；允许/拒绝路径白黑名单。
- [#18677 skill:install 安全扫描 Hook API](https://github.com/openclaw/openclaw/issues/18677) — 18 评论；安装前拦截扫描。

### 记忆与上下文架构
- [#60572 多槽记忆架构](https://github.com/openclaw/openclaw/issues/60572) — 6 评论、3 👍；将单一 memory 槽位拆分为多层专用槽。
- [#54373 RFC：上下文来源/易失性元数据](https://github.com/openclaw/openclaw/issues/54373) — 让 agent 区分"会话注入内容"与"当前新读内容"。
- [#6757 Agent 自主触发上下文压缩（self-compact 工具）](https://github.com/openclaw/openclaw/issues/6757) — 8 评论、2 👍。

### 模型与运维
- [#6599 新增 `/models test-fallback` 命令验证回退链](https://github.com/openclaw/openclaw/issues/6599) — 11 评论。
- [#10687 完全动态模型发现（OpenRouter 优先）](https://github.com/openclaw/openclaw/issues/10687) — 9 评论、3 👍；当前模型目录近乎静态。

### 交互与控制面
- [#47677 Telegram reaction 作为一等唤醒/执行触发](https://github.com/openclaw/openclaw/issues/47677) — 6 评论、2 👍。
- [#46656 Webchat/Control UI 内联按钮支持](https://github.com/openclaw/openclaw/issues/46656) — `buttons` 参数目前仅 Telegram 生效。
- [#71142 Control UI 上传大小限制可配置](https://github.com/openclaw/openclaw/issues/71142) — 硬编码 5MB。
- [#71452 消息列表分页替代硬编码 25 条上限](https://github.com/openclaw/openclaw/issues/71452)。

**路线图信号：** 在途 PR 显示下一版本可能包含：**macOS realtime Talk**（#118499/#118505）、**一键设备配对**（#120768）、**Mattermost 进度/最终回复隔离**（#120854）、**上下文压力感知续跑**（#85651、`continue_work`/`request_compaction` 工具）以及 **Meta Muse Spark 1.2** 模型目录扩充（#120373）。安全类请求虽呼声高，但普遍停留在 `needs-product-decision` 状态，**尚无对应实现 PR**。

---

## 7. 用户反馈摘要

**最集中的痛点：静默失败与数据丢失。** 用户 @sloptop-the-terrible 连续提交 #116277 与 #121058，明确表达"问题被关闭但仍在发生"的挫败感；@IIIyban 在 #44925 中详细列举子代理结果丢失的三种模式，强调"无重试、无通知、无恢复"对自动化工作流的破坏性。

**升级迁移不透明引发不信任。** 多个用户在 #90378（cron 迁移）与 #94939（会话存储迁移）中指出：升级过程"静默"改写存储格式且不保留原配置/数据，导致生产环境消息发送失败。迁移过程缺少用户可见的确认与回滚路径。

**安全边界意识显著增强。** 用户 @jmkritt 连续提出 #11829 与 #10659，指出"API 密钥对人类用户可见"本身即是风险；#7707 的用户主张按来源（用户命令/网页抓取/第三方 skill）对记忆条目分级信任，以对抗记忆投毒。这反映真实部署中已出现恶意网页内容污染 agent 行为的担忧。

**UX 反馈获得维护者响应。** @msbel5 在 #75947 批评 UI"像 AI 生成的原始配置，密集难读"；同批 PR 中维护者 @steipete 等人提交了多项 UI 修复（[#121255 用应用内对话框替换 window.prompt](https://github.com/openclaw/openclaw/pull/121255)、[#121254 侧边栏 pin 即时响应](https://github.com/openclaw/openclaw/pull/121254)、[#121258 光标样式按应用模式收窄](https://github.com/openclaw/openclaw/pull/121258)、[#121249 新建会话分组对话框](https://github.com/openclaw/openclaw/pull/121249)），显示维护者正在快速消化 UI 反馈。

**正面信号：** 多 Teams bot 支持（#71058）、动态模型发现（#10687）、优雅子代理超时（#6625）等需求均获得社区 👍 支持，且讨论质量较高，具备纳入路线图的基础。

---

## 8. 待处理积压（需维护者关注）

| 议题 | 开启时间 | 关注度 | 风险 |
|---|---|---|---|
| [#25592 工具调用间文本泄漏](https://github.com/openclaw/openclaw/issues/25592) | 2026-02-24 | P1，41 评论，1 👍 | 已积压 5.5 个月，有 PR 但未合入；涉安全与 UX 双重影响 |
| [#48920 文档超前于发布（P0）](https://github.com/openclaw/openclaw/issues/48920) | 2026-03-17 | P0 release blocker，10 评论，4 👍 | 发布阻断级别但 5 个月未关闭，无 fix PR |
| [#121058 静默回复复现](https://github.com/openclaw/openclaw/issues/121058) | 2026-08-09 | 19 评论，当天新增 | 表明 #116277 修复无效，应优先重新评估 |
| [#11829 API Key 保护路线图](https://github.com/openclaw/openclaw/issues/11829) | 2026-02-08 | 21 评论 | 安全路线图议题，停留在讨论阶段 |
| [#7707 记忆信任标签](https://github.com/openclaw/openclaw/issues/7707) | 2026-02-03 | 32 评论 | 6 个月无维护者实质回应 |
| [#91009 Codex hook CPU 占满](https://github.com/openclaw/openclaw/issues/91009) | 2026-06-06 | P1，18 评论，2 👍 | 导致网关 RPC 停滞与崩溃循环，无 PR |
| [#44925 子代理结果静默丢失](https://github.com/openclaw/openclaw/issues/44925) | 2026-03-13 | P1，25 评论，2 👍 | 多失败模式、影响面广，无 PR |
| [#115546 压缩超时提前触发 100% 失败](https://github.com/openclaw/openclaw/issues/115546) | 2026-07-29 | P1，7 评论 | 大会话必现、无重试机制，无 PR |

---

**日报总结：** OpenClaw 今日社区活跃度极高，PR 管线充实，但在"消息可靠性"与"安全边界"两条主线上，**用户报告的 Bug 增长速度快于修复合入速度**，且 #116277→#121058 的"假关闭"案例削弱了社区对修复流程的信任。建议维护者优先处理：① 重新打开/彻底修复静默回复问题；② 为 #48920 安排文档与发布对齐；③ 对五个无 PR 的 P1 消息丢失类问题给出明确修复计划。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**日期：2026-08-10 | 分析范围：OpenClaw, Zeroclaw, PicoClaw, QwenPaw, hermes-agent, AstrBot**

---

## 1. 生态全景

当前个人 AI 助手与自主智能体开源生态处于**高速扩张与可靠性瓶颈并存的阶段**。头部项目（OpenClaw、hermes-agent）单日 Issues/PR 流量均达到 500 条量级，社区参与规模已接近成熟基础设施项目；但"静默消息丢失"、"安全边界不闭合"、"升级迁移不透明"三类问题在多个项目中同时高发，说明行业整体尚未建立可靠性与安全性的统一基线。生态内部呈现明显的**功能同质化与架构分化并行**的态势——多项目同时涌入模型兼容、消息渠道扩展、记忆/上下文管理、安全加固四大赛道，但技术路线（Rust 高并发网关 vs Python 生态集成 vs 企业级可观测性）各不相同。维护者评审带宽普遍成为瓶颈，多项目出现"社区产出强劲、合入速度滞后"的剪刀差，长期治理效率将决定下一轮分化格局。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | 待合并 PR | 合并/关闭率 | Release | 健康度评估 |
|---|---|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃 424，关闭 76） | 500（待合并 320） | 320 | 合并/关闭 180（36%） | 无 | ⚠️ 吞吐量最大但**可靠性问题反复**；P0/P1 积压严重；#116277"假关闭"削弱信任 |
| **hermes-agent** | 500（新开/活跃 294，关闭 206） | 500（待合并 398） | 398 | 合并/关闭 102（20.4%） | 无 | ✅ **合并效率最佳**；启动崩溃 P1 已迅速出修复 PR；"salvage 文化"体现维护者响应意愿 |
| **Zeroclaw** | 50（新开/活跃 38，关闭 12） | 50（全部待合并） | 50 | **0 合并** | 无（v0.8.4 流程已启动） | 🔴 **合并管道堵塞**；P0 Webhook 漏洞对应 PR 滞留 `needs-author-action`；治理 RFC 超长迭代 |
| **QwenPaw** | 17（新开/活跃 11，关闭 6） | 50（待合并 49） | 49 | 闭环 1（2%） | 无 | 🟡 活跃度健康但**合并率偏低**；7 条 first-time PR 待审；移动端需求 20+ 天无回应 |
| **PicoClaw** | 3（含自动关闭 1） | 6（待合并 5） | 5 | 合并 1、关闭 0 | 无 | 🟡 体量小但**方向清晰**（SSRF 系列加固+Telegram 表格）；#3222 积压超一个月 |
| **AstrBot** | 10（新开/活跃 8，关闭 2） | 5（待合并 3） | 3 | 合并/关闭 2（40%） | 无 | 🟢 **响应速度最快**；核心问题均有对应 PR；知识库回归需关注 |

**核心发现**：合并率与项目体量成反比——AstrBot（40%）> OpenClaw（36%）> hermes-agent（20.4%）> QwenPaw（2%）> Zeroclaw（0%）。**维护者带宽是生态共同瓶颈**，Zeroclaw 的 0 合并最为极端。

---

## 3. OpenClaw 在生态中的定位

### 核心优势
- **规模绝对领先**：单日 500 Issues + 500 PR 的流量是 Zeroclaw（50/50）的 10 倍、QwenPaw（17/50）的近 8 倍，社区基数与问题覆盖面（含 macOS 原生、Mattermost、WhatsApp 等多渠道）均为生态之最。
- **评审管线深度最强**：320 条待合并 PR 中聚集了存储架构重构（#121113 移除写租约）、防失控循环防护（#121063）、Claude 协议文本泄漏修复（#120734）等高价值改动，技术债务消化能力远超同类。
- **安全议题建制化**：API Key 保护（#11829）、记忆投毒防护（#7707）、文件沙箱（#7722）等均形成独立路线图议题，安全讨论深度领先其他项目。

### 技术路线差异
- 采用**多语言网关 + SQLite 事件溯源**架构，存储层正经历"JSONL 文件锁 → SQLite 租约 → 去租约"的三阶段演进，说明其历史包袱与重构复杂度高于 Rust 原生的 Zeroclaw 和 Python 生态的 AstrBot。
- 对 Anthropic/Claude 协议兼容性投入显著（#120734、#92201），显示其目标用户群与 Claude Code 生态深度绑定。

### 社区规模对比
- **Issues/PR 绝对量**约为 hermes-agent 的 1 倍、Zeroclaw 的 10 倍、QwenPaw 的 20 倍。
- **P0/P1 无修复 PR 问题数量**（8 个）居生态之首，说明其社区反馈烈度最高，修复资源缺口也最明显。

### 生态定位结论
OpenClaw 是**事实上的生态基础设施项目**——功能覆盖面最广、社区参与最深、技术路线最复杂，但也因此成为可靠性问题最先暴露和放大的实验场。其"消息可靠性"与"安全边界"两条主线的解决进度，将直接影响整个生态对自托管 AI 助手可信任度的认知。

---

## 4. 共同关注的技术方向

### 4.1 消息可靠性 / 静默失败（全生态最集中痛点）
| 项目 | 具体问题 | 状态 |
|---|---|---|
| OpenClaw | 静默回复失败 #116277/#121058；子代理结果丢失 #44925；工具输出泄漏 #25592 | 部分有 PR，核心问题反复 |
| Zeroclaw | SOP 引擎静默不加载 #9779；stdio MCP 子进程未回收 #8731 | #9779 无 PR，#8731 已修复 |
| hermes-agent | Langfuse 占位符 Key 零报错 #51399；vision fallback 链 TypeError 被吞 #27555；Windows search_files 静默 0 结果 #63177 | 前两者已关，后者仍开 |
| PicoClaw | Matrix /sync 断线静默死亡 #3203 | 被 stale 自动关闭，问题仍在 |
| QwenPaw | 杀软强制关停 #6847；prompts.py 文档与实现不一致 #6853 | 均无 PR |

**共性诉求**：用户普遍认为"无声失败比显式报错更可怕"，要求 agent 具备**失败可观测性**（日志、告警、重试、降级路径），而非进程存活但功能静默停止。

### 4.2 安全边界 fail-closed
| 项目 | 具体诉求 | 状态 |
|---|---|---|
| OpenClaw | API Key 保护 #11829；密钥掩码 #10659；文件沙箱 #7722 | 均卡 `needs-product-decision` |
| Zeroclaw | Webhook 未认证 P0 #9565；WhatsApp 空 allowed_groups 应拒绝全部 #9397；SSRF 门禁 PR #8826/#8713 | 安全 PR 滞留 `needs-author-action` |
| PicoClaw | 多通道附件下载 SSRF 防护 #3322-#3324 | 待合并 |
| hermes-agent | 多租户隔离 #34352（内存操作绕过 hook） | `needs-decision` 73 天 |
| AstrBot | CIDR 白名单 PR #6259（21 天未审）；`_conf_schema.json` 配置泄漏 #9608 | 待审/开放 |

**共性趋势**：安全需求正从"功能附加"升级为**"默认安全"的基础架构要求**，且社区已开始用 RFC 形式推动（Zeroclaw #6971 安全态势 RFC、#9825 区块链地址豁免）。

### 4.3 模型兼容性与 Provider 接入
| 项目 | 具体问题 | 进展 |
|---|---|---|
| OpenClaw | DeepSeek v4 Flash 失败 #116277；Amazon Bedrock 大参数丢弃 #120248；Meta Muse Spark 新增 #120373 | 修复+扩展并行 |
| Zeroclaw | DeepSeek 工具调用信封解析 PR #9723；OpenAI-compatible modalities parser #9743 | 待合并 |
| QwenPaw | Gemini `$schema` 字段报错 #6812；DeepSeek V4 上下文窗口误判（已修复 #6846） | 社区自诊+修复闭环 |
| hermes-agent | OpenRouter `system` 参数 TypeError #60821；Kimi Coding Plan 配额接入 #74424 | 已关闭/待合并 |
| AstrBot | MCP 工具名非法字符导致 400 #9534 | 已修复 |

**共性趋势**：模型目录静态化、上下文窗口硬编码、tool schema 格式差异是跨项目通病，动态模型发现与 Provider 适配层标准化需求日益迫切。

### 4.4 记忆管理与上下文治理
- OpenClaw：多槽记忆 #60572、记忆信任标签 #7707、上下文来源元数据 #54373
- Zeroclaw：知识图谱 per-agent 归属 PR #9745、记忆/上下文窗口配置 RFC #7100
- hermes-agent：GBrain 内存 provider 插件 #46253
- QwenPaw：ReMe4 路线图质询 #6840、Reranker 重排 PR #6398
- AstrBot：定时任务独立上下文 #9393（已关闭）

**共性趋势**：记忆从"单一向量库"走向**"多槽、按来源分级、per-agent 隔离、可审计"**的结构化架构，记忆投毒防护成为安全新焦点。

### 4.5 UI/UX 与交互控制
- OpenClaw：UI 密集难读 #75947（已获维护者响应）；Telegram reaction 触发 #47677；Control UI 按钮 #46656
- hermes-agent：Dashboard 粘贴损坏 #24860；通用 action buttons #15311（10 👍 最高赞）；无障碍 #26689
- QwenPaw：移动端适配 #6281（20+ 天无回应）；审批体验不直观 #6832
- AstrBot：飞书预表情未自动取消 #8003（3 个月+）

**共性趋势**：**跨平台交互控件标准化**（action buttons / inline keyboard）是最高赞的通用需求，移动端适配是最大的沉默需求缺口，无障碍设计开始进入社区视野。

---

## 5. 差异化定位分析

| 项目 | 核心定位 | 目标用户 | 技术架构 | 关键差异 |
|---|---|---|---|---|
| **OpenClaw** | 全栈自主智能体网关 | 技术型个人用户、自托管社群、多平台重度使用者 | 多语言网关 + SQLite 存储（演进中）+ 多渠道适配 | 功能覆盖面最广；对 Claude Code 协议兼容投入深；社区体量为生态之最 |
| **hermes-agent** | 高可靠会话型助手（研究驱动） | 深度技术用户、多租户/多 Profile 部署者、桌面端用户 | Python 为主 + Electron 桌面端 + 事件溯源 | 会话连续性契约强（"一次连续会话永不中断"）；salvage 修复文化；对可观测性要求高 |
| **Zeroclaw** | Rust 原生高性能/安全强化型 agent | 安全敏感部署者、Rust 生态开发者、企业 PoC | Rust + wasmtime + 插件 Webhook 体系 | 安全默认值（fail-closed）意识最强；Rust 内存安全 + WASM 扩展；发布供应链收敛中 |
| **QwenPaw** | 国产模型/微信生态深度集成 | 中文用户、微信/OneBot 渠道重度用户、Qwen 模型用户 | Python/TypeScript（推断） + 多渠道 + 移动端待补 | 中文场景优化最明确（微信审批中文回复、ascend-vllm 接入）；社区协作自驱力强 |
| **PicoClaw** | 嵌入式/轻量级多通道助手 | 轻量部署者、Sipeed 硬件生态用户、Matrix/IRC 用户 | 轻量级架构（推断 Go/Rust）+ 多渠道 | 体量小但安全修复反应快；DeltaChat/Matrix/IRC 等长尾渠道覆盖是特色 |
| **AstrBot** | 中文社区友好的可扩展 Bot 框架 | 中文个人开发者、中小型社群运营者 | Python + 插件化 + MCP 支持 | 插件机制成熟（MCP、定时任务、知识库）；对低配硬件兼容性敏感（无 AVX 崩溃） |

---

## 6. 社区热度与成熟度分层

### 第一梯队：快速迭代期（高热度、高功能增速）
- **OpenClaw**：日流量 500/500，功能扩展与修复并行，处于"规模扩张消化期"——社区产出远超消费能力。
- **hermes-agent**：日流量 500/500，合并效率生态最佳（102 PR/日），处于**密集合并的维护冲刺期**，7 个 session-state PR 同日合入即为明证。

### 第二梯队：质量巩固期（热度中高、方向聚焦）
- **Zeroclaw**：日流量 50/50，但 0 合并。社区产出强、维护者处理弱，处于**流程重构停滞期**——治理 RFC（#6808 Rev 24、#8692）与安全收口并行，但"产出→合并"闭环断裂。
- **PicoClaw**：日流量 3/6，SSRF 加固与功能开发并进，处于**安全收敛+定向功能迭代**阶段，体量小但路线图清晰。

### 第三梯队：响应驱动期（社区反馈驱动、快速闭环）
- **QwenPaw**：日流量 17/50，处于"Issue 密集反馈 → PR 集中修复"的良性循环，但 49 条 PR 积压可能拖慢闭环速度。
- **AstrBot**：日流量 10/5，体量最小但**问题响应-修复闭环最快**（#9605 当天出 PR #9607），适合作为社区运营效率的参照系。

### 成熟度判断
- **最成熟**：OpenClaw（功能广度）与 hermes-agent（工程严谨性）并列，但 OpenClaw 因可靠性反复、hermes-agent 因多租户/存储治理未决，均未完全兑现体量对应的信任度。
- **最有上升潜力**：Zeroclaw（Rust 安全路线）——若能疏通合并管道，其安全默认值路线最贴合行业下一阶段需求。
- **最需要警惕**：所有项目的 **"静默失败"问题**——这是生态公信力的最大长期威胁。

---

## 7. 值得关注的趋势信号

### 信号一：可靠性将成为智能体产品的核心竞争壁垒
多个项目出现"进程存活、功能静默停止"的故障模式（OpenClaw #121058、PicoClaw #3203、Zeroclaw #9779）。用户对"无声失败"的容忍度已接近临界，**内置心跳检测、失败告警、自动重试与降级路径**将成为智能体框架的标配能力。开发者应优先投资可观测性（结构化日志、健康探针、运行时指标），而非单纯堆叠功能。

### 信号二："记忆投毒"从理论攻击变为真实威胁
OpenClaw #7707（记忆信任标签）获得 32 条评论，Zeroclaw #6971（安全态势 RFC）将凭据边界与统一入站策略并列，hermes-agent #34352 指出内存操作绕过 hook 的多租户隔离漏洞——**记忆/上下文的安全边界已成为与代码执行同等重要的攻击面**。按来源（用户/网页/第三方 skill）分级信任、per-agent 记忆隔离、记忆写入审计将成为智能体安全架构的必备模块。

### 信号三：安全默认值（fail-closed）成为社区一致诉求
从 Zeroclaw #9397（空 allowed_groups 拒绝全部）到 PicoClaw SSRF 系列、再到 OpenClaw API Key 掩码，社区正推动**从"默认开放、按需收紧"转向"默认拒绝、显式放行"**。对开发者而言，新项目的安全架构设计应默认遵循最小权限原则，而非事后修补。

### 信号四：模型接入层需要"目录化 + 动态发现"标准化
OpenClaw 模型目录近乎静态（#10687）、QwenPaw 误判 DeepSeek V4 上下文窗口（#6846）、hermes-agent OpenRouter `system` 参数崩溃（#60821）、AstrBot MCP 工具名非法字符（#9534）——四类问题指向同一根源：**模型能力元数据（上下文窗口、tool schema、modalities）缺乏标准化描述**。OpenClaw 静态目录→Zeroclaw RFC #7100（模型级能力配置）→QwenPaw provider 修复的趋势表明，"模型发现 + 能力声明 + 参数转换"的标准化层是下一轮基础设施机会。

### 信号五：多租户/多 Profile 架构是隐藏的架构级需求
hermes-agent #34352（生产验证的多租户方案，挂起 73 天）、Zeroclaw per-agent 知识图谱归属 PR、OpenClaw 记忆投毒防护——**"一个 agent 实例服务多个隔离用户/工作区"**正在从企业功能变为个人用户的真实需求（家庭共享、多项目隔离、工作/生活分离）。当前主流架构（单进程、全局状态）不支撑该需求，率先解决"内存/hook 级隔离"的项目将获得明显的架构领先优势。

### 信号六：贡献者体验与治理效率成为生态竞争力变量
Zeroclaw 的 0 合并与 QwenPaw 的 7 条 first-time PR 待审说明：**社区产出意愿与维护者消费能力的落差正在消耗贡献者热情**。而 hermes-agent 的 salvage 文化（抢救搁置 PR）与 AstrBot 的快速响应（问题当天出修复 PR）则提供了正面参照——自动化 triage、PR 队列可视化管理、周期性"搁置 PR 抢救"机制，应成为成熟项目的治理标配。

### 信号七：Windows 与低配硬件支持不再是边缘需求
Windows 平台问题在多个项目中高频出现（hermes-agent search_files 静默失败、OpenClaw exec/read 空输出、Zeroclaw PowerShell 原生支持 PR、AstrBot 无 AVX 崩溃），表明自托管 AI 助手的用户基础正从 Linux 开发者扩展至更广泛的桌面用户群。**跨平台（尤其 Windows）的路径处理、进程管理、指令集兼容性**值得提前投入，而非事后修补。

---

**总结**：个人 AI 助手开源生态正处于"功能繁荣、可信度待建"的转型期。OpenClaw 以最大体量定义生态边界，hermes-agent 以工程严谨性树立质量基线，Zeroclaw 以 Rust 安全路线探索下一代架构，QwenPaw/AstrBot 深耕中文场景与快速闭环，PicoClaw 覆盖长尾渠道。所有项目共同面对的核心命题是：**在 agent 自主性不断提升的同时，如何让"失败"可预见、可观测、可恢复，并让"安全边界"从附加功能变为架构默认**。这既是挑战，也是下一阶段生态分化的决定性变量。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-10

## 1. 今日速览

过去 24 小时（截至 2026-08-10），Zeroclaw 仓库保持高强度活跃：50 条 Issue 更新（38 条新增/活跃、12 条关闭），50 条 PR 待合并，**无 PR 被合并、无新版本发布**。安全与稳定性议题主导当日讨论，最受关注的是 1 个 P0 级网关 Webhook 未认证漏洞（#9565）以及多条高危 Bug 的关闭收口。值得警惕的信号是：50 条待合并 PR 大量带有 `needs-author-action` 标签，且多条长生命周期治理类 RFC（#6808 已迭代至 Rev 24）仍在排队，说明**维护者评审—合并环节是当前项目最明显的瓶颈**。整体判断：社区产出强劲、安全加固方向明确，但"上游产出→下游合并"的闭环速度滞后。

## 2. 版本发布

过去 24 小时无新版本发布。当前主版本线为 v0.8.x；[#9690](https://github.com/zeroclaw-labs/zeroclaw/issues/9690) 显示 v0.8.4 发布流程已启动（期间发现容器构建 MSRV 问题，该 Issue 已关闭），可关注后续 release 动态。

## 3. 项目进展

**合并情况**：24 小时内 0 个 PR 被合并，这是本期最值得关注的减速信号。项目进展主要体现在 12 条 Issue 关闭，重要收口包括：

- **[#8054 关闭]**：系统提示词工具可用性与各入口点（channels/gateway/WebSocket/multimodal/think）实际工具不一致的问题完成跨端修复，直接 runtime 路径由 #8053 修复，本轮收口其余入口点。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8054)
- **[#8681 关闭]**：Goal Mode 实现拆分栈 Tracker 完成，已接受的 goal-mode 功能被拆分为可评审 PR 逐步合入。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8681)
- **[#8560 关闭]**：`browser_open` 在无显示/无头主机上挂起 agent turn（S1 工作流阻断）已修复，同时覆盖 robot-kit TTS 与 channels ffmpeg 同类问题。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8560)
- **[#9192 关闭]**：`shared_budget` 的 TOCTOU AtomicUsize 回绕与 `SopEngine::finish_run` 在锁内 unwrap panic 两个运行时鲁棒性漏洞已修复。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9192)
- **[#9690 关闭]**：Containerfile StageX 钉住的 rustc 1.95.0 低于声明 MSRV、`all-features` 容器变体不可构建的问题已解决。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9690)
- **[#8731 关闭]**：stdio 型 MCP server 子进程未被正确回收、在活跃 daemon PID 下累积成僵尸进程的问题已修复。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8731)
- **[#9834 关闭]**：zeroclaw-runtime 由进程全局状态（turn_streamed receipts + model_switch）导致的间歇性测试失败已定位修复。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9834)

**方向判断**：闭合项集中在稳定性修复与已知问题清理；新开放项集中在安全加固（#9565 等）与治理流程优化。项目整体处于**安全收敛 + 流程重构**阶段，前向推进主要体现为问题收口而非新功能合并。

## 4. 社区热点

| Issue | 评论数 | 主题 |
|---|---|---|
| [#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) | 21 | RFC: Work Lanes、看板自动化与标签清理（Rev 24） |
| [#7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) | 11 | RFC: 模型级能力与上下文窗口配置 |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 11 | 维护者决策队列 Tracker |
| [#8054](https://github.com/zeroclaw-labs/zeroclaw/issues/8054)（已关闭） | 10 | 系统提示词与工具可用性跨端不一致 |
| [#8681](https://github.com/zeroclaw-labs/zeroclaw/issues/8681)（已关闭） | 10 | Goal Mode 实现拆分栈 Tracker |
| [#6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971) | 10 | RFC: 安全态势、凭据边界与统一入站策略 |
| [#9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397) | 10 | RFC: WhatsApp Web 空 `allowed_groups` 应视为拒绝全部 |

**热点分析**：评论区最活跃的话题呈现两条主线。

其一是**治理与流程**。[#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) 已迭代到 Rev 24，讨论如何借助 Work Lanes 和标签清理减轻维护者负担；[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 则把需要维护者拍板的 RFC/设计问题显式队列化。二者共同说明**维护者带宽不足是社区感知最强烈的痛点**，社区正试图用流程工具对冲。

其二是**安全默认值收紧**。[#9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397) 提出将 WhatsApp Web 的 `allowed_groups` 空列表语义从"允许全部"改为"拒绝全部"，与 [#9565](https://github.com/zeroclaw-labs/zeroclaw/issues/9565)（Webhook 不认证）、[#9825](https://github.com/zeroclaw-labs/zeroclaw/issues/9825)（链上地址误杀）共同构成对"安全边界 fail-closed"的集中诉求。

## 5. Bug 与稳定性

### 🔴 P0（S0 数据丢失/安全风险）
- **[#9565]**（in-progress）：gateway 的 WhatsApp Cloud / Linq / WATI 三个 Webhook handler 未认证调用方即向 agent 分发攻击者可控消息。已有对应加固 PR **[#9744](https://github.com/zeroclaw-labs/zeroclaw/pull/9744)**（要求认证后入站再分发），但该 PR 当前带 `needs-author-action`，尚未合并。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9565)

### 🟠 P1（高危，开放）
- **[#9328]**：verifiable-intent 的 `evaluate_constraints` 未验证凭据链即评估 L2 约束，存在验证绕过风险。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9328)
- **[#8519]**：wasmtime-wasi CVE 缓解与 cargo-audit/deny 忽略列表漂移未闭环（`cargo audit` 读 Cargo.lock、`cargo deny` 解析依赖图，适用范围不一致）。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8519)
- **[#8642]**：MCP/tool-schema 克隆导致 agent 循环中 RSS 无界增长（自 #5542 拆分的独立根因）。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8642)
- **[#9085]**：启用 pgvector 时 `PostgresMemory` 在 Tokio runtime 上下文中构造即 panic，阻断 gateway/agent 启动（S1）。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9085)
- **[#9284]**：`RpcDispatcher::flush_config` 的三步 flush（读锁 clone → await save → 写锁更新）可覆盖并发写入（S2）。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9284)
- **[#9779]**：`[sop] sops_dir` 文档声明的默认值不被守护进程采用，SOP 引擎静默不加载、无任何日志。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9779)
- **[#9198]**：Dashboard 重载 daemon 后 Discord typing 指示器永久卡死（S3，但影响面广）。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9198)

### 🟡 P2（中危，开放）
- **[#9486]**：高熵检测器将 Solana 钱包地址一律替换为 `[REDACTED_HIGH_ENTROPY_TOKEN]`，且 `high_entropy_tokens=false` 在 channel 路径不生效——agent 配 Solana MCP 后无法在 Telegram 中输出钱包地址。关联 RFC **[#9825](https://github.com/zeroclaw-labs/zeroclaw/issues/9825)**（公开区块链标识符豁免）。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9486)
- **[#7130]**：恢复 workspace 级 `#![forbid(unsafe_code)]`，仅保留 aardvark-sys 作为唯一 unsafe 例外。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/7130)

### ✅ 已关闭（24h 内）
#8054、#8560、#9192、#9690、#9656、#8731、#9834、#9860（同日创建并关闭，标记 duplicate）、#8681

## 6. 功能请求与路线图信号

- **模型能力元数据（下一版本明确功能对）**：[#7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) RFC 提出 per-model 的 vision / context_window 配置，用于能力检查、上下文预算与 UI 展示；PR **[#9743](https://github.com/zeroclaw-labs/zeroclaw/pull/9743)** 已落地 OpenAI-compatible provider 的 modalities parser 接线，修复 `supports_image_input()` 无生产调用方的问题。两者形成完整闭环。
- **DeepSeek 工具调用兼容**：PR **[#9723](https://github.com/zeroclaw-labs/zeroclaw/pull/9723)** 解析 DeepSeek DSML 与 `<|tool_call|>` 信封，避免原始信封文本直接暴露给用户。
- **Windows 原生 PowerShell**：PR **[#9182](https://github.com/zeroclaw-labs/zeroclaw/pull/9182)** 在 Windows 上通过 `-NoProfile -NonInteractive -Command` 路由 `powershell`/`pwsh`，保留 cmd.exe 默认路径。
- **Matrix 体验增强**：PR **[#9871](https://github.com/zeroclaw-labs/zeroclaw/pull/9871)** 支持按 server name 或 URL 解析 homeserver；PR **[#8443](https://github.com/zeroclaw-labs/zeroclaw/pull/8443)** 实现 `single_message` 进度草稿编辑模式。
- **插件 Webhook 入站**：PR **[#8862](https://github.com/zeroclaw-labs/zeroclaw/pull/8862)** 引入 channel-plugin `webhook-ingress` 能力与 WASM parser，是平台化扩展方向的重要信号。
- **发布供应链收敛**：[#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101)（已 accepted）计划将三套并行的签名/溯源机制（cosign、GitHub artifact attestations、slsa-github-generator）收敛为一套，发布资产从 53 个降到约 20 个。
- **治理流程改革**：[#9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496)（精简 RFC 讨论/投票/指派流程）与 [#9530](https://github.com/zeroclaw-labs/zeroclaw/issues/9530)（高风险路径中测试变更的风险优先级）若通过，将直接影响后续贡献节奏。

## 7. 用户反馈摘要

- **真实场景误伤（#9486）**：俄语用户为 agent 配置 Solana MCP，agent 无法在 Telegram 中说出钱包地址，每条消息都被替换为 `[REDACTED_HIGH_ENTROPY_TOKEN]`。用户的核心诉求是"公开区块链地址不应被当作秘密打码"，社区已给出 #9825 RFC 作为解决方向。
- **静默失败（#9779）**：运维者完全按文档依赖 `sops_dir` 默认值，结果 SOP 引擎从未加载且无错误、无警告、无日志。"文档说的默认值不生效"是配置类反馈中痛点最强烈的一类。
- **进程卡死（#8560 已关闭）**：无显示/无头主机上 `browser_open` 失败后整个 agent turn 无限挂起，只能手动取消，属于 S1 工作流阻断。
- **UI 状态误导（#9656 / #9198）**：审批等待期间 Telegram 持续发送 typing 动作，让"被阻塞的 turn"看起来像"正在工作"；Dashboard 重载后 Discord 指示器则永久卡死。用户对 agent 真实运行状态的可观测性有明确需求。
- **流程疲劳（#9496）**：多位维护者在评论中表示 RFC 流程"比它要支持的决策还慢"——七天最低讨论期、广泛一致要求、手动计票共同拖慢节奏，简化流程的呼声很高。

## 8. 待处理积压

**最关键信号：50 条 PR 全部待合并，24 小时合并数为 0。** 其中多条为安全关键 PR 且带 `needs-author-action`（等待作者更新），建议维护者优先推动：

| PR | 内容 | 阻塞原因 |
|---|---|---|
| [#8826](https://github.com/zeroclaw-labs/zeroclaw/pull/8826) | image_gen 下载 URL 加 SSRF 门禁 | risk:high，XL，needs-author-action |
| [#8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713) | file_download 增加 allowed_private_hosts SSRF opt-in | risk:high，XL，needs-author-action |
| [#9744](https://github.com/zeroclaw-labs/zeroclaw/pull/9744) | Webhook 入站要求认证后再分发 agent | 对应 P0 #9565，XL，needs-author-action |
| [#9745](https://github.com/zeroclaw-labs/zeroclaw/pull/9745) | 知识图谱 per-agent 归属与作用域 | domain:security，XL，needs-author-action |
| [#9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746) | session 工具与 discord_search per-agent 所有权 | risk:high，XL |
| [#9720](https://github.com/zeroclaw-labs/zeroclaw/pull/9720) | 强制 response cache 请求边界 | risk:high，XL，needs-author-action |
| [#8862](https://github.com/zeroclaw-labs/zeroclaw/pull/8862) | 插件 Webhook 入站队列 | stacked，XL，needs-author-action |
| [#9182](https://github.com/zeroclaw-labs/zeroclaw/pull/9182) | Windows PowerShell 原生支持 | risk:high，XL，needs-author-action |

**长期未闭合 Issue（> 1 个月）**：
- [#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)（05-20 开启，治理 RFC，已 Rev 24）
- [#6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971)（05-27 开启，安全态势 RFC）
- [#7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100)（06-02 开启，模型能力配置 RFC）
- [#7897](https://github.com/zeroclaw-labs/zeroclaw/issues/7897)（06-17 开启，配置热更新 RFC）
- [#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519)（06-30 开启，wasmtime-wasi CVE）

**结构性问题**：`needs-maintainer-review` 与 `needs-author-action` 两个标签在今日数据中出现频率极高，配合 #8692 决策队列 Tracker，说明项目当前真实瓶颈不在社区产出端，而在**评审—返工—合并的闭环速度**。若该瓶颈持续，可能进一步放大 RFC 积压（#6808 已迭代 24 版仍未定稿）与安全修复的暴露窗口（如 P0 #9565 的对应 PR #9744 仍在等待作者动作）。**项目健康度总体良好，但合并管道需尽快疏通。**

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 (2026-08-10)

## 1. 今日速览

过去 24 小时 PicoClaw 整体活跃度 **中等偏高**，核心信号集中在 **PR 侧**：共 6 条 PR 更新，其中 5 条处于待合并状态，且其中 3 条组成了针对 SSRF 安全加固的系列修复（#3322/#3323/#3324），涉及 QQ、Telegram、Discord、LINE、Slack、WeCom、Weixin 等多个通道。功能开发端，Telegram 原生表格渲染需求在同一天完成从 Issue（#3325）到 PR（#3327）的快速转化，社区响应积极。合并侧今天仅有一条小型构建修复（#3326），无新版本发布。Issues 侧有 1 条陈旧 Bug 被自动关闭（#3203），2 条新功能请求保持开放。整体来看项目处于安全加固与功能迭代并行、审核积压略高的状态。

---

## 2. 版本发布

今日无新版本 Release。

---

## 3. 项目进展

今日仅合并 1 条 PR，属构建层小修复：

- **[已合并] fix(web): remove duplicate pnpm lock entries** ([#3326](https://github.com/sipeed/picoclaw/pull/3326)) — 移除了 `web/frontend/pnpm-lock.yaml` 中两条重复的 `semver@7.8.5` 映射，解决了 `pnpm install --frozen-lockfile` 因 `ERR_PNPM_BROKEN_LOCKFILE` 失败的问题。该修复对 Web 前端的 CI/CD 链路有直接的稳定性价值。

**待合并但意义重要的 PR 共 5 条**（尚未合入主干，但对路线图方向有指示意义）：

- **SSRF 安全加固系列**（3 条关联 PR）：`fix(channels)` ([#3322](https://github.com/sipeed/picoclaw/pull/3322)) 为 QQ、Telegram、Discord、LINE、Slack 等通道的入站附件下载增加 `BlockPrivateTargets` 防护；`fix(wecom)` ([#3323](https://github.com/sipeed/picoclaw/pull/3323)) 与 `fix(weixin)` ([#3324](https://github.com/sipeed/picoclaw/pull/3324)) 分别为企业微信和微信的媒体下载改用 `CreateSafeHTTPClient`。三者共同补上了 PicoClaw 媒体下载链路中针对环回地址、内网地址与重定向的 SSRF 防护缺口。
- **feat(telegram): render tables with native rich messages** ([#3327](https://github.com/sipeed/picoclaw/pull/3327)) — 支持 GFM 表格与 HTML 表格在 Telegram 中以原生富消息呈现，替代目前的等宽代码块降级。
- **refactor(deltachat): cleanup implementation, documentation -200LOC** ([#3222](https://github.com/sipeed/picoclaw/pull/3222)) — 移除遗留特性与过期测试、更新官方 relay 列表、强制改用 jsonrpc 管理 secrets、将 `invite_link` 拆分/重命名为 `join_invite_link` 与 `show_invite_link`，属于 DeltaChat 通道的接口规范化与代码精简。

---

## 4. 社区热点

**[#3203: Matrix sync loop has no reconnection logic](https://github.com/sipeed/picoclaw/issues/3203)**（8 条评论，2 👍，今日关闭）

- 这是过去 24 小时**评论数最多**的 Issue，但状态为 `[stale]` 自动关闭，关闭前最后一次更新就在今天。核心痛点是 Matrix `/sync` 长轮询在断网或 homeserver 重启后静默死亡：主进程仍存活，systemd 的 `Restart=on-failure` 永远不触发，机器人彻底离线且无任何告警。该问题的讨论热度侧面反映 **Matrix 通道用户对连接健壮性的强需求**，且 2 个 👍 说明至少有一部分人遇到了同类故障。建议维护者重新评估该 Issue 是否应被恢复而非 stale 关闭。

**[#3287: Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287)**（4 条评论，开放中）

- 用户关心的场景是 IRCv3 下长消息分割后的语义完整性：IRC 默认 512 字节限制导致长文本被 IRC 客户端自动拆行，PicoClaw 目前将拆分后的片段理解为多条消息。社区讨论围绕是否应通过 IRCv3 扩展或启发式拼接来把分片还原为单条完整消息。

**[#3325: Render Telegram tables with rich messages](https://github.com/sipeed/picoclaw/issues/3325)**（新开，0 评论，当天即收到 PR）

- 严格说今日评论数为 0，但它是**响应速度最快的需求**：Issue 创建于 8 月 9 日，当天即被实现为 #3327 PR。说明 Telegram 表格渲染这一需求与维护者近期规划方向高度一致，社区与开发之间形成了很好的即时反馈闭环。

---

## 5. Bug 与稳定性

按严重度排序：

**高 — 远程图片/媒体下载 SSRF 风险（已修复，待合并）**

- 影响范围：QQ、Telegram、Discord、LINE、Slack（[#3322](https://github.com/sipeed/picoclaw/pull/3322)）、WeCom（[#3323](https://github.com/sipeed/picoclaw/pull/3323)）、Weixin（[#3324](https://github.com/sipeed/picoclaw/pull/3324)）。攻击者可通过构造媒体 URL 诱导服务端请求内网地址（环回、link-local、RFC1918）。三个 PR 已提交针对性修复，**尚待维护者合入**。

**中 — Matrix 同步循环断线后无自动重连（Issue 被 stale 关闭，问题仍真实存在）**

- [#3203](https://github.com/sipeed/picoclaw/issues/3203) 描述了一个实际存在的可靠性缺陷：网络抖动或 homeserver 重启后 `/sync` 永久退出且无重连逻辑，systemd 因主进程存活而无法自动拉起。虽然已被自动标记关闭，但该问题有可能影响大量 Matrix 部署的稳定性。

**低 — pnpm lockfile 重复键值（已修复）**

- [#3326](https://github.com/sipeed/picoclaw/pull/3326) 修复了 `web/frontend/pnpm-lock.yaml` 中重复的 `semver@7.8.5` 映射键，影响 frozen-lockfile 安装流程，已合入。

---

## 6. 功能请求与路线图信号

| 需求 | 状态 | 路线图判断 |
|------|------|-----------|
| **Telegram 原生表格渲染**（[#3325](https://github.com/sipeed/picoclaw/issues/3325)） | 已有对应实现 PR（[#3327](https://github.com/sipeed/picoclaw/pull/3327)） | **极有可能进入下个版本**。PR 在 Issue 提出当天即提交，且引用了 Telegram Bot API 10.1 的新能力，说明维护者对该功能的开发已在进行中。 |
| **IRC 长消息完整支持**（[#3287](https://github.com/sipeed/picoclaw/issues/3287)） | 开放中，无对应 PR | 暂未进入明确开发计划。但 IRCv3 下长消息拆分是真实痛点，如果社区继续表达需求，可能作为 IRC 通道体验优化的下一候选。 |
| **SSRF 加固**（[#3322](https://github.com/sipeed/picoclaw/pull/3322) / [#3323](https://github.com/sipeed/picoclaw/pull/3323) / [#3324](https://github.com/sipeed/picoclaw/pull/3324)） | 已提交，待合并 | 系列 PR 显示安全加固是当前明确的路线图环节。建议发布时间中优先安排。 |
| **DeltaChat 通道接口规范化**（[#3222](https://github.com/sipeed/picoclaw/pull/3222)） | 待合并 | 长时间未获审核，但重构方向合理（-200LOC、引官方文档、移除明文密码配置），符合项目长期健康度目标。 |

---

## 7. 用户反馈摘要

- **Matrix 用户（运营视角）**：对断线后的“静默死亡”非常不满。核心痛点是进程虽然存活，但所有同步已停止，且 systemd 无法感知。用户期待的是内置自动重连与可观测的存活状态（[#3203](https://github.com/sipeed/picoclaw/issues/3203)）。
- **IRC 用户（协议语义视角）**：指出 IRC 512 字节限制是协议固有约束，但希望 PicoClaw 不要把分片消息机械地当作独立消息处理，期待预拼接/聚合逻辑，以保留长文本原有的结构（[#3287](https://github.com/sipeed/picoclaw/issues/3287)）。
- **Telegram 用户（展示体验视角）**：现有 `sendMessage` 路径把 Markdown 表格降级为纯文本或代码块，在机器人展示结构化数据（如行情、报表）时观感不佳，期望依托 Bot API 原生能力改善渲染（[#3325](https://github.com/sipeed/picoclaw/issues/3325)）。
- **安全关注（贡献者视角）**：多个通道的附件下载未做 SSRF 防护，说明用户对自建部署场景下的安全边界越来越在意（#3322/#3323/#3324 系列），这是一项积极的社区信号。

---

## 8. 待处理积压

- **[PR #3222] refactor(deltachat)**: 由 @trufae 于 2026-07-03 创建，已开放超过一个月。这是一个 -200LOC 的清理/重构，包含功能裁剪与接口重命名等 **破坏性变更**，建议维护者尽快安排审阅，避免长期分叉累积冲突。[链接](https://github.com/sipeed/picoclaw/pull/3222)

- **[Issue #3203] Matrix sync 断线无重连**: 被标记 `[stale]` 后自动关闭，但问题本身并未消失。如果项目短期没有对 Matrix 通道进行连接管理重构的计划，至少应在文档中说明已知限制或引导用户使用外部守护工具（如 systemd watchdog）。[链接](https://github.com/sipeed/picoclaw/issues/3203)

- **[Issue #3287] IRC 长消息支持**: 开放近三周，已有 4 条评论，但无维护者回复或路线图标记。建议至少给出一个阶段性的回应，明确是否计划支持、优先级如何，避免社区热度降温。[链接](https://github.com/sipeed/picoclaw/issues/3287)

---

**整体项目健康度评估**：开发推动力较强，安全修复与功能开发齐头并进；社区贡献者活跃且有质量。主要风险在于 PR 审核速度跟不上提交速度（特别是 #3222 已积压一个月以上），以及个别 Issues 因 stale 自动关闭后真实问题得不到闭环处理。建议维护者优先合并安全修复系列（#3322/#3323/#3324），并明确 IRC 长消息需求的技术路线。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目日报 — 2026-08-10

> 数据窗口：2026-08-09 ~ 2026-08-10 | 数据源：GitHub Issues / PR / Releases

---

## 1. 今日速览

过去 24 小时 QwenPaw 社区活跃度较高：**17 条 Issue 更新**（新开/活跃 11 条、关闭 6 条）与 **50 条 PR 更新**（待合并 49 条、闭环 1 条）表明提交节奏和讨论热度均处于健康水平。今日无新版本发布，但出现多个高质量社区提交：一批针对已报告 Bug 的修复 PR 已进入审查队列（如 #6844、#6845），同时有 **7 条 first-time-contributor PR** 涌入，显示外部贡献者参与意愿强烈。需关注的是，待合并 PR 积压至 49 条，维护者审查带宽可能成为近期瓶颈；此外同一渲染缺陷被同一用户重复提交 4 次（#6848~#6851），社区提交流程引导尚有优化空间。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

### 今日闭环 PR（1 条）

- **[#6846] feat(providers): catalog DeepSeek V4 context windows (1M)**（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6846)，作者 @uaixo，first-time-contributor）
  为 DeepSeek V4（deepseek-v4-flash / deepseek-v4-pro）补充了静态上下文窗口目录，修正此前模型被误判为 131,072 token 默认窗口、导致在 128k 处提前触发上下文压缩的问题。这是一个低成本高收益的准确性修复，直接提升了 DeepSeek V4 用户的实际体验。

### 待合并队列中的关键推进（重点观察）

虽然今日仅 1 条 PR 完成闭环，但待合并队列中有多项针对已确认 Bug 的直接修复，预示着下一批合并将带来明显稳定性提升：

- **#6845** fix(chats): preserve assistant completion time → 直接修复 #6826 时间显示异常（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6845)）
- **#6844** fix(providers): strip unsupported Gemini schema metadata → 直接修复 #6812 Google API 调用失败（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6844)）
- **#6854** feat: add localized approval purpose descriptions → 满足 #6832 审批可读性需求（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6854)）
- **#6804** feat(wechat): accept Chinese approval replies → 修复 #6728，支持微信渠道中文审批回复（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6804)）
- **#6818** fix(summary): honor disable_thinking and interruption → 修复 continuation summary 推理设置失效问题（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6818)）

整体判断：项目正处于 **"Issue 密集反馈 → PR 集中修复"** 的良性循环阶段，核心稳定性与渠道能力（微信/OneBot/移动端）在同步演进。

---

## 4. 社区热点

| 排名 | Issue/PR | 评论数 | 热度分析 |
|------|----------|--------|----------|
| 1 | [#2291] Help Wanted: Open Tasks — Come Contribute!（[链接](https://github.com/agentscope-ai/QwenPaw/issues/2291)） | 66 | 长期置顶的社区任务清单（P0~P2），持续吸引贡献者认领，也是多个 first-time-contributor PR 的来源入口；昨日仍有新评论，属于社区协作的"总枢纽" |
| 2 | [#6281] 希望 Web 控制台适配移动端（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6281)） | 5 | 自 7 月 20 日创建以来持续获得关注。用户明确表达在移动端操作 QwenPaw 的诉求，至今无官方回应或 PR，耐心可能正在消耗 |
| 3 | [#6826] 对话中助手消息结束时间显示异常（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6826)） | 4 | 用户实测助手思考 2 分钟但界面显示仅几秒，属于高复现性体验 Bug；已有 PR #6845 提交修复，响应迅速 |
| 4 | [#5584] 无法连接自定义 ascend-vllm 模型（[链接](https://github.com/agentscope-ai/QwenPaw/issues/5584)） | 4 | 1.1.7 可连、后续版本不可连的回归问题，已关闭但未明确给出解决方案，相关用户可能仍受影响 |
| 5 | [#6812] Model 'unknown' execution failed in Google API（[链接](https://github.com/agentscope-ai/QwenPaw/issues/6812)） | 3 | 根本原因已被社区开发者定位（Gemini provider 发送了 `$schema` 字段），且修复 PR #6844 已提交，是社区协作解决问题的典型案例 |

**热点背后的诉求**：① 移动端适配呼声渐高，是当前最突出的"沉默需求"；② 用户对消息时间线准确性敏感，间接影响对 AI 响应速率的信任；③ 社区已形成"用户报障 → 深度诊断 → 贡献 PR"的自助协作链，项目生态正在自我强化。

---

## 5. Bug 与稳定性

按严重程度降序排列：

### 高严重度

- **杀软拦截/强制关停 QwenPaw 进程** — [#6847](https://github.com/agentscope-ai/QwenPaw/issues/6847)（OPEN，8/09 创建）
  QwenPaw 执行任务时被杀软拦截甚至强制关停进程，用户对比称 WorkBuddy 无此问题。可能涉及行为特征（如自动化脚本模式）被安全软件误判，若属实则影响面较大。**暂无对应修复 PR**，需维护者排查并考虑提供白名单/签名规避方案。

- **Google Gemini API 调用失败（unknown model）** — [#6812](https://github.com/agentscope-ai/QwenPaw/issues/6812)（OPEN）
  根因已定位：Gemini provider 发出的 tool schema 含 `$schema` 字段，Google SDK 拒绝额外字段。**已有 fix PR #6844**（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6844)）等待合并。

### 中严重度

- **MCP 工具调用参数类型错误（数字字符串被转为数字）** — [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839)（OPEN）
  MCP 工具参数中形如 `"0"`、`"1"` 的字符串被以 int 类型传参，导致 API 调用失败。涉及类型转换逻辑缺陷，**暂无修复 PR**。

- **前端渲染器折叠长多行工具输出** — [#6852](https://github.com/agentscope-ai/QwenPaw/issues/6852)（OPEN）+ [#6848](https://github.com/agentscope-ai/QwenPaw/issues/6848)、[#6849](https://github.com/agentscope-ai/QwenPaw/issues/6849)、[#6850](https://github.com/agentscope-ai/QwenPaw/issues/6850)、[#6851](https://github.com/agentscope-ai/QwenPaw/issues/6851)（已关闭，均为同一用户重复提交）
  工具输出大量多行文本时被压成不可读块。同一问题被重复提交 4 次，说明用户受阻明显；其中 4 条已被关闭、以 #6852 为唯一保留项。**暂无修复 PR**。

### 低严重度 / 体验类

- **助手消息结束时间显示异常** — [#6826](https://github.com/agentscope-ai/QwenPaw/issues/6826)（OPEN）→ **已有修复 PR #6845**
- **Auto-Dream 单单元失败导致整个任务标记为 error** — [#6841](https://github.com/agentscope-ai/QwenPaw/issues/6841)（OPEN）
  Dream 集成中一个单元 schema 校验失败即让整个任务报错，而实际大部分逻辑已成功。建议增加重试与容错。**暂无修复 PR**。
- **prompts.py 文档与实现不一致** — [#6853](https://github.com/agentscope-ai/QwenPaw/issues/6853)（OPEN）
  Dream 流程提示词声称会自动将 digest 同步到 MEMORY.md，实际从未实现，可能误导 Agent 行为。属于提示工程与代码一致性维护问题。**暂无修复 PR**。

---

## 6. 功能请求与路线图信号

| 功能请求 | Issue/PR | 信号强度 |
|----------|----------|----------|
| **AI 审批附带用途描述** — 用户在审批卡片上只看代码难判断，要求 AI 用一句话说明用途 | [#6832](https://github.com/agentscope-ai/QwenPaw/issues/6832)（OPEN，8/08） | ★★★ 已有对应 PR #6854，基本确定进入下一版本 |
| **Web 控制台移动端适配** — 在手机上操作控制台 | [#6281](https://github.com/agentscope-ai/QwenPaw/issues/6281)（OPEN，7/20） | ★★☆ 一周内评论持续增加，但无官方响应/PR，需维护者表态 |
| **子代理增强** — 自动切换模型 + 共享 workspace 目录 + 修复 web 端配置读取混乱 | [#6838](https://github.com/agentscope-ai/QwenPaw/issues/6838)（OPEN，8/09） | ★★☆ 涉及子代理机制的核心体验，需产品决策 |
| **ReMe4 完整路线图时间线** — 用户对照 2.1.0b2 的 ReMe Light 实现，询问 Auto-Link、三模态检索、四分类摘要权重等计划 | [#6840](https://github.com/agentscope-ai/QwenPaw/issues/6840)（OPEN，8/09） | ★★☆ 内存系统重度用户关注演进方向，建议官方明确 roadmap |
| **会话 Fork（快照复制到新会话）** | PR #6704（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6704)） | ★★★ 功能已完成并有 ready-for-human-review 标记 |
| **隐藏 Agent（UI 隐藏但可调用）** | PR #6842（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6842)） | ★★☆ 插件开发场景需求，first-time-contributor 提交 |
| **ReMe 检索接入 Reranker 重排** | PR #6398（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6398)） | ★★☆ Under Review，提升记忆检索质量 |
| **OneBot 远程媒体处理**（HTTP URL 语音/图片） | PR #6715（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6715)） | ★★☆ Under Review，完善 OneBot 渠道兼容性 |
| **可配置主题/皮肤模块** | PR #6312（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6312)，draft） | ★☆☆ 来自 #2291 任务清单 Task 1 的草稿，方向待维护者确认 |

**路线图判断**：审批描述（#6832）、Gemini 修复、SSE 实时流式输出（#6843）已具备明确的 PR 支撑，大概率进入下一小版本；会话 Fork 功能代码完成度高，随时可合入。移动端适配是最大未响应的需求缺口。

---

## 7. 用户反馈摘要

**满意之处 / 正向信号**

- 社区协作效率得到验证：#6812 的根因由非维护者社区成员完成诊断，并快速产出修复 PR #6844，显示用户对项目的参与深度与技术信任度较高。
- 多个 first-time-contributor 来自 #2291 任务清单，说明"Help Wanted"运营模式有效，新手友好的 Issue 标注正在持续转化贡献者。

**核心痛点 / 不满意之处**

- 审批体验不直观（#6832）：用户表示查看 PowerShell 代码才明白 AI 想干什么，"非常不直观"，希望"只看一眼描述就能判断是否通过"。这直接影响用户对 AI 自主操作的信任感。
- 杀软误拦截（#6847）："Qwenpaw 会被杀软打死"，且对比同类产品更频繁，用户安全感受损，可能阻碍企业场景落地。
- MCP 类型转换 bug（#6839）：数字字符串被强转数字，"总是将像数字的字符串以数字格式传参"，导致工具调用失败，直接影响 MCP 生态体验。
- 自定义模型连接回归（#5584）："1.1.7 的版本还可以连接，后来的版本均无法连接"，模型配置界面测试通过但对话报错，回归问题未获公开解释。
- 移动端缺失（#6281）："Web 控制台适配移动端方便在移动端操作"，诉求简单直接，但已等待近三周无回应。

---

## 8. 待处理积压

需维护者重点关注：

1. **长期未响应的移动端适配请求** — [#6281](https://github.com/agentscope-ai/QwenPaw/issues/6281)（7/20 创建，已 20+ 天）
   5 条评论、持续获得关注，官方至今无任何回应。建议至少给出明确规划或阶段性回复。

2. **CIDR 白名单支持 PR 等待审查** — [#6259](https://github.com/agentscope-ai/QwenPaw/pull/6259)（7/19 提交，已 21 天）
   first-time-contributor 为 `allow_no_auth_hosts` 增加 CIDR 支持，属于安全配置的实用增强。长时间未审查可能打击新贡献者积极性。

3. **可配置主题/皮肤模块草案等待方向确认** — [#6312](https://github.com/agentscope-ai/QwenPaw/pull/6312)（7/21 提交，draft）
   来自 #2291 官方任务清单的草稿 PR，维护者若长期不回应将阻塞任务推进。

4. **社区任务枢纽 #2291 的状态公示** — [#2291](https://github.com/agentscope-ai/QwenPaw/issues/2291)（66 条评论）
   已关闭但仍是社区认领任务的唯一入口。建议保持开放或在新入口就绪前不要关闭，避免贡献路径中断。

5. **PR 审查积压** — 约 49 条 PR 待合并
   其中 7 条 first-time-contributor PR 等待初审。建议增加 triage 轮次或通过 GitHub bot 自动化初步检查，降低新贡献者的等待摩擦。

---

*本日报由开源项目分析师 AI 助手自动生成，所有数据均来自公开 GitHub 仓库。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报 — 2026-08-10

> 数据来源：NousResearch/hermes-agent GitHub 仓库 | 统计窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时项目处于**高强度维护与合并周期**：共 500 条 Issue 更新（新开/活跃 294 条，关闭 206 条），500 条 PR 更新（待合并 398 条，已合并/关闭 102 条），无新版本发布。今日主线是 **gateway 会话状态管理（session-state）修复**——7 个相关 PR 被合并/关闭，其中维护者 @teknium1 以 "salvage"（抢救）模式重新捡起并合并了 3 个此前搁置的 PR，显著改善了会话恢复、重置边界和分支路由的可靠性。与此同时，桌面端出现一个 P1 启动崩溃（#82696）并已有修复 PR 待合入，需要重点关注。整体判断：项目**活跃度极高、合并效率好**，但会话状态与消息投递领域仍有多处隐患需要持续消化。

---

## 2. 版本发布

**无新版本发布**（最新 Releases 为空），项目处于功能迭代与修复合并的间歇期。

---

## 3. 项目进展

今日共有 **102 个 PR 合并/关闭**，最集中的成果是 **gateway 会话状态管理**，7 个相关 PR 完成合并：

| PR | 内容 | 状态 |
|---|---|---|
| [#82743](https://github.com/NousResearch/hermes-agent/pull/82743) | 会话恢复尊重 `/new` 重置边界与真实空闲时间（salvage #68617 + #78618） | ✅ 已合并 |
| [#82744](https://github.com/NousResearch/hermes-agent/pull/82744) | 缓存会话历史区分持久化行，修复 #71999 的 "Persisted transcript lagged" 误报（salvage #77895） | ✅ 已合并 |
| [#82742](https://github.com/NousResearch/hermes-agent/pull/82742) | `/branch` 子会话在创建时即携带完整路由身份，避免崩溃后分支行不可路由（salvage #62278） | ✅ 已合并 |
| [#78618](https://github.com/NousResearch/hermes-agent/pull/78618) | 会话恢复时正确执行 `session_reset` 策略（idle/daily） | ✅ 已合并 |
| [#68617](https://github.com/NousResearch/hermes-agent/pull/68617) | 修复 #68539：恢复期间跨越重置边界导致陈旧上下文复活 | ✅ 已合并 |
| [#77895](https://github.com/NousResearch/hermes-agent/pull/77895) | 优化缓存会话选择逻辑，仅保留真正未持久化的非临时行 | ✅ 已合并 |
| [#62278](https://github.com/NousResearch/hermes-agent/pull/62278) | 压缩轮转与 `/branch` 子会话创建时携带 `chat_id`/`thread_id`/`session_key` | ✅ 已合并 |

**意义**：这批合并集中解决了 5 个会话连续性缺陷——重置策略失效、恢复时陈旧上下文复活、分支行不可路由、缓存历史误判、持久化标记丢失，是 gateway 稳定性的一次系统性补强。结合今日关闭的 [#82616](https://github.com/NousResearch/hermes-agent/issues/82616)（state.db FTS 损坏导致会话分叉）与 [#12857](https://github.com/NousResearch/hermes-agent/issues/12857)（自动重置丢弃上下文），项目在**"一次连续会话永不中断"**这一核心契约上迈出了实质性一步。

此外，[#82748](https://github.com/NousResearch/hermes-agent/pull/82748)（桌面端 react-router 分包导致 P0 启动崩溃，修复 #82696）与 [#82758](https://github.com/NousResearch/hermes-agent/pull/82758)（kanban worker 日志写入时脱敏，salvage #64011）等修复 PR 正在待合并队列中。

---

## 4. 社区热点

今日讨论最活跃的议题（按评论数排序）：

**#38240 — Skills index 陈旧/退化（27 评论，已关闭）**
[链接](https://github.com/NousResearch/hermes-agent/issues/38240)
自动化探针检测到 Skills Hub 索引陈旧（github: 0 < 30），由 `skills-index.yml` 定时重建失败所致。属于自动化运维告警，已由 sweeper 在 main 上实现修复后关闭。

**#34352 — 多租户 Hermes 问题（18 评论，2 👍，需决策）**
[链接](https://github.com/NousResearch/hermes-agent/issues/34352)
社区用户 @NimbleCoAI 指出内存操作完全绕过 hook 系统，导致**多租户隔离在不 fork 核心代码的情况下不可能实现**。作者声称已生产运行数月、覆盖多个多租户场景。这是社区对 Hermes 架构级能力（multi-agent/multi-tenant）的明确诉求，当前标记 `needs-decision`，已挂起两个多月，是社区最关心的方向性问题之一。

**#15311 — 消息平台通用 action buttons / inline keyboard（16 评论，10 👍，最高赞）**
[链接](https://github.com/NousResearch/hermes-agent/issues/15311)
用户希望有通用的交互式按钮/内联键盘机制（尤其 Telegram），而不必为单个功能硬编码。10 个 👍 表明这是跨平台体验的强需求。

**#24860 — Dashboard Chat 粘贴损坏（15 评论，8 👍）**
[链接](https://github.com/NousResearch/hermes-agent/issues/24860)
Ctrl+V 无法粘贴文本且不支持图片粘贴，TUI 后端误读剪贴板。8 个 👍 反映该问题影响面广，是 Dashboard 用户体验的关键短板。

**#60821 — OpenRouter TypeError: `system` 参数（14 评论，已关闭）**
[链接](https://github.com/NousResearch/hermes-agent/issues/60821)
OpenAI 兼容第三方端点（OpenRouter/SiliconFlow）间歇性崩溃，因 `_build_kwargs_from_profile` 在 chat_completions.py 中向 legacy `Completions.create()` 传入了 `system` 参数。第三方 provider 兼容性问题持续是社区痛点。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 P1（严重）

| Issue | 描述 | 状态 |
|---|---|---|
| [#82616](https://github.com/NousResearch/hermes-agent/issues/82616) | state.db FTS 损坏导致 gateway 会话连续性破坏——孤儿会话分叉 + 重启后陈旧会话恢复，违反"一次连续会话永不中断"契约 | ✅ 已关闭（tracking issue） |
| [#27555](https://github.com/NousResearch/hermes-agent/issues/27555) | vision fallback 链静默损坏：`_resolve_single_provider` 传错 kwarg（`base_url` vs `explicit_base_url`），TypeError 被吞掉后整条 fallback 不可用 | ✅ 已关闭 |
| [#17666](https://github.com/NousResearch/hermes-agent/issues/17666) | CLI 粘贴长多行文本静默丢失，消息永远到不了模型 | ✅ 已关闭 |
| [#82748](https://github.com/NousResearch/hermes-agent/pull/82748)（PR） | 桌面端启动崩溃（P0 现象）：react-router 被 Vite 分包后在多个 chunk 中重复实例化，非入口 chunk 启动即崩；修复 #82696 | 🟡 待合并 |

### 🟠 P2（中等）

| Issue | 描述 | 状态 |
|---|---|---|
| [#60821](https://github.com/NousResearch/hermes-agent/issues/60821) | OpenRouter/SiliconFlow 接入时 `Completions.create() got unexpected keyword 'system'` | ✅ 已关闭 |
| [#63177](https://github.com/NousResearch/hermes-agent/issues/63177) | Windows 上 `search_files` 对绝对路径静默返回 0 结果（rg + MSYS_NO_PATHCONV 冲突），已确认非 #61915 重复 | 🟡 仍开启 |
| [#24860](https://github.com/NousResearch/hermes-agent/issues/24860) | Dashboard Chat Ctrl+V 粘贴损坏、图片粘贴不支持 | 🟡 仍开启 |
| [#72431](https://github.com/NousResearch/hermes-agent/issues/72431) | Windows 主机 bind mount 下容器启动极端延迟/挂起（s6-overlay 更新后） | ✅ 已关闭（需复现） |
| [#12857](https://github.com/NousResearch/hermes-agent/issues/12857) | 网关自动重置丢弃上下文：父会话 ID 未持久化、新会话零历史启动（两个 bug） | ✅ 已关闭 |
| [#32196](https://github.com/NousResearch/hermes-agent/issues/32196) | 微信 Silk 格式语音跳过 STT，俄语等非中文转写损坏 | 🟡 仍开启 |
| [#52484](https://github.com/NousResearch/hermes-agent/issues/52484) | `delegate_task` 无限递归委派——无最大深度限制，"Token 焚化炉"级架构漏洞 | 🟡 仍开启 |
| [#54189](https://github.com/NousResearch/hermes-agent/issues/54189) | `state.db` 无界增长：2 周达 659MB、938 会话/40K 消息，无任何清理机制 | 🟡 仍开启 |
| [#45403](https://github.com/NousResearch/hermes-agent/issues/45403) | Electron 桌面端间歇性崩溃：`tapClientLookup: Index out of bounds` | 🟡 仍开启 |

### 🟡 P3（低）

- [#38240](https://github.com/NousResearch/hermes-agent/issues/38240) skills-index 陈旧 —— ✅ 已关闭
- [#46593](https://github.com/NousResearch/hermes-agent/issues/46593) kanban worker 退出 rc=0 未调 `kanban_complete` 却报"protocol violation"，真实错误被埋没 —— 🟡 仍开启
- [#51399](https://github.com/NousResearch/hermes-agent/issues/51399) Langfuse 插件占位符 API key 静默失败、零报错 —— 🟡 仍开启
- [#78050](https://github.com/NousResearch/hermes-agent/issues/78050) A2A 客户端工具对 CLI/TUI 会话完全不可见 —— 🟡 仍开启

---

## 6. 功能请求与路线图信号

**社区高价值需求（可能进入下一版本）：**

| Issue | 需求 | 信号强度 |
|---|---|---|
| [#34352](https://github.com/NousResearch/hermes-agent/issues/34352) | **多租户支持**：内存操作需接入 hook 系统，实现租户级隔离 | 强——有生产验证的完整方案，但标记 `needs-decision`，久未决策 |
| [#49967](https://github.com/NousResearch/hermes-agent/issues/49967) | **Skill Graph 动态技能发现**：避免 500+ 技能全部进系统提示词，节省 token | 中——针对大技能量用户的真实痛点 |
| [#41889](https://github.com/NousResearch/hermes-agent/issues/41889) | **delegate_task 跨 profile 子代理**：按指定 profile 的身份和运行时配置委派 | 中——与多租户/多 profile 方向一致 |
| [#46253](https://github.com/NousResearch/hermes-agent/issues/46253) | **GBrain 内存 provider 插件**（Postgres + 向量 + 事实/图谱），6 👍 | 中——已有 MCP 实现，缺原生 `memory` 管道集成 |
| [#15311](https://github.com/NousResearch/hermes-agent/issues/15311) | **通用消息 action buttons / inline keyboard**，10 👍 最高赞 | 强——跨平台 UX 共性需求 |
| [#26689](https://github.com/NousResearch/hermes-agent/issues/26689) | **盲人 VoiceOver 用户无障碍改进** | 中——macOS 屏读器用户明确反馈 |

**值得关注的待合并 Feature PR：**
- [#64152](https://github.com/NousResearch/hermes-agent/pull/64152) — CLI 显示本地 llama.cpp 驻留状态（`/props` 探针 + 指数退避）
- [#74424](https://github.com/NousResearch/hermes-agent/pull/74424) — Kimi Coding Plan 配额接入 `/usage` 账户用量
- [#30470](https://github.com/NousResearch/hermes-agent/pull/30470) — Matrix 房间上下文 observe 支持（opt-in）
- [#43200](https://github.com/NousResearch/hermes-agent/pull/43200) — Telegram observe 音频上下文按需转写（修复压缩后无法引用语音）

**路线图负面信号：** [#33462](https://github.com/NousResearch/hermes-agent/issues/33462)（claude-code 作为一等 subprocess provider）被标记 `sweeper:not-planned` 并关闭，短期内不会支持 Claude Max OAuth 本地 CLI 路线。

---

## 7. 用户反馈摘要

**满意/正面：**
- 多租户用户 @NimbleCoAI 在 #34352 中展示了经过数月生产验证的修复方案，说明社区有深度用户愿意反哺核心架构："Hermes can and should lead"（多智能体 AI 是未来）。
- PR "salvage" 文化活跃：维护者 @teknium1 今日连续抢救 3 个被搁置的会话修复 PR（#82742/#82743/#82744），社区贡献没有被遗忘，贡献者投入能得到闭环。

**不满意/痛点：**
- **多租户/多用户隔离缺失**（#34352）："Memory operations bypass the hook system entirely, making tenant isolation impossible without forking core"——不 fork 就无法隔离，这是架构级限制。
- **技能数量膨胀导致 token 浪费**（#49967）："Every skill's name and description lives in the system prompt... for users with 500+ skills this becomes a real token and context problem"——300+ 自定义技能用户的真实成本焦虑。
- **无障碍体验差**（#26689）："Hermes has an extremely powerful backend... but the current UX is very difficult for screen-reader users"——盲人用户明确表示当前 UX 对 VoiceOver 不友好。
- **静默失败模式反复出现**：Langfuse 占位符 key 零报错（#51399）、vision fallback 链 TypeError 被吞（#27555）、Windows search_files 静默返回 0 结果（#63177）——用户普遍反映**"无声失败比报错更可怕"**，排障成本极高。
- **存储无界增长**（#54189）："state.db grew to 659MB within 2 weeks containing 938 sessions and 40K messages. None of this data was pruned."——中等规模单人部署两周即达 659MB。
- **桌面端粘贴/崩溃体验**（#24860/#45403/#82696）：Ctrl+V 不工作、Electron 偶发崩溃，直接影响日常使用。

---

## 8. 待处理积压

以下重要 Issue/PR 长期未获得决策或修复，建议维护者优先关注：

| 条目 | 开启时间 | 积压天数 | 备注 |
|---|---|---|---|
| [#15311](https://github.com/NousResearch/hermes-agent/issues/15311) 通用 action buttons | 2026-04-24 | 108 天 | 10 👍 最高赞功能请求，无任何 PR 关联 |
| [#34352](https://github.com/NousResearch/hermes-agent/issues/34352) 多租户架构 | 2026-05-29 | 73 天 | `needs-decision` 挂起两个多月，社区已提供生产方案 |
| [#24860](https://github.com/NousResearch/hermes-agent/issues/24860) Dashboard 粘贴损坏 | 2026-05-13 | 89 天 | 8 👍，影响日常体验，无 fix PR |
| [#26689](https://github.com/NousResearch/hermes-agent/issues/26689) VoiceOver 无障碍 | 2026-05-16 | 86 天 | 无障碍合规与真实用户需求 |
| [#52484](https://github.com/NousResearch/hermes-agent/issues/52484) delegate_task 无限递归 | 2026-06-25 | 46 天 | 被称"Token Incinerator"，潜在成本漏洞，无 PR |
| [#54189](https://github.com/NousResearch/hermes-agent/issues/54189) state.db 无界增长 | 2026-06-28 | 43 天 | 无会话生命周期/清理机制，长期运行必现 |
| [#63177](https://github.com/NousResearch/hermes-agent/issues/63177) Windows search_files 绝对路径失效 | 2026-07-12 | 29 天 | Windows 平台明确回归，无 fix PR |
| [#78050](https://github.com/NousResearch/hermes-agent/issues/78050) A2A 工具对 CLI/TUI 不可见 | 2026-08-03 | 7 天 | 插件系统能力可见性缺陷 |
| [#78638](https://github.com/NousResearch/hermes-agent/issues/78638) Slack adapter god-file 重构 | 2026-08-04 | 6 天 | 9,088 行单文件，违反仓库 2026-08 政策 |

---

*本日报由 GitHub 数据自动聚合生成，仅供参考。所有链接均指向 NousResearch/hermes-agent 仓库原始条目。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-08-10

## 1. 今日速览

过去 24 小时 AstrBot 项目保持较高活跃度：共更新 10 条 Issues（新开/活跃 8 条，关闭 2 条），更新 5 条 Pull Requests（待合并 3 条，已合并/关闭 2 条），无新版本发布。社区反馈集中在三个方面：知识库检索质量回归（#9613）、WebUI 与平台侧若干稳定性问题，以及无 AVX 环境下 FAISS 崩溃（#9606）。值得关注的是，针对 WebChat 会话缺失问题已有对应修复 PR #9607 提交，项目对社区反馈的响应速度较快。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日合并/关闭 2 个 PR，均为问题修复，体积较小（XS）：

- **[#9587] [CLOSED] fix: prevent transient project session in ChatUI session list** — 修复 ChatUI 会话列表中可能出现“临时项目会话”的问题。该问题源于用户在项目内新建会话并发送首条消息时，会话摘要尚未稳定生成，导致列表出现瞬态条目。修复后会话列表展示更加稳定。关联 issue #9567。（https://github.com/AstrBotDevs/AstrBot/pull/9587）
- **[#9534] [CLOSED] fix: sanitize MCP tool names for LLM API** — 修复 MCP 服务器暴露包含`.`等非法字符的工具名（如腾讯文档）导致 LLM API 返回 400 错误的问题。现已对工具名进行清洗，使其符合 `^[a-zA-Z0-9_-]+$` 要求，保障 OpenAI/Anthropic 等接口的兼容性。关联 issue #9533。（https://github.com/AstrBotDevs/AstrBot/pull/9534）

此外，3 个新 PR 正在等待合并，均针对社区反馈的真实痛点，详见下文。

## 4. 社区热点

今日讨论最活跃的 Issues：

- **[#8479] [Bug] 回退对话模型列表会保留已禁用或已删除的模型**（评论 2，更新于 2026-08-09）  
  该问题描述了一个用户侧可感知的配置残留问题：已禁用/删除的模型仍出现在回退列表中，不仅造成界面困惑，还可能导致主模型故障时切换到不可用的 provider。创建于 6 月，至今仍被关注，反映该问题具有一定普遍性且尚未解决。（https://github.com/AstrBotDevs/AstrBot/issues/8479）

- **[#9604] [Bug] 无法查看更新和无法查看插件市场**（评论 2，创建于 2026-08-08）  
  用户报告在 WebUI 中无法加载更新页面和插件市场，并附带防火墙相关截图。该问题直接影响用户获取新版本信息和安装插件的能力，影响面较广，社区关注度高。（https://github.com/AstrBotDevs/AstrBot/issues/9604）

- **[#9613] [Bug] v4.27.2 知识库混合检索结果数量骤减**（评论 1，创建于 2026-08-09）  
  虽然是新 issue，但其描述的“单文档仅返回一个分块”“top_k 结果被不同文档稀释”等现象，直接关系到知识库功能的核心质量，可能引发大量知识库用户共鸣。（https://github.com/AstrBotDevs/AstrBot/issues/9613）

## 5. Bug 与稳定性

按严重程度排序：

**高 — 功能回归或崩溃**

- **[#9613] 知识库混合检索结果数量骤减、单文档仅返回一个分块**：v4.27.2 引入的文档级去重（疑似 #9455 副作用）导致 top_k 结果被不同文档占据，长文档中多个高相关分块仅返回一块，多知识库场景下分数不可比。影响核心功能，建议优先排查。（https://github.com/AstrBotDevs/AstrBot/issues/9613）
- **[#9606] 无 AVX 支持 CPU 上创建知识库导致进程崩溃（SIGILL）**：在 Intel Pentium G840 等不支持 AVX 的 CPU 上，FAISS 自动指令集检测加载不支持的 AVX 代码，触发内核级崩溃。知识库功能在受影响硬件上完全不可用，进程反复重启。当前无关联 fix PR。（https://github.com/AstrBotDevs/AstrBot/issues/9606）

**中 — 功能异常但不崩溃**

- **[#9604] WebUI 无法查看更新和插件市场**：功能页面加载失败，疑与网络/防火墙配置有关，但也可能是前端异常或接口超时，待维护者确认。（https://github.com/AstrBotDevs/AstrBot/issues/9604）
- **[#9605] WebChat 会话不显示在侧边栏**：`platform_sessions` 缺少记录导致会话永久不可见，且一次性迁移无法补齐历史欠账。已有对应 PR #9607 提交，处于待合并状态。（https://github.com/AstrBotDevs/AstrBot/issues/9605）
- **[#8479] 回退对话模型列表保留已禁用/删除模型**：配置残留导致 UI 可选不可用模型，且主模型失败时尝试切换到不存在的 provider，产生警告日志。（https://github.com/AstrBotDevs/AstrBot/issues/8479）

**低 — 体验问题**

- **[#8003] 飞书回复预表情不会在回复完成后取消**：用户期望自动取消预回应表情，当前需手动干预，体验不完整。（https://github.com/AstrBotDevs/AstrBot/issues/8003）
- **[#9608] `_conf_schema.json` 中输入 `{}` 会暴露外部配置项**：疑似配置合并逻辑问题，可能造成非预期配置项泄漏。建议加输入校验。（https://github.com/AstrBotDevs/AstrBot/issues/9608）

**已关闭**

- **[#9601] [CLOSED] 4.27.2 内置 whisper 语音转文字 SHA256 校验报错**：已关闭，不再追踪。（https://github.com/AstrBotDevs/AstrBot/issues/9601）

## 6. 功能请求与路线图信号

- **[#9611] [Feature] 插件配置支持多群独立配置**：用户希望插件配置可按群组分别设置，而非全局统一。该需求贴近多群运营场景，若实现将显著提升插件灵活性。（https://github.com/AstrBotDevs/AstrBot/issues/9611）
- **[#9393] [CLOSED] 定时任务支持独立上下文**：用户建议 `future_task` 增加“隔离上下文”或“独立会话模式”，避免群聊历史干扰定时任务（如早报），以减少 token 消耗、提高任务稳定性。当前已关闭，但需求信号明确，可能在后续版本重新评估。（https://github.com/AstrBotDevs/AstrBot/issues/9393）
- **[#8003] 飞书预回应表情自动取消**：属于平台适配体验增强，虽然被标记为 bug，但实质是行为优化。（https://github.com/AstrBotDevs/AstrBot/issues/8003）

**与 PR 相关的路线图参考**：待合并 PR #9612（音频格式自动检测）和 #9610（Telegram 动画贴纸使用静态缩略图）分别针对 QQ 语音消息和 Telegram 贴纸场景，均属多模态内容解析的补齐，若合并将扩大平台适配覆盖范围。

## 7. 用户反馈摘要

- **回归担忧**：#9601 用户反馈“之前的版本都是好的，依赖已装”却出现 SHA256 校验错误，表明升级后稳定性感知下降，此类回归最容易引发用户不满。
- **知识库质量下降**：#9613 用户精确描述了“kb_final_top_k=5 时只返回 5 条且来自 5 个不同文档”“部分结果相关度 0.00~0.02”，说明检索排序与去重策略存在明显可感知的质量退化。
- **硬件兼容性痛点**：#9606 用户在无 AVX 的旧 CPU 上部署，遭遇进程崩溃且功能完全不可用，属于“小众但致命”的部署门槛，影响项目在低配/老旧设备上的适用性。
- **平台细节体验**：#8003 用户希望飞书预回应表情能“自动取消”，反映用户对平台侧交互细节有较高期待，类似微体验优化可提升整体满意度。

## 8. 待处理积压

- **[#8003] 飞书回复预表情不会在回复完成后取消**（创建于 2026-05-04，已 3 个月+，评论 1）：长期未解决，虽是低严重度但持续被用户提及，建议排期处理。（https://github.com/AstrBotDevs/AstrBot/issues/8003）
- **[#8479] 回退对话模型列表保留已禁用或已删除的模型**（创建于 2026-06-01，已 2 个月+，评论 2）：配置残留问题影响日常使用，至今仍开放，建议尽快修复。（https://github.com/AstrBotDevs/AstrBot/issues/8479）
- **[#9393] 定时任务支持独立上下文**（创建于 2026-07-26，已关闭但未实现）：从 issue 状态看已被关闭，但所提需求对使用定时任务的用户群体有实际价值，建议维护者评估是否作为 roadmap 候选。（https://github.com/AstrBotDevs/AstrBot/issues/9393）

---

*数据统计周期：2026-08-09 至 2026-08-10；数据来源：AstrBot GitHub 仓库公开信息。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*