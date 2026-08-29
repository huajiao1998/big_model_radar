# OpenClaw 生态日报 2026-08-30

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-29 23:40 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-30

## 今日速览

过去24小时内，OpenClaw 仓库保持极高活跃度：共更新 500 条 Issues（新开/活跃 422 条，关闭 78 条）和 500 条 PR（待合并 336 条，已合并/关闭 164 条）。当前无新版本发布，项目处于 **2026.9.1-beta.1 发布候选准备期**（见 PR #130731）。值得关注的是，大量 P1 级 Bug 集中在**会话状态丢失、消息投递失败、内存泄漏/事件循环阻塞**三大类稳定性问题上，且多数仍处于 `needs-maintainer-review` 状态，说明维护者带宽可能成为瓶颈。社区讨论热度最高的议题是 Gateway 内存泄漏（#91588，22 条评论）和 DeepSeek 模型下 Cron 任务停滞（#121953，13 条评论）。

---

## 项目进展

今日无新版本发布，但 PR 合并/关闭 164 条，以下为值得关注的已合并/关闭 PR：

| PR | 说明 | 状态 |
|---|---|---|
| [#128995](https://github.com/openclaw/openclaw/pull/128995) | Web UI 聊天头部菜单补齐会话操作（置顶、标记未读、设置图标、复制 ID、移动分组） | 已关闭 |
| [#123975](https://github.com/openclaw/openclaw/pull/123975) | `tsgo` 包装器增加超时看门狗与受管进程清理，避免编译器进程树残留 | 已关闭 |
| [#123535](https://github.com/openclaw/openclaw/pull/123535) | 修复侧边栏会话目录在窗口聚焦/存在性变化时触发冗余刷新风暴 | 已关闭 |
| [#116489](https://github.com/openclaw/openclaw/pull/116489) | 安全增强：`security.installPolicy` 可返回 `warn`，交互式安装需确认后才能继续 | 已关闭 |

整体来看，项目在 **UI 体验、进程管理、安全策略**三个方向有实质推进，但核心稳定性问题（见下文 Bug 章节）的修复 PR 大多仍在审查中。

---

## 社区热点

### 讨论热度最高

| 排名 | Issue/PR | 评论数 | 核心诉求 |
|---|---|---|---|
| 1 | [#91588 Gateway 内存泄漏致 OOM 崩溃](https://github.com/openclaw/openclaw/issues/91588) | 22 | RSS 从 350MB 涨至 15.5GB，触发反复重启，用户要求紧急修复 |
| 2 | [#121953 DeepSeek 下 Cron 任务停滞](https://github.com/openclaw/openclaw/issues/121953) | 13 | `[cron:<jobId>]` 前缀导致 DeepSeek API 边缘节点降级处理，任务延迟数十秒至数分钟 |
| 3 | [#74586 AM 嵌入式运行中止 memory_search 工具调用](https://github.com/openclaw/openclaw/issues/74586) | 13 | 模型已完成但被误判为超时，影响 active-memory 插件可靠性 |
| 4 | [#39476 A2A sessions_send 双向调用导致消息重复](https://github.com/openclaw/openclaw/issues/39476) | 12 | Agent A→B 调用后，B 回调 A 造成请求方频道出现重复消息 |
| 5 | [#41744 飞书图片工具结果丢失媒体附件](https://github.com/openclaw/openclaw/issues/41744) | 12 | `read` 工具读取本地图片后，最终回复中媒体附件丢失 |

### 趋势分析

社区关注点集中在三个方向：**① 内存与资源管理**（#91588、#97616 僵尸进程）；**② 消息投递可靠性**（#39476、#41744、#96692 Slack 线程回复丢失）；**③ 多模型兼容性**（#121953 DeepSeek 前缀降级、#44134 Google Antigravity 误封）。这些问题的共性在于**生产环境长时间运行后暴露的稳定性缺陷**，而非简单的功能缺失。

---

## Bug 与稳定性

### P0 级（已关闭）

| Issue | 问题 | 状态 |
|---|---|---|
| [#124788](https://github.com/openclaw/openclaw/issues/124788) | beta.2 网关事件循环每 ~10.9 分钟阻塞 100-120 秒（锚定定时器 + 字符串构建 + fs 扫描），WebSocket 断连、HTTP /ready 无响应、Cron 停滞 | 已关闭（修复已验证） |

### P1 级（严重，多数无修复 PR）

| Issue | 问题 | 是否有 Fix PR |
|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | Gateway 内存泄漏：RSS 从 350MB 涨至 15.5GB，OOM 反复崩溃 | ❌ 无 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | hook/tool 子进程未回收，僵尸进程累积导致运行时退化 | ❌ 无 |
| [#132762](https://github.com/openclaw/openclaw/issues/132762) | overflow-retry 以 toolResult 结尾即标记成功，无最终交付 | ❌ 无 |
| [#110190](https://github.com/openclaw/openclaw/issues/110190) | 运行时上下文载体置于用户消息之后，导致模型混淆与推理 token 浪费 | ❌ 无 |
| [#119884](https://github.com/openclaw/openclaw/issues/119884) | SQLite 迁移后未 ANALYZE，查询规划器统计过期，会话操作 15s+、事件循环饥饿 30-57s | ❌ 无 |
| [#102534](https://github.com/openclaw/openclaw/issues/102534) | Cron 调度器定时器在重度超时后永久停止触发 | ❌ 无 |
| [#91144](https://github.com/openclaw/openclaw/issues/91144) | Windows 原生 CLI 网关计划任务无法保持运行（前台窗口正常） | ❌ 无 |
| [#78493](https://github.com/openclaw/openclaw/issues/78493) | `sudo openclaw update` 造成文件属主混乱，`doctor` 覆盖配置 | ❌ 无 |
| [#91931](https://github.com/openclaw/openclaw/issues/91931) | 预置 SOUL.md/IDENTITY.md 导致 BOOTSTRAP.md 在首次运行前被删除 | ❌ 无 |
| [#128971](https://github.com/openclaw/openclaw/issues/128971) | Telegram 最终回复在 `delivery_ambiguous` 时静默丢失 | ❌ 无 |
| [#129455](https://github.com/openclaw/openclaw/issues/129455) | requester-settle 在下一个子代理生成前过早终结顺序工作流 | ❌ 无 |

### P1 级（已有 Fix PR 在途）

| Issue | 问题 | Fix PR |
|---|---|---|
| [#39476](https://github.com/openclaw/openclaw/issues/39476) | A2A sessions_send 双向调用导致重复消息 | 有（PR 待合并） |
| [#41744](https://github.com/openclaw/openclaw/issues/41744) | 飞书图片媒体附件丢失 | 有（PR 待合并） |
| [#96692](https://github.com/openclaw/openclaw/issues/96692) | Slack 线程回复在 origin tuple 丢失后无法投递 | 有（PR 待合并） |
| [#90098](https://github.com/openclaw/openclaw/issues/90098) | 大附件上传导致浏览器/网关栈溢出 | 有（PR 待合并） |
| [#120735](https://github.com/openclaw/openclaw/issues/120735) | Telegram 贴纸无法被 agent 使用 | 有（PR 待合并） |
| [#104950](https://github.com/openclaw/openclaw/issues/104950) | 会话报告 abortedLastRun=true 但轨迹日志无错误 | 有（PR 待合并） |

### 值得注意的 PR 修复

- [#130706](https://github.com/openclaw/openclaw/pull/130706)（XL 规模）：移除 Gateway 轮询中的重复插件发现、限制会话摘要水合、修复会话 RPC 元数据上下文逃逸——针对多工作区网关停滞问题
- [#130993](https://github.com/openclaw/openclaw/pull/130993)（XL 规模）：修复长会话压缩管线的 6 个缺陷，包括上下文边界丢失导致压缩过早触发
- [#124517](https://github.com/openclaw/openclaw/pull/124517)（LINE 渠道）：崩溃中断投递时回复丢失/重复的修复

---

## 功能请求与路线图信号

### 高潜力纳入下一版本的功能

| Issue/PR | 功能 | 信号 |
|---|---|---|
| [#71058](https://github.com/openclaw/openclaw/issues/71058) + [#112811](https://github.com/openclaw/openclaw/pull/112811) | 单个 Gateway 支持多个 Teams 机器人 | PR 已存在，XL 规模，`feature: ✨ showcase` 标签 |
| [#6599](https://github.com/openclaw/openclaw/issues/6599) | `/models test-fallback` 命令验证模型回退链 | 社区 +1，P3 增强 |
| [#99583](https://github.com/openclaw/openclaw/issues/99583) | 智能会话自动标题（懒生成 + 廉价模型 + 主题感知重命名） | 已有 `llm-slug-generator` 基础，+2 👍 |
| [#53654](https://github.com/openclaw/openclaw/issues/53654) | Discord 消息编辑触发重新处理、删除触发取消 | +3 👍，社区呼声高 |
| [#14438](https://github.com/openclaw/openclaw/issues/14438) | 插件热重载（jiti 缓存失效） | +4 👍，开发者体验强需求 |
| [#121729](https://github.com/openclaw/openclaw/issues/121729) | 代理每日消费限额（共享/单代理） | 新需求，后台运行场景 |

### 路线图信号

- **多机器人/多身份支持**成为渠道层的重要方向（Teams #71058、Telegram 相关 PR #125190）
- **会话管理智能化**（自动标题 #99583、子代理上下文隔离 #96975）显示项目从"能用"向"好用"演进
- **可观测性增强**（#49889 Telegram 投递模式可观测性、#87441 内存阈值参数接线）是用户明确诉求

---

## 用户反馈摘要

### 真实痛点

1. **生产环境稳定性焦虑**（#91588）："RSS 从 350MB 涨到 15.5GB，每 2-3 天 OOM 一次"——用户对长期运行的 Gateway 内存泄漏表示强烈不满，这是当前社区最响亮的呼声。

2. **消息丢失不可接受**（#128971、#96692、#41744）：多个渠道（Telegram、Slack、飞书）出现"任务完成但回复未送达"的静默失败，用户难以区分"模型没生成"与"生成了但没发出去"。

3. **模型提供商兼容性困扰**（#121953）："DeepSeek 的 API 边缘节点对 `[cron:` 前缀的请求走低优先级队列"——用户对特定模型的行为差异感到困惑，希望框架层能屏蔽这些差异。

4. **Windows 支持短板**（#91144、#102755）：Windows 原生 CLI 的计划任务无法保持运行、WSL 构建二次启动挂起——Windows 用户感觉被"二等公民"对待。

5. **开发者体验摩擦**（#14438）："每次插件代码改动都要重启容器 + 清 jiti 缓存"——插件开发者希望有热重载机制。

### 满意点

- 盲人用户（#82450）表示 OpenClaw 是"我用过的最强大的 AI 工作界面"，用于视频推广、浏览器自动化、社媒发布等工作流——无障碍与工作流自动化是亮点。
- 用户对 SDK 稳定化（#74704）和 Kubernetes 文档改进（#91455）的呼声表明社区愿意投入生态建设。

---

## 待处理积压

### 长期未响应的重点 Issue

| Issue | 创建时间 | 问题 | 备注 |
|---|---|---|---|
| [#6599](https://github.com/openclaw/openclaw/issues/6599) | 2026-02-01 | `/models test-fallback` 命令 | 已积压 6 个月+，P3 增强 |
| [#14438](https://github.com/openclaw/openclaw/issues/14438) | 2026-02-12 | 插件热重载 | 已积压 6 个月+，+4 👍 |
| [#39476](https://github.com/openclaw/openclaw/issues/39476) | 2026-03-08 | A2A sessions_send 重复消息 | P1 但已积压 5 个月+，有 PR 在途 |
| [#41744](https://github.com/openclaw/openclaw/issues/41744) | 2026-03-10 | 飞书图片媒体丢失 | P1 但已积压 5 个月+，有 PR 在途 |
| [#55694](https://github.com/openclaw/openclaw/issues/55694) | 2026-03-27 | Agent 工具调用失败死循环刷屏 | P1，中文用户报告，无 fix PR |
| [#54488](https://github.com/openclaw/openclaw/issues/54488) | 2026-03-25 | 会话通道饥饿：followup drain 阻塞入站分发 20-30 分钟 | P1，无 fix PR |

### 维护者提醒

- **P1 级 Issue 积压时间过长**：多个 P1 问题（#39476、#41744、#54488）已开放 5 个月以上，虽有 PR 在途但迟迟未合并，用户耐心正在消耗。
- **`clawsweeper:needs-maintainer-review` 标签泛滥**：大量 Issue 等待维护者审查，但审查速度跟不上 Issue 增长速度，建议考虑增加维护者或引入社区 reviewer 机制。
- **中文用户反馈渠道**：#55694（飞书刷屏）、#41165（Telegram 路由）等中文用户报告的问题处理优先级偏低，建议关注。

---

*本日报由 AI 助手基于 GitHub 公开数据自动生成，数据截至 2026-08-30。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-08-30**
**分析范围：OpenClaw、Zeroclaw、PicoClaw、QwenPaw、hermes-agent、AstrBot**


## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态正处于**高密度迭代期**，头部项目（OpenClaw、hermes-agent）单日 Issue/PR 更新量达数百条，但合并吞吐量普遍偏低（15-33%），技术债与稳定性风险正在积聚。社区关注点已从"功能有无"转向"生产环境可靠性"——内存泄漏、消息投递失败、会话状态丢失成为跨项目的高频 P1 痛点。与此同时，多模型兼容性（DeepSeek、OpenRouter、Ark 等）和渠道碎片化（Telegram、Slack、飞书、Discord）带来的适配成本成为普遍挑战。架构层面，A2A 协议互操作、多租户/团队协作、持久记忆、沙箱安全等方向开始浮现，标志着生态正从"单机玩具"向"基础设施"演进。


## 2. 各项目活跃度对比

| 项目 | Issues（新开/活跃） | PRs（待合并） | PRs（合并/关闭） | Release | 健康度评估 |
|------|-------------------|--------------|-----------------|---------|-----------|
| **OpenClaw** | 500（422 活跃 / 78 关闭） | 336 | 164 | 无（2026.9.1-beta.1 候选期） | ⚠️ 极高活跃但维护者带宽瓶颈明显，P1 bug 多数无 fix PR |
| **hermes-agent** | 347（285 活跃 / 62 关闭） | 423 | 77 | 无（v0.20.5） | ⚠️ 高活跃，PR 合并率仅 15.4%，积压风险高 |
| **Zeroclaw** | 20（16 活跃 / 4 关闭） | 46 | 4 | 无（v0.8.5 稳定化周期） | ✅ 稳定化阶段，决策流程透明，质量优先 |
| **QwenPaw** | 10（8 开放 / 2 关闭） | 7 | 0 | 无（v2.2.0-beta.3） | 🟡 功能收尾期，PR 合并效率偏低（2 个 PR 停留超 2 周） |
| **AstrBot** | 6（5 活跃 / 1 关闭） | 2 | 3 | 无 | ✅ 中等活跃，社区响应快，架构重构推进中 |
| **PicoClaw** | 1（1 活跃） | 1 | 3（均为 stale 关闭） | 无 | 🔴 低活跃，3 个有价值 PR 被 stale 关闭，需关注 |

**关键数据洞察**：
- OpenClaw 与 hermes-agent 构成生态第一梯队，单日 Issue 量级在 300-500 条，但合并率分别仅 32.8% 和 15.4%，维护者审查速度远跟不上社区提交速度。
- Zeroclaw 虽体量小，但通过 RFC 决策队列（#8692）和稳定化 tracker（#9459）建立了更健康的治理节奏。
- PicoClaw 活跃度骤降，3 个功能性 PR（MCP 挂起修复、Telegram 话题支持、QQ 附件扩展）被 stale 关闭，项目推进实质停滞。


## 3. OpenClaw 在生态中的定位

**生态位：事实上的社区中心与功能基准。**

- **社区规模断层领先**：单日 500 Issues + 500 PRs，是 hermes-agent（347+500）的 1.4 倍、Zeroclaw（20+50）的 20 倍、QwenPaw（10+7）的 58 倍。讨论热度最高的 issue 达 22 条评论，远超其他项目。
- **功能覆盖面最广**：渠道支持（Telegram、Slack、飞书、Discord、LINE、Teams）、插件体系、A2A 协议、Cron 调度、多模型路由等均有涉及，是生态中唯一具备"全家桶"形态的项目。
- **技术路线差异**：OpenClaw 采用 TypeScript/Node.js 技术栈，通过 `tsgo` 包装器管理编译器进程；Zeroclaw 为 Rust 实现，强调沙箱安全（Bubblewrap/Landlock/Seatbelt）；hermes-agent 偏向 Python 生态（uv、Electron 桌面端）；QwenPaw 深度绑定 AgentScope 框架与阿里云/火山引擎生态。
- **核心风险**：P1 级 bug 集中在内存泄漏（#91588，RSS 350MB→15.5GB）、事件循环阻塞（#124788，每 10.9 分钟阻塞 100-120 秒）、消息静默丢失（#128971）三大稳定性问题上，且多数无 fix PR。作为生态参照系，OpenClaw 的稳定性问题会被社区放大审视，其修复进度直接影响生态信心。

**对比结论**：OpenClaw 是生态的"规模标杆"和"功能上限"，但 hermes-agent 在桌面端体验和群聊架构上展现出差异化竞争力，Zeroclaw 在安全架构上更为严谨。OpenClaw 需要解决"大而不稳"的问题以维持领导地位。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|---------|---------|
| **消息投递可靠性** | OpenClaw、Zeroclaw、PicoClaw、QwenPaw | 多渠道（Telegram/Slack/飞书）出现"任务完成但回复未送达"的静默失败；A2A 双向调用消息重复（OpenClaw #39476）；Telegram 动画无限循环耗尽 API 配额（PicoClaw #3343） |
| **内存与资源管理** | OpenClaw、hermes-agent | Gateway 内存泄漏致 OOM（OpenClaw #91588）；子进程/僵尸进程累积（OpenClaw #97616）；渲染进程空闲 CPU 40-70%（hermes-agent #88275）；后台终端执行器共享 cgroup 可致控制平面被杀（hermes-agent #70716） |
| **多模型兼容性** | OpenClaw、Zeroclaw、QwenPaw | DeepSeek 对 `[cron:` 前缀降级处理（OpenClaw #121953）；Anthropic 兼容网关拒绝工具返回的 `image_url`（Zeroclaw #10063）；Ark API 空文本块污染会话（QwenPaw #7402）；OpenRouter 流式总超时切断长响应（Zeroclaw #10436） |
| **沙箱与安全策略** | Zeroclaw、AstrBot、hermes-agent | 沙箱策略 RFC（Zeroclaw #6996）；自定义工作区路径越权（AstrBot #9328 已修复）；持久化边界脱敏缺口（hermes-agent #43666）；插件子进程隔离（Zeroclaw #10093） |
| **群聊/多用户/团队协作** | hermes-agent、QwenPaw | Bot Mode 群聊跨端/跨网关（hermes-agent #89995/#97846/#97797）；Hub 多租户版（QwenPaw #7318，14 条评论） |
| **可观测性** | OpenClaw、Zeroclaw、QwenPaw | 成本追踪缺失（Zeroclaw #8539，AgentEnd 无 `cost_usd`）；投递模式可观测性（OpenClaw #49889）；后台任务运行状态监控（PicoClaw #3343 暴露） |
| **本地化/i18n** | PicoClaw、AstrBot | 捷克语补全（PicoClaw #3348）；日语本地化（AstrBot #9862，用户自愿长期维护） |
| **会话管理智能化** | OpenClaw、QwenPaw | 智能会话自动标题（OpenClaw #99583）；Plan Mode 事前控制（QwenPaw #7405）；滚动锁定与工具调用可见性（QwenPaw #7356/#7357） |


## 5. 差异化定位分析

| 维度 | OpenClaw | hermes-agent | Zeroclaw | QwenPaw | AstrBot | PicoClaw |
|------|----------|-------------|----------|---------|---------|----------|
| **功能侧重** | 全功能通用助手（多渠道+插件+Cron+A2A） | 桌面端优先+群聊+语音+技能生态 | 安全沙箱+协议互操作+持久记忆 | 多租户 Hub+Console 体验+AgentScope 生态 | 中文社区+知识库 RAG+多平台适配 | 嵌入式/轻量级+Telegram/QQ 渠道 |
| **目标用户** | 开发者/高级用户，追求功能广度 | 桌面端重度用户，团队协作场景 | 安全敏感型用户，Rust 生态开发者 | AgentScope 生态用户，企业团队 | 中文用户，个人助手/知识库场景 | 轻量部署场景，Telegram/QQ 用户 |
| **技术架构** | TypeScript/Node.js，单体仓库，插件化 | Python+Electron，桌面+网关分离 | Rust，模块化，RFC 驱动 | Python，深度绑定 AgentScope | Python，profile 配置体系，插件化 | TypeScript/Node.js，轻量设计 |
| **治理模式** | 维护者主导，审查瓶颈明显 | 社区驱动，PR 积压严重 | RFC+决策队列，流程透明 | 版本周期驱动，功能收尾中 | 核心维护者主导（@Soulter） | 维护者响应滞后，stale 清理为主 |
| **核心优势** | 生态最大、功能最全、社区最活跃 | 桌面体验、群聊架构、语音双工 | 安全架构严谨、决策流程健康 | 多租户方向明确、Console 体验佳 | 中文社区口碑、知识库能力 | 轻量、渠道适配（QQ 独有） |
| **核心风险** | 稳定性问题（内存/投递）侵蚀信任 | P1 bug 多且无 fix，合并率低 | 社区规模小，功能推进慢 | 高严重度 bug 无 PR，合并效率低 | 国际化刚起步，功能广度有限 | 活跃度骤降，功能 PR 被关闭 |


## 6. 社区热度与成熟度

**第一梯队：快速迭代期（高活跃、高积压）**
- **OpenClaw**：单日 500+500 的更新量，处于 2026.9.1-beta.1 发布候选准备期。功能推进快（UI 体验、进程管理、安全策略均有实质合并），但 P1 bug 修复滞后，处于"边发布边补漏"状态。
- **hermes-agent**：单日 347+500 的更新量，群聊架构升级、Webhook 管道重构、MCP OAuth 修复四条主线并行。合并率仅 15.4%，大量 PR 等待审查，技术债风险高。

**第二梯队：质量巩固期（稳定化、流程化）**
- **Zeroclaw**：v0.8.5 稳定化周期，功能摄入已冻结，每周发布就绪版本。通过 RFC 决策队列和 tracker 管理，治理成熟度在生态中最高。今日关闭 4 个 Issue 和 2 个 PR，包括 P1 转录 bug 和依赖安全问题。
- **QwenPaw**：v2.2.0-beta.3 功能收尾期，Hub 多租户版已确认纳入 2.2.0。社区讨论聚焦功能征集，但 PR 合并效率偏低。

**第三梯队：稳定维护期/低活跃期**
- **AstrBot**：中等活跃，核心维护者主导架构重构（#9821 已合并），社区贡献响应快（MiniMax TTS bug 当日即有修复 PR）。处于健康维护节奏。
- **PicoClaw**：活跃度骤降，单日仅 1 Issue + 4 PR，且 3 个功能性 PR 被 stale 关闭。项目实质进入停滞状态，需警惕社区流失。


## 7. 值得关注的趋势信号

**① 生产环境稳定性成为首要诉求**
从 OpenClaw 的 Gateway 内存泄漏（22 条评论）、hermes-agent 的 SIGSEGV 崩溃、PicoClaw 的 Telegram API 限流事件可以看出，用户已从"尝鲜"转向"长期运行"，对内存泄漏、消息丢失、进程残留的容忍度极低。**对开发者的启示**：在设计 agent 框架时，资源生命周期管理（子进程回收、定时器清理、事件循环健康）应作为一等公民对待，而非事后补丁。

**② 多模型兼容性正在成为框架层的"隐形税"**
DeepSeek 前缀降级、Anthropic 网关拒绝图片块、Ark 空文本污染、OpenRouter 超时切断——每个模型提供商都有各自的"怪癖"，且这些问题高度碎片化，难以通过单一适配器解决。**对开发者的启示**：模型抽象层需要内置容错机制（如请求重试、响应清洗、超时策略差异化），而非简单封装 API。

**③ 团队协作/多用户是明确的下一站**
hermes-agent 的 Bot Mode 群聊跨端、QwenPaw 的 Hub 多租户版、OpenClaw 的多 Teams 机器人支持，三个项目不约而同向"个人→团队"演进。**对开发者的启示**：多租户权限模型、共享技能库、跨网关消息路由将成为 agent 框架的标配能力。

**④ 可观测性缺口普遍存在**
Zeroclaw 的 `cost_usd` 缺失、PicoClaw 的"问题持续数天未被发现"、OpenClaw 的投递模式可观测性请求，共同指向 agent 运行时的"黑箱"困境。**对开发者的启示**：事件追踪（含成本、投递状态、任务生命周期）应内建于框架核心，而非依赖外部 APM。

**⑤ 安全沙箱从"可选项"变为"必选项"**
Zeroclaw 的沙箱策略 RFC（16 条评论）、AstrBot 的工作区路径越权修复、hermes-agent 的脱敏缺口，显示 agent 的代码执行能力正在触发安全边界重构。**对开发者的启示**：OS 级沙箱（Bubblewrap/Landlock/Seatbelt）与策略层的统一是架构设计的关键决策点。

**⑥ 无障碍与本地化是未被充分满足的差异化机会**
hermes-agent 盲人用户的详细需求（106 天未响应）、AstrBot 的日语本地化请求、PicoClaw 的捷克语补全，说明这些"非主流"需求竞争少、用户忠诚度高，是中小项目建立口碑的切入点。

**⑦ 治理模式影响项目长期健康度**
对比 Zeroclaw 的 RFC 决策队列与 OpenClaw/hermes-agent 的审查瓶颈，可以看到：**社区规模越大，越需要制度化的决策机制**（如社区 reviewer、RFC 流程、stale 策略），否则活跃度会反噬项目质量。


**总结**：个人 AI 助手开源生态正处于从"功能竞赛"向"可靠性竞赛"转型的关键期。OpenClaw 和 hermes-agent 凭借规模优势引领方向，但稳定性问题和合并瓶颈是共同软肋；Zeroclaw 的治理模式和 AstrBot 的社区响应速度值得借鉴；PicoClaw 的低活跃敲响警钟——在生态快速洗牌的阶段，停滞即退步。对于技术决策者，建议关注消息投递可靠性、多模型容错、多租户架构三个方向的演进；对于开发者，沙箱安全、可观测性、无障碍是差异化贡献的蓝海领域。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-30

## 1. 今日速览

过去 24 小时项目活跃度较高：共 20 条 Issue 更新（16 条活跃、4 条关闭）和 50 条 PR 更新（46 条待合并、4 条已合并/关闭），无新版本发布。项目正处于 v0.8.5 稳定化周期（tracker #9459），今日关闭了 4 个 Issue 和 2 个 PR，其中包括一个 P1 级转录语言提示丢失 bug（#10429）和 chacha20 yanked 依赖修复（#10428）。安全方面，CI 咨询扫描连续两日因同一 yanked crate 失败（#10427 已关闭、#10447 新开），但修复 PR 已合入。社区讨论热度集中在沙箱策略 RFC（#6996，16 条评论）、维护者决策队列（#8692，14 条评论）和 A2A 协议互操作性（#3566，10 条评论、7 👍）等架构级议题上。

## 2. 版本发布

今日无新版本发布。项目处于 v0.8.5 稳定化周期（[#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)），该 tracker 显示 8 月 4 日已冻结功能摄入，每周发布就绪版本。

## 3. 项目进展

今日合入/关闭的 PR 与 Issue 显示项目在稳定性修复和技术债务清理上持续推进：

**已合并 PR：**
- [#10428](https://github.com/zeroclaw-labs/zeroclaw/pull/10428) `fix(deps): update chacha20 to 0.10.2` — 修复 yanked crate 导致的 CI 咨询扫描失败，并移除不再匹配的 cargo-deny ignore 规则。直接解决了 #10427 和 #10447 两个 CI 失败问题。
- [#10445](https://github.com/zeroclaw-labs/zeroclaw/pull/10445) `fix(runtime): convert missed test call sites to ScopedToolRegistry` — 修复因 #9319 合入后 Quality Gate 全红的问题，将遗漏的测试调用点迁移到新的 ScopedToolRegistry API。

**已关闭 Issue：**
- [#10429](https://github.com/zeroclaw-labs/zeroclaw/issues/10429)（P1）Deepgram/OpenAI 转录提供商静默丢弃语言提示，导致非英语语音笔记被跳过 — 已关闭。
- [#10237](https://github.com/zeroclaw-labs/zeroclaw/issues/10237)（P2）Telegram 回复线程将对话记忆碎片化为每线程历史桶 — 已关闭。
- [#8309](https://github.com/zeroclaw-labs/zeroclaw/issues/8309)（P2）移除孤立的 SkillForge 引擎，同时保留 manifest 来源兼容性 — 已关闭。
- [#10427](https://github.com/zeroclaw-labs/zeroclaw/issues/10427) CI 咨询扫描失败（chacha20 yanked）— 已关闭。

整体来看，项目在依赖安全、测试基础设施和通道稳定性三个方向均有实质推进。

## 4. 社区热点

今日讨论最活跃的 Issue 集中在架构级 RFC 和长期跟踪器上：

- **[#6996 RFC: Granular sandbox policy — filesystem and network restrictions](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)**（16 条评论，P2，高风险，需维护者审查）— 讨论应用层路径准入与 OS 沙箱后端（Bubblewrap/Landlock/Seatbelt）之间的策略漂移问题。社区关注点在于如何统一两层策略模型，该 RFC 已持续 3 个月，仍处于 in-progress 状态。

- **[#8692 Tracker: Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)**（14 条评论，P2）— 维护者决策队列 tracker，用于管理需要维护者注意的 RFC、设计问题和发布策略问题。反映了项目在决策流程透明化方面的努力。

- **[#3566 Tracker: A2A protocol interoperability](https://github.com/zeroclaw-labs/zeroclaw/issues/3566)**（10 条评论，7 👍，P2，高风险）— 社区关注度最高的功能 tracker，目标是让 ZeroClaw 原生支持 Agent2Agent 协议（Linux Foundation 标准），实现与其他 agent 运行时（NanoClaw、OpenClaw 等）的 HTTP 互操作。7 个 👍 表明该需求有较强的社区呼声。

- **[#8891 Tracker: Persistent memory - wire the curation, relevance, and operability planes to parity](https://github.com/zeroclaw-labs/zeroclaw/issues/8891)**（9 条评论，P2，高风险）— 持久内存子系统多 PR 协调 tracker，当前有 7 个未完成项（4 issues + 3 PRs），目标是让跨会话记忆能力达到成熟 agent 运行时的同等水平。

这些热点显示社区对**安全沙箱、协议互操作、持久记忆**三大方向的关注度最高。

## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列：

**P1（严重）：**
- [#10063](https://github.com/zeroclaw-labs/zeroclaw/issues/10063)（S1 工作流阻塞，in-progress）Anthropic 支持的兼容网关在工具结果中拒绝 `image_url` 块 — 用户消息中直接附加图片可正常传递，但工具返回图片时被适配器拒绝。已有修复进行中。
- [#8539](https://github.com/zeroclaw-labs/zeroclaw/issues/8539)（S2 降级，P1，no-stale）AgentEnd 事件缺少 `cost_usd` 字段，且通道路径从不发出 AgentEnd — 自 6 月 30 日报告至今未关闭，影响成本追踪可观测性。

**P2（中等）：**
- [#10436](https://github.com/zeroclaw-labs/zeroclaw/issues/10436)（新报告）原生 OpenRouter 流式使用总请求超时，在响应字节仍在到达时切断活动响应 — 影响长推理任务（如 `z-ai/glm-5.3-flash`）。
- [#10437](https://github.com/zeroclaw-labs/zeroclaw/issues/10437)（新报告）ZeroCode TUI 在滚动时将 SGR 鼠标滚轮报告插入编辑器 — 已有修复 PR [#10444](https://github.com/zeroclaw-labs/zeroclaw/pull/10444)。
- [#10432](https://github.com/zeroclaw-labs/zeroclaw/issues/10432)（新报告）ElevenLabs TTS API key 通过 `xi-api-key` 头传递时未标记为敏感 — 已有修复 PR [#10433](https://github.com/zeroclaw-labs/zeroclaw/pull/10433)。

**CI/依赖：**
- [#10447](https://github.com/zeroclaw-labs/zeroclaw/issues/10447)（新开）CI 咨询扫描再次因 chacha20 0.10.0 yanked 失败 — 与昨日 #10427 相同根因，修复 PR #10428 已合入，预计下次扫描将恢复。

**已关闭：**
- [#10429](https://github.com/zeroclaw-labs/zeroclaw/issues/10429)（P1）转录语言提示丢失导致意大利语语音笔记被静默丢弃 — 已关闭。
- [#10237](https://github.com/zeroclaw-labs/zeroclaw/issues/10237)（P2）Telegram 回复线程碎片化对话记忆 — 已关闭。

## 6. 功能请求与路线图信号

今日出现的功能请求和路线图信号：

- **[#10419 Stream agent-loop tokens from POST /webhook (SSE)](https://github.com/zeroclaw-labs/zeroclaw/issues/10419)**（P2，高风险，新报告）— 请求在 `stream: true` 且 `Accept: text/event-stream` 时通过 SSE 流式返回 agent 循环 token，而非等待单个 JSON 响应。这是对托管 Path A worker 调用体验的重要改进，可能被纳入 v0.8.5 之后的版本。

- **[#10336 AnySearch 作为内置 web_search_tool 提供商](https://github.com/zeroclaw-labs/zeroclaw/issues/10336)**（P3，新提案）— 社区成员提议贡献 AnySearch 作为内置搜索提供商，已有对应 PR [#10356](https://github.com/zeroclaw-labs/zeroclaw/pull/10356) 处于待合并状态（需作者操作）。若合入，将扩展 web_search_tool 的提供商选项。

- **[#10360 RFC: opt-in household edge mesh with pull workers and signed receipts](https://github.com/zeroclaw-labs/zeroclaw/issues/10360)**（P3，高风险，需维护者审查）— 提议利用家庭中闲置设备（PC、笔记本、手机、SBC、NAS）构建边缘计算网格，突破单主机资源限制。这是一个前瞻性架构提案，短期内不太可能进入开发。

- **[#10406 Tracker: Gemini speech-to-speech broker channel](https://github.com/zeroclaw-labs/zeroclaw/issues/10406)**（P2，已接受）— 协调实现已接受的 #8780 Gemini Live 语音到语音代理通道，PR1（daemon 端核心）已在 [#10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430) 提交。该功能正在积极开发中。

- **长期路线图信号**：#3566（A2A 协议互操作）和 #8891（持久内存）两个 tracker 持续活跃，是项目中期的重要架构方向。

## 7. 用户反馈摘要

从今日 Issue 评论和报告中提炼的用户反馈：

- **非英语用户体验受损**（#10429）：意大利语语音笔记被静默丢弃，用户只能看到 INFO 日志 "Voice transcription returned empty text, skipping"。该问题已修复，但反映出多语言支持的测试盲区。

- **Telegram 线程场景下的记忆割裂**（#10237）：用户在使用 Telegram 回复线程时，对话历史被按线程分桶，导致多轮上下文丢失。已关闭，但用户对"功能正常但上下文丢失"的体验表达了困扰。

- **长响应被超时切断**（#10436）：OpenRouter 流式响应在总请求超时后被切断，即使用户仍在接收数据。这对长推理任务（如 GLM-5.3-flash）影响明显，用户期望流式请求应使用空闲超时而非总超时。

- **工具返回图片被拒**（#10063）：用户消息中直接附加图片可正常工作，但工具在同一轮中返回图片时被兼容网关适配器拒绝。这阻塞了涉及视觉工具的工作流，被标记为 S1 严重度。

- **TUI 鼠标事件污染**（#10437）：ZeroCode 全屏 TUI 中滚动时，SGR 鼠标滚轮报告的可见剩余部分被插入编辑器。用户观察到 `[<...` 之类的转义序列残留在输入中。

- **成本追踪不完整**（#8539）：用户注意到 AgentEnd 事件始终报告 `cost_usd: None`，即使成本追踪已记录 token 用量，影响基于事件的成本核算。

## 8. 待处理积压

以下长期未响应或阻塞的重要 Issue/PR 需要维护者关注：

- **[#8539](https://github.com/zeroclaw-labs/zeroclaw/issues/8539)（P1，6 月 30 日开启）** AgentEnd 事件缺少 `cost_usd` 字段 — 已持续 2 个月，影响成本可观测性，仅有 1 条评论，未见修复 PR。

- **[#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)（P2，5 月 28 日开启，需维护者审查）** 沙箱策略 RFC — 已持续 3 个月，16 条评论，仍处于 in-progress 且需要维护者审查。这是安全相关的架构决策，长期悬置可能增加策略漂移风险。

- **[#3566](https://github.com/zeroclaw-labs/zeroclaw/issues/3566)（P2，3 月 15 日开启，7 👍）** A2A 协议互操作性 tracker — 已持续近 6 个月，社区关注度高但未见具体实施 PR。

- **[#9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428)（PR，7 月 27 日开启，需作者操作，XL）** Bluesky 和 Reddit 通道发送者授权修复 — 安全相关 PR，已等待 1 个月，当前阻塞在作者操作。

- **[#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)（PR，7 月 17 日开启，do-not-merge，XL）** 原生 Hailo-Ollama 支持 — 已标记 do-not-merge，需维护者决策是否继续推进。

- **[#10093](https://github.com/zeroclaw-labs/zeroclaw/pull/10093)（PR，8 月 18 日开启，do-not-merge，XL）** 隔离 manifest 安装的插件子进程 — 安全加固 PR，已标记 do-not-merge，需维护者安全审查。

- **[#10177](https://github.com/zeroclaw-labs/zeroclaw/pull/10177)（PR，8 月 20 日开启，L）** agent 作用域 cron 变更原子化 — 安全相关修复，依赖 #9948，处于 stacked 状态，等待上游合入。

---

*本日报基于 2026-08-30 的 GitHub 公开数据自动生成，数据覆盖过去 24 小时的项目动态。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-30

## 1. 今日速览

过去24小时内，PicoClaw 项目活跃度处于**中等偏低**水平：共产生 1 条 Issue 更新和 4 条 PR 更新，无新版本发布。值得关注的是，今日关闭的 3 个 PR 均为 stale 标记的长期未合并分支，说明维护者正在清理积压；同时新开放的 #3348（捷克语 i18n 补全）表明社区本地化贡献仍在持续。唯一活跃的 Issue #3343 是一个已存在一周的 Telegram 消息编辑失控 Bug，目前仍无修复 PR，需要维护者重点关注。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日无新合并的 PR，但有 3 个 PR 被标记为关闭（stale），其中包含两个具有实质功能价值的改动：

- **[#3337] Fix/mcp failure hangs agent loop**（关闭，stale）— 修复了 MCP 服务器连接失败时 Agent 循环挂起的问题。此前若 `ensureMCPInitialized` 返回错误，`AgentLoop.Run` 会直接退出，导致聊天界面完全停止响应。该修复对依赖 MCP 工具的生产环境稳定性有重要意义，虽被关闭，但修复逻辑值得在后续 PR 中重新提交。
  https://github.com/sipeed/picoclaw/pull/3337

- **[#3315] Support topics in private bot chats**（关闭，stale）— 修复了 Telegram 私聊机器人中话题模式（forum topic mode）的识别问题。原实现仅检查 `Chat.IsForum`，无法覆盖私聊场景，该 PR 补充了 `IsTopicMessage` 判断。此功能对 Telegram 渠道的完整性有直接价值。
  https://github.com/sipeed/picoclaw/pull/3315

- **[#1349] feat(qq): support parsing and replying to more attachment types**（关闭，stale）— 为 QQ 频道渠道增加了表情、语音、图片、视频、文件等消息类型的解析与回复能力，并优先使用 Markdown 消息。该 PR 自 2026-03-11 创建以来长期未合并，最终被标记关闭。
  https://github.com/sipeed/picoclaw/pull/1349

**整体判断**：今日项目进展主要体现在积压清理上，但三个有价值的 PR 均被关闭，意味着相关功能修复尚未进入主线，项目实际功能推进有限。

## 4. 社区热点

今日讨论最活跃的是 Issue **#3343**（评论 1 条，唯一有评论的条目）：

- **[#3343] [BUG] Tool feedback animation can edit a Telegram message indefinitely after a failed turn**
  https://github.com/sipeed/picoclaw/issues/3343

该 Issue 描述了一个严重的自动化失控场景：工具反馈动画在 Agent 回合失败后，仍持续每 3 秒调用一次 Telegram `editMessageText`，持续数天累计超过 228,000 次编辑尝试，最终触发 Telegram 服务端限流（`retry_after`）。社区讨论的核心诉求是：**动画循环缺少终止条件**，且失败后未正确清理定时任务。这反映了用户对自动化任务资源消耗和 API 配额耗尽的担忧。

## 5. Bug 与稳定性

今日报告 1 个 Bug，严重程度较高：

| 严重程度 | Issue | 描述 | 修复状态 |
|---------|-------|------|---------|
| 🔴 高 | [#3343](https://github.com/sipeed/picoclaw/issues/3343) | 工具反馈动画在失败回合后无限循环调用 Telegram API，产生 22.8 万次编辑请求并触发限流 | 无修复 PR，仍为 OPEN 状态 |

该 Bug 不仅影响 Telegram 渠道的稳定性，还可能因 API 限流导致账号被临时封禁，建议优先排查动画循环的退出条件。

## 6. 功能请求与路线图信号

今日无新功能请求 Issue，但有两个 PR 透露出路线图信号：

- **i18n 本地化扩展**（[#3348](https://github.com/sipeed/picoclaw/pull/3348)）：捷克语代码换行标签补全，说明社区正在持续完善多语言支持，预计未来版本会继续吸收各语种翻译贡献。
- **Telegram 话题模式支持**（[#3315](https://github.com/sipeed/picoclaw/pull/3315)）：虽然 PR 被关闭，但该需求真实存在，且 Telegram 官方 API 已支持私聊话题，预计后续会有新的 PR 重新实现此功能。

## 7. 用户反馈摘要

从 Issue #3343 的评论中可提炼出以下用户痛点：

- **自动化任务缺乏安全护栏**：用户 @raine 反馈动画循环在失败后未停止，说明当前实现缺少对异步任务生命周期的严格管理，尤其是在异常路径下。
- **API 配额消耗担忧**：22.8 万次编辑请求不仅影响单个聊天，还可能导致整个 Telegram Bot 被限流，影响所有用户。这提示项目需要在客户端增加请求频率限制和熔断机制。
- **可观测性不足**：该问题持续数天未被发现，说明缺少对后台任务运行状态的监控和告警。

## 8. 待处理积压

以下 Issue/PR 长期未得到有效响应，建议维护者关注：

- **[#3343] [BUG] Tool feedback animation can edit a Telegram message indefinitely**（OPEN，stale，创建于 2026-08-22，已 7 天无修复进展）— 高严重度 Bug，需尽快分配修复。
  https://github.com/sipeed/picoclaw/issues/3343

- **[#3337] Fix/mcp failure hangs agent loop**（CLOSED，stale）— 修复 MCP 连接失败导致 Agent 挂起的问题，功能价值高但被关闭，建议重新打开或在新 PR 中继续推进。
  https://github.com/sipeed/picoclaw/pull/3337

- **[#3315] Support topics in private bot chats**（CLOSED，stale）— Telegram 私聊话题支持，属于渠道功能完善，建议纳入后续迭代计划。
  https://github.com/sipeed/picoclaw/pull/3315

---

*本日报由 AI 分析师自动生成，数据截至 2026-08-30 00:00 UTC。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-30

## 1. 今日速览

过去 24 小时 QwenPaw 项目保持中等偏上活跃度：共 10 条 Issue 更新（8 开放 / 2 关闭）和 7 条 PR 更新（全部待合并），无新版本发布。社区讨论焦点集中在 **QwenPaw Hub 多租户版路线图**（#7318，14 条评论）以及多个体验类功能请求（计划模式、/btw 侧问命令、聊天滚动锁定等）。Bug 报告方面出现 2 个值得关注的新问题（MCP 迁移凭据悬空、Ark API 空文本块污染会话），均暂无修复 PR。项目整体处于 v2.2.0 预发布周期内的功能收尾与社区反馈收集阶段，健康度良好，但 PR 合并效率偏低（7 个待合并 PR 中 2 个已停留超两周）。

## 2. 版本发布

过去 24 小时无新版本发布。当前最新预发布版本为 **v2.2.0-beta.3**（8 月 28 日发布），其安装验证任务（#7394）已过期未完成，建议维护者关注。

## 3. 项目进展

过去 24 小时 **无 PR 被合并或关闭**，7 个 PR 均处于开放状态。但以下 PR 有实质推进（更新于 8 月 29 日），值得关注：

- **#7401 fix(acp): prevent Windows ACP agent stalls during workspace bootstrap** — 修复 Windows 下 ACP agent 在工作区初始化期间事件循环冻结、插件加载/MCP 初始化导致响应挂起数分钟的问题。属于平台稳定性关键修复。
- **#7356 feat(console): add chat scroll lock** — 为 Console 聊天视图增加滚动锁定，解决流式输出时视口强制跟随导致用户无法阅读历史内容的问题。
- **#7357 feat(chat): add tool call visibility toggle** — 增加工具调用卡片显示/隐藏开关，减少长对话中工具调用噪音对阅读的干扰。
- **#7220 fix(media): reject oversized image dimensions** — 修复图片仅检查字节大小（2 MiB）而未检查像素尺寸导致视觉模型提供商拒绝请求的问题（关闭 #7212）。
- **#6874 feat(mcp): add configurable tool call timeout** — 为 MCP 工具调用增加可配置超时（默认 300 秒），兼容旧 `timeout` 配置键（关闭 #6724）。

**整体判断**：项目功能迭代方向清晰，集中在 **Console 体验优化、MCP 稳定性、Windows 平台适配** 三大方向，但 PR 积压时间较长（#6874 已开放 19 天，#7080 已开放 12 天），合并速度需提升。

## 4. 社区热点

### 🔥 #7318 [Discussion] QwenPaw Hub 多租户版将于 2.2.0 推出：你希望我们接下来做什么？
- **链接**: https://github.com/agentscope-ai/QwenPaw/issues/7318
- **作者**: @rayrayraykk | **评论**: 14 | 👍: 1
- **分析**: 这是当前社区最活跃的讨论帖。QwenPaw 从个人 AI 助手向团队协作工具演进是社区长期诉求（关联 #2324 多用户访问与管理员管理技能）。该讨论帖收集了 14 条社区反馈，是 v2.2.0 功能规划的重要输入。**核心诉求**：团队级部署、权限管理、共享技能库等企业级能力。

### 💬 #7405 [Question] Plan Mode（计划模式）
- **链接**: https://github.com/agentscope-ai/QwenPaw/issues/7405
- **作者**: @CD-IE | **评论**: 2
- **分析**: 用户怀念旧版 Plan Mode 的"先看计划再执行"体验，认为当前 snapshots 回滚方案是"等模型做错再回滚"，不够高效。反映用户对 **AI 行为可预见性** 的强烈需求。

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 高严重度

- **#7301 [Bug] MCP legacy migration leaves empty-env clients with a dangling credential ref — every new session fails with CredentialNotFoundError**
  - **链接**: https://github.com/agentscope-ai/QwenPaw/issues/7301
  - **报告**: @datianguagua | 8月26日创建，8月29日更新 | 评论: 3
  - **影响**: MCP 旧版迁移后，空环境客户端残留悬空凭据引用，导致 **每个新会话都失败**（CredentialNotFoundError）。属于阻断性 Bug，影响所有使用 MCP 迁移功能的用户。
  - **修复状态**: 无关联 PR。

- **#7402 [Bug] Empty assistant output_text blocks persisted in session history poison every subsequent request — Ark Responses API returns 400**
  - **链接**: https://github.com/agentscope-ai/QwenPaw/issues/7402
  - **报告**: @xiaoka76 | 8月29日创建 | 评论: 1
  - **影响**: 使用 Volcengine Ark provider 时，会话历史中的空文本块（`content=[{"type":"output_text","text":""}]`）导致后续所有请求返回 400 错误。影响使用 Ark API 的用户，且问题会 **持续污染会话**。
  - **修复状态**: 无关联 PR。

### 🟡 中严重度

- **#7399 [澄清] daily_users 时间戳显示"UTC" 实为 AgentScope 设计：naive datetime 即进程本地时间**
  - **链接**: https://github.com/agentscope-ai/QwenPaw/issues/7399
  - **报告**: @feng183043996 | 8月29日创建 | 评论: 1
  - **性质**: 非 Bug，是 AgentScope `Msg` 类的设计选择（`datetime.now().isoformat()` 无时区参数）。但该设计容易引起用户困惑，建议文档中明确说明。

### 🟢 低严重度 / 已关闭

- **#7400 [bug, invalid] 搞错** — 用户自行关闭，无效报告。
- **#6770 [CLOSED] [Feature]: Make user Chrome tab lifetime configurable across response cycles** — 已关闭，功能可能已实现或不再考虑。

## 6. 功能请求与路线图信号

| Issue/PR | 功能 | 状态 | 纳入下一版本可能性 |
|----------|------|------|-------------------|
| #7405 Plan Mode 计划模式 | 恢复"先看计划再执行"模式 | 开放讨论 | 中 — 用户呼声高，但需权衡与现有模式的定位 |
| #7398 `/btw` 侧问命令 | 类似 Claude Code 的旁路提问，不写入主对话历史 | 开放 | 中高 — 实现成本低，社区有明确参照 |
| #7404 暴露 `card_auto_layout` 设置 | 在 Console 中暴露钉钉渠道的宽屏卡片选项 | 开放 | 高 — 功能已存在（#2238），仅需 UI 暴露 |
| #7318 Hub 多租户版功能征集 | 团队协作、多用户管理 | 讨论中 | 已确认 v2.2.0 推出，具体功能待定 |
| #7356 聊天滚动锁定 | 流式输出时允许用户自由滚动 | PR 待合并 | 高 — PR 已就绪 |
| #7357 工具调用可见性开关 | 隐藏/显示工具调用卡片 | PR 待合并 | 高 — PR 已就绪 |
| #7080 PowerContext 长期记忆后端 | 可插拔的长期记忆后端 | PR 待合并（Under Review） | 中高 — 已在 Review 阶段 |

## 7. 用户反馈摘要

从今日 Issues 评论中提炼的真实用户声音：

- **对 AI 行为可预见性的需求**（#7405）: "Plan mode was great to let me see what the model planned to do... that means we have to wait for the model to do the wrong thing and then roll back" — 用户希望 **事前控制** 而非 **事后回滚**，反映对 AI 自主执行信任度的边界诉求。

- **对团队协作功能的迫切期待**（#7318）: 社区多次提出多用户访问、管理员管理技能等需求，QwenPaw Hub 是官方首次正式回应。用户期待从"个人助手"升级为"团队工具"。

- **对配置可发现性的不满**（#7404）: "it is neither exposed in the Console nor mentioned in the docs. Users who want widescreen AI cards have no way to discover it short of reading the channel source" — 功能存在但不可发现，用户需要阅读源码才能找到配置项，反映 **文档与 UI 暴露滞后** 的问题。

- **对时间戳显示的困惑**（#7399）: 用户误以为 daily_users 时间戳显示 UTC 是 Bug，实际是 naive datetime 设计。说明 **时区处理需要更明确的文档说明**。

## 8. 待处理积压

### ⚠️ 长期未合并的 PR（需维护者关注）

- **#6874 feat(mcp): add configurable tool call timeout** — 开放 19 天，Under Review
  - 链接: https://github.com/agentscope-ai/QwenPaw/pull/6874
  - 影响: MCP 工具调用超时不可配置，影响集成稳定性。已关闭 #6724，功能明确。

- **#7080 [Feature] Add optional PowerContext pluggable long-term memory backend** — 开放 12 天，Under Review
  - 链接: https://github.com/agentscope-ai/QwenPaw/pull/7080
  - 影响: 长期记忆后端可插拔化，是架构级增强。首次贡献者提交，需维护者及时反馈。

### ⚠️ 待响应的关键 Issue

- **#7301 MCP 迁移凭据悬空 Bug** — 已开放 3 天，无维护者回应，无修复 PR。属于阻断性 Bug，建议优先处理。
- **#7394 v2.2.0-beta.3 安装验证任务已过期** — 发布验证流程未按时完成，可能影响 beta 版本质量评估。

---

*本日报由 AI 自动生成，数据截至 2026-08-30。所有链接均指向 GitHub 原始内容。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报 — 2026-08-30

## 1. 今日速览

过去24小时项目活跃度极高：共产生347条Issue更新（其中新开/活跃285条，关闭62条）和500条PR更新（待合并423条，已合并/关闭77条），无新版本发布。Issue关闭率约17.9%，PR合并/关闭率约15.4%，合并吞吐量偏低，大量PR处于待合并状态。社区讨论集中在技能索引老化（#66616，119条评论）、自动化集成阻塞（#88584，41条评论）以及桌面端启动/崩溃类问题。项目整体处于高密度迭代期，但合并效率有待提升，需关注积压风险。

## 2. 版本发布

过去24小时无新版本发布。当前最新版本为v0.20.5（2026-08-27前后），建议关注main分支的合并节奏。

## 3. 项目进展

过去24小时有77条PR被合并/关闭，但展示的评论最多20条PR均为开放状态，无法直接确认今日合并的具体内容。从开放PR的分布来看，项目当前推进的重点方向包括：

- **Bot Mode 群聊连续性**：#97846（自动群聊连续性）和#97797（跨网关RoomLink）均为8月29日新提交的feature PR，目标是在桌面端关闭后群聊仍可在网关上继续运行，并支持跨网关成员调度。
- **Webhook 管道重构**：#97083（分片持久化权威管道）和#97218（将重放身份绑定到已认证内容）由同一作者提交，涉及网关安全边界与消息投递可靠性。
- **MCP OAuth 死锁修复**：#90888（将委托认证流拆除绑定到拥有任务）直指#38193和#81051两个已关闭的OAuth MCP死锁问题，修复方案已进入可合并状态。
- **桌面终端启动输出丢失**：#98203（保留终端启动输出）修复Electron渲染器就绪前PTY输出丢失问题。
- **Provider 路由修复**：#98201（custom:openrouter 配置文件上的 provider_routing）和#94904（Copilot 双线协议的 model-aware API 模式判定）均在修复特定 provider 的兼容性问题。

整体来看，项目正在同时推进群聊架构升级、网关安全加固、MCP稳定性修复和桌面端体验优化四条主线。

## 4. 社区热点

- **[#66616] Skills index is stale or degraded（119条评论）** — 技能索引自动探针连续报告索引老化（29.8小时超过26小时限制），社区围绕索引重建机制、cron调度和部署流水线展开了长时间讨论。该问题已持续42天，属于基础设施稳定性问题，影响所有依赖技能索引的功能。
  https://github.com/NousResearch/hermes-agent/issues/66616

- **[#88584] Automated Nous integration is blocked（41条评论）** — Nous-to-Enterkey 的定时合并因 `cron/jobs.py` 冲突而阻塞，社区关注自动化集成管道的可靠性。该问题已持续12天，涉及跨仓库协作流程。
  https://github.com/NousResearch/hermes-agent/issues/88584

- **[#77111] RealtimeVoiceProvider ABC — 四个竞争性双工语音PR需要接口而非合并队列（14条评论，2个👍）** — 社区引用AGENTS.md中的"Footprint Ladder"规则，呼吁为四个并行的双工语音PR设计统一抽象接口，而非逐个合并。这反映了社区对架构治理的参与度。
  https://github.com/NousResearch/hermes-agent/issues/77111

- **[#89995] 在Web仪表盘和网关中暴露Bot Mode群聊房间（14条评论，2个👍）** — 用户要求将桌面端独有的群聊功能扩展到Web端，与#97846/#97797两个PR方向一致，说明该需求有真实用户基础。
  https://github.com/NousResearch/hermes-agent/issues/89995

## 5. Bug 与稳定性

按严重程度排列（P1为最高）：

**P1 级别：**

- **[#94248] Gateway SIGSEGV 17-72ms after delegate deadlines with Codex SSL reads** — macOS arm64上网关在委托worker达到600秒超时时段内崩溃，已有12份Apple原生崩溃报告，5次发生在8月24日当天。涉及会话状态和消息投递风险。**暂无对应fix PR。**
  https://github.com/NousResearch/hermes-agent/issues/94248

- **[#70716] 本地后台终端执行器共享网关cgroup，内存压力下可终止控制平面** — systemd-oomd可能杀死整个消息网关而非仅worker命令。涉及消息投递和内存管理风险。**暂无对应fix PR。**
  https://github.com/NousResearch/hermes-agent/issues/70716

- **[#94058] Linux桌面入口Exec解析venv符号链接到裸解释器，升级后启动器崩溃** — uv创建的venv中 `bin/python` 是指向共享解释器树的符号链接，导致 `hermes desktop` 写入错误的Exec行。**暂无对应fix PR。**
  https://github.com/NousResearch/hermes-agent/issues/94058

- **[#51327] Hermes Desktop从.desktop启动器静默失败（Electron chrome-sandbox缺少setuid 4755）** — 已开放68天，影响Linux桌面用户体验。**暂无对应fix PR。**
  https://github.com/NousResearch/hermes-agent/issues/51327

- **[#91495] Hermes Desktop启动失败：WebSocket拒绝会话令牌** — Linux桌面端与本地后端的WebSocket认证失败。**暂无对应fix PR。**
  https://github.com/NousResearch/hermes-agent/issues/91495

- **[#96266] Linux桌面配置文件后端在HERMES_BACKEND_READY后约10秒被杀死** — 强制本地模式的后端进程启动后即被终止，重试/修复均失败。**暂无对应fix PR。**
  https://github.com/NousResearch/hermes-agent/issues/96266

- **[#58576] web_server事件循环在重负载下停滞长达51秒（GIL压力）** — Windows桌面UI冻结问题，涉及会话状态、消息投递和平台兼容性多重风险。**暂无对应fix PR。**
  https://github.com/NousResearch/hermes-agent/issues/58576

- **[#96360] Windows桌面更新因无关SCM服务处于STOP_PENDING而中止** — 已关闭，但暴露了更新流程对系统服务状态的过度敏感。
  https://github.com/NousResearch/hermes-agent/issues/96360

**P2 级别：**

- **[#88275] 桌面渲染进程空闲时占用40-70% CPU（macOS Intel）** — 自8月初以来持续存在，GPU禁用仅部分缓解。**暂无对应fix PR。**
  https://github.com/NousResearch/hermes-agent/issues/88275

- **[#95150] stdio MCP服务器不可用：_stdio_children_dead()返回值反转** — 已关闭，所有子进程被误报为已死亡。该bug影响所有stdio MCP工具调用。
  https://github.com/NousResearch/hermes-agent/issues/95150

- **[#38193] OAuth MCP服务器在keepalive重连后永久死锁** — 已关闭，对应修复PR #90888正在等待合并。
  https://github.com/NousResearch/hermes-agent/issues/38193

- **[#81051] OAuth MCP连接在teardown锁竞争后永久卡住** — 已关闭，标记为#38193的重复。
  https://github.com/NousResearch/hermes-agent/issues/81051

- **[#86207] hermes update后systemd监督的dashboard运行陈旧代码** — 更新后Models页面500错误，需手动重启。**暂无对应fix PR。**
  https://github.com/NousResearch/hermes-agent/issues/86207

- **[#94196] 桌面端网关切换需"保存并重新连接"才能恢复本地后端** — 会话频繁断开与ws_orphan_reap有关。**暂无对应fix PR。**
  https://github.com/NousResearch/hermes-agent/issues/94196

## 6. 功能请求与路线图信号

- **Bot Mode 群聊跨端/跨网关**（#89995、#97846、#97797）— 用户要求Web端支持群聊，两个PR已提交，预计可能进入v0.21版本。
  https://github.com/NousResearch/hermes-agent/issues/89995
  https://github.com/NousResearch/hermes-agent/pull/97846
  https://github.com/NousResearch/hermes-agent/pull/97797

- **RealtimeVoiceProvider 统一接口**（#77111）— 社区主动要求设计ABC+编排器而非逐个合并PR，可能影响语音功能的架构方向。
  https://github.com/NousResearch/hermes-agent/issues/77111

- **Subagent模型+Provider引导选择器**（#67347）— 用户希望桌面端和Dashboard的 `delegation.model` / `delegation.provider` 字段从自由文本改为引导式选择器，降低配置门槛。
  https://github.com/NousResearch/hermes-agent/issues/67347

- **max_context_length 全局上限**（#70241）— 防止模型切换时上下文窗口被重置为原始值，涉及会话状态和兼容性风险，需要决策。
  https://github.com/NousResearch/hermes-agent/issues/70241

- **技能评估框架**（#96704）— RFC建议新增 `evals/skills/` 配对臂测试框架，衡量agent编写的技能是否真正有帮助，与项目"自我改进"定位直接相关。
  https://github.com/NousResearch/hermes-agent/issues/96704

- **无障碍改进**（#26689）— 盲人VoiceOver用户提交的详细无障碍需求，已开放106天，涉及CLI、TUI和Dashboard，属于长期未解决但真实存在的用户诉求。
  https://github.com/NousResearch/hermes-agent/issues/26689

## 7. 用户反馈摘要

- **无障碍需求迫切**：#26689 用户自述为全盲VoiceOver用户，明确表示"Hermes有极其强大的后端和agent生态，但当前UX对屏幕阅读器用户非常困难"。这是项目在无障碍领域的明确改进方向。
  https://github.com/NousResearch/hermes-agent/issues/26689

- **桌面端启动问题频发**：多个用户报告Linux桌面端启动失败（#51327、#94058、#96266、#91495），涉及sandbox权限、venv符号链接、后端进程被杀、WebSocket认证等多个独立原因，说明桌面端启动路径的健壮性不足。

- **性能问题困扰Intel Mac用户**：#88275 用户报告渲染进程空闲时CPU占用40-73%，导致热降频，影响日常使用体验。

- **配置体验有待优化**：#67347 用户指出 `delegation.model` 和 `delegation.provider` 是裸文本输入框，容易配置错误；#49686 用户反馈自定义API端点时 `max_tokens` 被错误设置为上下文长度，与vLLM不兼容。

- **更新流程存在痛点**：#43837 用户抱怨Windows上 `hermes update` 每次无条件安装Node.js依赖，浪费约8分钟；#86207 用户反馈更新后dashboard运行陈旧代码需要手动重启。

- **群聊功能需求真实存在**：#89995 用户明确表示群聊目前仅限桌面端，Web端和网关无法访问，限制了使用场景。

## 8. 待处理积压

以下为长期未解决或需维护者关注的重要Issue/PR：

- **[#26689] 无障碍改进（已开放106天）** — 盲人用户的详细需求，涉及CLI/TUI/Dashboard三端，无assignee，无PR。建议维护者评估并纳入路线图。
  https://github.com/NousResearch/hermes-agent/issues/26689

- **[#51327] Electron chrome-sandbox setuid问题（已开放68天）** — Linux桌面端静默启动失败，影响面广，无fix PR。
  https://github.com/NousResearch/hermes-agent/issues/51327

- **[#66616] 技能索引持续老化（已开放43天，119条评论）** — 基础设施稳定性问题，社区讨论热度极高但未见修复方案。
  https://github.com/NousResearch/hermes-agent/issues/66616

- **[#43666] 持久化边界上的脱敏缺口（已开放81天）** — 安全相关，涉及工具输出文件转储、压缩块和DB URI中的密码明文残留，属于安全边界风险。
  https://github.com/NousResearch/hermes-agent/issues/43666

- **[#58576] web_server事件循环停滞（已开放56天）** — Windows平台桌面UI冻结，P1级别但无fix PR。
  https://github.com/NousResearch/hermes-agent/issues/58576

- **[#71906] 合成内部事件不得冒充用户（已开放35天）** — 多用户会话中消息归属错误，涉及消息投递风险，PR已提交但仍在等待合并。
  https://github.com/NousResearch/hermes-agent/pull/71906

- **[#72806] 压缩栅栏：持久化transcript修订（已开放34天）** — 修复WebUI与Agent持久化transcript之间的竞态条件，涉及会话状态和缓存风险，PR待合并。
  https://github.com/NousResearch/hermes-agent/pull/72806

---

**项目健康度总结**：hermes-agent 社区活跃度高，Issue和PR数量庞大，但存在三个值得关注的信号：(1) PR合并率偏低（15.4%），大量PR长期处于开放状态，可能形成技术债；(2) P1级bug数量较多且多数无对应fix PR，稳定性风险积聚；(3) 技能索引老化、自动化集成阻塞等基础设施问题持续多日未解决，影响项目整体可靠性。建议维护者优先处理P1级bug和长期积压的安全/稳定性问题，同时关注合并效率。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-08-30

## 今日速览

AstrBot 项目今日保持中等活跃度：过去 24 小时内有 6 条 Issue 更新（5 条新开/活跃，1 条关闭）和 5 条 PR 更新（2 条待合并，3 条已合并/关闭）。社区贡献活跃，两个待合并 PR 分别针对 MiniMax TTS WAV 文件头修复和命令参数类型注解解析，均直接回应当前用户反馈的 Bug。核心维护者 @Soulter 主导的大型重构 PR #9821 已合并，将 Agent Runner 配置嵌入 profile 体系，是项目架构层面的重要推进。无新版本发布。

---

## 版本发布

今日无新版本发布。

---

## 项目进展

今日合并/关闭了 3 个 PR，其中两个具有实质意义：

- **[#9821] refactor: embed agent runner configuration in profiles**（已合并，size:XXL）— 由核心维护者 @Soulter 提交的大型重构，将 Local、Dify、Coze、DashScope、DeerFlow 等 Agent Runner 配置直接嵌入每个配置 profile，迁移了旧版 runner 字段，并移除了 provider 页面中的 Agent Runner 管理 UI。这是对配置体系的一次重要简化，为后续多 profile 管理铺平道路。
  https://github.com/AstrBotDevs/AstrBot/pull/9821

- **[#9328] fix: constrain custom workspace paths**（已合并，size:XS）— 修复了一个安全回归：此前自定义工作区路径可指向 AstrBot 工作区根目录之外的绝对路径，扩大了非管理员本地文件工具的读写范围。该修复将自定义工作区路径限制在合法范围内，并防止低权限聊天作用域利用项目级配置越权。
  https://github.com/AstrBotDevs/AstrBot/pull/9328

- **[#9787] Optimize Dockerfile build cache**（已合并，size:XS）— 调整 Dockerfile 构建顺序，将 COPY 移到依赖安装之后，利用 Docker 层缓存显著加速 CI/部署流程。
  https://github.com/AstrBotDevs/AstrBot/pull/9787

整体来看，项目在架构整理（配置体系重构）、安全加固（路径约束）和工程效率（Docker 缓存）三个维度均有推进。

---

## 社区热点

今日社区讨论热度较为分散，评论数均不高，但以下 Issue 值得关注：

- **[#9862] [Feature] 有考虑做日语本地化吗** — 用户主动提出愿意添加并长期维护日语翻译（含文档），使用场景是向日本用户推荐 AstrBot。这反映了项目在中文社区之外开始获得国际关注，i18n 需求正在浮出水面。
  https://github.com/AstrBotDevs/AstrBot/issues/9862

- **[#9868] [Bug] 知识库混合检索在 Dense 召回失败时可能压掉 Sparse 的精确匹配** — 用户详细描述了 v4.27.4 中知识库混合检索的缺陷：当 `dense_weight = 0.9` 时，Dense 召回失败会压制 Sparse/FTS5 的精确匹配，导致短英文实体检索失真。该 Issue 触及知识库核心检索链路，且用户提供了完整的复现逻辑，属于高质量反馈。
  https://github.com/AstrBotDevs/AstrBot/issues/9868

- **[#9860] [Bug] MiniMax TTS 流式输出 WAV 文件头非法** — 用户定位到 `minimax_tts_api_source.py` 中固定 `stream: True` 导致 ffmpeg 写入 `0xFFFFFFFF` 占位符，在严格播放器中无法播放。该 Issue 已有一个对应修复 PR #9867 提交，社区响应迅速。
  https://github.com/AstrBotDevs/AstrBot/issues/9860

---

## Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 高 | [#9868] 知识库混合检索 Dense 压制 Sparse 精确匹配 | 核心检索链路缺陷，导致知识库中存在的精确字符串无法被召回，影响 RAG 准确性 | 待处理，无对应 PR |
| 中 | [#9860] MiniMax TTS WAV 文件头非法 | 生成的音频在严格播放器中无法播放，日志无报错，问题隐蔽 | **已有修复 PR #9867（待合并）** |
| 中 | [#9869] 保存插件配置时报错但提示成功 | 插件配置保存时 FaissVecDB 插入失败（401 Invalid token），UI 状态与实际结果不一致 | 待处理，疑似插件侧问题 |
| 低 | [#4097] 会话插件过滤时函数工具列表异常 | 已关闭（2026-08-29），模块名缺少 `main` 导致工具消失 | 已解决 |

值得肯定的是，MiniMax TTS 的 Bug 在用户报告后很快就有社区成员提交了修复 PR（#9867），体现了项目社区的响应速度。

---

## 功能请求与路线图信号

- **[#9862] 日语本地化** — 用户自愿长期维护翻译和文档。考虑到 AstrBot 已有 i18n 基础，此需求实现成本较低，且能拓展非中文用户群体，有较大概率被纳入后续版本。
  https://github.com/AstrBotDevs/AstrBot/issues/9862

- **[#9870] 飞书适配器扩展更多事件** — 用户建议支持云文档评论、妙记生成等事件，并引入飞书官方 Channel SDK 以处理卡片交互。这指向办公自动化场景，与 AstrBot 作为个人 AI 助手的定位契合，但涉及适配器架构调整，可能排期较后。
  https://github.com/AstrBotDevs/AstrBot/issues/9870

- **[#9866] 命令参数解析尊重类型注解**（PR，待合并）— 修复参数转换由默认值运行时类型驱动而非声明注解的问题，例如 `Optional[str] = None` 注解的参数收到数字输入时会被错误转为 int。该修复提升命令系统的类型健壮性，预计将随下一个版本发布。
  https://github.com/AstrBotDevs/AstrBot/pull/9866

---

## 用户反馈摘要

- **国际化需求初现**：有日本用户通过中文社区用户推荐了解到 AstrBot，用户主动提出承担日语翻译和文档维护，说明项目在海外华人圈已有口碑传播（#9862）。
- **知识库检索精度痛点**：用户反馈在 `dense_weight = 0.9` 的配置下，短英文实体（如专有名词）检索不可靠，即使知识库中存在精确匹配也会被 Dense 召回失败所掩盖。用户对检索机制有较深理解，反馈专业度高（#9868）。
- **TTS 兼容性困扰**：MiniMax TTS 在浏览器中正常、在 Android WebView 中失败的隐蔽问题让用户排查困难，日志无报错增加了诊断成本。用户对"表面成功但实际不可用"的状态表示困扰（#9860）。
- **插件配置保存状态不一致**：用户点击"关闭"而非"保存并关闭"后，UI 显示配置更改成功，但实际保存过程中发生了 401 错误，状态提示具有误导性（#9869）。

---

## 待处理积压

- **[#9868] 知识库混合检索 Dense 压制 Sparse 精确匹配** — 核心检索链路 Bug，影响知识库问答准确性，目前无对应修复 PR。建议维护者优先评估 Fusion 权重策略或增加 Sparse-only 候选保底机制。
  https://github.com/AstrBotDevs/AstrBot/issues/9868

- **[#9869] 插件配置保存报错但提示成功** — 虽然疑似插件侧问题（`astrbot_plugin_stealer`），但 UI 状态与实际结果不一致属于框架层面的反馈缺陷，建议确认是否为 AstrBot 配置保存流程的通用问题。
  https://github.com/AstrBotDevs/AstrBot/issues/9869

- **[#9870] 飞书适配器扩展** — 功能请求，暂无维护者回应。若项目规划中飞书平台优先级不高，建议明确告知用户预期时间线，避免长期无响应。
  https://github.com/AstrBotDevs/AstrBot/issues/9870

---

*本日报基于 AstrBot GitHub 仓库 2026-08-30 数据自动生成，仅供参考。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*