# OpenClaw 生态日报 2026-08-04

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-03 22:51 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-08-04

> 数据窗口：截至 2026-08-03 24:00（GitHub 过去 24 小时）
> 标签说明：`clawsweeper:linked-pr-open` = 已有 PR 在推进；`clawsweeper:no-new-fix-pr` = 暂无新修复 PR；`issue-rating` 为严重度/重要性评级（🦞 diamond lobster 最高）。

## 1. 今日速览

过去 24 小时 OpenClaw 仓库保持极高活跃度：共 500 条 Issue 更新（新开/活跃 467，关闭 33）和 500 条 PR 更新（待合并 350，已合并/关闭 150），无新版本发布。Issue 关闭率仅约 6.6%，PR 合并/关闭率约 30%，高优先级问题的消化速度明显落后于社区反馈速度。社区讨论高度集中于“静默失败/消息丢失”类问题（#116277 达 98 条评论）和实时语音资源边界（#116201，50 条评论）。PR 侧今日合入了多条可靠性修复、安全加固和 QA 测试补强，项目整体处于“加固期”。

## 2. 版本发布

今日无新版本发布（New Releases: 0）。

## 3. 项目进展

今日共有 150 条 PR 关闭/合并。从评论数 Top 30 的样本看，实际进入主干/定稿的改动集中在通道可靠性、安全加固与测试覆盖：

