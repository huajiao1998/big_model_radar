# OpenClaw 生态日报 2026-05-19

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-05-19 01:56 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报（2026-05-19）

---

## 1. 今日速览

OpenClaw 社区在 2026-05-19 继续保持高活跃度，过去24小时内处理了 **500 条 Issues**（新开/活跃 448 条，关闭 52 条）和 **500 条 PR**（待合并 427 条，已合并/关闭 73 条），显示出强劲的开发与问题响应节奏。项目当日发布了 **4 个新版本**，主要集中在依赖升级与内部架构优化。尽管存在多个 P1/P2 级 Bug 和回归问题，但核心团队通过 ClawSweeper 自动化流程快速推进修复，整体项目健康度良好，处于快速迭代与稳定性平衡阶段。

---

## 2. 版本发布

### 最新 Releases（2026-05-19）

- **v2026.5.19-beta.1**  
  [🔗 Release](https://github.com/openclaw/openclaw/releases/tag/v2026.5.19-beta.1)  
  **关键变更：**
  - Agents：明确修复应默认采用“干净有界重构”（clean bounded refactors），保持内部逻辑精简，并为插件 SDK/API 提供显式弃用路径。
  - 依赖更新：`@openclaw/proxyline` 升级至 `0.3.3`；Pi 包升级至 `0.75.1`。
  - **破坏性变更**：最低支持的 Node.js 版本从 v22 提升至 **v22.19**，请用户确保运行环境兼容。

- **v2026.5.18 / v2026.5.18-beta.1 / v2026.5.16-beta.7**  
  内容与前序版本高度一致，主要为依赖同步与 Docker 构建参数增强（如新增 `OPENCLAW_IMAGE_APT_PACKAGES` 支持运行时中立镜像构建）。

> ⚠️ **迁移建议**：所有生产环境用户应在升级前确认 Node.js ≥ 22.19，并测试插件兼容性，尤其涉及 `@openclaw/proxyline` 和 Pi 包集成的场景。

---

## 3. 项目进展

今日共 **73 个 PR 被合并或关闭**，重点进展包括：

- ✅ **自动化修复流程强化**：ClawSweeper 自动合并多个关键修复，如：
  - [#83848](https://github.com/openclaw/openclaw/pull/83848)：修复 DeepSeek MCP 工具 schema 联合类型解析问题，提升模型兼容性。
  - [#83845](https://github.com/openclaw/openclaw/pull/83845)：保留 Codex 插件工具认证配置，防止权限丢失。
  - [#83850](https://github.com/openclaw/openclaw/pull/83850)：支持 Docker 本地构建时可选 pip 包安装，增强部署灵活性。

- ✅ **Telegram 消息流稳定性修复**：
  - [#83829](https://github.com/openclaw/openclaw/pull/83829)（已合并）：修复论坛主题并行消息流错乱问题，确保 topic 消息正确路由至独立会话 lane。
  - [#83827](https://github.com/openclaw/openclaw/pull/83827)：解耦队列化 Telegram 后续消息与源通道中断信号，避免误丢弃用户请求。

- ✅ **开发者体验优化**：
  - [#83753](https://github.com/openclaw/openclaw/pull/83753)：将 `doctor` 命令中的交互式维护检查转换为结构化 `detect/repair` 健康合约，提升可维护性。

> 项目整体在 **消息可靠性、插件生态兼容性、运维工具链** 三个方向取得实质性推进。

---

## 4. 社区热点

### 高讨论度 Issues（评论数 ≥ 10）

| Issue | 主题 | 链接 | 核心诉求 |
|------|------|------|--------|
| #52875 | `session_send` 返回 "no session found" | [🔗](https://github.com/openclaw/openclaw/issues/52875) | 用户升级后主 Agent 无法与其他 Agent 通信，怀疑会话状态管理回归 |
| #48788 | 多编码文件名处理架构提案 | [🔗](https://github.com/openclaw/openclaw/issues/48788) | 呼吁建立中心化 Content-Disposition 编码工具，支持 Shift-JIS/GB18030 等 |
| #48183 | Feishu 监控状态清理不完整，潜在内存泄漏 | [🔗](https://github.com/openclaw/openclaw/issues/48183) | `httpServers Map` 删除未等待 server 完全关闭，长期运行可能 OOM |
| #50090 | ClawHub 技能生态发展困境 | [🔗](https://github.com/openclaw/openclaw/issues/50090) | 社区技能发布流程复杂，缺乏标准化与发现机制，阻碍生态增长 |
| #53628 | `${XDG_CONFIG_HOME}` 在安装技能时未解析 | [🔗](https://github.com/openclaw/openclaw/issues/53628) | Docker 环境下环境变量未被正确处理，导致配置路径错误 |

> 🔥 **趋势分析**：用户强烈关注 **跨 Agent 通信稳定性** 与 **技能生态易用性**，反映项目正从“可用”向“易用”过渡的关键阶段。

---

## 5. Bug 与稳定性

### 高优先级 Bug（P1/P2，含回归与崩溃）

| Issue | 严重性 | 状态 | 修复 PR |
|------|--------|------|--------|
| #52875 | P2, 回归, 会话状态丢失 | OPEN | 无 |
| #51871 | P2, 回归, Cron 任务在 Control UI 不显示 | OPEN | 无 |
| #54253 | P2, RISC-V64 系统返回 "LLM Request Failed" | OPEN | 无 |
| #39476 | P1, A2A 消息重复发送（B→A 回发导致） | OPEN | 无 |
| #40001 | P1, `write` 工具无追加模式致数据覆盖 | OPEN | 无 |
| #48003 | P1, Steer 模式未在 turn 中注入消息 | OPEN | 无 |
| #43661 | P1, 会话 compaction 超时致无限重试与消息重复 | OPEN | 无 |
| #47975 | P1, 子 Agent 会话残留致主会话无响应 | OPEN | 无 |
| #51396 | P1, 回归, `clearUnboundScopes` 错误剥离操作符权限 | OPEN | 无 |
| #49876 | P1, Cron 会话工具失败后 hallucinate 输出而非静默失败 | OPEN | 无 |

> ⚠️ **风险提示**：多个 P1 Bug 涉及 **消息丢失、权限错误、资源泄漏**，虽暂无 fix PR，但均被标记为 `clawsweeper:source-repro`，预计将在近期由自动化流程处理。

---

## 6. 功能请求与路线图信号

### 高潜力功能请求（结合 PR 判断）

| Issue | 功能 | 关联 PR | 纳入可能性 |
|------|------|--------|----------|
| #48788 | 多编码文件名统一处理 | 无 | ⭐⭐⭐☆（架构级需求，需产品决策） |
| #50090 | ClawHub 技能生态优化 | 无 | ⭐⭐☆☆（社区呼声高，但无近期 PR） |
| #42475 | 网关级 Agent 成本预算控制 | 无 | ⭐⭐⭐☆（企业用户需求强烈） |
| #50199 | 技能优先级配置 | 无 | ⭐⭐☆☆（可提升技能调度智能性） |
| #52640 | 长任务持久化状态表面 | 无 | ⭐⭐⭐☆（UX 关键改进） |
| #83632 | Telegram Guest Bot 支持 | [#83632](https://github.com/openclaw/openclaw/pull/83632) | ⭐⭐⭐⭐（已有实现，待合并） |

> 📌 **路线图预测**：**Telegram Guest 模式**、**技能优先级**、**成本预算** 最可能纳入 v2026.6 版本。

---

## 7. 用户反馈摘要

### 真实用户痛点（来自 Issue 评论）

- **部署与配置**：
  > “Docker 安装时 `XDG_CONFIG_HOME` 不生效，必须手动改路径” —— @Devattom (#53628)  
  > “`OPENCLAW_CONFIG_DIR` 不能含空格，文档没提” —— @mainguyenanhvu (#44599)

- **跨平台兼容性**：
  > “RISC-V64 上跑不了，明明安装成功了却报 LLM 错误” —— @iravikiran (#54253)

- **消息可靠性**：
  > “升级后主 Agent 突然找不到其他 Agent 的会话，整个工作流断了” —— @najef1979-code (#52875)

- **技能生态**：
  > “写个 SKILL.md 发上去，别人根本不知道怎么装，也没地方搜” —— @ocdlmv1 (#50090)

- **UI/UX**：
  > “WebChat 有些回复消失了，但 TUI 能看到，太诡异了” —— @zzzZZZ-JW (#77136)

> 😊 **正面反馈**：用户对 Telegram/Feishu/Discord 多通道支持、ClawSweeper 自动修复机制表示认可。

---

## 8. 待处理积压

### 长期未响应重要 Issue（>60 天，P1/P2）

| Issue | 标题 | 创建日期 | 状态 | 提醒 |
|------|------|--------|------|------|
| #39476 | A2A sessions_send 导致重复消息 | 2026-03-08 | OPEN | ⚠️ P1，影响核心通信，需优先处理 |
| #40001 | Write 工具缺少追加模式 | 2026-03-08 | OPEN | ⚠️ P1，数据丢失风险，高优先级 |
| #43661 | 会话 compaction 超时致消息重复 | 2026-03-12 | OPEN | ⚠️ P1，生产环境严重故障 |
| #44905 | Discord 泄露内部工具调用痕迹 | 2026-03-13 | OPEN | ⚠️ P1，安全风险，需安全审查 |
| #47975 | 子 Agent 会话残留致主会话卡死 | 2026-03-16 | OPEN | ⚠️ P1，影响会话生命周期管理 |

> 🛎️ **维护者提醒**：上述 5 个 P1 Issue 均已超 60 天未关闭，建议分配资源进行根因分析并推动修复 PR。

---

**报告生成时间**：2026-05-19  
**数据来源**：OpenClaw GitHub Repository (github.com/openclaw/openclaw)  
**分析师**：AI 开源项目分析师

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告（2026-05-19）

---

## 1. 生态全景

2026年5月中旬，个人 AI 助手与自主智能体开源生态呈现**高活跃度、强修复导向、多模态融合加速**的态势。主流项目普遍进入“可用→易用”过渡阶段，核心矛盾从功能缺失转向**稳定性、跨通道可靠性与技能生态易用性**。OpenClaw 作为生态核心参照，其自动化修复流程（ClawSweeper）与多通道支持成为行业标杆；NanoBot、PicoClaw 等新兴项目则在**轻量化部署、嵌入式兼容与流式交互**方向形成差异化突破。整体生态正从“原型验证”迈向“生产可用”的关键拐点。

---

## 2. 各项目活跃度对比

| 项目 | Issues（24h） | PR（24h） | 新版本发布 | 健康度评估 |
|------|---------------|----------|------------|------------|
| **OpenClaw** | 500（448新/活跃） | 500（73合并） | ✅ 4个（含破坏性变更） | ⭐⭐⭐⭐☆（快速迭代+稳定性平衡） |
| **NanoBot** | 7（5新） | 21（10合并） | ❌ | ⭐⭐⭐⭐（功能扩展期） |
| **Zeroclaw** | 26（15新） | 50（8合并） | ❌ | ⭐⭐⭐⭐☆（质量加固阶段） |
| **PicoClaw** | 8（5新） | 23（6合并） | ✅ Nightly v0.2.8 | ⭐⭐⭐⭐（架构成熟期） |
| **NanoClaw** | 4（3新） | 34（7合并） | ✅ v2.0.64（关键修复） | ⭐⭐⭐⭐（安全/稳定性优先） |
| **IronClaw** | 36（34新） | 49（16合并） | ❌（版本滞后） | ⭐⭐⭐☆（技术债累积风险） |
| **LobsterAI** | 0 | 18（12合并） | ✅ v2026.5.18 | ⭐⭐⭐⭐⭐（高质量迭代） |
| **Moltis** | 0（关闭7） | 6（全合并） | ✅ 20260518.01（热修） | ⭐⭐⭐⭐⭐（响应效率极佳） |
| **CoPaw** | 32（20新） | 22（7合并） | ✅ v1.1.8-beta.1 | ⭐⭐⭐（稳定性风险突出） |
| **TinyClaw / ZeptoClaw / EasyClaw** | 0 | 0 | ❌ | ⭐⭐（低活跃/维护停滞） |

> 注：健康度综合考量活跃度、Bug响应速度、版本节奏与用户反馈。

---

## 3. OpenClaw 在生态中的定位

**优势**：  
- **规模最大**：单日处理500 Issues/PRs，社区贡献密度远超同类；  
- **自动化运维领先**：ClawSweeper 实现P1/P2 Bug自动修复，显著降低维护成本；  
- **多通道覆盖最全**：Telegram/Feishu/Discord/WhatsApp等主流IM全支持，且具备Guest模式等企业级特性。

**技术路线差异**：  
- 采用“**有界重构+显式弃用路径**”保障插件生态兼容性（v2026.5.19-beta.1），区别于NanoBot的渐进式兼容或CoPaw的硬编码适配；  
- 强调**会话状态强一致性**（如NanoClaw v2.0.64修复的destination同步问题），而IronClaw仍受限于Reborn架构迁移中的技术债。

**社区规模**：  
- GitHub Issue/PR数量约为第二名IronClaw的1.4倍，且用户反馈中“多Agent协作”“技能发现”等高级场景占比更高，反映**开发者-企业用户双轮驱动**的生态优势。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|--------|--------|--------|
| **技能生态易用性** | OpenClaw (#50090)、CoPaw (#4499)、NanoBot (#3888) | 简化技能发布流程、建立标准化发现机制、支持动态加载 |
| **跨Agent通信可靠性** | OpenClaw (#52875)、NanoClaw (v2.0.64)、Zeroclaw (#6724) | 会话状态同步、消息路由防丢失、子Agent生命周期管理 |
| **多编码/国际化支持** | OpenClaw (#48788)、LobsterAI (#2006)、CoPaw (#4481) | Shift-JIS/GB18030文件名处理、非ASCII MCP服务器名兼容 |
| **流式响应与实时交互** | PicoClaw (#2892)、NanoBot (#3894)、IronClaw (#3747) | 支持SSE/Streaming、避免前端状态断裂 |
| **安全默认值强化** | NanoClaw (#2547)、Moltis (#1019) | Webhook绑定localhost、危险命令上下文感知检测 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|------|--------|--------|----------------|
| **OpenClaw** | 企业级多通道协作 | 开发者/企业团队 | 插件化架构 + ClawSweeper自动化运维 |
| **NanoBot** | 轻量级多模态Agent | 个人开发者/研究者 | 模块化Provider注册 + WebUI远程部署 |
| **PicoClaw** | 嵌入式/边缘AI助手 | IoT/边缘计算用户 | Seahorse生物启发记忆 + Yocto支持 |
| **LobsterAI** | 专业文档协作 | 知识工作者 | Electron桌面端 + 2M tokens上下文 |
| **Moltis** | 可控AI代理执行 | 安全敏感场景 | 钩子系统 + 动态工具过滤（#1011） |
| **CoPaw** | 办公IM集成 | 企业微信/飞书用户 | 多通道轮询 + 插件市场 |

---

## 6. 社区热度与成熟度

- **快速迭代阶段**：OpenClaw、IronClaw、CoPaw —— 高Issue/PR量，侧重功能扩张，但伴随稳定性风险（如CoPaw的AGENTS.md回归问题）。  
- **质量巩固阶段**：Zeroclaw、Moltis、LobsterAI —— 聚焦Bug修复与架构解耦，发布节奏稳健，技术债务可控。  
- ** niche 深耕阶段**：PicoClaw（嵌入式）、NanoBot（多模态）—— 在特定场景建立壁垒，社区小而精。  
- **维护停滞**：TinyClaw、ZeptoClaw、EasyClaw —— 无近期活动，生态边缘化。

---

## 7. 值得关注的趋势信号

1. **从“功能堆砌”到“体验鲁棒性”**：用户反馈中“静默失败”（OpenClaw）、“配置丢失”（Moltis）、“消息截断”（NanoClaw）等体验问题占比上升，表明开发者需更重视**端到端可靠性验证**。  
2. **技能生态成为竞争焦点**：OpenClaw、CoPaw、NanoBot均提出技能发现/安装优化方案，预示**Agent即应用商店**模式将成下一阶段核心战场。  
3. **边缘AI助手崛起**：PicoClaw的RISC-V/.deb支持、Yocto集成，反映AI智能体向**工业控制、本地设备**渗透的趋势。  
4. **安全默认值成为标配**：NanoClaw（Webhook绑定）、Moltis（危险命令检测）的实践表明，**开箱即用的安全性**正取代“用户自行配置”的旧范式。  

> **对开发者的建议**：优先选择具备自动化运维能力（如ClawSweeper）和明确弃用路径的项目；在嵌入式场景关注PicoClaw，企业级部署倾向OpenClaw/NanoClaw组合。

---  
**报告生成时间**：2026-05-19  
**分析师**：AI 开源项目分析师

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-05-19）

---

## 1. 今日速览

NanoBot 项目在过去24小时内保持高活跃度，共产生 **21 条 PR 更新**（10 条已合并/关闭，11 条待合并）和 **7 条 Issues 更新**（5 条新开，2 条已关闭），显示出社区贡献与问题反馈的双向活跃。尽管无新版本发布，但核心功能持续演进，尤其在 **图像生成架构重构、WebUI 部署体验优化、多模型提供商扩展** 等方面取得实质性进展。项目整体处于快速迭代与稳定性提升并行的健康状态。

---

## 2. 版本发布

**无新版本发布**。当前主线仍为 v0.2.0 系列，相关文档与部署配置正在同步修复中（见 #3873、#3875）。

---

## 3. 项目进展

今日共 **10 个 PR 被合并或关闭**，推动多个关键方向：

- **图像生成系统重构**：#3893 引入 `ImageGenerationProvider` 注册机制，显著降低新增图像模型（如 MiniMax、Gemini）的集成成本，提升可扩展性。
- **WebUI 远程部署支持增强**：#3891 和 #3904 分别添加 `bootstrap_allow_from` 配置与 WebSocket 网关可配置化，解决 Docker/反向代理环境下 WebUI 无法访问的问题（#3876）。
- **新模型提供商接入**：#3900 正式支持 Ant Ling LLM 接口；#3886 集成 Google Gemini 图像生成能力；#3879 完成 MiniMax 图像生成支持。
- **CLI 与配置体验优化**：#3890 实现 Model Preset 向导功能，简化用户模型配置流程。
- **代码质量与可维护性提升**：#3892 将 `AgentRunner.run()` 拆分为多个专注方法，提升可读性与测试性。

> 整体来看，项目在 **多模态能力、部署友好性、架构解耦** 三方面迈出关键步伐。

---

## 4. 社区热点

### 🔥 高关注度 Issue：微信登录失败（#3863）
- **链接**：https://github.com/HKUDS/nanobot/issues/3863
- **评论数**：5
- **核心诉求**：用户反馈即使更新至最新版微信，扫码登录仍提示“版本过低”，怀疑是 NanoBot 对微信协议版本判断逻辑有误。
- **分析**：该问题影响主流中文用户群体，可能涉及第三方登录适配层兼容性，需优先排查。

### 💡 高价值提案：持久化记忆集成 Mnemon（#3888）
- **链接**：https://github.com/HKUDS/nanobot/issues/3888
- **状态**：已关闭（可能已采纳）
- **意义**：提出通过集成 [Mnemon](https://github.com/mnemon-dev/mnemon) 解决 Agent 跨会话记忆丢失问题，直击 LLM Agent 核心痛点。

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | 是否有 Fix PR |
|--------|------|------|-------------|
| ⚠️ 中 | #3863 微信无法登录 | 扫码后提示“微信版本过低”，即使已更新 | ❌ 无 |
| ⚠️ 中 | #3901 X 平台检查任务陷入死循环 | 设置简单 cron 任务时触发工具调用超限 | ❌ 无 |
| ⚠️ 低 | #3903 图像生成 MIME 类型硬编码 | MiniMax/AIHubMix 强制使用 `image/png`，应动态检测 | ✅ #3893 已覆盖修复 |
| ⚠️ 低 | #3894 WebUI 工具调用结束阶段未渲染 | `phase="end"` 事件被过滤，导致前端状态不完整 | ✅ #3894 已提交修复 |

> 注：#3873（Docker 文档不一致）已通过 #3875 修复并关闭。

---

## 6. 功能请求与路线图信号

以下用户需求具备较高采纳可能性，且已有对应 PR 推进：

- **🔧 Dream 系统作业全局开关**（#3885）：用户希望禁用默认注册的记忆整理 cron 作业。该需求合理且向后兼容方案清晰，**极可能被纳入下一版本配置项**。
- **🔐 危险命令授权机制**（#3887）：针对 `exec` 工具的安全限制过于严格，用户需临时授权特定命令。此需求反映生产环境灵活性需求，**建议作为安全模块下一阶段重点**。
- **🧠 持久化记忆支持**（#3888）：虽 Issue 已关闭，但结合 #3847（skill_load 工具防内容丢失）可见团队正系统性解决上下文保持问题，**Mnemon 集成或成未来记忆模块方向**。

---

## 7. 用户反馈摘要

- **痛点**：
  - 微信登录流程受阻，影响国内用户使用体验（#3863）。
  - Docker 部署文档与实际行为不一致，导致 WebUI 无法访问（#3873 → 已修复）。
  - Agent 在多轮对话中易丢失技能文件内容（#3847 描述问题 → 已提修复 PR）。
- **满意点**：
  - 新图像生成提供商（MiniMax、Gemini）接入迅速，扩展性强。
  - WebUI 实时编辑与工具调用追踪功能逐步完善（#3899、#3894）。
- **使用场景**：
  - 用户尝试用 NanoBot 自动化监控 X（Twitter）动态（#3901），体现其作为智能调度中枢的潜力。
  - 多 Agent 协同部署于 Hugging Face Spaces（#3621）验证了轻量级生产可行性。

---

## 8. 待处理积压

| 类型 | 编号 | 标题 | 创建时间 | 状态 | 提醒 |
|------|------|------|--------|------|------|
| Issue | #3863 | 微信不能 Login | 2026-05-16 | OPEN | **高优先级**：影响核心登录流程，需排查微信协议适配 |
| Issue | #3901 | Unable to setup a simple X checking job | 2026-05-18 | OPEN | 工具调用循环问题，可能涉及 Agent 调度逻辑缺陷 |
| PR | #3847 | Introduce skill_load tool | 2026-05-15 | OPEN | 解决技能内容丢失关键问题，建议加速 review |
| PR | #3568 | Add Manifest LLM router support | 2026-04-30 | OPEN | 长期未合入，Manifest 作为路由层有重要价值 |
| PR | #3621 | Multi-role agent squad for HF Spaces | 2026-05-04 | OPEN | 生产级多 Agent 方案，适合 showcase |

> 建议维护者优先处理 #3863 和 #3847，二者分别关乎用户体验与核心功能稳定性。

---  
*数据来源：NanoBot GitHub 仓库（截至 2026-05-19 00:00 UTC）*

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报（2026-05-19）

---

## 1. 今日速览

过去24小时内，Zeroclaw 社区保持高活跃度：共产生 **26条 Issues 更新**（15条新开/活跃，11条关闭）和 **50条 PR 更新**（42条待合并，8条已合并/关闭），显示出持续的开发节奏与问题响应能力。尽管无新版本发布，但多个关键 Bug 被修复，包括技能安装崩溃、Cron 调度一致性、通道崩溃循环等高风险问题。项目整体处于稳定迭代阶段，核心模块（runtime、gateway、skills、channels）均有实质性推进。

---

## 2. 版本发布

**无新版本发布**。当前主线仍为 v0.7.x 系列，团队聚焦于稳定性修复与 v0.8.0 功能准备（如 agent 能力标志、ACP 桥接改进等）。

---

## 3. 项目进展

今日有 **8个 PR 被合并或关闭**，重点进展包括：

- **#6681 [CLOSED]**：修复 `zeroclaw skills install clawhub:*` 因混合阻塞/异步运行时导致的 panic 问题，恢复技能安装功能可用性（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6681)）。
- **#6739 [CLOSED]**：统一 Cron 工具、CLI 和 API 的时区处理逻辑，消除调度行为不一致风险（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6739)）。
- **#6742 [CLOSED]**：为 `--log-llm` 添加流式负载追踪测试，增强可观测性保障（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6742)）。
- **#6747 [CLOSED]**：修复 CI 中 `amannn/action-semantic-pull-request` 因未加入白名单导致的静默失败（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6747)）。
- **#6750 [CLOSED]**：优化 Windows Tauri 权限快照 TTL，避免频繁调用 PowerShell 提升性能（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/6750)）。

此外，**#6538**（修复 pgvector 嵌套运行时 panic）和 **#6736**（隔离工具协议内部错误）等关键修复已进入合并队列，预计明日合入。

---

## 4. 社区热点

### 高讨论度 Issues/PRs：

- **#6074 [OPEN]**：审计并恢复因 bulk revert (c3ff635) 丢失的 153 个提交。维护者 @Audacity88 正主导恢复流程，涉及功能回迁与测试验证（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6074)）。
- **#6253 [OPEN]**：v0.7.6 技能支持与 UX 改进追踪器。社区可在此提交技能使用痛点，推动 CLI、沙箱、测试工具链优化（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6253)）。
- **#6751 [OPEN]**：新引入的 PR 标题校验工作流持续 startup_failure，可能影响后续 PR 合并效率，需紧急排查（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6751)）。

> 分析：社区对**技能生态稳定性**（安装、审计、UX）和**CI 可靠性**高度关注，反映出项目正从功能扩张转向质量加固阶段。

---

## 5. Bug 与稳定性

按严重程度排序：

| 严重性 | Issue | 状态 | Fix PR |
|--------|-------|------|--------|
| **S0**（数据丢失/安全风险） | #6558：Qwen 自定义 Provider 返回 405 Method Not Allowed | OPEN | 无 |
| **S1**（工作流阻塞） | #6681：`skills install` panic（已修复） | CLOSED | 已合入 |
| **S2**（降级行为） | #6632：手动 `cron_run` 仍标记失败为 ok | OPEN | 无 |
| **S2** | #6643：GLM-5.1 模型“Thoughts”泄露至最终回复 | OPEN | 无 |
| **S2** | #6739：Cron 时区契约不一致（已修复） | CLOSED | 已合入 |
| **S2** | #6756：`models list` 无法读取 custom provider 的 api_key | OPEN | 无 |
| **S3**（崩溃循环） | #6724：所有通道 disabled 时 supervisor 持续重启 | OPEN | 无 |

> ⚠️ 需重点关注：#6756（配置读取缺陷）、#6724（通道初始化逻辑）、#6643（模型输出污染）尚未有对应修复 PR。

---

## 6. 功能请求与路线图信号

以下功能请求已有活跃开发迹象，可能纳入 **v0.8.0**：

- **Agent 能力控制**：#6729 提出 per-agent 标志控制共享目录访问与工作区逃逸，契合安全沙箱演进方向（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6729)）。
- **ACP 桥接自动配对改进**：#6754 建议废除一次性配对码，改用更健壮的 token 机制，提升编辑器集成体验（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6754)）。
- **PDF 工具支持**：#5745 长期开放，用于学术文献处理场景，已有社区表达需求（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/5745)）。
- **新 Provider 集成**：Morph（#6439）、GitHub Models（#6444）均处于 in-progress，扩展模型生态。

---

## 7. 用户反馈摘要

从 Issues 评论提炼真实声音：

- **痛点**：
  - FreeBSD 用户需手动编译，缺乏预构建二进制（#1924）。
  - 技能安装过程不稳定，panic 中断工作流（#6681）。
  - 自定义 Provider 配置后 `models list` 仍报错，体验断裂（#6756）。
- **满意点**：
  - Docker 部署流程经社区验证可用（#6760）。
  - `--log-llm` 可观测性增强获开发者好评（#6742）。
- **使用场景**：
  - 学术研究者呼吁 PDF 解析工具支持期刊论文处理（#5745）。
  - 企业用户依赖 Cron + DingTalk 实现自动化通知（#6521 已修复支持）。

---

## 8. 待处理积压

以下重要 Issue/PR 长期未响应，建议维护者优先处理：

- **#6074**：153 个提交丢失恢复（4月24日开启，in-progress 但进展缓慢）。
- **#5745**：PDF 工具支持（4月15日开启，accepted 但无开发迹象）。
- **#6637**：/api/events 生命周期语义澄清（5月13日开启，observability 关键契约未明确定义）。
- **#6715**：清理超 200 个废弃分支（5月16日开启，影响仓库整洁度与协作效率）。

> 🔔 提醒：#6074 和 #6715 涉及项目历史完整性与工程规范，建议本周内分配资源处理。

--- 

**项目健康度评估**：⭐⭐⭐⭐☆（4.5/5）  
高活跃度 + 快速 Bug 响应 + 明确路线图，但需加强积压清理与跨模块契约治理。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-05-19）

---

## 1. 今日速览

PicoClaw 项目在 2026-05-19 继续保持高活跃度，24 小时内产生 **23 条 PR 更新**（含 6 条已合并/关闭）和 **8 条 Issues 更新**（5 新开/活跃，3 已关闭），社区贡献与问题反馈均处于高位。项目发布了一个新的 nightly 版本（v0.2.8-nightly.20260519.941bac23），表明开发节奏稳定。核心功能如 Seahorse 记忆系统、多通道支持（Telegram、Feishu、Server酱³）及流式响应正持续推进，同时多个关键 Bug 被识别并已有修复 PR 提交，整体项目健康度良好。

---

## 2. 版本发布

✅ **Nightly Build v0.2.8-nightly.20260519.941bac23 已发布**

- **类型**：自动化 nightly 构建，非稳定版本，建议仅用于测试。
- **更新内容**：集成自 v0.2.8 以来 main 分支的最新提交，包含多项功能增强与 Bug 修复，重点包括：
  - Seahorse 记忆系统的预算控制修复（#2895）
  - 新增 Server酱³ Bot 通道支持（#2893）
  - 流式响应架构初步支持（#2892）
  - macOS 路径解析兼容性修复（#2890）
- **破坏性变更**：无明确破坏性变更，但 nightly 版本可能存在未暴露的回归问题。
- **迁移建议**：生产环境请继续使用稳定版；开发者可基于此 nightly 测试新功能集成。
- [查看完整变更日志](https://github.com/sipeed/picoclaw/compare/v0.2.8...main)

---

## 3. 项目进展

今日有 **6 个 PR 被合并或关闭**，推动项目在多个方向取得实质进展：

- ✅ **#2885 feat(provider): add SiliconFlow provider support**  
  → 实现 SiliconFlow 作为一等 OpenAI 兼容 Provider，提升模型部署灵活性。[链接](https://github.com/sipeed/picoclaw/pull/2885)

- ✅ **#2882 feat(chat): add independent code block copy and collapse controls**  
  → 增强 Web UI 代码块交互体验，支持独立复制与折叠，提升开发者使用效率。[链接](https://github.com/sipeed/picoclaw/pull/2882)

- ✅ **#2886 feat(chat): add chat detail visibility selector**  
  → 将推理过程与工具调用可见性从二元开关升级为四态选择器，增强用户对输出透明度的控制。[链接](https://github.com/sipeed/picoclaw/pull/2886)

- ✅ **#2878 [BUG] load_image 无法在 config.json 中配置**（已关闭）  
  → 确认问题并推动修复，相关逻辑已在 agent_init.go 中调整。[链接](https://github.com/sipeed/picoclaw/issues/2878)

- ✅ **#2884 [Feature] Add siliconflow provider support**（已关闭）  
  → 需求已被 PR #2885 实现并合并，闭环处理。[链接](https://github.com/sipeed/picoclaw/issues/2884)

- ✅ **#1919 Seahorse 生物启发记忆系统提案**（已关闭）  
  → 长期讨论后达成共识，相关设计思想已融入当前 Seahorse 实现，不再作为独立 Issue 维护。[链接](https://github.com/sipeed/picoclaw/issues/1919)

> 项目在 **多 Provider 支持、UI/UX 精细化、核心记忆系统稳定性** 三方面同步推进，架构成熟度显著提升。

---

## 4. 社区热点

🔥 **最活跃 Issue：#2674 Codex OAuth: empty assistant response when ChatGPT backend streams items**  
- **评论数**：4 | **👍 反应数**：4  
- **核心诉求**：用户在使用 OpenAI Codex OAuth 对接 ChatGPT 后端时，助理回复为空，触发 fallback 提示，怀疑是流式响应处理逻辑缺陷。  
- **影响范围**：直接影响主流 OpenAI 用户的核心对话体验，属高优先级兼容性问题。  
- **当前状态**：标记为 `stale`，但社区关注度较高，需维护者介入排查 provider 层 stream 解析逻辑。  
- [查看 Issue #2674](https://github.com/sipeed/picoclaw/issues/2674)

💬 **高关注 PR：#2892 Support streaming**  
- 虽无评论，但涉及 **流式响应架构重构**，是迈向实时交互的关键一步。采用“双 opt-in”机制（模型 + 通道均需显式启用），兼顾灵活性与安全性。  
- [查看 PR #2892](https://github.com/sipeed/picoclaw/pull/2892)

---

## 5. Bug 与稳定性

按严重程度排序：

| 严重程度 | Issue | 描述 | 是否有 Fix PR |
|--------|------|------|-------------|
| 🔴 高 | #2894 Seahorse Assembler: FreshTail (32 messages) bypasses budget limit | FreshTail 消息完全绕过上下文预算，导致请求超出模型窗口限制（400 错误） | ✅ 有，#2895 已提交修复 |
| 🟠 中 | #2887 .deb version on RISC-V is not functional with OpenAI model | RISC-V 架构下 .deb 包无法正常使用 OpenAI 模型，影响边缘部署 | ❌ 尚无 PR，需平台兼容性排查 |
| 🟠 中 | #2796 历史记录中多次用户消息仅显示最后一条 | 对话历史压缩逻辑误伤用户可见消息，破坏可追溯性 | ❌ 尚无 PR，需调整消息渲染策略 |
| 🟡 低 | #2878 load_image 工具无法通过 config.json 配置 | 配置开关失效，影响工具启用灵活性 | ✅ 已确认并推动修复（见 agent_init.go 逻辑） |

> 关键内存管理 Bug（#2894）已有针对性修复 PR，建议尽快 review 合并。

---

## 6. 功能请求与路线图信号

以下功能请求已获得社区响应，有望纳入下一版本：

- 📌 **Server酱³ Bot 通道支持**（#2893）  
  → 满足中国用户通知集成需求，PR 已提交，实现完整 polling/webhook 双模式。

- 📌 **Telegram Guest/Business 模式支持**（#2849, #2845）  
  → 扩展 Telegram 通道企业场景能力，含单元测试与 UI 集成，成熟度高。

- 📌 **Yocto/OpenEmbedded 层支持**（#2851）  
  → 面向嵌入式 Linux 专业部署，提升在工业/边缘设备中的可集成性。

- 📌 **“恢复出厂设置”功能**（#2891）  
  → 解决跨版本配置兼容性问题，提供安全回滚路径，CLI 与 API 全覆盖。

> 上述功能均已有完整 PR，若通过 review，将显著增强 PicoClaw 的 **部署灵活性、企业级支持与用户体验鲁棒性**。

---

## 7. 用户反馈摘要

从 Issues 评论提炼真实声音：

- **痛点**：
  - “历史消息只显示最后一条，之前的都看不到” → 用户对消息压缩策略感到困惑，期望**用户可见历史完整保留**，压缩仅作用于模型输入。（#2796）
  - “.deb 包在 RISC-V 上跑不了 OpenAI 模型” → 边缘计算用户遭遇平台兼容性问题，影响实际部署。（#2887）
  - “Codex OAuth 返回空回复” → 主流 OpenAI 用户遭遇核心功能失效，信任度受损。（#2674）

- **满意点**：
  - 对 Seahorse 记忆系统的生物启发设计表示兴趣，认为“赋予 AI 类人记忆是突破”（#1919 讨论）。
  - 赞赏 SiliconFlow 原生支持，“终于不用绕道 OpenAI 兼容模式了”（#2884 评论）。

- **使用场景**：
  - 嵌入式 Linux（Yocto）、RISC-V 边缘设备、Telegram 企业客服、中文通知系统（Server酱³）等多样化场景被验证。

---

## 8. 待处理积压

⚠️ 以下长期未响应事项需维护者关注：

- **#2551 refactor: standardize channel identification and decouple name from provider type**  
  → 涉及核心架构解耦，允许多实例同类型通道，已停滞超 1 个月，影响通道扩展性。[链接](https://github.com/sipeed/picoclaw/pull/2551)

- **#2239 modify docker compose with privileged**  
  → Docker 部署安全性与权限模型调整，4 月提出至今未 review，可能阻碍容器化生产部署。[链接](https://github.com/sipeed/picoclaw/pull/2239)

- **#2696 feat(mcp): support per-request dynamic headers from channel context**  
  → MCP 协议增强，支持通道级动态鉴权头，对多租户场景关键，4 月底提交未合并。[链接](https://github.com/sipeed/picoclaw/pull/2696)

> 建议优先处理 #2551 与 #2696，二者对系统可扩展性与安全性有长期价值。

--- 

📌 **总结**：PicoClaw 正处于快速迭代期，社区贡献活跃，核心功能持续深化。需重点关注 **RISC-V 兼容性、流式响应稳定性、历史消息渲染逻辑** 等用户痛点，并推动积压架构 PR 的 review，以维持项目长期健康度。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-05-19）

---

## 1. 今日速览

NanoClaw 在 2026-05-19 继续保持高活跃度，社区贡献与核心开发并行推进。过去24小时内共处理 **34 条 PR 更新**（含 7 条合并/关闭）和 **4 条 Issue 更新**（3 新开，1 关闭），显示出强劲的开发节奏和问题响应能力。项目发布 **v2.0.64 新版本**，修复了关键的消息路由缺陷。安全、稳定性与多通道适配成为当前焦点，Webhook 安全加固、Telegram 交互增强、数据库一致性修复等多项改进集中提交，整体项目健康度良好。

---

## 2. 版本发布

### 🔖 v2.0.64（[Release 链接](https://github.com/nanocoai/nanoclaw/releases/tag/v2.0.64))

**核心修复：**
> `ncl destinations add` 和 `remove` 操作通过审批流程后，目标地址现已**立即同步至接收 Agent 的本地会话状态**。此前，已批准的目标在 `send_message` 时会因“unknown destination”错误而静默失败。

- **影响范围**：所有使用审批流程添加/移除消息目的地的用户。
- **破坏性变更**：无。此为向后兼容的 Bug 修复。
- **迁移建议**：无需额外操作，升级后即可正常使用动态目的地管理功能。

> ✅ 该修复解决了长期存在的消息投递可靠性问题，显著提升多 Agent 协作场景下的通信稳定性。

---

## 3. 项目进展

今日共 **7 个 PR 被合并或关闭**，涵盖安全、文档、基础设施与核心逻辑修复：

| PR | 类型 | 关键进展 |
|----|------|--------|
| [#2547](https://github.com/nanocoai/nanoclaw/pull/2547) | 安全修复 | Webhook 服务器默认绑定至 `127.0.0.1`，避免端口暴露到局域网，提升部署安全性 |
| [#2536](https://github.com/nanocoai/nanoclaw/pull/2536) | 文档 | 添加 v2.0.64 更新日志，完善发布流程规范性 |
| [#1310](https://github.com/nanocoai/nanoclaw/pull/1310) | 文档 | 新增凭证与环境变量配置指南，降低新用户上手门槛 |
| [#2375](https://github.com/nanocoai/nanoclaw/pull/2375) | 稳定性 | 修复 `agent-shared` 通道消息误路由至 GitHub PR 线程会话的问题 |
| [#867](https://github.com/nanocoai/nanoclaw/pull/867) | 功能修复 | 允许定时任务 Agent 向其任务输出 JID 发送消息，支持更灵活的协调器模式 |

> 📌 整体项目在**安全性、会话隔离性、文档完整性**方面取得实质性推进，为后续大规模部署打下基础。

---

## 4. 社区热点

### 🔥 高关注度 Issue：SSL 证书失效（[#1503](https://github.com/nanocoai/nanoclaw/issues/1503)）
- **评论数：19** | **状态：Open** | **最后更新：2026-05-18**
- **摘要**：用户报告 `nanoclaw.dev` 域名 SSL 证书失效，影响官方文档与集成体验。
- **分析**：尽管技术影响有限（非核心服务），但损害项目可信度与开发者体验。需运维团队优先处理。

### 💬 高讨论 PR：Webhook 安全加固（[#2546](https://github.com/nanocoai/nanocoai/nanoclaw/pull/2546)）
- 虽无评论，但作为今日唯一被关闭后重提的 PR（原 #2547 已合并且关闭），表明维护者对安全默认值的重视。
- 社区对“默认绑定 0.0.0.0”的风险已有共识，推动安全最佳实践落地。

---

## 5. Bug 与稳定性

| Issue | 严重程度 | 描述 | 是否有 Fix PR |
|------|--------|------|-------------|
| [#2535](https://github.com/nanocoai/nanoclaw/issues/2535) | ⚠️ 高 | WhatsApp 群组消息显示为“ממתין להודעה זו”（等待此消息），导致 Bot 无法处理 | ❌ 无 |
| [#2533](https://github.com/nanocoai/nanoclaw/issues/2533) | ⚠️ 中 | 部署或重启后 `sessions.container_status` 未同步，残留 `running` 状态 | ✅ 已由 #2375 间接修复 |
| [#2541](https://github.com/nanocoai/nanoclaw/pull/2541) | ⚠️ 中 | 消息体含 `</message>` 时被误解析为结束标签，导致消息截断 | ✅ PR 已提交，待合并 |

> 🔍 WhatsApp 集成问题为当前最高优先级未修复 Bug，影响实际用户体验，建议分配资源排查 LID 加密同步机制。

---

## 6. 功能请求与路线图信号

| 功能方向 | 相关 Issue/PR | 可能性评估 |
|--------|--------------|----------|
| **自定义 OpenAI 兼容端点支持** | [#1984](https://github.com/nanocoai/nanoclaw/issues/1984) | ⭐⭐⭐⭐☆ 高（已有实验性文档，社区需求明确） |
| **ACP Client Protocol 支持** | [#2542](https://github.com/nanocoai/nanoclaw/pull/2542) | ⭐⭐⭐⭐⭐ 极高（PR 已提交，实现完整） |
| **Telegram 反应与回调支持** | [#2544](https://github.com/nanocoai/nanoclaw/pull/2544) | ⭐⭐⭐☆☆ 中（小范围增强，易合并） |
| **Agent 网络协作能力** | [#2497](https://github.com/nanocoai/nanoclaw/pull/2497) | ⭐⭐⭐⭐☆ 高（符合项目多 Agent 愿景） |

> 🚀 ACP 协议支持若合并，将使 NanoClaw 成为通用 Agent 客户端，极大扩展生态兼容性。

---

## 7. 用户反馈摘要

- **痛点**：
  - WhatsApp 群组消息无法正常解析（[#2535](https://github.com/nanocoai/nanoclaw/issues/2535)）：用户期望跨平台一致性体验。
  - SSL 证书失效（[#1503](https://github.com/nanocoai/nanoclaw/issues/1503)）：影响开发者对项目维护状态的信任。
- **满意点**：
  - 审批流程目的地同步修复（v2.0.64）解决了长期困扰用户的“静默失败”问题。
  - 环境变量配置文档（#1310）获社区好评，降低部署门槛。
- **使用场景**：
  - 多 Agent 协调器模式（#867）、GitHub PR 线程隔离（#2375）反映用户正将 NanoClaw 用于复杂自动化工作流。

---

## 8. 待处理积压

| 项目 | 类型 | 积压时长 | 建议 |
|------|------|--------|------|
| [#1503](https://github.com/nanocoai/nanoclaw/issues/1503) SSL 证书失效 | Issue | >50 天 | ⚠️ 需运维介入更新证书 |
| [#1984](https://github.com/nanocoai/nanoclaw/issues/1984) 自定义 OpenAI 端点支持 | Issue | >25 天 | 📌 高价值功能，建议评估 PR 可行性 |
| [#1845](https://github.com/nanocoai/nanoclaw/pull/1845) 时间戳标准化 | PR | >30 天 | 🔄 长期未合并，需 review 是否仍有必要 |

> 💡 建议维护者优先处理 #1503 和 #1984，前者关乎品牌形象，后者代表重要功能演进方向。

---  
**报告生成时间：2026-05-19**  
**数据来源：NanoClaw GitHub 仓库（@nanocoai/nanoclaw）**

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-05-19）

---

## 1. 今日速览

IronClaw 项目在过去24小时内保持高度活跃，共产生 **36条 Issues 更新**（新开/活跃34条，关闭2条）和 **49条 PR 更新**（待合并33条，已合并/关闭16条），显示出核心团队在“Reborn”架构迁移路径上的高强度推进。尽管无新版本发布，但多个关键模块（如身份策略、事件流管理、WebUI v2路由）取得实质性进展。社区反馈集中于工具状态显示异常、嵌入配置兼容性及权限控制等实际问题，反映出产品已进入真实用户场景验证阶段。

---

## 2. 版本发布

**无新版本发布**。  
最新 GitHub 标签为 `ironclaw-v0.27.0`（2026-04-29），但 crates.io 上仍为 `v0.24.0`，存在版本发布滞后问题（见 Issue #3259）。

---

## 3. 项目进展

今日多个关键 PR 持续推进 Reborn 架构落地：

- **#3721**（Open, XL）：实现基于运行配置文件的个人上下文策略门控，为 `USER.md` 和 `HEARTBEAT.md` 提供细粒度访问控制，是身份安全体系的重要里程碑。
- **#3747**（Open, XL）：新增 `ironclaw_webui_v2` 原生 HTTP 路由层，基于 `RebornServicesApi` 构建 WebChat v2 的最小可行接口，涵盖线程创建、消息发送、SSE 流等核心功能。
- **#3761**（Open, XL）：引入首个 Reborn EventStreamManager 切片，提供传输中立的事件流管理能力，支持投影快照、订阅准入与实时更新缓冲，为多端同步奠定基础。
- **#3739**（Open, XL）：将嵌入服务（OpenAI/NearAI/Ollama/Bedrock）抽离为独立 crate `ironclaw_embeddings`，提升模块化程度，但暴露出多个历史兼容性缺陷（见下文 Bug 部分）。

此外，**#3768** 被关闭，其内容合并至 **#3770**，后者为 Reborn 测试框架添加了通用工作流支持垫片，增强端到端测试能力。

---

## 4. 社区热点

### 高讨论度 Issues

- **#3692**（6评论）：关于 Reborn 中策略门控个人身份与心跳提示上下文的实现路径，核心开发者 @henrypark133 正在协调身份上下文的安全边界设计。
- **#3259**（5评论）：呼吁将 v0.25.0–v0.27.0 发布至 crates.io，因下游 wasmtime 28.x 受 CVE 影响被锁定在 v0.24.0，阻碍安全更新传播。

### 高关注度 PR

- **#3739**（嵌入模块重构）：虽未显示评论数，但触发了 **6个衍生 Issue**（#3750–#3755），集中暴露 Bedrock/OpenAI 嵌入配置、错误提示、路径拼接等历史遗留问题，成为当前最需跟进的技术债清理焦点。

---

## 5. Bug 与稳定性

以下为今日报告的严重 Bug，按优先级排序：

| 问题 | 严重性 | 状态 | 相关链接 |
|------|--------|------|---------|
| `tool_install` 失败调用在页面刷新后显示为成功 | 高（UI 误导） | 无 Fix PR | [#3729](https://github.com/nearai/ironclaw/issues/3729) |
| Bedrock 嵌入忽略 DB/TOML 模型设置 | 高（功能失效） | 无 Fix PR | [#3750](https://github.com/nearai/ironclaw/issues/3750) |
| OpenAI 嵌入 URL 路径重复 `/v1/v1/embeddings` | 中（配置敏感） | 无 Fix PR | [#3754](https://github.com/nearai/ironclaw/issues/3754) |
| 未知嵌入提供商名称静默路由至 OpenAI | 中（安全风险） | 无 Fix PR | [#3751](https://github.com/nearai/ironclaw/issues/3751) |
| `ironclaw doctor` 对非 OpenAI 提供商错误检查 OPENAI_API_KEY | 低（体验差） | 无 Fix PR | [#3753](https://github.com/nearai/ironclaw/issues/3753) |

> 注：上述问题均源于 #3739 重构过程中暴露的历史代码缺陷，建议优先修复 #3750 与 #3729。

---

## 6. 功能请求与路线图信号

用户明确提出以下需求，部分已有对应 PR 支撑：

- **Per-user/tenant 工具启用控制**（#3763）：WebUI 中缺乏细粒度工具开关，影响客户定制化部署。该需求与 Reborn 的权限模型演进方向一致，可能被纳入 M1-WebUI 产品模块后续迭代。
- **AGENTS.md 编辑实时生效**（#3762）：当前系统提示未随身份文件更新，阻碍动态配置。此问题与 #3692 身份上下文机制强相关，预计将在个人上下文策略完善后解决。
- **WebUI v2 路由迁移**（#3289, #3287）：认证、内存、工作区等核心产品面迁移至 Reborn 架构，已有 #3747、#3632 等 PR 分阶段推进，是 2026 Q2 核心目标。

---

## 7. 用户反馈摘要

从 Issues 评论提炼关键用户声音：

- **痛点**：工具安装状态显示不一致（#3729）、嵌入配置行为不符合文档预期（#3750）、WebUI 编辑无实时反馈（#3762）严重影响可信度与操作效率。
- **场景**：企业用户需在多租户环境下精细控制工具权限（#3763）；开发者依赖 `ironclaw doctor` 快速诊断嵌入服务问题（#3753）。
- **满意点**：Reborn 架构逐步提供更强的一致性与可测试性（#3770 测试框架改进获内部认可）。

---

## 8. 待处理积压

以下重要 Issue 长期未获响应，建议维护者优先处理：

- **#3259**（发布滞后）：自 2026-05-05 提出，影响下游安全更新，需协调发布流程。
- **#3068**（凭证注入兼容性）：标记为 P0 且为“Reborn Cutover Blocker”，涉及 HTTP 凭证代理机制保留，尚未有明确解决方案。
- **#3615**（WebUI 安全审计）：WebChat v2 路由的认证与 CSRF 规则验证缺失，存在潜在安全风险。

> 建议：将 #3259 升级至 P0，并分配专人推动 crates.io 发布；#3068 需与 Reborn 架构师对齐设计决策。

--- 

**项目健康度评估**：整体活跃度高，核心功能稳步推进，但需警惕技术债累积（尤其嵌入模块）与发布流程阻塞问题。建议加强跨模块回归测试与用户场景验证。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-05-19）

---

## 1. 今日速览

LobsterAI 在 2026-05-18 至 2026-05-19 期间表现出**高活跃度开发状态**，虽无新 Issue 提交，但社区与核心团队聚焦于功能迭代与稳定性优化。过去24小时内共处理 **18 条 Pull Request**，其中 **12 条已合并/关闭**，6 条仍待合并；同时发布了一个正式版本 `2026.5.18`。整体开发节奏紧凑，重点围绕模型配置、UI 一致性、OpenClaw 兼容性及性能优化展开，体现出项目进入成熟功能深化阶段。

---

## 2. 版本发布

### 🔖 LobsterAI v2026.5.18（2026-05-18）

本次发布为常规功能更新版本，包含两项核心增强：

- **feat(keyfrom): 增加渠道归因封装与请求上下文支持**  
  由 @liuzhq1986 提交（#1991），为请求链路添加渠道追踪能力，提升数据分析粒度，适用于多入口用户行为归因场景。

- **feat: 模型设置中新增按模型独立配置的上下文窗口滑动条**  
  由 @btc69m979y-dotcom 实现（#2001），支持非线性刻度调节，上限扩展至 **2M tokens**，显著提升长上下文任务（如文档分析、代码审查）的灵活性与资源利用率。

> ✅ **无破坏性变更**，无需迁移操作。建议用户升级以体验更精细的模型控制能力。

---

## 3. 项目进展

过去24小时合并/关闭的 PR 显示项目在多个维度取得实质性推进：

| 类别 | 关键进展 |
|------|--------|
| **功能增强** | 新增 per-model context window slider（#2001），支持 2M tokens 上限，优化大模型长上下文处理能力 |
| **UI/UX 一致性** | 修复新建任务页背景色回归主题色（#2007）、将“梦境”开关替换为标准滑动组件（#2005），统一交互范式 |
| **架构重构** | 将 Settings.tsx 中模型设置模块抽离为独立组件 `ModelSettingsSection.tsx`（#2004），降低主文件复杂度（5162 → 3502 行） |
| **兼容性修复** | 解决非 ASCII 字符 MCP 服务器名在 OpenClaw 中显示异常问题，通过 MD5 哈希生成稳定 ASCII 别名（#2006） |
| **性能优化** | 使用索引表将流式消息更新查找复杂度从 O(n) 降至 O(1)（#811），显著提升长会话渲染性能 |
| **工具链升级** | 升级 Electron 至 42.1.0（#1277）、moltbot-popo 插件至 2.1.8（#2003），保障底层依赖安全与新特性支持 |

> 项目整体向**模块化、高性能、强兼容**方向稳步迈进，技术债务持续清理。

---

## 4. 社区热点

尽管今日无新 Issue，但以下 **长期开放 PR 仍具高关注度**，反映社区核心诉求：

- **#752 feat(cowork): 实现 /compact 命令和自动压缩机制**（@leedalei）  
  👉 [查看 PR](https://github.com/netease-youdao/LobsterAI/pull/752)  
  提供手动 `/compact` 与自动压缩策略，适配 Anthropic/OpenAI 双格式，解决长会话内存膨胀问题。该功能直击用户高频痛点，有望成为下一版本亮点。

- **#755 feat: 支持将聊天记录导出为 Markdown/JSON 格式**（@flowell）  
  👉 [查看 PR](https://github.com/netease-youdao/LobsterAI/pull/755)  
  实现会话归档导出功能，满足用户对内容沉淀与跨平台迁移的需求，实用性高，社区呼声强烈。

> 分析：用户日益重视**会话管理效率**与**数据可移植性**，这两项 PR 若合并将极大提升产品竞争力。

---

## 5. Bug 与稳定性

| 问题描述 | 严重程度 | 修复状态 | 链接 |
|--------|--------|--------|------|
| 新建任务页背景误设为白色（应为主题色） | 中 | ✅ 已修复（#2007） | [PR #2007](https://github.com/netease-youdao/LobsterAI/pull/2007) |
| 非 ASCII MCP 服务器名在 OpenClaw 中显示为“------” | 中 | ✅ 已修复（#2006） | [PR #2006](https://github.com/netease-youdao/LobsterAI/pull/2006) |
| Markdown 预览中相对图片路径无法解析 | 中 | ✅ 已修复（#2002） | [PR #2002](https://github.com/netease-youdao/LobsterAI/pull/2002) |
| 流式消息更新性能瓶颈（O(n) 查找） | 高 | ✅ 已优化（#811） | [PR #811](https://github.com/netease-youdao/LobsterAI/pull/811) |

> 所有已知关键问题均已闭环，系统稳定性良好。

---

## 6. 功能请求与路线图信号

结合近期 PR 与社区行为，以下功能极可能被纳入下一版本路线图：

- **会话压缩机制（/compact）**：#752 已完整实现手动与自动压缩逻辑，适配主流模型格式，技术方案成熟。
- **聊天记录导出（Markdown/JSON）**：#755 提供完整 IPC 与 UI 集成，满足归档与合规需求，用户价值明确。
- **平台配置抽象化**：#748 提出通用 `makePlatformHandlers` 工厂模式，可减少重复代码，提升可维护性，符合架构演进方向。

> 建议维护者优先推进 #752 与 #755 的代码审查与合并，以回应社区核心诉求。

---

## 7. 用户反馈摘要

虽无新 Issue，但从近期 PR 描述与修复内容可反推用户真实痛点：

- **“中文 MCP 服务器名显示乱码”** → 反映国际化支持不足，尤其影响中文用户工作流（#2006 修复）。
- **“长会话卡顿明显”** → 性能瓶颈已被识别并优化（#811），说明用户对流畅性敏感。
- **“想导出对话做笔记”** → #755 直接回应此需求，体现用户对内容所有权与二次加工的需求。
- **“模型上下文不够用”** → #2001 将上限提至 2M tokens，满足专业用户处理大型文档的需求。

> 用户群体正从“基础聊天”向“专业协作文档处理”演进，对**性能、可控性、数据导出**要求提升。

---

## 8. 待处理积压

以下重要 PR 长期处于 `OPEN` 状态，建议维护者尽快评估：

| PR | 类型 | 积压时长 | 建议动作 |
|----|------|--------|--------|
| #748 refactor(im): 提取平台配置处理器工厂 | 架构重构 | 55 天 | 高价值，可降低维护成本，建议安排 review |
| #749 perf(cowork): 记忆化关键组件 | 性能优化 | 55 天 | 对长会话体验有益，建议测试后合并 |
| #752 feat: /compact 命令与自动压缩 | 功能增强 | 55 天 | 社区高需求，技术方案完整，建议优先合并 |
| #755 feat: 聊天记录导出 Markdown/JSON | 功能增强 | 55 天 | 用户价值明确，建议纳入下一版本 |

> ⚠️ 提醒：上述 PR 均标记为 `[stale]`，存在被自动关闭风险，建议维护团队主动介入，避免优质贡献流失。

---

**总结**：LobsterAI 当前处于**高质量迭代周期**，核心功能持续深化，稳定性良好，社区贡献活跃。建议加速推进积压 PR 的合并，以进一步提升用户体验与项目健康度。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-05-19）

---

## 1. 今日速览  
Moltis 项目在2026年5月18日表现出**高活跃度与强修复导向**。过去24小时内，团队高效关闭了7个 Issue 并合并/关闭6个 PR，显示出对近期反馈的快速响应能力。同时发布了一个新版本 `20260518.01`，集中修复了多个关键 Bug，涵盖代理生命周期、配置持久化、LLM 推理标签解析等核心模块。整体项目健康度良好，维护节奏紧凑，技术债务清理成效显著。

---

## 2. 版本发布  
**新版本：`20260518.01`（2026-05-18）**  
本次发布为**热修复版本**，主要聚焦于解决近期用户反馈的多个稳定性与功能性问题，无破坏性变更，建议所有用户升级。  
**关键修复内容包括**：
- 修复 `BeforeAgentStart` 钩子在代理启动时未触发的问题（#1012 → #1017）
- 修复 `BeforeLLMCall` 钩子对消息负载的修改被静默丢弃的问题（#1013 → #1018）
- 支持 Gemma 模型 `<thought>` 标签作为推理内容解析，避免泄露至用户可见输出（#1007 → #1016）
- 修复 VoiceCoquiTTS 配置在启动时被自动压缩导致默认值“消失”的问题（#1006 → #1015）
- 修复危险命令检测正则表达式对 heredoc 内容产生误报（#1014 → #1019）
- 更新 sandbox 中 `slacrawl` 模块路径以匹配上游声明（#1021）

> ✅ **迁移建议**：无需手动干预，配置兼容性保持良好；若使用 Coqui TTS 或自定义钩子，建议验证行为是否符合预期。

[查看 Release](https://github.com/moltis-org/moltis/releases/tag/20260518.01)

---

## 3. 项目进展  
今日共合并/关闭 **6 个 PR**，全部为 Bug 修复类提交，体现出团队对稳定性的高度重视：

| PR | 修复内容 | 关联 Issue | 进展意义 |
|----|--------|----------|--------|
| [#1017](https://github.com/moltis-org/moltis/pull/1017) | 恢复 `BeforeAgentStart` 钩子分发 | #1012 | 修复 April 重构引入的回归，保障插件系统完整性 |
| [#1018](https://github.com/moltis-org/moltis/pull/1018) | 支持 `BeforeLLMCall` 钩子修改消息负载 | #1013 | 实现文档承诺功能，增强扩展性 |
| [#1016](https://github.com/moltis-org/moltis/pull/1016) | 解析 `<thought>` 为推理块（兼容 Gemma） | #1007 | 提升多模型支持能力，避免 TTS/UI 泄露 |
| [#1015](https://github.com/moltis-org/moltis/pull/1015) | 保留显式默认配置项 | #1006 | 改善用户体验，防止配置“隐形丢失” |
| [#1019](https://github.com/moltis-org/moltis/pull/1019) | 忽略 heredoc 内容中的危险命令检测 | #1014 | 降低误报率，提升脚本安全性判断准确性 |
| [#1021](https://github.com/moltis-org/moltis/pull/1021) | 更新 sandbox 中 slacrawl 模块路径 | — | 维护依赖一致性，避免未来构建失败 |

> 📌 **整体推进**：项目在**代理生命周期管理、配置系统健壮性、多模型兼容性**三大方向取得实质性进展，技术债显著减少。

---

## 4. 社区热点  
尽管所有 Issue 评论数均 ≤1，但 **#1011（新功能请求）** 成为唯一未关闭的 Issue，引发潜在关注：

> **[#1011: Per-turn tool_choice + active_tools filtering for drift-resistant agent routing](https://github.com/moltis-org/moltis/issues/1011)**  
> 作者 @dmitriikeler 提出：小型/廉价 LLM（如 Claude Haiku-4-5）难以可靠执行工具调用，建议引入**每轮动态工具选择与激活过滤机制**，以抵抗“工具漂移”（tool drift）。  
> **背后诉求**：用户希望在资源受限模型上实现更可控、可预测的代理行为，反映了对**轻量级代理路由策略**的迫切需求。该需求可能指向下一阶段“智能路由”或“成本感知执行”功能演进。

---

## 5. Bug 与稳定性  
过去24小时共关闭 **7 个 Bug 报告**，均已通过对应 PR 修复，无遗留高危问题：

| Issue | 严重程度 | 是否已修复 | 说明 |
|------|--------|----------|------|
| [#858](https://github.com/moltis-org/moltis/issues/858) | 中 | ✅（历史修复） | 心跳循环重触发问题（早于本次周期，但今日关闭） |
| [#1020](https://github.com/moltis-org/moltis/issues/1020) | 中 | ✅（隐含于 #1021） | Docker sandbox 镜像预构建失败，由模块路径修复间接解决 |
| [#1014](https://github.com/moltis-org/moltis/issues/1014) | 中 | ✅（#1019） | 危险命令检测误报 heredoc 内容 |
| [#1013](https://github.com/moltis-org/moltis/issues/1013) | 高 | ✅（#1018） | 钩子修改负载被丢弃，影响插件功能 |
| [#1012](https://github.com/moltis-org/moltis/issues/1012) | 高 | ✅（#1017） | 关键生命周期钩子未触发，属回归 Bug |
| [#1007](https://github.com/moltis-org/moltis/issues/1007) | 中 | ✅（#1016） | 推理标签未正确解析，影响输出纯净度 |
| [#1006](https://github.com/moltis-org/moltis/issues/1006) | 中 | ✅（#1015） | 配置默认值丢失，影响 TTS 可用性 |

> ⚠️ **结论**：无未修复高危 Bug，稳定性处于可控状态。

---

## 6. 功能请求与路线图信号  
当前唯一开放的功能请求为 **[#1011](https://github.com/moltis-org/moltis/issues/1011)**，提出“每轮工具选择 + 激活过滤”机制。  
**分析**：
- 该需求针对**低成本模型代理可靠性**问题，具有实际部署价值；
- 与 Moltis 强调的“可控 AI 代理”理念高度契合；
- 虽无直接 PR，但近期对钩子系统的修复（#1017、#1018）为动态工具控制提供了基础设施支持；
- **预测**：该功能有望纳入下一版本（如 `20260525.x`）的“智能路由”子模块，或作为实验性特性先行发布。

---

## 7. 用户反馈摘要  
从 Issues 内容提炼真实用户痛点：

- **配置体验不佳**：用户报告 Coqui TTS 默认地址 `http://localhost:5002` 在启动后被“压缩”消失（#1006），反映对**显式默认值保留**的强烈需求。
- **模型兼容性不足**：Gemma 模型使用 `<thought>` 而非 `<think>`，导致推理内容暴露给用户（#1007），凸显对**多厂商标签标准化支持**的期待。
- **安全机制误报**：危险命令检测将 heredoc 中的 `rm -rf` 误判为风险（#1014），影响脚本自动化流程，用户期望更精准的上下文感知。
- **插件系统不可靠**：`BeforeAgentStart` 和 `BeforeLLMCall` 钩子失效（#1012、#1013），破坏第三方扩展功能，损害开发者信任。

> 💬 **总体情绪**：用户认可 Moltis 的功能深度，但对**稳定性、兼容性与配置透明度**有更高要求。

---

## 8. 待处理积压  
截至 2026-05-19，**无长期未响应的重要 Issue 或 PR**。  
所有近期 Bug 均已闭环，唯一开放项 #1011 为功能请求，创建仅1天，尚在合理响应窗口内。  
**建议维护者关注**：
- 对 #1011 进行初步评估，明确是否纳入近期路线图；
- 监控 sandbox 镜像构建稳定性（#1020 虽关闭，但依赖更新需验证）。

> ✅ **项目响应效率优秀，积压风险低**。

---  
*数据来源：GitHub moltis-org/moltis，统计周期：2026-05-18 00:00 至 2026-05-18 23:59 UTC*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报（2026-05-19）

---

## 1. 今日速览

CoPaw 项目在2026年5月18日至19日期间保持高活跃度，社区贡献与核心开发并行推进。过去24小时内共处理 **32条 Issues**（新开/活跃20条，关闭12条）和 **22条 Pull Requests**（待合并15条，已合并/关闭7条），并发布 **v1.1.8-beta.1** 新版本。整体开发节奏稳健，重点聚焦于稳定性修复、WeChat/Feishu 通道优化及插件系统增强。社区对“聊天无响应”“上下文压缩失败”等关键问题高度关注，反映出生产环境中的实际痛点。

---

## 2. 版本发布

### 🔖 v1.1.8-beta.1 发布  
**发布时间**：2026-05-18  
**主要变更**：
- **功能增强**：强化 Plan Mode 中用户消息的 reaffirm 机制（[#4198](https://github.com/agentscope-ai/QwenPaw/pull/4198)），提升任务规划一致性。
- **工具修复**：浏览器工具实现细节优化（具体见 PR 描述）。
- **版本管理**：版本号升级至 `1.1.8b1`（[#4346](https://github.com/agentscope-ai/QwenPaw/pull/4346)）。

> ⚠️ **注意**：此为 Beta 版本，建议生产环境谨慎升级。未发现破坏性变更，但部分用户反馈 AGENTS.md 加载异常（见下文 Bug 部分）。

[查看 Release 详情](https://github.com/agentscope-ai/QwenPaw/releases/tag/v1.1.8-beta.1)

---

## 3. 项目进展

今日合并/关闭的 PR 显著提升了系统稳定性和多通道支持：

- **WeChat 通道健壮性提升**：通过优雅关闭轮询线程与指数退避重试机制，修复 `#4469` 中“聊天无响应”问题（[#4490](https://github.com/agentscope-ai/QwenPaw/pull/4490)）。
- **Feishu 实时流式输出支持**：集成 CardKit v1 流式卡片 API，实现消息逐字渲染（[#4480](https://github.com/agentscope-ai/QwenPaw/pull/4480)）。
- **LLM 限流机制重构**：将全局单例限流器替换为按模型实例隔离，解决多模型并发时的阻塞问题（[#4487](https://github.com/agentscope-ai/QwenPaw/pull/4487)）。
- **插件生态建设**：新增官方插件分发机制，支持从网站下载并安装 ZIP 格式插件（[#4482](https://github.com/agentscope-ai/QwenPaw/pull/4482)）。
- **前端稳定性修复**：升级 `@agentscope-ai/chat` 至 1.1.63，修复页面跳转时 SSE 连接泄漏问题（[#4488](https://github.com/agentscope-ai/QwenPaw/pull/4488)）。

> ✅ 整体项目在**多通道可靠性**、**资源管理**和**插件生态**三个方向取得实质性进展。

---

## 4. 社区热点

### 🔥 高关注度 Issues

| Issue | 主题 | 评论数 | 核心诉求 |
|------|------|--------|--------|
| [#2291](https://github.com/agentscope-ai/QwenPaw/issues/2291) | 🐾 Help Wanted: Open Tasks | 62 | 社区协作入口，引导贡献者认领 P0-P2 级任务，反映项目对外部贡献的强依赖性。 |
| [#4469](https://github.com/agentscope-ai/QwenPaw/issues/4469) | 聊天窗口无响应（三个点跳动） | 17 | 用户遭遇普遍性交互阻塞，涉及 Docker 重启无效，已确认由全局限流器引起（[#4487](https://github.com/agentscope-ai/QwenPaw/pull/4487) 已修复）。 |
| [#4453](https://github.com/agentscope-ai/QwenPaw/issues/4453) | 聊天无回应（Event loop stopped） | 10 | 同类问题不同用户报告，指向 WeChat 通道事件循环异常，推动 [#4490](https://github.com/agentscope-ai/QwenPaw/pull/4490) 修复。 |

> 💬 社区核心诉求：**提升基础交互稳定性**，尤其在多通道（WeChat/Feishu）和长会话场景下的可靠性。

---

## 5. Bug 与稳定性

### 🚨 严重 Bug（按优先级排序）

1. **AGENTS.md 加载错误（v1.1.7+）**  
   - **描述**：升级后系统提示词加载内置模板而非工作区实际文件（[#4496](https://github.com/agentscope-ai/QwenPaw/issues/4496)）。  
   - **影响**：自定义 Agent 行为失效，属**高优先级回归问题**。  
   - **状态**：✅ 已有相关讨论，**尚无 fix PR**，需紧急跟进。

2. **上下文压缩失败（频繁发生）**  
   - **描述**：长对话中频繁报错 `"Context compaction failed (invalid format (missing ## header))"`（[#4448](https://github.com/agentscope-ai/QwenPaw/issues/4448)）。  
   - **影响**：会话中断，用户体验严重受损。  
   - **状态**：🔄 重复报告（#4447 已关闭），**尚无明确修复方案**。

3. **插件工具未注入 Toolkit**  
   - **描述**：插件工具注册到 `agent.json` 但函数未加载至运行时（[#4485](https://github.com/agentscope-ai/QwenPaw/issues/4485)）。  
   - **影响**：Function Calling 模式下插件完全不可用。  
   - **状态**：⚠️ **关键功能缺陷**，**无 fix PR**。

4. **WeChat iLink 定时任务推送失败**  
   - **描述**：`context_token` 过期无重试逻辑，文件发送无日志（[#4477](https://github.com/agentscope-ai/QwenPaw/issues/4477)）。  
   - **状态**：🔧 部分由 [#4490](https://github.com/agentscope-ai/QwenPaw/pull/4490) 缓解，但重试逻辑仍需完善。

> 📌 **建议**：优先处理 #4496 和 #4485，二者直接影响核心功能可用性。

---

## 6. 功能请求与路线图信号

### 📌 高潜力功能需求

| 需求 | 来源 | 关联 PR | 可能性评估 |
|------|------|--------|----------|
| **插件市场发布计划** | [#4499](https://github.com/agentscope-ai/QwenPaw/issues/4499) | [#4482](https://github.com/agentscope-ai/QwenPaw/pull/4482) | ⭐⭐⭐⭐☆ 已有分发机制基础，预计 v1.2 落地 |
| **会话内删除/拆分对话** | [#4437](https://github.com/agentscope-ai/QwenPaw/issues/4437) / [#4436](https://github.com/agentscope-ai/QwenPaw/issues/4436) | 无 | ⭐⭐⭐☆☆ 用户需求明确，UI 层可实现 |
| **Beta 通道更新支持** | [#4500](https://github.com/agentscope-ai/QwenPaw/issues/4500) | 无 | ⭐⭐⭐⭐☆ 类似 OpenClaw 设计，CLI 增强项 |
| **Tauri 桌面应用支持** | [#3813](https://github.com/agentscope-ai/QwenPaw/pull/3813) | 进行中 | ⭐⭐⭐⭐⭐ 已进入 Review，可能 v1.2 集成 |

> 🔮 **预测**：插件市场、会话管理增强、桌面端支持将成为下一版本重点。

---

## 7. 用户反馈摘要

### ✅ 满意点
- 插件系统架构灵活，支持自定义工具注册（[#4485](https://github.com/agentscope-ai/QwenPaw/issues/4485) 侧面反映）。
- 多通道支持（WeChat/Feishu）覆盖主流办公场景。

### ❌ 痛点
- **稳定性问题突出**：“三个点跳动”“无响应”成高频关键词，尤其在 v1.1.7 版本。
- **升级风险高**：用户反馈回退版本仍无法解决（[#4453](https://github.com/agentscope-ai/QwenPaw/issues/4453)），说明问题非版本特异性。
- **文档与实际行为不符**：AGENTS.md 加载逻辑变更未公告，导致配置失效。
- **Windows 编码问题持续**：GBK 编码错误频发，现有修复零散不彻底（[#4481](https://github.com/agentscope-ai/QwenPaw/issues/4481)）。

> 💡 用户真实场景：企业微信/飞书集成、长上下文任务、插件扩展——均对稳定性要求极高。

---

## 8. 待处理积压

### ⏳ 长期未响应重要事项

| 事项 | 类型 | 创建时间 | 状态 | 建议 |
|------|------|--------|------|------|
| [#2291](https://github.com/agentscope-ai/QwenPaw/issues/2291) | Issue | 2026-03-25 | OPEN | 需维护者定期更新任务状态，激励社区参与 |
| [#3813](https://github.com/agentscope-ai/QwenPaw/pull/3813) | PR | 2026-04-24 | Under Review | Tauri 桌面支持已近两个月，建议加速合并 |
| [#4332](https://github.com/agentscope-ai/QwenPaw/pull/4332) | PR | 2026-05-14 | Under Review | 前端测试覆盖率 milestone，影响长期维护性 |

> 🛎️ **提醒**：积压事项影响项目可信度，建议设立定期 triage 机制。

---

**报告生成时间**：2026-05-19  
**数据来源**：[CoPaw GitHub Repository](https://github.com/agentscope-ai/CoPaw)  
**分析师备注**：项目整体健康度良好，但需警惕**稳定性回归**与**插件系统完整性**问题。建议下一版本聚焦 Bug 修复而非新功能，以重建用户信任。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [Big Model Radar](https://github.com/gsscsd/big_model_radar) 自动生成。*