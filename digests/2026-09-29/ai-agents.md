# OpenClaw 生态日报 2026-09-29

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-29 01:20 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 | 2026-09-29

## 1. 今日速览
OpenClaw 昨日保持极高活跃度，过去 24 小时新增/更新 Issues 与 PR 均达 500 条，其中新开 Issues 434 条，PR 待合并 316 条。社区重点聚焦于 `prepared-model-catalog.worker.js` 的严重内存泄漏（P0）、Gateway 启动停滞以及 macOS 环境下的稳定性问题。维护团队响应迅速，当日即关闭了关键的性能回归 Issue #159514，并提交了多个紧急修复 PR，整体处于高强度修复期。

## 2. 版本发布
**无新版本发布**。当前社区主要关注 2026.9.5 和 2026.9.6 版本的稳定性修复。Issue #157531 作为 2026.9.7 的修复跟踪单仍在开放中，列出了 18/21 个已确定的 P1 候选修复项。

## 3. 项目进展
昨日合并/关闭的关键 PR 主要包括：
- **[CLOSED] #159514**: 修复了 2026.9.6 catalog worker 在每次请求时重建发现注册表导致的内存泄漏（约 8MB/请求），该问题已被证实为严重性能回归。
- **[CLOSED] #145072**: 解决了 macOS 上 npm update 在"global install swap"阶段因 launcher 指纹包含 symlink mode 而失败的问题。
- **[CLOSED] #152284**: 修复了在 Live Gateway 运行时构建 checkout dist 会删除正在使用的模块导致的 `ERR_MODULE_NOT_FOUND` 崩溃。

这些修复直接针对近期版本中最影响稳定性的几个核心痛点，尤其是内存管理和 macOS 安装流程。

## 4. 社区热点
**最活跃 Issue:**
- **#149538 [P0] Gateway 就绪但事件循环饥饿**: 632 代理机队中 Gateway 达到 ready 状态后无法服务，`/health` 探针超时且 RSS 持续上升直至 OOM。评论 22 条，是当前最高优先级的崩溃循环问题。
- **#157067 [P1] Windows isolated cron 环境 Proxy 错误**: Windows 原生环境下隔离 AgentTurn cron 设置因 Proxy 传递错误导致推理前失败。
- **#97616 [P1] 钩子/工具子进程泄漏**: 长期存在的僵尸进程累积问题，导致运行时性能下降，已被标记为 `clawsweeper-recovery-stuck`。

**最新重要 PR:**
- **#160847**: 添加对 Anthropic Claude Sonnet 5.5 的支持，解决新生成模型未被识别的问题。
- **#157867**: 修复当派生辅助模型缺少凭据时，Agent 应回退到主 CLI 运行时的问题。
- **#156600**: 修复 Native Claude CLI 认证返回 `auth-unknown` 并阻塞历史重 seeding 的问题。

## 5. Bug 与稳定性
今日报告的多项 P0/P1 问题集中在内存和启动稳定性：
- **[P0] #159662 & #159596**: `prepared-model-catalog.worker.js` 存在无界内存泄漏，RSS 以 ~4-5 GB/h 的速度增长，导致 Gateway 出现锯齿状内存压力事件。这是目前最严重的稳定性隐患。
- **[P0] #156571**: 2026.9.5 的 model-catalog worker 在 tmp 目录泄漏源捕获文件（1-3 GB/分钟），耗尽磁盘空间。
- **[P0] #157160**: 即使修复了 `busyTimeoutMs=0`，Gateway 仍在 `plugin-doctor-post-session-state` 阶段崩溃循环。
- **[P1] #157989**: 插件源捕获每次 CLI 命令重写 1.1-1.4 GB，导致严重的 SSD 磨损和性能下降。
- **[P0] #158095**: 某个 Gateway 工作进程在 `acquireSqliteWorkerLifecycle` 后保持状态，导致后续所有获取失败。
- **[P0] #158936**: macOS 应用的健康检查 Watchdog 会在 Gateway 正常慢启动时发送 SIGTERM，导致重启循环。

## 6. 功能请求与路线图信号
- **Databricks Unity Gateway 支持**: Issue #155633 请求将 Databricks Unity Gateway 添加为官方模型提供商，已有实现 PR #155634，反映了企业对合规流量网关的需求。
- **Talk Mode 空闲超时**: Issue #46844 请求添加语音唤醒后的空闲自动停用功能，以减少不必要的 Token 消耗。
- **Per-agent SSRF 覆盖**: PR #67421 允许针对特定 Agent 配置 `web_fetch` 的 SSRF 策略（如允许私有网络），增强了安全灵活性。
- **CLI Session Reset 行为**: Issue #120006 指出 `session reset` 会丢弃工具历史，且并发 CLI 会话可能操作同一会话密钥，暗示用户对会话隔离和状态管理的更高要求。

## 7. 用户反馈摘要
- **内存焦虑**: 多位用户报告 2026.9.5/9.6 版本的内存泄漏（#159596, #156571, #157989），RSS 飙升至 8-10GB 已成为常态痛点。
- **Windows 环境摩擦**: Issue #157067 和 #145072 表明 Windows 用户在隔离环境和更新安装方面遇到持续性障碍。
- **MCP 连接韧性**: Issue #98435 指出 Gateway 重启后 MCP loopback 传输未自动重连，尽管会话内容已恢复，造成“假性恢复”体验。
- **文档与向导缺失**: Issue #16670 批评 Onboarding Wizard 未包含 Memory/Embedding 设置，导致新用户困惑。

## 8. 待处理积压
以下 Issue 长期未得到最终解决，需维护者重点关注：
- **#97616**: 子进程泄漏问题（创建于 2026-06-29，已开放 3 个月），标记为 `clawsweeper-recovery-stuck`。
- **#40001**: `write` 工具缺乏追加模式，导致隔离 cron 会话覆盖共享文件（创建于 2026-03-08），这是一个长期存在的功能性缺陷。
- **#156917**: 状态生命周期租约缺乏心跳机制，单个卡住客户端可导致 Gateway 启动延迟 31 分钟（创建于 2026-09-24）。
- **#154114**: `openclaw update` 在 candidate rehearsal 阶段失败，报告“No usable, authenticated, tool-capable inference route”，尽管 Gateway 正常（创建于 2026-09-20）。

---
*数据来源: OpenClaw GitHub Repository (github.com/openclaw/openclaw)*
*报告生成时间: 2026-09-29*

---

## 横向生态对比

# 2026-09-29 开源 AI 智能体生态横向对比分析报告

## 1. 生态全景

个人 AI 助手与自主智能体开源生态呈现"高强度修复期"与"架构重构期"并存的特征。OpenClaw、hermes-agent 等核心项目正集中解决内存泄漏、会话状态管理等稳定性痛点，反映出该领域从"功能竞赛"向"工程健壮性"演进的趋势。社区活跃度分化明显：头部项目日互动量超 500 条，而长尾项目维护状态低迷。安全性（权限隔离、RAG 数据泄露）和上下文生命周期管理成为跨项目共同关注焦点，标志着生态进入成熟度提升的关键阶段。

## 2. 各项目活跃度对比

| 项目 | 今日 Issues | 今日 PR | Release | 健康度 | 维护状态 |
|------|------------|---------|---------|--------|----------|
| **OpenClaw** | 434 | 316 (待合并 316) | 无 | ⭐⭐⭐⭐ | 高强度修复期 |
| **hermes-agent** | 288 | 398 (待合并 398) | 无 | ⭐⭐⭐⭐ | 高吞吐维护期 |
| **Zeroclaw** | 25 | 39 (待合并 39) | 无 | ⭐⭐⭐ | 架构重构期 |
| **QwenPaw** | 6 | 17 (已合并 4) | 无 | ⭐⭐⭐⭐ | 稳定性加固期 |
| **AstrBot** | 5 | 10 (已合并 2) | 无 | ⭐⭐⭐ | 插件化扩展期 |
| **PicoClaw** | 7 | 10 (待合并) | 无 | ⭐⭐ | 社区驱动维护 |
| **DeepSeek Harness** | N/A (Discussions) | N/A | v0.2.0-rc.1 | ⭐⭐⭐⭐ | 体验优化期 |

**健康度说明：**
- ⭐⭐⭐⭐ 高：响应迅速，PR 合并节奏稳定，社区贡献活跃
- ⭐⭐⭐ 中：有进展但存在积压，部分 Issue 长期未响应
- ⭐⭐ 低：维护者响应不足，依赖社区自发维护

## 3. OpenClaw 在生态中的定位

**优势：**
- **规模领先**：Issue/PR 数量（434/316）为各项目中最高，反映最大用户基数和最活跃的开源贡献生态
- **工程严谨性**：对 P0 级内存泄漏（#159514, #159662）的快速响应和关闭，体现成熟的稳定性治理流程
- **商业化信号明确**：Databricks Unity Gateway 支持请求（#155633）反映企业级合规流量网关需求

**技术路线差异：**
- 相比 hermes-agent 的"Desktop 会话状态"路线，OpenClaw 聚焦于 **Gateway 架构解耦** 和 **配置治理**
- 相比 Zeroclaw 的"观察者事件流 daemon 化"，OpenClaw 更侧重 **模型目录 Worker 生命周期管理**
- 相比 DeepSeek Harness 的"桌面端体验"，OpenClaw 是更**底层的网关基础设施**

