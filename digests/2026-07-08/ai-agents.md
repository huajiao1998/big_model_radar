# OpenClaw 生态日报 2026-07-08

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-07-07 22:50 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

好的，这是根据 OpenClaw 项目在 2026-07-08 的 GitHub 数据生成的项目动态日报。

---

# OpenClaw 项目动态日报 | 2026-07-08

**分析师：** AI 智能体与个人 AI 助手领域开源项目分析师

---

## 1. 今日速览

- **极高活跃度，但质量与稳定性面临挑战**：24小时内，项目收到了 500 条 Issue 更新（含 385 条新开/活跃）和 500 条 PR 更新（含 150 条已合并/关闭），代码库生产力惊人，但 Issue 净增量远大于关闭量，维护者的审核压力依然巨大。
- **功能与稳定性产生巨大割裂**：一方面，Dashboard 2.0 和新型 Claws 包管理系统等重大特性正在大规模合入，社区目光聚焦于明日之星；另一方面，P1 级别的数据丢失、安全泄露和性能回归问题持续积压，核心引擎稳定性的续航能力成为项目长远健康的达摩克利斯之剑。
- **自动化流程全面接管**：`clawsweeper` 机器人深度参与 PR 管理与标记，大量 Issue 已被机器人自动分类标记（如 `clawsweeper:no-new-fix-pr`），体现了项目高度工程化的管理风格。

## 2. 版本发布

*（无新版本发布，本节省略）*

## 3. 项目进展

**本周可以说是 OpenClaw 的“基础设施与体验重构周”。**