- **SMS/MMS 可靠性修复**：[#118994](https://github.com/openclaw/openclaw/pull/118994) — 为瞬时的 Twilio HTTP 429/5xx 或传输故障增加重试，避免已确认的回调被永久墓碑化、附件被静默丢弃。
- **安全边界加固**：[#118984](https://github.com/openclaw/openclaw/pull/118984) — 建立统一的外部内容消毒器，加固 Firecrawl、Tavily、xAI、共享 Web 搜索、MCP HTTP 等来源的输出边界，防止恶意网络内容注入模型上下文。
- **短信投递可观测性**：[#118665](https://github.com/openclaw/openclaw/pull/118665) — 新增 Twilio 投递状态跟踪，区分“运营商已接受”与“最终已送达”，解决长期存在的投递盲区。
- **小修复**：[#109758](https://github.com/openclaw/openclaw/pull/109758) — `normalizeOpenAIReasoningEffort` 改为大小写不敏感，修复混合大小写 `reasoning_effort` 配置透传问题。
- **QA 测试覆盖系统性补强**：@vincentkoc 今日批量关闭了一批 QA 场景 PR，包括网关 SSH 隧道回退（[#118818](https://github.com/openclaw/openclaw/pull/118818)）、图像生成生命周期（[#118915](https://github.com/openclaw/openclaw/pull/118915)）、媒体引用摄入（[#118858](https://github.com/openclaw/openclaw/pull/118858)）、视频生成调用（[#118864](https://github.com/openclaw/openclaw/pull/118864)）、TaskFlow 注册表生命周期（[#118983](https://github.com/openclaw/openclaw/pull/118983)）。这说明项目正在系统性补齐此前缺失的可执行测试场景。

整体判断：今日没有新功能发布，但 SMS 通道可靠性、外部内容安全、投递可观测性三个方向均有实质合入，项目在“稳定性加固”上向前迈进了明确的一步。

## 4. 社区热点

今日讨论最活跃的 Issue 集中在以下几条：

- **[#116277 DeepSeek v4 Flash 静默失败](https://github.com/openclaw/openclaw/issues/116277)**（98 评论，P1，已关闭，🦞 diamond lobster）— 模型未生成回复时，OpenClaw 只发出通用 fallback “No reply was generated”，用户无法区分是模型问题、网络问题还是配置问题。标签同时包含 `linked-pr-open` 和 `no-new-fix-pr`，说明虽已关闭但仍需跟进回归验证。
- **[#116201 Realtime voice 状态无界增长](https://github.com/openclaw/openclaw/issues/116201)**（50 评论，P1，🦐 gold shrimp）— 实时语音会话在慢速/突发 provider 行为下会无限保留 superseded consult work、大帧、pre-ready 音频等状态，缺少硬性 ownership 边界。
- **[#7707 Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707)**（24 评论，P2，🌊 off-meta tidepool）— 用户担心记忆投毒，要求按来源（用户命令、网页抓取、三方技能）对记忆条目做信任分级。
- **[#44925 Subagent 完成静默丢失](https://github.com/openclaw/openclaw/issues/44925)**（23 评论，P1，🦞 diamond lobster）— 子代理结果在 announce 超时、drain、restart 或 orphan prune 场景下静默丢失，无重试、无通知。
- **[#48788 集中式文件名编码工具](https://github.com/openclaw/openclaw/issues/48788)**（20 评论，P3，🐚 platinum hermit）— 讨论如何跨通道处理 Shift-JIS、EUC-KR、GB18030 等多编码 Content-Disposition。

**背后的共同诉求**：用户对“无提示失败”容忍度极低——要么成功，要么明确报错并允许重试；同时对会话资源需要硬性边界，对记忆数据需要可追溯的信任机制。

## 5. Bug 与稳定性

今日样本中按严重度排列如下：

### P0（发布阻断）

- **[#103804 service-env 生成器双重引号破坏 AWS_REGION](https://github.com/openclaw/openclaw/issues/103804)**（P0，🦞 diamond lobster，已有 PR 关联）— 生成 `export AWS_REGION='"us-east-1"'` 形式的值，source 后 hostname 解析被破坏，属于发布阻断级配置错误。

### P1（严重影响）

**消息丢失/静默失败类**

- **[#116277 DeepSeek v4 Flash 静默失败](https://github.com/openclaw/openclaw/issues/116277)**（已关闭，98 评论，🦞 diamond lobster）— 无回复时只发 fallback，无根因信息。
- **[#44925 Subagent 完成静默丢失](https://github.com/openclaw/openclaw/issues/44925)**（🦞 diamond lobster，🚫 暂无新 fix PR）— 子代理结果在多种故障模式下无重试、无通知。
- **[#40001 write 工具无 append 模式](https://github.com/openclaw/openclaw/issues/40001)**（🦞 diamond lobster，🚫 暂无新 fix PR）— 隔离 cron 会话直接覆盖共享文件（如 `memory/YYYY-MM-DD.md`），造成静默数据丢失。
- **[#84516 Codex 长回复静默截断](https://github.com/openclaw/openclaw/issues/84516)**（🐚 platinum hermit，🚫 暂无新 fix PR）— 约 1000-1100 字符处截断，`aborted: false`、`stopReason` 全为 null。
- **[#87744 Codex-backed Telegram 回合超时](https://github.com/openclaw/openclaw/issues/87744)**（🐚 platinum hermit，🚫 暂无新 fix PR）— 模型已完成工作但迟迟不进入 `turn/completed`，Telegram 收不到最终答案。
- **[#53408 write/exec 参数静默丢失](https://github.com/openclaw/openclaw/issues/53408)**（🦐 gold shrimp，🚫 暂无新 fix PR）— 长对话后工具调用参数被静默清空。
- **[#39476 A2A sessions_send 双向调用导致重复消息](https://github.com/openclaw/openclaw/issues/39476)**（🦞 diamond lobster，已有 PR 关联）。

**会话/路由/状态类**

- **[#116201 实时语音状态无界保留](https://github.com/openclaw/openclaw/issues/116201)**（🦐 gold shrimp，🚫 暂无新 fix PR）。
- **[#52249 ACP 父会话等待子会话时卡死](https://github.com/openclaw/openclaw/issues/52249)**（🦪 silver shellfish，未标注 fix 状态）。
- **[#41165 Telegram DM 路由污染主 session](https://github.com/openclaw/openclaw/issues/41165)**（🐚 platinum hermit，已有 PR 关联）。
- **[#116022 /new 无法恢复 Codex binding tombstone](https://github.com/openclaw/openclaw/issues/116022)**（🦞 diamond lobster，已有 PR 关联）。
- **[#44502 Discord 路由/提及门控回归](https://github.com/openclaw/openclaw/issues/44502)**（🦪 silver shellfish，🚫 暂无新 fix PR）。
- **[#54488 会话车道饥饿](https://github.com/openclaw/openclaw/issues/54488)**（🐚 platinum hermit，🚫 暂无新 fix PR）— followup drain 独占会话车道，入站消息被阻塞 20-30 分钟。
- **[#45573 群聊会话未持久化](https://github.com/openclaw/openclaw/issues/45573)**（🐚 platinum hermit，🚫 暂无新 fix PR）— 166+ 条消息只记录了 1 个会话。
- **[#42820 Feishu message 工具被 poll schema 污染](https://github.com/openclaw/openclaw/issues/42820)**（🦞 diamond lobster，已有 PR 关联）。

**稳定性/资源类**

- **[#89315 gateway 堆内存无界增长导致 OOM](https://github.com/openclaw/openclaw/issues/89315)**（🦪 silver shellfish，🚫 暂无新 fix PR）。
- **[#92633 memory_search corpus=all 超时](https://github.com/openclaw/openclaw/issues/92633)**（🦞 diamond lobster，🚫 暂无新 fix PR）。
- **[#45494 cron 在 LLM API 持续故障时耗尽超时窗口](https://github.com/openclaw/openclaw/issues/45494)**（🐚 platinum hermit，🚫 暂无新 fix PR）。
- **[#44134 Google Antigravity 因频繁工具重载被误封](https://github.com/openclaw/openclaw/issues/44134)**（🐚 platinum hermit，🚫 暂无新 fix PR）。
- **[#90595 cron “failed” 通知误报导致告警疲劳](https://github.com/openclaw/openclaw/issues/90595)**（🐚 platinum hermit，🚫 暂无新 fix PR）。
- **[#90414 agentmemory 持续报 “index metadata is missing”](https://github.com/openclaw/openclaw/issues/90414)**（🐚 platinum hermit，🚫 暂无新 fix PR）。

### P2（一般）

- **[#45765 OPENCLAW_HOME 产生嵌套目录](https://github.com/openclaw/openclaw/issues/45765)**（🐚 platinum hermit，🚫 暂无新 fix PR）— `OPENCLAW_HOME=~/.openclaw` 时生成 `~/.openclaw/.openclaw`。
- **[#54463 QMD 索引符号链接循环导致 ENAMETOOLONG](https://github.com/openclaw/openclaw/issues/54463)**（🐚 platinum hermit，🚫 暂无新 fix PR）。
- **[#57256 openclaw status 误报 mem0 不可用](https://github.com/openclaw/openclaw/issues/57256)**（🦪 silver shellfish，已有 PR 关联）。

## 6. 功能请求与路线图信号

今日样本中最值得关注的功能需求与路线图信号：

- **[#7707 Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707)**（24 评论）— 记忆投毒防护需求热度高，若与 #45608 的记忆生命周期改善合并考虑，可能进入“记忆安全”路线图。
- **[#45608 重置前 agentic memory flush](https://github.com/openclaw/openclaw/issues/45608)**（👍4）— 已有相关 PR **[#118681](https://github.com/openclaw/openclaw/pull/118681)（fix(agents): bounded memory flush before recovery compaction）** 在审，虽然该 PR 目前是 `waiting on author`，但说明该诉求已被接受并开始实现。
- **[#42475 网关级 per-agent 成本预算](https://github.com/openclaw/openclaw/issues/42475)** — 防止 runaway spend，标签含 `linked-pr-open`，有对应 PR 在推进。
- **[#40786 backup CLI 增加排除模式](https://github.com/openclaw/openclaw/issues/40786)** — 解决备份包含 `node_modules`、`.env` 敏感文件的问题，安全相关。
- **[#48788 集中式多编码文件名处理](https://github.com/openclaw/openclaw/issues/48788)** — 属于跨通道架构改进，被维护者标记 `needs-product-decision`。
- **[#42840 Control UI 支持 MathJax/LaTeX](https://github.com/openclaw/openclaw/issues/42840)**（👍10）— 社区呼声最高的 UI 功能之一。
- **[#45508 Webchat 自托管 STT/TTS](https://github.com/openclaw/openclaw/issues/45508)**（👍2）— 让 webchat 语音走网关配置而非浏览器 Web Speech API。
- **[#46058 Android chat-first 移动端](https://github.com/openclaw/openclaw/issues/46058)** — 社区已有独立 fork，正与维护者讨论是否聚焦上游化。
- **[#73537 发布稳定性标签](https://github.com/openclaw/openclaw/issues/73537)**（👍2）— 用户明确请求“production-readiness”标签，便于家庭/企业用户选择升级时机。
- **[#51441 暴露实际后端模型名](https://github.com/openclaw/openclaw/issues/51441)** — 在 LiteLLM 等代理场景下，agent 只能看到 alias 看不到真实模型。
- **[#47910 按失败类别区分 provider 故障转移](https://github.com/openclaw/openclaw/issues/47910)** — 认证失败应被隔离，避免反复重试已知坏认证。
- **[#50291 插件 hooks 增加分布式追踪上下文](https://github.com/openclaw/openclaw/issues/50291)** — 可观测性基础设施诉求，适合与今日合入的 QA 测试文化一并推进。

## 7. 用户反馈摘要

从今日高热度 Issue 评论中提炼的真实用户声音：

- **对静默失败的强烈不满**：DeepSeek v4 Flash 只回复 “No reply was generated”（#116277）、Codex 回复无错误截断（#84516）、write/exec 参数静默丢失（#53408）——用户反复强调“没有错误信息就无法排查”。
- **记忆行为不一致**：[#43747](https://github.com/openclaw/openclaw/issues/43747) 中一位用户表示三人团队使用 OpenClaw，三台机器的记忆管理行为完全不同（chunking/embedding、文件存储、SQLite 各不一样），对多机部署造成很大困惑。
- **数据丢失焦虑**：[#40001](https://github.com/openclaw/openclaw/issues/40001) 中 cron 会话覆盖共享 `memory/YYYY-MM-DD.md` 导致“silent data loss”；[#45608](https://github.com/openclaw/openclaw/issues/45608) 希望 `/new` 和 daily reset 前执行与 compaction 相同的记忆 flush，获得 4 个 👍。
- **部署运维痛点**：[#89315](https://github.com/openclaw/openclaw/issues/89315) 中 gateway 在 systemd --user 下长期运行被 cgroup OOM；[#40786](https://github.com/openclaw/openclaw/issues/40786) 抱怨备份把 `node_modules` 和 `.env` 都打进去；[#42273](https://github.com/openclaw/openclaw/issues/42273) 备份在 4GB+ 目录上直接卡死。
- **对项目的高度认可**：[#73537](https://github.com/openclaw/openclaw/issues/73537) 用户表示 OpenClaw “has genuinely become part of our daily workflow”，用于家庭和商务自动化（Telegram、cron、Home Assistant），同时恳请官方提供生产就绪稳定性标识。

## 8. 待处理积压

以下高优先级问题长期未解决且均无新 fix PR 关联，建议维护者优先关注：

- **[#44925 Subagent 完成静默丢失](https://github.com/openclaw/openclaw/issues/44925)**（2026-03-13 创建，P1，🦞 diamond lobster，🚫 no-new-fix-pr）
- **[#40001 write 工具无 append 模式](https://github.com/openclaw/openclaw/issues/40001)**（2026-03-08 创建，P1，🦞 diamond lobster，🚫 no-new-fix-pr）
- **[#45494 cron 在 API 持续故障时超时](https://github.com/openclaw/openclaw/issues/45494)**（2026-03-13 创建，P1，🐚 platinum hermit，🚫 no-new-fix-pr）
- **[#44502 Discord 路由/提及回归](https://github.com/openclaw/openclaw/issues/44502)**（2026-03-13 创建，P1，🦪 silver shellfish，🚫 no-new-fix-pr）
- **[#54488 会话车道饥饿](https://github.com/openclaw/openclaw/issues/54488)**（2026-03-25 创建，P1，🐚 platinum hermit，🚫 no-new-fix-pr）
- **[#84516 Codex 回复静默截断](https://github.com/openclaw/openclaw/issues/84516)**（2026-05-20 创建，P1，🐚 platinum hermit，🚫 no-new-fix-pr）
- **[#87744 Codex Telegram 回合超时](https://github.com/openclaw/openclaw/issues/87744)**（2026-05-28 创建，P1，🐚 platinum hermit，🚫 no-new-fix-pr）
- **[#89315 gateway 堆 OOM](https://github.com/openclaw/openclaw/issues/89315)**（2026-06-02 创建，P1，🦪 silver shellfish，🚫 no-new-fix-pr）
- **[#92633 memory_search corpus=all 超时](https://github.com/openclaw/openclaw/issues/92633)**（2026-06-13 创建，P1，🦞 diamond lobster，🚫 no-new-fix-pr）

长期未合并/待处理的 PR：

- **[#117034 feat(audit): execution identity inspection](https://github.com/openclaw/openclaw/pull/117034)**（2026-07-31 创建，XL，P2，`waiting on author`）— 大型审计功能，已多日无作者更新。
- **[#88743 docs(sms): Twilio A2P delivery guidance](https://github.com/openclaw/openclaw/pull/88743)**（2026-05-31 创建，P3，`ready for maintainer look`）— 文档 PR 已等待维护者查看超两个月。
- **[#110434 fix(microsoft-foundry): 绑定 az 子进程生命周期](https://github.com/openclaw/openclaw/pull/110434)**（2026-07-18 创建，P1，🦞 diamond lobster，`merge-ready` + `human-review` + `automerge`）— 已具备合入条件，等待人工审核放行。
- **[#118681 fix(agents): bounded memory flush before recovery compaction](https://github.com/openclaw/openclaw/pull/118681)**（P1，XL，`waiting on author`）— 与 #45608 直接相关，但 PR 体量大，需要作者尽快响应 review 意见。
- **[#116332 fix(memory): 刷新 stale openai embedding auth](https://github.com/openclaw/openclaw/pull/116332)**（P1，`needs proof`）— 长期 gateway 进程 OAuth 过期问题，需补充证明后合入。

---

**总结**：OpenClaw 今日社区热度与 PR 吞吐量均处于高位，质量保障投入显著增强，但 P1 级 bug 的“无 fix PR”积压仍偏多，尤其集中在消息丢失、会话状态和内存/资源边界三大方向。建议下一步优先消化这批长期 P1，并将 #116277、#116201 的回归验证纳入 QA 场景。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**分析日期：2026-08-04 | 覆盖项目：OpenClaw、Zeroclaw、PicoClaw、QwenPaw、hermes-agent、AstrBot**


## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态整体处于**高活跃规模扩张期**：头部项目单日 Issue/PR 更新总量可达千级（OpenClaw、hermes-agent），腰部项目稳定在百级（Zeroclaw、QwenPaw），尾部轻量项目维持在十级。生态已从“功能竞赛”转向“可靠性攻坚”——多项目不约而同将资源投入静默失败治理、通道投递可观测性、资源边界加固和安全默认值。渠道适配成为基础能力而非常规卖点，**社区对“无提示失败”的容忍度急剧下降**，对 token 成本的敏感度上升，架构演进开始围绕持久化目标执行（Goal mode）、多智能体编排和可观测性基础设施展开。整体判断：生态正处于由“能用”向“可信、可控、可观测”过渡的关键阶段。


## 2. 各项目活跃度对比

| 项目 | Issue 更新（新开/活跃 + 关闭） | PR 更新（待合并 + 合并/关闭） | Release | 关闭/合并率 | 健康度评估 |
|------|------|------|---------|------------|-----------|
| **OpenClaw** | 500（467 + 33） | 500（350 + 150） | 无 | Issue 6.6%；PR 30% | ⚠️ 高吞吐但 P1 积压较多，加固期 |
| **hermes-agent** | 500（466 + 34） | 500（464 + 36） | **v0.20.0 “The Herald Release”** | Issue 6.8%；PR 7.2% | ✅ 大版本发布，功能扩张+生态建设并行 |
| **Zeroclaw** | 50（46 + 4） | 50（47 + 3） | 无（v0.9.0 冲刺） | Issue 8%；PR 6% | ✅ 高吞吐修复 + 架构规划并行 |
| **QwenPaw** | 22（16 + 6） | 50（26 + 24） | **v2.1.0-beta.1** | Issue 27%；PR 48% | ✅ Beta 发布后密集修复，响应速度快 |
| **PicoClaw** | 8（3 + 5） | 8（3 + 5） | 无 | Issue 63%；PR 63% | ✅ 批量清理 stale，维护节奏转健康 |
| **AstrBot** | 10（7 + 3） | 8（7 + 1） | 无 | Issue 30%；PR 13% | ✅ Issue→Fix PR 闭环率高，链路顺畅 |

**注意**：OpenClaw 与 hermes-agent 同为 500+/500+ 量级，但 hermes-agent 今日 PR 合并率仅 7.2%，大量 PR 处于待合并状态；OpenClaw 虽合并率 30%，但 P1 级 Issue 的“无 fix PR”积压更为突出。QwenPaw 与 PicoClaw 的关闭/合并率数据较好，部分原因是项目体量小、样本基数低。


## 3. OpenClaw 在生态中的定位

**生态位：事实上的“全栈参考实现”，核心参照系。**

- **社区规模断层领先**：单日 500 Issue + 500 PR 的活跃度是第二梯队（Zeroclaw/QwenPaw）的 5–10 倍。Issue 关闭率 6.6% 虽低，但绝对处理量（33 个 Issue 关闭、150 个 PR 合并/关闭）仍远超其他项目，属于“海量反馈、海量消化”的高吞吐模式。
- **技术路线差异**：走“统一网关 + 多通道 + 记忆/任务双系统”的全栈架构，权重高于 Zeroclaw（Rust 原生、Goal mode 架构重构期）与 QwenPaw（agentscope 生态绑定、桌面端优先）。
- **质量加固信号明确**：今日合入集中在短信可靠性重试、外部内容消毒器、投递状态跟踪三大方向，配合 QC 测试场景批量关闭（SSH 隧道回退、图像生命周期等），说明项目正从功能扩张转入系统性稳定性建设。
- **短板同样显著**：P1 级长期积压（9 条无 fix PR，最早可追溯至 2026-03-08）是生态中最突出的“未消化债务”；相比之下 hermes-agent 有 v0.20.0 大版本发布支撑生态信心，Zeroclaw 有 v0.9.0 里程碑收敛，OpenClaw 尚无公开的版本收敛计划。


## 4. 共同关注的技术方向

### 4.1 静默失败治理与可观测性（全部 6 项目）

| 项目 | 具体诉求 |
|------|---------|
| OpenClaw | #116277 DeepSeek 静默失败、#44925 Subagent 结果丢失、#84516 Codex 静默截断 |
| QwenPaw | #6614 微信推送显示 success 实为失败（烧 4400 万 tokens）、#6655 审批被拦截但用户无感知 |
| Zeroclaw | #8536 硬件超时错误吞掉内部 `Elapsed`、#6002 Telegram 消息无响应 |
| PicoClaw | #3269 MCP 连接失败后 agent 假死、静默停止回复 |
| hermes-agent | #27178 `finish_reason=stop` 被上报为 `protocol_violation` |
| AstrBot | #9527 用户直言“错误信息非得是滚木吗？”，DEBUG 日志形同虚设 |

**共性结论**：用户对“系统没反应”的容忍度已接近零——要么成功，要么明确报错并允许重试。

### 4.2 消息通道投递可靠性（OpenClaw、Zeroclaw、QwenPaw、hermes-agent）

- OpenClaw：Twilio 重试与投递状态跟踪（区分“运营商已接受”与“最终已送达”）
- QwenPaw：微信 context_token 失效静默失败、飞书长命令阻塞 1.5 小时
- Zeroclaw：WhatsApp webhook fail-closed、 approval token 泄漏
- hermes-agent：Matrix 认证误判修复、媒体投递跨 profile 凭据泄露

### 4.3 资源边界与生命周期管理（OpenClaw、Zeroclaw、QwenPaw、PicoClaw）

- OpenClaw：#116201 实时语音状态无界增长；#89315 gateway 堆 OOM
- QwenPaw：#6608 长命令无总超时、残留孤儿进程；#6647 WebView2 崩溃黑屏
- Zeroclaw：#7527 macOS 窗口消失；#9697 Windows 计划任务 daemon 连接超时
- PicoClaw：#3269 MCP 挂起无超时退出

### 4.4 安全边界与默认安全（OpenClaw、Zeroclaw、hermes-agent、AstrBot）

- OpenClaw：外部内容统一消毒器，防恶意网络内容注入模型上下文
- Zeroclaw：#9569 webhook 未配置 secret 时 fail-open；#9397 空 allowed_groups 默认放行所有群组
- hermes-agent：#70144 媒体投递跨 profile 凭据泄露
- AstrBot：#9525 备份下载鉴权方式不一致

### 4.5 记忆与数据管理（OpenClaw、QwenPaw、PicoClaw、AstrBot）

- OpenClaw：#7707 记忆按来源做信任分级（防投毒）；#40001 write 工具无 append 覆盖共享文件
- QwenPaw：#6537 Skill tags 重启后消失；#6643 产出物按任务分目录
- PicoClaw：#3301 路由代理会话记忆/自动压缩失效
- AstrBot：#9529 知识库 `kb_names` 存 UUID 导致静默失效

### 4.6 模型故障转移与成本优化（OpenClaw、QwenPaw、hermes-agent）

- 模型自动回退：OpenClaw #47910（按失败类别隔离）、QwenPaw #2199/#6659（新 PR 竞争）、hermes-agent OAuth 稳定性
- Token 成本：hermes-agent #6839（Lazy Tool Schema Loading，31 评论/18👍）、QwenPaw #6649（GPT-5.6 prompt caching）、OpenClaw #42475（per-agent 成本预算）


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 |
|------|---------|---------|---------|
| **OpenClaw** | 全渠道统一网关 + 记忆/任务双系统，功能最全 | 从家庭自动化到企业 AI 工作流，覆盖面最广 | 大型 TypeScript/Node.js 单体+模块化，CLI/网关/控制面 |
| **hermes-agent** | 消息传递、通知与跨平台连接（v0.20.0 “Herald” 即“神的信使”） | 消息平台重度用户、Telegram/Slack/Matrix 多端协同 | 大规模插件化架构，650+ 贡献者，生态扩张期 |
| **Zeroclaw** | Goal mode 持久化目标执行、SOP 能力、架构标准化 | Rust 生态偏好者、需要无人值守任务执行的开发者 | **Rust 实现**，独树一帜；RFC 驱动架构演进 |
| **QwenPaw** | 桌面端体验 + 中文渠道深度适配（微信/飞书/Feishu） | agentscope 生态用户、桌面 Agent 重度使用者 | Python/agentscope 深度绑定，桌面优先 |
| **PicoClaw** | 轻量级、嵌入式/边缘场景、路由代理与配置系统 | sipeed 硬件生态用户、轻量部署场景 | 轻量实现，聚焦配置组合语义一致性 |
| **AstrBot** | 插件生态、中文 IM 渠道（QQ/微信/Telegram）、知识库 | 中文社区个人开发者、bot 托管需求 | Python + 插件市场，Issue→Fix 闭环速度最快 |

**架构分水岭**：Rust（Zeroclaw） vs TypeScript（OpenClaw/部分） vs Python（QwenPaw/AstrBot）三大技术阵营并存；OpenClaw 与 hermes-agent 在上层功能重叠度最高，但 OpenClaw 偏“全家桶式”统一网关，hermes-agent 偏“生态聚合式”插件平台。


## 6. 社区热度与成熟度

### 活跃度分层

| 层级 | 项目 | 单日更新量 | 阶段判断 |
|------|------|-----------|---------|
| **S 级（极高活跃）** | OpenClaw、hermes-agent | 1000（Issue+PR 合计） | 头部标杆，海量反馈驱动 |
| **A 级（高活跃）** | Zeroclaw、QwenPaw | 72–100 | 架构演进/版本冲刺期 |
| **B 级（中等活跃）** | PicoClaw、AstrBot | 16–18 | 维护节奏健康，体量较小 |

### 阶段划分

- **快速迭代期**：**hermes-agent**（v0.20.0 刚发布，650+ 贡献者涌入）、**Zeroclaw**（v0.9.0 冲刺，高吞吐修复+架构规划）
- **质量巩固期**：**OpenClaw**（明确“加固期”，SMS 可靠性/安全消毒/可观测性合入）、**QwenPaw**（2.1.0-beta.1 后密集修复，合并率 48%）、**PicoClaw**（批量清理 stale，转向健康维护）
- **稳定响应期**：**AstrBot**（4 个 Bug 均形成 Issue→PR 闭环，无重大积压）

### 成熟度信号

- **最健康**：AstrBot（闭环率高、积压少）与 PicoClaw（清理完成后轻装上阵）
- **最需关注**：OpenClaw 的 P1 积压数（9 条无 fix PR）与其 S 级活跃度形成反差；hermes-agent 的 PR 合并率仅 7.2%，评审吞吐可能成为瓶颈


## 7. 值得关注的趋势信号

### 信号一：“静默失败”已成为生态信任头号杀手

六个项目同时出现“系统报成功但实际未送达”或“无任何提示地停止响应”类问题。参考价值：**所有 AI Agent 产品应将“可解释的失败”列为 P0 级需求**——包括错误分类、根因提示、重试机制三层能力。

### 信号二：安全默认值（Secure by Default）正在成为行业共识

Zeroclaw 的 webhook fail-closed 与空列表 permit-none 诉求、OpenClaw 的内容消毒器、hermes-agent 的凭据隔离修复，指向同一方向：**默认拒绝，显式放行**。AI Agent 因具有工具执行能力，其默认安全基线应高于传统 Web 应用。

### 信号三：Token 成本优化从“优化建议”升级为“硬需求”

hermes-agent 的 #6839（Lazy Tool Schema Loading，两次调用注入 50+ 工具浪费 3500–5000 token）、QwenPaw 的 #6649（GPT-5.6 prompt caching）以及 OpenClaw 的 per-agent 成本预算，说明 **agent 调用成本已成为规模化部署的核心制约**。两阶段工具注入、prompt caching、schema 瘦身将是下一轮基础设施竞争点。

### 信号四：多智能体编排正在经历从“可用”到“可靠”的阵痛

OpenClaw 的 Subagent 结果静默丢失、Zeroclaw 的 Goal mode v2/v3 连续 RFC（异步子任务监督、预算预留、资源回收）、QwenPaw 的 #6621（用户 50+ 轮对话才发现 Default Agent 不会调用其他 Agent）——**子任务的所有权、生命周期和结果回传机制是当前多智能体框架的共同短板**，也是差异化竞争的下一个主战场。

### 信号五：配置系统组合语义一致性成为隐藏陷阱

PicoClaw 的 dispatch rules+白名单组合失效、AstrBot 的 `kb_names` 字段语义漂移、QwenPaw 的 skill tags 重启丢失、Zeroclaw 的 #9600 契约归属争议（四个工作流同时触碰同一契约无 owner）——**随着功能叠加，配置项在组合场景下的语义一致性正在成为系统性技术债**。建议各项目建立配置状态的显式版本迁移与组合测试机制。

### 信号六：桌面端/客户端体验成为“第一公里”信任工程

QwenPaw 的 WebView2 崩溃黑屏、Zeroclaw 的 macOS 空白窗口、hermes-agent 的 Windows 更新注入 `NODE_ENV=production` 导致卡死——**AI Agent 的客户端稳定性直接影响用户对底层模型能力的信任**。在模型能力趋同的背景下，客户端可靠性将成为差异化竞争的重要维度。

### 信号七：可编程 Agent 的内存治理走向“有界 + 可审计”

OpenClaw 的 bounded memory flush、Zeroclaw 的历史裁剪事件 token 核算、QwenPaw 的 `max_iterations` 服务端强制——**资源边界从软约束变为硬限制**，且需要向用户透明呈现（谁消耗了什么、为何被裁剪），这将是企业级采纳的前提条件。

---

*报告基于各项目 2026-08-04 日报自动生成，数据以 GitHub 公开页面为准。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-04

## 1. 今日速览

过去 24 小时 Zeroclaw 项目保持极高水平活跃度：共发生 100 条 Issue/PR 更新（各 50 条），其中 Issue 侧 46 条活跃/新开、4 条关闭；PR 侧 47 条待合并、3 条合并/关闭。项目当前处于架构密集演进期——一方面 Goal mode 相关 RFC 持续深入（#8303、#8681，今日又新增 v2/v3 两篇 RFC），另一方面渠道安全（WhatsApp/Linq webhook、审批人鉴权）与 CI/开发者体验（rustdoc 门禁、Semgrep 反馈、Containerfile 校验）并行推进。今日无新版本发布，但大量修复 PR 集中在 8 月 3 日提交，推测正在为 v0.9.0 里程碑（见 tracker #7432）做最后冲刺准备。

---

## 3. 项目进展

### 已关闭/合并事项（里程碑信号）

- **#1 — XOR 加密缺陷关闭**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/1)）  
  创建于 2 月 14 日、标注 CRITICAL 的存储密钥 XOR 加密问题在今日关闭，意味着项目早期安全债务得到最终解决。该 Issue 存活近 6 个月，是项目安全演进路径上的一个标志性节点。
- **#9417 — WhatsApp Cloud approval token 泄漏关闭**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9417)）  
  7 月 26 日报告的 P1 安全 bug（发送失败/取消时泄漏 live approval token）在一周内关闭，安全响应节奏良好。
- **#9093 — ZeroCode 版本显示功能关闭**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9093)）  
  TUI 顶栏显示运行版本的功能已完成，改善多版本/升级后的用户辨识体验。
- **#8536 — 硬件超时错误处理修复关闭**（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/8536)）  
  硬件 crate 中三处 `tokio::time::timeout` 不再吞掉内部 `Elapsed` 错误，日志可观测性提升。
- **#6002 — Telegram 消息未被明确处理关闭**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6002)）  
  该 S1 工作流阻塞问题已关闭，但摘要未显示具体修复方式，建议后续关注回归验证。

### 今日新提交的 PR（方向梳理）

| PR | 方向 | 要点 |
|---|---|---|
| [#9704](https://github.com/zeroclaw-labs/zeroclaw/pull/9704) | CLI 修复 | `cron add` 帮助中三个示例全部不可运行（#9672），修正 `--agent` 必填参数等解析问题 |
| [#9705](https://github.com/zeroclaw-labs/zeroclaw/pull/9705) | 配置修复 | 允许 `config set` 操作已加载的带连字符 cron 别名 |
| [#9707](https://github.com/zeroclaw-labs/zeroclaw/pull/9707) | 配置迁移 | 裸 `vision_model_provider` 迁移为点分别名引用，修复 V3 alias 解析 |
| [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) | 运行时可观测性 | 历史裁剪事件暴露 token 核算数据，解决大段裁剪被误读为 token 超限的问题（#9619） |
| [#9709](https://github.com/zeroclaw-labs/zeroclaw/pull/9709) | TTS 清理 | 覆盖 Edge TTS 所有错误路径的临时文件清理 |
| [#9715](https://github.com/zeroclaw-labs/zeroclaw/pull/9715) | 数据迁移 | JSONL session 迁移在共享锁+导入约束下实现重试安全（stacked on #9689） |

### 整体判断

24 小时内关闭 3 个 PR、4 个 Issue，同时新增至少 6 个修复性 PR，项目处于“高吞吐修复 + 架构规划并行”的快车道上。除上述今日 PR 外，还有多个 P0/P1 安全修复处于待合并状态（见第 5 节），一旦合入将对项目安全基线产生实质提升。

---

## 4. 社区热点

### 讨论热度排行

| 排名 | Issue/PR | 评论数 | 主题 |
|---|---|---|---|
| 1 | [#8303 Goal mode v1 RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) | 11 | 跨多轮对话的持久化用户目标执行 |
| 2 | [#8681 Goal mode 实现拆分 tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/8681) | 10 | 将已实现代码拆分为可评审 PR |
| 3 | [#9488 统一附件架构 RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | 8 | Web 聊天与各渠道附件能力统一 |
| 4 | [#6157 Nextcloud Talk 错误 API](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) | 8 | bot 消息 API 不匹配导致回复失败 |
| 5 | [#6002 Telegram 消息未被处理](https://github.com/zeroclaw-labs/zeroclaw/issues/6002) | 7 | 容器内 llama.cpp 场景消息无响应 |
| 6 | [#8424 工作区内禁止路径模式 RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/8424) | 7 | `.zeroclawignore` 保护敏感文件 |
| 7 | [#8396 线协议一等公民 RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/8396) | 6 | provider 接入方式重构 |

### 背后诉求分析

- **Goal mode 是社区当前绝对主线。** #8303 与 #8681 合计 21 条评论，且今日 @vrurg 连续提交 v2（#9702，持久续接 + Web 控制）与 v3（#9703，异步子任务监督）RFC，说明用户对“让 agent 在无人值守时持续推进有界目标”有强烈诉求，社区已就实现边界、拆解策略形成一套完整的演进路径。
- **渠道安全与权限边界是第二热点。** #9488（附件架构）、#6157（Nextcloud Talk）、#8424（路径防护）、#8396（协议抽象）共同指向：随着渠道和 provider 数量增加，社区希望将安全边界、配置一致性和协议抽象提升到架构层面统一治理。

---

## 5. Bug 与稳定性

按严重程度/优先级排序，标注修复状态：

### 安全类

- **[P0] #9569 — WhatsApp Cloud/Linq webhook 验证不通过时未 fail closed**（[PR](https://github.com/zeroclaw-labs/zeroclaw/pull/9569)）  
  `process_whatsapp_message` 与 `process_linq_webhook` 在未配置 secret 时跳过整个验证块，恶意请求可绕过签名验证。修复 PR 已提交，等待合并。
- **[P1] #9417 — WhatsApp Cloud approval token 泄漏**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9417)）  
  **已关闭**，修复完成。
- **[P1] #9397 — WhatsApp Web 空 allowed_groups 应视为 permit-none**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9397)）  
  当前空列表默认放行所有群组，RFC 已接受且 in-progress，建议在下一版本收紧为默认拒绝。

### 功能阻断类

- **[S1] #7527 — macOS 桌面应用空白窗口/窗口消失**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/7527)）  
  用户安装后无法检测权限、显示空白页，重启后窗口消失。自 6 月 12 日起挂起，标注 `needs-repro` 等待用户补充信息，仍无修复 PR。
- **[S1] #9672 — `cron add` 帮助中三个示例全部无法运行**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9672)）  
  **已有修复 PR #9704**，另修复空状态提示中第四个错误格式。
- **[S3] #9697 — ZeroCode 无法连接 Windows 任务计划程序启动的 daemon**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9697)）  
  与 #9117 同源，daemon 未在超时内就绪。Windows 自动部署场景受阻，暂无 PR。

### 功能缺陷类

- **#6157 — Nextcloud Talk 使用错误 bot 消息 API**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6157)）  
  由于 API 端点/认证方式不匹配导致消息发送失败，状态 `blocked`，4 月起未解决。自托管用户受影响。
- **#6002 — Telegram 消息未被明确处理**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6002)）  
  **已关闭**，建议后续验证容器 + llama.cpp 场景是否真正修复。

### 趋势判断

安全类修复的提交速度（P0/P1 均在数日内有 PR）显示项目安全响应机制运转良好；而 macOS 桌面问题（#7527）和 Nextcloud Talk（#6157）属于长期挂起项，这类跨平台/第三方集成问题正在成为稳定性短板。

---

## 6. 功能请求与路线图信号

### 新 RFC（架构演进方向）

- **#9703 — Goal mode v3：异步子任务监督**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9703)）  
  在 v1（串行）和 v2（续接+Web 控制）基础上提出并发子任务的持久化所有权、预算预留、资源回收机制。
- **#9702 — Goal mode v2：持久续接 + Web 控制**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9702)）  
  解决重启/中断后的恢复问题，引入可信浏览器控制面。
- **#9488 — 统一附件架构**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)）  
  将 Web 聊天和所有渠道的附件上传/下载统一到一套架构，Proposed 状态，8 条评论说明关注度较高。

### 企业级功能 PR（外部贡献者活跃）

| PR | 功能 | 成熟度 |
|---|---|---|
| [#9555](https://github.com/zeroclaw-labs/zeroclaw/pull/9555) | ICT 企业消息平台渠道适配器（HMAC 鉴权、流式响应、心跳） | 有单元测试，XL 规模 |
| [#9556](https://github.com/zeroclaw-labs/zeroclaw/pull/9556) | Langfuse 可观测性后端（OTel 导出） | feature flag 开关 |
| [#9554](https://github.com/zeroclaw-labs/zeroclaw/pull/9554) | DAG 计划执行工具（顺序/并行任务编排） | 含模板变量机制 |
| [#9561](https://github.com/zeroclaw-labs/zeroclaw/pull/9561) | 从人格渲染中移除文件名标签，节省 token | 小规模精简 |
| [#9548](https://github.com/zeroclaw-labs/zeroclaw/pull/9548) | Codex CLI extra_args 风险参数警告 | 非阻断式提示 |

### 可能进入 v0.9.0 的信号

- **v0.9.0 tracker #7432**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)）今日仍在更新，auth/安全/gateway/breaking-change 是版本主题。
- **SOP 能力 5/5 里程碑 tracker #8288**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8288)）持续推进，SOP pane MVP task #9682 已 rescope 为“状态可见性优先”，配套 defer 了 Run/Resume 控件（#9686、#9693）。
- **CI 改进系列**：#9545（rustdoc 警告门禁，accepted）、#9511（Semgrep diff-aware 评论，blocked）、#9456（Containerfile 校验）、#7108（缓存与关键路径优化）——若合入将显著提升贡献者体验。

---

## 7. 用户反馈摘要

### CLI/文档实际体验

- **#9672**（[@ZiBibro](https://github.com/zeroclaw-labs/zeroclaw/issues/9672)）：`zeroclaw cron add --help` 给出的三个示例逐个执行全部失败，“operator following any of them gets an error rather than a job”——帮助文档与实现脱节，是最直接的信任伤害。已有修复 PR #9704。

### 桌面端体验

- **#7527**（[@swellee](https://github.com/zeroclaw-labs/zeroclaw/issues/7527)）：macOS 上安装后权限检测失败、界面空白、重启后窗口消失，属于 S1 级阻断，且因缺少复现信息长期未推进。

### Windows 部署集成

- **#9697**（[@klonuo](https://github.com/zeroclaw-labs/zeroclaw/issues/9697)）：Windows 任务计划程序拉起 daemon 后 ZeroCode 无法连接，持续超过一个版本周期，自动化运维场景受阻。

### 渠道/Provider 使用场景

- **#6157**（[@rhinterndorfer](https://github.com/zeroclaw-labs/zeroclaw/issues/6157)）：Nextcloud Talk 回复失败，自托管协作场景不可用。
- **#7759**（[@NiuBlibing](https://github.com/zeroclaw-labs/zeroclaw/issues/7759)）：WebSocket 断开会取消正在执行的 agent turn，真实用户断线重连后任务丢失，反馈要求将传输通道与执行生命周期解耦。

### 安全默认值诉求

- **#9397**（[@belumume](https://github.com/zeroclaw-labs/zeroclaw/issues/9397)）：WhatsApp Web `allowed_groups` 默认空列表=放行所有群组，用户期待默认安全（permit-none）而非默认开放。

---

## 8. 待处理积压

### 长期未解决的高影响 Issue

| Issue | 创建时间 | 状态 | 说明 |
|---|---|---|---|
| [#6157 Nextcloud Talk 错误 API](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) | 2026-04-27 | `blocked` | 渠道不可用，自托管用户受影响，已 accepted 但需维护者决策 API 兼容方案 |
| [#7527 macOS 空白/无窗口](https://github.com/zeroclaw-labs/zeroclaw/issues/7527) | 2026-06-12 | `needs-repro` | S1 阻断级但缺少复现信息，建议维护者主动联系用户补充环境细节 |
| [#6002 Telegram 未响应](https://github.com/zeroclaw-labs/zeroclaw/issues/6002) | 2026-04-22 | 今日关闭 | 需回归验证（容器 + 本地 llama.cpp）确认真实修复 |

### 等待作者行动的 PR（协作瓶颈）

| PR | 提交时间 | 优先级 | 内容 |
|---|---|---|---|
| [#8781](https://github.com/zeroclaw-labs/zeroclaw/pull/8781) | 2026-07-06 | security | 移除 24 条失效 advisory ignore，改善依赖审计可信度 |
| [#9536](https://github.com/zeroclaw-labs/zeroclaw/pull/9536) | 2026-07-29 | p1 | ACP 会话默认工作目录改为 agent 目录而非 daemon CWD，杜绝 shell 工具越权 |
| [#9527](https://github.com/zeroclaw-labs/zeroclaw/pull/9527) | 2026-07-29 | p2 | 工具链/MSRV/镜像/Docs 升至 Rust 1.97.1（26 处 pin 对齐） |
| [#9548](https://github.com/zeroclaw-labs/zeroclaw/pull/9548) | 2026-07-29 | p2 | Codex CLI 危险 extra_args 警告 |
| [#9555](https://github.com/zeroclaw-labs/zeroclaw/pull/9555) | 2026-07-30 | p2 | ICT 渠道适配器（XL） |
| [#9556](https://github.com/zeroclaw-labs/zeroclaw/pull/9556) | 2026-07-30 | p2 | Langfuse 观测后端 |
| [#9554](https://github.com/zeroclaw-labs/zeroclaw/pull/9554) | 2026-07-30 | p2 | DAG 计划执行工具 |
| [#9574](https://github.com/zeroclaw-labs/zeroclaw/pull/9574) | 2026-07-31 | p1 | 渠道审批人鉴权（Telegram/Slack/Lark/Matrix） |

> ⚠️ 上述 PR 均标记 `needs-author-action`，说明作者尚未响应评审意见。其中 #9536（p1 安全）、#8781（安全依赖）、#9574（p1 审批鉴权）若长期滞留，将拖慢 v0.9.0 安全加固的整体节奏。建议维护者在社区中明确催促机制或考虑代为跟进。

### 值得关注的协调性风险

- **#9600 — Session-persistence 契约归属 tracker**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9600)）：四个独立工作流同时触碰同一契约（分别涉及 ACP、迁移、运行时、渠道），目前尚无指定 owner，存在合并冲突和语义漂移风险，建议优先明确契约负责人。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 开源项目动态日报 — 2026-08-04

> 数据窗口：2026-08-03 至 2026-08-04 | 数据源：github.com/sipeed/picoclaw

---

## 1. 今日速览

过去 24 小时 PicoClaw 保持中等活跃度：8 条 Issue 更新（3 条开放、5 条关闭），8 条 PR 更新（3 条待合并、5 条已合并/关闭），无新版本发布。开发主线集中在贡献者 @j-v 提交的路由代理上下文管理修复（#3301/#3316）与 shell 命令白名单修复（#3313/#3314），属于配置系统在组合场景下的实质性缺陷修补。WebUI 日语本地化（#3273）随对应 Issue 一并关闭，国际化路线图再落一子。项目批量清理了 5 条历史 stale Issue/PR，维护节奏趋于健康；但两条高影响 Bug（#3269 MCP 挂起、#3281 WebUI 卡顿）仍处滞留状态，是当前健康度的主要减分项。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日 5 个 PR 进入已合并/关闭状态，其中 3 个为功能性变更：

- **PR #3273 — WebUI 日语本地化**（@honbou，已关闭）：新增 `web/frontend/src/i18n/locales/ja.json` 完整日语翻译（968 行），注册 `ja` 资源与 dayjs 日语语言包，解决 Issue #3272。WebUI 多语言支持由此前仅英语扩展至日英双语。
  https://github.com/sipeed/picoclaw/pull/3273

- **PR #3267 — 修复 antigravity token 刷新 scope 错误**（@sarff，已关闭）：解决 antigravity 主认证成功但刷新令牌时因 scope 传递错误导致的 `PERMISSION_DENIED: insufficient authentication scope` 问题，提升第三方模型提供商的接入稳定性。
  https://github.com/sipeed/picoclaw/pull/3267

- **PR #3202 — 路由 ID 归一化去除首尾下划线**（@Osamaali313，已关闭）：修复 `NormalizeAgentID` / `NormalizeAccountID` 输出未满足 `^[a-z0-9][a-z0-9_-]{0,63}$` 规范的问题，确保生成的 ID 以字母数字开头，降低路由匹配异常概率。
  https://github.com/sipeed/picoclaw/pull/3202

其余两项为过程性关闭：**PR #3310**（@j-v，自动化工具 "picoclanker" 生成的 PR）与 **PR #3313**（@j-v，与 #3314 内容重复，关闭原因待确认）。

---

## 4. 社区热点

- **Issue #3281 — WebUI 长历史输入卡顿**（3 条评论 / 1 👍，最活跃）：用户 @xpader 反馈单会话聊天历史积累后，输入框延迟明显。该问题已存在两周且被标记 stale，但仍是当前社区讨论度最高的话题，反映 Web UI 长上下文渲染是用户日常使用的高频痛点。
  https://github.com/sipeed/picoclaw/issues/3281

- **Issue #3269 — MCP 连接失败导致 agent 挂起**（2 条评论 / 1 👍）：@ruiyigen 报告 MCP server 连接失败后 agent 循环阻塞、聊天界面静默停止回复。高影响可靠性问题，讨论热度与严重度匹配，但至今无对应修复 PR。
  https://github.com/sipeed/picoclaw/issues/3269

- **PR #3316 — 路由代理上下文管理修复**（新开放）：@j-v 针对 #3301 提交的修复，直指 dispatch rules 路由场景下历史记忆、自动压缩、seahorse bootstrap 全部失效的根因，构成当前开发主线。
  https://github.com/sipeed/picoclaw/pull/3316

---

## 5. Bug 与稳定性

按严重程度排列：

**高严重度**
- **#3269 [OPEN][stale] MCP 连接失败导致 agent 循环挂起**：连接失败后 agent 进入死等状态，聊天界面停止回复，影响核心可用性。暂无修复 PR，且已被 stale bot 标记，需优先干预。
  https://github.com/sipeed/picoclaw/issues/3269

**中严重度**
- **#3301 [OPEN] 路由代理会话中 /clear 与自动压缩失效**：经 dispatch rules 路由到非默认 agent 的聊天中，历史记忆、自动压缩均不生效，会话体验与默认会话严重不一致。已有修复 PR #3316（待合并）。
  https://github.com/sipeed/picoclaw/issues/3301

- **#3314 [OPEN] customAllowPatterns 白名单被默认 deny 规则覆盖**：默认拒绝模式始终优先于用户自定义放行规则，导致 `git push` 等已加入白名单的命令被误拦截。修复 PR 已提交（同内容 #3313 被关闭，需确认去重策略）。
  https://github.com/sipeed/picoclaw/pull/3314

**低严重度**
- **#3281 [OPEN][stale] WebUI 长历史输入卡顿**：单会话历史较多时输入延迟明显，前端性能问题，暂无修复迹象。
  https://github.com/sipeed/picoclaw/issues/3281

**今日已关闭的 Bug**
- **#3265 Gateway 启动报 deltachat unknown type**：config.json 未配置 deltachat 时仍报错，配置解析缺陷，已关闭。
  https://github.com/sipeed/picoclaw/issues/3265
- **#3268 exec 工具 action 参数应默认 "run"**：LLM 调用 exec 时常省略 action 导致失败，已关闭。
  https://github.com/sipeed/picoclaw/issues/3268
- **#3264 SplitMessage 处理超大 fenced-code info string 时死循环**：代码块围栏信息跨切片边界时无限循环，已关闭。
  https://github.com/sipeed/picoclaw/issues/3264

---

## 6. 功能请求与路线图信号

- **Telegram 私有机器人聊天支持 topic（PR #3315，待合并）**：@genuss 修复了仅在 `Chat.IsForum` 为 true 时识别话题的局限，补充私有机器人聊天中 `IsTopicMessage` 的场景。对使用 forum 模式的 Telegram 用户是直接体验补强，可能随下一版本合入。
  https://github.com/sipeed/picoclaw/pull/3315

- **日语本地化（#3272 → PR #3273）**：已落地。官方文档早有日文翻译，UI 语言包补齐后国际化覆盖面扩大，预计后续会收到其他语种的类似贡献。
  https://github.com/sipeed/picoclaw/issues/3272

- **Launcher 支持外部托管 gateway 的 systemd 集成（#3276，已关闭）**：@honbou 提出无头服务器（Ubuntu VM）场景下，launcher 的 Start/Stop Gateway 按钮与 systemd 服务生命周期管理存在冲突。该 Issue 已关闭，但反映出用户对服务化/自托管部署模式的明确需求，是未来运维能力建设的信号。
  https://github.com/sipeed/picoclaw/issues/3276

---

## 7. 用户反馈摘要

- **长会话卡顿是 WebUI 第一体验痛点**（#3281）：@xpader 的复现路径很简单——单会话历史增多后输入框延迟明显。这是典型的前端渲染效率问题，直接影响重度用户的日活留存，社区评论互动印证了普遍性。
  https://github.com/sipeed/picoclaw/issues/3281

- **MCP 故障造成"假死"式静默失败**（#3269）：@ruiyigen 在 Qwen3 + nightly 版本下反馈：MCP 连接失败后界面无任何提示地停止响应，用户无法区分是网络问题还是系统崩溃。可靠性 + 可观测性的双重缺口。
  https://github.com/sipeed/picoclaw/issues/3269

- **LLM 工具调用的容错期望**（#3268，已关闭）：@MrTreasure 指出"AI agent 调用 exec 时几乎总是省略 `action: "run"`"——反映了主流 LLM 在工具调用中的真实行为模式，诉求是参数默认值而非强制必填，对工具 Schema 设计有参考价值。
  https://github.com/sipeed/picoclaw/issues/3268

- **@j-v 的组合场景深度反馈**（#3301/#3314）：用户尝试用 dispatch rules 将 agent 路由到特定 Discord 频道后发现"什么都不记得"、自动压缩永不触发；又发现 `customAllowPatterns` 配置被默认 deny 规则覆盖。两项反馈共同指向：配置系统在组合使用场景下的语义一致性仍需加强。

---

## 8. 待处理积压

- **#3269 [OPEN][stale] MCP 连接失败导致 agent 挂起**（自 07-20 起）：高严重度可靠性问题，长期无修复 PR，建议维护者解除 stale 标记并评估 P0 修复。
  https://github.com/sipeed/picoclaw/issues/3269

- **#3281 [OPEN][stale] WebUI 长历史输入卡顿**（自 07-21 起）：前端性能问题持续两周无进展，社区讨论热度最高，建议纳入 UI 优化排期。
  https://github.com/sipeed/picoclaw/issues/3281

- **三个 08-03 新提交的 PR 待 review 合并**：
  - **PR #3316**（路由代理上下文修复）——直接对应已确认 Bug #3301，建议优先审查；
  - **PR #3314**（customAllowPatterns 修复）——功能缺陷修复，但与已关闭的 #3313 内容重复，需先确认关闭原因，避免修复丢失；
  - **PR #3315**（Telegram 私有聊天 topic 支持）——渠道功能增强，风险面较小，可快速合入。
  - https://github.com/sipeed/picoclaw/pull/3316
  - https://github.com/sipeed/picoclaw/pull/3314
  - https://github.com/sipeed/picoclaw/pull/3315

---

**项目健康度评估**：中等偏活跃。开发效率（PR 合并速度）与社区贡献（多语言、渠道适配）表现良好，但两个开放性高影响 Bug 的滞留时间（2 周+）与 stale 标记状态值得警惕。建议下一步优先处理 #3269 与 #3281，并尽快完成对 #3316/#3314 两个修复 PR 的审查合并。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目日报 (2026-08-04)

## 1. 今日速览

过去24小时 QwenPaw 项目保持高活跃度：共产生 72 条 Issue/PR 更新活动，其中 PR 更新达 50 条（待合并 26 条，已合并/关闭 24 条），Issues 更新 22 条（新开/活跃 16 条，已关闭 6 条）。项目于今日发布 v2.1.0-beta.1 预发布版本，重点修复了聊天通道身份泄漏和收件箱审批视觉反馈问题。值得关注的是，稳定性类 Issue 占比依然较高（核心 Bug 约 10+ 项），涉及 shell 命令阻塞、渠道消息静默失败、UI 冻结/黑屏等问题，但各 Bug 均有对应的 fix PR 在推进中。此外，围绕 `spawn_subagent` 空参数处理、ACP 通知竞争条件、CI 证据提取等修复已有 PR 被开出，说明维护者对社区反馈响应迅速。整体来看，项目处于高频迭代期，版本推进节奏快，2.1.0 修复线已启动，但稳定性债务仍需持续消化。

---

## 2. 版本发布

### v2.1.0-beta.1 (预发布)

**发布时间**: 2026-08-03/04

**主要更新内容：**
- `fix(chat)`: 修复新聊天中残留旧频道身份（channel identity）泄漏的问题（PR #6382）
- `feat(inbox)`: 有新审批到达时收件箱侧边栏增加摆动动画，徽章点支持颜色区分（PR #6382 同批）

**破坏性变更**: 暂无已知破坏性变更（Beta 版本，API 稳定性以正式版说明为准）

**迁移注意事项**: 该版本为 2.1.0 的首个 Beta，建议用户在进行生产环境升级前先在测试环境验证。特别是涉及到聊天身份隔离的修复，多通道（Feishu、微信、Console 等）并行使用的用户建议重点回归测试会话隔离与消息路由行为。安装验证相关跟踪见 Issue #6656（Release Duty）。

🔗 https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.1

---

## 3. 项目进展

今日合并/关闭了 24 条 PR，部分重要进展如下：

- **Windows 稳定性修复落地**: PR #6203 修复了 `command_runner.py` 中 `_is_pid_running()` 调用 Windows `tasklist` 探测时缺少超时限制和窗口隐藏的问题，避免子进程探测可能引发的挂起和闪窗。🔗 https://github.com/agentscope-ai/QwenPaw/pull/6203
- **桌面版脚本执行环境修复**: PR #6579 已合并，使桌面版执行生成的 Python 脚本时使用内置 Python 而非系统全局解释器，直接回应 Issue #6160 的社区诉求。🔗 https://github.com/agentscope-ai/QwenPaw/pull/6579
- **CI 可靠性与护栏修复（3 项合并）**:
  - PR #6653 修复 real-behavior-proof 门禁错误地完全剔除围栏代码块（如纯终端转录）的问题（fixes #6626）。🔗 https://github.com/agentscope-ai/QwenPaw/pull/6653
  - PR #6654 将 Playwright 版本上限控制在 1.62 以下，解决 macOS 桌面验证步骤超时问题。🔗 https://github.com/agentscope-ai/QwenPaw/pull/6654
  - PR #6646 修复 fork PR 在 `pull_request_target` 事件中 body 被剥离导致 real-behavior-proof 检查失败的问题（fixes #6563）。🔗 https://github.com/agentscope-ai/QwenPaw/pull/6646
- **开放中的关键功能 PR**: PR #6650 提出了 Skill API 列表/详情分离的负载优化方案（回应慢网络下 Skills 页面加载失败的 Bug）；PR #6651 为 Files 页面补齐文件/文件夹管理 REST API；PR #6652 在 MissionGate 中服务端强制执行 `max_iterations` 限制，修补控制器无限派发子会话的漏洞。

整体来看，项目今日在 CI 工程化、桌面端体验、安全护栏三个方向有明显推进。2.1.0 的 Bug 修复线已全面铺开，但核心功能 PR（如模型回退 #2199、provider 统一 #6302）仍处于打开状态，尚需关注。

---

## 4. 社区热点

- **Issue #6537: Skill tags 重启后消失（11 条评论）** — 已关闭但仍为今日评论最热 Issue，回归 #3270 的修复。用户确认数据已正确写入 `skill_pool/skill.json`，但启动时 manifest 协调阶段丢失数据。这是一个涉及数据持久化的回归性 Bug，对 skill 生态影响较大。🔗 https://github.com/agentscope-ai/QwenPaw/issues/6537

- **Issue #6649: 支持 GPT-5.6 prompt caching 参数（8 条评论）** — 社区对前沿模型能力接入的呼声高，希望 `prompt_cache_key`、`prompt_cache_options`、`prompt_cache_breakpoint` 参数得到支持以降低 Agent 多轮对话的延迟与成本。🔗 https://github.com/agentscope-ai/QwenPaw/issues/6649

- **Issue #6588: `spawn_subagent` 空 batch 占位符被误判为批处理模式（6 条评论）** — 该问题由模型端空占位符触发，影响单任务调用，当前已有 2 个修复 PR 被开出（#6595、#6658），社区对修复方向存在多个方案讨论。🔗 https://github.com/agentscope-ai/QwenPaw/issues/6588

- **PR #2199: 模型自动回退与冷却机制（长期热点）** — 虽然该 PR 并非今日新开，但今日有新 PR #6659 同样提交了模型 fallback 功能（Fixes #2199/#1327/#2089），表明这是社区长期高度关注、尚未解决的核心议题。🔗 https://github.com/agentscope-ai/QwenPaw/pull/2199

**热点背后诉求分析**：热度集中在（1）数据持久化可靠性、（2）前沿模型能力及时跟进、（3）Agent 编排中参数健壮性、（4）模型级故障恢复能力。前两者关乎用户日常信任与体验，后两者影响复杂 Agent 场景的可用性，反映出 QwenPaw 用户群中重度 Agent 开发者占比正在提升。

---

## 5. Bug 与稳定性

### 严重级别：高（可能导致数据丢失/服务不可用/资源严重浪费）

| Issue | 问题描述 | 状态 | Fix PR |
|-------|---------|------|---------|
| #6537 | Skill tags 重启后消失（回归 #3270） | 已关闭 | 待确认 |
| #6537 关联 | manifest 协调期间数据残留丢失 | — | — |
| #6614 | 微信 cron 定时推送从未真正送达，任务显示 success 但微信侧 `ret=-2` context_token 失效，已烧约 4400 万 tokens | OPEN | 无 |
| #6614 详情 | 静默失败，用户看到成功但实际未收到 | | |
| #6608 | 长时 shell 命令绕过 `shell_command_timeout`，阻塞飞书会话 1.5 小时；取消后留下孤儿子进程，且无每通道总超时 | OPEN | 无 |
| #6647 | 桌面版 WebView2 浏览器进程崩溃（`STATUS_IN_PAGE_ERROR 0xc0000006`）导致 UI 完全黑屏，无恢复路径 | OPEN | 无 |
| #6612 | QwenPaw 2.0.1 与 agentscope 2.0.4.post1 不兼容：主动消息崩溃（Msg.content 类型）及工具权限死锁 | OPEN | 无 |

### 严重级别：中（功能异常/影响使用体验）

| Issue | 问题描述 | 状态 | Fix PR |
|-------|---------|------|---------|
| #6625 | ACP `delegate_external_agent` 在通知与响应竞态时返回 "completed without text output"，与 #6623 联动 | OPEN | #6623 已开出 |
| #6589 | `execute_shell_command` 大量输出导致 UI 冻结，用户需强杀应用 | CLOSED | 已修复 |
| #6655 | Console 通道不渲染安全审批提示，被拦截命令静默超时 300 秒，用户无感知 | CLOSED（今日关闭） | 待确认 |
| #6635 | 慢网络下 Console 页面加载失败——MB 级 API 响应不压缩且前端固定 30s 超时 | OPEN | #6650 相关优化 |
| #6633 | Skills/Skill Pool 页面慢网络加载失败——`GET /api/skills` 嵌入完整技能内容导致 MB 级负载 | OPEN | #6650 相关优化 |
| #6565 | `execute_shell_command` 多行命令换行折叠为空格破坏语法；Linux PIPE 模式后台进程卡住 | OPEN | 无 |
| #6588 | `spawn_subagent` 空 `batch` 占位符误判为批处理模式 | OPEN | #6595、#6658 |
| #6619 | `ToolCallBlock` 缺少 `extra_content` 字段，agentscope 2.0.4.post1 兼容崩溃 | OPEN | 无 |
| #6624 | Scroll 自动压缩不触发 `summarize_when_compact` 记忆流程，手动 `/compact` 可触发 | OPEN | 无 |
| #6626 | real-behavior-proof CI 门禁剥离纯围栏 Evidence 导致误拒 PR | CLOSED | #6653 已合并 |
| #6547 | Coding Mode 编辑器光标位置错乱、出现浮动输入框 | CLOSED | 已修复 |
| #6160 | 桌面版直接调用系统全局 Python，用户环境不可用时失败 | CLOSED | #6579 已合并 |

**稳定性趋势判断**：今日上报 Bug 数量 16 条（新开/活跃），在 v2.0.1 发布后集中暴露了一批与 agentscope 版本兼容性、长任务资源管理、前端渲染性能相关的问题。好消息是多数 Bug 在报告后 48 小时内即有 fix PR 开出或关闭，响应速度良好；但 #6614（微信静默失败烧 token）和 #6608（长命令阻塞 1.5 小时）属于典型的"静默故障"——系统报告成功/无响应但实际未达预期——此类问题对用户信任损害最大，建议优先排查。

---

## 6. 功能请求与路线图信号

### 高可能性纳入 v2.1.x / v2.2.0

- **模型自动回退与冷却机制**: Issue #2199/#1327/#2089 的用户诉求持续累积，今日新 PR #6659 提交了实现。此功能对生产环境 Agent 服务稳定性至关重要，预计会重点推进。🔗 https://github.com/agentscope-ai/QwenPaw/pull/6659
- **GPT-5.6 prompt caching 参数支持**: Issue #6649 已有 8 条评论和明确需求描述（`prompt_cache_key`、`prompt_cache_options`、`prompt_cache_breakpoint`），契合 Agent 多轮对话降本诉求。🔗 https://github.com/agentscope-ai/QwenPaw/issues/6649
- **Files 页面文件管理 REST API**: PR #6651 已实现删除、重命名/移动、创建目录、上传/下载等 6 个端点，复用 FileGuard 安全模型，预计进入 Console 前端联调阶段。🔗 https://github.com/agentscope-ai/QwenPaw/pull/6651
- **Skill API 列表/详情分离**: PR #6650 通过缩减列表接口返回体（只读 YAML frontmatter）解决慢网络加载问题，对 Console 体验改善直接。🔗 https://github.com/agentscope-ai/QwenPaw/pull/6650

### 社区明确提出但暂无 PR 的需求

- **拖入文件直接读取原路径**（#6642）: 用户希望跳过"上传复制"环节，直接读取本地文件路径，减少 media 目录冗余文件。🔗 https://github.com/agentscope-ai/QwenPaw/issues/6642
- **任务产出物按任务分目录存放**（#6643）: 当前所有产出物堆积在 media 目录，用户要求按任务隔离目录。该需求与 #6642 同源（均由 rerbin 提出），反映了桌面用户对本地文件管理整洁性的诉求。🔗 https://github.com/agentscope-ai/QwenPaw/issues/6643
- **多智能体协作引导增强**（#6621）: 用户反馈 50+ 轮对话才发现 Default Agent 不会自动调用其他 Agent，需在 PROFILE.md 显式配置。建议文档与产品引导层面改进。🔗 https://github.com/agentscope-ai/QwenPaw/issues/6621

### 路线图信号

PR #6302（provider 发现/模型元数据/路由/Agent 控制的统一）虽非今日新开但在持续更新中，与 #6167 关联。该 PR 可能是 2.2.0 的架构级变更，值得关注其对现有配置方式的兼容策略。🔗 https://github.com/agentscope-ai/QwenPaw/pull/6302

---

## 7. 用户反馈摘要

- **"静默失败"让用户失去信任**: Issue #6614 中用户反馈"任务显示 success 但从未真正送达，烧了 4400 万 tokens"——这是典型的可观测性失败，用户无法从系统反馈判断实际状态。微信渠道 cron 推送的 token 失效导致每次推送到失败，但系统未暴露。类似地，#6655 中 Console 通道审批不渲染提示，用户完全不知道有审批在等待，直到 300 秒超时。
- **桌面端用户体验细节问题受关注**: #6589 用户反馈长输出导致界面卡死只能强杀；#6647 用户反馈 WebView2 崩溃后整个 UI 黑屏无恢复手段；#6547 用户反馈 Coding Mode 编辑器光标偏移。桌面客户端的稳定性是用户直接感知的"第一公里"。
- **多智能体协作入门门槛**: #6621 用户表示阅读了官方文档仍未能发现 Default Agent 不会自动调用其他 Agent，50+ 轮对话无效调试。该反馈指出文档与产品引导之间存在差距。
- **对 media 目录混乱的不满**: #6642/#6643 用户认为当前"上传（复制）再读取"模式和完全平铺的产出物目录不符合桌面工具的使用习惯。
- **对 Python 环境处理的感谢与期待**: #6160 虽为 Question，但 PR #6579 已合并解决"系统无 Python 环境时脚本无法执行"的问题，说明桌面版内置 Python 的方向得到社区认可。

---

## 8. 待处理积压

### 长期未响应/未解决的重要 Issue

| Issue/PR | 创建时间 | 说明 | 建议 |
|----------|---------|------|------|
| #2199 (PR) | 2026-03-24 | 模型回退与冷却机制，今日出现新竞争 PR（#6659），说明用户需求迫切 | 建议维护者尽快 review #6659 与 #2199 的差异，确定合入方案 |
| #5930 (PR) | 2026-07-10 | SSE 响应中增加结构化 run 结果用于 API 自动化；API 调用方无法感知对话异常结束 | 等待 review 中，建议纳入 v2.1 或 v2.2 范围 |
| #6302 (PR) | 2026-07-21 | Provider 发现/模型元数据/路由/Agent 控制的统一（关联 #6167） | 大型架构 PR，建议明确目标版本并拆解 review |
| #6614 (Issue) | 2026-07-31 | 微信 cron 推送静默失败，已烧 4400 万 tokens | 严重度极高，建议 48 小时内人工介入 |

### 风险提醒

- #6614 与 #6608 均为"渠道层静默失败/阻塞"类问题，涉及 WeChat/Feishu 两个主流中文渠道，影响面大，但当前都无 fix PR。建议维护者优先关注渠道层超时与错误暴露机制。
- #6612/#6619 为 QwenPaw 2.0.1 与 agentscope 2.0.4.post1 的兼容性问题，涉及主动消息崩溃与工具权限死锁，在依赖升级后集中爆发，建议在文档中明确版本兼容矩阵。

---

**总结**: QwenPaw 项目今日处于 2.1.0-beta.1 发布后的密集修复期，合并/关闭 24 条 PR 展现高效的迭代节奏。但稳定性欠账仍需正视——渠道层静默失败、长命令阻塞、桌面端崩溃恢复等"高风险低可见"问题应获更高优先级。社区对模型 fallback、prompt caching、多智能体协作引导等功能的呼声持续走高，建议在路线图规划中给予明确回应。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-04

**统计区间：** 2026-08-03 至 2026-08-04（过去24小时）
**数据来源：** github.com/NousResearch/hermes-agent

---

## 1. 今日速览

过去24小时项目保持**极高活跃度**：累计 500 条 Issue 更新（466 条新开/活跃、34 条关闭）、500 条 PR 更新（464 条待合并、36 条已合并/关闭），并正式发布 **v0.20.0（The Herald Release）**。自 v0.19.0 以来，项目已完成约 3,650 次提交、合并约 1,400 个 PR、关闭约 1,200 个 Issue，吸引 650+ 贡献者——这是一个规模相当可观的迭代周期。社区讨论焦点集中在 **token 开销优化**、**插件接口扩展**与**消息平台适配**三个方向，项目整体处于功能扩张与生态建设并行的健康状态。

---

## 2. 版本发布

### Hermes Agent v0.20.0（v2026.8.3，代号 “The Herald Release”）

**发布日期：** 2026年8月3日

**自 v0.19.0 以来的累计变更：**

| 指标 | 数值 |
|---|---|
| Commits | ~3,650 |
| Merged PRs | ~1,400 |
| 文件变更 | ~5,200（+559,000 / -405,000 行） |
| Closed Issues | ~1,200 |
| 贡献者 | 650+ |

版本代号 "Herald"（神的信使）暗示该版本重点在于**消息传递、通知与跨平台连接能力**——与近期密集的 Telegram/Slack/Matrix/Discord 适配器修复方向吻合。

⚠️ **注意：** 本数据源未包含完整的破坏性变更列表与迁移指南，建议升级前查阅官方 Release Notes 全文。

---

## 3. 项目进展

过去24小时有 **36 个 PR 被合并/关闭**（具体清单未在日报数据源中单独列出）。今日活跃的关键 PR（均于 8 月 3 日更新）覆盖以下方向：

**生命周期与可靠性加固**
- [#78044](https://github.com/NousResearch/hermes-agent/pull/78044)（@webtecnica）：阻断 `hermes -p <profile> gateway stop/restart` 的 profile-flag 形式自我终止，补齐 gateway 生命周期防护盲区
- [#78041](https://github.com/NousResearch/hermes-agent/pull/78041)：修复 Buzz 适配器 DM 分类逻辑，私聊不再要求 @Agent 提及
- [#78039](https://github.com/NousResearch/hermes-agent/pull/78039)：修复 Matrix 同步循环通过子串匹配 401/403 导致的**永久认证误判**，改为结构化错误检测

**Hook / Webhook 可观测性增强**
- [#78042](https://github.com/NousResearch/hermes-agent/pull/78042)：outbound webhook 负载新增 `session_id`、`session_title`、`host` 等归属字段，便于接收方归因事件
- [#78043](https://github.com/NousResearch/hermes-agent/pull/78043)：新增 `guardrail_block` / `guardrail_halt` 生命周期事件，让工具护栏的拦截行为可被外部系统感知

**新平台与提供商**
- [#78038](https://github.com/NousResearch/hermes-agent/pull/78038)：新增 Infersia 模型提供商 profile（open-weight 模型服务）
- [#78040](https://github.com/NousResearch/hermes-agent/pull/78040)：WhatsApp 适配器支持备用发送者身份（participantAlt/remoteJidAlt/senderPn）授权

这些 PR 显示项目在 **平台兼容性、可观测性和生命周期管理**三个方向上的持续投入。

---

## 4. 社区热点

| Issue | 评论数 | 👍 | 主题 |
|---|---|---|---|
| [#6839](https://github.com/NousResearch/hermes-agent/issues/6839) | 31 | 18 | Lazy Tool Schema Loading — 两阶段工具注入降低 Token 开销 |
| [#64182](https://github.com/NousResearch/hermes-agent/issues/64182) | 17 | 0 | 插件接口扩展 — 社区想法追踪（2026年7月） |
| [#4505](https://github.com/NousResearch/hermes-agent/issues/4505) | 16 | 4 | Ollama 原生 /api/chat 与 OpenAI 兼容端点之争 |
| [#64231](https://github.com/NousResearch/hermes-agent/issues/64231) | 16 | 0 | 插件生命周期事件目录 + Hook 分类验收 |
| [#15311](https://github.com/NousResearch/hermes-agent/issues/15311) | 15 | 10 | 消息平台通用交互按钮/内联键盘支持 |

**背后的诉求分析：**

- **#6839 是当前社区最强烈的效率诉求。** 每次 API 调用注入 50+ 工具的完整 schema，消耗 3,500–5,000 token，对本地模型用户负担尤其重。31 条评论、18 个 👍 说明这是一个"贵且普遍"的痛点。
- **插件接口系列（#64182/#64231/#64178/#64180）** 由 @teknium1 系统性地发起，说明核心团队正在规划插件生态的标准化——包括生命周期事件目录、hook 交付一致性、以及参考 Pi/OpenCode 的架构研究。这是一个明确的**路线图信号**。
- **#4505（Ollama 原生 API）** 代表本地模型用户对真流式 delta 的渴望，目前仍停留在方案讨论阶段。

---

## 5. Bug 与稳定性

按严重程度排列（P1 最紧急）：

**🔴 P1 严重**
- [#67498](https://github.com/NousResearch/hermes-agent/issues/67498)（**已关闭**）：Telegram 网关无限卡在 `Connecting (attempt 1/8)`，即使应用 #63309 的 fallback IP 变通方案仍无法连接；py-spy 显示所有线程空闲而非阻塞。今日关闭，建议确认是已修复还是被标记为重复/无效
- [#65365](https://github.com/NousResearch/hermes-agent/issues/65365)：Anthropic OAuth（Claude Pro/Max）连接下，只要会话暴露 `memory` 或 `session_search` 工具 schema，就确定性触发 HTTP 400 "You're out of extra usage"。带 `needs-decision` 标签，尚未有 fix PR

**🟠 P2 中等等**
- [#76886](https://github.com/NousResearch/hermes-agent/issues/76886)：`read_file` 在 1000 字节采样恰好切断多字节 UTF-8 字符时，将有效文本误判为二进制（**0.19.1 回归**，影响 Obsidian 笔记等场景）
- [#26058](https://github.com/NousResearch/hermes-agent/issues/26058)：Discord 渠道配置了 `free_response_channels` 后 `auto_thread` 被整体禁用，即使显式开启也无效（行为回归）
- [#49920](https://github.com/NousResearch/hermes-agent/issues/49920)：Windows 上 `hermes-setup.exe --update` 后桌面应用卡在 CONNECTING；根因是更新过程注入 `NODE_ENV=production`，导致 dashboard 构建时 npm 跳过 devDependencies
- [#27178](https://github.com/NousResearch/hermes-agent/issues/27178)：Kanban worker 在 Agent 以文本结束回合时（`finish_reason=stop`）上报 `protocol_violation`，无引导、无回退，影响任务调度稳定性
- [#58546](https://github.com/NousResearch/hermes-agent/issues/58546)（**已关闭**）：`resolve_anthropic_token()` 优先使用自动发现的 Claude Code OAuth 凭据，而非显式配置的 `ANTHROPIC_API_KEY`，存在认证边界风险

**🟡 P3 关注**
- [#69314](https://github.com/NousResearch/hermes-agent/issues/69314)：Telegram 网关在健康 HTTP 代理后出现数百个 `CLOSE_WAIT` 套接字，必须完整重启才能恢复——疑似代理连接池管理缺陷

**已有对应 fix PR 的问题：**
- Matrix 永久认证误判 → [#78039](https://github.com/NousResearch/hermes-agent/pull/78039)
- 终端守卫对 ELF 二进制报 `ValueError: embedded null byte`（对应 #77703）→ [#77729](https://github.com/NousResearch/hermes-agent/pull/77729)
- SessionDB 线程池 worker 文件描述符泄漏 → [#76424](https://github.com/NousResearch/hermes-agent/pull/76424)
- `/restart` 后重启完成通知丢失 → [#70859](https://github.com/NousResearch/hermes-agent/pull/70859)
- 媒体投递跨 profile 凭据泄露 → [#70144](https://github.com/NousResearch/hermes-agent/pull/70144)

---

## 6. 功能请求与路线图信号

**呼声最高、最有望进入下个版本：**

1. **Lazy Tool Schema Loading / 两阶段工具注入**（[#6839](https://github.com/NousResearch/hermes-agent/issues/6839)）——社区最热门功能请求（31评论/18👍），方案已相当具体，与项目近期 usage-cost 优化方向高度一致
2. **每会话工作目录**（[#29531](https://github.com/NousResearch/hermes-agent/issues/29531)）——解决 gateway 多并发会话共享进程级 cwd 的隔离问题，对 API 驱动场景很重要
3. **插件接口扩展系列**（[#64182](https://github.com/NousResearch/hermes-agent/issues/64182) 追踪）——配套已提交了 hook 交付一致性（[#64178](https://github.com/NousResearch/hermes-agent/issues/64178)）、生命周期事件目录（[#64231](https://github.com/NousResearch/hermes-agent/issues/64231)）、架构研究（[#64180](https://github.com/NousResearch/hermes-agent/issues/64180)），预计在后续版本中系统性落地
4. **Telegram 新 AI 能力适配**（[#21587](https://github.com/NousResearch/hermes-agent/issues/21587)）——Guest AI Bots、Bot-to-Bot、Stickers 等 11 项新功能，是 Telegram 官方 5 月大更新的直接回应

**已有成熟 PR 的功能（可能进入下一版）：**
- Web Dashboard 模型 Fallback 管理端到端实现（[#55170](https://github.com/NousResearch/hermes-agent/pull/55170)）
- image-gen 后端共享图片源解析器（[#51807](https://github.com/NousResearch/hermes-agent/pull/51807)）
- scam-shield 钓鱼/诈骗扫描技能（[#71529](https://github.com/NousResearch/hermes-agent/pull/71529)）
- MCP 同工具名契约变更检测（[#77123](https://github.com/NousResearch/hermes-agent/pull/77123)）

---

## 7. 用户反馈摘要

以下为从 Issues 评论中提炼的真实用户声音：

- **"每次调用都白付 3,500–5,000 token"**（[#6839](https://github.com/NousResearch/hermes-agent/issues/6839)）：@jarviszomine 指出全量工具 schema 注入对本地模型尤其不友好，是效率层面的核心痛点
- **"Intel Mac 完全不能安装"**（[#42199](https://github.com/NousResearch/hermes-agent/issues/42199)、[#42928](https://github.com/NousResearch/hermes-agent/issues/42928)）：多名用户反馈桌面版仅提供 ARM64 构建，Rosetta 无法反向翻译 Intel→ARM，属于桌面端兼容性缺口（两个 issue 均被标记 duplicate，需合并追踪）
- **"文档写的功能，代码里根本没实现"**：两个独立报告——AGENTS.md 递归行为与代码不符（[#5200](https://github.com/NousResearch/hermes-agent/issues/5200)）、google-workspace skill 文档声称支持 `--services`/`--format` 但 `setup.py` 未实现（[#74128](https://github.com/NousResearch/hermes-agent/issues/74128)）。用户对文档-代码一致性相当敏感
- **"更新后桌面一直转圈"**（[#49920](https://github.com/NousResearch/hermes-agent/issues/49920)）：Windows 用户升级后 dashboard 无法启动，已定位为环境变量注入问题，属于更新链路稳定性问题
- **"TUI 状态栏只能靠 patch 内部实现"**（[#17542](https://github.com/NousResearch/hermes-agent/issues/17542) / [#17543](https://github.com/NousResearch/hermes-agent/issues/17543) 重复）：插件作者呼吁官方状态栏 API，反映社区对稳定扩展点的需求
- **"0.19.1 更新后我的 Obsidian 笔记打不开了"**（[#76886](https://github.com/NousResearch/hermes-agent/issues/76886)）：read_file 回归直接影响真实用户文件读取，反馈语气较为急切

---

## 8. 待处理积压

以下 Issue/PR 创建时间较长且仍为 OPEN，带有 `needs-decision`/`stale` 等需要维护者介入的标签：

**Issue**

- [#4505](https://github.com/NousResearch/hermes-agent/issues/4505)（4/1 创建，P2，needs-decision）：Ollama 原生 API 优化方案已讨论 4 个月，社区有明确需求但方向未定
- [#5200](https://github.com/NousResearch/hermes-agent/issues/5200)（4/5 创建，stale）：AGENTS.md/SOUL.md 文档与实现不一致，已被标记 stale
- [#6839](https://github.com/NousResearch/hermes-agent/issues/6839)（4/9 创建，needs-decision）：社区最高赞功能请求之一（18👍），讨论充分但仍未进入实现阶段
- [#19986](https://github.com/NousResearch/hermes-agent/issues/19986)（5/5 创建，needs-decision）：默认安装最小化与非核心 skill 可选项，悬置近 3 个月
- [#26058](https://github.com/NousResearch/hermes-agent/issues/26058)（5/15 创建，P2）：Discord auto_thread 行为回归影响真实用户，仍无处理结论
- [#17542](https://github.com/NousResearch/hermes-agent/issues/17542) / [#17543](https://github.com/NousResearch/hermes-agent/issues/17543)（4/29 创建，duplicate）：TUI 状态栏插件 API 重复报告，建议合并并评估

**PR**

- [#51807](https://github.com/NousResearch/hermes-agent/pull/51807) / [#51803](https://github.com/NousResearch/hermes-agent/pull/51803)（6/24 创建）：image-gen 共享解析器与 Matrix 回复可见性修复，已挂起超 40 天无评审动态
- [#55170](https://github.com/NousResearch/hermes-agent/pull/55170)（6/29 创建）：web 模型 fallback 管理端到端实现，等待评审
- [#62272](https://github.com/NousResearch/hermes-agent/pull/62272)（7/10 创建）：修复 `/restart` 在 service manager 下因 inline cleanup 卡死的问题，对应 #58666

---

*本日报由 AI 分析师基于 GitHub 公开数据自动生成，统计数据以链接来源为准。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报（2026-08-04）

> 数据来源：GitHub Issues / Pull Requests | 统计窗口：2026-08-03 ~ 2026-08-04

---

## 1. 今日速览

过去 24 小时项目活跃度较高：共产生 10 条 Issue 更新（7 新开 / 活跃，3 关闭）和 8 条 PR 更新（7 待合并，1 已合并/关闭）。当日无新版本发布。社区提交的多个 Bug 均快速获得修复 PR 响应，其中 MCP 工具名非法字符、数据库知识库 UUID 兼容、WebUI 深色模式配色、备份文件下载失败四个问题已形成“Issue→Fix PR”的完整闭环，项目整体响应链路顺畅。此外，两个较受关注的长期问题（#9527 日志调试、#9474 WebChat 超长会话不显示）仍在讨论中，有待维护者进一步跟进。

---

## 2. 版本发布

今日无新版本发布（最新 Releases 为空）。

---

## 3. 项目进展

今日仅有一个 PR 被合并/关闭，另有 3 个修复 PR 处于待合并状态，但均已对应到具体 Issue，整体进度清晰。

- 合并备份下载修复：[PR #9525 - fix: accept bearer token for backup downloads](https://github.com/AstrBotDevs/AstrBot/pull/9525)
  - 修复 AstrBot Desktop 通过 `Authorization: Bearer` 头发送 Dashboard JWT 下载备份时，因后端仅接受 `token` 查询参数而返回 JSON 错误、导致备份文件仅有 1K 的问题（对应 Issue [#9524](https://github.com/AstrBotDevs/AstrBot/issues/9524)）。该 PR 已关闭，意味着备份下载链路已恢复正常。

- 三个待合并的修复 PR 是今日项目推进的重点（对应 Issue 仍在 Open 状态，合入后有望集中关闭）：
  - [PR #9534 - fix: sanitize MCP tool names for LLM API](https://github.com/AstrBotDevs/AstrBot/pull/9534)：修复 MCP 工具名含 `.` 导致 OpenAI/Anthropic 报 400 错误的问题（对应 [#9533](https://github.com/AstrBotDevs/AstrBot/issues/9533)）。
  - [PR #9531 - fix: handle legacy kb_ids in global knowledge base config](https://github.com/AstrBotDevs/AstrBot/pull/9531)：兼容旧版配置中 `kb_names` 字段存 UUID 的情况，并增加回归测试（对应 [#9529](https://github.com/AstrBotDevs/AstrBot/issues/9529)）。
  - [PR #9523 - fix(dashboard): text color display abnormality in dark mode](https://github.com/AstrBotDevs/AstrBot/pull/9523)：修复 WebUI 深色模式侧栏文字变 #80CBC4 青绿色的 CSS 编译问题（对应 [#9521](https://github.com/AstrBotDevs/AstrBot/issues/9521)）。

- 另有 3 个非紧急 PR 更新：[#9536](https://github.com/AstrBotDevs/AstrBot/pull/9536) issue template 中英文重构、[#9532](https://github.com/AstrBotDevs/AstrBot/pull/9532) GitHub Actions 依赖升级、[#9451](https://github.com/AstrBotDevs/AstrBot/pull/9451) 调整 fake tool call 消息顺序以降低延迟。

---

## 4. 社区热点

今日讨论最活跃的 Issue 集中在**日志可观测性**与**长会话数据迁移**两个话题上，用户情绪与表达强度较高。

- **[Issue #9527 - 错误信息非得是滚木吗？](https://github.com/AstrBotDevs/AstrBot/issues/9527)**（评论 5，P1 优先级）
  用户以强烈的措辞表达了对 DEBUG 日志不完整的不满——开启 DEBUG 后看不到 internal 组件的 logging 信息，错误消息大量是 `httpx.ConnectError: All connect...` 这种截断文本。该 Issue 折射出用户在排查连接性问题时缺乏底层日志支撑的普遍痛点。作者明确表示“求你们了，认真对待这个问题”，情绪激烈但指向明确：需要透传原生 logging 模块的 DEBUG 信息。

- **[Issue #9474 - WebChat 超长会话在升级后不显示在新版 UI 对话记录中](https://github.com/AstrBotDevs/AstrBot/issues/9474)**（评论 4）
  用户的 WebChat 会话持续近两个月、16,078 条消息，升级后数据仍在数据库（platform_message_history 表有 20,599 条消息），但新版 WebUI 对话记录中看不到该会话。这不仅是 UI 展示问题，更涉及大数据量会话在版本升级时的兼容性。用户给出了具体会话 ID 和数据结构，属于高质量 Bug 报告，但目前尚未有对应的修复 PR 或明确答复。

---

## 5. Bug 与稳定性

按严重程度排列（P1 为最高）：

| 严重程度 | Issue | 问题描述 | 修复状态 |
|---------|-------|---------|---------|
| 高（功能阻断） | [#9533](https://github.com/AstrBotDevs/AstrBot/issues/9533) | MCP 工具名含 `.`（如腾讯文档 MCP）导致 LLM API 返回 400 `Invalid 'tools[].name'`，聊天直接报错 | 已有 PR [#9534](https://github.com/AstrBotDevs/AstrBot/pull/9534) 待合并 |
| 高（功能失效） | [#9529](https://github.com/AstrBotDevs/AstrBot/issues/9529) | 旧配置中 `kb_names` 实际存的是 UUID（kb_id），被 `get_kb_by_name()` 按名称匹配时返回 `None`，知识库静默失效且 `check_all_kb` 无日志 | 已有 PR [#9531](https://github.com/AstrBotDevs/AstrBot/pull/9531) 待合并 |
| 中（数据安全） | [#9524](https://github.com/AstrBotDevs/AstrBot/issues/9524) | 4.27.1 版本备份后下载的备份文件仅 1K，无法使用 | **已修复**（PR [#9525](https://github.com/AstrBotDevs/AstrBot/pull/9525) 已关闭） |
| 中（数据可见性） | [#9474](https://github.com/AstrBotDevs/AstrBot/issues/9474) | WebChat 超长会话（16K+ 消息）升级后不显示在新版 WebUI 对话记录，数据未丢失但用户无法访问 | 无修复 PR，讨论中 |
| 低（UI 可用性） | [#9521](https://github.com/AstrBotDevs/AstrBot/issues/9521) | v4.27.1 深色模式侧栏文字颜色显示为刺眼的 #80CBC4，影响阅读体验，但功能正常 | 已有 PR [#9523](https://github.com/AstrBotDevs/AstrBot/pull/9523) 待合并 |

今日关闭的 Issue 有：

- [#6839](https://github.com/AstrBotDevs/AstrBot/issues/6839)：插件发布（astrbot_plugin_minimax_music），已关闭。
- [#9526](https://github.com/AstrBotDevs/AstrBot/issues/9526)：在新插件站发布插件时报 Cloudflare 错误（origin server 返回无效/不完整响应），已关闭。
- [#9524](https://github.com/AstrBotDevs/AstrBot/issues/9524)：备份文件 1K 问题，已关闭（PR #9525 合入）。

---

## 6. 功能请求与路线图信号

今日出现了 2 个明确的功能需求信号，指向 provider 能力扩展与可观测性提升两个方向：

- **[Issue #9530 - Support OpenAI Responses API built-in tools](https://github.com/AstrBotDevs/AstrBot/issues/9530)**
  用户请求在 `openai_responses` provider 中支持 OpenAI 内置工具：`web_search`、`file_search`、`code_interpreter` 等，并希望在 Dashboard 提供配置入口、支持透传 `tools` / `tool_choice`，以及正确处理流式事件和搜索引用 annotations。这是一个偏“路线图”级别的 request，涉及 provider 层架构设计，短期合入的可行性需维护者评估。

- **[Issue #9527 - 显示底层库 logging 的 DEBUG 层级信息](https://github.com/AstrBotDevs/AstrBot/issues/9527)**
  用户在 P1 优先级下要求 DEBUG 模式透传原生 logging 模块信息，方便定位连接层问题。这属于系统可观测性的基础能力，与项目的插件调试和 AI 配置排错体验直接相关。虽未附带 PR，但改善日志系统的吸引力较高。

其他相关信号：

- [#9529](https://github.com/AstrBotDevs/AstrBot/issues/9529) 暴露了知识库配置中 `kb_names` 字段语义混乱的问题（旧版本写入 UUID，新版本按名称匹配），已有 PR 修复；但长期看，配置字段的版本迁移与数据结构规范化值得维护者关注。

- 长期开放 PR [#8179 - Feat: Opencode Zen & Go as Provider](https://github.com/AstrBotDevs/AstrBot/pull/8179) 自 5 月 13 日创建至今仍未合并/关闭，若该功能被纳入，将为项目增加更多 provider 选择，建议维护者给出明确答复。

---

## 7. 用户反馈摘要

从今日 Issues 及评论中提炼的用户声音：

- **“DEBUG 日志聊胜于无”**（[#9527](https://github.com/AstrBotDevs/AstrBot/issues/9527)）：用户反馈“错误信息一半以上都是 `httpx.ConnectError: All connect...`”，无法读取内部组件和原生 logging 的 DEBUG 信息，导致排查问题基本靠猜。这说明**日志系统的完整性已成为影响用户排查效率的关键短板**。

- **“近两个月 16,078 条消息会话，升级后看不到了”**（[#9474](https://github.com/AstrBotDevs/AstrBot/issues/9474)）：用户也验证了数据未丢失（数据库中有完整记录），这属于 UI 层与数据层的兼容性断裂。对重度用户来说，超长会话是真实且高频的使用场景，升级迁移需要更稳健的兜底处理。

- **“深色模式下文字颜色刺眼，刷新 / 清 Cookie 都没用”**（[#9521](https://github.com/AstrBotDevs/AstrBot/issues/9521)）：用户尝试了强刷和清除 Cookie，问题依旧，说明是前端样式编译问题而非缓存问题。用户对 4.27.1 版本的主题回归表达了明显不满意，但功能可用的前提下情绪相对克制。

- **“备份文件 1K 无法使用”**（[#9524](https://github.com/AstrBotDevs/AstrBot/issues/9524)）：备份功能是用户数据安全的底线，该问题直接触达信任线，好在已随 PR #9525 修复并关闭。

- **“添加腾讯文档 MCP 后聊天直接报错”**（[#9533](https://github.com/AstrBotDevs/AstrBot/issues/9533)）：第三方 MCP 生态正在扩大，但工具名规范性问题暴露出 AstrBot 对 MCP 协议实现的健壮性仍需加强。

---

## 8. 待处理积压

| 项目 | 类型 | 创建时间 | 最后更新 | 备注 |
|------|------|---------|---------|------|
| [#9474 - WebChat 超长会话不显示在新版 UI](https://github.com/AstrBotDevs/AstrBot/issues/9474) | Issue（Bug） | 2026-07-30 | 2026-08-03 | 4 条评论，无修复 PR。数据完整但 UI 不可见，影响重度用户，建议尽快排查 `webchat` 会话列表的加载逻辑 |
| [#8179 - Opencode Zen & Go as Provider](https://github.com/AstrBotDevs/AstrBot/pull/8179) | PR（Feature） | 2026-05-13 | 2026-08-03 | 开放超过 2 个月，无合并、无关闭、无维护者评论。请维护者明确是否纳入路线图，避免社区贡献者长期等待 |
| [#9527 - 错误信息非得是滚木吗？](https://github.com/AstrBotDevs/AstrBot/issues/9527) | Issue（P1） | 2026-08-03 | 2026-08-03 | 5 条评论，P1 优先级，用户情绪激烈。虽为 open 状态且生成不到一天，但优先级 P1 且涉及调试体验，建议维护者尽快响应或至少给出计划 |

---

**总结**：AstrBot 项目今日维持了良好的 Issue→PR 修复节奏，4 个 Bug 均已进入修复或已完成合并，项目健康度总体良好。但日志可观测性（#9527）和长会话兼容性（#9474）是当前社区情绪最集中的两个问题，建议在产品层面考虑系统性解决，而不仅是打补丁。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*