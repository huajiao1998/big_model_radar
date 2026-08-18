# OpenClaw 生态日报 2026-08-19

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-18 22:11 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-19

## 1. 今日速览

过去24小时内，OpenClaw 项目保持高活跃度：共产生 500 条 Issue 更新（其中新开/活跃 462 条，关闭 38 条）和 500 条 PR 更新（待合并 345 条，已合并/关闭 155 条）。今日无新版本发布，但 PR 合并/关闭率约 31%，说明维护团队正在积极消化积压。值得关注的是，多个高优先级（P1）Bug 已存在数周甚至数月仍未修复，且大量 Issue 被标记为 `clawsweeper-recovery-stuck`（恢复流程卡住），暗示自动化修复流程可能遇到瓶颈。整体来看，项目社区活跃度高，但**稳定性问题积压严重**，尤其是会话状态（session-state）和消息丢失（message-loss）类问题占比突出。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

今日合并/关闭的 PR 主要集中在 UI 修复、文档完善和特定后端修复，整体推进节奏平稳。以下为值得关注的已合并/关闭 PR：

| PR | 内容 | 影响 |
|---|---|---|
| [#126041](https://github.com/openclaw/openclaw/pull/126041) | **fix(ui): 垂直居中会话行操作按钮** | 修复侧边栏会话行中 pin 和溢出菜单按钮未垂直居中的 UI 问题 |
| [#126045](https://github.com/openclaw/openclaw/pull/126045) | **improve(ui): 为新会话选择器菜单添加标签** | 提升 New Session 界面可用性，消除选择器歧义 |
| [#126039](https://github.com/openclaw/openclaw/pull/126039) | **fix(canvas): 避免 widget 展示失败时出现陈旧面板** | 修复 macOS Canvas 节点面板在导航失败后展示陈旧内容的问题 |
| [#125966](https://github.com/openclaw/openclaw/pull/125966) | **fix(codex): 保持大型 AGENTS.md 指令可见** | 修复 Codex 后端在项目上下文超过 32 KiB 时静默丢失后续 AGENTS.md 指令的问题，OpenClaw 现在拥有 128 KiB 的有界上下文 |
| [#125961](https://github.com/openclaw/openclaw/pull/125961) | **fix(ollama): 中止后停止响应处理** | 修复 Ollama 响应钩子在请求中止后仍进入响应体处理的问题 |
| [#125949](https://github.com/openclaw/openclaw/pull/125949) | **fix: 阻止 --tag main 在 npm pack 期间失败** | 修复 `openclaw update --tag main` 命令在 npm 打包阶段失败的问题 |
| [#116489](https://github.com/openclaw/openclaw/pull/116489) | **feat(security): 安装策略警告需确认** | 新增安全功能：外部 `security.installPolicy` 命令可返回 `warn`，要求操作者确认可疑插件/技能安装 |

**项目整体向前迈进的判断**：今日合并的 PR 多为小规模修复和 UI 改进，没有重大功能落地。但 [#125966](https://github.com/openclaw/openclaw/pull/125966)（Codex AGENTS.md 指令可见性）和 [#116489](https://github.com/openclaw/openclaw/pull/116489)（安全确认机制）对长期稳定性和安全性有实质贡献。

---

## 4. 社区热点

今日讨论最活跃的 Issues 集中在**会话状态损坏**和**消息丢失**两大主题：

### 4.1 [#80319](https://github.com/openclaw/openclaw/issues/80319) — QA 测试套件混淆 Codex 原生工具与 OpenClaw 动态工具（17 评论）
> **标签**: P2, 🦪 silver shellfish
> **核心诉求**: 用户指出 QA 测试套件将 Codex 原生工作区工具与 OpenClaw 动态工具混为一谈，导致对 Codex 运行时工具掉线的误报。作者澄清了架构差异，但问题仍未关闭。

**分析**: 该 Issue 反映了测试基础设施与真实运行时行为之间的脱节，社区对测试可信度有疑虑。

### 4.2 [#112423](https://github.com/openclaw/openclaw/issues/112423) — 大型 SQLite 转录清理阻塞网关事件循环（15 评论）
> **标签**: P1, 🦞 diamond lobster, impact: session-state
> **核心诉求**: 归档大型 SQLite 转录时，完整物化、压缩、文件 I/O 和回读全部在网关线程上执行，导致事件循环阻塞。

**分析**: 这是典型的性能/稳定性问题，P1 级别且影响核心功能，社区关注度高。

### 4.3 [#62505](https://github.com/openclaw/openclaw/issues/62505) — Coding Agent 完全无法完成任务（回归）（15 评论）
> **标签**: P1, 🦞 diamond lobster, regression, clawsweeper-recovery-stuck
> **核心诉求**: 用户报告 Coding Agent 从 2026.4.2 之后出现回归，只输出模糊状态更新和道歉，不执行任何实际工作。

**分析**: 该 Issue 已存在超过 4 个月，被标记为 `clawsweeper-recovery-stuck`（恢复流程卡住），说明自动化修复未能解决，社区用户受影响时间长，**这是今日最值得关注的社区热点之一**。

### 4.4 [#38327](https://github.com/openclaw/openclaw/issues/38327) — Google Vertex/Gemini 3.1 Pro 报错 "Cannot convert undefined or null to object"（14 评论）
> **标签**: P1, 🐚 platinum hermit, regression
> **核心诉求**: 2026.3.2 版本更新后，使用 google-vertex/gemini-3.1-pro-preview 的嵌入式 Agent 在收到任何消息时都会报错。

**分析**: 该问题已存在 5 个月，影响特定模型提供商的用户，社区持续关注但修复进展缓慢。

---

## 5. Bug 与稳定性

以下按严重程度排列今日活跃的 Bug：

### 🔴 严重（P1，影响核心功能）

| Issue | 问题 | 状态 |
|---|---|---|
| [#62505](https://github.com/openclaw/openclaw/issues/62505) | Coding Agent 完全无法完成任务（回归，2026.4.2 起） | 开放，`clawsweeper-recovery-stuck` |
| [#112423](https://github.com/openclaw/openclaw/issues/112423) | 大型 SQLite 转录清理阻塞网关事件循环 | 开放，无 fix PR |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | Google Vertex/Gemini 3.1 Pro "Cannot convert undefined or null to object" | 开放，无 fix PR |
| [#125679](https://github.com/openclaw/openclaw/issues/125679) | Matrix 频道初始同步无限重启循环（回归，bisected 至 #125302） | 开放，今日新报告 |
| [#111498](https://github.com/openclaw/openclaw/issues/111498) | Anthropic 认证恢复后主 Agent 被持久工作区状态迁移阻塞 | 开放，无 fix PR |
| [#83959](https://github.com/openclaw/openclaw/issues/83959) | Codex app-server 启动重试在替换服务器就绪前耗尽 | 开放，`linked-pr-open` |
| [#91144](https://github.com/openclaw/openclaw/issues/91144) | Windows 原生 CLI 网关计划任务无法保持运行 | 开放，`linked-pr-open` |
| [#86612](https://github.com/openclaw/openclaw/issues/86612) | Docker 网关容器重启循环（OPENCLAW_SANDBOX=1 + OPENCLAW_HOME=/mnt/...） | 开放，无 fix PR |
| [#124788](https://github.com/openclaw/openclaw/issues/124788) | beta.2 网关事件循环每 ~10 分钟阻塞 ~100 秒 | 开放，今日活跃 |

### 🟡 中等（P1/P2，影响特定场景）

| Issue | 问题 | 状态 |
|---|---|---|
| [#84516](https://github.com/openclaw/openclaw/issues/84516) | Codex 长回复静默截断在 ~1000-1100 字符 | 开放，无 fix PR |
| [#88657](https://github.com/openclaw/openclaw/issues/88657) | DeepSeek V4 Flash 不完整回合（2026.5.27/28 回归） | 开放，无 fix PR |
| [#94939](https://github.com/openclaw/openclaw/issues/94939) | 6.x 状态迁移导致频道会话存储 SQLite 为空（0 字节） | 开放，`linked-pr-open` |
| [#90098](https://github.com/openclaw/openclaw/issues/90098) | 大附件处理导致浏览器/网关栈溢出 | 开放，`linked-pr-open` |
| [#90378](https://github.com/openclaw/openclaw/issues/90378) | 5.28→6.1 升级后 cron 存储静默迁移至 SQLite，新任务默认 announce 模式导致频道错误 | 开放，`linked-pr-open` |
| [#117609](https://github.com/openclaw/openclaw/issues/117609) | 嵌入式助手阶段不重试瞬时 LLM/网络错误，长回合整体失败 | 开放，无 fix PR |
| [#102534](https://github.com/openclaw/openclaw/issues/102534) | Cron 调度器定时器在重度超时后永久停止触发 | 开放，`clawsweeper-recovery-stuck` |
| [#92186](https://github.com/openclaw/openclaw/issues/92186) | 前台回复围栏取消已完成回复的投递（WhatsApp 群组） | 开放，`not-repro-on-main` |
| [#81484](https://github.com/openclaw/openclaw/issues/81484) | Discord 公会频道回复回归：畸形发送负载和重复外发循环 | 开放，无 fix PR |

### 🟢 较低（P2/P3）

| Issue | 问题 | 状态 |
|---|---|---|
| [#40001](https://github.com/openclaw/openclaw/issues/40001) | Write 工具无追加模式，隔离 cron 会话破坏共享文件 | 开放，无 fix PR |
| [#62328](https://github.com/openclaw/openclaw/issues/62328) | node:sqlite 缺少 FTS5 模块，内存搜索关键词回退失效 | 开放，`linked-pr-open` |
| [#90361](https://github.com/openclaw/openclaw/issues/90361) | 间歇性 memory_search "index metadata is missing" | 开放，`not-repro-on-main` |
| [#91223](https://github.com/openclaw/openclaw/issues/91223) | 主动记忆注入破坏提示缓存命中率（99.9% → 22%） | 开放，无 fix PR |
| [#41495](https://github.com/openclaw/openclaw/issues/41495) | Gemini 模型将内联按钮输出为原始 JSON 文本 | 开放，无 fix PR |

**关键发现**：今日活跃的 Bug 中，**约 60% 没有关联的 fix PR**，且多个 P1 级问题已存在数月。`clawsweeper-recovery-stuck` 标签在多个长期未修复的 Issue 上出现，说明自动化修复流程可能陷入死锁。

---

## 6. 功能请求与路线图信号

### 6.1 高潜力功能（已有 PR 或维护者关注）

| Issue/PR | 功能 | 信号 |
|---|---|---|
| [#125696](https://github.com/openclaw/openclaw/pull/125696) | **云机器选择器显示 CPU 和 RAM** | PR 已提交，`ready for maintainer look` |
| [#126049](https://github.com/openclaw/openclaw/pull/126049) | **文档：云 Workers 设置页面和机器选择器** | PR 已提交 |
| [#126027](https://github.com/openclaw/openclaw/pull/126027) | **审计：解释插件和远程操作** | PR 已提交，`waiting on author` |
| [#124059](https://github.com/openclaw/openclaw/pull/124059) | **UI：复制会话 ID 操作** | PR 已提交，`needs proof` |
| [#125143](https://github.com/openclaw/openclaw/pull/125143) | **CLI：允许直接推理时选择 Agent** | PR 已提交，`automerge armed` |
| [#125983](https://github.com/openclaw/openclaw/pull/125983) | **重构：从会话行中移除客户端可见的 activeRunIds** | PR 已提交，`waiting on author` |

### 6.2 社区呼声较高的功能请求

| Issue | 功能 | 分析 |
|---|---|---|
| [#10687](https://github.com/openclaw/openclaw/issues/10687) | **完全动态模型发现（OpenRouter 等）** | 9 评论，3 👍，P3 但社区持续关注，模型目录更新滞后是痛点 |
| [#60572](https://github.com/openclaw/openclaw/issues/60572) | **多槽位记忆架构** | 7 评论，3 👍，用户希望不同记忆提供者同时服务不同层次 |
| [#66252](https://github.com/openclaw/openclaw/issues/66252) | **每 Agent TTS/STT 配置覆盖** | 9 评论，1 👍，多语言场景需求 |
| [#79902](https://github.com/openclaw/openclaw/issues/79902) | **SQLite 转录/会话友好接口** | 14 评论，2 👍，高级用户希望基于规范运行时状态构建 |
| [#96975](https://github.com/openclaw/openclaw/issues/96975) | **子 Agent 完成与父上下文隔离** | 12 评论，1 👍，重型子 Agent 工作负载场景 |
| [#88032](https://github.com/openclaw/openclaw/issues/88032) | **Telegram 引用/回复上下文作为一等持久化入站契约** | 7 评论，1 👍，当前实现分散在 prompt 和运行时补丁两个表面 |

**路线图判断**：今日提交的多个 PR 集中在 **UI 改进**（机器选择器、会话 ID 复制、菜单标签）和**审计/安全**（插件操作解释、安装策略确认），暗示下一版本可能侧重可观测性和安全边界。动态模型发现（[#10687](https://github.com/openclaw/openclaw/issues/10687)）和多槽位记忆（[#60572](https://github.com/openclaw/openclaw/issues/60572)）是社区呼声较高的架构级功能，但短期内可能不会落地。

---

## 7. 用户反馈摘要

### 7.1 真实用户痛点

1. **Coding Agent 可靠性**（[#62505](https://github.com/openclaw/openclaw/issues/62505)）：用户 @drpau 描述其 Coding Agent 从 2026.4.2 后完全无法工作，"只输出模糊状态更新和道歉"。该问题已持续 4 个月，严重影响依赖自动化编码的用户。

2. **静默消息丢失**（[#84516](https://github.com/openclaw/openclaw/issues/84516)）：用户 @olegchatgpt401-sys 报告 Codex 长回复被静默截断在 ~1000-1100 字符，`stopReason` 和 `errorMessage` 均为 null，难以排查。

3. **升级迁移陷阱**（[#90378](https://github.com/openclaw/openclaw/issues/90378)）：用户 @olveww-dot 报告从 5.28 升级到 6.1 时，cron 存储静默迁移至 SQLite，且新任务默认 `delivery.mode=announce` 导致频道错误。用户对"静默迁移"表达了不满。

4. **共享文件数据丢失**（[#40001](https://github.com/openclaw/openclaw/issues/40001)）：用户 @altsoulkiller 报告隔离 cron 会话使用 `write` 工具覆盖共享工作区文件（如 `memory/YYYY-MM-DD.md`），导致静默数据丢失。

5. **性能退化**（[#91941](https://github.com/openclaw/openclaw/issues/91941)）：用户 @feie22 报告飞书流式卡片从后缀负载切换到全文更新后，长回复延迟显著增加。

### 7.2 用户满意点

- **UI 改进获得认可**：今日多个 UI 修复 PR（[#126041](https://github.com/openclaw/openclaw/pull/126041)、[#126045](https://github.com/openclaw/openclaw/pull/126045)）虽小但直接回应了用户对界面可用性的抱怨。
- **安全机制增强**：[#116489](https://github.com/openclaw/openclaw/pull/116489) 引入安装策略警告确认机制，社区对此类安全改进持积极态度。

### 7.3 不满意点

- **修复速度**：多个 P1 级 Bug 存在数月未修复（如 [#62505](https://github.com/openclaw/openclaw/issues/62505) 4 个月、[#38327](https://github.com/openclaw/openclaw/issues/38327) 5 个月），用户对修复周期表达了不满。
- **自动化修复流程卡住**：`clawsweeper-recovery-stuck` 标签在多个长期未修复 Issue 上出现，暗示自动化流程可能存在问题。

---

## 8. 待处理积压

以下为长期未响应或需要维护者关注的重要 Issue/PR：

### 🔴 紧急关注（P1，存在超过 2 个月）

| Issue | 问题 | 存在时间 | 状态 |
|---|---|---|---|
| [#62505](https://github.com/openclaw/openclaw/issues/62505) | Coding Agent 完全无法完成任务 | 4 个月+ | `clawsweeper-recovery-stuck` |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | Google Vertex/Gemini 3.1 Pro 报错 | 5 个月+ | 无 fix PR |
| [#40001](https://github.com/openclaw/openclaw/issues/40001) | Write 工具无追加模式导致数据丢失 | 5 个月+ | 无 fix PR |
| [#83959](https://github.com/openclaw/openclaw/issues/83959) | Codex app-server 启动重试耗尽 | 3 个月+ | `linked-pr-open` |
| [#84516](https://github.com/openclaw/openclaw/issues/84516) | Codex 长回复静默截断 | 3 个月+ | 无 fix PR |
| [#88657](https://github.com/openclaw/openclaw/issues/88657) | DeepSeek V4 Flash 不完整回合 | 2.5 个月+ | 无 fix PR |
| [#91144](https://github.com/openclaw/openclaw/issues/91144) | Windows 网关计划任务无法保持运行 | 2 个月+ | `linked-pr-open` |
| [#94939](https://github.com/openclaw/openclaw/issues/94939) | 6.x 迁移导致会话存储为空 | 2 个月+ | `linked-pr-open` |

### 🟡 需要维护者决策（P2/P3，存在超过 1 个月）

| Issue | 问题 | 存在时间 | 状态 |
|---|---|---|---|
| [#90098](https://github.com/openclaw/openclaw/issues/90098) | 大附件处理栈溢出 | 2.5 个月+ | `linked-pr-open` |
| [#90378](https://github.com/openclaw/openclaw/issues/90378) | cron 存储静默迁移问题 | 2.5 个月+ | `linked-pr-open` |
| [#91892](https://github.com/openclaw/openclaw/issues/91892) | Cron 任务在模型调用期间停滞 | 2 个月+ | `clawsweeper-recovery-stuck` |
| [#102534](https://github.com/openclaw/openclaw/issues/102534) | Cron 调度器永久停止触发 | 1 个月+ | `clawsweeper-recovery-stuck` |
| [#122625](https://github.com/openclaw/openclaw/issues/122625) | Matrix 房间目标无法解析会话路由 | 1 周 | 新报告，`linked-pr-open` |

### 🟢 长期未响应的 PR

| PR | 内容 | 状态 |
|---|---|---|
| [#117712](https://github.com/openclaw/openclaw/pull/117712) | Dependabot：actions 组 10 个更新 | 2.5 周+，`waiting on author` |
| [#120168](https://github.com/openclaw/openclaw/pull/120168) | Matrix E2EE 就绪绑定到客户端代次 | 1.5 周+，`waiting on author` |
| [#120443](https://github.com/openclaw/openclaw/pull/120443) | Codex 线程绑定读取修复 | 1.5 周+，`needs proof` |

---

## 总结

OpenClaw 项目今日社区活跃度高，但**稳定性问题积压严重**。核心关注点集中在：

1. **会话状态和消息丢失**类问题占比最高，且多个 P1 级 Bug 存在数月未修复
2. **自动化修复流程（clawsweeper）可能陷入死锁**，多个长期未修复的 Issue 被标记为 `recovery-stuck`
3. **UI 改进和安全机制增强**是今日 PR 的主要方向，暗示下一版本可能侧重可观测性和安全边界
4. **升级迁移的静默行为**引发用户不满，需要更好的迁移透明度和回退机制

建议维护者优先处理存在时间最长、影响面最广的 P1 级 Bug（如 [#62505](https://github.com/openclaw/openclaw/issues/62505)、[#38327](https://github.com/openclaw/openclaw/issues/38327)），并排查 `clawsweeper-recovery-stuck` 的根因。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-08-19**


## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态正处于**高活跃度与稳定性挑战并存**的快速迭代期。六大项目（OpenClaw、Zeroclaw、PicoClaw、QwenPaw、Hermes Agent、AstrBot）单日合计产生超过 1,000 条 Issue/PR 更新，社区参与度极高。然而，**稳定性问题普遍积压**——OpenClaw 多个 P1 级 Bug 存在超 4 个月未修复，QwenPaw 出现模型调用冻结超 10 分钟的核心故障，Hermes Agent 在 Windows 平台遭遇系统性安装/更新失败。与此同时，**安全加固成为各项目共同主线**：Zeroclaw 单日提交 5 个安全 PR，QwenPaw 将 shell 逃逸检测默认开启，OpenClaw 引入安装策略警告确认机制。生态整体呈现"功能扩展与稳定性修复并行、安全从可选走向默认"的态势。


## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 合并/关闭率 | 健康度评分 | 阶段判断 |
|---|---|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃 462，关闭 38） | 500（待合并 345，合并/关闭 155） | 无 | PR 31% | ★★★☆☆ | 高活跃，稳定性积压严重 |
| **Hermes Agent** | 424（新开/活跃 363，关闭 61） | 500（待合并 382，合并/关闭 118） | **v0.20.4** | PR 23.6% | ★★★★☆ | 高活跃，修复速度追赶报告速度 |
| **Zeroclaw** | 50（活跃 48，关闭 2） | 50（待合并 42，合并/关闭 8） | 无 | PR 16% | ★★★★☆ | 快速迭代，安全加固主线 |
| **QwenPaw** | 45（活跃 29，关闭 16） | 50（待合并 31，合并/关闭 19） | 无 | PR 38% | ★★★☆☆ | 高吞吐，严重 Bug 待排查 |
| **AstrBot** | 10（全部新增） | 8（全部待合并） | 无 | 0% | ★★★★☆ | 响应快，合并积压需关注 |
| **PicoClaw** | 6（活跃 5，关闭 1） | 4（待合并 2，关闭 2） | 无 | PR 50% | ★★★★☆ | 中等活跃，功能扩展与修复并行 |

**关键发现**：OpenClaw 和 Hermes Agent 在体量上远超其他项目（单日 500 条 PR 更新），但 OpenClaw 的合并/关闭率（31%）低于 Hermes Agent 的修复追赶速度。AstrBot 虽体量最小，但 Bug 报告与修复 PR 当日闭环率最高。


## 3. OpenClaw 在生态中的定位

**社区规模**：OpenClaw 以单日 500 条 Issue + 500 条 PR 的更新量稳居生态绝对头部，是第二名 Hermes Agent 的约 1.2 倍，是 Zeroclaw/QwenPaw 的 10 倍。其 Issue 编号已超过 12.6 万，反映出长期积累的庞大用户基数和问题池。

**技术路线差异**：
- **多后端支持广度领先**：OpenClaw 同时支持 Codex、Ollama、Google Vertex/Gemini、Anthropic、DeepSeek 等多种后端，且针对各后端有专门的适配层（如 #125966 修复 Codex 的 AGENTS.md 指令截断问题）
- **全平台覆盖**：涵盖 macOS、Windows 原生、Docker、Matrix 频道等，但 Windows 和 Docker 场景的稳定性问题也相应更多
- **自动化修复机制（clawsweeper）**：OpenClaw 独有的自动化修复流程，但当前多个 Issue 被标记为 `clawsweeper-recovery-stuck`，说明该机制可能陷入死锁

**相对短板**：与 Zeroclaw 相比，OpenClaw 在安全加固的响应速度上略显迟缓（Zeroclaw 单日 5 个安全 PR vs OpenClaw 1 个）；与 Hermes Agent 相比，OpenClaw 的版本发布节奏更慢（Hermes 今日发布 v0.20.4，OpenClaw 无新版本）。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **多模型/多 Provider 支持** | Zeroclaw（#9809 多模型 provider profile）、QwenPaw（#7062 per-agent reasoning_effort）、AstrBot（#9724 跨模型切换兼容性）、OpenClaw（多后端适配） | 用户期望在同一框架内灵活切换不同模型，且切换过程需保持上下文兼容性 |
| **WebUI/可视化界面** | PicoClaw（#806 WebUI 支持，8 👍 高优先级路线图）、AstrBot（#9718 日志搜索）、QwenPaw（#7072 后台任务列表 API） | 非技术用户对浏览器界面的需求持续升温，TUI/CLI 门槛成为采用瓶颈 |
| **安全加固与权限控制** | Zeroclaw（5 个安全 PR：凭据脱敏、SSRF 防护、子进程隔离）、QwenPaw（#7120 shell 逃逸检测默认开启、#7119 密钥文件权限）、OpenClaw（#116489 安装策略确认）、Hermes Agent（#82936 密钥隔离漏洞） | 安全正从"可选配置"走向"默认强制"，尤其是凭据管理和命令执行边界 |
| **会话状态持久化与恢复** | OpenClaw（session-state/message-loss 类问题占比最高）、Hermes Agent（#66887 多配置文件会话隔离）、QwenPaw（#7065 历史消息丢失） | 会话状态损坏、消息丢失、静默截断是跨项目的共性痛点 |
| **MCP 生态完善** | QwenPaw（#6470 SSE client 硬编码、#5900 无自动重连、#7053 OAuth2 轮换）、Zeroclaw（provider 回退链修复） | MCP 传输层稳定性、OAuth2 持久化、自动重连是当前重点 |
| **Windows 平台支持** | Hermes Agent（3 个 P1 Windows 问题）、Zeroclaw（#7462 74 个测试失败）、AstrBot（#9734 SVG MIME 类型） | Windows 作为主要开发平台，安装/更新/路径语义问题系统性存在 |


## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent | Zeroclaw | QwenPaw | PicoClaw | AstrBot |
|---|---|---|---|---|---|---|
| **功能侧重** | 全功能个人 AI 助手（多后端、多频道、Canvas UI） | 桌面优先的 Agent 框架（Bot Mode、Kanban 调度器） | 安全优先的自主 Agent（SOP 引擎、硬件插件） | 多智能体协作 + 企业级控制平面 | 轻量级协议兼容层（Anthropic 原生 API） | 聊天机器人框架（多平台消息接入） |
| **目标用户** | 技术爱好者、多后端重度用户 | 桌面端开发者、多配置文件高级用户 | 安全敏感型企业用户、SOP 驱动的工作流 | 多智能体协作团队、企业用户 | 使用 Anthropic 代理服务的轻量用户 | 聊天机器人运营者、插件生态用户 |
| **技术架构** | 多后端适配层 + 自动化修复（clawsweeper） | 桌面应用 + 多路复用网关 + Kanban 调度器 | Rust 实现 + SOP 引擎 + 硬件抽象层 | 桌面 + Console + MCP 深度集成 | 轻量级单二进制 + 协议前缀扩展 | Python 插件架构 + Provider 抽象层 |
| **社区规模** | 绝对头部（日 500+500） | 第二梯队（日 424+500） | 中型（日 50+50） | 中型（日 45+50） | 小型（日 6+4） | 小型（日 10+8） |
| **核心优势** | 生态最丰富、后端支持最广 | 桌面体验佳、修复速度快 | 安全设计领先、SOP 功能独特 | 多智能体协作、MCP 集成深 | 协议兼容灵活、轻量易部署 | 插件生态活跃、响应速度快 |
| **核心短板** | 稳定性积压严重、修复周期长 | Windows 体验差、安装脚本争议 | Windows 测试覆盖缺失、大型 PR 合并慢 | 严重 Bug（冻结/中断）响应慢 | WebUI 长期缺失、功能范围有限 | PR 合并积压、大型功能推进慢 |


## 6. 社区热度与成熟度分层

### 第一梯队：高活跃、大规模（日更新 > 400 条）
- **OpenClaw**：生态绝对头部，但处于"高活跃度与稳定性积压并存"阶段。大量 P1 Bug 存在数月未修复，自动化修复流程可能陷入死锁，需警惕用户信任度流失。
- **Hermes Agent**：处于"修复速度追赶报告速度"的良性循环。今日发布 v0.20.4 聚合 74 个 PR，Kanban 恢复机制的系统性修复表明项目正从"逐个打补丁"转向"结构性解决"。

### 第二梯队：中活跃、快速迭代（日更新 40-50 条）
- **Zeroclaw**：处于"安全加固 + SOP 功能成熟"的快速迭代期。RFC 质量高（Goal mode v1 获 22 评论），但大型 PR 合并周期长（多个 size:XL 卡在 `needs-author-action`）。
- **QwenPaw**：处于"高吞吐修复与功能并行"阶段。新贡献者友好度高（多个 first-time-contributor PR 被积极 review），但严重 Bug（模型冻结、任务中断）尚无 fix，需优先响应。

### 第三梯队：小规模、质量巩固（日更新 < 15 条）
- **PicoClaw**：处于"功能扩展与稳定性修复并行"阶段。Anthropic 原生 API 支持落地是重要里程碑，但 WebUI 高优需求积压近 6 个月，需给出阶段性进展以维持社区信任。
- **AstrBot**：处于"问题发现-修复良性循环"阶段。Bug 报告与修复 PR 当日闭环率高，但 PR 合并积压（2 个悬置超 2 个月）和时效性需求（NVIDIA API 弃用仅剩 5 天）需关注。


## 7. 值得关注的趋势信号

### 信号一：安全从"可选"走向"默认强制"
Zeroclaw 单日 5 个安全 PR、QwenPaw 将 shell 逃逸检测默认开启、OpenClaw 引入安装策略警告确认——三个独立项目在同一天内推进安全默认化，表明**安全加固已成为个人 AI 助手的竞争基线**而非差异化优势。对开发者的启示：在设计 Agent 框架时，应将凭据管理、命令执行边界、子进程隔离作为第一公民特性，而非事后补充。

### 信号二：会话状态可靠性成为核心信任瓶颈
OpenClaw 的 session-state/message-loss 问题占比最高，QwenPaw 出现历史消息丢失，Hermes Agent 面临多配置文件会话隔离漏洞——**会话状态损坏和消息丢失正在侵蚀用户对 Agent 的信任**。对开发者的启示：会话持久化、原子状态迁移、静默失败检测应作为架构设计的核心考量，而非边缘优化项。

### 信号三：多模型工作流需求爆发，但兼容性处理粗糙
AstrBot 用户报告跨模型切换后 400 错误，Zeroclaw 推出多模型 provider profile，QwenPaw 用户要求 per-agent reasoning_effort 覆盖——**用户已开始将多模型切换作为日常操作**，但历史上下文（尤其是 reasoning 数据）的跨模型兼容性处理仍不成熟。对开发者的启示：模型切换不应只是配置变更，需要设计上下文适配层来处理不同模型的格式差异。

### 信号四：Windows 平台体验成为系统性短板
Hermes Agent 3 个 P1 Windows 问题（更新失败、git 检出冲突、桌面应用打包缺失）、Zeroclaw 74 个测试失败、AstrBot SVG MIME 类型错误——**Windows 作为主要开发平台，其安装/更新/路径语义问题在多个项目中系统性存在**。对开发者的启示：CI 应增加 Windows runner，安装/更新链路需要专门的跨平台测试矩阵。

### 信号五：自动化修复机制需要"修复机制本身"
OpenClaw 的 clawsweeper 自动化修复流程被多个 Issue 标记为 `recovery-stuck`，Zeroclaw 的 SOP 引擎出现执行顺序缺陷——**当自动化修复机制本身陷入死锁时，反而会延长问题解决周期**。对开发者的启示：自动化修复流程需要设计"熔断机制"和"人工接管路径"，避免自动化成为新的瓶颈。

### 信号六：WebUI 从"锦上添花"变为"采用门槛"
PicoClaw 的 WebUI 请求获 8 👍 并标记为高优先级路线图，QwenPaw 新增后台任务列表 API，AstrBot 用户要求日志搜索——**非技术用户对浏览器界面的需求已从"可选增强"变为"采用前提"**。对开发者的启示：TUI/CLI 优先的设计哲学正在面临 WebUI 需求的挑战，需在架构早期预留 Web 前端接口。

---

*报告完*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-19

> 数据来源：github.com/zeroclaw-labs/zeroclaw | 统计周期：2026-08-18 至 2026-08-19

---

## 1. 今日速览

过去 24 小时项目保持**高活跃度**：Issues 更新 50 条（48 条活跃/新开，2 条关闭），PR 更新 50 条（42 条待合并，8 条已合并/关闭）。**安全与稳定性是今日主线**——新增 5 个安全相关 PR（Anthropic 凭据脱敏、响应缓存权限加固、硬件插件子进程隔离、Docker 非 root 镜像 CI 强制、SSRF 防护），同时 2 个 P0/P1 级 Bug 仍在处理中（SOP 引擎执行顺序缺陷 #10066、超大工具结果不可恢复 #10067）。**无新版本发布**，但 8 个 PR 已合并/关闭，包括 WhatsApp 审批令牌守卫、SOP 定义加载路径修复、provider 回退链修复等。值得关注的是，**安全文档与 CI 实际行为不一致**（#10074）和 **Windows 测试失败**（#7462）两个长期问题仍在推进中。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

今日合并/关闭的 8 个 PR 中，以下 3 个具有里程碑意义：

| PR | 标题 | 影响 |
|---|---|---|
| [#9612](https://github.com/zeroclaw-labs/zeroclaw/pull/9612) | fix(channels): tie the WhatsApp Cloud approval token to a guard so no exit orphans it | **安全修复**：修复 WhatsApp 审批令牌在异常退出时残留的问题，防止令牌孤儿化导致的安全漏洞 |
| [#9765](https://github.com/zeroclaw-labs/zeroclaw/pull/9765) | fix(sop): load SOP definitions from the shared workspace, not data_dir | **架构修复**：SOP 定义加载路径从 data_dir 修正为共享 workspace，解决多实例部署下的定义不一致问题 |
| [#9544](https://github.com/zeroclaw-labs/zeroclaw/pull/9544) | fix(delegate): honor configured provider fallbacks | **可靠性提升**：委托调用现在遵循配置的 provider 回退链，不再绕过别名、路由、重试和回退候选 |

此外，[#8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713)（file_download SSRF 防护）和 [#10060](https://github.com/zeroclaw-labs/zeroclaw/pull/10060)（ZeroCode 仪表盘状态值对齐）也已关闭。

**整体判断**：项目在安全加固、SOP 引擎正确性、provider 可靠性三个方向均有实质推进。特别是 SOP 相关修复（#9765 + #9841 待合并）表明该功能正在快速成熟。

---

## 4. 社区热点

### 最热 Issue：Goal mode v1 RFC（#8303，22 评论）

[#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) — RFC: Goal mode v1 — bounded foreground Matrix work

- **作者**：@vrurg | **创建**：2026-06-24 | **更新**：2026-08-18
- **诉求**：为 ZeroClaw 增加跨多轮对话的持久化目标追踪能力，但明确将重启交接、多频道准入、Web 和异步子任务从首版交付中剥离
- **分析**：这是项目路线图中最重要的功能之一。22 条评论表明社区对"有界目标模式"的设计边界有强烈关注。作者刻意缩小首版范围，说明团队在控制复杂度——这是健康的信号。

### 次热 Issue：高危 shell 命令确认机制（#7155，22 评论）

[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) — RFC: Add a per-execution confirmation tier for high-risk shell commands

- **作者**：@NiuBlibing | **创建**：2026-06-03 | **更新**：2026-08-18
- **诉求**：为高危 shell 命令增加逐次执行确认机制，并引入 Claude Code 风格的 allow/ask/deny 命令策略
- **分析**：该 RFC 已迭代至 Revision 3，范围已收敛至 shell 策略契约。安全相关的设计讨论持续高热，反映用户对 agent 自主执行命令的安全顾虑。

### 最热 PR：多模型 provider 支持（#9809）

[#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) — feat(providers): support multiple models per provider profile

- **作者**：@NiuBlibing | **创建**：2026-08-07 | **更新**：2026-08-18
- **状态**：待合并，标记 `needs-author-action`，size:XL
- **分析**：允许单个 provider profile（一个凭据 + 端点）承载多个模型，每个模型独立配置 ID 和调优参数。这是对现有配置模型的重大扩展，若合并将显著提升多模型工作流的灵活性。

---

## 5. Bug 与稳定性

### P0 级

| Issue | 标题 | 状态 | Fix PR |
|---|---|---|---|
| [#10066](https://github.com/zeroclaw-labs/zeroclaw/issues/10066) | SOP engine promotes and runs later steps before recording a step's output-schema rejection | 已接受，待处理 | 无 |
| | **影响**：S1 工作流阻塞。当步骤输出 schema 校验失败时，后续步骤仍被执行，拒绝记录反而滞后。这可能导致基于无效数据执行后续操作。 | | |

### P1 级

| Issue | 标题 | 状态 | Fix PR |
|---|---|---|---|
| [#10067](https://github.com/zeroclaw-labs/zeroclaw/issues/10067) | One oversized tool result is unrecoverable — shell output cap is a 1 MB memory bound, not a context bound | 已接受，待处理 | 无 |
| | **影响**：S2 降级。单个工具结果超过模型上下文窗口时，整个回合直接失败而非优雅降级。 | | |
| [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | 74 test failures on Windows — Unix-only test commands, path semantics, console encoding | 已接受，长期跟踪 | 无 |
| | **影响**：Windows 平台测试套件 74 个失败，CI 仅跑 Linux 未捕获。 | | |
| [#9832](https://github.com/zeroclaw-labs/zeroclaw/issues/9832) | zeroclaw-hardware fails to compile with --features hardware: unresolved import aardvark_sys::AardvarkHandle | 进行中 | [#9853](https://github.com/zeroclaw-labs/zeroclaw/pull/9853) 待合并（删除 aardvark-sys） |
| [#9919](https://github.com/zeroclaw-labs/zeroclaw/issues/9919) | fix(memory): reject Qdrant in builder-only factory without storage config | 进行中 | 无 |

### 今日新增 Bug

- [#10074](https://github.com/zeroclaw-labs/zeroclaw/issues/10074) — SECURITY.md 文档描述了一个 4 月已移除的 CI 任务，容器检查已变为约定而非强制。**已有对应 PR**：[#10095](https://github.com/zeroclaw-labs/zeroclaw/pull/10095) 重新引入 Docker 非 root 镜像 CI 强制检查。

### 稳定性趋势

今日合并的 [#9612](https://github.com/zeroclaw-labs/zeroclaw/pull/9612)（WhatsApp 令牌守卫）和 [#9544](https://github.com/zeroclaw-labs/zeroclaw/pull/9544)（provider 回退链）均属稳定性修复。**SOP 引擎相关 Bug 集中出现**（#10066 + #9841 PR），表明该功能正处于密集打磨期。

---

## 6. 功能请求与路线图信号

### 高概率进入下一版本

| 功能 | 来源 | 判断依据 |
|---|---|---|
| **多模型 provider profile** | [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) | 大型 PR（size:XL），principal contributor，已迭代多轮 |
| **SOP 无头运行** | [#9841](https://github.com/zeroclaw-labs/zeroclaw/pull/9841) | 修复 5 个审查发现的问题，与 #10066 直接相关 |
| **Agent 可移植导出** | [#9986](https://github.com/zeroclaw-labs/zeroclaw/pull/9986) | 新增 `zeroclaw agents export` 命令，打包 manifest + 配置 + workspace |
| **会话级持久化提示附件** | [#9998](https://github.com/zeroclaw-labs/zeroclaw/issues/9998) | RFC 已提出，4 评论，涉及多域（agent/channel/memory/security） |

### 值得关注的路线图信号

- **Goal mode v1**（[#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)）：22 评论的高热度 RFC，设计已收敛，预计近期会有实现 PR
- **Slash 命令注册表统一**（[#7929](https://github.com/zeroclaw-labs/zeroclaw/issues/7929)）：跨 Web UI、ZeroCode TUI、channel runtime 统一命令注册，架构改进信号
- **本地化边界审计**（[#9972](https://github.com/zeroclaw-labs/zeroclaw/issues/9972)）：系统性消除绕过 Fluent 本地化的用户可见输出，配套 PR [#10014](https://github.com/zeroclaw-labs/zeroclaw/pull/10014) 已提交

---

## 7. 用户反馈摘要

### 真实痛点

1. **Windows 支持仍是短板**（[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)）：74 个测试失败，CI 不覆盖 Windows。用户 @NiuBlibing 在简体中文 Windows 11 + 代码页 936 环境下复现，涉及 Unix-only 命令、路径语义和控制台编码问题。

2. **大输出处理不优雅**（[#10067](https://github.com/zeroclaw-labs/zeroclaw/issues/10067)）：单次工具结果超过上下文窗口时直接失败，用户期望降级而非崩溃。

3. **SOP 执行顺序缺陷**（[#10066](https://github.com/zeroclaw-labs/zeroclaw/issues/10066)）：输出 schema 校验失败后后续步骤仍执行，可能导致基于无效数据的连锁操作。

4. **DingTalk 频道延迟**（[#8228](https://github.com/zeroclaw-labs/zeroclaw/issues/8228)）：长响应需等待完整生成后才推送，用户期望流式输出。

5. **内存状态显示误导**（[#9896](https://github.com/zeroclaw-labs/zeroclaw/issues/9896)）：实际使用 sqlite 后端时，状态横幅仍显示 `Memory: none`，影响用户对系统状态的判断。

### 使用场景

- **频道运营团队**（[#8134](https://github.com/zeroclaw-labs/zeroclaw/issues/8134)）：通过 Slack/Telegram 等频道运营的团队需要 `session_ttl_hours` 自动清理过期会话，以减少 token 消耗和响应延迟
- **NAT/CGNAT 环境用户**（[#8358](https://github.com/zeroclaw-labs/zeroclaw/issues/8358)）：zerorelay 中继节点项目受到关注，用户需要穿透 NAT 访问 daemon
- **长时间 SOP 审查**（[#9928](https://github.com/zeroclaw-labs/zeroclaw/issues/9928)）：审查型 SOP 步骤可能运行 30-90 分钟，仪表盘需要实时活动展示而非仅步骤切换

---

## 8. 待处理积压

### 长期未响应的重要 Issue

| Issue | 标题 | 创建时间 | 最后更新 | 备注 |
|---|---|---|---|---|
| [#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) | 高危 shell 命令确认机制 RFC | 2026-06-03 | 2026-08-18 | 已迭代至 Revision 3，范围已收敛，等待实现 |
| [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | Windows 74 测试失败 | 2026-06-10 | 2026-08-18 | 已接受，但无明确修复计划 |
| [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) | Goal mode v1 RFC | 2026-06-24 | 2026-08-18 | 22 评论高热度，设计已收敛，等待实现 |
| [#8358](https://github.com/zeroclaw-labs/zeroclaw/issues/8358) | zerorelay 中继节点里程碑 | 2026-06-26 | 2026-08-18 | 里程碑 tracker，涉及 NAT 穿透 |

### 需要维护者关注的 PR

| PR | 标题 | 阻塞原因 |
|---|---|---|
| [#9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746) | per-agent ownership scoping for session tools | 标记 `needs-author-action`，size:XL，涉及安全域 |
| [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) | 多模型 provider profile | 标记 `needs-author-action`，size:XL，principal contributor |
| [#9841](https://github.com/zeroclaw-labs/zeroclaw/pull/9841) | 驱动无头 SOP 运行 | 标记 `needs-author-action`，size:XL，修复 5 个审查发现 |
| [#10038](https://github.com/zeroclaw-labs/zeroclaw/pull/10038) | 拒绝无效 session_target | 标记 `do-not-merge`，需维护者明确解除条件 |

### 风险提示

- **安全文档与 CI 脱节**（[#10074](https://github.com/zeroclaw-labs/zeroclaw/issues/10074)）：SECURITY.md 描述的 CI 任务已移除，虽有 [#10095](https://github.com/zeroclaw-labs/zeroclaw/pull/10095) 修复，但需确保文档与 CI 长期同步
- **Windows 测试覆盖缺失**：CI 仅跑 Linux，Windows 问题持续积累，建议评估在 CI 中增加 Windows runner

---

## 项目健康度评估

| 维度 | 评分 | 说明 |
|---|---|---|
| **活跃度** | ★★★★★ | 50 Issues + 50 PRs 日更新，社区参与度高 |
| **安全性** | ★★★★☆ | 今日 5 个安全 PR，但 P0/P1 安全 Bug 仍有积压 |
| **稳定性** | ★★★☆☆ | SOP 引擎缺陷、Windows 测试失败、超大输出崩溃等问题待解决 |
| **路线图清晰度** | ★★★★☆ | Goal mode、多模型 provider、SOP 无头运行方向明确 |
| **维护响应** | ★★★★☆ | 多数 Issue 有维护者响应，但部分 PR 卡在 `needs-author-action` |

**总结**：Zeroclaw 处于快速迭代期，安全加固和 SOP 功能成熟是当前主线。社区讨论热度高，设计文档（RFC）质量好。主要风险在于 Windows 支持短板和部分大型 PR 的合并周期较长。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报

**日期：2026-08-19** | **数据窗口：过去 24 小时**


## 1. 今日速览

PicoClaw 在过去 24 小时内保持中等活跃度：共产生 6 条 Issue 更新（5 条活跃、1 条关闭）和 4 条 PR 更新（2 条待合并、2 条已关闭）。社区讨论焦点集中在 **WebUI 支持**（#806，9 条评论）和 **IRC 长消息处理**（#3287，6 条评论）两个方向。值得关注的是，今日关闭的 PR #1158（Anthropic 原生 API 协议支持）是自 3 月以来的长期 PR，其合并标志着协议兼容层的重要进展。此外，两个与配置项失效相关的 Issue（#3328）和 PR（#3329）形成闭环，显示维护者对配置正确性的重视。整体来看，项目处于**功能扩展与稳定性修复并行**的阶段，社区参与度健康。


## 2. 版本发布

**无新版本发布。** 当前最新版本仍为 0.3.1（commit 2cf030d2），该版本在多个 Issue 中被用户引用。


## 3. 项目进展

今日合并/关闭的 PR 中，**PR #1158 的合并是重要里程碑**：

| PR | 状态 | 内容 | 意义 |
|---|---|---|---|
| [#1158](https://github.com/sipeed/picoclaw/pull/1158) | ✅ 已合并 | 新增 `anthropic-messages` 协议前缀，支持 Anthropic 原生 Messages API 格式（`/v1/messages` 端点） | 解决了 #269 中"仅支持 Anthropic 原生 API 格式的服务无法使用"的问题，扩展了兼容的 LLM 服务范围，对使用各类 Anthropic 代理服务的用户是实质性利好 |
| [#3317](https://github.com/sipeed/picoclaw/pull/3317) | ✅ 已合并 | 在 LLM 响应调试输出中记录 prompt cache tokens | 提升可观测性，便于用户监控 DeepSeek 等提供商的缓存命中情况，对成本优化有辅助价值 |

**项目整体向前推进的评估：** 协议兼容层的扩展（#1158）是自 3 月以来的长期 PR，其合并填补了 Anthropic 原生 API 支持的空白；缓存 token 日志（#3317）则是对现有可观测性能力的小步快跑式增强。两者合计，项目在"服务兼容广度"和"运行可观测性"两个维度均有可见进展。


## 4. 社区热点

### 🔥 最热 Issue：#806 — WebUI 支持（9 条评论，8 👍）

> 链接：https://github.com/sipeed/picoclaw/issues/806

**状态：** OPEN，标记为 `enhancement` / `priority: high` / `roadmap`，作者 @Zepan 于 2026-02-26 创建，最近更新于 2026-08-18。

**诉求分析：** 该 Issue 提出为 PicoClaw 开发 Web UI，以降低非技术用户的使用门槛。作者明确指出"TUI 对终端用户友好，但浏览器界面才是'非技术'用户管理 PicoClaw 实例最直观的路径"。值得注意的是，该 Issue 已存在近 6 个月，且被标记为 `roadmap` 和 `priority: high`，但至今仍无对应 PR 出现。结合 Issue 标题中的 "(Refactoring now)" 推测，可能已有内部重构在进行中。8 个 👍 和 9 条评论表明社区对此功能有持续且明确的需求。

### 💬 次热 Issue：#3287 — IRC 长消息支持（6 条评论）

> 链接：https://github.com/sipeed/picoclaw/issues/3287

**状态：** OPEN，作者 @superuser-does 于 2026-07-22 创建。

**诉求分析：** 用户希望 PicoClaw 能将 IRCv3 中因 512 字节限制而被客户端自动拆分的长消息视为单一完整消息。这反映了 IRC 通道用户在处理长文本（如代码片段、长日志）时的实际痛点——当前拆分导致消息碎片化，影响对话上下文理解。


## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列如下：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 🟠 中 | [#3339](https://github.com/sipeed/picoclaw/issues/3339) | **Antigravity 生成请求返回通用 429 错误**：OAuth 认证和模型发现均正常，但所有生成请求返回 `RESOURCE_EXHAUSTED`，响应中无配额详情 | 新报告（08-17），无 fix PR |
| 🟡 低 | [#3328](https://github.com/sipeed/picoclaw/issues/3328) | **`line.settings.webhook_host` / `webhook_port` 配置项无效**：配置结构中有声明、有默认值、有文档，但代码中无任何读取逻辑，设置后无效果且无警告 | 已有对应 PR [#3329](https://github.com/sipeed/picoclaw/pull/3329)（待合并） |
| 🟡 低 | [#3301](https://github.com/sipeed/picoclaw/issues/3301) | **`/clear` 命令和会话自动压缩在非默认 agent 的 dispatch 路由下失效**：影响 Discord/Telegram 通道 | 待处理 |
| ⚪ 已解决 | [#3292](https://github.com/sipeed/picoclaw/issues/3292) | **聊天界面输入框选中时 CPU 占用过高**（Firefox/Web 端） | ✅ 已关闭（08-18） |

**分析：** 今日无高危崩溃类 Bug。最值得关注的是 #3339（Antigravity 429），该问题影响 Google Antigravity 用户的正常使用，且错误信息缺乏可操作性，建议维护者优先排查。配置项失效类问题（#3328）已有修复 PR 待合并，闭环在即。


## 6. 功能请求与路线图信号

| 功能请求 | 来源 | 热度 | 纳入下一版本的可能性 |
|---|---|---|---|
| **WebUI 支持** | [#806](https://github.com/sipeed/picoclaw/issues/806) | 8 👍 / 9 评论，标记 `priority: high` + `roadmap` | ⭐⭐⭐⭐⭐ 高。已明确列入路线图，且标题标注 "Refactoring now"，预计在架构重构完成后启动 |
| **IRC 长消息合并** | [#3287](https://github.com/sipeed/picoclaw/issues/3287) | 6 条评论 | ⭐⭐⭐ 中。需求明确（IRCv3 消息拆分合并），实现难度中等，但需考虑与现有消息处理管线的兼容 |
| **Anthropic 原生 API 支持** | PR [#1158](https://github.com/sipeed/picoclaw/pull/1158)（已合并） | — | ✅ 已落地，随下一版本发布 |

**信号解读：** WebUI 是当前社区呼声最高的功能，且已被官方标记为高优先级路线图项。IRC 长消息处理是细分场景需求，但讨论热度不低。此外，PR #3314（customAllowPatterns 修复）和 #3329（webhook 配置警告）虽为 Bug 修复，但都涉及配置系统可靠性，预计会随下一补丁版本发布。


## 7. 用户反馈摘要

从今日活跃的 Issues 评论中提炼的用户声音：

- **配置项"静默失效"问题引发不满**（#3328）：用户 @qing-wang 指出 `webhook_host` / `webhook_port` 配置项"存在但无消费者"，设置后无效果且无任何警告。这种"文档写了、配置项存在、但实际不生效"的体验对用户信任度伤害较大。PR #3329 的修复方案是"警告而非静默"，方向正确。

- **IRC 长消息拆分影响实际使用**（#3287）：用户 @superuser-does 描述了具体场景——IRC 客户端因 512 字节限制自动拆分消息，PicoClaw 将拆分后的片段视为独立消息，导致上下文断裂。这是协议限制与用户体验之间的典型冲突。

- **WebUI 需求持续升温**（#806）：8 个 👍 和 9 条评论表明社区对浏览器界面的需求是真实且持续的。评论中可能包含对 TUI 使用门槛的具体抱怨，以及对 WebUI 功能范围的期待。

- **CPU 占用问题已解决**（#3292）：该 Issue 今日关闭，用户报告的"输入框选中时 CPU 占用高"问题（Firefox/Web 端）已得到处理，属于正向反馈。


## 8. 待处理积压

以下为长期未响应或需维护者关注的重要事项：

| 事项 | 类型 | 创建时间 | 等待时长 | 备注 |
|---|---|---|---|---|
| [#806](https://github.com/sipeed/picoclaw/issues/806) WebUI 支持 | 功能请求 | 2026-02-26 | **近 6 个月** | 标记 `priority: high` + `roadmap`，但无对应 PR。标题标注 "Refactoring now"，建议维护者同步进展，避免社区等待焦虑 |
| [#3287](https://github.com/sipeed/picoclaw/issues/3287) IRC 长消息 | 功能请求 | 2026-07-22 | 约 1 个月 | 6 条评论，讨论充分，但无维护者明确回应 |
| [#3301](https://github.com/sipeed/picoclaw/issues/3301) `/clear` 在 dispatch 路由下失效 | Bug | 2026-07-29 | 约 3 周 | 影响 Discord/Telegram 用户，无 fix PR |
| [#3314](https://github.com/sipeed/picoclaw/pull/3314) customAllowPatterns 修复 | PR | 2026-08-03 | 约 2 周 | 待合并，标记 `stale`，建议维护者尽快 review |

**维护者提醒：** #806 作为高优先级路线图项已积压近半年，社区关注度持续上升，建议至少给出阶段性进展说明；#3314 的 customAllowPatterns 修复涉及命令执行安全边界，建议优先 review 以避免安全相关 Bug 长期暴露。


## 项目健康度评估

| 维度 | 评分 | 说明 |
|---|---|---|
| 社区活跃度 | 🟢 良好 | 24h 内 10 条 Issue/PR 更新，讨论有实质内容 |
| 维护响应速度 | 🟡 中等 | 部分 PR 标记 `stale`（#3314、#3329），#806 长期无进展 |
| 代码质量与稳定性 | 🟢 良好 | 无高危 Bug，配置类问题有修复 PR 跟进 |
| 路线图执行力 | 🟡 中等 | WebUI 高优需求积压 6 个月，但 Anthropic 协议支持已落地 |

**总结：** PicoClaw 今日在协议兼容性和可观测性上取得实质进展，社区对 WebUI 的呼声持续走高。建议维护者优先处理 #3339（Antigravity 429）和 #3314（customAllowPatterns 修复），并对 #806 给出阶段性进展说明，以维持社区信任度。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报

**日期：2026-08-19** | **数据窗口：2026-08-18 至 2026-08-19**


## 1. 今日速览

QwenPaw 项目在过去 24 小时内保持高度活跃：共产生 45 条 Issue 更新（29 条活跃/新开，16 条已关闭）和 50 条 PR 更新（31 条待合并，19 条已合并/关闭），无新版本发布。社区讨论热度集中在**多步骤任务中断**（#6921）、**Matrix 频道重试机制缺失**（#6684）以及**模型调用冻结**（#7102）等稳定性问题上。值得关注的是，多个 `first-time-contributor` 提交的 PR 正在解决 OAuth2 refresh token 轮换持久化（#7066）、沙箱策略路径展开（#7116）等长期积压问题，项目整体处于**高吞吐的修复与功能并行推进阶段**。但需注意，仍有 31 条 PR 处于待合并状态，合并积压可能成为短期瓶颈。


## 2. 版本发布

过去 24 小时内无新版本发布。当前最新版本为 **v2.1.0**（桌面版）及 **2.1.0b2**（测试版）。社区反馈显示 v2.1.0 存在若干稳定性问题（详见第 5 节），建议维护团队关注并规划 2.1.1 补丁版本。


## 3. 项目进展

今日共关闭/合并 19 条 PR，以下为关键合并（含关闭）项：

| PR | 标题 | 状态 | 意义 |
|---|---|---|---|
| [#6617](https://github.com/agentscope-ai/QwenPaw/pull/6617) | fix(providers): honor the Retry-After cap on the streaming retry path | CLOSED | 修复流式重试路径中 Retry-After 上限未生效的问题，提升限流场景下的稳定性 |
| [#7072](https://github.com/agentscope-ai/QwenPaw/pull/7072) | feat(console): add background chat task list API | CLOSED | 为多智能体协作场景新增后台任务列表查询 API，是 #7056 提案的落地第一步 |
| [#7064](https://github.com/agentscope-ai/QwenPaw/pull/7064) | fix(cli): sync top-level text on cron update --text for agent jobs | CLOSED | 修复 `cron update --text` 仅更新嵌套字段而不同步顶层 `text` 的问题 |
| [#7069](https://github.com/agentscope-ai/QwenPaw/pull/7069) | fix(console): render data-URL images in historical messages on session reload | CLOSED | 修复会话重载后历史消息中 data-URL 图片无法显示的问题 |
| [#7063](https://github.com/agentscope-ai/QwenPaw/issues/7063) | Agent 执行工具调用时必现崩溃 | CLOSED | 确认 `_execute_tool_call` 中 `async for` 遍历 coroutine 的 TypeError 问题已解决 |

**项目推进评估**：今日合并的 PR 主要集中在**控制台体验修复**（图片渲染、任务列表 API）和**CLI/Provider 层稳定性**（Retry-After、cron 同步），整体属于小步快跑的修复节奏。尚未有重大功能合入。


## 4. 社区热点

### 最热 Issue  TOP 3

**1. [#6684 - 增加频道的重试功能](https://github.com/agentscope-ai/QwenPaw/issues/6684)**（10 评论）
- **诉求**：自建 Matrix 频道在服务器启动后因 QwenPaw 快于 Matrix 服务导致连接失败，且无自动重试/健康检测，需手动重新保存频道才能恢复。
- **分析**：这是**基础设施可靠性**的典型诉求。用户期望 Agent 框架具备自愈能力，而非依赖人工干预。该 Issue 已开放两周，暂无对应 PR，建议优先排期。

**2. [#6921 - 多步骤任务无提示中断](https://github.com/agentscope-ai/QwenPaw/issues/6921)**（8 评论）
- **诉求**：执行多步骤任务时，模型输出"Now 2.1, 3.1, 3.2. Let me do all three."等规划性消息后即停止，无任何提示，需用户手动说"继续"才恢复。
- **分析**：这是** Agent 自主执行可靠性**的核心痛点。模型已规划但未执行即停止，可能涉及 tool-call 循环的终止条件或上下文窗口截断问题。该问题影响核心体验，建议高优排查。

**3. [#7102 - Freeze more than 10 minutes long](https://github.com/agentscope-ai/QwenPaw/issues/7102)**（7 评论）
- **诉求**：使用 GLM 5.3 模型时，QwenPaw Desktop 2.1.0 冻结超过 10 分钟，无任何 token 输出，连 thinking 过程也冻结。
- **分析**：**模型调用层冻结**问题，可能涉及流式响应超时或 provider 连接管理。用户已尝试切换模型验证，需确认是否为 GLM provider 特有缺陷。

### 最热 PR  TOP 3

**1. [#7061 - fix(video): deliver tool-result videos on OpenAI Responses API](https://github.com/agentscope-ai/QwenPaw/pull/7061)**（first-time-contributor）
- 修复 #6495 引入的视频传递缺陷，解决 Volcengine Ark 等使用 OpenAI Responses API 的 provider 无法收到 `view_video` 工具结果的问题。

**2. [#7120 - security: enable shell evasion checks by default](https://github.com/agentscope-ai/QwenPaw/pull/7120)**（first-time-contributor）
- 将全部 7 项 shell 逃逸检测默认开启，提升沙箱安全性。属于安全加固类 PR，需评估对现有用户工作流的影响。

**3. [#7119 - fix(security): create the master key file with owner-only permissions](https://github.com/agentscope-ai/QwenPaw/pull/7119)**
- 修复 `secret_store` 主密钥文件未按文档以 `0o600` 权限创建的问题，属于安全合规修复。


## 5. Bug 与稳定性

按严重程度排列：

### 🔴 严重（影响核心功能）

| Issue | 描述 | 状态 |
|---|---|---|
| [#7102](https://github.com/agentscope-ai/QwenPaw/issues/7102) | 模型调用冻结超 10 分钟，无任何输出 | 待排查，无 fix PR |
| [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) | 多步骤任务规划后无提示停止，需手动"继续" | 待排查，无 fix PR |
| [#7110](https://github.com/agentscope-ai/QwenPaw/issues/7110) | 对话上下文中包含无法下载的图片链接，整个会话不可用 | 待排查，无 fix PR |
| [#7074](https://github.com/agentscope-ai/QwenPaw/issues/7074) | 正常运行崩溃，需刷新页面才能重启，频次高发 | 待排查，无 fix PR |

### 🟠 中等（影响特定场景）

| Issue | 描述 | 状态 |
|---|---|---|
| [#7082](https://github.com/agentscope-ai/QwenPaw/issues/7082) | `_StructuredOutputDynamicClass` Pydantic 未完全定义导致 MODEL_EXECUTION_ERROR | 待排查，无 fix PR |
| [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) | Console 停止请求可取消活跃的飞书会话（多 UI 会话场景） | 待排查，无 fix PR |
| [#7005](https://github.com/agentscope-ai/QwenPaw/issues/7005) | 启用沙箱后 `uv run` 无法写入 `~/.cache/uv` | **已有 fix PR**：[#7116](https://github.com/agentscope-ai/QwenPaw/pull/7116) 展开 `~` 路径 |
| [#7053](https://github.com/agentscope-ai/QwenPaw/issues/7053) | OAuth2 refresh token 轮换不持久化，远程 MCP 永久降级为手动重新认证 | **已有 fix PR**：[#7066](https://github.com/agentscope-ai/QwenPaw/pull/7066) |
| [#6470](https://github.com/agentscope-ai/QwenPaw/issues/6470) | MCP driver 硬编码 SSE client，忽略 `streamable_http` 配置 | 待排查，无 fix PR |

### 🟡 轻微（体验/边缘问题）

| Issue | 描述 | 状态 |
|---|---|---|
| [#7118](https://github.com/agentscope-ai/QwenPaw/issues/7118) | 损坏的 `envs.json` 被静默吞掉并覆盖，所有环境变量丢失 | 待排查，无 fix PR |
| [#7065](https://github.com/agentscope-ai/QwenPaw/issues/7065) | 多轮对话后历史消息只能看到最近 3-4 条 | 待排查，无 fix PR |
| [#7046](https://github.com/agentscope-ai/QwenPaw/issues/7046) | `execute_shell_command` 处理 heredoc/多行命令时出错 | 已关闭，待确认修复方案 |
| [#7039](https://github.com/agentscope-ai/QwenPaw/issues/7039) | 2.1.0 莫名其妙新建会话；文件预览无关闭选项 | 已关闭，部分已解决 |


## 6. 功能请求与路线图信号

### 高潜力（已有对应 PR 或明确需求）

| Issue/PR | 功能 | 信号强度 |
|---|---|---|
| [#7052](https://github.com/agentscope-ai/QwenPaw/issues/7052) | 插件 API 增加 `system_prompt` 权限控制 | 中 - 企业用户定制需求 |
| [#7062](https://github.com/agentscope-ai/QwenPaw/issues/7062) | 支持 per-agent/per-session 的 `reasoning_effort` 覆盖 | 中 - 多角色差异化配置需求 |
| [#7090](https://github.com/agentscope-ai/QwenPaw/issues/7090) | 技能池导入页面增加搜索/过滤功能 | 低 - 体验优化 |
| [#6925](https://github.com/agentscope-ai/QwenPaw/issues/6925) | 智能体协作希望在一个会话窗口里 | 中 - 多智能体协作体验优化 |
| [#7112](https://github.com/agentscope-ai/QwenPaw/pull/7112) | 本地 QwenPaw Pro 控制平面（多租户隔离） | 高 - 企业级方向，draft 状态 |
| [#7081](https://github.com/agentscope-ai/QwenPaw/pull/7081) | 集成 AnySearch 网络搜索（SearchProvider + MCP） | 中 - 扩展搜索能力 |
| [#6800](https://github.com/agentscope-ai/QwenPaw/pull/6800) | 智能邮件管理助手（实时监控 + 访问控制） | 中 - 新应用场景 |

### 路线图信号

- **企业级方向**：PR #7112（本地 Pro 控制平面）和 #7052（system_prompt 权限）表明社区对**多租户、权限控制**的需求正在浮现。
- **MCP 生态完善**：多个 Issue（#6470、#5900、#7053）和 PR（#7066）围绕 MCP 传输层、OAuth2、自动重连展开，MCP 稳定性是当前重点。
- **安全加固**：PR #7120（shell 逃逸检测默认开启）和 #7119（主密钥文件权限）显示安全正在从"可选"走向"默认"。


## 7. 用户反馈摘要

### 真实痛点

1. **任务中断无提示**（#6921）："规划好下一步就停止了，没实际开始干也无任何视觉可见的提示" —— 用户对 Agent 自主执行的可预期性有较高期待，中断无提示严重损害信任感。

2. **连接自愈能力缺失**（#6684）："每次服务器启动后都需要手动重新保存一次频道才能恢复连接" —— 用户期望基础设施级组件具备自动重试和健康检查，而非依赖人工干预。

3. **沙箱策略配置困难**（#7005）："通过添加 `Write(~/.cache/uv/**)` 到 policy.yaml 可以解决" —— 用户需要更直观的沙箱策略配置方式，路径展开问题导致文档中的解决方案失效。

4. **会话历史可见性**（#7065）："只能看到最近 3 或 4 条，即使滚动到顶部也看不到更早的讨论" —— 多轮对话后历史消息丢失是严重的体验问题。

### 满意/亮点

- 用户 @renzhong424 在 #7039 中反馈："更新到 2.1.0 版本后，确实发现很多改善，比如公式显示正常了！"
- 用户 @boktoday 在 #6775 中表示："I love your work. Thanks for all you do."（尽管报告了杀毒软件误报问题）

### 安全疑虑

- #6775：Malware Bytes 将 Windows 桌面版标记为 Trojan Loader，用户表示"在得到团队回复前将卸载"。这可能是**误报**，但需要官方及时回应以消除用户疑虑。


## 8. 待处理积压

### 长期未响应的关键 Issue

| Issue | 创建时间 | 持续天数 | 重要性 |
|---|---|---|---|
| [#6470](https://github.com/agentscope-ai/QwenPaw/issues/6470) MCP driver 硬编码 SSE client | 2026-07-26 | 24 天 | 高 - 影响所有使用 streamable_http 的 MCP 服务器 |
| [#5900](https://github.com/agentscope-ai/QwenPaw/issues/5900) MCP streamable_http 会话终止后无自动重连 | 2026-07-09 | 41 天 | 高 - MCP 稳定性核心问题 |
| [#6775](https://github.com/agentscope-ai/QwenPaw/issues/6775) Malware Bytes 误报 Trojan | 2026-08-07 | 12 天 | 中 - 影响用户信任和安装意愿 |
| [#6684](https://github.com/agentscope-ai/QwenPaw/issues/6684) 频道重试功能 | 2026-08-04 | 15 天 | 中 - 基础设施可靠性 |

### 待合并 PR 积压

当前有 **31 条 PR 待合并**，其中以下值得关注：

| PR | 标题 | 等待时间 |
|---|---|---|
| [#6515](https://github.com/agentscope-ai/QwenPaw/pull/6515) | feat(providers): add Volcengine Agent Plan & MiMo V2.5 providers | 22 天 |
| [#6764](https://github.com/agentscope-ai/QwenPaw/pull/6764) | feat(ci): gate main mergeability on tests | 13 天 |
| [#6800](https://github.com/agentscope-ai/QwenPaw/pull/6800) | feat(mailbox): intelligent email management assistant | 12 天 |
| [#6990](https://github.com/agentscope-ai/QwenPaw/pull/6990) | fix(skill): Reduce file io via file cache | 6 天 |

> ⚠️ **提醒**：PR #6764（CI 门禁）已等待 13 天，该 PR 旨在防止"测试全红仍可合并"的问题（#6418 曾发生），建议优先处理以保障主干稳定性。


## 项目健康度评估

| 维度 | 状态 | 说明 |
|---|---|---|
| **社区活跃度** | 🟢 高 | 45 Issues + 50 PRs / 24h，讨论充分 |
| **Bug 修复效率** | 🟡 中 | 19 条 PR 合并，但严重 Bug（冻结、中断）尚无 fix |
| **PR 合并速度** | 🟡 中 | 31 条待合并，部分 PR 等待超 2 周 |
| **版本迭代节奏** | 🟡 平稳 | v2.1.0 已发布，但存在已知稳定性问题，建议规划补丁 |
| **新贡献者友好度** | 🟢 高 | 多个 first-time-contributor PR 被积极 review |
| **安全态势** | 🟢 良好 | 安全加固 PR 活跃（shell 逃逸、密钥权限） |

**总体评价**：QwenPaw 项目处于**功能扩展与稳定性修复并行**的活跃期。社区贡献者参与度高，但核心维护团队需关注：① 严重 Bug（冻结、中断）的响应速度；② PR 合并积压问题；③ MCP 相关长期 Issue 的排期。建议优先处理 #6921（任务中断）和 #7102（模型冻结）两个影响核心体验的问题，并考虑发布 2.1.1 补丁版本。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-19

> 数据窗口：2026-08-18 00:00 UTC 至 2026-08-19 00:00 UTC | 数据来源：GitHub Issues/PRs/Releases

---

## 1. 今日速览

项目活跃度处于**高位**：过去 24 小时产生 424 条 Issue 更新（其中 363 条新开/活跃，61 条关闭）和 500 条 PR 更新（382 条待合并，118 条已合并/关闭），并发布了 v0.20.4 补丁版本（聚合自 v0.20.3 以来的约 74 个 PR）。值得关注的是，今日 PR 合并/关闭数量（118 条）显著高于 Issue 关闭数量（61 条），说明**修复速度正在追赶问题报告速度**。社区讨论集中在三大主题：**多配置文件（multiplex_profiles）下的密钥隔离安全漏洞**（#82936）、**Windows 平台安装/更新持续故障**（#86093、#88168、#88251）、以及**桌面端 Bot Mode 的会话与性能问题**（#89206、#88275）。此外，今日有 6 个 PR 直接针对 Kanban 调度器的恢复机制（#89511、#89512），表明项目正在系统性地解决长期存在的 worker 卡死问题。

---

## 2. 版本发布

### Hermes Agent v0.20.4 (v2026.8.18)

**发布日期：** 2026-08-18

**版本类型：** Patch release（补丁版本）

**核心内容：** 该版本将 v0.20.3 以来合并的约 74 个 PR 聚合为一个稳定的标记版本，面向下游消费者（Docker 镜像、托管部署、新安装）。

**更新要点：**
- 聚合了 74 个 PR 的修复与改进
- 作为稳定版本标记，供 Docker 镜像和托管部署使用

**破坏性变更：** 无明确说明（Patch release 通常不包含破坏性变更）。

**迁移注意事项：** 无特殊迁移要求。建议下游消费者尽快同步至该版本以获取累积修复。

---

## 3. 项目进展

今日合并/关闭的 118 个 PR 中，以下合并 PR 值得关注：

| PR | 标题 | 状态 | 意义 |
|---|---|---|---|
| [#89486](https://github.com/NousResearch/hermes-agent/pull/89486) | feat(desktop): group-chat bots now see user-attached images | 已合并 | 修复群聊中用户无法向 Bot 发送图片的问题，补齐了群聊图片输入的缺失环节 |
| [#89483](https://github.com/NousResearch/hermes-agent/pull/89483) | Desktop activation publishes atomically and fails closed | 已合并 | 桌面端配置文件/代理切换改为原子发布，失败时安全关闭，避免 UI 显示虚假状态（从 #82187 抢救） |
| [#89499](https://github.com/NousResearch/hermes-agent/pull/89499) | fix(tests): goal-verdict tests no longer flake when SessionDB init overruns | 已合并 | 修复 CI 测试不稳定问题，今日三次命中同一 flake |

**项目整体推进方向：**
- **Kanban 调度器恢复机制**：今日有 2 个新 PR（#89511、#89512）专门针对 blocked workers 和 stranded reviews 的自动恢复，这是对长期存在的 worker 卡死问题的系统性修复。
- **桌面端 Bot Mode 体验优化**：多个 PR（#89508、#89510）针对 Bot Mode 的 UI 细节和启动性能进行修复。
- **Nix 模块统一**：PR #84178 将 home-manager 模块与 NixOS 模块共享代码，避免两者分叉。

---

## 4. 社区热点

### 最热 Issue 排行

| 排名 | Issue | 评论数 | 状态 | 核心诉求 |
|---|---|---|---|---|
| 1 | [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) Large-file decomposition: 20/20 done | 76 | 已关闭 | 大型文件分片重构史诗级任务完成，社区关注度高 |
| 2 | [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) Skills index is stale or degraded | 53 | 开放 | 自动化探针发现技能索引过期（29.8h > 26h 限制），持续一个月未解决 |
| 3 | [#84834](https://github.com/NousResearch/hermes-agent/issues/84834) Webhook Feature Package — graph-gated repair | 17 | 开放 | Webhook 功能包全面修复的元问题追踪器 |
| 4 | [#34390](https://github.com/NousResearch/hermes-agent/issues/34390) dashboard: add --allowed-hosts flag | 15 | 开放 | 反向代理/Tailscale 场景下需要允许自定义主机头 |
| 5 | [#83390](https://github.com/NousResearch/hermes-agent/issues/83390) title_generation fails on DeepSeek | 14 | 开放 | DeepSeek 不支持 response_format 导致标题生成失败 |

### 热点分析

**#66616（技能索引过期）** 是持续时间最长、评论最多的自动化问题之一，已开放超过一个月（创建于 7 月 18 日），53 条评论表明社区对文档/技能索引的可靠性有较高期待。该问题虽标记为 P3，但持续未解决可能影响用户对项目文档质量的信心。

**#78647（大型文件分片）** 以 76 条评论成为今日最热 Issue，虽然已关闭，但作为一项史诗级重构的完成标记，反映了社区对代码库可维护性的关注。

---

## 5. Bug 与稳定性

### P1 级别（严重）

| Issue | 标题 | 状态 | 是否有 Fix PR |
|---|---|---|---|
| [#87093](https://github.com/NousResearch/hermes-agent/issues/87093) | Debian 安装失败；uv.lock 与 npm install 报错 | 开放 | 无 |
| [#86093](https://github.com/NousResearch/hermes-agent/issues/86093) | Windows: hermes update 总是失败（exe 无法重命名） | 开放 | 无 |
| [#88168](https://github.com/NousResearch/hermes-agent/issues/88168) | Windows: contributors/emails 下大小写冲突文件导致 git status 永久 dirty | 开放 | 无 |
| [#88251](https://github.com/NousResearch/hermes-agent/issues/88251) | Windows: get-windows win32 binding 未打包，桌面应用静默停留在旧版本 | 开放 | 无 |

### P2 级别（中等）

| Issue | 标题 | 状态 | 是否有 Fix PR |
|---|---|---|---|
| [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) | multiplex_profiles 下默认配置文件的密钥泄漏到次要配置文件的 terminal 工具 | 开放 | 无 |
| [#66887](https://github.com/NousResearch/hermes-agent/issues/66887) | 多路复用网关：次要配置文件的 Telegram 会话持久化到默认配置文件的状态库 | 开放 | 无 |
| [#42961](https://github.com/NousResearch/hermes-agent/issues/42961) | terminal.cwd 配置在本地后端被忽略 | 开放 | 无 |
| [#85695](https://github.com/NousResearch/hermes-agent/issues/85695) | 每次网关启动都误报 "TERMINAL_CWD deprecated" 警告 | 开放 | 无 |
| [#89206](https://github.com/NousResearch/hermes-agent/issues/89206) | 桌面 Bot Mode：非主配置文件的聊天保持空白 | 已关闭 | 有（#89510） |

### 稳定性观察

**Windows 平台问题集中爆发**：今日有 3 个 P1 级 Windows 专属问题（#86093、#88168、#88251），涉及更新机制、git 检出、桌面应用打包三个不同环节。这表明 Windows 平台的安装/更新链路存在系统性缺陷，建议维护者优先排查。

**安全漏洞**：#82936 描述的密钥泄漏问题（P2 安全）涉及多配置文件场景下的凭据隔离，虽然标记为 P2，但安全影响较大，建议提升优先级。

---

## 6. 功能请求与路线图信号

### 高潜力功能请求

| Issue | 标题 | 评论数 | 信号强度 |
|---|---|---|---|
| [#34390](https://github.com/NousResearch/hermes-agent/issues/34390) | dashboard: add --allowed-hosts flag | 15 | 中 — 有 2 个 👍，Tailscale/反向代理用户刚需 |
| [#54204](https://github.com/NousResearch/hermes-agent/issues/54204) | Allow moving/rescoping sessions into a different project | 9 | 中 — 3 个 👍，桌面端工作流需求 |
| [#85125](https://github.com/NousResearch/hermes-agent/issues/85125) | Unified deadline layer — architectural fix for timeout/hang backlog | 13 | 高 — 针对 400+ 超时/挂起问题的架构级方案 |
| [#56865](https://github.com/NousResearch/hermes-agent/issues/56865) | Add opt-in memory guard for local terminal subprocesses | 6 | 低 — 系统管理员场景需求 |

### 路线图信号

**#85125（统一截止时间层）** 是最值得关注的架构级功能请求。该 Issue 指出开放积压中有 400+ 个与超时/挂起/卡死相关的问题，并提出 4 阶段架构修复方案。结合今日多个 Kanban 恢复 PR（#89511、#89512），项目正在从"逐个修复"转向"结构性解决"超时问题。

**Nix 模块**：PR #84178 和 #9087 同时涉及 home-manager 模块，前者更新、后者更早但仍在开放状态。两个 PR 可能冲突，建议维护者协调合并策略。

---

## 7. 用户反馈摘要

### 正面反馈

- **#78647（大型文件分片）** 的关闭获得社区关注，76 条评论表明用户对代码库可维护性改善持积极态度。

### 负面反馈 / 痛点

| 来源 | 用户痛点 |
|---|---|
| [#18357](https://github.com/NousResearch/hermes-agent/issues/18357) | 安装脚本将 npm 全局安装劫持到 ~/.hermes/node，**"borders criminal behavior"** — 用户对安装脚本影响系统其他软件的行为强烈不满 |
| [#86093](https://github.com/NousResearch/hermes-agent/issues/86093) | Windows 更新机制完全失效，用户无法升级到新版本 |
| [#88275](https://github.com/NousResearch/hermes-agent/issues/88275) | 桌面端渲染进程空闲时占用 40-70% CPU，Intel Mac 上导致热降频 |
| [#76312](https://github.com/NousResearch/hermes-agent/issues/76312) | Playwright Chromium 安装在 Node 26 上无限挂起（5 个 👍，社区共鸣强） |
| [#83390](https://github.com/NousResearch/hermes-agent/issues/83390) | DeepSeek 用户无法使用标题生成功能，HTTP 400 错误 |

### 使用场景洞察

- **Tailscale/反向代理用户**（#34390）：需要 `--allowed-hosts` 标志来安全地通过 Tailscale Serve 访问 dashboard。
- **多配置文件/多租户用户**（#82936、#66887）：密钥隔离和会话隔离问题影响采用多配置文件的高级用户。
- **Windows 用户**：安装、更新、git 检出三个环节均存在问题，Windows 作为主要开发平台的用户体验严重受损。

---

## 8. 待处理积压

### 长期未响应的关键 Issue

| Issue | 标题 | 创建时间 | 开放天数 | 最后更新 | 优先级 |
|---|---|---|---|---|---|
| [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) | Skills index is stale or degraded | 2026-07-18 | 32 天 | 2026-08-18 | P3 |
| [#66887](https://github.com/NousResearch/hermes-agent/issues/66887) | Multiplexed gateway: secondary-profile sessions persist in default profile's state.db | 2026-07-18 | 32 天 | 2026-08-18 | **P1** |
| [#18357](https://github.com/NousResearch/hermes-agent/issues/18357) | Setup SABOTAGES computer integrity - npm global installs hijacked | 2026-05-01 | 110 天 | 2026-08-18 | P2 |
| [#42961](https://github.com/NousResearch/hermes-agent/issues/42961) | terminal.cwd config ignored for local backend | 2026-06-09 | 71 天 | 2026-08-18 | P2 |
| [#53902](https://github.com/NousResearch/hermes-agent/issues/53902) | Renderer stuck in fontations+temporal_rs loop — GPU 98% | 2026-06-28 | 52 天 | 2026-08-17 | P3 |

### 维护者提醒

1. **#66887（P1，32 天未解决）**：多路复用网关的会话存储隔离问题，涉及数据正确性和隐私边界，建议优先处理。
2. **#18357（110 天未解决）**：安装脚本影响系统其他软件的问题，用户情绪强烈（"criminal behavior"），建议至少给出缓解方案或文档说明。
3. **#66616（32 天未解决）**：自动化探针持续报告技能索引过期，虽然 P3 但影响文档可靠性，建议修复 CI 工作流或调整告警阈值。

---

## 项目健康度评估

| 维度 | 评分 | 说明 |
|---|---|---|
| **活跃度** | ★★★★★ | 424 Issues / 500 PRs 日更新量，社区参与度高 |
| **修复效率** | ★★★★☆ | PR 合并数（118）> Issue 关闭数（61），修复速度略快于报告速度 |
| **稳定性** | ★★★☆☆ | Windows 平台多个 P1 问题未解决；多配置文件安全漏洞待修复 |
| **社区满意度** | ★★★☆☆ | 用户对安装脚本、更新机制、性能问题有较强不满情绪 |
| **架构演进** | ★★★★☆ | 大型文件分片完成、统一截止时间层提案、Kanban 恢复机制推进 |

**总体评价：** 项目处于高活跃度、中高健康度状态。修复速度正在追赶问题报告速度，但 Windows 平台体验和安全隔离问题需要优先关注。架构级改进（如 #85125 统一截止时间层）的推进值得期待。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报

**日期**: 2026-08-19  
**数据窗口**: 2026-08-18 ~ 2026-08-19（UTC+8）

---

## 1. 今日速览

AstrBot 在过去 24 小时内保持了较高的社区活跃度：共产生 10 条 Issue 更新和 8 条 PR 更新，全部为新增内容，无合并/关闭记录。值得关注的是，今日提交的 PR 中有 4 个直接对应今日新开的 Bug Issue（#9724、#9723、#9734），形成了高效的"报告-修复"闭环，反映出维护团队响应速度较快。社区讨论集中在 Responses API 跨模型兼容性、WebUI 细节体验、以及模型供应商 API 变更应对三个方面。整体项目健康度良好，但需注意 PR 合并积压问题（当前 8 个待合并 PR 中，有 2 个已悬置超过 2 个月）。

---

## 2. 版本发布

**无新版本发布。** 当前最新版本为 v4.27.3（社区 Issue 中提及）。

---

## 3. 项目进展

**今日无 PR 被合并或关闭。** 但以下待合并 PR 值得关注，它们代表了项目近期的重要改进方向：

| PR | 内容 | 状态 | 备注 |
|---|---|---|---|
| [#8179](https://github.com/AstrBotDevs/AstrBot/pull/8179) | Opencode Zen & Go 作为 Provider（XL 级改动） | 待合并，已悬置 3 个月 | 大型功能扩展，涉及 WebUI 和 Provider 两大核心区域，建议维护者评估排期 |
| [#8855](https://github.com/AstrBotDevs/AstrBot/pull/8855) | 修复 ContextTruncator 全 system 消息场景下的截断逻辑 | 待合并，已悬置 2 个月 | 小改动（XS），但涉及核心上下文管理逻辑，长期未合并可能影响特定场景的稳定性 |
| [#9728](https://github.com/AstrBotDevs/AstrBot/pull/9728) | 启用 xAI Responses 原生 web search | 待合并 | 直接修复 #9723，今日提交 |
| [#9730](https://github.com/AstrBotDevs/AstrBot/pull/9730) | 修复 Responses API 跨模型推理数据回放兼容性 | 待合并 | 直接修复 #9724，今日提交 |
| [#9735](https://github.com/AstrBotDevs/AstrBot/pull/9735) | 修复 Windows 下 SVG MIME 类型错误 | 待合并 | 直接修复 #9734，今日提交 |

**项目整体推进速度评估**：虽然今日无合并，但 4 个高相关性 fix PR 的快速提交表明项目正处于"问题发现-修复"的良性循环中。建议维护者优先审查并合并 #9728、#9730、#9735 这三个小型修复 PR，以快速回应用户反馈。

---

## 4. 社区热点

### 最热 Issue：#9718 - 日志搜索功能建议
- **链接**: https://github.com/AstrBotDevs/AstrBot/issues/9718
- **评论数**: 4 | **创建**: 08-17 | **更新**: 08-18
- **诉求分析**: 用户希望为 WebUI 日志面板增加关键词搜索功能。该需求虽小，但反映了用户对 AstrBot 作为日常工具的可观测性要求正在提升。4 条评论说明该话题引发了一定讨论，可能有用户补充了更多使用场景。

### 高讨论度 Bug：#9724 - Responses API 跨模型切换后 400 错误
- **链接**: https://github.com/AstrBotDevs/AstrBot/issues/9724
- **评论数**: 3 | **创建**: 08-18
- **诉求分析**: 用户详细描述了在同一会话中切换不同 Responses API 模型（gpt-5.6-luna → deepseek-v4-flash）后，历史 reasoning 数据导致请求 400 的复现路径。该问题影响多模型工作流用户，且已由 PR #9730 提出修复方案，社区关注度较高。

### 最受关注 PR：#9728 - xAI 原生 web search 修复
- **链接**: https://github.com/AstrBotDevs/AstrBot/pull/9728
- **背景**: 对应 Issue #9723 是用户第二次提交（"Last week i submitted this bug"），说明该问题已持续至少一周未解决。PR 不仅恢复了 xAI 原生搜索开关，还增加了 `url_citation` 来源展示，属于功能补全而非简单修复。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 修复 PR |
|---|---|---|---|
| 🔴 高 | [#9724](https://github.com/AstrBotDevs/AstrBot/issues/9724) | 同一会话切换 Responses API 模型后，历史 reasoning 数据导致后续请求 400，对话中断 | ✅ [#9730](https://github.com/AstrBotDevs/AstrBot/pull/9730) 已提交 |
| 🟡 中 | [#9723](https://github.com/AstrBotDevs/AstrBot/issues/9723) | xAI Responses Provider 不发送原生 web_search 工具，功能不可用（已持续 ≥1 周） | ✅ [#9728](https://github.com/AstrBotDevs/AstrBot/pull/9728) 已提交 |
| 🟡 中 | [#9734](https://github.com/AstrBotDevs/AstrBot/issues/9734) | Windows 下 WebUI 将 SVG 返回为 `image/svg`（非标准 MIME），导致插件图标和 favicon 破图 | ✅ [#9735](https://github.com/AstrBotDevs/AstrBot/pull/9735) 已提交 |
| 🟡 中 | [#9736](https://github.com/AstrBotDevs/AstrBot/issues/9736) | 用户未 @bot 但 bot 却回复（群聊场景），涉及插件 `astrbot_plugin_parser` 的消息触发逻辑 | ❌ 暂无 |
| 🟢 低 | [#9726](https://github.com/AstrBotDevs/AstrBot/pull/9726) | 企业微信客服消息缺失 `open_kfid` 字段时 KeyError 导致消息丢失 | ✅ PR 已提交（#9726） |

**稳定性评估**：今日报告的 Bug 大多有对应的修复 PR 在当天内提交，响应速度良好。但 #9736（未 @ 却回复）涉及消息触发核心逻辑，且与插件联动，建议优先排查。

---

## 6. 功能请求与路线图信号

| 功能请求 | 链接 | 分析 |
|---|---|---|
| **WebChat 会话级推理强度切换** | [#9731](https://github.com/AstrBotDevs/AstrBot/issues/9731) | 用户希望在不进入 Provider 设置页的情况下，于 WebChat 界面直接切换 `reasoning_effort`（low/medium/high）。该需求与当前 AI 模型推理能力增强的趋势吻合，且已有部分 Provider 支持自定义请求体传递该参数，实现成本可控，**有望纳入下一版本** |
| **分时/峰谷定价模型切换** | [#9727](https://github.com/AstrBotDevs/AstrBot/issues/9727) | 用户建议支持按时间段自动切换不同模型，以应对厂商峰谷定价策略。该需求涉及调度逻辑，属于中大型功能，短期内可能不会实现，但可作为路线图参考 |
| **官方 QQ 机器人增强（MD/ARK 卡片、引用回复、主动 @）** | [#9722](https://github.com/AstrBotDevs/AstrBot/issues/9722) | 用户详细列出了官方 QQ 机器人的 4 项增强需求。其中 MD 卡片和消息引用回复是高频需求，但实现依赖 QQ 官方 API 能力，需评估平台支持度 |
| **NVIDIA 模型 API 弃用应对** | [#9729](https://github.com/AstrBotDevs/AstrBot/issues/9729) | NVIDIA 将于 08/24/2026 弃用部分嵌入/重排序模型 API，用户建议更换默认模型。**此为时效性需求**，需在弃用日期前完成默认模型切换，建议尽快处理 |
| **日志搜索功能** | [#9718](https://github.com/AstrBotDevs/AstrBot/issues/9718) | 为 WebUI 日志面板增加关键词搜索。属于体验优化类需求，实现难度低，可考虑作为快速迭代项 |

---

## 7. 用户反馈摘要

- **多模型工作流用户**（#9724）："同一会话切换模型后对话直接 400 中断"——用户对跨模型切换的流畅性有较高期待，历史上下文（尤其是 reasoning 数据）的兼容性需要更稳健的处理。
- **xAI 用户**（#9723）：用户明确表示"Last week i submitted this bug"，对同一问题持续未修复表达了轻微不满。说明**重复 Bug 的修复时效**是影响用户满意度的关键因素。
- **Windows 用户**（#9734）：SVG MIME 类型问题导致插件市场页面大量破图，影响插件浏览体验。该问题仅影响 Windows 平台，但用户描述详尽（含 HTTP 响应头截图），便于快速定位。
- **功能型用户**（#9731、#9727）：部分用户已开始将 AstrBot 作为日常 AI 工作流的中枢工具，对推理强度调节、成本控制等精细化功能有明确需求，说明用户群体正从"尝鲜"转向"深度使用"。
- **插件作者**（#9732）：有用户提交了新插件 `astrbot_plugin_futaloli`（随机图片 + LLM 翻图库工具），社区生态持续活跃。

---

## 8. 待处理积压

| 类型 | 编号 | 描述 | 悬置时长 | 建议 |
|---|---|---|---|---|
| PR | [#8179](https://github.com/AstrBotDevs/AstrBot/pull/8179) | Opencode Zen & Go as Provider（XL 级） | 3 个月 | 大型功能 PR 长期未合并，建议维护者明确排期或给出阶段性反馈，避免贡献者流失 |
| PR | [#8855](https://github.com/AstrBotDevs/AstrBot/pull/8855) | ContextTruncator 全 system 消息场景修复 | 2 个月 | 小改动但涉及核心逻辑，长期未合并可能影响特定场景稳定性，建议尽快 review |
| Issue | [#9723](https://github.com/AstrBotDevs/AstrBot/issues/9723) | xAI web_search 不可用 | 用户反馈已持续 ≥1 周 | 已有 PR #9728 提交，需尽快合并并发布补丁版本 |
| Issue | [#9729](https://github.com/AstrBotDevs/AstrBot/issues/9729) | NVIDIA 模型 API 将于 08/24 弃用 | 距弃用仅剩 5 天 | **高优先级**：需在弃用日期前完成默认嵌入/重排序模型切换，否则将影响使用 NVIDIA 模型的用户 |

---

## 总结

AstrBot 今日社区活跃度高，Bug 报告与修复 PR 形成了良好的闭环，但 PR 合并速度有待提升（当前 8 个待合并 PR 中 2 个已悬置超 2 个月）。建议维护者优先处理以下事项：

1. **紧急**：NVIDIA 模型 API 弃用应对（#9729），距弃用仅 5 天
2. **高优**：合并 #9728、#9730、#9735 三个小型修复 PR，快速回应用户反馈
3. **中优**：对长期悬置的 #8179、#8855 给出明确排期或阶段性反馈

**项目健康度评分**: 8/10（活跃度高、响应快，但合并积压和时效性需求处理需加强）

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*