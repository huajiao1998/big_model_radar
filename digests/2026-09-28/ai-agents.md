# OpenClaw 生态日报 2026-09-28

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-28 00:06 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报
**日期：** 2026-09-28  
**数据来源：** GitHub OpenClaw (github.com/openclaw/openclaw)  
**分析周期：** 过去 24 小时

---

## 1. 今日速览

OpenClaw 社区在 2026.9.6 版本发布后进入高强度修复期，过去 24 小时内 Issues 活跃度极高（500 条更新），其中 478 条为新开或活跃问题，表明用户对最新版本的稳定性存在显著担忧。核心痛点集中在 **Gateway 启动崩溃循环**、**数据库锁/性能退化**、**更新机制失败** 以及 **内存泄漏** 等方面，多个 P0 级问题被标记为 "release-blocker"。尽管有 395 个 PR 等待合并且社区响应迅速，但大量回归性 Bug（Regression）提示版本发布前的集成测试可能需要加强。整体项目处于**高压力运维状态**，维护者正全力应对版本迭代带来的连锁问题。

---

## 2. 版本发布

**无新版本发布。**

当前主流版本为 **2026.9.6**（eb377ac），但根据 Issues #157531 摘要显示，**2026.9.7** 的修复工作正在进行中（prepared source: 711db27），计划修复 2026.9.6 引入的问题。

---

## 3. 项目进展

### 重要 PR 动态（按影响力排序）

