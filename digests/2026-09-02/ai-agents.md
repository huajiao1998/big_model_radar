# OpenClaw 生态日报 2026-09-02

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-09-01 23:39 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-09-02

## 1. 今日速览

过去24小时OpenClaw项目保持极高活跃度：共产生500条Issue更新（新开/活跃349条，关闭151条）和500条PR更新（待合并365条，合并/关闭135条），并发布v2026.8.2版本。社区讨论集中在**升级迁移故障**（2026.7.x→2026.8.x系列回归）、**资源泄漏与进程管理**（SQLite锁竞争、子进程泄漏、OOM崩溃循环）、**消息投递可靠性**（Telegram/WhatsApp/Feishu多通道问题）三大方向。值得关注的是，今日出现多个P0级崩溃循环报告（#135171、#134453），且多个P1级问题已有关联修复PR在途，项目整体处于"高迭代、高修复、高反馈"的密集开发周期。

---

## 2. 版本发布

### v2026.8.2（2026-09-01发布）

**核心亮点：**
- **Home agent dock 功能**：支持通过 `Cmd/Ctrl+Shift+H` 在屏幕右侧或底部停靠打开 Home agent，保持当前页面可见，可预览/移除工作上下文快照，或将选中文本附加到消息中（关联 #133632，PR #133676）。
- 桌面端体验优化，具体变更内容因数据截断未完全展示。

**迁移注意事项：**
- 今日多个Issue报告了 **2026.7.1-2 → 2026.8.1/2026.8.2 升级路径上的严重回归**，包括：
  - Gateway无法启动（#133984、#134353、#135171）
  - 认证配置迁移后凭据丢失（#134608）
  - Windows平台 `doctor --fix` 异常（#134453）
  - 建议升级前备份 `auth-profiles.json`、`openclaw.json` 及 `state/` 目录，并关注官方迁移文档更新。

---

## 3. 项目进展

今日合并/关闭的PR中，以下工作对项目健康度有显著推进：

