# OpenClaw 生态日报 2026-11-16

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-16 01:28 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 · 2026-11-16

## 1. 今日速览

- 今日无新版本发布，但代码与讨论吞吐量维持高位：过去 24 小时 Issues 更新 500 条（新开/活跃 423、关闭 77），PR 更新 500 条（待合并 320、已合并/关闭 180）。
- 从当日更新样本看，Issue 关闭率约 15.4%，PR 关闭率约 36%，** intake 明显快于消化速度**，积压压力集中在需要维护者裁决的高价值条目上。
- 稳定性风险高度集中：仍有 4 个 OPEN 的 P0 且均带 `ux-release-blocker`/`crash-loop` 标签，其中 3 个指向 Gateway 插件加载阻塞与 Windows 服务生命周期。
- 今日唯一关闭的 P0 是 #193962（SQLite header-probe 超时导致升级路径不可达），属于“修复无法到达用户”的发布链路问题，闭环意义较大。
- 总体健康度评估：**社区活跃度高、贡献者参与面广，但维护者评审是当前主瓶颈**；大量高评论 Issue 同时带有 `clawsweeper:no-new-fix-pr` 与 `clawsweeper:needs-maintainer-review`。

---

## 2. 项目进展

今日已关闭/合并的 PR 约 180 条，以下为其中有代表性的推进：

