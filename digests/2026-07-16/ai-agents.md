# OpenClaw 生态日报 2026-07-16

> Issues: 483 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-07-15 22:48 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

好的，这是为您生成的 OpenClaw 项目动态日报。

---

## OpenClaw 项目动态日报 (2026-07-16)

### 1. 今日速览
过去 24 小时内，OpenClaw 项目延续了极高的社区活跃度：共产生 483 条 Issue 更新与 500 条 PR 更新，并发布了 v2026.7.2-beta.1 版本。尽管新版带来了远程编码会话等重磅特性，但社区焦点仍集中在 v2026.7.1 引入的严重稳定性问题上。当前项目处于“特性高速迭代”与“历史遗留迁移冲突”并存的阵痛期：上百条 P0/P1 级 Bug 被密集汇报，同时社区贡献者提交了海量修复补丁，项目整体处于高压力、高效率的“紧急修复 + 版本迭代”模式。**项目健康度评估：活跃但存高风险，维护者需优先解决升级阻断和核心工具回归问题。**

---

### 2. 版本发布
**v2026.7.2-beta.1** 已于今日发布。

- **核心更新亮点**：
    - **远程编码会话：** 允许用户在云端 Worker 上运行 Control UI 会话，或在宿主终端直接打开 Codex/Claude 目录会话，并支持在终端直接恢复 OpenCode 与 Pi 会话。
    - **原生自动化与节点：** 引入了原生自动化和节点功能（Release Notes 截断，具体细节待官方补充）。
- **解读与建议**：该版本很可能是针对 v2026.7.1 系列中大量汇报的“迁移阻塞”和“崩溃循环”问题的紧急响应版本。如果长期运行的用户在 v2026.7.1 上遇到启动失败，建议关注此版本的迁移修复情况。

---

### 3. 项目进展
今日社区贡献者合并/关闭了多项重要 Pull Request，主要集中在以下方面：

- **CI/CD 与基础设施优化：**
    - `#108478` 优化了 Web UI 的浏览器 E2E 测试速度（@steipete）。
    - `#108386` 通过绑定挂载方式显著加速了 CI 中 Node 测试分片的冷启动（@steipete）。
- **渠道适配器修复：**
    - `#108434` 修复了 Zalo 渠道对不支持操作的错误提示（@joshavant）。
    - `#105549` 修复了飞书渠道注册请求超时未被正确传递的问题（@hugenshen）。
    - `#105553` 为 Mattermost 渠道的 WebSocket 握手添加了 30 秒超时限制（@hugenshen）。
- **安全修复：**
    - `#107683`（已关闭）修复了`exec`工具的 `allow-always` 脚本授权无法感知内容变更的漏洞，防止授权脚本被篡改后静默执行。
- **AI 可观测性：**
    - `#107744`（就绪）社区针对 `#82548` 提出的 AI 安全与质量可观测性事件，提交了涉及 Android、Web UI、Gateway、CLI 的多端支持 PR，体现社区对生产级安全监控需求的积极响应。

---

### 4. 社区热点
今日讨论热度最高的议题均围绕 v2026.7.1 版本带来的严重降级体验展开。

- **#104721 [P0, 回归] 所有工具结果返回占位符**
    - **热度：** 17 条评论，1 个 👍
    - **链接：** https://github.com/openclaw/openclaw/issues/104721
    - **分析：** 这是当前最具破坏性的 Bug。执行工具（如读取文件）后，模型收到的输出不是实际内容，而是固定的字符串 `"(see attached image)"`。用户直言“完全坏掉了”（completely broken）。这并非显示问题，而是底层数据传输链断裂。
- **#107227 [P0, UX 发布阻断] 升级 2026.7.1 即崩溃，官方修复工具无效**
    - **热度：** 8 条评论，3 个 👍
    - **链接：** https://github.com/openclaw/openclaw/issues/107227
    - **分析：** 大量长期运行的用户升级后，网关在启动迁移阶段报错并陷入崩溃循环。更严重的是，官方推荐的 `openclaw doctor` 命令无法解决该冲突，且官方文档未提供有效的救急方案，导致用户完全“卡死”在当前版本。此问题折射出当前迁移守卫（guard）逻辑的设计缺陷。
- **#107449 [P1, 回归] cron 工具 JSON Schema 与 llama.cpp 不兼容**
    - **热度：** 10 条评论，3 个 👍
    - **链接：** https://github.com/openclaw/openclaw/issues/107449
    - **分析：** `cron`工具的 Schema 中包含了 `"\S"` 正则，与 llama.cpp 的最新工具解析器冲突。这影响了所有使用本地大模型（如 llama.cpp 后端）的用户，导致内置调度功能完全不可用。这是一个典型的模型兼容性回归。
- **#94518 [P1] 升级 6.x 后 DeepSeek 缓存命中率从高位跌至 10% 以下**
    - **热度：** 9 条评论，10 个 👍
    - **链接：** https://github.com/openclaw/openclaw/issues/94518
    - **分析：** 用户在升级到 6.x 版本后发现 DeepSeek 的 prompt 缓存命中率急剧下降，直接导致 API 调用成本飙升和响应速度减慢。根因被指向“边界感知缓存”（boundary-aware caching）机制破坏了前缀匹配。这代表了因架构调整引发的性能与成本倒退。

---

### 5. Bug 与稳定性
今日报告的 Bug 严重程度极高，需团队立即介入。

- **P0 严重/崩溃/Ux 发布阻断**
    - **[崩溃循环]** `#107694` 网关因严格的 `startupMigrationWarnings` 守卫导致启动失败；`#107220` 旧版记忆索引冲突导致崩溃；`#103076` 遗留状态迁移仍有多个源头阻塞启动。多条 Issue 指向 v2026.7.1 的迁移逻辑“宁可错杀不可放过”。
    - **[核心功能损坏]** `#104721` 所有工具返回占位符，完全破坏了 Agent 的工具使用能力。
    - **[更新崩溃]** `#107330` Windows 用户执行 `openclaw update` 时直接崩溃。

- **P1 高优/回归/数据丢失**
    - **模型兼容性：** `#106779` llama.cpp 模板解析器生成彻底失败；`#92769` MiniMax M3 推理详情（reasoning）被完全丢弃。
    - **消息路由：** `#85103` 提供者配额耗尽后，配置的模型降级链不触发；`#90944` `sessions_yield` 回复记录但未投递，导致用户收到错误摘要。
    - **渠道交互：** `#96834` WhatsApp 图片消息会卡住通道约 3 分钟后才开始处理；`#102020` 新会话第二条消息必然因“初始化冲突”失败。

---

