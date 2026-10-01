# OpenClaw 生态日报 2026-10-01

> Issues: 485 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-01 00:54 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-01

## 1. 今日速览

OpenClaw 今日发布 **v2026.9.7**，贡献者活跃度极高（过去24小时新增/活跃 Issue 317条、PR 303条）。核心痛点高度集中在 **Gateway 内存泄漏/稳定性** 与 **子任务执行异常**，社区对此反应强烈。项目正从 v2026.9.x 系列的多起回归中快速修复，但稳定性风险仍在积累，需持续关注内存与调度路径的收敛情况。

## 2. 版本发布

### v2026.9.7 (`openclaw 2026.9.7`)

- **规模**：518 commits · 2,818 PRs · 334 contributors
- **变更详情**：[Release Notes](https://docs.openclaw.ai/rel)
- **破坏性变更 / 迁移注意**：
  - SDK 桥接：beta.5 整体会话存储桥接已退役，`openclaw/plugin-sdk/session-store-runtime` 不再兼容旧式 detached-store reconciliation；使用 SDK v2+ 的插件需验证 session-store 接入（参见 #162220）。
  - Telegram 升级兼容：npm 升级时若残留空的 version-1 thread-bindings JSON，会阻断激活；Doctor 将把旧格式视为遗留状态处理（参见 #161832、#162206）。
  - macOS 应用内嵌 Bun Gateway：Fresh 安装将在本地准备私有运行时，Quit App 会同时关闭 Gateway（参见 #161709）。

## 3. 项目进展

今日重点合并/推进的 PR 主要集中在“状态机修复、诊断工具优化、平台兼容性、订阅认证回滚”四个方向：

- **#162220** `refactor(plugin-sdk)!: retire beta.5 whole-session-store bridge` — 清理 SDK 历史兼容性代码，降低维护债；需插件侧跟进。
- **#161871** `fix(test): session-store suites fail teardown with ENOTEMPTY` — 修复测试 teardown 因临时目录残留导致的失败，提升 CI 稳定性。
- **#161783** `fix(state): gate read-only agent database opens against quarantine` — 修复已标记 quarantin 的损坏 DB 仍被 read-only 打开的问题，降低脏读风险。
- **#162224** `fix(plugins): retain custody after failed module cleanup` — 修复插件资源清理失败后错误释放 custody 的边界情况，提升插件生命周期可靠性。
- **#162212** `fix(sessions): Gateway shutdown waits on throwaway session maintenance workers` — 缩短 Gateway 停机/重启时间，避免无谓阻塞。
- **#150246** `test(agents): run the retry-after e2e against the built runtime` — 让 retry-after 失败转移的 e2e 直接使用构建产物，减少重复 transpile 耗时。
- **#161709** `feat(macos): host the Gateway on bundled Bun` — macOS 原生包集成 Bun 运行时，简化安装与启动路径。
- **#162235** `fix(android): allow internal releases to commit to Google Play` — 修复 Android 内部渠道发布失败的提交问题。

> 项目整体仍在围绕 **Gateway 生命周期、状态一致性、平台分发** 三条主线加速收敛；核心功能（cron 去重、模型刷新、授权回收等）进入收尾阶段。

## 4. 社区热点

以下 Issue/PR 评论数最高、讨论最集中，反映当前社区的焦虑与诉求：

- **#143524** [P0] Agent SQLite WAL 无界增长至 1.4–2.8 GB，阻塞 Windows 上 Gateway 启动 — 97 评论。诉求：严格限制 WAL 体积并强制 checkpoint。
- **#153257** [P0] 2026.9.5 升级导致稳定环境出现 8 小时故障恢复 — 40 评论。诉求：发布前加强回归测试与灰度策略。
- **#44925** [P1] 子代理完成结果静默丢失（无重试、无通知、无自动重启）— 30 评论。诉求：subagent 结算失败需明确告警与可观测路径。
- **#149538** [P0] Gateway 达到 ready 却永远不提供服务，event loop 饥饿 — 22 评论。诉求：健康检查与负载上限需要联动告警。
- **#119720** [P1] 同步持久化阻塞 Gateway event loop 在高规模下 — 21 评论。诉求：异步化/批量写入。
- **#159662** [P0] `prepared-model-catalog.worker.js` 存在无界内存泄漏（~4–5 GB/h）— 13 评论。
- **#159596** [P1] Gateway 2026.9.6 出现内存锯齿 + 高频 critical memory-pressure — 13 评论。
- **#161654** [P1, 已关闭] Windows 下 `DataCloneError` 导致 cron/agent job 失败 — 9 评论。

> 热点集中在 **数据库 WAL/内存压力** 与 **子代理结算可靠性**。用户期望更严格的资源上限与更透明的失败原因。

## 5. Bug 与稳定性

按严重程度排列的关键 Bug（含是否已有修复 PR）：

| Issue | 严重程度 | 摘要 | Fix/PR 状态 |
|---|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | P0 | WAL 无界增长，阻断启动 | 待修复 |
| [#153257](https://github.com/openclaw/openclaw/issues/153257) | P0 | 2026.9.5 升级导致长时间宕机 | 待修复/缓解策略待定 |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | P0 | Gateway ready 不响应、event loop 饥饿 | 待修复 |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | P0 | model-catalog worker 内存泄漏 4–5GB/h | 待修复 |
| [#159596](https://github.com/openclaw/openclaw/issues/159596) | P1 | 内存锯齿 + 高频压力事件 | 待修复 |
| [#157325](https://github.com/openclaw/openclaw/issues/157325) | P0 | 单个 agent DB 卡住导致所有 agent 回复失败 | 待修复 |
| [#159612](https://github.com/openclaw/openclaw/issues/159612) | P0 | subagent 结算无限重试，`owner changed before settlement` | 待修复 |
| [#148707](https://github.com/openclaw/openclaw/issues/148707) | P1 | 同 session 新 turn 挤占进行中 turn，回复丢失 | 待修复 |
| [#144809](https://github.com/openclaw/openclaw/issues/144809) | P1 | claude-cli 长 turn 触发 `no active tool authority snapshot` | 待修复 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | P1 | hook/tool 子进程泄漏导致僵尸累积 | 待修复 |
| [#154812](https://github.com/openclaw/openclaw/issues/154812) | P0 | Gateway RSS 超 V8 heap 导致 OOM | 待修复 |
| [#157630](https://github.com/openclaw/openclaw/issues/157630) | P1 | `--max-old-space-size` 覆盖 worker resourceLimits | 待修复 |
| [#160521](https://github.com/openclaw/openclaw/issues/160521) | P0 | state DB 读入 seal 失败 + worker env closed → unhandled rejection | 待修复 |
| [#158126](https://github.com/openclaw/openclaw/issues/158126) | P0 | 关闭阶段 `gateway-server-close` 失败，unit left failed | 待修复 |
| [#157160](https://github.com/openclaw/openclaw/issues/157160) | P0 | plugin-doctor-post-session-state 导致 crash-loop | 已修复 [#157160](https://github.com/openclaw/openclaw/issues/157160) |
| [#161654](https://github.com/openclaw/openclaw/issues/161654) | P1 | Windows DataCloneError 导致 cron/agent job 失败 | ✅ Closed |

> 高严重度 Issue 多集中在 **内存/资源管理** 与 **状态/锁机制**。尚未形成统一的 fix PR，说明根因可能跨模块，需要系统性重构或引入资源上限与超时兜底策略。

## 6. 功能请求与路线图信号

- **#121729** [Feature] 为后台运行的 agent 提供友好的每日消费预算（daily spending allowances）— 8 评论。
- **#74481** [Feature] 从配置的 provider `/v1/models` 动态刷新 catalog，替代硬编码模型列表 — 6 评论。
- **#161955** [Feature] 导入 Claude Code / Codex 的 transcript 到 OpenClaw — 长期需求，有助于生态打通。
- **#88084** [Fix] 允许 `/approve` 等授权命令绕过正在进行的 reply lane — 有助于审批工作流的时效性。
- **#117231** [Fix] UI 端按 agent 隔离模型 provider 目录查询，避免跨 agent 鉴权信息污染。

> 结合当前 PR 队列，**平台兼容（macOS Bun / Android 发布）** 与 **状态/会话一致性（session store / DB quarantine / Doctor 迁移）** 是近期优先项；消费预算与动态 catalog 虽受期待，但暂不见明确 PR 入口，预计下一版本以稳定性为主。

## 7. 用户反馈摘要

- **痛点**：内存占用失控（WAL 膨胀、worker 泄漏、heap 限制被全局 flag 覆盖）、subagent 结算失败后无告警导致“静默丢活”、升级后出现长时间宕机且恢复成本高。
- **满意点**：Doctor 逐步接管遗留迁移、Telegram/Android 发布通道修复、macOS 原生包体验改善。
- **典型场景**：Windows Server 单网关 + 多飞书/WhatsApp 账号的高负载部署；claude-cli 长时间转场（> RUN_STALE_TAKEOVER_MS）后的“snapshot 丢失”；容器化部署中 PID 复用引发的锁泄露。
- **情绪倾向**：对近期版本（2026.9.x）的稳定性信心下降，呼吁强化回归测试与发布前灰度。

## 8. 待处理积压

以下 Issue 长期未获有效响应或需维护者重点关注：

- [#119720](https://github.com/openclaw/openclaw/issues/119720) — 同步持久化阻塞 event loop（P1，历史较长）
- [#102175](https://github.com/openclaw/openclaw/issues/102175) — embedded prompt cache 跨边界失效（P2，安全相关）
- [#70903](https://github.com/openclaw/openclaw/issues/70903) — billing cooldown 在欠费恢复后仍持续阻断用户（P0，长期影响用户体验）
- [#115642](https://github.com/openclaw/openclaw/issues/115642) — 订阅鉴权冷却期过长，建议引入探针式恢复与手动重置命令（P0）
- [#118885](https://github.com/openclaw/openclaw/issues/118885) — 大型 SQLite 启动多次冗余完整性检查（P1）
- [#158190](https://github.com/openclaw/openclaw/issues/158190) — Control UI 在活跃连接中将已接受消息标记为“Waiting for reconnect”（P2，UX 摩擦）

> 建议维护者优先处理 **P0 级资源/结算类 Issue**，并在 v2026.9.7 后续版本中提供明确的迁移指南与内存上限文档，以降低生产事故率。

---

## 横向生态对比

# AI 智能体开源生态横向对比分析报告
**日期：** 2026-10-01  
**分析对象：** OpenClaw, Zeroclaw, PicoClaw, QwenPaw, hermes-agent, AstrBot, DeepSeek Harness

## 1. 生态全景

当前个人 AI 助手与自主智能体开源生态呈现**“高活跃、强分化、重基建”**的态势。头部项目日均 PR/Issue 交互量均破百，社区协作深度显著。技术重心已从早期的“功能堆叠”全面转向“生产级稳定性治理”，特别是内存管理、多租户安全隔离及跨平台兼容性成为各项目的共同攻坚点。生态内部形成分层：底层运行时（如 OpenClaw/Gateway）追求极致稳定，上层应用（如 QwenPaw/Heracles）探索多模态协作与 Agent 编排，而垂直领域（如 DeepSeek Harness）则深耕本地化与安全边界。

## 2. 各项目活跃度对比

| 项目 | 24h Issues | 24h PRs | 版本发布 | 健康度评估 | 核心特征 |
| :--- | :---: | :---: | :--- | :---: | :--- |
| **OpenClaw** | 317 | 303 | v2026.9.7 (重大) | ⚠️ **风险积累中** | 规模巨大，但 Gateway 内存泄漏与状态一致性危机显著，处于修复期。 |
| **hermes-agent** | ~500 | ~500 | 无 | ✅ **优秀** | 极高活跃度，安全加固与稳定性修复并重，维护者响应迅速。 |
| **QwenPaw** | 20 | 41 | v2.2.2-beta.4 | ✅ **良好** | 聚焦记忆系统与 Provider 兼容性，Beta 迭代节奏稳健。 |
| **Zeroclaw** | 48 | 50 | 无 | ✅ **高** | 聚焦网关分离与多租户安全边界，PR 质量高，架构演进清晰。 |
| **DeepSeek Harness** | N/A (Disc. 259) | N/A | 无 | ✅ **良好** | 社区驱动型，聚焦插件生态与安全沙箱，Windows/Linux 体验优化中。 |
| **AstrBot** | 13 | 18 | 无 | ✅ **良好** | 多代理协作稳定性修复，代码库清洁，维护效率高。 |
| **PicoClaw** | N/A (低) | 4 新增/2 关闭 | 无 | ⚠️ **中等** | 聚焦 Web UI 体验重构，活跃度相对较低，主要解决历史遗留 Bug。 |

## 3. OpenClaw 在生态中的定位

*   **规模与影响力：** OpenClaw 是当前生态中**代码体量最大、贡献者基数最高**（334 contributors/版本）的单体项目，充当着“重型网关/运行时”的基础设施角色。
*   **技术路线差异：** 与其他项目相比，OpenClaw 更强调**全栈闭环**（从 macOS 原生包到 Android 发布）和**复杂状态管理**（Session Store、SQLite WAL）。相比之下，Zeroclaw 和 AstrBot 更聚焦于网关分离后的模块化扩展，而 QwenPaw 和 hermes-agent 则更侧重应用层的记忆与插件生态。
*   **优势与挑战：** 优势在于强大的平台适配能力和庞大的社区基础；挑战在于其复杂的架构导致了严重的**内存泄漏**和**子任务结算可靠性**问题，这与 zeroclaw 正在通过架构重构避免的问题形成对比。

## 4. 共同关注的技术方向

以下需求在多项目中涌现，表明是行业的共性痛点：

1.  **内存与资源管理**
    *   **涉及项目：** OpenClaw, hermes-agent, DeepSeek Harness
    *   **诉求：** OpenClaw 出现 WSL/WAL 无界增长及 Worker 内存泄漏；hermes-agent 关注桌面端空闲资源消耗；DeepSeek Harness 讨论 Prompt Token Pressure 的本地压缩策略。
2.  **多租户与身份安全隔离**
    *   **涉及项目：** Zeroclaw, hermes-agent, OpenClaw
    *   **诉求：** Zeroclaw 集中修复 S0 级跨 Agent 数据访问漏洞（#9647, #9646）；hermes-agent 强化 Profile 隔离；OpenClaw 关注订阅认证与权限回滚。
3.  **子任务/Agent 编排的可观测性与可靠性**
    *   **涉及项目：** OpenClaw, QwenPaw, AstrBot
    *   **诉求：** OpenClaw 子代理结果静默丢失；QwenPaw 后台任务状态同步失败；AstrBot 多代理响应丢失。均指向**异步任务状态持久化**与**失败告警**机制的缺失。
4.  **跨平台一致性（Windows/Linux/macOS）**
    *   **涉及项目：** DeepSeek Harness, hermes-agent, PicoClaw
    *   **诉求：** DeepSeek Harness 用户强烈呼吁 Linux 支持及 Windows ACL 修复；hermes-agent 修复 Windows 安装权限与 macOS 双重渲染；PicoClaw 修复 QQ Channel 等多平台适配。

## 5. 差异化定位分析

*   **OpenClaw：** **企业级/全平台 AI 网关**。适合需要高度定制化、多通道接入（Telegram/WhatsApp/飞书等）及本地部署的大型用户群体。技术栈重，运维成本高。
*   **Zeroclaw：** **云原生/微服务架构智能体平台**。聚焦于网关分离、插件 webhook 及严格的 RBAC，适合多租户 SaaS 场景及注重安全合规的企业开发。
*   **hermes-agent：** **全能型个人/团队协作助手**。平衡了安全加固与桌面体验，支持 Portal 订阅与本地混合部署，适合对计费透明度和跨平台体验有要求的用户。
*   **QwenPaw：** **记忆增强型 Agent 框架**。深度集成 ReMeLightMemoryCard 与 Reranker，专注于长周期记忆管理与 Provider 兼容性，适合需要长期上下文记忆的 AI 应用开发者。
*   **AstrBot：** **轻量化多代理编排器**。专注于子代理路由、Persona 一致性及 OpenAI Responses API 支持，适合构建复杂工作流的中层开发者。
*   **DeepSeek Harness：** **本地优先/插件化终端工具**。强调本地运行、加密凭据管理（dsh-vault）及 Token 优化，适合关注隐私与离线能力的终端用户。
*   **PicoClaw：** **Web UI 体验导向的轻量网关**。主要解决消息队列反馈与多频道会话管理，适合注重交互体验的轻量级部署场景。

## 6. 社区热度与成熟度

*   **快速迭代阶段（High Velocity）：** **OpenClaw**, **hermes-agent**, **Zeroclaw**。这些项目每日 PR/Issue 数量巨大，正处于架构重构或大规模功能冲刺期，尤其是 Zeroclaw 的 v0.9.0 网关分离和 hermes-agent 的安全加固系列。
*   **质量巩固阶段（Stability Focus）：** **QwenPaw**, **AstrBot**。已从功能扩张转向 Bug 修复与兼容性打磨（如 QwenPaw 的嵌入索引修复，AstrBot 的多代理稳定性）。
*   **生态成熟/ niche 阶段：** **DeepSeek Harness**, **PicoClaw**。DeepSeek Harness 通过 Discussions 驱动生态，用户自发贡献插件；PicoClaw 则聚焦于特定用户体验的精细化打磨。

## 7. 值得关注的趋势信号

1.  **从“可用”到“可信”的安全转型：**
    *   所有头部项目均在强化**身份隔离**（Zeroclaw 的 per-agent ownership, hermes-agent 的 Profile 隔离）和**数据隐私**（防止 .env 密钥进入快照）。这表明行业已进入“信任计算”阶段，安全不再是附加功能而是核心基石。
2.  **内存安全成为稳定性分水岭：**
    *   OpenClaw 的内存泄漏危机警示后续开发者：**Gateway 的长期运行稳定性**依赖于严谨的资源上限控制（Cgroup/memory limits）与异步化改造，同步阻塞与 WAL 膨胀是生产环境的大敌。
3.  **多代理编排的“可见性危机”：**
    *   OpenClaw、QwenPaw、AstrBot 不约而同地暴露出子任务静默失败的问题。未来**可观测性（Observability）**——特别是任务状态机、失败重试与告警——将成为下一代 Agent 框架的核心竞争力。
4.  **跨平台一致性仍是最大短板：**
    *   Windows 权限、Linux 支持缺失、macOS 渲染异常是普遍痛点。成功的框架必须提供**一次编写、多端一致**的运行时体验，而非平台特供补丁。
5.  **本地化与成本优化的深度融合：**
    *   DeepSeek Harness 的 Token 压力优化与 QwenPaw 的缓存兼容性修复，反映出用户对**API 成本控制**的敏感度提升。本地模型（如 Qwen3.8）与云端模型的混合编排将成为重要方向。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-10-01

---

## 1. 今日速览

2026年10月1日，Zeroclaw 项目活跃度处于**高位**：过去24小时新增 48 条 Issues（43 新开/活跃）、50 条 PR（全部待合并），无任何新版本发布。安全与身份域（identity-access）是当前社区最密集的关注焦点，今日多条 S0 级安全问题集中报告并被接受；同时网关分离（v0.9.0）与插件生态建设推进迅速，10 余个大型 PR 处于审查阶段，涵盖会话持久化、原子配置发布、插件 webhook 跨进程转发等核心架构工作。整体健康度：**高**。

---

## 2. 版本发布

无新版本发布。当前路线图聚焦 **v0.9.0**（Runtime/Gateway 分离 Phase 3）及 **v0.8.6**（Phase 2 Runtime 收尾），详见 Issue #7432。

---

## 3. 项目进展

### 今日新增/活跃 PR（共 50 条，精选 12 条）

| PR | 作者 | 规模 | 摘要 |
|----|------|------|------|
| [#11331](https://github.com/zeroclaw-labs/zeroclaw/pull/11331) | @JordanTheJet | XL | `feat(gateway): serve sessions REST through the core` — 将会话 REST 接口统一走核心层，推进网关分离 |
| [#11330](https://github.com/zeroclaw-labs/zeroclaw/pull/11330) | @IftekharUddin | XS | `fix(rpc): fence session/configure on the authorized incarnation` — 修复 session 实例化检查缺失 |
| [#11326](https://github.com/zeroclaw-labs/zeroclaw/pull/11326) | @IftekharUddin | M | `fix(rpc): refuse persisted log reads to scoped principals` — 收紧日志读取权限边界（S0 安全修复） |
| [#11322](https://github.com/zeroclaw-labs/zeroclaw/pull/11322) | @IftekharUddin | XL | `feat(gateway): forward plugin webhooks to the core over RPC` — 插件 webhook 跨进程转发 |
| [#11320](https://github.com/zeroclaw-labs/zeroclaw/pull/11320) | @IftekharUddin | XL | `feat(rpc): dispatch plugin webhooks over the core RPC` — 上游依赖，插件 webhook 核心入口 |
| [#11319](https://github.com/zeroclaw-labs/zeroclaw/pull/11319) | @IftekharUddin | XL | `feat(gateway): move plugin webhook admission and dedup into a core ingress` — 网关与核心之间的 webhook 路由统一 |
| [#10911](https://github.com/zeroclaw-labs/zeroclaw/pull/10911) | @Audacity88 | XL | `feat(config): publish atomic live revisions` — 配置原子发布，防止并发写导致的不一致 |
| [#11261](https://github.com/zeroclaw-labs/zeroclaw/pull/11261) | @IftekharUddin | XL | `feat(plugins): replace an installed package through staged admission` — 插件更新+回滚的宿主端实现 |
| [#11289](https://github.com/zeroclaw-labs/zeroclaw/pull/11289) | @IftekharUddin | XL | `feat(rpc): stable denial reason identifiers and localized selector denials` — RPC 授权拒绝消息规范化 |
| [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) | @vrurg | XL | `feat(sessions): add persistent session prompt attachments` — 会话级持久化提示词附件（SQLite） |
| [#11307](https://github.com/zeroclaw-labs/zeroclaw/pull/11307) | @IftekharUddin | XL | `feat(channels): cap sender-role turns with a per-sender action budget` — 发送者角色 Action 预算控制 |
| [#11281](https://github.com/zeroclaw-labs/zeroclaw/pull/11281) | @JordanTheJet | XL | `feat(desktop): Quit stops only processes this app instance launched` — Desktop 退出行为规范 |

**推进判断：** v0.9.0 网关分离工作取得实质性进展，RPC 安全边界、插件生态和原子配置发布三架并驱，预计本季度内可形成可测试候选。

---

## 4. 社区热点

### 最活跃 Issue（评论数 Top 5）

1. **#8692** [OPEN, 15 评论](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — *Maintainer decision queue for RFCs and design issues*  
   维护者决策队列 Tracker，协调 RFC 与设计议题审批流程。反映社区对治理透明度的需求。

2. **#5982** [OPEN, 11 评论](https://github.com/zeroclaw-labs/zeroclaw/issues/5982) — *Per-sender RBAC for multi-tenant agent deployments*  
   多租户 Agent 部署中的发送者级 RBAC，关联 Issue #11068 和 #11307（per-sender action budget），是当前安全改造的核心诉求。

3. **#10366** [CLOSED, 10 评论](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) — *RFC: Clarify PR review evidence, freshness warnings*  
   已关闭，修订后快速合并，新增 expedited merge lane 机制。

4. **#10230** [CLOSED, 7 评论](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) — *Bug: Daemon startup or reload can overflow during agent initialization*  
   S1 级崩溃问题，已通过 ZeroCode/TUI 相关修改修复。

5. **#10165** [CLOSED, 7 评论](https://github.com/zeroclaw-labs/zeroclaw/issues/10165) — *Bug: independent delegate bypasses `block_high_risk_commands`*  
   S0 安全绕过，独立委托可绕过高风险命令拦截。

### 新发起讨论

- **#11235** [OPEN, 2 评论](https://github.com/zeroclaw-labs/zeroclaw/issues/11235) — *RFC: Knowledge corpus (RAG) for the agent*  
  用户希望 Agent 能基于 Operator 维护的文档库进行检索回答，符合市场对 RAG 能力的期望。

---

## 5. Bug 与稳定性

### 今日活跃 S0/S1 级安全问题（按严重程度）

| Issue | 状态 | 严重度 | 组件 | 摘要 |
|-------|------|--------|------|------|
| [#9647](https://github.com/zeroclaw-labs/zeroclaw/issues/9647) | In-progress | S0 | memory/knowledge | 知识图谱无 per-agent 归属，任意 Agent 可读写其他 Agent 数据 |
| [#9646](https://github.com/zeroclaw-labs/zeroclaw/issues/9646) | In-progress | S0 | tools/sessions | 会话/频道读写工具缺乏 per-agent 所有权检查 |
| [#11198](https://github.com/zeroclaw-labs/zeroclaw/issues/11198) | Accepted | S0 | memory/delegate | 委托记忆工具丢失主体作用域 |
| [#11126](https://github.com/zeroclaw-labs/zeroclaw/issues/11126) | In-progress | S0 | runtime/session | 已撤销管理员权限仍可通过排队操作绕过 |
| [#11127](https://github.com/zeroclaw-labs/zeroclaw/issues/11127) | Accepted | S0 | security/sandbox | Session-data 工具绕过主体所有权检查 |
| [#11123](https://github.com/zeroclaw-labs/zeroclaw/issues/11123) | Accepted | S0 | security/sandbox | SOP 执行接受通配符工具选择器而无需 `tools:execute` |
| [#10876](https://github.com/zeroclaw-labs/zeroclaw/issues/10876) | Partially delivered | S1 | gateway/auth | 网关配置写入认证段后需 daemon 重载才生效 |
| [#11237](https://github.com/zeroclaw-labs/zeroclaw/issues/11237) | In-progress | S1 | config/cron | Config 编辑器无法写入声明式 cron 计划 |
| [#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) | Closed | S1 | zerocode/tui | Daemon 重载时栈溢出崩溃（已修复） |
| [#10165](https://github.com/zeroclaw-labs/zeroclaw/issues/10165) | Closed | S0 | security/sandbox | 独立委托绕过高风险命令拦截（已修复） |

**安全修复 PR 动态：** #11330（session fence）、#11326（日志读取权限）、#11289（稳定拒绝原因）均在今日提交，持续收紧安全边界。

---

## 6. 功能请求与路线图信号

### 高潜力功能请求

| Issue | 类型 | 可能纳入版本 | 分析 |
|-------|------|-------------|------|
| [#5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982) | Enhancement | v0.9.0 | Per-sender RBAC，已有 PR #11307（per-sender action budget）跟进 |
| [#11235](https://github.com/zeroclaw-labs/zeroclaw/issues/11235) | RFC: RAG | v0.9.0+ | Knowledge corpus 文档检索，需求明确，待维护者评审 |
| [#11255](https://github.com/zeroclaw-labs/zeroclaw/issues/11255) | Feature | v0.9.0 | WhatsApp 图片下载与标记，关联 #10975（已关闭）的后续 |
| [#10995](https://github.com/zeroclaw-labs/zeroclaw/issues/10995) | Feature | v0.9.0 | 插件更新+失败回滚，PR #11261 已在途中 |
| [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) | Tracker: OIDC | v0.9.0 | OIDC 核心栈已合并，收尾阶段 |
| [#11001](https://github.com/zeroclaw-labs/zeroclaw/issues/11001) | Feature | v0.9.0 | 外部网关完整本地 IPC 覆盖 |

**路线图判断：** v0.9.0 将聚焦**安全边界收紧**（per-agent ownership）、**网关分离完成**（#7432 Phase 3）和**插件生态成熟**（更新/回滚/webhook），RAG 能力作为 v0.9.0 后的独立 RFC 跟进。

---

## 7. 用户反馈摘要

### 真实痛点

- **多租户安全隔离缺失**：多个 S0 问题指向同一个核心焦虑——任意 Agent 可以访问其他 Agent 的知识图谱、会话和记忆数据（#9647, #9646, #11198, #11127）。用户将安全视为生产部署的前提条件。
- **委托链安全漏洞**：独立委托（independent delegate）可绕过 `block_high_risk_commands`（#10165 已修复），但委托记忆工具（#11198）和 session-data 工具（#11127）的 Scope 丢失问题仍在开放。
- **WhatsApp 图片体验断裂**：Telegram 支持 `[IMAGE:<path>]` 标记，WhatsApp 却只返回文本 `[Image]`，vision 能力完全不可用（#10975 已关闭但 #11255 跟进）。
- **配置/日志权限粒度粗**：日志读取、配置写入等操作缺乏 scoped principal 检查（#11326 修复中，#10876 部分交付）。

### 满意点
- `cron update` 静默丢弃变更的行为终于被报告（#9770），社区对声明式配置的预期一致性有强烈诉求。
- Discord 插件正式文档化（PR #11329）得到认可。

---

## 8. 待处理积压

| Issue/PR | 状态 | 风险 | 建议关注时间 |
|----------|------|------|-------------|
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | Open (15 评论, 自 2026-07-04) | 治理透明度 | ⚠️ 超过 90 天未关闭，建议维护者给出时间表 |
| [#9647](https://github.com/zeroclaw-labs/zeroclaw/issues/9647) | In-progress (S0) | 多租户安全 | 🔴 关键安全项，需尽快推进 PR |
| [#9646](https://github.com/zeroclaw-labs/zeroclaw/issues/9646) | In-progress (S0) | 多租户安全 | 🔴 同上 |
| [#11126](https://github.com/zeroclaw-labs/zeroclaw/issues/11126) | In-progress (S0) | 权限绕过 | 🔴 PR #10412 仅部分修复，剩余路径待处理 |
| [#11235](https://github.com/zeroclaw-labs/zeroclaw/issues/11235) | RFC open | RAG 能力 | ⚠️ 高价值功能，维护者评审优先级待确认 |
| [#11331](https://github.com/zeroclaw-labs/zeroclaw/pull/11331) | Open (XL) | 网关分离 | 依赖 #11277 和 #11186，审查节奏需关注 |
| [#11320](https://github.com/zeroclaw-labs/zeroclaw/pull/11320) | Open (XL) | 插件 webhook | 依赖 #11319 和 #11165，存在 stacked PR 审查复杂度 |

---

**报告生成时间：** 2026-10-01  
**数据截止：** 2026-10-01 00:00 UTC  
**项目仓库：** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：** 2026-10-01  
**数据来源：** GitHub (sipeed/picoclaw)  
**分析周期：** 过去24小时

## 1. 今日速览
PicoClaw 昨日活跃度中等，核心聚焦于 Web UI 用户体验的深层重构。虽然仅关闭了 2 个 PR（主要是历史遗留的 QQ Channel 适配和 Shell 权限修复），但启动了针对“消息队列静默丢失”和“会话状态不透明”的一揽子修复计划。4 个新 PR 由核心贡献者 @racso2609 提交，显示出团队正在系统性解决 Agent 繁忙时的用户反馈缺失问题，项目整体向更稳定、透明的交互体验迈进。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
昨日合并/关闭了 2 个 PR，主要修复了长期存在的兼容性和权限配置问题：
*   **#3313 (Closed):** 修复了 `customAllowPatterns` 失效的 Bug。此前 `guardCommand` 中的默认拒绝模式优先级过高，导致用户在自定义允许列表中添加的命令（如 `git push`）被错误拦截。此修复提升了 Agent 执行自定义工具的可靠性。
*   **#1349 (Closed):** 完成了 QQ Channel 插件的多媒体支持增强。包括解析表情结构、处理音视频/文件消息以及支持 Markdown 回复降级策略。这是一个长期未关闭的功能完善，现已合入主线，增强了多频道生态的完整性。

**整体进展评估：** 代码库清洁度有所提升，同时为即将推出的 Web UI 功能集扫清了技术障碍。

## 4. 社区热点
*   **#3408 [OPEN] Web UI 消息队列静默丢弃问题**
    *   **链接:** https://github.com/sipeed/picoclaw/issues/3408
    *   **分析:** 这是当前最受关注的体验类 Bug。用户反馈在 Agent 忙时发送的消息会被静默入队且无视觉反馈，队列满时甚至直接丢弃。该 Issue 直接催生了 #3410, #3411, #3412 三个配套 PR，显示社区对“可观测性”和“即时反馈”的强烈诉求。
*   **#3413 [OPEN] 全局多频道会话侧边栏**
    *   **链接:** https://github.com/sipeed/picoclaw/pull/3413
    *   **分析:** 提出将 Web UI 的会话列表从单一的 `pico` 频道扩展至全频道全局视图。这是对现有架构的重大 UI 增强，旨在解决多频道场景下会话管理混乱的问题，与 #3408 同属一个大型重构项目 (#3406) 的一部分。

## 5. Bug 与稳定性
*   **高优先级 Bug: Agent 忙时消息静默丢失 (#3408)**
    *   **描述:** 当 Agent 正在处理任务时，Web UI 接收到的消息若无可用队列空间则无声消失，导致用户误以为发送失败或系统无响应。
    *   **状态:** 已有修复方案。PR #3410 负责暴露队列状态，PR #3412 负责让失败轮次可见。
*   **中优先级 Bug: Shell 命令权限绕过/失效 (已修复)**
    *   **描述:** #3313 此前报告的 `customAllowPatterns` 无效问题。
    *   **状态:** **已修复**，合并于 #3313。

## 6. 功能请求与路线图信号
*   **Web UI 状态驱动的工作指示器 (#3411):** 用户不满足于现有的“思考中”占位符动画，要求提供基于真实 Agent 状态的工作指示。这表明用户对 Agent 内部状态的透明度有更高期待，路线图正从“基础可用”转向“精细状态控制”。
*   **全局会话管理 (#3413):** 需求跨越单一频道，要求统一的会话视图。这暗示 PicoClaw 正逐步从单通道工具向多通道统一网关演进。
*   **Deltachat 重构 (#3222):** 虽然未合并，但该 PR 提出了清理遗留代码、移除硬编码配置并对接官方中继列表的请求，反映了维护者对长期技术债清理的关注。

## 7. 用户反馈摘要
*   **痛点:** 用户最不满意的是“无反馈的黑盒体验”。在 #3408 中提到，消息发出后毫无迹象，直到 Agent 结束运行才看到结果，这种不确定性严重影响了交互信心。
*   **使用场景:** 用户在复杂任务流中频繁发送消息，当 Agent 处于长时间思考或工具执行状态时，误操作率高，亟需明确的“排队中”或“已丢弃”状态提示。
*   **满意度:** 用户对 QQ Channel 多媒体支持的完善表示认可（#1349），这解决了部分非 Discord/Telegram 用户的实际沟通障碍。

## 8. 待处理积压
*   **#3222 [OPEN] Deltachat 清理重构**
    *   **链接:** https://github.com/sipeed/picoclaw/pull/3222
    *   **提醒:** 该 PR 已开放较长时间，涉及大幅代码精简和文档更新。虽然有助于降低维护成本，但可能涉及破坏性变更（如移除密码配置），需要维护者评估优先级并确保社区迁移路径清晰。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：** 2026-10-01
**分析对象：** agentscope-ai/QwenPaw
**数据周期：** 过去24小时

## 1. 今日速览
QwenPaw 项目今日保持高活跃度，共处理 61 个社区交互项（20 Issues + 41 PRs）。核心进展在于发布了 **v2.2.2-beta.4** 预发布版本，重点修复了嵌入向量索引、Anthropic 缓存计费以及自定义 OpenAI 兼容提供商的缓存参数支持等关键问题。社区对稳定性问题的关注依然集中，尤其是会话上下文污染、后台任务状态同步及 Windows 环境下的安全沙箱问题。整体来看，项目正处于 v2.2.2 正式版发布前的密集修补阶段，技术债务正在逐步清偿。

## 2. 版本发布
### v2.2.2-beta.4
*   **发布时间：** 2026-09-30
*   **更新内容：**
    *   **功能新增：** 为 ReMeLightMemoryCard 添加了 Reranker UI 配置面板，增强了记忆模块的可配置性 ([#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399))。
    *   **性能优化：** 拆分了控制台聊天依赖，优化了加载性能。
    *   **版本升级：** 版本号 bump 至 2.2.2b4。
*   **迁移注意事项：** 此为 Beta 版本，建议用户在生产环境使用前充分测试嵌入重索引及多代理后台任务场景。

## 3. 项目进展
今日有 11 条 PR 被合并或关闭，主要聚焦于底层稳定性和兼容性修复：
*   **嵌入向量健康度修复：** [#8062](https://github.com/agentscope-ai/QwenPaw/pull/8062) 解决了当单个 chunk 超过 provider token 限制时导致整个批次静默丢弃的问题，确保部分失败不影响其他健康向量的索引。
*   **时区处理修正：** [#8049](https://github.com/agentscope-ai/QwenPaw/pull/8049) 修复了 `_process_local_tz()` 函数因使用固定偏移量而导致夏令时 (DST) 切换时转录时间戳偏移的 bug。
*   **缓存兼容性增强：** [#8061](https://github.com/agentscope-ai/QwenPaw/pull/8061) 允许自定义网关声明 OpenAI prompt cache 参数，解决了 custom OpenAI-compatible providers 的 `prompt_cache_key` 被拒绝的问题。
*   **上下文计量准确化：** [#8060](https://github.com/agentscope-ai/QwenPaw/pull/8060) 修复了 Anthropic Messages 提供商上下文计量器低估使用情况的问题，现开始统计缓存读写 token。

**整体推进评估：** 今日修复紧密围绕 v2.2.2-beta.4 发布后的用户反馈闭环，特别是在记忆系统和 Provider 兼容性这两个高频痛点上取得了实质性进展，项目稳定性显著提升。

## 4. 社区热点
以下 Issues/PRs 因涉及核心架构或安全边界，引发了较多关注：

*   **[Bug] 飞书会话被意外取消** ([#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011))
    *   **热度分析：** 已关闭。涉及多 UI 会话下 Console 停止请求错误取消活跃 Feishu 会话的问题，反映了多会话状态管理中的竞态条件风险。
*   **[Bug] 安全沙箱在 Windows 10 被突破** ([#7672](https://github.com/agentscope-ai/QwenPaw/issues/7672))
    *   **热度分析：** 持续开放。用户报告在 Windows 环境下安全沙箱机制存在绕过可能，这是企业级部署的关键信任指标，需持续关注补丁发布。
*   **[Feature] Advisor Mode 引入** ([#7569](https://github.com/agentscope-ai/QwenPaw/pull/7569))
    *   **热度分析：** 长期 OPEN。提出“顾问+执行者”双模型协作模式，旨在通过更强模型规划、便宜模型执行来优化成本与效果平衡，是架构层面的重要功能探索。
*   **[Bug] Windows 自动模式下 COM 命令关闭用户 PowerPoint** ([#8002](https://github.com/agentscope-ai/QwenPaw/issues/8002))
    *   **热度分析：** 持续开放。涉及 `auto` 审批级别下 inline Office COM 命令的执行权限问题，直接关系到用户数据安全，属于高优先级安全隐患。

## 5. Bug 与稳定性
今日新增/活跃 Bug 共 18 个，按严重程度排列：

**P0 - 严重/数据丢失风险：**
*   **#8022:** `send_file_to_user` 产生的文件/图片块污染会话上下文，导致后续所有模型请求持续 400 错误（未降级）。*(无 Fix PR)*
*   **#8064:** DeepSeek 提供商在使用 PDF 后永久破坏会话，后续请求均报 `file must have a file_id`。*(无 Fix PR)*
*   **#7672:** Windows 安全沙箱被突破。*(无 Fix PR)*

**P1 - 主要功能失效：**
*   **#8059:** 后台代理任务完成后记录丢失（404），且最终响应为空。*(无 Fix PR)*
*   **#8013:** 技能池下载大技能时前端 30s 超时导致任务中断，技能无法落地。*(无 Fix PR)*
*   **#8035:** 转录设置页面无法更新 `transcription_model`，切换提供商静默失败。*(无 Fix PR)*

**P2 - 体验/显示问题：**
*   **#8047:** DBX MCP 的 `server/discover` 返回 422 未被识别为遗留协议证据，导致 streamable_http driver 未激活。
*   **#8046:** 时区处理冻结 UTC 偏移，导致转录时间戳随 DST 偏差。*(已有 Fix PR: [#8049](https://github.com/agentscope-ai/QwenPaw/pull/8049))*
*   **#8040:** Embedding 重索引不完整，CJK chunk 超过 token 限制时整批静默丢弃。*(已有 Fix PR: [#8062](https://github.com/agentscope-ai/QwenPaw/pull/8062))*
*   **#8057/8058:** Anthropic 缓存 token 计量不准及自定义 OpenAI 提供商缓存参数被拒。*(已有 Fix PR: [#8060](https://github.com/agentscope-ai/QwenPaw/pull/8060), [#8061](https://github.com/agentscope-ai/QwenPaw/pull/8061))*

## 6. 功能请求与路线图信号
*   **消息撤回/编辑与会话回滚：** [#7997](https://github.com/agentscope-ai/QwenPaw/issues/7997) 请求在 WebUI 中支持编辑已发送消息并自动截断历史及回滚文件快照。这符合当前 LLM Agent 应用对“纠错”能力的普遍需求，可能与长周期的会话管理重构相关。
*   **@所有人过滤：** [#7945](https://github.com/agentscope-ai/QwenPaw/issues/7945) 请求增加对 IM 中 @all 消息的过滤能力，避免不必要的 Agent 响应。这是一个具体的可用性优化需求，易于实现，可能被纳入下个维护版本。
*   **Advisor Mode (双模型协作)：** [#7569](https://github.com/agentscope-ai/QwenPaw/pull/7569) 展示了用户对成本优化和复杂任务分解的深层需求，若合并将作为 v2.3 或更高版本的核心差异化功能。

## 7. 用户反馈摘要
*   **痛点：** 用户对**后台任务的可观测性**和**状态持久化**极为不满（#8059），目前 `spawn_subagent` 完成后父会话无感知，结果易丢失。
*   **痛点：** **Provider 兼容性**仍是高频投诉点，特别是 DeepSeek 和自定义 OpenAI 兼容接口在处理特殊内容（PDF、缓存参数）时的健壮性不足（#8022, #8064, #8058）。
*   **满意点：** 社区对 v2.2.2-beta.4 快速响应嵌入索引和计量 Bug 表示认可，体现了维护者对技术债的重视。
*   **担忧：** Windows 端的安全沙箱稳定性（#7672, #8002）引发用户对自动模式（auto mode）下 Agent 行为边界的担忧。

## 8. 待处理积压
*   **#7011** [CLOSED] 飞书会话取消 bug 虽已关闭，但建议验证修复是否完全覆盖多会话交叉场景。
*   **#7672** [OPEN] Windows 安全沙箱突破问题，关系到企业合规，需优先排查。
*   **#8002** [OPEN] Windows COM 命令直接调用风险，需在 auto 模式下加强命令白名单或沙箱隔离。
*   **#7997** [OPEN] 消息撤回功能需求，建议评估是否放入下个版本路线图。
*   **#5861** [OPEN] macOS 打包后端 PATH 解析问题，长期未解决，影响 macOS 用户体验。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：2026-10-01**  
**数据来源：** https://github.com/NousResearch/hermes-agent

---

## 1. 今日速览

2026年10月1日，hermes-agent 项目保持高活跃度，过去24小时内共产生 500 条 Issues 更新和 500 条 PR 更新（待合并 423，已合并/关闭 77）。今日无新版本发布。整体呈现“安全加固与稳定性修复并重”的特征：多个高优先级的安全 PR 集中在同一天提交（如 #129791、#129793、#129795 等），同时针对 Windows 安装、桌面端双重重渲染、macOS 密钥链等多个长期痛点推进修复。项目健康度良好，维护者响应迅速。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

今日多个重要 PR 处于开放状态，预计将纳入近期版本：

### 安全加固系列（由 @Froraut 主导）
- **#129791** [fix(delegation)] 隔离 Profile 子控制，防止跨 Profile 观测或控制
- **#129793** [fix(a2a)] 保持回调交付于验证来源
- **#129795** [fix(security)] 将进程控制绑定到 Profile 会话
- **#129796** [fix(gateway)] 将 RoomLink 授权绑定到名单身份
- **#129798** [fix(web)] 强制执行预调度 URL 策略链
- **#129799** [fix(backup)] 使快照发布事务化
- **#129801** [fix(security)] 防止 .env 声明的密钥进入会话快照
- **#129804** [fix(webhook)] 事务化订阅变更并轮换重绑密钥
- **#129805** [fix(debug)] 截断前对支持外发进行脱敏
- **#129802** [fix(desktop)] 强制 macOS 更新版本下限，防止降级攻击

### 平台兼容性与安装修复
- **#129790** [fix(agent)] 连接超时后跳过远程回退
- **#129794** [fix(pm)] 接受带后缀的 gh 归档目标
- **#129517** [fix(install)] 避免无树工作站克隆（改用 `blob:none`）
- **#124730** [fix(pm)] 将 bionic 目标从 git 间隙中排除

### 用户体验与功能改进
- **#128957** [fix(desktop)] Wayland ozone 下跳过 WSL GPU 黑名单覆盖
- **#125178** [feat(gateway)] 新增 `agent:message:filter` / `agent:response:filter` 钩子事件
- **#129803** [fix(desktop)] 复用保存的自定义端点凭据
- **#129746** [fix(search)] 将受保护目录修剪范围扩展到 ripgrep 路径
- **#129797** [perf(checkpoints)] 缓存失败的 Managed Git 查找

> **整体评估：** 今日进展集中在安全边界强化、跨 Profile 隔离、以及 Windows/macOS 安装稳定性修复，项目向前迈出了坚实的一步。

---

## 4. 社区热点

### 评论最多的 Issues

| Issue | 标题 | 评论数 | 状态 | 链接 |
|-------|------|--------|------|------|
| #110912 | Nous Portal 订阅积分耗尽后按全价计费（折扣路由 Bug） | 30 | CLOSED | [链接](https://github.com/NousResearch/hermes-agent/issues/110912) |
| #127647 | 桌面端空闲资源消耗追踪（CPU/GPU/内存） | 23 | OPEN | [链接](https://github.com/NousResearch/hermes-agent/issues/127647) |
| #123801 | macOS 桌面端流式传输时助手回复重复渲染 | 21 | OPEN | [链接](https://github.com/NousResearch/hermes-agent/issues/123801) |
| #109552 | 标签审计：未验证的 duplicate/invalid 标签 | 18 | CLOSED | [链接](https://github.com/NousResearch/hermes-agent/issues/109552) |
| #47349 | 可配置的记忆后端（禁用 memory.md） | 16 | OPEN | [链接](https://github.com/NousResearch/hermes-agent/issues/47349) |

**热点分析：**
- **#110912**（已关闭）反映用户对计费透明度的高度关注，订阅模式下的折扣路由逻辑存在缺陷。
- **#127647** 和 **#123801** 集中体现了桌面端性能与渲染稳定性的核心痛点。
- **#47349** 长期开放，用户对可配置记忆后端有持续需求。

### 高赞成数 Issues
- **#96532** [feat(desktop)] 允许隐藏本机管理的 gateway — **3 👍**（用户希望只使用远程 gateway）
- **#47349** [Feature] 可配置记忆后端 — **1 👍**
- **#123801** / **#126524** 重复渲染 Bug — 各 1 👍

---

## 5. Bug 与稳定性

### P1 级 Bug
| Issue | 描述 | 平台 | 状态 | 相关 PR |
|-------|------|------|------|---------|
| #110912 | Portal 订阅积分耗尽后按全价计费 | 通用 | CLOSED | - |
| #123801 | macOS 桌面端助手回复重复渲染 | macOS | OPEN | 暂无 |
| #126524 | 桌面端新生成会话时回复双重渲染 + 滚动跳跃 | 跨平台 | OPEN | 暂无 |
| #128468 | 桌面端转录区重复渲染 + 滚动跳跃 | Linux | OPEN | 暂无 |
| #122935 | Windows 更新后 DACL 权限过严导致非提升进程无法执行 | Windows | OPEN | 暂无 |
| #122529 | cron 外部 worker 缺少 venv site-packages | 通用 | OPEN | 暂无 |

### P2 级 Bug
| Issue | 描述 | 平台 | 状态 | 相关 PR |
|-------|------|------|------|---------|
| #127647 | 桌面端空闲资源消耗（CPU/GPU/内存） | 通用 | OPEN | 暂无 |
| #123926 | 插件启动时静默丢失（字典迭代时大小变化） | 通用 | OPEN | 暂无 |
| #91115 | macOS 更新后钥匙串提示（Safe Storage 旋转） | macOS | OPEN | 暂无 |
| #62336 | 终端环境快照捕获含凭据的环境变量 | 通用 | OPEN | **#129801** 部分修复 |
| #122402 | Ubuntu 历史接管构建 python-olm 失败（缺少 clang++） | Linux | OPEN | 暂无 |
| #122160 | 外部进程触发 hermes_bootstrap 重执行丢失目录 | Windows | OPEN | 暂无 |
| #96731 | browser_exec 在 Windows 桌面端 420s 超时 | Windows | OPEN | 暂无 |
| #79087 | Windows 运行时探测超时误判为首次运行 | Windows | OPEN | 暂无 |
| #124807 | Windows 更新删除 libcrypto DLL 权限被拒 | Windows | OPEN | 暂无 |
| #122783 | PM 管理安装未重执行到 venv，gateway 运行在基础解释器 | 通用 | OPEN | 暂无 |

### 已有 Fix PR 的 Bug
- **#62336** → **#129801** [fix(security)] 防止 .env 密钥进入会话快照
- **#122935** 类问题 → **#129517** [fix(install)] 改进克隆策略

> **稳定性评估：** 今日关闭了计费相关 Bug (#110912)，但桌面端渲染重复、Windows 安装权限、cron worker 依赖等 P1/P2 问题仍待解决，需持续关注。

---

## 6. 功能请求与路线图信号

| Issue | 需求描述 | 相关 PR | 纳入可能性 |
|-------|----------|---------|-----------|
| #47349 | 可配置记忆后端，支持禁用 memory.md | 暂无 | **高** — 长期请求，社区呼声强 |
| #96532 | 允许隐藏本机管理的 gateway | 暂无 | **中** — 3 👍，特定场景需求 |
| #125178 | 新增 `agent:message:filter` / `agent:response:filter` 钩子 | **#125178** (OPEN) | **高** — 已在开发中 |
| #2020 | 平台限制配置化（Discord/Slack 等） | 暂无 | **低** — 长期开放，优先级不高 |

**路线图信号：**
- 安全加固是当前优先级最高方向（多条 security PR 同日提交）
- 桌面端体验优化（渲染、性能、跨平台一致性）持续推进
- 可配置性增强（记忆后端、平台限制）有望在后续版本落地

---

## 7. 用户反馈摘要

### 痛点
1. **计费透明度**：#110912 用户反映订阅积分耗尽后仍按全价计费，影响信任。
2. **桌面端渲染稳定性**：#123801、#126524、#128468 多个 Issue 指向同一类问题——助手回复重复渲染和滚动跳跃，严重影响使用体验。
3. **Windows 安装/更新问题**：#122935、#124807、#79087 等多条 Windows 特定 Bug 反映安装和更新流程不够健壮。
4. **插件加载静默失败**：#123926 用户反馈插件在启动时随机丢失，无明确错误提示。
5. **环境变量泄漏**：#62336 用户担忧终端快照会持久化敏感凭据。

### 满意点
- 项目对安全问题响应迅速，同日提交多条安全加固 PR。
- 社区维护者 (@kvnloo、@dskwe 等) 积极 triage 和推进 Issue。
- 标签审计工作 (#109552) 体现了对 Issue 质量管理的重视。

---

## 8. 待处理积压

### 长期未关闭的 P1/P2 Issue
| Issue | 创建时间 | 天数 | 描述 | 建议 |
|-------|----------|------|------|------|
| #47349 | 2026-06-16 | ~108 天 | 可配置记忆后端 | 考虑纳入下一版本 |
| #2020 | 2026-03-19 | ~196 天 | 平台限制配置化 | 评估优先级 |
| #58705 | 2026-07-05 | ~88 天 | mem0 Qdrant 锁冲突 | 需插件维护者关注 |
| #30708 | 2026-05-23 | ~131 天 | BlueBubbles 入站去重缺失 | 网关适配器维护 |
| #64392 | 2026-07-14 | ~79 天 | Skill 名称重复处理不一致 | CLI 维护 |
| #96731 | 2026-08-27 | ~35 天 | browser_exec Windows 超时 | 浏览器工具维护 |

### 需关注的开放 PR
- **#125178** [feat(gateway)] 过滤钩子事件 — 功能性强，建议尽快 review
- **#128957** [fix(desktop)] Wayland GPU 黑名单 — 影响 Linux 桌面用户

---

**报告生成时间：** 2026-10-01  
**分析师：** Agnes (Sapiens AI)

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期：** 2026-10-01  
**数据周期：** 过去24小时 (2026-09-30 ~ 2026-10-01)

## 1. 今日速览
AstrBot 在过去24小时内保持**高活跃度**，共处理13条Issue和18条PR，其中9条Issue和16条PR处于活跃/开放状态。核心贡献者 @he-yufeng 和 @inertialobs 解决了多个长期存在的边缘情况Bug（如流式工具调用索引、 persona 默认值冲突、空消息链崩溃），显著提升了多代理协作和工具调用链路的稳定性。暂无新版本发布，但代码库正在为下一次小版本迭代积蓄修复。

## 2. 版本发布
**无新版本发布。**  
当前主流版本为 v4.28.x，今日重点在于 Bug 修复而非功能发布。

## 3. 项目进展
今日有 **2 条 PR 已合并/关闭**，主要涉及文档和 UI 细节：
*   **[CLOSED] #10290**: 修复 README 中 Shields.io 徽章的 HTML 结构，使其可点击。
*   **[CLOSED] #10289**: 在插件开发文档中补充了 `sliders` 配置键的说明。

**重要进展（待合并）：**
*   **多代理稳定性增强**：PR #10297 修复了当模型返回纯空白文本加工具调用时，runner 错误地将其记录为“发送准备”后又因消息为空而跳过的问题，这直接关联到 Issue #10236 的微信 ClawBot 场景。
*   **Persona 系统一致性修复**：PR #10287 解决了 ID 为 `default` 的人格在 UI 选择和内部解析时行为不一致的问题，确保用户定义的 `default` 人格能正确覆盖内置默认值。
*   **流式工具调用健壮性**：PR #9593 正在处理上游 Provider 返回 1-based `tool_call.index` 导致的 Index Out of Range 错误，这是长期困扰 OpenAI 兼容网关用户的关键稳定性问题。

## 4. 社区热点
*   **子代理响应丢失问题 (#10298)**: 
    *   **链接**: https://github.com/AstrBotDevs/AstrBot/issues/10298
    *   **热度**: 新建 Issue，但涉及复杂场景（主 Agent 路由 + 子代理任务）。
    *   **分析**: 用户报告在 v4.28.2 中，子代理完成 `transfer_to_*` 任务后，主 Agent 未生成最终回复。这反映了用户在构建复杂多代理工作流时的核心痛点：**编排器的响应收集机制可能存在缺陷**。
*   **人格系统 Bug (#10281)**:
    *   **链接**: https://github.com/AstrBotDevs/AstrBot/issues/10281
    *   **热度**: 高评论数 (8条)。
    *   **分析**: 用户对“默认人格”的语义期望与实现存在偏差，已引发 UI 与逻辑不一致的投诉。PR #10287 已提出修复，社区关注其落地效果。
*   **Rerank 永久失效 (#10262)**:
    *   **链接**: https://github.com/AstrBotDevs/AstrBot/issues/10262
    *   **热度**: 中等，但影响关键功能。
    *   **分析**: Provider 热重载导致知识库 Rerank 静默失败。PR #10292 已跟进修复，用户关心该修复能否彻底解决热重载下的状态同步问题。

## 5. Bug 与稳定性
| 严重程度 | Issue | 描述 | Fix PR | 状态 |
| :--- | :--- | :--- | :--- | :--- |
| **P0** | [#9590](https://github.com/AstrBotDevs/AstrBot/issues/9590) | 上游 `tool_call.index` 从1开始时，流式快照错位导致工具调用整体失败 | [#9593](https://github.com/AstrBotDevs/AstrBot/pull/9593) | Open (有Fix) |
| **P1** | [#10298](https://github.com/AstrBotDevs/AstrBot/issues/10298) | 子代理任务完成后主 Agent 不生成最终回复，respond 阶段消息为空 | 暂无 | Open |
| **P1** | [#10281](https://github.com/AstrBotDevs/AstrBot/issues/10281) | `default` 人格在 UI 选择与实际行为中不一致 | [#10287](https://github.com/AstrBotDevs/AstrBot/pull/10287) | Open (有Fix) |
| **P1** | [#10262](https://github.com/AstrBotDevs/AstrBot/issues/10262) | Provider 热重载后知识库 Rerank 永久失效 | [#10292](https://github.com/AstrBotDevs/AstrBot/pull/10292) | Open (有Fix) |
| **P2** | [#10291](https://github.com/AstrBotDevs/AstrBot/issues/10291) | 平台适配器 logo 破图（一次性令牌问题） | [#10294](https://github.com/AstrBotDevs/AstrBot/pull/10294) | Open (有Fix) |
| **P2** | [#10236](https://github.com/AstrBotDevs/AstrBot/issues/10236) | 微信 ClawBot 消息发送先于工具调用返回 | [#10297](https://github.com/AstrBotDevs/AstrBot/pull/10297) | Open (有Fix) |
| **P2** | [#9929](https://github.com/AstrBotDevs/AstrBot/issues/9929) | 工具调用旁白破坏角色扮演沉浸感 | 暂无 | Open |
| **P3** | [#10226](https://github.com/AstrBotDevs/AstrBot/issues/10226) | 关闭 LLM 后仍回复 | [#10226](https://github.com/AstrBotDevs/AstrBot/issues/10226) | Closed (引用 #9819) |

## 6. 功能请求与路线图信号
*   **OpenAI Responses API 原生工具支持 (#9530 / #9554)**:
    *   **链接**: [Issue](https://github.com/AstrBotDevs/AstrBot/issues/9530), [PR](https://github.com/AstrBotDevs/AstrBot/pull/9554)
    *   **分析**: 用户强烈希望支持 `web_search`, `file_search`, `code_interpreter` 等原生工具。PR #9554 正在实现此功能，包括 Dashboard 配置和流式事件处理。这是下一步版本的重要功能候选项。
*   **STT/TTS 提供商扩展 (Mossland) (#10295)**:
    *   **链接**: https://github.com/AstrBotDevs/AstrBot/issues/10295
    *   **分析**: 新提出的功能请求，适配 Mossland API。目前暂无 PR，属于小型功能新增。
*   **显式回复 ID 支持 (#10087)**:
    *   **链接**: [PR](https://github.com/AstrBotDevs/AstrBot/pull/10087)
    *   **分析**: 允许工具明确引用前序消息 ID，增强对话控制的灵活性。PR 已提交，可能被纳入近期版本。

## 7. 用户反馈摘要
*   **痛点**:
    *   **多代理编排不可靠**: 用户在使用子代理时遇到响应丢失（#10298），表明当前编排器在复杂场景下的鲁棒性不足。
    *   **Persona 系统 confusing**: “default” 人格的行为不符合直觉，用户期望 UI 选择与实际使用保持一致（#10281）。
    *   **热重载副作用**: Provider 热重载会破坏知识库检索（#10262），影响生产环境的稳定性。
*   **满意**:
    *   社区对具体 Bug 的响应速度较快，多数 P1/P2 问题已有对应 PR。
    *   OpenAI Responses API 的原生工具支持正在积极推进，满足高级用户需求。

## 8. 待处理积压
*   **长期未响应 Issue**:
    *   **#9590 (P0)**: 虽然已有 PR #9593，但该 Issue 已开放超过2个月，且涉及底层流式处理逻辑，需尽快合并以缓解大量 OpenAI 兼容网关用户的痛苦。
    *   **#9929 (P2)**: 工具调用旁白破坏沉浸感，这是一个体验类问题，可能需要在 prompt 工程或消息过滤层面解决，暂无 PR。
*   **维护者关注点**:
    *   检查 PR #9593 (#9590) 和 #10297 (#10236) 的合并优先级，它们都涉及工具调用链路的稳定性。
    *   评估 PR #9554 (#9530) 的功能完整性，准备将其纳入下一个 Feature Release。

---
*报告生成时间：2026-10-01 | 数据来源：GitHub API*

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：** 2026-10-01  
**分析范围：** 过去24小时 (GitHub Discussions)

## 1. 今日速览
DeepSeek Harness 社区在 2026-10-01 保持高活跃度，过去24小时内 Discussions 更新达 **259 条**。核心动向聚焦于**跨平台兼容性（尤其是 Windows ACL 沙箱与 Linux 支持缺失）**以及**第三方 API 适配规范**（OpenCode Go 头部要求）。尽管没有新版本发布（Releases: 0），但生态插件（dsh-vault, Capital Generation）与创新提案（prompt token pressure）讨论热烈。项目整体健康度良好，用户反馈集中在具体场景的稳定性修复与权限策略优化，而非功能性停滞。

## 2. 版本发布
**无新版本发布。**

*注：由于该仓库未启用常规 PR 合并流程，近期功能迭代通过 Releases 落地。截至本日，无新 Release 产生，但社区针对 `0.1.7-rc.2` 及后续版本的稳定性讨论显著增加。*

## 3. 项目进展
暂无官方代码合并公告。当前开发重心似乎已通过 Discussions 形式转向**用户工作流定制**与**底层沙箱策略优化**。主要“隐性进展”体现在用户自行验证和反馈的修复方案上，例如 Windows ACL 沙箱的已知缺陷正在社区层面进行根因分析与补丁测试（见 Bug 与稳定性章节）。

## 4. 社区热点
以下讨论在过去24小时内评论活跃，反映了用户的核心关切：

1.  **[Ideas] dsh-vault — 加密凭据保险库插件** (#1457)
    *   **链接:** https://github.com/deepseek-ai/deepseek-harness/discussions/1457
    *   **热度:** 253 条评论
    *   **分析:** 长期置顶的功能提案。用户强烈需求将 SSH 密钥、API Key、TOTP 等敏感凭据加密存储并通过模型工具调用的能力。该插件使用 Node 内置 `crypto` 模块，无需外部依赖，符合安全最佳实践。
2.  **[General] Please send x-opencode-session header on API requests** (#5495)
    *   **链接:** https://github.com/deepseek-ai/deepseek-harness/discussions/5495
    *   **热度:** 40 条评论
    *   **分析:** OpenCode Go 托管推理 API 将于 09/05 起强制要求 `x-opencode-session` 头部，影响约 25k 用户组织。社区正在讨论如何适配这一变更以维持服务连续性。
3.  **[General] linux总是被遗忘...** (#8107)
    *   **链接:** https://github.com/deepseek-ai/deepseek-harness/discussions/8107
    *   **热度:** 17 条评论
    *   **分析:** Linux 用户抱怨 WorkBuddy 和 Qoder 已支持 Linux，而豆包和 DeepSeek Harness 支持滞后，反映了跨平台优先级差异带来的用户流失风险。

## 5. Bug 与稳定性
今日报告的高优先级 Bug 主要集中在 **Windows 平台权限与 UI 渲染**：

*   **[严重] Windows ACL 沙箱三个授权缺陷** (#8409)
    *   **链接:** https://github.com/deepseek-ai/deepseek-harness/discussions/8409
    *   **版本:** `0.2.0-rc.2` (nightly)
    *   **描述:** 在标准用户（非系统盘）环境下，`workspace-write` 沙箱存在三类缺陷：受保护 DACL 子目录永不获授权、desktop 根授权缓存不复核不自愈、`grantWrite` 失败 (Win32 5)。这是继 #7504 后的补充报告，指向同一个底层权限模型问题。
*   **[中等] Windows 托管子进程启动失败 (0xC0000142)** (#6930)
    *   **链接:** https://github.com/deepseek-ai/deepseek-harness/discussions/6930
    *   **描述:** 当以 `windowsHide: true` 启动子进程时，执行 Pwsh 等工具时报错退出，并弹出模态错误对话框，严重影响自动化工作流。
*   **[中等] Firefox 引擎浏览器 Web UI 历史加载无限循环** (#5677)
    *   **链接:** https://github.com/deepseek-ai/deepseek-harness/discussions/5677
    *   **描述:** 包含 assistant raw chunk records 的会话在 Firefox/Zen 浏览器中无法加载历史，卡在 "Loading history…"，疑似 lossless-JSON 验证兼容性 bug。
*   **[低] 升级后 Messages transport failed** (#6987)
    *   **链接:** https://github.com/deepseek-ai/deepseek-harness/discussions/6987
    *   **描述:** 用户反馈升级至 4.1 后，切换 DeepSeek 模型时出现连接传输失败，建议检查传输层稳定性。

## 6. 功能请求与路线图信号
*   **Provider-neutral Prompt Token Pressure + 本地溢出压缩重试** (#8374)
    *   **链接:** https://github.com/deepseek-ai/deepseek-harness/discussions/8374
    *   **信号:** 用户提出更智能的 Token 计量与压缩策略，当前 `dsh-token-meter` 固定价格模型不够灵活。相关社区插件已可用，核心协议草案已拟定，等待外部 PR 接受机制开放。
*   **自动压缩未触发** (#7650)
    *   **链接:** https://github.com/deepseek-ai/deepseek-harness/discussions/7650
    *   **信号:** 在 `0.1.7-rc1` 中，当上下文窗口达到 100% (80k tokens) 时，auto-compaction 未如预期触发，需确认配置逻辑或回归问题。
*   **本地 Qwen3.8 压缩优化插件** (#5390)
    *   **链接:** https://github.com/deepseek-ai/deepseek-harness/discussions/5390
    *   **信号:** 社区持续推动本地模型在 DSH 中的体验优化（QOL），表明用户对离线/私有化部署场景有刚性需求。

## 7. 用户反馈摘要
*   **痛点：**
    *   **Windows 权限管理复杂：** 多个讨论 (#7504, #8409, #6930) 指向 Windows 下沙箱授权和子进程启动的稳定性问题，特别是标准用户和非系统盘场景。
    *   **Linux 支持缺位：** 用户明确表达被竞品（WorkBuddy, Qoder）抢走，因为 DeepSeek Harness 缺乏原生 Linux 体验。
    *   **API 兼容性维护成本：** OpenCode Go 等第三方 API 的突然变更要求客户端快速响应，增加了用户使用负担。
*   **满意点：**
    *   **插件生态丰富：** dsh-vault (凭据管理) 和 Capital Generation (证券研究) 展示了平台强大的扩展能力，用户愿意投入时间贡献高质量插件。
    *   **透明度：** 尽管没有正式 PR，但通过 Discussions 深入讨论技术细节（如 #8374 的 Token 压力提案），让用户感到被倾听。

## 8. 待处理积压
*   **#8409 Windows ACL 沙箱缺陷：** 高优先级，涉及核心工作区安全性，建议在下一个 patch 版本中集中修复。
*   **#8107 Linux 支持呼吁：** 长期积压的需求，需产品团队评估资源投入，回应社区关于跨平台公平性的关切。
*   **#5677 Firefox 兼容性问题：** 影响部分用户的日常使用，建议前端团队排查 lossless-JSON 解析逻辑。
*   **#1457 dsh-vault 最终审核：** 虽然为社区插件，但其影响力巨大，官方可考虑将其纳入推荐插件列表或进行安全审计背书。

---
*本报告基于 GitHub Discussions 数据分析生成，旨在为项目维护者与贡献者提供决策参考。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*