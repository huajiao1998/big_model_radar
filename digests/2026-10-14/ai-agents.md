# OpenClaw 生态日报 2026-10-14

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-14 00:43 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 (2026-10-14)

## 1. 今日速览
过去24小时内，OpenClaw 社区活跃度极高，Issues 和 Pull Requests 均达到每日 500 条的上限，其中过半为近期新开或深度活跃状态，显示出高强度的开发迭代与用户反馈。项目今日发布了两个重要版本（v2026.10.5-beta.3 与 v2026.10.3），重点优化了多平台 Gateway 服务的持久化安装与更新机制，试图解决长期困扰用户的升级阻断问题。然而，稳定性面临严峻挑战，关于子进程泄漏、会话状态丢失、Gateway 主线程阻塞及特定渠道（Telegram/WebChat）消息投递异常的 P0/P1 级严重 Bug 仍占据社区讨论的热点。大量与核心会话状态机、插件热加载及 SQLite 锁争用相关的底层缺陷尚未彻底闭环，暴露出系统在高频并发场景下的稳定性短板。

## 2. 版本发布
今日发布了两个关键版本，重点集中在提升多操作系统环境下的安装/更新稳定性与用户体验：
*   **v2026.10.5-beta.3** ([Release](https://github.com/openclaw/openclaw/releases/tag/v2026.10.5-beta.3))：
    *   **核心改进**：确保了在 pnpm 12 更新路径下，Gateway 服务及 `openclaw` 启动器能够保留在持久安装路径中，防止更新失败导致的服务不可用。
    *   **多平台适配**：Windows 更新流程兼容了带限定条件的计划任务账户及独立验证的驱动程序；macOS 环境接受了对受保护的 Bun 服务组件的更新。
    *   *破坏性变更/迁移注意*：建议跨平台系统管理员在升级至 2026.10.5-beta.3 时，预先校验本地系统服务（Windows 计划任务/macOS 保护服务）的权限与状态，避免升级中途服务断链。
*   **v2026.10.3** ([Release](https://github.com/openclaw/openclaw/releases/tag/v2026.10.3))：
    *   作为近期重要版本，该版本包含了 90 个 commits 与 79 个 PRs，涉及 99 名贡献者。详细变更与发布说明详见[官方文档](https://docs.openclaw.ai/releases/2026.10.3)。

## 3. 项目进展
今日合并与关闭的高关注度 Pull Requests 显示项目正在深度重构底层架构（如 SQLite 兼容性与鉴权机制），并着力解决更新流程及 UI 交互体验：
*   **[#168338] 上下文溢出前置检查估算器修复**：PR 合入 main 分支（`45c7bc9e9ca9`），对齐了最终提供的上下文计量机制，解决了此前估算量比实际计费用量偏高 2.3-2.6 倍的问题，相关 Issue 标记为已关闭或主分支修复。([#101929](https://github.com/openclaw/openclaw/issues/101929))
*   **架构重构与性能优化**：`@steipete` 贡献了多项核心性能与架构重构 PR，包括完成 SQLite 兼容性迁移路径 ([#171443](https://github.com/openclaw/openclaw/pull/171443))、避免无谓的会话维护写入 ([#171211](https://github.com/openclaw/openclaw/pull/171211))、转移 SQLite 词汇维护权限 ([#170657](https://github.com/openclaw/openclaw/pull/170657))，以及解除 UI 对 Web Awesome 的依赖，原生重构了会话侧边栏与模态框 ([#171441](https://github.com/openclaw/openclaw/pull/171441), [#171463](https://github.com/openclaw/openclaw/pull/171463))。
*   **更新与 macOS 修复**：`@RomneyDa` 提交了多项针对更新流程及 macOS 环境的修复，如 Tailscale 拒绝 Serve 时保留本地访问 ([#171509](https://github.com/openclaw/openclaw/pull/171509))、修复更新期间 SQLite 写锁被长时间占用的问题 ([#171493](https://github.com/openclaw/openclaw/pull/171493)) 以及修复 macOS 内置 Gateway 在更新恢复后无法正常重试 Setup 的致命 Bug ([#171508](https://github.com/openclaw/openclaw/pull/171508), [#170724](https://github.com/openclaw/openclaw/issues/170724))。

## 4. 社区热点
今日社区讨论最激烈的问题集中在**会话状态一致性**、**系统资源泄漏**与**更新失败**三大痛点：
*   **会话状态丢失与子进程泄漏**：[Issue #148707](https://github.com/openclaw/openclaw/issues/148707) 探讨了当同一会话并发启动二次运行时，正在进行的对话轮次被排挤导致的回复丢失（"Reply operation has no active tool authority snapshot"）；同时 [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) 指出 OpenClaw 长期存在 hook/tool 执行子进程未回收，导致僵尸进程不断累积进而引发系统运行时性能严重下降的问题。
*   **更新流程受阻与 Gateway 崩溃**：[Issue #156112](https://github.com/openclaw/openclaw/issues/156112) 反馈 `openclaw update` 命令在 "global install swap" 步骤确定性失败，而直接 `npm install -g` 却成功；[Issue #161379](https://github.com/openclaw/openclaw/issues/161379) 反映了 Gateway 在运行模型目录刷新循环时，因 OpenAI 实时目录的 60s TTL 短于单 agent 刷新时间，导致一个 CPU 核心被永久锁定打满。
*   **特定模型与渠道 API 兼容性**：[Issue #38327](https://github.com/openclaw/openclaw/issues/38327) 抱怨在 2026.3.2 版本中，将模型设置为 `google-vertex/gemini-3.1-pro-preview` 时，嵌入 Agent 会因为 "Cannot convert undefined or null to object" 持续崩溃。

## 5. Bug 与稳定性
今日暴露出多个影响核心稳定性的 P0/P1 级别严重 Bug，大部分尚未有直接生效的 Fix PR：
*   **[P0] 数据库与存储资源耗尽**：
    *   **[#114612](https://github.com/openclaw/openclaw/issues/114612)**：`memory-core` 中的 `memory_index_chunks` 等表缺乏保留/驱逐策略，导致 SQLite 无限增长最终填满磁盘。
    *   **[#158390](https://github.com/openclaw/openclaw/issues/158390)**：`plugin-captures` 临时目录在构建/目录操作后未被垃圾回收，Gateway 每次重启都会永久性地增加数 GB 的磁盘占用。
    *   **[#164294](https://github.com/openclaw/openclaw/issues/164294)**：Gateway 状态数据库 WAL 自动检查点因进程内读取器长时挂起（pinned by in-process reader），导致自启动以来 `WAL checkpoint` 从未完成过。
*   **[P0/P1] 会话管理与热加载 Bug**：
    *   **[#154572](https://github.com/openclaw/openclaw/issues/154572)**：在 2026.9.5 中，通过 `sessions_spawn` 派生至 `claude-cli-runtime` 子进程的子代理请求总是失败，约 350ms 即抛出 `SessionTranscriptWriterClaimReboundError`。*（有相关 PR 推进，但仍开放）*
    *   **[#163029](https://github.com/openclaw/openclaw/issues/163029)**：尽管 #160572 已修复相关缺陷，但 2026.9.7 版本中 Gateway 仍会在正常 Agent 对话回合中重新加载外部插件（40-70秒主线程卡顿），造成用户体验中断。
    *   **[#144291](https://github.com/openclaw/openclaw/issues/144291)**：配置热重载（`openclaw config set`）会直接中止所有正在进行的 Agent 对话回合，抛出 "prepared model runtime plugin generation was superseded" 异常。
*   **[P1] 渠道与系统底层回归**：
    *   **[#125764](https://github.com/openclaw/openclaw/issues/125764)**：Telegram 适配器中存在严重的静默失败 Bug，当出站 `sendMessage` 遭遇一次性网络故障时，消息会被死信化且不进行重试，重要通知永久丢失。
    *   **[#160060](https://github.com/openclaw/openclaw/issues/160060)**：Windows 系统在从休眠（Modern Standby）恢复后约 54分钟，Gateway 会静默消失，既不输出退出日志也不生成 WER 转储，导致服务直接死机。

## 6. 功能请求与路线图信号
用户提出的多项高优 Feature 诉求正在通过 PR 或 Issue 推进，预示了下一版的路线图方向：
*   **自托管语音与 TTS/STT 支持**：[Issue #45508](https://github.com/openclaw/openclaw/issues/45508) 呼吁让 WebChat 能够利用 OpenClaw 自身的配置走 Gateway 提供自托管语音引擎，而非仅仅依赖浏览器原生的 Web Speech API。
*   **新模型提供商支持**：[Issue #155633](https://github.com/openclaw/openclaw/issues/155633) 提出了将 **Databricks Unity Gateway** 作为官方支持的模型提供商的诉求，并已有实现 PR（[#155634](https://github.com/openclaw/openclaw/pull/155634)）提交。
*   **沙箱安全隔离机制**：[Issue #91676](https://github.com/openclaw/openclaw/issues/91676) 建议增加 `skills.workshop.allowSandboxedAgents` 选项，使沙箱环境下的 Agent 也能调用 `skill_workshop` 工具；此外，[Issue #161436](https://github.com/openclaw/openclaw/issues/161436) 揭示了由于云 Worker 本地工具调用绕过了 Gateway 的 `before_tool_call` 拦截机制，安全策略插件无法有效防护云 Worker 的问题，这预示着官方将加强云端执行环境的鉴权审计。

## 7. 用户反馈摘要
*   **资源占用与资源泄漏引起强烈不满**：由于子代理（subagent）或插件机制的问题，大量用户在运行 OpenClaw 一段时间后，遭遇磁盘被 SQLite 数据库或插件缓存占满（[Issue #114612](https://github.com/openclaw/openclaw/issues/114612), [#158390](https://github.com/openclaw/openclaw/issues/158390)），以及因系统资源耗尽触发 K8s OOM Kill（[Issue #99659](https://github.com/openclaw/openclaw/issues/99659)）。
*   **多渠道消息"静默丢失"破坏信任**：在复杂的网络环境或代理设置下（如 [Issue #125764](https://github.com/openclaw/openclaw/issues/125764)），用户的 Telegram 消息因系统不重试网络故障而直接丢失，用户反馈缺乏对这种"无声失败"的告警，导致关键信息遗漏。
*   **UI 交互与细节体验不足**：用户在 [Issue #115076](https://github.com/openclaw/openclaw/issues/115076) 中指出，Webchat 同时包含用户文字与图片附件时会被错误归类为 `source_modality: image`，导致模型处理逻辑混乱；[Issue #111143](https://github.com/openclaw/openclaw/issues/111143) 则抱怨 Control UI 侧边栏无法固定常用插件 Tab，增加了操作成本。

## 8. 待处理积压
以下长期未关闭的高价值 Issue 积压需要维护者尽快介入审查与解决，以解除 Beta 发布的阻塞：
*   **[P1] 安全与底层机制缺陷**：
    *   [Issue #90840](https://github.com/openclaw/openclaw/issues/90840)：子代理执行完成后的结果错误地将原始的 worker 输出直接投递到聊天用户端，而非经过 parent 总结，涉及信息泄露风险（自 2026-06 遗留）。
    *   [Issue #118839](https://github.com/openclaw/openclaw/issues/118839)：在 2026.7.2-beta.7 中 WebChat 会话重启恢复时反复抛出 "restart recovery claim changed before agent adoption" 回归 Bug。
    *   [Issue #159512](https://github.com/openclaw/openclaw/issues/159512)：`claude-cli` 运行模式下，每次子代理完成时请求方 CLI 会话因包含每次回合的工具上限而在恢复哈希计算中被两次无效化（`reason=mcp`），造成体验割裂。
*   **[P0/P1] 核心更新机制阻碍**：
    *   [Issue #167557](https://github.com/openclaw/openclaw/issues/167557) 与 [Issue #166221](https://github.com/openclaw/openclaw/issues/166221)：在跨大版本更新（如 2026.9.7 到 2026.9.8/9）时，插件数据迁移与 SQLite 状态快照机制互锁死锁，导致更新流程永远无法收敛。
    *   [Issue #161921](https://github.com/openclaw/openclaw/issues/161921)：当更新失败且状态发生 `state-migrated-no-rollback` 时，`doctor --fix` 与 `plugins update` 互相要求对方先执行，形成了典型的死锁场景。

---

## 横向生态对比

**个人 AI 智能体与助手开源生态横向对比分析报告 (2026-10-14)**

### 1. 生态全景
2026年10月中旬，个人 AI 助手开源生态处于**“高吞吐迭代与稳定性攻坚并行”**的关键阶段。头部项目如 OpenClaw 和 hermes-agent 维持着极高的社区活跃度（日均数百条动态），但普遍面临子进程泄漏、状态一致性崩溃及多渠道消息投递异常等 P0 级稳定性挑战。社区焦点正从单纯的模型接入能力，向**深度可观测性、成本透明度及多平台沙箱安全**转移，显示出智能体系统正进入工程化成熟期，对底层架构鲁棒性的要求显著高于早期功能原型阶段。

### 2. 各项目活跃度对比

| 项目 | Issues 更新数 | PR 更新数 | Release 情况 | 健康度评估 (基于当日Bug/修复比) |
| :--- | :---: | :---: | :---: | :--- |
| **OpenClaw** | 500+ (触顶) | 500+ (触顶) | 2个 (v2026.10.3, beta.3) | **低**：P0/P1 Bug 密集，核心状态机与资源管理存在结构性缺陷 |
| **hermes-agent** | 374 | 500 (77个合并) | 无 | **中**：高噪音高吞吐，长期积压 Cron/Windows 路径问题未解 |
| **QwenPaw** | 20 | 43 | 无 | **良**：修复响应迅速，聚焦部署兼容性与资源管理，逻辑闭环较好 |
| **Zeroclaw** | 25 | 50 | 无 | **良**：聚焦成本监控与配置安全，架构演进清晰，Bug 严重度较低 |
| **AstrBot** | 19 | 23 | 无 | **良**：专注于上下文与并发安全，修复质量高，社区体量较小 |
| **PicoClaw** | 低活跃 | 低活跃 | 无 | **危**：大量活跃 Bug 被 Stale Bot 误关闭，社区维护响应断层 |
| **DeepSeek Harness** | N/A (Discussions) | N/A | 无 | **中**：Windows 沙箱底层架构缺陷爆发，Linux 支持缺失引发不满 |

### 3. OpenClaw 在生态中的定位
*   **优势与技术路线**：OpenClaw 处于生态的**功能广度前沿**，率先尝试多平台 Gateway（Windows/macOS/通用）的持久化部署与复杂子代理（Subagent）编排。其技术路线侧重于**高频并发下的架构重构**（如 SQLite 兼容性与插件热加载），试图解决大规模多模态交互下的资源调度问题。
*   **社区规模对比**：OpenClaw 的日更流量（500+ Issues/PR）远超其他项目（其余大多在 20-500 之间），确立了其作为**行业事实标准参照系**的地位。然而，其复杂度也导致了最严重的“副作用”——大量的 P0 级资源泄漏和状态丢失 Bug，使得它既是技术的领跑者，也是稳定性风险的集中体现。

### 4. 共同关注的技术方向
*   **成本与计费透明度**：
    *   **涉及项目**：Zeroclaw, hermes-agent, DeepSeek Harness, OpenClaw。
    *   **具体诉求**：多个项目均出现 Token 用量统计错误（如缓存失效未被计入、隐藏推理 Token 漏计、$0 计费 Bug），用户对“静默成本增加”极度敏感，**精确的计费账本（Cost Ledger）** 成为核心痛点。
*   **长对话上下文管理**：
    *   **涉及项目**：AstrBot, OpenClaw, QwenPaw。
    *   **具体诉求**：解决长对话导致的 `tool_calls` 配对丢失（400 错误）、上下文截断后的状态误判，以及历史会话膨胀导致的系统超时。
*   **部署环境安全性与隔离**：
    *   **涉及项目**：OpenClaw, hermes-agent, DeepSeek Harness, QwenPaw。
    *   **具体诉求**：Windows 下的沙箱 ACL 权限管理缺陷（0xC0000142 错误）及 PATH 污染；跨平台环境下的文件句柄锁定；以及通过网关（Gateway）对云 Worker 执行更细粒度的鉴权拦截。

### 5. 差异化定位分析
| 项目 | 核心侧重 | 目标用户 | 技术架构特征 |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | 全栈多平台、Subagent 编排 | 高级开发者、重度 AI 依赖者 | 复杂的 Gateway 架构，高频并发，底层直接操作 SQLite |
| **Zeroclaw** | 运维可观测性、配置安全 | 关注合规与成本的自托管用户 | 强调 Roster 细粒度权限、WASI 插件隔离、精确成本追踪 |
| **PicoClaw** | 低依赖、轻量嵌入 | 轻量级开发者、MCP 探索者 | 极简架构，侧重 MCP/CLI 集成，缺乏重运营支持 |
| **QwenPaw** | 企业级自托管、UI 稳定 | 内网/隔离环境部署者 | 分离 Console 与 Runtime，强调离线市场源与资源硬化 |
| **DeepSeek Harness** | 本地模型优化、IDE 集成 | 追求极致响应速度的极客 | 桌面端/WSL2 深度适配，代码索引插件生态 |

### 6. 社区热度与成熟度分层
*   **第一梯队（快速迭代与风险并存）**：**OpenClaw** 与 **hermes-agent**。两者均处于高强度的开发期，拥有庞大的贡献者基数。OpenClaw 正在通过大版本更新（v2026.10.x）重构核心底座，而 hermes-agent 则在清理长期兼容债（如 Cron 调度、Slack 升级）。
*   **第二梯队（质量巩固期）**：**QwenPaw** 与 **Zeroclaw**。这两个项目今日无大规模版本发布，而是专注于修复高影响的小 Bug（如文件锁定、配置重写），显示出向生产级稳定性收敛的趋势。
*   **第三梯队（长尾维护风险）**：**PicoClaw** 与 **DeepSeek Harness**。PicoClaw 的 Stale Bot 误伤机制导致维护响应断层；DeepSeek Harness 虽讨论活跃，但核心平台的稳定性缺陷（Linux 缺失、Windows 沙箱）阻碍了其作为通用助手的成熟。

### 7. 值得关注的趋势信号
1.  **从“能对话”到“可信运维”**：行业趋势正转向**可观测性**。用户不再满足于简单的 Agent 交互，而是要求透明的成本账本（Cost Ledger）、可审计的插件安全日志（WASI 审计）以及可靠的会话恢复机制。**建议开发者优先构建内置的监控与审计中间件。**
2.  **状态管理的复杂性成为主要瓶颈**：几乎所有项目都在处理**会话一致性**问题（子进程僵尸、数据库锁死、配置热重载导致任务取消）。这表明随着 Agent 能力的增强，**分布式状态管理**（如 SQLite 锁、跨进程同步）已取代模型推理本身，成为系统稳定性的第一杀手。
3.  **渠道集成的可靠性赤字**：Telegram/WebChat 等渠道的“静默消息丢失”（不重试、无告警）在 OpenClaw 和 hermes-agent 中均有体现。建立**基于消息确认（ACK）与死信队列（DLQ）的渠道投递机制**将是下一阶段的核心工程重点。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 (2026-10-14)

### 1. 今日速览
过去24小时内，Zeroclaw 社区保持高度活跃，共有25条Issue更新和50条PR更新，显示项目正处于密集的开发与修复阶段。核心焦点集中在运行时性能优化（如提示词缓存失效问题）、成本监控准确性修复以及网关安全架构的演进上。虽然无新版本发布，但多项涉及数据完整性（SQLite会话重写）和配置安全（模型路由覆盖）的高优先级Bug已提交修复PR，显示出维护团队对系统稳定性的快速响应能力。

### 2. 版本发布
*（今日无新版本发布）*

### 3. 项目进展
今日仅有5条PR被合并或关闭，其中最重要的是 **#11435** `fix(sop): settle rejected headless runs and retain reload retries`。该PR修复了无头SOP运行在验证拒绝后状态未正确结算的问题，避免了并发容量被无效任务占用的Bug。这表明项目正在持续清理运行时状态管理的边角案例，提升长期运行的鲁棒性。

### 4. 社区热点
今日讨论最活跃的议题围绕**成本可观测性**与**运行时配置一致性**展开：
*   **[#11204] OpenRouter 成本统计异常**：用户报告通过OpenRouter发送约210万tokens后，仪表盘成本显示为$0.00且所有token被标记为“免费”，揭示出用量成本摄入逻辑存在严重缺陷。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11204)
*   **[#7432] 运行时与网关交付追踪器**：作为v0.8.6和v0.9.0版本的核心Tracker，该Issue持续更新，旨在对齐RFC #5574中的阶段2运行时工作和阶段3网关分离工作，是社区关注度高、风险标记为High的关键架构路线图。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)
*   **[#10573] 网关配对令牌绑定Roster用户**：讨论如何通过绑定现有Roster用户来为远程主体提供范围受限的访问权限，标志着项目在细粒度访问控制方面的架构演进。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10573)

### 5. Bug 与稳定性
今日报告的Bug主要集中在数据持久化一致性与配置安全性，按严重程度排列如下：

*   **[P1/High] 配置重写导致数据丢失/伪造**：
    *   **Issue**: [#11606] `model_routing_config` 的 `upsert_agent` 操作通过默认结构体往返整个 `config.toml`，导致重写整个配置，伪造风险/运行时配置文件、丢失字段并重置代理限制。
    *   **Fix PR**: 暂无直接关联的已合并修复PR，需关注后续提交。
    *   **链接**: [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/11606)
*   **[P1/Medium] SQLite 会话时间戳污染**：
    *   **Issue**: [#11420] SQLite 会话后端在每次轮次重写所有消息的 `created_at` 时间戳，导致单条消息的时间信息丢失。
    *   **Fix PR**: [#11676] `fix(infra): preserve created_at of retained rows...` 已提交，旨在保留被保留行的原始时间戳。
    *   **链接**: [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/11420) | [PR](https://github.com/zeroclaw-labs/zeroclaw/pull/11676)
*   **[P2/Medium] 成本账本低估推理Token**：
    *   **Issue**: [#11613] 成本账本丢弃提供商的 `total_tokens`，导致使用隐藏推理Token（如Gemini via OpenAI-compatible）的模型计数不足。
    *   **Fix PR**: 暂无。
    *   **链接**: [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/11613)
*   **[P2/Medium] 预算警告被忽略**：
    *   **Issue**: [#10950] 运行时忽略 `cost.warn_at_percent` 警告，无法在接近预算限制时提供有效告警。
    *   **Fix PR**: 暂无。
    *   **链接**: [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10950)

### 6. 功能请求与路线图信号
*   **细粒度访问控制**：[#10573] 请求将网关配对令牌绑定到Roster用户，以实现范围受限的远程主体，这极可能纳入 v0.9.0 的安全增强计划。
*   **子代理模型路由**：[#11577] `feat(runtime): run a subagent on an operator-declared model route` 允许子代理在操作员声明的模型路由上运行，增强了多代理系统的灵活性，标记为 High Risk 且处于进行中状态。
*   **配置可编辑性**：[#11419] 允许在 zerocode 和 dashboard 中编辑密钥/值映射（如MCP服务器环境变量），解决了此前无法通过UI添加新环境变量的痛点。
*   **多模态转录增强**：[#11717] 为本地 Whisper 转录添加可选模型支持，允许用户指定特定的STT模型，适应更广泛的自托管场景。

### 7. 用户反馈摘要
*   **成本焦虑与透明度**：用户强烈关注成本准确性（如 #11204, #11613, #11694），发现仪表盘成本数据与实际情况不符（如显示$0或混淆UTC/本地时间），反映出用户对代理系统运行成本的敏感性。
*   **性能与缓存效率**：多个Issue（#11696, #11703, #11704）指出系统提示词的重建或修改（如读取磁盘文件、日期变更、工具激活）会导致提示词缓存失效，增加推理成本和延迟，用户期望更稳定的缓存策略。
*   **配置安全性担忧**：用户反馈配置操作（如 #11606）意外破坏其他配置部分，表明用户对配置幂等性和原子性的期望较高，现有实现未能满足。

### 8. 待处理积压
*   **[#7432] 运行时与网关交付追踪器**：作为跨版本的关键架构任务，持续更新中，需确保 v0.8.6 和 v0.9.0 的依赖项按时落地。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)
*   **[#11304] 插件出口拒绝日志记录**：标记为 `status:blocked` 且风险 High，涉及 WASI 插件安全日志，需解决阻塞因素以完善插件安全审计能力。[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/11304)
*   **[#11204] OpenRouter 成本摄入缺陷**：尽管评论活跃，但尚未看到对应的修复PR，需优先处理以避免用户在成本监控上的持续困惑。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11204)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 (2026-10-14)

## 1. 今日速览
过去 24 小时内，PicoClaw 项目整体处于**低活跃但高清理**的状态。今日无新版本发布，主要动态集中在 Stale Bot（陈旧机器人）清理长期未响应的 Issue 和 PR，关闭了 6 个陈旧 Issue 和 1 个陈旧 PR。项目核心的 Agent 循环优化与 Web UI 稳定性问题在早期报告后仍待解决，今日仅有一条关于 MCP/CLI 集成新用例的开放提案，显示出社区对持久化 Agent 会话场景的关注。整体健康度良好，但存在明显的“长尾积压”风险，需警惕核心可靠性问题被标记为陈旧而忽略。

## 2. 项目进展
今日无新合并的功能 PR，主要活动为清理工作：
*   **清理陈旧 PR #3370 [CLOSED]**：贡献者 @ilya-bogin-keenable 提交的“添加 Keenable 网页搜索提供商”PR 被关闭。该 PR 旨在集成 `keenable.ai` 的公开搜索接口，无需 API Key 即可在默认安装中使用。尽管功能有价值，但可能因缺乏维护者及时审核或长期未活动被 Stale Bot 关闭。
    *   链接: [PR #3370](https://github.com/sipeed/picoclaw/pull/3370)

## 3. 社区热点
今日讨论最活跃的是关于**Agent 迭代限制优化**与**Web UI 稳定性**的旧议题，这些议题今日被标记为 Stale 并关闭，反映了社区长期痛点：
*   **Issue #440 [CLOSED] - Agent 迭代限制优化**：用户 @drpedapati 提出将硬编码的 `max_tool_iterations: 20` 替换为基于上下文窗口边界的循环检测机制。该 Issue 有 9 条评论，是今日评论数最多的。痛点在于当前硬限制导致复杂任务失败，即使模型未完成任务也会因达到迭代上限而终止，用户体验较差。
    *   链接: [Issue #440](https://github.com/sipeed/picoclaw/issues/440)
*   **Issue #3407 [CLOSED] - Web UI “幽灵会话” Bug**：用户 @racso2609 报告 Web UI 中会话在模型思考过程中从列表消失的严重 Bug，导致无法返回上下文。此问题今日被 Stale Bot 关闭，但实际影响日常使用，建议重新打开或作为 P0 缺陷处理。
    *   链接: [Issue #3407](https://github.com/sipeed/picoclaw/issues/3407)

## 4. Bug 与稳定性
今日关闭的多个 Issue 揭示了项目当前的稳定性痛点（注意：这些 Issue 今日被 Stale Bot 关闭，但问题可能尚未真正解决）：
*   **[严重] Web UI 会话丢失 (Ghost Session)**：如 [Issue #3407](https://github.com/sipeed/picoclaw/issues/3407) 所述，会话在模型思考时从 UI 列表中消失，无恢复路径。这是直接影响用户工作流的阻塞性问题，需确认是否有修复 PR 或在 v0.3.1+ 中已修复。
*   **[高] 可靠性回归 (Wave 1)**：[Issue #3404](https://github.com/sipeed/picoclaw/issues/3404) 由用户 @x1F916 报告，指出 Agent 循环、通道管理器和更新器中存在多个可复现的 Bug，部分 Bug 在 v0.3.1 和 `main` (bbf6893) 上均可复现。该 Issue 今日被 Stale Bot 关闭，但描述中提到的“修复前被 Stale Bot 关闭”暗示这些问题可能仍未彻底解决。
*   **[中] 安全漏洞报告渠道缺失**：[Issue #3405](https://github.com/sipeed/picoclaw/issues/3405) 指出仓库未启用 GitHub 私有漏洞报告功能，且缺少 `SECURITY.md`，阻碍了安全漏洞的负责任披露。

## 5. 功能请求与路线图信号
*   **[开放] MCP/CLI 持久化 Agent 示例**：[Issue #3427](https://github.com/sipeed/picoclaw/issues/3427) 是今日唯一的开放 Issue。用户 @cairn-agent 提议添加一个低依赖的 Plazmi MCP/CLI 示例，用于演示持久化 Agent 会话（如虚拟家园、花园交互）。该提案结合了 PicoClaw 的 MCP CLI 和 Heartbeat 能力，暗示项目路线图可能关注**持久化记忆与外部世界交互**场景。
*   **[关闭/陈旧] 新增通道支持**：[PR #3416](https://github.com/sipeed/picoclaw/pull/3416) 提出了添加 Sendblue iMessage/SMS 通道的功能，允许用户通过短信与 Agent 交互。该 PR 处于 Open 但 Stale 状态，表明通道扩展是用户需求热点，但维护者资源可能紧张。
*   **[关闭/陈旧] 提供商目录扩展**：[Issue #3397](https://github.com/sipeed/picoclaw/issues/3397) 请求在 OpenAI 兼容提供商目录中添加 Tsubasa，以改善选择器体验。该需求反映了用户对**主流 AI 模型服务商集成**的期待。

## 6. 用户反馈摘要
*   **痛点**：用户对 **Web UI 的可靠性**（会话丢失、状态指示不清）和 **Agent 循环的灵活性**（硬迭代限制）抱怨较多。
*   **场景**：用户期待 Agent 能处理**长流程复杂任务**而不被中断，并希望能在**移动端（iMessage/SMS）**或**外部生态（MCP 插件）**中无缝使用 PicoClaw。
*   **满意度**：社区对 PicoClaw 的核心 Agent 能力持积极态度，但对**非核心体验（UI、配置灵活性）**的粗糙程度感到沮丧。
*   **安全**：部分用户关注**安全漏洞披露流程**的规范性。

## 7. 待处理积压
*   **被 Stale Bot 误伤的活跃 Bug**：[Issue #3407](https://github.com/sipeed/picoclaw/issues/3407)（UI 会话丢失）和 [Issue #3404](https://github.com/sipeed/picoclaw/issues/3404)（可靠性 Bug）今日被标记为 Stale 并关闭。维护者需确认这些问题是否已修复，若未修复，应重新打开并提升优先级，避免用户反馈被系统性忽略。
*   **未合并的重要功能 PR**：[PR #3416](https://github.com/sipeed/picoclaw/pull/3416)（Sendblue 通道）和 [PR #3370](https://github.com/sipeed/picoclaw/pull/3370)（Keenable 搜索）均因 Stale 被关闭或搁置。若这些功能有实际用户价值，建议维护者重新审视代码质量并尽快合并或给出明确拒绝理由。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 (2026-10-14)

### 1. 今日速览
QwenPaw 在 2026-10-14 展现出极高的社区活跃度，过去 24 小时内记录了 **20** 条 Issues 更新和 **43** 条 PR 更新，其中 **20** 条 PR 处于待合并或已关闭状态，反映了核心维护团队与贡献者的紧密协作。尽管今日无正式版本发布，但大量针对 **Console 前端稳定性**、**插件热重载** 及 **Agent 生命周期管理** 的修复正在密集推进。社区重点聚焦于解决 Windows 环境下的文件锁定问题、聊天历史体积膨胀导致的超时，以及 ACP 会话中插件加载缺失的关键缺陷。项目健康度良好，主要工作流集中在提升自托管部署场景（如内网、反向代理）的兼容性与鲁棒性。

### 2. 版本发布
今日无新版本发布（Releases 数量：0）。

### 3. 项目进展
今日共有 20 条 PR 发生状态变更（已合并或关闭），其中多项基础架构与核心功能修复得以落地：
*   **前端 UI/UX 基础重构**：PR [#8217](https://github.com/agentscope-ai/QwenPaw/pull/8217) 已关闭，引入了更稳健的模块懒加载机制，消除了插件回退产生的假告警，并优化了后台轮询策略（前台 2.5s/后台 30s），显著提升了 Console 的响应速度与资源效率。
*   **依赖与安全升级**：PR [#8220](https://github.com/agentscope-ai/QwenPaw/pull/8220) 将 `agentscope` 依赖升级至 2.0.10；PR [#8065](https://github.com/agentscope-ai/QwenPaw/pull/8065) 修复了 Skill 安装路径中的目录遍历漏洞（CodeQL 标记项），增强了文件系统安全性。
*   **可观测性修复**：PR [#7964](https://github.com/agentscope-ai/QwenPaw/pull/7964) 解决了 Langfuse 工具观察记录缺失 `output` 数据的问题，完善了开发者追踪调试链路。
*   **数据持久化加固**：PR [#6459](https://github.com/agentscope-ai/QwenPaw/pull/6459) 针对 SQLite 并发写入导致的锁等待耗尽问题进行了硬化处理，确保聊天历史在高压场景下的写入可靠性。

### 4. 社区热点
*   **[Feature] Plugin-facing theme extension point** ([#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071))：
    *   **状态**：OPEN，评论数 3。
    *   **分析**：该 Issue 于 10-13 更新，由 @BeiMu-new 提出。用户希望插件开发者能拥有比 `colorPrimary` 更深层的主题定制能力（如覆盖 semantic token 层）。这反映了生态插件对 UI 一致性需求的升级，从“可用”转向“美观与品牌化”。
*   **[Bug] Chat history bloat & 30s timeout** ([#8228](https://github.com/agentscope-ai/QwenPaw/issues/8228) & PR [#8229](https://github.com/agentscope-ai/QwenPaw/pull/8229))：
    *   **状态**：Issue OPEN，PR OPEN。
    *   **分析**：由 @Marlin-Phone 提交。长对话中 `tool_result` 内嵌 base64 数据导致响应体超过 10MB，触发 30s 超时。该问题在自托管低带宽环境下尤为致命，社区已快速响应并提交截断策略 PR，表明维护者对性能瓶颈的高度敏感。
*   **[Bug] qwenpaw acp never loads installed plugins** ([#8222](https://github.com/agentscope-ai/QwenPaw/issues/8222))：
    *   **状态**：OPEN。
    *   **分析**：由 @CallMeHFK 提出。ACP（Agent Control Protocol）会话中 `PluginLoader` 未被实例化，导致插件工具不可用。这是跨进程任务调用的关键阻断点，影响高级多 Agent 工作流的完整性。

### 5. Bug 与稳定性
今日报告的 Bug 主要集中在部署兼容性与资源管理：
*   **[高] Windows 项目删除失败 (WinError 5)** ([#8206](https://github.com/agentscope-ai/QwenPaw/issues/8206))：
    *   **描述**：在 Windows 上删除 `qwenpaw-creator` 项目时，因 `creator.log` 文件被占用导致目录重命名失败。
    *   **Fix 状态**：暂无关联 PR，需开发者处理文件句柄释放逻辑。
*   **[中] 配置热重载取消 Cron 任务** ([#8225](https://github.com/agentscope-ai/QwenPaw/issues/8225))：
    *   **描述**：保存心跳设置触发的零停机重载会静默取消正在运行的定时任务，记录为 `cancelled`。
    *   **Fix 状态**：暂无明确 PR，属于状态一致性 Bug。
*   **[中] Skill 安装二进制文件损坏** ([#8179](https://github.com/agentscope-ai/QwenPaw/issues/8179))：
    *   **描述**：从 GitHub 安装 Skill 时，非 UTF-8 字节（图片/字体）被替换为 U+FFFD，导致文件不可读。
    *   **Fix 状态**：暂无 PR，疑似下载或解码环节未区分文本与二进制流。
*   **[中] Hub 重启后 Local Runtime 状态丢失** ([#8213](https://github.com/agentscope-ai/QwenPaw/issues/8213))：
    *   **描述**：Hub 重启后，标记为 `desired-running` 的本地运行时未恢复，Cron 任务静默跳过。
    *   **Fix 状态**：暂无 PR，影响自托管高可用场景。

### 6. 功能请求与路线图信号
*   **[高] Skill 市场源可配置化** ([#8015](https://github.com/agentscope-ai/QwenPaw/issues/8015) & PR [#8128](https://github.com/agentscope-ai/QwenPaw/pull/8128))：
    *   **信号**：PR #8128 已将 Hub 移动至插件系统，支持自定义市场源。这表明下一版本将强化**内网/离线部署**能力，允许用户指向自托管镜像。
*   **[中] 插件热重载与干净卸载** ([#7565](https://github.com/agentscope-ai/QwenPaw/pull/7565))：
    *   **信号**：PR 引入 `PluginInstance` 两层注销账本，旨在实现不重建整个 Workspace 的插件更新与回滚。这将显著提升插件开发的迭代体验。
*   **[低] Python Code Mode** ([#8224](https://github.com/agentscope-ai/QwenPaw/pull/8224))：
    *   **信号**：新增实验性 `run_code` 工具，允许在隔离 CPython worker 中执行代码。暗示 QwenPaw 正在探索更复杂的逻辑编排能力，不仅限于聊天。

### 7. 用户反馈摘要
*   **痛点**：用户 @Marlin-Phone 指出在 5Mbps 链路上，13.3MB 的聊天历史响应导致控制台不可用，强烈呼吁对大对象进行流式传输或截断。
*   **痛点**：用户 @xiaofengtt 强调 Windows 环境下的文件句柄锁定问题直接阻碍了自动化部署流程，希望获得官方修复。
*   **需求**：用户 @qhxuezhou 在 #8015 中明确表示，对于空气隔离（air-gapped）环境，无法访问公共市场源是一个硬性阻断点，自建市场支持是刚需。
*   **积极反馈**：PR #8217 中关于轮询优化的描述显示，前端卡顿问题得到缓解，用户满意度预期提升。

### 8. 待处理积压
*   **[长期] Background Task Callback** ([#7056](https://github.com/agentscope-ai/QwenPaw/issues/7056))：
    *   创建于 2026-08-15，至今无明确实现方案。用户痛点是后台任务完成后缺乏通知机制，需手动轮询。建议评估引入 Webhook 或内部事件总线。
*   **[长期] ACP Plugin Loading** ([#8222](https://github.com/agentscope-ai/QwenPaw/issues/8222))：
    *   虽为新 Issue，但涉及 ACP 核心协议完整性。若插件无法在 ACP 会话中加载，将限制 QwenPaw 在复杂多 Agent 拓扑中的推广，需优先排期。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期**: 2026-10-14
**数据源**: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) GitHub

## 1. 今日速览
过去24小时，项目保持极高的开发活跃度，共记录 Issue 更新 374 条、PR 更新 500 条，其中合并/关闭 PR 77 条，显示出代码库高频迭代的特征。今日无新版本发布，但大量针对稳定性、平台兼容性及配置管理的修复 PR 正在积极推进中。社区讨论热点集中在 API 权限限制、多平台（Telegram/Slack/Matrix）消息投递异常以及 Windows 平台下的安装与路径注册问题。项目整体健康度表现为“高噪音、高吞吐”，核心维护团队正在集中清理长期存在的兼容性问题（如 cron 依赖、npm 安全漏洞、Docker 标签发布流程）。

## 2. 版本发布
**今日无新版本发布。**

## 3. 项目进展
今日合并/关闭的 77 个 PR 中，主要集中在基础设施修复与文档澄清：
*   **Docker 发布流程修复**: PR [#138107](https://github.com/NousResearch/hermes-agent/pull/138107) 修复了稳定版本发布时 `vX.Y.Z` Docker 标签未正确推送的问题，确保后续版本能被正常拉取。
*   **CLI 用户体验优化**: PR [#138114](https://github.com/NousResearch/hermes-agent/pull/138114) 优雅处理了管道命令（如 `head`）断开导致的 BrokenPipeError，避免了控制台杂乱报错。
*   **安全依赖更新**: PR [#138026](https://github.com/NousResearch/hermes-agent/pull/138026) 升级了 httpx2/httpcore2 至 2.12.0，清除了 MCP HTTP 传输栈上的 5 个安全通告。
*   **插件系统增强**: PR [#138119](https://github.com/NousResearch/hermes-agent/pull/138119) 允许 Desktop 端接受仅包含 manifest 的语言包插件，提升了插件生态的灵活性。

## 4. 社区热点
今日讨论最活跃的 Issues 反映了用户在多平台集成和权限管理上的痛点：
*   **API 权限受限导致 PR 创建失败**: Issue [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) (38 评论) 指出特定账户无法通过 API 创建 Pull Request，尽管 Issue 创建正常。这阻碍了自动化工作流，多位开发者报告此问题，目前处于 `blocked` 状态。
*   **Telegram 话题线程路由错误**: Issue [#136567](https://github.com/NousResearch/hermes-agent/issues/136567) (19 评论) 报告在启用论坛功能的 DM 中，新话题的首条消息因缺少 `message_thread_id` 而被误路由至旧话题。PR [#137348](https://github.com/NousResearch/hermes-agent/pull/137348) 正在尝试修复此路由逻辑。
*   **Cron 外部工作者依赖缺失**: Issue [#122222](https://github.com/NousResearch/hermes-agent/issues/122222) 和 [#122529](https://github.com/NousResearch/hermes-agent/issues/122529) (共 49 评论) 持续困扰自管理安装用户，由于 `PYTHONPATH` 未正确包含 venv site-packages，导致所有定时任务在启动前即失败。
*   **Windows 路径注册污染**: Issue [#135037](https://github.com/NousResearch/hermes-agent/issues/135037) 揭示了一个严重的安全/稳定性隐患：从沙箱或第二个检出目录运行 CLI 时，仍会向共享的用户 `HKCU\Environment\Path` 写入该检出的 bin 目录，导致主机命令解析混乱。

## 5. Bug 与稳定性
按严重程度排列的今日关键 Bug 报告：

| 优先级 | 问题描述 | 关联 Issue/PR | 状态 |
| :--- | :--- | :--- | :--- |
| **P1** | macOS 网关在错过 liveness probe 后反复退出 (exit code 75)，根因尚未完全确认。 | [#137838](https://github.com/NousResearch/hermes-agent/issues/137838) | 待诊断 |
| **P1** | Windows 下沙箱/外部 checkout 的 bin 目录被错误注册到全局用户 PATH。 | [#135037](https://github.com/NousResearch/hermes-agent/issues/135037) | 待修复 |
| **P1** | Cron 外部工作者在自管理安装中因 `ModuleNotFoundError: ruamel` 导致所有定时任务失败。 | [#122529](https://github.com/NousResearch/hermes-agent/issues/122529) | 长期未决 |
| **P2** | Telegram 新话题首条消息因无 thread_id 被误路由至前一个话题。 | [#136567](https://github.com/NousResearch/hermes-agent/issues/136567) | [Fix PR](https://github.com/NousResearch/hermes-agent/pull/137348) 进行中 |
| **P2** | Anthropic OAuth 用量计算错误，将 0-1% 的使用率显示为 100%。 | [#58226](https://github.com/NousResearch/hermes-agent/issues/58226) | 待修复 |
| **P2** | Desktop 端 smart-approval guardian 在事件循环线程中崩溃，导致所有标记命令升级给用户。 | [#131375](https://github.com/NousResearch/hermes-agent/issues/131375) | 待修复 |
| **P2** | WeChat 实时回复在限流事件后静默丢弃，即使重新登录也无效。 | [#94146](https://github.com/NousResearch/hermes-agent/issues/94146) | 待修复 |

## 6. 功能请求与路线图信号
*   **远程代理本地工具执行**: Issue [#18715](https://github.com/NousResearch/hermes-agent/issues/18715) (40 👍) 请求支持远程 Hermes Agent 实例搭配本地机器上的工具执行。这是一个高呼声的架构特性，允许用户保留本地技能/记忆的同时利用远程算力。
*   **可配置 Temperature 参数**: Issue [#17565](https://github.com/NousResearch/hermes-agent/issues/17565) (17 👍) 指出当前 temperature 硬编码或默认为 1.0，导致严重幻觉。用户强烈要求暴露配置接口。
*   **Delegate_task 每调用覆盖**: Issue [#80222](https://github.com/NousResearch/hermes-agent/issues/80222) 请求在 `delegate_task` 中支持 per-call 的 model 和 reasoning_effort 覆盖，而非仅依赖全局配置。PR [#138104](https://github.com/NousResearch/hermes-agent/pull/138104) 已开始处理相关 provider wire 格式问题。
*   **会话可见性增强**: Issue [#50718](https://github.com/NousResearch/hermes-agent/issues/50718) 请求在 Desktop UI 中增加未读标记、需输入提示和 OS 徽章，以改善多会话管理体验。

## 7. 用户反馈摘要
*   **安装与更新痛点**: 用户频繁报告 Termux/proot ([#2825](https://github.com/NousResearch/hermes-agent/issues/2825)) 和 Windows 沙箱环境 ([#135037](https://github.com/NousResearch/hermes-agent/issues/135037)) 下的安装脚本失败或副作用。对 `hermes update` 在部分克隆或低版本 git 下生成无限进程树的担忧 ([#124794](https://github.com/NousResearch/hermes-agent/issues/124794)) 表明更新机制在非标准环境下不够鲁棒。
*   **内存管理压力**: 用户指出默认 `memory_char_limit` 过小 ([#5320](https://github.com/NousResearch/hermes-agent/issues/5320))，长会话易触发压缩，导致上下文丢失。Holographic 记忆插件安装失败 ([#137017](https://github.com/NousResearch/hermes-agent/issues/137017)) 导致外部记忆功能静默关闭，用户对此表示困惑。
*   **平台兼容性**: Slack SDK 升级 ([#110374](https://github.com/NousResearch/hermes-agent/issues/110374)) 导致状态指示器静默失效，Matrix 客户端 ([#138113](https://github.com/NousResearch/hermes-agent/pull/138113)) 加密消息解密失败。这些细节问题影响了跨平台部署的可靠性。
*   **成本透明度**: 用户对 Anthropic 用量显示错误 ([#58226](https://github.com/NousResearch/hermes-agent/issues/58226)) 表达强烈不满，认为这影响了成本控制的准确性。

## 8. 待处理积压
*   **长期未决的高影响 Bug**:
    *   [#122222](https://github.com/NousResearch/hermes-agent/issues/122222) & [#122529](https://github.com/NousResearch/hermes-agent/issues/122529): Cron 调度器在自管理安装中持续失败近一个月，需优先排查 `PYTHONPATH` 隔离机制。
    *   [#18715](https://github.com/NousResearch/hermes-agent/issues/18715): 远程代理本地工具执行的高呼声特性，需评估架构可行性并给出路线图信号。
    *   [#7335](https://github.com/NousResearch/hermes-agent/issues/7335): Open Issues 超过 1000 个，社区呼吁加强 Issue 生命周期管理，建议引入自动关闭过期 Issue 的机制或分类标签清理。
*   **PR 积压**: 423 个待合并 PR 数量巨大，维护者需关注代码合并瓶颈，特别是涉及 `install-update` 和 `gateway` 模块的 PR，可能存在合并冲突或需集中测试。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

**AstrBot 项目动态日报 (2026-10-14)**

### 1. 今日速览
过去 24 小时 AstrBot 项目社区活跃度保持中高水平，共产生 19 条 Issue 更新与 23 条 PR 更新。
项目核心维护工作集中在**上下文管理稳定性**与**会话等待器并发安全**两个关键痛点上，今日已有多个针对性修复合并。
社区对于**多模态数据处理**（如 GIF 污染、WebP 格式兼容性）以及**长对话历史保留机制**的诉求愈发强烈。
整体代码库处于健康迭代状态，未发布新版本，主要精力投入在 Bug 修复与底层机制优化。

### 2. 版本发布
**今日无新版本发布。**

### 3. 项目进展
今日（截至 10-13 晚间至 10-14 凌晨）合并/关闭的重要 PR 主要涉及以下领域：

*   **并发与会话安全修复**：
    *   解决了 `SessionWaiter` 在并发场景下注册表被错误覆盖导致的后续消息丢失问题。PR [#10166](https://github.com/AstrBotDevs/AstrBot/pull/10166) 和 [#10011](https://github.com/AstrBotDevs/AstrBot/pull/10011) 均已合并，修复了 Issue [#9996](https://github.com/AstrBotDevs/AstrBot/issues/9996)。
    *   修复了事件注册与注销时键值不匹配导致的内存泄漏或状态残留问题，PR [#10546](https://github.com/AstrBotDevs/AstrBot/pull/10546) 合并，修复 Issue [#10540](https://github.com/AstrBotDevs/AstrBot/issues/10540)。
*   **多模态与格式兼容性**：
    *   修复了 WebP 图像在特定多模态 Provider 下的发送问题，PR [#10145](https://github.com/AstrBotDevs/AstrBot/pull/10145) 合并，修复 Issue [#9743](https://github.com/AstrBotDevs/AstrBot/issues/9743)。
    *   修复了阿里云百炼 `qwen3-rerank` 原生接口的请求体格式错误，PR [#9417](https://github.com/AstrBotDevs/AstrBot/pull/9417) 合并，修复 Issue [#9360](https://github.com/AstrBotDevs/AstrBot/issues/9360)。
*   **依赖与环境修复**：
    *   修复了 pnpm 11/12 版本下依赖安装及 lockfile 重写问题，PR [#10541](https://github.com/AstrBotDevs/AstrBot/pull/10541) 合并，修复 Issue [#10539](https://github.com/AstrBotDevs/AstrBot/issues/10539)。
*   **缓存优化**：
    *   优化 Cron 任务执行时的上下文缓存命中率，通过将时间戳移至 User Prompt 避免破坏前缀缓存，PR [#10549](https://github.com/AstrBotDevs/AstrBot/pull/10549) 合并。

### 4. 社区热点
*   **上下文管理稳定性**：用户对于上下文截断导致 `tool_calls` 配对丢失（400 报错）及摘要失败后的状态误判关注度最高。
    *   [Issue #7225](https://github.com/AstrBotDevs/AstrBot/issues/7225)：上下文截断破坏 tool 消息完整性。
    *   [Issue #10551](https://github.com/AstrBotDevs/AstrBot/issues/10551)：摘要失败后误判上下文已缩减，导致持续超限报错。
*   **多模态数据污染**：
    *   [Issue #9295](https://github.com/AstrBotDevs/AstrBot/issues/9295)：引用 GIF 导致会话历史被 Base64 数据污染，致使不支持 GIF 的模型（如部分 Gemini 网关）持续请求失败。该 Issue 已关闭，表明相关修复已合入。
*   **数据持久化与历史回溯**：
    *   [Issue #9460](https://github.com/AstrBotDevs/AstrBot/issues/9460)：用户强烈希望框架提供机制保留被压缩/丢弃的长期对话历史，以便插件读取利用。

### 5. Bug 与稳定性
按严重程度排序：

1.  **P0 级别 - 上下文截断破坏 Tool 配对**：
    *   [Issue #7225](https://github.com/AstrBotDevs/AstrBot/issues/7225)：长对话触发截断时，未保持 `assistant(tool_calls)` 与 `tool` 消息的配对完整性，导致 LLM 返回 400 错误。
    *   **Fix 状态**：PR [#10342](https://github.com/AstrBotDevs/AstrBot/pull/10342) 正在处理中（Open），旨在每次上下文传递时校验配对完整性。
2.  **P1 级别 - 摘要失败状态误判**：
    *   [Issue #10551](https://github.com/AstrBotDevs/AstrBot/issues/10551)：摘要请求失败后，系统误认为上下文已缩短，继续发送超限请求。
    *   **Fix 状态**：PR [#10553](https://github.com/AstrBotDevs/AstrBot/pull/10553) 正在处理中（Open），修复逻辑为当摘要失败时强制裁剪超限历史。
3.  **P1 级别 - Skill 重查询时序错乱**：
    *   [Issue #9788](https://github.com/AstrBotDevs/AstrBot/issues/9788)：`skills_like` 模式下，无工具重查询退化分支在 response hook 前发送响应，导致事件触发时序错误。
    *   **Fix 状态**：Issue 已关闭，推测相关修复已合入或该问题被视为不可复现/已知限制。
4.  **回归问题 - 缓存命中率下降**：
    *   [Issue #10547](https://github.com/AstrBotDevs/AstrBot/issues/10547)：用户报告从 4.27.4 更新至 4.28.2 后，LLM 缓存命中率显著下降。
    *   **Fix 状态**：Issue 已关闭，可能已确认原因或作为已知问题记录。

### 6. 功能请求与路线图信号
*   **多模态 Embedding/Rerank 支持**：
    *   [Issue #10550](https://github.com/AstrBotDevs/AstrBot/issues/10550)：建议支持 `qwen3-vl-embedding` 等多模态模型，用于搜图/搜视频场景。
    *   结合 PR [#10145](https://github.com/AstrBotDevs/AstrBot/pull/10145) 对图像格式的规范化处理，后续版本可能会加强多模态输入输出的标准化。
*   **Provider 接入灵活化**：
    *   [Issue #10535](https://github.com/AstrBotDevs/AstrBot/issues/10535)：建议为 Provider 请求头引入变量化模板，减少对每个新供应商编写独立适配器的需求。
    *   [Issue #10507](https://github.com/AstrBotDevs/AstrBot/issues/10507)：用户请求添加 DemonRoute 作为内置 OpenAI 兼容 Provider。
*   **对话历史增强**：
    *   [Issue #9449](https://github.com/AstrBotDevs/AstrBot/issues/9449) & [#9460](https://github.com/AstrBotDevs/AstrBot/issues/9460)：用户希望改进上下文压缩策略（更多组合方式）并提供长期对话历史的持久化保留机制，以便插件回溯。

### 7. 用户反馈摘要
*   **痛点**：
    *   **长对话稳定性**：用户普遍反映长对话中上下文管理容易出错（截断、工具配对丢失、缓存失效），影响 Agent 功能可用性。
    *   **多模态兼容性**：GIF 和 WebP 等非标准图片格式在跨 Provider 使用时频繁引发 400 错误或数据污染。
*   **使用场景**：
    *   **Agent 工具调用**：用户大量使用 Function Calling 和 MCP 工具，对工具执行过程中的上下文一致性和错误处理非常敏感。
    *   **定时任务**：Cron 任务用户对 LLM 缓存命中率（成本控制）关注度高，PR [#10549](https://github.com/AstrBotDevs/AstrBot/pull/10549) 的优化直接回应了此需求。
*   **满意点**：
    *   社区对 PR 的快速响应和合并表示认可，尤其是针对 `SessionWaiter` 并发 bug 的快速修复。

### 8. 待处理积压
*   **上下文管理相关**：
    *   [PR #10342](https://github.com/AstrBotDevs/AstrBot/pull/10342)：校验 tool_calls 配对，需尽快合并以解决 P0 级 400 错误。
    *   [PR #10553](https://github.com/AstrBotDevs/AstrBot/pull/10553)：修复摘要失败后的逻辑错误。
*   **长期未响应 Feature**：
    *   [Issue #9460](https://github.com/AstrBotDevs/AstrBot/issues/9460)：对话历史增强。该功能需求较高但涉及架构调整，需维护者评估是否纳入下一里程碑。
    *   [Issue #10525](https://github.com/AstrBotDevs/AstrBot/issues/10525)：Satori 适配器 SDK 化。建议维护者确认是否引入外部 SDK 以降低维护成本。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报

**日期**：2026-10-14  
**数据来源**：GitHub `deepseek-ai/deepseek-harness`  

---

## 1.  今日速览

DeepSeek Harness 今日整体活跃度处于高位，过去 24 小时内 Discussions 板块更新了 **167 条**记录，显示社区维持着高频讨论态势。尽管未产生新的 Release 版本，但社区反馈密集聚焦于 **Windows 平台沙箱稳定性** 与 **Linux 平台支持缺失**两大痛点，尤其是 `0xC0000142` 错误已成为 Windows 用户最突出的稳定性障碍。与此同时，本地插件生态（如 Qwen3.8 优化插件与代码索引插件）和性能体验优化（工作区多文件夹、输入历史）成为功能演进的新方向。项目当前处于功能迭代与底层架构修复并行推进阶段，社区对响应速度的期待值较高。

---

## 2.  版本发布

今日**无新版本发布**。

---

## 3.  项目进展

根据数据概览，该仓库未启用 GitHub Issues/PR，代码合并通过 Releases 落地，而当前“最新 Releases”部分显示为“无”。因此，今日**无通过 Release 通道落地合并的 changelog 信息**。项目层面的进展主要体现在社区基于已有版本（如 0.2.0-rc.2 nightly）的深入反馈与插件生态扩展上。

---

## 4.  社区热点

今日讨论最活跃、评论最多的议题主要集中在以下三条（按评论数排序）：

1.  **Linux 平台支持长期缺失**
    *   **[OPEN] [General] linux总是被遗忘...** [#8107](https://github.com/deepseek-ai/deepseek-harness/discussions/8107)
    *   **评论数**：29 | **更新**：2026-10-13
    *   **诉求分析**：用户强烈不满项目长期忽视 Linux 平台，指出仅 WorkBuddy 和 Qoder 等第三方工具支持 Linux，而 DeepSeek Harness 本体未提供官方支持，用户被迫使用替代方案“勉强度日”。该帖热度极高，反映出 Linux 开发者群体的强烈不满。

2.  **Windows 工作区 ACL 权限写入缺陷**
    *   **[OPEN] [General] [Bug Report] Windows 工作区：连接后外部创建/移入的子目录永远无法写入（capability ACE 永不补授）** [#423](https://github.com/deepseek-ai/deepseek-harness/discussions/423)
    *   **评论数**：10 | **更新**：2026-10-13
    *   **诉求分析**：用户深入分析了 Windows ACL 沙箱在 `capability SID` 授权逻辑上的缺陷，指出首次 `provision` 后的可继承 ACE 未正确传播到后续创建的子目录，导致写入权限永久缺失。该问题具有深层架构性，需维护者重点修复权限管理逻辑。

3.  **本地 Qwen3.8 压缩推理优化插件**
    *   **[OPEN] [Show Your Plugins!] dsh-qwen38-local-qol** [#5390](https://github.com/deepseek-ai/deepseek-harness/discussions/5390)
    *   **评论数**：8 | **更新**：2026-10-13
    *   **诉求分析**：社区开发者分享的插件旨在修复本地 Qwen3.8 模型的压缩推理问题，反映了用户对本地模型性能优化的强需求。该插件已链接至 `awesome-dsh-plugin` 生态页，显示出插件生态的活跃趋势。

---

## 5.  Bug 与稳定性

今日报告的 Bug 集中在 Windows 沙箱启动失败与性能损耗问题，按严重程度排列如下：

1.  **[严重] Windows 10/11 沙箱模式下子进程启动失败（0xC0000142）**
    *   该问题今日有**多个讨论帖**集中爆发，属于 P0 级稳定性缺陷：
        *   **[#810](https://github.com/deepseek-ai/deepseek-harness/discussions/810)**：Windows 无控制台宿主（如 Electron 桌面端）下，沙箱内 `pwsh` 100% 失败，导致 shell 能力完全丧失。
        *   **[#8497](https://github.com/deepseek-ai/deepseek-harness/discussions/8497)**：Windows 10 `workspace-write` 沙箱下，`cmd.exe`、`PowerShell` 等所有子进程均以 `0xC0000142` 退出，而 `read-only` 模式正常。
        *   **[#9083](https://github.com/deepseek-ai/deepseek-harness/discussions/9083)**：Windows 11 环境下，`workspace-write` 档在 `dsh-sandbox-windows-acl` 包中，任何子进程启动均报 DLL 初始化失败。
        *   **[#1847](https://github.com/deepseek-ai/deepseek-harness/discussions/1847)**：Web 模式下 `workspace-write` 在 Windows 10 上受限令牌进程启动失败。
    *   **状态**：均未见 fix PR。根因指向受限令牌 `capability SID` 与默认 DACL 的兼容性问题。

2.  **[高] `workflow` 工具调用永不返回，父 Agent 卡死**
    *   **[#8827](https://github.com/deepseek-ai/deepseek-harness/discussions/8827)**
    *   **描述**：`workflow` 工具调用在执行完全部 4 个阶段后未返回，导致父 Agent 永久卡死在 `step/start` 事件后。环境：DSH Desktop `0.2.0-rc.2`。
    *   **状态**：未见 fix PR。属于 Agent 运行时逻辑缺陷。

3.  **[中] 会话日志 `usage` 统计严重低估输入缓存缺失**
    *   **[#8829](https://github.com/deepseek-ai/deepseek-harness/discussions/8829)**
    *   **描述**：会话日志的 `usage` 字段与厂商实际计费用量相差约 26 倍，主因是未正确计算输入缓存缺失（cache-miss）。
    *   **状态**：未见 fix PR。影响用户对成本的分析准确性。

---

## 6.  功能请求与路线图信号

1.  **多文件夹工作区支持（对齐 Codex）**
    *   **[#5505](https://github.com/deepseek-ai/deepseek-harness/discussions/5505)**
    *   **诉求**：用户建议将工作区模型扩展为**有序文件夹列表**并指定 `primary` 文件夹，以支持横跨多个仓库（前端、后端、共享库）的真实项目场景。该提案高度对齐 OpenAI Codex 桌面版设计，被标记为 `[Feature Idea]`，具有较高被纳入路线图的潜力。

2.  **Web 编辑器输入历史导航**
    *   **[#5031](https://github.com/deepseek-ai/deepseek-harness/discussions/5031)**
    *   **诉求**：在 Web 编辑器中增加 `↑` / `↓` 快捷键导航历史输入，提升交互效率。属于轻量级 UI 增强。

3.  **Git 工作区状态内联显示**
    *   **[#5073](https://github.com/deepseek-ai/deepseek-harness/discussions/5073)**
    *   **诉求**：在编辑器输入框旁内联显示 Git 分支、领先/落后、未提交数量等状态，对标 Claude Desktop 的交互体验。

4.  **本地代码索引插件生态**
    *   **[#5623](https://github.com/deepseek-ai/deepseek-harness/discussions/5623)**
    *   **诉求**：用户开发并分享了 `dsh-code-index` 插件，提供基于 tree-sitter 的符号索引、排序搜索和自动更新仓库地图，反映了社区对本地代码理解能力的强烈需求。

---

## 7.  用户反馈摘要

*   **性能痛点**：用户反馈处理简单任务耗时过长（[#2019](https://github.com/deepseek-ai/deepseek-harness/discussions/2019)），简单代码解析请求耗时 30+ 分钟（LLM 3m36s + 工具调用 25m44s），而同类任务在 Claude/Grok 上仅需 30 秒至 1 分钟。用户质疑是否与 WSL2 环境或 V4-Pro 模型配置有关。
*   **大历史会话性能瓶颈**：系统级根因分析显示（[#4416](https://github.com/deepseek-ai/deepseek-harness/discussions/4416)），打开大型冷历史会话会卡死整个 Web 服务器，指出会话历史管理是性能优化的关键路径。
*   **平台支持缺失**：Linux 用户群体强烈不满（[#8107](https://github.com/deepseek-ai/deepseek-harness/discussions/8107)），认为项目被“遗忘”，迫使他们使用第三方替代品。

---

## 8.  待处理积压

*   **Windows ACL 沙箱权限与启动缺陷**：[#423](https://github.com/deepseek-ai/deepseek-harness/discussions/423)、[#810](https://github.com/deepseek-ai/deepseek-harness/discussions/810)、[#1847](https://github.com/deepseek-ai/deepseek-harness/discussions/1847)、[#8497](https://github.com/deepseek-ai/deepseek-harness/discussions/8497)、[#9083](https://github.com/deepseek-ai/deepseek-harness/discussions/9083) 等帖子均指向 Windows 沙箱权限与进程启动的底层问题，且自 2026-08 起持续未解决，建议维护者优先级修复。
*   **Workflow 卡死 Bug**：[#8827](https://github.com/deepseek-ai/deepseek-harness/discussions/8827) 报告自 2026-10-04 起，涉及核心 Agent 逻辑，需尽快复现并修复。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*