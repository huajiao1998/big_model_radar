# OpenClaw 生态日报 2026-11-02

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-02 01:06 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 (2026-11-02)

### 1. 今日速览
OpenClaw 项目处于极高的研发活跃度中，过去 24 小时内产生了 500 条 Issues 更新和 500 条 Pull Request 记录，其中待合并 PR 占比超过 50%（280 条），显示出密集的冲刺状态或发版前的清理工作。当前无新版本发布，但工程重心明显偏向底层架构稳定性修复（如 Gateway 阻塞、插件热重载崩溃）以及移动端 UI 的精细化打磨。社区对记忆系统（Memory）的深层逻辑、语音交互（Talk）的稳定性以及跨平台（Windows/Linux）执行环境的兼容性提出了大量高关注度反馈。

### 2. 版本发布
无新版本发布。

### 3. 项目进展
**已合并/关闭的重要 PR 与修复：**
*   **Windows 执行环境兼容性修复**：PR #190745 替代了 #185425，修复了 Windows 下忽略显式指定的 npm/npx 路径而强制使用内置版本的问题，提升了插件命令执行器的可靠性。
*   **Agent 会话启动体验优化**：PR #190744 替代 #185332，改进了 `sessions_spawn` 模型策略被拒绝时的错误信息，现在能明确告知操作员哪条策略拒绝了请求及如何恢复，提升了运维可观测性。
*   **本地插件安装修复**：PR #190734 修复了 Windows 下通过 `file:///` URL 安装本地插件时出现“路径未找到”的 Bug，支持了包含空格和 Unicode 的路径解析。
*   **UI 性能与测试优化**：PR #190742 优化了侧边栏 E2E 测试速度（从 72s 降至 41s），并清理了等待动画的冗余耗时。
*   **记忆同步诊断改进**：PR #173604 修复了 `openclaw memory search` 同步失败时隐藏底层错误原因的问题，现在会透传 `Error.cause`，便于排查数据库状态异常。

