# OpenClaw 生态日报 2026-08-03

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-02 22:44 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-03

## 1. 今日速览

- 过去 24 小时项目活跃度极高：500 条 Issue 更新（新开/活跃 458，关闭 42），500 条 PR 更新（待合并 386，合并/关闭 114），并发布 1 个新 beta 版本。
- 新版本 v2026.7.2-beta.7 聚焦“状态安全与恢复”，引入隔离存储、崩溃可恢复 SQLite 快照、schema 升级数据丢失拒绝等机制，直接回应社区近期的数据安全类反馈。
- 最热 Issue 为 DeepSeek v4 Flash 静默回复失败（87 评论）与 Realtime 语音状态无限增长（49 评论），两者均为 P1 且暂无修复 PR，说明“静默失败”与“资源失控”是用户当前最敏感的痛点。
- 项目仍存在两个 P0 级长期问题：Gateway 内存泄漏（#91588，6 月创建）与 Schema 降级恢复导致状态 DB 被隔离/清空（#115421，已有 linked PR），稳定性治理压力较大。
- 整体判断：项目迭代速度快、社区反馈量大，但“可靠性/恢复路径”类积压严重，维护者需优先处置带 `no-new-fix-pr` / `needs-maintainer-review` 标签的高优问题。

## 2. 版本发布

### v2026.7.2-beta.7
- 链接：https://github.com/openclaw/openclaw/releases
- 核心主题：**State safety and recovery（状态安全与恢复）**
- 主要更新内容：
  - **Quarantine store**：主数据库损坏时将持久化数据移入隔离存储，避免二次破坏。
  - **Crash-recoverable SQLite snapshots**：SQLite 快照具备崩溃恢复能力，减小意外宕机导致的数据损坏窗口。
  - **Crash-durable filesystem publication**：文件系统发布过程做到崩溃持久，防止发布中途断电/崩溃造成半写入状态。
  - **Schema-upgrade data-loss rejection**：当 schema 升级可能造成数据丢失时拒绝执行，保护既有数据。
  - **Rollback-writer snapshot recovery**：通过回滚写入器快照机制，支持从失败升级/写入中恢复。

> **迁移注意事项**：版本说明暂未列出明确破坏性变更，但新增的 schema 升级保护可能使部分跨越多个大版本的环境在升级前需要人工确认；若升级后出现 `*.bak-schema*` / `*.moved-schema*` 隔离文件（参见 #115421），请勿直接删除，建议等待官方恢复指引。升级前务必备份 `state/openclaw.sqlite`。

## 3. 项目进展

今日可确认的 5 个合并/关闭 PR 均为稳定性或测试基建改进：

- **#118228 — test(agents): fixture harness provider discovery**（closed）
  收敛测试夹具中的 provider 发现逻辑，提升测试套件可维护性。
  https://github.com/openclaw/openclaw/pull/118228
- **#76666 — fix(memory, builtin backend): eagerly preload session transcript listeners at gateway startup**（closed）
  Gateway 启动时预加载内存索引监听器，降低首次内存检索延迟。
  https://github.com/openclaw/openclaw/pull/76666
- **#118130 — fix(failover): classify interrupted transport failures as timeouts**（closed）
  将中断流/过早关闭的传输失败归类到统一 timeout 路径，修复 cron 快速重试失效问题。
  https://github.com/openclaw/openclaw/pull/118130
- **#117697 — fix(whatsapp): preserve source direction for automatic reactions**（closed）
  自动反应现在保留规范化入站方向，修复 WhatsApp 自消息被错误回执的问题。
  https://github.com/openclaw/openclaw/pull/117697
- **#118064 — fix(line): skip invalid location messages before delivery**（closed）
  在送达 LINE API 前校验并丢弃缺少 title/address 的无效位置消息，避免通道报错。
  https://github.com/openclaw/openclaw/pull/118064

此外，维护者 @steipete 今日新开了多个大尺寸重构/性能 PR：`sessions.list` 读放大优化（#118207）、缓存机制统一化（#118262）、UI 页面生命周期收敛（#118243）、pending approvals 边界（#118252）、cron 多通道歧义拒绝（#118272）。若这些合并，将显著提升大规模部署下的性能与治理一致性。

## 4. 社区热点

- **#116277 — DeepSeek v4 Flash silent reply failure**（87 评论，P1）
  用户报告 DeepSeek v4 Flash 对 Telegram 群消息静默失败，仅返回通用 fallback “No reply was generated”，无日志与重试线索。高评论数反映出模型静默失败对生产使用影响极大。
  https://github.com/openclaw/openclaw/issues/116277
- **#116201 — Realtime voice work can retain unbounded provider and consult state**（49 评论，P1）
  实时语音会话的 provider/consult 状态缺少硬性上限，慢速或突发 provider 行为下会保留陈旧工作项，用户担忧资源耗尽与上下文膨胀。
  https://github.com/openclaw/openclaw/issues/116201
- **#115326 — Crash-loop breaker suppresses Discord/WhatsApp permanently**（25 评论，P1）
  崩溃循环熔断后，文档中的 `channels.start` 恢复路径因 WebSocket 1006 失败，用户被永久锁在通道外。恢复能力缺失是评论焦点。
  https://github.com/openclaw/openclaw/issues/115326
- **#91588 — Gateway Memory Leak: RSS grows from 350MB to 15.5GB**（22 评论，P0）
  经典内存泄漏问题，运行 2-3 天即被 OOM killer 杀死并进入 launchd 重启循环。用户已持续反馈近两个月。
  https://github.com/openclaw/openclaw/issues/91588

**热点诉求分析**：四个热帖共同指向“静默失败”和“状态失控”两大类问题——用户希望系统在出错时给出明确原因、可恢复路径，并对会话/内存/实时状态设置硬边界。

## 5. Bug 与稳定性

按严重程度排列，并标注修复 PR 状态：

### P0
- **#91588 Gateway 内存泄漏**（OOM 崩溃循环，6 月创建，22 评论）——暂无 fix PR（`no-new-fix-pr`）。
  https://github.com/openclaw/openclaw/issues/91588
- **#115421 Schema 降级恢复清空/隔离状态 DB**（cron 任务丢失，数据丢失风险，6 评论）——存在 linked PR，但 PR 长期未合并；且该 issue 同时带 `no-new-fix-pr` 标签，需维护者明确状态。
  https://github.com/openclaw/openclaw/issues/115421

### P1（重点）
- **#116277 DeepSeek v4 Flash 静默回复失败**（87 评论）——暂无 fix PR，等待维护者/产品决策。
  https://github.com/openclaw/openclaw/issues/116277
- **#115326 Crash-loop breaker 永久抑制 Discord/WhatsApp**（恢复命令失效，25 评论）——暂无 fix PR。
  https://github.com/openclaw/openclaw/issues/115326
- **#115908 Session transcript 投影 reconcile livelock**（阻塞主线程，所有通道停滞，12 评论）——已有 `source-repro`，暂无明确 fix PR。
  https://github.com/openclaw/openclaw/issues/115908
- **#53408 write/exec 工具参数在长对话后静默丢弃**（10 评论，2 👍）——暂无 fix PR，影响自动化脚本可靠性。
  https://github.com/openclaw/openclaw/issues/53408
- **#116010 所有持久会话上下文被限制为 128k**（与模型/配置无关，6 评论）——已有 linked PR，等待合入。
  https://github.com/openclaw/openclaw/issues/116010
- **#115700 chat.send 被 “thread switched branches” 持续拒绝**（stale 叶节点 ID 未刷新，6 评论）——已有 linked PR。
  https://github.com/openclaw/openclaw/issues/115700

### 平台/回归类
- **#105528 exec/read 工具在 Windows 上间歇性返回空输出**（v2026.6.x 回归，7 评论）——当前 `needs-info`，无修复 PR。
  https://github.com/openclaw/openclaw/issues/105528
- **#111498 主 agent 被 workspace-state 迁移卡住**（Anthropic 认证恢复后，7 评论）——`needs-live-repro`。
  https://github.com/openclaw/openclaw/issues/111498

## 6. 功能请求与路线图信号

- **成本与用量可见性**：`#13219 per-model usage logging` 与 `#51441 暴露实际后端模型` 的诉求持续存在；PR `#113920 show quota for every configured auth profile` 正在推进，可能纳入后续版本以解决成本跟踪盲区。
  https://github.com/openclaw/openclaw/issues/13219
  https://github.com/openclaw/openclaw/pull/113920
- **企业部署能力**：`#71058 多 Teams bot 支持` 反映大型组织需求；PR `#118067 Discord private provider endpoints` 今日新开，说明私有化/内网部署方向获维护者投入。
  https://github.com/openclaw/openclaw/issues/71058
  https://github.com/openclaw/openclaw/pull/118067
- **实时语音体验**：`#71195 macOS Talk Mode 接入 OpenAI Realtime` 希望将手机通话级低延迟带入桌面端，目前无关联 PR，但 `#116201` 的实时语音状态治理可能先行。
  https://github.com/openclaw/openclaw/issues/71195
- **UI/UX 改进**：`#113251 Webchat 图片查看`、`#75947 基于 UX 评分的界面重构` 代表用户对前端体验的集中诉求；PR `#117721 render live thinking agent events in WebChat` 若合并将减少“黑盒等待”感。
  https://github.com/openclaw/openclaw/issues/113251
  https://github.com/openclaw/openclaw/pull/117721
- **可定制性**：`#48918 用户级技能偏好/惯例支持` 与 `#51028 会话按最后有意义活动排序` 是提升日常使用效率的功能请求，目前均无关联 PR。
  https://github.com/openclaw/openclaw/issues/48918
  https://github.com/openclaw/openclaw/issues/51028

## 7. 用户反馈摘要

- **正面反馈**：#73537 用户称 OpenClaw 已成为“家庭和商务助手日常工作流的一部分”，感谢团队，同时请求增加“生产就绪稳定性标签”以帮助评估升级风险。
  https://github.com/openclaw/openclaw/issues/73537
- **对模型静默失败的不满**：#116277 用户指出 DeepSeek 静默失败后仅得到通用 fallback，无法区分是模型问题、配置问题还是上游故障，期望至少展示失败原因与 auto-retry 状态。
  https://github.com/openclaw/openclaw/issues/116277
- **数据安全焦虑**：#115421 用户因 schema 降级恢复机制导致 cron jobs 丢失，对“隔离/清理”策略表示强烈担忧，希望提供更保守的恢复路径。
  https://github.com/openclaw/openclaw/issues/115421
- **平台体验问题**：
  - #105528 Windows 用户遇到 exec/read 间歇空输出，认为是 v2026.6.x 回归。
    https://github.com/openclaw/openclaw/issues/105528
  - #60612 doctor 对 NVM node 的警告无法消除，用户反复尝试修改 plist 均被重新生成，体验受挫。
    https://github.com/openclaw/openclaw/issues/60612
- **中文用户场景**：#50490 Feishu 群聊中 `/activation mention` 切换无效，机器人仍响应所有消息，影响群聊秩序。
  https://github.com/openclaw/openclaw/issues/50490