### 🚀 核心功能：Dashboard 2.0 生态落地
贡献者 **@100yenadmin** 提交了一系列关于全新 Dashboard 的 PR，完成了从“文件展示”到“动态交互/应用”的质变。主要合并/推进的亮点包括：
- **沙盒自定义 Widget + 审批流** ([#101098](https://github.com/openclaw/openclaw/pull/101098))：Agent 可以为操作员动态生成实时的 HTML 交互组件（如表单、按钮），这是本次推进最具标志性的能力。
- **图表与开发 SDK** ([#101792](https://github.com/openclaw/openclaw/pull/101792), [#101354](https://github.com/openclaw/openclaw/pull/101354))：提供了无依赖的实时图表和内嵌 URL 预览。
- **“活回答”与 Chat-Dashboard 联动** ([#101899](https://github.com/openclaw/openclaw/pull/101899), [#101900](https://github.com/openclaw/openclaw/pull/101900))：Agent 的回答不再只是文字，可以直接在面板呈现可操作的视图；同时可以实现工作区文件的时间旅行与溯源。
- **Widget 状态持久化** ([#101329](https://github.com/openclaw/openclaw/pull/101329), [#101829](https://github.com/openclaw/openclaw/pull/101829))：为自定义 Widget 提供了“记忆”能力（setState 桥接），这是 Widget 从一次性展示转变为可复用应用的关键。

### ⚙️ 架构革新：Claws 包管理体系成熟
**@giodl73-repo** 完成了 **Claws** 生命周期中“验证与规划”环节的构建：
- 新增了 `claws inspect` 本地验证功能 ([#101328](https://github.com/openclaw/openclaw/pull/101328))。
- 新增了 Dry-Run 规划功能，允许用户在不执行的情况下预览 Claws 应用后的影响 ([#101874](https://github.com/openclaw/openclaw/pull/101874))。
- 新增了工件溯源预览及 Feed 规划 ([#101842](https://github.com/openclaw/openclaw/pull/101842), [#101755](https://github.com/openclaw/openclaw/pull/101755))。这意味着 OpenClaw 正在构建一个类似“App Store”的标准化分发入口。

### 🛡️ 基础设施与部署
- **Vault 集成** ([#89255](https://github.com/openclaw/openclaw/pull/89255))：新增 HashiCorp Vault 密钥引用插件，无需安装 CLI，提升了企业级密钥管理的安全性。
- **容器升级修复** ([#101881](https://github.com/openclaw/openclaw/pull/101881))：解决了 Docker/Podman/K8s 容器镜像升级后跳过迁移逻辑的问题，确保升级后的网关正确初始化。
- **首次启动引导** ([#101901](https://github.com/openclaw/openclaw/pull/101901))：改进了安装后的首次运行引导流程。

### 🪲 关键 Bug 修复
- **事件循环阻塞** ([#89040](https://github.com/openclaw/openclaw/pull/89040))：修复了 `embedded_run` 启动时的同步文件 I/O 导致的事件循环阻塞（14-22秒），这是一项重要的性能与消息可靠性修复。
- **插件测试失败** ([#101896](https://github.com/openclaw/openclaw/pull/101896))：修复了在正常开发环境下插件测试失败的问题。
- **Memory 读取崩溃** ([#101902](https://github.com/openclaw/openclaw/pull/101902))：修复了当 Memory 补充查找出错时整个工具调用未经验证并崩溃的问题。

## 4. 社区热点

- **#39604 - 请求开放内网访问 (11 👍)**：[链接](https://github.com/openclaw/openclaw/issues/39604)
  - **核心诉求**：用户强烈要求增加 `tools.web.fetch.allowPrivateNetwork` 配置开关。当前沙盒环境完全隔离了内网，当 Agent 需要拉取内部服务时会被强制阻断，这是被大量用户提及的痛点。
- **#42840 - 控制台数学公式支持 (9 👍)**：[链接](https://github.com/openclaw/openclaw/issues/42840)
  - **用户画像**：学术与科学计算用户占比提升，要求加入 MathJax/LaTeX 渲染，以便在控制台中交流复杂公式。
- **#96857 - 工具文本降级为“(see attached image)” (4 👍)**：[链接](https://github.com/openclaw/openclaw/issues/96857)
  - **用户情绪**：**愤怒与困惑**。大量用户发现 Agent 花费大量时间执行工具，但返回的关键日志和状态被压缩成了图片占位符，AI 完全盲视，导致工作流彻底中断。这是目前最严峻的 AI 可观测性 Bug。
- **#42026 - 分布式 Agent 运行时 RFC (3 👍)**：[链接](https://github.com/openclaw/openclaw/issues/42026)
  - **技术讨论**：社区对企业级部署场景的讨论升温，用户渴望将 Web 控制平面与重计算的 Agent 运行时分离开来，以实现负载均衡和独立扩缩。

## 5. Bug 与稳定性

*按严重性和影响范围排列，标注是否已有修复 PR。*

| 严重等级 | Issue | 核心描述 | 状态 |
| :--- | :--- | :--- | :--- |
| **严重 (P1)** | [#25592](https://github.com/openclaw/openclaw/issues/25592) | 工具调用间的内部文本（错误处理、叙事）泄露到用户频道 (安全性) | Linked PR Open |
| **严重 (P1)** | [#44925](https://github.com/openclaw/openclaw/issues/44925) | 子代理完成超时后无重试/恢复，静默丢失 (数据丢失) | Linked PR Open |
| **严重 (P1)** | [#22676](https://github.com/openclaw/openclaw/issues/22676) | Signal 守护进程重启时的竞态条件，导致孤儿进程 (稳定性) | Linked PR Open |
| **严重 (P1)** | [#31583](https://github.com/openclaw/openclaw/issues/31583) | exec 工具不继承技能Env变量，注入的密钥无法生效 (回归/安全性) | Linked PR Open |
| **严重 (P1)** | [#99241](https://github.com/openclaw/openclaw/issues/99241) | 长时间运行的工具结果被渲染为图片导致AI不可读 (UX/数据丢失) | Needs Live Repro |
| **严重 (P1)** | [#38327](https://github.com/openclaw/openclaw/issues/38327) | Google Vertex/Gemini 模型崩溃 `Cannot convert undefined` (回归) | Needs Review |
| **严重 (P1)** | [#31331](https://github.com/openclaw/openclaw/issues/31331) | Docker + Docker外Docker 沙箱无法挂载工作区 | Needs Review |
| **高 (P1/P2)** | [#85333](https://github.com/openclaw/openclaw/issues/85333) | `openclaw doctor --fix` 慢 4-5 倍 (55s→229s) (性能回归) | Needs Live Repro |
| **高 (P1/P2)** | [#96857](https://github.com/openclaw/openclaw/issues/96857) | 文本工具输出降级为图片占位符 (UX) | Needs Product Decision |
| **中 (P2)** | [#43747](https://github.com/openclaw/openclaw/issues/43747) | Memory 管理混乱，不同用户行为不一致 | Needs Review |
| **中 (P2)** | [#38439](https://github.com/openclaw/openclaw/issues/38439) | Webchat 头像接口返回 404 (回归) | Needs Review |

**稳定性评估**：尽管项目功能推进迅速，但**核心引擎在本次统计中暴露出多个容易导致“工作流断裂”的严重Bugs**（尤其是子代理静默失败和信息泄露）。沙箱环境的稳定性（Docker、工作区权限）是当前最脆弱的环节。

## 6. 功能请求与路线图信号

- **已锁定进入路线图**：
  - **Dashboard Widgets 生态**（由 @100yenadmin 的一系列进行中 PR 推动）是板上钉钉的下一个大版本核心特性。
  - **Claws 包管理**（由 @giodl73-repo 推动）将彻底改变插件和规则的分发方式。
  - **企业级密钥管理**：HashiCorp Vault 集成已准备就绪，等待审核合并。

- **社区呼声极高，很可能被优先考虑**：
  - **安全增强**：`allowPrivateNetwork` 内网访问开关 ([#39604](https://github.com/openclaw/openclaw/issues/39604)) 和 Per-Agent 成本预算 ([#42475](https://github.com/openclaw/openclaw/issues/42475)) 是社区最渴望的两项安全治理功能。
  - **Agent 编排**：`announceTarget` 子代理完成路由 ([#27445](https://github.com/openclaw/openclaw/issues/27445)) 和 Post-subagent 生命周期钩子 ([#22358](https://github.com/openclaw/openclaw/issues/22358)) 表明用户正在用 OpenClaw 构建复杂的多步骤工作流，需要更精细的控制。

- **远期架构级信号**：
  - **分布式运行时 ([#42026](https://github.com/openclaw/openclaw/issues/42026))**：硬核用户的长期追求，代表了项目从单机工具向平台级基础设施的野心。
  - **PostgreSQL 存储替代 ([#90370](https://github.com/openclaw/openclaw/issues/90370))**：尽管当前被标记为陈旧，但其讨论热度暗示了企业用户的硬性需求。

## 7. 用户反馈摘要

- **核心痛点：静默失败与数据丢失**。无论是在多 Agent 协同中（#43367），还是在 Cron 子会话中（#40001），用户最大的恐惧是“工作做了但结果没送到”。这严重打击了用户信任。
- **透明度不足**。用户明确要求看到 Agent 的“思维过程”（Reasoning Stream #42276），而不仅仅是工具调用状态。当工具输出被降级为图片（#96857）时，用户体验降至冰点。
- **对仪表盘寄予厚望**。尽管有诸多Bug，但社区对 @100yenadmin 打造的 Dashboard 表现出了极高的赞誉和期待，认为这是将 OpenClaw 从“调试工具”升级为“操作中心”的关键转折。
- **沙箱隔离的“度”难以把握**。用户理解安全隔离的必要性，但当前过于严格的沙箱模式（无法访问内网、无工作区写权限）严重阻碍了实用性，导致安全功能形同虚设。

## 8. 待处理积压

- **最需要关注的陈旧 Issue**：
  - [#85333](https://github.com/openclaw/openclaw/issues/85333)（Doctor 性能回归）：至今已47天，作为 regressions，对运维人员影响极大，需要尽快追究。
  - [#39847](https://github.com/openclaw/openclaw/issues/39847)（元数据泄露）：4个月未解决的安全 ECHO 污染问题。平台的数据隔离能力在此受限。
  - [#41744](https://github.com/openclaw/openclaw/issues/41744)（飞书图片丢失）：虽有关联 PR，但已进入陈旧状态，急需活跃推进。

- **等待作者/贡献者响应的 PR**：
  - [#101887](https://github.com/openclaw/openclaw/pull/101887)（引导设置模型）：作者需要回应。
  - [#94697](https://github.com/openclaw/openclaw/pull/94697)（Kill-tree 进程组修复）：等待作者确认风险。
  - [#89255](https://github.com/openclaw/openclaw/pull/89255)（Vault 插件）：社区已等待多日，需要作者推动合并。
  - [#79540](https://github.com/openclaw/openclaw/pull/79540)（ACP 会话 Token 捕获）：陈旧 PR。

- **维护者瓶颈警报**：目前有 **20+ 个** 关键的 Issue（打上了 `clawsweeper:needs-maintainer-review` 标签）积压在维护者手中，涵盖安全回归（#37634）、核心功能缺失（#29387）等。尽管有自动化机器人帮助分类，但**最终的人工决策与合并能力**已成为当前项目交付的瓶颈。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告（2026-07-08）

## 1. 生态全景

当日五大开源项目均保持极高活跃度，**个人 AI 助手/自主智能体领域正从“可用的工具”快速迈向“可编排的平台”**。核心表现有三：一是 Dashboard 与交互组件从静态展示进化为动态 Agent 操作面板（OpenClaw Widget / Zeroclaw SOP 编辑器）；二是多 Agent 编排与 ACP 协议通用化成为高端用户的核心诉求（hermes-agent 与 OpenClaw 同时出现相关 RFC）；三是安全性从“附加特性”变为“前置约束”，沙箱策略、内网访问、密钥管理、审批队列等话题在多个项目中同步升温。与此同时，极高迭代速度也暴露出稳定性隐忧——子代理静默失败、工具输出降级、前端渲染崩溃等 P1 级 Bug 普遍存在于头部项目中，维护者审核人力成为效率瓶颈。

## 2. 各项目活跃度对比

| 项目 | Issue 更新数 | PR 更新数 | 合并/关闭 PR | 版本发布 | 健康度评估 |
|------|------------|----------|------------|---------|-----------|
| **OpenClaw** | 500（385 新开/活跃） | 500 | 150 合并/关闭 | 无 | 功能扩张极快，但 P1 Bug 积压严重，维护者瓶颈加剧 |
| **hermes-agent** | 283 条讨论 | 500 | 多项关键修复已合并 | 无 | 安全加固与多 Agent 方向清晰，重构回归需警惕 |
| **Zeroclaw** | 23 | 50 | 约 9 合并 | 无 | 核心功能攻坚（SOP/ZeroCode），安全响应优秀，文档质量成短板 |
| **QwenPaw** | 17（4 关闭） | 38（15 合并/关闭） | 15 合并 | v2.0.0-beta.3 | v2 冲刺期，Bug 集中暴露但修复响应快，前端架构瓶颈突出 |
| **PicoClaw** | 7 | 4（1 合并） | 1 合并 | 无 | 轻量级，但多项严重 Bug 处于 stale 状态，维护响应偏弱 |

> *注：“更新数”包含新建、评论、状态变更等所有跨日变动。*

## 3. OpenClaw 在生态中的定位

OpenClaw 在生态中扮演 **“能力边界探索者”** 角色，是当日功能最丰富、社区规模最大的项目。

- **优势**：Dashboard 2.0 的 Widget 系统（可交互表单/图表/“活回答”）和 Claws 包管理体系（标准化分发与生命周期验证）在生态内独一无二，直接提升了 Agent 输出与用户之间的交互密度。企业级特性如 HashiCorp Vault 集成和 `clawsweeper` 自动化流程也体现其工程化深度。
- **技术路线差异**：相比 hermes 专注多 Agent 调度、Zeroclaw 盯紧 SOP 结构化、QwenPaw 侧重桌面与渠道，OpenClaw 更倾向 **“统一平台操作系统”** ——通过 Claws 扩展任何能力，通过 Dashboard 统一操作入口，通过沙箱保障隔离。这种 All-in-One 的策略带来了最大的功能体量，也带来了最大的稳定性压力。
- **社区规模**：Issue/PR 总数遥遥领先，但净增 Issue 远超关闭量，意味着新需求的涌入速度已超过解决速度，维护者成为交付瓶颈。

## 4. 共同关注的技术方向

以下主题在至少三个项目中同时出现，反映生态共性痛点：

| 方向 | 涉及项目 | 具体诉求 |
|------|---------|---------|
| **Dashboard/前端交互增强** | OpenClaw, Zeroclaw, QwenPaw, hermes | 动态组件（Widget、SOP图）、可配置通知、拓扑可视化、桌面端路径点击 |
| **工具调用可靠性** | 所有五个项目 | 输出降级为图片（OpenClaw）、MCP OOM（Zeroclaw）、XML泄漏（PicoClaw）、Schema校验崩溃（QwenPaw, hermes） |
| **沙箱与安全策略可配置** | OpenClaw, Zeroclaw, QwenPaw, PicoClaw | 内网访问开关、Shell逐次确认、技能绕过策略、沙箱目录写入权限 |
| **多 Agent/子代理编排** | OpenClaw, Zeroclaw, hermes, QwenPaw | 子代理超时恢复、SOP流程图、ACP通用化、/stop隔离失效 |
| **Provider 兼容性阵痛** | QwenPaw, PicoClaw, hermes, OpenClaw | Gemini Schema不兼容、火山引擎标签泄漏、delegate_task 400错误、Fallback不重置 |
| **配置与文档体验** | Zeroclaw, PicoClaw, QwenPaw | 文档与CLI不符、首次配置即失败、默认配置健壮性差 |

## 5. 差异化定位分析

| 维度 | OpenClaw | hermes-agent | QwenPaw | Zeroclaw | PicoClaw |
|------|----------|-------------|---------|----------|---------|
| **核心功能侧重** | 全能平台：Dashboard、包管理、沙箱、企业级 | 多Agent编排与安全治理、ACP生态 | 插件系统+桌面端+多IM渠道融合 | 标准化流程（SOP编辑器）、ZeroCode、开发者工具 | 轻量去中心化通信（DeltaChat）+设备控制（ADB） |
| **关键技术架构** | 沙箱隔离、Claws包分发、Vault集成 | 网关/Profile架构、通用ACP | 插件式频道注册、桌面Electron捆绑 | Rust性能、SOP引擎 | 轻量集成、邮件/DeltaChat协议 |
| **目标用户画像** | 开发者与企业团队，强调可拓展与管理 | 高级开发者/运维，构建复杂多Agent工作流 | 桌面重度用户、多平台个人使用者 | 团队协作与流程自动化需求者 | 移动/嵌入式/去中心化爱好者 |
| **版本成熟度** | 核心引擎稳定性质疑，快速迭代 | 较成熟，安全修复频繁 | v2.0.0-beta，功能和Bug并行涌现 | 尚未正式发版，关键功能在收尾 | 稳定但存在多个未修复的class B |
| **当前最大挑战** | P1 Bug积压与维护者瓶颈 | 重构破坏用户工作流，多租户隔离 | 前端大数据渲染崩溃/自动记忆回归 | 文档/配置准确性，CVE告警积压 | 新用户上手失败率，OAuth不可用 |

## 6. 社区热度与成熟度分层

基于更新规模、维护效率和用户参与深度，可将项目分为三个梯队：

- **第一梯队 / 极热（开放贡献与议题量最高）**：**OpenClaw** 和 **hermes-agent**。两者均达到每日数百的 PR/Issue 交互量，但内部状态不同：OpenClaw 新功能密度极高，但稳定性信号偏弱（多个 P1 无修复 PR）；hermes 虽然同样繁忙，但安全修复与架构讨论（如瘦客户端、ACP 通用化）更聚焦，核心代码库的稳固性相对更好。

- **第二梯队 / 高热（专注核心突破）**：**QwenPaw** 和 **Zeroclaw**。QwenPaw 在 v2.0 冲刺下 Bug 集中爆发但团队响应快；Zeroclaw 虽 PR/Issue 量较低，但 XL 尺寸的 PR（SOP 编辑器、TodoWrite 追踪器）说明其在核心功能上集中发力，安全修复也能做到当日完成。

- **第三梯队 / 中温（轻量维护）**：**PicoClaw**。项目规模最小，DeltaChat 重构和 ADB 功能有一定创新，但多个用户报告的阻塞性 Bug（速率限制失效、NanoKVM 不可用、OAuth 失败）处于 stale 状态，社区活跃度与维护响应存在显著代差。

从成熟度看，没有任何一个项目可以称为“稳定生产就绪”：头部项目（OpenClaw/hermes）虽有大规模社区和丰富功能，但 Bug 积压和架构变动仍会频繁打断工作流；中部项目（QwenPaw/Zeroclaw）处于快速成长期，有意愿转向生产但尚未完成；轻量项目（PicoClaw）创新点鲜明但资源有限，更适合特定场景的尝鲜用户。

## 7. 值得关注的趋势信号

- **从“输出文本”到“输出界面”**：OpenClaw Dashboard 2.0 的 Widget 系统允许 Agent 动态生成 HTML 交互组件（表单、按钮、图表），标志 Agent 回复从单调文字升级为“操作中心”。Zeroclaw 的 SOP 可视化编辑器则进一步让 Agent 流程可拖曳编辑。这对 AI 智能体的前端设计和用户信任构建具有范式意义。

- **多 Agent 编排走向泛化**：hermes-agent 社区以 18 个 👍 推进 ACP 通用化（要求能编排 Claude Code、SWE-agent 等），OpenClaw 也在增加子代理生命周期钩子与路由。**Agent 的 Agent 不再停留于概念，正在变成明确的工程需求**，这对协议标准化（ACP）和分布式运行时提出了刚性要求。

- **“瘦客户端 + 远端运行时”呼声一致**：hermes-agent `#38602` 以 42 👍 成为当日最强功能请求，明确要求桌面端只做控制面板，计算/存储下沉。PicoClaw 的去中心化通信、OpenClaw 分布运行时 RFC 同样指向这种架构分化。**轻量化前端 + 后端独立扩缩将成为走向企业级部署的必由之路**。

- **安全策略从“隐式隔离”走向“显式可配置”**：OpenClaw 的内网访问开关（#39604）、Zeroclaw 的 Shell 逐次确认 RFC、QwenPaw 的 `find -delete` 绕过修复、hermes 的审批队列安全修复，以及 Vault 集成，共同表明社区不再接受“沙箱替你决定一切”，而是要求 **用户可以自主调节安全边界**。这意味着 Agent 平台的安全架构将更接近云原生策略（OPA/PDP 模型）。

- **工具调用可观测性仍是系统最薄弱环节**：工具输出被降级为图片（OpenClaw）、MCP Schema 克隆导致 OOM（Zeroclaw）、大规模工具历史前端白屏（QwenPaw）、`delegate_task` 无恢复路径的硬崩溃（hermes）——**工具调用的整个链路（Schema 定义 → 参数传递 → 结果渲染 → 异常恢复）在每一个环节都存在断裂风险**，这直接影响用户对 Agent 工作流的基础信任，是生态整体最需要优先攻关的基础设施短板。

- **文档/配置体验成为用户流失的隐性杀手**：Zeroclaw 用户直言“slop remains slop”，PicoClaw 新用户按文档配置 GPT 后完全无法工作，OpenClaw 内外网访问配置缺位。当 Agent 能力越来越强，**"第一次就正确运行"的用户体验门槛反而在升高**，项目在追求功能同时需投入同等精力在默认配置的健壮性和文档与行为的一致性上。

---

*报告基于 2026-07-08 各开源项目的公开社区动态生成，所有数据与链接均源自当日日报原文。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

好的，这是根据您提供的 Zeroclaw 项目数据生成的 2026-07-08 项目动态日报。

---

# Zeroclaw 项目动态日报 | 2026-07-08

---

## 1. 今日速览

过去 24 小时内，Zeroclaw 项目社区展现出**极高的开发与讨论活跃度**，共有 **50 个 PR** 和 **23 个 Issue** 被更新。项目正处于核心功能攻坚期，大型 PR（SOP 可视化编辑器、多用户认证）与高优 Bug 修复（MCP 内存泄漏）并行推进。维护者对安全漏洞和严重性能问题的响应非常迅速，但多个用户侧反馈的文档错误和 Web UI 工作流阻断问题仍亟待解决。

- **PR 活跃度：** 极高（50 条更新，41 条待合并）
- **Issues 活跃度：** 高（23 条更新，19 条活跃）
- **安全响应力：** 优秀（RUSTSEC-2026-0204 当日修复）

---

## 2. 版本发布

无。

---

## 3. 项目进展

今日无 PR 被合并的主线记录，但多项关键功能正在快速推向合并状态：

- **核心漏洞修复已就绪：**
  - **MCP 内存泄漏修复：** [`#8817`](https://github.com/zeroclaw-labs/zeroclaw/pull/8817) 针对 `#8642` 的 OOM 问题，通过 `Arc` 共享工具 Schema 对象，消除每次迭代的深拷贝，已提交修复。
  - **日志配置热重载：** [`#8816`](https://github.com/zeroclaw-labs/zeroclaw/pull/8816) 允许守护进程在不重启的情况下应用日志持久化与轮转配置，提升运维体验。
  - **跨平台安全修复：** [`#8818`](https://github.com/zeroclaw-labs/zeroclaw/pull/8818) 快速升级 `crossbeam-epoch` 依赖，消除了 `RUSTSEC-2026-0204` 指针解引用漏洞。关联 Issue [`#8782`](https://github.com/zeroclaw-labs/zeroclaw/issues/8782) 已关闭。

- **功能落地与推进：**
  - **Agent 自主技能管理：** [`#8815`](https://github.com/zeroclaw-labs/zeroclaw/issues/8815) 已被关闭，`skill_manage.create` 动作允许 Agent 将新技能保存为完整的 Bundle，不再依赖松散文件，增强了 Agent 的自修改能力。
  - **SOP 作者工具 Beta 招募：** [`#8590`](https://github.com/zeroclaw-labs/zeroclaw/pull/8590) 作为当前最大体量（XL）的 PR，已开启社区 Beta 测试者招募，标志着 SOP 功能进入验收阶段。
  - **多语言支持完善：** [`#8790`](https://github.com/zeroclaw-labs/zeroclaw/pull/8790) 同步了多语言 Fluent 翻译文件，确保西语、法语、日语、中文等用户不会因为配置项缺失而回退到英文。

---

## 4. 社区热点

- **SOP 可视化编辑器 Beta 招募（[#8590](https://github.com/zeroclaw-labs/zeroclaw/pull/8590)）：** 这是今日最重磅的号召。`@singlerider` 提交的超大 PR 获得了极高关注，该编辑器支持节点图编辑、多渠道扇形分发和严格的保存验证引擎，项目方直接向社区寻求反馈，气氛热烈。
- **OOM 问题追踪与修复（[#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) / [#8817](https://github.com/zeroclaw-labs/zeroclaw/pull/8817)）：** `#8642` 从 WSL2 OOM 追踪器中拆分出来，专门跟踪“MCP Schema 克隆”导致的 RSS 无界增长。`@JordanTheJet` 提交的 Issue 和 `@IftekharUddin` 的快速修复体现了项目对严重性能问题的重视，该话题吸引了最多开发者关注。
- **ZeroCode TodoWrite 追踪器（[#8639](https://github.com/zeroclaw-labs/zeroclaw/pull/8639)）：** 这个 XL 体量的 PR 实现了类似 Claude Code 的任务追踪功能，为 ZeroCode 增加了 RPC 和持久化能力，展现了项目在开发者工具链上的野心。

---

## 5. Bug 与稳定性

今日收到了大量 Bug 报告，部分问题严重影响用户体验，但尚未出现对应的修复 PR。

| 严重度 | 问题描述 | 状态 |
|---|---|---|
| **S1 (阻塞)** | **Web Dashboard 中止 Agent 导致上下文丢失** [`#8794`](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) | 待解决。用户代码执行中途停止，所有历史思考与工具调用记录被清空，工作流被严重阻塞。 |
| **S2 (降级)** | **Windows 端口残留** [`#8800`](https://github.com/zeroclaw-labs/zeroclaw/issues/8800) | 待解决。`zeroclaw` 进程被杀后端口无法释放，新守护进程启动失败，影响 Win 用户日常使用。 |
| **S2 (降级)** | **技能工具绕过安全策略** [`#8787`](https://github.com/zeroclaw-labs/zeroclaw/issues/8787) | 待解决。`register_skill_tools` 未检查 `SecurityPolicy`，导致 `allowed_tools` 过滤失效，威胁安全配置基线。 |
| **S2 (降级)** | **广告的工具集与注册表不匹配** [`#8804`](https://github.com/zeroclaw-labs/zeroclaw/issues/8804) | 待解决。技能系统提示词渲染的逻辑与实际注册逻辑有偏差，可能导致模型尝试调用不存在的工具。 |
| **S2 (降级)** | **文档/配置错误** (Telegram) [`#8810`](https://github.com/zeroclaw-labs/zeroclaw/issues/8810) [`#8797`](https://github.com/zeroclaw-labs/zeroclaw/issues/8797) | 待解决。多位用户反馈文档与实际 CLI 行为不符，新用户上手成本高。 |
| **S2 (降级)** | **MCP Schema 克隆 OOM** [`#8642`](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) | **已修复**。`#8817` 已提交修复。 |
| **S3 (轻微)** | **Web UI 侧边栏问题** (缺少导航/宽度) [`#8791`](https://github.com/zeroclaw-labs/zeroclaw/issues/8791) [`#8792`](https://github.com/zeroclaw-labs/zeroclaw/issues/8792) | 待解决。UI 细节打磨尚未排入优先级前部。 |

---

## 6. 功能请求与路线图信号

- **实时多模态交互（[#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780)）：** 社区提出“Gemini Live”式原声语音通道功能请求，允许模型主导音频与打断，这表明项目已将**实时多模态交互**纳入远期规划，可能成为 v0.9 的亮点。
- **架构整合信号（[#8798](https://github.com/zeroclaw-labs/zeroclaw/issues/8798) / [#8803](https://github.com/zeroclaw-labs/zeroclaw/issues/8803)）：** 提议合并 `/ws/chat` 和 `/acp` 协议、折叠已完成聊天步骤等功能，表明开发者在推进大功能的同时，已开始着手后端架构打通和前端交互体验的深度优化。
- **零配置安全加固（[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)）：** 关于高风险 Shell 命令“逐次确认”的 RFC，已经进入“已接受”状态且优先级为 P1。这预示着项目将在下一版本中引入类似 Claude Code 的命令执行策略，极大增强企业级安全性。

---

## 7. 用户反馈摘要

- **对核心工作流的不满：**
  - `#8794` 的报修（中止 Agent 丢失上下文）被用户视为**S1 级工作流阻塞**。用户表示“整个步骤从未发生过”，这种体验直接削弱了对 Web Dashboard 的信任。
- **对文档准确性的尖锐批评：**
  - 用户 `@cr3a7ure` 在 [`#8810`](https://github.com/zeroclaw-labs/zeroclaw/issues/8810) 中言辞激烈地指出：“如果不正确实现，屎终究是屎（slop remains slop）”，强烈抨击了 Telegram 示例的文档错误。这警示项目组需立刻审查近期发布的文档与 CLI 行为一致性。
- **对社区协作的肯定：**
  - 社区对 `#8590`（SOP Beta 招募）和 `#8639`（ZeroCode TodoWrite）等大型 PR 展现出了极大的参与热情，表明核心贡献者对项目发展方向持积极态度。

---

## 8. 待处理积压

以下标注 P1/P2 的重要 Issue 长期未得到合并或实质性推进，建议维护团队重点关注：

- **🔥 [`#7155`](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) [RFC] Shell命令逐次确认层 (P1, 已接受):** 自 6 月提交以来已静置超一个月，作为高优先级 RFC，社区期待其进入开发阶段。
- **🔥 [`#8642`](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) [Bug] MCP Schema 克隆 OOM (P1):** 虽有修复 PR，但尚未合并。务必追踪合并状态，以防回归。
- **⚠️ [`#8519`](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) [Tracker] wasmtime-wasi CVE 修复 (P1, 进行中):** 安全漏洞积压是长期隐忧，22 个 RustSec 告警等待处理，需保持关注。
- **⚠️ [`#8314`](https://github.com/zeroclaw-labs/zeroclaw/issues/8314) [Feature] 日志配置热重载 (P2, 已接受):** 运维刚需，虽有 PR `#8816` 但尚未合并，运维人员仍在等待。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

好的，这是根据您提供的 GitHub 数据生成的 PicoClaw 项目动态日报。

---

## PicoClaw 项目动态日报 | 2026-07-08

### 1. 今日速览
- **总体活跃度：中等偏高。** 过去24小时内共有7条Issues和4条PR被更新，整体协作活跃。
- **功能重构与安全并进：** DeltaChat 适配器经历大规模重构（#3222），同时社区贡献者主动修复了 `write_file` 工具的指令污染问题（#3226），项目正朝更健壮、更安全的方向迭代。
- **关键风险暴露：** 昨日新增了一个严重 Bug（#3232），当未配置 fallback 模型时，速率限制（RPM）完全失效，直接影响系统在高并发下的稳定性，需重点关注。
- **积压问题有待响应：** 约5个 open 的 Issues 已被标记为 `stale` 且长期无维护者回复，社区对特定 Bug（如 #3153 工具调用泄露）的修复呼声较高。

### 2. 版本发布
（无）

---

### 3. 项目进展
- **ADB 远程工具实验性合并：** PR [#3157](https://github.com/sipeed/picoclaw/pull/3157) 由 @danmobot 提交并已关闭（合并）。该功能使得 PicoClaw 可以通过 Android ADB 接口对设备进行截图、UI 分析、轻触和滑动等远程操作，标志着项目在移动端设备控制路线上的重要起步。
- **写入安全增强（待合）：** PR [#3226](https://github.com/sipeed/picoclaw/pull/3226) 修复了 `write_file` 工具的一个重要安全隐患。此前该工具的防覆盖提示可能会“教唆”AI模型对已存在文件进行破坏性写入，此PR通过重构提示词逻辑显著提升了 Agent 操作的安全性。
- **DeltaChat 架构清洗与兼容性保障：**
    - PR [#3222](https://github.com/sipeed/picoclaw/pull/3222) 对 DeltaChat 集成进行了大刀阔斧的清理（-320LOC），移除了废弃的密码配置和旧版测试。API 发生了调整，如 `invite_link` 重命名为 `join_invite_link`。
    - 紧随其后，@yaotukeji 提交了 PR [#3233](https://github.com/sipeed/picoclaw/pull/3233) 以修复该重构引入的向后兼容性问题，显示出项目组对生产环境稳定性的重视。

---

### 4. 社区热点
- **热议焦点：速率限制配置严重 Bug**
  Issue [#3232](https://github.com/sipeed/picoclaw/issues/3232) 由 @VictorSu000 紧急提交，指出当用户仅配置 `agents.defaults.model_name` 而未设置 `fallback_models` 时，该模型的 RPM 速率限制完全失效。该问题直接影响系统的过载保护机制，虽然暂未产生大量讨论，但严重性最高。

- **长期痛点：火山引擎工具调用泄露**
  Issue [#3153](https://github.com/sipeed/picoclaw/issues/3153) 收获了 3 条评论，用户 @ms8great 详细描述了 `doubao-seed-2.0-pro` 模型在使用中的一致性问题——工具调用结果会以原始 `<seed:tool_call>` 标签形式返回，导致 Agent 无法解析。这是一个典型的非 OpenAI 厂商兼容性难题，已被标记为 `stale` 但仍未解决。

- **被关闭的呼声：去中心化通信网关**
  Issue [#3093](https://github.com/sipeed/picoclaw/issues/3093) 虽因 `stale` 自动关闭，但其 5 条评论和 1 个点赞表明社区对集成 SimpleX 或 Tox 等非标准通信协议仍有潜在需求。

---

### 5. Bug 与稳定性
- **[严重] 速率限制配置失效**：[#3232](https://github.com/sipeed/picoclaw/issues/3232) 在无 fallback 模型时，RPM配置完全不生效（v0.3.1）。**目前无 Fix PR**，建议立即评估。
- **[中] 火山引擎工具调用错误**：[#3153](https://github.com/sipeed/picoclaw/issues/3153) 工具调用结果以未经处理的 XML 标签形式泄漏，导致 Agent 功能异常。**目前无 Fix PR**，此前已被标记为 `stale`。
- **[中] NanoKVM 平台集成故障**：[#3195](https://github.com/sipeed/picoclaw/issues/3195) 用户在 NanoKVM 上配置 GPT 后，所有交互均失败，默认配置文档可能失效。**目前无 Fix PR**。
- **[中] OAuth 登录问题**：[#3196](https://github.com/sipeed/picoclaw/issues/3196) / [#3197](https://github.com/sipeed/picoclaw/issues/3197) 反馈 Codex 和 Antygravity 的 OAuth 登录无法工作（v0.2.9）。**目前无 Fix PR**。
- **[低/已修复待合] 写入文件提示词污染**：[#3226](https://github.com/sipeed/picoclaw/pull/3226) 已由社区贡献者修复，正在等待合并。

---

### 6. 功能请求与路线图信号
- **DeltaChat 将成为一等公民：** 通过 PR [#3222](https://github.com/sipeed/picoclaw/pull/3222) 和 [#3233](https://github.com/sipeed/picoclaw/pull/3233) 的密集提交可以看出，维护者正在大力投入 DeltaChat 的改造。这暗示着在下一个核心版本（如 v0.3.x）中，PicoClaw 将把基于邮件的去中心化通信作为重点交互界面来打磨。
- **设备控制原生支持：** PR [#3157](https://github.com/sipeed/picoclaw/pull/3157) ADB 工具的合并，标志着项目开始涉足**实体设备（尤其是移动设备）的自动化控制**。这可能是未来扩展 IoT 或 KVM 场景的信号。
- **安全性成为社区共识：** 从 #3226 的快速提交来看，社区对 AI Agent 的安全护栏（如防止文件误覆盖）非常在意，这将成为项目后续版本迭代中需要持续关注的设计原则。

---

### 7. 用户反馈摘要
- **核心痛点：配置即坑**
  - “我按照文档配置了 GPT-5.4，结果 PicoClaw 根本不工作。” —— @rtadams89 (#3195)
  - “我只设了一个模型，没设 fallback，结果 RPM 限速就失效了。” —— @VictorSu000 (#3232)
  说明当前的默认配置引导对新用户和特定环境（如 NanoKVM）不够友好，容易造成上手失败。

- **Agent 行为可靠性存疑**
  - “我让它查法国新闻，它却在回答里把美国新闻又做了一遍。” —— @oKatTjC (#3159)
  这种重复执行任务的 Bug 直接影响用户对任务编排准确性的信任。

- **特定提供商兼容性差**
  用户表示使用火山引擎、Codex 等非 OpenAI 标准厂商时，工具调用和 OAuth 频繁出错。这提示项目组需要扩展 Provider 兼容性测试矩阵。

---

### 8. 待处理积压
以下问题均已被标记为 `stale`，但长期缺乏维护者响应，建议优先评审：

- **[#3153](https://github.com/sipeed/picoclaw/issues/3153)：Volcengine 工具调用泄露**（创建于 2026-06-22）。高优 Bug，影响特定用户的 Agent 核心功能，但目前没有维护者评论。
- **[#3195](https://github.com/sipeed/picoclaw/issues/3195)：NanoKVM 平台 OpenAI 不可用**（创建于 2026-06-30）。该功能是 NanoKVM 2.4.0 力推的新特性，不可用会严重影响该渠道的推广。
- **[#3196](https://github.com/sipeed/picoclaw/issues/3196) / [#3197](https://github.com/sipeed/picoclaw/issues/3197)：Codex/Antgravity OAuth 登录失败**（创建于 2026-06-30）。

此外，昨日新提交的 **[#3232](https://github.com/sipeed/picoclaw/issues/3232)（速率限制失效）** 虽然还未被标记为 `stale`，但考虑到其潜在的破坏性，建议维护者将其优先级提至最高，作为今日紧急事项处理。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

好的，这是根据 QwenPaw 项目 (github.com/agentscope-ai/qwenpaw) 截至 2026-07-07 的数据生成的 2026-07-08 项目动态日报。

---

### QwenPaw 项目动态日报 | 2026-07-08

---

### 1. 今日速览

过去 24 小时，QwenPaw 项目保持极高的开发活跃度，**v2.0.0 与 v1.1.x 两条线并行推进**。社区围绕 v2.0.0-beta.3 版本展开了密集测试，反馈了大量 Bugs 和功能建议。今日共产生 **38 个 PR 更新**（15 个已合并/关闭），**17 个 Issues 更新**（4 个已关闭）。项目维稳压力较大，但在核心安全修复（如 `find -delete` 绕过文件卫士）和功能迭代（如插件系统、桌面端）上响应迅速，整体项目健康度处于**高强度迭代但 Bug 集中暴露**的阶段。

---

### 2. 版本发布

- **v2.0.0-beta.3**: 正式发布，主要包含 CI 脚本兼容性修复（macOS Bash 3.2）及认证模块的增强限流保护。紧接着 **v2.0.0b4 的版本号已合入**（PR [#5837](https://github.com/agentscope-ai/QwenPaw/pull/5837)），暗示下一个预发布版本即将推出。
- **v1.1.12.post3**: 稳定版补丁发布，其安装验证工单 ([#5819](https://github.com/agentscope-ai/QwenPaw/issues/5819)) 已于昨日关闭。建议生产环境用户关注此版本。
- **迁移注意**：v2.0.0-beta.3 暂无明确列出的破坏性变更，但自动记忆（Auto-memory）存在严重功能回归（见 [#5775](https://github.com/agentscope-ai/QwenPaw/issues/5775)），Beta 用户升级需谨慎。

---

### 3. 项目进展

过去 24 小时，项目在多条核心战线上取得显著进展：

- **插件系统重大突破**：PR [#4693](https://github.com/agentscope-ai/QwenPaw/pull/4693) (**已合并**)。废除了旧的 `custom_channels/` 目录机制，全面转向插件式频道注册系统，支持 Schema 驱动自动生成配置 UI。这是 v2.0.0 架构的核心升级。
- **Memory 系统迭代**：PR [#5820](https://github.com/agentscope-ai/QwenPaw/pull/5820) (**已合并**)，增强了自动记忆搜索的计费与会话对齐能力；PR [#5669](https://github.com/agentscope-ai/QwenPaw/pull/5669) 正尝试引入 `qwen3-rerank` 精排，目前已进入 Review 阶段。
- **桌面端体验升级**：PR [#5836](https://github.com/agentscope-ai/QwenPaw/pull/5836)（新增）支持聊天输出中自动识别本地路径，点击可直接打开文件管理器；PR [#5814](https://github.com/agentscope-ai/QwenPaw/pull/5814) 则着手为 ACP 桌面版捆绑 Node 运行时。
- **稳定性修复合辑**：PR [#5786](https://github.com/agentscope-ai/QwenPaw/pull/5786) (**已合并**) 一次性修复了跨 Provider 模型匹配、Token 计数及文件读取等三个 Bug。
- **渠道与模型适配**：PR [#5585](https://github.com/agentscope-ai/QwenPaw/pull/5585) (**已合并**) 为 Matrix 频道添加了流式回复功能；PR [#5827](https://github.com/agentscope-ai/QwenPaw/pull/5827) (**已合并**) 修复了 Gemini 工具的 Schema 校验问题；PR [#5823](https://github.com/agentscope-ai/QwenPaw/pull/5823) （新增）着手修复飞书推送帖文中 Markdown 图片无法渲染的问题。

---

### 4. 社区热点

- **[#5401] Console 由大型工具调用历史导致的崩溃白屏：最热 Bug**
    - 链接: [https://github.com/agentscope-ai/QwenPaw/issues/5401](https://github.com/agentscope-ai/QwenPaw/issues/5401)
    - 当前共有 15 条评论，是高复现率的体验问题。用户分析指出根因是后端 API 将 `tool_use` 数据块转换为了前端无法处理的 `type: “data”` 格式。此 Issue 与 **[#5479](https://github.com/agentscope-ai/QwenPaw/issues/5479)**（大会话文件 >500KB 崩溃）深度关联，共同指向了前端在大数据量下的渲染架构瓶颈。

- **[#5797] 定时任务结果弹窗的开关之争：功能与体验的博弈**
    - 链接: [https://github.com/agentscope-ai/QwenPaw/issues/5797](https://github.com/agentscope-ai/QwenPaw/issues/5797)
    - 用户明确反对了 PR #4803 一刀切关闭弹窗的做法，直言“千问不要因噎废食，有人反对，就都关掉了”。这体现了社区对“配置优于约定”的强烈诉求，希望获得功能开关的自主权。

- **[#5273] v2.0.0 预发布版本问题集中跟踪**
    - 链接: [https://github.com/agentscope-ai/QwenPaw/issues/5273](https://github.com/agentscope-ai/QwenPaw/issues/5273)
    - 作为 v2.0.0 的中央跟踪 Issue，持续收获 10 条评论，是新版本功能与回归问题的集中讨论区，维护同仁需每日过目。

---

### 5. Bug 与稳定性

- **崩溃/安全（最高优先级）**
    - **[#5829]** [严重] Windows AppContainer 沙箱 ACE 污染系统目录，导致 Hermes Desktop 等 Electron 应用 GPU 进程崩溃。**无修复 PR。**
    - **[#5401]** [严重] Console 大型工具调用历史渲染导致白屏崩溃。**无修复 PR。**
    - **[#5842]** [高] `find -delete` 绕过文件卫士检查（删除风险）。**当日已提修复 PR [#5843]**，响应非常及时。
    - **[#5775]** [高] v2.0.0b3 自动记忆（Auto-memory）因 state 丢失完全不触发。**无修复 PR。**
    - **[#5789]** [高] 上下文压缩（compress_context）因模型输出超 JSON Schema 限制崩溃。**无修复 PR。**
- **功能缺陷（中/低等级）**
    - **[#5835]** [中] `/stop` 命令在钉钉 DM 场景用户隔离失效，导致跨用户取消任务。**无修复 PR。**
    - **[#5759]** [中] 计划模式反复读取同一文件，造成资源浪费。**无修复 PR。**
    - **[#5788]** [低] 技能列表滚动分页失效（因容器 `overflow` 限制）。**无修复 PR。**
- **已修复（今日合并解决）**
    - **[#5827]** Google Gemini 工具参数 `const` 字段导致 pydantic 校验失败。**已合并。**
    - **[#5831]** Tool Result 卸载时未处理 TextBlock 对象。**已合并。**
    - **[#5774]** Google Gemini 渠道报错。**已关闭。**

---

### 6. 功能请求与路线图信号

- **社区高价值需求（可能进入路线图）：**
    - **[#5821] 精细化的媒体拒收能力**：建议将 `rejects_media` 从全局布尔值改为按媒体类型的集合。此改动对多模态 Agent 鲁棒性提升极大，且已有 Active PR 相关，落地概率高。
    - **[#5797] 定时任务弹窗用户开关**：代表性强，可配置性是提升产品成熟度的关键。
    - **[#5312] 桌面端关闭按钮最小化到托盘**：符合平台原生行为，已有桌面增强 PR 在上，建议整合。
    - **[#5785] Coding 模式支持隐藏文件夹**（**已关闭**）：可能是已实现或者通过其他方式解决，需在 Release Notes 中确认是否已支持。
    - **[#5836] 桌面点击路径打开文件资源管理器**：PR 已提交，预计将随下个桌面版本发布。

---

### 7. 用户反馈摘要

- **性能瓶颈**：用户 `samluoabc` 报告超过 500KB 的会话文件直接导致前端崩溃 ([#5479])，这暴露了当前前端架构在处理长上下文时的系统性风险，严重影响重度用户的留存。
- **安全敏感性**：用户 `96loveslife` 对 Windows 沙箱 ACE 深入分析并报告 ([#5829])，展现了社区极高的技术水平和安全敏感性，此 Issue 应优先评估安全风险。
- **产品设计期望**：用户 `happieme` 对弹窗开关的诉求非常具体且理性，代表了沉默的大多数：他们并非讨厌功能，而是讨厌无法被自己控制的功能。
- **真实开发者场景**：用户 `ljw20180420` 直接提出“要在coding模式选隐藏文件夹” ([#5785])，这是 Agent 编写代码访问 `.git` 或 `.env` 等配置的真实痛点。

---

### 8. 待处理积压

以下 Bug 与 PR 长期未得到满足，可能成为开发者与用户推进的前进阻力：

1.  **[#5401] Console 渲染架构 Bug（核心阻塞）**：自 6 月 23 日以来已 15 条评论，是 v2.0.0 测试版体验的“头号公敌”，亟需架构层面介入修复。建议重构前端 `getPrimaryTraceBlock` 组件的数据流处理逻辑。
2.  **[#5669] Memory 引入 Qwen3 Rerank 精排**：6月30日提交，功能价值明确，虽已贴 `Under Review` 标签，但仍需维护者尽快分配 Reviewer 推进合入。
3.  **[#5187] Windows 桌面 GUI 自动化**：6月14日提交的巨型功能 PR（Tauri + UIA），改动量极大，符合产品路线图，但长期处于 Open 状态，可能需要架构师级联席 Review。
4.  **[#5789] 上下文压缩崩溃**：直接导致核心记忆流程断裂，无修复 PR 提案，需优先排查 `jsonschema.validate()` 触发点的健壮性。

---
**报告摘要**：项目当前处于 **v2.0.0 冲刺前的关键测试期**，开发团队反应敏捷（如安全修复），但核心 Bug（特别是前端渲染）与社区诉求的积压依然考验着项目团队的工程调度与架构决策能力。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

好的，我是 Hermes Agent 开源项目的分析师。根据 2026-07-07 的 24 小时数据，现呈上 2026-07-08 的《项目动态日报》。

---

## hermes-agent 项目动态日报 | 2026-07-08

### 1. 今日速览

过去 24 小时项目活跃度极高，社区深度参与了 283 条 Issue 讨论和 500 条 PR 更新。虽然无新版本发布，但项目正处于高强度迭代期：**一方面，** 多项涉及数据安全与运行稳定性的 P1/P2 级别关键 Bug 被成功修复（如终端快照泄漏 Secret、网关记忆丢失、MCP 子进程泄漏）；**另一方面，** 社区贡献了大量新功能和原型代码，尤其是在**多 Agent 编排（ACP 通用化）**和**桌面端瘦客户端化**方向上的呼声达到了新高。值得注意的是，随着重构（如 Projects 范式）的推进，也暴露了少量破坏用户原有工作流的回归问题，需警惕。

### 2. 版本发布

今日无新版本发布。

### 3. 项目进展

今日项目向前迈进了重要一步，主要集中在安全加固与核心架构 Bug 修复：

- **安全加固（已合并/关闭）**：
    - **终端快照泄漏 Secret (#48441, P1)**：修复了 `cache/terminal/hermes-snap-*.sh` 将 `.env` 明文写入磁盘的安全漏洞。这是一个至关重要安全修复。
    - **网关审批队列安全 (#60495, P2)**：提交了将审批队列范围限定为 `(session_key, user_id)` 的修复，以阻止共享会话中的跨用户劫持攻击。目前待合并。
    - **Wecom 跨 Profile 凭证泄漏 (#59674, P2)**：提交了修复，将 `WEIXIN_TOKEN` 的读取方式从 `os.getenv` 替换为 Profile 作用域的 `get_secret`，防止多租户模式下信息串读。目前待合并。

- **稳定性修复（已合并/关闭）**：
    - **MCP 子进程泄漏 (#59705 / #59435, P2)**：修复了 MCP stdio 子进程在握手失败或挂起时未被清理并导致进程泄漏的问题，强化了 MCP 生态的健壮性。
    - **网关默丢失失 (#51646, P1)**：修复了 `INSERT` 语句遗漏 `active` 字段，导致网关侧所有平台对话历史丢失的严重 Bug。
    - **输出长度截断 (#7237)**：解决了长文本生成时 `Response truncated due to output length limit` 的报错问题。
    - **Windows 重启链 (#36960)**：解决了 Windows 环境下网关 `/restart` 命令的遗留问题。

- **新功能落地（提交/待合并）**：
    - **用户可配置运行时审批 (#51221)**：已合并，允许用户更精细地控制敏感操作拦截。
    - **目标状态规划技能 (#60531)**：提交了 V1 版规划技能，赋予 Agent 追踪目标差距的能力。
    - **仪表盘拓扑报告 (#60537)**：Dashboard 的 `/api/status` 将支持报告 Profile 和网关拓扑结构，提升运维可观测性。
    - **VPS 磁盘清理技能 (#50598)**：社区贡献的自动化运维技能，安全清理系统老化快照和日志。

### 4. 社区热点

今日讨论最活跃、反响最强烈的议题集中在对项目未来架构的预期上：

- **🔥 [Feature] 桌面端瘦客户端呼声极高 (Issue #38602, 42 👍)**
用户 `@diegohb` 提出：“目前的桌面端总会强制引导运行时，我们应该能选择将其作为纯客户端连接远端 Hermes 服务。” 该诉求获得了 **42 个 👍**，配合 #36970 的讨论，表明社区对于“远程客户端”架构有着极为迫切的需求。

- **🔥 [Feature] 通用化 ACP 编排器 (Issue #5257, 18 👍)**
用户 `@flowforgelab` 强烈建议将现有的受限 ACP 客户端泛化。社区期望 Hermes 未来能进化成“Agent 的 Agent”，统一调度 Claude Code、SWE-agent 等各类遵循 ACP 协议的开发者工具。

- **💬 [Feature] Linear平台适配器 (Issue #5826, 8 👍)**
用户 `@thomasnormal` 希望在 Project Management 工具（Linear）的 Issue 评论中直接 @Hermes 来处理 Bug 追踪和工作流。

- **💬 [Performance] 工具预选机制 (Issue #13332)**
用户 `@jack2684` 提出了 RAG 风格的工具预选方案，旨在解决当前超大规模工具集带来的固定 Token 冗余（测得默认 CLI 30+ 工具约 1.4 万 Token）。

- **💬 [Performance] 模型级压缩阈值 (Issue #18733)**
随着百万 Token 级别模型的普及，用户 `@tizerluo` 认为单靠全局压缩阈值过于死板，需支持对不同 Provider 单独配置压缩策略。

### 5. Bug 与稳定性

- **[已修复 / High]**
    - **终端快照泄漏 Secret** (P1, #48441) ✅ Closed
    - **网关发送记忆丢失** (P1, #51646) ✅ Closed
    - **WhatsApp 桥接安装超时** (P1, #14980) ✅ Closed

- **[待修复 / High - P2]**
    - **`delegate_task` Schema 导致硬崩溃** **（#59386）**：使用严格遵循 OpenAI 协议的第三方代理时，`delegate_task` 函数 Schema 会导致 HTTP 400 且**无恢复路径**，直接杀死 Agent Session。这是一个近期暴露的高风险兼容性问题。
    - **Fallback 链不重制** **（#57582）**：`_fallback_index` 在 Provider 恢复后不会被重制，导致灾备机制单次触发即静默失效，严重影响高可用配置。
    - **Google-antigravity 遗留集成问题** **（#50530）**：子代理崩溃、400错误、并发掉线，严重影响这部分用户的深度使用体验。
    - **Projects 范式破坏工作流** **（#53004）**：重构 `#49037` 破坏了原有的“选文件夹→开会话→侧边栏同步”的用户习惯，用户反馈工作流已断。
    - **Desktop 无法加载预填充消息** **（#60496）**：桌面端后台忽略了 `prefill_messages_file` 配置。

- **[待修复 / Medium - P3]**
    - Photon iMessage 完全宕机 (#55416)
    - 桌面端 PageUp 导致布局挤压 (#49978)
    - 删除 Provider 后模型选择器残留 (#55790)

### 6. 功能请求与路线图信号

结合近期开放的 PR，以下功能请求信号强烈，可能成为下一阶段开发重点：

- **多租户与多 Agent 协同**：
    - `#34352` (Solving Multi-Tenant) 讨论了高层架构问题，指出内存操作绕过 Hook 是隔离的难点。
    - `#5257` (通用ACP) 则给出了具体的技术路径。这指向了项目在 **Agent 编排**领域的雄心。

- **桌面端 Next Gen**：
    - `#38602` (瘦客户端) 和 `#36970` (远程客户端引导) 暗示社区强烈倾向桌面端只作为图形界面前端，计算与存储下沉到远端 Daemon。

- **Provider 生态扩展**：
    - Google Vertex AI (#13484) 呼声不减。
    - MoA 虚拟供应商 (#60521) 已修复探测问题，这一混合模式正走向成熟。

- **网关能力深化**：
    - Telegram 多 Profile 路由 (#40173) 提出单 Bot 通过 Profile 切换服务不同群组。
    - WhatsApp 回访模板 (#45935) 以满足 24 小时窗口外的业务触达需求。
    - Discord 语音超时退出 (#60539) 提供可配置性。

### 7. 用户反馈摘要

- **😠 痛批重构回归**：用户 `@vykhovanets` 在 `#53004` 中的措辞非常直接：“PR #49037 (Projects) broke the previously working unidirectional workflow... right sidebar shows ‘no project open’”。这是典型的激进重构导致日常体验割裂的案例。
- **😠 配置失效的挫败感**：用户 `@swarthyplacebo` 在 `#57582` 指出 Fallback 链不会随主 Provider 恢复而重制，“mid-session exhaustion silently disables failover”。这种“静默失效”对依赖高可用的用户构成了信任危机。
- **😊 社区力量体现**：用户 `@indigokarasu` 贡献的 VPS 清理技能 (#50598) 和用户 `@benlloydg` 贡献的目标规划技能 (#60531)，以及用户 `@necoweb3` 提交的审批队列安全修复 (#60495)，充分展示了社区的贡献活力和开发者对项目底层安全与功能扩展的深入参与。
- **🤔 连接诡异失败**：用户 `@seguelaCedric` 在 `#38061` 中汇报了一个难以排查的 Tailscale 问题——测试连接成功但实际连接失败，这可能涉及网络协议层或路由配置的边界情况。

### 8. 待处理积压

- **⚠️ [待决策架构] 通用化 ACP 客户端 (#5257)**
此问题已标记 `needs-decision`。维护者需要明确：是否支持 Claude Code / SWE-agent 作为被编排对象？这决定了 Hermes 在 AI 工具链中的定位。

- **⚠️ [高优未响应 Bug] `delegate_task` 硬崩溃 (#59386)**
该 Bug 生命周期极短（仅1天）但有 **5 条评论且等级为 P2**，风险高（无恢复路径），目前无关联 PR。需要研发核心团队紧急介入评估。

- **⚠️ [积压 Bug] Fallback 链不重制 (#57582)**
Bug 提出 4 天，尚无修复 PR，影响了核心灾备能力。

- **⚠️ [未合并安全 Fix] 跨用户审批劫持 (#60495) & Wecom 凭证泄漏 (#59674)**
两标题均带 `sweeper:risk-security-boundary` 标签，为自动扫描发现的 P2 级安全问题。已提交的 PR 需要尽快 Review 与合并。

- **⚠️ [长期悬置] Vertex AI Provider (#13484)**
存在已近 80 天，目前仍缺少 Google 服务账号认证体系。如果该项目在路线图上，建议倒排期。

- **⚠️ [社区强推] 桌面端瘦客户端 (#38602)**
获得 **42 个 👍**，是当前社区体感最强的功能诉求，值得纳入 0.5 或 0.6 里程碑讨论。

</details>

---
*本日报由 [Big Model Radar](https://github.com/w409401768/big_model_radar) 自动生成。*