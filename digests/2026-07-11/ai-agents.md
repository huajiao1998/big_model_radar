# OpenClaw 生态日报 2026-07-11

> Issues: 410 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-07-10 22:50 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 | 2026-07-11

## 1. 今日速览

过去 24 小时，OpenClaw 项目保持了 **接近饱和** 的社区活跃度：共处理 **410 条 Issue**（新开/活跃 212 条，关闭 198 条）和 **500 个 PR**（待合并 320 个，已合并/关闭 180 个）。Issue 的开放与关闭速度基本持平（1.07 : 1），表明 ClawSweeper 自动治理系统与维护团队在高效地进行问题分流与关闭。PR 流水线十分拥挤（增量净增 140 个待合并），社区贡献热情高涨，项目正处于密集的功能开发与稳定性修复周期中。**今日无正式版本发布**，但大量高分位 Bug 已有关联 PR 进入 review 阶段，项目健康度整体积极，唯 P0 级内存泄漏等问题仍需更高优先级的推动。

---

## 2. 版本发布

*（今日无新版本发布，此节省略。）*

---

## 3. 项目进展

今日项目在 **核心稳定性、平台兼容性与开源基础设施** 三个维度迈出了实质性步伐，尤其是在 AI 模型调用逻辑和跨平台恢复能力上均有重要 PR 合并或进入关键审查阶段。

### 🟢 关键合并/关闭 PR

