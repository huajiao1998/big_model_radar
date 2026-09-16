# OpenClaw 生态日报 2026-09-17

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-16 23:57 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-09-17

---

## 1. 今日速览

OpenClaw 过去 24 小时处于**高活跃度、高压力**状态：共 500 条 Issue 更新（新开/活跃 325，已关闭 175），500 条 PR 更新（待合并 283，已合并/关闭 217）。整体健康度**偏弱**——多个 P0 级稳定性问题集中爆发，包括 Gateway 内存泄漏（RSS 从 350MB 飙升至 15.5GB）、子进程泄漏、更新失败等。暂无新版本发布。社区反馈显示用户对 2026.9.3/9.4 版本的更新可靠性和 Gateway 性能退化明显焦虑，需维护者优先处理稳定性修复。

---

## 2. 版本发布

**无新版本发布。**

上一个已知版本为 **2026.9.4**，但更新和迁移可靠性问题频发（见 #145252、#148681、#144739）。建议用户在当前稳定性问题未解决前暂缓升级。

---

## 3. 项目进展

### 重要合并/关闭 PR

| PR | 内容 | 影响 |
|----|------|------|
| [#150344](https://github.com/openclaw/openclaw/pull/150344) | feat(node-host): 支持原生 session 和 policy 所有权 | 为 macOS 原生应用提供 Swift/Rust 接口，复用共享 Rust Gateway 客户端 |
| [#150389](https://github.com/openclaw/openclaw/pull/150389) | refactor(sessions): 将 Goal 状态事件移至共享 worker | 减少主机侧重复写入，优化 session 状态持久化路径 |
| [#150364](https://github.com/openclaw/openclaw/pull/150364) | fix(mcp): 停止未使用服务器跨 session 累积 | 解决 #142965，防止被策略拒绝的 MCP 服务器残留 |
| [#149913](https://github.com/openclaw/openclaw/pull/149913) | fix(update): 完成旧版 updater 的延迟迁移 | 修复 #145043，恢复 2026.9.2 及更早版本的 Doctor 迁移行为 |
| [#144005](https://github.com/openclaw/openclaw/pull/144005) | fix(update): 迁移前备份状态并支持回滚恢复 | P0 级更新可靠性修复，与 #145169 组成完整修复栈 |

**整体评价：** 今日推进了 **5 个中等规模 PR**，主要集中在 session 管理优化、MCP 服务器清理、更新修复链路。但核心稳定性问题（内存泄漏、子进程泄漏）尚无合并的 fix PR，项目整体向前推进有限。

---

## 4. 社区热点

### 讨论最活跃的 Issues

| Issue | 评论数 | 标签 | 核心诉求 |
|-------|--------|------|----------|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 31 | P1, bug, zombie-process | 子进程泄漏导致僵尸积累和运行时退化 |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 25 | P1, memory-leak, OOM | Gateway RSS 从 350MB 增至 15.5GB，触发 OOM 重启循环 |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | 23 | P0, crash, MCP | MCP 服务器初始化超时导致 Gateway 崩溃 |
| [#111897](https://github.com/openclaw/openclaw/issues/111897) | 19 | P1, session-duplicate | 同一 session lane 并发运行产生重复回复 |
| [#150201](https://github.com/openclaw/openclaw/issues/150201) | 14 | P0, update-failure, Windows | Windows 更新候选快照失败，SQLite 检查超时 |

### 社区热点分析

1. **内存泄漏与 OOM（#91588）**：这是影响最广的问题，632-agent 舰队用户报告 RSS 持续增长直至被 OS OOM killer 终止，触发 `launchd-handoff` 重启循环。用户诉求明确：需要根本性的内存泄漏定位和修复。

2. **子进程泄漏（#97616）**：与内存泄漏问题高度相关，`openclaw-hooks`、`bash`、`codex` 等子进程未被正确 reap，导致僵尸积累。两个问题可能共享同一根因。

3. **更新可靠性（#145252, #150201, #148681）**：多个更新失败报告集中爆发，涉及 Windows、Linux ARM64 等平台。用户对产品稳定性信任度下降。

---

## 5. Bug 与稳定性

### P0 级问题（发布阻塞）

| Issue | 标题 | 状态 | Fix PR |
|-------|------|------|--------|
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP 服务器初始化超时导致 Gateway 崩溃 | OPEN | 无 |
| [#150201](https://github.com/openclaw/openclaw/issues/150201) | Windows 更新候选快照失败 | OPEN | 无 |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | Gateway ready 后事件循环饥饿，/health 超时 | OPEN | 无 |
| [#148681](https://github.com/openclaw/openclaw/issues/148681) | 2026.9.4 更新 Doctor finalize 失败 | OPEN | 无 |
| [#144739](https://github.com/openclaw/openclaw/issues/144739) | 2026.9.3→9.4 npm 更新运行错误 schema 状态 | OPEN | 无 |

### P1 级问题

| Issue | 标题 | 状态 | Fix PR |
|-------|------|------|--------|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 子进程泄漏导致僵尸积累 | OPEN | 无 |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | Gateway 内存泄漏 350MB→15.5GB | OPEN | 无 |
| [#111897](https://github.com/openclaw/openclaw/issues/111897) | 同一 session 并发运行产生重复回复 | OPEN | 无 |
| [#137332](https://github.com/openclaw/openclaw/issues/137332) | mixed requester-settle batches 无限重试 | OPEN | 无 |
| [#148707](https://github.com/openclaw/openclaw/issues/148707) | 2026.9.4 回归：reply 丢失 "no active tool authority snapshot" | OPEN | 无 |
| [#148529](https://github.com/openclaw/openclaw/issues/148529) | 2026.9.4 Gateway 启动时间从 2s 增至 12min | OPEN | 无 |

### 关键发现

- **内存泄漏 + 子进程泄漏** 可能是同一根因，建议合并调查
- **2026.9.4 引入多个回归**：启动时间退化、reply 丢失、更新失败
- **无紧急 Fix PR 已合并**，稳定性修复链路过慢

---

## 6. 功能请求与路线图信号

### 用户请求的功能

| Issue | 需求 | 相关 PR | 可能性 |
|-------|------|---------|--------|
| [#86881](https://github.com/openclaw/openclaw/issues/86881) | Gateway-lite 模式（无 AI harness 的确定性部署） | 无 | 低（已关闭） |
| [#44309](https://github.com/openclaw/openclaw/issues/44309) | A2A 单向 dispatch 模式（无 reply-back ping-pong） | 无 | 中 |
| [#49259](https://github.com/openclaw/openclaw/issues/49259) | Dashboard 清理孤立 session | 无 | 中 |
| [#76247](https://github.com/openclaw/openclaw/issues/76247) | 跨 cron/sessions/channel 的 dispatch ACK 遥测 | 无 | 低 |

### 已有 PR 推进的功能

| PR | 功能 | 预计纳入版本 |
|----|------|-------------|
| [#150344](https://github.com/openclaw/openclaw/pull/150344) | 原生 session/policy 所有权 | 2026.9.5+ |
| [#150235](https://github.com/openclaw/openclaw/pull/150235) | 插件安装进度指示器 | 2026.9.5 |
| [#149331](https://github.com/openclaw/openclaw/pull/149331) | 插件设置按 manifest 分组 | 2026.9.5 |
| [#150376](https://github.com/openclaw/openclaw/pull/150376) | Apple 设备本地 onboarding | 2026.9.5+ |
| [#149725](https://github.com/openclaw/openclaw/pull/149725) | macOS Rust node runtime sidecar | 实验性 |

**路线图判断：** 下一版本（2026.9.5）预计聚焦于**更新可靠性修复**和**内存/子进程泄漏修复**，功能新增优先级较低。

---

## 7. 用户反馈摘要

### 真实痛点

1. **"Gateway 用几天就 OOM"** — #91588 用户报告 RSS 从 350MB 增长至 15.5GB，触发重启循环。这是生产环境最严重的稳定性问题。

2. **"更新后 Gateway 再也起不来"** — #150201、#148681 用户报告 Windows/Linux 更新后 Doctor 恢复失败，SQLite 检查超时。

3. **"子进程泄漏导致系统变慢"** — #97616 用户观察到 `openclaw-hooks`、`bash`、`codex` 等僵尸进程积累，运行时性能持续退化。

4. **"2026.9.4 启动太慢"** — #148529 用户对比 2026.7.1-2（2 秒）与 2026.9.4（12 分钟），632-agent 舰队体验严重退化。

5. **"重复回复干扰工作流"** — #111897 用户报告同一 session lane 并发运行产生重复消息，破坏 A2A 通信语义。

### 用户满意点

- **#31331**（已关闭）：Docker sandbox 修复获得 4 个 👍，用户认可维护者对容器化部署的支持。
- **#90098**（已关闭）：大附件处理修复获得 2 个 👍，Control UI 稳定性改善。
- **#68105**：RTL bidi 修复获得 2 个 👍，多语言用户体验改善。

---

## 8. 待处理积压

### 长期未响应的重要 Issue

| Issue | 创建时间 | 天数 | 严重级别 | 提醒 |
|-------|----------|------|----------|------|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 2026-06-29 | 80 天 | P1 | 子进程泄漏，无 fix PR |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 2026-06-09 | 100 天 | P1 | 内存泄漏，无 fix PR |
| [#70903](https://github.com/openclaw/openclaw/issues/70903) | 2026-04-24 | 145 天 | P0 | Auth 冷却锁定用户数小时 |
| [#111578](https://github.com/openclaw/openclaw/issues/111578) | 2026-07-20 | 89 天 | P0 | Gateway auth token 更新后丢失 |
| [#112313](https://github.com/openclaw/openclaw/issues/112313) | 2026-07-21 | 88 天 | P2 | Dead-lettered 出站队列永不清除 |

### 维护者行动建议

1. **优先处理内存泄漏和子进程泄漏**（#91588、#97616），这两个问题影响生产环境稳定性。
2. **修复 2026.9.4 回归**（#148529、#148707），恢复启动性能和 reply 可靠性。
3. **完成更新修复栈**（#144005 + #145169），确保 Doctor 恢复流程可靠。
4. **回应长期积压 Issue**，至少给出 triage 状态或关闭理由。

---

## 项目健康度评分

| 维度 | 评分 | 说明 |
|------|------|------|
| 活跃度 | ⭐⭐⭐⭐⭐ | 500+ Issue/PR 更新，社区参与度高 |
| 稳定性 | ⭐⭐☆☆☆ | 多个 P0 级崩溃和内存泄漏，2026.9.4 引入回归 |
| 响应速度 | ⭐⭐⭐☆☆ | 部分 Issue 响应及时，但长期积压问题较多 |
| 代码质量 | ⭐⭐⭐⭐☆ | PR 审查严格，fix-shape-clear 标签表明代码规范 |
| 用户满意度 | ⭐⭐⭐☆☆ | 功能受认可，但稳定性问题影响信任 |

**综合评价：** OpenClaw 社区活跃、功能迭代正常，但**当前处于稳定性危机期**。2026.9.3/9.4 版本引入的内存泄漏、子进程泄漏、启动退化等问题需要紧急修复。建议维护者优先处理 P0/P1 稳定性 Issue，暂停功能新增，待版本稳定后再推进路线图。

---

## 横向生态对比

# AI 智能体开源生态横向对比分析报告
**日期：** 2026-09-17
**分析师：** Agnes (Sapiens AI)

## 1. 生态全景

2026年9月，个人AI助手与自主智能体开源生态呈现**“稳定性危机与功能扩张并存”**的二元态势。OpenClaw 作为头部项目正经历严重的生产环境信任危机（内存泄漏、OOM），揭示了大规模并发与复杂 Gateway 架构下的工程挑战；而 QwenPaw 和 hermes-agent 则通过快速响应社区反馈（多租户、SSE 修复）维持高健康度。整体来看，生态焦点正从“单一 Agent 能力竞赛”转向“企业级治理（多租户）、运行时鲁棒性（内存/进程管理）及跨平台一致性”。

## 2. 各项目活跃度对比

| 项目 | 今日 Issue 更新 | 今日 PR 更新 | 新版本发布 | 核心健康度评估 |
| :--- | :---: | :---: | :---: | :--- |
| **OpenClaw** | 500 (新开325) | 500 (待合283) | 无 | ⚠️ **高危**：P0级内存泄漏/子进程泄漏未解，2026.9.4 引入回归，稳定性评分低。 |
| **hermes-agent** | ~292 (活跃) | ~104 (已合) | 无 | 🟡 **良好**：快速修复了 v0.21.3 的 CLI 崩溃回归，Bot Relay 稳定性增强。 |
| **QwenPaw** | 25 | 36 | 无 | 🟢 **健康**：高产出期，多租户 Hub 路线图受关注，SSE 流式修复中。 |
| **Zeroclaw** | 29 | 50 | 无 | 🟢 **健康**：Rust 运行时稳定性加固（panic 消除），技术债清理积极。 |
| **DeepSeek Harness** | N/A (Discussions主导) | N/A | 无 | 🟡 **中等**：无正式 Release，社区高度关注加密插件与迁移兼容性。 |
| **AstrBot** | 3 | 15 | 无 | 🟢 **稳定**：聚焦后端稳定性（TTS/知识库），迭代节奏稳健。 |
| **PicoClaw** | 4 | 4 | 无 | 🟢 **轻微**：专注 Telegram 交互体验优化，规模较小。 |

## 3. OpenClaw 在生态中的定位

*   **优势与规模**：OpenClaw 仍是生态中**社区规模与并发活动量最大**的项目（Issue/PR 数量级为其他项目的 10-50 倍），其 Gateway 架构是多数复杂 Agent 系统的参照标准。
*   **技术路线差异**：与 Zeroclaw 的纯 Rust 安全路径、PicoClaw 的嵌入式/轻量路径不同，OpenClaw 采用 Go/Rust 混合且深度依赖 Electron/Desktop 组件的**重型全栈架构**。这使其能支持 632-agent 舰队等大规模场景，但也导致了今日集中的内存与子进程管理难题。
*   **生态地位**：它是**“生产环境压力测试场”**。OpenClaw 今日暴露的 OOM、僵尸进程、更新失败问题，是其他中型项目（如 QwenPaw, hermes-agent）未来规模扩大后必然面临的工程瓶颈，具有极高的警示价值。

## 4. 共同关注的技术方向

| 技术方向 | 具体诉求 | 涉及项目 |
| :--- | :--- | :--- |
| **运行时稳定性与资源管理** | 解决内存泄漏、子进程僵尸化、OOM 重启循环。 | **OpenClaw** (P0泄漏), **Zeroclaw** (panic消除), **QwenPaw** (容器内存耗尽 #7722) |
| **流式响应健壮性** | 修复 SSE 裸 null payload、流冻结、重试机制失效。 | **QwenPaw** (#7813/#7814), **hermes-agent** (Bot Relay 顺序), **OpenClaw** (MCP 超时崩溃) |
| **多租户与企业级治理** | 模型网关、成员治理、用量仪表盘、密钥托管。 | **QwenPaw** (Hub #7318/#7779), **hermes-agent** (Nous Portal 计费透明度) |
| **更新机制可靠性** | 解决跨平台（Win/Linux/macOS）更新后启动失败、状态丢失。 | **OpenClaw** (9.4更新回归), **hermes-agent** (`hermes update` 回归修复) |
| **跨平台渠道集成** | Telegram/Slack/Discord 的消息解析、媒体引用、首条消息丢失。 | **PicoClaw** (Telegram回复修复), **AstrBot** (QQ/Knowledge Base), **Zeroclaw** (Mattermost/Telegram) |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | 巨型 Agent 舰队管理、Gateway 中心化调度 | 企业级运维、大规模自动化场景 | Go/Rust 混合，重度依赖共享 Rust Gateway 客户端，架构最复杂。 |
| **Zeroclaw** | 高可靠性 Rust 运行时、原子配置、安全合规 | 注重代码质量与安全的基础设施开发者 | **纯 Rust** 重写，强制 `fail-closed`，强调 anti-slop 技术债治理。 |
| **QwenPaw** | 全功能桌面端、多模态记忆、团队协作 (Hub) | 个人助手向团队协作演进的用户 | Electron + TS 前端，深度集成阿里系生态（通义千问、Data），强调 UI/UX。 |
| **hermes-agent** | 命令行工具链、Bot Relay、桌面监督模式 | CLI 重度用户、Nous 生态追随者 | Python 核心，强调 `hermes update` 链路稳定性与跨机 DM 路由。 |
| **DeepSeek Harness** | 本地大模型调试、加密凭据库、VSCODE 集成 | DeepSeek 模型研究者、隐私敏感用户 | Electron 打包，轻框架重插件，社区驱动功能（如 dsh-vault）。 |
| **AstrBot** | 中国主流社交协议集成 (QQ/微信/飞书) | 国内 Bot 开发者、社群运营者 | Python 后端，侧重 OneBot 协议兼容性与知识库 RAG 稳定性。 |
| **PicoClaw** | 嵌入式/边缘设备 Agent、Telegram 轻量交互 | 硬件开发者、轻量级 Telegram 用户 | 极轻量级，专注 Telegram 协议细节（回复链、媒体引用）。 |

## 6. 社区热度与成熟度

*   **快速迭代/扩张期**：
    *   **QwenPaw**：多租户 Hub、语音聊天、Workbench Shell 等功能密集上线，处于产品形态扩张阶段。
    *   **hermes-agent**：v0.21.x 快速修补回归，生态插件（Stripe/Plex）扩展中。
*   **质量巩固/技术债清理期**：
    *   **Zeroclaw**：聚焦 Rust anti-slop 清理、panic 消除、安全合规，属于典型的“加固型”健康度维护。
    *   **OpenClaw**：被迫进入“危机处理”模式，需优先解决稳定性问题而非功能新增。
*   **稳定/细分市场期**：
    *   **AstrBot / PicoClaw / DeepSeek Harness**：在社区特定领域（国内社交协议、嵌入式、DeepSeek 工具链）保持稳定且垂直的迭代。

## 7. 值得关注的趋势信号

1.  **“更新即破坏”成为普遍痛点**：OpenClaw、hermes-agent、QwenPaw 均报告了版本更新后导致的启动失败、状态丢失或回归。这表明随着 Agent 系统复杂度提升，**原子化更新、回滚机制和沙箱测试**将成为后续版本竞争的关键护城河。
2.  **内存/进程管理是规模化必经之路**：OpenClaw 的 OOM 危机和 QwenPaw 的容器内存耗尽问题，共同指向了一个趋势：**Agent 系统正从“单会话智能”向“持久化服务”演变**，传统的内存管理机制（如 Go 的 GC 压力、子进程 reap 策略）需要更严格的工程审计。
3.  **SSE 流式健壮性决定用户体验上限**：QwenPaw 和 hermes-agent 均投入资源修复流式渲染问题。在 LLM 生成时长增加的背景下，**断点续传、 malformed frame 容错、UI 状态同步**已成为核心基础设施能力。
4.  **多租户从“可选”变为“刚需”**：QwenPaw 的 Hub 路线图和社区热烈反响，以及 hermes-agent 的计费透明度问题，显示个人 AI 助手正快速向**团队/企业场景渗透**，权限隔离、用量计量、密钥托管将是未来半年的高频需求。
5.  **Rust 在底层稳定性层面的渗透**：Zeroclaw 通过 Rust 重写获得高稳定性评价，OpenClaw 也在部分组件（Rust Gateway）引入严格类型检查。这预示着**核心运行时层**将加速向 Rust 迁移以提升安全性，而业务逻辑层仍可能保留动态语言灵活性。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-17

## 1. 今日速览

Zeroclaw 在过去 24 小时内保持了极高的活跃度：29 条 Issue 更新、50 条 PR 更新，其中 47 条待合并、3 条已合并/关闭。开发重心集中在 **运行时稳定性修复**、**配置原子化发布**、**ACP/浏览器工具增强** 以及 **安全合规清理**。无新版本发布，但核心运行时与 ZeroCode 前端均有实质性推进，项目整体处于“高产出、多并发修复”的健康状态。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

### 今日合并/关闭的重要 PR（3 条）

| PR | 作者 | 变更摘要 |
|----|------|---------|
| [#10896](https://github.com/zeroclaw-labs/zeroclaw/pull/10896) [CLOSED] | @JordanTheJet | **CI 性能优化**：将编译作业固定在特定的 runner label，避免通过 `fmt` 作业输出动态获取标签，减少 CI 等待时间。 |
| [#10134](https://github.com/zeroclaw-labs/zeroclaw/pull/10134) [CLOSED] | @JordanTheJet | **运行时 panic 消除**：将 17 处 panic 候选点（含 `unwrap`/`unreachable!`）转换为错误返回或 fail-closed 回退，覆盖 agent、turn、RPC dispatch、skills、SOP、tool-registry 等路径，显著提升运行时鲁棒性。 |
| [#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) [CLOSED] | @rhinterndorfer | **Nextcloud Talk Bot API 修复**：修正了错误的 OCS 端点 URL 构造方式，解决机器人消息发送失败问题。 |

### 重点推进中的 PR

- **#10879** [@Audacity88] — **ZeroCode Sessions Queue & Plan 合并 dock**：将原本分散的会话队列和计划面板整合为单一可拖拽宽度的 dock，改善零代码界面的空间利用率。
- **#10241** [@Audacity88] — **Supervised Shell Approval Routing 恢复**：为渠道驱动的受监管 shell 调用恢复真实的人工审批路径，优先使用配置的审批者，并在不可达时降级处理。
- **#10911** [@Audacity88] — **Atomic Live Config Revisions**（堆叠于 #10621）：发布原子化配置修订，建立配置生成发布与逐路径/逐目标应用结果账本的基础。
- **#10903** [@Audacity88] — **Tool-result Images 生命周期修复**：修复同一用户回合内无关工具调用导致工具返回图片消失的问题（对应 Issue #10885）。
- **#10914** [@Audacity88] — **String Arguments Fallback 保留**：修复共享工具调用解析器中嵌套字符串参数被静默转为对象/数组的问题。
- **#10351** [@Audacity88] — **Execution-tree Iteration Budgets**：为前台 agent 执行树引入可选的 `max_execution_tree_iterations` 聚合迭代上限。
- **#9283** [@minato32] — **Web Fetch 压缩响应解压**：修复 `web_fetch` 工具无法正确处理 gzip/brotli/deflate 响应体的问题（维护者已完成 master 合并与边界修复）。
- **#10259** [@JordanTheJet] — **RPC Native+Peercred 认证强制**：在 RPC 层面强制执行原生 + 对端凭据认证（Stage 3），取代部分 #8672 功能。

> **整体判断**：今日项目主要在**夯实运行时可靠性**与**完善 ZeroCode 用户体验**两条主线并行推进，无新功能大版本发布，但技术债务清理（Rust anti-slop、panic 消除、CI 优化）与核心特性（原子配置、执行预算、审批路由）同步增长，项目健康度良好。

---

## 4. 社区热点

### 高讨论度 Issue / PR

| ID | 类型 | 作者 | 评论数 | 热度分析 |
|----|------|------|--------|---------|
| [#10118](https://github.com/zeroclaw-labs/zeroclaw/issues/10118) | Tracker / Enhancement | @JordanTheJet | 16 | **Rust anti-slop policy debt 清理追踪**：当前上游报告 307 个违规候选分布在 1,078 个 Rust 文件中，是项目长期技术债治理的核心跟踪器，评论活跃反映社区对代码质量的高度关注。 |
| [#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) | Tracker / Bug | @ArmanAvanesyan | 5 | **RUSTSEC-2026-0247 (bitmaps) 安全豁免审查**：`cargo deny check` 因 `imbl → Matrix SDK dev-deps` 路径引入的 `bitmaps 3.2.1` 而失败，安全 CI 持续阻断，需尽快决策移除或升级。 |
| [#9945](https://github.com/zeroclaw-labs/zeroclaw/issues/9945) | Feature / Bug | @NiuBlibing | 5 | **Browser Tool 命令覆盖不足**：仅暴露 16/100+ 命令，iframe/dialog/tab/form 等核心交互不可达，影响自动化场景完整性。 |
| [#10885](https://github.com/zeroclaw-labs/zeroclaw/issues/10885) | Bug | @Audacity88 | 4 | **Tool-return 图片在同回合内消失**：已被 #10903 PR 跟进，属 P2 级降级问题。 |
| [#10887](https://github.com/zeroclaw-labs/zeroclaw/issues/10887) | Bug | @Audacity88 | 1 | **非视觉能力门控误判**：包含图像标记但无实际可加载图片的文本触发硬 `ProviderCapabilityError`，已标记 follow-up。 |
| [#10912](https://github.com/zeroclaw-labs/zeroclaw/issues/10912) | Bug | @Audacity88 | 0 | **流式文本守卫误杀回复**：普通文本中含 brace-delimited snippet 提及 tool-protocol keys 时，整个助手回复被抑制，经三次重试后报格式错误。 |

> **热点分析**：社区当前最关注 **运行时稳定性**（图片丢失、门控误判、流式守卫误杀）与 **安全合规**（Rust anti-slop、bitmaps 依赖）。#10118 作为技术债总控 tracker 持续获得高关注，反映维护团队对代码质量的承诺。

---

## 5. Bug 与稳定性

按严重程度排列：

### P1（工作流阻塞）

| ID | 组件 | 描述 | Fix PR |
|----|------|------|--------|
| [#10901](https://github.com/zeroclaw-labs/zeroclaw/issues/10901) | channel (Mattermost) | 新自动发现 DM 中第一条消息被静默丢弃 | — |
| [#10883](https://github.com/zeroclaw-labs/zeroclaw/issues/10883) | channel (Telegram) | `media_group_listener` 测试在并行 runtime 下超时（间歇性） | — |

### P2（行为降级）

| ID | 组件 | 描述 | Fix PR |
|----|------|------|--------|
| [#10885](https://github.com/zeroclaw-labs/zeroclaw/issues/10885) | provider/agent | 同回合内无关工具调用导致工具返回图片消失 | ✅ [#10903](https://github.com/zeroclaw-labs/zeroclaw/pull/10903) |
| [#10887](https://github.com/zeroclaw-labs/zeroclaw/issues/10887) | runtime/daemon | 非视觉门控在纯文本含图像标记时硬失败 | — |
| [#10912](https://github.com/zeroclaw-labs/zeroclaw/issues/10912) | agent | 流式文本守卫误抑制含 tool-protocol key 的普通文本回复 | — |
| [#10908](https://github.com/zeroclaw-labs/zeroclaw/issues/10908) | provider | 工具结果文本中的图像标记被提升为 attachment，无来源追溯；字面源/日志文本被剥离或附加 | — |
| [#10897](https://github.com/zeroclaw-labs/zeroclaw/issues/10897) | tooling/ci | `supervisor_preserves_component_error_chain` 测试在并行 nextest 下抖动（全局日志广播竞争） | — |
| [#6105](https://github.com/zeroclaw-labs/zeroclaw/issues/6105) | runtime/daemon | Agent 执行 cron 任务时丢失上下文引用 | — |

### P3（低风险/设计缺陷）

| ID | 组件 | 描述 | Fix PR |
|----|------|------|--------|
| — | — | 今日无新增 P3 Bug | — |

> **稳定性评估**：今日共发现 **6 个 P1/P2 Bug**，其中 1 个已有修复 PR（#10903）。Mattermost DM 首条消息丢失（#10901）为 P1 级工作流阻塞问题，需优先处理。测试抖动问题（#10883、#10897）反映并行运行时隔离机制仍有缺陷。

---

## 6. 功能请求与路线图信号

| ID | 类型 | 描述 | 与已有 PR 关系 | 下一版本可能性 |
|----|------|------|---------------|---------------|
| [#10900](https://github.com/zeroclaw-labs/zeroclaw/issues/10900) | Feature | **转录提供商级联回退链**：主 STT 端点失败时按优先级切换备用提供商（含本地应急线路） | 无直接关联 PR | ⭐⭐⭐ 高 — 语音输入可靠性需求明确 |
| [#10909](https://github.com/zeroclaw-labs/zeroclaw/issues/10909) | Feature | **ZeroCode Composer 标准文本编辑**：统一 undo/redo、键盘选择、全选、剪切 | 无直接关联 PR | ⭐⭐ 中 — 用户痛点明确但实现成本待评估 |
| [#9687](https://github.com/zeroclaw-labs/zeroclaw/issues/9687) | Feature | **SOP Engine 操作员暂停**：允许在步骤边界暂停运行中 SOP 并持久化park，支持 web/zerocode/RPC 恢复 | #9685/#9686 已拆解任务，#9685（cancel RPC）已推迟出 MVP | ⭐⭐⭐ 高 — 已在 MVP 后路线图中 |
| [#10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780) | Enhancement | **恢复主动式 token-budget context compaction**：v0.8.5 仅支持基于消息数量的裁剪，缺少 token 驱动的主动压缩 | #10905 PR 已提出手动可恢复压缩功能 | ⭐⭐⭐ 高 — 与 #10905 互补，可能被纳入同一迭代 |
| [#7497](https://github.com/zeroclaw-labs/zeroclaw/issues/7497) | RFC | **OCI-compliant Plugin Registry**：以 OCI 镜像仓库替代 JSON 索引文件作为 WASM 插件存储/分发/发现机制 | 无直接关联 PR | ⭐⭐ 中 — RFC 阶段，技术方向已定但实施计划待明确 |
| [#9022](https://github.com/zeroclaw-labs/zeroclaw/issues/9022) | Feature | **Slack Events API (HTTP Request URL) 模式**：为 scale-to-zero 部署提供可选的 HTTP 推送接收路径 | 无直接关联 PR | ⭐⭐ 中 — 针对 serverless 部署场景的需求 |
| [#9549](https://github.com/zeroclaw-labs/zeroclaw/issues/9549) | Feature | **本地模型选择指南（llmfit + 文档）**：整合硬件要求、兼容性、量化、上下文限制等信息 | 无直接关联 PR | ⭐⭐ 低 — 文档类增强，优先级相对较低 |

> **路线图判断**：**SOP 暂停/恢复**（#9687 系列）、**Token 预算压缩**（#10780/#10905）、**转录回退链**（#10900）是三位一体的可靠性增强组合，极有可能在下一版本中 bundled release。**OCI Plugin Registry**（#7497）作为架构级 RFC，短期内落地可能性较低。

---

## 7. 用户反馈摘要

### 核心痛点

1. **工具返回图片的生命周期管理混乱**（#10885、#10908）
   - 用户反馈：工具调用返回的图片在后续无关工具调用后消失；工具结果文本中的图像标记被错误提升为 attachment 且无来源追溯。
   - 场景：多步工具链自动化流程中，中间步骤干扰了后续步骤的视觉上下文。

2. **流式响应被误抑制**（#10912）
   - 用户反馈：普通 prose 中包含类似 tool-protocol 的 brace-delimited snippet 时，整个助手回复被流式文本守卫拦截，需三次重试才报格式错误。
   - 场景：Agent 在 ZeroCode/ACP 会话中处理包含代码片段或结构化数据的自然语言时失败。

3. **Mattermost DM 首条消息丢失**（#10901）
   - 用户反馈：升级到 v0.8.5 后，新自动发现的 DM 中第一条消息被静默跳过。
   - 场景：生产环境中 Mattermost 集成导致初始消息丢失，影响工作流完整性。

4. **Cron 任务上下文丢失**（#6105）
   - 用户反馈：基于 cron 触发的 agent 响应无法引用其发送的消息。
   - 场景：定时提醒/报告场景中，agent 失去对原始请求的上下文记忆。

### 正面反馈信号

- **#10241**（受监管 shell 审批路由恢复）获 high risk 标签，说明用户对**安全可控的自动化**有强烈需求。
- **#9283**（web_fetch 压缩响应解压）由社区贡献者推动并经维护者接手修复，反映社区协作健康。
- **#10134**（panic 消除）被标记为 follows-up from #10134，说明用户对**运行时稳定性**的改善有明确感知。

---

## 8. 待处理积压

以下 Issue/PR 长期未获响应或处于 blocked 状态，建议维护者关注：

| ID | 状态 | 创建日期 | 积压原因 | 建议优先级 |
|----|------|---------|---------|-----------|
| [#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) | OPEN / no-stale | 2026-08-10 | `bitmaps 3.2.1` 安全违规持续阻断 `cargo deny check`，影响 CI 通过率 | ⭐⭐⭐ 高 — 安全合规阻塞 |
| [#7497](https://github.com/zeroclaw-labs/zeroclaw/issues/7497) | OPEN / blocked | 2026-06-11 | OCI plugin registry RFC 已批准但实施路径未启动，阻塞 WASM 插件生态扩展 | ⭐⭐ 中 — 架构决策待跟进 |
| [#9679](https://github.com/zeroclaw-labs/zeroclaw/issues/9679) | OPEN / blocked | 2026-08-02 | `act` 本地 artifact 支持因版本兼容性受限（`ACT_ARTIFACT_MIN_VERSION=999.0.0` 哨兵值），等待 `act` 发布兼容版本 | ⭐ 低 — 外部依赖 |
| [#9685](https://github.com/zeroclaw-labs/zeroclaw/issues/9685) | OPEN / deferred | 2026-08-02 | SOP cancel RPC 被推迟出 MVP，需等待 #9476 合并后重新激活 | ⭐⭐ 中 — 依赖阻塞 |
| [#9677](https://github.com/zeroclaw-labs/zeroclaw/issues/9677) | OPEN / blocked | 2026-08-02 | ZeroCode command-catalogue 兼容性回退代码需在有界窗口结束后清理，当前等待 #9329 窗口关闭 | ⭐ 低 — 定时清理任务 |

> **特别关注**：#9899（bitmaps 安全违规）已影响 CI 超过 30 天，建议维护者优先处理或提供明确的豁免/升级路线图。

---

**报告生成时间**：2026-09-17  
**数据来源**：GitHub API (zeroclaw-labs/zeroclaw)  
**分析师**：Agnes (Sapiens AI)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期**：2026-09-17  
**数据来源**：GitHub API (sipeed/picoclaw)

## 1. 今日速览
过去24小时内，PicoClaw 社区活跃度中等，共更新 4 个 Issue/PR。核心进展集中在 Telegram 机器人交互逻辑的修复与完善：两个关于“回复处理”的 Bug 已被合并，显著提升了多轮对话的连续性体验。同时，一个严重的无限重试 Bug 已被标记关闭（疑似通过 workaround 或版本隔离解决），为后续根治奠定基础。新增远程伴侣功能 PR 处于开放状态，显示项目在扩展跨设备协同能力。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日合并了两个关键的 Telegram 模块修复 PR，由贡献者 `@hugodeco` 提交，主要推进了以下功能：
*   **对话连续性修复 (#3357)**：解决了在 `mention_only: true` 模式下，用户直接回复 Bot 消息（而非 @提及）时被静默忽略的问题。该修复确保了基于“回复”链的多轮对话能正常触发 Bot 响应。
*   **媒体引用完整性修复 (#3356)**：修复了用户在回复文件消息时，引用的文档类型被丢弃（仅保留 `[file]` 占位符）的 Bug，现支持正确重新附加语音、音频及文档媒体，保障 Agent 能接收完整的上下文信息。

此外，一个关于远程伴侣配对的新功能 PR (#3344) 已开放，旨在允许手机作为桌面 Agent 的旁观者设备，通过 `gbr/1` 协议实现配对。

## 4. 社区热点
*   **Issue #3343**: [BUG] Tool feedback animation can edit a Telegram message indefinitely...
    *   **热度**：高关注度（Closed/Stale）。
    *   **分析**：该 Issue 揭示了 Tool Feedback 动画在无进展时的无限重试缺陷，导致 Telegram 触发服务器端限流。虽然 Issue 已关闭，但背后反映的用户痛点是**系统稳定性与资源控制**。社区对此类边界情况导致的账户受限问题高度敏感，期望看到更健壮的重试/超时机制。
    *   [链接](https://github.com/sipeed/picoclaw/issues/3343)

*   **PR #3344**: Add Build Remote Agent phone pairing (gbr/1)
    *   **热度**：中（Open）。
    *   **分析**：新功能请求，体现了用户对**跨设备协同**场景的需求，希望手机能作为远程监控/旁观节点。

## 5. Bug 与稳定性
*   **[严重] Telegram 无限编辑导致账户限流 (Issue #3343)**：Tool 反馈动画在 Agent 停止进步后仍每3秒调用 `editMessageText`，累计22.8万次尝试并触发 TG 限流。
    *   **状态**：Issue 已关闭（标记 Stale/Closed），但**尚无明确合并的 Fix PR**。需确认是否已在某次合并中被隐含修复，或依赖外部配置规避。
*   **[中等] 回复消息被忽略 (PR #3357 - 已合并)**：原为 Bug，现已通过 PR #3357 修复。
*   **[中等] 回复文件消息丢失引用 (PR #3356 - 已合并)**：原为 Bug，现已通过 PR #3356 修复。

## 6. 功能请求与路线图信号
*   **远程设备旁观模式**：PR #3344 明确提出让手机通过 `gbr-agent` 配对成为桌面 Agent 的旁观者。这表明项目正在探索**分布式或辅助设备交互**的路线，可能纳入未来版本的远程协作功能。
*   **Telegram 交互体验优化**：连续两个 PR 修复回复和媒体引用问题，显示团队正集中打磨 Telegram 插件的**对话自然度**，这是当前迭代的重点方向。

## 7. 用户反馈摘要
*   **痛点**：用户在 Telegram 群组中使用 Bot 时，习惯性地使用“回复”功能进行追问，而非每次都 @提及，当前的忽略行为破坏了对话流。
*   **痛点**：用户在处理文件型对话时，期望 Bot 能保留并转发原始文件引用，而非仅仅显示文本占位符。
*   **满意点**：今日合并的两个 PR 直接回应了上述自然交互需求，预计将提升用户满意度。

## 8. 待处理积压
*   **Issue #3343 根治方案**：虽然 Issue 已关闭，但无限重试的根本原因（Tool Feedback 循环控制）若无明确代码修复记录，仍存在回归风险。建议维护者在下一版本中显式加固重试退避逻辑。
*   **PR #3344 审核**：远程配对功能涉及安全与协议兼容性，需尽快审核合并以验证功能稳定性。

---
*报告生成时间：2026-09-17 | 分析师：AI Agent & Open Source Project Analyst*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目日报 | 2026-09-17

> 数据来源：QwenPaw GitHub (github.com/agentscope-ai/qwenpaw)  
> 分析师角色：AI 智能体与个人 AI 助手领域开源项目分析师

---

## 1. 今日速览

2026年9月16日，QwenPaw 项目保持**高活跃度**：过去24小时内共处理 **61 条**活动（Issues 25 条 + PRs 36 条），其中 **12 条 Issue 已关闭**、**12 条 PR 已合并**。无新版本发布。社区对 **多租户 Hub 路线图**（#7318）反响热烈，**Console/SSE 流式稳定性**成为当日 Bug 焦点，同时 **多平台渠道（飞书/微信）集成问题**频繁上报。项目整体健康度良好，技术债务（尤其是前端流式处理与后台服务化体验）正在被系统性修复。

---

## 2. 版本发布

**无新版本发布。**

当前最新正式版仍为 **v2.2.0** / **v2.2.1b1**（Windows 桌面版）。

---

## 3. 项目进展

### 已合并 / 已关闭的重要 PR

| PR | 状态 | 贡献者 | 概要 |
|---|---|---|---|
| [#4171](https://github.com/agentscope-ai/QwenPaw/pull/4171) | ✅ Closed | @wjt0321 | **Memory Distill 插件**：引入标题差分蒸馏引擎，实现每日笔记自动去重（~92% 噪声过滤），增强长期记忆管理。 |
| [#7120](https://github.com/agentscope-ai/QwenPaw/pull/7120) | ✅ Closed | @LXD-8 | **安全加固**：默认启用全部 7 项 Shell 逃逸检测规则（命令替换、混淆标志、反斜杠转义等），显著提升 CLI 执行安全性。 |
| [#7783](https://github.com/agentscope-ai/QwenPaw/pull/7783) | ✅ Closed | @x1n95c | **ACP 体验优化**：修复外部 ACP runner 委托时回复重复/碎片化问题，改善代理间通信流畅度。 |
| [#6569](https://github.com/agentscope-ai/QwenPaw/pull/6569) | ✅ Closed | @hehuang139 | **TTY 错误抑制**：修复终端关闭后 `EIO/EPIPE` 打印错误，解决守护进程场景下的噪音日志问题。 |
| [#7805](https://github.com/agentscope-ai/QwenPaw/pull/7805) | ✅ Closed | @zhaozhuang521 | **UI 微调**：匹配设置菜单字体权重，提升界面一致性。 |

### 关键在审 / 新增 PR（按影响力排序）

| PR | 类型 | 贡献者 | 概要 |
|---|---|---|---|
| [#7779](https://github.com/agentscope-ai/QwenPaw/pull/7779) | 🆕 Feature | @rayrayraykk | **Hub 多租户核心**：新增模型网关、成员治理与用量仪表盘，支持管理员托管密钥、成员选择组织模型。 |
| [#7790](https://github.com/agentscope-ai/QwenPaw/pull/7790) | 🆕 Feature | @zhijianma | **统一 Workbench Shell**：引入可调整大小的右侧工作区（文件/变更/终端/工具），替代固定能力标签页。 |
| [#7785](https://github.com/agentscope-ai/QwenPaw/pull/7785) | 🆕 Feature | @jinglinpeng | **实时语音聊天**：支持语音输入/播放/打断，复用现有 Chat 执行路径。 |
| [#7637](https://github.com/agentscope-ai/QwenPaw/pull/7637) | 🆕 Feature | @cyruszhang | **QwenPaw-Data 0.3.0**：增强数据分析工作流，支持数据源选择、业务问答与报告生成。 |
| [#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613) | 🆕 Feature | @xypang33-sketch | **OpenViking 记忆插件**：作为可选内存插件集成，遵循新 memory-plugin 架构。 |
| [#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776) | 🐛 Fix | @lllyfff | **Playwright 自愈合**：修复浏览器驱动死亡后永久失效问题，实现连接自动重建。 |
| [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725) | 🐛 Fix | @xiaoka76 | **文件系统 watcher 优化**：将阻塞式 `watchfiles.awatch` 替换为线程轮询，防止大工作区导致服务器冻结。 |
| [#7807](https://github.com/agentscope-ai/QwenPaw/pull/7807) | 🐛 Fix | @Nobodyanonymou-s | **渠道延迟加载**：仅在实际启用时导入渠道模块，解决飞书 SDK 等重型依赖导致的启动阻塞（~5.8s）。 |
| [#7811](https://github.com/agentscope-ai/QwenPaw/pull/7811) | 🐛 Fix | @AlexDesign420 | **上下文用量显示修正**：修复 chat context ring 仅显示部分上下文使用量的问题，提供更准确统计。 |
| [#7057](https://github.com/agentscope-ai/QwenPaw/pull/7057) | 🐛 Fix | @lcq225 | **子进程 PATH 增强**：为 systemd/Launchd/Docker 场景下的子进程添加用户本地 bin 目录到 PATH。 |
| [#7760](https://github.com/agentscope-ai/QwenPaw/pull/7760) | 🐛 Fix | @jinliyl | **优雅关机支持**：允许 memory jobs 在关闭时排空，防止 ReMe 内存数据丢失。 |

---

## 4. 社区热点

### 🔥 讨论最活跃的 Issue

**[#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) — QwenPaw Hub 多租户版路线图征集**
- 作者：@rayrayraykk | 评论：**29** | 👍：**4**
- 摘要：社区长期呼吁团队版支持，官方正式提出 **2.2.0 多租户 Hub** 计划，邀请用户参与功能优先级排序。
- **背后诉求**：从个人助手向团队协作演进，平衡"个人工作区自由"与"组织级治理"之间的矛盾。该 Issue 直接关联 PR [#7779](https://github.com/agentscope-ai/QwenPaw/pull/7779)（Hub 核心功能）。

### 📊 高关注度 PR

**[#4171](https://github.com/agentscope-ai/QwenPaw/pull/4171) — Memory Distill 插件**
- 作者：@wjt0321 | 状态：已合并
- **亮点**：通过"标题差分"技术识别每日笔记中的**真实新增信息**，实现 ~92% 噪声过滤，大幅降低记忆存储冗余。
- **用户价值**：解决长期对话中记忆膨胀问题，提升 Agent 回忆准确率。

**[#7120](https://github.com/agentscope-ai/QwenPaw/pull/7120) — Shell 逃逸安全检查默认启用**
- 作者：@LXD-8 | 状态：已合并
- **亮点**：7 项安全检查从 `False` → `True`，涵盖命令替换、混淆标志、反斜杠转义等常见绕过手法。
- **用户价值**：提升生产环境安全性，尤其适用于 Docker/systemd 部署场景。

---

## 5. Bug 与稳定性

### 🔴 严重 Bug（影响核心功能）

| Issue | 状态 | 作者 | 描述 | Fix PR |
|---|---|---|---|---|
| [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | 🟢 Open | @Nobodyanonymou-s | **容器内存耗尽**：三种路径叠加导致 ~1MB/s 持续增长，最终 OOM。涉及无界流缓冲、keep-alive 实例堆叠、doom-loop 门控规避。 | — |
| [#7813](https://github.com/agentscope-ai/QwenPaw/issues/7813) | 🟢 Open | @wjt0321 | **SSE 裸 null 负载导致流冻结**：单个 malformed SSE frame（payload 为 `null`）使整个流式回合崩溃，UI 卡死在错误页面。 | [#7814](https://github.com/agentscope-ai/QwenPaw/pull/7814) (相关) |
| [#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815) | 🟢 Open | @wjt0321 | **Console 懒加载页面失败后无法恢复**：每次导航停留在错误屏幕，唯一出路是全屏刷新。重试机制失效。 | [#7814](https://github.com/agentscope-ai/QwenPaw/pull/7814) (相关) |
| [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) | 🟢 Open | @xiaohushi512 | **subAgent spawn 全部超时**：v2.2.0 Windows 桌面版，所有 subAgent 任务执行失败，即使延长 timeout 也无济于事。 | — |
| [#7792](https://github.com/agentscope-ai/QwenPaw/issues/7792) | 🟢 Open | @sacrtap | **微信音视频附件变为 file:// URL**：导入 OpenAI-compatible API 后返回 400 错误（"URL invalid"）。 | — |

### 🟡 中等 Bug（影响体验）

| Issue | 状态 | 作者 | 描述 | Fix PR |
|---|---|---|---|---|
| [#7812](https://github.com/agentscope-ai/QwenPaw/issues/7812) | 🟢 Open | @AlexDesign420 | **启动后 Slash 命令作用于错误会话**：桌面应用刚启动时，输入的 slash command 作用于 fallback session（空 memory），而非当前界面会话。 | — |
| [#7814](https://github.com/agentscope-ai/QwenPaw/issues/7814) | 🟢 Open | @wjt0321 | **SSE 健壮性缺陷**：`_strip_event_headlines` 可输出裸 `null` payload；失败时无 terminal event 发送。 | [#7814](https://github.com/agentscope-ai/QwenPaw/pull/7814) (Open) |
| [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726) | ✅ Closed | @remotepan-design | **ACP `trusted: true` 静默降级为交互式提示**：因 `_pick_allow_option` 仅匹配 `allow_*` optionId，导致信任配置失效。 | — |
| [#7689](https://github.com/agentscope-ai/QwenPaw/issues/7689) | ✅ Closed | @Wiziechen | **PDF 文档块仍发送到多模态端点**：#7621 仅修复 `supports_multimodal=False` 模型，多模态路径仍存在。 | — |
| [#7720](https://github.com/agentscope-ai/QwenPaw/issues/7720) | ✅ Closed | @ekzhu | **Creator 隐藏 prompt-sync 阻塞**：GATED 状态未暴露给用户，缺少手动图片审核入口。 | — |
| [#7693](https://github.com/agentscope-ai/QwenPaw/issues/7693) | ✅ Closed | @happyLuckyEveryDay | **Creator 多图生成审核通过导致任务卡死**：用户"审核通过"会中断正在执行的任务且不重新调度，任务永久卡在 RUNNING。 | — |
| [#7799](https://github.com/agentscope-ai/QwenPaw/issues/7799) | ✅ Closed | @makeryuan-MK | **v2.2.1 Console 图片显示回归**：`send_file_to_user` 发送的图片仅在流式期间短暂可见，刷新后消失（疑似 #5320 复发）。 | — |

### 🟢 已修复 / 已关闭的 Bug

- [#6472](https://github.com/agentscope-ai/QwenPaw/issues/6472)：创空间升级后编程模式 JSON 文件不显示行号
- [#7730](https://github.com/agentscope-ai/QwenPaw/issues/7730)：插件目录读取失败时未走离线降级路径
- [#7804](https://github.com/agentscope-ai/QwenPaw/issues/7804)：管理功能增强（已关闭，可能为重复或已解决）

---

## 6. 功能请求与路线图信号

### 🚀 高优先级需求（已有 PR 推进）

| 需求 | Issue/PR | 状态 | 预期版本 |
|---|---|---|---|
| **多租户 Hub**（模型网关、成员治理、用量仪表盘） | [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) + [#7779](https://github.com/agentscope-ai/QwenPaw/pull/7779) | 🟡 在审 | v2.2.0+ |
| **统一 Workbench Shell**（可调整大小右侧面板，支持文件/终端/工具） | [#7790](https://github.com/agentscope-ai/QwenPaw/pull/7790) | 🟡 在审 | v2.2.0+ |
| **实时语音聊天**（语音输入/播放/打断） | [#7785](https://github.com/agentscope-ai/QwenPaw/pull/7785) | 🟡 在审 | v2.2.0+ |
| **QwenPaw-Data 0.3.0**（数据分析工作流增强） | [#7637](https://github.com/agentscope-ai/QwenPaw/pull/7637) | 🟡 在审 | v2.2.0+ |
| **OpenViking 记忆插件**（可选长期记忆后端） | [#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613) | 🟡 在审 | v2.2.0+ |

### 💡 其他用户需求（尚无明确 PR）

- [#7801](https://github.com/agentscope-ai/QwenPaw/issues/7801)：**Chat 模式选择器**（Discuss vs Execute）—— 区分"讨论模式"与"执行模式"，避免用户仅提问时 Agent 直接执行文件编辑/Shell 命令。
- [#7809](https://github.com/agentscope-ai/QwenPaw/issues/7809)：**工具审批卡片 i18n** —— 当前 Tool Guard 拦截高风险操作（如 `rm`/`del`）时，审批卡片文本硬编码为英文，需国际化支持。
- [#7800](https://github.com/agentscope-ai/QwenPaw/issues/7800)：**任务状态底部栏提醒** —— 任务中断/请求许可/任务完成时，底栏标签显示橙色高亮，提升大显示器多任务场景下的可见性。
- [#7797](https://github.com/agentscope-ai/QwenPaw/issues/7797)：**产物只输出目标文件** —— 当前产物包含大量中间/临时文件，建议只保留最终交付物。
- [#7650](https://github.com/agentscope-ai/QwenPaw/issues/7650)：**频道参数透传给 MCP 工具** —— 来自频道的元数据（如电话号码、工号）应透传给 MCP，而非由 LLM 传递（防止被改写）。

---

## 7. 用户反馈摘要

### 😤 痛点集中区

1. **流式处理稳定性**（#7813, #7814, #7815）
   - 用户报告：SSE 流中一旦出现 malformed frame（如裸 `null` payload），整个对话流冻结，只能强制刷新页面。
   - 场景：生产环境长期使用，网络抖动或后端异常时频繁触发。
   - 情绪： frustration，认为这是"基础健壮性"问题。

2. **subAgent 执行失败**（#7678）
   - 用户报告：v2.2.0 Windows 桌面版，所有 subAgent spawn 后全部 timeout，即使手动延长 timeout 也无济于事。
   - 场景：复杂多步骤任务分解时依赖 subAgent 并行执行。
   - 情绪：困惑（"技术我不懂"），但已通过 AI 调试收集日志，等待框架层修复。

3. **多模态 PDF 处理回归**（#7689, #7799）
   - 用户报告：#7621 修复了非多模态模型的 PDF 处理，但多模态模型仍报错；v2.2.1 中 `send_file_to_user` 图片显示又出现短暂可见后消失的问题。
   - 场景：Agent 需要处理 PDF 文档或发送图片附件。
   - 情绪：不满，认为修复不彻底且引入新回归。

4. **启动后会话状态错乱**（#7812）
   - 用户报告：桌面应用刚启动时，输入的 slash command 作用于空的 fallback session，而非当前界面显示的会话。
   - 场景：用户切换会话后立即输入命令，期望在当前会话执行。
   - 情绪：轻微 annoyance，认为是 race condition。

### 😊 正面反馈

1. **Memory Distill 插件**（#4171）
   - 用户评价："智能记忆整理工具，减少冗余信息存储。"
   - 场景：长期对话用户，需要压缩历史记忆。

2. **Shell 安全加固**（#7120）
   - 用户评价："默认启用安全检查，生产环境更安心。"
   - 场景：Docker/systemd 部署的生产环境。

3. **ACP 体验优化**（#7783）
   - 用户评价："外部代理委托不再重复回复，通信更流畅。"
   - 场景：多代理协作工作流。

---

## 8. 待处理积压

### ⚠️ 长期未响应的重要 Issue

| Issue | 创建日期 | 距今 | 评论数 | 紧急程度 | 建议动作 |
|---|---|---|---|---|---|
| [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | 2026-09-12 | 5 天 | 5 | 🔴 High | 内存耗尽是生产环境致命问题，需优先排查三种路径（unbounded stream buffers, keep-alive stacking, doom-loop evasion）。 |
| [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) | 2026-09-11 | 6 天 | 9 | 🔴 High | subAgent 全部超时影响核心功能，需复现并定位是配置问题还是框架 bug。 |
| [#7813](https://github.com/agentscope-ai/QwenPaw/issues/7813) | 2026-09-16 | 1 天 | 2 | 🔴 High | SSE 流稳定性是基础能力，已有 PR [#7814](https://github.com/agentscope-ai/QwenPaw/pull/7814) 关联，需加速合并。 |
| [#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815) | 2026-09-16 | 1 天 | 4 | 🟡 Medium | Console 懒加载失败后无法恢复，影响用户体验，需与 #7814 一并修复。 |
| [#7792](https://github.com/agentscope-ai/QwenPaw/issues/7792) | 2026-09-15 | 2 天 | 1 | 🟡 Medium | 微信音视频附件处理失败，影响渠道集成稳定性，需确认是否回归。 |

### 📌 建议维护者关注

1. **Hub 多租户功能**（[#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)）
   - 社区呼声最高，PR [#7779](https://github.com/agentscope-ai/QwenPaw/pull/7779) 已在审，建议尽快完成 Review 并入主分支。

2. **SSE 流式健壮性**（[#7813](https://github.com/agentscope-ai/QwenPaw/issues/7813), [#7814](https://github.com/agentscope-ai/QwenPaw/pull/7814)）
   - 多个 Issue 指向同一根因（malformed SSE frame），建议合并修复范围，一次解决。

3. **渠道集成稳定性**（[#7650](https://github.com/agentscope-ai/QwenPaw/issues/7650), [#7792](https://github.com/agentscope-ai/QwenPaw/issues/7792), [#7817](https://github.com/agentscope-ai/QwenPaw/issues/7817)）
   - 飞书/微信渠道频繁上报问题，建议设立专项测试矩阵，覆盖主流渠道的 edge case。

4. **Creator 插件体验**（[#7720](https://github.com/agentscope-ai/QwenPaw/issues/7720), [#7693](https://github.com/agentscope-ai/QwenPaw/issues/7693)）
   - 多图生成审核流程存在逻辑缺陷，建议 Creator 团队介入修复。

---

## 附录：项目健康度指标

| 指标 | 数值 | 评估 |
|---|---|---|
| 过去24h Issue 活跃度 | 25 条 | 🟢 高 |
| 过去24h PR 活跃度 | 36 条 | 🟢 高 |
| Issue 关闭率 | 12/25 = 48% | 🟡 中等（正常水平） |
| PR 合并率 | 12/36 = 33% | 🟡 中等（部分在审） |
| 新版本发布 | 0 | 🟢 稳定期（无破坏性变更风险） |
| 严重 Bug 开放数 | 5 | 🟡 需关注 |
| 社区讨论热度（Issue #7318） | 29 评论 | 🔥 高（路线图核心议题） |

**总体评估**：项目处于**功能扩张期**（多租户 Hub、Workbench、语音聊天等新功能密集迭代），同时面临**技术债务清理**（SSE 稳定性、内存管理、渠道集成）。建议维护者优先处理 SSE 流式健壮性与 subAgent 超时问题，这两个是生产环境最敏感的痛点。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期**：2026-09-17  
**数据源**：GitHub (NousResearch/hermes-agent)  
**分析师**：Agnes (Sapiens AI)

## 1. 今日速览
2026年9月16日，hermes-agent 社区保持极高活跃度，过去24小时内共处理 **500条** Issues 和 **500条** PR 更新，其中292个新Issue活跃，104个PR已合并。项目正处于 v0.21.x 版本的快速迭代期，今日重点集中在修复 `hermes update` 导致的回归问题、优化 Bot Relay 消息传递稳定性以及增强 Desktop 用户体验。整体项目健康度良好，维护者对高优先级Bug响应迅速，但存在多处因更新机制引发的级联回归风险。

## 2. 版本发布
**无新版本发布**。  
当前最新稳定版本为 v0.21.3（2026.9.14），今日主要围绕该版本周边的补丁进行修复。

## 3. 项目进展
今日合并/关闭的关键 PR 主要集中在稳定性修复和用户体验优化：

*   **更新机制修复**：
    *   [#113095](https://github.com/NousResearch/hermes-agent/pull/113095)：修复了共享远程连接下 "Syncing..." 徽章无法自动清除的问题。
    *   [#113093](https://github.com/NousResearch/hermes-agent/pull/113093)：解决了 `hermes update` 后 `atexit` 回调中 `file_signature` 导入错误的回归问题。
    *   [#113091](https://github.com/NousResearch/hermes-agent/pull/113091)：修复了 Linux 桌面启动器在更新后路径切换不一致的问题。
    *   [#113090](https://github.com/NousResearch/hermes-agent/pull/113090)：修复了 Windows 上 `hermes-setup.exe --update` 在输出管道时阻塞的问题。
    *   [#113089](https://github.com/NousResearch/hermes-agent/pull/113089)：改进了 Desktop 监督的 serve/dashboard 进程在更新后的状态报告逻辑。
    *   [#113086](https://github.com/NousResearch/hermes-agent/pull/113086)：阻止了在容器内安装用户级 systemd 单元，防止与宿主机冲突。

*   **Bot Relay 与消息传递**：
    *   [#113092](https://github.com/NousResearch/hermes-agent/pull/113092)：修复了跨机器 DM 消息顺序错乱的问题，确保按发送顺序到达。
    *   [#113422](https://github.com/NousResearch/hermes-agent/pull/113422)：解决了 Bot Chat 中子代理停滞导致主会话永久锁定的问题。
    *   [#113405](https://github.com/NousResearch/hermes-agent/pull/113405)：防止单个不可读的邮箱票证阻塞整个队友 DM 传递流程。
    *   [#113534](https://github.com/NousResearch/hermes-agent/pull/113534)：确保所有投递拒绝都携带具体的类型化原因，而非仅返回 JSON-RPC 代码。

*   **功能与配置修复**：
    *   [#113085](https://github.com/NousResearch/hermes-agent/pull/113085)：修复了切换到 opencode-go 模型时 `base_url` 错误导致 401 的问题。
    *   [#113323](https://github.com/NousResearch/hermes-agent/pull/113323)：修复了配置保存时覆盖空配置的严重 Bug。
    *   [#113327](https://github.com/NousResearch/hermes-agent/pull/113327)：改进了上下文压缩时的重试逻辑，避免无效循环。
    *   [#113340](https://github.com/NousResearch/hermes-agent/pull/113340)：修复了 Desktop 后端启动时使用 profile 显示名称而非目录名导致的命令行错误。

**进展评估**：项目正在系统性清理 v0.21.3 发布后的遗留问题，特别是在更新流程、跨平台兼容性和 Bot 通信稳定性方面取得了实质性进步。

## 4. 社区热点
今日讨论最激烈的 Issues 集中在自动化集成、计费问题和 CLI 稳定性：

1.  **[Issue #88584](https://github.com/NousResearch/hermes-agent/issues/88584)** - *Automated Nous integration is blocked* (108 评论)
    *   **热度分析**：自动化合并流程因 `cron/jobs.py` 冲突而阻塞，影响 Nous 与 Enterkey 的集成节奏。开发者对此高度关注，但尚未解决合并冲突。
2.  **[Issue #110912](https://github.com/NousResearch/hermes-agent/issues/110912)** - *Nous Portal: full/list price charged on some model routes* (20 评论, 1 👍)
    *   **热度分析**：订阅用户在使用特定模型路由时遭遇超额计费，怀疑是折扣路由 Bug 而非信用耗尽。涉及核心商业模式，用户反应强烈。
3.  **[Issue #107402](https://github.com/NousResearch/hermes-agent/issues/107402)** - *`hermes update` leaves a permanent warning* (19 评论)
    *   **热度分析**：更新命令在延迟重启场景下留下误导性警告，影响用户对系统状态判断的信任度。
4.  **[Issue #103483](https://github.com/NousResearch/hermes-agent/issues/103483)** - *muse-spark turns end mid-task* (16 评论, 11 👍)
    *   **热度分析**：特定模型端点过早结束任务并附带无关词，用户体验受损严重，获得大量点赞支持。
5.  **[Issue #111942](https://github.com/NousResearch/hermes-agent/issues/111942)** - *CLI crashes on startup with NameError* (12 评论, 4 👍)
    *   **热度分析**：v0.21.3 引入的严重回归，导致 CLI 完全无法启动，已迅速通过 [#113093](https://github.com/NousResearch/hermes-agent/pull/113093) 得到修复。

## 5. Bug 与稳定性
今日报告的严重 Bug 及状态：

| 严重级别 | 问题描述 | Issue/PR | 状态 |
| :--- | :--- | :--- | :--- |
| **P0** | CLI 启动崩溃：`NameError: name 'file_signature' is not defined` | [#111942](https://github.com/NousResearch/hermes-agent/issues/111942) | **已修复** (通过 [#113093](https://github.com/NousResearch/hermes-agent/pull/113093)) |
| **P1** | `hermes update` 后 gateway 重启阶段出现 transient ImportError | [#112522](https://github.com/NousResearch/hermes-agent/issues/112522) | **已修复** (通过 [#113093](https://github.com/NousResearch/hermes-agent/pull/113093)) |
| **P1** | Desktop Bot Mode 点击侧边栏机器人无响应（非确定性） | [#105104](https://github.com/NousResearch/hermes-agent/issues/105104) | 开放 |
| **P1** | Cron 任务心跳超时导致成功交付被标记为中断 | [#105861](https://github.com/NousResearch/hermes-agent/issues/105861) | 开放 |
| **P2** | Desktop 应用切换本地/远程网关时不刷新会话列表 | [#92352](https://github.com/NousResearch/hermes-agent/issues/92352) | 开放 |
| **P2** | Desktop clarify 卡片从不渲染，事件在传输路由中丢失 | [#98503](https://github.com/NousResearch/hermes-agent/issues/98503) | 开放 |
| **P2** | Keet gateway 设置崩溃：`TypeError: _n() missing required argument 'config'` | [#97065](https://github.com/NousResearch/hermes-agent/issues/97065) | 开放 |
| **P2** | 并发会话相互污染（共享内存注入 + 共享 git worktree） | [#46303](https://github.com/NousResearch/hermes-agent/issues/46303) | 开放 |

**稳定性评估**：今日主要威胁来自 `hermes update` 机制引发的级联失败，但核心团队已通过多个 salvage PR 快速响应。未解决的 P2/P3 问题多集中在 Desktop 界面状态同步和并发会话隔离上。

## 6. 功能请求与路线图信号
*   **RFC: script-speed computer use** ([#112639](https://github.com/NousResearch/hermes-agent/issues/112639))：提议通过语义状态、预执行和自我研究实现脚本级速度的计算机使用。这是一个架构级请求，旨在让常规计算机交互感觉像编译后的脚本一样流畅。
*   **Self-tuning harness** ([#111237](https://github.com/NousResearch/hermes-agent/issues/111237))：提议增加可选的本地进化循环，仅保留统计上有效的微调。这是对需求侧的补充，与供应侧的改进配合。
*   **Desktop heartbeat controls in place edit** ([#113326](https://github.com/NousResearch/hermes-agent/pull/113326))：已合并/开放，允许直接在桌面卡片中编辑心跳控制，提升 UX。
*   **Stripe & Plex Music Plugins** ([#113335](https://github.com/NousResearch/hermes-agent/pull/113335), [#113516](https://github.com/NousResearch/hermes-agent/pull/113516))：社区贡献的插件集成，扩展了 Hermes 的生态能力。

**路线图判断**：项目正朝着更智能的自适应系统（self-tuning）和更流畅的计算机交互方向发展，同时积极拓展第三方插件生态。

## 7. 用户反馈摘要
*   **痛点**：
    *   **更新过程不可靠**：用户多次报告 `hermes update` 后出现导入错误、进程状态混乱或警告残留（[#107402](https://github.com/NousResearch/hermes-agent/issues/107402), [#112522](https://github.com/NousResearch/hermes-agent/issues/112522)）。
    *   **计费不透明**：订阅用户在特定模型路由下被全额计费，引发信任危机（[#110912](https://github.com/NousResearch/hermes-agent/issues/110912)）。
    *   **Desktop 状态不同步**：会话列表、心跳状态和 Bot 响应在界面层存在延迟或错误显示（[#92352](https://github.com/NousResearch/hermes-agent/issues/92352), [#86565](https://github.com/NousResearch/hermes-agent/issues/86565), [#105104](https://github.com/NousResearch/hermes-agent/issues/105104)）。
    *   **模型行为异常**：muse-spark 等模型在任务未完成时过早结束（[#103483](https://github.com/NousResearch/hermes-agent/issues/103483)）。
*   **满意点**：
    *   社区对快速修复回归（如 CLI 启动崩溃）表示认可。
    *   Bot Relay 消息顺序和稳定性的改进受到关注（[#113092](https://github.com/NousResearch/hermes-agent/pull/113092)）。
    *   插件生态的扩展（Stripe, Plex）丰富了使用场景。

## 8. 待处理积压
*   **[Issue #59293](https://github.com/NousResearch/hermes-agent/issues/59293)** - *hermes config set bypasses system-config write protection* (P2, Security)
    *   长期存在的安全隐患，CLI 可以无门槛绕过配置保护，需决策如何处理。
*   **[Issue #43666](https://github.com/NousResearch/hermes-agent/issues/43666)** - *Redaction gaps at the persistence boundary* (P2, Security)
    *   持久化边界存在敏感信息泄露风险（如密码明文存储在 state.db），需彻底解决。
*   **[Issue #46303](https://github.com/NousResearch/hermes-agent/issues/46303)** - *Concurrent sessions cross-contaminate* (P2)
    *   并发会话隔离问题未解决，影响多任务处理的安全性。
*   **[Issue #88584](https://github.com/NousResearch/hermes-agent/issues/88584)** - *Automated Nous integration is blocked* (P3)
    *   自动化集成流程阻塞超过一个月，影响开发效率。
*   **[Issue #109966](https://github.com/NousResearch/hermes-agent/issues/109966)** - *state.db WAL generation issues* (P3)
    *   虽然 Reporter 更新称在特定 commit 后不再重现，但该问题仍需持续监控以防复发。

**建议**：优先关注安全性 Issue (#59293, #43666) 和更新机制的稳定性（已完成大部分修复，需验证长期效果）。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期：** 2026-09-17  
**分析师：** Agnes (Sapiens AI)

## 1. 今日速览
今日 AstrBot 项目保持高活跃度，24小时内共更新 **3** 个 Issues 和 **15** 个 PRs，其中 PR 合并/关闭数为 1（主要为开发中的修复与功能分支）。整体态势以**后端稳定性修复**和**多媒体处理优化**为主，涉及 TTS 序列化、知识库上传容错及 OneBot 消息解析等核心链路。无新版本发布，但多个关键 Bug 修复正在推进中，项目健康度良好。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日主要进展集中在以下 PR 的审查与合并准备中：
*   **文档预览体验优化 (#10108)**：由核心贡献者 @Soulter 提交，改进了聊天数据预览 UI，支持 Markdown 渲染和自适应文字大小，提升了运维调试体验。
*   **流式输出稳定性修复 (#10067)**：解决了 QQ 官方机器人 C2C 私聊场景下流式消息回滚至首包的问题，这对提升长文本回复的用户感知至关重要。
*   **多媒体格式兼容修复**：系列 PR (#10113, #10111) 修复了 CSV 引号内换行、`.xls` 文件读取值错误以及 GIF 动图处理逻辑，增强了 Skills 模块的数据解析鲁棒性。
*   **TTS 并发与认证修复**：@xiongyuyang 提交了三个 PR (#10098, #10099, #10100, #10101)，分别解决了 OneBot 文件 ID 解析、GPT-SoVITS 大小写敏感、Azure/CosyVoice TTS 客户端生命周期管理及认证令牌隔离问题，显著提升了语音合成服务的稳定性。

## 4. 社区热点
*   **WebUI 改版节奏与文档同步 (#10086)**：用户 @lingyun14beta 提出 WebUI 频繁重设计导致文档滞后，建议建立“前端改动+文档更新”的强耦合机制。此 Issue 反映了用户对一致性体验的强烈诉求，建议维护者在后续大改版中优先响应。 [链接](https://github.com/AstrBotDevs/AstrBot/issues/10086)
*   **Serply 搜索引擎集成 (#1038)**：@googio 提议添加 Serply 作为新的网页搜索提供商，填补现有 Provider 无法直接获取 Google 实时结果的空白。该 PR 已开放讨论，若合并将丰富用户的搜索选项。 [链接](https://github.com/AstrBotDevs/AstrBot/pull/1038)
*   **手动上下文压缩 (#9795)**：@C10H14N2O5 实现了 `/compact` 命令，允许用户在自动阈值触发前手动触发 LLM 上下文压缩，为长对话场景提供了更多控制权。 [链接](https://github.com/AstrBotDevs/AstrBot/pull/9795)

## 5. Bug 与稳定性
*   **[高] 知识库上传后文档数为0 (#10109)**：
    *   **现象**：在 Linux/Docker 环境下，上传 Excel/Doc 后，界面显示文档数和分片数为 0，日志报错“写入知识库索引时出错”。
    *   **原因**：嵌入模型（如 DashScope）输入长度限制导致批次处理失败。
    *   **状态**：已有修复 PR **#10110** (@Mola-maker) 正在解决此问题，通过调整批次大小和错误处理逻辑来兼容嵌入服务的输入限制。
*   **[中] QQ 流式消息回滚 (#10067)**：
    *   **现象**：QQ 官方机器人开启流式输出后，完整回复回滚为首包片段。
    *   **状态**：PR **#10067** (@Linyesantan) 已提交修复，通过完善 `send_buffer` 的最终状态管理来解决。
*   **[中] GPT-SoVITS 路径大小写问题 (#10099)**：
    *   **现象**：参数被强制小写，导致大小写敏感的文件系统上找不到参考音频。
    *   **状态**：PR **#10099** 已提交修复，保留原始参数大小写。

## 6. 功能请求与路线图信号
*   **增强网页搜索能力**：Issue #1038 提出的 Serply 集成，以及现有的 Brave/Tavily 等 Provider，显示用户对高质量实时联网搜索有持续需求。路线图可能进一步丰富搜索后端。
*   **精细化上下文管理**：Issue #9795 的手动压缩功能，以及 #10103 关于 GIF 拼图处理的讨论，表明用户对更细粒度的 AI 交互控制（如视觉处理开关、对话长度管理）有明确需求。
*   **界面与文档协同**：Issue #10086 强烈暗示未来 WebUI 迭代流程中，文档维护和前端重构将被纳入同等重要的工程规范。

## 7. 用户反馈摘要
*   **痛点**：文档更新滞后于前端改版，导致用户操作困惑（#10086）；知识库上传后无反馈且数据丢失，严重影响 RAG 功能可用性（#10109）；QQ 流式消息显示异常影响阅读体验（#10067）。
*   **满意点**：对新增搜索 Provider 和手动上下文控制等功能表示期待；TTS 服务稳定性和兼容性的改进受到关注。
*   **使用场景**：Linux Docker 部署的知识库构建、QQ 官方机器人的长文本流式回复、OneBot 平台的多文件消息处理。

## 8. 待处理积压
*   **Issue #10103 [GIF 动图多帧拼图]**：用户反馈 AI 无法识别 GIF 经过多帧拼图后的处理结果，建议提供提示或关闭开关。此 Issue 评论较少，尚未看到对应 PR，属于待确认的功能性需求。 [链接](https://github.com/AstrBotDevs/AstrBot/issues/10103)
*   **PR #10113, #10112, #10111**：虽然都是修复性质，但涉及 CSV、文件编辑和 XLS 解析的核心逻辑变更，需确保充分测试后再合并，避免引入回归。
*   **PR #10108**：UI 改动需确保在不同主题和分辨率下表现一致，并检查是否影响无障碍访问。

---
*本报告基于 GitHub 公开数据生成，数据截止至 2026-09-17。*

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：2026-09-17**

## 1. 今日速览
DeepSeek Harness 社区在过去 24 小时内保持高度活跃，Discussions 新增 165 条更新，显示出用户群体对工具链深度定制和稳定性的高度关注。当前无新版本发布，但社区讨论集中在安全性扩展（加密凭据库）、多模型兼容性适配（OpenCode Go 头字段）以及关键性能瓶颈排查（Electron 打包导致的启动变慢）。整体健康度良好，但在 Windows 子进程稳定性和会话迁移路径上存在明显的痛点反馈，需维护者关注底层兼容性问题。

## 2. 版本发布
**无新版本发布。**

> 注：基于 GitHub Releases 数据为空，且项目通过 Releases 记录合并摘要。本轮周期无代码合并落地为新的正式版本。

## 3. 项目进展
由于 Issues/PRs 未启用，代码合并均通过 Releases 落地。本周期无官方发布的 Release Notes，因此无明确的合并摘要记录。

*   **潜在技术债积累**：Discussion #6391 指出 v0.1.5 的 Electron 打包特性（commit `19444907`）导致了客户端模块重组合并次数激增，这是当前潜在的性能退步风险点，需官方确认是否已在后续开发中优化。

## 4. 社区热点
以下是过去 24 小时评论数最多、关注度最高的 3 个 Discussion：

1.  **[Ideas] dsh-vault — 加密凭据保险库插件**
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/1457
    *   **热度**: 247 评论 | 创建: 2026-08-14 | 更新: 2026-09-16
    *   **分析**: 社区对敏感凭据（SSH, API Keys, TOTP）的安全存储需求强烈。开发者 @Ox0400 提供的插件方案基于 Node 内置 crypto 模块，零外部依赖，符合安全最佳实践。高关注度表明用户希望 Harness 成为个人 AI 工作流的中枢，而不仅仅是代码执行工具。

2.  **[Ideas] 求一个 memory 能力**
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/14
    *   **热度**: 37 评论 | 创建: 2026-08-13 | 更新: 2026-09-16
    *   **分析**: 用户希望迁移 Codex 和 Claude Code 的 Memory 功能。这反映了用户对跨代理上下文持久化的通用需求，Harness 需要建立标准化的 Memory 接口以留住高阶用户。

3.  **[Ideas] Please send x-opencode-session header on API requests**
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/5495
    *   **热度**: 27 评论 | 创建: 2026-09-03 | 更新: 2026-09-16
    *   **分析**: OpenCode Go 托管推理 API 自 09/05 起强制要求 `x-opencode-session` 头以进行路由和优化。25k 用户组织受影响。这是一个紧急的兼容性需求，需官方尽快支持该头部的自动注入。

## 5. Bug 与稳定性
本周期报告了多个影响体验的 Bug，按严重程度排列如下：

| 严重程度 | 问题描述 | Discussion 链接 | 状态 |
| :--- | :--- | :--- | :--- |
| **高** | **v0→v3 迁移 fail-closed**: 0.1.5-rc.1 升级后，49/123 旧会话无法打开，特别是 inbox/spliced 类型会话报错 `SessionFormatUnsupportedError`。 | [#6559](https://github.com/deepseek-ai/deepseek-harness/discussions/6559) | 已提供本地修复配方 (0/49→49/49)，但需官方修复迁移逻辑 |
| **高** | **Host 进程崩溃**: Windows 下，当 `%TEMP%\dsh-subprocess-*` 被清理工具（如 CCleaner）移除时，`OutputCollector.spillAll` 触发 ENOENT 崩溃。 | [#2252](https://github.com/deepseek-ai/deepseek-harness/discussions/2252) | 未修复，属高危稳定性问题 |
| **中** | **sandbox 权限升级错误**: 调用 sandbox 工具时报错 "sandbox escalation to 'workspace-write' is not strictly wider than... 'danger-full-access'"。 | [#201](https://github.com/deepseek-ai/deepseek-harness/discussions/201) | 未修复，影响特定模型工具调用链 |
| **中** | **HTTP Channel 注册失败**: 升级至 0.1.3-alpha.2 后，第三方插件（如 dsh-ssh）注册 HTTP channel 时因缺少 `webServer` inject 导致启动失败。 | [#5926](https://github.com/deepseek-ai/deepseek-harness/discussions/5926) | 回归问题，与 #6391 提到的 Electron 打包改动相关 |
| **低** | **Windows 黑窗闪现**: pwsh/子进程执行时弹出黑色控制台窗口，干扰使用。 | [#3460](https://github.com/deepseek-ai/deepseek-harness/discussions/3460) | 建议添加 `windowsHide` 选项 |
| **低** | **Output token limit**: 用户使用 dsh 时频繁遇到输出令牌限制错误。 | [#1166](https://github.com/deepseek-ai/deepseek-harness/discussions/1166) | 通用配置问题，非代码 Bug |

## 6. 功能请求与路线图信号
*   **后台运行/开机自启**: Discussion #6796 请求 `dsh web` 支持后台守护进程模式。目前用户需手动维持终端或编写脚本绕过安全软件限制，这是提升桌面端体验的关键功能。
*   **会话标题生成修复**: Discussion #3468 指出在使用 Reasoning (Thinking) 模型时，辅助会话标题生成调用静默失败。建议提供禁用 reasoning 模式的配置选项，以保证基本功能可用性。
*   **插件版本锁定机制**: Discussion #5874 建议限制插件版本兼容性，只有支持当前 dsh 版本的插件才可被引入，以减少版本错配导致的启动失败。

## 7. 用户反馈摘要
*   **性能痛点**: 用户 @Start-Gao 在 #6391 中详细分析了启动时间从 2.7s 劣化至 17s 的原因，定位为 `ClientModuleRegistry` 的 `inject` 依赖变化导致客户端模块重组合并次数增加。这是高质量的性能反馈，直接指向了 v0.1.5 的变更。
*   **历史数据可读性**: Discussion #3631 和 #6559 反映出会话历史读取路径存在隐蔽的逻辑缺陷，尤其是中止状态（aborted-turn）的处理和格式迁移的健壮性，严重影响用户的数据资产安全。
*   **客户端平台悬停**: Discussion #1607 报告 `cordis_inspect_query` 在平台无响应时会永久挂起，导致 Agent 冻结，缺乏超时机制是主要不满点。

## 8. 待处理积压
*   **#1457 (dsh-vault)**: 虽然为社区插件，但极高的关注度表明官方可能考虑将其纳入核心安全模块或提供标准的凭据管理接口。
*   **#2252 (Windows 崩溃)**: 长期存在的稳定性问题，涉及操作系统级交互（临时文件清理），需优先处理以保障 Windows 用户的稳定性基线。
*   **#5495 (OpenCode Header)**: 随着截止日期临近（09/05），此兼容性问题的解决时效性较高，影响大量企业用户。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*