- **[PR #199863](https://github.com/openclaw/openclaw/pull/199863)（CLOSED，P1，security-sensitive-changed）**：修复在未设置 `gateway.roles.default` 时，message action 发送可绕过 OpenClaw ID 成员的 agent 限制创建会话的问题。属于权限边界修复，安全相关，优先级最高。
- **[PR #199105](https://github.com/openclaw/openclaw/pull/199105)（CLOSED）**：MCP Events 插件拒绝不可能的日历日期（如 4 月 31 日被 JS 静默归一化为 5 月 1 日），修复签名回调与订阅过期值的输入校验。说明 MCP Events 方向仍在持续投入。
- **[PR #199246](https://github.com/openclaw/openclaw/pull/199246)（CLOSED）**：修正 Template Add 在插件仅缺失于 `plugins.allow` 时误报“插件已禁用”的提示，降低配置排障成本。
- **[PR #199850](https://github.com/openclaw/openclaw/pull/199850)、[PR #199869](https://github.com/openclaw/openclaw/pull/199869)**：为 backup 相关 CLI 的 `--json` 失败输出保留可执行的补救提示，改善机器调用方的错误可诊断性（#199850 已关闭，#199869 仍开放）。
- **[PR #199871](https://github.com/openclaw/openclaw/pull/199871)（CLOSED）**：CI 基准测试的非法/重复参数不再被静默接受。
- **[PR #199406](https://github.com/openclaw/openclaw/pull/199406)（CLOSED）**：修复 ClawHub handle 含大写字母时 Template 内联评审与发布失败。

**仍在推进的关键 PR：**

- **[PR #199868](https://github.com/openclaw/openclaw/pull/199868)（OPEN，P2）**：让已完成的子代理结果在 Gateway 重启后仍可保留与补偿投递，直接对应今日多条 P1 会话状态问题。
- **[PR #199873](https://github.com/openclaw/openclaw/pull/199873)（OPEN）**：修复大库场景下 transcript facts backfill 每次重启都从头重放、导致 Gateway 数小时繁忙与 RPC 超时。
- **[PR #199706](https://github.com/openclaw/openclaw/pull/199706)（OPEN，XL）**：让 Git checkout 安装从 release 链接更新，替代原地重写工作树；带 `merge-risk: compatibility/availability`，需重点评审。
- **[PR #199851](https://github.com/openclaw/openclaw/pull/199851)（OPEN）**：稳定每小时 Gateway/运行时测试夹具，属于测试基础设施修缮。

**推进幅度评估**：体验与工具链层面小幅前进（UI、CLI 错误输出、模板、CI），安全边界有一处实质修复；但**核心 P0 稳定性债务今日零推进**，项目“向前迈进的净值”偏低。

---

## 3. 社区热点

今日评论最集中的条目几乎全部是稳定性与成本问题，而非新功能：

- **[Issue #160959](https://github.com/openclaw/openclaw/issues/160959)（82 评论，P0，🦞 diamond lobster）**：自 2026.9.6 起，含大型依赖树的外部/工作区插件在生成捕获阶段让 Gateway 事件循环阻塞数分钟，启动时与模型运行时重新发布时均可复现。**47 天、82 条评论、仍无 fix PR**，是当前社区情绪最集中的焦点。
- **[Issue #170956](https://github.com/openclaw/openclaw/issues/170956)（33 评论，P0）**：Windows 下 `schtasks` 托管安装的慢启动、插件关闭不干净、权限错误三者叠加，使重启/更新“多次重试才成功”，并偶发客户端 1006 断连。
- **[Issue #191944](https://github.com/openclaw/openclaw/issues/191944)（28 评论，P2）**：macOS 上 `gateway stop` 与 `stop --force` 均因 “Process ancestry could not be fully inspected” 失败。
- **[Issue #193962](https://github.com/openclaw/openclaw/issues/193962)（26 评论，P0，已关闭）**：修复 #187197 存在于 2026.11.5-beta.1，但受影响安装的 `openclaw update` 仍走旧版 10 秒探测，形成“修复不可达”死锁。今日关闭是发布链路的一次重要解锁。
- **[Issue #121661](https://github.com/openclaw/openclaw/issues/121661)（18 评论，P1）**：CLI 后端子代理的 announce-wake 轮次无工具运行，模型会伪造工具调用及其输出。涉及输出可信度与安全边界。
- **[Issue #143017](https://github.com/openclaw/openclaw/issues/143017)（17 评论，P2，🦞 diamond lobster）**：持久会话以五种方式重写前缀，实测 2130 万 cache-write tokens，直指提示缓存成本。
- **[Issue #163029](https://github.com/openclaw/openclaw/issues/163029)（16 评论，P1）**：2026.9.7 仍在对话中途重新加载外部插件，主线程 40–70 秒卡顿，呈波次出现。

**PR 侧热点**（数据未提供评论数，按标签与状态判断）：

- **[PR #196430](https://github.com/openclaw/openclaw/pull/196430)**：Tlon 长回复含代码块时按 10,000 字符切分导致块破碎，等待维护者。
- **[PR #199858](https://github.com/openclaw/openclaw/pull/199858)**：Talk 实时转写复用已保存的 Deepgram/ElevenLabs/Mistral 密钥，仍缺 proof。
- **[PR #199868](https://github.com/openclaw/openclaw/pull/199868)**：子代理结果跨重启保留，与今日 P1 集群高度相关。

**诉求分析**：讨论能量集中在“**更新/重启不可靠、主线程被插件阻塞、会话与子代理状态丢失、成本不可归因**”。值得注意的是，几乎所有 Issue 的 👍 仅为 0–1，社区更倾向用可复现实验和线上抓包说话，而非点赞表态——这也意味着维护者面对的是高质量但高验证成本的长贴。

---

## 4. Bug 与稳定性

### P0（发布阻断，均无 fix PR）

| Issue | 问题 | 影响 | Fix 状态 |
|---|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | 大型外部插件捕获阶段阻塞事件循环数分钟（2026.9.6 回归） | Gateway 启动/重发布卡死 | 无 PR，待维护者评审 |
| [#170956](https://github.com/openclaw/openclaw/issues/170956) | Windows 慢启动、插件关闭不干净、schtasks 权限错误 | 重启/更新频繁失败、客户端断连 | 无 PR |
| [#146860](https://github.com/openclaw/openclaw/issues/146860) | Windows `InteractiveToken` 计划任务下托管更新无法取得进程启动标识 | 更新卡在 activating 后 abandoned | 无 PR |
| [#146791](https://github.com/openclaw/openclaw/issues/146791) | iOS App Store 版配对成功但从不发布 `push.apns.register` | 推送与唤醒完全失效 | 无 PR |

另：[#193962](https://github.com/openclaw/openclaw/issues/193962)（P0）已于今日关闭，升级路径恢复可达。

### P1（按主题聚类）

**插件加载/主线程阻塞**
- [#163029](https://github.com/openclaw/openclaw/issues/163029)：对话中途重载外部插件，40–70 秒卡顿。
- [#174681](https://github.com/openclaw/openclaw/issues/174681)：回归——#172750 的“保持 Gateway 响应”反而让主线程卡数分钟，已在发布分支回滚。

**子代理 / 会话交接**
- [#196199](https://github.com/openclaw/openclaw/issues/196199)：2026.10.10 起原生 Codex helper 完成事件约每次失败一次，父会话无法恢复，用户被锁在助手之外。
- [#194403](https://github.com/openclaw/openclaw/issues/194403)：helper 完成后的续跑使自身权限失效，后续人类消息被阻塞。
- [#162637](https://github.com/openclaw/openclaw/issues/162637)：Codex 完成交接在源提交前报 `SESSION_WORK_START_CHANGED`。
- [#121661](https://github.com/openclaw/openclaw/issues/121661)：CLI 子代理伪造工具调用与输出（trust 风险）。
- [#142922](https://github.com/openclaw/openclaw/issues/142922)：system-agent 委派丢失活动运行权限。

**会话状态 / 转录一致性**
- [#194451](https://github.com/openclaw/openclaw/issues/194451)：turn 进行中发送 `/think` 触发 `SqliteTranscriptMutationConflictError`（#192585 仅覆盖 `/status`），已有 linked PR。
- [#185111](https://github.com/openclaw/openclaw/issues/185111)：23 万事件会话的上下文快照读取耗时 19–25 秒。
- [#159799](https://github.com/openclaw/openclaw/issues/159799)：按字节截断的历史水合每轮滑动一个事件，导致本地前缀缓存每轮失效。

**资源与平台**
- [#181120](https://github.com/openclaw/openclaw/issues/181120)：macOS Gateway 关闭 worker MessagePort 时主线程死锁。
- [#196505](https://github.com/openclaw/openclaw/issues/196505)：约 864 MiB 语料触发 `worker task capacity reached` 且不重试，索引永不完成。

### P2 值得关注
- [#199713](https://github.com/openclaw/openclaw/issues/199713)（今日新报）：移动 Chrome 打开 Control UI → Plugins → Advanced 后无响应，渲染进程饱和。
- [#192667](https://github.com/openclaw/openclaw/issues/192667)：macOS 打开特定会话后 Settings 变卡，暗色主题下输入框不可见。
- [#136405](https://github.com/openclaw/openclaw/issues/136405)：`memory_search` 在远端 embedding 卡住时固定 15 秒挂起，无 per-call 超时/重试配置。
- [#161158](https://github.com/openclaw/openclaw/issues/161158)：`gateway restart` 实际成功却报失败且退出码 0，60 秒就绪预算硬编码。

**稳定性结论**：今日新增/活跃缺陷仍以“平台服务生命周期”和“会话状态机”为主，二者均有明确的 release-blocker 属性；**4 个 P0 全部处于无 fix PR 状态**，是项目健康度最直接的负向指标。

---

## 5. 功能请求与路线图信号

- **MCP Events 事件驱动 agent**（[#166586](https://github.com/openclaw/openclaw/issues/166586)，P3，8 评论）：让 OpenClaw 订阅 `mcp.servers` 中 MCP 服务器广播的事件并按事件启动 agent run。结合今日关闭的 [PR #199105](https://github.com/openclaw/openclaw/pull/199105)（mcp-events 日期校验，标签 `plugin: mcp-events`），该方向已有实际代码投入，**进入下一版本的信号较强**。
- **按用户密钥保险库**（[#197297](https://github.com/openclaw/openclaw/issues/197297)，P2，`needs-security-review`）：多用户 Gateway 下每人独立 secret vault，供 agent 以本人 token 调用 CLI/API。需求明确但无 PR，且需安全评审，短期难落地。
- **Talk 语音回执可关闭/替换**（[#184803](https://github.com/openclaw/openclaw/issues/184803)，P3）：实时 Talk 转交 agent 时的语音回执应可配置。与 [PR #199858](https://github.com/openclaw/openclaw/pull/199858)（Talk 转写复用已存密钥）同属语音体验改进，可能打包推进。
- **进度流式输出的独立命令文本上限**（[#157614](https://github.com/openclaw/openclaw/issues/157614)，P2，`linked-pr-open`）：当前命令文本与人类可读活动共用一个字符预算，**已有 PR 关联，纳入下一版本概率较高**。
- **失败文案可由运维覆盖**（[#167341](https://github.com/openclaw/openclaw/issues/167341)，P3）：模型请求失败分类后的固定英文文案应可本地化/自定义，无 PR。
- **会话命名集中化与子代理生命周期**（[#103067](https://github.com/openclaw/openclaw/issues/103067)，P2，7 月至今）：ACP/Copilot 会话标题缺失、跨渠道持久化未定义，`needs-product-decision`，属路线图级议题。
- **Cron 自动化弹性**（[PR #197394](https://github.com/openclaw/openclaw/pull/197394) / [PR #197395](https://github.com/openclaw/openclaw/pull/197395)）：按 agent 限额与空闲内存决定并发、在 provider 限流时退避。两条均为 P2、待 proof，若通过将显著改善大团队部署体验。
- **更新机制重构**（[PR #199706](https://github.com/openclaw/openclaw/pull/199706)）：Git checkout 安装直接从 release 更新，避免原地重写 18 万文件工作树（当前自复制耗时 133–892 秒）。

---

## 6. 用户反馈摘要

**使用场景画像**：自托管生产环境为主——Linux arm64 + Podman Quadlets、Windows 计划任务托管服务、macOS Intel 桌面端；会话规模可达 23 万事件，记忆语料可达 864 MiB，多 bot 共享群聊、多用户 Gateway 均已出现。

**核心痛点：**

1. **更新与重启不可靠**。Windows（#170956、#146860）与 macOS（#191944）三条独立链路均失败；更糟的是 `gateway restart` 成功却报失败并退出 0（#161158），自动化脚本无法判断真实状态。
2. **静默失败缺乏可诊断性**。16 个调用点抛出逐字节相同的 `Session "<key>" changed while starting work. Retry.`，无 reason code（#127195）；`sessions.delete` 返回 `ok:true / deleted:false` 却保留运行中的 `session_windows` 行（#160719）；用户被迫用 `VACUUM INTO` 拷贝库、抓 wire capture、采进程栈来自证。
3. **成本不可见、不可归因**。委派 ACP 运行的 tasks ledger 不记 token/成本，父轮 $0.04、子运行 $14.14（#130257）；提示缓存前缀被反复重写，实测 2130 万 cache-write tokens（#143017）。
4. **输出可信度**。子代理伪造工具调用与输出（#121661）、claude-cli 助手消息重复投递（#157537）、cron 隔离运行把模型“运行旁白”拼进正式消息（#121558）——均直接影响用户对助手的信任。
5. **规模化的记忆与索引**。`memory_search` 固定 15 秒挂起且无超时配置（#136405）、大语料索引因 worker 容量直接中止不重试（#196505）。

**满意/正向信号**：社区愿意投入大量时间做高质量复现并提交外部 PR（今日 #199874、#199869、#199872、#199406 等均来自外部贡献者）；Issue 模板与 ClawSweeper 标签体系使问题分类清晰。**不满主要集中在“长期 P0 无 fix PR”与“needs-info 往返循环”**（如 #187917、#160719 多轮补充信息仍未推进）。

---

## 7. 待处理积压

**长期未闭环的高价值 Issue：**

- [#118793](https://github.com/openclaw/openclaw/issues/118793)（2026-08-03，P2 但 🦞 diamond lobster，13 评论，`stale`）：Claude CLI 会话限额错误未归类为可故障转移，直接 `surface_error` 而非走模型 fallback 链。**3 个多月未定论，影响可用性兜底。**
- [#121661](https://github.com/openclaw/openclaw/issues/121661)（2026-08-10，P1，18 评论）：CLI 子代理伪造工具调用，涉及产品决策与安全评审，长期挂起。
- [#103067](https://github.com/openclaw/openclaw/issues/103067)（2026-07-09，P2）：会话命名与子代理生命周期，`needs-product-decision` 已四个月。
- [#143017](https://github.com/openclaw/openclaw/issues/143017)（2026-09-09，17 评论）：提示缓存前缀重写，数据翔实但无 fix PR。
- [#127195](https://github.com/openclaw/openclaw/issues/127195)（2026-08-21，12 评论）：16 处相同错误字符串缺少 reason code，改动面清晰却未排期。
- [#160959](https://github.com/openclaw/openclaw/issues/160959)（2026-09-29，P0，**82 评论**）：即便不是最老，也是当前社区压力最大的一条，建议列为下周最高优先级。

**长期挂起的 P1 PR（卡在 proof 阶段）：**

- [PR #160325](https://github.com/openclaw/openclaw/pull/160325)（2026-09-28，XL，P1，`needs proof`）：保留超出流预算的 Claude 轮次并阻止子文本泄漏进父回复，带 `merge-risk: message-delivery`。
- [PR #162229](https://github.com/openclaw/openclaw/pull/162229)（2026-10-01，L，P1，`needs proof`）：远端 MCP 不可达时不再阻断 Doctor 门控的 Gateway 启动。
- [PR #165040](https://github.com/openclaw/openclaw/pull/165040)（2026-10-04，L，P2，`needs proof`）：iOS 原生应用内展示原生通知设置。

**流程性提醒**：今日高评论 Issue 几乎全部同时带 `needs-maintainer-review` 与 `no-new-fix-pr`，说明瓶颈不在“缺复现”，而在**评审带宽与修复认领**。建议维护者优先处理 4 个 P0 的归属分配，并对 `needs-info` 往返超过 2 轮的条目（#160719、#187917、#166964）给出明确结论或关闭理由，以降低社区挫败感。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告
**日期：2026-11-16｜口径：以过去 24 小时 GitHub Issues / PR / Discussions / Release 作为活跃度代理指标**

> 说明：PicoClaw 的 3 个关闭 PR 未区分 merged/closed；DeepSeek Harness 未启用 Issues/PR，代码经 Releases 落地，本期以 Discussions 为主要社区信号。

---

## 1. 生态全景

2026-11-16 的个人 AI 助手/自主智能体生态呈现明显的“**高讨论、强修复供给、低合并吞吐**”特征：头部项目单日 Issues/PR 可达数百，但维护者评审与发布工程成为主瓶颈。竞争焦点已从“能否接入模型”转向“运行时是否可靠”：会话与子代理状态、更新重启、插件沙箱、凭据最小暴露、成本账本与多用户权限成为共同命题。项目分层清晰：OpenClaw/Hermes 处于大规模自托管网关第一梯队，AstrBot/QwenPaw 在频道与中文生态快速迭代，Zeroclaw 强化安全与凭据，PicoClaw/DeepSeek Harness 分别处于轻量清理期与桌面发布停滞期。总体看，谁能把“**可观测、可恢复、可预算、可安全委派**”做成默认能力，谁更接近生产可用。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新（活跃/关闭） | PR 更新（待合并/合并关闭） | Release | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 500（423/77） | 500（320/180） | 0 | 极高活跃；评审瓶颈明显；4 个 P0 均无 fix PR |
| **Zeroclaw** | 30（30/0） | 50（48/2） | 0 | 中高活跃、低交付；S0 shell allowlist bypass 无公开 fix；积压偏高 |
| **PicoClaw** | 0 | 3（全部 closed，合并状态待核实） | 0 | 低活跃；以清理 7–8 个月长龄 PR 为主 |
| **QwenPaw** | 12（10/2） | 11（11/0） | 0 | 高活跃、零合并；修复供给快，但 review/merge 明显堵塞 |
| **Hermes Agent** | 328（291/37） | 500（410/90） | 1 个 canary | 极高活跃；安全响应快，但待合并/已合并约 4.6:1，review 积压 |
| **AstrBot** | 11（未细分） | 31（约 12/19） | v4.30.0-alpha.1 | 高活跃且合并率较高；架构升级期，Alpha 迁移风险需关注 |
| **DeepSeek Harness** | 不适用；Discussions 141 | 不适用 | 0 | 社区讨论活跃但发布停滞；Windows 桌面稳定性问题跨多个 rc 未闭环 |

**关键观察：**
- **吞吐第一梯队**为 OpenClaw 与 Hermes：OpenClaw Issue 侧最高（500），Hermes PR 待合并最高（410）。
- **合入效率差异极大**：AstrBot 当日约 19/31 PR 合并/关闭；OpenClaw 约 36%，Hermes 约 18%；Zeroclaw 仅 2/50，QwenPaw 为 0。
- **质量风险集中**：OpenClaw 4 个 P0 无 fix；Zeroclaw 有 S0 安全风险；QwenPaw 出现 P0 静默失败；DeepSeek Harness 有数据丢失与会话日志损坏级问题。

---

## 3. OpenClaw 在生态中的定位

**规模与社区体量：以当日协作吞吐为代理指标，OpenClaw 处于样本最大档。**  
今日 OpenClaw Issues 500、PR 500，均高于 Hermes 的 Issues 328；PR 侧与 Hermes 同处 500 级。Issue 侧高评论集中（#160959 达 82 评论、47 天无 fix），说明其社区不仅大，而且具备高成本复现与长贴讨论能力。

**优势：**
- **Gateway 中心化 + 插件/MCP/ClawHub 生态**最完整，覆盖多频道、权限角色、MCP Events、子代理与模板发布。
- **安全边界有实质修复**：如 PR #199863 修复未设置默认角色时 message action 绕过 agent 限制创建会话。
- **标签与分诊体系较成熟**：ClawSweeper、`ux-release-blocker`、`crash-loop` 等标签使问题聚类清晰。
- **贡献者面广**：外部贡献者持续提交 CLI、模板、CI、备份等修复。

**技术路线差异：**
- 与 Hermes 相比，OpenClaw 更强调 **Gateway 作为运行时核心 + 插件生态 + MCP 事件驱动**；Hermes 更强调统一网关、Desktop、Kanban 与多平台 bot。
- 与 Zeroclaw 相比，OpenClaw 的插件与频道生态更广，但 Zeroclaw 更偏安全敏感运行时、凭据保险库、SSH/allowlist 等底层约束。
- 与 AstrBot 相比，AstrBot 正在做事件溯源与 Agent 运行时重构；OpenClaw 的架构重心仍是 Gateway 插件化与发布链路可靠性。

**主要短板：**  
**规模优势正在转化为评审债务。** 4 个 P0 全部无 fix PR，且 #160959 这类高复现、高评论问题长期悬挂；更新/重启、主线程阻塞、子代理状态丢失是当前最直接的负向指标。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 / 证据 |
|---|---|---|
| **会话与子代理状态一致性** | OpenClaw、Hermes、QwenPaw、AstrBot、DeepSeek Harness、Zeroclaw | 子代理结果跨重启保留、完成事件失败、会话日志损坏、委派审批语义、Kanban worker 崩溃丢工作；核心是持久化执行与状态机恢复 |
| **更新/重启与跨平台生命周期** | OpenClaw、Hermes、DeepSeek Harness、QwenPaw、Zeroclaw | Windows schtasks/PTY/ACL、macOS gateway stop 失败、更新半安装、`gateway restart` 成功却报失败；发布工程成为可用性瓶颈 |
| **成本可见性与预算治理** | OpenClaw、Zeroclaw、Hermes、DeepSeek Harness | 提示缓存前缀重写、子任务 token/成本不记账、Anthropic 成本记 $0、预算模式被忽略、Auto preset 占账单 42%；成本需可归因、可限额 |
| **安全、凭据与最小权限** | OpenClaw、Zeroclaw、Hermes、QwenPaw、DeepSeek Harness、AstrBot | shell allowlist bypass、per-agent 凭据隔离、WhatsApp token 鉴权、RBAC、插件清空目录、工具审批不被委派绕过 |
| **Provider / 工具调用协议归一化** | Zeroclaw、AstrBot、DeepSeek Harness、Hermes、OpenClaw | OpenAI-compatible context window、Claude thinking-signature、DeepSeek DSML、本地 LLM 超时、MCP/ACP 兼容；多模型碎片化仍是主要故障源 |
| **可观测性与静默失败治理** | OpenClaw、QwenPaw、Zeroclaw、DeepSeek Harness、Hermes | “进程活着、健康检查正常、日志干净但功能失效”；缺少 reason code、stderr 被吞、健康状态与真实可用性脱钩 |
| **插件 / MCP 生态与市场治理** | OpenClaw、Hermes、Zeroclaw、AstrBot、DeepSeek Harness | MCP Events、插件目录扩张、插件市场性能、插件兼容检查、插件唤醒派发；生态扩张同时带来兼容与安全成本 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 通用自托管 Agent Gateway、插件/MCP、多频道、权限角色 | 自托管生产用户、多 bot/多用户部署、高级开发者 | Gateway 中心化，插件 allowlist、MCP Events、ClawHub、子代理与模板体系 |
| **Zeroclaw** | 安全敏感运行时、凭据管理、SSH 任务、shell allowlist | 企业/运维/安全敏感团队 | 偏 Rust 原生任务 broker，强调受限凭据、vault、allowlist 与跨平台 CI |
| **PicoClaw** | 轻量边缘设备个人 AI 助手、Telegram/Codex 编排 | 轻量硬件/嵌入式用户 | 轻量定位；近期以积压清理为主，功能增量弱 |
| **QwenPaw** | 多频道个人助手（微信/飞书）、web_search provider、Desktop/Docker | 家庭/小团队、中文频道用户、PoC 场景 | 频道插件外置化，per-agent workspace，Desktop 与 Docker 并重 |
| **Hermes Agent** | 统一网关、Desktop、Kanban 长任务、多平台 bot、RBAC | 高级个人用户、团队协作、多平台常驻运行时 | Unified Gateway + Kanban + 插件生态；正从单机 Agent 转向多进程/多用户运行时 |
| **AstrBot** | 中文聊天机器人框架、插件市场、Provider 丰富度 | QQ/QQ 官方 bot 用户、插件开发者、中文生态 | v4.30 转向事件溯源会话后端与新的 Agent 运行时模型；Alpha 迁移风险高 |
| **DeepSeek Harness** | 官方桌面 Harness、本地 LLM、MCP、插件开发 | Windows 桌面开发者、DeepSeek 生态用户 | Electron 桌面 + ACL sandbox/PTY；Discussions-only、Release 驱动，当前发布停滞 |

---

## 6. 社区热度与成熟度

| 层级 | 项目 | 判断 |
|---|---|---|
| **极高活跃 / 快速迭代但质量债务重** | OpenClaw、Hermes | OpenClaw 500/500 吞吐、4 P0 无 fix；Hermes 328/500、review 积压 4.6:1；两者均处“规模领先、稳定性消化期” |
| **高活跃 / 架构演进或交付堵点** | AstrBot、QwenPaw、Zeroclaw | AstrBot 有 Release 且合并率较高，处架构升级期；QwenPaw 修复配对快但零合并；Zeroclaw 安全模型先行但 PR 合并率低 |
| **社区热但发布停滞** | DeepSeek Harness | Discussions 141 条，0 Release；Windows PTY/ACL、首启、新建会话回归跨多个 rc 未闭环 |
| **低活跃 / 清理维护** | PicoClaw | 0 Issue、0 Release；单日关闭 3 个长龄 PR，属“清理日”而非“建设日” |

**成熟度判断：**  
- **快速迭代阶段**：OpenClaw、Hermes、AstrBot、QwenPaw。  
- **质量巩固/债务消化阶段**：OpenClaw、Hermes、Zeroclaw；QwenPaw 亦受 v2.3.0 回归拖累。  
- **发布与桌面稳定性补课阶段**：DeepSeek Harness。  
- **维护清理阶段**：PicoClaw。  
AstrBot 是样本中少数“当日有 Release 且合并吞吐较高”的项目，但其 Alpha 架构迁移意味着短期回归风险上升。

---

## 7. 值得关注的趋势信号

1. **Agent 运行时从“能跑”进入“可恢复执行”竞争。**  
   子代理交接、会话日志、Kanban worker、Gateway 重启后补偿投递成为高频问题。开发者应优先建设持久化状态机、幂等恢复、崩溃恢复与跨重启补偿，而非继续堆叠工具数量。

2. **静默失败比显式报错更伤信任。**  
   QwenPaw、Zeroclaw、DeepSeek Harness、OpenClaw 均出现“进程正常但功能失效”类反馈。健康检查必须与真实业务可用性绑定，错误需带 reason code、可操作补救提示与可观测指标。

3. **成本治理正在产品化。**  
   从 cache-write token、子任务账本、预算 enforcement 到 Auto preset 成本透明，成本不再是“账单问题”，而是运行时路由、审批与权限设计的一部分。

4. **安全边界从“有没有鉴权”转向“最小权限是否贯穿委派与插件”。**  
   shell allowlist bypass、per-agent 凭据隔离、RBAC、审批不被委派绕过、插件目录误删，说明安全模型需覆盖 Agent、子代理、插件、工具与频道全链路。

5. **Provider / MCP / 工具调用协议归一化是跨模型可用性的关键。**  
   DSML、thinking-signature、OpenAI-compatible context window、ACP 1.0、本地 LLM 超时等碎片化问题反复出现；中间层需要更强的能力探测、降级与兼容测试。

6. **发布工程与跨平台生命周期正成为核心竞争力。**  
   Windows 服务、macOS LaunchAgent、更新半安装、重启退出码错误等问题直接阻断生产采用。Canary/Alpha 之外，迁移检查、回滚路径、修复可达性需与功能开发同等优先级。

7. **社区运营瓶颈正在从“缺复现”转为“缺评审带宽”。**  
   OpenClaw、Hermes、QwenPaw 均出现高质量 Issue/PR 积压。对项目维护者而言，按“安全 > P0 状态一致性 > 兼容性 > 插件目录”分层清理，并给首次贡献者明确结论，是降低流失率的关键。

**对 AI 智能体开发者的参考：** 下一阶段的差异化不在“多接一个模型”，而在**durable execution、默认可观测、成本可预算、权限可委派、插件可兼容、跨平台可更新**。这些能力将决定个人 AI 助手能否从演示环境进入长期常驻的生产环境。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报（2026-11-16）

## 1. 今日速览

- **活跃度高、交付吞吐偏低**：过去 24 小时 Issues 更新 30 条，全部为新开/活跃，关闭 0 条；PR 更新 50 条，其中待合并 48 条，已合并/关闭仅 2 条。  
- **无新版本发布**，项目仍处于高频迭代与积压消化阶段，Issue 零关闭与 PR 低合并率显示维护侧存在明显吞吐瓶颈。  
- **讨论焦点集中在运行时正确性、成本治理、Provider 兼容和安全凭据管理**，而非表层功能。  
- **安全/稳定性信号需关注**：出现 S0 级 shell allowlist bypass 风险，以及多条 S1「workflow blocked」问题。  
- **凭据管理、SSH 任务传输、浏览器语音、插件唤醒等 PR 链较活跃**，但大量 PR 标记 `size:XL`、`needs-author-action` 或 `needs-maintainer-review`，短期内转化为发布的不确定性较高。  

参考：[Issues](https://github.com/zeroclaw-labs/zeroclaw/issues)｜[Pull Requests](https://github.com/zeroclaw-labs/zeroclaw/pulls)

---

## 2. 版本发布

无新版本发布，省略详细说明。

---

## 3. 项目进展

### 今日合并/关闭情况

- 过去 24 小时 PR 已合并/关闭 **2 条**，但提供的数据未展示具体 PR 编号与标题，因此无法确认其是否属于关键功能或修复。  
- 同期待合并 PR 达 **48 条**，合并/关闭比例偏低，项目整体交付增量有限。  

参考：[已关闭 PR 查询](https://github.com/zeroclaw-labs/zeroclaw/pulls?q=is%3Apr+is%3Aclosed)

### 待合并队列中的重要推进方向

以下 PR 尚未合并，不能计入已交付，但反映了当前主要推进方向：

- **凭据管理 PR 链**：  
  [#12402](https://github.com/zeroclaw-labs/zeroclaw/pull/12402) 写入式插件 TLS 凭据管理；[#12408](https://github.com/zeroclaw-labs/zeroclaw/pull/12408) 受限 HTTP 凭据；[#12481](https://github.com/zeroclaw-labs/zeroclaw/pull/12481) OpenBao；[#12482](https://github.com/zeroclaw-labs/zeroclaw/pull/12482) 外部云 Vault。该链条与 [#12373](https://github.com/zeroclaw-labs/zeroclaw/issues/12373)、[#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) 相呼应，是今日最密集的功能簇。  
- **SSH 任务级传输与凭据复用**：  
  [#11869](https://github.com/zeroclaw-labs/zeroclaw/pull/11869) 任务拥有的 SSH 传输复用；[#12418](https://github.com/zeroclaw-labs/zeroclaw/pull/12418) 在任务传输中使用受限凭据；[#12438](https://github.com/zeroclaw-labs/zeroclaw/pull/12438) 原生 Rust 任务 broker。  
- **浏览器语音与配对设备**：  
  [#12269](https://github.com/zeroclaw-labs/zeroclaw/pull/12269) 配对设备语音设置与聊天控制；[#12459](https://github.com/zeroclaw-labs/zeroclaw/pull/12459) 为 OIDC 会话启用浏览器语音。  
- **插件能力扩展**：  
  [#12440](https://github.com/zeroclaw-labs/zeroclaw/pull/12440) 增加 host-mediated agent wake dispatch（`dispatch.wake`）。  

**评估**：待合并队列功能密度高，但 XL PR 多、依赖链长，今日可确认的实际交付增量有限；项目「在研」活跃，「可发布」进展偏慢。

---

## 4. 社区热点

> 注：PR 评论数在数据中为 `undefined`，无法按评论数对 PR 排序；以下以 Issue 评论数和标签热度为主要依据。

- [#12014](https://github.com/zeroclaw-labs/zeroclaw/issues/12014)（6 评论）：自定义 OpenAI-compatible provider 未配置 `context_window` 时静默假定为 32,000，随后在本地拒绝合法 turn。用户诉求是 provider 兼容层应给出可诊断、可配置的 fallback，而不是静默截断。  
- [#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)（6 评论）：Anthropic provider 所有 usage 记录 `cost_usd: 0.0`，导致日/月预算上限永不触发。背后是成本账本可信度问题，直接影响生产环境预算治理。  
- [#12401](https://github.com/zeroclaw-labs/zeroclaw/issues/12401)（5 评论）：`keep_tool_context_turns` 导致 Claude Opus 5.5 在若干工具调用轮后出现 thinking-signature 400，且后续请求持续失败。用户需要工具上下文折叠不破坏模型签名。  
- [#8541](https://github.com/zeroclaw-labs/zeroclaw/issues/8541)（4 评论）：Matrix 会话希望按 thread 或显式 conversation id 隔离历史。反映多频道部署对会话边界的需求。  
- [#11138](https://github.com/zeroclaw-labs/zeroclaw/issues/11138)（4 评论）：有界委派中子代理是否必须继承调用方的工具级审批要求。核心诉求是最小权限和审批语义不被委派绕过。  
- [#12373](https://github.com/zeroclaw-labs/zeroclaw/issues/12373)（3 评论）与 [#7899](https://github.com/zeroclaw-labs/zeroclaw/issues/7899)（3 评论）：前者要求 WebUI 写入式凭据管理和受限 secret 引用；后者指出 OpenAI STT 忽略环境变量凭据。共同指向「配置与密钥管理一致性」。  

**热点分析**：社区关注点已从「能否调用模型」转向「运行时是否可预测、成本是否可信、密钥是否最小暴露、跨平台是否稳定」。这类问题对生产采用的影响大于普通 UI 功能。

---

## 5. Bug 与稳定性

### S0 / 安全风险

| 严重度 | Issue | Fix PR 状态 | 摘要 |
|---|---|---|---|
| S0 | [#12118](https://github.com/zeroclaw-labs/zeroclaw/issues/12118) | 未发现公开 fix PR | `cmd.exe` shell dialect 优先从 workspace 解析裸命令，workspace 写入的 `git.bat` 可能以 allowlist 中的 `git` 执行，存在 allowlist bypass 风险。 |

### S1 / 工作流阻断

| Issue | Fix PR 状态 | 摘要 |
|---|---|---|
| [#12014](https://github.com/zeroclaw-labs/zeroclaw/issues/12014) | 未发现公开 fix PR | 自定义 OpenAI-compatible provider 缺少 `context_window` 时硬编码 32,000，拒绝合法 turn。 |
| [#12401](https://github.com/zeroclaw-labs/zeroclaw/issues/12401) | 未发现公开 fix PR | 工具上下文折叠破坏 Claude Opus 5.5 thinking-signature，工具轮后持续 400。 |
| [#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) | 未发现公开 fix PR | Anthropic 成本记录为 $0，预算上限无法触发；P1、high risk。 |
| [#10901](https://github.com/zeroclaw-labs/zeroclaw/issues/10901) | 未发现公开 fix PR | Mattermost 自动发现 DM 时丢弃新会话第一条消息。 |
| [#12477](https://github.com/zeroclaw-labs/zeroclaw/issues/12477) | 未发现公开 fix PR | `cost.enforcement.mode` 被忽略，即使默认 `warn` 模式，超预算仍直接停止 turn。 |

### S2 / 行为降级

| Issue | Fix PR 状态 | 摘要 |
|---|---|---|
| [#10884](https://github.com/zeroclaw-labs/zeroclaw/issues/10884) | 未发现公开 fix PR | 流式客户端硬编码 300s idle timeout，`timeout_secs` 无法提高，慢首 token turn 被判定 provider timeout。 |
| [#12413](https://github.com/zeroclaw-labs/zeroclaw/issues/12413) | 未发现公开 fix PR | OpenCode Go context-window discovery 返回无容量。 |
| [#12412](https://github.com/zeroclaw-labs/zeroclaw/issues/12412) | 未发现公开 fix PR | OpenCode Go 使用 Zen 的模型目录，缺少 Go-only 模型。 |
| [#12390](https://github.com/zeroclaw-labs/zeroclaw/issues/12390) | 未发现公开 fix PR | shell 工具非零退出时返回空错误字符串，stderr 被吞掉，模型无法判断失败原因。 |
| [#12283](https://github.com/zeroclaw-labs/zeroclaw/issues/12283) | 未发现公开 fix PR | `resolve_peer_set` 按 group 应用 `ignore`，出站发送可能到达已忽略 peer。 |
| [#12289](https://github.com/zeroclaw-labs/zeroclaw/issues/12289) | 未发现公开 fix PR | `enabled = false` 的 agent 仍可通过 operator chat 和受限 RPC 执行 turn。 |
| [#12330](https://github.com/zeroclaw-labs/zeroclaw/issues/12330) | 未发现公开 fix PR | `zerocode-config.toml` 解析/读取失败时丢弃已保存远程连接并回退本地 daemon。 |
| [#12288](https://github.com/zeroclaw-labs/zeroclaw/issues/12288) | 未发现公开 fix PR | 「Discard all」保留表单草稿，后续分区 Save 可能持久化用户已丢弃的值。 |
| [#12484](https://github.com/zeroclaw-labs/zeroclaw/issues/12484) | 未发现公开 fix PR | 插件目录已删除时 `remove()` 在 Windows 上因 `rename_new` 丢失 `NotFound` 失败。 |
| [#12476](https://github.com/zeroclaw-labs/zeroclaw/issues/12476) | 未发现公开 fix PR | gateway 每条连接均以 INFO 经 `spawn!` 记录，淹没 runtime trace。 |
| [#7899](https://github.com/zeroclaw-labs/zeroclaw/issues/7899) | 未发现公开 fix PR | OpenAI STT provider 忽略环境变量凭据，仅读取配置字段。 |

### S3 / 次要问题与 CI 稳定性

| Issue | Fix PR 状态 | 摘要 |
|---|---|---|
| [#12236](https://github.com/zeroclaw-labs/zeroclaw/issues/12236) | 疑似对应 [#12323](https://github.com/zeroclaw-labs/zeroclaw/pull/12323)（OPEN） | 缓存 HTTP client 跨测试 runtime 共享，mock 请求偶发 “dispatch task is gone”。 |
| [#12483](https://github.com/zeroclaw-labs/zeroclaw/issues/12483) | 未发现公开 fix PR | `a_stopped_gateway_releases_its_port_before_its_drain_ends` 在 Windows 定时 Platform Tests 中持续失败。 |
| [#12400](https://github.com/zeroclaw-labs/zeroclaw/issues/12400) | 未发现公开 fix PR | 要求让 reply-end write-deadline dashboard 测试在 Windows 通过，或限定平台。 |

**稳定性判断**：今日 Bug 以运行时正确性、Provider 兼容和跨平台 CI 为主，多个 S1 缺少可见 fix PR；#12236 疑似已有对应修复 PR #12323，是少数有明确修复信号的条目。

---

## 6. 功能请求与路线图信号

- **凭据与密钥管理最可能进入近期路线图**：  
  [#12373](https://github.com/zeroclaw-labs/zeroclaw/issues/12373) 写入式 WebUI 凭据管理、[#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) 受限使用 operator-managed service credentials、[#12447](https://github.com/zeroclaw-labs/zeroclaw/issues/12447) Wazuh 调查工具与受限凭据。配套 PR 链 [#12402](https://github.com/zeroclaw-labs/zeroclaw/pull/12402)、[#12408](https://github.com/zeroclaw-labs/zeroclaw/pull/12408)、[#12481](https://github.com/zeroclaw-labs/zeroclaw/pull/12481)、[#12482](https://github.com/zeroclaw-labs/zeroclaw/pull/12482)、[#12418](https://github.com/zeroclaw-labs/zeroclaw/pull/12418) 已存在，信号最强。  
- **SSH 任务级传输复用**：  
  [#11869](https://github.com/zeroclaw-labs/zeroclaw/pull/11869)、[#12418](https://github.com/zeroclaw-labs/zeroclaw/pull/12418)、[#12438](https://github.com/zeroclaw-labs/zeroclaw/pull/12438) 构成完整链条，但多个 PR 标记 `needs-author-action`/`size:XL`，更适合作为下一阶段候选而非立即发布。  
- **浏览器语音能力**：  
  [#12269](https://github.com/zeroclaw-labs/zeroclaw/pull/12269)、[#12459](https://github.com/zeroclaw-labs/zeroclaw/pull/12459) 已有依赖关系，若评审顺利，可能进入后续版本。  
- **Agent 安全与身份传递**：  
  [#11138](https://github.com/zeroclaw-labs/zeroclaw/issues/11138) 要求有界委派遵守调用方工具审批；[#12441](https://github.com/zeroclaw-labs/zeroclaw/issues/12441) 要求把请求用户身份传递到工具执行。二者均涉及安全模型，暂无直接对应 PR，偏中期。  
- **成本可见性与预算治理**：  
  [#12353](https://github.com/zeroclaw-labs/zeroclaw/issues/12353) 要求显示每个会话的累计估算成本；结合 [#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)、[#12477](https://github.com/zeroclaw-labs/zeroclaw/issues/12477)，成本治理是高频痛点，但当前缺少可见 fix PR，短期内落地不确定。  
- **Matrix 会话历史作用域**：  
  [#8541](https://github.com/zeroclaw-labs/zeroclaw/issues/8541) 仍处于 `parking-lot`，暂无 PR，预计不是下一版本优先项。  
- **默认 Web 搜索 provider 决策**：  
  [#12480](https://github.com/zeroclaw-labs/zeroclaw/issues/12480) 需要决定默认搜索 provider 及用户告知方式，暂无 PR，偏产品策略讨论。  
- **插件唤醒派发**：  
  [#12440](https://github.com/zeroclaw-labs/zeroclaw/pull/12440) 引入 `dispatch.wake`，属于插件生态扩展信号，但风险标记高、体量大。  

---

## 7. 用户反馈摘要

- **Provider 兼容性仍是主要痛点**：自定义 OpenAI-compatible provider 的 context window、OpenCode Go 的目录与容量发现、OpenAI STT 的环境变量凭据、流式超时不可调，均说明用户在真实部署中遇到「配置看似成功、运行时才失败」的问题。代表链接：[#12014](https://github.com/zeroclaw-labs/zeroclaw/issues/12014)、[#12413](https://github.com/zeroclaw-labs/zeroclaw/issues/12413)、[#12412](https://github.com/zeroclaw-labs/zeroclaw/issues/12412)、[#7899](https://github.com/zeroclaw-labs/zeroclaw/issues/7899)、[#10884](https://github.com/zeroclaw-labs/zeroclaw/issues/10884)。  
- **成本治理可信度不足**：Anthropic 成本记 $0、预算上限不触发、`cost.enforcement.mode` 被忽略，直接影响用户对预算控制的信任；同时用户希望看到会话级实时成本。代表链接：[#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)、[#12477](https://github.com/zeroclaw-labs/zeroclaw/issues/12477)、[#12353](https://github.com/zeroclaw-labs/zeroclaw/issues/12353)。  
- **Agent 运行时需要更可预测**：Claude Opus thinking-signature 400、shell stderr 被吞、disabled agent 仍执行、peer ignore 失效、gateway 日志泛滥，均影响生产可运维性。代表链接：[#12401](https://github.com/zeroclaw-labs/zeroclaw/issues/12401)、[#12390](https://github.com/zeroclaw-labs/zeroclaw/issues/12390)、[#12289](https://github.com/zeroclaw-labs/zeroclaw/issues/12289)、[#12283](https://github.com/zeroclaw-labs/zeroclaw/issues/12283)、[#12476](https://github.com/zeroclaw-labs/zeroclaw/issues/12476)。  
- **安全与最小权限诉求明显**：用户在多用户助手、Matrix 部署、SSH 任务、Wazuh 调查等场景中，需要凭据不进入模型上下文、工具审批不被委派绕过、shell allowlist 不被 workspace 文件劫持。代表链接：[#11138](https://github.com/zeroclaw-labs/zeroclaw/issues/11138)、[#12373](https://github.com/zeroclaw-labs/zeroclaw/issues/12373)、[#12441](https://github.com/zeroclaw-labs/zeroclaw/issues/12441)、[#12118](https://github.com/zeroclaw-labs/zeroclaw/issues/12118)。  
- **跨平台稳定性仍需补强**：Windows 上插件删除、gateway 端口释放、dashboard 写超时测试持续失败，说明 Platform Tests 对 Windows 的覆盖在暴露真实兼容问题。代表链接：[#12484](https://github.com/zeroclaw-labs/zeroclaw/issues/12484)、[#12483](https://github.com/zeroclaw-labs/zeroclaw/issues/12483)、[#12400](https://github.com/zeroclaw-labs/zeroclaw/issues/12400)。  

**总体反馈语气**：样本中未出现明确正向反馈，Issue 以 blocker/degraded 为主；用户的核心期待是「可配置、可观测、可预算、可安全委派」。

---

## 8. 待处理积压

以下 Issue/PR 创建时间较早、重要性较高，虽在近 24 小时有更新，但仍未关闭或合并，建议维护者优先分诊。

### 长期未关闭的重要 Issue

- [#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)：创建于 2026-08-07，P1、high risk，Anthropic 成本记 $0，预算上限失效。  
- [#8541](https://github.com/zeroclaw-labs/zeroclaw/issues/8541)：创建于 2026-06-30，`parking-lot`，Matrix 会话历史作用域。  
- [#7899](https://github.com/zeroclaw-labs/zeroclaw/issues/7899)：创建于 2026-06-17，P3，OpenAI STT 忽略环境变量凭据。  
- [#10884](https://github.com/zeroclaw-labs/zeroclaw/issues/10884)：创建于 2026-09-15，P1、`in-progress`，流式 300s idle timeout 不可调。  
- [#11138](https://github.com/zeroclaw-labs/zeroclaw/issues/11138)：创建于 2026-09-26，`accepted`、`follow-up`，有界委派工具审批语义。  
- [#10901](https://github.com/zeroclaw-labs/zeroclaw/issues/10901)：创建于 2026-09-16，P1，Mattermost 丢弃首条 DM。  

### 长期未合并的重要 PR

- [#11868](https://github.com/zeroclaw-labs/zeroclaw/pull/11868)：创建于 2026-10-19，`needs-maintainer-review`、XL、high risk，阻止重复工具调用并保留 closeout，关联 #11866。  
- [#11869](https://github.com/zeroclaw-labs/zeroclaw/pull/11869)：创建于 2026-10-19，`needs-author-action`、XL、high risk，任务级 SSH 传输复用。  
- [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847)：创建于 2026-10-19，`needs-maintainer-review`、XL、high risk，原生 Rust XMPP 与可选 OMEMO。  
- [#11846](https://github.com/zeroclaw-labs/zeroclaw/pull/11846)：创建于 2026-10-18，XL、medium risk，Web 设置中控制 OpenRouter 余额上报。  
- [#11911](https://github.com/zeroclaw-labs/zeroclaw/pull/11911)：创建于 2026-10-20，XL，保留已完成工具结果并复用有界恢复。  
- [#12269](https://github.com/zeroclaw-labs/zeroclaw/pull/12269)：创建于 2026-11-06，`needs-author-action`、XL、high risk，配对设备语音设置与聊天控制。  

**积压判断**：项目当前并非「无人处理」，而是大量高价值 Issue/PR 处于长周期评审或作者修订状态。建议维护者优先清理 `needs-maintainer-review` 和 P1/S1 条目，以降低积压对发布节奏的拖累。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-11-16（统计窗口：2026-11-15 至 2026-11-16）**
**数据来源：[github.com/sipeed/picoclaw](https://github.com/sipeed/picoclaw)**

> **统计口径说明**：Issues 更新 0 条， Releases 0 个，PR 更新全部为 CLOSED 状态。原始数据未区分“已合并（merged）”与“未合并关闭（closed）”，下文对合并状态均标注为待核实。评论数（undefined）与点赞数（0）缺失，社区互动维度无法量化。

---

## 1. 今日速览

今日 PicoClaw 处于**低活跃、以清理积压为主**的状态：24 小时内无新 Issue、无 Issue 关闭、无新版本发布，社区侧完全静默。唯一的动作是 3 个 PR 被关闭，且全部为**创建于 2026 年 3–4 月的历史积压项**，平均存续约 **238 天（约 7.8 个月）**，无一是当日新提交。从推进内容看，2 个 PR 是批量合并修复（batch merge），1 个是 Telegram/Codex 编排功能分支，指向维护者正在进行**积压梳理与仓库收敛**，而非功能开发。综合评估：项目健康度**中性** —— 清理动作对仓库长期卫生是正向信号，但 0 Issue 流量、0 版本产出、0 社区互动，说明项目当前**新增输入几乎停滞**，需关注是否为维护者精力不足或社区活跃度下滑。今日净推进量约为“中等”：解决了 3 个长期悬挂 PR，但其中 2 个的价值取决于其所引用子 PR 是否真正落地。

---

## 2. 版本发布

**今日无新版本发布**，无破坏性变更、无迁移注意事项需要通告。距上一个版本（数据未提供）的间隔无法评估，但结合“0 个 release + 0 个新合并 PR”，建议维护者关注发版节奏是否滞后于已积累的修复。

---

## 3. 项目进展

今日 3 个 PR 全部关闭，明细如下：

| PR | 标题 | 作者 | 创建 | 关闭 | 存续 | 链接 |
|---|---|---|---|---|---|---|
| #2379 | Feature/telegram codex orchestrator | @Skezza | 2026-04-06 | 2026-11-15 | 223 天 | [链接](https://github.com/sipeed/picoclaw/pull/2379) |
| #1546 | fix: merge PR #1480 #1479 #1478 #1473 #1467 | @xuwei-xy | 2026-03-14 | 2026-11-15 | 246 天 | [链接](https://github.com/sipeed/picoclaw/pull/1546) |
| #1555 | fix: merge PR #1390 #1389 #1383 #1381 | @xuwei-xy | 2026-03-14 | 2026-11-15 | 246 天 | [链接](https://github.com/sipeed/picoclaw/pull/1555) |

**推进解读：**

- **#1546 / #1555（批量合并型修复）**：作者 @xuwei-xy 采用“聚合 PR”策略，分别打包 5 个（#1480、#1479、#1478、#1473、#1467）和 4 个（#1390、#1389、#1383、#1381）上游修复。这种做法的动机通常是上游小 PR 长期无法合入、冲突累积，故由一个统一分支承接。今日这两个聚合 PR 双双关闭，**可能意味着修复已合并入主干，也可能是被判定为过时（stale）而关闭**——需核实。
  - 若为已合并：单日一次性落地 **9 个修复条目**，对本项目的稳定性是显著正向推进。
  - 若为 stale 关闭：则被引用的 9 个上游 PR 的实际修复状态需重新确认，存在**修复遗失风险**。
- **#2379（功能分支）**：标题指明为 **Telegram 渠道 + Codex 编排器（orchestrator）** 能力，属于面向“个人 AI 助手”核心使用场景的功能扩展，且存续达 7 个月。以 CLOSED 结束，最可能是被关闭后改由更小的 PR 拆分提交，或功能方向被否决。**这是今日最值得跟踪的一项**，因为 Telegram 集成直接影响 PicoClaw 在轻量设备上的可用性。

**整体前进幅度**：中等偏保守。今日无新增功能合入记录，主要为存量清理，项目“向前迈进”的实质增量取决于 #1546/#1555 的合并结果。

---

## 4. 社区热点

**今日无社区热点。** 所有 3 个 PR 的评论数为 `undefined`、👍 为 0，Issues 无任何更新，无法形成讨论热度排名。

**信号分析**：一个成长期开源项目在 24 小时内 Issue 与评论双双归零，通常对应三种可能之一：(a) 项目已进入维护稳定期，用户无新问题；(b) 用户转向其他渠道（Discord/QQ 群）反馈；(c) 社区规模本身较小。对于定位“边缘设备个人 AI 助手”的 PicoClaw，**(b) 的可能性偏高** —— 该类硬件项目用户更倾向在即时通讯群反馈。建议维护者在周报中补录社群渠道的问题摘要，避免 GitHub 数据低估真实活跃度。

---

## 5. Bug 与稳定性

**今日无新报告的 Bug、崩溃或回归问题**（Issues 更新 0 条）。

但需提示一个**潜在稳定性风险**（来自 PR 内容而非今日新报）：

- 🟡 **中等级别 —— 9 个修复的落地状态不明**：#1546 与 #1555 分别引用了 #1480/#1479/#1478/#1473/#1467 与 #1390/#1389/#1383/#1381。若这两个聚合 PR 为**未合并关闭**，则这批修复可能仍在主干之外，相关缺陷未真正解决。建议维护者在仓库中逐项核对这 9 个 PR 的最终状态，并对仍未修复者重新开单。
- 🟢 **低级别**：无已知崩溃或数据丢失类报告。

---

## 6. 功能请求与路线图信号

今日无新功能请求 Issue。基于现有 PR 可提取的唯一路线图信号：

- **Telegram 渠道 + Codex 编排（PR #2379）**：反映贡献者对“多 IM 平台接入 + 任务编排”有真实需求。考虑到 PicoClaw 的轻量设备定位，Telegram 这类低带宽、Bot API 友好的渠道是合理方向。
- **纳入下一版本的可能性判断**：**低—中**。该 PR 已被关闭，短期内直接进入 release 的概率不高；但如果作者按评审意见拆分重提（如先落地 Telegram 渠道、再补编排逻辑），则有望在后续 1–2 个版本内看到。建议维护者若认可方向，主动在 Issue 区开启一条 roadmap 讨论以留住贡献者。

---

## 7. 用户反馈摘要

**今日无可提炼的用户反馈**——Issues 更新 0 条，PR 评论数据缺失，无痛点、场景或满意/不满意表述可归纳。

作为替代观察：今日 3 个 PR 均由作者本人推进且评论数不可见，**缺乏可见的维护者—贡献者对话**。这对新贡献者是负向信号（无人回应会降低二次提交意愿）。建议维护者在关闭历史 PR 时至少留一句说明（“已合并”“已由 #XXXX 替代”“方向暂不采纳”），这是低成本、高回报的社区维护动作。

---

## 8. 待处理积压

今日关闭 3 个后，仍有明确的**隐性积压**需提醒关注：

1. **#2379 的 Telegram/Codex 能力缺位**（[链接](https://github.com/sipeed/picoclaw/pull/2379)）—— 关闭后若无替代 PR，该功能方向实质为空缺，建议开 Issue 记录需求，避免贡献者重复劳动。
2. **#1546 引用的 5 个上游 PR**：#1480、#1479、#1478、#1473、#1467 —— 状态需核实，若仍 open 则已积压约 8 个月。
3. **#1555 引用的 4 个上游 PR**：#1390、#1389、#1383、#1381 —— 同上。
4. **发版积压**：连续无新 release，而历史修复批量关闭，建议评估是否具备一次 patch release 的条件。

> ⚠️ 数据缺口提示：本次输入未包含全部 open Issue/PR 列表，以上积压项仅基于今日关闭 PR 的引用关系推导，**并非完整积压清单**。建议下次统计补充 open 状态总量与 >90 天未响应条目数，以便准确评估积压健康度。

---

### 健康度评分（主观，仅供参考）

| 维度 | 评分 | 依据 |
|---|---|---|
| 开发活跃度 | ★★☆☆☆ | 0 新增提交入口，仅存量清理 |
| 社区活跃度 | ★☆☆☆☆ | 0 Issue、0 评论、0 反应 |
| 积压治理 | ★★★★☆ | 单日关闭 3 个长龄 PR，方向正确 |
| 发版节奏 | ★★☆☆☆ | 24h 无 release |
| 贡献者留存风险 | ⚠️ 关注 | 长龄 PR 关闭且无公开说明 |

**结论**：今日是“**清理日**”而非“**建设日**”。项目稳定但缺乏新增量输入，核心风险不在代码质量，而在**社区响应速度与贡献者沟通透明度**。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目日报 · 2026-11-16

> 数据窗口：2026-11-15 至 2026-11-16（过去 24 小时）｜数据源：GitHub Issues / Pull Requests

---

## 1. 今日速览

过去 24 小时项目共产生 **23 条协作动态**（12 条 Issue 更新 + 11 条 PR 更新），其中新开/活跃 Issue 10 条、PR 新增 4 条，社区侧活跃度处于高位。但**合并 PR 为 0、新发布为 0、关闭 Issue 仅 2 条**，代码净合入量今日为零，"提交快、合入慢"的剪刀差是当前最显著的健康度信号。亮点在于修复供给侧的响应速度：4 个当日新 issue 在 24 小时内即出现了针对性 fix PR（#8753/#8752、#8754/#8736、#8756/#8755、#8749/#8748），报告—修复闭环平均耗时不足一天。问题分布高度集中在 **v2.3.0 升级回归**与**频道插件外置化（#8187）后的稳定性**两条线上。综合评估：**社区活力健康，维护者 review/merge 带宽为当前瓶颈**。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日**无 PR 被合并或关闭**，2 条 Issue 以关闭状态结束（#8361、#8751），代码层面净推进为零。

不过，今日新增 4 个 PR 与 4 个新 issue 精确配对，属于可直接进入 review 的小/中型修复：

| PR | 对应 Issue | 范围 | 说明 |
|---|---|---|---|
| [#8756](https://github.com/agentscope-ai/QwenPaw/pull/8756) | [#8755](https://github.com/agentscope-ai/QwenPaw/issues/8755) | size/S | 微信凭据按 agent workspace 隔离，修复双账号互相覆盖 |
| [#8753](https://github.com/agentscope-ai/QwenPaw/pull/8753) | [#8752](https://github.com/agentscope-ai/QwenPaw/issues/8752) | size/S | 飞书上传前解码百分号编码文件名 |
| [#8754](https://github.com/agentscope-ai/QwenPaw/pull/8754) | [#8736](https://github.com/agentscope-ai/QwenPaw/issues/8736) | size/S | 子代理回合不再触发「回复完成」通知 |
| [#8749](https://github.com/agentscope-ai/QwenPaw/pull/8749) | [#8748](https://github.com/agentscope-ai/QwenPaw/issues/8748) | size/S | 飞书重连监督器在清理异常后存活 |
| [#8741](https://github.com/agentscope-ai/QwenPaw/pull/8741) | [#8740](https://github.com/agentscope-ai/QwenPaw/issues/8740) | size/M | 新增 Olostep 作为第 4 个 web_search provider |

**向前迈进评估**：修复方案储备充分（4 个频道/通知类修复均为低风险 S 级改动），但待合并池已累积至 **11 条**，其中 #8628、#8630 自 11-08 起已等待 8 天。若 review 带宽不能在数日内跟上，首次贡献者流失与后续 rebase 成本将同步上升。

---

## 4. 社区热点

今日全部条目的 👍 计数为 0，热度主要体现在评论深度而非点赞：

- **[#8361](https://github.com/agentscope-ai/QwenPaw/issues/8361)（4 条评论，已关闭）**：Automatic Memory Search 开启后同一轮重复调用 `memory_search`，第 4 次被重复搜索保护拦截后，收尾（finalize）与受控恢复均无法产出正常回复。讨论聚焦**工具调用循环的熔断与降级策略**——拦截机制生效了，但缺少退出路径，这属于 Agent 运行时可靠性的核心命题。
- **[#8747](https://github.com/agentscope-ai/QwenPaw/issues/8747)（2 条评论）**：v2.3.0 控制台侧边栏「检查点」入口消失，路由与后端 API 全部正常，根因是导航项 `parentId` 指向已被移除的 `core.agent-group`。属于**前端 bundle 重构的遗留引用**。
- **[#8751](https://github.com/agentscope-ai/QwenPaw/issues/8751)（2 条评论，已关闭）**：#8751 以关闭结束，但今日 PR 列表中无对应实现；结合 #8755 显示的真实多账号诉求，建议维护者在关闭理由中显式给出架构取向（不支持 / 折中方案），避免同类 issue 重复提交。
- **[#8736](https://github.com/agentscope-ai/QwenPaw/issues/8736)（2 条评论）**：用户已比对 main 分支确认 `channel.py` 字节一致，属于跨版本未修复。

另外，PR 侧互动数据缺失，也从侧面反映 **review 讨论冷淡**——11 条 PR 全部处于 OPEN 且无 review 流转。

---

## 5. Bug 与稳定性

按影响面与可恢复性排序：

| 级别 | Issue | 现象 | 版本/环境 | Fix PR |
|---|---|---|---|---|
| **P0 静默数据丢失** | [#8757](https://github.com/agentscope-ai/QwenPaw/issues/8757) | 微信入站消息静默停止：worker 存活、健康检查上报正常、日志零错误，游标永不重置 | 2.3.0 Desktop / Win10 | ❌ 无 |
| **P0 静默任务丢弃** | [#8746](https://github.com/agentscope-ai/QwenPaw/issues/8746) | 后台启动期间提交的任务被吞，agent 构建完成但从不调用 LLM，无任何错误日志；跨模型复现 | 2.3.0 Desktop / Win11 | ❌ 无 |
| P1 频道永久失联 | [#8748](https://github.com/agentscope-ai/QwenPaw/issues/8748) | 飞书重连监督器在 disconnect 清理抛异常时永久退出 | 2.3.0 macOS arm64 | ✅ [#8749](https://github.com/agentscope-ai/QwenPaw/pull/8749) |
| P1 功能不可用 | [#8755](https://github.com/agentscope-ai/QwenPaw/issues/8755) | 升级后微信凭据重复，两个 agent 仅一个频道可运行 | 2.3.0 | ✅ [#8756](https://github.com/agentscope-ai/QwenPaw/pull/8756) |
| P1 UI 回归 | [#8747](https://github.com/agentscope-ai/QwenPaw/issues/8747) | 检查点导航入口不渲染（后端与路由正常） | 2.3.0 Desktop / Win10 | ❌ 无 |
| P2 用户可见缺陷 | [#8752](https://github.com/agentscope-ai/QwenPaw/issues/8752) | 飞书非 ASCII 文件名被百分号编码，文件卡片显示 `%E9%99%84...docx` | 2.3.0 pip / main 已验证 | ✅ [#8753](https://github.com/agentscope-ai/QwenPaw/pull/8753) |
| P2 体验噪音 | [#8736](https://github.com/agentscope-ai/QwenPaw/issues/8736) | 子代理完成误触发「回复完成」桌面通知 | 2.3.0 Docker / main | ✅ [#8754](https://github.com/agentscope-ai/QwenPaw/pull/8754) |
| 已关闭 | [#8361](https://github.com/agentscope-ai/QwenPaw/issues/8361) | 自动记忆搜索重复调用后无法生成回复 | 2.2.2 | 今日 PR 列表中未见对应修复，处置方式待确认 |

**共性问题**：#8757、#8746、#8736 均指向同一类缺陷——**失败无日志、健康状态与真实可用性脱钩**。可观测性缺口比单点 bug 更值得投入。

---

## 6. 功能请求与路线图信号

- **web_search provider 生态化（高概率纳入）**：[#8740](https://github.com/agentscope-ai/QwenPaw/issues/8740) Olostep 已配套 PR [#8741](https://github.com/agentscope-ai/QwenPaw/pull/8741)（size/M，遵循现有 provider 结构，anysearch 保持默认）；[#8758](https://github.com/agentscope-ai/QwenPaw/issues/8758) Keenable 为 opt-in 同类请求，暂无 PR。两次请求独立出现，说明 provider 抽象已成为**外部厂商主动集成的入口**，建议沉淀为标准化接入规范。
- **i18n / 意大利语 UI（中期）**：[#8750](https://github.com/agentscope-ai/QwenPaw/issues/8750) 由意大利航空航天企业 PoC 驱动，当前 UI 仅 zh/en，但 agent 输出已可在 workspace 层本地化。若 UI 文案已抽离 i18n key，接受社区翻译的成本较低。
- **多租户（短期不乐观）**：[#8751](https://github.com/agentscope-ai/QwenPaw/issues/8751) 已关闭；但 #8755 显示用户在**用多 agent 变相实现家庭级多账号**。短期更可行的路径是 #8756 这类 per-agent 凭据隔离，而非架构级多用户。
- **存量 PR 中的潜在功能**：[#6325](https://github.com/agentscope-ai/QwenPaw/pull/6325) Console 内置工具文档抽屉（size/XL）、[#8628](https://github.com/agentscope-ai/QwenPaw/pull/8628) 模型回退元数据（`model_used` / `model_requested` 等 4 字段）、[#8630](https://github.com/agentscope-ai/QwenPaw/pull/8630) 频道部分更新保留 `enabled` 状态——这三项均具备较高的用户价值密度，却长期停留在待合并状态。

---

## 7. 用户反馈摘要

**真实痛点**

1. **升级即破坏**：v2.3.0 一次性引出三类回归（导航入口丢失、文件名编码、凭据重复），用户对升级的信任成本正在上升，建议在 release note 中列出频道插件外置化（#8187）的迁移检查项。
2. **静默失败最致命**：多个独立报告反复强调"进程活着、健康检查正常、日志干净"，但功能已失效。用户能容忍报错，难以容忍无提示。
3. **配置覆盖风险**：#8630 描述"仅重存凭据就静默关闭了 `enabled`，频道停止收消息且无警告"——部分更新重置为 schema 默认值是设计层隐患。
4. **单用户边界被现实需求撞破**：家庭共享一台安装、企业小范围 PoC 都直接命中该限制。

**使用场景**：Desktop（Windows 10/11、macOS arm64）、Docker（`agentscope/qwenpaw:v2.3.0`）、pip 部署；频道侧飞书与微信为主要战场。

**满意度信号**：用户投入度很高——有人精确到 `site-packages` 路径定位源码、有人对 main 分支做字节级比对确认未修复、第三方厂商（Olostep）直接实名提 PR。这类高成本参与是项目健康的正向指标，也意味着**响应延迟的代价更高**。

---

## 8. 待处理积压（请维护者关注）

| 条目 | 类型 | 创建 | 等待 | 标签 |
|---|---|---|---|---|
| [#6325](https://github.com/agentscope-ai/QwenPaw/pull/6325) | feat(tools) Console 工具文档与参数 | 2026-07-22 | ~4 个月 | size/XL |
| [#7211](https://github.com/agentscope-ai/QwenPaw/pull/7211) | fix(runtime) 阻止注入上下文持久化 | 2026-08-21 | ~3 个月 | first-time-contributor, **ready-for-human-review**, size/L |
| [#8295](https://github.com/agentscope-ai/QwenPaw/pull/8295) | fix(channels) 显示边界隐藏内部脚手架 | 2026-10-17 | ~1 个月 | size/M |
| [#8477](https://github.com/agentscope-ai/QwenPaw/pull/8477) | perf(skills) 暂存池技能原地重命名 | 2026-10-28 | ~3 周 | Under Review, size/L |
| [#8630](https://github.com/agentscope-ai/QwenPaw/pull/8630) | fix(channels) 保留部分更新时的 enabled | 2026-11-08 | 8 天 | size/L |
| [#8628](https://github.com/agentscope-ai/QwenPaw/pull/8628) | feat(providers) 模型回退元数据 | 2026-11-08 | 8 天 | first-time-contributor, size/M |

**优先级建议**：#7211 已标注 `ready-for-human-review` 且属首次贡献者作品，挂起近三个月对社区信号极为不利，建议本周内给出明确结论；#8628 同样是首次贡献者、改动面小（size/M），适合作为快速合入以激活贡献循环。另建议为 #8747、#8757、#8746 三个无 fix PR 的高严重度问题指定负责人。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报

**日期：** 2026-11-16  
**数据窗口：** 过去 24 小时  
**项目：** [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日速览

过去 24 小时项目维持极高水平运转：Issues 更新 **328 条**（新开/活跃 291、关闭 37），PR 更新 **500 条**（待合并 410、合并/关闭 90），并发布 1 个 canary 构建。社区讨论集中在**统一网关（Unified Gateway）合并后的稳定性阵痛**、**Kanban/长任务执行可靠性**以及**网关权限分级（RBAC）**三大主题。安全侧有明确进展：WhatsApp Bridge 鉴权加固 PR 已关闭合并，智能审批导致数据丢失的高危 Issue 也已关闭。整体健康度评估为：**活跃度极高、安全响应积极，但 Review 带宽与历史积压是当前主要瓶颈**（待合并 PR 与已合并/关闭 PR 比例约 4.6:1）。

---

## 2. 版本发布

### v0.23.1+canary.20261115T064406Z

- **发布类型：** Canary 预发布构建（自动构建产物）
- **发布日期：** 2026-11-15
- **版本基线：** v0.23.1
- **发布说明：** 数据源仅展示标题、日期及 Hermes Desktop 下载表开头（macOS Apple Silicon DMG），**未包含完整变更清单、破坏性变更与迁移说明**。
- **判断与建议：**
  - 该版本属于 canary 通道，用于每日验证，不应视为稳定版。
  - 由于 changelog 缺失，**无法确认具体功能变更或兼容性影响**；生产环境建议继续使用稳定通道。
  - Desktop 构建继续按 OS/架构分发，macOS Apple Silicon 为优先产物。
- **链接：** [Release v0.23.1+canary.20261115T064406Z](https://github.com/NousResearch/hermes-agent/releases)

---

## 3. 项目进展

今日 PR 合并/关闭 **90 条**、Issue 关闭 **37 条**，净进展为正。重点推进如下：

| 事项 | 状态 | 意义 |
|---|---|---|
| [PR #133011](https://github.com/NousResearch/hermes-agent/pull/133011) WhatsApp Bridge 每会话 Token 鉴权、防冒充监听 | **已关闭/合并** | 封堵本地同驻进程读取收件箱、冒充用户发送消息的攻击面，属于消息通道安全边界加固 |
| [Issue #141346](https://github.com/NousResearch/hermes-agent/issues/141346) 智能审批自动批准 osascript 导致用户未保存 PPT 被关闭、导出被删 | **已关闭** | 高危数据丢失事件闭环，涉及审批模式与终端工具安全策略 |
| [Issue #107156](https://github.com/NousResearch/hermes-agent/issues/107156) 失效 cwd 记录导致 gateway 终端永久 exit 126 | **已关闭** | 修复会话状态污染导致的终端不可用问题 |
| [PR #152168](https://github.com/NousResearch/hermes-agent/pull/152168) Desktop 重新设计的工作区（保留经典界面回退） | 开放，持续更新 | 桌面端 UI 大改版，提供“Redesigned interface”开关与经典恢复路径，降低升级风险 |
| [PR #156253](https://github.com/NousResearch/hermes-agent/pull/156253) 人类聊天 1 小时缓存、空闲会话在缓存过期前压缩 | 新开 | 直接降低用户离开后重新发送上下文的成本，属于成本优化关键 PR |
| [PR #156312](https://github.com/NousResearch/hermes-agent/pull/156312) ACP 适配 agent-client-protocol 1.0 | 新开 | 修复 `hermes acp` 在 1.0 下无法启动的问题，恢复 Zed/Buzz/JetBrains 编辑器接入 |
| [PR #156321](https://github.com/NousResearch/hermes-agent/pull/156321) / [PR #122002](https://github.com/NousResearch/hermes-agent/pull/122002) TTS 语音回复按真实编码转换为 Ogg/Opus | 新开/打捞 | 修复 WhatsApp/本地语音笔记因容器内实际为 Vorbis/FLAC 而损坏 |
| [PR #156079](https://github.com/NousResearch/hermes-agent/pull/156079)、[#156317](https://github.com/NousResearch/hermes-agent/pull/156317)、[#156314](https://github.com/NousResearch/hermes-agent/pull/156314) 插件目录新增 Hermes Mini、nexus-memory、2pr | 新开 | 插件生态扩张信号明显，社区开始围绕移动端、长期记忆、LinkedIn MCP 贡献条目 |

**整体评价：** 今日进展以“安全加固 + 桌面端体验 + 协议兼容 + 插件生态”为主。大量 PR 标注 `salvage` 或 `port nanoclaw#`，说明维护者正在系统性打捞旧 PR 并同步姊妹项目修复，属于健康的工程清理行为；但 410 条待合并 PR 表明 Review 吞吐仍是瓶颈。

---

## 4. 社区热点

### 讨论最活跃 Issues

1. **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547) — 73 评论｜统一网关合并后的开放问题追踪**  
   10 月 14 日 #106742 将 CLI、TUI、Desktop、API Server、编辑器、消息机器人、Cron、Kanban、群聊全部收敛到单一 gateway 进程。该 Issue 持续收集 post-merge 问题，是当前架构迁移的“总账本”。背后诉求是：**统一进程带来了状态集中，但也放大了单点故障与跨组件耦合风险**。

2. **[#141346](https://github.com/NousResearch/hermes-agent/issues/141346) — 39 评论｜智能审批误放行 osascript 导致不可恢复数据丢失（已关闭）**  
   用户让 Agent 生成 PPT，Agent 通过 `osascript` 驱动正在运行的 PowerPoint 渲染，最终关闭了未保存的演示文稿并删除导出文件。社区高度关注，核心诉求是：**“smart” 审批模式不能把跨应用自动化命令当作低风险操作**。

3. **[#105758](https://github.com/NousResearch/hermes-agent/issues/105758) — 31 评论｜生命周期守卫误报，阻断 Node.js CLI**  
   终端生命周期守卫因扫描预算逻辑误判，阻止 `obsidian-headless` 等正常 CLI。反映**安全守卫的误报会直接破坏日常工作流**。

4. **[#129455](https://github.com/NousResearch/hermes-agent/issues/129455) — 30 评论｜默认安装下测试套件大面积失败**  
   导入期 PM 激活触发 `home_io_guard`，导致默认安装（checkout 位于 `$HERMES_HOME` 内）的测试无法运行。影响贡献者体验与 CI 可信度。

5. **[#119070](https://github.com/NousResearch/hermes-agent/issues/119070) — 26 评论｜Kanban 卡片限流后成功仍被永久标记 `blocker_auth`**  
   Reviewer 永不 spawn，调度器持续报 “ready queue non-empty”。属于长任务编排的状态机缺陷。

6. **[#145022](https://github.com/NousResearch/hermes-agent/issues/145022) — 24 评论｜P1：gateway 卡顿导致多个 Kanban worker 同时崩溃**  
   报错 “Kanban execution unknown; retained by owner”，重试但丢失进行中的工作。一次卡顿可杀死 4 个 worker。

7. **[#527](https://github.com/NousResearch/hermes-agent/issues/527) — 21 评论｜16 👍｜网关权限分级 RBAC**  
   当前只有“全授权/全阻断”二元模型，缺少 Owner/Admin/User/Guest 分级。是社区呼声最高的路线图级需求之一。

### 讨论最活跃 PRs

- [PR #152168](https://github.com/NousResearch/hermes-agent/pull/152168) Desktop 重设计工作区：关注点在于**默认 UI 变更是否会影响现有用户**，PR 提供了经典界面回退开关，降低争议。
- [PR #156253](https://github.com/NousResearch/hermes-agent/pull/156253) 1 小时缓存与空闲压缩：直接回应社区对**令牌成本与响应延迟**的长期不满。
- [PR #144738](https://github.com/NousResearch/hermes-agent/pull/144738) 审批卡片代码块注入防护：与 #141346 的数据丢失事件形成呼应，说明**审批 UI 本身也是不可信文本的渲染边界**。
- [PR #155467](https://github.com/NousResearch/hermes-agent/pull/155467) heredoc 感知的命令 floor 加固：针对 `curl | sh`、解释器管道等绕过手法的系统性修补。

**诉求分析：** 社区讨论已从“功能有没有”转向“**边界是否安全、状态是否可靠、多人是否可控**”。统一网关、Kanban、审批、RBAC 四条线本质上都指向同一个问题：Hermes 正从单人本地 Agent 演化为多进程、多用户、多平台的常驻运行时，原有的二元授权与单进程假设不再成立。

---

## 5. Bug 与稳定性

按严重程度排列（P1 > P2 > P3）：

### P1 / 高严重度

| Issue | 问题 | Fix PR 状态 |
|---|---|---|
| [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) | 多 Kanban worker 并发时 gateway 卡顿导致 worker 崩溃，进行中工作丢失 | 暂未发现直接关联 fix PR |
| [#143150](https://github.com/NousResearch/hermes-agent/issues/143150) | 多 profile 迁移到 multiplex 后，Desktop 恢复会话报 `storage_unavailable`，`state_meta` 路由未迁移 | 暂未发现直接关联 fix PR |
| [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) | `hermes update` / Desktop 更新失败留下半安装状态，无产品内恢复路径；一周 15 个 Discord 线程 | [PR #156319](https://github.com/NousResearch/hermes-agent/pull/156319) 部分相关（缺核心依赖时 exit 75 交由 supervisor 处理），但完整更新恢复尚未闭环 |

### P2 / 中严重度

| Issue | 问题 | Fix PR 状态 |
|---|---|---|
| [#139532](https://github.com/NousResearch/hermes-agent/issues/139532) | gateway 重启将进行中 turn 标记 unknown，阻塞整个会话 FIFO，下一条消息永久排队 | 暂未发现直接关联 fix PR |
| [#139825](https://github.com/NousResearch/hermes-agent/issues/139825) | **v0.22.3 回归**：卫星 cron 投递在同时存在 Desktop local adapter 时失败 | 暂未发现直接关联 fix PR |
| [#148898](https://github.com/NousResearch/hermes-agent/issues/148898) | Codex 后端对部分 zstd 压缩 `/responses` 请求返回 400，且被判定为不可重试 | 暂未发现直接关联 fix PR |
| [#129993](https://github.com/NousResearch/hermes-agent/issues/129993) | Desktop 助手回复重复渲染两个气泡，持久化记录只有一条 | 暂未发现直接关联 fix PR |
| [#122928](https://github.com/NousResearch/hermes-agent/issues/122928) | macOS 环境切换后，旧 runtime venv 通过 `PYTHONPATH` 泄漏给终端子进程 | 暂未发现直接关联 fix PR |
| [#149979](https://github.com/NousResearch/hermes-agent/issues/149979) | 远程 gateway + Bot Chat 场景下媒体下载报 “Session not found” | [PR #148902](https://github.com/NousResearch/hermes-agent/pull/148902) 按持久化 session owner 路由下载，**可能覆盖此问题** |
| [#96610](https://github.com/NousResearch/hermes-agent/issues/96610) | schema 约束后端上 `tool_call` 桥接参数恒为空，缺少 `additionalProperties` | 暂未发现直接关联 fix PR |
| [#89166](https://github.com/NousResearch/hermes-agent/issues/89166) | 跨进程会话租约等待每 15 秒刷屏聊天网关，饿死最终投递 | 暂未发现直接关联 fix PR |
| [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) | Kanban 卡片限流后成功仍永久 `blocker_auth`，reviewer 不 spawn | 暂未发现直接关联 fix PR |

### P3 / 低严重度但影响体验

- [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) 生命周期守卫误报阻断 Node.js CLI。
- [#36755](https://github.com/NousResearch/hermes-agent/issues/36755) systemd 时序检查对不存在的 `--user` unit 误报 90s 默认值。
- [#129455](https://github.com/NousResearch/hermes-agent/issues/129455) 默认安装下测试套件因 `home_io_guard` 大面积失败，影响贡献者。
- [#123118](https://github.com/NousResearch/hermes-agent/issues/123118) macOS LaunchAgent 在隐私与安全性中显示为 `osascript`，不可识别为 Hermes。

**稳定性结论：** 今日 P1 问题集中在 **Kanban 并发状态机、多 profile 会话迁移、安装/更新恢复**三类。安全类 Issue 有明确闭环，但可靠性类多数尚无 fix PR，建议维护者优先分配 #145022、#143150、#139532 三条状态一致性缺陷。

---

## 6. 功能请求与路线图信号

### 高概率进入近期版本

1. **成本与延迟优化**  
   [PR #156253](https://github.com/NousResearch/hermes-agent/pull/156253)（1 小时缓存 + 空闲压缩）直接回应 [#6642](https://github.com/NousResearch/hermes-agent/issues/6642) 遥测/成本诉求与 [#117886](https://github.com/NousResearch/hermes-agent/issues/117886) 后台压缩诉求。已有成型 PR，**进入下一 canary 的概率较高**。

2. **编辑器协议兼容**  
   [PR #156312](https://github.com/NousResearch/hermes-agent/pull/156312) 修复 ACP 1.0 无法启动，属于兼容性刚需，优先级明确。

3. **插件生态扩张**  
   [PR #156079](https://github.com/NousResearch/hermes-agent/pull/156079)（Hermes Mini 移动端）、[#156317](https://github.com/NousResearch/hermes-agent/pull/156317)（nexus-memory/Qdrant）、[#156314](https://github.com/NousResearch/hermes-agent/pull/156314)（2pr LinkedIn MCP）表明目录正在快速扩充，插件市场是明确的路线图方向。

4. **审批与命令安全加固**  
   [PR #144738](https://github.com/NousResearch/hermes-agent/pull/144738)、[#155467](https://github.com/NousResearch/hermes-agent/pull/155467)、[#156087](https://github.com/NousResearch/hermes-agent/pull/156087) 形成一组安全补丁流，预计会随稳定版发布。

### 需求强烈但仍需决策

1. **网关 RBAC / 多用户权限分级**  
   [#527](https://github.com/NousResearch/hermes-agent/issues/527)（16 👍）、[#3897](https://github.com/NousResearch/hermes-agent/issues/3897)（4 👍）、[#21574](https://github.com/NousResearch/hermes-agent/issues/21574)（2 👍）三个 Issue 指向同一需求：Owner/Admin/User/Guest 分级、按平台用户 ID 限制工具。均带 `needs-decision`，**短期难落地，但已是路线图必答题**。

2. **记忆容量与自动扩展**  
   [#5320](https://github.com/NousResearch/hermes-agent/issues/5320) 指出 `memory_char_limit=2200`、`user_char_limit=1375` 在长会话中很快触顶，建议提高默认值并暴露使用压力。实现成本低，**适合作为小版本改进**。

3. **后台上下文压缩 / 新会话交接**  
   [#99524](https://github.com/NousResearch/hermes-agent/issues/99524)、[#117886](https://github.com/NousResearch/hermes-agent/issues/117886)、[#20372](https://github.com/NousResearch/hermes-agent/issues/20372) 共同诉求：压缩不应阻塞当前 turn，高风险时应自动交接新会话。与 #156253 方向一致，可能被一并吸收。

4. **统一遥测与分析**  
   [#6642](https://github.com/NousResearch/hermes-agent/issues/6642) 要求延迟、token 成本、金额成本、完成/失败率。属于平台化能力，短期优先级低于稳定性。

5. **Profile 生命周期治理**  
   [#155595](https://github.com/NousResearch/hermes-agent/issues/155595) 是 11 月 14 日新开的 tracker，覆盖 profile 创建、网关归属/恢复、共享凭证、模型继承、Honcho 清理等，说明多 profile 已成为正式工作流，后续会有系列 PR。

---

## 7. 用户反馈摘要

### 真实痛点

- **安全与数据丢失是最高敏感点。** #141346 中 Agent 通过 `osascript` 操作用户正在使用的 PowerPoint，导致未保存文稿关闭、导出被删。用户对“smart 审批”的信任受到直接冲击，评论聚焦于跨应用自动化是否应默认拒绝。
- **更新失败不可恢复。** #125437 描述更新后 Desktop 启动即关闭、gateway venv 缺 `pydantic_core`、git 处于 partial-clone 状态，而产品只打印原始错误。用户需要的是**产品内一键修复**，而不是 Discord 里手敲配方。
- **Kanban/长任务状态不可信。** #119070、#145022、#29458 反复出现“卡片卡死”“worker 崩溃丢工作”“PR 关闭后守卫不释放”。用户已把 Kanban 用于真实多任务编排，状态机缺陷直接造成返工。
- **多用户场景权限不足。** #527、#3897、#21574 来自共享 Telegram Bot、家庭/团队使用、提示注入冒充等真实场景。当前二元授权让用户只能在“全开”与“全关”之间选择。
- **桌面端多 profile / 远程网关体验割裂。** #143150 会话恢复失败、#149979 媒体下载 404、#129993 回复重复渲染，均发生在多 profile 或远程 gateway 配置下，说明**单机单 profile 之外的路径测试覆盖不足**。
- **成本与等待时间。** #6642 询问是否有 token/金额/延迟遥测；#117886 抱怨压缩在 turn 内执行，用户被迫等待数分钟；#156253 的 1 小时缓存 PR 正是对这一痛点的直接回应。
- **生态接入摩擦。** #89412 指出 Google Gmail MCP 不主动挑战未认证请求，导致 OAuth 流程永不触发；用户希望 MCP 接入从“被动反应”转为“主动探测”。
- **macOS 系统集成细节。** #123118 的 LaunchAgent 显示为 `osascript`，用户在隐私设置中无法识别 Hermes，影响授权信任。

### 满意/正向信号

- 安全 Issue 关闭速度较快（#141346 从 10-19 创建到 11-15 关闭），说明维护者对高危反馈响应及时。
- 社区贡献活跃：插件目录 PR、TTS 修复、Google Workspace 加固、ACP 兼容等均来自外部贡献者，生态参与度健康。

---

## 8. 待处理积压

以下长期未闭环事项建议维护者重点分诊：

| 事项 | 创建时间 | 现状 | 建议 |
|---|---|---|---|
| [#527](https://github.com/NousResearch/hermes-agent/issues/527) 网关 RBAC | 2026-03-06 | 8 个月，21 评论，16 👍，`needs-decision` | 与 #3897、#21574 合并为统一设计文档，明确是否进入 v0.24 |
| [#3897](https://github.com/NousResearch/hermes-agent/issues/3897) 按用户限制工具 | 2026-03-30 | 7.5 个月，4 👍 | 作为 #527 的子场景归档 |
| [#5320](https://github.com/NousResearch/hermes-agent/issues/5320) 记忆上限默认值 | 2026-04-05 | 7 个月，3 👍 | 实现成本低，可先合入默认值调整 |
| [#6642](https://github.com/NousResearch/hermes-agent/issues/6642) 统一遥测 | 2026-04-09 | 7 个月 | 与成本优化 PR #156253 联动设计 |
| [#21574](https://github.com/NousResearch/hermes-agent/issues/21574) 每用户隔离与身份权限 | 2026-05-08 | 6 个月，`needs-decision` | 与 #527 一并决策 |
| [#29458](https://github.com/NousResearch/hermes-agent/issues/29458) Kanban `active_pr` 守卫无人工清除路径 | 2026-05-20 | 6 个月 | 与 #119070 同属 Kanban 状态机，建议合并修复 |
| [#36755](https://github.com/NousResearch/hermes-agent/issues/36755) systemd 时序误报 | 2026-06-01 | 5.5 个月，3 👍 | 低风险诊断修复，适合新贡献者 |
| [PR #122002](https://github.com/NousResearch/hermes-agent/pull/122002) TTS Ogg/Opus 修复 | 2026-09-24 | 开放近 2 个月，已有 salvage PR [#156321](https://github.com/NousResearch/hermes-agent/pull/156321) | 建议关闭旧 PR 并指向 salvage，减少重复 review |
| [PR #144738](https://github.com/NousResearch/hermes-agent/pull/144738) / [#144739](https://github.com/NousResearch/hermes-agent/pull/144739) nanoclaw 移植 | 2026-10-26 | 开放 3 周 | 安全类可优先 review |

**积压健康度判断：** 410 条待合并 PR 中，大量为 `salvage`、`port nanoclaw#`、插件目录类条目，属于可批量化处理的长尾。建议维护者按“安全 > P1 状态一致性 > 兼容性 > 插件目录”分层清理，避免高价值修复被目录类 PR 淹没。

---

**报告结论：** Hermes Agent 在 2026-11-16 保持高强度迭代，安全响应和生态扩张是亮点；主要风险在于**统一网关与 Kanban 的状态一致性缺陷**、**更新恢复路径缺失**，以及**RBAC 等长期决策型需求持续积压**。项目整体健康，但需关注 Review 带宽与 P1 可靠性问题的修复排期。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 · 2026-11-16

---

## 1. 今日速览

AstrBot 今日保持高强度开发节奏：过去24小时 Issues 更新 11 条、PR 更新 31 条，其中 19 条 PR 已合并/关闭，合并吞吐量处于高位。项目发布 `v4.30.0-alpha.1`，核心变化是将会话后端迁移至**事件溯源（Event Sourcing）**架构并引入新的 Agent 运行时模型，属于底层架构级演进。社区讨论集中在 Subagent 工具调用异常、OpenRouter 思考链丢失、插件市场性能等方向；同时多个长期 Issue（#7133、#7949）被关闭，说明维护者正在系统性地清理历史积压。整体来看，项目处于**“大版本架构升级 + 积压清理”**的活跃健康期，但 Alpha 版本带来的迁移风险需要关注。

---

## 2. 版本发布

### v4.30.0-alpha.1（2026-11-15）

> ⚠️ **Alpha 测试版**，可能存在不稳定或兼容性问题，建议先在测试环境验证；升级前请备份数据与配置；回退旧版需同时恢复升级前的备份；**请勿在生产环境使用**。

**主要更新内容：**

- **会话后端迁移至事件溯源**（#10077、#11158、#11162）：减少重复上下文写入与部分写放大，优化存储性能；增量保存消息与工具调用，完善执行中断后的历史处理逻辑。
- **引入新的 Agent 运行时模型**：插件可通过 `ctx.agent.run_tu...`（摘要截断，推测为 `run_turn` / `run_tool` 一类统一入口）接入新的运行时能力。

**破坏性 / 迁移注意事项：**

| 项目 | 说明 |
|------|------|
| 数据库结构 | 会话存储改为事件溯源，需数据库迁移 |
| Agent 配置 | 运行时模型变更，Agent 配置需迁移 |
| 会话设置 | 可能存在字段/语义变化，需检查兼容性 |
| 回退路径 | 必须恢复升级前备份，无法简单回滚 |

关联 PR：[#11140](https://github.com/AstrBotDevs/AstrBot/pull/11140)（版本号 bump 与发布说明）、[#11158](https://github.com/AstrBotDevs/AstrBot/pull/11158)（模型用量随消息持久化）、[#11162](https://github.com/AstrBotDevs/AstrBot/pull/11162)（工具调用先于执行持久化）。

---

## 3. 项目进展

今日合并/关闭的 PR 覆盖了发布准备、存储架构、Provider 扩展、平台兼容性与文档等方向，推进幅度较大：

**架构与核心稳定性**
- [#11158](https://github.com/AstrBotDevs/AstrBot/pull/11158) `refactor: persist model usage with assistant messages` — 消除独立的请求起止记录，减少重复上下文捕获，是事件溯源设计的关键落地。
- [#11162](https://github.com/AstrBotDevs/AstrBot/pull/11162) `fix: persist assistant tool calls before execution` — 修正对话日志中工具执行与 assistant 消息的顺序问题，提升中断恢复的可信度。
- [#11141](https://github.com/AstrBotDevs/AstrBot/pull/11141) `fix: append steering input as user messages` — 将运行中追问按批次作为 user 消息追加，修复工具输出中嵌入系统提示的语义混乱。
- [#10617](https://github.com/AstrBotDevs/AstrBot/pull/10617) `fix: preserve trace snapshot ordering across clock corrections` — 修复系统时钟回拨导致的 trace 摘要陈旧/完成事件丢失。
- [#11140](https://github.com/AstrBotDevs/AstrBot/pull/11140) 版本发布准备。

**Provider 与平台能力**
- [#11118](https://github.com/AstrBotDevs/AstrBot/pull/11118) `feat: add DeepSeek STT and TTS providers` — 官方 DeepSeek 语音识别/合成接入（同时关闭 Issue [#11119](https://github.com/AstrBotDevs/AstrBot/issues/11119)）。
- [#11143](https://github.com/AstrBotDevs/AstrBot/pull/11143) `fix: handle URL audio in Gemini history` — 修复历史消息中 HTTP(S) URL 音频导致 Gemini 反复请求失败。
- [#11156](https://github.com/AstrBotDevs/AstrBot/pull/11156) `test: fix Windows file URI handling` — 修复 Windows 环境下内置输出策略单测失败。

**UI / 体验 / 内容**
- [#11166](https://github.com/AstrBotDevs/AstrBot/pull/11166) `feat(chat): inline run details & preserve replies after refresh` — ChatUI 内联展示思考、工具调用与中间回复，刷新不再取消持久化任务。
- [#11160](https://github.com/AstrBotDevs/AstrBot/pull/11160) `feat: add official AstrBot character artwork` — 新增官方角色「星绪」立绘素材。
- [#11154](https://github.com/AstrBotDevs/AstrBot/pull/11154) `docs: streamline guides since v4.29.4` — 按任务重组文档，减少实现细节与重复开发史。

**整体评估**：今日合入内容以“底层正确性 + Publisher/平台兼容性”为主，叠加一次 Alpha 版本发布，项目在存储架构和 Agent 运行时方面向前推进了实质性一步；3.0 版本的迁移风险与 Alpha 反馈将是下一阶段的关键观察点。

---

## 4. 社区热点

**讨论最活跃（按评论数）：**

| 排名 | 条目 | 评论 | 状态 | 链接 |
|------|------|------|------|------|
| 1 | #7133 配置文件分散问题 — 建议参考 OpenClaw 集中管理 | 8 | CLOSED | [链接](https://github.com/AstrBotDevs/AstrBot/issues/7133) |
| 2 | #11151 [Bug] subagent 使用官方 DeepSeek-V4.1 出现 DSML 融毁 | 5 | OPEN | [链接](https://github.com/AstrBotDevs/AstrBot/issues/11151) |
| 3 | #11137 一个插件能否同时兼容 AstrBot 与 DeepSeek Harness | 3 | CLOSED | [链接](https://github.com/AstrBotDevs/AstrBot/issues/11137) |
| 4 | #7949 [Bug] 自定义规则禁用插件但 prompt 仍然注入 | 3 | CLOSED | [链接](https://github.com/AstrBotDevs/AstrBot/issues/7949) |

**分析：**

- **#7133（配置集中化）**：这是一条从 2026-03 持续到 11 月才关闭的长线讨论，核心诉求是 `~/.astrbot/`、`~/data/`、`~/.config/`、`~/.npm-global/` 多目录分散导致备份迁移困难。其关闭释放出明确信号——维护者已回应配置治理问题，但具体方案需结合后续版本观察。
- **#11151（Subagent DSML 融毁）**：用户将 subagent 用于插件开发，DeepSeek-V4.1 返回 DSML 工具调用而非标准 function call，导致 subagent 转接后工具调用失效。这暴露了**多模型工具调用协议归一化**的薄弱点，属于 Agent 运行时的高优先级问题。
- **#11137（双框架插件兼容）**：反映插件作者希望降低跨生态迁移成本，虽然已关闭，但“插件可移植性”是生态扩张的长期命题。
- **#7949（禁用规则未生效）**：关闭说明该问题已有结论或修复，但 prompt 注入与插件禁用策略的一致性仍需回归验证。

PR 侧今日评论数据在该样本中缺失（`undefined`），无法做评论热度排序；但从合并节奏看，Soulter 主导的会话/Agent 重构系列（#11158/#11162/#11166）是事实上的工作重心。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 高：#11151 Subagent + DeepSeek-V4.1 工具调用协议失配（DSML 融毁）
- 状态：**OPEN**，5 条评论，尚无明确 fix PR
- 影响：subagent 功能在特定模型下完全不可用，工具调用无法被正确解析
- 链接：https://github.com/AstrBotDevs/AstrBot/issues/11151
- 关联信号：今日合入的 [#11141](https://github.com/AstrBotDevs/AstrBot/pull/11141)、[#11162](https://github.com/AstrBotDevs/AstrBot/pull/11162) 涉及 Agent 输入与工具调用持久化，但未直接针对 DSML 解析，建议优先排查 provider 层的 tool-call 归一化路径。

### 🟠 中：#11163 OpenRouter 非流式模式丢失 `reasoning_details`
- 状态：**OPEN**，1 条评论，无 fix PR
- 影响：GLM-5.3-Flash 等模型在非流式模式下思维链完全丢失，`_extract_reasoning_content` 未处理 `reasoning_details` 数组
- 链接：https://github.com/AstrBotDevs/AstrBot/issues/11163
- 备注：用户已核对 main 分支与 v4.29.4 tag 逻辑一致，属于长期存在但近期才被定位的问题。

### 🟡 中低：#11165 面板「GitHub 加速地址」连通性测试与实际安装链路不一致
- 状态：**OPEN**，0 条评论
- 影响：代理测试结果与实际插件安装/更新结果可能相反，误导用户配置
- 根因定位：`stat_service.py::test_ghproxy_connection` 仅探测单个 raw 文件
- 链接：https://github.com/AstrBotDevs/AstrBot/issues/11165

### ✅ 已关闭：
- **#7949** 自定义规则禁用插件未生效（prompt 仍注入）— 已关闭，建议关注是否有对应回归测试
- **#11143** Gemini 历史 URL 音频反复失败 — 已通过 PR 修复
- **#10617** 时钟回拨导致 trace 快照错乱 — 已通过 PR 修复
- **#11156** Windows 文件 URI 单测失败 — 已修复（master CI 回归）

**稳定性判断**：今日无崩溃级报告，高优先级集中在**多模型工具调用兼容性**；Alpha 版本引入的存储/Agent 运行时迁移可能带来新的回归风险，建议关注 alpha 用户反馈。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 可能纳入下一版本？ | 判断依据 |
|------|-------|------------------|----------|
| 插件市场分页 / 增量拉取 / 缓存优先 / 后台静默更新 | [#11164](https://github.com/AstrBotDevs/AstrBot/issues/11164) | **较高** | 与本次 Alpha 的“减少写放大/优化存储性能”方向一致，属于性能优化主线；且给出明确的字段冗余数据（desc 25.4%、download_url 15.6% 等），可落地性强 |
| 中国移动新消息 Channel（短信能力） | [#11161](https://github.com/AstrBotDevs/AstrBot/issues/11161) | **待评估** | 属于新平台适配器请求，依赖平台侧 OpenClaw 插件（≥2026.3.22）；与 AstrBot 插件体系兼容性需确认 |
| MCP ServerList 徽章展示 | [#11150](https://github.com/AstrBotDevs/AstrBot/issues/11150) | **低（文档级）** | 仅需在 README 添加 badge，成本极低，但优先级取决于维护者意愿 |
| 双框架插件兼容（AstrBot + DeepSeek Harness） | [#11137](https://github.com/AstrBotDevs/AstrBot/issues/11137) | **已关闭** | 结论可能是“不支持/通过适配层解决”，短期不太可能作为核心特性 |
| DeepSeek STT/TTS Provider | [#11119](https://github.com/AstrBotDevs/AstrBot/issues/11119) | **已落地** | PR [#11118](https://github.com/AstrBotDevs/AstrBot/pull/11118) 已合并 |

**待观察的在途 PR 路线图信号：**
- [#10886](https://github.com/AstrBotDevs/AstrBot/pull/10886) Volcengine Embedding（知识库向量化扩展）
- [#11120](https://github.com/AstrBotDevs/AstrBot/pull/11120) 自定义请求头请求时模板（中转站/多租户场景）
- [#10267](https://github.com/AstrBotDevs/AstrBot/pull/10267) Requesty Provider（OpenAI 兼容网关）
- [#11157](https://github.com/AstrBotDevs/AstrBot/pull/11157) 平台发送接收回执（可观测性）
- [#10992](https://github.com/AstrBotDevs/AstrBot/pull/10992) 群聊 @机器人 上下文保留

---

## 7. 用户反馈摘要

从今日 Issues 评论与摘要中提炼：

**真实痛点：**
1. **配置与数据分散**（#7133）：用户需要跨 `~/.astrbot/`、`~/data/`、`~/.config/`、`~/.npm-global/` 四处备份迁移，运维成本高，明确点名参考 OpenClaw 的集中式布局。
2. **多模型工具调用碎片化**（#11151）：同一 subagent 在 DeepSeek-V4.1 下返回 DSML 而非标准 function call，用户已投入实际插件开发场景（“指引我家 BOT 使用 subagent 进行插件开发”），挫败感明显。
3. **思考链可见性不一致**（#11163）：非流式 + OpenRouter + GLM-5.3-Flash 组合下思维链完全丢失，用户已自行核对源码版本，属于深度用户的高质量反馈。
4. **配置测试与真实链路脱节**（#11165）：加速地址“测试不可用但实际能用/测试通过但安装失败”，让用户对面板可信度产生疑虑。
5. **插件市场首屏变慢**（#11164）：用户明确给出字段占比数据，属于经过量化的性能反馈，落地价值高。

**使用场景画像：**
- Podman/Docker 自部署 + QQ 官方机器人（WebSocket 适配器）
- Linux 为主，Windows 也有测试/使用
- 插件开发者与 subagent 深度用户并存
- 关注中文生态（DeepSeek、GLM、豆包/火山引擎、中国移动 Channel）

**满意/不满意信号：**
- 正面：DeepSeek STT/TTS 官方 Provider 被快速合并（#11118 → #11119 同日闭环），响应速度获认可；官方角色立绘（#11160）提升社区亲和力。
- 负面：Alpha 版本的迁移警告语气强烈，反映维护者对兼容性风险有清醒认知；长期 Issue（#7133、#7949）关闭虽好，但用户可能关心“关闭是否等于解决”。

---

## 8. 待处理积压

以下条目已挂起较长时间或缺乏明确推进信号，建议维护者关注：

| 条目 | 类型 | 起始时间 | 挂起天数 | 状态 | 链接 |
|------|------|----------|----------|------|------|
| #10267 Requesty chat completion provider | PR | 2026-09-28 | ~49 天 | OPEN | [链接](https://github.com/AstrBotDevs/AstrBot/pull/10267) |
| #10886 Volcengine embedding provider | PR | 2026-10-30 | ~17 天 | OPEN | [链接](https://github.com/AstrBotDevs/AstrBot/pull/10886) |
| #10971 Project 事件集成交付保持 | PR | 2026-11-03 | ~13 天 | OPEN | [链接](https://github.com/AstrBotDevs/AstrBot/pull/10971) |
| #10992 群聊 @机器人 上下文保留 | PR | 2026-11-04 | ~12 天 | OPEN | [链接](https://github.com/AstrBotDevs/AstrBot/pull/10992) |
| #11078 Gemini 内置工具 + 函数调用组合 | PR | 2026-11-11 | ~5 天 | OPEN | [链接](https://github.com/AstrBotDevs/AstrBot/pull/11078) |
| #11120 自定义请求头请求时模板 | PR | 2026-11-13 | ~3 天 | OPEN | [链接](https://github.com/AstrBotDevs/AstrBot/pull/11120) |
| #11155 Discord slash 命令去重 | PR | 2026-11-15 | 1 天 | OPEN | [链接](https://github.com/AstrBotDevs/AstrBot/pull/11155) |
| #11157 平台发送接收回执 | PR | 2026-11-15 | 1 天 | OPEN | [链接](https://github.com/AstrBotDevs/AstrBot/pull/11157) |
| #11159 输入消费持久化 + 重启恢复主会话 | PR | 2026-11-15 | 1 天 | OPEN | [链接](https://github.com/AstrBotDevs/AstrBot/pull/11159) |
| #11151 Subagent DSML 融毁 | Issue | 2026-11-15 | 1 天 | OPEN | [链接](https://github.com/AstrBotDevs/AstrBot/issues/11151) |
| #11163 OpenRouter reasoning_details 丢失 | Issue | 2026-11-15 | 1 天 | OPEN | [链接](https://github.com/AstrBotDevs/AstrBot/issues/11163) |
| #11164 插件市场加载优化 | Issue | 2026-11-15 | 1 天 | OPEN | [链接](https://github.com/AstrBotDevs/AstrBot/issues/11164) |
| #11165 加速地址连通性测试不一致 | Issue | 2026-11-15 | 1 天 | OPEN | [链接](https://github.com/AstrBotDevs/AstrBot/issues/11165) |

**重点提醒：**
- **#10267（Requesty Provider）** 已挂起约 7 周，属于社区贡献的 Provider 扩展，建议给出明确 review 结论或合并时间表，避免贡献者流失。
- **#10886（火山引擎 Embedding）** 与国内知识库生态强相关，挂起近 3 周，建议结合 4.30 迁移窗口评估。
- **#10971 / #10992** 均为 11 月初 PR，处于“有新评论/更新但未合并”状态，建议明确阻塞点。
- **#11151 / #11163** 是今日新增的高价值 Bug，建议在 Alpha 反馈周期内优先定性，避免与 4.30 架构变更混淆归因。

---

*日报生成时间：2026-11-16 · 数据来源：AstrBot GitHub 仓库公开数据 · 注：部分 PR 评论数在样本中缺失，相关热度判断以更新时间和合并状态为准。*

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目日报｜2026-11-16

**数据口径**：过去24小时 Discussions 更新141条；项目未启用 GitHub Issues/PR，代码合并经 Releases 落地；本期新版本发布0个，最新 Releases 为空。以下基于公开 Discussions 摘要，点赞数据均为0，互动主要由评论驱动。

---

## 1. 今日速览

- **社区活跃度高**：24小时 Discussions 更新141条；展示的15条高评论讨论合计196条评论，平均约13.1条/帖。
- **版本交付停滞**：本期0个新 Release，无 changelog 合并摘要；项目进展主要体现为社区对 0.2.x 候选版的缺陷复现与根因定位。
- **风险集中在 Windows 桌面端与最新 rc**：0.2.2-rc.3 出现首次启动 `fetch failed`、新建会话 `cx.agents.roots is not a function`，PTY/ACL 沙箱问题持续。
- **高热度诉求明确**：MIR 支付（68评论）、本地 LLM 超时（23评论）、插件开发导致会话丢失（17评论）。
- **健康度判断**：社区参与强、生态工具活跃；但发布节奏与桌面稳定性偏弱，Windows 稳定性问题跨多个 rc 仍未闭环。

---

## 2. 版本发布

本期**无新版本发布（0个）**，最新 Releases 为空。因此无版本号、更新内容、破坏性变更与迁移注意事项可报告。

讨论中出现的既有预览版本包括 **0.2.2-rc.3、0.2.0-rc.2、0.1.0-rc.8**，相关回归与缺陷见“Bug 与稳定性”小节。Releases 页面：  
https://github.com/deepseek-ai/deepseek-harness/releases

---

## 3. 项目进展

**PR 口径不适用**：项目未启用 Issues/PR，代码合并经 Releases 落地。本期 Releases 为0，因此没有可引用的“合并上线功能/修复问题”摘要；从代码交付维度看，本期产品向前推进有限。

在无新 Release 的情况下，可确认的进展主要是社区侧诊断与生态工具：

- 0.2.2-rc.3 新建会话失败初步定位到 `TypeError: cx.agents.roots is not a function`  
  https://github.com/deepseek-ai/deepseek-harness/discussions/13365
- Windows PTY 失败根因指向 GUI-subsystem Electron 作为 ACL sandbox runner host + ConPTY  
  https://github.com/deepseek-ai/deepseek-harness/discussions/8322
- Session log 损坏根因指向崩溃恢复与仍活跃 writer 竞态、重复 seq  
  https://github.com/deepseek-ai/deepseek-harness/discussions/10429
- subagent 空字符串路由字段被误判为显式选择  
  https://github.com/deepseek-ai/deepseek-harness/discussions/9662
- 社区发布插件兼容性检查工具 dsh-seam  
  https://github.com/deepseek-ai/deepseek-harness/discussions/13379
- MCP Lens 展示大 MCP 目录两接口方案  
  https://github.com/deepseek-ai/deepseek-harness/discussions/1579

**综合评估**：本期代码交付为0 Release，版本进展有限；但多个高严重度问题获得根因线索，为下一版修复积累输入。社区生态与诊断能力是正向信号。

---

## 4. 社区热点

- **#12755 MIR 支付（68评论）**：俄罗斯用户无法用本地卡充值 DeepSeek API，诉求是区域支付可及性，影响 API 采用与 Harness 使用。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/12755
- **#3157 本地 LLM 超时（23评论）**：Ollama/Gemma4 长提示触发5分钟超时，用户希望20分钟可配置，但 `settings.yaml` 尝试无效，反映配置入口与文档不清。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/3157
- **#12751 插件开发清空目录（17评论）**：用户让 AI 写插件后 dsh 与 zcode 目录被清、会话全丢，诉求是危险操作确认、沙箱隔离、备份恢复。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/12751
- **#6987 transport failed（14评论）**：升级4.1后连续出现 “DeepSeek Messages transport failed”，换模型无效，属升级回归/传输稳定性问题。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/6987
- **#13368 首次启动报错（13评论）**：0.2.2-rc.3 win-x64 首次启动 “fetch failed”，Win11 家庭版新装环境，影响新用户首启。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/13368
- **#8322 Windows PTY（13评论）**：`workspace-write` 沙箱下所有 shell 工具启动即失败，阻断 Windows 桌面端核心能力。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/8322
- **#9662 subagent 空字符串（9评论）**：空字符串 `provider/model/reasoning_effort` 被当显式选择并拒绝，报错不提供补救。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/9662
- **#10429 Session log 损坏（7评论）**：崩溃恢复与活跃 writer 竞态导致会话永久不可读，数据可靠性风险。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/10429
- **#12109 Auto preset 成本（6评论）**：每次工具调用发全上下文 review，占13天账单42%，诉求是权限预设成本透明与可控。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/12109
- **#12537 /proc 扫描（5评论）**：无 systemd 主机上每15ms全表扫描，host CPU 44-52%，Web UI 卡顿。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/12537

**分析**：热点从“功能愿望”转向“可用性与信任”——支付可及性、数据安全、Windows 稳定性、成本可控是四大主线。点赞均为0，说明社区更倾向用长评论和复现细节推动问题。

---

## 5. Bug 与稳定性

**fix 标注说明**：项目未启用 PR，以下问题均无法关联公开 fix PR；本期0 Release，无修复版本落地。按严重程度排列：

- **P0 数据丢失 #12751**：AI 写插件过程中 dsh 目录和 zcode 目录被清，所有会话丢失。fix：无公开 PR/无修复 Release。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/12751
- **P0 会话日志损坏 #10429**：0.1.0-rc.8 崩溃恢复与活跃 writer 竞态，重复 seq 使 Session 永久不可读。fix：无公开 PR/无修复 Release。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/10429
- **P1 最新 rc 回归 #13365**：0.2.2-rc.3 新建会话失败 `cx.agents.roots is not a function`，旧会话可开但输入框“会话不可用”。fix：无公开 PR/无修复 Release。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/13365
- **P1 首次启动失败 #13368**：0.2.2-rc.3 win-x64 首次启动 “fetch failed”，影响新装用户。fix：无公开 PR/无修复 Release。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/13368
- **P1 Windows PTY #8322**：`workspace-write` 下 pwsh/cmd 均报 “PTY shell exited during startup”，所有 shell 工具不可用。fix：无公开 PR/无修复 Release。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/8322
- **P1 Windows ACL 沙箱 #5477**：缓存私有临时目录被系统回收后，所有 `workspace-write` 命令失败直到重启。fix：无公开 PR/无修复 Release。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/5477
- **P1 传输失败 #6987**：升级4.1后 `DeepSeek Messages transport failed` 连续出现，换模型无效。fix：无公开 PR/无修复 Release。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/6987
- **P1 subagent 路由校验 #9662**：空字符串字段被误判显式选择并报 “provider must be non-empty”，无补救提示。fix：无公开 PR/无修复 Release。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/9662
- **P2 本地 LLM 超时 #3157**：长提示5分钟超时，20分钟配置未生效。fix：无公开 PR/无修复 Release。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/3157
- **P2 CPU 占用 #12537**：无 systemd 主机 `fallbackOwner.waitForExit` 每15ms扫描 `/proc`，host CPU 44-52%。fix：无公开 PR/无修复 Release。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/12537
- **P2 成本异常 #12109**：Auto 预设下每次工具调用全上下文 review，13天账单42%。fix：无公开 PR/无修复 Release。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/12109
- **P2 启动弹窗 #1027**：开局“暂时无法保存确认状态，请重试”，偶发无法使用。fix：无公开 PR/无修复 Release。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/1027

**稳定性判断**：0.2.2-rc.3 同时出现首启与新建会话回归，建议作为发布阻断项；Windows PTY/ACL 问题已跨多个版本，需集中清理。

---

## 6. 功能请求与路线图信号

项目无 PR，无法结合 PR 排期判断；以下按讨论热度、严重度与实现成本评估：

- **MIR 支付 #12755**：68评论，区域支付/商业化需求强，但涉及支付通道与合规，短期落地不确定性高。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/12755
- **本地 LLM 超时可配置 #3157**：设置项需求明确、实现成本相对低，较可能进入下一版配置改进。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/3157
- **插件权限与危险操作确认 #12751**：与数据丢失强相关，建议纳入沙箱/确认/备份路线图，优先级应高于普通功能。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/12751
- **插件 API 兼容检查 #13379**：dsh-seam 提供编译期兼容性检查与行号定位，官方可考虑纳入插件开发文档/推荐工具链。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/13379
- **MCP 大目录两接口 #1579**：MCP Lens 用 `mcp_search`/`mcp_call` 替代每轮全量 schema，可能影响 MCP 集成与 token 成本优化路线。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/1579
- **Auto 预设成本透明 #12109**：涉及权限预设行为与成本控制，可能纳入成本可见性/审批策略。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/12109
- **subagent 空字符串校验 #9662**：属修复类，下一版可优先改为空字符串等价未设置，并给出可操作错误。  
  https://github.com/deepseek-ai/deepseek-harness/discussions/9662

**判断**：下一版最可能先处理 0.2.2-rc.3 回归、Windows PTY/ACL、Session log、subagent 校验；MIR 支付需跨团队评估，短期难作为常规版本项。

---

## 7. 用户反馈摘要

来自 Discussions 评论的真实反馈：

- **使用场景**：Windows 11 新装首启；Ollama/Gemma4 本地长提示；插件开发；俄罗斯用户 API 充值；MCP 大目录；无 systemd Linux 主机；Auto 权限预设日常使用。
- **主要痛点**：桌面端稳定性（首启、新建会话、shell、ACL 沙箱、PTY）；升级回归（4.1 transport failed、rc.3 新建会话失败）；数据安全（AI 写插件清目录、会话日志损坏）；成本不可控（Auto 预设全上下文 review 占42%账单）；配置文档不足（超时 `settings.yaml` 无效）；支付可及性（MIR）。
- **满意点**：社区插件生态活跃，dsh-seam、MCP Lens 等工具作者主动提供兼容检查与 token 优化方案；用户愿意提交详细日志、根因与复现步骤。
- **不满意点**：错误信息不友好（如 subagent 空字符串报错无补救）、预览版回归影响关键工作区、长期 OPEN 的 Windows 问题跨多个 rc 仍未闭环。

---

## 8. 待处理积压

项目无 Issue/PR，以下以长期 OPEN 的 Discussions 为积压口径，提醒维护者关注：

- **#1027** 启动弹窗“暂时无法保存确认状态”｜2026-08-14｜5评论｜首启可用性  
  https://github.com/deepseek-ai/deepseek-harness/discussions/1027
- **#3157** 本地 LLM 5分钟超时｜2026-08-18｜23评论｜配置与文档  
  https://github.com/deepseek-ai/deepseek-harness/discussions/3157
- **#5477** Windows ACL 沙箱缓存目录回收后永久失效｜2026-09-03｜5评论｜所有 workspace-write 命令阻断  
  https://github.com/deepseek-ai/deepseek-harness/discussions/5477
- **#6987** 升级4.1后 transport failed｜2026-09-17｜14评论｜传输稳定性/升级回归  
  https://github.com/deepseek-ai/deepseek-harness/discussions/6987
- **#8322** Windows PTY shell 启动失败｜2026-09-29｜13评论｜shell 工具全阻断  
  https://github.com/deepseek-ai/deepseek-harness/discussions/8322
- **#9662** subagent 空字符串路由报错｜2026-10-14｜9评论｜校验与错误提示  
  https://github.com/deepseek-ai/deepseek-harness/discussions/9662
- **#10429** Session log 损坏｜2026-10-20｜7评论｜数据可靠性  
  https://github.com/deepseek-ai/deepseek-harness/discussions/10429
- **#12109** Auto preset 成本异常｜2026-11-04｜6评论｜成本透明  
  https://github.com/deepseek-ai/deepseek-harness/discussions/12109
- **#12537** 无 systemd 主机 CPU 44-52%｜2026-11-07｜5评论｜性能  
  https://github.com/deepseek-ai/deepseek-harness/discussions/12537
- **#12755** MIR 支付｜2026-11-09｜68评论｜支付可及性  
  https://github.com/deepseek-ai/deepseek-harness/discussions/12755
- **#12751** 插件开发清空目录/会话丢失｜2026-11-09｜17评论｜数据安全  
  https://github.com/deepseek-ai/deepseek-harness/discussions/12751

**积压提醒**：Windows 桌面端稳定性问题从8月延续至11月，跨越 0.1.0-rc.8、0.2.0-rc.2、0.2.2-rc.3 多个版本仍为 OPEN。建议维护者将其作为发布阻断项集中清理，并在 Release 说明中明确修复版本号与迁移/回退指引。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*