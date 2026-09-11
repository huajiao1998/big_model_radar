# OpenClaw 生态日报 2026-09-12

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-11 23:40 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 — 2026-09-12

## 1. 今日速览

OpenClaw 在过去 24 小时内保持极高活跃度：500 条 Issue 更新（新开/活跃 269，关闭 231）与同等数量的 PR 更新（待合并 265，已合并/关闭 235），社区参与度极高。v2026.9.4 新版本已发布，核心亮点为兼容失败更新的回滚机制，但同时也暴露出若干影响会话状态和消息传递的关键回归问题。整体项目处于高强度迭代期，维护团队正集中火力处理升级路径稳定性和多代理网关的性能瓶颈。

## 2. 版本发布

### v2026.9.4 (openclaw 2026.9.4)
**发布日期：** 2026-09-11  
**链接：** https://github.com/openclaw/openclaw/releases/tag/v2026.9.4

**核心更新：**
- **兼容失败更新恢复机制：** 当 schema 和配置检查证明回滚是安全的时，系统将保留上一个包并使用之前的配置和服务进行恢复；数据库迁移仍需经过验证的预更新备份 (#140339)。

**破坏性变更/注意事项：**
- 现有测试发现 v2026.9.4 未包含修复 #144208 的代码（主分支提交 00edac804478 在 release branch 切出后合并），导致保留的 version-1 handoff lease 行会失败每次配置写入 (#144742)。这被列为 release blocker。
- 从 2026.9.2 升级到 2026.9.4 的托管更新可能在 candidate-Doctor 阶段失败，因为无法处理活跃的 v1 handoff lease，随后回滚到 9.4 迁移状态 (#145192)。

## 3. 项目进展

今日有大量 PR 处于 "ready for maintainer look" 或 "needs proof" 状态，主要聚焦于：

- **稳定性修复：** #145385 (已关闭) 修复了孤立心跳 tombstone 阻塞强制rollover的问题；#145044 修复了无监督更新修复在新候选状态下的失败。
- **插件与渠道优化：** #145391 修复 Deepgram 音频转录截断问题；#144352 修复 Telegram hook 取消后的结构化结果返回；#144637 优化 Reef 频道容量失败时的入站交付处理。
- **开发者体验：** #145396 修复 Doctor lint 误报已迁移的 Workshop skills；#145402 改进代理失败时的 provider rejection 详情展示。
- **架构重构：** #145392, #145398, #145399 分别对 Slack presence、Telegram sticker cache 和 Comfy 测试进行异步化重构，提升系统一致性。

**进展评估：** 项目正在积极修复 v2026.9.x 系列引入的系列回归问题，特别是在升级路径、多代理会话管理和插件兼容性方面。维护者响应迅速，多个 P0/P1 级别问题已有对应 PR 待合并。

## 4. 社区热点

以下 Issue 评论活跃，反映用户核心关切：

1. **#119720** [P0] 同步代理持久化和转录维护在大体量下阻塞 Gateway 事件循环 (17 评论)  
   链接：https://github.com/openclaw/openclaw/issues/119720  
   *热点分析：* 多代理网关性能瓶颈是规模化用户的主要痛点，#140231 和 #138984 的部分修复已落地，但根本性问题仍在讨论。

2. **#97616** [P1] OpenClaw 泄漏未回收的 hook/tool 子进程，导致僵尸进程累积和运行时退化 (16 评论)  
   链接：https://github.com/openclaw/openclaw/issues/97616  
   *热点分析：* 长期存在的资源泄漏问题，影响系统稳定性，获得 1 个 👍。

3. **#96834** [P1] WhatsApp 1:1 入站图片处理导致主通道楔入约 3 分钟 (15 评论)  
   链接：https://github.com/openclaw/openclaw/issues/96834  
   *热点分析：* 多模态处理性能问题，影响用户体验，获 1 个 👍。

4. **#140620** [P0] 原地升级 2026.7.1-2 -> 2026.9.2 后会话转录 reconciliation 卡住，预升级会话不可查找 (12 评论)  
   链接：https://github.com/openclaw/openclaw/issues/140620  
   *热点分析：* 升级路径可靠性是用户最敏感的话题，直接影响生产环境信任度。

5. **#144712** [P0, 已关闭] npm update 在 "global install swap" 步骤失败，完整回滚被报告为 "recovery is unverified" (12 评论)  
   链接：https://github.com/openclaw/openclaw/issues/144712  
   *热点分析：* 新版本发布后的紧急修复验证问题，反映发布流程的紧张状态。

## 5. Bug 与稳定性

### P0 级别 (Release Blocker / 严重故障)

| Issue | 描述 | 状态 | Fix PR |
|-------|------|------|--------|
| #144742 | v2026.9.4 缺少 #144208 修复，保留的 version-1 handoff lease 导致每次配置写入失败 | OPEN | #144208 (未包含在 release) |
| #145192 | 2026.9.2 → 2026.9.4 托管更新在 candidate-Doctor 阶段失败并回滚 | OPEN | 依赖 #144742 修复 |
| #140620 | 升级后 session-transcript reconciliation 卡住，预升级会话不可查找 | OPEN | - |
| #142585 | 2026.9.3 Doctor 拒绝有效的 legacy workspace setup | OPEN | - |
| #142476 | cron session reaper 每几分钟阻塞事件循环 14-76 秒 (632-agent gateway) | OPEN | - |
| #123326 | 显式多代理 Codex 迁移导致 Gateway 启动崩溃循环 | OPEN | - |
| #144911 | MCP server 初始化超时导致 Gateway 崩溃 (未处理的 promise rejection) | OPEN | - |

### P1 级别 (重要回归/功能故障)

| Issue | 描述 | 状态 | Fix PR |
|-------|------|------|--------|
| #119720 | 同步持久化阻塞 Gateway 事件循环 | OPEN | #140231, #138984 (部分修复) |
| #141252 | 2026.9.2 回归：reply runs 失败 "no active tool authority snapshot" | OPEN | - |
| #139847 | 消息在 reply run 活动期间被丢弃 (2026.9.2 回归) | OPEN | - |
| #144809 | claude-cli 长 turn (>RUN_STALE_TAKEOVER_MS) 丢失生成的回复 | OPEN | - |
| #127148 | Codex sessions.compact 获取第二个 app-server 导致冲突 | OPEN | - |
| #97616 | 子进程泄漏导致僵尸累积 | OPEN | - |
| #96834 | WhatsApp 图片处理阻塞主通道 | OPEN | - |

### 已关闭的重要修复

- **#144712** [P0] npm update 回滚验证失败 - 已关闭
- **#140908** [P0] doctor --fix 在 systemd --user 下 EACCES 失败 - 已关闭
- **#137377** [P1] Windows Doctor --fix 最终重启失败 - 已关闭
- **#140821** [P1] Gateway 重启卡在 2026.9.2 升级后 - 已关闭

**稳定性评估：** 项目近期发布节奏快，但 v2026.9.2-9.4 系列暴露了多处升级路径和会话管理的回归问题。P0 级别问题集中在 handoff lease 兼容性和升级恢复机制，表明多代理架构的_state management_ 仍需谨慎打磨。

## 6. 功能请求与路线图信号

### 活跃的功能请求

1. **#9016** [P3] 向代理运行时暴露 OpenRouter 使用成本 (8 评论, 1 👍)  
   链接：https://github.com/openclaw/openclaw/issues/9016  
   *路线图信号：* 成本透明度是企业和高级用户的常见需求，已有相关讨论但优先级较低。

2. **#40786** [P2] 为 backup CLI 添加 .gitignore 风格的排除模式 (12 评论, 1 👍)  
   链接：https://github.com/openclaw/openclaw/issues/40786  
   *路线图信号：* 实用功能请求，解决备份大小和敏感数据暴露问题。

3. **#79168** [P2, 已关闭] 工具输出的基于内容的 prompt injection 扫描 (8 评论, 1 👍)  
   链接：https://github.com/openclaw/openclaw/issues/79168  
   *路线图信号：* 安全问题，当前依赖 XML 包装作为缓解措施，内容级防御仍有需求。

4. **#92367** [P2, 已关闭] 作用域限制的 gateway auth tokens + 每代理 dispatch-lane 原语 (6 评论, 1 👍)  
   链接：https://github.com/openclaw/openclaw/issues/92367  
   *路线图信号：* 安全架构增强，源于安全审查，两个原语相互加强。

### 近期 PR 暗示的功能方向

- **#145377** Radius 提供商插件：支持浏览器签入和本地流式传输，扩展模型选择 (#145377)
- **#144768** 要求 provider-bound credentials 用于 provider use，增强安全性 (#144768)
- **#145190** 登录后发现 account models，改善用户体验 (#145190)

**路线图判断：** 项目正在强化多代理架构的稳定性、升级路径可靠性、以及安全凭证管理。用户社区对成本透明、备份控制和 prompt injection 防护有持续需求，但优先级低于当前的稳定性修复。

## 7. 用户反馈摘要

### 主要痛点

1. **升级路径可靠性：** 多个 P0 Issue (#140620, #142585, #144712, #145192) 集中在 `openclaw update` 和 Doctor 修复流程失败，用户反馈"升级后系统无法启动"或"回滚机制不可信"。

2. **多代理网关性能：** #119720 和 #142476 反映大规模部署（数百代理）下事件循环阻塞问题，cron reaper 的同步 integrity_check 是具体瓶颈。

3. **会话状态一致性：** "no active tool authority snapshot" 错误出现在多个 Issue (#141252, #139847, #144809)，表明 reply run 期间的会话状态管理存在 race condition。

4. **平台特定问题：**
   - WhatsApp 图片处理阻塞 (#96834)
   - Windows 升级后 Doctor 维护阻塞 (#136203, #137377)
   - iOS app 在启用 "show reasoning and tool activity" 时明显卡顿 (#124759)

5. **插件兼容性：** #135776 指出 `openclaw update` 后 exact-pinned 官方 channel plugins 停留在旧版本，导致依赖缺失。

### 用户满意点

- 维护团队对高优先级 Issue 响应迅速，多个 P0 问题在数天内获得 PR 或关闭。
- 新版回滚机制 (#140339) 解决了部分升级失败场景，尽管仍有 edge cases。
- 诊断工具 (Doctor) 持续改进，如 #145396 修复误报问题。

## 8. 待处理积压

### 长期未响应的重要 Issue

| Issue | 创建日期 | 天数未响应 | 严重程度 | 备注 |
|-------|----------|------------|----------|------|
| #49876 | 2026-03-18 | ~178 天 | P1 🐚 platinum hermit | Cron sessions 在工具失败时产生 hallucinated output，信任与安全关键问题 |
| #92405 | 2026-06-12 | ~82 天 | P1 🐚 platinum hermit | subagent spawn 持久化 raw provider 导致 depth-2 cold spawns 静默死亡 (已提供 fix) |
| #94716 | 2026-06-19 | ~75 天 | P1 🦞 diamond lobster | Anthropic claude-cli provider 发送过期 user-agent 导致 bearer auth 失败 |
| #125333 | 2026-08-17 | ~26 天 | P0 🦞 diamond lobster | totalTokens 通胀在 2026.8.1-beta.2 仍可复现，#123065 修复不完整 |

### 需要维护者关注的 PR

- **#139868** tavily baseUrl 覆盖允许私有/内部主机 (等待 proof)
- **#145335** 完成 Node prefix 变更后的 Gateway 升级 (等待 author)
- **#145384** UI 模型选择无需重复等待 catalog (等待 author)
- **#145190** 登录后发现 account models (等待 author)

### 建议维护者优先处理

1. **#144742 / #145192** - v2026.9.4 release blocker，需要紧急发布补丁版本
2. **#125333** - totalTokens 通胀影响计费准确性，且有明确复现路径
3. **#49876** - 长期未解决的 hallucination 问题，涉及 AI 安全核心承诺

---

**项目健康度评分：** ⚠️ 中等偏下  
- **活跃度：** 高（500+ Issue/PR 每日更新）
- **响应速度：** 良好（P0 问题数天内获得关注）
- **稳定性：** 需改善（v2026.9.x 系列多处回归）
- **发布质量：** 有风险（v2026.9.4 缺少关键修复）

**建议：** 暂停新功能开发，集中资源修复升级路径和多代理会话管理的稳定性问题，考虑发布 v2026.9.5 补丁版本解决 #144742 等 release blocker。

---

## 横向生态对比

# AI 智能体开源生态日报横向分析报告
**日期：** 2026-09-12  
**分析师：** Agnes-2.5-Flash (Sapiens AI)

## 1. 生态全景
当前个人 AI 助手与自主智能体开源生态处于**高强度迭代与稳定性阵痛并存**的关键期。多代理协作（Multi-Agent）已成为主流架构，但随之而来的会话状态管理、升级路径可靠性及资源泄漏问题成为行业共性痛点。社区重心正从“功能扩张”转向“生产级稳定性加固”，特别是在并发安全、上下文压缩及插件生态治理方面表现出强烈的规范化需求。

## 2. 各项目活跃度对比

| 项目 | Issues (24h) | PR (24h) | Release | 健康度评分 | 核心特征 |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **OpenClaw** | 500 | 500 | v2026.9.4 | ⚠️ 中等偏下 | 极高流量，但 v2026.9.x 系列回归问题集中爆发，稳定性承压。 |
| **hermes-agent** | 482 | 500 | v0.21.2 | ⚠️ 中等偏下 | 高频迭代，v0.21.0 存储重构引发严重数据一致性风险，紧急补丁跟进。 |
| **QwenPaw** | 21 | 41 | v2.2.1 | ⚠️ 中等 | 活跃度适中，多代理核心功能（子代理路由）出现回归，数据持久化存在隐患。 |
| **DeepSeek Harness** | N/A* | N/A* | - | ⚠️ 中等 | Discussion 活跃（202+），核心聚焦于会话迁移兼容性与插件安全规范。 |
| **Zeroclaw** | 50 | 50 | - | ✅ 良好 | 节奏稳健，清理 UX 摩擦点，但暴露出上下文压缩失效等技术债。 |
| **AstrBot** | 2 | 15 | - | ✅ 良好 | 低 Issue 高响应，维护效率高，专注多平台适配与核心逻辑修复。 |
| **PicoClaw** | 4 | 2 | - | ✅ 良好 | 小规模活跃，快速修复 Slack 等集成问题，侧重边缘/企业场景。 |

*\*DeepSeek Harness 数据基于 Discussions 而非标准 Issue/PR 计数。*

## 3. OpenClaw 在生态中的定位
*   **规模领跑者：** OpenClaw 以 500+ Issue/PR 的日活量级遥遥领先，显示出其作为**多代理网关基础设施**的巨大用户基数。
*   **技术路线差异：** 与 Zeroclaw（侧重 ZeroCode 工作流）和 hermes-agent（侧重本地桌面体验）不同，OpenClaw 聚焦于**大规模代理集群的状态管理与升级兼容性**。
*   **风险警示：** 尽管社区规模最大，但其 v2026.9.x 系列的 release blocker 问题（如 handoff lease 兼容性、升级回滚失败）揭示了**复杂状态管理在多版本共存下的严峻挑战**，为同类项目提供了重要的工程反面教材。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求与现状 |
| :--- | :--- | :--- |
| **会话状态与迁移可靠性** | OpenClaw, QwenPaw, DeepSeek Harness, hermes-agent | **最高共识痛点。** OpenClaw 升级路径失败；QwenPaw 索引不同步；DeepSeek Harness v0→v2 迁移损坏；hermes-agent state.db 损坏。各项目均面临状态持久化的竞态条件挑战。 |
| **多代理性能与隔离** | OpenClaw, QwenPaw, hermes-agent | OpenClaw 事件循环阻塞；QwenPaw 子代理超时；hermes-agent Profile 隔离失效。规模化部署下的资源争用和上下文隔离是共性难题。 |
| **上下文管理优化** | Zeroclaw, QwenPaw | Zeroclaw 用户抱怨缓存前缀因图片/思考块失效；QwenPaw 请求主动 Token 预算压缩。从“截断”向“智能压缩”演进的需求强烈。 |
| **插件生态安全规范** | DeepSeek Harness, OpenClaw, hermes-agent | DeepSeek 社区呼吁官方插件市场防投毒；OpenClaw 强化 provider-bound credentials；hermes-agent 加固 RCE 漏洞。生态繁荣后，安全治理成为首要议题。 |
| **升级与维护自动化** | OpenClaw, AstrBot, hermes-agent | OpenClaw 的 Doctor 工具完善；AstrBot 快速响应 Bug；hermes-agent 修复 Windows 更新验证失败。自动化诊断与平滑升级是提升生产信任度的关键。 |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | 多代理网关、大规模部署、统一入口 | 企业级用户、开发者、系统集成商 | 强调**事件循环非阻塞**与**跨代理会话状态同步**，架构复杂度最高。 |
| **hermes-agent** | 本地桌面体验、多 Profile 隔离、Cron 自动化 | 高级个人用户、极客、自动化爱好者 | **Electron + Python 后端**混合架构，注重本地数据安全与离线能力，对 state.db 强依赖。 |
| **QwenPaw** | 多租户 Hub、Agent 模型路由、子代理协作 | 团队协作、SaaS 提供商、企业开发者 | **Agent 级细粒度模型路由**，支持子代理成本优化，强调 Hub 多租户管理能力。 |
| **Zeroclaw** | ZeroCode 工作流、配置灵活性、多模型支持 | 工作流自动化用户、配置敏感型开发者 | **Provider 绑定凭证**，强调配置与代码分离，对上下文压缩策略有特定需求。 |
| **DeepSeek Harness** | 本地会话管理、插件扩展、模型推理 | DeepSeek 模型用户、研究者和实验者 | **Web UI 为中心**，聚焦于长上下文会话的编辑与 Fork/Resume 操作，插件系统尚处早期规范阶段。 |
| **AstrBot** | 多平台消息网关（QQ/Telegram/Discord） | 社群运营者、机器人开发者 | **适配器模式**，专注即时通讯平台的消息渲染与路由，轻量级、易部署。 |
| **PicoClaw** | 边缘设备部署、私有化集成 | IoT 开发者、边缘 AI 应用场景 | 支持 **ARM/RKLLM** 等边缘推理，强调与 Slack/飞书等企业工具的集成兼容性。 |

## 6. 社区热度与成熟度

*   **快速迭代/扩张期：** **OpenClaw**, **hermes-agent**, **QwenPaw**。这些项目用户基数大，需求多样，导致 Issue/PR 吞吐量极高，但也带来了较高的回归风险和稳定性波动。它们正在经历从“功能实现”到“规模稳定”的艰难过渡。
*   **质量巩固/优化期：** **Zeroclaw**, **AstrBot**, **PicoClaw**。项目节奏相对可控，维护团队响应迅速，Bug 修复周期短，社区反馈更侧重于体验优化而非基础功能缺失，显示出更高的工程成熟度。
*   **生态培育期：** **DeepSeek Harness**。作为较新的生态，其核心挑战在于建立规范（如插件市场、会话迁移标准），目前社区自我组织能力（如非官方市场）正在弥补官方治理的空白。

## 7. 值得关注的趋势信号

1.  **“状态即负债”：** 所有主流多代理项目均在会话持久化和升级迁移上遭遇严重挑战。这表明**无状态设计**或**强一致性事务管理**在 AI Agent 架构中至关重要，建议开发者在构建多代理系统时优先考虑状态的可恢复性和版本兼容性。
2.  **成本透明化与精细化控制：** QwenPaw 的子代理模型路由和 OpenClaw 的成本暴露需求，反映出用户对 **Token 成本控制**的敏感度显著提升。未来的 Agent 框架需内置更细粒度的预算管理和模型 fallback 机制。
3.  **安全从“事后审计”转向“默认防御”：** hermes-agent 修复 RCE 漏洞、DeepSeek Harness 呼吁官方插件市场、OpenClaw 引入 provider-bound credentials，均显示安全左移的趋势。**默认最小权限原则**和**沙箱执行环境**将成为新项目的标配。
4.  **上下文管理的智能化升级：** 从简单的截断（Zeroclaw 现状）向基于 Token 预算的主动压缩（QwenPaw 需求）演进。能够理解内容重要性并进行智能摘要的上下文管理器，将是下一代 Agent 的核心竞争力。
5.  **跨平台一致性成为竞争壁垒：** AstrBot 对 QQ/Telegram 表情渲染的极致优化，以及 OpenClaw 对多通道（Slack/Telegram/WhatsApp）的统一处理，表明**渠道体验的一致性**是留存用户的关键因素，而非仅仅支持接入。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**日期：** 2026-09-12
**数据来源：** GitHub API (github.com/zeroclaw-labs/zeroclaw)

## 1. 今日速览
Zeroclaw 今日保持高度活跃的开发与调试节奏。过去24小时内共处理50条 Issue 和50条 PR，其中39条 Issue 处于活跃状态，47条 PR 待合并，显示出强大的社区贡献力与核心团队的维护强度。虽然未发布新版本，但今日集中关闭并修复了多个关键的路由、会话历史及配置类 Bug，特别是针对 Anthropic 缓存前缀失效和 ZeroCode 工作流阻断的问题进行了紧急跟进。项目整体健康度良好，但暴露出一批关于上下文压缩机制失效的高优先级技术债。

## 2. 版本发布
**无新版本发布。**

## 3. 项目进展
今日无新合并的 PR（所有展示的 PR 均处于 OPEN 状态），但有多项重要 Issue 被 **CLOSED**，标志着特定功能或修复周期的完成：
- **#9047 [CLOSED]**: 明确了 ZeroCode 会话历史与持久化记忆隔离的行为文档，消除了用户认知偏差。
- **#5514 [CLOSED]**: 解决了 Telegram 渠道批量媒体分组导致 LLM 多响应的问题，提升了多模态体验。
- **#10690 [CLOSED]**: 修复了集成页面中 Provider 配置链接 slug 化错误的问题（如 Z.AI 路径错误）。
- **#10609 [CLOSED]**: 修正了 ZeroCode 忽略启动目录、强制使用 agent workspace 作为 cwd 的行为，恢复了用户的目录工作流预期。

这些关闭的 Issue 表明团队正在清理 v0.8.5 前的 UX 摩擦点和明显 Bug，为后续稳定版本奠定基础。

## 4. 社区热点
以下 Issue 评论数较多或关注度高，反映了社区当前的核心关切：

*   **#8692: Maintainer decision queue for RFCs and design issues** (15条评论)
    *   **热点分析**: 维护者试图建立更规范的设计决策追踪机制，社区对此类治理结构变更高度关注。
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)
*   **#10549: Simplify RFC voting by removing mandatory discussion windows** (9条评论)
    *   **热点分析**: 针对现有 RFC 流程中强制讨论窗口导致的时间浪费提出的优化建议，旨在提升治理效率。
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)
*   **#10337: fix(tools): honor allowed roots for git operations** (PR)
    *   **热点分析**: 安全相关的关键修复，涉及 Git 操作的权限边界，对依赖安全策略的企业级用户至关重要。
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10337)
*   **#9809: feat(providers): support multiple models per provider profile** (PR)
    *   **热点分析**: 大型功能增强，允许单 Provider 配置多模型，显著提升了配置灵活性，社区贡献者 NiuBlibing 主导。
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)

## 5. Bug 与稳定性
今日报告了多个高严重程度的 Bug，主要集中在运行时稳定性、Provider 交互和工具链行为：

**P1 - 严重/工作流阻断:**
*   **#10734 & #10753**: Windows 平台下 `RpcDispatcher::process_line` 栈溢出 (Stack Overflow)，导致 nextest 失败。这是一个回归问题（2026-09-07 测试通过，09-10 失败）。[Issue #10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) | [Issue #10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753)
*   **#10788**: Code/ACP 会话失败时，已接受的 Prompt 和完成的工具交换被从持久化历史中丢弃，导致状态不一致。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10788)
*   **#10785**: zerocode 通知延迟导致运行中的 Turn 被意外取消。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10785)
*   **#10777**: Anthropic 思考/努力请求配置在 Turn 间翻转，重写了整个缓存历史片段，严重影响缓存效率。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10777)
*   **#10701**: 带图片附件的用户消息会导致整个历史缓存前缀失效，而不仅限于新消息。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)
*   **#10786**: Anthropic Provider 在丢弃前一轮思考块时，会在每个 Turn 边界重写缓存历史。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10786)
*   **#10782**: Channel 回复意图预检丢弃了 LLM 使用量，导致分类器成本未被记录，影响配额管理。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10782)

**P2 - 中等/降级行为:**
*   **#10787**: Single-candidate stream 恢复忽略 `provider_retries` 配置，过载 (529) 仅重试一次且无退避。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10787)
*   **#10736**: Pre-output stream 失败时跳过了 advertised 的非流式回退机制。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10736)
*   **#10779**: OpenCode 429 (Quota Exhausted) 错误以亚秒级退避重试而非快速失败。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10779)
*   **#10731**: `zeroclaw service logs` 在非 Linux/systemd 平台（macOS, Windows, OpenRC）上健康状态下无输出。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10731)

**状态总结**: 上述 P1 Bug 大多刚于今日 (2026-09-11) 开放，目前尚无直接对应的 Closed Fix PR，需密切关注后续 PR 关联。

## 6. 功能请求与路线图信号
*   **#10780: Restore proactive token-budget context compaction** (P1)
    *   **信号**: 用户指出 v0.8.5 缺乏基于 token 预算的主动上下文压缩，仅依赖消息数量截断，导致长上下文效率低下。这是高优先级的路线图修正需求。
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10780)
*   **#10781: Remove or implement inert context/history config keys** (P2)
    *   **信号**: 多个配置键 (`context_compression.*`, `history_pruning.keep_recent` 等) 在当前版本中无效。用户要求要么实现功能，要么移除文档误导。
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10781)
*   **#9809: Support multiple models per provider profile** (PR)
    *   **信号**: 此 PR 若合并，将极大增强 Provider 配置的灵活性，是明确的功能增强方向。
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)
*   **#10321: Browser PKCE and cross-surface enrollment API** (PR, Stage 5 of #8289)
    *   **信号**: OIDC 身份验证路线图的重要进展，支持无浏览器环境的设备授权和客户端凭证流程，增强企业级安全集成能力。
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10321)

