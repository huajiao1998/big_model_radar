# OpenClaw 生态日报 2026-07-29

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-07-28 22:50 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

好的，作为AI智能体与个人AI助手领域的开源项目分析师，我已根据您提供的OpenClaw GitHub数据，梳理并生成了今日（2026-07-29）的项目动态日报。

---

# OpenClaw 项目日报 | 2026-07-29

## 1. 今日速览
项目过去24小时内活跃度极高，共处理**500条Issue更新**与**500条PR更新**，社区与核心团队协同紧密。**核心发布** `v2026.7.2-beta.5` 标志着项目将开发重心正式转向 **数据持久化与崩溃恢复** 的生产环境健壮性打磨。尽管如此，当前仍有多起P0/P1级别的严重Bug（网关内存泄漏、渠道永久性断联）处于待修复状态，项目整体正处于快速迭代与稳定性攻坚并行的阶段。社区对于跨平台客户端（#75）和机密数据保护（#10659）的需求呼声愈发强烈。

## 2. 版本发布
**版本号：** [v2026.7.2-beta.5](https://github.com/openclaw/openclaw/releases)
- **核心主题：** 状态层重构与灾难恢复（State Safety and Recovery）
- **详细说明：**
    - **隔离存储（Quarantine Store）：** 当主数据库受损时，通过隔离存储保护持久化数据。
    - **崩溃恢复快照（Crash-Recoverable SQLite）：** SQLite快照支持崩溃恢复；文件系统发布实现崩溃持久化。
    - **迁移保护（Schema-Upgrade Rejection）：** 拒绝可能导致数据丢失的数据库模式升级。
    - **回滚恢复（Rollback Recovery）：** 支持回滚写入器快照恢复。
- **破坏性变更与迁移：** 本次涉及核心 State 引擎重大变更。建议用户在升级后执行 `openclaw doctor --fix` 以完成状态一致性校验。长时间运行的生产 Gateway 升级后可能需要重启服务以激活新的快照机制。

## 3. 项目进展
今日有大量高价值 PR 被合并/关闭，项目在性能、稳定性及功能体验上均有明显推进：
- **性能优化：**
    - [#113817](https://github.com/openclaw/openclaw/pull/113817) **（已合并）** 提速了热启动场景下的模型准备流程，减少了 Gateway 事件循环阻塞。
- **稳定性与健壮性：**
    - [#115428](https://github.com/openclaw/openclaw/pull/115428) **（已合并）** 修复了 Gateway 启动时日志分片挂起问题。
    - [#115427](https://github.com/openclaw/openclaw/pull/115427) **（已合并）** 加强了 CLI 插件安装的校验，防止无效变更造成数据库污染。
    - [#115321](https://github.com/openclaw/openclaw/pull/115321) **（已合并）** 修复了数据库关闭时未清理缓存的句柄泄漏。
- **UI/UX 提升：**
    - [#115429](https://github.com/openclaw/openclaw/pull/115429) **（已合并）** 统一了 Web 与 Terminal 的会话状态，解决了历史同步问题。
    - [#115407](https://github.com/openclaw/openclaw/pull/115407) **（已合并）** 优化了多 Agent 网关中空会话分组显示，减少界面理解困惑。
- **功能扩展：**
    - [#114835](https://github.com/openclaw/openclaw/pull/114835) **（已合并）** 实现了会话监控感知能力，让模型能够感知主会话与受监控会话的同步状态。

## 4. 社区热点

- **[#75 [Open] Linux/Windows Clawdbot Apps](https://github.com/openclaw/openclaw/issues/75) (评论: 115，👍: 80)**
    - **分析：** 这是当前社区**最大**的呼声所在。项目目前仅支持 macOS/iOS/Android，缺失 Linux 与 Windows 客户端直接阻断了庞大的开发者与企业级用户市场。此 Issue 自年初创建以来热度不减，但缺乏明确的产品规划，已成为生态增长的潜在瓶颈。

- **[#91588 [Open] 严重内存泄漏 (RSS 350MB -> 15.5GB)](https://github.com/openclaw/openclaw/issues/91588) (评论: 20, P0)**
    - **分析：** P0级稳定性问题，持续吸引社区关注。用户反馈表明 Gateway 进程在运行2-3天后 RSS 膨胀至15.5GB并被 OOM Killer 杀死，导致反复重启。尽管今日发布了专注于状态恢复的 Beta 版本，但此 Issue 仍无直接关联的 Fix PR，是悬在生产环境用户头顶的利剑。

- **[#10659 [Open] 屏蔽机密 (Masked Secrets)](https://github.com/openclaw/openclaw/issues/10659) (评论: 14, P1)**
    - **分析：** 安全领域的高热度需求。用户担心 Agent（或被注入的模型）能直接读取 `.env` 中的原始 API Key。社区呼吁建立“仅能用，不可见”的密钥系统，以防范 Prompt 注入和数据泄露。

## 5. Bug 与稳定性

| 严重程度 | Issue | 摘要 | 状态 |
|---|---|---|---|
| **P0 (灾难)** | [#91588](https://github.com/openclaw/openclaw/issues/91588) | Gateway 内存泄漏导致系统 OOM 崩溃（RSS 350MB -> 15.5GB) | **未修复**，影响极大 |
| **P0 (灾难)** | [#115326](https://github.com/openclaw/openclaw/issues/115326) | 崩溃抑制器（Crash-loop breaker）永久沉默 Discord 与 WhatsApp，且官方恢复方法失效 | **新Bug，破坏通信** |
| P1 (严重) | [#115001](https://github.com/openclaw/openclaw/issues/115001) | 混合内存搜索返回错误的相似度分数（Hybrid memory search spurious scores） | **新Bug，影响内存质量** |
| P1 (严重) | [#114137](https://github.com/openclaw/openclaw/issues/114137) | 可见渠道的 Turn 完成但发送负载为空（消息静默丢失） | **新Bug，可靠性回归** |
| P1 (严重) | [#98790](https://github.com/openclaw/openclaw/issues/98790) | 并行 Agent 间会话树分叉，导致会话永久“中毒”无法恢复 | **复杂并发Bug** |
| P1 (严重) | [#113434](https://github.com/openclaw/openclaw/issues/113434) | Codex 会话 ID 重用导致 Gateway RAM 耗尽（2026.7.2-beta.4） | **Beta版稳定性问题** |
| P1 (严重) | [#108075](https://github.com/openclaw/openclaw/issues/108075) **(已关闭)** | 2026.7.1 Agent 因 LLM 请求模式被拒报错 | **已解决** |
| 已有 Fix PR | [#115016](https://github.com/openclaw/openclaw/pull/115016) | 修复自动回复误触发“No reply was generated”的问题 | Fix PR 已开 |
| 已有 Fix PR | [#115327](https://github.com/openclaw/openclaw/pull/115327) | 修复 `agent exec --json` 输出被诊断日志污染 | Fix PR 已开 |

**趋势提示：** 今日报告的高严重度 Bug 多为“之前能用，更新后不能”的 **Regression**，反映出当前快速迭代周期中可能存在自动化测试覆盖不足的情况。

## 6. 功能请求与路线图信号

- **安全基石构建（P1）：**
    - [#10659](https://github.com/openclaw/openclaw/issues/10659) 屏蔽机密（Masked Secrets）：防止 Prompt 注入窃取凭据。
    - [#7722](https://github.com/openclaw/openclaw/issues/7722) 文件系统沙盒：企业级路径访问控制。
    - [#6615](https://github.com/openclaw/openclaw/issues/6615) 执行拒绝清单（Denylist）：配合现有 Allowlist 实现灵活策略。

- **AI 与模型扩展：**
    - [#10687](https://github.com/openclaw/openclaw/issues/10687) 动态模型发现：解决 OpenRouter 等快速变动模型目录的配置滞后问题。
    - [#9986](https://github.com/openclaw/openclaw/issues/9986) 上下文超限触发降级：完善模型故障转移逻辑。
    - [#8355](https://github.com/openclaw/openclaw/issues/8355) 流式 TTS 管道：为语音通话实现低延迟响应。

- **运维与可观测性：**
    - [#73537](https://github.com/openclaw/openclaw/issues/73537) 生产就绪稳定性标签：要求明确版本成熟度（Alpha/Beta/Stable）。
    - [#6599](https://github.com/openclaw/openclaw/issues/6599) 测试降级链命令：用于验证配置而不必等到真出错。

**路线图信号：** 从 Beta 版发布来看，**数据健壮性**是当前最高优先级。而社区形成共识的下一阶段重点将是 **安全加固** 与 **跨平台客户端**支撑。

## 7. 用户反馈摘要
- **核心痛点：**
    - **可靠性缺失：** 多位依赖 OpenClaw 进行家庭和业务通信的用户遭遇了消息丢失（#114137）、渠道永久断连（#115326）和服务器 OOM（#91588）。这些生产环境致命问题正在消耗社区信任。
    - **平台“偏见”：** Linux/Windows 用户的诉求（#75）被长期搁置，导致大量开发者用户无法深度体验，限制了项目在 core developer 圈层的自传播。
    - **安全焦虑：** 用户对 Agent 直接暴露 API Key（#10659）和系统文件访问（#7722）表示深切担忧，担心被不可靠的模型或 Prompt 注入利用。
    - **升级疲劳：** 多个回归（Regression）Bug 和顽固的迁移警告（#90213）让用户对升级产生恐惧，维持旧版本可能遭受Bug困扰，升级则面临新Bug风险。

- **积极信号：**
    - 用户深度投入，愿意花费时间撰写详尽的 Bug 报告，包含完整日志和复现步骤（如 #98790、#91588）。
    - 社区代码贡献活跃，今日有多达数条来自社区的 Fix PR 被合并（#115395, #115321 等）。

## 8. 待处理积压
- **[#75 [Open] Linux/Windows 客户端：](https://github.com/openclaw/openclaw/issues/75)** 自2026年1月起便为社区最高呼声。长期缺乏进展规划，可能挫伤核心生态用户的贡献热情。
- **[#91588 [Open] 内存泄漏：](https://github.com/openclaw/openclaw/issues/91588)** P0 级别且影响恶劣，至今仍为未关闭。虽然发布了状态恢复 Beta 版，但此问题未明确关联修复。社区需要维护者对修复方案和时间表做出明确回应。
- **[#10659][#7722][#6615] 安全功能积压：** 这三个 P1/P2 的安全增强请求均标记为 `needs-product-decision`，长时间等待产品决策。建议维护者尽快发布 RFC 或通过社区讨论确立安全模型的发展方向。
- **[#73537 [Open] 稳定性标签：](https://github.com/openclaw/openclaw/issues/73537)** 用户直接提出了对项目发布流程透明化的需求。明确 Release 的生命周期（Nightly/Beta/Stable）是缓解“升级焦虑”最直接的手段。

---

## 横向生态对比

# AI 智能体与个人 AI 助手开源生态横向对比分析报告

**分析周期：2026-07-28 ~ 2026-07-29**  
**覆盖项目：OpenClaw、Zeroclaw、PicoClaw、QwenPaw、hermes‑agent、AstrBot**

---

## 1. 生态全景

个人 AI 助手与自主智能体赛道正经历从“可用玩具”向“生产级平台”的集体跃进。六个头部项目单日合计处理超过 **1,100 条 Issue 和 1,100 条 PR**，社区投入力度空前。共同特征包括：**数据持久化与崩溃恢复成为刚需**（各项目均出现因内存泄漏、配置损坏导致的服务中断）、**跨平台客户端仍为最大缺口**（Linux/Windows/Android 均存在阻塞性 Bug）、**安全管控（OAuth、密钥屏蔽、智能体隔离）从“好要有”变为“必须有”**。生态内部开始明显分化：部分项目聚焦核心引擎的健壮性（OpenClaw），部分走向插件化与评估体系（Zeroclaw），另一些则加速向企业协同与平台化转型（hermes‑agent、AstrBot）。

---

## 2. 各项目活跃度对比

| 项目 | Issue 更新数 | PR 更新数 | 今日 Release | 总体健康度 |
|------|-------------|-----------|--------------|-----------|
| **OpenClaw** | 500（含大量 Bug 报告） | 500（合并率未明确） | ✅ v2026.7.2‑beta.5 | ⚠️ 活跃极高，但 P0 内存泄漏、渠道断联等严重 Bug 未修复 |
| **Zeroclaw** | 46（新开/活跃 39） | 50（合并/关闭 9） | ❌ | 🟡 健康度良好，S1 阻塞已关，但 skill‑review SIGSEGV 等高风险问题积压 |
| **PicoClaw** | 4 | 10（合并 3） | ❌ | 🟡 中等活跃，Android 启动失败已超一个月，OAuth 修复待合入 |
| **QwenPaw** | 19（新开/活跃 13） | 45（合并/关闭 9） | ❌ | 🟡 社区贡献踊跃，但 Windows 安装器无限循环、MCP 恢复等严重 Bug 阻碍新用户 |
| **hermes‑agent** | **500（极高）** | **500（极高）** | ❌ | ⚠️ 极度活跃，但 351 个待合并 PR 形成积压风险，P2 类 Bug 数量多且分散 |
| **AstrBot** | 未单独统计（与 PR 关联） | 29（合并 **22**） | ✅ **v4.26.8**（插件市场） | 🟢 发布节奏健康，严重 Bug #9412 待验证，整体修复响应快 |

> 健康度评级：🟢 良好 | 🟡 有风险 | ⚠️ 危险（基于 P0/P1 未修复数、积压程度）

---

## 3. OpenClaw 在生态中的定位

OpenClaw 是当前生态中最接近“上游参照实现”的项目，其代码仓库亦被标记为 **core reference**。与同源项目（Zeroclaw、PicoClaw、QwenPaw）相比：

- **架构重心**：OpenClaw 是最强调**状态层健壮性**的项目。v2026.7.2‑beta.5 引入的隔离存储、崩溃恢复 SQLite、回滚恢复等机制，使其在生产环境可靠性上领先一个身位。其他项目（如 Zeroclaw）也在讨论配置覆盖与持久化，但尚未达到同等深度。
- **社区规模**：日活 Issue/PR 数达到 500 级别，与 hermes‑agent 并列第一；Issue #75（跨平台客户端）积累 115 条评论、80 👍，是生态内单项目最高热度需求。
- **差异化短板**：OpenClaw 目前仍集中解决核心引擎问题，在**插件生态、评估框架、桌面 UI** 等方面明显落后于 Zeroclaw 和 AstrBot。其“先稳定内核，再丰富外围”的路线与 hermes‑agent 的“社区驱动快速铺功能”形成鲜明对比。
- **同源项目对比**：Zeroclaw 更像是对 OpenClaw 的“架构现代化实验”（WASM 插件、Eval 框架）；PicoClaw 侧重嵌入式/轻量设备；QwenPaw 则深度绑定中国市场（飞书、QQ）与阿里模型。OpenClaw 仍是它们共同的功能参考与稳定性基准。

---

## 4. 共同关注的技术方向

以下方向在多个项目中同时涌现，反映行业级需求：

| 技术方向 | 涉及项目 | 具体诉求 |
|----------|---------|---------|
| **数据持久化与崩溃恢复** | OpenClaw、Zeroclaw、hermes‑agent | OpenClaw #91588 内存泄漏 OOM；Zeroclaw #9284 配置覆盖；hermes‑agent #73671 会话过期竞态。均需要更可靠的写入与恢复机制。 |
| **OAuth 与密钥安全** | OpenClaw、Zeroclaw、PicoClaw、hermes‑agent | OpenClaw #10659 屏蔽机密；Zeroclaw #9127 密钥源抽象；PicoClaw #3280 远程 OAuth 死亡；hermes‑agent #25267 Claude 订阅 OAuth。认证与凭证保护成为用户最普遍的安全焦虑。 |
| **跨平台客户端（Linux/Windows/Android）** | OpenClaw、PicoClaw、QwenPaw、hermes‑agent | OpenClaw #75 长期搁置；PicoClaw #3182 Android 启动失败；QwenPaw #6534 Windows 安装器无限循环；hermes‑agent 每日多个 macOS TCC 修复。桌面与移动端支持仍是生态的共同瓶颈。 |
| **多智能体隔离与权限控制** | QwenPaw、hermes‑agent、OpenClaw | QwenPaw #6461 会话间数据泄露；hermes‑agent #527 RBAC 四级权限；OpenClaw #98790 会话树分叉“中毒”。当 Agent 从单实例变为多实例协作，安全隔离成为必须。 |
| **LLM 提供商扩展与 Fallback** | OpenClaw、PicoClaw、hermes‑agent、AstrBot | OpenClaw #10687 动态模型发现；PicoClaw #3200 模型回退链；hermes‑agent #25822 Gemini 503 无降级；AstrBot #9400 供应商配置校验。统一、可降级的模型路由正在成为标配。 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Zeroclaw | PicoClaw | QwenPaw | hermes‑agent | AstrBot |
|------|----------|----------|----------|---------|---------------|--------|
| **功能侧重** | 全栈核心引擎 + 多渠道网关 | 插件化运行时 + 评估框架 | 轻量边缘端 + 多平台渠道（钉钉/飞书） | 国内企业协作 + 多智能体隔离 | 桌面优先 + 团队协作 + 订阅经济 | 群管理自动化 + 知识库 + 插件市场 |
| **目标用户** | 高级自部署者、隐私敏感用户 | 开发者、需要定制插件的团队 | 移动/IoT 用户、中国企业职场 | 国内企业、QQ/飞书生态用户 | macOS 生态重度用户、从个人走向团队 | 社群运营者、轻量自动化 |
| **技术架构** | 单体核心 + 状态机 | WASM 插件宿主 + 编译时分解 | 轻量化 Rust/嵌入式 | 基于 AgentScope 生态 | Electron 桌面 + 大量社区贡献 | Python 后端 + WebUI |
| **核心优势** | 数据层健壮性领先 | Eval 框架与插件化先行 | 中国特色渠道适配 | 多智能体隔离设计 | 社区规模最大、桌面体验最佳 | 发布节奏快、插件市场已上线 |
| **核心瓶颈** | 跨平台客户端空白、安全功能排队长 | skill‑review SIGSEGV 等高风险 Bug | Android 兼容性瘫痪 | Windows 安装、MCP 恢复 | 351 个待合 PR、P2 Bug 分散 | 定时任务稳定性仍有黑天鹅 |

---

## 6. 社区热度与成熟度

### 活跃度分层（按日 Issue + PR 更新量）

- **第一梯队（>500）：** OpenClaw、hermes‑agent  
  每日更新量级在千条上下，社区提交极为踊跃，但也伴随着大量重复报告与积压 PR。OpenClaw 核心团队响应较快，hermes‑agent 则明显面临评审瓶颈。

- **第二梯队（40–60）：** Zeroclaw、QwenPaw、AstrBot  
  数据量不及第一梯队，但合并率与重点修复方向清晰。AstrBot 以 22/29 的合并比（76%）表现出最高的交付效率。

- **第三梯队（<15）：** PicoClaw  
  项目体量较小，但仍有 P0 级 Android Bug 待解。建议增加维护人力或明确社区 Roadmap。

### 迭代阶段判断

- **功能快速扩张期：** hermes‑agent、Zeroclaw（大量新 PR 涉及组件重构、新功能）
- **稳定性与安全攻坚期：** OpenClaw、PicoClaw、QwenPaw（修复与发行版聚焦数据丢失、内存泄漏、OAuth）
- **生态平台化早期：** AstrBot（已上线插件市场，从单工具向平台跃迁）

---

## 7. 值得关注的趋势信号

1. **“插件市场”成为生态成熟度分水岭**  
   AstrBot 率先上线 Cloud 插件市场，Zeroclaw 的 WASM 插件化在 RFC 阶段持续热论。可以预见 2026 Q4 将有更多项目推出官方插件注册/分发机制。个人 AI 助手正从“功能固定的工具”转向“可编程的工作平台”。

2. **评估与测试基础设施从可选变必备**  
   Zeroclaw 花了大量篇幅描述 Eval 框架 PR 系列（#9214–#9248），PicoClaw 的“模型解析回归”也反映出测试覆盖不足的隐患。当 Agent 行为越来越不确定，**LLM 驱动的自动化评测** 将成为 DevEx 的关键竞争力。

3. **OAuth/订阅经济模型冲击传统 API‑Key 模式**  
   hermes‑agent #25267（Claude 订阅复用）获得 44 👍，OpenClaw #10659（屏蔽机密）讨论激烈。用户不愿意为两套计费体系买单，也不信任明文存储的 API Key。能在 OAuth 与凭证隔离上做好的项目，将获得明显的用户迁移红利。

4. **“崩溃恢复”与“数据不丢失”成为生产环境准入证**  
   OpenClaw 整个 beta 版围绕状态恢复构造，Zeroclaw 的配置覆盖 Bug（#9284）被誉为“静默数据丢失”。随着这些项目被更多人用于真实通信与工作流，**持久化层质量**正在从锦上添花变为生死问题。

5. **多 Agent 编排需要原生隔离（不仅仅是提示工程）**  
   QwenPaw #6461 和 #6505 揭露的“一个 Agent 读取另一个的记忆”或“sub‑agent 无限制耗尽预算”不是个例。这一方向将成为 2026 下半年架构设计的焦点：Agent Runtime 需要从语言层面支持会话隔离、资源配额、继承式审批。

6. **跨平台客户端不再是个选项，而是生态入场券**  
   OpenClaw #75（115 评论、80 👍）和 PicoClaw #3182（长达一个月的 Android 崩溃）表明：缺失 Linux/Windows/移动端，项目的开发者自传播会受到严重抑制。hermes‑agent 每天投入大量精力修复 macOS TCC，侧面说明桌面体验是当前最大的用户留存杠杆。

---

**总结：** 当前 AI 智能体生态正经历从“能跑就行”到“跑得稳、跑得安全、跑得广”的深刻转型。对于技术决策者而言，选择项目时建议**优先关注其状态层可靠性（崩溃恢复、数据一致）、安全认证机制（OAuth/密钥隔离）以及跨平台交付能力**——这三项能力将决定一个 AI Agent 框架能否从个人实验走向企业级部署。社区热度虽高，但真正决定长期价值的，是维护者处理严重 Bug 的速度，以及应对生态分化时的架构演进能力。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 2026-07-29

## 1. 今日速览

项目过去 24 小时保持高活跃度：共 46 条 Issue 更新（新开/活跃 39，已关闭 7）和 50 条 PR 更新（待合并 41，已合并/关闭 9）。两个阻塞性 S1 问题（认证配置迁移失败 #9474、测试全局锁毒化 #9357）被成功关闭，但仍有 6 个 P1 级 Bug 处于待修复或在研状态。社区讨论聚焦于安全基础（密钥来源抽象、WhatsApp 组权限）与架构演进（运行时插件化、统一附件），评估系统大量 PR 进入集中评审。尽管无版本发布，整体健康度良好，但高风险的积压故障（如 skill‑review SIGSEGV）值得持续关注。

> 数据来源：Zeroclaw GitHub Repository（github.com/zeroclaw-labs/zeroclaw），统计窗口为 2026-07-28 00:00 UTC – 2026-07-29 00:00 UTC。

---

## 2. 版本发布

本更新周期内无新版本发布。

---

## 3. 项目进展

过去 24 小时共合并/关闭 9 个 PR，解决了若干关键阻塞：

- **CPAL 依赖升级** (PR [#9308](https://github.com/zeroclaw-labs/zeroclaw/pull/9308) – CLOSED)  
  `chore(deps): bump cpal from 0.15.3 to 0.18.1`，为后续 voice‑wake 迁移铺平了编译覆盖层。

- **认证 Profile 存储向后兼容** (Issue [#9474](https://github.com/zeroclaw-labs/zeroclaw/issues/9474) – CLOSED)  
  老版本存储的 `provider` 字段与新 `model_provider` 要求不匹配导致所有 `zeroclaw auth` 子命令崩溃，已通过迁移逻辑修复。

- **全局 Mutex 毒化测试问题** (Issue [#9357](https://github.com/zeroclaw-labs/zeroclaw/issues/9357) – CLOSED)  
  修复了 `cargo test -p zeroclaw-runtime --lib` 20 次中有 19 次失败且一个 flaky assertion 会毒化全局锁的 CI 问题。

- **Vendored wit 漂移注册失败** (Issue [#9380](https://github.com/zeroclaw-labs/zeroclaw/issues/9380) – CLOSED)  
  插件打包的 `wit/v0` 枚举增加后，旧插件在新 host 上无法注册，已在插件加载流程中增加兼容检测。

- **ACP 嵌入式资源与 deliver_file** (Issue [#9178](https://github.com/zeroclaw-labs/zeroclaw/issues/9178) – CLOSED)  
  实现 ACP `resource.blob` 接受、`embeddedContext` 通告及 `deliver_file` 返回稳定 `uri`，agent 可向对话返回工作区文件作为嵌入式资源。

此外，多个高价值功能 PR 正在推进评审（见第 6 节），项目整体沿路线图持续稳步前进。

---

## 4. 社区热点

评论最密集的 Issue 体现了社区对安全与架构设计的关注：

- **#9127 RFC: 抽象 `KeySource` trait**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9127)，8 条评论）  
  提议将主密钥材料的来源与部署形态分类，统一凭证加密体系。社区围绕“字段级加密向后兼容”与“本地/远程密钥源”展开深入讨论，是后续安全 RFC 的基石。

- **#9357 测试全局锁毒化**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9357)，6 条评论）  
  虽然已关闭，但在关闭前引起了测试与 CI 维护者的高度关注，暴露了并发测试中 mutex 使用不当的共性问题。

- **#8654 skill‑review fork panics → SIGSEGV**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8654)，5 条评论）  
  后台 skill‑review 因切片越界崩溃导致整个 agent 进程退出（`panic = abort` 下 SIGSEGV）。该问题困扰工具重用的重度用户，社区给出了若干复现环境与栈追踪。

- **#9397 RFC: WhatsApp 空 `allowed_groups` 应视为 permit‑none**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9397)，3 条评论）  
  安全敏感的小型 RFC：默认空列表当前意味着“允许所有群组”，社区要求改为“拒绝全部”，与 Telegram 等其他频道的行为对齐。

- **新开 RFC #9487 / #9488**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)，各 2 条评论）  
  提出“运行时拥有会话生命周期”与“统一附件架构”，上线即获早期反馈，显示社区对架构解耦的强烈兴趣。

---

## 5. Bug 与稳定性

按严重程度（S1 > S2 > S3）列出今日活跃的 Bug，**(*) = 已有对应修复 PR**，未标注则代表尚无已知 fix PR。

| 严重度 | ID | 标题 | 状态 | 是否有 fix PR |
|--------|----|------|------|---------------|
| S1 | [#9492](https://github.com/zeroclaw-labs/zeroclaw/issues/9492) | `auth refresh` 因外部旋转 OpenAI‑Codex refresh token 死胡同 | OPEN | 无 |
| S1 | ~~#9474~~ | ~~认证 profile 加载失败（provider 字段迁移）~~ | CLOSED | 已修复 |
| S2 | [#9518](https://github.com/zeroclaw-labs/zeroclaw/issues/9518) | 生命周期观察者测试捕获了无关的并行事件（新报） | OPEN | 无 |
| S2 | [#9284](https://github.com/zeroclaw-labs/zeroclaw/issues/9284) | Config flush 覆盖并发写入 | OPEN (in‑progress) | 无 |
| S2 | [#9332](https://github.com/zeroclaw-labs/zeroclaw/issues/9332) | 多模态上下文计量严重低估图片请求 | OPEN (accepted) | 无 |
| S2 | [#9380](https://github.com/zeroclaw-labs/zeroclaw/issues/9380) | Vendored wit 漂移仅注册时报错 | CLOSED | 已修复 |
| S2 | [#8758](https://github.com/zeroclaw-labs/zeroclaw/issues/8758) | 上下文耗尽后 agent idle 无终端状态 | OPEN (in‑progress) | 无 |
| S2 | [#8760](https://github.com/zeroclaw-labs/zeroclaw/issues/8760) | Daemon 输出中混入 agent 输出 | OPEN (accepted) | 无 |
| S2 | [#9357](https://github.com/zeroclaw-labs/zeroclaw/issues/9357) | 测试毒化全局 mutex | CLOSED | 已修复 |
| S2 | [#9486](https://github.com/zeroclaw-labs/zeroclaw/issues/9486) | 高熵检测器误杀 Solana 钱包地址，禁用开关不生效 | OPEN | 无 |
| S2 | [#9465](https://github.com/zeroclaw-labs/zeroclaw/issues/9465) | 频道消息被预检拒绝后只有 emoji 无文本回复 | OPEN (in‑progress) | 无 |
| S3 | [#9462](https://github.com/zeroclaw-labs/zeroclaw/issues/9462) | zeroclaw‑plugins lib 单元测试在 CI 中未执行 | OPEN (accepted) | 无 |

### 值得特别关注的高风险 Bug

- **#8654 skill‑review fork panic (SIGSEGV)**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8654)，P1，in‑progress）  
  在工具重载的 turn 后切片越界导致进程崩溃，影响 DAU 且无 workaround，尚无固定 PR 关联。

- **#9492 auth refresh 死胡同**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9492)，P1，新开）  
  OpenAI OAuth refresh token 单次使用后被外部 CLI 旋转，ZeroClaw 存储过时的 token 导致刷新链断裂，直接影响用户使用 OpenAI provider。

- **#9284 config flush 覆盖写入**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9284)，P1，in‑progress）  
  读锁后 await save 期间并发写入丢失，会导致配置已保存版本被回滚。

---

## 6. 功能请求与路线图信号

以下功能请求在本周期内获得维护者或社区的积极讨论，且有相关联 PR 正在推进，很可能纳入 v0.8.5 或下一个里程碑：

- **运行时插件化（迁移编译时 feature 到 WASM 插件）**  
  RFC [#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850) 持续收到 +1；该移动作后可使二进制体积缩小，通道/工具即装即用。暂无直接 PR，但维护者已标记 accepted。

- **评估系统（Eval Framework）大批 PR**  
  贡献者 @IftekharUddin 提交了从 [#9214](https://github.com/zeroclaw-labs/zeroclaw/pull/9214) 到 [#9248](https://github.com/zeroclaw-labs/zeroclaw/pull/9248) 的系列 PR（live 执行、JUnit 报告、pass@k、LLM judge 等），路线图跟踪器 [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) 标记 v0.8.5 会包含 eval 首波，这些 PR 一旦合并将极大提升自动化评测能力。

- **统一附件架构与运行时会话所有权**  
  新 RFC [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) 和 [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) 提出让运行时成为会话唯一所有者，WebSocket/频道/ACP 等皆为“传输适配器”。这是架构级重构，社区反应积极。

- **Anthropic OAuth 别名合同**  
  RFC [#9464](https://github.com/zeroclaw-labs/zeroclaw/issues/9464) 配合 PR [#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420)（未在前 20 显示但被引用）定义了 `auth_mode = "oauth"` 的显式合约，便于维护者确认 OAuth 实现的安全边界。

- **执行树迭代预算所有权**  
  RFC [#9323](https://github.com/zeroclaw-labs/zeroclaw/issues/9323) 要求将 `ToolLoop.shared_budget` 由 `None` 变为真实限制，防止子 agent 无界限扇出。

- **ZeroCode 修饰符语义独立于键字符**  
  Feature [#9171](https://github.com/zeroclaw-labs/zeroclaw/issues/9171) 被 accepted，计划让 macOS Command/Control 修饰符行为可配置，不再与绑定键绑定。

---

## 7. 用户反馈摘要

从 Issue 摘要和评论中提炼出的真实用户痛点：

- **“我的 Solana 地址在 Telegram 上全是 `[REDACTED]`”**  
  [#9486](https://github.com/zeroclaw-labs/zeroclaw/issues/9486) 用户运行 Solana MCP 后 agent 无法输出钱包地址，高熵检测器误判为泄露，且 `high_entropy_tokens=false` 对频道路径无效，导致工作流完全卡死。

- **“回复预检拒绝后只看到一个 emoji，像坏了一样”**  
  [#9465](https://github.com/zeroclaw-labs/zeroclaw/issues/9465) Telegram 用户发送消息被 reply‑intent 预检拒绝，机器人只回复一个 emoji（反应）而没有任何文字说明，从用户视角 agent 完全不可用。

- **“语境耗尽后 agent 悄悄 idle，没有任何提示”**  
  [#8758](https://github.com/zeroclaw-labs/zeroclaw/issues/8758) 长阅读任务中 agent 因上下文压力停止进展，但未返回终端状态或用户可见的消息，用户以为网络故障。

- **“OAuth refresh 突然全部失效”**  
  [#9492](https://github.com/zeroclaw-labs/zeroclaw/issues/9492) 当用户同时使用 Codex CLI 与 ZeroClaw 时，Codex 旋转了 refresh token 而 ZeroClaw 无法感知，导致 `auth refresh` 永远死循环，必须手动删除 profile。

- **“Docker 部署者遇到 config flush 丢失”**  
  [#9284](https://github.com/zeroclaw-labs/zeroclaw/issues/9284) 多线程并发写配置文件，flush 时因 read lock + await 窗口导致部分更新被覆盖，用户的数据丢失难以检测。

- **“从 0.8.2 升级后所有 auth 命令都崩了”**  
  [#9474](https://github.com/zeroclaw-labs/zeroclaw/issues/9474)（已修复）旧 profile 中字段名 `provider` 未迁移到 `model_provider`，没有过渡期就直接 break，用户反馈“update immediately broken my workflow”。

---

## 8. 待处理积压

以下为长期未解决或等待关键动作的重要 Issue/PR，提醒维护者关注：

### 🔴 高风险（P1 / P2，长期未修复）
| ID | 标题 | 上次更新 | 备注 |
|----|------|-----------|------|
| [#8654](https://github.com/zeroclaw-labs/zeroclaw/issues/8654) | skill‑review fork panic → daemon SIGSEGV | 2026-07-28 | 自 7/3 起 pending，严重度 S2 + 风险 high，仍 in‑progress |
| [#7904](https://github.com/zeroclaw-labs/zeroclaw/issues/7904) | always‑inject SKILL.md frontmatter 在 compact 模式下失效 | 2026-07-28 | 6/17 报告，仅 1 条评论，维护者未分配 |
| [#9284](https://github.com/zeroclaw-labs/zeroclaw/issues/9284) | Config flush 覆盖并发写入 | 2026-07-28 | accepted 但未分配 fix，in‑progress |
| [#8758](https://github.com/zeroclaw-labs/zeroclaw/issues/8758) | 上下文耗尽后 agent idle 无终端状态 | 2026-07-28 | accepted，in‑progress，但无 PR 关联 |

### 🟡 等待维护者审阅（needs‑maintainer‑review）
| ID | 标题 | 标签 |
|----|------|------|
| [#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127) | RFC: `KeySource` trait | risk:high, type:rfc |
| [#9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397) | WhatsApp 空 allowed_groups permit‑none | risk:high, type:rfc |
| [#9464](https://github.com/zeroclaw-labs/zeroclaw/issues/9464) | Anthropic OAuth alias contract | risk:high, type:rfc |
| [#9323](https://github.com/zeroclaw-labs/zeroclaw/issues/9323) | Execution‑tree budget ownership | risk:high, type:rfc |

### 🟡 积压 PR（needs‑author‑action / 长时间未响应）
| ID | 标题 | 上次更新 | 作者 |
|----|------|-----------|------|
| [#8943](https://github.com/zeroclaw-labs/zeroclaw/pull/8943) | fix(providers): exclude Nova 2 from Bedrock prompt caching | 2026-07-28 | @ozpool |
| [#9424](https://github.com/zeroclaw-labs/zeroclaw/pull/9424) | fix(runtime): reject semantic‑empty terminal completions | 2026-07-28 | @vrurg |
| [#9368](https://github.com/zeroclaw-labs/zeroclaw/pull/9368) | fix(runtime): count/retain history in whole turns | 2026-07-28 | @Audacity88 |
| [#9449](https://github.com/zeroclaw-labs/zeroclaw/pull/9449) | fix(log): preserve JSONL rows during schema migration | 2026-07-28 | @Audacity88 |
| [#9248](https://github.com/zeroclaw-labs/zeroclaw/pull/9248) [#9225](https://github.com/zeroclaw-labs/zeroclaw/pull/9225) 等 | 评估系统系列 PR (IftekharUddin) | 2026-07-28 | @IftekharUddin |

### 🔵 跟踪器（长期决策/清理）
- [#8691](https://github.com/zeroclaw-labs/zeroclaw/issues/8691) ADR 基线恢复与 RFC 审计（自 7/4）
- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 维护者决策队列（自 7/4）
- [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) v0.8.5 每周非破坏性发布跟踪（活跃，协调中）

---

> 本日报基于 Zeroclaw GitHub 公共仓库数据自动整理，所有链接指向对应 Issue/PR 页面。报告不构成任何安全性或兼容性保证，仅供项目社区参考。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

好的，作为AI智能体与个人AI助手领域开源项目分析师，根据您提供的PicoClaw GitHub数据，现为您呈上 **2026年7月29日** 的项目动态日报。

---

## PicoClaw 开源项目日报 2026-07-29

### 1. 今日速览

PicoClaw 项目在过去24小时内呈现**高度活跃**状态，共有 14 个线程（4个 Issue + 10个 PR）获得更新。核心维护团队与社区贡献者配合密切：3个 Issue 与 3个 PR 被成功关闭/合并，7个 PR 处于开放待审状态。项目在**核心 AI 交互稳定性**（模型解析、缓存控制）与**多平台渠道适配**（钉钉、飞书）方面取得了实质性进展。一个致命的“对话死锁”Bug（#3300）在当天被疾速定位并关闭，体现了出色的危机响应能力。尽管尚无新版本发布，但从密集的代码活动来看，项目正处于功能迭代与积压清理并行的高频开发周期，整体健康度良好。

### 2. 版本发布

过去24小时内无新版本发布。

### 3. 项目进展

今日项目在核心 Agent 逻辑与渠道集成方面取得关键性推进，3个重要修复被合并，标志着细致的功能打磨阶段：

- **模型解析确定性提升** (#3254 [CLOSED]): 修复了 `lookupModelConfigByRef` 函数中模型名匹配的优先级逻辑，杜绝了因 Provider-Alias 模糊匹配覆盖精确模型字符串匹配的歧义Bug，从而提升了多模型配置环境的配置可靠性。
- **Anthropic 提示缓存功能纠正** (#3228 [CLOSED]): 修复了 `anthropic_messages` 提供商无法传递 `SystemParts` 中 `cache_control` 标记的问题。此前该提供商 Prompt Caching 效率为 0%，此修复将使大量依赖 Claude 的重度用户成本显著下降。
- **飞书多模态消息升级** (#3256 [CLOSED]): 语音（opus）和视频（mp4）文件不再以通用文件形式发送，而是正确映射为原生可播放的消息类型，这对于依赖飞书进行企业协作的团队来说是一次重要的体验升级。

### 4. 社区热点

今日社区讨论的热点折射出用户对**高级 Agent 工作流**与**基础平台稳定性**的双重焦虑：

- **#3300 「工具集缺失 `read_file` 导致对话死锁」**：该Issue虽只有0条公开评论，但其**当天创建、当天关闭**的特性极具代表性。用户试图通过 `AGENT.md` 强制 AI 读取外部 `RULES.md` 文件以实现复杂规则管理，却因工具集缺失导致每次对话陷入死锁。这暴露了当前 Agent 系统 Prompt 与内建工具集之间的协作鸿沟，是高级用户“翻车”的典型案例。
- **#3182 「Android 版本无法启动」**：链接：[https://github.com/sipeed/picoclaw/issues/3182](https://github.com/sipeed/picoclaw/issues/3182)
  依然是社区最尖锐的未解决痛点。用户@Monessem 贴图证实即使授予了完全权限，依然无法启动服务或修改路径。该 Issue 滞压一个月，成为影响项目移动端口碑的最大阻力。
- **#3280 「修复 OAuth 在真实环境下的存活率」**：链接：[https://github.com/sipeed/picoclaw/pull/3280](https://github.com/sipeed/picoclaw/pull/3280)
  虽然是一个 PR，但其描述详尽指出了导致远程/无头环境 OAuth 认证失败的 **4个** 独立原因（授权码被烧毁导致流程必须重来）。这引发了社区对项目在生产环境（Headless/Remote）运维可行性的深层技术讨论。

### 5. Bug 与稳定性

按严重程度排列如下：

- **🔴 严重（阻塞性/数据问题）**
  - **#3182: Android 启动失败与路径配置失效** ([链接](https://github.com/sipeed/picoclaw/issues/3182)): 状态 **OPEN**，影响所有 Android 用户，尚无分配 Fix。
  - **#3280 (PR): 远程环境 OAuth 认证永久失败** ([链接](https://github.com/sipeed/picoclaw/pull/3280)): 状态 **OPEN 待审核**，当前发行版存在此缺陷，阻碍自动化生产部署。
  - **#3300: `read_file` 工具缺失导致对话死锁** ([链接](https://github.com/sipeed/picoclaw/issues/3300)): 状态 **CLOSED**（已修复）。

- **🟡 警告（功能异常/体验受损）**
  - **#3279 (PR): Seahorse 摘要组件导致工具调用格式泄漏** ([链接](https://github.com/sipeed/picoclaw/pull/3279)): 状态 **OPEN 待合并**，可能污染对话历史。
  - **#3251 (PR): Anthropic 提示缓存 Token 用量被丢弃** ([链接](https://github.com/sipeed/picoclaw/pull/3251)): 状态 **OPEN 待合并**，影响运营成本可视化。

- **🟢 已修复**
  - #3255 (钉钉聊天列表预览错误), #3256 (飞书音视频格式错误), #3300 (工具缺失死锁)。

### 6. 功能请求与路线图信号

从今日活跃的 PR 来看，项目下一阶段的功能版图逐渐清晰：

- **大概率纳入下一版本**：
  - **Exa 原生 Web 搜索** ([PR #3299](https://github.com/sipeed/picoclaw/pull/3299))：新增 `tools.web` 提供商，允许 AI 通过 Exa 搜索引擎进行自动网络检索，有望显著增强 Agent 实时获取知识的能力。
  - **可配置默认模型回退链** ([PR #3200](https://github.com/sipeed/picoclaw/pull/3200))：允许用户在 Web UI 中设定主模型及多个备选模型，提升服务健壮性。该功能等待合并近一个月，推测涉及到前后端较复杂的逻辑。
- **路线图潜在信号**：
  - **安全基线升级** ([Issue #3088](https://github.com/sipeed/picoclaw/issues/3088))：社区高优请求以 `vodozemac` 替换 `libolm`。该 Issue 本日被关闭，但其理由（是已合并、Won't fix 还是推迟至 v2.0）必须查明并向社区公示，以避免产生信任分歧。
  - **开发者体验优化** ([PR #1951](https://github.com/sipeed/picoclaw/pull/1951))：将安装脚本合并至主仓库，便于用户快速上手。

### 7. 用户反馈摘要

- **主要痛点**：
  - **基础兼容性崩溃**：用户在没有任何错误提示的情况下被阻止在 Android 门外，这种入门级 Bug 对新用户转化伤害极大（#3182）。
  - **高级玩法存在断崖式缺失**：使用 AGENT.md 进行规则管理的高级用户发现，内建工具集并未覆盖系统级调用，导致逻辑死锁。这表明当前 Agent 的工具注册机制尚未完全对齐 Agent 的系统Prompt能力（#3300）。
  - **生产环境运维痛苦**：认证流程（OAuth/Authorization Code Flow）在非图形化环境下极其脆弱，授权码一旦丢失必须从头再来，这迫使运维人员不得不使用长期静态 Token 或关闭认证（#3280）。
- **满意点与肯定**：
  - **Bug 响应速度赢得信任**：尽管 #3300 描述了一个极其严重的死锁场景，但贡献者/维护者在发现当天即完成修复关闭，体现出流程高效。
  - **渠道细节受到重视**：用户反馈的钉钉预览和飞书媒体类型问题得到了快速解决，说明团队重视中国市场主打通讯工具（钉钉、飞书）的细节体验。

### 8. 待处理积压

维护团队可关注以下处于“悬而未决”状态的致命或重要议题：

- **🔴 严重积压**
  - **#3182: Android 版本无法启动** ([链接](https://github.com/sipeed/picoclaw/issues/3182), 2026-06-26 创建)：阻碍所有移动端用户，超过一个月无实质性进展，建议立即分配资源或标记为已知限制。
- **🟡 堵塞项目进度环节**
  - **#3200: 模型回退链大特性** ([链接](https://github.com/sipeed/picoclaw/pull/3200), 2026-07-01 创建)：PR 等待合并接近一个月，代码积压风险增加，建议加速 Code Review。
  - **#1951: 安装脚本迁移** ([链接](https://github.com/sipeed/picoclaw/pull/1951), 2026-03-24 创建)：拖延长达 4 个月的基础设施改进，严重影响新用户开箱体验。
- **❓ 需澄清决策**
  - **#3088: 替换 `libolm` 为 `vodozemac`** ([链接](https://github.com/sipeed/picoclaw/issues/3088), 2026-07-28 关闭)：标记为 `priority: high` 且刚刚关闭，请维护者提供关闭该议题的最终结论（如：已在某分支合并 / 推迟至明年计划 / 因兼容性否决），并回复到该 Issue 线程中，以安抚对此高度关注的安全敏感型社区用户。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-07-29

> 数据时段：2026-07-28 00:00 – 2026-07-28 23:59 UTC

---

## 今日速览

过去 24 小时项目依然维持高活跃度：共更新 **19 条 Issue**（新开/活跃 13，已关闭 6）和 **45 条 PR**（待合并 36，已合并/关闭 9）。社区贡献者积极参与，微软 Windows 安装器、agent.json 损坏、MCP 会话可恢复性等关键 Bug 被集中报告；功能侧则涌现出 NVIDIA NIM 支持、桌面 GUI 自动化、统一浏览器等重量级 PR。今日未发布新版本，但 9 个 PR 的成功合并（含视频传递修复、CloudPaw 任务补丁、插件兼容性临时放宽等）有效提升了稳定性和平台覆盖度。

---

## 版本发布

无新版本发布。

---

## 项目进展

过去 24 小时有 **9 个 PR 被合并/关闭**。从已知高关注 PR 及关联 Issue 的关闭情况看，以下推进最为关键：

- **视频数据成功送达模型** — [#6495](https://github.com/agentscope-ai/QwenPaw/pull/6495)（`fix(video)`）合并，解决了 `view_video` 工具虽返回成功但视频 DataBlock 在所有提供商（OpenAI、Anthropic 等）的请求管道中被静默丢弃的 Bug。此补丁直接关闭了 Issue [#6474](https://github.com/agentscope-ai/QwenPaw/issues/6474)。
- **CloudPaw `/mission` 命令恢复** — [#6535](https://github.com/agentscope-ai/QwenPaw/pull/6535)（`fix(cloudpaw)`）补全了上游新增参数 `verification_instructions` 与 `max_retries_per_story`，使 CloudPaw 用户不再因 TypeError 无法使用任务模式。
- **插件兼容性预发布回归** — [#6532](https://github.com/agentscope-ai/QwenPaw/pull/6532)（`fix(plugins)`）临时禁用版本上限检测，避免了 `2.1.0b1` 预发版因语义化版本比较使大部分插件被错误拦截。
- **持久化清理与开发体验** — [#6536](https://github.com/agentscope-ai/QwenPaw/pull/6536)（`fix(chats)`）在删除聊天时一并清理关联的持久数据；同时 [#6501](https://github.com/agentscope-ai/QwenPaw/issues/6501)（开发文档遗漏 test extra）与 [#6403](https://github.com/agentscope-ai/QwenPaw/issues/6403)（Coding Mode 增加 RobotFramework 语法高亮）两个功能/文档 Issue 均已关闭，代表相应工作已落地。

此外，今日有 **多份来自首次贡献者的 PR** 提交，包括 NVIDIA NIM 提供商支持（[#6526](https://github.com/agentscope-ai/QwenPaw/pull/6526)）、agent.json 损坏修复（[#6528](https://github.com/agentscope-ai/QwenPaw/pull/6528)）、ACP `models` 字段暴露（[#6531](https://github.com/agentscope-ai/QwenPaw/pull/6531)）等，显示出项目社区吸引力持续增强。

---

## 社区热点

### 1. 智能体隔离与隐私保护（最受关注功能请求）
**Issues [#6461](https://github.com/agentscope-ai/QwenPaw/issues/6461)（👍2）** 和 **[#6509](https://github.com/agentscope-ai/QwenPaw/issues/6509)** 获得最多正向反应与讨论。用户报告在部署多智能体场景时，一个 QQ 机器人能通过对话读取另一个智能体的记忆甚至修改配置，造成隐私泄露。社区强烈要求为 Sub Agent 增加“完全隔离”开关，并能按 UUID 隔离会话工作区。这类诉求可能成为下个版本重点关注的方向。

### 2. MCP 后端重启后客户端无法自动恢复
**Issue [#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524)** 累计 3 条评论，用户分析根因为 `mcp-session-id` 在服务端失效后被客户端持续复用，需手动执行 `list mcp` 才能重建连接。此问题直接影响生产环境中 MCP 的稳定性，尚待核心团队设计 session 心跳或自动重连机制。

### 3. Mission Mode 缺乏资源控制
**Issues [#6505](https://github.com/agentscope-ai/QwenPaw/issues/6505)** 和 **[#6506](https://github.com/agentscope-ai/QwenPaw/issues/6506)** 虽评论不多，但其揭示的问题（无限制 spawn 子会话导致 API 费用耗尽、父会话审批级别无法继承）在用户场景中影响严重。结合 [#6533](https://github.com/agentscope-ai/QwenPaw/issues/6533)（已有关联 PR）的修复，任务子系统仍需要系统的限流与隔离设计。

---

## Bug 与稳定性

按严重程度排列，带 **PR** 标记表示已有修复提交或已合并。

| 严重度 | Issue | 描述 | 状态 |
|--------|-------|------|------|
| 🔴 严重 | [#6520](https://github.com/agentscope-ai/QwenPaw/issues/6520) | `agent.json` 在 Windows 下出现 BOM、缺失引号、双重编码等系统性损坏，导致系统完全不可用。 | 已有修复 PR [#6528](https://github.com/agentscope-ai/QwenPaw/pull/6528)（open） |
| 🔴 严重 | [#6534](https://github.com/agentscope-ai/QwenPaw/issues/6534) | Windows NSIS 安装器将自身进程判定为 “QwenPaw is still running”，陷入无限循环，完全无法完成安装。 | 无 PR，严重阻塞 Windows 新用户。 |
| 🟠 高 | [#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524) | MCP 服务端重启后客户端仍用旧 session-id，需手动执行 `list mcp`。 | 无 PR，需 session 管理重构 |
| 🟠 高 | [#6505](https://github.com/agentscope-ai/QwenPaw/issues/6505) | Mission Mode 无迭代上限，可消耗完 LLM 账户余额。 | 无 PR |
| 🟠 高 | [#6506](https://github.com/agentscope-ai/QwenPaw/issues/6506) | 父会话设置的 `approval_level: OFF` 不被 `spawn_subagent` 继承。 | 无 PR |
| 🟡 中 | [#6537](https://github.com/agentscope-ai/QwenPaw/issues/6537) | Skill Tag 重启后消失，系 #3270 回归。 | 无 PR |
| 🟡 中 | [#6510](https://github.com/agentscope-ai/QwenPaw/issues/6510) | 使用飞书频道时中文路径被 URL 编码，文件无法找到。 | 无 PR |
| 🟡 中 | [#6533](https://github.com/agentscope-ai/QwenPaw/issues/6533) | `/mission` 命令报 `TypeError: unexpected keyword argument 'verification_instructions'`。 | 主线按 [#6535](https://github.com/agentscope-ai/QwenPaw/pull/6535) 修复（CloudPaw），标准版待跟进 |
| 🟢 低 | [#6512](https://github.com/agentscope-ai/QwenPaw/issues/6512) | `execute_shell_command` 在输出 >30KB 时被截断或触发 Internal error。 | 无 PR，社区建议自动写入文件或流式输出 |
| 🟢 低 | [#6324](https://github.com/agentscope-ai/QwenPaw/issues/6324) | MiniMax‑M3 模型响应被截断（open 已有 6 天）。 | 无 PR |

此外，今日关闭的 Bug 包括 [#6474](https://github.com/agentscope-ai/QwenPaw/issues/6474)（视频未传递，已合并修复）、[#6501](https://github.com/agentscope-ai/QwenPaw/issues/6501)（文档遗漏）和 [#6473](https://github.com/agentscope-ai/QwenPaw/issues/6473)（插件 Agent Kanban 安装失败），表明部分稳定性问题已经解决。

---

## 功能请求与路线图信号

### 高优先级（已有 PR / 社区强烈需求）
- **智能体完全隔离** — [#6461](https://github.com/agentscope-ai/QwenPaw/issues/6461)、[#6509](https://github.com/agentscope-ai/QwenPaw/issues/6509)：要求 Sub Agent 间数据、记忆、配置严格独立。**当前无 PR，但呼声极高**，很可能进入近期路线图。
- **桌面 GUI 自动化** — PR [#6424](https://github.com/agentscope-ai/QwenPaw/pull/6424)（`computer_use`，Windows + macOS，accessibility‑first + Tauri 控制）正在 Review，预计成为 2.1 亮点功能。
- **统一浏览器引擎** — PR [#6276](https://github.com/agentscope-ai/QwenPaw/pull/6276) 及配套 Chrome 扩展 [#6157](https://github.com/agentscope-ai/QwenPaw/pull/6157)：解决不同后端浏览器接口碎片化问题。
- **长上下文压缩** — PR [#6456](https://github.com/agentscope-ai/QwenPaw/pull/6456)（Visual Compact）：选择性压缩历史与工具结果，支持精确恢复，将增强 Agent 对长对话的处理能力。
- **模型发现基础设施** — PR [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)：使多数提供商无需手动输入模型 ID，提升配置体验。
- **NVIDIA NIM 原生支持** — PR [#6526](https://github.com/agentscope-ai/QwenPaw/pull/6526)（first-time-contributor）：复用 OpenAI 兼容端点，扩展模型生态。

### 其他信号
- Sheeell 大输出处理方案（[#6512](https://github.com/agentscope-ai/QwenPaw/issues/6512) 等）用户期望自动写入文件或流式读取，可能推动工具接口改进。
- Agent Kanban 插件安装失败 ([#6473](https://github.com/agentscope-ai/QwenPaw/issues/6473)) 已被关闭，但根本原因 `No module named 'qwenpaw.pawapp'` 未公开说明，建议维护者补充修复记录。
- RobotFramework 语法高亮 ([#6403](https://github.com/agentscope-ai/QwenPaw/issues/6403)) 已实现，Coding Mode 继续贴近开发者需求。

---

## 用户反馈摘要

从今日活跃的 Issue 评论中提取真实场景反馈：

- **多智能体隐私泄露**（[#6461](https://github.com/agentscope-ai/QwenPaw/issues/6461)）：“群聊成员通过 @QQ 机器人可以知道我单聊智能体中的记忆，甚至可以用对话进行操作，包括智能体记忆中的数据……这非常不合理”。用户希望独立选项“完全隔离”。
- **MCP 可靠性不足**（[#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524)）：“服务端 MCP session 失效后，QwenPaw 仍然复用旧的 `mcp-session-id`”。用户期望自动检测与重连。
- **Windows 安装直接失败**（[#6534](https://github.com/agentscope-ai/QwenPaw/issues/6534)）：“刚下载的安装包每次都提示 ‘QwenPaw Desktop is still running’，即使系统完全没有运行 QwenPaw”。此问题严重影响 Windows 用户入门。
- **中文路径被编码**（[#6510](https://github.com/agentscope-ai/QwenPaw/issues/6510)）：“实际路径是‘2026-06-17-灵魂互换那天’，程序却找‘2026-06-17-%E7%81%B5%E9%AD%82…’”。非英文用户的工作流受阻。
- **shell 输出截断**（[#6512](https://github.com/agentscope-ai/QwenPaw/issues/6512)）：“生成 500 行以上股票分析报告时总是被截断，甚至触发 Internal error，无法获取完整结果”。
- **视频支持“假阴性”**（[#6474](https://github.com/agentscope-ai/QwenPaw/issues/6474)）：“view_video 返回 success，模型也显示 supports_video: true，但模型根本收不到视频数据”。感谢已修复。

---

## 待处理积压

以下为需要维护者特别关注的长期未解决问题 (open ≥ 4 天或虽新但严重影响使用)：

| 类型 | 标识 | 内容 | 创建时间 | 标签 |
|------|------|------|----------|------|
| Issue | [#6324](https://github.com/agentscope-ai/QwenPaw/issues/6324) | MiniMax-M3 模型响应截断 | 2026-07-22 | bug |
| Issue | [#6505](https://github.com/agentscope-ai/QwenPaw/issues/6505) | Mission Mode 无迭代上限 | 2026-07-27 | bug, triage |
| Issue | [#6506](https://github.com/agentscope-ai/QwenPaw/issues/6506) | approval_level 不被子会话继承 | 2026-07-27 | bug |
| Issue | [#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524) | MCP session 失效后无法自动恢复 | 2026-07-28 | bug |
| Issue | [#6534](https://github.com/agentscope-ai/QwenPaw/issues/6534) | Windows 安装器无限循环 | 2026-07-28 | bug |
| Issue | [#6537](https://github.com/agentscope-ai/QwenPaw/issues/6537) | Skill tags 重启消失回归 | 2026-07-28 | bug |
| PR | [#6151](https://github.com/agentscope-ai/QwenPaw/pull/6151) | 后台工具调用卸载机制重构（双截止时间架构） | 2026-07-15 | 待审查 |
| PR | [#6157](https://github.com/agentscope-ai/QwenPaw/pull/6157) | Chrome 扩展配对与本地消息桥 | 2026-07-15 | 依赖 #6276 |
| PR | [#6269](https://github.com/agentscope-ai/QwenPaw/pull/6269) | 工作区检查点（Git 快照，对话恢复） | 2026-07-20 | 待审查 |
| PR | [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) | 安全模型发现基础设施 | 2026-07-21 | 待审查 |
| PR | [#6424](https://github.com/agentscope-ai/QwenPaw/pull/6424) | 桌面 GUI 自动化（Windows / macOS） | 2026-07-24 | 正在审查 |

---

**整体评估**：项目社区活跃度极高，贡献者参与踊跃，核心功能与配套基础设施同步推进。但若干严重 Bug（尤其是 Windows 安装器和 MCP 恢复）需优先解决以避免新用户流失。隔离与任务控制方面的设计缺口正从功能请求演变为社区痛点，建议在产品路线图中给予明确回应。

*报告自动生成于 2026-07-29T08:00:00Z*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

好的，以下是根据您提供的 `NousResearch/hermes-agent` 项目数据生成的 **2026-07-29 项目动态日报**。

---

# 【hermes-agent】2026-07-29 项目动态日报

## 1. 今日速览

- **活跃度极高**：过去24小时内，项目产生 500 条 Issue 更新和 500 条 PR 更新，社区提交、讨论与修复非常活跃，但大量的待合并 PR（351个）也显示维护者评审压力较大。
- **修复重心明确**：合并的 PR 高度集中在 **macOS 桌面端权限稳定性**（多人和多角度提交了关于 TCC 签名修复的方案），这表明核心维护者正在集中解决用户痛感最强的生态问题。
- **社区诉求清晰**：用户强烈关注 **订阅费整合**（Claude OAuth）、**团队协作功能**（Buzz 集成、Kanban 桌面化）及 **长时记忆改进**。
- **项目健康度**：社区贡献量极大，但 P2 级别 Bug 较多，且存在部分长期未决的关键功能（如权限分级、多账户 Telegram 网关），整体处于**高速迭代但存在一定积压风险**的状态。

## 2. 版本发布

今日无新版本发布。最新稳定版仍为 **v0.19.0** (2026-07-20)。从密集的修复合并节奏判断，预计近期将发布一个以 macOS 权限修复、桌面端性能优化和配置修复为主的维护版本。

## 3. 项目进展

以下为今日合并/进入最终评审阶段的重要 PR，反映出项目在稳定性、性能和功能深度上的推进：

- **【macOS 生态】TCC 权限体系全面修复（多项合并）**
  多位贡献者（`@OutThisLife`, `@cipry0200`, `@gvago`, `@caseyanthony`, `@natebransc`, `@lewis4x4` 等）提交并合入了包括 `#73681`, `#63857`, `#67357`, `#61763`, `#68853`, `#54529` 在内的一系列 PR。核心策略是通过稳定本地签名身份（稳定 cdhash）或保留已签发开发者证书，从根本上解决每次更新后辅助功能/录屏/文件访问权限被重置的顽疾。

- **【桌面端性能】事件驱动同步替代轮询 (PR #73673)**
  桌面端从**轮询模式**全面转向**事件驱动推模式**。此前闲置时每分钟发起约 89 次网络往返，现通过后端直接广播变更，极大降低了 Desktop 的资源占用与网络开销。

- **【安全增强】跨工作区 Codex Token 劫持修复 (PR #73677)**
  修复了 Token 恢复逻辑中的安全漏洞，避免用户从个人工作区切换到团队工作区时，因身份校验不严导致 Token 被误用，属于边界安全的重要修补。

- **【配置修复】OpenAI 兼容 TTS 配置生效 (PR #13888)**
  之前 `tts_tool.py` 硬编码环境变量和环境变量名，导致 `config.yaml` 中自定义的 `tts.openai.base_url` 和 `api_key` 失效。修复后，用户可以顺利接驳自建的 Kokoro、Speaches 等第三方 TTS 服务。

- **【前沿探索】计算提供方抽象层 PoC (PR #69086)**
  提出了一个结合 Modal 终端后端与计算机使用能力的能力驱动沙箱方案。这是 Hermes 从静态设备管理向云端 Serverless 沙箱演进的重要信号。

**链接**：`#73681` `#73673` `#73677` `#13888` `#69086`

## 4. 社区热点

- **TOP 1：Claude 订阅 OAuth 整合 (Issue #25267 | 👍 44)**
  **诉求**：用户已支付 20 美元 Claude 订阅费，不想再为通过 Hermes 调用 Claude 额外支付 API 费用。希望像 Codex 一样实现 OAuth 登录，复用现有订阅身份。这是社区经济模型反馈最强烈的 Issue。

- **TOP 2：下一代 Agent 协作空间 Buzz 集成 (Issue #68871 | 💬 17)**
  **诉求**：Block 开源了本地化的 AI 与人类协作工作空间 Buzz，社区认为这是理想的 Agent 交互终端，希望 Hermes 原生支持，让人机共享 Chat Room。

- **TOP 3：Gateway 权限分级模型 (Issue #527 | 💬 16)**
  **诉求**：当前二元的授权模型（全部允许或全部拒绝）完全无法满足团队/企业场景。用户呼吁引入 Owner/Admin/User/Guest 四级权限，区分命令集、工具集和终端访问能力。

- **TOP 4：Kanban 看板桌面化 (Issue #41222 | 👍 15)**
  **诉求**：Kanban 是多 Agent 工作流的核心，但只能在 CLI 操作。用户提出将看板集成进 Desktop App，以解决在 Chat UI 和终端间频繁切换的摩擦感。

**分析**：社区正在推动 Hermes 从“个人酷玩工具”向“企业级团队协作平台”演进，订阅模型优化和权限管理是破局关键。

**链接**：`#25267` `#68871` `#527` `#41222`

## 5. Bug 与稳定性

| 严重度 | Bug 描述 | Issue | 是否已有修复 PR |
| :--- | :--- | :--- | :--- |
| **P2 (严重)** | **非默认 Profile 下 Desktop SSH 远程模式崩溃**：Token 路径硬编码与环境变量冲突，导致远程桌面启动失败。 | `#69551` | 无 |
| **P2 (严重)** | **Cron 定时任务被强制注入 Kanban 协议**：非看板调度任务因缺少环境变量，调用 `kanban_show()` 失败。 | `#68592` | 无 |
| **P2 (严重)** | **Qwen / vLLM 多轮推理上下文丢失**：上一轮的推理内容在下一轮被剥离，导致 Agent 逻辑断裂。 | `#56004` | 无 |
| **P2 (严重)** | **Gemini 503 无 Fallback**：高负载时服务不可用且不触发配置的降级提供商，直接报错。 | `#25822` | 无 |
| **P2 (严重)** | **Python 3.14 兼容性崩溃**：`DaemonThreadPoolExecutor` 引用已移除的内部属性，阻塞所有并发特性。 | `#58596` | 无 |
| **P2 (高风险)** | **桌面端未传递 Profile 参数**：Websocket 连接缺失 `?profile=` 参数，多 Profile 环境存在回话路由异常风险。 | `#71527` | 无 |
| **P2 (回调)** | **Kimi 推理层级被静默舍弃**：`xhigh` / `max` 被 KIMI 提供商降级，用户无感知。 | `#73682` | ✅ **PR #73682 已提交** |
| **P2 (稳定性)** | **会话过期清理竞争条件**：异步清理可能错误驱逐新插入的活跃代理。 | `#73671` | ✅ **PR #73671 已提交** |

**总结**：今日虽未开启大量极端灾难性 Bug，但 P2 级别且影响面甚广的配置类（多 Profile）、兼容类（Python 3.14，Qwen）和逻辑类（Cron 注入）Bug 较多，多数尚未有成型修复，是下一个版本的焦点。

## 6. 功能请求与路线图信号

- **高概率纳入短期路线图：**
    - **Claude OAuth 订阅验证 ( #25267 )**：热度霸榜，若 Hermes 定位为 Claude 的前端，该功能直接决定了付费用户的留存。
    - **持久化会话记忆 + 话题感知压缩 ( #8457 + #62595 )**：两个 Issue 互相补充，用户对 Agent 长时记忆的渴求度极高。`@crayfish-ai` 提供的“话题感知上下文压缩”方案思路新颖，极有可能被采纳。
    - **多账户 Telegram 网关 ( PR #67455 )**：一个运行实例管理 N 个机器人的需求，等待核心维护者最后评审落地。

- **路线图早期信号：**
    - **计算提供方抽象层 ( PR #69086 )**：为 Modal 提供原生支持，暗示 Hermes 未来将淡化本地终端依赖，转向 Serverless 沙箱化。
    - **通用 OpenAI 兼容图片生成 ( #13798 )**：打破 FAL.ai 独占瓶颈，拥抱更广泛的开源/第三方生图生态。

**链接**：`#25267` `#8457` `#62595` `#67455` `#69086` `#13798`

## 7. 用户反馈摘要

- **最严重的频繁吐槽**：
  **“每次更新 macOS 权限全丢”**。多位用户（`@hum0r23`, `@OutThisLife`）在过去一个月反复提出该问题。今日系列 PR 合并是其直接回应，用户反馈指向“发布流程中缺少对签名流程的自动化测试”。
- **对经济模型的困惑**：
  **“为什么我付了 Claude 订阅费，还要通过 Hermes 付 API 费？”**（`#25267`）。用户花时间和精力搭建 Hermes，是为了享受更好的产品体验，而非接受更糟糕的计费方案。这是产品定位与商业逻辑的深层次矛盾。
- **配置相关的心智负担**：
  用户对“两个 `clarify_timeout` 配置键” (`#25859`) 和“配置项被硬编码忽略” (`#13888`, `#54589`) 感到挫败。YAML 配置目前存在一定的冗余和优先级混乱，降低了“开箱即用”的满意度。
- **积极反馈**：
  桌面端性能优化 (`#73673`) 和 Elaborate 的多账户 Telegram 方案 (`#67455`) 赢得了大量社区赞誉。贡献者 `@francip` 凭借高质量的多项修复 PR，成为社区明星贡献者。

## 8. 待处理积压

以下历史“顽疾”且高价值的 Issue/PR，建议维护者适当介入推动：

- **【P2 / 决策缓慢】Gateway RBAC (Issue #527)**：已讨论 4 个月，至今无明确技术决策。涉及组织级安全，建议给与最终决策意见或给予 P1 优先级推动。
- **【P2 / 无进展】WhatsApp 桥接 macOS 运行时检测 (Issue #2975)**：简单的 Node 路径查找优化，但因长期缺人认领而停滞。
- **【P2 / 等待复现】OpenRouter 延迟 2 分钟 (Issue #4291)**：严重阻塞部分用户，但维护者无法复现。建议发布打桩版本给用户采集日志，否则此 Bug 将一直悬而未决。
- **【P3 / 巨型 PR 评审积压】Multi-account Telegram 网关 (PR #67455)**：功能体量极大（超过 20 个文件变更），导致评审困难。建议模块 Owner 明确审查范围或要求作者提供分步式合并策略。
- **【P3 / 设计脆弱】Feishu 卡片消息内容无法获取 (Issue #33090)**：飞书生态的核心功能缺陷，影响大量中文社区用户，建议专人跟进。

---

**编辑点评**：hermes-agent 目前正处于从“个人智能体玩具”向“平台级团队协作工具”转型的关键时期。社区贡献异常踊跃，但 351 个待合并 PR 和长期悬而未决的 P2 级 Bug 是当前最核心的健康度风险。若能顺利消化 macOS 权限和 Subscription OAuth 这两个硬骨头，项目将进入一个全新的增长阶段。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

好的，这是为您生成的 AstrBot 项目动态日报。

---

# AstrBot 项目动态日报 | 2026-07-29

**数据时间范围：2026-07-28 ~ 2026-07-29**

### 1. 今日速览

今日项目活跃度极高，呈现高速迭代态势。**共计 29 个 PR 更新，其中 22 个已合入**，同时发布了具有里程碑意义的 **v4.26.8 版本，正式上线 AstrBot Cloud 插件市场**。Bug 修复方面成果显著，Discord 斜线命令失效、多知识库排序失真、Cron 任务漏加载等多个棘手问题均得到快速修复。尽管整体健康度良好，但 **未来任务重复刷屏（#9412）这一严重 Bug 仍处于 Open 状态**，是当前社区关注的核心风险点。

### 2. 版本发布：v4.26.8

- **版本号：** [v4.26.8](https://github.com/AstrBotDevs/AstrBot/releases/tag/v4.26.8)
- **发布时间：** 2026-07-28
- **核心主题：** Il faut cultiver notre jardin.（我们必须耕种自己的花园。）

- **主要更新内容：**
  - **【重磅】AstrBot Cloud 插件市场上线：** 官方推出全新插件管理平台 [AstrBot Cloud](https://cloud.astrbot.app)。开发者可以上传和管理插件，用户可直接通过 WebUI 浏览、发现和安装插件，标志着 AstrBot 生态正式进入平台化阶段。
  - **功能增强：** 集成了多项新功能 PR（如 ChatUI 文件浏览器、DashScope Embedding 支持等，详见下方项目进展）。
  - **大量 Bug 修复：** 包含近期针对 Cron 调度、供应商配置、知识库检索等稳定性的关键修复。

- **破坏性变更：** 本版本无破坏性变更。
- **迁移建议：** 用户常规升级即可体验全新插件市场及稳定性改进。

### 3. 项目进展

过去 24 小时合并了 **22 个 PR**，项目在功能生态、核心性能和跨平台兼容性上均迈出一大步。

- **平台生态与大型功能：**
  - **[ChatUI 工作区文件浏览器](https://github.com/AstrBotDevs/AstrBot/pull/9432)** (@Soulter): 这是代号 Size:XXL 的重磅功能。在 ChatUI 对话界面中集成了文件树面板，支持文件筛选、懒加载、文本预览及下载，极大地增强了 AstrBot 作为 AI 编程助手的实用性。
  - **[DashScope 阿里云百炼 Embedding 支持](https://github.com/AstrBotDevs/AstrBot/pull/9137)** (@leafliber): 新增阿里云百炼 Embedding 提供商适配器，支持文本和多模态模型，回应了社区对国产 Embedding 服务的强烈需求。
  - **[WebUI 仪表盘主题模式](https://github.com/AstrBotDevs/AstrBot/pull/8648)** (@lingyun14beta): 实现了浅色/深色/跟随系统三种主题切换。

- **核心稳定性与性能优化：**
  - **[对话列表性能重构](https://github.com/AstrBotDevs/AstrBot/pull/9226)** (@Sisyphbaous-DT-Project): 优化了数据库查询与前端加载逻辑，解决了列表缓慢及数据覆盖/回弹的竞态问题。
  - **[统一 LLM 工具权限控制](https://github.com/AstrBotDevs/AstrBot/pull/8617)** (@lingyun14beta): 统一了工具调用权限模型。
  - **[平台日志分类增强](https://github.com/AstrBotDevs/AstrBot/pull/9165)** (@M1LKT): WebUI 平台日志新增「排除用户对话」开关，方便开发者过滤干扰信息、专注排查插件和调度问题。
  - **[代理系统修复](https://github.com/AstrBotDevs/AstrBot/pull/8897)** (@NayukiChiba): 确保未配置代理时无视系统代理变量，避免本地 API 请求被意外拦截。
  - **[限制定时任务 LLM 重试](https://github.com/AstrBotDevs/AstrBot/pull/9247)** (@qiuC123): 严格限制定时任务在失败时的重试次数和等待时间，防止阻塞。

- **供应商与平台适配：**
  - **[Discord 斜线命令修复](https://github.com/AstrBotDevs/AstrBot/pull/9411)** (@wcqqq1214): 修复正则表达式双重转义导致命令无法注册的问题。
  - **[MiMo TTS 默认模型更新](https://github.com/AstrBotDevs/AstrBot/pull/9428)** (@wcqqq1214): 将默认模型从已停用的 `mimo-v2-tts` 更新为 `mimo-v2.5-tts`。
  - **[对话重试供应商选择修复](https://github.com/AstrBotDevs/AstrBot/pull/9402)** (@wcqqq1214): ChatUI 重试按钮现在会正确读取当前选择的供应商配置。
  - **[MiniMax 模型回退](https://github.com/AstrBotDevs/AstrBot/pull/9429)** (@octo-patch): 在 Token Plan 提供商中增加 MiniMax-M2.7 模型回退列表。

### 4. 社区热点

- **最高风险/活跃讨论：未来任务重复刷屏 ([#9412](https://github.com/AstrBotDevs/AstrBot/issues/9412))**
  - **动态：** 该 Issue 仍处于 **Open** 状态。虽然限流 PR (#9247) 已经合入，但问题根源是否完全解决尚待确认。用户反馈该问题导致群聊被刷 90 条、日志被覆盖，是所有 Bug 中对用户体验冲击最大的一个，社区正在密切关注后续验证结果。
- **最有价值用户贡献：知识库精确度修复 ([#9425](https://github.com/AstrBotDevs/AstrBot/issues/9425) / [#9426](https://github.com/AstrBotDevs/AstrBot/pull/9426))**
  - **动态：** 用户 @chinatsu1124 提交了长达数百字的高质量根因分析，精准定位了多知识库稀疏检索排序失真的原理。PR [#9426](https://github.com/AstrBotDevs/AstrBot/pull/9426) 在一天内即被合入修复，展现了高质量社区反馈与核心维护者的高效联动。
- **功能热点：ChatUI 文件浏览器 ([#9432](https://github.com/AstrBotDevs/AstrBot/pull/9432))**
  - **动态：** 项目作者 @Soulter 亲自动手，提交了超大 PR。这一功能将 AstrBot 的 ChatUI 从单纯的聊天界面推向“AI 工作台”形态，社区反响强烈。

### 5. Bug 与稳定性

| 严重程度 | Issue / PR | 描述 | 状态 |
| :--- | :--- | :--- | :--- |
| **严重** | [#9412](https://github.com/AstrBotDevs/AstrBot/issues/9412) | 未来任务重复请求 LLM 最高达 30 次，导致消息刷屏及日志丢失。 | **Open，待验证** |
| **严重** | [#9418](https://github.com/AstrBotDevs/AstrBot/issues/9418) | CronJobManager 启动顺序 Bug，导致持久化定时任务静默未加载。 | **已关闭** |
| **中等** | [#9425](https://github.com/AstrBotDevs/AstrBot/issues/9425) | 多知识库独立 FTS5 索引因 BM25 分数尺度不一，导致排序失真。 | **已修复** ([#9426](https://github.com/AstrBotDevs/AstrBot/pull/9426)) |
| **中等** | [#9400](https://github.com/AstrBotDevs/AstrBot/issues/9400) | ChatUI 首次使用配置不全的供应商报 `invalid key` 错误。 | **已修复** ([#9402](https://github.com/AstrBotDevs/AstrBot/pull/9402)) |
| **低** | [#9410](https://github.com/AstrBotDevs/AstrBot/issues/9410) | Discord 斜线命令无法注册。 | **已修复** ([#9411](https://github.com/AstrBotDevs/AstrBot/pull/9411)) |
| **低** | [#9427](https://github.com/AstrBotDevs/AstrBot/issues/9427) | MiMo TTS 默认模型 ID 未更新至 v2.5，导致配置校验失败。 | **已修复** ([#9428](https://github.com/AstrBotDevs/AstrBot/pull/9428)) |

### 6. 功能请求与路线图信号

- **已纳入路线图/已实现：**
  - **插件生态平台化（AstrBot Cloud）：** 随着 v4.26.8 发布，插件市场正式上线，这是项目从单体工具向平台转型的决定性信号。
  - **Embedding 供应商扩展（DashScope）：** 社区请求得到迅速响应，对国内用户极为友好，暗示项目重视中国市场的本地化服务接入。

- **潜在的下一版本方向：**
  - **桌面客户端分发体验：** Issue [#9431](https://github.com/AstrBotDevs/AstrBot/issues/9431) 强烈要求官网突出桌面客户端下载链接。这可能在下个 UI 优化周期中被优先处理。
  - **插件市场审核机制：** 建议 [#9420](https://github.com/AstrBotDevs/AstrBot/issues/9420) 提出需要机器审核插件，这是平台运营的必要环节，可能很快会被官方采纳。
  - **多模态输入支持：** PR [#9424](https://github.com/AstrBotDevs/AstrBot/pull/9424) 正在为 MiniMax 添加视频输入支持，表明多模态交互是项目的长期演进方向。

### 7. 用户反馈摘要

- **【高频痛点】体验摩擦：**
  - “我要跳转好多页面才下载到！”（[#9431](https://github.com/AstrBotDevs/AstrBot/issues/9431)）：桌面客户端下载链路过长，用户情绪明显，暴露了官网 UI 信息架构的问题。
  - “我的日志都被冲掉了”（[#9412](https://github.com/AstrBotDevs/AstrBot/issues/9412)）：定时任务的稳定性是当前最让用户缺乏安全感的功能点。

- **【积极反馈】社区专业度：**
  - 用户能够提供媲美核心开发者的根因分析（如#9425 的多知识库 BM25 问题），说明 AstrBot 的用户群体具备较高的技术深度，项目沉淀了优质的开发者社区。
  - 项目维护者对 Bug 的响应速度极快（如#9427 的 MiMo TTS 模型更新在 1 小时内完成修复），用户满意度高。

### 8. 待处理积压

- **长期未合并 PR：**
  - **[#8455](https://github.com/AstrBotDevs/AstrBot/pull/8455) 知识库文档列表加载不全** (by @M1LKT)：该 PR 意在修复知识库文档列表的已知问题，自 5 月 31 日提交以来已积压近 2 个月，急需维护者 Review 和合入。

- **高影响未决 Issue：**
  - **[#9412](https://github.com/AstrBotDevs/AstrBot/issues/9412) 未来任务重复刷屏**：尽管有限流 PR 合入，但 Issue 未关闭，根源尚未定论。建议维护者将彻底解决此问题作为下个 Patch 版本的最高优先级。

- **待审核新提交 PR：**
  - **[#9430](https://github.com/AstrBotDevs/AstrBot/pull/9430) 增强 Embedding 限流弹性**：对知识库服务的健壮性至关重要。
  - **[#9424](https://github.com/AstrBotDevs/AstrBot/pull/9424) MiniMax 视频输入支持**：多模态方向的重要拼图。

---

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*