| PR | 类别 | 摘要 |
|---|---|---|
| [#103962](https://github.com/openclaw/openclaw/pull/103962) | **P0 · 新用户引导** | `fix(onboarding): make fresh AI setup reliable and transparent` — 修复全新安装用户可能直接进入 Crestodian 页面的严重流程断裂问题。AI 辅助协助实现，Maintainer 签审。 |
| [#103972](https://github.com/openclaw/openclaw/pull/103972) | **macOS 稳定性** | `fix(macos): keep launchd Gateway running from renamed checkouts` — 解决 macOS 用户重命名项目目录后 launchd 管理的 Gateway 无法启动的痛点。 |
| [#103946](https://github.com/openclaw/openclaw/pull/103946) | **数据可靠性** | `fix(tasks): repair legacy delivery statuses` — 修复从遗留 sidecar 迁移任务状态时，特定值 `"not-requested"` 导致内存注册表永久丢失所有已持久化任务的问题。 |
| [#103907](https://github.com/openclaw/openclaw/pull/103907) | **Windows 兼容** | `fix: preserve current Node for node.exe env wrappers` — 确保 Windows 环境下 `scripts/run-with-env.mjs` 包装器不会错误地将 Node 解析路径泄漏给 `PATH`。 |
| [#103548](https://github.com/openclaw/openclaw/pull/103548) | **Unicode 兼容** | `fix(nodes): resolve Unicode browser node names` — 修复浏览器节点显示名称在 NFC 与 NFD 编码下无法匹配的问题。 |
| [#103971](https://github.com/openclaw/openclaw/pull/103971) | **CI/CD** | `fix(ci): keep hydrate-github pnpm shims writable` — 修复 Crabbox runner 中 `corepack enable` 因无权限写入 `/usr/local/bin/pnpm` 导致 CI 初始化失败。 |
| [#103332](https://github.com/openclaw/openclaw/pull/103332) | **回归修复** | 修复 `openclaw` 无法与 `codex/gpt5.6` 在 P1 环境运行的问题。 |
| [#91283](https://github.com/openclaw/openclaw/issues/91283) | **安全修正** | `minSecurity` 排序严重反向（将 `full` 误判为最严格），导致安全配置完全失效，该 Issue 今日关闭。 |

### 🔵 重要的进行中 PR

项目正在推进两套重量级方案以系统性地解决 AI Provider 集成稳定性：
- **速率限制策略统一**：针对 issue [#102250](https://github.com/openclaw/openclaw/issues/102250)，同时出现两个竞争方案——PR [#103974](https://github.com/openclaw/openclaw/pull/103974)（跨会话共享窗口策略）与 [#103200](https://github.com/openclaw/openclaw/pull/103200)（区分永久错误与长窗限速）。这种“双路设计”反映了项目对核心可靠性问题的深度投入。
- **Prompt Cache 跨边界稳定**：PR [#102189](https://github.com/openclaw/openclaw/pull/102189) 正在修复长生命周期 embedded session 在 `room_event`、policy 切换、队列重建等边界下丢失 provider prompt cache 的关键回归问题。
- **开放治理流程改革**：PR [#103687](https://github.com/openclaw/openclaw/pull/103687) 与 [#103935](https://github.com/openclaw/openclaw/pull/103935) 涉及贡献来源的可溯源性与 npm 发布字节绑定，表明项目正在向更严格的合规与“共识即代码”机制迈进。

---

## 4. 社区热点

今日讨论最激烈、关注度最高的 Issue 集中在 **Agent 自主性与平台扩展能力** 两大战场：

### 🔥 热点 Issue Top 3

| Issue | 评论 | 反应 | 核心诉求 |
|---|---|---|---|
| [#99241](https://github.com/openclaw/openclaw/issues/99241) | **20** | 👍2 | **Agent 失明**：长时间运行的工具输出被折叠为 `(see attached image)` 占位符，Agent 自身无法读取 stdout/stderr，严重破坏自动化流程闭环。评级 [🐚 platinum hermit] |
| [#102175](https://github.com/openclaw/openclaw/issues/102175) | **15** | 👍1 | **Prompt Cache 断裂**：跨 `room_event`、policy 切换、Responses API 边界时，嵌入式会话丢失缓存连续性。这是一次回归，已关联 PR [#102189](https://github.com/openclaw/openclaw/pull/102189)。 |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | **15** | 👍1 | **P0 内存泄漏**：Gateway 启动时 RSS 350MB，三天后飙至 15.5GB 被 OOM Kill，触发 `launchd-handoff` 重启循环。社区对长时间运行服务的运维稳定性表现出强烈焦虑。 |
| [#12602](https://github.com/openclaw/openclaw/issues/12602) | **14** | 0 | **Slack Block Kit 集成**：Agent 回复仅限纯文本/Markdown，社区渴望实现 CRM 摘要、数据库查询结果等富交互消息。这是 2 月 9 日的老 Issue，长期活跃。 |
| [#63829](https://github.com/openclaw/openclaw/issues/63829) | **13** | **👍10** | **Per-Agent 独立知识库**：多 Agent 架构下，要求为每个 Agent 配置独立的 memory-wiki vault，避免全局 vault 带来的知识污染。今日状态显示 [CLOSED]，可能已合并或定稿。 |

### 💬 讨论趋势分析

社区讨论正在从“能不能用”转向“好不好用”和“可编程性”。三个最深刻的诉求是：
1. **Agent 自省能力**：Agent 无法看到自己的工具输出（#99241）、无法获知队列状态（#9797）、子 Agent 行为不可控（#8299）。
2. **长会话可靠性**：内存泄漏、Discord 断连不回连、WhatsApp 模型调用超时锁死——生产级部署的痛点开始浮现。
3. **原生集成深度**：Slack 需要 Block Kit、WhatsApp 需要贴纸和通话事件——用户不再满足于文本桥接。

---

## 5. Bug 与稳定性报告

项目在积极关闭 Bug 的同时，仍存在数个亟待救援的高危问题。按严重程度排列如下：

### 🔴 P0 — 致命（可能导致服务完全不可用）

| Issue | 类型 | 摘要 | 修复状态 |
|---|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 内存泄漏 | Gateway RSS 从 350MB → 15.5GB，OOM 触发无限重启 | `clawsweeper:needs-live-repro`、`needs-product-decision`。卡在决策阶段 |
| [#101763](https://github.com/openclaw/openclaw/issues/101763) | 配置持久化 | Hosted Molty 模型选择器失效：API 收到 `claude-opus-4.8`（带点）而非 `claude-opus-4-8`（正确的连字符） | `clawsweeper:needs-maintainer-review`、`needs-info`。标记为 `maturity:stable`，影响广泛 |

### 🟠 P1 — 高位（功能严重受损，但用户绕过或重启后可恢复）

| Issue | 类型 | 摘要 | 修复状态 |
|---|---|---|---|
| [#102175](https://github.com/openclaw/openclaw/issues/102175) | 回归 | Prompt Cache 在 room-event、policy、API 边界丢失 | PR [#102189](https://github.com/openclaw/openclaw/pull/102189) 进行中 |
| [#99241](https://github.com/openclaw/openclaw/issues/99241) | 代理失明 | 长工具调用输出变为图片附件，Agent 无法读取原文 | 待产品决策与 live-repro |
| [#83959](https://github.com/openclaw/openclaw/issues/83959) | 启动竞态 | Codex app-server 重启重试耗尽，新 Server 尚未就绪 | 有关联 PR 打开 |
| [#89278](https://github.com/openclaw/openclaw/issues/89278) | 回归 | Codex OAuth 刷新成功但 cron 因 10s 超时失败 | `clawsweeper:source-repro`，review 中 |
| [#99681](https://github.com/openclaw/openclaw/issues/99681) | 断连 | Discord 1006 WS 关闭后不自动重连，需重启 Gateway（今日已关闭） | **已关闭**，认为以修复 |
| [#84569](https://github.com/openclaw/openclaw/issues/84569) | 会话锁定 | WhatsApp 长模型调用导致消息排队后 `stalled_agent_run`，回复丢失 | 有关联 PR |
| [#97877](https://github.com/openclaw/openclaw/issues/97877) | 静默故障 | `empty-error-retry` 被 `hadPotentialSideEffects` 守卫阻塞，5xx 后无重试 | 今日已 **关闭** |
| [#85714](https://github.com/openclaw/openclaw/issues/85714) | 消息丢失 | Agent 最终轮忘记调用 delivery 工具，纯文本回复被丢弃 | 今日已 **关闭** |

### 🟡 安全相关 Bug

| Issue | 严重度 | 摘要 | 状态 |
|---|---|---|---|
| [#91283](https://github.com/openclaw/openclaw/issues/91283) | P3（反直觉） | `minSecurity` 排名逻辑完全反转，`full` 被视为最严而非最宽松 | **已关闭** |
| [#44749](https://github.com/openclaw/openclaw/issues/44749) | P1 · 数据竞争 | `allow-always` 并发审批存在 last-write-wins，静默丢失授权条目 | **已关闭** |
| [#103534](https://github.com/openclaw/openclaw/pull/103534) | P1 · 越权 | `sessions.patch` 缺乏插件所有权检查，可跨插件修改会话 | PR 待 proof |
| [#86217](https://github.com/openclaw/openclaw/issues/86217) | P2 · 文档/运行时 | iOS 后台位置声明缺少 `UIBackgroundModes=location` | review 中 |

---

## 6. 功能请求与路线图信号

从社区需求的热度与关联 PR 的综合分析，以下特征极有可能被纳入下个里程碑：

### ⭐ 呼声最高的特征

| Issue | 👍 | 特征 | 路线图信号 |
|---|---|---|---|
| [#63829](https://github.com/openclaw/openclaw/issues/63829) | **10** | Per-Agent 独立 Memory-Wiki | 已关闭；推测已合并/定稿 |
| [#8508](https://github.com/openclaw/openclaw/issues/8508) | **6** | 动态/上下文相关的 Ack Reaction | 等待 Community 与 Maintainer 审查 |
| [#7722](https://github.com/openclaw/openclaw/issues/7722) | **4** | 文件系统沙箱配置 (tools.fileAccess) | 待安全审查 |
| [#7524](https://github.com/openclaw/openclaw/issues/7524) | **4** | Group session 统一到主 session 的 `groupScope` 选项 | 关联 PR 打开 |
| [#9409](https://github.com/openclaw/openclaw/issues/9409) | **3** | 改进 Context Overflow 错误信息，附上具体 token/窗口状态 | 待产品决策 |
| [#6890](https://github.com/openclaw/openclaw/issues/6890) | **3** | 在 Agent 配置中定义 Ralph Loop 最大迭代数 | 待产品决策 |

### 🧭 深层平台发展方向

1. **Agent 调度者化**：`queue_status` 工具（[#9797](https://github.com/openclaw/openclaw/issues/9797)）、多通道子 Agent 并发（[#10467](https://github.com/openclaw/openclaw/issues/10467)）、`maxTurns` 上限（[#9912](https://github.com/openclaw/openclaw/issues/9912)）——社区正推动 Agent 从指令执行者升级为自主任务调度发动机。
2. **流式与多媒体原生**：流式 TTS 管线（[#8355](https://github.com/openclaw/openclaw/issues/8355)）、WhatsApp 贴片与通话事件（[#7476](https://github.com/openclaw/openclaw/issues/7476) & [#7540](https://github.com/openclaw/openclaw/issues/7540)）——非文本通道正在走向原生。
3. **可编程控制平面**：节点注册工具（[#8287](https://github.com/openclaw/openclaw/issues/8287)）、私有模式（[#7403](https://github.com/openclaw/openclaw/issues/7403)）、插件配置自动注入（[#6792](https://github.com/openclaw/openclaw/issues/6792)）——社区希望 OpenClaw 作为 AI 基础设施的“可编程面板”使用。
4. **成本与溯源透明**：暴露 OpenRouter/auto 解析后的实际模型与成本（[#7006](https://github.com/openclaw/openclaw/issues/7006)）、批量 API 支持（[#9865](https://github.com/openclaw/openclaw/issues/9865)）——平台铺设走向企业级精细运营。

---

## 7. 用户反馈摘要

从今日繁杂的 Issue 评论和描述中，可以清晰地提炼出用户的 **核心痛点** 与 **满意点**。

### 😠 核心痛点

- **“Agent 什么都读不到，也做不了”**：#99241 用户报告长时间运行的工具输出被转换为图片占位符，Agent 完全无法读取 stdout/stderr，“Even though that text is often the evidence needed to continue the workflow.” 这意味着整个自动化链条被彻底打断。
- **“重启，无尽的 重启”**：#91588（Gateway OOM）、#99681（Discord 断连）让运维人员陷入“启动-挂掉-重启-再挂掉”的死循环。评论指出：“Normal server-side rebalancing that every long-lived bot sees”（#99681），用户认为这种基础的重连能力不应缺失。
- **“悄无声息的失败”**：#87109 用户描述了最糟糕的开源项目体验：macOS 下 cron 任务因内存压力静默无输出、无推送、无错误上报。“silent terminal failure”（#97877）、“cron jobs fail silently”（#87109）是高频词条。
- **“花了钱还是用不了”**：#70903 用户遭到 Provider 402 计费错误后，`disabledUntil` 时间戳持久化，即使充值后仍被长期拒之门外。
- **“集成总是差口气”**：Slack 只有纯文本（#12602）、WhatsApp 贴片被当做普通图片（#7476）、无法感知通话事件（#7540）——用户渴望的是原生体验，而不是“通过消息桥接勉强可用”。

### 😊 满意点与拥护

- **“OpenClaw 的治理是透明的”**：用户在评论中引用了 `clawsweeper` 标签的状态（如 `needs-product-decision`、`no-new-fix-pr`），表明他们理解和信任 CI/Bot 驱动的分类工作流。
- **“竞争对手方案有价值，但这里更完整”**：在 PR [#103974](https://github.com/openclaw/openclaw/pull/103974) 中，贡献者明确提到“This PR implements the ClawSweeper-preferred ‘best solution’”，体现了社区对项目内部决策流程的尊重。
- **“修复速度令人印象深刻”**：不少高位 Bug（如 #99681 Discord 重连、#91283 安全排序反转）今日已经关闭，用户可能尚未发文感谢，但从 PR 被积极合并的现实看，高频贡献者的付出是有回应的。

---

## 8. 待处理积压

以下为持续时间较长或状态为“等待”的高风险/高热度议题，需维护团队重点关注：

### ⚠️ 一等优先级积压

| Issue/PR | 严重度 | 创建时间 | 卡点原因 |
|---|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | **🔥 P0** | 2026-06-09 | Gateway 内存泄漏（350MB→15.5GB）已经活跃 1 个月，虽然评论 15 条、热度极高，但当前标签停留在 `clawsweeper:needs-live-repro` 与 `needs-product-decision`。等一个稳定的现场复现环境或明确的修复方向。 |
| [#87109](https://github.com/openclaw/openclaw/issues/87109) | **P1** | 2026-05-27 | macOS Gateway 空闲内存从 558MB 涨至 1073MB+，cron 静默失败。已被标记为 `stale`，有些危险——如果这是 macOS 双栈的共有问题，它是 #91588 的变种。 |
| [#70903](https://github.com/openclaw/openclaw/issues/70903) | **P2** | 2026-04-24 | Provider 账单恢复后冷却时间过长，`stale` 标签已挂上两个月。直接影响“买了额度还是用不了”的用户体验，急需产品决策。 |
| [#12602](https://github.com/openclaw/openclaw/issues/12602) | 增强 | 2026-02-09 | Slack Block Kit 支持。长达 5 个月的等待，社区仍源源不断有新讨论。 |

### 📌 重要 PR 在等待作者

| PR | 相关 Issue | 标签 | 等待原因 |
|---|---|---|---|
| [#103687](https://github.com/openclaw/openclaw/pull/103687) | #103429 | `⏳ waiting on author` | 发布流程不可变历史溯源，需要在指定 commit `94ff88960` 上通过精确签名验证。 |
| [#103935](https://github.com/openclaw/openclaw/pull/103935) | #103423 | `⏳ waiting on author` | npm 发布需绑定批准包字节与 Telegram 发布证据。 |
| [#97845](https://github.com/openclaw/openclaw/pull/97845) | #97750 | `⏳ waiting on author` | 修复工具调用 XML 泄露到聊天回复，P1 但作者需更新对 review 的答复。 |
| [#97175](https://github.com/openclaw/openclaw/pull/97175) | - | `⏳ waiting on author` | 上下文引擎转交维护任务缺少 per-task 超时保护，挂死会锁住整个用户消息队列。 |
| [#100960](https://github.com/openclaw/openclaw/pull/100960) | - | `Draft` | 命令清单与检查功能，自 7 月 6 日以来仍为草稿，未更新。 |

---

**今日总结：OpenClaw 项目正处于高速演进期，虽然存在 P0 内存泄漏等突出顽疾，但社区与维护团队通过 ClawSweeper 治理系统保持了极高的响应性与透明度。** 项目正在从“能用”向“可编程、可运营、可信任”的 AI Agent 基础设施坚定前行。

---

## 横向生态对比

# 个人 AI 智能体开源生态横向对比分析报告

**日期：** 2026-07-11  
**分析师：** 资深 AI 智能体与开源生态技术分析师  
**数据来源：** GitHub (OpenClaw, Zeroclaw, PicoClaw, QwenPaw, Hermes-Agent) 当日社区动态

---

## 1. 生态全景

个人 AI 助手与自主智能体开源生态正从“对话式原型”加速迈向“可编程 AI 基础设施”。当日五大项目合计更新超过 **750 条 Issue** 与 **1060+ 个 PR**，社区贡献热度达到历史高位。核心信号有三个：一是**生产级可靠性**取代炫技成为最迫切议题（OOM、缓存丢失、进程泄漏反复出现）；二是**跨平台原生集成**成为标配诉求（Telegram/WhatsApp/Slack/飞书等均需富文本与事件感知）；三是**安全与治理**从附加项上升为架构级约束（权限策略、审计溯源、合规发布）。尽管技术路线（Node / Rust / Go / Python）各异，但生态整体正向**可运营、可信任、可组合**的方向趋同。

---

## 2. 各项目活跃度对比

| 项目 | 今日 Issue 活动量① | 今日 PR 活动量① | 版本发布 | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 410（新开/活跃212，关闭198） | 500（待合并320，合并/关闭180） | 无 | 治理机制高效，社区贡献饱和；但 P0 内存泄漏牵制整体评分 |
| **Zeroclaw** | 极高（未精确披露，多个热点 Issue 持续讨论） | ~50+（44待合并+6合并） | 无 | 社区活力强，PR 积压明显，部分 S0/S1 Bug 待攻坚 |
| **PicoClaw** | 3 更新 | 18 活跃（**0 合并**） | 无 | 贡献效率高（自愈闭环好），但合并吞吐量严重偏低（严重积压） |
| **QwenPaw** | 43 更新（发布后校准期） | 49 操作（4 个修复 PR 在途） | **v2.0.0 Stable + 2 Beta** | v2.0 里程碑落地但 Windows 沙箱崩溃引发信任危机；核心团队响应及时 |
| **Hermes-Agent** | 292（新开/活跃211） | 500（更新，其中待合并426） | 无 | 贡献量最大但 PR 队列严重堵塞；QQ/Feishu 平台稳定性和 Provider 兼容是主要短板 |

> ① 各项目统计口径略有差异：OpenClaw / Hermes-Agent 为 Issue/PR 总处理数（含新开、关闭、更新），Zeroclaw / PicoClaw / QwenPaw 为当日有活动的数量，但仍能横向反映相对规模。

**综合排序（按活跃度）：**  
Hermes-Agent ≈ OpenClaw > Zeroclaw ≈ QwenPaw > PicoClaw

---

## 3. OpenClaw 在生态中的定位

OpenClaw 是当前生态中**社区规模最大、治理体系最成熟**的 AI 智能体开源项目，扮演着“生态基准”的角色。

- **核心优势：**  
  - **自动治理先行**：ClawSweeper 系统实现标签化分流、自动关闭/标记，保持 Issue 开放/关闭比约 1:1，在同等规模下效率显著高于其他项目（Hermes-Agent 待合并 PR 426 个，OpenClaw 仅 320 个）。  
  - **专注核心可靠性**：从 PR 分布看，OpenClaw 密集解决 AI Provider 统一速率限制、Prompt Cache 跨边界稳定性、内存泄漏等基础设施级问题，而非追赶 IM 平台数量（相反，Hermes 和 Zeroclaw 更多投放在渠道适配）。  
  - **社区讨论深度最高**：Agent 自省能力、长会话可靠性、安全排序反转等议题触及架构哲学，反映出用户以开发者/AI 工程师为主，更关注“可编程性”。

- **与同类对比的差异：**  
  - 相比 **Hermes-Agent**（侧重 IM 客服场景、QQ/飞书深度集成），OpenClaw 更强调通用 Agent 调度与 Provider 无关性。  
  - 相比 **QwenPaw**（绑定 AgentScope 框架与 Qwen 模型），OpenClaw 保持模型中立。  
  - 相比 **Zeroclaw**（Rust 实现、SOP 可视化编辑器），OpenClaw 在生态规模和治理上领先，但 Zeroclaw 在表现层（SOP 编排、Telegram 多图）创新更快。  
  - 相比 **PicoClaw**（Go 嵌入式、树莓派部署），OpenClaw 面向服务器级部署，适合企业级场景。

**当前定位总结：** 项目正处于从“能用”向“可编程、可运营、可信任”AI Agent 基础设施迈进的过程，是生态中最具备**中立性、规范性与深度**的参考实现。

---

## 4. 共同关注的技术方向

以下议题在 **3 个及以上项目**的热点中同时涌现，代表生态共性需求。

| 共同方向 | 涉及项目 | 具体诉求/表现 |
|---|---|---|
| **Agent 自我认知与工具输出可读性** | OpenClaw (#99241)、Zeroclaw (#5862)、QwenPaw (#5946) | Agent 无法读取自己的工具输出（折叠/截断），无法理解自身能力边界，导致自动化断链或死循环。 |
| **长会话可靠性**（缓存/内存/重连） | OpenClaw (#91588 OOM, #102175 cache)、Zeroclaw (#8929 streaming 重复)、PicoClaw (#3178 WS 断连)、QwenPaw (#5856 压缩破坏 tool_call) | 内存泄漏、提示缓存失效、消息队列锁定、断连不恢复——生产部署的核心障碍。 |
| **跨平台原生集成深度** | 所有项目（Zeroclaw Telegram 多图, OpenClaw Slack Block Kit, Hermes-Agent QQ/Feishu, PicoClaw WhatsApp input status） | 纯文本桥接不再被接受，富交互（卡片、按钮、模板消息）成为 IM 集成底线。 |
| **安全与权限模型重构** | OpenClaw (#91283 minSecurity 反转, #103534 越权)、PicoClaw (#3246 MQTT 硬编码跳过 TLS)、QwenPaw (#5947 MCP 权限失效) | 大量安全逻辑在真实场景中被发现设计缺陷，社区对“安全默认值”的敏感性急剧上升。 |
| **Provider 兼容与成本控制** | OpenClaw (#332 codex/gpt5.6 回归, #102250 限速统一)、QwenPaw (#5950 中文 embedding 截断)、Hermes-Agent (#2792 custom provider 重映射) | 多 provider 路由、动态降级、成本透明成为企业级用户的刚需。 |
| **可编程控制平面** | OpenClaw (节点注册/#8287、私有模式)、Zeroclaw (SOP 可视化 PR #8590)、QwenPaw (Slash 命令补全 #5869, Session 分组 #5903) | 用户希望 Agent 框架暴露可编程 API 而非仅通过聊天界面控制。 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Zeroclaw | PicoClaw | QwenPaw | Hermes-Agent |
|---|---|---|---|---|---|
| **主语言** | TypeScript/Node | Rust | Go | Python | Python |
| **核心架构哲学** | 自动化治理 + Provider 无关调度 | 可视化 SOP + 轻量运行时 | 极简嵌入式 + 安全硬修复 | AgentScope 2.0 框架 + Qwen 模型优先 | 多 IM 平台统一网关 + 社区插件 |
| **功能侧重** | AI 调用可靠性、缓存策略、开放治理 | SOP 编排、Telegram 集成、Cron 增强 | 功耗敏感设备、IoT、WhatsApp 即时反馈 | 桌面应用、记忆系统、上下文压缩 | QQ/Feishu/WhatsApp 适配、Dashboard 远程控制 |
| **目标用户** | Agent 开发者/DevOps，构建通用服务器 Agent | SOP 重度用户、Rust 生态偏好者、自动化工作流设计者 | 树莓派/边缘部署、极简运维的开发者 | Qwen 模型用户、桌面端个人助手、中文社区 | 中国 IM 生态用户、客服场景、多平台分散用户 |
| **当前成熟度** | 架构成熟，治理完善，但仍有 P0 内存泄漏 | 功能丰富但与 OpenClaw 比集成广度仍有差距 | 小而美，贡献质量高但功能广度有限 | 2.0 大版本重塑，稳定性处于“震荡期” | 功能最广，但 PR 积压与回归问题较严重 |

**核心分化逻辑：**  
- **OpenClaw → 做厚平台**，聚焦可靠性、治理与通用性。  
- **Zeroclaw → 做优体验**，用 Rust + 可视化吸引 SOP 用户。  
- **PicoClaw → 做轻内核**，专攻边缘与安全审计。  
- **QwenPaw → 做深生态**，绑定 AgentScope 与 Qwen 模型，桌面端差异化。  
- **Hermes-Agent → 做宽渠道**，IM 平台数量第一，但质量/稳定性需要补课。

---

## 6. 社区热度与成熟度分层

### 🔥 第一梯队：超大规模 + 高强度贡献（OpenClaw、Hermes-Agent）
- **特征**：日均 Issue 200+，PR 500+，贡献者覆盖面广。  
- **成熟度差异**：  
  - OpenClaw 治理闭环更好，关闭/合并效率远高于 Hermes-Agent。  
  - Hermes-Agent 待合并 PR（426）几乎是 OpenClaw（320）的 1.33 倍，且多平台引入的碎片化 Bug 更多。
- **结论**：OpenClaw 处于“质量巩固期”，Hermes-Agent 仍处于“功能铺量期”。

### 🚀 第二梯队：发布活跃/快速增长（QwenPaw、Zeroclaw）
- **QwenPaw**：v2.0 发布引爆讨论，但紧急 Bug（沙箱崩溃）暴露了版本成熟度不足，核心团队快速响应证明迭代能力。  
- **Zeroclaw**：社区创新密度高（SOP 可视化、ComfyUI 集成），无版本发布但 PR 积压显现审查瓶颈。  
- **结论**：两者均处于从“快速迭代”向“质量巩固”过渡的临界点。

### 🌱 第三梯队：小而专注（PicoClaw）
- **特征**：社区小但贡献者技术功底强（自愈闭环、安全审计），单日 0 合并暴露维护资源瓶颈。  
- **结论**：项目潜力大，但需要核心团队增加审查投入，否则会损失贡献者热情。

---

## 7. 值得关注的趋势信号

### 趋势一：Agent 从“指令执行者”升级为“自主调度者”
- 社区不再满足于“一问一答”，而是要求 Agent 能够**感知队列状态、并行发起子 Agent、管理自身能力上限（maxTurns）**（OpenClaw #9797/#10467/#9912，Zeroclaw #5862）。  
- **启示**：智能体框架需内置任务调度抽象，而非仅靠工具调用。

### 趋势二：“生产级睡眠故障”倒逼监控与自我修复
- OOM 无限重启（OpenClaw #91588）、MCP 子进程泄漏（Zeroclaw #5903）、静默失败无报警（OpenClaw #87109）——项目正在从“功能完善”走向“可运营”。  
- **启示**：AI 基础设施必须集成健康探针、资源限制、优雅降级与自动恢复（类似 Kubernetes liveness 模式）。

### 趋势三：安全左移——从“默认不安全”到“默认安全”
- MQTT 硬编码跳过 TLS（PicoClaw）、MCP 权限配置不生效（QwenPaw）、`minSecurity` 排序反转（OpenClaw）→ **安全逻辑错误比没有安全更危险**。  
- **启示**：安全策略必须在框架层进行单元测试与运行时校验，社区审计需成为正式流程。

### 趋势四：IM 平台集成要求“原生 UX”而非“文本桥接”
- Slack Block Kit、WhatsApp 贴纸/通话事件、Telegram 多图流、飞书卡片交互——用户期望 Agent 能**感知平台 UI 能力**（模板消息、交互按钮、流式状态）。  
- **启示**：通道适配器需要支持平台 SDK 的“富能力”而非仅消息转发，对框架的插件体系提出更高要求。

### 趋势五：开发者希望 Agent 框架同时是“控制系统”
- 可编程控制面（节点注册、配置文件注入、动态路由）、会话分组/导入导出（QwenPaw #5903）、成本与模型溯源透明（OpenClaw #7006）表明社区在**将 Agent 平台视为内部开发者平台**。  
- **启示**：API 化、配置化、可观测性是未来竞争的护城河，而不仅仅是对话效果。

---

## 总结

2026-07-11 的社区快照揭示了个人 AI 智能体生态正处于 **“功能密度高、系统性风险多、治理分化”** 的关键阶段。OpenClaw 凭借 ClawSweeper 治理与核心稳定性投入保持领先；Hermes-Agent 以 IM 广度见长但需解决排队质量；Zeroclaw 和 QwenPaw 分别从 SOP 可视化与 2.0 架构切入差异化市场；PicoClaw 在边缘领域展现锋芒。对于技术决策者与开发者而言，当前最佳策略是**关注各项目的关键 Bug 修复能力与治理效率**，而非单纯对比功能数量——因为生态正用最真实的方式证明：可靠性是 AI 智能体走向生产环境的唯一门票。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

好的，这是根据 Zeroclaw (github.com/zeroclaw-labs/zeroclaw) 在 2026-07-11 的 GitHub 数据生成的每日项目动态日报。

---

# Zeroclaw 项目动态日报 – 2026-07-11

## 今日速览

项目在过去24小时内呈现出极高的活跃度，Issues和PR的更新数量均处于高位。值得关注的是，大量的PR（44个）仍处于待合并状态，形成了一个显著的“积压”，这可能预示着项目在发布节奏或代码审查流程上遇到了瓶颈。社区焦点主要集中在**Telegram频道集成优化**（特别是多图和命令菜单问题）、**运行时稳定性**（streaming narration重复和panic崩溃）以及**新的ComfyUI集成**与**认证安全架构**上。尽管没有新版本发布，但大量PR和Issue的涌现表明项目正处于一个功能密集开发和持续改进阶段。

## 版本发布

无新版本发布。

## 项目进展

今日有6个PR被合并/关闭，一些关键进展包括：

- **安全加固**：PR [#8829](https://github.com/zeroclaw-labs/zeroclaw/pull/8829) 被合并，为Web网关添加了默认的HTTP安全响应头，弥补了安全扫描中发现的11个信息性漏洞。这是一个提升基础安全性的务实改进。
- **Cron功能增强**：PR [#8676](https://github.com/zeroclaw-labs/zeroclaw/pull/8676) 被合并，成功在CLI、工具和网关API中暴露了 `uses_memory` 标志，解决了之前只能通过配置文件设置的痛点。这使cron作业的自动化配置更加灵活。
- **文档与模板优化**：PR [#8825](https://github.com/zeroclaw-labs/zeroclaw/pull/8825) 和 [#8859](https://github.com/zeroclaw-labs/zeroclaw/pull/8859) 被合并，分别完善了Telegram的文档和PR模板，旨在降低新用户和贡献者的上手门槛。
- **性能问题修复**：PR [#8951](https://github.com/zeroclaw-labs/zeroclaw/pull/8951) 解决了streamed narration重复输出的Bug，修复了因首尾空白字符导致演示文本错位的问题，提升了用户体验。PR [#8954](https://github.com/zeroclaw-labs/zeroclaw/pull/8954) 引入了基于Alpine的多架构镜像，为在Apple Silicon等不同平台上部署提供了更轻量、高效的选择。
- **配置错误修复**：PR [#8953](https://github.com/zeroclaw-labs/zeroclaw/pull/8953) 修正了开发模板中Ollama端点的放置错误，避免了潜在的配置混淆。

总体来看，项目在修复现有Bug和提升易用性方面稳步推进，但大量待合并的PR仍是未来需要解决的主要问题。

## 社区热点

1.  **最热Issue: [Bug]: zeroclaw does not know it can add cron. (#5862)**
    - **链接**: [#5862](https://github.com/zeroclaw-labs/zeroclaw/issues/5862)
    - **分析**: 该问题虽为旧Issue，但仍在活跃讨论中。用户的核心诉求是**AI Agent未能充分理解自身能力边界**，无法将用户的自然语言指令（“每天晚上8点提醒我”）映射到内部的 `cron` 工具。这反映了Agent对自身功能集的“认知”与实际可用工具之间的脱节，是一个典型的**AI可发现性问题**，对用户体验影响重大。
2.  **高热度PR: feat(sop): web visual authoring (#8590)**
    - **链接**: [#8590](https://github.com/zeroclaw-labs/zeroclaw/pull/8590)
    - **分析**: 尽管标记为“Beta”，但这个长达多日的巨型PR（涉及几十个组件）吸引了大量关注。它引入了**可视化SOP（标准操作程序）编辑器**，是项目向更高级、更可控的自动化迈出的重要一步。社区对此充满期待，同时也讨论了其复杂性和潜在影响。
3.  **紧急Bug: [Bug]: skill-review fork panics (out-of-range slice) (#8654)**
    - **链接**: [#8654](https://github.com/zeroclaw-labs/zeroclaw/issues/8654)
    - **分析**: 关于“技能回顾”进程因panics而崩溃的Bug引起了许多用户的担忧，因为它会导致整个Agent进程退出（SIGSEGV）。在重度工具调用后频繁出现的崩溃问题，对生产环境的稳定性是巨大威胁。

## Bug 与稳定性

今日报告的Bug数量较多，按严重程度排列如下：

- **严重 (S0/S1)**:
    - `reasoning_content not passed back in agentic tool-call loops with Xiaomi thinking mode models` [#6672](https://github.com/zeroclaw-labs/zeroclaw/issues/6672) (S0): 在使用小米模型时，思考过程（reasoning_content）未在工具调用循环中传递，可能导致上下文逻辑丢失。
    - `Gemini function calls fail because thought_signature is dropped from assistant history` [#8934](https://github.com/zeroclaw-labs/zeroclaw/issues/8934) (S1): 与Gemini的功能调用因历史记录中缺少 `thought_signature` 而失败，严重阻断工作流。
    - `Channel turns ignore runtime-profile strict/parallel tool flags` [#7809](https://github.com/zeroclaw-labs/zeroclaw/issues/7809) (S2，但因长期未修且影响范围大，此前被标为P1): 频道消息处理会忽略运行时的工具执行策略。

- **中高 (S2)**:
    - `skill-review fork panics (out-of-range slice)` [#8654](https://github.com/zeroclaw-labs/zeroclaw/issues/8654): 严重崩溃问题，已有多个用户遇到。
    - `streamed narration can be duplicated` [#8929](https://github.com/zeroclaw-labs/zeroclaw/issues/8929): 输出文字重复，影响用户体验。已有对应修复PR [#8951](https://github.com/zeroclaw-labs/zeroclaw/pull/8951) 被合并。
    - `loop_detector::hash_value deep-clones entire tool-args JSON tree` [#8936](https://github.com/zeroclaw-labs/zeroclaw/issues/8936): 性能热点问题，在长对话中可能导致RSS（驻留内存）增长。
    - `MCP stdio child processes accumulate on daemon` [#5903](https://github.com/zeroclaw-labs/zeroclaw/issues/5903) (S2，已关闭): MCP子进程泄漏问题。虽然已关闭，但此前的根因分析（未实现 `SIGTERM` ）值得关注。

- **低危**:
    - `Telegram setMyCommands rejected with BOT_COMMANDS_TOO_MUCH` [#8950](https://github.com/zeroclaw-labs/zeroclaw/issues/8950): 工具和技能过多导致Telegram命令菜单无法注册。
    - `ZeroCode input box blocks macOS text replacements` [#8945](https://github.com/zeroclaw-labs/zeroclaw/issues/8945): ZeroCode TUI的兼容性问题。

## 功能请求与路线图信号

- **明确纳入路线图**:
    - **ComfyUI/Comfy Cloud集成** ([#6563](https://github.com/zeroclaw-labs/zeroclaw/issues/6563)): 作为“共享媒体提供者”，支持图像生成和未来的 `gen_video` 功能。这是一个呼声很高的功能，将显著扩展ZeroClaw的内容生成能力。
    - **可观察性增强**：`Add gen_ai.conversation.id for cross-turn session correlation in OTel export` ([#8933](https://github.com/zeroclaw-labs/zeroclaw/issues/8933)) 请求添加 `session_id` 进行会话关联，这符合提升可观察性的整体趋势。参考 [Tracker: v0.8.3 observability...](#8073)。
    - **多用户与授权**：[Tracker: multi-user milestone...](#8290) 将“按主体隔离”和“按发送者授权”作为核心里程碑，与刚合并的 `--agent` 安全修复 ([#8044](https://github.com/zeroclaw-labs/zeroclaw/issues/8044)) 逻辑一致。

- **未明确但可能性高**:
    - **Telegram多消息流模式**：PR [#8561](https://github.com/zeroclaw-labs/zeroclaw/pull/8561) 和 [#8955](https://github.com/zeroclaw-labs/zeroclaw/pull/8955) 都在积极增强Telegram通道，表明下一个版本将重点优化Telegram上的交互体验。
    - **插件系统**：由PR [#8908](https://github.com/zeroclaw-labs/zeroclaw/pull/8908) 和 [#8909](https://github.com/zeroclaw-labs/zeroclaw/pull/8909) 引入的“统一能力目录”，是构建正式插件体系的第一步，这将改变项目未来的扩展模式。

## 用户反馈摘要

- **核心痛点**：
    - **Agent“认知”不足**：如上文社区热点（#5862）所述，用户期望AI能更智能地理解自身能力，需要更好的提示或内部推理机制来弥合“意图”与“动作”之间的鸿沟。
    - **多平台配置复杂**：用户（#8810）批评Telegram文档配置描述错误，认为即使使用Rust开发，如果实现不完善，产品体验依然是“slop”。这反映了用户在跨平台集成时遇到的困难。
    - **稳定性与错误处理**：关于上下文溢出导致“幻觉”（#6517）和进程崩溃（#8654）的反馈，表明用户在生产环境中对Agent的稳定性和可靠性有极高要求。
- **使用场景**：
    - 用户试图将ZeroClaw与Amazon Bedrock等企业级服务集成（#8925），说明其应用场景正向商业化、企业级基础设施延伸。
    - 社区对SOP可视化编辑（#8590）和cron `uses_memory`（#8397）等高级功能的关注，反映了用户正在寻求更复杂的、有状态的自动化工作流。
- **满意之处**：新功能如PR [#8954](https://github.com/zeroclaw-labs/zeroclaw/pull/8954) 引入多架构支持，受到了希望在异构硬件上运行用户的欢迎。

## 待处理积压

- **严重阻塞**: [Bug]: MCP stdio child processes accumulate on daemon... (#5903)
    - **链接**: [#5903](https://github.com/zeroclaw-labs/zeroclaw/issues/5903)
    - **状态**: 已关闭 (Closed)
    - **备注**: 虽然此Issue已关闭（根据PR [#5920](https://github.com/zeroclaw-labs/zeroclaw/pull/5920)），但这是一个S0/S1级别的严重Bug（子进程泄漏），其修复和验证过程非常关键。维护者应确保此修复经过了充分测试，并且没有引入回归问题。对于其他用户，这是一个值得关注以了解自己是否受影响的案例。
- **长期未响应的PR**:
    - `feat(sop): web visual authoring...` [#8590](https://github.com/zeroclaw-labs/zeroclaw/pull/8590)
    - `feat(channels/telegram): add multi_message streaming mode` [#8561](https://github.com/zeroclaw-labs/zeroclaw/pull/8561)
    - **备注**: 这两个大型PR分别创建于7月1日和6月30日，至今已有10天左右。虽然功能重要且复杂，但长期未合并可能成为技术债务或导致更多的冲突。维护者应评估其状态，决定合并或要求作者更新。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 | 2026-07-11

**数据来源**: GitHub (sipeed/picoclaw) | **报告周期**: 过去 24 小时


## 1. 今日速览

今日 PicoClaw 呈现 **极高强度社区贡献** 态势。过去 24 小时内共更新 3 个 Issue、18 个 Pull Request。虽然没有新版本发布，但社区在 **安全漏洞修复**（Go 1.25.12 升级、MQTT 证书绕过）和 **核心功能重写**（OAuth 兼容性、WhatsApp 即时反馈）上完成了“发现即提交修复”的快速闭环。用户 @greencabe 与 @corporatepiyush 的贡献尤其突出，分别主导了 OAuth 重构和代码安全审计。

项目健康度评估（8.5/10）：**社区活力极强**，但关键信号是过去 24 小时内在 18 条活跃 PR 中没有 **1 条被合并**，且近半数 PR 被打上 `[stale]` 标签。**合并吞吐量偏低** 是当前项目最大的潜在瓶颈。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

过去 24 小时无正式 PR 合并入主分支，但关键领域的推进非常明显：

- **🍀 Bug/Feature 修复闭环**：贡献者 @greencabe 提交了 Issue #3239（OAuth 竞态风险）与 #3240（WhatsApp 缺输入状态），并立即在同日提交对应的修复 PR #3241 与实现 PR #3242，实现了高效的社区自愈循环。
- **🧹 安全与稳健性大修**：
  - `#3248` — Go 从 1.25.11 升级到 1.25.12，修复 `crypto/tls` 与 `os` 包的两个高危 CVE。
  - `#3246` — 一次性修复 MQTT TLS 验证被硬编码绕过、OAuth 超时缺失等三个安全/健壮性问题。
- **🔧 底层性能优化**：@corporatepiyush 连续提交 `#3243` `#3244` `#3245` 三个重构 PR，将 seahorse/skills 模块中的字符串拼接操作从 O(n²) 优化为 O(n)，显著减少内存分配。
- **🔄 通道迭代**：#3179（WhatsApp WebSocket 重连）被关闭，虽未合并但对 WhatsApp 通道的健壮性讨论提供了完整上下文。

---

## 4. 社区热点

**讨论热度最高的信号——自愈型社区正在形成**

1. **OAuth 问题（#3239 / #3241）**：用户 @greencabe 在 Issue 中指出 `RefreshAccessToken` 对不同 Provider 发送硬编码表单请求导致 OpenAI OAuth 完全不可用，且存在并发竞态。该 Issue 当天即收到同作者提交的完整修复 PR（#3241），讨论效率极高。
2. **WhatsApp 缺少输入状态（#3240 / #3242）**：同一位作者指出用户发送消息后零反馈的糟糕体验，当天提交实现 PR，目前该 PR 已获初步称赞并等待审核。
3. **Stale PR 集体暴露维护瓶颈**：列表中的 `#2937`（Agent Collaboration）、`#3165` （Seed XML 修复）、`#3193`（Simplex 通道）、`#3200`（降级链配置）、`#3208`（Deps）等 **6 条 PR 被打上 `[stale]` 标签**，且它们累计已开放超 2 周。这反映出核心维护者可能面临审核资源紧张，建议团队优先清理这批积压。

---

## 5. Bug 与稳定性

按严重等级排列，今日无 **新发生的崩溃级 Bug**，但安全与健壮性隐患居多：

| 严重等级 | 问题描述 | 涉及组件 | 已有 Fix PR | 备注 |
|---|---|---|---|---|
| 🔴 **Critical** | Go 标准库 `crypto/tls` 与 `os` 存在安全漏洞（GO-2026-5856，GO-2026-4970） | 全平台 CI | `#3248`（已提交） | 建议优先合并并发布补丁版 |
| 🔴 **Critical** | MQTT 通道硬编码 `InsecureSkipVerify: true`，所有 Broker 连接默认跳过 TLS 证书验证 | `pkg/channels/mqtt` | `#3246`（已提交） | 中间人攻击风险，严重设计缺陷 |
| 🟠 **High** | OAuth `RefreshAccessToken` 对 OpenAI 发送错误格式 JSON 请求，且不携带 Scope 刷新时会导致竞态 | `auth` 模块 | `#3241`（已提交） | 影响所有使用 OpenAI OAuth 的用户 |
| 🟡 **Medium** | WhatsApp WebSocket 超时/断线（#3178） | WhatsApp 通道 | 修复 PR `#3179` 被关闭，该问题未完全闭环 | 建议释放新的修复方案 |

---

## 6. 功能请求与路线图信号

**近期极可能落地（预示 v0.2.10 或 v0.3.1 内容）：**

| 新增功能 | 来源 | 状态 | 影响评估 |
|---|---|---|---|
| WhatsApp 原生输入状态指示器 | `#3240` → `#3242` | PR 已就绪 | 大幅提升 WhatsApp 即时通讯体验 |
| OAuth 多 Provider 兼容 + 并发安全 | `#3239` → `#3241` | PR 已就绪 | 解锁 OpenAI OAuth 用户群体 |
| ARMv7 构建目标 + 9router 网关兼容 | `#3205` | PR 开放 | 解锁树莓派等边缘设备部署场景 |

**中长期路线图信号（可能纳入 v0.4+）：**

- **Agent 协作总线（#2937）**：持续更新，引入了持久化 Agent 信箱、会话隔离、结构化消息信封，设计目标明确指向多 Agent 协同工作，将极大抬升 PicoClaw 的架构上限。
- **Simplex 通道（#3193）**：社区对去中心化、隐私优先的通信协议有显性需求，若合并将进一步丰富通道生态。
- **模型降级链 Web UI 配置（#3200）**：用户可直接在界面配置默认模型及其降级顺序，是对 multi-provider 策略的重要用户层补充。

---

## 7. 用户反馈摘要

从过去 24 小时的 Issue 和 PR 评论中提炼的真实用户声音：

- **“Users see no feedback between sending a message and receiving the bot reply”** （#3240）
  → 明确表达了 WhatsApp 用户等待 bot 回复时的焦虑感，输入状态是即时通讯的基本体验要求。

- **“Raspberry Pi 3 B+ … there was no ARM build target, and the openai_compat provider failed to parse 9router's responses”** （#3205）
  → 非 x86 硬件（如树莓派）及非标准 OpenAI 网关（9router）的兼容性正在成为主流痛点。用户有强烈的**低成本本地化部署**需求。

- **“`auth.RefreshAccessToken` currently sends the same form-encoded refresh payload to every OAuth provider and always includes a fixed scope”** （#3239）
  → 社区用户通过代码审计发现框架层面的全局兼容性缺陷，说明贡献者技术功底深厚且关注运行时健壮性。

- **“InsecureSkipVerify: true … disabled certificate verification for **every** broker connection”** （#3246）
  → 社区审计人员以“难以置信”的语气报告了该安全缺陷，暗示该配置默认值应被立即修正，用户对 MQTT 通道的安全信任面临风险。

---

## 8. 待处理积压

以下为长期未获得审核或明显 `[stale]` 的关键 PR/Issue，建议维护团队优先干预：

| ID | 标题 | 创建时间 | 状态 | 建议操作 |
|---|---|---|---|---|
| `#2937` | Feat/agent collaboration | 2026-05-24（49 天） | `[stale]` | 方向巨大的超级特性，应正式分配评议者，防止社区热情消磨 |
| `#3165` | fix(openai_compat): recover Seed XML tool calls | 2026-06-24（17 天） | `[stale]` | 特定模型关键 Bug，建议加快 Code Review |
| `#3193` | Added simplex channel type | 2026-06-27（14 天） | `[stale]` | 新通道特性，10 天内无进展 |
| `#3200` | feat(models): configurable default fallback chain | 2026-07-01（10 天） | `[stale]` | 用户界面增强，缺少审阅 |
| `#1951` | chore: move installation scripts | 2026-03-24（109 天） | `[stale]` | 跨 4 个月的沉积任务，建议直接关闭或指派专人完结 |

**总结判别**：项目处于 **“社区冲锋快于核心维护”** 阶段。PicoClaw 的开发者生态异常健康（用户自动完成发现的 Bug/PR），但维持这种热情需要更快的合并节奏。建议将 `#3248`（CVE 修复）与 `#3241`（OAuth 修复）作为紧急优先合并对象，随后集中清理 `[stale]` 积压。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 | 2026-07-11

---

## 1. 今日速览

昨日是 QwenPaw 极具标志性的一天：**v2.0.0 稳定版正式发布**，标志着项目从 AgentScope 1.x 向 2.0 新架构的跨时代迁移完成。社区反响极其热烈，过去 24 小时产生 **43 条 Issue 更新**和 **49 条 PR 操作**，项目活跃度处于“发布后校准”的高峰期。然而，伴随大版本发布，**Windows 桌面沙盒出现严重内存泄漏与崩溃问题（#5951）**，成为当前社区最尖锐的情绪引爆点。积极的一面是，核心团队响应迅速，针对工具截断、MCP 权限等报告的 Bug，已有 **4 个修复 PR 处于开放或已合并状态**，展现了较强的快速迭代能力。

**活跃度评估：9/10** — 流量与交互量持续高位，社区参与度极强，但稳定性风险需优先管控。

---

## 2. 版本发布

昨日共发布 **3 个版本**：1 个 Stable 与 2 个 Beta。

| 版本 | 类型 | 核心更新 | 注意事项 |
|---|---|---|---|
| **v2.0.0** | Stable | Runtime 2.0 正式上线，基于 AgentScope 2.0 重构内核（PR #5078, #4846, #5018） | **破坏性变更**。用户必须查阅升级指南（参见 Issue #5948）；旧版插件、记忆数据、配置文件的兼容性需由官方确认。 |
| **v2.0.0-beta.7** | Beta | 更新官网首页视觉与文案（#5940）；修复 ReMe 内存总结任务 `session_id` 传播丢失问题（#5938） | 对 v2.0.0 稳定版的前置 bug 修复。 |
| **v2.0.0-beta.6** | Beta | 新增 Channels 模块单元测试（#5812）；修复工具结果错误状态透传问题 | 提升内部代码质量，解决边缘情况错误。 |

- **v2.0.0 Release 链接**：https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.0.0
- **v2.0.0-beta.7 Release 链接**：https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.0.0-beta.7
- **v2.0.0-beta.6 Release 链接**：https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.0.0-beta.6

---

## 3. 项目进展

尽管处于发行密集期，团队仍同时在推进多条关键主线：

- **已合并/关闭的重大 PR**：
  - **#5942** & **#5940**：完成 v2.0.0 正式版本提升与官网视觉更新，发行流程就绪。
  - **#5938**：修复 `/compact` 命令下内存任务无法溯源到会话的 bug，解决 ReMe 记忆系统中的归属问题。
  - **#5932** & **#5937**：文档与新闻说明格式更新，提升新版本的上手体验。
  - **#5936**：**回滚**了“每消息注入当前时间”的特性（原 PR #5923），原因是 UI 显示不美观。表明团队在体验细节上保持了快速决策与纠偏能力。

- **正在进行中的核心修复 PR**：
  - **#5953**：统一工具结果长内容截断策略，改为归档 artifact + 固定长度提示。直接对治 Issue #5946 的 Agent 递归召回过读问题。**建议重点关注，尽快合并。**
  - **#5949**：MCP 访问策略持久化后立即生效，避免配置漂移。直接治理 Issue #5947。
  - **#5931**：基于受限 Token 的 Windows 沙箱方案。**极有可能是解决 #5951 内存爆炸问题的长期修复方案。**
  - **#5935**：将工具结果截断收敛到 `ToolResultPruningMiddleware` 统一中间件，提升架构整洁度。

---

## 4. 社区热点

| 排名 | Issue/PR | 热度 | 核心诉求 | 链接 |
|---|---|---|---|---|
| 1 | **#5951** | 评论 5，情绪激烈 | 升级到 v2.0.0 后桌面壳 shell 沙箱无限递归，pwsh 进程爆炸，内存 20GB 直接打死，且无法关闭沙箱。用户被迫彻底卸载 / 回滚到 v1.1.12.post3。**当前项目最大的声誉风险。** | https://github.com/agentscope-ai/QwenPaw/issues/5951 |
| 2 | **#5947** | 评论 4 | MCP 子工具的“允许/拒绝”权限设置完全无效；安全策略形同虚设。用户配置完成后 agent 仍可调用禁用工具。动摇了开发者对 MCP 安全模型的信任。已有修复 PR #5949。 | https://github.com/agentscope-ai/QwenPaw/issues/5947 |
| 3 | **#5948** | 评论 1，需求明确 | 用户明确请求官方发布《v1.x → v2.0 升级指南》，关心历史消息、日志、记忆是否兼容。代表了沉默的大多数升级焦虑。 | https://github.com/agentscope-ai/QwenPaw/issues/5948 |
| 4 | **#5946** | 评论 2 | 工具输出过长时 UI 提示 Agent“内容已被逐出上下文”，导致 Agent 频繁发起无效的 `recall_history` 调用。暴露了 scroll 截断与 Agent 决策循环的交互缺陷。已有修复 PR #5953。 | https://github.com/agentscope-ai/QwenPaw/issues/5946 |

---

## 5. Bug 与稳定性

按严重程度排列，重点关注无修复方案的开放 Bug：

| 严重度 | Issue | 标题 | 摘要 | 状态 | 修复 PR |
|---|---|---|---|---|---|
| **CRITICAL** | #5951 | Desktop shell sandbox 递归爆炸 / 20GB 内存 | 升级后沙箱无法关闭，pwsh 弹窗无限繁殖，系统失去响应。 | **Open / 无直接关闭的修复** | #5931（Token-limited sandbox，长期方案） |
| **HIGH** | #5952 | auto-memory 模块缺失崩溃 | `agentscope.tool._builtin._scripts` 找不到 -> 所有 Agent 记忆总结全面失败。 | **Open** | — |
| **HIGH** | #5947 | MCP 子工具访问策略不生效 | 前后端策略同步延迟 / 未生效，安全配置被绕过。 | **Open** | #5949（待 merge） |
| **HIGH** | #5946 | Tool 截断后 Agent 死循环调用 recall | `TRUNCATED...` 消息让 Agent 误以为上下文已被清出。 | **Open** | #5953（待 merge） |
| **HIGH** | #5856 | 上下文压缩转文本化时 tool_call 结构永久丢失 | `LightContextManager` 在压缩前将全部消息转纯文本做摘要，结构化调用信息被破坏，导致后续 400。 | **Open** | — |
| **MEDIUM** | #5950 | 中文记忆文件触发 Embedding 400（字符数非 token 数截断） | 两层截断均按字符数处理，但 embedding 模型上下文按 token 算，导致越界。 | **Open** | — |
| **MEDIUM** | #5910 | Auto Memory Search 生成错误 function_call 引发 502 | 开启记忆搜索后往 OpenAI Responses API 发错格式数据。 | **Closed** | — |
| **Low** | #5906 | 防重复误判（2.0.0b4） | 正常对话被错误终止为 “6 consecutive repetitions”。 | **Closed** | — |

---

## 6. 功能请求与路线图信号

从昨日活跃的 Issues 与 PR 中，提取出以下具有纳入 v2.x 后续版本潜力的功能信号：

| 功能 / 特性 | 对应 Issue / PR | 信号强度 | 分析 |
|---|---|---|---|
| **Vision Fallback（视觉后备）** | PR #5726 | **Strong** | 主流模型不支持视觉时，自动降级调用视觉模型处理图片。高实用价值，待 human review。 |
| **Memory Reranker（记忆重排序）** | PR #5692 | **Strong** | 在 reme0.4 检索 Pipeline 中加入重排序器，提高记忆召回相关性。核心 Agent 记忆能力提升。 |
| **Session Grouping & Import/Export** | #5903 / Design Proposal #5943 | **Strong** | 随着用户多会话场景增多，管理需求涌现。已有设计提案，在社区获得了共鸣。 |
| **Configurable Theme（可配置主题）** | #5909 | **Medium** | 来自 #2291 的大任务拆解（Task 1），P0 标签，有设计提案，等待 PR。 |
| **Langfuse Observability** | PR #5922 | **Medium** | 让 Langfuse 追踪中包含 user_id, session_id，对生产环境可观测性有重大意义。 |
| **API 自动化结构化响应** | PR #5930 | **Medium** | Java 或非 Web 界面驱动 Qwenpaw 时获取结构化 run outcome，避免解析 SSE 来判断失败。 |
| **Windows GBK 兼容** | PR #5927 | **High (for CN users)** | 中 Windows 下 nvidia-smi 等命令输出含非文本字节导致 `UnicodeDecodeError`。Fix 只需加 `errors='replace'`，建议尽快合入。 |

---

## 7. 用户反馈摘要

从昨晚到今晨的评论中，提炼真实用户情绪：

- **升级之殇（#5951）**：用户 `@wjt0321` 表达极度失望。“升上来直接崩了，关不掉沙箱，只能回滚删掉。” —— 这是一种典型的因重大版本质量事故导致信任流失的案例。
- **安全信任（#5947）**：用户 `@vipcys001-bot` 精心列出拒绝列表但完全无用，这会打击高级用户和需要安全隔离的企业级场景。
- **迁移焦虑（#5948）**：用户 `@millievn` 的提问非常克制且具有代表性：“升级 v2 有哪些破坏性变更？历史消息、日志、记忆是否兼容？” 团队亟需一篇文章或文档来安抚大部分沉默用户。
- **功能组织（#5903）**：`@renzhong424` 在 7/9 提出的会话分组、导入导出需求，到了 7/10 就被志愿者 `@nolanchic` 写好了设计提案（#5943）。这表明**社区自发贡献和运维的活跃度非常健康**，这是一个积极信号。
- **苦于核心循环（#5946）**：用户 `@manjieqi` 描述的“Agent 傻傻地去数据库召回刚刚还在上下文的东西”非常生动。表明 UI 提示文案如果设计不当会直接触发 Agent 的错误决策链。

---

## 8. 待处理积压

部分高价值主题虽已有关注，但缺乏实质性进展，提醒维护者优先关注：

| 类型 | 项目 | 当前状态 | 建议 |
|---|---|---|---|
| **P0 稳定性** | #5951 Windows 沙箱崩溃 | 1 天 / 5 条评论 / 无直接 hotfix | **【紧急】即使长期方案 #5931 还未准备好，建议维护者立即在 Issue 中提供临时关闭沙箱的官方方法或卸载指南**，降低用户损失。 |
| **P1 核心流 Bug** | #5856 上下文压缩破坏 tool_call 结构 | 2 天 / 3 条评论 / 无关联 PR | 长对话核心路径问题，可能影响到所有使用 LLM 压缩的用户。需排期修复。 |
| **PR 审查积压** | #5731 per-request model override | 8 天 / 待审查 | 如果团队希望灵活路由模型（类似 Vision Fallback），此 PR 是前置基础，建议尽快进入 human review。 |
| **PR 审查积压** | #5869 Slash Command 自动补全 | 2 天 / Under Review | 可以让 TUI 和 Web Console 的操作效率提升一个台阶，对开发者体验优化显著。 |
| **旧 Issue 沉淀** | #3437 / #3571 / #3623 等 4 月遗留 Feature Request | 已 Closed | 建议在 v2.1.0 路线讨论中明确指出哪些功能被接受、哪些被否决、哪些已进入设计阶段。避免社区觉得功能请求石沉大海。 |

---

*数据统计截止时间：2026-07-11 09:00 UTC，基于 github.com/agentscope-ai/qwenpaw 公开活动。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

好的，这是为您生成的 hermes-agent 项目动态日报。

---

## Hermes-Agent 项目动态日报

**日期：** 2026-07-11
**分析师：** AI 智能体与个人 AI 助手领域开源项目分析师

---

### 1. 今日速览

过去24小时内，Hermes-Agent 项目社区活跃度极高，收到 **292 条 Issue** 更新及 **500 条 PR 更新**，其中新开与活跃的 Issue 达 **211 条**，待合并的 PR 高达 **426 条**。尽管没有新版本发布，但大量针对 Feishu、桌面端、Provider 兼容性及定价问题的修复与功能 PR 被提交，显示了维护团队和社区对解决技术债务和优化用户体验的积极投入。PR 待合并数量庞大，可能成为影响项目交付节奏的一个重要瓶颈。

### 2. 版本发布

**无**。过去 24 小时内未发布新版本。

---

### 3. 项目进展

过去 24 小时内，共有 **74 个 PR** 被合并或关闭，以下为其中较为重要的进展摘要：

- **核心 Provider 修复（已合入）**：PR [#2792](https://github.com/NousResearch/hermes-agent/pull/2792) 修复了当用户设置 `provider: custom` 时，系统静默将其重映射为 `openrouter` 的严重 bug。此修复确保了自定义端点能够按配置路由，是 `/model` 命令大修计划的第一阶段。
- **桌面端稳定性改进**：PR [#61956](https://github.com/NousResearch/hermes-agent/pull/61956) 将桌面应用后端探测超时时间从 5 秒延长至 15 秒，以解决因慢速磁盘或缓存冷启动导致的后端启动失败问题，避免了桌面应用的启动死亡循环。
- **Feishu 适配器强化**：多个针对 Feishu 平台的 PR 被提交，标志着项目正系统性提升对该平台的支持。主要包括：
    - PR [#62340](https://github.com/NousResearch/hermes-agent/pull/62340) 实现了对配置文件中 `group_rules` 访问策略的执行，强化了飞书群组的权限控制。
    - PR [#61377](https://github.com/NousResearch/hermes-agent/pull/61377) 修复了 Markdown 表格发送时导致整个消息格式回退为纯文本的问题。
    - PR [#61378](https://github.com/NousResearch/hermes-agent/pull/61378) 解决了在审批流程中忽略 `allow_permanent=false` 配置的问题。
- **关键 Bug 修复**：
    - PR [#62337](https://github.com/NousResearch/hermes-agent/pull/62337) 修复了在 `_ThreadedProcessHandle` 中因 `os.pipe()` 和 `os.fdopen()` 调用失败导致的文件描述符泄漏问题，提升了进程管理的健壮性。
    - PR [#62195](https://github.com/NousResearch/hermes-agent/pull/62195) 修复了无法正确识别由系统服务（如 systemd）管理的网关进程状态问题。
    - PR [#62334](https://github.com/NousResearch/hermes-agent/pull/62334) 纠正了 deepseek-v4-pro 模型在官方定价表中 4 倍高收费的错误。
    - PR [#62329](https://github.com/NousResearch/hermes-agent/pull/62329) 解决了 macOS 桌面端因 `spawn-helper` 文件缺少可执行权限导致终端启动失败的问题。

---

### 4. 社区热点

以下 Issues 和 PRs 在过去 24 小时引发了最为热烈的讨论：

- **头条 Issue：`#52914` [Bug]: fix(qqbot): QQBot adapter.connect() missing is_reconnect parameter causes infinite retry loop**
    - **热度**：17 条评论，6 个 👍
    - **链接**：[https://github.com/NousResearch/hermes-agent/issues/52914](https://github.com/NousResearch/hermes-agent/issues/52914)
    - **核心诉求**：这是一个已经关闭的严重 Bug。由于 QQBot 适配器 `connect()` 方法缺少 `is_reconnect` 参数，导致更新后出现无限重试循环，完全无法连接。尽管已关闭，但其高评论数表明该问题影响了很多用户，社区对即时通讯平台（尤其是中国市场）的稳定性期望非常高。

- **热门功能请求：`#10567` Add --host and CORS config for hermes dashboard**
    - **热度**：13 条评论，13 个 👍
    - **链接**：[https://github.com/NousResearch/hermes-agent/issues/10567](https://github.com/NousResearch/hermes-agent/issues/10567)
    - **核心诉求**：用户希望 Dashboard 能通过 `--host` 参数和可配置的 CORS 规则，允许通过 Tailscale/VPN 等方式在局域网内远程访问，而非仅限于本地。这反映了高级用户对远程管理和多人协作的迫切需求。

- **Provider 扩展诉求：`#13484` Feature: native Google Cloud Vertex AI provider support**
    - **热度**：11 条评论，14 个 👍
    - **链接**：[https://github.com/NousResearch/hermes-agent/issues/13484](https://github.com/NousResearch/hermes-agent/issues/13484)
    - **核心诉求**：社区希望获得对 Google Cloud Vertex AI 的原生支持，而不是依赖于目前不完善的认证机制。该 Issue 获得了很高的点赞数，显示了对 Google 云生态集成的强烈需求，尽管目前已被标记为重复，但情绪依然高涨。

- **争议性 PR：`#49834` feat(mobile): Hermes Agent Android app — Capacitor thin client**
    - **热度**：持续讨论中
    - **链接**：[https://github.com/NousResearch/hermes-agent/pull/49834](https://github.com/NousResearch/hermes-agent/pull/49834)
    - **核心诉求**：这是一个概念性的 Android 客户端草案 PR，讨论了使用 Capacitor 构建轻量级移动端的可能性。虽然尚未准备好合并，但其存在本身就代表了社区对移动端访问方式的浓厚兴趣和探索。

**热点流向分析**：社区热点明显集中于 **基础平台稳定性**（QQ、桌面端）、**远程/移动访问** 以及与主流 **云服务（Google Vertex AI）** 的深度集成。对于影响日常使用的工作流bug（如#52914），社区反应迅速且激烈。

---

### 5. Bug 与稳定性

当日报告的 Bug 数量较多，按影响程度排列如下，并标注是否有现成的修复 PR。

**严重级别：P1 (Critical)**

- **会话状态风险**：
    - `#27038`：Codex Responses API 拒绝重放含有长 `id` 字段的助理消息项，导致会话恢复或继续时失败。等待修复。
        - [Issue 链接](https://github.com/NousResearch/hermes-agent/issues/27038)
    - `#54527`：多 TUI 会话下，网关消息路由错误，导致用户输入丢失。严重影响多任务用户的日常操作。等待修复。
        - [Issue 链接](https://github.com/NousResearch/hermes-agent/issues/54527)
    - `#28156`：Bedrock+Claude 配置向导仅接受 Bearer Token，但运行时因缺少 IAM 凭证而失败；且区域选择器在 EU 地区展示了不可路由的配置文件。等待修复。
        - [Issue 链接](https://github.com/NousResearch/hermes-agent/issues/28156)

**严重级别：P2 (Major)**

- **功能区块/兼容性问题**：
    - `#52914`：**QQBot 无限重试循环** (已关闭，有修复)。
        - [Issue 链接](https://github.com/NousResearch/hermes-agent/issues/52914)
    - `#48098`：桌面端在模型恢复工作后，仍显示过时的“Summarizing thread”状态。影响用户体验。等待修复。
        - [Issue 链接](https://github.com/NousResearch/hermes-agent/issues/48098)
    - `#52496`：Dashboard 的 `/api/model/set` 接口将自定义的 `custom:*` provider 错误地改写为 `openrouter`。有相关修复 PR `#2792` 作为基础。等待进一步修复。
        - [Issue 链接](https://github.com/NousResearch/hermes-agent/issues/52496)
    - `#61265`：向本地模型发送的提示词过于庞大，导致数分钟的卡顿。(需要更多信息，尚无修复)。
        - [Issue 链接](https://github.com/NousResearch/hermes-agent/issues/61265)
    - `#49253`：Photon iMessage 在发送 Markdown 粗体文本时损坏 Unicode 字符。影响非英语用户。等待修复。
        - [Issue 链接](https://github.com/NousResearch/hermes-agent/issues/49253)
    - `#26489`：当 provider 为 `custom` 并使用 LiteLLM 代理时，Hermes 挂起。等待修复。
        - [Issue 链接](https://github.com/NousResearch/hermes-agent/issues/26489)
    - `#10943`：模型在生成代码时频繁达到最大 Token 限制，用户续创后仍会循环报错。等待修复。
        - [Issue 链接](https://github.com/NousResearch/hermes-agent/issues/10943)

**严重级别：P3 (Minor / Enhancement)**

- `#7675`：飞书的卡片交互、审批按钮及流式卡片消息存在多个问题。等待修复。
- `#46947`：无法设置新发邮件的主题，网关甚至硬编码了回复头。有多个微小的PR正在尝试修复该问题，如 `#62330` 等。修复进行中。
    - [Issue 链接](https://github.com/NousResearch/hermes-agent/issues/46947)
- `#15715`：MiniMax VLM 使用了错误的 API 端点。等待修复。
- `#22926`：Kanban 工作进程意外死亡后，任务上的“认领锁”无法自动清理，导致任务永久卡住。等待修复。

**总结**：项目正在经历多个平台（尤其QQ和飞书）和多种Provider（Bedrock, Codex, Custom）的兼容性问题。会话状态管理与消息路由的P1级Bug是当前最大的稳定性隐患。

---

### 6. 功能请求与路线图信号

社区提出的新功能需求主要集中在以下方向，并有部分对应 PR 被提交，可能预示着未来的开发方向：

- **平台扩展**：
    - **远程与本地混合架构** (`#18715`, 8 评论, 20 👍)：支持“远程 Hermes Agent + 本地工具执行”模式。这是社区呼声非常高的需求，暗示着分布式 Agent 架构的探索。
    - **微信多账户支持** (`#7675`, 6 评论)：中文用户的刚需。
    - **WhatsApp 模板消息** (`#45935`, 5 评论, 4 👍)：用于在 24 小时窗口外与客户重联，属于严肃商业场景的需求。
    - **Antigravity 集成 Gemini** (`#52657`, 5 评论, 3 👍)：希望绕过 Google API 直接通过 Antigravity 服务使用 Gemini。
    - **移动端访问** (`#10567`, `#49834`)：远程 Dashboard 访问和 Android 客户端的探索，表明项目正在考虑向移动端渗透。

- **能力增强**：
    - **多Bank路由 (Hindsight Memory)** (`#31776`, 7 评论)：允许为不同场景分配不同的记忆 Bank，是知识管理和个性化服务的高级需求。
    - **通用事件通知系统 (Kanban)** (`#49190`, 5 评论)：将 Kanban 的通知功能解耦为通用的事件订阅系统，允许任意组件订阅事件，并支持多种消息渠道（如 Email、SMS）。
    - **MCP 服务暴露 Memory** (`#10835`, 5 评论)：让其他 MCP 客户端（如 Claude Code）也能共享 Hermes 的记忆。
    - **定价系统增强** (`#9403`, 4 评论)：支持用户自定义定价目录、合同定价和企业级覆盖。
    - **每次 Cron 任务的推理开销控制** (`#23524`, 4 评论)：允许为不同的定时任务单独配置推理努力级别。

- **架构改进**：
    - **浏览器账户隔离** (`[PR#49691](https://github.com/NousResearch/hermes-agent/pull/49691)`)：提出了为不同账户或任务分配独立的浏览器 Profile 的构思，以实现更安全的 Cookie 和会话隔离。
    - **本地沙箱开发脚本** (`[PR#62217](https://github.com/NousResearch/hermes-agent/pull/62217)`)：提供了一个在完全隔离环境中运行桌面端开发的脚本，是优化开发者体验的信号。
    - **读线上游健康诊断** (`[PR#62335](https://github.com/NousResearch/hermes-agent/pull/62335)`)：为 `hermes doctor` 命令增加只读的版本上游健康检查，体现了对项目维护和升级流程的关注。

**路线图信号**：项目路线图似乎正从单纯的聊天机器人向 **Agent 基础设施** 转变。社区对**远程执行、内存管理、复杂事件处理和Platform扩展**的需求强烈，而官方/社区开出的 PR 也正努力填补这些领域的空白。

---

### 7. 用户反馈摘要

从 Issues 评论中，可以提炼出以下典型用户声音和痛点：

- **“升级恐惧症”**：Issue `#52914` （QQBot无限重连）的评论中，用户明确提到“After updating Hermes Agent to the latest version”，表明用户在经历升级带来的不兼容和回归问题后，已产生畏惧心理。**反馈：更新策略需要更安全、可逆，并加强回归测试。**
- **“配置陷阱”**：Issue `#52496` （Dashboard 将 custom provider 改为 openrouter）和 `#28156` （Bedrock 设置向导不完整）的评论显示，用户因配置复杂性导致的“埋坑”问题而感到沮丧。**反馈：配置系统的隐式行为和向导逻辑需要更强的透明度和自检机制。**
- **“语言与地区化”**：Issue `#49253` （iMessage 损坏 Unicode）和 `#54527` （消息路由错误）的评论表明，非英语用户和高级用户在使用复杂功能（如多会话）时更容易遇到 Bug。**反馈：核心功能的国际化和多会话工作流的健壮性是提升全球用户体验的关键。**
- **“被截断的工作”**：Issue `#10943` （中文用户提示“超出最大令牌数量”）反映了模型 Token 上限在长任务场景下的硬限制，用户需要手动续创，工作流体验割裂。**反馈：需要更智能的输出截断管理和自动续写机制。**
- **“安装即劝退”**：Issue `#42972` （Windows 安装失败）直接展示了新用户在 Windows 平台遇到的第一个难关——一个简单的 404 错误即可扼杀潜在用户。**反馈：桌面端安装程序的质量和平台依赖管理（如 npm 源）是首要优化的开发者/用户体验环节。**

---

### 8. 待处理积压

以下是一些长期未关闭但重要的 Issue，可能因其复杂性或低优先级而被搁置，但值得维护团队重新审视：

1.  **`#10567` [Feature] Add --host and CORS config for hermes dashboard (创建于 2026-04-15)**
    - **链接**：[https://github.com/NousResearch/hermes-agent/issues/10567](https://github.com/NousResearch/hermes-agent/issues/10567)
    - **原因**：作为呼声很高的基础功能，已积压近 3 个月。可能因为涉及前后端架构改动且优先级不高而推迟。伴随移动端 PR 的兴起，此问题重要性上升。

2.  **`#13484` [Feature] native Google Cloud Vertex AI provider support (创建于 2026-04-21)**
    - **链接**：[https://github.com/NousResearch/hermes-agent/issues/13484](https://github.com/NousResearch/hermes-agent/issues/13484)
    - **原因**：虽然被标记为重复，但其高点赞数（14个👍）不可忽视。这反映了社区对 GCP 生态的强烈需求。项目应评估是否值得为一个重要的 Provider 提供原生支持。

3.  **`#7675` [Bug] Feishu: Three issues: card interaction handling, approval buttons not working, streaming card reply support (创建于 2026-04-11)**
    - **链接**：[https://github.com/NousResearch/hermes-agent/issues/7675](https://github.com/NousResearch/hermes-agent/issues/7675)
    - **原因**：飞书是重要的企业 IM 平台，此 Issue 汇总了卡片的三大问题。虽然近期有多个 feishu 修复 PR，但不知此复合 Issue 是否已全部解决。

4.  **`#9756` [Feature] Unsupported to the multi accounts of WeChat (创建于 2026-04-14)**
    - **链接**：[https://github.com/NousResearch/hermes-agent/issues/9756](https://github.com/NousResearch/hermes-agent/issues/9756)
    - **原因**：微信多账号是中国市场刚需，此 Issue 已开放近 3 个月。考虑到微信生态的复杂性和政策限制，实现难度较大，但用户呼声真实存在。

**提醒维护者**：请关注上述积压 Issue，尤其是 `#10567` 和 `#7675`，对现有用户满意度和未来市场拓展（如企业客户、远程办公场景）至关重要。

</details>

---
*本日报由 [Big Model Radar](https://github.com/w409401768/big_model_radar) 自动生成。*