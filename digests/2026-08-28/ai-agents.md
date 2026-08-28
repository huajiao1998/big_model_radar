# OpenClaw 生态日报 2026-08-28

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-28 05:51 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-28

## 今日速览

过去 24 小时项目保持高强度迭代：共更新 500 条 Issues（新开/活跃 408 条，关闭 92 条）与 500 条 PR（待合并 305 条，已合并/关闭 195 条），无新版本发布。Issue 关闭率约 18.4%、PR 合并/关闭率约 39%，合并速度略低于新增速度，积压压力有所上升。社区讨论集中在成本控制、Codex 集成稳定性、Telegram 消息丢失等 P1 问题上，多个高热度 Issue 已进入维护者评审流程，整体项目健康度中等偏上，但稳定性类缺陷仍占主导。

## 版本发布

今日无新版本发布。当前最新 beta 为 [v2026.8.1-beta.3](https://github.com/openclaw/openclaw/releases/tag/v2026.8.1-beta.3)，社区反馈正在 [#125626](https://github.com/openclaw/openclaw/issues/125626) 中持续收集。

## 项目进展

今日合并/关闭 195 条 PR，以下为已关闭的重要 PR 及其推进方向：

- **[#120900](https://github.com/openclaw/openclaw/pull/120900) feat(ui): review install policy warnings** — 管理员现可在 Control UI 中审查安装策略警告并决定是否继续安装插件，`plugins.install` 新增 `acknowledgeInstallPolicyWarning` 参数，完善了插件安装的安全边界。
- **[#117432](https://github.com/openclaw/openclaw/pull/117432) fix(system-agent): tell messaging users a delegated approval can't be applied from chat** — 修复了系统代理在聊天渠道中误导用户"回复 yes 即可批准委托变更"的问题，避免死胡同式交互。
- **[#131373](https://github.com/openclaw/openclaw/pull/131373) fix(daytona): classify transient retry errors through the shared network classifier** — Daytona 扩展的重试逻辑改用共享网络错误分类器，覆盖完整瞬态错误码表，提升重试准确性。
- **[#131554](https://github.com/openclaw/openclaw/pull/131554) fix: reply status shows missing or stale context estimates** — 修复 `/status` 命令在普通或排队回复后显示缺失/过期上下文估算的问题，完善回复诊断持久化。
- **[#114983](https://github.com/openclaw/openclaw/pull/114983) fix(config): preserve legacy model restrictions during migration** — 修复 `doctor --fix` 或配置写入时遗留模型映射被静默弱化的问题，保护既有模型限制策略。
- **[#128995](https://github.com/openclaw/openclaw/pull/128995) feat: make full session actions available from chat header** — 聊天头部菜单补齐了固定、标记未读、设置图标、复制会话 ID、移动到分组等操作，与侧边栏功能对齐。
- **[#123975](https://github.com/openclaw/openclaw/pull/123975) fix(scripts): clean up tsgo process trees on timeout or signal** — `tsgo` 包装器接入托管进程管理，新增 `OPENCLAW_TSGO_TIMEOUT_MS` 看门狗，避免编译器进程树残留。

整体来看，今日合并集中在 UI 体验补全、配置迁移安全、进程生命周期管理三个方向，属于渐进式加固而非重大功能落地。

## 社区热点

今日讨论最活跃的 Issues 反映了用户对**成本控制**、**稳定性**和**发布质量**的强烈关注：

- **[#42475](https://github.com/openclaw/openclaw/issues/42475) [Feature] Per-agent cost budget enforcement at the gateway level**（23 评论，P2）— 用户希望在网关层增加每代理每日/每月成本上限，防止模型调用失控产生巨额费用。该需求直指企业级部署的运维痛点，评论区讨论了与现有 `session-cost-usage.ts` 的集成方式。
- **[#91009](https://github.com/openclaw/openclaw/issues/91009) Codex PreToolUse native hook relay spawns CPU-bound processes**（22 评论，P1）— Codex 集成在 `pre_tool_use` 事件中反复派生 `openclaw-hooks` 进程，每个进程占用 100%+ CPU 并阻塞网关 RPC。这是当前最严重的稳定性问题之一，已有 2 个 👍。
- **[#125626](https://github.com/openclaw/openclaw/issues/125626) OpenClaw 2026.8.1 beta feedback**（22 评论，maintainer 发起）— 官方 beta 反馈收集帖，社区在此汇报 v2026.8.1-beta.3 的各类问题，是版本发布前的重要质量关口。
- **[#48003](https://github.com/openclaw/openclaw/issues/48003) Steer mode does not inject messages mid-turn**（21 评论，P1，4 👍）— `messages.queue.mode: "steer"` 无法在运行中的回合内注入用户消息，只能排队等待回合结束。该问题影响实时交互体验，社区关注度高。
- **[#48788](https://github.com/openclaw/openclaw/issues/48788) Centralized filename encoding utility**（20 评论，P3）— 建议为多编码 Content-Disposition 文件名处理建立统一工具，解决飞书等渠道的中文文件名乱码问题，属于架构层面的改进提案。

## Bug 与稳定性

今日报告的 Bug 数量较多，按严重程度排列如下（标注是否已有修复 PR）：

### P1 严重问题

| Issue | 问题描述 | 修复状态 |
|-------|---------|---------|
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex PreToolUse hook relay 派生 CPU-bound 进程，阻塞网关 RPC | 无 fix PR，需维护者评审 |
| [#87744](https://github.com/openclaw/openclaw/issues/87744) | Codex-backed Telegram 回合反复超时，无法到达 `turn/completed` | 无 fix PR，需 live repro |
| [#53408](https://github.com/openclaw/openclaw/issues/53408) | 长对话后 write/exec 工具参数被静默丢弃（空 arguments） | 无 fix PR |
| [#98435](https://github.com/openclaw/openclaw/issues/98435) | MCP loopback 传输在网关重启后不自动重连，`recovered=1` 具有误导性 | 无 fix PR |
| [#86215](https://github.com/openclaw/openclaw/issues/86215) | Codex OAuth 刷新失败可导致代理卡死数小时，无告警、无 profile 轮换 | 无 fix PR |
| [#48003](https://github.com/openclaw/openclaw/issues/48003) | Steer 模式无法在回合中注入消息 | 无 fix PR，需产品决策 |
| [#53540](https://github.com/openclaw/openclaw/issues/53540) | 大参数工具调用生成延迟超过请求超时，触发 "Network connection lost" | 无 fix PR |
| [#41165](https://github.com/openclaw/openclaw/issues/41165) | Telegram DM 仍可路由到 `agent:main:main`，污染主会话 | 有 linked PR，待合并 |
| [#100941](https://github.com/openclaw/openclaw/issues/100941) | 并行工具扇出时网关丢弃 WebSocket 连接（1006），误报 "Gateway crashed" | 无 fix PR，需 live repro |
| [#131150](https://github.com/openclaw/openclaw/issues/131150) | 网关重启后所有 Slack DM 被静默丢弃（19 账号 socket 模式） | 无 fix PR，新报告 |

### P2 中等问题

- [#99586](https://github.com/openclaw/openclaw/issues/99586) 网关相关操作后运行时工具面返回空白 body，容器重启仅短暂缓解（回归）
- [#125344](https://github.com/openclaw/openclaw/issues/125344) memory-core 本地 embedding 进程与 codex app-server 无空闲 TTL，持续泄漏拖垮 cgroup
- [#129314](https://github.com/openclaw/openclaw/issues/129314) 隐藏的 "next-turn runtime context" 消息偶尔作为独立可见回合发出
- [#126906](https://github.com/openclaw/openclaw/issues/126906) 拒绝 write 工具会静默禁用记忆持久化，且代理仍报告保存成功
- [#112248](https://github.com/openclaw/openclaw/issues/112248)（已关闭）`@openclaw/codex` 插件注册失败，`/codex` 命令全部静默无效

### 稳定性趋势

今日无新版本发布，但 P1 级 Bug 数量较多（约 12 个），且多数尚无 fix PR。其中 Codex 集成相关的问题（#91009、#87744、#86215、#99947）占比最高，提示 Codex 后端的可靠性仍是当前最大短板。此外，多个问题涉及"静默失败"（#53408、#126906、#131150），这类问题对用户信任伤害最大，建议优先排查。

## 功能请求与路线图信号

今日收集到的功能需求中，以下方向呼声较高，结合已有 PR 判断纳入下一版本的可能性：

- **网关级成本预算**（[#42475](https://github.com/openclaw/openclaw/issues/42475)）— 每代理每日/每月成本上限，企业级运维刚需。当前无对应 PR，但讨论热度高，可能进入路线图。
- **多槽记忆架构**（[#60572](https://github.com/openclaw/openclaw/issues/60572)）— 将单一 memory 槽位拆分为多个用途特定的记忆槽，支持不同记忆提供者分层协作。已有 linked PR，处于产品决策阶段。
- **多 Teams 机器人支持**（[#71058](https://github.com/openclaw/openclaw/issues/71058)）— 单个网关支持多个 Azure/Teams 机器人身份。当前 `channels.msteams` 为单对象限制，属于明确的功能缺口。
- **MathJax/LaTeX 渲染**（[#42840](https://github.com/openclaw/openclaw/issues/42840)）— Control UI 数学公式渲染支持，10 个 👍 表明社区有真实需求，但 P3 优先级较低。
- **Slack 模态框支持**（[#88154](https://github.com/openclaw/openclaw/issues/88154)）— 通过 Slack 原生模态框收集结构化用户输入，替代重复消息提示。
- **持久任务状态面板**（[#52640](https://github.com/openclaw/openclaw/issues/52640)）— 为长时运行渠道回合提供权威状态展示面，当前 typing indicator 等方案不够统一。
- **maxTurns/maxToolCalls 配置**（[#9912](https://github.com/openclaw/openclaw/issues/9912)）— 限制代理工具调用迭代次数，防止模型忽略系统提示无限循环。2 月提出至今仍开放，建议维护者评估。

## 用户反馈摘要

从今日 Issues 评论中提炼的真实用户声音：

- **成本焦虑**：多位用户表达了对模型调用失控的担忧，#42475 的评论中提到"没有外部监控就无法防止 runaway spend"，说明当前成本观测手段不足。
- **静默失败最伤信任**：#53408（工具参数丢失）、#126906（记忆持久化被静默禁用）、#131150（Slack DM 静默丢弃）的共同点是系统不报错但功能失效，用户评论中多次出现"没有任何提示"、"代理还报告成功"等表述。
- **Codex 集成稳定性拖累体验**：#91009 和 #87744 的评论显示，Codex 后端的 CPU 占用和超时问题已影响 Telegram 等渠道的正常使用，用户被迫回退版本。
- **Beta 反馈活跃**：#125626 中用户积极报告 v2026.8.1-beta.3 的问题，包括插件注册失败、会话恢复异常等，说明社区对 beta 测试参与度较高。
- **UI 细节诉求**：#44130（TUI 滚动跳变）、#51028（会话排序不透明）、#55249（会话标签/昵称）等反馈表明用户对界面交互细节有持续改进期望。

## 待处理积压

以下为长期未响应或停滞的重要 Issue/PR，提醒维护者关注：

- **[#7338](https://github.com/openclaw/openclaw/issues/7338) Agent Attestation Headers**（2 月 2 日创建，P2，security）— 为外部 API 请求提供代理证明头，已标记 `needs-security-review`，搁置近 7 个月。
- **[#9912](https://github.com/openclaw/openclaw/issues/9912) maxTurns/maxToolCalls 配置**（2 月 5 日创建，P2）— 限制代理迭代次数的需求，已开放近 7 个月，无维护者响应。
- **[#28300](https://github.com/openclaw/openclaw/issues/28300) 主题定制系统**（2 月 27 日创建，P3，5 👍）— Control UI 预设主题 + 自定义主题工作室，长期处于 `needs-product-decision`。
- **[#40982](https://github.com/openclaw/openclaw/issues/40982) 3 分钟 no-output 看门狗上限**（3 月 9 日创建，P1）— CLI 请求的 3 分钟无输出上限导致长任务被杀，已有 linked PR 但未合并。
- **[#53008](https://github.com/openclaw/openclaw/issues/53008) 记忆压缩阻塞主处理通道**（3 月 23 日创建，P1）— 记忆压缩挂起导致机器人 10+ 分钟无响应，影响所有入站消息。
- **[#84242](https://github.com/openclaw/openclaw/issues/84242) memory-lancedb 工具未暴露**（5 月 19 日创建，P2，3 👍）— 插件声明了 `memory_store` 等工具但代理动态工具面不暴露，功能形同虚设。
- **[#87561](https://github.com/openclaw/openclaw/issues/87561) 持久最终回退投递语义**（5 月 28 日创建，P1，maintainer）— 定义跨渠道的最终回退消息投递保证，涉及 WhatsApp 等渠道的静默丢消息问题，仍处设计阶段。

---

*本日报基于 OpenClaw 公开 GitHub 数据自动生成，数据截至 2026-08-28。所有链接均可直接访问对应 Issue/PR 页面。*

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告

**日期：2026-08-28**


## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态呈现"头部高烈度迭代、中部架构重构、尾部稳定维护"的三层格局。OpenClaw 与 Hermes Agent 以每日 500 条 PR/Issue 的节奏高速演进，但积压压力同步攀升；Zeroclaw 与 QwenPaw 正处于架构收敛期，分别通过 RFC 流程和版本重构奠定下一阶段基础；PicoClaw 与 AstrBot 则保持小而稳的迭代节奏，聚焦具体场景打磨。跨项目来看，**稳定性缺陷（尤其是静默失败）** 与 **成本治理** 已成为社区最普遍的痛点，而多租户、会话生命周期管理、记忆架构解耦则是下一阶段的技术竞争焦点。


## 2. 各项目活跃度对比

| 项目 | Issues（新开/活跃） | PR（待合并） | Release | 合并/关闭率 | 健康度评估 |
|------|---------------------|--------------|---------|-------------|------------|
| **OpenClaw** | 500（408） | 500（305） | 无 | Issue 18.4% / PR 39% | 中等偏上：迭代强度极高，但 P1 缺陷约 12 个且多数无 fix PR，Codex 集成稳定性是最大短板 |
| **Hermes Agent** | 432（337） | 500（400） | v0.20.6 | Issue 22% / PR 20% | 中高：桌面端与 MCP 修复显著收敛，但安装可靠性（P0）与 400+ 待合并 PR 构成压力 |
| **Zeroclaw** | 33（27） | 50（49） | 无 | Issue 18% / PR 2% | 中：架构讨论深入、Bug 响应及时，但 PR 合并率仅 2%，审查积压风险突出 |
| **QwenPaw** | 26（16） | 48（25） | 无 | Issue 38% / PR 48% | 中高：合并效率良好，但启动性能问题（30s~4min）集中爆发，2.2.0 正式版前需优先解决 |
| **PicoClaw** | 3（3） | 7（1） | 无 | PR 86%（多为 dependabot） | 良好：稳定维护期，依赖自动化正常，但功能请求响应慢（IRC 长消息 37 天无回复） |
| **AstrBot** | 12（8） | 12（9） | 无 | Issue 33% / PR 25% | 良好：Provider 生态扩展节奏快（Synthorai 3 天落地），飞书指令 Bug 由维护者亲自报告需关注 |


## 3. OpenClaw 在生态中的定位

**OpenClaw 是当前生态中功能覆盖面最广、社区规模最大的通用型个人 AI 助手网关**，其核心优势体现在三个维度：

- **规模碾压**：单日 500 条 Issue + 500 条 PR 的活动量是 Hermes 的 1.2 倍、Zeroclaw 的 10 倍以上，Issue 讨论深度（单帖最高 23 条评论）和 Bug 报告质量均处于生态领先水平。
- **技术路线差异**：采用"网关 + 渠道适配器 + 可插拔工具"的架构，强调多 IM 渠道（Telegram、Slack、飞书等）的统一接入与 Control UI 管理面。与 Hermes 的"研究导向 + 本地模型优先"、Zeroclaw 的"Rust 原生 + RFC 驱动架构重构"形成鲜明对比。
- **短板同样明显**：Codex 集成相关的 P1 问题（CPU 占用、OAuth 卡死、回合超时）占比最高，且多个"静默失败"类缺陷（工具参数丢失、记忆持久化被禁用、Slack DM 丢弃）正在侵蚀用户信任。相比之下，AstrBot 在 Provider 适配速度、QwenPaw 在合并效率上均有可借鉴之处。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|----------|----------|----------|
| **成本治理与配额控制** | OpenClaw（#42475 网关级成本预算）、QwenPaw（#7316 工具返回精简）、Hermes（#5528 可配置审批命令） | 防止模型调用失控、限制工具迭代次数、精简无效上下文以降低 token 消耗 |
| **会话生命周期与所有权** | OpenClaw（#48003 steer 模式回合注入）、Zeroclaw（#9487 运行时会话所有权 RFC）、Hermes（#85125 统一 deadline 层）、QwenPaw（#7364 memory_manager 复用） | 会话持久化、恢复、并发串行化、超时/挂起架构性修复 |
| **记忆架构解耦与多槽化** | OpenClaw（#60572 多槽记忆）、Zeroclaw（#6850 生命周期策略与存储解耦）、QwenPaw（#7133 ReMe 集成加固） | 将记忆从单一存储中解放，支持分层协作与策略可插拔 |
| **多租户与团队协作** | OpenClaw（#42475 企业级预算）、QwenPaw（#7318 多租户 Hub）、Zeroclaw（#9487 所有权边界） | 从单用户向团队/企业级部署演进，权限模型与资源隔离 |
| **安装/更新可靠性** | Hermes（#91277 fleet 更新可靠性、#87093 Debian 安装失败）、QwenPaw（#6380 HDD 更新 1.5h） | 安装脚本健壮性、增量更新、启动路径性能优化 |
| **静默失败问题** | OpenClaw（#53408 工具参数丢失、#126906 记忆静默禁用、#131150 Slack DM 丢弃）、QwenPaw（#7362 文件保护未生效） | 系统不报错但功能失效，对用户信任伤害最大 |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 | 核心优势 | 主要短板 |
|------|----------|----------|----------|----------|----------|
| **OpenClaw** | 全功能个人 AI 助手网关，多 IM 渠道 + Control UI | 个人高级用户、企业 PoC | TypeScript/Node，网关 + 渠道适配器 + 插件体系 | 生态最大、渠道最全、功能覆盖广 | Codex 集成稳定性、静默失败类缺陷 |
| **Hermes Agent** | 研究导向的自主智能体，本地模型优先 | AI 研究者、开源开发者 | Python，桌面端 + 远程网关 + MCP 深度集成 | 本地模型一键运行（PR #85852）、MCP 生态响应快 | 安装/更新可靠性、长会话稳定性 |
| **Zeroclaw** | 架构创新的下一代智能体运行时 | 核心开发者、架构师 | Rust，RFC 驱动的模块化设计 | 架构前瞻性（会话所有权、附件统一）、性能潜力 | PR 合并效率低、功能落地慢 |
| **QwenPaw** | 阿里生态的智能体平台，桌面端 + Hub | 中文用户、阿里云开发者 | Python，桌面端（Tauri）+ 多渠道 | 多租户 Hub 路线图明确、合并效率高 | 启动性能、网络兼容性（OpenSSL） |
| **PicoClaw** | 轻量级多渠道助手，协议深度支持 | 自托管爱好者、IRC/Matrix 用户 | Go，单一二进制部署 | 部署简单、依赖维护自动化 | 功能迭代慢、社区规模小 |
| **AstrBot** | 中文 IM 机器人框架，Provider 生态丰富 | 中文社区、QQ/飞书用户 | Python，插件化 Provider 架构 | Provider 接入速度快、中文社区活跃 | 平台适配层兼容性（飞书指令）、WebUI 功能重叠 |


## 6. 社区热度与成熟度分层

**第一梯队：快速迭代期（日 PR 500 级）**
- **OpenClaw**：功能推进与缺陷修复并行，但 P1 积压与合并速度低于新增速度，处于"高增长高压力"阶段。
- **Hermes Agent**：桌面端与 MCP 生态显著收敛（多网关战役完成、stdio 修复快速关闭），但安装可靠性 P0 问题与 400+ 待合并 PR 表明尚未进入质量巩固期。

**第二梯队：架构演进期（日 PR 50 级）**
- **Zeroclaw**：三大 RFC（会话所有权、附件架构、内存策略）驱动架构收敛，社区讨论质量高，但合并率 2% 表明决策瓶颈明显。
- **QwenPaw**：2.2.0 正式版前的高频打磨阶段，合并效率良好（48%），但启动性能问题集中爆发，需在发布前完成系统性优化。

**第三梯队：稳定维护期（日 PR <15 级）**
- **PicoClaw**：依赖自动化正常运转，无严重缺陷，但功能请求响应慢，社区贡献积极性可能受挫。
- **AstrBot**：Provider 生态扩展节奏良好，WebUI 重构推进中，整体处于健康的增量迭代状态。


## 7. 值得关注的趋势信号

1. **"静默失败"成为信任杀手**：OpenClaw 的 #53408（工具参数丢失）、#126906（记忆静默禁用）、#131150（Slack DM 丢弃）与 QwenPaw 的 #7362（文件保护未生效）共同揭示了一个严峻问题——系统不报错但功能失效对用户信任的伤害远超显式报错。**建议开发者将"可观测性"（明确的成功/失败信号）作为核心设计原则，而非事后补救。**

2. **成本治理从"可选项"变为"必选项"**：OpenClaw 的网关级预算请求（#42475）、Hermes 的可配置审批命令（#5528）、QwenPaw 的工具返回精简（#7316）表明，随着 Agent 从演示走向生产，**成本失控已成为企业采用的第一障碍**。网关级配额、迭代次数上限、上下文精简将是下一轮基础设施竞争的重点。

3. **架构重构向"会话所有权"与"记忆解耦"集中**：Zeroclaw 的 RFC #9487/#6850 与 OpenClaw 的 #60572 不约而同指向同一方向——**将会话和记忆从渠道/存储实现中解放，成为运行时的一等公民**。这预示着下一代智能体架构将更关注状态管理的可移植性与可组合性。

4. **多租户/团队协作需求浮出水面**：QwenPaw 官方确认 2.2.0 推出多租户 Hub（#7318），OpenClaw 的企业级预算讨论（#42475）热度上升，Zeroclaw 的会话所有权 RFC 隐含多用户边界问题。**个人助手向团队工具的演进已经开始**，权限模型与资源隔离将成为差异化竞争点。

5. **安装/更新可靠性被普遍忽视但代价高昂**：Hermes 的 Debian 安装失败（P0）、QwenPaw 的 HDD 更新 1.5 小时、OpenClaw 的 tsgo 进程树残留——**安装体验是用户的第一印象，也是流失率最高的环节**。建议各项目将安装/更新路径纳入 CI 重点测试，而非仅关注运行时功能。

6. **本地模型运行成为差异化卖点**：Hermes 的托管 llama.cpp PR（#85852）与 QwenPaw 的 Playwright 启动阻塞问题形成鲜明对比——**本地优先 vs 云端依赖的路线分歧正在显现**。对于注重隐私和离线场景的用户，本地模型支持将成为重要选型依据。

7. **Provider 生态的"网关化"趋势**：AstrBot 的 Synthorai 适配器（一个 Key 访问 113 模型）与 OpenClaw 的 Codex 集成问题共同表明，**多 Provider 接入的标准化与可靠性**（而非单纯的数量）正在成为新的竞争焦点。统一的错误分类、重试语义、流式协议兼容是下一阶段的技术门槛。

---

*本报告基于 2026-08-28 各项目公开 GitHub 数据自动生成，数据源包括 OpenClaw、Zeroclaw、PicoClaw、QwenPaw、Hermes Agent、AstrBot 六个仓库。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-28

## 1. 今日速览

过去24小时内，Zeroclaw 项目保持高度活跃：共产生 33 条 Issue 更新（其中 27 条新开或活跃、6 条关闭）和 50 条 PR 更新（49 条待合并、1 条合并/关闭），无新版本发布。社区讨论集中在三大 RFC 议题——运行时会话所有权（#9487）、统一附件架构（#9488）和内存生命周期策略（#6850），三者合计收获 68 条评论，表明架构层设计仍是当前社区关注焦点。值得关注的是，PR 合并率偏低（50 条中仅 1 条合并/关闭），大量 PR 处于 `needs-author-action` 或 `needs-maintainer-review` 状态，审查积压可能成为项目短期瓶颈。整体来看，项目处于架构演进与稳定性修复并行的密集开发期，社区参与度高，但合并效率有待提升。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日合并/关闭的 PR 数量较少（1 条），但关闭的 6 条 Issue 反映了部分功能修复已落地：

- **[已关闭] #8720 - 支持通过配置文件禁用 Bedrock Nova 2 Lite 模型的 cachePoint**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8720)）：用户报告使用 `us.amazon.nova-2-lite-v1:0` 模型时随机出现缓存错误，该 Issue 已关闭，说明配置层面的解决方案已合入或提供了替代路径。
- **[已关闭] #9651 - 迁移后的裸 vision_model_provider 无法解析带密钥的 provider 凭据**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9651)）：S1 级工作流阻塞问题已解决，涉及多模态 provider 凭据解析的修复。
- **[已关闭] #10138 - 在 zeroclaw:debian Docker 镜像中包含完整编译的 Git Channel**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10138)）：Docker 镜像中 Git Channel 的编译集成已完成。

此外，多条关键 PR 正在推进中，虽未合并但已进入审查或作者修订阶段：

- **#10414 - 修复 cron 手动触发与历史记录的 agent 边界防护**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10414)）：为 cron 任务增加 owner-qualified 查询和原子操作，防止 agent 重命名导致越权。
- **#10399 - CI 类型检查生成的 dashboard 契约**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10399)）：将 `cargo web check` 纳入必需 CI 流程，解决 web/ 目录 TypeScript 类型检查缺失问题。
- **#10416 - 通过错误原因链检测上下文溢出**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10416)）：修复可靠 provider 包装器对上下文溢出错误的误判。

项目整体处于架构重构（会话持久化、WASM 插件、附件体系）与稳定性修复并行的阶段，多个大型 PR（#10197、#10246、#10407）正在等待前置依赖合并。

## 4. 社区热点

今日讨论最活跃的 Issue 集中在架构设计领域，反映了社区对核心机制演进的高度关注：

- **#9487 - RFC: 运行时拥有的会话会话与传输表面适配器**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)）— 27 条评论
  该 RFC 提出将会话所有权从通道层迁移至运行时层，并引入传输表面适配器。讨论围绕 #9488/#9600 的所有权边界划分、类型化入口信封、持久化准入语义展开。这是当前架构演进的核心议题，直接影响网关、通道、运行时多个模块。

- **#9488 - RFC: Web 聊天与通道的统一附件架构**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)）— 21 条评论
  已修订至第 9 版，讨论聚焦附件在 Web 聊天与各通道间的统一表示、传输和存储方式。与 #9487 形成架构配套，共同定义下一代会话与附件模型。

- **#6850 - RFC: 将内存生命周期策略与存储后端解耦**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)）— 20 条评论
  该 RFC 已持续讨论 3 个月，核心诉求是明确持久化存储与高层生命周期策略（整合、治理）的边界，避免每个网关/通道重复实现。评论数持续增长，说明社区对内存治理架构有强烈共识需求。

- **#8396 - RFC: 将线协议作为 provider 构建与接入的一等公民**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8396)）— 15 条评论
  讨论如何将 wire protocol 提升为 provider 接入的标准接口，降低多 provider 适配成本。

- **#8692 - Tracker: 维护者决策队列**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)）— 14 条评论
  作为 RFC 和设计问题的维护者决策跟踪器，反映了项目在架构决策流程化方面的努力。

**诉求分析**：社区热点高度集中在架构层——会话所有权、附件统一、内存策略解耦、线协议标准化。这表明 Zeroclaw 正从功能叠加期进入架构收敛期，社区（尤其是核心贡献者）在推动更清晰、更可扩展的运行时抽象。

## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列如下：

**S1 - 工作流阻塞**

- **#10063 - Anthropic 后端的兼容网关拒绝工具结果中的 image_url 块**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10063)）：OpenAI 兼容 provider 适配器在工具返回图片时提升失败，导致多模态工作流中断。已有 `status:accepted` 标记，暂无对应 fix PR。

**S2 - 功能降级**

- **#10324 - cron 手动触发与运行历史读取在 agent 重命名窗口期存在 check-then-act 竞态**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10324)）：与已修复的 #9947 同类问题，但触发条件更苛刻。已有对应 PR #10414 修复。
- **#10329 - 可靠包装器截断遮蔽了 OpenAI 兼容 provider 的循环级上下文溢出恢复**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10329)）：上下文溢出错误在包装器内被吞掉，循环级恢复路径无法触发。已有 PR #10416 修复。
- **#10237 - Telegram 回复线程将对话记忆分割为每线程独立历史桶**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10237)）：`conversation_history_key` 计算导致多轮上下文丢失，影响 Telegram 通道的对话连贯性。
- **#10408 - 活跃轮次中发送第二条消息会启动并行运行，导致重复工作和重复回复**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10408)）：同一会话并发消息缺少串行化机制。
- **#10186 - 终端回退文本绕过实时投递通道**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10186)）：两条终端回退路径未遵循实时投递契约。
- **#10286 - 恢复的 ZeroCode 转录在历史裁剪后遗漏持久化轮次**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10286)）：结构化历史超过 `max_history_messages` 时，恢复的转录不完整。已有 PR #10380 修复。

**S3 - 轻微问题**

- **#10326 - 可靠流式错误报告请求的模型而非实际服务的固定模型**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10326)）：错误信息中模型名称不准确，影响可观测性。

**其他已关闭 Bug**：#9651（S1 凭据解析）和 #8720（Bedrock 缓存配置）已在今日关闭，相关修复已合入。

## 6. 功能请求与路线图信号

今日新提出的功能请求及路线图信号：

- **#10419 - 从 POST /webhook 流式传输 agent 循环令牌（SSE）**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10419)）：当 `stream: true` 且 `Accept: text/event-stream` 时，应通过 SSE 流式返回累积的 assistant 令牌，而非等待单个 JSON 响应。该功能对 Hosted Path A 工作负载的实时体验至关重要，可能被纳入下一迭代。

- **#10421 - 在 ZeroCode 中分页恢复持久化 ACP 转录**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10421)）：在 PR #10380 恢复完整转录的基础上，增加有界分页加载，保持 ZeroCode 渲染性能。属于 #10380 的后续增强。

- **#10244 - 为 ZeroCode 添加 agent 删除与批量清理功能**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10244)）：Dashboard > Agents 视图目前只能列出、查看详情和重命名别名，无法删除 agent。该功能对快速启动、测试和清理场景有明确需求，已有 `status:in-progress` 标记。

- **#10405 - Tracker: 实现会话级提示附件（#9998）**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10405)）：协调已接受的 #9998 在持久化会话、ACP 会话、提示词修改工具、审批、编辑、生命周期清理和文档中的落地。对应 PR #10407 已提交（XL 规模）。

- **#10306 - 将 web/ TypeScript 类型检查纳入必需 CI**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10306)）：解决 `tsc -b` 输出 75 条误导性错误的问题，改为指向 `cargo web check`。对应 PR #10399 已提交。

**路线图信号**：会话持久化与恢复（#10380、#10421）、会话级提示附件（#10407）、SSE 流式输出（#10419）是当前功能演进的主线。这些功能共同指向更完整的会话生命周期管理和更实时的交互体验。

## 7. 用户反馈摘要

从今日 Issues 评论中提炼的用户反馈：

- **Bedrock 缓存配置困扰**（#8720）：用户 @ngamradt 使用 Bedrock Nova 2 Lite 模型时随机遇到缓存错误，希望提供配置开关禁用缓存。该问题已关闭，说明已获得解决方案，但用户对"默认启用缓存导致随机错误"的体验表达了不满。

- **Telegram 多轮上下文丢失**（#10237）：用户 @metalmon 报告 Telegram 回复线程导致对话记忆被分割为每线程独立历史桶，多轮对话上下文丢失。这是真实使用场景中的功能降级，影响 Telegram 通道的日常可用性。

- **并发消息导致重复回复**（#10408）：用户 @volodkindv 报告在 agent 处理上一轮消息时发送新消息，会启动并行运行，产生重复工作和重复回复。这是交互设计上的真实痛点，影响用户体验。

- **ZeroCode 功能缺口**（#10244）：用户 @Audacity88 指出 ZeroCode Agents 视图无法删除 agent，影响快速启动、测试和清理流程。这反映了 ZeroCode 作为管理界面在生命周期管理上的不完整。

- **Docker 镜像功能完整性**（#10138）：用户 @ofotache 要求将 Git Channel 完整编译进 Docker 镜像，说明部分通道在容器化部署中默认不可用，影响开箱即用体验。

## 8. 待处理积压

以下重要 Issue/PR 长期未获响应或处于停滞状态，建议维护者关注：

- **#6850 - RFC: 内存生命周期策略与存储后端解耦**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)）：创建于 2026-05-22，已持续 3 个月，20 条评论，仍处于 `needs-maintainer-review` 状态。作为架构级 RFC，长期悬而未决可能阻塞依赖它的下游工作。

- **#6909 - RFC: 桌面屏幕交互与输入控制的 Computer-use 支持**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6909)）：创建于 2026-05-25，已 3 个月，11 条评论，仍待维护者审查。桌面自动化是 agent 能力的重要扩展方向。

- **#6996 - RFC: 细粒度沙箱策略（文件系统与网络限制）**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)）：创建于 2026-05-28，已 3 个月，13 条评论，处于 `in-progress` 但长期未推进。

- **#8486 - PR: 添加 OpenAI Chat Completions 端点**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/8486)）：创建于 2026-06-29，已 2 个月，XL 规模，处于 `blocked` 状态。该功能对生态集成（LangChain、OpenAI SDK、Continue.dev 等）有重要价值，但依赖 #6850 等前置 RFC。

- **#9971 - PR: Discord 成员按角色而非仅用户 ID 授权**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9971)）：创建于 2026-08-13，已 2 周，处于 `blocked` + `do-not-merge` 状态。安全相关功能长期阻塞可能影响 Discord 通道的团队协作场景。

- **#9535 - PR: 将上下文压缩锚定到模型窗口比例**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)）：创建于 2026-07-29，已 1 个月，XL 规模，处于 `needs-author-action` 状态。该功能对长会话场景的稳定性有直接价值。

---

**项目健康度评估**：Zeroclaw 社区活跃度高，架构讨论深入，Bug 修复响应及时（多个 S1/S2 问题已有对应 PR）。但需注意：PR 合并率偏低（2%），大量 PR 处于等待状态，可能形成审查积压；多个架构级 RFC（#6850、#6909、#6996）已悬置 3 个月，建议维护者加快决策节奏，避免阻塞下游依赖。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-28

## 1. 今日速览

过去24小时项目整体活跃度中等偏上：共产生3条Issue更新和7条PR更新，其中1条新PR（#3347）针对Web UI卡顿问题提交修复，值得关注。6条PR均为dependabot自动依赖升级并已关闭，说明项目依赖维护自动化运转正常。Issue侧以功能请求为主，IRC长消息支持（#3287）持续获得讨论热度，另有2条stale功能请求被自动关闭。无新版本发布，项目处于稳定的迭代维护期。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日合并/关闭的PR以依赖升级为主，另有1条合并多个修复的PR，整体推进了项目的依赖现代化与稳定性：

- **#1555**（已关闭）— 合并了 #1390、#1389、#1383、#1381 四个开放PR的修复，涵盖多项历史遗留问题，是今日最重要的代码合并动作。
  https://github.com/sipeed/picoclaw/pull/1555

- **#3336**（已关闭）— 升级 `aws-sdk-go-v2/service/bedrockruntime` 至 1.57.1，保持Bedrock运行时兼容性。
  https://github.com/sipeed/picoclaw/pull/3336

- **#3335**（已关闭）— 升级 `aws-sdk-go-v2/config` 至 1.32.35，同步AWS SDK配置模块。
  https://github.com/sipeed/picoclaw/pull/3335

- **#3334**（已关闭）— 升级 `anthropic-sdk-go` 至 1.62.0，跟进Anthropic API最新变更。
  https://github.com/sipeed/picoclaw/pull/3334

- **#3333**（已关闭）— 升级 `mautrix` 至 0.29.0，改善Matrix协议集成。
  https://github.com/sipeed/picoclaw/pull/3333

- **#3332**（已关闭）— 升级 `aws-sdk-go-v2` 核心库至 1.43.4。
  https://github.com/sipeed/picoclaw/pull/3332

**整体评估**：依赖库保持活跃更新，说明项目持续跟进上游生态；#1555的合并表明维护者正在清理历史PR积压，项目健康度良好。

---

## 4. 社区热点

今日最受关注的讨论集中在 **#3287**（IRC长消息支持），该Issue已获得8条评论，是当前社区讨论焦点：

- **#3287** [OPEN] — 用户 @superuser-does 提出PicoClaw应理解IRCv3协议中超过512字节的长消息，并将其视为单一完整消息而非拆分处理。该需求涉及IRC协议的核心使用体验，评论区有8条讨论，说明有一定数量的IRC用户群体关注此问题。
  https://github.com/sipeed/picoclaw/issues/3287

**诉求分析**：用户的核心痛点是IRC协议512字节限制导致的长消息被客户端自动拆分，而PicoClaw目前无法正确重组这些片段，影响对话连贯性。这反映了PicoClaw在IRC渠道上的实际使用深度，以及用户对协议细节完善的需求。

---

## 5. Bug 与稳定性

今日无新增严重Bug报告，但有一条UI性能修复PR值得关注：

- **#3347** [OPEN] — 修复Web UI在聊天区域文本量较大时出现卡顿的问题。作者 @iMilnb 自述已构建并测试 `picoclaw-launcher`，在桌面和移动端浏览器（Brave）上均不再卡顿。该PR由非TS/Node开发者分析并修复，建议维护者重点review代码质量。
  https://github.com/sipeed/picoclaw/pull/3347

**稳定性评估**：依赖升级（#3332-#3336）有助于修复潜在的安全漏洞和兼容性问题，属于预防性维护。当前无已知崩溃或回归问题。

---

## 6. 功能请求与路线图信号

今日活跃的功能请求如下：

- **#3287** [OPEN] — IRC长消息支持。该请求已开放超一个月，评论数持续增长，且与IRCv3协议演进方向一致，**有较大概率被纳入下一版本规划**。建议维护者评估IRC消息重组机制的实现复杂度。
  https://github.com/sipeed/picoclaw/issues/3287

- **#3330** [CLOSED/stale] — 支持在 delegate/spawn/subagent 工具中动态覆盖模型。该请求因长期无活动被自动关闭，但其功能价值（调用时指定模型）与PicoClaw的多智能体架构相关，**建议维护者手动评估是否值得重新开启**。
  https://github.com/sipeed/picoclaw/issues/3330

- **#3331** [CLOSED/stale] — 支持任意 `/audio/transcriptions` 端点模型，而非仅限 `*-whisper-*`。同样因stale关闭，但反映了用户对ASR模型灵活性的需求。
  https://github.com/sipeed/picoclaw/issues/3331

**路线图信号**：IRC长消息支持是当前最明确的功能需求信号；动态模型覆盖和ASR端点灵活性则代表了高级用户对可配置性的追求。

---

## 7. 用户反馈摘要

从今日活跃的Issue和PR评论中提炼的用户反馈：

- **IRC长消息处理是真实痛点**（#3287）：用户明确描述了IRC客户端自动拆分长消息的行为，以及PicoClaw无法正确理解这些拆分片段的困扰。使用场景具体，反馈质量高。
  https://github.com/sipeed/picoclaw/issues/3287

- **Web UI性能问题影响实际使用**（#3347）：PR作者反馈聊天区域文本量大时界面卡顿，影响桌面和移动端浏览器的使用体验。作者主动分析并提交修复，体现了社区的自助维护能力。
  https://github.com/sipeed/picoclaw/pull/3347

- **对旧版Whisper模型的不满**（#3331，已关闭）：用户认为 `*-whisper-*` 模型"太旧太慢"，希望支持更现代的ASR模型端点。虽然Issue已关闭，但该反馈反映了用户对性能的敏感度。

---

## 8. 待处理积压

以下事项需要维护者关注：

- **#3287**（IRC长消息支持）— 已开放37天，8条评论，无维护者回复记录。作为当前社区最活跃的功能请求，建议尽快给出明确回应或纳入路线图。
  https://github.com/sipeed/picoclaw/issues/3287

- **#3347**（UI卡顿修复）— 新提交的PR，等待维护者review。由于作者自述非专业TS/Node开发者，建议仔细审查代码质量后再决定合并。
  https://github.com/sipeed/picoclaw/pull/3347

- **#1555**（合并多个修复）— 虽已关闭，但合并了4个历史PR的修复内容，建议确认这些修复是否已充分测试并发布到新版本中。
  https://github.com/sipeed/picoclaw/pull/1555

---

**项目健康度总结**：PicoClaw当前处于稳定的迭代期，依赖维护自动化程度高，社区有活跃的功能讨论和自发贡献。主要风险在于功能请求响应速度（#3287）和社区PR的review效率（#3347）。建议维护者优先处理IRC长消息支持的需求评估，并尽快review UI修复PR，以保持社区贡献积极性。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-28

## 1. 今日速览

过去 24 小时 QwenPaw 项目保持高度活跃：共产生 26 条 Issue 更新（新开/活跃 16 条，关闭 10 条）和 48 条 PR 更新（待合并 25 条，已合并/关闭 23 条），无新版本发布。社区讨论热度集中在多租户 Hub 的路线图征集（#7318，10 条评论）和桌面端 OpenSSL 3.0.x TLS 栈的运营商兼容性问题（#7298，7 条评论）。合并的 PR 覆盖了模型输出能力与请求限制分离、文件保护策略修复、控制台停止取消传播、安装程序文案优化等方向，项目整体处于高频迭代状态。值得关注的是，启动耗时类问题（#7360、#7367、#7023）和事件循环阻塞问题（#7363）在今日集中出现，稳定性修复是当前社区最强烈的诉求。

---

## 2. 版本发布

今日无新版本发布。最近一次发布为 **v2.2.0-beta.1**（Beta，安装验证 Issue #7333 已于今日关闭）。

---

## 3. 项目进展

今日共合并/关闭 23 条 PR，以下为已合并/关闭的重要变更：

### 核心功能与架构
- **[#7337] fix(providers): separate model output capabilities from request limits**（已合并）— 将模型输出能力元数据与用户配置的请求预算分离，防止自动发现的输出能力静默变成请求级 `max_tokens` 限制，前后端均保留可空值语义。
  https://github.com/agentscope-ai/QwenPaw/pull/7337

- **[#7349] feat(tools): propagate console stop cancellation to agent tools**（已合并）— 将父级聊天取消传播到 Coordinator 管理的工具任务，并保留 `CancelledError` 以便 ToolCoordinator 正确记录 `INTERRUPTED` 状态。
  https://github.com/agentscope-ai/QwenPaw/pull/7349

- **[#7368] fix(security): keep file guard active in off mode**（已合并）— 标准化"工具执行安全"为"工具审批模式"，更新 Strict/Smart/Automatic/Off 四种模式的描述文案，并同步中/英/日等多语言。
  https://github.com/agentscope-ai/QwenPaw/pull/7368

### 控制台与体验
- **[#7353] fix(console): preserve embedding verification across agent switches**（已合并）— 修复在共享配置表单刷新完成前切换 Agent 导致 embedding 验证状态丢失的问题，为每次加载绑定请求代次与所选 Agent。
  https://github.com/agentscope-ai/QwenPaw/pull/7353

- **[#7343] fix(formatter): preserve local file URLs during media normalization**（已合并）— 保留 `file://` 协议前缀，防止格式化器将本地路径误判为远程 URL，覆盖 Unix、Windows、UNC 和百分号编码路径的回归测试。
  https://github.com/agentscope-ai/QwenPaw/pull/7343

### 安装与文档
- **[#7354] fix(installer): clarify application data cleanup**（已合并）— 明确 Windows NSIS 卸载时"删除本地应用缓存"选项的含义，说明会保留 agents 和 chats，覆盖全部 6 种安装语言。
  https://github.com/agentscope-ai/QwenPaw/pull/7354

- **[#7365] docs(qwenpaw-data): align .env/Configure promises with datasource design**（已合并）— 修复 v2.2.0-beta.1 中 Configure 页面保存 Neo4j + LLM 设置后 `.env` 缺少 SQLite 配置的文档一致性问题。
  https://github.com/agentscope-ai/QwenPaw/pull/7365

- **[#7371] docs: remove unintended PawApp SDK proposal**（已合并）— 移除误提交的 PawApp SDK 应用契约提案文档。
  https://github.com/agentscope-ai/QwenPaw/pull/7371

- **[#7373] chore(deps): bumping version of agentscope to 2.0.7.post1**（已合并）— 升级 agentscope 依赖版本。
  https://github.com/agentscope-ai/QwenPaw/pull/7373

**整体评估**：今日合并的 PR 集中在**安全策略修复**（文件保护、工具审批）、**控制台体验优化**（embedding 验证、取消传播）和**安装/文档完善**三个方向，未出现大规模新功能落地，但修复密度较高，项目处于"打磨稳定性 + 准备 2.2.0 正式版"的阶段。

---

## 4. 社区热点

### 最活跃讨论
- **[#7318] [Discussion] QwenPaw Hub 多租户版将于 2.2.0 推出：你希望我们接下来做什么？**（10 条评论，👍 1）
  作者 @rayrayraykk 发起，回应社区对团队级运行方式的长期诉求（关联 #2324 多用户访问与管理员管理技能）。这是当前社区最受关注的路线图讨论，评论集中在多租户权限模型、技能隔离、部署方式等方向。
  https://github.com/agentscope-ai/QwenPaw/issues/7318

- **[#7298] Desktop 和 Docker 捆绑 OpenSSL 3.0.x TLS 栈，运营商 DPI 重置握手**（7 条评论）
  桌面端（Tauri）和 Docker 镜像均携带 Python 3.11 时代的 OpenSSL 3.0.x，部分运营商网络会重置 TLS 握手，且桌面端无规避方案。该问题影响面广（所有桌面用户 + Docker 用户），社区关注度高。
  https://github.com/agentscope-ai/QwenPaw/issues/7298

### 高讨论度功能请求
- **[#4770] 左侧会话界面列顺序调整**（6 条评论，已关闭）— 用户希望将"更新时间"列移到左侧，将 ID/session id 移到右侧，因为后者对用户无价值。
  https://github.com/agentscope-ai/QwenPaw/issues/4770

- **[#6083] Desktop 窗口增加工作区产出物快捷访问按钮**（5 条评论，已关闭）— 用户希望一键直达工作区文件夹或下载最近产出物，避免手动导航到 `~/.qwenpaw/workspaces/` 目录。
  https://github.com/agentscope-ai/QwenPaw/issues/6083

- **[#7316] 设计工具在 react 循环时删掉/简化无用的工具返回内容**（4 条评论）— 用户提议让 LLM 判断工具返回内容是否对用户有效，无效则简化或删除以优化上下文。
  https://github.com/agentscope-ai/QwenPaw/issues/7316

**诉求分析**：社区热点集中在三方面——**多租户/团队协作能力**（#7318）、**网络兼容性与启动性能**（#7298、#7360、#7367）、**控制台信息密度优化**（#4770、#7316、#6083）。用户对"界面信息是否对用户有价值"的敏感度在提升。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 严重（影响核心功能或大量用户）

- **[#7363] 同步调用阻塞事件循环且 timeout 失效**（开放）
  Windows 桌面端启动时无响应 118–135 秒，发送消息时约 126 秒无响应，timeout 不生效。**无 fix PR**。
  https://github.com/agentscope-ai/QwenPaw/issues/7363

- **[#7360] QwenPaw Desktop 启动耗时约 4 分钟**（开放）
  v2.2.0.b1 启动耗时约 247.53 秒，严重影响可用性。**无 fix PR**。
  https://github.com/agentscope-ai/QwenPaw/issues/7360

- **[#7298] OpenSSL 3.0.x TLS 栈导致运营商 DPI 重置握手**（开放）
  桌面端和 Docker 均受影响，运营商网络下无法正常连接。**无 fix PR**，但 [#7372] 正在统一打包 Python 运行时来源，可能间接解决。
  https://github.com/agentscope-ai/QwenPaw/issues/7298

- **[#7367] 仅启用 console 渠道时启动仍需 30–45 秒**（开放）
  `_load_builtin_channels()` 无条件导入全部 18 个渠道模块，其中 `lark_oapi` 单个包约耗时 18.5 秒。**无 fix PR**。
  https://github.com/agentscope-ai/QwenPaw/issues/7367

- **[#7312] Windows 上 execute_shell_command 因继承 stdin 管道导致 python 挂起**（开放）
  缺少 `stdin=DEVNULL`，Windows 11 上运行 python 解释器时挂起。**无 fix PR**。
  https://github.com/agentscope-ai/QwenPaw/issues/7312

### 🟠 中等（影响特定场景或功能）

- **[#7362] 文件保护未生效**（开放）
  开启文件保护后仍可读取 `/etc/passwd`。**已有 fix PR [#7375]**（在活跃策略评估中强制执行 File Guard 路径）。
  https://github.com/agentscope-ai/QwenPaw/issues/7362
  https://github.com/agentscope-ai/QwenPaw/pull/7375

- **[#7364] 零停机重载复用已关闭的 memory_manager，永久破坏 memory_search**（开放）
  v2.2.0b1 中零停机重载后 `memory_manager` 处于 closed 状态但仍被复用，导致 memory_search 永久失效。**无 fix PR**。
  https://github.com/agentscope-ai/QwenPaw/issues/7364

- **[#7377] Agent Loop mode 配置在任务运行后不持久化**（开放）
  v2.1.0 控制台中修改 Loop mode 并运行后，自动恢复为默认 "Default" 模式。**无 fix PR**。
  https://github.com/agentscope-ai/QwenPaw/issues/7377

- **[#7370] wecom 渠道发送 base64 data URI 图片报 OSError [Errno 36] File name too long**（开放）
  用户看到 "Internal error"。**无 fix PR**。
  https://github.com/agentscope-ai/QwenPaw/issues/7370

- **[#7302] 关闭工具信息/思考过程显示后，钉钉渠道仍发送空消息并触发未读提醒**（开放）
  **无 fix PR**。
  https://github.com/agentscope-ai/QwenPaw/issues/7302

- **[#7023] Desktop 启动时在关键路径上阻塞约 60 秒安装 Playwright Chromium**（开放）
  无跳过或懒加载选项。**无 fix PR**。
  https://github.com/agentscope-ai/QwenPaw/issues/7023

### 🟡 轻微（体验/视觉问题）

- **[#7376] 主界面图标不一致**（开放）
  左侧导航栏"文件""检查点"图标及深色模式切换图标与其它图标风格不一致。**无 fix PR**。
  https://github.com/agentscope-ai/QwenPaw/issues/7376

- **[#7324] 定时任务执行成功后收件箱缺失部分推送消息**（已关闭）
  3 条定时任务中 1 条成功推送丢失。**已关闭**，但未在数据中看到关联 fix PR。
  https://github.com/agentscope-ai/QwenPaw/issues/7324

- **[#7322] 工作区文件上传未按所选分类路由**（开放）
  选择"知识库/日记"分类后上传文件仍落在工作区根目录。**已有 fix PR [#7351]**（路由 Agent 源上传并隔离 Profile 文件）。
  https://github.com/agentscope-ai/QwenPaw/issues/7322
  https://github.com/agentscope-ai/QwenPaw/pull/7351

---

## 6. 功能请求与路线图信号

### 高潜力纳入下一版本的需求

- **多租户 Hub（#7318）** — 官方已确认 2.2.0 推出，社区正在讨论功能优先级。这是当前最明确的路线图信号。
  https://github.com/agentscope-ai/QwenPaw/issues/7318

- **工具返回内容智能精简（#7316）** — 用户提议让 LLM 判断工具返回内容有效性并简化/删除无用内容以优化上下文。与 [#7374]（自动折叠助手进程消息）方向一致，可能被纳入后续优化。
  https://github.com/agentscope-ai/QwenPaw/issues/7316
  https://github.com/agentscope-ai/QwenPaw/pull/7374

- **移动端输入框换行支持（#7355，已关闭）** — 安卓 Chrome 下输入法换行被触发为提交。已关闭但未看到对应 PR，可能已通过其他方式解决或排期。
  https://github.com/agentscope-ai/QwenPaw/issues/7355

- **部署管理增加可升级版本号（#7366，已关闭）** — 用户反馈升级黑盒问题，希望平台部署页显示当前版本与可升级版本。已关闭，可能已修复。
  https://github.com/agentscope-ai/QwenPaw/issues/7366

### 已有 PR 支撑的功能方向

- **聊天体验优化**：工具调用可见性切换（[#7357]）、聊天滚动锁定（[#7356]）、长聊天历史分页与虚拟化（[#7361]）、助手进程消息自动折叠（[#7374]）—— 这些 PR 均处于开放状态，指向控制台聊天体验的集中改进。
  https://github.com/agentscope-ai/QwenPaw/pull/7357
  https://github.com/agentscope-ai/QwenPaw/pull/7356
  https://github.com/agentscope-ai/QwenPaw/pull/7361
  https://github.com/agentscope-ai/QwenPaw/pull/7374

- **MCP 工具调用超时配置（#6874）** — 添加 `tool_call_timeout` 参数，默认 300 秒，兼容旧 `timeout` 别名。已开放 18 天，等待合并。
  https://github.com/agentscope-ai/QwenPaw/pull/6874

- **ReMe 0.4.1.9 集成与 embedding 恢复加固（#7133）** — 升级 ReMe 依赖并补齐 embedding 配置热更新、健康检查恢复、向量空间切换数据一致性。已开放 9 天。
  https://github.com/agentscope-ai/QwenPaw/pull/7133

- **自定义 Provider 自动模型发现恢复（#7320）** — 修复自定义 OpenAI 兼容 Provider 通过 `/models` 发现的模型在正常配置流程中不可用的问题。
  https://github.com/agentscope-ai/QwenPaw/pull/7320

---

## 7. 用户反馈摘要

### 核心痛点

1. **启动耗时是最大抱怨点**：多个用户报告启动时间从 30 秒到 4 分钟不等（#7360、#7367、#7023），且根因各不相同（Playwright 安装、渠道模块全量导入、同步调用阻塞事件循环）。用户 @cmhaoso 在 #7360 中附上了完整日志，@Lxlili 在 #7367 中定位到 `lark_oapi` 单个包耗时 18.5 秒，说明用户已开始自行排查根因。

2. **网络兼容性问题影响信任**：#7298 中用户反馈运营商 DPI 重置 TLS 握手，且桌面端无 workaround，这会导致部分用户完全无法使用服务。

3. **安全功能"形同虚设"的担忧**：#7362 中用户开启文件保护后仍能读取 `/etc/passwd`，这类问题会严重打击用户对安全功能的信任。

4. **升级体验黑盒**：#7366 用户反馈点击"升级 qwenpaw 版本"后升级到了原地版本，无法感知版本变化；#6380 中 NAS 机械硬盘用户每次更新需 1.5 小时，频繁 bugfix 版本迭代导致大量等待时间。

5. **消息丢失与空消息**：#7324 定时任务成功推送缺失、#7302 钉钉渠道空消息触发未读提醒，影响日常使用可靠性。

### 使用场景亮点

- 用户在 QQ 中让 QwenPaw 重启后丢失最后聊天记忆（#7297），说明 IM 渠道是真实使用场景。
- 用户通过定时任务让 Agent 自动打包 zip 备份（#7324），说明 Agent 自动化任务已被实际用于日常工作中。
- 用户期望在 Desktop 窗口内一键访问工作区产出物（#6083），说明 Agent 产出文件是高频操作。

### 满意/不满意

- **满意**：社区对多租户 Hub 的推出持积极期待（#7318），对 2.2.0 的路线图参与热情高。
- **不满意**：启动性能、网络兼容性、安全功能有效性是当前用户抱怨最集中的三个方向。

---

## 8. 待处理积压

### 长期未响应的重要 Issue

- **[#6380] 更新流程对机械硬盘用户不友好，耗时约 1.5 小时**（创建于 2026-07-23，36 天未关闭）
  用户建议增量更新、依赖缓存优化、编译步骤后置。该问题影响 NAS/HDD 用户群体，但长期无维护者响应。
  https://github.com/agentscope-ai/QwenPaw/issues/6380

- **[#7023] Desktop 启动阻塞 60 秒安装 Playwright Chromium**（创建于 2026-08-14，14 天未关闭）
  启动关键路径上的同步浏览器安装，无跳过/懒加载选项。与今日多个启动耗时问题叠加，建议优先处理。
  https://github.com/agentscope-ai/QwenPaw/issues/7023

### 长期未合并的重要 PR

- **[#6399] feat: add reranker UI config panel to ReMeLightMemoryCard**（创建于 2026-07-23，36 天未合并，标记 "Under Review"）
  ReMe 记忆卡片增加 reranker 可视化配置面板，与后端 reranker 功能配套。长期处于 review 状态。
  https://github.com/agentscope-ai/QwenPaw/pull/6399

- **[#6874] feat(mcp): add configurable tool call timeout**（创建于 2026-08-10，18 天未合并）
  MCP 工具调用超时配置，关闭 #6724。功能完整但等待合并。
  https://github.com/agentscope-ai/QwenPaw/pull/6874

- **[#7133] feat(memory): integrate ReMe 0.4.1.9 and harden embedding recovery**（创建于 2026-08-19，9 天未合并）
  ReMe 依赖升级与 embedding 恢复加固，涉及记忆模块稳定性，建议关注。
  https://github.com/agentscope-ai/QwenPaw/pull/7133

### 维护者提醒

今日集中出现的启动性能问题（#7360、#7367、#7363）和事件循环阻塞问题指向**桌面端运行时架构**可能存在系统性瓶颈，建议维护者将"启动路径性能优化"列为 2.2.0 正式版发布前的优先事项。同时，[#7372]（统一打包 Python 运行时来源）可能对 #7298（OpenSSL 版本）和 #7312（Windows stdin 挂起）产生正向影响，建议加速 review。
https://github.com/agentscope-ai/QwenPaw/pull/7372

---

*本日报由 AI 分析师自动生成，数据来源：QwenPaw GitHub 仓库（github.com/agentscope-ai/qwenpaw），统计窗口为 2026-08-27 至 2026-08-28。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-28

## 1. 今日速览

过去24小时内，Hermes Agent 项目保持极高活跃度：共产生 **432 条 Issue 更新**（新开/活跃 337 条，关闭 95 条）和 **500 条 PR 更新**（待合并 400 条，已合并/关闭 100 条），并发布了 **v0.20.6 (v2026.8.27)** 补丁版本，将自 v0.20.5 以来约 **525 个 PR** 汇总为稳定标签。项目整体处于快速迭代通道，但 Issue 与 PR 积压量依然庞大（400+ 待合并 PR），且存在多个 P0/P1 级稳定性问题（Debian 安装失败、桌面端会话恢复失败、state.db 反复损坏等）尚未完全收敛。社区讨论热度集中在技能索引老化、自动化集成阻塞、超时/挂起架构性修复等议题上。

---

## 2. 版本发布

### Hermes Agent v0.20.6 (v2026.8.27)

- **发布日期：** 2026-08-27
- **类型：** Patch release
- **核心内容：** 将自 v0.20.5 以来合并的约 **525 个 PR** 汇总为稳定标签，供 Docker 镜像、托管部署、新安装等下游消费者使用。
- **破坏性变更：** 未明确说明。
- **迁移注意事项：** 建议下游消费者基于该标签重建镜像/部署，以纳入自 v0.20.5 以来的全部修复与改进。

🔗 [查看 Release](https://github.com/NousResearch/hermes-agent/releases)

---

## 3. 项目进展

今日合并/关闭的 PR 与 Issue 显示项目在以下方向取得实质推进：

- **桌面端多网关持久连接战役收官（#94724）**：该追踪 Issue 标记为 **CAMPAIGN COMPLETE**，共合并 **29 个 PR**，修复了 2 个同日回归，所有 salvage 集群已交付。这标志着桌面端多网关连接能力从"补丁式修复"走向系统性收敛。
- **MCP stdio 子进程存活检查修复（#94335，已关闭）**：修复 `_stdio_children_dead()` 反转存活判断导致所有 stdio MCP 调用在 oneshot 会话中快速失败的问题。
- **MCP stdio 快速失败回归修复（#94637，已关闭）**：确认与 #85125 3b 相关，已作为重复问题关闭，表明已有修复路径。
- **桌面启动超时问题修复（#96282，已关闭）**：定位到 `6d4e851d8`（bounded flush-on-SIGTERM + periodic incremental session flush）引入的 stdout 重定向问题。
- **state.db 损坏复发调查（#90950，已关闭）**：确认 SQLite 3.53.1 下 WAL sidecar 在并发写入时被 unlink 导致损坏，已有关闭记录表明修复已合入。
- **统一 deadline 层追踪（#85125，已关闭）**：针对 400+ 超时/挂起类 Issue 的架构性修复方案已完成决策阶段。

**整体判断：** 项目在桌面端稳定性、MCP 生态修复、会话状态管理三个方向上有显著收敛，但仍有大量 P1 级问题处于开放状态。

---

## 4. 社区热点

| 排名 | Issue/PR | 评论数 | 核心诉求 |
|------|----------|--------|----------|
| 1 | [#66616 Skills index is stale or degraded](https://github.com/NousResearch/hermes-agent/issues/66616) | 109 | 技能索引自动化探针失败，索引已 29.8h 未更新（限制 26h），影响 /docs/skills 文档站 |
| 2 | [#88584 Automated Nous integration is blocked](https://github.com/NousResearch/hermes-agent/issues/88584) | 36 | Nous-to-Enterkey 定时集成因 `cron/jobs.py` 冲突被阻塞，发布分支未更新 |
| 3 | [#85125 Tracking: unified deadline layer](https://github.com/NousResearch/hermes-agent/issues/85125) | 23 | 针对 400+ 超时/挂起 Issue 的架构性修复方案（4 阶段），已关闭（决策完成） |
| 4 | [#91277 Fleet update reliability](https://github.com/NousResearch/hermes-agent/issues/91277) | 23 | 安装/更新可靠性为当前最弱能力，~30 个 Issue + ~15 个 PR 各自修补同一类问题 |
| 5 | [#87093 Debian installation broken](https://github.com/NousResearch/hermes-agent/issues/87093) | 22 | Debian 13.6 安装失败，uv.lock 与 npm install 均报错，👍 4 |

**分析：** 社区最强烈的诉求集中在 **安装/更新可靠性**（#91277、#87093、#92095、#94058 等形成明显簇）和 **自动化运维稳定性**（#66616、#88584）。技能索引老化问题以 109 条评论成为今日最热 Issue，反映社区对文档/技能生态健康度的高度关注。此外，用户对桌面端 UX 的负面反馈（#90473，用户原话："这设计真蠢"）也值得注意。

---

## 5. Bug 与稳定性

### P0 级

- **[#87093] Debian 安装失败（OPEN）** — Debian 13.6 上 `curl | bash` 安装失败，uv.lock 与 npm install 均报错。👍 4，影响新用户上手。
  🔗 https://github.com/NousResearch/hermes-agent/issues/87093

### P1 级

- **[#93888] 桌面端发送本地运行时 ID 到远程网关，无法恢复存储会话（OPEN）** — 远程网关上打开任何存储会话都会卡在 "Restore failed — Session not found"。涉及会话状态与 SSH 远程连接。
  🔗 https://github.com/NousResearch/hermes-agent/issues/93888
- **[#96282] 桌面启动超时（CLOSED）** — `HERMES_BACKEND_READY` sentinel 打印到 stderr 导致 Electron 启动超时。已关闭，修复已合入。
  🔗 https://github.com/NousResearch/hermes-agent/issues/96282
- **[#94335] MCP stdio 子进程存活检查反转（CLOSED）** — 已修复。
  🔗 https://github.com/NousResearch/hermes-agent/issues/94335
- **[#94637] MCP stdio 快速失败回归（CLOSED）** — 确认为 #85125 3b 引入，已作为重复关闭。
  🔗 https://github.com/NousResearch/hermes-agent/issues/94637
- **[#90950] state.db 在 SQLite 3.53.1 下反复损坏（CLOSED）** — WAL sidecar 在并发写入下被 unlink，已有关闭记录。
  🔗 https://github.com/NousResearch/hermes-agent/issues/90950
- **[#78981] DeepSeek 500k token 会话在上下文压缩挂起后永久死亡（CLOSED）** — 压缩流 120s+ 零进展，中断的 turn 永远无法恢复。
  🔗 https://github.com/NousResearch/hermes-agent/issues/78981
- **[#51327] Linux .desktop 启动器静默失败（OPEN）** — Electron chrome-sandbox 缺少 setuid 4755，点击图标无窗口无报错。6月23日创建，至今未修复。
  🔗 https://github.com/NousResearch/hermes-agent/issues/51327
- **[#60323] macOS 桌面端可能错过 HERMES_BACKEND_READY 导致启动超时（OPEN）** — 日志显示后端已就绪但桌面端未收到。
  🔗 https://github.com/NousResearch/hermes-agent/issues/60323
- **[#92145] `hermes update` 在 ImportError 时留下运行服务在旧 sys.modules 上（OPEN）** — 更新自动重启阶段失败后，运行中的服务仍使用旧代码。
  🔗 https://github.com/NousResearch/hermes-agent/issues/92145
- **[#90837] state.db 在 gateway-only 写入下反复损坏（OPEN）** — 11 次损坏事件，已排除所有外部原因。
  🔗 https://github.com/NousResearch/hermes-agent/issues/90837

### P2 级

- **[#92095] uv 安装下 .desktop Exec= 写入损坏路径（OPEN）** — venv 符号链接被 `.resolve()` 解引用，点击图标静默失败。
  🔗 https://github.com/NousResearch/hermes-agent/issues/92095
- **[#94058] Linux 桌面入口 Exec 解析 venv 符号链接到裸解释器（OPEN）** — 与 #92095 同类问题。
  🔗 https://github.com/NousResearch/hermes-agent/issues/94058
- **[#88275] 桌面渲染进程空闲时 CPU 占用 40-70%（OPEN）** — macOS Intel 机型热降频，GPU 禁用仅部分缓解。
  🔗 https://github.com/NousResearch/hermes-agent/issues/88275
- **[#90473] "显示更早消息"分页在长会话中 UX 极差（CLOSED）** — 用户原话："这设计真蠢"。
  🔗 https://github.com/NousResearch/hermes-agent/issues/90473

**今日已有 fix PR 的 Bug：**
- #96916（fix empty-transcript sanitizer warning）
- #96911（fix mixed-install ImportError at chat startup）
- #96914（fix SSH-only v1 connection drift into v2 registry）
- #96904（fix Kimi Coding fallback 404）
- #96905（fix kanban remote worker context）
- #96908（security: case-insensitive credential scrub）
- #96909（fix background-review skill-creation hard rules）
- #96915（fix GLM-5.x reasoning stale-timeout floor）

---

## 6. 功能请求与路线图信号

### 高潜力（已有对应 PR 或明确设计）

- **本地模型一键运行（#85852 PR）** — 托管 llama.cpp 运行时，零配置本地模型。若合入，将大幅降低本地部署门槛。
  🔗 https://github.com/NousResearch/hermes-agent/pull/85852
- **DingTalk 富媒体支持（#9451 PR + #96917 PR）** — 图片/语音/视频/文件双向收发。两个 PR 并存，社区关注度高。
  🔗 https://github.com/NousResearch/hermes-agent/pull/9451 | https://github.com/NousResearch/hermes-agent/pull/96917
- **MCP 无状态客户端路径生产化（#92906 PR）** — 使 MCP 2026-07-28 无状态客户端生命周期成为生产权威路径。
  🔗 https://github.com/NousResearch/hermes-agent/pull/92906
- **桌面端浏览器入口改进（#96912 PR）** — 将 Browser 放到标题栏并明确交接，解决可发现性和驾驶权问题。
  🔗 https://github.com/NousResearch/hermes-agent/pull/96912
- **MCP 服务器连接失败状态栏徽章（#96903 PR）** — 在 TUI 状态栏显示 MCP 服务器连接失败，避免工具静默消失。
  🔗 https://github.com/NousResearch/hermes-agent/pull/96903

### 路线图信号（来自 Issue 讨论）

- **统一 deadline 层（#85125，已关闭）** — 4 阶段架构性修复超时/挂起问题，虽已关闭但实施可能分阶段进行。
- **Fleet 更新可靠性（#91277）** — 被标记为"最不可靠能力"，社区强烈要求统一部署方案。
- **RealtimeVoiceProvider ABC（#77111）** — 4 个竞争的双工语音 PR 需要接口而非合并队列，符合 AGENTS.md 的 Footprint Ladder 原则。
- **云同步配置（#20510）** — 👍 20，用户跨设备同步配置/会话/记忆的需求强烈。
- **可配置审批命令模式（#5528）** — 👍 12，用户希望自定义危险命令审批规则。

---

## 7. 用户反馈摘要

- **安装体验是最大痛点：** Debian 13.6 用户报告安装脚本直接失败（#87093），uv 安装用户报告 .desktop 启动器静默失败（#92095、#94058），macOS 用户报告 `/Applications/Hermes.app` 更新后残留旧版本（#52339）。安装/更新可靠性被社区直接称为"最不可靠能力"（#91277）。
- **长会话体验差：** 用户对"显示更早消息"分页设计表达强烈不满（#90473，原话："这设计真蠢"），DeepSeek 500k token 长会话在压缩挂起后永久死亡（#78981）。
- **远程/多机场景问题集中：** SSH 远程网关会话恢复失败（#93888）、配置文件切换时错误启动本地后端（#90477）、多网关 Telegram 会话存储错乱（#66887）。
- **资源占用担忧：** macOS Intel 用户报告渲染进程空闲时 CPU 占用 40-70%，导致热降频（#88275）。
- **积极信号：** 桌面端多网关持久连接战役完成（#94724），获得 👍 1；MCP 相关修复（#94335、#94637）快速关闭，说明维护者对 MCP 生态问题响应积极。

---

## 8. 待处理积压

### 长期未响应的关键 Issue

| Issue | 创建时间 | 标签 | 备注 |
|-------|----------|------|------|
| [#51327] 桌面 .desktop 启动器静默失败 | 2026-06-23 | P1, comp/desktop | 已开放 66 天，Linux 用户点击图标无响应 |
| [#52339] Terminal 更新后 /Applications/Hermes.app 残留旧版 | 2026-06-25 | P2, comp/desktop | 已开放 64 天，macOS 用户困惑 |
| [#39609] `--initial-status blocked` 任务 1 秒后自动提升为 ready | 2026-06-05 | P3, comp/cron | 已开放 84 天，审批门禁被绕过 |
| [#20510] 云同步配置请求 | 2026-05-06 | P3, needs-decision | 👍 20，已开放 114 天，社区呼声高 |
| [#5528] 可配置审批命令模式 | 2026-04-06 | P3, needs-decision | 👍 12，已开放 144 天 |
| [#11113] MCP 熔断器误判工具级错误 | 2026-04-16 | P2, tool/mcp | 已开放 134 天，影响 MCP 工具可靠性 |
| [#21889] Discord cleanup_progress 静默 no-op | 2026-05-08 | P3, platform/discord | 已开放 112 天，功能声明但实际无效 |

### 长期未合并的重要 PR

- **[#9451] DingTalk 富媒体支持** — 4月14日创建，已开放 136 天，今日有新的替代 PR（#96917），需关注是否会被 supersede。
  🔗 https://github.com/NousResearch/hermes-agent/pull/9451
- **[#84963] MCP OAuth teardown 拆分** — 8月13日创建，PR 自身声明"不要 monolithic rebase，拆分为两个子 PR"，需维护者介入处理。
  🔗 https://github.com/NousResearch/hermes-agent/pull/84963
- **[#85852] 托管 llama.cpp 运行时** — 8月14日创建，功能完整但涉及面广，需评估合入风险。
  🔗 https://github.com/NousResearch/hermes-agent/pull/85852

---

**总结：** Hermes Agent 项目处于高速迭代期，桌面端与 MCP 生态修复进展显著，但安装/更新可靠性、长会话稳定性、远程多机场景仍存在系统性短板。社区对本地模型运行、DingTalk 富媒体、云同步等功能需求强烈。建议维护者优先处理 P0/P1 级安装与会话恢复问题，并关注长期未响应的 👍 高票功能请求。

---
*日报生成时间：2026-08-28 | 数据来源：NousResearch/hermes-agent GitHub 仓库*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-08-28

## 今日速览

过去 24 小时 AstrBot 项目保持较高活跃度：共产生 12 条 Issue 更新（8 条新开/活跃、4 条关闭）和 12 条 PR 更新（9 条待合并、3 条已合并）。社区讨论集中在 Provider 生态扩展（GLM Coding Plan、Synthorai、阿里云百炼）与 WebUI 体验优化两大方向。3 个 PR 于今日合并，其中 Synthorai Provider 适配器已正式落地。无新版本发布，项目处于功能迭代与生态扩展的稳定推进期。

## 版本发布

今日无新版本发布。

## 项目进展

今日合并/关闭了 3 个 PR，均为 WebUI 与 Provider 生态的实质性改进：

- **PR #9846**（已合并，size:XXL）— 整合数据仪表盘并重构会话界面。将统计、会话、日志、追踪统一收纳至标签式 Data 工作区，移除重复侧边栏入口；刷新统计仪表盘样式、模型配色、平台图标与在线时长显示；新增分页会话工作区。这是今日合并的最大变更，显著改善了 WebUI 信息架构与视觉一致性。
  https://github.com/AstrBotDevs/AstrBot/pull/9846

- **PR #9840**（已合并，size:M）— 新增 Synthorai Provider 适配器。Synthorai 是 OpenAI/Anthropic 协议兼容的 LLM 网关，一个 API Key 可访问 11 家上游、113 个模型。该 PR 对照此前 SSYCloud 适配器实现，新增 `synthorai_source.py` 及配置模板条目。
  https://github.com/AstrBotDevs/AstrBot/pull/9840

- **PR #9847**（已合并，size:M）— 统计页面新增会话快捷入口。为每个会话用量排行行添加会话跳转按钮，支持从 URL 初始化会话 UMO 过滤器，并修复了过滤器清除与 URL 同步问题。
  https://github.com/AstrBotDevs/AstrBot/pull/9847

此外，**PR #9844**（待合并，size:XS）修复了 system_reminder 注入块被持久化进会话历史的问题，与今日 Issue #9779 直接对应，预计将很快合入。

## 社区热点

今日讨论最活跃的 Issue 集中在 Provider 能力扩展与上下文管理：

- **Issue #7109**（3 条评论，关联 PR #9852）— 请求支持 Code Plan API。用户指出 Kimi Code、Codex 等产品均已支持，且 Code Plan 用户 token 充足，适合作为工作+日常 Agent 机器人。该诉求已由 PR #9852 响应，实现智谱 GLM Coding Plan 专用 Provider。
  https://github.com/AstrBotDevs/AstrBot/issues/7109

- **Issue #9779**（2 条评论，关联 PR #9844）— 建议 system_reminder 注入块使用 `mark_as_temp()` 机制，避免固化进持久化历史。用户精准定位到 `astr_main_agent.py` 的 `_append_system_reminders()` 方法，属于高质量技术反馈，且已有对应修复 PR。
  https://github.com/AstrBotDevs/AstrBot/issues/9779

- **Issue #9807**（2 条评论，已关闭）— 请求新增 Synthorai Provider。该 Issue 今日随 PR #9840 合并而关闭，从提出到落地仅 3 天，体现了项目对 Provider 生态诉求的快速响应能力。
  https://github.com/AstrBotDevs/AstrBot/issues/9807

## Bug 与稳定性

今日报告的 Bug 按严重程度排列如下：

**中高严重度（新报告，暂无 fix PR）**

- **Issue #9854** — 群聊上下文图片理解对 GIF 动图未进行多帧处理，导致仅能获得静态帧描述。用户确认 QQ 协议端未将 GIF 转为 JPEG，问题出在 AstrBot 将整个 GIF 作为单张图片直接交给视觉模型。影响群聊场景下 GIF/动画表情的理解质量。
  https://github.com/AstrBotDevs/AstrBot/issues/9854

- **Issue #9848** — 飞书群聊中前置 @机器人 导致 `/stop` 等指令未被识别。该问题由核心维护者 @Soulter 报告，影响所有标准指令（含插件指令），且未识别的 `/stop` 会被正在运行的 Agent 当作 follow-up 消息捕获，可能导致无法中断任务。
  https://github.com/AstrBotDevs/AstrBot/issues/9848

**中低严重度（已有修复 PR）**

- **PR #9335**（待合并）— 修复上下文清理器未处理不支持的图片 MIME 类型（如 GIF）问题。当引用 GIF 被持久化为 `data:image/gif;base64,...` 时，部分 OpenAI 兼容的 Gemini 网关会拒绝请求。
  https://github.com/AstrBotDevs/AstrBot/pull/9335

- **PR #9780**（待合并）— 修复发送给视觉 Provider 前未规范化不支持图片格式的问题。DeepSeek 等 OpenAI 兼容 Provider 会拒绝 `webp/png/jpeg/gif` 之外的图片格式。
  https://github.com/AstrBotDevs/AstrBot/pull/9780

- **PR #9853**（待合并）— 修复 Gemini 3 工具历史回放时缺少 thought signature 导致的 4xx 校验错误。当工具调用由其他 Provider 产生后切换/回退到 Gemini 3 时会触发。
  https://github.com/AstrBotDevs/AstrBot/pull/9853

**已关闭**

- **Issue #9765**（已关闭）— 关闭 LLM 后仍报错 LLM 响应错误。该问题今日关闭，未说明具体原因。
  https://github.com/AstrBotDevs/AstrBot/issues/9765

## 功能请求与路线图信号

今日功能请求呈现清晰的 Provider 扩展与体验优化两大主线：

**Provider 扩展（有对应 PR 或明确落地路径）**

- **GLM Coding Plan 支持**（Issue #7109 → PR #9852）：新增独立 `zhipu_coding_plan_chat_completion` Provider，使用固定模型目录（GLM-5.3、GLM-5.2、GLM-5-Turbo 等），默认国内 Coding API。该 PR 今日提交，处于待合并状态。
  https://github.com/AstrBotDevs/AstrBot/pull/9852

- **阿里云百炼 LLM 对话 Provider**（Issue #9817）：用户指出 AstrBot 已在 Agent 执行器、TTS、Embedding 中支持百炼，但缺少 LLM 对话 Provider。该请求今日有更新，暂无对应 PR。
  https://github.com/AstrBotDevs/AstrBot/issues/9817

- **火山引擎 TTS 新版 API**（Issue #9657）：请求支持新版音频生成 HTTP API（`/api/v3/tts/create`），当前使用旧版 `/api/v1/tts` 接口。暂无对应 PR。
  https://github.com/AstrBotDevs/AstrBot/issues/9657

**WebUI 与可观测性**

- **日志分类与筛选**（Issue #9850，1 👍）：用户建议按适配器/插件分类日志，并支持按等级/来源筛选，便于插件调试。该 Issue 今日新开，暂无对应 PR。
  https://github.com/AstrBotDevs/AstrBot/issues/9850

- **更清晰的 Trace 追踪链路**（Issue #6555）：用户提交了 WebUI 追踪页面改造方案，支持插件自行注册追踪 method。该 Issue 已存在 5 个月，今日有更新，但暂无对应 PR 合并。
  https://github.com/AstrBotDevs/AstrBot/issues/6555

**上下文管理**

- **system_reminder 不固化进历史**（Issue #9779 → PR #9844）：已有修复 PR，标记注入的 system reminders 为临时内容，当前请求可用但不持久化。该 PR 今日提交，待合并。
  https://github.com/AstrBotDevs/AstrBot/pull/9844

## 用户反馈摘要

- **Provider 接入诉求强烈**：多位用户主动请求接入新 Provider（Synthorai、GLM Coding Plan、阿里云百炼），且普遍关注"一个 Key 多模型"的网关类服务。Synthorai 从 Issue 到合并仅 3 天，说明项目对 Provider 生态的响应速度令社区满意。

- **上下文管理是核心痛点**：Issue #9779 用户精准指出 system_reminder 注入块会随用户消息持久化并永久滞留，既污染上下文又浪费 token。该反馈技术细节完整，直接推动了 PR #9844 的产生。

- **调试体验有待提升**：Issue #9850 用户抱怨日志混杂、滚动快、无持久化，插件调试困难，建议按插件维度查看日志。这反映了插件开发者对可观测性的真实需求。

- **GIF 理解场景被忽视**：Issue #9854 用户发现群聊 GIF 动图仅能得到静态帧描述，说明多模态能力在动图场景下存在明显短板，用户对"动作、表情变化和前后过程"的理解有明确期待。

## 待处理积压

以下 Issue/PR 长期未得到响应或推进，建议维护者关注：

- **Issue #6555**（2026-03-18 创建，2 条评论）— 更清晰的 Trace 追踪链路实现。用户已提交完整改造方案并自用一段时间，但 5 个月未获合并。该功能对插件调试与 Agent 调用排查有直接价值。
  https://github.com/AstrBotDevs/AstrBot/issues/6555

- **Issue #7109**（2026-03-28 创建，3 条评论）— Code Plan API 支持。虽已有 PR #9852 响应，但该 Issue 积压 5 个月才得到实现，反映 Coding Plan 类需求此前未被充分重视。
  https://github.com/AstrBotDevs/AstrBot/issues/7109

- **Issue #9657**（2026-08-13 创建，1 条评论）— 火山引擎 TTS 新版 API 支持。已等待 2 周无 PR，旧版接口可能面临废弃风险。
  https://github.com/AstrBotDevs/AstrBot/issues/9657

- **PR #9667**（2026-08-13 创建，待合并，size:XL）— 聊天历史分页与推理块懒加载。该 PR 解决长会话响应缓慢问题，已等待 2 周，可能与 #9846 的会话重构存在重叠，需协调合并策略。
  https://github.com/AstrBotDevs/AstrBot/pull/9667

---

**项目健康度评估**：AstrBot 今日整体状态良好。Issue 关闭率 33%（4/12），PR 合并率 25%（3/12），Provider 生态扩展节奏加快（Synthorai 快速落地、GLM Coding Plan 已提交）。需关注两个信号：一是飞书指令识别 Bug 由核心维护者亲自报告，说明平台适配层仍存在兼容性短板；二是多个 WebUI 相关 PR（#9846、#9847、#9667、#9844）集中提交，可能存在功能重叠，建议维护者统一规划合并顺序，避免冲突。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*