### 6. 功能请求与路线图信号
- **智能多模型路由 (#107686)**
    - 链接：https://github.com/openclaw/openclaw/issues/107686
    - 用户明确要求按任务自动调配模型（如视觉用特定模型，代码调试用前沿模型）。这反映了用户在生产化部署中对成本和效率的精细化控制需求。
- **AI 安全与质量可观测性 (#82548)**
    - 链接：https://github.com/openclaw/openclaw/issues/82548
    - 今日已提交对应的大型 PR `#107744`，涵盖多端集成。预计该功能将进入下一个版本的开发主线，为开发者提供模型注入、工具策略、用户反馈等监控指标。
- **记忆生命周期管理 (#87660)**
    - 链接：https://github.com/openclaw/openclaw/issues/87660
    - 用户希望 `MEMORY.md` 具备生命感知的 LLM 管理能力，避免关键记忆被自动淘汰，或构建持久锚点。该请求热度较高，指向了 Agent 长期记忆机制的痛点。
- **exec 操作黑名单 (#6615)**
    - 链接：https://github.com/openclaw/openclaw/issues/6615
    - 用户希望在现有的白名单模式上增加黑名单支持，以实现“允许所有除 X 之外”的安全策略。该请求自二月以来一直处于等待产品决策状态。

---

### 7. 用户反馈摘要
- **“升级即地狱”：** 大量用户在升级 v2026.7.1 后遭遇不可恢复的崩溃。
    - *原文：* “gateway crash-loops with no documented remedy”（#107227）
    - *原文：* “This is completely broken”（#104721）
- **“体验降级”：** 新的迁移守卫逻辑和缓存机制给日常用户带来了困扰。
    - *反馈：* 升级后 DeepSeek 缓存命中率暴跌（#94518）。
    - *反馈：* `cron`工具在本地模型上无法使用（#107449）。
- **“核心功能失灵”：** WebChat 历史记录无法保存、WhatsApp 处理图片挂起、Telegram 发信后丢消息等问题严重影响了用户在核心聊天渠道上的体验。

---

### 8. 待处理积压
以下为长期存在的高优先级 Issue 与 PR，但当前仍处于等待维护者决策或需要更多信息的状态，提醒团队关注：

- **等待产品/维护者决策 (Needs Product Decision / Maintainer Review)**
    - `#80040` [P1, 05-10] 提供者 OAuth 失效、占位符回复及重复工具执行级联故障。
    - `#77012` [P1, 05-04] WebChat 会话转录每次对话均被覆盖，导致刷新后历史全丢。
    - `#75621` [P1, 05-01] 网关重复生成相同配置的 stdio MCP 子进程，造成内存与 CPU 泄漏。
    - `#11665` [P2, 02-08] Webhook 文档声称支持多轮对话，但实际 `sessionKey` 从未复用。
- **大型 PR 等待审核**
    - `#107744` [P2] AI 安全可观测性功能的大幅改动，涉及多端代码。
    - `#106840` [P1] 修复订阅制 Claude CLI 场景下记忆召回因计费被拒而失效的问题，影响范围极广。
- **等待用户补充信息 (Needs Info)**
    - `#106779` [P1, 07-13] 2026.7.1 在 macOS 上与 llama.cpp 的崩溃问题，用户已提供环境信息。
    - `#93139` [P2, 06-15] `write` 工具和 `exec` heredoc 写入字面 `\n` 而非换行符。

---

## 横向生态对比

# 个人AI智能体开源生态横向对比分析报告（2026-07-16）

---

## 1. 生态全景

当前个人AI助手与自主智能体开源生态正处于**规模化落地与阵痛期并存**的节点。头部项目（OpenClaw、hermes‑agent）每日产生超500条Issue/PR，表明社区参与深度极高，但**版本升级引发的兼容性问题与核心功能回归**成为普遍挑战。多个项目集中进入大版本后的稳定性修复阶段（OpenClaw v2026.7.x、QwenPaw v2.0），开发重心正从功能堆砌转向**生产级可靠性、可观测性与安全管控**。同时，平台化与插件生态化（hermes‑agent、AstrBot）已从路线图讨论进入代码实施，标志着生态正从单体Agent向开放平台演进。

---

## 2. 各项目活跃度对比

| 项目 | Issue活动数① | PR活动数② | 版本发布 | 健康度评估 |
|------|-------------|----------|---------|-----------|
| **OpenClaw** | 483条更新 | 500条更新 | v2026.7.2-beta.1 | 高度活跃但存高风险，升级阻断与核心工具回归待解 |
| **hermes-agent** | 500条（新开169，关闭331） | 500条（待合并447，合并/关闭53） | 无 | 极高活跃，但合并吞吐量严重滞后（89%积压） |
| **QwenPaw** | 约50条（新开18，关闭32） | 43条（合并/关闭22） | 无 | 快速修复v2.0稳定性问题，响应积极 |
| **AstrBot** | 21条（新开6，关闭15） | 22条（合并10） | 无 | 高度活跃，修复与功能增强密集落地 |
| **Zeroclaw** | 22条（新增/活跃21，关闭1） | 50条（待合并49，关闭1） | 无 | 功能开发与质量巩固并行，S1 Bug修复有待加速 |
| **PicoClaw** | 6条（新开3，关闭3） | 少量（0合并） | 无 | 中等活跃，v0.3.1后进入社区测试反馈期 |

① 24小时内所有Issue更新（新开、评论、关闭等）总量；② 24小时内所有PR更新总量。

**关键洞察**：OpenClaw与hermes‑agent活动量同级但性质不同──前者集中在紧急Bug反馈，后者体现在大量贡献待合并。QwenPaw与AstrBot虽规模较小，但合并/关闭率高，团队响应更敏捷。

---

## 3. OpenClaw 在生态中的定位

- **规模领先**：Issue/PR日更新量500左右，是其他项目的5‑50倍，社区覆盖面最广，频道适配、工具生态、CI/CD基础设施最为完整。
- **优势**：功能迭代速度极快（远程编码会话、原生自动化），CI优化显著（E2E测试提速、Node分片冷加速），安全性（exec授权感知内容变更）和可观测性（AI安全事件）已进入实施阶段。
- **技术路线差异**：采用“大统一框架”策略，单项目覆盖网关、Worker、CLI、多端UI、自动化节点，复杂度高；相比之下，QwenPaw更侧重Agent合作与记忆，hermes‑agent更注重平台化与仪表盘，AstrBot聚焦多消息渠道集成。
- **社区情绪**：当前处于“因升级导致信任危机”的周期──上百条P0/P1回归Bug（工具占位符、启动崩溃、缓存命中率暴跌）被密集汇报，用户直言“完全坏掉了”。项目健康度被评估为“活跃但高风险”，维护者面临紧急修复与功能迭代的矛盾。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 / 案例 |
|---------|--------|----------------|
| **可观测性 & 监控** | OpenClaw, Zeroclaw, hermes‑agent, AstrBot, QwenPaw | AI安全事件追踪、turn‑level OTel关联、Agent Token环实时更新、Trace系统重写 |
| **记忆生命周期管理** | OpenClaw, QwenPaw, Zeroclaw | 防止关键记忆被自动淘汰（#87660）、v2.0升级后“失忆症”（#6148）、会话历史与长期记忆架构分离（#9048） |
| **多模型兼容性** | OpenClaw, Zeroclaw, QwenPaw, hermes‑agent, AstrBot | llama.cpp Schema冲突、DeepSeek缓存前缀破坏、kimi‑code流式报错、Qwen多轮推理上下文剥离、Embedding dimensions参数强制发送 |
| **迁移/升级稳定性** | OpenClaw, QwenPaw, hermes‑agent | 升级后崩溃循环（#107227）、v2.0配置映射Bug、Dashboard认证500（#55130） |
| **权限与安全控制** | OpenClaw, Zeroclaw, hermes‑agent, PicoClaw | exec黑名单、工具访问策略（ToolAccessPolicy）、插件作用域审批队列、进程Hook反序列化缺陷 |
| **插件/生态扩展** | hermes‑agent, AstrBot, OpenClaw(Zeroclaw ClawHub) | 插件接口标准化（#64182）、技能市场安全限制、插件动作按钮、MCP注册表持久化 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | hermes‑agent | QwenPaw | AstrBot | Zeroclaw | PicoClaw |
|------|----------|-------------|---------|--------|---------|---------|
| **功能侧重** | 全栈Agent框架（远程编码、自动化、多渠道） | 可扩展代理网关（Dashboard、插件、看板调度） | 多Agent协作、记忆感知对话 | 多平台消息适配、知识库、WebChat | Tool安全与MCP治理、Gateway稳定性 | 轻量化/嵌入式Agent（ARM64, DeltaChat） |
| **目标用户** | 寻求一体化自部署Agent的开发者与团队 | 社区贡献者、高频插件用户、Dashboard重度依赖者 | 需要复杂记忆与Agent协同的中高级用户 | QQ/微信/Telegram等渠道运营者、知识库构建者 | 对安全策略敏感的运维及企业级用户 | 树莓派等边缘设备、嵌入式场景 |
| **技术架构倾向** | 单体+网关+Worker，特性高速迭代 | 模块化+插件化，PR驱动但核心合并缓慢 | 上下文中心、重记忆策略、多Agent编排 | Provider封装+Web UI+适配器分离 | 严格分层策略（ToolAccessPolicy、MCP进程管理） | 极简核心、面积小、依赖外部重构（DeltaChat -200LOC） |
| **当前阶段** | 功能拓张与历史迁移冲突 | 社区贡献爆发，官方合并成为瓶颈 | v2.0发布后紧急修复，快速回稳 | 成熟Provider兼容，功能增强匀速推进 | 并行开发S1修复与功能，节奏需拉齐 | 版本发布后反馈消化期，代码静默 |

**关键差距**：OpenClaw的规模远大于其他项目，但稳定性风险最高；hermes‑agent拥有最活跃的贡献者网络，但如不解决合并积压将造成贡献者流失；PicoClaw专注特定硬件，生态纵深最浅。

---

## 6. 社区热度与成熟度分层

### 第一梯队：极高热度 / 风险并存
- **OpenClaw**、**hermes‑agent**：日更新数500+，Bug爆发率高。前者面临严重回归，后者面临合并积压。属于**热度驱动但需要治理介入**的成熟前阶段。

### 第二梯队：高活跃 / 稳定修复
- **QwenPaw**、**AstrBot**：日更新50条以内，但修复与增强落地率高。QwenPaw正在消化v2.0反馈，AstrBot通过密集合并快速消除痛点。处于**快速迭代并逐步进入稳定期**。

### 第三梯队：中活跃 / 功能并行
- **Zeroclaw**：每日22/50条活动，多个S1 Bug开而未修，但功能PR持续增长。项目处于**功能开发与Bug修复拉锯**，节奏需要提速。

### 第四梯队：低活跃 / 社区测试
- **PicoClaw**：基本无合并，只接收反馈。处于**版本发布后的观望期**，社区声音集中在特定缺陷（ARM64、Hook缺陷），成熟度较低。

---

## 7. 值得关注的趋势信号

1. **“升级即地狱”成为普遍体验** – OpenClaw、QwenPaw、hermes‑agent均出现升级后过程阻塞、核心功能降级，且官方修复工具失效。**启示**：项目方应强制提供增量迁移指南与自动回滚机制；开发者应在升级到主版本前充分验证关键路径（工具调用、记忆、认证）。

2. **可观测性从“可选”变为“基础设施”** – 从OpenClaw的AI安全事件（#107744）、Zeroclaw的turn‑level OTel（#6641）、AstrBot的Trace重写（#6168）到hermes‑agent的看板调度，多方将可观测性纳为开发主线的组成部分。这意味着生产环境部署Agent已不能仅靠日志，需要结构化可观察数据。

3. **Tool安全方案升级：从白名单到策略引擎** – Zeroclaw的ToolAccessPolicy（#7960, #9062）、hermes‑agent的作用域审批队列（#60495）、OpenClaw的exec黑名单请求（#6615）共同表明，社区不再满足于简单的allow/deny，而是需要**基于规则或角色的精细权限门控**。

4. **记忆架构转向“分离+生命周期”** – Zeroclaw的RFC #9048明确要求将会话历史与长期记忆分离，OpenClaw的#87660要求生命感知LLM管理，QwenPaw的v2.0记忆丢失成为最热Bug。这一趋势反映出**记忆混合存储（单一切片）已无法满足生产级要求**，分离持久化与工作记忆将成为架构改造的方向。

5. **平台化竞争加剧** – hermes‑agent启动插件接口标准化（#64182），AstrBot的MCP SDK原生集成（#9277），Zeroclaw推进ClawHub所有者限定安装（#8601），暗示各项目正围绕“技能/插件市场”构建生态壁垒。**对开发者而言**：选择项目时评估其插件生态的开放程度与治理方式至关重要。

---

*报告基于2026-07-16各项目GitHub社区日报数据生成，反映当日动态。长期趋势需持续跟踪。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-07-16

---

## 1. 今日速览

过去 24 小时项目保持着极高的社区活跃度：共产生 22 条 Issue 更新（其中 21 条为新增或活跃讨论，1 条关闭）和 50 条 PR 更新（49 条待合并，1 条关闭）。无新版本发布。从 Issue 和 PR 的数量与内容看，项目正处于功能密集开发与质量巩固并行阶段：一方面大量 P1 级别的 Bug 被报告（如 workflow blocked 类的 S1 问题占多数），另一方面多个增强功能已进入代码实施状态（如 Telegram webhook、cron 输出格式、MCP 注册表持久化等）。开发者与社区之间的反馈循环非常紧凑，但部分严重问题的修复 PR 仍处于等待作者动作的状态，值得维护者推动。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日无高亮 PR 被合并（概览中统计的 1 个关闭可能为小规模修复或测试类 PR，未在热点列表中出现）。尽管如此，项目在功能推进上仍有多条重要的开放 PR 正在等待审查或继续开发，以下是近期值得关注的实施进展：

- **工具访问策略加固**：PR [#7960](https://github.com/zeroclaw-labs/zeroclaw/pull/7960) 与即将合并的 [#9062](https://github.com/zeroclaw-labs/zeroclaw/pull/9062) 旨在让 `execute_pipeline` 子工具的调用受 per-agent `ToolAccessPolicy` 约束，防止权限逃逸。其中 #9062 已移除 needs-author-action 标签，可能很快合入。

- **MCP 服务器进程收割**：PR [#8948](https://github.com/zeroclaw-labs/zeroclaw/pull/8948) 解决了 stdio 模式 MCP 服务器变为僵尸进程的问题，是 daemon 长期稳定性的关键修复。

- **OpenAPI 兼容 provider 参数清理**：PR [#8931](https://github.com/zeroclaw-labs/zeroclaw/pull/8931) 与 [#9060](https://github.com/zeroclaw-labs/zeroclaw/pull/9060) 从入站和出站两个方向对工具调用参数进行 JSON 规范化，减少了因格式错误导致 HTTP 400 的情况。

- **文档与配置**：PR [#8679](https://github.com/zeroclaw-labs/zeroclaw/pull/8679) 完成了 SOP.toml 的完整文档，PR [#9050](https://github.com/zeroclaw-labs/zeroclaw/pull/9050) 精简了贡献指南中 AI 编码代理的说明，降低参与门槛。

此外，CI、安全依赖、桌面应用资产优化等维护性 PR 也有持续更新。

---

## 4. 社区热点

过去 24 小时内讨论最热烈的 Issue 是：

- **[#5600 [Bug]: Use kimi-code provider in streaming chat call tools, provider API reports an error](https://github.com/zeroclaw-labs/zeroclaw/issues/5600)**  
  共 12 条评论，是唯一获得 👍 的 Issue。用户报告在 streaming chat 期间使用 kimi-code provider 调用工具时 API 返回 400 错误，具体表现为 “thinking is enabled but reasoning_content is missing”。该 Issue 从 4 月 10 日持续至今，已在 7 月 15 日再次更新，表明问题仍未完全解决，可能是推理流与工具调用交互时的兼容性问题。

其他活跃讨论（评论数 4-6 条）：

- **[#6641 Turn-level OTel trace correlation](https://github.com/zeroclaw-labs/zeroclaw/issues/6641)** (6 条) — 可观测性增强请求，预期与 #6009、#6190 形成闭环。
- **[#9048 RFC: Separate conversation history from agent-curated long-term memory](https://github.com/zeroclaw-labs/zeroclaw/issues/9048)** (4 条) — 架构层面的记忆存储分离提案，引发了社区对 runtime 实现路径的讨论。
- **[#8046 Optional Telegram webhook mode](https://github.com/zeroclaw-labs/zeroclaw/issues/8046)** (4 条) — 用户补充了对 webhook 安全性的关注。
- **[#9082 (已关闭) Suggestion: monetize MCP server with x402 micropayments](https://github.com/zeroclaw-labs/zeroclaw/issues/9082)** — 虽已关闭，但 1 条评论暴露了外部开发者试图推广服务的模式，社区反应中性。

整体看来，社区对**实时通信稳定性**、**可观测性**和**数据模型清晰化**最感兴趣。

---

## 5. Bug 与稳定性

过去 24 小时报告的 Bug 集中出现在 Runtime、Gateway、Provider 及硬件模块，按严重程度排列如下（S1 为 workflow blocked）：

| Issue | 严重程度 | 涉及组件 | 摘要 | 是否有 Fix PR |
|-------|----------|----------|------|--------------|
| [#5600](https://github.com/zeroclaw-labs/zeroclaw/issues/5600) | S1 | provider:kimi | 流式调用工具时 provider 报 400 错误 | 无直接关联 PR |
| [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) | S1 | web dashboard | 退出聊天窗口后 agent 中断工作 | 无 |
| [#8560](https://github.com/zeroclaw-labs/zeroclaw/issues/8560) | S1 | tools, browser_open | 浏览器无法打开窗口时 agent 永久挂起 | 无（PR #7960 不直接修复） |
| [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) | S1 | runtime | 停止 agent 后工具调用和思考被从上下文中擦除 | 无 |
| [#9085](https://github.com/zeroclaw-labs/zeroclaw/issues/9085) | S1 | memory, pgvector | 启用 pgvector 时 `try_enable_pgvector` 嵌套 panic | 无 |
| [#9095](https://github.com/zeroclaw-labs/zeroclaw/issues/9095) | S1 | CI (act-local) | upload-artifact v7 因 mime_type 被拒绝 | 无 |
| [#9078](https://github.com/zeroclaw-labs/zeroclaw/issues/9078) | S2 | hardware | 串口传输在 ID 不匹配后失去同步 | 无 |
| [#9092](https://github.com/zeroclaw-labs/zeroclaw/issues/9092) | S2 | zerocode/tui | 长会话后键盘输入延迟 | 无 |
| [#9089](https://github.com/zeroclaw-labs/zeroclaw/issues/9089) | S2 | provider, multimodal | 工具输出支持 [IMAGE:] 但未支持 [AUDIO:] 标记 | 无 |

值得注意的是，多条 S1 Bug（#8559、#8560、#8794）均是 6 月底至 7 月初报道的，至今仍缺修复，可能影响用户体验。每日活跃度虽高，但修复节奏尚未跟上 Bug 报告速度。

部分 Provider 相关的修复 PR 正在推进中（如 #8931、#9060 用于参数清理），但暂未直接关联上述 S1 Bug。

---

## 6. 功能请求与路线图信号

过去 24 小时新增 9 个 Enhancement 类 Issue，部分与已在开发中的 PR 形成对应，暗示下一版本可能包括：

- **记忆架构分离**：[#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048)（会话历史 vs. 长期记忆）和 [#9047](https://github.com/zeroclaw-labs/zeroclaw/issues/9047)（ZeroCode 中代码会话不读写持久记忆）— 标志着开发者开始反思当前混合存储设计，可能影响 v0.8.4 之后的架构调整。
- **Telegram Webhook**：[#8046](https://github.com/zeroclaw-labs/zeroclaw/issues/8046) — 已有社区成员表示兴趣，虽未匹配 PR 但长期轮询与 webhook 双模式将成为 Telegram 网关的重要增强。
- **ComfyUI 媒体生成**：[#6563](https://github.com/zeroclaw-labs/zeroclaw/issues/6563) 和 [#7875](https://github.com/zeroclaw-labs/zeroclaw/issues/7875) — 对图像乃至视频生成的需求持续上升，已有方案讨论但尚未进入实现。
- **可观测性**：[#6641](https://github.com/zeroclaw-labs/zeroclaw/issues/6641) turn-level OTel 关联已被接受，且提交者 JordanTheJet 与活跃开发者 alexandme 有正向互动，预计会成为 runtime 下一个可观测性里程碑。

此外，已进入 PR 阶段的增强功能如：
- [#8438](https://github.com/zeroclaw-labs/zeroclaw/pull/8438) — Cron `shell_output_format`（支持原始输出）
- [#8440](https://github.com/zeroclaw-labs/zeroclaw/pull/8440) — Telegram 频道的独立去抖配置
- [#8679](https://github.com/zeroclaw-labs/zeroclaw/pull/8679) — SOP 文档完善

这些 PR 状态大都为 needs-author-action 或正常开放，预计在未来 1-2 周内逐步合并入 master。

---

## 7. 用户反馈摘要

从 Issues 摘要和部分评论可提炼用户痛点与使用场景：

| 用户痛点 | 相关 Issue | 用户情绪 / 具体场景 |
|----------|------------|---------------------|
| 使用 Kimi-code provider 时 streaming 工具调用直接报错，工作流完全阻塞 | [#5600](https://github.com/zeroclaw-labs/zeroclaw/issues/5600) | 技术用户，报告详细日志，但长时间未修复，已持续 3 个月 |
| web 仪表盘退出聊天窗口后 agent 停止工作 | [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) | 用户觉得“completely blocks”无法做其他事，期望 agent 后台继续 |
| 正在运行的 agent 被手动停止后，之前的所有工具调用与思考上下文被永久丢弃 | [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) | 用户连续两次报告（#8559、#8794），强调上下文连续性中断破坏体验 |
| 浏览器无法打开窗口时 agent 永久挂起 | [#8560](https://github.com/zeroclaw-labs/zeroclaw/issues/8560) | 在 headless 环境下碰到的典型问题，影响自动化部署 |
| pgvector 启用时内存后端直接 panic | [#9085](https://github.com/zeroclaw-labs/zeroclaw/issues/9085) | 新用户尝试使用 postgres 支持 pgvector 时立即崩溃，属于严重的上手障碍 |
| ZeroCode TUI 长会话后键入延迟 | [#9092](https://github.com/zeroclaw-labs/zeroclaw/issues/9092) | 终端重度用户的抱怨，直接影响日常使用满意度 |

用户整体反馈积极，但**严重 Bug 的修复延迟**正在成为主要负向因素，尤其是涉及工作流拦截的 S1 Bug。部分用户（如 @susyabashti）连续提交两个类似上下文的 Issue，说明目前运行时状态管理存在设计缺陷。

---

## 8. 待处理积压

以下 Issue/PR 历史悠久或标签标记最长未响应，可能需维护团队重点关注：

| 条目 | 类型 | 创建于 | 最后活动 | 备注 |
|------|------|--------|----------|------|
| [#5600](https://github.com/zeroclaw-labs/zeroclaw/issues/5600) | Bug (S1) | 2026-04-10 | 2026-07-15 | 已标记 `no-stale`，仍活跃但无修复 PR，持续 3 个月 |
| [#6622](https://github.com/zeroclaw-labs/zeroclaw/pull/6622) | PR (WhatsApp LID 修复) | 2026-05-13 | 2026-07-15 | 标记 `needs-author-action`，长期未更新，对 WhatsApp 通道运营者重要 |
| [#7960](https://github.com/zeroclaw-labs/zeroclaw/pull/7960) | PR (工具访问策略) | 2026-06-19 | 2026-07-15 | 标记 `needs-author-action`，可能与 #9062 有冲突，需决策 |
| [#8358](https://github.com/zeroclaw-labs/zeroclaw/issues/8358) | Tracker (zerorelay) | 2026-06-26 | 2026-07-15 | 重大基础设施（安全隧道）跟踪，但进展缓慢 |
| [#8601](https://github.com/zeroclaw-labs/zeroclaw/pull/8601) | PR (ClawHub 所有者限定安装) | 2026-07-01 | 2026-07-15 | `needs-author-action`，允许社区技能市场使用的关键 PR |
| [#8866](https://github.com/zeroclaw-labs/zeroclaw/pull/8866) | PR (MCP 注册表共享) | 2026-07-08 | 2026-07-15 | `needs-author-action`，修复心跳中重复连接的重要改进，规模 XL |

此外，[#8357 v0.8.4 maintenance train tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/8357) 作为版本里程碑跟踪器，目标日期为 2026-07-31，目前进展未明，建议维护者更新其状态。

---

*数据来源：Zeroclaw GitHub 仓库（zeroclaw-labs/zeroclaw）截至 2026-07-15 的 Issue 与 PR 活动。报告自动生成，部分评论内容未完全获取，请结合原文核实。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

好的，这里是基于您提供的 GitHub 数据生成的 PicoClaw 项目动态日报。

**PicoClaw 项目动态日报 - 2026-07-16**

---

### 1. 今日速览

今日 PicoClaw 项目活跃度**中等**，社区反馈积极但核心代码库进入静默期，**无任何 Pull Request 被合并到主分支**。项目收到了 3 个高质量的新 Issue（涵盖了打包缺陷、核心机制 Bug 及功能缺口），同时维护者清理了 3 个历史 `[stale]` Bug。整体而言，项目在 v0.3.1 发布后处于一个社区深度测试与反馈集中爆发期，当前主要矛盾集中在 **ARM64 平台兼容性、Process Hook 反序列化缺陷**以及**网关模式的功能补全**上。

---

### 2. 版本发布

本日无新版本发布。

---

### 3. 项目进展

本日无代码合并，项目进展主要体现在**代码库维护**与**长期 PR 迭代**：

- **Issue 追踪清理**：维护者关闭了 3 个因长期无回应而自动标记为 `[stale]` 的旧 Bug（#3153, #3196, #3197），改善了 Issue 追踪器的整洁度。
- **DeltaChat 通道重构待合并 (PR #3222)**：由 @trufae 提交的大幅重构 PR 获得了更新。该 PR 旨在清理 DeltaChat 通道（-200LOC），移除遗留特性并完善文档。该 PR 已开启近 2 周（2026-07-03），仍处于等待审核状态，建议维护者关注以避免代码冲突。

  [PR #3222](https://github.com/sipeed/picoclaw/pull/3222)

---

### 4. 社区热点

本日社区讨论热度集中在 v0.3.1 版本的**新缺陷**与**功能缺口**上，而非旧 Issue 的争吵：

- **#3260 ARM64 启动器缺失**：用户 `@tomopas` 反映在树莓派 3B 上无法启动。这是安装即崩溃的体验，对 Linux ARM 生态影响严重。
- **#3258 Process Hook 机制核心缺陷**：用户 `@Shiniese` 报告 `before_tool` 钩子中决策字段被丢弃且参数解析异常。此 Bug 直指高级用户的自定义工作流核心，属于深层次的反序列化问题。
- **#3257 网关模式无状态支持请求**：用户 `@lisiying` 请求网关模式增加无状态会话支持，暴露了 `gateway` 模式与 `agent` 模式在灵活性上的差距。

  [Issue #3260](https://github.com/sipeed/picoclaw/issues/3260) | [Issue #3258](https://github.com/sipeed/picoclaw/issues/3258) | [Issue #3257](https://github.com/sipeed/picoclaw/issues/3257)

---

### 5. Bug 与稳定性

根据严重性排列：

1.  **高严重性**：**Process Hook 反序列化缺陷 (Issue #3258)** — 核心高级功能完全失效。`decision` 字段被丢弃，`args` 被错误解析。尚无紧急修复 PR。
2.  **高严重性**：**ARM64 启动器缺失 (Issue #3260)** — 官网提供的 v0.3.1 正式版 Release 包存在打包问题，树莓派用户完全无法启动。
3.  **低严重性 (已关闭)**：**Volcengine Doubao 工具泄漏 (Issue #3153)** 与 **Codex OAuth 登录失败 (Issues #3196/3197)**。这三个 Bug 因 `[stale]` 被自动关闭，但根据 Changelog 无法确认是否已在 v0.3.1 中彻底修复，对使用对应服务的新用户存在潜在风险。

---

### 6. 功能请求与路线图信号

- **短期路线图信号：网关会话管理（#3257）**
  用户请求增加无状态/无历史模式，这是 `picoclaw gateway` 走向生产环境的刚需，极有可能会被纳入 v0.3.2 或 v0.4.0 的开发计划中。

- **长期路线图信号：代码健康度与性能**
  - **DeltaChat 重构 (PR #3222)**：大规模精简代码（-200LOC），表明项目正在从功能堆砌转向基础架构清理。
  - **并行化宣传 (PR #3259)**：用户提交了一个仅修改项目描述的 PR，以强调更好的并行化能力。这反映了社区开发者对性能优化的高度期待，可能暗示 v0.4.x 将聚焦于此。

  [PR #3259](https://github.com/sipeed/picoclaw/pull/3259)

---

### 7. 用户反馈摘要

自 v0.3.1 发布后，社区反馈呈现明显的“工程师化”趋势，用户不再满足于基础聊天，而是将 PicoClaw 作为 **Agent 开发框架**在使用：

- **`@tomopas` (Issue #3260)**：痛陈 ARM64 版本“开箱即崩”，显露出多平台分发策略的短板。
- **`@Shiniese` (Issue #3258)**：试图通过 Hook 机制精细控制 Agent 行为（DeepSeek + Telegram 通道），但在工具调用决策层遭遇无法拦截的尴尬，暴露出 Hook 模块设计的边界情况处理不足。
- **`@lisiying` (Issue #3257)**：作为 API 集成者，指出 `gateway` 模式与 `agent` 模式在会话管理上的不一致，影响了将其嵌入现有系统的灵活性。

---

### 8. 待处理积压

- **DeltaChat 重构 (PR #3222)**：已开启近 2 周（2026-07-03），获得活跃更新但未被合并。作为-200LOC 的大重构，需尽早 Code Review 以避免因版本迭代产生更多冲突。
  [PR #3222](https://github.com/sipeed/picoclaw/pull/3222)

- **Stale Bugs 的遗留风险 (Issues #3153, #3196, #3197)**：虽然因 `[stale]` 被关闭，但自动关闭不代表 Bug 已修复。如果 Volcengine 或 Codex 用户升级后依旧复现，可能引发社区不满。建议维护者在 Changelog 中明确标注这些 Issue 的最终处理状态（已修复 / 无法复现 / 回退保留）。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

好的，作为 AI 智能体与个人 AI 助手领域开源项目分析师，我将根据您提供的 QwenPaw GitHub 数据，为您生成 2026-07-16 的项目动态日报。

---

# QwenPaw 项目日报 (2026-07-16)

## 1. 今日速览
QwenPaw 项目在过去 24 小时内保持高度活跃。**PR 提交与合并异常频繁**，共更新 43 条，其中 22 个已合并/关闭，表明团队正在高效处理 Bug 修复和功能收尾。Issues 方面，项目处理了大量积压（尤其是历史遗留问题），共关闭 32 个，但同时也涌现了 18 个活跃新 Issue。**社区对 v2.0.0 版本的稳定性反馈强烈**，特别是关于上下文记忆丢失（失忆症）、界面渲染和多模态模型兼容性的问题引发了集中讨论。总体来看，项目正处于 **v2.0 发布后密集的 Bug 修复与稳定性巩固阶段**，社区反馈积极，开发响应迅速。

## 2. 版本发布
无

## 3. 项目进展
今日有 **22 个 PR 被合并或关闭**，修复了多个关键问题并提升了系统健壮性。主要进展包括：

- **基础设施与兼容性修复**：
    - **MCP 环境变量引用修复**：`#6039` 已合并，解决了从旧版 `agent.json` 迁移到新版 MCP 驱动时，环境变量 `${VAR}` 未被解析，导致认证失败的回归问题。
    - **GBK编码兼容性**：`#6140` 已合并，修复了 Windows 环境下执行命令时因 GBK 编码导致的冲突。
    - **网站部署**：`#6143` 和 `#6147` 已合并，为官网博客增加了浏览量/点赞功能，并完善了 CI/CD 配置。
- **稳定性和 UI 修复**：
    - **解决模型“末日循环” (Doom Loop)**：`#6137` 已合并，通过调整 AI 响应的重复检测阈值，减少了模型在对话中陷入死循环的问题。这是社区反馈的热点问题。
    - **前端渲染修复**：`#6142` 已合并，修复了 Web UI 中自动记忆间隔无法设置为 0 来关闭的问题。`#6137` 中也包含对思考块中空格和换行符被裁剪的修复（部分），另一部分在 `#6139` 等待合并。
    - **桌面端缓存问题**：`#6107` 已合并，修复了 Desktop 应用在更新后仍加载旧前端代码的缓存问题。

**总结**：项目正从 v2.0 的功能大版本切换至稳定性的**精细打磨阶段**，今日修复了多个直接影响用户体验的 Bug，整体健康度在快速回升。

## 4. 社区热点
今日社区讨论的热点集中在 **v2.0 版本的核心体验问题上**：

- **Context/记忆丢失问题（“失忆症”）**：
    - `#6148 [Bug] 升级到 2.0 之后失忆症很严重`：评论 2 条。用户报告升级后对话中频繁忘记前文，并出现“截断”字样，认为 `/compact` 压缩功能可能存在问题。此问题已有关联 PR `#6123` 在进行修复。
    - `#5995 [Bug] Messages silently dropped`：评论 3 条。用户的另一痛点，当 Agent 繁忙时，新消息被静默丢弃，没有排队或错误提示。这严重影响了用户体验，特别是与飞书等渠道集成时。
- **界面渲染问题**：
    - `#6129 [Bug] Missing spaces and line feeds in thinking blocks`：评论 5 条。用户在思考过程中发现格式丢失，虽然完成时会恢复，但过程体验很差。此问题已有关联 PR `#6139` 进行修复。
- **国产化需求**：
    - `#6125 [Feature] 有支持政企版的银河麒麟操作系统的计划吗？`：评论 5 条。该 Issue 获得了用户的一致认同，反映了政企市场的强烈需求。用户不仅询问支持计划，还对便捷安装包（如 deb/rpm）提出了期望。

## 5. Bug 与稳定性
今日报告的 Bug 较多，按严重程度排列如下：

- **严重 - 功能异常**:
    - `#6148 失忆症`：影响对话连续性，用户体验极差。**关联 PR `#6123` (open)**。
    - `#6155 升级到 2.0 后 Embedding映射 和 Auto-Memo 配置 Bug`：影响本地模型和记忆模块的正常使用，配置项映射错误。**无关联 PR**。
    - `#6124 内存泄漏 (ReMe背景循环)`：启动时内存消耗高达 48GB+，导致服务无法启动。**无关联 PR**。
- **中等 - 功能受限**:
    - `#6141 MODEL_EXECUTION_ERROR 后无法对话`：手动中止任务后，后续对话持续报错，无法恢复。**无关联 PR**。
    - `#6136 难以触发智能体协作`：领导者 Agent 不主动调用其他 Agent，影响多 Agent 团队功能的核心体验。**无关联 PR**。
    - `#6154 多模态模型图片被剥离`：当模型信息查找失败或内置标注错误时，图片输入被误丢弃，影响多模态能力。**有关联 PR `#6154` 进行修复**。
- **轻微/可用性问题**:
    - `#5790 加载动画完成后不消失`：影响前端显示。

## 6. 功能请求与路线图信号
- **较高优先级 (可能在下一版本纳入)**:
    - **每会话模型覆盖 (Per-session model overrides)**：PR `#5992` (open) 非常活跃，旨在允许不同对话使用不同模型，这一特性为高级用户所期待，很可能被合并。
    - **官方Chrome扩展**: PR `#6157` (open) 引入了官方 Chrome 扩展，通过本地消息桥接，将 QwenPaw 与用户自身的浏览器深度结合，这是生态建设的重要一步。
- **社区呼声高 (路线图参考)**:
    - **支持国产操作系统**：`#6125` 和 `#6076` 代表了来自政企和特定环境（如Win7）用户的强烈需求，未来版本可能会考虑。
    - **预制Agent模板**：`#4259` (closed) 虽已关闭，但其降低非技术用户门槛的诉求，在社区中很有代表性。随着功能增多，这一需求可能会再次被提上日程。
    - **多渠道共享会话**：`#2899` (closed) 用户希望跨平台（如从A软件切换到B软件）能延续同一对话上下文，此需求反映了用户对跨设备无缝体验的追求。

## 7. 用户反馈摘要
- **主要痛点 (负面)**:
    - **v2.0 体验降级**：多位用户明确表达“升级到 2.0 后失忆症很严重”，认为这是严重退步。用户 `@laeni` 在 `#6148` 中详细描述了“截断”和“压缩”失效的问题，表示失望。
    - **稳定性不足**：用户反馈频繁遇到 `MODEL_EXECUTION_ERROR` (`#6141`) 导致对话“瘫痪”，以及 Agent 在繁忙时静默丢消息 (`#5995`)，这些都严重影响了日常使用的流畅性。
- **诉求与建议 (中性/正面)**:
    - **对生态扩展的期待**：用户对预制 Agent 模板 (`#4259`)、Chrome 扩展 (`#6157`) 等新功能表现出兴趣，认为可以降低门槛、扩展能力。
    - **对中文和国产环境的关注**：用户 `@SpokAtom` 在 `#6125` 中的提问得到了社区共鸣，显示用户群正从个人爱好者向政企用户扩展。

## 8. 待处理积压
- **`#5862 feat(inbox): system pop`** (PR, Open, 15 days, last commit 8 days ago)：该 PR 引入了收件箱系统弹窗功能，但已长时间没有新活动。如果这是一个重要的特性，建议维护者尽快审阅或给出反馈，避免长时间搁置导致冲突。
- **`#4259 增加预制 Agent 模板`** (Issue, Closed)：虽然已关闭，但此 Issue 获得了 3 个 👍 和多条评论，代表了非技术用户的普遍心声。建议项目方在后续迭代中重新考虑，或将部分内容融入官方文档的“最佳实践”中。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

好的，作为一名 AI 智能体与个人 AI 助手领域的开源项目分析师，以下是根据截至 **2026-07-16** 的项目数据（基于 2026-07-15 的 24 小时更新情况）生成的 **Hermes-Agent 项目动态日报**。

---

# hermes-agent 项目动态日报 | 2026-07-16

## 1. 今日速览

项目在过去 24 小时内维持**极高活跃度**，Issue 处理效率亮眼（共更新 500 条，关闭 331 条），表明核心团队对用户反馈的响应迅速。然而，**PR 合并吞吐量严重滞后**（共 500 条，仅合并/关闭 53 条），导致 **447 个 PR 等待合并**，形成了显著的积压瓶颈。社区讨论焦点集中在 **Dashboard 认证修复** 和 **插件生态扩展计划**，整体项目健康度良好，但代码合并效率是当前最需关注的短期风险。

- **Issue 动态**：500 条更新（新开 169，关闭 331）
- **PR 动态**：500 条更新（待合并 447，合并/关闭 53）
- **版本发布**：无

## 2. 版本发布

*（无新版本发布）*

尽管今日无正式 Release，但大量高优先级的 Bug 修复（尤其是 Dashboard/Auth 相关的多个 HTTP 500 错误）已被标记为合并到主分支（`sweeper:implemented-on-main`）。预计下一次版本发布（v0.18.3 或 v0.19.0）将重点整合近期的密集修复。

## 3. 项目进展

尽管合并率偏低，项目在以下关键领域取得了实质性进展：

- **Dashboard 与 Auth 兼容性修复闭环**：此前困扰大量用户的“非环回地址下 BasicAuth 返回 500”错误群已基本清除。Issues #55130、#58810、#58626 均被关闭，核心认证管道的稳定性得到重建。
- **Kanban 看板调度系统修复**：看板任务调度器忽略 `max_in_progress_per_profile` 配置的问题（#59499）已关闭，资源耗尽风险解除。同时，多个针对 Kanban 环境变量竞争（Env Race）问题的 PR 已被提交（#65246, #65252）。
- **多平台适配优化**：QQ 机器人适配器启动失败（#58646）、Desktop 自定义 Provider 模型路由至 OpenRouter（#58688）、`computer_use` 工具在 WSL 下的崩溃（#56704）均已修复并关闭。
- **生态信号发出**：社区期待已久的 **插件接口扩展（Plugin Interface Expansion）** 计划发布了官方 Tracking Issue（#64182），标志着代理应用生态将走向标准化和开放化。

## 4. 社区热点

- **最热门 Issue：xAI 订阅等级矛盾（#26847）**
  - **链接**: https://github.com/NousResearch/hermes-agent/issues/26847
  - **评论数**: 29
  - **分析**: 尽管已关闭，但该 Issue 收获了高达 29 条评论。用户投诉 xAI OAuth 后端强制要求 Heavy 订阅（$100/月），虽文档声称“所有层级均可用”。这暴露了高频用户对订阅透明度和后端政策一致性的强烈执着。

- **最强功能信号：插件接口扩展计划（#64182）**
  - **链接**: https://github.com/NousResearch/hermes-agent/issues/64182
  - **评论数**: 11
  - **分析**: 核心成员 @teknium1 亲自创建的 Tracking Issue，用于汇总社区对于插件接口的改进建议。这表明官方正在认真考虑将 Hermes 从“单体 Agent”转变为“Agent 平台”，这是路线图上最值得关注的事件之一。

- **高赞长期需求：可配置 Temperature 参数（#17565）**
  - **链接**: https://github.com/NousResearch/hermes-agent/issues/17565
  - **👍**: 10
  - **分析**: 获得 10 个 👍，是目前长期未解决的 Feature Request 中呼声最高的。用户对模型随机性和推理确定性有精细控制需求，当前的硬编码被普遍认为是严重掣肘。

## 5. Bug 与稳定性

今日整体情况以修复为主，但仍有高影响 Bug 处于开放状态：

**已修复（高优先级）：**
- **Dashboard 500 错误群**（#55130, #58810, #58626）—— *已关闭，合并至主分支*
- **Desktop 模型路由混乱**（#58688）—— *已关闭*
- **Kanban 忽略并发限制**（#59499）—— *已关闭*
- **MCP 列表窗口返回 None 崩溃**（#56704）—— *已关闭*

**待处理（高优先级）：**
- **Desktop 远程连接假死（#41566）**：[链接](https://github.com/NousResearch/hermes-agent/issues/41566)
  - *严重性：P2*。远程网关已验证可达，但 Desktop UI 始终显示“无法连接”，严重浪费用户排错时间。
- **Dashboard 跨标签会话泄露（#62726）**：[链接](https://github.com/NousResearch/hermes-agent/issues/62726)
  - *严重性：P2。需要复现*。会话状态在标签间意外叠加，导致新对话挂起，需要完整重启容器。
- **Telegram 多配置启动失败（#64674）**：[链接](https://github.com/NousResearch/hermes-agent/issues/64674)
  - *严重性：P2*。当启用 `multiplex_profiles` 且 Bot Token 存放在二级配置中时，Telegram 网关无法启动。这是昨日新开的 Bug，直接影响多租户用户。
- **Qwen 多轮推理上下文被剥离（#56004）**：[链接](https://github.com/NousResearch/hermes-agent/issues/56004)
  - *严重性：P2*。`preserve_thinking` 在多轮对话中失效，导致 Agent 失去前序推理上下文，属于重代理（Heavy Agent）场景下的严重问题。

## 6. 功能请求与路线图信号

**即将纳入路线图的信号：**
- **插件接口标准化**（#64182）：官方正在积极整理方案，目标是让长期等待的插件 PR 能够顺利发布。
- **Claude Agent SDK 后端**（PR #56413）：这是一个大型新功能 PR，试图将 Claude 订阅用户的推理层通过 SDK 集成进 Hermes，并共享工具层。
- **工具权限门控系统**（#21849）：提供基于规则的工具调用审批，彻底改变“仅限于危险 Shell 命令”的现状，向“全工具安全门控”演进。

**社区高呼声功能（建议优先纳入）：**
- **Vaultwarden 密钥加载支持**（#33126）：自托管用户的必备功能，当前仅支持 Bitwarden Secrets Manager。
- **子代理模型覆盖（delegate_task 模型分离）**（#58731）：主代理与子代理使用不同模型/Provider 的需求。
- **单网关 Telegram 多配置路由**（#40173）：允许一个 Bot 通过 `channel_profiles` 实现不同群聊不同人格/配置。

## 7. 用户反馈摘要

**核心痛点：**
- **Dashboard 认证体验最受诟病**：过去一周内，有多名用户详细描述了配置 BasicAuth 后 Dashboard 完全不可用（HTTP 500）的场景（#55130, #58810, #58626）。这被认为是 v0.18.0 升级后最大的倒退。
- **订阅等级不符导致信任危机**：xAI 403 反馈（#26847）让部分付费用户感到被误导，认为文档与后端行为不一致。
- **错误提示误导性强**：Desktop 端的远程连接失败提示不准确（#41566），使用户误判为网络环境问题而非客户端 BUG。

**使用场景与正向反馈：**
- **用户愿意为丰富功能买单**：大量流量围绕 xAI（#26847）和 Copilot（#7731）等付费服务展开，表明用户信任 Hermes 作为整合多种昂贵服务的统一网关。
- **对生态扩展充满期待**：插件接口讨论帖（#64182）中用户积极参与提出方案，显示出社区对平台化的极高期待。

## 8. 待处理积压

⚠️ **重点预警：PR 合并积压严重创新高**
目前有 **447 个 PR** 处于待合并状态。过去 24 小时内仅合并/关闭了 53 个（10.6%）。大量贡献者的工作积压在 `risk-session-state`、`blast-moderate` 等标签下，如果持续下去可能打击外部贡献者的积极性，甚至导致版本分裂。

**最需关注的长期开放 Issue：**
- **#4335** 跨平台会话上下文共享（自 2026-03-31 开放）
- **#17565** 可配置 Temperature 参数（自 2026-04-29 开放）
- **#25823** 开启 Tool Loop 硬停止默认保护（自 2026-05-14 开放）
- **#49190** 通用化 Kanban 事件通知基座（自 2026-06-19 开放）

**建议优先处理的 PR：**
- **#60489** [Desktop 首次运行支持“连接到现有 Hermes 实例”](https://github.com/NousResearch/hermes-agent/pull/60489) —— 能显著降低新用户门槛。
- **#60495** [作用域 Gateway 审批队列防止跨用户将劫持](https://github.com/NousResearch/hermes-agent/pull/60495) —— 涉及安全边界，建议核心团队尽快 Review。
- **#63233** [可选允许 Agent 写文件到配置](https://github.com/NousResearch/hermes-agent/pull/63233) —— 高安全风险，需谨慎评审。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报（2026-07-16）

---

## 今日速览

过去 24 小时（2026-07-15 至 2026-07-16），AstrBot 项目保持高度活跃。共产生 21 条 Issue 更新（6 条新开 / 活跃，15 条关闭）和 22 条 PR 更新（12 条待合并，10 条已合并 / 关闭）。社区关注焦点集中在 **OpenAI 兼容 Embedding 服务的 dimensions 参数兼容性** 上，该项目元问题已在 #9245 中合并修复。Dashboard 的多项体验优化（日志去重、下拉栏梳理、异常捕获等）集中落地。功能上新增加了 **TEI Rerank Provider** 与 **Agent 执行过程中 Token 圆环实时更新**。版本上无新发布。项目整体状态活跃，修复密集，社区反馈响应及时。

---

## 项目进展

过去 24 小时内合并 / 关闭的关键 PR 反映了项目在**提供商兼容性、Dashboard 健壮性、知识库**等方面的显著推进：

### 🔧 提供商与 Embedding 兼容性
- **#9245** – [fix: add embedding dimensions send modes](https://github.com/AstrBotDevs/AstrBot/pull/9245)  
  修复 OpenAI 兼容 Embedding 提供商强制发送 `dimensions` 导致第三方服务（如 SiliconFlow）返回 400 的问题。该 PR 直接解决 #8520、#8585、#8586 等多起长期 Issue。
- **#9274** – [feat: add rerank provider for Text Embeddings Inference (TEI)](https://github.com/AstrBotDevs/AstrBot/pull/9274)  
  新增 TEI 重排序提供商，满足自托管 rerank 模型需求，对应 #9266。

### 📈 可观测性与 Dashboard
- **#9260** – [feat: stream agent stats after each LLM call](https://github.com/AstrBotDevs/AstrBot/pull/9260)  
  实现 Agent 多轮工具调用过程中 Token 环的实时更新，提升 WebChat 使用体验（对应 #9250）。
- **#9263** – [fix: prioritize configured context limit](https://github.com/AstrBotDevs/AstrBot/pull/9263)  
  修复 Dashboard 中上下文窗口大小优先级错误（#9254）。
- **#9271** – [fix: add catch-all Exception handler for dashboard API](https://github.com/AstrBotDevs/AstrBot/pull/9271)  
  增加全局异常处理器，避免未处理异常导致纯文本 `Internal Server Error`（#9269）。
- **#9270** – [fix: fix skills download archive filename mismatch with versioned skill names](https://github.com/AstrBotDevs/AstrBot/pull/9270)  
  修复带版本号命名的 Skill 下载失败（#9268）。
- **#9291** – [fix(dashboard): remove duplicate platform logs](https://github.com/AstrBotDevs/AstrBot/pull/9291)  
  消除平台日志重复问题。
- **#9264** – [fix: delete unsaved provider sources locally](https://github.com/AstrBotDevs/AstrBot/pull/9264)  
  修复新建未保存的 Provider Source 删除后界面残留与 400 错误（#9262）。
- **#9233** – [refactor(dashboard): streamline sidebar navigation](https://github.com/AstrBotDevs/AstrBot/pull/9233)  
  重构侧边栏，将次要资源链接移出，提升导航清晰度。

### 📚 知识库与核心
- **#9246** – [fix: compensate partial knowledge base upload failures (#9007)](https://github.com/AstrBotDevs/AstrBot/pull/9246)  
  解决知识库文件上传在向量化阶段中途失败、记录消失的问题（#9007）。

### 🧱 其他值得关注的开放 PR
- **#9277** – [feat: expand native MCP SDK integration](https://github.com/AstrBotDevs/AstrBot/pull/9277)（XXL，持续推进中）
- **#9293** – [Fix GLM OpenAI-compatible content format handling](https://github.com/AstrBotDevs/AstrBot/pull/9293)（智谱 GLM 兼容修复，待合并）
- **#9294** – [fix(command): keep an argument that equals another alias of the same command](https://github.com/AstrBotDevs/AstrBot/pull/9294)（命令解析 Bug 修复）
- **#9226** – [fix: improve conversation list performance and prevent stale updates](https://github.com/AstrBotDevs/AstrBot/pull/9226)（对话列表性能优化）

---

## 社区热点

### 🔥 SiliconFlow / OpenAI 兼容 Embedding 400 错误
**Issues:** [#8520](https://github.com/AstrBotDevs/AstrBot/issues/8520)、[#8585](https://github.com/AstrBotDevs/AstrBot/issues/8585)、[#8586](https://github.com/AstrBotDevs/AstrBot/issues/8586)、[#9228](https://github.com/AstrBotDevs/AstrBot/issues/9228)  
过去 24 小时中 #8520 等旧 Issue 被关闭，标志着该系列问题已解决。用户长期被 `dimensions` 参数强制发送导致的 400 错误困扰，社区在多个帖子中集中反馈。随着 #9245 合并，该痛点基本消除。需要留意部分用户仍反馈日志中 `dimensions` 警告重复输出（#9228），该问题虽被定位但日志级别尚未优化，建议关注后续迭代。

### 💬 WebChat 删除按钮消失 & GIF 历史污染
- **#9290**: [WebChat 单条消息删除按钮消失](https://github.com/AstrBotDevs/AstrBot/issues/9290)（2 评论）  
  用户反馈在特定插件（Sylanne）干预后重新生成按钮恢复但删除按钮仍然缺失，排除浏览器缓存和部署方式。
- **#9295**: [引用 GIF 会污染会话历史并导致 Gemini 后续请求持续失败](https://github.com/AstrBotDevs/AstrBot/issues/9295)（1 评论）  
  涉及多模态模型处理不支持格式的 base64 GIF 问题，已开启 `sanitize_context` 但未阻断，预期后续会有针对性修复。

### 🆕 新 Bug 快速反馈
- **#9287**: [QQ Official Webhook fails in unified_webhook_mode](https://github.com/AstrBotDevs/AstrBot/issues/9287) – 报 `'DashboardRequest' object has no attribute 'get_data'`，影响新版 QQ 适配器用户。
- **#9297**: [WebUI 加载失败（白屏）](https://github.com/AstrBotDevs/AstrBot/issues/9297) – 在 Windows 11 uv 安装环境下 dist 缺失且手动放置无效，MIME 类型错误。

### 📡 主动消息架构讨论（RFC）
**#3497**: [关于 AstrBot 主动消息的未来：从“模拟”到“原生”](https://github.com/AstrBotDevs/AstrBot/issues/3497)  
该 RFC 于近期重新活跃（更新 2026-07-15），社区对原生主动消息的支持模式展开讨论。尽管未直接并入当前开发重点，但反映了用户对 cron 推送和定时提醒场景的强烈需求。

---

## Bug 与稳定性

今日新开/活跃的 Bug 按严重程度排列如下：

| 严重程度 | Issue | 描述 | 状态 |
|----------|-------|------|------|
| 🔴 严重 | [#9297](https://github.com/AstrBotDevs/AstrBot/issues/9297) | WebUI 白屏，dist 文件缺失或 MIME 类型错误 – 平台不可用 | 无关联 PR |
| 🔴 严重 | [#9295](https://github.com/AstrBotDevs/AstrBot/issues/9295) | 引用 GIF 后 base64 残留到多模态会话历史，后续请求全部失败 | 无关联 PR，已提替代方案 |
| 🟠 高 | [#9287](https://github.com/AstrBotDevs/AstrBot/issues/9287) | QQ Official Webhook 统一模式下 `get_data` 不存在，适配器崩溃 | 无关联 PR |
| 🟠 高 | [#9296](https://github.com/AstrBotDevs/AstrBot/issues/9296) | 筛选模型调用连续 `Connection error` 并重试直至失败 | 无关联 PR |
| 🟠 高 | [#9289](https://github.com/AstrBotDevs/AstrBot/issues/9289) | 无法发送群员被踢通知，`send_message_chain` 出错 | 无关联 PR |
| 🟡 中 | [#9290](https://github.com/AstrBotDevs/AstrBot/issues/9290) | WebChat 单条删除按钮消失（界面损失） | 无关联 PR，社区排查中 |
| 🟢 低 | [#9228](https://github.com/AstrBotDevs/AstrBot/issues/9228) | SiliconFlow embedding 每个请求重复打印 WARN 日志 – 不影响功能 | 已定位，待优化 |

**已修复**的旧 Bug：  
- **#9254** 上下文限制优先级 / **#9262** 未保存 provider 删除残留 / **#9268** skill 下载失败 / **#9269** Dashboard 异常纯文本 – 均已通过 #9263、#9264、#9270、#9271 修复。  
- **#8520 / #8585 / #8586** 系列 Embedding 400 错误 – 已通过 #9245 修复。  
- **#9007** 知识库上传中途消失 – 已通过 #9246 修复。

---

## 功能请求与路线图信号

| Issue / PR | 描述 | 信号强度 |
|------------|------|----------|
| [#9292](https://github.com/AstrBotDevs/AstrBot/issues/9292) | 为插件 `_conf_schema.json` 增加通用、安全的动作按钮能力 | ⭐ 新请求，扩展插件生态 |
| [#3497](https://github.com/AstrBotDevs/AstrBot/issues/3497) | 主动消息从“模拟”到“原生”架构 RFC（近期活跃） | ⭐⭐⭐ 社区高关注，影响插件开发方向 |
| [#9266](https://github.com/AstrBotDevs/AstrBot/issues/9266) | 请求 TEI 重排序提供商 → 已通过 #9274 实现 | ✅ 已落地 |
| [#9250](https://github.com/AstrBotDevs/AstrBot/issues/9250) | Agent 实时更新 token 圆环 → 已通过 #9260 实现 | ✅ 已落地 |
| [#7042](https://github.com/AstrBotDevs/AstrBot/issues/7042) | 平台日志分开滚动（建议已关闭，但未具体实现） | 🔕 已 close，社区可重新提议 |
| [#9277](https://github.com/AstrBotDevs/AstrBot/pull/9277) | 扩展原生 MCP SDK 集成（PR open，XXL） | ⭐⭐⭐ 大型特性，路线图关键 PR |
| [#7779](https://github.com/AstrBotDevs/AstrBot/pull/7779) | Shipyard Neo 沙箱就绪等待（PR open，L） | ⭐⭐ 提升 sandbox 稳定性 |
| [#8362](https://github.com/AstrBotDevs/AstrBot/pull/8362) | StepFun ASR 语音转文字 Provider（PR open，L） | ⭐⭐ 新提供商扩展 |
| [#9285](https://github.com/AstrBotDevs/AstrBot/pull/9285) | QQ Official webhook @提及渲染（PR open，L） | ⭐⭐ 平台特性补齐 |
| [#6168](https://github.com/AstrBotDevs/AstrBot/pull/6168) | Trace 追踪系统增强 & 新 UI（XXL，open 4 个月） | ⭐⭐⭐ 长期阻塞，可观测性核心 |

---

## 用户反馈摘要

以下摘自 Issue 评论，反映真实用户痛点与需求：

- **“Error code: 400 - {'code': 20015, 'message': 'The parameter is invalid.'}”**（#8585）  
  多位用户在配置 SiliconFlow Embedding 时遭遇测试按钮失败，社区对该问题抱怨集中。`dimensions` 参数强制发送是主因。现已修复。

- **“每次 embedding 调用都会移除 dimensions 参数并打印一条 WARN 级别日志……一次对话流程中记忆召回 + 反思就出现 3 次警告”**（#9228）  
  用户对高频重复日志感到烦恼，期望降低日志噪声。此问题虽不影响功能但降低调试体验。

- **“进度条走到头之后，整个记录消失”**（#9007）  
  知识库上传文件在向量化阶段失败后记录消失，用户无法确认错误。该问题已通过 #9246 修复。

- **“在‘重新生成’按钮恢复后，单条删除按钮仍然没有出现”**（#9290）  
  WebChat 界面交互问题，用户已尝试禁用插件、刷新浏览器、重部署均无效。

- **“之后即使用户只发送纯文本，每次请求也会继续携带历史 GIF，并持续返回 `convert_request_failed`”**（#9295）  
  多模态场景下 GIF 格式不兼容导致历史污染，用户已开启 `sanitize_context` 但未解决问题，期待后端过滤。

- **“前端在不同位置显示矛盾的数值”**（#9254）  
  用户配置 400K 上下文但被模型元数据覆盖，造成混淆。已修复。

---

## 待处理积压

以下 Issue / PR 长期存在且未取得关键进展，建议维护团队关注：

| ID | 概述 | 创建时间 | 当前状态 |
|----|------|----------|----------|
| [#6168](https://github.com/AstrBotDevs/AstrBot/pull/6168) | Trace 追踪系统重写：层级 span + 前端 UI（XXL） | 2026-03-13 | PR open，历时 4 个月，改动量大 |
| [#6727](https://github.com/AstrBotDevs/AstrBot/pull/6727) | 插件市场列表视图 & 每页数量持久化（L） | 2026-03-20 | PR open，3 个月+ |
| [#7779](https://github.com/AstrBotDevs/AstrBot/pull/7779) | Shipyard Neo 冷启动就绪检测（L） | 2026-04-24 | PR open，近 3 个月 |
| [#8362](https://github.com/AstrBotDevs/AstrBot/pull/8362) | StepFun ASR Provider（L） | 2026-05-26 | PR open，~1.5 个月 |
| [#3866](https://github.com/AstrBotDevs/AstrBot/issues/3866) | 文本转图像概率空白（stale bug） | 2025-11-30 | Issue discarded（`stale`），但未关闭，用户仍可能遇到 |
| [#3497](https://github.com/AstrBotDevs/AstrBot/issues/3497) | 主动消息架构 RFC（长期讨论） | 2025-11-05 | Issue 持续更新，社区有期待，但无具体实现时间线 |

上述积压项中，**#3497** 和 **#6168** 属于架构级变更，可能影响多个子系统，建议在下个里程碑中明确优先级。

---

*本日报由 AI 分析开源项目 GitHub 数据自动生成，仅供参考。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*