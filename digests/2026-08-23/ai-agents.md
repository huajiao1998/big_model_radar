# OpenClaw 生态日报 2026-08-23

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-22 22:10 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 · 2026-08-23

> 数据窗口：2026-08-22 00:00 - 08-22 23:59 UTC | 来源：github.com/openclaw/openclaw

### 1. 今日速览

OpenClaw 昨日保持**超高活跃**：24小时内 Issues 更新 500 条（新开/活跃 481，关闭 19），PR 更新 500 条（待合并 416，已合并/关闭 84），无新版本发布。核心焦点仍在 `v2026.8.1-beta.2` 的 Release Validation 与稳定性攻坚。整体健康度：**开发吞吐极高，但稳定性债务集中爆发** — Gateway 事件循环阻塞、SQLite 损坏、子代理/Subagent 交付链路等 P0/P1 级回归问题占据讨论榜前列，合并侧则以安全策略、会话路由契约和 Gateway 可靠性修复为主。

### 2. 版本发布

**本周期无新版本发布。**
当前待验证版本为 `v2026.8.1-beta.2`，验证跟踪 Issue 仍开放：[#125626](https://github.com/openclaw/openclaw/issues/125626)（19 评论，过去24h最热）。维护者需完成真实 Gateway 升级验证清单后方可进入正式发布。

### 3. 项目进展

昨日共 84 个 PR 合并/关闭，关键进展集中在**安全加固、Gateway 会话一致性与 Control UI 可用性**：

**已合并/关闭的重要 PR：**

*   **安全 - 插件安装策略确认闭环** [#120900](https://github.com/openclaw/openclaw/pull/120900) + [#116489](https://github.com/openclaw/openclaw/pull/116489) | `P2 / size:XL` | 已关闭/待发布
    > 打通 `security.installPolicy -> warn` 的完整链路：Gateway 的 `plugins.install` 新增 `acknowledgeInstallPolicyWarning: true` 确认位，CLI 需显式输入目标名确认，Control UI 允许认证管理员复核后继续安装。为应对恶意插件/技能提供强制人工复核边界，属重大安全边界改进。

*   **可靠性 - 会话投递隔离** [#126424](https://github.com/openclaw/openclaw/pull/126424) | `P1 / size:XL` | 已关闭
    > 修复多 Agent 场景下 `conversation` 工具可跨 Agent 边界投递的问题，强制投递保持在 Agent bindings 内，防止信息泄露与会话错乱。

*   **可靠性 - 显示截断结构化标记** [#126342](https://github.com/openclaw/openclaw/pull/126342) | `P2` | 已关闭
    > 当 `chat.history` 触及 8k 字符显示上限时，不再仅靠文本省略号暗示截断，而是在 `session.message` 与 `chat.history` 行中写入结构化 `truncated` 标记，便于前端与自动化正确判断完整性。Closes [#126229](https://github.com/openclaw/openclaw/issues/126229)。

*   **协议一致性 - 会话路由权威契约** [#126316](https://github.com/openclaw/openclaw/pull/126316) | `P1 / size:XS` | 已关闭
    > 暴露 Gateway 权威的 session routing contract，修复已发布 Apple 客户端用 `agents.list.defaultId` 重建路由导致 `unowned` 场景下契约不一致的问题。

*   **模型与认证 - Claude CLI OAuth 保活** [#125471](https://github.com/openclaw/openclaw/pull/125471) | `P2 / size:XL` | 已关闭
    > 修复 Gateway 重启后 `anthropic:claude-cli` 遗留 `provider: anthropic, mode: token` 导致 OAuth 刷新归属丢失，并消除 `anthropic: missing` 矛盾空行的误报。

*   **Agent - Codex 技能路径规范化** [#117574](https://github.com/openclaw/openclaw/pull/117574) | `P1` | 已关闭
    > 修复工作区技能 prompt 中 `<location>` 被压缩为 `~/...` 导致模型无法定位可执行路径的问题，恢复为规范绝对路径。

**评估：** 本日合并无面向用户的新功能，以**堵住 beta.2 引入的回归与安全债**为主，项目向前迈进约 0.5 个小版本的核心稳定性，未产生破坏性变更。

### 4. 社区热点

按评论数 Top 5，均为长期未决但在昨日被集中唤起的硬核问题：

1.  **[OPEN] Release validation: v2026.8.1-beta.2 [#125626](https://github.com/openclaw/openclaw/issues/125626) | 19 评论**
    > 官方验证贴，维护者与测试者在评论区同步 Gateway 升级、本地路径/凭证脱敏等问题。诉求：明确 beta.2 的通过标准与验证技能使用方式。标签 `clawsweeper-recovery-stuck` 表明验证流程本身卡住。

2.  **[OPEN] WhatsApp 1:1 inbound image wedges main lane ~3min [#96834](https://github.com/openclaw/openclaw/issues/96834) | 15 评论 | P1**
    > 多模态图片以 native 注入后，主 lane 阻塞约 3 分钟才开始处理，期间 `active_reply_work` 悬空。用户诉求：WhatsApp 核心链路的实时性保障。

3.  **[OPEN] Feature Request: Configurable streaming watchdog timeout [#68596](https://github.com/openclaw/openclaw/issues/68596) | 15 评论 | P2 | 👍8**
    > 使用 kimi-k2.5 / DeepSeek-R1 等长思考模型时，30s 无流式更新即触发 `streaming watchdog` 误判重置。诉求：可配置超时阈值，是长推理模型用户的最高票功能请求。

4.  **[OPEN] Subagent completion delivery can be lost [#67777](https://github.com/openclaw/openclaw/issues/67777) | 12 评论 | P1 | 🦞 diamond lobster**
    > 子代理完成通过同步 `direct-announce` 回注请求方会话，在繁忙、超时、drain/orphan 清理时可能丢失且无落盘补偿。社区高度关注会话状态一致性。

5.  **[OPEN] MCP tools not injected into subagent (sessions_spawn) [#85030](https://github.com/openclaw/openclaw/issues/85030) | 12 评论 | P1 | 👍6**
    > `bundle-mcp` 与 per-tool/ per-agent allowlist 在 `sessions_spawn` 子会话中完全失效，子代理仅能看到内置工具。影响所有依赖 MCP 的多代理工作流。

### 5. Bug 与稳定性

按严重度排序，昨日活跃的回归/崩溃类问题：

**P0 - 网关不可用 / 数据丢失**

*   [OPEN] beta.2 gateway: event loop blocks ~100s every ~10 min [#124788](https://github.com/openclaw/openclaw/issues/124788) | 6 评论 | `clawsweeper:no-new-fix-pr` | **无 Fix PR**
    > 锚定定时器 + 字符串拼接 + fs 扫描导致主线程周期性冻结，WebSocket/HTTP `/ready`/cron 全停，禁用 memory 插件仍复现。
*   [OPEN] SQLite corruption recurs on pristine rebuilt DBs [#126821](https://github.com/openclaw/openclaw/issues/126821) | 5 评论 | `regression, data-loss, crash-loop` | **无 Fix PR**
    > WSL2 下全新 `VACUUM INTO` 重建且 `integrity_check=ok` 的库，15-24h 内出现 freelist 错计数，5天5次，并进入拒绝服务但不退出的“瘫痪网关”模式。

**P1 - 会话/消息丢失 / 崩溃循环**

*   [OPEN] WhatsApp inbound image wedges lane [#96834](https://github.com/openclaw/openclaw/issues/96834) | `needs-live-repro` | **无 Fix PR**
*   [OPEN] Subagent delivery lost [#67777](https://github.com/openclaw/openclaw/issues/67777) | `source-repro` | **无 Fix PR**
*   [OPEN] MCP tools not injected [#85030](https://github.com/openclaw/openclaw/issues/85030) | `needs-live-repro` | **无 Fix PR**
*   [OPEN] OpenClaw leaks unreaped hook/tool child processes [#97616](https://github.com/openclaw/openclaw/issues/97616) | 9 评论 | `zombie accumulation` | **无 Fix PR**
*   [OPEN] Codex OAuth refresh succeeds but cron/heartbeat fail 10s timeout [#89278](https://github.com/openclaw/openclaw/issues/89278) | 9 评论 | **已有关联 PR open** `clawsweeper:linked-pr-open`
*   [OPEN] Reliability: active-memory blocks replies [#72015](https://github.com/openclaw/openclaw/issues/72015) | 10 评论 | `crash-loop` | **无 Fix PR**
*   [OPEN] memory_search transient sync timeout masks as provider failure [#112196](https://github.com/openclaw/openclaw/issues/112196) | 7 评论 | **已有关联 PR open**
*   [OPEN] Subagent spawn fails with vLLM openai-completions + thinking [#124284](https://github.com/openclaw/openclaw/issues/124284) | 6 评论 | **已有关联 PR open** | beta.2 `wrapStreamFnWithProviderPromptState` 引入的回归

**P2 及其他**

*   [OPEN] Model picker only applies to new sessions; Ollama Cloud re-auth [#124689](https://github.com/openclaw/openclaw/issues/124689) | 7 评论 | **已有 Fix PR queueable** `clawsweeper:queueable-fix`
*   [OPEN] Unhandled Playwright assertion crashes Gateway [#45224](https://github.com/openclaw/openclaw/issues/45224) | 8 评论 | `crash-loop` | **已有 Fix 形态清晰** `fix-shape-clear`

> **健康度提示：** 8 个 P1+ 问题中 5 个仍处于 `no-new-fix-pr` 状态，表明修复供给跟不上回归发现速度，beta.2 不宜直接推至生产。

### 6. 功能请求与路线图信号

**用户呼声高的新需求：**

*   可配置 Streaming Watchdog 阈值 [#68596](https://github.com/openclaw/openclaw/issues/68596) - 长思考模型刚需，👍8
*   UI quality update based on UX scoring [#75947](https://github.com/openclaw/openclaw/issues/75947) - 配置页信息密度过高、可读性差
*   Session snapshots save/load [#13700](https://github.com/openclaw/openclaw/issues/13700) | P2 - 长会话分支/A-B 测试
*   Built-in pace-aware rate limiting [#45771](https://github.com/openclaw/openclaw/issues/45771) - 自主代理烧穿 Anthropic 限额
*   session-memory hook on reset/prune [#51572](https://github.com/openclaw/openclaw/issues/51572) - 仅 compaction 触发导致上下文丢失

**已出现对应 PR 的路线图信号（下一版本可能纳入）：**

*   `fix(sessions): show collaboration details in CLI` [#128035](https://github.com/openclaw/openclaw/pull/128035) - 协作会话可见性/归属展示，呼应多用户场景
*   `feat(plugins): expose durable plugin session state` [#127982](https://github.com/openclaw/openclaw/pull/127982) | Closes [#127977](https://github.com/openclaw/openclaw/issues/127977) - 插件持久状态回读，解决 Gateway 重启后状态丢失
*   `feat: add per-session developer tool modes` [#128046](https://github.com/openclaw/openclaw/pull/128046) | Closes [#128045](https://github.com/openclaw/openclaw/issues/128045) - Control UI 按会话选择工具面/QuickJS 能力配置
*   `improve(control-ui): stage slash command arguments` [#123356](https://github.com/openclaw/openclaw/pull/123356) - Composer 阶段参数预填，为斜杠命令体系铺路
*   `fix: Tool Search directory/tools wrap native read/exec` [#126618](https://github.com/openclaw/openclaw/pull/126618) | Closes [#126460](https://github.com/openclaw/openclaw/issues/126460) - 修复 openai-completions 模型工具调用错配

### 7. 用户反馈摘要

*   **最大痛点 - beta.2 稳定性回退：** 多名用户报告 Gateway 周期性 100s+ 冻结 [#124788](https://github.com/openclaw/openclaw/issues/124788) 与 SQLite 腐坏后瘫痪 [#126821](https://github.com/openclaw/openclaw/issues/126821)，直言“生产环境无法升级，需安全回退指引” [#123799](https://github.com/openclaw/openclaw/issues/123799)。
*   **多代理与会话是重灾区：** 子代理结果丢失 [#67777](https://github.com/openclaw/openclaw/issues/67777)、MCP 工具不注入 [#85030](https://github.com/openclaw/openclaw/issues/85030)、上下文从 57% 突降至 13% 无 compaction [#108215](https://github.com/openclaw/openclaw/issues/108215)，用户对会话状态可信度担忧上升。
*   **渠道体验割裂：** WhatsApp 图片阻塞 3 分钟 [#96834](https://github.com/openclaw/openclaw/issues/96834) 与 Feishu 重复回复 [#49381](https://github.com/openclaw/openclaw/issues/49381) 表明多渠道消息投递仍未收敛。
*   **开发者体验：** 抱怨 `active-memory` 拖慢回复 [#72015](https://github.com/openclaw/openclaw/issues/72015)、`zsh -f -c` 交互式扩展导致 `echo ===` 失败 [#126521](https://github.com/openclaw/openclaw/issues/126521)，以及硬编码 `/Users/wangtao` 工作区 [#51429](https://github.com/openclaw/openclaw/issues/51429) 引发的信任问题。
*   **正面信号：** 对可配置 watchdog [#68596](https://github.com/openclaw/openclaw/issues/68596) 与安装策略二次确认 [#120900](https://github.com/openclaw/openclaw/pull/120900) 反馈积极，认为“终于有对长推理与供应链安全的正视”。

### 8. 待处理积压

**长期未响应 / 需维护者决策的 Issue（>90天，仍 `needs-maintainer-review`）：**

*   [#51429](https://github.com/openclaw/openclaw/issues/51429) | 2026-03-21 | 硬编码工作路径 `/Users/wangtao` 已发布 | P2 | `needs-product-decision`
*   [#45224](https://github.com/openclaw/openclaw/issues/45224) | 2026-03-13 | Playwright CRSession 未捕获断言致 Gateway 崩溃 | P1 | `fix-shape-clear, queueable-fix` - 已有清晰修复形态，建议优先合并
*   [#48810](https://github.com/openclaw/openclaw/issues/48810) | 2026-03-17 | Compaction 重试产生 orphan fork 破坏 parentId 链 | P2
*   [#96834](https://github.com/openclaw/openclaw/issues/96834) / [#85030](https://github.com/openclaw/openclaw/issues/85030) / [#89278](https://github.com/openclaw/openclaw/issues/89278) | 均标记 `clawsweeper-recovery-stuck` + `needs-maintainer-review`，需产品决策是否纳入 beta.2 阻断修复

**PR 积压 - 等待作者响应（`waiting on author` 超 7 天）：**

*   [#117935](https://github.com/openclaw/openclaw/pull/117935) `fix(ci): unblock full release validation` | P1 / XL | 阻塞完整发布验证流水线
*   [#123975](https://github.com/openclaw/openclaw/pull/123975) `fix(scripts): typecheck hangs forever when tsgo wedges` | 挂起的 typecheck 导致 CI/本地终端僵死
*   [#120443](https://github.com/openclaw/openclaw/pull/120443) `fix: read codex thread binding before deferring compaction` | 修复 Codex 自动 compaction 丢失转次问题，需补充 proof

> **维护者建议：** 1) 优先 triage 两个 P0（[#124788](https://github.com/openclaw/openclaw/issues/124788), [#126821](https://github.com/openclaw/openclaw/issues/126821)）并冻结 beta.2 向 stable 的自动升级；2) 清理 `queueable-fix` 的 [#45224](https://github.com/openclaw/openclaw/issues/45224) / [#124689](https://github.com/openclaw/openclaw/issues/124689) 以快速止血；3) 对 `recovery-stuck` 队列进行产品决策分流，避免高优先级会话状态类 Bug 持续堆积。

---
*报告生成：Muse Spark · 数据覆盖 GitHub Issues/PR 全量更新 1000 条，展示 Top 50/30。*

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体 开源生态横向对比报告 · 2026-08-23

> 数据窗口：2026-08-22 00:00-23:59 UTC | 样本：OpenClaw / Zeroclaw / PicoClaw / QwenPaw / hermes-agent / AstrBot

### 1. 生态全景

个人 AI 助手赛道已进入**“高活跃、零发布、重收敛”**的集体蛰伏期：6个项目24h内无一发版，但头部项目仍维持日均500-1000条 Issues/PR更新的超高吞吐。核心矛盾从功能竞赛转向**稳定性与交付能力**的比拼：Gateway/会话状态一致性、MCP可靠性、超时治理成为全生态共性债务。生态呈现明显分层——OpenClaw、hermes-agent以10倍于他者的社区规模领跑并承受最大稳定性压力，而中长尾项目则在架构选型（WASM/插件化）与Provider兼容性上精耕细作。短期内“堵漏洞、清积压”而非“发新版”是共同节奏。

### 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 合并吞吐 | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500条 (481活跃/19关闭) | 500条 (416待合/84已合) | 0 | 高 (84/500) | **超高活跃/承压**：beta.2回归集中爆发，2个P0+5个P1无Fix，开发吞吐极高但修复供给不足 |
| **hermes-agent** | 364条 (303活跃/61关闭) | 500条 (462待合/38已合) | 0 | 低 (38/500=7.6%) | **超高活跃/不可持续**：462 PR积压，P1安装/会话全阻断，刚完成God File史诗重构 |
| **Zeroclaw** | 50条 (43活跃/7关闭) | 50条 (48待合/2已合) | 0 | 极低 (2/50) | **高讨论/低合并**：6/10热点为RFC，评审瓶颈严重，v0.9.0前决策僵局 |
| **AstrBot** | 11条 (5新Bug/3需求) | 15条 (13待合/2已合) | 0 | 中 (2/15) | **高活跃/强打磨**：7/15 PR聚焦Provider层，功能推进30%，无P0阻断 |
| **QwenPaw** | 6条 (5活跃/1关闭) | 6条 (6待合/0已合) | 0 | 零合并 | **中活跃/评审堆积**：6 PR平均等待8-15天，前端崩溃类Bug敞口 |
| **PicoClaw** | 2条 | 6条 (2 OPEN/4关闭) | 0 | 零合并 | **中低活跃/债务清理**：4个关闭PR均为3-6月陈年PR，核心P0一月未解 |

> **共性：** 全生态0发布，表明均处于质量巩固窗口；头部2家日更新量是尾部4家总和的10倍。

### 3. OpenClaw 在生态中的定位

**社区规模：断层领先。**
OpenClaw单日1000条事件与hermes-agent（864条）同属第一梯队，是Zeroclaw/AstrBot的10倍、QwenPaw/PicoClaw的80-100倍。合并能力（84个/日）亦是生态唯一能消化高吞吐的项目。

**优势：**
1.  **Gateway中心化架构最完整**：唯一同时覆盖 Gateway事件循环、会话路由契约、Control UI、Apple客户端联动的项目，多Agent协作（conversation隔离[#126424]、Subagent交付）议题深度领先。
2.  **安全边界最先闭环**：`installPolicy->warn`强制人工复核链路（#120900）已合入，显著领先于仍在RFC阶段的Zeroclaw沙箱策略（#6996）和hermes-agent的`auth.json`写保护缺失（#70942）。
3.  **多渠道生产级验证**：WhatsApp/Feishu等真实业务链路问题暴露充分（#96834），非Demo级集成。

**技术路线差异：**
*   **vs Zeroclaw / PicoClaw：** OpenClaw走**重型常驻Gateway+SQLite持久化**路线；Zeroclaw押注**WASM运行时插件化+瘦二进制**（#8850），追求通道/工具可插拔；PicoClaw则为轻量嵌入式，债务清理为主。
*   **vs hermes-agent：** 两者同为Gateway范式，但hermes-agent重**Desktop端/舰队更新可靠性**（#91277），OpenClaw重**服务端多Agent会话一致性与协议契约**。
*   **vs AstrBot / QwenPaw：** AstrBot以**Provider抽象与插件市场**为核心（国内中转站/代理兼容为刚需）；QwenPaw以**Console前端与qwenpaw-data工程化**见长。OpenClaw的模型层关注点在OAuth保活、路由而非Provider广度。

**短板：** `v2026.8.1-beta.2`稳定性债务集中爆发（事件循环100s冻结#124788、SQLite腐坏#126821），健康度风险高于已进入打磨期的AstrBot/QwenPaw。

### 4. 共同关注的技术方向

| 共性方向 | 涉及项目 | 具体诉求与表征 |
| :--- | :--- | :--- |
| **1. 超时/挂死根治** | **OpenClaw, Zeroclaw, hermes-agent** | OpenClaw: 长思考模型需可配置streaming watchdog#68596(👍8)；Zeroclaw: WASM/browser/文件监听4类无超时#9255/#9946；hermes-agent: 统一deadline层提案#85125欲根治400+挂死 |
| **2. MCP/子代理可靠性** | **OpenClaw, PicoClaw, AstrBot, Zeroclaw** | OpenClaw: MCP不注入子代理#85030/Subagent结果丢失#67777；PicoClaw: MCP失败拖垮主循环#3269(P0)；Zeroclaw: MCP相关RFC阻塞；AstrBot: MCP文档补全 |
| **3. 会话/内存状态一致性** | **OpenClaw, Zeroclaw, hermes-agent, QwenPaw** | OpenClaw: 子代理交付丢失/上下文突降；Zeroclaw: 双RFC争论Memory生命周期#6850/#9103；hermes-agent: 全profile无法加载会话#89675(P1)；QwenPaw: 历史消息截断与空行 |
| **4. 多渠道消息投递** | **OpenClaw, Zeroclaw, PicoClaw, AstrBot** | OpenClaw: WhatsApp图片阻塞3min；Zeroclaw: Telegram重复投递#9718；PicoClaw: Telegram 22.8万次无效编辑致限流#3343；AstrBot: 会话等待器需按发送者隔离#9770 |
| **5. Provider/模型网关兼容** | **AstrBot, QwenPaw, OpenClaw, hermes-agent** | AstrBot: Whisper代理/视觉图片归一化/中转站兼容；QwenPaw: 像素超限崩溃#7212/按Provider拆分媒体上限#7201；OpenClaw: Claude CLI OAuth保活；hermes-agent: Ollama 1.5s取消/DeepSeek 400 |
| **6. 安装/更新与跨平台** | **hermes-agent, Zeroclaw, QwenPaw** | hermes-agent: Debian/Termux全量安装失败#87093/#90687；Zeroclaw: Win11 74测试失败#7462；QwenPaw: Win GBK下chcp 65001已闭环#7043 |

### 5. 差异化定位分析

| 维度 | OpenClaw | hermes-agent | Zeroclaw | AstrBot | QwenPaw | PicoClaw |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **功能侧重** | Gateway+Control UI+多Agent编排 | Desktop+舰队更新+长会话UX | WASM插件运行时+A2A互联 | Provider生态+插件市场+搜索/STT | Console体验+数据层+多模态 | 轻量Agent Loop+DeltaChat |
| **目标用户** | 自托管企业/高阶个人 | 桌面重度用户/多设备舰队 | 追求可扩展/瘦身的开发者 | 国内中转/代理用户/插件开发者 | 企业多Provider/可视化用户 | Sipeed硬件/嵌入式场景 |
| **技术架构** | 中心化Gateway+SQLite+会话契约 | 同构但强依赖install.sh/update | 去中心化WASM沙箱+Broker | 平台/Provider抽象层 | 前后端分离+PyPI runtime | 单进程AgentLoop |
| **商业化信号** | 安全策略、会话隔离等企业级特性 | 远程大脑+本地执行#18715(👍26) | 语音通道Gemini Live#8780 | AnySearch/StepFun外部团队主动接入 | docker-compose GAAP Demo | 无 |

### 6. 社区热度与成熟度分层

**第一梯队：超高热度 - 稳定性攻坚期**
*   **OpenClaw / hermes-agent**：日更800-1000，处于`beta/0.20.x`后的质量偿债期。特征是P0/P1阻断集中、用户舆论转向“能装能连不丢会话”的基础可用性质问。已完成大型重构（hermes-agent God File 20/20），下一步成败看回归修复速度。

**第二梯队：高热度 - 架构决策期**
*   **Zeroclaw**：热度高但合并停滞，5/6热点为`risk:high` RFC，卡在v0.9.0前Breaking Change抉择。成熟度最低，架构未收敛。
*   **AstrBot**：热度高且健康，处于**质量巩固期**的典范：无P0阻断，13个PR有序推进，外部生态主动贡献，是唯一呈现“强打磨”正循环的项目。

**第三梯队：中低热度 - 体验打磨/维护期**
*   **QwenPaw (v2.1.0间歇期)**：中等活跃，聚焦思考过程可折叠、多媒体优雅降级等UX细节，PR积压需清理。
*   **PicoClaw (积压清理期)**：活跃度最低，以关闭陈年PR为主，核心P0（MCP hangs）34天未获官方响应，存在贡献者流失风险。

### 7. 值得关注的趋势信号

**对AI智能体开发者的参考价值：**

1.  **长推理模型倒逼超时可配置化**：OpenClaw#68596、Zeroclaw/hermes-agent的超时提案表明，`30s固定watchdog`已不适配Kimi-K2.5/DeepSeek-R1。**建议：** 将超时、重试作为一等配置暴露，而非硬编码。

2.  **MCP成为最脆弱的扩展面**：4/6项目MCP相关Bug位列P0/P1，且均为“失败即拖垮主循环/会话”。**建议：** 对MCP采用隔离、降级、熔断设计，而非同步强依赖。

3.  **会话状态可信度是留存关键**：子代理结果丢失、上下文突降、无法加载历史等Issue获最高评论。**建议：** 会话持久化、快照（#13700）、可验证状态链（hermes-agent #90866）将成为差异化竞争力。

4.  **供应链安全从可选项变必选项**：OpenClaw强制二次确认、Zeroclaw细粒度沙箱、AstrBot代理透传，反映插件/技能生态繁荣后的安全刚需。**建议：** 预设`deny-by-default`策略与审计日志。

5.  **安装即信任，一键部署决定转化**：`curl | bash`失败、Windows编码、WSL2 SQLite腐坏等问题直接导致用户流失。**建议：** 将`install.sh / uv.lock / Win兼容`纳入CI必测门禁，hermes-agent的“舰队更新可靠性”专项值得效仿。

6.  **多模态与思考过程的“可控性”溢价**：QwenPaw“默认折叠思考”、AstrBot图片格式归一化、QwenPaw按Provider拆分媒体上限，指向用户已从“能用多模态”转向“精细控制成本与视觉噪音”。**建议：** 提供按模型/场景的粒度化开关。

> **决策建议：** 若追求生产级多Agent协作，关注OpenClaw的Gateway会话隔离与安全策略演进；若布局插件化/语音实时交互，跟踪Zeroclaw的WASM与Gemini Live RFC裁决；若面向国内用户，AstrBot的Provider兼容层与QwenPaw的UX打磨更具参考性。短期内避免直接升级任何项目的beta版本，等待P0回归收敛。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-23

> 数据窗口：2026-08-22 00:00 ~ 2026-08-22 23:59 UTC | 数据来源：github.com/zeroclaw-labs/zeroclaw

### 今日速览

过去 24 小时项目保持高强度讨论态势：**Issues 更新 50 条（新开/活跃 43，关闭 7），PR 更新 50 条（待合并 48，已合并/关闭 2）**，无新版本发布。活跃度 **高**，但合并吞吐 **低**（48 个 PR 堆积仅 2 个关闭），反映出维护者评审瓶颈。讨论重心高度集中在 **架构类 RFC（占比 6/10 热门 Issues）、Windows 兼容性、WASM 插件运行时到期与安全策略** 三大主线，`risk:high` 标签密集，项目正处于 v0.9.0 前的架构决策与稳定性收敛期。

### 版本发布

**本日无新版本发布。**

最新 Release 为空，`master` 分支持续集成中，无需迁移操作。

### 项目进展

**合并/关闭吞吐有限，以 Issue 层面的缺陷收敛为主，PR 层面无实质合入。**

24h 内仅 2 个 PR 关闭且均为 `CLOSED` 未合并，显示插件系统的核心能力仍在评审中：

*   [#9403](https://github.com/zeroclaw-labs/zeroclaw/pull/9403) `fix(plugins): bound WASM exports by a wall-clock deadline` — 为所有 WASM 工具/内存/通道导出增加 `plugins.limits.call_timeout_ms`（默认 30s）的墙钟超时，解决 [#9255](https://github.com/zeroclaw-labs/zeroclaw/issues/9255) 所述的“滴灌式 HTTP 响应无限挂起”问题。**已关闭未合并，需关注是否重提。**
*   [#9128](https://github.com/zeroclaw-labs/zeroclaw/pull/9128) `feat(plugins): add scoped tool secret service` — 增加 `secrets.get(name)` 宿主服务，通过 `x-secret` 注解实现按插件实例隔离的密钥下发。**已关闭未合并，与 #9129 配套设计被搁置。**

**已关闭的 4 个重要 Issues 标志实质性推进：**

1.  [#9255](https://github.com/zeroclaw-labs/zeroclaw/issues/9255) [P1] WASM 插件无超时 — 已关闭，修复方案由 #9403 承载
2.  [#9436](https://github.com/zeroclaw-labs/zeroclaw/issues/9436) [P1] `config init` 生成的模板无法通过严格加载器 — 新手初始化即降级，已关闭待验证
3.  [#9640](https://github.com/zeroclaw-labs/zeroclaw/issues/9640) WhatsApp Web 文档引用已废弃的 `allowed_numbers` — 已关闭，属文档/安全类低风险修复
4.  [#9339](https://github.com/zeroclaw-labs/zeroclaw/issues/9339) 支持远程 MCP Server 自定义 CA — 已关闭，私有网络部署的 TLS 诉求得到响应

> **评估：** 今日项目向前迈进约 **0.5 步**。缺陷定界与 RFC 修订活跃，但核心 PR 合并停滞，`master` 功能面无新增，健康度受评审积压拖累。

### 社区热点

按评论数排序 Top 6，均为需维护者裁决的架构长文：

| 排名 | Issue | 评论 | 核心诉求与信号 |
| :--- | :--- | :--- | :--- |
| 1 | [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) [Bug] Windows 11 下 74 个测试失败 | 19 | Linux-only 的测试命令、路径语义、936 代码页编码导致全量失败，CI 仅跑 Linux 无法捕获。跨平台是社区最痛点，`risk:high, priority:p1` |
| 2 | [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) RFC: 解耦 memory 生命周期策略与存储后端 | 15 | 要求 `Memory` trait 只做存储，合并/治理等生命周期策略上移，避免网关/通道重复实现。8/22 仍在激烈讨论 |
| 2 | [#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) RFC: Gemini Live 实时语音通道 | 15 | 8/16 已重写为 Broker 合约的 v2 版本，欲增加可选的 speech-to-speech 特性门控通道，是多模态实时交互的关键 RFC |
| 4 | [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) [Tracker] RFC 与设计问题的维护者决策队列 | 13 | **元 Tracker**，所有需 `needs-maintainer-review` 的 RFC 的总入口，反映社区对“决策无响应”的焦虑 |
| 4 | [#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103) RFC: 权威内存存储与可选富化连接器分离 | 13 | 8/22 维护者接管修订，推翻 Lucid-first 路线，改为有界连接器评审，`memory.backend` 职责过重问题亟待裁决 |
| 6 | [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) RFC: 细粒度沙箱策略 | 11 | 应用层 `SecurityPolicy` 与 OS 层 Bubblewrap/Landlock/Seatbelt 策略漂移，需统一文件/网络限制模型 |

> **解读：** 热点高度同质化 — 5/6 为 `type:rfc` 架构议题，且均标记 `status:no-stale, risk:high`。社区诉求是 **“求裁决”** 而非“求新功能”，决策队列 [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 本身成为热点即是信号。

### Bug 与稳定性

按 `priority:p1` > `S1` > `S2` 排序，24h 活跃 Bug 共 11 个，**无新增崩溃类回归，但超时/资源泄漏类缺陷集中爆发：**

**P1 / S1 阻塞级：**
*   [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) Windows 74 测试失败 — `priority:p1, risk:high` — **无 Fix PR**，需重构测试与路径抽象
*   [#10164](https://github.com/zeroclaw-labs/zeroclaw/issues/10164) `block_high_risk_commands=false` 仍硬拦截 `rm` — `priority:p1, risk:high` — 安全策略误判主路径，**无 Fix PR**
*   [#9946](https://github.com/zeroclaw-labs/zeroclaw/issues/9946) `browser` 工具两次 `agent-browser` 等待无超时 — `S1, risk:high` — 同类缺陷 [#8560] 再现，会永久挂起 Agent 回合，**无 Fix PR**
*   [#9255](https://github.com/zeroclaw-labs/zeroclaw/issues/9255) WASM 调用无超时 — `P1` — **已有 Fix PR [#9403](https://github.com/zeroclaw-labs/zeroclaw/pull/9403) 但已关闭，需重审**

**S2 降级级：**
*   [#9718](https://github.com/zeroclaw-labs/zeroclaw/issues/9718) Telegram 通道当模型同时返回 `tool_call+content` 时重复投递 — `risk:high` — **已有 Fix PR [#10215](https://github.com/zeroclaw-labs/zeroclaw/pull/10215) `fix(runtime): suppress final reply duplicated`** 待合入
*   [#9708](https://github.com/zeroclaw-labs/zeroclaw/issues/9708) 守护进程日志无大小/时间/数量上限 — `risk:medium` — **无 Fix PR**
*   [#10232](https://github.com/zeroclaw-labs/zeroclaw/issues/10232) 守护进程诊断丢失 `anyhow` 错误链 — `risk:medium` — **无 Fix PR**
*   [#9666](https://github.com/zeroclaw-labs/zeroclaw/issues/9666) 文件系统监听器 `recv()` 阻塞无法响应取消 — `risk:high` — **无 Fix PR**
*   [#10251](https://github.com/zeroclaw-labs/zeroclaw/issues/10251) 17 个 `telegram listen_*` 测试依赖墙钟超时断言 — `risk:medium` — 同类 [#9429]
*   [#9001](https://github.com/zeroclaw-labs/zeroclaw/issues/9001) Provider 转发失败被 `All providers failed` 通用信封掩盖 — `risk:medium` — **无 Fix PR**
*   [#9590](https://github.com/zeroclaw-labs/zeroclaw/issues/9590) `models refresh` 并发读写丢失缓存 — `risk:high` — **无 Fix PR**

> 稳定性风险画像：**超时未设防**是最大共性（WASM、browser、Telegram 测试、文件监听 4 类），其次是 **可观测性丢失**（日志无界、错误链丢弃、Provider 诊断被吞）。

### 功能请求与路线图信号

**下一版本（v0.9.0）风向标明确指向“运行时插件化 + 语音/网关”：**

**高概率纳入（已有实现 PR 与 RFC 联动）：**
*   **运行时插件化** — [#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850) 将可选通道/工具从编译时 Feature 转为 WASM 运行时插件，对应 PR [#9129](https://github.com/zeroclaw-labs/zeroclaw/pull/9129) `feat(plugins): add coherent channel config services` 与 [#9128](https://github.com/zeroclaw-labs/zeroclaw/pull/9128) 已完成代码，是瘦身默认二进制的核心路径
*   **A2A 互联** — [#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324) `feat(a2a): outbound client config, shared wire-model` 实现 4 个 `a2a_*` 工具与 `[a2a.client]` 默认关闭配置，对应 RFC [#9106]，完成两轮评审
*   **Telegram 多消息流** — [#8561](https://github.com/zeroclaw-labs/zeroclaw/pull/8561) `multi_message streaming mode` 增加 `multi_message_delay_ms` 并实现 `StreamMode::MultiMessage`，与 Discord/Matrix 对齐

**RFC 阶段、待裁决（构成 v0.9 及 v0.10 路线图）：**
*   内存架构双 RFC：[#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) 与 [#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103) — 决定存储与富化的边界，8/22 刚修订，若通过将是 Breaking Change
*   语音双轨：[#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) Gemini Live（高优先级）与 [#7943](https://github.com/zeroclaw-labs/zeroclaw/issues/7943) 后端无关的 `voicehost` WS 客户端（已 `in-progress`，CrispASR/Wyoming 兼容）
*   执行体验：[#7790](https://github.com/zeroclaw-labs/zeroclaw/issues/7790) 将 Web Dashboard 能力迁入 `zerocode` TUI；[#10141](https://github.com/zeroclaw-labs/zeroclaw/issues/10141) `Please make sessions usable` 呼声强烈；[#5607](https://github.com/zeroclaw-labs/zeroclaw/issues/5607) Cron 前置门控（pre-hook 退出码 10 优雅跳过）；[#10050](https://github.com/zeroclaw-labs/zeroclaw/issues/10050) 网关免 Agent 转发的 verbatim 通道发送

**连带观测：** [#10073](https://github.com/zeroclaw-labs/zeroclaw/issues/10073) 拟废弃 `StoragePolicy::Rolling` 并扩展 `/api/logs` 跨段查询，解决持续高事件量下的性能退化；[#10069](https://github.com/zeroclaw-labs/zeroclaw/issues/10069) Agent 可移植性（导出 bundle）进入三阶段提案。

### 用户反馈摘要

从高赞与高评论 Issues 提炼的真实痛点：

*   **“在 Windows 上根本跑不通”** — [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) 中文 Win11 + GBK 控制台用户反馈 74 失败，抱怨 CI 与本地行为不一致，对跨平台支持失望
*   **“Session 没法用”** — [#10141](https://github.com/zeroclaw-labs/zeroclaw/issues/10141) 用户直言 `It’s quite frustrating to get into previous session`，复制会话需点两次 ASCII 按钮、无法批量拷贝历史片段，交互设计不满意
*   **“Browser 工具像阉割版”** — [#9945](https://github.com/zeroclaw-labs/zeroclaw/issues/9945) 仅暴露 16/100+ 命令，iframe、对话框、标签页、表单控件不可达，自动化场景被堵
*   **“Telegram 重复轰炸”** — [#9718](https://github.com/zeroclaw-labs/zeroclaw/issues/9718) 与 [#10215](https://github.com/zeroclaw-labs/zeroclaw/pull/10215) 反映每次对话都收到两条相同消息，体验降级
*   **“初始化即损坏”** — [#9436](https://github.com/zeroclaw-labs/zeroclaw/issues/9436) `config init` 后 `config migrate` 直接 exit 1，新手开箱即踩坑，信任度受损
*   **正面信号：** Cron 预检门控 [#5607](https://github.com/zeroclaw-labs/zeroclaw/issues/5607)、A2A 工具 [#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324)、Landlock 沙箱分级 [#10100](https://github.com/zeroclaw-labs/zeroclaw/pull/10100) 获得持续关注，用户对“更可控、更可移植”的运行时演进持期待态度

### 待处理积压

**长期未决（>1.5 个月）且仍高活跃的 RFC/Tracker 需维护者立即关注，否则将阻塞 v0.9.0 合入：**

*   **决策队列本身已积压** — [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 2026-07-04 创建，作为 v0.9.0 鉴权/安全/网关的 Break Change 总协调面 [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) 已滞留 2 个月，6 个 RFC 等待 `accepted/rejected`
*   **超期 RFC：** [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)（05-22）、[#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)（05-28, `needs-author-action`）、[#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396)（06-27）、[#5607](https://github.com/zeroclaw-labs/zeroclaw/issues/5607)（04-10, 4个月）均标记 `status:no-stale` 但无最终结论
*   **超期 PR：** [#8561](https://github.com/zeroclaw-labs/zeroclaw/pull/8561)（06-30, XL）、[#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) Hailo-Ollama（07-17, XL）、[#9317](https://github.com/zeroclaw-labs/zeroclaw/pull/9317) zerocode 瞬态帧渲染（07-23, L）均 `needs-author-action` 超 4 周未推进
*   **依赖机器人堆积：** [#10196](https://github.com/zeroclaw-labs/zeroclaw/pull/10196) `rust-all group 47 updates` (XL, `risk:high`) 与大量小粒度修复 PR（如 [#10262](https://github.com/zeroclaw-labs/zeroclaw/pull/10262) RPC 重载断连、[#10218](https://github.com/zeroclaw-labs/zeroclaw/pull/10218) zerocode 子进程回收）并行待审，CI 压力大

> **建议：** 优先清空 [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 决策队列，对 P1 级 Windows 兼容 [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) 与安全策略 [#10164](https://github.com/zeroclaw-labs/zeroclaw/issues/10164) 指定 Owner；对已关闭但未合并的关键超时修复 #9403 尽快重提或说明废弃原因，避免重复劳动。

---
*免责声明：本日报基于过去 24h 的 GitHub 公开事件自动聚合与人工研判，不代表官方路线图承诺。风险与优先级以标签为准，链接直达原文。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 | 2026-08-23

### 1. 今日速览

过去 24 小时 PicoClaw 项目活跃度为 **中低水平，以存量维护为主**。共产生 8 条更新：Issues 2 条，PRs 6 条，无新版本发布。核心动向并非新功能冲刺，而是**集中的历史债务清理与稳定性修复**：4 个已关闭 PR 均为 3-6 个月前的陈年 PR（最早可追溯至 2 月），由系统在 2026-08-22 批量关闭。同时，社区暴露了 1 个新的高严重性 Telegram 限流 Bug，且 1 个已持续 1 个月的 Agent 核心 hangs 问题仍在持续讨论。项目健康度呈现“功能迭代暂停、专注稳定性与积压清理”的状态。

### 2. 版本发布

> 今日无新版本发布。`Latest Releases` 为空。

近 24 小时未有 `Release` Tag 推送，表明项目当前处于开发与修复周期，未进入发版窗口。

### 3. 项目进展

今日无 PR 被合并（Merged），但有 4 个长期悬置的 PR 被关闭（Closed），属于典型的 **Backlog Grooming（积压清理）** 动作，客观上减少了代码库的维护负担。值得关注的推进如下：

*   **已关闭 `fix(tools): honor exec timeout and boolean run options` [#3319](https://github.com/sipeed/picoclaw/pull/3319)** | 作者 @MrTreasure
    > 修复 `exec` 工具的核心执行缺陷：此前同步执行时无视用户传入的 `timeout` 参数，强制使用全局超时；同时 `background`/`pty` 参数在 Schema 中被错误声明为 string 类型。此 PR 修复了工具调用的可控性与类型正确性，对 Agent 工具链的稳定性有直接提升。

*   **已关闭 `fix(cron): preserve recurring job schedule after execution` [#1083](https://github.com/sipeed/picoclaw/pull/1083)** | 作者 @liugangjian | 修复 #1043
    > 修复 Cron 定时任务的严重回归：所有 `every_seconds` / `cron_expr` 类型的周期性任务在执行一次后会静默退化为一次性 `at` 任务。根因是 `executeJobByID` 中 `computeNextRun()` 返回 `nil` 时未正确处理。此为影响自动化场景的核心修复。

*   **已关闭 `skills: install/reinstall CLI and refactor into skillsCmd` [#714](https://github.com/sipeed/picoclaw/pull/714)** | 作者 @seanly | `type: enhancement, domain: skill`
    > 技能系统的 CLI 增强：支持 `repo@branch` 和子路径安装、新增 `reinstall --force` 强制覆盖、通过 GitHub Trees API 实现完整目录拉取。虽已被关闭未合并，但其功能设计已被后续实现部分吸收或替代，关闭标志着该技术路线的终结。

*   **已关闭 `fix: merge PR #1500 #1490 #1488 #1487 #1485` [#1545](https://github.com/sipeed/picoclaw/pull/1545)** | 作者 @xuwei-xy
    > 聚合类修复 PR，意图一次性合并 5 个早期修复。由于长期未合入且可能已被拆解合入，今日被批量关闭。

**整体评估：** 项目并未向前推进新功能，而是通过关闭 4 个 stale PR 完成了约 6 个月的技术债务出清。真正的向前进展依赖于两个仍处于 `OPEN` 状态的 PR 是否能合入。

### 4. 社区热点

今日社区讨论热度集中在 **Agent 核心稳定性** 上：

1.  **最热 Issue: [BUG] If the MCP server connection fails, the agent loop will hang [#3269](https://github.com/sipeed/picoclaw/issues/3269)** | 👍 1 | 💬 6
    > 过去 24 小时评论数最多的议题（6 条评论）。自 2026-07-20 提出后于昨日再次活跃，被标记为 `stale`。用户反馈当 MCP Server 连接失败时 `AgentLoop.Run` 直接抛错退出，导致整个 Picoclaw 聊天界面停止响应，必须重启。该问题影响所有依赖 MCP 的用户，属于可用性阻断级问题。

2.  **关联修复 PR: `Fix/mcp failure hangs agent loop` [#3337](https://github.com/sipeed/picoclaw/pull/3337)** | 作者 @kuzmichus
    > 直接响应 #3269 的修复方案。PR 描述指出 `ensureMCPInitialized` 失败不应导致 `AgentLoop` 整体退出。昨日与 Issue 同步更新，表明社区已自发形成“Issue -> Fix PR”的闭环，但该 PR 仍处于 `OPEN` 且被标 `stale`，尚未获官方 Review。

**诉求分析：** 社区核心痛点是 **Agent 容错能力不足**。用户期望 MCP 这类外部扩展的失败是可隔离、可降级的，而不应拖垮主循环。这反映了用户从“功能可用”向“生产级稳定”诉求的转变。

### 5. Bug 与稳定性

按严重程度排序：

| 严重性 | Issue | 状态 | 描述 | 是否有 Fix PR |
| :--- | :--- | :--- | :--- | :--- |
| **P0 / Critical** | [#3269](https://github.com/sipeed/picoclaw/issues/3269) MCP 连接失败导致 Agent Loop 挂死 | OPEN, stale | Agent 主循环无容错，MCP 不可用即导致聊天界面彻底无响应 | **有** -> [#3337](https://github.com/sipeed/picoclaw/pull/3337) |
| **P1 / High** | [#3343](https://github.com/sipeed/picoclaw/issues/3343) Tool feedback animation can edit a Telegram message indefinitely | OPEN | **昨日新报 Bug**。Agent turn 失败后，Telegram 的工具反馈动画仍以每 3 秒一次的频率无限调用 `editMessageText`，案例中已产生 **超 228,000 次** 编辑请求，最终触发 Telegram 服务端限流 `retry_after`。属于资源泄漏 + 外部 API 滥用风险。 | **无** |
| **P1 / High (已关闭)** | Cron 周期任务退化为单次任务 | CLOSED via [#1083](https://github.com/sipeed/picoclaw/pull/1083) | 定时自动化能力失效 | 已修复但 PR 未合并，需关注是否以其他方式合入 |
| **P2 / Medium (已关闭)** | Exec 工具超时参数失效 | CLOSED via [#3319](https://github.com/sipeed/picoclaw/pull/3319) | 工具调用超时不可控，影响长任务执行 | 已修复但 PR 未合并 |

### 6. 功能请求与路线图信号

今日无明确的 `type: feature request` 新 Issue，但从待合并 PR 可推断下一版本潜在方向：

*   **DeltaChat 通道重构 [#3222](https://github.com/sipeed/picoclaw/pull/3222)** | `refactor(deltachat): cleanup implementation, documentation -200LOC`
    > 作者 @trufae 提出的大型清理：移除废弃特性与过时测试、废弃基于密码的邮件配置（强制使用 jsonrpc secrets）、重命名 `invite_link` -> `join_invite_link` 并新增 `show_invite_link`。若合入，将是 **破坏性变更**，DeltaChat 用户需迁移配置方式。这预示官方有意精简和标准化多通道实现。

*   **Skills 生态完善 [#714](https://github.com/sipeed/picoclaw/pull/714)**
    > 虽已关闭，但其“支持 `repo@branch` 安装、reinstall 机制”的诉求已被社区验证，未来 Skills 的安装体验优化仍是路线图的重点，可能会以新的 PR 形式重提。

**判断：** 短期内路线图信号是 **“还债而非开新”**，下一版本大概率为以 MCP 容错、Telegram 限流修复、Cron/Tools 稳定性为核心的补丁版本，而非功能大版本。

### 7. 用户反馈摘要

基于 Issues 评论与描述提炼：

*   **痛点 1 - 容错性差导致服务不可用：** 用户 @ruiyigen 在 [#3269](https://github.com/sipeed/picoclaw/issues/3269) 中明确指出，MCP 作为可选扩展，其网络波动不应导致主聊天功能“假死”。这暴露了用户在生产环境部署时对高可用的核心关切。
*   **痛点 2 - 边界条件下的资源失控：** 用户 @raine 在 [#3343](https://github.com/sipeed/picoclaw/issues/3343) 中反馈的 22.8 万次无效编辑，说明用户已在高频使用 Telegram 通道，并对 Bot 的异常行为（被 Telegram 限流）非常敏感，担忧账号风险。
*   **痛点 3 - 配置与预期不符：** `exec timeout` 不生效、`cron` 不重复等问题，均属于“文档/参数承诺与实际行为不一致”，直接损害用户对工具链的信任度。
*   **满意度：** 社区表现出较强的自助修复意愿，@kuzmichus 已主动为最严重的 hangs 问题提交了修复 PR，体现了社区粘性。

### 8. 待处理积压

提醒维护者关注以下长期 `stale` 且重要的积压项，存在“贡献者热情流失”风险：

1.  **[OPEN] [stale] `Fix/mcp failure hangs agent loop` [#3337](https://github.com/sipeed/picoclaw/pull/3337)** | 创建于 2026-08-14，已 stale
    > **最高优先级积压**。直接修复 P0 级 Bug #3269，且已就绪。建议优先 Review 并合入，以解除 Agent 核心 hangs 风险。

2.  **[OPEN] [stale] `refactor(deltachat): cleanup implementation` [#3222](https://github.com/sipeed/picoclaw/pull/3222)** | 创建于 2026-07-03，已滞留 **51 天**
    > 代码量 -200LOC 的大型重构，包含文档与配置的破坏性变更。长期悬置可能导致与主分支产生巨大冲突，建议尽快决策是合入、拆分还是关闭。

3.  **[OPEN] [stale] [BUG] MCP hangs agent loop [#3269](https://github.com/sipeed/picoclaw/issues/3269)** | 创建于 2026-07-20，已滞留 **34 天**，评论 6
    > 长期未被官方正式回应的 Critical Bug，即使有社区 PR，也需官方确认修复方案并给出版本排期，以安抚社区。

> **健康度建议：** 昨日批量关闭 4 个超期 PR 是积极的积压清理信号。建议下一步将 Review 重心从“关闭旧 PR”转向“合入高价值的社区修复 PR（尤其是 #3337）”，以将社区贡献转化为项目稳定性收益。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 | 2026-08-23

### 1. 今日速览

过去24小时 QwenPaw 社区保持**中等活跃度**：共产生 6 条 Issues 更新（5 活跃/新开，1 关闭）与 6 条 PR 更新（均为待合并，0 合并）。无新版本发布，项目处于版本间歇期。核心特征为**“高讨论、低合并”**：用户侧反馈集中于前端体验与模型兼容性等细节打磨，而工程侧 6 个 PR 均处于审查/等待合并状态，短期交付节奏放缓。整体健康度平稳，但 PR 积压与前端稳定性 Bug 需重点关注。

> 数据窗口：2026-08-22 ~ 2026-08-23 | Releases: 0

### 2. 版本发布

**本日无新版本发布。**
最新稳定版仍为 `v2.1.0`，相关 Issues (#7212, #7213) 均在该版本复现。

### 3. 项目进展

**本日 0 个 PR 合并/关闭，项目主分支无实质性推进。**

唯一已关闭进展为 Issue 层面的历史需求闭环：
*   **已关闭 [#7043](https://github.com/agentscope-ai/QwenPaw/issues/7043) [enhancement] 启动时执行 `chcp 65001` 切换 UTF-8 环境：** 中文 Windows (GBK/936) 下 `shell.py` 以 `-NoProfile -NonInteractive` 启动 pwsh 导致无法继承 UTF-8 配置，该需求已于 2026-08-22 关闭，推测已通过环境初始化方案解决，提升中文系统稳定性。

**待合并进展（均在审）：**
本日 6 个 PR 均有更新，但尚未合并，代表下一版本潜在增量：
*   [#7187](https://github.com/agentscope-ai/QwenPaw/pull/7187) `fix(chat): disable thinking for title generation` - 禁用标题自动生成时的思考过程，防止推理文本污染标题，已补充回归测试。
*   [#7190](https://github.com/agentscope-ai/QwenPaw/pull/7190) `feat(qwenpaw-data): PyPI runtime path...` - 核心工程化改进，支持 `pip install qwenpaw[qwenpaw-data]` 无需源码检出即可运行，并提供 docker-compose 一键 GAAP Demo。
*   [#7054](https://github.com/agentscope-ai/QwenPaw/pull/7054) `feat(chrome): support remote bridge endpoint` / [#7050](https://github.com/agentscope-ai/QwenPaw/pull/7050) `feat(console): add per-cron-job model override picker` / [#6808](https://github.com/agentscope-ai/QwenPaw/pull/6808) `fix(console): show custom profile markdown files` - 分别解决远程浏览器桥接、定时任务模型覆盖、自定义人设文件隐藏问题。
*   [#7214](https://github.com/agentscope-ai/QwenPaw/pull/7214) `docs(readme): list Access Policy as the fifth security layer` - 补齐 README 安全特性文档，与功能表保持一致。

> **评估：** 工程侧处于 PR 评审堆积期，6 PR 平均等待 3-15 天未合并，需加速 Review 以释放版本产能。

### 4. 社区热点

按评论数与点赞数排序，本日最热议题为前端体验类：

**TOP 1 - [#7196](https://github.com/agentscope-ai/QwenPaw/issues/7196) [OPEN] 一直显示推理过程是严重的视觉干扰，希望可设置默认是否折叠** 
*   热度：评论 2 | 👍 1 | 24h 内持续活跃
*   诉求：用户关注工作流时，默认展开的 `thinking` 过程造成严重视觉干扰，请求增加“默认折叠”开关，仅在调试 Skill/Agent 时展开。提案对标 Hermes 的可配置化方案。
*   关联：与今日 PR [#7187](https://github.com/agentscope-ai/QwenPaw/pull/7187) 禁用标题生成的思考过程形成呼应，反映社区对“思考过程可控性”的强烈共识。

**TOP 2 - [#7201](https://github.com/agentscope-ai/QwenPaw/issues/7201) / [#7212](https://github.com/agentscope-ai/QwenPaw/issues/7212) 配对议题**
*   由同一作者 @xiaoka76 提出，分别讨论多媒体内联限制的精细化控制与崩溃容错，获得团队关注并已有 1 轮评论互动，体现专业用户对多模态稳定性的深度使用。

### 5. Bug 与稳定性

本日新增 3 个 Bug，按严重程度排序：

| 严重度 | Issue | 现象 | 影响 | Fix 状态 |
| :--- | :--- | :--- | :--- | :--- |
| **🔴 严重 - 崩溃** | [#7212](https://github.com/agentscope-ai/QwenPaw/issues/7212) Inlining an image whose pixel dimensions exceed limit crashes | 图像未超 2MB 但像素尺寸超限时，直接触发 `MODEL_EXECUTION_ERROR` 并中断整个会话 | 阻断性，流程无法自愈 | **无关联 Fix PR**，需新增优雅降级逻辑 |
| **🟠 中等 - 功能不可用** | [#7215](https://github.com/agentscope-ai/QwenPaw/issues/7215) The interface does not display after adding OpenRouter/OpenCode | 添加 OpenRouter / OpenCode 模型后端后，GUI 桌面端界面无法完整显示/白屏 | 影响多模型用户接入 | **无关联 Fix PR** |
| **🟡 轻微 - 体验** | [#7213](https://github.com/agentscope-ai/QwenPaw/issues/7213) 会话输出总是有无意义的空行 | v2.1.0 会话输出持续产生大量无意义空行，用户多次指令无效 | 影响可读性 | **无关联 Fix PR**，疑似提示词/渲染层问题 |

> 结论：3 个 Bug 均暂无对应修复 PR，稳定性风险敞口，需优先处理 #7212 的崩溃容错。

### 6. 功能请求与路线图信号

本日 2 个明确 Enhancement，均为高价值路线图信号：

1.  **思考过程可控性 - [#7196](https://github.com/agentscope-ai/QwenPaw/issues/7196)**
    *   需求：全局设置推理过程默认折叠/展开。
    *   信号强度：**高**。已有 PR [#7187](https://github.com/agentscope-ai/QwenPaw/pull/7187) 在标题生成场景率先实现 `disable_thinking=True`，证明团队已认可该方向，#7196 有望作为通用化配置在下个小版本落地。

2.  **多媒体限制精细化 - [#7201](https://github.com/agentscope-ai/QwenPaw/issues/7201) Separate per-provider max_image_bytes/video/audio caps**
    *   需求：将单一 `max_inline_media_bytes` 拆分为 `max_image_bytes` / `max_video_bytes` / `max_audio_bytes` 三项独立配置，并在 Provider 高级设置 UI 中暴露，默认值对齐各厂商文档。
    *   信号强度：**中高**。该需求与 Bug #7212 强关联，是系统性解决多模态兼容性的前置重构，符合企业级多 Provider 接入趋势，预计纳入 qwenpaw-data / 模型网关相关迭代。

3.  **已闭环需求 - [#7043](https://github.com/agentscope-ai/QwenPaw/issues/7043)**
    *   作为中文 Windows 适配的补强，已关闭代表该细分场景的 UTF-8 兼容性已被纳入主线。

### 7. 用户反馈摘要

提炼自 Issues 评论区真实痛点：

*   **视觉噪音是核心痛点：** 用户 @rerbin 明确表示“只有在调试时才需要看推理”，日常工作中展开的思考链是“严重的视觉干扰”，反映重度用户对信息密度与专注度的诉求。
*   **多模态“最后一公里”不稳定：** 专业用户 @xiaoka76 在 Docker 部署的 v2.1.0f1 环境下，验证了图像像素超限导致的硬崩溃，期望“gracefully degrade（优雅降级）而非直接报错”，说明当前错误处理过于粗暴。
*   **基础体验瑕疵累积：** “说了N次不要空行还是很多空行”(#7213)、“添加模型后界面不显示”(#7215) 均指向前端渲染与配置持久化的细节缺陷，虽不致命但持续消耗用户耐心。
*   **中文环境适配获好评：** #7043 的关闭解决了长期困扰中文 Win 用户的乱码问题，体现团队对本地化场景的响应。

### 8. 待处理积压

**PR 积压告警 - 合并停滞：**
*   [#6808](https://github.com/agentscope-ai/QwenPaw/pull/6808) `fix(console): show custom profile markdown files` - **已开放 15 天 (2026-08-07)**，修复自定义人设文件被隐藏的问题，后端已支持但前端过滤逻辑未放开，长期未合并影响自定义 Agent 用户。
*   [#7050](https://github.com/agentscope-ai/QwenPaw/pull/7050) / [#7054](https://github.com/agentscope-ai/QwenPaw/pull/7054) - **已开放 8 天 (2026-08-15)**，均为 `first-time-contributor` 且标记 `Under Review`，涉及 Cron 模型覆盖与 Chrome 远程桥接，已更新至 08-22 但仍未合并，存在贡献者等待过长风险。

**Issue 待响应：**
*   [#7196](https://github.com/agentscope-ai/QwenPaw/issues/7196) 虽热度最高但仍为 OPEN，无官方 `assigned` 或 `planned` 标签，建议维护者尽快确认是否纳入配置项路线图并给予回应。

> **维护建议：** 优先评审并合并 #6808 / #7050 / #7054 三个超期 PR，清理积压；对 #7212 崩溃类 Bug 建立 Hotfix 分支，避免影响 v2.1.0 口碑。

---
*生成说明：本日报基于 GitHub API 过去24小时增量数据自动分析，不代表官方立场。链接均为 GitHub 原址。*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报 · 2026-08-23

> 数据窗口：2026-08-22 00:00 - 2026-08-23 00:00 UTC | 数据源：github.com/NousResearch/hermes-agent

### 数据概览
- **Issues：364 条更新**（新开/活跃 303 | 已关闭 61）
- **PRs：500 条更新**（待合并 462 | 已合并/关闭 38）
- **Releases：0 个**

---

### 1. 今日速览

项目处于**超高活跃、重度承压**状态。单日 864 条 Issue/PR 更新，待合并 PR 积压高达 462 个，远超日均合并能力（38个），表明社区贡献与维护带宽严重失衡。核心矛盾集中在 **Desktop/网关/安装链路**：P1 级故障（会话加载失败、Debian/Termux 全量安装失败）与长会话体验崩溃成为舆论焦点。积极信号是持续 3 周的 **God File 拆分史诗 [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) 正式关闭**，标志架构债务阶段性清零，为后续稳定性修复腾出空间。整体健康度：**活跃度 A+ / 稳定性 C / 维护可持续性 C-**。

### 2. 版本发布

**本日无新版本发布。**

> 连续无发布但安装链已出现 P1 回归，建议关注下一版本对 `install.sh` / `uv.lock` / Windows Gateway 任务的集中修复。

### 3. 项目进展

过去 24 小时关闭 61 个 Issue / 38 个 PR，核心进展为历史债务的集中清偿：

*   **[COMPLETE] 大文件解耦史诗关闭 [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) (CLOSED, 78 评论)**：历时 17 天的 Repo 级 God File 分片任务 20/20 完成。站队策略“只切分、不回滚”正式落地，是 0.20.x 周期最重要的架构重构收口。
*   **Desktop 稳定性三连修复关闭**：
    *   [#38873](https://github.com/NousResearch/hermes-agent/issues/38873) 远程网关模式在校验成功后回弹到本地后端的闪断问题已标记 `sweeper:implemented-on-main`
    *   [#87857](https://github.com/NousResearch/hermes-agent/issues/87857) `Duplicate key toolCallId` 导致渲染进程白屏/崩溃循环已关闭
    *   [#90237](https://github.com/NousResearch/hermes-agent/issues/90237) `transparent: true` 无条件启用破坏 Windows 11 Snap/FancyZones 已关闭
*   **Agent/终端链路**：[#80989](https://github.com/NousResearch/hermes-agent/issues/80989) v0.20.0 terminal/clarify 工具结果被错误包裹/返回错误文件内容已关闭；[#87390](https://github.com/NousResearch/hermes-agent/issues/87390) Ghostty 终端下 Shift+字母输出 `[27;2;xx~` 已关闭（重复问题）。
*   **PR 侧唯一关闭的高评论项**：[#92536](https://github.com/NousResearch/hermes-agent/pull/92536) 镜像托管环境更新拒绝契约的 Phase 3 实现草案已关闭，转为正式实现，隶属于舰队更新可靠性跟踪 [#91277](https://github.com/NousResearch/hermes-agent/issues/91277)。

> 观察：合并/关闭的 38 个 PR 绝大多数未进入 Top20 热门榜，说明合并以中小修复为主，462 个待合并 PR 的头部仍为大型功能/重构，合并瓶颈明显。

### 4. 社区热点

按评论数/活跃度排序，最受关注的讨论：

| 排名 | Issue/PR | 标题 | 评论 | 信号 |
| :--- | :--- | :--- | :--- | :--- |
| 1 | [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) | Large-file decomposition: 20/20 done | 78 | 架构派胜利，关注后续是否引入防回退 CI 门禁 |
| 2 | [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) | Skills index is stale or degraded (29.8h) | 77 | 自动化基建告警，Skills Hub 文档已 29.8h 未更新，影响新用户发现 |
| 3 | [#89675](https://github.com/NousResearch/hermes-agent/issues/89675) | Desktop: no sessions load for any agent profile | 21 | **P1 阻断**，所有 profile 无法加载会话 |
| 4 | [#87093](https://github.com/NousResearch/hermes-agent/issues/87093) | Debian installation broken; uv.lock & npm install failed | 19 | **P1 阻断**，官方 install.sh 在纯净 Debian 13.6 失败 |
| 5 | [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) | Automated Nous integration is blocked | 19 | 上游 Enterkey 合并冲突阻塞 `cron/jobs.py` |
| 6 | [#83390](https://github.com/NousResearch/hermes-agent/issues/83390) | Auxiliary title_generation fails on DeepSeek 400 | 18 | DeepSeek 兼容性，`response_format` 不可用 |
| 7 | [#85125](https://github.com/NousResearch/hermes-agent/issues/85125) | Tracking: unified deadline layer (400+ timeout/hang) | 14 | 400+ 超时/挂死问题的结构性修复提案 |
| 8 | [#18715](https://github.com/NousResearch/hermes-agent/issues/18715) | Support remote Hermes agent with local tool execution | 14 / 👍26 | **最高赞需求**，远程大脑+本地执行 |
| 9 | [#91277](https://github.com/NousResearch/hermes-agent/issues/91277) | Fleet update reliability: one deployment plan | 13 | 安装/更新领域 30+ Issue 的总跟踪 |

**热点诉求分析**：社区已从“功能尝鲜”转向“可用性拷问”。Top10 中 5 个为 P1/P2 安装与 Desktop 阻断性 Bug，用户对“能装、能连、能不丢会话”的基础体验容忍度已触底。同时对 [#18715](https://github.com/NousResearch/hermes-agent/issues/18715) 远程+本地混合执行、[#85125](https://github.com/NousResearch/hermes-agent/issues/85125) 超时根治等架构提案给予高度关注。

### 5. Bug 与稳定性

按严重度排序，24h 内最活跃的缺陷：

**P1 阻断级**
*   [#89675](https://github.com/NousResearch/hermes-agent/issues/89675) **Desktop 全 profile 无法加载会话** - 后端启动时未携带 `--profile` 导致查询空。 **暂无关联 Fix PR，需紧急修复**。
*   [#87093](https://github.com/NousResearch/hermes-agent/issues/87093) **Debian 13.6 安装失败** - `uv.lock` 与 `npm install` 双失败。`install.sh` 链路回归。
*   [#90687](https://github.com/NousResearch/hermes-agent/issues/90687) **全设备 ERROR codes - Termux 安装失败** - 自 8.20 起所有全新 Termux 环境复现。疑似与上条同根因。**无 Fix PR**。

**P2 高优级**
*   [#87697](https://github.com/NousResearch/hermes-agent/issues/87697) Ollama 本地流在 ~1.5s 被客户端取消，触发 `<unused49>` token 循环。 **无 Fix PR，需复现**。
*   [#90473](https://github.com/NousResearch/hermes-agent/issues/90473) 长会话（~900条）`Show earlier messages` 分页体验被用户直言“设计愚蠢”。UX 缺陷。
*   [#75756](https://github.com/NousResearch/hermes-agent/issues/75756) Desktop 编辑历史消息失败 `session not found`，rewind 缺少 resume+retry。
*   [#84220](https://github.com/NousResearch/hermes-agent/issues/84220) Desktop Home 新建会话仍绑定旧项目文件夹/文件面板。
*   [#90879](https://github.com/NousResearch/hermes-agent/issues/90879) Bot Mode `notify_on_complete` 在父会话轮询器不活跃时被丢弃，导致 handoff 回复丢失。
*   [#38873](https://github.com/NousResearch/hermes-agent/issues/38873) [已关闭] 远程网关就绪后回弹本地 - 已修复。

**P3 及其他**
*   [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) 自动化风险：Skills 索引过期 `degraded`，工作流 `skills-index.yml` 需排查。
*   [#83390](https://github.com/NousResearch/hermes-agent/issues/83390) DeepSeek `title_generation` 因 `response_format` 报 400。
*   [#70942](https://github.com/NousResearch/hermes-agent/issues/70942) **Security**：`auth.json` 未加入 `build_write_denied_paths`，agent 可通过 `write_file` 自毁凭证。**高风险，需决策**。

**已有 Fix PR 覆盖的稳定性工作（待合并）：**
*   [#91628](https://github.com/NousResearch/hermes-agent/pull/91628) `fix(serve): skip MCP discovery when a live gateway already owns this home` -> 修复 [#91564] Desktop 重复拉起 MCP 导致资源冲突
*   [#84409](https://github.com/NousResearch/hermes-agent/pull/84409) `fix(update): escape parent job via schtasks` -> 修复 Windows 网关更新后无法拉起 (#84185)
*   [#92247](https://github.com/NousResearch/hermes-agent/pull/92247) `fix(gateway): keep the reconnect attention clock across a flapping platform` -> 解决 Telegram 等平台抖动时 NEEDS_ATTENTION 误报
*   [#92537](https://github.com/NousResearch/hermes-agent/pull/92537) `fix(cron): forward attach_to_session` -> 修复 agent 创建 cron 任务时参数静默丢失
*   [#92534](https://github.com/NousResearch/hermes-agent/pull/92534) `fix(agent): catch stop-as-length misreports` -> 修复 MiniMax/MLX 兼容层将截断误报为 stop

### 6. 功能请求与路线图信号

**下一版本高概率纳入：**
1.  **舰队更新可靠性 [#91277](https://github.com/NousResearch/hermes-agent/issues/91277)** - 已拆出 Phase 3 实现 [#92536](https://github.com/NousResearch/hermes-agent/pull/92536) 和 [#91316]，目标是为 local/多 profile/远程/镜像托管提供统一部署计划。当前 30+ Issue 指向同一领域，是 0.21 版本必做项。
2.  **Webhook 受信中继与 Profile 隔离 [#92511](https://github.com/NousResearch/hermes-agent/pull/92511)** - 允许受信 relay 切换到带工具上限的专家 profile，解决通用 relay 权限过大问题，已进入 PR 评审。
3.  **视觉模型粒度控制 [#92538](https://github.com/NousResearch/hermes-agent/pull/92538)** - 将 `supports_vision_tool_messages` 从 provider 级下沉到 model 级，精准修复部分模型不支持图文混排工具消息的问题。
4.  **Bot Mode 体验分层 [#91213](https://github.com/NousResearch/hermes-agent/pull/91213) / [#89995](https://github.com/NousResearch/hermes-agent/issues/89995)** - PR 将 DM 与群组分栏展示，Issue 要求将群聊能力从 Desktop 扩展到 Web Dashboard/Gateway，打通 Bot 协作闭环。

**中长期路线图信号（需决策）：**
*   [#18715](https://github.com/NousResearch/hermes-agent/issues/18715) **远程 Agent + 本地工具执行**（👍26，5月提出）- 呼声最高的架构需求，适合作为企业/隐私场景的核心卖点。
*   [#85125](https://github.com/NousResearch/hermes-agent/issues/85125) **统一 deadline 层** - 旨在根治 400+ 超时/挂死 Issue，已收敛为 7 类机制，分 4 阶段实施。
*   [#90866](https://github.com/NousResearch/hermes-agent/issues/90866) **状态可证明性架构** - 提出从源头到副作用全链路可观测、可验证，是近期多次线上事故的反思性提案。
*   平台对齐战役：[#79890](https://github.com/NousResearch/hermes-agent/issues/79890) WhatsApp 与 [#79564](https://github.com/NousResearch/hermes-agent/issues/79564) Discord 的全量 API v10 对齐。

### 7. 用户反馈摘要

**痛点集中爆发：**
*   **“装不上，用不了”**：Debian 用户 `curl | bash` 直接失败，Termux 用户全量 ERROR，Windows 用户更新后网关起不来。安装/更新被评价为“最不可靠的能力”（[#91277](https://github.com/NousResearch/hermes-agent/issues/91277) 原话）。
*   **“看不到，改不动”**：Desktop 用户反馈最激烈。900 条长会话被迫分页点击“显示更多”（[#90473](https://github.com/NousResearch/hermes-agent/issues/90473) 用户原话“哪个傻逼的设计”）、编辑历史消息直接 `session not found`（[#75756](https://github.com/NousResearch/hermes-agent/issues/75756)）、Home 与文件面板状态不一致（[#84220](https://github.com/NousResearch/hermes-agent/issues/84220)），均破坏核心聊天心智。
*   **“本地模型废了”**：Ollama 用户报告更新后所有本地请求在 1.5s 被取消并陷入 token 循环（[#87697](https://github.com/NousResearch/hermes-agent/issues/87697)），直接影响离线/隐私用户群。
*   **满意点**：对 God File 治理完成度表示认可；对 [#90237](https://github.com/NousResearch/hermes-agent/issues/90237) 等 Windows 体验细节修复有正向反馈。

**典型使用场景**：Tailscale 远程网关 + Windows Desktop 组合、Debian VPS 自托管、Ollama 本地推理、WhatsApp/Telegram 作为入口的 Bot Mode 协作。

### 8. 待处理积压

提醒维护者优先关注的长期未解/高风险项：

*   **超期未决 - 功能债**：[#18715](https://github.com/NousResearch/hermes-agent/issues/18715) 远程+本地执行（2026-05-02，112天未决，26赞）、[#31584](https://github.com/NousResearch/hermes-agent/issues/31584) memory 上下文被当作 user message 污染（5.24）、[#43008](https://github.com/NousResearch/hermes-agent/issues/43008) 会话静默过期无感知（6.09）
*   **超期未决 - 稳定性债**：[#85125](https://github.com/NousResearch/hermes-agent/issues/85125) 400+ 超时挂死（8.13）、[#70942](https://github.com/NousResearch/hermes-agent/issues/70942) auth.json 写保护缺失（7.24，安全边界）、[#66616](https://github.com/NousResearch/hermes-agent/issues/66616) Skills 索引过期（77评论，需立即修复 cron）
*   **PR 积压风险**：462 个待合并 PR 中，多个触及核心路径但长期无评论：[#68499](https://github.com/NousResearch/hermes-agent/pull/68499) delegation 生命周期重构（P2, blast-broad）、[#48069](https://github.com/NousResearch/hermes-agent/pull/48069) MCP keepalive 竞态（P2）、[#51565](https://github.com/NousResearch/hermes-agent/pull/51565) autopilot 引擎化（安全边界）。建议设立 PR 老化看板，对 >45 天的 P1/P2 PR 强制 triage。
*   **流程阻塞**：[#88584](https://github.com/NousResearch/hermes-agent/issues/88584) `cron/jobs.py` 冲突导致 Nous -> Enterkey 自动同步阻塞，影响下游仪表盘更新。

> **维护建议**：1) 冻结新功能一周，集中消化 P1 安装/Desktop 阻塞；2) 为 [#91277](https://github.com/NousResearch/hermes-agent/issues/91277) 舰队更新设立单一负责人，避免多 PR 各自打补丁；3) 清理 `sweeper:risk-*` 标签的自动化告警噪音，优先处理 `risk-session-state` 与 `risk-security-boundary`。

---
*生成说明：本日报基于过去 24 小时 364 Issues / 500 PRs 的增量数据，热门条目按评论数采样 Top 30/20，可能存在采样外合并。完整数据请查阅 GitHub Insights。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 · 2026-08-23

> 数据窗口：2026-08-22 00:00 - 23:59 UTC | 统计：Issues 更新 11 条 | PR 更新 15 条 | 新 Release 0 个

### 1. 今日速览

AstrBot 在 8月22日保持**高活跃度**，24小时内共产生 26 条有效更新，无版本发布但代码侧密集迭代。核心特征是 **Provider 层与稳定性修复成为绝对主线**：15 个 PR 中有 7 个标记 `area:provider`，聚焦视觉模型、STT 代理、模型统计和 SDK 兼容性。社区侧新开 5 个 Bug、3 个 Feature，插件生态持续贡献（2 个上架申请有进展），整体健康度良好，呈现“无发版、强打磨”的周期特征。

### 2. 版本发布

本周期无新版本发布。

> 当前最新稳定版仍为 `v4.27.x` 系列，近期待合并的修复多为 provider/core 边界校验类，预示下一版本将以稳定性和兼容性为主，无破坏性变更信号。

### 3. 项目进展

今日已合并/关闭 2 个 PR，均为轻量但高价值的补丁：

*   **[PR #9776](https://github.com/AstrBotDevs/AstrBot/pull/9776) [CLOSED] `fix(stt): honor Whisper provider proxy`** by @casama233
    *   修复 Whisper STT 未走 `provider.proxy` 配置的问题，将代理正确传递给 OpenAI client，并补充回归测试。同类修复 [PR #9777](https://github.com/AstrBotDevs/AstrBot/pull/9777) 仍为 OPEN 状态，疑为 9776 的重提/迭代版，最终以 9777 为准合并。
    *   意义：解决了使用代理/中转站用户语音转写失败的长期痛点。

*   **[PR #9764](https://github.com/AstrBotDevs/AstrBot/pull/9764) [CLOSED] `docs: add Parallel Search remote MCP example`** by @georgeatparallel
    *   文档层变更，为中英文 MCP 接入指南补充 Parallel Search 无需鉴权的 Streamable HTTP 配置示例，无运行时影响。

> **推进评估：** 虽无功能性大版本合并，但 13 个待合并 PR 已进入活跃审查，整体向前推进约 **30%** - 核心基础能力（代理、文件传输、会话隔离）的修复已就绪，等待集中合入。

### 4. 社区热点

按评论数/互动热度排序：

1.  **[Issue #8159](https://github.com/AstrBotDevs/AstrBot/issues/8159) [OPEN] [Plugin] astrbot_plugin_ai_summary | 评论 6**
    多模态 AI 视频总结插件（本地语音转写+视觉信息），5月12日提交，8月22日仍有活跃评论，反映社区对本地化、多模态总结类插件的持续关注。

2.  **[Issue #8217](https://github.com/AstrBotDevs/AstrBot/issues/8217) [CLOSED] [Plugin] astrbot_plugin_gpt_image | 评论 5**
    基于 `gpt-image-2` 的生图改图插件，已于本日关闭（推测已上架/审核通过），是今日唯一关闭的插件发布流程，热度仅次于 #8159。

3.  **[Issue #9573](https://github.com/AstrBotDevs/AstrBot/issues/9573) [OPEN] UMO 专属配置的 max_context_length 不生效 | 评论 2**
    用户指出 `astr_main_agent.py` 中 `or` 短路导致会话级上下文长度配置永远被全局配置覆盖，提供了精准根因定位，技术讨论价值高。

4.  **[Issue #9766](https://github.com/AstrBotDevs/AstrBot/issues/9766) [OPEN] Gemini使用中转站无法获取模型 | 评论 2**
    使用 sub2api 等中转时模型列表拉取失败，但直连官方 API 正常，暴露 OpenAI 兼容层对中转站的兼容缺陷。

5.  **[Issue #9744](https://github.com/AstrBotDevs/AstrBot/issues/9744) [OPEN] 将 AnySearch 添加为网页搜索工具 | 评论 2** + 对应 **[PR #9767](https://github.com/AstrBotDevs/AstrBot/pull/9767)**
    AnySearch 团队官方提议并已提交 PR，计划以 MCP/原生工具形式接入，呼应了 Agent 对实时/垂直搜索的强需求。

> **诉求洞察：** 插件生态热度不减，但技术讨论重心已从“新增功能”转向“Provider 兼容性与配置隔离”。

### 5. Bug 与稳定性

按严重程度排序：

| 优先级 | Issue | 描述 | 状态/修复进展 |
| :--- | :--- | :--- | :--- |
| **P0-高** | [#9778](https://github.com/AstrBotDevs/AstrBot/issues/9778) | 插件在 `on_agent_begin/on_llm_request` 清空 messages 后，框架无空校验，空请求直发 provider 报 400 | OPEN，无对应 PR，需在 provider 发送前增加统一出口校验 |
| **P0-高** | [#9771](https://github.com/AstrBotDevs/AstrBot/issues/9771) | DeepSeek 视觉模型 `deepseek-v4-flash-vision-exp` 在工具循环中因不支持的图片格式（非 webp/png/jpeg/gif）报 400 | OPEN，**已有修复 PR [#9780](https://github.com/AstrBotDevs/AstrBot/pull/9780)** - 拟在发送前归一化图片格式 |
| **P1-中高** | [#9573](https://github.com/AstrBotDevs/AstrBot/issues/9573) | UMO 会话级 `max_context_length` 配置失效，上下文无限增长 | OPEN，无 PR，已定位到 `config.provider_settings or ...` 的 `or` 短路问题 |
| **P1-中** | [#9766](https://github.com/AstrBotDevs/AstrBot/issues/9766) | Gemini 走中转站无法获取模型列表 | OPEN，无 PR |
| **P1-中** | [#9765](https://github.com/AstrBotDevs/AstrBot/issues/9765) | 关闭 LLM 后仍触发 `llm响应错误` | OPEN，无 PR，疑为事件总线未正确跳过 LLM 调用 |
| **P2-低** | [#9775](https://github.com/AstrBotDevs/AstrBot/issues/9775) | test 无效 Issue | OPEN，可关闭 |

**今日修复性 PR 集中爆发**，全部针对稳定性：
*   [#9780](https://github.com/AstrBotDevs/AstrBot/pull/9780) 视觉图片归一化
*   [#9777](https://github.com/AstrBotDevs/AstrBot/pull/9777) / [#9776](https://github.com/AstrBotDevs/AstrBot/pull/9776) Whisper 代理
*   [#9774](https://github.com/AstrBotDevs/AstrBot/pull/9774) 时区读取一致性 `Fixes #9706`
*   [#9773](https://github.com/AstrBotDevs/AstrBot/pull/9773) 拒绝重复 platform ID `Fixes #9742`
*   [#9772](https://github.com/AstrBotDevs/AstrBot/pull/9772) 分容器部署本地文件转 base64 `Fixes #9626`
*   [#9770](https://github.com/AstrBotDevs/AstrBot/pull/9770) 会话等待器按发送者隔离
*   [#9769](https://github.com/AstrBotDevs/AstrBot/pull/9769) 兼容 Anthropic SDK 1.0 `httpx2` 模块更名

> Provider 与 Platform 是今日最脆弱的两个域，修复覆盖率约 50%（6 个 Bug 中 1 个已有 PR）。

### 6. 功能请求与路线图信号

| 需求 | 来源 | 可能纳入下一版本概率 |
| :--- | :--- | :--- |
| **AnySearch 网页搜索提供方** | [Issue #9744](https://github.com/AstrBotDevs/AstrBot/issues/9744) + [PR #9767](https://github.com/AstrBotDevs/AstrBot/pull/9767) | **高** - 已有完整 PR，架构对齐 Exa/Brave，代码量 XXL，正在审查中 |
| **xAI Grok 订阅 OAuth 登录** | [Issue #9768](https://github.com/AstrBotDevs/AstrBot/issues/9768) | 中 - 用户期望摆脱 API Key，复用 Responses API，需新增 OAuth 流程，短期内需评估安全性 |
| **system_reminder 临时化** | [Issue #9779](https://github.com/AstrBotDevs/AstrBot/issues/9779) | **高** - 建议用 `mark_as_temp()` 避免 `<system_reminder>` 污染持久化历史，属于 core 数据洁癖类优化，易合入 |
| **StepFun ASR Provider** | [PR #8362](https://github.com/AstrBotDevs/AstrBot/pull/8362) | 中高 - 长期 PR，自 5月26日迭代至今，解决阶跃星辰特殊端点问题 |
| **插件市场列表视图+分页持久化** | [PR #6727](https://github.com/AstrBotDevs/AstrBot/pull/6727) | 中 - WebUI 体验优化，已讨论 3 个月 |
| **WebUI 多 IP/IPv6 绑定** | [PR #9002](https://github.com/AstrBotDevs/AstrBot/pull/9002) | 中 - 涉及 `dashboard.host` 配置变更 `str -> List[str]`，需考虑兼容性 |
| **模型调用统计补全** | [PR #9692](https://github.com/AstrBotDevs/AstrBot/pull/9692) | **高** - 补全 `Context.llm_generate()` 等旁路调用的统计，对 Dashboard 数据准确性至关重要 |

### 7. 用户反馈摘要

*   **痛点集中在“配置不生效”与“中转站兼容”**：#9573 直言 UMO 配置失效是“无限增长”；#9766 抱怨“sub2api 里能获取模型，AstrBot 里不行”，反映国内用户对代理/中转场景的强依赖。
*   **插件开发者体验**：#9778 暴露 Hook 能力过强但缺乏护栏，插件误操作可导致全链路 400，呼吁框架层兜底。
*   **视觉与多模态稳定性**：#9771 的 `unsupported image` 报错在工具循环中高频出现，用户对“偶发 400”的容忍度低。
*   **正面信号**：AnySearch、StepFun 等外部团队主动贡献 PR，说明 AstrBot 的 Provider/MCP 扩展机制已具备吸引力；Whisper 代理修复获得快速响应，用户 Dockerfile/代理环境下的可用性将提升。

### 8. 待处理积压

提醒维护者关注长期未决项：

*   **超 3 个月未合入的核心 PR：**
    *   [PR #6727](https://github.com/AstrBotDevs/AstrBot/pull/6727) `feat(extension): support list view...` - 创建于 2026-03-20，已更新至 08-22，仍为 OPEN，插件市场超 100+ 插件后的浏览痛点未解。
    *   [PR #7779](https://github.com/AstrBotDevs/AstrBot/pull/7779) `feat(sandbox): wait for Shipyard Neo readiness` - 创建于 2026-04-24，修复冷启动 `httpx.ReadTimeout`，已搁置近 4 个月。
    *   [PR #8362](https://github.com/AstrBotDevs/AstrBot/pull/8362) StepFun ASR - 创建于 2026-05-26，5 次更新后仍未合并。
*   **超 3 个月未闭环的插件发布：**
    *   [Issue #8159](https://github.com/AstrBotDevs/AstrBot/issues/8159) `astrbot_plugin_ai_summary` - 5月12日提交，6 条评论后仍为 OPEN，需明确审核状态。
*   **重复 PR 需清理：** [#9776](https://github.com/AstrBotDevs/AstrBot/pull/9776) 与 [#9777](https://github.com/AstrBotDevs/AstrBot/pull/9777) 为同一 Whisper 代理修复，建议关闭其一避免审查分流。

> **健康度建议：** 今日 13 个 OPEN PR 中 5 个为 2026-06 前创建，积压率 38%。建议在下个小版本中优先合入 #9770-#9774 等 XS/S 级稳定性修复，集中清理 Q2 遗留的 WebUI/沙箱类 Feature PR。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*