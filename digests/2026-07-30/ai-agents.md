# OpenClaw 生态日报 2026-07-30

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-07-29 22:48 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

以下是根据 OpenClaw 项目 2026-07-29 的 GitHub 活动数据生成的 2026-07-30 项目动态日报。

---

# OpenClaw 项目动态日报 | 2026-07-30

## 1. 今日速览

过去 24 小时，OpenClaw 项目社区迎来爆发式提交：累计更新 **500 条 Issue**（新开/活跃 437，关闭 63，闭合率 **12.6%**）和 **500 条 Pull Request**（待合并 416，已合并/关闭 84，合并率 **16.8%**）。项目天级操作量达到千级，处于高速迭代与高频用户反馈并行的剧烈波动期。社区讨论高度聚焦于**记忆安全（Memory Poisoning）**、**Codex 集成引发的 CPU 熔断与渠道恢复失败**等核心稳定性与安全性议题。**项目健康度：活跃度极高，稳定性承压。**今日暂无新版本发布。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

尽管版本未更新，过去 24 小时内维护者合入/关闭了一系列关键补丁，显著改善了会话持久化与 Agent 间通信的鲁棒性：

- **Agent 间通信修复**：关闭了长期存在的 `sessions_send` 回环导致重复消息问题 [#39476](https://github.com/openclaw/openclaw/issues/39476)，以及并发 Agent 调用导致的会话树分叉 [#98790](https://github.com/openclaw/openclaw/issues/98790)。
- **记忆与上下文修复**：修复了 `session-memory` 钩子保留原始 Chat 模板 Token 导致的模型输出自强化投毒循环 [#69943](https://github.com/openclaw/openclaw/issues/69943)，以及 WebChat 会话转录每轮被覆盖的重度回归 [#77012](https://github.com/openclaw/openclaw/issues/77012)。
- **渠道稳定性**：修复了 WhatsApp 长模型调用导致会话卡死及不完整回复 [#84569](https://github.com/openclaw/openclaw/issues/84569)，以及 Discord 子任务默认进入 `done_only` 状态导致无进度反馈的假死问题 [#87665](https://github.com/openclaw/openclaw/issues/87665)。
- **插件与钩子系统**：`message_sending` 钩子在渠道回复路径中被静默绕过的问题得到解决 [#92374](https://github.com/openclaw/openclaw/issues/92374)。
- **平台兼容性**：修复了 macOS `gateway install` 命令在已有系统级 LaunchDaemon 时重复注册 GUI 级 LaunchAgent 导致的重启风暴 [#97178](https://github.com/openclaw/openclaw/issues/97178)。

---

## 4. 社区热点

过去 24 小时内，以下议题引发了社区最深度的讨论：

1.  **[#7707](https://github.com/openclaw/openclaw/issues/7707) Feature: 记忆来源信任标记（22 条评论）**
    讨论最为深入。用户忧虑网页抓取或第三方技能中的隐藏指令会污染长期记忆。尽管该 Issue 赞数不高，但技术路线和架构讨论极为激烈，代表了社区对 Agent 安全的前瞻性思考。

2.  **[#91009](https://github.com/openclaw/openclaw/issues/91009) Codex PreToolUse 原生 Hook 导致 CPU 满载与 RPC 阻塞（18 条评论）**
    生产部署的典型痛点。开启 Codex 集成后，系统大量派生 CPU 密集型 `openclaw-hooks` 进程，导致网关 RPC 停滞。目前该 Issue 被标记为 P1 钻石龙虾级，但尚无修复 PR。

3.  **[#115326](https://github.com/openclaw/openclaw/issues/115326) 崩溃断路器抑制 Discord/WhatsApp 且恢复路径失效（16 条评论）**
    严重回归问题遭到广泛吐槽。用户按官方文档执行 `channels.start` 恢复，依然返回 WebSocket 1006 错误，渠道被永久沉默，用户期望维护者快速介入。

4.  **[#86996](https://github.com/openclaw/openclaw/issues/86996) Active Memory + Codex 导致长响应延迟与钩子超时（15 条评论）**
    用户反馈开启 Active Memory 和 `lossless-claw` 后，即使执行简单的 Telegram 消息也变得极度不可靠，暴露了外部记忆模块与长上下文引擎集成后的性能瓶颈。

---

## 5. Bug 与稳定性

### 🔴 P0 数据丢失级

- **内存文件被静默删除**：[#84882](https://github.com/openclaw/openclaw/issues/84882) `memory-core` 梦境回收步骤静默删除了用户每日记忆文件（`memory/YYYY-MM-DD.md`）。目前卡在 `needs-info` 阶段，尚无修复 PR。
- **Schema 降级恢复清空状态库**：[#115421](https://github.com/openclaw/openclaw/issues/115421) 状态数据库降级时直接将高版本 SQLite 文件隔离并清空，导致所有 Cron 作业和会话状态丢失，属于对生产环境的灾难级损害。
- **OOM 后恢复陷入死亡循环**：[#115424](https://github.com/openclaw/openclaw/issues/115424) 网关 V8 堆内存溢出（SIGABRT）后，重启自动恢复机制反复拉起同一个崩溃会话，将单次 Crash 演变为 7 次核心转储循环。等待维护者介入。

### 🟠 P1 核心链路阻断

- **Codex CPU 满载（无修复 PR）**：[#91009](https://github.com/openclaw/openclaw/issues/91009)
- **模型安全拒绝不触发 Fallback（无修复 PR）**：[#98976](https://github.com/openclaw/openclaw/issues/98976) Anthropic refusal / OpenAI content_filter 返回后直接硬错误，不触发 fallback 链。
- **子进程泄露/僵尸进程（无修复 PR）**：[#97616](https://github.com/openclaw/openclaw/issues/97616) 钩子和工具脚本导致的 `openclaw-hooks` / `bash` 进程未被正确回收，累积后导致运行时性能退化。
- **长回复静默截断（无修复 PR）**：[#84516](https://github.com/openclaw/openclaw/issues/84516) 回复在 1000–1100 字符处截断，模型无报错，用户毫无察觉。
- **崩溃断路器抑制恢复无效**：[#115326](https://github.com/openclaw/openclaw/issues/115326)

### 🟢 今日已修复的 Bug

- [#115812](https://github.com/openclaw/openclaw/issues/115812) `enqueuePluginNextTurnInjection` 返回 `undefined` 导致静默会话恢复失败（已关闭）。
- [#77012](https://github.com/openclaw/openclaw/issues/77012) WebChat 转录被覆盖回归（已关闭）。
- [#69943](https://github.com/openclaw/openclaw/issues/69943) 记忆自强化投毒循环（已关闭）。

---

## 6. 功能请求与路线图信号

### 高优先级 / 可能纳入下个版本

- **[#10687](https://github.com/openclaw/openclaw/issues/10687) 动态模型发现**：社区强烈要求支持 OpenRouter 等快速迭代的模型目录，不再依赖静态生成目录。
- **[#82548](https://github.com/openclaw/openclaw/issues/82548) AI 安全与质量可观测性**：社区对提示注入监控、溯源质量信号的要求日益强烈。
- **[#13219](https://github.com/openclaw/openclaw/issues/13219) 分模型用量日志**：企业级用户要求原生支持 Token 消耗和成本跟踪。

### 中期规划 / 社区建议

- **[#88154](https://github.com/openclaw/openclaw/issues/88154) Slack 模态框支持**：结构化交互的需求。
- **[#73537](https://github.com/openclaw/openclaw/issues/73537) 生产就绪稳定性标签**：忠实用户呼吁在发布时提供稳定性评级（Alpha/Beta/Stable）。
- **[#8299](https://github.com/openclaw/openclaw/issues/8299) 抑制子 Agent 通告**：减少 `sessions_spawn` 后的上下文污染。
- **[#86023](https://github.com/openclaw/openclaw/issues/86023) Codex 长会话语义缓存**：优化长运行会话的性能与缓存所有权。

---

## 7. 用户反馈摘要

以下是来自 Issue 评论区的真实用户声音提炼：

- **不满意 / 痛点：**
  > “之前正常工作的功能，升级后崩溃循环器直接永久屏蔽了 WhatsApp 和 Discord，官方推荐的恢复路径完全没用，这对我们来说是生产事故。” —— [#115326](https://github.com/openclaw/openclaw/issues/115326)
  > “简单的 Telegram 私信，开启 Active Memory 后经常超时或挂起，核心链路太脆弱了，我们不得不关闭了这个功能。” —— [#86996](https://github.com/openclaw/openclaw/issues/86996)
  > “Schema 降级直接把我所有的 Cron 任务和状态库全部清空了，备份也差点没保住，这种数据丢失对系统信任是毁灭性的。” —— [#115421](https://github.com/openclaw/openclaw/issues/115421)
  > “模型回复在 1000 字符处被截断，没有任何报错，我们排查了几个小时才找到问题，这属于隐形的数据损坏。” —— [#84516](https://github.com/openclaw/openclaw/issues/84516)

- **满意 / 肯定：**
  > “感谢 OpenClaw，它已经成为我们家庭和企业日常自动化工作流中不可或缺的一部分。”（同时批评发布版本缺少稳定性标签） —— [#73537](https://github.com/openclaw/openclaw/issues/73537)
  > “WebHook 多轮会话和 Agent 间通信的底层修复非常及时，这解决了我们跨 Agent 编排的核心障碍。” —— 来自 [#39476](https://github.com/openclaw/openclaw/issues/39476)、[#11665](https://github.com/openclaw/openclaw/issues/11665) 的趋势评论

- **安全顾虑：**
  > “很担心网页抓取的内容或第三方技能通过污染记忆来操纵 Agent 行为，希望尽快通过来源信任标签来构建安全边界。” —— [#7707](https://github.com/openclaw/openclaw/issues/7707)、[#69943](https://github.com/openclaw/openclaw/issues/69943)

---

## 8. 待处理积压

以下 Issue 长期未获得有效回复或修复 PR，可能消耗社区信任，提醒维护团队关注：

| Issue | 级别 | 创建时间 | 摘要 | 当前状态 |
|-------|------|----------|------|----------|
| [#86215](https://github.com/openclaw/openclaw/issues/86215) | P1 | 2026-05-24 | Codex OAuth 刷新失败可导致 Agent 停滞数小时，缺乏告警和配置文件轮换 | `needs-maintainer-review` |
| [#69086](https://github.com/openclaw/openclaw/issues/69086) | P2 | 2026-04-19 | `attempt-execution` 回滚的会话历史守卫过宽，缺少重试提示钩子 | `needs-product-decision` |
| [#86063](https://github.com/openclaw/openclaw/issues/86063) | P2 | 2026-05-24 | Anthropic 缓存头移动导致每轮对话历史缓存作废，造成速度与成本浪费 | `needs-maintainer-review` |
| [#74378](https://github.com/openclaw/openclaw/issues/74378) | P2 | 2026-04-29 | Windows 平台 CLI 命令执行后 `node.exe` 进程常驻残留 | `needs-maintainer-review` |
| [#72370](https://github.com/openclaw/openclaw/issues/72370) | P2 | 2026-04-26 | 工作区自定义 Hook 被静默拒绝并替换为内部空版本 | `needs-product-decision` |

---
*数据来源：GitHub OpenClaw / openclaw，统计截止 2026-07-29 23:59 UTC。分析撰写：OpenClaw 项目分析师。*

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告（2026-07-30）

## 1. 生态全景

当前 AI 智能体开源生态正处于 **“从可用到可信”的转折期**。各项目日均操作量达数十至上千级，社区反馈极其活跃，但数据持久化、记忆安全、MCP 集成稳定性等基础问题反复出现，表明行业尚未建立成熟的生产级质量标准。推理模型（Reasoning Model）的普及正在催生新的 Token 估算与兼容性需求，而多平台渠道（QQ、Discord、WhatsApp）的适配深度与一致性成为用户留存的关键胜负手。整体来看，快速迭代是主旋律，但“稳”与“安”正在取代“快”成为下一阶段竞争的焦点。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | 合并/关闭率 | 新版本 | 健康度评估 |
|------|------------|---------|------------|--------|-----------|
| **OpenClaw** | 500（新开/活跃 437，关闭 63） | 500（待合并 416，合并/关闭 84） | Issue 闭合 12.6% / PR 合并 16.8% | 无 | ⚠️ 活跃度极高，稳定性承压 |
| **hermes-agent** | 500（总量） | 500（总量） | 未明确，但大量技术债合并 | 无 | ✅ 活跃度极高，可维护性显著提升 |
| **QwenPaw** | 25（含新开/关闭） | 50（合并/关闭 5+，多个待合） | 高（多关键修复已合入） | 无 | ⚠️ 开发效率高，回归问题需警惕 |
| **Zeroclaw** | 50（新开/活跃 41，关闭 9） | 50（待合并 45，合并/关闭 5） | Issue 闭合 18% / PR 合并 10% | 无 | ✅ 极活跃，深度架构决策期 |
| **AstrBot** | 11（新开/活跃 8，关闭 3） | 12（合并/关闭 5，待合 7） | 合并率 41.7% | 无 | ✅ 高速迭代，团队响应及时 |
| **PicoClaw** | 1 新 Issue（#3301） | 2 PR 获得更新，0 合并 | — | 无 | 🟢 中等活跃，代码库稳定 |

## 3. OpenClaw 在生态中的定位

**规模领先，问题亦为生态风向标。** OpenClaw 日处理千级 Issue/PR，社区讨论深度与广度远高于其他项目。它的核心优势在于**多 Agent 间通信与会话持久化**（修复了会话树分叉、回环重复等底层问题），以及**记忆系统的完整性与安全性**（记忆投毒循环、梦境回收丢失文件），这些正是其他项目尚未触及的深水区。但 OpenClaw 当前暴露的 **Codex 集成导致 CPU 熔断**、**崩溃断路器永久沉默渠道** 等严重稳定性问题，也使其成为整个生态“高迭代、低稳定”现状的典型代表。与 Zeroclaw 偏重 MCP 标准化、QwenPaw 偏重快速用户体验迭代相比，OpenClaw 更像一个**全栈试验场**，其架构决策（如记忆信任标记、Schema 降级保护）可能为行业提供早期范本。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|----------|----------|----------|
| **记忆/上下文安全与持久化** | OpenClaw, QwenPaw, Zeroclaw, AstrBot | 记忆投毒防御（OpenClaw #7707）、梦境数据丢失（OpenClaw #84882）、技能标签重启消失（QwenPaw #6537）、记忆分离为独立类别（Zeroclaw #9048）、对话存档与回滚（AstrBot #9433） |
| **MCP 集成稳定性与安全审批** | OpenClaw, Zeroclaw, QwenPaw, hermes-agent | CPU 满载与 RPC 阻塞（OpenClaw #91009）、响应 ID 不匹配（Zeroclaw #9186）、工具名前缀导致 LLM 报错（QwenPaw #6557）、缺少首次调用人工审批（hermes-agent #16462） |
| **多渠道适配与流式可靠性** | OpenClaw, QwenPaw, AstrBot, hermes-agent | Discord/WhatsApp 永久沉默（OpenClaw #115326）、QQ 官方流式首字丢失（AstrBot #9440）、OneBot/QQ 文本渲染（QwenPaw #6543）、Discord Profile 隔离失效（hermes-agent #72348） |
| **推理模型（Reasoning Model）兼容性** | hermes-agent, QwenPaw, Zeroclaw | Token 估算偏差（hermes-agent #73298）、思考预算检测遗漏（hermes-agent #73336）、DeepSeek 上下文压缩报错（QwenPaw #6541）、OpenAI Completions 适配器需求（Zeroclaw #8603） |
| **可观测性与调试透明度** | OpenClaw, Zeroclaw, AstrBot, hermes-agent | 质量信号与溯源（OpenClaw #82548）、跨轮次 OTel 关联（Zeroclaw #8933）、日志显示思考过程（AstrBot #9438）、回合实时时间感知（hermes-agent #10421） |

## 5. 差异化定位分析

| 维度 | OpenClaw | hermes-agent | QwenPaw | Zeroclaw | AstrBot | PicoClaw |
|------|----------|--------------|---------|----------|---------|----------|
| **功能侧重** | 全栈 Agent 框架，记忆系统与多 Agent 编排 | 架构重构与插件 SDK，推理模型支持 | 快速迭代的桌面端 Agent，渠道覆盖广 | 安全与配置标准，MCP 生态兼容 | 轻量聊天机器人，适配器丰富 | 边缘/嵌入式 Agent（树莓派） |
| **目标用户** | 专业开发者/企业部署 | 高级用户/Plugin 生态开发者 | 重度桌面用户/个人效率 | 注重安全与标准化的团队 | 中小团队/个人快速搭建 | 嵌入式/低功耗爱好者 |
| **技术架构** | 未知语言 (Go/Node?)，高并发路由与钩子系统 | Python + Electron + Rust（Desktop），测试瘦身明显 | Python + 前端（ChatUI），特性驱动迭代 | Rust（推测）主导，强调类型安全与配置校验 | Python，模块化适配器模型 | Python 轻量，单机运行 |
| **关键差异化** | 记忆投毒检测、Schema 降级保护等前瞻安全设计 | 测试基础设施大幅优化（58% 测试移除，零 Flake） | 社区响应最快（当日合入多个 PR） | 丰富 RFC 推动长期架构（密钥源、记忆分离） | SSL 漏洞被快速披露但修复中 | 极低资源占用，适合 IoT |
| **核心瓶颈** | 稳定性事故频发（OOM、数据丢失） | Windows 与 Desktop 体验割裂 | 数据持久化回归（配置丢失） | 待合 PR 积压 45 条，决策流程慢 | 渠道适配深度不足（Discord 中文） | 社区规模小，功能迭代慢 |

## 6. 社区热度与成熟度分层

- **第一梯队（极高活跃度，千级操作量）**  
  **OpenClaw** 与 **hermes-agent** 日 Issue/PR 在 500 条以上，社区讨论深度高。两者均处于 **“边补边重构”** 阶段，但 OpenClaw 稳定性承压更明显，hermes-agent 则通过大规模测试瘦身与架构解耦向成熟迈进。

- **第二梯队（高活跃度，百级操作量）**  
  **QwenPaw** 和 **Zeroclaw** 操作量在 50–100 级别。QwenPaw 在特性合入速度上领先，但回归问题引起用户警惕；Zeroclaw 在 RFC 与架构设计上投入最大，适合长期关注的开发者。

- **第三梯队（中等活跃，十级操作量）**  
  **AstrBot** 规模较小但响应及时，合并率最高（41.7%），正处于快速积累功能阶段；**PicoClaw** 活跃度最低，但代码稳定，适合场景单一、追求可靠的用户。

## 7. 值得关注的趋势信号

1. **记忆安全正成为 Agent 可信度的核心门槛。** 三个独立项目（OpenClaw #7707, QwenPaw #6555, Zeroclaw #9048）同时围绕记忆来源信任、数据丢失、类别分离展开讨论，预示行业将从“能记忆”向“安全记忆”升级。开发者应在 Agent 设计早期引入来源标记与回滚能力。

2. **MCP 引入的系统级风险被低估。** 从 OpenClaw 的 CPU 熔断到 hermes-agent 的人工审批缺失，MCP 在提供标准化工具接入的同时带来了资源失控与安全盲区。建议部署 MCP 的团队优先关注超时保护、资源限额与审批链。

3. **推理模型的爆发式普及正在暴露基础设施断层。** hermes-agent 的 Token 估算偏差（#73298）与检测遗漏（#73336）说明传统上下文压缩算法对 reasoning_content 字段缺乏兼容，Zeroclaw 与 QwenPaw 的适配器需求也印证了这一点。这为模型路由、缓存与成本跟踪工具创造了新市场。

4. **跨渠道一致性与“静默失败”是用户体验最大的隐性杀手。** QQ 流式丢字、WhatsApp/Discord 永久沉默、邮件通道缺少 CC 等功能缺陷在多个项目中反复出现，且用户往往在问题发生后数小时才察觉。建议引入渠道健康度面板与端到端响应验证。

5. **社区对 “生产就绪” 标签的呼声上升。** OpenClaw #73537 要求发布时注明 Alpha/Beta/Stable，AstrBot #9438 要求更透明的中间状态日志，反映用户群体正从尝鲜者向严肃使用者转变。项目维护者应正视这一诉求，主动披露已知风险与质量等级。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-07-30

---

## 1. 今日速览

过去 24 小时，Zeroclaw 社区保持极高活跃度：共产生 **50 条议题更新**（新开/活跃 41 条，关闭 9 条）和 **50 条拉取请求更新**（待合并 45 条，合并/关闭 5 条）。本周无新版本发布，但大量高风险 RFC（如 #9048、#9127）的持续讨论表明项目正处于深度架构决策期。核心团队的审查能力面临压力（45 条待合 PR），但关键 Bug 修复（如 MCP 并发调用 #9418）已成功合并，稳定性持续改善。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日合并或关闭了多项重要 PR 与议题，主要进展包括：

- **MCP 并发与响应匹配修复**：PR [#9418](https://github.com/zeroclaw-labs/zeroclaw/pull/9418)（`fix(mcp): multiplex stdio calls without replaying unknown outcomes`）已合并。该修复解决了 Stdio MCP 路径中三个相互叠加的缺陷——响应 ID 被忽略、30 秒硬超时与工具预算不匹配、调用期间互斥锁保持。此 PR 是议题 #9186 的修复，标志着 MCP 子系统可靠性显著提升。
- **配置默认值更正**：PR [#9299](https://github.com/zeroclaw-labs/zeroclaw/pull/9299)（`fix(config): default context_compression.enabled to false`）已合并。`context_compression.enabled` 默认值从 `true` 更正为 `false`，并增加了对无效配置表面的警告。对应议题 #9278 关闭。
- **发行版与工具链修复**：先后修复了 `config patch --json` 错误路径明文输出（#9239 关闭）、Windows 平台单元测试编译失败（#9422 关闭）、npm 审计高危漏洞（#9235 关闭）、文档构建告警（#7269 关闭）等多项影响开发者体验的问题。
- **功能提案清理**：为期 4 个月的 `HMAC tool execution receipts`（#4830）经充分讨论后关闭，相关设计思路可能融入未来安全机制。

---

## 4. 社区热点

今日讨论热度最高的议题集中在架构重构与标准化方向：

- **[#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048) RFC: 分离对话历史与长期记忆**（11 条评论）：社区普遍认同 ZeroClaw 应当区分会话历史（自动保存）与代理策展的长期记忆，但实现层仍混用。评论聚焦于 `MemoryCategory::Conversation` 的边界定义与运行时自动保存逻辑的修改方案。
- **[#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127) RFC: 抽象 `KeySource` trait**（8 条评论）：提案旨在将主密钥材料按来源/部署形态分类，统一目前 93 个 `#[secret]` 字段的加密行为。讨论热点包括硬件安全模块支持策略与密钥轮换生命周期。
- **[#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) RFC: OpenAI Chat Completions 兼容适配器**（6 条评论）：社区表达了对接入 Open WebUI、LobeChat 等生态的强烈需求。讨论集中在协议转换层、流式响应映射与工具调用适配。
- **[#8933](https://github.com/zeroclaw-labs/zeroclaw/issues/8933) RFC: 跨轮次对话关联到 OTel 导出**（6 条评论）：可观测性社区希望 ZeroClaw 导出 `gen_ai.conversation.id` 以实现跨请求追踪。议题涉及会话 ID 的生成策略与生命周期管理。
- **新提案引关注**：昨日提交的 [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)（统一附件架构）与 [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)（运行时会话所有权）起始即获 4 条评论，讨论集中在对 WebSocket 通道和 Web 面板的架构影响。

---

## 5. Bug 与稳定性

| 严重程度 | 议题 | 摘要 | 状态 | 修复 PR |
|----------|------|------|------|---------|
| **P1/高风险** | [#9340](https://github.com/zeroclaw-labs/zeroclaw/issues/9340) | CLI 创建的 cron 任务无法投递输出（`delivery.mode = "none"` 硬编码），造成工作流阻断 | `in-progress` | 暂无 |
| **P1/高风险**（已修复） | [#9186](https://github.com/zeroclaw-labs/zeroclaw/issues/9186) | MCP stdio 响应 ID 不匹配、30s 超时硬编码、互斥锁持有过久 | 已关闭 | [#9418](https://github.com/zeroclaw-labs/zeroclaw/pull/9418) 已合并 |
| **P1/中风险**（已修复） | [#9239](https://github.com/zeroclaw-labs/zeroclaw/issues/9239) | `config patch --json` 在两条失败路径中输出明文错误 | 已关闭 | 已修复 |
| **P1/低风险**（已修复） | [#9422](https://github.com/zeroclaw-labs/zeroclaw/issues/9422) | zeroclaw-config 单元测试在 Windows 上因 `cfg(unix)` 守卫无法编译 | 已关闭 | 已修复 |
| **P2/高风险** | [#9486](https://github.com/zeroclaw-labs/zeroclaw/issues/9486) | 高熵检测器在 Telegram 通道中错误屏蔽 Solana 钱包地址，且 `high_entropy_tokens=false` 无效 | `accepted` | 暂无 |
| **P2/高风险** | [#9462](https://github.com/zeroclaw-labs/zeroclaw/issues/9462) | zeroclaw-plugins 的 lib 单元测试因 feature gate 从未在 CI 中执行 | `in-progress` | 暂无 |
| **P2/高风险** | [#9506](https://github.com/zeroclaw-labs/zeroclaw/issues/9506) | 邮件通道无法保留 CC 收件人或发送全部回复 | `in-progress` | 暂无 |
| **P3/高风险** | [#6724](https://github.com/zeroclaw-labs/zeroclaw/issues/6724) | 启用空凭据的 Signal/Voice 通道导致 supervisor crashloop | `in-progress` | 暂无 |

此外，npm 审计漏洞（#9235）、上下文压缩配置误导（#9278）等中低严重度 Bug 已于今日关闭。

---

## 6. 功能请求与路线图信号

今日社区提出的新功能需求集中在以下方向，均以 RFC 形式提交：

- **架构重构方向**：[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)（统一附件架构）提议将文件上传、内容推断、安全扫描统一到通道层；[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)（运行时会话所有权）提议让 `zeroclaw-runtime` 成为会话生命周期的唯一所有者，其他组件退化传输/表面适配器。
- **外部生态兼容**：[#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)（OpenAI Chat Completions 适配器）和 [#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106)（A2A 出站客户端）希望打破协议孤岛，接入更广泛的 AI 应用与代理网络。
- **可观测性与安全增强**：[#8933](https://github.com/zeroclaw-labs/zeroclaw/issues/8933)（跨轮次 OTel 关联）、[#9511](https://github.com/zeroclaw-labs/zeroclaw/issues/9511)（Semgrep 结果 PR 评论）、[#9508](https://github.com/zeroclaw-labs/zeroclaw/issues/9508)（PR 审查提示注入防御）反映社区对生产级可观测性与供应链安全的重视。
- **插件化与按需扩展**：[#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850)（运行时插件替代编译期特性）持续作为 tracker 推进；[#8568](https://github.com/zeroclaw-labs/zeroclaw/issues/8568)（Mixture-of-Agents 虚拟模型提供商）探索多模型协作新范式。

结合现有 PR 看，`MCP 自定义 CA 信任`（[#9405](https://github.com/zeroclaw-labs/zeroclaw/pull/9405)）、`凭证限流轮换`（[#9419](https://github.com/zeroclaw-labs/zeroclaw/pull/9419)）等功能性 PR 已进入合并流程，有望随下一版本发布。而 `Windows/macOS CI 扩展`（[#9398](https://github.com/zeroclaw-labs/zeroclaw/pull/9398)）和 `安装文档生成`（[#9267](https://github.com/zeroclaw-labs/zeroclaw/pull/9267)）则体现了项目对多平台支持与开发者体验的持续投入。

---

## 7. 用户反馈摘要

从今日议题评论与摘要中，可以识别出以下真实用户痛点：

- **Solana 用户受阻**（[#9486](https://github.com/zeroclaw-labs/zeroclaw/issues/9486)）：用户反馈代理无法在 Telegram 上输出钱包地址，每次被替换为 `[REDACTED_HIGH_ENTROPY_TOKEN]`，即便关闭高熵检测依然无效。“Your agent cannot state a wallet address”直接表达挫败感。社区讨论指出敏感数据检测器在通道路径上的误报是根源。
- **Cron 工作流断裂**（[#9340](https://github.com/zeroclaw-labs/zeroclaw/issues/9340)）：用户创建定时任务后，代理正常调用工具但输出全部丢弃。“Where did the output go?”反映了对静默失败的不解与担忧，root cause 为硬编码 `delivery.mode = "none"`。
- **邮件通道局限**（[#9506](https://github.com/zeroclaw-labs/zeroclaw/issues/9506)）：用户指出 ZeroClaw 邮件通道无法保持 CC 列表，回复时只能发给单一收件人，在企业协作场景中严重受限。
- **MCP 开发受阻**（[#9186](https://github.com/zeroclaw-labs/zeroclaw/issues/9186) 已修复）：用户报告 MCP 工具的 30 秒硬超时与 ID 不匹配导致工作流完全阻塞（S1 严重度）。修复合并后社区表达积极反馈。
- **架构一致性的期待**（[#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048)、[#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127) 等 RFC 评论）：多位贡献者指出现有实现与文档描述不一致，呼吁核心团队尽快确立长期机制，减少技术债务。

---

## 8. 待处理积压

### 等待维护者决策的议题

以下 RFC 和设计议题已讨论充分且搁置超过 7 天，需要维护组给出接受/拒绝/推迟的明确答复：

- [#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048) 记忆分离 RFC（自 2026-07-14）
- [#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127) 密钥源抽象 RFC（自 2026-07-18）
- [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) OpenAI 兼容适配器 RFC（自 2026-07-02）
- [#8933](https://github.com/zeroclaw-labs/zeroclaw/issues/8933) 跨轮次 OTel 关联 RFC（自 2026-07-10）
- [#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103) 存储分离 RFC（自 2026-07-16）
- [#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106) A2A 出站客户端 RFC（自 2026-07-16）
- [#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) 实时语音通道 RFC（自 2026-07-06）

### 等待作者行动的 PR

以下 PR 标注了 `needs-author-action`，作者久未响应，面临被关闭或标记为 stale 的风险：

- [#9405](https://github.com/zeroclaw-labs/zeroclaw/pull/9405) feat(mcp): support per-server custom CA trust（最后更新 2026-07-26）
- [#9419](https://github.com/zeroclaw-labs/zeroclaw/pull/9419) fix(providers): rotate live credentials after rate limits（2026-07-26）
- [#9362](https://github.com/zeroclaw-labs/zeroclaw/pull/9362) fix(browser): validate screenshot destination path against workspace policy（2026-07-25）
- [#9056](https://github.com/zeroclaw-labs/zeroclaw/pull/9056) fix(providers): surface cause-specific provider failure diagnostics（2026-07-14）
- [#9100](https://github.com/zeroclaw-labs/zeroclaw/pull/9100) fix(memory): run pgvector setup inside postgres-memory-init OS thread（2026-07-16，已标记 `stale-candidate`）
- [#9211](https://github.com/zeroclaw-labs/zeroclaw/pull/9211) ci(release): consolidate release attestations（2026-07-20）
- [#9213](https://github.com/zeroclaw-labs/zeroclaw/pull/9213) fix(ci): preflight act artifact compatibility（2026-07-20）

---

*本日报基于 GitHub 公开数据自动生成，以技术视角客观呈现项目动态。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

好的，以下是基于您提供的 GitHub 数据，为 2026 年 7 月 30 日生成的 PicoClaw 项目动态日报。

---

## PicoClaw 项目动态日报 | 2026-07-30

**数据来源：** GitHub (github.com/sipeed/picoclaw)

---

### 1. 今日速览

过去 24 小时内，项目整体维持中等活跃度。用户提交了一个与调度路由相关的 bug 报告（#3301），但尚未引发社区讨论。**PR 方面有 2 个待合并项获得更新**，其中一个是针对钉钉渠道的图片消息支持（#3283），另一个是已停滞许久的安装脚本迁移（#1951）重新获得关注。项目维护者未发布新版本或合并任何 PR，代码库状态稳定。

### 2. 版本发布

**无新版本发布。**

---

### 3. 项目进展

由于过去 24 小时内没有 PR 被合并或关闭，项目核心代码库没有发生变更。但有两个长期待处理的 PR 获得了更新，表明相关工作仍在推进：

- **[#3283] fix(dingtalk): support picture/image message inbound**：该 PR 旨在为钉钉（DingTalk）渠道增加图片消息的接收与处理能力。项目在 7 月 29 日对其进行了更新，可能补充了相关代码或解决了合并冲突。该项目正处于等待最终合并的阶段，推进了 PicoClaw 在多渠道、多模态消息支持方面的能力。
    - 链接：https://github.com/sipeed/picoclaw/pull/3283
- **[#1951] chore: move installation scripts from docs repo to here**：这是一个基础设施改进类的 PR，旨在将安装脚本从文档仓库迁移到主仓库，以方便维护和版本控制。该 PR 在今日获得更新，可能是为了解决遗留的冲突或调整脚本内容，表明项目正在优化开发者体验和构建流程。
    - 链接：https://github.com/sipeed/picoclaw/pull/1951

### 4. 社区热点

过去 24 小时内，社区讨论活跃度较低，没有出现大规模讨论的议题。

- **[#3301] [BUG] /clear and session auto-compression don't work in chats routed to non-default agent via dispatch rules**：这是今日唯一新开且活跃的 Issues。虽然目前没有评论，但它涉及 “/clear” 命令和会话压缩在 “非默认代理” 路由下失效的核心功能问题，对于正在使用复杂调度规则的用户来说，这是一个潜在的痛点。背后的诉求是希望核心聊天管理功能在所有路由场景下都能稳定运行。
    - 链接：https://github.com/sipeed/picoclaw/issues/3301

### 5. Bug 与稳定性

今日报告了一个新的 Bug。

- **[严重程度：高] #3301: /clear 和会话自动压缩在非默认代理路由下失效**：这是一个核心功能回归或未被覆盖的边界情况。当通过 dispatch rules 将聊天路由到非默认 agent 时，清理历史记录和自动压缩会话功能失效。这会直接影响使用复杂路由策略的用户体验，可能导致内存占用过高或上下文混乱。**目前尚未关联任何修复 PR，但已在 Issues 中被标记，需要维护者关注并定位。**
    - 链接：https://github.com/sipeed/picoclaw/issues/3301

### 6. 功能请求与路线图信号

从今日的 PR 更新和 Issues 来看，项目路线图指向了两个明确的方向：

1.  **增强渠道能力：** PR #3283 对钉钉渠道的图片支持进行更新，表明项目正在积极完善各聊天渠道对多模态消息的兼容性。这可能在下一版本中被合并。
2.  **优化开发者/用户部署体验：** PR #1951 的更新表明，简化安装和部署流程依然是一个被持续关注的目标，这在大型项目中通常预示着一个稳定版本的到来。

暂无来自 Issues 的明确新功能请求。

### 7. 用户反馈摘要

由于 Issues 没有评论，我们可以从 Bug 报告中提炼用户的痛点：

- **用户痛点（来自 #3301）：** 一位用户正在树莓派上运行 0.3.1 版本的 PicoClaw，并通过 Discord 和 Telegram 频道接入 DeepSeek 模型。他遇到了一个具体问题：一旦配置了 dispatch rules 将聊天路由到非默认 agent，`/clear` 命令就会失效，且会话无法自动压缩。**这反映了用户在多 agent、多路由场景下的实际使用需求，以及对基础聊天管理功能稳定性的高要求。**
    - 链接：https://github.com/sipeed/picoclaw/issues/3301

### 8. 待处理积压

- **[PR #1951] chore: move installation scripts from docs repo to here**：该 PR 由 @lc6464 于 2026 年 3 月提交，已开放超过 4 个月。尽管在今日获得了更新，但长期未合并的状态仍然值得关注。如果该 PR 涉及多个依赖项或存在需要决策的技术细节，维护者应尽快推动评审，避免其长期悬而未决。
    - 链接：https://github.com/sipeed/picoclaw/pull/1951

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

好的，以下是根据您提供的 GitHub 数据生成的 QwenPaw 项目动态日报。

---

# QwenPaw 项目动态日报 | 2026-07-30

**分析师**：AI 智能体与个人 AI 助手领域开源项目分析师

---

## 1. 今日速览

过去 24 小时，QwenPaw 项目维持了极高的社区活跃度。**共处理 Issue 25 条，PR 50 条**，无新版本发布。社区贡献者积极汇报了大量 Bug，涵盖数据持久化、UI 渲染、渠道集成、MCP 稳定性等多个方面。项目组迅速响应，已合入或提交了多项关键修复 PR，同时在 Creator 插件、App Center 重构、计算机使用（Computer Use）等重大特性上持续推新。**总体来看，项目处于高强度开发与快速迭代期，开发效率高，但稳定性回归问题（#6537）和社区贡献阻塞问题（#6563）需引起警惕。**

---

## 2. 版本发布

本日无新版本发布。

---

## 3. 项目进展

今日社区和核心团队共同推动了一系列关键修复和功能落地，项目整体向前迈进了一大步：

- **安全与 CI 加固**：
    - 合并了 `fix: restrict import-local source path` ([#6487](https://github.com/agentscope-ai/QwenPaw/pull/6487))，修复了任意目录泄露的安全漏洞。
    - 提升了前端测试覆盖率阈值 ([#6103](https://github.com/agentscope-ai/QwenPaw/pull/6103))，增强了回归防护能力。
- **关键 Bug 修复（已提交 PR）**：
    - 修复 `/mission` 命令报错 ([#6562](https://github.com/agentscope-ai/QwenPaw/pull/6562), [#6535](https://github.com/agentscope-ai/QwenPaw/pull/6535))。
    - 修复 ACP 协议中新会话响应缺少模型字段 ([#6531](https://github.com/agentscope-ai/QwenPaw/pull/6531))。
    - 修复 MCP 工具名以连字符开头导致部分 LLM 报错 ([#6561](https://github.com/agentscope-ai/QwenPaw/pull/6561))。
    - 修复 MiniMax 模型上下文窗口元数据缺失 ([#6554](https://github.com/agentscope-ai/QwenPaw/pull/6554))。
    - 修复 Matrix 频道在 Python 3.12 上的端到端加密问题 ([#6486](https://github.com/agentscope-ai/QwenPaw/pull/6486))。
    - 修复 OneBot/QQ 渠道文本渲染及媒体发送问题 ([#6543](https://github.com/agentscope-ai/QwenPaw/pull/6543))。
- **重大特性推进**：
    - **App Center 重构**：PR ([#6553](https://github.com/agentscope-ai/QwenPaw/pull/6553)) 对应用中心进行了全面改版，分为“我的应用”、“官方应用”和“应用市场”三个标签页。
    - **Creator 插件迭代**：PR ([#6556](https://github.com/agentscope-ai/QwenPaw/pull/6556)) 为创作插件增加了创建检查点、媒体恢复、导入/导出等高级功能。
    - **记忆系统增强**：PR ([#6398](https://github.com/agentscope-ai/QwenPaw/pull/6398)) 为 ReMe 记忆搜索增加了重排序（Reranker）支持，有望显著提升记忆召回质量。
    - **原生桌面自动化**：PR ([#6424](https://github.com/agentscope-ai/QwenPaw/pull/6424)) 正等待人工审查，旨在让 Agent 具备操作桌面 GUI 的能力。
    - **运行时可靠性**：PR ([#6527](https://github.com/agentscope-ai/QwenPaw/pull/6527)) 增加了“取消安全”生命周期钩子，确保中断时 Agent 状态的可靠持久化。

---

## 4. 社区热点

今日讨论最活跃、反应最强烈的问题主要集中在以下方面：

- **数据持久化与稳定性**：Issue [#6537](https://github.com/agentscope-ai/QwenPaw/issues/6537)（技能标签重启消失，9条评论）和 [#6542](https://github.com/agentscope-ai/QwenPaw/issues/6542)（闪退丢失对话历史，3条评论）是用户最关切的痛点，直接关系到用户对工具的信任度。
- **性能与基础操作**：Issue [#6460](https://github.com/agentscope-ai/QwenPaw/issues/6460)（Edge+Wayland 高 CPU，4条评论）和 [#6560](https://github.com/agentscope-ai/QwenPaw/issues/6560)（详尽的会话 UI 改进建议，1条评论）反映了用户对桌面端性能优化和基础交互体验（复制、撤销、停止等）的强烈诉求。
- **社区贡献阻塞**：Issue [#6563](https://github.com/agentscope-ai/QwenPaw/issues/6563) 指出 “real-behavior-proof” CI 工作流会阻塞所有 Fork 仓库的 PR。**这一问题的破坏性极大，直接影响开源社区的活力，必须优先解决。**

---

## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列如下：

- **严重/紧急**：
    - **[#6537](https://github.com/agentscope-ai/QwenPaw/issues/6537) 技能标签重启消失**（回归，暂无修复 PR）—— 用户配置数据丢失。
    - **[#6534](https://github.com/agentscope-ai/QwenPaw/issues/6534) Windows 安装程序无限循环**（暂无修复 PR）—— 阻塞所有 Windows 用户安装。
    - **[#6563](https://github.com/agentscope-ai/QwenPaw/issues/6563) CI 流程阻塞外部贡献者 PR**（暂无修复 PR）—— 严重阻碍社区贡献。
    - **[#6555](https://github.com/agentscope-ai/QwenPaw/issues/6555) Dream 记忆压缩丢失早期事件**（暂无修复 PR）—— 数据丢失。
    - **[#6558](https://github.com/agentscope-ai/QwenPaw/issues/6558) 多会话 UI 数据完整性问题**（暂无修复 PR）—— 核心交互受损。

- **高影响**：
    - **[#6460](https://github.com/agentscope-ai/QwenPaw/issues/6460) Edge+Wayland 环境高 CPU 占用**（暂无修复 PR）。
    - **[#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541) DeepSeek 模型上下文压缩报错**（暂无修复 PR，已有诊断）。
    - **[#6510](https://github.com/agentscope-ai/QwenPaw/issues/6510) 飞书频道中文路径被 URL 编码**（暂无修复 PR，已知有临时方案）。

- **已有修复 PR**：
    - **[#6557](https://github.com/agentscope-ai/QwenPaw/issues/6557) MCP 工具名前缀问题** (PR [#6561](https://github.com/agentscope-ai/QwenPaw/pull/6561))
    - **[#6533](https://github.com/agentscope-ai/QwenPaw/issues/6533) /mission 命令报错** (PR [#6562](https://github.com/agentscope-ai/QwenPaw/pull/6562), [#6535](https://github.com/agentscope-ai/QwenPaw/pull/6535))
    - **[#6529](https://github.com/agentscope-ai/QwenPaw/issues/6529) ACP 模型发现问题** (PR [#6531](https://github.com/agentscope-ai/QwenPaw/pull/6531))

---

## 6. 功能请求与路线图信号

用户提出的新功能需求与当前开发中的 PR 高度吻合，预示着下一版本的进化方向：

- **会话交互重构** (需求 [#6560](https://github.com/agentscope-ai/QwenPaw/issues/6560), [#6559](https://github.com/agentscope-ai/QwenPaw/issues/6559))：要求增加复制、撤销、停止生成、分叉会话树状管理等基础功能。**这表明现有会话 UI 已无法满足用户的日常高频操作需求。** 关联 PR [#6269](https://github.com/agentscope-ai/QwenPaw/pull/6269) (Workspace Checkpoints) 也预示着会话管理的重大升级。
- **可靠性工程** (需求 [#6542](https://github.com/agentscope-ai/QwenPaw/issues/6542))：建议增加自动存档机制。**这与 PR [#6527](https://github.com/agentscope-ai/QwenPaw/pull/6527) (Cancellation-safe hooks) 的目标一致**，即从运行时层面保证状态不丢失。
- **异步任务** (需求 [#6475](https://github.com/agentscope-ai/QwenPaw/issues/6475))：Agent 在等待后台任务时，能继续与用户交互。
- **渠道原生特性** (需求 [#6421](https://github.com/agentscope-ai/QwenPaw/issues/6421))：QQ 频道流式输出，向官方能力对齐。
- **平台拓展**：PR [#6424](https://github.com/agentscope-ai/QwenPaw/pull/6424) (Computer Use) 和 [#6383](https://github.com/agentscope-ai/QwenPaw/pull/6383) (Windows Sandbox) 表明，项目正致力于将 Agent 的能力从“对话”拓展到“操作”和“沙箱执行”层面。

---

## 7. 用户反馈摘要

从今天的 Issue 评论中提炼的用户声音：

- **数据是第一生命线**：多位用户（#6537, #6542, #6555）表达了对“重启”和“闪退”场景下配置与对话数据丢失的极度焦虑。用户需要的是一个**稳定、可恢复的长期记忆系统**，而非一次性的对话工具。
- **高频操作追求“顺手”**：用户（#6560, #6549, #6547）详细描述了复制、停止、撤销、输入框布局等细微处的体验瑕疵。这说明用户已将 QwenPaw 作为日常重度生产力工具，对交互细节的要求达到了极高水准。
- **渠道集成是刚需，也是痛点**：飞书和 QQ 渠道的多个 Bug（#6510, #6544, #6421）表明渠道集成是用户广泛采用的场景，但也带来了额外的复杂性。用户期望渠道功能能对齐原生平台（如流式输出、媒体上传）。
- **专业用户渴望“掌控感”**：关于 Mission 模式、MCP、ACP 的深入讨论（#6529, #6533, #6557, #6555）显示了用户群体中存在大量技术专家和高级用户，他们不满足于开箱即用，而是希望对 Agent 的底层行为进行精细控制和定制。

---

## 8. 待处理积压

以下为需要项目维护者重点关注的高风险或长期搁置的事项：

1. **[严重][#6537](https://github.com/agentscope-ai/QwenPaw/issues/6537) 技能标签重启消失**：回归问题，评论数最高，影响配置持久化，暂无直接修复 PR，需优先排查。
2. **[严重][#6563](https://github.com/agentscope-ai/QwenPaw/issues/6563) CI 阻塞外部 PR**：已影响社区贡献者的正常工作流，对开源生态健康度构成直接威胁，亟需修复。
3. **[严重][#6534](https://github.com/agentscope-ai/QwenPaw/issues/6534) Windows 安装程序阻塞**：影响了大量 Windows 桌面用户，必须尽快解决 NSIS 安装器的流程错误。
4. **[高影响][#6555](https://github.com/agentscope-ai/QwenPaw/issues/6555) Dream 记忆系统数据丢失**：长期记忆是 QwenPaw 的核心卖点之一，此时间窗口漏洞会严重削弱该功能的可信度。
5. **[高需求][#6421](https://github.com/agentscope-ai/QwenPaw/issues/6421) QQ 渠道流式输出**：社区呼声已久的功能，有助于提升 QQ 渠道的用户体验。
6. **[技术债][#6102](https://github.com/agentscope-ai/QwenPaw/pull/6102) 测试隔离性元测试**：长期未合并的测试基础设施 PR，可能隐藏着 CI 测试环境深层的稳定性问题，建议维护评估。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

好的，分析师。根据您提供的 hermes-agent 项目 GitHub 数据，我为您生成了 2026-07-30 的项目动态日报。

---

### hermes-agent 项目动态日报 (2026-07-30)

**核心观点：** 项目进入高强度迭代期，日活跃度极高（更新超 500 条 Issue 与 PR）。核心团队正大力进行架构重构（Web、Gateway、Config）和技术债务清理，整体健康度与长期可维护性显著提升。然而，P1 级 Bug 主要集中在 `Reasoning` 模型的 Token 估算和 `Discord multiplex` 安全隔离上，这些问题直接影响主力用户群，亟需解决。社区对 **MCP 安全审批** 和 **Multi-backend终端** 的呼声很高，可能成为下一阶段路线图的重点。

---

#### 1. 今日速览

今日项目动态极其活跃，共处理了 500 条 Issue 和 500 条 PR。核心团队主力进行了一次大规模的技术债清理与重构（包括 Web 路由解耦、Config 迁移基准线锁定、以及测试套件瘦身），这表明项目在快速迭代的同时，正在积极建立健康的技术架构。用户侧的重点集中在 **推理模型（Reasoning Model）** 的计费与 Token 估算 Bug，以及 **多 Profile 安全隔离** 的架构缺陷。此外，**Desktop 插件 SDK** 和 **Kanban 看板** 的推进，标志着桌面端正在从“附属品”向“一等公民”进化。

---

#### 2. 项目进展

尽管今日无正式版本发布，但项目在可维护性和架构合理性上迈出了重要一步，预示着下一个重大版本正在酝酿。

- **架构重构与技术债清理：**
    - 【已合并】测试套件大规模瘦身（#74383）：移除了 58% 的低价值测试（46,820 → 19,757），全套测试运行时间减半（583s → 294s），且零 Flake。这极大提升了后续开发与 CI 的效率。
    - 【待合并】Web 服务 APIRouter 分解 Wave 2（#74435）：将 sessions、mcp、skills、tools 等 49 条路由剥离为独立模块，目前 231 条路由中已有 96 条模块化。
    - 【待合并】Gateway 重构（#74434）：完成了 TurnContext 架构的最终拼图，将 `run_sync` 逻辑提取到 `TurnRunner`中。
    - 【待合并】Config 自动迁移基准线锁定至 v12（#74433）：弃用了 v12 之前的旧 shim，并对超过 2 年的旧配置给出明确的错误提示。

- **桌面端与插件生态：**
    - 【待合并】Desktop 插件 SDK 正式落地，首个功能是文件下载（#74413），允许插件安全地向用户交付文件。
    - 【待合并】看板（Kanban）作为 Desktop 插件 SDK 的基础插件（#61173），标志着 Desktop 开始拥有独立于 Dashboard 的完整插件体系。

- **边缘计算与移动端：**
    - 【待合并】新增 iPhone 15 Pro Max 作为 SSH 远程后端（#74430），展示了将 Agent 运行在移动设备的探索。

- **使用体验优化：**
    - 【待合并】Kimi Coding Plan 配额已接入账户使用统计（#74424）。
    - 【待合并】Desktop Messaging 页面移除了每 6 秒的暴力轮询，改为事件驱动更新（#74422）。

---

#### 3. 社区热点

今日讨论热度极高的议题反映了用户对**安全、平台隔离性和智能体时间感知**的迫切需求。

- **MCP 安全审批流程（#16462，12 条评论）：** 用户普遍担忧 MCP Server 动态注册的工具存在安全隐患（LLM 可在无人工干预下直接调用）。提议要求首次调用 MCP 工具时进行人工审批。这已成为 MCP 集成的核心安全痛点，讨论热烈。
    [Issue链接](https://github.com/NousResearch/hermes-agent/issues/16462)

- **回合级实时时间感知（#10421，15 条评论，9 👍）：** 用户期望 Agent 能在每个对话回合都内置“当前时间/日期”等上下文，而非通过工具调用获取。这反映了 Agent 在复杂工作流（如日程管理、实时监控）中对时间上下文精确理解的高度依赖。
    [Issue链接](https://github.com/NousResearch/hermes-agent/issues/10421)

- **Windows 兼容性危机（#63177，9 条评论）：** 用户报告在 Windows 上使用 Git Bash 时，`search_files` 因 `ripgrep` 与 `MSYS_NO_PATHCONV` 冲突，对绝对路径搜索总是静默返回 0 结果。Windows 用户的开发体验持续引发讨论。
    [Issue链接](https://github.com/NousResearch/hermes-agent/issues/63177)

- **Discord 多 Profile 隔离失效（#72348，6 条评论，P1）：** 一个严重的架构性 Bug。当启用 `multiplex_profiles` 时，Discord 的频道白名单/黑名单是进程全局共享的，导致各 Profile 的安全边界被完全打破。社区对此安全漏洞高度紧张。
    [Issue链接](https://github.com/NousResearch/hermes-agent/issues/72348)

---

#### 4. Bug 与稳定性

今日报告的 Bug 中，**推理模型（Reasoning Model）** 和 **Windows 平台兼容性** 成为 Bug 重灾区。

**【P1 级 - 严重】**
- **推理模型 Token 预估偏差（#73298）：** 自动压缩机制错误地将 `reasoning_content` 按字符串长度除以 4 计算 Token，导致在实际消耗仅达阈值 27% 时过早触发压缩，严重影响 Claude/OpenAI/Kimi 等推理模型的使用效果和成本控制。尚无修复 PR，极需关注。
    [Issue链接](https://github.com/NousResearch/hermes-agent/issues/73298)
- **Discord Profile 安全隔离失效（#72348）：** 如前文所述，进程级别的全局门控导致 Profile 隔离完全失效。需架构级别的修复。
    [Issue链接](https://github.com/NousResearch/hermes-agent/issues/72348)
- **Windows 更新链路三层面板协调修复（#74419，PR）：** 修复了 Windows 下 Desktop 更新按钮因 Electron → Rust 引导器 → Python CLI 三层协同空缺而无法完成的 Bug（fix #74386）。这是桌面端 Windows 用户的常用功能的严重阻塞。
    [PR链接](https://github.com/NousResearch/hermes-agent/pull/74419)

**【P2 级 - 中等】**
- **Desktop Profile 切换不完整（#67605）：** 切换 Profile 后，MCP 工具无法加载，环境变量仍沿用启动时的 Profile，形成“杂交”状态。
- **Provider 401 无重试逻辑（#73237）：** API Key 认证失败时直接跳转备用 Provider，但没有遵循常规的 3 次重试逻辑（43ms 内就直接降级）。
- **思考预算耗尽检测遗漏（#73336）：** 对于使用 `reasoning_content` 字段（而非 `<think>` 标签）的模型（如 Kimi K3），检测器无法正确触发。
- **自改进系统分类错误（#30220）：** 背景自改进 Agent 错误地将内容分类到 Memory/Skill/User 存储中。
- **Docker 配置残留导致后端切换失效（#25402）：** 即使用户手动将 `terminal.backend` 从 Docker 改为 Local，只要 Docker 配置残留未清除，工具依然在 Docker 中执行。
- **Kanban 调度错误修复（#74432, #74431，PRs）：** 修复了显式重新入队（Requeue）与 PR 证据冲突的问题，以及分发器（Dispatcher）的健康检查与 PR 守卫逻辑。

---

#### 5. 功能请求与路线图信号

用户需求集中在打破当前系统的**单终端限制**、**异步记忆延迟**以及**MCP 生态安全**。

- **【呼声极高】Multi-Backend 终端（#1855，11 👍）：** 用户强烈要求支持本地 + 多个命名远程终端的并行连接。这是对“单一终端后端”模式的颠覆性架构请求，若被采纳，将成为 Agent 远程执行能力的里程碑。
- **同步 Memory Recall（#5820）：** 当前异步记忆召回机制意味着下一个回合才能用上历史信息，用户希望在当回合立即基于查询同步召回。
- **多 Telegram Bot 支持（#8287，14 👍）：** 用户要求同一个 Agent 能在 Telegram Gateway 下并行处理来自不同 Bot 的会话，目前仅支持单个 Bot 连接。
- **Xiaomi MiMo V2 TTS（#8830）：** 特定硬件的 TTS 接入请求，显示了项目在全球化与多模态环境下的拓展潜力。
- **Split Runtime（#63966）：** 允许客户端在 Agent 的 Runtime 中运行时挂载自己的工具集（如手机上的本地设备控制）。这是一个宏大的边缘计算特性，潜在影响深远。

---

#### 6. 用户反馈摘要

- **正面反馈（集中在架构改进与工具链优化）：**
    - 测试瘦身（#74383）和代码重构（#74434，AST-identity 证明）得到了内部开发者的高度认可，认为这是项目走向成熟和稳定的关键举措。
    - Desktop Kanban 和 插件 SDK（#74413）的出现，让桌面端实现了与 Dashboard 功能的对齐，提升了重度桌面用户的忠诚度。

- **痛点与挫折（高度集中在 Desktop 与跨平台体验）：**
    - **Windows 之痛：** `search_files` 完全不可用（#63177），更新流程卡死（#74386），以及 Docker 配置残留问题（#25402），让 Windows 用户感到被降级对待。
    - **macOS 更新后遗症：** “每当 Hermes Desktop 更新，Full Disk Access 权限就会被撤销！”（#52010）。这导致用户每次升级都需要手动去系统设置里开启，体验极差。
    - **Profile 切换的虚假安全感：** “Dashboard/Desktop 的 Profile 切换是假的，MCP 工具根本加载不出来，环境变量还是启动时的。”（#67605）。用户感觉被“切割”，无法信任上下文切换功能。
    - **MCP 工具的安全恐惧：** “第三方 MCP Server 里的工具可以直接被 Agent 调用，没有任何审批环节，这太可怕了。”（#16462）。用户呼吁类似浏览器的“权限许可弹窗”机制。

---

#### 7. 待处理积压

以下为长期未得到有效响应或解决的重大 Issue，建议维护层关注。

1.  **#418 - Pokémon Play History Dashboard：** 自 2026-03-05 开启（距今近 5 个月），标签为 P3。作为项目的 demo/benchmark 功能，长期无进展可能会降低社区对外围实验性功能的参与热情。
    [Issue链接](https://github.com/NousResearch/hermes-agent/issues/418)

2.  **#1855 - Multi-Backend 终端：** 自 2026-03-18 开启（距今 4 个月），获 11 个 👍。虽然讨论热烈，但既无负责人，也长期处于 P3 状态。这已是社区反复提及的“刚需”功能，长期搁置可能向社区传递“核心功能停滞”的负面信号。
    [Issue链接](https://github.com/NousResearch/hermes-agent/issues/1855)

3.  **#25402 - Docker 配置残留 Bug：** 自 2026-05-14 开启。这是一个会导致用户配置完全失灵的 Bug（Local / SSH 被视为 Docker），由于涉及 `needs-repro` 和 Windows 平台，可能需要更多环境复现，但影响范围不容小觑。
    [Issue链接](https://github.com/NousResearch/hermes-agent/issues/25402)

4.  **#35838 - `get_provider_info` 阻塞：** 自 2026-05-31 开启。影响 `hermes doctor` 诊断命令及模型初始化。被打上 `duplicate` 标签，但尚未见修复合并。对于新用户 onboarding 体验有直接影响。
    [Issue链接](https://github.com/NousResearch/hermes-agent/issues/35838)

5.  **#74421 - Provider 身份稳定化（PR）：** 修复自定义 Provider 身份不稳定的问题。这直接影响 Model Picker、推理等核心流程，且涉及配置持久化。作为一枚仍敞开待合并的 PR，需要尽快 review。
    [PR链接](https://github.com/NousResearch/hermes-agent/pull/74421)

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 2026-07-30

## 1. 今日速览
过去 24 小时内，AstrBot 收到 11 个 Issue 更新（新开/活跃 8 个，关闭 3 个）和 12 个 PR 更新（5 个合并/关闭，7 个待合并），未发布新版本。社区提交活跃，Bug 反馈与功能请求并行。重要进展包括：上下文配置正交模型重构（#9346）合并、ChatUI 流式显示修复（#9439）合入；一个 SSL 降级导致 MITM 注入的严重安全漏洞（#9446）被披露，尚无修复 PR；QQ 官方适配器流式丢字问题的修复 PR（#9444）已提交。项目整体保持高速迭代，核心团队响应及时。

## 2. 版本发布
（今日无新版本发布）

## 3. 项目进展
今日合并/关闭的重要 PR 展示了稳定性与架构两方面的推进：

- **ChatUI 流式显示修复** – [#9439](https://github.com/AstrBotDevs/AstrBot/pull/9439)（已合并）  
  修复开启流式响应后，富思考/工具调用场景下最终可见文本在 ChatUI 中不显示的问题，用户不再需要关闭流式才能看到完整回复。

- **上下文配置正交模型重构** – [#9346](https://github.com/AstrBotDevs/AstrBot/pull/9346)（已合并，XXL 级）  
  将旧有混用魔法值的 7 个字段拆分为 12 个显式字段，分离触发条件与处置行为，新增 `/compact` 手动压缩命令。关闭了 #9252、#8348、#9281 等多个相关 issue，是项目核心配置模型的一次重要升级。

- **MiMo TTS 模型更新** – [#9428](https://github.com/AstrBotDevs/AstrBot/pull/9428)（已合并）  
  将运行时默认模型从 `mimo-v2-tts` 更新为 `mimo-v2.5-tts`，保持与上游一致。

- **延迟导入 rank_bm25** – [#9435](https://github.com/AstrBotDevs/AstrBot/pull/9435)（已合并）  
  将 `rank_bm25` 的导入推迟到实际使用时，避免因依赖该库及其上游 NumPy 而在不常见 CPU 架构（如 hygon c86）上启动失败，解决了 #9434。

- **系统代理变量清理** – [#8897](https://github.com/AstrBotDevs/AstrBot/pull/8897)（已合并，积压约 40 天）  
  确保未配置代理时忽略系统环境变量 `http_proxy` / `https_proxy`，防止本地 API 请求被意外拦截。

**总体评估**：上述合并消除了至少 5 个已知 Bug 或兼容隐患，同时通过重构大幅提升了上下文管理的可配置性与可维护性，为后续插件与适配器开发奠定了更清晰的基础。

## 4. 社区热点
| Issue / PR | 描述 | 热度指标 |
| --- | --- | --- |
| [#9433](https://github.com/AstrBotDevs/AstrBot/issues/9433) | 更新 v4.26.8 后对话数据界面不显示 ChatUI 数据，返回再进入会丢失最新响应 | **4 条评论**，当日最高 |
| [#9258](https://github.com/AstrBotDevs/AstrBot/issues/9258) | Discord 适配器尚不支持中文斜杠指令与参数注册，期待完善 | **3 条评论**，+ 相关新 PR #9445（Draft） |
| [#9446](https://github.com/AstrBotDevs/AstrBot/issues/9446) | 下载函数 SSL 验证降级为 `CERT_NONE`，可被 MITM 注入恶意内容 | **安全议题**，虽无评论但严重性最高 |
| [#9440](https://github.com/AstrBotDevs/AstrBot/issues/9440) / [#9299](https://github.com/AstrBotDevs/AstrBot/issues/9299) | QQ 官方机器人流式回复时群聊丢失首字/前几字（两者根因相同） | 多位用户反复反馈，对应修复 PR #9444 已提交 |

**分析**：  
- **#9433** 的用户反馈表明 ChatUI 与管理界面的数据同步仍存在缺陷，尽管 #9437（流式尾巴丢失）已被修复，但对话记录持久化显示的 Bug 更加影响日常使用。  
- **#9258** 的持续热度体现了社区对 Discord 平台官方适配的强烈需求，新提交的 Draft PR #9445 是一个积极信号，但尚处于早期阶段。  
- **#9446** 的安全风险需要立即关注，虽然今日零评论，但涉及中间人攻击面，属于必须优先处理的类型。  
- **#9440 / #9299** 的频繁出现说明 QQ 官方适配器的流式缓冲处理存在系统性缺陷，好在已有贡献者提交了修复 PR #9444。

## 5. Bug 与稳定性
按严重程度排列当日活跃 Bug（包含今日仍开放或刚关闭的）：

| 严重程度 | Issue | 描述 | 当前状态 | 修复 PR |
| --- | --- | --- | --- | --- |
| 🔴 严重 | [#9446](https://github.com/AstrBotDevs/AstrBot/issues/9446) | `download_image_by_url` / `download_file` 捕获 SSL 错误后降级为 `CERT_NONE`，允许中间人注入恶意内容 | 待处理 | 无 |
| 🟠 高 | [#9443](https://github.com/AstrBotDevs/AstrBot/issues/9443) | QQ 官方适配器发送较大本地视频时触发 `STGW 413 Request Entity Too Large`，无大小分片或压缩机制 | 待处理 | 无 |
| 🟠 高 | [#9440](https://github.com/AstrBotDevs/AstrBot/issues/9440) | QQ 官方（WebSocket）流式回复群聊时首字丢失；后端生成内容完整，客户端截断（同根因 #9299） | 待处理 | [#9444](https://github.com/AstrBotDevs/AstrBot/pull/9444)（Open，作者已修复） |
| 🟠 中 | [#9433](https://github.com/AstrBotDevs/AstrBot/issues/9433) | ChatUI 对话数据在管理界面不显示，且切换页面后丢失最新回复 | 待处理 | 无 |
| 🟡 中 | [#9437](https://github.com/AstrBotDevs/AstrBot/issues/9437) | ChatUI 开启流式后末尾文本不显示（数据完整，前端渲染 Bug） | ✅ 已关闭 | [#9439](https://github.com/AstrBotDevs/AstrBot/pull/9439)（已合并） |
| 🟢 低 | [#9434](https://github.com/AstrBotDevs/AstrBot/issues/9434) | hygon C86 CPU 因 NumPy 不支持而启动失败 | ✅ 已关闭 | [#9435](https://github.com/AstrBotDevs/AstrBot/pull/9435)（已合并） |

**重点提醒**：  
- **#9446** 属于安全漏洞，建议维护者立即评估并标记敏感等级，考虑在下次补丁中紧急修复。  
- **#9443**（413 错误）在视频功能使用上构成硬限制，若无法自动分片，至少应给出明确的错误提示或配置项。

## 6. 功能请求与路线图信号
结合今日提交的 Issue 与待合并 PR，可以观察到用户希望增强的几个方向：

| 来源 | 需求 | 对应 PR / 状态 | 可能纳入版本 |
| --- | --- | --- | --- |
| [#9258](https://github.com/AstrBotDevs/AstrBot/issues/9258) | Discord 适配器支持中文斜杠指令与参数注册 | [#9445](https://github.com/AstrBotDevs/AstrBot/pull/9445)（Draft） | 下一或下下版本 |
| [#9431](https://github.com/AstrBotDevs/AstrBot/issues/9431) | 官网首页显著位置添加桌面客户端下载链接 | 无 PR，实现成本低 | 可快速跟进 |
| [#9438](https://github.com/AstrBotDevs/AstrBot/issues/9438) | 在平台日志中显示 Bot 的思考/输入过程，帮助用户调优人格设置 | 无 PR | 待讨论设计 |
| [#8890](https://github.com/AstrBotDevs/AstrBot/pull/8890) | 钉钉适配器原生支持互动 AI 卡片流式回复 | PR 待合并（6月19日） | 应该尽早合入 |
| [#9335](https://github.com/AstrBotDevs/AstrBot/pull/9335) | 上下文清理时过滤不支持的图片 MIME（如 GIF），避免上游出错 | PR 待合并（7月20日） | 下一个补丁 |
| [#8928](https://github.com/AstrBotDevs/AstrBot/pull/8928) | 知识库 Embedding 批处理限制与 UTF-16 代理项清理 | PR 待合并（6月20日） | 下一个补丁 |
| [#9441](https://github.com/AstrBotDevs/AstrBot/pull/9441) | 基于已合并的 #9346 进一步重构上下文配置（正交模型 v2） | 新提交 PR，尚需讨论 | 取决于评估 |

**信号判断**：  
- Discord 与钉钉的平台完善是社区呼声最高的功能缺口，对应的 PR 已存在但停留期过长，建议维护者在下个发布周期重点推进。  
- #9441 的提出现明核心团队仍在积极迭代上下文模型，架构将持续优化。  
- 用户体验细节（#9431、#9438）虽然改动不大，但对提升社区满意度有明显作用，建议快速响应。

## 7. 用户反馈摘要
从今日活跃的 Issue 评论与描述中提炼真实用户声音：

- **对话数据同步割裂**（#9433）  
  > “更新到 v4.26.8 后对话数据界面不显示 astrbot 自带的 chatui 的对话数据。还有一个问题，chatui 发送信息后如果返回日志界面，再点进 chatui 会看不到 bot 这次回复的信息。” —— **用户对数据一致性的体验下降，频繁切换后失去上下文。**

- **流式显示曾不可靠**（#9437，已修复）  
  > “开启流式响应时…最后一段可见文本在 ChatUI 中不显示。消息数据完整存储在数据库中，刷新页面后仍然不可见，说明是前端渲染 Bug。” —— **用户准确指出了 Bug 层次，并确认后端数据没有丢失。**

- **QQ 群聊首字丢失长期困扰**（#9440、#9299）  
  > “QQ 客户端实际展示的内容缺少开头部分。AstrBot 侧日志/对话记录里的生成内容是完整的。” —— **多位用户持续遭遇此问题，表明平台适配层流式累积需要重新设计缓冲策略。**（感谢 @OWWZO 今日提交了修复 PR #9444）

- **官网下载体验不佳**（#9431）  
  > “能不能在官网显著位置放上桌面客户端下载链接呀！！！我要跳转好多页面才下载到！” —— **用户的期盼非常直接，属于可以零开发成本改善的痛点。**

- **渴望深度可见性**（#9438）  
  > “希望能更了解有关 bot 的思考与输入 ai 内容的情况，以便能有效对人格信息等做出调整。…在后台的日志中看到。” —— **用户不满足于黑盒输出，希望在维护界面获得更透明的中间状态。**

## 8. 待处理积压
以下 Issue 或 PR 长期未得到足够响应或进展缓慢，建议维护者重点关注：

| ID | 类型 | 提出/更新日期 | 描述 | 未响应时长 |
| --- | --- | --- | --- | --- |
| [#9258](https://github.com/AstrBotDevs/AstrBot/issues/9258) | Issue | 2026-07-13 | Discord 适配器完善需求，附带未合并 PR #9125 | 17 天 |
| [#9299](https://github.com/AstrBotDevs/AstrBot/issues/9299) | Issue | 2026-07-16 | QQ 群聊流式首字丢失（与 #9440 同根因） | 14 天 |
| [#8890](https://github.com/AstrBotDevs/AstrBot/pull/8890) | PR | 2026-06-19 | 钉钉原生 AI 卡片流式回复功能 | 41 天 |
| [#8928](https://github.com/AstrBotDevs/AstrBot/pull/8928) | PR | 2026-06-20 | Embedding 批处理大小限制与代理项清理 | 40 天 |
| [#9335](https://github.com/AstrBotDevs/AstrBot/pull/9335) | PR | 2026-07-20 | 上下文过滤不支持图片 MIME（GIF） | 10 天 |
| [#9446](https://github.com/AstrBotDevs/AstrBot/issues/9446) | Bug | 2026-07-29 | SSL 验证降级导致 MITM 注入 | 1 天（但需优先处理） |

此外，今日新提交的 [#9441](https://github.com/AstrBotDevs/AstrBot/pull/9441) （上下文配置正交模型 v2）是对已合并 #9346 的进一步重构，建议及时 review 以避免与主分支产生歧义。

---

**数据来源**：AstrBot GitHub Issues & Pull Requests，统计区间 2026-07-29 00:00–23:59 UTC。  
**报告生成时间**：2026-07-30 00:30 UTC。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*