**社区规模对比：**
- OpenClaw > hermes-agent > Zeroclaw ≈ QwenPaw > AstrBot > PicoClaw
- OpenClaw 和 hermes-agent 形成第一梯队，日均互动量超 500 条，具备可持续的开源维护能力

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|----------|----------|----------|
| **内存泄漏治理** | OpenClaw, hermes-agent, QwenPaw | 2026.9.6 catalog worker 每次请求重建发现注册表导致 8MB/请求泄漏；Desktop 会话状态投影问题集群 |
| **上下文生命周期管理** | QwenPaw, AstrBot, DeepSeek Harness | ToolResultPruner 跳过媒体块导致上下文膨胀；长对话历史"失忆"问题；图片静默丢弃 |
| **跨平台安装稳定性** | OpenClaw, DeepSeek Harness, PicoClaw | macOS 环境 symlink 指纹问题；Windows 沙箱权限；Linux GPU 访问限制 |
| **安全性与权限隔离** | OpenClaw, AstrBot, DeepSeek Harness | SSRF 策略配置；OAuth scope 硬编码覆盖；Windows Office COM 安全风险 |
| **多渠道适配** | QwenPaw, AstrBot, hermes-agent | Telegram HTML formatter 多语言代码块；QQ 网关事件重复处理；WhatsApp SIGTERM 崩溃循环 |
| **插件化架构** | Zeroclaw, AstrBot, DeepSeek Harness | Plugin-owned Kanban board；OAuth PKCE 插件化管理；自动化任务插件化剥离 |

## 5. 差异化定位分析

| 维度 | OpenClaw | hermes-agent | QwenPaw | AstrBot | DeepSeek Harness |
|------|----------|--------------|---------|---------|------------------|
| **功能侧重** | 网关基础设施、模型目录管理 | Desktop 会话状态、自托管安装 | 控制台体验、上下文优化 | Provider 生态扩展、插件化 | 桌面端体验、Windows 安全 |
| **目标用户** | 企业级网关部署、DevOps | 自托管用户、高级用户 | 中文用户、Console 交互者 | 多平台 Bot 部署者 | 个人用户、Windows 用户 |
| **技术架构** | Gateway + Worker 分离架构 | Multi-profile 会话架构 | SQLite 持久化 + xterm 终端 | Plugin-managed OAuth | 自动化任务插件化 |
| **核心差异** | **稳定性优先**，P0 Bug 快速响应 | **Desktop 体验**，但会话状态存在系统性缺陷 | **上下文管理**，首次贡献者友好 | **渠道适配**，Telegram/QQ/浏览器 | **Windows 沙箱安全**，UI 动画细节 |
| **成熟度阶段** | 工程健壮性巩固期 | 架构重构期 | 体验精细化期 | 生态扩展期 | 产品打磨期 |

## 6. 社区热度与成熟度

### 快速迭代阶段（高频 Release/PR 合并）
- **OpenClaw**：日更新 500+ 条，P0 级内存泄漏当日关闭，体现敏捷响应能力
- **hermes-agent**：500 条 Issue/PR 吞吐，会话状态问题集群推动架构级修复
- **DeepSeek Harness**：v0.2.0-rc.1 发布，自动化任务插件化剥离标志架构演进

### 质量巩固阶段（Bug 修复为主，功能扩展放缓）
- **QwenPaw**：6 Issue/17 PR，聚焦上下文裁剪、媒体载荷拒绝恢复等稳定性修复
- **AstrBot**：5 Issue/10 PR，Provider 热重载、图片路径解析等深层 Bug 攻坚
- **Zeroclaw**：25 Issue/39 PR，观察者事件流 daemon 化、配置迁移等架构重构

### 低维护状态（依赖社区自发贡献）
- **PicoClaw**：7 Issue/10 PR，维护者响应不明显，社区创建 Fork 自救，安全审计 #258 修复状态未验证

## 7. 值得关注的趋势信号

### 技术趋势
1. **上下文管理成为核心竞争力**：QwenPaw #7853、AstrBot #9936、OpenClaw #159514 共同揭示，AI 智能体的"记忆可靠性"是用户信任的基础，未来版本将加剧上下文生命周期管理的竞争。

2. **插件化架构从可选变必选**：DeepSeek Harness 将自动化任务剥离为插件、AstrBot 引入 OAuth PKCE 插件化，反映核心团队趋向"精简核心、开放扩展"的架构哲学，降低维护成本同时激发生态创新。

3. **跨平台一致性仍是短板**：OpenClaw macOS symlink 问题、hermes-agent Linux gateway 崩溃、DeepSeek Harness Windows 沙箱权限，表明多平台适配需要系统性测试覆盖，而非补丁式修复。

### 社区趋势
4. **首次贡献者比例成为健康度指标**：QwenPaw 首次贡献者占据大部分 PR 增量，反映项目对新人的友好度和文档完善性，是可持续开源生态的关键信号。

5. **安全透明度影响用户信任**：PicoClaw #258 安全审计关闭但未验证修复、#3405 缺乏私有漏洞报告机制，提示开源项目需建立明确的安全响应流程以维持社区信心。

### 产品趋势
6. **Desktop 会话状态投影问题集群**：hermes-agent #123801、#68321、#122167 指向同一类"消息丢失/重复渲染"问题，表明 Desktop 端消息同步层存在系统性缺陷，需架构级重构而非补丁。

7. **企业级合规需求显现**：OpenClaw Databricks Unity Gateway 支持请求（#155633）、AstrBot Provider 热重载修复，反映企业用户对**可观测性、合规流量网关、权限隔离**的刚性需求，将是未来商业化突破口。

---

**分析师建议：**
- **对开发者**：关注 QwenPaw 和 AstrBot 的上下文管理方案，借鉴其 ToolResultPruner 媒体块处理逻辑
- **对技术决策者**：OpenClaw 和 hermes-agent 的稳定性治理流程值得参考，尤其是 P0 Bug 当日响应机制
- **对投资人**：DeepSeek Harness 的插件化架构和 AstrBot 的多渠道适配是生态扩展的有效路径

*报告生成时间：2026-09-29*
*数据来源：GitHub API (各公开仓库)*
*分析师：Agnes (Sapiens AI)*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**日期：** 2026-09-29
**分析周期：** 过去 24 小时
**来源：** github.com/zeroclaw-labs/zeroclaw

---

## 1. 今日速览

Zeroclaw 项目今日保持高活跃度，过去 24 小时内共产生 100 次 GitHub 动态（50 Issues + 50 PRs），其中新增/活跃 Issue 25 条，已关闭 25 条；PR 中待合并 39 条，已合并 11 条。虽然没有新版本发布，但核心基础设施进展显著：配置系统迁移工作取得关键突破（解决 `schema_version` 缺失导致的兼容性问题），同时安全性强化成为今日焦点，包括会话环境不可变性及 SOP 执行的权限收紧。整体来看，项目正从 v0.8.5 向 v0.9.0 网关分离架构稳步推进，技术债务清理与核心功能加固并重。

---

## 2. 版本发布

*   **无新版本发布。**
*   当前主要关注点是配合 **v0.8.6** (Phase 2 runtime work) 和 **v0.9.0** (Phase 3 gateway separation) 的代码合并与准备，详见 Issue #7432 和 Tracker #10814。

---

## 3. 项目进展

今日合并的关键 PR 主要集中在配置治理、观察者基础设施和网关重构三个方面：

