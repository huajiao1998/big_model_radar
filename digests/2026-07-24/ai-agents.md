# OpenClaw 生态日报 2026-07-24

> Issues: 350 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-07-23 22:46 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

好的，以下是根据 OpenClaw 项目今日 GitHub 数据生成的 2026-07-24 项目动态日报。

---

# OpenClaw 项目动态日报 | 2026-07-24

## 1. 今日速览
- **整体活跃度：极高**。过去 24 小时内，项目共处理 **350 个 Issues**（其中 254 个为新开/活跃，96 个已关闭）和 **500 个 Pull Requests**（其中 182 个已合并/关闭）。
- **双速发展格局明显**：一方面，维护团队积极合入了大规模重构（Gateway 状态统一、Auto-reply 管线拆分）和“Everything is a cron”架构推进；另一方面，**P0/P1 级回归 Bug 频发**，引发了社区对发布稳定性的广泛担忧。
- **社区情绪两极**：在高度认可项目迭代速度的同时，用户对“静默失败”和“升级即破坏”的现象表达了强烈不满，可靠性再次成为社区关注的绝对焦点。

## 2. 版本发布
- **今日无新版本发布。**

## 3. 项目进展
今日项目进展迅猛，合入了多项重大重构与关键修复，标志着底层架构进入深度优化期。

**重大重构与新特性**
- **[Gateway] 运行状态统一：** `#113157`（已合并，XL）重构了 Gateway 的聊天运行状态存储，将原先分散在不同 Map 中的生命周期状态统一管理，降低了生命周期泄漏风险。
- **[Auto-reply] 管线拆分：** `#113154`（已合并，XL）将项目中最复杂的 `dispatchReplyFromConfigInner` 函数（2821 行）进行拆分，大幅提升了该模块的可审查性和可维护性。
- **[“Everything is a cron” 持续推进]：** 提案 `#110950` 进入实质开发第四阶段，PR `#113165`（待审）将 Heartbeat 中的 `tasks` 转化为独立的 Cron 作业，标志着任务调度标准化的关键跨越。
- **[Telegram 体验优化]：** `#113158`（已合并）让 Telegram 富文本通道原生支持 Markdown 列表渲染，改善了列表阅读体验。
- **[Linux 可部署性增强]：** `#112386`（已合并）支持在没有 systemd 的发行版（如 Slackware、OpenWrt）上管理 Gateway。

**关键 Bug 修复**
- **[会话系统稳定性]：** 针对 `openclaw sessions tail` 命令的崩溃，`#112973`、`#112917`、`#112449` 三个 PR 今日集群式修复了因 sessionId 缺失或非字符串导致的 `TypeError` 崩溃。
- **[Cron 高并发修复]：** `#113088`（已合并）修复了孤立 Cron 运行由于并发写入导致的会话声明失败问题。
- **[数据库兼容性]：** `#113151`（已合并）修复了 v13 架构的 Agent 数据库在 Node 22.22.3 和 24.15.0 上无法打开的问题。

## 4. 社区热点
今日最活跃的讨论集中在会话可靠性与模型兼容性两大方向。

