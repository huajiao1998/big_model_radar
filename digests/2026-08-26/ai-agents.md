# OpenClaw 生态日报 2026-08-26

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-25 22:15 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-26

## 1. 今日速览

过去 24 小时项目活跃度极高：共 500 条 Issue 更新（436 条新开/活跃，64 条关闭）与 500 条 PR 更新（319 条待合并，181 条已合并/关闭），无新版本发布。社区讨论重心集中在**消息传递可靠性**（WhatsApp 回填、Telegram 投递卡死、Feishu 流式卡片丢字）、**会话状态管理**（子代理完成投递丢失、compaction 死循环）以及**认证与安全边界**（SecretRef 凭据隔离、设备元数据不一致）。今日维护者（@steipete）密集提交了约 15 个小型修复 PR，覆盖 Matrix、Twitch、Google Chat、macOS 服务管理、heartbeat 等多个模块，显示项目正处于活跃的缺陷修复周期。值得警惕的是，多个 P1 级老 Issue（#50093、#67777、#97616）已持续数月未获修复，积压问题仍需关注。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日有 181 条 PR 被合并/关闭，以下为其中影响面较大的关键 PR：

| PR | 标题 | 状态 | 影响 |
|---|---|---|---|
| [#126424](https://github.com/openclaw/openclaw/pull/126424) | fix(gateway): keep conversation delivery within agent bindings | CLOSED | 修复多 agent 场景下会话工具将消息投递到错误 agent 的问题，涉及 8 个渠道（Discord、iMessage、Matrix、Mattermost、Slack、Telegram、Feishu 等），对多 agent 生产部署有重要稳定性意义 |
| [#120900](https://github.com/openclaw/openclaw/pull/120900) | feat(ui): review install policy warnings | CLOSED | 为 Control UI 增加安装策略警告的审查与确认流程，管理员可显式确认后继续安装，增强插件安装安全性 |
| [#129308](https://github.com/openclaw/openclaw/pull/129308) | fix(cli): honor reaction listing limits | CLOSED | 修复 `openclaw message reactions --limit N` 始终最多返回 50 条的问题 |

此外，今日有 319 条 PR 处于待合并状态，其中多条由维护者 @steipete 提交的小型修复（如 #129650、#129648、#129645、#129644、#129615 等）已进入 "ready for maintainer look" 状态，预计近期将陆续合入。

---

## 4. 社区热点

今日讨论最活跃的 Issue 集中在**消息可靠性**与**进程管理**两大主题：

### 🔥 [#80319](https://github.com/openclaw/openclaw/issues/80319) — QA 工具默认套件混淆 Codex 原生工具与 OpenClaw 动态工具（17 条评论）
- **诉求**：澄清 QA 测试框架中 Codex 原生工具与 OpenClaw 动态工具之间的差异，避免误报工具丢失。
- **分析**：该 Issue 本质是测试基础设施的架构澄清问题，社区关注度高说明开发者对工具兼容性测试的准确性有较高要求。

### 🔥 [#67777](https://github.com/openclaw/openclaw/issues/67777) — 子代理完成投递在超时/排空/孤儿清理时丢失（13 条评论）
- **诉求**：子代理完成后，结果投递回请求会话的链路在多种异常场景下不可靠，导致消息丢失。
- **分析**：这是 P1 级会话状态问题，直接影响多 agent 协作的可靠性。评论数持续增长但无 fix PR，社区耐心正在消耗。

### 🔥 [#50093](https://github.com/openclaw/openclaw/issues/50093) — WhatsApp 重连后错过消息不补发（12 条评论）
- **诉求**：WhatsApp Web 断线重连期间的消息静默丢失，用户希望有回填机制。
- **分析**：该 Issue 自 3 月创建至今已 5 个月，仍处于 needs-maintainer-review 状态，社区多次追问进展。

### 🔥 [#97616](https://github.com/openclaw/openclaw/issues/97616) — 钩子/工具子进程泄漏导致僵尸进程累积（10 条评论）
- **诉求**：`openclaw-hooks`、`bash`、`codex` 等子进程未被正确回收，长期运行后系统性能下降。
- **分析**：这是典型的"慢性病"类 bug，不致命但持续消耗系统资源，社区关注度高说明生产环境用户较多。

---

## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列如下：

### 🔴 P1 级（严重）

| Issue | 问题描述 | Fix PR |
|---|---|---|
| [#128883](https://github.com/openclaw/openclaw/issues/128883) | Codex 动态 `sessions_spawn` 丢失 Gateway resolver，导致父会话 yield 后无法唤醒 | 已关闭（今日） |
| [#126900](https://github.com/openclaw/openclaw/issues/126900) | `maxActiveTranscriptBytes` 在压缩后仍超阈值时无限循环压缩，阻塞会话通道 | 无 |
| [#126906](https://github.com/openclaw/openclaw/issues/126906) | 通过 `tools.deny` 禁用 write 工具会静默禁用记忆持久化，agent 仍报告成功 | [#127031](https://github.com/openclaw/openclaw/pull/127031)（部分修复） |
| [#126246](https://github.com/openclaw/openclaw/issues/126246) | Telegram 持久化外发投递卡在 `send_attempt_started`，重启后消息丢失 | 无 |
| [#127176](https://github.com/openclaw/openclaw/issues/127176) | Windows 上 CLI 与 Node Host 交替上报不同设备元数据，导致认证抖动 | 无 |
| [#127239](https://github.com/openclaw/openclaw/issues/127239) | deepseek-v4-flash 上下文窗口静默回退到 200k 硬编码默认值（实际应为 1M） | 无 |
| [#128067](https://github.com/openclaw/openclaw/issues/128067) | beta.7 现场报告：6 类可靠性缺陷（持久化、投递、重启恢复）+ 3 个次要问题 | 无 |

### 🟠 P2 级（中等）

| Issue | 问题描述 | Fix PR |
|---|---|---|
| [#128657](https://github.com/openclaw/openclaw/issues/128657) | Control UI 加载骨架屏每帧重绘，造成持续 CPU 占用 | 无 |
| [#126631](https://github.com/openclaw/openclaw/issues/126631) | Sandbox skills bind-mount 创建 root 所有的 `/workspace/.openclaw`，锁定 uid 1000 沙箱用户 | 无 |
| [#125570](https://github.com/openclaw/openclaw/issues/125570) | Skill Workshop 更新会覆盖 live skill 的 description，静默破坏技能路由 | 无 |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) | SQLite `memory_index_chunks` 与 `memory_embedding_cache` 无保留策略，磁盘无限增长 | 无 |
| [#56217](https://github.com/openclaw/openclaw/issues/56217) | 1Password 凭据解析失败导致 gateway 崩溃循环，耗尽服务账号速率限制 | 无 |

### 🟡 值得注意的修复 PR（今日提交）

- [#129490](https://github.com/openclaw/openclaw/pull/129490) — 修复渠道插件 resolver 异常导致 SQLite 事务回滚、无关会话被误伤的问题（修复 #121252）
- [#129563](https://github.com/openclaw/openclaw/pull/129563) — 修复 trusted-proxy 重连时伪造 scope-upgrade 请求的问题
- [#129648](https://github.com/openclaw/openclaw/pull/129648) — 修复 heartbeat 广播中失败 agent 被误报为成功的问题
- [#129612](https://github.com/openclaw/openclaw/pull/129612) — 修复 Google Chat 多附件仅投递第一个的问题
- [#129644](https://github.com/openclaw/openclaw/pull/129644) — 修复 Twitch 普通回复静默丢弃附件的问题

---

## 6. 功能请求与路线图信号

今日收集到的功能请求中，以下方向值得关注：

### 高潜力（已有 PR 或维护者关注）

| Issue | 功能需求 | 信号 |
|---|---|---|
| [#71335](https://github.com/openclaw/openclaw/issues/71335) | `sync.watch` 在 gateway 模式下应默认关闭，避免多 agent 场景下文件描述符泄漏（观察到 1,292 个 watcher） | 已有明确修复方案，fix-shape-clear |
| [#44395](https://github.com/openclaw/openclaw/issues/44395) | 记忆搜索增加标题感知分块 + 实体提取，提升语义检索质量 | 社区 👍 2，讨论活跃 |
| [#65438](https://github.com/openclaw/openclaw/issues/65438) | 可配置 bootstrap 文件注入顺序，优化 Anthropic prompt cache | 社区 👍 2，已有技术方案讨论 |

### 中潜力（社区呼声较高但尚无明确排期）

| Issue | 功能需求 | 备注 |
|---|---|---|
| [#9016](https://github.com/openclaw/openclaw/issues/9016) | 向 agent 运行时暴露 OpenRouter 使用成本 | 已开放 6 个月+ |
| [#39343](https://github.com/openclaw/openclaw/issues/39343) | Gateway 层图片批处理/媒体组缓冲 | 解决多图刷屏问题 |
| [#42650](https://github.com/openclaw/openclaw/issues/42650) | 记忆 MVP：增加 review/edit/forget/冲突解决流程 | 长期功能路线图 |
| [#6625](https://github.com/openclaw/openclaw/issues/6625) | 子代理超时前优雅警告，避免工作丢失 | P3，但用户痛点明确 |
| [#9637](https://github.com/openclaw/openclaw/issues/9637) | TUI 增加无障碍配置选项，禁用 emoji/unicode 符号 | 无障碍改进，社区 👍 关注 |

### 路线图信号

今日 PR 中出现了 **Bun 1.4 托管服务支持**（[#129593](https://github.com/openclaw/openclaw/pull/129593)），说明项目正在扩展运行时兼容性。同时，**SecretRef 凭据隔离**系列 PR（#128318、#128336、#128376、#128443）表明安全边界重构是当前重点工程方向。

---

## 7. 用户反馈摘要

### 真实痛点

1. **消息静默丢失是最集中的抱怨**。多个 Issue（#50093、#126246、#77685、#79950）反映了不同渠道（WhatsApp、Telegram、Feishu）在异常场景下消息丢失的问题，且往往没有任何日志提示。用户 @MAG-Linares-Andalucia 在 #126246 中描述："Agent runs complete successfully, but Telegram replies can remain in `send_attempt_started` without any visible outbound platform call or receipt."

2. **配置静默失效问题突出**。用户在 #126906 中反馈："Denying a tool via `tools.deny` can disable memory persistence, and nothing tells anyone — not the operator at startup, not `doctor`, and not the agent, which then reports success for saves that never happened." 这种"静默失败"严重损害用户对系统的信任。

3. **记忆与上下文管理是高频痛点**。#16670 指出 onboarding 向导完全未提及 embedding 配置，导致新用户无法使用记忆功能；#99925 反馈 WebChat 新会话丢失所有历史上下文，AI "失忆"。

### 满意之处

1. **无障碍改进获得好评**。#95601 中用户 @xiaopinpin-music 感谢团队在 v2026.6.9 中将剩余用量信息移到模型选择器附近："Having the selected model and remaining usage in one keyboard-reachable area is a meaningful improvement."

2. **社区对维护者的高频响应表示认可**。今日 @steipete 密集提交的多个小型修复 PR（#129645、#129648、#129650 等）虽然尚未合并，但社区普遍持积极态度。

### 使用场景洞察

- **生产环境多 agent 部署**是重要场景：#96477 描述了 Slack+Telegram 多用户并发下的单写者锁瓶颈；#128067 提供了 6 agent、3 周生产运行的可靠性缺陷报告。
- **本地模型用户**面临独特挑战：#95746 反映 memory dreaming 在 LM Studio 上并行运行多个会话导致上下文耗尽。
- **macOS 用户**遇到外部 APFS 卷上的 gateway 安装失败（#60398），以及 Windows 上的设备元数据不一致（#127176）。

---

## 8. 待处理积压

以下 Issue 长期未获响应或修复，建议维护者优先关注：

### ⚠️ 高优先级积压（P1，超 3 个月未修复）

| Issue | 创建时间 | 问题 | 状态 |
|---|---|---|---|
| [#50093](https://github.com/openclaw/openclaw/issues/50093) | 2026-03-19 | WhatsApp 重连后错过消息不补发 | 5 个月+，needs-maintainer-review |
| [#67777](https://github.com/openclaw/openclaw/issues/67777) | 2026-04-16 | 子代理完成投递在超时/排空/孤儿清理时丢失 | 4 个月+，无 fix PR |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 2026-06-29 | 钩子/工具子进程泄漏导致僵尸进程累积 | 2 个月+，无 fix PR |
| [#56217](https://github.com/openclaw/openclaw/issues/56217) | 2026-03-28 | 1Password 凭据失败导致 gateway 崩溃循环 | 5 个月+，有 linked PR 但未合并 |

### ⚠️ 中优先级积压（P2，超 4 个月未响应）

| Issue | 创建时间 | 问题 | 状态 |
|---|---|---|---|
| [#9016](https://github.com/openclaw/openclaw/issues/9016) | 2026-02-04 | 向 agent 暴露 OpenRouter 使用成本 | 6 个月+，无维护者响应 |
| [#6625](https://github.com/openclaw/openclaw/issues/6625) | 2026-02-01 | 子代理超时前优雅警告 | 6 个月+，无维护者响应 |
| [#9637](https://github.com/openclaw/openclaw/issues/9637) | 2026-02-05 | TUI 无障碍配置选项 | 6 个月+，无维护者响应 |
| [#16670](https://github.com/openclaw/openclaw/issues/16670) | 2026-02-15 | Onboarding 向导应包含 Memory/Embedding 配置 | 6 个月+，无维护者响应 |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) | 2026-07-27 | SQLite 记忆表无保留策略，磁盘无限增长 | 1 个月，dedupe:parent 标记 |

### 📌 今日新增待关注

- [#128067](https://github.com/openclaw/openclaw/issues/128067)（beta.7 现场报告，6 类可靠性缺陷）— 虽然是今日新提交，但内容详实、证据充分，建议维护者尽快安排 triage。
- [#128657](https://github.com/openclaw/openclaw/issues/128657)（Control UI 骨架屏每帧重绘）— 新提交的 UI 性能问题，影响用户体验但优先级标记为 P2。

---

**总结**：OpenClaw 项目今日处于高活跃度状态，维护者修复节奏明显加快，尤其在渠道消息投递、凭据隔离、服务管理等领域。但 P1 级积压问题（特别是消息丢失类）持续时间较长，社区耐心正在消耗。建议维护者在推进新功能的同时，优先处理 #50093、#67777、#97616 三个高热度 P1 Issue，以恢复社区信心。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-08-26 | 数据窗口：过去 24 小时**


## 1. 生态全景

当前个人 AI 助手与自主智能体开源生态正处于**高活跃度的快速迭代期**，六个主要项目单日合计产生约 983 条 Issue 更新与 1,114 条 PR 更新，但项目间分化显著——头部项目（OpenClaw、hermes-agent）日更新量达 500 条级别，而尾部项目（PicoClaw）仅个位数。**消息传递可靠性、会话状态持久化、安全边界隔离**是跨项目涌现的三大共性痛点，其中"消息静默丢失"和"配置静默失效"类问题出现频率最高，正在成为社区信任度的关键杀手。与此同时，架构级重构（记忆存储分离、可插拔 SessionDB、边缘 mesh）与安全加固（凭据隔离、cron 越权修复）并行推进，表明生态正从"功能扩张期"逐步迈入"可靠性巩固期"。


## 2. 各项目活跃度对比

| 项目 | Issues（新开/活跃 / 关闭） | PRs（待合并 / 已合并关闭） | Release | 合并率 | 健康度评估 |
|------|---------------------------|---------------------------|---------|--------|-----------|
| **OpenClaw** | 500（436 / 64） | 500（319 / 181） | 无 | 36.2% | ⚠️ 高活跃，修复节奏快，但 3 个 P1 积压超 2 个月 |
| **hermes-agent** | 386（330 / 56） | 500（426 / 74） | 无 | 14.8% | ⚠️ 功能迭代活跃，更新机制为最薄弱环节，合并吞吐量承压 |
| **Zeroclaw** | 50（39 / 11） | 50（49 / 1） | 无 | 2.0% | 🔴 架构演进期，审查瓶颈严重，2 个 S0 安全 Bug 无 fix |
| **QwenPaw** | 33（19 / 14） | 50（20 / 30） | ✅ v2.1.1-beta.3 | 60.0% | 🟢 迭代紧凑，性能类 Bug 修复进度需关注 |
| **AstrBot** | 10（5 / 5） | 13（3 / 10） | 无 | 76.9% | 🟢 健康，社区协作闭环良好，修复响应快 |
| **PicoClaw** | 4（— / —） | 1（1 / 0） | 无 | 0% | 🔴 合并停滞，2 个阻塞性问题超 36 天无 fix |

> 注：合并率 = 已合并/关闭 PR ÷ 总 PR 更新数。OpenClaw 与 hermes-agent 的 PR 总数受 GitHub 500 条上限截断，实际值可能更高。


## 3. OpenClaw 在生态中的定位

**OpenClaw 是当前生态中体量最大、渠道覆盖最广的生产级多 agent 框架**，其核心参照地位体现在三个维度：

- **社区规模断层领先**：单日 500 条 Issue + 500 条 PR 更新，是 Zeroclaw 的 10 倍、QwenPaw 的 15 倍、AstrBot 的 50 倍。Issue 讨论深度（单 Issue 最高 17 条评论）与维护者响应频率（@steipete 单日 15 个修复 PR）均处于生态顶尖水平。

- **技术路线差异**：与 Zeroclaw（Rust + 安全加固优先）、PicoClaw（嵌入式轻量）、QwenPaw（AgentScope 生态绑定）不同，OpenClaw 的核心技术壁垒在于**跨渠道消息投递的一致性保障**——今日合并的 #126424 一次修复覆盖 8 个渠道（Discord、iMessage、Matrix、Mattermost、Slack、Telegram、Feishu 等）的多 agent 投递错误，这种"渠道广度 × 会话深度"的组合在生态中独一无二。

- **短板同样显著**：P1 级积压问题（#50093 WhatsApp 回填 5 个月、#67777 子代理投递丢失 4 个月、#97616 僵尸进程 2 个月）持续时间长，社区耐心正在消耗。相比之下，AstrBot 的问题平均 2-3 天即获修复，QwenPaw 单日合并 30 条 PR。**OpenClaw 的"大而全"正在面临"修复速度跟不上社区期待"的挑战。**


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|---------|---------|
| **消息传递可靠性** | OpenClaw、PicoClaw、hermes-agent、AstrBot | WhatsApp 重连回填（OpenClaw #50093）、Telegram 投递卡死（#126246）、MCP 连接失败挂起（PicoClaw #3269）、微信 live 回复静默丢失（hermes-agent #94146）、企业微信超时误判（AstrBot #9758）——**"消息静默丢失"是生态头号公敌** |
| **会话状态持久化** | OpenClaw、hermes-agent、QwenPaw、AstrBot | 子代理完成投递丢失（OpenClaw #67777）、SessionDB 可插拔 Provider（hermes-agent #23717，👍8）、MCP session 重启失效（QwenPaw #6524）、长会话上下文污染（AstrBot #9804） |
| **安全边界与隔离** | Zeroclaw、OpenClaw、hermes-agent | cron 工具跨 agent 越权（Zeroclaw #9947，S0）、workspace_dir 解析为 `/`（#9206，S0）、SecretRef 凭据隔离（OpenClaw 系列 PR）、审批超时误判为拒绝（hermes-agent #81048，已修复） |
| **记忆与上下文管理** | OpenClaw、Zeroclaw、QwenPaw、hermes-agent | 记忆存储分离 RFC（Zeroclaw #9103）、标题感知分块 + 实体提取（OpenClaw #44395）、embedding 维度参数修复（QwenPaw #6243）、memory_char_limit 自动扩容（hermes-agent #5320） |
| **更新/安装链路可靠性** | hermes-agent、QwenPaw、OpenClaw | hermes-agent #91277 揭示约 30 个同源 Issue + 15 个 PR 均指向更新机制缺陷；QwenPaw Windows 文件占用（#6810）；OpenClaw macOS 服务管理修复 |
| **性能退化** | QwenPaw、PicoClaw、OpenClaw | SSE 序列化循环致 100% CPU（QwenPaw #7261）、Web UI 长对话卡顿（PicoClaw #3281）、钩子子进程泄漏（OpenClaw #97616） |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|------|---------|---------|-----------------|
| **OpenClaw** | 生产级多 agent 协作、跨渠道消息投递、会话生命周期管理 | 中大型部署、多 agent 生产环境 | 多渠道 Gateway + 会话绑定 + SecretRef 凭据隔离；TypeScript 生态 |
| **Zeroclaw** | 安全加固、架构现代化、边缘 mesh | 安全敏感场景、Rust 技术栈团队 | Rust 实现 + Landlock 沙箱 + wire protocol 一等公民；v0.9.0 含破坏性变更队列 |
| **PicoClaw** | 嵌入式/边缘设备 AI 助手 | 低资源硬件用户（RISC-V/ARM/树莓派） | 轻量级 worker 模式提案（#3345）；面向 10-20MB 内存设备 |
| **QwenPaw** | 技能体系、自我进化、多模态工具 | Qwen/AgentScope 生态用户 | 基于 AgentScope 2.0.7；技能 SOP 与判断规则解耦；MiniMax M3 内置 |
| **hermes-agent** | 自动化运维、Fleet 管理、多机部署 | NousResearch 生态、多机/远程部署用户 | 更新机制为最大短板（"意大利面条式"实现）；Pluggable SessionDB RFC 指向架构重构 |
| **AstrBot** | 多平台聊天机器人、插件生态 | 个人开发者、社区机器人运营者 | 跨平台消息按钮组件（#9809，支持 9 个平台原生回调）；插件市场活跃 |


## 6. 社区热度与成熟度分层

**第一梯队：快速迭代期（日更新 500 条级别）**
- **OpenClaw**：修复节奏密集（单日 181 条 PR 合并），但 P1 积压与高活跃度并存，处于"边修边飞"状态。
- **hermes-agent**：功能迭代活跃（74 条 PR 合并），但 426 条待合并 PR 积压 + 更新机制系统性缺陷，**"增长速度快于质量巩固速度"**。

**第二梯队：稳定推进期（日更新 50 条级别）**
- **QwenPaw**：合并率 60%，单日发布 v2.1.1-beta.3，处于**质量巩固阶段**，但性能类 Bug（内存泄漏、CPU 100%）修复进度需持续关注。
- **Zeroclaw**：架构演进期，RFC 讨论密集但合并率仅 2%，**审查带宽是核心瓶颈**，2 个 S0 安全 Bug 悬而未决。

**第三梯队：维护/低活跃期**
- **AstrBot**：合并率 76.9%，问题平均 2-3 天闭环，**生态健康度最佳**，但体量较小。
- **PicoClaw**：合并停滞（0 合并），2 个阻塞性问题超 36 天无 fix，**社区信任正在消耗**。


## 7. 值得关注的趋势信号

**① "静默失败"成为生态信任头号杀手**
从 OpenClaw 的 WhatsApp 回填、hermes-agent 的微信 live 丢失，到 AstrBot 的上下文污染，用户最集中的抱怨是"系统报告成功但实际未生效"。开发者应把**可观测性**（明确的成功/失败信号、日志留痕）作为与功能并列的一等公民。

**② 更新机制是系统性薄弱环节**
hermes-agent #91277 揭示约 30 个 Issue + 15 个 PR 同源于更新机制缺陷，OpenClaw 也在 macOS 服务管理上连续打补丁。**"更新成功但服务死了"** 是用户最惨痛的体验模式。这提示：安装/更新链路需要架构级重构，而非继续逐个打补丁。

**③ 安全边界从"应用层"下沉到"基础设施层"**
Zeroclaw 的 cron 越权（S0）、OpenClaw 的 SecretRef 凭据隔离系列 PR、hermes-agent 的审批超时误判修复，共同指向一个趋势：**多 agent 场景下的安全隔离正在从"功能选项"变为"默认要求"**。任何涉及跨 agent 共享状态的机制（cron、工具注册表、凭据）都需要默认隔离。

**④ 记忆架构进入"可插拔"时代**
Zeroclaw 的记忆存储分离 RFC（#9103）、hermes-agent 的 Pluggable SessionDB（#23717，👍8）、OpenClaw 的记忆搜索增强（#44395）表明：**SQLite 单文件架构在高频更新/多 agent 场景下已触及天花板**，PostgreSQL/MySQL 等外部存储支持将成为下一阶段竞争力分水岭。

**⑤ 边缘计算与轻量化是潜在增量市场**
Zeroclaw 的家庭边缘 mesh RFC（#10360）与 PicoClaw 的 worker 模式提案（#3345）同日出现，虽然均处于早期讨论阶段，但指向同一判断：**将闲置设备纳入 agent 计算网络**可能是下一波增长点。对于资源受限场景，轻量级运行时（Rust/WASM）正在获得关注（Zeroclaw #8132）。

**⑥ 多 agent 协作可靠性是尚未攻克的难关**
OpenClaw #67777（子代理投递丢失）、QwenPaw #6524（MCP session 失效）、hermes-agent #94736（子代理会话静默死亡）——**子代理/多 agent 场景下的状态传递与恢复**是生态共同的技术瓶颈，目前尚无项目给出完整解决方案。率先突破者有望建立代际优势。

---

*报告基于 2026-08-26 各项目 GitHub 公开数据，由 AI 分析师自动生成。所有链接指向原始 Issue/PR。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-26

## 1. 今日速览

过去24小时项目活跃度极高：共50条 Issue 更新（新开/活跃39条，关闭11条）和50条 PR 更新（待合并49条，合并/关闭1条），但无新版本发布。当前阶段呈现“架构演进与安全加固并行”的特征：多个高优先级 RFC（记忆存储分离、wire protocol 一等公民、边缘 mesh）处于密集讨论中，同时报告了2个 S0 级安全 Bug（cron workspace 解析异常、cron 工具越权）。PR 合并速度偏低（仅1条），大量 PR 处于 `needs-author-action` 或 `needs-maintainer-review` 状态，维护者审查带宽可能是当前瓶颈。

## 2. 版本发布

过去24小时内无新版本发布。

## 3. 项目进展

过去24小时仅1个 PR 被合并/关闭，但多个关联 Issue 的关闭表明以下修复已落地：

- **Voice Wake 转录修复**：[#9663](https://github.com/zeroclaw-labs/zeroclaw/issues/9663) 已关闭，Voice Wake 现在绑定到 agent 配置的转录 provider，而非错误地传递 channel alias 作为 provider key。
- **cron 更新逻辑修复**：[#10257](https://github.com/zeroclaw-labs/zeroclaw/issues/10257) 已关闭，修复了 `cron update --command` 在 agent 任务上写入未使用列的问题。
- **UTF-8 截断审计后续**：[#10271](https://github.com/zeroclaw-labs/zeroclaw/issues/10271) 已关闭，三个 crate 中的 `floor_char_boundary` 本地副本已整合到 std 稳定实现。
- **CI 超时问题修复**：[#10042](https://github.com/zeroclaw-labs/zeroclaw/issues/10042) 已关闭，MSRV 系统依赖安装不再消耗完整 job 超时。
- **可观测性改进**：[#9769](https://github.com/zeroclaw-labs/zeroclaw/issues/9769) 已关闭，`vi_verify` 被扣留的通知在日志持久化禁用时也能触达操作员。
- **ZeroCode 体验修复**：[#10058](https://github.com/zeroclaw-labs/zeroclaw/issues/10058)（文件浏览器搜索导航）和 [#8999](https://github.com/zeroclaw-labs/zeroclaw/issues/8999)（流式用户消息被小模型误解）均已关闭。

整体来看，项目在稳定性修复和开发者体验方面持续推进，但大型功能 PR（如 #10142 ZeroRelay、#9582 插件 egress 策略）仍在审查中，尚未进入合并阶段。

## 4. 社区热点

- **[#6808 RFC: Work Lanes, Board Automation, and Label Cleanup](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)**（24评论）：治理型 RFC 和 rollout tracker，已修订26版，从 0.8.0-beta-1 推进至 0.8.4，状态为 Ratified / rollout in progress。社区持续关注工作流自动化与标签清理的落地进展。
- **[#8692 Maintainer decision queue for RFCs](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)**（14评论）：维护者决策队列 tracker，集中管理需要维护者注意的 RFC、设计问题和发布策略问题。反映社区对决策透明度和效率的诉求。
- **[#9103 RFC: 分离权威记忆存储与可选增强连接器](https://github.com/zeroclaw-labs/zeroclaw/issues/9103)**（14评论）：2026-08-22 维护者接管修订后，社区围绕 `memory.backend` 的架构边界展开讨论，风险等级为 high。
- **[#8396 RFC: 将 wire protocol 作为 provider 构建的一等公民](https://github.com/zeroclaw-labs/zeroclaw/issues/8396)**（12评论）：涉及 provider 接入体验和架构标准化，社区参与度高。
- **[#9965 硬化并行运行时下的可执行测试夹具](https://github.com/zeroclaw-labs/zeroclaw/issues/9965)**（9评论）：cron 调度器测试在并行运行时下失败，引发对测试隔离性的讨论。
- **[#8132 评估 Rust/WASM Web UI 原型](https://github.com/zeroclaw-labs/zeroclaw/issues/8132)**（9评论，👍1）：社区对消除 Node.js 依赖、转向 Rust→Wasm 的 Web UI 方案表现出兴趣。

**诉求分析**：社区热点集中在三方面——① 项目治理与决策效率（#6808、#8692）；② 架构现代化（#9103、#8396、#8132）；③ 测试与运行时稳定性（#9965）。说明社区不仅关注功能开发，更关注项目的长期架构方向和决策透明度。

## 5. Bug 与稳定性

### S0 - 数据丢失 / 安全风险

- **[#9206 agent cron 间歇性将 workspace_dir 解析为 /](https://github.com/zeroclaw-labs/zeroclaw/issues/9206)**：agent 类型 cron 任务间歇性以 `/` 作为 SecurityPolicy.workspace_dir 执行，可能导致越权访问。尚无直接 fix PR，但 [#10362](https://github.com/zeroclaw-labs/zeroclaw/pull/10362) 正在修复相关测试的可移植性。
- **[#9947 cron 工具未按 agent 隔离](https://github.com/zeroclaw-labs/zeroclaw/issues/9947)**：任何持有 cron 工具的 agent 均可读取、触发、修改或删除其他 agent 的 job。尚无 fix PR，需优先处理。

### S1 - 工作流阻塞

- **[#10357 工具执行错误路径丢弃详细错误体](https://github.com/zeroclaw-labs/zeroclaw/issues/10357)**：agent 只能收到 "HTTP 400" 这类裸状态码，无法获得详细错误信息。已有对应 fix PR：[#10364](https://github.com/zeroclaw-labs/zeroclaw/pull/10364)（保留详细工具输出）。

### S2 - 功能降级

- **[#10257 cron update --command 写入未使用列](https://github.com/zeroclaw-labs/zeroclaw/issues/10257)**：已关闭，修复完成。
- **[#8999 ZeroCode 流式用户消息被小模型误解](https://github.com/zeroclaw-labs/zeroclaw/issues/8999)**：已关闭，修复完成。
- **[#10058 ZeroCode 文件浏览器搜索模式忽略导航](https://github.com/zeroclaw-labs/zeroclaw/issues/10058)**：已关闭，修复完成。

### S3 - 轻微问题

- **[#10103 ZeroCode Health 状态值在法语/西班牙语中对不齐](https://github.com/zeroclaw-labs/zeroclaw/issues/10103)**：标签宽度固定为11，但法语 `Disponibilité` 和西班牙语 `Tiempo activo` 为13个终端单元，导致值错位。尚无 fix PR。

### 其他稳定性任务

- **[#9965 硬化运行时写入的可执行测试夹具](https://github.com/zeroclaw-labs/zeroclaw/issues/9965)**：并行运行时门控下的测试隔离问题，进行中。
- **[#10042 MSRV CI 系统依赖安装超时](https://github.com/zeroclaw-labs/zeroclaw/issues/10042)**：已关闭，修复完成。

## 6. 功能请求与路线图信号

### 高热度新功能请求

- **[#10360 RFC: 可选家庭边缘 mesh（pull workers + 签名回执）](https://github.com/zeroclaw-labs/zeroclaw/issues/10360)**：将多台闲置设备组成计算网格，突破单机资源限制。属于重大架构扩展，短期内不太可能进入开发。
- **[#10346 RFC: Gateway 和 channels 共享 MCP-registry-caching 模式](https://github.com/zeroclaw-labs/zeroclaw/issues/10346)**：当前每个 stdio MCP server 在每次启动时被连接3次，造成资源浪费。已有明确优化方向，可能被纳入后续版本。
- **[#10297 结构配置变更后刷新 agent 工具注册表](https://github.com/zeroclaw-labs/zeroclaw/issues/10297)**：启用/禁用内置工具无需重启 daemon。提升运维体验，与 ZeroCode 配置保存功能直接相关。
- **[#9323 定义执行树迭代预算所有权](https://github.com/zeroclaw-labs/zeroclaw/issues/9323)**：已有对应实现 PR [#10351](https://github.com/zeroclaw-labs/zeroclaw/pull/10351)（enforce execution-tree iteration budgets），可能进入下一版本。
- **[#6729 Agent 能力标志：shared/ 访问与 workspace 逃逸](https://github.com/zeroclaw-labs/zeroclaw/issues/6729)**：为 operator 提供 per-agent 能力控制，涉及安全模型完善。
- **[#7543 Gateway Web Chat UI 多会话支持](https://github.com/zeroclaw-labs/zeroclaw/issues/7543)**：会话侧边栏（新建/切换/重命名/删除），提升 Web UI 实用性。
- **[#7461 CI 增加 Windows/macOS 测试矩阵](https://github.com/zeroclaw-labs/zeroclaw/issues/7461)**：已有测量性 PR [#10350](https://github.com/zeroclaw-labs/zeroclaw/pull/10350) 在收集 Windows 测试数据，为后续扩展平台矩阵做准备。
- **[#8132 Rust/WASM Web UI 原型评估](https://github.com/zeroclaw-labs/zeroclaw/issues/8132)**：评估 Dioxus/Leptos/Yew 替代 React/Vite，消除 Node.js 依赖。目前处于评估阶段。

### 路线图信号

v0.9.0 的 auth/security/gateway 破坏性变更队列（[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)）仍在进行中，多个安全相关 PR（#9744 认证 webhook 入口、#10100 Landlock allowed_roots 分层、#10337 git 操作 allowed roots）处于待审查状态，预计 v0.9.0 将包含显著的安全加固。

## 7. 用户反馈摘要

- **错误信息可操作性不足**（[#10357](https://github.com/zeroclaw-labs/zeroclaw/issues/10357)）：用户反馈工具调用失败时 agent 只能看到 "HTTP 400" 这类裸状态码，无法据此调整策略。已有 PR 修复。
- **小模型对话体验问题**（[#8999](https://github.com/zeroclaw-labs/zeroclaw/issues/8999)，已关闭）：用户在使用 Ollama + llama3.2 时，简单的问候语被 ZeroCode 解释为协议/日志数据，而非普通对话。该问题已修复。
- **多语言界面细节**（[#10103](https://github.com/zeroclaw-labs/zeroclaw/issues/10103)）：法语和西班牙语用户发现 Health 面板标签对齐问题，属于本地化质量细节。
- **cron 安全担忧**（[#9947](https://github.com/zeroclaw-labs/zeroclaw/issues/9947)）：多 agent 部署下，用户发现 cron 工具可跨 agent 操作任务，引发对数据隔离的担忧。
- **cron 工作目录异常**（[#9206](https://github.com/zeroclaw-labs/zeroclaw/issues/9206)）：用户报告 agent cron 任务间歇性以 `/` 作为工作目录执行，存在数据丢失风险。

## 8. 待处理积压

### 长期未关闭的重要 Issues

- **[#6808 RFC: Work Lanes, Board Automation, and Label Cleanup](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)**（2026-05-20 创建，24评论）：已 Ratified 但 rollout 仍在进行，需持续跟踪。
- **[#6729 Agent 能力标志](https://github.com/zeroclaw-labs/zeroclaw/issues/6729)**（2026-05-16 创建）：已接受但无对应 PR，安全相关功能建议优先排期。
- **[#7432 v0.9.0 auth/security/gateway 队列](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)**（2026-06-09 创建）：v0.9.0 的协调 tracker，需维护者持续更新。
- **[#7461 CI 平台矩阵扩展](https://github.com/zeroclaw-labs/zeroclaw/issues/7461)**（2026-06-10 创建）：已有测量性 PR，但正式落地仍需决策。
- **[#7543 Gateway Web Chat 多会话](https://github.com/zeroclaw-labs/zeroclaw/issues/7543)**（2026-06-12 创建）：已接受但无对应 PR。
- **[#8132 Rust/WASM Web UI 评估](https://github.com/zeroclaw-labs/zeroclaw/issues/8132)**（2026-06-22 创建）：等待维护者决策。
- **[#8309 移除孤儿 SkillForge 引擎](https://github.com/zeroclaw-labs/zeroclaw/issues/8309)**（2026-06-25 创建）：已接受但未执行，需决定是完成接线还是移除。

### 需维护者关注的 PR

- **[#9582 插件 wasi:http 主机持有 egress 策略](https://github.com/zeroclaw-labs/zeroclaw/pull/9582)**：`blocked` + `do-not-merge`，依赖 ADR-014 决策，需推动决策。
- **[#9935 vi 保留未知约束类型并读取严格模式](https://github.com/zeroclaw-labs/zeroclaw/pull/9935)**：`do-not-merge`，需维护者审查。
- **[#10142 ZeroRelay 安全传输](https://github.com/zeroclaw-labs/zeroclaw/pull/10142)**：`needs-author-action`，XL 规模，需作者响应审查意见。
- **[#9447 Anthropic 不完整终止响应分类](https://github.com/zeroclaw-labs/zeroclaw/pull/9447)**：`needs-author-action`，XL 规模，已等待近一个月。
- **[#9744 网关 webhook 认证入口](https://github.com/zeroclaw-labs/zeroclaw/pull/9744)**：`needs-author-action`，安全相关，建议优先处理。
- **[#9986 agent 导出为可移植 bundle](https://github.com/zeroclaw-labs/zeroclaw/pull/9986)**：`needs-author-action`，XL 规模，功能有价值但需作者更新。

---

**项目健康度评估**：项目处于高活跃度的架构演进期，社区参与积极，安全意识和治理流程完善。但需注意：① PR 合并率偏低（1/50），审查瓶颈可能影响交付节奏；② 2个 S0 级安全 Bug 尚未有 fix PR，建议优先响应；③ 多个大型 PR 长期处于 `needs-author-action` 状态，需推动作者与维护者之间的沟通闭环。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-26

## 1. 今日速览

过去 24 小时项目活跃度中等偏低：共 4 条 Issue 更新、1 条 PR 更新，无新版本发布，无 PR 被合并或关闭。所有更新均为存量 Issue/PR 的讨论延续，没有新的代码合入主干。社区讨论集中在两个核心痛点上：Web UI 在长对话历史下的输入卡顿（#3281），以及 MCP 服务器连接失败导致 agent 循环挂起、聊天界面停止响应（#3269）。此外，Slack 媒体上传修复 PR（#3340）仍处于待合并状态，已标记为 stale，需要维护者关注。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日无 PR 被合并或关闭，代码主干没有新增提交。唯一活跃的 PR 为：

- **[#3340] fix(slack): set FileSize on media upload params**（[链接](https://github.com/sipeed/picoclaw/pull/3340)）— 由 @octavioturra 提交，修复 Slack 媒体上传时 `slack.UploadFileParameters` 未设置 `FileSize` 导致 SDK 拒绝所有上传的问题。该 PR 已存在 9 天且被标记为 stale，尚未获得合并。

整体来看，项目今日处于"讨论活跃、合并停滞"的状态，修复工作有明确方向但推进速度偏慢。

---

## 4. 社区热点

今日讨论最活跃的 Issue 有两条，各有 7 条评论：

- **[#3281] [BUG] Web UI chat input is very laggy when history has a little bit long**（[链接](https://github.com/sipeed/picoclaw/issues/3281)）— 用户反馈 Web UI 在会话历史稍长时输入框严重卡顿。该问题自 7 月 21 日创建以来已持续一个多月，获得 1 个 👍，说明有一定数量的用户受到影响。背后诉求指向前端渲染性能优化，尤其是长列表/长上下文的 DOM 管理策略。

- **[#3269] [BUG] If the MCP server connection fails, the agent loop will hang**（[链接](https://github.com/sipeed/picoclaw/issues/3269)）— MCP 服务器连接失败会导致 agent 循环挂起，聊天界面完全停止回复。该问题同样已存在一个多月，影响的是依赖 MCP 工具调用的用户，属于稳定性关键问题。用户期望的是失败降级或超时重试机制，而非整体阻塞。

两条 Issue 的共同点是：都是用户在实际使用中遇到的阻塞性问题，且长期未得到官方修复确认，社区讨论热度持续累积。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 🔴 严重 | [#3269](https://github.com/sipeed/picoclaw/issues/3269) | MCP 服务器连接失败导致 agent 循环挂起，聊天界面停止回复 | 无 fix PR，已开放 37 天 |
| 🟠 中等 | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI 输入框在长对话历史下严重卡顿 | 无 fix PR，已开放 36 天 |
| 🟡 一般 | [#3338](https://github.com/sipeed/picoclaw/issues/3338) | Slack 媒体上传始终失败（`file size cannot be 0`） | 已有 fix PR [#3340](https://github.com/sipeed/picoclaw/pull/3340)，待合并 |

其中 #3338 的根因已定位清晰（`SendMedia` 未设置 `FileSize` 字段），修复 PR 也已就绪，但尚未合入主干。其余两个问题均无对应的修复 PR，需要维护者介入排查。

---

## 6. 功能请求与路线图信号

今日唯一的新增功能提案为：

- **[#3345] Proposal: lightweight PicoClaw worker mode for household edge compute**（[链接](https://github.com/sipeed/picoclaw/issues/3345)）— 由 @kvnloo 于今日创建，提议为低资源设备（RISC-V/ARM/MIPS 开发板、树莓派、旧 Android 手机、10–20 MB 可用内存的机器）增加轻量级 worker 模式，使这些设备作为分布式 agent 网络的边缘节点，与一台更强的 PC 协同工作。

该提案目前无评论、无 👍，尚处于早期讨论阶段。结合 PicoClaw 本身定位（面向嵌入式/边缘设备的 AI 助手），此提案与项目方向高度契合，有可能被纳入后续版本规划。建议维护者关注并评估其可行性。

---

## 7. 用户反馈摘要

从今日活跃的 Issue 评论中提炼的用户声音：

- **Web UI 性能是真实痛点**（#3281）：用户明确表示"history has a little bit long"时输入框即出现明显延迟，说明当前前端实现缺乏对长上下文的优化，影响日常使用体验。
- **MCP 故障缺乏容错机制**（#3269）：用户报告 MCP 连接失败后整个聊天界面"stop replying"，这种全阻塞行为让用户对稳定性产生疑虑。用户期望的是局部降级而非整体不可用。
- **Slack 集成存在基础功能缺陷**（#3338）：媒体上传完全不可用，且错误信息具有误导性（`file size cannot be 0`），用户难以自行排查。该问题已有明确修复方案，等待合入。

整体来看，用户对 PicoClaw 的功能定位是认可的，但稳定性（MCP 容错）和性能（Web UI 长上下文）是当前最影响满意度的两个短板。

---

## 8. 待处理积压

以下 Issue/PR 长期未获得维护者响应，建议优先关注：

| 项目 | 创建时间 | 搁置天数 | 说明 |
|------|---------|---------|------|
| [#3281](https://github.com/sipeed/picoclaw/issues/3281) | 2026-07-21 | 36 天 | Web UI 输入卡顿，7 条评论，1 👍，已标记 stale |
| [#3269](https://github.com/sipeed/picoclaw/issues/3269) | 2026-07-20 | 37 天 | MCP 连接失败导致 agent 挂起，7 条评论，1 👍 |
| [#3340](https://github.com/sipeed/picoclaw/pull/3340) | 2026-08-17 | 9 天 | Slack 媒体上传修复 PR，已标记 stale，等待 review/merge |
| [#3338](https://github.com/sipeed/picoclaw/issues/3338) | 2026-08-17 | 9 天 | Slack 媒体上传 Bug，已有对应 PR 但未合并 |

其中 #3269 和 #3281 均为 7 月下旬创建、已存在超过一个月的功能性/稳定性问题，且都有社区讨论热度，长期未响应会消耗用户信任。建议维护者优先处理 #3269（严重稳定性问题），并推动 #3340 的 review 与合并，以同时解决 #3338。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-26

## 1. 今日速览

过去 24 小时 QwenPaw 项目活跃度极高：共产生 33 条 Issue 更新（新开/活跃 19 条，关闭 14 条）和 50 条 PR 更新（待合并 20 条，已合并/关闭 30 条），并发布了 v2.1.1-beta.3 新版本。社区反馈集中在性能问题（内存泄漏、CPU 占用、长对话卡顿）和体验优化（webhook、任务提醒、后台任务清理）两大方向。30 条 PR 被合并/关闭，项目迭代节奏紧凑，整体健康度良好，但性能类 Bug 的修复进度值得持续关注。

## 2. 版本发布

**v2.1.1-beta.3** 于今日发布，主要包含以下变更：

- **chore(console):** 将 `@agentscope-ai/chat` 锁定至 1.1.72（PR [#7257](https://github.com/agentscope-ai/QwenPaw/pull/7257)）
- **docs(loop-engineering):** 修正 `PluginAPI` 大小写为 `PluginApi`（PR [#7269](https://github.com/agentscope-ai/QwenPaw/pull/7269)）
- **test(integration):** 扩展集成测试覆盖范围（内容截断，详见 [Release 页面](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.1-beta.3)）

未发现明确的破坏性变更或迁移注意事项。

## 3. 项目进展

今日有 30 条 PR 被合并/关闭，以下为重要变更：

**功能新增/增强：**
- [feat(skills): add self-evolution skill - Self-improving AI agent engine](https://github.com/agentscope-ai/QwenPaw/pull/2773) — 为 CoPaw 增加自我进化技能，支持自动错误捕获、模式检测与根因分析
- [feat: decouple skill SOP and judgement rules](https://github.com/agentscope-ai/QwenPaw/pull/5414) — 将技能 SOP 与判断规则解耦，支持独立编辑规则
- [feat(tools): add read_media tool for image/video/audio processing](https://github.com/agentscope-ai/QwenPaw/pull/1228) — 新增多媒体读取工具，支持本地/远程文件与自动压缩
- [feat(providers): add MiniMax M3 to MiniMax built-in models](https://github.com/agentscope-ai/QwenPaw/pull/4881) — 将 MiniMax-M3 加入内置模型列表并设为默认
- [feat(providers): add default_headers support for custom providers](https://github.com/agentscope-ai/QwenPaw/pull/1552) — 自定义 Provider 支持自定义 HTTP 头

**Bug 修复：**
- [fix(cron): isolate invalid persisted schedules](https://github.com/agentscope-ai/QwenPaw/pull/1525) — 隔离无效的持久化定时任务，避免启动时中断整个应用
- [fix: treat 404 from models.list as successful connection check](https://github.com/agentscope-ai/QwenPaw/pull/2304) — 将 models.list 的 404 响应视为连接成功（兼容 MiniMax 等 Anthropic 兼容 Provider）
- [fix: distinguish offload vs cancel to prevent subprocess kill on deadline](https://github.com/agentscope-ai/QwenPaw/pull/6248) — 区分超时卸载与用户取消，避免超时时误杀子进程
- [fix(embedding): expose use_dimensions toggle for OpenAI-compatible APIs](https://github.com/agentscope-ai/QwenPaw/pull/6243) — 修复 OpenAI 兼容 API 的 embedding 维度参数未生效问题

**依赖与工程：**
- [chore(deps): bumping version of agentscope to 2.0.7](https://github.com/agentscope-ai/QwenPaw/pull/7276) — 升级 AgentScope 至 2.0.7

整体来看，项目在技能体系、Provider 兼容性、稳定性修复三个方向均有实质推进。

## 4. 社区热点

今日讨论最活跃的 Issue 及背后诉求：

- [#338 [Feature] 建议添加 webhook 功能](https://github.com/agentscope-ai/QwenPaw/issues/338)（9 评论，👍 1）— 创建于 3 月的老 Issue 今日仍有讨论。用户希望外部软件能通过 webhook 与 CoPaw 通信，发送消息后返回 key 供轮询结果。这反映了用户对**系统间集成能力**的强烈需求。
- [#7258 [Bug] 微信频道"不显示思考过程"设置无效](https://github.com/agentscope-ai/QwenPaw/issues/7258)（6 评论）— 用户反馈微信频道中关闭"显示思考过程"后仍输出推理内容，属于**设置不生效**的配置类 Bug。
- [#6524 [Bug] MCP 后端重启后客户端无法自动恢复](https://github.com/agentscope-ai/QwenPaw/issues/6524)（6 评论）— 远程 MCP Server 重启后，QwenPaw 仍复用旧 session-id 导致工具查询失败，需手动执行 `list mcp` 才能恢复。这是**MCP 会话生命周期管理**的稳定性问题。
- [#5720 [Bug] QwenPaw v1.1.12.post2 内存泄漏反馈](https://github.com/agentscope-ai/QwenPaw/issues/5720)（5 评论）— 用户详细分析了内存泄漏根因（异步任务泄漏 + HTTP 会话不回收），虽已关闭但讨论热度高，说明**内存问题**是用户关注重点。
- [#6810 Windows 安装/更新时文件占用导致安装失败](https://github.com/agentscope-ai/QwenPaw/issues/6810)（5 评论）— Windows 平台安装/更新时，浏览器扩展 NM host 锁文件导致 NSIS 报错，影响**安装体验**。

## 5. Bug 与稳定性

按严重程度排列今日报告的 Bug：

**严重（影响核心功能/系统资源）：**
- [QwenPaw 2.1.1b2 进入失控 SSE 序列化循环，导致 100% CPU、内存无限增长、服务器无响应](https://github.com/agentscope-ai/QwenPaw/issues/7261) — 已关闭，Agent-to-Agent 运行后触发，需确认修复方案
- [长对话性能降级严重，导致电脑卡顿异常](https://github.com/agentscope-ai/QwenPaw/issues/7285) — 已关闭，网页端长时间会话后浏览器渲染卡顿，任务管理器无高占用
- [QwenPaw v1.1.12.post2 内存泄漏反馈](https://github.com/agentscope-ai/QwenPaw/issues/5720) — 已关闭，异步任务泄漏 + HTTP 会话不回收导致内存持续增长

**中等（影响特定场景/功能）：**
- [微信频道"不显示思考过程"设置无效](https://github.com/agentscope-ai/QwenPaw/issues/7258) — 开放中，无明确 fix PR
- [MCP 后端重启后客户端无法自动恢复](https://github.com/agentscope-ai/QwenPaw/issues/6524) — 开放中，无明确 fix PR
- [peer closed connection without sending complete message body](https://github.com/agentscope-ai/QwenPaw/issues/7218) — 开放中，长文本/推理时连接中断，用户已与模型服务方排查超时设置
- [Desktop (Tauri) 内置 OpenSSL 3.0.x TLS 栈，运营商网络重置握手](https://github.com/agentscope-ai/QwenPaw/issues/7298) — 开放中，建议桌面 CI 升级 Python 3.13
- [OpenAI Responses 多轮对话报 400 "Referenced reasoning item not found"](https://github.com/agentscope-ai/QwenPaw/issues/7296) — 开放中，无状态上游（OpenCode Zen/Go Muse Spark）场景下触发
- [Large MCP Results 可绕过滚动压缩并溢出模型上下文](https://github.com/agentscope-ai/QwenPaw/issues/7288) — 开放中，企业数据分析场景下 MCP 返回大数据量时上下文溢出
- [Windows 安装/更新在覆盖文件前未终止占用进程](https://github.com/agentscope-ai/QwenPaw/issues/6810) — 开放中，浏览器扩展 NM host 锁文件导致安装报错

**轻微（UI/体验问题）：**
- [Console Markdown 列表渲染间距过大](https://github.com/agentscope-ai/QwenPaw/issues/7282) — 开放中
- [subAgent 任务找错文件夹路径](https://github.com/agentscope-ai/QwenPaw/issues/7266) — 开放中
- [qwenpaw-creator Windows 11 拉取示例项目报错](https://github.com/agentscope-ai/QwenPaw/issues/7291) — 开放中
- [Console 长会话 + 流式输出时浏览器渲染掉帧](https://github.com/agentscope-ai/QwenPaw/issues/7129) — 已关闭，已用 WPR 内核追踪定位到渲染主线程阻塞

## 6. 功能请求与路线图信号

今日用户提出的新功能需求：

- [#338 建议添加 webhook 功能](https://github.com/agentscope-ai/QwenPaw/issues/338) — 老 Issue 持续活跃，外部系统集成需求强烈
- [#7182 Add workspace-scoped Skill preload policy](https://github.com/agentscope-ai/QwenPaw/issues/7182) — 工作区级 Skill 预加载策略，减少首轮工具调用
- [#7013 为 Chat 增加统一工具面板、Web 服务预览与交互式终端](https://github.com/agentscope-ai/QwenPaw/issues/7013) — 已关闭，完整的 Agent 开发协作闭环提案
- [#7196 推理过程默认折叠设置](https://github.com/agentscope-ai/QwenPaw/issues/7196) — 已关闭，用户希望默认折叠推理过程减少视觉干扰
- [#7263 任务完成后底栏活动标签显示橙色](https://github.com/agentscope-ai/QwenPaw/issues/7263) — 已关闭，任务完成提醒的小功能
- [#7280 执行完成的后台任务自动清除](https://github.com/agentscope-ai/QwenPaw/issues/7280) — 开放中，希望增加设置项
- [#7279 模型返回多个选项时弹窗点选而非输入](https://github.com/agentscope-ai/QwenPaw/issues/7279) — 已关闭，UX 改进建议
- [#7287 零侵入"皮肤网关"主题定制方案](https://github.com/agentscope-ai/QwenPaw/issues/7287) — 开放中，AI agent 撰写的详细提案

**路线图信号：** 今日合并的 [PR #7163 (feat: refine session thinking and model management)](https://github.com/agentscope-ai/QwenPaw/pull/7163) 增加了 Session 级思考模式（Off/Low/Medium/High），与 #7196 的诉求方向一致，可能部分满足用户对推理过程控制的需求。webhook 功能（#338）虽无对应 PR，但评论热度高，值得维护者评估。

## 7. 用户反馈摘要

从今日 Issue 评论中提炼的真实用户声音：

- **集成需求迫切：** "可以通过我的软件发信息给 copaw，copaw 回答后调用我接口"（#338）— 用户希望 QwenPaw 能嵌入自有系统
- **设置项信任度下降：** "微信频道，'显示思考过程'未启用，但实际还是输出了思考过程"（#7258）— 设置不生效导致用户对配置项失去信任
- **MCP 稳定性困扰：** "服务端原有的 MCP session 会失效。此后 QwenPaw 仍然复用旧的 mcp-session-id"（#6524）— 远程 MCP 场景下的连接恢复是实际痛点
- **性能问题影响工作：** "电脑开始出现严重的卡顿，表现为鼠标 2s 刷新 1 帧"（#7285）— 长对话性能问题已严重影响正常使用
- **安装体验不佳：** "NSIS 连续弹出不止 4 个「无法打开要写入的文件」错误"（#6810）— Windows 安装/更新流程需要更健壮的文件占用处理
- **超时机制不透明：** "我问了 qwenpaw，没有这样的设置啊？有吗？"（#7218）— 用户对工具超时设置的存在性存疑，文档/设置项需要更清晰
- **路径语义困惑：** "以 A 路径文件夹为项目文件夹，进行 subAgent 任务时，去 B 路径文件夹找资料"（#7266）— subAgent 的路径继承逻辑与用户预期不符

## 8. 待处理积压

以下为长期未响应或需维护者关注的重要 Issue/PR：

**长期开放 Issue：**
- [#338 [Feature] 建议添加 webhook 功能](https://github.com/agentscope-ai/QwenPaw/issues/338) — 创建于 2026-03-02，已近 6 个月，社区持续关注
- [#6524 [Bug] MCP 后端重启后客户端无法自动恢复](https://github.com/agentscope-ai/QwenPaw/issues/6524) — 创建于 2026-07-28，近 1 个月无 fix PR
- [#6810 Windows 安装/更新文件占用问题](https://github.com/agentscope-ai/QwenPaw/issues/6810) — 创建于 2026-08-07，影响 Windows 用户安装体验

**长期未合并 PR（按创建时间排序）：**
- [#1228 feat(tools): add read_media tool](https://github.com/agentscope-ai/QwenPaw/pull/1228) — 2026-03-11 创建，已 5 个月
- [#1525 fix(cron): isolate invalid persisted schedules](https://github.com/agentscope-ai/QwenPaw/pull/1525) — 2026-03-15 创建，已 5 个月
- [#1552 feat(providers): add default_headers support](https://github.com/agentscope-ai/QwenPaw/pull/1552) — 2026-03-16 创建，已 5 个月
- [#2304 fix: treat 404 from models.list as successful connection check](https://github.com/agentscope-ai/QwenPaw/pull/2304) — 2026-03-25 创建，已 5 个月
- [#2773 feat(skills): add self-evolution skill](https://github.com/agentscope-ai/QwenPaw/pull/2773) — 2026-04-01 创建，已近 5 个月
- [#4881 feat(providers): add MiniMax M3](https://github.com/agentscope-ai/QwenPaw/pull/4881) — 2026-06-01 创建，已近 3 个月
- [#5414 feat: decouple skill SOP and judgement rules](https://github.com/agentscope-ai/QwenPaw/pull/5414) — 2026-06-23 创建，已 2 个月
- [#6248 fix: distinguish offload vs cancel](https://github.com/agentscope-ai/QwenPaw/pull/6248) — 2026-07-18 创建，已 1 个月
- [#6243 fix(embedding): expose use_dimensions toggle](https://github.com/agentscope-ai/QwenPaw/pull/6243) — 2026-07-18 创建，已 1 个月
- [#6399 feat: add reranker UI config panel](https://github.com/agentscope-ai/QwenPaw/pull/6399) — 2026-07-23 创建，已 1 个月

以上 PR 今日均有关闭/更新记录，但多数处于 "Under Review" 状态较久，建议维护者优先处理积压时间较长的 PR，避免社区贡献者流失。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes-Agent 项目动态日报 — 2026-08-26

> 数据来源：github.com/NousResearch/hermes-agent | 统计窗口：2026-08-25 ~ 2026-08-26

---

## 1. 今日速览

过去 24 小时项目保持**极高活跃度**：386 条 Issue 更新（330 条新开/活跃、56 条关闭），500 条 PR 更新（426 条待合并、74 条已合并/关闭），无新版本发布。社区讨论热度集中在 **Skills 索引降级**（#66616，96 条评论）与 **Nous 集成阻塞**（#88584，30 条评论）两大自动化运维问题上。Bug 报告呈现明显聚类：**更新/安装链路可靠性**（#91277、#94540、#92145、#92095）、**会话状态持久化**（#93888、#94736、#72716）与 **xAI 保留函数名冲突**（#95003，已有 2 个 fix PR 快速响应）是当前三大热点。整体项目健康度：**功能迭代活跃，但基础设施稳定性问题积压较多，更新机制为最薄弱环节**。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

今日合并/关闭的 PR 与 Issue 显示项目在**修复关键缺陷**上取得实质进展：

- **PR #95009（已合并）**：Atlassian MCP 内置条目修复（6 月 30 日端点切换后 404）+ Grafana Cloud 加入 MCP 目录。解决了所有用户自 6 月 30 日起 Atlassian MCP 不可用的问题。
  https://github.com/NousResearch/hermes-agent/pull/95009

- **Issue #75655（已关闭）**：managed-runtime 预置失败根因修复——`uv sync` 同时传入 `--locked` 与 `--no-config` 导致构建永不成功，且错误被误报为 smoke-test 失败。
  https://github.com/NousResearch/hermes-agent/issues/75655

- **Issue #81048（已关闭，安全）**：审批超时被误判为显式用户拒绝的 Tier 1 安全缺陷已修复，静默超时不再归因为用户拒绝。
  https://github.com/NousResearch/hermes-agent/issues/81048

- **Issue #74973（已关闭）**：macOS 上 `hermes update` 在 launchd 任务已退出时静默跳过网关重启的问题已修复，更新不再以退出码 0 掩盖网关死亡。
  https://github.com/NousResearch/hermes-agent/issues/74973

- **Issue #66978（已关闭）**：TUI 每次启动都触发 `npm install` 的性能问题已修复（`_tui_need_npm_install` 比较逻辑修正）。
  https://github.com/NousResearch/hermes-agent/issues/66978

**整体判断**：今日关闭的 74 条 PR 与 56 条 Issue 中，上述 5 项为高价值修复，覆盖 MCP 生态、安全归因、更新链路与性能。但 426 条待合并 PR 的积压规模提示**合并吞吐量可能成为瓶颈**。

---

## 4. 社区热点

| 排名 | Issue/PR | 评论数 | 核心诉求 |
|------|----------|--------|----------|
| 1 | [#66616 Skills index degraded](https://github.com/NousResearch/hermes-agent/issues/66616) | 96 | 自动化探针发现 Skills 索引 29.8h 未刷新（限制 26h），文档站依赖的索引构建链路（cron + deploy-site）存在稳定性问题 |
| 2 | [#88584 Nous 集成阻塞](https://github.com/NousResearch/hermes-agent/issues/88584) | 30 | 定时 Nous-to-Enterkey 合并因 `cron/jobs.py` 冲突失败，dashboard 更新器停留在旧版本 |
| 3 | [#13834 openai-codex 失败](https://github.com/NousResearch/hermes-agent/issues/13834) | 21 | 同一机器/网络下官方 Codex CLI 正常，Hermes 的 `openai-codex` 反复失败，P1 兼容性问题 |
| 4 | [#91277 Fleet 更新可靠性](https://github.com/NousResearch/hermes-agent/issues/91277) | 19 | Tracking issue：约 30 个 open issues + 15 个 open PRs 都在修补同一类问题——本地/远程/多 profile/桌面端的更新机制是"意大利面条式"实现 |
| 5 | [#23717 Pluggable SessionDB RFC](https://github.com/NousResearch/hermes-agent/issues/23717) | 19（👍8） | 提出可插拔 SessionDB Provider（PostgreSQL/MySQL），解决热更新时 SQLite `state.db` 的"死亡螺旋"问题 |

**热点分析**：社区最强烈的诉求集中在**自动化运维可靠性**（索引刷新、定时合并、更新机制）与**架构级改进**（SessionDB 抽象、统一更新方案）。#23717 获得 8 个 👍 表明用户对 SQLite 单文件架构在高频更新场景下的脆弱性已有广泛共识。

---

## 5. Bug 与稳定性

### P1 严重级别

| Issue | 描述 | Fix PR 状态 |
|-------|------|-------------|
| [#13834](https://github.com/NousResearch/hermes-agent/issues/13834) | Hermes `openai-codex` 在官方 CLI 可用的同一环境失败（macOS） | ❌ 无 |
| [#94637](https://github.com/NousResearch/hermes-agent/issues/94637) | MCP stdio 工具调用全部快速失败 "subprocess has exited"（Windows 11，commit 786f37071） | ❌ 无 |
| [#94736](https://github.com/NousResearch/hermes-agent/issues/94736) | 子代理/cron 会话间歇性死亡：`Session DB append_message failed: NoneType object has no attribute execute` | ❌ 无 |
| [#92145](https://github.com/NousResearch/hermes-agent/issues/92145) | `hermes update` 自动重启阶段遇 ImportError 中止后，运行中服务停留在旧 `sys.modules` | ❌ 无 |
| [#91277](https://github.com/NousResearch/hermes-agent/issues/91277) | Tracking：Fleet 更新可靠性整体缺陷（约 30 issues + 15 PRs 同源） | ⏳ Tracking 中 |

### P2 中等级别

| Issue | 描述 | Fix PR 状态 |
|-------|------|-------------|
| [#95003](https://github.com/NousResearch/hermes-agent/issues/95003) | xAI 拒绝 `tool_search` 函数名（保留给服务端原生工具），Grok 不可用 | ✅ [#95019](https://github.com/NousResearch/hermes-agent/pull/95019)、[#95011](https://github.com/NousResearch/hermes-agent/pull/95011) |
| [#93888](https://github.com/NousResearch/hermes-agent/issues/93888) | Desktop 向远程网关发送本地 runtime ID，会话恢复永久失败 | ❌ 无 |
| [#72488](https://github.com/NousResearch/hermes-agent/issues/72488) | Gemini 3.5 Flash 将多个 JSON 对象拼接进单个 tool_call | ❌ 无 |
| [#94540](https://github.com/NousResearch/hermes-agent/issues/94540) | macOS 更新后 7 个 launchd 网关服务 exit 75 且 KeepAlive 无法拉起 | ❌ 无 |
| [#92095](https://github.com/NousResearch/hermes-agent/issues/92095) | uv 安装下 `.desktop` 的 Exec= 指向裸 uv 解释器，点击图标静默失败 | ❌ 无 |
| [#72716](https://github.com/NousResearch/hermes-agent/issues/72716) | `optimize-storage` 在中断的 demote 后可写入空 FTS，永久丢失搜索 | ❌ 无 |
| [#62169](https://github.com/NousResearch/hermes-agent/issues/62169) | 终端沙箱 CWD 被删除后所有命令 exit 126 | ❌ 无 |
| [#94146](https://github.com/NousResearch/hermes-agent/issues/94146) | 微信 live 回复在限流事件后静默丢失（即使重新登录） | ❌ 无 |
| [#90229](https://github.com/NousResearch/hermes-agent/issues/90229) | Desktop 右侧文件树永久卡在 skeleton，刷新按钮禁用 | ❌ 无 |

### 已关闭的 Bug（今日修复）

- #75655（managed-runtime 预置失败）、#81048（审批超时误判）、#74973（macOS 更新跳过重启）、#66978（TUI 重复 npm install）

**稳定性判断**：P1 级别 5 个问题中 4 个尚无 fix PR，且集中在**更新链路**与**会话持久化**两大核心路径，建议维护者优先分配资源。xAI 问题社区响应最快（同日 2 个 fix PR），但需注意 #95019 与 #95011 为重复方案，需协调合并。

---

## 6. 功能请求与路线图信号

### 高潜力功能请求（社区关注度高）

- **[#23717 Pluggable SessionDB Provider](https://github.com/NousResearch/hermes-agent/issues/23717)**（👍8，RFC）：PostgreSQL/MySQL 支持，解决 SQLite 热更新死锁。若落地将重构会话存储架构。
- **[#20765 Voice mode in browser dashboard](https://github.com/NousResearch/hermes-agent/issues/20765)**（👍6）：WebRTC 音频采集，使远程 SSH/浏览器场景支持语音输入。
- **[#89995 Bot Mode group chat rooms](https://github.com/NousResearch/hermes-agent/issues/89995)**：将桌面端 Bot Mode 群聊暴露到 Web dashboard 与网关。
- **[#5114 Autoresearch skill](https://github.com/NousResearch/hermes-agent/issues/5114)**：基于 git 的自主实验循环，跟踪 ML 优化是否真正改进。
- **[#5320 memory_char_limit 自动扩容](https://github.com/NousResearch/hermes-agent/issues/5320)**（👍2）：提高默认记忆上限并暴露使用压力。

### 架构级提案（今日新增）

- **[#95028 Hermes Authority Execution Layer](https://github.com/NousResearch/hermes-agent/issues/95028)**（8 评论）：提出"十二个 issue 实为一个缺陷"的架构统一方案，强调边界穿越时身份/环境/路径的丢失问题。
- **[#91911 Bot Mode 统一控制平面](https://github.com/NousResearch/hermes-agent/issues/91911)**：将 Bot Mode 的身份、能力、投递、取消整合为单一控制面对象。

### 可能纳入下一版本的 PR 信号

- **#95068**（webhook 签名方案可配置化）：解决固定 header 探测的生态兼容问题
- **#95070**（cron 系统提示词强制反传播警告）：响应 arXiv 多智能体"思维病毒"安全研究
- **#57307**（CronPage 30s 自动刷新）：dashboard 体验补全
- **#89487**（⌘⇧E 折叠/展开侧边栏）：桌面端快捷键增强
- **#94994**（PR 修复与合并自动化）：治理层自动化

---

## 7. 用户反馈摘要

### 最强烈痛点：更新机制不可靠

> "Install/update is currently our least reliable capability. ~30 open issues and ~15 open PRs each patch one corner of the same class." — #91277

用户在多条 Issue 中描述了**更新后服务静默死亡**的惨痛经历：macOS 更新后 7 个网关全部 exit 75 且无法拉起（#94540）、更新显示成功但网关已注销（#74973）、更新后服务停留在旧代码（#92145）。**"更新成功但服务死了"** 是出现频率最高的用户抱怨模式。

### 平台兼容性：Windows 用户持续受伤

- #88168：大小写冲突文件导致 `git status` 永久 dirty
- #92095：`.desktop` 快捷方式指向错误解释器，点击无反应
- #90229：文件树卡死
- #94637：MCP stdio 全部失效

### 会话数据安全焦虑

- #93888："Restore failed — Session not found" 永久卡死
- #94736：子代理会话静默死亡，`reason=session_persistence_failed`
- #72716：搜索索引永久清空

### 正面反馈信号

- xAI 保留函数名问题（#95003）在 24 小时内获得 2 个 fix PR，社区对响应速度表示认可（👍5）
- #23717 RFC 获得 8 个 👍，用户对架构改进方向积极支持

---

## 8. 待处理积压

### 长期未关闭的高优先级 Issue

| Issue | 创建时间 | 优先级 | 备注 |
|-------|----------|--------|------|
| [#13834 openai-codex 失败](https://github.com/NousResearch/hermes-agent/issues/13834) | 2026-04-22 | P1 | 已积压 4 个月，21 条评论，官方 CLI 正常而 Hermes 失败，兼容性缺陷 |
| [#66616 Skills index degraded](https://github.com/NousResearch/hermes-agent/issues/66616) | 2026-07-18 | P3 | 96 条评论为全项目最高，自动化探针反复报警，索引构建链路未根治 |
| [#62169 终端 CWD 删除后 exit 126](https://github.com/NousResearch/hermes-agent/issues/62169) | 2026-07-10 | P2 | 沙箱环境健壮性问题，影响所有工具调用 |
| [#12220 Bailian 无 /v1/models](https://github.com/NousResearch/hermes-agent/issues/12220) | 2026-04-18 | P2 | 阿里云 DashScope 兼容性，4 个月未解决 |
| [#20765 浏览器语音模式](https://github.com/NousResearch/hermes-agent/issues/20765) | 2026-05-06 | P2 | 👍6，功能请求积压 |

### 长期未合并的 PR

| PR | 创建时间 | 内容 |
|----|----------|------|
| [#57307 CronPage 自动刷新](https://github.com/NousResearch/hermes-agent/pull/57307) | 2026-07-02 | 简单功能，54 天未合并 |
| [#63044 Discord 房间观察](https://github.com/NousResearch/hermes-agent/pull/63044) | 2026-07-12 | 功能完整但带 5 个 sweeper 风险标签，需重点审查 |
| [#71087 TTS 客户端复用](https://github.com/NousResearch/hermes-agent/pull/71087) | 2026-07-25 | 性能优化，每次句子调用都重建 OpenAI 客户端 |

### 维护者提醒

1. **#66616 的 96 条评论**说明 Skills 索引问题已引发社区广泛关注，建议优先修复 `.github/workflows/skills-index.yml` 的 cron 链路。
2. **#91277 作为 tracking issue** 已识别出约 30 个同源问题，建议成立专项小组系统性解决更新机制，而非继续逐个打补丁。
3. **#95019 与 #95011 为重复 PR**，需尽快协调合并其一，避免社区贡献流失。

---

*本日报由 AI 分析师自动生成，数据基于 2026-08-26 的 GitHub 公开信息。所有链接均指向原始 Issue/PR。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-08-26

## 1. 今日速览

过去 24 小时 AstrBot 项目保持高活跃度：共处理 10 条 Issue（5 新开 / 5 关闭）和 13 条 PR（3 待合并 / 10 已合并关闭），无新版本发布。核心维护者 @Soulter 亲自提交了 3 个 PR，涵盖跨平台消息按钮组件、T2I 渲染升级和 Anthropic API 兼容性修复，显示项目在功能扩展与稳定性维护双线推进。社区侧，移动端 Web UI 菜单问题（#9781）以 25 条评论成为今日讨论焦点，且已由社区贡献者提交修复 PR 并合入，体现了良好的社区协作闭环。整体来看，项目健康度良好，修复速度跟上问题反馈节奏。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日合并/关闭的 10 个 PR 覆盖了多个重要改进，项目在跨平台能力、兼容性和工程质量方面均有实质推进：

- **跨平台消息按钮组件（#9809，待合并）**：由 @Soulter 提交，新增可移植的 ActionRow、Button、回调、URL action 等组件，支持 QQ 官方、Telegram、Lark、钉钉、Discord、Slack、LINE、KOOK、Satori 等平台的原生按钮回调。这是 AstrBot 交互能力的一次重要升级，将显著增强多平台上的富交互体验。
  https://github.com/AstrBotDevs/AstrBot/pull/9809

- **Anthropic SDK 1.0 兼容修复（#9769，已合并）**：社区贡献者 @wcqqq1214 修复了 Anthropic SDK 1.0.0（2026-08-20 发布）内部传输模块重命名导致的兼容性问题，确保 AstrBot 在 Anthropic SDK 升级后仍能正常工作。
  https://github.com/AstrBotDevs/AstrBot/pull/9769

- **Anthropic API Base URL 逻辑对齐（#9802，已合并）**：@Soulter 修复了 Anthropic 兼容 API 的 base URL 处理逻辑，自动去除尾部 `/v1`，与 OpenAI API 的处理方式保持一致，并补充了回归测试。
  https://github.com/AstrBotDevs/AstrBot/pull/9802

- **日志级别修复（#9805，已合并）**：修复了 v4.26 升级到 v4.27 后终端日志全部刷为 DEBUG 级别、WebUI 配置无效的回归问题，确保控制台和 root logger 遵循配置的日志级别。
  https://github.com/AstrBotDevs/AstrBot/pull/9805

- **OpenAI 工具 Schema 顺序稳定化（#9798，已合并）**：在序列化 OpenAI 兼容函数声明前按工具名称稳定排序，避免工具注册顺序变化导致的上游提示词前缀变化，有利于 Prompt Cache 复用。
  https://github.com/AstrBotDevs/AstrBot/pull/9798

- **禁用插件指令置灰（#9664，已合并）**：修复插件禁用后其指令在管理行为中仍显示"已启用"的问题，后端命令列表现在会检查插件激活状态，前端对禁用插件的指令进行置灰展示。
  https://github.com/AstrBotDevs/AstrBot/pull/9664

- **移动端触摸检测修复（#9782，已合并）**：修复 #9781，在 Chat.vue 中添加触摸设备检测，使移动端 Web UI 的二级菜单可以通过点击而非悬停来展开。
  https://github.com/AstrBotDevs/AstrBot/pull/9782

- **企业微信回调循环修复（#9759，已合并）**：修复 #9758，企业微信长连接接收循环不再内联等待回调处理，避免初始响应非空时阻塞接收循环导致重复超时。
  https://github.com/AstrBotDevs/AstrBot/pull/9759

- **钉钉应用创建状态处理（#9808，已合并）**：将钉钉应用注册状态 CREATING 视为进行中状态，持续轮询而非报告未知状态，并补充回归测试。
  https://github.com/AstrBotDevs/AstrBot/pull/9808

- **Dockerfile 构建缓存优化（#9787，已合并）**：调整 Dockerfile 构建顺序，将 COPY 移到依赖安装之后，利用 Docker 层缓存加速构建。
  https://github.com/AstrBotDevs/AstrBot/pull/9787

- **依赖更新（#9799，已合并）**：dependabot 更新 github-actions 组的 codeql-action 和 setup-buildx-action。
  https://github.com/AstrBotDevs/AstrBot/pull/9799

## 4. 社区热点

- **#9781 移动端 Web UI 二级菜单无法弹出（25 条评论，已关闭）**：今日最热 Issue。用户 @mantoujun12 报告在 Android Via 浏览器上，Chat UI 侧边栏的"通信传输模式"和"语言"二级菜单无法展开，即使开启电脑模式也无响应。该问题获得了 25 条评论，说明移动端 Web UI 使用群体不小。值得肯定的是，报告者本人随后提交了修复 PR #9782 并已合入，形成了完整的"报告-修复-合入"社区闭环。
  https://github.com/AstrBotDevs/AstrBot/issues/9781

- **#9804 个人微信适配器长会话上下文污染（新开）**：用户报告个人微信适配器在长时间对话后出现上下文污染，主动消息重复回答相同文本，被动回复最终卡死并反复重复固定文本。涉及主动聊天插件与 Ollama/qwen3:8b 的组合，问题描述详细，值得关注。
  https://github.com/AstrBotDevs/AstrBot/issues/9804

## 5. Bug 与稳定性

按严重程度排列：

- **高：个人微信适配器长会话上下文污染（#9804，新开，无 fix PR）**：长时间对话后主动消息重复回答、被动回复卡死并重复固定文本。涉及 v4.27.4 + weixin_oc + Ollama/qwen3:8b + 主动聊天插件 v1.2.4。该问题影响核心聊天功能，且复现路径清晰，建议优先排查。
  https://github.com/AstrBotDevs/AstrBot/issues/9804

- **中：企业微信初始响应触发超时（#9758，已关闭，已有 fix PR #9759）**：初始响应文本非空时异常触发"等待命令响应超时"，已由 PR #9759 修复并合入。
  https://github.com/AstrBotDevs/AstrBot/issues/9758

- **中：插件禁用后指令状态显示错误（#9562，已关闭，已有 fix PR #9664）**：禁用插件后指令仍显示"已启用"且实际不可用，已由 PR #9664 修复并合入。
  https://github.com/AstrBotDevs/AstrBot/issues/9562

- **低：移动端 Web UI 二级菜单无法弹出（#9781，已关闭，已有 fix PR #9782）**：触摸设备上二级菜单无法展开，已由 PR #9782 修复并合入。
  https://github.com/AstrBotDevs/AstrBot/issues/9781

- **低：日志级别配置失效（PR #9805，已合并）**：v4.26 升级到 v4.27 后终端日志全部刷为 DEBUG，已修复。
  https://github.com/AstrBotDevs/AstrBot/pull/9805

## 6. 功能请求与路线图信号

- **Synthorai Provider Adapter（#9807，新开）**：用户请求新增 Synthorai（OpenAI/Anthropic 协议兼容的 LLM 网关，一个 key 打通 11 家上游 122 个模型）的 provider adapter。考虑到项目近期持续优化 Anthropic/OpenAI 兼容层（#9769、#9802），此类聚合网关适配器有较大概率被纳入后续版本。
  https://github.com/AstrBotDevs/AstrBot/issues/9807

- **内置指令白名单（#9806，新开）**：用户建议增加指令白名单，只有白名单内的人才能触发内置指令回复，以避免多 bot 场景下的互相触发刷屏。这是一个实用的治理功能，可能被纳入核心配置或作为插件实现。
  https://github.com/AstrBotDevs/AstrBot/issues/9806

- **知识库指定检索（#7426，已关闭）**：用户希望知识库支持指定知识库/指定文件检索，避免全库检索导致结果不精准。该 Issue 已关闭但未看到对应 PR，可能已通过其他方式解决或进入路线图。
  https://github.com/AstrBotDevs/AstrBot/issues/7426

- **跨平台消息按钮（#9809，待合并）**：@Soulter 提交的 PR 将为多平台带来原生按钮交互能力，这是路线图上的重要功能，预计将在下一版本中与用户见面。
  https://github.com/AstrBotDevs/AstrBot/pull/9809

- **T2I 渲染改进（#9803，待合并）**：@Soulter 提交的 PR 将替换默认 T2I 布局为更克制的编辑设计，改进 Markdown 渲染和响应式间距，提升默认渲染质量。
  https://github.com/AstrBotDevs/AstrBot/pull/9803

- **QQ 官方群消息 @ 提及恢复（#9705，待合并）**：修复 QQ 官方平台群消息中 @ 提及的序列化问题，支持新旧格式的提及解析，并恢复回归测试。
  https://github.com/AstrBotDevs/AstrBot/pull/9705

## 7. 用户反馈摘要

- **移动端体验是真实痛点**：#9781 的 25 条评论表明移动端 Web UI 用户群体庞大，二级菜单无法展开的问题影响实际使用。用户尝试了 Via 浏览器自带的"电脑模式"仍无法解决，说明问题不是简单的响应式布局问题，而是交互模式（hover vs click）的适配缺失。

- **插件管理状态一致性受关注**：#9562 中用户反馈插件禁用后指令仍显示"已启用"，这种状态不一致会误导用户对系统实际行为的判断。修复 PR #9664 通过后端检查插件激活状态 + 前端置灰展示，从根源上解决了信息不一致问题。

- **企业微信用户遇到超时困扰**：#9758 中用户发现初始响应文本非空时会触发异常超时，而空文本则正常。这种"配置越丰富越容易出问题"的反直觉行为容易让用户困惑，修复 PR #9759 通过调整回调处理方式解决。

- **插件发布空间限制引发疑问**：#9785 中用户对"发布空间已被禁止发布插件"的提示感到困惑，该问题仅有一张截图，缺乏上下文说明，建议维护者优化错误提示文案或提供更清晰的引导。

- **新插件提交活跃**：今日有两个新插件提交（#9811 视频识别、#9810 时段切换模型），均为社区开发者 @MankindLumi 提交，显示 AstrBot 插件生态持续活跃。视频识别插件调用智谱视觉模型自动抽帧识别 QQ 视频内容，时段切换模型插件按服务器时间自动切换模型以节省成本，都切中了实际使用场景。

## 8. 待处理积压

- **#9705 QQ 官方群消息 @ 提及修复（PR，待合并，已 10 天）**：该 PR 于 2026-08-16 创建，至今仍在待合并状态。QQ 官方平台的 @ 提及功能是群聊场景的核心能力，建议维护者尽快 review 并合入。
  https://github.com/AstrBotDevs/AstrBot/pull/9705

- **#9804 个人微信上下文污染（Issue，新开，暂无响应）**：该问题影响核心聊天功能且复现路径清晰，但目前还没有维护者回复或指派。考虑到涉及多个组件（weixin_oc + Ollama + 主动聊天插件），建议尽快确认是否为已知问题。
  https://github.com/AstrBotDevs/AstrBot/issues/9804

- **#7426 知识库指定检索（Issue，已关闭但无对应 PR）**：该功能请求于 2026-04-09 提出，今日关闭但未看到对应的实现 PR 或说明。如果确实已实现，建议在关闭时补充关联 PR 或实现说明；如果未实现，建议明确告知用户后续规划。
  https://github.com/AstrBotDevs/AstrBot/issues/7426

---

**总结**：AstrBot 项目今日展现出健康的社区生态和高效的迭代节奏。核心维护者与社区贡献者协同推进了多项跨平台能力升级和稳定性修复，特别是消息按钮组件和 Anthropic SDK 兼容性工作具有前瞻性。社区反馈的问题大多能在 2-3 天内获得修复并合入，形成了良好的正反馈循环。建议后续关注个人微信上下文污染问题（#9804）和待合并的 QQ @ 提及修复（#9705），确保核心平台体验的稳定性。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*