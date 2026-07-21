# OpenClaw 生态日报 2026-07-22

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-07-21 22:44 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

好的，这是根据您提供的 OpenClaw 项目 GitHub 数据生成的 2026-07-22 项目动态日报。

---

# OpenClaw 项目动态日报 (2026-07-22)

## 今日速览
项目在过去 24 小时活跃度爆表，Issue 与 PR 双双达到 **500 条/天** 的极高水位，维持着顶级开源社区的热度与开发节奏。核心亮点包括 Dashboard 插件面板、Live Model Discovery 和 Context Engine 超时保护等重大功能改进；但 **P0 级数据库损坏 Bug 的重现** 与 **339 个待合并 PR** 的积压，也暴露出项目在稳定性保障和审查带宽上的严峻挑战。当前无新版本发布，项目正处于功能高速推进与稳定债积累并存的阶段。

## 版本发布
无新版本发布。

## 项目进展
尽管审查存在积压，今日仍有 161 个 PR 被合入或关闭，项目在多个关键领域取得了实质性推进：

- **macOS 隐私合规 ([#112321](https://github.com/openclaw/openclaw/pull/112321), 已合并):** 合入了针对 macOS 平台的隐私敏感操作授权机制。现在敏感功能（如终端、麦克风）需要显式获得用户同意，显著提升了本地安全基线与平台合规性。
- **WorkBoard 与 Dashboard 深度集成 ([#112302](https://github.com/openclaw/openclaw/pull/112302), 已合并):** 正式打通了 WorkBoard 与 Dashboard 的最后一里路，WorkBoard 面板现支持独立路由、侧边栏固定以及自定义图标与颜色，极大增强了插件的交互深度。
- **子代理性能优化 ([#107935](https://github.com/openclaw/openclaw/pull/107935), 已合并):** 通过作用域限制优化了子代理注册表读取，避免了全表反序列化的开销，对高频 `sessions_spawn` 场景有明显性能改善。
- **安全依赖更新 ([#112411](https://github.com/openclaw/openclaw/pull/112411), 已合并):** 刷新了 `fast-uri` 和 `@opentelemetry/propagator-jaeger` 两个生产依赖的高危 CVE 漏洞，加固了运行环境安全。
- **Provider 模型动态发现 ([#112412](https://github.com/openclaw/openclaw/pull/112412), 开放中):** 实现了从活 Provider 目录动态发现模型的能力。用户再无需等待项目发布静态目录更新来使用新模型，极大提升了大型模型平台的接入体验。这是一个路线图级别的改善。
- **会话观察者 HUD ([#112260](https://github.com/openclaw/openclaw/pull/112260), 开放中):** 为 Web UI 增加了实时状态悬浮窗（HUD）、侧边栏摘要和设置界面，增强了长会话的透明度和用户对后台进程的控制力。
- **Cron 目标路由修复 ([#112429](https://github.com/openclaw/openclaw/pull/112429), 已合并):** 修复了 Cron 交付目标规范化后丢失语义前缀（如 `user:<id>`）的问题，确保了 Slack 等渠道消息的正确投递。

## 社区热点
社区讨论高度集中在**安全性**、**可靠性**和**平台扩展**三大主题上，充分反映了用户从“能用”到“用好、用安全”的需求升级。

1. **最受关注的 Feature Request：**
   - **Telegram Business 支持 ([#20786](https://github.com/openclaw/openclaw/issues/20786), 6 👍):** 用户迫切需要 OpenClaw 接入 Telegram Business API，以接收来自个人商业聊天的消息。这表明 OpenClaw 正在被重度用户用于实际业务场景。
   - **Antigravity CLI 适配 ([#84527](https://github.com/openclaw/openclaw/issues/84527), 11 👍):** Google Gemini CLI 即将停用，社区非常焦虑，强烈要求 OpenClaw 快速适配新的 `agy` CLI。这是今日**点赞数最高的 Issue**，需求非常紧迫。

2. **讨论最深入的技术 Bug：**
   - **MCP 工具未注入子代理 ([#85030](https://github.com/openclaw/openclaw/issues/85030), 11 评论, 5 👍):** 用户 @reidperyam 对 MCP 工具 Schema 无法注入子 Agent 的问题进行了详尽分析。这也是复杂 Agent 网络用户的共同痛点，讨论热度极高。
   - **Masked Secrets 功能 ([#10659](https://github.com/openclaw/openclaw/issues/10659), 15 评论, 4 👍):** 作为今日评论数最多的 Issue，社区对“代理只能用而不能看 API Key”的机制非常感兴趣，这与近期 AI 安全领域的 Prompt Injection 防御趋势高度吻合。

## Bug 与稳定性
今日报告的 Bug 和回归问题严重性较高，本地模型生态和数据完整性问题尤为突出。

**P0 级（数据灾难）：**
- **[#101290](https://github.com/openclaw/openclaw/issues/101290) CLI 启动预检导致 SQLite 数据库损坏 | macOS:** 用户报告在 macOS 上 5 天内数据库损坏 4 次。这是项目当前最严重的稳定性危机，目前无修复 PR 认领。

**P1 级（安全与功能阻断）：**
- **[#88562](https://github.com/openclaw/openclaw/issues/88562) models.json 生成器以明文写入 API Key:** 一个极其危险的安全 Bug。配置生成器将 `apiKey` 以明文写入，绕过了项目中已有的 Secret-Ref 机制，可能导致凭证在环境中泄露。
- **[#108473](https://github.com/openclaw/openclaw/issues/108473) cron 工具 Schema 破坏 llama.cpp 工具调用:** 最新版引入的回归问题，非锚定正则 `pattern` 导致本地模型完全无法使用 cron 工具。
- **[#106779](https://github.com/openclaw/openclaw/issues/106779) 2026.7.1 版本导致本地 llama.cpp 解析失败:** 本地模型用户在升级后遭遇 400 错误，`llama.cpp` 解析器出现兼容性问题。
- **[#90840](https://github.com/openclaw/openclaw/issues/90840) 子代理将原始工作输出发送给用户:** 一个严重的信息安全问题，子代理的原始输出（可能包含敏感内部调试信息）被直接推送到终端用户会话中。
- **[#53408](https://github.com/openclaw/openclaw/issues/53408) 长对话后工具参数静默丢失:** 涉及数据完整性的隐性 Bug，`write` 和 `exec` 工具在长上下文中会静默丢弃参数，存在破坏用户数据的风险。

**关键修复 PR 状态：**
- **[#97175](https://github.com/openclaw/openclaw/pull/97175) Context Engine 超时保护** 和 **[#89040](https://github.com/openclaw/openclaw/pull/89040) 规避嵌入式 Event Loop 阻塞** 均处于 `ready for maintainer look`，若能及时合入，将有效缓解会话卡死和消息丢包问题。

## 功能请求与路线图信号
从数百条 Issue 中可以看出，用户群体正在推动 OpenClaw 向 **企业级安全基线和可维护性** 升级。

1. **安全体系重构（核心信号）：**
   - **Masked Secrets / 文件沙箱 / 权限 Manifest / 能力权限模型 ([#10659](https://github.com/openclaw/openclaw/issues/10659), [#7722](https://github.com/openclaw/openclaw/issues/7722), [#12219](https://github.com/openclaw/openclaw/issues/12219), [#12678](https://github.com/openclaw/openclaw/issues/12678)):** 社区正在系统性地构建纵深防御体系。这些需求覆盖了凭证隔离、文件访问控制、Skill 权限声明和运行时拦截，暗示项目可能很快会推出统一的“安全模型 2.0”路线图。

2. **可扩展性与开发者体验：**
   - **Plugin 热重载 ([#14438](https://github.com/openclaw/openclaw/issues/14438), 4 👍):** DIY 开发者的核心痛点，当前迭代插件需要重启容器，严重拖慢了开发周期。
   - **会话快照 / 备份恢复 / AWS 部署指南 ([#13700](https://github.com/openclaw/openclaw/issues/13700), [#13616](https://github.com/openclaw/openclaw/issues/13616), [#13597](https://github.com/openclaw/openclaw/issues/13597)):** 这些需求共同指向了用户希望 OpenClaw 具备真正生产级 SRE 能力的诉求。

3. **Agent 编排能力深化：**
   - **子 Agent 工具限制 / 群组会话合并 / `wakeOnReply` 机制 ([#15032](https://github.com/openclaw/openclaw/issues/15032), [#7524](https://github.com/openclaw/openclaw/issues/7524), [#112388](https://github.com/openclaw/openclaw/pull/112388)):** 用户在追求更复杂、更精细的 Agent 拓扑控制，要求项目提供原生支持，而非通过 Hack 方式实现。

## 用户反馈摘要
- **满意度高（功能创新）：** 用户对 Dashboard 和 WorkBoard 的整合、Live Model Discovery 的尝试表达了高度期待。开发者 DanBotero、steipete 等人的工作获得了隐性的高频关注。
- **强烈不满（稳定性与兼容性）：** 本地模型用户对环境感到了疏离。`#106779` 和 `#108473` 中充满了对新版升级后无法使用 `llama.cpp` 的抱怨。`#101290` 的用户报告语气非常紧张，因为数据损坏严重影响了其关键服务。
- **深度技术抱怨（架构问题）：** `#85030`（MCP注入失败）和 `#53408`（参数静默丢失）的非常详细的反馈，显示出用户群体高度技术化，他们对问题的根本原因有深刻理解，并期待社区给予同样深度的重视。
- **未被满足的安全期待：** 用户 @mnowrot 在 `#88562` 中指出配置安全问题时的语气透露出失望，因为项目已经有 Secret-Ref 架构，但生成器却没有遵循，说明在工程实践中“安全最后一公里”的问题尚未解决。

## 待处理积压
以下为长期未决或影响巨大的 Issue/PR，提醒维护者和 PMC 重点关注：

1. **🔥 数据库损坏危机 ([#101290](https://github.com/openclaw/openclaw/issues/101290), P0, 2026-07-07):** 项目最高优 Bug。用户正在遭受数据丢失，目前处于无人认领状态。**建议 PMC 立即升级干预，指定负责人修复。**
2. **🔑 明文 API Key 泄露风险 ([#88562](https://github.com/openclaw/openclaw/issues/88562), P1, 2026-05-31):** 安全红线问题。虽然被标记为 P1，但其敏感度极高，建议尽快修复。
3. **📦 MCP 生态核心缺陷 ([#85030](https://github.com/openclaw/openclaw/issues/85030), P1, 2026-05-21):** MCP 是 OpenClaw 的差异化核心，该 Bug 阻塞了子 Agent 使用任意 MCP 工具，严重影响生态扩展。
4. **🧩 文件沙箱等待决策 ([#7722](https://github.com/openclaw/openclaw/issues/7722), P2, 2026-02-03):** 存在近半年，长期挂在 `needs-product-decision`。如果安全是路线图重点，这个请求不应该被无限期搁置。
5. **⏳ Google Vertex AI 整合积压 ([#87800](https://github.com/openclaw/openclaw/pull/87800), 2026-05-28):** PR 已准备好并被标记为 `ready for maintainer look` 接近两个月，开发者 @koverholt 的工作等待最终审核合入。
6. **🧠 内存架构重写搁浅 ([#88504](https://github.com/openclaw/openclaw/pull/88504), 2026-05-31):** 这是一个 XL 级别的 PR，旨在重构记忆插件为多槽位架构。由于缺乏运行证据（`needs proof`），迟迟未能合入。考虑到记忆是 OpenClaw 旗舰功能，该 PR 值得投入更多资源完成验收。

---

## 横向生态对比

# 个人 AI 智能体开源生态横向对比分析报告（2026-07-22）

**分析师：资深 AI 智能体与个人 AI 助手技术分析师**  
**数据覆盖日期：2026-07-22**

---

## 1. 生态全景

2026 年 7 月中旬，个人 AI 智能体开源生态正处于 **“功能高速扩张与生产级稳定筑基”** 的激烈碰撞期。六大核心项目均保持极高甚至爆表的活跃度，单日合计产生逾 **1,400 条 Issue/PR 更新**，这反映了全球开发者对自主 Agent 框架的热情已从“尝鲜”进入“深度落地”阶段。与此同时，**安全边界逃逸、数据损坏、会话可靠性**等生产级事故高频率爆发，表明生态正从“能跑就行”向“能安全、可靠、可观测地跑”进行艰难跃迁。安全合规、Plugin 平台化、多 Agent 编排、以及跨平台体验成为所有项目共同的下一个战场。

---

## 2. 各项目活跃度对比

| 项目 | 日更新 Issues | 日更新 PRs | 合并/关闭 PRs | 本日 Release | 健康度评估 |
|------|-------------|----------|------------|-----------|---------|---|
| **OpenClaw** | ~500 | ~500 | 161 | 无 | 高活跃但稳定债严重（P0 数据库损坏、339 积压 PR） |
| **Zeroclaw** | 50 | 50 | 9 | 无 | 变革期高压力，S0 安全漏洞集中爆发 |
| **PicoClaw** | 8 | 8 | 3 | 无 | 中等偏积极，Antigravity 响应快，但安全替换（libolm）长期停滞 |
| **QwenPaw** | 41 | 46 | 27 (59%) | **v2.0.1-beta.1** | 快速修复冲刺，架构重构大规模落地，但 P0 性能回归未解 |
| **hermes-agent** | 313 | 500 | 116 | 无 | 演进最激进，384 待合并 PR 存在合并瓶颈 |
| **AstrBot** | 总更新 19 | 11 待合并 | 1 | 无 | 高度活跃但 PR 合并率极低，核心依赖锁定阻塞 4 个月 |

> **注：** OpenClaw 与 hermes-agent 以超高原始 PR/Issue 量构成生态第一梯队，但两者的未处理积压也最为严峻。QwenPaw 合并率最高（59%），管线效率领先。

---

## 3. OpenClaw 在生态中的定位

**社区规模与知名度：**  
OpenClaw 是当前生态中 **最受瞩目的参照级项目**（报告原文冠以“核心参照”），其日更 500+ 条 Issue/PR 的数据在所有项目中与 hermes-agent 并列第一，社区热度属于绝对头部。

**技术路线优势：**
- **MCP 生态深度绑定：** 率先实现 Live Model Discovery、动态 Provider 发现，确保大型模型平台的对接灵活性，这是其差异化壁垒。
- **Dashboard/WorkBoard 插件面板：** 将可视化操作与可编程 Agent 编排深度整合，降低运维门槛。
- **企业级安全信号明确：** Secret-Ref、Masked Secrets、文件沙箱、权限 Manifest 等系列 RFC 形成体系化安全路线（安全模型 2.0），在同类中最系统。

**竞争短板：**
- 稳定性危机最突出：P0 数据库损坏 4 次/5 天，且无人认领；339 个 PR 积压是生态中最高的绝对积压量，可能拖垮贡献者信心。
- 安全“最后一公里”失守：API Key 明文写入生成器的 P1 安全线被社区用户用**失望的语气**指出。

**与同类对比：**
- 相较 **hermes-agent**，OpenClaw 在 Plugin 深度（Dashboard 集成）和模型发现机制上更胜一筹；hermes-agent 则更强调 Desktop 原生体验和主题 SDK 统一。
- 相较 **Zeroclaw**，OpenClaw 功能面更宽，但 Zeroclaw 在 Rust 类型安全、Eval 评估基建上更早期布局，且后者的 Goal Mode 自主目标是“长期 Agent”赛道最领先的设计。
- 相较 **QwenPaw**，OpenClaw 无显式的多 Agent 工作流（OMP），但在单 Agent 灵活度（子 Agent 拓扑、工具注入）上更具深度。

**总结定位：** OpenClaw 是生态中 **功能最全面、MCP 结合最紧密、安全路线最体系化** 的平台型项目，但它的最大敌人不是竞品，而是自己快速膨胀的技术债。

---

## 4. 共同关注的技术方向

下表列出跨 2 个及以上项目同时涌现的高频诉求，注明涉及项目：

| 技术方向 | 具体诉求 | 涉及项目 | 热度信号 |
|---------|---------|---------|---------|
| **凭证/权限安全加固** | 密钥掩码、白名单绕过、明文泄露、文件沙箱 | **OpenClaw**（#10659、#88562）、**Zeroclaw**（#8279、#9247）、**PicoClaw**（#3088）、**hermes-agent**（#54675） | 多项目出现 S0/P0 级别安全 Bug，表明安全已成所有项目首要短板 |
| **插件/技能生态标准化** | Plugin 热重载、生命周期钩子、社区索引、独立日志 | **OpenClaw**（#14438）、**Zeroclaw**（#8309、#8638）、**hermes-agent**（#64182 系列）、**AstrBot**（#9342） | Plugin 平台化从“愿望”变为路线图标配 |
| **上下文/记忆健壮性** | 上下文污染修复、记忆后端可配置、超时保护、收敛压缩 | **OpenClaw**（#101290、#112302、#97175）、**QwenPaw**（#6299、#6068）、**hermes-agent**（#47349）、**AstrBot**（#9340 上下文重构） | 数据完整性成为生产级部署的“必须过关” |
| **会话与多端一致性** | 跨平台 Session 共享、Desktop/TUI/CLI 路由、移动端适配 | **hermes-agent**（#38602、#68358）、**OpenClaw**（#7524 群组合并）、**QwenPaw**（#6281）、**AstrBot**（#9345 指令白名单） | 用户场景从单终端走向统一多端体验 |
| **多 Agent 编排与控制** | 子 Agent 工具限制、Goal Mode 预算/暂停、OMP 工作流、wakeOnReply | **OpenClaw**（#15032、#112388）、**Zeroclaw**（#8303, #8687）、**QwenPaw**（#5882 OMP）、**hermes-agent**（#13332 预选） | 从单一聊天 Agent 向“自主任务编排平台”演进 |
| **评估/衡量框架** | Eval 基准、法官校准、记忆评分 | **Zeroclaw**（#9244、#9245、#9248）、**OpenClaw**（间接路线）、**QwenPaw**（隐性需求） | 标志行业从“写了多少功能”进入“能力如何衡量”阶段 |
| **成本与 token 管控** | 混合工具预选、Prompt Cache 优化、fallback 链 | **OpenClaw**（#84527 CLI 切换）、**hermes-agent**（#13332、#56776 Cache 零命中）、**PicoClaw**（#3200 fallback 链）、**QwenPaw**（#6258 max_tokens 不生效） | 用户对 API 成本高度敏感，企业部署刚需 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Zeroclaw | PicoClaw | QwenPaw | hermes-agent | AstrBot |
|------|----------|----------|----------|---------|--------------|---------|
| **目标用户** | 企业/重度开发者，需 MCP 深度集成与复杂编排 | 安全敏感的高级开发者，关注自治 Agent 与评估 | 多平台聊天机器人开发者，侧重嵌入式/边缘（Sipeed） | 多 Agent 工作流用户，需强治理与可观测性 | 个人开发者/Desktop 重度用户，侧重 Plugin 扩展 | 中文社区/多平台 Bot 入门者，偏重易用性和插件 |
| **核心技术栈** | Node.js/TS，MCP 原生 | Rust，类型安全，Goal Mode | 未明（推测 Rust/Go），多 Channel 优先 | Python（Agentscope），OMP 多 Agent 模式 | 未明（CLI/TUI/Desktop 三端覆盖），Plugin SDK | Python，侧重轻量、适配 QQ/Telegram/微信 |
| **架构定位** | **“Agent 运行平台”**——插件化 Dashboard+深度 MCP | **“自主 Agent 引擎”**——Goal Mode + Eval + 安全基座 | **“消息通道路由器”**——Channel 适配最强（Telegram/Matrix/钉钉/飞书） | **“多 Agent 协作框架”**——OMP 工作流 + ACP 治理 | **“全端 Agent 操作系统”**——统一主题 SDK + Desktop 原生 | **“聊天 Bot 中间件”**——多消息源与插件快速接入 |
| **差异化杀手功能** | Live Model Discovery，WorkBoard 面板，Secret-Ref | Goal Mode 预算/暂停，Eval 法官校准，Wire Protocol | 飞书音视频原生，策略化系统执行，libolm→vodozemac（推进中） | AIOnly 内置 Provider，工具治理重构，会话级模型覆盖 | Plugin 接口大扩张，Desktop 瘦客户端，跨端主题 SDK | 指令级白名单，Fish Audio TTS，Codex Router |
| **安全侧重** | 权限体系化（Manifest+沙箱） | 边界硬隔离（Shell/Delegate） | 依赖替换（libolm→vodozemac） | 工具注册治理 + 安全检查模块 | Token 隔离 + 媒体黑名单 | 暂弱（但需指令白名单加强） |
| **当前最大风险** | 数据损坏无人认领 + 339 积压 PR | S0 漏洞（符号链接逃逸）+ Goal Mode 沟通断档 | libolm 替换 6 周停滞 + Matrix 重连缺失 | v2.0 性能回归 P0 + 会话数据污染 | Desktop 首条无响应 + 384 待合并 PR 阻塞贡献 | 核心依赖锁定积压 4 个月 + 平台适配 Bug 割裂 |

---

## 6. 社区热度与成熟度分层

**第一梯队：极速迭代但稳定债过重（OpenClaw、hermes-agent）**
- **特征：** 日 PR/Issue 更新 300-500，核心功能每周都有里程碑式合并，社区规模巨大，但待处理积压同样令人担忧（均超 300 项）。
- **成熟度评估：** 仍在“做大”阶段，尚未进入系统性“做稳”。OpenClaw 的数据库损坏和 hermes-agent 的 Desktop 基础故障说明核心稳定性测试未跟上迭代速度。

**第二梯队：高活跃 + 架构重构冲刺（QwenPaw、Zeroclaw）**
- **特征：** 日更新 40-50，合并效率较高（QwenPaw 约 60%），均处于架构级重构或新范式落地期（OMP、Goal Mode、Eval）。
- **成熟度评估：** 比第一梯队更注重质量，QwenPaw 急发 beta 补丁，Zeroclaw 虽然出现 S0 但社区正在推动安全审计闭环。两个项目都在“做稳”与“做大”之间找平衡。

**第三梯队：中等规模但短板突出（PicoClaw、AstrBot）**
- **特征：** 日更新 8-19，活跃度中等，Bug 响应较快（尤其是 Antigravity 系列），但关键基础组件长期搁置（libolm 替换、核心依赖锁定）。
- **成熟度评估：** 社区贡献者积极但维护者带宽有限，积压可数但影响严重。它们更贴近特定场景（边缘硬件、中文聊天）用户，虽然规模较小，但用户需求垂直且坚韧。

---

## 7. 值得关注的趋势信号

1. **“安全 2.0”从可选项变成入场券：** 多项目同期出现 S0/P0 级安全 Bug，社区反馈中失望语气居多。未来 Agent 框架必须内置权限模型（如 OpenClaw Manifest、Zeroclaw 边界隔离），凭证写入、文件逃逸等低级失误将直接导致项目口碑崩盘。

2. **Agent 从“聊天”走向“自主任务”：** Goal Mode（Zeroclaw）、OMP 工作流（QwenPaw）、Plugin 平台（hermes-agent）不约而同将 Agent 从被动问答转向“持久化、有预算、可恢复”的自主执行。**具备暂停/恢复/预算耗尽处理的生产级自治机制**将是下一轮竞争分水岭。

3. **评估与度量正在成为新基建：** Zeroclaw 三天内密送 3 个 Eval 框架 PR，标志着行业进入“可量化可信度”时代。任何宣称生产就绪的 Agent 框架未来都需要配套 benchmark + 回归 Eval 能力。

4. **Plugin 生态步入平台化：** hermes-agent 发起的 Plugin 大讨论（生命周期、中间件、社区索引）与 OpenClaw 的 Dashboard 插件化不谋而合。标准化 Plugin SDK 将决定项目能否吸引第三方贡献者形成网络效应。

5. **成本透明化诉求强烈：** 用户不再接受黑盒 token 浪费，hermes-agent 的零命中 Cache 投诉、多项目的 fallback 链配置与工具预选机制，都指向**框架需要提供可配置的成本优化能力**，否则将流失至商业化 PaaS。

6. **移动端是下一增长极：** QwenPaw、hermes-agent、AstrBot 同时出现移动端或瘦客户端需求。Desktop 当前仍是主力开发端，但个人 AI 助手若不能覆盖手机场景，将始终停留在“开发者玩具”阶段。

7. **新用户首次体验决定留存：** AstrBot 的表情误唤醒、Zeroclaw 的 Telegram 配置失败、hermes-agent 的 Desktop 首条无响应——这些看似小的问题在多个项目中出现，表明**“开箱即用”的平稳性已成为用户放弃与否的隐性标准**。建议所有项目设立“新手 5 分钟黄金路径”QA 检测点。

---

**结论：** 个人 AI 智能体生态正处于“规模爆发”到“质量沉淀”的过渡期。短期应优先补安全与基础稳定性短板，中期着力 Plugin 生态与多 Agent 编排能力，长期需以 Eval 和成本管控赢得生产级信任。OpenClaw 和 hermes-agent 最有可能定义行业路由，但前提是必须先解决自身积压与稳定性危机。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 (2026-07-22)

---

## 1. 今日速览

过去 24 小时内，项目迎来极高强度的活跃期：共 50 条 Issue 更新、50 条 PR 更新。**核心主线围绕三大方向：Security 安全审计、Goal Mode 自主目标大重构、以及 Eval 评估基建初建。** 用户社区同步爆发了多例 S0 级安全风险报告（Shell 边界逃逸、Delegate 权限绕过），表明 ZeroClaw 正在经历早期生产级用户的压力测试。功能开发的激进程度与安全技术债的累积速度正在赛跑，项目健康度处于"高活跃、高压力"的变革期。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

过去 24 小时共合并/关闭 9 个 PR，同时多名贡献者集中推入新课题：

- **SOP 路由修复已合入**：`#9183` 修复了顶级 `when` 条件为假时，switch 依然会被错误评估的 SOP 执行逻辑缺陷。
- **ZeroCode 面板增强**：`#9011` 合入，现在 Dashboard 可以直接显示所连接的 daemon 上下文、版本、配置等关键运行时信息。
- **CI 与跨平台**：`#9055` 使文档翻译过程可复现固定；`#8756` 修复 Windows 上附件标记测试的兼容性。
- **Eval 评估框架急行军（关键里程碑信号）**：`@IftekharUddin` 在同一时间段密集提交了 3 个 Eval 相关 PR（`#9244`、`#9245`、`#9248`），引入了序列内记忆评分、法官校准工具链和运行历史收据体系。**这标志着 ZeroClaw 正从"写代码"阶段进入"系统性衡量能力"的成熟度跃升阶段。**
- **Mattermost WebSocket 模式开发完成**：`#7082` 关闭，频道能力矩阵进一步补齐。

**整体向前跨越评估：** 虽然 Goal Mode、Skills 重构等重型 PR 仍在审查栈中，但小步快跑的日常合并节奏未断，项目核心管线保持畅通。

---

## 4. 社区热点

| 排名 | Issue/PR | 核心诉求 | 热度信号 |
|------|----------|----------|----------|
| 1 | `#8505` (Bug) Telegram 通道配置失败 | 快速部署受阻，Bot 无响应 | **S1 级严重性** + 6 条评论，社区强烈要求修复入门体验。已由 `#9242` 文档修复跟进。 |
| 2 | `#8226` (Feature) 类型化 Agent Git 身份 | 多租户场景下身份、密钥隔离 | 6 条评论，引发关于 `runtime_context` / `runtime_secrets` 架构的热烈讨论。 |
| 3 | `#8303` (RFC) Goal Mode 自主目标模式 | 用户需要持久化、有成本预算的 Agent 自主执行。 | 4 条评论 + 1 点赞，评论区出现了对**预算耗尽、暂停恢复、分步目标分解**等生产级细节的深度诉求。 |
| 4 | `#8603` (RFC) OpenAI Chat 兼容层 | 用户希望让 Open WebUI/LobeChat 接入 ZeroClaw | 4 条评论，生态集成方向共识极高，已标记为 In-Progress。 |
| 5 | `#8600` (Feature) 多模型间简易切换 | 用户期望像 moltis 一样在 Provider 下自由选择模型 | 3 条评论 + 1 点赞，用户 @vvuk 给出了具体的使用对比，需求明确。 |

**分析：** 社区核心诉求高度集中于 **1) 生态打通（Telegram/OpenAI API）；2) 安全管理（身份、权限）；3) 自主任务能力（Goal Mode）。** 这三条诉求本质上都在问同一个问题："ZeroClaw 能安全地为我独立干活吗？"

---

## 5. Bug 与稳定性

按严重程度排列：

**S0 - 数据泄露 / 安全风险 (最高)**
- `#9247` **Shell 工具工作区边界绕过** (新开)：工作区内的符号链接可读写外部文件，几乎无门槛的 OOB 攻击面。**暂无关联修复 PR，需立即评估。**
- `#8279` **Delegate 绕开父级工具白名单** (P1, Accepted)：子 Agent 可调用父策略排除的工具。已有安全架构改进讨论，但尚未合入。
- `#9240` **`save_dirty()` 静默丢弃含点号的 Map Key** (新开)：`gpt-4.1`、`claude-3.5-sonnet` 等模型 ID 无法写入。影响所有自定义模型配置的用户，返回成功但实际上丢数据。

**S1 - 工作流阻塞**
- `#8505` **Telegram 通道无法配置** (P1, 已有 `#9242` docs 修复)
- `#8718` **`zeroclaw config init` 生成的配置被 Daemon 拒绝** (P1)：新安装用户的 Whisper 转录功能被静默禁用。

**S2 - 行为降级**
- `#8642` **MCP 工具模式克隆导致 RSS 无限制增长** (P1, In-Progress)：从 OOM 根因中拆分的小时级内存泄漏追踪。
- `#8731` **Stdio MCP 服务器累积为僵尸进程** (P1, In-Progress)：daemon 下僵尸进程堆积，影响长时间运行稳定性。
- `#8615` **兼容 Provider 静默删除 `<think>` 标签** (P2)：用户无形中丢失对话内容，后果隐蔽。
- `#8834` **`config set` 无法在非 provider 段创建新别名** (P2)：CLI 配置能力缺陷。

**稳定性综合预警：** S0 级别 Bug 在 24 小时内连续出现 3 例，**安全验证缺口值得高度重视。** 配置相关（静默失败、语法兼容）Issues 密集爆发，建议下一个 Patch 版本集中解决。

---

## 6. 功能请求与路线图信号

**极有可能纳入下个里程碑（已有配套 PR 在途）：**

| 方向 | RFC/Issue | 对应 PR | 状态 |
|------|-----------|---------|------|
| **Goal Mode 自主目标** | `#8303` | `#8687` `#8688` `#8689` `#8746` `#8996` | In Progress (Needs author action) |
| **Eval 评估框架** | `#9228` | `#9244` `#9245` `#9248` | 新提交，活跃开发中 |
| **OpenAI Chat 兼容层** | `#8603` | — | In Progress |
| **Telegram 文档/可用性** | `#8505` `#8810` | `#9242` | 已提交 docs 修复 |
| **技能源替代（去 ClawHub）** | `#8309` | `#8638` | Needs author action |

**需求强烈但尚未明确排期：**
- `#8568` **Mixture-of-Agents 虚拟模型 Provider**：创新的模型仲裁机制，可能成为竞品差异化功能。
- `#8780` **Gemini Live 实时语音通道**：紧跟多模态浪潮。
- `#8348` **Skill CRUD 变更事件钩子**：外部系统集成需求。
- `#8396` **Wire Protocol 一等公民化 RFC**：若落地将彻底解耦 Provider 与运行时，但架构风险极高。

**路线图信号：** Eval 框架的突然加码可能意味着 ZeroClaw 正在筹备一个能力基准测试（类似 GAIA/Benchmark），或用做内部回归校验，这对企业级信任建设至关重要。

---

## 7. 用户反馈摘要

**正面评价：**
- **功能完整性获认可**：用户 @vvuk 在 `#8600` 中对比 moltis 后评价："大部分我所用的能力在 ZeroClaw 都有了，只差一点。" 功能广度不再是被迁移的瓶颈。
- **技术选型坚挺**：即使文档出错的反馈中，用户 @cr3a7ure 仍表示："欣赏你们用 Rust 实现 Agent 的选型与类型安全。"

**核心痛点：**
- **新手引导失能**：Telegram 设置了不响、语音转录静默失效、配置模板被 Daemon 拒收…… **多起 Issue 反应的是 "第一次接触 ZeroClaw 无法获得正反馈" 的系统性问题。**
- **静默失败是最糟糕的失败**：`#8615`（内容被删掉）、`#8718`（功能被禁但无报错）、`#9240`（配置写下去了但读不出来）。用户反复表达对"静默失效"的深度不信任。
- **安全信任门槛**：S0 级别的漏洞（边界逃逸、权限绕过）正在消解开发者对 Agent 框架的信任基础。用户 @wangmiao0668000666 在 `#8279` 进行的代码级还原分析，代表了高级用户对安全质素的极高要求。

---

## 8. 待处理积压（需维护者重点关注）

| 优先级 | 条目 | 已搁置时长 | 原因与影响 |
|--------|------|-----------|------------|
| **P-CRITICAL** | **S0 安全 Bug** (`#8279`, `#9247`, `#9240`) | 新发/数周 | 积累中，影响社区对生产环境的信心。 | 
| **P-HIGH** | **`#8309` SkillForge 悬浮争议** | 自 06-25 (27天) | 核心功能组件合入后与主体现状完全脱节，是放是删需架构决策。 | 
| **P-HIGH** | **`#8638` 去 ClawHub 化** | 自 07-03 (19天) | `needs-author-action`，技能生态路线依赖该决议。 | 
| **P-HIGH** | **Goal Mode PR 栈 (vrurg)** (`#8687`, `#8689`, `#8746`, `#8996`) | 均被标注 `needs-author-action` | 项目的最大功能里程碑，大量高频反馈等待作者响应，若沟通断档可能导致这次大重构搁浅。 |
| **P-MEDIUM** | **`#8396` Wire Protocol RFC** | 自 06-27 (25天) | 前瞻性架构 RFC，参与讨论方较多但推进缓慢。 | 
| **P-MEDIUM** | **`#8838` SSE 空闲断流修复** | 自 07-08 (14天) | 影响多 Provider 的流式稳定性，等待作者操作。 | 

**维护者行动建议：** 建议下个冲刺周期以**安全补丁（S0）+ 新手上路（Telegram/Config）** 作为 P0 目标，在快速迭代功能的同时修复信任裂痕，避免用户流失。SkillForge 的去留需要尽快明确，以清理社区对新 Skill 系统的预期。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目动态日报**
**日期：2026-07-22**（数据覆盖 2026-07-21 更新）

---

## 1. 今日速览
过去 24 小时项目出现 8 条 Issue 更新和 8 条 PR 更新，活跃度较高。4 个 Issue 新开/活跃，4 个已关闭；PR 方面 5 个待合并、3 个已合并/关闭。社区围绕 Antigravity 提供商的 OAuth 与回归问题快速行动（#3278 关闭，#3274 关闭，#3280 新开修复）。同时，Matrix 同步断开无重连（#3203）、Web UI 长对话卡顿（#3281）等稳定性/性能 Bug 被报告。功能方面，策略化系统执行（#3282）已合并，可配置默认 fallback 链（#3200）等 PR 正在推进。整体看，维护者响应及时，但高优先级的 libolm 替换（#3088）仍处于停滞状态。

---

## 2. 版本发布
无新版本发布。

---

## 3. 项目进展
今日 **3 个 PR 被合并/关闭**，对项目有实质性推进的包括：

- **#3282 feat(nodes): add policy-gated system exec**  
  为节点配套增加策略管控的系统调用功能，通过配置文件控制执行权限、工作目录、超时等，提升安全性与可控性。  
  [PR #3282](https://github.com/sipeed/picoclaw/pull/3282)

- **#303 fix: make bot greeting name configurable via bot_name setting**  
  解决 Telegram `/start` 问候及钉钉回复标题硬编码为 “PicoClaw” 的问题，新增 `bot_name` 配置项，支持自定义身份，增强个性化。  
  [PR #303](https://github.com/sipeed/picoclaw/pull/303)

此外，#3233（修复后向兼容性）也已完成关闭。

同时，**5 个 PR 仍在待合并状态**，表明项目正在积极修复和增强：
- #3256 飞书音视频原生消息类型支持  
- #3228 Anthropic 提供者系统缓存块支持  
- #3200 模型默认 fallback 链配置  
- #3280 OAuth 登录流程可靠性修复  
- #3279 Seahorse 工具调用格式泄漏修复  

这些 PR 全部在 7 月 21 日有更新，其中 #3280、#3279 为新提交，其余已有一定周期但仍处于审核中。

---

## 4. 社区热点
- **#3088 [Feature] 使用 vodozemac 替换 libolm**  
  评论 9 条，👍 2 个。社区持续呼吁移除不再维护且存在安全风险的 libolm 库，改用官方后继库 vodozemac。虽标记为 `priority: high` 并已有实施思路，但过去 6 周进展缓慢，项目需要确认是否将此纳入路线图。  
  [Issue #3088](https://github.com/sipeed/picoclaw/issues/3088)

- **#3203 [BUG] Matrix 同步循环无重连机制**  
  评论 4 条，👍 1 个。Matrix 用户在网络中断或服务重启后长轮询永久死亡，且因主进程存活导致 systemd 无法自动重启，严重影响可靠性。用户期望加入自动重连逻辑。  
  [Issue #3203](https://github.com/sipeed/picoclaw/issues/3203)

这两个 Issue 共获得最多讨论与关注，反映出用户在**安全性**和**通道健壮性**方面的强需求。

---

## 5. Bug 与稳定性
按严重程度排列：

| 严重度 | Issue | 状态 | 摘要 |
|--------|-------|------|------|
| **高** | [#3203 Matrix /sync 无重连，网络中断后静默死亡](https://github.com/sipeed/picoclaw/issues/3203) | 开放 | 核心通道可靠性缺陷，无自动恢复机制。尚未分配修复。 |
| **高** | [#3281 Web UI 长对话输入框严重卡顿](https://github.com/sipeed/picoclaw/issues/3281) | 开放 | 会话历史较长时输入延迟明显，影响日常使用。新报告，未有评论。 |
| **中** | [#3255 钉钉聊天列表预览始终显示固定“PicoClaw”文字](https://github.com/sipeed/picoclaw/issues/3255) | 开放 | 列表预览未使用实际回复内容，仅显示机器人名称，降低体验。已有清晰复现步骤。 |
| **已解决** | [#3274 Antigravity 提供者回归：INVALID_ARGUMENT 错误（main 分支）](https://github.com/sipeed/picoclaw/issues/3274) | 已关闭 | v0.3.1 正常版本行为在最新构建中失效。已修复。 |
| **已解决** | [#3278 Antigravity OAuth 被 Google 拦截](https://github.com/sipeed/picoclaw/issues/3278) | 已关闭 | 登录流程不符合 Google OAuth 2.0 安全策略。已随修复关闭。 |
| **已解决** | [#3153 火山引擎工具调用泄漏为原始 `<seed:tool_call>` 文本](https://github.com/sipeed/picoclaw/issues/3153) | 已关闭 | tool call 格式泄漏至用户消息，影响对话连贯性。已关闭。 |
| **已解决** | [#3232 未配置 fallback 时限流失效](https://github.com/sipeed/picoclaw/issues/3232) | 已关闭 | 配置缺失情况下 RPM 限制未生效。已关闭。 |

此外，新提交的 PR #3279、#3280、#3256 分别针对 tool call 泄漏、OAuth 登录可存活、飞书媒体类型问题提供修复，正处于待合并阶段。

---

## 6. 功能请求与路线图信号
- **替换 libolm（#3088）**：高优先级功能请求，要求默认使用 `vodozemac`，并支持编译时可选的 libolm。若纳入下一版本，将提升通道安全性。目前无实质开发进展，需要维护者决策或社区贡献。
- **模型默认 fallback 链配置（PR #3200）**：允许用户在 Web UI 设置默认模型与后备模型次序，并通过 API 持久化。该 PR 已存在 20 天，待合并，若进入主线将大幅简化多模型管理。
- **Anthropic 系统缓存块支持（PR #3228）**：为 `anthropic_messages` 提供者发送系统块时附加 `cache_control`，使 prompt 缓存生效。功能需求明确，来自社区贡献。
- **飞书音视频原生消息（PR #3256）**：上传文件已区分类型但发送时仍作为通用文件，改为原生支持在线播放，增强飞书渠道体验。
- **策略化系统执行（#3282，已合并）**：为高级节点场景提供安全的命令执行框架，可视为企业级管理方向的铺垫。

综合来看，下一版本很可能包含 fallback 链、Anthropic 缓存、飞书媒体修复及多项 OAuth 与稳定性 Bug 修复。libolm 替换仍是最需决策的路线图项。

---

## 7. 用户反馈摘要
- **安全性诉求**：多位用户强调 libolm 已不维护，存在潜在安全风险，期望快速切换到官方推荐的 vodozemac（#3088）。
- **稳定性痛点**：Matrix 用户反映同步环路无重连导致长时间后台静默失效，必须手动重启；Web UI 用户在长对话场景遭遇严重输入卡顿，体验大幅下降（#3281）。
- **个性化需求**：DingTalk/Telegram 用户希望机器人问候语能跟随 `soul.md` 自定义，而不仅显示固定名称（已由 #303 解决）。
- **OAuth 体验**：Google OAuth 登录受阻（#3278），用户只能手动绕过安全警告；修复后未来远程/无头环境下的 OAuth 流程仍有待 #3280 加强。
- **火山引擎/Seahorse**：用户遭遇工具调用格式泄露，影响对话连贯性，相关 Bug 已关闭/在修中（#3153 已闭、#3279 在合）。

整体反馈集中在 **基本可用性的可靠性**（重连、卡顿、前置配置）与 **身份自定义** 上。

---

## 8. 待处理积压
以下 Issue/PR 长期未解决或需维护者关注：

- **#3088（Feature: vodozemac）**：已 stale 约 6 周，priority high 但无人认领。建议维护者明确是否接受该方案或提供实现指引。  
  [Issue #3088](https://github.com/sipeed/picoclaw/issues/3088)

- **#3203（Matrix 重连）**：开放 19 天，影响核心通道稳定性，尚未分配。  
  [Issue #3203](https://github.com/sipeed/picoclaw/issues/3203)

- **#3255（钉钉预览固定文字）**：开放 8 天，评论较少但复现明确。  
  [Issue #3255](https://github.com/sipeed/picoclaw/issues/3255)

- **待合并 PR**（均 stale 或新提交，需及时 Review）：
  - #3200（fallback 链配置，已 21 天）
  - #3228（Anthropic 缓存，已 15 天）
  - #3256（飞书媒体，已 8 天）
  - #3279 & #3280（Seahorse 泄漏与 OAuth 修复，新提交）

建议维护者优先安排 #3088 的路线图决策、#3203 的修复责任人，以及加快长期 PR 的合入审核，以避免代码漂移。

---

> **数据驱动总结**：项目健康度中等偏积极，Bug 响应快（Antigravity 系列），但关键安全替换和核心通道重连问题积压，中长期稳定性存忧。社区贡献活跃，为下一版本积攒了较多功能修复。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

好的，这是根据您提供的 GitHub 数据生成的 QwenPaw 项目动态日报。

---

# QwenPaw 项目动态日报 | 2026-07-22

## 1. 今日速览

项目过去 24 小时迎来高强度迭代，处理 **41 条 Issue**、**46 条 PR**，关闭/合并率达 **58%**（27/46 PRs），反映出开发团队与社区协作的极高效率。正式发布 **[v2.0.1-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.0.1-beta.1)**，主要针对 Tauri 桌面端和 Memory 稳定性进行热修复。社区讨论焦点集中在 **v2.0 的性能回归**、**多工具调用输出重复**以及**移动端支持**等体验问题上。整体来看，项目处于向 v2.1 冲刺的快速修复期，架构层（治理、OMP、ACP）的重构已大规模落地。

## 2. 版本发布

**[v2.0.1-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.0.1-beta.1)** 于今日发布。这是一个补丁 Beta 版本，主要包含三项变更：
- **修复**：Tauri 桌面端入口文件的绝对引用导入问题（[#6234](https://github.com/agentscope-ai/QwenPaw/pull/6234)）。
- **修复**：Memory Space 模块捕获 `OSError` 异常，增强存储稳定性（[#6266](https://github.com/agentscope-ai/QwenPaw/pull/6266)）。
- **维护**：版本号更新至 `2.0.1b1`。

**评估**：本次为轻度热修复版本，**无破坏性变更**。内存模块的 `OSError` 修复对于使用 ReMe Light 的用户是重要的稳定性提升。建议所有 v2.0.x 用户升级。

## 3. 项目进展

项目今日在核心架构和功能上完成了多项里程碑式的合并：

- **OMP 工作流整合**：[#5882](https://github.com/agentscope-ai/QwenPaw/pull/5882) 合并，引入 UltraQA、Ralph 等 5 种工作流模式，并增强了 `spawn_subagent` 的权限控制。
- **Agent 治理重构**：[#6190](https://github.com/agentscope-ai/QwenPaw/pull/6190) 合并，统一了内置/插件工具注册机制（`@tool_descriptor`），让工具治理白名单、默认规则、UI 配置同步，消除了手动维护的元数据孤岛。
- **ACP 重构**：[#5796](https://github.com/agentscope-ai/QwenPaw/pull/5796) 合并，解耦了斜杠命令系统，提取了通用安全检查模块（`safety_checks.py`），并统一了项目启动流程。
- **其他合并**：
  - 支持用户编辑 Agent 模式（[#6270](https://github.com/agentscope-ai/QwenPaw/pull/6270)）。
  - 添加 **AIOnly** 作为内置模型供应商（[#6271](https://github.com/agentscope-ai/QwenPaw/pull/6271)）。
  - 添加 CLI 环境加密读写能力（[#6251](https://github.com/agentscope-ai/QwenPaw/pull/6251)）。
  - 日志轮替大小与备份数现在可通过环境变量配置（[#6183](https://github.com/agentscope-ai/QwenPaw/pull/6183)）。
  - Console 上下文环形指示器重构，改善 Token 占用展示（[#6195](https://github.com/agentscope-ai/QwenPaw/pull/6195)）。

这些合并极大地夯实了项目的后端基座，为插件生态和高级编排能力铺平了道路。

## 4. 社区热点

今日社区讨论活跃，以下几个 Issue/PR 引发了高度关注：

- **[#2291 Help Wanted](https://github.com/agentscope-ai/QwenPaw/issues/2291) (65条评论)**：长期置顶的贡献者任务清单，尽管已关闭，但始终是社区参与的中枢。
- **[#6257 多工具调用输出重复](https://github.com/agentscope-ai/QwenPaw/issues/6257) (13条评论)**：用户 `@ShenWesley` 报告当 Agent 在一轮中调用多个工具时，Thinking 内容变为完全相同的副本。**分析**：这严重影响多步骤推理场景（如代码生成、数据分析），虽已关闭，但反映出在多工具调度场景下的输出逻辑仍需打磨。
- **[#6297 拖拽上传图片/文档](https://github.com/agentscope-ai/QwenPaw/issues/6297) (4条评论，活跃中)**：用户 `@rerbin` 提出。**分析**：核心诉求为提升对话式生产力（合同审核等），这是会话式 AI 最基础但最关键的功能缺失。
- **[#6281 Web 控制台适配移动端](https://github.com/agentscope-ai/QwenPaw/issues/6281) (4条评论，活跃中)**：用户 `@ook826092-cloud` 提出。**分析**：移动办公需求强烈，用户期望在手机/平板上无缝操作，这是项目从“开发工具”走向“普遍生产力工具”的必经之路。
- **性能/稳定性反馈**：[#6307](https://github.com/agentscope-ai/QwenPaw/issues/6307) v2.0 性能回归与 [#5860](https://github.com/agentscope-ai/QwenPaw/issues/5860) 上下文丢失/无限循环 代表了老用户升级后最普遍的负面反馈，暴露出架构变更带来的副作用。

## 5. Bug 与稳定性

今日新报/更新的 Bug 按严重程度排列如下：

**严重/回归：**
- **性能回归 (P0)**：[#6307](https://github.com/agentscope-ai/QwenPaw/issues/6307) v2.0 引入约 2 秒固定开销。**无修复 PR，阻塞 v2.x 升级。**
- **数据污染**：[#6299](https://github.com/agentscope-ai/QwenPaw/issues/6299) 删除会话残留导致 seq 冲突与跨上下文污染（`@arcol` 提供了详细的根因分析）。已关闭，修复 PR [#6068](https://github.com/agentscope-ai/QwenPaw/pull/6068) 待合并。

**中优先级：**
- **死循环/重复输出**：[#6241](https://github.com/agentscope-ai/QwenPaw/issues/6241) Agent 重复输出 + `memory_search` 死循环。已关闭。
- **连接崩溃**：[#6314](https://github.com/agentscope-ai/QwenPaw/issues/6314) QwenPaw 主动关闭连接导致 `RemoteProtocolError`。已关闭。
- **API 兼容丢失**：[#6242](https://github.com/agentscope-ai/QwenPaw/issues/6242) 控制台 Embedding 维度设置未透传。已关闭。
- **日志刷屏**：[#5771](https://github.com/agentscope-ai/QwenPaw/issues/5771) Debug 日志误用 WARNING 级别。已关闭。
- **计划模式反复读文件**：[#5759](https://github.com/agentscope-ai/QwenPaw/issues/5759) 已关闭。

**待解决：**
- **[#6273](https://github.com/agentscope-ai/QwenPaw/issues/6273) 任务追踪与并发语义不统一**（核心开发者 `rayrayraykk` 提交，深层次架构问题）。
- **[#6322](https://github.com/agentscope-ai/QwenPaw/issues/6322) 域名被运营商劫持跳转广告**（外部环境问题，需澄清是否与代码依赖有关）。
- **[#6258](https://github.com/agentscope-ai/QwenPaw/issues/6258) OpenAI 模型 `max_tokens` 不生效**。
- **[#6320](https://github.com/agentscope-ai/QwenPaw/issues/6320) LaTeX 公式在 Docker 环境渲染错误**。
- **[#6301](https://github.com/agentscope-ai/QwenPaw/issues/6301) 时区转换不准确**（修复 PR [#6309](https://github.com/agentscope-ai/QwenPaw/pull/6309) 已提交，待合并）。

## 6. 功能请求与路线图信号

**高热度/高频社区需求：**
- **交互升级**：移动端适配（[#6281](https://github.com/agentscope-ai/QwenPaw/issues/6281)）、桌面端快捷工作区访问（[#6083](https://github.com/agentscope-ai/QwenPaw/issues/6083)）、拖拽上传（[#6297](https://github.com/agentscope-ai/QwenPaw/issues/6297)）。这些是 QwenPaw 从开发者工具走向通用生产力工具的必经门槛。
- **按对话指定模型**：用户要求在单个 Agent 的不同对话中使用不同模型（[#6318](https://github.com/agentscope-ai/QwenPaw/issues/6318)）。社区贡献 PR **[#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992)** 已提交该功能，极有可能合并入下一版本。

**企业/高级功能需求：**
- **AGENTS.md 前置条件规则**（[#6321](https://github.com/agentscope-ai/QwenPaw/issues/6321)）：用户希望在代码修改前强制执行验证规则。
- **禁用/自定义内置工具描述以节省 Token**（[#6286](https://github.com/agentscope-ai/QwenPaw/issues/6286)）：企业用户提出的务实需求。
- **自动附加当前时间到上下文**（[#6283](https://github.com/agentscope-ai/QwenPaw/issues/6283)）：解决模型混淆日期的低级但普遍问题。
- **Coding 模式终端输入**（[#6308](https://github.com/agentscope-ai/QwenPaw/issues/6308)）：用户希望在 Coding 模式下直接交互，而非通过 Agent 间接执行。

**路线图信号**：
- [OMP 模式](https://github.com/agentscope-ai/QwenPaw/pull/5882) 的合并标志着项目正从单一 Agent 框架向**多 Agent 工作流平台**演进。
- 可控[主题/皮肤模块](https://github.com/agentscope-ai/QwenPaw/pull/6312)的草稿提交通常意味着 UI 可定制化被提上议程。

## 7. 用户反馈摘要

从今日 Issues 和 PR 评论中提炼的用户真实声音：

**正面反馈**：
- 社区贡献者活跃度极高，一个关于主题配置的 PR（[#6312](https://github.com/agentscope-ai/QwenPaw/pull/6312)）即使在草稿阶段也已提交，说明贡献者任务清单（[#2291](https://github.com/agentscope-ai/QwenPaw/issues/2291)）起到了很好的引导作用。
- 用户对 [AIOnly](https://github.com/agentscope-ai/QwenPaw/pull/6271) 等新模型供应商的集成表示出兴趣，显示了社区对多模型生态的渴望。

**负面/改进反馈**：
- **性能是升级的最大阻碍**：用户 `@lululau` 明确测试并指出 v2.0 相比 v1.x 有约 2 秒的额外固定开销（[#6307](https://github.com/agentscope-ai/QwenPaw/issues/6307)），对于讲究实时反馈的聊天应用是致命的体验降级。
- **基础交互不完善**：用户 `@rerbin` 提到“合同审核等场景的工作很重要”，直指拖拽上传（[#6297](https://github.com/agentscope-ai/QwenPaw/issues/6297)）是必需的效率功能。用户 `@ook826092-cloud` 和 `@isrun` 也表达了移动端和终端输入的需求痛点。
- **Bug 造成的信任危机**：从 [#5860](https://github.com/agentscope-ai/QwenPaw/issues/5860)（对话丢失）、[#5759](https://github.com/agentscope-ai/QwenPaw/issues/5759)（重复读文件）、[#6241](https://github.com/agentscope-ai/QwenPaw/issues/6241)（死循环）的反馈来看，Agent 执行结果的不可预测性正在消耗早期用户的耐心。

**总结**：用户群体专业且包容（主动分析 Root Cause），但对 v2.0 的稳定性下降表示了强烈关切。开发团队需在打磨新架构的同时，**优先扑灭 #6307 性能大火**。

## 8. 待处理积压

以下为需维护团队重点关注的长期/遗留问题：

**需要优先响应的 Bug：**
- **[#6307](https://github.com/agentscope-ai/QwenPaw/issues/6307) v2.0 性能回归**：虽然 Open 仅 1 天，但属于与 v1.x 的直接比较，是必须立刻确认修复计划的 **P0 级别问题**。
- **[#6322](https://github.com/agentscope-ai/QwenPaw/issues/6322) 域名广告劫持**：需迅速定性是否为环境问题或依赖安全问题。
- **[#6258](https://github.com/agentscope-ai/QwenPaw/issues/6258) OpenAI 模型最大输出 Token 不生效**：报告 3 天，仍未确认，影响模型调用契合度。
- **[#6273](https://github.com/agentscope-ai/QwenPaw/issues/6273) 任务追踪与并发语义不统一**：核心开发者 `rayrayraykk` 提交，属于深层次架构问题，需安排架构评审。

**需要关注的待合并 PR：**
- **[#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992)**：对话级模型覆盖（首贡献者）。等待 Review 已近 10 天，建议加速。
- **[#6068](https://github.com/agentscope-ai/QwenPaw/pull/6068)**：修复会话 ID 迁移与数据污染（关联 [#6299](https://github.com/agentscope-ai/QwenPaw/issues/6299)），已一周，对数据完整性至关重要。
- **[#6284](https://github.com/agentscope-ai/QwenPaw/pull/6284)**：QwenPaw Creator 应用（视频制作工作流）。大功能 PR，与 OMP 结合潜力大，但需慎重评审。
- **[#6311](https://github.com/agentscope-ai/QwenPaw/pull/6311) / [#6317](https://github.com/agentscope-ai/QwenPaw/pull/6317)**：OMP 和 ToolGuard 的后续强化 PR，属于热门重构的延续，需保持评审节奏。

**长期悬而未决的信号**：
- Agent **死循环/重复输出**（[#5657](https://github.com/agentscope-ai/QwenPaw/issues/5657) [#5860](https://github.com/agentscope-ai/QwenPaw/issues/5860) [#6241](https://github.com/agentscope-ai/QwenPaw/issues/6241) 等）在同一主题下反复出现，建议设立 `loop-detection` 专题追踪闭环，框架层面缺乏兜底机制。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

好的，作为一名专注于 AI 智能体与个人 AI 助手领域的开源项目分析师，以下是根据您提供的 GitHub 数据生成的 **Hermes-Agent 项目动态日报**。

---

# Hermes-Agent 项目动态日报 | 2026-07-22

## 1. 今日速览

Hermes Agent 项目在 2026 年 7 月 22 日展现出极高的开发活跃度。24小时内，共有 **313 个 Issue** 与 **500 个 PR** 被更新（其中 116 个 PR 已被合并或处理），这一数据在同类开源项目中属于顶级水平。

当前开发焦点极度集中：**Plugin 系统的架构大扩张**（由核心成员 @teknium1 主导的社区规划贴引发热议）、**Desktop 客户端稳定性问题的集中式修复**，以及 **MCP/Kanban 等关键基础设施的健壮性提升**。尽管当日无新版本发布，但庞大的 PR 吞吐量表明项目正在经历一次从架构到底层稳定性的全面升级。**项目健康度评估：演进激进，修复密集，但 384 个待合并 PR 的积压量值得关注，可能对贡献者生态造成潜在的合并瓶颈。**

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

今日合并/关闭的 116 个 PR 进一步推动了项目在稳定性、安全性和基础设施方面的进步：

- **核心稳定性修复**：
    - 修复了上下文压缩算法导致的“重试死循环”问题（[#68899](https://github.com/NousResearch/hermes-agent/pull/68899)），这是影响 Agent 正常响应的严重缺陷。
    - 解决了快速切换会话时导致 `max_concurrent_sessions` 耗尽的“会话租约泄露”问题（[#68947](https://github.com/NousResearch/hermes-agent/pull/68947), [#68949](https://github.com/NousResearch/hermes-agent/pull/68949)）。
- **平台安全加固**：
    - 修复了多 Profile 复用模式下，令牌（Token）错位导致凭据泄露的安全漏洞（[#54675](https://github.com/NousResearch/hermes-agent/issues/54675)）。
    - 在媒体分发黑名单中增加了对 Claude Code 本地身份验证目录的屏蔽（[#63340](https://github.com/NousResearch/hermes-agent/pull/63340)）。
- **工具链与 MCP 生态**：
    - 修复了 Streamable HTTP MCP 服务器重连后工具注册失效的问题（[#67187](https://github.com/NousResearch/hermes-agent/issues/67187)）。
    - 对 MCP 服务器发现范围进行了进程级权限控制，防止 Kanban Worker 过度占用 MCP 子进程（[#68955](https://github.com/NousResearch/hermes-agent/pull/68955)）。
- **开发者体验与基础设施**：
    - CI 流水线正从 GitHub 托管的 Runner 迁移至 GKE 自托管 Runner（[#66520](https://github.com/NousResearch/hermes-agent/pull/66520)），以提升执行效率与降低成本。
    - 新增了 Docker Compose 辅助脚本（[#48636](https://github.com/NousResearch/hermes-agent/pull/48636)）和统一跨端主题 SDK（[#68857](https://github.com/NousResearch/hermes-agent/pull/68857)）。

---

## 4. 社区热点

今日社区讨论热度集中在以下议题，反映了用户对项目方向的期待与痛点：

- **🔥 Plugin 接口生态大讨论（[#64182](https://github.com/NousResearch/hermes-agent/issues/64182)）**
    - **热度**：15 条评论
    - **分析**：由项目灵魂人物 @teknium1 发起，收集社区对 Plugin 系统扩展的构想。这是目前项目最明确的路线图信号，涵盖了生命周期钩子、中间件、社区索引等。社区对此反应极为积极，标志着 Hermes 正从“个人助手”迈向“Agent 平台”。
- **🔥 Desktop 瘦客户端需求再升温（[#38602](https://github.com/NousResearch/hermes-agent/issues/38602)）**
    - **热度**：13 条评论，**50 个 👍**
    - **分析**：这是社区长期以来的最强呼声。用户强烈要求 Desktop 作为一个纯远程控制客户端，而不是强制自启动 Hermes 后端。这一需求若得到满足，将极大改变项目的部署模式。
- **🌟 可配置记忆后端（[#47349](https://github.com/NousResearch/hermes-agent/issues/47349)）**
    - **热度**：13 条评论
    - **分析**：用户希望摆脱硬编码的 `MEMORY.md` 文件，拥抱外部数据库（如 Honcho）。这是 Agent 实现长效、结构化记忆的关键一步。

---

## 5. Bug 与稳定性

今日报告的 Bug 主要集中在 Session 管理和 Desktop 客户端体验上，为当前阶段的主要技术债务。

| 严重程度 | Bug 简述 | Issue / PR | 状态 |
| :--- | :--- | :--- | :--- |
| **🔴 严重 (P1)** | **Desktop 新建会话首条消息无响应（空白 Session）** | [#63078](https://github.com/NousResearch/hermes-agent/issues/63078) | **待修复** |
| **🔴 严重 (P1)** | **上下文压缩导致 Agent 重试死循环** | [#68899](https://github.com/NousResearch/hermes-agent/pull/68899) | **已修复** |
| **🟠 高 (P2)** | **Desktop 消息路由错误（新建消息窜入旧 TUI 会话）** | [#68358](https://github.com/NousResearch/hermes-agent/issues/68358) | **待修复** |
| **🟠 高 (P2)** | **多 Profile 模式下 Bot 令牌泄露安全漏洞** | [#54675](https://github.com/NousResearch/hermes-agent/issues/54675) | **已修复** |
| **🟠 高 (P2)** | **Dashboard 跨 Tab Session 漂移及 `/new` 命令挂起** | [#62726](https://github.com/NousResearch/hermes-agent/issues/62726) | **待修复** |
| **🟠 高 (P2)** | **MCP 服务器重连后工具注册不恢复** | [#67187](https://github.com/NousResearch/hermes-agent/issues/67187) | **已修复** |
| **🟡 中 (P3)** | **Web 工具（搜索/抓取）静默失败** | [#27683](https://github.com/NousResearch/hermes-agent/issues/27683) | **已修复** |
| **🟡 中 (P3)** | **Gateway 重启后会话预估成本重置为 0** | [#67762](https://github.com/NousResearch/hermes-agent/issues/67762) | **待修复** |

---

## 6. 功能请求与路线图信号

结合今日的 Issue 与 PR 数据，项目后续版本的功能优先级已经清晰浮现：

- **🚦 已进入开发阶段**：
    - **跨表面统一主题 SDK**（[#68857](https://github.com/NousResearch/hermes-agent/pull/68857)）：一套主题皮肤统一 CLI、TUI 和 Desktop。
    - **TUI 小组件 App SDK**（[#68306](https://github.com/NousResearch/hermes-agent/pull/68306)）：允许开发者编写状态+Reducer+渲染的小组件。
- **📌 已确定纳入路线图（核心贡献者提及）**：
    - **Plugin 系统大扩张**（[#64182](https://github.com/NousResearch/hermes-agent/issues/64182) 系列）：社区插件索引（[#64181](https://github.com/NousResearch/hermes-agent/issues/64181)）、生命周期钩子（[#64231](https://github.com/NousResearch/hermes-agent/issues/64231)）、Gateway 中间件（[#64176](https://github.com/NousResearch/hermes-agent/issues/64176)）。
- **💬 社区强烈呼吁纳入**：
    - **Desktop 瘦客户端**（[#38602](https://github.com/NousResearch/hermes-agent/issues/38602)）：长期占据点赞榜首。
    - **混合工具预选机制**（[#13332](https://github.com/NousResearch/hermes-agent/issues/13332)）：通过语义+关键词过滤减少 Token 消耗，降低 API 成本。

---

## 7. 用户反馈摘要

从今日活跃的 Issue 评论中，可以提炼出用户的真实声音：

- **👍 正面反馈**：
    - 社区对 Plugin 平台化方向的 **讨论充满热情**，开发者愿意贡献架构设计思路，表明项目在技术引领上获得了开发者的高度认可。
    - 整体生态系统正在快速丰富，如 Qoder CLI 多文件编码技能（[#68314](https://github.com/NousResearch/hermes-agent/pull/68314)）的出现。
- **👎 负面反馈**：
    - **“破碎”的新用户上手体验**：Desktop 首条消息无响应（#63078）、Profile 删除“静默失败”（#47368）等问题，让新用户产生了“Bug 太多，像是半成品”的印象。用户 @humble92 对于 Profile 删不掉的无奈感比较典型。
    - **可观测性差**：用户 @Celthi 抱怨 Cron 任务“no useful information is recorded”，这表明 Agent 的自主执行过程缺乏透明度和有效的日志反馈。
    - **成本焦虑蔓延**：用户 @Enough1122 指出 Claude 模型通过 OpenAI 兼容接口时 Prompt Cache 命中率为 0%（#56776），而 #13332 讨论的 Token 浪费问题也持续引发用户对使用成本的担忧。

---

## 8. 待处理积压

以下议题长期存在且对项目生态至关重要，提醒维护者优先关注：

1. **Desktop 瘦客户端需求**（[#38602](https://github.com/NousResearch/hermes-agent/issues/38602)）
   - **创建于：** 2026-06-04 | **标签：** `50 👍`
   - **提醒：** 这是社区第二大呼声的功能，至今无对应 PR。建议将其纳入下一个 Milestone，以响应长期等待的 Desktop 用户。

2. **Cron 任务可靠性**（[#2788](https://github.com/NousResearch/hermes-agent/issues/2788)）
   - **创建于：** 2026-03-24 | **标签：** `comp/cron, P2`
   - **提醒：** 已积压近 4 个月。Cron 是 Agent 自动化的核心能力，其无声失败且无日志的问题属于严重功能缺陷，应尽快排期修复。

3. **跨平台 Session 共享**（[#4335](https://github.com/NousResearch/hermes-agent/issues/4335)）
   - **创建于：** 2026-03-31 | **标签：** `comp/gateway, P3`
   - **提醒：** 架构级需求，长期无人认领。Gateway 多端（CLI与Telegram）使用场景下，会话割裂是高级用户的普遍痛点。

4. **Kanban 数据库并发损坏**（[#34385](https://github.com/NousResearch/hermes-agent/issues/34385)）
   - **创建于：** 2026-05-29 | **标签：** `needs-decision`
   - **提醒：** 数据完整性的 Bug 最是棘手，且带有 `needs-decision` 标签，说明内部对修复方案存在分歧或卡在决策点上，建议尽快启动内部决策。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

好的，这是为您生成的 AstrBot 项目动态日报。

---

# AstrBot 项目动态日报 | 2026-07-22

**数据跨度：2026-07-21 ~ 2026-07-22 | 分析师：AI 智能体**

---

## 1. 今日速览

过去 24 小时内，AstrBot 项目共有 **19 次** Issue/PR 更新，整体处于 **高度活跃** 状态。开发管线非常拥挤，共有 **11 项待合并 PR**，核心功能重构（Context 上下文模型）与多平台兼容性修复（QQ、Telegram、Windows）是当前的主旋律。

尽管今日无新版本发布，但社区讨论热度极高，尤其是 QQ 表情误唤醒 Bot 和 Telegram 适配器轮询超时等问题，反映了用户对“开箱即用”的高要求。需要注意的是，**PR 合并率偏低**（仅 1/12），大量已就绪的修复和功能仍在等待审核，可能成为影响项目稳定性和贡献者积极性的瓶颈。

---

## 2. 版本发布

**无。** 过去 24 小时内无新版本 Release。

---

## 3. 项目进展

今日仅合并了 1 项 PR，属于维护性更新；但在待处理的 PR 池中，多项关键修复与功能重构已趋于成熟。

- **已合并/关闭：**
    - **[dependencies]** [#9333 chore(deps): bump the github-actions group with 2 updates](https://github.com/AstrBotDevs/AstrBot/pull/9333)
        - 由 Dependabot 自动化完成，例行更新 GitHub Actions 依赖包。
    - **[feature:plugin]** [#9338 [Plugin] Codex Router](https://github.com/AstrBotDevs/AstrBot/pull/9338) (已关闭/合并)
        - 新增插件，支持将管理员任务异步路由到本地 Codex CLI，扩展了 Agent 能力边界。

- **等待合并的重要进展（潜在大步迈进）：**
    - **[重构: 上下文管理]** [#9340 [size:XL] refactor: redesign context config with orthogonal model and /compact command](https://github.com/AstrBotDevs/AstrBot/pull/9340)
        - **核心架构改动：** 将旧的隐式字段重构为 12 个正交显式字段，并引入 `/compact` 主动压缩命令。旨在解决 #9252 等系列的上下文管理痛点，如被采纳将大幅提升系统可配置性。
    - **[开发者体验]** [#9342 [size:L] Feat/plugin log levels](https://github.com/AstrBotDevs/AstrBot/pull/9342)
        - 为插件引入了独立的日志级别控制，极大改善了插件的可观测性，是插件生态发展的重要基础设施。

---

## 4. 社区热点

- **Bug 讨论热帖：**[#9341 [Bug] qq黄脸表情会触发 / 唤醒词](https://github.com/AstrBotDevs/AstrBot/issues/9341)
    - **评论数：** 3 | **状态：** 开放
    - **分析：** 该问题精准命中大量 QQ Bot 用户的痛点。用户指出 PC 端 QQ 的“超级表情”与手机端解析格式不同，会以 `[表情:475] [干饭]` 的形式触发唤醒词。该问题暴露了平台特定消息预处理层的深度缺陷，社区反应强烈，但暂无对应 Fix PR。

- **功能请求热帖：**[#9345 [Feature]单独为指令设置用户白名单](https://github.com/AstrBotDevs/AstrBot/issues/9345)
    - **评论数：** 0 | **状态：** 开放
    - **分析：** 在群聊多 Bot 共存的场景下，用户希望为特定指令设置用户级别白名单，避免多个 Bot 抢答。这反映了 AstrBot 在复杂社交场景下的权限控制刚需，是极有价值的路线图信号。

---

## 5. Bug 与稳定性

按严重程度排列：

- **严重（平台核心体验受损）：**
    - [#9341 QQ 黄脸表情触发唤醒词](https://github.com/AstrBotDevs/AstrBot/issues/9341) - 无对应修复 PR，需适配层深度介入。
    - [#9343 Telegram 适配器轮询超时/缺少独立代理](https://github.com/AstrBotDevs/AstrBot/issues/9343) - 国内用户部署 TG 机器人的壁垒，暂无修复 PR。

- **中高（已提交修复 PR）：**
    - [#9337 fix(openai): Adapt content format for third-party LLM like MindIE](https://github.com/AstrBotDevs/AstrBot/pull/9337) - 修复了部分非标第三方 LLM 服务对接时的 422 输入验证错误。
    - [#9335 fix: sanitize unsupported image MIME types (e.g. GIF) in context cleaner](https://github.com/AstrBotDevs/AstrBot/pull/9335) - 修复了引用 GIF 动图导致后续请求因 MIME 类型被拒的问题。
    - [#9344 修复fish audio配置项](https://github.com/AstrBotDevs/AstrBot/pull/9344) - 修复 Fish Audio TTS 不能选模型的 Bug。

- **长期待修复（PR 已就绪，等待合并）：**
    - [#6422 核心依赖约束阻塞兼容的插件升级](https://github.com/AstrBotDevs/AstrBot/pull/6422) - **积压 4 个月，影响极大。** 现有的精确版本锁定机制禁止了依赖的兼容性升级，导致插件安装/升级失败。这是插件生态发展的结构性硬伤。
    - [#8323 Faiss 在 Windows 非 ASCII 路径下读写失败](https://github.com/AstrBotDevs/AstrBot/pull/8323) - 积压 2 个月，LGTM 但未合并。
    - [#8875 修复 Windows 路径映射规则崩溃](https://github.com/AstrBotDevs/AstrBot/pull/8875) - 积压 1 个月，修复了配置 `path_mapping` 时的一个常见 Crash。

---

## 6. 功能请求与路线图信号

- **大概率进入下个版本：**
    - **上下文管理重构（PR #9340）：** 社区对于当前上下文配置不够正交的吐槽已久，配合 `/compact` 命令，这大概率是下一阶段的重点工作。
    - **插件可观测性（PR #9342）：** 独立的插件日志级别控制，对于即将到来的插件生态爆发是必不可少的基建。

- **路线图信号：**
    - **平台适配增强：**
        - **Telegram 独立代理（Issue #9343）：** 中国大陆用户部署 Telegram Bot 的硬需求，若被采纳，将大幅提升 Telegram 适配器的可用性。
        - **指令级白名单（Issue #9345）：** 细粒度权限控制信号，可能配合未来角色系统一起推出。

---

## 7. 用户反馈摘要

- **主要痛点：**
    - **平台适配割裂：** 用户反馈 `#9341` 提到“电脑端发出来的表情会解析为 [表情:475] [干饭]”，导致 LLM 误唤醒。这暴露了 QQ、Telegram 等平台的消息解析与核心唤醒词系统存在严重的耦合冲突。
    - **网络环境窘境：** 用户反馈 `#9343` 提到“因网络环境无法直连 api.telegram.org”，同时现有全局代理方案无法精细化控制，导致 Telegram Bot 无法正常使用。
    - **多 Bot 管理困难：** 用户反馈 `#9345` 指出多 Bot 群聊场景下“任意用户发送指令会触发所有bot回复”，希望增加指令级白名单，表明项目在复杂社交场景下的管理功能仍需补全。

- **社区满意度：**
    - 社区对插件生态的响应是积极的（矮人要塞插件 #8471、Codex Router #9338），但对 **核心兼容性问题（#6422 插件依赖锁定）** 和 **Windows 兼容性问题（#8323, #8875）** 的长期悬而未决，可能正在消耗贡献者耐心。

---

## 8. 待处理积压

以下为长期未响应或阻塞的关键项，提醒维护团队关注：

| 编号 | 类型 | 标题 | 创建时间 | 优先级 | 现状 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [#6422](https://github.com/AstrBotDevs/AstrBot/pull/6422) | PR | 核心依赖约束阻塞兼容的插件升级 | 2026-03-16 | **极高 (Critical)** | 积压 4 个月，PR 已就绪，无维护者回复。直接影响所有插件的安装兼容性，严重阻碍第三方开发。 |
| [#8471](https://github.com/AstrBotDevs/AstrBot/issues/8471) | Issue | [Plugin] 矮人要塞攻略查询助手 | 2026-05-31 | **高 (High)** | 插件提交通道，待审核近 2 个月。对于社区贡献者而言，长时间的等待体验极差。 |
| [#8323](https://github.com/AstrBotDevs/AstrBot/pull/8323) | PR | Faiss 在 Windows 非 ASCII 路径下读写失败 | 2026-05-25 | **高 (High)** | 已标记 LGTM，等待合并。非 ASCII 路径问题（中文用户）是 Windows 用户的刚需。 |
| [#7239](https://github.com/AstrBotDevs/AstrBot/issues/7239) | Issue | Clarvia AEO 集成提议 | 2026-03-31 | **低 (Low)** | 今日被关闭，外部生态集成提议，属于长期搁置后清理。 |

---
*报告结束。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*