| PR 编号 | 标题 | 作者 | 状态 | 影响 |
|---------|------|------|------|------|
| [#159943](https://github.com/openclaw/openclaw/pull/159943) | fix(subagents): keep completion recovery with its original owner | @steipete | **已合并** ✅ | 修复子 Agent 完成恢复时可能错误更新替代状态数据库的关键竞态条件 |
| [#158447](https://github.com/openclaw/openclaw/pull/158447) | fix(updater): identify the config-read child by env, not by import query | @carlosjarenom | 🔄 待审 | 解决 Bun Gateway 下配置读取子进程无限链式派生的问题（实测产生 8,462 个后代进程） |
| [#159973](https://github.com/openclaw/openclaw/pull/159973) | fix(release): keep frozen onboarding validation compatible | @RomneyDa | 🔄 待审 | 修复 Docker PTY 输出 ANSI 序列分裂导致的发布验证停滞 |
| [#157500](https://github.com/openclaw/openclaw/pull/157500) | feat(workers): authenticate stock GitHub clients on enterprise workers | @galiniliev | 🔄 待审 | 允许企业 Workers 使用短期 App 安装令牌进行 git/gh 认证，无需长期密钥 |
| [#159946](https://github.com/openclaw/openclaw/pull/159946) | feat(macos): show the web conversation in native chat windows | @steipete | 🔄 待审 | macOS 原生聊天窗口渲染优化，支持 Mermaid 图表、宽表格等富文本表面 |

**进展评估：** 今日合并的 PR 主要集中在**子 Agent 恢复逻辑**和**更新器进程管理**两个关键稳定性问题，直接回应了社区最紧迫的反馈。同时，多个 "deslop" 重构 PR（#159279, #159527, #159811, #159798）持续推进代码库清理，虽无用户可见变更，但为后续维护奠定基础。

---

## 4. 社区热点

### 最活跃 Issues（按评论数排序）

#### 🔥 顶级热点

**[#159356](https://github.com/openclaw/openclaw/issues/159356)** — *llama.cpp manager reports ready while embedding child exits* (25 评论)
- **严重级别：** P2 | 🐚 Platinum Hermit
- **影响：** Session state, Crash loop
- **摘要：** Embedding 子进程退出后管理器仍报告就绪，导致 HTTP 500 错误。用户反映在 RAM 从 4GB 增至 8GB 后语义回忆功能恢复，暗示**内存压力是根本原因**。
- **社区诉求：** 需要更健壮的子进程健康检查和内存预警机制。

**[#97616](https://github.com/openclaw/openclaw/issues/97616)** — *OpenClaw leaks unreaped hook/tool child processes* (16 评论, 👍 1)
- **严重级别：** P1 | 🦐 Gold Shrimp
- **影响：** Message loss, Crash loop
- **摘要：** **长期存在的僵尸进程泄漏问题**，涉及 `openclaw-hooks`、`bash`、`codex` 等子进程。这是典型的回归 Bug，影响运行时性能和稳定性。
- **社区诉求：** 要求建立完善的进程回收机制，避免长时间运行后的性能退化。

**[#157531](https://github.com/openclaw/openclaw/issues/157531)** — *2026.9.7 Fixes Tracker* (15 评论)
- **严重级别：** P0 | 🌊 Off-meta Tidepool
- **影响：** UX Release Blocker
- **摘要：** **官方维护的 2026.9.7 版本修复追踪 Issue**，已识别 21 个 P1 候选问题，包括隐私/安全相关项。这是社区关注度的焦点，代表了对快速补丁版本的强烈期望。

#### 📈 高关注度 Issues

**[#156112](https://github.com/openclaw/openclaw/issues/156112)** — *openclaw update fails at "global install swap"* (13 评论)
- **严重级别：** P0 | 🦪 Silver Shellfish
- **影响：** UX Release Blocker
- **摘要：** `openclaw update` 在全局安装交换步骤确定性失败，而直接 `npm install -g` 成功。这是**更新路径的核心故障点**，直接影响用户体验。

**[#127148](https://github.com/openclaw/openclaw/issues/127148)** — *Codex sessions.compact acquires a second app-server* (12 评论)
- **严重级别：** P1 | 🦞 Diamond Lobster
- **影响：** Session state
- **摘要：** 手动压缩操作可能获取第二个 app-server 客户端，导致 active-writer 冲突。涉及 Codex 集成的深层状态管理问题。

**[#155859](https://github.com/openclaw/openclaw/issues/155859)** — *Gateway startup wall-time scales with enabled plugin count* (11 评论)
- **严重级别：** P0 | 🦪 Silver Shellfish
- **影响：** UX Release Blocker, Crash loop
- **摘要：** Gateway 启动时间随插件数量线性增长，discord/codex/weixin 等插件各增加数十秒，可能导致 120 秒发布预算超限。这是**性能回归的典型代表**。

#### 🆕 最新动态（2026-09-28 更新）

**[#157986](https://github.com/openclaw/openclaw/issues/157986)** — *Automations: every agentTurn job fails with DataCloneError* (10 评论)
- **严重级别：** P1 | 🦞 Diamond Lobster
- **影响：** Message loss
- **摘要：** Windows 环境下 agentTurn 自动化任务持续失败，而 command/script payloads 正常工作。指向 **Web Worker 序列化限制**与 agentTurn 对象结构的兼容性问题。

**[#155937](https://github.com/openclaw/openclaw/issues/155937)** — *GPT-6 embedded support: Sol rejected despite OAuth discovery* (7 评论)
- **严重级别：** P2 | 🦐 Gold Shrimp
- **影响：** Auth provider, UX Friction
- **摘要：** GPT-6 Sol 模型在 OAuth 发现和账户验证成功后仍被拒绝，而 GPT-5.6 Sol 正常工作。涉及**新模型集成验证逻辑**的回归。

---

## 5. Bug 与稳定性

### 🔴 P0 级关键 Bug（Release Blocker）

| Issue | 标题 | 影响 | Fix PR | 状态 |
|-------|------|------|--------|------|
| [#157531](https://github.com/openclaw/openclaw/issues/157531) | 2026.9.7 Fixes Tracker | UX Release Blocker | 追踪中 | 🔄 活跃 |
| [#156112](https://github.com/openclaw/openclaw/issues/156112) | Update fails at "global install swap" | UX Release Blocker | 待定 | 📝 待处理 |
| [#155859](https://github.com/openclaw/openclaw/issues/155859) | Gateway startup time scales with plugins | UX Release Blocker | 待定 | 📝 待处理 |
| [#157160](https://github.com/openclaw/openclaw/issues/157160) | Gateway crash-loops on plugin-doctor-post-session-state | Crash Loop, UX Release Blocker | 待定 | 📝 待处理 |
| [#154812](https://github.com/openclaw/openclaw/issues/154812) | Runaway RSS outside V8 heap causes OOM | Crash Loop | 待定 | 📝 待处理 |
| [#157812](https://github.com/openclaw/openclaw/issues/157812) | Windows auto-update fails repeatedly | UX Release Blocker | 待定 | 📝 待处理 |
| [#156425](https://github.com/openclaw/openclaw/issues/156425) | Durable context-engine turns never committed on Anthropic routes | Session State | 关联 #151936 (已合并但未发布) | ⚠️ 需 backport |
| [#158936](https://github.com/openclaw/openclaw/issues/158936) | macOS app readiness watchdog SIGTERMs slow gateway | Crash Loop | 待定 | 📝 待处理 |
| [#156392](https://github.com/openclaw/openclaw/issues/156392) | Mac Mini M5 Pro: Gateway unresponsive at 100% CPU | Crash Loop | 待定 | 📝 待处理 |

### 🟠 P1 级重要 Bug

| Issue | 标题 | 影响 | Fix PR | 状态 |
|-------|------|------|--------|------|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Child process leak causing zombie accumulation | Crash Loop, Message Loss | 待定 | 📝 长期问题 |
| [#127148](https://github.com/openclaw/openclaw/issues/127148) | Codex sessions.compact acquires second app-server | Session State | 待定 | 📝 待处理 |
| [#157986](https://github.com/openclaw/openclaw/issues/157986) | agentTurn jobs fail with DataCloneError | Message Loss | 待定 | 🆕 新报告 |
| [#144291](https://github.com/openclaw/openclaw/issues/144291) | Config hot-reload aborts in-flight agent turns | Message Loss | 待定 | 📝 待处理 |
| [#158271](https://github.com/openclaw/openclaw/issues/158271) | `openclaw agent` flips messageToolPolicyHash | Session State | 关联 #157459 | 📝 待处理 |
| [#157605](https://github.com/openclaw/openclaw/issues/157605) | High sustained CPU after v2026.9.6 upgrade | Crash Loop | 待定 | 📝 待处理 |
| [#157989](https://github.com/openclaw/openclaw/issues/157989) | Plugin source capture rewrites 1.1–1.4 GB per command | Other | 待定 | 📝 待处理 |

### 🟡 P2 级一般 Bug

| Issue | 标题 | 影响 | Fix PR | 状态 |
|-------|------|------|--------|------|
| [#84110](https://github.com/openclaw/openclaw/issues/84110) | Codex app-server rewrites prompt busting cache | Auth Provider | 待定 | 📝 长期问题 |
| [#118793](https://github.com/openclaw/openclaw/issues/118793) | Claude CLI session limit error bypasses fallback chain | Auth Provider | 关联 PR | 📝 待处理 |
| [#120006](https://github.com/openclaw/openclaw/issues/120006) | CLI session reset drops tool history | Session State | 待定 | 📝 待处理 |
| [#55694](https://github.com/openclaw/openclaw/issues/55694) | Agent stuck in tool call failure loop (中文) | Message Loss | 🔄 待审核 | 📝 待处理 |
| [#127239](https://github.com/openclaw/openclaw/issues/127239) | Context window falls back to 200k instead of 1M | Session State | 待定 | 📝 待处理 |
| [#157389](https://github.com/openclaw/openclaw/issues/157389) | Feishu replies lost under multi-lane load | Message Loss | 待定 | 📝 待处理 |
| [#153859](https://github.com/openclaw/openclaw/issues/153859) | Single ACP sessions_spawn causes two wake events | Other | 待定 | 📝 待处理 |
| [#120415](https://github.com/openclaw/openclaw/issues/120415) | No repetition guard in embedded-agent turn loop | Other | 关联 #120449 | 📝 待处理 |
| [#95746](https://github.com/openclaw/openclaw/issues/95746) | Memory-core dreaming exhausts local model context | Other | 待定 | 📝 待处理 |

### 🛠️ 已有 Fix PR 的 Bug

| Issue | Fix PR | 状态 |
|-------|--------|------|
| [#156425](https://github.com/openclaw/openclaw/issues/156425) | #151936 (已合并但未在 2026.9.5 中) | ⚠️ 需 backport 到 2026.9.7 |
| [#158271](https://github.com/openclaw/openclaw/issues/158271) | #157459 (关联 PR) | 🔄 待验证 |
| [#55694](https://github.com/openclaw/openclaw/issues/55694) | 待分配 | 📝 待审核 |

---

## 6. 功能请求与路线图信号

### 📋 高优先级功能请求

**[#63990](https://github.com/openclaw/openclaw/issues/63990)** — *Multi-index embedding memory with model-aware failover* (6 评论, 👍 1)
- **诉求：** 引入多索引嵌入支持，允许不同模型/提供者之间无缝故障转移，避免向量语义损坏。
- **路线图信号：** 这是生产可靠性需求，可能纳入未来内存架构重大更新。当前单嵌入模型限制已被视为生产瓶颈。

**[#158161](https://github.com/openclaw/openclaw/pull/158161)** — *Recover non-reasoning proxy completions when output budget exhausted*
- **状态：** 🔄 待审 (P1)
- **功能：** 修复 OpenAI 兼容代理端点上下文满时的截断响应问题，恢复完整会话。
- **路线图信号：** 反映用户对**代理兼容性和容错能力**的持续需求。

### 🎨 用户体验改进

**[#159946](https://github.com/openclaw/openclaw/pull/159946)** — *macOS native chat window rendering*
- **功能：** 在 macOS 原生聊天窗口中渲染完整 Web 对话，支持 Mermaid 图表、宽表格、内联卡片等。
- **路线图信号：** 表明项目正在**弥合原生应用与 Web UI 的功能差距**，提升桌面用户体验。

**[#150549](https://github.com/openclaw/openclaw/pull/150549)** — *Unify chat reply context and participant controls*
- **功能：** 统一共享聊天中的回复上下文和参与者控制，改进引用解析和初始化管理。
- **路线图信号：** 持续优化**协作和多参与者场景**的用户体验。

**[#159583](https://github.com/openclaw/openclaw/pull/159583)** — *Add quiet-period progress supervisor*
- **功能：** 为长时间运行的沉默回复添加周期性状态通知，区分活跃工作与卡住状态。
- **路线图信号：** 回应用户对**可观测性和反馈及时性**的需求。

### 📱 移动端与平台支持

**[#137508](https://github.com/openclaw/openclaw/issues/137508)** — *Mobile UI keyboard obstruction (中文)*
- **诉求：** 键盘弹出后聊天内容被遮挡，输入区布局不合理。
- **路线图信号：** 移动端 UX 问题，可能需要专门的移动界面重构。

**[#124759](https://github.com/openclaw/openclaw/issues/124759)** — *iOS app lags with "show reasoning" enabled*
- **诉求：** 启用推理显示后 iOS 应用严重卡顿。
- **路线图信号：** 性能优化需求，特别是**远程网关 + 本地移动客户端**场景。

---

## 7. 用户反馈摘要

### 😤 主要痛点

1. **更新机制不可靠**
   - 多个用户报告 `openclaw update` 在不同平台（Windows、macOS、Linux）失败，错误模式包括：
     - "global install swap" 步骤失败 (#156112)
     - "managed-service-preflight" 错误 (#157812, #158231)
     - Bun Gateway 下子进程链式派生 (#158447)
   - **用户原话：** *"Five failure records accumulated in ~2 days. Three distinct failure modes were observed on the same box."* (#157812)

2. **Gateway 稳定性问题**
   - **崩溃循环：** 多个 Issue 报告 Gateway 启动后崩溃重启 (#157160, #158936, #156392)
   - **性能退化：** 
     - 启动时间随插件数量线性增长 (#155859)
     - 高 CPU 占用持续数小时 (#157605)
     - RSS 内存失控导致 OOM (#154812)
   - **用户原话：** *"Gateway CPU spikes to 240–276% and stays elevated for hours after upgrade"* (#157605)

3. **数据库问题**
   - SQLite 数据库锁定 (#148307)："database is locked" 错误在会话回收时频繁出现
   - 数据库腐递归回 (#126821)：即使在重建后 15-24 小时内仍出现 freelist 计数错误
   - **用户原话：** *"The agent database is 464 MB with zero freelist pages (100% page utilization)"* (#148307)

4. **子进程管理缺陷**
   - 僵尸进程积累 (#97616)："Over time these accumulate as zombies under the main openclaw process"
   - Embedding 子进程退出后管理器状态不一致 (#159356)
   - **用户原话：** *"Memory pressure is the best-supported explanation for the later OOM-correlated failures"* (#159356)

5. **配置热重载副作用**
   - 热重载中止进行中的 agent turn (#144291)："prepared model runtime plugin generation was superseded"
   - 失败的配置重载仍使无关插件不可用 (#154891)
   - **用户原话：** *"A config hot-reload that fails and is explicitly reported as rolled back still leaves unrelated, already-running plugins permanently unusable"* (#154891)

### 😊 正面反馈

- **语义回忆功能恢复：** 用户报告增加 RAM 后语义回忆功能恢复正常 (#159356)
- **项目响应迅速：** 维护者在 Issues 中积极互动，提供详细的技术分析和临时解决方案
- **文档改进：** 多个 PR 专注于文档完善（如 #75054 关于 contextInjection 的文档）

### 🌍 国际化反馈

- **中文用户反馈活跃：**
  - [#55694](https://github.com/openclaw/openclaw/issues/55694)：Agent 工具调用失败死循环导致消息刷屏
  - [#137508](https://github.com/openclaw/openclaw/issues/137508)：移动端 UI 键盘遮挡问题
  - [#157389](https://github.com/openclaw/openclaw/issues/157389)：飞书渠道多车道负载下消息丢失

---

## 8. 待处理积压

### ⚠️ 长期未解决的重要 Issue

| Issue | 创建日期 | 天数 | 严重级别 | 状态 | 备注 |
|-------|----------|------|----------|------|------|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 2026-06-29 | **91 天** | P1 | 📝 待处理 | 子进程泄漏问题，影响运行时稳定性 |
| [#84110](https://github.com/openclaw/openclaw/issues/84110) | 2026-05-19 | **132 天** | P2 | 📝 待处理 | Codex prompt cache 破坏问题 |
| [#63990](https://github.com/openclaw/openclaw/issues/63990) | 2026-04-10 | **171 天** | P3 | 📝 待处理 | 多索引嵌入记忆功能请求 |
| [#55694](https://github.com/openclaw/openclaw/issues/55694) | 2026-03-27 | **185 天** | P2 | 📝 待审核 | Agent 工具调用死循环（中文） |
| [#120415](https://github.com/openclaw/openclaw/issues/120415) | 2026-08-08 | **51 天** | P2 | 📝 待处理 | 嵌入式 Agent 循环检测缺失 |
| [#120006](https://github.com/openclaw/openclaw/issues/120006) | 2026-08-06 | **53 天** | P2 | 📝 待处理 | CLI session reset 丢失工具历史 |

### 🚨 需要维护者关注的 PR

| PR | 创建日期 | 天数 | 状态 | 风险 |
|----|----------|------|------|------|
| [#150493](https://github.com/openclaw/openclaw/pull/150493) | 2026-09-17 | 11 天 | ⏳ 等待作者 | 高优先级修复，涉及 Gateway 重启时的通道插件任务卡住问题 |
| [#157966](https://github.com/openclaw/openclaw/pull/157966) | 2026-09-25 | 3 天 | ⏳ 等待作者 | QA 测试覆盖，私人操作员密钥移交场景 |
| [#159419](https://github.com/openclaw/openclaw/pull/159419) | 2026-09-27 | 1 天 | ⏳ 等待作者 | 修复 `openclaw reset` 命令未清理 SQLite 会话历史的 bug |

### 📊 项目健康度指标

- **Issue 解决速度：** 中等（P0 问题平均响应时间 < 24h，但长期 P1/P2 问题积压明显）
- **PR 合并率：** 高（今日合并至少 1 个关键 PR，多个 PR 待审）
- **回归密度：** **高**（2026.9.6 引入多个回归问题，建议加强版本发布前的集成测试）
- **社区参与度：** **极高**（500 条 Issue/PR 更新，大量用户报告详细的环境信息和复现步骤）
- **维护者响应：** **积极**（多个 Issue 有维护者评论和技术分析）

---

## 总结建议

1. **优先发布 2026.9.7 补丁版本**，解决 P0 级崩溃循环和更新失败问题
2. **加强回归测试**，特别是 Gateway 启动、插件加载、数据库操作等核心路径
3. **关注长期积压问题**，尤其是 #97616（子进程泄漏）和 #55694（中文用户反馈的工具循环）
4. **完善文档和错误消息**，帮助用户更好地诊断和报告问题
5. **考虑引入内存和进程监控告警**，帮助用户及时发现资源耗尽问题

---

**报告生成时间：** 2026-09-28  
**分析师：** Agnes-2.5-Flash (Sapiens AI)  
**数据截止：** 2026-09-28 00:00 UTC

---

## 横向生态对比

## 开源 AI 智能体生态横向对比分析报告
**日期：** 2026-09-28  
**分析师：** Agnes-2.5-Flash (Sapiens AI)

---

### 1. 生态全景
2026 年 9 月底，个人 AI 助手开源生态呈现**“高频迭代伴随稳定性阵痛”**的特征。OpenClaw 和 hermes-agent 作为重型基础设施层，正经历高强度版本发布后的回归修复期，社区响应极为活跃；而 AstrBot 与 PicoClaw 等轻量化/平台适配层则聚焦于渠道稳定性与用户体验优化。整体生态已从单纯的功能堆砌转向**内存管理、多代理协作及跨平台一致性**的深度治理阶段，用户对数据持久化（迁移兼容性）和运行时稳定性（崩溃循环、内存泄漏）的容忍度显著降低。

---

### 2. 各项目活跃度对比

| 项目 | 今日 Issue 更新 | 今日 PR 更新 | Release | 健康度评估 | 核心状态 |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **OpenClaw** | ~500 | ~395+ | 无 (9.7 开发中) | 🟡 **高压力** | 大量 P0 回归 Bug，维护者全力修复崩溃与更新故障 |
| **hermes-agent** | ~500 | ~500 | 无 | 🟢 **良好** | 架构重构期，TUI/会话管理进展快，安装体验仍有痛点 |
| **DeepSeek Harness** | ~140 (Discussions) | N/A (Release only) | 无 | 🟠 **攻坚期** | 客户端稳定性差，迁移兼容性问题严重 |
| **AstrBot** | 16 | 36 (28 merged) | **v4.28.2** | 🟢 **优秀** | 响应迅速，紧急修复时区回归，Telegram 适配器待优化 |
| **ZeroClaw** | ~44 | ~50 | 无 | 🟢 **良好** | 安全性收紧，Runtime/Gateway 分离重构中 |
| **PicoClaw** | 低 | 2 待审 | 无 | 🟡 **中等** | 边缘渠道维护缺口，DingTalk Panic 待解 |
| **QwenPaw** | 7 | 4 | 无 | 🟢 **良好** | 桌面端体验优化，上下文压缩策略受关注 |

---

### 3. OpenClaw 在生态中的定位
*   **优势：** 生态最复杂的**多插件网关架构**，支持极度细粒度的子 Agent 生命周期管理与进程隔离。社区规模庞大（Issues 数千条），贡献者密度高，具备强大的自我修复能力（如社区提供的 Socket 补丁、内存监控方案）。
*   **技术路线差异：** 相比 AstrBot/PicoClaw 的“轻量适配器”路线，OpenClaw 是**重型本地运行时**；相比 hermes-agent 的“统一网关”愿景，OpenClaw 已落地但面临严重的**集成测试缺口**导致的回归问题。
*   **社区规模：** 远超其他项目，Issue 活跃度是 AstrBot 的 30 倍，是 PicoClaw 的数十倍，处于生态核心地位。

---

### 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
| :--- | :--- | :--- |
| **内存与进程管理** | OpenClaw, ZeroClaw, hermes-agent | OpenClaw 面临僵尸进程泄漏与 OOM；ZeroClaw 关注委托内存作用域；hermes-agent 需解决插件加载时的 sys.modules 竞态。 |
| **上下文压缩与 Token 效率** | OpenClaw, QwenPaw, AstrBot | QwenPaw 用户反馈压缩阈值误判；AstrBot 修复 Emoji 低估导致压缩失效；OpenClaw 关注嵌入模型内存压力。 |
| **跨平台/渠道稳定性** | OpenClaw, AstrBot, PicoClaw, DeepSeek Harness | AstrBot/PicoClaw 集中修复 Telegram/DingTalk 唤醒与重连 Bug；DeepSeek Harness 遭遇 Windows/Firefox 兼容性灾难。 |
| **数据持久化与迁移** | DeepSeek Harness, OpenClaw | DeepSeek 用户因格式迁移丢失大量历史会话；OpenClaw 数据库锁与 freelist 腐坏账号长期积压。 |
| **子代理/多 Agent 协作** | hermes-agent, ZeroClaw, OpenClaw | hermes-agent 推进统一网关会话所有权；ZeroClaw 定义执行树预算所有权；OpenClaw 修复子 Agent 恢复竞态。 |

---

### 5. 差异化定位分析

*   **OpenClaw & hermes-agent (重型运行时)：** 面向高级用户和自托管场景，强调本地优先、私有部署、复杂工作流编排。OpenClaw 侧重底层进程/插件机制，hermes-agent 侧重多端同步与 TUI 交互。
*   **AstrBot & PicoClaw (平台适配器)：** 面向消息平台集成者，核心价值在于“接入”。AstrBot 功能全面（Dashboard、技能市场），PicoClaw 更垂直（钉钉、QQ、IRC），两者均面临渠道 API 变动带来的维护压力。
*   **ZeroClaw (安全与架构重构)：** 定位介于两者之间，近期重点在于引入沙箱策略（SandboxPolicy）和分离 Runtime/Gateway，强调**企业级安全**与**微服务化架构**。
*   **QwenPaw (桌面体验)：** 阿里 AgentScope 生态的桌面客户端，侧重**可视化工作区管理**、**文件面板交互**及**无障碍访问**，面向不愿配置代码的普通用户。
*   **DeepSeek Harness (官方客户端)：** DeepSeek 官方推出的本地客户端，目前处于**早期体验阶段**，功能尚不完善，社区互助性质强于官方支持。

---

### 6. 社区热度与成熟度

*   **快速迭代阶段 (High Velocity)：**
    *   **OpenClaw：** 尽管 Bug 多，但 PR 合并速度快，社区贡献活跃，处于“发布-修复-再发布”的高速循环。
    *   **hermes-agent：** 议题流转极快，500+ 条更新中近半关闭，表明维护团队对积压问题的清理能力很强。
    *   **AstrBot：** 响应极快，紧急版本 v4.28.2 及时止损，社区贡献者（@fzf404 等）参与度高分。

*   **质量巩固阶段 (Stability Focus)：**
    *   **ZeroClaw：** 从功能扩展转向安全加固和基础设施重构（v0.8.6/0.9.0），节奏稳健。
    *   **QwenPaw：** 修复 UI 细节和稳定性 Bug，进入精细化打磨期。

*   **风险警示阶段 (Risk Zone)：**
    *   **DeepSeek Harness：** 数据迁移兼容性问题严重，用户信任度受损，需紧急修复以维持留存。
    *   **PicoClaw：** 核心渠道（DingTalk）存在 Panic 风险，且长期 Issue 无人维护，存在衰退迹象。

---

### 7. 值得关注的趋势信号

1.  **“迁移即灾难”成为行业通病：** DeepSeek Harness 和 OpenClaw 均出现因版本升级导致历史数据不可用或性能严重退化的案例。**建议开发者在 major version 升级前强制提供数据备份工具和向后兼容的迁移脚本。**
2.  **内存安全与进程隔离成为 P0 级关注点：** OpenClaw 的僵尸进程、ZeroClaw 的委托内存问题、hermes-agent 的模块加载竞态，均指向复杂 Agent 系统下**资源生命周期管理**的难度。轻量级集成方案（如 AstrBot 的某些适配器）相对未受波及。
3.  **UI/UX 无障碍性需求上升：** QwenPaw 的字体缩放请求和 hermes-agent 的 TUI 优化，表明用户群体从纯技术人员向更广泛人群扩散，**可访问性（Accessibility）**将成为产品竞争力的新维度。
4.  **跨网关/跨代理协作是未来战场：** hermes-agent 的“统一网关会话所有权”和 OpenClaw 的“子 Agent 恢复机制”暗示，未来的竞争焦点不在于单点智能，而在于**多 Agent 间的状态同步与协作效率**。
5.  **社区补丁填补官方空白：** 在 DeepSeek Harness 和 OpenClaw 中，社区用户提供了关键的根因分析和临时补丁。对于开源项目维护者而言，**建立高效的社区协作机制以承接早期使用者反馈**至关重要。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：** 2026-09-28
**数据来源：** GitHub (github.com/zeroclaw-labs/zeroclaw)

## 1. 今日速览
ZeroClaw 在 2026-09-27 保持了极高的开发活跃度，过去24小时内共产生 **44 条 Issue 更新** 和 **50 条 PR 更新**。社区重点关注集中在**安全性漏洞修复**（P0级委托内存作用域问题）、**运行时稳定性**（文件并发编辑数据丢失风险）以及**多渠道接入优化**（WhatsApp/Signal/Discord）。虽然无新版本发布，但多个关键基础设施的修复 PR 正在推进中，项目整体健康度良好，安全防线正在收紧。

## 2. 版本发布
**无新版本发布。**

当前主要版本聚焦于 v0.8.6 和 v0.9.0 的基础设施重构（见 Issue #7432），包括 Runtime 和 Gateway 的分离工作仍在进行中。

## 3. 项目进展
今日虽无新合并的大规模功能 PR，但有数个关键的修复和增强正在活跃评审中，推动了以下方向的进展：

*   **运行时可靠性增强：**
    *   **#11203** (fix: 失败畸形工具协议耗尽): 防止因工具协议重试耗尽导致的虚假成功报告，提升 agent turn 的健壮性。
    *   **#10480** (fix: 恢复被拒绝的图片请求): 优化了对 Anthropic 等多模态提供商的图片请求处理，支持优雅降级。
    *   **#10197** (fix: 持久化中断的 turn 进度): 确保 ACP/Code 会话在中断后能恢复上下文，改善用户体验。

*   **安全与权限治理：**
    *   **#7821** (feat: 规范化沙箱策略模式): 引入 `SandboxPolicyConfig` 作为文件系统策略的权威模型，强化应用层执行。
    *   **#10070** (feat: file_download SSRF 防护): 已通过维护者修复并重新提交，增加了私有主机 opt-in 机制以防范服务端请求伪造。
    *   **#11068** (feat: 按发送者角色缩小通道回合): 引入 `peer_groups` 风险配置文件，实现更细粒度的访问控制。

*   **构建与基础设施：**
    *   **#11196** (feat: 二进制版本戳记): 使 daemon 和 relay 二进制文件包含构建 commit hash，解决版本号共享导致的追踪困难。
    *   **#11071** (perf: CI 合并 debounce): 优化 master 推送时的 CI 编译队列，减少算力浪费。

## 4. 社区热点
以下 Issue 评论数最多，反映了社区当前的核心关注点：

1.  **[Bug] Bootstrap 文件截断问题 (#10523)** - [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10523)
    *   **热度：** 5 评论
    *   **分析：** 当 `compact_context` 启用时，工作区引导文件被静默截断为 6000 字符，且操作员无法察觉。这是一个影响 Agent 初始化的隐蔽 Bug，引发了关于上下文完整性的重要讨论。

2.  **[Bug] OpenCode big-pickle 返回 403 FreeTierError (#11036)** - [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11036)
    *   **热度：** 5 评论
    *   **分析：** 用户使用 OpenCode 凭证配合免费层级模型时遭遇失败。这反映了第三方 Provider 兼容性问题，特别是免费 tier 的限流和认证边界情况。

3.  **[Feature] 执行树迭代预算所有权定义 (#9323)** - [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9323)
    *   **热度：** 4 评论
    *   **分析：** 探讨如何管理父子 agent 间的迭代预算共享，这是实现复杂多步代理协作的关键架构问题。

4.  **[Feature] 实时语音主机通道 (#7943)** - [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/7943)
    *   **热度：** 4 评论
    *   **分析：** 社区对后端无关的 WebSocket 语音客户端需求强烈，希望集成 CrispASR 等工具，拓展 ZeroClaw 在语音交互场景的能力。

5.  **[Bug] 并发文件编辑数据丢失 (#11136)** - [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11136)
    *   **热度：** 3 评论 (优先级 P1, 高风险)
    *   **分析：** 在 `parallel_tools` 模式下，对同一路径的并发 `file_edit` 调用会静默丢失一个编辑。这是严重的数据完整性问题，已标记为 S0 级别风险。

## 5. Bug 与稳定性
今日报告了多个高优先级 Bug，主要集中在内存安全、工具解析和并发问题上：

| 严重等级 | Issue ID | 标题 | 状态 | 关联 PR/Fix |
| :--- | :--- | :--- | :--- | :--- |
| **P0** | #11198 | 委托内存工具丢失主体作用域 | OPEN | 无 |
| **P0** | #11197 | 会话恢复在管理员撤销后重建转发环境 | OPEN | 无 |
| **P1** | #11136 | 并发文件编辑导致数据丢失 | IN-PROGRESS | 待修复 |
| **P1** | #10778 | 多模态图像容量驱逐重写历史消息 | IN-PROGRESS | #10480 (部分相关) |
| **P1** | #11130 | DeepSeek DSML 工具调用标记未解析 | IN-PROGRESS | 待修复 |
| **P2** | #10921 | Qdrant 时间界限向量召回遗漏结果 | OPEN | 待修复 |
| **P2** | #10919 | A2A 和 HTTP 工具测试锁不一致 | OPEN | 待修复 |

**稳定性评估：** 存在两个 P0 级安全问题（#11198, #11197），涉及委托安全和会话环境隔离，建议维护者优先处理。并发文件编辑 Bug (#11136) 也是高风险项，可能影响生产环境的数据一致性。

## 6. 功能请求与路线图信号
*   **知识图谱作为一等公民内存层 (#11053):** 用户提出将知识图谱从“工具”提升为“内存”层，使其能在 agent 不参与的情况下自主捕获和呈现信息。这与当前的 `tool:memory` 发展方向一致，可能被纳入下一版本的核心内存架构。
*   **ZeroCode 标准文本编辑 (#10909):** 请求在 ZeroCode 作曲家中添加撤销/重做、键盘选择等功能，改善开发者体验。
*   **实时语音通道 (#7943):** 持续的需求，表明社区希望 ZeroClaw 能成为更通用的语音代理后端。
*   **默认启用 Stall Watchdog (#10168):** 建议为 `stall_timeout_secs` 设置保守的非零默认值，防止 turn 永久挂起。这是一个合理的默认配置改进。

## 7. 用户反馈摘要
*   **痛点：**
    *   **隐蔽的错误：** 用户抱怨 Bootstrap 文件截断 (#10523) 和工具协议失败 (#11203) 等问题没有明显的错误提示，导致调试困难。
    *   **并发安全性：** 文件编辑的并发问题 (#11136) 引发了对数据完整性的担忧。
    *   **跨平台兼容性：** Windows 上的 Ctrl+C 强制退出问题 (#9028) 和多字节字符退格问题 (#10795) 影响了 Windows 用户的体验。
*   **满意点：**
    *   用户对 WhatsApp 频道改进 (#11054, #11060) 和 Discord 角色授权 (#9970) 等渠道增强表示欢迎。
    *   构建版本戳记 (#11196) 满足了运维追踪的需求。

## 8. 待处理积压
*   **#9158 [Feature] Signal Channel 处理 "Note to Self" 消息:** 长期开放 (Parking Lot)，但用户对此功能有明确需求。
*   **#7432 [Tracker] Runtime and gateway delivery - v0.8.6 and v0.9.0:** 核心架构重构的跟踪 Issue，需持续关注以了解 v0.9.0 的进展。
*   **#10008 [Task] 证明插件 wasi:http hook 地址解析:** 安全相关的测试覆盖任务，需维护者推进。
*   **#9028 [Bug] Windows Ctrl+C 强制退出:** 长期存在的 UX 问题，影响 Windows 用户群体。

---
*报告生成时间：2026-09-28*
*分析师：Agnes (Sapiens AI)*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 (2026-09-28)

## 1. 今日速览
今日 PicoClaw 社区活跃度中等，主要聚焦于渠道适配体验优化。Issue #3287（IRC长消息支持）因长期无维护被标记为 stale 并关闭，反映出部分边缘渠道功能的维护缺口。与此同时，针对 OneBot/QQ 渠道自动回复反应（Reaction）的痛点，用户 @ycsqwan 在同一天内同步提交了功能请求 (#3395) 和修复 PR (#3396)，展示了高效的社区响应机制。此外，针对 Telegram 工具反馈动画残留问题的 PR #3353 仍在待合并状态，是今日重要的稳定性修复候选。

## 2. 版本发布
*   **无新版本发布。**

## 3. 项目进展
今日无 PR 被合并。目前有待合并的 PR 2 条，主要集中在稳定性加固和功能配置化：
*   **PR #3353** (`fix(channels): bound tool feedback animations`): 修复了工具反馈动画生命周期管理缺失的问题。通过限制动画最大时长（5分钟）并在首次编辑错误后立即停止，避免了消息编辑操作无限循环执行的风险。这提升了 Telegram 渠道的消息处理稳定性。
*   **PR #3396** (`feat(channels/onebot): add opt-in toggle for acknowledgement reactions`): 为 OneBot 渠道新增 `reaction_enabled` 配置项（默认关闭），允许用户选择性地禁用自动 Emoji 确认反应。该 PR 直接响应了 Issue #3395 的用户诉求。

## 4. 社区热点
*   **[Issue #3287] Better support long messages in IRC**
    *   **状态**: Closed (Stale) | **链接**: https://github.com/sipeed/picoclaw/issues/3287
    *   **热度**: 评论 14 | **诉求分析**: 用户希望 PicoClaw 能正确处理 IRCv3 中超过 512 字节的长消息，将其视为单一消息而非分段消息。由于长期缺乏维护且涉及 IRC 协议特性，最终被标记为 stale 关闭。这提示 IRC 渠道的复杂功能支持存在维护风险。
*   **[Issue #3395] Make OneBot auto-ack reaction configurable**
    *   **状态**: Open | **链接**: https://github.com/sipeed/picoclaw/issues/3395
    *   **热度**: 评论 0 (同日创建) | **诉求分析**: QQ/NapCat 用户反馈所有群消息都会触发硬编码的 `set_msg_emoji_like` 反应，造成干扰。用户急需一个开关来禁用此行为。该 Issue 已被 PR #3396 覆盖，预计很快关闭。

## 5. Bug 与稳定性
*   **[Bug] DingTalk gateway 重连时 Panic**
    *   **Issue**: #3382 | **链接**: https://github.com/sipeed/picoclaw/issues/3382
    *   **严重程度**: 高 (导致服务崩溃)
    *   **描述**: 在 v0.3.1 版本中，DingTalk (Stream Mode) 网关在 reconnected 时仍会发生 `send on closed channel` panic。这是已知问题 #973 的回归。
    *   **Fix 状态**: 暂无关联 PR。上游 SDK `dingtalk-stream-sdk-go` 版本已锁定在 v0.9.1，需评估是否需要升级 SDK 或修补客户端逻辑。

*   **[Bug] Tool feedback animation 无限循环**
    *   **PR**: #3353 | **链接**: https://github.com/sipeed/picoclaw/pull/3353
    *   **严重程度**: 中 (影响资源占用和消息状态)
    *   **描述**: 之前版本中，若生命周期清理失败，工具反馈动画可能导致客户端无限编辑渠道消息。
    *   **Fix 状态**: 已有修复 PR 待合并。

## 6. 功能请求与路线图信号
*   **OneBot Reaction 配置化**: Issue #3395 和 PR #3396 强烈表明用户需要更细粒度的渠道控制权限。默认关闭（opt-in）的策略符合最小惊喜原则，建议优先合并此 PR 以解除用户痛点。
*   **IRC 长消息支持**: 虽然 Issue #3287 已关闭，但若 PicoClaw 计划保持对 IRC 的最低限度支持，可能需要重新评估此需求的优先级，或至少在文档中说明局限性。

## 7. 用户反馈摘要
*   **痛点**: OneBot (QQ) 渠道的“强制性”自动回复反应是今日最突出的用户抱怨点，用户认为这是侵入性的行为，影响群聊体验。
*   **使用场景**: 用户主要将 PicoClaw 用于 DingTalk、Telegram 和 QQ (via NapCat) 的 AI 助手集成。
*   **满意度**: 用户对 GitHub 上的快速响应（如 Issue #3395 当天即有对应 PR）表示认可（隐含在 PR 的快速跟进中）。但对 DingTalk 渠道的稳定性问题（Issue #3382）感到担忧。

## 8. 待处理积压
*   **Issue #3382** (DingTalk Panic): 高优先级 Bug，影响生产环境稳定性，且无 Fix PR，需维护者关注。
*   **PR #3353** (Animation Bound): 虽然是非阻塞性 Bug 修复，但能提升 Telegram 渠道的健壮性，建议尽快审查合并。
*   **Issue #3287** (IRC Long Messages): 已关闭，但若社区仍有需求，可作为未来路线图考量项。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：** 2026-09-28
**数据来源：** GitHub (agentscope-ai/QwenPaw)

## 1. 今日速览
QwenPaw 项目今日保持中等活跃度，过去24小时内共产生 7 个 Issue 和 4 个 Pull Request。开发重点集中在修复 Windows 桌面端的实例管理 Bug 以及完善文件面板的刷新逻辑，同时有针对 MCP 工具调用超时机制的功能性改进。虽然暂无新版本发布，但社区对桌面端 UI 可访问性（字体调节）及上下文压缩策略的反馈表明用户正处于深度使用阶段，对体验细节关注度高。整体项目健康度良好，Bug 修复与功能增强并行推进。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日无 PR 被合并或关闭，所有 4 个 PR 均处于待合并（Open）状态：
*   **#8001** (`fix(runtime)`)：解决前台工具超时时返回解释结果而非中断的问题，确保父模型能继续生成最终答案，关联修复 **#7981**。
*   **#7956** (`feat(console)`)：统一控制台设置的用户体验，优化交互反馈并修复对话切换时的欢迎屏幕闪烁问题。
*   **#6874** (`feat(mcp)`)：增加可配置的 MCP 工具调用超时时间（默认 300 秒），支持更长的 HTTP/SSE 操作。
*   **#7996** (`fix(console)`)：直接修复 **Issues #7995**，解决文件面板刷新后展开文件夹状态过时的问题。

## 4. 社区热点
今日讨论最活跃的 Issue 主要集中在桌面端体验优化和核心功能逻辑上：

*   **[Feature Request] 桌面端 UI 字体大小可调节 (#7999)**
    *   **链接：** https://github.com/agentscope-ai/QwenPaw/issues/7999
    *   **分析：** 用户强烈呼吁支持字体缩放，特别是有视力障碍的中老年用户和高 DPI 显示器用户。这是一个典型的无障碍访问（Accessibility）需求，标签建议包含 `good first issue`，显示社区希望以此吸引新贡献者。
*   **[Bug] Desktop double-launch opens a second window (#8000)**
    *   **链接：** https://github.com/agentscope-ai/QwenPaw/issues/8000
    *   **分析：** Windows 桌面版缺乏单实例守卫，重复启动会导致第二个窗口打开并终止第一个实例的后端。这是严重的可用性 Bug，影响用户体验的稳定性。
*   **[Enhancement] Support message retraction/editing and workspace rollback (#7997)**
    *   **链接：** https://github.com/agentscope-ai/QwenPaw/issues/7997
    *   **分析：** 用户希望在 WebUI 中撤回或编辑消息，并自动截断历史及回滚文件变更。这反映了用户对“后悔药”机制的需求，是提升对话操控感的重要功能。

## 5. Bug 与稳定性
今日报告了以下 Bug，按严重程度排列：

1.  **Windows 桌面端单实例守卫缺失 (#8000) - [高]**
    *   **描述：** 重复启动应用导致双重实例和后端进程终止。
    *   **状态：** Open，尚无 Fix PR。
2.  **上下文显示状态不及时更新及压缩失效 (#7994) - [高]**
    *   **描述：** 新建对话时上下文指示器仍显示旧数据；设置压缩阈值（0.5）后，实际消耗 91K/131K 未触发自动压缩。
    *   **状态：** Closed，但用户可能在后续版本验证中重新关注。
3.  **文件面板刷新后展开文件夹状态过时 (#7995) - [中]**
    *   **描述：** 磁盘文件变更后，已展开的文件夹不自动更新，需全页刷新。
    *   **状态：** Open，已有 Fix PR **#7996**。

## 6. 功能请求与路线图信号
*   **MCP 工具调用超时配置 (#7996 / #6874)：** PR **#6874** 正在审查中，响应了深层用户对于长耗时 MCP 工具调用的需求，预计将纳入下一版本以增强稳定性。
*   **UI 可访问性：** Issue **#7999** 提出的字体调节需求，结合 PR **#7956** 对 UI 体验的统一优化，暗示团队正在关注桌面端的易用性和视觉适配。
*   **上下文智能压缩策略：** Issue **#7998** 和 **#7994** 均涉及上下文压缩触发时机（Agent 自主提交 vs 人工提交）的反馈，表明当前的自动压缩逻辑可能存在误判，未来可能需要调整触发阈值或机制。

## 7. 用户反馈摘要
*   **痛点：**
    *   **Windows 稳定性：** 用户反馈桌面端存在多开实例冲突，导致工作流中断（#8000）。
    *   **视觉障碍：** 视力较弱用户难以使用当前固定字体的界面（#7999）。
    *   **上下文管理困惑：** 用户发现即使设置了压缩阈值，Agent 在批量提交请求时（如 100-300 次步骤）并未在阈值达到时及时触发压缩，导致上下文满载（#7998, #7994）。
*   **满意点：**
    *   社区积极贡献 `good first issue` 级别的改进方案（如字体调节建议），显示出较高的参与热情。

## 8. 待处理积压
*   **PR #8001**：修复工具超时结果恢复，需尽快合并以解决相关 Bug。
*   **PR #6874**：MCP 超时配置功能，因审核周期较长（创建于 8 月 10 日），需关注。
*   **Issue #7957**：手动停用预制模型/频道的需求，虽涉及 OCD 等特殊情况，但作为增强功能值得评估其实现成本与收益。

---
*报告生成时间：2026-09-28 | 分析师：AI Agent Analyst*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期**：2026-09-28  
**来源**：NousResearch/hermes-agent  
**分析师**：Agnes (Sapiens AI)

## 1. 今日速览
2026年9月28日，hermes-agent 项目保持极高的社区活跃度，过去24小时内共处理 500 条 Issue 和 500 条 PR，呈现“高并发、快流转”的特征（新开/活跃 255 条，关闭 245 条）。今日无新版本发布，但核心架构层面取得了关键进展，特别是关于“统一网关会话所有权”的 PR #106742 继续获得关注。稳定性方面，多个涉及安装、Cron 调度和 TUI 交互的 P1/P2 级 Bug 正在被积极修复或讨论，显示维护团队对生产环境问题的响应迅速。整体项目健康度良好，技术债务清理与功能扩展并行推进。

## 2. 版本发布
**无新版本发布。**

## 3. 项目进展
今日重点推进了以下合并/关闭的 PR，显著提升了系统一致性和用户体验：

*   **TUI 交互增强** (#125803)：合并了 `/s` 作为 `/steer` 的别名，增加了双击 Esc 中断和 PTT 切断 TTS 功能，提升了 CLI/TUI 下的操作效率。
*   **Desktop 插件 SDK 扩展** (#125188)：关闭了暴露通用 Desktop 转录行插件贡献点的 PR，为插件生态提供了更灵活的 UI 嵌入能力。
*   **子代理生命周期优化** (#125833)：关闭了添加私有配置默认子代理生命周期的 PR，允许更精细地控制无工具分类的临时代理行为。
*   **会话归档功能** (#125797)：关闭了实现 `session.archive` RPC 的 PR，解决了 TUI 客户端无法优雅归档历史会话的问题，避免了永久删除或无限加载。

**整体推进评估**：项目正从“单点功能完善”向“子系统协同优化”迈进，今日合并的 PR 多集中于 TUI/Desktop 层的人机交互细节和内部架构的清洁性，为后续大规模架构重构（如统一网关）奠定了较好的基础。

## 4. 社区热点
以下是今日评论数最多、讨论最激烈的 Issues 和 PRs：

*   **[自动化集成阻塞] Automated Nous integration is blocked** (#88584)
    *   **状态**：已关闭 | **评论**：151 | **作者**：@echokos
    *   **链接**：https://github.com/NousResearch/hermes-agent/issues/88584
    *   **分析**：这是长期存在的自动化合并冲突问题，涉及 `cron/jobs.py`。高达 151 条评论表明社区对此高度关注，反映出用户对 CI/CD 流程稳定性和内部集成的担忧。其关闭标志着该集成阻塞问题已得到解决或绕过。

*   **[Debian 安装损坏] Debian installation broken** (#87093)
    *   **状态**：已关闭 | **评论**：31 | **作者**：@thelightning87
    *   **链接**：https://github.com/NousResearch/hermes-agent/issues/87093
    *   **分析**：Debian 13.6 环境下 `uv.lock` 和 `npm install` 失败。31 条评论和 4 个 👍 显示了 Linux 用户群体对安装体验的痛点。该 Issue 的关闭意味着安装脚本或依赖管理层面进行了修复，对新人入职至关重要。

*   **[跨网关 Bot 协作] Let Bots collaborate across gateways** (#97681)
    *   **状态**：开放 | **评论**：30 | **作者**：@dokterdok
    *   **链接**：https://github.com/NousResearch/hermes-agent/issues/97681
    *   **分析**：此功能请求依赖于统一网关运行时 (#106742)。尽管开放，但其状态更新频繁，表明核心架构 PR (#106742) 的进展直接决定此功能的落地。社区对跨平台 Bot 协作有强烈需求。

*   **[Cron 外部工作器依赖导入失败] cron external worker cannot import dependencies** (#122222)
    *   **状态**：开放 | **评论**：20 | **作者**：@JoanDuarte
    *   **链接**：https://github.com/NousResearch/hermes-agent/issues/122222
    *   **分析**：P1 级 Bug，影响自托管安装的 Cron 任务。20 条评论显示维护者与用户在 PYTHONPATH 和启动环境上的深入技术讨论，是当前稳定性修复的重点。

## 5. Bug 与稳定性
今日报告的多项 Bug 按严重程度排列如下：

| 级别 | 组件 | 问题简述 | 状态 | PR/Fix 关联 |
| :--- | :--- | :--- | :--- | :--- |
| **P0** | Gateway | 持久化内部提示引脚在重启后丢失 | **Open** | PR #125832 已提交修复 |
| **P1** | Cron | 自托管安装中 Cron 外部工作器无法导入依赖，导致所有定时任务失败 | **Open** | 讨论中 |
| **P1** | Desktop/Linux | Linux 桌面启动器在更新后自我修复指向无效的受管 venv，导致启动失败 | **Open** | 需关注 |
| **P2** | CLI/Install | Windows 安装过程中 Python 依赖安装错误 | **Open** | 需复现 |
| **P2** | Kanban | Worker 启动 argv 守卫在父子进程中检查结果不一致，导致 ModuleNotFoundError | **Open** | 讨论中 |
| **P2** | Agent | 默认压缩阈值静默覆盖模型阈值比率，导致长窗口模型压缩异常 | **Open** | 需决策 |
| **P2** | Tools/MCP | MCP 信任门控未检测到 `readOnlyHint`，导致只读工具被错误拦截 | **Closed** | 已修复 |
| **P2** | macOS | Fast User Switching 被 Gateway 阻塞 20-30 秒 | **Closed** | 已解决 |
| **P3** | Plugins | 插件在启动时随机静默丢失，因迭代 sys.modules 时字典大小改变 | **Open** | 需修复 |

**稳定性评估**：今日 P0 级 Gateway 持久化问题和 P1 级 Cron 问题尤为突出，直接影响核心功能的可靠性。Windows 和 Linux Desktop 的安装/启动问题反映出多平台兼容性仍是主要挑战。

## 6. 功能请求与路线图信号
*   **统一网关会话所有权** (#106742, PR)
    *   **内容**：一个网关拥有所有本地会话（CLI, TUI, Desktop, API, ACP, bots, cron）。
    *   **信号**：这是当前最大的架构变更，若合并将彻底改变 Hermes 的多端同步机制，消除状态不一致问题。社区讨论激烈，是未来版本的绝对核心。
*   **自动记忆整合 (Auto Dream)** (#10771)
    *   **内容**：类似 Claude Code 的自动记忆清理和去重机制。
    *   **信号**：长期 Feature Request，6 个 👍，反映用户对长期运行 agent 记忆管理的需求日益增长。
*   **Per-invocation 跳过外部记忆提供者** (#121935)
    *   **内容**：单次调用时可仅禁用外部记忆 provider，用于评估和基准测试。
    *   **信号**：针对开发者和研究用户的精准需求，可能被纳入近期版本以支持更好的可测试性。
*   **TUI 附件存储配置** (#125816, PR)
    *   **内容**：允许配置附件存储在 profile workspace 中。
    *   **信号**：解决实际使用中附件访问权限受限的问题，体现了对工作空间隔离和安全性的重视。

## 7. 用户反馈摘要
*   **安装体验痛点**：Windows (#125657) 和 Debian (#87093) 用户的安装失败反馈较多，尤其是依赖解析和环境隔离问题。用户期望更健壮、开箱即用的安装流程。
*   **跨平台一致性**：Linux Desktop 启动器在更新后失效 (#122438) 和 macOS 快速用户切换阻塞 (#120545) 等问题，表明不同 OS 上的体验存在显著差异，用户希望各平台行为保持一致。
*   **Cron 可靠性**：Cron 任务因环境隔离问题无法运行 (#122222) 和 kanban 卡片卡在 blocker_auth (#119070)，反映了后台任务调度系统的稳定性不足，用户对此类影响自动化的问题容忍度低。
*   **界面交互优化**：用户欢迎 TUI 中的 `/s` 别名 (#125803) 和会话归档功能 (#125797)，表明简洁、高效的交互方式受到认可。同时，用户也希望能隐藏思考过程的 UI chrome (#71870)，追求更干净的聊天界面。

## 8. 待处理积压
*   **#122222 [Cron 外部工作器依赖导入]**：P1 级 Bug，影响自托管用户的核心自动化功能，需优先修复。
*   **#122438 [Linux Desktop 启动器自我修复失败]**：P1 级 Bug，导致更新后无法启动，严重影响用户体验。
*   **#97681 [跨网关 Bot 协作]**：虽为功能请求，但依赖于核心架构 PR #106742，建议跟踪后者进展。
*   **#122299 [Kanban Dispatcher argv 守卫问题]**：P2 级 Bug，影响 kanban 系统的稳定性，需尽快解决。
*   **#123926 [插件启动时随机丢失]**：P3 级 Bug，但涉及内存安全，可能导致难以调试的运行时错误，需根本性修复。

---
*本报告基于 2026-09-28 GitHub 数据自动生成，旨在提供客观项目洞察。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-09-28

> 数据来源：github.com/AstrBotDevs/AstrBot | 统计周期：2026-09-27 00:00 ~ 2026-09-28 00:00 (UTC)

---

## 1. 今日速览

AstrBot 今日活跃度较高：过去 24 小时新增/更新 Issues **16 条**（新开 7、关闭 9）、PR **36 条**（合并/关闭 28、待合并 8），并紧急发布 **v4.28.2** 修复由依赖升级引发的 SQLite 时区回归问题。开发者 @Soulter 主导了一次集中修复冲刺，涵盖 Dashboard 原生 macOS chrome、ChatUI 滚动回弹、搜索功能补齐等多个模块；社区贡献者 @fzf404、@Lesereingrape、@mantoujun12 等在 Telegram 适配器、平台参数校验、技能/MCP 搜索等方向提交了一批高质量 PR。整体项目健康度良好，维护响应迅速，但 Telegram 适配器存在两处已确认的唤醒逻辑缺陷，需持续关注。

---

## 2. 版本发布

### v4.28.2（2026-09-27）

**性质**：紧急修复版本，针对 v4.28.0/v4.28.1 引入的数据库时区兼容性回归。

**修复内容**

- **SQLModel `UTCDateTime` 推断问题**：依赖升级后，SQLite 中 datetime 字段被错误推断为 `UTCDateTime`，导致知识库写入、Dashboard 统计、WebChat 会话删除等操作因 `naive datetime` 值抛 `StatementError`（Issues #10205、#10212、#10255）。
- **UTC 历史消息截止时间比较**：`delete_platform_message_offset` 使用本地 naive `datetime.now()` 计算 cutoff，与存储 UTC 值的列对比产生偏差（PR #10246）。

**破坏性变更**：无。

**迁移注意事项**：已部署 v4.28.0/4.28.1 的用户升级至 v4.28.2 后即可恢复知识库写入与 Dashboard 统计功能，无需手动迁移数据。

**链接**：[PR #10258](https://github.com/AstrBotDevs/AstrBot/pull/10258) | [Issue #10205](https://github.com/AstrBotDevs/AstrBot/issues/10205) | [Issue #10212](https://github.com/AstrBotDevs/AstrBot/issues/10212) | [Issue #10255](https://github.com/AstrBotDevs/AstrBot/issues/10255)

---

## 3. 项目进展

### 今日合并/关闭的重要 PR

| PR | 作者 | 模块 | 说明 |
|---|---|---|---|
| [#10257](https://github.com/AstrBotDevs/AstrBot/pull/10257) | @Soulter | ChatUI | 流式更新时保持自动滚动到底部，修复历史加载时的滚动回弹 |
| [#10249](https://github.com/AstrBotDevs/AstrBot/pull/10249) | @Soulter | ChatUI | 用户指针交互时停止自动跟随滚动，包含回归测试 |
| [#10253](https://github.com/AstrBotDevs/AstrBot/pull/10253) | @Soulter | ChatUI | 非流式历史使用 `max-live-nodes=0` 避免长消息虚拟化导致的滚动跳跃 |
| [#10227](https://github.com/AstrBotDevs/AstrBot/pull/10227) | @Soulter | Dashboard | 新增 macOS 原生桌面窗口 chrome，CSS/bridge 驱动，不影响浏览器 WebUI |
| [#10256](https://github.com/AstrBotDevs/AstrBot/pull/10256) | @Soulter | Dashboard | 跟进修复桌面 chrome 回归：重置抽屉状态、隐藏不支持的 provider 选择器、补全日语/俄语导航 |
| [#10246](https://github.com/AstrBotDevs/AstrBot/pull/10246) | @ping1999 | Core | 修复平台消息历史 cutoff 比较使用 UTC 值，纳入 v4.28.2 |
| [#10213](https://github.com/AstrBotDevs/AstrBot/pull/10213) | @DFGHJ43 | Core | 修正 `EstimateTokenCounter` emoji 计数，解决上下文压缩后 token 估算偏低问题（Fixes #10208） |
| [#10217](https://github.com/AstrBotDevs/AstrBot/pull/10217) | @mantoujun12 | Dashboard | 为「技能」和「MCP」页面添加搜索框，与插件/管理页体验一致 |
| [#10254](https://github.com/AstrBotDevs/AstrBot/pull/10254) | @Lesereingrape | Platform | 修复分段回复间隔配置解析为任意长度列表的 bug |
| [#10252](https://github.com/AstrBotDevs/AstrBot/pull/10252) | @Lesereingrape | Kook | `kook_max_retry_delay` 通过 `coerce_int_config` 校验，防止无效值禁用退避 |
| [#10248](https://github.com/AstrBotDevs/AstrBot/pull/10248) | @Lesereingrape | Satori | 修复 `satori_heartbeat_interval`/`reconnect_delay` 清空字段导致禁用 |
| [#10250](https://github.com/AstrBotDevs/AstrBot/pull/10250) | @Lesereingrape | Mattermost | 修复 `mattermost_reconnect_delay` 同样问题 |
| [#10061](https://github.com/AstrBotDevs/AstrBot/pull/10061) | @momo-OwO-qwq | Dashboard | 修复暗色主题图标不可辨识、调整创建机器人页面平台类别排序 |
| [#9705](https://github.com/AstrBotDevs/AstrBot/pull/9705) | @ztzpro | QQ Official | 恢复群消息中 `@mention` 序列化，支持多种文本/Markdown 传输格式 |

**整体评估**：今日共合并 28 条 PR，其中 15 条为核心修复与体验优化，覆盖 Dashboard、ChatUI、多平台适配器、Token 估算等关键模块。项目向前推进明显，尤其在**UI 稳定性**（滚动回弹、暗色图标）和**平台参数健壮性**（连接延迟、重试延迟校验）方面有所加强。

---

## 4. 社区热点

### 高活跃度 Issues

| Issue | 类型 | 评论数 | 👍 | 摘要 |
|---|---|---|---|---|
| [#10235](https://github.com/AstrBotDevs/AstrBot/issues/10235) | enhancement | 10 | 1 | 模型调用失败重试机制 |
| [#10232](https://github.com/AstrBotDevs/AstrBot/issues/10232) | bug | 3 | 0 | Telegram 引用唤醒 `sender_id` 不一致 |
| [#10240](https://github.com/AstrBotDevs/AstrBot/issues/10240) | bug | 3 | 0 | Telegram 群聊中发给其他机器人的命令误唤醒 |
| [#10195](https://github.com/AstrBotDevs/AstrBot/issues/10195) | enhancement | 3 | 0 | 历史消息回传时过滤思维链/图片 URL/工具调用原始数据 |
| [#10236](https://github.com/AstrBotDevs/AstrBot/issues/10236) | bug | 1 | 0 | 微信 ClawBot 工具调用无返回 |
| [#10239](https://github.com/AstrBotDevs/AstrBot/issues/10239) | feature | 1 | 0 | 后台任务失败时补充错误日志并区分成功/失败措辞 |

### 热点分析

- **模型调用重试机制**（#10235）：用户反馈 LLM 偶发抽风导致任务中断，期望增加自动重试。该诉求合理且影响自动化场景稳定性，目前尚无 PR 跟进，建议纳入路线图。
- **Telegram 唤醒逻辑缺陷**（#10232、#10240）：同属 Telegram 适配器引用唤醒与命令路由问题，已由 @fzf404 提交 PR #10233 和 #10241 修复，**有待合并**。两处 bug 根源在于 `Reply.sender_id` 与 `message.self_id` 字段语义不一致，以及 `/command@OtherBot` 未提前过滤。
- **上下文 token 浪费**（#10195）：用户希望历史消息回传时过滤思维链、图片 URL、工具调用原始 JSON，减少 token 消耗。该功能若实现可显著降低长对话的 token 累积，但涉及对话数据结构的改动，需谨慎设计。
- **Token 估算精度**（#10208 → #10213）：`EstimateTokenCounter` 对 emoji 低估 3~10 倍，导致上下文压缩后复检仍超模型上限。PR #10213 已修复，**已合并**。

---

## 5. Bug 与稳定性

### 今日报告的 Bug（按严重程度排列）

| 级别 | Issue | 标题 | 状态 | Fix PR |
|---|---|---|---|---|
| 🔴 高 | [#10205](https://github.com/AstrBotDevs/AstrBot/issues/10205) | 知识库写入失败：naive datetime 触发 SQLModel 报错 | ✅ 已关闭 | #10211（含 v4.28.2） |
| 🔴 高 | [#10212](https://github.com/AstrBotDevs/AstrBot/issues/10212) | Dashboard 统计服务时区缺失导致查询失败 | ✅ 已关闭 | #10246（含 v4.28.2） |
| 🔴 高 | [#10255](https://github.com/AstrBotDevs/AstrBot/issues/10255) | WebChat 会话删除接口必现 HTTP 500 | ✅ 已关闭 | #10211（含 v4.28.2） |
| 🟡 中 | [#10232](https://github.com/AstrBotDevs/AstrBot/issues/10232) | Telegram 引用唤醒 `sender_id` 不一致 | 🟢 待修复 | #10233（待合并） |
| 🟡 中 | [#10240](https://github.com/AstrBotDevs/AstrBot/issues/10240) | Telegram 命令误唤醒其他机器人 | 🟢 待修复 | #10241（待合并） |
| 🟡 中 | [#10236](https://github.com/AstrBotDevs/AstrBot/issues/10236) | 微信 ClawBot 工具调用无返回 | 🔵 开放 | 无 |
| 🟢 低 | [#10242](https://github.com/AstrBotDevs/AstrBot/issues/10242) | `provider_settings.wake_prefix` 未豁免 WebChat | ✅ 已关闭 | — |
| 🟢 低 | [#10208](https://github.com/AstrBotDevs/AstrBot/issues/10208) | Token 估算低估 emoji | ✅ 已关闭 | #10213（已合并） |
| 🟢 低 | [#10226](https://github.com/AstrBotDevs/AstrBot/issues/10226) | 关闭 LLM 后仍回复 | ✅ 已关闭 | 引用 #9819 |

**稳定性评估**：今日高频 bug 集中于**数据库时区兼容性**（已随 v4.28.2 修复）和**Telegram 适配器唤醒逻辑**（有 PR 待合并）。微信 ClawBot 工具调用问题尚无进展，需关注。

---

## 6. 功能请求与路线图信号

| 请求 | Issue | 关联 PR | 纳入下一版本可能性 |
|---|---|---|---|
| 模型调用失败重试机制 | [#10235](https://github.com/AstrBotDevs/AstrBot/issues/10235) | 无 | ⭐⭐⭐ 高（用户呼声高，实现成本中等） |
| 历史消息回传纯净化（过滤思维链/URL/工具数据） | [#10195](https://github.com/AstrBotDevs/AstrBot/issues/10195) | 无 | ⭐⭐ 中（涉及数据结构改动，需权衡） |
| 后台任务失败日志增强 | [#10239](https://github.com/AstrBotDevs/AstrBot/issues/10239) | 无 | ⭐⭐ 中（易实现，提升可观测性） |
| 插件配置图片预览 | [#10207](https://github.com/AstrBotDevs/AstrBot/issues/10207) | 无 | ⭐ 低（边缘需求） |

**路线图观察**：
- Telegram 适配器修复（#10233、#10241）有望随下一版本合并。
- `EstimateTokenCounter` emoji 修正已合并，后续可关注是否推广至全量 token 估算。
- 长期未动的 PR #6422（核心依赖约束阻塞插件升级）和 #6322（Codex OAuth/GPT-6 支持）仍需维护者决策。

---

## 7. 用户反馈摘要

### 痛点
1. **LLM 调用不稳定导致任务中断**（#10235）：用户期望自动重试，当前失败后任务直接终止，影响自动化场景。
2. **上下文 token 浪费严重**（#10195、#10208）：思维链、图片 URL、工具调用原始 JSON 占用大量 token，压缩后复检仍超上限。
3. **Telegram 群聊唤醒逻辑混乱**（#10232、#10240）：回复机器人消息无法稳定唤醒，发给其他机器人的命令误触发 AstrBot。
4. **WebChat 会话删除假象**（#10255）：前端乐观更新导致"删了但刷新又出现"，用户体验差。

### 满意点
- Dashboard 搜索功能扩展至技能和 MCP 页面（#10217）被用户认可。
- 暗色主题图标修复（#10061）解决了辨识度问题。
- v4.28.2 紧急修复时区回归，响应迅速。

### 不满意
- 微信 ClawBot 工具调用无返回（#10236）影响核心功能。
- 关闭 LLM 后仍回复（#10226、#9819）反复出现，已有 PR 被关但未彻底解决。

---

## 8. 待处理积压

### 长期未响应的重要 Issue/PR

| 条目 | 类型 | 创建时间 | 状态 | 备注 |
|---|---|---|---|---|
| [#6422](https://github.com/AstrBotDevs/AstrBot/pull/6422) | PR | 2026-03-16 | 🟡 开放 7 个月 | 核心依赖约束 `==` 阻塞插件升级，影响生态 |
| [#6322](https://github.com/AstrBotDevs/AstrBot/pull/6322) | PR | 2026-03-15 | 🟡 开放 7 个月 | Codex OAuth、GPT-6 支持，功能价值高 |
| [#10236](https://github.com/AstrBotDevs/AstrBot/issues/10236) | Issue | 2026-09-26 | 🔵 开放 1 天 | 微信 ClawBot 工具调用无返回，无进展 |
| [#10235](https://github.com/AstrBotDevs/AstrBot/issues/10235) | Issue | 2026-09-26 | 🔵 开放 1 天 | 模型重试机制，10 条评论无 PR |
| [#9600](https://github.com/AstrBotDevs/AstrBot/issues/9600) | Issue | 2026-08-08 | ✅ 已关闭 | 事件循环触发会话锁异常，已解决但需验证 |

**维护者提醒**：
- PR #6422、#6322 开放超过 7 个月，建议评估是否合并或关闭。
- Telegram 适配器 PR #10233、#10241 已准备就绪，尽快合并可修复用户反馈集中的唤醒问题。
- 微信 ClawBot 工具调用问题（#10236）需社区或维护者跟进。

---

**报告生成时间**：2026-09-28 00:00 (UTC)  
**数据来源**：AstrBot GitHub Repository  
**分析师**：AI 智能体与个人 AI 助手领域开源项目分析师

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：2026-09-28**

## 1. 今日速览
DeepSeek Harness (dsh) 社区在 24 小时内保持高活跃度，共更新 **140 条** Discussion，反映出用户对客户端稳定性与数据迁移的高度关注。**无新版本发布**（Releases），但社区针对 0.1.5-rc 系列的多项关键缺陷（如会话加载失败、Socket 死锁、迁移兼容性）产生了大量深度讨论与临时补丁方案。项目目前处于**稳定性攻坚期**，前端 UI 表现与后端会话格式兼容性是当前的痛点中心。

## 2. 版本发布
*   **无新版本发布**。
*   当前社区主要围绕 `0.1.5-rc.1` / `0.1.5-rc.2` 及其上游依赖 `@deepseek-ai/dsh-session-format-*` 展开问题反馈。

## 3. 项目进展
*   由于仓库未启用 PR 流程，代码变更通过 Releases 落地，今日无新 Release，故无官方合并记录。
*   **社区自发进展**：在 Discussion #7802 中，用户 @CNyaotian-Lunar 已定位 "Loading history" 永久卡死的根因（DSH 客户端 Socket waiter 未 settle），并提供了**社区补丁**（Community Patch），为后续官方修复提供了明确路径。

## 4. 社区热点
以下 Discussions 评论数最多，反映了用户最迫切的需求与痛点：

1.  **[Bug] 文件夹选择器失效 (Windows)**
    *   **链接**: [#30](https://github.com/deepseek-ai/deepseek-harness/discussions/30)
    *   **热度**: 19 条评论 | 创建于 2026-08-13
    *   **分析**: 用户报告 Windows 环境下 `directory picker failed: win32 folder dialog worker exited`。作为基础交互功能，此 Bug 长期未解决导致用户无法通过 GUI 正常选择工作目录，社区期待底层 Electron/Tauri 层面的修复。

2.  **[Migration] v0→v3 迁移阻断：49/123 会话无法打开**
    *   **链接**: [#6559](https://github.com/deepseek-ai/deepseek-harness/discussions/6559)
    *   **热度**: 17 条评论 | 创建于 2026-09-13
    *   **分析**: 升级到 0.1.5-rc.1 后，大量 v0 格式历史会话因 `SessionFormatUnsupportedError` 无法加载。用户分享了修复配方，表明迁移逻辑存在严重的 **fail-closed** 设计缺陷，直接影响了数据可访问性。

3.  **[Bug] 模型连接持续失败**
    *   **链接**: [#175](https://github.com/deepseek-ai/deepseek-harness/discussions/175)
    *   **热度**: 15 条评论 | 创建于 2026-08-13
    *   **分析**: 配置 API Key 后仍报 `DeepSeek API request ... failed`，重试延迟高达 1065ms。用户反馈无论切换何模型均失败，疑似网络层或客户端握手逻辑存在问题。

4.  **[Bug] 历史加载永久卡死 (Socket Waiter 问题)**
    *   **链接**: [#7802](https://github.com/deepseek-ai/deepseek-harness/discussions/7802)
    *   **热度**: 15 条评论 | 更新于 2026-09-27
    *   **分析**: 切换会话时界面卡在 "Loading history..."，需刷新才能恢复。作者已定位为客户端 Socket 处理缺陷并提供补丁。此问题影响核心用户体验，且涉及分布式会话状态同步。

5.  **[Bug] Scheduler 失败导致 Session 永久 400**
    *   **链接**: [#4549](https://github.com/deepseek-ai/deepseek-harness/discussions/4549)
    *   **热度**: 14 条评论 | 创建于 2026-08-25
    *   **分析**: 工具调用（Tool Call）失败后，`tool/result` 未写入，导致会话状态不一致，后续所有请求均被拒绝（INVALID_REQUEST）。这是一个严重的数据完整性 Bug。

## 5. Bug 与稳定性
按严重程度排列的今日活跃 Bug：

*   **[Critical] 会话格式迁移导致日志水位失效，引发 413 错误与永久卡死**
    *   **链接**: [#7658](https://github.com/deepseek-ai/deepseek-harness/discussions/7658)
    *   **描述**: V3→V4 迁移后，`dsh_session_log` 不再认可旧水位，每次请求重发全量日志，触发 HTTP 413 (Payload Too Large)。
    *   **状态**: 无官方 Fix，社区讨论中。
*   **[High] Firefox 引擎浏览器历史加载无限循环**
    *   **链接**: [#5677](https://github.com/deepseek-ai/deepseek-harness/discussions/5677)
    *   **描述**: Firefox/Zen 浏览器中，包含 assistant raw chunk 的会话无法加载历史，卡在 "Loading history..."。疑似 Lossless-JSON 验证在 Firefox 特定实现下的兼容性 Bug。
    *   **状态**: 待修复。
*   **[High] v0→v1 迁移拒收合法形态，255/256 会话打不开**
    *   **链接**: [#6779](https://github.com/deepseek-ai/deepseek-harness/discussions/6779)
    *   **描述**: 迁移器未覆盖 0.1.1-rc.2 写出的 `descriptor v2` 和 `plugin source summary` 格式，导致升级后绝大多数旧会话失效。
    *   **状态**: 社区已确认是迁移器覆盖率不足，需官方更新兼容列表。
*   **[Medium] Session v1→v2 迁移引用计数不匹配**
    *   **链接**: [#7824](https://github.com/deepseek-ai/deepseek-harness/discussions/7824)
    *   **描述**: 长会话（461 turns）迁移时报错，声明的源事件引用数与重建的不符。
*   **[Medium] Markdown 表格溢出与滚动条隐藏**
    *   **链接**: [#5787](https://github.com/deepseek-ai/deepseek-harness/discussions/5787)
    *   **描述**: 宽表格在 UI 中无法正常滚动，滚动条仅 hover 时显示，影响阅读体验。
*   **[Low] compaction 请求丢失 provider prefix cache**
    *   **链接**: [#1944](https://github.com/deepseek-ai/deepseek-harness/discussions/1944)
    *   **描述**: 压缩请求未继承 `reasoningEffort` 等参数，可能影响压缩质量。

## 6. 功能请求与路线图信号
*   **后台运行与开机自启支持**
    *   **链接**: [#6796](https://github.com/deepseek-ai/deepseek-harness/discussions/6796)
    *   **需求**: 用户希望 dsh web 能像原生应用一样后台运行或开机自启，避免手动启动终端窗口。有用户已自行通过 C# 编译小工具实现绕过系统限制。
    *   **路线图信号**: 此类需求通常指向官方应提供 Systemd/Service 配置或 PWA 级别的安装体验。
*   **生命周期管理契约缺失**
    *   **链接**: [#4909](https://github.com/deepseek-ai/deepseek-harness/discussions/4909)
    *   **需求**: 父 Agent 销毁时，子 Agent 成为孤儿。社区呼吁建立明确的跨模块生命周期合同。这不仅是 Bug，更是架构层面的缺失，可能影响下一版本的多 Agent 编排设计。

## 7. 用户反馈摘要
*   **痛点**:
    *   **数据迁移风险**: 多位用户（#6559, #6779, #7824）反映升级后历史会话无法打开，数据可读性存忧，信任度受损。
    *   **Windows 桌面体验**: 文件夹选择器（#30）和网络连接稳定性（#175, #6987）是 Windows 用户的常见障碍。
    *   **浏览器兼容性**: Firefox 用户（#5677）感到被忽视，Web UI 在非 Chromium 内核下存在严重缺陷。
*   **满意点**:
    *   社区互助氛围浓厚，如 #7802 和 #6559 中，用户主动分享根因分析与临时补丁，缓解了部分用户的焦虑。

## 8. 待处理积压
*   **#30**: Windows 文件夹选择器失败（19 评论，长期未决）。
*   **#175**: 模型连接持续失败（15 评论，自 8 月中旬至今）。
*   **#4549**: Scheduler 失败导致会话永久 400（14 评论，严重数据完整性问题）。
*   **#4909**: 多 Agent 生命周期管理缺失（7 评论，架构级问题）。

**建议**: 维护者应优先关注 **会话格式迁移兼容性** (#6559, #6779, #7658) 和 **Socket 稳定性** (#7802) 问题，这些是当前影响用户留存的最大阻碍。同时考虑将 #6796 的后台运行需求纳入 Next Release 的规划。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*