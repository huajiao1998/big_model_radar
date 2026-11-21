# OpenClaw 生态日报 2026-11-21

> Issues: 336 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-21 02:54 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报｜2026-11-21

> 数据窗口：过去 24 小时。Issues 更新 336 条（新开/活跃 246、已关闭 90）；PR 更新 500 条（待合并 313、已合并/关闭 187）；新版本发布 0 个。

## 1. 今日速览

过去 24 小时 OpenClaw 保持高强度维护节奏：336 条 Issue 更新中约 26.8% 已关闭，500 条 PR 更新中约 37.4% 已合并/关闭，但仍有 313 条 PR 待处理，评审与合并压力较大。今日无新版本发布，项目处于“稳定化与修复密集期”，而非大版本功能扩张期。稳定性信号偏紧，P0/P1 主要集中在 Gateway 事件循环阻塞、更新/Doctor 卡死、WAL 发布校验和 macOS 服务管理。整体活跃度很高，但更新可靠性与长期高优先级积压是当前健康度的主要风险。

## 2. 版本发布

今日无新版本发布，无破坏性变更或迁移事项可报告。

## 3. 项目进展

从可见 PR 样本看，今日关闭的重要 PR 包括：

- [#202824](https://github.com/openclaw/openclaw/pull/202824) **P0｜onboarding 在 npx 场景下下一步命令不可执行**：关闭该 PR，目标是让通过 `npx openclaw@…` 试用后的 onboarding 下一步命令可运行，关联 #192331、#202183、#201182。
- [#200376](https://github.com/openclaw/openclaw/pull/200376) **安全边界｜Cloudflare Access JWT 校验**：为 trusted-proxy auth 增加可选的 Cloudflare Access JWT 验证，关闭 #200361，属于 Gateway 安全接入的重要推进。

开放队列中，资源隔离与稳定性仍是主线：

- [#202874](https://github.com/openclaw/openclaw/pull/202874)：workspace 清理期间保持 session 写入响应。
- [#202815](https://github.com/openclaw/openclaw/pull/202815)：阻止递归 Git shim 耗尽 agent sandbox。
- [#202878](https://github.com/openclaw/openclaw/pull/202878)：修复 headed Chrome 下截图卡住问题。
- [#202868](https://github.com/openclaw/openclaw/pull/202868)：修复 Telegram 附件发送丢失所选 agent。
- [#202883](https://github.com/openclaw/openclaw/pull/202883)：降低流式输出突发时 session sidebar 的主线程开销。

整体看，今日推进以维护型修复、重构和资源隔离为主，未见大规模功能合并；项目向前迈进的幅度中等，主要价值在降低 Gateway/sandbox/更新链路的稳定性风险。

## 4. 社区热点

今日讨论最活跃的 Issue 以故障排查为主，反应数整体较低，说明社区注意力集中在“可用性与升级可靠性”，而非投票型功能需求。PR 评论数在数据中未提供，以下按影响面补充。

- [#160959](https://github.com/openclaw/openclaw/issues/160959)｜84 评论｜P0：抓取大型外部插件时 Gateway 事件循环阻塞数分钟，2026.9.6 回归。背后诉求是插件加载不能阻塞核心网关。
- [#191944](https://github.com/openclaw/openclaw/issues/191944)｜38 评论｜P2：macOS 上 `gateway stop` 与 `--force` 均因进程祖先无法完整检查而失败。反映 macOS 服务管理路径仍脆弱。
- [#197083](https://github.com/openclaw/openclaw/issues/197083)｜31 评论｜P0：升级到 11.3 后 Doctor WAL 发布校验失败，更新部分最终化。用户核心诉求是“升级失败可回滚、状态可解释”。
- [#178359](https://github.com/openclaw/openclaw/issues/178359)｜31 评论｜P1：`doctor --fix --non-interactive` 无输出挂起 15 分钟以上。诊断工具本身不可诊断，放大了升级焦虑。
- [#182891](https://github.com/openclaw/openclaw/issues/182891)｜20 评论｜P2：prompt cache 从未复用，`cache read dropped N -> 0`。涉及成本与会话一致性，属于高价值的性能/费用问题。
- 安全与沙箱热点：[#200376](https://github.com/openclaw/openclaw/pull/200376)（Cloudflare Access JWT）、[#202881](https://github.com/openclaw/openclaw/pull/202881)（Android Gradle 构建产物撑爆 workspace 结果）。

## 5. Bug 与稳定性

按严重程度整理如下。P0 项均未见新的 fix PR 标签，是当前最大稳定性风险。

| 级别 | 问题 | 状态与 fix PR |
|---|---|---|
| P0 | [#160959](https://github.com/openclaw/openclaw/issues/160959) 大型外部插件导致 Gateway 阻塞数分钟，2026.9.6 回归 | `no-new-fix-pr`，需维护者评审 |
| P0 | [#197083](https://github.com/openclaw/openclaw/issues/197083) 11.3 升级后 WAL 发布校验失败，更新部分最终化 | `no-new-fix-pr` |
| P0 | [#158277](https://github.com/openclaw/openclaw/issues/158277) Apple Watch 上 Talk on Watch 因远端网络地址变化失败 | `no-new-fix-pr`，release blocker 标签 |
| P1 | [#178359](https://github.com/openclaw/openclaw/issues/178359) `doctor --fix` 无输出挂起 15+ 分钟，未到达 DB 修复 | `no-new-fix-pr` |
| P1 | [#200606](https://github.com/openclaw/openclaw/issues/200606) 2026.11.5 candidate Doctor 因插件迁移冲突阻止更新，`changed=[]` | main 不复现，`no-new-fix-pr` |
| P1 | [#198218](https://github.com/openclaw/openclaw/issues/198218) Gateway 停止时 Doctor/update 维护活锁，反复哈希未变状态库 | 需 live repro，未见 fix |
| P1 | [#174681](https://github.com/openclaw/openclaw/issues/174681) 插件准备阻塞 Gateway 主线程数分钟，属回归 | 未见 fix PR |
| P1 | [#197515](https://github.com/openclaw/openclaw/issues/197515) Codex “settings upgrade unfinished” 在 11.3 持续，已合并修复未进入发布 | main 不复现，未见新 fix |
| P1 | [#192524](https://github.com/openclaw/openclaw/issues/192524) 定时 agentTurn 经 `auth: aws-sdk` 的 Bedrock 提供商被拒绝 | 有 linked PR open |
| P1 | [#153899](https://github.com/openclaw/openclaw/issues/153899) Gateway drain 等满 `TimeoutStopSec`，周期任务持续访问已关闭资源 | stale，`no-new-fix-pr` |
| P2 | [#198373](https://github.com/openclaw/openclaw/issues/198373) 轮次间历史被重写，OpenAI 兼容路由 cache read 跌至约 1% | 回归，`no-new-fix-pr` |
| P2 | [#201251](https://github.com/openclaw/openclaw/issues/201251) 更新 baseline 遍历全部文件、DB 复制 5 次，窗口耗时 5409 秒 | `queueable-fix`，可排队修复 |
| P2 | [#200756](https://github.com/openclaw/openclaw/issues/200756) Windows beta 更新在 package-swap 失败，baseline 扫描/回滚树变化 | `no-new-fix-pr` |
| P2 | [#200781](https://github.com/openclaw/openclaw/issues/200781) Control UI Sessions 侧栏只渲染 agent 头，无会话行 | 未见 fix |
| P1 | [#202246](https://github.com/openclaw/openclaw/issues/202246) 2026.11.6 Discord 重复提醒消息 | 已关闭 |

## 6. 功能请求与路线图信号

- **非 owner 自助调度/提醒**：[#187264](https://github.com/openclaw/openclaw/issues/187264) 讨论让非 owner 渠道用户在同一会话内做受控调度；对应 PR [#202880](https://github.com/openclaw/openclaw/pull/202880) 已让 WhatsApp 联系人管理自己的文本提醒。信号最强，较可能进入后续版本。
- **多用户密钥隔离**：[#197297](https://github.com/openclaw/openclaw/issues/197297) 提出 per-user secret vault，让每个用户用自己的 token 执行命令。安全价值高，但暂无实现 PR，短期落地概率较低。
- **Cron 生命周期治理**：[#130247](https://github.com/openclaw/openclaw/issues/130247) 缺少 `--until` / `--max-runs` 和累计运行计数。需求明确但需产品决策，短期不一定进入下一版本。
- **IMAP 可靠处理**：[#179685](https://github.com/openclaw/openclaw/issues/179685) 提出持久化处理交接和可检查的单消息结果，属于可靠性增强，需产品决策。
- **渠道消息形态**：[#170261](https://github.com/openclaw/openclaw/issues/170261) 希望 Matrix 在 progress/partial 流式模式下把最终回复作为新消息；[#131457](https://github.com/openclaw/openclaw/issues/131457) Feishu progress streaming 已被关闭，说明渠道流式能力仍在收敛。
- **Owner 恢复与安全**：[#198576](https://github.com/openclaw/openclaw/pull/198576) 在 claw 所在机器上重置 owner 权限，已有开放 PR，属于安全/恢复能力的重要信号。
- **语音通话降噪**：[#183266](https://github.com/openclaw/openclaw/pull/183266) 为 Voice Call 增加 Telnyx 可选降噪，PR 已 stale，优先级偏低。

## 7. 用户反馈摘要

从 Issue 文本看，用户痛点高度集中在“升级与诊断可信度”：

- **升级/Doctor 可靠性是最大不满来源**：WAL 校验失败、迁移冲突、Windows package-swap、MAX_PATH 残留、baseline 捕获 5409 秒等，均指向 managed update 的失败恢复和可解释性不足。
- **Gateway 启动与主线程性能敏感**：大型插件捕获、插件元数据全树扫描、session 写入与 workspace 清理互相影响，用户感知为启动慢、卡顿甚至不可用。
- **多用户/共享 Gateway 权限边界需求上升**：per-user vault、非 owner 调度、owner 恢复等议题显示共享部署场景正在增多。
- **客户端与渠道体验仍有摩擦**：macOS `gateway stop`、Control UI 会话侧栏为空、Linux 桌面窗口按钮重叠、iOS 文本大小设置不生效、iMessage 编辑动作缺失、Discord 重复提醒、Telegram 附件 agent 丢失等。
- **成本与缓存问题值得关注**：prompt cache 未复用、轮次间历史重写导致 cache read 跌至约 1%，会直接放大模型费用并影响长会话体验。
- 正向信号是部分旧问题被关闭/清理，非 owner 自助提醒等需求已有 PR 承接；但核心更新链路的高热度问题仍未收敛。

## 8. 待处理积压

以下为长期未收敛或需维护者明确决策的高价值条目：

| 条目 | 创建/状态 | 关注原因 |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) P0 | 2026-09-29，84 评论，今日仍更新 | 长期 P0，Gateway 阻塞回归，建议指定 owner 和修复窗口 |
| [#197083](https://github.com/openclaw/openclaw/issues/197083) P0 | 2026-11-11，31 评论 | 更新 WAL 部分最终化，直接影响升级信任 |
| [#158277](https://github.com/openclaw/openclaw/issues/158277) P0 | 2026-09-25 | Apple Watch release blocker，长期无 fix PR |
| [#174681](https://github.com/openclaw/openclaw/issues/174681) P1 | 2026-10-16 | 插件准备回归阻塞主线程，需确认回滚/替代方案 |
| [#153899](https://github.com/openclaw/openclaw/issues/153899) P1 | 2026-09-20，stale | Gateway drain 等满超时，影响重启体验 |
| [#198218](https://github.com/openclaw/openclaw/issues/198218) P1 | 2026-11-13，需 live repro | 维护活锁，建议补最小复现 |
| [#130247](https://github.com/openclaw/openclaw/issues/130247) P3 | 2026-08-26，需产品决策 | Cron 无结束条件，长期功能缺口 |
| [#138528](https://github.com/openclaw/openclaw/issues/138528) P2 | 2026-09-04 | stuck-session 恢复丢失 blocked_tool_call 分类 |
| [#178373](https://github.com/openclaw/openclaw/issues/178373) P2 | 2026-10-20，需产品决策/live repro | Agent 无 run 级 turn/token 预算，历史每轮重计费 |
| [#183266](https://github.com/openclaw/openclaw/pull/183266) PR | 2026-10-25，stale | Voice Call 降噪 PR 停滞，需决定是否继续推进 |

**维护建议**：优先处理 P0 更新/ Gateway 阻塞问题，明确 #160959、#197083、#158277 的 owner；同时对 `doctor/update` 链路做一次系统性回归收敛，避免零散修复继续拉高 Issue 热度。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告  
**数据窗口：2026-11-21（过去 24 小时）**  
**口径说明**：Issues/PR 为“更新数”而非唯一新增；部分项目 PR 评论数缺失；DeepSeek Harness 未启用 Issues/PR，以 Discussions 为主要信号。  

---

## 1. 生态全景

个人 AI 助手与自主智能体开源生态仍处于高活跃扩张期，但竞争焦点已从“功能堆叠”转向**可靠性、安全边界、成本可控与可观测性**。头部项目如 OpenClaw、hermes-agent 单日 Issue/PR 更新达到数百条，已呈现平台化、操作系统化特征；中型项目如 QwenPaw、AstrBot、Zeroclaw 在本地模型、多通道、身份安全等方向快速迭代。与此同时，PicoClaw 出现治理真空与社区 Fork 信号，说明生态并非普遍健康，维护带宽和治理能力正在成为项目分水岭。共性痛点集中在：升级/诊断可信度、静默失败、凭据隔离、缓存与 token 成本、Windows/macOS 跨平台稳定性。整体判断：**生态热度高，但成熟度分化明显；“能跑”已不是门槛，“可恢复、可解释、可治理”才是下一阶段门槛。**

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新（活跃/关闭） | PR 更新（待合并/已合关） | Release | 今日健康度评估 |
|---|---:|---:|---:|---|
| **OpenClaw** | 336（246/90） | 500（313/187） | 0 | 高强度维护，稳定化/修复密集；合并吞吐较好，但 P0 更新与 Gateway 阻塞积压，评审压力大 |
| **Zeroclaw** | 12（12/0） | 47（46/1） | 0 | 提交侧高负荷、合并侧低吞吐；OIDC/安全与记忆重构推进，PR 堆叠链风险高 |
| **PicoClaw** | 3（2/1） | 7（0 合并，7 关闭） | 0 | 预警：今日 0 合并、0 发版，依赖升级未落地；社区 Fork 分流，治理真空 |
| **QwenPaw** | 15（11/4） | 46（29/17） | 0 | 高活跃、响应快；稳定性修复明确，但 29 条待合并与 3 个无 PR 严重 Bug 是瓶颈 |
| **hermes-agent** | 314（293/21） | 500（399/101） | 1 canary | 高频迭代 + 稳定性债务集中；PR 待合并 399 条，网关/会话/Windows 问题密集 |
| **AstrBot** | 9（8/1） | 28（26/2） | 0 | 修复响应优秀，4/5 Bug 当日有 fix PR；但评审吞吐 B-，多条 PR 滞留 3 周以上 |
| **DeepSeek Harness** | 未启用 Issues | 未启用 PR | 0 | Discussions 更新 160 条，讨论热度高；发布门控导致代码进展不可观测，响应闭环信号弱 |

**关键对比**：  
- OpenClaw 与 hermes-agent 同属“单日 500 PR 更新”量级，但 OpenClaw 今日已合关 187 条，hermes 为 101 条；OpenClaw Issue 关闭率约 26.8%，hermes 约 6.7%，OpenClaw 当日收敛效率更高。  
- 中型项目中，QwenPaw（46 PR）与 Zeroclaw（47 PR）提交活跃度接近，但 QwenPaw 合关 17 条、Zeroclaw 仅 1 条，吞吐差异显著。  
- PicoClaw 是唯一出现“0 合并 + Fork 分流”明确治理风险的项目。  
- DeepSeek Harness 不适合用 Issue/PR 吞吐衡量，其风险在“不可观测 + 长尾问题未闭环”。

---

## 3. OpenClaw 在生态中的定位

**优势：平台化深度与维护吞吐处于头部。**  
OpenClaw 今日 336 Issue 更新、500 PR 更新、187 PR 合关、90 Issue 关闭，在本样本中与 hermes-agent 同处第一梯队，但合关吞吐优于 hermes。其能力覆盖 Gateway、插件沙箱、Doctor/update、trusted-proxy auth、多渠道、macOS 服务管理等，已接近“个人 AI 助手操作系统”而非单一 Bot 框架。

**技术路线差异：Gateway 中心 + 运维/安全边界优先。**  
相较 hermes-agent 的桌面 + 统一 Gateway + Kanban 自动化，OpenClaw 更强调 Gateway 事件循环、插件加载隔离、更新/诊断链路和 trusted-proxy 安全接入；相较 Zeroclaw 的 OIDC/身份栈与 WASM 沙箱，OpenClaw 更偏通用运行时与多渠道集成；相较 AstrBot 的聊天机器人框架定位，OpenClaw 更偏自托管平台与长期运行服务。

**社区规模对比：显著大于中型项目，但健康度受 P0 积压拖累。**  
OpenClaw 单日 PR 更新量约为 QwenPaw 的 10.9 倍、AstrBot 的 17.9 倍、Zeroclaw 的 10.6 倍；Issue 更新量约为 QwenPaw 的 22 倍。规模优势明显，但 #160959（Gateway 阻塞，84 评论）、#197083（WAL 校验失败）等 P0 长期未收敛，说明“规模大”同时放大了更新可靠性与评审带宽风险。其当前定位是：**生态中功能最全、运维面最广的核心参照项目，但正处于稳定化与修复密集期，而非功能扩张期。**

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求与证据 |
|---|---|---|
| **失败恢复与故障隔离** | OpenClaw、Zeroclaw、QwenPaw、hermes-agent、AstrBot、DeepSeek Harness | OpenClaw 更新 WAL/Doctor 卡死；Zeroclaw #8794 中断即失忆、#12597 单条坏消息毒化 Telegram 游标；QwenPaw #8757 微信通道静默死亡；hermes #125437 更新失败半安装；AstrBot #11287 Docker SIGTERM 导致 DB 损坏；DeepSeek #8581 死循环、#7212 compaction 不收敛。共同诉求：checkpoint、按篇/按条重试、进程清理、静默失败探测。 |
| **安全边界与凭据隔离** | OpenClaw、Zeroclaw、AstrBot、QwenPaw、DeepSeek Harness | OpenClaw Cloudflare Access JWT、per-user secret vault；Zeroclaw OIDC 五连 PR、#12422 操作员托管凭据、RUSTSEC-2026-0587；AstrBot #11197 插件 token 进入反代日志、TOTP 信任失效；QwenPaw 密码组件循环刷新、环境变量文档导致破坏性建议；DeepSeek #13528 破坏性命令无门禁。 |
| **缓存、token 计费与上下文成本** | OpenClaw、AstrBot、hermes-agent、Zeroclaw、DeepSeek Harness | OpenClaw prompt cache 未复用、cache read 跌至约 1%；AstrBot #11276 实测缓存命中率约 19%，#11284 自动缓存开关，#11297/#11298 校准 token；hermes #72200 skills catalog 压缩以降 token；Zeroclaw 移除低命中 response cache；DeepSeek compaction 频繁触发造成时间与 token 浪费。 |
| **多通道 / 多用户 / 多 profile 可靠性** | OpenClaw、Zeroclaw、QwenPaw、hermes-agent、AstrBot、PicoClaw | OpenClaw 非 owner 自助调度、Telegram 附件丢 agent；Zeroclaw Telegram/WhatsApp 群聊引用；QwenPaw 微信入站、Windows 通知；hermes 多 profile 性能、Telegram 连接超时；AstrBot KOOK 语音不可解析；PicoClaw Web UI 与 Console 能力不对等。 |
| **本地推理与跨平台进程治理** | QwenPaw、DeepSeek Harness、hermes-agent、OpenClaw、PicoClaw | QwenPaw Windows llama-server 残留 4 进程、本地模型插件化；DeepSeek 本地 LLM 300s 超时不可配、Windows 沙箱 Low 标签；hermes Windows 文件元数据风暴、macOS GIL 饥饿；OpenClaw macOS gateway stop 失败；PicoClaw 自定义 api_base/空 provider 场景。 |
| **可观测性与文档一致性** | QwenPaw、AstrBot、DeepSeek Harness、PicoClaw、OpenClaw | QwenPaw “健康检查绿灯 + 实际失效”；AstrBot 文档承诺 30 天免 TOTP 与实现不符；DeepSeek 配置改了不生效；PicoClaw 自动 Fix 静默改写配置；OpenClaw Doctor 本身挂起不可诊断。 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 通用个人 AI 助手平台、Gateway、插件沙箱、更新/诊断、多渠道、安全接入 | 自托管重度用户、团队、平台运维者 | Gateway 中心架构；插件/沙箱隔离；Doctor/update 运维链路；trusted-proxy/Cloudflare JWT；强调长期运行稳定性 |
| **Zeroclaw** | 身份认证、权限边界、记忆子系统重构、WASM/WASI 安全 | 安全敏感用户、企业身份集成场景 | OIDC/ADR 堆叠链、daemon refresh grant、wasmtime-wasi 依赖治理；PR 堆叠与串行依赖明显 |
| **PicoClaw** | 轻量 Web/Console + provider 配置 | 爱好者、小规模自建网关用户 | Go + Web UI/Gateway；当前维护停滞，社区 Fork 已出现 |
| **QwenPaw** | 本地模型管理、Console、记忆/标签、通道、技能回滚 | 企业自托管、本地推理用户 | 本地模型插件化 Provider；Console/前端质量治理；反代 base-path 部署；Windows 进程生命周期修复 |
| **hermes-agent** | 桌面端、统一 Gateway、Kanban 自动化、多 profile、MCP | 高阶自动化用户、桌面重度用户 | 单 Gateway 进程 + Desktop + Kanban + 插件/MCP；平台稳定性债务集中在 Windows/macOS 与 session state |
| **AstrBot** | 多平台聊天机器人框架、插件生态、WebUI、适配器 | 社区 Bot 运营者、中文平台用户、Docker 小规格部署 | Python + WebUI + 插件系统 + 平台适配器；修复响应快，但评审带宽与 PR 积压是瓶颈 |
| **DeepSeek Harness** | 官方 Agent Harness、桌面端、编码长任务、compaction、工具调用 | DeepSeek 用户、开发者、本地/自托管 LLM 用户 | 发布门控 + Discussions 社区；无 Issues/PR 可见性；compaction 与破坏性 tool call 门禁是核心风险 |

---

## 6. 社区热度与成熟度分层

**第一层：超大规模高频迭代，成熟但稳定性债务集中**  
- **OpenClaw、hermes-agent**：单日 300+ Issue、500 PR 更新，已进入平台化阶段。OpenClaw 更偏稳定化修复与运维链路，hermes 更偏桌面/统一 Gateway 迁移后的稳定性收尾。二者均面临 P0/P1 长尾与评审带宽压力。

**第二层：中大型快速迭代，修复响应快但吞吐受限**  
- **QwenPaw、AstrBot、Zeroclaw**：QwenPaw 与 AstrBot 在 24 小时内形成多条 Issue→fix PR 闭环，处于“质量与体验修复期”；Zeroclaw 提交侧活跃但合并率仅约 2.1%，OIDC 五连 PR 与 XL PR 堆叠导致串行阻塞。  
- 这一层是生态创新最活跃的区间：本地模型插件化、缓存架构、身份安全、多通道适配均在此密集推进。

**第三层：发布门控 / 质量巩固，但响应闭环不足**  
- **DeepSeek Harness**：Discussions 160 条更新，讨论深度高，但无 Issue/PR 可见性、今日无 Release，社区只能通过长贴自行排查。处于“高质量问题资产 + 弱官方闭环信号”状态。

**第四层：治理预警**  
- **PicoClaw**：今日 0 合并、0 发版，4 条依赖升级未落地，3 条 8 个月前的聚合 PR 被关闭；#3417 已出现活跃 Fork 并持续 46 天。核心风险不是 Bug，而是维护真空。

---

## 7. 值得关注的趋势信号

1. **“可恢复性”正在成为 Agent 产品的基线能力。**  
   多项目同时出现“中断即失忆”“失败静默”“单条坏消息毒化通道”“更新失败半安装”等问题。开发者应优先设计 checkpoint、幂等重试、故障隔离和可解释回滚，而不是只做功能覆盖。

2. **安全边界从“认证”扩展到“工具执行与凭据生命周期”。**  
   OpenClaw 的 Cloudflare JWT/per-user vault、Zeroclaw 的 OIDC/凭据隔离、AstrBot 的 token 日志泄漏、DeepSeek 的破坏性命令门禁，共同说明：Agent 安全的核心正在转向**凭据不暴露给模型、破坏性 tool call 需确认、日志需脱敏、权限需按用户隔离**。

3. **缓存友好与 token 计费准确性成为成本工程核心。**  
   OpenClaw 的 prompt cache 未复用、AstrBot 实测缓存命中率约 19%、hermes 压缩 skills catalog、Zeroclaw 移除低命中 response cache，说明“上下文分层 + 缓存前缀稳定 + 用量归因”将直接影响产品毛利与长会话体验。

4. **本地/自托管推理把“进程与资源治理”推到前台。**  
   QwenPaw 的 llama-server 残留进程、DeepSeek 的本地 LLM 超时不可配、hermes 的 Windows/macOS 多 profile 性能问题，表明本地优先路线不能只做模型接入，还必须处理进程组、端口、文件锁、跨平台服务管理。

5. **多用户/多 profile/多通道正在倒逼统一网关与会话权威。**  
   OpenClaw 的非 owner 调度、hermes 的统一 Gateway cutover、QwenPaw 的反代 base-path、AstrBot 的会话隔离文档，均指向同一趋势：个人助手正在进入共享部署与团队使用场景，**session authority、权限边界、部署形态多样化**会成为架构分水岭。

6. **健康检查必须覆盖“数据面”而非仅“进程面”。**  
   QwenPaw 微信通道“进程存活、健康检查正常、日志零错误但入站死亡”，记忆标签“写入成功但读取 503”；AstrBot 的 DB WAL 残留；OpenClaw 的 Doctor/update 活锁。下一代可观测性需要检测数据可读性、入站流活性、队列游标推进和压缩收敛。

7. **开源治理与评审带宽成为项目健康度的硬约束。**  
   hermes 399 条待合并、QwenPaw 29 条待合并、Zeroclaw 46 条待合并、PicoClaw Fork 分流、Zeroclaw XL PR 占 45%，说明“提交热度”不等于“项目前进”。对开发者而言，拆分 XL PR、明确 stacked 依赖、减少 stale bot 误关、在 release changelog 中列出“已修复/未修复”映射，将直接影响社区信任与贡献留存。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 · 2026-11-21

> **数据口径**：统计窗口为过去 24 小时（截至 2026-11-21）。Issues 12 条、PR 更新 47 条、新版本 0 个。
> **两点数据缺口需说明**：① 47 条 PR 中仅 1 条为已合并/关闭，但未出现在下方 Top20 列表（列表内 20 条全部为 OPEN），故无法具名复盘；② PR 的评论数字段返回 `undefined`，PR 侧讨论热度无法量化，社区热点以 Issues 评论数为准。

---

## 1. 今日速览

2026-11-21，Zeroclaw 维持高强度开发节奏，但**投入与产出明显背离**：12 条 Issue 全部为新开或活跃、**关闭 0 条**；47 条 PR 更新中仅 **1 条合并/关闭**，待合并队列高达 **46 条**，当日合并率约 2.1%。

当日真正的"净推进"集中在两条主线：**安全与身份认证**（OIDC / ADR-016/017 堆叠链共 5 条 PR，加上 wasmtime-wasi 的 RUSTSEC-2026-0587 高危依赖修复）与**记忆子系统重构**（移除 response cache，含破坏性变更）。

稳定性侧出现 2 个 S1：长期未决的 #8794（Web 面板中断丢失上下文，已挂起 137 天）与当日新增的 #12597（Telegram 语音转写失败导致通道完全阻塞）。12 条 Issue 中仅 2 条已有对应 fix PR，修复覆盖率 17%。

整体评估：**活跃度 A（高），吞吐健康度 C（偏紧）**。开发意愿充足，瓶颈在审查带宽与堆叠 PR 的串行依赖，WIP 持续膨胀，存在 PR 腐化风险。

---

## 2. 版本发布

过去 24 小时无新版本发布，本期省略详细说明。

---

## 3. 项目进展

### 3.1 合并/关闭情况

- **已合并/关闭 PR：1 条**（未出现在 Top20 列表中，无法识别具体内容）。
- **已关闭 Issue：0 条**。
- 结论：当日**没有可确认的功能落地**，项目处于"提交侧高负荷、合并侧低吞吐"的状态。

### 3.2 接近落地的关键变更（按主题，均为 OPEN）

| 主题 | PR | 推进内容 | 阻塞点 |
|---|---|---|---|
| **安全依赖** | [#12610](https://github.com/zeroclaw-labs/zeroclaw/pull/12610) | wasmtime-wasi 升至 48.0.10，修复 RUSTSEC-2026-0587（高危，CVSS 7.5，Windows 上经盘符前缀路径的 WASI 文件系统沙箱逃逸） | 无外部依赖，`cargo audit` 已使 CI 失败，属**最该优先合并**的一条 |
| **OIDC 身份栈** | [#12497](https://github.com/zeroclaw-labs/zeroclaw/pull/12497) → [#12498](https://github.com/zeroclaw-labs/zeroclaw/pull/12498) → [#12608](https://github.com/zeroclaw-labs/zeroclaw/pull/12608) / [#12609](https://github.com/zeroclaw-labs/zeroclaw/pull/12609) → [#12496](https://github.com/zeroclaw-labs/zeroclaw/pull/12496) | 按 provider 配置 OAuth scope；接受无类型 access token 与声明式 claim；ADR-016 例外记录；ADR-017 引入 daemon 持有 refresh grant，打通 Okta / Entra ID | **5 环堆叠链**，任一环未合整链停滞 |
| **记忆子系统** | [#12612](https://github.com/zeroclaw-labs/zeroclaw/pull/12612) + [#12460](https://github.com/zeroclaw-labs/zeroclaw/pull/12460) | **破坏性变更**：移除本地 LLM response cache（`response_cache_*` 四个配置键 + `zeroclaw-memory::ResponseCache`），并补测试覆盖 DB 重开与 Unicode 覆写 | risk:high + size:XL，需迁移说明审阅 |
| **Agent 运行时** | [#11868](https://github.com/zeroclaw-labs/zeroclaw/pull/11868) + [#12265](https://github.com/zeroclaw-labs/zeroclaw/pull/12265) | 在 dispatch 前拦截重复工具调用，并保留 closeout 结果 | 依赖 #12265 例外记录先合；标记 needs-maintainer-review |
| **Provider 兼容** | [#12479](https://github.com/zeroclaw-labs/zeroclaw/pull/12479) | 发送 `drop_block`，修复被裁剪/编辑过的历史导致 Anthropic thinking 请求失败 | size:L，需回归验证 |
| **工具与通道** | [#12605](https://github.com/zeroclaw-labs/zeroclaw/pull/12605)、[#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596)、[#12271](https://github.com/zeroclaw-labs/zeroclaw/pull/12271)、[#11076](https://github.com/zeroclaw-labs/zeroclaw/pull/11076) | MCP FastMCP 结果去重；浏览器账号密码 / TOTP 独立授权；Discord 外部 peer 显式路由；新增 `agy_cli`（Antigravity CLI）编码工具 | #12596 依赖 #12517 与 RFC #12422；#12271 堆叠在 #12116 上 |

### 3.3 值得警惕的信号

- **#11885**（feat(goal): fence live policy cutovers，Goal V1 提案 8/12）评论中自述"**formal final review: FAIL**"，所有失败/未观测门禁仍开放，覆盖 12+ 个子系统、size:XL。这类超大 draft 长期悬挂会持续占用审查注意力。
- Top20 PR 中 **XL 级占 9 条（45%）**，中位体量显著偏大，是合并吞吐低的直接原因之一。

---

## 4. 社区热点

### Issues（按评论数）

1. **[#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) — 6 条评论**｜`priority:p1` `risk:high` `status:accepted`｜S1
   *Web 面板中途中止 Agent，工具调用与思考内容会从上下文中被整体抹除，下一步对话如同该步骤从未发生。*
   创建于 2026-07-07，**已挂起 137 天**。诉求核心不是"能不能停"，而是"**停了之后能不能续**"——可中断/可恢复（checkpoint + 上下文保留）已成为 Agent 产品的基线体验要求。已被 `status:accepted` 受理但迟迟未动，说明实现成本与 P1 优先级之间存在真实冲突。

2. **[#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) — 5 条评论**｜`type:rfc` `topic:identity-access`
   *操作员需授权 Agent 对某服务执行任务，但不向模型、聊天、技能文本或生成内容暴露底层凭据。*
   属安全模型实质性变更（RFC 触发条件已明确写出）。5 条评论说明企业落地场景真实且讨论有进展。**与 #12596 直接耦合**——浏览器凭据分权 PR 明确声明依赖本 RFC，因此该 RFC 的决议速度正在阻塞一条实现线。

3. **[#12022](https://github.com/zeroclaw-labs/zeroclaw/issues/12022) — 2 条评论**｜`enhancement` `memory` `status:in-progress`
   *记忆召回增加可选的外部 `/v1/rerank` 阶段，默认关闭，任何失败回落本地路径。* 设计取向克制（opt-in + 失败降级），是高质量增强提案的范例。

4. **[#12597](https://github.com/zeroclaw-labs/zeroclaw/issues/12597) — 1 条评论**｜`bug`｜S1（当日新增）
   *Telegram 语音消息转写失败后，通道持续重试同一条 update，offset 永不推进，后续所有文本消息被堵死，bot 表现为"掉线"。*

### PR 侧

评论数据缺失，无法排序。但从体量与标签看，最需要治理层关注的是 **[#11885](https://github.com/zeroclaw-labs/zeroclaw/pull/11885)**（自评终审 FAIL 的 XL 提案）与 **[#12269](https://github.com/zeroclaw-labs/zeroclaw/pull/12269)**（标记 `needs-author-action`，Web 端配对设备语音设置，6 天无推进）。

---

## 5. Bug 与稳定性

| 严重度 | Issue | 组件 | 现象 | Fix PR |
|---|---|---|---|---|
| **S1** | [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) | runtime / daemon / web | 中止 Agent 后工具调用与思考内容从上下文消失，工作流阻塞 | ❌ 无（已挂 137 天，`status:accepted`） |
| **S1** | [#12597](https://github.com/zeroclaw-labs/zeroclaw/issues/12597) | channel (Telegram) | 语音转写失败 → offset 不推进 → 通道彻底阻塞 | ❌ 无（当日新增） |
| **S2** | [#12606](https://github.com/zeroclaw-labs/zeroclaw/issues/12606) | config / onboarding | `[[a2a.client.peers]]` 无法通过 `config set/patch` 创建，属性解析到错误前缀 `a2a_client` | ❌ 无 |
| **S2** | [#12604](https://github.com/zeroclaw-labs/zeroclaw/issues/12604) | tools (MCP) | FastMCP 返回字符串时，结果仍以两份形式抵达模型（#10397 仅识别严格 JSON 相等的拷贝） | ✅ [#12605](https://github.com/zeroclaw-labs/zeroclaw/pull/12605) |
| **S3** | [#12601](https://github.com/zeroclaw-labs/zeroclaw/issues/12601) | tooling / ci | `strict_test_only_proof` 读 `base.sha` 而非 merge-base，PR 风险标签判定偏差 | ❌ 无 |
| **未分级** | [#12607](https://github.com/zeroclaw-labs/zeroclaw/issues/12607) | memory | 已保存事实召回不到；错误答案被写入；纠错后**两个版本同时保留** | ❌ 无 |

**风险要点**

- 两个 S1 都指向"**失败不可恢复**"这一共同模式：#8794 是中断丢状态，#12597 是单条坏消息毒化整个游标。建议合并成一个"故障隔离与状态恢复"专项。
- #12607 虽未标 severity，但"纠错后新旧版本共存"属于记忆数据一致性问题，长期会污染检索质量，优先级应视同 S2 以上。
- 已有的 #12611 → #12612、#12604 → #12605 是本日仅有的两组 issue-PR 配对，**修复闭环率 2/12**。

---

## 6. 功能请求与路线图信号

| 请求 | Issue | 落地判断 |
|---|---|---|
| **移除本地 LLM 响应缓存** | [#12611](https://github.com/zeroclaw-labs/zeroclaw/issues/12611) | **高概率进入下一版本**。已有配套 PR [#12612](https://github.com/zeroclaw-labs/zeroclaw/pull/12612)，标题带 `!` 属破坏性变更，将废弃 4 个配置键并附迁移提示。命中条件极端苛刻（temperature 恰为 0.0、无工具、无 hook、无记忆注入、无原生思考覆盖、无图像、单一…），实际几乎无命中，删除属合理瘦身。 |
| **记忆召回外部 rerank** | [#12022](https://github.com/zeroclaw-labs/zeroclaw/issues/12022) | **中高**。`status:in-progress` 已 27 天，设计成熟（opt-in、失败回落），但尚无 PR；若下一版本聚焦记忆质量，它是自然候选。 |
| **浏览器工具文件上传** | [#12614](https://github.com/zeroclaw-labs/zeroclaw/issues/12614) | **中**。`BrowserAction` 枚举缺 `upload`，导致所有需附件的表单流程卡死；底层 `agent-browser` CLI 已支持 `upload`，属"接线"型改动，成本低。考虑到 #12596 正在重构浏览器权限模型，可能会顺带补齐。 |
| **WhatsApp 群聊引用回复** | [#12598](https://github.com/zeroclaw-labs/zeroclaw/issues/12598) | **低-中**。依赖前置缺陷 #10976（出站 mention 不带 `mentionedJid`），需先修通道底层能力。 |
| **Deslop 清理专项** | [#12613](https://github.com/zeroclaw-labs/zeroclaw/issues/12613) | **确定发生**。tracker 明确拆成小 PR 陆续提交（死代码、无效配置、注释冗余、未引用文档/脚本/资产），会持续产生低风险 PR 流。 |
| **操作员托管凭据的作用域使用** | [#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) | **取决于 RFC 决议**。已阻塞 #12596（浏览器账号密码 / TOTP 独立授权）。 |

---

## 7. 用户反馈摘要

**真实痛点（按出现频次与阻塞程度）**

1. **中断即失忆**（#8794）：用户明确描述"整个步骤仿佛从未发生"，这是 Web 面板日常操作路径上的高频摩擦，而非边缘场景。
2. **记忆不可信**（#12607）：召回漏、写入错、纠错后不覆盖。用户提供了 Telegram 会话时间线与诊断细节，说明已做过自助排查——这类报告通常意味着问题已影响其正常使用。
3. **单点故障放大为全局故障**（#12597）：一条语音消息转写失败就让整个 Telegram 通道"看起来掉线"，用户侧完全无法感知原因，也没有自愈路径。
4. **表单类自动化全线受阻**（#12614）：浏览器工具能力枚举齐全却独缺 upload，用户表述为"blocking every form that requires attaching a file"。
5. **群聊场景的社交可见性缺失**（#12598）：回复不引用、mention 失效，群成员不知道答复对象是谁，多人协作场景下 bot 输出难以归属。
6. **配置面与文档不一致**（#12606）：`a2a.client.peers` 文档可写、实际落不到，属"文档承诺 vs 运行时行为"的落差，最易消耗信任。

**满意侧信号**

- #12607 开头"Hi folks, thanks for your work on ZeroClaw!"，#8794、#12422 均带完整复现步骤与组件标注。核心用户群投入度高、报告质量好，是项目的重要资产。
- 多条 Issue 主动遵循仓库的 severity / component 模板（S1/S2/S3 标注规范），说明贡献流程已被有效内化。

**不满意侧信号**

- 最突出的负面情绪不是针对某个 bug，而是**对 P1 长期无进展的隐性不满**：#8794 有 6 条评论、跨越 4 个多月，仍无 fix PR。
- `needs-author-action`、`needs-maintainer-review` 标签在 PR 侧反复出现，反映作者与维护者之间的往返周期偏长。

---

## 8. 待处理积压

### 长期未响应的高优先级项

| 天数 | 条目 | 类型 | 为何需要关注 |
|---|---|---|---|
| **137 天** | [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) | Issue · P1 · S1 · risk:high | 全仓最久的 P1，已 accepted 但无 fix PR；同类问题（#12597）正在增加，说明"故障恢复"是系统性缺口而非孤例 |
| **59 天** | [#11076](https://github.com/zeroclaw-labs/zeroclaw/pull/11076) | PR · size:XL | 新增 `agy_cli`（Antigravity CLI）编码工具。背景是 Gemini CLI 已停止为多数账号服务，属**外部生态变更驱动的时效性需求**，拖久会失效 |
| **33 天** | [#11885](https://github.com/zeroclaw-labs/zeroclaw/pull/11885) | PR · Draft · size:XL | 自评"formal final review: FAIL"的 Goal V1 提案 8/12。建议明确拆解或关闭重开，避免长期占位 |
| **32 天** | [#11907](https://github.com/zeroclaw-labs/zeroclaw/pull/11907) | PR · size:XS · risk:low | 修复 `native_tool_round_flags_...` 的间歇性失败（共享状态导致的 flaky test）。**XS + low risk，是典型的"五分钟该合"项**，长期滞留会持续污染 CI 信号 |
| **28 天** | [#12015](https://github.com/zeroclaw-labs/zeroclaw/pull/12015) | PR · risk:high | 统一 ChaCha20Poly1305 消费者，涉及加密与序列化兼容，需安全审查排期 |
| **27 天** | [#12022](https://github.com/zeroclaw-labs/zeroclaw/issues/12022) | Issue · in-progress | 长期 `in-progress` 但无 PR，状态标签与实际进度可能脱节 |
| **15 天** | [#12269](https://github.com/zeroclaw-labs/zeroclaw/pull/12269) / [#12265](https://github.com/zeroclaw-labs/zeroclaw/pull/12265) | PR | 均带 `needs-author-action`，等待作者响应；#12265 还是 #11868 的前置依赖，形成二次阻塞 |
| **15 天** | [#12271](https://github.com/zeroclaw-labs/zeroclaw/pull/12271) | PR · size:XL | 堆叠在 #12116 之上，需等底层先合 |

### 给维护者的三条建议

1. **先清 CI 红灯**：[#12610](https://github.com/zeroclaw-labs/zeroclaw/pull/12610) 修复的 RUSTSEC-2026-0587 已导致 `cargo audit` 在 CI 失败，属零争议合并项，应立即处理，避免所有 PR 的检查结果被噪声污染。
2. **拆解堆叠链**：OIDC 五连环（#12497→#12498→#12608/#12609→#12496）任一环阻塞即全链停摆。建议先合并纯 docs 的 ADR 例外记录（#12608、#12609），让实现 PR 解耦。
3. **设立 XL PR 准入与存量清理机制**：Top20 中 45% 为 XL，是吞吐低的结构性原因。可考虑对 30 天以上无更新的 XL draft（#11885、#11076）发出明确的"拆分或关闭"决策，回收审查注意力。

---

*本报告基于 2026-11-21 的 GitHub 快照生成。PR 评论数缺失与 1 条未识别合并项已在上文标注，建议在后续日报中补齐该字段以保证趋势可比。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报

**日期：2026-11-21** ｜ 数据窗口：过去 24 小时（截至 2026-11-20 更新）
**仓库：** [sipeed/picoclaw](https://github.com/sipeed/picoclaw)

---

## 1. 今日速览

今日项目表面活跃度中等（3 条 Issue 更新、7 条 PR 更新），但**实际代码推进为零**：7 条 PR 全部为 `CLOSED` 而非合并，其中 4 条是 Dependabot 依赖升级、3 条是 2026-03 提交的历史合并 PR，均带 `stale` 标记被批量关闭，属于典型的积压清理而非功能交付。唯一实质性的社区信号是 Issue [#3417](https://github.com/sipeed/picoclaw/issues/3417)——社区成员宣布建立活跃 Fork 以"让项目继续存活"，并明确指出**当前仓库处于无人维护状态**，该 Issue 已持续开放 46 天、累计 5 条评论。同时，一条中等严重度的模型标识符校验缺陷（[#3454](https://github.com/sipeed/picoclaw/issues/3454)）仍在开放且无 fix PR。综合判断：**项目健康度处于预警区间**——社区需求仍在，但官方维护通道接近停滞。

---

## 2. 版本发布

今日无新版本发布（Release 数：0），无破坏性变更与迁移事项需要通告。

---

## 3. 项目进展

**今日 PR 关闭 7 条，合并 0 条，合并率 0%。**

| PR | 类型 | 内容 | 状态 | 影响 |
|---|---|---|---|---|
| [#3459](https://github.com/sipeed/picoclaw/pull/3459) | 依赖 | line-bot-sdk-go/v8 8.20.1 → 8.23.0 | CLOSED（未合并） | 依赖滞后 |
| [#3458](https://github.com/sipeed/picoclaw/pull/3458) | 依赖 | modernc.org/sqlite 1.53.0 → 1.61.1 | CLOSED（未合并） | 依赖滞后 |
| [#3460](https://github.com/sipeed/picoclaw/pull/3460) | 依赖 | Azure azidentity 1.14.0 → 1.15.0 | CLOSED（未合并） | 依赖滞后 |
| [#3457](https://github.com/sipeed/picoclaw/pull/3457) | 依赖 | golang.org/x/time 0.15.0 → 0.16.0 | CLOSED（未合并） | 依赖滞后 |
| [#1559](https://github.com/sipeed/picoclaw/pull/1559) | 修复合并 | 合并 #1327 #1319 #1318 #1313 | CLOSED | 积压清理，未交付 |
| [#1560](https://github.com/sipeed/picoclaw/pull/1560) | 修复合并 | 合并 #1312 #1311 #1308 | CLOSED | 积压清理，未交付 |
| [#1555](https://github.com/sipeed/picoclaw/pull/1555) | 修复合并 | 合并 #1390 #1389 #1383 #1381 | CLOSED | 积压清理，未交付 |

**解读：**

- 4 条 Dependabot PR 自 2026-11-05 创建、11-20 被以 `stale` 关闭，意味着**依赖安全与兼容性补丁未进入主干**。其中 `modernc.org/sqlite` 跨越 8 个小版本（1.53 → 1.61）、`golang.org/x/time` 涉及 Go 指令版本升级，长期停留在旧版本将累积升级债务。
- 3 条 `fix: merge PR` 系列（#1555/#1559/#1560）创建于 **2026-03-14**，挂起逾 8 个月后于今日关闭，其声称聚合的至少 11 个源 PR（#1308/#1311/#1312/#1313/#1318/#1319/#1327/#1381/#1383/#1389/#1390）随之失去落地路径，对应的修复内容需要重新评估是否已由其他提交覆盖。
- 结论：**今日项目在功能与修复维度向前推进 0%**，仅在 Issue/PR 队列上做了减法。

---

## 4. 社区热点

**① [[OPEN] Active Fork & Continued Maintenance（#3417）](https://github.com/sipeed/picoclaw/issues/3417)** — 评论 **5** 条，为今日讨论最热条目。
- 作者 @afjcjsbx 于 2026-10-06 创建，11-20 仍活跃，宣布建立 [afjcjsbx/picoclaw](https://github.com/afjcjsbx/picoclaw) 活跃 Fork。
- 诉求本质：**项目治理与存续问题**，而非单一功能缺陷。其表述"本仓库目前看起来无人维护，但社区仍有显著兴趣与需求"是本次日报最重要的健康度信号——一旦出现组织级 Fork，后续贡献者与 Issue 讨论可能分流。

**② [[OPEN] 模型标识符校验强制小写化（#3454）](https://github.com/sipeed/picoclaw/issues/3454)** — 评论 **4** 条，👍 0。
- 作者 @SecInsight，创建 2026-10-28，已挂 `stale` 标签但仍获更新。
- 争议焦点：模型编辑表单对**非 picoclaw 内置 provider 前缀**（如上游命名空间 `ACME/`）弹出"should use `acme` — Fix"提示，点击 Fix 会**直接改写用户配置**，破坏大小写敏感的上游 API 路由。这是"智能纠错"过度干预的典型反模式。

---

## 5. Bug 与稳定性

| 严重度 | 条目 | 状态 | 是否有 Fix PR | 说明 |
|---|---|---|---|---|
| **中** | [#3454](https://github.com/sipeed/picoclaw/issues/3454) 模型 ID 大小写被强制降级 | OPEN（stale） | ❌ 无 | 用户输入 `ACME/gpt-4o-mini` 时被提示改为 `acme/gpt-4o-mini`，一键 Fix 会**静默破坏配置**。对大小写敏感的上游（自建网关、第三方聚合 API）将导致 404/鉴权失败。属于**数据破坏型缺陷**，优先级应高于普通 stale 项。 |
| **中** | [#3461](https://github.com/sipeed/picoclaw/issues/3461) Web UI 无法启动 gateway（无 api-key provider） | CLOSED（stale） | ❌ 无 fix PR 记录 | 用户报告 console 侧一切正常，但 Web UI 无任何入口启动 gateway；配置示例使用 `"provider": ""` + 自定义 `api_base`（kilo.ai gateway）且无 API Key。该场景指向**空 provider / 无密钥配置路径在 Web 层的处理缺失**。以 stale 关闭而非修复，问题可能仍然存在。 |
| 低 | 今日无崩溃、无回归（regression）报告 | — | — | — |

**风险提示：** 两条 Bug 均以 `stale` 生命周期管理，其中 #3461 在无关联 fix 的情况下被关闭，建议维护者复核关闭理由，避免"以关代修"。

---

## 6. 功能请求与路线图信号

今日无新增显式功能请求（0 条 `[Feature]` 类 Issue）。从存量讨论中可提炼两条潜在路线图信号：

1. **可配置的模型 ID 校验策略**（源自 [#3454](https://github.com/sipeed/picoclaw/issues/3454)）：将前缀小写化从"强制纠错"改为"仅对内置 provider 生效"或"警告但不改写"。实现成本低、影响面明确，若维护恢复，**最有可能被纳入下一个补丁版本**。
2. **无密钥 / 自定义 provider 的一等公民支持**（源自 [#3461](https://github.com/sipeed/picoclaw/issues/3461)）：允许 `provider: ""` + `api_base` 的配置在 Web UI 与 gateway 启动流程中完整通行。该能力对自建网关、免费额度聚合服务用户价值高。

**当前判断：** 由于今日 0 条 PR 合并、且社区已出现 Fork 分流，上述需求在**主干仓库近期落地的概率偏低**，更可能先在 `afjcjsbx/picoclaw` Fork 中实现。

---

## 7. 用户反馈摘要

从今日 Issues 摘要与讨论热度提炼：

- **不满意（强信号）：** 对项目维护状态的失望是今日最突出的情绪。#3417 明确以"unmaintained"定性仓库现状，并付诸行动（建 Fork），这通常发生在用户等待官方响应数月之后。
- **痛点 1 — Web 与 Console 能力不对等：** #3461 反映"console 能跑的，Web UI 跑不了"，Web 端作为主要交互界面却缺少关键操作入口，影响非 CLI 用户的完整体验。
- **痛点 2 — 智能提示越界修改用户配置：** #3454 显示用户对"自动 Fix"改写配置持抵触态度，尤其在上游标识符大小写敏感的真实生产场景中，此类"好心办坏事"会直接造成服务中断。
- **使用场景画像：** 用户普遍接入**第三方/自建 OpenAI 兼容网关**（如 kilo.ai gateway、自定义 `api_base`），而非官方托管服务，这解释了为何 provider 为空、模型前缀非标准、大小写敏感等问题反复出现。
- **满意点：** 今日数据中未见明确正面反馈；#3461 中"everything works from the console"可视为对核心功能的间接肯定。

---

## 8. 待处理积压

| 条目 | 类型 | 已挂起时长 | 状态 | 关注理由 |
|---|---|---|---|---|
| [#3417](https://github.com/sipeed/picoclaw/issues/3417) Active Fork & Continued Maintenance | Issue（治理） | **46 天**（2026-10-06 起） | OPEN，5 评论 | 项目存续级信号，官方至今无明确回应；直接影响贡献者去留。**建议最高优先级回应。** |
| [#3454](https://github.com/sipeed/picoclaw/issues/3454) 模型 ID 大小写校验 | Issue（Bug） | **24 天**（2026-10-28 起） | OPEN + `stale` | 存在配置破坏风险，且无 fix PR；stale 机器人可能在无人工介入下自动关闭。 |
| [#1555](https://github.com/sipeed/picoclaw/pull/1555) / [#1559](https://github.com/sipeed/picoclaw/pull/1559) / [#1560](https://github.com/sipeed/picoclaw/pull/1560) | PR（修复聚合） | **约 8 个月**（2026-03-14 起） | 今日 CLOSED | 聚合的 11 个源 PR 需逐一确认是否已由其他提交覆盖，否则相关修复被视为**事实性丢失**。 |
| [#3457](https://github.com/sipeed/picoclaw/pull/3457)–[#3460](https://github.com/sipeed/picoclaw/pull/3460) 依赖升级 | PR（依赖） | 15 天 | 今日 CLOSED（未合并） | 4 项依赖仍未升级，建议由维护者手工重开或重建 Dependabot 分支，避免长期版本漂移。 |

---

## 健康度小结

| 指标 | 今日值 | 评价 |
|---|---|---|
| PR 合并率 | 0 / 7（0%） | 🔴 无代码交付 |
| Issue 净增 | +2 活跃 / −1 关闭 | 🟡 有讨论、少收敛 |
| 新版本 | 0 | 🔴 发布停滞 |
| 依赖更新落地 | 0 / 4 | 🔴 技术债累积 |
| 社区治理信号 | Fork 分流已发生 | 🔴 需官方表态 |
| 讨论活跃度 | 9 条评论（2 个 Issue） | 🟢 社区仍有热情 |

**一句话结论：** 社区热度尚存，但官方维护通道已接近停摆；今日全部动作均为队列清理，**项目当前的核心风险不是 Bug，而是治理真空**——建议维护者优先在 #3417 上给出明确的状态说明与接续计划。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：2026-11-21 ｜ 数据窗口：过去 24 小时**

---

## 1. 今日速览

项目今日维持**高活跃度**：24 小时内 46 条 PR 更新（29 待合并 / 17 已合并或关闭）、15 条 Issue 更新（11 新开或活跃 / 4 已关闭），无新版本发布。前端与控制台质量问题是本日最集中的反馈簇——移动端安全区、Markdown 表格溢出、键盘可达性、密码组件循环刷新同日进入视野；CLI 侧接连报出两个路径拼接缺陷（#8832、#8833），指向自动生成命令的 base-path 处理层。合并侧以"稳定性加固"为主线：网关错误码解析、Windows 配置文件原子写重试、技能回滚备份可靠性、通道日志恢复均已落地。**隐忧在于待合并队列已堆积至 29 条**，其中含 3 个 XL/XXL 级本地模型功能 PR 处于相互依赖的 stacked 状态，review 带宽可能成为下阶段瓶颈。

---

## 2. 版本发布

无新版本发布。当前主线为 `v2.3.0.post1`，后端包版本号已推进至 `2.4`（见 #8580 环境信息），存在版本元数据与安装包不同步的现象，建议维护者核对。

---

## 3. 项目进展

今日 17 条 PR 完成合并/关闭，可从明细中确认的 6 条关键变更：

| PR | 规模 | 推进内容 |
|---|---|---|
| [#8790](https://github.com/agentscope-ai/QwenPaw/pull/8790) | XXXL | **修复通道隔离引入的可观测性回归**：为全部 18 个迁移通道及宿主侧 Console/队列/投递链路恢复 SDK 与 worker 日志，含 Lark 输出去重、凭证脱敏 |
| [#8499](https://github.com/agentscope-ai/QwenPaw/pull/8499) | XXXL | **本地模型管理抽离为 Plugin Provider**，插件接管下载、llama.cpp 安装与服务生命周期，宿主仅保留模型选择与统一推理；承诺保留既有用户配置与模型文件 |
| [#8512](https://github.com/agentscope-ai/QwenPaw/pull/8512) | S | **从错误文本回读网关状态码**，使 `status_code=502, 请联系管理员处理！` 这类裸 `APIError` 可被正确分类并触发重试/模型回退，直接关闭 #8505 |
| [#8835](https://github.com/agentscope-ai/QwenPaw/pull/8835) | M | **Windows 双修复**：`agent.json` 原子替换遇短暂文件锁时最多重试两次；插件依赖安装器等待子进程真正退出后再返回 |
| [#8236](https://github.com/agentscope-ai/QwenPaw/pull/8236) | XL | **Ollama 上下文窗口改由 `num_ctx` 推导**，不再误用 128k 云端口径，修正本地 `qwen3-coder:30b` 等模型的截断问题 |
| [#8784](https://github.com/agentscope-ai/QwenPaw/pull/8784) | XL | **技能多工作区回滚加固**：修复五处薄弱点，确保单个工作区恢复失败不会中断其余工作区，且备份保留至全部恢复完成 |

同期关闭的 Issue 包括 #8505（网关错误分类）、#8839（Android Pad 按钮溢出）、#8796（移动端顶部安全区缺失）。

**整体评估**：本轮合并重心明确落在"回归修复 + 部署健壮性"，而非新能力扩张。其中 #8499 属于**架构级改动**（本地模型归属插件化），与队列中 #8649/#8647/#8648 系列存在直接耦合，可能影响后者的 rebase 成本，建议优先安排该系列的 review 排期。

---

## 4. 社区热点

> 注：本次数据中 PR 评论数均为 `undefined`，热度分析主要以 Issue 评论数与跨条目聚合信号为依据。

1. **[#8580](https://github.com/agentscope-ai/QwenPaw/issues/8580) 记忆标签索引永不重建（6 评论，OPEN，存续 17 天）** — 本日讨论最充分的条目。用户已完成配置项的写入-回读双重验证（`auto_memory_generate_tags = true`，`agent.json` diff 仅 2 处），标签确实被生成，但 `/memory/tags` 恒定返回 503。诉求核心不是"功能缺失"，而是**索引重建路径缺失导致数据静默不可读**——这类"写入成功、读取失败"的不对称故障最难被用户自行诊断。

2. **[#8123](https://github.com/agentscope-ai/QwenPaw/issues/8123) Daily Paper 截断即整任务失败（3 评论，OPEN，存续 44 天）** — 3 篇论文的任务中，单篇摘要被 `glm-5.3-flash` 截断后抛 `ToolJSONDecodeError`，整个 cron 任务直接标记 error。用户明确指出缺少**按篇重试粒度**。存续时间已超过一个月，属长期未决的可靠性问题。

3. **[#8821](https://github.com/agentscope-ai/QwenPaw/issues/8821) Windows 原生通知（3 评论，当日 CLOSED）** — 需求表述非常具体：长程任务在后台运行时用户需手动盯浏览器标签页。该 Issue 在一天内被关闭但**未见对应实现 PR**，判定为维护者以范围外/重复处理，建议在关闭理由中补充说明以免重复提报。

4. **[#8719](https://github.com/agentscope-ai/QwenPaw/pull/8719) 运行时 base-path 部署（XL，Under Review，创建 8 天）** — 引入 `QWENPAW_BASE_PATH` 支持反代子路径挂载，关联 #1853/#8177/#8316 等历史上下文。这是本日队列中**对企业自托管场景影响最大**的待评审项。

5. **[#8785](https://github.com/agentscope-ai/QwenPaw/pull/8785) 媒体内联预算修复（XXL，Under Review）** — 指出现有降采样逻辑仅以最长边判定，忽略独立字节预算（例：2000×2000 PNG 在边长合规时仍可能超限），并提出拒斥后重缩放与省略上报。

---

## 5. Bug 与稳定性

### 🔴 严重（影响核心可用性 / 数据静默丢失）

| Issue | 问题 | Fix PR |
|---|---|---|
| [#8830](https://github.com/agentscope-ai/QwenPaw/issues/8830) | **Windows 上 `llama-server.exe` 在后端异常退出后不终止**，每次重启在新随机端口再拉起一份，导致内存耗尽并最终无法启动本地模型（报告中已出现 4 个累积进程） | ✅ [#8841](https://github.com/agentscope-ai/QwenPaw/pull/8841)（加进程组/job 对象），待合并 |
| [#8580](https://github.com/agentscope-ai/QwenPaw/issues/8580) | **记忆标签索引不可重建**，`/memory/tags` 恒 503，标签写入成功但永久不可读 | ❌ 无 |
| [#8757](https://github.com/agentscope-ai/QwenPaw/issues/8757) | **微信通道入站轮询静默死亡**：错误-重试循环无日志、无恢复、游标不重置；进程存活、健康检查报正常、日志零错误，出站正常 | ❌ 无 |

### 🟠 中（功能错误 / 明显体验缺陷）

| Issue | 问题 | Fix PR |
|---|---|---|
| [#8123](https://github.com/agentscope-ai/QwenPaw/issues/8123) | Daily Paper 输出截断 → `ToolJSONDecodeError`，无按篇重试 | ❌ 无 |
| [#8836](https://github.com/agentscope-ai/QwenPaw/issues/8836) | 工具配置含 password 组件时页面**循环刷新**（标注影响 all version） | ✅ [#8842](https://github.com/agentscope-ai/QwenPaw/pull/8842)（阻止未修改值的防抖自动保存），待合并 |
| [#8833](https://github.com/agentscope-ai/QwenPaw/issues/8833) | `qwenpaw mission` CLI 重复拼接 `/api` 前缀，请求落到 `/api/api/chat/send`，影响 start/status 三条命令 | ⚠️ [#8837](https://github.com/agentscope-ai/QwenPaw/pull/8837)（标记 `invalid` + Under Review），改为直接移除已废弃实现 |
| [#8832](https://github.com/agentscope-ai/QwenPaw/issues/8832) | 自动生成 CLI 用 `HEAD /api/version` 做健康检查，服务端返回 405，`_ensure_daemon_alive()` 误判守护进程已死 | ❌ 无 |
| [#8845](https://github.com/agentscope-ai/QwenPaw/issues/8845) | 助手消息内 Markdown 表格溢出气泡，被绘制到消息列表边界外且无法横向滚动，超宽列实际不可见（文本仍可选中） | ❌ 无 |
| [#8844](https://github.com/agentscope-ai/QwenPaw/issues/8844) | 消息列表不可聚焦，方向键 / PageUp / PageDown / Home / End 均无效，**无鼠标环境下聊天不可用** | ❌ 无 |
| [#8843](https://github.com/agentscope-ai/QwenPaw/issues/8843) | 配置文档将环境变量 API 简写为 `GET/PUT/DELETE /envs`，与实际路由行为不符；**指引型 QA 智能体据此建议的 PUT 会清空其他全部环境变量** | ❌ 无 |

### 🟡 低（文档 / 文本）

- [#8840](https://github.com/agentscope-ai/QwenPaw/issues/8840) LICENSE 中 "Contribution" 定义多出一个 "the"，偏离 Apache 2.0 官方文本 —— 无 Fix PR。

**稳定性判断**：本日严重问题集中在 **Windows 本地模型进程生命周期**与**通道/记忆的静默故障**两类。前者的根因高度一致（插件启动子进程未纳入受控进程组），#8841 与已合并的 #8835 属于同一治理方向，形成一组可复用的修复范式；后两者的共同特征是**"健康检查绿灯 + 实际功能失效"**，说明现有健康探针未覆盖"数据可读性"与"入站流活性"，建议作为系统性问题立项。

---

## 6. 功能请求与路线图信号

| 方向 | 依据 | 纳入下一版本概率 |
|---|---|---|
| **本地模型运行时管理**（GPU 控制 / 自动更新 / MLX） | [#8649](https://github.com/agentscope-ai/QwenPaw/pull/8649)、[#8648](https://github.com/agentscope-ai/QwenPaw/pull/8648)、[#8647](https://github.com/agentscope-ai/QwenPaw/pull/8647) 三件套，明确声明按顺序 stacked 合并，且 #8649 已声明"先合" | **高** — 形态完整、作者已自述合并顺序；但 #8499（本地模型插件化）今日刚合入，三件套需 rebase，落地时间可能顺延 |
| **反代子路径部署** | [#8719](https://github.com/agentscope-ai/QwenPaw/pull/8719) `QWENPAW_BASE_PATH`（XL，Under Review 8 天） | **中高** — 企业/内网部署刚需，但涉及静态资源与 API 前缀全局改造，评审周期偏长 |
| **Office 技能同步 Anthropic 2026-07 更新** | [#8479](https://github.com/agentscope-ai/QwenPaw/pull/8479)（XXXL，first-time-contributor，Under Review 24 天） | **中** — 内容升级价值明确，但首次贡献者 + XXXL 规模，需维护者投入较多指导 |
| **媒体内联预算治理** | [#8785](https://github.com/agentscope-ai/QwenPaw/pull/8785)（XXL，Under Review） | **中** — 属 #8632 的延续修补，修复链条清晰 |
| **桌面端原生通知** | [#8821](https://github.com/agentscope-ai/QwenPaw/issues/8821)（当日 CLOSED，无实现 PR） | **低（本轮）** — 需求真实且反馈具体，但已被关闭；若后续有跨平台通知抽象层规划可重启 |
| **可访问性（键盘导航）** | [#8844](https://github.com/agentscope-ai/QwenPaw/issues/8844) | **待观察** — 同类 UI 问题今日集中出现（#8845/#8836/#8839/#8796），可能触发一轮 Console 前端专项治理 |

**路线图信号解读**：项目正沿两条主线演进——(1) **本地优先推理**（插件化 + 多引擎 + 自动更新），(2) **部署形态多样化**（反代子路径、移动端适配）。今日合并的 #8499 与待评审的 #8719 恰好分别是两条主线的关键节点。

---

## 7. 用户反馈摘要

**真实痛点**

- **长任务等待成本高**：「在等待 QwenPaw 处理长程任务时，一般会将其放置后台并手动操作电脑」——用户需要**任务完成即主动推送**，而非持续轮询浏览器标签页（#8821）。
- **无鼠标场景完全不可用**：键盘无法滚动会话（#8844），叠加消息内表格无法横向滚动（#8845），构成一组连续的可访问性阻断。
- **静默失败最消耗信任**：微信入站消息"无声停止"、通道仍报 healthy、日志零错误（#8757）；记忆标签"确实生成了但读不到"（#8580）——用户已自行完成配置校验仍无法定位，说明诊断信息供给不足。
- **移动/平板端布局破损**：Android Pad 上发送按钮溢出屏幕（#8839）、全屏容器内容被系统状态栏遮挡（#8796）。值得注意的是 #8796 明确指出该回归**源于 `c54a4465` 引入的 `viewport-fit=cover`**，属可追溯的定向回归。
- **本地模型资源残留**：Windows 用户以四进程累积的实际数据说明内存被逐步吞噬至无法启动（#8830），反映本地推理场景对进程治理的强依赖。

**满意面**：Issue 普遍附带精确环境信息（版本号、commit hash、配置 diff、request id）与最小复现路径，且多条由用户自行完成初步根因定位（如 #8796 定位到引入 commit、#8505 定位到 `extract_status_code()`），说明用户群体技术素养高、对项目投入度高。

**不满意面**：集中于**状态可观测性**——"表面正常、实际失效"类故障反复出现（#8757、#8580、#8832），以及**文档与实现漂移**（#8843 的文档直接导致智能体给出破坏性建议）。

---

## 8. 待处理积压

### 🔴 需优先关注

| 条目 | 类型 | 存续 | 说明 |
|---|---|---|---|
| [#8123](https://github.com/agentscope-ai/QwenPaw/issues/8123) | Issue / Bug | **44 天** | Daily Paper 截断即整任务失败，无按篇重试。本日 15 条 Issue 中存续最久，可靠性影响面大 |
| [#8580](https://github.com/agentscope-ai/QwenPaw/issues/8580) | Issue / Bug | **17 天** | 记忆标签索引不可重建，本日评论最多（6 条）但**仍无关联 PR**，属"高讨论、零动作" |
| [#8757](https://github.com/agentscope-ai/QwenPaw/issues/8757) | Issue / Bug | 6 天 | 微信通道静默死亡，无日志无恢复，官方插件问题 |
| [#8832](https://github.com/agentscope-ai/QwenPaw/issues/8832) | Issue / Bug | 1 天 | 与 #8833 同源（CLI base-path 处理），但仅 #8833 有 PR；建议合并处理以免只修一半 |

### 🟠 待合并队列（29 条中值得优先 review 的长期项）

| PR | 规模 | 状态 | 存续 | 说明 |
|---|---|---|---|---|
| [#8479](https://github.com/agentscope-ai/QwenPaw/pull/8479) | XXXL | first-time-contributor + Under Review | **24 天** | 首次贡献者超大 PR 长期挂起，存在贡献者流失风险，建议给出明确的评审时间承诺或拆分建议 |
| [#8236](https://github.com/agentscope-ai/QwenPaw/pull/8236) | XL | 今日已 CLOSED | 37 天 | ✅ 本日已清理，作为积压消化的正面信号 |
| [#8649](https://github.com/agentscope-ai/QwenPaw/pull/8649) / [#8648](https://github.com/agentscope-ai/QwenPaw/pull/8648) / [#8647](https://github.com/agentscope-ai/QwenPaw/pull/8647) | L / XL / XXL | OPEN，stacked 依赖 | 12 天 | 三件套相互依赖，**必须按序评审**；#8499 合入后需 rebase，建议尽快启动 #8649 |
| [#8719](https://github.com/agentscope-ai/QwenPaw/pull/8719) | XL | Under Review | 8 天 | 反代 base-path，企业部署刚需 |
| [#8785](https://github.com/agentscope-ai/QwenPaw/pull/8785) | XXL | Under Review | 4 天 | 媒体内联预算治理 |
| [#8308](https://github.com/agentscope-ai/QwenPaw/pull/8308) / [#8268](https://github.com/agentscope-ai/QwenPaw/pull/8268) / [#8487](https://github.com/agentscope-ai/QwenPaw/pull/8487) | XS / M / S | OPEN | 23–36 天 | 小/中规模修复，成本低、收益明确，是低成本清队的合适候选 |
| [#8467](https://github.com/agentscope-ai/QwenPaw/pull/8467) | M | Under Review | 24 天 | `agentscope` 依赖升至 2.0.11，依赖类变更宜尽早决断以免阻塞后续 |

### 数据质量提示

1. 本次 PR 明细中**评论数字段全部为 `undefined`**，无法进行 PR 维度的热度排序，"社区热点"部分已改用 Issue 评论数与跨条目聚合信号替代。
2. 46 条 PR 中仅提供 20 条明细（14 OPEN / 6 CLOSED），已合并/关闭 17 条中尚有 11 条未见记录，建议下期补齐以完整评估合并吞吐。
3. 版本元数据存在不一致（安装包 `v2.3.0b2` / `PKG-INFO: 2.4` / `reme_ai 0.4.2.0`），建议核对发布流水线。

---

**健康度结论**：活跃度高、响应及时（4 条 Issue 当日关闭、6 条 PR 当日合入），修复方向明确且有复用范式；主要风险在于 **29 条待合并 PR 的评审带宽**与 **三条无 PR 关联的严重 Bug（#8580 / #8757 / #8123）**。若下周能将 stacked 本地模型系列与 #8580 的根因定位推进，项目将同时改善吞吐与核心可靠性两项指标。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目日报（2026-11-21）

## 1. 今日速览

| 指标 | 数据 |
|---|---:|
| Issues 更新 | 314 条（活跃/新开 293，已关闭 21） |
| PR 更新 | 500 条（待合并 399，已合并/关闭 101） |
| 新版本 | 1 个 canary |
| PR 待合并占比 | 79.8% |
| Issue 关闭占更新量 | 6.7% |

今日项目活跃度很高：500 条 PR 更新和 314 条 Issue 更新表明开发与讨论都非常密集，且有 1 个 canary 发布。但 PR 待合并量达到 399 条，合并/关闭 101 条，说明审查吞吐不低、净积压压力仍然明显。Issue 侧活跃/新开 293 条、关闭 21 条，关闭比例偏低，讨论主要集中在统一网关迁移后稳定性、桌面端会话/渲染、Kanban 自动化循环、Windows 平台兼容和多 profile 性能。整体健康度呈“高频迭代 + 稳定性债务集中”的状态，核心风险仍在网关、会话状态与跨平台可靠性。

---

## 2. 版本发布

**v0.23.3+canary.20261120T064609Z**  
链接：https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.3%2Bcanary.20261120T064609Z

- 发布类型：canary 构建，发布日期为 2026-11-20。
- 可确认内容：发布说明包含 Hermes Desktop 下载表，提供 macOS Apple Silicon（M 系列）DMG 下载链接片段。
- 更新内容：给定数据中的 release body 在 `HERMES_BUILDS_TABLE` 处截断，**无法确认具体功能更新、修复项或完整构建矩阵**。
- 破坏性变更：数据源未提供完整 release notes，**无法评估破坏性变更**，不建议据此推断。
- 迁移注意事项：这是 canary 版本，不是稳定版。建议仅在隔离 profile / 测试环境验证更新、回滚和桌面端兼容性；生产环境应等待 stable 或完整 release notes 后再升级。

---

## 3. 项目进展

今日 PR 更新中 101 条已合并/关闭，但展示样本里可确认的关闭项以维护性、目录与本地化为主，核心稳定性修复多数仍在待合并队列。

**已关闭/合并的样本 PR：**
- [#144109](https://github.com/NousResearch/hermes-agent/pull/144109) `feat(optional-mcps): add Mobbin MCP catalog entry` — 已关闭/合并，推进 optional MCP 目录覆盖。
- [#92323](https://github.com/NousResearch/hermes-agent/pull/92323) `fix(i18n): remaining Spanish session-title wiring and regional aliases` — 已关闭/合并，清理桌面端西班牙语会话标题和区域别名残留硬编码。

**已关闭的重要 Issue：**
- [#128770](https://github.com/NousResearch/hermes-agent/issues/128770) WSL-less Windows 上桌面端触发 `wsl.exe` 安装提示 — 已关闭，属于 Windows 桌面体验修复。
- [#84195](https://github.com/NousResearch/hermes-agent/issues/84195) 放宽/移除 skill description 57 字符截断 — 已关闭，涉及技能路由质量和系统提示词可读性。

**今日新提交/更新的修复 PR（尚未合并）：**
- [#158445](https://github.com/NousResearch/hermes-agent/pull/158445) 修复 SOUL.md 加载失败后仍可被空内容覆盖的问题。
- [#158443](https://github.com/NousResearch/hermes-agent/pull/158443) 修复 Desktop 将“忙碌的 gateway owner”误判为 stale 的问题。
- [#158442](https://github.com/NousResearch/hermes-agent/pull/158442) 为 missing-path hint 探测增加超时边界，修复 #158400。
- [#158419](https://github.com/NousResearch/hermes-agent/pull/158419) 允许 `hermes kanban list` 在 `delegate_task` 子任务中运行。
- [#158438](https://github.com/NousResearch/hermes-agent/pull/158438) 修复 `models_dev_id_for()` 对 provider alias 的解析。
- [#158428](https://github.com/NousResearch/hermes-agent/pull/158428) 修复 `search_files` 分页重复/跳过结果。
- [#158440](https://github.com/NousResearch/hermes-agent/pull/158440) 为自托管 OpenAI-compatible STT 引擎转码其无法解码的音频格式。

**推进评估：** 今日维护吞吐尚可，但“已合并/关闭 101 vs 待合并 399”表明积压仍在扩大或至少未明显消化。短期项目前进主要体现在小范围修复和目录/本地化清理；网关、会话一致性、Windows 平台稳定性等核心问题仍需更多合并动作才能改变风险曲线。

---

## 4. 社区热点

### 讨论最活跃的 Issues

1. [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) — **85 评论**，P2，统一网关 #106742 合并后在 main 上的遗留问题跟踪。  
   诉求：CLI、TUI、Desktop、API server、编辑器、消息机器人、cron、Kanban、Group Chats 全部切换到单一 gateway 进程后，出现 post-merge 稳定性问题，需要系统性收尾。

2. [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) — **68 评论**，P3，blocked/upstream。  
   诉求：外部贡献者无法通过 API 创建 PR，`CreatePullRequest` 权限错误。虽然 issue 创建和 fork PR 仍可用，但直接影响外部贡献流程。

3. [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) — **21 评论**，P1，更新失败后留下半应用安装且无产品内恢复。  
   诉求：`hermes update` / Desktop updater 失败后，用户只能手工修复；涉及 5 种机制、15 个 Discord 讨论串，属于高优先级恢复体验问题。

4. [#137287](https://github.com/NousResearch/hermes-agent/issues/137287) — **19 评论**，P2，Desktop transcript 随机重复、错序或丢失消息。  
   诉求：桌面端会话转录完整性不可靠，直接影响用户对会话状态和长期使用的信任。

5. [#77253](https://github.com/NousResearch/hermes-agent/issues/77253) — **15 评论**，P3，无语言标签、`text`、`yaml` 的代码块被误判为 prose，无法渲染。  
   诉求：桌面端 Markdown 阅读体验和代码块识别准确性。

6. [#75444](https://github.com/NousResearch/hermes-agent/issues/75444) / [#79728](https://github.com/NousResearch/hermes-agent/issues/79728) — Kanban auto-decomposer 对 escalated triage task 反复重新派发，形成无限 block bounce / 重复工作。  
   诉求：自动化 Kanban 的恢复路径需要避免循环和重复分解。

7. [#146538](https://github.com/NousResearch/hermes-agent/issues/146538) / [#153727](https://github.com/NousResearch/hermes-agent/issues/153727) — 多 profile gateway 的性能问题：Windows 上 34k–99k 文件系统元数据操作/秒，macOS 上 15 profile 时事件循环被 GIL 饥饿。  
   诉求：多 profile 是实际部署场景，但 gateway 在规模化 profile 下资源消耗和 liveness 风险明显。

### PR 侧热点

PR 评论数字段在给定数据中为 `undefined`，无法按评论数排序；但从更新时间看，今日新开/更新的修复 PR 密集，集中在 Desktop gateway owner、SOUL.md 保存、搜索分页、provider alias、STT 转码、Kanban 子任务权限等小范围高风险修复。  
代表项：[#158445](https://github.com/NousResearch/hermes-agent/pull/158445)、[#158443](https://github.com/NousResearch/hermes-agent/pull/158443)、[#158442](https://github.com/NousResearch/hermes-agent/pull/158442)、[#158446](https://github.com/NousResearch/hermes-agent/pull/158446)。

**背后诉求：** 社区热点集中在“统一网关后的稳定性”“桌面会话完整性”“自动化任务不循环”“Windows/macOS 多 profile 性能”“外部贡献者权限”。这些不是单点小 bug，而是平台化使用后的系统性可靠性问题。

---

## 5. Bug 与稳定性

### P1 / 高优先级

- [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) — 更新失败留下半应用安装，Desktop 启动后关闭、gateway venv 缺少 `pydantic_core`、git checkout 残留 partial-clone 配置，且没有产品内恢复路径。  
  **Fix PR：** 展示样本中未见直接 fix PR。属于今日最需要优先处理的稳定性问题。

### P2 / 主要稳定性风险

- [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) — 统一 gateway 合并后的 post-merge 问题，85 评论。  
  **Fix PR：** 未见直接关闭型 PR；相关跟进包括 [#145171](https://github.com/NousResearch/hermes-agent/issues/145171) 入口切换、[#157156](https://github.com/NousResearch/hermes-agent/pull/157156) delivery.status RPC，但均非直接修复。
- [#137287](https://github.com/NousResearch/hermes-agent/issues/137287) — Desktop transcript 重复、错序、丢消息。  
  **Fix PR：** 相关流式转录修复 [#130235](https://github.com/NousResearch/hermes-agent/pull/130235) 仍待合并，但是否完全覆盖该 Issue 未确认。
- [#75444](https://github.com/NousResearch/hermes-agent/issues/75444) — Kanban auto-decomposer 无限 block bounce。  
  **Fix PR：** 未见直接 fix；相关 Kanban 改进有 [#157157](https://github.com/NousResearch/hermes-agent/pull/157157) 真实取消、[#157624](https://github.com/NousResearch/hermes-agent/pull/157624) quota wall 等待、[#158419](https://github.com/NousResearch/hermes-agent/pull/158419) delegate 子任务 list 权限。
- [#146538](https://github.com/NousResearch/hermes-agent/issues/146538) — Windows 多 profile gateway 持续 34k–99k 文件元数据操作/秒，kernel pool 增长。  
  **Fix PR：** 未见直接 fix。
- [#143767](https://github.com/NousResearch/hermes-agent/issues/143767) — Desktop 对 messaging chats 恢复预压缩已结束会话，模型切换被 `session_superseded` 拒绝。  
  **Fix PR：** 未见直接 fix。
- [#126622](https://github.com/NousResearch/hermes-agent/issues/126622) — Windows `write_file` 因 `st_ctime_ns` 来源不一致永久拒绝。  
  **Fix PR：** 未见直接 fix。
- [#91097](https://github.com/NousResearch/hermes-agent/issues/91097) — Windows Scheduled Task 无法观察/重启实际 gateway 进程。  
  **Fix PR：** 未见直接 fix。
- [#146440](https://github.com/NousResearch/hermes-agent/issues/146440) — Windows Kanban managed workers 在 agent init 阶段冻结。  
  **Fix PR：** 未见直接 fix。
- [#144413](https://github.com/NousResearch/hermes-agent/issues/144413) — 工具结果含 lone surrogate 时 gateway settlement 抛 `UnicodeEncodeError`，会话卡在 `paused: unknown_execution`。  
  **Fix PR：** 未见直接 fix。
- [#153727](https://github.com/NousResearch/hermes-agent/issues/153727) — macOS 15 profile 下 gateway 事件循环 GIL-starved，watchdog exit 75，session.resume 30s 超时。  
  **Fix PR：** 未见直接 fix。
- [#156504](https://github.com/NousResearch/hermes-agent/issues/156504) — Telegram `getFile` / `send_voice` 在 stale pooled connection 上全部超时。  
  **Fix PR：** 未见直接 fix。
- [#156709](https://github.com/NousResearch/hermes-agent/issues/156709) — `FooteredReply` 破坏 `copy.deepcopy`，gateway/session_events 发布完成事件失败。  
  **Fix PR：** 未见直接 fix。
- [#156335](https://github.com/NousResearch/hermes-agent/issues/156335) — Kanban board removal 可能 orphan in-flight SQLite writers。  
  **Fix PR：** 未见直接 fix。
- [#156899](https://github.com/NousResearch/hermes-agent/issues/156899) — 并发首次查找 profile provider plugin 导致 “Unknown provider” 直到重启。  
  **Fix PR：** 未见直接 fix。
- [#148531](https://github.com/NousResearch/hermes-agent/issues/148531) — split topology 下 owner-backfill 每次 Desktop 启动 409 “Exclusive maintenance refused”。  
  **Fix PR：** 未见直接 fix。

### P3 / 体验与阻塞类

- [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) — API 创建 PR 权限错误，`blocked/upstream`。  
  **Fix PR：** 无，依赖上游权限问题。
- [#77253](https://github.com/NousResearch/hermes-agent/issues/77253) — 无语言标签代码块被误判为 prose。  
  **Fix PR：** 未见直接 fix。

### 今日新增修复 PR（待合并，尚未验证）

- [#158442](https://github.com/NousResearch/hermes-agent/pull/158442) — 修复 missing-path hint 探测继承 180s 超时的问题。
- [#158443](https://github.com/NousResearch/hermes-agent/pull/158443) — 修复 Desktop 将 busy gateway owner 当作 stale owner。
- [#158438](https://github.com/NousResearch/hermes-agent/pull/158438) — 修复 provider profile alias 的 model catalog 解析。
- [#158428](https://github.com/NousResearch/hermes-agent/pull/158428) — 修复 `search_files` offset 分页重复/跳过。
- [#158440](https://github.com/NousResearch/hermes-agent/pull/158440) — 修复自托管 STT 引擎无法解码 m4a/webm 等格式。
- [#158445](https://github.com/NousResearch/hermes-agent/pull/158445) — 修复 SOUL.md 加载失败后空内容覆盖真实文件。
- [#157624](https://github.com/NousResearch/hermes-agent/pull/157624) — Kanban quota wall 后按 provider 窗口等待，而非固定 300s 重试。
- [#89752](https://github.com/NousResearch/hermes-agent/pull/89752) — cron 在未显式设置 deliver 时尊重 `cron.default_delivery`。

**稳定性判断：** Windows 平台、gateway/session 状态、Kanban 自动化循环是当前风险集中区。今日新增修复 PR 数量不少，但多数未合并，尚不能视为风险下降。

---

## 6. 功能请求与路线图信号

### 高概率进入下一 canary / 补丁

这些项已有小范围 PR，路径较清晰，且多为 P2/P3 修复或低风险功能：

- [#158446](https://github.com/NousResearch/hermes-agent/pull/158446) — OpenRouter 通用 `-fast` / `-flex` tier alias，解决 tier 后缀被按字面发送后拒绝的问题。
- [#158419](https://github.com/NousResearch/hermes-agent/pull/158419) — 允许 `hermes kanban list` 在 `delegate_task` 子任务中运行。
- [#158442](https://github.com/NousResearch/hermes-agent/pull/158442) — 搜索 missing-path hint 超时边界。
- [#158443](https://github.com/NousResearch/hermes-agent/pull/158443) — Desktop gateway owner busy/stale 判定修复。
- [#158438](https://github.com/NousResearch/hermes-agent/pull/158438) — provider alias 与 models.dev catalog 解析修复。
- [#158428](https://github.com/NousResearch/hermes-agent/pull/158428) — `search_files` 分页稳定性。
- [#158440](https://github.com/NousResearch/hermes-agent/pull/158440) — STT 音频转码兼容自托管 OpenAI-compatible 引擎。
- [#158445](https://github.com/NousResearch/hermes-agent/pull/158445) — SOUL.md 失败加载保护。
- [#157624](https://github.com/NousResearch/hermes-agent/pull/157624) — Kanban quota wall 等待策略。
- [#89752](https://github.com/NousResearch/hermes-agent/pull/89752) — cron 默认投递配置生效。

### 中概率：需要评审/设计确认

- [#151935](https://github.com/NousResearch/hermes-agent/pull/151935) — 给插件提供 durable detached-result 写入和只读 state facade。
- [#157156](https://github.com/NousResearch/hermes-agent/pull/157156) — gateway 只读 `delivery.status` RPC，便于插件状态栏/运维观察投递结果。
- [#157157](https://github.com/NousResearch/hermes-agent/pull/157157) — Kanban 真实取消 in-flight task，避免继续消耗模型 turn。
- [#156606](https://github.com/NousResearch/hermes-agent/pull/156606) — 插件侧 `llm.credential_scope` + `llm.quota_observation`，按凭证归因配额与请求结果。
- [#72200](https://github.com/NousResearch/hermes-agent/pull/72200) — `agent.skills_catalog_mode` 压缩 chat 场景 skills catalog，降低稳定缓存前缀 token。

### 长周期/平台级路线图信号

- [#16084](https://github.com/NousResearch/hermes-agent/issues/16084) — Feishu 使用 CardKit streaming card 替代 `im.v1.message.update`，改善流式输出体验和限流问题。
- [#145171](https://github.com/NousResearch/hermes-agent/issues/145171) — 将 serve、remote Desktop、web 统一切到 gateway session authority，属于统一入口的后续架构收尾。
- [#155595](https://github.com/NousResearch/hermes-agent/issues/155595) — profile 创建与生命周期跟踪：provisioning、Honcho 清理、安全证明、模型继承、clone safety 等。
- [#66025](https://github.com/NousResearch/hermes-agent/issues/66025) — 长运行 Desktop 会话中 memory prompt 快照陈旧。
- [#149248](https://github.com/NousResearch/hermes-agent/issues/149248) — 后台工作在没有用户提示时无法持续跟进，live-subscriber handback 丢失。

**路线图判断：** 下一 canary 更可能吸收今日新提交的小范围修复和低风险功能；Feishu CardKit、统一入口 cutover、插件 API、profile 生命周期属于跨版本工程，短期不应期待一次性落地。

---

## 7. 用户反馈摘要

**真实痛点：**

- **更新失败恢复体验差**：[#125437](https://github.com/NousResearch/hermes-agent/issues/125437) 中用户反馈更新失败后半应用安装、原始错误直接暴露、没有产品内恢复，只能手工执行 recipe。这是最影响信任的 P1 体验问题。
- **桌面会话完整性不足**：[#137287](https://github.com/NousResearch/hermes-agent/issues/137287) 的 transcript 重复/错序/丢消息会让用户怀疑会话是否被正确保存；[#143767](https://github.com/NousResearch/hermes-agent/issues/143767) 的预压缩旧会话恢复导致模型切换被拒绝，进一步影响 messaging 场景。
- **Windows 平台问题密集**：`write_file` 永久拒绝（[#126622](https://github.com/NousResearch/hermes-agent/issues/126622)）、Scheduled Task 无法重启 gateway（[#91097](https://github.com/NousResearch/hermes-agent/issues/91097)）、Kanban workers 冻结（[#146440](https://github.com/NousResearch/hermes-agent/issues/146440)）、Telegram 连接超时（[#156504](https://github.com/NousResearch/hermes-agent/issues/156504)）。Windows 用户的实际使用路径仍不够稳定。
- **多 profile 部署存在规模化性能问题**：Windows 上文件系统元数据风暴（[#146538](https://github.com/NousResearch/hermes-agent/issues/146538)）、macOS 上 GIL 饥饿和 watchdog 重启（[#153727](https://github.com/NousResearch/hermes-agent/issues/153727)），说明多 profile 不是边缘场景，而是需要专门优化的部署形态。
- **Kanban 自动化可靠性不足**：无限 block bounce（[#75444](https://github.com/NousResearch/hermes-agent/issues/75444)）、重复分解（[#79728](https://github.com/NousResearch/hermes-agent/issues/79728)）、board removal orphan writer（[#156335](https://github.com/NousResearch/hermes-agent/issues/156335)）让自动化任务可能消耗资源却不产出。
- **后台任务不回报**：[#149248](https://github.com/NousResearch/hermes-agent/issues/149248) 用户描述长任务经常不回来，必须自己追，导致“委托工作”不可信。
- **外部贡献者被权限阻塞**：[#131859](https://github.com/NousResearch/hermes-agent/issues/131859) 68 评论，PR 创建权限错误持续存在，影响社区贡献流程。

**满意/积极信号：**

- 一些长期体验问题被关闭：[#128770](https://github.com/NousResearch/hermes-agent/issues/128770) WSL-less Windows 弹窗、[#84195](https://github.com/NousResearch/hermes-agent/issues/84195) skill description 截断。
- 本地化与 MCP 目录维护持续推进：[#92323](https://github.com/NousResearch/hermes-agent/pull/92323)、[#144109](https://github.com/NousResearch/hermes-agent/pull/144109)。
- 今日新增多个针对性修复 PR，说明维护者对桌面、搜索、provider alias、STT、SOUL.md 等具体问题响应较快。

---

## 8. 待处理积压

以下为创建时间较早、讨论量较高或风险等级较高、但仍未关闭/合并的代表项，建议维护者优先 triage。

| 类型 | 条目 | 创建/积压情况 | 关注理由 |
|---|---|---|---|
| P1 Issue | [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) | 2026-09-27，21 评论 | 更新失败半应用安装，无产品内恢复；P1 应优先于一般 P2。 |
| P2 Issue | [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) | 2026-10-23，85 评论 | 统一 gateway post-merge 问题总跟踪，讨论量最高，需要明确 owner 和收口计划。 |
| P3/blocked Issue | [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) | 2026-10-03，68 评论 | API PR 创建权限阻塞外部贡献者，虽 blocked/upstream，但社区影响大。 |
| P2 Issue | [#75444](https://github.com/NousResearch/hermes-agent/issues/75444) | 2026-07-31，13 评论 | Kanban 无限 block bounce，积压近 4 个月，自动化可靠性风险。 |
| P3 Issue | [#77253](https://github.com/NousResearch/hermes-agent/issues/77253) | 2026-08-03，15 评论 | 桌面代码块渲染错误，积压约 3.5 个月，影响日常阅读体验。 |
| P2 Issue | [#91097](https://github.com/NousResearch/hermes-agent/issues/91097) | 2026-08-20，11 评论 | Windows gateway watchdog 无法重启，平台稳定性问题。 |
| P2 Issue | [#93592](https://github.com/NousResearch/hermes-agent/issues/93592) | 2026-08-24，7 评论 | `background_review` 忽略 auxiliary fallback_chain，后台审查静默失败。 |
| P2 Issue | [#107149](https://github.com/NousResearch/hermes-agent/issues/107149) | 2026-09-10，7 评论 | 被杀 git 子进程留下 `<index>.lock`，checkpoint 永久失败直至手工清理。 |
| P2 Issue | [#126127](https://github.com/NousResearch/hermes-agent/issues/126127) | 2026-09-28，7 评论 | Kanban worker spawn 时 workspace 可 shadow `hermes_cli`，属于可复现的启动风险。 |
| P3 PR | [#72200](https://github.com/NousResearch/hermes-agent/pull/72200) | 2026-07-26，仍 OPEN | skills catalog 压缩，积压近 4 个月；与 token 成本和缓存命中相关。 |
| P2 PR | [#89752](https://github.com/NousResearch/hermes-agent/pull/89752) | 2026-08-19，仍 OPEN | cron 默认投递配置修复，积压约 3 个月；影响无人值守任务输出落点。 |
| P2 PR | [#130235](https://github.com/NousResearch/hermes-agent/pull/130235) | 2026-10-01，仍 OPEN | Desktop 流式 bubble 修复，与 transcript 完整性问题相关，建议确认是否能推进 #137287。 |

**积压提醒：** 当前 399 条 PR 待合并，建议按 `P1/P2 + platform/windows + session-state + kanban` 做一次集中 triage；对长期 OPEN 的 P2/P3 PR 标记 `needs-decision`、`needs-repro` 或明确关闭，避免审查队列继续膨胀。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**报告日期：2026-11-21** ｜ 数据窗口：过去 24 小时 ｜ 数据源：[github.com/AstrBotDevs/AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## 一、今日速览

1. **项目维持高强度运转**：24 小时内 Issues 更新 9 条、PR 更新 28 条，其中新开/活跃 Issue 8 条，PR 待合并 26 条，属于典型的“高提交、低合入”节奏。
2. **修复响应速度是本日最大亮点**：至少 4 条 Bug Issue（#11287、#11288、#11291、#11278）在当日即出现了对应 fix PR（#11290、#11289、#11292、#11279），社区→维护者的闭环基本在 24 小时内形成。
3. **质量与稳定性是今日主线**：Docker 优雅退出导致数据库损坏、WebUI 设备信任失效、插件页 token 泄漏到反代日志，三条问题分别触及数据安全、认证体验与凭据安全。
4. **“缓存命中”成为隐性技术主题**：#11276 的 RFC 讨论、#11284（Anthropic 自动缓存开关）、#11297/#11298（token 计费与压缩校准）共同指向同一诉求——让缓存优化成为默认行为而非文档注意事项。
5. **健康度评估：活跃度 A，评审吞吐量 B-**。26 条待合并 PR 中多条已滞留 3 周以上（#10843、#10850 均为 10-29 创建），评审带宽是当前最明显的瓶颈。

---

## 二、版本发布

**无新版本发布**（过去 24 小时 0 个 Release）。当前主线仍处于持续集成状态，最新提交被 Issue #11291 引用为 `feb3e82`，说明主分支仍在滚动更新但未打 tag。近期多条 fix PR 若集中合入，预计会形成一次以“稳定性 + Provider 计费准确性”为主题的补丁版本。

---

## 三、项目进展

### 今日关闭/合入
| PR/Issue | 内容 | 意义 |
|---|---|---|
| [#10506](https://github.com/AstrBotDevs/AstrBot/pull/10506) [CLOSED] | 修复插件详情页与 iframe 中的视图标题解析（Refs #10497，是 #10502 侧边栏修复的后续） | 关闭而非合并，说明方案被替代或拆分；插件视图 UI 一致性问题仍在收尾 |
| [#11293](https://github.com/AstrBotDevs/AstrBot/issues/11293) [CLOSED] | 询问 `template_list` 是否支持上传图片 | 属使用咨询类，2 条评论后关闭，未转化为代码变更 |

> 注：数据仅展示评论数最多的 20 条 PR，另 1 条关闭 PR 未在样本中，实际合入量可能略高于上表。

### 待合并队列中的高价值推进
- **运行时稳定性**：[#11290](https://github.com/AstrBotDevs/AstrBot/pull/11290) 为 PID 1 补上 SIGTERM handler，直接对应 Docker 场景的数据库损坏风险；[#11253](https://github.com/AstrBotDevs/AstrBot/pull/11253) 修复 `PluginManager.load()` 误删 loguru 根桥接 handler 导致插件加载后日志丢失；[#11252](https://github.com/AstrBotDevs/AstrBot/pull/11252) 修复命令别名吞掉用户参数（`hello h` 丢参）。
- **Provider 计量准确性**：[#11298](https://github.com/AstrBotDevs/AstrBot/pull/11298) 从 OneAPI/New-API 中转网关回填 Gemini 的 `usageMetadata` 缓存与 thought token（当前恒为 0）；[#11297](https://github.com/AstrBotDevs/AstrBot/pull/11297) 校准压缩后的 token 计数，修正兜底截断被误跳过的问题。
- **平台适配器兼容**：[#11285](https://github.com/AstrBotDevs/AstrBot/pull/11285)/[#11286](https://github.com/AstrBotDevs/AstrBot/pull/11286) 补齐 Telegram 相册与语音消息的 caption 透传；[#11078](https://github.com/AstrBotDevs/AstrBot/pull/11078) 让 Gemini 内置工具与 function calling 可共存（Gemini 3+ 当前会级联失败）。
- **工程化**：[#11295](https://github.com/AstrBotDevs/AstrBot/pull/11295) 合并 smoke/unit 测试并让 Windows 失败变为阻塞项——这是提升长期健康度的关键一步。

**整体推进度评估**：修复类 PR 覆盖了数据安全、日志、命令解析、计费四层，但**合入率仅 7%（2/28）**，项目“向前迈进”的实际速度受限于评审环节而非开发环节。

---

## 四、社区热点

| 排名 | 条目 | 互动 | 诉求分析 |
|---|---|---|---|
| 1 | [#11197](https://github.com/AstrBotDevs/AstrBot/issues/11197) 插件视图页面会话令牌进入 URL 与反代日志 | 4 评论 | **安全合规诉求**。`asset_token` 同时通过 `/_t/<token>/` 路径段与 `?asset_token=` query 两条路径落到 URL，被 Nginx 等反代默认写入 access log；叠加 7 天 TTL，等于把长效凭据散落到日志系统。报告者给出了精确到 `plugin_page_service.py#L548-L570` 的定位，是高质量安全报告。**当前无 fix PR，建议优先处理。** |
| 2 | [#11276](https://github.com/AstrBotDevs/AstrBot/issues/11276) 提示词前缀分层与统一上下文注入接口 RFC | 1 评论 | **成本诉求**。用户实测 DeepSeek v4 flash：缓存命中 25,977,216 token vs 未命中 109,891,623 token，命中率约 19%，认为大量可缓存前缀被动态注入内容破坏。诉求是“让不破坏缓存成为默认行为”，属架构级讨论，短期难落地但方向明确。 |
| 3 | [#11296](https://github.com/AstrBotDevs/AstrBot/issues/11296) 插件「天气守护」发布公告 | 1 评论 | **生态活力信号**。第三方插件以 issue 形式做发布公告（雨雪 15 分钟预警、每日三报、按强度分级措辞、按需跳过分钟级查询以省配额），说明插件分发仍依赖主仓库 issue 区，缺少更轻量的插件市场曝光通道。 |

---

## 五、Bug 与稳定性

按严重程度排列：

### 🔴 高 — 数据完整性风险
**[#11287](https://github.com/AstrBotDevs/AstrBot/issues/11287) Docker 下 `docker stop` / `compose down` 无法优雅退出，退出码 137，数据库易出错**
- 现象：SIGTERM 未被处理 → Docker 等待宽限期后 SIGKILL → 残留 `data_v4.db-wal` / `data_v4.db-shm`，需手动删除才能启动。
- 根因：`python main.py` 作为 PID 1 运行，仅通过 `asyncio.run` 注册了 SIGINT handler，内核会忽略 PID 1 未注册的信号。
- **已有 fix PR：[#11290](https://github.com/AstrBotDevs/AstrBot/pull/11290)**（显式处理 SIGTERM）。用户已验证 `stop_signal: SIGINT` 可规避，可作为临时 workaround 写入文档。

### 🟠 中高 — 凭据与认证
**[#11197](https://github.com/AstrBotDevs/AstrBot/issues/11197) 插件页会话令牌进入反向代理访问日志，TTL 7 天偏长** — **无 fix PR**，建议提级。

**[#11288](https://github.com/AstrBotDevs/AstrBot/issues/11288) 勾选“信任此设备 30 天”后仍需 TOTP** — 与 [文档](https://github.com/AstrBotDevs/AstrBot/blob/master/docs/zh/use/webui.md) 承诺不符。**已有 fix PR：[#11289](https://github.com/AstrBotDevs/AstrBot/pull/11289)**（将 `astrbot_totp_trusted_device` cookie 下发到 v1 登录路由）。

### 🟡 中 — 平台适配器功能缺失
**[#11281](https://github.com/AstrBotDevs/AstrBot/issues/11281) KOOK 私聊语音消息无法解析（tag `voice` 验证错误）** — v4.28.0 Docker，KOOK 新上线内置语音条无法接收转译。**无 fix PR**，影响单平台单一消息类型，但属功能不可用。

### 🟢 低 — UI / 配置 / 元数据
**[#11278](https://github.com/AstrBotDevs/AstrBot/issues/11278) 并发知识库导入时文档页丢失进度** — 第二次导入覆盖第一次的轮询 timer，服务端任务仍在跑但前端停止跟踪。**已有 fix PR：[#11279](https://github.com/AstrBotDevs/AstrBot/pull/11279)**（每个导入独立进度行与定时器）。

**[#11291](https://github.com/AstrBotDevs/AstrBot/issues/11291) `.github/FUNDING.yml` 非法 YAML 无法解析** — **已有 fix PR：[#11292](https://github.com/AstrBotDevs/AstrBot/pull/11292)**，零风险。

> **修复覆盖率：4/5 条 Bug 有对应 PR（80%）**，响应速度优秀；唯一缺口 #11197 恰是安全等级最高的一条。

---

## 六、功能请求与路线图信号

| 需求 | 来源 | 关联 PR / 判断 |
|---|---|---|
| **缓存友好的上下文注入架构** | [#11276](https://github.com/AstrBotDevs/AstrBot/issues/11276) RFC | 与 [#11284](https://github.com/AstrBotDevs/AstrBot/pull/11284)（Anthropic 自动 prompt caching 可开关，默认保持开启）、[#11297](https://github.com/AstrBotDevs/AstrBot/pull/11297)、[#11298](https://github.com/AstrBotDevs/AstrBot/pull/11298) 形成完整链条。**判断：#11284 大概率进入下一版本（纯增量、默认兼容）；#11276 的“前缀分层 + 统一注入接口”属架构改造，本季度内落地可能性低，但有望先出设计文档。** |
| **Anthropic 兼容网关的缓存标记兼容性** | [#11284](https://github.com/AstrBotDevs/AstrBot/pull/11284) | 真实痛点：部分兼容网关拒绝 cache marker 导致请求失败。开关式方案是最小侵入解。**判断：高概率合入。** |
| **Gemini 内置工具 + 自定义函数共存** | [#11078](https://github.com/AstrBotDevs/AstrBot/pull/11078)（Fixes #9937） | 自 #8833 允许共存后 Gemini 3+ 实际会级联失败，属“功能开了但用不了”。**判断：修复性质，应尽快合入。** |
| **插件页 bridge 结构化错误透传** | [#10850](https://github.com/AstrBotDevs/AstrBot/pull/10850)（Fixes #10849） | 当前 bridge 把结构化失败压平成 `Error(message)`，插件无法区分业务错误与兜底默认值。这是**插件生态可开发性的基础设施**，已滞留 23 天。 |
| **插件市场曝光通道** | [#11296](https://github.com/AstrBotDevs/AstrBot/issues/11296) | 第三方插件用 issue 做发布公告，是分发渠道不足的间接证据。属产品层信号，暂无 PR。 |
| **`template_list` 图片上传能力** | [#11293](https://github.com/AstrBotDevs/AstrBot/issues/11293)（已关闭） | 无结论关闭，需求本身（模板列表支持图片）可能仍存在，建议维护者确认是否为文档缺失。 |

---

## 七、用户反馈摘要

**痛点（不满意）**
- **凭据生命周期管理粗糙**：#11197 指出 token 既有路径段又有 query 两条泄漏面，且 TTL 长达 7 天——用户对“默认安全”的期待明显高于当前实现。
- **文档与行为不一致**：#11288 明确引用官方文档中“信任设备 30 天内免验证码”的描述来指出实现偏差，说明用户会认真读文档并以此为准绳，文档承诺需与代码同步。
- **容器化部署体验**：#11287 用户已自行定位到 PID 1 信号语义并验证 `stop_signal: SIGINT` 有效，这类“用户比项目更懂运维细节”的情况，反映官方 Docker 部署文档缺少信号处理说明。
- **成本不透明**：#11276 用户自建 DeepSeek 请求日志分析来统计 cache hit/miss，说明内置的 token 计费展示不足以支撑成本优化决策——这也解释了为何 #11297/#11298 的计量修复如此关键。

**满意/正向**
- 高质量 Issue 模板（版本、部署方式、适配器、日志、检查清单）显著降低了 triage 成本，#11287、#11197、#11281 均按模板完整填写。
- 多条 Issue 在 24 小时内获得 fix PR，社区对响应速度的正向预期正在形成。

**典型使用场景**：Docker + 阿里云 ECS 2C2G 小规格部署、DeepSeek/Qwen 双模型分工（对话 + 视觉）、KOOK/Telegram/Lark 多平台并行、插件生态重度依赖（知识库、天气、自定义工具）。

---

## 八、待处理积压（提醒维护者关注）

| 条目 | 类型 | 滞留时长 | 风险提示 |
|---|---|---|---|
| [#10850](https://github.com/AstrBotDevs/AstrBot/pull/10850) 插件页 bridge 结构化错误透传 | PR | **23 天**（10-29 起） | 阻塞插件生态开发体验，改动面明确、Fixes 已关联，建议优先评审 |
| [#10843](https://github.com/AstrBotDevs/AstrBot/pull/10843) Lark 平台策略错误保留 token 诊断信息 | PR | **23 天**（10-29 起） | 对应 #10802，Lark/飞书个人版与豆包租户自 10 月中起持续 `code=21001`；虽无法绕过平台策略，但当前错误提示不完整，用户难以自查 |
| [#10538](https://github.com/AstrBotDevs/AstrBot/pull/10538) 文档：隔离会话对 `session_id` / `unified_msg_origin` 的影响 | PR（docs） | **40 天**（10-12 起） | 纯文档、零风险，却长期未合。开启 `unique_session` 后群会话 ID 被重写，按原值存数据的插件会静默串会话——这是**隐性数据错乱**，文档缺失成本高 |
| [#10506](https://github.com/AstrBotDevs/AstrBot/pull/10506) 插件视图标题解析 | PR | 41 天后关闭（11-20） | 建议在关闭说明中给出替代方案链接，避免贡献者重复劳动 |
| [#11078](https://github.com/AstrBotDevs/AstrBot/pull/11078) Gemini 内置工具 + function calling | PR | 10 天（11-11 起） | 修复的是“已有功能实际不可用”，影响 Gemini 3+ 用户 |
| [#11181](https://github.com/AstrBotDevs/AstrBot/pull/11181) 保留 schema 合法的动态工具参数 | PR | 5 天（11-16 起） | `{"paper": 12}` 这类合法参数被丢弃，直接影响工具调用成功率 |
| [#11197](https://github.com/AstrBotDevs/AstrBot/issues/11197) 插件页 token 泄漏 | Issue | 4 天，**无 PR** | 唯一“高危 + 无修复”组合，建议本周内至少给出处理结论（缩短 TTL / 改用 header / 日志脱敏） |

---

### 维护者建议（3 条）

1. **本周设一次“评审冲刺”**：26 条待合并 PR 中有 5 条已超 3 周，其中 #10538（文档）、#11292（YAML 语法）属零风险改动，合入成本极低，可快速降低队列压力。
2. **给 #11197 定性**：这是本日唯一“高危且无 fix”的条目，即便完整重构需时间，也应先落地缓解措施（TTL 从 7 天缩短、或在文档中明确反代需对 `/_t/` 与 `asset_token` 做日志脱敏）。
3. **把 #11276 的 RFC 转成设计文档**：缓存命中率 19% 的实测数据很有说服力，且已有 #11284/#11297/#11298 三条 PR 分散推进同一目标，建议合并为一个“上下文与计费准确性”里程碑统一跟踪，避免碎片化。

---
*报告基于 GitHub 公开数据自动生成；PR 样本为评论数最多的 20/28 条，合入统计可能存在少量偏差。*

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目日报 · 2026-11-21

> 数据窗口：2026-11-20 → 2026-11-21｜仓库：github.com/deepseek-ai/deepseek-harness
> 说明：该仓库**未启用 GitHub Issues / Pull Requests**，代码合并经 Releases 落地，社区讨论全部集中在 Discussions。本报告据此以 Discussions 为主要素材。

---

## 1. 今日速览

- **讨论活跃度：高。** 过去 24 小时 Discussions 更新 **160 条**，Top 15 热帖评论数集中在 4–24 条区间，说明讨论深度而非一次性刷屏。
- **发版节奏：静默。** 今日新版本 **0 个**，无 changelog 合并摘要可引用；项目采用"发布门控"合并模式，代码层推进在两次 release 之间不可观测。
- **情绪与议题：以稳定性投诉为主。** Top 15 中 **9 条为 Bug 类**（含 1 条数据丢失、2 条启动阻断），功能/想法类仅 3 条，社区当前处于"用起来但被边角问题绊住"的阶段。
- **结构性风险：积压老化。** Top 15 中有 **6 条创建于 8–10 月**（最久 95 天），全部仍为 OPEN、👍 为 0，其中 3 条同属"compaction"子系统，疑为同一回归的多点爆发。
- **健康度评估：中等偏上偏"热"** —— 参与度高、问题定位质量高（多条附根因与修复建议），但**响应闭环信号缺失**，若 v0.2.2 正式版前不收敛 compaction 与 Windows 桌面两类问题，正式版发布口碑将受影响。

---

## 2. 版本发布

**今日无新版本发布**（新版本：0 个；最新 Releases：无）。

因此本日**无版本级合并摘要**可供核对。需注意：这并不等于代码无推进 —— 该仓库的合并动作被压缩进 Release changelog，在两次发版之间对社区不可见。建议维护者在下一个 release 中补齐 changelog 的"问题 → 修复"映射，以便社区核对以下两个版本线（0.2.x 与 Next）的修复覆盖情况。

---

## 3. 项目进展

- **代码层：本日无可观测进展。** 无 Release 落地 → 无合并摘要，无法评估今日合并了哪些功能或修复。这是发布门控模式的固有观测盲区，而非"零合并"。
- **社区层：进展体现为高标准的问题定位资产。** 今日活跃的多条帖子已超出"报 Bug"范畴，具备可直接转 PR 的工程质量：
  - [#7212](https://github.com/deepseek-ai/deepseek-harness/discussions/7212) 给出 compaction 自我引用的完整失败链（59/79 次尝试被 shrink guard 拒绝，单会话烧掉 44.6 分钟）。
  - [#10167](https://github.com/deepseek-ai/deepseek-harness/discussions/10167) 定位 Gemini 3.x 的 `$ref: "#/$defs/loaderExpression"` 被误判为多模态 `display_name`，并附修复建议。
  - [#13386](https://github.com/deepseek-ai/deepseek-harness/discussions/13386) 定位 `dsh-web` 产物 `import { z } from 'zod'` 但 manifest 未声明依赖，严格 pnpm 安装下 typert 注册失败。
- **待落地清单（建议纳入下一 release changelog）**：compaction 触发与收敛逻辑（#7212/#8079/#8088）、macOS 无边框窗口拖拽回归（#12261）、`dsh-web` 的 `zod` 依赖声明（#13386）、Windows 桌面 Host 握手重试策略（#13565）。

---

## 4. 社区热点

| 排名 | 讨论 | 评论 | 核心诉求 |
|---|---|---|---|
| 1 | [#3157 llm-pi-ai 本地 LLM 超时上调](https://github.com/deepseek-ai/deepseek-harness/discussions/3157) | 24 | 300s 硬超时无法满足本地大模型长 prompt，希望 20 分钟可配置 |
| 2 | [#8581 deepseek-v4-flash 长任务重复死循环](https://github.com/deepseek-ai/deepseek-harness/discussions/8581) | 6 | 模型反复"将要运行 git status"却不出 tool-call，回合无法终止 |
| 3 | [#12261 macOS 0.2.2-rc.1 窗口无法拖动](https://github.com/deepseek-ai/deepseek-harness/discussions/12261) | 6 | 无边框窗口丢失可拖拽区域，0.2.1-rc.5 正常 |
| 4 | [#10593 Windows 沙箱 Low 完整性标签传染](https://github.com/deepseek-ai/deepseek-harness/discussions/10593) | 6 | 整树 Low 标签导致 exe 无法写配置/注册表、托盘图标缺失 |
| 5 | [#13386 dsh-web 缺失 zod 依赖](https://github.com/deepseek-ai/deepseek-harness/discussions/13386) | 5 | 严格 pnpm 环境下 typert 贡献者注册失败 |
| 6 | [#11740 跨厂商 Agent 长期记忆共享](https://github.com/deepseek-ai/deepseek-harness/discussions/11740) | 5 | 外部开源项目求评审与批评（生态互操作诉求） |

**分析**：热度最高的 #3157 是唯一"非缺陷"型长贴（24 条评论），指向一个明确的**产品缺口 —— 本地 LLM 用户的超时不可配置**，这类用户在 Ollama / 自托管场景下占比不低，属于低成本高收益的配置项需求。其次，热点高度集中在**"Agent 卡住不动"**这一类体验（#8581 死循环、#7212 compaction 不收敛），本质都是"缺少兜底终止机制"，是 Agent 类产品最伤信任度的失败模式。

---

## 5. Bug 与稳定性

按严重程度排序（该项目无 PR 机制，故"fix PR"列以**是否已有发版修复信号/根因建议**代替）：

| 级别 | 问题 | 影响 | 修复进展 |
|---|---|---|---|
| 🔴 严重（数据丢失） | [#13528 未规范化路径 + 全权限执行 `rd /s /q "C:\"`，删除 1.75 GB](https://github.com/deepseek-ai/deepseek-harness/discussions/13528) | 破坏性工具调用缺少门禁 | **无 fix 信号**；楼主已于 11-20 在评论中更正时间线与根因（zeroing 未复现），诉求为"对破坏性 tool call 加闸门" |
| 🟠 高（阻断/退化） | [#13565 Windows 桌面启动握手 ECONNRESET，Host 本身健康、重试无效](https://github.com/deepseek-ai/deepseek-harness/discussions/13565) | 0.2.2-rc.3 在 Win10 22H2 无法启动 | 无 fix 信号 |
| 🟠 高（回归） | [#12261 macOS 无边框窗口无可拖拽区域](https://github.com/deepseek-ai/deepseek-harness/discussions/12261) | 0.2.1-rc.5 → 0.2.2-rc.1 回归，窗口不可移动 | 无 fix 信号；已确认非窗口锁定（AXPosition 可写） |
| 🟠 高（会话不可用） | [#8581 deepseek-v4-flash 重复生成死循环，无重复输出检测兜底](https://github.com/deepseek-ai/deepseek-harness/discussions/8581) | 长任务中段卡死，回合无法终止 | 无 fix 信号；官方模型 + 官方 Harness 组合，优先级应最高 |
| 🟠 高（资源浪费） | [#7212 compaction 把上次 checkpoint 当作整个 span，长会话永不收敛](https://github.com/deepseek-ai/deepseek-harness/discussions/7212) | 59/79 次尝试被拒，44.6 分钟被烧掉 | 无 fix 信号；与 #8079/#8088 构成同一子系统集群 |
| 🟡 中（安装期失败） | [#13386 dsh-web 产物引用 zod 但未声明依赖](https://github.com/deepseek-ai/deepseek-harness/discussions/13386) | 严格 pnpm 安装下 typert 无法注册、启动报错 | 根因明确，属 manifest 一行修复量级 |
| 🟡 中（会话锁死） | [#10167 Gemini 3.x 调用 `cordis_inspect_query` 后永久 HTTP 400](https://github.com/deepseek-ai/deepseek-harness/discussions/10167) | 历史重放持续触发同一校验错误，会话彻底卡死 | 已附根因与修复建议，属三方兼容层问题 |
| 🟡 中（安全软件冲突） | [#8225 临时 PowerShell 脚本被火绒高频告警](https://github.com/deepseek-ai/deepseek-harness/discussions/8225) | `%TEMP%\dsh-native-command-*` + Bypass 执行，行为与 dropper 同构 | 无 fix 信号；属"合法功能被误判"，需改执行策略或加签名 |
| 🟢 低（配置项） | [#3157 本地 LLM 超时不可配置](https://github.com/deepseek-ai/deepseek-harness/discussions/3157) | settings.yaml 尝试无效 | 无 fix 信号 |

**趋势判断**：**compaction 子系统是当前最集中的缺陷源**（#7212 / #8079 / #8088 三条独立报告，均指向 0.1.7 引入的 two-term minimum 触发逻辑）。三条帖各自为战、未被合并跟踪，会持续消耗社区重复排查成本 —— 建议维护者开一个汇总帖或在 release note 中一次性说明。

---

## 6. 功能请求与路线图信号

| 需求 | 讨论 | 纳入下一版本的可能性评估 |
|---|---|---|
| 破坏性 tool call 门禁 / 路径规范化 | [#13528](https://github.com/deepseek-ai/deepseek-harness/discussions/13528) | **较高**。数据丢失级事故 + 明确的实现点（路径归一化 + 高危命令确认），且与沙箱模块（#10593）同域，适合打包进安全加固版本 |
| 本地 LLM 超时可配置 | [#3157](https://github.com/deepseek-ai/deepseek-harness/discussions/3157) | **高**。24 条评论为今日最高热度，改动面小（配置项透传），且 `llm-pi-ai` 已有 provider 抽象可承载 |
| 重复输出检测 / 回合级熔断 | [#8581](https://github.com/deepseek-ai/deepseek-harness/discussions/8581) | **中高**。属于 Harness 侧可独立实现的兜底（n-gram 重复率 + 强制终止），不依赖模型侧修复 |
| `dsh://open?session=` 深链 | [#13820](https://github.com/deepseek-ai/deepseek-harness/discussions/13820) | **中**。当前 `dsh://open` 仅聚焦主窗口，外部工具（Agent HUD、通知、脚本）无法直达会话；协议解析改动局部 |
| Chat Mode（复用 DeepSeek Web 账号，插件形态） | [#13217](https://github.com/deepseek-ai/deepseek-harness/discussions/13217) | **低（本期）**。涉及账号体系与网页端互通，合规与工程成本高，更适合作为中长期路线图项 |
| 跨 Agent 共享记忆层 | [#11740](https://github.com/deepseek-ai/deepseek-harness/discussions/11740) | **低（本期）**。属外部项目寻求反馈，非本仓库实现诉求，但反映生态对"记忆互操作"的真实兴趣 |

---

## 7. 用户反馈摘要

**真实痛点**
1. **"配置改了不生效"** —— #3157 用户明确表示"试过在 settings.yaml 加一行，要么没效果要么写错了"，说明本地 LLM 的超时/参数缺少**可发现、可校验**的配置入口（无 schema 提示、无生效确认）。
2. **"Agent 卡住但不报错"** —— #8581 的现象极其典型：模型持续输出"将要执行 git status"却永不发 tool-call。#7212 则是"每步都重试 compaction"。两者共同点是**失败静默**，用户只能靠肉眼与计费时长发现异常。
3. **"更新即回归"** —— #12261（macOS 拖拽）、#8088（"更新到 Next 后每几步就 compaction"）显示 rc 通道用户对回归的敏感度很高，且缺乏快速的版本回退指引。
4. **"被当成病毒"** —— #8225 的火绒告警，暴露 Windows 上"随机目录 + 内嵌 C# + ExecutionPolicy Bypass"这套实现方式的信任成本，企业环境用户会直接受阻。

**使用场景**
- 本地/自托管 LLM（Ollama + Gemma4:12b on Win11）—— #3157
- 长会话编码 Agent（本地开发构建，跨多轮 tool-call）—— #8581、#7212
- Windows 桌面 + 沙箱开发者（PowerShell 7.4 / Node 22）—— #10593、#13565
- 严格依赖管理的 monorepo 集成（pnpm）—— #13386
- 多模型混用（Gemini 3.x 与 DeepSeek 并存）—— #10167

**满意点**：多条帖子对根因的分析深度（含复现步骤、日志、修复建议）表明用户**愿意投入工程成本参与共建**，这通常只发生在对产品有留存意愿的用户群中。
**不满意点**：集中在"缺少兜底与门禁"（无重复输出熔断、无破坏性命令确认、无压缩收敛上限）与"缺少可观测性"（超时/压缩触发过程不透明）。

---

## 8. 待处理积压（提醒维护者关注）

| 存续时长 | 讨论 | 为何值得优先处理 |
|---|---|---|
| **95 天**（2026-08-18 起） | [#3157 本地 LLM 超时](https://github.com/deepseek-ai/deepseek-harness/discussions/3157) | 今日热度第一（24 评论），却已挂了三个月；改动成本低，属"低成本高口碑"项 |
| **63 天**（2026-09-20 起） | [#7212 compaction 自我引用不收敛](https://github.com/deepseek-ai/deepseek-harness/discussions/7212) | 有量化损失（44.6 分钟/会话），与 #8079/#8088 同源，建议合并跟踪并给出版本归属 |
| **55 天**（2026-09-27 起） | [#8079 `headroomTokens` 绝对值压垮小上下文窗口](https://github.com/deepseek-ai/deepseek-harness/discussions/8079) | 设计层问题（绝对值 vs 比例），需在 compaction 重构时一并决策 |
| **54 天**（2026-09-28 起） | [#8088 上下文仅 50% 就频繁 compaction](https://github.com/deepseek-ai/deepseek-harness/discussions/8088) | 与 #8079 互为印证，社区已自行完成交叉验证 |
| **53 天**（2026-09-29 起） | [#8225 火绒误报临时脚本](https://github.com/deepseek-ai/deepseek-harness/discussions/8225) | 安全软件冲突会直接导致企业采购评估失败 |
| **51 天**（2026-10-01 起） | [#8581 deepseek-v4-flash 重复死循环](https://github.com/deepseek-ai/deepseek-harness/discussions/8581) | 涉及官方模型 + 官方 Harness 组合，是最该由官方定性的问题（模型侧 or Harness 侧） |
| **34 天**（2026-10-18 起） | [#10167 Gemini 3.x HTTP 400 锁死会话](https://github.com/deepseek-ai/deepseek-harness/discussions/10167) | 已附根因与修复建议，缺的只是一个版本归属确认 |

**维护建议（按投入产出排序）**
1. 为 **compaction 集群（#7212 / #8079 / #8088）** 出一个统一回复帖，说明根因、目标版本与临时规避参数 —— 一次性关掉三条长贴的重复排查。
2. 把 **#13528（数据丢失）** 升为最高优先级并给出官方定性：路径未规范化 + 全权限 = 必然事故，门禁机制不宜再等。
3. 在下一个 release changelog 中显式列出"已修复 / 已知未修复"清单，弥补无 PR 可见性带来的信任缺口。
4. **#13386（zod 依赖）** 属一行修复，可搭任意 rc 顺风车发布，快速兑现"有人在看"的信号。

---

*本报告基于 2026-11-21 抓取的 GitHub Discussions 数据（160 条更新中的 Top 15）生成；因仓库未启用 Issues/PR 且今日无 Release，代码层进展不可观测，相关结论以社区信号为准。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*