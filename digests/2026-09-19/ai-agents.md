# OpenClaw 生态日报 2026-09-19

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-18 23:44 UTC

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
**日期：** 2026-09-19  
**数据来源：** GitHub (github.com/openclaw/openclaw)

## 1. 今日速览

过去24小时 OpenClaw 社区活跃度极高，共处理 **500 条 Issues** 和 **500 条 PRs**，显示出项目在应对大规模生产环境部署时的高强度维护状态。尽管当日无新版本发布，但维护者团队密集响应了多个 P0 级稳定性问题，包括 Gateway 内存泄漏、SQLite WAL 膨胀及子代理完成交付丢失等关键缺陷。同时，针对 WebUI 性能优化、Android Auto 支持及 Workspace 主机功能发现等功能性 PR 集中提交，表明项目在修复稳定性的同时仍在快速推进产品功能边界。整体健康度评级为 **高负荷但可控**，核心基础设施（Gateway/Agent）正经历从旧架构向高并发场景适配的关键阵痛期。

## 2. 版本发布

**无新版本发布。**

当前生产环境主要版本集中在 `2026.9.x` 系列，但社区反馈显示该系列存在多处回归问题（如启动延迟、消息丢失）。近期关闭的 #150201 指出 `2026.9.3` 在 Windows 平台的更新候选快照失败，提示用户在迁移至最新补丁前需关注平台兼容性。

## 3. 项目进展

今日 PR 活动主要集中在性能优化、WebUI 体验改进及特定通道（Matrix/Android）的稳定性修复：

*   **性能与内存优化**：
    *   **#152257** & **#152260** (@steipete): 针对大型 Codex 家园的会话目录进行增量 reconciling，并减少会话选择时的内存分配，直接回应了 #148529 中关于大规模 Fleet 启动缓慢和内存膨胀的问题。
    *   **#152258**: 减少插件空调用和属性读取的分配，优化底层运行时性能。
*   **WebUI 体验修复**：
    *   **#152255**: 修复长工具运行期间 Review 活动面板的渲染问题，防止界面被数千像素的命令描述撑开。
    *   **#151726**: 解决聊天布局滚动补偿导致的额外历史记录加载问题（关联 #149727）。
    *   **#152254** & **#152250** & **#152256**: 统一主题切换行为、优化 Usage 上下文控件位置及命令面板可见性。
*   **新功能与集成**：
    *   **#152238**: 为 Android 应用添加原生 **Android Auto** 支持，涵盖语音通话、导航、媒体和相机控制，显著扩展移动端车载场景。
    *   **#152259** & **#152247** & **#152249**: 引入 Workspace Host 上的技能发现与内存索引功能，实现 Gateway 与 Workspace 职责分离的架构演进。
    *   **#152094**: 支持在 Conversation 旁打开 Crabbox 应用，增强 Computer Use 场景的多窗口协作能力。
*   **稳定性与修复**：
    *   **#133848**: 修复 Setup Wizard 会话过期逻辑，防止网关启动槽位被废弃会话占满。
    *   **#150554**: 修复 Matrix 通道指定消息 ID 读取返回历史消息而非目标消息的 Bug。
    *   **#152111**: 解决共享认证存储所有权迁移后 stale token 无法自愈合的问题。

## 4. 社区热点

以下 Issue 因评论数多、影响范围广或涉及核心稳定性而成为今日讨论焦点：