| 排名 | Issue/PR | 标题 | 评论数 | 核心诉求 |
|---|---|---|---|---|
| 1 | [#44925](https://github.com/openclaw/openclaw/issues/44925) | Subagent completion silently lost | 22 | **【静默失败】最强烈的社区痛点。** 用户报告在多种模式下子代理任务结果静默丢失，无重试、无通知。标签涉及 `message-loss` 和 `session-state`，被标记为 “Diamond Lobster” 优先级。 |
| 2 | [#102020](https://github.com/openclaw/openclaw/issues/102020) | Second message fails with "session conflicted" | 15 | **【交叉通道冲突】** 第二个消息就失败，且与频道位置相关。暴露了跨频道会话管理的深层问题。 |
| 3 | [#94228](https://github.com/openclaw/openclaw/issues/94228) | Anthropic thinking block bricks tool-use threads | 14 | **【厂商兼容性】Anthropic 原生路径的严重阻塞。** 长 Tool-use 会话会因 `thinking` 块签名无效永久卡死，被标记为 “Platinum Hermit” 高影响级别。 |
| 4 | [#92043](https://github.com/openclaw/openclaw/issues/92043) | 180s compaction timeout fails identically every turn | 13 | **【资源管理】** 压缩超时导致每轮都失败，社区对“同一错误重复发生”的机制感到困惑。 |
| 5 | [#108435](https://github.com/openclaw/openclaw/issues/108435) | Gateway fails to start after 2026.7.1 update | 10 | **【阻塞性崩溃】P0 级回归。** 更新后 Gateway 无法启动，彻底阻塞用户使用。 |

**分析：** 社区当前最强烈的情绪是 **“对系统透明度的渴求”** 。无论是子代理的“静默丢失”还是评论中提到的“升级即静默破坏”，用户不再接受黑盒式的失败。同时，**与特定厂商（Anthropic、llama.cpp）的 Schema 兼容性问题**开始暴露，随着项目集成度加深，此类问题将成为测试重点。

## 5. Bug 与稳定性
今日 Bug 显著集中在新版本发布后的回归问题上，系统性风险较高。

**P0 级（阻塞/崩溃）**
- **[P0] Gateway 启动失败：** `#108435` — 7.1 版本更新后 Gateway 完全不可用，影响所有启动方式（systemd, ollama, 手动）。**状态：待维护者审查，无修复 PR。**
- **[P0] 静默迁移破坏配置：** `#90378` — 5.28 → 6.1 升级时，Cron 存储从 JSON 静默迁移至 SQLite 未保留配置，导致消息发送模式出错。**状态：关联 PR 已开。**

**P1 级（严重回归/行为错误）**
- **[P1] 全通道卡死：** `#101814` — 6.11 更新后，每个新会话只允许一次对话，随后永久静默，需 Gateway 重启恢复。**状态：stale 待处理。**
- **[P1] Cron 工具与 llama.cpp 冲突：** `#108580` — 7.1 回归，Cron 工具的 Schema 字段导致所有使用 llama.cpp 的聊天请求失败。**状态：关联 PR 已开。**
- **[P1] Telegram DM 回退：** `#111519` — Beta 版本回归，DM 回复丢失所有权。**状态：待维护者审查，无修复 PR。**
- **[P1] Feishu 流式延迟：** `#91941` — 流式卡片路径切换为全量文本后，长回复延迟暴涨。**状态：关联 PR 已开。**
- **[P1] 消息工具被 Poll Schema 污染：** `#42820` — 飞书 (`Feishu`) 发送文件时因 Poll 字段自动填充被拒。**状态：stale 待处理。**

**P2 级（高影响 Bug）**
- **[P2] 会话上下文膨胀：** `#67419` — 每轮对话重复注入 20-30% 的引导文件 token，浪费预算。**状态：stale 待处理。**
- **[P2] Discord MCP 工具不可用：** `#91799` — Discord Agent 无法调用自定义 MCP 工具，但 CLI 正常。**状态：stale 待处理。**

**今日新发现（2026-07-23 更新）**
- `#112696` **Control UI 多 Agent 头像和会话列表回归** — 7.1-2 版本更新后，工作区相对路径头像无法加载，会话列表错乱。

## 6. 功能请求与路线图信号

**重点推进方向**
- **任务调度标准化：** `#110950`（Everything is a cron）已从提案进入实质性开发（`#113165`），这将是下一阶段架构的核心变化。
- **内存系统（Memory MVP）：** `#42651`（CLI/Skill 接口）和 `#42648`（写管道构建）持续获得社区关注，是系统智能化的重要拼图。
- **安全体系升级：**
    - `#12219` **Skill 权限清单标准**（Skill.yaml）呼声极高，旨在防止恶意 Skill 窃取凭证。
    - `#41418` **全局 --dry-run 模式**，拦截所有工具调用并预览，增强执行安全。
    - `#43673` **组织级 RBAC 和部署清单**，满足团队和多用户部署需求。

**潜在纳入下一版本的功能**
- `#38520` **预压缩通知与结构化的交班窗口**，防止压缩打断长流程任务。
- `#7524` **群组合并会话选项**（`groupScope`），允许群聊不隔离而合并到主会话。
- `#38568` **将上下文窗口使用率注入 System Prompt**，让 Agent 能感知自身上下文占用情况。
- `#49259` **仪表盘自动清理孤立旧会话。**

## 7. 用户反馈摘要

**满意/认可方面**
- **社区深度参与架构设计：** 用户对 `#110950`“Everything is a cron”提案给出了深度评论和认可，展示了高端用户对系统自动化深层原理的追求。
- **详细实战报告：** `#41372` 用户提供了在 2GB VPS 上自托管 4 周后整理的 **25 项发现**，包含配置崩溃、CLI 文档、Cron 等实战经验，这类贡献极为宝贵。

**典型痛点**
- **升级体验成疑：** “每次升级都像开盲盒”是今日社区讨论的潜台词。P0 和 P1 级回归导致大量用户对更新持谨慎态度。
- **静默失败的不可接受：** “Subagent 失败了没有任何日志和重试，我是在几小时后才发现任务停了” —— 社区普遍认为 `#44925` 是最严重的可靠性缺陷。

## 8. 待处理积压
以下是长时间未响应或未闭合的高风险、高价值 Issue，提醒维护团队关注：

**高风险（P0/P1，长期未闭合）**
- [#94228](https://github.com/openclaw/openclaw/issues/94228) **[stale, P1] Anthropic thinking block 破坏长链会话** — 影响了使用原生 Anthropic 路径进行复杂任务的所有用户。
- [#92043](https://github.com/openclaw/openclaw/issues/92043) **[P1] 压缩超时循环** — 超时机制设计缺陷导致合法长压缩永远无法完成。
- [#43374](https://github.com/openclaw/openclaw/issues/43374) **[stale, P1] 多 Agent 并发 API 调用全部超时** — 严重限制了多 Agent 团队协作场景。

**高影响（P2，社区热切期盼）**
- [#67419](https://github.com/openclaw/openclaw/issues/67419) **[P2] 上下文膨胀** — 修复可普遍降低 20%-30% 的 Token 消耗。
- [#102081](https://github.com/openclaw/openclaw/issues/102081) **[stale, P1] macOS 上 Exec Allowlist 自动执行不可用** — 安全策略在 macOS 上的实现缺陷。

**被忽略的洞察**
- [#41372](https://github.com/openclaw/openclaw/issues/41372) **[stale, P2] 25 项实战报告** — 包含大量一线运维的 Crash 和 Workaround，建议维护者设立“用户实战报告”专项回顾。
- [#48641](https://github.com/openclaw/openclaw/issues/48641) **[stale, P2] Discord DM 静默丢弃** — 通道核心功能的可靠性问题，长期未闭合。

---

## 横向生态对比

# 横向对比分析报告：AI 智能体与个人 AI 助手开源生态（2026-07-24）

---

## 1. 生态全景

当前 AI 智能体开源生态呈现 **“高速迭代与稳定性阵痛并行”** 的双速格局。头部项目日处理数百个 Issue/PR，社区参与度极高，但版本升级后的回归故障（P0/P1 级 Bug）成为普遍痛点，用户对“静默失败”的容忍度已降至最低。跨项目来看，**安全与密钥管理、Token 效率优化、跨协议互操作性**三条主线清晰浮现，同时衍生出通用平台、边缘部署、垂直 IM 等差异化方向。生态整体仍处于快速整合期，架构变动频繁，但成熟度尚不足以支撑企业级无忧部署。

---

## 2. 各项目活跃度对比

| 项目 | Issues (当日新增/活跃) | PRs (当日更新/处理) | 版本发布 | 健康度评估 |
|------|-----------------------|---------------------|----------|------------|
| **OpenClaw** | 254 新开/活跃 | 500 处理（182 合并/关闭） | 无 | **中**：架构重构积极，但 P0/P1 回归 Bug 频发，社区信心受挫 |
| **Zeroclaw** | 50 更新 | 50 更新（仅 3 合并） | 无 | **中偏弱**：合并率低（47:3），S0 数据丢失风险虽快速响应但待修复积压高 |
| **PicoClaw** | 1 更新（自动关闭） | 15 更新（1 合并，多为 Dependabot） | 无 | **良**：稳定但节奏缓慢，关键功能 PR（回退链）停滞待审 |
| **QwenPaw** | 35 更新 | 50 更新（多个合并） | v2.0.1-beta.2 | **中**：功能推进快，但 v2.0 引入性能回归和进程崩溃，用户升级体验负面 |
| **hermes-agent** | 235 新增/活跃 | 500 处理（229 合并/关闭） | 无 | **中**：高度活跃，安全修复密集，但桌面端 P1 Bug 与 Token 效率问题尖锐 |
| **AstrBot** | 9 新开 | 7 更新（1 合并） | 无 | **良**：规模较小但响应迅速，核心 Bug（重试崩溃、子代理工具）当天即有关联 PR |

---

## 3. OpenClaw 在生态中的定位

- **核心参照地位**：OpenClaw 是当前生态中 Issue/PR 量级最大的项目（处理量是第二梯队的 3–5 倍），被其他项目（尤其是 Claw 系列）视为架构风向标。其“Everything is a cron”和 Gateway 状态统一等重构直接引领底层调度标准化方向。
- **技术路线优势**：深度聚焦 **Agent 运行时核心**（会话状态、管道拆分、任务调度），而非上层应用或界面，近似于 AI 智能体的“操作系统内核”。社区对架构设计有广泛讨论（如 #110950 获得深度参与），工程社区影响力突出。
- **核心短板**：发布稳定性控制较弱，P0/P1 回归 Bug 密集（Gateway 启动失败、子代理静默丢失），导致用户信任度下降。与厂商 Schema 兼容性问题（Anthropic、llama.cpp）暴露了集成测试覆盖不足。
- **相对其他项目**：比 Zeroclaw 更侧重通用性与架构统一性，而非企业安全专精；比 PicoClaw 更底层、更复杂；比 QwenPaw 更少平台化功能（如无创作应用）；比 hermes-agent 更工程稳健但略逊于其安全响应速度；比 AstrBot 社区规模大一个数量级，但后者在特定 IM 生态（QQ/OneBot）上更深入。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 核心诉求（代表性 Issue/PR） |
|----------|----------|----------------------------|
| **子代理/工具链可靠性** | OpenClaw, AstrBot, hermes-agent, QwenPaw | 子代理结果静默丢失（OpenClaw #44925）、子代理工具不完整（AstrBot #9354）、Hindsight 静默失败（hermes-agent #2765）、工具调用参数污染（QwenPaw #6363） |
| **会话状态一致性与跨平台共享** | OpenClaw, Zeroclaw, hermes-agent, QwenPaw | 会话冲突（OpenClaw #102020）、跨标签页消息串扰（hermes-agent #59305）、跨平台会话续接（hermes-agent #4335）、跨 Agent 会话共享（Zeroclaw #2767 多 Agent 路由） |
| **安全与凭证管理** | OpenClaw, Zeroclaw, hermes-agent, PicoClaw | Secret 免 API 池化管理（OpenClaw #12219）、KeySource 抽象 RFC（Zeroclaw #9127）、API Key 明文存储（hermes-agent #69449）、Go 依赖漏洞修复（PicoClaw #3286） |
| **Token 与性能优化** | OpenClaw, hermes-agent, QwenPaw | 上下文膨胀 20-30%（OpenClaw #67419）、Lazy Tool Schema 避免 Token 浪费（hermes-agent #6839）、v2.0 固定 2s 开销（QwenPaw #6307） |
| **跨 Agent 协议互操作** | Zeroclaw, hermes-agent, QwenPaw | A2A 协议接入（Zeroclaw #3566）、跨 Agent 协作（OpenClaw #44925 子代理）、第三方代理后端（QwenPaw #6397 Codex/Qoder） |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|------|----------|----------|------------------|
| **OpenClaw** | Agent 运行时内核，任务调度标准化（cron），Gateway 状态管理 | 自托管开发者、进阶用户 | 复杂管道系统（Auto-reply 管线拆分），强调度抽象，社区驱动架构 |
| **Zeroclaw** | 企业级安全与数据保护，通道消息稳定性 | 企业团队、安全敏感用户 | S0 数据丢失零容忍，ScopedToolRegistry 隔离，Landlock 沙箱，KeySource 密钥抽象 RFC |
| **PicoClaw** | 轻量部署，边缘硬件（NanoKVM），最小化依赖 | 嵌入式/边缘设备用户 | 极简架构，模型回退链补全高可用，Copilot SDK 升级紧跟生态，DeltaChat 集成 |
| **QwenPaw** | 平台化（创作应用、第三方代理后端），桌面体验 | 追求一体化体验的用户 | 桌面端+WebUI 首次发布质量承压，记忆写入引导修复，治理策略与工具检测融合 |
| **hermes-agent** | 前沿特性（MoA 聚合、多 Profile），研究社区驱动 | 研究者、高端玩家 | 凭据池错误标记修复等核心逻辑，安全审计响应快速，桌面端功能对等 Dashboard |
| **AstrBot** | 垂直 IM 平台（QQ/OneBot），插件生态 | QQ/OneBot 机器人的维护者与深度用户 | 指令系统、子代理编排、消息 ID 透传等 QQ 专属交互，OneBot 生态兼容性优先 |

---

## 6. 社区热度与成熟度分层

**第一梯队（超高活跃度，技术债高，快速迭代）**
- **OpenClaw** 和 **hermes-agent**：Issue/PR 量级达 200–500/天，拥有最庞大的贡献者群体。两者均处于架构深度调整期（OpenClaw cron 标准化；hermes-agent 多 Profile 与 MoA），但回归 Bug 密度高，社区情绪“既认可方向又不满体验”。
- **QwenPaw**：紧随其后，35 Issues / 50 PRs 日活跃，v2.0 大版本切换带来性能与稳定性阵痛，正处于功能扩展（Creator app、第三方后端）与质量修复的拉锯期。

**第二梯队（高度活跃，安全与功能并重）**
- **Zeroclaw**：50 Issues/PRs 日活跃，合并率低（47:3）说明审查流程拥堵，但安全响应极快（S0 数据丢失当天 PR）。属于“高质量但低并发”模式，成熟度有待 PR 积压解决后提升。

**第三梯队（中等活跃，专注特定领域，稳定性优先）**
- **AstrBot** 和 **PicoClaw**：日活跃在 10–15 量级，社区规模较小但沟通紧密。AstrBot 快速跟进 Bug 修复与 QQ 功能增强；PicoClaw 依赖生态自动更新（Dependabot），核心功能提交（模型回退链）等待合入，整体节奏平稳。

**成熟度总结**：所有项目均处于 **β 到 v1 过渡阶段**，尚未有任一项目达到“开箱即用高可靠”的产品级成熟度。PicoClaw 因改动最小相对稳定，OpenClaw 和 hermes-agent 则因频繁重构而最不确定。

---

## 7. 值得关注的趋势信号

1. **“静默失败”零容忍，可观测性成为刚需**  
   OpenClaw #44925、Zeroclaw S0 数据丢失、hermes-agent #62708 等案例表明，社区不再接受无日志、无重试的失败。**Agent 内部状态透明化（日志、重试策略、决策链路）将成为选择框架的关键指标。**

2. **跨 Agent 协议（A2A）从提议走向实现**  
   Zeroclaw #3566 热度极高，QwenPaw #6397 引入第三方代理后端，OpenClaw 子代理管道拆分。**Agent 间互联不再是附加功能，而是生态分化的分水岭。** 谁先实现标准互操作，谁就可能成为枢纽。

3. **Token 效率成为核心竞争维度**  
   hermes-agent #6839（Lazy Tool Schema）、OpenClaw #67419（上下文膨胀）反映出用户对 API 成本的极度敏感。**架构层面动态注入、按需加载工具 Schema 将成为标配**，而非优化选项。

4. **安全左移：从密钥管理到运行时沙箱**  
   Zeroclaw 的 KeySource 抽象、hermes-agent 的 API Key 明文存储警告、OpenClaw #12219 Skill 权限清单，表明安全设计正从外围配置向代码架构层迁移。**沙箱（Landlock）、请求白名单（SSRF 防护）、审计日志不再是加分项，而是基础要求。**

5. **升级平滑性直接影响项目口碑**  
   QwenPaw v2.0 的 2s 固定开销、OpenClaw 7.1 版本 Gateway 崩溃、Zeroclaw 通道数据丢失——**“升级即破坏”正在消耗社区信任。** 未来谁能引入自动化回归测试 + 增量迁移指南，谁就能在用户留存率上领先。

6. **垂直场景深化 vs 通用平台蔓延**  
   AstrBot 深耕 QQ/OneBot、PicoClaw 锁定 NanoKVM 边缘设备，与 OpenClaw/QwenPaw 的通用路线形成鲜明对比。**对中小团队而言，垂直场景的“小而可靠”可能比通用平台的“大而全”更具落地优势。**

---

*本报告基于 2026-07-24 各项目 GitHub 动态摘要生成，数据截止北京时间当日 24:00。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

好的，以下是根据您提供的 Zeroclaw 项目数据生成的 2026-07-24 项目动态日报。

---

# Zeroclaw 项目动态日报 | 2026-07-24

**数据来源:** GitHub (zeroclaw-labs/zeroclaw)
**分析周期:** 过去24小时

---

### 1. 今日速览

过去24小时内，ZeroClaw 项目保持了极高的社区活跃度，**共产生 50 条 Issue 更新和 50 条 PR 更新**。社区贡献者 @IftekharUddin 表现尤为突出，密集提交了多项严重级别 Bug 的修复 PR。尽管活动总量庞大，但项目合并率偏低（47 条 PR 待合并，仅 3 条关闭），代码审查流程面临一定压力。安全与数据稳定性是今日的绝对焦点，多起 S0/S1 级别的严重 Bug 被报告，并迅速得到了定位与修复。

---

### 2. 版本发布

无新版本发布。项目目前正处于高强度开发和缺陷修复的积累期，预计正在为下一个里程碑版本（如 v0.9.0）做整合准备。

---

### 3. 项目进展

今日主要进展体现在对 **S0级数据丢失漏洞**的紧急响应和多项长期功能请求的最终关闭。

**关键功能与 Bug 修复（关闭/解决）：**
- **开发者体验改进：** 用户诟病已久的日志输出问题得到解决，ZeroClaw 日志现默认输出至 stderr（[#4721](https://github.com/zeroclaw-labs/zeroclaw/issues/4721)），方便 CLI 工具管线化使用。
- **社区功能实装：** 用户呼声较高的功能尘埃落定，包括 Discord 频道白名单（[#6378](https://github.com/zeroclaw-labs/zeroclaw/issues/6378)）、Cron 通知仅输出最终结果（[#6510](https://github.com/zeroclaw-labs/zeroclaw/issues/6510)）、以及支持通过工具直接发送频道消息（[#5145](https://github.com/zeroclaw-labs/zeroclaw/issues/5145)）。
- **数据安全修复（PR 提交）：** 针对 Telegram（[#9188](https://github.com/zeroclaw-labs/zeroclaw/issues/9188)）和 WeChat（[#9187](https://github.com/zeroclaw-labs/zeroclaw/issues/9187)）通道在异常崩溃时可能丢消息的严重漏洞，@IftekharUddin 于今日紧急提交了修复 PR（[#9314](https://github.com/zeroclaw-labs/zeroclaw/pull/9314)、[#9313](https://github.com/zeroclaw-labs/zeroclaw/pull/9313)）。
- **架构演进：** 引擎工具注册表被重构为 `ScopedToolRegistry`，增强了运行时安全性和资源隔离（[#9319](https://github.com/zeroclaw-labs/zeroclaw/pull/9319)）。

---

### 4. 社区热点

1.  **[Trackerk]: A2A 协议互操作性（[#3566](https://github.com/zeroclaw-labs/zeroclaw/issues/3566)）**：以 **9条评论** 和 **7个赞** 位居热度榜首。社区对 ZeroClaw 接入标准 Agent2Agent 协议，实现与 NanoClaw、OpenClaw 等外部 Agent 互联互通的诉求极为强烈，这是构建开放生态的基石。
2.  **多 Agent 路由（[#2767](https://github.com/zeroclaw-labs/zeroclaw/issues/2767)）**：虽然已关闭，但在生命周期内收获了 **9个赞**。反映出用户渴望在单个 Gateway 内并行运行多个隔离 Agent，并能将其绑定到不同的频道账号上，这是迈向平台化部署的关键信号。
3.  **KeySource 密钥来源抽象 RFC（[#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127)）**：获得了 **7条评论**。社区深度参与了底层安全架构设计的讨论，说明企业级用户在密钥管理与安全合规方面有着极强的专业诉求。

---

### 5. Bug 与稳定性

今日 Bug 报告密集爆发，严重程度普遍较高，但修复响应极快。

| 严重程度 | 问题描述 | 状态 |
| :--- | :--- | :--- |
| **S0 - 数据丢失** | Telegram 长轮询偏移量在消息成功投递前即确认 ( [#9188](https://github.com/zeroclaw-labs/zeroclaw/issues/9188) ) | **已有 Fix PR** ([#9314](https://github.com/zeroclaw-labs/zeroclaw/pull/9314)) |
| **S0 - 数据丢失** | WeChat 同步游标在消息入队前即持久化 ( [#9187](https://github.com/zeroclaw-labs/zeroclaw/issues/9187) ) | **已有 Fix PR** ([#9313](https://github.com/zeroclaw-labs/zeroclaw/pull/9313)) |
| **S1 - 工作流阻塞** | `web_fetch` 工具无法解析 gzip/brotli 压缩响应 ( [#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207) ) | 待认领/修复 |
| **S1 - 工作流阻塞** | Cron Agent 任务无墙钟超时，可能导致僵尸进程 ( [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) ) | 待认领/修复 |
| **S1 - 工作流阻塞** | Landlock 沙箱限制 ZeroClaw 守护进程自身 ( [#9204](https://github.com/zeroclaw-labs/zeroclaw/issues/9204) ) | 待认领/修复 |
| **S1 - 工作流阻塞** | Windows 桌面安装程序启动崩溃 ( [#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290) ) | 待认领/修复 |
| **S1 - 安全风险** | npm 审计发现 3 个高危/严重依赖漏洞 ( [#9235](https://github.com/zeroclaw-labs/zeroclaw/issues/9235) ) | 待认领/修复 |
| **S2 - 降级行为** | 配置刷新 (`config flush`) 可能覆盖并发写入 ( [#9284](https://github.com/zeroclaw-labs/zeroclaw/issues/9284) ) | **已有 Fix PR** ([#9312](https://github.com/zeroclaw-labs/zeroclaw/pull/9312)) |
| **S2 - 降级行为** | ZeroCode TUI 在长会话后出现按键/滚动延迟 ( [#9092](https://github.com/zeroclaw-labs/zeroclaw/issues/9092) ) | **已有 Fix PR** ([#9317](https://github.com/zeroclaw-labs/zeroclaw/pull/9317)) |
| **S3 - 小问题** | 嵌套 `set_prop` 报错信息被错误掩盖 ( [#9285](https://github.com/zeroclaw-labs/zeroclaw/issues/9285) ) | **已有 Fix PR** ([#9310](https://github.com/zeroclaw-labs/zeroclaw/pull/9310)) |

**分析：** 项目在通道数据安全方面经历了一次严峻考验，但维护团队在 Bug 报告当日即提交了修复代码，展现了极高的响应速度和危机处理能力。

---

### 6. 功能请求与路线图信号

- **极有可能纳入 v0.9.0 的功能：**
    - **安全加固：** 全通道 TOTP 二次认证（[#3767](https://github.com/zeroclaw-labs/zeroclaw/issues/3767), P1）、KeySource 密钥抽象（[#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127)）。
    - **核心能力：** A2A 协议支持（[#3566](https://github.com/zeroclaw-labs/zeroclaw/issues/3566)）、消息生命周期 Hooks（[#3696](https://github.com/zeroclaw-labs/zeroclaw/issues/3696)）。
    - **开发者工具：** 评估结果趋势看板与 Pass-rate 追踪（[#9228](https://github.com/zeroclaw-labs/zeroclaw/issues/9228)）。
- **长期探索方向：**
    - **Agent 文件版本管理：** 为工作区文件提供类似 Git 的变更历史追踪（[#3672](https://github.com/zeroclaw-labs/zeroclaw/issues/3672)）。
    - **记忆机制优化：** 使用 schema 验证的 Tool Calling 方式替代 prompt 约束的 JSON 解析进行记忆整合（[#4760](https://github.com/zeroclaw-labs/zeroclaw/issues/4760)）。
- **大型 PR 等待审核：** Telegram 多消息流式传输（[#8561](https://github.com/zeroclaw-labs/zeroclaw/pull/8561)）和全局 `/goal` 命令准入（[#8689](https://github.com/zeroclaw-labs/zeroclaw/pull/8689)）功能已开发完毕，但处于审核阶段。

---

### 7. 用户反馈摘要

- **开发者体验的胜利：** “日志输出到 stdout 导致 `zeroclaw config schema` 的管道输出被污染”（[#4721](https://github.com/zeroclaw-labs/zeroclaw/issues/4721)）。该痛点已被解决，日志现在输出到 stderr。
- **误报仍需谨慎：** 高熵令牌检测器对非密钥的高熵内容（如 MD5 文件名、WeChat 媒体文件）大量误报（[#4832](https://github.com/zeroclaw-labs/zeroclaw/issues/4832)）。用户需要一个禁用选项，该需求已被满足。
- **中间产物冗余：** Cron 的 announce 模式输出所有中间推理步骤，“我只想要最终结果”（[#6510](https://github.com/zeroclaw-labs/zeroclaw/issues/6510)）。该需求已被关闭，产品在通知策略上增加了灵活性。
- **桌面端体验亟待完善：** Windows 用户安装 v0.8.3 桌面版后无法启动（[#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290)），Linux 用户在 AppImage 检测方面也遇到困难（[#9202](https://github.com/zeroclaw-labs/zeroclaw/issues/9202)）。

---

### 8. 待处理积压

以下重要 Issue 或 PR 长期未获得实质性进展，或处于“等待作者回应”状态，提醒维护团队关注：

- **高风险待审 PR（需维护方介入推动）：**
    - **SSRF 漏洞修复** ([#8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713))： 解决“file_download”工具的 SSRF 问题，改动量为 XL，已等待近 20 天。
    - **通道命令准入功能** ([#8689](https://github.com/zeroclaw-labs/zeroclaw/pull/8689))： 核心交互功能改进，改动量为 XL。
    - **安全依赖忽略清理** ([#8781](https://github.com/zeroclaw-labs/zeroclaw/pull/8781))： 清理过时的安全 advisory 忽略项。
- **严重开放 Bug 待修复：**
    - `web_fetch` 工具压缩响应问题（[#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207), S1）。
    - 任务无超时/僵尸进程风险（[#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191), S1）。
    - Landlock 沙箱不兼容（[#9204](https://github.com/zeroclaw-labs/zeroclaw/issues/9204), S1）。
    - Windows 桌面端启动崩溃（[#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290), S1）。
    - Telegram 频道别名在配置重载后丢失（[#9236](https://github.com/zeroclaw-labs/zeroclaw/issues/9236), P1）。
- **流程健康提示：** 当前 47:3 的 PR 积压与合并比例显著偏低。维护者需适度提升审查优先级，避免挫伤 @IftekharUddin、@Project516 等高活跃度贡献者的积极性。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

好的，这是根据您提供的 PicoClaw GitHub 仓库数据生成的 2026-07-24 项目动态日报。

---

# PicoClaw 开源项目动态日报 | 2026-07-24

## 1. 今日速览
昨日项目动态以**依赖维护与旧项清理**为主。虽然 PR 更新数量高达 15 条，但大部分为 Dependabot 机器人因版本迭代自动产生的堆叠与关闭，真正被合入的代码变更是由社区贡献者提交的一项 Go 安全修复（#3286）。Issue 侧唯一一条更新为旧报告被自动关闭。目前有 8 个待合并 PR，其中包括 “模型默认回退链” 等关键功能，核心功能开发节奏平稳，等待审核与合入。**项目健康度评估：稳定。依赖生态更新积极，供应链安全有保障，核心功能提交活跃但需要一个快速的合并冲刺。**

## 2. 版本发布
无新版本发布。

## 3. 项目进展
昨日共关闭 7 个 PR，其中 1 个被实质性合入，其余多为依赖版本替代或久置失效导致的关闭。
- **[已合并] 安全加固**：开发者 @imguoguo 提交的 **#3286** 已成功合入。该修复解决了 `govulncheck` 发现的 Go 语言及 `golang.org/x/text` 中的漏洞，有效提升了代码库的供应链安全性。
- **[已停滞] 社区功能贡献遗憾关闭**：由 @jp39 提交的 **#3118**（远程 Agent WebSocket 模式）和 **#3115**（修复通用工具输出中的内联 Data URL 会话历史损坏问题），因长时间缺乏后续互动被标记为 `[stale]` 关闭。如果维护者仍考虑纳入，需要重新联系原贡献者。
- **[已替代] 依赖栈大版本刷新**：由于 Dependabot 持续提交新版本 PR，旧版本被自动关闭（如 #3236、#3238、#3235）。新版 PR 等待合入，涉及 `copilot-sdk` (`0.2.0` → `1.0.8`)、`bedrockruntime`、`aws-sdk` 等核心库，预示下次版本发布将包含大量底层更新。

> [PR #3286 - Go vuln fix (已合并)](https://github.com/sipeed/picoclaw/pull/3286)
> [PR #3200 - 模型回退链 (待合并)](https://github.com/sipeed/picoclaw/pull/3200)

## 4. 社区热点
昨日社区唯一的活跃讨论点集中在 **#3195** 上。
- **议题焦点**：用户 @rtadams89 报告在 NanoKVM 2.4.0 上安装 PicoClaw 后，根据官方文档配置 `gpt-5.4` 模型，所有交互尝试均失败。
- **分析**：该 Issue 获得了 4 条评论，但最终因问题未得到完全确认且用户未及时回复，被 Stale Bot 自动关闭。**背后的核心诉求是 PicoClaw 在新兴硬件平台（NanoKVM）上的“开箱即用”体验。** 用户严格按照文档配置却无法工作，暗示了默认配置或模型兼容性可能存在未被覆盖的盲区。Issue 虽关闭，但问题可能仍潜伏。

> [Issue #3195 - OpenAI GPT 在 NanoKVM 上无法使用](https://github.com/sipeed/picoclaw/issues/3195)

## 5. Bug 与稳定性
- **[已修复·高] 安全漏洞**：`govulncheck` 报告的 Go 语言及 `x/text` 依赖漏洞已在 #3286 中修复并合并。
- **[未确认·中] NanoKVM 兼容性**：尽管 #3195 已被关闭，但其反映出的默认配置无法调用 LLM 的问题依然存在。可能影响大批 NanoKVM 新用户的首次体验。建议维护者在主流环境（NanoKVM 最新固件）上进行回归验证，或更新 Wiki 上的配置示例。
- **[待处理·低] 依赖积压风险**：目前有 8 个待合并 PR，其中 `actions/setup-node` 和 `actions/setup-go` 的升级 PR（#3263、#3262）已积压超过一周，若不及时处理，未来可能导致 CI/CD 流程出现弃用警告。

## 6. 功能请求与路线图信号
结合开放 PR和最新动态，以下功能信号强烈：
- **高优先级·路线图确认：模型默认回退链（#3200 by @lc6464）**。这是昨日更新的重点 PR，旨在 Web UI 上允许用户配置主模型失败时的降级链。一旦合入，将极大提升 PicoClaw 在企业级高可用场景下的可用性，是下一版本的关键卖点。
- **生态扩展信号：Copilot SDK 大版本跃迁（#3291）**。从 `0.2.0` 直接跨越到 `1.0.8` 意味着底层 API 可能发生了重大变化。这预示着开发团队可能正在尝试对接 GitHub Copilot 最新的插件协议（如 Copilot Chat Extensions），而非仅仅停留在基本的 Embedding 支持。
- **产品打磨：DeltaChat 集成重构（#3222 by @trufae）**。移除硬编码的中继列表和传统密码认证，拥抱 JSON-RPC 秘密管理，减少 200 行代码。这表明项目团队在持续优化第三方通信渠道的安全性与可维护性。

> [功能 PR #3200](https://github.com/sipeed/picoclaw/pull/3200) | [Copilot SDK 升级 #3291](https://github.com/sipeed/picoclaw/pull/3291) | [DeltaChat 重构 #3222](https://github.com/sipeed/picoclaw/pull/3222)

## 7. 用户反馈摘要
- **NanoKVM 初始体验瓶颈**：用户 @rtadams89 的遭遇（#3195）反映出官方文档提供的模型配置教程可能未能完全涵盖 NanoKVM 这一特定硬件环境的特殊性。用户最直接的痛点是“按文档做却无法工作”，这需要通过优化 Quick Start 指南或提供特定于 NanoKVM 的配置模板来解决。
- **自动化包裹下的“静默”**：Dependabot PR 的频繁涌现和自动超车，虽然保持了依赖的新鲜度，但也让 PR 列表显得有些杂乱。侧面反映了核心维护者可能将精力集中在了关键功能（如 #3200）的打磨上，导致了 CI 配置类 PR 的积压。

## 8. 待处理积压
以下议题/PR 长期未得到充分响应的，提醒维护者关注：
1. **CI 基础设施风险**：PR #3263 和 #3262 分别要求升级 `actions/setup-node` 和 `actions/setup-go` 至最新版本。这两个 Action 在 GitHub Runner 上变更频繁，**极易产生兼容性警告**，建议优先合并。
2. **DeltaChat 重构冲突风险**：PR #3222 代码量变更较大（-200 行），且已开放 20 天，持续在更新却未收到 Code Review。建议维护者尽快分配资源进行审核，避免后续产生大量代码冲突。
3. **NanoKVM 用户遗留问题**：问题 #3195 虽然已关闭，但并未提供根本解决方案。建议维护者在官方发布渠道（如 Release Notes 或 Wiki）中增加常见问题解答，解决新用户配置 LLM 的障碍，以防类似问题反复出现。

> [Actions 升级 PR #3263](https://github.com/sipeed/picoclaw/pull/3263)
> [DeltaChat 重构 PR #3222](https://github.com/sipeed/picoclaw/pull/3222)
> [NanoKVM 配置 Bug #3195](https://github.com/sipeed/picoclaw/issues/3195)

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

好的，作为AI智能体与个人AI助手领域开源项目分析师，我已根据您提供的QwenPaw GitHub数据，为您生成2026年7月24日的项目动态日报。

---

## **QwenPaw 开源项目日报 - 2026-07-24**

### **1. 今日速览**

QwenPaw 项目在2026年7月23日保持极高的活跃度，迭代速度持续加快。社区提交数量庞大，共有35条Issue和50条PR更新，并发布了新的补丁版本。尽管项目在功能和集成上（如新的创作应用和第三方代理后端）取得显著进展，但v2.0版本引入的性能回归和一系列稳定性Bug仍是社区讨论的焦点，项目维护者已针对其中部分严重问题提交修复。总体来看，项目处于快速演进期，社区生态活跃，但稳定性和性能优化是当前面临的主要挑战。

### **2. 版本发布**

**v2.0.1-beta.2** 于昨日发布。
- **发布链接**: [v2.0.1-beta.2](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.0.1-beta.2)
- **主要内容**:
    - **新特性**: 统一了发布流程，桌面端构建将等待Web端准备就绪后再进行，改善了发布流程的可靠性。
    - **Bug修复**: 修复了在推理（reasoning）消息块出现时，文本消息未能正确滚动的问题。
- **破坏性变更**: 此版本无明确标注的破坏性变更。
- **迁移注意**: 此版本为补丁和流程优化，建议所有v2.0.x用户在备份后升级。

### **3. 项目进展**

过去24小时内，合作者合并了多个重要PR，推动了以下功能和改进：

- **性能与稳定性**:
    - **PR #6393** [已合并]: **`perf(console): stabilize chat options memo and reduce SSE re-parsing`**。通过稳定化前端React组件的选项记忆并减少冗余的数据流解析，旨在修复性能回归问题。
    - **PR #6225** [已合并]: **`fix(desktop): gracefully shut down backend sidecar before exit`**。解决了桌面端强行终止后端进程的问题，现在会发送优雅退出信号，改善了数据一致性和体验。
- **治理与安全**:
    - **PR #6390** [已合并]: **`fix(governance): bridge tool_guard detection rules into governance policy Phase 1`**。开始将工具安全检测规则纳入治理策略系统，提升了安全框架的可扩展性。
- **记忆与代理**:
    - **PR #6351** [已合并]: **`fix(memory): guide failed memory edits`**。通过优化提示词，指导Agent在内存编辑失败后采用重写文件的策略，避免陷入无限重试循环。此修复直接回应了Issue #3015的反馈。
- **新增功能**:
    - **PR #6284** [评审中]: **`feat(apps): add qwenpaw-creator app`**。新增“QwenPaw Creator”应用插件，为将脚本、资产、故事板和视频创作工作流整合到QwenPaw中奠定基础。
    - **PR #6397** [评审中]: **`feat(third-party agents): add extensible Codex and Qoder backends`**。引入可扩展的第三方代理后端架构，目前集成了Codex和Qoder，使第三方Agent可以脱离Coding Mode独立使用。

### **4. 社区热点**

昨日社区讨论最热烈的问题主要集中在v2.0版本的**性能退化**和**关键功能异常**上。

- **[Issue #6307] “v2.0 introduces ~2s fixed overhead per simple conversational reply vs v1.x”** (6条评论)
    - **热度分析**: 该问题直接戳中用户核心痛点——升级带来的性能回退。评论区反映了用户对v1.x时代“轻快”体验的怀念和对v2.0回归效率的强烈诉求。这是社区最关切的回归问题之一。
    - **链接**: [Issue #6307](https://github.com/agentscope-ai/QwenPaw/issues/6307)

- **[Issue #6376] “v2.0.0.post3和post4版本，运行过程中经常因为新增的loop功能导致主进程都挂了。”** (2条评论)
    - **热度分析**: 这是一个严重的稳定性Bug，直接导致整个进程崩溃，尽管评论数少，但其严重性极高。用户的措辞非常激烈，反映了对发布质量的不满。
    - **链接**: [Issue #6376](https://github.com/agentscope-ai/QwenPaw/issues/6376)

- **[Issue #6344] “为Docker部署增加Web端热更新，避免重建容器丢失运行环境”** (3条评论)
    - **热度分析**: 该Feature请求得到了不少社区用户的共鸣。QwenPaw的快速迭代导致Docker用户在更新时频繁丢失环境配置。提案引用了成熟开源项目(AstrBot)的解决方案，建议具有可操作性，是来自资深用户群的声音。
    - **链接**: [Issue #6344](https://github.com/agentscope-ai/QwenPaw/issues/6344)

### **5. Bug 与稳定性**

昨日报告的Bug中，严重等级如下：

- **严重**:
    - **[Issue #6376]**: 新增的`loop`功能导致主进程崩溃。**状态**: 已关闭，但未提及具体修复PR，可能已被回滚或在内部修复。
    - **[Issue #6363]**: `tool_call` 参数被Markdown/XML污染，导致所有工具调用失败。**状态**: 已关闭，有修复PR (#6409)。
    - **[Issue #6407]**: ReAct Agent上下文混入错误消息格式，导致OpenAI兼容API报400错误，影响所有使用该类型Agent的用户。**状态**: 未关闭，尚无关联PR。
    - **[Issue #6307]**: v2.0版本引入的“~2秒固定开销”性能回归，影响所有交互体验。**状态**: 未关闭，PR #6393可能与其相关。
- **高**:
    - **[Issue #6379]**: 官方插件被安全策略拦截无法使用，影响官方插件生态的体验。**状态**: 已关闭。
    - **[Issue #6405]**: 升级2.0后MCP工具无法找到，影响MCP工具链的用户。**状态**: 未关闭，尚无关联PR。
    - **[Issue #6401]**: 定时任务复用用户会话时，会覆盖并丢失历史记录。**状态**: 未关闭。
    - **[Issue #6406]**: Windows PowerShell多行命令被压缩，导致脚本执行失败。**状态**: 未关闭，有相关修复PR (#6412)。
- **中**:
    - **[Issue #6362] & [ #5135]**: MiniMax-M3模型图片识别能力异常（视觉幻觉），该问题自v1.1.11版本至今仍未彻底解决。**状态**: 均为打开状态。
    - **[Issue #6354]**: UI设计缺陷，审批对话框“总是允许”按钮过于突出，存在误操作导致永久授权风险。**状态**: 已关闭。

### **6. 功能请求与路线图信号**

社区提出的新功能需求反映了QwenPaw向“平台化”和“精细化”发展的方向：

- **[Issue #6344] Docker热更新**: 用户要求优化Docker部署的更新流程，避免销毁容器导致的环境丢失。**PR #6387** (按需安装频道依赖)和**PR #6404** (版本更新) 与提升部署和维护体验相关，但未直接解决热更新问题。
- **[Issue #6408] 支持撤销/重新编辑上一轮对话**: 类似ChatGPT的常见功能，能极大提升交互体验。这是一个高频需求，但尚无关联PR，可能不会在近期版本中实现。
- **[Issue #6392] 智能体级别的token统计功能**: 用户期望更精细化的Token用量统计。这属于运维监控类功能，暂无关联PR。
- **[Issue #6316] 允许Agent定时任务指定模型**: 用户希望为不同的定时任务独立分配模型，提升任务配置的灵活性。这是一个被广泛认可的增强点，有可能被纳入后续版本。
- **[Issue #6403] Coding Mode 增加RobotFramework语法高亮**: 针对特定技术栈用户的精细化改进，实施难度低，可能很快被社区贡献者解决。

### **7. 用户反馈摘要**

- **升级阵痛**: v2.0版本的架构变更带来了显著的性能回归(Issue #6307)和工具、断连等兼容性问题(Issue #6363, #6405)，用户普遍反馈升级体验不佳。
- **稳定性不满**: 用户对于导致进程崩溃的Bug (Issue #6376)表达了强烈不满，并质疑项目的测试流程，认为在上线前应进行更严格的压力测试。
- **记忆与工具使用问题**: Agent在**记忆写入** (Issue #3015) 和**工具调用** (Issue #6386, #6405) 方面存在持续的可靠性和逻辑问题，这影响了用户对Agent自主性的信任。
- **特定环境体验差**: **机械硬盘(HDD)用户**在更新时耗时过长(Issue #6380)，**Windows用户**遭遇PATH问题(Issue #6239)和多行命令问题(Issue #6406)，表明项目对不同硬件和操作系统的针对性优化仍需加强。
- **安全/治理便捷性**: 用户对繁琐的安全护栏（Issue #6379）和UI设计不当导致的误操作风险（Issue #6354）提出了批评，期望有一个更平衡的“安全”与“易用”治理方案。

### **8. 待处理积压**

- **[Issue #6239] “Windows backend drops ';' separator when concatenating User+Machine PATH”** (7月18日报告，更新于7月23日)
    - **重要性**: 高。此问题影响所有在Windows上使用npm等工具的用户，是环境配置的基础Bug。尽管已有分析，但维护者尚未回复，也无对应PR。
    - **链接**: [Issue #6239](https://github.com/agentscope-ai/QwenPaw/issues/6239)

- **[Issue #5135] “MiniMax-M3 大模型视觉能力异常”** (6月11日报告，更新于7月23日)
    - **重要性**: 中。作为内置供应商，视觉能力持续不可用会影响用户对QwenPaw作为平台的信赖度和使用体验。该问题长期未关闭，尽管有新的重复Issue #6362，但根源问题仍未解决。
    - **链接**: [Issue #5135](https://github.com/agentscope-ai/QwenPaw/issues/5135)

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

好的，这是为您生成的 **NousResearch/hermes-agent** 项目 2026-07-24 项目动态日报。

---

### NousResearch/hermes-agent | 2026-07-24 项目动态日报

#### 1. 今日速览
过去 24 小时，Hermes Agent 项目维持 **极高活跃度**。共处理 323 条 Issue（235 条新增/活跃，88 条关闭）及 500 条 PR（271 条待处理，229 条已合并/关闭）。值得关注的是，**安全修复**成为今日主旋律，安全研究员 @zapabob 集中提交了 5 个针对 SSRF 和密钥泄露的修复 PR；同时社区对 **Token 开销过大** 的反馈极为尖锐，功能请求 #6839 成为今日讨论焦点。尽管没有新版本发布，但多个 P1 级 Bug 的曝光和大量安全补丁的涌入，显示出项目在爆发式增长中正面临稳定性与技术债的双重压力。

#### 2. 版本发布
- 今日无新版本发布。

#### 3. 项目进展
**今日的核心推进在于安全加固和关键 Bug 修复的高效合并与交付：**

- **核心稳定性修复：**
  - **凭据池错误标记修复** (`#58738`, 已合并)：修复了当某个 Key 触发限流时，错误标记整个凭据池中所有 Key 为不可用的严重逻辑错误，保障了多 Key 轮询的可靠性。
  - **CLI 滚动回溢修复** (`#70306`, 已合并)：修复了非全屏模式下 `kawaii spinner` 和状态栏泄漏到终端回滚区的问题，改善了 CLI 用户交互体验。
- **生态与平台对齐：**
  - **Slack Block Kit 支持** (`#8552`, 已关闭) 已合入主线，改善了 Slack 平台对 Markdown 表格等富文本的支持。
  - **桌面端工作目录切换** (`#42525`, 已关闭) 功能已落地，用户无需再手动修改配置文件即可在 UI 中切换工作空间。
- **关键安全专项（进行中）：**
  - @zapabob 密集提交了多个 SSRF 防护 PR，将 `follow_redirects=True` 的原始请求替换为经过主机白名单和跳转校验的安全 `_guarded_http_get`，涉及 Skills Hub API、ClawHub 下载和 BlueBubbles 附件等边缘路径。

#### 4. 社区热点

- **🔥 [ Token 效率 ] #6839 Lazy Tool Schema Loading**
  - **热度：** 30 条评论，16 👍
  - **诉求：** 用户强烈不满每次 API 调用都强制注入全部工具（50+）的 Schema（消耗 ~3500-5000 tokens）。期望采用“两阶段注射”机制，仅在推理需要时才动态加载特定工具定义，以大幅降低本地模型和 API 调用的开销。
  - **信号：** 已标记为 `needs-decision`，说明团队正在慎重评估这一架构级变动。
  - [查看详情](https://github.com/NousResearch/hermes-agent/issues/6839)

- **⚠️ [ 桌面端危机 ] #59305 跨标签页消息串扰（P1）**
  - **热度：** 9 条评论
  - **影响：** 桌面版多聊天标签页下，消息内容相互污染，Tab A 的内容出现在 Tab B，上下文完全错乱。
  - [查看详情](https://github.com/NousResearch/hermes-agent/issues/59305)

- **💡 [ 连续性愿景 ] #4335 跨平台会话共享**
  - **热度：** 9 条评论
  - **诉求：** 期望在 CLI、Telegram、Discord 等不同平台网关间共享会话上下文，实现“跨平台聊天续接”。
  - [查看详情](https://github.com/NousResearch/hermes-agent/issues/4335)

#### 5. Bug 与稳定性

| 等级 | Issue ID | 问题标题 | 核心影响 | 修复状态 |
|---|---|---|---|---|
| **P1** | #59305 | 桌面多标签页消息泄露 | 核心对话引擎状态污染，上下文混乱 | 尚无修复 PR |
| **P1** | #62708 | 上下文压缩静默阻塞 | 达到 Token 上限前无任何用户警告，服务静默停止 | 尚无修复 PR |
| **P1** | #63047 | 桌面端~5条消息后完全卡死 | macOS 27 Beta 严重UI冻结，Settings 也无法打开 | 尚无修复 PR |
| **P2** | #58437 | MoA `_collect_stream` 丢弃 tool_calls | 静默模式下子Agent/聚合器协作崩溃 | 已关闭 |
| **P2** | #66887 | 多Profile会话存储错乱 | Telegram会话写入错误的主配置目录，存储隔离失效 | 尚无修复 PR |
| **P2** | #67762 | 网关重启后会话费用归零 | 成本追踪彻底失效，影响计费显示 | 尚无修复 PR |
| **Security** | #69449 | API Key 明文存储 | 自定义端点密钥通过 UI 保存后直接明文写入 config.yaml | 尚无修复 PR |

**今日高风险修复洞察：**
- **P0 级修复 (#70083)** 正在紧急审查中，旨在解决 **GPT-5.5** 系模型在 OpenAI 路由上几乎为零的 Prompt 缓存命中率问题，这直接关系到高端用户的 API 账单控制。
- **大规模安全修补：** 多条 SSRF 防护 PR (#70334, #70336, #70341, #70343) 集中出现，暗示项目近期在一次安全审计后，正在进行全面的输入源校验重构。

#### 6. 功能请求与路线图信号
- **核心架构变革：** `#6839`（Lazy Tool Schema）和 `#28279`（Per-Chat Memory Isolation）标志着社区对**精细化资源控制**和**数据隐私**的诉求高涨，这极有可能成为下个中期版本的核心特性。
- **Agent 能力扩展：** `#30640`（Cursor SDK 集成）要求将 Hermes 作为“大脑”对接 Cursor Composer，执行编码类子任务，这代表了 **Agent 与 IDE 深度耦合**的方向。
- **商业化与治理：** `#64179`（Plugin API 版本化和兼容性测试）表明项目正在为跨版本稳定性的公共插件生态打基础。
- **体验增强信号：** 今日提交的 `#70066`（Cron Blueprints GUI）和 `#69687`（Webhooks GUI）明确表明团队正在全力推进**桌面端与 Dashboard 功能的对等**，提升零代码用户的管理体验。

#### 7. 用户反馈摘要
- **主要痛点（负面）：**
  - **Token 焦虑：** 最尖锐的批评集中在工具 Schema 强制注入导致的 Token 浪费，用户戏称为“每句话都在为不用的工具买单”。(#6839)
  - **会话系统不可靠：** 用户普遍反映会话状态是一个“脆弱的黑盒”，消息串扰、成本归零、Profile 混写导致用户对 Agent 的长期记忆和工作流信任度下降（#59305, #67762, #66887）。
  - **桌面端体验不佳：** 桌面端被报告为“Bug 重灾区”，从 UI 冻结到消息双倍渲染，严重影响了作为日常工具的使用信心。
  - **静默失败排查困难：** Hindsight 静默不注册工具、Cron 静默丢弃结果被反复吐槽，用户希望有明确的错误日志和回退机制（#2765, #70294）。

- **积极反馈（正面）：**
  - 开发团队对安全问题（如 SSRF）的高效响应和批量修复获得了社区的公开感谢。
  - 用户对桌面端积极补足 Dashboard 功能（如 Cron、Webhooks）表示认可，认为项目正在走向成熟。

#### 8. 待处理积压
以下为长期未得到明确解决或需要维护者决策的 **高价值** 问题：

- **老旧但重大的功能需求：**
  - **知识库 RAG 系统** (`#844`，P3，创建于03-10)：社区期待已久的本地文档嵌入和检索系统，是实现“工作区概念”的基础。[链接](https://github.com/NousResearch/hermes-agent/issues/844)
  - **跨平台会话共享** (`#4335`，P3，创建于03-31)：已标记 `needs-decision`，但长期悬而未决。[链接](https://github.com/NousResearch/hermes-agent/issues/4335)

- **需决策的 BUG：**
  - **Hindsight 静默失败** (`#2765`，P3，创建于03-24)：缺失环境变量时插件注册零工具且无报错，新手排查极其困难。[链接](https://github.com/NousResearch/hermes-agent/issues/2765)
  - **NixOS 模块路径错误** (`#21341`，P2，创建于05-07)：`documents` 选项安装路径与 `$HERMES_HOME` 不匹配，导致 NixOS 用户配置文件读取失败。[链接](https://github.com/NousResearch/hermes-agent/issues/21341)

- **桌面端紧急风险：** `#59305`（P1, 跨标签页泄露）和 `#63047`（P1，桌面卡死）至今没有关联的修复 PR，属于当前社区最紧迫的稳定性危机，建议维护者优先排期。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-07-24

## 1. 今日速览
过去 24 小时内，AstrBot 社区保持了极高的活跃度：共产生 9 条 Issue（全部为新开或活跃状态，无关闭）和 7 条 Pull Request（6 条仍待合并、1 条已合并关闭）。Bug 报告覆盖核心指令系统、子代理工具管理、WebUI 兼容性及多个平台适配，同时涌现了多项新功能请求。核心维护者迅速响应，针对 #9354（子代理工具不完整）和 #9358（LLM 请求失败后重试崩溃）等重要 Bug 同步提交了修复 PR。项目整体处于密集迭代期，推动者与社区互动紧密。

[[Issues]](https://github.com/AstrBotDevs/AstrBot/issues) [[PRs]](https://github.com/AstrBotDevs/AstrBot/pulls)

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日只有 1 个 PR 被合并关闭，但该 PR 来自核心作者，代表了项目稳定性的重要提升：

- **[#9051] fix: avoid duplicate send_message_to_user replies**（`area:core`，M 尺寸，作者 @Soulter）  
  修复了当 LLM 调用 `send_message_to_user` 工具发送消息后，再由框架执行 RespondStage 时可能产生重复回复的问题。通过记录工具已发送的纯文本并在后续阶段进行精确匹配跳过，有效消除了重复。该 PR 经过近一个月的打磨后合并，提升了消息投递的可靠性。  
  [PR #9051](https://github.com/AstrBotDevs/AstrBot/pull/9051)

此外，多个开放 PR 已对应当日报告的 Bug（详见第五部分），加速了问题修复进程。

## 4. 社区热点
- **[#6615] [Bug] Windows10 前端加载失败**（`area:webui`，评论 6 条）  
  该 Issue 创建于 2026-03-19，近期仍收到用户更新反馈，累计评论最多。问题表现为 v4.20.1 服务在 Windows10 + Chrome 下白屏，严重阻碍新用户部署体验。用户反复尝试环境配置，但尚未有修复 PR 关联，社区期待官方提供定位。  
  [Issue #6615](https://github.com/AstrBotDevs/AstrBot/issues/6615)

- **[#9354] [Bug] 子代理内置工具不完整**（`area:core`，评论 2 条）  
  用户反映“子代理编排”下默认启用的工具集中缺少 Web 搜索等关键工具。该 Issue 引发了社区对子代理功能边界的讨论，并直接推动了 #9357 修复 PR 的提交，成为当日联动最紧密的热点。  
  [Issue #9354](https://github.com/AstrBotDevs/AstrBot/issues/9354)

**背后诉求**：用户对子代理功能抱有较高期待，希望其能复用主代理的大多数内置能力；同时 Windows 前端兼容性瓶颈长期存在，应当被优先解决。

## 5. Bug 与稳定性
以下按严重程度排列当日报告的 Bug（已包含所有标记 `bug` 的 Issue）：

| 严重程度 | Issue | 描述 | 修复状态 |
|----------|-------|------|----------|
| **高** | [#9358](https://github.com/AstrBotDevs/AstrBot/issues/9358) | 上游模型返回异常后点击重试报 `Linked checkpoint not found`，导致回复功能完全不可用 | **已有 PR #9359** |
| **高** | [#6615](https://github.com/AstrBotDevs/AstrBot/issues/6615) | Windows10 前端加载白屏，用户无法使用 WebUI | 无关联 PR |
| **中** | [#9354](https://github.com/AstrBotDevs/AstrBot/issues/9354) | 子代理缺少 Web 搜索等内置工具，功能不符合文档预期 | **已有 PR #9357** |
| **中** | [#9366](https://github.com/AstrBotDevs/AstrBot/issues/9366) | 指令组重命名后子指令仍匹配旧前缀，后端 `parent_command_names` 未同步 | 无 PR |
| **中** | [#9365](https://github.com/AstrBotDevs/AstrBot/issues/9365) | 重命名指令组后 WebUI 中展开子指令的箭头消失（与 #7064 重复） | 无 PR，标记为重复 |
| **中** | [#9360](https://github.com/AstrBotDevs/AstrBot/issues/9360) | 阿里云百炼的 `qwen3-rerank` 请求格式错误导致 400；同时缺少多模态 Embedding 选项 | 无 PR |
| **低** | [#9361](https://github.com/AstrBotDevs/AstrBot/issues/9361) | WebUI 部分页面出现嵌套滚动条，影响视觉体验 | 无 PR |

**亮点**：针对 #9358 和 #9354 这两个中高严重 Bug，社区在数小时内就提出了修复 PR，体现了项目对质量问题的快速响应能力。

## 6. 功能请求与路线图信号
当日共 2 项新功能请求，以及 4 项与功能相关的开放 PR，可能预示下一版本的方向：

- **平台交互增强**  
  - [#9356](https://github.com/AstrBotDevs/AstrBot/issues/9356) [Feature] 希望在消息发送时透传 `message_id`，以使插件能实现消息撤回联动（适应 OneBot 生态常见用例）。  
  - [#9363](https://github.com/AstrBotDevs/AstrBot/issues/9363) [Feature] 为 QQ 平台的 AI 回复添加“正在输入中……”状态。  
  - [#9355](https://github.com/AstrBotDevs/AstrBot/pull/9355) [PR] 支持 QQ 官方（Websockets）按钮交互，为插件提供 `on_qqofficial_interaction()` 装饰器。  
  - [#9362](https://github.com/AstrBotDevs/AstrBot/pull/9362) [PR] 修复 QQ 官方主动消息中的 `@提及` 失效问题。

- **提供商扩展**  
  - [#9364](https://github.com/AstrBotDevs/AstrBot/pull/9364) [PR] 新增 Eden AI 作为内置提供商预设，它是一个 OpenAI 兼容网关，能快速扩展上游模型。

- **子代理能力完善**  
  - 紧随 Bug #9354 提出的 [#9357](https://github.com/AstrBotDevs/AstrBot/pull/9357) 修复了子代理无法使用 Web 搜索工具的缺陷，表明团队正在补齐该特性。

- **稳定性优化**  
  - [#9350](https://github.com/AstrBotDevs/AstrBot/pull/9350) 将 `embedding_storage.py` 中的 faiss 导入改为懒加载，避免特定环境中 CPU 特性检查死锁。

综合来看，**QQ 平台深度交互** 和 **子代理能力扩展** 是当前路线图的两条主线，同时社区对新提供商则持欢迎态度。

## 7. 用户反馈摘要
从 Issue 叙述与评论中提炼的真实痛点：

- **“部署即碰壁”**（#6615）：Windows 用户启动服务后直接面对白屏，无法进入管理界面，严重影响项目采用率。
- **“子代理是个半成品”**（#9354）：配置了“默认使用全部函数工具”，实际却只有部分工具可用，用户感到与文档预期不符，产生挫败感。
- **“改个名字就崩了”**（#9365/#9366）：通过 WebUI 重命名指令组后，要么子指令不认新前缀，要么管理箭头消失，配置失去控制，用户不得不知情地避开该功能。
- **“API 太挑剔”**（#9360）：阿里云百炼用户遇到 Rerank 参数格式问题，即使之前的修复仍不彻底，同时希望使用最新的多模态 Embedding。
- **“崩溃后不让重试”**（#9358）：模型报错后点击重试直接报另一错误，用户被迫中断对话流程，非常影响体验。
- **“希望撤回联动”**（#9356）：OneBot 用户期望机器人能跟随用户撤回而自动撤回相应回复，目前因框架不暴露消息 ID 而无法在插件层面实现。

## 8. 待处理积压
以下为长期未响应或缺少维护者关注的重要项：

- **[#6615] Windows10 前端加载失败**  
  创建于 2026-03-19，至今仍活跃且无修复 PR。该问题影响所有 Windows 用户部署 4.20.x 版本，建议核心开发团队尽快组织定位。若为环境兼容问题，应考虑在文档中添加 Known Issues 或提供修复计划。  
  [Issue #6615](https://github.com/AstrBotDevs/AstrBot/issues/6615)

- **[#7064]（间接提及的重复 Issue）**  
  #9365 指出与 #7064 内容重复，但 #7064 未在本次 9 条列表中，说明它可能已是开放积压。建议维护者统一追踪指令组重命名的多重副作用，将其合并为一个完整修复。  
  [关联 Issue #7064](https://github.com/AstrBotDevs/AstrBot/issues/7064)（请验证后处理）

- **指令组关联 Bug（#9366、#9365）**  
  当前两 Issue 虽已提交但尚无开发人员认领或评论，鉴于重命名功能在 WebUI 管理中频繁使用，建议尽快合并同类问题并安排修复。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*