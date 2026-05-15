# OpenClaw 生态日报 2026-05-15

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-05-15 01:49 UTC

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

# OpenClaw 项目动态日报（2026-05-15）

---

## 1. 今日速览

OpenClaw 项目在 2026-05-15 继续保持高活跃度，过去24小时内共处理 **500 条 Issues 更新**（新开/活跃 476 条，关闭 24 条）和 **500 条 PR 更新**（待合并 450 条，已合并/关闭 50 条），显示出社区参与度与核心团队响应速度均处于高位。项目于当日发布 **4 个新版本**，重点推进依赖解耦、安全策略增强与多通道稳定性优化。整体开发节奏紧凑，技术债清理与用户体验改进并行推进。

---

## 2. 版本发布

### 🔖 v2026.5.14-beta.1（最新）
**核心变更：**
- **依赖精简**：将根级代理相关依赖（`proxy-agent`, `https-proxy-agent`, `minimatch`）移除，统一通过 `@openclaw/proxyline` 路由 Node 代理流量，降低核心包体积与潜在冲突风险。
- **Control UI 国际化增强**：新增 `pnpm ui:i18n:report` 命令，生成硬编码文本基线报告与语言回退元数据，提升多语言维护效率。

> ✅ **无破坏性变更**，但使用旧版代理配置的用户需确认是否依赖已移除的包，建议升级后测试网络连通性。

### 🔖 v2026.5.12（正式版）
**亮点改进：**
- **Leaner installs**：将 WhatsApp、Slack、Amazon Bedrock、Anthropic Vertex 等 provider/plugin 依赖从核心运行时剥离，实现“按需安装”，显著减少默认安装体积。
- **Telegram 稳定性提升**：隔离轮询机制、持久化本地消息缓存、优化群组媒体处理逻辑，降低消息丢失率。

> ⚠️ **迁移注意**：若使用上述服务，需显式安装对应插件（如 `@openclaw/provider-slack`），否则功能不可用。

---

## 3. 项目进展

今日合并/关闭的 **50 条 PR** 中，重点包括：

| PR | 进展摘要 | 链接 |
|----|--------|------|
| #81981 | 新增 Gateway 暴露策略检查（Policy 1.0），强制非 loopback 绑定、认证与速率限制 | [链接](https://github.com/openclaw/openclaw/pull/81981) |
| #81974 | 引入 secrets/auth 来源审计机制，支持内联密钥禁用与托管提供商强制 | [链接](https://github.com/openclaw/openclaw/pull/81974) |
| #81864 | 实现自然语言插件审批提示，替代原有技术性 debug 输出，提升用户体验 | [链接](https://github.com/openclaw/openclaw/pull/81864) |
| #81589 | 修复 Xiaomi MiMo 推理模型在多轮工具调用时返回 `400 Param Incorrect` 的问题 | [链接](https://github.com/openclaw/openclaw/pull/81589) |
| #79925 | 新增上下文压力感知续行机制（`continue_work` / `request_compaction`），允许代理自主控制轮次 | [链接](https://github.com/openclaw/openclaw/pull/79925) |

> 📌 整体项目在 **安全合规**（Policy 框架）、**多代理协作**（A2A 控制）、**模型兼容性**（MiMo/Anthropic）方向取得实质性推进。

---

## 4. 社区热点

### 🔥 高讨论 Issues（评论数 ≥10）

| Issue | 主题 | 诉求分析 | 链接 |
|------|------|--------|------|
| #14593 | Docker 中技能安装失败（`brew not installed`） | 用户期望容器化部署无需依赖 macOS 工具链，需跨平台技能安装方案 | [链接](https://github.com/openclaw/openclaw/issues/14593) |
| #25592 | 工具调用间文本泄露至消息通道 | 内部处理输出污染用户聊天界面，亟需输出隔离机制 | [链接](https://github.com/openclaw/openclaw/issues/25592) |
| #9443 | 请求预编译 Android APK 发布 | 移动端用户希望免编译直接使用，降低使用门槛 | [链接](https://github.com/openclaw/openclaw/issues/9443) |
| #73323 | Windows + Node 24 下 Gateway 运行时性能退化 | 多子系统超时与轮询卡顿，影响生产环境稳定性 | [链接](https://github.com/openclaw/openclaw/issues/73323) |
| #10659 | “掩码密钥”功能请求（防代理窥探 API Key） | 安全敏感场景下防止凭证泄露，对抗提示注入攻击 | [链接](https://github.com/openclaw/openclaw/issues/10659) |

> 💬 社区核心诉求集中于 **部署便利性**、**输出纯净度**、**跨平台稳定性** 与 **凭证安全**。

---

## 5. Bug 与稳定性

### 🚨 严重 Bug（含回归）

| Issue | 严重程度 | 状态 | 修复 PR | 链接 |
|------|--------|------|--------|------|
| #73323 | 高（生产环境退化） | OPEN | 无 | [链接](https://github.com/openclaw/openclaw/issues/73323) |
| #32473 | 高（Control UI 无法访问） | OPEN | 无 | [链接](https://github.com/openclaw/openclaw/issues/32473) |
| #38327 | 高（Google Vertex 模型崩溃） | OPEN | 无 | [链接](https://github.com/openclaw/openclaw/issues/38327) |
| #41330 | 中（iMessage 消息循环） | CLOSED | 已合并 | [链接](https://github.com/openclaw/openclaw/issues/41330) |
| #38439 | 中（Webchat 头像 404） | OPEN | #38923 | [Issue](https://github.com/openclaw/openclaw/issues/38439) / [PR](https://github.com/openclaw/openclaw/pull/38923) |

> ⚠️ Windows 平台性能问题与 Google Vertex 兼容性为当前最高优先级未修复项。

---

## 6. 功能请求与路线图信号

### 📌 高潜力功能（已有相关 PR 或强烈社区需求）

| 功能 | 关联 Issue | 进展信号 | 链接 |
|------|----------|--------|------|
| 掩码密钥（Masked Secrets） | #10659 | 高需求（👍4），Policy 框架已铺垫 | [链接](https://github.com/openclaw/openclaw/issues/10659) |
| Slack Block Kit 支持 | #12602 | 企业用户刚需，待 UI/消息渲染层改造 | [链接](https://github.com/openclaw/openclaw/issues/12602) |
| 分层引导文件加载 | #22438 | 节省 token 成本，已有设计讨论 | [链接](https://github.com/openclaw/openclaw/issues/22438) |
| 备份/恢复工具 | #13616 | 运维刚需，#40786 提出 `.gitignore` 式排除 | [链接](https://github.com/openclaw/openclaw/issues/13616) |
| 反应触发代理轮次 | #17840 | 交互模式创新，适合投票/反馈场景 | [链接](https://github.com/openclaw/openclaw/issues/17840) |

> ✅ **掩码密钥** 与 **备份工具** 最可能纳入 v2026.6 路线图。

---

## 7. 用户反馈摘要

### ✅ 满意点
- “依赖解耦后安装速度明显提升，终于不用拉整个 AWS SDK 了。”（v2026.5.12 用户）
- “Telegram 群组媒体处理更稳定，不再丢图。”（社区评论）

### ❌ 痛点
- “Docker 里跑 `onboard` 居然要 `brew`？我是 Linux 容器啊！”（#14593）
- “代理回复老对上一句话，上下文全乱了。”（#32296）
- “Control UI 设了头像还是 404，体验断裂。”（#41201）

### 🎯 使用场景
- 企业微信/飞书集成用于内部自动化（#39496）
- 多代理协作处理复杂工作流（#35203）
- 个人助手通过 iMessage/Telegram 提供日常服务（#41330）

---

## 8. 待处理积压

### ⏳ 长期未响应重要 Issue（>90 天）

| Issue | 类型 | 积压原因 | 链接 |
|------|------|--------|------|
| #6615 | 功能请求（exec 黑名单） | 安全策略相关，需 Policy 框架支持 | [链接](https://github.com/openclaw/openclaw/issues/6615) |
| #13610 | 功能请求（原生密钥管理） | 与 #10659 关联，需架构设计 | [链接](https://github.com/openclaw/openclaw/issues/13610) |
| #13597 | 文档请求（AWS 部署指南） | 云部署需求旺盛，但无专人撰写 | [链接](https://github.com/openclaw/openclaw/issues/13597) |

> 🔔 **建议维护者优先处理 #6615 与 #13610**，二者均属安全增强，且 Policy 1.0 已提供基础设施。

---