### 4. 社区热点
**讨论最活跃的 Issues（Top 3）：**
1.  **Gateway 大插件阻塞回归** [P0]：[#160959](https://github.com/openclaw/openclaw/issues/160959) (69 条评论)。自 2026.9.6 起，包含大型依赖树的外部插件导致 Gateway 事件循环阻塞数分钟，被标记为 P0 级别回归，严重影响服务可用性。
2.  **代理级成本预算强制**：[#42475](https://github.com/openclaw/openclaw/issues/42475) (29 条评论)。用户强烈要求在 Gateway 层面实施每日/每月成本上限，以防止“跑飞”的 Agent 消耗大量 API 费用，目前该功能缺失导致需依赖外部监控。
3.  **长对话工具参数丢失**：[#53408](https://github.com/openclaw/openclaw/issues/53408) (16 条评论)。在 15+ 轮重度工具调用对话后，`write` 和 `exec` 工具静默丢弃所有参数，导致执行空操作，严重影响长任务连续性。

**社区诉求分析**：
*   **稳定性至上**：用户对 Gateway 的崩溃循环和阻塞零容忍，P0 级 Bug 必须优先解决。
*   **成本控制**：多 Agent 场景下，缺乏内置的费用护栏已成为运营痛点。
*   **状态一致性**：长对话中的上下文和工具状态漂移问题频发，亟需底层架构层面的修复。

### 5. Bug 与稳定性
**按严重程度排列的重点 Bug：**

*   **[P0] Gateway 事件循环阻塞**：[#160959](https://github.com/openclaw/openclaw/issues/160959)。大插件捕获期间 Gateway 冻结。**状态**：OPEN，标记 `needs-maintainer-review`。
*   **[P0] 记忆根目录永久失效**：[#153426](https://github.com/openclaw/openclaw/issues/153426)。`MEMORY.md` 因 provenance ratchet 机制被静默且永久排除在 bootstrap 注入之外，无诊断手段。**状态**：OPEN，需产品决策。
*   **[P1] Doctor 启动挂起**：[#187900](https://github.com/openclaw/openclaw/issues/187900)。Linux 主机上 `openclaw doctor` 在所有模式下无限挂起，阻碍故障排查。**状态**：OPEN。
*   **[P1] 热重载导致通道断开**：[#152965](https://github.com/openclaw/openclaw/issues/152965)。修改非通道插件配置会意外卸载所有通道插件（如 Discord/WeChat），切断活跃流并丢失入站消息。**状态**：OPEN，已有清晰修复形状 (`fix-shape-clear`)。
*   **[P1] 定时任务权限丢失**：[#156895](https://github.com/openclaw/openclaw/issues/156895)。Agent 创建的自动化任务在 20ms 内因“账号不可用”失败，尽管账号已配置，疑似竞态条件。**状态**：OPEN。
*   **[P2] 移动端 TTS 音频不可用**：[#144502](https://github.com/openclaw/openclaw/issues/144502)。WhatsApp 移动端无法播放 48kHz TTS 语音条，下载失败。**状态**：CLOSED (已解决或关闭)。
*   **[P2] WebChat 滚动抖动**：[#164394](https://github.com/openclaw/openclaw/issues/164394)。长历史记录中间部分滚动时出现持续的亚像素垂直抖动。**状态**：OPEN。

### 6. 功能请求与路线图信号
*   **Agent 级梦境配置 (Dreaming)**：[#67413](https://github.com/openclaw/openclaw/issues/67413) 请求允许按 Agent 禁用或调整 Dreaming，以避免多 Agent 同时 Dreaming 导致的 OOM。**信号**：结合 PR #138366（让 Memory 插件拥有 Dreams 页面控制权），记忆系统的模块化正在推进。
*   **沙箱 Agent 技能工坊**：[#91676](https://github.com/openclaw/openclaw/issues/91676) 提议增加 `skills.workshop.allowSandboxedAgents` 选项，目前沙箱 Agent 无法使用 `skill_workshop`。**信号**：安全性与功能性的平衡需求。
*   **Linux aarch64 官方构建**：[#138279](https://github.com/openclaw/openclaw/issues/138279) 请求提供 ARM64 的 `.deb` 和 AppImage。**状态**：CLOSED，可能已纳入计划或提供替代方案。
*   **Slack 允许列表规范化匹配**：PR #190443 正在修复 NFC/NFD 名称匹配问题，标记为 `P1` 且涉及安全边界，预计将在近期合入。

### 7. 用户反馈摘要
*   **痛点 - 黑盒故障**：多个 Issue（如 #153426, #138561）指出插件停止工作或记忆失效时，日志缺乏详细诊断信息，用户难以自行排查。
*   **痛点 - 跨平台不一致**：Windows 下的 npm 路径、文件 URL 解析（#185425, #190734）以及 Linux 下的 doctor 挂起（#187900）显示出平台特定问题频发。
*   **满意点 - 响应速度**：尽管 Bug 数量多，但许多 PR 在创建后 24 小时内即有自动化 Bot（如 `roboclaw-bot`）介入进行补充或替代，显示 CI/CD 流程较为成熟。
*   **场景 - 多 Agent 运维**：用户多为运营多个 Agent 的开发者，对成本（#42475）和状态隔离（#137613 CLI 后端内存刷写被禁用）高度敏感。

### 8. 待处理积压
*   **高优先级长期未决**：
    *   [#160959](https://github.com/openclaw/openclaw/issues/160959) (P0, 69 评论)：Gateway 阻塞回归，自 9 月底报告，至今仍为 OPEN 且无关联 Fix PR。
    *   [#187900](https://github.com/openclaw/openclaw/issues/187900) (P1, 13 评论)：Doctor 挂起，阻碍运维，需尽快指派维护者。
    *   [#173058](https://github.com/openclaw/openclaw/issues/173058) (Security, 8 评论)：`tools.fs.workspaceOnly` 未有效限制文件工具访问 OpenClaw 状态根目录，存在安全边界漏洞，标记 `needs-security-review`。
*   **维护者注意力分配**：500 条 PR 中 280 条待合并，而 Issues 中大量 P0/P1 问题处于 `clawsweeper:needs-maintainer-review` 状态，建议团队优先清理 P0 阻塞问题，再处理待合并 PR，以防新代码引入更多回归。

---

## 横向生态对比

# 2026-11-02 个人 AI 助手与自主智能体开源生态横向对比分析报告

## 1. 生态全景
当前个人 AI 助手与自主智能体开源生态正处于**“架构收敛与稳定性博弈”**的关键转折期。各头部项目（OpenClaw, Hermes, Zeroclaw）均在向“统一网关（Unified Gateway）”或集中式运行时演进，以解决多 Agent 状态隔离与资源调度难题，但随之而来的是事件循环阻塞、上下文漂移等 P0 级稳定性回归。与此同时，**跨平台兼容性（特别是 Windows/Linux 一致性）**、**成本护栏（Cost Guardrails）**以及**长程记忆持久化**成为全行业的共同痛点。生态已从早期的“功能堆砌”阶段进入“工程化深度打磨”阶段，核心竞争壁垒转向底层架构的鲁棒性与运维可观测性。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | 待合并 PR | 版本发布 | 健康度评估 | 核心特征 |
| :--- | :---: | :---: | :---: | :---: | :--- | :--- |
| **OpenClaw** | 500+ | 500+ | 280 | 无 | 🟡 **高压冲刺** | 高吞吐，大量 P0 阻塞，发版前清理状态 |
| **Hermes** | 500+ | 500+ | 421 | 无 | 🟡 **架构阵痛** | 统一网关重构期，高并发回归，Review 积压严重 |
| **Zeroclaw** | 11 | 48 | 43 | 无 | 🟢 **良好/密集** | 高质量功能交付（文件/安全），核心维护者驱动 |
| **QwenPaw** | 5 | 18 | 17 | 无 | 🟢 **良好** | 聚焦受限环境修复与 MCP 兼容性，响应迅速 |
| **AstrBot** | 19 | 44 | 多 | 无 | 🟢 **稳定** | 核心引擎优化，渠道适配（QQ/OneBot）成熟 |
| **PicoClaw** | 0 | 2 | 2 | 无 | 🟢 **静默维护** | 极低活跃，长尾支持，聚焦移动端/Termux |
| **DeepSeek** | N/A | N/A | N/A | 无 | 🟡 **脆弱/早期** | 无 Issue 机制，RC 版本稳定性差，社区自建补丁 |

## 3. OpenClaw 在生态中的定位

*   **优势**：**全平台兼容性与模块化深度**。OpenClaw 是唯一明确将 Windows/Linux 路径解析、插件热重载稳定性作为 P0 攻坚方向的项目，且在“记忆系统（Memory）”与“语音交互（Talk）”的底层架构上投入最重。其 500+ PR 的高并发显示其拥有最庞大的贡献者基数。
*   **技术路线差异**：相较于 Hermes 的“统一网关”激进重构，OpenClaw 更倾向于**渐进式稳定性修复**（如替换而非重写 Gateway 组件）。它强调“运维可观测性”（如明确报错策略拒绝原因），而非纯粹的架构简洁性。
*   **社区规模对比**：OpenClaw 与 Hermes 并列第一梯队（日均 500+ 动态），远超 Zeroclaw/AstrBot（日均 50-100 动态）。但 OpenClaw 的 P0 积压（如 #160959 阻塞）反映出其规模扩张带来的质量稀释风险。

## 4. 共同关注的技术方向

以下需求在 3 个以上项目中独立涌现，表明已成为行业共识：

| 技术方向 | 涉及项目 | 具体诉求 |
| :--- | :--- | :--- |
| **成本护栏与资源配额** | OpenClaw, Zeroclaw, Hermes | **OpenClaw**: 要求 Gateway 层面强制每日/每月成本上限（#42475）。<br>**Zeroclaw**: 可配置的 Daemon 会话配额及操作员保留量（#12130）。<br>**Hermes**: 防止 Agent“跑飞”消耗 API 费用，需内置费用护栏。 |
| **长程记忆持久化** | OpenClaw, DeepSeek, QwenPaw | **OpenClaw**: 记忆根目录失效（#153426）与 Dreaming 机制优化。<br>**DeepSeek**: 强烈呼吁原生 Memory 能力（#14），希望兼容 Claude/Codex 记忆库。<br>**QwenPaw**: Auto-Dream 模块数据丢失修复（#8500）。 |
| **MCP 协议互操作性** | QwenPaw, Hermes, Zeroclaw | **QwenPaw**: 修复 Legacy MCP 404 误判（#8424）。<br>**Hermes**: MCP 数组参数传递破坏修复（#99270）。<br>**Zeroclaw**: MCP 延迟加载顺序稳定性以保障 Prompt 缓存（#12176）。 |
| **跨平台一致性** | OpenClaw, Hermes, DeepSeek | **OpenClaw**: Windows npm 路径强制与 Linux Doctor 挂起。<br>**Hermes**: Windows 探针误判与更新失败。<br>**DeepSeek**: Linux 原生支持缺失（#8107），Windows 沙箱崩溃。 |

## 5. 差异化定位分析

*   **OpenClaw / Hermes (全能型 OS)**：
    *   **目标用户**：重度多 Agent 运维者、企业级开发者。
    *   **架构侧重**：高并发 Gateway、统一会话管理、复杂工具链（Skills/MCP）。
    *   **差异**：Hermes 激进重构“统一网关”，OpenClaw 侧重“稳定性与可观测性”的渐进修复。
*   **Zeroclaw / QwenPaw / AstrBot (垂直场景型)**：
    *   **目标用户**：特定渠道集成者（IM/Bot）、企业安全合规场景。
    *   **架构侧重**：
        *   **Zeroclaw**：强调安全性（OIDC, Token Binding）与文件统一处理架构。
        *   **QwenPaw**：强调受限环境（NAS/Docker）的鲁棒性与多通道消息路由。
        *   **AstrBot**：强调 IM 渠道（QQ/OneBot）的深度适配与同步引擎性能。
*   **DeepSeek Harness (端侧/原生型)**：
    *   **目标用户**：本地化部署开发者、Windows 桌面重度用户。
    *   **架构侧重**：原生 Computer-Use 工具、本地沙箱隔离。
    *   **差异**：目前主要处于 RC 阶段，缺乏服务端多租户能力，依赖社区补丁解决稳定性问题。

## 6. 社区热度与成熟度分层

1.  **快速迭代/高风险期 (Hermes, OpenClaw)**：
    *   日均 500+ 动态，但伴随大量 P0/P1 回归。Hermes 处于架构重构阵痛期，OpenClaw 处于发版前冲刺期。两者均面临“创新者窘境”，即新功能与旧稳定性的激烈冲突。
2.  **质量巩固/稳步增长期 (Zeroclaw, QwenPaw, AstrBot)**：
    *   日均 50-100 动态，Bug 修复率高，PR 质量高（如 Zeroclaw 的文件架构、AstrBot 的同步优化）。社区氛围更健康，更专注于特定场景的工程化落地。
3.  **静默维护/长尾期 (PicoClaw)**：
    *   极低活跃度，主要维持移动端（Termux）基础兼容性，适合对更新频率不敏感的边缘用户。
4.  **早期探索/社区驱动期 (DeepSeek Harness)**：
    *   官方发布节奏慢，依赖社区讨论（Discussions）驱动修复。目前稳定性较差，适合硬核开发者折腾，不适合生产环境。

## 7. 值得关注的趋势信号

1.  **“Agent 运维”成为新范式**：
    *   所有高活跃项目均在解决“黑盒故障”问题。社区不再满足于“能对话”，而是要求**可观测性**（Observability）：明确报错原因（OpenClaw #190744）、成本透视（Zeroclaw #12130）、状态审计（Hermes #147748）。**参考建议**：开发者的 Agent 框架需内置 Tracing 与 Cost Monitoring。
2.  **安全边界从“防护”转向“隔离”**：
    *   Zeroclaw 的 OIDC/Token Binding 和 OpenClaw 的沙箱 Agent 技能工坊表明，多 Agent 协作下的**权限精细化**是下一步重点。单纯的文件/网络沙箱已不足以应对跨 Agent 数据泄露风险。
3.  **MCP 协议成为事实标准，但碎片化严重**：
    *   尽管 MCP 是共同语言，但各实现对 Legacy 版本、数组参数、延迟加载的支持不一（QwenPaw, Hermes, Zeroclaw 均有关键修复）。**参考建议**：构建 Agent 应用时，需封装一层 MCP Adapter 以抹平不同实现的差异。
4.  **Windows 与 Linux 的“双轨制”生存**：
    *   几乎所有跨平台项目（OpenClaw, Hermes, DeepSeek）都在 Windows 上暴露出比 Linux 更严重的沙箱/路径/更新问题。Linux 仍被视为“一等公民”，而 Windows 支持往往是事后补丁。**参考建议**：若目标用户含 Windows，需独立维护一套 Windows 测试流水线，切勿假设跨平台行为一致。
5.  **从“对话”向“任务闭环”演进**：
    *   Hermes 的 Kanban 工作流、QwenPaw 的每日任务排程、AstrBot 的主动任务修复，均显示行业正在从“被动问答”转向“主动执行与状态管理”。Agent 不再是聊天机器人，而是具备生命周期管理能力的**数字员工**。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**日期：** 2026-11-02
**数据范围：** 过去24小时

## 1. 今日速览
今日项目活跃度**极高**，过去24小时内共有 59 条 Issue/PR 更新记录（11 Issues + 48 PRs），其中 43 个 PR 处于待合并状态，显示出极强的开发吞吐量和社区贡献热情。项目当前处于功能密集交付期，重点围绕**文件统一处理架构（#9488 系列）**、**安全与权限管理（OIDC、Session Quotas）**以及**渠道稳定性（Lark、Telegram）**展开。虽然今日无新版本发布，但大量高价值修复（如 Lark 崩溃、Prompt 缓存失效）已提交 PR，预计将显著改善下一版本的稳定性与推理成本效率。

## 3. 项目进展
*注：今日过去24小时有 5 个 PR/Issue 被标记为已合并/关闭，43 个 PR 处于待合并（Review/Open）状态。以下为关键进展：*

*   **文件处理架构落地（High Impact）：**
    *   **Unified File Intake Tracker** 持续活跃：[Issue #11013](https://github.com/zeroclaw-labs/zeroclaw/issues/11013) 作为 RFC #9488 的实施跟踪器，今日有更新。相关功能切片 [PR #12181 (Web 文档上传)](https://github.com/zeroclaw-labs/zeroclaw/issues/12181) 已提出，标志着 Phase 2 Web 切片开始实施。
    *   **Bug 修复联动：** 针对文件交付工具 `deliver_file` 的描述错误导致模型将 URI 写入正文的问题，[PR #12179](https://github.com/zeroclaw-labs/zeroclaw/pull/12179) 已提交修复，对应 [Issue #12178](https://github.com/zeroclaw-labs/zeroclaw/issues/12178)。
*   **运行时稳定性与性能优化：**
    *   **Prompt 缓存修复：** [PR #11698](https://github.com/zeroclaw-labs/zeroclaw/pull/11698) 和 [PR #12176 (Issue)](https://github.com/zeroclaw-labs/zeroclaw/issues/12176) 指出 MCP 延迟加载列表顺序不稳定会导致系统提示词缓存失效，PR 正在推进修复，旨在降低推理成本。
    *   **安装体验修复：** [Issue #12154](https://github.com/zeroclaw-labs/zeroclaw/issues/12154) 报告安装脚本显示 commit 而非版本号的 Bug 已关闭，标志着 v0.9.0 相关发布工具链的完善。
*   **安全与访问控制：**
    *   **OIDC 登录支持：** [PR #11965](https://github.com/zeroclaw-labs/zeroclaw/pull/11965) 实现了仪表盘选用的 OIDC 登录，增强企业级安全性。
    *   **Token 绑定用户：** [PR #11286](https://github.com/zeroclaw-labs/zeroclaw/pull/11286) 允许将网关配对令牌绑定到特定的 Roster 用户，细化权限控制。

## 4. 社区热点
基于评论数和关注度，以下条目为今日社区焦点：

*   **[Issue #11013](https://github.com/zeroclaw-labs/zeroclaw/issues/11013) - 统一文件摄入与交付实现跟踪器**
    *   **热度分析：** 4 条评论，标记为 `priority:p2` 和 `risk:high`。这是整个文件管理重构的核心枢纽，社区关注点在于如何平衡不同渠道（Web, CLI, Channels）下的文件生命周期和持久化属性。
*   **[Issue #9597](https://github.com/zeroclaw-labs/zeroclaw/issues/9597) - 使 Peer-Agent 对话持久化且可归属**
    *   **热度分析：** 3 条评论，标记为 `status:in-progress`。讨论集中在解决当前 `send_message_to_peer` 产生的对话脱离发送者生命周期的问题，这是多智能体协作场景下的关键痛点，用户希望实现对话的完整审计和状态恢复。
*   **[PR #10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430) - Gemini 语音对语音（Speech-to-Speech）渠道**
    *   **热度分析：** 这是一个 `size:XL` 的大型功能 PR，标记为 `needs-author-action`。虽然今日无新评论，但其涉及实时语音模型作为主要音频持有者的架构变更，是未来交互模式的重要探索，社区对其落地进度保持高度关注。

## 5. Bug 与稳定性
今日报告的 Bug 主要集中在渠道解析、Prompt 一致性及安装体验上：

| 严重程度 | Bug 描述 | 状态 | 修复 PR | 链接 |
| :--- | :--- | :--- | :--- | :--- |
| **High** | **Lark 卡片分块导致 Panic**：当字节预算落在多字节字符中间时，`split_markdown_chunks` 导致守护进程崩溃。 | Open | 待确认 | [Issue #12173](https://github.com/zeroclaw-labs/zeroclaw/issues/12173) |
| **Medium** | **MCP 延迟工具列表顺序随机**：HashMap 顺序导致系统 Prompt 每次会话都变化，破坏缓存并增加成本。 | Open | [PR #11698](https://github.com/zeroclaw-labs/zeroclaw/pull/11698) (相关) | [Issue #12176](https://github.com/zeroclaw-labs/zeroclaw/issues/12176) |
| **Medium** | **install.sh 显示 Commit 而非版本**：v0.8.7 预构建安装时显示哈希值，易造成混淆。 | Closed | 已修复 | [Issue #12154](https://github.com/zeroclaw-labs/zeroclaw/issues/12154) |
| **Low** | **deliver_file 描述误导**：工具描述提示模型将 URI 写入回复文本，而非仅用于 Widget。 | Open | [PR #12179](https://github.com/zeroclaw-labs/zeroclaw/pull/12179) | [Issue #12178](https://github.com/zeroclaw-labs/zeroclaw/issues/12178) |
| **Low** | **UI 文案误导**：人格编辑器提示“下次消息生效”，但在 Channel 场景下可能需要重载。 | Open | 待确认 | [Issue #12175](https://github.com/zeroclaw-labs/zeroclaw/issues/12175) |
| **Security** | **WebP 解码资源耗尽风险**：入站 WebP 转 PNG 时未按每张图像上限限制内存分配。 | Open | [PR #12180](https://github.com/zeroclaw-labs/zeroclaw/pull/12180) | [PR #12180](https://github.com/zeroclaw-labs/zeroclaw/pull/12180) |

## 6. 功能请求与路线图信号
*   **会话管理与恢复：**
    *   **请求：** [Issue #12069](https://github.com/zeroclaw-labs/zeroclaw/issues/12069) 请求添加 `/load-session` 命令以恢复 Code 会话。该 Issue 已关闭，表明功能可能通过 [PR #11727](https://github.com/zeroclaw-labs/zeroclaw/pull/11727)（ZeroCode 重启时恢复会话）或类似机制实现，或标记为由现有 `Ctrl+S` 选择器覆盖。
*   **资源配额管理：**
    *   **请求：** [Issue #12130](https://github.com/zeroclaw-labs/zeroclaw/issues/12130) 请求可配置的 Daemon 会话配额及本地操作员保留量。配套的文档 PR [PR #12132](https://github.com/zeroclaw-labs/zeroclaw/pull/12132) 已提交，表明该功能已进入开发/规划阶段。
*   **共享执行与凭证更新：**
    *   **请求：** [Issue #12131](https://github.com/zeroclaw-labs/zeroclaw/issues/12131) 提出了关于共享执行权限和同一身份凭证更新的 RFC，旨在解决多贡献者输入下子进程生命周期超过发起连接的问题，属于高级安全架构演进。

## 7. 用户反馈摘要
*   **痛点：** 用户普遍关注**非预期行为导致的系统不稳定**（如 Lark 渠道 Panic）和**隐性成本增加**（Prompt 缓存失效导致 Token 浪费）。
*   **使用场景：** 重度用户（如贡献者 @Audacity88, @IftekharUddin）正在构建复杂的多渠道、多智能体工作流，对**状态持久化**（Session, Agent Turns）和**细粒度权限控制**（OIDC, Token Binding）有强烈需求。
*   **满意点：** 社区对快速响应 Bug 报告（如 install.sh 问题立即关闭）和高质量 PR 提交（多个 `size:XL` 的功能 PR 在同一天活跃）表示认可，项目响应速度快。

## 8. 待处理积压
*   **高风险大型 PR 积压：** [PR #10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430) (Gemini STS Channel) 和 [PR #11698](https://github.com/zeroclaw-labs/zeroclaw/pull/11698) (Prompt Cache Fix) 均标记为 `needs-author-action` 且为 `size:XL`。这些 PR 停留在等待作者更新或维护者深度 Review 的状态，建议维护者优先协调 Review 资源，避免阻塞关键路径。
*   **WASM 技术探索：** [PR #11355](https://github.com/zeroclaw-labs/zeroclaw/pull/11355) (Web WASM PoC) 标记为 `stale-candidate`，若团队近期无计划支持 WASM 前端模块，建议及时关闭或标记为 `wontfix` 以清理积压。

**健康度评估：** 🟢 **良好**。高活跃度由核心维护者和贡献者驱动，关键稳定性 Bug 已有修复方案（PR），路线图清晰（文件架构、安全强化）。需警惕 PR 积压对开发节奏的潜在影响。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-11-02**

### 1. 今日速览
过去24小时内，PicoClaw 项目处于**低活跃但稳定**的状态。没有新的 Issue 产生，且无已合并的 Pull Request，表明项目当前没有紧迫的功能推进或紧急修复落地。社区关注度集中在两个待合并的 PR 上，主要涉及模型提供商适配与 Shell 修复。整体项目健康度良好，无破坏性变更信号，维护者响应节奏较为平稳。

### 2. 版本发布
**无新版本发布**
过去24小时内未检测到新的 Release 标签或版本公告。

### 3. 项目进展
**今日无已合并/关闭的重要 PR**
过去24小时内没有 PR 被合并或关闭，因此没有新功能正式并入主分支，也没有修复正式落地。项目版本暂时保持不变。

### 4. 社区热点
今日讨论集中在 2 个待合并的 PR 上，但**社区互动数据稀疏**（评论数均为 undefined/0，👍 数为 0）。这表明当前热点并非由大规模社区讨论驱动，而是由**贡献者提交**的功能修复与新集成需求驱动。

*   **PR #3455: [OPEN] Fix/nvidia model id termux shell**
    *   **链接**: https://github.com/sipeed/picoclaw/pull/3455
    *   **诉求分析**: 这是一个 Bug 修复/适配 PR，针对 NVIDIA 模型 ID 在 Termux Shell 环境下的显示或调用问题。诉求在于改善 PicoClaw 在移动端（Android/Termux）与特定 LLM 提供商的兼容性。
    *   **状态**: 创建于 2026-11-01，目前待审核。

*   **PR #3448: [OPEN] [stale] feat(provider): add Runcrate OpenAI-compatible provider**
    *   **链接**: https://github.com/sipeed/picoclaw/pull/3448
    *   **诉求分析**: 这是一个新功能 PR，旨在添加 `Runcrate` 作为一等 OpenAI 兼容提供商。该 PR 曾被标记为 `[stale]`（停滞），但在 2026-11-01 再次被更新，说明贡献者或维护者重新激活了此功能。诉求在于丰富 PicoClaw 的 LLM 接入能力，特别是对于使用 Runcrate 的用户群体。
    *   **状态**: 创建于 2026-10-25，于 2026-11-01 更新，仍待合并。

### 5. Bug 与稳定性
**今日无新报告的 Bug**
过去24小时内没有新开的 Issue，因此没有新的崩溃、回归或稳定性问题被正式提出。
*   **注意**: PR #3455 隐含了一个已知的 Bug（NVIDIA 模型 ID 在 Termux 下的问题），但该修复尚待合并，目前主分支上此问题可能依然存在。

### 6. 功能请求与路线图信号
从待合并的 PR 来看，以下功能可能被纳入下一版本：

*   **LLM 提供商扩展**: PR #3448 表明项目路线图包含**持续集成新的 OpenAI 兼容提供商**（如 Runcrate，此前已有 Novita 和 NEAR AI Cloud）。这是一个明显的信号，即 PicoClaw 正致力于降低用户切换 LLM 后端的能力。
*   **移动端/Shell 兼容性**: PR #3455 提示项目在**Termux 环境**（Android 终端）下仍有需要打磨的细节，特别是与 NVIDIA 模型相关的元数据或 ID 处理。

### 7. 用户反馈摘要
由于过去24小时内无新 Issues，且现有 PRs 评论数为 0，**无法提炼出基于文本的真实用户痛点或满意度反馈**。
*   **间接推断**: PR #3455 的作者（@theophillus-imtl）主动提交修复，暗示社区中存在使用 Termux 运行 PicoClaw 并遇到 NVIDIA 模型 ID 问题的用户群体。

### 8. 待处理积压
*   **PR #3448: [stale] feat(provider): add Runcrate OpenAI-compatible provider**
    *   **链接**: https://github.com/sipeed/picoclaw/pull/3448
    *   **提醒**: 该 PR 创建时间较早（2026-10-25），且曾标记为 `[stale]`，但仍在 2026-11-01 有更新活动。**建议维护者尽快 review 并合并或关闭此 PR**，因为它是一个独立的功能模块，合并后不会增加主分支复杂性，且能提升项目对 Runcrate 用户的支持。长期停滞的 `[stale]` PR 若不及时处理，可能会丢失贡献者的积极性。

---
**总结**：今日 PicoClaw 项目处于静默维护期，无重大变更。关键行动点是审核并合并 PR #3448（新提供商集成）和 PR #3455（Termux 修复），以推进功能扩展和稳定性。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 (2026-11-02)

## 1. 今日速览
今日 QwenPaw 项目保持高活跃状态，过去 24 小时内有 5 个 Issue 更新和 18 个 Pull Request 动态，其中 17 个 PR 处于待合并状态，显示出密集的修复与功能开发节奏。核心进展集中在解决受限环境（如 NAS 沙箱）下的启动崩溃、MCP 协议兼容性及多通道消息路由优化。虽然无新版本发布，但针对 v2.3.0b2 暴露的依赖锁根目录权限问题已有 2 个紧急修复 PR 在审。整体项目健康度良好，社区对底层稳定性与用户体验流畅性的关注显著增加，维护团队响应速度较快。

## 2. 版本发布
过去 24 小时内无新版本发布。

## 3. 项目进展
今日主要推进了底层稳定性与多平台兼容性的修复工作，17 个待合并 PR 预示下一版本将包含大量 Bug 修复。

*   **受限环境启动修复**：针对 fnOS 等沙箱环境中因 `passwd home` 不可写导致的 import 阶段崩溃问题，PR [#8525](https://github.com/agentscope-ai/QwenPaw/pull/8525) 和 [#8527](https://github.com/agentscope-ai/QwenPaw/pull/8527) 分别提出了信任 `$HOME` 变量及在启动时报告不可用依赖状态根目录的方案。
*   **MCP 协议兼容性增强**：PR [#8445](https://github.com/agentscope-ai/QwenPaw/pull/8445) 修复了 `HttpStatelessClient` 在处理 legacy MCP 服务器返回 HTTP 404 + JSON-RPC -32601 时的硬失败问题，允许客户端回退至 legacy 握手，提升了与旧版 MCP 服务器的互操作性。
*   **多通道消息路由优化**：PR [#8480](https://github.com/agentscope-ai/QwenPaw/pull/8480) 解决了飞书、QQ 等渠道中引用回复包含控制指令（如 `/stop`）时无法正确路由的问题；PR [#8319](https://github.com/agentscope-ai/QwenPaw/pull/8319) 则补齐了 QQ 群组普通消息（非引用）的事件处理。
*   **桌面端与 UI 稳定性**：PR [#8033](https://github.com/agentscope-ai/QwenPaw/pull/8033)（已关闭/合并）修复了 Windows 桌面应用重复启动时后端被错误终止的问题；PR [#8524](https://github.com/agentscope-ai/QwenPaw/pull/8524) 修复了桌面端打开 workspace HTML 时路径编码错误。

## 4. 社区热点
*   **[#8424](https://github.com/agentscope-ai/QwenPaw/issues/8424) [Bug]: server/discover 返回 HTTP 404 + JSON-RPC -32601 被当现代协议硬失败**
    *   **状态**：OPEN | 评论数：5 | 更新：2026-11-01
    *   **分析**：这是今日讨论最活跃的 Bug。用户 `@ahxoeh` 指出 legacy MCP 服务器在遇到未知方法时返回特定的 404 错误码，导致 QwenPaw 客户端误判并拒绝连接。该 Issue 已有对应修复 PR [#8445](https://github.com/agentscope-ai/QwenPaw/pull/8445) 在审，反映了社区对 MCP 生态兼容性的强烈需求，尤其是与旧版或不同实现标准的 MCP 服务器共存场景。
*   **[#8521](https://github.com/agentscope-ai/QwenPaw/issues/8521) [Bug]: 对话无答复内容及 UI 复制操作失效**
    *   **状态**：OPEN | 评论数：2 | 更新：2026-11-02
    *   **分析**：用户反馈了两个严重影响体验的问题：一是模型偶尔不输出实质内容（仅显示思考过程）；二是网页版 UI 中 Ctrl+C 复制需要多次操作才能成功，且新版 UI 被吐槽比旧版更迟缓。这提示团队需关注前端性能回归及模型调用逻辑的边界情况。

## 5. Bug 与稳定性
按严重程度排列：

1.  **[P1 - 崩溃/无法启动] [#8515](https://github.com/agentscope-ai/QwenPaw/issues/8515)**
    *   **描述**：v2.3.0b2 在 fnOS NAS 沙箱等受限环境中启动即崩溃（PermissionError）。原因是 `dependency_maintenance.py` 优先使用 `pwd.getpwuid` 获取的 home 目录，而非 `$HOME`，且该目录不可写。
    *   **修复状态**：已有 2 个 Fix PR 在审：[#8525](https://github.com/agentscope-ai/QwenPaw/pull/8525)（逻辑修复）和 [#8527](https://github.com/agentscope-ai/QwenPaw/pull/8527)（容错与日志）。
2.  **[P2 - 功能失效] [#8424](https://github.com/agentscope-ai/QwenPaw/issues/8424)**
    *   **描述**：Legacy MCP 服务器无法连接，因协议握手失败导致硬错误。
    *   **修复状态**：已有 Fix PR [#8445](https://github.com/agentscope-ai/QwenPaw/pull/8445) 在审。
3.  **[P2 - 数据丢失/逻辑错误] [#8500](https://github.com/agentscope-ai/QwenPaw/issues/8500)**
    *   **描述**：Auto-Dream 模块在 extract 步骤失败时静默丢弃记忆，但仍标记为 checkpoint 成功，导致数据不可恢复且无提示。
    *   **修复状态**：暂无直接 Fix PR，需开发介入逻辑重构。
4.  **[P3 - 体验/次要功能] [#8521](https://github.com/agentscope-ai/QwenPaw/issues/8521)**
    *   **描述**：对话内容缺失、UI 复制失效及界面响应迟缓。
    *   **修复状态**：暂无 Fix PR，属于前端交互与模型调用监控问题。

## 6. 功能请求与路线图信号
*   **任务排程与自动化工作流**：
    *   **来源**：[#8523](https://github.com/agentscope-ai/QwenPaw/issues/8523)
    *   **分析**：用户提出希望增加“每日任务排程”机制，让 Agent 按清单自动执行任务并推送结果，实现“给人和 AI 派任务”的团队协同模式。鉴于已有大量核心组件（Core/Backend）影响，该功能可能需要涉及调度器（Scheduler）或 MCP 任务编排模块的新增开发，是下一版本潜在的重要功能增强方向。
*   **嵌套技能目录支持**：
    *   **来源**：[#8178](https://github.com/agentscope-ai/QwenPaw/pull/8178) (PR 在审)
    *   **分析**：支持 `<root>/<category>/<skill>` 的结构，镜像其他 Agent 的分类布局。这表明 QwenPaw 正在标准化其 Skills 架构，以提升大规模技能管理时的可维护性。

## 7. 用户反馈摘要
*   **痛点**：
    *   **环境兼容性差**：在 NAS 等非标准 Linux 环境（如 fnOS）部署时频繁遇到权限和路径推导问题（#8515）。
    *   **UI 性能退化**：用户明确对比 v2.2.2.post1 与旧版 UI，认为新版操作迟缓、复制不便、模型切换区域设计低效（#8521）。
    *   **MCP 互操作性**：对旧版或特定实现的 MCP 服务器支持不足，导致连接失败（#8424）。
*   **期望**：
    *   增加 UI 版本切换或优化交互流畅度。
    *   提供明确的任务排程入口，提升 Agent 的自主工作能力。
    *   增强对多语言环境（`QWENPAW_LANGUAGE`）的支持，避免 Docker 初始化时默认语言错误（#8526）。

## 8. 待处理积压
*   **长期未响应 Issue**：
    *   [#8500](https://github.com/agentscope-ai/QwenPaw/issues/8500)（Auto-Dream 数据丢失）创建于 10-29，评论 3 条，至今无 Fix PR。涉及核心记忆机制的可靠性，建议维护者优先安排调查。
    *   [#8411](https://github.com/agentscope-ai/QwenPaw/pull/8411) 和 [#8309](https://github.com/agentscope-ai/QwenPaw/pull/8309) 等 Matrix 和 Ollama 相关的大型修复 PR 创建于 10 月下旬，状态仍为 OPEN/Under Review，需尽快 Review 以合并到主分支。
*   **提醒**：PR [#8170](https://github.com/agentscope-ai/QwenPaw/pull/8170) 是一个 rebase 后的 fix，依赖于主分支最新状态，若合并队列拥堵可能影响前端渲染错误的修复进度。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes-Agent 项目动态日报 (2026-11-02)

## 1. 今日速览
过去 24 小时内，项目社区保持极高的活跃度，产生或更新了 500 条 Issue 和 500 条 Pull Request，表明大量开发者和维护者正在高强度协作。其中，待合并的 PR 数量达到 421 个，已合并或关闭的 PR 为 79 个，反映出开发团队在集中进行代码审查与功能落地。当前未发布新版本（0 个），主要精力集中在修复底层 Gateway 稳定性、解决桌面端与多平台（Windows/Telegram/Discord）的 Bug 上。项目整体呈现出向“统一网关（Unified Gateway）”架构深度演进的趋势，同时面临由于架构重构带来的高并发会话状态管理和消息投递机制的阵痛。

## 2. 项目进展
*注：无新版本发布，此处基于最新合并及处于高活跃状态的 PR 分析。*

近期合并或正在推进的 PR 主要集中在以下几个核心方向：
- **委派任务（Delegation）与后台任务机制修复**：`@teknium1` 提交并推进了多个底层修复 PR，包括让后台 Subagent 丢失的完成状态能从 Ledger 中重新打捞（[#147748](https://github.com/NousResearch/hermes-agent/pull/147748)）、解决路由信息丢失导致后台结果永远处于 pending 状态的死锁问题（[#147746](https://github.com/NousResearch/hermes-agent/pull/147746)），以及让 `/bg` 任务在结束时等待其 Subagents 以正确传递结果（[#147745](https://github.com/NousResearch/hermes-agent/pull/147745)）。这些进展极大提升了多 Agent 协作的可靠性。
- **多平台消息投递路由机制优化**：针对 Discord 线程中 delegate_task 结果无法送达的问题，提交了修复 PR，确保 session-key 重建时能正确携带 thread id（[#147185](https://github.com/NousResearch/hermes-agent/pull/147185)），并保留了路由锚点（[#145501](https://github.com/NousResearch/hermes-agent/pull/145501)）。
- **桌面端与编辑器集成体验**：通过 ACP 改进编辑器跟随 Agent 编辑时落点对齐逻辑（[#147728](https://github.com/NousResearch/hermes-agent/pull/147728)），以及优化 SSH Gateway 的启动行为，解决其首次访问 Profile 时启动多个后端的性能瓶颈（[#147741](https://github.com/NousResearch/hermes-agent/pull/147741)）。
- **核心 Agent 能力强化**：为本地模型恢复了意图确认的延续机制，防止模型宣告行动却不调用工具而卡住（[#69779](https://github.com/NousResearch/hermes-agent/pull/69779)）；引入了全局模型上下文上限 `model.context_cap` 功能（[#147740](https://github.com/NousResearch/hermes-agent/pull/147740)）。

## 3. 社区热点
以下为评论数最多、讨论最激烈的 Issue：

1. **[#131859] 通过 API 无法创建 Pull Request (CreatePullRequest 权限报错)**
   - 链接: https://github.com/NousResearch/hermes-agent/issues/131859 (评论 55)
   - **诉求分析**：此 Issue 由上游（Upstream）原因导致。有特定账号的 Fork 仓库在通过 API 向主仓库提交 PR 时遇到权限拦截，但创建普通 Issue 和 Fork PR 正常。由于被标记为 `blocked` 且涉及上游 API 行为变更，用户们急需官方提供临时替代的 CI/CD 审批路径或绕过方案。
2. **[#143547] 统一网关 (Unified Gateway) 合并后在 main 分支引发的遗留问题**
   - 链接: https://github.com/NousResearch/hermes-agent/issues/143547 (评论 34)
   - **诉求分析**：这是近期最大的架构变动（#106742）的直接后果。合并后，所有本地会话、CLI、终端 UI、API 均交由单一 Gateway 进程处理，导致出现诸多回归。用户和开发者正在此 Issue 中集中讨论崩溃、状态同步和性能下降的修复策略，是近期社区的核心阵地。
3. **[#128468] 桌面版在流式传输时渲染重复消息并伴随滚动跳跃**
   - 链接: https://github.com/NousResearch/hermes-agent/issues/128468 (评论 18)
   - **诉求分析**：Desktop 客户端 UX 体验严重受损，涉及消息流渲染引擎（流式数据未正确去重或同步），用户强烈要求修复视觉抖动，提升多轮复杂对话时的可用性。
4. **[#79087] Windows 桌面端运行探针超时而误判为新安装 (P1 级别 Bug)**
   - 链接: https://github.com/NousResearch/hermes-agent/issues/79087 (评论 17)
   - **诉求分析**：用户在 Windows 上遭遇极其破坏性的系统更新/启动问题：健康的安装被系统误判为“首次运行”，并尝试直接重装覆盖，导致系统崩溃。此 Issue 曾被错误归因于双后端并发，后经排查为子进程机制问题，目前处于攻坚阶段。

## 4. Bug 与稳定性
按严重程度（P 级别）及影响面排列的高优 Bug：

**P1 级别（严重/阻断）**
- **[#145022] Kanban 工作流在网关卡顿时导致工作节点崩溃 (16 评论)**
  - 链接: https://github.com/NousResearch/hermes-agent/issues/145022
  - 多个 Kanban 节点并发运行且 Gateway 卡顿时，触发 exit code 1 崩溃（拒绝机制），导致进行中的工作丢失且无法重试。暂无明确的针对性 Fix PR。
- **[#125437] 更新失败导致半应用状态，且系统缺乏产品内修复机制 (17 评论)**
  - 链接: https://github.com/NousResearch/hermes-agent/issues/125437
  - Windows 下 `hermes update` 失败后，Desktop 应用闪退（venv 中缺少依赖），且产品内打印的原始报错对普通用户无指引。已有社区讨论尝试寻找恢复路径，暂无官方自动化修复 PR。

**P2 级别（高优/影响功能可用性）**
- **[#143918] 图像附件在多轮重型聊天中未按比例缩减 (9 评论)**
  - 链接: https://github.com/NousResearch/hermes-agent/issues/143918
  - 图像附件从未被驱逐（evict）并在原尺寸下附加，每次 LLM 调用都会附带数 MB 的数据。此 Issue 由 AI 智能体自动生成并提供了代码级别的重现，属于性能/稳定性隐患。
- **[#109765] Cron 快照对自定义 Provider 存在信息丢失 (12 评论)**
  - 链接: https://github.com/NousResearch/hermes-agent/issues/109765
  - 未指定 Provider 的 Cron 任务在重放时，因快照信息丢失，导致回落到 OpenRouter，而未命中指定的自定义 Provider（如 `custom:omniroute`）。
- **[#99270] MCP 客户端在工具调用时破坏数组参数传递 (10 评论)**
  - 链接: https://github.com/NousResearch/hermes-agent/issues/99270
  - 客户端在转发参数到 `tools/call` 时，将数组的每个元素包装成了 `{item: ...}` 对象，导致凡是带有数组类型的 MCP 调用（如传递多个 ID）全部失败。

**P3 级别（一般缺陷）**
- **[#144486] TUI 下 `/quit --delete` 无法删除会话 (6 评论)**
  - 链接: https://github.com/NousResearch/hermes-agent/issues/144486
  - 文档声称可以使用该命令退出并删除会话，但实际上只是退出了 TUI，本地存储的会话记录依然存在。

## 5. 功能请求与路线图信号
基于高讨论度和相关 PR 提交，以下功能正逐步纳入路线图：
1. **原生 Mistral LLM 提供商支持**
   - 链接: [#20859](https://github.com/NousResearch/hermes-agent/issues/20859)
   - 拥有 35 个 👍，大量用户呼吁支持。鉴于 Hermes 语音模型已经支持该提供商，增加其 LLM 支持的阻力较小，是近期有望合入的高优 Feature。
2. **不可变/受保护的 Skills 机制**
   - 链接: [#25083](https://github.com/NousResearch/hermes-agent/issues/25083) (评论 10)
   - 用户痛点：Agent 能够随时修改或删除 `~/.hermes/skills/` 中的核心治理与安全约束规则。近期提交的 PR [#120971](https://github.com/NousResearch/hermes-agent/pull/120971) 正在尝试修复对固定或必备 Skills 误删的防护，预示着官方正计划增加该安全边界。
3. **通用化事件底层（Kanban Notifications Substrate）**
   - 链接: [#49190](https://github.com/NousResearch/hermes-agent/issues/49190)
   - 旨在解耦 Kanban 任务事件日志与特定通讯平台，允许任意客户端订阅任务进度。这是向多模态和多平台架构演进的基础设施需求。

## 6. 用户反馈摘要
通过阅读近期 Issues 和 PRs 讨论，用户的典型反馈及痛点包括：
- **Windows 用户体验断层**：除了更新失败无自救（#125437）和运行时探针假死（#79087），Windows 路径带有空格（#140831）会导致严格身份校验失败并阻断更新。Windows 端整体稳定性和进程管理是用户抱怨最集中的平台。
- **消息投递机制的不确定性**：由于近期引入“统一网关”架构，Telegram 论坛（#147746）、Discord 线程（#147185）等平台特有的父子会话路由经常丢失 `origin` 信息，导致 Agent 回复“发不出去”或卡在 Pending 状态。
- **性能与内存焦虑**：在涉及长会话和大量图片的场景下，用户担心上下文压缩频繁导致的性能下降，甚至出现消息行重复（#128293）。同时，图像传输未优化（#143918）也暴露了系统在重型任务下的资源管理能力短板。

## 7. 待处理积压
以下长期存在且需要维护者重点关注的积压项：
- **[#128468] 桌面端流式渲染问题**：创建于 2026-09-29，至今 18 条评论未收敛。
- **[#20859] Mistral 支持**：创建于 2026-05-06，长达半年未合入，但关注度极高（35 赞）。
- **[#145022] 高并发 Kanban 崩溃**：创建于 2026-10-26，由于涉及并发下的状态竞态问题，短期较难解决，建议维护者排期。
- **PR 待合并积压**：目前系统内有 421 个待合并 PR，维护团队需要投入大量精力进行 Review，特别是集中在 Gateway 模块中（大量 `salvage` 和 `fix(gateway)` 前缀的 PR），建议优先处理影响会话状态和消息路由的修复，以降低架构重构带来的回归风险。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 (2026-11-02)

### 1. 今日速览
过去24小时 AstrBot 项目保持高活跃度，社区共记录 19 条 Issues 更新和 44 条 PR 更新，无新版本发布。项目核心动态集中在 **Project Sync 引擎的性能优化与稳定性修复**，通过增加并发工作线程并修复同步逻辑，显著提升了大规模项目同步的效率。同时，团队快速响应了 **OpenAI 兼容渠道的重试机制缺陷**，修复了流式与非流式接口在最终重试成功时误报失败的严重回归 Bug。社区对多节点控制、插件市场多源聚合等高级功能需求讨论热烈，反映出现阶段用户对分布式部署及生态丰富度的强烈诉求。整体来看，项目维护者对核心引擎及稳定性问题响应迅速，工程化质量维持高位。

### 2. 版本发布
**今日无新版本发布。**

### 3. 项目进展
今日合并/关闭的重要 PR 主要集中在 Project 同步引擎的底层性能优化及安装程序修复上：

*   **[CLOSED] Project 同步并发策略回滚至安全值**:
    项目近期尝试提升 Project 同步效率，但今日 `[CLOSED]` 的 PR 显示团队将并发工作线程从激进的 8 线程回退至 4 线程，并保留了 120 分钟的作业超时限制。这表明维护团队在追求性能的同时，优先确保了同步任务的稳定性与回归测试通过。
    链接: [PR #10946](https://github.com/AstrBotDevs/AstrBot/pull/10946)
*   **[CLOSED] 安装脚本 Shell 环境变量修复**:
    修复了安装程序在添加可执行目录到 PATH 时，导致 `uv tool update-shell` 跳过更新 shell 配置的问题。此修复确保了用户在 Linux/macOS 下安装后无需手动配置即可正常使用 `astrbot` 命令。
    链接: [PR #10933](https://github.com/AstrBotDevs/AstrBot/pull/10933)
*   **[CLOSED] Project 同步性能优化与日志增强**:
    虽然部分并发 PR 被关闭，但今日也合入了基于 `git tag --contains` 替代 `git merge-base` 子进程循环的优化，大幅减少了全量协调时的外部命令调用，并增加了同步阶段的进度日志，提升了运维可观测性。
    链接: [PR #10935](https://github.com/AstrBotDevs/AstrBot/pull/10935), [PR #10939](https://github.com/AstrBotDevs/AstrBot/pull/10939)

### 4. 社区热点
*   **[Bug] Outbound voice 编转 WAV 导致 OneBot 帧溢出断连 (1009)**
    用户反馈在 `aiocqhttp` 适配器中，回复长 MP3 音乐时，语音被转码为 WAV 且 Base64 负载超过了 OneBot 协议帧长度限制，导致连接异常关闭。此问题直接影响了音乐播放类插件的核心体验，当前处于 Open 状态，已有 3 条评论讨论解决方案。
    链接: [Issue #10926](https://github.com/AstrBotDevs/AstrBot/issues/10926)
*   **[Feature] 新增多节点/多设备统一控制能力**
    社区对分布式部署的诉求升温，该 Issue 提出当前仅支持单节点独立控制，希望新增多设备批量接入、统一调度与协同任务执行能力。该 Issue 评论数较多（5 条），反映了集群化应用是 AstrBot 迈向更复杂场景的关键痛点。
    链接: [Issue #5195](https://github.com/AstrBotDevs/AstrBot/issues/5195)

### 5. Bug 与稳定性
今日报告的 Bug 集中在核心引擎逻辑缺陷及特定渠道兼容性问题上，按严重程度排列如下：

*   **[严重] OpenAI 兼容渠道流式接口最终重试误报失败 (已修复)**
    `text_chat_stream()` 在最后一次重试成功时，仍抛出之前的异常，导致流式响应中断。此为非流式 Bug (#10921) 的遗留问题，今日已有 PR 修复，使用 `for...else` 逻辑纠正异常抛出时机。
    相关: [Issue #10943](https://github.com/AstrBotDevs/AstrBot/issues/10943), [PR #10944](https://github.com/AstrBotDevs/AstrBot/pull/10944)
*   **[中等] 群聊历史图片转述导致视觉模型请求失败 (未修复)**
    `group_chat_context.py` 将本地文件路径直接传递给视觉模型，导致图片理解功能全部失败。经核实 4.29.3 和 4.29.4 版本文件 SHA256 一致，表明该 Bug 跨版本未修复。
    相关: [Issue #10918](https://github.com/AstrBotDevs/AstrBot/issues/10918)
*   **[中等] QQ 官方机器人空 @ 唤醒及问候生成期间消息丢失 (已有 PR)**
    单独 @ 机器人后发送不带 @ 的消息无法正确进入等待，且若第二条消息在 LLM 问候生成期间到达，会漏接后续消息。已有 PR 修复空 @ 识别及等待窗口逻辑。
    相关: [Issue #10937](https://github.com/AstrBotDevs/AstrBot/issues/10937), [PR #10940](https://github.com/AstrBotDevs/AstrBot/pull/10940)
*   **[轻微] 主动任务 (cron) 缺少插件工具导致模型输出原始调用文本 (已有 PR)**
    主动任务请求未合并会话中注册的插件工具及 MCP 工具，导致模型将工具调用标签作为正文发送给用户。已有 PR 修复工具集合并逻辑。
    相关: [Issue #10892](https://github.com/AstrBotDevs/AstrBot/issues/10892), [PR #10906](https://github.com/AstrBotDevs/AstrBot/pull/10906)

### 6. 功能请求与路线图信号
*   **[高优先级] 插件市场多源聚合展示**: 用户期望插件市场支持同时勾选多个源，合并搜索与展示，并标注插件来源。此功能能显著提升生态丰富度与用户体验，有望纳入近期版本。
    相关: [Issue #10919](https://github.com/AstrBotDevs/AstrBot/issues/10919)
*   **[中优先级] 模型自主判断主动回复**: 现有的概率约束过于僵硬，用户希望由模型判断是否回复主动消息，以提升交互自然度。
    相关: [Issue #10872](https://github.com/AstrBotDevs/AstrBot/issues/10872)
*   **[低优先级] OpenAI 兼容渠道思考字段自定义**: 不同上游渠道对思考内容字段命名不统一（如 `reasoning_content` vs `reasoning`），用户希望支持自定义字段名配置，提升对非标准中转站及 OpenRouter 的兼容性。
    相关: [Issue #9783](https://github.com/AstrBotDevs/AstrBot/issues/9783)

### 7. 用户反馈摘要
*   **痛点**: 在 Docker/Linux 环境下，Bot 发言前偶尔附带不明字符串（已关闭）；插件报错时日志筛选页面无法定位具体插件（已关闭）；删除默认唤醒词 `/` 后导致内置指令失效，缺乏 UI 提示（已有 PR 修复）。
*   **场景**: 用户在分布式部署（多设备管理）和长音频播放（音乐请求）场景下遇到限制；主动任务（定时提醒）中插件工具调用频繁出错。
*   **满意**: 维护团队对核心稳定性 Bug（如重试机制、安装脚本）的响应速度极快，PR 质量高且附有详尽的回归测试说明。

### 8. 待处理积压
*   **[长期关注] 多节点/多设备统一控制**: Issue #5195 自 2026-02-18 创建至今持续活跃，涉及架构级变更，需评估是否作为独立模块化项目或核心功能推进。
    链接: [Issue #5195](https://github.com/AstrBotDevs/AstrBot/issues/5195)
*   **[长期关注] 网页搜索多 Key 轮询重试机制缺陷**: 部分 Key 额度耗尽或失效时不触发下一 Key 重试，该问题自 10 月底提出，目前无 PR 修复，影响企业级高可用部署。
    链接: [Issue #10871](https://github.com/AstrBotDevs/AstrBot/issues/10871)
*   **[长期关注] 分段回复条数上限**: QQ 官方接口限制单条消息被动回复次数（群聊4次/私聊5次），用户请求增加分段上限设置以避免报错，该需求涉及核心消息调度逻辑，尚无 PR 处理。
    链接: [Issue #10914](https://github.com/AstrBotDevs/AstrBot/issues/10914)

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报

**报告日期：** 2026-11-02
**数据窗口：** 过去 24 小时 (截至 2026-11-01 24:00)

## 1. 今日速览
过去 24 小时内，DeepSeek Harness 社区活跃度维持高位，共新增 **182** 条 Discussions 更新，表明开发者与用户正在积极投入该智能体框架。由于该项目架构特殊性，未启用 GitHub Issues/PR 机制，代码演进与功能落地完全依赖 GitHub Releases 的 Changelog 进行发布，目前暂无最新 Release 版本，处于版本发布间隙期。今日讨论焦点高度集中在 **Windows 桌面端稳定性**、**跨平台（Linux）支持缺失** 以及 **Agent 记忆（Memory）机制的扩展** 上。大量高热度讨论反映了用户在 `dsh-desktop` 0.2.1-rc 版本上遇到的 Cookie 泄漏、沙箱初始化失败等严重影响使用体验的底层 Bug。

## 2. 版本发布
*无新的 Release 版本发布。*

## 3. 项目进展
*基于该项目“未启用 Issues/PR，代码合并经 Releases 落地”的设定，因当前无新 Release，故今日无新的功能合并或问题修复上线。*

## 4. 社区热点
以下 5 个主题代表了当前社区最核心的痛点与诉求（基于过去 24 小时评论数 Top 梯队数据）：

*   **[高呼声功能] 缺乏 Memory 机制与工具兼容性探索**
    *   **[开源讨论] #14 - [Ideas] 求一个memory能力**
        *   **热度：** 42 条评论
        *   **摘要：** 社区强烈呼吁官方提供 Agent 记忆（Memory）能力，并尝试寻找将 Claude Code 和 Codex 现有 Memory 机制快速迁移至 DSH 的可行方案，反映出用户对 Agent 长期上下文保持的高期待。
        *   **链接：** [github.com/deepseek-ai/deepseek-harness/discussions/14](https://github.com/deepseek-ai/deepseek-harness/discussions/14)
*   **[核心痛点] 跨平台支持极度失衡（Linux 被边缘化）**
    *   **[通用讨论] #8107 - [General] linux总是被遗忘...**
        *   **热度：** 36 条评论
        *   **摘要：** 用户指出目前 DSH 官方未支持 Linux，导致 Linux 开发者必须依赖第三方工具（WorkBuddy, Qoder）维持工作流，社区对此现状表达强烈不满，跨平台支持是阻碍其作为原生 Agent 框架在服务器端/全终端部署的关键壁垒。
        *   **链接：** [github.com/deepseek-ai/deepseek-harness/discussions/8107](https://github.com/deepseek-ai/deepseek-harness/discussions/8107)
*   **[底层Bug] Windows Native Computer-Use Tools 失效**
    *   **[问答讨论] #11207 - [Q&A] cua_driver_native_* tools are registered but never exposed to agents**
        *   **热度：** 17 条评论
        *   **摘要：** 在 DSH 2.0.20-next (desktop 0.2.1-rc.3, Win32) 环境下，`cua_driver_native__*` 原生操作工具虽然在内部注册成功，但未能挂载到 Agent 的工具表中，导致无法通过 DSH 执行桌面状态获取等原生动作，直接削弱了 DSH 作为“端侧智能体”的核心能力。
        *   **链接：** [github.com/deepseek-ai/deepseek-harness/discussions/11207](https://github.com/deepseek-ai/deepseek-harness/discussions/11207)
*   **[稳定性] Transport 频繁失败与输出错乱**
    *   **[问答讨论] #6987 - [Q&A] 本轮运行失败DeepSeek Messages transport failed**
        *   **热度：** 13 条评论
        *   **摘要：** 用户反馈自升级至 4.1 版本后，无论切换何种模型，`DeepSeek Messages transport` 均出现频繁失败。同时，相关讨论中也伴随有 DSML 标记泄漏至文本输出的现象（参见 #10100），暗示底层通信协议层在近期更新中发生了兼容性回归。
        *   **链接：** [github.com/deepseek-ai/deepseek-harness/discussions/6987](https://github.com/deepseek-ai/deepseek-harness/discussions/6987)
*   **[架构Bug] 代理环境下的 SSRF 拦截机制死锁**
    *   **[构想讨论] #5202 - [Ideas] web-fetch-http SSRF guard rejects every fetch under transparent-proxy fake-ip DNS**
        *   **热度：** 12 条评论
        *   **摘要：** 用户发现自 v0.1.2 后，默认网络抓包组件在透明代理（Fake-IP 架构，如 198.18.0.0/15 网段）环境下，SSRF 防护机制会无差别拦截所有 Fetch 请求，且现有配置中缺乏通过解析器或白名单绕过的能力（Escape Hatch），严重影响了企业级网络环境下对 Agent 的网络检索测试。
        *   **链接：** [github.com/deepseek-ai/deepseek-harness/discussions/5202](https://github.com/deepseek-ai/deepseek-harness/discussions/5202)

## 5. Bug 与稳定性
当前 0.2.1-rc.3 及 0.2.0-rc.2 版本的稳定性问题呈重灾区态势，主要集中于 Windows 端：

1.  **[P0 - 启动即崩溃] 本地认证 Cookie 无限累加撑爆请求头**
    *   **状态：** 已有用户附带最小修复补丁（Patch），但尚未合并。
    *   **详情：** 桌面端每次启动都会生成新的高权限 Cookie，旧 Cookie 永不清除。积累约 70 个后超过 Node.js 最大请求头限制（16384 字节），导致应用直接崩溃。重装无效，高频使用或经历自动更新的节点极易发生。
    *   **相关链接：** [Discussion #11408](https://github.com/deepseek-ai/deepseek-harness/discussions/11408) | [Discussion #11095](https://github.com/deepseek-ai/deepseek-harness/discussions/11095)
2.  **[P0 - 沙箱完全失效] 临时目录缺失导致 Workspace-Write 模式 0xC0000142 错误**
    *   **状态：** 开放，无修复代码。
    *   **详情：** 当 Windows 沙箱临时目录缺失时，系统不仅报错，甚至会导致同一会话内所有命令（包括 `Test-Path`）持续失败，且报错码 `0xC0000142` 暗示沙箱运行器（Runner）是 Electron (GUI子系统) 二进制文件引发的 DLL 初始化失败，底层架构存在设计缺陷。
    *   **相关链接：** [Discussion #9322](https://github.com/deepseek-ai/deepseek-harness/discussions/9322) | [Discussion #10066](https://github.com/deepseek-ai/deepseek-harness/discussions/10066)
3.  **[P1 - 自动更新死锁] koffi 库导致 Host 进程无法优雅退出**
    *   **状态：** 开放，无修复代码。
    *   **详情：** 桌面端执行 GUI 自动更新时，由于 `koffi` 库持续保持 Event Loop 存活，导致更新 Host 永远无法完成任务销毁并正常退出，最终用户只能手动杀进程更新。
    *   **相关链接：** [Discussion #9963](https://github.com/deepseek-ai/deepseek-harness/discussions/9963)
4.  **[P1 - 权限静默降级] Auto Review 模式重启后异常**
    *   **状态：** 开放。
    *   **详情：** 开启 Auto Review 后，若用户重启 DSH 客户端，权限会在无 UI 提示的情况下自动退化为 Full Access，导致安全防护机制形同虚设。
    *   **相关链接：** [Discussion #8578](https://github.com/deepseek-ai/deepseek-harness/discussions/8578)

## 6. 功能请求与路线图信号
1.  **[高优先] Agent 记忆 (Memory) 能力：** 讨论 #14 的高赞说明用户已跨入重度使用阶段，短期上下文机制无法满足长生命周期的任务编排需求。官方是否将提供类似 RAG 的本地向量化记忆，或是提供标准接口用于导入主流 Agent 框架的记忆库，将是下一代核心功能的分水岭。
2.  **[高优先] 服务端/长连接多租户架构支持：** 讨论 #6989 揭示了服务端长驻进程场景下的痛点——当人类审批（Human Approvals）请求在重启后丢失的容错机制。这表明 DSH 正在被部署到非单机的企业级生产环境中。引入“基于状态的持久化授权恢复”将是后续 Roadmap 的关键方向。
3.  **[中优先] Markdown 解析渲染优化：** 讨论 #5684 提出禁用单 `$` 引发的 KaTeX 误解析问题。属于 UX 层面的打磨，虽不影响核心功能，但在高频开发场景中会造成界面频繁闪烁或报错。
4.  **[低优先] 原生工具链补齐：** 讨论 #11207 中 `cua_driver_native__*` 工具无法在 UI 暴露，意味着当前版本“端侧控制”能力残缺。官方路线图应尽快修补此工具链注册漏洞。

## 7. 用户反馈摘要
基于过去 24h 的讨论内容提炼：

*   **主要痛点 1：Windows 客户端的脆弱性。** 大量用户（主要集中在 #11408, #10066, #11095）抱怨 0.2.x-rc 桌面端缺乏“自愈”能力，一旦 Cookie 溢出或沙箱目录异常，重启重装都难以恢复，严重影响生产力工具的基本可靠性预期。
*   **主要痛点 2：跨平台一致性差。** 用户群（特别是 #8107）明确指出 Linux 支持“总是被遗忘”，在 macOS/Windows 客户端逐步完善 UI 和 Desktop 端的同时，纯终端 CLI 用户在 Linux 上面临断代式体验。
*   **满意点/积极信号：** 开发者（如 @luoansheng2007-prog）和高级用户在讨论 #11408 中愿意直接提供底层源码定位和 Patch，说明 DSH 社区中存在一批具备深厚系统底子的开发者（DevRel 层面），这为后续修复 P0 级系统 Bug 提供了极佳的技术支撑。

## 8. 待处理积压
*维护者需重点关注以下几个长期未关闭且阻塞用户工作流的事项，建议通过下一版 Release 统一解决或给出明确排期：*

*   **[积压 - P0] Cookie 泄漏与沙箱崩溃修复：** 涉及 #11408 和 #10066。由于已有社区贡献最小补丁，建议维护者在下个 RC 版中合并该 Patch 并验证 Windows 沙箱运行器机制。
*   **[积压 - P1] Linux 平台一级支持：** 涉及 #8107。当前 DSH 无法在原生 Linux 下运行是极大的社区阻力，需明确未来 3-6 个月是否发布 Linux 原生二进制文件或官方指导 Docker 容器化部署方案。
*   **[积压 - P1] 服务端持久化授权：** 涉及 #6989。针对多租户/长连接服务端场景下的审批中断问题，需要架构层面的处理（如引入 SQLite 或持久化 State Store），这是决定 DSH 能否从个人桌面工具升维至企业级 Server Runtime 的关键。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*