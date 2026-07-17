# OpenClaw 生态日报 2026-07-18

> Issues: 382 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-07-17 22:38 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

好的，这是根据您提供的 OpenClaw 项目数据生成的 2026-07-18 项目动态日报。

---

# OpenClaw 项目日报 | 2026-07-18

## 1. 今日速览

过去 24 小时内，OpenClaw 项目更新负荷极高，累积更新 Issue **382 条**、PR **500 条**，活跃度充分体现了大型敏捷开源项目的特征。版本层面，项目发布了 **v2026.7.2-beta.2**，以云工作器远程编码（Remote Coding Sessions）和原生自动化节点（Native Automation and Nodes）为核心亮点。稳定性方面，P0/P1 回归 Bug 数量处于高位（Codex 集成、状态迁移等），但维护者响应迅速，针对升级阻塞问题（#109867）等重要缺陷已在数小时内提交修复 PR。社区方面，安全机制升级（Masked Secrets / Memory Trust Tagging）和跨平台桌面客户端需求（#75）构成了最强烈的呼声。项目整体处于“高创新速度 vs 快速消防”的活跃并存状态。

## 2. 版本发布

**标题：** v2026.7.2-beta.2 发布：聚焦远程编码与节点自动化

- **新特性一：Remote Coding Sessions**
  - 支持在云 Worker 上运行 Control UI 会话。
  - 可直接在其宿主机上以终端形式打开 Codex 和 Claude Catalog 会话。
  - 支持直接在终端中恢复 OpenCode 和 Pi 会话。
  - 关联 Issue: #107670, #107086, #107200。
- **新特性二：Native Automation and Nodes**
  - 加强了对原生自动化和底层节点的支持，为高阶工作流编排和复杂 Agent 拓扑提供基础能力。
