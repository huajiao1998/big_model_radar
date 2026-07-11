# OpenClaw 生态日报 2026-07-12

> Issues: 411 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-07-11 22:36 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 | 2026-07-12
**基于 2026-07-11 日 GitHub 数据**

---

## 1. 今日速览

过去 24 小时，OpenClaw 项目呈现**极端活跃**状态。共产生 **411 条 Issues 更新**（新开/活跃 236 条，关闭 175 条）及 **500 条 PR 更新**（待合并 287 条，已合并/关闭 213 条），社区贡献与维护节奏迅猛。项目发布了 `v2026.7.1-beta.5`，重点优化了 Crestodian 的 AI 引导安装体验。核心架构上，SQLite 会话存储迁移（#88838）与 session OOM 内存泄漏（#55334）均已合并关闭，数据层稳定性显著提升。**但需警惕**：今日爆出 **P0 级灾难性回归 Bug（#104721）**，所有工具输出与文件读取结果均被替换为占位符字符串，严重阻塞 Agent 核心工作流，需项目组立刻响应修复。

## 2. 版本发布

### v2026.7.1-beta.5
- **链接**：[Release 页面](https://github.com/openclaw/openclaw/releases/tag/v2026.7.1-beta.5)（数据源自概要）
- **核心亮点**：
  - **Crestodian 完全体**：在 CLI、Web 安装程序和 macOS 应用中支持完整的 Agent-Loop 设置流程。
  - **AI 引导配置**：提供 Provider 的 AI 引导式设置、模型判断的精确操作审批、掩码凭据输入提示以及无模型环境下的确定性降级方案。
- **破坏性变更与迁移注意**：
  - 作为 Beta 版本，建议在升级前备份 `~/.openclaw` 目录。
  - 本版本推进了 Path 3 SQLite 存储统一，如使用自定义插件，请验证其对新版会话/Transcript 存储格式的兼容性。

## 3. 项目进展

### 核心架构里程碑
- **#88838 [已合并]** — Track core session/transcript SQLite migration via accessor seam。Path 3 从 3.1b/3.2 历史堆栈成功整合为一条统一的 SQLite 存储路线，核心实施 PR #96625 已确立为唯一路径。
- **#55334 [已关闭]** — 修复 `sessions.json` 无限膨胀导致 Gateway OOM 的严重内存泄漏问题，该问题曾导致 Gateway 每分钟增长 50-100MB。

### 安全与可靠性加固
- **@cxbAsDev 批量提交通道**：针对多条关键路径添加文件读取大小边界限制，显著提升了抗 OOM 攻击能力：
  - `#101448` — `AGENTS.md`/`MEMORY.md` 读取边界
  - `#101469` — `HOOK.md` 安装验证读取边界
  - `#101477` — Cron 隔离区侧车文件读取边界
  - `#101772` / `#101773` / `#101774` / `#101775` — 审计/插件市场/心跳等多路径安全加固

### 跨平台客户端
- **#90196 [iOS，已合并]** — 集成 Piper TTS 作为完全离线的设备端语音合成引擎，Gateway 和 iOS 端均新增 `ttsEngine` 配置支持。
- **#63123 [iOS，已合并]** — 添加后台存活信标（Beacon）支持，Gateway 可记录节点“在线”事件并区分“当前在线”与“最近在线”状态。
- **#103011 [Android，已合并]** — 修复权限请求超时导致后续相机/麦克风/SMS 权限请求立即失败的 Bug。

### UI/UX 修复
- `#104744` — 修复 Web UI 中“滚动到最新”按钮出现时导致聊天记录错位收缩的 Bug。
- `#104531` — 修复 `exec` 命令长输出因截断边界落于 Emoji 代码单元中间导致字符损坏的问题。
- `#104623` — 修复 Gateway Worker 启动失败信息中 Emoji 截断导致的乱码问题（UTF-16 安全切片）。

### 集成修复
- `#42510 [已关闭]` — 修复 Google Chat 中 `replyToMode: "off"` 无法抑制线程回复的问题。
- `#79069 [已关闭]` — 修复 Cron 路径中 `delivery.mode === "none"` 未传递静默交付模式参数的问题。
- `#92361 [已关闭]` — 修复工具可用性求值器静默忽略空 `allOf`/`anyOf` 组的问题。

---

## 4. 社区热点

### 🔥 #75 — Linux/Windows 桌面客户端（110 评论，81 👍）
[#75](https://github.com/openclaw/openclaw/issues/75)
**诉求**：强烈要求推出 Linux 和 Windows 版本的第一方客户端，实现与 macOS 对标的功能集。**这是整个项目中最受期待的功能**，自 2026-01-01 开放以来热度持续不减，近 24 小时内仍有新评论加入。

### 🧩 #99241 — 工具输出变为图片附件不可读（21 评论，P1）
[#99241](https://github.com/openclaw/openclaw/issues/99241)
**诉求**：在 ANSI 密集型/长时间工具工作流中，工具结果被渲染为 `(see attached image)` 占位符，Agent 无法读取 stdout/stderr。结合同日发现的 P0 Bug #104721，社区对“工具输出链路崩溃”表达了最高程度的关注与焦虑。

### 🔒 #10659 — 掩码密钥系统（15 评论，4 👍）
[#10659](https://github.com/openclaw/openclaw/issues/10659)
**诉求**：要求 Agent 只能“使用”而不能“读取” API 密钥，从根本上防止凭据通过提示注入或日志意外泄漏。此 Issue 同时贴有 `P1`、`security`、`product-decision` 标签，属于社区安全关切的最集中代表。

### 🧠 #7707 — 记忆信任标签（17 评论）
[#7707](https://github.com/openclaw/openclaw/issues/7707)
**诉求**：为每条记忆附加基于来源的信任等级标签（用户命令/网页抓取/第三方插件），以防御“记忆投毒”攻击。反映出用户对大模型 Agent 安全性纵深防御体系的高度关注。

---

## 5. Bug 与稳定性

### 🔴 P0 — 灾难性回归（无修复 PR）
- **#104721 [新建于 07-11]**：[链接](https://github.com/openclaw/openclaw/issues/104721)
  - **症状**：所有文件读取和工具调用结果均返回字符串 `"(see attached image)"`，而非实际内容。Agent 完全丧失理解工具输出和执行文件操作的能力。
  - **状态**：**尚无分配或关联修复 PR。** 该 Bug 直接破坏了核心 Agent 能力，24 小时内已获 7 条评论和 1 👍，需项目组作为最高优先级立即介入。

### 🟠 P1 — 会话与 Gateway 稳定性
| Issue | 摘要 | 状态 |
|-------|------|------|
| [#84903](https://github.com/openclaw/openclaw/issues/84903) | 单个 Agent 阻塞导致整个 Gateway 事件循环停滞 – **隔离架构缺陷** | 待处理 |
| [#87109](https://github.com/openclaw/openclaw/issues/87109) | Gateway 堆内存从 558MB 持续增长至 1073MB+，Cron 任务静默失败 | 待处理 |
| [#86996](https://github.com/openclaw/openclaw/issues/86996) | Active Memory + Codex 路径导致严重延迟、Hook 超时和启动失败 | 待处理 |
| [#102175](https://github.com/openclaw/openclaw/issues/102175) | 嵌入式会话 Prompt 缓存跨上下文边界中断 | 修复 PR #102189 已提交 |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex PreToolUse 钩子触发 CPU 密集型进程，阻塞 Gateway RPC | 待处理 |

### 🟡 P2 — 回归与行为异常
| Issue | 摘要 | 状态 |
|-------|------|------|
| [#90213](https://github.com/openclaw/openclaw/issues/90213) | 2026.6.1 升级后旧版状态迁移警告持续出现，`openclaw doctor --fix` 无效 | 待处理 |
| [#94846](https://github.com/openclaw/openclaw/issues/94846) | Cron 任务在恢复早期工具错误后错误跳过最终投递 | 待处理 |
| [#104751](https://github.com/openclaw/openclaw/issues/104751) | (PR) 修复前向 Schema 恢复时旧版本遇到新版数据库的错误提示 | 开放中 |
| [#102400](https://github.com/openclaw/openclaw/issues/102400) | 回复会话初始化冲突在 Slack/webchat 上被静默丢弃（Telegram 已处理） | 待处理 |
| [#98976](https://github.com/openclaw/openclaw/issues/98976) | Provider 拒绝（Anthropic refusal/OpenAI content_filter）不触发 fallback 链 | 待处理 |

---

## 6. 功能请求与路线图信号

### 高票候选（下一版本重点）
| Issue | 标签 | 信号 |
|-------|------|------|
| [#75](https://github.com/openclaw/openclaw/issues/75) Linux/Windows 客户端 | 81 👍，110 评论 | **社区最大呼声**，持续半年无进展 |
| [#10659](https://github.com/openclaw/openclaw/issues/10659) 掩码密钥 | P1, security | 安全基线功能 |
| [#7707](https://github.com/openclaw/openclaw/issues/7707) 记忆信任标签 | P2, security | 防投毒纵深防御 |
| [#7722](https://github.com/openclaw/openclaw/issues/7722) 文件系统沙箱 (4 👍) | P2, security | 与 #10659 构成安全双件套 |
| [#6615](https://github.com/openclaw/openclaw/issues/6615) Exec-Approvals 黑名单 (7 👍) | P2, security | 企业级“允许一切除 X 外”策略 |

### 基础设施演化
- **#42026 [RFC]**：[链接](https://github.com/openclaw/openclaw/issues/42026) 提议拆分 Gateway 为**控制平面**和**Agent 运行时**，如果落地将从根本上解决 #84903 的会话隔离问题。目前 8 条评论，3 👍，仍需产品决策。
- **#10687 [OpenRouter 动态模型发现]**：[链接](https://github.com/openclaw/openclaw/issues/10687) 要求废除静态模型列表，改为动态协商。是支撑快速演变的模型生态的关键能力。

### 用户体验打磨
- **#9409**：上下文溢出错告信息缺乏诊断价值（10 评论，3 👍）。
- **#81960**：用户希望在 Onboarding 阶段就能配置多个 Provider 和模型。
- **#10118**：TUI `Shift+Enter` 换行（4 👍），现代聊天客户端的标配功能。
- **#8299**：子 Agent 运行后自动发布摘要的行为过于强制，应可配置抑制。

---

## 7. 用户反馈摘要

### 核心痛点（破坏性）
- **"Gateway 被一个会话卡死"**（#84903/#87109）：运营者反馈在多会话场景下，单点锁死导致全域不可用，生产环境不可接受。
- **"工具输出全是(see attached image)"**（#99241/#104721）：用户直言“这是我们所遇到的最严重的问题”，完全破坏了 Agent 的自主工作能力，属于生存级 Bug。
- **"Cron 任务死得无声无息"**（#87109/#94846）：内存压力或工具错误恢复后，Cron 完全无输出无告警，用户无法得知任务失败。

### 使用场景深度（多样化）
- **多 Agent 协作**（#43750）：用户已在 Discord/Slack 等频道中深度使用多 Agent 架构，对于在共享频道中精确寻址特定 Agent（`/new @agent`）有强烈需求。
- **WhatsApp 贴纸**（#7476）：用户希望将 `.webp` 文件以原生贴纸形式发送，而非普通图片。
- **Content Creator 模式**（#7403）：用户希望在演示和内容创作时开启 Private Mode，脱离个人工作区上下文。
- **纯文本复制**（#7909）：用户对比 Gemini 平台，希望复制按钮支持 Markdown/纯文本双模式。

### 满意度信号
- 社区对 **v2026.7.1-beta.5** 中 Crestodian 的 **AI 引导式 onboarding** 表达了积极期待，认为 AI 辅助 Provider 配置能显著降低新用户的入门门槛。
- **SQLite 迁移**（#88838）和 **OOM 修复**（#55334）的合并被社区视为项目走向成熟的重要标志。

---

## 8. 待处理积压

### 🔴 高威胁待响应
- **[P0] #104721 — 工具输出占位符 Bug**：[链接](https://github.com/openclaw/openclaw/issues/104721)
  - **建议**：自新建以来已有 24 小时，目前无任何维护者认领或关联 Fix PR。建议由 Core Team 成员**立即介入**，查明 `tool results` → `api response` → `openai-chatgpt-responses` 链何处触发占位符替换，并在修复后追加针对性的 Regression 测试。

### 🟡 长期积压致冷风险
- **[#75] Linux/Windows 桌面客户端**：[链接](https://github.com/openclaw/openclaw/issues/75)
  - **风险**：已开放超 190 天（2026-01-01 至今），110 条评论，81 个 👍，却迟迟未进入开发阶段。社区耐心正在被消耗，是**最高的用户流失风险点**。建议在路线图中明确时间线或给出阶段性承诺。

### 🟠 维护者决策瓶颈
大量高热度高优先级 Issue 带有 `needs-maintainer-review` / `needs-product-decision` 标签：
- `#7707` 记忆信任标签
- `#10659` 掩码密钥系统
- `#7722` 文件系统沙箱
- `#8299` 子 Agent 公告抑制
- `#9409` 上下文溢出错误优化
- `#42026` 分布式运行时 RFC

> **建议**：本周内对这批标签密集的 Issue 进行一次**集中状态标记**（Accepted / Under Discussion / Not Planning），减少社区疑问和重复投入。

### ⏳ 待合并的高影响力 PR
- `#102189`：[fix: stabilize embedded prompt caching across policy and Responses boundaries](https://github.com/openclaw/openclaw/pull/102189) — 对应 P1 Bug #102175，属于 **XL 级修改**，涉及 Gateway、Agent、Codex 扩展，建议优先安排 Code Review。
- `#104730`：[feat: sidebar session state slot, worktree/automation badges, archive disables bound cron jobs](https://github.com/openclaw/openclaw/pull/104730) — 大幅增强 Control UI 侧边栏信息密度与可用性，属社区高关注 UX 改进。

---

**总结**：OpenClaw 在 2026-07-11 展现了极强的社区活跃度与开发推进力，架构升级与安全加固成效显著。**但 P0 Bug #104721 是当前最大的系统风险**，建议项目组优先处理，然后集中疏通 `needs-maintainer-review` 的积压议题，保持社区的参与热情与信任度。

---

## 横向生态对比

## 横向对比分析报告：个人 AI 助手开源生态（2026-07-12）

### 1. 生态全景

个人 AI 助手与自主智能体开源生态在 **2026 年 7 月进入高速分化期**，多个主力项目同步推进架构级升级（统一存储、持久化内存、目标模式、WASM 运行时），社区贡献热度空前——仅 OpenClaw 与 Hermes Agent 单日 PR 更新均突破 500 条。然而，**大规模回归与审核瓶颈成为共同挑战**：P0 灾难性 Bug（OpenClaw #104721）、零合并率（Zeroclaw）、PR 积压（Hermes 积压 479 个）凸显出功能扩张与质量保障之间的撕裂。跨项目对工具调用可靠性、多 Provider 兼容性、上下文管理与安全性表现出高度一致的诉求，标志生态正从“功能可用”迈入“生产可靠”的关键阶段。

### 2. 各项目活跃度对比

| 项目 | Issue 动态 | PR 动态 | 版本发布 | 健康度评估 |
|------|------------|--------|----------|------------|
| **OpenClaw** | 更新 411（新开 236 / 关闭 175） | 更新 500（待合并 287 / 合并关闭 213） | v2026.7.1-beta.5 | 极端活跃，但 P0 回归阻塞核心流程 |
| **Zeroclaw** | 更新 50（新开 50 / 关闭 0） | 更新 50（新提交 50 / 合并 0） | 无 | 开发力度大，审核停滞，高风险积累 |
| **PicoClaw** | 新开 0 / 关闭 0 | 新 PR 0（2 个已有 PR 获更新） | 无 | 平静维护窗口，陈旧 PR 面临自动关闭 |
| **QwenPaw** | 新开 23（关闭未报告） | 新 PR 7（合并 4） | 无 | 高响应修复期，v2.0 后关键 Bug 集中 |
| **Hermes Agent** | 更新 237（约关闭 66） | 更新 500（合并 21） | 无 | 贡献井喷但审阅严重滞后，高风险 |

### 3. OpenClaw 在生态中的定位

OpenClaw 凭借 **最庞大的社区规模**（日更新量远超同类）和 **稳定的版本迭代节奏**（beta 持续输出）成为生态的参照基准。其技术路线强调 **一致性**：通过 SQLite 统一会话存储（#88838）和 AI 引导配置（Crestodian）降低用户上手成本，同时推进全平台覆盖（macOS/iOS/Android/Web）。与 **Zeroclaw**（Rust 高性能 + WASM 扩展）构成互补，与 **Hermes Agent**（极致多 Provider 兼容）形成差异——OpenClaw 更注重开箱即用的整体体验而非底层灵活性。当前 P0 占位符 Bug 虽暴露核心链路脆弱性，但其完整的 Agent-Loop 能力和跨客户端支持仍使其成为 **功能最全、用户基础最广的生态标杆**。

### 4. 共同关注的技术方向

多项目同步涌现以下需求，表明行业共识正在形成：

- **上下文与内存管理**：OpenClaw（SQLite 迁移 + OOM 修复）、Zeroclaw（持久化内存 Hindsight 后端）、QwenPaw（上下文压缩拆散 tool pair 导致 API 400）、Hermes（超大 Prompt 卡顿数分钟）。**跨会话持久化与精准压缩**成为 Agent 能力分水岭。
- **工具调用可靠性**：OpenClaw（#104721 全部输出变为占位符）、Zeroclaw（工具参数未验证导致 400）、QwenPaw（长结果截断优化 #5953）、Hermes（工具结果搭配上下文溢出）。**输出链路完整性**是生产级 Agent 的生存底线。
- **多 Provider 兼容性**：OpenClaw（Provider 修复）、Zeroclaw（OpenRouter 集成）、QwenPaw（配置兼容问题）、Hermes（数十个 Provider 相关 PR/Issue）。**用户要求任意 Provider “插上即用”**，且行为一致。
- **安全与隐私**：OpenClaw（掩码密钥 #10659、记忆信任标签 #7707）、Zeroclaw（内存写入/召回内容扫描 #8984）、QwenPaw（白名单权限诉求 #5955）、Hermes（Prompt 注入检测覆盖更多变体 #27284）。**安全从附加功能升级为默认基线**。
- **多 Agent 协作**：OpenClaw（#43750 多 Agent 寻址）、Zeroclaw（Goal Mode #8681 自主任务）、Hermes（可信内部触发器 #17415）。**Agent-to-Agent 交互**正从实验走向工程化。

### 5. 差异化定位分析

| 维度 | OpenClaw | Zeroclaw | PicoClaw | QwenPaw | Hermes Agent |
|------|----------|----------|----------|---------|--------------|
| **功能侧重** | 全栈个人助手，AI 引导配置、全平台客户端 | 高性能自主 Agent 框架，目标模式、WASM 插件 | 轻量级多 Agent 配置与特定渠道（DeltaChat） | 企业通讯集成（微信/企微/钉钉） | 开发者工具链，极致 Provider 兼容，TUI/Desktop |
| **目标用户** | 大众用户 + 开发者，追求开箱即用 | 高级开发者，需要底层控制与扩展 | 嵌入式/资源受限场景，或需定制化渠道 | 企业团队，重视内部通讯串联 | LLM 开发者、评测者，需要广泛模型接入 |
| **技术架构关键差异** | 统一 SQLite 存储，Agent-Loop 核心，Crestodian | Rust 实现，持久化内存引擎，Goal Mode 状态机 | 配置驱动，DeltaChat JSON-RPC 改造 | 基于 agentscope，强渠道耦合 | Gateway/API Server/Desktop 三层，PR 驱动演进 |
| **迭代节奏** | 快（每日合并/发布） | 极快开发，极慢合并 | 慢（维护模式） | 修复密集 | 提交爆炸，合并瓶颈严重 |

### 6. 社区热度与成熟度

- **第一梯队（极端活跃）**：**OpenClaw** 与 **Hermes Agent** 日更新量级最高，社区响应迅速，但都面临不同程度的稳定性反噬（P0 Bug / 审核积压）。两者处于 **功能快速发展与质量波动并存** 的阶段。
- **第二梯队（高输入低输出）**：**Zeroclaw** 代码提交量大（Goal Mode、Memory 重构），但全天零合并，反映出核心维护者审查能力与贡献速度严重不匹配，功能模块陷入 “只写不读” 的高风险状态。
- **第三梯队（版本巩固期）**：**QwenPaw** 在 v2.0.0 后进入高密度修复窗口，社区反馈积极，团队响应快，但关键 Bug（Windows 沙箱、上下文压缩）仍未解决，处于 **震荡修复期**。
- **第四梯队（稳定维护期）**：**PicoClaw** 活跃度低，无新增 Issue/PR，属于 **维系性开发**，若核心 PR 长期无人推动，存在社区沉寂风险。

### 7. 值得关注的趋势信号

1. **稳定性已成最高优先级**：P0/P1 级别的回归在多项目同时爆发，用户对“配置生成被自身拒绝”（Zeroclaw #8718）、“升级后无法聊天”（QwenPaw #5956）等开箱即坏问题零容忍。架构变更必须配套更完备的回归测试。
2. **跨会话记忆与上下文压缩是核心战场**：从 Zeroclaw 大举重构持久化内存，到 QwenPaw 修复上下文压缩割裂 Tool Pair，记忆能力正从“可选项”变为“必选项”，且不能以牺牲正确性为代价。
3. **Provider 兼容性决定生态广度**：Hermes 的 Provider 相关 Issue 数量和 OpenClaw 的多模型支持表明，项目需要投入持续精力适配模型接口差异（usage 字段缺失、自定义端点、多 Key 池管理等）。
4. **安全从附加功能变为基线**：掩码密钥、注入检测、内存扫描、文件沙箱在多项目并行推进。用户不再接受事后补救，**安全必须嵌入架构**（如 Zeroclaw 的内容扫描门禁，OpenClaw 的信任标签）。
5. **开源治理模式面临拐点**：Zeroclaw 零合并、Hermes 479 个待审 PR，显示靠少数维护者手工审查已不可持续。自动合并策略、众审机制或轮值维护者制度将成为项目分化竞争力的关键。
6. **WASM 插件生态萌芽**：Zeroclaw 的 WASM 运行时 RFC 全部 Accepted，若成功落地，可能定义智能体插件的新标准，值得其他项目关注。

**对开发者的参考价值**：选型时不应只看功能列表，更要评估项目 **修复 Bug 的速度、PR 合并周期、安全机制设计**，以及社区是否具备突破审核瓶颈的治理能力。当前阶段，**稳定性记录比功能数量更有说服力**。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报（2026-07-12）

---

## 1️⃣ 今日速览

过去24小时内，Zeroclaw 项目维持了**极高的开发活跃度**，共计有 50 条 Issue 和 50 条 Pull Request 被更新。开发重心高度集中：**目标模式（Goal Mode）** 的稳定化分拆、**持久化内存子系统**的全面升级（Hindsight 后端、类型化分类、检索流水线），以及 **WASM 插件运行时**的生态铺垫。

**值得高度关注的警示信号**：尽管代码提交量巨大，但过去24小时内**没有任何 Issue 或 PR 被关闭/合并**（Issue 和 PR 的合并/关闭数量均为 0）。这意味着项目正处于一个严重的**审核瓶颈期**，大量 P1 级 Bug 和关键功能模块积压在等待合入，这可能推迟 v0.8.3 里程碑的发版节奏。项目整体处于“高输入、低输出”的状态，需要核心维护者尽快集中审查，以避免技术债务膨胀。

---

## 2️⃣ 版本发布

无。上一版本为 v0.8.2，v0.8.3 里程碑正在并行推进中（追踪器：[#7320](https://github.com/zeroclaw-labs/zeroclaw/issues/7320)，当前包含 15 个待办项目）。

---

## 3️⃣ 项目进展

> ⚠️ **注**：今日无任何 Pull Request 被合并或关闭。以下列出的是**已提交并正在等待审查**的重要 PR，它们代表了项目当前的攻坚方向。

### 🔹 目标模式（Goal Mode）—— 基石性架构落地
贡献者 @vrurg 提交了一个庞大的 PR 栈，将 `feat/goal-mode` 的已有实现拆解为可审查的小块：
- **[#8689](https://github.com/zeroclaw-labs/zeroclaw/pull/8689) [feat(channels): add goal command admission]**：为多渠道（Telegram、Matrix 等）添加了 `/goal` 命令准入机制，支持启动、暂停、取消等控制。
- **[#8746](https://github.com/zeroclaw-labs/zeroclaw/pull/8746) [fix(goal): stop active goal self-resume loops]**：修复活跃 Goal 的自我恢复循环问题。
- **[#8996](https://github.com/zeroclaw-labs/zeroclaw/pull/8996) [fix(goal): preserve running goals across daemon reload]**：支持在 daemon 热重载时保留运行中的 Goal 状态。

这三条 PR 相互堆叠（size: XL），一旦合入，将首次让 ZeroClaw 具备稳定的多轮自主任务执行能力。

### 🔹 持久化内存（Memory）—— 大规模功能补齐
@Nillth 和 @logical-and 联手提交了超过 10 个围绕内存的 PR，几乎是在同时推进该模块的多个侧面：
- **Hindsight 后端**：[#8992](https://github.com/zeroclaw-labs/zeroclaw/pull/8992) 将外部 HTTP 内存服务 Hindsight 引入为一等后端。
- **检索流水线**：[#8897](https://github.com/zeroclaw-labs/zeroclaw/pull/8897) 将召回路由至阶段化检索管线；[#8895](https://github.com/zeroclaw-labs/zeroclaw/pull/8895) 启用重排序阶段。
- **类型化/安全**：[#8900](https://github.com/zeroclaw-labs/zeroclaw/pull/8900) 添加类型化内存分类与提取；[#8984](https://github.com/zeroclaw-labs/zeroclaw/pull/8984) 在内存写入和召回边界添加内容安全扫描。
- **语义召回**：[#8898](https://github.com/zeroclaw-labs/zeroclaw/pull/8898) 修复持久化全局内存在跨会话语义召回中的缺失。
- **测试与配置**：[#8892](https://github.com/zeroclaw-labs/zeroclaw/pull/8892) 补充存储接缝测试；[#8899](https://github.com/zeroclaw-labs/zeroclaw/pull/8899) 添加配置语义校验和迁移钩子。

### 🔹 原生工具生态扩展
- **[#8994](https://github.com/zeroclaw-labs/zeroclaw/pull/8994) [feat(tools): add native Home Assistant REST tool]**：新增原生 Home Assistant REST 工具，Agent 可直接控制智能家居。
- **[#8995](https://github.com/zeroclaw-labs/zeroclaw/pull/8995)**：优化内存和 Telegram 流式传输的默认值。
- **[#8993](https://github.com/zeroclaw-labs/zeroclaw/pull/8993)**：修复仪表盘内存计数显示问题（曾一直显示 0）。

### 🔹 小但关键的修复
- **[#8921](https://github.com/zeroclaw-labs/zeroclaw/pull/8921)**：修复 `agent_alias` 被硬编码为 `None` 的问题，导致生命周期钩子拿不到别名信息。
- **[#8874](https://github.com/zeroclaw-labs/zeroclaw/pull/8874)**：修复 Rust 1.96 下 Cargo rustdoc 配置与测试冲突导致的 CI 失败。
- **[#8988](https://github.com/zeroclaw-labs/zeroclaw/pull/8988)**：转录注册失败时不再静默丢弃，改为打印日志。

---

## 4️⃣ 社区热点

| Issue / PR | 讨论热度 | 核心议题 |
|---|---|---|
| **[#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) RFC: Work Lanes, Board Automation, and Label Cleanup** | 💬 14 条 | 治理型 RFC 的最终落地版本（Rev. 15），提议通过标签和看板自动化来路由工作负载，减轻维护者负担。反映了社区对项目“元治理”的迫切需求。 |
| **[#8681](https://github.com/zeroclaw-labs/zeroclaw/issues/8681) [Tracker]: Goal mode implementation split stack** | 💬 9 条 | Goal Mode 功能落地协调器。社区密切关注这一重大功能如何被拆解和审查。 |
| **[#8054](https://github.com/zeroclaw-labs/zeroclaw/issues/8054) System prompt tool-availability should match per-turn effective tools** | 💬 9 条 | 一个跨入口点的系统提示工具可用性不一致 Bug。因涉及 Runtime、Gateway、WebSocket、Multimodal 等多个组件，引发了架构层面的深度讨论。 |
| **[#8832](https://github.com/zeroclaw-labs/zeroclaw/issues/8832) RFC: Gateway-local Kanban board for agent work** | 💬 2 条 | 新颖提议：在 Web 仪表盘中添加看板视图，可视化 Agent 当前工作状态。反映用户对 Agent 可观测性和调度管理的强烈向往。 |
| **[#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) MCP/tool-schema cloning drives unbounded RSS growth** | 💬 1 条 | 从 #5542 分拆出的 OOM 根因追踪。社区技术讨论深度很高，涉及 Rust 内存模型和 MCP Schema 克隆的性能陷阱。 |

**分析**：社区正在从“能否用”进入“怎么管”和“是否稳”的阶段。治理RFC、看板、单体性能瓶颈是当前最热的讨论主题。

---

## 5️⃣ Bug 与稳定性

以下按严重程度排列，重点标注**是否已有 fix PR**。

### S1 — 阻塞业务流程 (Critical)

| Issue | 描述 | 状态 / Fix PR |
|---|---|---|
| [#5808](https://github.com/zeroclaw-labs/zeroclaw/issues/5808) | 默认 32K 上下文预算在第一轮就被系统提示 + 工具定义超出 3.3x，导致持续的预裁剪 | **In Progress**，无 fix PR |
| [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) | 退出 Web 聊天窗口后 Agent 立即停止工作，完全阻塞后台操作 | **Accepted**，无 fix PR |
| [#8675](https://github.com/zeroclaw-labs/zeroclaw/issues/8675) | 原生工具调用参数未验证 JSON 合法性直接传给 OpenRouter，导致 Provider 400 和空回复 | **Accepted**，无 fix PR |
| [#8718](https://github.com/zeroclaw-labs/zeroclaw/issues/8718) | **`zeroclaw config init` 生成的模板被 daemon 自身拒绝**，导致语音转录功能静默失效。这是严重的开箱破坏性 Bug | **Accepted**，无 fix PR |
| [#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) | MCP 工具 Schema 克隆驱动 RSS 无限增长（OOM 根因） | **Accepted**，无 fix PR |

### S2 — 行为降级 (Degraded)

| Issue | 描述 | 状态 / Fix PR |
|---|---|---|
| [#8654](https://github.com/zeroclaw-labs/zeroclaw/issues/8654) | `skill-review` fork 出数组越界 Panic → SIGSEGV，进程退出 | **In Progress**，无 fix PR |
| [#8731](https://github.com/zeroclaw-labs/zeroclaw/issues/8731) | Stdio MCP Server 变成僵尸进程，积累在宿主 PID 空间下 | **Accepted**，无 fix PR |
| [#6350](https://github.com/zeroclaw-labs/zeroclaw/issues/6350) | WhatsApp `allowed-numbers` 安全配置被 LID 格式联系人绕过 | **In Progress**，无 fix PR |
| [#8054](https://github.com/zeroclaw-labs/zeroclaw/issues/8054) | 系统提示工具可用性在 Gateway / WebSocket 入口点不统一 | **Blocked (等待 #8053 进一步扩散)** |

### S3 — 小问题 (Minor)

| Issue | 描述 | 状态 |
|---|---|---|
| [#8578](https://github.com/zeroclaw-labs/zeroclaw/issues/8578) | 启动失败后进程未正确终止 | **Accepted** |
| [#7828](https://github.com/zeroclaw-labs/zeroclaw/issues/7828) | Tracker：审计多字节 UTF-8 字符截断安全性 | **Accepted** |

---

## 6️⃣ 功能请求与路线图信号

| 议题 | 信号强度 | 分析 |
|---|---|---|
| **WASM 插件运行时 RFC**（[#8135](https://github.com/zeroclaw-labs/zeroclaw/issues/8135)、[#7822](https://github.com/zeroclaw-labs/zeroclaw/issues/7822)、[#8187](https://github.com/zeroclaw-labs/zeroclaw/issues/8187)） | 🔥🔥🔥🔥🔥 **已全部 Accepted** | 这组 RFC 定义了 WASM 成为默认插件运行时的架构路径，包括能力门控、生命周期钩子和硬件访问。这将深刻改变 ZeroClaw 的插件生态，预计纳入 v0.9+。 |
| **持久化内存全面升级**（[#8891](https://github.com/zeroclaw-labs/zeroclaw/issues/8891) 及多条相关 PR） | 🔥🔥🔥🔥🔥 **路线图核心板块** | 如无意外，今天提交的这批 Memory 重构代码将全部纳入 v0.8.3 或紧随其后的热修复版本。 |
| **网关看板与 WebSocket 解耦**（[#8832](https://github.com/zeroclaw-labs/zeroclaw/issues/8832)、[#7759](https://github.com/zeroclaw-labs/zeroclaw/issues/7759)） | 🔥🔥🔥 | 社区对 Agent 可观察性和后台常驻能力的需求强烈。看板提议虽新，但契合治理大方向。 |
| **Discord 渠道功能对等**（[#7831](https://github.com/zeroclaw-labs/zeroclaw/issues/7831)） | 🔥🔥 | 推进嵌入式、斜杠命令、组件、语音功能，是渠道大一统的关键一步。 |

---

## 7️⃣ 用户反馈摘要

### 💢 强烈负面反馈（影响口碑的关键点）

- **“开箱即坏”问题**：@lynnkeele 在 [#8718](https://github.com/zeroclaw-labs/zeroclaw/issues/8718) 中尖锐指出：`zeroclaw config init` 生成的模板竟然被 daemon 自身报警告（value mismatch），导致语音录制功能**静默失效**。这对于新用户是毁灭性的体验。
- **“离开 = 放弃”**：@susyabashti 在 [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) 中表达了强烈不满：“给 Agent 布置任务后，我甚至不能离开聊天窗口，否则就被中断。这完全阻塞了我的使用方式。”
- **资源泄漏严重**：@susyabashti 还报告了 [#8731](https://github.com/zeroclaw-labs/zeroclaw/issues/8731)（MCP 子进程变僵尸）；@JordanTheJet 在 [#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) 中描述了内存无上限增长的问题。用户对 ZeroClaw 在长期任务中的稳定性感到担忧。

### ✅ 使用场景亮点

- **Home Assistant 集成**：贡献者 @logical-and 提呈了原生 HA REST 工具（[#8994](https://github.com/zeroclaw-labs/zeroclaw/pull/8994)），该需求在社区中呼声很高，打通了 Agent 控制智能家居的路径。
- **跨会话持久化**：@Nillth 主导的内存重构获得了社区默许，大量用户期待 ZeroClaw 能够记住长期对话上下文。
- **Goal Mode 认可**：用户围绕 [#8681](https://github.com/zeroclaw-labs/zeroclaw/issues/8681) 的讨论表明，社区将 Goal Mode 视为 ZeroClaw 从“聊天玩具”进化为“自主 Agent”的关键。

---

## 8️⃣ 待处理积压

> 以下 Issue / PR 长时间未获得实质性响应或推进，建议维护者团队关注。

| 项目 | 创建日期 | 现状 | 建议处理方式 |
|---|---|---|---|
| [#6715](https://github.com/zeroclaw-labs/zeroclaw/issues/6715) **Delete unneeded branches** | 2026-05-16 | **Accepted**，但一直未执行 | 仓库当前有 200+ 分支，大多已合并。简单的维护操作，建议安排一次清理或增加自动化策略（如 stale-branch bot）。 |
| [#7870](https://github.com/zeroclaw-labs/zeroclaw/issues/7870) **Runtime options leak from first configured provider** | 2026-06-17 | **Accepted** | 架构级别配置泄漏 Bug，影响多 Provider 配置场景。虽已追踪，但无实质性修复，建议给出 ETA。 |
| [#8353](https://github.com/zeroclaw-labs/zeroclaw/pull/8353) **Improve error message context** | 2026-06-26 | **Needs Author Action** | 一个改善错误信息的小而美的 PR（size: XS），标记为需要作者回复审查意见。如果贡献者无响应，建议维护者自行推进闭包。 |
| [#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720) **Disable cachePoint for Bedrock Nova 2 Lite** | 2026-07-04 | **RFC: Support** | 用户受 Bedrock 缓存问题困扰多日，目前仅获得 1 条评论。此类支持请求积压容易导致用户流失。 |

---

**分析师总结**：Zeroclaw 项目在功能开发的力度上无可挑剔，**Goal Mode** 和 **Memory** 两大支柱正在被快速重写。但**零合并率的 24 小时**是一个明确的红色警报——如果审核不能加速，项目将面临“只写不读”的危险循环，尤其是一串 P1/S1 级的 Bug 正在啃噬用户的信任。建议下一个 48 小时内优先集中审查并合并至少 1-2 个关键 Bug 修复 PR（如 #8921 和 #8988）以恢复社区信心。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 | 2026-07-12

## 1. 今日速览
过去 24 小时内，PicoClaw 项目整体活跃度较低，处于平稳的代码审核与维护窗口期：
- **零 Issue 波动**：无新 Bug 报告、无功能请求、无 Issue 关闭。
- **无版本发布**：未产出新 Release tags。
- **PR 审核推进中**：两个核心 Open PR（#3225、#3222）均于昨日（7月11日）获得更新，但尚未合并入主线。
- **风险信号**：PR #3225 状态标记为 `[stale]`，若不及时交互可能面临自动关闭风险。

---

## 2. 版本发布
本日无新版本发布。

---

## 3. 项目进展
**合并状态**：暂无 PR 被合并至 `main` 分支，项目代码库今日未向前迈进。

**待审核核心 PR：**

- **PR #3225** `[OPEN] [stale]` — Support agent-specific runtime overrides  
  作者：@xdatafactor | 创建：2026-07-04 | 更新：2026-07-11  
  *摘要*：允许在 `agents.list` 条目中为每个 Agent 单独定义 `max_tokens`、`summarization thresholds` 和 `split_on_marker`，并在构建 `AgentInstance` 时应用这些逐 Agent 覆盖配置。同时清理了一个未使用的 `openai_compat` 导入。  
  *意义*：这是项目向**多 Agent 细粒度配置管理**迈出的重要架构演进信号，解决了硬编码全局配置无法满足差异化 Agent 行为的痛点。  
  [🔗 PR 链接](https://github.com/sipeed/picoclaw/pull/3225)

- **PR #3222** `[OPEN]` — refactor(deltachat): cleanup implementation, documentation -200LOC  
  作者：@trufae | 创建：2026-07-03 | 更新：2026-07-11  
  *摘要*：大幅重构 DeltaChat 后端，移除遗留特性、硬编码的 Relay 列表副本及基于密码的邮件配置（密码认证需完全迁移至 JSON-RPC）。重命名 `invite_link` 为 `join_invite_link`，新增 `show_invite_link`，并补充完整文档。  
  *意义*：该项目模块正在经历**技术债清理与安全基线提升**，拥抱 JSON-RPC 标准接口，代码量净减 200 行。  
  [🔗 PR 链接](https://github.com/sipeed/picoclaw/pull/3222)

---

## 4. 社区热点
今日未产生引发广泛讨论的热点 Issues 或 PRs（上述两个 PR 目前评论数均为 0，👍 数亦为 0）。

当前社区焦点完全集中在 #3225 和 #3222 两个待审核 PR 上，但缺乏讨论互动。这可能意味着：
- 社区正在等待核心维护者进行正式 Review 后再参与讨论。
- 贡献者内部可能通过其他渠道（如 Discord、内部备忘录）进行沟通。

建议关注者主动在这两个 PR 下留言表达使用场景或测试反馈，以推动审核进程。

---

## 5. Bug 与稳定性
本日无新 Bug 报告、崩溃反馈或回归问题。项目当前 `main` 分支运行状态稳定。

---

## 6. 功能请求与路线图信号
结合近期 PR 动态，项目路线图呈现以下演化趋势：

| 信号来源 | 演进方向 | 描述 |
|---|---|---|
| PR #3225 | **多 Agent 配置隔离** | 用户/贡献者开始要求 Agent 粒度的 `max_tokens`、截断阈值等运行时重载，这是 AI Agent 个性化部署的核心需求，极可能进入下一版本路线图。 |
| PR #3222 | **安全现代化与接口标准化** | 移除硬编码、弃用密码认证、拥抱 JSON-RPC。这符合 Personal AI 助手领域对用户隐私和数据安全的高要求。 |
| 新增 Feature Request | 无 | 本日无新增功能请求。 |

---

## 7. 用户反馈摘要
本统计周期内无来自 Issues 的用户直接反馈或痛点描述。

---

## 8. 待处理积压

以下议题需要维护者特别关注：

- **PR #3225** `[stale]`  
  - 状态：从 7月4日创建至昨日（7月11日）更新，已存在一周，标记为 `stale`。  
  - 风险：若维护者不尽快给出 Review 意见或作者不补充测试用例/说明（现有 Tests 仅包含 `go test ./pkg/config`），可能被自动化流程关闭。  
  - 建议：该功能对多 Agent 场景至关重要，建议在下一个 Sprint 中优先处理。  
  [🔗 跟踪链接](https://github.com/sipeed/picoclaw/pull/3225)

- **PR #3222**  
  - 状态：重构幅度大（-200LOC），涉及核心通讯模块的废弃与接口重命名。  
  - 风险：目前无反对票，但亦无明确 Maintainer Approve。一旦合并，下游用户需注意 `invite_link` → `join_invite_link` 的命名破坏性变更。  
  [🔗 跟踪链接](https://github.com/sipeed/picoclaw/pull/3222)

---

*数据抓取时间：2026-07-12 UTC* | *统计区间：过去24小时*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

好的，作为一名专注于 AI 智能体与个人助手领域的开源项目分析师，以下是根据你提供的 GitHub 数据生成的 QwenPaw 项目动态日报。

---

### QwenPaw 项目动态日报 | 2026-07-12

---

#### 1. 今日速览
QwenPaw 项目在经历 v2.0.0 重大版本发布后，进入了一个高强度的社区反馈与修复期。过去 24 小时（数据截止 2026-07-11），社区活跃度极高，共计产生 **23 条 Issue** 和 **7 条 PR**。尽管未有新版本 Release，但项目核心团队与社区贡献者对紧急问题的响应极快，已关闭了多项修复 PR。项目当前健康度处于 **“高风险、高响应”** 的过渡阶段，稳定性回归与数据兼容性修复是本周期的绝对主线。

---

#### 2. 版本发布
（今日无新版本发布）

---

#### 3. 项目进展
过去 24 小时，共合并/关闭 **4 个 PR**，另有 **3 个 PR** 处于待合并状态。项目已从最初的版本发布混乱期，高效地转向了有序的补丁输出阶段。

- **已合并/关闭的主要修复**
  - **深色模式 UI 修复（Critical）：** 贡献者 **@Marlin-Phone** 针对 **#5969**（深色模式下文字与背景颜色相近看不清）在短时间内连续提交并关闭了 4 个 PR（[#5970](https://github.com/agentscope-ai/QwenPaw/pull/5970), [#5971](https://github.com/agentscope-ai/QwenPaw/pull/5971), [#5973](https://github.com/agentscope-ai/QwenPaw/pull/5973), [#5974](https://github.com/agentscope-ai/QwenPaw/pull/5974)）。虽然其中有快速迭代的痕迹，但这体现了社区对阻塞性体验问题的高度关注与高效协作。

- **待合并的重要 PR**
  - **[#5953](https://github.com/agentscope-ai/QwenPaw/pull/5953): 工具结果截断优化（Holding）**：修复 `ToolResultLimiter` 对长工具结果的截断逻辑，将大结果持久化为 Artifact 文件。这是解决因超大工具结果导致上下文溢出（Scroll Overflow）的关键前序修复。
  - **[#5968](https://github.com/agentscope-ai/QwenPaw/pull/5968): 技能列表滚动加载修复**：首次贡献者 **@feng183043996** 提交，修复了 #5788 中技能列表显示 20 条后无法加载更多的问题。

---

#### 4. 社区热点
过去 24 小时内，社区讨论热度高度集中，围绕 v2.0.0 的回归问题形成了三大热点集群。

- **🔥 核心焦点：上下文压缩与消息孤儿化（评论量最高，影响最广）**
  - **#5960** 是今明的技术风暴中心，详细论证了 `_split_context_for_compression()` 会跨消息边界拆散 `tool_call` 和 `tool_result` 的配对，导致 API 400 错误。
  - 由此引发的连锁反应导致 **微信（#5962）** 和 **企业微信（#5957）** 用户在升级后频繁遇到 `Internal error`。
  - **诉求分析：** 这是当前架构中最致命的设计缺陷，直接摧毁了所有基于 Tool Calling 的会话稳定性。社区强烈要求团队优先重启该模块的架构审查。

- **💥 高危追踪：Windows 沙箱机制崩坏**
  - **#5951** 以极其详尽的复现步骤报告了 Windows 下 `pwsh` 窗口递归爆炸、消耗 20 GB 内存且无法关闭的严重 Bug。根因直指沙箱初始化时 `CREATE_NO_WINDOW` 等关键参数缺失。
  - **诉求分析：** 该问题导致 Windows 桌面端用户在 v2.0.0 下几乎完全不可用，是当前最紧急的用户侧技术债务。

- **🔄 数据迁移阵痛**
  - **#5964、#5967、#5956** 等多个 Issue 共同指向从 v1.x 升级到 v2.0.0 后的数据不兼容问题。旧格式的 Tool 结果（如文件工具）在反序列化时引发 Pydantic `ValidationError`，导致聊天记录无法加载。

---

#### 5. Bug 与稳定性
按严重程度排列今日报告的 Bug 清单：

- **严重崩溃 / 核心功能不可用**
  1. **[#5951] Windows 沙箱 pwsh 递归爆炸**：无当前修复 PR。严重性：Critical。
  2. **[#5960 / #5962 / #5957] 上下文压缩拆分 Tool Pair**：导致主流通道全线瘫痪。PR #5953 仅解决截断，不解决核心配对问题。严重性：Critical。
  3. **[#5965 / #5952] PyInstaller 打包缺失模块**：`agentscope.tool._builtin._scripts` 子模块未打包，导致 Auto-memory 和 Glob 工具崩溃。严重性：Critical。

- **中等严重 / 主要功能受损**
  1. **[#5956 / #5964 / #5967] 旧数据迁移导致 Pydantic 错误**：升级后聊天历史无法加载。无统一修复 PR。严重性：High。
  2. **[#5963] Shell 命令硬编码 60 秒超时**：配置项 `shell_command_timeout` 失效。严重性：High。
  3. **[#5961] v2.0.0 智能体循环执行**：Agent 陷入反复写入/删除的死循环。严重性：High。
  4. **[#5950] 中文 Embedding 截断错误**：按字符数而非 Token 数截断。严重性：Medium。
  5. **[#5954 / #5955] 权限系统设计争议**：用户认为智能模式与自动模式均不可用，请求白名单机制。严重性：Medium（体验类）。

- **低严重 / 修复中**
  1. **[#5969] 深色模式对比度**：已有批量 PR 修复（已合并/关闭），状态良好。

---

#### 6. 功能请求与路线图信号
- **高质量需求浮现：频道发送控制（#5976）**：用户希望精细控制 Channel 中工具调用结果的发送，并支持对长结果的截断显示（仅展示首尾）。这表明项目已进入复杂生产环境部署阶段，需要更强的可观测性与传输控制。
- **路线图判断**：鉴于堆积的严重 Bug，上述功能请求短期内不会进入 v2.0.x 补丁。建议团队整理一个 `v2.0 Roadmap Re-calibration` 的讨论，明确当前是“休战期”（修复 Bug）还是“消耗战”（边修边加）。OAuth 支持（#4124）和 Intel Mac 支持（#2664）已积压数月，需要给予社区明确的时间信号。

---

#### 7. 用户反馈摘要
- **“升级阵痛”是核心叙事**：几乎所有活跃 Issue 都源自 v2.0.0 的升级行为。用户普遍表达了“升级后无法正常工作”的强烈挫折感，尤其是在 Windows 和钉钉/企微/微信生态中。
- **权限系统遭遇阻力**：来自 #5955 的反馈非常具有代表性：“智能模式也是一遍遍审批”。用户明确表示希望引入**工具白名单模式**，以替代当前的审批流。这说明用户对高级权限管理的期望是“一次授权，永久可信”，而非逐次干预。
- **社区贡献力量凸显**：尽管 Bug 频发，但社区贡献质量很高。@Marlin-Phone 一人提交了 4 个修复深色模式的 PR，@feng183043996 作为首次贡献者提交了技能列表修复。这表明社区对项目的技术潜力依然高度认可，处于积极的共建状态。
- **情绪信号**：社区情绪以“积极反馈与督促修复”为主，尚未出现大规模的负面宣泄或被遗弃感。团队当下的响应速度是维持社区信心的基石。

---

#### 8. 待处理积压
- **严重阻塞项（需立刻响应）**
  - **[#5951] Windows 沙箱递归爆炸**：Windows 用户基数庞大，此问题对项目声誉影响最大。
  - **[#5960 / #5962] 上下文压缩核心逻辑 Bug**：最具传染性的 Bug，无它则无通道可用。建议由核心架构师直接认领。
  - **[#5965] PyInstaller 打包模块缺失**：对新用户来说是入门级 Bug，严重影响第一印象。

- **长期未响应项（需维护者表态）**
  - **[#4124] OpenAI OAuth 登录支持**：开启超过 2 个月，社区关注度持续上升，是否排期需要回应。
  - **[#2664] Intel Mac 支持**：开启超过 3 个月，需要明确硬件兼容性策略。

- **系统性建议**
  - 鉴于多个 Issue（#5956, #5964, #5967）均指向 v1.x 到 v2.0.0 的数据迁移兼容性问题，强烈建议发布一个 **“v2.0.0 数据迁移补丁”** 或 **数据库修复脚本**，集中解决旧格式数据反序列化问题，避免用户逐个提交工单。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

好的，作为 AI 智能体与个人 AI 助手领域开源项目分析师，以下是基于所提供数据生成的 2026-07-12 日 Hermes Agent 项目动态日报。

---

## Hermes Agent 项目动态日报 | 2026-07-12

### 1. 今日速览

项目迎来**超高强度**的社区互动，24 小时内共产生 237 条 Issue 更新和 500 条 PR 更新，呈现出爆发式活跃状态。然而，尽管 Issue 关闭率约 28%，但 PR 合并率仅有 4%（21/500），目前积压了 **479 个待审 PR**。整体来看，社区贡献热情极高，但维护者审阅力量已形成明显瓶颈，项目健康度处于“**高活跃、高风险**”状态。今日无新版本发布，团队正在全力消化大量的 Provider 兼容性与状态管理类 Bug 修复。

---

### 2. 版本发布

无新版本发布。

---

### 3. 项目进展

今日有 **21 个 PR** 被合并或关闭。从大量仍处于待合并状态的 PR 来看，项目修复方向高度集中在基础设施韧性、Provider 修复和 UI/UX 上。以下为代表性待合并 PR（推测将在近期合并）：

- **核心稳定性**：
  - `#60727` [fix(tui): WebSocket 心跳 + 自动重连](https://github.com/NousResearch/hermes-agent/pull/60727)：解决 TUI 在 macOS 休眠或 VPN 断开后静默挂起的问题。
  - `#60729` [fix(cron): 解耦心跳防止阻塞假死](https://github.com/NousResearch/hermes-agent/pull/60729)：确保定时任务线程不会因 I/O 阻塞而停止心跳更新。
- **Provider 兼容性**：
  - `#60701` [fix(daytona): 透传环境变量到沙箱](https://github.com/NousResearch/hermes-agent/pull/60701)：修复了 `terminal.env_passthrough` 配置在 Daytona 远端沙箱中不生效的问题。
  - `#60700` / `#60695` [fix(provider): 捕获 MiniMax 等流式 usage 缺失的 AttributeError](https://github.com/NousResearch/hermes-agent/pull/60695)：防止与 Anthropic 兼容但返回 `usage: null` 的 Provider 产生崩溃。
- **桌面端 / API**：
  - `#60733` [fix(desktop): 折叠侧边栏增加可视抓手](https://github.com/NousResearch/hermes-agent/pull/60733)：提升了左右侧边栏的可发现性。
  - `#60725` [fix(api-server): 原生会话端点遵守 `model_routes`](https://github.com/NousResearch/hermes-agent/pull/60725)：确保 API 路由别名在 `/api/sessions/.../chat` 端点生效。

**总体评估**：项目处于大规模稳定性修正周期，尤其在多 Provider 兼容性和 TUI/Desktop 的用户交互细节上取得了显著进展。

---

### 4. 社区热点

今日讨论最活跃的 Issue 集中体现了用户对多 Provider 集成的极高要求和对配置持久化的深度不满：

- **`#13484` [Feature: Native Google Vertex AI 支持](https://github.com/NousResearch/hermes-agent/issues/13484)**
  - **热度**：12 条评论，👍 14 个（全天最高赞）。
  - **分析**：用户目前无法通过 GCP Vertex AI 使用 Gemini 等模型，原代码中虽有 overlay 条目但缺乏完整的 OAuth 认证支持。这是当前社区呼声最高的功能空白。

- **`#47714` [Desktop/TUI 新建会话回退到 OpenRouter](https://github.com/NousResearch/hermes-agent/issues/47714)**
  - **热度**：9 条评论，👍 4 个。
  - **分析**：用户在 Desktop/TUI 配置了自定义 Provider 并新建会话后，Runtime 静默将 Provider 改写为 OpenRouter，导致 API 调用失效。同一配置在 Feishu 和 CLI 下可正常使用，暴露了不同 Gateway 实现的不一致性问题。

- **`#61265` [Hermes 向本地模型发送超大 Prompt 导致数分钟卡顿](https://github.com/NousResearch/hermes-agent/issues/61265)**
  - **热度**：6 条评论，👍 1 个。
  - **分析**：用户反馈即便是针对已经加载好的本地/小模型，Hermes 仍会构建出极其冗余的 Prompt，导致严重的推理延迟。这直接指向了 Agent 工作流中 Prompt 构建策略的高效性问题。

- **`#61487` [zai Provider 多 Key 池级联标记为耗尽](https://github.com/NousResearch/hermes-agent/issues/61487)**
  - **热度**：6 条评论。
  - **分析**：使用 `round_robin` 策略管理 Z.AI 的多个 API Key 时，一个 Key 触发了配额限制，会导致其他健康的 Key 在同一轮调用中被级联标记为不可用。这是一个典型的多 Key 管理竞态条件 Bug。

---

### 5. Bug 与稳定性

今天社区提交了大量 Bug，按严重程度排列如下：

#### Critical (P1) - 状态与数据安全
- **`#27038`** [Codex Responses API 重放 Session 消息 ID 字段过长被拒](https://github.com/NousResearch/hermes-agent/issues/27038)
- **`#32617`** [Provider 切换至 xAI 时加密内容重放导致 HTTP 400](https://github.com/NousResearch/hermes-agent/issues/32617)
- **`#54527`** [多 TUI 会话消息路由错误，用户输入永久丢失](https://github.com/NousResearch/hermes-agent/issues/54527) (P1, sweeper:risk-session-state)

#### High (P2) - 功能异常
- **`#28004`** [Telegram 输入指示器卡死（竞态条件）](https://github.com/NousResearch/hermes-agent/issues/28004) (sweeper:risk-message-delivery)
- **`#55790`** [移除 Provider 后，模型选择器未清理残留条目](https://github.com/NousResearch/hermes-agent/issues/55790)
- **`#52496`** [Dashboard 模型切换器将 `custom:*` 重写为 `openrouter`](https://github.com/NousResearch/hermes-agent/issues/52496)
- **`#17199`** [DeepSeek Provider 模型名归一化过强，导致无法使用自定义端点](https://github.com/NousResearch/hermes-agent/issues/17199)
- **`#61265`** [构造超大 Prompt 导致本地模型卡顿数分钟](https://github.com/NousResearch/hermes-agent/issues/61265)
- **`#61487`** [Z.AI Provider 多 Key 级联耗尽](https://github.com/NousResearch/hermes-agent/issues/61487)

#### Medium (P3) - 边缘情况
- **`#47970`** [GLM-5.2 Context Length 错误报告为 200K（应为 1M）](https://github.com/NousResearch/hermes-agent/issues/47970)
- **`#46947`** [邮件网关发出新邮件时无法设置主题](https://github.com/NousResearch/hermes-agent/issues/46947)
- **`#55902`** [Kimi K2.5 发送了不允许的 `timestamp` 字段导致 400 错误](https://github.com/NousResearch/hermes-agent/issues/55902)

---

### 6. 功能请求与路线图信号

除了修 Bug，社区也在为项目描绘更远大的蓝图。以下几个方向值得维护者关注：

- **即将落地 / 已有对应 PR**：
  - **企业云集成**: `#13484` (Google Vertex AI) 是社区最期待的功能。
  - **开发者工具链**: `#30640` 提出集成 Cursor SDK (Composer 2.5) 作为 Agent 编程工具。已有 `#60706`、`#60718` 等 PR 在扩展 MCP Catalog，预示着 Hermes MCP 生态正在蓬勃发展。
  - **本地化**: `#61526` (桌面版中文简体) 已标记为 `implemented-on-main`，预计下版本可用。

- **长期架构信号**：
  - **上下文管理进化**: `#513` (两阶段压缩：先修剪后总结，灵感源于 Kilocode) 和 `#62595` (主题感知压缩，防止多话题 DM 被混洗总结) 提示用户对上下文丢失非常敏感，希望更智能的管理。
  - **Agent 间协作**: `#17415` (可信内部触发器与角色交接) 是构建复杂 Multi-Agent 架构的核心需求。
  - **安全性增强**: `#27284` (Prompt 注入检测器需要覆盖更多绕过变体) 表明社区对 Agent 安全性有持续的追求。

---

### 7. 用户反馈摘要

从今天的 Issue 中，可以提炼出真实用户的主要痛点和使用场景：

| 用户痛点 | 具体表现 | 代表 Issue |
|---|---|---|
| **Provider 配置“玄学”** | 选好的模型/Provider 会随 Gateway 或操作而变化，感觉配置是“薛定谔的猫”。 | `#47714`, `#52496`, `#54741` |
| **上下文静默丢失** | 会话超时后，Agent 完全不通知用户就重新开始，导致牛头不对马嘴的回复。 | `#43008` |
| **工具协作局限** | 邮件、Telegram 等工具的 Subject / 行为硬编码，无法在编排工作中灵活使用。 | `#46947` |
| **基本环境受阻** | 由于 HTTP_PROXY 未被 LLM 客户端遵守，企业/校园网络用户几乎无法正常使用。 | `#5454` |

---

### 8. 待处理积压

项目当前面临的最大积压是那 **479 个待合并的 PR**，这已严重拖慢了 Bug 修复的速度。此外，以下是几个长期未获官方明确处理信号的高需求 Issue：

- **`#5454`** [Proxy 支持（P1, 2026-04-06）](https://github.com/NousResearch/hermes-agent/issues/5454)
  - **现状**：8 条评论，开放中。这是阻塞企业级用户的第一大基础功能。

- **`#13484`** [原生 Google Vertex AI 支持（P3, 2026-04-21）](https://github.com/NousResearch/hermes-agent/issues/13484)
  - **现状**：12 条评论，👍 14 个，开放中。需求极高，但可能因为实现难度或优先级被搁置。

- **`#513`** [两阶段上下文压缩（P3, 2026-03-06）](https://github.com/NousResearch/hermes-agent/issues/513)
  - **现状**：核心贡献者 @teknium1 提出，但无后续工程进展。

- **`#28004`** [Telegram 输入指示器卡死（P2, 2026-05-18）](https://github.com/NousResearch/hermes-agent/issues/28004)
  - **现状**：影响面广，涉及核心状态管理竞态，目前仅有社区讨论，未分配责任人。

**建议**：项目维护者应优先对 **479 个待合 PR** 进行冲刺式 review，或引入更多 Committer 来缓解审阅瓶颈，避免高贡献热情转化为高流失率。

</details>

---
*本日报由 [Big Model Radar](https://github.com/w409401768/big_model_radar) 自动生成。*