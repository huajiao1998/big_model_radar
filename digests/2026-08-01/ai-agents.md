# OpenClaw 生态日报 2026-08-01

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-07-31 22:50 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 开源项目动态日报 — 2026-08-01

> 数据窗口：2026-07-31 → 2026-08-01 | 数据源：github.com/openclaw/openclaw

---

## 1. 今日速览

过去 24 小时 OpenClaw 仓库保持超高速运转：**500 条 Issue 更新**（新开/活跃 459，关闭 41）与 **500 条 PR 更新**（待合并 394，合并/关闭 106），**无新版本发布**。项目活跃度极高，但处于典型的"进多出少"承压状态——Issue 关闭率仅 8.2%、PR 合并率仅 21.2%，积压正在加速扩大。稳定性方面警报未解除：约 20 个开放 P1 级 Issue 中仅 2 个附有修复 PR，消息丢失（message-loss）、会话状态卡死（session-state）、Codex turn 生命周期三类问题构成当前最突出的技术债。今日没有新功能落地，维护者精力明显倾斜向架构重构（session/Slack/cron 修复）与积压清理。

---

## 2. 版本发布

今日无正式版本发布。但多个 Issue 直接指向 **2026.7.1 稳定版与 2026.7.2-beta.x 系列存在的回归问题**，包括 #116418（Ollama 路由）、#109145（Gateway 监听不 accept）、#114020（Feishu/Telegram dispatch 失败，beta.4 引入，已关闭修复）、#116973（beta.5 镜像内文档列示退役配置项）。社区对 7.x 系列的升级稳定性评价偏低，建议维护团队加速推出修复性补丁版本。

---

## 3. 项目进展

### 今日合并/关闭的重要 PR

今日关闭的 PR 集中于**可靠性修复与架构清理**，没有大型新功能合入：

