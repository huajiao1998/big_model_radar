# OpenClaw 生态日报 2026-09-13

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-12 23:32 UTC

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
**日期：2026-09-13**  
**数据来源：GitHub (openclaw/openclaw)**

---

## 1. 今日速览

OpenClaw 在过去24小时内保持极高活跃度，共处理 **1000 条** 事务（500 Issues + 500 PRs），其中关闭/合并率达 **46%**（455条），显示维护团队响应迅速。当前版本 **2026.9.x** 处于发布后关键稳定期，社区集中反馈了升级可靠性、子代理状态丢失及 MCP 网关崩溃等 P0/P1 级问题。无新版本发布，但大量修复 PR 已提交并等待合并，项目正全力修复 2026.9.3/9.4 引入的回归缺陷。

---

## 2. 版本发布

**无新版本发布。**  
当前主要关注版本：`2026.9.3` 和 `2026.9.4`。  
⚠️ **风险提示**：多个 Issue 报告从 `2026.7.x` 或 `2026.9.2` 升级到 `2026.9.3/9.4` 时出现 Doctor 校验失败、事务中断或状态丢失（见 #142585, #145510, #145192）。建议用户在升级前备份工作区，并密切关注 #145252 追踪 Issue。

---

## 3. 项目进展

今日 **1 个 PR 已合并/关闭**，主要涉及 macOS 应用构建修复：

