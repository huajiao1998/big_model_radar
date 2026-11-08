# OpenClaw 生态日报 2026-11-08

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-08 07:26 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

⚠️ 摘要生成失败。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告
**数据日期：2026-11-08**  
**数据口径提示**：各项目摘要口径不完全一致（Issues/PR 更新、关闭、合并、Discussions 等），表格并列仅作趋势参考。**OpenClaw 摘要生成失败，今日不纳入量化排名**，其定位分析以定性判断为主，需后续补数据验证。

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已从“功能竞赛”进入“工程化与安全边界竞赛”：多租户 RBAC、会话所有权、审批安全、跨 agent 可审计成为高频主线。活跃度显著分化，头部项目单日可达约 1,000 条 Issue/PR 更新，长尾项目仅个位数协作事件。普遍问题是“供给 > 消化”：社区提交与问题发现速度快于维护者评审、合并和发布速度，PR 积压与依赖链阻塞成为常态。Provider/插件生态快速扩张，但依赖隔离、第三方集成分级、桌面端发布工程与跨平台稳定性开始成为信任瓶颈。OpenClaw 作为核心参照存在，但今日数据缺失，无法验证其活跃度与吞吐。

---

## 2. 各项目活跃度对比

| 项目 | 今日 Issues / 讨论 | 今日 PR | Release | 健康度评估 |
|---|---:|---:|---:|---|
| **Zeroclaw** | 16 条 Issue 更新（13 活跃/新开，3 关闭） | 32 条 PR 更新（28 待合，4 合/关） | 0 | **高位活跃、安全重构期**；RBAC/会话所有权/OIDC 主线清晰，但大型 PR 多 blocked，合并通道偏紧 |
| **PicoClaw** | 1 条 Issue（stale 关闭） | 2 条 PR（1 待合，1 关闭） | 0 | **低活跃、短期平稳**；无 Bug 报告，provider catalog 扩展 PR 积压，stale 策略可能误伤小需求 |
| **QwenPaw** | 6 条 Issue 新增/活跃，0 关闭 | 8 条 PR 待合，0 合/关 | 0 | **输入高位、输出停滞**；0 合并，审查是瓶颈；2.3.0-beta.1 Windows 启动回归为发布阻塞级风险 |
| **hermes-agent** | 500 条 Issue 更新，关闭 156（31.2%） | 500 条 PR 更新，合/关 173（34.6%），待合 327 | 0 | **极高活跃、吞吐中等、稳定性承压**；gateway/session/Kanban 高风险问题成簇，发布节奏停滞 |
| **AstrBot** | 8 条 Issue 更新（5 开，3 关） | 18 条 PR 更新（17 待合，1 关） | 0 | **高活跃、低吞吐**；新 Bug 24h 内出 PR 比例高，但评审瓶颈明显，安全类 PR 悬置超 3 个月 |
| **DeepSeek Harness** | 186 条 Discussions 更新；未启用 Issues/PR | — | 0 | **讨论高活跃、发布静默、rc 稳定性承压**；认证 Cookie、启动崩溃、安装失败、会话毒化等跨版本未闭环 |
| **OpenClaw** | 摘要失败 | 摘要失败 | 未知 | **数据缺口**；作为核心参照，今日无法量化活跃度、吞吐与稳定性 |

**关键读数**：hermes-agent 是可见样本中活跃度最高项目；AstrBot、Zeroclaw 属中高活跃；QwenPaw 输入活跃但 0 合并；PicoClaw 明显低活跃；DeepSeek Harness 以 Discussions 承载社区验证。**活跃不等于成熟，合并/关闭率与发布节奏更能反映工程健康度。**

---

## 3. OpenClaw 在生态中的定位

**说明**：OpenClaw 今日摘要失败，以下不做伪造数据推断。

- **优势定位**：OpenClaw 被列为核心参照，说明其在生态中具备“基准参照价值”——同类项目在安全、会话、provider、gateway、插件等方向上的讨论，均可与 OpenClaw 的抽象和能力边界对照。但今日无法验证其活跃度、合并吞吐和发布节奏优势。
- **技术路线差异**：从同类项目看，生态已分化为多条路线：Zeroclaw 走企业多租户与 RBAC；PicoClaw 走轻量/provider 目录；QwenPaw 走桌面助手+记忆检索；hermes-agent 走统一 gateway+Kanban 多 worker；AstrBot 走聊天机器人适配器+插件；DeepSeek Harness 走桌面 Agent 工作台+插件生态。OpenClaw 若要保持核心参照地位，需在通用 Agent runtime、多 agent 编排、安全边界与生态接口一致性上持续领先，而非仅靠单点功能。
- **社区规模对比**：今日可见样本中，hermes-agent 约 1,000 条 Issue/PR 更新，规模最大；AstrBot、Zeroclaw 属中高活跃；QwenPaw 中等；PicoClaw 低活跃；DeepSeek Harness Discussions 186 条。**OpenClaw 社区规模无法量化对比**，建议补齐 stars、contributors、24h events、issue close rate、release cadence 后再做排名。

**结论**：OpenClaw 当前更适合作为“生态基准”而非“今日活跃冠军”来理解；其真实竞争力需用仓库量化指标验证。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **安全边界与多租户隔离** | Zeroclaw、hermes-agent、AstrBot、DeepSeek Harness | Zeroclaw 的 per-sender RBAC、session ownership、OIDC CSRF；hermes-agent 的 osascript 破坏性操作强制人工审批；AstrBot 的 shell blocklist 粒度与 SSL 降级；DeepSeek Harness 的沙箱命令失败与认证 Cookie 溢出 |
| **会话/运行可审计与可归属** | Zeroclaw、hermes-agent、QwenPaw、DeepSeek Harness | Zeroclaw 的 peer-agent 轮次持久化、append-only session history；hermes-agent 的 gateway/session 状态与 Kanban 失败恢复；QwenPaw 的 recall_history 行级检索；DeepSeek Harness 的 reasoning-only 会话毒化与 compaction 修复 |
| **交付一致性与适配器健壮性** | hermes-agent、AstrBot、PicoClaw、QwenPaw | hermes-agent 的 Telegram gateway 内外发送一致；AstrBot 的 Telegram 媒体超时、QQ 官方 Bot 公式裁切；PicoClaw 的 provider catalog 发现性；QwenPaw 的 provider 禁用兜底 |
| **性能与规模化** | hermes-agent、QwenPaw、AstrBot、Zeroclaw | hermes-agent 的 gateway 全量重读 session history 导致 CPU 高占用；QwenPaw 的 MemorySpace.search 重复计算；AstrBot 的备份清单读取阻塞事件循环；Zeroclaw 的 relay 服务与 dashboard 扩展 |
| **Provider / 插件生态与隔离** | PicoClaw、QwenPaw、AstrBot、hermes-agent、DeepSeek Harness、Zeroclaw | PicoClaw 的 Tsubasa/Standard Compute；QwenPaw 的 SpecStream；AstrBot 的 NagaAI/SpecStream；hermes-agent 的 Plugin Hackathon 与 catalog 重钉；DeepSeek Harness 的插件重复依赖导致 scheduler 崩溃；Zeroclaw 的插件 Webhook 链路 |
| **桌面端/跨平台发布工程** | QwenPaw、DeepSeek Harness、AstrBot、hermes-agent、Zeroclaw | QwenPaw 的 Windows 11 IoT LTSC 启动失败；DeepSeek Harness 的 Windows 安装失败与认证 Cookie；AstrBot 的 Firefox 滚动回弹；hermes-agent 的 Windows state.db 误判；Zeroclaw 的 Windows/macOS CI 测试矩阵 |
| **可观测性与错误语义** | QwenPaw、AstrBot、hermes-agent、Zeroclaw | QwenPaw 的 SQLite 错误被误写成 Timeout；AstrBot 的 Telegram 超时日志；hermes-agent 的 service_tier 审计；Zeroclaw 的 RPC denial reason id |

**共同结论**：生态共同需求已从“模型接入与工具调用”转向 **权限边界、状态可靠性、可审计性、交付一致性、生态隔离**。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 架构关键差异 |
|---|---|---|---|
| **Zeroclaw** | 企业多租户、RBAC、会话所有权、relay dashboard | 企业/多租户 SaaS、安全敏感部署 | 身份访问体系重构、会话后端与 relay 托管、安全准入严格 |
| **PicoClaw** | 轻量扩展、provider 目录、子代理消息权限 | 轻量部署开发者、硬件/边缘生态用户 | OpenAI 兼容 provider 目录、spawn 参数控制、低活跃维护 |
| **QwenPaw** | 桌面个人助手、记忆检索、provider 兜底 | 桌面用户、低配/非标准 Windows 环境 | MemorySpace 检索、桌面桥接、beta 发布回归敏感 |
| **hermes-agent** | 统一 gateway、多消息 bot、Kanban 多 worker、插件生态 | 自动化工作流、多 agent 编排、企业/团队 | Gateway 集中化、插件钩子、catalog 快速迭代、高并发可靠性挑战 |
| **AstrBot** | 聊天机器人平台、多适配器、插件化工具调用 | 社区/自建 VPS、Telegram/QQ Bot 用户 | 适配器生态、Dashboard、插件市场、止血式修复 |
| **DeepSeek Harness** | 桌面 Agent 工作台、插件生态、模型能力产品化 | 开发者、桌面 Agent 用户 | Electron/桌面端、Releases 交付、Discussions 驱动、插件依赖隔离问题 |
| **OpenClaw** | 核心参照，具体功能待数据补证 | 待补 | 需验证其在通用 runtime、多 agent、安全边界上的基准能力 |

**定位判断**：Zeroclaw 最偏“企业安全基础设施”；hermes-agent 最偏“统一 gateway + 多 agent 自动化”；AstrBot 最偏“聊天机器人适配器平台”；QwenPaw/DeepSeek Harness 更偏“桌面个人 Agent”；PicoClaw 更偏“轻量/provider 扩展”；OpenClaw 作为核心参照，需在通用抽象与生态接口上保持基准地位。

---

## 6. 社区热度与成熟度

**第一层：极高活跃、快速迭代但稳定性承压**
- **hermes-agent**：约 1,000 条 Issue/PR 更新，327 条 PR 待合；Telegram 修复密集，但 gateway/session/Kanban 高风险问题成簇。处于“高吞吐维护 + 稳定性巩固”并行阶段。
- **AstrBot**：高活跃、低吞吐；新 Bug 24h 内出 PR 比例约 80%，响应优秀，但 17 条 PR 待合、安全 PR 悬置。处于“快速迭代 + 评审瓶颈”阶段。

**第二层：中高活跃、方向聚焦**
- **Zeroclaw**：安全重构主线清晰，P1/CSRF 收口积极；但大型 PR blocked，合并吞吐受限。处于“安全准入巩固期”。
- **QwenPaw**：输入活跃、0 合并、P0 发布阻塞；审查与发布工程是瓶颈。处于“功能迭代但输出停滞期”。
- **DeepSeek Harness**：Discussions 高活跃、0 Release、rc 回归集中；处于“社区验证与稳定性承压期”。

**第三层：低活跃、维护清理**
- **PicoClaw**：3 项协作更新，无 Bug，stale 关闭为主；处于“低活跃平稳/维护清理期”。
- **OpenClaw**：数据缺失，无法分层；作为核心参照需补量化指标。

**成熟度判断**：AstrBot、hermes-agent 生态规模大但积压重；Zeroclaw 安全流程较成熟；PicoClaw 稳定但活跃低；QwenPaw/DeepSeek Harness 仍受 rc 回归与桌面发布工程拖累。**社区热度高不代表成熟，闭环率、发布节奏和阻断性问题处理速度更关键。**

---

## 7. 值得关注的趋势信号

1. **安全从“拦截”走向“细粒度授权 + 人工确认”**  
   Zeroclaw 的 RBAC/ownership、hermes-agent 的破坏性 osascript 审批、AstrBot 的 shell blocklist 粒度、DeepSeek Harness 的沙箱权限权衡，均说明开发者需把权限模型前置设计，而非后期打补丁。

2. **统一 gateway/集中化架构带来单点瓶颈**  
   hermes-agent 的 gateway 全量重读、Kanban 状态机卡死、Telegram dispatcher 静默停止，提示集中化必须配套增量状态、背压、失败恢复与可观测性。

3. **会话与记忆正在成为核心数据层**  
   Zeroclaw 的 append-only session history、QwenPaw 的行级 recall、DeepSeek Harness 的 compaction/会话毒化，表明会话历史需要可归属、可检索、可清洗、可迁移。

4. **Provider/插件生态进入“目录化 + 隔离”阶段**  
   PicoClaw、QwenPaw、AstrBot 的 provider 目录需求，hermes-agent 的 Plugin Hackathon，DeepSeek Harness 的插件重复依赖崩溃，说明生态扩张后必须解决依赖单实例、第三方 benchmark 审核与供应链隔离。

5. **桌面端发布工程成为用户信任瓶颈**  
   QwenPaw 的 Windows LTSC 启动失败、DeepSeek Harness 的安装器与 Cookie 溢出、AstrBot 的 Firefox 滚动、hermes-agent 的 Windows state.db 误判，均指向跨平台冒烟、安装/升级链路和桌面桥接可靠性。

6. **维护者评审与依赖链管理是开源项目新瓶颈**  
   QwenPaw 0 合并、AstrBot 17 条待合、Zeroclaw 大型 PR blocked、hermes-agent 327 条待合，说明“打包评审、重复 PR 裁决、里程碑依赖打通”应成为维护流程优化重点。

**对 AI 智能体开发者的参考**：优先设计权限边界与审计链路；集中化 gateway 必须支持增量订阅与失败恢复；会话/记忆层要可清洗可归属；插件生态要依赖隔离与第三方集成分级；发布前建立 Windows/macOS/Linux 与安装升级冒烟矩阵。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 · 2026-11-08