*   **配置迁移修复 (#11217, #11218 相关清理):** 解决了配置文件中缺少 `schema_version` 字段时错误地被识别为 V1 并执行不必要迁移的问题，确保了配置读取的准确性。
*   **观察者事件流归属 daemon (#11131):** 这是一个重要的架构改进。此前只有 gateway 安装 `BroadcastObserver`，导致 gateway 关闭时 daemon 无法接收观察者事件，RPC `logs/subscribe` 失效。现在由 daemon 统一拥有观察者事件流，提升了可观测性的一致性。
*   **定价刷新器与网关启动钩子归属 daemon (#11164):** 修正了之前仅由 gateway 或 channel supervisor 启动 live-pricing refresher 的情况，确保即使 gateway 未启用，daemon 也能正确刷新定价信息。
*   **网关 F0 清理 (#11162):** 删除了 `zeroclaw-gateway` 中不再使用的 `hardware_context.rs` 及其依赖 `zeroclaw-hardware`，为 v0.9.0 网关分离减少了代码耦合。
*   **黄金帧测试记录 (#11161):** 为 v0.9.0 网关拆分计划增加了 WebSocket, SSE, webhook 和 ACP 的黄金帧录制与重放测试，提升了回归测试覆盖率。
*   **SOP 条件步骤 (#11134):** 引入了由决策模型选择的条件步骤功能（`- decide: <question>`），增强了 SOP 的灵活性。

**整体推进：** 项目在“守护进程核心化”和“网关解耦”两个战略方向上取得了实质性进展，基础设施的健壮性和可测试性得到加强。

---

## 4. 社区热点

以下 Issues 讨论最为激烈，反映了社区对架构演进和核心安全性的关注：

*   **#10549 [RFC] Simplify RFC voting process** (12 评论, CLOSED)
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)
    *   **分析：** 社区倾向于简化 RFC 投票流程，移除强制讨论窗口，以减少不必要的摩擦。这反映了项目希望加快决策和迭代速度。
*   **#5982 [Feature] Per-sender RBAC for multi-tenant agent deployments** (10 评论, OPEN)
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/5982)
    *   **分析：** 多租户部署中的细粒度访问控制需求强烈。该功能基于现有的 agent/risk-profile 模型构建，显示了社区对安全隔离的重视。
*   **#8832 [Feature] Plugin-owned Kanban board for agent work** (9 评论, OPEN)
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8832)
    *   **分析：** 插件化工作看板的需求持续存在，旨在提升 Agent 工作的可视化管理能力。
*   **#4853 [Feature] install skills from .well-known agent-skills discovery indexes** (8 评论, CLOSED)
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/4853)
    *   **分析：** 技能发现的标准化是生态扩展的关键，Cloudflare 和 Vercel 的内部实践推动了这一标准的落地。
*   **#11222 [Bug fix] fix(rpc): keep session environment immutable** (OPEN, 今日新建)
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/11222)
    *   **分析：** 针对 Issue #11197 的安全修复，强调会话环境一致性的重要性，得到了快速响应。

---

## 5. Bug 与稳定性

今日关闭了几个高严重程度的 Bug，并修复了潜在的安全风险：

*   **[Bug] concurrent file_edit/file_write calls silently drop edits (#11136) - S0 (CLOSED)**
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11136)
    *   **描述：** 并行工具调用下，对同一路径的并发文件编辑会导致数据丢失。
    *   **状态：** 已关闭，预计有相应修复 PR。
*   **[Bug] Session resume restores forwarded environment after admin revocation (#11197) - S0 (OPEN)**
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11197)
    *   **描述：** 管理员撤销权限后，会话恢复仍会还原转发环境，存在安全风险。
    *   **修复 PR：** #11222 已创建，使会话环境在生命周期内不可变。
*   **[Bug] multimodal image cap eviction invalidates cache prefix (#10778) - P1 (CLOSED)**
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10778)
    *   **描述：** Anthropic 提供商的多模态图像容量淘汰机制会重写早期历史消息，导致缓存前缀失效。
    *   **状态：** 已关闭。
*   **[Bug] partial Code/ACP turns disappear if process exits before completion (#10121) - S0 (CLOSED)**
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10121)
    *   **描述：** ZeroCode 和 daemon 生命周期结束时，未完成的 Code/ACP 轮次中的部分数据会丢失。
    *   **状态：** 已关闭。
*   **[Bug] block_high_risk_commands = false not honored (#10164) - S2 (CLOSED)**
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10164)
    *   **描述：** 安全沙箱配置未正确生效，允许的命令仍被阻止。
    *   **状态：** 已关闭。
*   **[Bug] zerocode notification lag cancels running turns (#10785) - P1 (CLOSED)**
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10785)
    *   **描述：** 通知延迟导致运行中的 turn 被错误取消。
    *   **状态：** 已关闭。
*   **[Bug] Non-vision capability gate fails on marker-shaped prose (#10887) - S2 (CLOSED)**
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10887)
    *   **描述：** 无视觉能力的模型在遇到提及图像的文本时也会失败。
    *   **状态：** 已关闭。
*   **[Bug] anthropic provider reports $0.00 spend (#9816) - P1 (OPEN)**
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)
    *   **描述：** Anthropic 提供商花费报告始终为 0，导致预算上限失效。
    *   **状态：** 仍开放，需关注。

---

## 6. 功能请求与路线图信号

*   **Plugin-owned Kanban board (#8832):** 插件化工作看板功能仍在积极讨论中，相关技术栈 (#11081) 已交付，预计将在近期纳入版本规划。
*   **Per-sender RBAC (#5982):** 多租户环境下的细粒度访问控制是明确的增强方向，已被接受并正在实现中。
*   **.well-known skills discovery (#4853):** 技能发现标准化已完成 RFC 流程并合并，推动了生态系统 interoperability。
*   **agy_cli coding-CLI tool (#11076):** 新增对 Antigravity CLI (`agy`) 的支持，以适配 Google Gemini CLI 的变更，体现了对主流工具链的跟进。
*   **SOP conditional steps (#11134):** SOP 流程增加条件分支能力，提升了自动化工作流的灵活性。
*   **Selected text to chat in zerocode (#10553):** 用户可以直接将选中的文本添加到聊天中，改善了交互体验。

---

## 7. 用户反馈摘要

*   **痛点：**
    *   **配置兼容性：** 用户对缺少 `schema_version` 的配置项处理不当表示关切，这可能导致意外的迁移行为 (#11217)。
    *   **安全性：** 会话环境在权限撤销后仍被恢复是一个严重的安全隐患，用户期望更严格的权限隔离 (#11197, #10164)。
    *   **可观测性：** Gateway 关闭时日志订阅失效的问题影响了开发调试体验，统一观察者事件流是必要的改进 (#11131)。
    *   **成本追踪：** Anthropic 提供商花费报告为零，使得预算管理功能形同虚设 (#9816)。
*   **满意点：**
    *   **快速响应：** 多个高优先级 Bug (如并发文件编辑、通知延迟取消 turn) 在短时间内得到修复和关闭。
    *   **架构清晰化：** 将观察者事件流和定价刷新器收归 daemon 所有，使架构职责更清晰。
    *   **工具链更新：** 及时跟进 Google Gemini CLI 到 Antigravity CLI 的转变，提供了 `agy_cli` 工具 (#11076)。

---

## 8. 待处理积压

*   **#9816 [Bug] cost: anthropic provider reports $0.00 spend** (OPEN, P1)
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)
    *   **提醒：** 这是一个影响预算管理的关键 Bug，需要优先处理。
*   **#10186 [Bug] Terminal fallback text bypasses live delivery seams** (OPEN, P2)
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10186)
    *   **提醒：** 终端回退文本绕过了实时交付机制，可能影响用户体验的一致性。
*   **#10162 [Task] plugin install persists the package before config-entry seeding** (OPEN, P2)
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10162)
    *   **提醒：** 插件安装流程的原子性问题，新包安装失败后的重试机制仍需完善。
*   **#10573 [Feature] Bind gateway pairing tokens to roster users** (OPEN, P2)
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10573)
    *   **提醒：** 网关配对令牌的 scoped remote principals 绑定功能已接受，但仍有后续工作。
*   **#11068 is an open draft for senders RBAC** (Referenced in #5982)
    *   [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/5982)
    *   **提醒：** 发送者 RBAC 的具体草案仍在开放中，需关注其进展。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-09-29**

---

## 1. 今日速览

PicoClaw 项目近期活跃度显著下降，多个关键 Issues 和 PR 被打上 `[stale]` 标记，反映出仓库维护状态可能已放缓。今日共处理 **7 个 Issues**（6 新开、1 关闭）和 **10 个 PR**（全部待合并），但无新版本发布。值得注意的是，社区已自发组织活跃分支（afjcjsbx/picoclaw），同时有开发者 x1F916 提交了 4 个稳定性修复 PR，试图挽救核心模块的可靠性问题。整体评估：**项目处于低维护状态，但社区贡献仍在持续**。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

### 今日 PR 概览（10 条，全部待合并）

| PR | 类型 | 作者 | 说明 |
|----|------|------|------|
| [#3403](https://github.com/sipeed/picoclaw/pull/3403) | fix | @x1F916 | 修复异步工具结果路由错误，解决多会话结果混乱问题 |
| [#3402](https://github.com/sipeed/picoclaw/pull/3402) | fix | @x1F916 | 修复上下文管理器中 agent 归属解析问题（重提交 #3316） |
| [#3401](https://github.com/sipeed/picoclaw/pull/3401) | fix | @x1F916 | 修复 Manager.Reload 同步性和 nil 安全问题，防止网关 panic |
| [#3400](https://github.com/sipeed/picoclaw/pull/3400) | fix | @x1F916 | 修复多 key 模型配置持久化丢失 Enabled 标志的问题 |
| [#3399](https://github.com/sipeed/picoclaw/pull/3399) | fix | @x1F916 | 修复 32-bit ARM 更新资源选择错误（误装 arm64） |
| [#3378](https://github.com/sipeed/picoclaw/pull/3378) | fix | @sarff | 修复 OAuth token 刷新时硬编码 scope 覆盖配置问题 |
| [#3354](https://github.com/sipeed/picoclaw/pull/3354) | feat | @linhongyu510 | 新增 IRCv3 multiline 消息接收支持 |
| [#3347](https://github.com/sipeed/picoclaw/pull/3347) | fix | @iMilnb | 修复 Web UI 聊天记录过长导致的界面卡顿问题 |
| [#3222](https://github.com/sipeed/picoclaw/pull/3222) | refactor | @trufae | Deltachat 模块重构，减少 200+ LOC，清理遗留代码 |
| [#3370](https://github.com/sipeed/picoclaw/pull/3370) | feat | @ilya-bogin-keenable | 新增 Keenable 网页搜索 provider |

**关键进展：**
- **可靠性修复集中爆发**：x1F916 一次性提交 4 个 PR，覆盖 agent loop、channels manager、config、updater 四个核心模块，显示出对当前 main 分支（bbf6893）稳定性的系统性关注。
- **性能问题获解**：#3347 解决了长期存在的 Web UI 卡顿问题（关联 Issue #3281）。
- **功能扩展持续**：IRCv3 multiline 支持、Keenable 搜索 provider 为项目带来新功能。

---

## 4. 社区热点

### 高关注度 Issues

**1. [BUG] Web UI 聊天记录过长导致输入卡顿（#3281）**
- 作者：@xpader | 评论：15 | 👍：2 | 创建：2026-07-21 | 更新：2026-09-29
- 链接：https://github.com/sipeed/picoclaw/issues/3281
- **热度分析**：这是今日更新的最活跃 Issue，用户反馈在 Web UI 中当聊天记录较长时，输入框会出现明显延迟。该问题已被 #3347 PR 修复，预计合并后问题解决。

**2. [Feature] 支持 OpenAI 兼容提供商（#3366）**
- 作者：@ItachiSan | 评论：5 | 创建：2026-09-04 | 更新：2026-09-28
- 链接：https://github.com/sipeed/picoclaw/issues/3366
- **热度分析**：用户希望添加自定义 OpenAI 兼容提供商（如 9Router），以支持私有化部署的路由服务。此需求与 #3397（添加 Tsubasa provider）属于同一诉求。

**3. [Security] 安全审计发现关键漏洞（#258）**
- 作者：@lesichkovm | 评论：5 | 👍：1 | 创建：2026-02-16 | 更新：2026-09-28（已关闭）
- 链接：https://github.com/sipeed/picoclaw/issues/258
- **热度分析**：2026-02-16 提交的安全审计报告标记为 **CRITICAL**，指出工具实现层面的关键安全缺陷。该 Issue 已于今日关闭，但修复状态需进一步确认。

**4. [Request] 启用私有漏洞报告（#3405）**
- 作者：@x1F916 | 创建：2026-09-28
- 链接：https://github.com/sipeed/picoclaw/issues/3405
- **热度分析**：开发者希望启用 GitHub 私有漏洞报告功能，但目前仓库未配置 `SECURITY.md` 且私有漏洞报告已禁用。这暗示可能存在未公开的安全问题。

**5. [Notice] 活跃 Fork 及持续维护公告（#3398）**
- 作者：@afjcjsbx | 创建：2026-09-28
- 链接：https://github.com/afjcjsbx/picoclaw
- **热度分析**：社区成员因原仓库似乎缺乏维护，主动创建并维护活跃 Fork。这反映了用户对项目的持续需求和对原仓库维护状态的担忧。

---

## 5. Bug 与稳定性

### 今日报告的 Bug（按严重程度排列）

| 级别 | Issue/PR | 描述 | Fix PR |
|------|----------|------|--------|
| **CRITICAL** | #258 | 安全审计发现关键漏洞（已关闭，需确认修复） | 待验证 |
| **HIGH** | #3404 | 可靠性问题汇总（agent loop、channels manager、config、updater） | #3403, #3402, #3401, #3400 |
| **HIGH** | #3281 | Web UI 卡顿（聊天记录过长） | #3347 |
| **MEDIUM** | #3399 | 32-bit ARM 平台更新错误（安装 arm64 而非 arm） | #3399 |
| **MEDIUM** | #3378 | OAuth token 刷新 scope 硬编码覆盖配置 | #3378 |
| **LOW** | #3405 | 缺少私有漏洞报告机制 | 需启用设置 |

**稳定性评估：**
- 核心模块存在多个已知可靠性问题，x1F916 的 4 个修复 PR 针对性地解决了 agent 路由、channel 重载、配置持久化和更新逻辑的问题。
- 安全相关 Issue #258 已关闭，但修复细节未明确，建议验证实际补丁。
- #3405 指出仓库缺乏安全响应机制，这是一个结构性风险。

---

## 6. 功能请求与路线图信号

### 用户提出的新功能需求

**1. OpenAI 兼容提供商支持（#3366, #3397）**
- #3366：请求添加自定义 OpenAI 兼容提供商（如 9Router）
- #3397：请求将 Tsubasa 添加到 OpenAI 兼容 provider 目录
- **路线图信号**：用户希望扩展 LLM 提供商兼容性，支持私有化部署和特定服务商。当前已有多个 PR 尝试扩展 provider 支持，但尚未合并。

**2. IRCv3 多行消息支持（#3354）**
- 请求支持 IRCv3 `draft/multiline` 协议，使多行消息能完整接收
- **路线图信号**：社区对 IRC 渠道的功能完善有持续需求

**3. Keenable 网页搜索（#3370）**
- 新增 Keenable 作为 `web_search` provider，无需 API key 即可使用
- **路线图信号**：扩展搜索工具生态，降低用户使用门槛

**4. Deltachat 模块重构（#3222）**
- 清理遗留代码、移除过时测试、重命名配置项
- **路线图信号**：技术债务清理，提升代码可维护性

**评估：** 当前 PR 队列中功能性需求占比约 30%（4/10），修复类 PR 占 70%（7/10），反映出项目当前重心在稳定性维护而非功能扩展。

---

## 7. 用户反馈摘要

### 真实用户痛点

1. **Web UI 性能问题（#3281）**
   - 痛点：聊天记录较长时输入框明显卡顿，影响用户体验
   - 场景：长时间使用的会话，历史消息积累较多时
   - 反馈：该问题已获修复（#3347），用户可期待后续版本

2. **OAuth 配置被覆盖（#3378）**
   - 痛点：`RefreshAccessToken` 硬编码 scope，忽略用户在 `OAuthProviderConfig.Scopes` 中的配置
   - 影响：自定义 OAuth 提供商的配置无法生效

3. **异步工具结果路由错误（#3403）**
   - 痛点：`spawn` 异步工具的结果被发送到默认 agent，而非发起会话的 agent
   - 影响：多会话、多 agent 场景下结果混乱

4. **安全审计响应缺失（#258, #3405）**
   - 痛点：2026-02 的安全审计报告已关闭，但未明确修复状态；同时缺乏私有漏洞报告机制
   - 用户情绪：对安全响应透明度表示担忧

5. **仓库维护状态（#3398）**
   - 痛点：原仓库似乎缺乏维护，社区被迫创建 Fork
   - 反馈：用户对原仓库维护状态不满意，但 Fork 行动显示了项目的持续需求

### 用户满意度
- **正面**：社区贡献者积极提交修复 PR，特别是 x1F916 的系统性可靠性修复
- **负面**：仓库维护状态不明确，安全响应机制缺失，部分 PR 因 `[stale]` 被标记而可能被忽视

---

## 8. 待处理积压

### 长期未响应的重要 Issue/PR

| ID | 类型 | 标题 | 创建时间 | 状态 | 风险 |
|----|------|------|----------|------|------|
| #258 | Security | 安全审计（关键漏洞） | 2026-02-16 | 已关闭但未确认修复 | 高 - 安全漏洞未验证 |
| #3378 | fix | OAuth scope 硬编码 | 2026-09-12 | [stale] 待合并 | 中 - 配置问题 |
| #3354 | feat | IRCv3 multiline 支持 | 2026-08-31 | [stale] 待合并 | 低 - 功能增强 |
| #3347 | fix | Web UI 卡顿修复 | 2026-08-27 | 待合并 | 中 - 用户体验 |
| #3222 | refactor | Deltachat 重构 | 2026-07-03 | 待合并 | 低 - 技术债务 |
| #3366 | Feature | OpenAI 兼容提供商 | 2026-09-04 | 待响应 | 中 - 功能需求 |
| #3398 | Notice | 活跃 Fork 公告 | 2026-09-28 | 待响应 | 高 - 社区分裂风险 |

**维护者关注建议：**
1. **紧急**：确认 #258 安全漏洞的实际修复状态，回应用户对安全透明度的担忧
2. **优先**：合并 x1F916 的 4 个可靠性修复 PR（#3400-#3403），这些是当前 main 分支的关键补丁
3. **关注**：回应 #3398 的 Fork 公告，明确原仓库维护计划，避免社区分裂
4. **机制**：启用私有漏洞报告（#3405），建立安全响应流程

---

## 项目健康度评估

| 维度 | 评分 | 说明 |
|------|------|------|
| **活跃度** | ⭐⭐☆ | 社区贡献持续，但维护者响应不明显 |
| **稳定性** | ⭐⭐⭐ | 多个关键 bug 获修复 PR，但尚未合并发布 |
| **安全性** | ⭐⭐☆ | 存在未验证的安全修复，缺乏私有漏洞报告机制 |
| **社区参与** | ⭐⭐⭐⭐ | 多位开发者提交高质量 PR，自发维护 Fork |
| **维护状态** | ⭐⭐☆ | 仓库维护状态不明确，部分 PR 被打上 [stale] |

**综合评估：** PicoClaw 项目目前处于**社区驱动维护阶段**，核心维护者响应不足，但贡献者群体积极。建议维护者尽快回应关键 PR 和安全 Issue，明确仓库维护计划，稳定社区信心。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：** 2026-09-29
**数据来源：** GitHub (agentscope-ai/qwenpaw)

## 1. 今日速览
QwenPaw 项目今日保持高活跃度，24小时内共产生6条 Issue 更新和17条 PR 更新。核心关注点集中在**上下文管理优化**、**多通道稳定性修复**（Telegram/QQ/浏览器）及**控制台体验升级**三个维度。虽然无新版本发布，但多个高质量 Bug 修复 PR 即将合并，尤其是针对“媒体载荷导致会话永久损坏”及“工具结果截断绕过”的修复，显著提升了生产环境的健壮性。社区贡献者参与度极高，首次贡献者占据了今日大部分 PR 增量。

## 2. 版本发布
**无新版本发布。**
当前最新已知版本信息为 `2.2.2b4` (Issue #8011)。

## 3. 项目进展
今日关闭/合并了 4 条 PR，主要推进了控制台体验与核心上下文处理逻辑：

*   **控制台设置与交互统一 (#7956)**: 由 @rayrayraykk 提交，统一了 Console 设置页面的设计语言，包括可复用控件、一致的表面材质、本地化标签及流畅的交互反馈。修复了工作空间选择器溢出及对话切换时的欢迎屏幕闪烁问题，提升了 UI/UX 一致性。
*   **历史媒体上下文回收机制修复 (#7965)**: 由 @Leirunlin 提交，旨在解决 Issue #7853 中的核心问题。通过调整 Scroll 策略（降低图片折叠阈值）并修正思考token计数忽略逻辑，使长图片会话和工具循环中的旧内容可被正确回收，防止上下文窗口过早耗尽。
*   **多标签终端功能合并 (#7861)**: 由 @zhijianma 提交，在共享聊天和文件工作区下方增加了懒加载的 xterm 终端，支持独立标签页、会话作用域的工作目录及右键关闭等操作，增强了 Agent 的终端交互能力。
*   **资产导入失败处理优化 (#7953)**: 由 @Luohh5 提交，确保单个资产导入失败时保留具体的错误信息，而非静默吞没，提升了可维护性。

**整体评估：** 项目正从“功能添加”阶段向“稳定性加固”与“体验精细化”阶段过渡，今日合并的 PR 直接针对用户痛点（上下文溢出、UI 异常），技术债务有所清理。

## 4. 社区热点
以下 Issue/PR 因关联性强、问题严重或贡献活跃而成为今日热点：

*   **[Bug] ToolResultPruner 跳过媒体块导致上下文膨胀 (#7853)**
    *   **链接:** https://github.com/agentscope-ai/QwenPaw/issues/7853
    *   **分析:** 这是一个深层次的架构缺陷。`view_image` 产生的 base64 数据因类型不为 "text" 而被裁剪器忽略，导致上下文无限累积直至 OOM 或超出限制。该 Issue 已引发社区广泛讨论（8条评论），且已有对应修复 PR #7965 和 #8010 跟进，是近期最关键的稳定性议题。
*   **[Feature] durable paginated transcript history (#7931)**
    *   **链接:** https://github.com/agentscope-ai/QwenPaw/pull/7931
    *   **分析:** @zhijianma 提出的聊天历史持久化方案，引入 SQLite 存储和稳定游标，旨在解决长会话数据丢失和页面刷新后状态不同步问题。该 PR 仍在开放中，但因其对用户体验的重大提升，预计将成为下一版本的核心功能。
*   **[Bug] Telegram HTML formatter 处理多语言代码块异常 (#8011)**
    *   **链接:** https://github.com/agentscope-ai/QwenPaw/issues/8011
    *   **分析:** 正则表达式无法正确处理 C++/Objective-C 等带空格或嵌套的代码块，导致 Telegram 频道消息渲染错误。首次贡献者 @huiq777 已提交 PR #8012 进行修复，反映了多渠道支持中格式解析的通用挑战。

## 5. Bug 与稳定性
今日报告/活跃的 Bug 按严重程度排列如下：

1.  **会话永久损坏 (Critical): Oversized image stored in context makes a session permanently unusable (#8009)**
    *   **描述:** 当上传超过模型提供商限制的图像时，被拒绝的媒体载荷仍保留在上下文缓存中，导致后续所有请求（包括纯文本）均返回 400 错误，会话无法恢复。
    *   **状态:** 已有 Fix PR #8010 (@sdxwmlyl)，实现了从媒体载荷拒绝中恢复的机制。
2.  **上下文裁剪绕过 (High): ToolResultPruner 跳过 media 块 (#7853)**
    *   **描述:** 工具结果裁剪器仅处理 text 类型，导致 base64 媒体数据无法被裁剪，长期会话必然触发上下文溢出。
    *   **状态:** 已有 Fix PR #7965 和 #8010 跟进。
3.  **输出截断失效 (High): literal markers bypassing output truncation (#7871)**
    *   **描述:** 输出中包含 `<<<TRUNCATED>>>` 字面量时，即使内容超长也能绕过截断逻辑，可能导致敏感信息泄露或上下文污染。
    *   **状态:** 已有 Fix PR #7871 (@niceIrene)。
4.  **任务计数不一致 (Medium): TaskTracker zombie entries inflate running_task_count (#7991)**
    *   **描述:** Dashboard 显示的运行任务数与 API 实际返回不符，存在僵尸条目。
    *   **状态:** 已有 Fix PR #8007 (@BeiMu-new)，修复了异步任务注册时序问题。
5.  **QQ 网关事件重复处理 (Medium): replayed gateway events not dropped (#8006)**
    *   **描述:** QQ 会话恢复时重放的事件未被去重，导致非幂等命令（如写/删文件）被双重执行。
    *   **状态:** 已有 Fix PR #8006 (@BeiMu-new)。
6.  **Windows Office COM 安全风险 (Medium): auto mode with sandbox off allows inline Office COM Quit() (#8002)**
    *   **描述:** 在 Windows 自动批准模式且沙箱关闭时，Agent 可执行内联 COM 命令关闭用户 PowerPoint，存在本地操作风险。
    *   **状态:** 已报告，暂无合并的 Fix PR。
7.  **浏览器 Grep 扫描二进制文件 (Low): grep search reads binary/WAL files (#7988)**
    *   **描述:** 全局搜索可能读取 SQLite WAL 文件或二进制文件，将不可读字节带入上下文。
    *   **状态:** 已有 Fix PR #7988。

## 6. 功能请求与路线图信号
*   **Thinking 控件显示修复 (#7990):** 用户请求为 Aliyun Token Plan 模型声明 `thinking_param_style`，以在 Console 中显示“思考模式/推理强度”控件。这反映了用户对特定模型高级功能可视化的强烈需求，预计将在后续模型目录更新中纳入。
*   **字体缩放统一 (#8005):** 新增控制台字体大小设置（12px-20px）及语义化 token，提升了无障碍访问能力和个性化体验，符合产品易用性演进方向。
*   **Playwright 默认参数排除支持 (#7987):** 允许通过配置排除 Playwright 的默认启动参数，为高级用户提供了更大的浏览器自动化控制权。
*   **CLI 启动性能优化 (#8004):** 通过懒加载 `init_cmd` 减少启动时的导入耗时（约5秒），是对核心 CLI 体验的重要优化，可能作为独立优化点纳入近期版本。

## 7. 用户反馈摘要
*   **痛点集中：** 用户最关心的问题是**会话稳定性**。多次出现因单一异常输入（大图片、特定格式文本）导致整个会话“死亡”的情况，用户对“不可逆错误”容忍度低。
*   **多渠道体验：** Telegram 和 QQ 通道的格式渲染（代码块、表格滚动）和事件处理（重复消息）问题频发，表明多渠道适配层的测试覆盖仍有不足。
*   **性能敏感：** 用户对 CLI 启动速度、上下文管理效率（避免无用数据累积）以及长时间运行的任务追踪准确性有明确诉求。
*   **功能可见性：** 部分高级功能（如某些模型的 Thinking 模式）因配置缺失而未对用户可见，造成了使用障碍。

## 8. 待处理积压
*   **Windows Office COM 安全风险 (#8002):** 该 Issue 涉及本地应用安全边界，且在 `auto` 模式下存在真实风险，建议维护者优先评估并制定缓解方案或加强默认安全策略。
*   **Durable Transcript History (#7931):** 虽然仍在 Open 状态，但该 PR 对数据持久化和用户体验至关重要，且涉及架构变更，需安排时间进行详细审查和测试。
*   **长期未响应的 Feature Request:** Issue #7990 关于模型目录声明的请求，若确认上游 API 支持，应尽快更新 `model_catalog.json` 以满足用户期望。

---
**分析师备注：** QwenPaw 项目健康度良好，社区贡献活跃，尤其是首次贡献者比例高，表明项目对新人友好。当前主要挑战在于复杂上下文生命周期管理和多渠道稳定性。建议重点关注 #7853 和 #8009 类问题的系统性修复，以保障大规模用户场景下的会话可靠性。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目日报 | 2026-09-29

## 1. 今日速览
hermes-agent 今日继续保持高强度开发节奏，24小时内累计处理 **500 条 Issue** 与 **500 条 PR**，其中新开/活跃 Issue 288 条、已关闭 212 条；待合并 PR 398 条、已合并/关闭 102 条。无新版本发布。整体呈现"高吞吐维护期"特征：社区反馈集中爆发（尤其是 Desktop 会话状态与插件加载问题），核心维护者密集响应修复 PR，项目健康度良好但稳定性压力较大。

---

## 2. 版本发布
**无新版本发布。**

---

## 3. 项目进展
今日合并/关闭的 PR 主要聚焦于配置对齐、日志降噪与边界修复，推动项目向更稳定的日常使用体验迈进：

- **#127126** — 将插件 per-provider 注册日志降级为 DEBUG，减少启动噪音（`hermes_cli/plugins.py:379`）
- **#127114** — LSP 追踪文档数量强制上限 `MAX_TRACKED_FILES=64`，防止诊断服务内存膨胀
- **#127169** — 修复多 profile 场景下 `auto_tts` 配置跨 profile 泄漏问题
- **#127128** — 修复 WhatsApp 平台在 SIGTERM 关关机时因信号竞态导致的 gateway 崩溃循环

**整体判断：** 今日合并的 PR 以"止血型"修复为主，重点缓解长期积累的稳定性隐患，为后续功能迭代打下基础。

---

## 4. 社区热点
### 🔥 Issue #122222 — Cron 外部 Worker 依赖导入失败
- **链接:** https://github.com/NousResearch/hermes-agent/issues/122222
- **评论:** 31 | 👍: 3 | 状态: 已关闭
- **分析:** self-managed 安装下所有 cron 定时任务在启动前即失败，根因是 `PYTHONPATH` 被 sanitize 为仅含仓库根目录，导致第三方依赖无法导入。该 Issue 关注度最高，反映企业/高级用户对自托管场景稳定性的强烈诉求。

### 🔥 Issue #123801 — macOS Desktop 重复渲染助手回复
- **链接:** https://github.com/NousResearch/hermes-agent/issues/123801
- **评论:** 14 | 状态: 开放
- **分析:** 与 #68321、#122167 构成同一类"会话状态投影"问题家族，表明 Desktop 端消息同步机制存在系统性缺陷，需架构级修复而非补丁。

### 🔥 Issue #10771 — 自动记忆整合（Auto Dream）
- **链接:** https://github.com/NousResearch/hermes-agent/issues/10771
- **评论:** 12 | 👍: 6 | 状态: 开放
- **分析:** 用户期望引入类似 Claude Code "Auto Dream" 的记忆自动清理/去重机制，是高赞功能请求，反映长期运行的 agent 面临记忆膨胀痛点。

### 🔥 Issue #37352 — `hermes skills lint` 工具请求
- **链接:** https://github.com/NousResearch/hermes-agent/issues/37352
- **评论:** 12 | 状态: 开放
- **分析:** Skill 作者缺乏校验工具，导致内置 skill 集合中存在 8 个断裂引用（#37338）。社区对开发者体验工具链有明确需求。

---

## 5. Bug 与稳定性
### P1 级别
| Issue | 描述 | 状态 | Fix PR |
|-------|------|------|--------|
| [#122222](https://github.com/NousResearch/hermes-agent/issues/122222) | Cron worker 无法导入依赖，所有定时任务失败 | ✅ 已关闭 | — |
| [#122490](https://github.com/NousResearch/hermes-agent/issues/122490) | Bot-to-bot DM 投递继承空 PYTHONPATH，ruamel 模块缺失 | 🔓 开放 | 暂无 |

### P2 级别
| Issue | 描述 | 状态 | Fix PR |
|-------|------|------|--------|
| [#123801](https://github.com/NousResearch/hermes-agent/issues/123801) | macOS Desktop 重复渲染助手回复 | 🔓 开放 | 关联 PR #119085（待合并） |
| [#68321](https://github.com/NousResearch/hermes-agent/issues/68321) | Desktop 切换会话后助手消息全部消失 | 🔓 开放 | 同上 |
| [#122167](https://github.com/NousResearch/hermes-agent/issues/122167) | 消息消失 + 助手回复重复，服务端投影问题 | 🔓 开放 | 同上 |
| [#94778](https://github.com/NousResearch/hermes-agent/issues/94778) | 多后端共享 interrupted-turn marker 导致误判 | ✅ 已关闭 | — |
| [#66829](https://github.com/NousResearch/hermes-agent/issues/66829) | Desktop 总是通过辅助视觉模型预处理图片 | ✅ 已关闭 | — |
| [#122485](https://github.com/NousResearch/hermes-agent/issues/122485) | Linux desktop entry Exec 指向无法服务的 launcher | ✅ 已关闭 | — |
| [#122438](https://github.com/NousResearch/hermes-agent/issues/122438) | Linux 桌面启动器自我修复 Exec 指向无效 venv | ✅ 已关闭 | — |
| [#123926](https://github.com/NousResearch/hermes-agent/issues/123926) | 插件启动时随机静默丢失（dict 迭代中修改） | 🔓 开放 | 暂无 |
| [#125375](https://github.com/NousResearch/hermes-agent/issues/125375) | PM venv 下 `hermes gateway start` 写入无法启动的 launchd service | 🔓 开放 | 暂无 |
| [#75422](https://github.com/NousResearch/hermes-agent/issues/75422) | macOS 应用内更新后 Gatekeeper 拒绝重启 | ✅ 已关闭 | — |

### 关键趋势
- **会话状态问题**（#123801, #68321, #122167）形成集群，表明 Desktop 端消息同步层存在系统性风险，建议纳入下一版本重点重构。
- **插件加载稳定性**（#123926, #122349）持续出现问题，与 Python 环境管理策略强相关。

---

## 6. 功能请求与路线图信号
| 请求 | Issue | 关联 PR | 纳入可能性 |
|------|-------|---------|-----------|
| 德语本地化 | [#51217](https://github.com/NousResearch/hermes-agent/issues/51217) | — | 低（已关闭，可能已搁置） |
| 自动记忆整合 | [#10771](https://github.com/NousResearch/hermes-agent/issues/10771) | — | 中（高赞，符合长期 agent 需求） |
| Skills lint 工具 | [#37352](https://github.com/NousResearch/hermes-agent/issues/37352) | — | 中高（开发者体验刚需） |
| 会话跨项目移动 | [#54204](https://github.com/NousResearch/hermes-agent/issues/54204) | — | 中（桌面端工作流优化） |
| 跨平台会话接续 | [#8366](https://github.com/NousResearch/hermes-agent/issues/8366), [#49730](https://github.com/NousResearch/hermes-agent/issues/49730) | — | 高（多次独立请求，核心价值主张） |
| 语音唤醒词 | [#49383](https://github.com/NousResearch/hermes-agent/issues/49383) | — | 低（标记为 duplicate） |

---

## 7. 用户反馈摘要
### 痛点
1. **Desktop 会话状态不可靠：** 多条独立报告指向同一类问题——消息丢失、重复渲染、跨 session 混淆，严重影响用户体验信任。
2. **自托管安装脆弱：** cron worker、gateway service、desktop launcher 等环节在 self-managed 场景下频繁出现环境隔离问题。
3. **插件加载随机失败：** "不同随机子集插件启动时静默丢失"，排查困难，用户感到无力。
4. **npm 全局污染争议：** Issue #18357 用户强烈批评安装脚本将 npm 劫持至 `~/.hermes/node`，影响其他软件，情绪激烈。

### 满意点
- 维护者响应迅速，高评论数 Issue 多有实质进展
- PR 合并节奏稳定，今日 102 条已关闭/合并

---

## 8. 待处理积压
| Issue/PR | 描述 | 久暂 | 建议关注 |
|----------|------|------|---------|
| [#122490](https://github.com/NousResearch/hermes-agent/issues/122490) | Bot-to-bot DM 依赖导入失败 | 4 天未解决 | 高优先级 |
| [#123926](https://github.com/NousResearch/hermes-agent/issues/123926) | 插件随机丢失 | 3 天未解决 | 高优先级 |
| [#125375](https://github.com/NousResearch/hermes-agent/issues/125375) | gateway start 写入无效 launchd | 2 天未解决 | 中优先级 |
| [#101160](https://github.com/NousResearch/hermes-agent/issues/101160) | Buzz 中继空闲重连误判 | 27 天未解决 | 中优先级 |
| [#103481](https://github.com/NousResearch/hermes-agent/issues/103481) | 跨 session 缓存架构反馈 | 24 天未解决 | 长期规划 |
| [#127116](https://github.com/NousResearch/hermes-agent/pull/127116) | PDF 预览突破 16MiB IPC 限制 | 当日提出 | 待评审 |
| [#127120](https://github.com/NousResearch/hermes-agent/pull/127120) | session guard 不可用时 fail closed | 当日提出 | 待评审 |
| [#127125](https://github.com/NousResearch/hermes-agent/pull/127125) | 空白 internal turn 不发送空 user message | 当日提出 | 待评审 |

---

**报告生成时间：** 2026-09-29  
**数据源：** GitHub API (github.com/NousResearch/hermes-agent)  
**分析师：** Agnes (Sapiens AI)

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期**：2026-09-29
**数据周期**：过去 24 小时 (2026-09-28 10:00 - 2026-09-29 10:00 UTC+8 估算)
**分析视角**：AI 智能体与个人 AI 助手开源项目

---

## 1. 今日速览

AstrBot 今日保持**高活跃度**，过去 24 小时内产生 15 个 GitHub 活动事件（5 Issues + 10 PRs）。整体项目状态健康，**无新版本发布**，但核心稳定性修复密集推进。值得注意的是，针对“Provider 热重载导致 Rerank 失效”和“后台任务异常处理缺失”两个深层架构 Bug，社区已主动提交修复 PR（#10263, #10260），显示核心贡献者响应迅速。同时，新功能方面持续扩展 Provider 生态（Requesty、VoxCPM TTS）及 OAuth 插件化能力。

**活跃度评估**：🟢 高（PR 合并节奏正常，Issue 讨论聚焦于稳定性与功能增强）

---

## 2. 版本发布

*   **无新版本发布**
*   当前最新已知版本：v4.28.1（从 Issue 日志中推断）

---

## 3. 项目进展

### 已关闭/合并 PR
- **#10210 [CLOSED] feat: add persistent image references and on-demand image review**
  - **作者**：@amamiyakazuki
  - **链接**：https://github.com/AstrBotDevs/AstrBot/pull/10210
  - **进展说明**：重构了对话历史中的图片处理方式。将 Base64 图片从会话历史中分离，转为持久化文件引用，仅在需要时加载。此举显著降低了长对话历史的序列化、压缩负担，并防止后续文本轮次重复回放旧图片负载。**这是一个重要的性能优化与内存管理改进**，直接回应了长期对话中的资源膨胀问题。

### 开放中重点 PR
- **#10263 [OPEN] fix: rebuild closed HTTP session in vllm rerank provider**
  - **作者**：@JosephTian876
  - **链接**：https://github.com/AstrBotDevs/AstrBot/pull/10263
  - **进展说明**：修复 Provider 热重载后 `aiohttp.ClientSession` 未重建导致的 `AssertionError` 问题，解决知识库 Rerank 静默失效的严重 Bug。
- **#10260 [OPEN] fix(agent): 修复后台任务失败日志缺失和摘要误报完成**
  - **作者**：@Cuptu
  - **链接**：https://github.com/AstrBotDevs/AstrBot/pull/10260
  - **进展说明**：完善 Agent 后台任务异常处理逻辑，确保失败状态正确传递并记录日志，避免用户误认为任务成功完成。
- **#10266 [OPEN] feat(provider): support plugin-managed OAuth PKCE login**
  - **作者**：@LIghtJUNction
  - **链接**：https://github.com/AstrBotDevs/AstrBot/pull/10266
  - **进展说明**：引入插件化 OAuth PKCE 登录支持，允许插件自行管理 AI 供应商认证，无需修改 AstrBot 核心代码，提升了平台扩展性。

---

## 4. 社区热点

### 最活跃 Issue
- **#10235 [OPEN] [enhancement] [Feature] 增加模型调用失败重试**
  - **作者**：@Mcchen1008
  - **评论**：11 | 👍：1
  - **链接**：https://github.com/AstrBotDevs/AstrBot/issues/10235
  - **热点分析**：这是今日评论数最多的 Issue，反映用户对 **LLM 调用稳定性** 的高度关注。在自动化任务和大型任务场景中，偶发的模型服务抖动导致任务中断是主要痛点。用户期望增加内置重试机制以提升鲁棒性。**此需求与当前多平台 LLM 服务不稳定性趋势一致，可能被纳入后续版本规划**。

### 其他高关注度 Issue
- **#10240 [OPEN] [Bug] Telegram 群聊中发给其他机器人的命令会误唤醒 AstrBot**
  - **作者**：@fzf404
  - **链接**：https://github.com/AstrBotDevs/AstrBot/issues/10240
  - **分析**：Telegram 适配器命令过滤逻辑缺陷，导致共享群聊环境下的误唤醒问题，影响多机器人共存体验。

---

## 5. Bug 与稳定性

| 严重程度 | Issue ID | 标题 | 描述 | 关联 PR |
|----------|----------|------|------|---------|
| 🔴 高 | #9936 | 上下文压缩/裁剪导致对话历史丢失与对话失忆 | 多版本、多部署方式下复现，长对话中硬信息（URL、坐标等）被概括掉或永久截断，无报错日志。 | 暂无 |
| 🔴 高 | #10264 | 图片静默丢弃：插件产出的相对 URL 被误判为本地路径 | 模型收不到图片，日志仅 WARN，因相对 URL 被 `resolve()` 为磁盘路径导致 `FileNotFoundError`。 | 暂无 |
| 🟠 中 | #10262 | Provider 热重载后知识库 Rerank 永久失效，且日志错误信息为空 | `AssertionError` 导致静默失败，已提交修复 PR #10263。 | #10263 |
| 🟠 中 | #10240 | Telegram 命令误唤醒 | 多机器人场景下命令过滤逻辑缺陷。 | 暂无 |

**稳定性总结**：今日重点暴露了**长对话记忆管理**和**图片路径处理**两个系统性问题，以及**Provider 热重载机制**的健壮性缺陷。关联 PR #10263 正在修复其中一项，另一项（#10264）尚未有修复进展。

---

## 6. 功能请求与路线图信号

### 明确的新功能请求
- **#10235 模型调用失败重试机制**：用户需求强烈，评论活跃，符合“提升自动化任务可靠性”的方向，**纳入下一版本可能性高**。
- **#10267 feat(provider): add Requesty chat completion provider**
  - **作者**：@Thibaultjaigu
  - **链接**：https://github.com/AstrBotDevs/AstrBot/pull/10267
  - **信号**：继续扩展 OpenAI 兼容的 LLM 网关支持，降低用户配置复杂度。

### 插件化与扩展性增强
- **#10266 OAuth PKCE 插件化管理**：允许插件自主实现认证流程，**强化平台开放性和插件生态**。
- **#10261 feat: add ModelBest VoxCPM TTS provider**
  - **作者**：@lottshin
  - **链接**：https://github.com/AstrBotDevs/AstrBot/pull/10261
  - **信号**：内置更多 TTS 提供商，丰富语音交互能力。

### 潜在路线图方向
- **长对话记忆优化**：Issue #9936 揭示的上下文压缩问题若得不到解决，将制约 AstrBot 在长程任务中的应用，**可能需要架构级调整**。
- **多机器人协同体验**：Telegram 误唤醒问题 (#10240) 反映了对复杂群组场景支持的不足。

---

## 7. 用户反馈摘要

### 真实痛点
1.  **任务中断恐惧**：用户在进行自动化或大型任务时，因 LLM 调用偶发失败导致任务停止，造成工作流断裂和体验不佳（#10235）。
2.  **记忆不可靠**：长对话后出现“失忆”，关键信息（URL、决策理由等）无声无息丢失，且无法恢复，严重损害用户对系统可靠性的信任（#9936）。
3.  **媒体处理陷阱**：插件生成的相对 URL 图片被错误解析，导致图片静默丢失，排查困难（#10264）。
4.  **多机器人共存干扰**：在 Telegram 群聊中与其它机器人共同存在时，命令解析逻辑不够精确，导致误响应（#10240）。

### 满意点
- 对 **Provider 生态扩展** 的持续欢迎（Requesty, VoxCPM TTS）。
- 对 **插件化架构** 的支持表示认可（OAuth PKCE 插件化管理）。

---

## 8. 待处理积压

### 长期未响应的重要 Issue
- **#9936 上下文压缩/裁剪导致对话历史丢失与对话失忆**
  - **创建时间**：2026-09-03
  - **评论数**：2
  - **链接**：https://github.com/AstrBotDevs/AstrBot/issues/9936
  - **提醒**：此 Issue 涉及核心记忆机制的稳定性，且跨版本、跨平台复现，影响面广。**建议维护者优先评估并分配开发资源**，可能需要深入重构上下文管理模块。

- **#10264 图片静默丢弃：插件产出的相对 URL 被误判为本地路径**
  - **创建时间**：2026-09-28
  - **评论数**：1
  - **链接**：https://github.com/AstrBotDevs/AstrBot/issues/10264
  - **提醒**：虽然为新报告，但此类路径解析错误易引发用户困惑，且影响图片功能正常使用，**建议尽快确认并修复**。

- **#10240 Telegram 命令误唤醒**
  - **创建时间**：2026-09-26
  - **评论数**：4
  - **链接**：https://github.com/AstrBotDevs/AstrBot/issues/10240
  - **提醒**：影响多机器人部署场景的用户体验，**建议在适配层优化命令过滤逻辑**。

---
**报告生成时间**：2026-09-29
**数据来源**：GitHub API (github.com/AstrBotDevs/AstrBot)

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

**DeepSeek Harness 项目动态日报 (2026-09-29)**

**1. 今日速览**
今日 DeepSeek Harness 发布首个候选版本 **v0.2.0-rc.1**，标志着 0.2.0 系列开发进入关键阶段，主要聚焦于体验优化与稳定性修复。社区保持高活跃度，过去24小时产生 156 条 Discussions，其中多个热门话题集中在 Windows 权限管理、Linux 环境适配及 UI 交互细节上。由于该项目未启用 GitHub Issues/PR，技术实现与修复直接通过 Releases 落地，本次发版解决了大量已知 Bug 并引入新的自动化插件机制。整体项目健康度良好，社区对核心功能的反馈积极，但部分环境兼容性问题（如 NixOS、GPU 访问）仍需关注。

**2. 版本发布：v0.2.0-rc.1**
🔗 [查看 Release 详情](https://github.com/deepseek-ai/deepseek-harness/releases)

作为 `0.2.0` 系列的首个候选版本，本次更新汇总了自 `v0.1.7-rc.2` 以来的主要变更：

*   **🎨 体验优化：**
    *   优化了对话实时动画、用时信息及间距显示 ([@yixiangihsiang, @imccyu](https://github.com/deepseek-ai/deepseek-harness/discussions/7443))。
    *   提升了图片失效后自动重传并继续请求的可靠性 ([@CreatixChu](https://github.com/deepseek-ai/deepseek-harness/discussions/7443))。
    *   完善了桌面端更新提示、插件管理界面及安装引导 ([@liyao, @ZiyaZhang](https://github.com/deepseek-ai/deepseek-harness/discussions/7443))。
    *   改善深色主题下的色彩区分度及 Office/PDF 预览清晰度 ([@Yifffan, @yudshj](https://github.com/deepseek-ai/deepseek-harness/discussions/7443))。
    *   使用 DeepSeek 账号模型的会话无需额外 API Key 即可进行网页搜索 ([@lsdsjy](https://github.com/deepseek-ai/deepseek-harness/discussions/7443))。

*   **🐛 问题修复：**
    *   **Windows 沙箱权限：** 新增权限诊断技能，支持在限定目录内进行带备份、可恢复的权限修复，解决“无法验证发布者”及操作无响应问题 ([@Elevator14B, @yudshj](https://github.com/deepseek-ai/deepseek-harness/discussions/7735))。
    *   **核心逻辑：** 修复工具调度异常后对话无法继续的问题，防止盲目重试未知结果的操作 ([@tianyicui](https://github.com/deepseek-ai/deepseek-harness/discussions/6987))。
    *   **跨平台兼容：** 修复 macOS 录音权限缺失、Safari 刷新页面后无法恢复回复、以及部分 Linux 环境 npm 安装失败的问题 ([@LegGasai, @grllll, @turtle2099](https://github.com/deepseek-ai/deepseek-harness/discussions/2983))。
    *   **UI/交互：** 修复桌面端弹窗避让标题栏问题，改善小窗口及全屏切换时的遮挡 ([@yudshj](https://github.com/deepseek-ai/deepseek-harness/discussions/7443))。

*   **⚠️ 破坏性变更/其他：**
    *   **自动化任务插件化：** 自动化任务改由可选插件包提供，用户需自行安装相关插件以获得旧版默认行为 ([@Chinesezjc, @ZiyaZhang](https://github.com/deepseek-ai/deepseek-harness/discussions/4592))。
    *   **工作过程展示：** 调整了不同初始化路径下的默认展示值 ([@imccyu](https://github.com/deepseek-ai/deepseek-harness/discussions/7443))。

**3. 项目进展**
由于该项目未启用标准 GitHub PR 流程，上述 **v0.2.0-rc.1** 即为今日合并上线的核心内容。
*   **架构演进：** 将自动化任务从核心剥离为插件，体现了“核心精简、能力扩展”的模块化趋势。
*   **安全加固：** 重点投入在 Windows 沙箱权限诊断与修复机制上，旨在降低用户因权限不足导致的卡顿或报错，提升企业级场景下的可用性。
*   **稳定性提升：** 针对工具调度异常和会话持久化迁移（subagent descriptor version）进行了底层逻辑修复，减少了长会话运行中的崩溃风险。

**4. 社区热点**
根据过去 24 小时讨论热度，以下为最活跃的几个方向：

*   **[Q&A] 网络暴露安全问题：** [#76](https://github.com/deepseek-ai/deepseek-harness/discussions/76)
    *   **状态：** OPEN (33 评论)
    *   **分析：** 用户尝试使用 `--host 0.0.0.0` 启动 Web 服务，系统出于安全考虑拒绝并提示风险。该讨论长期存在，表明远程协作场景需求强烈，但官方坚持安全第一策略，建议用户在本地开发时仅绑定 `127.0.0.1`，生产环境通过反向代理实现。
*   **[General] 0.17.*-alpha UI 体验吐槽：** [#7443](https://github.com/deepseek-ai/deepseek-harness/discussions/7443)
    *   **状态：** OPEN (24 评论)
    *   **分析：** 用户集中反馈侧栏动画不同步、图标风格突变、深度求索（Deep Diving）视觉回归等 UI 细节问题。尽管 v0.2.0-rc.1 已包含多项 UI 优化，但用户对“失去独特风格”的抱怨仍存在，需关注后续版本是否在视觉一致性上做更多打磨。
*   **[Q&A] 4.1 模型 Transport 失败：** [#6987](https://github.com/deepseek-ai/deepseek-harness/discussions/6987)
    *   **状态：** OPEN (8 评论)
    *   **分析：** 部分用户报告升级 DeepSeek 4.1 后频繁出现 "Messages transport failed"。v0.2.0-rc.1 中修复的“工具调度异常”可能与此相关，用户需升级至最新 RC 版本以验证是否解决。

**5. Bug 与稳定性**
按严重程度排列，以下 Bug 在 v0.2.0-rc.1 中已修复或需注意：

| 严重程度 | 问题描述 | 状态/链接 | 备注 |
| :--- | :--- | :--- | :--- |
| **高** | **Windows 沙箱权限导致文件操作失败** | ✅ 已修复 ([#7735](https://github.com/deepseek-ai/deepseek-harness/discussions/7735)) | v0.2.0-rc.1 引入权限诊断技能，支持备份式修复。 |
| **高** | **Session Search 在子代理场景下崩溃** | ⚠️ 待确认 ([#7995](https://github.com/deepseek-ai/deepseek-harness/discussions/7995)) | v0→v1 迁移脚本对 `subagent/descriptor` 版本校验过严，可能导致含子代理的旧会话无法搜索。 |
| **中** | **NixOS 环境 HMR 服务启动失败** | ❌ 未修复 ([#690](https://github.com/deepseek-ai/deepseek-harness/discussions/690)) | `node-addon-require-builtin` 在 Nix 编译的 Node 上探测失败，影响开发者在 NixOS 上的热重载体验。 |
| **中** | **Linux 无 GPU 访问权限** | ❌ 未修复 ([#2983](https://github.com/deepseek-ai/deepseek-harness/discussions/2983)) | 沙箱未映射 `/dev/dri`，导致本地模型推理或加速场景受限。 |
| **低** | **Edge 浏览器文件预览失效** | ⚠️ 部分修复 ([#6437](https://github.com/deepseek-ai/deepseek-harness/discussions/6437)) | 上游 `protocolOf` 依赖 `new URL().hostname` 在 Edge 129 下失效，v0.2.0-rc.1 改善了 PDF 预览，但需验证是否彻底解决 Edge 兼容性问题。 |

**6. 功能请求与路线图信号**

*   **插件生态多样化：**
    *   **[Show Your Plugins] dsh-rewind：** [#4592](https://github.com/deepseek-ai/deepseek-harness/discussions/4592) 社区开发了类似 Claude Code `/rewind` 的原地回退插件，获得较高关注。这表明用户对**细粒度会话控制**需求强烈，未来官方可能会考虑将此语义整合进核心或推荐该插件。
    *   **[Show Your Plugins] dsh-personal-center：** [#3595](https://github.com/deepseek-ai/deepseek-harness/discussions/3595) 提供统计、成本估算及个性化指令功能。鉴于自动化任务已插件化，**个人化中心**功能有可能在 0.2.0 正式版中作为官方精选插件推出。
    *   **[Show Your Plugins] VS Code/IntelliJ 集成：** [#5275](https://github.com/deepseek-ai/deepseek-harness/discussions/5275) 第三方编辑器集成插件下载量超 5.8K，表明 IDE 集成是重要使用场景，官方可能会关注 Laya/JEV 等新编辑器支持的兼容性。

*   **Linux 支持呼声：**
    *   [#8107](https://github.com/deepseek-ai/deepseek-harness/discussions/8107) 用户抱怨 Linux 支持被遗忘。虽然 v0.2.0-rc.1 修复了部分 Linux npm 安装问题，但 GPU 访问和原生体验仍有差距。路线图需明确 Linux 桌面端的后续计划。

**7. 用户反馈摘要**

*   **满意点：**
    *   对话流畅性提升，动画与状态显示更直观。
    *   Windows 沙箱权限问题的诊断工具被认为非常实用，降低了排障门槛。
    *   使用 DeepSeek 账号直接搜索网页免去了配置 API Key 的麻烦。

*   **痛点/不满意：**
    *   **UI 一致性：** 部分用户认为近期 UI 改动（图标、下划线、侧栏动画）破坏了原有的视觉风格，显得“怪异”或缺乏灵魂。
    *   **环境适配：** 对 NixOS、特定浏览器（Edge/Safari）及无头 Linux 服务器的支持不够完善。
    *   **网络限制：** 无法直接监听 `0.0.0.0` 限制了局域网内的远程开发场景，用户希望有更安全的远程访问方案（如 SSH 隧道指引或 Token 认证）。

**8. 待处理积压**

*   **#76 [Q&A] 还没法--host 0.0.0.0启动啊** ([#76](https://github.com/deepseek-ai/deepseek-harness/discussions/76))
    *   **风险：** 长期 OPEN 且评论数最高 (33)。虽然这是安全策略导致，但缺乏官方明确的“远程开发最佳实践”文档，容易持续消耗用户精力。建议维护者发布一份关于远程部署 DSH Web 版的官方指南。
*   **#690 [General] NixOS HMR 失败** ([#690](https://github.com/deepseek-ai/deepseek-harness/discussions/690))
    *   **风险：** NixOS 用户群虽小众但粘性极高，HMR 失败直接阻断开发流程。若 0.2.0 正式版不修复，可能导致该群体流失。
*   **#7995 [Bug] session search fails on subagent migration** ([#7995](https://github.com/deepseek-ai/deepseek-harness/discussions/7995))
    *   **风险：** 涉及数据迁移逻辑错误，可能导致用户历史数据丢失或不可用。由于发生在 v0.2.0-rc.1 发布的同一时期，需确认此 Bug 是否已在 RC1 中修复，若未修复则必须在正式版前解决。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*