| PR | 类型 | 说明 |
|---|---|---|
| [#117073](https://github.com/openclaw/openclaw/pull/117073) | refactor(sessions) | 精简 session manager 门面重复的继承方法签名，厘清持久化与分支所有权边界 |
| [#117060](https://github.com/openclaw/openclaw/pull/117060) | fix(slack) P1 | 修复 Slack 启动时 `auth.test` 瞬时失败导致身份永久降级，恢复需显式 bot user ID 的频道能力 |
| [#117068](https://github.com/openclaw/openclaw/pull/117068) | perf(doctor) | 修复 `doctor --fix` 对大型 SQLite session 存储按修复组重复全量扫描的 O(groups×total) 问题，消除数小时级卡顿 |
| [#117071](https://github.com/openclaw/openclaw/pull/117071) | fix(cron) P1 XL | 修复格式错误的定时任务静默丢失恢复数据、产生运行时 `jobs-quarantine.json`、多 cron 服务互相覆盖等问题 |

### 今日关闭的 Issue

- [#67288](https://github.com/openclaw/openclaw/issues/67288) — amazon-bedrock-mantle 缺少 `config.discovery.enabled` 开关，每次请求都跑 IAM discovery（13 评论，社区关注度高）
- [#86063](https://github.com/openclaw/openclaw/issues/86063) — Anthropic 1h 缓存因入站元数据剥离 + cache_control 字段移动而逐轮失效（成本类热点）
- [#34528](https://github.com/openclaw/openclaw/issues/34528) — 飞书 reaction 后缀 message_id 导致 API 400
- [#94536](https://github.com/openclaw/openclaw/issues/94536) — commitment 标记 sent 但未投递（PR #92231 修复不完整的第二例）
- [#114020](https://github.com/openclaw/openclaw/issues/114020) — 2026.7.2-beta.4 升级后 Feishu/Telegram dispatch 失败（P1，快速关闭）
- [#116973](https://github.com/openclaw/openclaw/issues/116973) — 镜像内配置文档列示已退役的 `gateway.reload` 键（当日开当日关，文档修复响应快）

**评估**：今日项目"向内走"——session 架构简化、cron 状态机加固、doctor 性能优化均是地基性工作，为后续功能开发扫清障碍，但面向用户的新能力推进有限。

---

## 4. 社区热点

### 讨论最活跃的 Issues

1. **[#115326](https://github.com/openclaw/openclaw/issues/115326) — Crash-loop breaker 永久压制 Discord/WhatsApp，文档恢复路径失败**（24 评论，P1，评级 🐚 platinum hermit）
   今日最热 Issue。崩溃循环保护器在网关正常启动后仍永久禁用 Discord/WhatsApp，且官方文档给出的 `channels.start` 恢复手段以 WebSocket 1006 失败。用户的核心情绪是**"文档承诺的恢复路径失效"**，同时叠加 message-loss 与 crash-loop 双重 impact，信号等级拉满。

2. **[#79902](https://github.com/openclaw/openclaw/issues/79902) — 增加对第三方友好的 SQLite transcript/session 接口**（14 评论，👍2，有 linked PR）
   社区开发者希望在 database-first 运行时之上获得稳定的 SQLite 会话/记录读取层，而非抓取不透明 blob 或重造内部逻辑。已有 PR 在途，属"社区期待值高、落地中"的状态。

3. **[#69208](https://github.com/openclaw/openclaw/issues/69208) — Umbrella: 跨频道重复 transcript/replay/context 组装问题**（12 评论，P1）
   维护者标记的总览 Issue，聚合 MSTeams、webchat、Telegram、followup 队列、delivery-mirror 等多条链路的同类 Bug，说明重复记录/重放已从个例演化为**系统性架构缺陷**。

4. **[#114137](https://github.com/openclaw/openclaw/issues/114137) — 可见频道 turn 间歇性无 reply payload，最终文本落库不投递**（11 评论，P1）
   2026.7.1-2 上 Signal 频道出现"transcript 里有最终文本、用户永远收不到"的幽灵投递问题，与 #69208 属同一类。

5. **[#85251](https://github.com/openclaw/openclaw/issues/85251) — Codex app-server 发 turn/started 后静默，run 卡死至恢复窗口**（11 评论，P1）
   Codex 侧车发完 `notification:turn/started` 后无任何 delta/completed/error，会话在 `embedded_run` 状态卡满 360s 才被强制恢复。与 #109490、#107464 构成 **Codex turn 生命周期 Bug 三连**。

**诉求分析**：社区当前最关心的不是新功能，而是**投递可信度**与**会话一致性**。多个高热度 Issue 都指向同一句话——"系统告诉我完成了，但用户没收到"。这类问题直接侵蚀 AI 助手产品的核心信任，建议作为最高优先级处理。

---

## 5. Bug 与稳定性

### 按严重程度排列的当前活跃 Bug

| 严重度 | Issue | 问题摘要 | 修复状态 |
|---|---|---|---|
| **P0** | [#70903](https://github.com/openclaw/openclaw/issues/70903) | 文件型 provider 冷却在用户充值后仍持续封锁数小时，跨重启持久化（4/24 开启，已积压 99 天） | ❌ 无 fix PR |
| P1 | [#115326](https://github.com/openclaw/openclaw/issues/115326) | Crash-loop breaker 永久压制 Discord/WhatsApp，`channels.start` 恢复失败 | ❌ 无 fix PR |
| P1 | [#114137](https://github.com/openclaw/openclaw/issues/114137) | 可见频道 turn 间歇性无 reply payload，文本持久化但未投递 | ❌ 无 fix PR |
| P1 | [#85251](https://github.com/openclaw/openclaw/issues/85251) | Codex turn/started 后完全静默，run 卡死至 stuck-session 恢复 | ❌ 无 fix PR |
| P1 | [#109490](https://github.com/openclaw/openclaw/issues/109490) | 客户端委派 message 工具返回 terminate:true 后 turn 被中断，承诺的工作不执行 | ❌ 无 fix PR |
| P1 | [#107464](https://github.com/openclaw/openclaw/issues/107464) | Telegram `message(action=send)` 在 message_tool_only 模式提前释放 Codex turn | ❌ 无 fix PR |
| P1 | [#114211](https://github.com/openclaw/openclaw/issues/114211) | Matrix 房间 agent 在 no-reply 输出上自循环，重启后重放过期会话 | ❌ 无 fix PR |
| P1 | [#114234](https://github.com/openclaw/openclaw/issues/114234) | 容器内 PID 复用导致 usage-cost 刷新锁永久不可释放，缓存冻结 | ✅ 有 linked PR |
| P1 | [#114255](https://github.com/openclaw/openclaw/issues/114255) | 重启中断 run 后 session 卡 running，Telegram spool 永远重试 | ❌ source-repro，无 fix |
| P1 | [#91564](https://github.com/openclaw/openclaw/issues/91564) | Telegram 特定 forum topic 变永久入站黑洞（ack 后无日志、agent 看不见） | ❌ 无 fix PR |
| P1 | [#90378](https://github.com/openclaw/openclaw/issues/90378) | 5.28→6.1 升级 cron 静默迁移 SQLite，新任务默认 announce 模式导致频道报错 | ✅ 有 linked PR |
| P1 | [#114653](https://github.com/openclaw/openclaw/issues/114653) | `sessions_send/history` 瞬时故障被裸 catch 吞掉，与策略拒绝无法区分 | ❌ 无 fix PR |
| P1 | [#109145](https://github.com/openclaw/openclaw/issues/109145) | Gateway HTTP "listening" 但 socket 不 accept 连接（7.1-beta.5） | ❌ 无 fix PR |
| P1 | [#92186](https://github.com/openclaw/openclaw/issues/92186) | 前台回复栅栏取消较早完成并发群消息的投递，dashboard 可见但 WhatsApp 收不到 | ❌ 无 fix PR |
| P1 | [#106786](https://github.com/openclaw/openclaw/issues/106786) | gpt-5.6-* 在 ChatGPT-OAuth 路由被广告后静默回退，用户无感知 | ❌ 无 fix PR |
| P1 | [#116418](https://github.com/openclaw/openclaw/issues/116418) | **（7/30 新报）** 2026.7.1 中 Ollama 永远不会被选为主模型，总是回退下一个模型 | ❌ 无 fix PR |

### 值得警惕的回归

- [#90786](https://github.com/openclaw/openclaw/issues/90786) — `memory status --index/--deep` 升级后报 "Unknown memory embedding provider: google"（5/26→6.1 回归）
- [#77930](https://github.com/openclaw/openclaw/issues/77930) — Discord 频道加载在 2026.5.4 回归，且 beta.1 正常 / beta.2 损坏来回横跳
- [#108379](https://github.com/openclaw/openclaw/issues/108379) — 小米 MiMo（openai-completions）重复生成尝试，中止前反复输出叙事文本

**今日新增高信号 Bug**：#116418（Ollama 主模型路由）与 #115001（混合记忆搜索 FTS LIKE-fallback 硬编码 textScore 导致虚假 1.0 相似度）。前者直接影响本地模型用户，48h 内无 fix，建议快速响应。

---

## 6. 功能请求与路线图信号

### 社区呼声最高的功能需求

| 类别 | Issue | 需求 | 信号 |
|---|---|---|---|
| 安全/沙箱 | [#7722](https://github.com/openclaw/openclaw/issues/7722) | 文件系统访问沙箱（`tools.fileAccess` allowed/denyPaths） | 👍4，2/3 开启 |
| 安全/合规 | [#64046](https://github.com/openclaw/openclaw/issues/64046) | 敏感数据脱敏（apikey/token 明文存储、日志与 UI 明文展示） | P1，安全审查待办 |
| 安全/隔离 | [#15032](https://github.com/openclaw/openclaw/issues/15032) | 子代理 per-spawn 工具限制（DMZ 搜索防注入场景） | 有 linked PR |
| 模型/路由 | [#10687](https://github.com/openclaw/openclaw/issues/10687) | 全动态模型发现（OpenRouter 等快变目录） | 👍3，2/6 开启 |
| 模型/成本 | [#9016](https://github.com/openclaw/openclaw/issues/9016) | 将 OpenRouter usage 成本暴露给 agent 运行时 | 👍1 |
| 模型/控制 | [#8724](https://github.com/openclaw/openclaw/issues/8724) | 按模型配置生成超时（Gemini Flash 死循环场景） | 6 评论 |
| SDK/扩展 | [#81913](https://github.com/openclaw/openclaw/issues/81913) | 为已安装 skill 工作流暴露稳定插件 SDK 表面 | 有 linked PR |
| SDK/存储 | [#79902](https://github.com/openclaw/openclaw/issues/79902) | SQLite transcript/session 对外查询接口 | 有 linked PR |
| 新集成 | [#87325](https://github.com/openclaw/openclaw/issues/87325) | Azure Foundry GPT Realtime Talk 支持 | 6 评论 |
| 新集成 | [#114146](https://github.com/openclaw/openclaw/issues/114146) | Talk 实时语音 provider 可配置 baseUrl（兼容阿里百炼等） | 5 评论 |
| 新集成 | [#63930](https://github.com/openclaw/openclaw/issues/63930) | Anthropic advisor 工具（server-side tool block 通用处理） | 👍1 |
| 新集成 | [#64438](https://github.com/openclaw/openclaw/issues/64438) | 远程 reranker 端点支持 | 6 评论 |

### 路线图信号（来自今日 XL 级 PR）

今日提交的 5 个 XL 级 PR 透露下一阶段方向：

- **[#116013](https://github.com/openclaw/openclaw/pull/116013) — Add hosted Gateway policy enforcement**：服务器端策略执行，与 #7722/#64046/#15032 的安全诉求形成呼应，**最可能进入 2026.8.x 安全增强批次**
- **[#116671](https://github.com/openclaw/openclaw/pull/116671) — Slack 默认语义化进度任务卡片**：替代默认部分流式输出，提升多租户工作区体验
- **[#115869](https://github.com/openclaw/openclaw/pull/115869) — 小模型 Code Mode 可靠性改进**：延续 #115729/#115311，面向 Ollama/本地小模型用户
- **[#116314](https://github.com/openclaw/openclaw/pull/116314) — 命名 profile 的 gateway 服务命令**：修复 profile 身份守卫误拒 canonical 路径
- **[#112801](https://github.com/openclaw/openclaw/pull/112801) — 本地化渐进式接入**：依赖 #112784，属长期基建

---

## 7. 用户反馈摘要

- **"文档恢复路径失效"是最集中的信任损伤点**：#115326 中用户按文档执行 `channels.start` 却得到 WebSocket 1006，频道被永久压制；#116973 则反映 7.2-beta.5 镜像内自带的 configuration-reference.md 仍列示已退役的 `gateway.reload` 键——照文档配置即报错。两案叠加，社区对文档-实现同步性的信心明显下降。
- **升级即回归的挫败感**：连续多起升级事故——#90378（cron 静默迁移且默认值改变）、#77930（Discord 回归矩阵反复）、#90786（memory 子命令直接报错）、#114020（beta.4 全量 Feishu dispatch 失败）。用户对 2026.5→2026.7 系列升级稳定性评价偏低，**建议建立升级回归自动测试矩阵**。
- **成本焦虑显性化**：#86063（Anthropic 1h 缓存每轮失效）与 #95610（OpenAI 前缀缓存被 per-turn 动态注入击穿）是热帖中的隐形痛点——缓存失效直接转化为账单压力。两个 Issue 均无 fix PR，成本类问题修复优先级应上调。
- **小额正面反馈**：#117060（Slack 身份恢复）、#117068（doctor 性能）等维护者快速响应获得认可；#103198（WebChat 图片路径）获 👍3，是今日共鸣度最高的体验类 Bug（agent 收到 `image_0` 占位符而非真实路径，无法读图）。

---

## 8. 待处理积压

以下长期未获修复或响应的重要 Issue/PR，提醒维护者关注：

- **🔴 P0 三个月无人认领**：[#70903](https://github.com/openclaw/openclaw/issues/70903) Provider 冷却持久化封锁（4/24 开启，99 天无 fix PR）。P0 级 + 直接经济损失（用户充值后仍被锁），是全仓库最应优先处理的积压。
- **🔴 高赞功能长期无 PR**：[#7722](https://github.com/openclaw/openclaw/issues/7722) 文件沙箱（2/3，👍4）、[#10687](https://github.com/openclaw/openclaw/issues/10687) 动态模型发现（2/6，👍3）——社区点赞最高、维护者响应最慢，容易消耗社区信任。
- **🟠 P1 消息丢失悬置超 50 天**：[#91564](https://github.com/openclaw/openclaw/issues/91564) Telegram 入站黑洞（6/9）、[#92186](https://github.com/openclaw/openclaw/issues/92186) 回复栅栏吞消息（6/11）——均为用户可见的静默丢消息，修复周期过长。
- **🟠 Codex turn 生命周期三连（建议合并处理）**：[#85251](https://github.com/openclaw/openclaw/issues/85251)（5/22）、[#109490](https://github.com/openclaw/openclaw/issues/109490)（7/17）、[#107464](https://github.com/openclaw/openclaw/issues/107464)（7/14）——三个 P1 同源，建议参照 #69208 模式建 umbrella 统一推进。
- **🟠 新晋 P1 需快速响应**：[#116418](https://github.com/openclaw/openclaw/issues/116418)（Ollama 主模型路由，7/30 新报）、[#115326](https://github.com/openclaw/openclaw/issues/115326)（24 评论高热，无 fix）。
- **🟡 待合并 XL PR 卡关**：[#112801](https://github.com/openclaw/openclaw/pull/112801) 本地化（7/22 起 waiting）、[#116013](https://github.com/openclaw/openclaw/pull/116013) 托管策略执行（7/29 起 needs proof）——均为维护者标记依赖，需明确 reviewer 排期。

---

## 健康度总结

| 维度 | 评分 | 说明 |
|---|---|---|
| 社区活跃度 | ★★★★★ (9/10) | 24h 内 500+500 条更新，讨论密度极高 |
| 交付效率 | ★★☆☆☆ (4/10) | 394 条 PR 待合并积压，Issue 关闭率仅 8.2% |
| 稳定性 | ★★☆☆☆ (3/10) | 20 个开放 P1 仅 2 个有修复 PR，message-loss 类问题集中爆发 |
| 路线图清晰度 | ★★★☆☆ (6/10) | 安全增强与 Slack 语义化为明确方向，但被 Bug 修复稀释 |

**核心建议**：① 立即为 #70903 与 #115326 分配 fix 人手；② 将 Codex turn 三连合并为 umbrella 并指定负责人；③ 建立升级回归测试矩阵（本次数据中 5 起升级回归均本可拦截）；④ 提高 PR 合并吞吐，394 条待合并对维护者与贡献者都是沉重负担。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告（2026-08-01）

## 1. 生态全景

过去 24 小时，六个主要开源项目合计产生约 2,200 条 Issue/PR 更新，生态处于极高活跃状态。但头部项目普遍"进多出少"——OpenClaw 与 hermes-agent 的 Issue 关闭率仅 8%–12%，PR 合并率 16%–21%，技术债积压成为共同瓶颈。社区最强烈的声音已从"想要新功能"转向"系统告诉我完成了，但用户没收到"的投递可信度问题。与此同时，安全沙箱、记忆分层与模型路由弹性在多个项目中同步涌现，标志生态正从"功能扩张期"进入"可靠性补课期"。

## 2. 各项目活跃度对比

| 项目 | Issue 更新（关闭率） | PR 更新（合并率） | Release | 健康度要点 |
|---|---|---|---|---|
| **OpenClaw** | 500（8.2%） | 500（21.2%） | 无 | 活跃度满分；约 20 个开放 P1 仅 2 个有修复 PR，稳定性红灯 |
| **hermes-agent** | 500（11.6%） | 500（16.2%） | v0.19.1 | 高吞吐合并（81 PR/日），但桌面端更新机制出现 P1 缺陷三连 |
| **Zeroclaw** | 40（5%） | 50（12%） | 无 | 架构 RFC 密集；P0 Webhook 认证缺失未修复，wasmtime 修复待合入 |
| **QwenPaw** | 20（30%） | 43（30.2%） | 无 | 响应快，4 个关键修复 PR 在途；AgentScope 兼容性是当前主要矛盾 |
| **AstrBot** | 10（40%） | 22（40.9%） | 无 | 六者中交付效率最高，维护者 lgtm 响应及时（健康度 4/5） |
| **PicoClaw** | 2（0%） | 3（0%） | 无 | 活跃度低，3 个 PR 已等待 29–35 天，评审瓶颈明显 |

## 3. OpenClaw 在生态中的定位

- **生态参照系地位**：作为唯一达到日更 1,000 条量级的项目，OpenClaw 的 Issue 讨论深度（如 #115326 单日 24 评论）与 P0/P1 分级事实上充当生态"晴雨表"。多个项目直接复用其方案——Zeroclaw #9562 引用 openclaw#81629 修复自动滚动，AstrBot #9483 对标 OpenClaw 的思考等级设置。
- **技术路线差异**：走"重型多租户网关 + 统一 session 持久化"路线，渠道覆盖（Slack/Telegram/Discord/Feishu/Matrix/WhatsApp）为全生态最广。当前正处于 session/Slack/cron 架构重构期，押注"通讯层收敛"而非"终端体验"。
- **社区规模对比**：单日更新量约为 Zeroclaw 的 12 倍、QwenPaw 的 16 倍、AstrBot 的 31 倍；但关闭率（8.2%）约为 AstrBot（40%）的 1/5。社区声量大与交付吞吐不足的矛盾，是 OpenClaw 当前最大风险。
- **核心竞争力**：P1 级 Issue 的复现质量与分析深度（Codex turn 生命周期三连、crash-loop breaker 文档失效案）显示其用户中专业开发者占比高——生态粘性来自"问题分析深度"而非"功能交付速度"。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **投递可信度 / 消息丢失** | OpenClaw、hermes、QwenPaw、AstrBot、Zeroclaw | "transcript 有文本、用户收不到"的幽灵投递（OpenClaw #114137/#92186）；微信/Telegram 静默失败（QwenPaw #6614、AstrBot #9477）；Runs API 审批恢复（hermes #75707）；Webhook 无认证致投递可伪造（Zeroclaw #9565） |
| **会话/记忆持久化与检索** | OpenClaw、Zeroclaw、hermes、QwenPaw、PicoClaw | 开放 SQLite transcript 查询接口（OpenClaw #79902）；对话历史与长期记忆分离（Zeroclaw #9048）；跨会话记忆搜索+自动压缩（hermes #8457）；记忆压缩丢早期会话（QwenPaw #6555） |
| **安全沙箱与权限模型** | OpenClaw、hermes、AstrBot、Zeroclaw | 文件访问沙箱（OpenClaw #7722）；Gateway RBAC 分级（hermes #527）；Shell 会话按发送者隔离（AstrBot #9479）；子代理 per-spawn 工具限制（OpenClaw #15032） |
| **模型路由 / 回退 / 成本** | OpenClaw、PicoClaw、hermes、QwenPaw | Ollama 主模型路由失效（OpenClaw #116418）；可配置 fallback 链（PicoClaw #3200）；73% token 为固定开销（hermes #4379）；缓存逐轮失效推高账单（OpenClaw #86063/#95610） |
| **升级回归与发布工程** | OpenClaw、hermes、QwenPaw、AstrBot、Zeroclaw | 升级即回归频发（OpenClaw 单项目 5 起、QwenPaw #6537、AstrBot #9433）；桌面更新机制缺陷集群（hermes）；发布签名机制三套冗余（Zeroclaw #9101） |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 关键架构特征 |
|---|---|---|---|
| **OpenClaw** | 全渠道消息网关 + 企业级多租户 | 自托管团队、深度技术用户 | 重型网关；session 持久化与投递管道是当前重构主轴 |
| **hermes-agent** | 桌面端 + Dashboard + 终端全栈 | 个人开发者、桌面重度用户 | 高吞吐合入（月度补丁聚合 1,000+ PR）；桌面更新链路是其短板 |
| **Zeroclaw** | 架构演进型核心 + A2A 互操作 | Rust 社区、架构敏感型开发者 | RFC 驱动；记忆/会话契约正在重划边界，安全审计严格（wasmtime CVE 快速响应） |
| **QwenPaw** | 深度绑定 AgentScope/Qwen 生态 | 中文用户、Qwen 模型使用者 | ReMe 自进化记忆 + 桌面快捷体验；飞书/微信/QQ 中文渠道 |
| **AstrBot** | 平台适配器聚合 + 知识库增强 | 轻量自部署、bot 运营者 | Python/APScheduler；知识库检索质量连续三项 PR 强化，多适配器接入 |
| **PicoClaw** | 极简轻量 + 非主流协议接入 | 隐私敏感、极客用户 | IRC/DeltaChat/Simplex 长尾协议；模型 fallback 链可配置 |

## 6. 社区热度与成熟度

- **第一梯队 · 超高速迭代、积压承压**：**OpenClaw、hermes-agent**。双 500 日更，但关闭率低、P1 堆积，处于"能力扩张 > 质量收敛"阶段。OpenClaw 瓶颈在架构重构期人力分散；hermes 瓶颈在桌面发布管道系统性缺陷。
- **第二梯队 · 活跃架构演进、响应较快**：**Zeroclaw、QwenPaw**。更新量中等但讨论质量高（RFC 深度），且关键修复 PR 在途。Zeroclaw 的 P0 安全漏洞是隐患；QwenPaw 需优先合入 #6615/#6610/#6609 并解决 CI 阻断 fork 问题（#6563）。
- **第三梯队 · 质量巩固期**：**AstrBot**。合并率/关闭率约 40%，维护者响应及时，健康度最佳；需关注两个竞争性 PR（#9422/#9378）的设计决策。
- **第四梯队 · 低速评审瓶颈**：**PicoClaw**。功能产出存在（新通道、fallback 链），但 3 个 PR 等待超一个月，"有产出、无吞吐"是主要矛盾。

## 7. 值得关注的趋势信号

1. **"投递确认"将成为 Agent 框架的标准能力**：至少 5 个项目出现"持久化成功但用户未收到"的案例，单一"写库成功"不再等于"投递成功"。对开发者的启示：设计 agent 时应构建端到端 delivery receipt，而非仅依赖 transcript。

2. **记忆正从"功能"升级为"一等公民架构"**：Zeroclaw 的对话历史/长期记忆分离 RFC、OpenClaw 的 SQLite 查询接口、hermes 的跨会话搜索，共同指向同一演化方向——记忆将拥有独立的生命周期、存储契约与查询 API。这是生态从"聊天机器人"走向"长期协作者"的关键拐点。

3. **安全模型从"沙箱隔离"走向"会话级最小权限"**：AstrBot 的 Shell 会话隔离、hermes 的 RBAC 呼声、OpenClaw 的文件沙箱 + per-spawn 工具限制，表明多用户/多租户部署已催生"按会话授权"需求，而非一刀切沙箱。

4. **本地/小模型路线回归**：Ollama 路由 Bug 引发高关注、Hailo-Ollama 硬件支持 PR、小模型 Code Mode 改进、PicoClaw fallback 链——边缘部署与成本敏感型用户正在形成独立于云 API 的需求分支。

5. **升级回归测试缺失是系统性短板**：OpenClaw、hermes-agent、QwenPaw、AstrBot 均在本窗口内报告用户可见的升级回归（cron 静默迁移、桌面更新死循环、UI 数据丢失）。任何 agent 框架在快速迭代期都应建立自动化升级回归矩阵，否则"升级恐惧"将持续侵蚀社区信任。

6. **成本可见性决定企业级采纳**：hermes 用户量化出 73% token 为固定开销，OpenClaw 用户因缓存逐轮失效重复付费。将 usage/cost 暴露给 agent 运行时（而非仅出现在账单）是下一个共性功能需求。

7. **互操作协议成为扩散入口**：Zeroclaw 的 OpenAI 兼容适配器与 A2A outbound、PicoClaw 的 Simplex 接入、AstrBot 的通用 TTS API——生态正从"各自封闭渠道"走向"标准协议互联"，第三方工具链（Open WebUI、LobeChat 等）将成为 agent 的增量分发渠道。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# 🤖 Zeroclaw 项目动态日报 — 2026-08-01

> 数据来源：GitHub（zeroclaw-labs/zeroclaw） | 统计周期：过去 24 小时

---

## 1. 今日速览

过去 24 小时项目活跃度极高，共产生 40 条 Issue 更新（38 条新开/活跃、2 条关闭）和 50 条 PR 更新（44 条待合并、6 条已合并/关闭），无新版本发布。社区讨论重心集中在架构级 RFC 上：对话历史与长期记忆分离（#9048）、会话持久化契约归属（#9600）、OpenAI 兼容适配器（#8603）、A2A 出站客户端（#9106）等议题均在激烈讨论中，表明项目正处于核心架构演进关键期。安全维度上，新暴露的 P0 级 Webhook 认证缺失漏洞（#9565）以及 wasmtime CVE（RUSTSEC-2026-0222）已获快速响应（临时豁免已合并，正式修复 PR #9589 仍在审查中），整体项目健康度良好但需警惕维护者审查带宽不足导致 RFC 积压。

---

## 2. 版本发布

**无新版本发布**。当前最新版本为 v0.8.3。参考 #9101 中维护者反馈，v0.8.3 曾同时携带三套签名机制（cosign、GitHub artifact attestations、slsa-github-generator），该冗余问题已有跟踪 Issue 推动合并为单一签名方案。

---

## 3. 项目进展

今日至少有 **5 个 PR 被合并/关闭**，已确认的核心变更如下：

| PR | 类型 | 内容 | 状态 |
|---|---|---|---|
| [#9075](https://github.com/zeroclaw-labs/zeroclaw/pull/9075) | fix | `models refresh` 命令现在会将模型目录持久化写入 `models_cache.json`，直接修复长期悬而未决的 #9046 死循环问题 | 已合并 🔥 |
| [#9553](https://github.com/zeroclaw-labs/zeroclaw/pull/9553) | feat | 为 `SecurityPolicy.allowed_commands` 增加 glob 模式匹配（如 `docker-*`），扩展命令白名单表达能力 | 已合并 |
| [#9552](https://github.com/zeroclaw-labs/zeroclaw/pull/9552) | feat | MCP Server 配置新增 `danger_accept_invalid_certs`，支持自签名/内部 CA 的 HTTPS 连接 | 已合并 |
| [#9586](https://github.com/zeroclaw-labs/zeroclaw/pull/9586) | fix | 临时豁免 RUSTSEC-2026-0222（wasmtime 45.0.3，CVSS 3.8），为全部 PR 恢复 CI 绿灯 | 已合并（临时） |
| [#9585](https://github.com/zeroclaw-labs/zeroclaw/pull/9585) | docs | 修复 release-verification 文档中的 SLSA provenance 死链 | 已合并 |

**项目整体推进评估**：今日合并工作以稳定性和安全加固为主，影响最大的是 `models_cache.json` 持久化修复（解决用户可感知的运维死循环）。真正的高价值架构 PR（如会话持久化契约、上下文压缩锚定等）仍处于审查或待作者更新状态，核心架构落地尚需时日。

---

## 4. 社区热点

### 讨论热度 Top 5 Issues

| Issue | 评论数 | 核心话题 |
|---|---|---|
| [#9048 RFC: Separate conversation history from agent-curated long-term memory](https://github.com/zeroclaw-labs/zeroclaw/issues/9048) | 14 | 当前实现将对话历史混入通用记忆后端（`MemoryCategory::Conversation`），应拆分为独立生命周期概念。涉及网关/渠道自动保存路径重构 |
| [#9127 RFC: Abstract a KeySource trait](https://github.com/zeroclaw-labs/zeroclaw/issues/9127) | 11 | 将主密钥材料按来源/部署形态分类，抽象 `KeySource` trait。当前 93 个 `#[secret]` 字段 + 59 个 `#[credential_class]` 字段的分类体系需进一步规范化 |
| [#8933 RFC: Add cross-turn conversation correlation to OTel export](https://github.com/zeroclaw-labs/zeroclaw/issues/8933) | 9 | 请求在 OTel 导出中增加 `gen_ai.conversation.id`，实现跨轮次会话关联 |
| [#9101 Consolidate release attestation mechanisms](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) | 8 | 抱怨 v0.8.3 发布时同时存在 3 套签名机制、53 个发布资产。希望统一为约 20 个资产，减少 CI 时间与维护成本 |
| [#8603 RFC: OpenAI Chat Completions compatibility adapter](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) | 8 | 让 Open WebUI、LobeChat 等生态工具无需自建适配器即可连接 ZeroClaw，目前只支持 WebSocket 和 webhook |

### 趋势分析

评论量最高的议题反映了社区三大诉求：**(1) 架构清晰化**（记忆/历史分离、会话所有权归属）；**(2) 生态互操作性**（OpenAI 兼容、A2A 出站通讯）；**(3) 发布工程减负**（签名机制合并）。值得注意的是 #9048 和 #9600 都指出多个工作流并行修改同一契约而无明确负责人，这是社区对架构治理的隐忧。

---

## 5. Bug 与稳定性

### 🔴 P0 — 安全风险 / 数据丢失

**[#9565 [Bug]: gateway webhook handlers do not fail closed (WhatsApp Cloud, Linq, WATI)](https://github.com/zeroclaw-labs/zeroclaw/issues/9565)**
- 严重度：S0（数据丢失/安全风险）
- 状态：Open，尚未有对应 fix PR
- 详情：三个入站 Webhook handler（`crates/zeroclaw-gateway/src/lib.rs`）将攻击者可控消息直接送入 agent，**未对调用者进行身份验证**。来源经源码审计确认，影响 WhatsApp、Linq、WATI 渠道
- 风险：攻击者可伪装合法渠道向 agent 注入恶意指令

### 🟠 P1 — 高优先级缺陷

| Issue | 状态 | 是否有 fix PR |
|---|---|---|
| [#8519 wasmtime-wasi CVEs（cargo-audit/deny.toml 漂移）](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) | In-progress | ✅ [#9589](https://github.com/zeroclaw-labs/zeroclaw/pull/9589) bump wasmtime 至 47.0.3（待合并）；⚠️ 临时豁免 [#9586](https://github.com/zeroclaw-labs/zeroclaw/pull/9586) 已合并 |
| [#9572 debug gateway WebSocket turns 可溢出 Tokio worker stack](https://github.com/zeroclaw-labs/zeroclaw/issues/9572) | Open | ❌ 无 |
| [#9573 同一 provider 类型多别名时 cost pricing 查询失效](https://github.com/zeroclaw-labs/zeroclaw/issues/9573) | Open | ❌ 无 |
| [#9596 Anthropic tool-result 图片被序列化为 base64 文本而非图片](https://github.com/zeroclaw-labs/zeroclaw/issues/9596) | Open | ❌ 无（已有跟踪 #9599） |

### 🟡 P2 — 一般缺陷（摘选）

- [#9590 并发 models refresh 可能丢失缓存条目](https://github.com/zeroclaw-labs/zeroclaw/issues/9590)：read-modify-write 无跨进程锁，两个并发进程可互相覆盖
- [#9562 WebChat 流式输出时自动滚动覆盖手动滚动](https://github.com/zeroclaw-labs/zeroclaw/issues/9562)：引用 openclaw 同款修复（openclaw/openclaw#81629）
- [#9546 updater web-dist 测试依赖宿主机安装状态](https://github.com/zeroclaw-labs/zeroclaw/issues/9546)：macOS 开发机上测试不可复现

### ✅ 已修复

- [#9046 models_cache.json 只读不写](https://github.com/zeroclaw-labs/zeroclaw/issues/9046) — 已由 #9075 修复并关闭

---

## 6. 功能请求与路线图信号

### 高热度功能请求（可能进入下版本）

| Issue/PR | 类型 | 信号强度 |
|---|---|---|
| [#8603 OpenAI Chat Completions 兼容适配器](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) | RFC | 高。WebSocket/webhook 之外统一接入层，评论 8 条，已标记 in-progress |
| [#9106 A2A outbound client（A2ATool）](https://github.com/zeroclaw-labs/zeroclaw/issues/9106) | RFC | 高。补齐 A2A 双向能力（#3566 已实现 A2AServer），下一步实现主动调用外部 Agent |
| [#8568 Mixture-of-Agents (MoA) 虚拟模型提供商](https://github.com/zeroclaw-labs/zeroclaw/issues/8568) | RFC | 中。多模型并行推理 + 聚合器模式 |
| [#9575 通过 /models 接口预热 OpenAI-compatible 连接](https://github.com/zeroclaw-labs/zeroclaw/issues/9575) | Feature | 中。当前对 chat/completions 发 GET 请求，不符合 REST 语义 |

### 新提交的架构方向（今日新增）

- [#9600 Session-persistence 契约归属 tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/9600)：4 个独立工作流正在改动同一契约，需明确 owner 与合并顺序
- [#9599 Tool-result 图片序列化跨 provider 审计 tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/9599)：Anthropic 问题可能同样存在于 Bedrock、OpenAI Codex 等
- [#9598 SOP capability 权限契约定义](https://github.com/zeroclaw-labs/zeroclaw/issues/9598)
- [#9597 peer-agent 回合持久化与可归因性](https://github.com/zeroclaw-labs/zeroclaw/issues/9597)
- [#9595 Provider endpoint 元数据统一注册表](https://github.com/zeroclaw-labs/zeroclaw/issues/9595)

### 已在 PR 形态的路由信号

- [#9535 上下文压缩锚定到模型窗口比例](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)：修复固定 32k 阈值与大窗口模型不匹配问题（needs-author-action）
- [#9109 原生 Hailo-Ollama 支持](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)：新增专用 provider，适配 Hailo 硬件 /api/chat 契约（size:XL）
- [#9514 多架构 Alpine 镜像](https://github.com/zeroclaw-labs/zeroclaw/pull/9514)（opt-in，size:M）
- [#9286 MUSL 测量构建](https://github.com/zeroclaw-labs/zeroclaw/pull/9286)（ci 增强）
- [#9547 CPAL 升级至 0.18](https://github.com/zeroclaw-labs/zeroclaw/pull/9547)：Voice Wake 模块 API 迁移

---

## 7. 用户反馈摘要

### 真实痛点

- **模型缓存死循环**（#9046，已修复）：用户执行 `zeroclaw models refresh` 后系统仍提示“请先运行 models refresh”——因该命令只读取不写入 `models_cache.json`。此问题困扰多位 operator，现已通过 #9075 解决
- **WebChat 流式阅读障碍**（#9562）：用户在 agent 回复流式输出时**无法回翻历史消息**，自动滚动强制置底。引用 openclaw 同款 PR 说明是跨项目共性问题
- **敏感资料无法用于 MCP**（#9552，已合并）：开发者连接内部 MCP Server 时因 TLS 严格校验失败，不得不另寻他路——现已通过 `danger_accept_invalid_certs` 解决（需谨慎使用）

### 维护者反馈

- **发布工程冗余**（#9101）：维护者 `@JordanTheJet` 指出 v0.8.3 的 3 套签名机制是“两个 PR 相隔 26 小时合入、互相没看到对方”的结果——反映了现有 CI 流程缺乏协作可见性。该问题已获跟踪，目标将发布资产从 53 个减至约 20 个
- **RFC 积压**（#8692）：维护者决策队列 tracker 持续更新，多个 mark as `needs-maintainer-review` 的 RFC（如 #9048、#9487）等待 code owner 裁决

### 用户使用场景示例

- **内网/离线环境**：Hailo-Ollama 硬件支持 PR（#9109）表明存在边缘部署的 AI 推理需求
- **多云模型协作**：MoA 虚拟 provider（#8568）多个模型并行分析同一任务，反映用户对“单一模型不够聪明”的真实场景

---

## 8. 待处理积压

### ⚠️ 长期未响应的重要 Issue

| Issue | 创建时间 | 标签 | 备注 |
|---|---|---|---|
| [#8519 wasmtime CVEs 清单协调](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) | 2026-06-30 | P1, security | 已有 PR #9589 但尚未合并，临时豁免 #9586 已合入——**最终修复必须尽快推进** |
| [#8568 MoA 虚拟模型 provider](https://github.com/zeroclaw-labs/zeroclaw/issues/8568) | 2026-07-01 | P2, RFC | 5 条评论，已进入候选池但无 assignee |
| [#8583 channel/source 共享边界清理 tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/8583) | 2026-07-01 | P2, in-progress | 跨渠道统一生命周期/配置，尚无对应 PR |

### ⏳ 等待作者更新（needs-author-action）的 PR

| PR | 内容 | 等待时长 |
|---|---|---|
| [#8996 preserve running goals across daemon reload](https://github.com/zeroclaw-labs/zeroclaw/pull/8996) | 守护进程 reload 时保留运行中 goals（size:XL） | 自 7-11 起 |
| [#8781 移除 stale advisory ignores](https://github.com/zeroclaw-labs/zeroclaw/pull/8781) | 清理 deny.toml 中 24 条不再需要的条目 | 自 7-06 起 |
| [#9527 Rust 工具链升级至 1.97.1](https://github.com/zeroclaw-labs/zeroclaw/pull/9527) | 26 处 CI 配置 + MSRV 提升 | 自 7-29 起 |
| [#9535 上下文压缩锚定模型窗口](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) | 修复大窗口模型上压缩失效 | 自 7-29 起 |
| [#9548 Codex CLI 危险 extra_args 警告](https://github.com/zeroclaw-labs/zeroclaw/pull/9548) | 非阻塞安全告警 | 自 7-29 起 |
| [#9561 personality 渲染去掉文件名标签](https://github.com/zeroclaw-labs/zeroclaw/pull/9561) | 减少 token 消耗 | 自 7-30 起 |

### 🧩 值得关注的协调风险

**[#9600 Session-persistence 契约归属 tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/9600)**（今日新开）点名指出 **4 个独立工作流**（#9048 记忆分离、#9487 会话所有权、#9103 存储与连接器分离、以及一个未具名的工作流）正在同时修改会话持久化契约，且无明确 owner。这是架构演进中的高风险点，建议维护者优先分配负责人，避免合并冲突与契约漂移。

---

## 📊 总结：项目健康度评估

| 维度 | 评分 | 说明 |
|---|---|---|
| 社区活跃度 | ★★★★★ | 90+ 条更新/日，RFC 讨论深度高 |
| 安全性 | ★★★☆☆ | P0 webhook 认证缺失尚无修复 PR；wasmtime 最终修复待合并 |
| 发布效率 | ★★★★☆ | 签名机制冗余已获跟踪（#9101），但尚未落地 |
| 架构演进 | ★★★★☆ | 记忆/会话/A2A 等大型 RFC 密集讨论，进展需跟踪 |
| 维护者带宽 | ★★★☆☆ | 多个 needs-maintainer-review 积压 + 6 个 PR 等待作者更新 |

**给维护者的行动建议**：
1. 优先修复 #9565 的 webhook fail-closed 认证缺失（S0）
2. 推动 #9589 wasmtime bump 合入，撤销临时豁免 #9586
3. 为 #9600 指派 session-persistence 契约的明确 owner，避免 4 路并行冲突
4. 对 #9048、#9106 等 6 个高热度 RFC 给出明确裁决（接受/拒绝/延期），重塑社区信心

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-01

## 1. 今日速览

PicoClaw 项目今日活跃度中等偏上，24 小时内共有 2 条 Issue 更新和 3 条 PR 更新，均处于活跃讨论或待评审状态，无新版本发布。当前最值得关注的是两个长期开放的 PR（#3222、#3200）已超 3 周未合并，维护者评审积压信号显现。仍有两个待处理 Bug 和一个功能请求悬而未决，其中 IRC 长消息支持（#3287）和输入框 CPU 占用问题（#3292）代表用户对**通信协议完整性与客户端性能**的双重关注。整体来看，项目功能迭代活跃，但合并效率与响应速度有待提升。

---

## 3. 项目进展

今日**无 PR 被合并或关闭**，3 个 PR 均处于开放状态。以下为近期对项目可能有重大影响的待合并 PR：

- **[#3222] refactor(deltachat): cleanup implementation, documentation -200LOC** — 由 @trufae 提交，重构 DeltaChat 通道实现，移除遗留功能和硬编码中继列表，重命名 `invite_link` 为 `join_invite_link` 并新增 `show_invite_link`。该 PR 可**净减约 200 行代码**，是提升代码质量与可维护性的重要一步。
  https://github.com/sipeed/picoclaw/pull/3222

- **[#3200] feat(models): add configurable default fallback chain** — 由 @lc6464 提交，为 Web UI 添加可配置的模型默认 fallback 链，支持用户设置默认模型、添加备用模型、排序并持久化到后端 API。若合并，将显著增强模型路由的弹性。
  https://github.com/sipeed/picoclaw/pull/3200

- **[#3193] Added simplex channel type** — 由 @dim 提交，新增 Simplex 通道类型支持，拓展 PicoClaw 可接入的通信平台矩阵。
  https://github.com/sipeed/picoclaw/pull/3193

三个 PR 均从不同维度（代码质量、模型路由、多平台支持）推进项目，但**均停留在待评审阶段超过 4 周**，项目"向前迈进"的节奏受限于评审速度。

---

## 4. 社区热点

- **[#3287] [Feature] Better support long messages in IRC** — 评论 2 条，为当前最高讨论量 Issue。用户 @superuser-does 提出 PicoClaw 应能识别 IRCv3 中因 512 字节限制而被拆分的长消息，将其视为单一连贯消息处理。
  https://github.com/sipeed/picoclaw/issues/3287

  **诉求分析**：IRC 协议基础限制（512 字节/行）在多行/长文本场景下会产生消息分裂，用户希望 PicoClaw 能够自动重组，这反映了用户对**跨协议一致体验**的需求——即使底层协议割裂消息，上层 AI 助手也应保持上下文完整。

- **[#3292] [BUG] CPU usage too high when focus on input box in chat interface** — 评论 1 条，中英双语报告，提及版本 0.3.1 + Go 1.26 + deepseek-v4-flash + Firefox 环境。
  https://github.com/sipeed/picoclaw/issues/3292

  **诉求分析**：输入框聚焦即 CPU 高占用，直接威胁用户日常使用的流畅度。双语文案表明社区有一定国际化使用群体，该问题若复现成本低，应优先排查前端渲染或状态更新循环。

---

## 5. Bug 与稳定性

当前活跃 Bug **1 个**，按严重程度排列：

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| **中** | [#3292](https://github.com/sipeed/picoclaw/issues/3292) | 聊天界面输入框聚焦时 CPU 占用过高（Firefox / Linux / v0.3.1） | 开放，**无 fix PR** |

该 Issue 创建于 2026-07-24，昨日（7-31）有活动，已被标记为 **stale**，需维护者确认是否可以复现并定性。若确认为回归，建议在 0.3.x 补丁版修复；若为 Firefox 特定问题，可考虑兼容性优化。

---

## 6. 功能请求与路线图信号

- **[#3287] IRC 长消息支持** — 核心诉求是 IRCv3 长消息重组。目前 IRC 通道已有基本实现，该请求可作为 **IRC 通道增强**的路线图项。考虑到 PR #3222 正在进行 DeltaChat 通道重构，通道层仍有活跃开发，此请求有被纳入后续版本的可能。
  https://github.com/sipeed/picoclaw/issues/3287

- **[#3200] 模型 fallback 链可配置** — 若 PR 合并，将是 **v0.4.0 的重要功能**，允许用户在 Web UI 配置模型备胎链，提升服务可用性。
  https://github.com/sipeed/picoclaw/pull/3200

- **[#3193] Simplex 通道支持** — 新增通信平台，扩展产品边界。Simplex 作为隐私优先协议，若合并将吸引对隐私敏感的用户群体。
  https://github.com/sipeed/picoclaw/pull/3193

**路线图信号**：社区正推动 PicoClaw 向**多渠道、多模型冗余、长文本上下文完整性**三个方向演进。建议维护者优先处理 #3200 与 #3222 的评审，两者实现成本相对可控且收益明确。

---

## 7. 用户反馈摘要

社区讨论集中在 **IRC 长消息分割** 与 **客户端性能** 两个痛点：

- **IRC 长消息割裂（#3287）**：用户明确表示"长消息应被视作单一、连贯的消息"。当前 PicoClaw 将 512 字节外的截断文本视为新消息，破坏了 AI 对上下文的正确理解。这类协议层问题在真实使用中容易被触发（如粘贴日志或长代码块）。
  https://github.com/sipeed/picoclaw/issues/3287

- **输入框聚焦卡顿（#3292）**：用户主动附带完整环境信息（版本、Go 版本、模型、浏览器），表明已尝试自行定位问题，这类能提供可复现环境的反馈价值较高。若为前端框架级问题，影响面积可能覆盖所有 Web 用户。

整体而言，用户对 PicoClaw 的协议接入广度和模型配置灵活性有较高期待，同时也对基础体验（CPU 占用）有明确的忍耐底线。

---

## 8. 待处理积压

以下 PR 长期未合并，需维护者关注评审（按等待时长排序）：

| PR | 主题 | 创建时间 | 已等待 | 影响 |
|----|------|---------|--------|------|
| [#3193](https://github.com/sipeed/picoclaw/pull/3193) | Added simplex channel type | 2026-06-27 | **约 35 天** | 新平台接入，功能增量 |
| [#3200](https://github.com/sipeed/picoclaw/pull/3200) | feat(models): add configurable default fallback chain | 2026-07-01 | **约 31 天** | 模型路由弹性核心功能 |
| [#3222](https://github.com/sipeed/picoclaw/pull/3222) | refactor(deltachat): cleanup implementation | 2026-07-03 | **约 29 天** | 代码质量提升，-200 LOC |

此外，Issue [#3292](https://github.com/sipeed/picoclaw/issues/3292) 已被标记为 stale，若 30 天无活动将被自动关闭，建议维护者在关闭前确认是否为真实 Bug，避免有价值的反馈流失。

---

*数据来源：PicoClaw GitHub 仓库（github.com/sipeed/picoclaw），时间窗口为 2026-07-31 至 2026-08-01。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-01

## 1. 今日速览

过去24小时 QwenPaw 项目保持**高活跃度**：共产生 20 条 Issue 更新（新开/活跃 14 条，关闭 6 条）与 43 条 PR 更新（待合并 30 条，已合并/关闭 13 条），社区讨论与代码提交均处于密集状态。热点集中在 **AgentScope 2.0.4 兼容性问题**（#6612）、**shell 命令执行导致 UI 冻结/会话阻塞**（#6589、#6608）、**记忆压缩丢失早期会话**（#6555）等稳定性议题，以及**桌面端体验优化**（#6083、#6587、#6593）等功能需求。已有 4 个针对关键 Bug 的修复 PR 于今日提交，项目维护者对社区反馈响应迅速。

## 2. 版本发布

过去 24 小时内无新版本发布（最新版本仍为 v2.0.1）。

## 3. 项目进展

今日合并/关闭的 PR 主要集中于 **Bug 修复** 与 **文档完善**，虽无重大功能上线，但修复了多个影响用户体验的缺陷，向 v2.0.2 方向稳步推进：

| PR | 内容 | 状态 | 关联 Issue |
|---|---|---|---|
| [#6573](https://github.com/agentscope-ai/QwenPaw/pull/6573) | 修复 2.x 迁移后飞书频道音频消息静默转写失败（`AudioContent` 未达转写流程） | 已合并 | #6544 |
| [#6606](https://github.com/agentscope-ai/QwenPaw/pull/6606) | 修复 `read_file` 工具不接受数字字符串行范围参数 | 已关闭 | 待确认 |
| [#6602](https://github.com/agentscope-ai/QwenPaw/pull/6602) | 修复多会话 UI 数据完整性问题：切换模式/会话丢失消息、回复重渲染、指令漂移；保留进行中的流式响应 | 已关闭 | #6558 |
| [#6604](https://github.com/agentscope-ai/QwenPaw/pull/6604) | 文档完善：说明 ReMe 自进化知识库的捕获/索引/整合/召回生命周期，以及每日/摘要记忆层 | 已关闭 | — |

此外，**多个关键修复 PR 于今日提交待审**，包括 AgentScope 兼容性修复（#6615）、shell 命令执行阻塞与 UI 冻结修复（#6610）、`spawn_subagent` schema 修复（#6609）、记忆压缩丢失早期会话修复（#6564、#6592）等，若能合入，将显著提升 2.0.1 版本的稳定性。

## 4. 社区热点

今日讨论热度最高的议题反映了用户在 **稳定性** 与 **使用体验** 上的核心诉求：

- **[#6537 Skill tags 重启后丢失](https://github.com/agentscope-ai/QwenPaw/issues/6537)（评论 10 条）** ：技能标签保存成功但重启后丢失，属于 #3270 的回归问题。用户已在 Issue 中给出详细复现步骤与 API 调用路径，社区讨论集中在 manifest 重新加载逻辑上。该问题影响技能管理体验，追溯价值高。
- **[#6601 空响应错误不报错](https://github.com/agentscope-ai/QwenPaw/issues/6601)（评论 5 条）** ：长会话中模型空响应但 QwenPaw 不报错，导致彻底失去响应。用户明确指出这是框架层问题，与窗口上下文累积有关。
- **[#6563 CI 阻断所有 fork PR](https://github.com/agentscope-ai/QwenPaw/issues/6563)（评论 5 条）** ：`real-behavior-proof.yml` 工作流在所有 fork PR 上失败（`Resource not accessible by integration`），严重阻碍外部贡献者参与。这是项目开源协作健康度的直接威胁。
- **[#6083 桌面端工作区产出物快捷访问](https://github.com/agentscope-ai/QwenPaw/issues/6083)（评论 4 条）** ：用户期望在 Desktop 窗口内一键直达工作区文件夹或下载产出物，当前需手动导航到 `~/.qwenpaw/workspaces/`，对非技术用户不友好。

## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列如下：

| 严重程度 | Issue | 摘要 | 修复状态 |
|---|---|---|---|
| 🔴 严重 | [#6612](https://github.com/agentscope-ai/QwenPaw/issues/6612) | `qwenpaw==2.0.1` 与 `agentscope==2.0.4.post1` 不兼容：proactive 子系统崩溃（`Msg.content` 类型错误）+ 工具权限死锁 | 已有 PR [#6615](https://github.com/agentscope-ai/QwenPaw/pull/6615) |
| 🔴 严重 | [#6608](https://github.com/agentscope-ai/QwenPaw/issues/6608) | 长时 shell 命令绕过超时限制，阻塞飞书会话 1.5 小时；取消后产生孤儿子进程 | 已有 PR [#6610](https://github.com/agentscope-ai/QwenPaw/pull/6610) |
| 🟠 严重 | [#6589](https://github.com/agentscope-ai/QwenPaw/issues/6589) | `execute_shell_command` 数万行输出一次性渲染，UI 主线程阻塞、界面卡死 | 已有 PR [#6610](https://github.com/agentscope-ai/QwenPaw/pull/6610) |
| 🟠 高 | [#6588](https://github.com/agentscope-ai/QwenPaw/issues/6588) | `spawn_subagent` 单任务模式不可用：模型工具 schema 中 `batch` 被错误标记为必填 | 已有 PR [#6609](https://github.com/agentscope-ai/QwenPaw/pull/6609) |
| 🟠 高 | [#6537](https://github.com/agentscope-ai/QwenPaw/issues/6537) | Skill tags 重启后丢失（#3270 回归） | 暂无 |
| 🟠 高 | [#6614](https://github.com/agentscope-ai/QwenPaw/issues/6614) | 微信 cron 定时推送静默失败：任务显示成功但微信侧 `ret=-2` context_token 失效，已消耗约 4400 万 token | 暂无 |
| 🟡 中 | [#6601](https://github.com/agentscope-ai/QwenPaw/issues/6601) | 长会话模型空响应不报错，会话彻底失去响应 | 暂无 |
| 🟡 中 | [#6512](https://github.com/agentscope-ai/QwenPaw/issues/6512) | `execute_shell_command` 大输出（>30KB）截断，甚至触发 Internal error | 暂无 |
| 🟡 中 | [#6555](https://github.com/agentscope-ai/QwenPaw/issues/6555) | Dream/记忆压缩遗漏早期会话：上下文滚动移出窗口后，当天早期操作永远不写入记忆文件 | 已有 PR [#6564](https://github.com/agentscope-ai/QwenPaw/pull/6564)、[#6592](https://github.com/agentscope-ai/QwenPaw/pull/6592) |

## 6. 功能请求与路线图信号

今日社区提出的功能需求集中于**桌面端体验优化**与**数据管理**，部分已有对应 PR，显示出明确的路线图信号：

**已有 PR 支撑（可能进入下一版本）：**

| Issue | 需求 | 对应 PR |
|---|---|---|
| [#6568](https://github.com/agentscope-ai/QwenPaw/issues/6568)（未列出，由 PR 推断） | 桌面端全局热键快速输入悬浮窗 | [#6607](https://github.com/agentscope-ai/QwenPaw/pull/6607)：实现 Doubao 风格 `alt+space` 全局热键无边框置顶快速输入窗口 |
| NVIDIA NIM 支持 | [#6526](https://github.com/agentscope-ai/QwenPaw/pull/6526)：基于现有 OpenAIProvider 架构接入 NVIDIA NIM 端点 |
| OneBot/QQ 通道体验 | [#6543](https://github.com/agentscope-ai/QwenPaw/pull/6543)：清理 Markdown 文本并支持发送本地媒体 |

**暂无 PR、需关注的需求信号：**

- [#6083](https://github.com/agentscope-ai/QwenPaw/issues/6083)：桌面窗口增加工作区产出物快捷访问按钮（评论 4，连续多日活跃）
- [#6593](https://github.com/agentscope-ai/QwenPaw/issues/6593)：增加统一且专业的 QwenPaw 专用清理页面（手动/自动清理记忆、工作区、备份等数据，全局化且支持收件箱管理）
- [#6559](https://github.com/agentscope-ai/QwenPaw/issues/6559)：会话分叉应以父子层级结构组织，避免列表混乱
- [#6260](https://github.com/agentscope-ai/QwenPaw/issues/6260)：思考和工具调用过程可折叠，突出 Agent 交付结果（👍 1，用户呼声较强）
- [#6587](https://github.com/agentscope-ai/QwenPaw/issues/6587)：桌面应用名“QwenPaw Desktop”改名为“QwenPaw”
- [#6160](https://github.com/agentscope-ai/QwenPaw/issues/6160)：内置 Python 运行环境或复用后端解释器

## 7. 用户反馈摘要

从今日 Issues 评论中提炼的关键用户反馈：

- **对工作区文件访问的不便**（#6083）：用户需要离开 Desktop 窗口、打开资源管理器、手动导航到 `~\.qwenpaw\workspaces\<agent_id>\` 目录才能找到产出文件，工作流中断明显，非技术用户尤其困扰。
- **Python 环境依赖痛点**（#6160）：Windows 用户使用 Conda 管理多 Python 环境，系统未装全局 Python 时 QwenPaw 无法执行生成的脚本。用户希望内置 Python 或复用后端解释器。
- **结果呈现本末倒置**（#6260）：用户认为思考过程和工具调用占满屏幕，而 Agent 交付的结果被淹没在执行过程中，希望将过程折叠、直接呈现结果。
- **存储空间膨胀的隐忧**（#6593）：长期使用后自动记忆、工具调用产物、备份、历史对话等数据累积导致空间膨胀，用户不敢手动删除（怕误删），期望有统一的清理页面。
- **UI 布局问题**（#6549）：Windows 10 + 2560x1600 分辨率 + 150% 缩放下，输入框被遮挡，发送按钮需要滚动才能看到。
- **微信推送静默失败的严重困扰**（#6614）：用户反馈任务显示成功但从未实际送达，排障过程中消耗了约 4400 万 token，属于“静默失败”的典型反面案例。
- **开源协作门槛**（#6563）：CI 工作流问题导致所有 fork PR 无法通过检查，外部贡献者参与受阻，直接影响社区生态健康。

## 8. 待处理积压

以下 Issue/PR 长期未获得维护者响应或解决方案，建议重点关注：

| 项目 | 创建时间 | 天数 | 备注 |
|---|---|---|---|
| [#6083](https://github.com/agentscope-ai/QwenPaw/issues/6083) 桌面端工作区产出物快捷访问 | 2026-07-14 | 18 天 | 评论 4 条，持续活跃的用户体验需求 |
| [#6160](https://github.com/agentscope-ai/QwenPaw/issues/6160) 内置 Python 环境 | 2026-07-16 | 16 天 | 评论 4 条，影响 Windows 用户脚本执行 |
| [#6260](https://github.com/agentscope-ai/QwenPaw/issues/6260) 结果呈现方式改进 | 2026-07-19 | 13 天 | 👍 1，涉及核心交互体验 |
| [#6203](https://github.com/agentscope-ai/QwenPaw/pull/6203) Windows tasklist 探针修复 | 2026-07-16 | 16 天 | 已标记 `ready-for-human-review`，待维护者合入 |
| [#6537](https://github.com/agentscope-ai/QwenPaw/issues/6537) Skill tags 重启后丢失 | 2026-07-28 | 4 天 | 评论 10 条，高热度回归 Bug，暂无修复 PR |
| [#6614](https://github.com/agentscope-ai/QwenPaw/issues/6614) 微信 cron 推送静默失败 | 2026-07-31 | 1 天 | 涉及 token 大量消耗，需紧急关注 |

---

**报告总结**：QwenPaw 项目当前处于 **高活跃度、高反馈密度** 的状态，社区热情高涨但稳定性问题（特别是 AgentScope 兼容性、shell 命令执行、记忆数据完整性）已成为主要矛盾。好消息是今日已有多个针对性修复 PR 在途，建议维护者优先合入 #6615、#6610、#6609 等关键补丁，并尽快处理 CI 阻断 fork PR 的问题（#6563）以保持开源社区的健康度。功能需求方面，桌面端体验优化（#6083、#6587、#6593）呼声集中，有望成为 v2.1 的迭代方向。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报 · 2026-08-01

## 一、今日速览

过去 24 小时项目处于**极高活跃度**状态：500 条 Issue 更新（442 条新开/活跃，58 条已关闭）、500 条 PR 更新（419 条待合并，81 条已合并/关闭），并发布了 v0.19.1 补丁版本，将自 v0.19.0 以来的 1,000+ 个 PR 汇总为稳定标签。桌面端更新机制是当前最集中的问题域——多个 P1 级 Bug 与对应修复 PR 同时涌现；安全性（授权绕过修复）与稳定性（并发 I/O 污染、会话状态）是 PR 主力方向。长期搁置的高赞功能请求（RBAC 权限分级、持久化会话记忆、多后端终端）仍在持续积累社区诉求，但尚未看到明确的合并信号。

- Issue 更新：[500 条](https://github.com/NousResearch/hermes-agent/issues)
- PR 更新：[500 条](https://github.com/NousResearch/hermes-agent/pulls)
- 新版本：[v2026.7.30 (v0.19.1)](https://github.com/NousResearch/hermes-agent/releases)

## 二、版本发布

### [Hermes Agent v0.19.1 (v2026.7.30)](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.30)

| 项目 | 内容 |
|---|---|
| 版本号 | v0.19.1 |
| 发布日期 | 2026-07-30 |
| 类型 | Patch release |
| 变更范围 | 汇总自 v0.19.0 以来的 ~1,000+ 个已合并 PR |

该版本面向下游消费者（Docker 镜像、托管部署、全新安装）提供稳定标签。作为补丁版本，预计不含破坏性变更；但累计 1,000+ PR 的变更体量意味着行为差异可能较大，建议升级前关注 v0.19.0 至 v0.19.1 之间的合并 PR 列表。目前数据源未提供具体变更明细，若需要详细迁移说明，建议查看 [v0.19.0 Release Notes](https://github.com/NousResearch/hermes-agent/releases) 及近期合并 PR 记录。

## 三、项目进展

今日 81 个 PR 被合并或关闭，重点方向包括：

- **桌面端更新链路修复**：针对 Windows/macOS 更新机制的多项修复进入收尾阶段。[#75586](https://github.com/NousResearch/hermes-agent/pull/75586) 恢复 UI 包锁一致性（标记为已由 main 实现），[#74635](https://github.com/NousResearch/hermes-agent/pull/74635) 修复 delegated-child 标记污染 bash 快照的问题（被标记为 duplicate，但问题方向已被识别）。
- **稳定性修复持续合入**：v0.19.1 聚合了 1,000+ 个 PR，涵盖此前反复出现的并发写入、会话状态损坏、provider 兼容性等历史问题。
- **长线功能在 PR 阶段推进**：新提交的 PR 覆盖了通用 temperature 支持（[#75682](https://github.com/NousResearch/hermes-agent/pull/75682)）、Runs API 审批恢复机制（[#75707](https://github.com/NousResearch/hermes-agent/pull/75707)）、桌面端拖拽创建会话（[#70571](https://github.com/NousResearch/hermes-agent/pull/70571)）等，说明项目正在向更细粒度的用户控制与更完善的交互体验演进。

**项目整体健康度**：合并节奏快（约 30-40 PR/天）、版本迭代稳定（补丁版本按时发布），但 P1 级更新类 Bug 集中出现，表明桌面端发布链路存在系统性质量缺口。

## 四、社区热点

### 讨论最活跃的 Issues

| Issue | 标题 | 评论数 | 👍 | 状态 |
|---|---|---|---|---|
| [#527](https://github.com/NousResearch/hermes-agent/issues/527) | Gateway 权限分级 —— 面向 Messenger 平台的 RBAC（Owner/Admin/User/Guest） | 18 | 11 | OPEN |
| [#4379](https://github.com/NousResearch/hermes-agent/issues/4379) | Token 开销分析：73% 的 API 调用是固定开销（~13.9K tokens） | 18 | 0 | OPEN |
| [#8457](https://github.com/NousResearch/hermes-agent/issues/8457) | 持久化会话记忆：跨会话搜索 + 自动压缩 | 16 | 0 | OPEN |
| [#24860](https://github.com/NousResearch/hermes-agent/issues/24860) | Dashboard Chat：Ctrl+V 粘贴失效、不支持图片粘贴 | 14 | 5 | OPEN |
| [#24140](https://github.com/NousResearch/hermes-agent/issues/24140) | 所有模型被拒：context window 低于 64,000 tokens，Telegram 完全宕机 | 13 | 0 | CLOSED |

**核心诉求分析：**

- [#527](https://github.com/NousResearch/hermes-agent/issues/527) 是评论区最活跃的功能请求，当前二元授权模式（完全授权或完全封锁）无法满足真实的多用户部署场景，用户需要细粒度的 RBAC 来控制命令、工具和终端访问权限。
- [#4379](https://github.com/NousResearch/hermes-agent/issues/4379) 来自深度用户的自建监控面板，揭示 73% 的 token 消耗为固定开销，引发了对成本优化的广泛讨论，这是企业级采纳的前置痛点。
- [#8457](https://github.com/NousResearch/hermes-agent/issues/8457) 针对会话记忆的持久化与跨会话检索，指出当前 MemoryManager 缺乏重启后的上下文保留能力。
- [#24860](https://github.com/NousResearch/hermes-agent/issues/24860) 的 Dashboard 粘贴问题获得 5 个 👍，影响面覆盖 Web/TUI 用户，属于交互体验的基础性缺陷。
- [#24140](https://github.com/NousResearch/hermes-agent/issues/24140) 反映的是 P1 级故障——过低的最低 context window 阈值导致 Telegram 通道完全不可用，该问题已关闭，推测已修复。

### 值得关注的 PR 讨论

- [#75707](https://github.com/NousResearch/hermes-agent/pull/75707)：Runs API 按精确 ID 恢复待处理审批，影响面覆盖所有网关与客户端路径，是会话恢复能力的重要补强。
- [#71996](https://github.com/NousResearch/hermes-agent/pull/71996)：修复绝对路径拼写绕过安全硬底线的问题（`/sbin/shutdown`、`C:\Windows\System32\shutdown.exe` 等），属安全关键修复。

## 五、Bug 与稳定性

### P1 级（严重，影响核心功能）

| Issue | 问题描述 | 状态 | 对应修复 PR |
|---|---|---|---|
| [#74836](https://github.com/NousResearch/hermes-agent/issues/74836) | macOS 应用内更新被过期的 `~/.hermes/hermes-setup` 永久阻断，`resolveUpdaterBinary()` 没有版本检查 | OPEN | 相关 PR 集群：[#75631](https://github.com/NousResearch/hermes-agent/pull/75631)、[#75706](https://github.com/NousResearch/hermes-agent/pull/75706)、[#75703](https://github.com/NousResearch/hermes-agent/pull/75703) |
| [#74531](https://github.com/NousResearch/hermes-agent/issues/74531) | macOS 更新卡在"另一个更新正在运行"循环，updater 自身不退出 | OPEN | 同上 |
| [#74942](https://github.com/NousResearch/hermes-agent/issues/74942) | 更新器将自身进程误判为"另一个实例"，PID 检查 false positive | OPEN | 同上 |
| [#24140](https://github.com/NousResearch/hermes-agent/issues/24140) | context window 最低阈值设置过高（64K），导致 Telegram 全通道不可用 | CLOSED | 已解决 |

### P2 级（中等，影响特定场景）

| Issue | 问题描述 | 状态 |
|---|---|---|
| [#69078](https://github.com/NousResearch/hermes-agent/issues/69078) | xAI grok-4.5 返回 "Invalid PNG image" 400 错误，会话永久损坏，重启网关也不恢复 | OPEN（无直接修复 PR） |
| [#29849](https://github.com/NousResearch/hermes-agent/issues/29849) | `no_agent=True` 的 cron 任务忽略 `terminal.backend`，总是在调度器宿主机上执行 | OPEN（needs-decision） |
| [#21498](https://github.com/NousResearch/hermes-agent/issues/21498) | 自定义 provider 的 `max_output_tokens` 被配置规范化器静默丢弃，回退到模型最小值 2048 | OPEN |
| [#66887](https://github.com/NousResearch/hermes-agent/issues/66887) | 多路网关中，二级 profile 的 Telegram 会话错误地持久化到默认 profile 的 state.db / sessions.json | OPEN |
| [#71097](https://github.com/NousResearch/hermes-agent/issues/71097) | Hygiene Agent 的 in-place 压缩失败，`_last_compaction_in_place` 未设置 | OPEN |
| [#25859](https://github.com/NousResearch/hermes-agent/issues/25859) | 两个独立的 clarify 超时配置键导致 CLI 在 120 秒后静默自动决策 | OPEN |

### P3 级（轻微，影响体验）

- [#24860](https://github.com/NousResearch/hermes-agent/issues/24860)：Dashboard Chat 的 Ctrl+V 粘贴失效、图片粘贴不支持。
- [#67368](https://github.com/NousResearch/hermes-agent/issues/67368)：桌面端侧边栏 PROJECTS 标签闪烁后消失。
- [#51769](https://github.com/NousResearch/hermes-agent/issues/51769)：Dashboard 聊天输出需生成足够内容后才可见。
- [#67001](https://github.com/NousResearch/hermes-agent/issues/67001)：macOS 桌面端在合盖唤醒后抢焦点。

**今日新出现的桌面端 P1 Bug 集群（[#74836](https://github.com/NousResearch/hermes-agent/issues/74836)、[#74531](https://github.com/NousResearch/hermes-agent/issues/74531)、[#74942](https://github.com/NousResearch/hermes-agent/issues/74942)）是当前最紧急的稳定性问题，社区已提交多个修复 PR（[#75631](https://github.com/NousResearch/hermes-agent/pull/75631)、[#75706](https://github.com/NousResearch/hermes-agent/pull/75706)、[#75703](https://github.com/NousResearch/hermes-agent/pull/75703)），但尚未被合并。** 这反映出桌面端发布管道存在系统性的更新机制缺陷，可能是 v0.19.1 之后需要优先处理的方向。

## 六、功能请求与路线图信号

### 高热度、长期未解决的功能请求

| Issue | 功能描述 | 社区支持度 | 创建时间 | 路线图判断 |
|---|---|---|---|---|
| [#527](https://github.com/NousResearch/hermes-agent/issues/527) | Gateway 权限分级（RBAC） | 18 条评论，11 👍 | 2026-03-06 | 尚无对应 PR，needs-decision，可能是 v0.20 的重大特性候选 |
| [#5143](https://github.com/NousResearch/hermes-agent/issues/5143) | 多角色自动路由（Gateway Hooks） | 11 条评论，16 👍 | 2026-04-04 | 已重写 v2 方案对齐 v0.14.0 架构，仍在等待决策 |
| [#8457](https://github.com/NousResearch/hermes-agent/issues/8457) | 持久化会话记忆 + 跨会话搜索 + 自动压缩 | 16 条评论 | 2026-04-12 | 与 [#27013](https://github.com/NousResearch/hermes-agent/issues/27013)（会话重启丢失项目上下文）相互印证，是明显的需求缺口 |
| [#1855](https://github.com/NousResearch/hermes-agent/issues/1855) | 多后端终端（本地 + N 个命名远程 + 持久 shell） | 9 条评论，11 👍 | 2026-03-18 | 与当前单一 `terminal.backend` 限制相关，暂无对应 PR |
| [#41222](https://github.com/NousResearch/hermes-agent/issues/41222) | 将 Kanban 集成到桌面应用 | 9 条评论，16 👍 | 2026-06-07 | 已关闭（可能是重复或已转内部），但需求热度高 |
| [#16168](https://github.com/NousResearch/hermes-agent/issues/16168) | Telegram 出站贴纸支持 | 6 条评论，5 👍 | 2026-04-26 | 小功能，可被插件化满足 |

### 新 PR 暗示的路线图方向

- **[#75682](https://github.com/NousResearch/hermes-agent/pull/75682) 通用 temperature 支持**：覆盖全局配置、MOA 角色、Kanban worker 三层。这是对已关闭的 #34219 的重做，说明项目在朝"更大程度用户可配置"方向演进。
- **[#75707](https://github.com/NousResearch/hermes-agent/pull/75707) Runs API 审批恢复**：面向消息丢失场景的可靠性增强，可能成为 v0.20 的 Runs API 重要能力。
- **[#75325](https://github.com/NousResearch/hermes-agent/pull/75325) Discord 语音 barge-in**：插件化功能的新探索。

## 七、用户反馈摘要

### 核心痛点

1. **Token 成本浪费严重**：[#4379](https://github.com/NousResearch/hermes-agent/issues/4379) 用户通过自建 dashboard 量化分析，发现 73% 的 API 调用是固定开销（约 13.9K tokens），这直接影响用户的生产成本，是采用 Hermes 作为企业级基础设施的重大阻碍。

2. **会话记忆不可靠**：[#27013](https://github.com/NousResearch/hermes-agent/issues/27013) 用户报告 agent 在会话重启后会"忘记"项目身份，甚至幻觉出错误项目；[#8457](https://github.com/NousResearch/hermes-agent/issues/8457) 进一步提出跨会话搜索与自动压缩的需求。这两个问题同时指向会话持久化机制的不足。

3. **桌面端更新体验糟糕**：[#74836](https://github.com/NousResearch/hermes-agent/issues/74836) 用户称"macOS 更新永久损坏，任何 `hermes update` 都无法修复"；[#74531](https://github.com/NousResearch/hermes-agent/issues/74531) 用户遇到更新死循环。这类问题严重削弱非技术用户对桌面版的信任。

4. **配置项静默失效**：[#21498](https://github.com/NousResearch/hermes-agent/issues/21498) 用户发现自定义 `max_output_tokens` 被静默丢弃；[#25859](https://github.com/NousResearch/hermes-agent/issues/25859) 指出两个超时配置键相互独立、行为不一致；[#58546](https://github.com/NousResearch/hermes-agent/issues/58546) 报告显式配置的 `ANTHROPIC_API_KEY` 优先级低于自动发现的 Claude Code OAuth 凭据。这些反映了配置系统的可预测性问题。

5. **权限模型过于粗糙**：[#527](https://github.com/NousResearch/hermes-agent/issues/527) 的核心诉求是"每个用户的能力限制"，而非当前的"全有或全无"。获得 11 个 👍，说明网关多用户场景的呼声很高。

### 积极反馈信号

- 用户主动构建第三方工具（如 [#4379](https://github.com/NousResearch/hermes-agent/issues/4379) 的 [hermes-dashboard](https://github.com/Bichev/hermes-dashboard)），说明社区有一定技术深度和自驱力。
- [#5143](https://github.com/NousResearch/hermes-agent/issues/5143) 的作者在 5 月主动重写方案以对齐 v0.14.0 新架构，表明社区愿意适应项目快速迭代。

## 八、待处理积压

### 高赞且长期未响应的功能请求

| Issue | 标题 | 创建时间 | 已等待 | 社区信号 |
|---|---|---|---|---|
| [#527](https://github.com/NousResearch/hermes-agent/issues/527) | Gateway 权限分级（RBAC） | 2026-03-06 | ~5 个月 | 18 条评论，11 👍，needs-decision |
| [#1855](https://github.com/NousResearch/hermes-agent/issues/1855) | 多后端终端 | 2026-03-18 | ~4.5 个月 | 9 条评论，11 👍 |
| [#5143](https://github.com/NousResearch/hermes-agent/issues/5143) | 多角色自动路由 v2 | 2026-04-04 | ~4 个月 | 16 👍，已重写提案等待决策 |
| [#4379](https://github.com/NousResearch/hermes-agent/issues/4379) | Token 固定开销优化 | 2026-04-01 | ~4 个月 | 18 条评论，有量化数据和 dashboard 支撑 |

### 长时间未合并的 PR

| PR | 标题 | 创建时间 | 已等待 | 说明 |
|---|---|---|---|---|
| [#72868](https://github.com/NousResearch/hermes-agent/pull/72868) | 线程级输出静默修复——全局 redirect 污染 `sys.stdout` | 2026-07-27 | ~5 天 | 与 [#73012](https://github.com/NousResearch/hermes-agent/pull/73012) 同属一个 bug 类，影响多位用户 cron 任务，建议优先审查 |
| [#73012](https://github.com/NousResearch/hermes-agent/pull/73012) | `execute_code` 并发分派同样污染 `sys.stdout` | 2026-07-28 | ~4 天 | 同上 |
| [#71996](https://github.com/NousResearch/hermes-agent/pull/71996) | 绝对路径拼写绕过安全硬底线 | 2026-07-26 | ~6 天 | type/security，P2，涉及 Windows 路径，安全影响面大 |
| [#71427](https://github.com/NousResearch/hermes-agent/pull/71427) | 流超时零数据传输时跳过重试 | 2026-07-25 | ~7 天 | 可避免 9 倍的重复请求放大 |

### 对维护者的提示

1. [#64231](https://github.com/NousResearch/hermes-agent/issues/64231)（插件生命周期事件目录）和 [#64178](https://github.com/NousResearch/hermes-agent/issues/64178)（hook 投递一致性）均为 7 月 14 日以来待决策的 issue，影响插件生态的规范化发展，建议尽快明确方向。
2. 桌面端 P1 更新 Bug 集群（[#74836](https://github.com/NousResearch/hermes-agent/issues/74836)、[#74531](https://github.com/NousResearch/hermes-agent/issues/74531)、[#74942](https://github.com/NousResearch/hermes-agent/issues/74942)）在 24 小时内迅速爆发 3 个相关报告，对应的修复 PR（[#75631](https://github.com/NousResearch/hermes-agent/pull/75631)、[#75706](https://github.com/NousResearch/hermes-agent/pull/75706)、[#75703](https://github.com/NousResearch/hermes-agent/pull/75703)）已就绪，建议作为最高优先级合并，否则 v0.19.1 的桌面体验将受到严重影响。

---

*本日报基于 2026-08-01 的 GitHub 数据自动生成，数据覆盖时间为过去 24 小时。所有链接指向 hermes-agent 官方仓库。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-08-01

## 1. 今日速览

过去 24 小时项目活跃度处于**较高水平**：共发生 10 条 Issue 更新（6 条新开/活跃、4 条已关闭）与 22 条 PR 更新（13 条待合并、9 条已合并/关闭），无新版本发布。社区贡献集中在**会话等待器（session_waiter）隔离**、**知识库检索质量**、**钉钉/QQ 平台适配器**和**定时任务时区**四大方向。多个 PR 获得维护者 `lgtm` 标记并合入主干，反映项目维护响应及时、协作链路通畅。值得关注的是同一问题（#9377）出现了两个竞争性 PR（#9422 / #9378），需要维护者决策取舍。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日合入/关闭的 PR（9 条）覆盖稳定性、平台适配、知识库与工程基建，主要进展如下：

**稳定性修复（最重要）**

| PR | 内容 | 关联 Issue |
|---|---|---|
| [#9444](https://github.com/AstrBotDevs/AstrBot/pull/9444) | 修复 QQ 官方机器人流式输出丢首字：将流式 delta 复制到自有缓冲区，避免上游对象复用/变异导致的首字符丢失，并补充回归测试 | #9440 |
| [#9462](https://github.com/AstrBotDevs/AstrBot/pull/9462) | 本地化未来任务时间：通过 APScheduler 公开方法读取实时下次运行时间，修正 SQLite 中 UTC 无时区时间戳的显示问题，并新增回归覆盖 | #9447 |

**知识库检索质量（连续三项合并）**

- [#9454](https://github.com/AstrBotDevs/AstrBot/pull/9454)：修正知识库排序行为，使并列候选排序确定化，并让 vLLM 重排对畸形/失败响应显式报错而非静默空结果。
- [#9457](https://github.com/AstrBotDevs/AstrBot/pull/9457)：为知识库嵌入补充文档标题与标题路径上下文，改善短文本块检索匹配度。
- [#9455](https://github.com/AstrBotDevs/AstrBot/pull/9455)（待合并）：进一步采用相对分数融合与源文档去重，解决 RRF 对平庸候选过度提升、多分块挤占结果槽位的问题。

**平台与安全**

- [#9479](https://github.com/AstrBotDevs/AstrBot/pull/9479)：本地 Shell 会话按发送者隔离，并绑定创建者管理员状态，list/poll/write/interrupt/terminate 均需校验身份。

**工程化**

- [#9480](https://github.com/AstrBotDevs/AstrBot/pull/9480)：CI workflow Python 版本与 `requires-python`（>=3.12）对齐。
- [#8591](https://github.com/AstrBotDevs/AstrBot/pull/8591)：`repr_args` 截断超长 base64 字段，防止单张图片刷爆日志（6 月 5 日提交，今日合并）。
- [#8650](https://github.com/AstrBotDevs/AstrBot/pull/8650)：关闭时释放数据库引擎（6 月 7 日提交，今日合并）。

> 注：#8591、#8650 均为搁置约两个月的 PR 于今日合入，说明维护者正在清理积压 PR。

## 4. 社区热点

**🔹 [#9377 群聊空提及等待器截获其他成员消息](https://github.com/AstrBotDevs/AstrBot/issues/9377)**（2 条评论，2 个 PR 竞相修复）
成员 A 发送仅含 `@机器人` 的空提及后，60 秒窗口内同群任意成员 B 的首条消息都会被截获，且 B 的原始消息被 `stop_event()` 终止传播、被插入 At 组件后重新投递。该问题涉及消息传播机制，影响面较大，已产生两个修复方案：
- [#9422](https://github.com/AstrBotDevs/AstrBot/pull/9422)：将空提及等待器绑定到发起者（Qixuan112，7/28 创建）
- [#9378](https://github.com/AstrBotDevs/AstrBot/pull/9378)：不改变默认会话范围、仅按发送者隔离（hedssaz，即 Issue 作者，7/24 创建）

社区正在观察维护者选用哪种设计。

**🔹 [#9483 增加思考等级设置](https://github.com/AstrBotDevs/AstrBot/issues/9483)**
用户提出为具备思考能力的模型提供 Off/Minimal/Low/Medium/High 思考等级设置（对标 openclaw），希望在 webchat、模型单独设置及对话指令中均可配置。反映用户对深度推理模型控制粒度的需求上升。

**🔹 [#9481 通用 TTS API 配置](https://github.com/AstrBotDevs/AstrBot/issues/9481)**
用户建议建立通用请求体构建功能，允许自定义 JSON 变量名与值，实现低代码接入各类 TTS 供应商（提及了近期开源的 Qwen 系列 TTS）。配合今日 [#9482 MiniMax 声音克隆 PR](https://github.com/AstrBotDevs/AstrBot/pull/9482)，语音方向是社区近期关注点。

## 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 🔴 高 | [#9377](https://github.com/AstrBotDevs/AstrBot/issues/9377) | 群聊空提及等待器截获任何成员消息，并中断原消息传播 | 已有 2 个修复 PR 待合并 |
| 🟠 中 | [#9463](https://github.com/AstrBotDevs/AstrBot/issues/9463) | 钉钉引用回复的文本及图片内容未被解析，引用上下文进入 LLM 前丢失；引用图片只生成 `[Image]` 占位 | [#9464](https://github.com/AstrBotDevs/AstrBot/pull/9464) 已提交修复 |
| 🟠 中 | [#9477](https://github.com/AstrBotDevs/AstrBot/issues/9477) | 未来任务执行不稳定，定位为 weixin_oc 适配器 session 间歇性断连（ret=-2, prepare failed），需向 clawbot 发消息才能重新激活 | 暂无 PR，适配器稳定性风险 |
| 🟠 中 | [#9440](https://github.com/AstrBotDevs/AstrBot/issues/9440) | QQ 官方机器人流式输出首字丢失，服务端日志完整、客户端展示缺失 | ✅ 已由 #9444 修复 |
| 🟡 中低 | [#9447](https://github.com/AstrBotDevs/AstrBot/issues/9447) | `future_task list` 工具显示 UTC 时间，与系统 CST 显示不一致 | ✅ 已由 #9462 修复 |
| 🟡 低 | [#9478](https://github.com/AstrBotDevs/AstrBot/issues/9478) | WebUI 输入框过长时遮挡对话信息（v4.26.8, Docker） | 暂无 PR |
| 🟡 低 | [#9433](https://github.com/AstrBotDevs/AstrBot/issues/9433) | v4.26.8 更新后「对话数据」界面不显示 chatui 对话数据；从日志返回再进入 chatui 会看不到 bot 回复 | 已关闭，修复方式待确认 |

**回归风险提示**：#9433 为升级后回归问题，涉及 chatui 数据展示，建议维护者确认修复是否已进入主干。

## 6. 功能请求与路线图信号

- **[#9483 思考等级设置](https://github.com/AstrBotDevs/AstrBot/issues/9483)**：对推理模型（如 DeepSeek-R 系列）的思考强度控制。随着思考型模型普及，该需求预计会持续增长，未来版本纳入概率较高。
- **[#9481 通用 TTS API 配置](https://github.com/AstrBotDevs/AstrBot/issues/9481)**：低代码接入任意 TTS 服务的通用请求体构建。结合今日 MiniMax 声音克隆 PR（[#9482](https://github.com/AstrBotDevs/AstrBot/pull/9482)），TTS 方向的通用化抽象是社区明确诉求。
- **知识库检索质量持续投入**：三连 PR（#9454/#9455/#9457）显示知识库是当前开发重点，后续可能进入稳定期。
- **[#9472 Linux/macOS 沙箱本地执行](https://github.com/AstrBotDevs/AstrBot/pull/9472)**：使用 bubblewrap/Seatbelt 隔离本地 Shell 与 Python 执行，配合 #9479 的会话隔离，项目正在强化 computer-use 场景的安全模型。

## 7. 用户反馈摘要

- **微信个人用户稳定性痛点（#9477）**：用户使用个人微信 clawbot 时定时任务频繁不触发，需手动发消息重新激活适配器。这种"静默失效"对依赖定时通知的用户体验影响较大，且 `ret=-2` 错误提示对普通用户不友好。
- **平台适配器体验细节（#9463）**：钉钉用户习惯使用"引用回复"提问，但被引用内容（如订单号、图片） 无法进入模型上下文，导致多轮上下文在对话系统中断裂。这是平台原生功能与 bot 框架之间的常见 gap。
- **时区问题引发用户"自己修"（#9447）**：用户反馈 bot 用 UTC 时间导致认知混乱，并自行修改了 `cron_tools.py`。用户愿意自修但期望官方修复更灵活，此条已合入 #9462，用户诉求得到回应。
- **知识库可用性质疑（#9485）**：WebUI 知识库检索面板完全不可用，每次搜索均报"缺少参数 kb_names"，属于体验阻断级问题。

## 8. 待处理积压

| 事项 | 类型 | 创建时间 | 说明 |
|---|---|---|---|
| [#2149 fish audio 反代配置求助](https://github.com/AstrBotDevs/AstrBot/issues/2149) | Issue（已关闭） | 2025-07-16 | 时隔一年后于昨日关闭，属于典型的长尾支持请求。建议项目方考虑新增"自建反向代理"场景的官方文档或模板配置，减少同类提问 |
| [#9377 的 PR 决策](https://github.com/AstrBotDevs/AstrBot/issues/9377) | 待合并 PR 冲突 | 2026-07-24 | 两个修复 PR（#9422/#9378）并存，需要维护者确认设计方向后合入其一 |
| [#9485 知识库检索面板 bug](https://github.com/AstrBotDevs/AstrBot/pull/9485) | 修复 PR | 2026-07-31 | 功能完全不可用，但 PR 目前尚无评论/审查迹象，建议优先推进 |
| [#9477 未来任务不稳定](https://github.com/AstrBotDevs/AstrBot/issues/9477) | 待定位 Bug | 2026-07-31 | weixin_oc 适配器 session 断连是基础设施问题，涉及第三方协议稳定性，需明确是否可修、如何降级提示 |

---

*本报告基于 AstrBot 公开 GitHub 数据生成，数据截止 2026-08-01。*
*项目健康度评估：⭐⭐⭐⭐☆（4/5）—— 社区活跃、合并节奏良好，但存在 PR 积压（13 条待合并）与个别积压 Issue（#2149 历时一年关闭）需要关注。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*