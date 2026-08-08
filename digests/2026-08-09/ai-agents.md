# OpenClaw 生态日报 2026-08-09

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-08 22:17 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-09

## 1. 今日速览

过去24小时内，OpenClaw 项目保持极高活跃度：**500条 Issue 更新**（新开/活跃 457，关闭 43）、**500条 PR 更新**（待合并 349，已合并/关闭 151），并发布 **2 个新版本**（v2026.6.33、v2026.6.34），均聚焦安全边界加固。然而，项目健康度受 **P0/P1 级稳定性问题**拖累明显：网关内存泄漏（RSS 350MB→15.5GB）、模型静默失败、升级后网关无法启动等严重问题持续占据社区讨论焦点。好消息是，维护者今日提交了约 12 个高密度修复/重构 PR，涵盖网关、CLI 后端、Web UI 等核心区域，另有 5 个 PR 已合并关闭，修复节奏正在加快。

---

## 2. 版本发布

### v2026.6.34（最新）
- **核心主题：更安全的浏览器与网络边界**
- 主要变更：
  - 沙箱化浏览器路由，拒绝不安全访问路径
  - 可信 DNS 目标白名单机制
  - 自定义浏览器来源（custom browser origins）支持
  - 回环（loopback）provider 端点加固
- 相关 PR：#97958、#38290、#103075、#110693
- 贡献者：@eleqtrizit、@brunowowk、@mosidevv、@pgondhi987
- **迁移注意**：若用户配置了自定义浏览器来源或回环端点，需检查这些配置是否仍被允许，不合规的路径将被拒绝。

### v2026.6.33
- **核心主题：网络与密钥边界加固**
- 主要变更：
  - provider 流、Discord REST 响应、浏览器抓取、OAuth 路径、日志均增加恶意响应大小上限
  - Telegram 凭证从诊断信息中彻底剥离
- 相关 PR：#96989、#95412、#99428
- 贡献者：@wangmiao0668000666、@Alix-007 等

---

## 3. 项目进展

今日共有 **151 个 PR 被合并/关闭**，以下为关键合并项及进展方向：

