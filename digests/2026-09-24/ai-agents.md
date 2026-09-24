# OpenClaw 生态日报 2026-09-24

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-24 00:06 UTC

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
**日期：** 2026-09-24  
**数据来源：** GitHub OpenClaw Repository

## 1. 今日速览
过去24小时，OpenClaw 项目保持极高活跃度，共处理 500 个 Issues 和 PR。核心焦点集中在 `v2026.9.6` 版本的发布及相关的 Gateway 稳定性修复上。尽管新版本已推出，但社区反馈显示仍存在严重的内存泄漏（Issue #91588）和更新失败（Issue #146394, #147160）问题。开发团队正在积极合并多个关键修复 PR，特别是在 Codex 集成、会话状态管理和 Windows 平台兼容性方面。项目整体处于快速迭代后的稳定化调整期，技术债务清理工作繁忙。

## 2. 版本发布
**v2026.9.6** 已发布。
*   **更新内容：**
    *   修复了在 Node.js 安装路径变更后，托管 Gateway 升级无法完整完成的问题。
    *   优化了 Doctor 诊断、最终化（finalization）及核心插件后续工作的执行逻辑，移除了隐式截止时间导致的提前终止行为。
*   **关联 Issues：** #145335, #152973, #153085, #153109, #107930
*   **注意事项：** 用户报告从 `2026.9.4` 升级到 `2026.9.5` 时出现 `minimax-portal` 模型目录丢失的回归问题（#152804），建议升级前检查模型配置。同时，部分用户报告 `2026.9.3` 和 `2026.9.4` 的更新过程失败（#146394, #147160），需关注手动修复指南。

## 3. 项目进展
今日合并/关闭的重要 PR 及其影响：
*   **PR #156465 [CLOSED]:** 修复了全量备份时因逐个文件进行 SQLite 策略检查而导致的性能瓶颈，显著提升了备份速度。
*   **PR #156447 [CLOSED]:** 改进了 `openclaw update --dry-run` 的输出，使其能更清晰地解释因 Git 目标陈旧导致的更新不可用情况，提升了可观测性。
*   **PR #156833 [CLOSED]:** 修复了测试套件中因等待技能观察者就绪不完整而导致的竞态条件，增强了 CI 稳定性。
*   **在途关键 PR：**
    *   **#156858:** 修复压缩完成后会话状态过时的问题，防止消息丢失。
    *   **#156800:** 优化 Code Mode 下的 Node worker 复用，减少启动开销。
    *   **#156829:** 将插件和工具链迁移至 TypeScript 7，移除对 TS 6 的依赖。
    *   **#145169 / #144005:** 重大的原子更新修复，确保在迁移失败回滚时能保留最新数据，解决多起更新失败报告。

## 4. 社区热点
以下是过去24小时评论数最多、关注度最高的议题：

