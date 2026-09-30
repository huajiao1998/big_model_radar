# OpenClaw 生态日报 2026-09-30

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-30 00:52 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 — 2026-09-30

## 1. 今日速览

OpenClaw 在 2026-09-30 保持高活跃度，过去 24 小时共处理 **500 条 Issue** 和 **500 条 PR**，其中新开/活跃 Issue 434 条，已关闭 66 条；PR 待合并 345 条，已合并/关闭 155 条。社区关注焦点集中在 `prepared-model-catalog` worker 内存泄漏（P0）、Gateway 状态生命周期冲突、以及多平台渠道稳定性上。近期发布的 v2026.8.33 为 extended-stable（LTS 等效）版本，而最新正式版为 2026.9.6，当前正在追踪 2026.9.7 的修复清单。整体项目健康度承压明显，大量 P0/P1 问题指向生产环境稳定性风险，需维护者重点关注。

## 2. 版本发布

### v2026.8.33 (extended-stable / LTS 等效)
- **性质**：网关专用（gateway-only）的 extended-stable 发布，等效于 LTS。
- **内容**：包含 2026 年 8 月末代码基线 + 关键安全更新、可靠性与性能修复，以及新模型支持。
- **当前最新**：[2026.9.6](https://github.com/openclaw/openclaw/releases) 为最新正式版本。
- **迁移注意**：从旧版本升级时需注意 schema 迁移（如 #161290 报告了 session SQLite 迁移恢复问题）；managed service 更新前缀检查可能失败（#158231、#154924）。

## 3. 项目进展

今日合并/关闭的重要 PR 包括：

| PR | 作者 | 说明 |
|----|------|------|
| [#161446](https://github.com/openclaw/openclaw/pull/161446) | @IstiqlalBhat | 更新 Managed Codex catalog 至 0.159.1，支持 GPT-6.1 Sol |
| [#161462](https://github.com/openclaw/openclaw/pull/161462) | @chelsealong | 修复 `microsoft-foundry/MAI-Image-2.6` 图像编辑支持 |
| [#161410](https://github.com/openclaw/openclaw/pull/161410) | @ericcaiwx-star | 修复 Discord auto-reply 在完成源回复后显示矛盾 fallback 错误 |
| [#160699](https://github.com/openclaw/openclaw/pull/160699) | @eleqtrizit | Tlon 渠道身份验证加固，拒绝未认证 club chat |
| [#161006](https://github.com/openclaw/openclaw/pull/161006) | @Marvinthebored | 修复 heartbeat 回复错误发布到 heartbeat 渠道的问题 |
| [#161470](https://github.com/openclaw/openclaw/pull/161470) | @roboclaw-bot | 修复 Web UI 转发消息预览中间截断问题 |
| [#157693](https://github.com/openclaw/openclaw/pull/157693) | @roboclaw-bot | **关键修复**：防止单个 agent 数据库清理失败阻塞所有 agent（关联 #157325） |
| [#161082](https://github.com/openclaw/openclaw/pull/161082) | @steipete | 修复 OpenAI Responses 截断后重复 oversized tool calls |
| [#161444](https://github.com/openclaw/openclaw/pull/161444) | @sjf-oa | 修复 Agents API 重试在 steering 接受后失败的问题 |
| [#161466](https://github.com/openclaw/openclaw/pull/161466) | @pengying | WhatsApp 连接重试耗尽后恢复在线 |
| [#158447](https://github.com/openclaw/openclaw/pull/158447) | @carlosjarenom | 修复 Bun Gateway 更新时子进程无限 spawned 问题 |
| [#161089](https://github.com/openclaw/openclaw/pull/161089) | @steipete | 修复日志脱敏在长文本上的性能卡顿 |
| [#161463](https://github.com/openclaw/openclaw/pull/161463) | @steipete | 修复依赖安全通告导致发布失败/延迟的问题 |

**整体推进**：今日 PR 集中在稳定性修复和渠道适配，特别是数据库锁竞争、内存泄漏缓解、以及多平台消息投递可靠性。项目正在从 2026.9.6 的回归问题中恢复，但仍有大量 P0 问题待解决。

## 4. 社区热点

### 最活跃 Issues（按评论数）

1. **[#143524](https://github.com/openclaw/openclaw/issues/143524)** — Agent SQLite WAL 无限增长至 1.4–2.8 GB，阻塞 Gateway 启动（Windows，94 条评论，P0）
   - **诉求**：WAL checkpoint 机制失效，用户要求根本性修复而非手动 TRUNCATE

2. **[#119720](https://github.com/openclaw/openclaw/issues/119720)** — 同步持久化阻塞 Gateway 事件循环（22 条评论，P1）
   - **诉求**：大规模部署下事件循环阻塞导致响应延迟

3. **[#157067](https://github.com/openclaw/openclaw/issues/157067)** — Windows isolated cron 环境 Proxy 传递问题（已关闭，19 条评论）
   - **状态**：已解决

4. **[#111897](https://github.com/openclaw/openclaw/issues/111897)** — 并发运行导致重复回复（19 条评论，P1）
   - **诉求**：session lane 并发控制缺陷

5. **[#97616](https://github.com/openclaw/openclaw/issues/97616)** — Hook/tool 子进程泄漏导致 zombie 积累（16 条评论，P1）
   - **诉求**：长期运行的 Gateway 性能退化

### 最活跃 PRs

- [#161446](https://github.com/openclaw/openclaw/pull/161446) Codex catalog 更新
- [#160590](https://github.com/openclaw/openclaw/pull/160590) Gateway 负载下 node launch 答案丢失修复
- [#118657](https://github.com/openclaw/openclaw/pull/118657) Google API key 支持 web search

## 5. Bug 与稳定性

### P0 严重级别（Release Blocker）

| Issue | 标题 | 状态 | Fix PR |
|-------|------|------|--------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | SQLite WAL 无限增长 | OPEN | 无 |
| [#157531](https://github.com/openclaw/openclaw/issues/157531) | 2026.9.7 Fixes Tracker | OPEN | — |
| [#157325](https://github.com/openclaw/openclaw/issues/157325) | 单个 agent DB 卡住导致所有 agent 失败 | OPEN | [#157693](https://github.com/openclaw/openclaw/pull/157693) ✅ |
| [#156571](https://github.com/openclaw/openclaw/issues/156571) | model-catalog worker 泄漏 1-3 GB/min | OPEN | 无 |
| [#157160](https://github.com/openclaw/openclaw/issues/157160) | Gateway crash-loop on plugin-doctor | CLOSED | — |
| [#159612](https://github.com/openclaw/openclaw/issues/159612) | Subagent settlement 无限重试 | OPEN | 无 |
| [#158095](https://github.com/openclaw/openclaw/issues/158095) | SQLite state-lifecycle 获取失败 | OPEN | 无 |
| [#155859](https://github.com/openclaw/openclaw/issues/155859) | Gateway 启动时间与插件数量成正比 | OPEN | 无 |
| [#159596](https://github.com/openclaw/openclaw/issues/159596) | Gateway 内存锯齿状增长 | OPEN | 无 |
| [#160548](https://github.com/openclaw/openclaw/issues/160548) | prepared-model-catalog worker 泄漏 ~1 GiB/5min | OPEN | 无 |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | prepared-model-catalog worker 无界内存泄漏 ~4-5 GB/h | OPEN | 无 |
| [#152965](https://github.com/openclaw/openclaw/issues/152965) | Hot-reload 断开 channel 插件 | OPEN | 无 |
| [#158936](https://github.com/openclaw/openclaw/issues/158936) | macOS watchdog SIGTERM 导致重启循环 | OPEN | 无 |

### P1 重要 Bug

| Issue | 标题 | 状态 |
|-------|------|------|
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 同步持久化阻塞事件循环 | OPEN |
| [#121661](https://github.com/openclaw/openclaw/issues/121661) | CLI-backed subagent tool-free | OPEN |
| [#121953](https://github.com/openclaw/openclaw/issues/121953) | Cron turns 在 DeepSeek 上 stall | OPEN |
| [#127148](https://github.com/openclaw/openclaw/issues/127148) | Codex sessions.compact 冲突 | OPEN |
| [#157630](https://github.com/openclaw/openclaw/issues/157630) | --max-old-space-size 覆盖 worker 限制 | OPEN |
| [#157617](https://github.com/openclaw/openclaw/issues/157617) | Session writer queue 等待数分钟 | OPEN |
| [#132303](https://github.com/openclaw/openclaw/issues/132303) | claude-cli tools.deny 未生效 | OPEN |
| [#158332](https://github.com/openclaw/openclaw/issues/158332) | Message-less 交付导致 politeness loops | OPEN |
| [#150132](https://github.com/openclaw/openclaw/issues/150132) | claude-cli stdout 8 MiB 上限截断回复 | OPEN |
| [#147420](https://github.com/openclaw/openclaw/issues/147420) | MCP computer tool 执行未释放 | OPEN |

### 关键趋势

- **内存泄漏**：`prepared-model-catalog.worker.js` 成为最高频 P0 问题源头（#156571、#159596、#160548、#159662、#160522），日均产生 200+ critical memory-pressure 事件
- **数据库锁竞争**：SQLite state-lifecycle 获取失败（#158095、#159094）影响多 agent 并发
- **渠道稳定性**：Telegram（#126246）、WhatsApp（#161466 ✅）、Signal（#116520）均有 reported issues

## 6. 功能请求与路线图信号

| Issue/PR | 类型 | 说明 | 可能性 |
|----------|------|------|--------|
| [#16670](https://github.com/openclaw/openclaw/issues/16670) | Feature | Onboarding Wizard 应包含 Memory/Embedding 配置 | 中（长期 open，2 👍） |
| [#156341](https://github.com/openclaw/openclaw/issues/156341) | RFC | Task-scoped decision models | 低（RFC 阶段） |
| [#123837](https://github.com/openclaw/openclaw/pull/123837) | Feature | Telegram copy-text presentation buttons | 高（PR 已准备） |
| [#157557](https://github.com/openclaw/openclaw/pull/157557) | Feature | Claws adopt existing workspaces | 中（PR 待 review） |
| [#118806](https://github.com/openclaw/openclaw/pull/118806) | Fix | Remove yield from leaf subagents | 高（autofix PR） |

**路线图信号**：
- 短期：内存泄漏修复、数据库锁优化、渠道稳定性增强
- 中期：子代理模型简化（#118806）、Telegram 新特性
- 长期：决策模型任务级作用域（#156341 RFC）

## 7. 用户反馈摘要

### 主要痛点

1. **内存管理失控**
   - "prepared-model-catalog worker 每小时泄漏 4-5 GB" (#159662)
   - "内存锯齿状增长，每天 200+ critical 事件" (#159596)
   - "即使设置 maxOldGenerationSizeMb: 512，worker 仍达到 1.15 GB" (#160522)

2. **数据库相关问题**
   - "WAL 文件几天内增长到 2.8 GB，手动 TRUNCATE 后再次增长" (#143524)
   - "单个 agent 的 DB 问题导致所有 agent 失败" (#157325)
   - "state-lifecycle lease 冲突，内部 worker 报告另一个进程拥有" (#159094)

3. **性能退化**
   - "Gateway 启动时间随插件数量线性增长" (#155859)
   - "Session writer queue 等待数分钟" (#157617)
   - "日志脱敏在长文本上卡顿数秒" (#161089)

4. **渠道稳定性**
   - "Telegram 消息卡在 send_attempt_started，重启后丢失" (#126246)
   - "Hot-reload 非 channel 插件会断开所有 channel 插件" (#152965)
   - "Windows cron 环境 Proxy 传递失败" (#157067 ✅ closed)

### 满意点
- 部分修复已合并（#157693 防止单 agent 阻塞全局）
- WhatsApp 连接恢复机制已修复（#161466）
- ClawSweeper 自动化修复持续贡献 PR

## 8. 待处理积压

### 长期未响应的重要 Issue（>30 天未更新或无 Fix PR）

| Issue | 创建日期 | 天数 | 严重级别 | 状态 |
|-------|----------|------|----------|------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 2026-09-09 | 21 天 | P0 | 无 Fix PR |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 2026-06-29 | 93 天 | P1 | 无 Fix PR |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 2026-08-05 | 56 天 | P1 | 部分修复，未根除 |
| [#111897](https://github.com/openclaw/openclaw/issues/111897) | 2026-07-20 | 72 天 | P1 | 无 Fix PR |
| [#156571](https://github.com/openclaw/openclaw/issues/156571) | 2026-09-23 | 7 天 | P0 | 无 Fix PR |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | 2026-09-27 | 3 天 | P0 | 无 Fix PR |
| [#160548](https://github.com/openclaw/openclaw/issues/160548) | 2026-09-28 | 2 天 | P0 | 无 Fix PR |
| [#132303](https://github.com/openclaw/openclaw/issues/132303) | 2026-08-29 | 32 天 | P1 | 无 Fix PR |
| [#150132](https://github.com/openclaw/openclaw/issues/150132) | 2026-09-16 | 14 天 | P1 | 无 Fix PR |
| [#152965](https://github.com/openclaw/openclaw/issues/152965) | 2026-09-19 | 11 天 | P0 | 无 Fix PR |

### 建议优先级

1. **紧急**：#143524（WAL 增长）、#159662/#160548（内存泄漏）— 直接影响生产稳定性
2. **高**：#152965（Hot-reload 断开渠道）、#157325/#157693（DB 锁竞争）
3. **中**：#132303（tools.deny 安全绕过）、#111897（重复回复）

---

**报告生成时间**：2026-09-30  
**数据来源**：GitHub API (github.com/openclaw/openclaw)  
**分析模型**：Agnes-2.5-Flash (Sapiens AI)

---

## 横向生态对比

# 个人 AI 助手开源生态横向分析报告
**日期：2026-09-30 | 分析师：Agnes-2.5-Flash**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正从**功能竞赛**转向**稳定性与安全性并重**的关键阶段。OpenClaw 作为体量最大的项目，面临严峻的生产环境稳定性挑战（内存泄漏、数据库锁竞争）；Zeroclaw 聚焦安全加固与配置现代化；PicoClaw 深耕 Web UI 体验优化；QwenPaw 展现高强度的多平台适配能力；Hermes-Agent 与 AstrBot 分别在企业级部署与轻量级机器人场景形成差异化优势；DeepSeek Harness 依托官方资源快速迭代桌面端能力。整体生态呈现"**大型项目修漏、中型项目筑底、垂直项目差异化**"的格局。

---

## 2. 各项目活跃度对比

| 项目 | Issues (24h) | PRs (24h) | Release | 健康度 | 核心风险 |
|------|-------------|-----------|---------|--------|----------|
| **OpenClaw** | 500 | 500 | v2026.9.6 (LTS: 2026.8.33) | 🟡 承压 | 12+ P0 未修复，内存泄漏日均 200+ 事件 |
| **Zeroclaw** | 27 | 50 | 无 | 🟢 良好 | 安全漏洞密集发现期，处于收紧阶段 |
| **PicoClaw** | 6 | 2 | 无 | 🟢 良好 | 积压性能问题 (#3281, #440) |
| **QwenPaw** | 12 | 36 | 2.2.1 (stable), 2.2.2b3/b4 (beta) | 🟢 良好 | 2 个 P0 待修复 (#8022, #8034) |
| **Hermes-Agent** | 500 | 500 | 无 | 🟡 一般 | Windows/macOS 安装循环、高 CPU 占用 |
| **AstrBot** | 8 | 21 | 无 | 🟢 良好 | 2 个高优先级 Bug 待合并 (#10263, #10275) |
| **DeepSeek Harness** | 223 discussions | N/A | v0.2.0-rc.2 | 🟢 良好 | 会话持久化稳定性 (#8084, #7995) |

---

## 3. OpenClaw 在生态中的定位

**体量与影响力**：OpenClaw 是生态中 Issue/PR 处理量最大（各 500 条/24h）的项目，表明其用户基数最广泛、生态依赖最深。

**技术路线差异**：
- **对比 Zeroclaw**：OpenClaw 侧重**多平台渠道集成**（Telegram/WhatsApp/Discord），Zeroclaw 侧重**安全权限模型**（OIDC、委托记忆隔离）
- **对比 QwenPaw**：OpenClaw 是**通用网关架构**，QwenPaw 是**多 Bot 协议适配层**（QQ/Telegram/WeCom）
- **对比 Hermes-Agent**：OpenClaw 是**Node.js 服务端**，Hermes 是**桌面客户端优先**（Electron + 本地模型）

**社区规模信号**：OpenClaw 的 P0 问题数量（12+）远超其他项目，反映其**生产部署规模最大**，同时也暴露了**技术债务累积**的风险。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|----------|----------|----------|
| **内存管理与泄漏修复** | OpenClaw, Hermes-Agent | OpenClaw: prepared-model-catalog worker 每小时泄漏 4-5 GB；Hermes: macOS 桌面端空闲 CPU 40-70% |
| **会话持久化与状态同步** | OpenClaw, DeepSeek Harness, PicoClaw | OpenClaw: SQLite WAL 无限增长；DeepSeek: 会话文件损坏；PicoClaw: "幽灵会话"丢失 |
| **多平台渠道稳定性** | OpenClaw, QwenPaw, AstrBot | OpenClaw: Telegram/WhatsApp 连接重试；QwenPaw: QQ 网关重连事件重复；AstrBot: OneBot 版本支持 |
| **上下文窗口管理** | DeepSeek Harness, Zeroclaw, PicoClaw | DeepSeek: 自动压缩失效；Zeroclaw: 32k token 硬编码限制；PicoClaw: 长历史输入卡顿 |
| **安全与权限模型** | Zeroclaw, OpenClaw | Zeroclaw: 委托记忆工具丢失 principal 作用域；OpenClaw: MCP OAuth 流程局限性 |
| **数据库锁竞争** | OpenClaw, QwenPaw | OpenClaw: SQLite state-lifecycle 获取失败；QwenPaw: TaskTracker 僵尸条目 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 | 差异化优势 |
|------|----------|----------|----------|------------|
| **OpenClaw** | 多渠道网关 + 模型路由 | 企业/开发者（大规模部署） | Node.js + 微服务架构 | 渠道覆盖最广（Telegram/WhatsApp/Discord/Signal） |
| **Zeroclaw** | 安全权限 + 配置现代化 | 安全敏感型组织 | Rust/Go（推断） | OIDC 基础设施、委托记忆隔离 |
| **PicoClaw** | Web UI 体验 + 轻量对话 | 个人用户、日常 Chat | Node.js + Web UI | 快速响应 UI 痛点（队列状态可见性） |
| **QwenPaw** | 多 Bot 协议适配 | 国内用户（QQ/微信） | Node.js + 多平台适配层 | Telegram 精细化体验、桌面端跨平台 |
| **Hermes-Agent** | 桌面客户端 + 本地模型 | 隐私敏感用户、Mac 用户 | Electron + llama.cpp | 本地模型优先、Nous Portal 集成 |
| **AstrBot** | 轻量级机器人框架 | 个人开发者、团队部署 | Python + OneBot 协议 | Persona 系统、知识库 Rerank |
| **DeepSeek Harness** | 桌面端 AI 工作区 | 开发者、技术用户 | Node.js + 原生菜单集成 | 零依赖安装、dsh 命令行集成 |

---

## 6. 社区热度与成熟度

### 快速迭代阶段
- **DeepSeek Harness**: v0.2.0-rc.2 密集发布，桌面端功能快速补全
- **QwenPaw**: 单日 7 个 PR 由核心贡献者提交，响应速度极快
- **PicoClaw**: 小步快跑，针对 UI 痛点快速提交 Fix PR

### 质量巩固阶段
- **Zeroclaw**: 从功能扩展转向安全加固与配置清理（Schema V4）
- **AstrBot**: 性能优化密集（5 条 perf PR），技术债务清偿
- **OpenClaw**: 大量 P0 问题待修复，处于"救火"模式

### 规模化阵痛阶段
- **OpenClaw**: 用户规模最大，但 12+ P0 问题反映架构承压
- **Hermes-Agent**: 多平台安装循环、资源消耗问题集中爆发

---

## 7. 值得关注的趋势信号

### 技术趋势
1. **内存安全成为首要挑战**：OpenClaw 的 worker 泄漏（#159662: 4-5 GB/h）和 Hermes 的 CPU 占用（#88275: 40-70%）表明**长期运行的 Agent 系统亟需更严格的资源管控机制**
2. **会话持久化可靠性决定产品生死**：DeepSeek 的会话损坏（#8084）、OpenClaw 的 WAL 增长（#143524）、PicoClaw 的幽灵会话（#3407）共同指向**状态管理机制需要架构级重构**
3. **多平台渠道适配进入深水区**：从"能连接"转向"稳定可靠"，QwenPaw 的 Telegram 握手修复（#7773）、OpenClaw 的 WhatsApp 重试机制（#161466）表明**渠道稳定性成为竞争壁垒**
4. **安全权限模型从边缘走向核心**：Zeroclaw 的委托记忆隔离漏洞（#11198, #11239）和 OpenClaw 的 MCP OAuth 局限（#89412）显示**多租户场景下的权限边界需要更严谨的设计**

### 产品趋势
1. **桌面端体验成为差异化战场**：DeepSeek Harness 的零依赖安装、Hermes 的本地模型优先、PicoClaw 的 Web UI 反馈机制，表明**用户正在从 CLI 向图形化界面迁移**
2. **上下文窗口管理从技术问题上升为用户体验问题**：32k token 硬编码限制（Zeroclaw #10068）、自动压缩失效（DeepSeek #7650）、长历史输入卡顿（PicoClaw #3281）共同反映**大上下文场景的基础设施仍需完善**
3. **企业级部署需求显现**：QwenPaw 的自托管技能市场（#8015）、Hermes 的 SSH 部署控制平面（#118029）、OpenClaw 的多 agent 并发支持，表明**ToB 场景正在成熟**

### 对开发者的参考价值
- **避免 OpenClaw 的技术债务陷阱**：在架构设计阶段即考虑内存隔离、数据库连接池、worker 生命周期管理
- **学习 Zeroclaw 的安全优先策略**：权限模型应在 MVP 阶段即纳入设计，而非事后修补
- **关注 DeepSeek Harness 的桌面端集成模式**：菜单栏命令集成、零依赖安装是提升用户留存的有效手段
- **借鉴 QwenPaw 的多平台适配节奏**：Telegram/QQ/微信等渠道的精细化体验是國內市场的竞争关键点

---

**报告结论**：个人 AI 助手开源生态正处于**从功能竞赛向稳定性与安全性转型**的关键期。OpenClaw 作为最大项目暴露的技术债务警示行业：**规模化必然伴随架构压力**；Zeroclaw 的安全加固策略和 DeepSeek Harness 的桌面端创新代表了两条有价值的演进路径。对于开发者而言，**内存管理、会话持久化、权限模型**是三大必须跨越的技术门槛。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目日报 | 2026-09-30

## 1. 今日速览

今日（2026-09-30）Zeroclaw 保持高活跃度，过去24小时产生27条 Issue 更新和50条 PR 更新。安全域成为焦点：多个 P0/P1 级安全漏洞（权限提升、记忆作用域绕过）被报告或关闭，反映了 OIDC 基础设施合并后的收紧阶段。Schema V4 配置清理与插件更新机制是当前主要的工程推进点。无新版本发布，整体开发重心从功能扩展转向安全性加固与基础架构清理。

## 2. 版本发布

**无新版本发布。**

## 3. 项目进展

今日最重要的推进集中在**配置架构重构**与**插件系统加固**：

- **Schema V4 配置清理** (#11218, #8754): @JordanTheJet 和 @singlerider 推进配置模式 V4 的重大变更，移除废弃的 SaaS、CLI wrapper 和死代码配置项。这是项目长期债务清理的关键一步，涉及配置文件的向后迁移。
- **插件验证与更新机制** (#11261, #11262): @IftekharUddin 实现了经过验证的插件替换和更新流程（响应 #10995），支持分阶段接纳（staged admission）和故障回滚，填补了插件管理的核心功能空白。
- ** declarative cron 支持** (#11238): @cwahn 修复了配置编辑器无法写入声明式 cron 调度的问题，使 `/config/cron` 端点能够正确处理 tagged object 格式。

**整体判断**：项目正经历一次重要的"瘦身"和"加固"期。V4 schema 的推进意味着配置系统的现代化，而安全补丁的密集发布表明核心团队在 OIDC 里程碑后迅速响应了权限模型的边缘情况。

## 4. 社区热点

### 高关注度 Issue

| Issue | 类型 | 热度 | 链接 |
|-------|------|------|------|
| **#8832** Plugin-owned Kanban board | 功能 | 10评论 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8832) |
| **#10068** 交互式会话上下文截断 | Bug | 6评论 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10068) |
| **#6105** Cron 任务缺乏上下文 | Bug | 5评论 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6105) |
| **#11053** 知识图谱作为一等公民记忆层 | RFC | 4评论 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11053) |
| **#8289** OIDC 里程碑追踪器 | 功能 | 4评论 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) |

### 热点分析

- **#8832** (Kanban board) 持续获得关注，用户期望为 agent 工作流提供可视化的任务管理界面。该功能已从 RFC 队列转为普通 issue 路径，表明社区对可视化工作流的强烈需求。
- **#10051** 已关闭，增加了"Add to Chat"功能，允许将选中的对话文本作为引用上下文添加到 composer，这是对 ZeroCode 编辑器用户体验的直接改进。
- **#11235** (RFC: Knowledge corpus/RAG) 和 **#11254** (RFC: A2A protocol crate) 是新提出的架构级 RFC，分别关注文档检索能力和 Agent-to-Agent 协议标准化，反映出项目正在探索更成熟的 agent 协作和信息检索能力。

## 5. Bug 与稳定性

### P0 级别（高危/安全风险）

| Issue | 描述 | 状态 | Fix PR | 链接 |
|-------|------|------|--------|------|
| **#11197** | Session resume 在管理员权限撤销后恢复转发的环境 | **已关闭** | #11260 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11197) |
| **#11198** | 委托记忆工具丢失 principal 作用域 | 开放 | - | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11198) |
| **#11239** | 私有 session 通过 spawn_subagent 访问共享记忆平面 | 开放 | - | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11239) |
| **#11123** | SOP 执行接受通配符工具选择器无需 tools:execute | 开放 | - | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11123) |

**关键发现**：今日安全团队（@Audacity88, @JordanTheJet, @IftekharUddin）密集发现了多个权限和作用域边界问题。#11197 已关闭，但 #11198 和 #11239 揭示了委托（delegate）场景下的记忆隔离漏洞，#11123 则暴露了 SOP 策略执行的语义缺陷。这些问题均属于**数据丢失/安全风险**级别。

### P1-P2 级别

| Issue | 描述 | 严重程度 | 链接 |
|-------|------|----------|------|
| **#11126** | 排队 session 操作保留已被撤销的管理员所有权绕过 | P1, S0 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11126) |
| **#10068** | 交互式 agent 会话上下文硬编码截断于 32k tokens | P2, S2 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10068) |
| **#6105** | Agent 执行 cron 任务时缺乏消息上下文 | P2, S2 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6105) |
| **#11215** | OpenCode Go 调用失败："name" 字段不支持 | P2, S2 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11215) |
| **#11257** | WhatsApp Web 丢弃媒体附件的 caption | P2, S2 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11257) |
| **#11237** | 配置编辑器无法写入声明式 cron 调度 | P2, S1 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11237) |

**注**：#11260 已合并，修复了 #10068 和 #11197 相关的上下文预算截断问题（停止将显式上下文预算钳制到 32k fallback stub）。#11238 修复了 #11237 的 cron 调度写入问题。

### 外部验证的 Bug

| Issue | 描述 | 来源 | 链接 |
|-------|------|------|------|
| **#11233** | 验证结果在未运行检查或测量值的情况下写入报告 | S2 | DefuzeX (KUMA SDK) | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11233) |

## 6. 功能请求与路线图信号

### 近期可能被纳入的功能

| 功能 | Issue/PR | 状态 | 可能性 | 链接 |
|------|----------|------|--------|------|
| **插件验证更新与回滚** | #10995 / #11261, #11262 | 开发中 | **高** | [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10995) |
| **declarative cron 完整支持** | #11237 / #11238 | 部分完成 | **高** | [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/11237) |
| **Schema V4 清理** | #8310 / #8754 / #11218 | 进行中 | **高** | [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/8310) |
| **多模型 per provider** | #9809 | 开放 | 中 | [PR](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) |
| **通道消息角色限定** | #11068 | 开放 | 中 | [PR](https://github.com/zeroclaw-labs/zeroclaw/pull/11068) |

### 长期路线图信号

- **知识图谱作为一等记忆层** (#11053): RFC 提出将 knowledge graph 从工具升级为真正的记忆后端，与现有 memory 系统并列。
- **RAG 文档检索** (#11235): 新 RFC 提出 agent 应能从操作者持有的文档库中检索信息，扩展 agent 的知识边界。
- **A2A 协议标准化** (#11254): 提议将 Agent-to-Agent 协议提炼为独立 crate (`zeroclaw-a2a`)，实现跨 agent 通信的标准化。
- **Wecom WS 主动消息** (#7824): 微信企业版通道需要支持主动推送和媒体文件发送，目前仅支持被动响应。
- **ZeroCode 编辑增强** (#8289 关联): #10051 已合并的 "Add to Chat" 功能预示后续可能有更多编辑器交互改进。

## 7. 用户反馈摘要

### 痛点与不满

1. **上下文管理混乱** (#10068): 用户配置了 `max_context_tokens = 131072`，但实际被硬编码限制在 32k，导致长对话被意外截断。这反映了配置与运行时行为不一致的问题。
   
2. **Cron 任务上下文断裂** (#6105): 用户期望 cron 触发的 agent 能"记住"之前约定的任务（如提醒），但当前实现缺乏跨时间片的状态关联，导致用户体验断裂。

3. **WhatsApp 媒体信息丢失** (#11257): 用户发送带 caption 的图片/视频时，agent 只能看到占位符而非实际文本，影响多模态交互的完整性。

4. **OpenCode Go 兼容性问题** (#11215): 自定义 OpenAI 兼容端点（vLLM、llama.cpp）拒绝带有 `name` 字段的 tool result 消息，这是 ZeroClaw 与第三方实现的协议分歧。

5. **权限撤销后残留访问** (#11197, #11126): 用户发现即使管理员权限被撤销，session resume 或排队操作仍可能绕过检查，这是严重的安全信任问题。

### 满意点

- **#10051 快速响应**: "Add to Chat" 功能解决了用户在 ZeroCode 中引用历史对话的痛点，社区对此表示认可。
- **OIDC 基础设施合并**: #8289 追踪器显示核心 OIDC 栈已合并，多个分片 PR (#10248, #10255 等) 陆续落地，用户对这些安全基础设施的推进感到满意。

## 8. 待处理积压

### 需维护者重点关注

| Issue/PR | 风险 | 积压原因 | 建议 | 链接 |
|----------|------|----------|------|------|
| **#11198** Delegated memory tools lose principal scope | **P0, 安全风险** | 委托场景下的记忆隔离漏洞，影响多租户安全 | 优先分配安全团队评估 | [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/11198) |
| **#11239** Owned sessions reach shared memory plane | **P0, 安全风险** | 与 #11198 类似，spawn_subagent 和 execute_pipeline 路径绕过权限边界 | 与 #11198 联合修复 | [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/11239) |
| **#11123** SOP 通配符工具选择器 | **P1, 安全风险** | 策略语义缺陷，可能允许未授权工具执行 | 需策略引擎团队介入 | [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/11123) |
| **#11126** 排队操作保留撤销的所有权 | **P1** | #10412 仅为部分实现，需完整修复 stale-grant 路径 | 跟进 #10412 后续 | [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/11126) |
| **#11215** OpenCode Go 兼容性 | **P2** | 影响使用第三方兼容端点的用户群体 | 评估是否调整 tool result 格式 | [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/11215) |
| **#7824** Wecom WS 主动消息 | **P2** | 国内用户需求强烈，但优先级较低 | 排入后续迭代 | [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/7824) |
| **#11233** 验证结果写入问题 | **P2** | 由外部安全团队 (DefuzeX) 发现，影响评估可信度 | 需验证模块团队调查 | [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/11233) |

### 长期未关闭的 RFC

- **#11053** 知识图谱记忆层 (创建于 2026-09-22, 4评论): 架构级 RFC，需架构委员会评审。
- **#11235** RAG 文档检索 (创建于 2026-09-29, 1评论): 新功能 RFC，刚提出。
- **#11254** A2A 协议 crate (创建于 2026-09-29, 0评论): 跨切面重构 RFC，需架构讨论。

---

**日报生成时间**: 2026-09-30  
**数据来源**: GitHub API (zeroclaw-labs/zeroclaw)  
**分析师**: Agnes (Sapiens AI)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报 | 2026-09-30

## 1. 今日速览
PicoClaw 当前处于高活跃的开发迭代期，Web UI 体验优化是今日社区关注的核心焦点。过去24小时内共产生6条活跃 Issue 和2条待合并 PR，主要集中在会话管理、消息队列反馈及认证机制修复上。虽然暂无新版本发布，但针对 Web UI "幽灵会话"和消息静默丢失问题的修复 PR 已提交，显示出团队对用户体验细节的快速响应能力。项目整体健康度良好，技术债务正在被积极清偿。

## 2. 版本发布
**无新版本发布。**

## 3. 项目进展
今日有 2 条 PR 处于待合并状态，虽未直接合并入主分支，但已解决关键痛点：
- **#3410 [OPEN] fix(pico/web): surface steering queue state**
  - **推进内容**：解决了 Web UI 中当 Agent 忙时，用户发送的消息被静默丢弃且无反馈的问题。PR 引入了队列状态可见性，使“排队中”或“队列满”的状态得以在客户端显示。
  - **项目意义**：显著提升了 Web UI 的交互可靠性，消除了用户输入“石沉大海”的体验断层。
- **#3378 [OPEN] fix(auth): use configured scopes instead of hardcoded default in RefreshAccessToken**
  - **推进内容**：修复了 OAuth 令牌刷新时硬编码 scope 覆盖配置项的 Bug。
  - **项目意义**：增强了 OAuth 集成的灵活性和正确性，确保不同 Provider（如自建 IdP）的自定义 Scope 配置能生效。

## 4. 社区热点
今日讨论最活跃的 Issue 集中在 Web UI 的行为逻辑与体验优化：

1.  **#3281 [BUG] Web UI chat input is very laggy when history has a little bit long**
    -   **链接**: https://github.com/sipeed/picoclaw/issues/3281
    -   **热度**: 16条评论，2个👍，长期未决。
    -   **分析**: 用户反馈长历史会话下的输入延迟问题。这是一个典型的性能瓶颈，涉及前端渲染优化或 WebSocket 消息处理效率，反映了用户对长上下文会话稳定性的强烈需求。

2.  **#3407 [BUG] Web UI: a session can disappear from the list while the model is still thinking (ghost session)**
    -   **链接**: https://github.com/sipeed/picoclaw/issues/3407
    -   **分析**: “幽灵会话”现象严重破坏了用户信任感。用户新建会话后，若服务端处理时间稍长，会话可能从列表中消失，且无法找回。这是典型的异步状态同步 Bug。

3.  **#3406 [Feature] Web UI: clearer working indicator, separate manual/channel sessions, richer session list with archiving**
    -   **链接**: https://github.com/sipeed/picoclaw/issues/3406
    -   **分析**: 用户对 Web UI 的反馈具有系统性，提出了三个层面的改进需求：明确的思考状态指示器、手动/渠道会话的隔离、以及更丰富的会话列表管理（如归档）。这表明 PicoClaw 正从 CLI 工具向更复杂的 Web 应用演进，需要配套的 UI/UX 升级。

## 5. Bug 与稳定性
今日报告了 3 个主要 Bug，均与 Web UI 状态管理相关：

| 严重程度 | Issue | 描述 | Fix PR |
| :--- | :--- | :--- | :--- |
| **高** | [#3407](https://github.com/sipeed/picoclaw/issues/3407) | 会话在模型思考期间从列表中消失（幽灵会话），导致用户无法找回会话。 | 暂无直接关联 PR，需关注状态同步逻辑。 |
| **中** | [#3408](https://github.com/sipeed/picoclaw/issues/3408) | 忙时发送的消息被静默排队并可能在队列满时丢弃，且无任何 UI 反馈。 | ✅ **#3410** 已提交修复。 |
| **中** | [#3409](https://github.com/sipeed/picoclaw/issues/3409) | Subagent 驱动开发中，使用调度原语作为等待机制时触发了意外的自主循环 tick。 | 暂无关联 PR，属于 Agent 内部调度逻辑的边界情况。 |

## 6. 功能请求与路线图信号
-   **#440 [Enhancement] Replace hard iteration limit with context-window bounding and loop detection**
    -   **链接**: https://github.com/sipeed/picoclaw/issues/440
    -   **信号**: 用户希望移除僵硬的 `max_tool_iterations` 限制，改用基于上下文窗口和循环检测的智能控制。这反映了高级用户群体对复杂任务自动化能力的深入需求，可能引导下一代 Agent 调度器的发展方向。
-   **#3406 [Feature] Web UI 体验增强**
    -   **链接**: https://github.com/sipeed/picoclaw/issues/3406
    -   **信号**: 用户明确提出了“更清晰的工作指示器”和“会话归档”功能。结合 #3410 的快速响应，可以推测下一个小版本可能优先解决 Web UI 的状态反馈和基础交互稳定性问题。

## 7. 用户反馈摘要
-   **痛点**: Web UI 在长会话和高负载场景下存在严重的可用性问题，包括输入卡顿 (#3281)、会话丢失 (#3407) 和消息静默丢弃 (#3408)。
-   **满意点**: 用户认可 PicoClaw 作为日常 Chat 工具的价值（#3406 提及 "main day-to-day way to chat"）。
-   **需求**: 用户迫切需要透明的系统状态反馈（如“是否还在思考”、“消息是否已接收”），而非黑盒式的响应。

## 8. 待处理积压
-   **#440 [OPEN] Replace hard iteration limit...**: 创建时间较早（2026-02-18），但评论数持续增加（7条），说明该功能请求在高阶用户中具有持续关注度。建议维护者优先评估其可行性，因其涉及 Agent 核心行为模式的改进。
-   **#3281 [OPEN] Web UI chat input lag...**: 长期存在的性能问题（16条评论），虽未直接阻碍核心功能，但严重影响用户体验。建议纳入性能优化专项进行排查。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期**：2026-09-30  
**数据来源**：GitHub `agentscope-ai/qwenpaw`  
**分析师**：Agnes (Sapiens AI)

---

## 1. 今日速览
QwenPaw 在过去24小时内保持高频活跃，共处理 **12 个 Issues** 和 **36 个 PRs**，显示出极强的开发响应速度。核心贡献者 @RerankerGuo 单日提交了 7 个 PR，重点解决了任务追踪僵尸数据、桌面端实例冲突、终端高文件描述符支持及技能下载性能等关键架构问题。社区对 Telegram 渲染、QQ 网关重连及桌面端体验的关注度较高，整体项目健康度良好，Bug 修复与功能增强并重。

---

## 2. 版本发布
**无新版本发布**。当前主要版本仍为 **2.2.1** (stable) 及 **2.2.2b3/b4** (beta)。

---

## 3. 项目进展
今日合并/关闭了多个高质量 PR，显著提升了系统稳定性：

*   **Telegram 协议合规性修复**：
    *   **#7773** 修复了 Telegram 启动握手 (`/start`) 未消费导致私信失败的问题。
    *   **#7765** 修正了群组中命令提及 (@BotName) 的识别逻辑，防止误判。
    *   **#7718** 解决了审批卡片 Markdown 在 Telegram 中显示为纯文本的渲染错误。
    *   *进展意义*：完善了多 Bot 共存场景下的用户体验，确保私聊入口畅通。

*   **CI/CD 与环境兼容性**：
    *   **#8026** 修复了跨平台路径（Windows 驱动器、UNC 路径）、沙箱清理及时区加载问题。
    *   **#8024** 拒绝了无效的 Qoder 时区值，防止 Windows 下权限错误掩盖真实故障。
    *   **#8025** 禁用了 NSIS 固实压缩，可能旨在加速安装或解决特定打包问题。

*   **桌面端与终端体验**：
    *   **#8023** (已合并) 将终端 POSIX 描述符从 `select` 改为 `poll`，解决了 Linux 下高 FD 数量导致的运行时错误。

---

## 4. 社区热点
今日讨论最活跃的 Issue/PR 集中在以下领域：

*   **[Bug] QQ 官方机器人重连后事件重复处理** (#7946, 已关闭)
    *   **链接**: https://github.com/agentscope-ai/QwenPaw/issues/7946
    *   **分析**: 用户反映 QQ 网关服务端主动重连后，INTUOP 事件被重投，导致重复处理。此 Issue 已关闭，推测相关 PR 已介入或作为已知限制记录。

*   **[Feature] 自定义 Skill/Plugin 市场源（自托管）** (#8015)
    *   **链接**: https://github.com/agentscope-ai/QwenPaw/issues/8015
    *   **分析**: 内网/离线部署场景的强烈诉求，允许指向私有镜像源，对政企用户至关重要。

*   **[Bug] TaskTracker 僵尸条目导致计数不一致** (#7991)
    *   **链接**: https://github.com/agentscope-ai/QwenPaw/issues/7991
    *   **分析**: Dashboard 显示运行任务数与 API 返回不一致，直接影响监控可靠性。**已有对应修复 PR #8007** 待合并。

*   **[Enhancement] 桌面端 UI 字体大小可调节** (#7999, 已关闭)
    *   **链接**: https://github.com/agentscope-ai/QwenPaw/issues/7999
    *   **分析**: 高 DPI 及视力障碍用户刚需，已关闭可能意味着该功能已在某个版本或配置中被接受/解决。

---

## 5. Bug 与稳定性
今日报告了多个严重 Bug，部分已有紧急修复 PR：

| 优先级 | 问题描述 | Issue/PR | 状态/关联 PR |
| :--- | :--- | :--- | :--- |
| **P0** | **发送文件后上下文污染**：`send_file_to_user` 产生的空 assistant 消息导致后续所有模型请求 400 错误。 | #8022 | OPEN，暂无直接 Fix PR，需关注 |
| **P0** | **Inline 媒体大小无限制**：单次请求可累积超 2MB 媒体，导致网关截断。 | #8034 (PR) | OPEN，PR 正在修复此边界条件 |
| **P1** | **桌面端重起崩溃**：Windows 桌面端重启时，新实例终止了旧实例的后端，导致旧窗口永久卡死。 | #8033 (PR) | OPEN，PR 正在修复生命周期冲突 |
| **P1** | **转录设置失效**：切换提供商后静默破坏转录功能。 | #8035 | OPEN，暂无 Fix PR |
| **P1** | **Telegram HTML 渲染错误**：`c++`/`objective-c` 等 info string 及嵌套 fence 渲染异常。 | #8011 / #8012 (PR) | PR #8012 待合并 |
| **P2** | **大技能下载超时**：Console 下载大技能包时前端 30s 超时，后端仍在执行但操作失败。 | #8013 | OPEN，PR #8027 正在将下载操作移至 Worker 线程以解决阻塞 |
| **P2** | **OpenAI 集成失败**：连接测试通过但实际生成失败，Resume 异常。 | #8036 | OPEN |

---

## 6. 功能请求与路线图信号
*   **技能市场自托管** (#8015): 用户需求明确，指向企业级部署场景。若 QwenPaw 拓展 ToB 市场，此功能为高潜力纳入项。
*   **模型回退冷却机制** (#8020): PR 提出对失败回退模型施加冷却期，避免重复尝试已失败节点。这显示了项目正在优化**链路稳定性**和**成本效率**，预计将进入近期版本。
*   **持久化聊天历史** (#7931): 引入 SQLite 转录存储和分页，这是提升用户体验的关键架构升级，标志着项目从“即时对话”向“可追溯 Agent 会话”演进。
*   **浏览器插件持久化** (#8029): 允许配置移除 Playwright 默认的 `--disable-extensions`，以支持用户在浏览器中保留已安装的扩展（如身份识别插件）。

---

## 7. 用户反馈摘要
*   **痛点**：
    *   **上下文管理缺陷**：用户 #8022 指出文件发送后的空消息污染了上下文，导致连锁故障，反映出当前消息清洗机制存在盲点。
    *   **大文件操作体验差**：用户 #8013 抱怨 30 秒硬超时和前端无反馈，暴露了异步任务在前端的进度展示和超时策略不足。
    *   **多模型集成不健壮**：用户 #8036 反馈 OpenAI 和 Kimi 的集成在“连接测试通过但生成失败”场景下错误提示晦涩（显示“本次执行未完成”而非根本原因）。
*   **满意点**：
    *   社区对 Telegram 机器人细节体验（如命令解析、渲染）的精细化反馈增多，表明该渠道用户群活跃且对质量要求高。
    *   对桌面端辅助功能（字体缩放）的关注，说明用户开始关注通用无障碍体验。

---

## 8. 待处理积压
*   **#8022** (Send file context pollution): **高优先级**。这是一个破坏性 Bug，影响使用 `send_file_to_user` 的所有流程，建议优先修复。
*   **#8036** (Creator OpenAI/Kimi failures): 涉及核心模型集成能力，且错误信息不友好，影响用户信任度。
*   **#8035** (Transcription settings break): 功能性 Bug，虽然单点影响，但反映了配置持久化逻辑的脆弱性。
*   **#7991** (TaskTracker zombie): 已被 PR #8007 覆盖，但 PR 尚未合并，需跟进。

---
*报告生成时间: 2026-09-30 | 分析师: Agnes-2.5-Flash*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes-Agent 项目动态日报
**日期**: 2026-09-30  
**数据来源**: GitHub (NousResearch/hermes-agent)

## 1. 今日速览
今日项目活跃度极高，过去24小时新增/更新 Issues 500条、PRs 500条，其中新关闭 Issue 130条、合并/关闭 PR 110条，显示开发与社区响应节奏紧凑。主要焦点集中在桌面端稳定性修复（渲染循环、安装流程）、平台兼容性（Windows/macOS/Linux 安装与配置）以及关键安全补丁。无新版本发布，但多个 P1/P2 级 Bug 修复已合入 main，项目整体处于高强度维护与优化周期。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日合并/关闭的重要 PR 包括：
- **#128712**: 自动格式化修复，维持代码规范。
- **#55777**: 修复网关对无扩展名纯文本上传的分类问题，避免被缓存为通用二进制流，提升多平台文件处理兼容性。
- **#128695**: 修复本地 llama.cpp 模型回退端点解析失败问题，确保在限流时能正确fallback到桌面管理的本地模型。
- **#128354**: 修复桌面端构建预检步骤缺乏跨进程锁导致的竞态条件，防止并发构建破坏安装包。

这些修复主要巩固了桌面客户端的安装健壮性、本地模型调用链路的稳定性以及网关的基础数据处理能力，为下一版本奠定了更稳定的底层基础。

## 4. 社区热点
评论最多的活跃 Issue（反映用户核心痛点）：
- **#110912 [CLOSED]**: Nous Portal 订阅用户在特定模型路由下仍被按全价扣费，疑似折扣路由 Bug。高关注度表明用户对计费透明度极度敏感。
- **#122495 [CLOSED]**: Windows 平台 `hermes update` 因 Gateway PID 映射失败而中止，影响 Windows 用户升级体验。
- **#52010 [CLOSED]**: macOS 更新后“完全磁盘访问权限”被撤销，需手动重新授权，是长期存在的 macOS 用户体验痛点。
- **#89995 [OPEN]**: 请求在 Web Dashboard 和 Gateway 中暴露 Bot Mode 群聊功能，目前仅 Desktop 支持，用户需求强烈（👍3）。
- **#127647 [OPEN]**: 追踪 Desktop 空闲时的高资源消耗（CPU/GPU/内存），关联多个历史性能 Issue，反映用户对桌面端能效的担忧。

## 5. Bug 与稳定性
**P1/P2 严重性 Bug：**
- **#110912**: Portal 计费折扣失效（已关闭）。
- **#122495**: Windows 更新中断（已关闭）。
- **#125350**: Windows 全新安装不可用，依赖缺失且镜像出错，阻塞新用户接入。
- **#123801**: macOS Desktop 重复渲染助手回复，会话状态异常。
- **#122424**: JS 依赖 `js-yaml` 存在已知 CVE 漏洞，需升级。
- **#122490**: Bot-to-Bot DM 传递因缺少 `ruamel` 模块失败。
- **#88275**: macOS Desktop 渲染进程空闲时 CPU 占用 40-70%，导致发热降频（已关闭，与 #127647 关联）。
- **#84361**: Desktop 媒体文件链接失效（已关闭）。
- **#89412**: MCP OAuth 流程在非挑战式认证服务器（如 Gmail MCP）上无法触发。
- **#126524**: 新客户端首次启动时助手回复双重渲染。
- **#122656**: 源安装模式下的无限更新/重建循环，导致活跃会话中断。
- **#122326**: 插件依赖安装触发不必要的桌面重建循环。
- **#122402**: Ubuntu 更新时 `python-olm` 编译失败。
- **#122349**: 插件运行时状态导致无限同步/重建循环。
- **#98394**: Desktop 渲染器永久重绘循环，内容闪烁（已关闭）。
- **#100675**: Desktop 分屏模式下非活动窗格每5秒重建（已关闭）。

**已有关联 Fix PR：**
- #128715 (stdin 非交互处理), #128668 (STT 预热), #128567 (macOS 安装器所有权), #126167 (网关 prompt pins 保留), #128714 (空生成错误重试), #128415 (Windows 安装取消清理), #128669 (网关繁忙确认), #128711 (1Password vault 范围), #128289 (TTS 标识符静音), #128606 (草稿文本测试), #113639 (HTTP 运行恢复), #128674 (后台进程 stdin 安全), #126116 (凭证存储隔离), #94195 (委托子会话管理), #128577 (历史记录导航)。

## 6. 功能请求与路线图信号
- **#89995**: 将 Bot Mode 群聊暴露到 Web Dashboard 和 Gateway，满足远程和多设备协作需求。
- **#118029**: 为 SSH 安装提供统一的受管理发布控制平面，增强企业级部署的可控性。
- **#81554**: 引入可嵌入的持久执行层（journal/outbox）及强制出站护栏，提升任务可靠性和安全性，属于架构级增强。

这些请求显示用户和企业场景对**跨平台一致性**、**企业级部署管理**和**执行可靠性**有强烈需求。

## 7. 用户反馈摘要
- **计费透明度**: 用户对 Portal 订阅与实际扣费不符极为不满（#110912），要求明确的折扣路由支持。
- **安装体验**: Windows 和 macOS 用户的安装/更新流程痛点集中，包括权限丢失（#52010）、依赖缺失（#125350, #122402）和循环重建（#122656, #122349）。
- **性能与资源**: macOS 用户持续关注桌面端高 CPU/GPU 占用问题（#88275, #127647, #98394），影响笔记本续航和体验。
- **功能可用性**: Bot 群聊仅限 Desktop 引发不便（#89995），MCP OAuth 对部分服务不兼容（#89412）。
- **稳定性**: 重复渲染、会话丢失、插件加载失败等问题频繁出现，影响日常使用信任度。

## 8. 待处理积压
以下 Issue 长期未解决或需决策，建议维护者优先关注：
- **#125350**: Windows 全新安装失败，阻塞新用户，需紧急修复依赖和镜像问题。
- **#127647**: Desktop 空闲资源消耗追踪，关联多个已关闭但根本原因未完全解决的 Issue。
- **#89412**: MCP OAuth 流程局限性，影响专业用户集成 Gmail 等 MCP 服务器。
- **#118029**: 企业级 SSH 部署控制平面功能请求，需架构决策。
- **#81554**: 持久执行层功能，涉及重大架构变更，需评估优先级。
- **#69889**: Cron 作业在 venv 重建后失效，影响自动化用户。
- **#7718**: Hindsight 插件依赖声明不完整，导致本地嵌入模式失败。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期：2026-09-30**

---

## 1. 今日速览

过去24小时，AstrBot 项目保持**高活跃度**，共处理 Issues 8 条（新开6/活跃6，关闭2）、PRs 21 条（合并/关闭12，待合并9），无新版本发布。核心贡献集中在**稳定性修复**与**性能优化**，涉及 persona 系统一致性、知识库 Rerank 热重载失效、图片路径解析错误等关键 Bug，并有多个性能优化 PR 提升 Dashboard 响应速度与资源利用率。社区反馈集中在 OneBot 版本支持疑问与用户体验改进建议。

---

## 2. 版本发布

**无新版本发布**（近24小时内 Releases 数量：0）。

---

## 3. 项目进展

### 今日已合并/关闭的重要 PR（共12条）

| PR | 类型 | 作者 | 摘要 |
|----|------|------|------|
| [#10285](https://github.com/AstrBotDevs/AstrBot/pull/10285) | fix | @AmirF194 | 修复 `default` persona ID 在两条查找路径中行为不一致的问题，关联 Issue #10281 |
| [#10079](https://github.com/AstrBotDevs/AstrBot/pull/10079) | fix | @wcqqq1214 | 修复空 `api_base` 时 OpenAI endpoint 解析失败问题，关联 Issue #10078 |
| [#10278](https://github.com/AstrBotDevs/AstrBot/pull/10278) | fix | @wcqqq1214 | 更新遗留 AstrBot 图标，统一使用双星 Logo |
| [#10279](https://github.com/AstrBotDevs/AstrBot/pull/10279) | feat | @wcqqq1214 | 实现侧边栏会话分页加载（每次30条），关联 PR #9667 |
| [#10265](https://github.com/AstrBotDevs/AstrBot/pull/10265) | chore | dependabot | 升级 `github/codeql-action` 从 4.38.1 至 4.38.2 |
| [#10282](https://github.com/AstrBotDevs/AstrBot/pull/10282) | docs | @Soulter | 重命名开发群为"闲聊群"，新增社区邮箱 `community@astrbot.app` |
| [#10193](https://github.com/AstrBotDevs/AstrBot/pull/10193) | fix | @Heximiao | 修复 Windows 长路径插件更新失败问题 |
| [#10274](https://github.com/AstrBotDevs/AstrBot/pull/10274) | perf | @RC-CHN | 优化 trace 记录排序，仅对更新的 spans 排序 |
| [#10273](https://github.com/AstrBotDevs/AstrBot/pull/10273) | perf | @RC-CHN | 会话规则列表跳过未使用的 alias 查找 |
| [#10272](https://github.com/AstrBotDevs/AstrBot/pull/10272) | fix | @RC-CHN | 修复统计页组件卸载后定时器仍启动的问题 |
| [#10271](https://github.com/AstrBotDevs/AstrBot/pull/10271) | perf | @RC-CHN | ChatUI 自动滚动合并为每动画帧一次，修复流式输出时的回弹抖动 |
| [#10270](https://github.com/AstrBotDevs/AstrBot/pull/10270) | perf | @RC-CHN | 禁用速率限制时跳过状态分配，减少内存开销 |

**整体推进**：今日 PR 以**Bug 修复**（4条）和**性能优化**（5条）为主，显著提升了 persona 系统一致性、知识库检索稳定性、Windows 兼容性以及 Dashboard 用户体验。

---

## 4. 社区热点

### 高关注度 Issues/PRs

| Issue/PR | 状态 | 评论数 | 热度分析 |
|----------|------|--------|----------|
| [#10281](https://github.com/AstrBotDevs/AstrBot/issues/10281) - `default` persona ID 行为不一致 | OPEN | 5 | **高频痛点**：用户创建同名 `default` 人格时 UI 与后端行为冲突，已有关联 PR #10285、#10287 正在修复 |
| [#10262](https://github.com/AstrBotDevs/AstrBot/issues/10262) - Rerank 热重载后永久失效 | OPEN | 3 | **严重 Bug**：知识库 Rerank 功能在 Provider 热重载后静默失效，错误日志为空，关联 PR #10263 待合并 |
| [#10264](https://github.com/AstrBotDevs/AstrBot/issues/10264) - 图片静默丢弃 | OPEN | 2 | **影响面大**：插件输出的相对 URL 被误判为本地路径导致图片无法发送，关联 PR #10275 待合并 |
| [#10277](https://github.com/AstrBotDevs/AstrBot/issues/10277) - ChatUI 流式输出自动滚动打断阅读 | CLOSED | 1 | **体验问题**：v4.28.2 引入的滚动回弹问题，已由 PR #10271 修复 |
| [#10276](https://github.com/AstrBotDevs/AstrBot/issues/10276) - 用户级长期记忆选项 | OPEN | 1 | **新功能请求**：MemCode 创始人提出跨会话用户偏好记忆需求，可能推动长期记忆功能扩展 |

---

## 5. Bug 与稳定性

### 今日新增/活跃 Bug（按严重程度排列）

| 优先级 | Issue | 摘要 | 状态 | Fix PR |
|--------|-------|------|------|--------|
| 🔴 高 | [#10262](https://github.com/AstrBotDevs/AstrBot/issues/10262) | Provider 热重载后知识库 Rerank 永久失效，错误日志为空（AssertionError） | OPEN | [#10263](https://github.com/AstrBotDevs/AstrBot/pull/10263) 待合并 |
| 🟠 中高 | [#10264](https://github.com/AstrBotDevs/AstrBot/issues/10264) | 插件产出的相对 URL 图片被误判为本地路径，导致静默丢弃 | OPEN | [#10275](https://github.com/AstrBotDevs/AstrBot/pull/10275) 待合并 |
| 🟠 中高 | [#10281](https://github.com/AstrBotDevs/AstrBot/issues/10281) | `default` persona ID 在 UI 选择与后端解析中行为不一致 | OPEN | [#10285](https://github.com/AstrBotDevs/AstrBot/pull/10285) ✅ 已合并；[#10287](https://github.com/AstrBotDevs/AstrBot/pull/10287) 待合并 |
| 🟡 中 | [#10277](https://github.com/AstrBotDevs/AstrBot/issues/10277) | ChatUI 流式输出期间自动滚动打断阅读体验（回归） | CLOSED | [#10271](https://github.com/AstrBotDevs/AstrBot/pull/10271) ✅ 已合并 |
| 🟡 中 | [#10284](https://github.com/AstrBotDevs/AstrBot/issues/10284) | macOS 上 `test_kb_rate_limiter.py` 计时断言偶发失败 | CLOSED | —（测试修复） |

**稳定性评估**：今日共报告 5 个 Bug，其中 3 个已有修复 PR（1 个已合并，2 个待合并），2 个新 Bug 待处理。Rerank 失效和图片路径误判为**生产环境高风险问题**，建议优先合并对应 Fix PR。

---

## 6. 功能请求与路线图信号

| 请求 | Issue/PR | 分析 |
|------|----------|------|
| 用户级长期记忆 | [#10276](https://github.com/AstrBotDevs/AstrBot/issues/10276) | MemCode CEO 提出跨会话用户偏好记忆需求，与现有知识库系统形成互补，**可能纳入下一版本 roadmap** |
| 保留唤醒词在 AI 请求中 | [#10280](https://github.com/AstrBotDevs/AstrBot/pull/10280) | 当前唤醒词（`@` mention）被剥离，AI 无法感知触发源，PR 待合并 |
| 插件配置图片预览 | [#10207](https://github.com/AstrBotDevs/AstrBot/issues/10207) | 用户建议插件配置管理界面支持图片查看，便于排查上传问题，**低优先级体验改进** |
| Requesty LLM 网关支持 | [#10267](https://github.com/AstrBotDevs/AstrBot/pull/10267) | 新增 OpenAI 兼容的 Requesty provider，丰富模型接入选项，PR 待合并 |
| disable_metrics WebUI 选项 | [#8169](https://github.com/AstrBotDevs/AstrBot/pull/8169) | 暴露已有的 `disable_metrics` 配置项到 WebUI，PR 长期待合并 |

**路线图信号**：项目正朝**多 provider 扩展**（Requesty）、**用户体验精细化**（唤醒词保留、图片预览）、**记忆系统增强**（长期记忆）方向发展。

---

## 7. 用户反馈摘要

### 真实痛点
1. **Persona 系统混乱**：用户创建 `default` 人格时期望 UI 选择与后端行为一致，但实际被内置 persona 遮蔽（#10281）
2. **知识库 Rerank 不稳定**：热重载 Provider 后 Rerank 静默失效且无有效错误提示，排查困难（#10262）
3. **图片处理逻辑缺陷**：插件输出的相对 URL 被错误解析为本地路径，导致图片无法发送（#10264）
4. **ChatUI 滚动体验退化**：v4.28.2 引入流式输出时页面自动回弹，打断阅读（#10277，已修复）

### 使用场景
- **企业/团队部署**：关注 OneBot 版本支持（#10283）、知识库稳定性、多 provider 兼容性
- **个人开发者**：关注插件系统、 persona 定制、长期记忆功能
- **社区贡献**：代码质量审查（CodeQL 升级）、文档完善（社区邮箱新增）

### 满意度
- ✅ **正面**：修复响应速度快（#10281 同日有 PR）、性能优化细致（#10270/#10271/#10273/#10274）、文档维护活跃（#10282）
- ❌ **负面**：部分 Bug 修复周期较长（#10262/#10264 待合并）、测试 flaky（#10284 macOS 环境）

---

## 8. 待处理积压

### 高优先级待合并 PR
| PR | 关联 Issue | 风险等级 | 建议 |
|----|-----------|----------|------|
| [#10263](https://github.com/AstrBotDevs/AstrBot/pull/10263) | #10262 | 🔴 高 | 修复 Rerank 热重载失效，**建议尽快合并** |
| [#10275](https://github.com/AstrBotDevs/AstrBot/pull/10275) | #10264 | 🟠 中高 | 修复图片路径误判，**建议尽快合并** |
| [#10287](https://github.com/AstrBotDevs/AstrBot/pull/10287) | #10281 | 🟠 中高 | 补充修复 default persona 一致性，建议跟进 |
| [#10280](https://github.com/AstrBotDevs/AstrBot/pull/10280) | #9660 | 🟡 中 | 保留唤醒词功能，提升 AI 上下文完整性 |
| [#10267](https://github.com/AstrBotDevs/AstrBot/pull/10267) | — | 🟡 中 | 新增 Requesty provider，扩展模型接入 |
| [#8169](https://github.com/AstrBotDevs/AstrBot/pull/8169) | — | 🟢 低 | WebUI disable_metrics 选项，长期未合并 |

### 长期未响应 Issue
- [#10276](https://github.com/AstrBotDevs/AstrBot/issues/10276)：用户级长期记忆功能请求，CC @Soulter 需评估可行性
- [#10283](https://github.com/AstrBotDevs/AstrBot/issues/10283)：OneBot 12 支持疑问，需官方回复

---

**项目健康度评级**：🟢 **良好**  
- 活跃度：高（29 条 Git 活动/24h）
- 响应速度：快（Bug 当日有 PR）
- 代码质量：稳定（性能优化密集，test coverage 良好）
- 风险点：2 个高优先级 Bug 待合并（#10263、#10275），建议维护者优先处理

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期**：2026-09-30  
**数据来源**：GitHub Discussions & Releases  
**分析师**：Agnes

## 1. 今日速览
DeepSeek Harness 社区保持高活跃度，过去24小时产生 **223 条** Discussions 更新，显示出密集的用户交互与问题反馈。项目今日正式发布了 **v0.2.0-rc.2**，重点完善了 macOS/Windows 桌面端的原生能力（如 `dsh` 命令行集成、权限修复）并优化了多平台会话环境的一致性。社区讨论集中在 API 兼容性要求（OpenCode）、历史会话加载稳定性以及长上下文管理痛点上，整体项目处于功能迭代与稳定性加固的关键阶段。

## 2. 版本发布
**版本**：`dsh-v0.2.0-rc.2`  
**发布说明**：本次 Release 主要聚焦于桌面端体验优化与跨平台一致性修复。

*   **核心新增**：macOS/Windows 桌面端菜单栏现可直接管理和安装 `dsh` 命令及插件，无需额外安装 Node 或 pnpm，降低了非技术用户的门槛 (@tianyicui)。
*   **关键修复**：
    *   修复了 macOS Intel 版因 Node 签名权限问题导致的 Office 技能崩溃 (@07akioni)。
    *   解决了 macOS/Linux 图形入口启动时缺失登录 shell 环境的问题，确保工具路径和代理配置在会话中可用 (@lsdsjy)。
    *   修复了持久化 PowerShell 会话中标记泄露及退出码丢失问题 (@turtle2099)。
    *   消除了新建终端菜单中同名 Shell 的重复显示 (@LegGasai)。
*   **体验优化**：模型选择器新增模糊搜索；侧栏文件页支持直接调用本地应用打开文件夹并记忆偏好；精简了插件安装引导；实验性引入了异步问答模式 (@Magolor)。
*   **破坏性变更/注意事项**：
    *   第三方模型目录更新至 `pi-ai 0.87.1`，部分旧模型 ID 被移除，用户需重新选择保存的模型 (@tianyicui)。
    *   Windows 沙箱权限脚本改为经授权后一次性完成诊断与修复，请保留修改前的备份。

## 3. 项目进展
鉴于该项目未启用 GitHub Issues/PRs，以下进展基于 **v0.2.0-rc.2 Changelog** 推断为近期合并提交：
*   **桌面端自动化增强**：通过菜单栏集成 `dsh` 命令管理，推进了“零依赖安装”的目标，提升了桌面端作为独立应用的完整性。
*   **稳定性治理**：针对 PowerShell 环境泄漏和 macOS 权限问题的修复，表明团队正在系统性清理跨平台（尤其是 Windows 沙箱和 macOS 权限模型）的遗留债务。
*   **交互精细化**：模型搜索、插件状态区分及异步问答模式的实验，显示产品正在向更灵活的工作流演进。

## 4. 社区热点
以下是过去24小时内评论最活跃的 Discussion，反映了用户的核心关切：

1.  **[Ideas] OpenCode Go API 需要 x-opencode-session header** (40 评论)
    *   **链接**：[#5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)
    *   **分析**：OpenCode Go 自 09/05 起强制要求会话 Header 以进行路由优化，大量用户受影响。这是第三方服务兼容性的典型代表，社区急需官方适配方案。
2.  **[Ideas] 求一个 memory 能力** (39 评论)
    *   **链接**：[#14](https://github.com/deepseek-ai/deepseek-harness/discussions/14)
    *   **分析**：用户持续呼吁迁移 Codex/Claude Code 的 Memory 功能，表明跨代理的状态保持已成为标配需求。
3.  **[Bug] 「加载历史」偶发永久卡住（Root Cause 已定位）** (16 评论)
    *   **链接**：[#7802](https://github.com/deepseek-ai/deepseek-harness/discussions/7802)
    *   **分析**：用户提供了详细的根因分析（socket waiter 永不 settle）和社区补丁，显示了深度用户的技术参与度，该问题可能与本次 rc.2 的稳定性修复相关。
4.  **[General] Linux 总是被遗忘...** (11 评论)
    *   **链接**：[#8107](https://github.com/deepseek-ai/deepseek-harness/discussions/8107)
    *   **分析**：对比 WorkBuddy 和 Qoder 对 Linux 的支持，用户抱怨 DSH 在 Linux 生态（尤其是 WorkBuddy 场景）的缺失，是明显的市场短板信号。
5.  **[Q&A] DeepSeek Messages transport failed** (9 评论)
    *   **链接**：[#6987](https://github.com/deepseek-ai/deepseek-harness/discussions/6987)
    *   **分析**：升级至 4.1 后出现的连接错误，涉及底层传输稳定性，疑似与网络环境或 API 版本变更有关。

## 5. Bug 与稳定性
*   **严重 (Critical)**：
    *   **[Bug] Session corrupt: seed assistant/message at index 4002 has invalid settlement fields** [#8084](https://github.com/deepseek-ai/deepseek-harness/discussions/8084) - 会话文件损坏导致无法加载历史，涉及数据持久化层的健壮性。
    *   **[Bug] SESSION_QUERY_PERSISTENCE_FAILED: v0→v1 migration rejects subagent/descriptor** [#7995](https://github.com/deepseek-ai/deepseek-harness/discussions/7995) - 迁移逻辑对 subagent 版本处理有误，导致所有包含子代理的历史搜索失败。
*   **中等 (Major)**：
    *   **[Bug] Windows 沙箱 Low 完整性标签导致 .bat/.exe 双击报错** [#7735](https://github.com/deepseek-ai/deepseek-harness/discussions/7735) - 更新 v0.1.7 后出现的权限回归，影响日常开发流程。
    *   **[Bug] Auto-compaction not triggering at 100% context window** [#7650](https://github.com/deepseek-ai/deepseek-harness/discussions/7650) - 长上下文场景下的自动压缩失效，可能导致请求截断或错误。
    *   **[Q&A] format v4 message requires a producer-owned source kind** [#7455](https://github.com/deepseek-ai/deepseek-harness/discussions/7455) - v0.1.7-alpha.1 的特定消息格式错误，回退至 v0.1.6 可缓解。

## 6. 功能请求与路线图信号
*   **永久删除会话** [#3075](https://github.com/deepseek-ai/deepseek-harness/discussions/3075)：用户痛点在于归档仅隐藏显示但不清理磁盘和记账席位，强烈呼吁提供真正的“删除”能力以回收资源。
*   **Memory 能力迁移** [#14](https://github.com/deepseek-ai/deepseek-harness/discussions/14)：持续的高热度需求，暗示未来版本可能需要引入跨会话的知识存储机制。
*   **大会话性能优化** [#4416](https://github.com/deepseek-ai/deepseek-harness/discussions/4416)：针对冷启动大历史会话导致 Web Server 卡顿的系统性分析，指向后端异步加载或懒加载的优化方向。

## 7. 用户反馈摘要
*   **痛点**：
    *   **数据完整性担忧**：多次出现会话损坏（corrupt session）和持久化查询失败，用户对数据安全性感到焦虑。
    *   **平台公平性**：Linux 用户感到被忽视，尤其是相对于竞品在 Linux 上的原生支持。
    *   **API 兼容性断裂**：第三方服务（如 OpenCode）的协议更新导致原有功能失效，用户希望 DSH 能更敏捷地适配上游变更。
*   **满意点**：
    *   对 v0.2.0-rc.2 中桌面端集成 `dsh` 命令表示欢迎，认为这简化了工作流。
    *   模型选择器的搜索功能和深色主题优化获得了正面反馈。

## 8. 待处理积压
*   **[Bug] Welcome Notice 锁死用户** [#860](https://github.com/deepseek-ai/deepseek-harness/discussions/860)：特权 RPC 在受限浏览器环境下返回 403，导致欢迎弹窗无法关闭，这是一个影响用户体验的长期 UX 陷阱，需尽快修复前端降级逻辑。
*   **[Bug] UTF-16 surrogates 导致 HTTP 400** [#3315](https://github.com/deepseek-ai/deepseek-harness/discussions/3315)：工具结果中包含孤立 UTF-16 代理对时，后续所有对话轮次均失败，这是一个顽固的编码处理 Bug，需要服务端或客户端的清洗逻辑介入。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*