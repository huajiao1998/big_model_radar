# OpenClaw 生态日报 2026-09-20

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-19 23:46 UTC

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
**日期：2026-09-20**  
**分析师：Agnes (Sapiens AI)**

## 1. 今日速览
OpenClaw 社区今日保持极高活跃度，过去24小时内共产生 1,000 条议题更新（500 Issues + 500 PRs）。v2026.9.5 版本正式发布，但随即引发了一系列关于更新可靠性、Codex 插件集成及内存管理的集中反馈。项目整体处于“发布后稳定化”阶段，维护团队正全力应对新版本带来的回归问题与用户体验摩擦。

## 2. 版本发布
**v2026.9.5** 已发布，包含 64 次直接提交，4,179 次 PR 合并，503 位贡献者参与。
- **下载渠道**：提供 AppImage 和 Debian 包 (amd64)。
- **Linux 配套**：同步发布 Linux companion v2026.9.5。
- **注意**：尽管 release notes 未详细列出破坏性变更，但今日多起 Issues (#152744, #152968, #152759) 显示该版本在 Codex 状态迁移、OAuth 配置读取及 npm 更新流程中存在严重回归，建议用户谨慎评估升级路径。

## 3. 项目进展
今日 PR 活动集中于修复 v2026.9.5 引入的稳定性问题及完善远程工作区功能：
- **#153263** (@steipete): 修复 macOS 屏幕录制权限请求缺失问题，简化权限状态展示。
- **#153260** (@roboclaw-bot): 修正 WebUI 中子代理详情错误打开在 "Review" 而非 "Tasks" 标签页的问题。
- **#153126 & #152652 & #152633** (@Kimiyu-186): 推进远程工作区功能，实现 Skill 文件发现、上传文件交付及回复附件路由。
- **#147026** (@zeroaltitude): 修复队列跟进重试无限循环问题，限制未分类重试的次数。
- **#153063** (@steipete): 修复冷启动期间 Doctor 诊断产生的误报 Gateway 超时。

## 4. 社区热点
以下是评论数最多、关注度最高的议题：

1.  **#149361 [Umbrella] WebUI performance and stability** (50 评论)
    *   *作者*: @vyctorbrzezowski
    *   *概述*: WebUI 性能和稳定性的总纲 Issue，涵盖桌面和移动端的多个子问题。
    *   *链接*: https://github.com/openclaw/openclaw/issues/149361

2.  **#97616 [Bug] OpenClaw 泄漏未回收的 hook/tool 子进程** (30 评论, 1 👍)
    *   *作者*: @avp717
    *   *概述*: P1 级 Bug，子进程累积导致僵尸进程和运行时降级，严重影响长期运行的 Gateway。
    *   *链接*: https://github.com/openclaw/openclaw/issues/97616

3.  **#144911 [Bug] MCP server init timeout 导致 Gateway 崩溃** (30 评论)
    *   *作者*: @itanyplus
    *   *概述*: P1 级崩溃 Bug，MCP 服务器初始化超时后触发未处理的 Promise 拒绝，导致 Gateway 进程终止。
    *   *链接*: https://github.com/openclaw/openclaw/issues/144911

4.  **#91588 Critical: Gateway Memory Leak** (27 评论, 1 👍)
    *   *作者*: @petercheng
    *   *概述*: 严重内存泄漏，RSS 从 350MB 增长至 15.5GB，导致 OOM 杀死进程。
    *   *链接*: https://github.com/openclaw/openclaw/issues/91588

5.  **#152744 [CLOSED] Codex retained-state migration 卡死** (18 评论)
    *   *作者*: @droidyouwerelookingfor
    *   *概述*: v2026.9.5 升级后 Codex 状态迁移无法完成，会话列表为空。
    *   *链接*: https://github.com/openclaw/openclaw/issues/152744

## 5. Bug 与稳定性
今日报告了大量 P0 和 P1 级 Bug，主要集中在**更新流程**和**新版本的回归**：

| 严重等级 | Issue ID | 描述 | 状态 | 关联 PR/Fix |
| :--- | :--- | :--- | :--- | :--- |
| **P0** | #152759 | `openclaw update` 9.4→9.5 失败，`doctor-failed`，自动回滚成功但升级静默失败 | OPEN | - |
| **P0** | #152981 | Gateway 启动挂起 ~17 分钟，侧车模型运行时超时 | OPEN | - |
| **P0** | #152689 | Codex 保留目录重试循环，填满 os.tmpdir() | OPEN | - |
| **P0** | #152968 | v2026.9.5 中 Codex app-server 找不到现有的 "openai:default" OAuth profile | CLOSED (可能已修复) | - |
| **P0** | #144712 | npm update 在 "global install swap" 步骤失败 | CLOSED | - |
| **P1** | #115908 | Session transcript projection 在高负载下 livelock，阻塞主线程 | OPEN | - |
| **P1** | #112423 | 大型 SQLite transcript 清理阻塞 Gateway 事件循环 | OPEN | - |
| **P2** | #152961 | WorkerThread 单核 CPU 占用过高且 RSS 持续增长 | OPEN | - |
| **P2** | #153067 | Gateway 稳态下每 5 秒重新复制整个状态 DB | OPEN | - |

**分析**：v2026.9.5 似乎引入了多个严重回归，特别是更新机制 (`openclaw update`) 和 Codex 插件的兼容性。`#152968` 已关闭，表明维护者可能已识别并正在处理 OAuth 配置读取问题。

## 6. 功能请求与路线图信号
- **远程工作区支持**：#153126, #152652, #152633 等多个 PR 正在推进远程工作区的能力，包括 Skill 发现、文件传输和附件路由。这表明项目正致力于增强分布式部署和云原生场景的支持。
- **WebUI 体验优化**：#153260 (子代理详情跳转)、#144324 (LaTeX 渲染)、#153241 (原生标题栏样式) 等 PR 显示团队正在持续打磨 WebUI 的用户体验。
- **macOS 权限集成**：#153263 修复了 macOS 屏幕录制权限请求问题，反映了对原生应用体验的重视。

## 7. 用户反馈摘要
- **更新恐惧症**：多位用户 (#152759, #144712, #146637) 报告 `openclaw update` 命令失败，即使自动回滚成功，也留下了不可操作的静默故障状态。用户对升级流程的信任度下降。
- **性能焦虑**：#91588 (内存泄漏至 15.5GB) 和 #153067 (频繁 DB 复制) 反映出用户对长期运行稳定性的深切担忧。
- **Codex 集成痛点**：#152744 和 #152689 显示 Codex 插件在 v2026.9.5 中存在严重的状态迁移和重试循环问题，影响了核心 AI 编码功能的可用性。
- **日志时区困惑**：#46748 (已关闭) 再次提及日志显示 UTC 时间而非本地时间，造成用户困扰。

## 8. 待处理积压
以下 Issue 长期未解决或需要维护者重点关注：

1.  **#91588 Critical: Gateway Memory Leak** (27 评论, P1)
    *   *风险*：生产环境长时间运行必然 OOM。
    *   *链接*: https://github.com/openclaw/openclaw/issues/91588

2.  **#97616 Zombie Process Accumulation** (30 评论, P1)
    *   *风险*：导致运行时性能渐进式下降。
    *   *链接*: https://github.com/openclaw/openclaw/issues/97616

3.  **#114612 SQLite unbounded growth (memory_index_chunks)** (15 评论, P1)
    *   *风险*：长期运行后磁盘空间耗尽。
    *   *链接*: https://github.com/openclaw/openclaw/issues/114612

4.  **#115908 Session transcript livelock** (18 评论, P1)
    *   *风险*：高负载下主线程阻塞，影响所有通道。
    *   *链接*: https://github.com/openclaw/openclaw/issues/115908

5.  **#152759 Update failure: doctor-failed** (11 评论, P0)
    *   *风险*：阻碍用户升级到 v2026.9.5。
    *   *链接*: https://github.com/openclaw/openclaw/issues/152759

**建议**：维护者应优先处理 v2026.9.5 相关的回归问题（特别是更新流程和 Codex 兼容性），并加强对内存泄漏和进程泄漏问题的排查。

---

## 横向生态对比

## 2026-09-20 AI 智能体开源生态横向对比分析报告

### 1. 生态全景
2026年9月下旬，个人AI助手与自主智能体开源生态呈现**“高活跃、重稳定、分分化”**的特征。以OpenClaw、hermes-agent、Zeroclaw为代表的头部项目正处于从功能堆叠向生产级稳定性过渡的关键期，内存泄漏、会话持久化和安全边界成为共同痛点。与此同时，生态内部出现明显分层：核心运行时（OpenClaw/Heracles）与垂直渠道网关（Zeroclaw/AstrBot）职责分离，而底层推理工具链（DeepSeek Harness）与边缘端适配（PicoClaw）则面临不同的成熟度挑战。

### 2. 各项目活跃度对比

| 项目 | 今日 Issues | 今日 PRs | 新发布 | 健康度评估 |
| :--- | :---: | :---: | :---: | :---: |
| **OpenClaw** | 1,000 | 1,000 | v2026.9.5 | ⚠️ **高风险**：新版本引发严重回归，更新机制与Codex兼容性问题集中爆发。 |
| **hermes-agent** | ~500 | ~500 | 无 | 🟢 **良好**：净关闭率高，专注基础设施修复，生产级稳定性加固中。 |
| **DeepSeek Harness** | - (讨论147条) | - | 无 | 🔴 **动荡**：Alpha阶段频繁更新导致用户信任下降，严重Bug阻塞使用。 |
| **Zeroclaw** | 33 | 50 (0合并) | 无 | 🟡 **一般**：代码积压严重，安全漏洞（S0）未修复，合并通道堵塞。 |
| **QwenPaw** | 10 | 7 | 无 | 🟢 **良好**：响应迅速，关键Bug已有Fix PR，专注于Console稳定性。 |
| **AstrBot** | 13 | 37 (18合并) | 无 | 🟢 **良好**：多平台适配器维护活跃，社区协作高效。 |
| **PicoClaw** | 1 | 0 | 无 | 🔴 **停滞**：核心问题为运维事故（证书过期），无代码开发进展。 |

### 3. OpenClaw 在生态中的定位
*   **定位**：全功能桌面端AI助手核心运行时，强调本地集成与多插件生态（如Codex）。
*   **优势**：社区规模与活跃度最高（日更2000条），拥有最完整的WebUI、远程工作区和多平台（macOS/Linux）原生体验。
*   **技术路线差异**：相比Zeroclaw/AstrBot侧重**消息渠道接入**，OpenClaw侧重**本地Agent内核与文件/系统交互**；相比DeepSeek Harness的**专用评测/工具链**，OpenClaw是通用的**生产力终端**。
*   **社区规模**：远超其他项目，但当前因v2026.9.5的稳定性问题，用户满意度处于低位。

### 4. 共同关注的技术方向

| 技术方向 | 具体诉求 | 涉及项目 |
| :--- | :--- | :--- |
| **长期运行稳定性** | 内存泄漏、僵尸进程、WAL数据库损坏是跨项目共性痛点。 | OpenClaw (#91588), hermes-agent (#100896), Zeroclaw (#97616) |
| **消息投递与状态一致性** | 分布式场景下的消息最终一致性、会话恢复、去重与幂等性。 | hermes-agent (Layer 1-4重构), OpenClaw (Codex状态迁移) |
| **安全与权限管控** | 无人值守Agent的安全审批、Git/Sandbox权限绕过风险、MCP工具安全声明。 | Zeroclaw (S0安全漏洞), hermes-agent (MCP Trust Gate), OpenClaw (OAuth/更新安全) |
| **多模态与渠道兼容性** | 音频/图片处理、WhatsApp/iMessage等原生渠道体验、流式输出兼容性。 | QwenPaw (DeepSeek音频兼容), Zeroclaw (WhatsApp预览), AstrBot (MiniMax STT) |
| **可观测性与治理** | 子Agent进度暴露、成本警告、插件化预调用钩子。 | Zeroclaw (#10531), QwenPaw (#7878), hermes-agent (Plugin SDK) |

### 5. 差异化定位分析

*   **OpenClaw**：**本地优先的全能型桌面Agent**。适合追求深度本地集成、复杂工作流自动化及多插件扩展的高级用户。技术重心在于Core Runtime的稳定性和Codex等编码插件的集成。
*   **hermes-agent**：**分布式消息中枢与Bot框架**。优势在于跨平台（iMessage/Telegram/Discord等）的消息路由和持久化能力，适合需要多端同步、Bot部署的企业或重度通讯用户。
*   **Zeroclaw**：**多渠道接入网关**。聚焦于WhatsApp、Telegram等社交协议的深度适配与安全沙箱，适合需要嵌入现有社交工作流的场景。
*   **AstrBot**：**多平台Bot聚合器**。强调对CQHTTP、LLOneBot等QQ/微信协议及Discord/Telegram的原生支持，插件生态丰富，适合国内社交平台的Bot开发者。
*   **QwenPaw**：**阿里系模型适配与控制台**。重点优化通义千问等模型的交互体验及Console前端稳定性，服务于Alibaba Cloud生态用户。
*   **DeepSeek Harness**：**DeepSeek模型专用测试/工具集**。聚焦于本地LLM的评测、沙箱权限管理和UI交互，面向开发者和技术极客。
*   **PicoClaw**：**边缘/嵌入式适配**（推测）。目前处于运维停滞状态，暂无明确功能定位信号。

### 6. 社区热度与成熟度

*   **快速迭代阶段**：**OpenClaw**（版本发布频繁但回归多）、**DeepSeek Harness**（Alpha期，问题密集爆发）。
*   **质量巩固阶段**：**hermes-agent**（高净关闭率，专注P0/P1修复）、**QwenPaw**（响应快，闭环好）、**AstrBot**（活跃且稳定）。
*   **瓶颈/停滞阶段**：**Zeroclaw**（PR积压，安全漏洞未修）、**PicoClaw**（无代码活动，基础设施故障）。

### 7. 值得关注的趋势信号

1.  **“更新恐惧症”与发布工程**：OpenClaw v2026.9.5和DeepSeek Harness alpha.2均因破坏性变更和严重回归导致用户信任危机。**趋势**：社区对CI/CD质量门禁、灰度发布和自动回滚机制的要求将显著提升。
2.  **内存/资源管理成为生产化瓶颈**：多个项目（OpenClaw, hermes-agent, Zeroclaw）均报告长期运行的内存泄漏或进程积累问题。**趋势**：未来版本竞争将聚焦于“24/7稳态运行”能力，而非单纯的功能新增。
3.  **安全边界细化**：从Zeroclaw的S0安全漏洞到hermes-agent的MCP Trust Gate，**趋势**显示智能体生态正从“功能可用”转向“安全可信”，特别是针对无人值守Agent和代码执行环境的权限管控将成为标配。
4.  **多渠道统一与标准化**：各项目中关于WebSocket路由、Session ID关联、流式传输兼容性的讨论频繁，**趋势**指向底层传输层协议的标准化需求，以降低多平台适配成本。
5.  **本地LLM支持的精细化**：DeepSeek Harness的超时配置需求和QwenPaw的模型兼容性修复，反映用户对本地/私有化部署的依赖加深，**趋势**是框架需提供更灵活的推理后端配置（超时、并发、格式兼容）。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-20

**数据来源：** github.com/zeroclaw-labs/zeroclaw
**分析时间：** 2026-09-20

---

## 1. 今日速览

Zeroclaw 今日保持高活跃度：过去24小时新增/更新 **33 条 Issues** 与 **50 条 PRs**，呈现典型的"开发冲刺"态势——大量 PR 待合并（50 条待合，0 条已合），说明贡献者正在密集提交代码但合并流程存在积压。安全与渠道层是今日焦点，多个 S0 级 Git 绕过漏洞（#10966, #10968）及 WhatsApp Web 通道缺陷集中爆发。无新版本发布。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日 **0 条 PR 被合并**，50 条 PR 处于待合并状态，合并通道明显堵塞。以下为重点 PR 梳理：

**关键修复 PR：**
- **#10982** (whatsapp-web): 为出站图片附加 `jpegThumbnail`，修复移动端空卡片问题 [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10982)
- **#10980** (whatsapp-web): 为 PDF 文档附加首页预览，提升移动端体验 [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10980)
- **#10964** (zerocode): 修复配置保存后字段列表刷新两次的 Bug [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10964)
- **#10928** (runtime): 修复 Windows 进程退出状态识别问题 [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10928)
- **#10956** (runtime): 新增平台默认 Shell 自动检测功能 [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10956)

**重大功能 PR：**
- **#10724**: Anthropic prompt-cache 可配置 TTL（#10663 的配套实现）[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10724)
- **#9724**: `always_ask` 策略在 Full autonomy 模式下的正确保留 [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9724)
- **#10938**: 工具附件显式声明替代文本扫描，提升多模态安全性 [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10938)
- **#10321 / #10525 / #10592**: ZeroRelay 浏览器 PKCE 认证与自注册链路持续推进 [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10321) | [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10525) | [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10592)

**进度评估：** 项目处于功能密集开发期，安全加固与 WhatsApp 通道改进是两大主线，但合并积压可能影响短期交付节奏。

---

## 4. 社区热点

**讨论最活跃 Issue（按评论数排序）：**

1. **#8046** — Telegram Webhook 模式支持请求（5 评论）
   用户希望增加 webhook 作为长轮询的替代方案，以适应更复杂的网络环境。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8046)

2. **#10531** — Delegate 子 Agent 进度暴露（4 评论）
   父 Agent 无法感知子 Agent 中间状态，仅能获取最终结果，影响可观测性。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10531)

3. **#10663** — Anthropic 缓存 TTL 可配置（3 评论）
   默认 5 分钟 TTL 过短，用户请求支持 1 小时缓存以提升成本效率。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10663)

**热点分析：** 社区对 **可观测性**（delegate 进度、缓存命中率）、**渠道灵活性**（Telegram webhook）及 **成本控制**（prompt cache）有持续需求。WhatsApp 通道问题近期集中爆发，反映该模块测试覆盖不足。

---

## 5. Bug 与稳定性

**S0 级（数据丢失/安全风险）：**

| Issue | 描述 | Fix PR |
|-------|------|--------|
| [#10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968) | 无人值守 Agent（cron/heartbeat）无 ApprovalManager，风险审批静默失效 | 尚无 |
| [#10966](https://github.com/zeroclaw-labs/zeroclaw/issues/10966) | `git --attr-source` 可隐藏变命令令绕过风险分类 | 尚无 |
| [#9627](https://github.com/zeroclaw-labs/zeroclaw/issues/9627) | Git 全局选项（`-C`/`--git-dir`）绕过风险分类器 | 已关闭（in-progress） |

**S1 级（工作流阻塞）：**

| Issue | 描述 | Fix PR |
|-------|------|--------|
| [#8627](https://github.com/zeroclaw-labs/zeroclaw/issues/8627) | WhatsApp Web 设备链接因新 passkey 机制失败 | 尚无 |

**S2 级（功能退化）：**

| Issue | 描述 | Fix PR |
|-------|------|--------|
| [#10981](https://github.com/zeroclaw-labs/zeroclaw/issues/10981) | 出站图片无 `jpegThumbnail`，移动端显示空卡片 | #10982 |
| [#10973](https://github.com/zeroclaw-labs/zeroclaw/issues/10973) | WhatsApp mentions 双向损坏 | 已关闭 |
| [#10972](https://github.com/zeroclaw-labs/zeroclaw/issues/10972) | 入站图片未下载，vision 功能不可用 | 已关闭 |
| [#10667](https://github.com/zeroclaw-labs/zeroclaw/issues/10667) | ZeroCode 重复渲染流式响应 | 已关闭（in-progress） |
| [#10951](https://github.com/zeroclaw-labs/zeroclaw/issues/10951) | ZeroCode 配置保存后字段列表刷新两次 | #10964 |
| [#10950](https://github.com/zeroclaw-labs/zeroclaw/issues/10950) | `cost.warn_at_percent` 警告被运行时忽略 | 尚无 |
| [#10948](https://github.com/zeroclaw-labs/zeroclaw/issues/10948) | `interruption_scope_key` 跨组件边界碰撞 | 尚无 |

**稳定性评估：** 安全相关 Bug 占比高（4/12 为 S0），且 2 个关键安全问题暂无 Fix PR，需优先处理。WhatsApp 通道问题集中爆发表明该模块需要系统性回归测试。

---

## 6. 功能请求与路线图信号

**高优先级功能请求：**

1. **#10977** — WhatsApp Web 群聊创建与邀请用户支持
   现有 `channel_room` 工具已暴露接口，但底层 Channel 未实现。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10977)

2. **#10983** — 原生 Poll 工具（WhatsApp Web 实现）
   当前 Poll 工具仅渲染文本，用户希望原生支持。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10983)

3. **#10970** — 主机级准入控制与 per-agent 资源限制
   多 Agent 部署场景下的并发与内存隔离需求。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10970)

4. **#10969** — Cron/Heartbeat 调度抖动窗口
   避免同表达式 Agent 同时触发导致的资源争抢。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10969)

5. **#10963** — Delegate 子 Agent 会话身份透传
   提升多 Agent 协作的可追踪性。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10963)

6. **#10891** — Channel 来源 provenance 贯穿运行时
   增强消息来源可信度与审计能力。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10891)

**路线图判断：**
- WhatsApp 通道增强（群聊、Poll、预览）将是近期重点，已有多个 PR 并行开发。
- 安全加固（host-scoped admission、shell 检测、权限模型）持续推进，与 RFC #10930/#10929 形成体系。
- Anthropic 缓存优化（#10724）即将合入，反映成本敏感型用户的诉求被采纳。

---

## 7. 用户反馈摘要

**痛点：**
- **WhatsApp 通道体验差**：图片/文件无预览、mentions 损坏、图片未下载，严重影响移动端使用。
- **安全机制存在绕过风险**：Git 命令通过全局选项或 `--attr-source` 可隐藏真实子命令，无人值守 Agent 缺乏审批管理器。
- **可观测性不足**：Delegate 子 Agent 无中间状态反馈、成本警告被忽略、tool result 未通过 gateway 流式返回。

**满意点：**
- **Provider 灵活性**：Anthropic 缓存 TTL 可配置即将落地，提升成本效率。
- **架构演进**：网关分离（v0.9.0）、运行时准入控制、principal 认证等长期 RFC 持续推进。
- **多平台 Shell 支持**：#10956 新增 Windows/macOS/Linux 默认 Shell 检测，降低配置负担。

**使用场景：**
- 企业级多 Agent 部署需要主机级资源隔离（#10970）。
- 自动化场景（cron/heartbeat）需要可靠的安全审批（#10968）。
- 移动端 WhatsApp 用户期望完整的媒体与交互体验。

---

## 8. 待处理积压

**长期未响应的重要 Issue：**

1. [#8627](https://github.com/zeroclaw-labs/zeroclaw/issues/8627) — WhatsApp Web 设备链接因 WhatsApp 新 passkey 机制失效（S1，自 2026-07-02 以来无 Fix PR）
2. [#10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968) — 无人值守 Agent 无 ApprovalManager（S0，自 2026-09-19 报告）
3. [#10966](https://github.com/zeroclaw-labs/zeroclaw/issues/10966) — Git `--attr-source` 绕过风险分类（S0，自 2026-09-19 报告）
4. [#10950](https://github.com/zeroclaw-labs/zeroclaw/issues/10950) — `cost.warn_at_percent` 警告被忽略（S2，自 2026-09-17）
5. [#10948](https://github.com/zeroclaw-labs/zeroclaw/issues/10948) — `interruption_scope_key` 跨组件碰撞（S2，自 2026-09-17）

**维护者建议：**
- 优先处理 2 个 S0 安全漏洞（#10968, #10966），建议快速热修或发布安全公告。
- WhatsApp 通道积压问题（#8627 及多个 closed 的 S2 Bug）需系统性回归测试与修复计划。
- 50 条待合并 PR 需加快 Review 节奏，避免贡献者流失。

---

**报告生成完毕。**

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-09-20**
**数据源：** [github.com/sipeed/picoclaw](https://github.com/sipeed/picoclaw)

---

### 1. 今日速览
PicoClaw 项目在 2026 年 9 月 20 日整体活跃度较低，无新代码提交（PR=0）或新版本发布。核心关注点集中在项目基础设施的紧急维护上：官方域名 `picoclaw.io` 的 TLS 证书已于 9 月 10 日过期，导致官网对所有现代浏览器不可访问。该问题被标记为 **CRITICAL** 级别，目前处于 Stale（ stale-bot 标记）状态，亟需维护者介入以恢复在线形象和服务访问。

### 2. 版本发布
**无新版本发布。**

### 3. 项目进展
**无新的 Pull Request 合并或关闭。**
今日无代码层面的功能推进或 Bug 修复提交，项目开发流水线在代码贡献维度处于停滞状态。

### 4. 社区热点
*   **[Issue #3377] TLS certificate for picoclaw.io expired on 2026-09-10 — site is down for every browser**
    *   **链接：** [https://github.com/sipeed/picoclaw/issues/3377](https://github.com/sipeed/picoclaw/issues/3377)
    *   **热度分析：** 这是今日唯一活跃的 Issue，已获得 1 个 👍 支持和 1 条评论。尽管被标记为 `Stale`，但其 `CRITICAL` 标签表明社区对该基础设施问题的重视。
    *   **诉求分析：** 用户 `@dimonb` 明确指出证书过期导致官网完全不可用，强调了时间敏感性。这反映了用户对项目专业形象和可访问性的担忧，以及希望维护者优先处理此类基础性运维问题的诉求。

### 5. Bug 与稳定性
*   **[Issue #3377] 官网 TLS 证书过期导致服务中断**
    *   **严重程度：** CRITICAL（影响所有用户访问官方首页）
    *   **状态：** OPEN / Stale
    *   **Fix PR：** 无相关修复 PR 提交。
    *   **说明：** 这是一个运维类“Bug”，而非代码逻辑错误。证书于 2026-09-10 23:59:59 UTC 到期，后续所有 HTTPS 连接均被浏览器拒绝。

### 6. 功能请求与路线图信号
**今日无新功能请求。**
当前的社区反馈完全聚焦于基础设施恢复，未涉及新功能特性或路线图调整的信号。

### 7. 用户反馈摘要
*   **痛点：** 官方站点因证书过期无法访问，直接影响用户信任度和资源获取（文档、下载等）。
*   **场景：** 用户在通过 GitHub 仓库链接访问 `picoclaw.io` 时遇到浏览器安全警告或连接拒绝。
*   **情绪：** 用户对问题被标记为 `Stale` 可能感到担忧，认为这是一个需要立即响应的紧急事件。

### 8. 待处理积压
*   **[Issue #3377] TLS certificate renewal**
    *   **积压原因：** 该 Issue 创建于 9 月 12 日，最近更新于 9 月 19 日，但目前已触发 Stale 机制。
    *   **建议：** 维护者需优先取消该 Issue 的 Stale 状态并启动证书续期流程，或指派专人处理。这是当前阻碍项目对外形象和服务可达性的最大障碍。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：** 2026-09-20
**数据源：** agentscope-ai/qwenpaw

## 1. 今日速览
QwenPaw 今日保持高活跃度，24小时内新增 10 个 Issues 和 7 个 PR，全部处于开放状态。开发重心集中在 Console 前端稳定性修复（DOM 渲染错误）及 Agent 层的媒体兼容性问题（音频/文件处理）。社区反馈显示用户对聊天记录长度、MCP 配置灵活性及特定供应商模型可用性存在显著痛点。暂无新版本发布，但多个关键 Bug 已出现对应修复 PR，显示响应迅速。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日 7 个 PR 均待合并，主要推进以下方向：
- **Console 稳定性**：[#7889](https://github.com/agentscope-ai/QwenPaw/pull/7889) 修复了因 DOM 突变导致的渲染卡死问题，直接回应 Issue #7888。
- **Agent 媒体处理增强**：[#7885](https://github.com/agentscope-ai/QwenPaw/pull/7885)、[#7886](https://github.com/agentscope-ai/QwenPaw/pull/7886)、[#7887](https://github.com/agentscope-ai/QwenPaw/pull/7887) 三管齐下，优化了对 `input_audio` 和 OpenAI 风格文件载荷的未知拒绝处理，提升会话恢复能力。
- **架构与插件系统**：[#7874](https://github.com/agentscope-ai/QwenPaw/pull/7874) 重新设计 PawApp SDK 和控制平面，增强应用安全性；[#7880](https://github.com/agentscope-ai/QwenPaw/pull/7880) 新增插件化预工具调用策略钩子，满足治理需求。

## 4. 社区热点
- **控制台导航崩溃** [#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815)：Lazy loaded 页面加载失败后 UI 无法恢复，需全量刷新。这是影响用户体验的核心痛点。
- **React 渲染错误** [#7888](https://github.com/agentscope-ai/QwenPaw/issues/7888) & **修复 PR [#7889](https://github.com/agentscope-ai/QwenPaw/pull/7889)**：用户反馈 Chat 页面卡在 "Something went wrong"，作者已同步提交修复 PR，显示良好的社区协作闭环。
- **插件治理钩子** [#7878](https://github.com/agentscope-ai/QwenPaw/issues/7878)：高级用户请求暴露 `pre-tool-call` 策略钩子以支持更细粒度的治理控制，对应 PR [#7880](https://github.com/agentscope-ai/QwenPaw/pull/7880) 正在推进。

## 5. Bug 与稳定性
| 严重程度 | 问题描述 | Issue | 修复状态 |
| :--- | :--- | :--- | :--- |
| **高** | 控制台导航死锁：Lazy 加载失败后 UI 无法恢复，仅能通过全量刷新解决 | [#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815) | 待修复 |
| **高** | Console 渲染错误导致页面永久卡死在报错界面 (NotFoundError) | [#7888](https://github.com/agentscope-ai/QwenPaw/issues/7888) | **已有 PR [#7889](https://github.com/agentscope-ai/QwenPaw/pull/7889)** |
| **中** | 会话级工作目录面板 UI 缺陷：可视区过小、最近项目为空、应用按钮禁用 | [#7877](https://github.com/agentscope-ai/QwenPaw/issues/7877) | 待修复 |
| **中** | DeepSeek 拒绝 OpenAI 格式 `input_audio` 导致会话永久中断 | [#7876](https://github.com/agentscope-ai/QwenPaw/issues/7876) | **已有 PR [#7886](https://github.com/agentscope-ai/QwenPaw/pull/7886) / [#7887](https://github.com/agentscope-ai/QwenPaw/pull/7887)** |
| **中** | OpenCode 供应商标记为“免费”的模型实际调用返回 403 | [#7882](https://github.com/agentscope-ai/QwenPaw/issues/7882) | 待修复 |
| **低** | MCP 配置不支持静态 Bearer Key，强制 OAuth 握手失败 | [#7879](https://github.com/agentscope-ai/QwenPaw/issues/7879) | 待修复 |
| **低** | kimi-code ACP runner 安全检查不一致 | [#7881](https://github.com/agentscope-ai/QwenPaw/issues/7881) | 待修复 |

## 6. 功能请求与路线图信号
- **历史记录长度** [#7884](https://github.com/agentscope-ai/QwenPaw/issues/7884)：用户抱怨聊天记录历史过短，体验差。这反映了当前上下文窗口管理策略可能需要调整，或需提供更明确的配置选项。
- **MCP 认证灵活性** [#7879](https://github.com/agentscope-ai/QwenPaw/issues/7879)：用户期望支持静态 Bearer Key 以接入如企查查等仅提供 API Key 的服务，而非强制 OAuth。这可能提示 MCP 管理层需要扩展认证类型支持。
- **PawApp 控制平面** [#7874](https://github.com/agentscope-ai/QwenPaw/pull/7874)：重新设计 SDK 和控制平面，表明项目正致力于提升应用生态的安全性和可管理性，这是面向企业级用户的重要路线图信号。

## 7. 用户反馈摘要
- **正面**：对 OpenCode 免费模型的发现感兴趣，尽管当前不可用；对插件化治理钩子的需求表明高级用户认可项目的扩展能力。
- **负面**：
    - **稳定性**：Console 页面的随机崩溃和卡死严重影响日常使用信任度。
    - **兼容性**：与 DeepSeek、OpenCode 等第三方服务的集成存在较多边界情况，导致会话中断或调用失败。
    - **易用性**：MCP 配置流程过于复杂，不支持常见的 API Key 认证方式；工作目录面板 UI 布局不合理。

## 8. 待处理积压
- **#7815** (2026-09-16 创建): 控制台 Lazy 加载失败后的恢复机制缺失，已开放 4 天，暂无 PR。
- **#7882** (2026-09-19 创建): OpenCode 免费模型 403 错误，影响用户体验，暂无 PR。
- **#7879** (2026-09-19 创建): MCP 静态 Bearer Key 支持缺失，阻碍部分企业用户接入，暂无 PR。
- **#7877** (2026-09-19 创建): 工作目录面板 UI 缺陷，暂无 PR。

**建议维护者关注：** 优先合并 #7889、#7885、#7886、#7887 以快速稳定核心体验，并尽快回应 #7815 和 #7879 的架构性改进需求。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：** 2026-09-20  
**数据周期：** 过去 24 小时  
**来源：** NousResearch/hermes-agent

---

## 1. 今日速览

hermes-agent 今日保持**极高活跃度**，24小时内 Issues 与 PR 更新量均达 500 条，净关闭率（Issues +47.8%, PRs +48.8%）表明团队正全力清理积压问题。当前无新版本发布，但技术焦点集中在**会话状态持久化（Session State）、消息投递可靠性及多平台网关稳定性**三大核心领域。代码库修复了大量可能导致数据丢失或状态不一致的边界条件，项目整体健康度良好，正从“功能扩展”向“生产级稳定性”深化。

---

## 2. 版本发布

*   **无新版本发布。**
*   当前最新稳定版本为 `v0.21.2` (2026.9.11)。

---

## 3. 项目进展

今日虽无合并记录展示，但多组高质量 PR 已准备就绪或处于关键审查阶段，主要推进以下方向：

*   **消息投递可靠性重构 (Layer 1-4)**: @yoyodine-industries 发起的系列 PR（#115003, #115009, #115010）构建了完整的 Bot Chat 投递保障层，解决了 Busy 目标丢包、Lease 超时消息静默丢失及重复发送问题，显著提升了分布式场景下的消息最终一致性。
*   **BlueBubbles 网关优化**: #116401 修复了 iMessage 重复处理及群组会话混乱问题，通过限制每个 iMessage 单一会话，消除了 webhook 重复触发导致的上下文污染。
*   **基础设施修复**: #116484 修复了 Kanban 模块因 BLOB 字段解码错误导致的崩溃；#106370 解决了 Telegram 流式消息重投后的 UI 残留气泡问题。
*   **配置与模型对齐**: #116485 修复了自定义 Provider 模型列表在部分选择器界面不显示的问题，确保配置单点置信度。

---

## 4. 社区热点

以下是评论区最活跃、关注度最高的 Issues：

1.  **[Bug] state.db  corruption x4 in 5 weeks** (#100896)
    *   **热度**: 16 条评论 | **严重性**: P1
    *   **摘要**: 多进程写入（Gateway + Dashboard）导致 SQLite WAL 模式下的数据库损坏频发。这是长期困扰生产环境的高危问题，关联多个类似 Issue。
    *   **链接**: https://github.com/NousResearch/hermes-agent/issues/100896

2.  **[Bug] A single plain CLI invocation orphans the live gateway's state.db WAL** (#109687) - *已关闭*
    *   **热度**: 14 条评论
    *   **摘要**: 复现于 v0.21.2，CLI 调用会导致 Gateway 静默丢弃会话写入。该问题已关闭， likely 已在后续修复中。
    *   **链接**: https://github.com/NousResearch/hermes-agent/issues/109687

3.  **[Bug] Muse Spark turns end mid-task on finish_reason=stop** (#103483) - *已关闭*
    *   **热度**: 21 条评论 | **点赞**: 11
    *   **摘要**: OpenRouter  Muse Spark 模型在流式输出时偶发截断，末尾出现无关随机词。高点赞反映用户对 LLM 输出质量稳定性的敏感。
    *   **链接**: https://github.com/NousResearch/hermes-agent/issues/103483

4.  **[Feature] Bot Group Chats should keep working after Desktop closes** (#97681)
    *   **热度**: 28 条评论 | **点赞**: 2
    *   **摘要**: 用户强烈期望 Bot 在 Group Chat 中脱离 Desktop 客户端独立运行，实现跨设备无缝衔接。这与今日提交的投递可靠性 PR 方向一致。
    *   **链接**: https://github.com/NousResearch/hermes-agent/issues/97681

5.  **[Bug] Projects paradigm broke the folder → session → sidebar flow** (#53004)
    *   **热度**: 16 条评论
    *   **摘要**: #49037 引入的“一级项目”功能破坏了原有的工作流，右侧边栏无法正确关联文件夹与会话。长期未解决，影响用户体验。
    *   **链接**: https://github.com/NousResearch/hermes-agent/issues/53004

---

## 5. Bug 与稳定性

| 严重等级 | 问题描述 | Issue/PR | 状态 |
| :--- | :--- | :--- | :--- |
| **P0/P1** | `state.db` 损坏及 WAL 孤儿问题（多进程写入冲突） | [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) | OPEN |
| **P2** | CLI 退出状态兼容性：Boolean handler 返回 1 而非 0 | [#62810](https://github.com/NousResearch/hermes-agent/issues/62810) | OPEN |
| **P2** | MCP Trust Gate: `readOnlyHint` 未被正确识别，导致只读工具被误判为写工具 | [#88858](https://github.com/NousResearch/hermes-agent/issues/88858) | OPEN |
| **P2** | Codex provider 在 Pro Full/Light 配额耗尽时中断 Hermes 工作流 | [#107307](https://github.com/NousResearch/hermes-agent/issues/107307) | CLOSED |
| **P2** | GPT-6 Astra 支持不完整，Reasoning 控制存在边界缺陷 | [#103015](https://github.com/NousResearch/hermes-agent/issues/103015) | CLOSED |
| **P2** | BlueBubbles webhook 重复注册导致 iMessage 被处理两次 | [#34372](https://github.com/NousResearch/hermes-agent/issues/34372) | OPEN |
| **P2** | Compressor 在单 Turn 过大时不执行摘要，直接破坏 Token 预算 | [#80449](https://github.com/NousResearch/hermes-agent/issues/80449) | CLOSED |

---

## 6. 功能请求与路线图信号

*   **Desktop Plugin SDK 扩展**: [#116305](https://github.com/NousResearch/hermes-agent/issues/116305) 提出了对 Composer、Settings Gateway、Session List 等组件的 Hook 需求，反映了社区对桌面端插件生态完善的强烈诉求。
*   **Cron 重试机制**: [#13566](https://github.com/NousResearch/hermes-agent/issues/13566) 请求为定时任务增加网络故障重试，当前失败仅记录日志而不重试，影响自动化任务的可靠性。
*   **项目级记忆隔离**: [#33638](https://github.com/NousResearch/hermes-agent/issues/33638) 建议 `MEMORY.md` 能根据 `cwd/project` 上下文过滤，避免全局记忆污染特定项目的工作空间。
*   **GPT-5.6/6 深度支持**: 多个 Issue (#103015, #61634) 显示用户正在积极测试最新 OpenAI 模型，期待 Hermes 在 Reasoning Control 和 Multi-agent 集成上的原生支持。

---

## 7. 用户反馈摘要

*   **痛点**:
    *   **状态一致性焦虑**: 多个 P1/P2 Issue 集中反映 `state.db` 在多进程/多写入器场景下的不稳定性，用户担心会话历史丢失。
    *   **工作流断裂**: “Projects”功能重构后，原有的文件夹-会话关联流程失效，用户感到挫败（#53004）。
    *   **本地模型适配**: 连接 vLLM 或自定义 OpenAI 兼容接口时，`max_tokens` 默认值错误（设为 context length）导致性能下降或报错（#49686）。
*   **满意点**:
    *   社区对 **Bot 跨设备/跨客户端连续性** 的功能有高度认可（#97681），认为这是提升 Agent 实用性的关键。
    *   快速响应并关闭了一些严重的已知 Bug（如 #109687, #103483），体现了维护效率。

---

## 8. 待处理积压

以下 Issue 长期开放且影响较大，建议维护者优先关注：

1.  **#100896** [P1] `state.db`  corruption in multi-writer WAL mode — **需架构级修复**。
2.  **#53004** [P2] Projects paradigm broke folder → session flow — **影响核心 UX**。
3.  **#34372** [P2] BlueBubbles double-processing via webhook — **需网关侧修复**。
4.  **#62810** [P2] CLI boolean handler exit status incompatibility — **破坏脚本集成**。
5.  **#88858** [P2] MCP readOnlyHint detection failure — **阻碍 MCP 工具安全使用**。
6.  **#13566** [P2] Cron delivery retry mechanism — **增强自动化可靠性**。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期**：2026-09-20  
**数据周期**：过去24小时  
**分析对象**：[AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## 1. 今日速览
AstrBot 项目今日保持高度活跃，24小时内处理了13条 Issues 和37条 PRs，其中8个 Issue 已关闭，18个 PR 已合并。社区贡献集中体现在流式输出兼容性、多平台适配器稳定性及知识库检索鲁棒性修复上。无新版本发布，但多个关键 Bug 的修复 PR 已进入合并候选队列，整体健康度良好。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日重点推进了以下核心功能的完善与稳定性修复：

*   **流式响应与工具调用修复**：PR [#7735](https://github.com/AstrBotDevs/AstrBot/pull/7735) 修复了 MiniMax 模型通过 NVIDIA 代理调用时工具调用名重复拼接的问题（如 `astr_kb_search` → `astr_kb_searchastr_kb_search`），这是流式处理中的累积 Bug。
*   **TTS 流式兼容修复**：PR [#9986](https://github.com/AstrBotDevs/AstrBot/pull/9986) 解决了开启流式输出后 TTS 语音回复完全不生效的问题（对应 Issue #10138），修复后 `trigger_probability` 可正常工作。
*   **会话逻辑统一与权限加固**：PR [#10004](https://github.com/AstrBotDevs/AstrBot/pull/10004) 统一了 `/new` 和 `/reset` 命令的行为语义；PR [#9739](https://github.com/AstrBotDevs/AstrBot/pull/9739) 为 `/new` 命令补充了权限检查，防止共享会话场景下的越权操作。
*   **适配器多连接支持**：PR [#10136](https://github.com/AstrBotDevs/AstrBot/pull/10136) 修复了 aiocqhttp 适配器在多反向 WebSocket 客户端（多账号）下 `send_by_session` 无法路由消息的问题，通过 session self_id 精确路由。
*   **内存与性能优化**：PR [#10117](https://github.com/AstrBotDevs/AstrBot/pull/10117) 减少了图像生命周期中的内存开销；PR [#10140](https://github.com/AstrBotDevs/AstrBot/pull/10140) 将日志控制台 sink 改为非阻塞，避免事件循环停滞。

## 4. 社区热点
今日讨论最活跃的 Issues 和 PRs 反映了用户对兼容性和功能完整性的关注：

*   **OpenCode API 兼容性**：Issue [#10054](https://github.com/AstrBotDevs/AstrBot/issues/10054) 指出 OpenCode Go 自9月5日起要求 `x-opencode-session` 请求头，导致请求失败。用户 @Rain-0x01-39 提交此 Feature 请求，关联 #8158 #8179 #10045，显示该问题影响范围较广。
*   **WebChat 主动消息刷新**：Issue [#10097](https://github.com/AstrBotDevs/AstrBot/issues/10097) 由 PR [#10142](https://github.com/AstrBotDevs/AstrBot/pull/10142) 修复，解决了 WebChat 空闲窗口无法实时显示主动推送消息的问题，提升了用户体验。
*   **插件市场更新限制**：Issue [#9700](https://github.com/AstrBotDevs/AstrBot/issues/9700) 讨论了插件仓库迁移到组织后，Cloud 插件市场拒绝更新的问题，涉及发布空间验证逻辑，对插件开发者影响较大。
*   **MiniMax STT 支持**：PR [#10144](https://github.com/AstrBotDevs/AstrBot/pull/10144) 添加了 MiniMax 语音转文本（STT）API 提供者，扩展了语音交互能力。

## 5. Bug 与稳定性
今日报告的 Bug 按严重程度排列：

1.  **[高] 知识库上传后文档数量为0**：Issue [#10109](https://github.com/AstrBotDevs/AstrBot/issues/10109) 描述上传成功但文档/分片数为0，原因为 FAISS 向量存储写入异常被掩盖。**已有修复 PR [#10139](https://github.com/AstrBotDevs/AstrBot/pull/10139)**，增强了错误处理和 NaN 钳制。
2.  **[高] Xinference Rerank 吞没异常**：Issue [#10000](https://github.com/AstrBotDevs/AstrBot/issues/10000) 指出 Xinference Rerank 在模型未初始化或失败时返回空列表，导致知识库检索结果丢失。**已关闭**，预期将在后续版本中由更健壮的错误传播机制解决。
3.  **[中] 流式输出禁用 TTS**：Issue [#10138](https://github.com/AstrBotDevs/AstrBot/issues/10138) 确认流式输出与 TTS 功能冲突。**已有修复 PR [#9986](https://github.com/AstrBotDevs/AstrBot/pull/9986)**。
4.  **[中] 对话管理页面显示为0**：Issue [#10126](https://github.com/AstrBotDevs/AstrBot/issues/10126) 因前端硬编码 `exclude_ids='astrbot'` 误排除平台 ID 为默认值 astrbot 的会话，导致页面空显示。**已关闭**，推测通过前端过滤逻辑调整解决。
5.  **[低] Web UI 日志界面可读性**：Issue [#10130](https://github.com/AstrBotDevs/AstrBot/issues/10130) 报告浅色模式全屏下右侧功能栏颜色对比度不足，影响可读性。**已关闭**，UI 优化事项。
6.  **[低] Gemini Streaming 历史保存**：Issue [#10105](https://github.com/AstrBotDevs/AstrBot/issues/10105) 报告工具调用前的叙述性流式内容未保存至历史记录。**已关闭**，代码审查发现的潜在问题。

## 6. 功能请求与路线图信号
*   **远程桌面控制**：Issue [#10137](https://github.com/AstrBotDevs/AstrBot/issues/10137) 请求在云端部署的 AstrBot 中支持远程操控本地电脑的功能。目前通过插件实现体验不佳，用户希望原生支持。此需求较为小众，可能作为插件增强或未来高级特性考虑。
*   **手动上下文压缩**：PR [#9795](https://github.com/AstrBotDevs/AstrBot/pull/9795) 添加了 `/compact` 命令和手动上下文压缩设置（实验性），响应了长对话场景下用户主动管理上下文长度的需求，预计将纳入下一版本的核心功能。
*   **多语言指令支持**：PR [#9984](https://github.com/AstrBotDevs/AstrBot/pull/9984) 扩展了 i18n 机制以覆盖运行时指令输出，支持 `/lang` 等指令的多语言适配，提升了国际化用户体验。
*   **Python 版本兼容性警告**：PR [#9965](https://github.com/AstrBotDevs/AstrBot/pull/9965) 在欢迎页新增 Python 版本警告（≥3.12），提前提示潜在环境风险，属于用户体验改进。

## 7. 用户反馈摘要
*   **痛点**：
    *   知识库检索异常隐蔽：Issue #10109 和 #10000 反映用户对于检索失败的错误信息不明确感到困扰，尤其是 FAISS 写入失败被吞没的情况，导致排查困难。
    *   流式输出副作用：Issue #10138 表明用户在启用流式输出后，TTS 功能意外失效，影响了多模态交互体验。
    *   多账号适配复杂性：Issue #10126 和 PR #10136 显示用户在使用 NapCat 等多连接场景时，遇到会话路由和显示问题，反映出多平台适配器管理的复杂性。
*   **满意点**：
    *   社区响应速度快：多数 Issue 在24小时内得到关注，且多个 Bug 已有对应的 Fix PR 处于待合并状态。
    *   功能扩展持续进行：MiniMax STT、手动压缩、多语言指令等新功能的引入，显示项目生态在不断丰富。

## 8. 待处理积压
*   **OpenCode API Header 要求**：Issue [#10054](https://github.com/AstrBotDevs/AstrBot/issues/10054) 虽已提出，但未看到直接对应的合并 PR，需关注是否已集成或需跟进。
*   **插件仓库迁移验证**：Issue [#9700](https://github.com/AstrBotDevs/AstrBot/issues/9700) 涉及 Cloud 插件市场的验证逻辑，可能需要在平台侧配合修改，长期未完全解决，建议维护者评估优先级。
*   **远程桌面功能**：Issue [#10137](https://github.com/AstrBotDevs/AstrBot/issues/10137) 作为新功能请求，暂无具体实施路径，可作为远期路线图参考。

---
**报告生成时间**：2026-09-20  
**分析师**：Agnes (Sapiens AI)

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：** 2026-09-20
**数据来源：** GitHub Discussions (过去24小时更新147条)

## 1. 今日速览
DeepSeek Harness (DSH) 社区今日活跃度极高，24小时内产生147条讨论更新，主要围绕 **0.1.6-alpha.2 (ddefc45fbc)** 版本的稳定性问题展开。核心痛点集中在 `prepare` 属性读取失败、会话损坏及工具调用链断裂等严重 Bug，导致大量用户反馈升级后无法使用。**暂无新版本发布**，社区处于“等待官方修复”的焦虑状态，技术讨论聚焦于本地LLM超时配置与UI性能优化等进阶需求。

## 2. 版本发布
*   **当前版本：** 0.1.6-alpha.2 (Commit: `ddefc45fbc`)
*   **状态：** 无新发布。
*   **备注：** 尽管无新 Release，但社区正在对 alpha.2 进行严格复核（见 Discussion #6520），发现部分旧问题已修复，但新增了 `prepare` 相关的严重回归问题。

## 3. 项目进展
由于仓库未启用标准 PR 流程，代码合并不直接可见，但通过 Discussion #6520 可知：
*   **已合入/验证：** 次级问题 #6129 已在 alpha.2 世代中修复。
*   **待验证：** 原计划修复的第2项问题转为“部分修复”，需进一步复测。
*   **已知遗留：** 约22项问题仅存在行号/路径漂移，核心逻辑未变；其余结论维持不变。
*   **整体评估：** 项目处于 alpha 测试阶段的动荡期，频繁更新（如从 rc.2 到 alpha.2）带来了新的稳定性挑战，修复速度滞后于用户反馈速度。

## 4. 社区热点
**今日最活跃讨论 TOP 3：**

1.  **#201: Sandbox 权限升级报错** (24评论)
    *   **链接：** https://github.com/deepseek-ai/deepseek-harness/discussions/201
    *   **摘要：** 用户反映 `workspace-write` 权限升级被拒绝，因当前模式为 `danger-full-access`，权限校验逻辑存在冲突。
    *   **诉求：** 修复权限提升的逻辑判断，允许在安全模式下正确升级 sandbox 权限。

2.  **#7035: Cannot read properties of undefined (reading 'prepare')** (20评论)
    *   **链接：** https://github.com/deepseek-ai/deepseek-harness/discussions/7035
    *   **摘要：** 本轮运行直接失败，报错指向 `prepare` 方法。此问题在今日多个新帖子中被重复引用（如 #6986, #7011），疑似为 **本次更新引入的严重回归 Bug**。
    *   **诉求：** 紧急修复工具调用前的 `prepare` 初始化逻辑。

3.  **#3157: 本地 LLM 超时配置需求** (18评论)
    *   **链接：** https://github.com/deepseek-ai/deepseek-harness/discussions/3157
    *   **摘要：** 用户希望为本地 Ollama Gemma 等模型设置更长的超时时间（如20分钟），但当前默认的300秒限制过长提示失败。
    *   **诉求：** 提供 `settings.yaml` 中配置 local LLM 超时的有效方法或默认值调整。

## 5. Bug 与稳定性
**今日报告的高优先级 Bug：**

| 严重程度 | 问题描述 | Discussion ID | 状态 |
| :--- | :--- | :--- | :--- |
| **P0 - 致命** | **升级后工具调用失败**：报错 `Cannot read properties of undefined (reading 'prepare')`，导致新会话和旧会话均无法使用，降级亦无效。 | #7035, #6986, #7011 | 无 Fix |
| **P0 - 致命** | **会话损坏与永久失败**：Fork 后新消息重放旧 Prompt，且新 Prompt 永久滞留；调度器故障导致 session 返回 400 INVALID_REQUEST。 | #6314, #4549 | 无 Fix |
| **P1 - 严重** | **权限模式冲突**：sandbox 升级提示权限不严格 wider than current mode。 | #201 | 无 Fix |
| **P1 - 严重** | **Web UI 403 Forbidden**：POST 请求被拒，Origin/Host 端口不匹配导致信任围栏拦截。 | #2009 | 无 Fix |
| **P2 - 中等** | **UI 性能卡顿**：空闲态主线程占用 50%，布局触发频率高，resize 卡顿。 | #6427 | 无 Fix |
| **P2 - 中等** | **语言设置不一致**：中文思考模式下仍输出英文。 | #7127 | 无 Fix |

## 6. 功能请求与路线图信号
*   **Long-context Timeout 支持** (#3157)：用户强烈需求支持自定义本地 LLM 超时，反映出对长上下文/本地推理场景的支持不足。
*   **Auxiliary Call Reasoning 尊重 `purpose`** (#7109)：建议辅助模型调用（如 compaction, session title）在无明确 `reasoningEffort` 时，应继承或尊重 `purpose` 字段，优化 token 消耗与响应质量。
*   **Goal 模式行为优化** (#4664)：用户反馈开启 goal 后 agent 无法被动等待，强制注入 goal 上下文导致空转，希望增加“等待后台任务”的静默状态支持。

## 7. 用户反馈摘要
*   **痛点：**
    *   **更新即破碎**：用户 @yinquanyy (#6971) 抱怨“更新不能太积极”，上次还能降级回退，本次升级后连降级都失效，社区信任度下降。
    *   **错误信息晦涩**：`Cannot read properties of undefined (reading 'prepare')` 这类 JS 原生错误直接暴露给用户，缺乏友好的错误提示和排查指引。
    *   **会话状态不可靠**：Fork 后的消息重放和队列滞留问题严重影响复杂工作流的使用。
*   **满意点：**
    *   部分用户仍在使用 Ollama 等本地模型进行探索，对本地化支持有持续需求。
    *   社区自助复核能力较强（如 @PerryLink 的 #6520），能够协助定位版本间差异。

## 8. 待处理积压
*   **#201 (24天+):** Sandbox 权限升级逻辑缺陷，长期未决。
*   **#4549 (25天+):** 调度器失败导致会话永久损坏的严重 Bug，无修复进展。
*   **#2009 (35天+):** Web UI API 403 问题，影响非标准端口部署场景。
*   **#6427 (8天+):** UI 性能问题，影响 Windows 高端硬件用户的体验。
*   **#6314 (9天+):** Fork 会话消息重放与队列堵塞问题，严重干扰多会话并行工作流。

**建议：** 维护团队需优先关注 `prepare` 相关的回归 Bug 及会话完整性问题，恢复用户对 alpha 版本的信心。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*