## 8. 待处理积压

以下为长时间未得到有效推进/明确决策的重要 Issue 与 PR，建议维护者优先排期：

### Issues（按创建时间排序）
- **#50291 Plugin Hooks 缺少 trace context**（2026-03-19，P2，diamond lobster）——10 评论，持续影响分布式追踪实现。
  https://github.com/openclaw/openclaw/issues/50291
- **#53408 write/exec 工具参数静默丢弃**（2026-03-24，P1，2 👍）——10 评论，影响长会话自动化可靠性。
  https://github.com/openclaw/openclaw/issues/53408
- **#67777 Subagent 完成投递可丢失**（2026-04-16，P1）——11 评论，涉及直接 announce 超时/排空/孤立清理三个路径。
  https://github.com/openclaw/openclaw/issues/67777
- **#72015 active-memory 阻塞回复与 QMD 启动过载**（2026-04-26，P1，2 👍）——10 评论，多 agent 网关受影响明显。
  https://github.com/openclaw/openclaw/issues/72015
- **#91588 Gateway 内存泄漏**（2026-06-09，P0）——22 评论，至今无 fix PR，已影响生产部署数周。
  https://github.com/openclaw/openclaw/issues/91588

### Pull Requests（stale / 等待作者）
- **#64064 feat(anthropic): advisor tool support**（2026-04-10，stale，XL）——功能价值高，但长期无人推进。
  https://github.com/openclaw/openclaw/pull/64064
- **#72557 feat: PluginStatusProvider plugin API**（2026-04-27，waiting on author）——对插件生态有意义，卡在作者响应。
  https://github.com/openclaw/openclaw/pull/72557
- **#104690 fix(msteams): reset sessions on app removal lifecycle**（2026-07-11，waiting on author）——涉及 Teams 会话隐私边界，建议及时跟进。
  https://github.com/openclaw/openclaw/pull/104690

---

**项目健康度总结**：OpenClaw 迭代频率和社区参与度处于高位，但 P0/P1 可靠性问题积压（尤其是内存泄漏、静默失败、恢复路径失效）已开始消耗用户信任。建议维护者在下个稳定版本前优先关闭 P0 类故障，并对 `no-new-fix-pr` 标签下的高优 issue 给出明确的产品决策。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比报告

**报告日期：** 2026-08-03 | **数据窗口：** 过去 24 小时 | **覆盖项目：** OpenClaw、ZeroClaw、PicoClaw、QwenPaw、Hermes Agent、AstrBot

---

## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态正处于**从"功能铺设"向"可靠性/安全性收口"转型**的关键阶段。六个样本项目单日合计产生约 960 条 Issue 更新与 1087 条 PR 更新，活跃度极高，但社区讨论焦点高度集中在**静默失败、状态失控、代理隔离、审批流安全**四类问题上。头部项目（OpenClaw、Hermes）以极高吞吐推进迭代，中型项目（ZeroClaw、AstrBot）则同步进行安全审计与版本加固，小型项目（PicoClaw、QwenPaw）呈现"问题发现-当日修复"的快速响应模式。值得注意的共性信号是：**OpenAI 生态兼容（Chat Completions/Responses API）正在成为事实标准，而 Agent 间通信协议（A2A）开始进入路线图决策阶段**。

---

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃 458，关闭 42） | 500（待合并 386，合并/关闭 114） | v2026.7.2-beta.7（状态安全与恢复） | ⚠️ 高活跃但可靠性积压严重：2 个 P0（内存泄漏、Schema 恢复清空）无修复，beta 质量消耗信任 |
| **Hermes Agent** | 390（新开/活跃 326，关闭 64） | 500（待合并 331，合并/关闭 169） | 无 | ✅ B+：P1 级 Bug 全部清零、169 条 PR 集中清理；但 P2 存量偏大、2 条安全类 P2 无修复 PR |
| **ZeroClaw** | 50 | 50 | v0.8.4（262 commits / 49 贡献者，维护加固） | ⚠️ 安全审计期：2 条 S0 代理隔离漏洞已 accepted 但无修复 PR；RFC 密集但决策队列积压 |
| **AstrBot** | 15（新开/活跃 6，关闭 9） | 27（待合并 9，合并/关闭 18） | v4.27.0 + v4.27.1（Responses API、群组消息历史） | ✅ 良好：双版本/日发布，Issue 关闭率 60%，核心配置丢失已修复 |
| **PicoClaw** | 3 | 7（待合并 5，关闭 2） | 无 | ⚠️ 中等：#3311 当日提交修复值得肯定，但 5 条 PR（含安全加固）stale 一周，评审积压 |
| **QwenPaw** | 2 | 3（全部待合并） | 无 | ✅ 良好：反馈-修复闭环快；但 3 个修复 PR 均未合并，节奏需提速 |

---

## 3. OpenClaw 在生态中的定位

**OpenClaw 是生态的"功能广度 + 社区规模"双料参照系**，但其定位正在经受考验：

- **社区规模断层领先**：Issue/PR 双 500 的日更新量，是第二名 Hermes（390/500）的约 1.3 倍，是 ZeroClaw（50/50）的 10 倍、AstrBot（15/27）的 30 倍以上。热门 Issue #116277 单帖 87 评论，为全生态最高讨论热度。
- **技术路线差异**：OpenClaw 是唯一将**"状态安全与恢复"作为版本核心主题**的项目——v2026.7.2-beta.7 引入隔离存储、崩溃可恢复 SQLite 快照、schema 升级数据丢失拒绝、回滚写入器快照。这一路线精准切中生态当前最痛的"数据安全焦虑"，在架构理念上领先于其他项目。
- **覆盖面最广**：多通道（Telegram/WhatsApp/Discord/LINE/Feishu）、Realtime 语音、内存系统、技能体系均有涉足，是少数触及"全功能个人 AI 助手"定位的项目。
- **核心短板**：稳定性治理滞后于功能扩张。Gateway 内存泄漏（#91588，RSS 350MB→15.5GB）挂起近两个月无修复 PR，Schema 降级恢复清空状态库（#115421）涉及数据丢失却长期无合入。相比之下，Hermes 已实现 P1 清零，ZeroClaw 对安全问题当天 accepted。**OpenClaw 若不在下个稳定版前关闭 P0，其生态参照地位可能被 Hermes 的安全收敛节奏侵蚀。**

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目（具体诉求） |
|---|---|
| **① 静默失败可观测化** | **OpenClaw**（#116277 DeepSeek 静默回复失败，87 评论，仅返回通用 fallback）；**PicoClaw**（#3311 工具反复失败静默空转至 max_tool_iterations）；**ZeroClaw**（#9654 操作者拒绝被降级为无语义三词，模型自行编造原因）；**AstrBot**（#9497 工具重复调用 4 次）；**Hermes**（#73388 工具重试循环，已关闭）。**共同诉求：失败必须输出结构化原因、auto-retry 状态与终止路径，不能让用户面对"无回答"** |
| **② 资源与状态硬边界** | **OpenClaw**（#116201 Realtime 语音状态无限增长、#91588 内存泄漏至 OOM、#116010 会话上下文被固化为 128k）；**QwenPaw**（#6633/#6635 MB 级未压缩响应触发前端 30s 超时）；**Hermes**（#73211 桌面端状态指示器被移除，安全状态不可见）。**共同诉求：内存/上下文/实时状态需硬性上限，API 需分页压缩，UI 需实时暴露运行状态** |
| **③ 多代理隔离与审批流安全** | **ZeroClaw**（S0 #9646/#9647 任意 agent 可越权读写其他代理的会话与知识图谱）；**Hermes**（#76218 ANSI-C 引号绕过硬性审批线、#8040 凭据池跨进程 TOCTOU、#70942 auth.json 不受写保护）；**AstrBot**（#9459 SSL 验证静默降级至 CERT_NONE）；**PicoClaw**（#3297 远程执行默认禁用+逐次批准）。**共同诉求：per-agent 所有权范围、审批流不可绕过不可编造、凭据库写保护** |
| **④ 协议兼容与生态互操作** | **ZeroClaw**（#8603 Chat Completions 兼容 RFC，对接 Open WebUI/LobeChat/Continue.dev 等）；**AstrBot**（v4.27.1 Responses API 适配器 + xAI 迁移）；**PicoClaw**（#3298 AI Router 预设）；**Hermes**（#514 A2A 协议支持，25 评论/28 👍 后关闭）。**共同诉求：以 OpenAI 兼容协议为底线，以 A2A/MCP 为下一代互操作储备** |
| **⑤ 升级/恢复不丢数据** | **OpenClaw**（v2026.7.2 schema 升级拒绝执行、隔离存储、回滚快照；#115421 迁移致 cron 丢失）；**AstrBot**（#9512 插件 dict 配置静默清空）；**ZeroClaw**（v0.8.4 内存与 SOP 控制平面加固）。**共同诉求：升级前强制备份、可能丢数据时拒绝执行、必须提供回滚路径** |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 关键架构特征 |
|---|---|---|---|
| **OpenClaw** | 全功能个人 AI 助手（多通道 + Realtime 语音 + 内存 + 技能） | 技术爱好者、生产环境部署者 | 中心 Gateway + SQLite 存储隔离 + 快照恢复；beta 高频迭代，功能广度优先 |
| **Hermes Agent** | 桌面端 + 终端工具 + 消息平台；插件生态 | 桌面重度用户、开发者、脚本自动化 | 高 PR 吞吐（单日 500），安全加固与测试基建优先；A2A/插件钩子探索中 |
| **ZeroClaw** | 多代理自主智能体、审批流、知识图谱 | 企业/多租户、安全敏感场景 | Rust 实现；RFC 驱动架构演进，"轻量核心 + 外置集成"理念；当前处于安全审计深度期 |
| **AstrBot** | 群聊机器人框架（QQ/Telegram/Mattermost）、Skills 体系、RAG | 中文社区、群聊运维、二次开发 | 插件 + Skills + 知识库检索；版本节奏生态最快（双版本/日）；Responses API 率先落地 |
| **PicoClaw** | 轻量 WebUI 助手、OpenAI 兼容 provider | 嵌入式/极客、多语言用户（zh-TW/Czech） | 小型代码库、低维护成本；第三方服务商主动寻求集成（AI Router/Exa） |
| **QwenPaw** | 控制台 + Skills 管理 + 聊天历史 | Qwen 生态用户、Web 端重度用户 | 前后端一体；当前以性能优化（分页/压缩/字段精简）为核心矛盾 |

**核心差异总结**：OpenClaw 押注"广度 + 状态安全"，Hermes 押注"纵深 + 安全收敛"，ZeroClaw 押注"架构正确性 + 多租户安全"，AstrBot 押注"中文社区群聊 + 发布速度"，PicoClaw/QwenPaw 分别以"轻量"和"体验性能"立足缝隙市场。

---

## 6. 社区热度与成熟度

**活跃度分层（按单日 Issue+PR 总量）：**