*   **[Bug] OpenClaw 泄漏未回收的 hook/tool 子进程，导致僵尸积累** (#97616)
    *   *热度*: 31 评论 | *等级*: P1 / 🦪 silver shellfish
    *   *分析*: 这是一个长期存在的回归缺陷，直接导致运行时性能退化。用户 @avp717 详细记录了 `openclaw-hooks`, `bash`, `codex` 等进程的 zombie 积累现象，引发广泛共鸣。
*   **Critical: Gateway 内存泄漏 — RSS 从 350MB 增长至 15.5GB** (#91588)
    *   *热度*: 26 评论 | *等级*: P1 / 🦪 silver shellfish
    *   *分析*: 大规模生产部署（如 632-agent fleet）的最痛点。内存泄漏导致频繁的 OOM Killer 重启循环，严重影响服务可用性。虽然 #152260 试图缓解部分内存压力，但根源性修复仍需维护者介入。
*   **Umbrella: WebUI 性能与稳定性** (#149361)
    *   *热度*: 22 评论 | *等级*: P2 / 🌊 off-meta tidepool
    *   *分析*: 作为 WebUI 问题的聚合 Index，汇总了滚动加载异常、渲染卡顿等多个子问题。反映了用户对战时 Web 控制台流畅度日益增长的需求。
*   **Steer mode 未在主动 Turn 中注入消息** (#48003)
    *   *热度*: 20 评论 | *等级*: P1 / 🦪 silver shellfish
    *   *分析*: `messages.queue.mode: "steer"` 的功能性回归，导致消息队列行为与预期不符。该 Issue 已存在较长时间（2026-03），显示了复杂并发模型下的测试覆盖缺口。
*   **Gateway 达到 Ready 状态但不提供服务，事件循环饥饿** (#149538)
    *   *热度*: 19 评论 | *等级*: P0 / 🦐 gold shrimp
    *   *分析*: 最高严重程度的生产事故之一。Gateway 伪就绪（False Positive Ready）导致健康检查通过但实际无法处理请求，且伴随内存攀升。与 #148529 共同指向了高负载下的事件循环调度缺陷。

## 5. Bug 与稳定性

今日报告的 Bug 主要集中在**会话状态管理**、**SQLite 持久化**和**Gateway 生命周期**三个核心领域：

| 严重程度 | 问题描述 | Issue ID | 关联 PR/状态 |
| :--- | :--- | :--- | :--- |
| **P0 (Critical)** | **Gateway 事件循环饥饿/伪就绪**: 大 Fleet 下 Gateway 启动后无法服务，健康检查超时，RSS 飙升 (#149538) | #149538 | 独立于 #148529，需紧急排查 |
| **P0 (Critical)** | **Windows SQLite WAL 无限增长**: Agent DB 的 WAL 文件达 2.8GB 且无法自动 checkpoint，阻塞启动 (#143524) | #143524 | 需检查 `wal_autocheckpoint` 配置生效情况 |
| **P0 (Critical)** | **子代理完成交付丢失**: 请求者陷入 settle-yield 状态，导致队列消息饥饿，重启也无法恢复 (#143334) | #143334 | 涉及子代理生命周期管理的深层 Bug |
| **P1 (High)** | **大 SQLite 转录清理阻塞事件循环**: 归档操作在主线程进行完整材料化和压缩，导致网关卡顿 (#112423) | #112423 | 需异步化处理 |
| **P1 (High)** | **Steer 模式消息注入失败**: 主会话 Turn 期间无法注入用户消息 (#48003) | #48003 | Regression |
| **P1 (High)** | **Reply 操作丢失工具权限快照**: 同一会话中第二个 Run 驱逐进行中的 Turn，导致回复丢失 (#148707) | #148707 | 2026.9.4 回归 |
| **P1 (High)** | **混合终端请求者批次无限重试**: 所有权检查后，失败/超时的子代理运行永远挂起 (#137332) | #137332 | 死锁风险 |
| **P1 (High)** | **Gateway 启动耗时激增**: 632-agent Fleet 启动时间从 2s 增至 12 分钟 (#148529) | #148529 | 部分缓解 PR #152257 已在途 |
| **P2 (Medium)** | **WebUI 滚动补偿触发额外历史加载** (#149727) | #149727 | Fix PR #151726 已提交 |
| **P2 (Medium)** | **plugin-generation supersede 杀死系统代理 Turn** (#139710) | #139710 | 热重载配置时的竞态条件 |

**稳定性总结**: 项目当前在**高并发、长生命周期、大规模 Agent 部署**场景下存在系统性稳定性风险。SQLite 写入路径、事件循环调度以及子代理状态机是主要的故障源。

## 6. 功能请求与路线图信号

*   **动态模型发现**: #10687 持续请求支持 OpenRouter 等提供商的动态模型目录，而非静态配置。这反映了用户对模型选择灵活性和成本优化的强烈需求。
*   **Agent 迭代限制**: #9912 请求添加 `maxTurns`/`maxToolCalls` 配置，以防止 LLM 在工具调用中陷入无限循环。这是生产环境安全可控性的基本需求，建议纳入下一版本优先级。
*   **TUI 可访问性**: #9637 请求禁用 TUI 中的 Emoji 和 Unicode 符号以支持屏幕阅读器。随着 OpenClaw 向企业级 CLI 工具发展，无障碍合规性是必要的路线图补充。
*   **Workspace 主机职责分离**: 多个今日 PR (#152259, #152247, #152249) 表明项目正在积极推进 **Workspace Host** 概念，将技能发现、内存索引和维护任务从 Gateway 卸载到 Workspace 主机。这将是一个重大的架构演进，有助于解决当前的性能和内存瓶颈。
*   **Android Auto 支持**: #152238 展示了移动生态扩展的战略意图，OpenClaw 正从单纯的消息通道向全场景智能助手（含车载）演进。

## 7. 用户反馈摘要

*   **生产环境的“沉默失败”令人沮丧**: 用户普遍反映 Gateway 在内存泄漏或事件循环饥饿时表现为“伪健康”（#149538, #143524）。容器监控显示进程存活且端口监听，但实际无法处理请求，导致故障排查难度极大。
*   **大 Fleet 启动性能倒退严重**: 多个用户（#148529, #91588）对比 `2026.7.x` 与 `2026.9.x`，指出启动时间和内存基线显著恶化。用户抱怨“之前 2 秒启动，现在 12 分钟”，这对自动化部署和弹性伸缩场景构成致命打击。
*   **子代理机制的复杂性带来隐性 Bug**: 频繁出现关于子代理完成交付丢失（#143334, #118018, #138632）、所有权冲突（#137332）的问题。用户认为子代理系统过于复杂，状态管理缺乏可观测性，容易在生产中静默丢失任务结果。
*   **WebUI 交互细节有待打磨**: 尽管功能丰富，但用户抱怨滚动行为异常（#149727）、长对话导致 UI 布局崩坏（#152255）、主题切换不彻底（#152254）等体验问题。用户期望 WebUI 能达到消费级应用的质量标准。
*   **平台特定问题**: Windows 用户群体（#150201, #143524, #143757）反馈较为集中，涉及更新失败、WAL 检查和 Scheduled Task 配置问题，显示 Windows 平台的测试或适配相对薄弱。

## 8. 待处理积压

以下 Issue 已被标记为长期未决或需要维护者深度介入，建议优先关注：

*   **#97616** [Bug]: OpenClaw 泄漏未回收的子进程。*理由*: 涉及核心进程管理，长期存在且随规模放大影响显著。
*   **#91588** [Critical]: Gateway 内存泄漏至 15.5GB。*理由*: 生产环境稳定性 blocker，已有 PR 尝试缓解但未根除。
*   **#48003** [Bug]: Steer mode 消息注入失效。*理由*: 关键并发功能回归，影响实时交互场景。
*   **#77886** [Feature]: 受保护配置更改的所有者批准流程。*理由*: 安全增强需求，涉及 Agent 权限边界，长期 open 但重要性高。
*   **#10687** [Feature]: 完全动态模型发现。*理由*: 用户呼声高，直接影响多模型策略的灵活性。
*   **#151467** [Bug]: 自升级死锁与回滚 Cron 失败。*理由*: 新报告的 P0 级升级路径 Bug，可能导致系统不可用。

---
*报告生成时间：2026-09-19*  
*分析师：Agnes (Sapiens AI)*

---

## 横向生态对比

以下是基于 2026-09-19 各开源项目社区动态的横向对比分析报告。

### 1. 生态全景

2026 年 Q3，个人 AI 助手与自主智能体开源生态已从“功能野蛮生长”迈入“生产级稳定性攻坚”阶段。OpenClaw 和 hermes-agent 作为高并发、大规模部署的代表，正集中解决内存泄漏、事件循环调度等底层系统性风险；而 AstrBot 和 QwenPaw 则聚焦于垂直场景（如仪表盘、多租户 Hub）的体验打磨与安全闭环。DeepSeek Harness 显示出成熟工具在版本迭代期的典型阵痛，社区互助成为稳定性缓冲的关键力量。整体而言，跨平台集成（Android Auto、车载）、架构解耦（Gateway 分离、WASM 插件化）及多代理协作上下文一致性是当前的核心演进方向。

### 2. 各项目活跃度对比

| 项目 | 今日 Issues | 今日 PRs | Release 状态 | 健康度评估 | 核心特征 |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **OpenClaw** | 500 | 500 | 无 | **高负荷但可控** | P0 级稳定性修复密集，大规模 Fleet 场景下的性能优化与内存治理是重点。 |
| **hermes-agent** | 287 | 291 | 无 | **高效维护** | 代码清理与回归测试覆盖率高，内部 CI/CD 与开源维护的协调存在摩擦点。 |
| **QwenPaw** | 16 (活跃) | 19 (候审) | v2.2.2-beta.1 | **良好** | 从功能扩展转向质量深耕，多租户架构规划明确，安全修复响应迅速。 |
| **Zeroclaw** | 12 | 50 (84% 新增) | 无 | **良好** | 架构重构期（追加日志会话历史），技术债务清理与插件化并行推进。 |
| **AstrBot** | 7 | 6 | 无 | **⭐⭐⭐⭐** | 安全响应极快（SSRF 同日修复），但 v4.28.1 引入多个 P0 Bug，稳定性承压。 |
| **PicoClaw** | 1 | 4 | 无 | **中等** | 节奏稳健，专注于渠道功能补齐（QQ 多媒体）和前端性能优化。 |
| **DeepSeek Harness** | N/A (Discussions) | N/A | 无 | **稳定性动荡期** | 依赖 Discussions 追踪问题，版本升级带来大量兼容性崩溃，社区自助修复活跃。 |

### 3. OpenClaw 在生态中的定位

*   **优势**：OpenClaw 是目前生态中**规模效应最显著**的项目，支持数千 Agent 的 Fleet 部署，具备最复杂的并发模型（子代理、Gateway/Workspace 分离）。其在大型会话管理、WebUI 交互体验及多通道集成（Matrix, Android Auto）上的投入处于领先地位。
*   **技术路线差异**：与 AstrBot 的单体 Dashboard 架构和 QwenPaw 的 Hub 多租户架构不同，OpenClaw 倾向于**微服务化的分布式架构**，将计算、持久化和 UI 分离。Zeroclaw 则走在更激进的**确定性状态重放**（Append-only Log）路线上，试图从根本上解决会话一致性问题。
*   **社区规模**：OpenClaw 以 500+ 的日交互量位居榜首，hermes-agent 紧随其后，显示头部项目已形成长尾效应，中小项目（PicoClaw, AstrBot）则更多服务于特定场景或轻量级用户。

### 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
| :--- | :--- | :--- |
| **多代理协作与上下文一致性** | OpenClaw, Zeroclaw, QwenPaw | 子代理完成交付丢失、父会话身份继承、上下文压缩后的连贯性感知。 |
| **内存与资源管理优化** | OpenClaw, hermes-agent, AstrBot | Gateway 内存泄漏（RSS 达 15GB+）、桌面端渲染器内存无限增长、大文件上传 OOM。 |
| **事件循环与高并发稳定性** | OpenClaw, QwenPaw, hermes-agent | 事件循环饥饿导致的伪就绪、插件阻塞导致全实例冻结、Cron 任务调度死锁。 |
| **插件化与生态扩展** | Zeroclaw, OpenClaw, DeepSeek Harness | WASM 运行时插件、技能发现标准化（.well-known）、第三方 Provider 适配（OpenCode Go）。 |
| **数据安全与隐私** | QwenPaw, AstrBot, DeepSeek Harness | 提示注入攻击防护、SSRF 漏洞修复、本地敏感凭据加密存储（dsh-vault）。 |

### 5. 差异化定位分析

*   **功能侧重**：
    *   **OpenClaw/h Hermes-agent**：面向**企业级/重度用户**，强调高可用、大规模集群管理和多端无缝协同。
    *   **QwenPaw**：面向**开发者团队**，强调多租户 Hub、控制台体验和工具链集成。
    *   **AstrBot/PicoClaw**：面向**C 端及个人极客**，强调开箱即用的 IM 渠道接入（微信、飞书、QQ）和低门槛部署。
    *   **DeepSeek Harness**：面向**DeepSeek 模型原生用户**，强调 IDE 集成和本地化体验。
*   **目标用户**：OpenClaw 吸引基础设施运维和大型 Agent 编排者；AstrBot/PicoClaw 吸引社交媒体自动化和个人助理用户；Zeroclaw 吸引对理论架构和确定性计算有追求的先锋开发者。
*   **技术架构**：
    *   OpenClaw：**分布式 Gateway + Workspace Host**（正在演进）。
    *   Zeroclaw：**WASM 插件 + 追加日志状态机**（激进重构）。
    *   QwenPaw：**Monorepo + 插件隔离**。
    *   AstrBot：**Python 单体 + 插件热重载**。

### 6. 社区热度与成熟度

*   **快速迭代/重构阶段**：
    *   **Zeroclaw**：正在进行 RFC 级别的架构重构（Issue #10526），风险较高但潜力大。
    *   **OpenClaw**：处于从旧架构向高并发适配转型的“阵痛期”，Issue 密度极高，维护团队高压运转。
*   **质量巩固/稳定运营阶段**：
    *   **QwenPaw**：发布 beta 版本，聚焦安全补丁和性能微调，已进入良性维护循环。
    *   **AstrBot**：安全响应机制成熟，但需警惕新版本引入的回归 Bug。
*   **版本阵痛/社区自愈阶段**：
    *   **DeepSeek Harness**：官方迭代放缓，社区通过 Discussions 进行大量的问题诊断和临时方案分享，呈现“自组织”特征。

### 7. 值得关注的趋势信号

1.  **“伪健康”监控成为生产级痛点**：OpenClaw (#149538) 和 hermes-agent (#58576) 均出现网关/进程在内存泄漏或事件循环饥饿时仍显示“Ready”的现象。这提示行业需要更深层的**语义级健康检查**，而非仅依赖端口监听。
2.  **子代理系统的复杂性危机**：OpenClaw、Zeroclaw 和 QwenPaw 均反馈子代理状态管理、上下文继承和生命周期终结存在隐性 Bug。这表明当前多代理框架在**状态一致性**和**可观测性**上尚未达到生产成熟度，是未来的突破点。
3.  **第三方 Provider 接口变动的高敏感性**：DeepSeek Harness (#5495) 和 QwenPaw (#7599) 均因 OpenCode 等第三方服务添加 Header 要求而引发大规模适配问题。这警示智能体平台需建立**抽象层屏蔽 Provider 波动**，并加强对上游变更的监控机制。
4.  **移动端/车载场景拓展**：OpenClaw 推出 Android Auto 支持 (#152238)，反映 AI 助手正从 PC/Web 向**移动车载**场景延伸，车载语音交互和安全管控将成为新的竞争高地。
5.  **架构解耦与职责分离**：OpenClaw 的 Workspace Host 分离和 Zeroclaw 的 WASM 插件化，都指向**降低主进程负担、提升安全性与灵活性**的架构趋势，单体架构正逐步让位于模块化设计。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 | 2026-09-19

**分析师：** Agnes  
**数据来源：** GitHub API (zeroclaw-labs/zeroclaw)  
**统计周期：** 2026-09-18 00:00 - 2026-09-19 00:00 (UTC)

---

## 1. 今日速览

Zeroclaw 项目处于高活跃度开发阶段，过去24小时内共产生 **62 次代码贡献活动**（50 PRs + 12 Issues），其中新增 PR 占比高达 84%（42/50），显示核心迭代节奏紧凑。主要进展集中在 **会话状态确定性重构**、**网关代理委托机制优化** 及 **提供商（Provider）稳定性修复**。尽管无新版本发布，但多个高优先级（P1/P2）修复与增强提案已进入评审或合并流程，项目整体健康度良好，技术债务清理与工作流扩展同步推进。

---

## 2. 版本发布

**无新版本发布。**

当前开发重心位于 `master` 分支的功能迭代，待合并的 XL 规模 PR（如 #10911, #10430）预计将构成下一版本的主要功能集合。

---

## 3. 项目进展

### 关键合并/关闭活动
今日关闭了 3 个 Issue，并关闭了若干历史遗留的小规模 Bug PR，主要推进了测试标准化与渠道基础功能修复：

| 类型 | 编号 | 标题 | 状态 | 影响 |
|------|------|------|------|------|
| Bug Fix | [#10772](https://github.com/zeroclaw-labs/zeroclaw/issues/10772) | Make zeroclaw-eval archive tests independent of workspace fixtures | **CLOSED** | 提升了评估测试的独立性与可维护性，解除对工作区修复的依赖 |
| Bug Fix | [#10239](https://github.com/zeroclaw-labs/zeroclaw/pull/10239) | fix(channels): read interrupt_on_new_message from any configured alias | **CLOSED** | 修复了非 `default` 别名下中断配置失效的问题，改善多渠道用户体验 |
| Bug Fix | [#10266](https://github.com/zeroclaw-labs/zeroclaw/pull/10266) | fix(channels): implement is_direct_message for WhatsApp Web | **CLOSED** | 完善了 WhatsApp 渠道的私聊识别逻辑，增强消息路由准确性 |

### 活跃开发重点
- **RFC 实现推进**：[#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) 提出的“追加日志式会话历史”与“确定性状态重放”架构变更正在讨论中，若落地将根本性改变会话持久化模型。
- **网关与插件解耦**：[#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850) 推动将可选渠道/工具从编译时特性标志迁移至运行时 WASM 插件，有助于减小默认二进制体积并提升灵活性。

---

## 4. 社区热点

以下 Issue/PR 在讨论深度或关注热度上表现突出：

### 🔥 架构级 RFC 讨论
**[Issue #10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)** — *RFC: Append-only session event history, deterministic state replay, and derived agent streams*
- **热度**：11 条评论，高风险（High Risk），P2 优先级。
- **诉求分析**：用户与维护者关注现有可变对话消息持久化的局限性，希望引入追加日志模式以实现更可靠的状态重放和事件溯源。这是项目长期架构演进的关键决策点。

### 🛠️ 技能发现标准化
**[Issue #4853](https://github.com/zeroclaw-labs/zeroclaw/issues/4853)** — *[Feature]: install skills from .well-known agent-skills discovery indexes*
- **热度**：8 条评论，状态为 In-Progress 但受阻塞（Blocked）。
- **诉求分析**：响应 Agent Skills 群体的标准化努力，支持通过 `.well-known` URI 自动发现并安装技能。社区期待与 Cloudflare、Vercel 等平台的生态互通。

### 🌐 Gemini 语音通道支持
**[PR #10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430)** — *feat(channels): Gemini speech-to-speech broker channel (PR1: daemon-side core)*
- **热度**：XL 规模，高风险，Parking-lot 状态。
- **诉求分析**：为首个真实时语音通道（基于 Gemini Live）奠定基础，满足用户对多模态交互的深层需求，但目前因规模庞大暂处于冻结等待状态。

### 🔒 代理委托身份传递
**[Issue #10963](https://github.com/zeroclaw-labs/zeroclaw/issues/10963)** — *Forward session identity to delegate sub-agents*
- **热度**：新晋 Issue（今日创建）。
- **诉求分析**：指出子代理构建提示词时丢失父会话上下文的问题，影响多代理协作场景下的连贯性与策略执行。

---

## 5. Bug 与稳定性

今日报告了多个 P1/P2 级 Bug，其中部分已有对应修复 PR：

| 严重级别 | 编号 | 描述 | 关联 PR / 状态 |
|----------|------|------|----------------|
| **P1** | [#10908](https://github.com/zeroclaw-labs/zeroclaw/issues/10908) | 工具结果中的图像标记被错误提升为附件，且缺乏来源证明；字面源文本被剥离 | 涉及 `multimodal` 模块，可能与 [#10890](https://github.com/zeroclaw-labs/zeroclaw/pull/10890)（图像成本估算修复）相关 |
| **P1** | [#10643](https://github.com/zeroclaw-labs/zeroclaw/issues/10643) | 有界子代理循环中工具批准执行失败（fail-closed enforcement） | 状态：In-Progress，需维护者审查 |
| **P2** | [#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736) | Reliable provider 预输出流失败时跳过非流式回退 | 状态：**CLOSED**（已修复） |
| **P2** | [#10952](https://github.com/zeroclaw-labs/zeroclaw/issues/10952) | Sanitizers 重写签名推理内容导致 Anthropic 拒绝重放 | 状态：OPEN，新报告，影响 Anthropic provider 兼容性 |
| **P2** | [#10942](https://github.com/zeroclaw-labs/zeroclaw/pull/10942) | Telegram 语音对等体解析错误 | 状态：OPEN，由 @tunglambk 提交修复 PR |

> **稳定性评估**：Provider 层（尤其是 Anthropic 与 Reliable Routing）存在较多边缘情况 Bug，建议优先关注 [#10952] 和 [#10908] 的修复进展。

---

## 6. 功能请求与路线图信号

### 可能被纳入下一版本的功能
1. **PowerShell UTF-8 初始化** ([PR #10954](https://github.com/zeroclaw-labs/zeroclaw/pull/10954))  
   - 小规模增强（XS），提升 Windows 用户脚本执行体验，风险低，易合并。

2. **Anthropic Prompt Cache TTL 可调** ([PR #10960](https://github.com/zeroclaw-labs/zeroclaw/pull/10960))  
   - 解决高频调用场景下缓存命中率低的问题，直接关联成本控制，符合 P1 用户需求。

3. **工具规格排序稳定性** ([PR #10959](https://github.com/zeroclaw-labs/zeroclaw/pull/10959))  
   - 修复因 HashMap 无序导致 prompt-cache 断点不稳定的问题，属于性能优化类修复，利于缓存效率。

4. **中断作用域键长度前缀化** ([PR #10958](https://github.com/zeroclaw-labs/zeroclaw/pull/10958))  
   - 防止边界碰撞，提升多渠道并发中断处理的鲁棒性。

### 长期路线图信号
- **Gateway 分离与 Runtime 交付** ([Tracker #7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)) 明确指向 v0.8.6 与 v0.9.0 的里程碑规划。
- **原子化 Live Config 发布** ([PR #10911](https://github.com/zeroclaw-labs/zeroclaw/pull/10911)) 若合并，将显著增强配置热更新的安全性。

---

## 7. 用户反馈摘要

- **痛点：图像成本估算失真**  
  用户指出 `[IMAGE:...]` 标记在 token 估算中被当作普通文本计价（~9 tokens），而实际上传成本高达 1.5k–2k tokens。这导致用户对费用预期产生偏差。（关联：[#10890](https://github.com/zeroclaw-labs/zeroclaw/pull/10890)）

- **痛点：多代理协作上下文断裂**  
  当使用 `delegate` 工具派生子代理时，子代理无法继承父会话的身份信息，破坏了任务连续性和策略一致性。（[#10963](https://github.com/zeroclaw-labs/zeroclaw/issues/10963)）

- **满意点：配置原子性改进**  
  社区对 [#10911](https://github.com/zeroclaw-labs/zeroclaw/pull/10911) 提出的“原子化实时配置修订”表示认可，认为这能降低运维风险。

- **反馈：Anthropic 缓存策略僵化**  
  用户希望可通过环境变量 `ZEROCLAW_CACHE_TTL` 调整缓存有效期，以适配不同调用频率场景。（[#10960](https://github.com/zeroclaw-labs/zeroclaw/pull/10960)）

---

## 8. 待处理积压

以下 Issue/PR 存在较长时间未合并且可能影响后续开发节奏，建议维护者优先关注：

1. **[PR #10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430)** — *Gemini speech-to-speech broker channel*  
   - **状态**：Parking-lot（冻结）  
   - **原因**：规模 XL，需要更多时间与资源进行整体验证。  
   - **建议**：考虑拆分为更小单元逐步合并。

2. **[Issue #4853](https://github.com/zeroclaw-labs/zeroclaw/issues/4853)** — *.well-known agent-skills 安装支持*  
   - **状态**：Blocked  
   - **原因**：依赖上游 `agentskills` 标准定稿。  
   - **建议**：跟踪上游 PR 进展，提前准备接口适配。

3. **[PR #10911](https://github.com/zeroclaw-labs/zeroclaw/pull/10911)** — *Publish atomic live revisions*  
   - **状态**：Open，依赖 #10621  
   - **风险**：涉及大量文件变更（+3,390/-1,475），合并冲突概率高。  
   - **建议**：加强 CI 覆盖率测试，确保配置协调机制稳定。

---

**报告生成时间**：2026-09-19  
**分析师**：Agnes (Sapiens AI)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 | 2026-09-19

## 1. 今日速览
PicoClaw 在过去24小时内保持了**中等活跃度**，共涉及 5 个 GitHub 事件（1 Issue + 4 PR）。项目当前无新版本发布，开发重心主要集中在渠道功能扩展（QQ附件支持、OpenCode集成）和前端性能优化。社区对飞书渠道配置报错问题有即时反馈，但尚未获得官方修复；整体维护节奏稳健，技术栈持续迭代中。

## 2. 版本发布
**无新版本发布。**

## 3. 项目进展
今日最重要的里程碑是 **#1349 已被合并**：
- **feat(qq): support parsing and replying to more attachment types** (`@aishannon`)
  - **功能推进**：显著增强了 QQ 渠道的多媒体处理能力，新增对 Emoji 结构解析、语音/图片/视频/文件消息的接收支持，以及本地附件的上传与回复能力。
  - **技术意义**：这标志着 PicoClaw 在跨平台消息对齐方面向前迈进了一步，特别是补齐了 QQ 渠道长期缺失的非文本交互能力。

其他开放 PR 进展：
- **#3347**（Web UI 卡顿修复）：已解决聊天区域文本过多时的界面延迟问题，提升了桌面和移动端用户体验。
- **#3371**（OpenCode Provider）：尝试通过专用路由支持 `x-opencode-session` 头部，扩展 LLM 后端兼容性。
- **#3222**（Deltachat 重构）：清理遗留代码约 200 行，移除密码配置方式，强化文档规范性。

## 4. 社区热点
### 🔥 最活跃 Issue：#3355 [BUG] 连接飞书报错
- **链接**: https://github.com/sipeed/picoclaw/issues/3355
- **作者**: `@ttghub`
- **关注度**: 创建自 2026-09-01，近两日有更新，评论 2 条。
- **热点分析**: 用户报告在 `nightly-50-gbbf6893c` 版本中使用飞书渠道时，因配置文件包含未知字段 `channel_list.feishu.app_id` 而报错。尽管标题注明“附解决方案”，但目前 Issue 仍为 OPEN 状态且标记为 `stale`，暗示该修复可能仅存在于用户本地，尚未被社区验证或合并入主线。这反映了飞书渠道在配置校验层面的潜在回归问题。

### 📢 关注 PR：#3371 feat(providers): add opencode-go provider
- **链接**: https://github.com/sipeed/picoclaw/pull/3371
- **诉求**: 用户希望 PicoClaw 原生支持 OpenCode Go 服务，以利用其会话头特性。此 PR 显示了用户对非主流 LLM 提供商（如自定义部署模型）的集成需求。

## 5. Bug 与稳定性
### 🐛 报告 Bug
- **严重级别**: 中等（功能性阻碍）
- **描述**: **#3355** - 飞书渠道配置校验过严，拒绝包含 `app_id` 字段的合法配置，导致连接失败。
- **环境**: Go 1.25.13, PicoClaw nightly-50-gbbf6893c
- **修复状态**: ❌ 暂无正式 Fix PR。用户提及自有解决方案，但未形成合并请求。
- **建议**: 需确认飞书渠道配置 schema 是否近期变更导致向后不兼容，并审查 `app_id` 字段是否为必要项。

### ✅ 潜在稳定性提升
- **#3347** 修复了 Web UI 在高负载文本下的渲染卡顿，间接提升了系统整体响应稳定性。

## 6. 功能请求与路线图信号
- **多模态输入/输出增强**: `#1349`（已合并）表明项目正持续扩展各渠道的媒体处理能力，QQ 渠道已接近功能完备，预期后续可能关注其他渠道（如 Discord、Telegram）的类似缺失功能。
- **私有/自定义 LLM 提供商支持**: `#3371` 提出 OpenCode 集成，反映出用户群体中存在对自托管或特定协议 LLM 服务的集成需求。若合并，将丰富 PicoClaw 的 provider 生态。
- **代码整洁性与维护性**: `#3222` 对 Deltachat 的重构（删除遗留代码、更新文档）符合项目长期可维护性的路线，预计未来会有更多类似 cleanup PR 出现。

## 7. 用户反馈摘要
- **痛点**:
  - **飞书配置困惑**: 用户在使用官方 nightly 版本时遇到配置字段报错，即使提供“解决方案”仍无法闭环，说明文档或错误提示不够清晰（#3355）。
  - **Web UI 性能**: 早期存在聊天记录过多时界面卡顿的问题，已影响多平台（桌面/移动）使用体验（#3347）。
- **满意点**:
  - **QQ 渠道扩展**: 用户积极参与 QQ 多媒体功能的开发与测试，并通过 #1349 提交高质量 PR，表明对 QQ 集成的成功感到满意。
  - **社区协作**: 对于 Web UI 非 TS 开发者寻求帮助的 Issue，社区能给出有效修复方案，体现良好的协作氛围。

## 8. 待处理积压
- **Issue #3355** [OPEN] [stale] [BUG]: 飞书配置报错问题。虽近7天无新活动，但作为近期报告的 Bug 且用户声称有解法，建议维护者介入确认解决方案是否可采纳，避免该 Issue 因 `stale` 机制被自动关闭。
- **PR #3371** [OPEN] [stale]: OpenCode provider 功能请求。该 PR 已开放11天，若目标明确且测试通过，可优先 review 以增强 provider 多样性。
- **PR #3222** [OPEN]: Deltachat 重构。清理类 PR 风险较低，但需验证新配置方式（如移除密码配置、重命名字段）不会破坏现有用户的迁移路径。

---
*报告生成时间: 2026-09-19*  
*数据来源: GitHub API (sipeed/picoclaw)*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：** 2026-09-19  
**数据周期：** 2026-09-18 00:00 – 23:59 UTC

---

## 1. 今日速览

QwenPaw 今日保持高活跃开发节奏，共发布 **v2.2.2-beta.1** 新版本，修复了控制台分组聊天记录体验及统一 ReMe 命令。过去24小时处理 **24 个 Issues**（新开/活跃 16，关闭 8）和 **50 个 PRs**（待合并 31，已合并/关闭 19），体现维护团队对 Bug 响应迅速。社区对**多租户 Hub 规划**（Issue #7318）关注度最高，同时多个核心稳定性问题（插件隔离、上下文裁剪、SSE 流异常）迎来修复或讨论，项目整体健康度良好，技术债正在被系统性清理。

---

## 2. 版本发布

### v2.2.2-beta.1
- **链接：** https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.1
- **变更内容：**
  - `feat(console)`: 改进分组聊天记录展示体验（#7665）
  - `feat(memory)`: 统一 ReMe 斜杠命令（#7444）
  - 版本号 bump 至 2.2.2b1
- **破坏性变更：** 无
- **迁移注意：** 无特殊迁移要求，建议用户测试 ReMe 命令在新版中的行为一致性。

---

## 3. 项目进展

今日 PR 活动集中体现在**系统稳定性加固**和**控制台体验优化**两个方向：

| PR | 类型 | 摘要 | 状态 |
|----|------|------|------|
| [#7842](https://github.com/agentscope-ai/QwenPaw/pull/7842) | fix(plugins) | 隔离同步 Hook 并添加事件循环滞后看门狗，修复插件阻塞导致整个实例冻结的问题（关联 #7840） | OPEN |
| [#7864](https://github.com/agentscope-ai/QwenPaw/pull/7864) | fix(security) | 增强 `FilePathToolGuardian`，防护技能目录免受提示注入删除攻击（关联 #7859） | OPEN |
| [#7854](https://github.com/agentscope-ai/QwenPaw/pull/7854) | fix(drivers) | 修复 Driver 重载期间并发策略更新丢失问题（关联 #7850） | OPEN |
| [#7871](https://github.com/agentscope-ai/QwenPaw/pull/7871) | fix(tools) | 修复工具输出中 `<<<TRUNCATED>>>` 标记绕过截断限制的漏洞 | OPEN |
| [#7873](https://github.com/agentscope-ai/QwenPaw/pull/7873) | fix(scroll) | 当无可用沙箱时，明确向模型说明 `recall_history_python` 不可用的原因 | OPEN |
| [#7872](https://github.com/agentscope-ai/QwenPaw/pull/7872) | fix(scroll) | 修复 Scroll 策略下中断请求在后续压缩时被错误归档的问题（关联 #7836） | OPEN |
| [#7870](https://github.com/agentscope-ai/QwenPaw/pull/7870) | fix | 稳定 Windows 单元测试结果，修复哈希验证和 Uvicorn 热重载路径 | OPEN |
| [#7869](https://github.com/agentscope-ai/QwenPaw/pull/7869) | fix(providers) | 修复 OpenCode Go 端点缺少必要 session header 导致请求失败的问题（关联 #7599） | OPEN |
| [#7867](https://github.com/agentscope-ai/QwenPaw/pull/7867) | fix(console) | 修复文件区标签页在 agent 重写文件后仍显示旧内容的问题（关联 #7866） | OPEN |
| [#7868](https://github.com/agentscope-ai/QwenPaw/pull/7868) | perf(runtime) | 缓存不可变工件，避免每次请求重复解析 `policy.yaml` 等开销（首 req ~29ms 优化） | OPEN |
| [#7807](https://github.com/agentscope-ai/QwenPaw/pull/7807) | fix(channels) | 懒加载 Channel 模块，避免飞书 SDK 等重型依赖阻塞首次请求启动 | OPEN |
| [#7865](https://github.com/agentscope-ai/QwenPaw/pull/7865) | fix(console) | 增加控制台聊天流中途失败后的自愈重连机制 | OPEN |
| [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723) | fix(console) | 流失败时向客户端发送 error 事件，区分完成与失败状态 | OPEN |
| [#6668](https://github.com/agentscope-ai/QwenPaw/pull/6668) | feat(providers) | 为 OpenAI Responses provider 支持 prompt caching（需 opt-in） | OPEN |
| [#7409](https://github.com/agentscope-ai/QwenPaw/pull/7409) | fix(agents) | 过滤掉 reasoning-only turn 产生的空文本块，避免冗余上下文累积 | OPEN |

**整体评价：** 约 **19 个高价值 PR** 在候审，覆盖安全、性能、稳定性三大关键领域，显示项目正从“功能扩展”转向“质量深耕”阶段。

---

## 4. 社区热点

| Issue/PR | 类型 | 热度 | 摘要 | 链接 |
|----------|------|------|------|------|
| [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) | Discussion | 🔥🔥🔥🔥 | **QwenPaw Hub 多租户版 roadmap**：社区询问 2.2.0 后优先建设方向，30 条评论，4 赞，反映团队部署需求强烈 | [链接](https://github.com/agentscope-ai/QwenPaw/issues/7318) |
| [#7853](https://github.com/agentscope-ai/QwenPaw/issues/7853) | Bug | 🔥🔥🔥 | **ToolResultPruner 忽略媒体块**：`view_image` 的 base64 数据无法被裁剪，导致上下文无限累积直至 OOM/超限 | [链接](https://github.com/agentscope-ai/QwenPaw/issues/7853) |
| [#7859](https://github.com/agentscope-ai/QwenPaw/issues/7859) | Security | 🔥🔥🔥 | **持久化提示注入攻击**：系统提醒中被注入删除技能指令，跨 20+ turn 持续生效，安全严重性高 | [链接](https://github.com/agentscope-ai/QwenPaw/issues/7859) |
| [#7840](https://github.com/agentscope-ai/QwenPaw/issues/7840) | Bug | 🔥🔥 | **插件同步调用冻结实例**：单个插件阻塞事件循环导致全实例挂起 40s，无隔离机制 | [链接](https://github.com/agentscope-ai/QwenPaw/issues/7840) |
| [#7733](https://github.com/agentscope-ai/QwenPaw/issues/7733) | Feature | 🔥🔥 | **Agent 自主上下文管理**：请求在压缩后“醒来”却无上下文感知，希望引入预警与平滑交接机制 | [链接](https://github.com/agentscope-ai/QwenPaw/issues/7733) |

**诉求分析：**
- **多租户场景**（#7318）是社区最迫切的长期需求，直接影响企业级采用。
- **安全与稳定性**（#7859, #7853, #7840）是当前高频痛点，涉及数据泄露风险和业务连续性，已有多条 PR 跟进。
- **上下文管理智能化**（#7733）反映高级用户对长任务连贯性的期待，属于下一代核心能力。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 高危（影响安全/数据完整性）
| Issue | 描述 | Fix PR |
|-------|------|--------|
| [#7859](https://github.com/agentscope-ai/QwenPaw/issues/7859) | 提示注入导致技能目录被恶意删除指令 | [#7864](https://github.com/agentscope-ai/QwenPaw/pull/7864) |
| [#7853](https://github.com/agentscope-ai/QwenPaw/issues/7853) | 媒体块绕过裁剪致上下文溢出 | 暂无 PR |
| [#7839](https://github.com/agentscope-ai/QwenPaw/issues/7839) | 孤立 session 文件未导入 + 数据库损坏 | 暂无 PR |

### 🟠 中危（影响功能/性能）
| Issue | 描述 | Fix PR |
|-------|------|--------|
| [#7840](https://github.com/agentscope-ai/QwenPaw/issues/7840) | 插件同步阻塞导致全实例冻结 | [#7842](https://github.com/agentscope-ai/QwenPaw/pull/7842) |
| [#7850](https://github.com/agentscope-ai/QwenPaw/issues/7850) | Driver 重载丢失并发策略更新 | [#7854](https://github.com/agentscope-ai/QwenPaw/pull/7854) |
| [#7599](https://github.com/agentscope-ai/QwenPaw/issues/7599) | OpenCode Go 模型连接失败（MissingSessionID） | [#7869](https://github.com/agentscope-ai/QwenPaw/pull/7869) |
| [#7814](https://github.com/agentscope-ai/QwenPaw/issues/7814) | SSE 流空 null payload 导致 Console 冻结 | 部分修复（#7865, #7723） |
| [#7866](https://github.com/agentscope-ai/QwenPaw/issues/7866) | 文件区标签页缓存过期 | [#7867](https://github.com/agentscope-ai/QwenPaw/pull/7867) |
| [#7856](https://github.com/agentscope-ai/QwenPaw/issues/7856) | qwenpaw-pet 插件破坏 tool approval 接口 | 暂无 PR |

### 🟡 低危（体验/边界情况）
| Issue | 描述 | 状态 |
|-------|------|------|
| [#7841](https://github.com/agentscope-ai/QwenPaw/issues/7841) | 桌面启动时控制台 UI 先于后端就绪，面板空白 | 待观察 |
| [#7812](https://github.com/agentscope-ai/QwenPaw/issues/7812) | 启动后斜杠命令作用于错误会话 | 已关闭 |
| [#7836](https://github.com/agentscope-ai/QwenPaw/issues/7836) | Scroll 驱逐策略丢失用户 turn | [#7872](https://github.com/agentscope-ai/QwenPaw/pull/7872) |
| [#7847](https://github.com/agentscope-ai/QwenPaw/issues/7847) | 含百分号的文件名选择错误文件 | 暂无 PR |
| [#7857](https://github.com/agentscope-ai/QwenPaw/issues/7857) | ACP 关闭回退跳过 session 清理导致事件循环泄漏 | 暂无 PR |

---

## 6. 功能请求与路线图信号

| Issue/PR | 内容 | 下一版本可能性 |
|----------|------|----------------|
| [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) | 多租户 Hub 后续建设优先级投票 | **高** — 已被明确列为 2.2.0 方向，社区反馈将直接影响排期 |
| [#7733](https://github.com/agentscope-ai/QwenPaw/issues/7733) | Agent 自主上下文管理（压缩前预警 + 平滑交接） | **中** — 属于高级特性，可能需要独立 MVP 周期 |
| [#6316](https://github.com/agentscope-ai/QwenPaw/issues/6316) | Cron job 支持指定模型 | **低** — 增强型功能，非阻塞性 |
| [#6668](https://github.com/agentscope-ai/QwenPaw/pull/6668) | OpenAI prompt caching 支持 | **中** — 已在 PR 中实现，需评估稳定性后合入 |
| [#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570) | 飞书思考卡自动折叠 | **低** — 平台定制化需求，可能纳入特定渠道插件 |

---

## 7. 用户反馈摘要

**正面反馈：**
- v2.1.0 飞书 CardKit 流式输出获得认可（#7570 提及“用着不错”）。
- Scroll 策略在多轮工具调用场景下的改进被验证有效（#7872 关联 Issue）。

**痛点与抱怨：**
- **上下文管理不透明**：用户抱怨压缩后“醒来”却不知上下文已被裁剪，导致任务连贯性断裂（#7733）。
- **插件隔离缺失**：单个同步插件可导致整个实例冻结，严重影响多任务并发体验（#7840）。
- **启动时序问题**：桌面版启动时控制台 UI 渲染快于后端，导致面板空白需手动刷新（#7841）。
- **沙箱限制无提示**：低内核环境下 `recall_history_python` 静默不可用，用户和模型均无感知（#7838）。
- **文件缓存不一致**：agent 重写文件后，文件区标签页仍显示旧内容，需手动刷新（#7866）。

---

## 8. 待处理积压

以下 Issue 长期未获响应或修复，建议维护者优先关注：

| Issue | 状态 | 风险 | 建议 |
|-------|------|------|------|
| [#7853](https://github.com/agentscope-ai/QwenPaw/issues/7853) | OPEN, 4 评论 | 🔴 高危 | 媒体块裁剪缺失是系统性漏洞，需紧急修复 |
| [#7856](https://github.com/agentscope-ai/QwenPaw/issues/7856) | OPEN, 1 评论 | 🟠 中危 | 第三方插件破坏核心接口，需协调插件维护者或升级 API 版本 |
| [#7857](https://github.com/agentscope-ai/QwenPaw/issues/7857) | OPEN, 1 评论 | 🟠 中危 | 事件循环泄漏可能导致资源耗尽，建议纳入回归测试 |
| [#7847](https://github.com/agentscope-ai/QwenPaw/issues/7847) | OPEN, 1 评论 | 🟡 低危 | 文件名百分号转义 bug，影响特定场景，可延后但需记录 |
| [#7839](https://github.com/agentscope-ai/QwenPaw/issues/7839) | OPEN, 1 评论 | 🟠 中危 | 数据库损坏 + 孤立文件漏导入，需诊断根因并增加自检机制 |

---

**报告生成时间：** 2026-09-19  
**数据来源：** GitHub API (agentscope-ai/QwenPaw)  
**分析师：** Agnes (Sapiens AI)

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目日报
**日期**: 2026-09-19
**数据来源**: GitHub API (NousResearch/hermes-agent)

## 1. 今日速览
今日项目活跃度极高，24小时内处理了500条Issues和500条PRs，其中287个Issue和291个PRs已解决或关闭，显示出高效的维护节奏。代码质量与稳定性是今日焦点，多个涉及桌面端内存泄漏、会话状态同步及cron调度可靠性的P1级Bug得到修复或闭环。无新版本发布，但背景中正在进行“Profile Multiplexing”的重大架构迁移（Issue #109417），为后续版本奠定基础。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日合并/关闭的关键PR主要集中在稳定性修复和插件生态更新：

*   **CLI测试覆盖增强**: @MohamadKanso 提交的 **#110756** 添加了针对自定义模型ID发现的回归测试，确保交互式选择器保留完整的LiteLLM ID前缀，提升了配置层面的可靠性。
*   **桌面端恢复逻辑优化**: **#112989** 改进了桌面后端死锁后的恢复机制，确保主进程仅在backend曾处于“ready”状态后才调度恢复启动，避免了在无效状态下空转UI。
*   **插件目录更新**: **#113583** 将 `composer-modes` 插件版本 bump 至 v2.0.1，修复了staging环境中的问题。
*   **飞书网关修复**: **#66207** 修复了飞书引用回复仅获取直接父消息文本的问题，现在能够正确保留多层引用祖先链，解决了短句回复丢失上下文的痛点。

## 4. 社区热点
以下Issue因其高评论量和重要性成为今日社区关注焦点：

*   **[Open] Automated Nous integration is blocked (Issue #88584)**
    *   **热度**: 116条评论
    *   **分析**: 这是今日讨论最激烈的问题。 Nous团队内部的自动合并流程因 `cron/jobs.py` 冲突而阻塞，导致Dashboard updater停滞。这反映了内部CI/CD流水线与开源维护之间的协调问题，用户高度关注集成恢复进度。
*   **[Open] Bot Group Chats should keep working after Desktop closes (Issue #97681)**
    *   **热度**: 28条评论, 2个👍
    *   **分析**: 用户强烈希望实现“无头”模式的Bot群聊连续性，即关闭Desktop客户端后，Bot仍能跨网关协作并在新设备上线时接管会话。这触及了Hermes架构中“Session State”与“Gateway生命周期”解耦的核心需求。
*   **[Closed] Nous Portal pricing bug (Issue #110912)**
    *   **热度**: 26条评论
    *   **分析**: 订阅用户反映在信用额度耗尽后，部分模型路由（如GLM/Kimi）被按全价错误计费，而非预期的折扣价。虽然已关闭，但评论显示用户对计费透明度和订阅价值极为敏感。
*   **[Open] Desktop active session does not refresh (Issue #42962)**
    *   **热度**: 10条评论
    *   **分析**: 从Telegram网关发起的会话更新无法实时同步到Desktop UI，需要手动刷新。这是多端协同体验中的典型断点，用户期望无缝的跨客户端会话连续性。

## 5. Bug 与稳定性
今日修复或关闭了多个P1级关键Bug，显著提升了系统稳定性：

| 严重等级 | 问题描述 | 状态/PR | 链接 |
| :--- | :--- | :--- | :--- |
| **P1** | Kanban任务创建时 `--initial-status blocked` 被自动提升为 `ready`，绕过人工审批门 | **已关闭** (#39609) | [Issue #39609](https://github.com/NousResearch/hermes-agent/issues/39609) |
| **P1** | Cron Agent在未设置 `HERMES_KANBAN_TASK` 时强制执行kanban协议，导致执行失败 | **已关闭** (#68592) | [Issue #68592](https://github.com/NousResearch/hermes-agent/issues/68592) |
| **P1** | 微信适配器错误将 `ret=-2` (prepare failed) 报为“速率限制”，掩盖了真实的 `context_token` 缺失问题 | **已关闭** (#80125) | [Issue #80125](https://github.com/NousResearch/hermes-agent/issues/80125) |
| **P1** | MCP OAuth在Desktop端失败，Dashboard回调丢失RFC 9207 `iss` 参数 | **已关闭** (#92758) | [Issue #92758](https://github.com/NousResearch/hermes-agent/issues/92758) |
| **P1** | `respawn-argv` 是一个未实现的重启机制，导致 `hermes update` 后网关无法正确重连 | **已关闭** (#107224) | [Issue #107224](https://github.com/NousResearch/hermes-agent/issues/107224) |
| **P2** | 后台进程在Agent生命周期 `release()` 时被SIGTERM杀死，影响长时运行任务 | **Open** (#41225) | [Issue #41225](https://github.com/NousResearch/hermes-agent/issues/41225) |
| **P2** | Desktop渲染器内存随会话内容无限增长，重型使用后占用达5GB | **Open** (#77311) | [Issue #77311](https://github.com/NousResearch/hermes-agent/issues/77311) |

**稳定性评估**: 今日重点解决了cron调度逻辑错误、支付计费误报以及网关层面的连接问题。然而，内存管理（Issue #77311）和后台进程生命周期（Issue #41225）仍是待解决的长期技术债。

## 6. 功能请求与路线图信号
*   **Profile Multiplexing (Issue #109417)**: 这是一个追踪Issue，计划将“一个gateway进程服务所有profiles”作为默认且唯一的模式。这是架构层面的重大变更，旨在简化部署并消除多profile管理的复杂性。
*   **System Tray Support (Issue #38007)**: 19个👍表明用户急需桌面端托盘支持，以避免每次关闭窗口都需要冷启动（耗时数秒）。这是一个高优先级的UX改进需求。
*   **Memory Usage Pressure Surfacing (Issue #5320)**: 用户希望默认提高 `memory_char_limit` 并暴露使用压力，以适应长会话需求。
*   **Hermes Skills Lint (Issue #37352)**: 社区请求引入结构化验证工具，用于检查SKILL.md的前缀和交叉引用，目前缺乏此类工具导致维护困难。

## 7. 用户反馈摘要
*   **计费透明度**: 用户对Nous Portal的订阅计费逻辑表现出高度关注，特别是当Credit耗尽后的价格突变（Issue #110912）。任何计费不一致都会迅速引发信任危机。
*   **多端一致性**: 用户反复提及跨平台会话同步的问题（Issue #42962, #97681）。核心痛点在于“在Desktop关闭的情况下，Mobile/Telegram上的Bot交互无法无缝延续到Desktop”。
*   **自动化可靠性**: Cron任务的不可预测行为（Issue #39609, #68592）严重影响了依赖Hermes进行定时任务的工作流。用户期望Cron引擎的行为符合文档且稳定。
*   **Windows体验**: Windows平台仍存在较多适配问题，如路径搜索（Issue #18473）、空间键被吞（Issue #83617）等，反映出该平台维护力度相对不足。

## 8. 待处理积压
*   **Issue #58576** (Open, P1): Web服务器事件循环在重负载下停滞高达51秒，导致Desktop UI假死。这是一个严重的性能/阻塞问题，需关注GIL压力下的异步调度优化。
*   **Issue #58619** (Open, P1): Desktop重连逻辑会产生无界进程累积，旧进程未被清理。长期运行下会导致资源耗尽。
*   **Issue #100437** (Open, P2): v0.21.0中Cron Agent忽略了模型锁定，且本地Ollama回退失败。这是一次版本回归，影响本地部署用户。
*   **PR #115479** (Open): 修复Desktop设置配置标签页在切换Profile后超时卡死的问题，目前等待合并。

---
*报告生成时间: 2026-09-19 | 分析师: Agnes-2.5-Flash*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目日报 | 2026-09-19

> 数据周期：2026-09-18 00:00 ~ 2026-09-19 00:00（北京时间）
> 数据来源：[github.com/AstrBotDevs/AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## 1. 今日速览

AstrBot 今日整体活跃度**中等偏高**：24小时内 Issues 更新 7 条（新开 6 / 已关闭 1），PR 更新 6 条（待合并 4 / 已合并 2），无新版本发布。核心进展是**安全修复闭环**——SSRF 漏洞（#10122）在报告当天即触发对应 fix PR（#10125），响应速度较快。但 v4.28.1 版本同时暴露出多个 P0 级 Bug（对话页面 OOM、知识库索引写入失败），需引起维护者重点关注。项目长期架构 RFC（#3210）持续积累社区反馈，未来版本方向明确。

---

## 2. 版本发布

**今日无新版本发布。**

上一版本 **v4.28.1** 于 2026-09-18 起连续收到多个 Bug 报告，尚未发布修复版本。建议部署用户暂缓升级或回退至稳定版本。

---

## 3. 项目进展

### 已合并/关闭 PR（2 条）

| PR | 作者 | 内容 | 链接 |
|---|---|---|---|
| #10123 | @RC-CHN | 修复 Dashboard 上传路径内存溢出：大文件（最高 8 GiB 备份）和群附件在 512 MiB 限制容器中触发 OOM，改为流式分块上传 | [PR #10123](https://github.com/AstrBotDevs/AstrBot/pull/10123) |
| #9210 | @moduvoice | 新增韩语（ko-KR）国际化支持：Dashboard 新增 37 个 JSON 本地化文件，降低韩语用户使用门槛 | [PR #9210](https://github.com/AstrBotDevs/AstrBot/pull/9210) |

**进展评估：** 两条例均为实质性改进——#10123 修复了 v4.28.1 引入的关键稳定性问题，#9210 扩展了社区覆盖范围。项目整体向前推进了约 **2 个功能单元**（安全 + 国际化），但仍有 4 条 PR 待合并，积压风险中等。

---

## 4. 社区热点

### 🔥 Issue #3210：插件与本体隔离架构 RFC
- **作者：** @Soulter（项目创始人）
- **状态：** OPEN · 修订中
- **评论：** 11 · 👍 16
- **创建：** 2025-10-31 · **最近更新：** 2026-09-18
- **链接：** [Issue #3210](https://github.com/AstrBotDevs/AstrBot/issues/3210)
- **摘要：** 随着插件数量快速增长，依赖冲突和安全问题日益突出。该 RFC 提出参考 Model Context Protocol 的新型隔离架构，解决插件间冲突、提升可维护性和数据安全性。
- **分析：** 这是今日**社区参与度最高**的 Issue（16 个赞，11 条评论），且由项目创始人发起。表明维护者正在主动重构核心架构以应对规模增长，路线图信号明确。

### 📌 Issue #10122 / PR #10125：SSRF 漏洞修复（安全闭环）
- **Issue：** [Issue #10122](https://github.com/AstrBotDevs/AstrBot/issues/10122) · **PR：** [PR #10125](https://github.com/AstrBotDevs/AstrBot/pull/10125)
- **摘要：** 通过 URL 发送文件的功能缺少 SSRF 防护，攻击者可传入内网 IP 进行端口扫描。
- **分析：** 从漏洞披露（2026-09-18）到 fix PR（同日）仅数小时，响应速度优秀。表明安全文化良好，维护者对高危漏洞响应迅速。

### ⚠️ Issue #10126：对话管理页面显示 0 条（OOM 级别）
- **状态：** OPEN · 创建 2026-09-18
- **评论：** 1 · 👍 0
- **链接：** [Issue #10126](https://github.com/AstrBotDevs/AstrBot/issues/10126)
- **分析：** 平台 ID 配置为默认值 `astrbot` 时，Dashboard 对话页面始终显示 0 条记录，即使数据库有数据。前端硬编码 `exclude_ids='astrbot'` 导致误排除。**该 Bug 与 #10122 同源**——均因 v4.28.1 代码审查不足引入，建议合并修复。

---

## 5. Bug 与稳定性

| 严重级别 | Issue | 描述 | 状态 | Fix PR | 链接 |
|---|---|---|---|---|---|
| 🔴 P0 | #10124 | v4.28.1 `ImageCaptionCachePatcher` 处理引用图片时抛出 `TypeError: unexpected keyword argument 'image_ref'` | **已关闭** | 回退版本解决 | [Issue #10124](https://github.com/AstrBotDevs/AstrBot/issues/10124) |
| 🔴 P0 | #10126 | 对话管理页面始终显示 0 条（前端硬编码 `exclude_ids='astrbot'` 误排除） | OPEN | 暂无 | [Issue #10126](https://github.com/AstrBotDevs/AstrBot/issues/10126) |
| 🔴 P0 | #10122 | 通过 URL 发送文件存在 SSRF 内网探测风险 | OPEN | **#10125**（待合并） | [Issue #10122](https://github.com/AstrBotDevs/AstrBot/issues/10122) |
| 🟡 P1 | #10109 | 知识库上传文档后数量为 0，索引写入失败 | OPEN | 暂无 | [Issue #10109](https://github.com/AstrBotDevs/AstrBot/issues/10109) |
| 🟡 P1 | #10094 | 小红书模型输出兼容性差，频繁重复调用搜索工具 | OPEN | 暂无 | [Issue #10094](https://github.com/AstrBotDevs/AstrBot/issues/10094) |

**稳定性评估：** v4.28.1 版本集中暴露出 **3 个 P0 级 Bug**（图片处理崩溃、对话页面异常、SSRF 漏洞），平均修复周期：SSRF 已 24h 内触发 fix PR，其余两个尚无对应 PR。建议维护者优先处理 #10126（代码审查层面问题，与 #10122 同源）。

---

## 6. 功能请求与路线图信号

| Issue | 功能需求 | 社区热度 | 纳入可能性分析 |
|---|---|---|---|
| #5952 | 增加更多 STT 提供商选项（如阿里云） | 👍 0 · 5 评论 | **中等** — 用户明确表示愿意提交 PR，需求合理但未触发维护者响应 |
| #10094 | 增加对小红书模型输出内容的适配 | 👍 0 · 1 评论 | **低** — 特定平台适配，优先级较低，除非有大量用户反馈 |
| #9322 (PR) | WebChat 子代理后台结果自动显示 | OPEN · 待合并 | **高** — 已有关闭 Issue，PR 正在等待合并，预计纳入下一版本 |

**路线图信号：**
1. **插件隔离架构**（#3210 RFC）是核心长期方向，社区参与度高，预计将在 v5.0 系列落地。
2. **国际化扩展**（#9210 韩语已合并）表明项目正在积极扩展多语言支持，后续可能新增更多语种。
3. **WebChat 后台任务自动刷新**（#9322）是当前最接近落地的功能改进。

---

## 7. 用户反馈摘要

### 痛点
1. **v4.28.1 版本稳定性差：** 多位用户报告升级后出现崩溃（图片处理 TypeError）、页面显示异常（对话 0 条）、功能失效（知识库索引写入失败）。回退版本是唯一临时解决方案。
   - [Issue #10124](https://github.com/AstrBotDevs/AstrBot/issues/10124) · [Issue #10126](https://github.com/AstrBotDevs/AstrBot/issues/10126) · [Issue #10109](https://github.com/AstrBotDevs/AstrBot/issues/10109)
2. **安全顾虑：** SSRF 漏洞被发现后，用户担心内网数据泄露风险，但对修复速度表示满意（同日触发 fix PR）。
   - [Issue #10122](https://github.com/AstrBotDevs/AstrBot/issues/10122)
3. **特定平台适配不足：** 小红书模型输出解析不稳定，导致重复调用搜索工具和错误群回复，影响用户体验。
   - [Issue #10094](https://github.com/AstrBotDevs/AstrBot/issues/10094)

### 满意点
1. **安全响应迅速：** SSRF 漏洞从披露到 fix PR 仅数小时，用户认可维护者的安全意识。
2. **国际化进展：** 韩语本地化已合并，非英语用户群体感受到项目诚意。
   - [PR #9210](https://github.com/AstrBotDevs/AstrBot/pull/9210)
3. **架构透明：** 插件隔离 RFC 公开讨论，社区参与度高于同类项目。
   - [Issue #3210](https://github.com/AstrBotDevs/AstrBot/issues/3210)

---

## 8. 待处理积压

| 类型 | 条目 | 创建时间 | 评论数 | 风险等级 | 链接 |
|---|---|---|---|---|---|
| 🟡 长期未响应 Issue | #5952 STT 提供商扩展 | 2026-03-09（6 个月） | 5 | 中 | [Issue #5952](https://github.com/AstrBotDevs/AstrBot/issues/5952) |
| 🟡 长期未响应 Issue | #10094 小红书模型适配 | 2026-09-15（4 天） | 1 | 低 | [Issue #10094](https://github.com/AstrBotDevs/AstrBot/issues/10094) |
| 🟠 待合并 PR | #10121 OnAfterMessageSentEvent 修复 | 2026-09-17 | 0 | 中 | [PR #10121](https://github.com/AstrBotDevs/AstrBot/pull/10121) |
| 🟠 待合并 PR | #10113 CSV 换行符保留修复 | 2026-09-16 | 0 | 低 | [PR #10113](https://github.com/AstrBotDevs/AstrBot/pull/10113) |
| 🔴 紧急待修复 | #10126 对话页面显示 0 条 | 2026-09-18（1 天） | 1 | 高 | [Issue #10126](https://github.com/AstrBotDevs/AstrBot/issues/10126) |

**维护者关注建议：**
1. **#10126** 与 #10122 同源（v4.28.1 代码审查不足），应优先修复或合并相关 PR。
2. **#5952** 已积压 6 个月，用户明确表示愿意提交 PR，建议指派维护者跟进或社区认领。
3. **4 条待合并 PR** 均涉及关键稳定性修复（内存溢出、事件分发、CSV 解析），建议尽快完成 Code Review。

---

## 附录：项目健康度评分

| 维度 | 评分（1-5） | 说明 |
|---|---|---|
| 活跃度 | ⭐⭐⭐⭐ | 24h 内 13 条更新，社区参与度高 |
| 响应速度 | ⭐⭐⭐⭐⭐ | SSRF 漏洞同日触发 fix PR |
| 稳定性 | ⭐⭐ | v4.28.1 集中暴露 3 个 P0 级 Bug |
| 安全文化 | ⭐⭐⭐⭐⭐ | 漏洞披露即响应，修复闭环迅速 |
| 路线图清晰度 | ⭐⭐⭐⭐ | RFC 公开讨论，架构方向明确 |
| 社区参与 | ⭐⭐⭐⭐ | Issue #3210 获 16 个赞，架构重构受关注 |
| **综合健康度** | **⭐⭐⭐⭐** | **活跃度与安全响应优秀，稳定性需紧急修复** |

---

*本报告由 Agnes-2.5-Flash 生成，数据来源：[github.com/AstrBotDevs/AstrBot](https://github.com/AstrBotDevs/AstrBot)*

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：** 2026-09-19  
**分析对象：** [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

## 1. 今日速览
2026年9月19日，DeepSeek Harness 社区保持高强度活跃，过去24小时内 Discussions 新增 **211 条**，反映出用户对近期版本（0.1.5-rc.1 至 0.1.6-alpha.2）稳定性的强烈关注。当前无官方新版本发布，但社区围绕“会话无法加载”、“模型连接失败”及“第三方 API 兼容性”产生了大量技术讨论。项目处于版本迭代后的反馈消化期，代码合并通过 Releases 落地，Issues/PRs 未启用，主要依靠 Discussions 进行问题追踪与需求收集。

## 2. 版本发布
*   **当前状态：** 无新版本发布（0 个）。
*   **背景：** 用户正活跃于 **0.1.5-rc.1** 及 **0.1.6-alpha.2** 版本。由于仓库未启用 PR，历史合并变更已归档于各 Release 的 Changelog 中，今日无新合并摘要更新。

## 3. 项目进展
*   **数据说明：** 因 GitHub Issues/PRs 功能未启用，本项目无公开的代码合并进展记录。
*   **现状：** 所有开发活动通过 Releases 沉淀，今日无新 Release 对应的新功能或修复公告。建议维护者关注 Discussions 中已被验证的修复方案（如 #6559 中的 v0→v3 迁移修复配方），这些可能成为下一版本的隐含更新内容。

## 4. 社区热点
以下 Discussion 为今日评论数最多、热度最高的话题，集中反映了社区的核心关切：

1.  **[Ideas] dsh-vault — 加密凭据保险库插件** [#1457](https://github.com/deepseek-ai/deepseek-harness/discussions/1457)
    *   **热度：** 249 条评论 | 创建: 2026-08-14 | 最后活跃: 2026-09-18
    *   **概要：** 用户 @Ox0400 开发的插件，允许在 DSH 中加密存储 SSH Key、API Token 等敏感信息，并支持通过模型工具进行 CRUD 操作。这是社区对本地化安全存储需求的强烈回应，讨论持续火热。
2.  **[General] 建议早点出独立客户端+CLI，并出支持vscode的插件** [#172](https://github.com/deepseek-ai/deepseek-harness/discussions/172)
    *   **热度：** 38 条评论 | 创建: 2026-08-13 | 最后活跃: 2026-09-18
    *   **概要：** 用户反映 Web 形式体验不佳，呼吁推出独立客户端、CLI 工具及 VSCode 插件，以满足开发者习惯。
3.  **[Ideas] OpenCode Go 需要发送 x-opencode-session header** [#5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)
    *   **热度：** 30 条评论 | 创建: 2026-09-03 | 最后活跃: 2026-09-18
    *   **概要：** OpenCode 团队通知，自 09/05 起，无 `x-opencode-session` header 的请求将报错。约 25k 个 DSH 用户受影响，急需适配修复。

## 5. Bug 与稳定性
今日报告了大量稳定性问题，主要集中在版本升级后的兼容性崩溃，严重程度为 **高**：

1.  **会话加载崩溃：`Cannot read properties of undefined (reading 'prepare')`**
    *   **涉及帖：** [#7035](https://github.com/deepseek-ai/deepseek-harness/discussions/7035), [#2620](https://github.com/deepseek-ai/deepseek-harness/discussions/2620), [#6986](https://github.com/deepseek-ai/deepseek-harness/discussions/6986)
    *   **现象：** 新开会话或加载历史会话时直接报错失败。这是今日最集中的 Bug 反馈，疑似 0.1.6-alpha.2 回归或会话格式兼容问题。
2.  **会话迁移失败：v0→v3 闸门导致旧会话打不开**
    *   **涉及帖：** [#6559](https://github.com/deepseek-ai/deepseek-harness/discussions/6559)
    *   **现象：** 从 0.1.2-rc.1 升级到 0.1.5-rc.1 后，49/123 份旧会话无法打开。作者已提供修复配方，但官方尚未发布包含此修复的稳定版。
3.  **Windows 子进程崩溃：错误码 0xC0000142**
    *   **涉及帖：** [#6930](https://github.com/deepseek-ai/deepseek-harness/discussions/6930)
    *   **现象：** Windows 下托管子进程（如 Pwsh）以 `windowsHide: true` 启动时崩溃并弹出模态对话框。
4.  **OpenCode zen 免费模型 429 限流错误**
    *   **涉及帖：** [#1455](https://github.com/deepseek-ai/deepseek-harness/discussions/1455)
    *   **现象：** 使用 OpenCode 免费模型时必现 `FreeUsageLimitError`，需通过添加特定 header 修复。
5.  **API 连接持续失败**
    *   **涉及帖：** [#175](https://github.com/deepseek-ai/deepseek-harness/discussions/175)
    *   **现象：** 配置 API Key 后仍无法连接 DeepSeek 模型，重试失败。

## 6. 功能请求与路线图信号
*   **加密凭据管理：** [#1457](https://github.com/deepseek-ai/deepseek-harness/discussions/1457) 的 dsh-vault 插件讨论热度最高（249+ 评论），表明用户对**本地敏感信息安全管理**有强烈需求，未来可能影响官方插件体系规划。
*   **多端支持与插件生态：** [#172](https://github.com/deepseek-ai/deepseek-harness/discussions/172) 持续呼吁独立客户端、CLI 和 VSCode 插件，这是用户留存的关键痛点。
*   **图片支持配置：** [#3965](https://github.com/deepseek-ai/deepseek-harness/discussions/3965) 用户指出添加模型时无法设置是否支持图片，这是一个基础 UX 缺陷，需纳入路线图修复。
*   **第三方 API 适配：** [#5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495) 反映社区对 OpenCode 等第三方 Provider 接口变化的敏感性，需建立更稳定的适配机制。

## 7. 用户反馈摘要
*   **痛点：**
    *   **“越更新越不能用”：** 多位用户（[#6971](https://github.com/deepseek-ai/deepseek-harness/discussions/6971), [#6988](https://github.com/deepseek-ai/deepseek-harness/discussions/6988)）抱怨升级后出现回归 Bug，且降级也无法解决，情绪较为焦虑。
    *   **Web 体验局限：** 用户渴望本地化、IDE 集成的体验，认为纯 Web 形式不够专业（[#172](https://github.com/deepseek-ai/deepseek-harness/discussions/172)）。
    *   **迁移风险：** 会话格式升级（v0→v3）存在数据不可逆风险，用户担心旧会话丢失（[#6559](https://github.com/deepseek-ai/deepseek-harness/discussions/6559)）。
*   **满意点：**
    *   社区互助氛围浓厚，如 [#6559](https://github.com/deepseek-ai/deepseek-harness/discussions/6559) 中用户自发验证并分享修复配方。
    *   对插件扩展性的认可，如 dsh-vault 受到欢迎。

## 8. 待处理积压
*   **高优先级：**
    *   **#7035 / #2620 / #6986:** `Cannot read properties of undefined (reading 'prepare')` 崩溃问题涉及多个版本和用户，需官方紧急响应。
    *   **#5495:** OpenCode API 兼容性变更影响 25k+ 用户，需尽快适配 `x-opencode-session` header。
    *   **#6974:** 0.1.6-alpha.2 源码检出时包加载路径冲突导致的回归（[#6974](https://github.com/deepseek-ai/deepseek-harness/discussions/6974)）。
*   **长期关注：**
    *   **#172:** 独立客户端/CLI/VSCode 插件的需求长期存在，需明确路线图。
    *   **#1455:** OpenCode 免费模型限流 workaround 需集成到官方配置中。

---
**评估结论：** DeepSeek Harness 社区活跃度极高，但当前处于**稳定性动荡期**。主要风险在于近期版本升级引发的会话崩溃和 API 兼容性问题。建议维护者优先处理 `prepare` 未定义错误及 OpenCode header 适配，并考虑在下一个 Release 中提供平滑的会话迁移工具。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*