---

## 1. 今日速览

- **活跃度高位运行**：过去 24 小时共 16 条 Issue 更新（13 条新开/活跃、3 条关闭）与 32 条 PR 更新（28 条待合并、4 条已合并/关闭），无新版本发布，但围绕 `v0.9.0` 的发布相关标记密集出现。
- **安全与身份访问是今日主线**：RBAC、会话所有权、OIDC/CSRF、跨租户隔离等标签贯穿今日大部分 Issue 与 PR，反映项目正处于大规模身份访问体系重构期。
- **修复面有实质进展**：3 条安全/严重性 Bug Issue 今日关闭（含 P1 安全策略绕过与 OIDC 登录 CSRF），说明此前积累的高危修复链条正在收口。
- **合并通道偏紧**：多条大型 PR 处于 `do-not-merge` / `needs-author-action` / `status:blocked` 状态，依赖链（如 #11964、#12232、#11319）尚未合并，短期合并吞吐可能受限。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日共 4 条 PR 已合并/关闭，但均未出现在“评论数最多”的展示列表中；展示的 20 条 PR 全部为 `OPEN` 状态。因此今日可见的推进主要体现在 **Issue 侧的修复收口**：

| 已关闭 Issue | 类型 | 意义 |
|---|---|---|
| [#11126](https://github.com/zeroclaw-labs/zeroclaw/issues/11126) [CLOSED] | `bug`, `security:policy`, `priority:p1`, `release:v0.9.0` | 关闭“排队会话操作保留已撤销管理员所有权绕过”，是会话所有权安全链上的关键收口（#10412 为其部分实现）。 |
| [#12050](https://github.com/zeroclaw-labs/zeroclaw/issues/12050) [CLOSED] | `bug`, `security`, `topic:identity-access`, `release:v0.9.0` | 关闭 OIDC 回调页面无浏览器绑定导致的登录 CSRF 漏洞，直接影响仪表盘 OIDC 登录安全性。 |
| [#12260](https://github.com/zeroclaw-labs/zeroclaw/issues/12260) [CLOSED] | `bug` | 修复 `cron/add` 与 `cron/patch` 将 RPC 请求误当作用户对 shell 命令的显式批准的问题。 |

**推进评估**：今日关闭的 Issue 均带安全或运行时正确性性质，且两条标注 `release:v0.9.0`，说明 v0.9.0 的安全准入条件正在逐项满足；但大型 PR（如 #10412、#12244、#11921）尚未合并，功能面推进仍需等待依赖链打通。

---

## 4. 社区热点

按评论数排序，今日讨论最集中的 Issue/PR 如下：

1. **[#5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982) — Per-sender RBAC for multi-tenant agent deployments（12 条评论）**
   讨论最活跃的长线 Issue（2026-04 创建，至今已近 7 个月）。维护者在 9-28 的更新中明确指出**已收敛范围**：放弃独立 `[rbac.*]` 子系统与独立 RBAC crate 的提案，转而基于现有 agent/risk-profile 模型构建 sender roles。背后的核心诉求是**多租户 SaaS/企业部署下按发送者做权限隔离**，这是当前用户群体最刚性的企业级需求之一。

2. **[#9597](https://github.com/zeroclaw-labs/zeroclaw/issues/9597) — make peer-agent turns durable and attributable（5 条评论，今日更新）**
   聚焦 peer-agent 之间的 `send_message_to_peer` 仍以 detached `process_message` 方式运行、缺少 sender/parent 生命周期的问题。诉求是让跨 agent 轮次变成**可持久化、可归属的 runtime task**，便于审计与故障恢复。

3. **[#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) — Run the test suite on Windows and macOS in CI（5 条评论）**
   用户要求把 CI 测试矩阵从 `ubuntu-latest` 扩展到 macOS/Windows。Lint 与 Build 已跑三平台，测试未跟上，属于**基础设施一致性**诉求。

4. **[#9646](https://github.com/zeroclaw-labs/zeroclaw/issues/9646) — Session/channel read+write tools lack per-agent ownership scoping（4 条评论）**
   标记为 **S0 - 数据丢失/安全风险**。核心问题：`sessions_list`/`history`/`send`、`discord_search` 等工具直接从模型参数取 `session_id`/`channel_id`，缺少 per-agent 所有权校验，任意 agent 可触达他人会话。这是今日最严重的开放安全问题。

5. **[#11126](https://github.com/zeroclaw-labs/zeroclaw/issues/11126)（4 条评论，已关闭）**
   尽管已关闭，讨论仍围绕“部分实现是否足以关闭 P1”展开，体现出维护者对安全类 Issue 关闭标准的谨慎态度。

**诉求分析**：当前社区热点高度集中于**安全边界（ownership/RBAC/tenant isolation）** 与**可审计运行语义（peer-agent 可归属、事件历史）** 两条主线，与项目正在进行的会话后端重构（#10412、#11921）高度同频。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 状态 | 摘要 | 关联 Fix |
|---|---|---|---|---|
| **S0 / P1** | [#9646](https://github.com/zeroclaw-labs/zeroclaw/issues/9646) | OPEN | 内置 `sessions_*`/`discord_search` 等工具缺少 per-agent ownership 校验，存在跨 agent 数据越权 | 未见直接 fix PR；与 #10412（session ownership claim）方向相关 |
| **P1（已关闭）** | [#11126](https://github.com/zeroclaw-labs/zeroclaw/issues/11126) | CLOSED | 排队会话操作保留已撤销管理员所有权，可绕过权限 | #10412 为部分实现，最终修复已在主线关闭 |
| **S2** | [#12289](https://github.com/zeroclaw-labs/zeroclaw/issues/12289) | OPEN（今日新开） | `enabled = false` 的 agent 仍可通过 operator WebSocket chat 与受限 RPC 执行 turn | 未见 fix PR |
| **S2** | [#12288](https://github.com/zeroclaw-labs/zeroclaw/issues/12288) | OPEN（今日新开） | Web 仪表盘 **Discard all** 仅清除全局横幅，未清空已挂载 Browser 表单的本地草稿，后续保存会把已丢弃值写回 | [#12039](https://github.com/zeroclaw-labs/zeroclaw/pull/12039)（Save all 后刷新表单）与 [#12100](https://github.com/zeroclaw-labs/zeroclaw/pull/12100)（enable toggle 后同步 draft）可视为同族问题，但均未直接覆盖 Discard all 路径 |
| **S2（已关闭）** | [#12260](https://github.com/zeroclaw-labs/zeroclaw/issues/12260) | CLOSED | RPC `cron/add`/`cron/patch` 把请求当作 operator 对 shell 命令的批准 | 已在主线关闭 |
| **安全（已关闭）** | [#12050](https://github.com/zeroclaw-labs/zeroclaw/issues/12050) | CLOSED | OIDC 回调 token 页面无浏览器绑定，可被用于登录 CSRF | 已关闭；[#12284](https://github.com/zeroclaw-labs/zeroclaw/issues/12284) 为其后续（观测、回归与文档） |

**稳定性判断**：S0/S2 开放问题集中在**授权边界**与**前端状态一致性**两类；前者需等待会话所有权重构（#10412 及后续）落地，后者已有多个相关 PR 在途。今日关闭 3 条高危 Issue 是积极信号，但 **#9646 仍为当前最需优先处理的开放风险**。

---

## 6. 功能请求与路线图信号

### 6.1 高概率纳入 v0.9.0 的方向

- **Scoped dashboard chat（非管理员仪表盘聊天）**：Issue [#11984](https://github.com/zeroclaw-labs/zeroclaw/issues/11984) + 测试任务 [#11985](https://github.com/zeroclaw-labs/zeroclaw/issues/11985) + PR [#12244](https://github.com/zeroclaw-labs/zeroclaw/pull/12244)（`release:v0.9.0`，但目前 `status:blocked`/`do-not-merge`）。依赖 #11964 与 #12232 先合并，是 v0.9.0 仪表盘功能的核心。
- **Relay 服务仪表盘**：Issue/PR [#12270](https://github.com/zeroclaw-labs/zeroclaw/pull/12270)（`release:v0.9.0`，`needs-author-action`），为 daemon 提供 per-node host 的 Web 仪表盘访问入口。
- **Relay 连接上的凭据写入拒绝**：Issue [#12285](https://github.com/zeroclaw-labs/zeroclaw/issues/12285)（2026-11-07 新开），与 #12270 配套的安全加固。
- **OIDC 韧性**：[#12096](https://github.com/zeroclaw-labs/zeroclaw/issues/12096) 要求 IdP 在重验证时不可达（429/5xx）与 token 被拒可区分，保证 provider 故障期间不踢出登录会话。
- **Per-sender RBAC**：[#5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982) 已收敛为“在现有 agent/risk-profile 之上构建 sender roles”，#11068 为其开放草稿。

### 6.2 中短期路线图信号

- **持久化对等 agent 轮次**：[#9597](https://github.com/zeroclaw-labs/zeroclaw/issues/9597) 与今日新开的 [#12287](https://github.com/zeroclaw-labs/zeroclaw/issues/12287)（A→B→A 中继链跳数上限），构成 peer-relay 治理的完整需求组。
- **会话事件历史**：PR [#11921](https://github.com/zeroclaw-labs/zeroclaw/pull/11921)（XL、`risk:high`）提议 append-only session history，覆盖输入、模型尝试、工具执行、审批、压缩、子 agent 活动等，是审计能力的基础设施。
- **跨平台 CI**：[#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) 为 Windows/macOS 跑 `cargo nextest`，目前仍属 `status:in-progress`。
- **插件 Webhook 链路**：[#11317](https://github.com/zeroclaw-labs/zeroclaw/pull/11317)（放置例外）、[#11320](https://github.com/zeroclaw-labs/zeroclaw/pull/11320)（RPC dispatch）、[#11322](https://github.com/zeroclaw-labs/zeroclaw/pull/11322)（gateway 转发），依赖链较长，短期难以合入。
- **自定义 Provider 文档**：[#11207](https://github.com/zeroclaw-labs/zeroclaw/issues/11207)（Tsubasa 自定义 provider 的 bounded setup 配方，`priority:p3`），属低风险文档类需求。

### 6.3 判断

v0.9.0 的功能面以 **仪表盘（scoped chat + relay 托管）** 与 **身份访问安全** 为双核心；#12244 / #12270 / #10412 的依赖链能否在短期内解开，直接决定 v0.9.0 的发布节奏。

---

## 7. 用户反馈摘要

从今日 Issue 与 PR 的描述与标签中提炼：

**痛点**

1. **多租户/多发送者隔离不足**（#5982、#9646）：企业用户在“同一部署服务多个租户/多个发送者”场景下，无法依赖细粒度 RBAC；某 agent 甚至能通过模型参数直接操作其他 agent 的 session/channel，构成 S0 级风险。
2. **跨 agent 生命周期不可归属**（#9597、#12287）：`send_message_to_peer` 的 detached 执行方式导致审计链断裂，也缺少 A→B→A 的中继跳数限制，只能靠全局成本兜底。
3. **平台覆盖不全**（#7461）：Windows/macOS 开发者在 CI 阶段无法获得与 Linux 同等的测试保障。
4. **前端状态一致性**（#12288）：多段式配置表单中 “Discard all” 不能真正回滚，导致“已丢弃的值被后续保存写回”，属于用户可感知的数据正确性问题。
5. **IdP 故障体验**（#12096）：IdP 临时不可达时，当前行为无法与 token 被拒区分，用户可能被误踢出会话。

**使用场景**

- 企业/多租户部署：sender 级 RBAC、per-agent ownership、relay-served dashboard 上的凭据写入限制。
- 审计与合规：append-only session history（#11921）、peer-agent 轮次可归属（#9597）。
- 非管理员日常使用：OIDC 登录后的 dashboard chat（#11984），不要求管理员权限。
- 第三方 provider 集成：Tsubasa 自定义 provider 配置文档（#11207）。

**满意/不满意**

- **满意**：安全问题响应积极，P1 与 CSRF 类 Issue 在较短时间内关闭；维护者对 RBAC 范围主动收敛、避免过度设计。
- **不满意**：大型安全 PR（#10412、#11265、#12244）长期处于 blocked/do-not-merge 状态，部分用户可能感到“讨论多、落地慢”。

---

## 8. 待处理积压

以下 Issue/PR 创建时间较长且今日仍有更新，建议维护者关注其状态与依赖链：

### 长期开放 Issue

| Issue | 创建时间 | 状态 | 风险 |
|---|---|---|---|
| [#5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982) Per-sender RBAC | 2026-04-22 | `status:accepted` / 12 评论 | **高**：范围已收敛，等待 #11068 草稿推进 |
| [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) 跨平台 CI | 2026-06-10 | `status:in-progress` | 中：基础设施一致性 |
| [#9597](https://github.com/zeroclaw-labs/zeroclaw/issues/9597) peer-agent 轮次持久化 | 2026-07-31 | `status:in-progress` | 高：审计与生命周期 |
| [#9646](https://github.com/zeroclaw-labs/zeroclaw/issues/9646) 工具缺 per-agent ownership | 2026-08-01 | `status:no-stale` | **S0**：当前最严重的开放安全问题 |
| [#11207](https://github.com/zeroclaw-labs/zeroclaw/issues/11207) Tsubasa 文档 | 2026-09-28 | `status:accepted` / `p3` | 低 |

### 长期开放 PR（blocked / do-not-merge / needs-author-action）

| PR | 创建时间 | 状态标记 | 说明 |
|---|---|---|---|
| [#10412](https://github.com/zeroclaw-labs/zeroclaw/pull/10412) session-ownership claim | 2026-08-27 | `priority:p1`, `breaking-change`, `risk:high` | **#11126 的部分实现**，是会话所有权安全链的关键前置 |
| [#11265](https://github.com/zeroclaw-labs/zeroclaw/pull/11265) CLI roster 密码生命周期 | 2026-09-30 | `do-not-merge` | 依赖 #11264、#11313 |
| [#11289](https://github.com/zeroclaw-labs/zeroclaw/pull/11289) RPC 拒绝原因标识 | 2026-09-30 | `do-not-merge` | 稳定的 denial reason id，利好可观测性 |
| [#11317](https://github.com/zeroclaw-labs/zeroclaw/pull/11317) / [#11320](https://github.com/zeroclaw-labs/zeroclaw/pull/11320) / [#11322](https://github.com/zeroclaw-labs/zeroclaw/pull/11322) 插件 Webhook 链路 | 2026-10-01 | `needs-author-action` | 依赖链长，需先合并 #11319、#11165、#11186 |
| [#11651](https://github.com/zeroclaw-labs/zeroclaw/pull/11651) Telegram 429 retry_after | 2026-10-10 | `risk:medium` | 频道稳定性修复，影响 Telegram 用户体验 |
| [#11716](https://github.com/zeroclaw-labs/zeroclaw/pull/11716) 修复“粘性视觉路由” | 2026-10-13 | `risk:medium` | 多模态 provider 粘滞问题 |
| [#12244](https://github.com/zeroclaw-labs/zeroclaw/pull/12244) scoped dashboard chat | 2026-11-05 | `status:blocked`, `do-not-merge`, `release:v0.9.0` | 依赖 #11964、#12232，**v0.9.0 关键路径** |
| [#12270](https://github.com/zeroclaw-labs/zeroclaw/pull/12270) relay 托管 dashboard | 2026-11-06 | `needs-author-action`, `release:v0.9.0` | v0.9.0 关键路径 |

### 积压健康度提示

- **依赖链过深**是当前最主要的合并瓶颈：v0.9.0 关键 PR（#12244、#12270）均卡在 `#11964`、`#12232`、`#11964` 等前置合并上，建议维护者优先打通前置层。
- **安全类 P1 并行推进**：#10412 与 #11126、#9646 同属会话所有权主题，建议统一在一个里程碑下跟踪，避免交叉等待。
- **`do-not-merge` 标记的 PR 数量偏多**（#10412、#11265、#11289、#12244），需明确各自阻塞条件与预计解锁时间，否则容易形成“已写好但无法合并”的堆积。

---

*数据来源：Zeroclaw 组织仓库过去 24 小时 Issue/PR 更新；PR 部分仅展示评论数最多的 20 条，已合并/关闭的 4 条 PR 未出现在该展示窗口中。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-11-08）

> 数据口径：基于给定 GitHub 数据；过去24小时共 3 项协作更新（Issue 1、PR 2），无新版本。PR 评论数未提供，热度排序以可见评论数为准，不做推断。

## 1. 今日速览

- 2026-11-08，PicoClaw 过去24小时协作更新 **3 项**：Issue 关闭 1 条，PR 更新 2 条（待合并 1、已合并/关闭 1），**无新版本发布**。
- 唯一 Issue [#3397](https://github.com/sipeed/picoclaw/issues/3397) 是 Tsubasa 加入 OpenAI 兼容 provider 目录的功能请求，因 **stale 关闭**；PR [#3431](https://github.com/sipeed/picoclaw/pull/3431) 的 Standard Compute provider 新增仍 **OPEN**。
- 今日 **无 Bug、崩溃或回归报告**，稳定性面无新增风险；但整体活跃度偏低，维护动作以 stale 清理和单 PR 关闭为主。
- 健康度评估：**短期平稳、低活跃**。需关注 provider 目录扩展类 PR 的积压，以及 stale 策略是否掩盖仍有价值的小功能请求。

## 2. 版本发布

今日无新版本发布，按约定省略详细说明。

## 3. 项目进展

今日项目增量有限：1 个 PR 进入关闭/合并终态，1 条 stale 功能请求被清理；核心 provider 目录扩展仍停留在待合并状态。

| 条目 | 状态 | 进展说明 | 链接 |
|---|---|---|---|
| PR #3465 `feat(spawn): add allow_direct_message parameter...` | CLOSED（数据计入已合并/关闭，未给出 merged 标记） | 为 `spawn` 工具新增可选布尔参数 `allow_direct_message`（默认 `true`），用于控制子代理执行期间能否通过 `message` 工具直接向用户发消息。若最终为合并，则提升子代理消息权限的可控性；若为关闭未合并，则仅完成提案处置。 | [#3465](https://github.com/sipeed/picoclaw/pull/3465) |
| Issue #3397 Tsubasa provider catalog | CLOSED / stale | 功能请求被 stale 关闭，**不代表功能已落地**。该请求希望将 Tsubasa 的 endpoint 与公开模型别名加入 provider picker 目录，减少手动配置。 | [#3397](https://github.com/sipeed/picoclaw/issues/3397) |
| PR #3431 Standard Compute provider | OPEN | 新增 OpenAI 兼容 provider `standardcompute`，遵循既有 NEAR AI Cloud 模式；今日仍待合并，未产生交付增量。 | [#3431](https://github.com/sipeed/picoclaw/pull/3431) |

**整体判断**：今日项目向前推进幅度 **低**。关闭/合并 1 个 PR 带来局部能力处置，但无 release、无新合并的 provider 扩展；维护侧以清理为主。

## 4. 社区热点

今日可量化讨论热度较低。Issue 侧仅 #3397 有 2 条评论；PR 评论数未提供，无法参与热度排序。

| 类型 | 条目 | 今日可见互动 | 热点解读 | 链接 |
|---|---|---|---|---|
| Issue | #3397 Tsubasa provider catalog | 评论 2；👍 0；已 stale 关闭 | 今日唯一有可见评论量的条目。背后诉求是 **OpenAI 兼容 provider 的目录化与可发现性**：用户已可通过显式 `openai` 模型条目 + 自定义 API base 使用 Tsubasa，但 provider picker 不提供其 endpoint 或公开模型别名，导致开箱体验不足。stale 关闭可能降低该需求的可见度。 | [#3397](https://github.com/sipeed/picoclaw/issues/3397) |
| PR | #3431 Standard Compute provider | 评论数未提供；OPEN | 作者自述在 Standard Compute 工作，目标是将其 OpenAI 兼容网关加入 provider 目录，一个 key 访问多实验室模型。该 PR 与 #3397 同属 **provider catalog 扩展** 信号，且参考了 #2917 NEAR AI Cloud 的既有模式。 | [#3431](https://github.com/sipeed/picoclaw/pull/3431) |
| PR | #3465 spawn direct message 参数 | 评论数未提供；CLOSED | 涉及子代理是否可绕过/直接触达用户的消息权限控制，属于 **可控性与安全性** 方向；当天创建当天关闭，讨论窗口短。 | [#3465](https://github.com/sipeed/picoclaw/pull/3465) |

**热点结论**：今日社区讨论热度低，最明确的诉求集中在 **provider 选择器目录不完整、手动配置成本高**；其次是子代理直接消息权限的控制需求。

## 5. Bug 与稳定性

今日无 Bug、崩溃、回归问题报告；无对应 fix PR。唯一更新的 Issue [#3397](https://github.com/sipeed/picoclaw/issues/3397) 为 Feature 请求且已 stale 关闭，不含 Bug 标签。

- **严重程度**：无可列项。
- **稳定性信号**：中性偏正，但样本仅 1 条 Issue、2 条 PR，不能外推为长期稳定趋势。
- **风险提示**：低活跃可能掩盖未报告问题；建议结合更长周期 Issue/PR 数据观察。

## 6. 功能请求与路线图信号

| 功能请求/信号 | 状态 | 纳入下一版本判断 | 链接 |
|---|---|---|---|
| 将 Tsubasa 加入 OpenAI 兼容 provider 目录 | CLOSED / stale | **低-中**。需求明确且实现面小，但已被 stale 关闭；若维护者批量补齐 provider catalog，可能作为候选重新纳入。 | [#3397](https://github.com/sipeed/picoclaw/issues/3397) |
| 新增 Standard Compute OpenAI 兼容 provider | OPEN，已开放约 24 天 | **中等**。代码路径明确，且遵循 #2917 NEAR AI Cloud 模式；但需维护者 review 与合并决策，当前优先级不确定。 | [#3431](https://github.com/sipeed/picoclaw/pull/3431) |
| `spawn` 增加 `allow_direct_message` 控制子代理直接消息 | CLOSED | **不确定/偏低**。已关闭；若因设计取舍关闭，短期路线图信号弱；若实际合并，则已进入代码能力。 | [#3465](https://github.com/sipeed/picoclaw/pull/3465) |

**路线图信号**：从今日数据看，**provider catalog 扩展**是唯一有连续信号的路线（#3397 + #3431）。子代理消息权限控制是另一条弱信号，但 #3465 已关闭，需维护者明确设计结论。

## 7. 用户反馈摘要

> 说明：给定数据未提供 Issue 评论正文，以下基于 Issue/PR 摘要与可见讨论量提炼，属于摘要级反馈。

- **真实痛点**：Tsubasa 已能通过显式 `openai` 模型条目 + 自定义 API base 使用，但 provider picker **不提供其 endpoint 与公开模型别名**，用户需要手动查找和填写配置。链接：[#3397](https://github.com/sipeed/picoclaw/issues/3397)
- **使用场景**：通过 OpenAI 兼容层接入第三方模型网关/多模型聚合服务；#3431 中 Standard Compute 也定位为“一个 key 访问多实验室模型”的 OpenAI 兼容网关。链接：[#3431](https://github.com/sipeed/picoclaw/pull/3431)
- **满意点**：OpenAI 兼容 provider 机制具备扩展性，用户可通过自定义 API base 接入未内置服务。
- **不满意点**：provider 目录发现性不足、开箱即用体验不完整；小功能请求被 stale 关闭后，用户可能认为需求未被正式评估。
- **权限控制反馈**：#3465 反映子代理执行期间直接消息用户的权限边界需要可配置，体现对可控性与安全性的关注。链接：[#3465](https://github.com/sipeed/picoclaw/pull/3465)

## 8. 待处理积压

| 条目 | 积压情况 | 维护者关注建议 | 链接 |
|---|---|---|---|
| PR #3431 Standard Compute provider | 创建于 2026-10-15，更新于 2026-11-07，已开放约 **24 天**，仍 OPEN | 建议给出明确 review 结论或标签；确认是否缺少测试、文档或 provider metadata 补充。同类 provider 新增有 #2917 先例，积压可能影响外部 provider 贡献意愿。 | [#3431](https://github.com/sipeed/picoclaw/pull/3431) |
| Issue #3397 Tsubasa provider catalog | 创建于 2026-09-28，更新于 2026-11-07，约 **40 天** 后 stale 关闭 | 建议复审 stale 关闭是否合理；若需求仍有效，可考虑 reopen、转为 tracking issue，或在 provider catalog 批量补齐时一并处理。 | [#3397](https://github.com/sipeed/picoclaw/issues/3397) |

**积压结论**：今日最需关注的是 **#3431 的 review 停滞**；#3397 虽已关闭，但暴露了 stale 策略对小功能请求的潜在误伤，建议维护者定期复审 provider catalog 类需求。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 · 2026-11-08

---

## 1. 今日速览

今日项目**输入活跃度处于高位、输出（合并/关闭）端处于相对停滞状态**：过去 24 小时共产生 14 条协作事件（6 条 Issue + 8 条 PR），但**关闭 Issue 0 条、合并/关闭 PR 0 条**，合入吞吐为 0。新增的 6 条 Issue 中有 5 条在创建当日即获得维护者或社区回复，说明**响应速度良好**；但 PR 待合并队列已累计 8 条，最老一条（#8292）积压 22 天未评审，#8524 处于 Under Review 已 7 天。本期最值得关注的信号是 **2.3.0-beta.1 在 Windows 11 IoT LTSC 上启动失败并触发 AppHang 的回归报告（#8616）**，属于发布阻塞级问题且目前无修复 PR。整体健康度评估：**社区供给活跃、维护端审查是当前瓶颈（供给 > 消化）**。

| 指标 | 数值 | 解读 |
|---|---|---|
| Issue 新增/活跃 | 6（0 关闭） | 全部为 OPEN，净增 6 |
| PR 新增/待合并 | 8（0 合并/关闭） | 净增 8，队列压力上升 |
| 新版本 | 0 | 无 release |
| 事件总数 | 14 | 接近近期中高水位 |
| 当日有回复的 Issue | 5 / 6 | 响应效率良好 |
| 合并/关闭率 | 0 / 14 = 0% | ⚠️ 需关注 |

---

## 2. 版本发布

**今日无新版本发布。**

需提示的发布侧风险：2.3.0-beta.1 已出现**同机可复现的启动失败回归**（2.2.2 + post.1 正常、2.3.0-beta.1 报 "path not found" 并 AppHang），见 #8616。在该问题定位前，2.3.0 正式版存在延期风险，建议在 beta 通道补充 Windows LTSC / 非交互式安装目录（如 `C:\QwenPaw`）的冒烟用例。

---

## 3. 项目进展

**今日合并/关闭：0 条 PR、0 条 Issue**，无功能落地。这是本期最需要说明的一点——项目今日处于「只进不出」状态。

可认定为「已接近可合入」的推进项（均为 OPEN，等待评审）：

| PR | 内容 | 状态判断 |
|---|---|---|
| [#8625](https://github.com/agentscope-ai/QwenPaw/pull/8625) | `recall_history` 支持 `include_turn=False` 行级检索，避免为只要匹配行的模型支付全量 turn 展开成本 | `size/S`，实现与 #8621 需求一一对应，**最可能率先合入** |
| [#8623](https://github.com/agentscope-ai/QwenPaw/pull/8623) | 复用 `_collect_distinct_hits` 已解析的 turn 边界，消除同一搜索命中被两次 resolve 的开销 | `size/S`，性能优化，纯内聚改动 |
| [#8624](https://github.com/agentscope-ai/QwenPaw/pull/8624) / [#8622](https://github.com/agentscope-ai/QwenPaw/pull/8622) | 两者均修复 #8620：仅在语句被真正中断时判为超时，避免把 SQLite lock/busy 错误伪装成 Timeout | ⚠️ **重复实现**，需维护者择一合入并关闭另一条 |
| [#8617](https://github.com/agentscope-ai/QwenPaw/pull/8617) | `active_model` 所属 provider 被禁用时提供兜底，修复 #8579 中该频道全部运行抛 `ProviderError` 的可用性缺陷 | `size/M`，用户可见的可用性修复 |

**净进展评估**：代码层面约 4 个独立修复/优化已就绪（其中 1 组重复），合计可解决 3 个 Issue（#8620、#8619、#8621）与 1 个未在本期数据中出现的 Issue（#8579）。若审查跟上，可一次性关闭今日 3 条 Issue 中的 2 条。

---

## 4. 社区热点

**① #8521 — 对话无答复 + Ctrl+C 复制需多次按键 + 新 UI 效率回退**（3 条评论，本期评论最多）
https://github.com/agentscope-ai/QwenPaw/issues/8521
单一 Issue 同时承载了三类不同诉求：**核心功能正确性**（随机且频繁出现「只有思考、没有答复」）、**桌面端交互缺陷**（Chrome/Edge 下均需连按多次才能复制）、**产品方向分歧**（新 UI 被认为比旧版慢且模型切换路径冗长，请求提供 UI 切换开关）。这是本期唯一一条跨越「bug / 交互 / 产品」三层的复合型反馈，也是用户情绪最集中的一条。

**② #8616 — 2.3.0-beta.1 在 Windows 11 IoT LTSC 上无法启动**（2 条评论）
https://github.com/agentscope-ai/QwenPaw/issues/8616
报告者提供了完整的三段式对照信息（可用构建、失败构建、profile 路径与复现步骤），质量很高。背后诉求是**桌面端在非标准 Windows SKU 与自定义安装路径下的分发可靠性**。

**③ 记忆检索性能小集群（#8619 / #8620 / #8621 + PR #8622–#8625）**
https://github.com/agentscope-ai/QwenPaw/issues/8619 · https://github.com/agentscope-ai/QwenPaw/issues/8620 · https://github.com/agentscope-ai/QwenPaw/issues/8621
同一贡献者（@txohyeah）在一天内提交 3 条 Issue + 3 条 PR，全部聚焦 `MemorySpace.search` 的**重复计算、错误语义失真、检索粒度不可控**。这类「issue 与 fix 同日成对出现」的模式对项目非常友好，说明有用户正在深度使用并愿意直接回补代码；同时也暴露出记忆检索路径近期缺少性能回归看护。

---

## 5. Bug 与稳定性

按严重程度排序：

**🔴 P0 / 发布阻塞 — #8616：2.3.0-beta.1 Windows 11 IoT LTSC 启动失败 + AppHang（回归）**
https://github.com/agentscope-ai/QwenPaw/issues/8616
同机 2.2.2+post.1 正常，2.3.0-beta.1（binary 2.3.0.0，sha `6ae46dfe`）报 "path not found" 后挂起。**无 fix PR**。属版本间回归，直接阻断 2.3.0 升级路径。

**🟠 P1 / 核心功能失效 — #8521：对话随机无答复内容**（创建 2026-10-31，已 8 天）
https://github.com/agentscope-ai/QwenPaw/issues/8521
「随机出现但比较频繁」，用户无法区分是模型侧还是客户端侧问题——**缺少可诊断信息（请求 ID / 原始响应 / 结束原因）本身就是问题的一部分**。同一 Issue 内的 Ctrl+C 复制失效为确定性缺陷（Chrome/Edge 均可复现）。**无 fix PR**，为当前最久未闭环的高优先级用户侧故障。

**🟡 P2 / 可观测性缺陷 — #8620：search deadline 过后 SQLite 错误被改写为 TimeoutError**
https://github.com/agentscope-ai/QwenPaw/issues/8620
`memoryspace.py:777-782` 将任意 `sqlite3.OperationalError` 在超期后统一转成 `TimeoutError`，真实 lock/busy 原因被藏进 `__cause__`，显著抬高线上排障成本。**已有 fix PR：#8624、#8622（重复）**。

**🟡 P2 / 性能缺陷 — #8619：同一搜索命中的 turn 边界被重复查询**
https://github.com/agentscope-ai/QwenPaw/issues/8619
`_collect_distinct_hits` 与 `_attach_search_turns` 对同一批命中解析两次边界，搜索成本近乎翻倍；报告者为 2 vCPU 环境，放大效应更明显。**已有 fix PR：#8623**。

**🟡 P2 / 可用性缺陷（有 PR 待合）— #8579 → PR #8617：provider 被禁用后所有运行抛 `ProviderError`**
https://github.com/agentscope-ai/QwenPaw/pull/8617
`agent.json` 保留已禁用 provider 的 `active_model` 时无兜底，导致该频道**全部**运行失败。**有 fix PR，待合并**。

**🟢 P3 / 兼容性 — #8280 → PR #8292：缺 `file_id`/`file_data` 的畸形文件 part 触发 OpenAI 兼容 400**
https://github.com/agentscope-ai/QwenPaw/pull/8292
**有 fix PR，但已积压 22 天未评审**（见第 8 节）。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 关联 PR | 纳入下一版本的可能性 |
|---|---|---|---|
| `recall_history` 支持行级检索（`include_turn=False`） | [#8621](https://github.com/agentscope-ai/QwenPaw/issues/8621) | ✅ [#8625](https://github.com/agentscope-ai/QwenPaw/pull/8625) | **高**。改动小、接口向后兼容（新增尾部关键字参数）、需求与实现同日闭环 |
| 「执行」类工具调用展示具体动作（长任务可观测性） | [#8612](https://github.com/agentscope-ai/QwenPaw/issues/8612) | ❌ 无 | **中**。用户明确肯定「大部分工具已是一句人话」，属于渐进式 UI 优化，需设计稿；可先做文案/参数摘要展示的最小版本 |
| 提供旧版 UI 切换开关 / 优化模型切换路径 | [#8521](https://github.com/agentscope-ai/QwenPaw/issues/8521)（内含） | ❌ 无 | **低–中**。双 UI 并行维护成本高，更现实的是吸收「模型切换繁琐、空白区域过多」的具体痛点做单点优化 |
| 新增 SpecStream 作为 `web_search` provider | — | [#8618](https://github.com/agentscope-ai/QwenPaw/pull/8618) | **待评估**。提交者自述为 SpecStream 员工并附自评 benchmark 链接，属**供应商自荐型集成**；benchmark 数据来自厂商自有页面，建议要求第三方复现后再考虑合入 |

**路线图判断**：下一个小版本（2.3.x）的实质内容大概率由「记忆检索性能与错误语义」这一束改动构成（#8623/#8624/#8625），叠加 #8617 的 provider 兜底。工具调用可观测性（#8612）尚未形成代码，短期内更可能以文案层改进落地。

---

## 7. 用户反馈摘要

**真实痛点**

1. **「不知道是我的问题还是它的问题」** — #8521 中用户无法判断无答复是模型侧还是客户端侧，暴露的是**失败态可诊断性与错误提示缺失**，而非单点 bug。
2. **桌面端基础交互不可靠** — Ctrl+C 在 Chrome/Edge 两个内核下均需多次按键才成功，属高复现率的日常阻塞，直接损伤使用体验的基础盘。
3. **「新版不如旧版高效、流畅」** — 明确点名模型切换路径冗长、大量空白区域、整体反应迟缓。这类「新版劣化」反馈在桌面端迁移期尤其值得重视，用户直接提出了版本回退式诉求。
4. **长任务里的工具调用是黑箱** — #8612 给出了很好的对照：`⏱ 获取 当前时间…`、`📄 阅读 MEMORY.md 预览 16行` 这类输出已足够清晰，但「执行」类工具密集出现时界面无法辨识具体在做什么。
5. **低配环境敏感** — #8619 报告者主动标注 `2 vCPU`，说明存在**资源受限设备上的实际部署场景**，性能回退在此类环境下感知强烈。

**满意面**：多数工具调用已具备人类可读的一句话描述（获用户正面肯定）；Issue 响应通常在当日完成；用户愿意深入源码行号级定位问题（#8619/#8620 精确到 `memoryspace.py:777-782`、`:1034`）。

**不满意面**：UI 反应速度、剪贴板/焦点类桌面桥接可靠性、beta 版本在非标准 Windows SKU 上的启动稳定性。

---

## 8. 待处理积压

**① PR #8292 — 已开启 22 天（2026-10-17 起）无评审**
https://github.com/agentscope-ai/QwenPaw/pull/8292
`size/S`，修复 #8280 的 OpenAI 兼容 400 错误，属用户可见的请求失败。改动小、范围清晰，长期无响应会消耗贡献者意愿，建议优先排期或明确给出不采纳理由。

**② PR #8524 — Under Review 已 7 天**
https://github.com/agentscope-ai/QwenPaw/pull/8524
修复桌面端桥接将 percent-encoded `file://` URI 直接交给 `webbrowser.open`，在 Windows 上导致 workspace HTML 预览打不开。与 #8521 的桌面交互问题（剪贴板/焦点/原生桥接）很可能同源，**建议与 #8521 合并排查**。

**③ Issue #8521 — 高优先级 bug 已挂 8 天且无 fix PR**
https://github.com/agentscope-ai/QwenPaw/issues/8521
核心对话能力随机失效 + 确定性复制缺陷，仍在等 owner。

**④ 需维护者裁决的重复 PR**
[#8624](https://github.com/agentscope-ai/QwenPaw/pull/8624) 与 [#8622](https://github.com/agentscope-ai/QwenPaw/pull/8622) 同时修复 #8620。建议尽快指定主 PR 并关闭另一条，避免两位贡献者的工作互相抵消。

**⑤ 关联但未在本期数据中出现的 Issue**
PR #8617 引用 #8579、PR #8292 引用 #8280，两条源 Issue 均未出现在今日更新列表中，建议确认其当前状态是否与实际修复进度一致。

---

**维护者行动建议（按性价比排序）**：① 优先定位 #8616 的 Windows 启动回归，确定 2.3.0 发布窗口；② 一次性批量合入 #8623/#8624（或 #8622）/#8625 三件小改动，可当日关闭 2 条 Issue、显著改善本期 0 合并的观感；③ 裁决 #8624/#8622 重复并给 #8292 一个明确结论；④ 将 #8521 拆分为「无答复」与「复制失效」两条独立 Issue 分别派单，避免复合 Issue 长期悬置。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目日报｜2026-11-08

> 数据窗口：过去 24 小时｜Issues 更新 500 条、PR 更新 500 条（展示评论数 Top 30 / Top 20）｜新版本：0

## 1. 今日速览

今日项目维持极高水平活跃：24 小时内 Issues 与 PR 合计更新约 1,000 条，折合约 42 条/小时；但结构上仍是“进多出少”——Issue 关闭率 31.2%（156/500），PR 合并/关闭率 34.6%（173/500），待合并 PR 仍高达 327 条。推进主线集中在 Telegram 交付一致性、会话卡死恢复与审批安全三个局部；核心 gateway 性能、Windows 状态库恢复、Kanban 并发可靠性等高风险问题尚未闭环。社区侧 Plugin Hackathon 带来密集的 catalog PR，生态活跃但 review 负担明显上升。整体健康度判断为：**活跃度极高、吞吐中等、稳定性承压、发布节奏停滞**。

| 维度 | 评估 | 依据 |
|---|---|---|
| 活跃度 | 极高 | 24h 内约 1,000 条 Issue/PR 更新 |
| 吞吐 | 中等 | 329 条 Issue/PR 关闭或合并，但 327 条 PR 待合并 |
| 稳定性 | 承压 | 可见 1 个 P0、2 个 P1 未修复，gateway/session 问题成簇 |
| 社区生态 | 活跃 | Plugin Hackathon、catalog PR 密集提交 |
| 发布节奏 | 停滞 | 今日 0 个新版本 |

## 2. 版本发布

今日无新版本发布（0 个），无破坏性变更与迁移注意事项。

## 3. 项目进展

### 3.1 合并/关闭情况

今日 PR 合并/关闭 173 条，但在可见 Top 20 样本中，关闭的 3 条均为插件目录版本重钉，且多被后续版本取代，属于目录治理而非实质功能推进：

| PR | 状态 | 内容 | 判断 |
|---|---|---|---|
| [#151155](https://github.com/NousResearch/hermes-agent/pull/151155) | CLOSED | heartbeat2 0.2.3 | 被 [#151190](https://github.com/NousResearch/hermes-agent/pull/151190)（0.2.4）取代 |
| [#150955](https://github.com/NousResearch/hermes-agent/pull/150955) | CLOSED | fish-audio 1.9.1 | 被 [#151187](https://github.com/NousResearch/hermes-agent/pull/151187)（1.10.0）取代 |
| [#151173](https://github.com/NousResearch/hermes-agent/pull/151173) | CLOSED | hermes-cloud-file-manager 0.6.1 | 被 [#151184](https://github.com/NousResearch/hermes-agent/pull/151184)（0.6.2）取代 |

这种“快速重钉、后 PR 取代前 PR”的模式说明插件目录更新节奏很快，但也造成重复 review 与合并冲突成本。

### 3.2 关键待合并 PR（多已 ci-reviewed）

真正有实质影响的改动集中在待合并队列：

| PR | 影响面 | 推进意义 |
|---|---|---|
| [#150996](https://github.com/NousResearch/hermes-agent/pull/150996) | Telegram 非 gateway 发送路径与 gateway 对齐，覆盖 13 个 issue | 统一 `hermes send`、`send_message`、standalone cron 的服务器、超时、格式化、富消息、相册与通知行为，若合并可消除一整类“gateway 内外不一致”问题 |
| [#151071](https://github.com/NousResearch/hermes-agent/pull/151071) | Telegram flood control 后原生重传文件 | 避免文件被直接丢弃并减少误导性“发送失败”提示 |
| [#151057](https://github.com/NousResearch/hermes-agent/pull/151057) | Telegram 私有 topic 回复重试保留 topic | 修复媒体落到根会话、文本丢失的问题，覆盖多个历史 issue |
| [#151092](https://github.com/NousResearch/hermes-agent/pull/151092) | cron 投递到命名 Telegram private-DM topic | 修复 `<chat>:Debug` 被整体当作 chat id 的问题 |
| [#151186](https://github.com/NousResearch/hermes-agent/pull/151186) | `/refine` 取消时停止 turn 不再卡 executing | 会话生命周期修复，减少“永久 busy”会话 |
| [#151157](https://github.com/NousResearch/hermes-agent/pull/151157) | osascript 破坏性操作强制人工审批 | 直接修复 [#141346](https://github.com/NousResearch/hermes-agent/issues/141346) 的不可恢复数据丢失问题 |
| [#151188](https://github.com/NousResearch/hermes-agent/pull/151188) | spill 文件 JSON 解包，`read_file` 可分页 | 改善大工具输出的可读性与可分页读取 |
| [#84867](https://github.com/NousResearch/hermes-agent/pull/84867) | invalid-JSON 工具恢复按 call id 匹配 | 修复并行同名工具调用中有效调用被误判的问题 |
| [#129262](https://github.com/NousResearch/hermes-agent/pull/129262) | `service_tier` 请求/实际服务层级审计 | 提升计费透明度，对 `/fast` 模式尤其重要 |
| [#124956](https://github.com/NousResearch/hermes-agent/pull/124956) | 新增 `before_turn_end` 插件钩子 | 扩展插件对回答持久化/投递前的干预能力 |

### 3.3 今日关闭的重要 Issue

| Issue | 严重度 | 结果 | 意义 |
|---|---|---|---|
| [#71239](https://github.com/NousResearch/hermes-agent/issues/71239) | P1 | CLOSED | Telegram 可消费更新但 dispatcher 静默卡死，属于消息投递关键故障，关闭是今日最重要的稳定性进展之一 |
| [#143605](https://github.com/NousResearch/hermes-agent/issues/143605) | P2 | CLOSED | Telegram 相册含文档时被 `media_text_inlined_length` 拒绝，影响多文件发送场景 |
| [#141917](https://github.com/NousResearch/hermes-agent/issues/141917) | P2 | CLOSED | 插件加载时 `_evict_modules` 遍历活跃 `sys.modules` 导致 `RuntimeError`，影响 Windows + Python 3.14 用户 |
| [#141910](https://github.com/NousResearch/hermes-agent/issues/141910) | P2 | CLOSED | 共享 bot 的 satellite profile 在出现 LOCAL session adapter 后丢失 cron/background 投递 |
| [#72668](https://github.com/NousResearch/hermes-agent/issues/72668) | P3 | CLOSED | Telegram 错误日志脱敏函数被误放进格式字符串，导致错误未脱敏 |
| [#11994](https://github.com/NousResearch/hermes-agent/issues/11994) | P2 | CLOSED | 中文用户报告的 `[TOOL_CALL]` 解析/中断问题，长期 issue 关闭 |

### 3.4 整体推进评估

以影响面计，今日推进集中在 **Telegram 交付一致性、会话卡死恢复、审批安全** 三个局部；核心 gateway 性能（[#146643](https://github.com/NousResearch/hermes-agent/issues/146643)）、Windows 状态库恢复（[#147938](https://github.com/NousResearch/hermes-agent/issues/147938)）、Kanban 并发可靠性（[#145022](https://github.com/NousResearch/hermes-agent/issues/145022)、[#139029](https://github.com/NousResearch/hermes-agent/issues/139029)）均未闭环。综合看，今日更接近“高吞吐维护日”，而非“版本里程碑日”。

## 4. 社区热点

> PR 评论数字段缺失，以下热点以 Issues 为主，按评论数与反应数排序。

| 条目 | 评论/👍 | 热度原因 | 背后诉求 |
|---|---|---|---|
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) | 58 / 0 | 通过 API 无法从 fork 创建 PR，报 `CreatePullRequest` 权限错误；issue 创建和 fork PR 仍可用 | 外部贡献者被卡在“无法提 PR”这一步，58 条评论说明大家在长期排查 workaround；P3 优先级与贡献摩擦的实际影响不匹配 |
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) | 54 / 1 | 统一 gateway（#106742）合并后遗留问题跟踪，涉及 CLI、TUI、Desktop、API server、编辑器、消息 bot、cron、Kanban、Group Chats | 架构集中化后“单点故障/单点性能瓶颈”暴露，用户希望有一个统一的问题清单和修复节奏 |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | 40 / 4 | 让不同 gateway 上的 bot 跨机器、跨 owner 协作，同时保留各自控制权 | 多 agent 协作是明确的产品方向，但涉及信任、权限、消息路由，属于需要设计决策的长期议题 |
| [#141346](https://github.com/NousResearch/hermes-agent/issues/141346) | 37 / 0 | `smart` 审批模式自动放行 osascript，关闭用户未保存的 PowerPoint 并删除导出文件，造成不可恢复数据丢失 | 用户对“智能审批”的安全边界产生信任危机；破坏性 AppleScript 应强制人工确认 |
| [#129455](https://github.com/NousResearch/hermes-agent/issues/129455) | 26 / 0 | 默认安装下 import-time PM activation 触发 `home_io_guard`，导致大范围测试失败 | 贡献者本地测试环境不可用，直接影响 PR 提交意愿 |
| [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) | 23 / 0 | Kanban 卡片被限流后重试成功，却永久停在 `blocker_auth`，reviewer 永不 spawn | 多 worker 编排的失败恢复状态机不可靠，用户会丢失执行进度 |
| [#146643](https://github.com/NousResearch/hermes-agent/issues/146643) | 19 / 0 | 数千 session 的 store 上，gateway 每次变更重读全量历史，占用 1.5–2.5 CPU 核，Desktop 请求 30s 超时 | 规模化使用后性能急剧退化，直接影响 Desktop 可用性 |
| [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) | 19 / 0 | gateway 在 worker 保存期间卡顿时，Kanban worker 以 `Kanban execution unknown; retained by owner` 崩溃，进行中的工作丢失 | P1 级并发可靠性问题，多 worker 同时运行时一次卡顿可杀死多个 worker |
| [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) | 19 / 0 | `browser_exec` 完成后遗留 `browser_harness.daemon` 进程，无空闲超时 | 长期运行会积累僵尸进程，影响资源与稳定性 |
| [#53347](https://github.com/NousResearch/hermes-agent/issues/53347) | 10 / 9 | 要求允许 `context_length` 低于 64K，改为警告而非硬失败 | 全场最高 👍，代表 16GB Mac + Ollama 等轻量本地部署用户的明确需求 |

**热点分析：**

1. **Gateway 是当前问题的引力中心。** [#143547](https://github.com/NousResearch/hermes-agent/issues/143547)、[#146643](https://github.com/NousResearch/hermes-agent/issues/146643)、[#145022](https://github.com/NousResearch/hermes-agent/issues/145022)、[#133421](https://github.com/NousResearch/hermes-agent/issues/133421)、[#143659](https://github.com/NousResearch/hermes-agent/issues/143659)、[#139347](https://github.com/NousResearch/hermes-agent/issues/139347) 均指向统一 gateway 后的会话状态、性能与并发问题。集中化带来了行为一致性，也放大了单点故障的爆炸半径。
2. **贡献者入口存在结构性摩擦。** [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) 58 条评论、持续一个多月仍未解决，且被标记为 `blocked` / `cause/upstream`。如果外部贡献者无法顺畅提 PR，会直接削弱社区贡献意愿。
3. **安全优先级需要重新校准。** [#141346](https://github.com/NousResearch/hermes-agent/issues/141346) 造成不可恢复数据丢失，但标记为 P3；对应的修复 PR [#151157](https://github.com/NousResearch/hermes-agent/pull/151157) 已 ci-reviewed，建议优先合入。
4. **Kanban 编排可靠性问题成簇。** [#119070](https://github.com/NousResearch/hermes-agent/issues/119070)、[#145022](https://github.com/NousResearch/hermes-agent/issues/145022)、[#148958](https://github.com/NousResearch/hermes-agent/issues/148958)、[#139029](https://github.com/NousResearch/hermes-agent/issues/139029)、[#75444](https://github.com/NousResearch/hermes-agent/issues/75444) 共同描绘出“限流/卡顿/重启 → 状态机卡死 → 工作丢失”的故障链，需要系统性修复而非单点补丁。

## 5. Bug 与稳定性

| 级别 | Issue | 问题 | Fix PR 状态 |
|---|---|---|---|
| **P0** | [#147938](https://github.com/NousResearch/hermes-agent/issues/147938) | Windows 上 `state.db` 校验把“运行时持有/暂停的文件锁”误判为损坏，自动恢复数月前的旧快照覆盖健康数据，并把成功恢复误报为“未完成” | 可见 PR 样本中未见对应 fix PR；属于最高优先级数据安全问题 |
| **P1** | [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) | gateway 卡顿时 Kanban worker 崩溃，报 `Kanban execution unknown; retained by owner`，进行中工作丢失 | 未见 fix PR |
| **P1** | [#139029](https://github.com/NousResearch/hermes-agent/issues/139029) | Kanban managed worker 因 `WorkerPersistenceError: synchronous_rpc_on_event_loop` 死亡 | 未见 fix PR |
| **P1** | [#71239](https://github.com/NousResearch/hermes-agent/issues/71239) | Telegram 可消费更新但 dispatcher 静默停止，表现为“已连接但无响应” | 已 CLOSED，属于今日重要稳定性收敛 |
| **P2** | [#141346](https://github.com/NousResearch/hermes-agent/issues/141346) | `smart` 审批自动放行 osascript，关闭未保存 PPT 并删除导出，造成不可恢复数据丢失 | 有 fix PR [#151157](https://github.com/NousResearch/hermes-agent/pull/151157)，待合并 |
| **P2** | [#146643](https://github.com/NousResearch/hermes-agent/issues/146643) | gateway 每次变更重读全量 session history，CPU 与 Desktop 超时随 store 增长 | 未见 fix PR |
| **P2** | [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) | Kanban 卡片限流后成功仍永久停在 `blocker_auth`，reviewer 不 spawn | 未见 fix PR |
| **P2** | [#75444](https://github.com/NousResearch/hermes-agent/issues/75444) | 自动分解器重新分发已升级 triage 任务，形成无限 block bounce | 未见 fix PR |
| **P2** | [#148958](https://github.com/NousResearch/hermes-agent/issues/148958) | gateway-owner 卡顿导致 worker exit 1，被计为普通 crash；连续两次即 block 卡片 | 未见 fix PR |
| **P2** | [#133421](https://github.com/NousResearch/hermes-agent/issues/133421) | Desktop browser session guard 把真正聚焦的 chat tile 误判为后台会话并拒绝 | 未见 fix PR |
| **P2** | [#143659](https://github.com/NousResearch/hermes-agent/issues/143659) | TUI 启动即写入 0-message session row，session picker 充满 “(Untitled)” 幽灵条目 | 未见 fix PR |
| **P2** | [#144116](https://github.com/NousResearch/hermes-agent/issues/144116) | 上游 “Clean EOF” 流结束被误标为 output-token 截断，残留 stub 消息使 session 进入 replay 死循环 | 未见 fix PR |
| **P2** | [#140222](https://github.com/NousResearch/hermes-agent/issues/140222) | 带 monitor 的 cron agent job 在每个未变化 tick 都创建空 session | 未见 fix PR |
| **P2** | [#125537](https://github.com/NousResearch/hermes-agent/issues/125537) | `hermes pm gc` 测量执行快照的 install key，静默地不回收任何依赖代际 | 未见 fix PR |
| **P2** | [#139347](https://github.com/NousResearch/hermes-agent/issues/139347) | 有界 hosted-room transcript 淘汰了仍被 settlement 引用的源用户，导致后续 planner 校验失败 | 未见 fix PR |
| **P2** | [#129455](https://github.com/NousResearch/hermes-agent/issues/129455) | 默认安装下测试套件因 `home_io_guard` 大范围失败 | 未见 fix PR |
| **P3** | [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) | `browser_exec` 遗留无超时的 `browser_harness.daemon` 进程 | 未见 fix PR |
| **P3** | [#105163](https://github.com/NousResearch/hermes-agent/issues/105163) | stall-guard 意图检测仅匹配英文短语，非英语 agent 的反卡死机制失效 | 未见 fix PR |
| **P3** | [#108891](https://github.com/NousResearch/hermes-agent/issues/108891) | delegate 子 agent 未传 `context_length`，上下文文件容量退化为 20,000 字符下限 | 未见 fix PR |
| **P2** | [#143605](https://github.com/NousResearch/hermes-agent/issues/143605) | Telegram 相册含文档时被 `invalid_params (media_text_inlined_length)` 拒绝 | 已 CLOSED |

**稳定性判断：** 今日 Telegram 相关故障有明显收敛（#71239、#143605 关闭，多个 fix PR 在途），但 gateway/session 与 Kanban 编排仍是高风险区。P0 #147938 的数据覆盖风险最高，且未见到对应修复，建议维护者优先确认是否存在未展示的 fix PR。

## 6. 功能请求与路线图信号

| 需求/提案 | 信号强度 | 关联 PR | 纳入下一版本的可能性 |
|---|---|---|---|
| [#53347](https://github.com/NousResearch/hermes-agent/issues/53347) 允许 `context_length` 低于 64K，改为警告 | 10 评论、9 👍，最高反应；`needs-decision` | 未见 | **中等偏高**。实现成本低，主要卡产品决策；若维护者接受“警告而非硬失败”，适合放入下一版本 |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) 跨 gateway/跨 owner 的 bot 协作 | 40 评论、4 👍，`needs-decision` | 未见 | **偏低（近期）**。涉及信任、权限、路由和安全边界，更像多版本 epic，而非 patch 级功能 |
| [#52554](https://github.com/NousResearch/hermes-agent/issues/52554) Desktop 聊天选中文本浮动 “Quote” 按钮 | 13 评论、4 👍，P3 | 未见 | **中等**。小而明确的桌面 UX 改进，适合桌面 polish 批次 |
| [#124956](https://github.com/NousResearch/hermes-agent/pull/124956) 新增 `before_turn_end` 插件钩子 | PR 已开，插件 API 扩展 | 自身 | **中等偏高**。与 Plugin Hackathon 生态扩张方向一致，但需设计评审确认钩子语义 |
| [#151182](https://github.com/NousResearch/hermes-agent/pull/151182) `learn-from-materials` 可选技能：书籍/PDF 转为带引用的学习页与测验 | 新 PR，ci-reviewed | 自身 | **较高**。作为 optional skill，合入风险低，能增强学习场景 |
| [#150212](https://github.com/NousResearch/hermes-agent/pull/150212) `assumption-ledger` 目录插件 | 新 PR | 自身 | **较高**。插件目录扩展，符合生态策略 |
| [#151185](https://github.com/NousResearch/hermes-agent/pull/151185) `microbiz-desk` 目录插件 | 新 PR | 自身 | **较高**。面向小企业的客户/销售/债务/周报工具，扩展垂直场景 |
| [#151188](https://github.com/NousResearch/hermes-agent/pull/151188) spill 文件 JSON 解包，`read_file` 可分页 | 新 PR | 自身 | **较高**。直接改善工具输出可用性，属于低风险高收益修复 |
| [#151186](https://github.com/NousResearch/hermes-agent/pull/151186) `/refine` 取消时停止 turn 不再卡 executing | 新 PR，ci-reviewed | 自身 | **高**。会话生命周期修复，符合当前 session 稳定性主题 |
| [#151157](https://github.com/NousResearch/hermes-agent/pull/151157) osascript 破坏性操作强制人工审批 | 新 PR，ci-reviewed，修复 #141346 | 自身 | **高**。安全问题 + 数据丢失，建议优先合入 |

**路线图判断：** 下一版本大概率以 **Telegram 交付一致性 + 会话生命周期修复 + 插件 API/目录扩展** 为主题；`context_length` 下限调整有机会作为小特性进入；跨 gateway bot 协作短期内不太可能落地。

## 7. 用户反馈摘要

**1. Telegram 仍是体验最不稳定的外部集成。**
用户报告了多类问题：相册含文档被整体拒绝（[#143605](https://github.com/NousResearch/hermes-agent/issues/143605)）、flood control 后文件被丢弃、私有 topic 回复丢失路由、dispatcher 静默卡死（[#71239](https://github.com/NousResearch/hermes-agent/issues/71239)）、错误日志未脱敏（[#72668](https://github.com/NousResearch/hermes-agent/issues/72668)）。核心诉求是 **gateway 内外发送行为一致**，这正是 [#150996](https://github.com/NousResearch/hermes-agent/pull/150996)、[#151071](https://github.com/NousResearch/hermes-agent/pull/151071)、[#151057](https://github.com/NousResearch/hermes-agent/pull/151057)、[#151092](https://github.com/NousResearch/hermes-agent/pull/151092) 这一组 PR 试图解决的问题。

**2. Kanban 多 worker 场景的可靠性不足。**
用户在实际并发运行中遇到 worker 崩溃、卡片永久停在 `blocker_auth`、自动分解器无限 bounce、gateway 卡顿被计为普通 crash 等（[#119070](https://github.com/NousResearch/hermes-agent/issues/119070)、[#145022](https://github.com/NousResearch/hermes-agent/issues/145022)、[#148958](https://github.com/NousResearch/hermes-agent/issues/148958)、[#75444](https://github.com/NousResearch/hermes-agent/issues/75444)、[#139029](https://github.com/NousResearch/hermes-agent/issues/139029)）。用户的核心痛点是 **进行中的工作会丢失**，而不只是“卡片状态不对”。

**3. 数据安全事件严重侵蚀信任。**
[#141346](https://github.com/NousResearch/hermes-agent/issues/141346) 中，agent 通过 osascript 关闭用户未保存的 PowerPoint 并删除导出文件，造成不可恢复的数据丢失；[#147938](https://github.com/NousResearch/hermes-agent/issues/147938) 中，Windows 更新流程把活锁误判为损坏，用数月前的快照覆盖健康数据。用户对“智能审批”和“自动恢复”的默认行为提出明确质疑，期望 **破坏性操作必须人工确认、恢复前必须可证明数据已损坏**。

**4. 本地/轻量部署需求明确。**
[#53347](https://github.com/NousResearch/hermes-agent/issues/53347) 获得全场最高 👍（9 个），反映 16GB Mac + Ollama 等资源受限用户被 64K 硬下限挡住。用户并非要求降低默认值，而是希望 **低于 64K 时警告而非硬失败**。此外 [#102081](https://github.com/NousResearch/hermes-agent/issues/102081) 的 Linux Desktop 安装错误也说明桌面端在非 macOS 环境仍有摩擦。

**5. 非英语用户存在 i18n 盲区。**
[#105163](https://github.com/NousResearch/hermes-agent/issues/105163) 指出 stall-guard 意图检测只匹配 5 个英文短语，非英语 agent 的反卡死机制实际失效；[#11994](https://github.com/NousResearch/hermes-agent/issues/11994) 是中文用户长期报告的 `[TOOL_CALL]` 中断问题（已关闭）。这说明核心启发式逻辑仍以英语为中心。

**6. 规模化性能问题开始显现。**
[#146643](https://github.com/NousResearch/hermes-agent/issues/146643) 中，数千 session 的 store 导致 gateway 占用 1.5–2.5 CPU 核、Desktop 请求 30s 超时。用户的使用场景已经从“几十个会话”进入“数千个会话”，全量重读历史的设计不再可行。

**7. 桌面 UX 细节仍被持续关注。**
[#52554](https://github.com/NousResearch/hermes-agent/issues/52554) 的 Quote 按钮、[#143659](https://github.com/NousResearch/hermes-agent/issues/143659) 的幽灵 session、[#133421](https://github.com/NousResearch/hermes-agent/issues/133421) 的 browser focus guard 误判，都属于“不影响核心功能但高频摩擦”的体验问题。

## 8. 待处理积压

### 8.1 长期未闭环的高影响 Issue

| 条目 | 创建时间 | 状态 | 积压原因 | 建议 |
|---|---|---|---|---|
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) | 2026-10-03 | OPEN，58 评论，`blocked` / `cause/upstream` | 上游权限问题导致 fork 无法通过 API 提 PR | 维护者向上游升级；同时提供 GitHub App token / 手动 web UI 的明确 workaround 文档 |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | 2026-08-29 | OPEN，40 评论，`needs-decision` | 跨 gateway/跨 owner 协作涉及信任与权限设计，长期未决策 | 指定 owner 输出设计文档，明确是否进入下一阶段 |
| [#53347](https://github.com/NousResearch/hermes-agent/issues/53347) | 2026-06-27 | OPEN，10 评论，9 👍，`needs-decision` | 64K 硬下限的产品决策未定 | 给出“警告 vs 硬失败”的明确结论；若接受，实现成本很低 |
| [#52554](https://github.com/NousResearch/hermes-agent/issues/52554) | 2026-06-25 | OPEN，13 评论，P3 | 桌面 UX 小特性，长期排队 | 纳入桌面 polish 批次，避免单点长期挂起 |
| [#75444](https://github.com/NousResearch/hermes-agent/issues/75444) | 2026-07-31 | OPEN，12 评论，P3 | 自动分解器未排除已升级 triage 任务 | 修复 `list_triage_ids` / `decompose_task` 的排除逻辑，避免无限 bounce |
| [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) | 2026-09-24 | OPEN，19 评论 | browser daemon 无空闲超时，长期泄漏 | 增加 daemon idle timeout 与进程回收 |
| [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) | 2026-09-22 | OPEN，23 评论，`needs-decision` | 限流后成功仍永久 `blocker_auth`，状态机设计问题 | 优先修复，因其直接导致 reviewer 不 spawn、卡片永久卡住 |
| [#129455](https://github.com/NousResearch/hermes-agent/issues/129455) | 2026-09-30 | OPEN，26 评论，P2 | 默认安装测试套件大范围失败 | 影响贡献者体验，建议与 CI 环境修复一起处理 |
| [#125537](https://github.com/NousResearch/hermes-agent/issues/125537) | 2026-09-27 | OPEN，11 评论，P2 | `pm gc` 静默不回收，属于“成功但无效” | 修复 `repo_root()` 对执行快照的依赖，补充回归测试 |
| [#108891](https://github.com/NousResearch/hermes-agent/issues/108891) | 2026-09-12 | OPEN，7 评论，P2 | delegate 未传 `context_length`，子 agent 容量退化 | 一行级修复，适合快速合入 |
| [#105163](https://github.com/NousResearch/hermes-agent/issues/105163) | 2026-09-07 | OPEN，7 评论，P2 | stall-guard 仅英文，i18n 缺失 | 扩展多语言意图匹配，或改为模型判定 |

### 8.2 低讨论/待 review 的 PR

| PR | 创建时间 | 状态 | 风险 | 建议 |
|---|---|---|---|---|
| [#84867](https://github.com/NousResearch/hermes-agent/pull/84867) | 2026-08-12 | OPEN，未见评论 | 修复 invalid-JSON 工具恢复按名称匹配导致有效 sibling 不执行；已挂起近 3 个月 | 安排 review，合入或明确关闭理由 |
| [#129262](https://github.com/NousResearch/hermes-agent/pull/129262) | 2026-09-30 | OPEN，未见评论 | `service_tier` 审计缺失，影响计费透明度 | 安排 review，尤其确认 `/fast` 路径 |
| [#124956](https://github.com/NousResearch/hermes-agent/pull/124956) | 2026-09-27 | OPEN，未见评论，`needs-decision` | 插件钩子涉及 turn 生命周期语义，长期未决策 | 先做设计结论，再决定是否继续维护该 PR |

## 附：数据说明

- 本报告基于过去 24 小时内更新的 500 条 Issues 与 500 条 PR，Issues 仅展示评论数 Top 30、PR 仅展示 Top 20，因此“未见 fix PR”仅代表未出现在可见样本中，不代表一定不存在。
- PR 评论数字段缺失，PR 热度主要依据更新时间、影响面与 `ci-reviewed` 标记判断。
- “合并/关闭”为合并与关闭的合计值，无法从当前数据区分二者。
- 无历史 release 数据，无法判断本次是否为最长发布间隔。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 · 2026-11-08

> 数据窗口：过去 24 小时（截至 2026-11-08）

---

## 1. 今日速览

AstrBot 今日维持**高活跃、低吞吐**的节奏：24 小时内 Issues 更新 8 条（新开/活跃 5、关闭 3），PR 更新 18 条，其中 **17 条仍待合并**、仅 1 条关闭，新版本发布 0 个。开发侧呈现明显的“止血式修复”特征——今日新开的 6 条 PR 几乎全部是对当天/近期 Bug 的定点修复（shell 安全策略、Telegram 超时、空思考块、本地 HTTP 重试），并且已有 #11033/#11034、#11039 等问题在报告后 1 天内获得修复 PR，响应链路健康。但待合并队列持续膨胀到 17 条，其中 5 条已是 10 月底甚至 7 月底的旧 PR，**评审资源是当前最明显的瓶颈**。另有一个长尾 10 个月的老 Issue (#4585) 今日关闭，工具调用稳定性问题的旧账正在被清理。

| 指标 | 数值 | 解读 |
|---|---|---|
| Issues 更新 | 8（开 5 / 关 3） | 关闭率 37.5%，出入基本平衡 |
| PR 更新 | 18（待合 17 / 合并·关闭 1） | 积压速度 > 消化速度，⚠️ |
| 新版本 | 0 | 与上一版本 4.29.4 间隔内继续 patch 期 |
| 新 PR 中含 “Fixes #” | 5 条 | 问题 → 修复闭环率高 |

---

## 2. 版本发布

过去 24 小时**无新版本发布**。当前社区反馈集中在 **4.29.4** 及其与 4.10.2 的行为差异（见 #4585、#11040），建议下个 patch 版本优先纳入 #11041、#11040 相关修复，以回应工具调用回退类投诉。

---

## 3. 项目进展

今日唯一进入合并/关闭状态的 PR：

- **[#11036] fix(dashboard): stop WebChat scroll jumps in Firefox**（已关闭，Fixes #11035）
  https://github.com/AstrBotDevs/AstrBot/pull/11036
  修复 Firefox 下 WebChat 滚动历史消息反复回弹的问题，根因是 `markstream-vue` 默认开启 `content-visibility: auto` 与容器 containment。属于**用户体验型回归修复**，直接回应长会话/表格消息场景下 Firefox 用户的核心痛点。对应 Issue #11035 同日关闭。

同时今日关闭了 3 个 Issue，向前推进较为明确：

- **#4585**（2026-01-20 创建，10 个月僵尸 Issue 关闭）——工具调用异常 / 不调用工具的回退问题，涉及 `area:provider` 与插件工具链，是本期关闭的**最高价值条目**。
  https://github.com/AstrBotDevs/AstrBot/issues/4585
- **#11040**——插件工具调用失败后消息队列阻塞（严重级别最高的新 Bug），当日报告、当日关闭。
  https://github.com/AstrBotDevs/AstrBot/issues/11040
- **#11035**——Firefox WebChat 滚动回弹。

**整体推进度评估**：修复方向正确且聚焦（消息时序、滚动、思考块、shell 白名单），但从“关闭 1 条 PR”看，**代码合入速度显著滞后于问题发现速度**，需关注评审带宽。

---

## 4. 社区热点

按评论数与关注度排序：

1. **#4585 [CLOSED] 新版本工具调用的不调用和异常输出调用状态的问题** — 评论 **6** 条（今日最高）
   https://github.com/AstrBotDevs/AstrBot/issues/4585
   讨论核心：4.29.x 相比 4.10.2 出现“工具不被调用”“输出不符合人格描述”两类回归，且用户以 `astrbot_plugin_gitee_aiimg` 的自主生图为复现场景。**诉求**：希望维护者建立版本间工具调用行为的回归基线，而非个案修补。该 Issue 从 1 月挂到 11 月才关闭，本身即是对工具链稳定性的长期不满。

2. **#11028 [OPEN] Telegram 适配器未暴露 `media_write_timeout`** — 评论 2 条
   https://github.com/AstrBotDevs/AstrBot/issues/11028
   用户 @skyirm 给出了完整的 `TimedOut ← httpx.WriteTimeout ← httpcore.WriteTimeout` 调用栈，指出弱上行网络下大视频必然失败。**诉求**：需要可配置的超时参数，而非硬编码 20 秒。已有 PR #11043 响应。

3. **#11038 [OPEN] 将 NagaAI 加入 chat provider 模板** — 评论 2 条
   https://github.com/AstrBotDevs/AstrBot/issues/11038
   OpenAI 兼容的聚合网关（覆盖 Anthropic/OpenAI/Google/DeepSeek/智谱/Moonshot），要求与 302.AI、TokenPony、Compshare 并列进入模板。**诉求**：模板层面对“多模型聚合网关”这类 provider 的覆盖不足。

> 趋势判断：今日热点从“功能讨论”**明显向“稳定性与适配器健壮性”倾斜**，用户关注点正从“能不能用”转向“在网络/平台边界条件下稳不稳”。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 高严重度

- **#11040 [CLOSED] 插件工具调用失败后，消息队列无法处理**
  https://github.com/AstrBotDevs/AstrBot/issues/11040
  插件工具报错后，后续消息在主线程队列中无限排队，LLM 回复也不清空；表现为连续多轮请求被合并回复。**影响会话可用性**，属状态机缺陷。**已关闭**，但数据中没有对应 PR，建议维护者补充关闭原因（是否为已有修复覆盖）。

- **#4585 [CLOSED] 工具调用的不调用与异常输出调用状态**
  https://github.com/AstrBotDevs/AstrBot/issues/4585
  4.29.x 相对 4.10.2 的**行为回归**，影响所有依赖工具调用的插件。已关闭，但建议在下个版本 CHANGELOG 中显式记录根因与修复版本，避免用户重复报告。

### 🟠 中严重度

- **#11033 / #11034 [OPEN] `reasoning_content` 为空字符串时生成空 ThinkPart 并写入上下文**
  https://github.com/AstrBotDevs/AstrBot/issues/11033
  https://github.com/AstrBotDevs/AstrBot/issues/11034
  **同一作者重复提交的两条 Issue（内容完全一致）**，建议合并为一条。污染 `data_v4.db` 中 `conversations.content`，每条 assistant 消息开头插入 `{"type":"think","think":""}`，个别轮次还会诱导模型复读该结构。
  ✅ **已有 fix PR：[#11041] fix: skip empty unsigned thinking parts**（同时修复 #11033 与 #11034）
  https://github.com/AstrBotDevs/AstrBot/pull/11041

- **#11039 [OPEN] shell blocklist 以原始子串匹配拒绝 `/tmp` 下的 `rm -rf`**
  https://github.com/AstrBotDevs/AstrBot/issues/11039
  安全策略过宽导致合法清理命令被拦截，用户被迫绕行。属**“安全 vs 可用性”权衡缺陷**。
  ✅ **已有 fix PR：[#11045] parse rm targets in local shell blocklist**（解析 rm 目标、放行 `/tmp`、`/var/tmp` 与工作目录路径）
  https://github.com/AstrBotDevs/AstrBot/pull/11045

- **#11028 [OPEN] Telegram 大视频固定 20 秒写入超时**
  https://github.com/AstrBotDevs/AstrBot/issues/11028
  ✅ **已有 fix PR：[#11043] report Telegram media request timeout details**（先补可观测性）
  https://github.com/AstrBotDevs/AstrBot/pull/11043
  ⚠️ 注意：该 PR 目前只解决**日志可诊断性**，尚未真正暴露 `media_write_timeout` 配置项，需求本体可能仍未闭环。

### 🟡 低严重度（已修复）

- **#11035 [CLOSED] Firefox 下 WebChat 向上滚动反复回弹**
  https://github.com/AstrBotDevs/AstrBot/issues/11035
  ✅ 已由 **#11036** 修复并关闭。
  https://github.com/AstrBotDevs/AstrBot/pull/11036

### 稳定性小结

今日 5 个新 Bug 中 **4 个在 24 小时内获得修复 PR**（闭环率 80%），响应速度优秀；但 #11040 与 #4585 关闭时**未见对应 PR 记录**，存在“静默关闭”风险，建议明确关闭依据。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 是否已有 PR | 纳入下版本可能性 |
|---|---|---|---|
| Telegram 媒体上传超时可配置 | #11028 | 部分（#11043 仅日志） | 🟡 中——需追加配置项实现 |
| 新增 NagaAI 作为 chat provider 模板 | #11038 | ❌ 无 | 🟢 高——纯模板配置，改动小、社区需求明确 |
| 新增 SpecStream 网页搜索 provider | — | ✅ #11037（作者即 SpecStream 员工） | 🟡 中——需评估第三方商业 API 的引入策略 |
| 删除会话时清理 UMO 元数据 | — | ✅ #10816（Closes #10704） | 🟢 高——解决孤儿数据，逻辑收敛 |
| 知识库重命名同步到配置 | — | ✅ #11032 | 🟢 高——修复“重命名后检索静默失效”的隐性问题 |
| Dashboard 配置条件支持 empty/notEmpty | — | ✅ #10450 | 🟡 中——纯前端增强，已挂 1 个月 |
| Gemini schema 保留 object type/properties | — | ✅ #11030（Fixes #11029） | 🟢 高——影响 MCP/插件工具在 Gemini 下的可用性 |

**路线图信号**：本期功能请求高度集中在**“provider / 适配器生态扩展”**（NagaAI、SpecStream）与**“数据一致性”**（UMO 清理、KB 重命名）两条线上，说明 AstrBot 已进入**生态接入期**，而非核心能力建设期。

---

## 7. 用户反馈摘要

**真实痛点：**

1. **版本回退焦虑**（#4585）：用户明确以“相同人设、相同模型，4.10.2 正常”作为对照，说明升级带来的**工具调用行为劣化**是当前最伤用户信任的问题。用户在 10 个月里持续更新该 Issue，反映维护者与用户在回归判定标准上缺乏共识工具。

2. **弱网/弱上行环境被忽视**（#11028）：`media_write_timeout` 硬编码 20 秒，直接宣判家庭宽带/低带宽 VPS 用户“大视频不可用”。这是典型的**默认值未覆盖边缘部署场景**。

3. **安全策略的“一刀切”代价**（#11039）：用户对 `rm -rf` 被笼统拦截表示理解安全初衷，但认为“在 `/tmp` 下清理临时文件”是正常运维，反映策略粒度不足。

4. **上下文数据被污染且难自愈**（#11033/#11034）：用户已经能定位到 `data_v4.db` 的 `conversations.content` 结构异常，说明**高级用户占比高、排障能力强**，但也说明数据库层的脏数据缺乏迁移/清洗机制。

**使用场景特征：**
- 插件化工具调用（生图插件 `astrbot_plugin_gitee_aiimg`、万象画卷）是主力使用场景；
- 部署形态以 Linux + 自建 VPS 为主，网络条件普遍一般；
- Telegram 与 QQ 官方 Bot 是当前主要适配压力点。

**满意度信号：** Issue 语气整体克制、复现步骤详实，说明社区对项目**认同度高、愿意投入排障成本**；不满主要集中在“版本间行为不透明”与“配置项不可控”，而非功能缺失。

---

## 8. 待处理积压

以下条目长期未合入/未响应，建议维护者优先分诊：

### PR 积压（按搁置时长排序）

| PR | 标题 | 创建日 | 搁置 | 风险提示 |
|---|---|---|---|---|
| [#9459](https://github.com/AstrBotDevs/AstrBot/pull/9459) | fix(security): remove SSL verification downgrade fallback | 2026-07-30 | **~100 天** | 🔴 `size:XL` + 安全漏洞（MITM 降级），长期未合入是**安全隐患敞口** |
| [#10450](https://github.com/AstrBotDevs/AstrBot/pull/10450) | feat(dashboard): empty/notEmpty 条件运算符 | 2026-10-08 | ~31 天 | 🟡 纯前端，可快速了结 |
| [#10477](https://github.com/AstrBotDevs/AstrBot/pull/10477) | fix(qqofficial): 列表内公式被裁切 | 2026-10-09 | ~30 天 | 🟡 QQ 官方 Bot 用户可感知 |
| [#10809](https://github.com/AstrBotDevs/AstrBot/pull/10809) | fix(kb): 分页越界导致 `OFFSET -20` | 2026-10-27 | ~12 天 | 🟠 外部输入直达 SQL offset，建议尽快处理 |
| [#10810](https://github.com/AstrBotDevs/AstrBot/pull/10810) | fix(dashboard): 备份清单读取移出事件循环 | 2026-10-27 | ~12 天 | 🟠 阻塞事件循环，备份多时明显卡顿 |
| [#10811](https://github.com/AstrBotDevs/AstrBot/pull/10811) | fix(dashboard): 跳过列目录中消失的备份 | 2026-10-27 | ~12 天 | 🟡 与 #10810 同源，可一并评审 |
| [#10816](https://github.com/AstrBotDevs/AstrBot/pull/10816) | feat(conversations): 删除会话时清理 UMO 元数据 | 2026-10-27 | ~12 天 | 🟢 Closes #10704，数据一致性收益明确 |
| [#10817](https://github.com/AstrBotDevs/AstrBot/pull/10817) | fix: 版本比较保留预发布标识符 | 2026-10-27 | ~12 天 | 🟠 `1.0.0-dev` 与 `1.0.0-delta` 排序错误，影响更新判定 |

**集中观察**：`@MindOfqc` 一人贡献了 #10809/#10810/#10811/#10817 四条，均属**边界条件加固**类高质量修复，却集体滞留 12 天——建议维护者**按提交者打包评审**，一次性降低队列深度。

### Issue 侧提醒

- **#11033 与 #11034 为完全重复条目**，建议合并/关闭其一，避免污染去重统计。
- **#11043 尚未真正解决 #11028 的诉求**（仅补日志），请勿在关闭 Issue 前判定闭环。
- **#4585 与 #11040 的关闭缺少关联 PR 说明**，建议补充根因，否则同类问题将再次涌入。

---

### 健康度总评

| 维度 | 评价 |
|---|---|
| 问题发现与响应速度 | 🟢 优秀（80% 新 Bug 24h 内出 PR） |
| 代码合入吞吐 | 🔴 偏弱（18 条 PR 仅 1 条关闭，队列持续加长） |
| 版本稳定性 | 🟡 关注（4.29.x 存在工具调用回归投诉） |
| 社区参与质量 | 🟢 优秀（复现步骤详实、含调用栈与数据库样本） |
| 长期风险 | 🟠 安全类 PR #9459 悬置超 3 个月，需明确处置结论 |

**建议今日行动项**：① 优先评审 #11041/#11045/#11030 三个小体积修复；② 对 #9459 给出明确的合并或拒绝结论；③ 合并 #11033/#11034 重复 Issue 并补全 #11040 与 #4585 的关闭依据。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目日报 · 2026-11-08

> 数据口径：过去 24 小时 GitHub Discussions 更新 186 条；项目未启用 Issues/PR，代码合并经 Releases 落地；今日 Releases 为 0。以下分析以 Discussions 为主要素材。

---

## 1. 今日速览

- **社区活跃度处于高位**：24 小时内 Discussions 更新 186 条，15 条高评论帖合计贡献 174 条评论，讨论密度显著高于常规维护日。
- **发布侧处于静默期**：今日无新 Release，无新增合并摘要；社区讨论主要围绕已发布的 `0.2.1` 系列与 `0.2.2-rc.1` 的验证反馈展开。
- **稳定性承压是今日主线**：桌面端认证 Cookie 溢出、`0.2.2-rc.1` 启动崩溃循环、分支对话丢失、Windows 安装失败等问题集中出现，且多条跨越多个预发布版本仍未闭环。
- **需求侧信号明确**：长期记忆（#1345）与 Agent 状态通知（#7569）持续获得讨论，插件生态活跃但依赖隔离问题开始显现。
- **整体健康度评估**：社区热度高、反馈质量好，但发布节奏与缺陷闭环速度存在错位，rc 阶段的回归问题正在消耗用户耐心，建议维护者优先处理桌面端启动链路与升级链路的阻断性问题。

---

## 2. 版本发布

**今日无新版本发布（Releases：0）。**

因此本次日报无新增版本 changelog 可供摘要。需要说明的是，项目代码合并通过 Releases 落地，今日 Releases 为空意味着**今日没有新的功能合并或修复上线**，而非项目无活动——186 条 Discussions 更新表明社区侧仍在高强度使用与验证既有版本。

从讨论上下文可观察到当前版本分布：

- `0.2.1-alpha.4` / `0.2.1-alpha.5` / `0.2.1-rc.1`：仍被部分用户使用，且 #9924 明确指出认证 Cookie 问题“同样存在于 alpha.5 与 rc.1”。
- `0.2.1-rc.2`：有用户报告从 `0.2.0-rc.2` 升级安装失败（#9995）。
- `0.2.2-rc.1`：已成为当前社区验证焦点，涉及启动崩溃（#12502）与分支对话丢失（#12230）等回归反馈。

> 相关链接：[#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) · [#9995](https://github.com/deepseek-ai/deepseek-harness/discussions/9995) · [#12502](https://github.com/deepseek-ai/deepseek-harness/discussions/12502) · [#12230](https://github.com/deepseek-ai/deepseek-harness/discussions/12230)

---

## 3. 项目进展

**今日无新增合并内容。** 由于项目未启用 PR，且 Releases 为 0，今日没有可归因于维护侧的功能推进或修复落地。

不过，从社区讨论可以识别出若干**已具备修复条件、等待主线吸收**的技术方案：

- **Compaction 修复方案已成型**：#3465 对本地 Qwen3.8-27B 在 llama.cpp 下的 compaction 失败给出两个根因，并提供了 `compaction-basic` 中的可用修复；#5390 则将其封装为社区插件 `dsh-qwen38-local-qol`。这类带根因分析与可复现修复的帖子，是最适合被主线回收的候选。
- **认证 Cookie 问题已有明确根因**：#9924 与 #11095 指向同一机制——桌面端每次启动为 `127.0.0.1` 生成新命名的 `dsh-auth-*` Cookie，旧代际不清理，最终触发 Host header 431 或 Node `maxHeaderSize`（16384）溢出。根因清晰，但今日未见官方修复落地。
- **插件依赖隔离问题被定位**：#1337 指出社区插件解析出第二份 `@deepseek-ai/dsh-tools` 会导致 tool scheduler 崩溃（`Cannot read properties of undefined (reading 'prepare')`），属于生态扩张后的架构性隐患。

> 相关链接：[#3465](https://github.com/deepseek-ai/deepseek-harness/discussions/3465) · [#5390](https://github.com/deepseek-ai/deepseek-harness/discussions/5390) · [#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) · [#11095](https://github.com/deepseek-ai/deepseek-harness/discussions/11095) · [#1337](https://github.com/deepseek-ai/deepseek-harness/discussions/1337)

---

## 4. 社区热点

按评论数与更新活跃度排序：

| 排名 | 讨论 | 评论 | 状态 | 核心诉求 |
|---|---|---:|---|---|
| 1 | [#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) 桌面端 “Web authentication failed”：stale `dsh-auth-*` cookies 溢出 Host header（431） | 32 | OPEN | 桌面端启动认证链路被历史 Cookie 拖垮，影响面覆盖 alpha.4/alpha.5/rc.1 |
| 2 | [#1345](https://github.com/deepseek-ai/deepseek-harness/discussions/1345) 内置持久长期记忆 | 16 | OPEN | 跨会话上下文丢失，用户被迫用 docs/git 外挂记忆 |
| 3 | [#11942](https://github.com/deepseek-ai/deepseek-harness/discussions/11942) DeepSeek 产品工程能力是否跟上了模型能力 | 13 | OPEN | 对桌面端/客户端的工程质量提出系统性质疑 |
| 4 | [#11095](https://github.com/deepseek-ai/deepseek-harness/discussions/11095) stale cookies 溢出 Node `maxHeaderSize` 导致启动认证失败 | 13 | OPEN | 与 #9924 同根因的另一条复现路径 |
| 5 | [#6987](https://github.com/deepseek-ai/deepseek-harness/discussions/6987) 本轮运行失败：DeepSeek Messages transport failed | 13 | OPEN | 升级 4.1 后连续出现 transport 失败，影响基本可用性 |

**分析：**

- **#9924 是今日绝对热点**，32 条评论且跨版本复现，说明这不是个例，而是桌面端认证生命周期的设计缺陷。用户已经给出环境、版本、启动路径等完整信息，维护侧响应速度将成为社区情绪的关键变量。
- **#1345 长期记忆**自 8 月创建以来持续获得讨论，16 条评论说明这是 Agent 产品化的核心能力缺口，而非边缘需求。
- **#11942 的情绪信号值得警惕**：该帖将 Windows 文件选择器卡顿、AMD GPU 渲染异常、输入光标显示等问题并列，实质是对“模型能力强、产品工程弱”的整体性质疑。这类帖子容易成为社区情绪的聚合点。
- **#6987 与 #5466 共同指向会话级不可恢复故障**，用户一旦触发只能废弃会话，体验损失较大。

---

## 5. Bug 与稳定性

> 项目未启用 PR，无法标注“已有 fix PR”；以下按影响面与阻断程度排序，并注明讨论中是否出现修复方案。

### 严重（阻断启动 / 阻断升级 / 数据不可见）

1. **#12502 桌面端启动崩溃循环（0.2.2-rc.1）** — 用户报告连续 5 次启动崩溃，点击“禁用第三方插件”后仍复现。属于 rc 版本的高优先级回归，直接影响升级信心。讨论中未给出官方修复。
   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/12502)

2. **#9924 / #11095 认证 Cookie 溢出导致启动认证失败** — `dsh-auth-*` Cookie 每次启动新增且 30 天不清理，最终触发 431 或 `maxHeaderSize` 溢出。根因明确，影响 Linux/Electron 桌面路径，且跨 alpha.4/alpha.5/rc.1。讨论中已定位机制，但未见主线修复。
   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) · [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/11095)

3. **#8420 桌面版沙箱模式下所有命令派生失败（0xC0000142）** — Windows 桌面端在沙箱模式下命令全部失败，用户被迫开启全盘权限才能工作，属于安全与可用性的双重妥协。
   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/8420)

### 高（功能回归 / 升级受阻 / 会话毒化）

4. **#12230 升级 0.2.2-rc.1 后分支对话在列表中丢失** — 分支出的新对话不可见，属于数据可见性回归，用户对“对话消失”的敏感度很高。
   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/12230)

5. **#9995 桌面端 0.2.1-rc.2 更新安装失败：`MoveFileExW` 返回 error 5** — 安装器备份重命名 100% 失败，应用内更新与手动安装均复现，升级通道被阻断。
   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/9995)

6. **#5466 纯推理轮缺少 content/tool_calls 导致整会话毒化** — 单个 turn 后该会话每轮均返回 400，无法恢复。属于序列化层缺少兜底，影响长会话可靠性。
   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/5466)

### 中（特定配置 / 生态场景）

7. **#6987 升级 4.1 后 DeepSeek Messages transport failed 连续出现** — 换模型亦复现，影响基本对话可用性，但环境相关性强，尚需更多复现信息。
   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/6987)

8. **#1337 社区插件解析出第二份 `@deepseek-ai/dsh-tools` 导致 tool scheduler 崩溃** — 插件生态扩张后的依赖隔离问题，随插件数量增长会进一步放大。
   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/1337)

**稳定性小结：** 今日暴露的问题中，桌面端启动/认证链路（#9924、#11095、#12502）与升级链路（#9995）是最需要优先闭环的两条主线；二者都直接阻断用户进入产品。

---

## 6. 功能请求与路线图信号

| 需求 | 讨论 | 信号强度 | 判断 |
|---|---|---|---|
| 内置持久长期记忆 | [#1345](https://github.com/deepseek-ai/deepseek-harness/discussions/1345) | 高（16 评论，创建近 3 个月仍活跃） | 属于 Agent 产品化的基础能力，社区已用外挂方案自救；具备纳入中长期路线图的价值，但今日无版本信号 |
| Agent 暂停/完成自动通知 | [#7569](https://github.com/deepseek-ai/deepseek-harness/discussions/7569) | 中（8 评论） | 长任务场景的真实痛点，实现成本相对可控，适合作为体验增强项 |
| Compaction 根因修复与本地模型适配 | [#3465](https://github.com/deepseek-ai/deepseek-harness/discussions/3465) / [#5390](https://github.com/deepseek-ai/deepseek-harness/discussions/5390) | 中高（有根因 + 可用修复 + 插件封装） | 最具备“下一版本吸收”条件的候选，建议维护者评估合入 `compaction-basic` |
| 插件依赖隔离 / 单实例 `dsh-tools` | [#1337](https://github.com/deepseek-ai/deepseek-harness/discussions/1337) | 中（6 评论，但影响生态扩展） | 随插件数量增长会成为系统性问题，属于架构层路线图信号 |
| 设计工作台插件能力 | [#10615](https://github.com/deepseek-ai/deepseek-harness/discussions/10615) | 生态向（6 评论） | 展示插件生态的创造力，更多是生态繁荣信号而非主线需求 |

**路线图判断：** 今日没有版本发布，因此无法确认上述需求是否进入下一版本。但 #3465 的修复方案成熟度最高、影响面明确（长会话 compaction 失败），是最值得优先评估回收的一项；#1345 则更适合作为中长期能力规划。

---

## 7. 用户反馈摘要

- **“模型能力很强，但产品工程拖后腿”**：#11942 集中表达了这一情绪。用户列举 Windows 文件选择器因过长 `accept` 列表卡死、AMD 独显硬件加速下光标异常等问题，并强调这些都已提交过 Issue/Discussion。诉求不是单个 bug，而是客户端工程质量的整体提升。
  [#11942](https://github.com/deepseek-ai/deepseek-harness/discussions/11942)

- **升级路径的挫败感**：#9995 中用户已排除进程残留、ACL、杀软等常见原因，仍 100% 失败；#12502 中用户按提示禁用第三方插件后依旧连续崩溃。这类“按建议操作仍无效”的反馈对信任度伤害较大。
  [#9995](https://github.com/deepseek-ai/deepseek-harness/discussions/9995) · [#12502](https://github.com/deepseek-ai/deepseek-harness/discussions/12502)

- **会话可靠性是底线**：#5466 的“一个 turn 失败，整个会话报废”与 #6987 的“升级后连续 transport failed”，都触及用户对数据与上下文安全的基本预期。
  [#5466](https://github.com/deepseek-ai/deepseek-harness/discussions/5466) · [#6987](https://github.com/deepseek-ai/deepseek-harness/discussions/6987)

- **社区自救能力强**：#3465 与 #5390 显示用户不仅报告问题，还深入 `compaction-basic` 定位根因、给出修复并封装插件；#10615 展示了完整的设计工作台插件。生态创造力是项目的重要资产。
  [#3465](https://github.com/deepseek-ai/deepseek-harness/discussions/3465) · [#5390](https://github.com/deepseek-ai/deepseek-harness/discussions/5390) · [#10615](https://github.com/deepseek-ai/deepseek-harness/discussions/10615)

- **权限与安全的权衡**：#8420 用户为绕过沙箱失败被迫开启全盘权限，反映出安全默认值与可用性之间的冲突尚未解决好。
  [#8420](https://github.com/deepseek-ai/deepseek-harness/discussions/8420)

---

## 8. 待处理积压

以下条目创建时间较早、讨论仍在更新但尚未闭环，建议维护者按影响面排序关注。需说明：这些帖子近期均有更新，并非“无人响应”，而是**问题长期未解决**。

| 讨论 | 创建时间 | 评论 | 积压原因 |
|---|---|---:|---|
| [#1345](https://github.com/deepseek-ai/deepseek-harness/discussions/1345) 内置持久长期记忆 | 2026-08-14 | 16 | 近 3 个月仍 OPEN，属能力级需求，缺少路线图回应 |
| [#1337](https://github.com/deepseek-ai/deepseek-harness/discussions/1337) 插件重复依赖导致 scheduler 崩溃 | 2026-08-14 | 6 | 架构性问题，随生态扩张风险上升 |
| [#3465](https://github.com/deepseek-ai/deepseek-harness/discussions/3465) Qwen3.8-27B compaction 根因与修复 | 2026-08-19 | 9 | 已有可用修复方案，等待主线评估合入 |
| [#5390](https://github.com/deepseek-ai/deepseek-harness/discussions/5390) dsh-qwen38-local-qol 插件 | 2026-09-02 | 11 | 社区插件已落地，但上游修复未回收 |
| [#5466](https://github.com/deepseek-ai/deepseek-harness/discussions/5466) reasoning-only 空 content 毒化会话 | 2026-09-03 | 7 | 会话级不可恢复，影响面明确，仍待序列化层兜底 |
| [#6987](https://github.com/deepseek-ai/deepseek-harness/discussions/6987) Messages transport failed | 2026-09-17 | 13 | 升级 4.1 后持续出现，缺少明确根因结论 |
| [#7569](https://github.com/deepseek-ai/deepseek-harness/discussions/7569) Agent 暂停/完成自动通知 | 2026-09-23 | 8 | 需求清晰，未见排期信号 |
| [#8420](https://github.com/deepseek-ai/deepseek-harness/discussions/8420) 沙箱模式命令全失败（0xC0000142） | 2026-09-30 | 8 | Windows 桌面端阻断性问题，长期未闭环 |
| [#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) 认证 Cookie 溢出（431） | 2026-10-17 | 32 | **今日最热帖**，根因明确但跨版本仍未修复，建议最高优先级跟进 |
| [#9995](https://github.com/deepseek-ai/deepseek-harness/discussions/9995) 安装器 `MoveFileExW` error 5 | 2026-10-17 | 6 | 升级通道阻断，影响 rc 版本扩散 |

---

**日报结论：** DeepSeek Harness 今日呈现“社区高活跃、发布静默、稳定性承压”的状态。186 条讨论更新说明用户基础与参与度健康，但桌面端认证/启动链路、升级安装链路、会话可靠性三类问题跨越多个预发布版本仍未闭环，正在成为社区情绪的主要来源。建议维护者优先处理 #9924/#11095（认证 Cookie 清理）、#12502（rc 启动崩溃）、#9995（安装失败）三项阻断性问题，并评估回收 #3465 的 compaction 修复以释放“社区方案已就绪”的积极信号。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*