*   **[P0] Gateway 内存泄漏导致 OOM 崩溃 (#91588)**
    *   **热度：** 39 条评论，1 👍
    *   **摘要：** RSS 从 350MB 增长至 15.5GB，引发持续的 OOM 重启循环。这是目前影响生产环境稳定性的最关键问题。
    *   **链接：** https://github.com/openclaw/openclaw/issues/91588

*   **Agent 选择错误导致日志洪水 (#126360)**
    *   **热度：** 19 条评论
    *   **摘要：** 在显式多代理所有权配置下，缺乏 `agentId` 导致 `AgentSelectionRequiredError` 泛滥，影响日志可读性和系统性能。
    *   **链接：** https://github.com/openclaw/openclaw/issues/126360

*   **MCP 工具未注入子代理 (#85030) [已关闭]**
    *   **热度：** 15 条评论，6 👍
    *   **摘要：** 尽管文档支持，MCP 工具在 `sessions_spawn` 创建的回话中未被正确注入。此 Issue 现已关闭，可能已通过相关 PR 解决或纳入 backlog。
    *   **链接：** https://github.com/openclaw/openclaw/issues/85030

*   **Gateway 启动挂起 (#152981)**
    *   **热度：** 15 条评论
    *   **摘要：** v2026.9.5 在 Windows 上启动时，`sidecars.model-runtime` 阶段挂起约 17 分钟后超时失败。
    *   **链接：** https://github.com/openclaw/openclaw/issues/152981

*   **Android Talk 连接断开 (#138272)**
    *   **热度：** 10 条评论
    *   **摘要：** Android 实时语音（Talk）在处理需要工具调用的任务时 consistently 抛出 "no live response owner" 错误，跨多个版本重现。
    *   **链接：** https://github.com/openclaw/openclaw/issues/138272

## 5. Bug 与稳定性
按严重程度排列的关键 Bug：

1.  **P0 - Gateway 内存泄漏 (#91588):** 长期运行导致 OOM，无直接 Fix PR 标志，需紧急关注。
2.  **P0 - Windows 更新挂起 (#146860):** `InteractiveToken` 配置下，托管更新无法获取进程身份，导致停滞。
3.  **P0 - 子进程泄漏 (#97616):** Hook/Tool 执行产生的僵尸进程累积，导致运行时退化。
4.  **P1 - CLI 启动超时 (#152981):** Windows 环境下 sidecar 初始化超时。
5.  **P1 - 压缩死锁 (#121617):** 强制自动压缩在特定上下文字节溢出情况下被误判为终端失败。
6.  **P1 - Cron 调度静默丢失 (#139215):** 自 v2026.9.1 起，部分定时任务未触发且无错误日志。
7.  **P1 - memory_search 超时 (#128140):** 工具调用持续超时，尽管底层索引正常。
8.  **P1 - Discord 插件信任检查失败 (#138342):** v2026.9.1 回归，官方插件被 `openKeyedStore` 拒绝。
9.  **P1 - SSH 会话信号问题 (#141129):** 长运行命令导致 SIGTSTP/SIGTERM，v8.x 回归。
10. **P2 - Write/Exec 参数静默丢弃 (#53408):** 长对话后工具参数为空。

**已有 Fix PR 的 Bug：**
*   原子更新回滚数据保留：#145169, #144005
*   Codex 结算测试挂起：#156868
*   备份 SQLite 性能：#156465

## 6. 功能请求与路线图信号
*   **A2A 单向分发模式 (#44309):** 用户请求添加仅分发/移交模式，避免回复 ping-pong。这是一个架构级改进请求，长期讨论中。
*   **Session Memory Hook 扩展 (#51572):** 希望 `session-memory` hook 不仅在压缩时触发，也在会话重置/修剪时触发，以支持更灵活的上下文管理。
*   **多 Azure/Teams Bot 支持 (#71058):** 请求在同一 Gateway 实例上支持多个 Teams Bot，当前配置限制为单个。
*   **Linux ARM64 官方构建 (#138279):** 用户请求提供官方的 `.deb` 和 AppImage 构建，目前 Linux 桌面主要依赖 amd64。
*   **Slack 动态提示建议 (#50481):** 利用 `assistant.threads.setSuggestedPrompts` 增强 Slack 用户体验。
*   **CLI 看门狗时间调整 (#40982):** 请求提高或移除 CLI 请求 3 分钟无输出看门狗限制，以适应长运行任务。

**预测：** `memory_search` 性能优化（#138786）和 UI 会话提及通知（#153812）较可能在下个维护版本中入库。

## 7. 用户反馈摘要
*   **痛点：**
    *   **稳定性焦虑：** 用户普遍对 Gateway 的内存管理和进程泄漏感到担忧，尤其是长时间运行的生产环境（Issue #91588, #97616）。
    *   **更新体验差：** 多个用户报告自动更新失败或更新后配置丢失（如模型目录），导致被迫手动干预（Issue #146394, #152804）。
    *   **平台差异：** Windows 用户在安装、更新和后台服务启动方面遇到更多障碍（Issue #146860, #152981, #143757）。
    *   **移动端体验：** Android Talk 和 iOS 伴侣应用在复杂交互场景下表现不稳定。
*   **满意点：**
    *   社区对 `openclaw sessions tail` 增加指标预览（PR #125905）等功能表示认可。
    *   文档和 Release Notes 的完善受到维护者奖励。

## 8. 待处理积压
以下重要 Issue 长期未得到明确解决方案，需维护者关注：

1.  **#91588 (P0, Silver):** Gateway 内存泄漏。这是影响最广的稳定性问题，尚无合并的 Fix PR。
2.  **#126360 (P1):** AgentSelectionRequiredError 日志洪水。影响多代理用户。
3.  **#97616 (P1):** 子进程泄漏导致僵尸积累。
4.  **#139215 (P1):** Cron 调度静默失败。数据完整性风险。
5.  **#138272 (P1):** Android Talk "no live response owner"。影响移动端实时语音用户。
6.  **#44309 (P2):** A2A 单向分发模式。功能缺口。
7.  **#71058 (P2):** 多 Teams Bot 支持。企业用户常见需求。

**建议：** 优先处理 P0 内存泄漏和 P1 更新/调度稳定性问题，以恢复用户信心并减少支持成本。原子更新修复 PR (#145169, #144005) 的合并应作为近期最高优先级。

---

## 横向生态对比

基于 2026-09-24 的开源项目动态，生成以下横向对比分析报告。

### 1. 生态全景

2026 年 Q3 末，个人 AI 助手生态正从“功能堆砌”转向“底层稳健性与基础设施治理”的关键转折期。**OpenClaw** 作为网关层核心，虽面临内存泄漏等生产级稳定性挑战，但社区活跃度极高；**hermes-agent** 和 **QwenPaw** 则通过高密度的 Bug 修复（特别是上下文管理和状态一致性）加速技术债务偿还。与此同时，**DeepSeek Harness** 通过 v0.1.7-rc.1 将边界拓展至浏览器自动化与本地 Computer Use，标志着 Agent 交互模式从纯文本向多模态、图形界面操作的深度演进。

### 2. 各项目活跃度对比

| 项目 | 今日 Issues | 今日 PR | 版本发布 | 健康度评估 |
| :--- | :---: | :---: | :--- | :--- |
| **OpenClaw** | 500+ | 高 (核心修复中) | v2026.9.6 | 🟡 **中等风险**：活跃度高，但 P0 级内存泄漏未解，稳定性存疑。 |
| **QwenPaw** | 34 | 24 | 无 | 🟢 **良好**：修复响应快，测试覆盖率显著提升，架构重构进行中。 |
| **hermes-agent** | 500+ | 500+ | 无 | 🟢 **良好**：极高活跃度，集中修复状态一致性与 GUI 渲染问题，进入稳健期。 |
| **AstrBot** | 10 | 12 | 无 | 🟢 **良好**：稳定迭代，快速响应 Session Lock 等关键阻塞性 Bug。 |
| **DeepSeek Harness** | N/A (Discussions 234+) | N/A | v0.1.7-rc.1 | 🟡 **中等风险**：新功能激增带来兼容性痛点（会话格式迁移、依赖解析）。 |
| **ZeroClaw** | 11 | 50 | 无 | 🟡 **中等风险**：安全问题（无人值守代理权限绕过）需紧急关注。 |
| **PicoClaw** | 1 | 2 | 无 | 🔴 **低健康度**：官方域名 TLS 证书过期，基础设施维护滞后。 |

### 3. OpenClaw 在生态中的定位

*   **角色定位**：**基础设施网关层**。OpenClaw 不仅仅是一个 Agent 运行时，更侧重于多模型接入（Gateway）、会话管理与跨平台兼容性（Windows/Linux/Android），是生态中的“路由器”和“调度器”。
*   **技术差异**：相比 ZeroClaw/PicoClaw 侧重特定渠道（WhatsApp/移动配对）或 hermes-agent 侧重单点 GUI 体验，OpenClaw 强调**集群化与稳定性**（尽管目前内存泄漏是短板）。
*   **社区规模**：Issues/PR 处理量级远超其他项目（日增 500+），表明其用户基数最大，企业级部署场景最多，因此对稳定性的容忍度最低，反馈也最为尖锐。

### 4. 共同关注的技术方向

*   **上下文与记忆管理优化**：
    *   **QwenPaw** (#7853, #7576)：工具结果裁剪失败、硬编码 context_size 导致溢出。
    *   **AstrBot** (#10208, #10092)：Token 估算不准、Base64 图片导致内存耗尽。
    *   **OpenClaw**：压缩状态过时 (#156858)、会话状态管理优化。
    *   *共性*：随着多模态输入（视频/图片）普及，现有系统的上下文计量和裁剪机制普遍存在缺陷。

*   **长会话稳定性与状态持久化**：
    *   **OpenClaw**：Gateway 内存泄漏 (#91588)、子进程泄漏 (#97616)。
    *   **AstrBot**：Session Lock 死锁 (#9600)。
    *   **hermes-agent**：state.db 一致性、会话恢复时系统提示词被重写 (#120521)。
    *   *共性*：长时间运行的 Agent 任务极易因资源泄漏或锁竞争而崩溃，是生产环境部署的主要阻碍。

*   **多模态与浏览器自动化**：
    *   **DeepSeek Harness**：新增 Playwright/Stagehand MCP，支持 Computer Use。
    *   **AstrBot**：原生视频模态支持 (#10202, #9424)。
    *   **QwenPaw**：控制台 UI 重构以支持更丰富的交互。
    *   *共性*：Agent 正从“聊天机器人”向“能操作电脑和观看视频的执行者”转变。

### 5. 差异化定位分析

*   **OpenClaw**：**全场景网关平台**。适合需要统一接入多个 LLM Provider、跨平台（桌面/移动/Web）部署的企业或个人，重点解决连接稳定性和多会话管理。
*   **hermes-agent**：**高性能桌面客户端**。侧重单机或局域网内的高质量 GUI 体验、快速迭代和本地工具调用，适合追求极致交互流畅度的开发者。
*   **QwenPaw**：**企业级协作 Hub**。强项在于多租户支持、控制台管理和插件生态（如 Codex/Claude Code 集成），适合团队协作和企业内部部署。
*   **DeepSeek Harness**：**通用 AI 工作台**。独特优势在于即将整合的浏览器自动化（Computer Use）和原生视频理解，定位为本地全能型 AI 助理。
*   **ZeroClaw/PicoClaw**：**垂直渠道专家**。ZeroClaw 深耕 WhatsApp 等 IM 渠道的自动化；PicoClaw 侧重移动端配对与轻量级接入。

### 6. 社区热度与成熟度

*   **快速迭代阶段（高活性，含风险）**：
    *   **DeepSeek Harness**：v0.1.7 大版本发布，功能爆炸式增长，伴随大量兼容性 Bug 和 UI 争议，处于“跑马圈地”期。
    *   **hermes-agent**：极高提交频率，正在密集偿还历史技术债务，修复节奏快。

*   **质量巩固阶段（稳健修复）**：
    *   **OpenClaw**：处于快速迭代后的稳定化调整期，虽然问题多，但核心团队正在集中修复 P0 级内存和更新问题。
    *   **QwenPaw**：单元测试覆盖率大幅提升，UI 重构完成，进入精细化打磨期。
    *   **AstrBot**：响应迅速且精准，主要针对已知的高优先级 Bug 进行定点清除，项目状态成熟。

*   **小众/垂直阶段**：
    *   **ZeroClaw/PicoClaw**：社区相对较小，关注点集中在特定渠道的功能完善（如 WhatsApp 投票、邮件签名等）。

### 7. 值得关注的趋势信号

1.  **“Context Budgeting” 成为核心瓶颈**：多个项目（QwenPaw, AstrBot, OpenClaw）同时暴露上下文裁剪、估算不准的问题。未来 Agent 框架的竞争点将从“能否调用大模型”转向“能否在有限 Token 内高效管理多模态上下文”。
2.  **Computer Use 与浏览器自动化标配化**：DeepSeek Harness 的 Playwright 集成和 AstrBot 的视频输入支持表明，**视觉理解**和**GUI 操作**将成为下一代个人 AI 助手的标配能力，而非可选插件。
3.  **安全性从“功能层”下沉至“架构层”**：ZeroClaw 的 `ApprovalManager` 缺失问题和 DeepSeek Harness 的 `dsh-vault` 凭据保险库需求，显示用户开始重视 Agent 自主执行时的**权限隔离**和**敏感数据保护**，这将推动安全策略从应用层下沉到运行时层。
4.  **基础设施维护是社区信心的基石**：PicoClaw 因 TLS 证书过期导致官网不可用，严重损害信誉。这警示所有开源项目：**基础设施的自动化运维（CI/CD、证书续期）是维持社区信任的底线**。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：** 2026-09-24  
**数据源：** GitHub zeroclaw-labs/zeroclaw

## 1. 今日速览
过去24小时 ZeroClaw 项目保持高活跃度，新增 11 个 Issues 和 50 个 PR（其中 47 个待合并）。尽管无新版本发布，但核心安全性与稳定性得到显著加强，特别是针对 shell 命令执行的高危漏洞修复（#11061）以及WhatsApp渠道的多项关键Bug修复。社区贡献者积极参与，涵盖了从底层安全策略到上层渠道体验的多个层面，项目整体向更健壮的方向演进。

## 2. 版本发布
*   **无新版本发布。**

## 3. 项目进展
今日有 **3 个 PR 已合并/关闭**，主要推进了以下改进：
*   **安全加固 (#11061)**: 修复了 `validate_command_execution_for_shell` 的逻辑缺陷，确保即使命令在 allowlist 中，高风险操作（如 `rm -rf`）也会被正确拦截，解决了潜在的严重安全风险。
*   **WhatsApp 渠道功能完善 (#11057)**: 修复了 `suppress_voice` 标志被忽略的问题，确保 TTS 发送前能正确检查该标志，提升了语音回复的控制精度。
*   **WhatsApp 投票功能支持 (#11088)**: 实现了读取 WhatsApp 投票返回的选票数据，并将其转换为 `[choice]` 消息，填补了原生投票功能闭环的关键缺失。

此外，大量 PR（如 #10172, #10084, #9809 等）仍在等待审查和合并，预计下一版本将包含多项重要增强。

## 4. 社区热点
以下是今日新增或活跃讨论的热点 Issues：

*   **[Bug] Unattended agent turns 缺乏 ApprovalManager (#10968)**  
    链接: https://github.com/zeroclaw-labs/zeroclaw/issues/10968  
    **分析**: 这是一个严重的 P1 安全问题。非交互式代理循环（cron、heartbeat、SOP）未构建 `ApprovalManager`，导致风险配置文件中的工具批准策略失效。这影响了自动化工具的安全边界，亟需维护者关注。
*   **[Bug] Dashboard-started turns 无法访问会话绑定渠道 (#10985)**  
    链接: https://github.com/zeroclaw-labs/zeroclaw/issues/10985  
    **分析**: P1 级 Bug，Dashboard 启动的 turn 会创建全新的渠道实例，导致依赖会话状态的渠道工具（如 WhatsApp）无法正常工作。直接影响用户体验和渠道功能完整性。
*   **[Feature] Render thematic breaks and setext headings for WhatsApp (#11052)**  
    链接: https://github.com/zeroclaw-labs/zeroclaw/issues/11052  
    **分析**: 用户希望 WhatsApp 渠道能正确处理 Markdown 中的分隔线和标题格式，目前原始 Markdown 符号会被直接发送。这是一个提升消息可读性的体验优化请求。
*   **[RFC] search_routes — hint-based provider routing (#11074)**  
    链接: https://github.com/zeroclaw-labs/zeroclaw/issues/11074  
    **分析**: 提出参照 `model_routes` 的设计，为 `web_search_tool` 添加基于提示的路由功能，允许将不同类型的搜索请求分发到不同的搜索引擎提供商，增加了配置的灵活性。

## 5. Bug 与稳定性
今日报告的 Bug 主要集中在渠道功能和安全性上：

| 问题 ID | 标题摘要 | 严重程度 | 状态 | 关联 Fix PR |
| :--- | :--- | :--- | :--- | :--- |
| #10968 | 无人值守代理 turn 无 ApprovalManager，风险策略失效 | **S0 (High Risk)** | Open | 暂无 |
| #10985 | Dashboard turn 获取新渠道实例，无法访问会话绑定渠道 | **S2 (High Risk)** | Open | #10986 (In Progress) |
| #11059 | WhatsApp Web 忽略 `force_voice`，无法路由到语音 | S2 (Medium) | Open | 暂无 |
| #10797 | Markdown memory backend 并发写入丢失数据 | **S0 (High Risk)** | Open | 暂无 |
| #11022 | WhatsApp Web 忽略 `suppress_voice` 发送 TTS | S2 (Medium) | Open | **#11057 (已合并)** |
| #11055 | Daemon 未注册 channel-map factory，webhook/cron/SOP 无渠道 | Medium | Open | 暂无 |

**分析**: 存在多个高风险（P1/S0）Bug，特别是 #10968（安全策略绕过）和 #10797（数据丢失），建议优先处理。#10985 的修复 PR #10986 已在进行中，预计将解决 Dashboard 渠道访问问题。

## 6. 功能请求与路线图信号
*   **Antigravity CLI 支持 (#11075 / #11076)**: 用户请求添加 `agy_cli` 工具以支持 Google 的 Antigravity CLI，这与现有的 `codex_cli`, `claude_code` 等工具定位一致，符合项目扩展编码助手生态的路线。
*   **搜索路由 (#11074)**: 提案为 `web_search_tool` 增加 hint-based 路由，类似于模型路由，旨在提供更细粒度的搜索提供商控制，属于架构灵活性增强。
*   **WhatsApp 原生 Poll 速率限制 (#11050)**: 请求将原生 Poll 纳入每接收者的出站速率限制队列，以避免突发流量，这是对现有渠道功能的精细化完善。

## 7. 用户反馈摘要
*   **痛点**: 用户报告了 WhatsApp Web 渠道在语音回复控制（`suppress_voice`, `force_voice`）和格式渲染（Markdown 标题/分隔线）方面的不足，导致自动化回复体验不佳。
*   **安全感**: 无人值守代理模式下安全策略失效（#10968）和数据存储并发冲突（#10797）引发了对系统稳定性和数据安全性的担忧。
*   **便利性**: Dashboard 启动的 turn 无法正确使用已配对的 WhatsApp 会话（#10985），影响了通过 Web 界面进行多渠道互动的便利性。

## 8. 待处理积压
*   **#10968 [Bug]: Unattended agent turns 缺乏 ApprovalManager**: 高危安全问题，长期未关闭，需立即关注。
*   **#10797 [Bug]: markdown memory backend 并发写入数据丢失**: 高危数据完整性问题，需尽快修复。
*   **#11055 [Bug]: Daemon 未注册 channel-map factory**: 导致 daemon 模式下大部分渠道工具不可用，影响范围大。
*   **#10814 [Tracker]: Release efficiency and repeatable publication**: 发布效率追踪，虽非 Bug 但影响开发流程。

---
*报告生成时间: 2026-09-24*  
*分析师: AI Agent*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：** 2026-09-24  
**仓库：** [sipeed/picoclaw](https://github.com/sipeed/picoclaw)  
**分析师：** Agnes

## 1. 今日速览
PicoClaw 近期活跃度维持正常水平，过去24小时内共有 3 条社区更新（1 Issue + 2 PR）。项目面临一项严重的生产环境问题：官方域名 `picoclaw.io` 的 TLS 证书已过期，导致官网及关联服务对所有浏览器不可访问，这直接影响新用户的获取与项目信誉。与此同时，社区在功能扩展上有所推进，Keenable 搜索提供者功能已进入合并审核阶段。整体项目健康度因基础设施故障而亮起红灯，需维护者优先处理证书续签问题。

## 2. 版本发布
*   **今日无新版本发布。**

## 3. 项目进展
*   **PR #3344 (已合并)**: 添加了 "Build Remote Agent" 手机配对适配器，支持通过 `gbr/1` 协议让移动设备作为远程代理的旁观者。此更新扩展了项目的跨设备协同能力，允许用户通过手机查看桌面代理的运行状态。
*   **PR #3370 (待合并)**: 新增 Keenable 作为 `web_search` 工具提供商。该 PR 亮点在于无需 API Key 即可在新鲜安装后立即使用（通过公共端点），降低了用户配置门槛，丰富了项目的搜索生态。

## 4. 社区热点
*   **Issue #3377 [CRITICAL] TLS certificate for picoclaw.io expired**
    *   **链接**: https://github.com/sipeed/picoclaw/issues/3377
    *   **热度分析**: 这是今日最受关注的问题，被标记为 `CRITICAL`。作者 @dimonb 指出，由于证书于 2026-09-10 过期，所有访问官方域名的用户均遭遇连接拒绝。该问题已引起社区注意（1 👍, 2 评论），反映了用户对官方服务可用性的强烈关切。长期停机可能损害项目专业形象。

## 5. Bug 与稳定性
*   **Issue #3377 [CRITICAL] 网站服务中断**
    *   **问题描述**: 非代码逻辑 Bug，而是基础设施故障。HTTPS 证书过期导致官网完全不可用。
    *   **状态**: 未修复，处于开放状态。
    *   **影响**: 阻碍所有通过域名访问的用户，包括潜在的新用户和文档查阅者。建议立即安排运维介入以重新签发或部署证书。

## 6. 功能请求与路线图信号
*   **Web Search 扩展**: **PR #3370** 显示社区对增加更多 `web_search` 提供商有明确需求。Keenable 的 PR 强调 "无 API Key 即可用" 的便捷性，暗示未来路线图应倾向于降低第三方服务集成的配置复杂度，提升开箱即用体验。
*   **远程监控/配对**: **PR #3344** 的合并表明项目正在向 "远程代理观看" 场景演进，未来可能出现更多关于设备配对协议或跨平台协作的功能。

## 7. 用户反馈摘要
*   **痛点**: 官方基础设施维护滞后。用户无法访问 `picoclaw.io`，这通常被视作项目活跃度和专业性的第一指标。证书过期近两周未被修复，引发了用户对项目长期维护承诺的担忧。
*   **满意点**: 社区贡献者积极补充功能（如 Keenable 搜索、GBR 配对），表明开发者生态依然活跃，且关注用户体验（如无 Key 调用、QR 码配对）。

## 8. 待处理积压
*   **Issue #3377**: 作为最高优先级的阻塞性问题，需维护者在 24 小时内响应并解决证书问题。
*   **PR #3370**: 虽已提交超过一周，但尚未合并。建议审阅者尽快完成代码审查，以释放新的搜索功能。

---
*报告生成时间: 2026-09-24 | 数据来源: GitHub API*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：** 2026-09-24
**数据来源：** GitHub (agentscope-ai/qwenpaw)

## 1. 今日速览
过去24小时 QwenPaw 社区活跃度维持高位，Issue 更新 34 条，PR 更新 24 条，呈现“高反馈、快响应”的健康态势。今日无新版本发布，但核心代码库经历了多项关键修复（特别是上下文管理、流式处理和备份机制）以及控制台 UI 的重大重构。社区对多租户 Hub 后续规划的讨论热烈，同时暴露了飞书渠道稳定性及长会话上下文裁剪等典型的技术挑战。

## 2. 版本发布
**无新版本发布。**
当前最新相关版本：Desktop `v2.2.2-beta.2` / Backend `v2.2.2b2`。

## 3. 项目进展
今日合并/关闭的重要 PR 主要集中在稳定性修复、测试覆盖提升和 UI/UX 优化：

*   **架构与控制平面重构 (PR #7874)**: `feat(pawapp): redesign the SDK and app control plane`。这是今日最大的功能推进，解决了 PawApps 缺乏统一边界的问题，实现了更安全的主聊天与工作区隔离，支持持久化任务所有权和幂等调度，为未来更复杂的插件生态奠定基础。
*   **单元测试覆盖冲刺 (PR #7941)**: 新增 47 个测试文件，2720 个用例，将 `src/qwenpaw` 语句覆盖率从 70.51% 提升至 **73.79%** (+3.28pp)。这表明团队正在着力夯实底层稳定性。
*   **依赖许可证合规 (PR #7927)**: `fix(web): replace html2text with markdownify`。将 GPL-3.0 的 `html2text` 替换为 MIT 协议的 `markdownify`，消除了 `web_fetch` 功能的潜在许可证风险，对商业化部署至关重要。
*   **UI 交互优化 (PR #7956, #7940)**: 优化了控制台设置页流程、侧边栏交互及工具卡片展示，支持多语言本地化，并解决了配置难找、动画反馈不连贯等用户体验痛点。
*   **错误处理精细化 (PR #7563, #7951, #7950)**: 区分了模型错误与传输故障，修复了未读配置被误判为“无模型选择”的逻辑漏洞，提升了前端报错的准确性。

## 4. 社区热点
以下 Issue 讨论最活跃，反映了用户最关心的方向：

*   **[Discussion] QwenPaw Hub 多租户版后续规划 (Issue #7318)**
    *   **数据**: 32 条评论，4 个 👍
    *   **分析**: 这是今日热度最高的话题。随着 2.2.0 多租户版发布，社区迫切希望了解 Roadmap 下一步重点。这显示了从“个人助手”向“团队协作”转型的用户需求强烈，维护者的回应将直接影响企业级用户的留存。
*   **[Bug] ToolResultPruner 跳过媒体块导致上下文撑爆 (Issue #7853)**
    *   **数据**: 8 条评论
    *   **分析**: 揭示了 `view_image` 等工具在长会话中因 base64 数据不被裁剪而导致 CONTEXT_UNFIT 的严重 Bug。这是典型的“功能可用但性能陷阱”问题，影响使用深度工具的用户。
*   **[Bug] RetryChatModel 硬编码 context_size 导致溢出 (Issue #7576)**
    *   **数据**: 8 条评论
    *   **分析**: v2.1.0-v2.2.0 全版本存在此问题，硬编码 32768 导致小上下文模型无法正常工作。这是一个破坏性 Bug，影响广泛。
*   **[Feature] 基于 2.x 的 A2A 支持计划 (Issue #7484)**
    *   **数据**: 5 条评论
    *   **分析**: 用户关注 Agent-to-Agent (A2A) 协议的支持时间表。结合 #7318 的多租户讨论，可以看出社区对 Agent 间协作能力的期待。

## 5. Bug 与稳定性
按严重程度排列的今日关键问题：

| 严重度 | Issue/PR | 描述 | Fix 状态 |
| :--- | :--- | :--- | :--- |
| **P0** | **#7853** | ToolResultPruner 忽略 `type="data"` 块，导致 base64 图片无限累积撑爆上下文 | 待修复 |
| **P0** | **#7576** | RetryChatModel 硬编码 32768 context_size，导致所有模型在非预期上下文窗口下运行 | 待修复 |
| **P1** | **#7534** | 飞书会话 queue consumer 卡死，新消息无法建立消费者，会话静默无响应 | 待修复 |
| **P1** | **#7836** | Scroll evication 策略在工具密集型任务中丢弃用户 Turn，导致上下文不一致 | **已有 PR #7872** |
| **P1** | **#7947** | `send_file_to_user` 在 Console 中无法渲染文件卡片（前端 artifact guard 逻辑错误） | 待修复 |
| **P2** | **#7628** | Context compaction 触发预算计算未包含 provider request 完整开销 | 待修复 |
| **P2** | **#7856** | `qwenpaw-pet` 插件 0.1.1 移除 `actor` 参数，破坏工具审批流程 | 待修复 |
| **P2** | **#7715** | Daily Paper 插件在 arxiv 不可达时静默失败，错误信息误导性强 | 待修复 |

**注意**: PR #7872 已针对 #7836 提出修复，需关注合并进度。

## 6. 功能请求与路线图信号
*   **Agent 自主上下文管理 (Issue #7733)**: 用户希望 Agent 能参与上下文淘汰决策，而非仅由 token 阈值触发。这与当前 Scroll 策略的开发方向一致，可能纳入后续演进。
*   **每 Agent/会话级 `reasoning_effort` 配置 (Issue #7062, 已关闭)**: 虽然已关闭，但诉求明确：不同角色（快速问答 vs 深度研究）需要不同的思考深度。这暗示未来配置系统将向更细粒度的 Agent 级设置发展。
*   **A2A/MCP 统一 Driver 支持 (Issue #7484)**: 用户确认 MCP 已支持，追问 A2A。结合 #7318 的多租户讨论，**“多 Agent 协作”与“企业级托管”** 是明确的近期路线图重点。
*   **控制台多标签终端 (PR #7861)**: 新增 authenticated multi-tab chat terminal，显示团队正在增强 Console 的开发者和高级用户使用体验。
*   **持久化分页转录历史 (PR #7931)**: 增加 per-session SQLite 存储，支持向上分页加载，改善了长会话的历史回溯体验。

## 7. 用户反馈摘要
*   **痛点**:
    *   **上下文管理黑洞**: 用户在使用图像查看 (`view_image`) 和复杂工具链时，频繁遭遇上下文溢出且难以排查（#7853, #7836）。
    *   **飞书渠道稳定性**: WebSocket 连接断开后无自动重连（#2335, #3035），以及 consumer 卡死问题（#7534）是长期困扰飞书用户的 P0 级问题。
    *   **配置与错误信息不明确**: 未读配置文件被误报为“模型未配置”（#7951），Daily Paper 插件失败原因被掩盖（#7715），增加了运维排查成本。
    *   **UI/UX 细节**: 深色模式配色刺眼（#2200），工具用途描述缺失，设置页难找（#7956 已部分解决）。
*   **满意点**:
    *   **本地化与多语言**: 工具页面已支持中、英、日、俄等 7 种语言，提升了非英语用户的使用体验（#7956）。
    *   **测试覆盖提升**: 用户和贡献者对单元测试覆盖率的提升表示认可，认为这有助于长期稳定性（#7941）。
    *   **多租户 Hub**: 2.2.0 的发布得到了社区关注，用户期待后续功能。

## 8. 待处理积压
*   **Issue #7534 (飞书 Consumer 卡死)**: 这是一个严重的生产环境问题，可能导致会话永久失效，且无自恢复机制，建议优先处理。
*   **Issue #7576 (RetryChatModel 硬编码)**: 影响所有版本，是一个基础性的配置错误，应尽快修复以释放小上下文模型的正确能力。
*   **Issue #7853 (ToolResultPruner 媒体块漏裁)**: 随着 Agent 使用图像工具的频率增加，此 Bug 的影响面将持续扩大，需尽快修复。
*   **Issue #7318 (Hub 后续规划)**: 作为社区最高热的讨论，建议维护者在 Issue 评论区给出明确的 Roadmap 时间线或优先级说明，以稳定社区预期。

---
**报告生成人:** Agnes (Sapiens AI)
**分析时间:** 2026-09-24

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：** 2026-09-24  
**数据来源：** GitHub Issues & PRs (过去 24h)

## 1. 今日速览
今日 hermes-agent 社区活跃度极高，24小时内处理了 500 条 Issue 和 500 条 PR，显示出强劲的开发与测试节奏。**核心亮点**在于对 `state.db` 会话状态一致性、GUI 渲染重复/错位以及工具调用上下文丢失等关键稳定性的集中修复。多个 P0/P1 级别的 Bug 已合并或通过 PR 修复，项目正从“功能扩展”转向“底层稳健性强化”阶段。无新版本发布，但代码库质量显著改善。

## 2. 版本发布
**无新版本发布。**

## 3. 项目进展
今日重点修复了会话持久化、状态管理和跨模块交互的多个深层缺陷，具体包括：

*   **会话状态与压缩保护**：
    *   **#120521**：修复了会话恢复和 `/compress` 时系统提示词被意外重写的问题，确保 workspace snapshot 在会话期间保持冻结状态。
    *   **#120677**：阻止压缩产生的上下文片段被复制到具有副作用的工具调用中，防止模型看到不应持久的状态。
    *   **#120772**：修复压缩摘要中携带下一条指令的安全隐患，确保摘要仅作为上下文回顾而非指令注入。
    *   **#120534**：解决了在写锁持有状态下，因搜索索引损坏导致消息丢失的问题（Fail-open 机制）。
*   **GUI 与终端交互修复**：
    *   **#120306**：修复了 TUI/Desktop 在工具执行中途退出时，前台命令进程树未清理导致的僵尸进程问题。
    *   **#110462**：修复了技能视图加载旧版扁平 Markdown 时的冲突，确保 `skill_view` 正确解析包内技能。
    *   **#110744**：修复了中断消息携带图片附件时被静默丢弃的 Bug。
*   **模型路由与 Provider**：
    *   **#120295**：修复了 `/model --provider` 命令被别名覆盖的问题，确保显式指定的 Provider 优先级最高。
    *   **#110816**：修复了 Z.AI 等 Provider 通过 `model_extra` 传递流式推理内容时丢失 `reasoning_content` 的问题。
    *   **#120627**：修复了命名自定义 Provider 的标题升级竞争条件。
*   **群组房间逻辑**：
    *   **#120318**：修复了群组房间中成员 Provider 报错时错误回显“request not processed”并循环的问题，现正确展示错误原因。

**整体评估**：项目正在系统性解决长期存在的状态一致性和客户端渲染稳定性问题，技术债务偿还进度显著。

## 4. 社区热点
以下 Issue 讨论激烈，反映了用户对架构演进和关键痛点的高度关注：

*   **[OPEN] #88584 - Automated Nous integration is blocked** (136 评论)
    *   *热点原因*：自动化集成工作流冲突，影响持续集成流程，高评论数表明社区对构建稳定性高度敏感。
*   **[OPEN] #97681 - Let Bots collaborate across gateways** (30 评论, 👍 2)
    *   *热点原因*：跨网关协作功能请求，涉及多设备、多模型协同的高级使用场景，愿景诱人但实现复杂。
*   **[OPEN] #119003 - Kanban dispatch destroys real task rows** (29 评论)
    *   *热点原因*：多路复用网关下的严重数据丢失 Bug，直接影响任务管理可靠性，用户情绪较急切。
*   **[OPEN] #18715 - Support remote Hermes agent with local tool execution** (20 评论, 👍 34)
    *   *热点原因*：高支持率的功能请求，旨在分离控制平面与执行平面，符合云原生和边缘计算趋势。
*   **[OPEN] #95163 - Opt-in backend-hosted group rooms** (16 评论)
    *   *热点原因*：改进群组聊天的后端架构，减少对 Desktop 渲染器的依赖，提升可靠性和可扩展性。
*   **[CLOSED] #117867 - Desktop newest turn vanishes at completion** (18 评论)
    *   *热点原因*：已关闭的严重 UI Bug，用户在长时间任务后遇到消息消失，反映了 GUI 渲染层的脆弱性。

## 5. Bug 与稳定性
今日报告及修复了多个关键 Bug，按严重程度排列：

| 级别 | Issue/PR | 描述 | 状态 |
|------|----------|------|------|
| **P0** | #120521 | 会话恢复/压缩重写系统提示词 | ✅ 已合并 (PR) |
| **P0** | #120534 | 写锁下搜索索引损坏导致消息丢失 | ✅ 已合并 (PR) |
| **P1** | #119003 | Kanban 任务行被静默替换为无效占位符 | 🔄 开放 (无 Fix) |
| **P1** | #120318 | 群组房间成员报错时循环错误消息 | ✅ 已合并 (PR) |
| **P2** | #97065 | Keet gateway setup TypeError | 🔄 开放 |
| **P2** | #120306 | 退出时工具进程树未清理 | ✅ 已合并 (PR) |
| **P2** | #120772 | 压缩摘要携带后续指令 | ✅ 已合并 (PR) |
| **P2** | #120627 | 自定义 Provider 标题升级竞争 | ✅ 已合并 (PR) |
| **P3** | #120295 | `/model --provider` 被别名覆盖 | ✅ 已合并 (PR) |

**稳定性评估**：核心会话状态和数据持久化层面的 Bug 得到集中修复，但 Kanban 多路复用网关的数据完整性问题 (#119003) 仍需关注。

## 6. 功能请求与路线图信号
*   **跨网关 Bot 协作 (#97681)**：用户希望打破设备限制，实现 Bots 在不同网关间协作。这与 #95163 (后端托管群组房间) 形成呼应，暗示路线图可能向**去中心化、多节点协作**架构演进。
*   **远程 Agent + 本地工具执行 (#18715)**：高热度需求，分离控制与执行。若实现，将极大提升企业部署灵活性。
*   **HTML 邮件支持 (#11941)**：尽管是低优先级 (P3)，但 Markdown 邮件渲染需求持续，反映用户对沟通质量的要求提升。
*   **批量 Package Manager (#102765)**：统一工具安装、依赖准备和自包含包构建，预示未来可能在依赖管理和分发标准化上投入更多精力。

## 7. 用户反馈摘要
*   **痛点**：
    *   **GUI 渲染不稳定**：多条 Issue (#117867, #71733, #118002, #118482) 指向 Desktop 端消息消失、顺序错乱、滚动异常，严重影响长会话体验。
    *   **数据丢失恐惧**：Kanban 任务行被替换 (#119003)、state.db 损坏 (#100896) 引发用户对数据完整性的强烈担忧。
    *   **跨设备协作困难**：用户希望在不打开 Desktop 的情况下，让不同设备的 Bot 协同工作 (#97681)。
*   **满意点**：
    *   快速响应的 Bug 修复（如 #120521, #120306）提升了专业用户信心。
    *   对 Provider 兼容性的持续改进（如 Z.AI 推理内容保留 #110816）受到技术用户认可。
*   **情绪**：整体积极，但存在对“核心稳定性”的焦虑，尤其是涉及数据库和长时间运行的会话。

## 8. 待处理积压
*   **[P1] #119003 - Kanban dispatch/reconcile 数据丢失**：高严重性 Bug，尚无合并的 Fix PR，需优先处理。
*   **[P2] #97065 - Keet gateway setup 崩溃**：简单配置问题导致的崩溃，应易于修复。
*   **[OPEN] #18715 - 远程 Agent 支持**：长期需求，影响架构设计，需明确路线图。
*   **[OPEN] #88584 - 自动化集成阻塞**：CI/CD 相关问题，影响开发效率，需技术负责人介入。

**建议**：维护者应优先关注 #119003 和 #88584，前者关乎数据安全性，后者关乎开发流程顺畅性。同时，持续监控 GUI 渲染相关的 Issue，这是用户体验的关键短板。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期**：2026-09-24  
**分析周期**：过去 24 小时

---

## 1. 今日速览

AstrBot 项目今日保持**高活跃度**，共产生 10 个新 Issue 和 12 个 PR，显示社区对 v4.28.1 版本的关注主要集中在稳定性修复与新模态支持上。**核心亮点**是开发者迅速响应了近期发现的 Session Lock 死锁问题（Fix #9600）以及知识图谱时区 Bug（Fix #10205）。视频输入功能得到显著推进，新增原生视频模态支持及 MiniMax 适配。虽然无新版本发布，但代码库正在快速收敛多个关键缺陷，项目整体健康度良好，技术债务清理力度加大。

---

## 2. 版本发布

**无新版本发布**。

---

## 3. 项目进展

今日 PR 更新中，**1 个已合并/关闭**，**11 个待合并**。

### ✅ 已关闭/合并的重要修复
*   **[PR #10200] 修复插件 README 相对路径跳转问题** ([链接](https://github.com/AstrBotDevs/AstrBot/pull/10200))
    *   **贡献者**: @eeeggplant
    *   **影响**: 解决了 WebUI 中插件文档内相对链接（如 `DEVELOPMENT.md`）失效的问题，提升了插件生态的用户体验。

### 🔶 待合并的关键推进
*   **[PR #10209] 修复 Session Lock 死锁导致的处理延迟** ([链接](https://github.com/AstrBotDevs/AstrBot/pull/10209))
    *   **贡献者**: @lorenzozanee
    *   **价值**: 针对 Issue #9600 的核心修复。将文件附件下载移至会话锁获取**之前**，解决了因网络延迟导致锁持有时间过长、阻塞后续同会话处理的问题。
*   **[PR #10206] 修复知识库写入的时区 Bug** ([链接](https://github.com/AstrBotDevs/AstrBot/pull/10206))
    *   **贡献者**: @wcqqq1214
    *   **价值**: 适配 SQLModel 0.0.45 的强制 UTC 时区要求，修复了 #10205 中知识库文档写入失败的问题。
*   **[PR #10203] 修复 EventBus 队列任务计数泄漏** ([链接](https://github.com/AstrBotDevs/AstrBot/pull/10203))
    *   **贡献者**: @icyaaaww
    *   **价值**: 修复 `asyncio.Queue` 未调用 `task_done()` 导致的潜在阻塞风险，提升系统长期运行的稳定性。
*   **[PR #10153] 新增 StepFun 模型预设** ([链接](https://github.com/AstrBotDevs/AstrBot/pull/10153))
    *   **价值**: 降低用户使用 StepFun 平台接口的配置门槛，完善 Provider 生态。

---

## 4. 社区热点

今日讨论最激烈的议题集中在 **LLM 上下文管理** 与 **多模态输入能力**。

1.  **上下文压缩与 Token 估算准确性**
    *   **Issue #10208**: 用户报告 `EstimateTokenCounter` 严重低估 Emoji/非 CJK 文本的 Token 量，导致上下文压缩后仍超出模型上限（400错误）([链接](https://github.com/AstrBotDevs/AstrBot/issues/10208))。
    *   **Issue #10092**: 历史消息中的 Base64 图片导致内存耗尽，且纯文本消息也开始失败 ([链接](https://github.com/AstrBotDevs/AstrBot/issues/10092))。
    *   **分析**: 这反映了长对话场景下，系统对多模态数据（图片、视频）和特殊字符的计量存在缺陷，用户迫切需求更精准的上下文管理。

2.  **视频输入支持**
    *   **Issue #8048** & **PR #10202** & **PR #9424**: 多个 Issue 和 PR 集中讨论视频输入 ([链接1](https://github.com/AstrBotDevs/AstrBot/issues/8048), [链接2](https://github.com/AstrBotDevs/AstrBot/pull/10202), [链接3](https://github.com/AstrBotDevs/AstrBot/pull/9424))。
    *   **分析**: 用户希望 LLM 能直接理解视频内容而非仅作为文件下载。PR #10202 实现了原生视频模态传输，PR #9424 专门针对 MiniMax 做了适配，显示出维护者对这一需求的积极回应。

3.  **多 Bot 隔离配置**
    *   **Issue #9968**: 用户请求插件支持按 Bot 实例隔离配置（不同 Bot 使用不同参数）([链接](https://github.com/AstrBotDevs/AstrBot/issues/9968))。
    *   **分析**: 随着 AstrBot 多实例部署场景增加，精细化的配置管理成为进阶用户的核心诉求。

---

## 5. Bug 与稳定性

| 严重程度 | Issue ID | 描述 | Fix PR |
| :--- | :--- | :--- | :--- |
| **高** | #10205 | 知识库写入失败（SQLModel 时区错误），导致 RAG 功能不可用 | ✅ [#10206](https://github.com/AstrBotDevs/AstrBot/pull/10206) |
| **高** | #9600 | 会话锁异常，发送文件后会话卡死直到超时释放 | ✅ [#10209](https://github.com/AstrBotDevs/AstrBot/pull/10209) |
| **中** | #10092 | 内存错误 (MemoryError)，Base64 图片导致上下文膨胀无法处理 | 无 |
| **中** | #10208 | Token 估算不准，压缩复检逻辑缺陷，导致请求被拒 | 无 |
| **低** | #9950 | 插件 README 相对路径跳转错误 | ✅ [#10200](https://github.com/AstrBotDevs/AstrBot/pull/10200) |
| **低** | #10165 | Cloud 插件市场前端版本列表刷新后消失 | 无 |

---

## 6. 功能请求与路线图信号

1.  **手动上下文压缩** ([PR #9795](https://github.com/AstrBotDevs/AstrBot/pull/9795)): 用户希望引入 `/compact` 命令，允许手动触发 LLM 压缩，而非仅依赖自动阈值。这暗示了未来版本可能增加更多细粒度的上下文控制选项。
2.  **视频输入正式化** ([PR #10202](https://github.com/AstrBotDevs/AstrBot/pull/10202), [PR #9424](https://github.com/AstrBotDevs/AstrBot/pull/9424)): 从“沙盒处理文件”转向“原生模态输入”，预计下一版本将正式支持主流多模态模型的视频理解能力。
3.  **Event Log 后端迁移** ([PR #10077](https://github.com/AstrBotDevs/AstrBot/pull/10077)): 这是一个较大的重构（size:L），旨在改进对话存储机制，预示着项目正在为更复杂的日志审计和状态恢复功能打基础。

---

## 7. 用户反馈摘要

*   **痛点**: 用户普遍反映在长对话或多模态交互中，系统的**资源管理（内存、锁、Token 计数）**存在明显短板。特别是发送文件或图片后出现的“假死”或超时现象，严重影响了交互体验。
*   **满意度**: 用户对 **StepFun** 等新厂商支持的添加表示欢迎（[#10153](https://github.com/AstrBotDevs/AstrBot/pull/10153)），同时也认可项目对 **视频输入** 这一前沿需求的快速响应。
*   **建议**: 有用户建议在插件配置界面增加**图片预览功能**以方便排查上传问题（[Issue #10207](https://github.com/AstrBotDevs/AstrBot/issues/10207)），这是一个提升运维效率的小而美的 UX 改进点。

---

## 8. 待处理积压

以下 Issue 已存在较长时间或热度较高，建议维护者优先关注：

1.  **Issue #9968: 插件按 Bot 隔离配置** ([链接](https://github.com/AstrBotDevs/AstrBot/issues/9968))
    *   *创建时间*: 2026-09-07。多实例部署用户的刚需，目前尚无直接解决方案。
2.  **Issue #10092: 历史 Base64 图片导致内存耗尽** ([链接](https://github.com/AstrBotDevs/AstrBot/issues/10092))
    *   *创建时间*: 2026-09-15。与 Issue #10208 类似，都是上下文管理问题的体现，需系统性优化。
3.  **Issue #8048: 视频输入支持** ([链接](https://github.com/AstrBotDevs/AstrBot/issues/8048))
    *   *创建时间*: 2026-05-07。虽然已有 PR 推进，但该 Issue 是需求源头，合并相关 PR 后应考虑关闭或关联。
4.  **Issue #10165: Cloud 插件市场版本显示异常** ([链接](https://github.com/AstrBotDevs/AstrBot/issues/10165))
    *   *创建时间*: 2026-09-21。影响插件开发者体验，需排查前端状态同步逻辑。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：** 2026-09-24  
**分析对象：** [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)  
**数据周期：** 过去 24 小时

---

## 1. 今日速览

DeepSeek Harness (DSH) 在过去 24 小时内保持了极高的社区活跃度， Discussions 新增 **234 条**，显示出用户群对 v0.1.7 版本的高度关注与热切期待。今日核心事件为 **v0.1.7-rc.1** 候选版本的发布，该版本大幅扩展了浏览器自动化（Playwright/Stagehand）、MCP 协议支持（v2）及本地 Agent 操作能力。社区讨论焦点集中在插件生态安全（加密凭据保险库）、长上下文下的模型稳定性以及从早期版本升级的兼容性痛点上。整体项目健康度良好，正处于从 alpha 向 stable 过渡的关键迭代期。

---

## 2. 版本发布

### **v0.1.7-rc.1 发布**
这是 0.1.7 系列的首个候选版本，汇总了自 v0.1.5-rc.3 以来的主要变更。作为合并摘要，本次发版显著增强了 DSH 作为本地 AI 工作台的综合能力。

**核心新功能：**
*   **浏览器与 Computer Use 实验性功能：** 新增 Playwright MCP、Chrome DevTools MCP 及 Stagehand 后端；支持通过 Cua Driver MCP 或原生驱动进行本机操作和截图，标志着 DSH 向通用 Computer Use 代理迈出重要一步。
*   **MCP 协议升级：** 升级至官方 SDK v2，支持协议协商、工具分页及未提供工具的服务器处理。
*   **Headless 模式增强：** 支持从 stdin 接收任务、`--session-id` 续接会话及 `--json` 逐行输出事件，提升自动化集成能力。
*   **Web UI 深度优化：**
    *   新增终端（多标签、Shell 选择、刷新恢复）。
    *   管理会话归档（置顶、筛选、恢复）。
    *   插件管理页支持运行时启停/卸载。
    *   侧边栏预览支持 Office 套件（Excel 公式/单元格）、Word、PPT 及 CSV/TSV。
*   **文件与差异审阅：** 会话文件改动支持逐行/分栏对比、高亮同步滚动及悬停预览，优化了明暗主题配色。

**体验优化：**
*   统一图片/PDF/Office 预览缩放控件，支持捏合缩放重绘。
*   适配 DeepSeek V4.1，调整图片尺寸与 Token 估算逻辑。
*   插件安装源智能化：自动选择官方/镜像/自定义源，GitHub 失败时自动提示镜像。

**破坏性变更/迁移注意事项：**
*   **MCP SDK v2 升级：** 若用户有自研 MCP 服务器，需确保兼容 v2 协议（如工具分页机制）。
*   **会话文件格式：** 建议用户检查旧版会话（特别是 v0.1.5-rc.1 之前创建的）在 rc.1 中的可读性，社区已反馈部分 v0 格式迁移存在障碍（见 Bug 章节）。
*   **Headless 参数：** `--session-id` 等新 CLI 参数新增，旧脚本需注意参数冲突。

---

## 3. 项目进展

本次 v0.1.7-rc.1 的发布相当于合并了数十项功能与修复。基于 Changelog 与社区讨论映射，主要推进如下：

*   **浏览器自动化闭环：** 通过引入 Playwright/Stagehand/Cua Driver，DSH 具备了从“文本/文件处理”向“图形界面操作”扩展的能力，这是向通用 AI 助手演进的关键一步。
*   **插件生态规范化：** 插件管理页的完善（安装/配置/启停/卸载）及插件源智能选择机制，表明团队正在建立更健康的第三方插件生态体系。
*   **开发者体验 (DX) 提升：** Headless 模式支持 stdin/json 输出，以及侧边栏终端的多标签/恢复功能，显著提升了资深用户的自动化工作流体验。
*   **性能与兼容性：** 针对 DeepSeek V4.1 的图片缩放和 Token 估算调整，确保了与最新模型能力的对齐。

---

## 4. 社区热点

以下 Discussion 在过去 24 小时内评论数最高，反映了社区最核心的关切：

| 排名 | 类型 | 标题 | 评论数 | 链接 | 核心诉求分析 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | [Ideas] | **dsh-vault — 加密凭据保险库插件** | 251 | [Link](https://github.com/deepseek-ai/deepseek-harness/discussions/1457) | 用户对 AI 代理访问敏感凭据（SSH, API Keys, TOTP）的安全性有极高需求。该插件利用 Node 内置 crypto 实现零外部依赖加密，回应了企业级/高阶用户的核心痛点。 |
| 2 | [Q&A] | **Bug：`pnpm dsh web` 启动失败 "--expose-internals"** | 44 | [Link](https://github.com/deepseek-ai/deepseek-harness/discussions/2699) | 开发环境配置问题。Node.js 版本与 HMR 服务启动参数不兼容，影响开发者本地贡献体验。 |
| 3 | [General] | **本轮运行失败 Cannot read properties of undefined** | 36 | [Link](https://github.com/deepseek-ai/deepseek-harness/discussions/7035) | 运行时崩溃，具体原因需结合日志，反映底层执行引擎的稳定性隐患。 |
| 4 | [Ideas] | **Please send x-opencode-session header** | 36 | [Link](https://github.com/deepseek-ai/deepseek-harness/discussions/5495) | 上游 API 提供商 (OpenCode Go) 强制要求新 Header 用于路由优化，涉及约 25k 用户组织，需 DSH 及时适配以避免服务中断。 |
| 5 | [General] | **微信主群（最新置顶）** | 28 | [Link](https://github.com/deepseek-ai/deepseek-harness/discussions/1128) | 社区运营与用户交流阵地，热度持续。 |
| 6 | [General] | **BUG: sandbox escalation mode 错误** | 26 | [Link](https://github.com/deepseek-ai/deepseek-harness/discussions/201) | 安全沙箱权限提升逻辑报错，影响需要高权限操作的 agent 任务。 |
| 7 | [General] | **0.17.*-alpha UI 吐槽贴** | 19 | [Link](https://github.com/deepseek-ai/deepseek-harness/discussions/7443) | 用户对 UI/UX 风格（动画、图标、配色）的强烈反馈，认为背离了之前的设计语言，呼吁保持产品独特性。 |

---

## 5. Bug 与稳定性

### 🔴 严重 / 阻塞性 Bug

*   **会话格式迁移故障 (v0→v3)**
    *   **现象：** 从 v0.1.2-rc.1 升级后，大量旧会话（Header version: 0）在侧边栏列出但点击即报错 `SessionFormatUnsupportedError`，无法打开。
    *   **来源：** [#6559](https://github.com/deepseek-ai/deepseek-harness/discussions/6559) (12 评论)
    *   **状态：** 用户已提供修复配方，但表明 rc.1/rc.2 存在 breaking change 导致的兼容性断层。
*   **Clean Install 依赖解析失败**
    *   **现象：** 在新机器 npm 安装 dsh 后，启动报错 `dsh-sandbox-local is not resolved`，导致无法启动。
    *   **来源：** [#7542](https://github.com/deepseek-ai/deepseek-harness/discussions/7542) (11 评论)
    *   **状态：** 待官方确认是否为发布包遗漏依赖。
*   **Sandbox 权限提升错误**
    *   **现象：** `sandbox escalation to "workspace-write" is not strictly wider than ... "danger-full-access"`，导致 agent 无法执行需要更高权限的操作。
    *   **来源：** [#201](https://github.com/deepseek-ai/deepseek-harness/discussions/201) (26 评论)
    *   **状态：** 长期存在的权限模型逻辑 bug。

### 🟡 中等 / 体验性 Bug

*   **Headless/Web 启动参数缺失：** Windows 下 `pnpm dsh web` 因缺少 `--expose-internals` 而启动失败，需手动修复 Node 启动参数。[#2699](https://github.com/deepseek-ai/deepseek-harness/discussions/2699)
*   **运行时未定义错误：** 多种场景下出现 `Cannot read properties of undefined (reading 'prepare')`，需更多日志定位。[#7035](https://github.com/deepseek-ai/deepseek-harness/discussions/7035)

### 🟢 已知但不阻塞问题

*   **插件事件导致 Resume 崩溃：** 第三方插件写入的自定义 session events（如 `dsh-click/action`）会导致会话恢复时因未知事件类型而拒绝加载。[#3191](https://github.com/deepseek-ai/deepseek-harness/discussions/3191)

---

## 6. 功能请求与路线图信号

1.  **模型循环/退化防护：**
    *   **需求：** 用户在超长上下文 + max reasoning effort 下，发现 v4.1-flash 模型陷入“回合零产出”或内容重复循环，且无自动熔断机制。[#5976](https://github.com/deepseek-ai/deepseek-harness/discussions/5976), [#5072](https://github.com/deepseek-ai/deepseek-harness/discussions/5072)
    *   **信号：** 社区迫切需要**轮次预算限制**、**重复检测兜底**及**自动熔断机制**，以防止资源浪费和任务挂起。
2.  **社区插件注册表标准化：**
    *   **需求：** 提议建立 Community Plugin Registry Contract v2，统一插件描述 Schema，并提供 `dsh plugin check` 等检查工具。[#1846](https://github.com/deepseek-ai/deepseek-harness/discussions/1846)
    *   **信号：** 随着插件生态扩展，官方可能考虑提供官方的插件审核/验证机制。
3.  **API Header 适配：**
    *   **需求：** OpenCode Go 等上游服务强制要求 `x-opencode-session` header。[#5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)
    *   **信号：** DSH 需保持与主流 Managed Inference API 的兼容性迭代。
4.  **加密凭据管理：**
    *   **需求：** dsh-vault 插件的高热度（251 评论）表明，**安全的凭据管理**是 agent 自动化的刚需，未来可能被纳入核心功能或成为推荐标配。[#1457](https://github.com/deepseek-ai/deepseek-harness/discussions/1457)

---

## 7. 用户反馈摘要

*   **满意点：**
    *   **侧边栏功能增强：** 用户普遍认可终端多标签、文件预览（特别是 Excel 公式支持）、会话归档管理等新增功能，认为显著提升了多任务工作效率。
    *   **插件系统灵活性：** 插件安装源智能选择和运行时卸载功能受到开发者欢迎。
*   **不满意/痛点：**
    *   **UI 风格争议：** 部分用户强烈反对 0.17.*-alpha 版本的 UI 改版，认为图标锯齿、动画不同步、配色失去“灵魂”，过于模仿 Codex 而失去 DSH 特色。[#7443](https://github.com/deepseek-ai/deepseek-harness/discussions/7443)
    *   **升级痛点：** 从旧版本（尤其是 v0.1.2/0.1.5-rc.1）升级到 rc.1 过程痛苦，会话文件兼容性、依赖解析失败等问题频发，用户戏称“每一次升级都太刺激”。[#7513](https://github.com/deepseek-ai/deepseek-harness/discussions/7513), [#6559](https://github.com/deepseek-ai/deepseek-harness/discussions/6559)
    *   **模型稳定性担忧：** 对 v4.1-flash 在长任务中的循环和退化表现表示担忧，认为缺乏必要的保护机制。[#5976](https://github.com/deepseek-ai/deepseek-harness/discussions/5976)

---

## 8. 待处理积压

*   **Sandbox 权限模型长期 Bug：** [#201](https://github.com/deepseek-ai/deepseek-harness/discussions/201) 已开放多日，影响需要复杂权限提升的场景，建议优先排查。
*   **v0 会话格式兼容性：** [#6559](https://github.com/deepseek-ai/deepseek-harness/discussions/6559) 涉及大量老用户的数据访问，建议在后续 patch 版本中提供无损迁移工具或更好的向后兼容支持。
*   **第三方插件事件崩溃：** [#3191](https://github.com/deepseek-ai/deepseek-harness/discussions/3191) 插件生态稳定性问题，建议官方在会话加载时对未知事件类型提供可配置的忽略或警告选项，而非直接 crash。
*   **UI 反馈整合：** [#7443](https://github.com/deepseek-ai/deepseek-harness/discussions/7443) 虽然为主观审美，但反映了核心用户对品牌一致性的重视，建议产品团队评估是否需要回调或提供主题切换选项。

---
*日报生成时间：2026-09-24 | 数据来源：GitHub Discussions & Releases*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*