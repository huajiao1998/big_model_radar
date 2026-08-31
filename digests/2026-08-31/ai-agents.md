# OpenClaw 生态日报 2026-08-31

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-31 00:00 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-31

## 1. 今日速览

过去24小时内，OpenClaw 仓库保持极高活跃度：共产生 500 条 Issue 更新（新开/活跃 300 条，关闭 200 条）和 500 条 PR 更新（待合并 345 条，已合并/关闭 155 条），无新版本发布。当前积压的 345 条待合并 PR 与 300 条活跃 Issue 表明项目正处于密集开发与问题修复并行的高强度迭代期。值得关注的是，今日新出现多个 P1 级数据丢失/消息丢失类问题（如 #133347、#133058），且大量长期存在的 P1 问题仍处于 `needs-maintainer-review` 状态，维护者响应压力较大。整体来看，项目社区参与度极高，但合并吞吐与问题消化速度存在一定瓶颈。

---

## 2. 版本发布

**无新版本发布。**

当前最新 beta 仍为 [v2026.8.1-beta.3](https://github.com/openclaw/openclaw/releases/tag/v2026.8.1-beta.3)，相关反馈收集见 [#125626](https://github.com/openclaw/openclaw/issues/125626)。

---

## 3. 项目进展

今日无新版本发布，但以下已合并/关闭的 PR 值得关注：

### 已合并/关闭的重要 PR

| PR | 标题 | 状态 | 意义 |
|---|---|---|---|
| [#120900](https://github.com/openclaw/openclaw/pull/120900) | feat(ui): review install policy warnings | ✅ CLOSED | 为 Control UI 增加了安装策略警告的审核流程，管理员可显式确认后继续安装插件，增强了供应链安全管控能力 |
| [#125471](https://github.com/openclaw/openclaw/pull/125471) | fix(models): keep Claude CLI OAuth available in Control UI | ✅ CLOSED | 修复了 Gateway 重启后 Claude CLI OAuth 刷新所有权丢失的问题，避免 Control UI 中 OAuth 凭据失效 |

### 值得关注的待合并 PR

| PR | 标题 | 说明 |
|---|---|---|
| [#133000](https://github.com/openclaw/openclaw/pull/133000) | chore: prepare extended-stable 2026.7.33 | 准备从 v2026.7.1-2 发布 extended-stable 2026.7.33 版本线，记录了 19,153 个非等价提交的完整发现，并携带相关低风险修复 |
| [#133641](https://github.com/openclaw/openclaw/pull/133641) | improve: speed up legacy session transcript imports | 优化旧会话历史导入性能，避免逐条拒绝后再接受的开销 |
| [#133628](https://github.com/openclaw/openclaw/pull/133628) | fix(ui): preserve offline drafts and resume canceled queue edits | 修复离线草稿丢失和取消排队编辑后消息滞留问题 |
| [#132116](https://github.com/openclaw/openclaw/pull/132116) | fix(acp): honor Codex model reasoning limits | 修复 Codex ACP 派生进程继承 `thinking: max` 导致模型拒绝或转发不支持默认值的问题 |

**整体判断**：项目在 UI 体验修复、性能优化、模型路由正确性三个方向上有持续投入，但大量 PR 仍停留在 `ready for maintainer look` 状态，等待维护者审阅合并。

---

## 4. 社区热点

### 讨论最活跃的 Issues

| Issue | 标题 | 评论数 | 核心诉求 |
|---|---|---|---|
| [#125626](https://github.com/openclaw/openclaw/issues/125626) | OpenClaw 2026.8.1 beta feedback | 24 | 社区对 2026.8.1 beta 版本的综合反馈集中帖，涉及多个功能与稳定性问题 |
| [#42475](https://github.com/openclaw/openclaw/issues/42475) | [Feature]: Per-agent cost budget enforcement at the gateway level | 22 | 用户希望在网关层实现按 agent 的每日/每月成本上限，防止模型调用费用失控 |
| [#48788](https://github.com/openclaw/openclaw/issues/48788) | feat: centralized filename encoding utility for multi-encoding Content-Disposition handling | 19 | 针对飞书中文文件名 UTF-8 被误读为 Latin-1 的问题，提出跨渠道统一的文件名编码工具 |
| [#102175](https://github.com/openclaw/openclaw/issues/102175) | [Bug]: embedded prompt cache breaks across room-event, policy, and Responses boundaries | 18 | 嵌入式会话的 prompt 缓存在跨边界时失效，影响模型性能和成本 |
| [#87744](https://github.com/openclaw/openclaw/issues/87744) | [Bug]: Codex-backed Telegram turns repeatedly time out | 17 | Codex 驱动的 Telegram 会话反复超时，用户等待最终回复却始终无法送达 |

### 热点分析

社区讨论集中在三个方向：**成本控制**（#42475）、**多编码/多语言支持**（#48788）、**消息可靠投递**（#87744、#96834、#87561）。其中消息投递类问题在评论数和 👍 数上均表现突出（#87744 获得 4 个 👍），说明生产环境中消息丢失对用户影响最为直接、痛点最强。

---

## 5. Bug 与稳定性

### 🔴 P1 级严重问题（按影响排序）

| Issue | 标题 | 影响 | 是否有 Fix PR |
|---|---|---|---|
| [#133347](https://github.com/openclaw/openclaw/issues/133347) | 2026.8.1 migration quarantines valid cron jobs as invalid-schedule | **数据丢失**：合法定时任务被隔离，活跃库存静默丢失 | 无（`queueable-fix`，待处理） |
| [#133058](https://github.com/openclaw/openclaw/issues/133058) | succeeded-but-delivery-failed subagent tasks are never proactively surfaced | **消息丢失**：子代理任务成功但投递失败时无主动通知 | 无（`queueable-fix`，待处理） |
| [#131807](https://github.com/openclaw/openclaw/issues/131807) | System-agent conversations share one Codex session key | **会话状态错乱**：系统代理对话共享同一会话密钥，导致新对话被拒绝 | 无（`queueable-fix`，待处理） |
| [#131150](https://github.com/openclaw/openclaw/issues/131150) | Slack DMs silently dropped after gateway restart | **消息丢失**：多账户 Slack 网关重启后所有私信静默丢失 | 有（`linked-pr-open`） |
| [#87744](https://github.com/openclaw/openclaw/issues/87744) | Codex-backed Telegram turns repeatedly time out | **消息丢失**：Telegram 会话反复超时，最终回复无法送达 | 无（`needs-maintainer-review`） |
| [#96834](https://github.com/openclaw/openclaw/issues/96834) | WhatsApp inbound image wedges main lane ~3min | **消息延迟**：WhatsApp 图片消息导致主通道阻塞约 3 分钟 | 无（`needs-maintainer-review`） |
| [#87561](https://github.com/openclaw/openclaw/issues/87561) | Define durable final fallback delivery semantics across channels | **消息丢失**：跨渠道最终回退投递语义不明确 | 无（`needs-maintainer-review`） |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | OpenClaw leaks unreaped hook/tool child processes | **性能退化**：僵尸进程累积导致运行时性能下降 | 无（`needs-info`） |
| [#114020](https://github.com/openclaw/openclaw/issues/114020) | Feishu/Telegram channel dispatch fails: runChannelInboundEvent requires runDispatchLifecycle | **功能不可用**：飞书/Telegram 渠道完全无法分发消息 | 无（`source-repro`） |

### 🟡 P2 级问题（部分列举）

| Issue | 标题 | 影响 |
|---|---|---|
| [#102175](https://github.com/openclaw/openclaw/issues/102175) | embedded prompt cache breaks across boundaries | 性能/成本：prompt 缓存失效 |
| [#98435](https://github.com/openclaw/openclaw/issues/98435) | MCP loopback transport does not auto-reconnect | 功能异常：网关重启后 MCP 传输未自动重连 |
| [#99586](https://github.com/openclaw/openclaw/issues/99586) | Runtime tool surface returns blank body | 功能异常：工具表面返回空白 |
| [#100941](https://github.com/openclaw/openclaw/issues/100941) | Gateway drops concurrent WebSocket connections (1006) | 连接中断：并行工具调用时 WebSocket 被断开 |

### 稳定性趋势判断

今日新出现的 #133347（迁移导致定时任务数据丢失）和 #133058（子代理任务投递失败无通知）均为 `no-stale` + `queueable-fix` 标记，属于高优先级可修复问题，但尚无对应 PR。大量 P1 问题长期停留在 `needs-maintainer-review` 状态（如 #87744 已开放 3 个月、#96834 已开放 2 个月），维护者审阅积压严重。

---

## 6. 功能请求与路线图信号

### 高潜力功能请求

| Issue | 标题 | 信号强度 | 分析 |
|---|---|---|---|
| [#42475](https://github.com/openclaw/openclaw/issues/42475) | Per-agent cost budget enforcement at the gateway level | ⭐⭐⭐⭐⭐（22 评论） | 企业级成本管控需求强烈，已有 `session-cost-usage.ts` 基础，实现路径清晰 |
| [#52640](https://github.com/openclaw/openclaw/issues/52640) | Persistent task-status surface for long-running channel turns | ⭐⭐⭐⭐（7 评论，2 👍） | 用户需要权威的任务状态界面，而非零散的输入指示器 |
| [#12678](https://github.com/openclaw/openclaw/issues/12678) | Capability-based permissions for skills/tools | ⭐⭐⭐⭐（6 评论） | 安全相关，默认拒绝高风险操作，符合供应链安全趋势 |
| [#55792](https://github.com/openclaw/openclaw/issues/55792) | Catch up on missed inbound messages after gateway restart | ⭐⭐⭐⭐（5 评论） | 与 #131150 等消息丢失问题直接相关，重启后补收消息是刚需 |
| [#44965](https://github.com/openclaw/openclaw/issues/44965) | Stream Repetition Safeguard (Halt & Confirm) | ⭐⭐⭐（5 评论，1 👍） | 防止模型无限循环刷屏，提升用户体验 |

### 路线图信号

- **成本治理**（#42475）与 **消息可靠性**（#55792）是社区呼声最高的两个方向，且与当前多个 P1 bug 直接关联，预计会在后续版本中优先纳入。
- **安全权限模型**（#12678）与近期多个安全审查标记（`needs-security-review`）相呼应，表明项目正在向更严格的安全边界演进。
- **i18n 支持**（#79458）和 **多编码处理**（#48788）反映了非英语用户群体的增长，国际化需求逐渐浮出水面。

---

## 7. 用户反馈摘要

### 真实用户痛点

1. **消息静默丢失是最核心痛点**：多个 Issue（#87744、#96834、#87561、#131150、#133058）反映了同一类问题——用户发送消息后，agent 可能已生成回复，但最终结果从未送达。如 #87744 用户反馈："Codex-backed turns repeatedly do work but never reach terminal `turn/completed`"；#131150 用户报告 19 个 Slack 账户在网关重启后所有私信被静默丢弃。

2. **升级迁移风险令人担忧**：#133347 用户报告升级到 2026.8.1 后合法 cron 任务被隔离为 `invalid-schedule`，导致自动化库存静默丢失。这类问题严重打击用户对升级的信心。

3. **多账户/多代理场景稳定性不足**：#131150（19 个 Slack 账户）、#65374（多代理 dreaming 系统污染）、#131807（系统代理共享会话密钥）表明，项目在多租户/多代理场景下存在系统性缺陷。

4. **模型路由与回退不透明**：#106786 用户反馈 gpt-5.6-* 模型在 ChatGPT-OAuth 路由上被广告后静默回退，用户完全不知情。这种"静默降级"行为损害用户对系统的信任。

### 用户满意点

- 社区对 #125626 beta 反馈帖的积极参与（24 条评论）表明用户愿意参与版本验证和反馈。
- 多个 PR 获得 `proof: sufficient` 和 `proof: 🎥 video` 标记，说明贡献者正在提供高质量的可验证修复。

---

## 8. 待处理积压

### 长期未响应的关键 Issue

| Issue | 标题 | 创建时间 | 已开放天数 | 优先级 | 备注 |
|---|---|---|---|---|---|
| [#12678](https://github.com/openclaw/openclaw/issues/12678) | Capability-based permissions for skills/tools | 2026-02-09 | ~204 天 | P2 | 安全相关，长期未获维护者明确回应 |
| [#55792](https://github.com/openclaw/openclaw/issues/55792) | Catch up on missed inbound messages after gateway restart | 2026-03-27 | ~157 天 | P1 | 与多个消息丢失 bug 直接相关，但始终无 fix PR |
| [#87744](https://github.com/openclaw/openclaw/issues/87744) | Codex-backed Telegram turns repeatedly time out | 2026-05-28 | ~95 天 | P1 | 4 👍，17 评论，仍停留在 `needs-maintainer-review` |
| [#96834](https://github.com/openclaw/openclaw/issues/96834) | WhatsApp inbound image wedges main lane | 2026-06-25 | ~67 天 | P1 | 14 评论，仍无 fix PR |
| [#87561](https://github.com/openclaw/openclaw/issues/87561) | Define durable final fallback delivery semantics | 2026-05-28 | ~95 天 | P1 | 设计层面的根本性问题，需要架构决策 |

### 待合并的关键 PR（等待维护者审阅）

| PR | 标题 | 等待天数 | 风险标记 |
|---|---|---|---|
| [#123053](https://github.com/openclaw/openclaw/pull/123053) | fix(gateway): preserve Responses replay continuations | ~18 天 | 🚨 compatibility, 🚨 session-state |
| [#123416](https://github.com/openclaw/openclaw/pull/123416) | fix(plugins): preserve bundled provider compat across allowlists | ~17 天 | 🚨 compatibility, 🚨 auth-provider |
| [#132116](https://github.com/openclaw/openclaw/pull/132116) | fix(acp): honor Codex model reasoning limits | ~3 天 | 🚨 compatibility, 🚨 session-state |
| [#131669](https://github.com/openclaw/openclaw/pull/131669) | fix(workers): honor session tool policies on cloud sessions | ~3 天 | 🚨 compatibility, 🚨 security-boundary |

### 维护者提醒

1. **P1 消息丢失类问题积压严重**：#87744、#96834、#87561 等核心可靠性问题已开放 2-3 个月，建议优先调度资源处理。
2. **345 条待合并 PR 形成积压**：大量 PR 已标记 `ready for maintainer look` 但迟迟未获审阅，可能挫伤贡献者积极性。
3. **#133347 迁移数据丢失问题需紧急响应**：作为今日新报告的 P1 数据丢失问题，且影响 2026.8.1 正式版用户，建议立即确认并发布热修复。

---

*本日报由 AI 助手基于 GitHub 公开数据自动生成，仅供参考。数据截至 2026-08-31。*

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告

**报告日期：2026-08-31**
**分析范围：OpenClaw / Zeroclaw / PicoClaw / QwenPaw / hermes-agent / AstrBot**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**高强度的密集迭代期**，头部项目（OpenClaw、hermes-agent）日更新量达 500 条量级，社区参与度极高，但普遍面临**合并吞吐跟不上 Issue 产生速度**的瓶颈。生态内部分化明显：一部分项目（Zeroclaw）进入架构决策驱动期，通过 RFC 流程重构底层设计；另一部分（QwenPaw、AstrBot）保持稳定的功能迭代与 Bug 修复节奏。跨项目来看，**消息可靠投递、成本治理、安全权限模型**是社区呼声最高的三大共性方向，而数据持久化与多语言支持正成为新兴关注点。整体生态处于"功能快速扩张 → 可靠性补课 → 架构分层"的演进通道中。

---

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | 合并/关闭 | Release | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（300 活跃 / 200 关闭） | 500（345 待合并 / 155 合并关闭） | 155 PR + 200 Issue | 无 | 🟡 高活跃但合并瓶颈明显，P1 积压严重 |
| **hermes-agent** | 371（306 活跃 / 65 关闭） | 500（424 待合并 / 76 合并关闭） | 76 PR + 65 Issue | 无 | 🟢 密集迭代，Bug 闭环效率高，健康度良好 |
| **Zeroclaw** | 50（47 活跃 / 3 关闭） | 50（50 待合并 / 0 合并） | 0 PR + 3 Issue | 无 | 🟡 架构决策密集，但交付停滞，PR 合并为 0 |
| **QwenPaw** | 13（10 活跃 / 3 关闭） | 12（8 待合并 / 4 合并关闭） | 4 PR + 3 Issue | 无 | 🟢 节奏健康，响应快，修复路径清晰 |
| **AstrBot** | 4 活跃 | 9 待合并 | 0 | 无 | 🟡 迭代中，PR 储备足但合入节奏待观察 |
| **PicoClaw** | 3 新增 | 1 待合并 | 0 | 无 | 🔴 维护响应慢，PR 搁置 60 天，数据持久化风险 |

> 注：Issue/PR 更新量为过去 24 小时数据；健康度综合合并效率、问题响应速度、积压情况评估。

---

## 3. OpenClaw 在生态中的定位

**OpenClaw 是当前生态中社区规模最大、功能覆盖面最全的"核心参照系"项目**，其日更新量（500 Issue + 500 PR）与 hermes-agent 并列第一梯队，但合并吞吐更高（155 合并关闭 vs hermes-agent 的 76），显示出更强的维护者响应能力。

**核心优势：**
- **全渠道消息聚合能力**：覆盖 Slack、Telegram、WhatsApp、飞书等主流渠道，且具备 Control UI、Gateway、插件系统等完整工程化配套
- **社区参与度极高**：500 条日更新量、300 条活跃 Issue，贡献者生态活跃
- **功能广度领先**：从模型路由（Codex/Claude OAuth）到成本控制、从 UI 体验到安全策略均有涉及

**技术路线差异：**
- 与 **hermes-agent** 相比，OpenClaw 更侧重"多渠道消息网关 + 插件生态"，而 hermes-agent 更侧重"Desktop 应用 + 远程执行 + 本地工具调用"
- 与 **Zeroclaw**（Rust 重写、RFC 驱动）相比，OpenClaw 的架构演进更偏向渐进式修补而非重构
- 与 **QwenPaw**（阿里云生态绑定）相比，OpenClaw 保持云厂商中立

**主要瓶颈：** 345 条待合并 PR 积压、多个 P1 消息丢失类问题开放 2-3 个月未解决，维护者审阅速度成为制约项目进一步发展的关键因素。

---

## 4. 共同关注的技术方向

### 4.1 消息可靠投递与数据持久化（涉及 5 个项目）
| 项目 | 具体诉求 |
|---|---|
| OpenClaw | #87744 Telegram 超时、#131150 Slack 重启丢消息、#133058 子代理投递失败无通知 |
| QwenPaw | #7408 飞书配置被清空、#7402 空文本块污染会话历史 |
| hermes-agent | #93888 会话恢复失败、#94540 网关服务退出 |
| PicoClaw | #3351 自动压缩物理删除 session 原始记录 |
| AstrBot | #9876 Gemini 工具消息重建失败 |

**结论**：消息丢失/数据持久化是跨项目最普遍的 P1 级痛点，直接影响用户信任。

### 4.2 成本治理与模型路由（涉及 3 个项目）
| 项目 | 具体诉求 |
|---|---|
| OpenClaw | #42475 网关层 per-agent 成本预算 |
| hermes-agent | #63815 Copilot 配额耗尽不触发 fallback、#68771 provider 5xx 不触发 fallback 链 |
| QwenPaw | #6825 MCP 超时配置修复 |

**结论**：随着模型调用规模增长，成本上限控制和 fallback 机制成为生产环境刚需。

### 4.3 安全权限模型（涉及 3 个项目）
| 项目 | 具体诉求 |
|---|---|
| OpenClaw | #12678 基于能力的技能/工具权限 |
| Zeroclaw | #6996 细粒度沙箱策略、#10070 SSRF 防护 |
| hermes-agent | #527 Gateway 权限分级（Owner/Admin/User/Guest） |

**结论**：从"全有或全无"的二元授权走向细粒度 RBAC 和沙箱隔离是共同演进方向。

### 4.4 多语言/国际化支持（涉及 2 个项目）
- **OpenClaw**：#48788 多编码文件名处理（飞书中文乱码）
- **hermes-agent**：俄语本地化（3 个 Issue 跟踪）+ 葡萄牙语翻译 PR

**结论**：非英语用户群体增长，i18n 从"可选"变为"必要"。

### 4.5 前端/UI 体验（涉及 3 个项目）
- **QwenPaw**：#7417 流式输出重复文本、#7419 步骤折叠错误
- **AstrBot**：#9871 移动端 Web UI 显示异常
- **PicoClaw**：#3350 低性能设备 Web UI 卡顿

**结论**：Web UI 的响应式设计、渲染性能成为多端适配的共同挑战。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 | 关键差异 |
|---|---|---|---|---|
| **OpenClaw** | 多渠道消息聚合、插件生态、企业级管控 | 个人/团队生产环境 | Gateway + Control UI + 插件系统 | 生态位最全，社区最大，但架构复杂度高 |
| **hermes-agent** | Desktop 应用、远程执行、本地工具调用、i18n | 高级用户/开发者 | Desktop + Gateway + 远程 Agent | 强调"远程 Agent + 本地工具"的混合执行模式 |
| **Zeroclaw** | 架构清晰化、安全边界、Rust 生态 | 开发者/安全敏感场景 | Rust 重写、RFC 驱动、WASM 插件 | 最重视架构分层与安全沙箱，但交付节奏慢 |
| **QwenPaw** | 阿里云生态、Console UI、多 Provider 兼容 | 国内开发者/阿里云用户 | Python + AgentScope 生态 | 与阿里云深度绑定，国内渠道适配好 |
| **AstrBot** | 聊天机器人多平台适配、群聊场景 | 社区/群聊运营者 | 多适配器架构 | 轻量灵活，聚焦聊天场景而非完整 Agent |
| **PicoClaw** | 嵌入式/低资源设备 | IoT/边缘设备用户 | Go 实现、轻量级 | 唯一面向低性能硬件的项目，但维护资源不足 |

---

## 6. 社区热度与成熟度分层

### 第一梯队：快速迭代期（日更新 300+）
- **OpenClaw**：社区规模最大，但合并吞吐成为瓶颈，P1 积压严重
- **hermes-agent**：迭代速度与 OpenClaw 相当，但 Bug 闭环效率更高（cron TypeError 系列 4 个 Issue 快速关闭）

### 第二梯队：架构决策期（日更新 50 左右）
- **Zeroclaw**：RFC 讨论密集（多份 RFC 评论 16-28 条），维护者积极介入，但 PR 合并为 0，处于"厚积薄发"阶段

### 第三梯队：稳定迭代期（日更新 10-20）
- **QwenPaw**：合并节奏健康（4 PR 合并/关闭），Issue 响应快，健康度最佳
- **AstrBot**：PR 储备充足（9 条待合并），但当日无合并，需观察后续节奏

### 第四梯队：维护滞后（日更新 <5）
- **PicoClaw**：PR 搁置 60 天无响应，数据持久化 P1 问题无修复方案，社区贡献者流失风险高

---

## 7. 值得关注的趋势信号

### 7.1 消息可靠性成为智能体生态的"生命线"
从 OpenClaw 的 5 个消息丢失类 P1 Issue 到 PicoClaw 的数据物理删除问题，**"消息是否可靠送达"已超越模型能力，成为用户最关心的核心指标**。智能体从"能用"到"可信"，可靠投递是必须跨越的门槛。

### 7.2 成本治理从"功能"变为"刚需"
OpenClaw #42475（22 评论）和 hermes-agent 的 fallback 缺陷（#63815/#68771）表明，**随着 Agent 规模化部署，模型调用成本失控和配额耗尽后的降级策略已成为企业用户的核心痛点**。网关层成本预算、fallback 链设计将是下一阶段的功能重点。

### 7.3 安全边界从"加固"走向"架构分层"
Zeroclaw 的沙箱策略 RFC、OpenClaw 的能力权限模型、hermes-agent 的 RBAC 需求，共同指向**安全不再是补丁式修复，而是需要从架构层面进行分层设计**。WASM 插件沙箱、细粒度权限、SSRF 防护将成为标配。

### 7.4 国际化需求浮现，非英语用户群体崛起
hermes-agent 的俄语本地化（3 个 Issue）和葡萄牙语 PR、OpenClaw 的多编码处理，表明**开源智能体生态正在从英语主导走向多语言共存**。对开发者而言，i18n 框架的早期设计将决定项目能触达的用户上限。

### 7.5 低资源设备适配成为新战场
PicoClaw 专注的嵌入式设备场景（RV1106、RISC-V）虽然当前维护滞后，但**随着边缘 AI 和 IoT 的发展，轻量级 Agent 在低性能硬件上的流畅运行将成为差异化竞争点**。前端虚拟滚动、增量渲染等优化技术将从中受益。

### 7.6 架构决策驱动成为大型项目演进的必经之路
Zeroclaw 的 RFC 流程（会话所有权、内存生命周期、附件架构）和 hermes-agent 的 god-file 分片政策，表明**当项目规模达到一定程度后，架构清晰化比功能堆砌更重要**。对开发者而言，早期建立 RFC 机制和模块边界，能避免后期重构的高昂成本。

---

*本报告基于 2026-08-31 各项目 GitHub 公开数据生成，数据截至当日 24:00 UTC。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-31

## 1. 今日速览

过去 24 小时项目讨论热度极高：共 50 条 Issue 更新（47 条活跃、3 条关闭）与 50 条 PR 更新（全部待合并），但合并/关闭数为 0，且无新版本发布。社区讨论高度集中在 RFC 架构议题上（会话管理、内存生命周期、附件架构、沙箱策略等），维护者正密集介入多份 RFC 的修订与接管。整体判断：项目处于**架构决策密集期**，讨论活跃但交付节奏暂时放缓；3 个历史 Issue 的关闭（#6565、#10062、#9681）表明部分长期问题已获解决。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日 **0 个 PR 被合并或关闭**，没有代码合入 `master`。但待合并 PR 池中可见多个重要方向的进展：

- **安全传输**：[#10142](https://github.com/zeroclaw-labs/zeroclaw/pull/10142)（zerorelay 安全传输，盲中继 + 原生 mTLS 注册，supersedes #9080）持续推进中，涉及远程 WSS 强制双向 TLS。
- **SSRF 防护**：[#10070](https://github.com/zeroclaw-labs/zeroclaw/pull/10070)（file_download 增加 SSRF 防护与私有主机 opt-in）已重建于最新 master，等待审查。
- **OAuth 支持**：[#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420)（Anthropic 存储 OAuth 配置文件）仍处于 blocked/do-not-merge 状态。
- **ZeroCode 稳定性**：多份 PR（[#10262](https://github.com/zeroclaw-labs/zeroclaw/pull/10262) RPC 连接关闭、[#10260](https://github.com/zeroclaw-labs/zeroclaw/pull/10260) RPC 断开失败、[#10466](https://github.com/zeroclaw-labs/zeroclaw/pull/10466) 丢失的 prompt 完成、[#10380](https://github.com/zeroclaw-labs/zeroclaw/pull/10380) 恢复持久化 ACP 转录）瞄准 TUI 体验修复。

此外，3 个 Issue 今日关闭，均为已解决的 bug/功能项：[#6565](https://github.com/zeroclaw-labs/zeroclaw/issues/6565)（Telegram 工具审批按钮清理）、[#10062](https://github.com/zeroclaw-labs/zeroclaw/issues/10062)（TodoWrite 计划跨会话泄漏）、[#9681](https://github.com/zeroclaw-labs/zeroclaw/issues/9681)（ZeroCode 剪贴板临时文件清理）。

## 4. 社区热点

今日讨论最活跃的 Issue 全部为 RFC 与架构 tracker，评论数领先：

| Issue | 标题 | 评论数 | 核心议题 |
|---|---|---|---|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | RFC: Runtime-owned conversation sessions and transport surface adapters | 28 | 运行时自有会话与传输适配层，涉及 #9488/#9600 所有权边界 |
| [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) | RFC: Decouple memory lifecycle policy from storage backends | 23 | 内存生命周期策略与存储后端解耦 |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | RFC: Unified attachment architecture for web chat and channels | 22 | Web 聊天与渠道的统一附件架构（Rev 9） |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | RFC: Granular sandbox policy — filesystem and network restrictions | 17 | 细粒度沙箱策略（文件系统/网络） |
| [#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396) | RFC: Make wire protocol first-class in provider construction | 16 | 线协议在 provider 构建中的一等公民地位 |
| [#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103) | RFC: separate authoritative memory storage from enrichment connectors | 16 | 权威内存存储与可选增强连接器分离 |
| [#10118](https://github.com/zeroclaw-labs/zeroclaw/issues/10118) | Tracker: Rust anti-slop policy debt remediation | 16 | Rust 反 slop 代码策略债务清理（307 个候选） |

**诉求分析**：社区讨论集中在**架构清晰化**与**安全边界**两大主题。多份 RFC 反复强调"所有权边界"（#9487）、"策略与后端解耦"（#6850）、"沙箱策略分层"（#6996），反映出项目在快速扩张后，维护者与贡献者正致力于建立更清晰的架构分层与安全模型。`needs-maintainer-review` 标签高频出现，说明大量设计决策正在等待维护者拍板。

## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列：

**S1 — 工作流阻塞**

- [#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) `[Bug]: Daemon startup or reload can overflow during agent initialization` — 应用 Quickstart 配置时 Tokio worker 栈溢出，影响 zerocode/tui。状态 `r:needs-repro`，优先级 p1。**疑似对应 fix PR**：[#10262](https://github.com/zeroclaw-labs/zeroclaw/pull/10262)（关闭 RPC 连接并解除 quickstart 卡死）。
- [#10061](https://github.com/zeroclaw-labs/zeroclaw/issues/10061) `[Bug]: Provider-rejected image poisons later turns in a vision-capable session` — 被 provider 拒绝的图片残留在会话历史中，污染后续所有文本轮次。状态 `in-progress` + `accepted`，优先级 p1。**暂无直接 fix PR**。

**S2 — 行为降级**

- [#10062](https://github.com/zeroclaw-labs/zeroclaw/issues/10062) TodoWrite 计划跨 ZeroCode 会话泄漏 — **今日已关闭**，修复已合入。

**安全相关**

- [#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) `[Tracker]: triage and remove bitmaps unmaintained advisory waiver (RUSTSEC-2026-0247)` — `bitmaps 3.2.1` 通过 `imbl` → Matrix SDK dev-dependencies 进入依赖图，Security CI 失败。状态 `blocked`，优先级 p1。
- [#9653](https://github.com/zeroclaw-labs/zeroclaw/issues/9653) `[Bug]: plugin wasi:http trusts only the bundled webpki roots` — 插件 egress 不读取 OS 信任库，与 provider 路径（#6528）不一致。状态 `accepted` + `follow-up`。

**其他已关闭**

- [#9681](https://github.com/zeroclaw-labs/zeroclaw/issues/9681) ZeroCode 剪贴板临时文件清理所有权丢失 — 今日关闭。
- [#6565](https://github.com/zeroclaw-labs/zeroclaw/issues/6565) Telegram 工具审批按钮点击后不清理 — 今日关闭。

## 6. 功能请求与路线图信号

今日无新版本，但大量 RFC 与功能请求为下一版本提供了明确信号：

**高概率进入下一版本（已有对应 PR 在途）**

- **ZeroCode 体验增强**：可点击 URL（[#10386](https://github.com/zeroclaw-labs/zeroclaw/pull/10386)）、工具转录卡片展开（[#10295](https://github.com/zeroclaw-labs/zeroclaw/pull/10295)）、Quickstart 渠道默认值（[#10081](https://github.com/zeroclaw-labs/zeroclaw/pull/10081)）。
- **ACP 会话工具**：[#10468](https://github.com/zeroclaw-labs/zeroclaw/pull/10468) 向会话工具暴露 owned ACP 会话，使 `sessions_current/list/history` 一致。
- **执行树迭代预算**：[#10351](https://github.com/zeroclaw-labs/zeroclaw/pull/10351) 为前台 agent 执行树增加聚合迭代上限。
- **Windows 编码 CLI 环境**：[#10403](https://github.com/zeroclaw-labs/zeroclaw/pull/10403) 统一 Claude/Codex/Gemini/OpenCode 子进程环境变量。

**路线图级 RFC（需维护者决策）**

- 会话与传输架构：[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)、[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)
- 内存生命周期解耦：[#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)、[#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103)
- 沙箱与安全：[#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)、[#10050](https://github.com/zeroclaw-labs/zeroclaw/issues/10050)（verbatim 渠道发送）
- WASM 插件架构：[#7822](https://github.com/zeroclaw-labs/zeroclaw/issues/7822)、[#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076)
- 桌面交互：[#6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909)（Computer-use 桌面屏幕交互）

**新功能请求（无 PR，处于早期）**

- [#10167](https://github.com/zeroclaw-labs/zeroclaw/issues/10167) 厂商中立生命周期导出，供终端复用器集成。
- [#10222](https://github.com/zeroclaw-labs/zeroclaw/issues/10222) 交互式 agent 的 opt-in 单工具 provider 轮次。
- [#9171](https://github.com/zeroclaw-labs/zeroclaw/issues/9171) ZeroCode 修饰键语义与按键字符解耦。
- [#8650](https://github.com/zeroclaw-labs/zeroclaw/issues/8650) ZeroCode 诊断中显示活动日志路径。

## 7. 用户反馈摘要

从今日 Issue 评论与更新中提炼的真实用户声音：

- **Quickstart 配置触发栈溢出**（[#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)）：用户反馈"应用 Quickstart 配置时 Tokio worker 栈溢出"，属于 S1 级工作流阻塞，影响 zerocode/tui 用户。已有对应修复 PR（#10262）在途。
- **视觉会话被污染**（[#10061](https://github.com/zeroclaw-labs/zeroclaw/issues/10061)）：用户描述"provider 拒绝图片后，后续所有文本轮次都会重放该历史图片"，导致会话无法继续使用。该问题已被标记为 accepted + in-progress。
- **Telegram 审批按钮体验**（[#6565](https://github.com/zeroclaw-labs/zeroclaw/issues/6565)）：用户反馈点击审批按钮后"按钮仍可点击、消息文本不变"，要求编辑原消息展示结果。该 Issue 今日关闭（获得 1 👍），说明已解决。
- **TodoWrite 计划泄漏**（[#10062](https://github.com/zeroclaw-labs/zeroclaw/issues/10062)）：用户反馈切换 Code 会话后"旧会话的 TodoWrite/Plan 侧边栏残留"，今日已关闭。
- **RFC 讨论中的维护者接管**：多份 RFC（#9487、#9103、#6909、#7822）出现维护者接管修订，社区贡献者与维护者的协作模式趋于成熟。

## 8. 待处理积压

以下重要 Issue/PR 长期未获响应或处于阻塞状态，建议维护者优先关注：

**长期未决的 RFC（超过 2 个月）**

- [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) RFC: Decouple memory lifecycle policy（2026-05-22 创建，23 评论，`needs-maintainer-review`）
- [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) RFC: Granular sandbox policy（2026-05-28 创建，17 评论，`needs-maintainer-review`）
- [#6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909) RFC: Computer-use desktop support（2026-05-25 创建，14 评论，`needs-maintainer-review`）

**被阻塞的 PR（do-not-merge / blocked）**

- [#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420) Anthropic 存储 OAuth 配置文件（2026-07-26 创建，size:XL，`do-not-merge`）
- [#9772](https://github.com/zeroclaw-labs/zeroclaw/pull/9772) Telegram per_user_session 切换（2026-08-05 创建，size:XL，`do-not-merge`）
- [#10070](https://github.com/zeroclaw-labs/zeroclaw/pull/10070) file_download SSRF 防护（2026-08-18 创建，size:XL，`do-not-merge`）

**等待作者行动（needs-author-action）**

- [#8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965) 声明式技能自动激活（2026-07-11 创建，size:XL，已 restack）
- [#10142](https://github.com/zeroclaw-labs/zeroclaw/pull/10142) zerorelay 安全传输（2026-08-19 创建，size:XL）
- [#10030](https://github.com/zeroclaw-labs/zeroclaw/pull/10030) RPC prompt 路径持久化会话状态（2026-08-16 创建）
- [#9527](https://github.com/zeroclaw-labs/zeroclaw/pull/9527) Rust 工具链升级至 1.98.0（2026-07-29 创建）
- [#9338](https://github.com/zeroclaw-labs/zeroclaw/pull/9338) Crusoe Managed Inference provider（2026-07-24 创建）
- [#9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635) git 子命令风险分类修复（2026-08-01 创建）
- [#10260](https://github.com/zeroclaw-labs/zeroclaw/pull/10260) ZeroCode RPC 断开失败（2026-08-22 创建）

**安全积压**

- [#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) RUSTSEC-2026-0247 advisory waiver 清理（p1，`blocked`，Security CI 持续失败）

---

**项目健康度总结**：社区参与度高、RFC 流程运转良好、维护者积极介入设计讨论；但 PR 合并停滞（今日 0 合并）、大量 XL 级 PR 长期在途、安全 CI 失败未解，交付效率是当前主要风险。建议维护者优先处理 S1 bug 对应 PR（#10262）与安全 advisory（#9899），并推动 2 个月以上 RFC 的决策收敛。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

## PicoClaw 项目动态日报（2026-08-31）

### 1. 今日速览
过去24小时项目活跃度中等偏上：新增3个Issue，1个PR处于待合并状态，无新版本发布。社区反馈集中在三个方向：**数据持久化可靠性**（#3351）、**低性能设备上的Web UI性能**（#3350）以及**QQ频道集成故障**（#3349）。其中#3351涉及用户数据被物理删除的严重问题，需优先关注。PR #3222（deltachat重构）已搁置近两个月，仍待维护者处理。

---

### 2. 版本发布
今日无新版本发布。

---

### 3. 项目进展
今日无合并/关闭的PR。唯一活跃的PR为 **#3222**（待合并），该PR由 @trufae 提交，旨在清理deltachat通道实现并完善文档，净减少约200行代码。主要变更包括：
- 移除遗留特性、回退逻辑及过时测试
- 改用官方中继列表网站，替代硬编码副本
- 废弃基于密码的邮箱配置，密钥统一存于jsonrpc
- 重命名 `invite_link` → `join_invite_link`，新增 `show_invite_link`
- 补充完整的deltachat章节文档

若该PR被合并，将显著降低deltachat通道的维护成本，并提升配置安全性。目前仍处于待审状态，未见维护者响应。

---

### 4. 社区热点
今日无高评论量Issue，但以下两个新Issue反映了较强的用户诉求：

- **#3351 [数据持久化]**：用户发现长对话下session原始记录被自动压缩**物理删除**，即使失忆后也无法找回历史。用户通过源码定位到 `pkg/memory/jsonl.go` 的 `rewriteJSONL` 方法会覆盖整个jsonl文件，而非纯append-only。该问题触及用户对数据安全的核心担忧，虽暂无评论，但严重性高，预计会引发后续讨论。

- **#3350 [性能]**：在嵌入式设备（如RV1106、RISC-V）上运行Launcher时，Web UI输入框随聊天记录增长而严重卡顿。用户质疑为何输入框渲染会受聊天记录长度影响，暗示前端可能存在不必要的全量数据加载或重渲染。该问题对低功耗设备用户影响直接，可能成为优化方向。

---

### 5. Bug 与稳定性
按严重程度排列：

| 严重程度 | Issue | 描述 | 是否有Fix PR |
|---------|-------|------|-------------|
| 🔴 严重 | [#3351](https://github.com/sipeed/picoclaw/issues/3351) | 自动压缩物理删除session原始记录，数据无法找回 | 无 |
| 🟠 中等 | [#3350](https://github.com/sipeed/picoclaw/issues/3350) | 低性能设备上Web UI输入框打字卡顿，CPU飙升 | 无 |
| 🟡 一般 | [#3349](https://github.com/sipeed/picoclaw/issues/3349) | QQ频道无法使用，gateway报错 `Authorization参数格式错误`（code:401, err_code:40011005） | 无 |

其中#3349为功能性故障，影响QQ渠道用户，错误信息指向鉴权头格式问题，可能与QQ开放平台接口变更有关，需尽快排查。

---

### 6. 功能请求与路线图信号
- **数据持久化增强**（#3351）：用户明确要求“真正持久化存储”，暗示当前自动压缩策略过于激进。未来版本可能引入可配置的压缩策略或归档机制，避免物理删除原始记录。
- **前端性能优化**（#3350）：嵌入式设备场景下，Web UI需避免加载全量聊天记录。可能推动前端改为虚拟滚动、分页加载或增量渲染。
- **deltachat通道现代化**（#3222）：该PR已包含多项重构，若被合并，将体现项目对非主流渠道的维护意愿，并可能吸引更多deltachat用户。

---

### 7. 用户反馈摘要
- **数据安全担忧**（#3351）：用户通过直接查看 `.jsonl` 文件确认内容被重写删减，表达了对“失忆后历史无法找回”的强烈不满，认为当前实现违背了持久化存储的预期。
- **性能痛点**（#3350）：用户对输入框卡顿与聊天记录长度强关联感到困惑，期望在低性能硬件上获得流畅的基础交互体验。
- **渠道可用性**（#3349）：用户报告QQ频道在Docker和Linux x86版本均无法使用，表明该问题具有普遍性，且错误信息指向明确的鉴权失败，影响日常使用。

---

### 8. 待处理积压
- **PR #3222**（deltachat重构，创建于2026-07-03，已搁置近60天）：该PR内容完整、变更清晰，但长期未获维护者审核。建议维护者评估并合并，或明确反馈需要调整的部分，避免社区贡献者流失。
- **Issue #3349**（QQ频道故障，创建于2026-08-30）：虽为新增Issue，但属于直接影响用户的功能性bug，且错误信息明确，建议优先处理。

---

**项目健康度评估**：社区反馈活跃，但维护者响应速度有待提升（尤其对PR #3222的长期搁置）。数据持久化问题（#3351）是当前最需关注的风险点，可能影响用户信任。整体项目仍处于功能迭代与稳定性加固并行的阶段。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-31

## 今日速览

过去24小时 QwenPaw 项目保持高活跃度：共产生 13 条 Issue 更新（10 条新开/活跃、3 条已关闭）和 12 条 PR 更新（8 条待合并、4 条已合并/关闭）。值得关注的是，今日有 3 个来自同一贡献者（@guodaxia103）的配套 Bug 报告与修复 PR 同时提交，围绕 PawApp SDK 流清理、运行时不可用降级和生成器状态保留三个紧密相关的稳定性问题，表明社区正在系统性地加固流式传输与异常恢复路径。此外，多个 Console UI 相关问题（消息漂移、步骤折叠、重复文本块）被集中报告，前端交互质量成为当前社区关注焦点。项目整体健康度良好，Issue 响应和 PR 合并节奏均较快。

---

## 版本发布

今日无新版本发布。当前最新版本线为 v2.1.0（稳定版）与 v2.2.0b3（测试版），社区反馈集中在 2.2.0b3 的 Console 前端问题上。

---

## 项目进展

今日有 4 个 PR 被合并/关闭，均为修复类变更：

- **[#6825] fix(mcp): apply configured timeout to client sessions**（已关闭，修复 #6822）— 修复 MCP 客户端会话未继承配置超时的问题。此前 SDK 默认 `None` 超时可能导致断线后请求无限期挂起，该修复为状态化 MCP 客户端正确传递五分钟请求超时，直接解决了 #6822 中"瞬时网络故障永久阻塞对话"的根因。
  https://github.com/agentscope-ai/QwenPaw/pull/6825

- **[#6293] feat(providers): add qwen3.8 to Aliyun Token Plan**（已关闭）— 在阿里云 Token Plan 目录中注册 `qwen3.8-max-preview` 模型，支持文本/图像能力、100 万 token 上下文窗口和 65,536 token 输出上限，扩展了国内和国际版 provider 的模型覆盖。
  https://github.com/agentscope-ai/QwenPaw/pull/6293

- **[#6581] fix(console): avoid redundant multimodal upload warning**（已关闭）— 移除附件上传时重复的"不支持多模态"警告 toast，将警告逻辑提取为纯函数，保留必要的模型能力提示。
  https://github.com/agentscope-ai/QwenPaw/pull/6581

- **[#7191] fix(console): preserve non-ASCII file card names**（已关闭，修复 #7136）— 修复 Console 工具卡片解析器只读取 `filename` 字段导致非 ASCII 文件名显示为 URL 编码乱码的问题，兼容 AgentScope 2.0 的 `name` 序列化字段。
  https://github.com/agentscope-ai/QwenPaw/pull/7191

**整体判断**：今日合并的 PR 集中在 MCP 连接可靠性、Console 文件显示和模型目录扩展三个方向，项目在稳定性修复和生态兼容性上稳步推进。

---

## 社区热点

今日讨论最活跃的 Issue 集中在会话历史与流式输出相关的数据一致性问题：

- **[#7402] 空 output_text 块污染会话历史导致 Ark API 400 错误**（3 条评论）— 用户 @xiaoka76 报告：当模型回合将所有 token 用于推理时，产生空文本块被持久化到会话历史，后续每次请求都会重放该空块，导致 Volcengine Ark Responses API 返回 `400 MissingParameter: input.content.text`。该问题影响所有使用 Ark provider 的会话连续性，已有对应修复 PR #7409。
  https://github.com/agentscope-ai/QwenPaw/issues/7402

- **[#7417] Console 流式输出出现大段重复文本块**（2 条评论）— 用户 @MCQSJ 报告在 2.2.0b3 中，流式输出中途出现大量重复的相同文本块，完成后又在末尾追加一份合并副本。涉及 SSE 事件重放路径，影响阅读体验。
  https://github.com/agentscope-ai/QwenPaw/issues/7417

- **[#7408] 飞书通道配置被意外清空导致 cron 投递失败**（2 条评论）— 用户 @feng183043996 报告运行中的 `agent.json` 中 `channels.feishu` 配置段被清空（`enabled` 变为 false、`app_id` 为空），导致 cron 定时任务报 `KeyError('channel not found: feishu')`。备份对比显示 8 月 29 日 06:30 配置仍正常，疑似运行时写回逻辑存在竞态或误覆盖。
  https://github.com/agentscope-ai/QwenPaw/issues/7408

**诉求分析**：三个热点问题均指向"数据持久化与恢复"的可靠性——会话历史、通道配置、流式输出的一致性。社区对配置安全和会话连续性的信任度较为敏感，建议维护者优先排查配置写回路径和会话序列化逻辑。

---

## Bug 与稳定性

按严重程度排列今日报告的 Bug：

| 严重度 | Issue | 描述 | 状态 |
|--------|-------|------|------|
| 🔴 高 | [#7402] | 空 output_text 块持久化后污染所有后续请求，Ark API 返回 400，会话完全不可用 | 开放，已有修复 PR #7409 |
| 🔴 高 | [#7408] | 飞书通道配置被意外清空（enabled=false/app_id 空），cron 投递报 KeyError，通道停用 | 开放，无修复 PR |
| 🟠 中 | [#7417] | Console 流式输出出现大段重复文本块，完成后追加合并副本 | 开放，无修复 PR |
| 🟠 中 | [#7410] | 异步生成器关闭时跳过取消状态持久化，部分输出/工具状态可能丢失 | 开放，已有修复 PR #7413 |
| 🟠 中 | [#7411] | PawApp 聊天运行时不可用时回退返回合成响应，缺失运行时被误认为模型成功响应 | 开放，已有修复 PR #7414 |
| 🟠 中 | [#7412] | PawApp SDK 流清理可能阻塞在 stalled reader.cancel，或竞态终止 | 开放，已有修复 PR #7415 |
| 🟡 低 | [#7407] | Console 消息漂移到错误 agent（用户确认遇到，内容由 AI 生成草稿） | 开放，待复现确认 |
| 🟡 低 | [#7419] | 步骤折叠手风琴错误折叠整个回合的所有消息（含穿插的助手文本），而非仅连续工具调用 | 开放，无修复 PR |
| ✅ 已修复 | [#6822] | MCP 瞬时断网后自动重连仍永久阻塞对话 | 已关闭，修复 PR #6825 已合并 |
| ✅ 已修复 | [#6785] | Profile 分类硬编码官方 persona 文件，自定义 .md 无法切换（回归） | 已关闭 |

**稳定性趋势**：今日新增的 3 个 PawApp 相关 Bug（#7410/#7411/#7412）均已有对应修复 PR（#7413/#7414/#7415），且由同一贡献者提交，修复路径清晰。但 #7408（配置被清空）和 #7417（流式重复）尚无修复方案，需重点关注。

---

## 功能请求与路线图信号

- **[#7404] 在 Console 钉钉通道设置中暴露 card_auto_layout 选项** — 该功能自 #2238 起已在后端支持，但 Console UI 和文档均未暴露，用户只能阅读源码才能发现。已有对应 PR #7416 提交，预计很快合入。
  https://github.com/agentscope-ai/QwenPaw/issues/7404

- **[#7406] 官方主题支持（强调色、字体、间距配置）** — 用户 @Skepticwise 请求为 QwenPaw Desktop 增加主题配置能力，当前 UI 锁定单一橙色强调色（#f07e26），用户只能手动修改 .app 包内 index.html 定制，且每次更新都会丢失。该请求反映了桌面端用户对个性化外观的明确需求。
  https://github.com/agentscope-ai/QwenPaw/issues/7406

- **[#7183] 工作区级 Skills 预加载配置**（PR，待合并）— 为可信核心或高频使用的 Skills 增加 opt-in 的 `preload` 设置，设计参考 Claude Code subagents 的预加载机制。该 PR 已开放 11 天，仍在审查中。
  https://github.com/agentscope-ai/QwenPaw/pull/7183

- **[#6399] ReMeLightMemoryCard 增加 reranker UI 配置面板**（PR，待合并）— 为记忆卡片的 reranker 后端功能提供可视化配置面板，已开放 39 天，仍在审查中。
  https://github.com/agentscope-ai/QwenPaw/pull/6399

**路线图信号**：Console 配置项的完整暴露（钉钉卡片布局、reranker）是当前 UI 完善的主要方向；主题支持和 Skills 预加载则指向桌面端体验优化和高级用户效率提升。

---

## 用户反馈摘要

- **会话历史可靠性是核心痛点**：多个用户报告会话历史中的异常数据（空文本块、重复文本）会持续影响后续请求，且错误信息不直观（如 Ark 400 错误未指明是历史数据问题）。用户 @xiaoka76 明确表示"每个后续请求都被污染"，对会话连续性体验影响较大。

- **配置安全引发信任问题**：用户 @feng183043996 对飞书通道配置被静默清空表示困惑，备份对比显示配置在运行中发生变化，但无任何日志或提示。这类"静默配置丢失"问题对生产环境用户伤害较大。

- **Console 前端体验问题集中**：用户 @MCQSJ 连续提交了 3 个 Console 相关问题（#7417 重复文本、#7419 步骤折叠、#6785 persona 回归），且均在 2.2.0b3 测试版中报告，说明测试版用户对前端交互细节有较高期待，反馈积极。

- **PawApp SDK 稳定性受关注**：贡献者 @guodaxia103 系统性地提交了 3 组 Bug+修复，关注流取消、运行时降级和状态持久化，表明开发者社区正在主动加固 SDK 的边缘场景行为。

---

## 待处理积压

- **[#6399] reranker UI 配置面板 PR** — 已开放 39 天（自 7 月 23 日），仍在审查中。该 PR 为记忆卡片功能的重要 UI 补充，长时间未合入可能阻塞依赖它的用户。
  https://github.com/agentscope-ai/QwenPaw/pull/6399

- **[#6889] fix(console): preserve textarea target for IME events** — 已开放 20 天（自 8 月 11 日），修复中文输入法（IME）组合事件在 Lexical contenteditable 中的兼容问题。对中文用户影响较大，建议优先审查。
  https://github.com/agentscope-ai/QwenPaw/pull/6889

- **[#7183] workspace-scoped Skills preload 配置 PR** — 已开放 11 天，功能设计完整且有参考实现，但尚未获得合并。若项目计划在下一版本引入 Skills 预加载机制，需加快审查节奏。
  https://github.com/agentscope-ai/QwenPaw/pull/7183

- **[#7408] 飞书通道配置被意外清空** — 严重度高且无修复 PR，涉及配置持久化可靠性，建议维护者尽快排查 `agent.json` 写回路径是否存在竞态条件。
  https://github.com/agentscope-ai/QwenPaw/issues/7408

---

*本日报由 AI 分析师基于 GitHub 公开数据自动生成，数据截至 2026-08-31 24:00 UTC。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报 — 2026-08-31

## 1. 今日速览

hermes-agent 在 2026-08-31 保持极高活跃度：24 小时内产生 **371 条 Issue 更新**（306 条新开/活跃、65 条关闭）与 **500 条 PR 更新**（424 条待合并、76 条合并/关闭），无新版本发布。当前有 1 个 P0 级 PR（[#98811](https://github.com/NousResearch/hermes-agent/pull/98811)）待合并，2 个 P1 级 Bug 处于开放状态（[#93888](https://github.com/NousResearch/hermes-agent/issues/93888)、[#94248](https://github.com/NousResearch/hermes-agent/issues/94248)）。社区对俄罗斯语本地化、远程 Agent 执行、权限分级等功能的讨论持续升温。整体来看，项目处于密集迭代期，Bug 修复与功能开发并行推进，健康度良好。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日共有 **76 个 PR 被合并/关闭、65 个 Issue 被关闭**。从已关闭的 Issue 看，以下重要工作已完成：

- **大型文件分解史诗完成**：[#78647](https://github.com/NousResearch/hermes-agent/issues/78647)（20/20 done）——仓库级 god-file 分片政策落地，所有 god files 已拆分为干净模块，且明确"永不回退"。
- **cron TypeError 系列 Bug 修复**：[#7142](https://github.com/NousResearch/hermes-agent/issues/7142)（[TESTED FIX]）、[#66824](https://github.com/NousResearch/hermes-agent/issues/66824)、[#71987](https://github.com/NousResearch/hermes-agent/issues/71987)、[#71993](https://github.com/NousResearch/hermes-agent/issues/71993) 均关闭——`repeat='once'/'forever'` 字符串与 int 比较崩溃问题已修复。
- **桌面端 workspace 选择功能落地**：[#40297](https://github.com/NousResearch/hermes-agent/issues/40297) 关闭——Desktop 现支持按会话选择工作目录，不再局限于启动时的 `--cwd`。
- **代理配置文件功能实现**：[#9459](https://github.com/NousResearch/hermes-agent/issues/9459) 关闭——`delegate_task` 支持从 `config.yaml` 中命名代理配置生成子代理。
- **Windows Desktop 更新中止问题修复**：[#96360](https://github.com/NousResearch/hermes-agent/issues/96360) 关闭——不再因无关 SCM 服务的 `STOP_PENDING` 状态中止更新。
- **custom_providers extra_body 丢失修复**：[#54922](https://github.com/NousResearch/hermes-agent/issues/54922) 关闭——网关/消息路径不再静默丢弃 `extra_body`。

**值得关注的新提交 PR**（今日创建）：

- [#98937](https://github.com/NousResearch/hermes-agent/pull/98937) fix(a2a)：加固 replay 重试与 profile 隔离——绑定 A2A 推送签名到时间戳和 delivery ID，支持隔离 profile 禁用全局 auth store 回退。

**待合并的重要 PR**（方向性信号）：

- [#98811](https://github.com/NousResearch/hermes-agent/pull/98811)（P0）修复缓存亲和键路径，解决 Hermes Studio 群聊会话键缺失问题。
- [#98935](https://github.com/NousResearch/hermes-agent/pull/98935) 修复 `_fts_table_probe` 对无效 UTF-8 字节的崩溃，保护 SessionDB 只读端点。
- [#98930](https://github.com/NousResearch/hermes-agent/pull/98930) 修复进程注册表 FD 泄漏——后台进程结束后立即释放 Popen/PTY 句柄。
- [#98929](https://github.com/NousResearch/hermes-agent/pull/98929) OpenAI 额度耗尽错误码归类为 billing，不再盲目重试。
- [#98928](https://github.com/NousResearch/hermes-agent/pull/98928) Gemini 工具 schema 支持完整 JSON Schema（`parametersJsonSchema`），修复 MCP 工具 400 错误。
- [#96458](https://github.com/NousResearch/hermes-agent/pull/96458) 修复测试套件在原生 Windows 上的 227 个失败文件，并启用 Windows CI 全量测试。

## 4. 社区热点

今日讨论最活跃的 Issues 集中在自动化可靠性、架构重构和权限模型上：

- **[#66616](https://github.com/NousResearch/hermes-agent/issues/66616)（125 评论）**：skills-index-watchdog 自动化探针失败，索引已 29.8h 未更新（限制 26h）。这是今日评论量最高的 Issue，反映社区对自动化运维链路（cron 构建 → 部署 → 探针）稳定性的高度关注。
- **[#78647](https://github.com/NousResearch/hermes-agent/issues/78647)（79 评论，已关闭）**：大型文件分解史诗完成。社区对 god-file 分片政策讨论热烈，最终 20/20 全部完成，是架构治理的重要里程碑。
- **[#88584](https://github.com/NousResearch/hermes-agent/issues/88584)（45 评论）**：Nous-to-Enterkey 自动集成被 `cron/jobs.py` 冲突阻塞。跨仓库协作的 pipeline 稳定性成为社区关注点。
- **[#527](https://github.com/NousResearch/hermes-agent/issues/527)（20 评论，👍 13）**：Gateway 权限分级（Owner/Admin/User/Guest）功能请求。社区对细粒度 RBAC 的需求强烈，当前二元授权模型（全有或全无）被认为不可持续。
- **[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)（17 评论，👍 27）**：远程 Hermes Agent + 本地工具执行。这是社区高赞需求，用户希望在保持本地工具执行的同时使用远程 Agent 的 skills/memory/sessions。

## 5. Bug 与稳定性

按严重程度排列：

**P0（待合并修复）**

- **[#98811](https://github.com/NousResearch/hermes-agent/pull/98811)（PR）**：缓存亲和键路径未 honor 主机声明的会话键，导致 Hermes Studio 群聊场景缓存异常。已有修复 PR 待合并。

**P1（开放中）**

- **[#93888](https://github.com/NousResearch/hermes-agent/issues/93888)**：Desktop 发送本地运行时 ID 到远程网关，导致存储会话无法恢复，用户会永久卡在 "Restore failed — Session not found"。影响会话恢复核心链路。
- **[#94248](https://github.com/NousResearch/hermes-agent/issues/94248)**：macOS arm64 上 Gateway 在 delegate 截止时间后 17-72ms 内 SIGSEGV 崩溃，已有 12 份 Apple crash 报告（5 份集中在 08-24）。疑似与 Codex SSL 读取相关。

**P1（已关闭）**

- **[#96360](https://github.com/NousResearch/hermes-agent/issues/96360)**：Windows Desktop 更新因无关 SCM 服务 STOP_PENDING 中止，已修复。

**P2（开放中，按影响面排序）**

- **[#94540](https://github.com/NousResearch/hermes-agent/issues/94540)**：`hermes update` 后 launchd 托管的 7 个网关服务全部退出 75 且不再重生，即使 `KeepAlive=true`。
- **[#87654](https://github.com/NousResearch/hermes-agent/issues/87654)**：`vision_analyze`/`browser_vision` 在首次可用性探测后从会话中消失，`_AuxProbeClientStub` 被错误缓存。
- **[#92095](https://github.com/NousResearch/hermes-agent/issues/92095)**：uv 安装下 `.desktop` 的 `Exec=` 指向裸 uv 解释器，点击图标静默失败。
- **[#48000](https://github.com/NousResearch/hermes-agent/issues/48000)**：kanban workers（`chat -q`）绕过限流/失败退出码映射，瞬时 provider 故障会触发熔断器。
- **[#68771](https://github.com/NousResearch/hermes-agent/issues/68771)**：provider 返回 503 容量超限时只重试不触发 fallback 链。
- **[#63815](https://github.com/NousResearch/hermes-agent/issues/63815)**：Copilot 月度配额耗尽时 fallback providers 不触发。
- **[#32660](https://github.com/NousResearch/hermes-agent/issues/32660)**：自定义 Ollama 端点的 API 调用缺少 tools 数组（需复现）。
- **[#73997](https://github.com/NousResearch/hermes-agent/issues/73997)**：`mcp login` 内部重试在固定 `oauth.redirect_port` 上自碰撞，掩盖真实认证错误。
- **[#24293](https://github.com/NousResearch/hermes-agent/issues/24293)**：自定义 provider 在 Cloudflare WAF 后因 SDK User-Agent 返回 403。

**已修复的 Bug 系列**

- cron `repeat` 字符串比较 TypeError（[#7142](https://github.com/NousResearch/hermes-agent/issues/7142)、[#66824](https://github.com/NousResearch/hermes-agent/issues/66824)、[#71987](https://github.com/NousResearch/hermes-agent/issues/71987)、[#71993](https://github.com/NousResearch/hermes-agent/issues/71993)）——4 个重复报告全部关闭，修复已验证。
- custom_providers `extra_body` 被静默丢弃（[#54922](https://github.com/NousResearch/hermes-agent/issues/54922)）——已关闭。

## 6. 功能请求与路线图信号

**高热度功能请求（可能进入下一版本）**

- **俄罗斯语本地化**：[#40347](https://github.com/NousResearch/hermes-agent/issues/40347)（安装器已可用）、[#52137](https://github.com/NousResearch/hermes-agent/issues/52137)、[#84418](https://github.com/NousResearch/hermes-agent/issues/84418) 三个 Issue 同时跟踪。同时今日有 **[#98933](https://github.com/NousResearch/hermes-agent/pull/98933) 葡萄牙语（pt-br）翻译 PR** 提交，说明 i18n 框架正在快速扩展，俄语大概率进入下一版本。
- **远程 Agent + 本地工具执行**：[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)（👍 27）——社区高赞需求，目前无对应 PR，但讨论热度持续。
- **Gateway 权限分级**：[#527](https://github.com/NousResearch/hermes-agent/issues/527)（👍 13）——RBAC 需求明确，涉及 Telegram/Discord/Slack/WhatsApp 多平台，需要决策。

**新 PR 暗示的路线图方向**

- **[#94266](https://github.com/NousResearch/hermes-agent/pull/94266)**：Hermes Collective Wisdom Agent V1——完整的本地贡献与托管消费循环，包含候选资格、所有者审核发布、安装、兼容性检查、更新通知等。
- **[#98470](https://github.com/NousResearch/hermes-agent/pull/98470)**：worker 协作契约层——JSON-safe 的契约机制，使证据、目标、能力、共识、worker 模式显式化且 fail-closed。
- **[#98927](https://github.com/NousResearch/hermes-agent/pull/98927)**：严格自动 checkpoint 运行器——会话级审查检查点，可门控工具计划执行和候选最终答案。
- **[#98932](https://github.com/NousResearch/hermes-agent/pull/98932)**：网关排他性入站插件接纳缝——外部插件可在正常 agent 分发前持久化接受标准化消息。
- **[#95163](https://github.com/NousResearch/hermes-agent/issues/95163)**：后端托管群组房间——网关侧 round driver + 权威房间日志，解决桌面渲染器单点编排问题。

## 7. 用户反馈摘要

- **俄语用户群体需求明确**：多个独立用户（[@warment](https://github.com/warment)、[@satspace-cpu](https://github.com/satspace-cpu)、[@ASB-MSK](https://github.com/ASB-MSK)）提交了俄语本地化请求，且 [#40347](https://github.com/NousResearch/hermes-agent/issues/40347) 已提供 99% 翻译的安装器。非英语用户群体正在增长。
- **远程执行是高频场景**：[#18715](https://github.com/NousResearch/hermes-agent/issues/18715) 获得 27 个 👍，用户明确描述了"机器 A 本地客户端 + 机器 B 远程 Agent"的使用场景，希望工具执行留在本地。
- **权限模型被多次吐槽**：[#527](https://github.com/NousResearch/hermes-agent/issues/527) 指出当前"全有或全无"的授权模型无法满足多用户 Messenger 平台场景，13 个 👍 表明企业/团队用户对此有强烈需求。
- **cron 工具稳定性问题影响面广**：4 个独立 Issue 报告同一 TypeError（[#7142](https://github.com/NousResearch/hermes-agent/issues/7142)、[#66824](https://github.com/NousResearch/hermes-agent/issues/66824)、[#71987](https://github.com/NousResearch/hermes-agent/issues/71987)、[#71993](https://github.com/NousResearch/hermes-agent/issues/71993)），用户对修复表示满意（多个标注 TESTED FIX）。
- **桌面端体验问题集中**：workspace 选择（[#40297](https://github.com/NousResearch/hermes-agent/issues/40297)，👍 13）已实现；但新的 .desktop 启动器损坏（[#92095](https://github.com/NousResearch/hermes-agent/issues/92095)）和会话恢复失败（[#93888](https://github.com/NousResearch/hermes-agent/issues/93888)）可能引发新的不满。

## 8. 待处理积压

以下重要 Issue 长期未关闭，提醒维护者关注：

- **[#527](https://github.com/NousResearch/hermes-agent/issues/527)**（2026-03-06 创建，近 6 个月）：Gateway 权限分级，👍 13，`needs-decision` 标签——长期悬而未决，社区关注度高。
- **[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)**（2026-05-02 创建，👍 27）：远程 Agent + 本地工具执行——社区最高赞的开放功能请求。
- **[#24293](https://github.com/NousResearch/hermes-agent/issues/24293)**（2026-05-12 创建）：Cloudflare WAF 403 问题——影响所有使用自定义 provider 且位于 WAF 后的用户。
- **[#31776](https://github.com/NousResearch/hermes-agent/issues/31776)**（2026-05-25 创建）：Hindsight 内存工具多 bank 路由——内存管理高级功能。
- **[#32660](https://github.com/NousResearch/hermes-agent/issues/32660)**（2026-05-26 创建，`needs-repro`）：Ollama 自定义端点 tools 数组缺失——等待复现。
- **[#48000](https://github.com/NousResearch/hermes-agent/issues/48000)**（2026-06-17 创建）：kanban workers 绕过限流/失败码映射——可能导致熔断器误触发。
- **[#63815](https://github.com/NousResearch/hermes-agent/issues/63815)**（2026-07-13 创建）：Copilot 配额耗尽不触发 fallback——影响 Copilot 用户的生产可用性。
- **[#68771](https://github.com/NousResearch/hermes-agent/issues/68771)**（2026-07-21 创建）：provider 5xx 不触发 fallback 链——与 #63815 同属 fallback 机制缺陷。
- **[#73997](https://github.com/NousResearch/hermes-agent/issues/73997)**（2026-07-29 创建）：`mcp login` 重试自碰撞——影响 MCP 认证流程的可靠性。
- **[#87654](https://github.com/NousResearch/hermes-agent/issues/87654)**（2026-08-16 创建）：Vision 工具在首次探测后消失——影响视觉相关功能的稳定性。

---

**日报总结**：hermes-agent 项目正处于高强度的迭代周期，Bug 修复效率高（cron TypeError 系列、Windows 更新问题均快速闭环），功能开发活跃（i18n 扩展、worker 协作契约、checkpoint 机制等新 PR 密集提交）。需要重点关注的是 2 个 P1 级开放 Bug（会话恢复失败、Gateway SIGSEGV）以及长期积压的高赞功能请求（权限分级、远程执行）。项目整体健康度良好，社区参与度高。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

## AstrBot 项目动态日报 — 2026-08-31

### 1. 今日速览

过去24小时项目活跃度较高：新增/活跃 Issue 4 条，待合并 PR 9 条，无新版本发布。Issue 集中在 Web UI 移动端适配、飞书适配器能力扩展、GIF 多帧理解及 Gemini Provider 历史重建 Bug；PR 侧则覆盖图片格式适配、上下文压缩、QQ 官方平台流式回复修复等方向。整体看，项目正处于功能迭代与稳定性修复并行的阶段，社区反馈响应及时，但尚无 PR 被合并，需关注后续合入节奏。

---

### 2. 版本发布

无新版本发布。

---

### 3. 项目进展

今日无 PR 被合并或关闭，但 9 条待合并 PR 中多条已进入最后更新阶段，值得关注：

- **图片格式自动适配**（[#9703](https://github.com/AstrBotDevs/AstrBot/pull/9703)）：为 Provider 增加 `supported_image_formats` 属性，发送前自动转换图片格式，并支持动图策略与本地转换缓存。解决 xAI 等仅支持 JPEG/PNG 的兼容性问题，关联 issue #9295。
- **手动上下文压缩**（[#9795](https://github.com/AstrBotDevs/AstrBot/pull/9795)）：新增 `/compact` 命令，允许用户在达到自动压缩阈值前手动触发 LLM 上下文压缩，为本地 Agent Runner 提供更精细的控制。
- **Gemini 历史图片引用修复**（[#9874](https://github.com/AstrBotDevs/AstrBot/pull/9874)）：修复 Gemini 适配器在历史记录含本地图片路径时误判为 base64 导致请求失败的问题。
- **QQ 官方平台流式回复截断修复**（[#9875](https://github.com/AstrBotDevs/AstrBot/pull/9875)）：修复上游 LLM 流提前结束或异常时，C2C 流式回复被截断的问题。
- **飞书命令识别修复**（[#9872](https://github.com/AstrBotDevs/AstrBot/pull/9872)）：修复群聊中 `@bot /stop` 等命令因保留 mention 前缀而无法识别的问题，修复 #9848。

这些 PR 若合入，将显著提升多 Provider 兼容性、群聊体验与平台适配完整性。

---

### 4. 社区热点

- **[#9871 Web UI 技能编辑弹窗移动端显示异常](https://github.com/AstrBotDevs/AstrBot/issues/9871)**（评论 7 条）：今日最热 Issue。用户反馈在移动端（Via 浏览器）打开技能配置窗口时，界面元素严重挤压、编辑器不可见，且底部按钮与固定按钮重叠。该 Issue 已由作者 @mantoujun12 提交对应修复 PR [#9873](https://github.com/AstrBotDevs/AstrBot/pull/9873)，采用临时方案（小屏全屏化）解决，并开放讨论更优方案。背后诉求是移动端管理体验的完善，反映 Web UI 在响应式设计上的不足。

---

### 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue | 描述 | 修复 PR |
|---------|-------|------|---------|
| 高 | [#9876](https://github.com/AstrBotDevs/AstrBot/issues/9876) | Gemini Provider 重建工具消息时错误使用 `tool_call_id` 作为 `functionResponse.name`，导致函数调用历史配对失败（400 错误） | 无（讨论中） |
| 中 | [#9854](https://github.com/AstrBotDevs/AstrBot/issues/9854) | 群聊上下文图片理解对 GIF 未做多帧处理，仅获得静态帧描述 | 无 |
| 中 | [#9871](https://github.com/AstrBotDevs/AstrBot/issues/9871) | Web UI 技能编辑弹窗在移动端显示异常，元素重叠、编辑器不可见 | [#9873](https://github.com/AstrBotDevs/AstrBot/pull/9873)（临时方案） |

其中 #9876 影响 Gemini 用户的多轮工具调用，建议优先排查；#9854 影响群聊 GIF 动图理解场景，需在 Provider 层或预处理层增加抽帧逻辑。

---

### 6. 功能请求与路线图信号

- **[#9870 飞书适配器支持更多事件](https://github.com/AstrBotDevs/AstrBot/issues/9870)**：用户建议飞书适配器除用户消息外，支持云文档评论、妙记生成等事件，并引入官方 Channel SDK 处理卡片交互。该请求指向办公自动化场景，若采纳将显著扩展飞书适配器的应用边界。
- **图片格式自动适配（[#9703](https://github.com/AstrBotDevs/AstrBot/pull/9703)）**：虽为 PR，但本质是响应多 Provider 图片格式兼容需求，可能成为下一版本的核心能力之一。
- **手动上下文压缩（[#9795](https://github.com/AstrBotDevs/AstrBot/pull/9795)）**：用户对上下文管理的精细化需求，属于 Agent 可用性增强方向。

以上信号表明，社区对多平台适配、移动端体验、上下文控制三方面的需求较为集中。

---

### 7. 用户反馈摘要

- **移动端体验痛点**（[#9871](https://github.com/AstrBotDevs/AstrBot/issues/9871)）：用户明确描述“文件夹树占比较大，编辑器完全不可见”“按钮重合”，说明当前 Web UI 在窄屏设备上可用性较差，且该问题影响技能配置这一核心操作。
- **GIF 理解局限**（[#9854](https://github.com/AstrBotDevs/AstrBot/issues/9854)）：用户测试了 QQ 动画表情场景，确认问题不在协议端，而是 AstrBot 未对 GIF 做抽帧处理，导致视觉模型只能描述静态画面。用户期望能理解动作与表情变化。
- **Gemini 工具调用失败**（[#9876](https://github.com/AstrBotDevs/AstrBot/issues/9876)）：用户定位到根因是 `tool_call_id` 与函数名混淆，说明历史重建逻辑对不透明 ID 处理存在缺陷，影响多轮工具调用链路的稳定性。

---

### 8. 待处理积压

- **[#9703 图片格式适配 PR](https://github.com/AstrBotDevs/AstrBot/pull/9703)**：创建于 8 月 15 日，已持续 16 天未合并，涉及 core/provider 多处改动，建议维护者评估合入计划。
- **[#9854 GIF 多帧处理 Issue](https://github.com/AstrBotDevs/AstrBot/issues/9854)**：创建于 8 月 28 日，目前无明确修复方案或 PR 关联，建议在 Provider 层或预处理层规划抽帧策略。
- **[#9876 Gemini 工具消息重建 Bug](https://github.com/AstrBotDevs/AstrBot/issues/9876)**：虽为今日新报，但影响函数调用核心链路，建议尽快确认修复方案。

---

**总结**：AstrBot 项目当前处于功能扩展与稳定性加固并行期，社区反馈活跃，PR 储备充足但合入速度需关注。移动端体验、多 Provider 兼容性、上下文管理是近期热点方向，建议维护者优先处理 Gemini 工具调用 Bug 与 GIF 多帧理解问题，并推动积压 PR 的审查与合并。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*