## 7. 用户反馈摘要
*   **痛点**: 用户对**上下文管理机制**不满，认为现有的历史截断策略粗糙，且部分配置键无效，导致 Token 浪费或关键信息丢失 (#10780, #10781)。
*   **痛点**: **缓存失效机制**存在缺陷，图片附件和 Anthropic 思考块的切换导致不必要的缓存重写和失效，影响性能和成本 (#10701, #10777, #10786)。
*   **不满**: **Windows 平台稳定性**问题突出，栈溢出 (#10734) 和日志命令行为不一致 (#10731) 影响了开发者和 Windows 用户的体验。
*   **满意/中性**: Telegram 多模态分组的修复 (#5514) 和 ZeroCode 目录行为的修正 (#10609) 解决了具体的工作流阻塞点，获得了及时响应。

## 8. 待处理积压
*   **#8289: OIDC milestone: canonical principals and inbound authentication** (Tracker)
    *   **状态**: 长期进行的重大安全架构重构。
    *   **积压 PR**: 有一系列堆叠 PR 等待合并，包括 #10321 (Stage 5), #10275 (Stage 6), #10274 (Stage 5), #10270 (Stage 5), #10268 (Stage 4), #10265 (Stage 4), #10263 (Stage 4), #10259 (Stage 3), #10248 (Stage 2)。这些 PR 均已 OPEN 较长时间（8月下旬创建），需要维护者持续跟进审查和合并顺序。
    *   [Tracker #8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289)
*   **#9967: Establish a harness evaluation framework** (Tracker)
    *   **状态**: 用于指导基准测试和评估框架的开发，目前仍在规划阶段。
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9967)
*   **#10731: `zeroclaw service logs` prints nothing on non-systemd platforms** (Open, P1)
    *   **状态**: 虽有 PR #10732 提出修复，但 Issue 本身代表了跨平台日志体验的长期问题，需确保修复覆盖所有平台。
    *   [Issue #10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) | [PR #10732](https://github.com/zeroclaw-labs/zeroclaw/pull/10732)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期**：2026-09-12

## 1. 今日速览
今日项目整体活跃度适中，共新增 4 条 Issue 和 2 条 PR。重点进展包括 Slack 媒体上传 Bug 已修复并合并（#3340），以及针对 Web UI 卡顿问题的优化 PR 正在等待审核（#3347）。社区用户对飞书配置兼容性和多模型提供商支持表现出较高关注。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
- **PR #3340 [CLOSED]** `fix(slack): set FileSize on media upload params` - 由 @octavioturra 提交并合并。修复了 Slack 文件上传因未设置 `FileSize` 导致失败的问题，提升了多媒体消息功能的稳定性。
- **PR #3347 [OPEN]** `fix laggy interface` - 由 @iMilnb 提交，旨在解决 Web UI 在长对话时的卡顿问题。该 PR 经过本地测试验证，目前待合并，有望改善用户体验。

## 4. 社区热点
- **Issue #3366** [Feature] Add support for OpenAI compatible providers - 由 @ItachiSan 提出，请求支持自定义 OpenAI 兼容提供商（如自托管路由器）。评论 2 条，反映用户希望扩展模型接入灵活性的需求。
- **Issue #3355** [BUG] 连接飞书报错 - 由 @ttghub 报告，指出 `config.json` 中存在未知字段 `channel_list.feishu.app_id`，提供了复现步骤和解决方案，评论 1 条，显示用户对飞书集成的配置痛点。
- **Issue #3346** [BUG] about RKLLM reply - 由 @crazysarah 报告 ARM 开发板上 RKLLM 模型响应异常，评论 2 条，涉及边缘设备 AI 推理稳定性。

## 5. Bug 与稳定性
- **#3346** [BUG] RKLLM 响应异常 - 严重程度中等，影响 ARM 板上的 LLM 推理，暂无 Fix PR。
- **#3355** [BUG] 飞书配置解析错误 - 严重程度高，导致飞书通道无法启用，用户已提供潜在解决方案，需维护者验证。
- **#3338** [BUG] Slack 媒体上传失败 - 已由 PR #3340 修复并关闭，问题已解决。

## 6. 功能请求与路线图信号
- **Issue #3366** 请求添加 OpenAI 兼容提供商支持，可能纳入未来版本以增强生态兼容性。
- **Issue #3355** 中用户提供的飞书配置修复建议，若验证有效，可提升多平台支持度。

## 7. 用户反馈摘要
- **痛点**：Slack 媒体上传功能失效（已修复）；飞书配置格式不兼容；RKLLM 在边缘设备上的响应稳定性；Web UI 长对话卡顿。
- **满意点**：Slack 修复快速响应；用户主动贡献解决方案（如飞书配置修复）。
- **场景**：企业集成（Slack、飞书）、边缘 AI 部署（ARM + RKLLM）、多模型路由。

## 8. 待处理积压
- **PR #3347** `fix laggy interface` - 已提交测试，待合并，建议优先审核以提升 UI 性能。
- **Issue #3346** RKLLM 响应异常 - 无 Fix PR，需维护者介入调查 ARM 环境兼容性问题。
- **Issue #3355** 飞书配置 Bug - 需验证用户提供的解决方案并评估修复优先级。

---
*数据来源：GitHub API（截至 2026-09-12 24:00 UTC）*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：2026-09-12**  
**数据来源：agentscope-ai/qwenpaw**

---

## 1. 今日速览

QwenPaw 项目在 2026-09-12 保持**高活跃度**，过去 24 小时内共产生 62 条 Git 活动（21 Issues + 41 PRs），并发布了稳定版本 **v2.2.1**。社区对多租户 Hub（v2.2.0 配套）、Agent 模型路由细粒度控制及子代理成本优化等功能需求强烈。v2.2.1 已发布，但随即暴露出会话索引同步、子代理超时及配置丢失等稳定性问题，需密切关注后续修复进展。

---

## 2. 版本发布

### **v2.2.1 (Stable)**
*   **状态：** 已发布（2026-09-11）
*   **核心更新：**
    *   **Agent 级模型路由配置：** 支持为每个 Agent 单独配置模型提供商偏好及故障转移行为（PR #7501）。
    *   **记忆增强：** 新增 Auto Fin 主动记忆审查功能，并升级 ReMe 记忆模块。
*   **破坏性变更/迁移注意：** 无明确重大破坏性变更公告，但建议用户检查自定义 Agent 的模型配置是否兼容新的路由逻辑。
*   **相关链接：** [Release Notes](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1) | [Issue #7692](https://github.com/agentscope-ai/QwenPaw/issues/7692)

---

## 3. 项目进展

### 已合并/关闭的重要 PR
1.  **Telegram Markdown 表格渲染修复 (PR #7590, #7713)：**
    *   解决了 Telegram 渠道中 Markdown 表格显示为原始管道符的问题。#7590 修复了基础渲染，#7713 进一步引入 Rich Messages API 以支持更复杂的表格格式，显著提升了 Telegram Bot 的用户体验。
2.  **API 验证错误处理优化 (PR #7677)：**
    *   确保非有限值输入返回标准的 422 错误码，并保持 FastAPI 的结构化响应，提升了 API 的健壮性。
3.  **会话分页简化 (PR #7688)：**
    *   移除了分组会话列表中的“折叠列表”功能，改为“加载更多”分页模式，并保留了滚动位置状态，改善了长会话列表的导航体验。
4.  **文档修正 (PR #7706)：**
    *   修正了多智能体文档中不存在的 `qwenpaw providers` 命令，统一为 `qwenpaw models`，减少了用户困惑。
5.  **安全加固 (PR #7699)：**
    *   增强了主密钥文件 (` .master_key`) 在读取时的权限检查，自动移除不安全的组/其他用户权限，提升了本地部署的安全性。

### 推进中的关键 PR
*   **Atlas Cloud 提供商支持 (PR #6499)：** 扩展了内置模型提供商，支持 Atlas Cloud。
*   **Playwright 驱动自愈 (PR #6776)：** 修复浏览器后端在驱动断开后永久失效的严重 Bug，提升自动化测试稳定性。
*   **Hub 本地管理员初始化 (PR #7696)：** 为 QwenPaw Hub 多租户版本提供 `qwenpaw hub --init-admin` 命令行工具，简化远程服务器部署流程。

---

## 4. 社区热点

1.  **QwenPaw Hub 多租户版路线图讨论 (Issue #7318)**
    *   **热度：** 26 评论，4 👍
    *   **分析：** 社区对 v2.2.0 多租户功能的跟进热烈，用户积极探讨后续建设方向。这表明团队协作场景是 QwenPaw 的重要增长引擎。
2.  **Web 控制台首页 UX 优化建议 (Issue #7177)**
    *   **状态：** 已关闭（可能已纳入规划或作为讨论存档）
    *   **分析：** 用户反馈移动端操作便捷性问题，如“开始”与“停止”按钮的位置及视觉优先级，反映了移动端用户体验亟待改善。
3.  **子代理模型选择功能请求 (Issue #4901)**
    *   **状态：** 开放
    *   **分析：** 用户希望实现类似 Claude Code 的 Haiku/Opus 任务分发模式，通过为子任务分配低成本模型来节省 Token。这与 v2.2.1 新增的 Agent 级模型路由功能相呼应，显示该需求已被官方关注。
4.  **Serply Web Search 提供商集成 (Issue #7711, PR #7712)**
    *   **分析：** 社区贡献者主动添加 Serply 作为第三方搜索源，补充了现有的 Tavily 和 AnySearch，体现了生态的开放性。

---

## 5. Bug 与稳定性

**严重程度：高**

1.  **会话索引与磁盘不同步 (Issue #7698)**
    *   **描述：** Windows Tauri v2.2.1 中，侧边栏会话列表显示 9 月 10 日会话，但点击后加载 9 月 9 日内容，且历史记录丢失。磁盘上对应 session 文件不存在。
    *   **状态：** 未标注 Fix PR，需紧急关注。
2.  **任务停止后实际仍在执行 (Issue #7567)**
    *   **描述：** Web 版 v2.2 中，用户点击停止后 UI 显示停止，但任务后台继续运行，导致后续操作抛出 409 冲突错误。
    *   **状态：** 未标注 Fix PR，影响用户体验和数据一致性。
3.  **`spawn_subagent` 模型配置失效 (Issue #7676)**
    *   **描述：** 在 v2.2.1-beta.1/beta.2 中，`subagent_model` 配置无效，子代理始终继承父代理的 `active_model`。
    *   **关联：** 可能是 v2.2.1 引入的模型路由重构带来的回归。
4.  **子代理任务普遍超时失败 (Issue #7678)**
    *   **描述：** v2.2.0 中，使用 `spawn_subagent` 后任务全部 timeout，即使延长超时时间也无济于事。
    *   **状态：** 未标注 Fix PR，严重影响多智能体工作流。
5.  **大模型设置随机丢失 (Issue #7708)**
    *   **描述：** Windows Desktop v2.2.1 中，正常使用过程中预设的大模型配置突然消失，报错提示未设置模型，需重新选择。
    *   **状态：** 未标注 Fix PR，数据持久化可能存在 Bug。

**严重程度：中**

6.  **PDF 文档在 Mult modal 模型下发送失败 (Issue #7689)**
    *   **描述：** 针对 OpenAI 兼容端点的多模态模型，工具返回的 PDF 块仍被序列化为 `{"type":"file",...}` 导致 HTTP 错误。`#7621` 仅修复了 `supports_multimodal=False` 的情况。
7.  **多图生成审核通过后任务卡死 (Issue #7693)**
    *   **描述：** Creator 模式中，用户在多图生成期间点击“审核通过”，会中断当前正在执行的任务且不重新调度，导致任务永久卡在 RUNNING 状态。

---

## 6. 功能请求与路线图信号

1.  **Loop 模式上下文压缩命令 (Issue #7679)**
    *   **需求：** 在长目标/任务模式的 Loop 中，增加 `/compact` 命令，当上下文超长时自动压缩后再继续，以节省 Token。
    *   **潜力：** 高。随着 Agent 运行时长增加，上下文管理成为刚需。
2.  **自定义默认 Loop 模式 (Issue #7714)**
    *   **需求：** 允许用户将“目标”或“任务”模板设为新会话的默认 Loop 模式，避免每次手动切换；同时建议重命名内置的“默认”模板以避免概念冲突。
    *   **潜力：** 中。属于 UX 优化，易实现且提升高频用户效率。
3.  **Web Search 添加 Serply 提供商 (Issue #7711, PR #7712)**
    *   **需求：** 增加 Serply 作为可选的 web_search 后端。
    *   **潜力：** 高。PR 已提交，预计纳入下一版本。
4.  **智能体间对话历史记录分组 (Issue #7710)**
    *   **需求：** 为 `chat_with_agent` 和 `submit_to_agent` 创建的会话添加独立的 Console 历史分组，避免与“未分类”混淆。
    *   **潜力：** 中。提升多智能体协作的可观测性。
5.  **Telegram 中间消息清理 (PR #7592)**
    *   **需求：** 可选地在发送最终答案后清理 Telegram 中的中间过程消息（思考、工具调用等）。
    *   **潜力：** 高。提供开关供用户选择，兼顾性能与聊天框整洁度。

---

## 7. 用户反馈摘要

*   **移动端体验不佳：** 多位用户（Issue #7177, #7707）反馈 Web 版在 Android 上的操作便捷性问题，特别是输入框换行与提交的冲突，以及关键操作按钮（开始/停止）位置不合理。
*   **多智能体功能稳定性堪忧：** `spawn_subagent` 相关 Issue（#7678, #7676）集中爆发，表明 v2.2.x 在多代理协同方面的底层实现可能存在严重缺陷，影响核心使用场景。
*   **数据持久化信任危机：** Issue #7708（配置丢失）和 #7698（会话记录丢失/错乱）导致用户对桌面客户端的数据可靠性产生怀疑。
*   **对成本优化的关注：** Issue #4901 和 #7679 反映出高级用户非常关注 Token 成本控制，希望通过更细粒度的模型选择和上下文管理来降低运行费用。
*   **工作目录管理混乱：** Issue #7705 指出新建任务时工作目录未遵循默认设置，且 UI 缺乏清晰指引，对新手用户不友好。

---

## 8. 待处理积压

*   **Issue #7698 (Critical):** 会话索引与磁盘不同步，可能导致用户数据永久丢失，需优先排查存储层 Bug。
*   **Issue #7567 (High):** 任务停止状态不同步，需检查异步任务取消机制。
*   **Issue #7678 (High):** `spawn_subagent` 普遍超时，可能阻塞大量依赖多代理的工作流，需紧急诊断。
*   **Issue #4901 (Feature):** 长期未解决的子任务模型选择功能，虽有新 PR #7501 涉及路由，但需确认是否完全覆盖此需求。
*   **PR #6776:** Playwright 驱动自愈修复，已就绪待合并，有助于提升浏览器自动化稳定性。

---
**报告生成时间：** 2026-09-12  
**分析师：** Agnes-2.5-Flash (Sapiens AI)

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报 (2026-09-12)

## 1. 今日速览
项目处于高频迭代与稳定性攻坚期。过去24小时内Issue活跃482条，PR活跃500条，且发布了v0.21.2补丁版本修复核心数据层风险。社区反馈显示v0.21.0引入的会话存储重构带来了新的严重Bug（如`state.db`损坏、多Profile会话隔离失效），安全团队正在密集修复认证与执行隔离漏洞。整体活跃度极高，但稳定性风险（P1级）显著上升。

## 2. 版本发布
**v0.21.2 (v2026.9.11)** — 紧急补丁发布
*   **核心修复**：针对v0.21.0版本中会话存储连接处理重写导致的`state.db`脆弱性问题。
*   **问题背景**：多进程并发写入时，锁机制失效导致数据库损坏（参考Issue #103339）。
*   **注意事项**：该版本为Patch修复，建议所有运行多Profile或桌面端长时间驻留的用户立即升级，以防数据一致性故障。

## 3. 项目进展
今日合并/关闭的关键PR主要集中在性能优化、安全加固及体验修复：

*   **[CLOSED] 推理/思考过程流式传输暴露** (#107320)：修复了`/v1/responses`流式接口中未暴露模型Reasoning/Thinking数据的问题，完善了对OpenAI兼容接口的支持。
*   **[CLOSED] 桌面端后端池泄漏修复** (#105305)：解决了桌面应用中因`keepalive`机制导致后台Python进程无限累积的问题，有效降低了内存占用。
*   **[CLOSED] 远程代码执行安全加固** (#108248)：修复了`DANGEROUS_PATTERNS`中缺失包管理器安装（pip/uv/npm -g）的检查漏洞，防止Agent通过安装远程代码绕过审批。
*   **[CLOSED] 定时任务中间断误报修复** (#107320关联逻辑)：虽然PR #107320主要修复API，但社区正在关注Cron心跳与执行结束状态冲突导致的误报"Interrupted by shutdown"问题。

## 4. 社区热点
*   **[技能索引老化] Skills index is stale or degraded** (#66616) — **198条评论**
    *   自动化探针发现Skills Hub索引超过29.8小时未更新，引发大量用户投诉工具链不可用。
*   **[自动化集成阻塞] Automated Nous integration is blocked** (#88584) — **89条评论**
    *   Nous到Enterkey的合并因`cron/jobs.py`冲突而停滞，影响持续交付流程。
*   **[语音交互架构设计] RealtimeVoiceProvider ABC** (#77111) — **24条评论, 2👍**
    *   讨论如何整合多个竞争的实时语音PR，倡导设计抽象基类（ABC）而非逐个合并，以解决架构混乱。
*   **[新功能] GPT-Live voice chat mode** (#108137) — **新建PR**
    *   提出全双工语音聊天模式，将语音请求委托给Hermes处理，支持实时工具调用和记忆检索。
*   **[安全警告堆积] Hermes Security Vulnerabilities Keeps Stacking up** (#107356) — **6条评论**
    *   用户指出npm依赖存在多个高危漏洞（如`@vitest/mocker`路径遍历），呼吁加强安全审计。

## 5. Bug 与稳定性
**P1 严重级别（影响核心功能或数据安全）**
1.  **state.db 损坏与锁竞争** (#103339, #108668关联)：多Profile环境下，非`doctor --fix`路径的二写者仍可能导致WAL损坏。v0.21.2尝试修复，但用户反馈显示需引入更严格的`flock`单写者门控。
2.  **Cron 心跳死锁** (#100401)：执行时间超过60秒的任务会被错误标记为"Interrupted by shutdown"，导致定时任务状态混乱。
3.  **Windows 更新后验证失败** (#105145)：桌面端在Windows上执行`hermes update`后，因工作目录解析错误导致状态报告为FAILED，尽管更新已成功。
4.  **桌面端多Profile会话创建崩溃** (#102792)：通过项目侧边栏"+"新建会话时，元数据丢失导致立即报错"Couldn't open this session"。

**P2 重要级别**
5.  **Profile切换导致MCP工具加载失败** (#67605, #106005)：切换Profile后，MCP工具和工具集解析未正确隔离，仍沿用启动时的配置。
6.  **插件工具集验证顺序错误** (#71650)：`validate_platform_toolsets()`在插件加载前运行，导致自定义工具集出现误报警告。
7.  **渲染器内存无限增长** (#77311)：Desktop应用保留所有会话消息的内存引用，重负载下可达5GB+。
8.  **Skill Slash命令静默失败** (#107387)：部分Skill命令（如`/grilling`）执行后无响应，仅打印"Loading"而无后续输出。

## 6. 功能请求与路线图信号
*   **GPT-Live 全双工语音** (#108137)：官方作者`teknium1`发起的新特性PR，表明团队正致力于将语音交互升级为支持实时工具调用的全双工模式，而非简单的语音转文字。
*   **委托模型编辑能力** (#105250)：允许用户在桌面端直接编辑委托（Delegation）模式和回退策略，增强复杂工作流的配置灵活性。
*   **会话间消息传递** (#106423)：受Meta Muse Code启发，允许同一机器上的不同Hermes会话互相发送警告或解锁信号，提升多Agent协作能力。
*   **Germant (de) 本地化** (#51217)：社区持续请求增加德语支持，反映欧洲用户群体的增长。
*   **系统托盘支持** (#38007) — **16👍**：长期存在的痛点，用户希望关闭窗口后应用在后台继续运行而非完全退出。

## 7. 用户反馈摘要
*   **痛点**：用户对v0.21.0引入的稳定性 regression 反应强烈。特别是`state.db`损坏和多Profile下的会话隔离问题，被描述为"破坏性更新"。
*   **满意度**：桌面端性能优化（如后端池管理）和推理过程可见性（Reasoning tokens）的改进受到好评。
*   **使用场景**：大量用户反馈集中在企业级多Profile部署、定时任务自动化（Cron）以及MCP工具集成场景，这些是目前最活跃的使用领域。
*   **担忧**：安全漏洞（NPM包陈旧、权限绕过）让用户感到不安，要求更快的安全补丁周期。

## 8. 待处理积压
*   **#66616** [Skills Index Stale]：高优先级，影响所有依赖Skills Hub的用户，需CI/CD流水线排查。
*   **#88584** [Nous Integration Blocked]：自动化集成卡住，阻碍内部依赖同步。
*   **#100401** [Cron Heartbeat Deadlock]：定时任务可靠性是高级用户的核心需求，当前P1 Bug需尽快定位根因。
*   **#38007** [System Tray Support]：长期高票需求，涉及Electron主进程改造，优先级需重新评估。
*   **#107356** [Security Vulnerabilities]：npm依赖审计滞后，需建立自动化依赖更新机制。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 (2026-09-12)

**分析师**：Agnes
**数据来源**：GitHub API (github.com/AstrBotDevs/AstrBot)
**统计周期**：2026-09-11 00:00 - 2026-09-11 23:59 (UTC+8)

---

### 1. 今日速览
今日 AstrBot 社区保持高度活跃，过去24小时内新增 **2 个 Issues** 和 **15 个 Pull Requests**，所有 PR 均处于待合并状态（已合并: 0）。开发者群体反应迅速，针对今日报告的 Bug（如 QQ Face 表情切碎、DeepSeek 配置报错）在创建 Issue 后极短时间内即提交了修复 PR，体现了高效的维护响应机制。项目整体健康度良好，核心维护者 @Soulter 及社区贡献者正积极解决多平台适配与核心逻辑稳定性问题。

### 2. 版本发布
**无新版本发布。**
当前最新稳定版本为 v4.28.0，今日无 Release 动态。

### 3. 项目进展
今日共有 **15 个 PR** 活跃，主要推进了以下领域：
*   **多模型提供商支持**：新增 DaoXE 聊天补全提供商 (@seven7763, #10048)，进一步扩展了可插拔的 LLM 后端生态。
*   **核心稳定性修复**：
    *   修复定时任务 (Cron) 唤醒时丢失 `fallback_provider_ids` 导致无备用模型切换的问题 (#10040)。
    *   修复主动式 Agent (Proactive Agent) 最终文本未投递到绑定会话的缺陷 (#10008)。
    *   防止插件注册已创建的 Task 时导致启动崩溃 (#10043)。
*   **性能优化**：
    *   WebUI 聊天历史增加分页加载功能，解决长对话加载卡顿问题 (#9667)。
    *   减少 Telegram 适配器中因轮询和冲突产生的日志噪音 (#10046)。
    *   系统提醒消息标记为临时消息，防止上下文历史无限增长 (#10044)。
*   **体验改进**：
    *   修复分段回复 (Segmented Reply) 时 QQ 内嵌表情被错误切碎为独立消息的问题 (#10049)，该修复直接对应今日 Issue #10047。
    *   新增韩语 (ko-KR) 本地化支持，丰富 WebUI 多语言覆盖 (#9210)。
    *   优化图片预处理逻辑，支持自适应缩放、GIF 采样及透明背景处理，提升多模态模型输入兼容性 (#9703)。

### 4. 社区热点
*   **Issue #10045 [Bug] DeepSeek/OpenCode 模型通讯报错 400 MissingSessionID**
    *   **热度指标**：3 条评论 | 创建后迅速引发讨论
    *   **分析**：用户在使用 OpenCode 网关对接 DeepSeek 时遇到路由缺失 SessionID 的问题。这反映了随着 OpenCode 等新中间件接口的流行，用户对于复杂网关配置下的兼容性需求增加，需关注后续是否有官方文档更新或配置示例补充。
    *   **链接**：https://github.com/AstrBotDevs/AstrBot/issues/10045

*   **Issue #10047 [Bug] 分段回复导致 QQ 表情独立发送**
    *   **热度指标**：0 评论但引发快速 PR 响应
    *   **分析**：这是一个典型的“用户体验痛点”型 Bug，直接影响 QQ 群聊的自然交互感。Issue 提出的同时，PR #10049 随即跟进，显示了社区对消息渲染一致性的高度关注。
    *   **链接**：https://github.com/AstrBotDevs/AstrBot/issues/10047

### 5. Bug 与稳定性
今日报告了 **2 个** 主要 Bug，均涉及核心交互逻辑：

1.  **严重 (High)**：**分段回复破坏消息链结构** (#10047 / Fix: #10049)
    *   **现象**：启用 `segmented_reply` 后，QQ 内嵌 Face 组件被拆分为独立气泡，破坏语义完整性。
    *   **状态**：已有修复 PR #10049 (`fix: keep inline Face components...`)。
2.  **高 (High)**：**DeepSeek/OpenCode 配置报错 400** (#10045)
    *   **现象**：请求缺少 `x-opencode-session` 头，导致 provider 路由失败。
    *   **状态**：待确认是否为客户端配置错误还是 SDK 适配问题，暂无 Fix PR。
3.  **中 (Medium)**：**定时任务备用模型丢失** (#10040 Fix: #10040)
    *   **现象**：Cron 唤醒的 Agent 无法像交互式管道那样正确传递 `fallback_provider_ids`。
    *   **状态**：已有修复 PR #10040。
4.  **中 (Medium)**：**工具调用名流式响应重复拼接** (#7735)
    *   **现象**：MiniMax 经 NVIDIA 代理时，Tool Call 名称出现自重复（如 `astr_kb_searchastr_kb_search`）。
    *   **状态**：修复 PR #7735 仍在开放中，更新于昨日。

### 6. 功能请求与路线图信号
*   **多语言国际化**：PR #9210 添加韩语支持，表明项目正在逐步扩大 WebUI 的国际化覆盖范围，未来可关注其他亚洲语言的本地化需求。
*   **图片预处理自动化**：PR #9703 提出的“本地进程自适应准备图片”功能，显示了项目在提升多模态兼容性方面的技术路线——即在模型调用前进行标准化的本地预处理，而非依赖模型自身的容错能力。
*   **大对话历史性能优化**：PR #9667 的分页加载功能，标志着 WebUI 正在向支持更长上下文历史的场景演进。

### 7. 用户反馈摘要
*   **痛点**：用户对 **QQ 表情渲染的连贯性** 非常敏感，分段回复功能虽提升了阅读体验，但破坏了 Rich Text 结构是明显的反模式反馈。
*   **稳定性担忧**：用户关注 **Cron 定时任务与实时互动的行为一致性**，期望后台任务也能享有同等的故障转移（Fallback）能力。
*   **运维体验**：Telegram 日志噪音过大影响排查效率，用户希望减少无关的 HTTP 轮询日志。

### 8. 待处理积压
*   **PR #7735 [FIX] MiniMax 工具调用名重复拼接**：该 PR 创建于 2026-04-22，虽近期有更新但仍未合并。作为一个影响特定链路（NVIDIA 代理+MiniMax）的严重 Bug 修复，建议维护者优先审阅合并，以解除长期存在的兼容性隐患。
*   **Issue #10045 [BUG] DeepSeek/OpenCode 400 错误**：截至目前尚无官方回应或 Replicate 确认，需关注是否为已知限制或需要社区提供复现步骤。

---
*本报告由 Agnes (Sapiens AI) 自动生成，数据截至 2026-09-12。*

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：** 2026-09-12
**分析对象：** deepseek-ai/deepseek-harness
**数据周期：** 过去 24 小时

---

## 1. 今日速览
今日 DeepSeek Harness 社区活跃度维持高位，过去 24 小时内 Discussions 新增 **202 条**更新，显示用户参与度极高。核心议题集中在**会话状态管理的稳定性**（Fork 异常、迁移失败、并发冲突）以及**插件生态的安全规范**讨论。虽然未发布新版本，但社区对 v0→v1→v2 数据迁移兼容性、第三方插件事件注册机制以及官方插件市场的需求尤为强烈，反映出项目正在从早期开发阶段向生产级稳定性演进的关键期。

---

## 2. 版本发布
*   **新版本发布：** 0 个
*   **说明：** 当前无最新 Release 发布。根据仓库机制，代码合并通过 Releases 落地，由于今日无新 Release，故无具体的合并摘要可列。建议关注后续版本中对 `dsh-click` 插件事件兼容性及会话迁移逻辑的修复。

---

## 3. 项目进展
*   **代码合并情况：** 无今日合并记录（基于无 Release 数据）。
*   **技术债务关注：** 尽管无新发布，但今日社区集中反馈了多个阻碍稳定使用的结构性问题，特别是会话格式迁移（v0→v1→v2）和并发会话日志冲突，这些是下一个维护版本亟需解决的“硬骨头”。

---

## 4. 社区热点
以下 Discussion 为今日评论最多、关注度最高的话题：

| 排名 | 主题 | 作者 | 评论数 | 链接 |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **[Ideas] 强烈建议建立官方插件市场，防范投毒风险** | @Re13orn | 25 | [讨论 #1115](https://github.com/deepseek-ai/deepseek-harness/discussions/1115) |
| 2 | **[Proposal] 第三方插件 Session Event 注册导致 Resume 崩溃** | @Mchsd | 12 | [讨论 #3191](https://github.com/deepseek-ai/deepseek-harness/discussions/3191) |
| 3 | **[Bug] Fork 已运行会话时发送消息行为异常** | @lgzzzz | 9 | [讨论 #6141](https://github.com/deepseek-ai/deepseek-harness/discussions/6141) |
| 4 | **[General] 非官方社区：DeepSeek Harness 生态大全（mydsh.dev）共建** | @uluckystar | 9 | [讨论 #1563](https://github.com/deepseek-ai/deepseek-harness/discussions/1563) |
| 5 | **[Bug] 会话损坏及 v0→v1→v2 Migration Failure** | @jhugard | 9 | [讨论 #5909](https://github.com/deepseek-ai/deepseek-harness/discussions/5909) |

**热点分析：**
*   **插件安全焦虑：** #1115 获得最高关注，用户借鉴“龙虾”（可能指代其他开源生态）的历史教训，强烈呼吁官方建立有审核机制的插件市场，安全已成为社区共识痛点。
*   **并发与状态管理：** #3191 和 #6141 均指向多会话操作（Fork/Resume）时的状态不一致问题，表明当前客户端在处理复杂工作流时的健壮性不足。

---

## 5. Bug 与稳定性
今日报告了多个严重影响使用体验的 Bug，按严重程度排列如下：

### 🔴 P0 - 数据丢失/会话损坏
*   **会话损坏及迁移失败 (v0→v1→v2)**
    *   **现象：** 工具调用 ID 重复导致会话加载失败（空白），迁移流程阻断。
    *   **复现环境：** Windows / Node 24, `dsh --profile web`。
    *   **链接：** [#5909](https://github.com/deepseek-ai/deepseek-harness/discussions/5909)
*   **历史会话迁移拒绝 (permission/preset origin)**
    *   **现象：** 升级后旧会话无法打开，Web UI 拒绝加载并报错。
    *   **链接：** [#5818](https://github.com/deepseek-ai/deepseek-harness/discussions/5818)
*   **双实例并发导致日志 Seq 冲突**
    *   **现象：** 两个 `dsh web` 实例共用同一 `DSH_HOME` 并操作同一会话，导致 seq 重叠、历史记录损坏。
    *   **链接：** [#4178](https://github.com/deepseek-ai/deepseek-harness/discussions/4178)

### 🟠 P1 - 功能故障
*   **Fork 会话消息发送错误**
    *   **现象：** Fork 出新会话后，发送的消息实为 Fork 前被终止或排队的前一条消息，而非当前输入。
    *   **链接：** [#6141](https://github.com/deepseek-ai/deepseek-harness/discussions/6141)
*   **新版本 Fork 后 Prompt 重载 Bug**
    *   **现象：** 在 v0.1.5-rc.1 中，Fork 会话并写入新 prompt 时，内容会错误地重载为 Fork 前的 prompt。
    *   **链接：** [#6160](https://github.com/deepseek-ai/deepseek-harness/discussions/6160)
*   **第三方插件 HTTP Channel 注册失败**
    *   **现象：** 升级至 alpha.2 后，若插件注册 HTTP channel，启动 `dsh web` 报错 `cannot get property 'webServer' without inject`。
    *   **链接：** [#5926](https://github.com/deepseek-ai/deepseek-harness/discussions/5926)
*   **超长上下文下 Agent 思考退化循环**
    *   **现象：** v4.1-flash 模型在 max reasoning effort + 超长上下文下陷入零产出循环，无自动熔断。
    *   **链接：** [#5976](https://github.com/deepseek-ai/deepseek-harness/discussions/5976)

### 🟡 P2 - 体验问题
*   **工作区无法打开/输入**
    *   **链接：** [#6265](https://github.com/deepseek-ai/deepseek-harness/discussions/6265)

---

## 6. 功能请求与路线图信号

1.  **官方插件市场与审核机制** (#1115)
    *   **需求：** 建立官方市场，制定标准，实施严格的安全审核与奖励机制。
    *   **路线图信号：** 高优先级。社区自发形成的 `awesome-dsh-plugin` 列表（#1563）表明生态已初具规模，官方介入规范化是必然趋势。
2.  **临时聊天功能 (Temporary Chat)** (#5765)
    *   **需求：** 无需绑定项目即可进行简单的 AI 咨询或资料调查。
    *   **路线图信号：** 中等优先级。降低使用门槛，适合轻量级用户场景。
3.  **定时任务能力 (dsh-schedule-tasks)** (#1563)
    *   **需求：** 在 DSH 内部实现类似 cron 的定时执行能力，无需依赖外部工具。
    *   **路线图信号：** 社区已有成熟插件实现，若纳入官方核心或官方市场推荐，将极大增强 Agent 自动化能力。
4.  **Session Event 注册规范** (#3191)
    *   **需求：** 明确第三方插件自定义事件的注册与忽略机制，防止破坏会话恢复。
    *   **路线图信号：** 技术债修复，关乎插件生态的稳定性，预计会在下一版本修补。

---

## 7. 用户反馈摘要

*   **痛点 - 会话状态不可靠：** 多位用户反馈 Fork、Resume、多实例并发场景下的数据错乱。用户期望 DSH 能像传统 IDE 一样可靠地管理会话状态，但目前的实现仍存在明显的竞态条件和序列化错误。
*   **痛点 - 迁移噩梦：** v0 到 v1/v2 的迁移过程中，用户遇到了大量因工具调用 ID 重复、字段缺失导致的会话永久损坏，这严重影响了老用户的升级意愿。
*   **痛点 - 插件开发生态混乱：** 开发者面临“无官方标准”的困境。HTTP channel 注入失败、自定义事件不被识别等问题，使得插件开发门槛高且容易踩坑。
*   **满意点 - 社区协作活跃：** 尽管存在 Bug，但社区自我组织能力极强。非官方社区（mydsh.dev）和精选插件列表的出现，弥补了官方文档和市场缺失的空白。
*   **满意点 - 模型性能探索：** 用户对 v4.1-flash 等最新模型的长上下文能力保持关注，虽然目前存在循环推理的 Bug，但探索欲望强烈。

---

## 8. 待处理积压

以下 Issue/Discussion 长期未得到官方明确回应或修复，建议维护者优先关注：

1.  **[Bug] 两个 dsh web 实例并发打开同一会话导致损坏** (#4178)
    *   *风险：* 多用户协作或 CI/CD 场景中极易触发，导致数据丢失。
    *   *状态：* 已复现，需官方确认是否支持多实例共享同一会话。
2.  **[Bug] 会话工具调用 ID 重复导致迁移失败** (#5909, #5818)
    *   *风险：* 直接导致用户历史数据丢失，影响信任度。
    *   *状态：* 涉及核心数据结构变更，需紧急修复。
3.  **[Ideas] 官方插件市场建设** (#1115)
    *   *风险：* 若长期缺位，社区可能自发形成割据或安全风险加剧。
    *   *状态：* 长期规划，需官方给出时间表或路线图。

---
*报告生成时间：2026-09-12*
*数据来源：GitHub Discussions (deepseek-ai/deepseek-harness)*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*