| PR | 内容 | 状态 | 影响 |
|---|---|---|---|
| [#130993](https://github.com/openclaw/openclaw/pull/130993) | **Responses会话压缩修复**：修复6个长会话压缩管线缺陷，包括上下文边界丢失、多阶段压缩误判等 | 已关闭 | 提升长会话稳定性 |
| [#128995](https://github.com/openclaw/openclaw/pull/128995) | **聊天头部完整会话操作**：支持从头部菜单直接钉选、标记未读、设置图标、复制会话ID、移动分组 | 已关闭 | Web UI体验增强 |
| [#123535](https://github.com/openclaw/openclaw/pull/123535) | **避免会话目录刷新风暴**：修复窗口聚焦/操作者变化时触发的冗余全量刷新 | 已关闭 | 前端性能优化 |
| [#134826](https://github.com/openclaw/openclaw/pull/134826) | **Telegram最终消息优先于CLI评论**：修复Claude CLI压缩时无可见进度、评论消息排队阻塞最终回复的问题 | 开放，待合并 | 消息投递可靠性修复 |

**整体判断**：项目在会话状态管理、消息投递可靠性、UI/UX三个维度持续修复，同时通过大量性能优化PR（如#135476、#135625、#135607）降低运行时开销。今日合并的PR以"修复+优化"为主，未见重大新功能落地，属于稳健的维护迭代期。

---

## 4. 社区热点

### 最热Issue TOP 3

1. **[#116201 Realtime voice work can retain unbounded provider and consult state](https://github.com/openclaw/openclaw/issues/116201)**（59条评论）
   - 实时语音会话在慢速/突发性provider行为下可无限保留已废弃的consult工作、大型provider帧、预就绪音频等状态。
   - **诉求分析**：用户关注实时语音功能的资源边界与内存安全，属于生产环境稳定性诉求。

2. **[#112423 Large SQLite transcript cleanup blocks the gateway event loop](https://github.com/openclaw/openclaw/issues/112423)**（16条评论）
   - 大型SQLite转录归档在网关线程执行完整物化、压缩、持久化I/O和回读，导致事件循环阻塞。
   - **诉求分析**：核心是"网关线程不应执行重型I/O"的架构性问题，社区期待异步化或线程池化改造。

3. **[#38327 "Cannot convert undefined or null to object" in 2026.3.2 with google-vertex/gemini-3.1-pro-preview](https://github.com/openclaw/openclaw/issues/38327)**（15条评论，3个👍）
   - 2026.3.2版本中Google Vertex/Gemini模型调用回归，任何消息都会触发该错误。
   - **诉求分析**：该Issue已存活近6个月，社区持续关注但修复进展缓慢，反映Google provider兼容性维护存在短板。

### 最热PR TOP 3

1. **[#126473 fix(anthropic): keep context usage for providers that never write cache](https://github.com/openclaw/openclaw/pull/126473)** — 修复Anthropic provider缓存计数读取失败问题。
2. **[#135663 fix(macos): node-host worker and its codex app-server outlive every worker restart](https://github.com/openclaw/openclaw/pull/135663)** — 修复macOS上node-host worker重启后残留孤儿进程问题。
3. **[#135476 perf: reuse sorted ranges while rendering context maps](https://github.com/openclaw/openclaw/pull/135476)** — 上下文地图渲染性能优化。

---

## 5. Bug 与稳定性

### P0 级（崩溃/无法启动）

| Issue | 描述 | 修复状态 |
|---|---|---|
| [#135171](https://github.com/openclaw/openclaw/issues/135171) | 2026.8.1/8.2 Gateway崩溃循环：内置Perplexity插件要求capability consent但无法检查/启用/禁用 | 已关闭（今日） |
| [#134453](https://github.com/openclaw/openclaw/issues/134453) | Windows 2026.8.1 `doctor --fix` 因文件未找到异常中止，交互式doctor可完成 | 开放，无PR |

### P1 级（严重功能受损）

| Issue | 描述 | 修复状态 |
|---|---|---|
| [#133984](https://github.com/openclaw/openclaw/issues/133984) | 2026.7.1-2→2026.8.1升级后Gateway无法启动，`doctor --fix`跳过配置键迁移 | 开放，无PR |
| [#134608](https://github.com/openclaw/openclaw/issues/134608) | 2026.8.1认证迁移归档JSON后写入无凭据的成功回执，永久阻断修复 | 已关闭（今日） |
| [#135347](https://github.com/openclaw/openclaw/issues/135347) | 强制内存重建索引膨胀共享agent DB至35GB，删除恢复会销毁会话 | 开放，关联PR [#135653](https://github.com/openclaw/openclaw/pull/135653)（重置派生索引而不删除会话） |
| [#134353](https://github.com/openclaw/openclaw/issues/134353) | 升级后Xiaomi provider安装负载为空，Gateway拒绝启动 | 开放，无PR |
| [#115424](https://github.com/openclaw/openclaw/issues/115424) | Gateway V8堆OOM，重启恢复将一次崩溃转为7次核心转储循环 | 开放，无PR |
| [#117262](https://github.com/openclaw/openclaw/issues/117262) | SQLite 3个并发写句柄导致~33秒事件循环停顿 | 开放，无PR |

### P2 级（功能缺陷）

- [#125764](https://github.com/openclaw/openclaw/issues/125764) Telegram网络失败外发仅尝试一次即永久死信，无重试无告警
- [#116348](https://github.com/openclaw/openclaw/issues/116348) 提及门控群组中"未生成回复"回退消息无法抑制/限流
- [#68105](https://github.com/openclaw/openclaw/issues/68105) RTL双向文本隔离在网关/外发回复边界缺失

**稳定性趋势判断**：升级迁移类问题（2026.7.x→2026.8.x）是当前最大稳定性风险源，涉及认证、插件、配置迁移多个环节，且 `doctor --fix` 未能有效兜底。建议维护者优先发布补丁版本修复迁移管线。

---

## 6. 功能请求与路线图信号

### 高潜力纳入下一版本的功能

| Issue/PR | 功能 | 信号强度 |
|---|---|---|
| [#135599](https://github.com/openclaw/openclaw/pull/135599) | **插件热管理**：无需重启Gateway即可管理和重载插件 | 强（PR已开放，XL规模，维护者参与） |
| [#135653](https://github.com/openclaw/openclaw/pull/135653) | **内存索引重置**：不删除会话即可重置派生索引和嵌入缓存 | 强（直接响应#135347） |
| [#134898](https://github.com/openclaw/openclaw/pull/134898) | **插件SDK外部验证审批面**：为插件提供外部验证合约的SDK接口 | 中（PR已开放，L规模） |
| [#53763](https://github.com/openclaw/openclaw/issues/53763) | **内置无头浏览器**：不依赖用户Chrome或第三方API的可靠网页访问 | 中（P3，12条评论，社区持续关注） |
| [#13219](https://github.com/openclaw/openclaw/issues/13219) | **按模型用量日志**：原生成本追踪与模型组合优化 | 中（P2，8条评论，有linked PR） |

### 路线图信号

- **性能优化成为主线**：今日多个PR（#135476、#135625、#135607、#135643、#135648）均为性能优化，涉及上下文渲染、可执行头缓冲、finalize-hook消息复制、流式测试夹具等，表明维护者正在系统性地降低运行时开销。
- **插件生态扩展**：插件热管理（#135599）和SDK验证面（#134898）的推进，预示下一版本将强化插件开发体验。

---

## 7. 用户反馈摘要

### 高频痛点

1. **升级迁移痛苦**（多Issue印证）：
   > "Upgrading 2026.7.1-2 → 2026.8.1 left the Gateway unstartable and required roughly a dozen manual repair steps across five independent defects." — [#133984](https://github.com/openclaw/openclaw/issues/133984)

2. **消息静默丢失**：
   > "Transient network failures on Telegram sendMessage result in permanent dead-lettering after exactly one attempt, with no real retry, no user-visible error, and no alert." — [#125764](https://github.com/openclaw/openclaw/issues/125764)

3. **资源泄漏导致长期运行退化**：
   > "OpenClaw appears to leak unreaped child processes from hook/tool execution. Over time these accumulate as zombies under the main openclaw process." — [#97616](https://github.com/openclaw/openclaw/issues/97616)

4. **模型provider兼容性**：
   > "MiniMax Portal OAuth tokens cannot be automatically refreshed, causing 'No credentials found' errors once the access token expires (~2 hours after initial login)." — [#77467](https://github.com/openclaw/openclaw/issues/77467)

### 满意点

- 社区对维护者的响应速度总体认可，多个Issue在1天内获得PR关联（如#135347→#135653）。
- 性能优化PR获得"ready for maintainer look"状态，说明维护者积极跟进社区贡献。

---

## 8. 待处理积压

### 长期未响应的重要Issue

| Issue | 创建时间 | 描述 | 积压时长 |
|---|---|---|---|
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | 2026-03-06 | Google Vertex/Gemini回归："Cannot convert undefined or null to object" | ~6个月 |
| [#10687](https://github.com/openclaw/openclaw/issues/10687) | 2026-02-06 | 完全动态模型发现（OpenRouter+） | ~7个月 |
| [#8724](https://github.com/openclaw/openclaw/issues/8724) | 2026-02-04 | 按模型生成超时配置 | ~7个月 |
| [#9986](https://github.com/openclaw/openclaw/issues/9986) | 2026-02-05 | 上下文超限时触发模型回退 | ~7个月 |
| [#37634](https://github.com/openclaw/openclaw/issues/37634) | 2026-03-06 | workspaceAccess=none时工作区只读问题（8个👍） | ~6个月 |

### 需维护者关注

- **#38327** 作为存活最久的P1回归，社区已多次催促，建议优先处理或明确时间表。
- **#37634** 获得8个👍，是社区呼声较高的sandbox可用性改进，但长期无维护者响应。
- **#10687** 和 **#8724** 均为模型管理相关功能请求，涉及provider生态，建议纳入路线图讨论。

---

*本日报基于OpenClaw GitHub公开数据自动生成，数据截至2026-09-02。所有链接均指向原始GitHub Issue/PR。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告（2026-09-02）

## 1. 生态全景

当前个人 AI 助手与自主智能体开源生态处于**高密度迭代期**，头部项目单日 Issue/PR 更新量可达数百，版本发布频繁，社区反馈与修复形成强闭环。各项目普遍聚焦于**记忆管理、插件化架构、多通道消息可靠性、升级迁移平滑性**四大核心议题，同时安全与沙箱边界、模型 Provider 兼容性成为新焦点。整体呈现“功能快速扩张、稳定性承压、架构持续演进”的态势，尚未出现绝对垄断者，差异化竞争明显。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃349，关闭151） | 500（待合并365，合并/关闭135） | v2026.8.2 | 极高迭代，但升级迁移类 P0/P1 问题集中，稳定性风险高 |
| **Zeroclaw** | 37（活跃33，关闭4） | 50（待合并35，合并/关闭15） | 无 | 架构演进活跃，但出现 P0 数据丢失（#10495）与 S0 安全风险（#8279），需优先处理 |
| **PicoClaw** | 3（全部活跃） | 4（新开3，关闭1） | 无 | 常规迭代，MCP 挂起问题（#3269）长期未解，影响核心体验 |
| **QwenPaw** | 31（新开/活跃17，关闭14） | 33（待合并18，合并/关闭15） | v2.2.0-beta.6 | Beta 回归问题集中（工具结果丢失、上下文丢失），但维护者响应迅速 |
| **hermes-agent** | 453（新开/活跃355，关闭98） | 500（待合并398，合并/关闭102） | 无 | 高吞吐迭代，功能扩张强劲，但 CI 基础设施故障（0-job）需紧急修复 |
| **AstrBot** | 12（新开/活跃12） | 30（合并/关闭13） | v4.28.0-beta.1 | 健康度良好，知识库 Bug 集中但修复及时，WebUI 重构推进中 |

## 3. OpenClaw 在生态中的定位

- **社区规模绝对领先**：单日 500 Issue + 500 PR 的活跃度远超其他项目（hermes-agent 接近但 Issue 略低），评论数 TOP 3 均达 50+，社区参与深度和广度均为生态第一。
- **技术路线**：主打**全功能个人 AI 助手**，覆盖桌面端（Home agent dock）、多通道（Telegram/WhatsApp/Feishu）、插件化（热管理、SDK 验证面）和深度性能优化。相比 Zeroclaw 的 WASM 插件化、QwenPaw 的 ReMe 记忆系统、hermes-agent 的 Bot Mode 无头编排，OpenClaw 更强调“开箱即用的完整助手体验”，但架构复杂度导致升级迁移成本高。
- **优势与短板**：优势在于功能全面、迭代速度快、社区反馈闭环高效（如 #135347 当日关联 PR）；短板在于 2026.7→8 升级迁移故障频发（Gateway 无法启动、认证凭据丢失），`doctor --fix` 兜底不足，稳定性口碑受损。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **升级迁移与兼容性** | OpenClaw、QwenPaw、Zeroclaw、AstrBot | OpenClaw 2026.7→8 迁移回归；QwenPaw 2.2.0 beta 工具结果丢失；Zeroclaw `Config::save()` 覆写配置；AstrBot WebUI 重构导致插件兼容性风险 |
| **记忆与上下文管理** | OpenClaw、Zeroclaw、QwenPaw、hermes-agent、AstrBot | OpenClaw 会话压缩与 SQLite 阻塞；Zeroclaw 记忆生命周期与存储解耦 RFC；QwenPaw ReMe 记忆系统稳定性；hermes-agent Persistent Session Memory；AstrBot 知识库分块/编码/用量统计 |
| **插件化与扩展架构** | OpenClaw、Zeroclaw、hermes-agent、AstrBot | OpenClaw 插件热管理、SDK 验证面；Zeroclaw WASM 插件运行时；hermes-agent AgentRuntime 插件 API；AstrBot 插件更新检测失效 |
| **消息投递可靠性** | OpenClaw、PicoClaw、Zeroclaw、hermes-agent | OpenClaw Telegram/WhatsApp/Feishu 多通道问题；PicoClaw Telegram 回复线程/提及/文件引用修复；Zeroclaw 传输表面适配器 RFC；hermes-agent Bot Mode 群聊路由 |
| **安全与沙箱边界** | Zeroclaw、QwenPaw、hermes-agent、AstrBot | Zeroclaw delegate 绕过 allowlist、沙箱策略 RFC；QwenPaw shell 续行绕过、MCP per-tool 白名单失效；hermes-agent cgroup OOM；AstrBot Agent 工具调用幻觉 |
| **模型 Provider 兼容性** | OpenClaw、Zeroclaw、QwenPaw、hermes-agent、AstrBot | OpenClaw Google Vertex 回归；Zeroclaw 多模型 per provider；QwenPaw 自定义 provider 回归；hermes-agent Claude 订阅 OAuth；AstrBot Gemini 用量统计 |
| **性能与基础设施** | OpenClaw、hermes-agent、Zeroclaw、QwenPaw | OpenClaw 大量性能优化 PR；hermes-agent CI 0-job 故障；Zeroclaw CI 时长优化；QwenPaw 测试覆盖率提升 |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 全功能个人 AI 助手，多通道、桌面端、插件生态 | 普通用户 + 高级自托管者 | 单体应用 + 插件系统，强调开箱即用，迭代速度快但迁移复杂 |
| **Zeroclaw** | 架构清晰、可组合性优先，WASM 插件化、RFC 驱动 | 开发者、架构敏感型用户 | Rust 实现，模块化边界强，通过 RFC 推进重大变更，适合二次开发 |
| **PicoClaw** | 轻量级、边缘计算场景 | IoT/家庭用户、低资源设备 | 极简设计，支持 RISC-V/ARM 等，聚焦 Telegram 等轻量通道 |
| **QwenPaw** | 记忆系统（ReMe）为核心，多 agent 协作 | 中文用户、桌面端重度用户 | 深度集成 ReMe 记忆，强调长期记忆与上下文持久化，beta 迭代中 |
| **hermes-agent** | 高吞吐自动化、Bot Mode 无头编排 | 自动化运维、群聊机器人场景 | 插件 API + 多 profile 隔离，支持 CLI/Telegram/Web 全平台，功能扩张激进 |
| **AstrBot** | 知识库驱动、聊天机器人平台 | 中文聊天机器人开发者 | 知识库模块完善，WebUI 重构中，支持 QQ/微信等国内平台，插件生态活跃 |

## 6. 社区热度与成熟度

- **第一梯队（极高活跃，快速迭代）**：**OpenClaw**、**hermes-agent**。两者单日 Issue/PR 均超 450，功能与修复并行，但稳定性风险高（OpenClaw 迁移故障、hermes-agent CI 故障）。
- **第二梯队（活跃，架构演进/版本收敛）**：**Zeroclaw**、**QwenPaw**。Zeroclaw 处于 RFC 密集修订期，架构方向明确；QwenPaw 处于 2.2.0 beta 收敛期，回归问题集中但响应快。
- **第三梯队（中等/常规迭代）**：**AstrBot**、**PicoClaw**。AstrBot 健康度良好，知识库 Bug 集中但修复及时；PicoClaw 活跃度较低，MCP 挂起问题长期未解，处于质量巩固阶段。

## 7. 值得关注的趋势信号

1. **升级迁移成为最大信任危机**：OpenClaw 的 2026.7→8 迁移故障、QwenPaw 的 beta 回归、Zeroclaw 的配置覆写，均指向“版本升级体验”是当前生态的薄弱环节。工具链（如 `doctor --fix`）的自动化兜底能力亟待加强。
2. **记忆与上下文管理是下一阶段竞争核心**：从 OpenClaw 的会话压缩、QwenPaw 的 ReMe、hermes-agent 的 Persistent Session Memory 到 AstrBot 的知识库，各项目均在记忆的持久化、压缩、检索上投入重兵，差异化将在此领域拉开。
3. **插件化/模块化架构成为主流选择**：WASM 插件（Zeroclaw）、AgentRuntime 插件 API（hermes-agent）、插件热管理（OpenClaw）表明，生态正从单体应用向可组合架构演进，以降低扩展成本和维护复杂度。
4. **消息投递可靠性是用户高频痛点**：Telegram 死信、回复线程错乱、群聊提及误触发等问题在多项目中出现，说明多通道集成不能只做“能发能收”，需在重试、路由、上下文关联上精细化。
5. **安全与沙箱边界从“附加项”变为“生命线”**：Zeroclaw 的 delegate 绕过、QwenPaw 的 shell 续行绕过、AstrBot 的工具调用幻觉，均涉及 agent 自主行动的安全边界。社区对权限隔离、白名单强制、失败降级的要求显著提升。
6. **成本敏感度上升**：hermes-agent 的 Claude 订阅 OAuth 请求获 53 👍，AstrBot 修复 Gemini 用量统计，OpenClaw 用户关注模型用量日志——用户希望降低 API 成本并透明化支出。
7. **性能优化与 CI 基础设施需同步加固**：OpenClaw 大量性能 PR、hermes-agent CI 0-job 故障、Zeroclaw CI 时长优化，表明在功能快速扩张的同时，工程基础设施的可靠性直接影响项目可信度。

---

*本报告基于 2026-09-02 各项目 GitHub 公开数据生成，所有链接均指向原始 Issue/PR。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-02

## 1. 今日速览

过去 24 小时项目活跃度极高：共 37 条 Issue 更新（33 条活跃/新开，4 条关闭）与 50 条 PR 更新（35 条待合并，15 条已合并/关闭），无新版本发布。当前正处于密集的 RFC 修订周期，多个重量级架构提案（#9487、#9488、#6850 等）在 9 月 1 日集中更新，社区讨论热度持续走高。与此同时，新增 1 个 P0 级数据丢失 Bug（#10495，Config::save() 可能覆写用户配置），已获维护者接受，需高度关注。整体来看，项目处于架构演进与稳定性加固并行的活跃阶段。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 项目进展

今日有 2 个 PR 关闭、4 个 Issue 关闭，主要集中在 ZeroCode 体验修复与 CI 基础设施加固：

**ZeroCode 体验修复（已合并/关闭）**

- [PR #10392](https://github.com/zeroclaw-labs/zeroclaw/pull/10392) — fix(zerocode): keep SOP navigation responsive during refresh。将 SOP 列表刷新移出 ZeroCode 的模式切换与重连路径，避免进入 SOP 时阻塞等待后台服务；对跨离开/重入 SOP 的列表请求做过期处理。提升了 SOP 导航的响应性。
- [PR #10466](https://github.com/zeroclaw-labs/zeroclaw/pull/10466) — fix(zerocode): reconcile lost prompt completion。利用现有 `session/prompt` 请求作为生命周期完成栅栏，修复因延迟丢弃的终止通知导致 ZeroCode 面板卡在 `Processing` 状态的问题。

**Bug 修复（Issue 关闭）**

- [Issue #9395](https://github.com/zeroclaw-labs/zeroclaw/issues/9395)（已关闭）— plugin wasi:http egress 无目标策略且无配置开关的安全缺陷，已修复。
- [Issue #10063](https://github.com/zeroclaw-labs/zeroclaw/issues/10063)（已关闭）— Anthropic 兼容网关拒绝工具结果中的 image_url 块，已修复。

**CI 基础设施（Issue 关闭）**

- [Issue #10306](https://github.com/zeroclaw-labs/zeroclaw/issues/10306)（已关闭）— 将 web/ TypeScript 类型检查纳入必需 CI，并让裸 `tsc -b` 输出指向 `cargo web check`，消除 75 条误导性错误。
- [Issue #10040](https://github.com/zeroclaw-labs/zeroclaw/issues/10040)（已关闭）— 恢复 fork PR 上 Lint 作业的超时余量，不降低必需 CI 覆盖率。

**其他值得关注的待合并 PR（推进中）**

- [PR #10220](https://github.com/zeroclaw-labs/zeroclaw/pull/10220) — feat(cron): 为 cron 任务新增确定性 `pre_hook` 前置条件门（命令 + 超时，默认 30s），在任务执行前运行。
- [PR #9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) — feat(providers): 支持单个 provider profile 下配置多个模型，每个模型可独立设置 model id 与调参。
- [PR #9841](https://github.com/zeroclaw-labs/zeroclaw/pull/9841) — fix(sop): 驱动 headless SOP 运行，修复审查 #9494 时发现的五个缺陷。
- [PR #10441](https://github.com/zeroclaw-labs/zeroclaw/pull/10441) — ci(codeql): 将 Rust CodeQL 矩阵任务路由到 Blacksmith 8-vCPU runner，缩短 CI 耗时。

## 4. 社区热点

今日讨论热度集中在架构类 RFC，评论数前五均为 RFC 提案，反映出社区对项目技术方向的高度参与：

| Issue | 标题 | 评论数 | 核心诉求 |
|-------|------|--------|----------|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | RFC: Runtime-owned conversation sessions and transport surface adapters | 31 | 将会话生命周期收归运行时统一管理，通过传输表面适配器解耦各通道实现；Rev 5 为实质性替换版本，需维护者重新开启讨论窗口 |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | RFC: Unified file and attachment architecture for conversation surfaces | 25 | 统一对话界面的文件与附件架构，消除各通道对附件处理的重复实现；Rev 10 为实质性替换版本 |
| [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) | RFC: Decouple memory lifecycle policy from storage backends | 24 | 将记忆生命周期策略（整合、治理）与存储后端解耦，避免每个 gateway/channel 重复实现 |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | RFC: Granular sandbox policy — filesystem and network restrictions | 19 | 统一应用层路径准入与 OS 沙箱后端（Bubblewrap/Landlock/Seatbelt）的策略漂移问题 |
| [#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396) | RFC: Make wire protocol first-class in provider construction and onboarding | 17 | 将 wire protocol 作为 provider 构建与接入的一等公民，规范协议适配层 |

**分析**：社区讨论焦点集中在架构分层与边界划分——会话管理、文件附件、记忆生命周期、沙箱策略、wire protocol 五个方向均指向同一个诉求：随着项目规模增长，需要更清晰的模块边界和可组合的架构基元，避免各通道/工具/后端重复实现横切逻辑。多个 RFC 在 9 月 1 日集中发布修订版，说明维护者正在积极吸收社区反馈并快速迭代。

## 5. Bug 与稳定性

按严重程度排列：

**P0 — 数据丢失风险**

- [Issue #10495](https://github.com/zeroclaw-labs/zeroclaw/issues/10495)（新报告，已接受）— `Config::save()` 可能将操作员已填充的 config.toml（109 KB、25 个 agent）替换为仅 702 字节的近空文件（仅含 schema_version 和一个 channel 配置）。**严重程度 S0（数据丢失）**。暂无 fix PR。

**S0/P1 — 安全风险**

- [Issue #8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279)（已接受）— `delegate` 工具绕过父级工具 allowlist，子 agent 可调用父策略排除的工具。**严重程度 S0（安全风险）**。暂无 fix PR。
- [Issue #9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779)（已接受）— `[sop] sops_dir` 文档声明有默认值，但守护进程在 `sops_dir.is_none()` 时静默禁用整个 SOP 子系统，无错误、无警告、无日志。**严重程度 P1**。暂无 fix PR。
- [Issue #10523](https://github.com/zeroclaw-labs/zeroclaw/issues/10523)（新报告）— 启用 `compact_context` 时，bootstrap 文件（AGENTS.md、SOUL.md、IDENTITY.md、USER.md）在 6000 字符处静默截断，操作员无感知。**严重程度 S2（降级行为）**。暂无 fix PR。

**已修复/关闭**

- [Issue #9395](https://github.com/zeroclaw-labs/zeroclaw/issues/9395)（已关闭）— plugin wasi:http egress 无目标策略且无配置开关，已修复。
- [Issue #10063](https://github.com/zeroclaw-labs/zeroclaw/issues/10063)（已关闭）— Anthropic 兼容网关拒绝工具结果中的 image_url 块，已修复。

**P2/P3 — 低优先级**

- [Issue #9896](https://github.com/zeroclaw-labs/zeroclaw/issues/9896)（已接受）— 状态/启动横幅可能显示 `Memory: none`，而实际生效后端为 sqlite。
- [Issue #7899](https://github.com/zeroclaw-labs/zeroclaw/issues/7899)（已接受）— OpenAI STT provider 忽略基于环境变量的凭据。
- [Issue #5269](https://github.com/zeroclaw-labs/zeroclaw/issues/5269)（已接受）— 需要验证并文档化 `nix run` 安装路径。

## 6. 功能请求与路线图信号

**架构方向信号（RFC 密集区）**

- **WASM 插件化**：多个 RFC 与 tracker 指向同一方向——将可选通道/工具从编译期 feature flag 迁移到运行时 WASM 插件（[#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850)），并构建可组合的 WASM 插件运行时架构（[#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076)）、插件生命周期观察者订阅（[#7822](https://github.com/zeroclaw-labs/zeroclaw/issues/7822)）。结合已合并的 WASM 相关 PR，**WASM 插件化大概率是下一版本的核心方向**。
- **记忆架构分层**：记忆生命周期策略与存储后端解耦（[#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)）、权威记忆存储与可选 enrichment 连接器分离（[#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103)），指向记忆子系统的架构重构。
- **沙箱策略细化**：文件系统与网络限制的细粒度沙箱策略（[#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)），统一应用层与 OS 层策略。
- **会话与传输抽象**：运行时拥有的会话与传输表面适配器（[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)）、统一文件与附件架构（[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)）。

**功能型 PR（可能进入下一版本）**

- [PR #9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) — 多模型 per provider profile，降低多模型接入成本。
- [PR #10220](https://github.com/zeroclaw-labs/zeroclaw/pull/10220) — cron 任务 `pre_hook` 前置条件门，增强定时任务可靠性。
- [PR #9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739) — ZeroCode 多会话面板 + agent 侧边栏，显著提升桌面端多任务体验。
- [PR #10084](https://github.com/zeroclaw-labs/zeroclaw/pull/10084) — WhatsApp passkey 门支持，修复设备链接流程。
- [PR #9338](https://github.com/zeroclaw-labs/zeroclaw/pull/9338) — 新增 Crusoe Managed Inference 作为一等 OpenAI 兼容 provider 家族。

## 7. 用户反馈摘要

- **RFC 讨论参与度高**：#9487（31 评论）、#9488（25 评论）、#6850（24 评论）等 RFC 下社区持续深度讨论，且多个提案已迭代至 Rev 5/Rev 10，说明维护者与社区形成了良好的修订-反馈循环。用户对架构分层、模块边界、可组合性有强烈诉求。
- **配置数据安全担忧**：[#10495](https://github.com/zeroclaw-labs/zeroclaw/issues/10495) 中用户报告 `Config::save()` 可能将 109 KB 的完整配置覆写为 702 字节近空文件，属于 S0 数据丢失级问题，用户对配置写入路径的安全性提出严重质疑。
- **静默失败困扰**：[#9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779) 用户反馈 SOP 子系统在依赖文档默认值时静默不加载，无任何错误提示；[#10523](https://github.com/zeroclaw-labs/zeroclaw/issues/10523) 用户反馈 bootstrap 文件截断不可见。两案共同指向**配置与运行时行为不一致、失败不可观测**的痛点。
- **安全边界诉求**：[#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) 用户报告 delegate 工具绕过父级 allowlist，属于 S0 安全风险，社区对子 agent 权限隔离有明确期待。

## 8. 待处理积压

**等待维护者评审的 RFC（needs-maintainer-review）**

以下 RFC 均处于 `needs-maintainer-review` 状态且长期未获决策，建议维护者优先处理：

- [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) — Runtime-owned conversation sessions（Rev 5，31 评论）
- [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) — Unified file and attachment architecture（Rev 10，25 评论）
- [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) — Decouple memory lifecycle policy（24 评论）
- [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) — Granular sandbox policy（19 评论）
- [#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396) — Wire protocol first-class（17 评论）
- [#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103) — Separate authoritative memory storage（17 评论）
- [#6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909) — Computer-use support for desktop（15 评论）
- [#10050](https://github.com/zeroclaw-labs/zeroclaw/issues/10050) — Verbatim channel send（12 评论）
- [#9330](https://github.com/zeroclaw-labs/zeroclaw/issues/9330) — AI-assisted PR pre-review（11 评论）
- [#7822](https://github.com/zeroclaw-labs/zeroclaw/issues/7822) — WASM plugin lifecycle observer（11 评论）
- [#9975](https://github.com/zeroclaw-labs/zeroclaw/issues/9975) — Web bundle/daemon compatibility（11 评论）
- [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) — Composable WASM plugin runtime（8 评论）
- [#10222](https://github.com/zeroclaw-labs/zeroclaw/issues/10222) — Opt-in single-tool provider rounds（4 评论）
- [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) — PR review evidence and author-action boundaries（4 评论）

**等待作者行动的 PR（needs-author-action）**

- [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) — feat(runtime): expose token accounting on history-trim events（XL 规模）
- [#10084](https://github.com/zeroclaw-labs/zeroclaw/pull/10084) — fix(whatsapp-web): answer WhatsApp's passkey gate
- [#9894](https://github.com/zeroclaw-labs/zeroclaw/pull/9894) — feat(whatsapp-web): implement add_reaction and remove_reaction（stale-candidate）
- [#9871](https://github.com/zeroclaw-labs/zeroclaw/pull/9871) — fix(channels): resolve matrix homeserver by server name（stale-candidate）
- [#9561](https://github.com/zeroclaw-labs/zeroclaw/pull/9561) — fix(personality): remove filename labels（stale-candidate）
- [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) — feat(providers): support multiple models per provider profile（XL 规模）

**长期未响应**

- [#5269](https://github.com/zeroclaw-labs/zeroclaw/issues/5269)（2026-04-04 创建，help wanted / good first issue）— 验证并文档化 `nix run` 安装路径。已标记 accepted 但 5 个月无进展，适合作为新手任务推进。

---

*本日报由 AI 分析师自动生成，数据截至 2026-09-02。所有链接均指向 zeroclaw-labs/zeroclaw 仓库。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-09-02

## 今日速览

过去 24 小时项目活跃度中等偏上：3 条 Issue 更新（全部为活跃状态，无关闭），4 条 PR 更新（3 条新开待审，1 条因 stale 关闭），无新版本发布。今日核心动态集中在 Telegram 集成修复（3 个新 PR 均来自 @hugodeco，针对回复线程、提及识别和文档引用问题）以及一个飞书配置报错的新 Issue。社区讨论热度最高的仍是 MCP 连接失败导致 agent 挂起的旧 Issue（#3269），评论数已达 8 条，说明该问题对用户影响较大且尚未解决。整体来看，项目处于常规迭代节奏，修复方向明确，但稳定性问题仍需关注。

## 版本发布

今日无新版本发布。

## 项目进展

今日无 PR 被合并。唯一关闭的 PR 为 #3299（Add native Exa web search provider），因 stale 自动关闭，未进入合并流程。不过该 PR 实现了 Exa 搜索提供商的完整功能（含 `tools.web` / `web_search` 支持、`d`/`w`/`m`/`y` 时间范围过滤），若后续重新提交，有望为项目增加新的搜索后端选项。

值得关注的是 3 个新提交的修复 PR（均待审查）：

- **#3358 fix(agent): thread responses to the originating question message** — 修复 agent 在群聊中响应非回复消息（如纯 @提及）时不携带 `ReplyToMessageID`，导致回答与问题在聊天中脱节的问题。该修复对群聊场景的可用性有直接提升。
- **#3357 fix(telegram): treat replies to the bot's own messages as implicit mentions** — 修复 `mention_only: true` 模式下，用户直接回复机器人消息但未包含 @提及时被静默忽略的问题。该修复对对话连续性至关重要。
- **#3356 fix(telegram): re-attach quoted documents when replying to a file message** — 修复引用文档消息时，`quotedTelegramMediaRefs()` 仅重新附加语音和音频、忽略文档的问题，确保 agent 能正确接收被引用的文件内容。

这三个 PR 均针对 Telegram 渠道的实际使用痛点，若合并将显著改善群聊和文件交互体验。

## 社区热点

今日最受关注的 Issue 为 **#3269 [BUG] If the MCP server connection fails, the agent loop will hang**（[链接](https://github.com/sipeed/picoclaw/issues/3269)）。该 Issue 创建于 7 月 20 日，今日仍有更新，共 8 条评论、1 个 👍。核心诉求是：当 MCP 服务器连接失败时，agent 循环会挂起，导致 PicoClaw 聊天界面停止回复用户。评论数在同类 Bug 中偏高，说明不少用户在实际使用中遇到了该问题，且目前尚无明确的修复 PR 关联。用户期望的解决方案可能包括连接超时、失败重试或降级策略。

## Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 🔴 高 | [#3269](https://github.com/sipeed/picoclaw/issues/3269) | MCP 服务器连接失败导致 agent 循环挂起，聊天界面完全停止响应 | 已 stale，无关联 fix PR |
| 🟡 中 | [#3355](https://github.com/sipeed/picoclaw/issues/3355) | 飞书渠道配置报错：`config.json contains unknown field(s): channel_list.feishu.app_id`，导致无法连接飞书 | 新开，无评论，无 fix PR |

#3269 影响面较大（任何使用 MCP 的用户都可能触发），且已持续一个多月未解决，建议维护者优先排查。#3355 为新报告，可能是配置格式变更导致的兼容性问题，需要维护者确认配置结构是否已调整。

## 功能请求与路线图信号

- **#3345 Proposal: lightweight PicoClaw worker mode for household edge compute**（[链接](https://github.com/sipeed/picoclaw/issues/3345)）：提议为低资源设备（RISC-V/ARM/MIPS 板、树莓派、旧 Android 手机等）增加轻量级 worker 模式，让多台设备协同工作。该提议贴合边缘计算趋势，且 PicoClaw 本身定位轻量，若实现可能吸引更多 IoT/家庭场景用户。目前评论较少（1 条），但值得纳入路线图评估。
- **#3299 Add native Exa web search provider**（[链接](https://github.com/sipeed/picoclaw/pull/3299)）：虽然该 PR 今日因 stale 关闭，但功能本身完整且与现有 `tools.web` 架构兼容。如果社区仍有需求，维护者可以联系作者重新提交或自行实现。

## 用户反馈摘要

- **MCP 稳定性是核心痛点**：#3269 的 8 条评论反映出用户对 MCP 连接失败导致服务完全不可用的强烈不满。该问题直接影响生产环境可用性，用户期待至少能自动恢复或给出错误提示，而非静默挂起。
- **飞书配置报错影响渠道接入**：#3355 用户按照文档配置 `app_id` 却收到 unknown field 错误，说明配置格式可能与文档不一致，或版本更新后未兼容旧配置。这类问题会降低新用户接入信心。
- **Telegram 交互细节受关注**：3 个新 PR 均来自同一作者，说明社区用户对群聊场景的回复关联性、提及识别和文件引用有明确需求，且愿意主动贡献修复。

## 待处理积压

- **#3269（MCP 连接失败挂起）**：创建于 2026-07-20，已标记 stale，但评论数持续增长（8 条）。该问题严重影响核心功能，建议维护者解除 stale 标记并优先处理，或至少给出临时规避方案。
- **#3345（轻量级 worker 模式提议）**：创建于 2026-08-25，已标记 stale，仅 1 条评论。虽然讨论热度不高，但该提议与项目定位高度契合，建议维护者明确是否纳入路线图，避免社区贡献者失去动力。
- **#3299（Exa 搜索 PR）**：已关闭，但功能完整。若项目计划扩展搜索提供商，建议维护者主动联系作者 @kesku 重新提交，或基于该 PR 继续开发。

---

*本日报基于 GitHub 公开数据自动生成，仅供参考。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-09-02

## 1. 今日速览

过去 24 小时项目活跃度较高：共 31 条 Issue 更新（新开/活跃 17 条，关闭 14 条）、33 条 PR 更新（待合并 18 条，已合并/关闭 15 条），并发布了 v2.2.0-beta.6 新版本。当前开发重点集中在 **ReMe 记忆系统稳定性修复**（启动顺序、打包缺失、embedding 维度归一化）、**MCP 安全与 UI 修复**（per-tool 白名单未生效、暗色模式样式）、以及 **Console 前端体验优化**（滚动锁定、输入框光标、重复文本问题）。值得注意的是，多个用户报告了 2.2.0 beta 系列引入的回归问题（工具结果丢失、上下文丢失、流式输出重复），社区反馈活跃，维护者响应迅速，已有对应 fix PR 合入或处于审查中。

---

## 2. 版本发布

### v2.2.0-beta.6（2026-09-01 发布）

**更新内容（部分）：**
- **fix(desktop): bundle ReMe entry-point plugins**（[#7458](https://github.com/agentscope-ai/QwenPaw/pull/7458)）— 修复桌面端打包时 ReMe 入口插件缺失问题，确保记忆系统核心组件在 Windows 安装包中完整可用。
- **test(console): expand console unit tests**（[#7452](https://github.com/agentscope-ai/QwenPaw/pull/7452)）— 新增 617 个 Console 单元测试用例，语句覆盖率提升 10.61 个百分点，前端质量保障显著增强。

**破坏性变更：** 无明确说明。该版本为 beta 迭代，建议关注 [Release 页面](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.0-beta.6) 获取完整变更日志。

**迁移注意：** 若从 2.1.x 升级至 2.2.0 beta 系列，请留意 [#7420](https://github.com/agentscope-ai/QwenPaw/issues/7420) 中报告的工具结果丢失问题（详见 Bug 部分），建议升级后验证工具调用链路。

---

## 3. 项目进展

今日合入/关闭的 PR 主要围绕 **稳定性修复、安全加固、UI 完善** 三个方向：

| PR | 内容 | 影响 |
|---|---|---|
| [#7468](https://github.com/agentscope-ai/QwenPaw/pull/7468) | **fix(memory): start ReMe before model configuration** | 修复全新安装时无活动模型导致 ReMe 启动失败的问题，记忆服务不再被模型配置阻塞 |
| [#7472](https://github.com/agentscope-ai/QwenPaw/pull/7472) | **fix(governance): prevent shell line-continuation bypasses** | 修复 Tool Guard 安全绕过：POSIX shell 会先移除反斜杠换行再解析，而安全检查基于原始命令，现已对齐解析逻辑 |
| [#7453](https://github.com/agentscope-ai/QwenPaw/pull/7453) | **fix(pack): bundle reme-ai Python core in PyInstaller onedir** | 修复 [#7446](https://github.com/agentscope-ai/QwenPaw/issues/7446) 中 Windows 打包版 "Rebuild Memory Index" 500 错误——`_internal/reme/` 目录此前仅含数据文件、无 Python 代码 |
| [#7439](https://github.com/agentscope-ai/QwenPaw/pull/7439) | **fix: save screenshots in active project directory** | 修复截图预览报错，输出路径改为当前活动项目目录 |
| [#7416](https://github.com/agentscope-ai/QwenPaw/pull/7416) | **feat(console): expose card_auto_layout toggle for DingTalk** | 将 DingTalk 宽屏卡片选项（#2238 已支持）暴露到 Console 界面，补齐 UI 缺口 |
| [#7432](https://github.com/agentscope-ai/QwenPaw/pull/7432) | **fix(config): expand ~ in agent workspace dirs** | 修复 `~` 开头的 workspace 路径未被展开导致统计接口遗漏的问题 |
| [#7466](https://github.com/agentscope-ai/QwenPaw/pull/7466) | **fix(console): link Daily Paper to QwenPaw docs** | 文档链接从上游 ReMe cookbook 改为 QwenPaw 官方 Memory 文档 |

**整体判断：** 项目正稳步推进 2.2.0 的稳定性收敛，尤其针对 ReMe 记忆系统在桌面端打包、初始化顺序、配置持久化等环节的缺陷进行了集中修复。安全治理方面对 shell 解析差异导致的绕过漏洞做了及时修补，体现了对安全问题的重视。

---

## 4. 社区热点

### 最热 Issue：#7420 — 工具结果丢失 + doom-loop 保护误触发（8 评论）
[#7420](https://github.com/agentscope-ai/QwenPaw/issues/7420)

**现象：** 2.2.0-beta.1 上，`write_file` 后工具结果未传回 agent，同一命令被重新派发，触发 doom-loop 保护，单次会话出现 5 次停滞。

**诉求分析：** 这是 2.2.0 beta 系列最严重的回归之一，直接影响核心工具调用链路的可靠性。用户从 2.1.0 升级后首次遇到，说明是 beta 引入的回归。该问题与 [#7467](https://github.com/agentscope-ai/QwenPaw/issues/7467)（loop.rubric 强制确认轮）可能同源，均涉及 2.2.0 的 loop 机制改动。

### 次热 Issue：#7450 — 主 agent 不主动查询子 agent 状态（5 评论）
[#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450)

**现象：** 主 agent + 多子 agent 执行复杂任务时，主 agent 长时间无动作，只有用户主动问"进度如何"才去查询子 agent 状态。

**诉求分析：** 用户对多 agent 协作的**进度透明性**有强烈需求。当前实现中主 agent 缺乏主动汇报机制，导致任务"卡死"假象。这不仅是 bug，更是产品设计层面的体验缺口——建议增加子 agent 状态变更的主动通知或定期汇总。

### 讨论焦点：#7417 — Console 流式输出重复文本（5 评论）
[#7417](https://github.com/agentscope-ai/QwenPaw/issues/7417)

**现象：** 流式输出中途出现大段重复文本，完成后又在末尾追加一份整合副本。

**诉求分析：** 影响 Console 前端可读性，涉及 SSE 事件重放路径。用户对输出准确性的要求是底线，该问题若在长文本生成场景出现，会严重干扰阅读。

### 安全关注：#7443 — 危险指令可轻易规避（4 评论）
[#7443](https://github.com/agentscope-ai/QwenPaw/issues/7443)

**现象：** 用户指出存在让危险指令绕过安全机制的方法，并附上了知乎分析文章链接。

**诉求分析：** 安全对齐是 agent 产品的生命线。该 Issue 虽未提供完整复现步骤，但结合 [#7472](https://github.com/agentscope-ai/QwenPaw/pull/7472) 修复的 shell 续行绕过漏洞，说明安全团队正在积极应对此类问题。

---

## 5. Bug 与稳定性

### 严重（P0/P1）

| Issue | 描述 | 状态 |
|---|---|---|
| [#7420](https://github.com/agentscope-ai/QwenPaw/issues/7420) | **工具结果丢失 + 命令重复派发 + doom-loop 误触发**（2.2.0-beta.1，Windows） | 开放中，无 fix PR，需优先排查 |
| [#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447) | **长上下文时早期记录彻底丢失**，导致任务无法继续（2.2.0-beta.3，约 160 页中文文档场景） | 开放中，严重数据丢失问题 |
| [#7469](https://github.com/agentscope-ai/QwenPaw/issues/7469) | **ReMe 后台 embedding 任务静默失败**：`as_embedding:default accessed before start()`，新记忆无法写入 | 开放中，影响长期记忆核心功能 |
| [#7470](https://github.com/agentscope-ai/QwenPaw/issues/7470) | **MCP per-tool 白名单在 agent 运行时路径未生效**，被移除的工具仍可被调用 | 开放中，安全相关 |

### 中等（P2）

| Issue | 描述 | 状态 |
|---|---|---|
| [#7417](https://github.com/agentscope-ai/QwenPaw/issues/7417) | Console 流式输出大段重复文本，完成后追加整合副本 | 开放中，涉及 SSE 重放路径 |
| [#7464](https://github.com/agentscope-ai/QwenPaw/issues/7464) | DashScope Embedding 索引重建始终提示"未保存"，即使刚保存成功 | 开放中，已有 PR [#7465](https://github.com/agentscope-ai/QwenPaw/pull/7465) 修复 |
| [#7476](https://github.com/agentscope-ai/QwenPaw/issues/7476) | cron 任务在 misfire_grace 窗口内被重复调度，备份脚本执行两次 | 开放中 |
| [#7474](https://github.com/agentscope-ai/QwenPaw/issues/7474) | 合并 PR #7337 后自定义提供商（custom provider）模型无法加载 | 开放中，`max_tokens` 迁移导致配置兼容问题 |
| [#7471](https://github.com/agentscope-ai/QwenPaw/issues/7471) | MCP Clients 页面暗色模式下白色背景容器 | 开放中，已有 PR [#7473](https://github.com/agentscope-ai/QwenPaw/pull/7473) 修复 |

### 已修复/关闭

| Issue | 描述 | 修复 PR |
|---|---|---|
| [#7446](https://github.com/agentscope-ai/QwenPaw/issues/7446) | ReMe 索引重建 500 错误（`ReMe instance is None`） | [#7453](https://github.com/agentscope-ai/QwenPaw/pull/7453) 已合入 |
| [#7379](https://github.com/agentscope-ai/QwenPaw/issues/7379) | 中文长文件名 PDF 处理报错 | 已关闭（2.1.1-beta.3） |
| [#7463](https://github.com/agentscope-ai/QwenPaw/issues/7463) | 内置 llama.cpp 无法加载 Spark-X2.5 GGUF（未知架构 `spark2_5`） | 已关闭 |

---

## 6. 功能请求与路线图信号

### 可能纳入下一版本的功能

| 功能 | 来源 | 判断依据 |
|---|---|---|
| **In-round queued events**：工具执行中到达的用户消息可注入当前轨迹 | [#7461](https://github.com/agentscope-ai/QwenPaw/issues/7461) | 设计合理，与多 agent 协作场景互补，但涉及 loop 机制改动，可能需较长时间 |
| **Auto Fin 记忆源 + ReMe 0.4.1.11 升级** | PR [#7441](https://github.com/agentscope-ai/QwenPaw/pull/7441) | 已在 PR 中实现，合入可能性高 |
| **Pawport 导入流程**：从 Codex/Qoder 等导入配置 | PR [#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) | 功能完整，但已开放 3 周，等待 review |
| **Per-session 模型覆盖** | PR [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) | 已开放近 2 个月，功能实用，但可能因优先级未合入 |
| **Reranker UI 配置面板** | PR [#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399) | 已开放超 1 个月，与 ReMe 记忆系统相关，可能随记忆功能迭代合入 |

### 社区呼声较高的需求

- **所有云端提供商可停用**（[#7455](https://github.com/agentscope-ai/QwenPaw/issues/7455)）：用户希望 Kilo Code、opencode 等内置提供商也能像其他提供商一样被停用，强调用户控制权。
- **侧边栏收起时会话图标固定置顶**（[#7125](https://github.com/agentscope-ai/QwenPaw/issues/7125)）：已关闭，但代表了一类 UI 细节优化需求。
- **原生移动端体验**（PR [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378)）：Expo/React Native 方案，目前标记 DO NOT MERGE，属探索性方向。

---

## 7. 用户反馈摘要

### 真实痛点

1. **多 agent 任务进度不透明**（[#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450)）：用户描述"长时间没有任务动静，我问它进度如何时，他才去查询子 agent 的执行状况"，这种被动式汇报让用户对任务状态缺乏掌控感，尤其在复杂任务中容易产生焦虑。

2. **上下文丢失导致任务中断**（[#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447)）：用户连续 3 天处理 160 页中文文档的 OCR 校对工作，手工压缩上下文后，早期记录仍彻底丢失，任务无法继续。这是对长文档处理场景的严重打击。

3. **中文文件名兼容性**（[#7379](https://github.com/agentscope-ai/QwenPaw/issues/7379)）：PDF 文件名含十几个中文字符即报错 `No connection adapters were found`，对中文用户是高频场景。

4. **安全机制可被绕过**（[#7443](https://github.com/agentscope-ai/QwenPaw/issues/7443)）：用户引用外部安全分析，指出危险指令可规避检测，这直接影响用户对 agent 的信任度。

### 满意/亮点

- 维护者对已报告问题的响应速度较快，如 [#7446](https://github.com/agentscope-ai/QwenPaw/issues/7446) 在 1 天内即有修复 PR 合入。
- 测试覆盖率持续提升（+617 用例，+10.61pp），说明项目在质量保障上持续投入。

---

## 8. 待处理积压

### 长期未合入的 PR（需维护者关注）

| PR | 创建时间 | 已开放 | 说明 |
|---|---|---|---|
| [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) Per-session model overrides | 2026-07-12 | ~7 周 | 功能完整且实用，长期未合入可能因优先级或 review 资源不足 |
| [#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399) Reranker UI 配置面板 | 2026-07-23 | ~6 周 | 与 ReMe 记忆系统相关，建议与记忆功能迭代同步推进 |
| [#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) Pawport 导入流程 | 2026-08-13 | ~3 周 | first-time-contributor，功能完整，需 reviewer 介入 |
| [#7348](https://github.com/agentscope-ai/QwenPaw/pull/7348) v2.2.0 release notes | 2026-08-27 | ~6 天 | 版本发布相关，建议尽快合入 |

### 长期未响应的 Issue

| Issue | 创建时间 | 说明 |
|---|---|---|
| [#7003](https://github.com/agentscope-ai/QwenPaw/issues/7003) ViBo 记忆方案提案 | 2026-08-13 | 已关闭，但提案本身（减少 token 消耗的记忆方案）值得作为路线图参考 |
| [#7125](https://github.com/agentscope-ai/QwenPaw/issues/7125) 侧边栏会话图标置顶 | 2026-08-19 | 已关闭，UI 细节优化需求 |

### 风险提示

- **2.2.0 beta 系列回归问题集中**（[#7420](https://github.com/agentscope-ai/QwenPaw/issues/7420)、[#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447)、[#7469](https://github.com/agentscope-ai/QwenPaw/issues/7469)），建议在 v2.2.0 正式版发布前优先解决工具链路和上下文持久化问题。
- **MCP 安全白名单失效**（[#7470](https://github.com/agentscope-ai/QwenPaw/issues/7470)）涉及安全边界，建议高优先级处理。

---

*本日报由 AI 自动生成，数据截至 2026-09-02。所有链接均指向 GitHub 原始内容，供进一步查阅。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报 — 2026-09-02

## 1. 今日速览

过去 24 小时项目活跃度极高：共 453 条 Issue 更新（新开/活跃 355，关闭 98）与 500 条 PR 更新（待合并 398，合并/关闭 102），无新版本发布。Issue 侧讨论热度集中在 Skills 索引自动化探针持续告警（#66616，137 评论）、Nous 集成流水线阻塞（#88584，52 评论）以及 Persistent Session Memory 长期功能请求（#8457，19 评论）。PR 侧呈现明显的功能扩张态势：AgentRuntime 插件 API（#99474）、Bot Mode 无头编排（#100758）、会话搜索多语言包（#100037–#100039）等新能力密集提交。值得警惕的是 CI 工作流自 24f5a60 起出现 0-job 启动故障（#100752/#100754），已有多份修复 PR 待合并。整体判断：项目处于高吞吐迭代期，功能创新与稳定性修复并行推进，但 CI 基础设施的可靠性需要优先保障。

## 2. 版本发布

过去 24 小时无新版本发布（最新 Releases 为空）。当前项目处于功能密集提交与 CI 修复的窗口期，建议关注后续版本发布计划。

## 3. 项目进展

过去 24 小时共有 102 条 PR 被合并或关闭，以下为值得关注的合并/关闭项及重要在途 PR：

**已合并/关闭：**
- [#100734 [CLOSED] fix(cli): honour --in DIR on the one-shot (-z) launch paths](https://github.com/NousResearch/hermes-agent/pull/100734) — 修复 one-shot 模式绕过 `cmd_chat` 导致 `--in` 工作区约束失效的问题，消除文件/终端工具与提示构建目录不一致的安全隐患。

**重要在途 PR（方向性信号）：**
- [#99474 feat(runtime): add provider-neutral AgentRuntime plugin API](https://github.com/NousResearch/hermes-agent/pull/99474) — 新增与提供商无关的 AgentRuntime v1 插件接口，支持 profile 级运行时注册与兼容性校验，为第三方运行时（如 Codex）提供统一接入层。
- [#100758 feat(bot-mode): add CLI and Telegram profile orchestration](https://github.com/NousResearch/hermes-agent/pull/100758) — 将 Desktop 版 Bot Mode 群聊编排能力带到无头环境（CLI/Telegram），每个 Bot 均为完全隔离的 Hermes profile。
- [#100037/#100038/#100039 feat(session-search): NL expansion fallback + Latin/Slavic language packs](https://github.com/NousResearch/hermes-agent/pull/100037) — 为会话搜索增加可选的自然语言查询扩展回退，并新增 14 种语言数据包（西/斯拉夫语系）。
- [#100755 fix(bot-mode): route only visible Group Chat mentions](https://github.com/NousResearch/hermes-agent/pull/100755) — 修复群聊中 `@developer:` 与 `@developer.` 被解析为不同 handle、以及隐藏 `@everyone` 误唤醒所有 Bot 的问题。
- [#100749 fix(local-runtime): use Vulkan builds on AMD and Intel GPUs](https://github.com/NousResearch/hermes-agent/pull/100749) — AMD/Intel 用户自动选择 Vulkan 版 llama.cpp 运行时，避免静默安装 CPU 版。

**已关闭的 P1 Bug（对应修复已合入 main）：**
- [#93888 Desktop 发送本地运行时 ID 导致远程 Gateway 会话无法恢复](https://github.com/NousResearch/hermes-agent/issues/93888)
- [#51327 Electron chrome-sandbox 缺少 setuid 导致 .desktop 启动器静默失败](https://github.com/NousResearch/hermes-agent/issues/51327)
- [#94248 Gateway 在 delegate 截止时间后 17-72ms 发生 SIGSEGV（macOS arm64）](https://github.com/NousResearch/hermes-agent/issues/94248)
- [#63717 Windows 桌面端更新失败 7 项关联根因诊断](https://github.com/NousResearch/hermes-agent/issues/63717)

## 4. 社区热点

**🔥 最热 Issue：**
- [#66616 [OPEN] Skills index is stale or degraded](https://github.com/NousResearch/hermes-agent/issues/66616) — 137 条评论。自动化新鲜度探针连续告警：Skills Hub 索引已 29.8h 未重建（限制 26h）。该问题由 nousbot-eng 自动上报，涉及 `.github/workflows/skills-index.yml` 定时任务与部署流水线的联动失效，社区围绕索引重建机制与监控阈值展开了大量讨论。
- [#88584 [OPEN] Automated Nous integration is blocked](https://github.com/NousResearch/hermes-agent/issues/88584) — 52 条评论。Nous-to-Enterkey 定时合并因 `cron/jobs.py` 冲突被阻塞，dashboard 更新器停留在最后测试版本。该问题暴露了跨仓库自动合并流程的脆弱性。
- [#25267 [OPEN] Claude Agent SDK model provider with subscription OAuth (Codex-style)](https://github.com/NousResearch/hermes-agent/issues/25267) — 18 条评论，53 👍。用户强烈希望使用 Claude 订阅（Pro/Max）而非 Developer API key 运行 Hermes，避免双重付费。这是目前 👍 数最高的功能请求，反映了订阅制 API 接入的普遍诉求。

**💬 高讨论度功能/设计：**
- [#8457 [OPEN] Persistent Session Memory with Cross-Session Search & Auto-Compression](https://github.com/NousResearch/hermes-agent/issues/8457) — 19 条评论。会话记忆跨重启持久化 + 跨会话搜索 + 自动压缩的三合一功能请求，已开放近 5 个月，社区持续补充设计细节。
- [#77111 [OPEN] RealtimeVoiceProvider ABC — 四个竞争性 duplex-voice PR 需要统一接口](https://github.com/NousResearch/hermes-agent/issues/77111) — 15 条评论。社区自发引用 AGENTS.md 的 Footprint Ladder 规则，呼吁为 4 个并行的实时语音 PR 设计抽象基类而非逐个合并。

## 5. Bug 与稳定性

**🔴 P1 未修复（需优先关注）：**
- [#90837 Recurring state.db corruption under gateway-only writes — 11 incidents](https://github.com/NousResearch/hermes-agent/issues/90837) — 生产网关 18 天内 11 次 state.db 损坏，已达每日一次频率。用户构建了小时级 onset sentinel 冻结现场，已排除所有外部因素，指向 gateway 写入路径的竞态或损坏 bug。**暂无 fix PR。**
- [#97948 Manual /compress reports 120s timeout while background worker succeeds minutes later](https://github.com/NousResearch/hermes-agent/issues/97948) — 大会话压缩时 UI 报 120s 超时但后台实际成功，且会话被静默轮换 ID；同时存在 lease lost / session_split_failed 错误。**暂无 fix PR。**
- [#97963 Hygiene compression turn-hold (10s default) makes auto-compress fail 100% for thinking models](https://github.com/NousResearch/hermes-agent/issues/97963) — #92318 引入的 10 秒 turn-hold 预算导致 thinking 模型长会话自动压缩 100% 失败，属回归问题。**暂无 fix PR。**
- [#54189 state.db unbounded growth: no session lifecycle/cleanup mechanism](https://github.com/NousResearch/hermes-agent/issues/54189) — 单用户 + 150 cron 任务/周，2 周内 state.db 达 659MB，无清理机制。带 `needs-decision` 标签，长期未决。

**🟠 P1 已修复（今日关闭）：**
- [#93888 Desktop 远程 Gateway 会话恢复失败](https://github.com/NousResearch/hermes-agent/issues/93888) — 已关闭。
- [#51327 Linux .desktop 启动器静默失败](https://github.com/NousResearch/hermes-agent/issues/51327) — 已关闭。
- [#94248 Gateway SIGSEGV（macOS arm64）](https://github.com/NousResearch/hermes-agent/issues/94248) — 已关闭。
- [#63717 Windows 更新失败 7 项根因](https://github.com/NousResearch/hermes-agent/issues/63717) — 已关闭。
- [#70716 本地终端执行器共享 cgroup 可致控制面被 OOM kill](https://github.com/NousResearch/hermes-agent/issues/70716) — 已关闭。
- [#65365 OAuth 连接下暴露 memory/session_search 工具 schema 触发 HTTP 400](https://github.com/NousResearch/hermes-agent/issues/65365) — 已关闭。
- [#92145 hermes update 在 ImportError 中止后遗留 stale sys.modules](https://github.com/NousResearch/hermes-agent/issues/92145) — 已关闭。

**🟡 CI 基础设施故障（今日新发现）：**
- [#100752 ci: every ci.yaml run 0-jobbed since 24f5a60ed1](https://github.com/NousResearch/hermes-agent/pull/100752) — `if: ${{ false && (... || ...) }}` 表达式括号未闭合，导致 main 和所有 PR 的 CI 自 22:08 UTC 起全部 0-job 启动失败。已有两份修复 PR（[#100754](https://github.com/NousResearch/hermes-agent/pull/100754)、[#100757](https://github.com/NousResearch/hermes-agent/pull/100757)）待合并。

**🟢 其他已关闭 Bug：**
- [#84220 Desktop Home → new chat 仍绑定上一项目文件面板](https://github.com/NousResearch/hermes-agent/issues/84220)
- [#60323 macOS 本地后端可错过 HERMES_BACKEND_READY 导致超时](https://github.com/NousResearch/hermes-agent/issues/60323)
- [#88168 contributors/emails 下大小写冲突文件致 Windows git status 永久 dirty](https://github.com/NousResearch/hermes-agent/issues/88168)
- [#59877 Termux 上 Python 3.14.6 不满足版本约束导致安装失败](https://github.com/NousResearch/hermes-agent/issues/59877)

## 6. 功能请求与路线图信号

**高潜力进入下一版本：**
- **AgentRuntime 插件 API**（[#99474](https://github.com/NousResearch/hermes-agent/pull/99474)）— 提供商中立的运行时插件化是重要架构演进，与 #77111 的 ABC 诉求一脉相承，可能成为后续多运行时支持的基础。
- **Bot Mode 无头化**（[#100758](https://github.com/NousResearch/hermes-agent/pull/100758) + [#100755](https://github.com/NousResearch/hermes-agent/pull/100755)）— 配合 [#97681](https://github.com/NousResearch/hermes-agent/issues/97681)、[#89995](https://github.com/NousResearch/hermes-agent/issues/89995)、[#95163](https://github.com/NousResearch/hermes-agent/issues/95163) 三个 issue，Bot 群聊从 Desktop-only 走向 CLI/Telegram/Web 全平台覆盖的路线图已清晰。
- **会话搜索多语言支持**（[#100037](https://github.com/NousResearch/hermes-agent/pull/100037)/[#100038](https://github.com/NousResearch/hermes-agent/pull/100038)/[#100039](https://github.com/NousResearch/hermes-agent/pull/100039)）— 为 session-search 增加 NL 扩展回退与 14 种语言包，提升非英语用户体验。
- **Claude 订阅 OAuth**（[#25267](https://github.com/NousResearch/hermes-agent/issues/25267)）— 53 👍 的高需求功能，若实现将显著降低 Claude 用户的使用成本。当前无对应 PR，但 #65365 的修复（OAuth 工具 schema 问题）可能为其扫清障碍。

**长期开放的功能请求（路线图信号）：**
- [#8457 Persistent Session Memory](https://github.com/NousResearch/hermes-agent/issues/8457) — 会话记忆持久化 + 跨会话搜索 + 自动压缩，开放近 5 个月，社区持续关注。
- [#67798 Lifecycle hooks as shared runtime contract](https://github.com/NousResearch/hermes-agent/issues/67798) — 将事件钩子从 gateway-owned 转为 runtime-owned，涉及 CLI/TUI/cron/plugins 等所有执行面。
- [#78642 Shard tools/mcp_tool.py god-file](https://github.com/NousResearch/hermes-agent/issues/78642) — 7230 行 god 文件拆分，符合仓库 2026-08 的 god-file 治理政策。

## 7. 用户反馈摘要

**付费与成本痛点：**
- [#25267](https://github.com/NousResearch/hermes-agent/issues/25267) 用户明确表示"Claude 订阅用户实际上付了两次钱（订阅 + 按 token API）"，希望 Codex 风格的 OAuth 接入。53 👍 表明这是广泛痛点。

**平台覆盖缺失：**
- [#42199](https://github.com/NousResearch/hermes-agent/issues/42199) Intel Mac 用户无法运行 ARM64-only 的 Desktop DMG，Rosetta 2 无法反向翻译。5 👍，开放近 3 个月。

**本地化需求：**
- [#40347](https://github.com/NousResearch/hermes-agent/issues/40347) 与 [#52137](https://github.com/NousResearch/hermes-agent/issues/52137) 俄语本地化请求均已关闭，说明已合入或找到解决方案。社区对 i18n 的需求持续存在（法语 #47811、中文 #39571、葡萄牙语 #40239 等）。

**Windows 体验问题：**
- [#88168](https://github.com/NousResearch/hermes-agent/issues/88168) Windows 用户因文件名大小写冲突导致 `git status` 永久 dirty，影响日常开发。已关闭。
- [#63717](https://github.com/NousResearch/hermes-agent/issues/63717) Windows 更新失败涉及 7 项关联根因，用户提供了详尽的诊断链，已关闭。

**UI/UX 反馈：**
- [#37811](https://github.com/NousResearch/hermes-agent/issues/37811) 聊天视图自动上滚问题获 7 👍，已关闭（标记为 duplicate/implemented-on-main）。
- [#48098](https://github.com/NousResearch/hermes-agent/issues/48098) Desktop 在压缩恢复后仍显示 stale "Summarizing thread" 状态，已关闭。

## 8. 待处理积压

**长期未决的重要 Issue（提醒维护者关注）：**

| Issue | 创建时间 | 评论数 | 标签 | 状态 |
|-------|---------|--------|------|------|
| [#8457 Persistent Session Memory](https://github.com/NousResearch/hermes-agent/issues/8457) | 2026-04-12 | 19 | feature, needs-decision | 近 5 个月无结论 |
| [#54189 state.db unbounded growth](https://github.com/NousResearch/hermes-agent/issues/54189) | 2026-06-28 | 10 | P1, needs-decision | 2 个月未决，DB 膨胀影响生产 |
| [#42199 Intel macOS build](https://github.com/NousResearch/hermes-agent/issues/42199) | 2026-06-08 | 13 | duplicate, feature | 3 个月未响应，5 👍 |
| [#67798 Lifecycle hooks runtime contract](https://github.com/NousResearch/hermes-agent/issues/67798) | 2026-07-20 | 12 | feature, needs-decision | 6 周未决 |
| [#78642 Shard tools/mcp_tool.py](https://github.com/NousResearch/hermes-agent/issues/78642) | 2026-08-04 | 15 | refactor, needs-decision | 4 周未决，7230 行 god-file |

**CI 故障紧急待处理：**
- [#100752 ci.yaml 0-jobbed](https://github.com/NousResearch/hermes-agent/pull/100752) — 所有 CI 自 24f5a60 起失效，已有 [#100754](https://github.com/NousResearch/hermes-agent/pull/100754) 和 [#100757](https://github.com/NousResearch/hermes-agent/pull/100757) 两份修复 PR，需尽快合并以恢复 CI 门禁。

---

*本日报由 AI 分析师自动生成，数据来源：github.com/NousResearch/hermes-agent，统计窗口：2026-09-01 至 2026-09-02。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-09-02

## 今日速览

AstrBot 今日活跃度较高：24 小时内 12 条 Issue 更新、30 条 PR 更新，并发布 v4.28.0-beta.1 预发布版本。知识库（KB）模块成为今日焦点，社区集中报告了 5 个相关 Bug（编码、分块、分页、解析路由、用量统计），且均有对应修复 PR 或明确讨论；同时 WebUI 重构、Agent 工具调用幻觉处理等方向也有实质进展。项目整体处于快速迭代期，社区反馈响应及时，健康度良好。

---

## 版本发布

### v4.28.0-beta.1（2026-09-02）

**主要更新：**
- **WebUI 全面重构**：模型提供商、机器人、人格资料页面重新设计；日志、追踪、会话管理和数据合并至新的 **Data & Logs** 页面
- **移除 Agent Runner**：从模型提供商页面中移除 Agent Runner，并将其配置嵌入其他页面

**迁移注意事项：**
- 本次为 beta 预发布版本，WebUI 页面结构有较大调整，插件若依赖旧的页面路由或配置入口，需验证兼容性
- 建议生产环境用户等待正式版发布后再升级

🔗 [查看 Release](https://github.com/AstrBotDevs/AstrBot/releases)

---

## 项目进展

今日合并/关闭了 13 个 PR，以下为重要变更：

### 🎯 功能新增
- **技能批量删除**（[#9906](https://github.com/AstrBotDevs/AstrBot/pull/9906)）：Dashboard 技能页支持批量删除本地技能，关闭了 #8857 功能请求。插件/沙箱预设提供的只读技能不会被暴露给删除操作
- **自动记录 UMO 名称**（[#9909](https://github.com/AstrBotDevs/AstrBot/pull/9909)）：在 WakingCheckStage 阶段自动持久化群组名称和私聊发送者名称，使用有界缓存保持阶段简洁

### 🐛 修复
- **Gemini 用量统计修正**（[#9880](https://github.com/AstrBotDevs/AstrBot/pull/9880)）：排除 cached tokens 对 input usage 的重复计算
- **Anthropic 缓存写入 token 计入输入用量**（[#9881](https://github.com/AstrBotDevs/AstrBot/pull/9881)）：`cache_creation` tokens 现在正确计入 `input_other`
- **跳过预发布版本的稳定版更新提示**（[#9071](https://github.com/AstrBotDevs/AstrBot/pull/9071)）：修复预发布版本被错误提示更新到较低稳定版的问题
- **WebUI 静态文件 SVG MIME 类型**（[#9735](https://github.com/AstrBotDevs/AstrBot/pull/9735)）：修复 Windows 上 SVG 被识别为非标准 MIME 类型的问题

### 📦 版本管理
- **版本号提升至 4.28.0-beta.1**（[#9911](https://github.com/AstrBotDevs/AstrBot/pull/9911)）：包含双语 changelog

---

## 社区热点

### 1. 知识库模块 Bug 集中爆发（#9901-#9907）
社区用户 @xiaoyuyu6420 和 @xiaoxuan010 在 9 月 1 日集中提交了 5 个知识库相关 Bug，涵盖分块器 overlap 逻辑缺陷、解析器格式白名单不一致、UTF-16 编码不支持、用量统计负值、分页 All 选项异常。这些 Issue 相互关联，反映了知识库功能在真实使用场景下的多个薄弱环节，是今日讨论最密集的话题。

🔗 [#9901](https://github.com/AstrBotDevs/AstrBot/issues/9901) | [#9903](https://github.com/AstrBotDevs/AstrBot/issues/9903) | [#9904](https://github.com/AstrBotDevs/AstrBot/issues/9904) | [#9905](https://github.com/AstrBotDevs/AstrBot/issues/9905) | [#9907](https://github.com/AstrBotDevs/AstrBot/issues/9907)

### 2. Agent 工具调用幻觉问题（#9912）
用户 @FionaFaust 报告了一个严重问题：Agent 达到最大步数强制收尾时，若大模型仍返回工具调用，将静默无回复并持久化悬空 tool_calls 消息，导致后续每轮对话持续报错。该 Issue 发布后数小时内即有对应修复 PR（[#9913](https://github.com/AstrBotDevs/AstrBot/pull/9913)），体现了项目对关键 Bug 的快速响应。

🔗 [Issue #9912](https://github.com/AstrBotDevs/AstrBot/issues/9912) | [PR #9913](https://github.com/AstrBotDevs/AstrBot/pull/9913)

### 3. 插件更新检测失效（#9668）
该 Issue 获得 1 个 👍，描述插件市场数据或更新检查缓存未在常规流程中正确刷新的问题。用户需要手动"重新安装"或"更换插件源"才能触发更新检测，影响插件生态的更新体验。

🔗 [Issue #9668](https://github.com/AstrBotDevs/AstrBot/issues/9668)

---

## Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue | 描述 | 修复状态 |
|---------|-------|------|---------|
| 🔴 高 | [#9912](https://github.com/AstrBotDevs/AstrBot/issues/9912) | Agent 达到 max_step 后模型仍返回工具调用时，静默无回复且持久化悬空 tool_calls 消息，导致后续对话持续报错 | ✅ 已有 PR [#9913](https://github.com/AstrBotDevs/AstrBot/pull/9913) |
| 🟠 中 | [#9901](https://github.com/AstrBotDevs/AstrBot/issues/9901) | RecursiveCharacterChunker 的 overlap 重复计长导致输出块超限，embedding 数量失真 | ❌ 暂无 PR |
| 🟠 中 | [#9903](https://github.com/AstrBotDevs/AstrBot/issues/9903) | select_parser 与 chunker 白名单不一致，mdx/mkd/html/csv/rtf 等格式无路由或路由矛盾 | ❌ 暂无 PR |
| 🟠 中 | [#9907](https://github.com/AstrBotDevs/AstrBot/issues/9907) | 知识库文档列表分页选择「All」时只返回 1 条文档 | ✅ 已有 PR [#9908](https://github.com/AstrBotDevs/AstrBot/pull/9908) |
| 🟡 低 | [#9904](https://github.com/AstrBotDevs/AstrBot/issues/9904) | TextParser 不支持 UTF-16/BOM 编码，Windows 记事本另存的 txt 无法入库 | ❌ 暂无 PR |
| 🟡 低 | [#9905](https://github.com/AstrBotDevs/AstrBot/issues/9905) | OpenAI 兼容 provider 的 cached_tokens > prompt_tokens 时 input_other 为负 | ❌ 暂无 PR |
| 🟡 低 | [#9668](https://github.com/AstrBotDevs/AstrBot/issues/9668) | 插件更新检测失效，需重新安装或更换插件源后才显示更新 | ❌ 已关闭，但未见修复 PR |

---

## 功能请求与路线图信号

### 可能纳入下版本的功能
- **QQ 官方机器人按钮回调事件支持**（[#9891](https://github.com/AstrBotDevs/AstrBot/issues/9891)）：用户希望支持 INTERACTION_CREATE 事件，用于消息卡片交互。目前无对应 PR，但 QQ 官方适配器近期有活跃开发（见 PR #9914）
- **WebChat 会话显示开关**（[#9910](https://github.com/AstrBotDevs/AstrBot/pull/9910)）：PR 已提交，为会话历史页面增加可选的 WebChat 会话显示开关，关联 #9474
- **ChatUI 代码高亮扩展**（[#9892](https://github.com/AstrBotDevs/AstrBot/pull/9892)）：为精简版 Shiki 增加 C、C++、Rust、Go 等常用语言支持，提升开发者体验

### 已实现的功能请求
- **技能批量删除**（[#8857](https://github.com/AstrBotDevs/AstrBot/issues/8857) → [#9906](https://github.com/AstrBotDevs/AstrBot/pull/9906)）：用户提出的批量删除需求已在今日合并的 PR 中实现

### 值得关注的方向
- **图片格式自适应**（[#9703](https://github.com/AstrBotDevs/AstrBot/pull/9703)）：大型 PR，将外发图片自动适配为目标提供商支持的格式，动图转换为 3×3 帧拼盘以节省 token。关联 #9295，目前仍开放中
- **插件导入回滚安全**（[#9900](https://github.com/AstrBotDevs/AstrBot/pull/9900)）：解决插件导入失败后同进程重试导致注册表残留重复对象的问题

---

## 用户反馈摘要

### 真实痛点
1. **知识库分块质量**：用户 @xiaoyuyu6420 指出 overlap 重复计长导致输出块超限，意味着实际 embedding 的文本块可能超出模型上下文限制，影响检索质量
2. **Windows 用户兼容性**：UTF-16 编码的 txt 文件无法入库，影响使用 Windows 记事本编辑文档的用户
3. **插件更新体验**：用户 @shangzhimingge 反馈更新检测失效，需要手动触发才能发现新版本，影响插件生态的更新流畅度
4. **批量操作需求**：用户 @utrlman 表示"当我有几十个技能要删除的时候就很浪费时间"，该需求已在今日 PR 中解决

### 使用场景
- 知识库功能被广泛使用，但解析器对格式的支持不完整（缺少 mdx/mkd/html/csv/rtf），限制了用户导入文档的类型
- QQ 官方机器人用户有消息卡片交互需求，希望支持按钮回调事件

---

## 待处理积压

### 长期未响应的 PR
- **[#8179](https://github.com/AstrBotDevs/AstrBot/pull/8179)（5 月 13 日创建，已开放 112 天）**：Opencode Zen & Go as Provider，大型功能 PR（size:XL），涉及 WebUI 和 Provider 两个核心领域，长期未合并
- **[#9513](https://github.com/AstrBotDevs/AstrBot/pull/9513)（8 月 2 日创建，已开放 31 天）**：修复插件启动阶段 Provider 初始化顺序问题，涉及核心架构调整，需谨慎评估

### 长期未关闭的 Issue
- **[#9407](https://github.com/AstrBotDevs/AstrBot/issues/9407)（7 月 26 日创建）**：插件配置人格选择器提供"清空当前选择"选项，已开放 38 天，评论数 1，属于较小的 UX 改进
- **[#9668](https://github.com/AstrBotDevs/AstrBot/issues/9668)（8 月 13 日创建）**：插件更新检测失效，虽已关闭但未见对应修复 PR，建议确认修复方案是否已合入

### 建议关注
- 知识库模块的 5 个 Bug 中，有 3 个（#9901、#9903、#9904）暂无修复 PR，建议维护者优先分配资源，因为知识库是 AstrBot 的核心功能之一，且这些问题会影响文档导入和检索质量
- PR #9703（图片格式自适应）已开放 18 天且为 XL 规模，涉及 Provider 核心逻辑，建议加快 review 进度以避免长期分叉

---

*本日报由 AI 自动生成，数据截至 2026-09-02。所有链接均指向 GitHub 原始内容。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*