| 层级 | 项目 | 日更新量 | 阶段特征 |
|---|---|---|---|
| **S 级（~1000）** | OpenClaw、Hermes Agent | 各 1000 / 890 | 生态头部，迭代吞吐极高；但 OpenClaw 处于"功能扩张期"，Hermes 已转入"质量巩固期" |
| **A 级（~100）** | ZeroClaw | 100 | 中型但密度高；"安全审计 + RFC 讨论 + 维护版本"三线并行的特殊阶段 |
| **B 级（~40）** | AstrBot | 42 | 成熟产品化阶段；双版本/日、关闭率高（60% Issue / 67% PR） |
| **C 级（<15）** | PicoClaw、QwenPaw | 10 / 5 | 小众/生态缝隙；响应速度好但有评审积压风险 |

**阶段判断：**

- **快速迭代期**：OpenClaw（beta 版本高频、功能驱动）、AstrBot（产品驱动、双版本/日）。
- **质量巩固期**：Hermes（P1 清零、存量 PR 大清理、安全修复持续合入）、ZeroClaw（安全审计 + 维护加固版本 v0.8.4 + RFC 收敛）。
- **早期/缝隙期**：PicoClaw（日更新量低但专精）、QwenPaw（以性能修复为主，功能路线待观察）。

---

## 7. 值得关注的趋势信号

**① 静默失败是智能体信任的头号杀手。** 全生态最有热度的问题（OpenClaw #116277，87 评论）与 PicoClaw 当日修复的 #3311、ZeroClaw #9654 指向同一现象：模型/工具失败时用户只得到"无回答"或系统编造的理由。**对开发者的启示**：失败链路必须输出结构化原因（错误码 + 重试状态 + 可恢复动作），这是进入生产环境的最低门槛。

**② 安全焦点从"通道安全"转向"代理间隔离与审批流"。** ZeroClaw 单日上报 2 条 S0 级越权漏洞（任意 agent 可读写其他代理的会话/知识），Hermes 报告审批绕过（#76218）与凭据竞争（#8040），AstrBot 修复 SSL 降级（#9459）。**对开发者的启示**：多代理场景下 per-agent 所有权范围、审批拦截点、凭据库写保护应作为默认安全基线，而非后置补丁。

**③ OpenAI 兼容协议成为生态接入门票，A2A 开始卡位。** ZeroClaw 的 Chat Completions RFC（14 评论）与 AstrBot 的 Responses API 落地（历时 8 个月的 #3888 关闭）表明：**接入 Open WebUI/LobeChat/OpenAI SDK 等既有工具链是用户刚需**。Hermes 关闭高热度 A2A Issue（28 👍）则预示 agent 间通信标准即将进入架构决策。**对开发者的启示**：新项目应优先实现 OpenAI 兼容端点，同时关注 A2A 与 MCP 的互补定位。

**④ 状态治理正在成为版本发布的必备项。** 内存泄漏（OpenClaw 15.5GB）、Realtime 状态无上限、128k 上下文固化、MB 级 API 响应触发前端超时——多个项目在同一天暴露"资源无边界"问题。**对开发者的启示**：内存/上下文/实时状态硬上限、列表接口分页压缩、UI 状态指标应前置设计。

**⑤ 数据可恢复性从"最佳实践"升级为"发布阻断项"。** OpenClaw 的 schema 升级数据丢失拒绝机制与 AstrBot 用户对配置静默清空的强烈反应（"AI 帮忙写的 issue，因为我完全摸不着头脑"）共同指向：**用户对静默数据丢失零容忍**。**对开发者的启示**：所有迁移路径必须支持备份、预检、拒绝执行与回滚四件套。

---

**一句话结论**：生态正在从"能跑就行"走向"值得信任"——**静默失败可观测化、代理隔离安全化、OpenAI 协议兼容化、状态资源有界化**是当前最确定的四个演进方向，OpenClaw 的"状态安全与恢复"路线恰好踩中主线，但需尽快用 P0 修复证明其可靠性承诺。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-03

> 数据来源：github.com/zeroclaw-labs/zeroclaw | 统计窗口：2026-08-02 → 2026-08-03

---

## 1. 今日速览

过去 24 小时项目保持高强度运转：**50 条 Issue 更新 + 50 条 PR 更新**，并正式发布 **v0.8.4 维护加固版本**（262 commits / 49 位贡献者）。值得警惕的是，8 月 1–2 日集中上报了一批**代理隔离与审批流安全缺陷**，其中两条达到 S0 级（数据泄露/安全风险），显示项目正在经历一轮深度的安全审计。社区讨论重心则落在 Chat Completions 协议兼容、Goal Mode、内存存储架构等大型 RFC 上，架构演进方向明确。6 条 PR 已合并/关闭，包括修复多个 RUSTSEC 漏洞的 Nostr 依赖更新（#9671），以及关闭了搁置已久的 CI 工件兼容问题（#9213 → #9095）。整体健康度良好：发布节奏稳定、安全问题响应迅速；但大量 risk:high / size:XL 级 PR 积压，维护者决策队列（#8692）压力较大。

---

## 2. 版本发布

### v0.8.4（2026-08-03 发布）

**定位**：维护与加固版本，涵盖 **262 个提交、49 位贡献者**，是近期规模最大的一次增量发布。

**主要更新方向**：
- **内存与 SOP 控制平面扩展**：对应 #9103（权威内存存储与可选增强连接器分离）等 RFC 的落地铺垫
- **Provider 与 Channel 可靠性提升**：多个通道（Telegram/Slack 等）行为修正
- **Sandbox 与凭据边界加固**：延续安全基线收口
- **桌面端与发布流水线改进**

**破坏性变更**：发布说明未披露明确 breaking changes；但仓库内 #7432 追踪器显示 v0.9.0 将集中处理 auth/security/gateway 破坏性变更，升级到 v0.9.x 前需关注该队列。

---

## 3. 项目进展

今日合并/关闭的 6 条 PR 中，已确认 5 条实质落地：