- **迁移警告：** 此为 Pre-release 版本（Beta.2），存在已知的状态迁移顺序 Bug（#109867），目前修复 PR #110197 已提交。建议生产环境用户等待下一个迭代或打上此补丁后再升级。
- [发布链接](https://github.com/openclaw/openclaw/releases/tag/v2026.7.2-beta.2)

## 3. 项目进展

过去 24 小时内，项目共合并/关闭 131 个 PR，以下为对整体架构和稳定性有显著影响的合并条目：

- **核心稳定性修复收敛：**
  - **[P1] Cron 任务可靠性：** PR #110159（fix: queued jobs are lost after Gateway restart）已合并。该补丁修复了网关重启后排队中定时任务被错误丢弃的问题，保障了生产环境定时工作流的按需恢复。
  - **CI/CD 与构建健康：** PR #110205（fix: refresh stuck dependency snapshot）已合并，解决了 CI 持续集成中因依赖指纹快照不一致导致的构建恢复失败问题。
  - **Signal 频道兼容性：** PR #110090（fix: preserve newlines in debounced messages）已合并，解决多消息合并发送时换行符显示错误。
- **重型功能推进（审阅阶段）：**
  - **浏览器侧边栏 Copilot：** 前期设计 PR #93680 已关闭，其继任者 PR #109817（feat: add secure per-tab copilot panel）正在进行大规模重构审阅，预期将成为下个稳定版本的重要 feature。
  - **iOS 体验统一：** PR #107879（feat: unify chat and voice experience）已标记为 `ready for maintainer look`，将全面重塑 iOS 平台的多模态交互范式。
  - **Claw 平台化管理：** PR #102228（Install ClawHub packages for new Claw agents）、#102427（Add experimental Claw lifecycle diagnostics）、#102296（Add plan-first Claw status and remove）等系列 PR 持续推进，标志着 OpenClaw 在插件和 Agent 生命周期管理的平台化战略正加速落地。
- **总结：** 项目在紧急扑灭 Beta 版本火灾的同时，保持了在端侧体验（iOS/Android/WearOS）和基础平台（Claw 管理）的稳步推进。

## 4. 社区热点

- **🔥 最热门 Issue：** [#75 - Linux/Windows Clawdbot Apps](https://github.com/openclaw/openclaw/issues/75)
  - 数据：**113 条评论，81 个 👍**。创建于 2026-01-01，至今仍保持极高活跃度。
  - 分析：这是社区目前最大的战略级诉求。用户表示“We have apps for macOS, iOS and Android. Linux and Windows are missing.” 如果缺失对 Linux 和 Windows 的原生桌面支持，将阻止大量 Node.js 开源社区和企业用户将其作为主要工作平台。项目方需明确回应此诉求在路线图中的位置。
- **💣 最大争议与不稳定因素：** [#88312 - Codex 回合完成卡死回归](https://github.com/openclaw/openclaw/issues/88312)
  - 数据：**20 条评论**，P1 严重级别。该问题是一个回归（2026.5.27 起引入）。
  - 分析：Codex 是 OpenClaw Agent 能力的核心命脉。此问题与 #87744（Codex 驱动 Telegram 超时）、#109490（Codex 回合中断）构成了 Codex 集成层的“失效三角”。社区普遍反馈在开启多工具 Agent 模式时，此问题频繁复现。Codex 稳定性的优先级需立即提升到最高级别。
- **🔒 安全热点巅峰：** [#10659 - Masked Secrets](https://github.com/openclaw/openclaw/issues/10659) & [#7707 - Memory Trust Tagging](https://github.com/openclaw/openclaw/issues/7707)
  - 数据：分别获得 13 和 17 条评论。用户强烈要求加入“Agent 可以使用 API 键但不能读取/泄露 API 键”的蒙版系统，以及按来源标记记忆可信度的信任标签系统。
  - 分析：这标志着用户群体已经进入了“准生产安全”阶段，传统的 `.env` 管理模式已无法满足防范提示注入和内存中毒攻击的安全需求。
- **📢 新晋阻塞点：** [#109867 - beta.2 状态迁移导致网关阻塞](https://github.com/openclaw/openclaw/issues/109867)
  - 数据：刚开启即获 **5 个 👍**，是 P0 级升级阻断 Bug。
  - 分析：用户升级 beta.2 后，由于 SQLite 迁移脚本在创建索引前未先添加列，导致 `doctor --fix` 和网关启动均失败。社区在 6 分钟内即报告，维护者在 10 分钟内分配并提交了修复 PR #110197。这体现了极高的社区质量和维护响应速度，但也提醒我们在 Beta 自动迁移测试上需加大投入。

## 5. Bug 与稳定性

当前项目处于高强度回归处理期，以下为按严重程度排列的活跃故障：

| 严重级别 | Issue / Bug | 影响范围 | 修复状态 |
|---|---|---|---|
| **P0** | [#109867](https://github.com/openclaw/openclaw/issues/109867) beta.2 状态迁移顺序错误 | 阻塞所有 beta.2 用户升级 | ✅ #110197 已提交 |
| **P0** | [#101763](https://github.com/openclaw/openclaw/issues/101763) Molty 模型选择器发送错误 ID | 商业 Hosting 用户无法使用 | 🔍 需维护者确认 |
| **P1** | [#88312](https://github.com/openclaw/openclaw/issues/88312) Codex 回合完成确认回归 | Multi-tool 核心工作流 | 需产品决策 |
| **P1** | [#87744](https://github.com/openclaw/openclaw/issues/87744) Codex Telegram 超时 | Telegram 频道用户 | 需维护者审阅 |
| **P1** | [#107873](https://github.com/openclaw/openclaw/issues/107873) Prompt-Lock 会话接管失败 | WebChat 用户 | 🔍 需 live-repro |
| **P1** | [#108075](https://github.com/openclaw/openclaw/issues/108075) 提供者 Schema 被拒绝 | 2026.7.1 回归用户 | 🔍 未分配 |
| **P1** | [#108238](https://github.com/openclaw/openclaw/issues/108238) Context cacheRead 误报 | 大上下文用户误触发压缩 | 🔍 已关联 PR |
| **P1** | [#106231](https://github.com/openclaw/openclaw/issues/106231) 循环检测不终止 Agent | 资源耗尽风险 | 🔍 需维护者确认 |
| **P1** | [#97616](https://github.com/openclaw/openclaw/issues/97616) 子进程泄漏 | 长期运行时性能退化 | 🔍 未分配 |

**稳定性格局总结：** 当前项目典型的“登月症候群”——大跨步推进 v2026.7.x 新功能的同时，核心基础层（Codex Plugin、Session-DB Migration、Child Process Mgmt）承受较大回归压力。尽管项目组应变极快（24h 内提交多处 P0/P1 补丁），但 P1 级活跃回归 Issue 依然超过 10 个，Codex 集成层的稳定性是需要集中最高的优先级攻克的据点。

## 6. 功能请求与路线图信号

- **高概率进入 v2026.8.x 路线图：**
  - **浏览器侧边栏 Copilot (#109817)**：正在重构审阅中，标志着从“聊天机器人”向“Ambient Agent”的进化。
  - **安全金三角：** #10659 (Masked Secrets)、#7707 (Memory Trust Tagging)、#7722 (Filesystem Sandboxing) 虽均为 P2，但社区热度极高，代表了 Enterprise Agent 安全的最低门槛。
  - **平台化管理：** #102296 / #102228 / #102427 组成的 Claw 生命周期管理链条，旨在打造类似“App Store”的插件安装/状态/移除体验。
- **呼声极高但需要战略决策的特性：**
  - **跨平台桌面客户端 (#75)**：无实际 PR，但战略价值极高。伴随 Electron / Tauri 相关依赖的任何合并都将引发巨大热议。
  - **会话拓扑控制：** #96975 (子Agent 隔离)、#90916 (主题会话族)、#11665 (Webhook 多轮修复) 表明高级用户正在搭建极其复杂的多 Agent 拓扑，需要框架提供松耦合上下文交互的能力。
  - **QoL 改进：** #9912 (maxTurns)、#9986 (Fallback on context exceeded)、#8299 (抑制子Agent 公告)。

## 7. 用户反馈摘要

- **升级恐惧：** “24小时前还能用，升级后就完全挂了。”——从 #106920、#108435 到 #109867，大量的升级后启动失败案例让社区对 `openclaw update` 指令产生了戒备心理。用户期望更平滑的迁移体验，或更清晰的分支锁定策略。
- **Codex 霸凌：** “不是一次两次了，是多 Tool 轮次必崩。”——围绕 #88312 和 #87744 的讨论非常激烈。用户在 Telegram、Direct Chat 等多场景下均遭遇 Codex“撞墙”，严重影响对 Agent 自主决策能力的信任。
- **我们不是 Mac 独占软件：** #75 的热度居高不下，仅靠 `openclaw` 命令行在 Windows/Linux 上运行无法满足企业级团队协作需求。用户表达了强烈的“原生桌面应用”饥渴。
- **失控的 Agent：** 用户对缺乏 `maxTurns` (#9912) 和无法抑制子 agent 公告 (#8299) 感到沮丧。表明高频代理在复杂任务中需要更细粒度的“笼头”和静默控制。
- **令人安慰的积极面：** 用户普遍认可项目组的快速反应能力（如 #109867 的极速修复），并愿意花费时间提交极其详细、带有 `Steps to reproduce` 和日志的 Bug 报告。这是社区生态健康度极高的表现。

## 8. 待处理积压

以下为长期未响应或决策的重要议题，需维护者重点关注：

- **[#75] Linux/Windows 桌面客户端（113 评论，81 👍）：** 项目已近半年未对此做出正式官方声明。即使当前不纳入开发规划，也建议通过官方渠道（如 Discussion 或 Readme）明确“长期计划”或“需要社区贡献”，避免期望错误累积。
- **[#88312] Codex 功能回归（P1，20 评论）：** 此问题本质是已修复 Bug (#84076) 的二次爆发。目前处于 `needs-product-decision` 状态，决策迟缓将导致信任进一步流失。建议集中讨论是否要彻底重构 Codex 层 turn-completion 机制，而不是继续打补丁。
- **[#10659] Masked Secrets（P1，13 评论）：** 安全需求定义清晰，且已在 #109792 PR 中提及 Degradation 日志。若无架构冲突，建议在 v2026.8.x 中纳入 Sprint。
- **[#108344] Cron 执行生命周期维护冲突：** 用户报告在严格维护模式下，每一条 Cron 任务执行前都可能被 maintenance 流程 evict，导致任务永久失败。这涉及 session-store 的核心锁竞争机制，需优先排查。
- **[#97616] 子进程泄漏：** 虽然不是新问题，但用户通过 `opensnoop` 和 `atop` 给出了详尽的系统级证据。长期僵尸进程堆积将导致 OOM，建议作为技术债务单独立项。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向对比分析

生成日期：2026-07-18｜数据来源：OpenClaw、Zeroclaw、PicoClaw、QwenPaw、Hermes-Agent、AstrBot 社区动态

---

## 1. 生态全景

当前个人 AI 助手 / 自主智能体开源生态正处于 **高并发迭代期**：多个项目日均产生数百条 Issue/PR，功能性创新（远程编码、多 Agent 路由、MCP 扩展）与安全合规补丁同步加速。社区关注重心从单纯功能实现转向 **可信执行环境**（签名、沙箱、凭证屏蔽），同时跨平台桌面支持和多框架互操作（A2A、Wasm 插件化）成为基建设施级别的共识。开源协作质量两极分化：头部项目维护响应极快但回归频繁，部分项目贡献者旺盛但审查积压严重，“创新消防”与“安全基建”并行是生态主旋律。

---

## 2. 各项目活跃度对比

| 项目 | 24h Issue 更新数 | 24h PR 更新数 | 版本发布 | 综合健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 382 | 500 | v2026.7.2-beta.2 | 高创新速度，P0/P1 回归多但响应快，健康度中等偏上 |
| **Zeroclaw** | 50 | 50 | 无 | 快速功能扩展期，合并节奏稍滞后，S1 bug 待修复，健康度良好 |
| **PicoClaw** | 4 | 12 | 无 | 贡献活跃但审查积压严重，交付承压，健康度一般 |
| **QwenPaw** | 25 | 42 | v2.0.0.post3 | 稳定加固 + 性能优化，bug 关闭迅速，健康度良好 |
| **Hermes-Agent** | 247 | 500 | 无 | 极高活跃度，快速修复核心稳定性问题，但 bug 存量仍高，健康度中等 |
| **AstrBot** | — * | — * | 无 | 高频迭代但有严重未响应安全漏洞，健康度较低，需紧急干预 |

*注：AstrBot 日报未提供精确更新计数，但从内容看当日产生至少 5 条新 Issue 与 2 条 PR，且两份高危安全报告待官方确认。*

---

## 3. OpenClaw 在生态中的定位

OpenClaw 是当前生态中 **社区规模最大、迭代最激进** 的项目（日 Issue/PR 量远超其他项目）。其差异化优势在于：
- **技术路线前沿**：率先落地云 Worker 远程编码（Remote Coding Sessions）与原生自动化节点，直接赋能高阶工作流编排；
- **端侧覆盖最广**：已在 iOS、Android、WearOS、macOS 布局，跨平台桌面端（#75）是最大社区战略诉求；
- **平台化战略清晰**：ClawHub 插件系统 + Agent 生命周期管理正在重构为“AI 应用商店”。

对比同类：比 Zeroclaw 更侧重于功能广度与云集成，但稳定性回归压力量级也更大；相比 Hermes-Agent 的模型绑定策略，OpenClaw 偏向框架中立；相比 QwenPaw 的 AgentScope 生态依赖，OpenClaw 更独立。**社区规模上 OpenClaw 领先一个量级，但也承担着最多的升级阵痛。**

---

## 4. 共同关注的技术方向

以下需求在多个项目中同时涌现，反映生态层共识：

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **供应链安全与凭证保护** | OpenClaw、Zeroclaw、AstrBot | Masked Secrets (#10659)、硬件签名/可重现构建 (#8177)、MCP SSRF 审计 (#9304) |
| **多 Agent 互操作与路由** | OpenClaw、Zeroclaw、Hermes-Agent | A2A 协议支持 (#3566)、多 Agent 路由 (#2767)、子代理 MCP 作用域 (#66554) |
| **跨平台桌面客户端** | OpenClaw、Hermes-Agent、QwenPaw | Linux/Windows 原生 App (#75)、国际化 i18n 批量请求、Windows 权限兼容性 (#6161) |
| **插件/Wasm 扩展体系** | Zeroclaw、AstrBot、PicoClaw | Wasm-first 插件运行时 (#8135)、MCP 入口到插件队列、技能编辑器链接受阻 |
| **记忆系统增强与信任标记** | OpenClaw、Zeroclaw、Hermes-Agent | Memory Trust Tagging (#7707)、持久记忆跟踪 (#8891)、Dreaming 记忆巩固 (#25309) |
| **配置流式输出与控制** | PicoClaw、QwenPaw、AstrBot | QQ 频道流式输出 (#3201)、工具调用分开显示 (#5976)、断句器 Agent 截断 (#9305) |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 关键技术架构 |
|---|---|---|---|
| **OpenClaw** | 全能助手 + 远程编码 + 自动化节点 | 个人开发者 / 小团队 | Node.js 全栈，云 Worker，ClawHub 插件，多平台端 |
| **Zeroclaw** | 企业级安全 Agent 基础设施 | 安全敏感的企业 / DevOps 团队 | Rust 实现，Wasm 插件，OIDC，RBAC，供应链签名 |
| **PicoClaw** | 轻量边缘代理 + IM 集成 | 嵌入式 / IoT 开发者，渠道机器人 | Go 语言，极简资源占用，依赖冻结，贡献者众维护力弱 |
| **QwenPaw** | 多 Agent 编排 + AgentScope 生态 | AgentScope 用户，需多模型混合 | Python 全栈，MCP 优先，浏览器自动化，量统计重构 |
| **Hermes-Agent** | 本地模型优先 + NousResearch 生态 | 隐私敏感用户 / 模型自定义者 | 模型绑定深，Provider 兼容性打磨，核心死循环集中修复 |
| **AstrBot** | 即时通讯网关 + 插件化知识库 | 社群运营 / 聊天机器人开发者 | Python 轻架构，挂钩即时通讯，MCP 集成，安全基线薄弱 |

**架构趋同点**：除 PicoClaw 仍以 Go 独树一帜，其余项目均围绕 Python/Node.js 构建，且都在向 MCP/Wasm 插件系统收敛。差异主要在安全防线严格度、模型绑定深度以及平台化厚度。

---

## 6. 社区热度与成熟度分层

- **第一梯队（极高活跃、快速迭代）：** **OpenClaw**、**Hermes-Agent**  
  日 Issue/PR 总量过百，合入速度极快，但伴随大量回归 bug，处于“边飞边修”状态。前者更注重功能翻新，后者集中攻克核心稳定性（如内容格式死循环）。

- **第二梯队（中高活跃、稳健扩展）：** **Zeroclaw**、**QwenPaw**  
  日更新 50-60 条，有明确版本管理（QwenPaw 刚发 patch），架构重构有条不紊。Zeroclaw 在企业安全路线上深度投入，QwenPaw 在通道基础和 MCP 领域稳步加固。

- **第三梯队（贡献旺盛、交付承压）：** **PicoClaw**  
  日更新仅十数条，但背后有大量待合并 PR（6 个高质量 PR 积压一周），维护者响应不足是发展瓶颈。社区热情高，但需扩大 committer 带宽。

- **关注梯队（安全事件待响应）：** **AstrBot**  
  日常迭代健康，但两份高危安全报告 (RCE + SSRF) 未获官方回复，如不尽快处置将严重影响信任度，可能滑入健康度危险区。

---

## 7. 值得关注的趋势信号

- **供应链安全左移至开发阶段**：用户不再满足于运行环境隔离，要求从构建源头提供签名、可重现构建、SLSA 出处 (#8177)，以及 agent 可用但不可读的“蒙版密钥”(#10659)——这或成下一代 Agent 框架安全基线。

- **MCP 成为双刃剑**：AstrBot 的 SSRF 审计 (#9304) 与 Zeroclaw 的 webhook 入站插件设计证明 MCP 正在统一扩展接入标准，但其 stdio/HTTP 层的攻击面亟需权限沙箱化，单靠“认证即信任”已不达标。

- **多 Agent 拓扑从实验走向生产**：随着 A2A 协议 v0.3.0+ 被社区热议，子代理隔离、跨会话记忆关联、以及 agent 间消息路由成为真实痛点。不再只是 demo，而是企业级多智能体自动化的必备能力。

- **记忆系统进入“可信时代”**：记忆不仅是存储检索，Memory Trust Tagging (#7707) 与 Dreaming (#25309) 的讨论标志着社区对记忆的 **来源可信度、生命周期管理、自主巩固** 提出更高要求，为长期自治 Agent 铺路。

- **跨平台桌面客户端成为下一个增长点**：多个社区突破 Mozilla/Electron 讨论，从 #75 (OpenClaw) 到 Hermes-Agent 的 Windows 崩溃，再到 QwenPaw 的 UAC 问题——桌面端体验将决定这些工具能否从开发者玩具升级为主力工作台。

- **低资源部署与国际化同步升温**：PicoClaw 保持轻量边缘路线，同时 hermes-agent 与 OpenClaw 社区涌现葡语/俄语/德语本地化请求，说明 AI Agent 正在跨越英语圈，向全球长尾市场渗透。

---

**结论**：开源智能体生态已越过“能不能用”阶段，进入“如何安全、可靠、规模化”的深水区。对于技术决策者，建议优先关注 **供应链安全实践**（可集成至发布管道）与 **多 Agent 互操作标准**（A2A/插件体系）的项目；对于开发者，选择活跃度与文档完备性平衡的项目贡献（如 Zeroclaw 的安全模块、QwenPaw 的通道框架）可收获较高边际影响。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-07-18

---

## 今日速览

过去 24 小时项目保持高度活跃：**50 条 Issue 更新**（其中 43 条新开/活跃，7 条关闭），**50 条 PR 更新**（41 条待合并，9 条已合并/关闭）。尽管没有新版本发布，但社区提交和讨论密度处于近期高位。合并节奏略滞后于提交速度（合并/关闭比 9:41），不过维护者仍在积极评审。当前开发焦点集中在 **供应链安全、多 Agent 互操作（A2A）、OIDC 认证、Wasm 插件运行时**等企业级能力上，项目整体健康度良好，处于快速功能扩展期。

---

## 版本发布

**无。** 过去 24 小时无新版本 Release。

---

## 项目进展

过去 24 小时共有 **9 个 PR 被合并/关闭**，主要涉及文档规范、测试加固、配置修复和 Web 体验优化。重要合并项如下：

- **#9045 docs(architecture): 文档化生成的文档与本地化生命周期** — 明确了哪些源文件控制生成的文档，降低贡献者误改产物的风险。 [查看](https://github.com/zeroclaw-labs/zeroclaw/pull/9045)
- **#8974 docs(firmware): 修复 ESP32 硬件设计文档链接** — 消除了 firmware README 中的死链，提升硬件开发者体验。 [查看](https://github.com/zeroclaw-labs/zeroclaw/pull/8974)
- **#8896 ci(actions): 缩小基准编译实验范围** — 将基准编译仅限定在 `agent_benchmarks` 目标，减少 CI 资源浪费。 [查看](https://github.com/zeroclaw-labs/zeroclaw/pull/8896)
- **#8882 test(api): 覆盖属性中的转义 schema 引用** — 增加对 JSON Pointer 转义形式的回归测试，提升 API 序列化稳健性。 [查看](https://github.com/zeroclaw-labs/zeroclaw/pull/8882)
- **#8768 fix(zerocode): 暴露频道根设置** — 使 `show_tool_calls` 等全局频道设置在 ZeroCode TUI 中可被发现和编辑，改善配置可操作性。 [查看](https://github.com/zeroclaw-labs/zeroclaw/pull/8768)
- **#8743 test(config): 覆盖 LinkedIn Schema V4 移除范围** — 增加配置回归测试，确保未来 schema 变更时旧字段能被正确清理。 [查看](https://github.com/zeroclaw-labs/zeroclaw/pull/8743)
- **#8742 docs(sop): 添加无 TOML 语法示例** — 补充 SOP 语法页面的可复制示例，降低用户编写 SOP 的心智负担。 [查看](https://github.com/zeroclaw-labs/zeroclaw/pull/8742)
- **#8558 feat(web): 将技能链接到编辑器** — 在 Web 的技能浏览页直接添加编辑入口，支持路由到已有的技能包编辑器。 [查看](https://github.com/zeroclaw-labs/zeroclaw/pull/8558)
- **#8426 chore(web): 允许 Vite dev server 通过环境变量覆盖网关主机** — 让 Web 前端开发不再绑定本地网关，支持远程/SSH 开发场景。 [查看](https://github.com/zeroclaw-labs/zeroclaw/pull/8426)

这些合并虽多为小型改动，但覆盖了文档、CI、测试、配置和 Web 体验，逐步提升项目的可维护性和开发者入门友好度。

---

## 社区热点

过去 24 小时讨论最活跃、关注度最高的 Issue 和 PR：

### Issues

1. **#8177 RFC: 供应链签名 — 硬件 PGP、可重现构建、SLSA 出处**  
   共 11 条评论。讨论了采用 StageX 模型对容器镜像和二进制进行硬件密钥签名、多方可信离线签名，以及容器签名格式。社区对供应链安全的关注度极高，该 RFC 也是 [#7675 硬化 CI 管道] 的后续。[查看](https://github.com/zeroclaw-labs/zeroclaw/issues/8177)

2. **#5982 [Feature]: 多租户部署的每发送者 RBAC**  
   10 条评论。核心诉求是让一个 ZeroClaw 实例服务多种用户类型（客户、运维、开发者），通过角色隔离工作空间、工具集、速率限制和系统提示。反映了企业级多租户部署的真实需求。[查看](https://github.com/zeroclaw-labs/zeroclaw/issues/5982)

3. **#3566 [Feature][interop]: A2A（Agent-to-Agent）协议支持**  
   8 条评论，获得 7 个 👍。社区对与其他 Agent 框架（NanoClaw、OpenClaw 或任何 A2A 兼容 agent）互操作有强烈需求，主张原生支持 Agent2Agent 协议（v0.3.0+）。[查看](https://github.com/zeroclaw-labs/zeroclaw/issues/3566)

4. **#6378 [Feature]: Discord Bot 仅在特定频道响应**  
   7 条评论。需要 `allowed_channels` 配置项，类似 Matrix 和 Nextcloud Talk 的 `allowed_rooms` 模式，实现频道级别的权限控制。[查看](https://github.com/zeroclaw-labs/zeroclaw/issues/6378)

5. **#2767 [Feature]: 多 Agent 路由**  
   6 条评论，获得 9 个 👍。要求像 OpenClaw 一样支持多个隔离的 Agent（独立工作区、agentDir、会话）以及多频道账号绑定。社区对多 Agent 架构的呼声最高（👍 数最多）。[查看](https://github.com/zeroclaw-labs/zeroclaw/issues/2767)

### Pull Requests

尽管部分 PR 评论数未显示，以下 PR 因涉及关键基础设施或社区贡献而获得较多关注：

- **#9107 chore(CODEOWNERS): 维护者交接** — @singlerider 离开项目，权限移交给 @JordanTheJet，同时新增 @IftekharUddin 作为 Web/PM 负责人。社区对维护者变更反应积极。[查看](https://github.com/zeroclaw-labs/zeroclaw/pull/9107)
- **#8862 feat(gateway): webhook 入口 → 插件入站队列** — 新增频道插件 `webhook-ingress` 能力，将外部 webhook 路由到 Wasm 解析器。与 Wasm 插件生态密切相关。[查看](https://github.com/zeroclaw-labs/zeroclaw/pull/8862)
- **#8638 feat(skills)!: 用 git-catalog 替换内置 ClawHub 源** — 重大变更：移除硬编码的 ClawHub 安装路径，采用通用的 git catalog 安装方式。社区对减少第三方依赖表示支持。[查看](https://github.com/zeroclaw-labs/zeroclaw/pull/8638)

**分析：** 社区的两大关注主线是 **安全/合规**（供应链签名、RBAC、OIDC）与 **多 Agent 互操作**（A2A、多 Agent 路由）。这与项目正在推进的 RFC 方向一致，说明功能规划与社区需求匹配度较高。

---

## Bug 与稳定性

过去 24 小时活跃的 Bug（按严重程度降序排列）：

| Bug | 严重级别 | 状态 | 说明 |
|-----|---------|------|------|
| **#8563 SOPs 在 Web 对话中不可见** | S1（工作流阻塞） | accepted | 配置在 shared/sops 的 SOP 不被 agent 运行时检测，导致标准作业程序无法生效。尚无对应修复 PR。 [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/8563) |
| **#8560 browser_open 挂起导致 agent turn 阻塞** | S1（工作流阻塞） | in-progress / accepted | 当无法打开浏览器窗口时（无显示器/Headless），子进程等待无界，影响 TTS 和 ffmpeg 等。Singlerider 报告，暂无修复 PR。 [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/8560) |
| **#7527 macOS 应用无法工作** | S1（工作流阻塞） | blocked | macOS 15.7.7 安装后无法检测权限，显示空白页，重启后窗口消失。仅有 2 条评论且被 blocked，需维护者优先跟进。 [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/7527) |
| **#5628 Daemon 自启动导致端口冲突** | S2（降级行为） | accepted / no-stale | systemd 服务开机占用 42617 端口，导致手动运行 `zeroclaw daemon` 时 Address already in use。 [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/5628) |
| **#5869 rumqttc 依赖导致安全废弃告警集群** | 安全，P1 | blocked / accepted | 依赖链 `rumqttc→rustls-webpki 0.102.x` 触发 4 个 RUSTSEC 通告，等待上游更新。 [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/5869) |

另外，今日合并的 **#8768** 修复了 ZeroCode 频道根配置不暴露的问题，属于配置层面的稳定性改进。目前 **#8563 和 #8560 为 S1 级别且暂无公开修复 PR**，建议维护团队优先分配资源。

---

## 功能请求与路线图信号

过去 24 小时涌现的功能请求和已接受 RFC 集中反映了项目下一阶段的路线图信号：

### 已接受并标记为路线图的 RFC
- **#7141 OIDC 认证提供者支持** (P1, target v0.9.0, status:accepted) — 可插拔认证，对企业 SSO 至关重要。[查看](https://github.com/zeroclaw-labs/zeroclaw/issues/7141)
- **#7142 可插拔安全强制提供者接口** (P2, accepted) — 将安全策略实施统一到 trait 背后，便于定制。[查看](https://github.com/zeroclaw-labs/zeroclaw/issues/7142)
- **#7218 A2A Agent 发现 (.well-known/agent-card.json)** (P2, accepted) — 多 Agent 安装下的互操作基础。[查看](https://github.com/zeroclaw-labs/zeroclaw/issues/7218)
- **#8135 Wasm-first 插件运行时** (P2, accepted) — 默认采用 Wasm 作为插件运行时，签名分发、能力声明。[查看](https://github.com/zeroclaw-labs/zeroclaw/issues/8135)
- **#6850 内存生命周期策略与存储解耦** (P2, accepted) — 引入 `MemoryStrategy` trait，分离策略与后端。[查看](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)
- **#6996 粒度沙箱策略（文件系统/网络）** (P2, accepted) — 为 Landlock / Bubblewrap / Seatbelt 后添加配置驱动控制。[查看](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)

### 新提出的高热度需求
- **#8891 [Tracker]: 持久内存 — 写入、相关性、可操作性平齐** (P2, in-progress) — 追踪跨会话记忆子系统全功能实现的多个 PR。[查看](https://github.com/zeroclaw-labs/zeroclaw/issues/8891)
- **#7521 file_read 支持非 UTF-8 文本编码检测** (P2, accepted) — 用户在读取 Windows-1251/Latin-1 文件时遇到乱码。[查看](https://github.com/zeroclaw-labs/zeroclaw/issues/7521)
- **#7762 Cron 文档缺失并要求指定模型** (P2, accepted) — 需要文档和完善的模型指定功能。[查看](https://github.com/zeroclaw-labs/zeroclaw/issues/7762)
- **#7467 / #7468 TUI 编辑字符串灵活性** (P2, accepted) — 支持箭头导航和别名重命名，提升配置 UX。[查看](https://github.com/zeroclaw-labs/zeroclaw/issues/7467) [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/7468)

**路线图信号：** v0.9.0 将聚焦在 **安全（OIDC、可插拔策略、供应链签名）、多 Agent（A2A 发现、内存策略）和 Wasm 插件化** 三大支柱上。日常运维体验类需求（编码检测、Cron 模型指定、TUI 编辑改进）也被接受，有望在后续小版本中加入。

---

## 用户反馈摘要

从 Issue 评论中提取的真实用户痛点和诉求：

1. **安装与文档体验** (#5269)  
   用户指出缺少 `cargo binstall zeroclaw` 等便捷安装方法的文档，初次安装流程不顺畅，建议全面改进安装文档。 [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/5269)

2. **Daemon 自动启动冲突** (#5628)  
   用户反馈安装为 systemd 服务后，手动运行 `zeroclaw daemon` 会因端口占用失败。期望提供配置选项或自动检测逻辑。 [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/5628)

3. **SOP 实际不可用** (#8563)  
   用户严格按照 StageHand 示例配置了 SOP，但 agent 运行时完全检测不到。工作流受阻，文档与实际行为脱节。 [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/8563)

4. **Cron 文档缺失 & 模型绑定需求** (#7762)  
   用户寻找 cron 用法但官方文档空白；希望允许对低优先级任务指定便宜模型，避免浪费高端模型资源。 [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/7762)

5. **TUI 编辑不便** (#7467, #7468)  
   用户在编辑字符串时无法使用方向键导航修正，必须重新输入全部内容；另希望给 alias 添加重命名功能。反映了 TUI 配置界面的可用性短板。 [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/7467) [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/7468)

6. **macOS 应用崩溃** (#7527)  
   macOS 15.7.7 用户安装后无法正常使用（权限检测失败、空白页、窗口消失），当前无回应。macOS 用户群体可能受此影响。 [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/7527)

**总体评价：** 用户对项目功能愿景认可（看多 Agent、安全方向），但对**文档完备性、基础配置可用性、跨平台稳定性**仍有较多不满。这些问题虽然标签多为 P2，但其阻碍了用户体验闭环，值得在功能开发之余加大投入。

---

## 待处理积压

以下 Issue / PR 长期未取得明显进展或被阻塞，需维护者优先关注：

### 阻塞 / 高风险 Issue
- **#6293 RFC: 空气间隙执行模式（Unix socket 伴生守护进程）** — status:blocked, 创建于 5 月初，需架构决策推进。 [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/6293)
- **#5869 安全依赖废弃（rumqttc 导致 rustls-webpki 积压）** — blocked 近 3 个月，直接影响 CI security check。 [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/5869)
- **#7527 macOS 应用不工作** — 仅有 2 条评论且被 blocked，用户求助未被响应，可能影响潜在 macOS 贡献者。 [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/7527)
- **#8367 能力感知文档（capability-aware documentation）** — status:blocked, needs-maintainer-review，架构级文档翻新提议停滞。 [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/8367)

### 需作者交互的 PR（needs-author-action）
- **#8443 feat(matrix): 单消息进度草稿** — XL 级 PR，涉及 Matrix 流式优化，等待作者进一步响应。 [查看](https://github.com/zeroclaw-labs/zeroclaw/pull/8443)
- **#8866 fix(daemon): 心跳间共享 MCP 注册表** — XL 级，解决 MCP 连接风暴，需作者更新。 [查看](https://github.com/zeroclaw-labs/zeroclaw/pull/8866)
- **#8601 fix(skills): 支持 Owner 限定的 ClawHub 安装** — 修复与新 catalog 模式的兼容性，需作者回应。 [查看](https://github.com/zeroclaw-labs/zeroclaw/pull/8601)

### 长期 no-stale 但仍未关闭
- **#2767 多 Agent 路由** — 2026-03-04 开启，no-stale，9 个 👍，是社区最期待的功能之一，但尚未有对应 PR 合并。 [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/2767)
- **#5628 Daemon 端口冲突** — no-stale，S2 但持续 3 个月未修复。 [查看](https://github.com/zeroclaw-labs/zeroclaw/issues/5628)

**建议：** 维护团队在推进大型 RFC 实现的同时，应适当分配带宽解决这些已 **blocked** 且用户真实受阻的问题（尤其 S1 Bug #8563 / #8560），以及积压的 **needs-author-action** PR，社区贡献者的动力需要及时响应来维持。

---

*本报告基于 Zeroclaw GitHub 仓库 2026-07-17 公开数据生成，覆盖过去 24 小时变化。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

好的，这是根据您提供的 GitHub 数据生成的 PicoClaw 项目动态日报。

---

# PicoClaw 项目动态日报 | 2026-07-18

## 1. 今日速览

过去 24 小时，PicoClaw 项目共发生 **4 条 Issue 更新**与 **12 条 PR 活动**，社区互动量处于近期高位，表面活跃度显著。然而，大量条目被自动标记为 `[stale]`（过期），暴露出项目维护面临的核心挑战：尽管社区贡献热情高涨（贡献者密集提交了对 WhatsApp、OAuth 及安全模块的改进），但大量高质量 PR 因审查资源受限而进入积压状态。好消息是，此前困扰新用户的 **配置迁移 Bug 已被关闭**，且关键的 **CLI 稳定性修复**和 **依赖锁定修复** 终于获得合并。整体而言，项目呈现“贡献者生态繁荣、维护者交付承压”的态势，健康度良好，但交付节奏亟需加速以消耗积压成果。

## 2. 版本发布

**昨日无新版本发布。** 当前最新稳定版本仍为 v0.2.9。

## 3. 项目进展

今日项目在**稳定性与合规性**上取得了实质性推进，两条长期悬停的 PR 被合并/关闭：

- **#3180 [CLOSED] fix(cli): skip tool calls with invalid arguments**
  - **状态：** 已合并
  - **摘要：** 修复了 CLI 模式下，当工具调用参数为非法 JSON 时，导致整批响应被丢弃的 Bug。现在系统会跳过无效调用并保留有效响应。
  - **影响：** 悬停近 3 周后被合并，显著提升了 CLI 交互的鲁棒性。
  - **链接：** [https://github.com/sipeed/picoclaw/pull/3180](https://github.com/sipeed/picoclaw/pull/3180)

- **#3204 [CLOSED] fix(deps): restore Azure dependency freeze baseline**
  - **状态：** 已关闭
  - **摘要：** 回滚了 Azure SDK 版本的意外升级，锁定至下游供应链审计所需的基线版本（azcore v1.21.1 等）。
  - **影响：** 修复了依赖漂移问题，恢复了供应链安全的合规性。
  - **链接：** [https://github.com/sipeed/picoclaw/pull/3204](https://github.com/sipeed/picoclaw/pull/3204)

> **效率分析：** 尽管今日有 PR 合并，但对比 12 条总活动量，积压清理速度仅 16.7%。项目整体向前迈进，但步伐相对谨慎。

## 4. 社区热点

- **最活跃功能请求：** **[#3201 [Feature] Support streaming output for QQ channel](https://github.com/sipeed/picoclaw/issues/3201)**
  QQ 频道用户对实时流式输出有强烈需求，该 Issue 获得 3 条讨论。目前 Telegram 和 WebSocket 已支持，QQ 渠道的缺失成为社区关注焦点。目前尚无对应 PR，处于需求论证阶段。

- **“报修合一”的典型协作：** **[#3239 OAuth refresh bugs](https://github.com/sipeed/picoclaw/issues/3239) & [#3240 WhatsApp typing issues](https://github.com/sipeed/picoclaw/issues/3240)**
  贡献者 @As-tsaqib 在报出这两个关键 Bug 后，同日即提交了对应的修复/功能 PR（[#3241](https://github.com/sipeed/picoclaw/pull/3241), [#3242](https://github.com/sipeed/picoclaw/pull/3242)）。这种高效的“自我修复”模式是项目社区成熟度高的强力信号。

- **密集贡献者：** 贡献者 `@corporatepiyush` 今日一口气提交了 4 个 PR，从安全加固（#3246 MQTT TLS验证）到性能优化（#3243 Builder重写），表现出对项目底层架构的深度关注。

## 5. Bug 与稳定性

| 严重程度 | 问题描述 | Issue/PR | 当前状态 |
|---|---|---|---|
| **严重 (High)** | OAuth 刷新请求体格式不兼容（OpenAI 需 JSON 而非 Form）且并发刷新存在竞态条件。严重破坏 OpenAI 连接器认证。 | [Issue #3239](https://github.com/sipeed/picoclaw/issues/3239) | **已有修复 PR (#3241) 待合并** |
| **严重 (High)** | MQTT 通道硬编码 `InsecureSkipVerify: true`，默认跳过所有 TLS 证书验证。属于严重安全漏洞。 | [PR #3246](https://github.com/sipeed/picoclaw/pull/3246) | **修复代码已提交，待审查合并** |
| **中等 (Medium)** | ID 标准化函数（NormalizeAgentID）在处理首尾下划线时逻辑不彻底，可能导致路由匹配失败。 | [PR #3202](https://github.com/sipeed/picoclaw/pull/3202) | **修复代码已提交，待审查合并** |
| **已解决** | v2→v3 配置迁移时，因遇到 `build_info, session.dm_scope` 属未知字段而报错，大幅影响新用户开箱体验。 | [Issue #3206](https://github.com/sipeed/picoclaw/issues/3206) | **已关闭** |

## 6. 功能请求与路线图信号

**高概率进入下一版本的功能（已有待合并 PR）：**
1. **WhatsApp 原生输入状态反馈**（[#3240](https://github.com/sipeed/picoclaw/issues/3240) → [#3242](https://github.com/sipeed/picoclaw/pull/3242)）：解决回复期间无反馈的“死空”体验。
2. **OAuth 多提供商兼容与并发安全**（[#3239](https://github.com/sipeed/picoclaw/issues/3239) → [#3241](https://github.com/sipeed/picoclaw/pull/3241)）：修复 OpenAI/Google 认证兼容性。
3. **安全与性能加固**（[#3243](https://github.com/sipeed/picoclaw/pull/3243) - [#3246](https://github.com/sipeed/picoclaw/pull/3246)）：包括 MQTT 证书验证、Seahorse/Skills 模块的字符串性能优化。
4. **国际化扩展**（[#3247](https://github.com/sipeed/picoclaw/pull/3247)）：新增捷克语翻译。

**远期路线图信号：**
- **QQ 频道流式输出**（[#3201](https://github.com/sipeed/picoclaw/issues/3201)）：需求明确，待社区或官方实现。
- **Simplex 通道支持**（[#3193](https://github.com/sipeed/picoclaw/pull/3193)）：已提交 PR，意在拓展去中心化通信渠道。

## 7. 用户反馈摘要

- **配置迁移挫折：** 用户 @OhYash 反映，即使在最新版 （v0.2.9） 全新安装后，运行 `picoclaw status` 直接报错 `unknown field(s)`，严重影响新用户体验。**（该问题现已修复关闭）**
- **交互体验痛点：**
  - **QQ 频道用户：** 缺乏流式输出，回复延迟感重。
  - **WhatsApp 用户：** 处理回复期间没有任何“正在输入”反馈，导致用户感到困惑甚至怀疑机器人故障。
- **认证问题：** 有用户在对接 OpenAI 时遇到 OAuth 令牌刷新失败，暴露出不同提供商间兼容性不足的问题。
- **痛点→方案的快速转化：** 以上多个痛点（WhatsApp、OAuth）的提交者同时也是修复代码的作者，体现出用户“不满足于投诉，更倾向于动手术”的高质量社区文化。

## 8. 待处理积压

**最需关注的长寿尸 (Stale PR)：**
- **[#1951 chore: move installation scripts from docs repo to here](https://github.com/sipeed/picoclaw/pull/1951)**
  - **创建自：** 2026-03-24（已停滞近 4 个月）
  - **概述：** 将安装脚本从文档仓库迁移至主仓库。
  - **风险：** 低风险的基础设施优化。长期停滞可能严重打击贡献者 @lc6464 的积极性。**强烈建议维护者优先处理或对此 PR 给出明确回应。**

**高价值待合并 PR 集群（创建于 2026-07-10，已积压一周）：**
- **安全加固集群：** #3246 (TLS验证)
- **性能优化集群：** #3243, #3244, #3245 (字符串分配优化)
- **渠道功能集群：** #3242 (WhatsApp 输入状态)
- **认证修复集群：** #3241 (OAuth刷新)
- **国际化集群：** #3247 (捷克语)
  > **分析：** 这 6 个 PR 覆盖面广、质量高，构成了下一次版本发布的核心候选。审查资源的优先级分配将直接影响版本的发布节奏。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 (2026-07-18)

---

## 1. 今日速览

过去 24 小时内，QwenPaw 项目保持 **高活跃度**：累计更新 25 条 Issue（新开/活跃 15，关闭 10）、42 条 PR（待合并 17，已合并/关闭 25），并正式发布了 **v2.0.0.post3** 补丁版本。社区围绕 Windows 启动权限、消息可靠性、升级兼容性等话题展开了密集讨论；开发团队快速响应，合入了浏览器超时控制、多智能体启动并发限流、通道基础重构、多模态探测容错等多项稳定性改进。功能请求方面，用户对工具调用展示控制、静态资源缓存、模型配置灵活性等需求强烈，部分已有对应 PR 跟进。整体上看，项目在修复已有问题、吸纳社区反馈的同时，保持着稳健的迭代节奏。

---

## 2. 版本发布

### v2.0.0.post3 发布

- **发布链接**：https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.0.0.post3  
- **类型**：补丁版本，附带 CI/CD 改进。

#### 主要更新内容

| 分类 | 变更 | 说明 |
|------|------|------|
| 修复 (MCP) | fix(mcp): migrate ${VAR} headers to env credential refs during driver migration | 在 MCP 驱动迁移过程中，将 `${VAR}` 形式的变量引用自动转换为环境凭据引用，避免因硬编码变量导致的配置错误（PR #6091）。 |
| 重构 (CI) | refactor(ci): harden desktop workflows and drop legacy verify dead code | 强化桌面端 CI 工作流，移除不再使用的 verify 废弃代码，提升自动化测试的健壮性和可维护性。 |

#### 破坏性变更与迁移注意事项

本版本不包含任何向后不兼容的破坏性变更。  
- 若你在 MCP 配置中使用了 `${VAR}` 风格的环境变量引用，此次迁移可自动处理，无需手动调整。  
- CI 流程的简化对普通用户无影响。建议保持至最新版本以享受这两项改进。  

---

## 3. 项目进展

过去 24 小时共合并/关闭的 **25 个 PR** 中，以下为对项目稳定性、性能及架构有显著推进的重要合并（含已关闭但明显为合并的情况）：

| PR 编号 | 标题 | 核心贡献 |
|---------|------|----------|
| [#6170](https://github.com/agentscope-ai/QwenPaw/pull/6170) | fix(browser): add MAX_WAITTIME for browser use | 限制浏览器自动化工具中模型传入的等待时间上限，避免因超长 `wait_time` 导致 Agent 阻塞。 |
| [#6198](https://github.com/agentscope-ai/QwenPaw/pull/6198) | feat: bound multi-agent startup and improve readiness UX | 限制多 Agent 启动并发度（渐进初始化），避免 ReMe 资源竞争导致的内存峰值，同时优化启动状态展示。 |
| [#6159](https://github.com/agentscope-ai/QwenPaw/pull/6159) | Refactor channel base | 将 Token 用量统计从 ConsoleChannel 下沉到 BaseChannel，使所有频道都能正确解析、持久化并发送 `turn_usage` 事件，提升数据一致性。 |
| [#6220](https://github.com/agentscope-ai/QwenPaw/pull/6220) | fix(token_usage): don't persist an unseeded cache on shutdown | 修复 Token 用量缓冲在关闭时可能将未初始化（空）缓存写入磁盘的问题，避免数据污染。 |
| [#6204](https://github.com/agentscope-ai/QwenPaw/pull/6204) | fix(utils): drop redundant nvidia-smi probe in get_vram_size_gb | 消除 `get_vram_size_gb()` 中重复的 nvidia-smi 调用，减少系统信息探测开销。 |
| [#6218](https://github.com/agentscope-ai/QwenPaw/pull/6218) | fix(runtime): pass model_slot_override from HTTP request to model factory | 修复 HTTP 请求中指定的 `model_slot_override` 未被正确传递到模型工厂的问题，确保在线切换模型配置生效。 |
| [#6217](https://github.com/agentscope-ai/QwenPaw/pull/6217) | fix: treat unprobed multimodal as fail-open to prevent image stripping | 将未探测的多模态支持从 `False` 改为 `is not False`，防止图片在模型实际支持多模态时被主动剥离（被动容错）。 |
| [#6234](https://github.com/agentscope-ai/QwenPaw/pull/6234) | fix: use absolute import in Tauri entry point | 使用绝对导入修复 PyInstaller 下 Tauri 入口的包上下文丢失问题，确保 Windows sandbox 启动正确。 |

**项目整体进展**：上述合并既及时修复了数个隐蔽的运行时逻辑错误（Token 持久化、模型参数覆盖、多模态探测），又通过并发控制、超时限制等机制增强了系统健壮性。架构层面，通道基础重构为未来统一各频道的使用统计铺平了道路。项目正从功能快速迭代期进入 **稳定加固 + 性能优化** 阶段。

---

## 4. 社区热点

以下 Issue/PR 在过去 24 小时内获得最多评论与互动，反映了用户的集中关切：

### [#6161 – [Bug]: Windows 更新后普通用户无法启动，卡在 "Waiting for HTTP ready..."](https://github.com/agentscope-ai/QwenPaw/issues/6161)
- **评论数**：7  
- **状态**：已关闭 (CLOSED)  
- **分析**：Windows 更新后普通用户权限下完全无法启动，仅管理员运行可用。问题关闭可能意味着已找到根因（与权限检查或端口绑定策略有关），但社区对“为何更新前正常、更新后异常”的回复仍有疑问。该 Issue 暴露出桌面端在 Windows 普通用户场景下的脆弱性，是高关注度的话题。

### [#5995 – [Bug] Messages silently dropped when session is busy — no queue, no error](https://github.com/agentscope-ai/QwenPaw/issues/5995)
- **评论数**：6  
- **状态**：开放 (OPEN)  
- **分析**：当 Agent 会话正忙时（如等待审批回调、多步工具调用），来自同一用户的后续消息被静默丢弃，既不排队也不报错。这是 **严重消息丢失 Bug**，影响核心可用性。用户对排队机制的需求强烈，且问题已持续 6 天未合并修复，社区期待尽快解决。

### [#6155 – [Bug]: 从 1.x 升级到 2.0 后，发现多个问题](https://github.com/agentscope-ai/QwenPaw/issues/6155)
- **评论数**：5  
- **状态**：开放 (OPEN)  
- **分析**：用户报告从 1.x 升级到 2.0 后出现 Embedding 映射遗漏、Auto-Memo 功能异常等连锁问题，影响平滑升级体验。该 Issue 对版本兼容性提出了明确挑战，开发团队已在评论中收集细节并逐步修复，但仍有部分未解决。

### [#6169 – [Bug]: pip 安装的 QwenPaw 2.0.0.post2 强迫管理员权限启动](https://github.com/agentscope-ai/QwenPaw/issues/6169)
- **评论数**：3  
- **状态**：已关闭 (CLOSED)  
- **分析**：强制 UAC 提权导致非管理员拒绝后程序直接退出，用户反馈强烈。已关闭可能表示引入了修复或文档说明，但社区仍期待更良性的权限降级机制。

**总结**：当前社区最关心的三大热点依次是 **Windows 权限兼容性**、**消息可靠性** 和 **版本升级平滑性**。维护者可优先回应这些领域的后续进展。

---

## 5. Bug 与稳定性

以下按 **严重程度从高到低** 列出今日报告（含 OPEN 和 CLOSED）的主要 Bug，并标注是否已有修复 PR。

### P0 – 核心功能异常
| Issue | 描述 | 状态 | 已有 Fix PR？ |
|-------|------|------|---------------|
| [#5995](https://github.com/agentscope-ai/QwenPaw/issues/5995) | 会话忙碌时消息静默丢弃，无排队无错误 | **OPEN**（已 6 天） | ❌ 无 |
| [#6155](https://github.com/agentscope-ai/QwenPaw/issues/6155) | 1.x → 2.0 升级后 Embedding 映射、Auto-Memo 等问题 | **OPEN** | 部分已修复但未完全关闭 |

### P1 – 严重影响用户体验
| Issue | 描述 | 状态 | 已有 Fix PR？ |
|-------|------|------|---------------|
| [#6161](https://github.com/agentscope-ai/QwenPaw/issues/6161) | Windows 普通用户无法启动，卡在 HTTP ready | **CLOSED** | 可能已通过文档或修复关闭 |
| [#6169](https://github.com/agentscope-ai/QwenPaw/issues/6169) | pip 版强制管理员权限启动 | **CLOSED** | 可能已加入权限检测优化 |
| [#6219](https://github.com/agentscope-ai/QwenPaw/issues/6219) | Desktop 强制终止后端而非优雅关闭 | **OPEN** | ✅ [#6225](https://github.com/agentscope-ai/QwenPaw/pull/6225) |
| [#6003](https://github.com/agentscope-ai/QwenPaw/issues/6003) | 控制台不显示飞书频道发来的消息 | **CLOSED** | 已关闭，可能已修复 |
| [#5934](https://github.com/agentscope-ai/QwenPaw/issues/5934) | Windows 本地 file:/// 媒体 URI 被错误转换 | **CLOSED** | 已关闭，可认为已修复 |

### P2 – 功能受限或异常
| Issue | 描述 | 状态 | 已有 Fix PR？ |
|-------|------|------|---------------|
| [#6193](https://github.com/agentscope-ai/QwenPaw/issues/6193) | MCP 驱动串行启动导致启动延迟 8 倍 | **OPEN** | 无专门 PR，但可考虑引入并行初始化方案 |
| [#6202](https://github.com/agentscope-ai/QwenPaw/issues/6202) | Desktop 版工作区技能渐进渲染失效（>20 技能时不加载剩余） | **CLOSED** | 已关闭（可能定位为桌面端局限） |
| [#6201](https://github.com/agentscope-ai/QwenPaw/issues/6201) | PubMed MCP 导致 llama.cpp 报错 | **CLOSED** | 已关闭，可能已修复 |

**稳定性总结**：核心 P0 bug（#5995）仍未修复，需优先关注。其他多个 Win 平台 bug 已关闭（#6161, #6169, #5934），表明团队在快速处理平台兼容性问题。优雅关闭已有 PR 覆盖（#6225），总体稳定向好的趋势明显。

---

## 6. 功能请求与路线图信号

过去 24 小时内收到 **10 个新功能请求**（Open的 Enhancement），结合已有 PR，以下为可能被纳入下一版本的信号：

### 高潜力（已有对应 PR 实现）
| Issue | 功能描述 | 对应 PR |
|-------|----------|---------|
| [#5976](https://github.com/agentscope-ai/QwenPaw/issues/5976) | 分开控制 Channel 工具调用参数和结果的发送 | ✅ [#6233](https://github.com/agentscope-ai/QwenPaw/pull/6233) refactor(channels): add separate tool call and result display controls |
| [#6205](https://github.com/agentscope-ai/QwenPaw/issues/6205) | 控制台 js/css 压缩与缓存 | ✅ [#6232](https://github.com/agentscope-ai/QwenPaw/pull/6232) perf(console): cache and compress static assets |

### 中等潜力（社区讨论热烈，已有初步设计）
| Issue | 功能描述 | 备注 |
|-------|----------|------|
| [#6231](https://github.com/agentscope-ai/QwenPaw/issues/6231) | 同一模型 ID 可添加不同配置（如切换 thinking） | 需扩展配置体系，可能影响 Core 层 |
| [#6227](https://github.com/agentscope-ai/QwenPaw/issues/6227) | 支持 per-chat 选择 MCP 服务器和具体工具 | 涉及会话配置 UI 和后端 |
| [#6228](https://github.com/agentscope-ai/QwenPaw/issues/6228) | 每个对话可单独开关联网搜索 | 前后端协同功能 |
| [#6229](https://github.com/agentscope-ai/QwenPaw/issues/6229) | 用户选择推理深度（轻/中/深/自动） | 需后端与模型交互 |
| [#6230](https://github.com/agentscope-ai/QwenPaw/issues/6230) | 支持 Hermes 模型家族作为辅助推理引擎 | 需要模型集成工作 |
| [#6162](https://github.com/agentscope-ai/QwenPaw/issues/6162) | `max_input_length` 支持自动读取模型上下文窗口 | 对 API 用户非常实用 |
| [#5919](https://github.com/agentscope-ai/QwenPaw/issues/5919) | 全局运行配置（避免每个智能体重复配置） | 社区呼声持续 |

### 已在进展中的 PR（可能随下个版本发布）
| PR | 功能描述 |
|----|----------|
| [#6151](https://github.com/agentscope-ai/QwenPaw/pull/6151) | 后台工具调用卸载机制重构（双截止时间架构） |
| [#5698](https://github.com/agentscope-ai/QwenPaw/pull/5698) | `run_tool_batch` 适配 AgentScope 2.0 并添加控制流支持 |
| [#5187](https://github.com/agentscope-ai/QwenPaw/pull/5187) | Windows 桌面 GUI 自动化（UIA + Tauri Control Mode） |
| [#6237](https://github.com/agentscope-ai/QwenPaw/pull/6237) | Scroll 记忆检索增强（支持完整对话交换及日期查询） |

**路线图信号**：短期来看，**工具调用展示控制** 和 **控制台前端性能优化** 最接近合入。中期方向包括 **会话级配置自由化**（per-chat MCP、搜索开关）和 **更智能的上下文处理**（自动读取 max_input_length、推理深度选择）。长线特征如 Hermes 集成、Windows 桌面 UI 自动化仍在持续开发中。

---

## 7. 用户反馈摘要

从 Issues 评论和摘要中提炼的真实用户声音：

- **权限与平台兼容性**：「Windows 更新后普通用户无法启动，只能 Run as Administrator…… 更新前一切正常。」（#6161）  
  → 表明用户期望无管理员权限即可完整使用桌面端，任何破坏此预期的变更都会造成强烈不满。

- **消息可靠性焦虑**：「新消息永远不会被处理……它们在飞书 webhook 被成功接收但从未入队，也从未报错。」（#5995）  
  → 用户对 **静默丢弃** 机制零容忍，需要明确的队列或错误提示保证消息不丢失。

- **升级体验**：「从 1.x 升级到 2.0.0 后，发现 Embedding 映射 Bug、Auto-Memo 异常等问题。」（#6155）  
  → 升级路径的自动化测试和兼容文档需加强，用户期望开箱即用的迁移体验。

- **性能与延迟**：「配置 8 个 MCP 客户端时，光等 MCP 连接就要花 ~40 秒，改成并行只需 ~5 秒。」（#6193）  
  → 用户对启动耗时敏感，强烈期望默认启动优化。

- **功能控制粒度**：「工具调用结果信息太长了，希望可以单独控制结果是否发送，以及截断显示前几行和后几行。」（#5976）  
  → 频道消息展示的灵活定制是高频需求，尤其在企业频道场景中。

- **文档与概念迷惑**：「目前有两套记忆体系（MEMORY.md + 每日记忆 vs Dream digest），它们的定位分别是什么？」（#6222）  
  → 用户对复杂系统存在认知负担，需完善架构文档或交互引导。

---

## 8. 待处理积压

以下为长期未响应或停滞的 Issue/PR，建议维护者在两周内评估优先级：

| 类型 | 编号 | 标题 | 创建日期 | 未回应时长 | 建议行动 |
|------|------|------|----------|------------|----------|
| Bug | [#5995](https://github.com/agentscope-ai/QwenPaw/issues/5995) | 消息静默丢弃（OPEN） | 2026-07-12 | **6 天** | 分配成员给出设计决策：是否引入排队机制或错误提示 |
| Bug | [#6155](https://github.com/agentscope-ai/QwenPaw/issues/6155) | 1.x → 2.0 升级多问题（OPEN） | 2026-07-15 | **3 天** | 列出剩余未修复项，更新文档或发布补丁 |
| Enhancement | [#5976](https://github.com/agentscope-ai/QwenPaw/issues/5976) | 分开控制工具调用展示（OPEN） | 2026-07-11 | **7 天** | 已有关联 PR #6233，可尽快 review 合并 |
| Enhancement | [#5919](https://github.com/agentscope-ai/QwenPaw/issues/5919) | 全局运行配置（OPEN） | 2026-07-10 | **8 天** | 需从架构层面讨论是否纳入 2.1 路线图 |
| PR | [#5698](https://github.com/agentscope-ai/QwenPaw/pull/5698) | `run_tool_batch` 适配（OPEN） | 2026-07-01 | **17 天** | 请求 review 或关闭，避免长期堆积 |
| PR | [#5187](https://github.com/agentscope-ai/QwenPaw/pull/5187) | Windows GUI 自动化（OPEN） | 2026-06-14 | **34 天** | 大规模功能，建议确认时间线或转为 Draft |
| Issue | [#6199](https://github.com/agentscope-ai/QwenPaw/issues/6199) | TG 链接问题（OPEN） | 2026-07-16 | **2 天** | 用户等待解决方案，建议尽快给出初步回应 |

**提醒**：积压中 #5995 和 #6155 直接关系到核心可用性，建议在下一个补丁版本前优先解决。

---

*生成于 2026-07-18 · 数据来自 QwenPaw GitHub 仓库 (https://github.com/agentscope-ai/QwenPaw)*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

好的，这是根据您提供的 `NousResearch/hermes-agent` 项目数据生成的 2026-07-18 项目动态日报。

---

## Hermes-Agent 项目动态日报 | 2026-07-18

### 1. 今日速览

过去 24 小时内，Hermes-Agent 社区保持极高活跃度。Issue 侧共产生 **247 条**更新（新开/活跃 195 条，关闭 52 条），PR 侧更新激增至 **500 条**（新增待合并 385 条，合并/关闭 115 条）。尽管今日无新版本发布，但项目在 **Agent 核心稳定性**（密集解决内容格式导致的无限循环）、**Provider 兼容性**（Anthropic 鉴权、OpenAI 推理模型路由）以及 **桌面端修复** 方面取得了显著进展。**115 个 PR 的合并量** 标志着项目正处于高度活跃的快速迭代期。

---

### 2. 版本发布
根据数据源，近 24 小时无新版本发布。

---

### 3. 项目进展

今日项目合并/关闭了 **115 个 PR**，重要的代码推进包括：

- **MCP 生态权限模型优化**：[#66554](https://github.com/NousResearch/hermes-agent/pull/66554) 已合并，引入了 `subagent_only` 作用域，允许将特定 MCP 工具仅暴露给委托子代理，提升了架构灵活性。
- **Provider 配置修复与增强**：[#65547](https://github.com/NousResearch/hermes-agent/pull/65547) 解决自定义 Anthropic 协议鉴权头自适应问题。[#66563](https://github.com/NousResearch/hermes-agent/pull/66563) 修复切换到推理模型（如 GPT-5.x）时自动路由到正确 API 端点，并支持全局持久化配置。
- **工具链修复**：[#60599](https://github.com/NousResearch/hermes-agent/pull/60599) 已合并，修复了 `write_file` 工具在语法检查失败时未向上报告错误的问题，实现了“故障闭合”模式。
- **桌面端与 CLI**：[#66569](https://github.com/NousResearch/hermes-agent/pull/66569) 修复了多窗口模式下因快照过期导致的提交混乱。 [#66566](https://github.com/NousResearch/hermes-agent/pull/66566) 修复了 Windows 系统下 Cron 脚本弹窗干扰。
- **CI/CD 健壮性**：[#66560](https://github.com/NousResearch/hermes-agent/pull/66560)/[#66562](https://github.com/NousResearch/hermes-agent/pull/66562) 迅速回滚了因 Token 权限不足导致 Fork 仓库 PR 的 CI 流程中断的严重问题。

---

### 4. 社区热点

- **🔥 最热功能诉求：Claude 订阅 OAuth 支持** — [#25267](https://github.com/NousResearch/hermes-agent/issues/25267) （41 👍，11 评论）
  用户强烈希望将 Hermes 与个人 Claude 订阅绑定，避免在已有订阅费外再支付昂贵 API 费用。这是社区呼声最高的需求，可能深刻影响用户的 Provider 选择策略。

- **🌐 国际化浪潮：葡语、俄语、德语本地化请求**
  - [#40239](https://github.com/NousResearch/hermes-agent/issues/40239) (葡萄牙语 pt-BR，8 评论)
  - [#52137](https://github.com/NousResearch/hermes-agent/issues/52137) (俄语 ru-RU，7 评论)
  - [#51217](https://github.com/NousResearch/hermes-agent/issues/51217) (德语 de，4 评论)
  在法语和中文之后，多种语言请求接连涌现，社区对桌面端的全球化支持需求迫切。

- **💡 创新功能脑暴：Dreaming 记忆巩固系统** — [#25309](https://github.com/NousResearch/hermes-agent/issues/25309) （6 评论）
  受生物睡眠周期启发，提议在空闲期自动将短期记忆巩固为长期记忆。反映了社区对 Agent 基础能力（长时记忆、自主优化）的更高期待。

- **💬 性能痛点关注：本地模型超大提示词** — [#61265](https://github.com/NousResearch/hermes-agent/issues/61265) （6 评论，1 👍）
  用户报告 Hermes 向本地模型发送超大 prompts，导致多分钟停滞，严重影响自部署用户体验。

---

### 5. Bug 与稳定性

- **P1 严重性**
  - **多模态内容列表导致崩溃/死循环**： [#66267](https://github.com/NousResearch/hermes-agent/issues/66267) 报告在一个包含图片/视觉内容的轮次后，Agent 处理列表格式内容会陷入无限重试直至耗尽预算。今日有 [#66567](https://github.com/NousResearch/hermes-agent/pull/66567)、[#66557](https://github.com/NousResearch/hermes-agent/pull/66557)、[#66550](https://github.com/NousResearch/hermes-agent/pull/66550) 三个 PR 针对“Think 块”和“列表内容”导致的类似现象进行修复，表明项目团队正在集中力量解决此大类的运行时稳定性问题。

- **P2 严重性**
  - **中文 Windows 系统触发 GBK 崩溃**： [#53428](https://github.com/NousResearch/hermes-agent/issues/53428) `subprocess.run` 未指定 `encoding` 导致 CP936 编码爆红，影响 21 个调用点。
  - **Deepseek 自定义端点失效**： [#17199](https://github.com/NousResearch/hermes-agent/issues/17199) “模型名规范化”功能破坏了如火山引擎 ARK 等自定义 Endpoint，长期阻挡第三方 API 用户。
  - **Claude 提示缓存失效**： [#56776](https://github.com/NousResearch/hermes-agent/issues/56776) 通过自定义 OpenAI 兼容 Provider 使用 Claude 时，缓存命中率为 0%，造成成本飙升。
  - **Desktop 启动超时**： [#60144](https://github.com/NousResearch/hermes-agent/issues/60144) Windows 环境下 MCP 插件加载超时导致 Electron 启动失败。

- **今日已关闭/修复的 Bug**
  - MCP 工具在 QQ/Telegram 等网关不可用 → [#65662](https://github.com/NousResearch/hermes-agent/issues/65662) (已关闭)
  - 桌面端非默认 Profile 每次新建 Session → [#65384](https://github.com/NousResearch/hermes-agent/issues/65384) (已关闭)
  - Codex 协议 `prompt_cache_key` 超长 400 错误 → [#66045](https://github.com/NousResearch/hermes-agent/issues/66045) (已关闭)

---

### 6. 功能请求与路线图信号

- **热门待采纳（路线图潜力高）**：
  - **Claude SDK OAuth 支持** (#25267)：41 个 👍 使其成为 Provider 侧高优先级需求。
  - **国际化 i18n 批量落地**：面对多语言请求潮，维护者可能会在本周期内集成社区翻译 PR 或官方开启国际化配置。
  - **插件事件总线** ([#64164](https://github.com/NousResearch/hermes-agent/issues/64164)）：提出 `ctx.emit()` / `ctx.subscribe()` 标准化插件间通讯，是插件系统成熟化的关键。
- **值得关注的挑战**：
  - **“梦” 记忆系统** ([#25309](https://github.com/NousResearch/hermes-agent/issues/25309)）：虽然尚是请求，但体现了项目在 Agent 长期记忆与自主性上的前沿探索。
  - **Cron Job 启用记忆** ([#9763](https://github.com/NousResearch/hermes-agent/issues/9763)）：当前 `skip_memory=True` 被硬编码在定时任务中。若解除限制，将大幅提升 CRON 任务的实用价值。

---

### 7. 用户反馈摘要

- **满意点**：
  - 社区普遍赞赏维护者的响应速度，从 CI 修复、Desktop Session 新建问题到内容格式导致死循环等严重问题均在短时间内被跟踪并推送 Fix PR。这种“即时响应”极大地提升了项目信任度。

- **痛点**：
  - **“双重付费”与配置排斥感**：Claude 订阅用户（#25267）和 Deepseek 自定义 API 用户（#17199）感到被现有的 Provider 实现逻辑“拒之门外”。用户认为这些配置问题让他们在付费订阅之外还要承受额外的配置高门槛和成本。
  - **“Windows 之痛”**：从安装器失败（#42972）到 GBK 编码崩溃（#53428），再到 MCP 加载超时（#60144），Windows 桌面端体验问题集中爆发，导致用户感觉“Windows 是一等公民”。

---

### 8. 待处理积压

以下 Issue 长期缺乏有效进展，提醒维护者关注：

- **#17199 Deepseek Provider 自定义端点被阻断** (4-29 创建，P2)：Block 大量使用第三方 API 的用户，却无修复 PR 跟进。
- **#46265 SimpleX 私信静默丢弃** (6-14 创建，P3)：出站 DM 表面成功但收不到。虽是 P3，但属于严重的“静默数据丢失”问题，影响用户信任。
- **#8512 BlueBubbles webhook 因 IPv6 解析失败** (4-12 创建，P2)：macOS 用户 iMessage 桥接长期失效。
- **#9763 Cron Job 被硬编码禁止记忆** (4-14 创建，P2)：功能设计决策悬而未决。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

**AstrBot 项目动态日报 | 2026-07-18**

---

### 1. 今日速览
项目在过去24小时内维持高活跃度，表面平静下潜藏着重大安全风波：社区安全研究员提交了两份深度安全审计报告（#8860、#9304），指出在认证环境下仍存在主机级代码执行与SSRF漏洞，警报级别极高。与此同时，两项长期开发的遗留PR（人格导入/导出 #4532、Embedding参数修复 #8526）终获合并，核心功能完整性得到实质提升。目前暂无新版本发布，项目正处于“安全防线紧急加固 + 核心特性收尾”的关键窗口期。

---

### 2. 版本发布
无新版本发布。

---

### 3. 项目进展
过去24小时有 **2 个重要 PR 被合并关闭**，另有 **1 个修复 PR 开放**：

- **人格系统完善（PR #4532）**：
  经历近半年的开发迭代，[@Sjshi763](https://github.com/Sjshi763) 的 PR 正式合并。新增“人格设定（Persona）导出/导入”功能，解决了 [#4409](https://github.com/AstrBotDevs/AstrBot/issues/4409)。这使得用户可以像分享插件一样分享复杂的人格模板，显著提升了社区生态复用性。
  **影响面**：大。

- **Embedding Provider 兼容性修复（PR #8526）**：
  [@kawayiYokami](https://github.com/kawayiYokami) 合并了此 PR，为 OpenAI 兼容的 Embedding 接口新增 `dimensions` 请求参数开关（默认关闭）。此前 `embedding_dimensions` 仅被用作本地向量元数据，却被错误地作为 API 请求参数发送，导致许多仅接受 `input` 字段的模型无法使用。该修复默认关闭了 API 请求传送。
  **影响面**：中。

- **知识库清理 Bug 修复（PR #9303）**：
  [@he-yufeng](https://github.com/he-yufeng) 提交了新 PR，修复 `delete_kb()` 逻辑中 O/R 映射缺失外键级联导致 `KBDocument` 和 `KBMedia` 表数据残留的问题。目前该 PR 标记为 `[OPEN]`，待核心团队 review。
  **链接**：https://github.com/AstrBotDevs/AstrBot/pull/9303

---

### 4. 社区热点
- **【安全热议】MCP集成后的攻击面扩容（#8860 / #9304）**
  这是今日社区讨论最集中的区域，两份报告均针对 MCP（Model Context Protocol）模块。

  - **[#8860]** 指出已认证（Authenticated）的 Dashboard 用户可通过 **备份导入功能** 和 **MCP stdio 配置** 实现主机级 Python zipapp 执行。这意味着即使攻击者只有普通后台权限，也能横向移动至宿主机。
    **链接**：https://github.com/AstrBotDevs/AstrBot/issues/8860

  - **[#9304]** 更进一步，发现 MCP 客户端核心中存在 **4 个全新的 SSRF 和环境变量泄漏路径**，明确宣示“CVEs 补丁无法覆盖这些路径”（此处指已公布的 CVE-2026-15500/15501 的修复）。
    **链接**：https://github.com/AstrBotDevs/AstrBot/issues/9304

  > **分析**：MCP 作为连接 AI 与外部世界的“万能插槽”，其 stdio/HTTP 通信层天然具备高风险属性。两份报告表明，AstrBot 当前的安全模型需要更细粒度的权限沙盒，不能仅依赖“认证即信任”的假设。

- **Agent 体验痛点（#9305）**
  [@CMKH1337](https://github.com/CMKH1337) 提出的断句问题获得多名用户共鸣。Agent 在调用工具后（如搜索、代码分析）的回复被断句器切碎，在微信渠道（单次最多10条消息）经常导致结果截断。该用户已开发可用插件并请求合入官方配置。
  **链接**：https://github.com/AstrBotDevs/AstrBot/issues/9305

---

### 5. Bug 与稳定性
按严重程度排列：

| 严重度 | 编号 | 标题 | 修复状态 |
|-------|------|------|---------|
| **严重** | [#8860](https://github.com/AstrBotDevs/AstrBot/issues/8860) | 认证后备份导入/MCP Stdio 配置导致主机 Python zipapp 执行 | 无对应公开 PR |
| **严重** | [#9304](https://github.com/AstrBotDevs/AstrBot/issues/9304) | MCP 客户端核心 SSRF 与环境变量泄漏（超出现有 CVE 范围） | 无对应公开 PR |
| **中等** | [#9303](https://github.com/AstrBotDevs/AstrBot/issues/9303) | 删除知识库时，文档与媒体记录残留（数据库孤儿数据） | 已有 PR [#9303](https://github.com/AstrBotDevs/AstrBot/pull/9303) 待合并 |

**特别警告**：`#8860` 与 `#9304` 属于漏洞链攻击，建议开发者在未修复前，审慎开放 Dashboard 的多用户权限，并限制 MCP stdio 配置的输入来源。

---

### 6. 功能请求与路线图信号
- **Agent 回复逻辑优化（#9305）**：
  用户明确提交了解决方案，诉求非常具体且属于高频痛点。该功能极有可能在下一个版本以 **官方配置开关** 的形式合入核心代码，甚至可能预设为默认可选行为（如仅在 Agent 模式下启用）。

- **人格设定行为约束（#9306）**：
  用户反馈“无人辱骂情况下，机器人偶尔口出恶言”。这虽是模型自身的对齐问题，但暗示社区对 `[feature:persona]` 系统的 **输出安全过滤层** 存在需求。可能需要引入额外的关键字过滤或系统提示词（System Prompt）增强。

---

### 7. 用户反馈摘要
- **专业安全社区态度**：安全报告的评论区体现了较高水平的协作，报告提供了 PoC 思路，持积极负责任的披露态度。普通用户对此可能无感，但企业级部署者应高度警惕。
- **Agent 使用体验**：`#9305` 直接表达了“阅读体验差”、“结果输出被截断”的挫折感。用户主动开发插件并请求官方合并，是参与式开发的积极信号，但也反映当前核心断句逻辑在 Agent 场景下存在设计缺陷。
- **学习门槛反馈**：`#9306` 类问题虽然基础，但侧面反映新手用户在配置完人设后，对模型行为边界的管理存在困惑，项目文档可能需要补充“人设与输出过滤”相关的最佳实践指南。

---

### 8. 待处理积压
- **插件升级阻塞（PR #6422）** ：
  核心依赖保护机制使用 `==` 精确锁定版本，阻塞了兼容插件的升级。例如某插件需要 `aiosqlite>=0.21.0`，若核心锁定 `aiosqlite==0.20.0`，则安装失败。该 PR 非常切中插件生态痛点，但已停滞 **4 个月**，急需维护者介入决策。
  **链接**：https://github.com/AstrBotDevs/AstrBot/pull/6422

- **安全漏洞响应等待**：
  最重要的积压是 [#8860](https://github.com/AstrBotDevs/AstrBot/issues/8860) 和 [#9304](https://github.com/AstrBotDevs/AstrBot/issues/9304) 仍未获得官方确认回复或修复排期。建议维护团队优先置顶响应，给出初步评估结论（确认 / 确认修复路线 / 申诉拒绝），以防止信息真空引发社区猜测。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*