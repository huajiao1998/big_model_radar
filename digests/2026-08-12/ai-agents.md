# OpenClaw 生态日报 2026-08-12

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-11 22:31 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-12

## 今日速览

过去24小时内，OpenClaw 项目保持了极高的社区活跃度：**500条 Issue 更新、500条 PR 更新**，其中新开/活跃 Issue 占比达 79%（395/500），PR 合并/关闭率为 40.4%（202/500）。暂无新版本发布。社区讨论集中在**静默回复失败复发（#121058，60条评论）**与**记忆信任标签功能请求（#7707，37条评论）**两个长期议题上，反映出用户对对话可靠性与安全性的高度关注。项目整体处于**高频迭代状态**，但高优先级 Bug 积压数量仍然较多，维护者评审压力较大。

## 项目进展

今日合并/关闭的 PR 以小型修复为主，覆盖 UI 体验、渠道兼容性、插件发布可靠性及测试稳定性，未见大型架构性改动落地。

| PR | 说明 | 价值 |
|---|---|---|
| [#122291](https://github.com/openclaw/openclaw/pull/122291) | 修复 Control UI 中行内代码标点脱离的问题 | Web UI 阅读体验修正 |
| [#122306](https://github.com/openclaw/openclaw/pull/122306) | Google Meet 插件导出改为原子发布，避免截断旧产物 | 插件数据安全性提升 |
| [#122279](https://github.com/openclaw/openclaw/pull/122279) | 让媒体转码池饱和测试确定性化 | CI 稳定性提升 |
| [#122009](https://github.com/openclaw/openclaw/pull/122009) | 多渠道（Telegram/Discord/Slack/Signal/WhatsApp）在 agent 运行失败后保留已发送的错误反应状态 | 渠道反馈一致性问题修复 |
| [#122287](https://github.com/openclaw/openclaw/pull/122287) | 在工具活动中准确标注新创建文件为 "Created" 而非 "Edited" | Web UI 信息准确性提升 |

整体来看，今日合并的 PR 多为**体验修正式的小步快跑**，项目核心运行机制没有发生大的变更，但渠道层和 UI 层的细节在持续打磨。

## 社区热点

### 🔥 #121058 — Silent reply failures still recurring after #116277 closed（60条评论）
[#121058](https://github.com/openclaw/openclaw/issues/121058)

**现象**：此前的静默回复失败问题在 #116277 关闭后依然反复出现，监控 cron 持续记录到新的失败事件。**分析**：用户对"声称已修复但问题复发"表达了明显不满，评论区包含多次尝试并提供新日志但未能获得有效响应的信息。该问题已成为当前社区最关注的可靠性议题。

### 🔥 #7707 — Memory Trust Tagging by Source（37条评论）
[#7707](https://github.com/openclaw/openclaw/issues/7707)

**现象**：提出为记忆条目按来源（用户命令、网页抓取、第三方技能）添加信任级别标签，以防记忆投毒攻击。**分析**：评论区有大量关于攻击面具体场景的讨论（如恶意网页指令通过记忆持久化影响 agent 行为），已有多位用户参与方案设计，属于社区呼声较高的安全增强需求。

### 🔥 #42475 — Per-agent cost budget enforcement（20条评论）
[#42475](https://github.com/openclaw/openclaw/issues/42475)

**现象**：请求在网关层强制实施每个 agent 的日/月成本上限。**分析**：结合 [#119009](https://github.com/openclaw/openclaw/issues/119009)（一次重试循环产生 $204 费用的案例），社区对成本失控的焦虑已经从"建议"变为"迫切需求"。

### 🔥 #48788 — Centralized filename encoding utility（19条评论）
[#48788](https://github.com/openclaw/openclaw/issues/48788)

**现象**：建议为多编码 Content-Disposition 处理（Shift-JIS、EUC-KR、GB18030 等）建立统一的文件名编码工具。**分析**：该议题由飞书中文文件名乱码问题（PR #48578）延伸而来，体现出国际化用户群体的真实需求。

### 🔥 #87744 — Codex-backed Telegram turns time out（17条评论）
[#87744](https://github.com/openclaw/openclaw/issues/87744)

**现象**：Codex 后端的会话反复等待 `turn/completed` 超时，Telegram 会话无法拿到最终答案。**分析**：此问题标记为 P1，且已经持续两个多月仍未解决，社区对其耐心正在降低。

## Bug 与稳定性

今日报告的 Bug 集中在**会话状态丢失、静默失败、渠道消息送达异常、进程资源泄漏**四大类。按严重程度排列如下：

### 🔴 P0 — 崩溃/启动失败

- **[#121675](https://github.com/openclaw/openclaw/issues/121675)（已关闭）**：`2026.8.1-beta.1` 发布时未同步发布配套的 `@openclaw/*` 插件，导致启动收敛保护进入不可恢复的引导循环。已关闭，但暴露了发布流程中插件同步的缺口。

### 🟠 P1 — 核心功能异常（部分已有 PR）

| Issue | 简述 | Fix PR |
|---|---|---|
| [#97983](https://github.com/openclaw/openclaw/issues/97983) | iOS/WebChat 消息追加到转录但不触发助手回复 | 无 |
| [#84516](https://github.com/openclaw/openclaw/issues/84516) | Codex 长回复在 1000-1100 字符处静默截断 | 无 |
| [#74586](https://github.com/openclaw/openclaw/issues/74586) | memory_search 工具调用被中止且被误判为超时 | 无 |
| [#53408](https://github.com/openclaw/openclaw/issues/53408) | 长对话后 write/exec 工具参数被静默丢弃 | 无 |
| [#39476](https://github.com/openclaw/openclaw/issues/39476) | A2A sessions_send 造成重复消息 | 无（有 linked PR） |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | hook/tool 子进程泄漏，僵尸进程堆积 | 无 |
| [#87744](https://github.com/openclaw/openclaw/issues/87744) | Codex 后端 Telegram 反复超时 | 无 |
| [#121058](https://github.com/openclaw/openclaw/issues/121058) | 静默回复失败复发 | 无（#116277 修复无效） |

### 🟡 P2 — 功能异常/回归

- [#42820](https://github.com/openclaw/openclaw/issues/42820)：飞书消息工具受 poll schema 污染，无法发送纯文件
- [#58957](https://github.com/openclaw/openclaw/issues/58957)：模型切换时上下文过大导致静默失败
- [#103804](https://github.com/openclaw/openclaw/issues/103804)：service-env 生成器对值双重引号，破坏 AWS_REGION 等环境变量
- [#83598](https://github.com/openclaw/openclaw/issues/83598)：Claude CLI OAuth 刷新在 2026.5.12 仍未被修复

**趋势判断**：大量 P1 问题集中在**会话状态管理**和**消息传递可靠性**两个领域，且部分问题（如 #121058）在"修复后又复发"的循环中。建议项目维护者优先审视 session-state 模块的根因修复流程。

## 功能请求与路线图信号

### 📌 高热度需求（评论/👍 较多，可能进入近期路线图）

| Issue | 需求 | 热度信号 |
|---|---|---|
| [#7707](https://github.com/openclaw/openclaw/issues/7707) | 记忆条目按来源打信任标签 | 37 条评论，持续讨论中 |
| [#42475](https://github.com/openclaw/openclaw/issues/42475) | 网关级 per-agent 成本预算 | 20 条评论，与 #119009 成本事故共振 |
| [#68596](https://github.com/openclaw/openclaw/issues/68596) | 可配置的流式看门狗超时阈值 | 15 条评论，8 个 👍 |
| [#42840](https://github.com/openclaw/openclaw/issues/42840) | Control UI 支持 MathJax/LaTeX 渲染 | 10 个 👍，学术场景需求明确 |

### 🧭 路线图信号：基础设施类

- **成本控制**（#42475 + #119009）：一次事故 $204 的账单让社区对成本治理的需求变得紧迫，结合已存在的 `session-cost-usage.ts`，很可能在下一版本中增加网关级预算强制。
- **记忆安全**（#7707 + #63990）：记忆投毒攻击向量 + 多索引嵌入支持，说明记忆子系统的安全性与可靠性正在成为重点方向。
- **MCP 工具集成**（#114154）：bundle-mcp 工具通过策略校验和健康检查，但 agent 始终不加载它——这个问题如果最终定位于 bug，会让社区对 MCP 集成的信心受挫。
- **SDK 稳定化**（#74704）：`@openclaw/sdk` 的 happy path 稳定化正在进行中，对应 UI/网关多个 PR。

### 🧭 路线图信号：已有对应 PR 的功能

- **QR 契约与系统代理**（[#119341](https://github.com/openclaw/openclaw/pull/119341)、[#119342](https://github.com/openclaw/openclaw/pull/119342)）：正在为系统代理的 QR 设置步骤定义统一的跨渠道契约，涉及 WhatsApp、Zalo 等多端配对。
- **会话快照**（#13700）：保存/加载上下文检查点——暂无直接 PR，但若子代理持久化问题（#47975）持续发酵，此功能可能被重新激活。

## 用户反馈摘要

从今日 Issue 评论中提炼以下来自真实用户的反馈：

### 高频痛点

**1. "修复未生效" 的反复循环** — 多条评论指出问题在官方标记关闭后仍然存在：
> "Closed, but still happening. The monitoring cron logged a new occurrence today."（#121058）

**2. 静默失败难以诊断** — 多个用户反映系统"没有错误信息"（#58957、#84516、#53408）:
> "There is no clear error message indicating the prompt/context window was exceeded, so users cannot tell whether the problem is caused by context overflow."（#58957）

**3. 成本失控风险** — #119009 中的 $204 账单事故让用户担忧：
> "Runaway model-call retry loop bills $204 over 2 incidents — never detected as 'stalled' because each retry resets the progress clock."（#119009）

**4. 群聊激活模式失效** — 飞书用户反馈激活模式切换无效（#50490），造成"机器人骚扰"式的体验问题。

### 用户对此满意的点

- 官方对 UI 细节的关注获得好感：如 #122291（行内代码标点）和 #122287（文件创建标"Created"而非"Edited"）这类小修复有一定的正面反馈。
- 渠道多样性受到认可：Discord、Signal、Slack、WhatsApp、飞书、Teams 等渠道均在持续迭代，用户覆盖面较广。

## 待处理积压

以下问题和 PR 长期未获维护者实质响应（基于 `clawsweeper:needs-maintainer-review` / `needs-product-decision` 标签及超过 3 个月未闭环判断）：

| 类型 | 条目 | 积压时长 | 影响 |
|---|---|---|---|
| 安全 | [#7707](https://github.com/openclaw/openclaw/issues/7707) 记忆信任标签 | 6 个月+ | 记忆投毒攻击面持续暴露 |
| 成本 | [#42475](https://github.com/openclaw/openclaw/issues/42475) 网关成本预算 | 5 个月+ | 用户承担失控账单风险 |
| 稳定性 | [#87744](https://github.com/openclaw/openclaw/issues/87744) Codex + Telegram 超时 | 2.5 个月+ | P1 但长期无修复，社区信心受损 |
| UX | [#42840](https://github.com/openclaw/openclaw/issues/42840) MathJax 支持 | 5 个月+ | 学术用户弱需求未被重视 |
| SDK | [#74704](https://github.com/openclaw/openclaw/issues/74704) SDK happy path 稳定 | 3.5 个月+ | 影响生态开发者接入体验 |
| 数据安全 | [#71689](https://github.com/openclaw/openclaw/issues/71689) tasks registry 恢复失败 | 3.5 个月+ | SQLite 损坏导致任务数据不可恢复 |
| 性能 | [#97616](https://github.com/openclaw/openclaw/issues/97616) 僵尸进程泄漏 | 1.5 个月+ | 长期运行导致系统资源退化 |

> ⚠️ **建议优先处理**：#121058（静默回复失败复发）与 #87744（Codex 超时）均属于 P1 级别、社区高度关注且长期未闭环，应作为下一阶段重点排查对象。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告

**报告日期：2026-08-12** | **数据窗口：2026-08-11 00:00 UTC - 2026-08-12 00:00 UTC**

---

## 1. 生态全景

开源个人 AI 助手生态正处于从「功能竞赛」向「生产可信度竞赛」转型的关键节点。今日六大项目合计更新约 940 条 Issue、1,100+ 条 PR，但头部效应显著——OpenClaw 与 hermes-agent 合计贡献了约 90% 的更新量。记忆安全、成本治理、执行沙箱三大信任议题在多项目中同时升温，表明社区已不满足于「能用」，而是要求「可靠、可控、可审计」。整体呈现「高速迭代、定位分化、信任基建补课」的三重特征。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PRs 更新 | 合并/关闭率 | Release | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃 395） | 500 | 40.4%（202/500） | 无 | 中高：活跃度极高，但 P1 积压多、修复复发循环 |
| **Zeroclaw** | 50（新开/活跃 40） | 50 | 6%（3/50） | 无 | 中：RFC 密集但决策队列积压，合并率低 |
| **PicoClaw** | 3（活跃 2、stale 关闭 1） | 6 | 0%（0/6） | 无 | 中低：贡献质量高但审查停滞，4/6 PR 已 stale |
| **QwenPaw** | 22（关闭 14，解决率 64%） | 49 | 51%（25/49） | v2.1.0-beta.3 | 高：解决率与合并率双高，版本节奏健康 |
| **hermes-agent** | 356（新开/活跃 333） | 500 | 10.2%（51/500） | 无 | 中：高强度开发但合并吞吐不足，449 条 PR 待合并 |
| **AstrBot** | 9（新开/活跃 7） | 6 | 0%（0/6） | 无 | 中：稳定无阻塞回归，但今日无合并、吞吐偏低 |

---

## 3. OpenClaw 在生态中的定位

**社区规模**：日更新 1,000 条，约为 hermes-agent（856 条）的 1.2 倍、Zeroclaw（100 条）的 10 倍、QwenPaw（71 条）的 14 倍、AstrBot（15 条）的 67 倍，为生态绝对头部。热点讨论深度断层领先：#121058 达 60 条评论，而其他项目最高仅 19 条（Zeroclaw #8303）。

**技术路线**：以「多渠道抽象 + 插件系统 + 网关层」为核心，渠道覆盖（Telegram/Discord/Slack/Signal/WhatsApp/飞书/Teams）是当前生态最广；迭代风格为小步快跑的体验修复（今日合并 PR 多为 UI/渠道细节），区别于 Zeroclaw 的 RFC 驱动架构前瞻和 hermes-agent 的桌面优先路线。

**优势**：
- 渠道广度与多端一致性无出其右，用户覆盖面大
- 社区参与深、反馈闭环快，小修复（如 #122291、#122287）获得正面口碑
- 成本治理、记忆安全等议题讨论成熟，是生态需求风向标

**薄弱点**：
- 核心可靠性问题反复：静默回复失败 #121058「修复后复发」、8 个 P1 中 5 个无 fix PR
- 记忆信任标签（#7707）积压 6 个月+、网关成本预算（#42475）积压 5 个月+，安全/成本需求响应滞后
- SDK 稳定化（#74704）3.5 个月未闭环，影响生态开发者接入

**定位总结**：OpenClaw 是生态的「通用型全能底座」，凭借规模优势定义社区讨论议程；但架构级前瞻弱于 Zeroclaw，可靠性债务正侵蚀其头部信任优势。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求与热度信号 |
|---|---|---|
| **记忆安全与数据隔离** | OpenClaw #7707（37 评论）；hermes-agent #34352（24 评论）、#82936；QwenPaw 记忆 PR 群（#6772/#6830/#6564） | 防记忆投毒、多租户隔离、secrets 跨 Profile 泄漏、记忆生命周期管理 |
| **成本治理与可观测** | OpenClaw #42475 + #119009（$204 事故）；Zeroclaw #2269；AstrBot #9625（缓存命中率≈0%）；PicoClaw #3317（prompt cache tokens 日志） | 网关级预算强制、缓存策略修正、token 消耗可观测 |
| **生态互操作协议** | Zeroclaw #8603（Chat Completions profile，18 评论）；OpenClaw A2A/MCP（#114154）；QwenPaw #6882（CopilotKit） | 接入 Open WebUI/LobeChat 等存量客户端生态，统一 agent 通信标准 |
| **执行沙箱与权限模型** | Zeroclaw #9872（P1 沙箱绕过）、#7155（shell 命令确认）；QwenPaw #6916（插件静默建 cron）；PicoClaw #3314（allow 列表失效）；hermes-agent #82936 | 最小权限、逐次确认机制、插件安全边界、工作区隔离 |
| **消息/会话可靠性** | OpenClaw #121058（60 评论）；PicoClaw #3301（路由会话丢失）；QwenPaw #6732（MCP 失效）；AstrBot #9626（文件发送报错） | 消除静默失败、配置真实生效、路由场景下 agent 配置完整执行 |
| **工程治理与响应速度** | hermes-agent #78647（god-file 分解，67 评论）；Zeroclaw #8692（决策队列）；PicoClaw 4 个 stale PR | 模块化重构、维护者决策提速、避免 PR 长期悬置 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 关键架构特征 |
|---|---|---|---|
| **OpenClaw** | 通用全渠道 agent | 企业级用户、极客社区 | 多渠道抽象 + 插件 + 网关；工程迭代驱动 |
| **Zeroclaw** | 架构前瞻 + 安全合规 | 技术决策者、安全敏感团队 | RFC 驱动；SOP、安全决策管道、可插拔认证；目标 v0.9.0 |
| **PicoClaw** | 轻量路由 agent | 树莓派/边缘设备个人用户 | dispatch rules 路由为核心创新；强调低资源运行（DeepSeek 等） |
| **QwenPaw** | 多智能体 + 记忆系统 | 中文用户、学术科研场景 | AgentScope 深度集成；Scroll 上下文 + ReMe 记忆；MCP 优先 |
| **hermes-agent** | 开发者生产力工具链 | 开发者、桌面端用户、多租户企业 | Electron 桌面 + CLI/TUI + Kanban + Honcho；仓库级 god-file 重构 |
| **AstrBot** | 中文插件生态平台 | 中文普通用户、学校/生活场景 | 插件市场驱动；垂直插件丰富（游戏/运维/电费）；低门槛接入 |

---

## 6. 社区热度与成熟度

**活跃度分层（按日更新量）**：

| 层级 | 项目 | 特征 |
|---|---|---|
| **T1（超高频）** | OpenClaw（1,000 条）、hermes-agent（856 条） | 生态头部，社区关注度高 |
| **T2（高频）** | Zeroclaw（100 条）、QwenPaw（71 条） | 设计讨论或版本迭代活跃 |
| **T3（中低频）** | AstrBot（15 条）、PicoClaw（9 条） | 小而美，聚焦垂直场景 |

**生命周期判断**：
- **快速迭代期**：hermes-agent（功能井喷、架构重构）、Zeroclaw（架构奠基、RFC 密集）
- **质量巩固期**：OpenClaw（从功能转向可靠性修补）、QwenPaw（beta→正式版冲刺，解决率 64% 为六项目最佳）
- **稳定成长期**：AstrBot（插件生态扩张中）、PicoClaw（社区建设期，审查吞吐是短板）

---

## 7. 值得关注的趋势信号

**1. 信任基建成为核心竞争战场**
记忆安全（OpenClaw #7707）、沙箱边界（Zeroclaw #9872）、插件权限（QwenPaw #6916）在六项目中至少四个同时浮现。agent 从 demo 走向生产，「可信执行」已成为首要门槛。开发者应优先评估项目的安全设计文档与漏洞响应速度。

**2. 成本失控焦虑倒逼 FinOps 能力**
OpenClaw 单次重试循环 $204 的账单、AstrBot 用户精确分析出 `cache_control` 打在动态时间戳块上导致命中率 0%、PicoClaw 请求记录 cache tokens——社区正用真实账单倒逼成本可观测、预算强制、缓存静态化等能力。选择框架时，「成本护栏是否内置」将上升为关键选型指标。

**3. 协议兼容是生态入口的「最低成本策略」**
Zeroclaw 的 Chat Completions profile 提案（18 评论）直指 Open WebUI/LobeChat/Continue.dev 等成熟客户端生态；OpenClaw 的 A2A/MCP、QwenPaw 的 CopilotKit 咨询、hermes-agent 的 exactly-once API 语义同步推进。拥抱存量工具生态，而非要求用户迁移到新界面，是降低采用门槛的有效路径。

**4. 维护者响应速度即社区竞争力**
Zeroclaw 专设 #8692 决策队列 tracker、PicoClaw 6 个 PR 中 4 个 stale、hermes-agent 449 条 PR 待合并——多个项目出现「贡献者热情 > 维护者吞吐」的失衡。PicoClaw 用户 @j-v「既是 bug 反馈者又是修复者」的双重身份是良性信号，但若审查持续停滞，贡献者热情将快速流失。

**5. 配置「伪支持」比没有配置更伤信任**
LINE `webhook_host` 声明了但代码不读（PicoClaw #3328）、`service-env` 双重引号破坏环境变量（OpenClaw #103804）、Anthropic `cache_control` 位置错误（AstrBot #9625）——「配置了等于没配置且无警告」的静默失效，正在成为用户对项目信任的最大杀手。开发者应建立配置消费方的测试覆盖，确保每个公开配置项真实生效。

**6. 中文与长尾场景价值凸显**
飞书编码乱码（OpenClaw #48788）、中文 IME 崩溃（QwenPaw #6885）、高校电费插件（AstrBot #9603）、QQ 限流（QwenPaw #6897）——本地化细节与垂直场景支持，正在成为各项目在中国市场与教育/生活领域拉开差距的分水岭。

**7. AI 辅助开发已进入 dogfooding 阶段**
QwenPaw #6918 由 agent 代笔提交 bug 报告，hermes-agent 的 god-file 重构由 AI 辅助完成——开源社区不仅是 AI agent 的构建者，也开始成为其首批生产级用户。这一自我演化循环，将加速 agent 在真实协作场景中的成熟。

---

*本报告基于 2026-08-12 公开 GitHub 社区数据生成，所有 Issue/PR 编号均可在对应仓库中查证。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-12

## 1. 今日速览

过去 24 小时，Zeroclaw 仓库保持高度活跃：共发生 100 条 Issue/PR 更新（Issues 50 条、PRs 50 条），其中 Issue 新开/活跃 40 条、关闭 10 条；PR 待合并 47 条、合并/关闭 3 条。**全天无新版本发布**。项目目前处于密集的架构 RFC 讨论与安全加固并行阶段：多个 P1 级安全缺陷已被接受进入修复流程，同时一批重量级 RFC（Goal mode、Chat Completions profile、安全决策管道等）正在等待维护者最终裁决。整体活跃度评估为**高**，但维护者审查队列存在明显积压（见 #8692），或成为近期项目节奏的主要瓶颈。

## 2. 版本发布

过去 24 小时无新版本发布（最新 Releases 为空）。

## 3. 项目进展

过去 24 小时有 **3 条 PR 被合并/关闭**，但具体条目未出现在展示榜单中。同时，5 条长期跟踪的 Issue 完成关闭，代表了相关工作的阶段性收尾：

- **#9545** — Task: gate rustdoc warnings in required PR CI（已关闭）。rustdoc 零警告基线确立，后续 PR 将受 CI 强制约束，防止文档警告静默回归。
- **#9768** — Bug: daemon reload is not on SIGUSR1（已关闭）。修复了误导性运维警告——该警告此前建议发送一个会杀死守护进程的信号，对生产环境操作存在重大误导。
- **#2269** — RFI: Token consumption and cost management for productized agent workloads（已关闭）。社区输入收集完成，为产品化部署的 token 成本优化方向提供了决策依据。
- **#7232** — RFC: Structured Observability Enhancement（已关闭）。可观测性增强 RFC（Rich Events、OTel 关联、Bridge 重构）完成讨论，后续可进入实施规划。
- **#9035** — Bug: Docker Compose gateway can remain loopback-bound behind a published port（已关闭）。解决了 Docker 部署中端口桥接后仍 "Connection refused" 的问题。

**值得关注的待合并 PR（高更新活跃度）**：
- **#9182** — 支持 PowerShell 作为 Windows 原生 shell（XL 级改动），补齐 Windows 平台体验。
- **#9320** — Cron 作业墙钟超时控制，防止挂起任务永久持有 sqlite 锁（XL 级）。
- **#9428** — 为 Bluesky 和 Reddit 通道强制发送者授权（XL 级）。
- **#9385 / #9609 / #9612** — 三条 WhatsApp Web 通道修复链（审批、策略强制执行、令牌生命周期）。

## 4. 社区热点

今日讨论热度最高的议题几乎全部集中在**架构与安全设计**：

- **#8303 RFC: Goal mode v1 — bounded foreground Matrix work**（19 评论，待维护者审查）：讨论如何跨多个 agent 回合持久地追求一个有界用户目标，是 agent 控制面演进的核心提案。
- **#8603 RFC: ZeroClaw Chat Completions profile**（18 评论，待维护者审查）：要求暴露 OpenAI Chat Completions 协议，以接入 Open WebUI、LobeChat、Continue.dev、Aider、LangChain 等主流 AI 客户端生态。
- **#7155 RFC: High-risk shell command confirmation tier + Claude Code-style policy**（17 评论，待维护者审查）：参照 Claude Code 的 allow/ask/deny 模式，为高风险 shell 命令建立逐次确认机制。
- **#7141 RFC: Pluggable inbound authentication and canonical principals**（14 评论，in-progress，目标 v0.9.0）：身份与访问里程碑的核心提案，涉及 OIDC 与可插拔认证提供方。
- **#8692 Maintainer decision queue tracker**（13 评论）：维护者决策队列本身成为热点，反映了社区对 RFC 裁决速度的普遍关切。

**背后诉求**：生态互操作性（Chat Completions 协议）、agent 执行边界控制（shell 命令策略、bounded goal）、项目治理效率（决策队列、RFC 流程简化）。

## 5. Bug 与稳定性

今日无新增崩溃级（S0）报告，但有两个 **P1 安全缺陷**已被接受并等待修复：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| P1 / 安全 | **#9883** | 入站 WebP 转换在共享图片校验器之前进行无界解码，存在资源耗尽风险（拆分自已加固的 #9819） | 已接受，暂无关联 fix PR |
| P1 / 安全 | **#9872** | bounded 委托模式下，被委托 agent 的文件系统操作解析到委托者工作目录，构成沙箱边界绕过 | 已接受，暂无关联 fix PR |
| P2 / 已关闭 | **#9035** | Docker Compose 网关端口无法访问（loopback-bound） | 已关闭 |
| P2 / 已关闭 | **#9768** | daemon reload 信号错误，运维警告建议发送 SIGTERM/致命信号 | 已关闭 |

**已在修复链中的 Bug 相关 PR**：
- **#9781** — 验证 WebAuthn 断言数据（rpIdHash、User Present 标志），修复认证绕过面。
- **#9609** — 强制执行 WhatsApp Web 的 `dm_policy`/`group_policy`（business 模式下策略被读取但从未生效）。
- **#9612** — 修复 WhatsApp Cloud 审批令牌在异常退出时残留的问题。
- **#9635** — 修复 git 全局选项后子命令识别错误导致的风险分类失效。
- **#9402** — 避免 Docker 沙箱嵌套运行在 Docker runtime 内部。
- **#9881** — Gate 掉 `channel-linq` 特性关闭时的未使用测试辅助函数，修复 CI 编译警告。

## 6. 功能请求与路线图信号

**面向 v0.9.0 的关键设计**：
- **#7142 RFC: Runtime-owned security decision pipeline and restrictive overlays**（Rev 6）：与 #7141 配套的安全架构，构成 v0.9.0 安全基座。
- **#9598 RFC: SOP capability permission contract**（Rev 2）：将 SOP 权限与共享主体验证/安全决策管道统一，目前 blocked。
- **#9644 RFC: retire the Lucid memory connector at v0.9.0**：上游项目已休眠，建议在 v0.9.0 移除。
- **#8288 Tracker: SOP daemon-owned control plane to 5/5**：SOP 能力全面验收的里程碑 tracker。

**高潜力功能信号**：
- **#8603 Chat Completions profile**：若通过，将直接解锁 Open WebUI、LobeChat 等成熟 AI 客户端生态，降低接入门槛。
- **#8832 Plugin-owned Kanban board**：以插件域方式提供 agent 工作协调看板。
- **#9182 PR**：Windows 原生 PowerShell 支持，完善桌面端体验。
- **#9326 PR**：Signal "Note to Self" 同步消息处理，修复个人笔记场景的静默丢失。
- **#8337 PR**：Herdr agent 状态上报集成（CLI 交互模式下向 Herdr 侧边栏上报生命周期状态）。
- **#9337** 等 observability 生态集成（OTel/Prometheus 标签已在 #8337 中出现）。

**治理改进**：
- **#9496 RFC: Streamline RFC scope, discussion, voting, and assignment**（已接受）：简化投票与讨论流程，将直接缓解 #8692 暴露的决策积压问题。

## 7. 用户反馈摘要

从近 24 小时活跃的 Issue 讨论中提炼的用户真实反馈：

- **生态互操作诉求强烈（#8603）**：用户希望用 Open WebUI、LobeChat、Continue.dev、Aider、LangChain 等现成工具直接连接 ZeroClaw，目前仅 WebSocket/ACP/webhook 的暴露面限制了采用。
- **高风险命令治理需求（#7155）**：社区期待类似 Claude Code 的交互式命令确认机制，而不是简单的二元放行/拦截。
- **成本问题是产品化核心痛点（#2269，已关闭）**：邮件、日程类高频任务运行在单一高端模型上成本过高，社区希望在设计方向确定前充分收集输入。
- **部署体验仍需打磨（#9035，已关闭）**：Docker Compose 部署后端口不可达（Connection refused），容器网络与网关绑定配置容易踩坑。
- **多 agent 沙箱隔离不足（#9872）**：用户还原了 `executive_assistant → researcher` 委托时文件系统越权的完整路径，说明工作区权限边界尚未成熟。

## 8. 待处理积压

以下重要议题长期等待维护者响应，建议按优先级介入：

| 优先级 | 项目 | 等待时长 | 备注 |
|---|---|---|---|
| 高 | **#8303** Goal mode v1 RFC（19 评论） | 创建于 06-24，已 7 周 | needs-maintainer-review，risk: high |
| 高 | **#8603** Chat Completions profile RFC（18 评论） | 创建于 07-02，已 6 周 | needs-maintainer-review，社区热度高 |
| 高 | **#7155** Shell 命令确认策略 RFC（17 评论） | 创建于 06-03，已 10 周 | 已修订至 Rev 3，needs-maintainer-review |
| 高 | **#7141** 可插拔认证 RFC（14 评论） | 创建于 06-03，已 10 周 | in-progress，目标 v0.9.0 |
| 中 | **#7142** 安全决策管道 RFC（9 评论） | 创建于 06-03，已 10 周 | 与 #7141 联动，建议合并审查 |
| 中 | **#7897** 热加载安全策略/通道配置 RFC（8 评论） | 创建于 06-17，已 8 周 | needs-maintainer-review |
| 中 | **#8832** Plugin-owned Kanban RFC（9 评论） | 创建于 07-08，已 5 周 | needs-maintainer-review |
| 中 | **#9346** 统一 Catalog 契约 RFC（6 评论） | 创建于 07-24，已 3 周 | needs-maintainer-review |

**长期未响应 PR（存在 stale 风险）**：
- **#9385** WhatsApp Web request_approval 实现（size L，needs-author-action，17 天未更新）
- **#9609** WhatsApp 策略强制执行（needs-author-action）
- **#9612** WhatsApp 审批令牌生命周期（已标记 stale-candidate）
- **#9635** git 子命令风险分类修复（needs-author-action）
- **#9320** Cron 墙钟超时（needs-author-action，size XL）

> 建议维护者优先使用 **#8692 决策队列 tracker** 对上述 RFC 逐项裁决，避免高热度提案长期悬置损耗社区信心。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-12

## 1. 今日速览

过去 24 小时共更新 3 条 Issues（2 条活跃、1 条作为 stale 关闭），6 条 PR 全部处于待合并状态，无新版本发布。核心热点是"路由 agent 会话管理"问题持续发酵：bug [#3301](https://github.com/sipeed/picoclaw/issues/3301) 与修复 PR [#3316](https://github.com/sipeed/picoclaw/pull/3316) 已分别开放 14 天和 9 天且均被标记 [stale]，等待维护者处理。积极信号是新增 bug [#3328](https://github.com/sipeed/picoclaw/issues/3328)（LINE webhook 配置静默失效）在创建当天即收到修复 PR [#3329](https://github.com/sipeed/picoclaw/pull/3329)，响应速度较快。整体评估：贡献者活跃且修复质量高，但 PR 审核/合并吞吐量偏低（今日 0 合并），6 个待合并 PR 中 4 个已挂 [stale]，是当前项目健康度的主要风险点。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日没有 PR 被合并或关闭，因此无已确认的功能落地。但存在以下进展信号：

- **新提交修复**：[PR #3329 fix(line): warn on inert webhook_host / webhook_port instead of seeding them](https://github.com/sipeed/picoclaw/pull/3329) 于 8 月 11 日提交，直接回应该日新上报的 [#3328](https://github.com/sipeed/picoclaw/issues/3328)，将 LINE 通道"文档存在但代码不读"的配置改为显式警告，避免静默失效。
- **待合并 PR 覆盖三个价值方向**：路由上下文管理（[#3316](https://github.com/sipeed/picoclaw/pull/3316)）、Telegram 私聊话题支持（[#3315](https://github.com/sipeed/picoclaw/pull/3315)）、LLM 可观测性增强（[#3317](https://github.com/sipeed/picoclaw/pull/3317)）。这些若合并将直接提升 dispatch rules 场景可靠性、消息平台兼容性与调试效率。当前瓶颈在维护者侧而非贡献侧。

## 4. 社区热点

- **[#3301 /clear and session auto-compression don't work in chats routed to non-default agent via dispatch rules](https://github.com/sipeed/picoclaw/issues/3301)**（3 条评论）
  这是当前讨论最集中的议题。用户 @j-v 在树莓派 + DeepSeek + Discord/Telegram 环境下复现：经 dispatch rules 路由到非默认 agent 的会话既不记忆历史，也永不触发自动压缩。值得关注的是 @j-v 同时提交了修复 PR [#3316](https://github.com/sipeed/picoclaw/pull/3316) 和 [#3314](https://github.com/sipeed/picoclaw/pull/3314)，表明该用户既是反馈者又是修复者。背后的诉求是：**路由/agent 级配置应当被完整且一致地执行**，否则 dispatch rules 越灵活，上下文越容易丢失。

- **[#3328 line.settings.webhook_host / webhook_port are never read](https://github.com/sipeed/picoclaw/issues/3328)**（0 条评论，但 24 小时内即获修复 PR）
  用户 @qing-wang 提供完整证据链（config.go 声明、默认值、文档、无消费方），属于"配置项伪支持"类问题。社区对此类问题反应迅速，[PR #3329](https://github.com/sipeed/picoclaw/pull/3329) 已在同日提交。

- **[#3294 /list models only shows the current model instead of all configured models](https://github.com/sipeed/picoclaw/issues/3294)**（3 条评论，今日关闭）
  用户期望 `/list models` 按命令描述列出所有已配置模型，实际只显示当前模型。该 issue 最终未获实质解决方案，而是被标记 stale 关闭，属于"功能语义与用户预期不符但未解决"的情况。

## 5. Bug 与稳定性

按严重程度排列：

1. **高** — [#3301 路由 agent 的 /clear 与自动压缩失效](https://github.com/sipeed/picoclaw/issues/3301)
   非默认 agent 会话完全丢失历史、自动压缩永不触发，直接影响 dispatch rules 核心体验。已有对应 fix PR [#3316](https://github.com/sipeed/picoclaw/pull/3316)，但被标记 stale，尚未合并。

2. **中** — [#3328 LINE webhook_host/webhook_port 被静默忽略](https://github.com/sipeed/picoclaw/issues/3328)
   配置项有默认值、有文档、有 env 绑定，但代码中没有任何读取方，设置后无效且无警告。修复 PR [#3329](https://github.com/sipeed/picoclaw/pull/3329) 已提交待合并。

3. **中** — [PR #3314 customAllowPatterns 不生效](https://github.com/sipeed/picoclaw/pull/3314)
   默认 deny 模式始终优先于自定义 allow 模式，导致 `git push` 等命令即使加入允许列表也无法执行。该 PR 本身即修复，待合并。

4. **低 / 已关闭** — [#3294 /list models 只显示当前模型](https://github.com/sipeed/picoclaw/issues/3294)
   与命令描述不符，但被作为 stale 关闭，未实际修复。

## 6. 功能请求与路线图信号

基于 6 个待合并 PR 可判断以下方向可能进入下一版本：

- **LLM 可观测性增强**：[PR #3317 在 LLM 响应 debug 输出中记录 prompt cache tokens](https://github.com/sipeed/picoclaw/pull/3317)。DeepSeek/Cloudflare AI Gateway 会在 usage 对象中返回缓存命中元数据，当前 gateway 仅记录三个基础 token 计数。若合并，可帮助用户判断缓存是否在路由/网关层生效，改动小、价值明确。
- **Telegram 私聊话题支持**：[PR #3315 Support topics in private bot chats](https://github.com/sipeed/picoclaw/pull/3315)。现有话题识别仅判断 `Chat.IsForum`，私聊 bot 的话题模式需借助 `IsTopicMessage`，属于 Telegram API 兼容性补齐。
- **Exa 原生搜索提供方**：[PR #3299 Add native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299)。为 `tools.web` / `web_search` 增加 Exa 后端，复用现有 `d/w/m/y` 时间范围过滤，已有配置与测试支持，属于生态扩展。

## 7. 用户反馈摘要

- **路由场景上下文丢失是真实痛点**（[#3301](https://github.com/sipeed/picoclaw/issues/3301)、[#3316](https://github.com/sipeed/picoclaw/pull/3316)）：用户明确描述"无论消息数或 token 多少都不会触发自动压缩，agent 不记得之前任何消息"。结合 [#3314](https://github.com/sipeed/picoclaw/pull/3314) 的 allow 列表失效，共同指向 **agent 级配置在 routed 场景下未完整生效**。
- **配置项的"伪支持"伤害信任**（[#3328](https://github.com/sipeed/picoclaw/issues/3328)）：用户列出从声明到文档的完整证据，指出现象是"配置了但等于没配置，且无任何提示"。这类静默失败往往比直接报错更让用户困扰。
- **命令语义与预期不符**（[#3294](https://github.com/sipeed/picoclaw/issues/3294)）：用户基于命令名和描述"Configured models"合理预期看到全部模型，实际只看到当前模型；issue 被 stale 关闭意味着该诉求短期内得不到回应，建议维护者考虑以文档澄清或功能补丁方式给出交代。

## 8. 待处理积压

以下 PR/Issue 长期未获明确回复或合并，建议维护者优先处理：

- [PR #3299 Add native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299) — 自 2026-07-26 开放，已 17 天，标 [stale]。功能完整，若不接受请明确关闭或给出反馈。
- [Issue #3301 路由 agent 会话管理 bug](https://github.com/sipeed/picoclaw/issues/3301) — 自 2026-07-29 开放，已 14 天，是当前最影响用户实际使用的 bug；关联 PR [#3316](https://github.com/sipeed/picoclaw/pull/3316) 同样标 [stale]，建议优先 review 合并。
- [PR #3316 routed-agent context management fix](https://github.com/sipeed/picoclaw/pull/3316) — 自 2026-08-03 开放，已 9 天，标 [stale]，直接修复 #3301。
- [PR #3315 Support topics in private bot chats](https://github.com/sipeed/picoclaw/pull/3315) — 自 2026-08-03 开放，已 9 天，标 [stale]，Telegram 兼容性缺口。
- [PR #3314 fix customAllowPatterns](https://github.com/sipeed/picoclaw/pull/3314) — 自 2026-08-03 开放，已 9 天，修复安全配置不生效问题，建议尽快转入 review。
- [PR #3317 log prompt cache tokens](https://github.com/sipeed/picoclaw/pull/3317) — 自 2026-08-04 开放，已 8 天，标 [stale]，改动小、风险低，适合作为低摩擦合并对象。

另外，[Issue #3294](https://github.com/sipeed/picoclaw/issues/3294) 作为 stale 被关闭而问题未解决，建议维护者跟进确认是否在路线图中，避免用户预期落空。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-12

## 1. 今日速览

过去24小时 QwenPaw 项目保持高活跃度：共更新 Issues 22 条（14 条关闭，问题解决率 64%），更新 PR 49 条（25 条已合并/关闭），并发布 v2.1.0-beta.3 版本。社区反馈集中在前端体验（LaTeX 渲染、IME 输入、时区显示、CPU 占用）与 MCP 稳定性两大方向，其中 MCP 工具失效问题（#6732）已在 beta.3 中针对性修复。记忆/上下文管理与 Console 界面优化是当前 PR 最密集的改进领域，多个长线重构 PR（#6779、#6302）正在推进中。项目整体健康度良好，但插件安全权限问题（#6916）值得重点关注。

---

## 2. 版本发布

### v2.1.0-beta.3（2026-08-11 发布）

**主要更新内容：**
- **feat(files)**: 新增 files workspace blog 能力（PR #6783，@zhaozhuang521）
- **fix(provider)**: 过期 capability 缓存条目失效，并在模型切换时自动清除缓存（PR #6723，@ningblue）— 针对 MCP 工具规律性失效问题（#6732）
- **chore**: 版本号更新至 2.1.0-beta.3

**Release 验证状态：** 自动化的 Release Duty 安装验证任务（#6914）已于发布后启动，截止时间为 2026-08-11 15:45 UTC，涉及 Windows/macOS/Linux 各平台安装与四项检查点验证。

**迁移注意：** 本次为 beta 增量版本，未见破坏性变更说明；因包含 provider 缓存修复，建议 MCP 用户优先升级。Release Notes 正在同步准备中（见 PR #6875）。

🔗 [Release v2.1.0-beta.3](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.3) | [Release Duty #6914](https://github.com/agentscope-ai/QwenPaw/issues/6914)

---

## 3. 项目进展

过去24小时共有 25 条 PR 被合并/关闭，以下为重要变更：

### 核心稳定性
- **fix(tools): 修正 read_file 工具描述**（[#6898](https://github.com/agentscope-ai/QwenPaw/pull/6898)，@AntiQuality）— 消除了二进制文件被 `read_file` 错误读取返回乱码的隐患，避免模型误用工具。
- **fix(computer-use): 改进 macOS 原生输入工作流**（[#6891](https://github.com/agentscope-ai/QwenPaw/pull/6891)，@jinglinpeng）— 新增有界键盘序列输入，减少桌面端往返次数。
- **fix(files): 修复文件预览与暗色模式样式**（[#6915](https://github.com/agentscope-ai/QwenPaw/pull/6915)，@rayrayraykk）— 修复 Unicode PDF 文件名和 SVG 预览失败，并同步暗色主题。
- **fix(memory): 压缩前刷新待处理 turns**（[#6564](https://github.com/agentscope-ai/QwenPaw/pull/6564)，@RerankerGuo）— 补全 Scroll 生命周期中自动记忆持久化的最后缺口。
- **fix(config): 非法 channel 配置返回 500 错误**（[#6912](https://github.com/agentscope-ai/QwenPaw/pull/6912)，@RerankerGuo）— 将 Pydantic 校验错误映射为 HTTP 422，关闭 [#6910](https://github.com/agentscope-ai/QwenPaw/issues/6910)。

### 功能增强
- **feat(channels): 自定义 IM 网关端点**（[#6907](https://github.com/agentscope-ai/QwenPaw/pull/6907)，@yutai78786）— 飞书、QQ、企业微信等 5 个 IM 渠道的服务器端点可配置，支持对接私有网关。
- **feat(channels): 机器人被其他 agent 占用时告警**（[#6909](https://github.com/agentscope-ai/QwenPaw/pull/6909)，@hongxicheng）— 保存启用渠道配置时检测 Bot 身份冲突并弹出确认框。
- **feat(console): 统一可渲染代码块体验**（[#6911](https://github.com/agentscope-ai/QwenPaw/pull/6911)，@rayrayraykk）— LaTeX/Mermaid 代码块新增本地化 Preview/Source 标签页，同时适配明暗主题。

### 文档与发布
- **chore: 更新 v2.1.0 发布说明**（[#6875](https://github.com/agentscope-ai/QwenPaw/pull/6875)，@cuiyuebing）— 准备中英文发布文档、News 条目，并在各 README 翻译中同步。

**整体评估：** 项目在稳定性修复（内存、MCP、Config）和桌面体验（Computer Use、文件预览）上推进明显，v2.1.0 正式版准备工作已全面启动。

---

## 4. 社区热点

### 🔥 最热 Issue: MCP 工具规律性失效（#6732）— 10 条评论
[#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) @70995781

用户反馈每隔数小时 MCP 工具失效、提示"未注册或不存在"，重启 Docker 容器后恢复。该问题与 v2.1.0-beta.3 中 provider 缓存修复（#6723）直接对应，已关闭（状态：CLOSED）。**诉求核心：** MCP 工具调用的长期稳定性。

### 🔥 最热 Feature 讨论: 公式渲染 + 会话分组 + 活动会话背景（#6893）— 7 条评论
[#6893](https://github.com/agentscope-ai/QwenPaw/issues/6893) @renzhong424

用户上传 LaTeX 公式渲染对比图，指出 QwenPaw 网页端无法渲染公式，显示为原始字符串。同主题的历史 issue 有 #5453（KaTeX support）和 #4756（LaTeX rendering capability is pool）。**值得注意的是 PR #6911 已实现统一的 LaTeX/Mermaid 代码块 Preview 标签页，正是对该诉求的直接响应。** 此外该 issue 还提出会话分组管理和活动会话背景两个 UI 增强需求。

### 🔥 高参与 Bug: Loading animation does not disappear（#5790）— 4 条评论
[#5790](https://github.com/agentscope-ai/QwenPaw/issues/5790) @Shj451148969

Agent 回复完成后输入框上方 spinner 持续显示，影响 Console 聊天体验。已关闭。

### 语言/地区信号
- 中文用户占比高：本次 22 条 Issue 中 15 条为中文或中英双语，涉及 QQ 群、微信群等中国用户社交渠道诉求（#6895、#6897）。
- 有用户主动提出"建立微信群"（[#6895](https://github.com/agentscope-ai/QwenPaw/issues/6895)），说明中文社区活跃度正在上升。

---

## 5. Bug 与稳定性

按严重程度排序：

### 🔴 高危（安全/功能不可用）

| 严重度 | Issue | 状态 | 描述 | 是否有 Fix PR |
|--------|-------|------|------|--------------|
| 🔴 中高（安全） | [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) 插件可静默创建 cron 任务并注入用户可见消息 | OPEN | 已安装插件即可在无确认情况下持久化注入消息并执行定时动作，属权限模型漏洞 | ❌ 无 |
| 🔴 高（崩溃） | [#6885](https://github.com/agentscope-ai/QwenPaw/issues/6885) 中文 IME compositionEnd 期间 UI 崩溃，消息队列不可用 | OPEN | v2.1.0b2，agent 运行中使用中文输入法时消息队列完全不可用 | ❌ 无 |
| 🔴 高（逻辑错误） | [#6918](https://github.com/agentscope-ai/QwenPaw/issues/6918) 多智能体间消息每条都新建 agent 会话，产生并发"影子实例" | OPEN | Agent 代笔提交的 bug，inter-agent 消息导致重复执行 | ❌ 无 |
| 🟠 中高（环境回归） | [#6697](https://github.com/agentscope-ai/QwenPaw/issues/6697) 桌面版注入 PYTHONHOME 导致所有 Python 子进程崩溃 | CLOSED | v2.1.0b1 Windows 回归，`encodings ModuleNotFoundError` | ✅ 已修复 |
| 🟠 中（MCP 稳定） | [#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) MCP 工具每隔数小时失效需重启容器 | CLOSED | 已随 beta.3 的 provider 缓存修复解决 | ✅ 已修复（#6723） |
| 🟠 中（性能） | [#6828](https://github.com/agentscope-ai/QwenPaw/issues/6828) 空闲时 Console 持续重绘，CPU 占用 18–27% | CLOSED | 无限 CSS 动画（ai-copilot-blink + antd spinner）导致 | ✅ 已关闭 |

### 🟡 中低（体验/显示）

| 严重度 | Issue | 状态 | 描述 | 是否有 Fix PR |
|--------|-------|------|------|--------------|
| 🟡 中（数据错误） | [#6883](https://github.com/agentscope-ai/QwenPaw/issues/6883) 日记页面子文件夹笔记被错误分组到错误日期 | OPEN | 如 `memory/2026-08-09/xxx.md` 显示在 8/10 下 | ❌ 无 |
| 🟡 中（时间显示） | [#6871](https://github.com/agentscope-ai/QwenPaw/issues/6871) 历史消息时间戳偏移 +8 小时 | CLOSED | UTC+8 时区下视图重渲染后时间错误 | ✅ 已关闭 |
| 🟡 低（后端校验） | [#6910](https://github.com/agentscope-ai/QwenPaw/issues/6910) 无效 channel payload 返回 HTTP 500 | OPEN | 应为 422，已有 PR | ✅ [#6912](https://github.com/agentscope-ai/QwenPaw/pull/6912) |
| 🟡 低（子代理） | [#6722](https://github.com/agentscope-ai/QwenPaw/issues/6722) 后台 fork 子 agent 在工作树未完成时误报完成 | CLOSED | commit 缺失但 agent 报告正常结束 | ✅ 已关闭 |

---

## 6. 功能请求与路线图信号

### 高频请求：LaTeX / 数学公式渲染（3 个 issue 指向同一需求）
- [#6893](https://github.com/agentscope-ai/QwenPaw/issues/6893) 公式渲染 + 会话分组 + 活动会话背景
- [#5453](https://github.com/agentscope-ai/QwenPaw/issues/5453) KaTeX support or similar
- [#4756](https://github.com/agentscope-ai/QwenPaw/issues/4756) LaTeX rendering capability is pool

**路线图判断：** PR [#6911](https://github.com/agentscope-ai/QwenPaw/pull/6911) 已实现代码块的 LaTeX Preview 标签页并合并，这意味着该需求在 v2.1.0 中有大概率落地。但 issue 中提到的"行内公式渲染"（如 `$Var(\hat{X}) = ...$`）可能仍需后续迭代。

### 多智能体 / 生产力功能
- **主动投递收件箱**（[#6917](https://github.com/agentscope-ai/QwenPaw/issues/6917)）— agent 应能将结构化报告主动投递到用户 Inbox，而非局限于 cron/heartbeat/记忆任务。属于 Core/Backend 层面的能力扩展。
- **隔离聊天项目目录**（[#6900](https://github.com/agentscope-ai/QwenPaw/issues/6900)）— 将 agent 内部工作空间与 Chat 项目目录分离，已关闭（可能已在设计中）。
- **CopilotKit 集成**（[#6882](https://github.com/agentscope-ai/QwenPaw/issues/6882)）— 开放讨论中，尚无非正式回复。

### 已有关联 PR 的功能信号
- **记忆系统增强**：PR [#6772](https://github.com/agentscope-ai/QwenPaw/pull/6772)（ReMe Light embedding 热更新与 Daily Paper）、[#6830](https://github.com/agentscope-ai/QwenPaw/pull/6830)（跨压缩与生命周期保持自动记忆状态）、[#6564](https://github.com/agentscope-ai/QwenPaw/pull/6564)（压缩前刷新待提交 turns）均显示长期记忆是当前重点投入方向。
- **Context 体系重构**：PR [#6779](https://github.com/agentscope-ai/QwenPaw/pull/6779) 将 Scroll 收敛为唯一上下文实现，并全面对齐 AgentScope Agent 基类生命周期。
- **Provider 统一**：PR [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) 统一 provider 发现、模型元数据、路由与 Agent 控制，与 #6167 对应，属架构级重构。
- **MCP 超时可配置**：PR [#6874](https://github.com/agentscope-ai/QwenPaw/pull/6874) 为 MCP 工具调用增加默认 120 秒超时配置，可避免 server 挂起阻塞。

### 社区建议纳入方向
- **QQ bot 工作流精简**（[#6897](https://github.com/agentscope-ai/QwenPaw/issues/6897)）— 用户建议不要将每一步工作流都发到 QQ，避免触发限流和消息轰炸。这属于渠道消息过滤/摘要能力。
- **字体大小与可访问性**（[#4154](https://github.com/agentscope-ai/QwenPaw/issues/4154)）— 已关闭但用户呼声高，建议在桌面版中增加字体缩放或跟随系统 DPI。

---

## 7. 用户反馈摘要

### 使用场景与正向反馈
- **Advanced 用户**：有用户自建 agent 代笔提交 bug 报告（[#6918](https://github.com/agentscope-ai/QwenPaw/issues/6918)），中英双语撰写，说明社区已有人在构建基于 QwenPaw 的多智能体工作流，且认可其作为 agent 运行底座。
- **功能期待**：用户对公式渲染的诉求强烈，多个 issue 直言"它其实应该有这个能力"、"really hard without it"，说明该功能缺失已成为阻碍其在科研/学术场景使用的关键短板。

### 用户痛点
| 痛点 | 来源 Issue | 用户原声/表现 |
|------|-----------|--------------|
| MCP 工具稳定性差 | [#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) | "每隔一些时间 mcp工具就无效了…重启qwenpaw docker容器后，就能恢复" |
| 公式无法渲染 | [#6893](https://github.com/agentscope-ai/QwenPaw/issues/6893) | "在qwenpaw里显示为：Var(X^)=h=1∑L…就很尴尬！！" |
| 中文输入法崩溃 | [#6885](https://github.com/agentscope-ai/QwenPaw/issues/6885) | 升级到 b2 后消息队列功能在使用中文输入法时完全不可用 |
| QQ 渠道消息刷屏 | [#6897](https://github.com/agentscope-ai/QwenPaw/issues/6897) | "没必要把每一步工作流全部发送到QQ上，这样会触发QQ限流" |
| 空闲 CPU 占比高 | [#6828](https://github.com/agentscope-ai/QwenPaw/issues/6828) | 空闲时 CPU 占用 18–27%，造成明显 UI 卡顿 |
| 安全担忧 | [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) | "插件可在无任何用户确认的情况下静默创建定时任务" |
| 时区显示错误 | [#6871](https://github.com/agentscope-ai/QwenPaw/issues/6871) | 历史消息时间戳在切换视图后被错误偏移 +8 小时 |
| 中文社区渠道缺失 | [#6895](https://github.com/agentscope-ai/QwenPaw/issues/6895) | "微信用户人群多啊，便于交流" |

### 满意度信号
- 已关闭 issue 中 极少数有抱怨性追加评论，多数在修复/答复后正常关闭。
- 用户对个别修复速度满意（如 MCP 问题 #6732 在 6 天内从报告到 beta.3 修复发布）。

---

## 8. 待处理积压

### ⏳ 长期未合并的高价值 PR

| PR | 主题 | 创建时间 | 已开启时长 | 状态 | 说明 |
|----|------|---------|-----------|------|------|
| [#5490](https://github.com/agentscope-ai/QwenPaw/pull/5490) | Console 聊天媒体全屏图片画廊 | 2026-06-24 | 约 7 周 | OPEN | 将图片预览从单张模式升级为可导航的 `Image.PreviewGroup`，纯前端体验优化 |
| [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) | 统一 provider 发现、模型元数据、路由与 Agent 控制 | 2026-07-21 | 约 3 周 | OPEN | 架构级重构，对应 issue #6167，改动面大，需仔细 review |
| [#6817](https://github.com/agentscope-ai/QwenPaw/pull/6817) | 集成 AnySearch 网页搜索（替代 Tavily） | 2026-08-08 | 4 天 | OPEN | 第三方搜索服务集成，附 MCP env-ref 绑定修复 |

### ⏳ 需维护者回应的开放 Issue

| Issue | 主题 | 创建时间 | 优先级判断 |
|-------|------|---------|-----------|
| [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) | 插件静默创建 cron 且注入消息（安全权限缺口） | 2026-08-11 | 🔴 高 — 涉及安全模型，建议尽快回应并给出修复计划 |
| [#6885](https://github.com/agentscope-ai/QwenPaw/issues/6885) | 中文 IME 输入导致 UI 崩溃 | 2026-08-10 | 🔴 高 — 中文用户核心输入场景不可用 |
| [#6883](https://github.com/agentscope-ai/QwenPaw/issues/6883) | 日记页面子文件夹笔记日期分组错误 | 2026-08-10 | 🟡 中 — 数据展示错误，影响记忆功能使用体验 |
| [#6882](https://github.com/agentscope-ai/QwenPaw/issues/6882) | 如何集成 CopilotKit | 2026-08-10 | 🟢 低 — 社区集成咨询，可引导至 Discussions |

### 📌 维护者建议关注
- 长线 PR [#6779](https://github.com/agentscope-ai/QwenPaw/pull/6779)（Scroll 上下文对齐 AgentScope 生命周期）与 [#6830](https://github.com/agentscope-ai/QwenPaw/pull/6830)（自动记忆状态保持）均处于 OPEN 状态，两者都涉及记忆/上下文核心路径，建议在 v2.1.0 正式版前推进合并，避免分支长期偏离。

---

*本日报基于 2026-08-11 00:00 UTC 至 2026-08-12 00:00 UTC 的 GitHub 公开数据自动生成。数据来源：[github.com/agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw)。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报（2026-08-12）

## 1. 今日速览

hermes-agent 项目过去 24 小时活跃度极高：Issue 更新 356 条（新开/活跃 333 条，关闭 23 条），PR 更新 500 条（待合并 449 条，合并/关闭 51 条）。无新版本发布，版本迭代暂缓，处于密集开发与问题修复期。社区讨论热度集中在两大方向：全仓库 god-file 分解重构（[#78647](https://github.com/NousResearch/hermes-agent/issues/78647)，67 条评论）与多租户/多 Profile 隔离问题（[#34352](https://github.com/NousResearch/hermes-agent/issues/34352)、[#66887](https://github.com/NousResearch/hermes-agent/issues/66887)、[#82936](https://github.com/NousResearch/hermes-agent/issues/82936)）。多条 P1 级 Bug 有修复 PR 跟进（如 [#83902](https://github.com/NousResearch/hermes-agent/pull/83902)），其中 P1 SessionDB WAL 泄漏问题（[#75269](https://github.com/NousResearch/hermes-agent/issues/75269)）今日已关闭。Honcho 内存插件相关 PR 集群（#83525、#83508、#72761、#83981）正在推进，显示出项目正在系统性解决多租户/多 Profile 下的数据隔离问题。

## 2. 版本发布

今日无新版本发布（Releases 为空）。

## 3. 项目进展

今日共合并/关闭 51 条 PR、23 条 Issue。从公开的 PR 列表中可见以下已关闭条目：

- [PR #83798: feat(browser) — auto-install the Browser Use CLI instead of silently downgrading](https://github.com/NousResearch/hermes-agent/pull/83798)：解决新安装环境下缺 uv/uvx 导致 Browser Use CLI 静默降级为内置浏览器工具的问题，提升开箱即用的体验。
- [PR #4004: feat — add X-Client-Source header to Tavily API requests](https://github.com/NousResearch/hermes-agent/pull/4004)：为 Tavily API 请求添加来源标识，便于上游归因。该 PR 自 3 月底开启，历时 4 个多月后于今日合并/关闭。

在 Bug 修复方面，以下重要修复 PR 仍处于待合并状态，但已进入评审/CI 阶段，值得关注：

- [PR #83902（P1，needs-decision）](https://github.com/NousResearch/hermes-agent/pull/83902)：修复 config.yaml 中 `model.default` 为 dict 类型时导致 agent 初始化崩溃（`'dict' object has no attribute 'lower'`）的问题，覆盖多条解析路径。
- [PR #84137](https://github.com/NousResearch/hermes-agent/pull/84137)：标题生成在 gateway 接受 `json_schema` 但返回空内容（200）时，继续降级尝试更低的 response_format 阶梯。
- [PR #84138](https://github.com/NousResearch/hermes-agent/pull/84138)：修复 `hermes -z` oneshot 模式未正确加载 personality 配置的问题。
- [PR #84135](https://github.com/NousResearch/hermes-agent/pull/84135)：修复 `@file:` 上下文展开时已知文本文件被误报为二进制文件的告警问题。

## 4. 社区热点

今日活跃度最高的议题集中在架构治理与多租户隔离两大方向：

**[#78647 — Epic: Shard all 20 god files — repo-wide god-file decomposition](https://github.com/NousResearch/hermes-agent/issues/78647)（评论 67 条，👍 0）**
该 Epic 确立了"god-file 必须分解且不可回退"的仓库级政策，覆盖 20 个超长文件。衍生子 Issue（如 [#78642 — 拆分 `tools/mcp_tool.py`](https://github.com/NousResearch/hermes-agent/issues/78642)，7,230 行）也获得 10+ 条评论。社区对模块化/可维护性的诉求强烈，维护者已将其标记为 `needs-decision`。

**[#34352 — Solving the Multi-Tenant Hermes Problem](https://github.com/NousResearch/hermes-agent/issues/34352)（评论 24 条，👍 3）**
多租户/多 Profile 数据隔离问题获得持续高关注。核心痛点是内存操作绕过 hook 系统，导致租户隔离必须 fork 核心才能实现。评论区有用户表示"已在生产环境运行修复版本数月"，侧面反映官方支持滞后。多个 honor 相关修复 PR（[#83525](https://github.com/NousResearch/hermes-agent/pull/83525)、[#83508](https://github.com/NousResearch/hermes-agent/pull/83508)、[#72761](https://github.com/NousResearch/hermes-agent/pull/72761)、[#83981](https://github.com/NousResearch/hermes-agent/pull/83981)）正试图补上这块短板。

**[#63177 — search_files silently returns 0 results on Windows with absolute paths](https://github.com/NousResearch/hermes-agent/issues/63177)（评论 13 条，👍 1）**
Windows 平台兼容性 bug（rg + MSYS_NO_PATHCONV 冲突），用户引用了具体 commit、平台版本和复现步骤，且明确声明"不是 #61915 的重复"，说明该问题在 Windows 用户群体中反复出现，修复意愿强烈。

## 5. Bug 与稳定性

按严重程度排列如下（P1 为最高）：

**P1 级**

- [Issue #54189（P1，needs-decision）](https://github.com/NousResearch/hermes-agent/issues/54189)：`state.db` 无界增长，2 周内达 659MB（938 sessions / 40K messages），无生命周期清理机制。长期运行实例受影响，暂无关联 PR。
- [PR #83902（P1）](https://github.com/NousResearch/hermes-agent/pull/83902)：dict 型 `model.default` 配置导致 agent 初始化崩溃，有修复 PR 待合并。
- [Issue #75269（P1，已关闭）](https://github.com/NousResearch/hermes-agent/issues/75269)：SessionDB 的 WAL 读者连接被缓存在强引用集合中，工作线程退出后不释放，导致 RLIMIT_NOFILE 耗尽。今日已关闭，修复已落地。

**P2 级（部分）**

- [Issue #82936（P2，安全边界）](https://github.com/NousResearch/hermes-agent/issues/82936)：多 Profile 模式下默认 Profile 的 secrets 泄漏到次要 Profile 的 `terminal` 工具及 Kanban 子进程中，破坏最小权限原则。暂无 fix PR。
- [Issue #83714（P2）](https://github.com/NousResearch/hermes-agent/issues/83714)：`patch`/`write_file` 工具向文件写入字面量 `...[truncated]` 文本，直接破坏源码文件。昨日（08-11）创建，今日已有 9 条评论，暂无 fix PR。
- [Issue #73082（P2）](https://github.com/NousResearch/hermes-agent/issues/73082)：桌面客户端（Electron）空闲时 Renderer/GPU 进程 CPU 占用 50–90%，导致发热和高能耗，需重启应用才能恢复。
- [Issue #71349（P2）](https://github.com/NousResearch/hermes-agent/issues/71349)：Dashboard 在切换模型（gemma4-12b → qwen2.5-14b）后卡在 "reconnecting" 状态，WebSocket 握手成功但 UI 不可用。
- [Issue #69603（P2，needs-repro）](https://github.com/NousResearch/hermes-agent/issues/69603)：`state.db` 修复后反复再损坏，一天内 4 次，schema 手术仅在进程内串行化且 sqlite_master 编辑不更新 schema cookie。
- [Issue #17345（P2）](https://github.com/NousResearch/hermes-agent/issues/17345)：中文用户反馈 hermes 与 openclaw 的 skills 存在互相污染，hermes 列出并展示了 openclaw 的 skills 内容。
- [Issue #63177（P2）](https://github.com/NousResearch/hermes-agent/issues/63177)：Windows 下 `search_files` 传入绝对路径时 rg 静默返回 0 结果（MSYS_NO_PATHCONV 冲突），详见社区热点。

## 6. 功能请求与路线图信号

**很可能纳入下一版本：**

- **多租户/多 Profile 隔离**（[#34352](https://github.com/NousResearch/hermes-agent/issues/34352)）：虽无官方 roadmap 声明，但 4+ 个 Honcho 相关修复 PR 同时推进（[#83525](https://github.com/NousResearch/hermes-agent/pull/83525) 客户端按 Profile 隔离、[#83508](https://github.com/NousResearch/hermes-agent/pull/83508) baseUrl/apiKey 解析修复、[#83981](https://github.com/NousResearch/hermes-agent/pull/83981) gateway 身份 UX 优化、[#72761](https://github.com/NousResearch/hermes-agent/pull/72761) 配置同步），表明这是当前开发重点。
- **god-file 分解**（[#78647](https://github.com/NousResearch/hermes-agent/issues/78647)）：仓库级重构政策已确立（"sharded, never reverted"），后续版本将持续拆分子任务，架构可维护性将显著提升。

**社区呼声较高但尚未有明确 PR：**

- [Issue #77221](https://github.com/NousResearch/hermes-agent/issues/77221)：桌面端缺少本地 token/成本分析界面，核心遥测数据已完整但 UI 未暴露。
- [Issue #49190](https://github.com/NousResearch/hermes-agent/issues/49190)：将 Kanban 通知泛化为通用事件订阅系统，支持任意端到端投递。
- [Issue #67442](https://github.com/NousResearch/hermes-agent/issues/67442)：跨进程 turn 序列化需要 DB 级 lease，解决 CLI-continuity 会话的并发边缘问题。
- [Issue #17542](https://github.com/NousResearch/hermes-agent/issues/17542)：TUI 状态栏官方插件 API（注意：#17540、#17542、#17543 为同一用户提交的重复 Issue，建议维护者合并）。

**已出现 PR 的新功能方向：**

- [PR #84139](https://github.com/NousResearch/hermes-agent/pull/84139)：在 `/v1/runs` API 上增加确切一次（exactly-once）提交语义，面向外部编排器，属 API 可靠性增强。
- [PR #82735](https://github.com/NousResearch/hermes-agent/pull/82735)：桌面端 `hermes://` deeplink 一键安装插件，降低插件安装门槛。
- [PR #84140](https://github.com/NousResearch/hermes-agent/pull/84140)：新增学术/研究类技能包（framework-research、phd-resources、academic-writing-templates）。
- [PR #83798](https://github.com/NousResearch/hermes-agent/pull/83798)：Browser Use CLI 自动安装，避免静默降级到内置浏览器工具。

## 7. 用户反馈摘要

- **多租户是企业级硬需求，但官方支持长期缺位**（[#34352](https://github.com/NousResearch/hermes-agent/issues/34352)）：该问题自 5 月底提交至今已有 2 个多月，用户反馈"已在生产环境跑自研修复数月"，说明核心痛点确实存在，同时官方响应速度有待提升。
- **Windows 平台兼容性持续困扰用户**（[#63177](https://github.com/NousResearch/hermes-agent/issues/63177)）：用户提交了详细的复现步骤、commit 和平台版本，明确指出"不是 #61915 的重复"，但该问题自 7 月 12 日起已搁置一个月而未关闭，反映 Windows 平台的 CI 覆盖和回归测试可能不足。
- **桌面端能耗问题影响实际使用**（[#73082](https://github.com/NousResearch/hermes-agent/issues/73082)）：用户在 macOS 上报告 HERMES 成为"最高能耗应用"，机器明显发热，"退出重开才能缓解"，对日常开发流有实际干扰。
- **patch/write_file 工具截断会直接毁掉用户代码**（[#83714](https://github.com/NousResearch/hermes-agent/issues/83714)）：向文件写入字面 `...[truncated]` 文本导致语法错误，属于高危工具缺陷，昨日提交后已有 9 条评论说明受影响用户较多，应优先处理。
- **中文用户的实际使用问题反馈**（[#17345](https://github.com/NousResearch/hermes-agent/issues/17345)）：有用户在 macOS 上同时安装 hermes 与 openclaw，发现 skills 互相污染，hermes 能看到并列举 openclaw 的 skills。该 issue 自 4 月底提交至今仍为 open，标签为 P2。

## 8. 待处理积压

以下 Issue/PR 持续时间较长且尚未解决，建议维护者关注：

- [Issue #2975（P3，2026-03-25 创建，4.6 个月）](https://github.com/NousResearch/hermes-agent/issues/2975)：WhatsApp bridge 在 macOS 上仅检查 `node` 是否在 PATH 中，忽略 Electron 内置的可用 Node 运行时。至今仍 open，已影响 macOS 上的 WhatsApp 网关使用。
- [Issue #17540 / #17542 / #17543（P3，2026-04-29 创建，3.4 个月）](https://github.com/NousResearch/hermes-agent/issues/17542)：三位 Issue 实为同一用户提交的重复内容（TUI 状态栏插件 API），仍未合并或关闭其中一个，造成了沟通噪音。
- [PR #4004（2026-03-30 创建，今日才合并/关闭）](https://github.com/NousResearch/hermes-agent/pull/4004)：仅添加一个 HTTP header 的微小改动，等待了 4.5 个月，流程效率有待提升。
- [Issue #31272（P2，2026-05-24 创建，2.7 个月）](https://github.com/NousResearch/hermes-agent/issues/31272)：oMLX 下上下文长度自动检测错误（MiniMax-M2.7 实际 186K 被识别为 256K）。被标记为 duplicate 但仍为 open 状态，需要维护者确认重复来源或关闭。

---

*本报告基于 2026-08-12 当天 GitHub 数据生成，客观呈现 hermes-agent 项目的开发进度、社区关注点和健康度。所有链接均可点击直达对应 Issue/PR 页面。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报（2026-08-12）

## 1. 今日速览

过去 24 小时 AstrBot 社区活跃度中上：共产生 9 条 Issues 更新（新开/活跃 7 条，关闭 2 条），6 条 Pull Requests 更新（全部处于待合并状态），无新版本发布。社区侧主要动力来自插件生态扩张——「火影忍者手游查询」「AI 媒体生成」「运维工具包」3 个新插件提交；开发侧重点在平台适配修复（Telegram 代理、视频笔记、PowerShell 7）与 provider 能力延伸（MiniMax TTS、Anthropic 缓存优化）。项目整体处于稳步迭代状态，无阻塞性回归，知识库上传 bug 已随 #9538 关闭得到解决。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日无 PR 被合并，但有 2 个 Issues 关闭，其中 **#9538 知识库上传 .md 文档失败问题已在 v4.27.1 中解决**，涉及文本分块成功但向量索引写入失败的模糊错误，该关闭标志着知识库链路稳定性修复落地。

当前待合并 PR 反映了项目在以下方向的前进轨迹：

- **平台适配补齐**：Telegram 专属代理配置（#9558）、Telegram 视频笔记转 Video 组件（#9627）、Discord 命令组注册（#9445，draft 状态）
- **Provider 能力扩展**：MiniMax TTS 增加 voice design 能力（#9543）
- **本地运行体验**：Windows 本地 shell 支持 PowerShell 7，用户可在 WebUI 选择 shell 版本（#9622，修复 #9614）
- **插件机制优化**：重排 fake tool call 消息，提升确定性工具调用的 token 效率与延迟表现（#9451）

这些 PR 虽未合并，但覆盖了社区反馈的高频痛点（Telegram 网络隔离、Windows 终端兼容等），预计合入后将显著改善多平台使用体验。

## 4. 社区热点

- **[#9628 [Plugin] astrbot_plugin_hyrz（火影忍者手游查询）](https://github.com/AstrBotDevs/AstrBot/issues/9628)｜4 条评论**：今日最活跃讨论。插件提供 150+ 玩家别称自动翻译、完整忍者资料与机制知识，并支持 LLM 对话自动调用。高评论量反映游戏垂直类插件在 AstrBot 社区具备可观受众，社区对"查询 + LLM 自动调用"的插件范式接受度高。

- **[#9626 [Bug] send_message_to_user 报 no such file](https://github.com/AstrBotDevs/AstrBot/issues/9626)｜3 条评论**：用户在容器环境中确认文件存在且权限为 `rwxrwxrwx`，但工具调用仍报 file 不存在。该问题直接阻塞文件类工具在消息发送场景的使用，评论区推测可能涉及路径解析或沙箱映射，值得维护者关注。

- **[#9625 [Bug] Anthropic prompt cache hit rate still low](https://github.com/AstrBotDevs/AstrBot/issues/9625)｜3 条评论**：用户精准指出 PR #9197 引入的 `cache_control` 落在动态 datetime 块上导致命中率接近 0%，并附带了 Anthropic 对缓存块尾部匹配机制的技术分析。此类"技术细节拉满"的 issue 说明社区有资深用户深度参与成本优化讨论。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 高 | [#9626](https://github.com/AstrBotDevs/AstrBot/issues/9626) | 文件存在且权限正确，但 `send_message_to_user` 仍报 no such file，阻塞文件消息发送 | 待处理，无 fix PR |
| 中 | [#9625](https://github.com/AstrBotDevs/AstrBot/issues/9625) | Anthropic prompt cache 命中率接近 0%，`cache_control` 打在动态时间戳块上，导致 token 成本居高不下 | 待处理，PR #9197 需跟进修正 |
| 中 | [#9630](https://github.com/AstrBotDevs/AstrBot/issues/9630) | v4.27.2 发送消息链失败，日志指向 Reply + Image 组合场景，错误信息被截断 | 新开，待复现补充 |
| 低 | [#9629](https://github.com/AstrBotDevs/AstrBot/issues/9629) | 与 #9630 日志内容基本一致，已作为重复问题关闭 | 已关闭 |
| 已解决 | [#9538](https://github.com/AstrBotDevs/AstrBot/issues/9538) | 知识库上传 .md 文档写入索引失败（v4.27.1），与 PR #7866 场景相似 | 已关闭 |

两个"报错"类 issue（#9629/#9630）内容高度重合，建议维护者后续可补充日志截断信息或引导用户提供完整堆栈，避免重复提交。

## 6. 功能请求与路线图信号

- **插件生态持续扩充（3 个新插件）**：
  - [#9628 火影忍者手游查询](https://github.com/AstrBotDevs/AstrBot/issues/9628)：游戏数据查询 + LLM 自动调用
  - [#9623 AI 媒体生成](https://github.com/AstrBotDevs/AstrBot/issues/9623)：图片/视频生成与语音理解，接入 Seedream/Seedance/OpenAI/火山引擎
  - [#9624 运维工具包](https://github.com/AstrBotDevs/AstrBot/issues/9624)：网站信息、端口扫描、DNS、SSL 检查等综合运维

- **平台适配需求**：Telegram 专属代理（#9558）与视频笔记支持（#9627）均已有对应 PR，且后者连开 2 个 PR（#9558、#9627）由同一作者贡献，说明 Telegram 在社区用户基数中占比可观。

- **Provider 与运行时**：MiniMax TTS voice design（#9543）、PowerShell 7（#9622）皆为明确功能补强，贴合"降低使用门槛 + 扩展接入服务"的路线。

- **长期机制优化**：#9451 提出的 fake tool call 尾部重排方案，若合入将利好所有依赖确定性工具调用的插件（如 LivingMemory 的长短期记忆注入），此 PR 有潜力成为插件生态的基础能力升级。

## 7. 用户反馈摘要

- **知识库功能（#9538）**：用户花了较长时间排查网络、API 密钥、分块与向量化步骤，最终问题收敛到"写入本地向量数据库索引"阶段。问题关闭较快，但"存储失败"这类模糊报错对自部署用户不够友好，建议后续优化错误信息粒度。

- **Anthropic 缓存（#9625）**：用户明确指出"最后一个 system block 是动态日期时间"这一实现细节，批评 PR #9197 的 cache_control 策略"设计上就无法命中"。这属于用户对成本敏感场景的合理诉求，期望 AstrBot 在 prompt 组装层面将静态与动态内容分离。

- **Windows 终端体验（#9622）**：用户希望本地 shell 支持 PowerShell 7 的 `&&`、`??` 等语法。反馈反映了"用 AstrBot 管理本地机器"的真实使用场景，WebUI 可选 shell 是一个低成本高收益的交互改进。

- **电费监控插件（#9603）**：用户报告湖州师范学院等高校使用 ISIMS 电费系统，标准接口返回"房间信息不存在"，插件完全不可用，并提供了接口响应样例与修复建议。体现教育用户群体对"学校生活场景专用插件"的刚性需求。

## 8. 待处理积压

以下 PR 开放时间较长，建议维护者安排 review 或明确回复：

- **[#9445 feat: register Discord command groups](https://github.com/AstrBotDevs/AstrBot/pull/9445)｜已开放 14 天（7/29）**：Draft 状态，作者主动请求维护者反馈，解决 Discord 应用命令注册时跳过 CommandGroupFilter 的问题。关系插件在 Discord 平台的命令兼容性。

- **[#9451 fix: reorder fake tool call messages at tail](https://github.com/AstrBotDevs/AstrBot/pull/9451)｜已开放 13 天（7/30）**：改动涉及消息尾部注入顺序，可能影响部分插件依赖的上下文时序，需要核心维护者评估兼容性。

- **[#9543 feat: add MiniMax voice design to TTS](https://github.com/AstrBotDevs/AstrBot/pull/9543)｜已开放 8 天（8/4）**：MiniMax TTS 功能补全，无评论、无 reviewer 指派，处于等待状态。

> 此外，[#9614](https://github.com/AstrBotDevs/AstrBot/issues/9614)（PowerShell 7 支持请求）已被 #9622 修复并等待合并，建议与 #9622 联动处理，避免 issue 长时间悬挂。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*