| PR | 标题 | 状态 | 意义 |
|---|---|---|---|
| [#120193](https://github.com/openclaw/openclaw/pull/120193) | fix(ci): isolate package Telegram QA harness | 已关闭 | 修复包导出边界问题，隔离 Teleigram QA 测试代码 |
| [#120724](https://github.com/openclaw/openclaw/pull/120724) | fix(tui): surface process terminal failures | 已关闭 | TUI 现在能区分进程退出/信号/超时，给出可操作恢复步骤 |
| [#120725](https://github.com/openclaw/openclaw/pull/120725) | fix(release): match ClawHub security fixture contract | 已关闭 | 修复发布流水线中 ClawHub 安全 fixture 契约不匹配 |
| [#120712](https://github.com/openclaw/openclaw/pull/120712) | fix(system-agent): keep inference available across routes | 已关闭 | 修复新聊天时 OpenAI 返回 `gpt-5.6-sol` 具体身份导致的误报失败 |
| [#120722](https://github.com/openclaw/openclaw/pull/120722) | fix(context-engine): avoid legacy self-degradation | 已关闭 | 修复默认 legacy 上下文引擎显示“legacy”降级误导 |
| [#120629](https://github.com/openclaw/openclaw/pull/120629) | refactor(gateway): generalize bulk session patches | 已关闭 | 统一批量会话变更 API，消除两种变更形状并存问题 |

**整体推进方向**：维护者（尤其 @steipete，今日提交 8 个 PR）正集中精力重构网关基础设施——**审计上下文规范化**（#120534）、**连接失败分类集中化**（#120505）、**节点配对层融合**（#120726）、**云工作区生命周期看护**（#120717/#120715）以及 **Web UI 看板状态保持**（#120640）。这些重构将显著降低未来维护复杂度，并为云工作区功能铺路。

---

## 4. 社区热点

### 最热 Issue

| Issue | 评论数 | 状态 | 核心诉求 |
|---|---|---|---|
| [#116277 DeepSeek v4 Flash 静默失败](https://github.com/openclaw/openclaw/issues/116277) | **164** | 已关闭 | 模型静默失败后只给通用 fallback，用户无法区分是模型问题还是配置问题 |
| [#7707 记忆信任标签](https://github.com/openclaw/openclaw/issues/7707) | **31** | 开放 | 防止恶意指令通过网页/三方技能注入记忆，实现记忆投毒防护 |
| [#44925 子代理完成静默丢失](https://github.com/openclaw/openclaw/issues/44925) | **24** | 开放 | 子代理结果丢失时无重试、无通知、无自动重启 |
| [#91588 网关内存泄漏→OOM](https://github.com/openclaw/openclaw/issues/91588) | **23** | 开放（P0） | RSS 从 350MB 涨至 15.5GB，触发反复 OOM 崩溃重启 |

### 分析
- **最尖锐的声音**：DeepSeek v4 Flash 静默失败 Issue 以 164 条评论断层领先，说明用户对“模型出错但系统不报错”的体验极度不满。该 Issue 已关闭且标注 `linked-pr-open`，社区在等待修复落地。
- **“静默失败”成为今日主线**：子代理丢失（#44925）、cron 静默失败（#87109）、消息生成但不投递（#96692）、构建成功但未送达承诺（#94536）——用户对系统**缺乏失败可见性**的抱怨集中爆发。这与 v2026.6.33/34 的安全加固形成鲜明对比：安全在加强，但可靠性仍是最痛的点。

### 热门 PR（讨论度最高）
- [#120087 Slack Enterprise Grid 按工作区路由](https://github.com/openclaw/openclaw/pull/120087)：合并风险标注为“🚨 compatibility / session-state / message-delivery”，涉及消息投递正确性，社区高度关注
- [#120534 审计规范化 admitted-run 上下文](https://github.com/openclaw/openclaw/pull/120534)：涉及安全性，XL 规模变更

---

## 5. Bug 与稳定性

### P0（严重，需立即关注）

| Issue | 问题 | 是否有修复 PR |
|---|---|---|
| [#91588 网关内存泄漏 350MB→15.5GB](https://github.com/openclaw/openclaw/issues/91588) | 进程 2-3 天内被 OOM killer 杀死，触发 launchd 反复重启 | ❌ 无 |
| [#108435 升级 2026.7.1 后网关无法启动](https://github.com/openclaw/openclaw/issues/108435) | systemd/ollama/手动启动均失败，`gateway did not start on 127.0...` | ❌ 需要更多信息 |
| [#112395 6.11→7.1 升级后迁移预检阻塞](https://github.com/openclaw/openclaw/issues/112395) | 迁移表和租约均为空，网关无法启动 | ✅ 有关联 PR |

### P1（高发）

| Issue | 问题 | 是否有修复 PR |
|---|---|---|
| [#116277 DeepSeek v4 Flash 静默失败](https://github.com/openclaw/openclaw/issues/116277) | 无回复生成，只给通用 fallback | ✅ 已关闭，有链接 PR |
| [#44925 子代理完成静默丢失](https://github.com/openclaw/openclaw/issues/44925) | 完成通知失败 (E31/E42/E45) 时无重试无通知 | ❌ 无 |
| [#96834 WhatsApp 图片楔住主通道 ~3 分钟](https://github.com/openclaw/openclaw/issues/96834) | 多模态图片导致车道阻塞，活跃回复卡死 | ❌ 无 |
| [#84583 cron 通知触发会话接管错误](https://github.com/openclaw/openclaw/issues/84583) | 用户聊天时 cron 通知导致 EmbeddedAttemptSessionTakeoverError | ✅ 有链接 PR |
| [#106231 循环检测只阻断不终止](https://github.com/openclaw/openclaw/issues/106231) | 卡死 exec 循环持续烧资源数小时 | ✅ 有链接 PR |
| [#96692 Slack 回复生成但不投递](https://github.com/openclaw/openclaw/issues/96692) | 原始投递元组丢失导致线程回复静默失败 | ✅ 有链接 PR |
| [#91144 Windows Scheduled Task 网关不保持运行](https://github.com/openclaw/openclaw/issues/91144) | 前台窗口正常，计划任务方式不稳定 | ✅ 有链接 PR |

### 值得注意的 PR 修复（今日新增）
- **#120580**：[修复插件 embedded session 所有权范围丢失](https://github.com/openclaw/openclaw/pull/120580)，影响 `runEmbeddedAgent()` 调用方
- **#120618**：[修复 sandbox 下 AGENTS.md 未被模型读取](https://github.com/openclaw/openclaw/pull/120618)（AI 辅助生成）
- **#120721**：[修复 Telegram 图片在 CLI-backed turns 中被重复消费](https://github.com/openclaw/openclaw/pull/120721)
- **#120699**：[修复 macOS LaunchAgent 重装导致网关无人看守](https://github.com/openclaw/openclaw/pull/120699)

---

## 6. 功能请求与路线图信号

### 高潜力需求（社区呼声高，有对应 PR 或维护者参与）

| Issue | 需求 | 信号强度 |
|---|---|---|
| [#7707 记忆信任标签](https://github.com/openclaw/openclaw/issues/7707) | 按来源标记记忆信任级别，防投毒 | 31 评论，2月创建仍未解决，安全团队已标记需要 product decision |
| [#10687 完全动态模型发现](https://github.com/openclaw/openclaw/issues/10687) | 支持 OpenRouter 等快速变化的模型目录 | 10 评论，P2，maintainer 参与 |
| [#68596 可配置流式看门狗超时](https://github.com/openclaw/openclaw/issues/68596) | 对长思考模型（Kimi/DeepSeek-R1）放宽 30s 限制 | 15 评论，8 👍，呼声很高 |
| [#13219 按模型用量日志](https://github.com/openclaw/openclaw/issues/13219) | 原生成本追踪/模型混合优化 | 8 评论，有 linked PR |
| [#90916 主题会话族](https://github.com/openclaw/openclaw/issues/90916) | 一个助手多个命名上下文车道 | 8 评论，2 👍，P2 但架构性需求 |

### 今日新增 PR 中的路线图信号
- **云工作区（Cloud Workers）成为重点方向**：#120717（SSH 断开保活）、#120715（回退断开清理）、#120727（Live Desktop 观察器 Labs）——OpenClaw 正在构建“看得见、管得住”的云端 Agent 运行体验，这是近期最大的产品级投入
- **审计与可观测性**：#120534（admitted-run 规范化）、#120434（worktree 清理结果记录）、#118673（`model.completed` 缺少 stopReason）——解决“静默失败不可诊断”的根因
- **发送预算守卫**：#120491 引入 per-turn per-target 发送预算，直接回应“重复消息刷屏”（#55694）问题

---

## 7. 用户反馈摘要

### 高频痛点（按出现频率）
1. **“成功了但用户没收到”**——多次出现于 Slack（#96692）、WhatsApp（#92186）、Feishu（#92076）、Teams（#98870）等渠道，表现为“内部已完成、外部已读、但消息未送达”，用户需要自行从 dashboard 发现
2. **“升级后坏了”**——2026.7.1 升级导致网关无法启动（#108435）、Feishu 流式渲染卡顿（#108265）、频道 dispatch 失败（#114020），用户对升级风险抱怨集中
3. **“失败后无反馈”**——DeepSeek 静默失败（#116277）、子代理丢失（#44925）、cron 静默失败（#87109），用户表示“不知道是模型问题还是配置问题”
4. **“同一问题反复出现”**——#94536 指出 PR #92231 修复不完整，承诺标记为“sent”但从未投递；#48810 指出压缩重试产生孤儿分支

### 用户满意的方向
- 安全加固获得认可：v2026.6.33/34 的沙箱路由、凭证脱敏等改进多个 Issue 中感谢了贡献者
- 维护者响应速度：今日 151 个 PR 被合并/关闭，多个 PR 标注“AI-assisted (Codex)”，社区对此类效率提升持积极态度

### 渠道问题分布
- **Feishu**：流式渲染卡顿（#108265）、频道 dispatch 失败（#114020）、工具失败刷屏（#55694）
- **Telegram**：DeepSeek 失败（#116277）、cron 会话接管（#84583）
- **WhatsApp**：图片楔住（#96834）、群组并发回复丢失（#92186）
- **Slack**：线程投递丢失（#96692）
- **Teams**：50 条以上回复被截断（#98870）
- **通用**：内存泄漏/堆增长导致的各种连锁故障（#91588/#87109）

---

## 8. 待处理积压

### 长期未关闭的高优 Issue

| Issue | 创建时间 | 持续时间 | 当前状态 | 风险 |
|---|---|---|---|---|
| [#7707 记忆信任标签](https://github.com/openclaw/openclaw/issues/7707) | 2026-02-03 | **6 个月+** | 31 评论，标记需安全审查+产品决策 | 记忆投毒安全风险持续存在 |
| [#10687 动态模型发现](https://github.com/openclaw/openclaw/issues/10687) | 2026-02-06 | **6 个月+** | 10 评论，maintainer 参与但未推进 | 模型目录静态化，新模型无法及时使用 |
| [#38327 Gemini 3.1 Pro "Cannot convert undefined or null"](https://github.com/openclaw/openclaw/issues/38327) | 2026-03-06 | **5 个月+** | 13 评论，`needs-live-repro` | 3.2 版本仍存在的回归 |

### 今日新增但缺少维护者响应的 P1
- **#120639（隐含）**：PR #120640 修复了 dashboard 跨视图切换的重载问题，但 Issue 本体未见维护者回复
- **#118673**：`model.completed` 缺少 `stopReason`，导致静默截断无法诊断——已有 linked PR，等待 review

### 积压风险提示
OpenClaw 项目当前 **349 个 PR 待合并**，其中多个标注 `⏳ waiting on author`（等待作者回应），这可能是合并瓶颈的信号。建议维护者优先处理：① #120087（Slack 企业网格路由，涉及消息投递）；② #120505（连接失败分类集中化，减少多处正则维护）；③ #120716（doctor 遗留迁移统一路径，XL 规模但影响面广）。

---

**总结**：OpenClaw 正处于**安全加固与可靠性攻坚并行**的关键期。安全方面连续两个版本聚焦边界收紧；可靠性方面则面临内存泄漏、静默失败、升级回归三大顽疾。今日维护者 PR 密度极高（@steipete 单日 8 个），方向正确（审计/可观测/云工作区），但 P0 内存泄漏和多个 P1 消息丢失问题仍缺修复 PR，是当前项目健康度的最大短板。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-08-09**


## 1. 生态全景

个人 AI 助手与自主智能体开源生态正处于**高活跃度的快速演进期**，六大项目单日合计产生近千条 Issue/PR 更新，反映出社区参与热情极高。当前生态主线已从“实现功能”转向“**加固可靠性**”——跨项目反复出现的静默失败、消息丢失、内存泄漏等问题表明，智能体系统的稳定性正替代功能丰富度成为核心竞争要素。安全边界加固（沙箱、权限隔离、凭据脱敏）成为各项目共同投入方向，且有从网络层向数据层（记忆、知识图谱）纵深延伸的趋势。与此同时，可观测性、审计能力和用户对运行行为的可控性诉求日益强烈，预示智能体基础设施正在走向成熟。


## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | PR 合并/关闭 | Release | 核心问题/健康度 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃 457，关闭 43） | 500（待合并 349，合并/关闭 151） | 151 | 2 个（v2026.6.33/34） | 活跃度最高，但 P0 内存泄漏（RSS 350MB→15.5GB）无修复 PR，静默失败类问题集中爆发；维护者 PR 密度极高（@steipete 单日 8 个），方向正确但落地需时间 |
| **hermes-agent** | 369（关闭 80） | 500（合并/关闭 206） | 206（41.2%） | 无 | 高吞吐迭代，PR 流转效率健康；P1 级桌面冻结、会话安全等问题未解决，高赞功能请求（temperature 可配置，13👍）长期无决策；整体健康度良好 |
| **Zeroclaw** | 50（活跃 49，关闭 1） | 50（全部待合并） | **0** | 无 | 安全审计发现速度远超修复合并速度（50 条 PR 零合并），存在 fail-open 安全漏洞（WhatsApp allowlist 失效）；合并流程是最大瓶颈 |
| **QwenPaw** | 18（新开/活跃 16，关闭 2） | 50（待合并 49，关闭 1） | 0 | 无 | 活跃度较高，但 49 条 PR 无合并，SQLite SIGBUS 崩溃和 MCP 连接阻塞属严重稳定性问题；合并节奏偏慢 |
| **PicoClaw** | 3（活跃 2，关闭 1） | 4（全部待合并） | 0 | 无 | 社区贡献稳定但规模最小，4 条 PR 中有 2 条已入 stale 区间；WhatsApp 连接故障有修复 PR 待合并，维护者审查速度需提升 |
| **AstrBot** | 17（新增/活跃 7，关闭 10） | 12（待合并 3，合并/关闭 9） | 9 | 无 | 规模最小但**闭环效率最高**（9/12 PR 当日合并），问题解决速度快；P1 日志体验问题无响应，文件触发会话锁异常复现率 90% 需警惕 |

**总体结论**：OpenClaw 与 hermes-agent 处于绝对活跃度第一梯队；Zeroclaw 安全投入力度大但交付受阻；QwenPaw 与 AstrBot 规模相近但前者合并慢、后者效率高；PicoClaw 为轻量级但存在维护瓶颈。


## 3. OpenClaw 在生态中的定位

**OpenClaw 是生态中体量最大、覆盖面最广的“旗舰型”项目**，在社区规模、迭代速度、版本发布频率和功能广度上均显著领先。具体优势与差异：

- **社区规模断层领先**：单日 500 Issue + 500 PR 更新，远超 hermes-agent（869 合计但含 Issue）之外的其余项目（Zeroclaw/QwenPaw 均为 50 PR 量级）。Issue 单条最高 164 评论（DeepSeek 静默失败），也侧面反映其用户基数的庞大。
- **技术路线差异**：OpenClaw 的差异化在于**“全渠道、全平台、全功能”的统一网关架构**，且率先将**云工作区（Cloud Workers）**作为战略投入方向（#120717/#120715/#120727），这是其他项目尚未触及的产品增量。
- **版本迭代节奏最快**：单日发布 2 个安全版本（v2026.6.33/34），安全响应速度和发布流水线成熟度在生态中领先。
- **核心短板**：与 hermes-agent 相比，OpenClaw 的 PR 合并率较低（30.2% vs 41.2%），349 条待合并 PR 形成显著积压。P0 级内存泄漏长期无修复，可靠性问题（静默失败、消息丢失）在多个渠道（Slack/WhatsApp/Feishu/Teams）反复出现，形成“安全在加强、可靠仍在拖后腿”的剪刀差。

**与同类相比的结论**：OpenClaw 是生态的“风向标”和“基础设施层”，但稳定性的短板给了 hermes-agent（高可靠迭代）、Zeroclaw（安全纵深）等差异化竞争者机会。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **静默失败可诊断性** | OpenClaw、Zeroclaw、QwenPaw、AstrBot | 模型无回复/子代理丢失/cron 静默丢弃时，系统不报错或不给可操作信息。各项目均出现“内部已完成但用户未收到”或“运行记录 ok 但输出丢失”的现象 |
| **安全边界与权限隔离** | OpenClaw、Zeroclaw、AstrBot、PicoClaw | 沙箱化浏览器路由（OpenClaw v2026.6.34）、per-agent 所有权隔离（Zeroclaw #9745/9746）、MCP 工具名清洗（AstrBot #9534）、OAuth 2.1 支持（PicoClaw #3302）；**记忆投毒防护**成为新焦点（OpenClaw #7707 31 评论，6 个月未解决） |
| **可观测性与审计** | OpenClaw、hermes-agent、AstrBot | 用户强烈要求知道“模型还是配置出了问题”；审计上下文规范化（OpenClaw #120534）、日志 DEBUG 层级透传（AstrBot #9527 P1）、工具调用与 token 用量日志 |
| **上下文管理与长会话可靠性** | OpenClaw、QwenPaw、hermes-agent | 上下文压缩导致主对话阻塞（QwenPaw #6811）、上下文压缩丢弃工具链结果（hermes-agent #79278）、流式看门狗超时对长思考模型不友好（OpenClaw #68596）；底层 SQLite 持久化崩溃（QwenPaw #6814 SIGBUS） |
| **成本控制与模型路由** | OpenClaw、QwenPaw、Zeroclaw | 可配置流式超时、按模型用量日志、自定义模型排序、provider 多别名价格忽略致预算失效等；token 成本敏感度高（hermes-agent 全量工具注入约 14k tokens） |
| **桌面端稳定性** | hermes-agent、QwenPaw、PicoClaw | UI 完全冻结（hermes-agent #63047）、空闲 CPU 占用飙升（QwenPaw #6828 20%、PicoClaw #3292）、输入框聚焦高 CPU；桌面端是 C 端用户核心入口，稳定性影响面大 |
| **动态模型发现** | OpenClaw、PicoClaw、QwenPaw | 模型目录静态化无法及时使用新模型（OpenClaw #10687，6 个月+）；多项目均在新增 provider 接入（QwenPaw 单日 3 个新 provider PR） |


## 5. 差异化定位分析

| 项目 | 核心定位 | 目标用户 | 技术架构关键特征 | 社区/治理特征 |
|---|---|---|---|---|
| **OpenClaw** | 全功能个人 AI 助手网关 | 开发者、极客、企业试点 | 统一网关 + 多渠道适配 + 沙箱浏览器 + 云工作区；版本迭代最快，安全响应最迅速 | 大社区、高活跃、PR 积压明显；维护者主导的重构方向明确 |
| **hermes-agent** | 高性能自主智能体 | 开发者、高要求个人用户 | 侧重 Agent 运行效率与工具链完整性；PR 合并率高、迭代节奏稳健 | 社区火热（单日 869 更新）、讨论深度高（god-file 重构 62 评论）；高赞功能需求长期 pending 是痛点 |
| **Zeroclaw** | 安全至上的自主智能体 | 安全敏感型用户、企业 | 强化 per-agent 所有权隔离、WASM 沙箱超时、防嵌套 Docker；安全审计文化浓厚 | 社区以审计/发现漏洞为主要贡献模式；合并流程严重滞后，安全修复“只发现不修复”风险高 |
| **QwenPaw** | 面向 Python/AI 框架生态的助手 | 国内开发者、AI 应用开发者 | 与 agentscope 框架深度集成、多 provider（Volcengine/NVIDIA/Atlas）接入；桌面端 + 本地模型支持 | 国内用户占比高（国产 provider 诉求强）；社区贡献活跃但合并瓶颈明显 |
| **PicoClaw** | 轻量级多协议 IM 助手 | 嵌入式/轻量部署用户、IM 协议爱好者 | 聚焦 IM 渠道覆盖（WhatsApp/Simplex/DeltaChat/IRC/Matrix）、前缀缓存 token 优化；依赖简单（Go） | 小社区、贡献稳定、维护者精力有限、PR 易 stale |
| **AstrBot** | 国内 IM 平台全覆盖的 Bot 框架 | 国内个人开发者、社群管理员 | 插件化 + 多平台适配（QQ/Telegram/钉钉/飞书等）+ WebUI 管理；插件生态活跃（支持 MindSim 事件驱动框架） | 社区协作效率极高（当日 PR 合并率 75%）；但规模较小、国际化程度低 |


## 6. 社区热度与成熟度分层

| 阶段 | 项目 | 判断依据 |
|---|---|---|
| **快速迭代期** | OpenClaw、hermes-agent | 单日 PR 合并均超过 150/200，功能迭代和修复节奏快，社区讨论度高；OpenClaw 侧重安全+云工作区扩张，hermes-agent 侧重性能与桌面端优化 |
| **安全攻坚期** | Zeroclaw | 社区大量产出安全审计报告，Issue 多为高风险漏洞（fail-open、路径逃逸、越权），但修复合并为 0——处于“发现问题快于解决问题”的攻坚阶段 |
| **质量巩固期** | AstrBot、QwenPaw | 功能框架已基本稳定，当前以修 bug、优化体验为主（AstrBot 会话锁、QwenPaw SQLite 崩溃）；AstrBot 闭环效率高，QwenPaw 受 PR 积压拖累 |
| **贡献活跃但瓶颈明显** | PicoClaw | 社区贡献持续但规模小，维护者审查能力不足，PR 多入 stale 区间，项目有“活而不进”的风险 |


## 7. 值得关注的趋势信号

1. **“静默失败”成为生态公敌**：OpenClaw（DeepSeek 164 评论）、Zeroclaw（cron 静默丢弃）、QwenPaw（MCP 断连永久阻塞）、AstrBot（文件触发锁异常）均出现用户对系统不报错/不给反馈的强烈抱怨。“可诊断性”正从可观测性细分项升级为智能体系统的基本要求，能率先建立完善失败可见性机制的项目将获得显著竞争优势。

2. **安全重心向数据面纵深迁移**：从网络边界（沙箱路由、DNS 白名单）扩展到数据所有权（Zeroclaw per-agent 知识图谱隔离）、记忆防投毒（OpenClaw #7707）、配置 fail-open 语义审计（Zeroclaw #9348）。安全不再只是“防攻击”，而是“防误导、防越权、防泄露”三位一体。

3. **“成功但未投递”类消息可靠性问题高发**：各渠道（Slack/WhatsApp/Feishu/Teams/Telegram）均出现“内部完成、外部已读、用户未收到”的现象，涉及投递元组丢失、线程回复静默失败、图片阻塞车道等。智能体的“最后一公里”投递可靠性将成为渠道适配层的新竞争焦点。

4. **架构治理成为社区共识**：hermes-agent 将 god-file 分解设为 standing policy（62 条评论）、Zeroclaw 讨论 crate 收敛（#8043/#9803）、OpenClaw 推进网关重构与审计规范化——社区开始从“堆功能”转向“还技术债”，为长期可维护性铺路。开发者应关注目标项目的架构演进方向，避免基于即将重构的接口做二次开发。

5. **桌面端体验决定 C 端口碑**：多个项目出现桌面端 UI 冻结、CPU 空转、路径错乱等问题，且用户反馈情绪强烈。桌面端作为个人 AI 助手主要交互入口，其稳定性与流畅度正成为用户留存的关键因素；前端渲染管道优化（CRDT 行级 fiber、CSS 动画治理）是当务之急。

6. **上下文工程的可靠性需求爆发**：长会话场景下，上下文压缩不再只是“省 token”的问题，而是涉及会话阻塞、工具链结果丢失、推理模型兼容性（thinking 模式与 disable_thinking 冲突）的系统级挑战。未来的智能体需要将上下文压缩视为与消息投递同等重要的可靠性组件来设计。

7. **云工作区是下一个产品级战场**：OpenClaw 已投入 SSH 保活、Live Desktop 观察器、云工作区生命周期管理，预示“云端 Agent 运行时可观测/可管控”将成为旗舰项目下一阶段的核心差异化能力，其他项目暂时缺席此方向。

8. **中国区生态力量崛起**：QwenPaw（Volcengine/MiMo/NVIDIA NIM 接入）、AstrBot（国内 IM 全覆盖）显示国内云厂商模型与中文 IM 生态正在形成独立而活跃的智能体开源分支，与国际化项目（OpenClaw/hermes-agent）在 provider 覆盖与渠道适配上的侧重点呈现明显分化。

---

*报告基于 2026-08-09 各项目 GitHub 社区动态整理，数据来源见各项目日报。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-09

## 1. 今日速览

过去 24 小时项目保持高热度的社区活跃度：共产生 50 条 Issue 更新（49 条活跃、1 条关闭），50 条 PR 全部处于待合并状态，无新版本发布。安全与权限控制是当前最集中的议题，约 1/3 的热门 Issue 涉及安全风险（WhatsApp 越权回复、forbidden_paths 失效、区块链地址误脱敏、紧急停止机制失效等），且多位维护者在互相补充同一问题域的审计发现。PR 侧 eval 测试体系（@IftekharUddin 的 8 个系列 PR）与安全加固（per-agent 所有权隔离、WASM 超时、Docker 沙箱嵌套）构成主要待并入工作。值得注意的隐忧是：50 条 PR 无一合并，且多条 PR 标注 `needs-author-action`，合并流程可能存在等待作者响应的积压。

---

## 3. 项目进展

> 注：过去 24 小时无 PR 被合并或关闭，以下为待合并 PR 所体现的已就绪工作，仅作进度陈列，正式纳入主线仍需等待合并。

### 3.1 安全与权限加固（多个高危修复已就绪）

- **per-agent 所有权隔离（工具层）** — [#9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746)：为 sessions 系列工具与 discord_search 增加 per-agent 所有权绑定，杜绝跨 agent 会话读取/写入。
- **per-agent 所有权隔离（记忆层）** — [#9745](https://github.com/zeroclaw-labs/zeroclaw/pull/9745)：为知识图谱增加 agent 归属维度，修复任意 agent 可读写其他 agent 知识的问题。
- **WASM 插件墙钟超时** — [#9403](https://github.com/zeroclaw-labs/zeroclaw/pull/9403)：为所有 WASM 导出（工具/记忆/渠道）增加 30s 宿主侧 deadline。
- **避免 Docker 沙箱嵌套** — [#9402](https://github.com/zeroclaw-labs/zeroclaw/pull/9402)：修复 runtime.kind=docker 时进一步嵌套 Docker 沙箱的问题。
- **Compose 网关可达性** — [#9215](https://github.com/zeroclaw-labs/zeroclaw/pull/9215)：修复 Docker Compose 后端口 Connection refused（对应 Issue #9035）。

### 3.2 eval 测试体系（8 个系列 PR，构建完整评测闭环）

@IftekharUddin 提交的 eval 系列覆盖：实时沙箱执行（[#9214](https://github.com/zeroclaw-labs/zeroclaw/pull/9214)）、LLM-judge 分级（[#9222](https://github.com/zeroclaw-labs/zeroclaw/pull/9222)）、基线回归门禁（[#9221](https://github.com/zeroclaw-labs/zeroclaw/pull/9221)）、运行回执与失败转储（[#9220](https://github.com/zeroclaw-labs/zeroclaw/pull/9220)）、JUnit 报告（[#9223](https://github.com/zeroclaw-labs/zeroclaw/pull/9223)）、内存种子与断言（[#9244](https://github.com/zeroclaw-labs/zeroclaw/pull/9244)）、judge 校准工具（[#9245](https://github.com/zeroclaw-labs/zeroclaw/pull/9245)）、历史回执（[#9248](https://github.com/zeroclaw-labs/zeroclaw/pull/9248)）。若全部合入，将形成从执行、评分、回归到报告的完整评测链。

### 3.3 渠道与运行时增强

- **Inkbox 原生渠道** — [#8384](https://github.com/zeroclaw-labs/zeroclaw/pull/8384)：新增 email+SMS+voice+iMessage 统一渠道（XL 规模）。
- **Matrix 单消息进度草稿** — [#8443](https://github.com/zeroclaw-labs/zeroclaw/pull/8443)：支持 single_message 流式模式。
- **上下文耗尽提示** — [#9504](https://github.com/zeroclaw-labs/zeroclaw/pull/9504)：回合因上下文不足终止时显示终端通知。
- **技能审查消息捕获修复** — [#9515](https://github.com/zeroclaw-labs/zeroclaw/pull/9515)：避免 history 切片错位。

### 3.4 项目整体进度评估

虽然合并为 0，但待合并 PR 所覆盖的广度与深度可观——安全隔离、评测体系、渠道扩展三个方向均已从讨论进入可评审代码状态。真正的瓶颈在合并环节，建议维护者优先处理标注了 `needs-author-action` 的旧 PR（如 #8384、#9248、#9223 等），避免工作停滞。

---

## 4. 社区热点

### #8424 — RFC：Workspace 相对的 forbidden path 模式与可选 .zeroclawignore（11 评论）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8424)

当前 `forbidden_paths` 仅拦截 workspace 外部路径，workspace 内部的 `.env`、`rust-toolchain.toml`、`config.yaml` 等敏感文件无法被保护。社区诉求明确：需要一种 workspace 内相对路径模式（类似 `.gitignore` 语义）让用户声明“AI 不可触碰”的文件集。该 Issue 同时关联 #9815 中“forbidden_paths 对 allowed_roots 下路径完全失效”的审计发现，说明此问题已被反复验证，且带有 `risk:high`、`needs-author-action` 标记，进展取决于作者补充设计方案。

### #8043 — RFC：将 aardvark-sys crate 折叠进 zeroclaw-hardware（10 评论）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8043)

社区对硬件相关 crate 的碎片化表达了整理意愿。作者明确提出“同形状问题”的类比：专门硬件支持以独立 workspace member 存在，文档还标注“除非你在做自己的机器人，否则超出范围”。这反映了项目在架构收敛上的取向——减少维护面、将分散的硬件支持收拢为一个统一的 `zeroclaw-hardware`。配套的 #9803（zeroclaw-robot-kit 同样折叠）获得 accepted 状态，说明该方向已获得维护者共识。

### #8054 — System prompt 工具可用性与 per-turn 有效工具不一致（10 评论）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8054)

核心 bug：system prompt 告诉推理模型“没有工具可用”，但实际请求中携带了 native/MCP 工具。直接 runtime agent 路径已通过 #8053 修复，但相同问题在 WebSocket、gateway、多模态、/think 等其他入口仍存在。评论区的关注点在于“同类问题不应逐个入口打补丁，而应有统一的 system prompt 构造层”。这是一类架构性 bug 的典型讨论模式。

### #9348 — WhatsApp Web 在 business 模式下应答所有 DM 与群组（9 评论）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9348)

被标记为 S1 安全风险。核心矛盾是“配置读起来像被锁定，实际行为是完全开放”：chat policies 仅作用于 personal 模式，而 business 模式下空的 `allowed_groups` 反而放行所有群聊。这是一个配置语义与执行行为不一致的典型安全漏洞（fail-open 而非 fail-closed），评论区基本围绕“默认应拒绝”达成立场一致，等待修复方案。

---

## 5. Bug 与稳定性

### S1 — 严重（工作流阻断/安全风险）

| Issue | 问题描述 | 状态 |
|---|---|---|
| [#9348](https://github.com/zeroclaw-labs/zeroclaw/issues/9348) | WhatsApp business 模式应答所有 DM/群组，allowlist 失效，fail-open 安全漏洞 | in-progress |
| [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) | 退出 Web 仪表盘聊天窗口导致 agent 任务循环被中断，后台工作完全阻塞 | in-progress |
| [#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207) | web_fetch 对 gzip/brotli/deflate 压缩响应返回乱码二进制，agent 无法解析 | in-progress |
| [#9035](https://github.com/zeroclaw-labs/zeroclaw/issues/9035) | Docker Compose 后 gateway 仍绑定 loopback，端口不可达 | in-progress（有 fix PR #9215） |
| [#9390](https://github.com/zeroclaw-labs/zeroclaw/issues/9390) | 紧急停止（emergency stop）是 CLI-only 状态文件，运行时无任何路径读取 | in-progress |
| [#9815](https://github.com/zeroclaw-labs/zeroclaw/issues/9815) | forbidden_paths 对 allowed_roots 或 workspace 下的路径完全不可达 | accepted |
| [#9825](https://github.com/zeroclaw-labs/zeroclaw/issues/9825) | 出站泄露检测器将公开区块链地址误判为高熵 token 并脱敏，支付链接无法投递 | accepted |
| [#9805](https://github.com/zeroclaw-labs/zeroclaw/issues/9805) | auto 模式 SOP 从 channel/cron 触发后永远停在 step 1，占用并发槽位且无法恢复 | in-progress |

### S2 — 中等（功能降级）

| Issue | 问题描述 | 状态 |
|---|---|---|
| [#9486](https://github.com/zeroclaw-labs/zeroclaw/issues/9486) | 高熵检测器对 Telegram 出站消息中的 Solana 钱包地址脱敏，且 `high_entropy_tokens=false` 不生效 | in-progress |
| [#8731](https://github.com/zeroclaw-labs/zeroclaw/issues/8731) | stdio MCP 服务器子进程未回收，daemon 下累积僵尸进程 | in-progress |
| [#9340](https://github.com/zeroclaw-labs/zeroclaw/issues/9340) | CLI 创建的 cron 任务 delivery 硬编码为 none，输出被静默丢弃 | in-progress |
| [#9573](https://github.com/zeroclaw-labs/zeroclaw/issues/9573) | 同一 provider 多别名配置下 token 价格被忽略，成本计算失效 | accepted |
| [#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) | Anthropic provider 记录 cost_usd=0.0，导致日/月预算上限永不触发 | accepted |
| [#9843](https://github.com/zeroclaw-labs/zeroclaw/issues/9843) | 长连接下 zerocode 客户端与 daemon 同时 CPU 空转超过 100%（已关闭，需复现） | **closed** |

### S3 — 轻微

- [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) Telegram 媒体组未合并为单个多模态回合（6 评论） — in-progress
- [#9834](https://github.com/zeroclaw-labs/zeroclaw/issues/9834) zeroclaw-runtime 测试因进程全局共享状态间歇失败 — accepted

### 关键趋势

安全审计类 bug 大量出现（#9815、#9825、#9390、#9387 等均由社区成员逐行审计后提交），且多条获得 `accepted` 状态但尚未关联 fix PR。**安全修复的合并速度明显落后于发现速度**，是当前项目健康度的最大风险点。

---

## 6. 功能请求与路线图信号

### 可能进入下一版本的信号

| 功能请求 | 热度/状态 | 关联 PR 或判断依据 |
|---|---|---|
| **[#8550](https://github.com/zeroclaw-labs/zeroclaw/issues/8550) OpenAI 兼容 chat completions 端点** | p1, in-progress | 呼声高——社区需要让 Open WebUI/LobeChat 等标准客户端直接接入 ZeroClaw |
| **[#8424](https://github.com/zeroclaw-labs/zeroclaw/issues/8424) .zeroclawignore 工作区忽略文件** | 11 评论，p2 RFC | 与 #9815 相互印证，文件访问安全已成为用户核心诉求 |
| **[#9824](https://github.com/zeroclaw-labs/zeroclaw/issues/9824) 简化默认 web 工具面** | p1, in-progress | 从 5 个重叠工具收敛为 web_fetch + web_research + http_request 三个动词，browser 自动化改为 opt-in |
| **[#8445](https://github.com/zeroclaw-labs/zeroclaw/issues/8445) Telegram 多消息模式** | p2, in-progress | 解决多回合文本拼接为单条消息的体验问题 |
| **[#9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496) RFC 流程简化** | p1, needs-maintainer-review | 流程现代化——缩短 7 天讨论期、降低全票一致要求，直接影响项目治理效率 |
| **[#8410](https://github.com/zeroclaw-labs/zeroclaw/issues/8410) 渠道任务一等公民“不回复”结果** | p2, accepted | “有新邮件才通知，否则保持沉默”类条件任务需要原生静默出口 |

### 已提交 PR 的新功能（若合并将改变产品形态）

- **Inkbox 原生渠道（#8384）**：agent 可拥有跨 email/SMS/voice/iMessage 的持久身份，可能重新定义“渠道”的概念。
- **eval 评测体系（#9214/#9222/#9221 等）**：项目自带的回归评测门禁，对大型重构的质量保障意义重大。
- **Herdr agent 状态集成（#8337）**：CLI 交互模式自动上报 agent 生命周期。

---

## 7. 用户反馈摘要

### 安全配置的“预期落差”是最大痛点

- WhatsApp 用户（#9348）：“我认为我配置了 allowlist，结果 agent 对每条入站消息都有回复，包括无关群聊。”——配置表现为 locked down 但实际 fail-open，破坏信任。
- Solana 集成用户（#9486）：“我的 agent 无法说出钱包地址，每个地址都被替换为 `[REDACTED_HIGH_ENTROPY_TOKEN]`”，且 `high_entropy_tokens=false` 也无法绕过——安全机制缺少“可信上下文”豁免能力。
- 支付场景用户（#9825）：“公开区块链地址被误杀，支付请求 URL 无法投递”——假阳性与真阳性同样严重，安全不应对合法业务场景无差别拦截。

### 后台任务可靠性被反复提及

- Web 仪表盘用户（#8559）：“退出聊天窗后 agent 直接停止循环，我完全无法在 agent 工作时做其他事。”——对话式 UI 与后台任务的耦合设计需要重新思考。
- cron 用户（#9340）：“任务按计划运行、工具也调用了，但输出被静默丢弃，运行记录还是 ok。”——静默失败比显式报错更伤害信任。
- SOP 用户（#9805）：“auto 模式的 SOP 永远停在第一步，占着并发槽位，重启也恢复不了。”——长驻运行机制需要健康检查和超时恢复。

### 正向反馈

- 社区对维护者应对安全问题的响应速度总体认可（多条 p1 已标 in-progress/accepted）。
- 普通用户对 Telegram 功能细节（#6663 工具调用进度、#8445 多消息模式）的持续 request，说明频道体验已达到一定可用度、开始被更精细地打磨。

---

## 8. 待处理积压

### 长期未响应或停滞的高优 Issue

| Issue | 核心问题 | 创建时间 | 当前状态 |
|---|---|---|---|
| [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) | Telegram 媒体组不合并为多模态回合 | 2026-04-08（4 个月） | in-progress |
| [#8410](https://github.com/zeroclaw-labs/zeroclaw/issues/8410) | 渠道任务缺少一等“不回复”结果 | 2026-06-28 | accepted |
| [#8424](https://github.com/zeroclaw-labs/zeroclaw/issues/8424) | 工作区内敏感文件保护（.zeroclawignore） | 2026-06-28 | needs-author-action — **需作者补充修改** |
| [#8043](https://github.com/zeroclaw-labs/zeroclaw/issues/8043) | aardvark-sys 折叠进 zeroclaw-hardware | 2026-06-20 | needs-author-action |

### 卡在 `needs-author-action` 的 PR（需作者回应）

| PR | 功能 | 等待时长 |
|---|---|---|
| [#8384](https://github.com/zeroclaw-labs/zeroclaw/pull/8384) | Inkbox 渠道（XL） | ~6 周 |
| [#9248](https://github.com/zeroclaw-labs/zeroclaw/pull/9248) | eval 历史回执 | ~3 周 |
| [#9223](https://github.com/zeroclaw-labs/zeroclaw/pull/9223) | JUnit XML 报告 | ~3 周 |
| [#9745](https://github.com/zeroclaw-labs/zeroclaw/pull/9745) | 知识图谱 per-agent 隔离 | ~5 天 |

### 维护者行动建议

1. **安全合并优先级**：#9815（forbidden_paths 失效）、#9390（紧急停止未接线）、#9348（WhatsApp fail-open）三项应优先推动修复合并。
2. **解决 PR 积压**：50 条 PR 待合并、多条等待作者行动，建议对超 2 周的 PR 给出回应或 CI 重新验证。
3. **关注 #8054 这类“同 bug 多入口”问题**：设计统一的 prompt 构造层而非逐入口修复，避免结构性债务。

---

*数据来源：Zeroclaw (github.com/zeroclaw-labs/zeroclaw) GitHub 仓库，统计窗口 2026-08-08 至 2026-08-09。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-09

> 数据来源：[github.com/sipeed/picoclaw](https://github.com/sipeed/picoclaw)｜统计时段：过去 24 小时（截至 2026-08-08）

---

## 1. 今日速览

- 过去 24 小时 Issue 更新 3 条（2 条活跃、1 条关闭），PR 更新 4 条但均为待合并状态，无新版本发布。
- 社区侧讨论集中在 **IRC 长消息支持**（#3287，4 条评论）和 **MCP OAuth 2.1 支持**（#3302）等增强类议题上，功能诉求多于 Bug 报告。
- 维护侧今日没有合并/关闭任何 PR，4 条待合并 PR 中包括 **WhatsApp 连接失败修复**（#3320）和 **前缀缓存优化**（#3321），已进入可审查状态。
- 一个长期悬置的高 CPU 占用 Bug（#3292）在昨日关闭，但未关联 fix PR，建议后续确认修复方式。
- 综合来看：项目社区活跃度中上，贡献者产出稳定，但**维护者合并吞吐偏低，PR 积压与 stale 风险上升**，需要加快审查节奏。

---

## 2. 版本发布

无新版本 Release（最新 Releases 为空）。

---

## 3. 项目进展

今日没有合并或关闭的 PR。但有 4 条 PR 保持在待合并状态，预示项目在以下方向正在推进：

| PR | 主题 | 潜在影响 |
| --- | --- | --- |
| [#3320](https://github.com/sipeed/picoclaw/pull/3320) | 升级 `whatsmeow` 依赖，修复 WhatsApp “Client outdated (405)” 导致频道失联的问题 | 恢复原生 WhatsApp 通道的可用性，属于**用户可感知的连接稳定性修复** |
| [#3321](https://github.com/sipeed/picoclaw/pull/3321) | 将动态上下文（时间/运行环境/会话信息）移出系统提示词前缀，调整到历史记录之后 | 保护前缀缓存的命中率，预计可降低长对话场景下的 token 成本与延迟 |
| [#3193](https://github.com/sipeed/picoclaw/pull/3193) | 新增 Simplex 频道类型 | 扩展 PicoClaw 的 IM 协议矩阵，向去中心化信道延伸 |
| [#3222](https://github.com/sipeed/picoclaw/pull/3222) | DeltaChat 实现清理，移除遗留功能与过时测试，精简约 200 行代码 | 降低维护成本、减少技术债务，明确官方中继列表引用方式 |

> 注意：以上 PR 均未合并，项目实际“向前迈进”的部分取决于维护者本周是否完成审查。

---

## 4. 社区热点

### 🔥 讨论最活跃

- [#3287 [Feature] Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287) — **4 条评论**
  - 诉求：IRCv3 默认限制单条消息 512 字节，超长消息会被客户端自动分割；用户希望 PicoClaw 能将同一逻辑消息的分段视为一个完整的消息处理。
  - 分析：这是**协议语义层**的功能增强，涉及消息聚合、上下文关联与多行会话连续性。Issue 已带 stale 标记，但昨日仍有更新，说明讨论仍在持续。

- [#3302 [Feature] Support OAuth 2.1 for MCP servers](https://github.com/sipeed/picoclaw/issues/3302) — **2 条评论**
  - 诉求：希望 MCP 服务器支持 OAuth 2.1，并直接引用了此前 #2546 的同类需求。
  - 分析：说明 OAuth 2.1 是社区反复提出的需求，已形成**连续诉求信号**，值得路线图参考。

- [#3292 [BUG] 聊天界面输入框在选中时 CPU 占用高](https://github.com/sipeed/picoclaw/issues/3292) — **2 条评论**（已关闭）
  - 用户报告在 Firefox 中使用 Web 频道时，聚焦输入框会使 CPU 占用异常飙升。该 Issue 已于昨日关闭，但未看到关联 fix PR，关闭原因值得留意。

---

## 5. Bug 与稳定性

### 中等严重度

- [#3292 聊天界面输入框聚焦时 CPU 占用高](https://github.com/sipeed/picoclaw/issues/3292)
  - 环境：PicoClaw 0.3.1 / Go 1.26 / deepseek-v4-flash / Debian Linux x64 / Firefox Web 端
  - 影响：Web 输入框持续选中时 CPU 异常升高，影响交互流畅度与电池续航。
  - 状态：**昨日关闭**，但未发现对应的修复 PR，建议维护者补充关闭说明或关联修复记录。

### 稳定性相关 PR（待合并）

- [#3320 fix(deps): bump whatsmeow to unblock WhatsApp “client outdated (405)”](https://github.com/sipeed/picoclaw/pull/3320)
  - WhatsApp 服务器已拒绝当前固定版本 `whatsmeow` 所声明的客户端版本，连接建立约 5 秒后即被断开，且无重连机制。
  - 影响：使用原生 WhatsApp 通道的用户会持续无法收发消息。
  - 状态：**有修复 PR 待合并**，建议优先审查。

---

## 6. 功能请求与路线图信号

### 新/活跃的功能请求

- [#3287 IRC 长消息支持](https://github.com/sipeed/picoclaw/issues/3287)
  - 要求将 IRCv3 自动分割的长消息聚合为单一消息。需要消息缓冲、等待后续分片、超时处理等机制。
  - 路线图判断：**可能纳入短期迭代**，属于提升实际聊天体验的实用增强。

- [#3302 MCP 服务器 OAuth 2.1 支持](https://github.com/sipeed/picoclaw/issues/3302)
  - 与 #2546 同质，属于社区反复提及的认证现代化需求，适合作为平台级安全改进项目排期。

### 已在 PR 中体现的信号

- Simplex 协议支持（[#3193](https://github.com/sipeed/picoclaw/pull/3193)）与 DeltaChat 精简（[#3222](https://github.com/sipeed/picoclaw/pull/3222)）说明**多协议接入仍是核心扩展方向**。
- 前缀缓存优化（[#3321](https://github.com/sipeed/picoclaw/pull/3321)）显示贡献者开始关注**大模型 API 成本与性能调优**，这是一个良好的项目健康信号。

---

## 7. 用户反馈摘要

- **IRC 场景下的长消息割裂**（#3287）：当一条消息超过 512 字节被 IRC 客户端拆分后，PicoClaw 无法将它们关联为同一会话消息，影响阅读与后续引用。
- **Web 客户端性能敏感**（#3292）：Firefox 用户对输入框聚焦时的 CPU 占用问题敏感，说明 Web 频道是真实且重要的使用入口。
- **WhatsApp 频道不可用**（#3320）：依赖原生 WhatsApp 通道的用户此时完全无法使用，且无自动重连机制，反馈中透露出较高的稳定性诉求。
- **认证能力落后**（#3302）：社区用户希望 MCP 服务器配置支持现代 OAuth 2.1 标准，说明部分用户正在部署对安全认证有合规要求的 MCP 服务。

---

## 8. 待处理积压

> 以下条目已长时间未合并或未获维护者明确回应，需要重点关注：

- [#3222 refactor(deltachat): cleanup implementation, documentation -200LOC](https://github.com/sipeed/picoclaw/pull/3222)
  - 已开放约 1 个月，含破坏性变更（移除密码配置文件、`invite_link` 重命名），社区贡献者投入较大，建议尽快给出审查结论。

- [#3193 Added simplex channel type](https://github.com/sipeed/picoclaw/pull/3193)
  - 已开放超过 40 天，新协议支持长期未获合并，存在与主分支冲突的风险。

- [#3287 Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287)
  - 虽仍活跃，但已带 `stale` 标记，若维护者短期不表态可能被自动关闭。

- [#3302 MCP OAuth 2.1 支持](https://github.com/sipeed/picoclaw/issues/3302)
  - 作为持续被提出的诉求，目前无官方响应或 roadmap 排期，建议维护者明确表态。

---

**项目健康度小结**：PicoClaw 的社区贡献和 Issue 讨论保持活跃，贡献者在持续投入新协议支持、依赖修复与性能优化；但合并速度偏慢，累计 4 条待合并 PR 中已有 2 条迈入 stale 区间。建议项目维护者优先处理 #3320（WhatsApp 故障）与 #3321（前缀缓存优化），随后对 #3222 和 #3193 给出明确的合并或关闭结论，避免贡献者流失。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-09

## 1. 今日速览

过去 24 小时 QwenPaw 项目保持高度活跃：共产生 18 条 Issue 更新（16 条新开/活跃，2 条关闭）和 50 条 PR 更新（49 条待合并，1 条已关闭），无新版本发布。Issue 主要集中在 **稳定性/崩溃类问题**（SQLite SIGBUS、MCP 连接阻塞、流式输出异常）与 **前端体验问题**（CPU 占用、时间显示错误），另有多个新功能请求（审批描述、临时文件清理、内置新 provider）均在讨论中。PR 侧有 49 条待合并，其中不乏功能价值较高的新 provider 接入、生命周期钩子、会话 fork 等方案，项目整体呈稳健迭代态势，社区贡献活跃。

- 活跃度评估：🔥 **高**（日均 Issue/PR 合计 68 条，多为实质讨论）
- 健康度关注：较多 Bug 集中于桌面端与 MCP 集成，需重点跟进；PR 合并节奏偏慢（49 条待合并），存在积压风险

---

## 2. 版本发布

过去 24 小时无新版本 Release。上一个已知版本为 v2.1.0-beta.2，用户反馈中已出现针对该版本的多项问题（见下文 Bug 区）。

---

## 3. 项目进展

今日 **无 PR 被合并**，1 条 PR 关闭 / 1 条 Issue 关闭。待合并 PR 中较重要的进展包括：

- **新 Provider 接入持续推进**
  - [#6515 feat(providers): add Volcengine Agent Plan and MiMo Standard API as built-in providers](https://github.com/agentscope-ai/QwenPaw/pull/6515)，对应 Issue #6490，新增两个内置 provider，同时修复 PROVIDER_ 环境变量模式。
  - [#6526 feat: Add NVIDIA NIM provider support](https://github.com/agentscope-ai/QwenPaw/pull/6526)，基于 OpenAIProvider 架构快速接入 NVIDIA 推理微服务。
  - [#6499 feat(models): add Atlas Cloud provider](https://github.com/agentscope-ai/QwenPaw/pull/6499)，新增 OpenAI 兼容的 Atlas Cloud 预设。
- **基础设施与稳定性修复积累**
  - [#6459 fix(history): harden SQLite persistence, backup, and restore](https://github.com/agentscope-ai/QwenPaw/pull/6459) — 针对 Scroll history.db 的 WAL 并发、备份恢复做加固（与今日 #6814 崩溃直接相关）。
  - [#4084 fix(crons): eliminate concurrency state leaks in CronManager](https://github.com/agentscope-ai/QwenPaw/pull/4084) — 修复 CronManager 并发状态泄漏。
  - [#6788 fix: use shared root profile workspace for ACL store](https://github.com/agentscope-ai/QwenPaw/pull/6788) — 修复 Telegram Channel 因 per-task workspace 导致 ACL 失效的问题。
- **新功能 / 体验增强**
  - [#6704 feat(chat): session fork](https://github.com/agentscope-ai/QwenPaw/pull/6704) — 快照式会话分支（关联 #6560）。
  - [#6527 feat(runtime): add cancellation-safe lifecycle hooks](https://github.com/agentscope-ai/QwenPaw/pull/6527) — 新增 ON_CANCEL 阶段，取消时持久化中间状态。
  - [#6353 feat(crons): support per-job model overrides](https://github.com/agentscope-ai/QwenPaw/pull/6353)、[#5399 feat(providers): support custom model ordering](https://github.com/agentscope-ai/QwenPaw/pull/5399) 等配置灵活性提升。

> 提示：上述均为**待合并**状态，尚未进入主分支。合并节奏是当前主要风险点。

---

## 4. 社区热点

| 排名 | Issue/PR | 评论数 | 主题 | 诉求分析 |
|---|---|---|---|---|
| 1 | [#6782 Docker 版插件/应用市场提示维护中](https://github.com/agentscope-ai/QwenPaw/issues/6782) | 9 | 2.0.1 Docker 版本市场功能不可用 | 用户希望快速得到 workaround 或修复版本；该问题已持续 2 天，社区关注度高 |
| 2 | [#6811 OpenAI Responses continuation summary 忽略 disable_thinking](https://github.com/agentscope-ai/QwenPaw/issues/6811) | 5 | 滚动上下文压缩时主对话被阻塞，且 60 秒取消被误报 | 反映长对话场景下 **Scroll 上下文压缩机制**与 reasoning 模型兼容性存在设计缺陷 |
| 3 | [#6490 添加 Volcengine Agent Plan 和 Xiaomi MiMo 内置 provider](https://github.com/agentscope-ai/QwenPaw/issues/6490) | 5 | 新增两个中国区 provider | 用户对国内云厂商 API 接入有明确需求，且已有对应 PR #6515，预计可落地 |
| 4 | [#6820 前端 UI 未实时显示模型输出](https://github.com/agentscope-ai/QwenPaw/issues/6820) | 4 | 流式输出未渐进渲染，全部完成后才显示 | 典型的「等结果」体验问题，影响用户对 AI 响应过程的感知 |
| 5 | [#6814 SQLite SIGBUS 崩溃](https://github.com/agentscope-ai/QwenPaw/issues/6814) | 3 | macOS 上打开 Scroll history.db 崩溃 | 严重稳定性问题，已有 PR #6459 在途，用户关注度高 |

**社区呼声解读**：国内用户对 **Docker 体验、中国区 provider、流式渲染** 三项最为敏感；同时长篇对话场景下的**上下文压缩与底层存储健壮性**正在成为新痛点。

---

## 5. Bug 与稳定性

按严重程度排列：

🔴 **严重（崩溃/阻塞）**
- **[#6814 SIGBUS 崩溃 — sqlite3WalFindFrame](https://github.com/agentscope-ai/QwenPaw/issues/6814)**：macOS 上打开 Scroll history.db（WAL 模式）即崩溃，发生在 SQLite WAL 页面查找阶段，与模型推理无关。*Fix PR 在途：[#6459](https://github.com/agentscope-ai/QwenPaw/pull/6459)（SQLite 持久化加固）*
- **[#6822 瞬时 MCP 断连导致对话永久阻塞](https://github.com/agentscope-ai/QwenPaw/issues/6822)**：streamable HTTP MCP 连接在构建 agent/tool 能力时短暂网络失败，重连后当前对话仍永久卡死，影响核心可用性。*暂无对应 fix PR*
- **[#6811 OpenAI Responses 续写摘要阻塞主对话](https://github.com/agentscope-ai/QwenPaw/issues/6811)**：上下文压缩时同步请求 reasoning 模型，主对话被阻塞；60 秒取消被误报为 malformed output。*无明显修复 PR*

🟠 **中（功能异常）**
- **[#6812 Gemini API 400 错误](https://github.com/agentscope-ai/QwenPaw/issues/6812)**：gemini_provider.py 发送带 `$schema` 字段的 tool schema，Gemini API 不允许额外字段导致报错。*可能需在 provider 层过滤字段*
- **[#6821 reasoning_content 回传失败 → 400](https://github.com/agentscope-ai/QwenPaw/issues/6821)**：thinking-mode 模型（DeepSeek V4 系列）多轮对话时未回传 `reasoning_content`，API 拒绝。*需在 relay 层保留 reasoning 上下文*
- **[#6820 前端流式输出不实时](https://github.com/agentscope-ai/QwenPaw/issues/6820)**：所有内容完成后才一次性渲染，严重削弱交互感。
- **[#6813 Chat 自动标题生成失败](https://github.com/agentscope-ai/QwenPaw/issues/6813)**：`consume_model_response` 对 agentscope 2.x 的 `ChatResponse` 抛 `KeyError: '__aiter__'`。
- **[#6756 run_tool_batch 报错（已关闭）](https://github.com/agentscope-ai/QwenPaw/issues/6756)**：`No toolkit available in current context` — 今日已关闭，疑似修复完成或转内部处理。

🟡 **较轻（体验/性能）**
- **[#6828 空闲时前端持续重绘 ~20% CPU](https://github.com/agentscope-ai/QwenPaw/issues/6828)**：CSS 无限动画（ai-copilot-blink + antd spinner）导致，与历史 Issue #4558（长文本输出高 CPU）同源。
- **[#6826 助手消息结束时间显示异常](https://github.com/agentscope-ai/QwenPaw/issues/6826)**：实际耗时 2 分钟显示数秒。
- **[#6831 本地 Whisper 找不到 Homebrew ffmpeg](https://github.com/agentscope-ai/QwenPaw/issues/6831)**：桌面端 PATH 未包含 `/opt/homebrew/bin`。
- **[#6810 Windows 安装/更新时文件锁冲突](https://github.com/agentscope-ai/QwenPaw/issues/6810)**：浏览器扩展 NM host 锁文件导致 NSIS 报错「无法打开要写入的文件」。

---

## 6. 功能请求与路线图信号

**高概率进入下个版本**

- **内置新 Provider**（均有对应 PR）：[Volcengine + MiMo #6490](https://github.com/agentscope-ai/QwenPaw/issues/6490)（PR #6515）、[NVIDIA NIM #6526](https://github.com/agentscope-ai/QwenPaw/pull/6526)、[Atlas Cloud #6499](https://github.com/agentscope-ai/QwenPaw/pull/6499) — 持续丰富模型接入生态。
- **删除对话时清理临时文件** [#6827](https://github.com/agentscope-ai/QwenPaw/issues/6827)：用户在 `chats delete` 时希望可选清理 agent 创建的孤儿文件，避免磁盘堆积。实现成本低，与现有删除流程易集成。
- **审批时附带描述** [#6832](https://github.com/agentscope-ai/QwenPaw/issues/6832)：AI 提交权限审批时用一句话说明用途，降低用户审查负担。可能与工具调用协议层相关。

**中期路线图信号**

- **上下文压缩机制重设计**：多起问题（#6811、#6814）都指向 Scroll 历史管理的可靠性，社区对长会话的稳定性诉求强烈。
- **MCP 连接容错**（#6822）：需要更健壮的重连与错误隔离机制。
- **前端渲染性能专项**（#6828 #4558）：CSS 动画、长文本渲染均触发 CPU 飙升，需要一次前端渲染管线优化。

---

## 7. 用户反馈摘要

从今日 Issue 评论和描述中提炼：

- **抱怨**：
  - 「Docker 版本插件市场、应用市场始终提示维护中，无法使用」—— 2.0.1 用户被阻塞核心功能，多位用户跟帖。
  - 「前端 UI 未显示模型的输出，工具调用，思考过程，全部完成了才显示」—— 对「黑盒等待」式交互不满。
  - 「删除对话后的临时文件变成孤儿文件，长期占用磁盘，难以区分」—— 对资源管理精细度有要求。
- **使用场景**：
  - 用户依赖 agent 生成 Python 脚本做数据分析，删除对话后脚本残留（#6827）。
  - 国内用户使用 DeepSeek V4 等 thinking-mode 模型做多轮对话，遭遇 400 错误（#6821）。
  - macOS Apple Silicon 桌面端用户使用本地 Whisper，但 ffmpeg 检测失败（#6831）。
- **认可与期待**：
  - 多个 first-time-contributor 提交的 PR 获维护者响应（如 #6704 session fork 关联 #6560），社区参与渠道畅通。
  - 用户对 Volcengine、MiMo 等国产 provider 接入期待已久，积极提供 endpoint 细节。

---

## 8. 待处理积压

**长期未合并的 PR（>2 周）**

- [#4371 Consolidate console static directory resolution](https://github.com/agentscope-ai/QwenPaw/pull/4371)（5/14 创建，近 3 个月）
- [#4492 fix: 连接测试未携带 extra_headers](https://github.com/agentscope-ai/QwenPaw/pull/4492)（5/18 创建）— 直接影响第三方自定义鉴权 header 用户
- [#4595 feat(local-models): 增加 max_context_length 并联动 llama.cpp ctx-size](https://github.com/agentscope-ai/QwenPaw/pull/4595)（5/21 创建）
- [#5170 perf(agents): 缓存 PROFILE.md 读取](https://github.com/agentscope-ai/QwenPaw/pull/5170)（6/13 创建）— 解决 agent 列表接口性能问题
- [#4084 fix(crons): 消除 CronManager 并发状态泄漏](https://github.com/agentscope-ai/QwenPaw/pull/4084)（5/7 创建，近 3 个月）

**长期未解决的 Issue**

- [#6490 Volcengine + MiMo provider 请求](https://github.com/agentscope-ai/QwenPaw/issues/6490)（7/27 创建）已有 PR 但尚未合并，建议加速
- [#4558 长文本输出时 CPU 异常升高（已关闭，但 8/8 仍有更新）](https://github.com/agentscope-ai/QwenPaw/issues/4558) — 关闭但同类问题 #6828 再现，说明未根治

**风险提示**：49 条 PR 堆积等待合并，其中不少为 first-time-contributor 的修复（extra_headers、CIDR、PROFILE.md 缓存等），合并节奏将直接影响社区贡献者积极性。

---

*报告生成时间：2026-08-09 · 数据来源：[github.com/agentscope-ai/qwenpaw](https://github.com/agentscope-ai/qwenpaw)*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-09

## 今日速览

- 过去 24 小时共发生 **869 次 Issue/PR 更新**（369 Issue + 500 PR），约合每小时 36 次，属于**极高活跃度**水平。
- PR 合并/关闭率 **41.2%**（206/500），Issue 关闭率 **21.7%**（80/369）；PR 流转效率健康，但新增/活跃 Issue 仍远多于关闭量，**社区讨论热度高于维护消化速度**。
- 无新版本发布，代码变更以 main 分支持续集成为主。
- 社区讨论焦点集中在 **repo 级 god-file 重构**（#78647，62 条评论）与**插件接口扩展计划**（#64182，30 条评论）。
- 十余个修复/功能 PR 在今日集中提交，覆盖桌面端、备份、网关稳定性、安全加固、Telegram 格式化等方向，**维护者响应速度快**。

---

## 项目进展

过去 24 小时共有约 **80 个 Issue 关闭、206 个 PR 合并/关闭**，以下为可见的重要收尾项：

### 桌面端与 Electron

- **PR #82036**（[已关闭](https://github.com/NousResearch/hermes-agent/pull/82036)）：`perf(desktop)` — 将会话状态点收敛到行级 fiber，减少侧边栏整块重渲染，是 #81991 的后续性能优化。
- **PR #81977**（[已关闭](https://github.com/NousResearch/hermes-agent/pull/81977)）：`fix(desktop)` — 修复 Electron 40 偶发不触发 `ready-to-show` 导致窗口永久隐藏的问题。
- **Issue #65274**（[已关闭](https://github.com/NousResearch/hermes-agent/issues/65274)）：Desktop 项目作用域下新建会话回退到 home 目录的 bug 已解决。

### 文件工具链稳定性

- **Issue #76886**（[已关闭](https://github.com/NousResearch/hermes-agent/issues/76886)）：`read_file` 将有效 UTF-8 Markdown 误判为二进制（0.19.1 回归）— 已修复。
- **Issue #80308**（[已关闭](https://github.com/NousResearch/hermes-agent/issues/80308)）：CJK 文件被误判为二进制 + `search_files` 全量返回 0 的问题 — 已修复。
- **Issue #67629**（[仍开放](https://github.com/NousResearch/hermes-agent/issues/67629)）：Windows 原生路径被 `_bash_safe_path` 改写导致 `search_files` 失败，尚未见直接 fix PR。

### 平台适配与流式解析

- **Issue #69442**（[已关闭](https://github.com/NousResearch/hermes-agent/issues/69442)）：Doubao seed-2-1 流式 `tool_call` JSON 截断导致 `write_file` 静默失败 — 已修复。
- **Issue #46265**（[已关闭](https://github.com/NousResearch/hermes-agent/issues/46265)）：SimpleX 适配器静默丢弃所有 DM 回复 — 已修复。
- **Issue #11349**（[已关闭](https://github.com/NousResearch/hermes-agent/issues/11349)）：Discord 文档六处漂移 + `/voice join` 缺失 — 已修复。
- **PR #53696**（[待合并](https://github.com/NousResearch/hermes-agent/pull/53696)）：Signal 适配器迁移至 signal-cli-rest-api v0.99 REST/WebSocket，解决外发 404 与入站解密问题。

### Windows 安装与更新体验

- **Issue #46260**（[已关闭](https://github.com/NousResearch/hermes-agent/issues/46260)）：Windows 安装器在 desktop 阶段 npm install 失败 — 已修复。
- **Issue #75598**（[已关闭](https://github.com/NousResearch/hermes-agent/issues/75598)）：多 gateway 配置导致更新后程序不稳定 — 已修复。
- **PR #82033**（[新提交待合并](https://github.com/NousResearch/hermes-agent/pull/82033)）：安装器增加系统 npm 兼容性检查，防止 Node/npm 版本不匹配导致失败。

### 模型与推理

- **Issue #58437**（[已关闭](https://github.com/NousResearch/hermes-agent/issues/58437)）：MoA 聚合器在 quiet 模式下丢弃 `tool_calls` 导致崩溃 — 已修复。

---

## 社区热点

### 讨论最活跃的 Issue

| Issue | 标题 | 评论数 | 诉求分析 |
|---|---|---|---|
| [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) | Epic: Shard all 20 god files — repo-wide god-file decomposition | 62 | 社区对代码库长期可维护性的强烈关注；2026-08 已确立 "all god files are sharded, never reverted" 为 standing policy |
| [#64182](https://github.com/NousResearch/hermes-agent/issues/64182) | Tracking: Plugin Interface Expansion — community ideas, July 2026 | 30 | 插件生态开放诉求：贡献者希望长队列 PR 能基于稳定公共接口落地 |
| [#63047](https://github.com/NousResearch/hermes-agent/issues/63047) | Desktop 约 5 条消息后完全无响应（含 Settings） | 18 | 桌面端稳定性是当前用户最迫切的痛点，macOS 27 beta 环境复现 |
| [#23717](https://github.com/NousResearch/hermes-agent/issues/23717) | RFC: Pluggable SessionDB Provider — PostgreSQL, MySQL, and Beyond | 16（4👍） | 解决 `git pull` 时共享 SQLite `state.db` 的 hot-update 死锁问题；数据持久化与并发可靠性需求 |
| [#76886](https://github.com/NousResearch/hermes-agent/issues/76886) | `read_file` 将 UTF-8 文本误判为二进制（回归） | 15（4👍） | 0.19.1 升级回归，直接破坏 Obsidian 笔记用户的日常文件读取工作流 |
| [#47349](https://github.com/NousResearch/hermes-agent/issues/47349) | Configurable Memory Backends — disable `memory.md`，use honcho/fact_store only | 15 | 用户希望记忆系统后端可插拔，降低 prompt 负担并适配不同场景 |
| [#17565](https://github.com/NousResearch/hermes-agent/issues/17565) | Configurable Temperature Parameter | 11（**13👍**） | 全仓库最高赞需求；temperature 硬编码导致严重幻觉，用户对可控性诉求强烈 |

### 诉求提炼

- **架构治理**：god-file sharding 从技术债变成社区共识，且已有明确政策背书，预计会成为未来数周重构主线。
- **数据控制权**：SessionDB 可插拔、记忆后端可配置、temperature 可调，均指向用户对运行行为和数据的可控性要求。
- **桌面端体验**：多个高评论 bug 集中在 Desktop 应用，说明桌面端使用占比高，稳定性问题影响面大。

---

## Bug 与稳定性

### P1 — 严重（无有效规避手段）

| Issue | 问题 | 状态 | 是否有 fix PR |
|---|---|---|---|
| [#63047](https://github.com/NousResearch/hermes-agent/issues/63047) | Desktop 约 5 条消息后完全冻结，Settings 也无法打开 | OPEN | 无 |
| [#79278](https://github.com/NousResearch/hermes-agent/issues/79278) | 上下文压缩可能丢弃 in-flight 工具链结果，导致非幂等操作被重放 | OPEN | 无 |
| [#58619](https://github.com/NousResearch/hermes-agent/issues/58619) | Desktop 重连时无界生成 serve 进程，每 15–30 分钟累积 1 个 | OPEN | 无 |
| [#65365](https://github.com/NousResearch/hermes-agent/issues/65365) | Anthropic OAuth 下暴露 `memory`/`session_search` 工具 schema 即触发 HTTP 400 "out of extra usage" | OPEN | 无 |

### P2 — 中等

| Issue | 问题 | 状态 | 备注 |
|---|---|---|---|
| [#67629](https://github.com/NousResearch/hermes-agent/issues/67629) | `search_files` 传 Windows 绝对路径时 `rg` 无法解析（IO error 3） | OPEN | 无 fix PR |
| [#54990](https://github.com/NousResearch/hermes-agent/issues/54990) | Desktop 切换 profile 后 shell CWD 停留在旧 profile 工作区 | OPEN | 无 |
| [#50707](https://github.com/NousResearch/hermes-agent/issues/50707) | SSH 后端硬编码 ControlMaster，Windows OpenSSH 报 "getsockname failed" | OPEN | 无 |
| [#22418](https://github.com/NousResearch/hermes-agent/issues/22418) | macOS Desktop gateway 与 CLI `--replace` 冲突，Discord token 被锁 | OPEN | 无 |
| [#69310](https://github.com/NousResearch/hermes-agent/issues/69310) | Signal 健康检查请求不存在的 `/api/v1/check` 端点 | OPEN | 可被 PR #53696 覆盖 |

### 今日已关闭的修复（回归/崩溃类）

| Issue | 修复内容 |
|---|---|
| [#76886](https://github.com/NousResearch/hermes-agent/issues/76886) | `read_file` UTF-8 二进制误判回归 |
| [#80308](https://github.com/NousResearch/hermes-agent/issues/80308) | CJK 二进制误判 + `search_files` 全量失效 |
| [#69442](https://github.com/NousResearch/hermes-agent/issues/69442) | Doubao 流式 tool_call JSON 截断导致写文件静默失败 |
| [#58437](https://github.com/NousResearch/hermes-agent/issues/58437) | MoA quiet 模式丢弃 tool_calls 导致崩溃 |
| [#65274](https://github.com/NousResearch/hermes-agent/issues/65274) | Desktop 项目会话 cwd 回退 |
| [#46260](https://github.com/NousResearch/hermes-agent/issues/46260) | Windows 安装器 npm install 失败 |
| [#75598](https://github.com/NousResearch/hermes-agent/issues/75598) | 更新后多 gateway 配置冲突导致不稳定 |

---

## 功能请求与路线图信号

### 高潜力需求（社区呼声最高）

- **可配置 temperature**（[#17565](https://github.com/NousResearch/hermes-agent/issues/17565)，13👍）：硬编码 `_fixed_temperature_for_model()` 导致幻觉，用户强烈要求暴露配置文件入口。
- **可插拔 SessionDB Provider**（[#23717](https://github.com/NousResearch/hermes-agent/issues/23717)，4👍）：RFC 阶段，目标是终结 SQLite `state.db` 在 hot-update 场景下的死锁问题。
- **可配置记忆后端**（[#47349](https://github.com/NousResearch/hermes-agent/issues/47349)）：支持禁用 `memory.md` 并只使用 honcho/fact_store，已在 Honcho 插件侧出现配套 PR（#82038）。
- **混合工具预选**（[#13332](https://github.com/NousResearch/hermes-agent/issues/13332)，4👍）：通过语义+关键词 RAG 预选工具 schema，减少约 14k tokens 的固定开销，直击成本敏感用户。
- **认知记忆操作**（[#509](https://github.com/NousResearch/hermes-agent/issues/509)，4👍）：LLM 驱动的编码、整合与自适应召回，替代当前扁平文本记忆。
- **LaTeX/MathJax 渲染**（[#80821](https://github.com/NousResearch/hermes-agent/issues/80821)）：桌面聊天 UI 目前原样输出 LaTeX 源码。

### 已进入实现/接近落地的方向

- **插件可见性**：PR #82044 — 桌面端 Settings → Plugins 现可同时展示后端原生插件与 Agent Plugins v1 包。
- **会话即时命名**：PR #81985 — 从首条消息即时生成会话名，且显式重命名不再被覆盖。
- **时间戳显示配置**：PR #81439 — CLI/TUI/Desktop 统一支持 `display.timestamps` 与 `display.timestamp_format`，且不污染协议数据。
- **TUI Reasoning 自动折叠**：PR #82037 — `display.sections.thinking: collapsed` 改为在推理阶段结束后自动折叠。
- **WhatsApp 功能对齐**：Issue #79890 — 作为 meta-issue 发起 WhatsApp 全功能对齐 campaign。
- **插件接口扩展**：Issue #64182 — 社区计划追踪，目标是为排队 PR 提供稳定公共接口。

---

## 用户反馈摘要

- **升级回归破坏实际工作流**：`read_file` 将 Obsidian 笔记误判为二进制，导致笔记无法打开（[#76886](https://github.com/NousResearch/hermes-agent/issues/76886)）；CJK 用户同样遇到文件工具全挂（[#80308](https://github.com/NousResearch/hermes-agent/issues/80308)）。说明文件工具链的回归对真实用户影响直接且严重。
- **桌面端体验是最大不满来源**：约 5 条消息后完全 UI 冻结（[#63047](https://github.com/NousResearch/hermes-agent/issues/63047)）、serve 进程无限累积（[#58619](https://github.com/NousResearch/hermes-agent/issues/58619)）、profile 切换后 shell CWD 错乱（[#54990](https://github.com/NousResearch/hermes-agent/issues/54990)）。
- **记忆系统引发安全疑虑**：用户指出记忆内容被当作"权威用户消息"注入，可能成为提示注入面（[#31584](https://github.com/NousResearch/hermes-agent/issues/31584)）；管理者角色中"agent 代写 issue"成为常态，也侧面反映用户对 agent 自主性的接受度提升。
- **token 成本敏感度高**：默认 30+ 工具全量注入约 14k tokens，用户在长会话下成本压力明显（[#13332](https://github.com/NousResearch/hermes-agent/issues/13332)）。
- **Windows 平台体验偏差**：安装失败（[#46260](https://github.com/NousResearch/hermes-agent/issues/46260)）、路径改写破坏搜索工具（[#67629](https://github.com/NousResearch/hermes-agent/issues/67629)）、SSH 后端不可用（[#50707](https://github.com/NousResearch/hermes-agent/issues/50707)）等多点开花，Windows 用户整体满意度偏低。
- **平台消息投递可靠性**：SimpleX DM 静默丢失（[#46265](https://github.com/NousResearch/hermes-agent/issues/46265)）、Signal 健康检查误报（[#69310](https://github.com/NousResearch/hermes-agent/issues/69310)），社区对消息通道可靠性要求高。

---

## 待处理积压

### 长期未决且带 `needs-decision` 的重要 Issue（>30 天）

| Issue | 主题 | 创建时间 | 备注 |
|---|---|---|---|
| [#17565](https://github.com/NousResearch/hermes-agent/issues/17565) | 可配置 temperature | 2026-04-29 | 13👍 为全仓最高，仍无决策 |
| [#23717](https://github.com/NousResearch/hermes-agent/issues/23717) | Pluggable SessionDB Provider | 2026-05-11 | RFC 已 3 个月，等待决策 |
| [#47349](https://github.com/NousResearch/hermes-agent/issues/47349) | 可配置记忆后端 | 2026-06-16 | 与 #509 可合并考虑 |
| [#40662](https://github.com/NousResearch/hermes-agent/issues/40662) | PreToolUse enforcement hook | 2026-06-06 | 调试场景下 LLM 忽略系统规则 |
| [#64182](https://github.com/NousResearch/hermes-agent/issues/64182) | 插件接口扩展追踪 | 2026-07-14 | 社区计划已就绪，等待接口稳定承诺 |

### P1 级 Bug 无认领修复

- [#63047](https://github.com/NousResearch/hermes-agent/issues/63047) — Desktop 完全冻结
- [#79278](https://github.com/NousResearch/hermes-agent/issues/79278) — 压缩丢弃工具链
- [#58619](https://github.com/NousResearch/hermes-agent/issues/58619) — serve 进程无界生成
- [#65365](https://github.com/NousResearch/hermes-agent/issues/65365) — Anthropic OAuth 工具 schema 触发 400

### 待合并的关键 PR（排队时间较长）

| PR | 内容 | 创建时间 |
|---|---|---|
| [#53696](https://github.com/NousResearch/hermes-agent/pull/53696) | Signal 适配器 v0.99 REST/WebSocket 迁移 | 2026-06-27 |
| [#71996](https://github.com/NousResearch/hermes-agent/pull/71996) | 修复绝对路径拼写绕过审批硬下线问题（security） | 2026-07-26 |
| [#77992](https://github.com/NousResearch/hermes-agent/pull/77992) | 真实主机上的跨平台 CI 测试门控 | 2026-08-03 |
| [#79618](https://github.com/NousResearch/hermes-agent/pull/79618) | 清理 uv audit 13 项安全公告并封闭回归路径 | 2026-08-05 |

---

**健康度小结**：项目处于高吞吐迭代状态，24 小时 PR 合并/关闭 206 条显示出较强的交付能力；文件工具链与桌面端修复已快速落地。但 **P1 级桌面稳定性和会话安全问题仍未解决**，且多个高赞功能请求徘徊在 `needs-decision` 超过 2–3 个月，建议维护者优先对 temperature 与 SessionDB 两个 RFC 做出方向性决策，以释放社区贡献者产能。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报（2026-08-09）

## 1. 今日速览

过去 24 小时，AstrBot 项目保持高活跃度：共 17 条 Issue 更新（7 条新增/活跃、10 条关闭），12 条 PR 更新（3 条待合并、9 条已合并/关闭），核心维护者与社区贡献者均有稳定产出。今日虽无新版本发布，但 4 个历史 Issue（#9533、#9567、#9557、#9519）均通过对应 PR 闭环，其中 @Soulter 的 3 个 PR（#9602/#9599/#9596）与 @wcqqq1214 的 3 个修复（#9597/#9534/#9587）全部快速合入，问题解决效率较高。需留意的是，P1 级日志体验问题 #9527 仍无官方回复，文件触发会话锁异常 #9600 复现率高达 90%，是当前最值得警惕的稳定性风险。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日合并/关闭的 PR 中，以下几项推进了核心体验：

- **#9602 fix: cancel stopped agent runs immediately**（@Soulter，同日合入）— 当内部 Agent 停止请求触发时，可立即取消阻塞中的 provider、上下文处理与工具操作，并将 ChatUI 与 `/stop` 请求直接接入 ToolLoop runner，同时保留优雅的流水线清理逻辑，丢弃不完整的部分输出。显著提升用户对 Agent 运行的"可控性"。链接：https://github.com/AstrBotDevs/AstrBot/pull/9602

- **#9599 feat(webui): add plugin config default reset**（@Soulter，同日合入）— 插件配置值偏离 schema 默认值时显示恢复图标，支持标量、列表、字典、模板列表和嵌套配置的独立恢复，不波及其他字段。对应实现 Issue #9557。链接：https://github.com/AstrBotDevs/AstrBot/pull/9599

- **#9596 fix: sync plugin skill state across the dashboard**（@Soulter，同日合入）— 修复插件禁用后其自带 Skills 不同步禁用的问题，`/skills` 接口始终返回插件 Skills 并通过插件状态渲染为"不可用"，实现 Issue #9519 的诉求。链接：https://github.com/AstrBotDevs/AstrBot/pull/9596

- **#9534 fix: sanitize MCP tool names for LLM API**（@wcqqq1214，lgtm）— 修复 MCP 工具名含 `.`（如腾讯文档）导致 LLM API 返回 400 的问题，将工具名规范为 `^[a-zA-Z0-9_-]+$`。对应 Issue #9533。链接：https://github.com/AstrBotDevs/AstrBot/pull/9534

- **#9587 fix: prevent transient project session in ChatUI session list**（@wcqqq1214，lgtm）— 修复 ChatUI 新会话首条消息在侧边栏闪烁并在 AI 生成结束后消失的问题。对应 Issue #9567。链接：https://github.com/AstrBotDevs/AstrBot/pull/9587

- **#9597 fix: capture agent end_time before emitting agent_stats**（@wcqqq1214，lgtm）— 修复前端收到 `end_time=0` 导致会话统计不准的问题。链接：https://github.com/AstrBotDevs/AstrBot/pull/9597

- **#9518 fix: warn when an explicitly configured WebUI dist is stale**（@JosephTian876，lgtm）— 对显式 `--webui-dir` 配置但版本过期的情况增加警告。链接：https://github.com/AstrBotDevs/AstrBot/pull/9518

- **#9588 docs: Update free model description in aihubmix.md**（@sumingyd）— 文档修正。链接：https://github.com/AstrBotDevs/AstrBot/pull/9588

- **#6888 feat: add MindSim - event-driven agent thinking framework**（@yuanmua，XXL，状态关闭）— 为 AstrBot 引入"思想人格（MindSim）"事件驱动 Agent 思考框架，使 Bot 具备自主思考能力（不再被动等待唤醒词）。该 PR 自 3 月 24 日创建，今日更新为关闭状态，合并与否需在仓库中确认。链接：https://github.com/AstrBotDevs/AstrBot/pull/6888

**小结**：今日合入的 PR 集中在三个方向——Agent 运行控制（停止/取消）、WebUI 配置体验（恢复默认/插件 Skill 同步/MCP 名称清洗）、ChatUI 细节修复（会话列表/统计时间），整体向"更可控、更易用、更稳定"迈进了一小步。

## 4. 社区热点

- **#9527 [P1]《错误信息非得是滚木吗？》**（6 条评论，持续热议）— 用户 @CreeperIsASpy 以强烈措辞表达对日志系统的不满：开启 DEBUG 后无法透出底层库（如 `httpx`）的 DEBUG 信息，也读不到原生 `logging` 模块的输出，错误信息多为难以阅读的滚动日志。该 Issue 已被标记 `priority: p1`，是当前社区情绪最集中、优先级最高的体验问题。链接：https://github.com/AstrBotDevs/AstrBot/issues/9527

- **#9448 Telegram 文件接收问题**（8 条评论，今日评论数最高，已关闭）— 用户报告 Telegram 平台给 bot 发文件时 LLM 无法看到文件，随后用户自行修复并整理了图文修复说明文档（含 8 张截图）。该问题最终关闭，但官方是否已合入用户修复方案需确认。链接：https://github.com/AstrBotDevs/AstrBot/issues/9448

- **#9603 插件发布：易校园电费监控 v1.5.0**（0 条评论但为今日新增）— 社区用户发布插件新版，详细描述了 ISIMS 电费接口支持、ymId 捕获、roomCode 修复等内容，展示生态活跃度。链接：https://github.com/AstrBotDevs/AstrBot/issues/9603

## 5. Bug 与稳定性

按严重程度排列：

**高严重度（影响核心链路，暂无 fix PR）**

- **#9600 事件循环触发会话锁异常** — 私聊中发送非图片文件（xlsx/pdf）或引用该类文件的消息，触发会话锁后无法自动调用文件处理工具，直到 30 分钟超时释放。触发频率"十次有九次复现"，关闭全部第三方插件后仍出现，`event_loop_watchdog.log` 无记录。疑似事件循环调度缺陷，直接影响 Agent 文件处理能力。链接：https://github.com/AstrBotDevs/AstrBot/issues/9600

**中严重度（功能回归/受限，暂无 fix PR）**

- **#9601 4.27.2 内置 whisper 语音转文字报错** — 模型下载后提示 SHA256 checksum 不匹配，且此前版本正常，疑为 4.27.2 回归。环境：Docker + Windows + OneBot11。链接：https://github.com/AstrBotDevs/AstrBot/issues/9601

- **#9598 知识库上传 txt 文件报错** — 缺少可选依赖 `markitdown-no-magika` 时，上传 txt 文件被路由到 MarkitdownParser 并发生 `ModuleNotFoundError`，最终被兜底为"文档解析失败"，错误信息未提示缺失依赖名称，排查成本高。链接：https://github.com/AstrBotDevs/AstrBot/issues/9598

- **#9604 无法查看更新和插件市场** — WebUI 中更新检查与插件市场页面不可用，用户提及阿里云防火墙配置，可能需要排查网络/代理或后端接口兼容性。链接：https://github.com/AstrBotDevs/AstrBot/issues/9604

- **#9595 无法读取文档，但能调用工具** — 用户请求"提取文档里全部的字"不生效，但工具调用正常，日志可见 `aiocqhttp` 引用消息处理路径异常。链接：https://github.com/AstrBotDevs/AstrBot/issues/9595

**低严重度/已解决**

- **#9533 MCP 工具名含 `.` 导致 400 报错** — 已由 PR #9534 修复合入。链接：https://github.com/AstrBotDevs/AstrBot/issues/9533
- **#9567 ChatUI 新会话首条消息闪烁消失** — 已由 PR #9587 修复合入。链接：https://github.com/AstrBotDevs/AstrBot/issues/9567
- **#9552 v4.27.1 发送图片报错**（已关闭）— `gchat.qpic.cn` 下载文件返回 HTTP 400。链接：https://github.com/AstrBotDevs/AstrBot/issues/9552

## 6. 功能请求与路线图信号

**已确认纳入开发（今日有对应 PR 合入，预计随下版本发布）**

- 插件配置"恢复默认"按钮（#9557，👍1）→ 由 #9599 实现。链接：https://github.com/AstrBotDevs/AstrBot/issues/9557
- 插件禁用时同步禁用其 Skills（#9519）→ 由 #9596 实现。链接：https://github.com/AstrBotDevs/AstrBot/issues/9519

**功能明确、待合并，可能纳入近期版本**

- **插件市场按下载量排序**（PR #9570，open，M 尺寸）— 插件市场已展示 `download_count` 但排序菜单不提供按下载量排序，用户只能依赖推荐/星标/作者/更新时间。实现简单（M），建议尽快合入。链接：https://github.com/AstrBotDevs/AstrBot/pull/9570

**已关闭/未采纳的功能请求**

- #9486 插件安装报错自动删除目录（👍1）— 已关闭，未被采纳。链接：https://github.com/AstrBotDevs/AstrBot/issues/9486
- #9583 自动更新开关 — 已关闭。链接：https://github.com/AstrBotDevs/AstrBot/issues/9583
- #9589 WebUI 左侧菜单布局调整按钮 — 已关闭。链接：https://github.com/AstrBotDevs/AstrBot/issues/9589
- #9571 对新版 WebUI 的设计反馈（含强烈负面评价）— 已关闭。链接：https://github.com/AstrBotDevs/AstrBot/issues/9571

## 7. 用户反馈摘要

- **日志与可观测性体验不佳（强烈负面）**：#9527 中用户直言"求你们了，认真对待这个问题"，认为"错误信息一半以上都是滚木"，DEBUG 层级无法透出底层库信息（如 `httpx.ConnectError`），开发者调试能力受限。该诉求已上升为 P1，建议维护团队在后续版本重设计日志透传机制。链接：https://github.com/AstrBotDevs/AstrBot/issues/9527

- **新 WebUI 口碑分化（负面为主）**：#9571 用户以"哪个天才搞的"讽刺新界面，称"丑，设置不方便，配置文件没法修改了"；#9589 则提出左侧菜单布局调整建议。综合来看，新版 Dashboard 在可定制性与配置可编辑性上存在明显改进空间。链接：https://github.com/AstrBotDevs/AstrBot/issues/9571

- **用户自主修复意愿强（正面信号）**：#9448 中用户不仅完整复现了 Telegram 文件问题，还自行让 bot 做了修复并整理了图文说明文档。这体现社区参与度，但也提示 Telegram 适配器的文件转发链路需要更系统的回归测试，避免用户打补丁。链接：https://github.com/AstrBotDevs/AstrBot/issues/9448

- **真实痛点：文件场景可靠性**：#9600 与 #9595 均指向"非文本内容（文件/文档）处理"链路不稳，且 #9600 复现率极高（90%），属于影响日常使用的实质缺陷，建议优先排期。

## 8. 待处理积压

以下 Issue/PR 长期未合并或未获回复，提醒维护者关注：

- **PR #6325 dev（Dashboard 部署 GitHub Pages + README 重写）** — 创建于 2026-03-15，已近 5 个月，XXL 尺寸。若不再推进，建议明确关闭并说明原因，避免积压。链接：https://github.com/AstrBotDevs/AstrBot/pull/6325

- **PR #9464 fix(dingtalk): preserve inbound quoted message context** — 创建于 2026-07-30，修复钉钉引用消息上下文丢失问题（对应 Issue #9463），至今未合并。钉钉适配器在主流平台中覆盖度较低，但修复内容明确、价值清晰。链接：https://github.com/AstrBotDevs/AstrBot/pull/9464

- **Issue #9527 [P1] 日志 DEBUG 层级问题** — 8 月 3 日创建，已被标记 P1 但 5 天后仍无官方回复，6 条评论全部来自社区。P1 级别的问题建议至少给出初步响应或工作计划。链接：https://github.com/AstrBotDevs/AstrBot/issues/9527

- **PR #9570 插件市场下载量排序** — 功能简单、社区有明确需求，8 月 6 日创建后 3 天仍未合并，建议跟进。链接：https://github.com/AstrBotDevs/AstrBot/pull/9570

- **Issue #9448 Telegram 文件修复未追踪** — 用户提供了自研修复方案（含文档与截图），但仓库中未见对应官方 fix PR。建议维护者验证用户方案并合入主干，避免社区分叉与反复复发。链接：https://github.com/AstrBotDevs/AstrBot/issues/9448

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*