| PR | 内容 | 影响 |
|---|---|---|
| [#9213](https://github.com/zeroclaw-labs/zeroclaw/pull/9213) | fix(ci): preflight act artifact compatibility | 修复 CI 本地模拟（act）工件上传阻断问题，对应关闭 Issue [#9095](https://github.com/zeroclaw-labs/zeroclaw/issues/9095) |
| [#9671](https://github.com/zeroclaw-labs/zeroclaw/pull/9671) | fix(deps): update vulnerable Nostr crates | 升级 nostr 0.44.6→0.44.7、nostr-relay-pool 0.44.2→0.44.3，清除 RUSTSEC-2026-0225 系列漏洞 |
| [#9581](https://github.com/zeroclaw-labs/zeroclaw/pull/9581) | fix(docs): validate mdBook publication links | 阻止文档相对链接逃逸发布根目录，防止出版物链接失效 |
| [#9365](https://github.com/zeroclaw-labs/zeroclaw/pull/9365) | docs(observability): document logging operations boundaries | 明确 Observer 桥、实时广播与异步 JSONL 持久化的丢失/持久性边界 |
| [#9307](https://github.com/zeroclaw-labs/zeroclaw/pull/9307) | chore(deps): bump fluent-syntax 0.11.1→0.12.0 | 依赖常规升级 |

**综合评估**：今日合并在「CI 工具链修复」「安全漏洞清除」「文档基建」三个维度均有推进。结合 v0.8.4 发布，项目在**稳定性收口**上迈出了实质性一步，但功能类大型 PR（#8313、#8996、#9208）仍全部挂起，进展主要集中于维护面而非新功能面。

---

## 4. 社区热点

### 讨论最活跃的 Issues

| Issue | 评论数 | 核心诉求 |
|---|---|---|
| [#6808 RFC: Work Lanes, Board Automation, Label Cleanup](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) | 17 | 治理类 RFC：优化维护者工作流路由、看板自动化与标签体系，Rev.23 仍在推进 |
| [#8603 RFC: ZeroClaw Chat Completions profile](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) | 14 | 让 ZeroClaw 兼容 OpenAI Chat Completions 协议，接入 Open WebUI / LobeChat / Continue.dev / Aider / LangChain 等生态 |
| [#9103 RFC: separate authoritative memory storage from optional enrichment connectors](https://github.com/zeroclaw-labs/zeroclaw/issues/9103) | 11 | 拆分 `memory.backend` 的「权威存储」与「可选增强连接器（如 Lucid）」两种职责 |
| [#6165 RFC: Prefer a lighter ZeroClaw core through external integrations](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) | 10 | 将长尾集成迁移至 skills / MCP 服务器 / 插件，保持核心精简 |
| [#8303 RFC: Goal mode for bounded autonomous session work](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) | 9（👍 1） | 新增「目标模式」：一次性用户目标驱动的有界自主执行，支持完成/暂停/取消/预算耗尽 |

**趋势分析**：社区讨论高度集中在**架构层 RFC** 而非零散功能请求。三条主线清晰可见：
1. **生态兼容**——#8603 呼声最高，反映用户强烈希望用现有 OpenAI 生态工具直接驱动 ZeroClaw；
2. **核心瘦身**——#6165 与 #9103 共同指向「内核职责单一化、扩展能力外置化」；
3. **自主执行能力**——#8303 的 Goal Mode 与 #6954（定时任务走编排管线）表明用户需要更可靠的无人值守运行模式。

---

## 5. Bug 与稳定性

今日上报的 Bug 呈现明显的**安全审计特征**，多条达到 P1/S0 级别，按严重程度排列：

### 🔴 S0 — 数据泄露 / 安全风险

| Issue | 标题 | 状态 | 修复 PR |
|---|---|---|---|
| [#9646](https://github.com/zeroclaw-labs/zeroclaw/issues/9646) | Session/channel 读写工具缺乏 per-agent 所有权范围（sessions_list/history/send, discord_search） | accepted | 无 |
| [#9647](https://github.com/zeroclaw-labs/zeroclaw/issues/9647) | 知识图谱无 per-agent 归属，任意 agent 可读/改其他 agent 的知识 | accepted | 无 |

> 两条 S0 均指向**多代理隔离失效**：任何代理可通过模型自选的 `session_id`/`channel_id` 越权访问其他代理的会话与知识。这是多租户场景的致命缺陷，建议优先分配资源修复。

### 🟠 P1 — 高危行为/安全

| Issue | 标题 | 状态 | 修复 PR |
|---|---|---|---|
| [#9654](https://github.com/zeroclaw-labs/zeroclaw/issues/9654) | 真实的操作者拒绝到达模型时变成无语义的三个词，模型会自行编造原因 | blocked | 关联 [PR #9423](https://github.com/zeroclaw-labs/zeroclaw/pull/9423)（修复中，本 issue 为另一半范围） |
| [#9655](https://github.com/zeroclaw-labs/zeroclaw/issues/9655) | 审批卡片无位置信息，同一消息的多张待处理卡片无法区分 | accepted | 无 |
| [#9653](https://github.com/zeroclaw-labs/zeroclaw/issues/9653) | 插件 wasi:http 仅信任内置 webpki 根证书，不读 OS 信任库（#6528 已修复 provider 路径） | accepted | 无 |

### 🟡 P2 / S1 — 功能阻断

| Issue | 标题 | 状态 | 修复 PR |
|---|---|---|---|
| [#9651](https://github.com/zeroclaw-labs/zeroclaw/issues/9651) | 迁移后的裸 `vision_model_provider` 无法解析带 key 的 provider 凭据（如 openrouter），入站图片失败 | accepted | 无 |
| [#9652](https://github.com/zeroclaw-labs/zeroclaw/issues/9652) | `config set` 拒绝含连字符的 cron key 别名，而 `list`/`get` 可正常读取 | accepted | 无 |
| [#9656](https://github.com/zeroclaw-labs/zeroclaw/issues/9656) | Telegram 在审批等待期间持续发送 typing 指示器，被阻塞的 turn 看起来像正常工作 | accepted | 无 |
| [#9649](https://github.com/zeroclaw-labs/zeroclaw/issues/9649) | 测试 parity 行需在 registry seal 后翻转（#9319 跟进） | blocked | 无 |

### ✅ 今日关闭

- [#9095 bug(ci): act-local artifact server rejects upload-artifact v7 mime_type](https://github.com/zeroclaw-labs/zeroclaw/issues/9095) — 已由 [#9213](https://github.com/zeroclaw-labs/zeroclaw/pull/9213) 修复关闭。

**稳定性评估**：安全问题上报密集但响应机制完善（所有 P1 均已 accepted 并挂 follow-up 标签）；然而 S0 级两条尚无修复 PR，是当前最大的风险敞口。

---

## 6. 功能请求与路线图信号

### 高概率纳入下一版本

| 需求 | 依据 | 预判 |
|---|---|---|
| **Chat Completions 协议兼容**（[#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)） | 14 评论的高热度 RFC，生态诉求强烈 | 若 accepted，将是 v0.9.0 的重大功能，直接解锁 OpenAI 生态客户端 |
| **Goal Mode 有界自主执行**（[#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)） | 9 评论 + 👍；配套 PR [#8996](https://github.com/zeroclaw-labs/zeroclaw/pull/8996)（守护进程重载时保留运行中 goals）已在队列 | 功能方向已获维护者认可，落地可能性高 |
| **Telegram 多消息模式**（[#8445](https://github.com/zeroclaw-labs/zeroclaw/issues/8445)） | status:in-progress + accepted，且衍生出 pacing 细化 issue（[#9359](https://github.com/zeroclaw-labs/zeroclaw/issues/9359)） | 接近完成，属 v0.8.x 小版本候选 |
| **ZeroCode 命令描述符统一**（[#9172](https://github.com/zeroclaw-labs/zeroclaw/issues/9172)） | 对应 PR [#9329](https://github.com/zeroclaw-labs/zeroclaw/pull/9329) 已 open（size:L, risk:high） | 依赖维护者 review 排期 |

### 安全加固小步快跑（今日 PR 信号）

- [#9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635) 修复 `git -C` 全局选项后子命令解析（P1）
- [#9636](https://github.com/zeroclaw-labs/zeroclaw/pull/9636) 接受 Windows 空设备 `nul` 作为安全重定向目标（P1）
- [#9678](https://github.com/zeroclaw-labs/zeroclaw/pull/9678) 强化 Git shell 策略参数过滤（risk:high）
- [#9674](https://github.com/zeroclaw-labs/zeroclaw/pull/9674) 修复 eviction 期间 session 队列序列化竞态

以上四条均为 8 月 2 日新开的小型安全修复 PR，预计随 v0.8.5 或并入 v0.9.0 安全批次（[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) 追踪器）。

### 轻量级请求

- [#9628](https://github.com/zeroclaw-labs/zeroclaw/issues/9628) Blog 缺少 RSS/Atom feed（P2, docs）——低成本高用户感知的改进，建议快速跟进。

---

## 7. 用户反馈摘要

**真实使用场景痛点：**

- **演示/交付场景受阻**（[#9652](https://github.com/zeroclaw-labs/zeroclaw/issues/9652)）：贡献者在 demo 展台上按文档流程重排 cron 任务时，`config set` 与 `config list/get` 行为不一致，「TOML 加载器接受、调度器正常运行、CLI 读取正常，唯独写入被拒绝」——工具链一致性影响现场演示可信度。

- **审批流信任危机**（[#9654](https://github.com/zeroclaw-labs/zeroclaw/issues/9654)）：操作者真实的「拒绝」到达模型时被降级为无语义的三个词，**模型随即自行编造拒绝原因**——这直接损害用户对审批机制的信任，属体验与安全双重问题。

- **审批卡片可辨识性差**（[#9655](https://github.com/zeroclaw-labs/zeroclaw/issues/9655)）：单条消息触发多个工具调用时产生多张审批卡片，操作者「在点击之前无法区分哪张对应哪个工具」——高频操作场景下的可用性缺陷。

- **误导性的状态指示**（[#9656](https://github.com/zeroclaw-labs/zeroclaw/issues/9656)）：Telegram 等待审批期间持续显示 typing 动画，让被阻塞的 turn 看起来像在正常工作——用户无法区分「思考中」与「等待操作者」。

**正面反馈：**

- [#9628](https://github.com/zeroclaw-labs/zeroclaw/issues/9628) 用户评价博客 "quite nice"，仅提出增加 RSS 订阅的请求，反映项目对外内容质量获认可。

**生态诉求：**

- [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) 列出 Open WebUI、LobeChat、Continue.dev、Aider、LangChain、OpenAI SDK 等一串客户端，说明用户希望在**既有 AI 工具链中无缝接入 ZeroClaw**，而非被迫使用专用通道。

---

## 8. 待处理积压

### ⚠️ 长期未决的重要 RFC（>2 个月）

| Issue | 创建时间 | 挂起时长 | 说明 |
|---|---|---|---|
| [#6165 轻量化核心 RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) | 2026-04-27 | ~98 天 | 10 评论，需 maintainer 裁决（needs-author-action） |
| [#6808 Work Lanes 治理 RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) | 2026-05-20 | ~75 天 | 17 评论全库最高，Rev.23，仍在 ratification |
| [#6954 定时任务走编排管线 RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/6954) | 2026-05-26 | ~69 天 | 关联 5 个同类 bug（#6037/#6105/#6648/#6632/#6686），修复价值高 |

### 🔧 大型 PR 等待合并（均 risk:high / size:XL）

| PR | 创建时间 | 状态 | 阻塞点 |
|---|---|---|---|
| [#8313 feat(skills): 默认 compact 注入](https://github.com/zeroclaw-labs/zeroclaw/pull/8313) | 2026-06-25 | open，XL | 需 maintainer review |
| [#8996 fix(goal): daemon reload 保留运行中 goals](https://github.com/zeroclaw-labs/zeroclaw/pull/8996) | 2026-07-11 | open，XL，needs-author-action | 等待作者响应 |
| [#9208 fix(runtime): 停止 agent 循环中工具 schema 深拷贝](https://github.com/zeroclaw-labs/zeroclaw/pull/9208) | 2026-07-20 | open，XL，P1，needs-author-action | 性能优化 + MCP 语义修正，等待作者/维护者 |

### 📋 维护者协调信号

- [#8692 Maintainer decision queue](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)（8 评论）：RFC 与设计问题的维护者决策队列已形成积压，多个 RFC 处于 needs-maintainer-review 状态（#8621、#9397、#8603 等），建议维护者优先清点该队列，避免架构决策持续阻塞下游实现。
- [#9468 Dependabot 批量升级 PR](https://github.com/zeroclaw-labs/zeroclaw/pull/9468)（45 个 rust 依赖更新，正在 rebase）：依赖维护自动化运转良好，但单 PR 体量过大可能拉长 review 周期，可考虑拆分。

---

**总结**：ZeroClaw 当前处于「大规模安全审计 + 架构 RFC 密集讨论 + 维护版本发布」三线并行的阶段。短期最大风险是 S0 级代理隔离漏洞尚无修复 PR；中期看点是 Chat Completions 兼容与 Goal Mode 两个高热度 RFC 是否能进入 v0.9.0 路线图；维护者需优先处理决策队列积压，避免 RFC 空转。

*本报告由 AI 分析师基于公开 GitHub 数据自动生成，仅供项目健康度参考。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报 — 2026-08-03

## 1. 今日速览

过去 24 小时内，项目整体活跃度中等：3 条 Issue 处于开放/活跃状态，7 条 PR 有更新（5 条待合并、2 条已关闭），无新版本发布。今日最核心的事件是生产级 Bug #3311（agent 在工具反复失败时静默空转直至 `max_tool_iterations`，用户得不到任何回答）在报告当天即收到了对应修复 PR #3312，社区响应速度值得肯定。另一方面，包括安全加固 #3297、Exa 搜索 provider #3299 在内的多条 PR 已存在一周且被标记为 `stale`，尚未获得维护者合并，评审积压是当前项目健康度的主要风险点。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

- **zh-TW 繁体中文本地化落地**：PR #3261（Add zh-TW locale and Traditional Chinese translations）已关闭。若已合入主干，则 WebUI 和文档的繁体中文使用体验将得到系统性完善，是今日实质性的项目进展。  
  https://github.com/sipeed/picoclaw/pull/3261

- **自动生成 PR 被关闭**：PR #3310（Feat/auto pr）状态为已关闭，提交摘要为 “picoclanker did this”，推断为自动化流程生成的 PR，无实质业务影响。  
  https://github.com/sipeed/picoclaw/pull/3310

- **重要修复已提交、尚待合并**：针对 #3311 的修复 PR #3312（fix(agent): stop turn early on repeated identical tool failure）于今日提交，直接从根因上打破“工具反复失败→重新调用 LLM→再次失败”的死循环。该修复尚未被评审合并。  
  https://github.com/sipeed/picoclaw/pull/3312

## 4. 社区热点

今日没有出现评论数特别高的讨论，最活跃的仍是两条带 `stale` 标记、昨日有更新的条目：

- **Issue #3298**：AI Router 项目维护者本人提出，希望 PicoClaw 将 AI Router 作为 OpenAI 兼容 provider 预设，而非仅靠用户手动填写 `api_base`。这代表了第三方服务商主动寻求深度集成的信号。  
  https://github.com/sipeed/picoclaw/issues/3298

- **Issue #3294**：用户对 `/list models` 命令的实际行为提出质疑——命令名和描述都指向“列出所有已配置模型”，但实际只显示当前模型。  
  https://github.com/sipeed/picoclaw/issues/3294

此外，Bug #3311 与其修复 PR #3312 在今日同日出现，形成了“发现问题→当天提交修复”的事件热点，说明社区贡献者对稳定性问题反应迅速。

## 5. Bug 与稳定性

- **高严重度 | #3311（已提交修复 PR）**：agent 在工具以相同错误反复失败时，会静默循环至 `max_tool_iterations`，用户全程收不到任何最终回复。报告者在生产环境的 Telegram 场景中实测触发（执行 `git` 命令时无凭据）。修复 PR #3312 已就绪，等待维护者评审。  
  https://github.com/sipeed/picoclaw/issues/3311  
  https://github.com/sipeed/picoclaw/pull/3312

- **中严重度 | #3294（无修复 PR）**：`/list models` 只显示当前模型而不是所有已配置模型，与命令描述“Configured models”不符。功能不符合用户预期，直接影响 Telegram 端多模型管理效率。  
  https://github.com/sipeed/picoclaw/issues/3294

- **稳定性加固 | #3295（修复 PR 待合并）**：修复 `SplitMessage` 在开 fence 的 info string 超过 `maxLen` 时可能永久悬挂的问题，已附带回归测试。属于边界条件触发的悬挂类隐患。  
  https://github.com/sipeed/picoclaw/pull/3295

## 6. 功能请求与路线图信号

- **AI Router provider 预设（#3298）**：由 AI Router 维护者提出，且明确表示“愿意以项目名义贡献此功能”。由于 PicoClaw 已支持 OpenAI 兼容 provider，这属于低成本、高收益的集成增强，进入下一版本的可能性较大。  
  https://github.com/sipeed/picoclaw/issues/3298

- **Exa 原生 web search provider（#3299）**：为 `tools.web` / `web_search` 增加 Exa provider，支持现有 `d`/`w`/`m`/`y` 时间范围过滤。当前 PR 仍开放，若合并将丰富内置搜索工具矩阵。  
  https://github.com/sipeed/picoclaw/pull/3299

- **安全边界加固（#3297）**：该 PR 包含三项较大改动——远程发送者元数据改为独立 user-role envelope、远程 exec 默认禁用并需要逐次批准、配置 schema 升级到 v4。这属于潜在破坏性变更，路线图上需要明确是否放入下一个 minor 或 major 版本。  
  https://github.com/sipeed/picoclaw/pull/3297

## 7. 用户反馈摘要

- **生产环境 Telegram 用户（#3311）**：向 agent 发送执行 `git` 命令的消息后，长时间收不到任何回复；排查认为是工具失败后 agent 陷入静默重试循环。这类问题会直接摧毁用户对 agent 可用性的信任。  
  https://github.com/sipeed/picoclaw/issues/3311

- **PicoClaw v0.3.1 多模型用户（#3294）**：已配置多个模型，但 `/list models` 只展示当前模型，用户对此感到困惑——“If the command is named /list models and its description is 'Configured models', I expected it to list all configured models”。  
  https://github.com/sipeed/picoclaw/issues/3294

- **AI Router 维护者（#3298）**：认可 PicoClaw 可以通过通用 `openai` provider 将 `api_base` 指向 AI Router，但希望提供命名预设以便用户按名称选择 AI Route，同时透露愿意亲自贡献该功能。  
  https://github.com/sipeed/picoclaw/issues/3298

## 8. 待处理积压

以下 PR/Issue 已存在一周且被 `stale` 标记，建议维护者优先处理：

- **PR #3297（安全加固）**：07-26 创建，安全相关改动长期搁置会增加远程攻击面风险，建议优先评审。  
  https://github.com/sipeed/picoclaw/pull/3297

- **PR #3295（SplitMessage 悬挂修复）**：稳定的 bugfix，已带回归测试，合并成本低。  
  https://github.com/sipeed/picoclaw/pull/3295

- **PR #3299（Exa 搜索 provider）**：新功能 PR，长时间未处理可能打击社区贡献积极性。  
  https://github.com/sipeed/picoclaw/pull/3299

- **PR #3296（捷克语 i18n 补全）**：本地化收尾类 PR。  
  https://github.com/sipeed/picoclaw/pull/3296

- **Issue #3298 / #3294**：虽然昨日有更新，但仍处于 `stale` 状态，需要维护者确认后续行动方案，避免 stale bot 后续自动关闭有效诉求。  
  https://github.com/sipeed/picoclaw/issues/3298  
  https://github.com/sipeed/picoclaw/issues/3294

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报（2026-08-03）

## 1. 今日速览
过去 24 小时内，QwenPaw 项目保持中等活跃度：新增 2 个 Bug Issue，提交 3 个修复 PR，无新版本发布。核心热点集中在慢网络环境下控制台页面因 API 响应体过大（MB 级、未压缩）触发 30 秒前端超时，导致 Skills 页面和聊天历史无法加载。社区已针对性地提出分页与压缩方案，并有 PR 待合并。整体项目处于“问题发现-快速修复”的良性循环中，但需关注合并节奏。

## 2. 版本发布
无。

## 3. 项目进展
今日无 PR 被合并或关闭，但值得注意的是有 3 个新 PR 被提交，均处于待合并状态，若能合并将显著提升项目稳定性与体验：

- [#6636 fix(chats): add pagination to chat history and enable GZip compression](https://github.com/agentscope-ai/QwenPaw/pull/6636) — 为聊天历史接口增加分页，并启用 GZip 压缩，以解决长会话导致 1MB+ 响应超时的问题。
- [#6634 fix(skills): exclude full content from skill list endpoints](https://github.com/agentscope-ai/QwenPaw/pull/6634) — 从技能列表接口中剔除完整 SKILL.md 内容，减小有效载荷。
- [#6632 fix(skills): preserve plugin-sourced skill tags across reconcile cycles](https://github.com/agentscope-ai/QwenPaw/pull/6632) — 修复插件来源技能标签在重启后丢失的问题。

以上 PR 分别对应 2 个高优先级 Bug 和 1 个中等级 Bug，体现了社区对性能与数据一致性的快速响应。

## 4. 社区热点
今日讨论最活跃的是两个高度相关的 Bug Issue，均来自同一用户 @Moonlit-Pages，各获得 1 条评论：

- [#6635 [Bug]: Console pages fail to load on slow networks](https://github.com/agentscope-ai/QwenPaw/issues/6635) — 控制台页面（聊天历史）在慢网络下无法加载，根因是单次响应包含全部消息且未压缩。
- [#6633 [Bug]: Skills / Skill Pool pages fail to load on slow networks](https://github.com/agentscope-ai/QwenPaw/issues/6633) — Skills 页面因技能列表内嵌完整内容导致响应过大，触发 30 秒超时。

用户诉求非常明确：希望 API 返回更轻量、支持分页/压缩，避免前端硬编码超时。这两个 Issue 已经获得了对应的修复 PR，说明社区反馈被快速接纳。

## 5. Bug 与稳定性
按严重程度排序：

| 严重程度 | Issue | 描述 | 修复 PR |
|---|---|---|---|
| 高 | [#6635](https://github.com/agentscope-ai/QwenPaw/issues/6635) | 聊天历史接口返回完整消息列表（MB 级、无压缩），慢网络下前端 30 秒超时，控制台页面无法加载 | [#6636](https://github.com/agentscope-ai/QwenPaw/pull/6636) 待合并 |
| 高 | [#6633](https://github.com/agentscope-ai/QwenPaw/issues/6633) | 技能列表接口嵌入完整 SKILL.md 内容，负载过大导致 Skills / Skill Pool 页面超时 | [#6634](https://github.com/agentscope-ai/QwenPaw/pull/6634) 待合并 |
| 中 | （引用 #6537，由 PR #6632 修复） | 来自插件的技能标签在 reconcile 过程中被移除，重启后标签丢失 | [#6632](https://github.com/agentscope-ai/QwenPaw/pull/6632) 待合并 |

两个高严重度 Bug 均与网络性能和前端超时配置相关，影响部分用户的基本功能使用，需要优先处理。

## 6. 功能请求与路线图信号
虽然今日没有显式的 Feature Request，但从 Bug 描述中可提取出两个明确的技术演进信号：

- **API 响应分页与压缩**：用户遇到的大负载问题直接催化了 PR #6636 的 GZip 压缩和分页设计，这很可能成为后续版本的标准能力。
- **列表接口精简字段**：PR #6634 通过排除技能全文来减小列表载荷，暗示更广泛的设计模式——列表接口应只返回概要信息，详情需单独请求。

这些改进若被合并，将提升 QwenPaw 在弱网环境下的可用性，并可能被纳入下一版本（如 2.0.2）。

## 7. 用户反馈摘要
- 用户 @Moonlit-Pages 报告了 QwenPaw 2.0.1 在慢网络下控制台页面（Skills、Skill Pool、Chat）大面积加载失败的问题。
- 反馈中指出“某个 workspace 是否失败与它的 payload 大小精确相关”，说明问题可复现性强，且与数据量线性相关。
- 用户对问题定位非常专业，直接指出了 API 响应未压缩、前端固定 30 秒超时这两个关键矛盾，为社区提供了清晰的修复方向。
- 目前没有看到对功能的不满，但对性能有较高期待，希望官方优化大列表场景的加载策略。

## 8. 待处理积压
当前需维护者优先关注的待处理项：

- **待合并 PR（3 个）**：
  - [#6636](https://github.com/agentscope-ai/QwenPaw/pull/6636) — 聊天历史分页 + GZip
  - [#6634](https://github.com/agentscope-ai/QwenPaw/pull/6634) — 技能列表排除全文
  - [#6632](https://github.com/agentscope-ai/QwenPaw/pull/6632) — 插件技能标签持久化
  
  这些 PR 直接解决今日报告的高/中严重度 Bug，建议尽快 review 并合并。

- **新开 Issue（2 个）**：尚未被关闭，等待修复验证或与对应 PR 关联。

- **长期未响应**：今日数据中没有明显长期未响应的重要 Issue/PR，但 #6537（由 #6632 修复）的历史问题值得在合并后关闭并记录。

> 项目健康度总体良好，社区反馈及时，修复方案针对性强。只要保持当前的响应节奏，版本迭代效率可期。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 · 2026-08-03

> 数据窗口：2026-08-02（过去 24 小时） | 数据源：GitHub Issues / PR

## 01 今日速览

过去 24 小时 Hermes Agent 维持极高活跃度：

- **Issues**：390 条更新（新开/活跃 326，关闭 64）
- **PR**：500 条更新（待合并 331，已合并/关闭 169）
- **Releases**：0 个

项目当前处于大版本间期的高强度迭代阶段：维护者一口气关闭了 169 条 PR，并清掉了两条 P1 级 Bug（[#37968](https://github.com/NousResearch/hermes-agent/issues/37968) cron 审批环境污染、[#31550](https://github.com/NousResearch/hermes-agent/issues/31550) Discord 线程会话绑定）。社区关注度极高的 A2A 协议支持 Issue（[#514](https://github.com/NousResearch/hermes-agent/issues/514)，评论 25 / 👍 28）也在今日关闭。不过 326 条新开/活跃 Issue 中仍以 Bug 报告为主，P2 级安全漏洞（[#8040](https://github.com/NousResearch/hermes-agent/issues/8040)、[#76218](https://github.com/NousResearch/hermes-agent/issues/76218)）尚无修复 PR，331 条待合并 PR 的积压也需要持续关注。

## 02 版本发布

今日无新版本 Release。

## 03 项目进展

今日无大规模功能 release，但从关闭的 Issue/PR 看，多个方向的修复已取得实质推进：

**已关闭的重要 Issue（通常意味着修复已合入或已完成决策）**

- [#514](https://github.com/NousResearch/hermes-agent/issues/514) A2A（Agent-to-Agent）协议支持（[CLOSED] type/feature）：社区讨论时间最长的功能议题之一（25 评论 / 28 👍）今日关闭——Google 推动的 agent 间通信开放标准（Apache 2.0，Linux Foundation），与 MCP 互补。具体是已实现、已否决还是转为路线图决策，需查看关闭说明；就状态而言，这一高热度议题在今日完成阶段性收敛。
- [#37968](https://github.com/NousResearch/hermes-agent/issues/37968) fix(cron): isolate gateway approvals from environment pollution（[CLOSED] type/bug, **P1**）：CVSS 6.3/7.0 的审批隔离缺陷关闭，cron 自动审批不再受环境变量污染影响。
- [#31550](https://github.com/NousResearch/hermes-agent/issues/31550) Discord create_thread 不绑定新会话（[CLOSED] type/bug, **P1**）：线程创建后工具调用仍绑定父频道的问题关闭，Discord 频道内会话延续工作流恢复可用。
- [#46260](https://github.com/NousResearch/hermes-agent/issues/46260) Windows 安装器失败（[CLOSED] type/bug, P2）：npm install exit code 1 中断 desktop 阶段安装，Windows 新用户接入的关键阻塞已清除。
- [#75598](https://github.com/NousResearch/hermes-agent/issues/75598) 更新不稳定（[CLOSED] type/bug, P2）：多 gateway/profile 冲突导致的更新后不稳定问题已收敛。
- [#73388](https://github.com/NousResearch/hermes-agent/issues/73388) 工具重试循环（[CLOSED] type/bug, P2）：非延迟工具被错误路由到 tool_search/desribe/call 的重复尝试问题已修复。
- [#67001](https://github.com/NousResearch/hermes-agent/issues/67001) macOS Desktop 唤醒抢焦点（[CLOSED] type/bug, P3）：M4 MacBook 合盖唤醒后窗口抢占前台已修复。

**已关闭的 PR**

- [#77128](https://github.com/NousResearch/hermes-agent/pull/77128) fix(search): 恢复 rg 引擎零匹配探测——修复 #77102 引入的 early-return 导致零匹配提示失效的回归。
- [#77133](https://github.com/NousResearch/hermes-agent/pull/77133) test(search): 为零匹配提示接线补回归测试，防止该逻辑再被静默删除。
- [#77126](https://github.com/NousResearch/hermes-agent/pull/77126) test(agent): 隔离 `~/.claude` 凭据——消除 CI 测试对开发者本机凭据文件的隐式依赖，使测试套件可移植。
- [#32842](https://github.com/NousResearch/hermes-agent/pull/32842)、[#29876](https://github.com/NousResearch/hermes-agent/pull/29876)、[#53509](https://github.com/NousResearch/hermes-agent/pull/53509) 贡献者归属映射补充，修复 release 自动归属检查失败。

**整体判断**：项目重心已从“新功能铺设”转向“安全/稳定性加固 + 存量 PR 审查”。搜索工具、凭据隔离、平台（Discord/Windows/macOS）修复是今日高频关键词；A2A 这类大功能 Issue 的关闭预示路线图可能进入架构决策阶段。

## 04 社区热点

| Issue/PR | 讨论热度 | 背后诉求 |
|---|---|---|
| [#514](https://github.com/NousResearch/hermes-agent/issues/514) A2A 协议支持 | 评论 25 / 👍 28 | 社区对 agent 间互操作标准兴趣极高；“MCP 解决工具，A2A 解决协作”的定位清晰，期望补充远程 agent 发现、通信与互操作能力 |
| [#46260](https://github.com/NousResearch/hermes-agent/issues/46260) Windows 安装器失败 | 评论 11 | 安装器在 desktop 阶段 npm install 退出码 1，直接阻断 Windows 新用户；AI 辅助撰写报告也说明用户愿意配合提供日志 |
| [#73211](https://github.com/NousResearch/hermes-agent/issues/73211) Desktop v0.19.0 状态指示器消失 | 评论 9 / 👍 5 | UI 回归：context-window、YOLO、终端/工具状态指示器被移除，影响安全状态可观测性，用户明确要求恢复 |
| [#37968](https://github.com/NousResearch/hermes-agent/issues/37968) cron 审批环境污染 | 评论 9 | 安全讨论：审批过程受环境变量污染可导致越权，社区对 CVSS 评分与修复方案均有深入讨论 |
| [#40239](https://github.com/NousResearch/hermes-agent/issues/40239) pt-BR 语言支持 | 评论 9 / 👍 3 | 巴西葡萄牙语用户请求桌面端 i18n；后端/TUI 已有 357+ 行 pt.yaml 翻译，只差桌面端接入 |
| [#17199](https://github.com/NousResearch/hermes-agent/issues/17199) DeepSeek 自定义端点被覆盖 | 评论 9 | 使用火山方舟等自定义 OpenAI 兼容端点时，模型名校验和 base_url 覆盖导致不可用，影响国内第三方 provider 用户 |

## 05 Bug 与稳定性

### P1 级（今日已全部关闭 ✅）

- [#37968](https://github.com/NousResearch/hermes-agent/issues/37968) cron 审批环境污染（已关闭）
- [#31550](https://github.com/NousResearch/hermes-agent/issues/31550) Discord 线程会话绑定（已关闭）

### P2 级（仍 OPEN，按风险排序）

**安全类**

- [#76218](https://github.com/NousResearch/hermes-agent/issues/76218) bash ANSI-C 引号（`$'...'`）可绕过硬性审批线，`rm -rf /` 可静默执行（创建于 08-01，无 fix PR）——建议优先处理
- [#8040](https://github.com/NousResearch/hermes-agent/issues/8040) 凭据池 TOCTOU 跨进程竞争——CLI/gateway/子代理并发读写 pool JSON，可能错误发放凭据（创建于 04-12，无 fix PR）

**稳定性/功能类**

- [#72589](https://github.com/NousResearch/hermes-agent/issues/72589) 桌面后端首屏 `/api/status` 挂起 20–60s（feishu 适配器 import lark_oapi）
- [#76762](https://github.com/NousResearch/hermes-agent/issues/76762) terminal lifecycle_guard 对绝对路径可执行文件抛 `ValueError: embedded null byte`，阻断命令
- [#75655](https://github.com/NousResearch/hermes-agent/issues/75655) managed-runtime 构建失败：`uv sync` 同时传 `--locked` 与 `--no-config`，失败被误报为 smoke-test
- [#17199](https://github.com/NousResearch/hermes-agent/issues/17199) DeepSeek provider 模型归一化破坏自定义端点（火山方舟等）
- [#26058](https://github.com/NousResearch/hermes-agent/issues/26058) Discord `free_response_channels` 下 `auto_thread` 被禁用
- [#38053](https://github.com/NousResearch/hermes-agent/issues/38053) macOS launchd 更新不重启全部 profile gateway
- [#65274](https://github.com/NousResearch/hermes-agent/issues/65274) Desktop 项目级新会话在 Windows 回退到 home cwd
- [#38048](https://github.com/NousResearch/hermes-agent/issues/38048) url_safety 误拦截 DNS64/NAT64（`64:ff9b::/96`）地址
- [#20143](https://github.com/NousResearch/hermes-agent/issues/20143) WhatsApp 自聊天模式丢弃用户自己的群消息
- [#29023](https://github.com/NousResearch/hermes-agent/issues/29023) WhatsApp 回复检测因设备后缀不匹配失效
- [#70647](https://github.com/NousResearch/hermes-agent/issues/70647) `-z/--oneshot` 静默忽略管道 stdin，违背“Intended for scripts / pipes”文档
- [#72064](https://github.com/NousResearch/hermes-agent/issues/72064) oneshot 无法跳过内置 memory 注入，`--ignore-rules` 被静默忽略
- [#41490](https://github.com/NousResearch/hermes-agent/issues/41490) agent 重复调用被阻止的工具，缺重新提示

### P3 级（值得关注）

- [#70942](https://github.com/NousResearch/hermes-agent/issues/70942) `auth.json` 不在 `build_write_denied_paths` 中，agent 可自行删除/覆盖凭据库（安全）
- [#2765](https://github.com/NousResearch/hermes-agent/issues/2765) Hindsight 插件在缺少 `HINDSIGHT_API_URL` 时静默注册 0 个工具
- [#73211](https://github.com/NousResearch/hermes-agent/issues/73211) Desktop v0.19.0 移除状态指示器（UI 回归）
- [#75960](https://github.com/NousResearch/hermes-agent/issues/75960) Desktop CJK IME 预编辑文本绘制位置错误

## 06 功能请求与路线图信号

**等待合入/审查的新功能 PR**

- [#77041](https://github.com/NousResearch/hermes-agent/pull/77041) feat(terminal): 可恢复截断——超长终端输出写入 `~/.hermes/cache/terminal-output/`，模型可通过 search_file 找回全量
- [#77104](https://github.com/NousResearch/hermes-agent/pull/77104) feat(skills): grounded-citations 增加事实核查模式（verbatim 证据 + verify 门禁）
- [#77122](https://github.com/NousResearch/hermes-agent/pull/77122) feat(desktop): html 代码块内联渲染为沙箱 iframe（opaque origin、allow-scripts、forced-light）
- [#75008](https://github.com/NousResearch/hermes-agent/pull/75008) feat(gateway): 转发 Hermes 会话标识到 LiteLLM，便于上游关联会话
- [#58524](https://github.com/NousResearch/hermes-agent/pull/58524) feat(plugins): `classify_api_error` 插件钩子，把 provider 错误兼容逻辑交给插件
- [#21504](https://github.com/NousResearch/hermes-agent/pull/21504) feat: Discord 实时语音模式（OpenAI Realtime + 静音帧保活）——涉及 20+ 组件，PR 体量大，审查周期长

**用户功能请求（可能进入下一版本）**

- [#40239](https://github.com/NousResearch/hermes-agent/issues/40239) pt-BR 桌面端语言支持——i18n 基础设施已具备，接入成本低
- [#16004](https://github.com/NousResearch/hermes-agent/issues/16004) 达到工具迭代上限后有界自动继续——长任务场景需求明确
- [#20765](https://github.com/NousResearch/hermes-agent/issues/20765) 浏览器 dashboard / SSH 远程场景下的语音模式（WebRTC 音频采集）
- [#31371](https://github.com/NousResearch/hermes-agent/issues/31371) gateway 自动重置后紧凑会话连续性 handoff——减少长驻 bot 的“失忆”

**信号判断**：A2A Issue 的关闭可能为新协议支持让路；terminal 可恢复截断、HTML 沙箱渲染等均为“增强 agent 工作记忆/输出可追溯性”方向，预计在 0.20 版本周期内进入主分支。

## 07 用户反馈摘要

- **安装/更新体验是最大不满点**：Windows 安装器在 desktop 阶段失败（[#46260](https://github.com/NousResearch/hermes-agent/issues/46260)）；macOS 多 profile 场景下 `hermes update` 只重启当前服务（[#38053](https://github.com/NousResearch/hermes-agent/issues/38053)）；连续更新后“whole program unstable”，多 gateway 配置相互冲突（[#75598](https://github.com/NousResearch/hermes-agent/issues/75598)）。
- **桌面端可观测性诉求强**：用户明确表示状态指示器“important for monitoring runtime state and safety status”，移除后难以确认上下文占用与 YOLO 安全状态（[#73211](https://github.com/NousResearch/hermes-agent/issues/73211)）；macOS 唤醒抢焦点打断工作流（[#67001](https://github.com/NousResearch/hermes-agent/issues/67001)，已修复）。
- **安全顾虑集中爆发**：`$'...'` ANSI-C 引号可让 `rm -rf /` 绕过审批（[#76218](https://github.com/NousResearch/hermes-agent/issues/76218)）；`auth.json` 不在写保护路径内，agent 可自我销毁凭据（[#70942](https://github.com/NousResearch/hermes-agent/issues/70942)）；跨进程凭据池并发是真实风险（[#8040](https://github.com/NousResearch/hermes-agent/issues/8040)）。
- **平台差异化适配不足**：WhatsApp 群自聊天消息丢失（[#20143](https://github.com/NousResearch/hermes-agent/issues/20143)）、Discord 线程不迁移会话（[#31550](https://github.com/NousResearch/hermes-agent/issues/31550)，已修复）、DeepSeek + 火山方舟组合不可用（[#17199](https://github.com/NousResearch/hermes-agent/issues/17199)）等平台问题集中。
- **CLI 细节影响脚本自动化**：`-z` oneshot 不读 stdin 违背“Intended for scripts / pipes”文档（[#70647](https://github.com/NousResearch/hermes-agent/issues/70647)），`--ignore-rules` 被静默忽略（[#72064](https://github.com/NousResearch/hermes-agent/issues/72064)），managed-runtime 构建失败不可自愈（[#75655](https://github.com/NousResearch/hermes-agent/issues/75655)）。

## 08 待处理积压

以下 Issue/PR 长期未解决且影响较大，建议维护者优先关注：

| 创建时间 | 编号 | 标题 | 优先级 | 备注 |
|---|---|---|---|---|
| 2026-03-24（132 天） | [#2765](https://github.com/NousResearch/hermes-agent/issues/2765) | Hindsight 插件静默跳过工具注册 | P3 | 无 fix PR，排障困难 |
| 2026-04-12（113 天） | [#8040](https://github.com/NousResearch/hermes-agent/issues/8040) | 凭据池 TOCTOU 跨进程竞争 | P2 | 安全风险，无 fix PR |
| 2026-04-29（96 天） | [#17199](https://github.com/NousResearch/hermes-agent/issues/17199) | DeepSeek 模型归一化/自定义端点被覆盖 | P2 | 影响国内第三方 provider |
| 2026-05-05（90 天） | [#20143](https://github.com/NousResearch/hermes-agent/issues/20143) | WhatsApp 自聊天群消息被丢弃 | P2 | 无 fix PR |
| 2026-05-06（89 天） | [#20765](https://github.com/NousResearch/hermes-agent/issues/20765) | 语音模式（WebRTC 音频采集） | P3 | 需求呼声高（👍4） |
| 2026-05-07（88 天） | PR [#21504](https://github.com/NousResearch/hermes-agent/pull/21504) | Discord 实时语音模式 | P3 | 巨型 PR，需 owner 决策 |
| 2026-05-15（80 天） | [#26058](https://github.com/NousResearch/hermes-agent/issues/26058) | Discord auto_thread 被禁用 | P2 | 无 fix PR |
| 2026-05-20（75 天） | [#29023](https://github.com/NousResearch/hermes-agent/issues/29023) | WhatsApp 回复检测失败 | P2 | 无 fix PR |
| 2026-05-24（71 天） | [#31371](https://github.com/NousResearch/hermes-agent/issues/31371) | 自动重置后会话连续性 handoff | P3 | 长驻 bot 场景 |
| 2026-06-03（61 天） | [#38053](https://github.com/NousResearch/hermes-agent/issues/38053) | macOS update 不重启所有 profile | P2 | 多 profile 用户受阻 |
| 2026-06-06（58 天） | [#40239](https://github.com/NousResearch/hermes-agent/issues/40239) | pt-BR 桌面端语言 | P3 | 讨论多，接入成本低 |
| 2026-07-04（30 天） | PR [#58524](https://github.com/NousResearch/hermes-agent/pull/58524) | classify_api_error 插件钩子 | P3 | 等待 owner 决策 |
| 2026-07-31（3 天） | [#75655](https://github.com/NousResearch/hermes-agent/issues/75655) | managed-runtime `uv sync` 参数冲突 | P2 | 新报，阻塞 runtime 构建 |

---

**健康度总评：B+（良好）**

社区活跃度高、P1 Bug 清零、安全修复持续合入是积极信号；但 P2 级 Bug 存量大、两条安全类 P2 尚无 fix PR、331 条 PR 待合并，以及多条约 100 天未关闭的积压 Issue，建议下一迭代加大清理力度。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-08-03

## 1. 今日速览

AstrBot 在过去 24 小时内保持高活跃度：共 15 条 Issue 更新（6 条新开/活跃，9 条已关闭）、27 条 PR 更新（9 条待合并，18 条已合并/关闭），并发布了 v4.27.0 和 v4.27.1 两个新版本。v4.27.1 引入了 OpenAI Responses API 独立提供商适配器（含 OpenAI 与 DeepSeek 模板），v4.27.0 则新增了持久化群组消息历史与 LLM 检索工具，同时合并了 xAI 迁移至 Responses API、知识库检索质量优化等多项重要 PR。项目整体处于快速迭代、版本密集发布阶段，社区反馈响应及时，项目健康度良好。

- 新版本发布：2 个（v4.27.1、v4.27.0）
- Issue 关闭率：60%（9/15）
- PR 合并/关闭率：67%（18/27）
- 今日最热 Issue 评论数：9 条（[#9508](https://github.com/AstrBotDevs/AstrBot/issues/9508)）

## 2. 版本发布

### v4.27.1 — 2026-08-02

[查看 Release](https://github.com/AstrBotDevs/AstrBot/releases)

**新增功能：**
- 为 `astrbot init` 命令添加 `-y` / `--yes` 参数，允许无人值守部署跳过安装确认提示（[#9514](https://github.com/AstrBotDevs/AstrBot/pull/9514)）
- 新增独立的无状态 Responses API 提供商，兼容 OpenAI 和 DeepSeek 的 OpenAI 兼容端点

**Bug 修复与优化：**
- 修复 WebUI 深色模式下侧栏文字颜色异常问题（对应 [#9521](https://github.com/AstrBotDevs/AstrBot/issues/9521)，修复 PR 见 [#9523](https://github.com/AstrBotDevs/AstrBot/pull/9523)）
- 修复插件配置中 dict 类型键在重载后被清空的数据丢失缺陷（[#9516](https://github.com/AstrBotDevs/AstrBot/pull/9516)，关联 Issue [#9512](https://github.com/AstrBotDevs/AstrBot/issues/9512)）
- 延后 TTS 音频文件和 QQ 官方 Tencent Silk 转换文件的清理时机，避免事件结束即被删除（[#9506](https://github.com/AstrBotDevs/AstrBot/pull/9506)）
- 修复 Dashboard 清理缓存后 `tool_images` 目录被删除导致工具图片无法写入的问题（[#9490](https://github.com/AstrBotDevs/AstrBot/pull/9490)）

**破坏性变更：** 无

**迁移注意事项：** 无特殊迁移要求，升级前建议备份插件配置。

---

### v4.27.0 — 2026-08-02

[查看 Release](https://github.com/AstrBotDevs/AstrBot/releases)

**新增功能：**
- 新增持久化群组消息历史，支持可配置保留期限、标准化存储，并提供 LLM 工具用于搜索和检索当前群组的消息（[#9465](https://github.com/AstrBotDevs/AstrBot/issues/9465)）
- 新增托管的本地 Shell 会话，支持增量输出

**破坏性变更：** 无

**迁移注意事项：** 升级后 WebChat 超长历史会话可能不显示在新版 UI 的对话记录中，已追踪于 [#9474](https://github.com/AstrBotDevs/AstrBot/issues/9474)。

## 3. 项目进展

今日合并/关闭了 18 条 PR，以下为关键进展：

| 领域 | PR | 说明 |
|------|-----|------|
| **Provider** | [#9515](https://github.com/AstrBotDevs/AstrBot/pull/9515) | 新增独立的 `openai_responses` 提供商适配器，支持 OpenAI 兼容 Responses 端点，完整重放对话上下文（含 reasoning 与 function-call），内置 OpenAI 和 DeepSeek 模板，并将默认 xAI 切换至 Responses API |
| **Provider** | [#9452](https://github.com/AstrBotDevs/AstrBot/pull/9452) | xAI 正式迁移至 Responses API，恢复 Grok 原生 Web Search 能力（关联 [#7697](https://github.com/AstrBotDevs/AstrBot/issues/7697)） |
| **核心** | [#9517](https://github.com/AstrBotDevs/AstrBot/pull/9517) | 内置 Skill Creator、documents、pdf、spreadsheets 四个 Skills，并支持受限本地代理使用；内置插件 Skills 与本地、插件、工作区、沙箱 Skills 一同发现，本地覆盖优先级保留 |
| **核心** | [#9516](https://github.com/AstrBotDevs/AstrBot/pull/9516) | 修复 `check_config_integrity()` 对 dict 类型配置项的清空问题，避免用户内容丢失 |
| **核心** | [#9506](https://github.com/AstrBotDevs/AstrBot/pull/9506) | 优化出站音频文件清理时机，防止事件结束即删除 TTS 输出 |
| **核心** | [#9455](https://github.com/AstrBotDevs/AstrBot/pull/9455) | 知识库检索质量优化：使用相对分数融合替代等权 RRF，并引入源文档去重，提升检索精度 |
| **CLI** | [#9514](https://github.com/AstrBotDevs/AstrBot/pull/9514) | `astrbot init` 增加 `-y` 参数，支持无人值守部署 |
| **WebUI** | [#9523](https://github.com/AstrBotDevs/AstrBot/pull/9523) | 修复深色模式文字颜色异常（根因：Vue SFC `:global()` 选择器编译问题） |

**结论：** 今日项目在 Provider 适配层（Responses API）、核心配置安全、知识库检索质量、WebUI 稳定性四个方向均有实质推进，且发布了两个版本，迭代节奏非常紧凑。

## 4. 社区热点

### 最热 Issue：#9508 — 群聊免 @ 自动回复图片消息

**链接：** https://github.com/AstrBotDevs/AstrBot/issues/9508

**状态：** 已关闭 | 评论：9 条

**内容：** 用户已打通私聊图片通过 Dify Workflow 返回结果的链路，但群聊中必须 @机器人 才触发。用户希望实现群聊中不需要@即可自动回复图片消息。

**诉求分析：** 这反映了用户对更自然、低干扰的群聊交互体验的追求。私聊场景已验证技术链路可行，群聊限制主要来自平台适配层的触发机制设计。该 Issue 已关闭，推测是通过配置或引导解决，但需求本身值得关注。

### 长期 Issue 终获解决：#3888 — 兼容 OpenAI /v1/responses 端点

**链接：** https://github.com/AstrBotDevs/AstrBot/issues/3888

**状态：** 已关闭（2026-08-02）| 评论：7 条 | 创建于 2025-12-02

**内容：** 用户希望 AstrBot 在“新增模型提供商”处兼容 OpenAI API 的 /v1/responses 端点，以支持图文并茂的回复结果。用户对比指出 Gemini 格式 API 能返回图片而 OpenAI 格式不能，认为“二者不平等”。

**诉求分析：** 该 Issue 历时 8 个月最终随 v4.27.1 的 Responses API 适配器落地而关闭。说明社区对 OpenAI 生态兼容性的需求长期存在且强烈，今日 [#9515](https://github.com/AstrBotDevs/AstrBot/pull/9515) 的合并标志着这一能力正式补齐。

### 活跃 Bug 讨论：#9497 — AI 重复调用 4 次工具

**链接：** https://github.com/AstrBotDevs/AstrBot/issues/9497

**状态：** OPEN | 评论：5 条 | 更新于 2026-08-02

**内容：** 在 Mattermost 平台（其他平台未测试）上，AI 正常调用工具时会重复调用 4 次。用户使用 Docker 部署。

**诉求分析：** 工具重复调用是 Agent 类应用中影响体验和成本的严重问题。该 Issue 目前仍开放，未见到对应 fix PR，值得维护者优先排查。

## 5. Bug 与稳定性

按严重程度排序：

### 高严重度

1. **插件 dict 配置被清空（数据丢失）**
   - Issue：[#9512](https://github.com/AstrBotDevs/AstrBot/issues/9512)（OPEN，👍 1）
   - 现象：插件 `_conf_schema.json` 中 `"type": "dict"` 的配置项在插件重载/重启后全部丢失，重置为空对象 `{}`
   - 根因：`check_config_integrity()` 以空 dict 为参考值时覆盖了用户保存的键值对
   - **已有修复 PR：** [#9516](https://github.com/AstrBotDevs/AstrBot/pull/9516)，已合并

2. **AI 重复调用工具 4 次**
   - Issue：[#9497](https://github.com/AstrBotDevs/AstrBot/issues/9497)（OPEN）
   - 平台：Mattermost，其他平台未测试
   - **暂无对应 fix PR**

3. **WebChat 超长会话升级后不显示**
   - Issue：[#9474](https://github.com/AstrBotDevs/AstrBot/issues/9474)（OPEN）
   - 现象：旧版升级后，16,078 条消息的 WebChat 会话不在新版 UI 对话记录中显示，但数据未丢失（`platform_message_history` 表有 20,599 条消息）
   - **暂无对应 fix PR**

### 中严重度

4. **WebUI 深色模式侧栏文字颜色异常**
   - Issue：[#9521](https://github.com/AstrBotDevs/AstrBot/issues/9521)（OPEN）
   - 现象：侧栏文字大面积显示为 `#80CBC4` 青绿色，与深色主题风格不一致，刺眼影响使用
   - **已有修复 PR：** [#9523](https://github.com/AstrBotDevs/AstrBot/pull/9523)，已提交待合并

5. **图片下载失败**
   - Issue：[#9510](https://github.com/AstrBotDevs/AstrBot/issues/9510)（OPEN）
   - 现象：用户反馈"什么配置都没改，半小时前还是正常的，莫名其妙报错"。环境为 v4.26.5 Windows
   - **暂无对应 fix PR**

### 低严重度（今日已关闭）

6. QQ 官方适配器发送较大本地视频触发 STGW 413 错误（[#9443](https://github.com/AstrBotDevs/AstrBot/issues/9443)）— 已关闭
7. OpenAI-compatible 流式请求遇上游 EOF 返回 502（[#8945](https://github.com/AstrBotDevs/AstrBot/issues/8945)）— 已关闭
8. 启动时无法连接 models.dev 获取 LLM 元数据（[#5872](https://github.com/AstrBotDevs/AstrBot/issues/5872)）— 已关闭

## 6. 功能请求与路线图信号

### 新提出的功能需求

1. **插件禁用时同步禁用其自带 Skills**
   - Issue：[#9519](https://github.com/AstrBotDevs/AstrBot/issues/9519)（OPEN，新开）
   - 当前插件禁用后其 `skills/` 目录下的 Skills 不会被禁用（纯文件系统扫描，不关心插件启用状态）。用户期望 SkillManager 能感知插件启用状态。考虑到今日刚合并了内置 Skills 的 PR（[#9517](https://github.com/AstrBotDevs/AstrBot/pull/9517)），此功能有望在后续版本中被纳入。

2. **无人值守部署支持（`-y` 参数）**
   - Issue：[#9498](https://github.com/AstrBotDevs/AstrBot/issues/9498)（已关闭）
   - 用户需要快速部署 AstrBot + Napcat + Ollama 的无人值守方案，此需求已在 v4.27.1 中实现（[#9514](https://github.com/AstrBotDevs/AstrBot/pull/9514)）

### 长期功能请求落地

3. **OpenAI Responses API 兼容**（[#3888](https://github.com/AstrBotDevs/AstrBot/issues/3888) + [#6865](https://github.com/AstrBotDevs/AstrBot/issues/6865)）— 已在 v4.27.1 落地
4. **xAI Grok 原生 Web Search**（[#7697](https://github.com/AstrBotDevs/AstrBot/issues/7697)，👍 2）— 已通过 [#9452](https://github.com/AstrBotDevs/AstrBot/pull/9452) 合并实现

### 值得关注的进行中 PR

5. **基于角色的本地计算机权限**（[#9472](https://github.com/AstrBotDevs/AstrBot/pull/9472)，OPEN）— 用显式的角色权限矩阵替代隐式的 `computer_use_require_admin` 行为，配置三项独立 Local 权限（代码执行、网络访问、工作区外文件访问）。这可能成为 v4.28 的安全特性。

## 7. 用户反馈摘要

- **无人值守部署需求明确**：来自 [#9498](https://github.com/AstrBotDevs/AstrBot/issues/9498) 的用户希望在 AstrBot + Napcat + Ollama 组合部署中跳过手动确认，说明 Docker/自动化脚本部署已成为重要使用场景。该需求当日即被实现，反馈闭环迅速。

- **OpenAI 生态兼容性呼声高**：从 [#3888](https://github.com/AstrBotDevs/AstrBot/issues/3888)（历时 8 个月）和 [#6865](https://github.com/AstrBotDevs/AstrBot/issues/6865) 可见，大量用户依赖 OpenAI 格式的中转服务商，且期望图文并茂的多模态回复。Responses API 适配器落地是对这一核心诉求的直接回应。另有用户反馈某些只有 Responses 模式且仅支持流式输出的中转商无法使用（[#6865](https://github.com/AstrBotDevs/AstrBot/issues/6865)）。

- **xAI 用户对搜索能力敏感**：xAI（Grok）用户期望通过原生 Web Search 获得最新信息的检索能力，Chat Completions 端点的 Live Search 弃用促使用户主动提交迁移建议（[#7697](https://github.com/AstrBotDevs/AstrBot/issues/7697)，获得 2 个 👍）。xAI 的迁移也侧面验证了 Responses API 的行业趋势。

- **配置丢失引发信任危机**：dict 类型配置被静默清空的问题（[#9512](https://github.com/AstrBotDevs/AstrBot/issues/9512)）对用户伤害较大——用户甚至表示"Issue 是 AI 帮忙写的，因为我对发生了什么也摸不着头脑"。这类静默数据丢失问题应作为最高优先级修复，已在 v4.27.1 中解决。

- **WebChat 长会话是真实使用场景**：[#9474](https://github.com/AstrBotDevs/AstrBot/issues/9474) 中用户维护了近两个月的 WebChat 会话（16,078 条消息），虽升级后数据未丢但 UI 不可见，说明 WebChat 被用于长期、深度的对话场景，升级需特别关注历史数据兼容。

## 8. 待处理积压

### 长时间未响应的重要 PR

1. **Opencode Go Subscription as Provider**（[#8179](https://github.com/AstrBotDevs/AstrBot/pull/8179)）
   - 创建于 2026-05-13，已开放 82 天
   - 涉及 WebUI 与 Provider 两个领域，为 Opencode Go 订阅提供支持
   - **建议：** 维护者评估其设计合理性，如可行则推动合入或给出明确反馈

2. **feat: add role-based Local computer permissions**（[#9472](https://github.com/AstrBotDevs/AstrBot/pull/9472)）
   - 创建于 2026-07-30
   - 涉及安全权限模型调整，可能影响现有 `computer_use_require_admin` 配置的兼容性，需谨慎评估

3. **fix: warn when a configured provider is silently substituted**（[#9484](https://github.com/AstrBotDevs/AstrBot/pull/9484)）
   - 创建于 2026-07-31，涉及 Provider 配置回退时的静默替换问题，改进可观测性

4. **fix(security): remove SSL verification downgrade fallback**（[#9459](https://github.com/AstrBotDevs/AstrBot/pull/9459)）
   - 创建于 2026-07-30，修复 SSL 验证被静默降级至 `CERT_NONE` 的中间人攻击漏洞，涉及安全，建议优先审查

### 待关注的开放 Issue

5. **WebChat 超长会话不显示**（[#9474](https://github.com/AstrBotDevs/AstrBot/issues/9474)）— 影响长时间使用 WebChat 的忠实用户，建议尽快排查新版 UI 的会话加载逻辑
6. **AI 重复调用工具**（[#9497](https://github.com/AstrBotDevs/AstrBot/issues/9497)）— 可能导致 API 费用翻倍和响应混乱，需定位是 Agent 循环逻辑还是平台适配层问题
7. **图片下载失败**（[#9510](https://github.com/AstrBotDevs/AstrBot/issues/9510)）— 用户描述模糊，需引导提供更详细的日志信息以便定位

---

**总结：** AstrBot 今日完成了 Responses API 生态的重要拼图（v4.27.1）与群组消息历史持久化（v4.27.0），项目在 Provider 适配、知识库检索、配置安全、WebUI 体验等多个方向同步推进。社区活跃度高，Issue 响应与关闭速度快（当日关闭率 60%）。需重点关注的是工具重复调用（[#9497](https://github.com/AstrBotDevs/AstrBot/issues/9497)）和 WebChat 长会话兼容（[#9474](https://github.com/AstrBotDevs/AstrBot/issues/9474)）两个遗留问题，以及积压的安全相关 PR（[#9459](https://github.com/AstrBotDevs/AstrBot/pull/9459)）。整体项目健康度良好，处于高速演进期。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*