**报告生成时间：2026-05-15 23:59 UTC**  
**数据来源：** [OpenClaw GitHub Repository](https://github.com/openclaw/openclaw)

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向分析报告  
**报告时间：2026-05-15**  

---

## 1. 生态全景

当前个人 AI 助手与自主智能体开源生态呈现 **“核心框架引领、垂直场景分化、安全与可观测性成共识”** 的格局。以 OpenClaw 为代表的核心项目通过模块化、Policy 框架和 MCP 集成推动标准化；NanoBot、Zeroclaw、PicoClaw 等聚焦多通道集成与生产部署优化；LobsterAI、CoPaw 则强化企业级能力（插件持久化、工件渲染、测试覆盖）。整体开发节奏紧凑，但 **跨平台稳定性、模型兼容性、凭证安全** 成为共性痛点。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | 新版本发布 | 健康度评估（★/5） |
|------|-------------|---------|------------|------------------|
| **OpenClaw** | 500 | 500 | ✅ 4 个（含 beta） | ⭐⭐⭐⭐⭐（5.0） |
| **NanoBot** | 22 | 22 | ❌ | ⭐⭐⭐⭐☆（4.0） |
| **Zeroclaw** | 24 | 50 | ❌ | ⭐⭐⭐⭐☆（4.0） |
| **PicoClaw** | 9 | 24 | ✅ Nightly | ⭐⭐⭐☆☆（3.5） |
| **NanoClaw** | 1 | 22 | ❌ | ⭐⭐⭐⭐☆（4.5） |
| **IronClaw** | 50 | 50 | ❌ | ⭐⭐⭐⭐☆（4.0） |
| **LobsterAI** | 0 | 28 | ✅ v2026.5.14 | ⭐⭐⭐⭐⭐（5.0） |
| **CoPaw** | 50 | 50 | ✅ v1.1.7 | ⭐⭐⭐⭐☆（4.0） |
| **Moltis** | 2 | 0 | ❌ | ⭐⭐☆☆☆（2.0） |
| **TinyClaw / ZeptoClaw / EasyClaw** | 0 | 0 | ❌ | ⭐☆☆☆☆（1.0） |

> 注：健康度综合考量活跃度、响应速度、Bug 修复率与架构清晰度。

---

## 3. OpenClaw 在生态中的定位

**优势**：  
- **事实标准地位**：被 LobsterAI、CoPaw、PicoClaw 等直接集成（如 MCP Client、上下文压缩），生态辐射力最强。  
- **架构先进性**：唯一实现 Policy 1.0 安全框架、A2A 多代理协作、依赖按需加载的完整方案。  
- **社区规模**：单日 500+ Issues/PR，远超同类（第二名为 IronClaw/CoPaw 的 50），贡献者基数大。  

**技术路线差异**：  
- 相比 NanoBot/Zeroclaw 的“轻量通道集成”路线，OpenClaw 强调 **“核心最小化 + 插件生态”**；  
- 相比 IronClaw 的“Reborn 重构”激进路径，OpenClaw 采用渐进式演进，兼容性更优。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|--------|--------|--------|
| **凭证与密钥安全** | OpenClaw (#10659)、Zeroclaw (#6657)、Moltis (#996) | 掩码密钥、TLS 证书灵活性、防提示注入 |
| **多模型兼容性** | OpenClaw (#81589)、NanoBot (#3760)、CoPaw (#4314) | DeepSeek/Xiaomi MiMo 的 `reasoning_content` 处理 |
| **会话上下文完整性** | PicoClaw (#2702)、Zeroclaw (#6269)、CoPaw (#3957) | 多用户 sender 标识、推理内容保留、workspace 隔离 |
| **部署便利性** | OpenClaw (#14593)、NanoBot (#2880)、Moltis (#996) | Docker 跨平台支持、免编译 APK、非 localhost 部署 |
| **可观测性与调试** | Zeroclaw (#6641–42)、IronClaw (#3022)、CoPaw (#4057) | OTel 追踪、日志流、健康诊断工具 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|------|--------|--------|----------------|
| **OpenClaw** | 通用智能体核心引擎 | 开发者、集成商 | 模块化 Policy 框架、MCP 原生支持、A2A 协议 |
| **NanoBot** | 飞书/企业 IM 自动化 | 企业用户 | 轻量 Python 栈、强调通道稳定性 |
| **Zeroclaw** | 技能生态与可观测性 | 技能开发者、运维 | SQLite 持久化、后台技能审查、OTel 集成 |
| **LobsterAI** | 桌面端 AI 工作台 | 终端用户、插件开发者 | Electron + 本地 HTTP 预览、插件持久化 |
| **CoPaw** | 多 Agent 协同 RPA | 企业自动化团队 | Browser Use 增强、ChromaDB 向量记忆 |
| **IronClaw** | 高安全可控架构 | 金融/政务场景 | Reborn 模块化重构、Hook 沙箱、声明式配置 |

---

## 6. 社区热度与成熟度

- **快速迭代阶段**（高 PR/Issue 量，功能密集）：  
  **OpenClaw、IronClaw、CoPaw** —— 核心架构演进与功能交付并行，适合前沿开发者参与。  
- **质量巩固阶段**（高测试/修复率，低新 Issue）：  
  **LobsterAI、NanoClaw** —— 聚焦稳定性、跨平台兼容与开发者体验，适合生产环境采用。  
- **通道优化阶段**（中高活跃度，Bug 驱动）：  
  **NanoBot、Zeroclaw、PicoClaw** —— 解决特定平台（飞书/Telegram/Windows）集成问题，社区反馈闭环快。  
- **静默/衰退风险**：  
  **Moltis、TinyClaw 系列** —— 响应延迟、无代码活动，需警惕生态边缘化。

---

## 7. 值得关注的趋势信号

1. **安全合规成为刚需**：  
   “掩码密钥”（OpenClaw）、“TLS 证书自定义”（Moltis）、“exec 黑名单”（OpenClaw #6615）等需求集中爆发，预示 **AI 智能体将面临更严格的企业安全审计**。

2. **模型兼容性挑战加剧**：  
   DeepSeek、MiMo 等国产模型因 `reasoning_content` 格式差异导致工具调用失败（跨 4 个项目），**亟需统一 Provider 抽象层或官方适配指南**。

3. **从“功能堆叠”到“可运维性”转型**：  
   LobsterAI 的插件持久化、CoPaw 的单元测试覆盖、Zeroclaw 的 OTel 追踪，均指向 **企业级部署对可观测性、可维护性的高要求**。

4. **多代理协作语义标准化萌芽**：  
   PicoClaw 的“子 Agent 角色隔离”、OpenClaw 的 A2A 控制、CoPaw 的 workspace 隔离，反映 **复杂工作流需明确的上下文边界定义**。

> **对开发者的建议**：优先选择集成 OpenClaw MCP 或 Policy 框架的项目以降低长期维护成本；在涉及国产模型时预留适配层；重视会话上下文与凭证安全设计。

---  
**分析师备注**：生态整体健康，但需警惕“碎片化”风险——各项目的通道实现、安全策略、模型适配尚未形成统一标准，OpenClaw 有望成为事实协调者。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-05-15）

---

## 1. 今日速览

NanoBot 社区在 2026-05-14 至 2026-05-15 期间保持高度活跃，共处理 **22 条 Issues**（新开/活跃 10 条，关闭 12 条）和 **22 条 Pull Requests**（待合并 15 条，已合并/关闭 7 条），显示出强劲的开发与问题响应节奏。尽管无新版本发布，但多个关键功能（如任务规划、会话管理、安全增强）进入实现阶段，项目正向更稳定、可扩展的 Agent 平台演进。社区对飞书集成、WebUI 体验及模型兼容性问题的关注度显著上升。

---

## 2. 版本发布

**无新版本发布**。当前最新稳定版本仍为 `v0.1.5.post3` 系列，开发重点集中在功能迭代与稳定性修复，预计下一版本将整合近期 PR 中的多项增强特性。

---

## 3. 项目进展

今日有 **7 个 PR 被合并或关闭**，推动项目在多个方向取得实质性进展：

- **飞书集成稳定性提升**：通过 [#3775](https://github.com/HKUDS/nanobot/pull/3775) 注册无操作事件处理器，解决了 WebSocket 长连接下因未处理 `bot.added_v1`/`bot.deleted_v1` 事件导致的“processor not found”错误，显著改善飞书群聊场景的健壮性。
- **代理与网络配置增强**：[#3783](https://github.com/HKUDS/nanobot/pull/3783) 和 [#3784](https://github.com/HKUDS/nanobot/pull/3784) 引入 `ssl_verify` 配置项，支持企业代理环境下的 SSL 证书验证绕过，解决 HTTPS 工具调用失败问题。
- **会话持久化修复**：[#3779](https://github.com/HKUDS/nanobot/pull/3779) 修复快捷命令（如 `/help`）执行后 WebUI 会话历史丢失的问题，确保所有交互均被正确记录。
- **Telegram 语音转录支持**：[#3786](https://github.com/HKUDS/nanobot/pull/3786) 将转录配置参数正确传递至 Telegram 通道，实现语音消息自动转文本。
- **文档更新**：[#3483](https://github.com/HKUDS/nanobot/pull/3483) 补充 OpenCode Go 网关的配置说明，提升第三方服务集成体验。

此外，**多个重要功能 PR 仍处于开放状态**，预示未来版本方向：
- [#3791](https://github.com/HKUDS/nanobot/pull/3791)：引入 `plan` 工具，支持任务分解与进度跟踪，增强复杂任务处理能力。
- [#3788](https://github.com/HKUDS/nanobot/pull/3788)：实现目标状态流式传输与 WebUI 历史合并，优化长任务用户体验。
- [#3785](https://github.com/HKUDS/nanobot/pull/3785)：集成 OpenCode Go 网关，扩展多模型统一接入能力。

---

## 4. 社区热点

以下 Issues 和 PR 引发较高讨论，反映核心用户诉求：

- **#2880 [BUG] 无论发什么消息都回复报错**（[链接](https://github.com/HKUDS/nanobot/issues/2880)）  
  尽管标记为 `stale`，该 Issue 仍获 17 条评论，用户反馈即使重装也无法解决通用回复失败问题，凸显基础通信链路存在潜在缺陷，需优先排查。

- **#3780 支持更安全的文件访问控制与脚本审查（Windows 无沙箱场景）**（[链接](https://github.com/HKUDS/nanobot/issues/3780)）  
  企业用户提出在非沙箱 Windows 环境下的安全顾虑，呼吁细粒度文件权限与脚本审计机制，直指生产部署痛点。

- **#3772 nanobot在飞书群聊组被其他机器人艾特时出错**（[链接](https://github.com/HKUDS/nanobot/issues/3772)）  
  与 PR #3775 直接关联，暴露飞书事件处理逻辑漏洞，社区快速响应并修复，体现通道集成的成熟度挑战。

- **#3070 模型路由功能请求**（[链接](https://github.com/HKUDS/nanobot/issues/3070)）  
  用户希望根据任务复杂度动态路由至性价比模型，相关 PR #3121 已提供基于 Hook 的扩展机制，具备落地基础。

---

## 5. Bug 与稳定性

按严重程度排序的今日关键 Bug：

| 严重程度 | Issue | 描述 | 修复状态 |
|--------|------|------|--------|
| ⚠️ 高 | [#2880](https://github.com/HKUDS/nanobot/issues/2880) | 通用消息回复报错，影响核心功能 | ❌ 无 fix PR，需紧急排查 |
| ⚠️ 高 | [#3790](https://github.com/HKUDS/nanobot/issues/3790) | WebUI 会话内容打印错乱，需手动刷新 | ❌ 无 fix PR，影响用户体验 |
| ⚠️ 中 | [#3760](https://github.com/HKUDS/nanobot/issues/3760) | DeepSeek V4 Flash 因 `reasoning_content` 格式导致 400 错误 | ✅ 已有相关修复方向（见 PR #3762 对 Codex 异常的标准化） |
| ⚠️ 中 | [#3754](https://github.com/HKUDS/nanobot/issues/3754) | DeepSeek 模型忽略指定文件内容，自行编造 | ❌ 无 fix PR，涉及工具调用可靠性 |
| ⚠️ 低 | [#3718](https://github.com/HKUDS/nanobot/issues/3718) | Cron 提醒消息缺少 streamid | ❌ 无 fix PR，影响日志追踪 |

> 注：PR #3762 虽未直接针对 #3760，但其对 provider 异常的重试机制优化有助于缓解类似 transient 错误。

---

## 6. 功能请求与路线图信号

用户提出的新功能中，以下具备高优先级落地潜力：

- **任务规划与长任务支持**：PR [#3791](https://github.com/HKUDS/nanobot/pull/3791) 和 [#3460](https://github.com/HKUDS/nanobot/pull/3460) 分别实现 `plan` 工具与 `LongTaskTool`，响应 #3689 对会话中断后上下文保留的需求，预计将纳入下一版本。
- **会话管理与导出**：PR [#3777](https://github.com/HKUDS/nanobot/pull/3777)、[#3778](https://github.com/HKUDS/nanobot/pull/3778) 提供 CLI 会话列表/导出及 `/export` 命令，满足企业用户对审计与数据迁移的需求。
- **健康诊断工具**：PR [#3776](https://github.com/HKUDS/nanobot/pull/3776) 实现 `nanobot doctor` 命令，呼应 #3769 的提议，提升运维效率。
- **安全策略增强**：Issue #3768 提议 DM 发送者白名单机制，PR [#3774](https://github.com/HKUDS/nanobot/pull/3774) 已开启聊天原生配对流程，为安全准入打下基础。

---

## 7. 用户反馈摘要

从 Issues 评论提炼真实用户声音：

- **企业部署痛点**：多名用户（如 #3780）强调在 **Windows 无沙箱环境** 下共享使用 NanoBot 的安全风险，担忧误操作文件，呼吁细粒度权限控制。
- **模型兼容性焦虑**：DeepSeek、GLM、Qwen 等国产模型在工具调用和推理内容处理上频繁报错（#1998, #3754, #3760），用户期望更统一的 provider 抽象层。
- **飞书集成不稳定**：群聊中被其他机器人 @ 提及即崩溃（#3772），暴露事件处理不完整，影响团队协作场景可用性。
- **WebUI 体验割裂**：会话历史丢失（已由 #3779 修复）、打印错乱（#3790）、Markdown 预加载性能问题（#3782）集中反映前端体验需优化。
- **成本控制需求**：#3070 提出模型路由以节省 token 费用，代表付费用户对经济性的高度敏感。

---

## 8. 待处理积压

以下长期未响应 Issue 需维护者关注：

- **#2880 [BUG] 无论发什么消息都回复报错**（创建于 2026-04-07，更新 2026-05-14）  
  虽标记 `stale`，但持续有用户反馈，且无有效排查进展，可能涉及核心消息循环逻辑，建议分配资源深入诊断。

- **#1998 nanobot对coder类模型兼容问题！**（创建于 2026-03-14，更新 2026-05-14）  
  关于 GLM5/Qwen3.5 等模型因 JSON 参数格式报错的问题长期存在，影响开发者体验，需推动 provider 层适配或文档明确限制。

- **#3647 建议使用本地 tokenizer 估算 token**（创建于 2026-05-06，更新 2026-05-14）  
  依赖网络获取 `tiktoken` 编码可能导致启动延迟，本地 tokenizer 可提升离线可用性，属性能与可靠性优化项。

---

**总结**：NanoBot 正处于功能快速迭代期，社区响应迅速，但在模型兼容性、企业级安全与 WebUI 稳定性方面仍面临挑战。建议下一版本聚焦核心 Bug 修复与飞书/DeepSeek 等关键通道的健壮性提升。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报（2026-05-15）

---

## 1. 今日速览

Zeroclaw 项目在 2026-05-15 继续保持高活跃度，社区贡献与核心开发并行推进。过去24小时内共产生 **24 条 Issues 更新**（新开/活跃 20 条，关闭 4 条）和 **50 条 PR 更新**（待合并 47 条，已合并/关闭 3 条），显示出强烈的开发迭代意愿。尽管无新版本发布，但多个高优先级 Bug 被标记为 `accepted` 或 `in-progress`，且关键功能如技能管理、遥测追踪、通道稳定性等均有实质性进展。项目整体处于快速演进阶段，技术债清理与用户体验优化并重。

---

## 2. 版本发布

**无新版本发布**。当前最新稳定版本仍为 `v0.7.5`，下一个目标版本 `v0.7.6` 的功能规划已在 Issue #6253 中明确，聚焦于 **Zeroclaw Skills 支持与 UX 改进**。

---

## 3. 项目进展

今日有 **3 个 PR 被合并或关闭**，虽数量不多，但涉及关键基础设施修复：

- **#6627 [CLOSED]**：修复了在多轮对话中工具结果图像被重复回放的问题（`provider` 组件），提升了视觉上下文一致性。
- **#6634 [CLOSED]**：解决了 cron 调度的 webhook 回调丢失 `thread_id` 的问题，确保下游服务能正确路由消息。
- **#6229 [CLOSED]**：修复了 Telegram 通道在 `mention_only=true` 时仍响应媒体消息的缺陷，增强了配置行为的可预测性。

此外，多个大型 PR 持续更新并接近合并，包括：
- **#6667**：引入后台技能审查分叉机制与 `skill_manage` 工具，填补 #4619 的功能缺口，推动技能生态闭环。
- **#6553**：修复 SSE `/logs` 流中断问题，并增加构建版本戳与健康心跳，显著改善远程/Docker 部署的可观测性。
- **#6649**：为 ACP（Agent Control Protocol）会话添加 SQLite 持久化支持，解决编辑器会话断连后上下文丢失问题。

这些进展标志着项目在 **可观测性、会话持久化、技能管理** 三大方向上迈出关键步伐。

---

## 4. 社区热点

以下 Issues/PRs 引发最多讨论与关注：

| 编号 | 类型 | 热度 | 链接 |
|------|------|------|------|
| #6647 | Issue | 高（4 评论） | [Cron job output not routed to configured channels](https://github.com/zeroclaw-labs/zeroclaw/issues/6647) —— 用户报告定时任务输出无法推送至 Telegram，属 S1 级阻塞问题，已被接受。 |
| #6269 | Issue | 高（4 评论） | [Context compressor drops reasoning_content](https://github.com/zeroclaw-labs/zeroclaw/issues/6269) —— 长对话压缩导致推理内容丢失，影响 DeepSeek 等模型体验，正在修复中。 |
| #6667 | PR | 高（持续更新） | [feat(skills): background review fork + skill_manage tool](https://github.com/zeroclaw-labs/zeroclaw/pull/6667) —— 社区高度期待的技能管理自动化方案，有望成为 v0.7.6 核心特性。 |

**分析**：用户核心诉求集中在 **任务输出可靠性**（cron → channel 路由）、**推理完整性**（reasoning_content 保留）、以及 **技能开发体验**（标准化 manifest 支持、自动化改进）。维护者响应迅速，多个问题已标记 `accepted` 或 `in-progress`，体现良好协作节奏。

---

## 5. Bug 与稳定性

按严重程度排序的高危问题：

| 编号 | 严重性 | 状态 | 是否有 Fix PR | 链接 |
|------|--------|------|----------------|------|
| #6647 | S1（工作流阻塞） | `accepted` | ❌ 暂无 | [Cron output not routed](https://github.com/zeroclaw-labs/zeroclaw/issues/6647) |
| #6646 | S1（工作流阻塞） | `accepted` | ❌ 暂无 | [web_search_tool/web_fetch not firing via Telegram](https://github.com/zeroclaw-labs/zeroclaw/issues/6646) |
| #6269 | S2（功能降级） | `in-progress` | ✅ #6606 | [Reasoning content dropped](https://github.com/zeroclaw-labs/zeroclaw/issues/6269) |
| #6105 | S2（功能降级） | `blocked` | ❌ 依赖其他修复 | [Cron job lacks context](https://github.com/zeroclaw-labs/zeroclaw/issues/6105) |
| #6657 | S1（安全风险） | `in-progress` | ✅ #6662 | [TLS hostname verification disabled (RUSTSEC-2026-0141)](https://github.com/zeroclaw-labs/zeroclaw/issues/6657) |

> ⚠️ 两个 S1 级阻塞问题亟待修复，建议优先分配资源。

---

## 6. 功能请求与路线图信号

以下功能请求已获得 `accepted` 或明确开发路径，极可能纳入 **v0.7.6**：

- **技能系统增强**（#6253）：统一 `manifest.toml` 与 `SKILL.toml` 支持（#6645）、后台自动审查（#6667）、安装脚本支持 musl aarch64（#6658）。
- **遥测与可观测性**：OTel 追踪嵌套（#6641）、完整 prompt/completion 捕获（#6642）、文件日志轮转（#6611）。
- **通道体验优化**：Telegram 工具调用进度流（#6663）、WebSocket  steering 时保留已提交输出（#6661）。
- **部署与运维**：Docker 仪表盘路径修复（#6621）、ACP 会话持久化（#6649）。

这些需求反映用户希望 Zeroclaw 在 **生产可用性、调试能力、跨平台兼容性** 上进一步提升。

---

## 7. 用户反馈摘要

从 Issues 评论中提炼的真实声音：

- **痛点**：
  - “Cron 任务结果只在 Web 面板可见，Telegram 收不到通知，完全违背自动化初衷。”（#6647）
  - “用 LM Studio 搭的本地模型，web_search 工具在 Telegram 里根本不触发。”（#6646）
  - “技能包明明有 `manifest.toml`，但 `skill_manage` 只认 `SKILL.toml`，文档也没说清楚。”（#6645）

- **满意点**：
  - “维护者对 OTel 追踪的响应非常快，#6009 和 #6190 的跟进很专业。”（#6641）
  - “v0.7.5 的 partial streaming 已经很棒，如果能显示工具调用进度就完美了。”（#6663）

- **使用场景**：
  - 个人助手（定时提醒、信息检索）
  - 开发辅助（技能自动优化、代码审查）
  - 企业集成（webhook 回调、ACP 编辑器会话）

---

## 8. 待处理积压

以下重要 Issue/PR 长期未获响应，建议维护者关注：

| 编号 | 类型 | 创建时间 | 状态 | 链接 |
|------|------|----------|------|------|
| #5122 | Issue | 2026-03-29 | `no-stale`，P1 | [web_fetch allowed_private_hosts 失效](https://github.com/zeroclaw-labs/zeroclaw/issues/5122) —— 安全相关，影响私有网络访问 |
| #6074 | Issue | 2026-04-24 | `in-progress`，P2 | [审计 153 个被误回滚的提交](https://github.com/zeroclaw-labs/zeroclaw/issues/6074) —— 技术债清理关键任务 |
| #5652 | PR | 2026-04-11 | `needs-author-action` | [Anthropic/Bedrock 原生扩展思考支持](https://github.com/zeroclaw-labs/zeroclaw/pull/5652) —— 高级推理能力，社区期待已久 |

> 🔔 建议对 #5122 和 #6074 分配专项处理时间，避免技术债累积影响稳定性。

--- 

**报告生成时间**：2026-05-15  
**数据来源**：GitHub Zeroclaw 仓库公开数据  
**分析师备注**：项目健康度良好，活跃度极高，需警惕 S1 级阻塞问题积压。技能系统与可观测性为当前演进主线。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-05-15）

---

## 1. 今日速览

PicoClaw 项目在过去24小时内保持高活跃度，共产生 **9条 Issues 更新** 和 **24条 PR 更新**，其中 **22个 PR 仍处于待合并状态**，表明开发节奏紧凑但合并流程审慎。社区对多用户会话管理、子 Agent 角色隔离及 Telegram 集成稳定性等问题关注集中。项目整体处于功能迭代与稳定性修复并行推进阶段，技术债清理（如 OpenAI API 迁移、配置格式统一）持续推进。

---

## 2. 版本发布

✅ **新版本发布：`v0.2.8-nightly.20260515.794eb04f`**

- **类型**：Nightly Build（自动化构建，可能存在不稳定）
- **更新范围**：基于 `main` 分支最新提交，包含近期未正式发布的功能与修复
- **建议**：仅推荐测试环境使用，生产环境请谨慎评估
- **完整变更日志**：[点击查看](https://github.com/sipeed/picoclaw/compare/v0.2.8...main)

> ⚠️ 无破坏性变更说明，但 Nightly 版本不保证向后兼容性。

---

## 3. 项目进展

今日 **2个 PR 被合并/关闭**，重点推进以下方向：

- **#2832（已关闭）**：实现模型获取与保存目录支持（后端 API `/api/models/fetch`），为前端模型管理功能打下基础，属于 [#2752](https://github.com/sipeed/picoclaw/pull/2752) 拆分任务的第二部分。
- **#2171（Issue 已关闭）**：完成 OpenAI 响应 API（Responses API）迁移评估，确认可行路径，推动 provider 层向官方推荐架构演进。

此外，**22个 PR 待合并**，涵盖：
- Telegram 论坛主题路由优化（#2772、#2776、#2779）
- Agent 工具反馈机制增强（#2778）
- 配置文档 V3 格式同步（#2766）
- Web 前端流式聊天体验重构（#2587）

项目正向 **多通道精细化控制** 与 **用户体验一致性** 迈出关键步伐。

---

## 4. 社区热点

### 🔥 高讨论度 Issues

| Issue | 主题 | 评论数 | 核心诉求 |
|------|------|--------|--------|
| [#629](https://github.com/sipeed/picoclaw/issues/629) | LLM 调用失败后无重试机制 | 14 | 要求增强 provider 层容错能力，避免任务因临时 HTTP 500 挂起 |
| [#2702](https://github.com/sipeed/picoclaw/issues/2702) | 多用户群聊中历史消息缺失发送者标识 | 3 | 在默认会话作用域下，需保留历史消息的 sender 信息以支持上下文理解 |
| [#2775](https://github.com/sipeed/picoclaw/issues/2775) | 子 Agent 继承根 Agent 角色定义导致身份混淆 | 2 | 请求实现子 Agent 独立加载角色专属系统提示（如 Planner、Builder） |

> 💡 社区明显关注 **多 Agent 协作语义清晰性** 与 **会话上下文完整性**，反映出用户已在复杂工作流中深度使用 PicoClaw。

---

## 5. Bug 与稳定性

按严重程度排序：

| Issue | 严重性 | 描述 | 是否有 Fix PR |
|------|--------|------|---------------|
| [#2721](https://github.com/sipeed/picoclaw/issues/2721) | 🔴 高 | Anthropic API 中 `tool_use_id` 400 错误，会话历史竞争条件仍存在（v0.2.5） | ❌ 无 |
| [#2859](https://github.com/sipeed/picoclaw/issues/2859) | 🔴 高 | 小米 MIMO 模型多轮对话参数错误（400），影响 WeChat 通道可用性 | ❌ 无 |
| [#2798](https://github.com/sipeed/picoclaw/issues/2798) | 🟠 中 | Telegram 发送 PDF 后流会话中断，疑似媒体处理逻辑缺陷 | ❌ 无 |
| [#2795](https://github.com/sipeed/picoclaw/issues/2795) | 🟠 中 | 对话历史仅显示最后一条用户消息，前端渲染或压缩策略异常 | ❌ 无 |
| [#2787](https://github.com/sipeed/picoclaw/issues/2787) | 🟡 低 | 消息时间戳统一使用 `session.updated`，缺乏个体时间精度 | ❌ 无 |

> ⚠️ 多个 provider 相关错误（Anthropic、Xiaomi）表明跨模型兼容性仍是稳定性短板。

---

## 6. 功能请求与路线图信号

| 功能方向 | 相关 Issue/PR | 纳入可能性 |
|--------|---------------|------------|
| **子 Agent 角色隔离** | #2775 | ⭐⭐⭐ 高（已有架构讨论，需系统提示动态加载机制） |
| **Telegram 论坛主题精细化控制** | #2779（PR 待合并） | ⭐⭐⭐ 高（维护者主动推进） |
| **Web 前端流式聊天 UX** | #2587（PR 待合并） | ⭐⭐⭐ 高（长期 PR，涉及核心体验） |
| **OpenAI Responses API 迁移** | #2171（已评估） | ⭐⭐ 中（技术债清理，非紧急） |
| **Docker 根目录部署支持** | #2812（PR 待合并） | ⭐⭐ 中（开发者体验优化） |

> 📌 下一版本 likely 聚焦 **Telegram 集成增强** 与 **多 Agent 语义隔离**。

---

## 7. 用户反馈摘要

- **痛点**：
  - “长时间任务中遇到 HTTP 500 就卡住，没有任何重试提示”（#629）
  - “子 Agent 都自称是‘根 Agent’，完全分不清谁该做什么”（#2775）
  - “PDF 发完就断流，OpenClaw 能用但 PicoClaw 不行”（#2798）
- **使用场景**：
  - 多用户 Discord/Telegram 群组协作
  - 基于 cron 的自动化 Agent 任务调度
  - 小米 MIMO 模型 + WeChat 企业集成
- **满意度**：
  - 肯定 Telegram 论坛主题支持的方向（#2779 获点赞）
  - 认可 Nightly 构建快速响应能力

---

## 8. 待处理积压

| 类型 | 编号 | 标题 | 积压时长 | 建议 |
|------|------|------|----------|------|
| Issue | #629 | LLM 调用失败无重试 | 83天 | 🔴 高优先级，影响核心可靠性，建议优先修复 |
| Issue | #2702 | 多用户会话 sender 缺失 | 17天 | 🟠 中优先级，涉及会话语义完整性 |
| PR | #2587 | Web 流式聊天 UX | 26天 | 🟠 长期未合并，可能需维护者 review 阻塞点 |
| PR | #2551 | 通道标识标准化重构 | 29天 | 🟠 架构级变更，需谨慎评估影响 |

> 🛎️ **提醒维护者**：#629 和 #2551 分别为关键 Bug 与架构改进，建议本周内响应。

--- 

**报告生成时间**：2026-05-15  
**数据来源**：[PicoClaw GitHub Repository](https://github.com/sipeed/picoclaw)

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-05-15）

---

## 1. 今日速览

NanoClaw 在 2026-05-15 继续保持高活跃度开发节奏，**过去24小时内共处理 22 条 Pull Request（PR）更新**，其中 **13 条已合并/关闭，9 条仍处于待合并状态**，显示出团队高效的代码集成能力。尽管无新版本发布，但功能迭代密集，尤其在技能本地化、多平台集成与架构优化方面取得显著进展。社区贡献者 @fresholdidea 主导了多项技能与工具链增强，推动项目向“可自托管、可定制”方向深化。唯一新增 Issue 报告了一个低优先级的容器启动竞态条件问题，暂未影响核心功能。

---

## 2. 版本发布

**无新版本发布**。  
当前开发重点集中于功能增强与内部架构优化，而非版本迭代。

---

## 3. 项目进展

今日共 **13 条 PR 被合并或关闭**，标志着多个关键功能落地：

- **技能本地化与增强**：  
  通过 #2451、#2453、#2448、#2449 等 PR，项目将 `audit-website`、`copy-grader`、`social-listening`、`linkedin-community` 等上游技能本地化至 `.claude/skills/` 目录，提升可维护性与部署独立性（[PR #2451](https://github.com/nanocoai/nanoclaw/pull/2451) | [PR #2453](https://github.com/nanocoai/nanoclaw/pull/2453) | [PR #2448](https://github.com/nanocoai/nanoclaw/pull/2448) | [PR #2449](https://github.com/nanocoai/nanoclaw/pull/2449)）。

- **MCP 生态集成扩展**：  
  新增对 **Serper**（#2445）、**Firecrawl**（#2446）、**Reddit**（#2447）三大外部数据源的只读 MCP 支持，并配套提供专用技能（如 `/serper-search`、`/firecrawl`、`/reddit-research`），强化了信息检索与竞品分析能力（[PR #2445](https://github.com/nanocoai/nanoclaw/pull/2445) | [PR #2446](https://github.com/nanocoai/nanoclaw/pull/2446) | [PR #2447](https://github.com/nanocoai/nanoclaw/pull/2447)）。

- **网站审计栈重构**：  
  #2455 将原有依赖外部服务的 `audit-website` 技能替换为基于 **Lighthouse + axe + linkinator** 的自托管 Node.js 栈，规避 Cloudflare 对 AI 工具的拦截，提升稳定性与可控性（[PR #2455](https://github.com/nanocoai/nanoclaw/pull/2455)）。

- **文档与配置完善**：  
  #2454 新增 `docs/onecli-secrets.md`，统一 OneCLI 凭据管理说明，提升部署透明度（[PR #2454](https://github.com/nanocoai/nanoclaw/pull/2454)）。

> 整体来看，项目在“技能生态”、“数据接入”、“自托管能力”三大方向同步推进，为后续多租户与生产环境部署打下坚实基础。

---

## 4. 社区热点

**无高评论量 Issue 或 PR**。  
当前所有 PR 评论数均为 0，表明社区互动以代码贡献为主，讨论集中于开发层面而非用户反馈。唯一活跃 Issue #2466 仅获 1 条评论，属技术细节确认，未引发广泛讨论。

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | 状态 |
|--------|------|------|------|
| **Low** | [#2466](https://github.com/nanocoai/nanoclaw/issues/2466) | `wakeContainer` 在脚本与主机清扫并发时触发重复容器启动，导致同一任务被两个容器独立处理 | **Open**，无对应 fix PR |

> 该问题影响资源利用效率，但非功能阻断性缺陷。建议后续引入分布式锁或任务去重机制。

---

## 6. 功能请求与路线图信号

从近期 PR 可识别以下潜在路线图方向：

- **多 AI 提供商支持**：  
  #2475 与 #2474 提出让 Codex 代理与 Claude Code 共享技能与人格配置，并允许在 setup 阶段选择 CLI 引擎（Claude / Codex），预示项目正迈向**多模型兼容架构**（[PR #2475](https://github.com/nanocoai/nanoclaw/pull/2475) | [PR #2474](https://github.com/nanocoai/nanoclaw/pull/2474)）。

- **会话管理精细化**：  
  #2471 与 #2472 针对 Slack 的 `per-thread` 模式优化 threadId 路由，解决会话折叠问题，反映对**复杂对话上下文管理**的持续投入（[PR #2471](https://github.com/nanocoai/nanoclaw/pull/2471) | [PR #2472](https://github.com/nanocoai/nanoclaw/pull/2472)）。

- **CLI 模式替代 Agent SDK**：  
  #2470 引入 `useCliMode` 配置，通过交互式配额运行查询，可能用于规避 SDK 限制或提升响应速度，暗示对**配额策略灵活性**的需求增长（[PR #2470](https://github.com/nanocoai/nanoclaw/pull/2470)）。

---

## 7. 用户反馈摘要

**无直接用户反馈内容**。  
当前 Issues 与 PR 均由核心贡献者或内部团队提交，缺乏终端用户声音。建议后续通过社区渠道（如 Discord、用户调研）收集实际使用场景与痛点。

---

## 8. 待处理积压

| 类型 | 编号 | 标题 | 创建时间 | 状态 | 提醒 |
|------|------|------|--------|------|------|
| PR | [#2468](https://github.com/nanocoai/nanoclaw/pull/2468) | fix(agent-route): reject unsafe forwarded attachments | 2026-05-14 | Open | **安全相关**，涉及附件转发路径遍历风险，建议优先审查 |
| PR | [#2476](https://github.com/nanocoai/nanoclaw/pull/2476) | Feat/restart no nanoclaw | 2026-05-14 | Open | 功能描述模糊，需维护者确认意图 |
| Issue | [#2466](https://github.com/nanocoai/nanoclaw/issues/2466) | Duplicate container spawn race | 2026-05-14 | Open | 虽为 Low 优先级，但涉及资源浪费，建议排期修复 |

> 建议维护者重点关注 #2468（安全风险）与 #2466（稳定性隐患），避免技术债累积。

---

**项目健康度评估**：⭐⭐⭐⭐☆（4.5/5）  
开发活跃、功能迭代清晰、安全修复及时，唯缺用户侧反馈闭环。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-05-15）

---

## 1. 今日速览

IronClaw 项目在 Reborn 架构重构主线持续高强度推进，过去24小时共产生 **50条 Issues 更新**（新开/活跃48条，关闭2条）和 **50条 PR 更新**（待合并40条，已合并/关闭10条），活跃度处于高位。核心团队聚焦于 **Reborn 架构的模块化落地**，涵盖 WebUI Beta 路径、事件流集成测试、存储统一抽象及钩子框架扩展。尽管无新版本发布，但多个关键基础设施 PR 进入集成阶段，标志着架构迁移从设计向实现加速过渡。

---

## 2. 版本发布

**无新版本发布**。当前开发重心仍集中在 Reborn 架构的内部重构与模块解耦，尚未形成面向用户的稳定发布候选。

---

## 3. 项目进展

今日有 **10个 PR 被合并或关闭**，主要推动以下方向：

- **Agent Loop 架构分层完成**：`arch(ws-1)` 至 `arch(ws-3.5)` 系列 PR（[#3551](https://github.com/nearai/ironclaw/pull/3551)、[#3552](https://github.com/nearai/ironclaw/pull/3552)、[#3553](https://github.com/nearai/ironclaw/pull/3553)、[#3643](https://github.com/nearai/ironclaw/pull/3643)）相继合并，完成了策略特质（strategy traits）与循环家族注册机制的基础层构建，为后续 planner 与默认策略实现（[#3555](https://github.com/nearai/ironclaw/pull/3555)、[#3556](https://github.com/nearai/ironclaw/pull/3556)）提供稳定底座。
- **文件系统存储统一抽象推进**：`FilesystemRunStateStore`、`FilesystemApprovalRequestStore` 和 `FilesystemCapabilityLeaseStore` 相继迁移至统一的 `get/put` 接口（[#3672](https://github.com/nearai/ironclaw/pull/3672)、[#3671](https://github.com/nearai/ironclaw/pull/3671)、[#3670](https://github.com/nearai/ironclaw/pull/3670)），提升存储层一致性与可测试性。
- **WebUI Beta 关键路径拆分**：`BeforeInboundPolicy` seam（[#3623](https://github.com/nearai/ironclaw/issues/3623)）和 WebUI 入站 DTO 契约（[#3624](https://github.com/nearai/ironclaw/issues/3624)）相关 PR 进入实施阶段，支撑 WebChat v2 的早期策略拦截能力。

> 整体评估：Reborn 架构的 **M2（入站工作流）与 M4（宿主内核）模块**取得实质性进展，为后续跨服务集成打下基础。

---

## 4. 社区热点

### 🔥 最活跃 Issue：[#2987](https://github.com/nearai/ironclaw/issues/2987) — *Track Reborn architecture landing strategy and grouped PR plan*
- **评论数：44** | **标签：EPIC, reborn, risk: high**
- 该 Issue 作为 Reborn 架构落地的总控看板，持续吸引核心开发者讨论分组 PR 的拆分策略、集成顺序与风险控制。最新评论聚焦于 **如何避免巨型 stacked PR** 并确保各模块可独立验证。
- **背后诉求**：团队亟需清晰的、可并行推进的集成路线图，以降低重构风险并加速交付。

### 其他高关注度议题：
- [#3022](https://github.com/nearai/ironclaw/issues/3022)（9 评论）：事件子系统集成测试缺失被视为 **Reborn cutover 的关键阻塞点**，需跨服务验证 V1 生产者兼容性。
- [#3036](https://github.com/nearai/ironclaw/issues/3036)（3 评论）：提出“配置即代码”需求，反映运维方对 **声明式、可审计的租户配置** 的强烈诉求。

---

## 5. Bug 与稳定性

### ⚠️ 高优先级 Bug
- **[#3673](https://github.com/nearai/ironclaw/issues/3673)**：`openai_compatible` 提供程序在转发请求时丢弃 `reasoning_content`，导致 DeepSeek v4-pro 多轮工具调用失败。
  - **严重程度：高**（影响特定 LLM 工作流）
  - **状态：新报告，尚无 fix PR**，需检查 `nearai_chat.rs` 中的字段映射逻辑。

> 其余 Issues 多为架构设计或功能请求，未报告运行时崩溃或数据丢失类严重缺陷。

---

## 6. 功能请求与路线图信号

以下功能请求已获得明确开发响应，预计将纳入 Reborn 主线：

| 功能请求 | 关联 PR/Issue | 状态 |
|--------|--------------|------|
| **Loop Hooks 框架** | [#3523](https://github.com/nearai/ironclaw/issues/3523) + [#3573](https://github.com/nearai/ironclaw/pull/3573) | ✅ 已合并 v1 实现，后续扩展中（WASM 执行、事件触发等） |
| **WebUI Beta 入站策略拦截** | [#3623](https://github.com/nearai/ironclaw/issues/3623) | 🔄 开发中，P0 优先级 |
| **通道迁移至 ProductAdapter**（Telegram/Slack/WeChat） | [#3577](https://github.com/nearai/ironclaw/issues/3577) 及子 Issue | 📋 已制定迁移指南，分步实施 |
| **统一存储抽象** | [#3419](https://github.com/nearai/ironclaw/issues/3419) | 🔄 文件系统层已完成，数据库层待跟进 |

> 信号解读：项目正从“架构设计”转向“垂直功能交付”，**WebUI 与通道迁移**将成为下一阶段用户可见的亮点。

---

## 7. 用户反馈摘要

- **痛点**：
  - Telegram 通道在 NEAR Foundation 实例上不可用（[#2902](https://github.com/nearai/ironclaw/issues/2902)），用户期待官方修复或迁移指南。
  - 当前配置方式混乱（`.env` + JSON + 文档），运维成本高（[#3036](https://github.com/nearai/ironclaw/issues/3036)）。
- **满意点**：
  - Reborn 的模块化设计（如 M2/M4 分离）获得内部开发者认可，认为“终于可以独立测试入站逻辑”（见 [#3629](https://github.com/nearai/ironclaw/issues/3629) 讨论）。
  - Hook 框架的安全审计与沙箱设计被评价为“兼顾灵活性与边界控制”。

---

## 8. 待处理积压

以下重要 Issue 长期未获实质性响应，建议维护者优先处理：

- **[#2902](https://github.com/nearai/ironclaw/issues/2902)**（Telegram 不可用）：创建于 2026-04-23，仅 1 条评论，**影响生产环境可用性**，需确认是否与 Reborn 迁移相关。
- **[#3039](https://github.com/nearai/ironclaw/issues/3039)**（Reborn 最终集成 PR 审查清单）：作为发布门禁的关键文档，尚未完成，**阻碍 staging 合并**。
- **[#3118](https://github.com/nearai/ironclaw/issues/3118)**（原生内存存储服务）：P1 优先级，但无对应 PR，**可能成为性能瓶颈**。

> 建议：为 [#2902] 分配诊断资源，并推动 [#3039] 清单落地以解锁集成流程。

--- 

**报告生成时间：2026-05-15**  
**数据来源：GitHub IronClaw 仓库公开数据**

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-05-15）

---

## 1. 今日速览

LobsterAI 在 2026 年 5 月 14 日迎来一次高强度开发冲刺，**28 条 PR 全部完成合并或关闭**，无新增 Issue，整体活跃度极高。项目发布新版本 `v2026.5.14`，聚焦于 OpenClaw 上下文压缩、插件管理增强与工件（Artifacts）渲染架构重构。技术债清理与安全优化同步推进，包括依赖升级、MCP 架构迁移及多平台兼容性修复。社区无公开讨论，但内部开发节奏紧凑，表明团队正集中推进核心功能迭代。

---

## 2. 版本发布

### 🔖 [LobsterAI v2026.5.14](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.5.14)（2026-05-14）

**核心更新内容：**
- **OpenClaw 上下文压缩优化**：引入实时上下文使用率指示器，支持会话入口刷新，提升长对话场景下的资源效率（#1969）
- **插件管理系统升级**：新增高级配置界面，支持用户插件持久化存储至 `userData` 目录，避免应用升级时丢失第三方扩展（#1963, #1979）
- **工件预览架构重构**：HTML/Excel/PPTX 文件类工件全面改用本地 HTTP 服务器预览模式，解决资源加载 403、路径越界崩溃等问题（#1983, #1977）
- **MCP 架构迁移**：弃用自建 `mcp-bridge`，全面接入 OpenClaw 原生 MCP Client，支持 stdio/sse/streamable-http 三种传输协议（#1980）

**破坏性变更与迁移注意：**
- 用户安装插件目录从应用安装路径迁移至 `userData`，旧插件需手动迁移或重新安装（#1979）
- MCP 配置字段由自定义格式改为 OpenClaw 标准 `mcp.servers` 结构，需更新配置文件（#1980）
- HTML 工件预览不再支持内联 `srcDoc` 模式，仅保留本地 HTTP 服务路径（#1977）

---

## 3. 项目进展

今日合并/关闭的 27 条 PR 覆盖多个关键模块，显著推进项目成熟度：

| 领域 | 进展摘要 | 代表 PR |
|------|--------|--------|
| **OpenClaw 集成** | 完成 MCP 原生支持迁移，优化心跳机制降低 token 消耗 30%+ | #1980, #1978 |
| **插件系统** | 实现插件持久化、图标优化、npm 安装路径修复（macOS） | #1979, #1981 |
| **工件渲染** | 重构 HTML/Excel/PPTX 预览架构，提升稳定性与兼容性 | #1983, #1977 |
| **跨平台兼容** | 修复中文 Windows 下“打开方式”乱码、macOS PATH 缺失等问题 | #1973, #1981 |
| **安全与维护** | 清理 JSON 解析异常、防止轮询重叠、修复窗口销毁后 IPC 崩溃 | #860, #841, #852 |

> 项目整体向前迈出关键一步：**从“功能堆叠”转向“架构稳定化”**，为后续企业级部署打下基础。

---

## 4. 社区热点

> 📌 **无活跃 Issues 或高评论 PR**  
过去 24 小时无新 Issue 创建，所有 PR 均由核心维护者提交并快速合并，评论区无用户互动。这表明当前阶段为**内部集中开发期**，社区反馈通道暂未开放或用户群体尚处早期测试阶段。

建议关注后续是否开放 RFC 或功能提案通道，以收集外部需求。

---

## 5. Bug 与稳定性

| 严重程度 | 问题描述 | 修复状态 | 链接 |
|--------|--------|--------|------|
| ⚠️ 高 | 窗口销毁后 `event.sender` 调用导致主进程崩溃 | ✅ 已修复（#852） | [PR#852](https://github.com/netease-youdao/LobsterAI/pull/852) |
| ⚠️ 高 | JSON 解析未捕获异常致 SSE 流中断 | ✅ 已修复（#860） | [PR#860](https://github.com/netease-youdao/LobsterAI/pull/860) |
| ⚠️ 中 | 中文 Windows 下“打开方式”应用名乱码 | ✅ 已修复（#1973） | [PR#1973](https://github.com/netease-youdao/LobsterAI/pull/1973) |
| ⚠️ 中 | macOS 插件 npm 安装失败（PATH 缺失） | ✅ 已修复（#1981） | [PR#1981](https://github.com/netease-youdao/LobsterAI/pull/1981) |
| ⚠️ 低 | 工件路径含空格时被正则截断 | ✅ 已修复（#1982） | [PR#1982](https://github.com/netease-youdao/LobsterAI/pull/1982) |

> 所有关键 Bug 均已闭环，**无遗留高危问题**。

---

## 6. 功能请求与路线图信号

虽无显式功能请求 Issue，但从 PR 内容可推断未来方向：

- **插件生态扩展**：高级配置 + 持久化存储为第三方插件市场铺路（#1963, #1979）
- **企业级协作**：会话导出支持 Markdown/JSON/JSONL，便于二次处理与审计（#853）
- **安全合规**：环境扫描与权限管理模块已集成，预示将面向金融/政务场景（#842）
- **性能优化**：心跳机制、轮询防重叠、上下文压缩均指向**长会话稳定性**目标

> 预计下一版本将强化**企业部署能力**与**插件开发者体验**。

---

## 7. 用户反馈摘要

> 📌 **无公开用户评论数据**  
当前 Issues 数量为零，PR 评论为空，无法提取直接用户反馈。但结合修复内容可反推痛点：

- **跨平台体验不一致**（Windows/macOS 路径/编码问题频发）
- **升级导致数据丢失**（插件目录被覆盖）
- **长对话卡顿或崩溃**（上下文管理优化需求强烈）

建议后续增加用户调研或反馈入口。

---

## 8. 待处理积压

| 类型 | 标题 | 创建时间 | 状态 | 提醒 |
|------|------|--------|------|------|
| PR | chore(deps): bump @headlessui/react from 1.7.19 to 2.2.10 | 2026-04-20 | 🟡 待合并 | 依赖升级长期未处理，可能存在兼容性风险，建议评估后合并 |
| — | — | — | — | 其他 PR 均已闭环，**无长期积压 Issue** |

> 唯一待处理项为 Dependabot 提交的 UI 依赖升级（#1765），已滞留 24 天，需维护者确认是否引入 Breaking Change。

---

**总结**：LobsterAI 正处于**架构巩固与稳定性攻坚阶段**，开发节奏高效，关键问题响应迅速。建议关注插件生态与跨平台体验的持续优化，并适时开放社区参与机制。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

**Moltis 项目动态日报**  
📅 日期：2026年5月15日  
🔗 项目主页：[github.com/moltis-org/moltis](https://github.com/moltis-org/moltis)

---

### 1. 今日速览  
过去24小时内，Moltis 项目整体活跃度较低，无新版本发布或 Pull Request 提交。社区共新增 2 条 Issue，均为新开启且未关闭，涵盖一个关键性 Bug 报告和一个前瞻性功能增强提案。项目当前处于静默开发期，维护响应暂未显现，需关注后续对高优先级问题的跟进节奏。

---

### 2. 版本发布  
❌ 无新版本发布。

---

### 3. 项目进展  
❌ 无 Pull Request 被合并或关闭，今日无代码级功能推进或问题修复落地。

---

### 4. 社区热点  
今日最活跃议题为 **#996 [Bug]: Generated TLS certificates only work for localhost, contrary to the docs**（[链接](https://github.com/moltis-org/moltis/issues/996)）。该 Issue 由 @IlyaBizyaev 提交，指出系统自动生成的 TLS 证书仅支持 `localhost` 域名，与官方文档中“支持自定义域名部署”的描述严重不符，直接影响生产环境部署能力。尽管尚无评论，但其涉及核心安全通信模块，潜在影响范围广，可能引发后续用户集中反馈。

另一议题 **#995 [Feature]: Integration of `portal-tunnel` as a trustless relay channel**（[链接](https://github.com/moltis-org/moltis/issues/995)）由 @gg582 提出，建议引入去中心化中继通道机制以增强隐私与抗审查能力，反映社区对信任最小化架构的长期诉求，但目前仍处于概念提议阶段。

---

### 5. Bug 与稳定性  
⚠️ **高严重性 Bug 报告**：  
- **#996**: TLS 证书生成逻辑错误，导致非 `localhost` 域名无法建立安全连接，违反文档承诺，属**功能性阻断缺陷**。  
  🔧 当前状态：无关联 Fix PR，维护者尚未响应。  
  📌 建议优先级：P0（影响部署可用性）

---

### 6. 功能请求与路线图信号  
✅ **新功能提案**：  
- **#995**: 提议集成 `portal-tunnel` 实现无信任中继通道，契合 Moltis 去中心化 AI 助手的定位，可能成为未来网络层架构演进方向。  
  📌 当前状态：纯需求提案，无对应 PR，但技术方向与项目愿景一致，有望纳入中长期路线图。

---

### 7. 用户反馈摘要  
从 Issue 内容提炼关键用户痛点：  
- **部署灵活性不足**：用户期望在非本地环境（如私有云、边缘节点）使用 Moltis，但 TLS 证书限制使其无法实现安全通信（#996）。  
- **信任模型升级需求**：部分高级用户关注数据中继过程中的第三方依赖风险，呼吁引入去中心化通道以消除中心化中继信任假设（#995）。  
- **文档与实现一致性缺失**：用户强调“文档承诺未兑现”，反映对项目透明度和可靠性的高度敏感。

---

### 8. 待处理积压  
⚠️ **需维护者关注事项**：  
- **#996 (TLS 证书问题)**：已存在超24小时未响应，属高影响 Bug，建议立即评估并分配修复资源。  
- **#995 (portal-tunnel 集成)**：虽为增强功能，但代表社区对架构演进的核心期待，建议公开回应是否纳入规划。

> 📌 **健康度提示**：当前 Issue 响应延迟、无近期代码活动，项目活跃度偏低。建议维护团队加强社区沟通，尤其对关键 Bug 提供初步响应或修复时间预估，以维持用户信心。

---  
📊 数据来源：GitHub Issues & PRs（截至 2026-05-15 00:00 UTC）  
🔍 分析师备注：Moltis 正处于功能稳定期，但需警惕“静默退化”风险——即用户问题积压而开发节奏放缓，可能影响长期生态活力。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报（2026-05-15）

---

## 1. 今日速览

CoPaw 项目在 2026-05-15 继续保持高活跃度，24 小时内 Issues 和 PR 更新均达 50 条，社区参与度显著。核心团队持续推进后端单元测试覆盖（Phase 0–5），单日新增 15+ 个测试相关 PR，体现对稳定性的高度重视。同时发布 v1.1.7 版本，增强 Browser Use 工具能力。尽管存在多个高影响 Bug（如 MiMo 思考模式 400 错误、Agent 身份混淆等），但修复节奏加快，整体项目健康度良好。

---

## 2. 版本发布

### 🔖 v1.1.7 正式发布

**主要新增功能：**
- **Browser Use — Batch Actions**：支持在单次工具调用中执行多个浏览器操作（导航、点击、输入、截图等），提升自动化效率 ([#4139](https://github.com/agentscope-ai/QwenPaw/pull/4139))。
- **Browser Use — File Download**：通过点击页面元素实现文件下载，扩展了浏览器交互能力。

> ✅ 无破坏性变更，建议所有使用 Browser Use 的用户升级以获取更强自动化支持。

[查看完整 Release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v1.1.7)

---

## 3. 项目进展

今日共 **2 个 PR 被合并/关闭**，重点进展如下：

- **#4389**：修复 `chats.json` 损坏导致的 500 错误，引入自动备份与恢复机制，显著提升系统容错能力。
- **#4394**：修复 Agent 作用域路由中根会话上下文丢失问题，确保多 Agent 场景下会话隔离正确性。

此外，**15+ 个单元测试 PR 处于待合并状态**（如 #4391–#4407），覆盖 `config`、`providers`、`tunnel`、`utils` 等模块，标志着项目正系统性填补测试空白，为后续重构与稳定性打下基础。

---

## 4. 社区热点

### 🔥 高讨论度 Issues（评论数 ≥5）

| Issue | 主题 | 链接 |
|------|------|------|
| #4342 | 后端单元测试覆盖 Phase 5（local_models/providers/tunnel/utils） | [链接](https://github.com/agentscope-ai/QwenPaw/issues/4342) |
| #2953 | CoPaw 启动后输出错误日志信息 | [链接](https://github.com/agentscope-ai/QwenPaw/issues/2953) |
| #4314 | MiMo 思考模式 + 工具调用导致 400 错误（缺 reasoning_content） | [链接](https://github.com/agentscope-ai/QwenPaw/issues/4314) |
| #3957 | Agent 通过频道接收消息时 workspace 错误切换（身份混淆） | [链接](https://github.com/agentscope-ai/QwenPaw/issues/3957) |
| #4299 | `write_file()` 死循环报错（参数缺失） | [链接](https://github.com/agentscope-ai/QwenPaw/issues/4299) |

**分析**：社区核心诉求集中在 **多模态模型兼容性**（MiMo、GLM-4.6V）、**会话一致性**（workspace/身份管理）、**文件与工具稳定性**三大方向。测试覆盖议题热度高，反映用户对长期可维护性的关注。

---

## 5. Bug 与稳定性

### ⚠️ 高严重性 Bug（按影响排序）

| Bug | 严重程度 | 是否有 Fix PR |
|-----|--------|-------------|
| #4314 MiMo 思考模式下多轮对话报 400（缺 reasoning_content） | 高（阻断核心功能） | ❌ 暂无 |
| #3957 Agent 接收跨 Agent 消息后 workspace 错误切换 | 高（身份混淆，安全风险） | ❌ 暂无 |
| #3854 ChromaDB Rust 绑定 segfault 致进程崩溃 | 高（稳定性灾难） | ❌ 暂无 |
| #4299 `write_file()` 参数缺失导致死循环报错 | 中（影响文件操作） | ❌ 暂无 |
| #4360 Ubuntu 26.04 上 Browser CDP 模式超时 | 中（平台兼容性） | ✅ 已关闭（未说明是否修复） |

> 💡 建议优先处理 #4314 与 #3957，二者均涉及核心交互逻辑，可能影响生产环境部署。

---

## 6. 功能请求与路线图信号

### 📌 高潜力功能需求

| 需求 | 关联 PR/Issue | 纳入可能性 |
|------|---------------|----------|
| 支持自定义 Anthropic Base URL | #4387（PR 已开） | ⭐⭐⭐⭐☆（高，PR 活跃） |
| 添加会话生命周期钩子（session.create 等） | #4249 | ⭐⭐⭐☆☆（中，需架构评估） |
| 排除心跳/定时任务进入 Auto-Memory | #3944 | ⭐⭐⭐⭐☆（高，用户体验痛点） |
| 支持钉钉引用消息读取 | #3109 | ⭐⭐☆☆☆（低，依赖钉钉 API） |
| 添加链路追踪初始化入口（AgentScope） | #4057 | ⭐⭐⭐☆☆（中，开发者需求） |

> 🔍 **信号解读**：项目正从“功能堆叠”转向“可观测性 + 稳定性 + 企业级集成”，#4387 和 #3944 最可能进入 v1.2.0。

---

## 7. 用户反馈摘要

### 🗣️ 真实用户声音

- **痛点**：
  - “MiMo 开启思考模式后，只要历史有工具调用就报错 400，完全没法用多轮对话。”（#4314）
  - “更新后 embedding 配置被清空，记忆搜索全失效，必须手动恢复。”（#4018）
  - “ChromaDB 崩溃太频繁，Ubuntu 上根本跑不了。”（#3854）

- **满意点**：
  - “Browser Use 批量操作终于来了，自动化脚本效率翻倍！”（v1.1.7 反馈）
  - “测试覆盖推进很快，说明团队重视质量。”（#4342 评论）

- **使用场景**：
  - 多 Agent 协同办公（钉钉/微信通道）
  - 本地离线语音转写（Whisper + FFmpeg）
  - 自动化浏览器任务（RPA 场景）

---

## 8. 待处理积压

### ⏳ 长期未响应重要 Issue（>30 天无维护者回复）

| Issue | 类型 | 最后更新时间 | 提醒 |
|------|------|------------|------|
| #1516 Telegram 通道不支持 AudioContent | Bug | 2026-05-14 | 影响语音消息处理，需通道层修复 |
| #1853 支持可配置 base path（反向代理场景） | Bug | 2026-05-14 | 企业部署刚需，长期未解决 |
| #2751 Anthropic API 不支持 content.type 'file' | Bug | 2026-05-14 | 多模态交互阻塞点 |
| #2982 聊天列表排序与跳转逻辑错误 | Bug | 2026-05-14 | 前端 UX 基础问题 |

> 🛎️ **维护者注意**：上述 Issue 均超过 30 天无核心团队响应，建议分配优先级或标记 `needs-info` / `help-wanted` 以激活社区协作。

---

**报告生成时间**：2026-05-15  
**数据来源**：GitHub CoPaw 仓库 Issues / PRs / Releases  
**分析师**：AI 开源项目观察员

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