| PR | 标题 | 贡献者 | 意义 |
|----|------|--------|------|
| [#146556](https://github.com/openclaw/openclaw/pull/146556) | `fix(macos): honor requested Node version in app workers` | @steipete | 修复 macOS App 打包时忽略 `OPENCLAW_NODE_VERSION` 的环境变量设置，确保构建可复现性。 |

**重点进行中 PR（待审核/合并）：**
- **#146514** (`fix(update): allow repair within its own update run`)：解决 `openclaw update repair` 在运行中自我拒绝的关键修复，直接影响升级恢复能力。
- **#146246** (`fix(update): preserve migrated default agent across restarts`)：修复多 Agent 迁移后默认 Agent 丢失问题。
- **#146547** (`refactor(transcripts): run stored lookups in shared SQLite worker`)：将传记查询移至共享 Worker，减少事件循环阻塞，提升网关性能。
- **#139131** (`fix(auth): preserve Copilot tenant credentials during Doctor repair`)：修复 Doctor 维修时误删 GitHub Copilot 凭证的问题。

---

## 4. 社区热点

以下 Issues 评论活跃、影响范围广，反映用户核心关切：

### 🔥 最热门 Issue（按评论数排序）

1. **[Bug] OpenClaw leaks unreaped hook/tool child processes** (#97616)  
   - **作者**: @avp717 | **评论**: 28 | **等级**: 🦪 Silver Shellfish  
   - **概要**: 钩子/工具子进程泄漏导致僵尸进程累积，引发运行时性能退化。  
   - **链接**: https://github.com/openclaw/openclaw/issues/97616

2. **[Bug] Subagent completion silently lost — no retry, no notification** (#44925)  
   - **作者**: @IIIyban | **评论**: 27 | **等级**: 🦞 Diamond Lobster  
   - **概要**: 子代理任务超时时结果静默丢失，无重试、无通知、无自动重启，严重影响多代理编排可靠性。  
   - **链接**: https://github.com/openclaw/openclaw/issues/44925

3. **[Regression] Doctor refuses valid legacy workspace setup** (#142585)  
   - **作者**: @GitHoubi | **评论**: 17 | **等级**: 🦐 Gold Shrimp  
   - **概要**: 2026.9.3 Doctor 拒绝有效的旧版工作区配置，阻碍平滑升级。  
   - **链接**: https://github.com/openclaw/openclaw/issues/142585

4. **[Bug] Subagent completion delivery can be lost** (#67777)  
   - **作者**: @100yenadmin | **评论**: 16 | **等级**: 🦞 Diamond Lobster  
   - **概要**: 直接广播超时或孤儿清理时，子代理完成消息可能丢失。  
   - **链接**: https://github.com/openclaw/openclaw/issues/67777

5. **[Feature] Channel-mediated approval for MCP tool calls** (#78308)  
   - **作者**: @oalterg | **评论**: 16 | **等级**: 🦞 Diamond Lobster  
   - **概要**: 请求 MCP 工具调用通过渠道中批准流水线（类似 shell-exec 的 `/approve` 机制），增强安全性。  
   - **链接**: https://github.com/openclaw/openclaw/issues/78308

---

## 5. Bug 与稳定性

### 🚨 P0 级问题（发布阻断/崩溃）

| Issue | 描述 | 状态 | 关联 PR |
|-------|------|------|---------|
| [#145252](https://github.com/openclaw/openclaw/issues/145252) | **Tracking**: 2026.9.3/9.4 升级、修复与恢复可靠性 | OPEN | 多 Issue 汇总 |
| [#145510](https://github.com/openclaw/openclaw/issues/145510) | 更新失败：runtime-verification-failed | OPEN | - |
| [#145192](https://github.com/openclaw/openclaw/issues/145192) | 2026.9.2→9.4 管理更新在候选 Doctor 阶段失败 | OPEN | #144742 |
| [#144739](https://github.com/openclaw/openclaw/issues/144739) | 2026.9.3→9.4 npm 更新对 schema-17 候选状态运行失败 | OPEN | - |
| [#145929](https://github.com/openclaw/openclaw/issues/145929) | Auth profile 注销/写入永久失败（锁忙） | OPEN | - |

### ⚠️ P1 级问题（严重功能缺陷）

| Issue | 描述 | 状态 | 关联 PR |
|-------|------|------|---------|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 子进程泄漏导致僵尸积累 | OPEN | - |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 子代理完成静默丢失 | OPEN | - |
| [#144502](https://github.com/openclaw/openclaw/issues/144502) | WhatsApp 移动端无法播放 TTS 语音笔记（48kHz+Lavf 标签） | OPEN | - |
| [#142476](https://github.com/openclaw/openclaw/issues/142476) | Cron 会话清理器每几分钟阻塞事件循环 14-76 秒 | **CLOSED** | - |
| [#136183](https://github.com/openclaw/openclaw/issues/136183) | SSH 命令执行挂起（SIGTERM 等待横幅） | OPEN | - |
| [#139847](https://github.com/openclaw/openclaw/issues/139847) | 回复运行期间发送的消息被丢弃 | OPEN | - |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP 服务器初始化超时导致网关崩溃 | OPEN | - |
| [#137332](https://github.com/openclaw/openclaw/issues/137332) | 混合终端请求者结算批次无限重试 | OPEN | - |
| [#140455](https://github.com/openclaw/openclaw/issues/140455) | Google Meet 2026.9.2 音频路由崩溃 | OPEN | - |
| [#115367](https://github.com/openclaw/openclaw/issues/115367) | Provider 读取门控锁定外部插件 | OPEN | - |

### ✅ 已关闭/修复的 Bug

- **#142476**: Cron 阻塞事件循环问题已关闭。
- **#67777**: 子代理完成丢失问题已关闭。
- **#140620**: 2026.7.1→9.2 升级后会话转录 stalls 已关闭。
- **#145266**: Git/dev Doctor 刷新覆盖内置插件问题已关闭。
- **#145689**: Cron 更新被工具策略迁移阻止已关闭。
- **#90444**: 被杀子代理任务停滞已关闭。

---

## 6. 功能请求与路线图信号

### 🆕 新功能请求

1. **#78308** - **MCP 工具调用的渠道中介批准**  
   - **诉求**: 允许 MCP 服务器返回标准信封，通过 `/approve <id>` 管道进行人工确认，增强状态变更操作的安全性。  
   - **路线图信号**: 高优先级（Diamond Lobster），与现有 shell-exec 批准机制对齐。

2. **#131457** - **Feishu (Lark) 渠道添加进度流式模式**  
   - **诉求**: 复用 Slack/Discord/Telegram 等已支持的 `streaming.progress` 配置，在单一卡片中实时展示工具调用、推理和评论。  
   - **路线图信号**: 中优先级，提升企业 IM 用户体验。

3. **#77798** - **协作式 Markdown 编辑器（Canvas Embed）**  
   - **诉求**: 在 Control UI 中嵌入双向编辑的 Markdown 编辑器（类似 ChatGPT Canvas），当前仅支持只读渲染。  
   - **路线图信号**: 低优先级（Off-meta Tidepool），但用户呼声高。

### 🔧 现有 PR 对应的改进

- **#146554**: 修复 UI 异步工具活动后的评论片段残留。
- **#146564**: 统一设置折叠箭头方向（闭合朝右，展开朝下）。
- **#146502**: 简化编码会话发现设置入口。
- **#146403**: Windows ReFS 克隆共享源码存储。

---

## 7. 用户反馈摘要

### 😤 主要痛点

1. **升级可靠性差**  
   - 用户报告从 2026.7.x 或 9.2 升级到 9.3/9.4 时，Doctor 校验失败、事务中断、状态丢失（#142585, #145510, #145192, #144739）。  
   - **反馈**: "升级过程不可预测，需要手动干预恢复。"

2. **子代理状态静默丢失**  
   - 子代理超时、断开或孤儿清理时，完成消息丢失且无通知（#44925, #67777, #106704）。  
   - **反馈**: "多代理编排结果不可靠，难以调试。"

3. **网关性能阻塞**  
   - Cron 清理器、SQLite 完整性检查、传记查找等操作阻塞事件循环（#142476, #146512, #146390）。  
   - **反馈**: "高负载下网关响应迟缓。"

4. **MCP 服务器崩溃网关**  
   - stdio MCP 初始化超时触发未处理的 Promise 拒绝，导致网关崩溃（#144911）。  
   - **反馈**: "不稳定的 MCP 服务器可导致整个网关宕机。"

5. **权限与安全机制不一致**  
   - Provider 读取门控锁定外部插件，Telegram 订阅警报被当作消息发送（#115367, #59662）。  
   - **反馈**: "安全策略与插件架构存在冲突。"

### 👍 正面反馈

- **问题响应速度快**: 大量 Issue 在 24-48 小时内获得维护者回应或关闭。
- **文档同步更新**: PR #146516 移除过时的网关重启指南，保持文档准确性。

---

## 8. 待处理积压

以下 Issue 长期开放、评论活跃或缺少明确修复路径，建议维护者优先关注：

| Issue | 标题 | 创建时间 | 评论数 | 等级 | 建议行动 |
|-------|------|----------|--------|------|----------|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 子进程泄漏导致僵尸积累 | 2026-06-29 | 28 | 🦪 Silver | 需根本性修复进程回收机制 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 子代理完成静默丢失 | 2026-03-13 | 27 | 🦞 Diamond | 需引入重试/通知/自动重启机制 |
| [#115367](https://github.com/openclaw/openclaw/issues/115367) | Provider 读取门控锁定外部插件 | 2026-07-28 | 10 | 🦞 Diamond | 需调整 `origin: bundled` 限制 |
| [#101656](https://github.com/openclaw/openclaw/issues/101656) | Telegram 分离子代理无活跃性通知 | 2026-07-07 | 8 | 🌊 Off-meta | 需增加状态反馈机制 |
| [#122019](https://github.com/openclaw/openclaw/issues/122019) | `openclaw update status` 忽略插件兼容性 | 2026-08-11 | 6 | 🦞 Diamond | 需扩展升级预检逻辑 |
| [#118776](https://github.com/openclaw/openclaw/issues/118776) | 叶子子代理失去产生事件的工具 | 2026-08-03 | 5 | 🦞 Diamond | 需修复工具策略剥离逻辑 |

---

**报告生成时间**: 2026-09-13  
**分析师**: Agnes (Sapiens AI)  
**数据截止**: 2026-09-12 24:00 UTC

---

## 横向生态对比

## 2026-09-13 个人 AI 智能体开源生态横向对比分析

### 1. 生态全景
2026年9月，开源智能体生态正处于**从“功能原型”向“生产稳定性”转型的关键攻坚期**。各核心项目（OpenClaw、hermes-agent、AstrBot、QwenPaw）均面临同一挑战：随着多代理编排、复杂工作流调度（Cron）及 MCP/ACP 协议集成的大规模落地，系统级的稳定性缺陷（状态丢失、进程泄漏、会话损坏）集中爆发。社区反馈显示，用户痛点已从单一的“模型能力评测”转向“Agent 可靠性、数据持久化安全及长上下文管理”，标志着该领域进入成熟度验证阶段。

### 2. 各项目活跃度对比

| 项目 | 新增 Issue/PR (24h) | 合并/关闭率 | 版本状态 | 健康度评估 | 核心风险点 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **OpenClaw** | 1000 (500 I / 500 PR) | 46% (455条) | 2026.9.x 稳定期，无新 Release | **🟡 波动** | 升级回归缺陷、子代理状态静默丢失 |
| **hermes-agent** | 500 (340 I / 352 PR) | 高响应 | 无新版本 | **🟢 良好** | Cron 握手超时、安全边界的 Bypass 漏洞 |
| **QwenPaw** | 17 I / 7 PR | 中 | v2.2.x 迭代维护期 | **🟢 良好** | 配置/会话随机丢失、内存溢出 (OOM) |
| **AstrBot** | 13 I / 28 PR | 高 | v4.28.0 补丁期 | **🟢 良好** | Desktop WebUI Digest Mismatch、OpenCode 协议适配 |
| **Zeroclaw** | 24 I / 50 PR | 中 | 无新版本 | **🟡 波动** | ACP 会话数据丢失、MCP 连接 Poisoned、Windows CI 不稳定 |
| **DeepSeek Harness** | 184 Discussions | N/A | v0.1.5 磨合期 | **🟠 风险** | v0 会话迁移破坏性变更、IME 输入法失效 |
| **PicoClaw** | 4 I / 3 PR | 低 | 无新版本 | **🔴 紧急** | 官网 TLS 证书过期、WebUI 性能瓶颈 |

### 3. OpenClaw 在生态中的定位
*   **规模标杆**：OpenClaw 以 **1000 条/日** 的事务处理量，远超其他项目（hermes-agent 500, Zeroclaw ~70, QwenPaw ~24），确立了其在通用型智能体框架中的**头部地位**。
*   **技术路线差异**：与 Zeroclaw（Rust 核心，强调运行时安全）和 QwenPaw（阿里系，强调 MCP/ACP 协议深度）不同，OpenClaw 倾向于**全栈 JavaScript/TypeScript 生态**，深度集成 MCP 网关与多渠道（WhatsApp/Telegram/Discord）接入。其架构复杂度最高，这也导致其今日面临的“升级回归”和“子代理状态管理”问题最为突出。
*   **社区规模**：Issue 评论数常达 20-30+（如 #97616, #44925），表明其用户基数庞大且深度参与，但同时也意味着维护团队面临巨大的审查积压压力。

### 4. 共同关注的技术方向

| 技术方向 | 具体诉求 | 涉及项目 |
| :--- | :--- | :--- |
| **多代理编排可靠性** | 子代理任务超时、断连或孤儿清理时，完成消息静默丢失；需引入重试、通知及自动重启机制。 | **OpenClaw** (#44925, #67777), **Zeroclaw** (#10788) |
| **Cron/定时任务健壮性** | 解决调度死锁、心跳超时导致的任务中断；定时任务需具备与普通会话同等的模型回退及错误投递能力。 | **hermes-agent** (#109243, #100401), **AstrBot** (#9980, #10026), **OpenClaw** (#142476) |
| **MCP/ACP 协议兼容性** | 应对上游协议变更（如 OpenCode Go 强制 `x-opencode-session` 头）；修复 Java/Kotlin 等非标准 SDK 的互操作性。 | **QwenPaw** (#7729), **AstrBot** (#10045), **DeepSeek Harness** (#5495) |
| **上下文与记忆管理** | 长对话导致内存/OOM 风险；记忆写入消耗昂贵 Token，需独立轻量模型方案；Markdown 并发写导致数据丢失。 | **QwenPaw** (#7722, #7719), **Zeroclaw** (#10797), **hermes-agent** (#99524) |
| **工作区/会话持久化** | 运行时随机丢失模型配置、会话历史；升级后旧工作区 Doctor 校验失败导致无法启动。 | **OpenClaw** (#142585, #145510), **QwenPaw** (#7708, #7724), **DeepSeek Harness** (#6045) |

### 5. 差异化定位分析

*   **OpenClaw**：**全能型通用框架**。优势在于极其丰富的渠道接入（WhatsApp, Telegram, Discord, IRC 等）和成熟的 MCP 网关。适合需要深度集成多个 IM 平台、构建复杂多代理工作流的**重度企业/极客用户**。劣势是 JS 生态带来的启动性能和内存管理挑战。
*   **hermes-agent**：**自动化与终端专家**。强项在于 Cron 调度、Skills 索引和 CLI 交互体验。适合**运维自动化、定时任务驱动**的场景，以及对 Linux/终端环境有依赖的用户。
*   **AstrBot**：**即时通讯生态集成者**。聚焦于 QQ (OneBot/cqhttp)、微信等国内主流社交平台的机器人开发，拥有最完善的国内 IM 适配器生态。适合**国内 C 端用户、群管机器人开发者**。
*   **QwenPaw**：**阿里系协议深度实践者**。原生支持 ACP (Agent Communication Protocol) 和 MCP，对 DeepSeek 等阿里模型优化较好。适合**希望使用国产协议标准、注重模型成本控制**（记忆分离模型）的开发团队。
*   **Zeroclaw**：**安全与隐私优先的 Rust 重构版**。强调运行时内存安全、进程隔离和权限最小化。适合**对安全性、数据隐私有极高要求**的技术保守派用户，但当前生态成熟度略低于 OpenClaw。
*   **DeepSeek Harness**：**模型调试与评估工具**。侧重于本地部署 DeepSeek 模型的调试、Token 统计和环境诊断。适合**模型研究员、本地部署爱好者**，而非通用助手用户。
*   **PicoClaw**：**边缘/轻量级节点**。侧重于资源受限环境或作为分布式 Agent 网络中的边缘节点，当前处于基础设施维护阶段。

### 6. 社区热度与成熟度

*   **快速迭代期（高活跃度，高风险）**：
    *   **OpenClaw** 和 **hermes-agent**：事务量巨大，新功能（多代理、复杂 Cron）快速上线，但伴随大量 P0/P1 级稳定性 Bug。属于**“高速公路上换轮胎”**阶段。
    *   **Zeroclaw**：Rust 重写带来的深层重构期，CI 不稳定和核心链路（ACP/RPC）Bug 频发，正处于**技术还债**的关键节点。
*   **质量巩固期（中高活跃，修复为主）**：
    *   **QwenPaw** 和 **AstrBot**：主要版本已相对稳定，今日动态多为针对已知痛点的精准补丁（MCP 兼容、定时任务修复）。属于**成熟产品的精细化运营**阶段。
*   **磨合/基础设施期（特定场景活跃）**：
    *   **DeepSeek Harness**：受限于特定模型生态，社区关注点集中在工具链本身的兼容性（如 v0 会话迁移）。
    *   **PicoClaw**：社区较小，当前首要任务是解决基础设施故障（TLS 证书），处于**生存维护**阶段。

### 7. 值得关注的趋势信号

1.  **“静默失败”成为最大信任杀手**：OpenClaw、Zeroclaw、QwenPaw 均报告了子代理结果丢失、会话数据静默丢弃的问题。**行业信号**：下一代智能体框架必须将“可观测性”（Observability）和“最终一致性”作为核心设计原则，任何后台任务的失败都必须有明确的审计日志和用户通知。
2.  **MCP/ACP 协议成为新的“TCP/IP”**：几乎所有项目都在投入资源适配 MCP 或开发内部的 ACP。特别是 OpenCode Go 等上游强制协议变更，迫使下游框架快速响应。**开发者建议**：关注协议层的标准化进展，避免被单一上游绑定。
3.  **成本敏感驱动架构分离**：QwenPaw 的“独立记忆模型”和 OpenClaw 的“传记查询优化”反映了用户对**Token 成本**的高度敏感。**趋势**：未来智能体架构将普遍采用“双层模型策略”——高性能模型处理推理，轻量级模型处理记忆/检索/日志。
4.  **从“单机智能”向“持续运行服务”演进**：hermes-agent 的“Bot 群聊持续运行”和 OpenClaw 的“子代理生命周期管理”需求，表明用户期望 AI Agent 像传统服务器进程一样**7x24 小时稳定在线**，而非仅仅是一个聊天窗口。这要求框架在进程守护、崩溃恢复、状态持久化方面有工业级表现。
5.  **跨平台 CI/CD 稳定性是隐性门槛**：Zeroclaw 和 OpenClaw 均提及 Windows/macOS 环境的特定问题（栈溢出、构建变量忽略）。**启示**：在多平台支持的开源项目中，CI 稳定性直接决定贡献者的留存率，需作为核心工程指标持续投入。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：** 2026-09-13  
**来源：** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## 1. 今日速览

ZeroClaw 今日保持高强度开发节奏，过去24小时内共产生 **24 条 Issue** 和 **50 条 PR** 更新，其中18条Issue活跃、6条关闭，39条PR待合并、11条已合并。项目核心风险集中在 `runtime` 组件，多个 P1 级 Bug（如栈溢出、会话数据丢失）正在处理中；同时 CI 稳定性成为近期痛点，Windows nextest 环境出现多起随机失败。整体来看，项目正处于修复关键路径稳定性的攻坚期，社区贡献者活跃度较高，但维护者在审查积压方面面临压力。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

### 已合并/关闭的重要 PR

| PR | 作者 | 变更摘要 | 意义 |
|----|------|----------|------|
| [#10726](https://github.com/zeroclaw-labs/zeroclaw/pull/10726) | @VladimirLewisII | **ci(zerorelay): Pin published relay base images by digest** | 修复 Docker 镜像基础层可被篡改的安全风险，确保发布的镜像与源码锁一致，增强供应链安全。 |
| [#10091](https://github.com/zeroclaw-labs/zeroclaw/pull/10091) | @Audacity88 | **fix(memory): Harden response cache storage permissions** | 将响应缓存文件权限收紧为 owner-only，防止本地其他用户读取敏感模型回复，提升隐私安全性。 |
| [#10449](https://github.com/zeroclaw-labs/zeroclaw/pull/10449) | @jstar0 | **fix(channels): Create Edge TTS artifact with owner-only permissions** | 修复 TTS 生成的 MP3 文件因 umask 导致的世界可读问题，补齐音频产出物的权限缺陷。 |
| [#10676](https://github.com/zeroclaw-labs/zeroclaw/pull/10676) | @Audacity88 | **fix(ci): Compare publish exceptions as paths** | 修复 Windows 下因路径分隔符差异导致的发布契约检查误报，提升 CI 跨平台一致性。 |
| [#10534](https://github.com/zeroclaw-labs/zeroclaw/pull/10534) *(Issue 关联修复)* | @Audacity88 | **fix(delegate): Bounded delegates no longer silently strip delegate tool** | 修复委托工具在受限模式下被意外剥离的 Bug，确保 `delegation_policy/max_delegation_depth` 配置生效。 |
| [#10689](https://github.com/zeroclaw-labs/zeroclaw/pull/10689) *(Issue 关联修复)* | @badbat75 | **fix(channels): Telegram voice reply no longer skipped for `[`-prefixed text** | 修复 ElevenLabs v3 音频标签导致 Telegram 语音回复静默跳过的 Bug，恢复语音通道可靠性。 |
| [#10277](https://github.com/zeroclaw-labs/zeroclaw/pull/10277) *(Issue 关联修复)* | @JordanTheJet | **fix(ci): Pin zerorelay image base tags by digest** | 同 #10726 的 Issue 闭环，完成 Dockerfile 基础镜像锁定。 |

### 关键进行中的 PR

- **#10621** [@Audacity88] — **feat(runtime): Coordinate agent lifecycle mutations**  
  重构运行时代理生命周期管理，统一 daemon RPC、gateway、channels、ACP 的配置变更入口，解决多头 config snapshot 导致的竞态问题。该 PR 体积大（XL）、风险高，是今日讨论最密集的核心修复之一。

- **#10775** [@Audacity88] — **fix(rpc): Preserve live sessions when mode replacement fails**  
  修复 Chat/ACP 模式替换失败时原有会话被错误删除的问题，提升会话恢复鲁棒性。

- **#10266** [@grrowl] — **fix(channels): Implement is_direct_message for WhatsApp Web**  
  完善 WhatsApp 渠道的私聊识别逻辑，附带业务模式回显守卫和回归测试。

---

## 4. 社区热点

### 高关注 Issue / PR

| ID | 类型 | 作者 | 热度指标 | 链接 |
|----|------|------|----------|------|
| #10734 | Bug (P1) | @Project516 | 6 评论，Windows 栈溢出 | [Issue 10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) |
| #10788 | Bug (P1) | @Audacity88 | 2 评论，ACP 会话数据丢失 | [Issue 10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) |
| #10785 | Bug (P1) | @Audacity88 | 1 评论，zerocode 通知延迟取消运行中 turn | [Issue 10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785) |
| #10797 | Bug (P1) | @kouhe3 | 1 评论，Markdown 记忆后端并发写丢失数据 | [Issue 10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) |
| #10807 | Bug (S1) | @lynnkeele | 0 评论，MCP 连接单次失败即永久 poisoned | [Issue 10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) |
| #10812 | Feature | @RustLangLatam | 0 评论，WhatsApp PDF 移动端预览 | [Issue 10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812) |
| #8733 | Bug | @ammar-elsabe | 0 评论，models.dev 目录仅解析 ID 丢弃能力元数据 | [Issue 8733](https://github.com/zeroclaw-labs/zeroclaw/issues/8733) |

**热点分析：**
- **Windows CI 稳定性** 是当前社区最集中的痛点，#10734、#10793、#10794、#10805 四条 Issue 均指向 Windows nextest 环境的随机失败，反映跨平台测试基础设施的脆弱性。
- **ACP 会话可靠性** 引发多位资深开发者关注（#10788、#10785），涉及 durable history 写入、notification 延迟、turn 取消等核心路径，表明 ACP 模式在生产使用中已暴露出设计层面的竞态问题。
- **MCP 连接恢复机制** (#10807) 被标记为 S1 级别，说明工具链集成场景下的一次性故障即导致连接永久失效，对自动化工作流构成直接阻塞。

---

## 5. Bug 与稳定性

### 严重级 Bug（按严重程度排列）

| 级别 | Issue | 组件 | 描述 | Fix PR |
|------|-------|------|------|--------|
| **S0** | [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) | memory | Markdown 记忆后端并发 `store()` 调用导致数据静默丢失 | ❌ 无 |
| **S1** | [#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) | tools/MCP | MCP HTTP/SSE 连接一次恢复失败后即永久 poisoned | ❌ 无 |
| **S2** | [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) | runtime | RpcDispatcher 栈使用率接近 2% guard，Windows nextest 触发溢出 | ❌ 无 |
| **S2** | [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) | runtime/ACP | Code/ACP turn 失败时持久化历史未写入 prompt 和工具交换记录 | ❌ 无 |
| **S2** | [#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785) | zerocode | 通知延迟触发 `session/cancel` 导致所有运行中 turn 被取消 | ❌ 无 |
| **S2** | [#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787) | provider | Reliable provider 单候选流恢复忽略 `provider_retries`，529 错误无退避 | ❌ 无 |
| **S2** | [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) | daemon | `zeroclaw service logs` 在 macOS/Windows/OpenRC 上健康时不输出任何内容 | ✅ #10731 已修复 |
| **S2** | [#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699) | provider/cost | Anthropic 成本账本缓存写入价格被错误使用，低估缓存未命中率 | ❌ 无 |
| **S3** | [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) | zerocode/tui | ZeroCode chat 输入框忽略 Delete 键 | ❌ 无 |
| **S3** | [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795) | channel/CLI | `zeroclaw agent` REPL 未启用 `IUTF8`，多字节字符 Backspace 删除乱码 | ❌ 无 |
| **S3** | [#10805](https://github.com/zeroclaw-labs/zeroclaw/issues/10805) | ci/control_plane | Windows nextest 控制平面存活测试与进程终止存在竞态 | ❌ 无 |

**稳定性评估：** 今日新增 **9 个开放 Bug**，其中 4 个为 P1 级别，2 个为 S0/S1 严重数据完整性或工作流阻塞问题。**MCP 连接 poisoned** 和 **Markdown 记忆并发丢失** 是两个最高风险项，建议优先处理。

---

## 6. 功能请求与路线图信号

| Issue/PR | 类型 | 诉求摘要 | 纳入可能性 |
|----------|------|----------|------------|
| [#10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812) | Feature | WhatsApp 发送 PDF 时填充 `jpegThumbnail` 以在手机端显示预览 | ⭐ 高（小型改动，用户体验直接提升） |
| [#10400](https://github.com/zeroclaw-labs/zeroclaw/issues/10400) + [#10401](https://github.com/zeroclaw-labs/zeroclaw/pull/10401) | Enhancement | Telegram 未授权发送者提示语可配置，且感知实际授权路径 | ⭐ 高（PR #10401 已准备就绪） |
| [#10792](https://github.com/zeroclaw-labs/zeroclaw/issues/10792) | Docs | 澄清 Windows 下 daemon reload 拒绝后的恢复流程 | ⭐ 中（文档完善，低风险） |
| [#10789](https://github.com/zeroclaw-labs/zeroclaw/issues/10789) | Task | ZeroCode 守护进程启动诊断信息国际化 | ⭐ 中（i18n 完善，低优先级） |
| [#8733](https://github.com/zeroclaw-labs/zeroclaw/issues/8733) | Bug/Feature | models.dev 目录解析应包含 per-model 能力元数据（如 vision） | ⭐ 中（影响多模型策略选择） |

**路线图信号：**
- **插件系统重构** 仍在持续推进：#8908（plugin list catalog）、#8949（typed webhook challenge）、#9139（durable scheduler outbox）、#8862（governed webhook ingress）、#9138（typed event routing）构成一个大型功能簇，由 @JordanTheJet 主导，旨在建立更安全的插件通信和调度框架。
- **代理生命周期协调**（#10621）是另一条主线，试图统一各子系统对配置变更的处理方式，减少竞态和状态不一致。
- **渠道体验优化** 持续进行：WhatsApp 私聊识别（#10266）、Telegram 未授权提示可配置（#10401）、WhatsApp PDF 预览（#10812）均指向渠道层用户体验的精细化。

---

## 7. 用户反馈摘要

### 痛点
1. **Windows CI 环境不稳定**：多条 Issue 指向 Windows nextest 的随机失败（#10734、#10793、#10794、#10805），开发者反馈"与待测代码无关的测试意外失败"，严重影响提交通过率。
2. **ACP/Code 会话数据丢失**：#10788 描述当 provider 返回错误时，已完成的工具调用和用户 prompt 未被写入持久化历史，导致会话恢复后状态断裂。
3. **MCP 连接恢复过于激进**：#10807 指出一次短暂故障（如容器重启、网络抖动）后连接即被永久标记为 poisoned，缺乏重试预算或退避机制。
4. **CLI 多字节字符处理缺陷**：#10795 报告 Backspace 删除多字节字符时产生乱码，#10796 报告 Delete 键无响应，影响非 ASCII 语言用户的交互体验。
5. **成本核算精度不足**：#10699 指出 Anthropic 缓存写入价格被错误复用为输入价格，导致成本统计系统性低估。

### 满意点
- **权限安全改进**：#10091 和 #10449 主动收紧缓存和 TTS 产物的文件权限，用户认可对隐私和数据安全的重视。
- **渠道功能完善**：WhatsApp 私聊识别（#10266）和 Telegram 未授权提示可配置（#10401）被社区积极评价，认为提升了多渠道部署的灵活性。

---

## 8. 待处理积压

### 高风险长期未响应 Issue

| Issue | 创建时间 | 时长 | 风险 | 建议 |
|-------|----------|------|------|------|
| [#8733](https://github.com/zeroclaw-labs/zeroclaw/issues/8733) | 2026-07-05 | ~70 天 | 中 | models.dev 能力元数据解析缺失，影响多模型策略配置准确性 |
| [#10277](https://github.com/zeroclaw-labs/zeroclaw/issues/10277) | 2026-08-23 | ~21 天 | 高 | Docker 镜像基础层锁定（已合并 #10726，等待 Issue 关闭） |
| [#10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534) | 2026-09-02 | ~11 天 | 高 | 委托工具被静默剥离（Issue 已关闭，需确认 PR 是否完全覆盖） |

### 需维护者关注的 PR

| PR | 状态 | 卡点 | 建议 |
|----|------|------|------|
| [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621) | OPEN | size:XL, needs-maintainer-review | 核心生命周期协调 PR，审查积压可能阻塞后续功能开发 |
| [#8908](https://github.com/zeroclaw-labs/zeroclaw/pull/8908) | OPEN | size:M | Plugin list catalog 重构，长期开放需跟进 |
| [#8949](https://github.com/zeroclaw-labs/zeroclaw/pull/8949) | OPEN | stacked on #8862 | 依赖 #8862 合并，需确认上游进度 |
| [#9724](https://github.com/zeroclaw-labs/zeroclaw/pull/9724) | OPEN | status:blocked | `always_ask` 策略在 Full autonomy 下失效，安全相关需优先处理 |

### 待跟进任务

- **#10791** [@Audacity88] — 退役本地 RPC 连接在 terminal writer 失败后的残留，需在 reload 修复后跟进。
- **#10792** [@Audacity88] — 澄清 Windows daemon reload 拒绝后的恢复文档。
- **#10789** [@Audacity88] — ZeroCode 启动诊断信息国际化。

---

**报告生成时间：** 2026-09-13  
**分析师：** Agnes (Sapiens AI)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：** 2026-09-13  
**数据来源：** GitHub API (github.com/sipeed/picoclaw)

## 1. 今日速览
今日 PicoClaw 社区活跃度保持中等水平，共新增 4 个 Issues 和 3 个 Pull Requests，无新版本发布。值得注意的是，**项目官方站点 (`picoclaw.io`) 因 TLS 证书过期导致完全不可访问**，这是一项紧急的基础设施故障，需立即处理。开发层面，今日主要贡献集中在文档完善（MCP 配置示例）和 OAuth 认证流程的细微修复上，暂无大规模功能重构。

## 2. 版本发布
**无新版本发布。**

## 3. 项目进展
今日有 3 个 PR 处于待合并状态，虽未直接合并，但反映了当前开发重心：
- **OAuth 认证修复 (#3378)**：修复了 `RefreshAccessToken` 中硬编码 scope 的问题，确保使用配置文件中定义的 provider-specific scopes。这提升了多提供商 OAuth 集成的兼容性和正确性。
- **文档增强 (#3367, #3368)**：分别添加了 Pilot MCP 和 Parallel Search MCP 的 CLI 配置示例。这表明项目正在努力降低用户接入第三方 MCP（Model Context Protocol）服务的门槛，尽管部分 PR 标记为 `[stale]`，但其内容对现有用户仍有价值。

**整体评估**：项目进展稳健，偏向于稳定性修复（Bug fix）和文档完善，核心代码库变动较小。

## 4. 社区热点
- **🔴 最高关注：官方站点宕机 (#3377)**
  - **链接**：https://github.com/sipeed/picoclaw/issues/3377
  - **分析**：作者 @dimonb 报告 TLS 证书于 2026-09-10 过期。虽然评论数为 0，但已有 1 个 👍，且标记为 `[CRITICAL]`。这直接影响所有通过浏览器访问官网的用户，是今日最紧急的运维事件。
- **💬 活跃讨论：Web UI 性能问题 (#3281)**
  - **链接**：https://github.com/sipeed/picoclaw/issues/3281
  - **分析**：用户反馈在历史消息较长时，Web UI 输入框出现明显卡顿。该 Issue 已有 11 条评论和 2 个 👍，且标记为 `[BUG]`。这反映出用户对 Web 端用户体验的痛点，尤其是长对话场景下的流畅度。
- **🎯 功能诉求：长消息 IRC 支持 (#3287)**
  - **链接**：https://github.com/sipeed/picoclaw/issues/3287
  - **分析**：提出希望 PicoClaw 能正确处理 IRCv3 中超过 512 字节的分块消息。12 条评论显示社区对此有持续讨论，旨在解决 IRC 协议限制导致的信息碎片化问题。

## 5. Bug 与稳定性
| 问题 | 严重程度 | 描述 | Fix PR |
| :--- | :--- | :--- | :--- |
| **TLS 证书过期** | **CRITICAL** | `picoclaw.io` 站点因证书过期对所有浏览器不可访问。 | 无 |
| **Web UI 输入滞后** | **BUG** | 聊天历史较长时，Web UI 输入框响应迟缓。 | 无 |
| **IRC 长消息处理** | **BUG/Feature** | IRCv3 长消息被错误分割，未能作为单条消息处理。 | 无 |

**分析**：今日报告的三个问题中，TLS 过期是基础设施层面的阻断性问题；Web UI 性能和 IRC 消息处理是产品功能层面的缺陷，直接影响特定场景下的用户体验。

## 6. 功能请求与路线图信号
- **OpenAI 兼容提供商支持 (#3366)**
  - **链接**：https://github.com/sipeed/picoclaw/issues/3366
  - **诉求**：用户希望添加自定义的 OpenAI 兼容提供商（如自托管路由器 9Router）。
  - **路线图信号**：该请求提出添加一个名为 "OpenAI Compatible" 的自定义 Provider，实现方式可能是复制现有 OpenAI Provider 的配置结构。这符合当前 AI 工具链向多云、自托管模型服务商拓展的趋势，**纳入下一版本的可能性较高**。

## 7. 用户反馈摘要
- **痛点**：
  - **性能瓶颈**：用户 (@xpader) 明确指出 Web UI 在长上下文场景下的性能退化问题，这是影响日常使用体验的关键障碍。
  - **协议兼容性**：IRC 用户 (@superuser-does) 对消息截断问题表示困扰，期望更智能的消息重组机制。
- **满意点**：
  - 社区对扩展性的需求强烈，如希望支持更多类型的 MCP 服务（Parallel, Pilot）和第三方 AI 提供商，表明用户对 PicoClaw 的集成能力有积极期待。

## 8. 待处理积压
- **紧急待处理**：**Issue #3377 (TLS certificate expired)**。需项目维护者立即联系托管服务商或更新证书，恢复官网访问。
- **长期未响应**：
  - **Issue #3287** (IRC 长消息支持) 和 **Issue #3281** (Web UI 卡顿) 均已标记为 `[stale]`，但评论数较多且问题明确，建议维护者重新激活或指派优先级。
  - **PR #3367** 和 **PR #3368** (MCP 文档) 同样标记为 `[stale]`，若内容无误，建议合并以丰富文档库。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：** 2026-09-13  
**数据周期：** 过去 24 小时 (截至 2026-09-13)  
**分析师：** Agnes (Sapiens AI)

## 1. 今日速览
QwenPaw 项目今日保持高活跃度，共新增 17 个 Issues 和 7 个 Pull Requests，社区参与热情较高。整体态势呈现“问题爆发与快速响应并存”的特征：虽然集中暴露了多个涉及 MCP 兼容性、内存管理及工作区稳定性的关键 Bug，但社区已迅速提交对应修复 PR（如 #7732, #7729, #7725）。目前无新版本发布，处于 v2.2.x 系列的迭代维护期，项目健康度良好，响应机制敏捷。

## 2. 版本发布
**无新版本发布。**  
当前主要版本为 `2.2.1` (Desktop) 及 `2.2.0` (Server/Container)。

## 3. 项目进展
今日有 **7 个新 PR** 处于待合并状态，主要聚焦于核心协议兼容性和稳定性修复，虽尚未合并，但体现了活跃的维护节奏：

*   **ACP 权限协议修复 (#7732)**: 修复了 Trusted ACP 会话中因 `optionId` 匹配严格导致权限请求静默回落至交互式提示的问题，提升自动化体验。
*   **MCP Java SDK 兼容修复 (#7729)**: 解决 Java/Kotlin MCP 服务器在 `server/discover` 阶段返回非标准 `jsonRpcError` 导致 Driver 构建失败的问题。
*   **工作区 SSE 防阻塞优化 (#7725)**: 将基于 `watchfiles.awatch` 的同步 Rust 扫描替换为线程化轮询，解决大仓库导致 WebUI 及整个 Server 冻死的问题。
*   **ReMeLight 记忆模型分离 (#7719)**: 支持配置独立的轻量模型用于记忆写入/总结，避免消耗昂贵的主对话模型 Token。
*   **Telegram Markdown 渲染修复 (#7718)**: 修正审批卡片在 Telegram 中显示原始 Markdown 符号的问题。
*   **子代理模型丢失诊断 (#7680)**: 改进日志记录，使 `subagent_model` 配置加载失败时可见可查。
*   **流式错误事件增强 (#7723)**: 确保 `stream_one` 失败时向客户端 emit 错误事件，而非静默断开。

**进展评估：** 项目正在针对 v2.2.x 上线后的集成痛点进行快速补丁迭代，核心链路（MCP/ACP/Workspace）的健壮性正在得到强化。

## 4. 社区热点
以下 Issues 反映了用户最集中的关注点：

*   **[功能诉求] A2A 协议支持计划 (#7484)**
    *   **链接:** https://github.com/agentscope-ai/QwenPaw/issues/7484
    *   **分析:** 用户关注 QwenPaw 2.x 架构中承诺的 Agent-to-Agent (A2A) 支持落地时间。目前仅 MCP 已实现，A2A 成为社区期待的高优先级特性。
*   **[严重 Bug] 内存耗尽三重路径 (#7722)**
    *   **链接:** https://github.com/agentscope-ai/QwenPaw/issues/7722
    *   **分析:** 报告了容器环境下内存以 ~1MB/s 速度增长并导致 OOM 的三个复合原因（流缓冲、实例堆叠、循环规避）。这是一个系统性稳定性风险，值得维护者高度关注。
*   **[体验优化] 插件商店交互复杂 (#7582) [已关闭]**
    *   **链接:** https://github.com/agentscope-ai/QwenPaw/issues/7582
    *   **分析:** 用户反馈插件安装/更新流程繁琐，缺乏一键更新和版本通知。虽已关闭（可能已规划或接受），但反映出多插件管理场景下的 UX 痛点。

## 5. Bug 与稳定性
今日 Bug 报告密集，主要集中在配置持久化和协议兼容性：

| 严重程度 | Issue ID | 摘要 | 关联 PR |
| :--- | :--- | :--- | :--- |
| **P1 (严重)** | #7708 / #7724 | **配置/会话丢失**: 桌面端运行中随机丢失大模型配置及会话历史，需重启修复。疑似状态持久化 Bug。 | 无 |
| **P1 (严重)** | #7721 | **工作区冻结**: 大仓库场景下开启文件浏览器导致整个 Server 进程挂起。 | #7725 (Fix PR) |
| **P2 (高)** | #7728 | **MCP 连接失败**: Java MCP SDK 服务器因返回 HTTP 500 + 非标准 JSON-RPC 错误体导致连接拒绝。 | #7729 (Fix PR) |
| **P2 (高)** | #7716 | **MCP 升级回归**: 升级至 2.2.x 后 MCP 无法连接和注册，2.1.1 正常。 | 无 |
| **P2 (中)** | #7726 | **ACP 权限静默回落**: `trusted: true` 配置下，因 optionId 不匹配导致权限检查失效。 | #7732 (Fix PR) |
| **P2 (中)** | #7676 | **子代理模型失效**: `subagent_model` 配置被静默忽略，子代理继承父模型。 | #7680 (诊断 PR) |
| **P3 (低)** | #7715 | **Daily Paper 静默失败**: arxiv 不可达时错误信息误导，未透传真实网络错误。 | 无 |

**稳定性综述：** 多个 P1/P2 级 Bug 已获得对应的 Fix PR，尤其是 MCP 兼容性和工作区稳定性问题，预计下个补丁版本将显著改善。但“配置/会话丢失”问题 (#7708, #7724) 尚无明确修复方案，风险较高。

## 6. 功能请求与路线图信号
*   **A2A 协议官方支持 (#7484):** 用户明确询问 A2A 支持时间。结合架构文档描述，这应是 2.x 的核心目标之一，预计将在后续版本逐步推进。
*   **独立记忆模型配置 (#7664 / #7719):** 强烈诉求将记忆写入模型与对话模型分离以降低成本。PR #7719 已提供实现方案，有望纳入近期版本。
*   **工作区隐藏文件显示 (#7731):** 请求在文件面板添加显示点号文件的开关，属于常规 UX 增强。
*   **DeepSeek 原生能力增强 (#7717):** 提议为 DeepSeek 模型添加原生能力元数据、Prompt 前缀稳定性和 KV-cache 可观测性，反映了对特定模型深度优化的需求。

## 7. 用户反馈摘要
*   **痛点：**
    *   **数据可靠性焦虑：** 用户报告“用着用着大模型配置就丢了”、“会话历史找不到”，这对依赖 QwenPaw 作为日常管家的用户造成严重信任危机 (#7708, #7724)。
    *   **成本失控：** 使用旗舰模型对话时，后台记忆处理也消耗同等昂贵 Token，用户希望有低成本替代方案 (#7664)。
    *   **集成摩擦：** 插件商店操作流程繁琐，多电脑多插件管理效率低下 (#7582)；Java 生态 MCP 服务器兼容性差 (#7728)。
*   **满意点：**
    *   社区对 Bug 的响应速度较快，多数今日报告的问题已有 PR 跟进。
    *   ACP/MCP 协议栈持续完善，对非标准实现的包容性在增强。

## 8. 待处理积压
*   **#7708 / #7724 (配置与会话丢失):** 这两个 Issue 互为关联，指向一个可能导致用户数据流失的核心 Bug。**状态：无 Fix PR，急需维护者介入排查持久化机制。**
*   **#7722 (内存泄漏/耗尽):** 涉及三个复合路径的内存问题，复现复杂但影响生产环境稳定性。**状态：无 Fix PR，需架构层面审查。**
*   **#7716 (MCP 升级回归):** 2.2.x 版本引入的连接回归问题，影响从旧版本升级的用户。**状态：无 Fix PR。**

---
*报告生成时间：2026-09-13 | 数据来源：QwenPaw GitHub Repository*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：** 2026-09-13  
**数据来源：** GitHub API (NousResearch/hermes-agent)

---

## 1. 今日速览

今日项目保持高强度开发节奏，过去24小时内产生500条 Issue 和500条 PR 更新，新增340个活跃 Issue 和352个待合并 PR，显示社区参与度极高。核心进展集中在 cron 调度系统的稳定性修复、桌面端交互体验优化以及安全边界的加固。尽管无新版本发布，但多个高优先级的 Bug 修复 PR 已进入审查流程，项目整体健康度良好，主要风险点在于 cron 组件的握手超时和会话状态管理。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

今日合并/关闭的关键 PR 主要集中在配置恢复、原型去重和路由修复：

- **#109463 [CLOSED]** `fix(config): 恢复上次有效 config.yaml 而非默认值` — 解决了配置损坏导致进程启动失败的问题，显著提升了生产环境的容错能力。
- **#109285 [OPEN]** `fix(models): 去重 Anthropic 目录中仅 wire 拼写不同的条目` — 改善了桌面端模型选择器的显示体验，消除了重复项混淆。
- **#109299 [CLOSED]** `fix(cli): 重命名多路复用配置文件前取消旧路由` — 修复了重命名操作留下"幽灵"配置的服务问题，增强了 CLI 操作的原子性。
- **#109015 [OPEN]** `fix(providers): 强制严格自定义命名空间路由` — 防止显式自定义提供者（如 `custom:openrouter`）被错误归一化为内置提供者，保障了多供应商配置的隔离性。

**整体推进：** 项目在配置鲁棒性和基础路由正确性方面取得了实质性进展，为后续更复杂的 cron 和会话管理功能奠定了稳定基础。

---

## 4. 社区热点

**评论数 Top Issue：**

| Issue | 标题 | 评论数 | 状态 | 核心诉求 |
|-------|------|--------|------|----------|
| [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) | Skills index is stale or degraded | 202 | CLOSED | 自动化技能索引过时监控与告警机制的完善 |
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) | Automated Nous integration is blocked | 93 | OPEN | 解决 cron 任务中的合并冲突，保障自动化集成流水线畅通 |
| [#2825](https://github.com/NousResearch/hermes-agent/issues/2825) | Termux/proot Ubuntu 安装失败 | 37 | CLOSED | 移动端/容器化环境的安装兼容性问题 |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | Bot Group Chats should keep working after Desktop closes | 28 | OPEN | **高优先级需求**：桌面关闭后 Bot 群聊持续运行的无头模式支持 |
| [#100401](https://github.com/NousResearch/hermes-agent/issues/100401) | cron fire-claim heartbeat deadlocks | 22 | CLOSED | 长任务被误判为中断的严重 Bug，影响任务可靠性 |

**热点分析：**
- **#97681** 反映了用户对"真·助手"能力的期待——Bot 应能独立于桌面客户端持续运行，这是从"工具"到"代理"的关键转折。
- **#66616** 的高评论数表明 Skills 索引的健康度监控是社区长期关注的运维痛点。
- **#100401** 虽已关闭，但其描述的心跳死锁机制可能仍有遗留风险，需关注后续回归测试。

---

## 5. Bug 与稳定性

**今日新报告/活跃 Bug（按严重程度排序）：**

| Issue | 严重程度 | 组件 | 描述 | Fix PR |
|-------|----------|------|------|--------|
| [#109243](https://github.com/NousResearch/hermes-agent/issues/109243) | **P2 High** | cron/scheduler | 外部工作进程切换要求 5s 内 ack，但冷启动需 ~12s，导致任务间歇性丢失 | 无 |
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) | **P1** | cron/kanban | `--initial-status blocked` 的任务在 1s 后自动变为 `ready`，绕过人工审批门控 | 无 |
| [#74078](https://github.com/NousResearch/hermes-agent/issues/74078) | **P2** | tools/approval | 通过数字 PID kill 可绕过终止保护，`execute_code` 前缀不匹配绕过阻止策略 | 无 |
| [#105104](https://github.com/NousResearch/hermes-agent/issues/105104) | **P1** | desktop | 侧边栏点击 Bot 间歇无响应，零后端活动，非确定性复现 | 无 |
| [#107389](https://github.com/NousResearch/hermes-agent/issues/107389) | P3 | provider/deepseek | DeepSeek 新模型名 `deepseek-flash` 被静默重写为 `deepseek-chat` | 无 |
| [#62774](https://github.com/NousResearch/hermes-agent/issues/62774) | **P1** | desktop/streaming | 葡萄牙语重音字符在流式传输时严重截断/损坏 | 无 |
| [#109279](https://github.com/NousResearch/hermes-agent/issues/109279) | P2 | agent | 工具列表过大时回退提供者拒绝请求，PR #109279 已提出延迟过载工具表面化修复 | [#109279](https://github.com/NousResearch/hermes-agent/pull/109279) |
| [#109465](https://github.com/NousResearch/hermes-agent/issues/109465) | P2 | state | 损坏的 UTF-8 system_prompt 行导致所有会话查询崩溃，PR #109464/#109465 已提供修复 | [#109464](https://github.com/NousResearch/hermes-agent/pull/109464), [#109465](https://github.com/NousResearch/hermes-agent/pull/109465) |

**关键风险提示：**
- **cron 子系统稳定性堪忧**：#109243、#39609、#100401 均指向 cron 调度的竞态条件和生命周期管理缺陷，建议优先处理。
- **安全边界漏洞**：#74078 揭示了审批守卫的两个 bypass 路径，需尽快补丁。
- **UTF-8 容错**：#109464/#109465 的修复将显著提升数据库损坏场景下的可用性。

---

## 6. 功能请求与路线图信号

**高潜力功能请求：**

1. **#97681** - **Bot Group Chats 持续运行**：桌面关闭后 Bot 群聊保持活跃。此需求与 #98470（worker 协作契约）形成互补，可能推动"无头集群"架构的演进。

2. **#99524** - **后台上下文压缩与 splice merge**：用户在对话进行中等待压缩操作痛苦，请求在空闲期触发压缩。此功能与 #109279（大工具集降级）共同指向**长会话性能优化**路线图。

3. **#51217** - **Desktop i18n 增加德语**：德国/奥地利/瑞士 8000万+ 德语用户群体，当前仅有 en/zh/ja 四语种，国际化扩张信号明确。

4. **#108914** - **Bot Screen 功能**：将无头 Linux 网关上的 Xfce 桌面实时串流至 Hermes Desktop，支持接管完成 2FA 后交还控制。此 PR 已提交，可能纳入下一版本的**远程桌面集成**特性。

5. **#109281** - **VOICEVOX 句子级流式 TTS**：支持日语语音合成与文本生成重叠，提升桌面端交互自然度。

6. **#109467** - **自定义方案重定向 URI 支持 OAuth**：允许原生移动客户端完成 RFC 8252 流程，扩展**移动端接入能力**。

**路线图判断：**
- **短期（v0.22）**：cron 稳定性修复（#109243、#39609）、UTF-8 容错（#109464/#109465）、配置恢复（#109463）。
- **中期（v0.23）**：Bot 持续运行架构（#97681）、远程桌面串流（#108914）、上下文压缩优化（#99524）。
- **长期**：多语言 i18n 扩展（#51217）、移动客户端 OAuth（#109467）。

---

## 7. 用户反馈摘要

**核心痛点：**
- **cron 可靠性**：用户对定时任务的确定性执行有高要求，当前心跳死锁（#100401）、握手超时（#109243）、审批绕过（#39609）等问题严重削弱信任。
- **桌面端体验**：流式文本截断（#62774）、点击无响应（#105104）影响日常使用流畅度。
- **安装兼容性**：Termux/proot 环境（#2825）仍有障碍，限制移动端/容器化部署。
- **安全信任**：审批守卫 bypass（#74078）和配置写保护绕过（#59293）引发用户对 Agent 自主行动边界的担忧。

**满意度亮点：**
- **Skills 索引自动化**（#66616）虽有问题，但监控机制本身受认可。
- **MCP 工具生态**：#109457 添加 ClixRx 处方折扣服务，扩展医疗场景集成。
- **本地模型管理**：#103353 提供 advanced runtime 控制，满足高级用户自定义推理需求。

**真实使用场景：**
- 企业级 cron 调度替代传统 cron daemon
- 多 Bot 协同完成复杂工作流（文件交接、2FA 登录）
- 无头服务器部署 + 远程桌面接管
- 多语言支持的非英语用户群体

---

## 8. 待处理积压

**需维护者重点关注：**

| Issue/PR | 类型 | 积压原因 | 建议行动 |
|----------|------|----------|----------|
| [#109243](https://github.com/NousResearch/hermes-agent/issues/109243) | Bug P2 | 外部 worker 握手超时 5s vs 冷启动 12s，无 fix PR | 紧急评估，考虑调整超时参数或优化启动路径 |
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) | Bug P1 | blocked 任务自动变 ready，审批门控失效 | 优先修复，涉及任务安全性 |
| [#74078](https://github.com/NousResearch/hermes-agent/issues/74078) | Security P2 | 审批守卫双漏洞，可绕过终止保护和代码执行限制 | 安全补丁，需立即处理 |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | Feature | 无头 Bot 持续运行需求，高社区呼声 | 纳入 v0.23 路线图规划 |
| [#105104](https://github.com/NousResearch/hermes-agent/issues/105104) | Bug P1 | 桌面端非确定性无响应，难以复现 | 增加日志可观测性，收集更多复现样本 |
| [#109279](https://github.com/NousResearch/hermes-agent/pull/109279) | PR P2 | 大工具集降级修复，需审查 | 加快审查流程，避免阻塞合并 |
| [#109464](https://github.com/NousResearch/hermes-agent/pull/109464) | PR P2 | UTF-8 损坏行容错修复，需审查 | 加快审查流程 |
| [#109465](https://github.com/NousResearch/hermes-agent/pull/109465) | PR P2 | 损坏 session 查询降级修复，需审查 | 加快审查流程 |

**总体评估：** 项目活跃度健康，但 cron 子系统和安全边界的 Bug 需要优先响应。社区贡献活跃，PR 流转速度较快，建议维护者聚焦于 P1/P2 级别的安全和稳定性修复。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-09-13

> 数据周期：2026-09-12 00:00 ~ 2026-09-13 00:00（UTC+8）
> 仓库：[github.com/AstrBotDevs/AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## 1. 今日速览

AstrBot 昨日活跃度**极高**：24h 内新增/更新 Issues 13 条、PR 28 条，是典型的"主版本发布后密集调优期"。社区围绕 **4.28.0 的定时任务与模型回退机制**出现集中反馈，同时 OpenCode Go 协议变更引发配置兼容性讨论。核心维护者响应迅速，当日已合并多个关键修复。项目整体健康度：**良好**，无阻塞性崩溃，但桌面端 WebUI digest mismatch 需尽快跟进。

---

## 2. 版本发布

**无新版本发布。** 当前主线版本为 **v4.28.0**（含 Beta.1）。昨日多为 v4.28.0 的补丁型修复与配置调整，未出现破坏性变更公告。

---

## 3. 项目进展 — 已合并/关闭的重要 PR

| PR | 类型 | 摘要 | 链接 |
|---|---|---|---|
| [#10008](https://github.com/AstrBotDevs/AstrBot/pull/10008) | **fix** | 修复 `active_agent` 定时任务不发送最终文本给绑定会话的严重缺陷——此前 cron 执行完只存入历史摘要，用户收不到回复 | [PR #10008](https://github.com/AstrBotDevs/AstrBot/pull/10008) |
| [#10044](https://github.com/AstrBotDevs/AstrBot/pull/10044) | **fix** | 系统提示词块（`<system_reminder>`）因未标记为 temporary 导致上下文线性膨胀，现已修复 | [PR #10044](https://github.com/AstrBotDevs/AstrBot/pull/10044) |
| [#10052](https://github.com/AstrBotDevs/AstrBot/pull/10052) | **fix** | 工具调用中重复读取同一本地图片会创建多余副本，现已复用原始文件路径 | [PR #10052](https://github.com/AstrBotDevs/AstrBot/pull/10052) |
| [#10053](https://github.com/AstrBotDevs/AstrBot/pull/10053) | **fix** | 插件通过 URL 或 ZIP 更新时因目录已存在而失败，现已支持覆盖更新 | [PR #10053](https://github.com/AstrBotDevs/AstrBot/pull/10053) |
| [#9667](https://github.com/AstrBotDevs/AstrBot/pull/9667) | **feat** | WebUI 聊天历史分页加载（修复 #9652），长对话不再一次性下载全部上下文 | [PR #9667](https://github.com/AstrBotDevs/AstrBot/pull/9667) |
| [#10004](https://github.com/AstrBotDevs/AstrBot/pull/10004) | **fix** | 统一 `/new` 与 `/reset` 命令行为，均重置当前会话 | [PR #10004](https://github.com/AstrBotDevs/AstrBot/pull/10004) |
| [#9725](https://github.com/AstrBotDevs/AstrBot/pull/9725) | **fix** | LLM 元数据获取增加 `models.opencode.ai` 备用端点，解决部分网络环境不可达问题 | [PR #9725](https://github.com/AstrBotDevs/AstrBot/pull/9725) |
| [#8431](https://github.com/AstrBotDevs/AstrBot/pull/8431) | **fix** | 事件钩子调用增加超时保护（默认 300s），避免单个插件卡死整个事件循环 | [PR #8431](https://github.com/AstrBotDevs/AstrBot/pull/8431) |

**整体推进评估**：昨日合并的 PR 集中在"4.28.0 已知缺陷补救"，覆盖**定时任务结果投递、上下文膨胀、插件更新失败、WebUI 长对话性能**四大痛点，项目稳健性明显提升。

---

## 4. 社区热点

### 🔥 最热 Issue / PR

| 话题 | 热度 | 链接 |
|---|---|---|
| **定时任务失败后仍显示 `completed`**（#9980） | 7 条评论 | [Issue #9980](https://github.com/AstrBotDevs/AstrBot/issues/9980) |
| **OpenCode Go 要求 `x-opencode-session` 头**（#10045 / #10054） | 4 条评论 | [Issue #10045](https://github.com/AstrBotDevs/AstrBot/issues/10045) · [Issue #10054](https://github.com/AstrBotDevs/AstrBot/issues/10054) |
| **aiocqhttp 语音消息裸文件名导致 STT 失败**（#9199） | 2 条评论 | [Issue #9199](https://github.com/AstrBotDevs/AstrBot/issues/9199) |
| **定时任务未继承 fallback_provider_ids**（#10026） | 1 条评论 | [Issue #10026](https://github.com/AstrBotDevs/AstrBot/issues/10026) |
| **提示词定界符 nonce 增强**（#10057 / PR #10060） | 持续讨论 | [Issue #10057](https://github.com/AstrBotDevs/AstrBot/issues/10057) · [PR #10060](https://github.com/AstrBotDevs/AstrBot/pull/10060) |

**诉求分析**：
- **定时任务可靠性**是最大痛点：用户期望 `active_agent` 与普通聊天拥有同等模型回退、错误处理和结果投递能力，当前 v4.28.0 存在明显差距（#9980、#10026 均已关闭/部分修复）。
- **OpenCode Go 协议适配**：自 9 月 5 日起 OpenCode Console Go 强制要求 `x-opencode-session` 请求头，社区快速响应并建立独立 Issue 追踪（#10054）。
- **语音消息兼容性**：LuckyLilliaBot / OneBot 类协议端返回的 `.amr` 裸文件名无法被 `MediaResolver` 正确解析，STT 链路断裂（#9199，已有 PR #9329 待合并）。

---

## 5. Bug 与稳定性

| 级别 | Issue | 摘要 | Fix PR | 链接 |
|---|---|---|---|---|
| **🔴 高** | #10063 | Desktop 4.28.0 启动失败：WebUI index digest mismatch（expected `77dbc604...` got `84516dc5...`） | ❌ 暂无 | [Issue #10063](https://github.com/AstrBotDevs/AstrBot/issues/10063) |
| **🔴 高** | #9980 | 定时任务失败后 `cron_jobs` 状态错误显示 `completed` | ✅ 已合 [#10008](https://github.com/AstrBotDevs/AstrBot/pull/10008) | [Issue #9980](https://github.com/AstrBotDevs/AstrBot/issues/9980) |
| **🟠 中** | #10026 | `future_task` 未继承 `fallback_provider_ids`，主模型失败无法切换备用 | ⚠️ 部分修复 | [Issue #10026](https://github.com/AstrBotDevs/AstrBot/issues/10026) |
| **🟠 中** | #10045 | DeepSeek / OpenCode 模型配置后报 400 `MissingSessionID` | ⚠️ 待适配 | [Issue #10045](https://github.com/AstrBotDevs/AstrBot/issues/10045) |
| **🟡 低** | #10063 | Desktop 端 WebUI 版本检测逻辑过于严格，Beta.1 → 正式版升级触发误判 | ❌ 暂无 | [Issue #10063](https://github.com/AstrBotDevs/AstrBot/issues/10063) |
| **🟡 低** | #9199 | aiocqhttp 适配器未处理 `record` 消息裸文件名，STT 失败 | ⚠️ PR #9329 待合并 | [Issue #9199](https://github.com/AstrBotDevs/AstrBot/issues/9199) |
| **🟡 低** | #10029 | 系统内置指令 `/ls` 在 v4.28.0 不兼容（配置结构调整） | ✅ 已观察 | [Issue #10029](https://github.com/AstrBotDevs/AstrBot/issues/10029) |

---

## 6. 功能请求与路线图信号

| 需求 | Issue / PR | 可能性评估 |
|---|---|---|
| **提示词定界符加 nonce** 防止用户内容冒充框架标签 | #10057 / [PR #10060](https://github.com/AstrBotDevs/AstrBot/pull/10060) | **高** — 已实现并提交，预计纳入 4.28.x |
| **测试套件 Mock 插件市场请求**（离线可用） | #10058 / [PR #10062](https://github.com/AstrBotDevs/AstrBot/pull/10062) | **高** — 已提交，CI 稳定性优先 |
| **WebUI 聊天历史分页加载** | #9652 / [PR #9667](https://github.com/AstrBotDevs/AstrBot/pull/9667) | **已合并** ✅ |
| **`@llm_tool` 装饰器增加 `permission_type` 声明** | #8947 / [PR #9069](https://github.com/AstrBotDevs/AstrBot/pull/9069) | **中等** — 架构级改动，需审慎 |
| **自适应图片预处理**（方向修正、GIF 采样、透明 PNG→JPEG） | [PR #9703](https://github.com/AstrBotDevs/AstrBot/pull/9703) | **高** — XL 规模，质量提升显著 |
| **音频格式探测不阻塞事件循环** | #10055 / [PR #10055](https://github.com/AstrBotDevs/AstrBot/pull/10055) | **高** — 性能优化 |

---

## 7. 用户反馈摘要

**痛点（高频）**：
- "定时任务跑完我收不到回复，但数据库里状态是 completed" — **#9980**（已修复）
- "主模型 400 报错时普通聊天能切备用模型，但定时任务不行" — **#10026**
- "语音发过去 bot 完全不回，日志里 STT 异常" — **#9199**
- "升级到 4.28.0 后桌面端起不来，WebUI digest 对不上" — **#10063**

**满意点**：
- `/ls` 等内置指令的行为一致性被重新统一（#10004）
- WebUI 长对话加载慢的问题通过分页得到解决（#9667）
- 插件更新机制更健壮，URL/ZIP 安装不再因目录已存在而失败（#10053）

**使用场景洞察**：
- **角色扮演/小说创作**用户群体对长上下文性能敏感（#9652 触发分页需求）
- **自动化运维**用户重度依赖 `active_agent` 定时任务，对错误状态显示容忍度低（#9980）
- **QQ 群管**场景下语音交互需求增长，但协议端兼容性仍是短板（#9199）

---

## 8. 待处理积压

| Issue / PR | 优先级 | 描述 | 提醒 |
|---|---|---|---|
| [#10063](https://github.com/AstrBotDevs/AstrBot/issues/10063) | **🔴 P0** | Desktop WebUI digest mismatch 阻止启动 | 需尽快修复版本检测逻辑 |
| [#9199](https://github.com/AstrBotDevs/AstrBot/issues/9199) + [PR #9329](https://github.com/AstrBotDevs/AstrBot/pull/9329) | **🟠 P1** | aiocqhttp 语音 STT 失败，PR 待合并 | 影响 QQ 语音交互核心链路 |
| [#10045](https://github.com/AstrBotDevs/AstrBot/issues/10045) + [Issue #10054](https://github.com/AstrBotDevs/AstrBot/issues/10054) | **🟠 P1** | OpenCode Go 协议适配（`x-opencode-session`） | 协议方 9/5 强制要求，需跟进 |
| [#10026](https://github.com/AstrBotDevs/AstrBot/issues/10026) | **🟡 P2** | 定时任务 fallback 模型继承 | #10008 已修复结果投递，但 fallback 逻辑仍需确认 |
| [#10056](https://github.com/AstrBotDevs/AstrBot/issues/10056) | **🟡 P2** | QQ 官方群机器人适配器入群/退群事件咨询 | 插件作者依赖框架澄清，影响下游兼容性 |
| [PR #9703](https://github.com/AstrBotDevs/AstrBot/pull/9703) | **🟡 P2** | 自适应图片预处理（XL 规模） | 合并前需充分回归测试 |
| [PR #9069](https://github.com/AstrBotDevs/AstrBot/pull/9069) | **🟡 P2** | `@llm_tool` permission_type 声明 | 架构级改动，需讨论设计 |

---

## 📊 项目健康度评分

| 维度 | 评分 | 说明 |
|---|---|---|
| 响应速度 | ⭐⭐⭐⭐⭐ | 核心 Issue 当日合并修复 |
| Bug 修复率 | ⭐⭐⭐⭐☆ | 高优 Bug 多数已修复，桌面端 digest 待解 |
| 社区参与 | ⭐⭐⭐⭐⭐ | 多贡献者活跃，PR 质量高 |
| 文档/沟通 | ⭐⭐⭐⭐☆ | Issue 模板规范，但部分咨询类 Issue 响应慢 |
| 稳定性 | ⭐⭐⭐⭐☆ | 4.28.0 上线后问题集中爆发属正常现象，修复节奏健康 |

> **综合评价**：AstrBot 4.28.0 发布后的调优期，社区维护者与贡献者协作高效，关键 Bug 修复及时。短期关注桌面端启动问题和 OpenCode 协议适配，长期图片预处理与定时任务健壮性将显著提升用户体验。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：** 2026-09-13  
**数据来源：** GitHub Discussions (deepseek-ai/deepseek-harness)

## 1. 今日速览
DeepSeek Harness 社区在过去24小时内保持高度活跃，共产生 **184 条** Discussion 更新。项目虽无新版本 Release，但用户反馈密度极高，主要集中在 **会话格式兼容性**、**网络/SRRF 安全策略** 以及 **中文输入法体验** 三个核心痛点。社区对 v0.1.5 升级带来的历史会话读取失败问题反应强烈，同时针对 OpenCode Go API 等新上游依赖的适配需求也在升温。整体来看，项目处于功能迭代后的“磨合期”，稳定性与兼容性问题是当前社区关注的焦点。

## 2. 版本发布
**无新版本发布。**

> 注：依据项目机制，代码合并通过 Releases 落地。本次统计周期内无新增 Release，故无官方合并摘要。

## 3. 项目进展
当前周期内无公开的代码合并记录（Changelog 为空）。项目维护重心似乎正转向修复 v0.1.5 升级引入的会话格式兼容性问题（见 Bug 与稳定性部分），尚未形成独立的 Release 来确认修复状态。

## 4. 社区热点
以下话题评论数最多，反映了用户最迫切的关注点：

1.  **[Ideas] `tokenUsage` projection 未折叠 compaction/summary.usage**
    *   **热度：** 27 条评论
    *   **链接：** [Discussion #1886](https://github.com/deepseek-ai/deepseek-harness/discussions/1886)
    *   **分析：** 开发者深入追踪了 Token 使用统计在重试步骤中的替换 vs 累加逻辑，以及 compaction 场景下的投影问题。这反映了专业用户对工具可观测性和数据准确性的极致要求。

2.  **[Ideas] 添加 'dsh doctor' CLI 诊断命令**
    *   **热度：** 59 条评论
    *   **链接：** [Discussion #1719](https://github.com/deepseek-ai/deepseek-harness/discussions/1719)
    *   **分析：** 本地环境配置（pnpm, Node 版本, PATH）是新手入门的最大摩擦点。用户强烈渴望一个内置的一键诊断工具来降低排错门槛。

3.  **[General] OpenCode Go API 强制要求 `x-opencode-session` 头**
    *   **热度：** 21 条评论
    *   **链接：** [Discussion #5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)
    *   **分析：** 上游服务（OpenCode Go）自 9 月 5 日起对 25k+ 组织强制执行新 Header 校验。这是一个紧急的外部依赖适配需求，可能涉及大规模用户的连接失败。

## 5. Bug 与稳定性
**严重程度：高 — 数据丢失/访问阻断风险**

*   **v0 会话迁移失败，老会话无法打开**
    *   **描述：** 从 v0.1.1 升级到 v0.1.5 后，大量旧会话（version < 3 的 subagent/descriptor）被拒绝加载。报错 `refuses this format v0 Session`。用户反馈只需修改一个字段就会暴露下一个，导致“打地鼠”式的排错体验。
    *   **链接：** [Discussion #6045](https://github.com/deepseek-ai/deepseek-harness/discussions/6045) | [Discussion #6151](https://github.com/deepseek-ai/deepseek-harness/discussions/6151)
    *   **状态：** 未修复。这是当前最严重的回归问题，影响了存量用户的数据可访问性。

*   **超长上下文下模型陷入思考退化循环**
    *   **描述：** 在使用 `deepseek-v4.1-flash` 配合 `max reasoning effort` 和超大上下文时，agent 在回合零产出，且无自动熔断机制，需手动中止。同配置下 v4-flash 未复发。
    *   **链接：** [Discussion #5976](https://github.com/deepseek-ai/deepseek-harness/discussions/5976)
    *   **状态：** 待排查。疑似特定模型版本在极限负载下的逻辑缺陷。

*   **Web 界面中文输入法 (IME) 失效**
    *   **描述：** macOS 环境下，Web GUI 输入框中拼音字母直接上屏，候选词不出现，导致无法输入中文。
    *   **链接：** [Discussion #3504](https://github.com/deepseek-ai/deepseek-harness/discussions/3504)
    *   **状态：** 未修复。严重影响中文用户的基础交互体验。

*   **tool-cordis Preset 进程全局冲突**
    *   **描述：** 两个基于 `tool-cordis` 的 preset 无法在同一进程中共存，因为 inspect providers 是进程全局唯一的。
    *   **链接：** [Discussion #4675](https://github.com/deepseek-ai/deepseek-harness/discussions/4675)
    *   **状态：** 架构限制导致的 Bug。

## 6. 功能请求与路线图信号
*   **CLI 诊断工具 (`dsh doctor`)**：高优先级需求，旨在解决环境配置痛点（#1719）。
*   **定时任务插件 (`dsh-schedule-tasks`)**：社区已开发并分享插件，支持5段式 cron 解析和侧边栏面板，满足自动化巡检和定时执行需求（#1600）。
*   **白盒因果护栏 (`weiwen-law-dsh`)**：社区插件，在工具调用前进行因果逻辑链 adjudication，拦截高风险操作（如破坏性文件操作、凭证读取）（#4634）。
*   **SSRF 网关逃逸出口**：用户指出 `web-fetch-http` 在 transparent-proxy fake-ip DNS 环境下拒绝了所有请求，缺乏允许列表或 resolver 逃逸机制（#5202）。

## 7. 用户反馈摘要
*   **痛点：** 升级后的向后兼容性差。用户珍视历史会话数据，但 v0.1.5 的严格格式检查导致 15/35 个老会话不可用，且错误提示单一，排错成本高（#6151）。
*   **体验：** Web 端的中文输入法支持存在严重缺陷，直接阻断了中国用户的核心使用场景（#3504）。
*   **需求：** 用户希望获得更强的环境自愈能力（`dsh doctor`）和本地自动化调度能力，而非仅依赖外部 cron（#1719, #1600）。
*   **困惑：** 部分用户在简单启动配置 API Key 后仍频繁遇到连接超时，表明默认网络策略或代理配置可能存在黑盒问题（#175）。

## 8. 待处理积压
*   **[Critical] v0 会话格式兼容性修复**：#6045 和 #6151 揭示了破坏性变更，需要官方明确回复是否会在下一补丁版本中提供自动迁移工具或放宽校验逻辑。
*   **[High] OpenCode Go Header 适配**：#5495 提到了大规模用户的 API 连接风险，需确认框架是否已支持或通过配置解决 `x-opencode-session` 头部的注入问题。
*   **[Medium] 持久 Bash 切换权限失败**：#2226 报告了在会话中途切换 Full access 时，因护栏无差别拦截导致的失败，影响工作流连续性。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*