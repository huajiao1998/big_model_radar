# OpenClaw 生态日报 2026-08-28

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-28 00:12 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-28

## 今日速览

过去24小时OpenClaw项目保持高活跃度：累计500条Issue更新（新开/活跃401条，关闭99条）和500条PR更新（待合并359条，已合并/关闭141条），合并/关闭率达28.2%，说明核心维护与社区贡献均在持续推进。当前无新版本发布，项目处于开发迭代周期。值得关注的是，大量Issue仍挂着`clawsweeper:needs-maintainer-review`和`clawsweeper:needs-product-decision`标签，表明维护者评审积压仍是项目健康度的主要瓶颈；同时P0/P1级Bug（SQLite损坏、会话活锁、进程泄漏等）持续出现，稳定性修复是当前主线。社区侧，多编码文件名处理、会话状态一致性和跨渠道消息投递语义是讨论最集中的议题。


## 项目进展

今日合并/关闭的PR集中在**安全策略确认机制、会话状态修复、跨渠道投递一致性、CLI/UI体验优化**四大方向，合计141条PR完成合并或关闭，项目在以下方面取得实质进展：

- **安全边界强化**：[#116489](https://github.com/openclaw/openclaw/pull/116489) 为安装策略警告引入交互式确认机制，外部`security.installPolicy`可返回`warn`状态，要求操作者确认可疑插件/技能安装；[#120900](https://github.com/openclaw/openclaw/pull/120900) 在Control UI中为管理员提供安装策略警告的审查与确认界面，两者配合形成完整的安装审批链路。

- **会话与消息投递修复**：[#126424](https://github.com/openclaw/openclaw/pull/126424) 修复多智能体场景下会话工具可能将对话投递到非绑定渠道的问题，涉及Discord、iMessage、Matrix、Slack、Telegram、飞书等全部主流渠道；[#130196](https://github.com/openclaw/openclaw/pull/130196) 将重启恢复墓碑与归档状态解耦，避免自动恢复误终止会话。

- **模型与认证修复**：[#125471](https://github.com/openclaw/openclaw/pull/125471) 修复Gateway重启后Claude CLI OAuth刷新所有权丢失的问题；[#130993](https://github.com/openclaw/openclaw/pull/130993) 修复OpenAI Responses长会话压缩管线的五个缺陷，包括上下文边界丢失导致压缩过早触发。

- **CLI与工具链**：[#128223](https://github.com/openclaw/openclaw/pull/128223) 修复`openclaw models aliases add`从写入快照解析别名目标的问题；[#123975](https://github.com/openclaw/openclaw/pull/123975) 为`tsgo`包装器增加超时看门狗与受管进程清理，避免编译器进程树残留。

- **UI/UX改进**：[#128995](https://github.com/openclaw/openclaw/pull/128995) 将完整会话操作（置顶、标记未读、设置图标、复制ID、移动分组）从侧边栏扩展到聊天头部菜单；[#123535](https://github.com/openclaw/openclaw/pull/123535) 修复侧边栏会话目录在窗口聚焦时触发冗余刷新的问题。


## 社区热点

今日讨论最活跃的Issue集中在**架构级改进**与**数据安全**两个主题，反映出社区用户对OpenClaw作为AI助手基础设施的深层诉求：

- **[#48788 集中式文件名编码工具（20条评论）](https://github.com/openclaw/openclaw/issues/48788)**：PR #48578修复了飞书中文文件名的UTF-8/Latin-1误读问题，但社区认为需要架构级方案——建立集中式文件名编码工具，统一处理Shift-JIS、EUC-KR、GB18030等多编码场景，覆盖所有渠道适配器。该Issue被标记为`off-meta tidepool`，属于长期架构演进方向。

- **[#115908 会话转录投影活锁（14条评论）](https://github.com/openclaw/openclaw/issues/115908)**：P1级Bug，持续写入负载下会话转录投影进入非收敛重建循环，同步阻塞Node主线程数十秒，导致所有渠道传输停滞。社区关注度高，因为该问题直接影响生产环境的可用性。

- **[#87561 跨渠道最终投递语义（13条评论）](https://github.com/openclaw/openclaw/issues/87561)**：讨论Agent回合结束时的最终消息投递保障——当前WhatsApp等渠道存在静默丢弃、无法证明投递成功等失败模式。社区呼吁定义持久化的最终回退投递语义，属于消息可靠性的基础设计问题。

- **[#42840 Control UI数学公式渲染（10条评论，10个👍）](https://github.com/openclaw/openclaw/issues/42840)**：用户强烈希望Control UI支持MathJax/LaTeX渲染，以便展示数学和科学内容。10个👍表明该需求在学术/科研用户群体中有较高共鸣。


## Bug 与稳定性

今日报告的Bug按严重程度排列如下：

**P0 级**

- **[#126821 SQLite损坏反复复发（7条评论）](https://github.com/openclaw/openclaw/issues/126821)**：2026.8.1-beta.2在WSL2上，全新重建的数据库在15-24小时内出现freelist计数错误，5天内发生5次，包括"网关瘫痪模式"（拒绝所有服务但不退出）。无fix PR，标记为`needs-live-repro`。

**P1 级**

- **[#115908 会话转录投影活锁（14条评论）](https://github.com/openclaw/openclaw/issues/115908)**：持续写入下主线程阻塞，所有渠道传输停滞。无fix PR，标记为`source-repro`。
- **[#125344 内存嵌入worker与codex app-server泄漏（7条评论）](https://github.com/openclaw/openclaw/issues/125344)**：两个进程族无空闲TTL或池上限，持续消耗gateway cgroup资源。无fix PR。
- **[#126906 拒绝write工具静默禁用内存持久化（6条评论）](https://github.com/openclaw/openclaw/issues/126906)**：通过`tools.deny`拒绝write工具后，内存持久化被静默禁用，Agent仍报告保存成功。无fix PR。
- **[#126360 AgentSelectionRequiredError日志洪泛（6条评论）](https://github.com/openclaw/openclaw/issues/126360)**：显式多Agent所有权模式下，logbook插件、Control UI全局RPC和系统Agent回合均缺少agentId目标，导致错误日志刷屏。无fix PR。
- **[#128385 no-op write/edit终止器死胡同（5条评论）](https://github.com/openclaw/openclaw/issues/128385)**：重放安全门被变更工具自身污染，导致终止展示永远无法呈现，用户看到可重复的通用错误。无fix PR。
- **[#127948 WhatsApp群组回复空白气泡（5条评论）](https://github.com/openclaw/openclaw/issues/127948)**：引用缓存过期后，带有效引用键但空引用体的消息在WhatsApp Web/Desktop渲染为完全空白气泡。无fix PR。
- **[#130954 更新器死锁Doctor子进程（5条评论）](https://github.com/openclaw/openclaw/issues/130954)**：**Beta发布阻断器**。post-core更新器持有插件生命周期租约后启动Doctor子进程，子进程等待同一租约导致死锁，阻断main分支通过源码/dev更新路径的推进。已关闭，但需关注修复方案。

**P2 级**

- **[#99586 网关操作后工具面空白（8条评论）](https://github.com/openclaw/openclaw/issues/99586)**：回归Bug，网关相关操作后工具面返回空白，容器重启仅短暂恢复。
- **[#120735 Telegram贴纸不可用（8条评论）](https://github.com/openclaw/openclaw/issues/120735)**：入站贴纸以原始文件引用到达，无描述且未暂存到磁盘，Agent完全无法看到贴纸。
- **[#44134 Google Antigravity账号被误封（8条评论）](https://github.com/openclaw/openclaw/issues/44134)**：频繁工具Schema重载触发Google反滥用检测，导致账号被封。
- **[#50490 飞书群聊activation模式切换无效（7条评论）](https://github.com/openclaw/openclaw/issues/50490)**：`/activation mention`命令确认后仍响应所有消息。
- **[#114612 SQLite无界增长（10条评论）](https://github.com/openclaw/openclaw/issues/114612)**：`memory_index_chunks`和`memory_embedding_cache`表无保留策略，将随时间填满磁盘。


## 功能请求与路线图信号

今日社区提出的功能需求中，以下方向值得关注：

- **[#42840 MathJax/LaTeX支持（10个👍）](https://github.com/openclaw/openclaw/issues/42840)**：Control UI数学公式渲染，学术/科研用户刚需。当前无关联PR，但10个👍表明需求强烈。

- **[#44965 流式重复防护（6条评论）](https://github.com/openclaw/openclaw/issues/44965)**：模型生成陷入死循环时无限刷屏，请求增加"暂停并确认"机制。与已有PR #53940（重启哨兵）属于同一类"生成安全网"需求。

- **[#9912 maxTurns/maxToolCalls配置（6条评论）](https://github.com/openclaw/openclaw/issues/9912)**：限制Agent工具调用迭代次数，防止模型忽略系统提示陷入死循环。该Issue自2026-02-05起已存在近7个月，仍无fix PR。

- **[#45501 session.resetPrompt配置（6条评论）](https://github.com/openclaw/openclaw/issues/45501)**：允许自定义`/new`或`/reset`后的会话启动消息，替代硬编码文本。

- **[#82450 盲人用户线性持久工作区模式（6条评论）](https://github.com/openclaw/openclaw/issues/82450)**：一位全盲用户请求增加线性工作区模式以提升无障碍体验，附带详细的使用场景（视频推广、浏览器自动化、社交媒体发布等），体现了OpenClaw在无障碍方向上的改进空间。

- **[#7338 Agent Attestation Headers（4条评论，3个👍）](https://github.com/openclaw/openclaw/issues/7338)**：为外部API请求添加Agent身份认证头，便于验证请求确实来自OpenClaw Agent。该Issue自2026-02-02起已存在近7个月，标记为`needs-security-review`，属于安全基础设施方向。

结合已有PR判断，**安装策略警告确认机制**（#116489 + #120900）和**字体选择器**（#131275）最可能进入下一版本；**模型目录刷新**（#131294）和**会话迁移堆优化**（#131276）也已在PR阶段。


## 用户反馈摘要

从今日Issues评论中提炼的真实用户声音：

- **生产环境稳定性是最大痛点**：多个用户报告生产实例遭遇SQLite损坏（#126821）、进程泄漏（#125344）、主线程阻塞（#115908）等严重问题。用户@liemnhoang描述"5天5次事件，包括一个拒绝所有服务但从不退出的瘫痪网关模式"，@rbueno69-git提供了详细的cgroup资源测量数据。这些反馈表明稳定性已成为影响用户信任的关键因素。

- **配置静默失效引发困惑**：多个Issue反映配置项"看似生效实则无效"——飞书activation模式切换无效（#50490）、`groupPolicy: "open"`静默无效（#131087）、拒绝write工具后内存持久化静默禁用（#126906）。用户@fede-kamel指出"没有任何人——操作员、doctor、Agent——知道保存从未发生"。这类问题严重损害用户对系统可控性的信心。

- **升级路径风险高**：macOS用户@tess020126-cmyk报告2026.5.6→2026.5.19升级导致Gateway完全不可用，唯一恢复路径是Time Machine还原（#85027）。另一用户报告升级后长会话迁移可能耗尽JavaScript堆（#127468）。升级风险正在成为用户采纳新版本的阻碍。

- **多Agent场景体验割裂**：显式多Agent所有权模式下日志洪泛（#126360）、子Agent镜像任务静默不可见（#87666）、会话工具投递到错误渠道（#126424）等问题，反映出多Agent功能虽在快速迭代，但一致性和可观测性仍需加强。

- **正面反馈**：盲人用户@xiaopinpin-music称"OpenClaw已成为我使用过的最强大的AI工作界面之一"（#82450），展示了项目在无障碍使用上的价值；多个功能请求（#42840、#45501）的措辞也体现了用户对OpenClaw的深度依赖和积极期待。


## 待处理积压

以下长期未响应或积压的重要Issue/PR需要维护者关注：

- **[#7338 Agent Attestation Headers（2026-02-02创建，3个👍）](https://github.com/openclaw/openclaw/issues/7338)**：已积压近7个月，标记`needs-security-review`。Agent身份认证是构建Agent生态（Agent-only API、技能后端、市场）的基础能力，建议安全团队排期评估。

- **[#9912 maxTurns/maxToolCalls配置（2026-02-05创建）](https://github.com/openclaw/openclaw/issues/9912)**：已积压近7个月。模型死循环是用户实际遇到的问题，该配置可作为生成安全网的一部分。

- **[#9607 Himalaya邮件技能文档缺陷（2026-02-05创建）](https://github.com/openclaw/openclaw/issues/9607)**：已积压近7个月，标记`needs-live-repro`。文档不准确直接影响用户体验。

- **[#84242 memory-lancedb工具未暴露（2026-05-19创建，3个👍）](https://github.com/openclaw/openclaw/issues/84242)**：已积压3个月。`memory_store`等工具已注册但Agent动态工具面不暴露，导致LanceDB内存功能实际不可用。

- **[#87561 跨渠道最终投递语义（2026-05-28创建，13条评论）](https://github.com/openclaw/openclaw/issues/87561)**：已积压3个月，讨论热度高但无fix PR。消息投递可靠性是生产环境的核心需求。

- **[#114612 SQLite无界增长（2026-07-27创建，10条评论）](https://github.com/openclaw/openclaw/issues/114612)**：已积压1个月，磁盘耗尽风险随时间推移持续上升。

- **[#126821 SQLite损坏反复复发（2026-08-20创建，P0）](https://github.com/openclaw/openclaw/issues/126821)**：P0级问题，5天5次事件，目前仍无fix PR。建议优先安排`needs-live-repro`复现。

---

**总结**：OpenClaw项目在功能迭代和社区参与度上保持强劲势头，安全策略确认、UI改进、跨渠道一致性等方向均有实质进展。但P0/P1级稳定性问题（SQLite损坏、进程泄漏、会话活锁）持续消耗用户信任，维护者评审积压（大量`needs-maintainer-review`标签）和长期未响应的功能请求（#7338、#9912）是当前项目健康度的主要风险点。建议下一阶段优先处理：①P0/P1稳定性Bug的修复与验证；②维护者评审积压清理；③对高赞功能请求（#42840、#7338）给出明确路线图回应。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-08-28**


## 1. 生态全景

当前个人 AI 助手开源生态正处于**从功能竞争转向稳定性与架构成熟度竞争**的关键阶段。头部项目（OpenClaw、hermes-agent）日均处理 500 条 Issue/PR 级别的工作流，社区规模已接近成熟基础设施项目；与此同时，SQLite 损坏、进程泄漏、会话活锁等 P0/P1 级稳定性问题在多个项目中反复出现，成为制约用户信任的核心瓶颈。生态内部出现明显的**分层分化**：一部分项目（Zeroclaw、QwenPaw）正从 RFC 架构讨论密集转入实施交付期，另一部分（PicoClaw、AstrBot）则聚焦于特定场景的精细化打磨。跨项目共同涌向多 Agent 会话一致性、安装/更新可靠性、消息投递语义、安全审批链路等方向，表明生态正从"能用"向"可靠、可审计、可运维"演进。


## 2. 各项目活跃度对比

| 项目 | Issues（新开/活跃） | PRs（待合并） | 合并/关闭 PR 数 | Release | 健康度评估 |
|------|---------------------|---------------|-----------------|---------|------------|
| **OpenClaw** | 500（401 活跃 / 99 关闭） | 359 | 141（合并率 28.2%） | 无 | ⚠️ 活跃度极高，但维护者评审积压严重，P0/P1 Bug 持续 |
| **hermes-agent** | 451（336 活跃 / 115 关闭） | 387 | 113（合并率 22.6%） | v0.20.6 patch | ✅ 高活跃，响应迅速，架构级修复落地（deadline layer） |
| **Zeroclaw** | 30（23 活跃 / 7 关闭） | 48 | 2（合并率 4%） | 无 | ✅ 高活跃，RFC 密集转入实施，响应效率高 |
| **QwenPaw** | 16（13 活跃 / 3 关闭） | 27 | 18（合并率 40%） | v2.2.0-beta.1 | ✅ 健康，修复节奏快，但桌面端性能问题突出 |
| **AstrBot** | 13（8 活跃 / 5 关闭） | 11 | 3（合并率 21.4%） | 无 | ✅ 社区贡献活跃，Issue 响应及时，良性循环 |
| **PicoClaw** | 4（2 活跃 / 2 关闭） | 1 | 7（合并率 87.5%） | 无 | ✅ 稳步迭代，以依赖维护和存量修复为主 |

*注：OpenClaw 与 hermes-agent 的 Issue/PR 基数显著高于其他项目，反映社区规模不在同一量级。*


## 3. OpenClaw 在生态中的定位

**OpenClaw 是当前生态中社区规模最大、功能覆盖最全的"基础设施级"项目**，其 500 条 Issue/500 条 PR 的日活跃度是第二梯队（hermes-agent）的 1.1 倍、第三梯队（Zeroclaw/QwenPaw）的 10-30 倍。

**核心优势：**
- **渠道覆盖广度**：Discord、iMessage、Matrix、Slack、Telegram、飞书、WhatsApp 等主流渠道全支持，且持续修复跨渠道投递一致性问题（#126424），这是其他项目难以比肩的生态位。
- **安全机制建设**：安装策略警告确认机制（#116489 + #120900）形成完整的审批链路，在生态中率先将"安全边界"从代码层面提升到产品流程层面。
- **社区自组织能力**：大量社区贡献者参与 Bug 修复与功能开发，形成了"用户报障 → 贡献者修复 → 维护者合并"的成熟协作模式。

**技术路线差异：**
- 相比 **hermes-agent**（聚焦桌面端体验与 MCP 工具链），OpenClaw 更强调"渠道无关的消息投递可靠性"与"多 Agent 会话一致性"。
- 相比 **Zeroclaw**（强调运行时架构的 RFC 驱动演进），OpenClaw 更偏向实用主义的快速迭代，但这也导致架构级问题（如 SQLite 损坏、会话活锁）反复出现。
- 相比 **QwenPaw**（背靠阿里生态，强调 Hub 多租户与中文渠道），OpenClaw 的国际化渠道覆盖和社区多样性优势明显。

**主要风险：** 维护者评审积压（大量 `needs-maintainer-review` 标签）和 P0 级稳定性问题（SQLite 损坏 5 天 5 次）正在消耗用户信任，若不能有效解决，可能给追赶者留下窗口期。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|----------|----------|----------|
| **存储层稳定性** | OpenClaw（#126821 SQLite 损坏、#114612 无界增长）、hermes-agent（#90950 state.db 损坏）、QwenPaw（#7364 内存管理器损坏） | SQLite/WAL 模式下的并发写入安全、损坏恢复、存储增长控制是跨项目共性痛点 |
| **安装/更新可靠性** | hermes-agent（#87093 Debian 安装失败、#91277 fleet update）、QwenPaw（#7023 Playwright 阻塞启动）、OpenClaw（#130954 更新器死锁） | 安装脚本跨平台兼容性、更新后服务重启一致性、升级路径安全性 |
| **多 Agent 会话一致性** | OpenClaw（#126424 投递错误渠道、#126360 日志洪泛）、Zeroclaw（#10408 并行运行）、QwenPaw（#7324 定时任务通知丢失） | 会话所有权边界、并发控制、消息路由正确性 |
| **消息投递可靠性语义** | OpenClaw（#87561 跨渠道最终投递）、Zeroclaw（#9591 交付注册表）、AstrBot（#9848 飞书指令识别） | 持久化回退投递、投递成功证明、渠道适配器行为一致性 |
| **安全审批与权限** | OpenClaw（#116489 安装策略确认、#7338 Agent Attestation）、Zeroclaw（#10409 临时文件权限）、hermes-agent（#5528 可配置审批命令） | 从硬编码安全策略走向可配置、可审计的安全基础设施 |
| **桌面端性能** | hermes-agent（#88275 渲染进程 CPU 40-70%）、QwenPaw（#7363 事件循环阻塞 118-135s） | 空闲资源占用、启动速度、渲染性能 |
| **长会话/上下文管理** | OpenClaw（#130993 压缩管线缺陷）、hermes-agent（#78981 会话永久死亡）、QwenPaw（#7331 超大工具结果限制） | 上下文压缩可靠性、token 核算、记忆上限动态调整 |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|------|----------|----------|------------------|
| **OpenClaw** | 全渠道消息接入 + 多 Agent 编排 + 企业级安全审批 | 开发者、企业用户、自托管爱好者 | 渠道适配器层最厚，强调跨渠道一致性与消息投递语义；插件/技能生态丰富 |
| **hermes-agent** | 桌面端优先 + MCP 工具链 + 长会话稳定性 | 桌面重度用户、MCP 生态开发者 | Electron 桌面端 + 后端网关分离；统一 deadline layer 架构级修复超时问题 |
| **Zeroclaw** | 运行时架构创新 + RFC 驱动演进 | 架构敏感型开发者、早期采用者 | 强调 runtime-owned 会话、传输面适配器、WASM 插件生命周期；RFC 流程规范 |
| **QwenPaw** | 中文生态 + Hub 多租户 + 移动端 | 中文用户、团队协作场景 | 背靠阿里生态（DashScope、钉钉、QQ）；Python 3.13 升级路径；MCP 双协议客户端 |
| **AstrBot** | 中文 IM 适配 + 插件生态 + 成本优化 | 中文社群运营者、插件开发者 | 轻量级架构，强调插件市场与 Provider 适配器（Synthorai 聚合 113 模型）；WebUI 整合 |
| **PicoClaw** | 轻量嵌入式 + 边缘硬件 | ARM 开发板用户、嵌入式场景 | Go 语言实现，支持 RKLLM 等边缘推理；依赖维护为主，功能迭代节奏平稳 |


## 6. 社区热度与成熟度

**第一梯队：超大规模社区（日 Issue/PR 500+）**
- **OpenClaw**、**hermes-agent** — 社区规模接近成熟开源基础设施项目，Issue/PR 处理量级与中型商业软件相当。两者均处于**功能快速迭代与稳定性攻坚并行**的阶段，但 OpenClaw 面临更严峻的维护者评审积压问题。

**第二梯队：高活跃度社区（日 Issue/PR 30-50）**
- **Zeroclaw** — 处于**架构讨论转向密集交付**的拐点，两大 RFC（Gemini 语音、会话级提示词附件）进入实施阶段，社区讨论深度高（RFC 迭代至 Rev 9）。
- **QwenPaw** — 处于 **Beta 发布后的密集修复期**，合并率 40% 为全场最高，修复节奏健康；多租户 Hub 的推出将可能带来社区规模跃升。

**第三梯队：中等活跃度社区（日 Issue/PR 4-14）**
- **AstrBot** — 处于**功能整合与生态扩展期**，社区贡献者活跃，形成了良好的"报障→修复→合并"循环，但整体规模较小。
- **PicoClaw** — 处于**质量巩固与存量清理阶段**，以依赖升级和旧 PR 收尾为主，新功能开发节奏平稳，社区讨论集中在 IRC 等特定渠道体验。


## 7. 值得关注的趋势信号

**① 稳定性已成为用户信任的第一道门槛。** 多个项目的用户反馈中，"生产环境稳定性"是最集中的痛点——SQLite 损坏、进程泄漏、主线程阻塞、更新后服务不可用等问题的出现频率，已超过功能缺失的抱怨。对开发者而言，**在功能创新之外，将存储层可靠性、进程生命周期管理、更新回滚机制作为一等公民设计**，是赢得长期用户的关键。

**② 架构清晰度正在取代功能数量成为竞争焦点。** Zeroclaw 社区对"会话所有权边界""模块解耦"的深度讨论（RFC 迭代至 Rev 9）、OpenClaw 对"集中式文件名编码工具"的架构级诉求，均表明用户开始关注**系统的可理解性与可维护性**，而非单纯的功能堆叠。提前进行架构治理的项目将在下一阶段获得竞争优势。

**③ 安装/更新体验是"隐形但致命"的采纳障碍。** hermes-agent 的 Debian 安装失败、QwenPaw 的 Playwright 阻塞启动、OpenClaw 的更新器死锁——安装与更新流程的可靠性问题跨项目普遍存在，且直接影响新用户的第一印象与老用户的升级意愿。**将安装/更新流程纳入 CI/CD 测试矩阵**应成为各项目的优先事项。

**④ 多 Agent 场景的会话一致性与可观测性需求爆发。** 多个项目同时出现多 Agent 消息路由错误、日志洪泛、子 Agent 任务不可见等问题，表明多 Agent 功能已从"演示可用"进入"生产可用"的打磨期。**会话追踪、跨 Agent 消息投递语义、统一日志/审计**是下一阶段的共性机会点。

**⑤ 安全机制从"功能选项"演变为"基础设施"。** OpenClaw 的安装策略审批链路、hermes-agent 的可配置审批命令、Zeroclaw 的临时文件权限问题、Agent Attestation Headers 的提出——安全正在从单一功能点走向**覆盖安装、运行、通信全链路的体系化设计**。这为安全工具链（策略引擎、审计日志、身份认证）的开发者提供了明确的生态位。

**⑥ 语音与多模态通道成为新竞争前沿。** Zeroclaw 的 Gemini Live 语音转语音通道进入实施阶段、AstrBot 的视频识别插件、PicoClaw 的音频转写模型可配置化——语音/视觉等多模态交互正在从"附加功能"变为"核心体验"，且与边缘硬件（RKLLM）、成本优化（时段切换模型）等场景深度耦合。

**⑦ 可观测性（Prompt cache 命中率、token 核算、日志分类）需求上升。** QwenPaw 的 Prompt cache 可观测性 Stage 1 落地、hermes-agent 的 token accounting PR、AstrBot 的日志分类请求——随着 AI 助手进入生产环境，**用量可视化、成本追踪、调试工具链**正在成为用户刚需，也是尚未被充分满足的蓝海方向。

---

*本报告基于 2026-08-28 各项目 GitHub 公开数据生成，数据来源：OpenClaw、Zeroclaw、PicoClaw、QwenPaw、hermes-agent、AstrBot 项目日报。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-28

## 1. 今日速览

过去24小时项目保持高强度迭代：30条 Issue 更新（新开/活跃 23 条，关闭 7 条），50 条 PR 更新（待合并 48 条，合并/关闭 2 条），无新版本发布。值得关注的是，两个重量级 RFC（#8780 Gemini 语音通道、#9998 会话级提示词附件）今日正式进入实施阶段，分别建立了执行 tracker（#10406、#10405），标志着项目从架构讨论期转向密集交付期。与此同时，社区对运行时架构类 RFC 的讨论热度持续走高（#9487 评论达 26 条），且今日新报告的并行会话 Bug（#10408）已迅速获得修复 PR（#10411），体现了较高的响应效率。整体活跃度评级：**高**。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日有 2 条 PR 被合并/关闭，结合已关闭的 Issue 推断，主要推进了以下修复与任务：

- **Channel 交付注册表修复**（#9591）：修复了 reload 移除全部 channel 时交付注册表残留的问题，避免 channel 编排器发布空注册表导致的状态不一致。属于 S1 级工作流阻塞修复。 [Issue #9591](https://github.com/zeroclaw-labs/zeroclaw/issues/9591)
- **Bedrock Nova 2 Lite 缓存配置支持**（#8720）：支持通过配置文件禁用 cachePoint，解决用户在使用 `us.amazon.nova-2-lite-v1:0` 模型时随机出现的缓存错误。 [Issue #8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720)
- **Vision provider 凭证迁移修复**（#9651）：修复了裸 `vision_model_provider` 迁移后无法解析 keyed provider 凭证的问题，解决了 S1 级入站图片对话阻断。 [Issue #9651](https://github.com/zeroclaw-labs/zeroclaw/issues/9651)
- **Docker 镜像集成 Git Channel**（#10138）：`zeroclaw:debian` 镜像现已完整编译 Git Channel，补齐了镜像内 channel 覆盖。 [Issue #10138](https://github.com/zeroclaw-labs/zeroclaw/issues/10138)
- **Quickstart CLI 测试 locale 独立化**（#10264）：使 CLI 校验测试不再受操作系统的 Fluent locale 配置影响，提升测试稳健性。 [Issue #10264](https://github.com/zeroclaw-labs/zeroclaw/issues/10264)
- **Discord URL 回退误报修复**（#10327）：修复 Discord 无法保存图片到本地时误报部分图片加载失败的问题。 [Issue #10327](https://github.com/zeroclaw-labs/zeroclaw/issues/10327)
- **SOP 语法参考自动生成**（#10305）：改为从源码自动生成 `docs/book/src/sop/syntax.md` 的机器可推导部分，并增加 drift 检查。 [Issue #10305](https://github.com/zeroclaw-labs/zeroclaw/issues/10305)

此外，两个大型实施 tracker 今日建立，标志着以下 RFC 正式进入落地阶段：

- **#10406**：协调实现已接受的 Gemini Live 语音转语音 broker channel（#8780）。 [Tracker #10406](https://github.com/zeroclaw-labs/zeroclaw/issues/10406)
- **#10405**：协调实现会话级持久化提示词附件（#9998），覆盖聊天会话、ACP 会话、提示词变更工具、审批、脱敏、生命周期清理及文档。 [Tracker #10405](https://github.com/zeroclaw-labs/zeroclaw/issues/10405)

## 4. 社区热点

今日讨论热度集中在架构类 RFC 与决策队列上，反映出社区对运行时架构演进方向的高度关注：

- **[#9487] RFC: Runtime-owned conversation sessions and transport surface adapters**（评论 26 条）— 最热门讨论。该 RFC 提出将会话所有权收归运行时，并引入传输面适配器。讨论聚焦于 #9487/#9488/#9600 的所有权边界划分、持久化准入语义与模糊结果处理。 [Issue #9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)
- **[#8780] RFC: Realtime speech-to-speech channel for Gemini Live**（评论 21 条）— v2 重写为 broker 契约后讨论持续升温，今日已建立实施 tracker（#10406），社区对实时语音通道的落地路径表现出强烈兴趣。 [Issue #8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780)
- **[#9488] RFC: Unified attachment architecture for web chat and channels**（评论 20 条）— 已迭代至 Revision 9，与 #9487 的会话所有权讨论深度耦合，社区关注附件在统一架构中的归属与流转。 [Issue #9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)
- **[#6850] RFC: Decouple memory lifecycle policy from storage backends**（评论 20 条）— 讨论已持续 3 个月，社区对记忆生命周期策略与存储后端解耦的诉求强烈，该 RFC 仍处于开放状态。 [Issue #6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)
- **[#8692] Tracker: Maintainer decision queue for RFCs and design issues**（评论 14 条）— 维护者决策队列，社区关注 RFC 的审批效率与优先级排序。 [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)

**诉求分析**：社区热点高度集中于运行时架构的"所有权"与"边界"问题——会话归谁所有、附件如何流转、记忆策略与存储如何解耦。这反映出项目在快速扩张后，社区对架构清晰度和模块边界的诉求正在上升，RFC 讨论的深度和迭代频率（如 #9488 已到 Rev 9）也印证了这一点。

## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列如下：

| 严重度 | Issue | 描述 | 状态 |
|--------|-------|------|------|
| **S1 - 工作流阻断** | [#9591](https://github.com/zeroclaw-labs/zeroclaw/issues/9591) | Channel reload 移除全部 channel 时交付注册表残留 | ✅ 已关闭（已修复） |
| **S1 - 工作流阻断** | [#9651](https://github.com/zeroclaw-labs/zeroclaw/issues/9651) | 迁移后的裸 `vision_model_provider` 无法解析 keyed provider 凭证 | ✅ 已关闭（已修复） |
| **S2 - 行为降级** | [#10408](https://github.com/zeroclaw-labs/zeroclaw/issues/10408) | 活跃 turn 期间第二条消息触发同 session 并行运行，导致重复工作与重复回复 | 🔧 已有修复 PR：[#10411](https://github.com/zeroclaw-labs/zeroclaw/pull/10411)（feat(channels): serialize same session messages） |
| **S3 - 轻微问题** | [#10327](https://github.com/zeroclaw-labs/zeroclaw/issues/10327) | Discord URL 回退误报部分图片加载失败 | ✅ 已关闭（已修复） |
| **安全风险** | [#10409](https://github.com/zeroclaw-labs/zeroclaw/issues/10409) | Channel 临时文件默认权限 0o644，可能泄露语音/图片等敏感数据 | 🆕 新报告，暂无修复 PR |

**稳定性观察**：今日新报告的 #10408（并行运行）是一个值得关注的运行时并发缺陷，社区已迅速提交修复 PR #10411 将同 scope 消息串行化。此外，#10409 暴露的临时文件权限问题属于安全类隐患，建议优先处理。

## 6. 功能请求与路线图信号

今日新提出的功能需求及路线图信号：

- **[#10244] Agent 删除与批量清理（ZeroCode）**：为 ZeroCode 的 Dashboard > Agents 视图增加单个/批量删除能力，使用受保护的 agent 生命周期删除路径。该需求来自快速启动、测试等场景的实操痛点，与 ZeroCode 整合硬化路线图（#9010）方向一致。 [Issue #10244](https://github.com/zeroclaw-labs/zeroclaw/issues/10244)
- **[#10402] Serply Web 搜索 Provider**：新增 `search_provider = "serply"`，通过单一 API 获取 Google 实时搜索结果（标题、URL、摘要、位置）。已有对应 PR，扩展了 web_search_tool 的 provider 生态。 [PR #10402](https://github.com/zeroclaw-labs/zeroclaw/pull/10402)
- **[#10407] 会话级持久化提示词附件**：对应已接受的 RFC #9998，实现 SQLite 存储的每会话最多 4 个持久化提示词附件，并提供 `session_prompt_list/set/delete` 工具。该 PR 为 XL 规模，涉及 agent、channel、config、gateway、runtime、tool 等多个模块。 [PR #10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407)
- **[#10411] 同 Session 消息串行化**：在 `interrupt_on_new_message` 禁用时，同 sender + reply-target 的消息将等待进行中的 turn 完成，避免并发运行。直接回应 #10408 的 Bug 报告。 [PR #10411](https://github.com/zeroclaw-labs/zeroclaw/pull/10411)
- **[#10406] Gemini Live 语音通道实施**：作为已接受的 #8780 的执行 tracker，将实现有界 Gemini Live 语音转语音 broker channel。 [Tracker #10406](https://github.com/zeroclaw-labs/zeroclaw/issues/10406)

**路线图信号**：今日多个动作表明项目正从 RFC 讨论密集转入实施阶段——#8780 和 #9998 两大 RFC 均建立了实施 tracker，且 #10407 已提交 XL 规模实现 PR。同时，ZeroCode 的整合硬化（#9010）和 v0.8.5 稳定化（#9459）两个 tracker 仍在持续推进中。

## 7. 用户反馈摘要

从今日 Issues 评论中提炼的真实用户反馈：

- **Bedrock 缓存错误困扰用户**（#8720）：用户使用 `us.amazon.nova-2-lite-v1:0` 模型时随机遇到缓存错误，希望提供禁用缓存的配置开关。该问题已通过配置支持解决，但反映出 Bedrock provider 的缓存策略需要更灵活的配置能力。 [Issue #8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720)
- **Docker 镜像 channel 覆盖不全**（#10138）：用户反馈 `zeroclaw:debian` 镜像中除 CLI 外所有 channel（Telegram、Discord、Matrix、WhatsApp Web、Email、Gmail Push）均未配置，希望 Git Channel 能完整编译进镜像。现已解决。 [Issue #10138](https://github.com/zeroclaw-labs/zeroclaw/issues/10138)
- **并行运行导致重复回复**（#10408）：用户明确描述了"同一 session 在 agent 处理上一条消息时发送新消息，会触发并行运行，导致重复工作和重复回复"的痛点。这属于会话并发控制缺失，修复 PR 已提交。 [Issue #10408](https://github.com/zeroclaw-labs/zeroclaw/issues/10408)
- **RFC 讨论中的架构关切**（#9487、#9488、#6850）：社区在多个 RFC 中反复讨论所有权边界、模块解耦和生命周期管理问题，反映出用户对架构清晰度和可维护性的深层关注。

## 8. 待处理积压

以下为长期未决或需维护者关注的重要事项：

- **[#6850] RFC: Decouple memory lifecycle policy from storage backends**（开放 98 天，评论 20 条）— 记忆生命周期与存储解耦的 RFC 已讨论超 3 个月仍无定论，建议维护者尽快给出决策。 [Issue #6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)
- **[#6996] RFC: Granular sandbox policy**（开放 92 天，评论 13 条，`needs-maintainer-review`）— 文件系统与网络沙箱策略细化方案等待维护者评审。 [Issue #6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)
- **[#6909] RFC: Computer-use support for desktop screen interaction**（开放 95 天，评论 11 条，`needs-maintainer-review`）— 桌面屏幕交互与输入控制的 RFC 已迭代至 Rev 2，等待维护者评审。 [Issue #6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909)
- **[#7822] RFC: WASM plugin lifecycle observer subscriptions**（开放 72 天，评论 7 条，`needs-maintainer-review`）— WASM 插件生命周期观察者能力方案等待评审。 [Issue #7822](https://github.com/zeroclaw-labs/zeroclaw/issues/7822)
- **[#9420] PR: fix(anthropic): support stored OAuth profiles**（开放 33 天，`do-not-merge` 标记，XL 规模）— Anthropic OAuth 配置文件支持 PR 被标记为不可合并，需明确阻塞原因。 [PR #9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420)
- **[#9997] PR: feat(channels/telegram): add secure model picker**（开放 14 天，`do-not-merge` + `status:blocked`，XL 规模）— Telegram 安全模型选择器 PR 处于阻塞状态，需协调解除阻塞。 [PR #9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997)
- **[#10205] PR: feat(android): add native tools and standalone app**（开放 7 天，`needs-author-action`，XL 规模）— Android 原生工具与独立应用 PR 等待作者响应。 [PR #10205](https://github.com/zeroclaw-labs/zeroclaw/pull/10205)
- **[#9713] PR: feat(runtime): expose token accounting on history-trim events**（开放 25 天，`needs-author-action`，XL 规模）— 历史裁剪事件的 token 核算暴露 PR 等待作者更新。 [PR #9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)
- **[#8561] PR: feat(channels/telegram): add multi_message streaming mode**（开放 59 天，`needs-author-action`，XL 规模）— Telegram 多消息流式模式 PR 已近两个月未获作者响应。 [PR #8561](https://github.com/zeroclaw-labs/zeroclaw/pull/8561)

**维护者提醒**：当前有 8 个 PR 带有 `needs-author-action` 标签（如 #10205、#9713、#8561、#10391、#10407 等），大量 XL 规模 PR 等待作者响应，建议维护者跟进或考虑接手。同时，多个 3 个月以上未决的 RFC（#6850、#6996、#6909）需要决策推动，避免架构讨论长期悬置。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-28

## 1. 今日速览

PicoClaw 项目今日整体活跃度中等偏上：24小时内共处理 4 条 Issues（2 新开/活跃、2 关闭）和 8 条 PR（7 条关闭/合并、1 条待审）。核心开发动作集中在依赖批量升级与历史 PR 的合并收尾，功能开发方面有一项针对 Web UI 卡顿的修复 PR 提交（#3347）。社区讨论热度集中在 IRC 长消息支持（#3287，8 条评论），同时新增一条 RKLLM 模型异常回复的 Bug 报告（#3346）。项目无新版本发布，整体处于稳步迭代、维护密集的阶段。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日合并/关闭的 PR 以依赖升级和旧 PR 整合为主，具体如下：

- **依赖批量升级（#3332-#3336）**：5 个 dependabot PR 被关闭，涉及 `aws-sdk-go-v2`、`aws-sdk-go-v2/config`、`aws-sdk-go-v2/service/bedrockruntime`、`anthropic-sdk-go`、`mautrix` 等核心依赖的版本更新。这些升级有助于保持与上游 API 的兼容性，并可能带来性能与稳定性改进。
  - https://github.com/sipeed/picoclaw/pull/3332
  - https://github.com/sipeed/picoclaw/pull/3333
  - https://github.com/sipeed/picoclaw/pull/3334
  - https://github.com/sipeed/picoclaw/pull/3335
  - https://github.com/sipeed/picoclaw/pull/3336

- **历史 PR 整合合并（#1555、#1549）**：由 @xuwei-xy 提交的两个合并 PR 于今日关闭，分别整合了 #1390/#1389/#1383/#1381 和 #1448/#1447/#1446/#1444 等此前悬而未决的修复。这标志着多笔积压的修复工作正式进入主干，项目代码库的整洁度和功能完整性有所提升。
  - https://github.com/sipeed/picoclaw/pull/1555
  - https://github.com/sipeed/picoclaw/pull/1549

- **新提交的 UI 修复 PR（#3347）**：@iMilnb 提交了修复 Web UI 卡顿问题的 PR，针对聊天区域文本过多时的性能瓶颈，已在桌面和移动端浏览器验证通过。目前处于待合并状态。
  - https://github.com/sipeed/picoclaw/pull/3347

整体来看，项目今日完成了多笔依赖维护和旧 PR 清理，代码库健康度有所提升，但缺少大型功能特性的合并。

## 4. 社区热点

今日讨论最活跃的 Issue 为 **#3287（IRC 长消息支持）**，共 8 条评论，是近期社区关注度较高的话题。该 Issue 提出 PicoClaw 应将 IRCv3 中超过 512 字节被自动拆分的长消息视为一个完整消息来处理，而非多条独立消息。这一诉求反映了真实用户在使用 IRC 通道与 AI 助手交互时的痛点——长消息被截断或割裂会严重影响对话的连贯性和理解质量。

- https://github.com/sipeed/picoclaw/issues/3287

此外，两个已关闭的 stale 功能请求（#3331、#3330）各有 2 条评论，讨论虽不热烈，但涉及音频转写模型可配置化和子代理动态模型覆盖，属于对扩展性的合理期待。

## 5. Bug 与稳定性

今日新增 1 条 Bug 报告，无崩溃或严重回归问题：

- **[中] RKLLM 模型回复异常（#3346）**：用户 @crazysarah 报告在 ARM 开发板上使用 RKLLM 模型（Qwen3.5-0.8B_w4）时出现异常回复，环境为 PicoClaw V0.3.1。该问题影响特定硬件平台上的模型推理输出质量，目前尚无关联的 fix PR，需维护者关注并复现。
  - https://github.com/sipeed/picoclaw/issues/3346

- **[低] Web UI 卡顿（#3347）**：用户反馈聊天区域文本过多时界面卡顿，已由 @iMilnb 提交修复 PR（#3347），目前待合并。该问题影响桌面和移动端浏览器体验，修复方案已通过验证。
  - https://github.com/sipeed/picoclaw/pull/3347

## 6. 功能请求与路线图信号

今日活跃的功能请求共 3 项，其中 2 项因长期无进展被标记为 stale 并关闭：

| Issue | 功能需求 | 状态 | 纳入下一版本可能性 |
|-------|---------|------|-------------------|
| #3287 | IRC 长消息（>512 字节）应作为单条完整消息处理 | 开放中，8 条评论 | 较高——社区讨论活跃，且 IRC 是 PicoClaw 的重要接入渠道 |
| #3331 | 支持任意 `/audio/transcriptions` 端点模型，不限于 `*-whisper-*` | 已关闭（stale） | 较低——已过期关闭，但需求合理，可能以其他形式回归 |
| #3330 | `delegate`/`spawn`/`subagent` 工具支持调用时动态指定模型 | 已关闭（stale） | 较低——已过期关闭，但属于合理的架构扩展方向 |

- https://github.com/sipeed/picoclaw/issues/3287
- https://github.com/sipeed/picoclaw/issues/3331
- https://github.com/sipeed/picoclaw/issues/3330

结合今日合并的 PR 来看，项目当前更侧重于依赖维护和存量修复，新功能开发节奏相对平稳。IRC 长消息支持（#3287）是当前最有可能被纳入后续版本的功能请求。

## 7. 用户反馈摘要

从今日活跃的 Issues 评论中可提炼以下用户声音：

- **IRC 重度用户的真实痛点**（#3287）：用户明确描述了 IRC 512 字节限制导致长消息被客户端自动拆分，PicoClaw 将其误判为多条独立消息，破坏了对话的语义完整性。用户期望 IRCv3 下长消息能被正确聚合识别，这直接影响实际使用体验。
- **对旧模型的抱怨**（#3331）：用户指出 `*-whisper-*` 模型"太旧且慢"，希望支持更灵活的音频转写端点配置，反映出对性能和模型选择自由度的追求。
- **对子代理模型控制的期待**（#3330）：用户希望 `delegate`/`spawn`/`subagent` 工具能在调用时动态指定模型，而非受限于静态配置，说明部分高级用户有更精细的模型路由需求。
- **Web UI 性能的正面反馈**（#3347）：提交修复 PR 的用户表示修复后桌面和移动端浏览器均不再卡顿，说明该问题确实影响广泛，且修复方案有效。

## 8. 待处理积压

以下 Issue/PR 长期未获得充分响应或合并，建议维护者关注：

- **#3287（IRC 长消息支持）**：创建于 2026-07-22，已活跃超过一个月，8 条评论，至今无维护者明确回复或分配。作为社区讨论热度最高的功能请求，建议尽快给出路线图回应。
  - https://github.com/sipeed/picoclaw/issues/3287

- **#3347（Web UI 卡顿修复 PR）**：今日新提交，但考虑到该问题影响面较广（桌面+移动端），建议尽快 review 并合并。
  - https://github.com/sipeed/picoclaw/pull/3347

- **#3346（RKLLM 回复异常）**：新报告的 Bug，涉及 ARM 开发板上的模型推理，建议维护者尽早复现并确认是否为 RKLLM 后端兼容性问题。
  - https://github.com/sipeed/picoclaw/issues/3346

---

*本日报基于 GitHub 公开数据自动生成，数据截至 2026-08-28。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-28

## 1. 今日速览

过去 24 小时 QwenPaw 项目保持高活跃度：共更新 16 条 Issues（新开/活跃 13 条，关闭 3 条）、45 条 PR（待合并 27 条，已合并/关闭 18 条），并发布 v2.2.0-beta.1 新版本。社区讨论热度集中在多租户 Hub 规划（#7318，9 条评论）与 OpenSSL 3.0.x TLS 栈兼容性问题（#7298，7 条评论）。值得关注的是，多个稳定性 Bug（如 #7364 内存管理器损坏、#7363 事件循环阻塞）在 2.2.0b1 中被报告，但已有对应修复 PR 在途（#7328、#7329 等），整体项目推进节奏健康。

---

## 2. 版本发布

### v2.2.0-beta.1（Beta）
- **发布时间**：2026-08-27
- **发布链接**：https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.0-beta.1

**已披露更新内容**：
- **Docs**：更新 scroll context manager 博客（#7300）
- **fix(providers)**：为严格模式模型清理 DashScope 工具 schema（#7284）
- **test(integration)**：定向集成测试（内容截断，详见 Release 页面）

**破坏性变更**：Beta 版本，未披露明确破坏性变更，但建议生产环境用户谨慎升级。

**迁移注意事项**：
- 2.2.0 系列为 Beta 通道，API 与行为可能持续调整。
- 若使用 DashScope 严格模式模型，建议验证工具调用兼容性。
- 关注后续 Release Notes 中关于多租户 Hub 的正式说明。

---

## 3. 项目进展

今日合并/关闭的 18 条 PR 中，以下推进了关键功能与修复：

| PR | 状态 | 内容 | 关联 Issue |
|---|---|---|---|
| [#7342](https://github.com/agentscope-ai/QwenPaw/pull/7342) | 已合并 | **Prompt cache 可观测性（Stage 1）**：在 token 记录、API、聚合统计与聊天 UI 中增加缓存命中率展示 | #7335 |
| [#7340](https://github.com/agentscope-ai/QwenPaw/pull/7340) | 已合并 | **聊天滚动锁定**：新增头部控制按钮，持久化用户偏好，流式输出时保持视口稳定 | #7339 |
| [#7341](https://github.com/agentscope-ai/QwenPaw/pull/7341) | 已合并 | **集成测试覆盖 sprint batch 5**：新增 21 个测试文件、495 个用例，覆盖端点契约、CLI 与模块内部 | — |
| [#7358](https://github.com/agentscope-ai/QwenPaw/pull/7358) | 已关闭 | 聊天历史分页后端接口（#7049）因缺少前端配合被关闭，后续由 #7361 完整实现 | #7049 |

**关键在途 PR（未合并但进展显著）**：
- [#7328](https://github.com/agentscope-ai/QwenPaw/pull/7328)：将桌面端与 Docker 镜像的捆绑 Python 从 3.11 升级至 3.13（OpenSSL 3.0.x → 3.5.x），直接修复 #7298 TLS 问题。
- [#7330](https://github.com/agentscope-ai/QwenPaw/pull/7330)：MCP Streamable-HTTP 双协议客户端，支持 2026-07-28 新协议并兼容旧版回退。
- [#7329](https://github.com/agentscope-ai/QwenPaw/pull/7329)：MCP 挂起会话 RPC 中止与 `list_tools` 恢复，解决传输故障后卡死问题。
- [#7331](https://github.com/agentscope-ai/QwenPaw/pull/7331)：限制超大单行工具结果进入上下文，完整结果保留为工作区工件。

**整体评估**：项目在可观测性、MCP 协议现代化、运行时稳定性三个方向同步推进，v2.2.0-beta.1 发布后修复节奏明显加快。

---

## 4. 社区热点

| 排名 | 条目 | 类型 | 评论数 | 核心诉求 |
|---|---|---|---|---|
| 1 | [#7318 QwenPaw Hub 多租户版规划讨论](https://github.com/agentscope-ai/QwenPaw/issues/7318) | Issue/讨论 | 9 | 社区强烈要求团队级多用户支持，Hub 是官方首次回应；用户正在投票决定下一步功能优先级 |
| 2 | [#7298 OpenSSL 3.0.x TLS 栈被运营商 DPI 重置](https://github.com/agentscope-ai/QwenPaw/issues/7298) | Bug | 7 | 桌面端与 Docker 镜像捆绑 Python 3.11 导致 TLS 握手被运营商深度包检测重置，用户无规避手段 |
| 3 | [#7316 工具返回内容简化/删除的设计讨论](https://github.com/agentscope-ai/QwenPaw/issues/7316) | 讨论 | 3 | 用户提议通过 LLM 判断工具返回内容有效性，优化上下文占用 |
| 4 | [#7324 定时任务成功但推送消息缺失](https://github.com/agentscope-ai/QwenPaw/issues/7324) | Bug | 3 | 多 agent 定时任务并发执行时，部分成功通知丢失，影响任务可靠性 |

**分析**：社区关注点集中在 **多租户/团队协作**、**网络兼容性**、**上下文优化** 与 **任务可靠性** 四大方向。其中 #7318 的 9 条评论表明 Hub 功能是当前社区最期待的能力。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 严重（功能损坏/无响应）
| Issue | 描述 | 状态 |
|---|---|---|
| [#7364](https://github.com/agentscope-ai/QwenPaw/issues/7364) | **Zero-downtime reload 复用已关闭的 memory_manager**，导致 `memory_search` 永久损坏（2.2.0b1） | 待修复，暂无 PR |
| [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) | **同步调用阻塞事件循环**：Windows 桌面端启动时无响应 118–135s，发消息时 ~126s，timeout 失效 | 待修复，暂无 PR |

### 🟠 高（影响核心使用）
| Issue | 描述 | 状态 |
|---|---|---|
| [#7298](https://github.com/agentscope-ai/QwenPaw/issues/7298) | OpenSSL 3.0.x TLS 栈被运营商 DPI 重置，桌面端无规避方案 | **已有修复 PR**：[#7328](https://github.com/agentscope-ai/QwenPaw/pull/7328)（Python 3.11→3.13） |
| [#7023](https://github.com/agentscope-ai/QwenPaw/issues/7023) | 桌面端启动时同步安装 Playwright Chromium，阻塞就绪路径 ~60s，无跳过选项 | 待修复，已持续 2 周 |
| [#7312](https://github.com/agentscope-ai/QwenPaw/issues/7312) | Windows 下 `execute_shell_command` 因继承 stdin 管道导致 Python 进程挂起 | 待修复，暂无 PR |

### 🟡 中（功能异常）
| Issue | 描述 | 状态 |
|---|---|---|
| [#7324](https://github.com/agentscope-ai/QwenPaw/issues/7324) | 定时任务执行成功但收件箱缺失部分推送消息 | 待修复 |
| [#7302](https://github.com/agentscope-ai/QwenPaw/issues/7302) | 关闭工具信息/思考过程显示后，钉钉渠道仍发送空消息并触发未读提醒 | 待修复 |
| [#7362](https://github.com/agentscope-ai/QwenPaw/issues/7362) | 文件保护未生效，可读取 `/etc/passwd` | 待修复 |
| [#7360](https://github.com/agentscope-ai/QwenPaw/issues/7360) | 桌面端启动耗时约 247 秒（2.2.0b1） | 待修复 |

### 🟢 低（体验问题）
| Issue | 描述 | 状态 |
|---|---|---|
| [#7297](https://github.com/agentscope-ai/QwenPaw/issues/7297) | QQ 对话中让 QwenPaw 重启会丢失最后聊天记忆 | 已关闭 |

---

## 6. 功能请求与路线图信号

| 功能请求 | 来源 | 对应 PR/状态 | 纳入下一版本可能性 |
|---|---|---|---|
| **多租户 Hub** | [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) | 官方宣布 2.2.0 推出，社区讨论中 | ✅ 已确认 |
| **Prompt cache 可观测性** | [#7335](https://github.com/agentscope-ai/QwenPaw/issues/7335) | [#7342](https://github.com/agentscope-ai/QwenPaw/pull/7342) 已合并（Stage 1） | ✅ 已落地 |
| **聊天滚动锁定** | [#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339) | [#7340](https://github.com/agentscope-ai/QwenPaw/pull/7340) 已合并；[#7356](https://github.com/agentscope-ai/QwenPaw/pull/7356) 在途 | ✅ 已落地 |
| **工具调用可见性切换** | 社区反馈 | [#7357](https://github.com/agentscope-ai/QwenPaw/pull/7357) 在途 | 🔄 高 |
| **工具返回内容简化** | [#7316](https://github.com/agentscope-ai/QwenPaw/issues/7316) | 暂无 PR，讨论中 | 🔄 中 |
| **聊天历史分页 + 虚拟化** | [#7049](https://github.com/agentscope-ai/QwenPaw/issues/7049) | [#7361](https://github.com/agentscope-ai/QwenPaw/pull/7361) 在途 | 🔄 高 |
| **移动端浏览器输入换行** | [#7355](https://github.com/agentscope-ai/QwenPaw/issues/7355) | 已关闭（Close-and-review-later） | ⏸️ 暂缓 |
| **每媒体内联能力配置** | [#7201](https://github.com/agentscope-ai/QwenPaw/issues/7201) | [#7359](https://github.com/agentscope-ai/QwenPaw/pull/7359) 在途 | 🔄 高 |

---

## 7. 用户反馈摘要

- **多租户需求强烈**（#7318）：用户多次提出团队级部署需求，包括多用户访问、管理员管理的技能等。Hub 的推出被视为官方对社区呼声的直接回应。
- **网络环境兼容性痛点**（#7298）：运营商网络下 TLS 握手被重置，用户表示"desktop has no workaround"，对生产使用影响较大。
- **定时任务可靠性**（#7324）：用户配置 3 个 agent 同时执行定时任务，其中 1 条成功通知丢失，说明任务执行与通知链路存在并发缺陷。
- **启动速度抱怨**（#7023、#7360）：多个用户反馈桌面端启动耗时过长（60s 至 4 分钟），Playwright 安装阻塞是主因之一。
- **钉钉集成体验**（#7302）：关闭工具信息显示后仍收到空消息并触发未读提醒，影响日常使用。
- **安全功能信任度**（#7362）：文件保护未生效导致用户对安全机制产生疑虑，属于高风险反馈。

---

## 8. 待处理积压

以下 Issue/PR 长期未获响应或推进缓慢，建议维护者关注：

| 条目 | 类型 | 创建时间 | 搁置时长 | 说明 |
|---|---|---|---|---|
| [#7023 桌面启动阻塞 Playwright 安装](https://github.com/agentscope-ai/QwenPaw/issues/7023) | Bug | 2026-08-14 | 14 天 | 每次启动阻塞 60s，无跳过选项，影响所有桌面端用户 |
| [#6399 ReMeLightMemoryCard reranker UI 配置面板](https://github.com/agentscope-ai/QwenPaw/pull/6399) | PR | 2026-07-23 | 36 天 | 功能完整但长期未合并，处于 Under Review 状态 |
| [#7004 持久化 spawn 父子链接](https://github.com/agentscope-ai/QwenPaw/pull/7004) | PR | 2026-08-13 | 15 天 | 子 agent 白名单信息不持久化，影响审计与恢复 |
| [#7080 PowerContext 可插拔长期记忆后端](https://github.com/agentscope-ai/QwenPaw/pull/7080) | PR | 2026-08-17 | 11 天 | 新记忆后端实现，等待评审 |
| [#7211 防止注入上下文持久化](https://github.com/agentscope-ai/QwenPaw/pull/7211) | PR | 2026-08-21 | 7 天 | 修复 `HookContext.inject_context()` 将内部上下文写入用户聊天历史的隐患 |

---

**总结**：QwenPaw 在 v2.2.0-beta.1 发布后进入密集修复期，社区活跃度高，多租户 Hub 与可观测性功能推进明确。但桌面端启动性能、TLS 兼容性、事件循环阻塞等问题仍需优先解决，以保障生产环境稳定性。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报 — 2026-08-28

## 1. 今日速览

过去24小时内，hermes-agent 项目保持极高活跃度：**451条 Issue 更新**（新开/活跃 336，关闭 115）与 **500条 PR 更新**（待合并 387，已合并/关闭 113），日均合并/关闭 PR 数量超过 100，显示维护团队响应迅速。项目发布 **v0.20.6 (v2026.8.27)** patch release，汇总自 v0.20.5 以来约 525 个 PR，为下游 Docker 镜像、托管部署和新安装提供稳定基线。社区讨论热度集中在 **Skills 索引老化**（#66616，108 评论）、**Nous 集成阻塞**（#88584，36 评论）以及 **安装/更新可靠性**（#91277、#87093）等主题。整体项目健康度良好，但安装/更新流程与桌面端性能仍是用户反馈最集中的痛点。

---

## 2. 版本发布

### v2026.8.27 — Hermes Agent v0.20.6

- **发布日期：** 2026-08-27
- **类型：** Patch release
- **内容：** 汇总自 v0.20.5 以来约 **525 个 PR**，面向 Docker 镜像、托管部署和新安装的稳定标签。
- **破坏性变更：** 未明确说明；建议关注安装/更新相关修复（见下文 Bug 与稳定性部分）。
- **迁移注意：** 若使用 `hermes update` 或桌面端自动更新，建议验证更新后服务重启与配置兼容性，特别是涉及 `uv.lock`、`.desktop` 启动器及 Windows 平台 taskkill 的修复。

🔗 [Release v2026.8.27](https://github.com/NousResearch/hermes-agent/releases)

---

## 3. 项目进展

今日合并/关闭的 113 个 PR 与 115 个 Issue 中，以下进展值得关注：

### 已合并/关闭的重要 PR

- **#96730 — fix(mcp): preserve live stdio child liveness**（P1，已关闭）  
  修复 `_stdio_children_dead()` 对存活子进程的误判，保留 fail-fast 机制仅在全部子进程退出后触发。直接解决 #94335 与 #94637 两个 P1 Bug。  
  🔗 [PR #96730](https://github.com/NousResearch/hermes-agent/pull/96730)

### 已关闭的关键 Issue（代表修复完成）

- **#94724 — Desktop persistent multi-gateway connections — CAMPAIGN COMPLETE**（P2，已关闭）  
  桌面端持久多网关连接活动收官，**29 个 PR 合并**，2 个同日回归已修复，15 个被挽救的 PR 全部交付。  
  🔗 [Issue #94724](https://github.com/NousResearch/hermes-agent/issues/94724)

- **#96282 — Desktop boot times out: HERMES_BACKEND_READY sentinel**（P1，已关闭）  
  修复 Electron 桌面端因 stdout 重定向导致的后端就绪信号丢失问题。  
  🔗 [Issue #96282](https://github.com/NousResearch/hermes-agent/issues/96282)

- **#90950 — state.db corruption on SQLite 3.53.1**（P1，已关闭）  
  解决 WAL sidecar 在并发写入下的 unlink 竞争问题，涉及两个 profile 的损坏恢复。  
  🔗 [Issue #90950](https://github.com/NousResearch/hermes-agent/issues/90950)

- **#78981 — Session permanently dies after repeated context-compression hangs**（P1，已关闭）  
  修复 DeepSeek 500k token 长会话在上下文压缩挂起后永久死亡的问题。  
  🔗 [Issue #78981](https://github.com/NousResearch/hermes-agent/issues/78981)

- **#85125 — Tracking: unified deadline layer**（P3，已关闭）  
  架构级修复计划完成，针对 400+ 超时/挂起类 Issue 的结构性方案已落地。  
  🔗 [Issue #85125](https://github.com/NousResearch/hermes-agent/issues/85125)

- **#91277 — Fleet update reliability tracking**（P1，已关闭）  
  安装/更新可靠性跟踪计划关闭，相关修复已合入。  
  🔗 [Issue #91277](https://github.com/NousResearch/hermes-agent/issues/91277)

**整体判断：** 项目在 MCP 工具链稳定性、桌面端会话管理、更新流程可靠性三个方向上有显著推进，架构级修复（deadline layer）的落地将有助于减少长期存在的超时/挂起类问题。

---

## 4. 社区热点

今日讨论最活跃的 Issue/PR 反映了社区对基础设施稳定性与安装体验的高度关注：

| 排名 | Issue/PR | 评论数 | 核心诉求 |
|------|----------|--------|----------|
| 1 | [#66616 Skills index is stale or degraded](https://github.com/NousResearch/hermes-agent/issues/66616) | 108 | Skills Hub 依赖的索引文件已 29.8 小时未更新（限制 26h），自动化探针失败，影响文档站与技能发现 |
| 2 | [#88584 Automated Nous integration is blocked](https://github.com/NousResearch/hermes-agent/issues/88584) | 36 | Nous-to-Enterkey 定时合并因 `cron/jobs.py` 冲突阻塞，dashboard 更新停留在旧版本 |
| 3 | [#85125 Tracking: unified deadline layer](https://github.com/NousResearch/hermes-agent/issues/85125) | 23 | 社区对 400+ 超时/挂起问题的结构性修复方案高度关注，已关闭 |
| 4 | [#91277 Fleet update reliability](https://github.com/NousResearch/hermes-agent/issues/91277) | 23 | 安装/更新是当前最不可靠的能力，约 30 个 open issues 和 15 个 open PRs 各自修补同一类问题 |
| 5 | [#87093 Debian installation broken](https://github.com/NousResearch/hermes-agent/issues/87093) | 22 | Debian 13.6 上 `curl \| bash` 安装失败，`uv.lock` 与 `npm install` 均报错，👍 4 |

**分析：** 社区最关心的是 **“开箱即用”的可靠性**——无论是文档基础设施（Skills 索引）、自动化集成（Nous 合并），还是基础安装流程。这些问题的共同点是它们阻塞了用户上手或持续使用的路径，而非高级功能缺陷。

---

## 5. Bug 与稳定性

按严重程度排列今日活跃的 Bug（含已关闭但值得关注的）：

### P0（严重）

- **#87093 — [Setup]: Debian installation broken; uv.lock & npm install failed**（OPEN，👍 4）  
  Debian 13.6 上安装脚本失败，`uv.lock` 解析与 `npm install` 均报错。**暂无 fix PR。**  
  🔗 [Issue #87093](https://github.com/NousResearch/hermes-agent/issues/87093)

### P1（高）

- **#93888 — Desktop sends local runtime ID to Remote Gateway, cannot restore sessions**（OPEN）  
  桌面端向远程网关发送 8 字符运行时 ID，导致“Restore failed — Session not found”。**暂无 fix PR。**  
  🔗 [Issue #93888](https://github.com/NousResearch/hermes-agent/issues/93888)

- **#51327 — Desktop silently fails from .desktop launcher when chrome-sandbox lacks setuid**（OPEN，6月创建）  
  Linux 下点击图标静默失败，Electron `chrome-sandbox` 未配置 4755 权限。**长期未修复。**  
  🔗 [Issue #51327](https://github.com/NousResearch/hermes-agent/issues/51327)

- **#66887 — Multiplexed gateway: secondary-profile Telegram sessions persist in default profile's state.db**（OPEN）  
  多路网关下，次要 profile 的 Telegram 会话错误持久化到默认 profile 的存储中。**暂无 fix PR。**  
  🔗 [Issue #66887](https://github.com/NousResearch/hermes-agent/issues/66887)

- **#60323 — Desktop local backend can miss HERMES_BACKEND_READY and time out on macOS**（OPEN）  
  macOS 上后端已就绪但桌面端超时（90000ms）。**暂无 fix PR。**  
  🔗 [Issue #60323](https://github.com/NousResearch/hermes-agent/issues/60323)

- **#92145 — `hermes update` leaves running services on stale sys.modules when auto-restart aborts on ImportError**（OPEN）  
  更新后自动重启阶段若抛出 ImportError，运行中的服务会停留在旧模块状态。**暂无 fix PR。**  
  🔗 [Issue #92145](https://github.com/NousResearch/hermes-agent/issues/92145)

- **#89346 — Shared primary profile routes reload session history from root store after #88734**（OPEN）  
  共享主 profile 在 #88734 修复后出现会话历史分裂。**暂无 fix PR。**  
  🔗 [Issue #89346](https://github.com/NousResearch/hermes-agent/issues/89346)

- **已关闭的 P1（今日修复）：**  
  - [#96282 桌面启动超时](https://github.com/NousResearch/hermes-agent/issues/96282)  
  - [#94335 MCP stdio liveness 误判](https://github.com/NousResearch/hermes-agent/issues/94335)（由 PR #96730 修复）  
  - [#94637 MCP stdio fast-fail（重复）](https://github.com/NousResearch/hermes-agent/issues/94637)  
  - [#90950 state.db 损坏](https://github.com/NousResearch/hermes-agent/issues/90950)  
  - [#78981 会话永久死亡](https://github.com/NousResearch/hermes-agent/issues/78981)

### P2（中）

- **#88275 — Renderer process burns 40-70% CPU at idle on macOS Intel**（OPEN）  
  桌面端渲染进程空闲时高 CPU，导致热节流。**暂无 fix PR。**  
  🔗 [Issue #88275](https://github.com/NousResearch/hermes-agent/issues/88275)

- **#92095 — Desktop writes broken .desktop Exec= on uv-based installs**（OPEN）  
  uv 安装下 `.desktop` 启动器指向裸解释器，点击静默失败。**暂无 fix PR。**  
  🔗 [Issue #92095](https://github.com/NousResearch/hermes-agent/issues/92095)

- **#52339 — Terminal update rebuilds Desktop but leaves /Applications/Hermes.app stale**（OPEN）  
  macOS 上终端更新后应用包不同步，产生 split-brain 状态。**暂无 fix PR。**  
  🔗 [Issue #52339](https://github.com/NousResearch/hermes-agent/issues/52339)

- **#11113 — MCP circuit breaker treats tool-level errors as server failures**（OPEN）  
  业务错误（DNS、HTTP 4xx/5xx）触发熔断，导致整个 MCP 服务器被禁用。**暂无 fix PR。**  
  🔗 [Issue #11113](https://github.com/NousResearch/hermes-agent/issues/11113)

- **#90477 — Desktop profile switch on SSH remote spawns LOCAL backend**（OPEN）  
  SSH 远程连接下切换 profile 会错误启动本地后端并回退到无关 profile。**暂无 fix PR。**  
  🔗 [Issue #90477](https://github.com/NousResearch/hermes-agent/issues/90477)

- **#95589 — Windows desktop: hermes update hangs after build**（CLOSED）  
  已关闭，但值得关注：Windows 上更新后不重启桌面端，产生僵尸进程（2/2 可复现）。  
  🔗 [Issue #95589](https://github.com/NousResearch/hermes-agent/issues/95589)

---

## 6. 功能请求与路线图信号

### 高热度功能请求

- **#20510 — Cloud Sync for All Hermes Configurations Across Devices**（P3，👍 20）  
  用户希望跨设备同步 `~/.hermes/` 下的配置、profiles、skills、sessions 和 memory。目前无对应 PR，但社区需求强烈，可能进入路线图。  
  🔗 [Issue #20510](https://github.com/NousResearch/hermes-agent/issues/20510)

- **#5528 — Configurable approval-locked command patterns**（P3，👍 12）  
  将危险命令审批模式从硬编码改为可配置，便于用户自定义安装特定命令的审批策略。与安全相关的 PR #93925（子进程类型化权限）方向一致。  
  🔗 [Issue #5528](https://github.com/NousResearch/hermes-agent/issues/5528)

- **#77111 — RealtimeVoiceProvider ABC**（P3，👍 2）  
  四个并行的 duplex-voice PR 需要统一接口而非逐个合并。社区建议设计 ABC + orchestrator，符合 AGENTS.md 的“Footprint Ladder”原则。  
  🔗 [Issue #77111](https://github.com/NousResearch/hermes-agent/issues/77111)

- **#5320 — Raise/auto-scale memory_char_limit defaults**（P3，👍 2）  
  默认记忆上限（2200 字符）在长会话中容易触顶，建议自动扩展并暴露使用压力。  
  🔗 [Issue #5320](https://github.com/NousResearch/hermes-agent/issues/5320)

### 可能纳入下一版本的功能 PR

- **#95281 — pm: unified package manager**（P3，needs-decision）  
  将 hermes 所有依赖统一到一个依赖树，三个文件各司其职（定义、锁、目标）。有望解决安装/更新碎片化问题。  
  🔗 [PR #95281](https://github.com/NousResearch/hermes-agent/pull/95281)

- **#82747 — feat(update): add hermes sync-fork for forks that have diverged**（P3）  
  允许带本地提交的 fork 同步上游，解决 `hermes update` 对 fork 的更新盲区。  
  🔗 [PR #82747](https://github.com/NousResearch/hermes-agent/pull/82747)

- **#84299 / #84297 — Kanban attachment preview in desktop**（P3）  
  两个 PR 实现桌面端 Kanban 附件预览，一个走后端端点，一个走插件 SDK 能力。  
  🔗 [PR #84299](https://github.com/NousResearch/hermes-agent/pull/84299) | [PR #84297](https://github.com/NousResearch/hermes-agent/pull/84297)

---

## 7. 用户反馈摘要

从今日活跃的 Issue 评论中提炼的真实用户声音：

- **安装体验是最大痛点：**  
  “Debian 13.6 基本安装，只额外装了 Yum，`curl -fsSL ... | bash` 就失败了。”——#87093 用户 @thelightning87  
  多个安装相关 Issue（#87093、#92095、#52339、#95589）表明，从 Debian 到 macOS 再到 Windows，安装/更新流程的可靠性是跨平台共性问题。

- **桌面端性能影响日常使用：**  
  “macOS 电池/电源菜单报告 Hermes 是最高能耗应用，机器明显发热。”——#73082 用户 @Heybinshao  
  “Renderer 进程持续 40-73% CPU，即使 GPU 已禁用。”——#88275 用户 @yuhengliuleo  
  桌面端空闲时的高 CPU 占用是 Intel Mac 用户的普遍困扰。

- **长会话稳定性影响信任：**  
  “132 个工具轮次、约 500k token 的 DeepSeek 会话，在上下文压缩挂起后永久死亡，之后的任何消息都无法开启新回合。”——#78981 用户 @vollegrewar  
  长会话的压缩/恢复机制是高级用户的核心诉求。

- **UX 设计引发强烈情绪：**  
  “显示更多消息是哪个傻逼的设计？”——#90473 用户 @FOMO-RUN（Windows 11 桌面端，约 900 条消息的长会话）  
  分页加载在长会话中的体验不佳，用户希望有更流畅的浏览方式。

- **配置同步需求明确：**  
  “我在 PC 和笔记本上工作，希望配置、profiles、skills、sessions 能跨设备同步。”——#20510 用户 @madiajijah11（👍 20）  
  多设备用户对云同步有明确需求，目前只能手动复制 `~/.hermes/`。

---

## 8. 待处理积压

以下 Issue/PR 长期未获响应或修复，建议维护者优先关注：

| 编号 | 标题 | 创建时间 | 严重度 | 备注 |
|------|------|----------|--------|------|
| [#51327](https://github.com/NousResearch/hermes-agent/issues/51327) | Desktop silently fails from .desktop launcher (chrome-sandbox setuid) | 2026-06-23 | P1 | 2 个月未修复，影响 Linux 桌面用户 |
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) | Tasks with --initial-status blocked auto-promote to ready with no actor | 2026-06-05 | P3 | 审批门被绕过，存在自动化风险 |
| [#20510](https://github.com/NousResearch/hermes-agent/issues/20510) | Cloud Sync for All Hermes Configurations | 2026-05-06 | P3 | 👍 20，社区高需求，无对应 PR |
| [#11113](https://github.com/NousResearch/hermes-agent/issues/11113) | MCP circuit breaker treats tool-level errors as server failures | 2026-04-16 | P2 | 熔断误判导致 MCP 服务器被禁用 |
| [#5320](https://github.com/NousResearch/hermes-agent/issues/5320) | Raise/auto-scale memory_char_limit defaults | 2026-04-05 | P3 | 长会话记忆上限问题，👍 2 |
| [#5528](https://github.com/NousResearch/hermes-agent/issues/5528) | Configurable approval-locked command patterns | 2026-04-06 | P3 | 👍 12，安全相关，建议纳入路线图 |

**维护者提醒：** #51327（P1，Linux 桌面静默失败）与 #39609（审批门绕过）分别涉及安全边界和自动化可靠性，建议优先处理。功能请求 #20510（云同步）虽为 P3，但社区支持度最高（👍 20），可作为路线图参考。

---

*本日报基于 GitHub 公开数据自动生成，数据截至 2026-08-28。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-08-28

## 1. 今日速览

过去 24 小时 AstrBot 项目保持高活跃度：共产生 13 条 Issue 更新（8 条活跃/新开，5 条关闭）和 14 条 PR 更新（11 条待合并，3 条已合并/关闭）。社区贡献者密集提交了多个针对飞书适配器、LLM Provider 兼容性及 WebUI 体验的修复与功能 PR，其中 3 条 PR 已成功合并，项目在 Provider 生态扩展与 WebUI 整合方面稳步推进。无新版本发布，但多条 PR 已进入待合并状态，预计近期将迎来一波功能集中上线。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日合并/关闭了 3 条 PR，主要集中在 WebUI 整合与 Provider 生态扩展：

- **[#9846](https://github.com/AstrBotDevs/AstrBot/pull/9846) feat: consolidate data dashboard and redesign conversations**（已合并，size:XXL）— 将统计、会话、日志、追踪整合为带标签页的 Data 工作区，移除重复侧边栏入口；刷新统计仪表盘样式、模型颜色、平台图标、别名和实时运行时间显示；新增分页会话工作区。这是 WebUI 的一次较大规模整合重构，显著提升了数据管理效率。
- **[#9840](https://github.com/AstrBotDevs/AstrBot/pull/9840) feat: add Synthorai chat completion provider adapter**（已合并，size:M）— 新增 Synthorai Provider 适配器，支持通过一个 API key 接入 11 家上游、113 个模型（Claude、GPT、Gemini、GLM-5.2、Kimi-K3、DeepSeek、Qwen 等），按上游成本价计费。对应 Issue #9807 已关闭。
- **[#9847](https://github.com/AstrBotDevs/AstrBot/pull/9847) feat: add conversation shortcuts to statistics**（已合并，size:M）— 为统计页面每个会话用量排行行添加会话快捷入口，支持从 URL 初始化会话 UMO 过滤器，并保持 URL 同步。

此外，今日有 11 条 PR 处于待合并状态，涵盖 Gemini 3 工具历史修复、GLM Coding Plan 支持、飞书混合消息修复、系统提醒不固化进历史等多个方向，项目整体向前迈进的步伐明显加快。

## 4. 社区热点

- **[#7109](https://github.com/AstrBotDevs/AstrBot/issues/7109) [OPEN] code plan 的 API 支持**（评论 3，创建于 2026-03-28，更新于 2026-08-27）— 用户请求添加对 code plan 计划的 API 支持，提到 Kimi Code、Codex 等产品均已支持。该 Issue 已存在 5 个月，今日因 [#9852](https://github.com/AstrBotDevs/AstrBot/pull/9852)（支持智谱 GLM Coding Plan 的 PR）的关联而重新受到关注。背后诉求是：code plan 用户拥有大量 token，非常适合作为工作+日常 agent 机器人，这反映了用户对高性价比长时运行 AI 助手的需求。

- **[#9811](https://github.com/AstrBotDevs/AstrBot/issues/9811) [CLOSED] [Plugin] astrbot_plugin_video_recognize 视频识别**（评论 3）与 **[#9810](https://github.com/AstrBotDevs/AstrBot/issues/9810) [CLOSED] [Plugin] astrbot_plugin_time_model 时段切换模型**（评论 3）— 两条插件提交均于今日关闭，但评论数较多。视频识别插件支持 QQ 视频消息自动抽帧并调用智谱视觉模型识别；时段切换模型插件可按服务器时间自动切换 AI 模型（白天便宜、夜间强模型），体现了社区对多模态能力和成本优化的双重关注。

## 5. Bug 与稳定性

按严重程度排列：

- **[#9848](https://github.com/AstrBotDevs/AstrBot/issues/9848) [Bug] 飞书群聊中前置 @机器人 导致 /stop 等指令未被识别**（严重，新开）— 飞书群聊中“先 @机器人，再输入指令”时，AstrBot 能被唤醒但不会识别内置指令，而是进入普通 LLM 流程；若 UMO 已有运行中的 Agent，该消息还会被当作 follow-up 捕获。影响所有标准指令（如插件提供的 `/m`）。暂无对应 fix PR。

- **[#9839](https://github.com/AstrBotDevs/AstrBot/issues/9839) [Bug] 飞书平台文字+图片混合消息文字被吞，只发送图片**（中等，新开）— 问题定位在 `lark_event.py` 的 `_convert_to_lark` 方法，文字缓冲被引用后又被清空导致文字丢失。**已有 fix PR：[#9841](https://github.com/AstrBotDevs/AstrBot/pull/9841)**（复制非空文本缓冲和提及后再处理图片）。

- **[#9765](https://github.com/AstrBotDevs/AstrBot/issues/9765) [Bug] 关闭 llm 后还会报错 llm 响应错误**（中等，已关闭）— 用户反馈关闭 LLM 后仍出现 LLM 响应错误日志。该 Issue 今日关闭，但关闭原因未明确。**相关 fix PR：[#9843](https://github.com/AstrBotDevs/AstrBot/pull/9843)**（在获取会话锁后重新检查全局和会话级 LLM 状态，跳过禁用后排队中的请求，并添加回归测试）。

## 6. 功能请求与路线图信号

- **GLM Coding Plan 支持**（[#7109](https://github.com/AstrBotDevs/AstrBot/issues/7109)）— 已有对应 PR [#9852](https://github.com/AstrBotDevs/AstrBot/pull/9852)（新增独立 `zhipu_coding_plan_chat_completion` Provider，支持 GLM-5.3、GLM-5.2、GLM-5-Turbo 等模型），**极可能纳入下一版本**。

- **Synthorai Provider 适配**（[#9807](https://github.com/AstrBotDevs/AstrBot/issues/9807)）— 已通过 PR [#9840](https://github.com/AstrBotDevs/AstrBot/pull/9840) 合并，**已进入主线**。

- **火山引擎 TTS 新版 API 支持**（[#9657](https://github.com/AstrBotDevs/AstrBot/issues/9657)）— 请求支持新版音频生成 HTTP API（/api/v3/tts/create），当前仍使用旧版接口。暂无对应 PR，但需求明确，可能进入后续迭代。

- **日志分类与筛选**（[#9850](https://github.com/AstrBotDevs/AstrBot/issues/9850)）— 建议按适配器和插件分类日志，并支持持久化与筛选。用户提到此前有类似 Issue 但 PR 未合并，属于 WebUI 体验优化方向。

- **system_reminder 注入块使用 mark_as_temp() 机制**（[#9779](https://github.com/AstrBotDevs/AstrBot/issues/9779)）— 已有对应 PR [#9844](https://github.com/AstrBotDevs/AstrBot/pull/9844)（将注入的系统提醒标记为临时内容，不持久化到会话历史），**预计很快合并**。

- **bot 上下文理解能力增强**（[#9849](https://github.com/AstrBotDevs/AstrBot/issues/9849)）— 描述极为简短（"见标题"），信息量有限，但反映了用户对对话连贯性的期待。

## 7. 用户反馈摘要

- **对 code plan 类 API 的强烈需求**（[#7109](https://github.com/AstrBotDevs/AstrBot/issues/7109)）：用户明确指出"充值 codeplan 用户的 token 都非常多，很适合作为工作+日常 agent 机器人"，说明高 token 额度套餐用户希望将 AstrBot 作为主力生产力工具。

- **对插件调试体验的不满**（[#9850](https://github.com/AstrBotDevs/AstrBot/issues/9850)）：用户抱怨"所有日志都混在一起，且没有持久化滚动的巨快，想调试个插件没有现成 E2E 套件就算了，从日志里找信息都很困难"，并建议在插件页面内直接查看该插件的日志。这反映了插件开发者群体的真实痛点。

- **对系统提醒固化进历史的担忧**（[#9779](https://github.com/AstrBotDevs/AstrBot/issues/9779)）：用户指出内部元信息块（如 User ID、当前时间）会随用户消息持久化进 conversations 表并永久滞留，既污染上下文又浪费 token。该问题已被维护者接受并有对应 PR，说明用户反馈质量较高。

- **对插件按群独立配置的期望**（[#9784](https://github.com/AstrBotDevs/AstrBot/issues/9784)）：用户建议在插件配置中支持按群独立配置，在可配置项旁添加加号进行二次配置，输入内容包括 QQ 群或 QQ 号。这体现了多群组管理场景下的精细化配置需求。

## 8. 待处理积压

- **[#6555](https://github.com/AstrBotDevs/AstrBot/issues/6555) [Feature] 更清晰的 Trace 追踪链路实现**（创建于 2026-03-18，更新于 2026-08-27，评论 2）— 已存在 5 个多月，用户提交了完整的改造方案和截图，但至今未合并或关闭。该功能对排查 Agent 调用过程有明确价值，建议维护者评估是否纳入路线图。

- **[#9657](https://github.com/AstrBotDevs/AstrBot/issues/9657) [Feature] 火山引擎 TTS 新版 API 支持**（创建于 2026-08-13，更新于 2026-08-27）— 已存在两周，暂无 PR 关联。火山引擎是中文用户常用的 TTS 服务，新版 API 的适配需求明确。

- **[#9667](https://github.com/AstrBotDevs/AstrBot/pull/9667) feat: add chat history pagination and reasoning blocks**（创建于 2026-08-13，更新于 2026-08-27，size:XL）— 大型 PR，为聊天会话历史添加分页加载和推理/思考内容懒加载，修复 #9652。已开放两周，仍待审查，建议维护者关注。

---

**项目健康度评估**：AstrBot 社区贡献活跃，Issue 响应及时（5 条关闭），PR 合并节奏良好（3 条合并），且多个新提交的 PR 直接对应社区反馈的 Bug 和功能请求（如 #9841 修复 #9839、#9844 修复 #9779、#9843 修复 #9765），形成了"用户报障 → 贡献者修复 → 维护者合并"的良性循环。建议维护者重点关注飞书适配器的系列问题（#9848、#9839）以及长期积压的 Trace 追踪功能（#6555）。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*