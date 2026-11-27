# OpenClaw 生态日报 2026-11-27

> Issues: 362 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-27 03:51 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-11-27

> 数据窗口：2026-11-26 → 2026-11-27（24h）｜数据源：GitHub Issues / PRs
> 说明：PR 列表未提供评论数（显示为 undefined），故 PR 部分按标签、规模与时效性排序；Issues 仅展示评论数 Top 50，绝对量统计基于全量计数。

---

## 1. 今日速览

1. **高强度维护日，零发布**：24h 内 Issues 更新 362 条（新开/活跃 262、关闭 100，关闭率 27.6%），PR 更新 500 条（待合并 288、合并/关闭 212，处理率 42.4%），新版本 0 个 —— 项目处于"高频修补、版本静默"状态。
2. **review 带宽是当前瓶颈**：待合并 PR 存量（288）已是单日合并/关闭量（212）的 1.36 倍，且今日新开 PR 多为 XL/L 规模（#206295、#206241、#206337、#206088 均为 XL），合并吞吐存在结构性压力。
3. **风险高度集中**：Top 50 Issues 中约 **12 条指向 Gateway 内存/资源泄漏**（跨 Linux x64、ARM64、Windows、macOS、Docker 复现），约 **9 条指向自更新与回滚链路失败**，两条主线合计占头部议题的四成以上。
4. **更新链路正在重构期**：#204775（38 条评论）承接 prepared-release 更新的状态/归属/计划设计，#206295（XL, P1）已提交"禁止复用外部 recovery 记录作为准入"的实现，说明该域短期仍会有回归波动。
5. **健康度判断**：活跃度**高**、响应**积极**（含 2 条 28–29 评论的长期议题今日关闭），但稳定性债务集中于"资源生命周期"与"自更新"两块地基，属 **高活跃 / 中等风险** 状态。

---

## 2. 版本发布

今日无新版本发布，本节省略。当前讨论中的版本线为 stable `2026.11.8` 与 `2026.11.10(-beta)`（见 [#205402](https://github.com/openclaw/openclaw/issues/205402)、[#203442](https://github.com/openclaw/openclaw/issues/203442)）。

---

## 3. 项目进展

### 3.1 今日关闭的重要 Issue（长期议题收敛）

| Issue | 级别 | 评论 | 推进意义 |
|---|---|---|---|
| [#182891](https://github.com/openclaw/openclaw/issues/182891) Prompt cache 从不复用（`cache read dropped N -> 0`） | P2 / silver | 29 | 直接影响推理成本与延迟，是"缓存失效"族（含 #186683、#155878、#143017）的根节点之一 |
| [#153426](https://github.com/openclaw/openclaw/issues/153426) `MEMORY.md` / `USER.md` 被 provenance ratchet 永久排除出 bootstrap 注入 | **P0** / diamond | 28 | 记忆系统最严重的静默失效问题，涉及安全审查与产品决策，关闭含金量高 |
| [#200606](https://github.com/openclaw/openclaw/issues/200606) Candidate Doctor 以 plugin migration 冲突阻断更新 | P1 | 21 | 更新链路阻塞类 |
| [#170496](https://github.com/openclaw/openclaw/issues/170496) 每次只读访问复制整份 state-DB 快照 | P2 | 12 | 磁盘/IO 放大问题 |
| [#157712](https://github.com/openclaw/openclaw/issues/157712) 每次 CLI 状态读取泄漏 162MB 快照，25 分钟 23GB | P2 | 9 | 与上条同源，属资源泄漏族 |
| [#144876](https://github.com/openclaw/openclaw/issues/144876) 工具型 dashboard 会话在 length finalization 失败后静默结束 | P2 | 10 | 消息丢失类 |
| [#193673](https://github.com/openclaw/openclaw/issues/193673) Windows 更新备份遇 EBUSY 且不指明文件 | P2 | 8 | 更新可诊断性 |
| [#186413](https://github.com/openclaw/openclaw/issues/186413) `sessions_send` 触发 `NO_REPLY` 被判为 empty_response | P2 / diamond | 7 | 会话语义 |
| [#202314](https://github.com/openclaw/openclaw/issues/202314) stdio MCP 服务与进程监管包装器未被回收 | P2 | 7 | 内存增长来源之一 |
| [#161781](https://github.com/openclaw/openclaw/issues/161781) Signal 引用 bot 消息不产生隐式 mention 事实 | P2 / diamond | 8 | 渠道语义补齐 |

**解读**：今日关闭清单呈现明显的"清扫积压"特征——多条 9 月创建、评论 7–29 条的议题集中收敛，其中 #153426 是 P0 + diamond lobster + 安全审查三重标记的高价值条目，属于本日最有分量的进展。

### 3.2 今日合并/关闭的 PR

- [#204671](https://github.com/openclaw/openclaw/pull/204671) docs：明确 OpenClaw 默认发送哪些遥测、如何退出（含 Docker / Nix 场景）— **CLOSED**，回应外部公开质疑，属信任面修复。
- [#206316](https://github.com/openclaw/openclaw/pull/206316) refactor(ui)：移除已废弃的 stream-follow 测试接缝 — **CLOSED**，纯测试卫生。
- [#202266](https://github.com/openclaw/openclaw/pull/202266) fix(access)：角色选择器中 invite-only 角色显示可读描述而非 `sessions.invited` 原始键 — **CLOSED**。

**整体推进度评估**：功能面净增量有限，本日主要价值在"减债"——关闭 10 条中高价值 Issue、清理 3 条 PR。但 500 条 PR 更新中仅 212 条落地，且 XL PR 集中上浮，明日 review 队列压力会继续累积。

---

## 4. 社区热点

| 排名 | 条目 | 评论 | 诉求分析 |
|---|---|---|---|
| 1 | [#91588](https://github.com/openclaw/openclaw/issues/91588) **P0** Gateway 内存泄漏：RSS 350MB → 15.5GB / 2–3 天，反复 OOM | 42 | 项目当前**最长寿、最热**的 P0（2026-06-09 起，更新至 11-26）。用户描述了 `launchd-handoff` 重启循环，属"服务不可用级"故障。标签为 `no-new-fix-pr` + `needs-maintainer-review`，意味着**五个月后仍无明确修复 PR**，是社区信任的最大单点风险。 |
| 2 | [#204775](https://github.com/openclaw/openclaw/issues/204775) Design：prepared-release 更新的状态、归属与计划 | 38 | 3 天内积累 38 条评论，明确动机是"**停止不同设计在同一批文件上互相碰撞**"。这是维护者主动收敛更新域架构的信号，也解释了今日多条更新回归的根因——重构进行中。 |
| 3 | [#182891](https://github.com/openclaw/openclaw/issues/182891) Prompt cache 从不复用（**已关闭**） | 29 | 用户侧对 **token 成本**高度敏感：`envelope rewrites` + `runtimeContextCarrier` 变更 + 轮内掉缓存三重叠加。关闭是成本议题的重要缓解。 |
| 4 | [#159662](https://github.com/openclaw/openclaw/issues/159662) **P1** `prepared-model-catalog.worker.js` 无界泄漏，~4–5 GB/h | 29 | 用户已做"冷重启 + provider 二分"排除法，证明与 provider 无关。标签含 `not-repro-on-main`，形成"用户稳定复现 / main 不复现"的僵局，是典型的发布版与主干诊断能力断层。 |
| 5 | [#153426](https://github.com/openclaw/openclaw/issues/153426) 记忆根文件被永久排除（**已关闭**） | 28 | 痛点极强："静默、无诊断、无 CLI、无恢复"。用户强调**普通 agent 行为（一次 web search）即可触发**，等于记忆系统存在不可逆自损路径。 |

**背后共性**：热度最高的 5 条里，4 条是"**静默失效 + 无自愈路径**"型问题（OOM 重启循环、缓存静默清零、记忆静默丢弃）。社区真正的不满不是"有 bug"，而是"**出问题时不告诉我、也不给我工具**"。

---

## 5. Bug 与稳定性

### P0（服务不可用 / 数据与安全边界）

| Issue | 症状 | Fix PR 状态 |
|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | RSS 350MB→15.5GB，OOM 循环重启 | ❌ `no-new-fix-pr`，**5 个月未收敛** |
| [#89278](https://github.com/openclaw/openclaw/issues/89278) | Codex OAuth 刷新成功但 cron/heartbeat 因 10s 超时失败 | 🔶 `linked-pr-open`（有 PR 关联） |
| [#141413](https://github.com/openclaw/openclaw/issues/141413) | macOS app 对使用 SecretRef 的本地 Gateway 不发送 token | ❌ `no-new-fix-pr` + `needs-security-review` |
| [#194664](https://github.com/openclaw/openclaw/issues/194664) | Codex protected continuation 阻断全部后续对话，而 Stop 报告"无活跃 run" | 🔶 `linked-pr-open` |
| [#202518](https://github.com/openclaw/openclaw/issues/202518) | `sessions_spawn` + `sessions_yield` 后 claude-cli run 永不关闭，后续轮次复用死会话 | ❌ 无 fix PR |
| [#203065](https://github.com/openclaw/openclaw/issues/203065) | macOS app 自带 Gateway 卡在 2026.11.4，stale-service 替换被跳过，凭据恢复循环 | ✅ `fix-shape-clear` + `queueable-fix`（修复路径已明确、可排队） |
| [#201472](https://github.com/openclaw/openclaw/issues/201472) | 无 `processNamespace` 的死锁文件被当作"活跃持有者"，阻断维护并回滚 2026.11.5 更新 | 🔶 待产品决策 |

### P1（性能退化 / 会话状态 / 消息丢失）

**内存与资源族（最大簇）**
- [#159662](https://github.com/openclaw/openclaw/issues/159662) worker 线程 4–5 GB/h 单调泄漏（`not-repro-on-main`）
- [#182369](https://github.com/openclaw/openclaw/issues/182369) 堆外 RSS 约 0.1 GiB/h 增长，**内部 `rss_threshold` 监控从不触发**
- [#154812](https://github.com/openclaw/openclaw/issues/154812) V8 堆外 RSS 失控导致宿主 OOM + 关机超时
- [#184843](https://github.com/openclaw/openclaw/issues/184843) 2–4 天 +1 GiB，cgroup 峰值 22.9 GB，启动 56–125s
- [#181432](https://github.com/openclaw/openclaw/issues/181432) ARM64 启动基线 1.89 GB（原 ~300 MB）+ SQLite 事务 >1.5s
- [#195497](https://github.com/openclaw/openclaw/issues/195497) 17 小时涨至 ~3 GB（2026.11.1）
- [#192547](https://github.com/openclaw/openclaw/issues/192547) 受限 ARM64（1 GiB cgroup）首次模型响应前即 OOM
- [#163107](https://github.com/openclaw/openclaw/issues/163107) HEIC `view_image` 每次失败残留 250–400 MB

**更新 / 回滚族**
- [#204816](https://github.com/openclaw/openclaw/issues/204816) 2026.11.4→11.8 通过全部预检后，激活阶段 Doctor `Invalid config` 回滚 — ✅ `fix-shape-clear` + `queueable-fix`
- [#200756](https://github.com/openclaw/openclaw/issues/200756) Windows beta.2→beta.4 `package-swap` 基线扫描失败
- [#203442](https://github.com/openclaw/openclaw/issues/203442) deepseek 插件 "Doctor source must be prepared before loading"
- [#205402](https://github.com/openclaw/openclaw/issues/205402) Docker 11.8→11.10 入口 Doctor 卡在 "Database engines"，网关永不监听

**性能 / 会话 / UI**
- [#196199](https://github.com/openclaw/openclaw/issues/196199) Codex helper 完成无法唤醒父 agent，用户被锁在助手之外（2026.10.10 起回归）
- [#196820](https://github.com/openclaw/openclaw/issues/196820) Control UI 在 `Element.getAnimations()` 循环中 ~100% CPU 卡死
- [#171831](https://github.com/openclaw/openclaw/issues/171831) Windows 启动 320s（vs 55s）、单轮事件循环阻塞 112s
- [#160485](https://github.com/openclaw/openclaw/issues/160485) 插件加载 CPU-bound，3 个渠道插件占 60s 阶段中的 57.4s
- [#161379](https://github.com/openclaw/openclaw/issues/161379) 模型目录刷新循环（TTL 60s < 刷新耗时）永久占满一核
- [#157605](https://github.com/openclaw/openclaw/issues/157605) `sessions.list` 物化卡死，CPU 240–276% 持续数小时
- [#203465](https://github.com/openclaw/openclaw/issues/203465) `runTimeoutSeconds` 到期被误判为模型失败 → 整个子任务按 fallback 重启（60s 限制在 225s 后才上报） — 🔶 `linked-pr-open`
- [#161403](https://github.com/openclaw/openclaw/issues/161403) agent DB 校验耗时 128.8s
- [#200148](https://github.com/openclaw/openclaw/issues/200148) macOS 进程内 `/restart` 永久挂起，launchd 不再拉起
- [#198830](https://github.com/openclaw/openclaw/issues/198830) LM Studio embedding 预加载请求 32768 上下文，16 GB 主机 OOM

### P2/P3（体验与正确性）
[#103067](https://github.com/openclaw/openclaw/issues/103067) 会话命名与子 agent 生命周期未统一 ｜ [#141172](https://github.com/openclaw/openclaw/issues/141172) 早夭 run 永久泄漏 `agent.run.started`，轨迹 flush 外键失败 ｜ [#200781](https://github.com/openclaw/openclaw/issues/200781) Sessions 侧栏只渲染 agent 分组、无会话行 ｜ [#186683](https://github.com/openclaw/openclaw/issues/186683) claude-cli 每次表面切换即全量重写 prompt cache ｜ [#143206](https://github.com/openclaw/openclaw/issues/143206) Dreaming 有 pending 叙事仍记为成功、不重试 ｜ [#130247](https://github.com/openclaw/openclaw/issues/130247) cron 无 `--until` / `--max-runs` ｜ [#136714](https://github.com/openclaw/openclaw/issues/136714) Codex 子 agent 被内置 deny list 打成策略受限。

> ⚠️ **需 triage 的异常条目**：[#205007](https://github.com/openclaw/openclaw/issues/205007) 内容为账号被盗叙述 + Go 标准库源码片段，缺少可复现信息，疑为误投/非项目问题，建议维护者快速归类以降低噪音。

**稳定性小结**：`fix-shape-clear` / `queueable-fix` 标记今日仅出现在 #204816、#203065、#186413 等少数条目上；内存族**没有一条**带可执行修复 PR，且 #182369 明确暴露出"自监控阈值对该类泄漏失效"——即**项目自身看不见这个问题**，这是比单个泄漏更严重的系统性缺陷。

---

## 6. 功能请求与路线图信号

### 大概率进入下一版本（有实现 PR 支撑）

| 方向 | 信号 | 判断依据 |
|---|---|---|
| **更新链路可靠性** | [#206295](https://github.com/openclaw/openclaw/pull/206295)（XL, P1，禁止外部 recovery 记录授予准入）、[#205011](https://github.com/openclaw/openclaw/pull/205011)（P1，cold session archive 先于 reimport 恢复，platinum hermit）、[#206343](https://github.com/openclaw/openclaw/pull/206343)（拒绝以 root 更新他人账号的 system service）、[#206341](https://github.com/openclaw/openclaw/pull/206341)（修复 11-17~11-19 main 构建的半切换）、[#206252](https://github.com/openclaw/openclaw/pull/206252)（收敛 release CLI 的 Gateway 等待） | 与 #204775 设计单一归属、与 #204816/#205011 的具体回滚场景直接对应；密集且同源，指向一个"更新专项"补丁版 |
| **Prompt cache / 前缀稳定性** | [#206337](https://github.com/openclaw/openclaw/pull/206337)（Vertex 前缀与工具声明在 compaction、tool promotion 后保持稳定） | 承接已关闭的 #182891 与仍开放的 #186683，是"降本"主线 |
| **Compaction 正确性** | [#205252](https://github.com/openclaw/openclaw/pull/205252)（不因触发轮次的 authority 不同而中断 compaction） | P2 + `ready for maintainer look`，与 Participate split (#204847) 相关 |
| **Codex 子 agent 能力** | [#206241](https://github.com/openclaw/openclaw/pull/206241)（XL, P1，向 native child 委派选定宿主工具） | 直接回应 #197376 与 #136714 一族"子 agent 拿不到 handler"的诉求；但带 `security-review-required`，落地节奏取决于安全评审 |
| **Talk / 语音会话不中断** | [#206333](https://github.com/openclaw/openclaw/pull/206333)（Android）、[#206329](https://github.com/openclaw/openclaw/pull/206329)（iOS/macOS）保留已接受的工作 | 均带 `merge-risk: compatibility`，说明是行为契约变更，需谨慎 |

### 中期候选（尚无定论）

- [#151178](https://github.com/openclaw/openclaw/issues/151178) Active Memory 将深召回升级决策委派给插件 provider（`linked-pr-open`，`needs-product-decision`）
- [#103067](https://github.com/openclaw/openclaw/issues/103067) 会话命名集中化 + 子 agent 生命周期与跨渠道持久化模型（diamond lobster，`needs-product-decision`）
- [#130247](https://github.com/openclaw/openclaw/issues/130247) cron 增加 `--until` / `--max-runs` / 累计运行计数（`stale`，P3，8 月起无进展）
- 口述（dictation）方向成簇出现：[#205880](https://github.com/openclaw/openclaw/pull/205880) 个人词表基础、[#205876](https://github.com/openclaw/openclaw/pull/205876) 实时转写 authority、[#206088](https://github.com/openclaw/openclaw/pull/206088) 口述文件名引用复核、[#205603](https://github.com/openclaw/openclaw/pull/205603)/[#203982](https://github.com/openclaw/openclaw/pull/203982) link reader 可读性 —— 表明有一名贡献者在系统性地推进"口述 + 链接阅读"体验，可能是 v2026.12 的功能亮点。

**路线图判断**：下一版本更可能是 **"更新链路 + 缓存/compaction 修复"导向的维护版**，而非功能版；功能面新增（Dictation、Codex 工具委派、Talk 保活）分散在多个 XL PR 上，受 review 带宽与安全评审制约，短期落地概率低于修复类。

---

## 7. 用户反馈摘要

**真实痛点（按频次）**

1. **"我不知道它坏了"——静默失效是最高频抱怨**
   - [#153426](https://github.com/openclaw/openclaw/issues/153426)："静默地、永久地"排除记忆文件，**无诊断、无 CLI、无恢复**。
   - [#182369](https://github.com/openclaw/openclaw/issues/182369)：内部 RSS 监控阈值对堆外泄漏**从不触发**。
   - [#182891](https://github.com/openclaw/openclaw/issues/182891)：`cache read dropped N -> 0` 只在日志里留一行，无告警。
   - [#143206](https://github.com/openclaw/openclaw/issues/143206)：有 pending 叙事仍记为"成功、零错误"。
   → 共性诉求：**把"降级"变成一等公民状态**，而不是当作正常路径。

2. **更新恐惧（第二痛点）**：用户在 **stable 之间**（11.4→11.8、11.5、11.7→11.8）反复回滚，且失败发生在"预检全部通过之后"（#204816、#203442、#201472、#205402）。用户措辞从"报 bug"转向"不敢升级"。

3. **成本敏感**：prompt cache 相关有 #182891（29 评论）、#186683（9 评论）两条独立线索，用户能精确指出 envelope 重写、surface 切换、runtimeContextCarrier 变更三类触发条件——这是**付费/自托管重度用户**的典型画像。

4. **诊断信息不足**：#193673（EBUSY 不指明文件）、#158373（路径被 redact 导致无法定位）。用户愿意排查，但工具不给线索。

5. **用户在替项目做工程**：#159662 的 "cold reboot + provider bisect"、#91588 的 launchd 重启周期记录、#177… 系列的 cgroup 峰值追踪——**社区在无报酬地承担根因定位**，这既是项目资产也是隐性风险（一旦这批用户流失，诊断能力会断档）。

**满意度信号**

- 高评论议题被关闭（#182891 29 条、#153426 28 条、#200606 21 条）说明**反馈闭环是真实存在的**，不是黑洞。
- 多条 Issue 作者主动补充"November 18 状态更新"（#158373）、"Recurrence check（2026-10-15）"（#141172），显示核心用户仍愿意长期跟进。
- 明显不满集中在**响应速度的分层**：新问题（11 月）多在 1–2 天内有关闭或明确标签；老 P0（#91588、#89278）则长期停在 `no-new-fix-pr`。

**场景画像**：单用户自托管、systemd/launchd 常驻、7–23 个插件、多 agent（5–7 个）、约 50 个 cron、跨 Discord/Telegram/Signal/飞书/WebChat、使用 Codex/claude-cli/GLM 等多 provider，硬件从 1 GiB ARM64 cgroup 到 15–30 GiB x64 服务器不等。**"长尾异质环境"是内存与更新问题的放大器。**

---

## 8. 待处理积压（需维护者关注）

### 高优先级长期未决

| 条目 | 创建 | 已挂天数* | 阻塞原因 |
|---|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) P0 内存泄漏 350MB→15.5GB | 2026-06-09 | **~171 天** | `no-new-fix-pr` + `needs-maintainer-review` + `needs-info`。**最该被排期的一条**：42 条评论、P0、crash-loop、影响所有平台的常驻部署。 |
| [#89278](https://github.com/openclaw/openclaw/issues/89278) P0 Codex OAuth 10s 超时 | 2026-06-02 | **~178 天** | `linked-pr-open` 但 6 个月未合；diamond lobster + release-blocker 标记。 |
| [#141413](https://github.com/openclaw/openclaw/issues/141413) P0 macOS 本地 Gateway 缺 token | 2026-09-07 | ~81 天 | `needs-security-review` + `needs-product-decision`，安全面阻塞。 |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) P1 worker 4–5 GB/h | 2026-09-27 | ~61 天 | `not-repro-on-main`，需建立"发布版可诊断性"通道。 |
| [#154812](https://github.com/openclaw/openclaw/issues/154812) P1 堆外 RSS 导致宿主 OOM | 2026-09-21 | ~67 天 | `no-new-fix-pr`，与 #91588 同族。 |
| [#103067](https://github.com/openclaw/openclaw/issues/103067) 会话命名/生命周期 | 2026-07-09 | ~141 天 | `needs-product-decision`，diamond lobster。 |
| [#136714](https://github.com/openclaw/openclaw/issues/136714) Codex 子 agent deny list | 2026-09-02 | ~86 天 | `needs-security-review`；与今日新 PR #206241 同域，可一并评审。 |
| [#130247](https://github.com/openclaw/openclaw/issues/130247) cron 无终止条件 | 2026-08-26 | ~93 天 | 已 `stale`，P3，长期无响应。 |

\* 按 2026-11-27 估算。

### PR 侧积压（288 条待合并中的代表）

- [#199688](https://github.com/openclaw/openclaw/pull/199688) improve(ui)：在输入框高亮 skill 引用 — 自 **2026-11-15** 挂起，XL + P3。
- [#195094](https://github.com/openclaw/openclaw/pull/195094) fix(browser)：崩溃标签页报错而非超时 — 自 **2026-11-08** 挂起，`needs proof`。
- [#205603](https://github.com/openclaw/openclaw/pull/205603) / [#203982](https://github.com/openclaw/openclaw/pull/203982) link reader 可读性 — 自 11-23/11-25 起 `waiting on author`，同一作者连续两条同域 PR，建议合并评审以减少往返。
- [#206333](https://github.com/openclaw/openclaw/pull/206333) / [#206329](https://github.com/openclaw/openclaw/pull/206329) Talk 保活（Android / Apple）— 均带 `needs proof` + `compatibility` 风险，需同一评审人统一行为契约。

### 建议动作

1. **为 #91588 指定 owner 并拆解**：五个月 42 条评论仍无 fix PR，建议按"网关主进程 / worker 线程 / 堆外分配"三路拆分，先落地 #182369 提出的**监控阈值修复**（让泄漏可见），这是成本最低的止血点。
2. **建立"发布版 vs main"诊断桥**：#159662、#161403 均因 `not-repro-on-main` 僵持，需要一个让用户在生产构建上采集堆快照/性能剖面的官方通道。
3. **限制 XL PR 并发**：今日新开 4 条 XL，而 review 队列已达 288，建议对同域 XL PR 设定"设计先合、实现后合"的门槛（#204775 已具备该机制，可复用）。
4. **快速清理噪音**：[#205007](https://github.com/openclaw/openclaw/issues/205007) 建议 24h 内分类关闭，避免污染 `impact:security` 标签统计。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告

> 数据窗口：2026-11-26 → 2026-11-27。DeepSeek Harness 未启用 GitHub Issues/PR，以 Discussions 为社区信号源；PicoClaw 的 CLOSED PR 未区分“合并/未合并关闭”，相关判断需保留口径。

---

## 1. 生态全景

个人 AI 助手与自主智能体开源生态正从“能力堆叠”进入“可靠性、可运维性与成本工程”阶段。头部项目仍保持高强度代码吞吐，但普遍出现 **PR 待合并量高企、Release 静默、长龄稳定性债务累积** 的结构性特征。竞争焦点从“能否接更多渠道/模型/工具”转向 **升级可回滚、失败可见、资源不泄漏、token 成本可控、多租户隔离**。生态形态明显分化：平台型 Gateway、轻量本地型、IM 机器人框架、桌面全插件型并行演进。整体判断：**高活跃、中高复杂度、交付与审查带宽成为共同瓶颈**。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新（24h） | PR 更新（24h） | Release | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 362（新/活跃 262，关闭 100） | 500（待合并 288，合并/关闭 212） | 0 | **高活跃 / 中等风险**。维护响应积极、减债明显；但 review 存量 288，Gateway 内存泄漏与自更新链路为长期风险。 |
| **Zeroclaw** | 13（新/活跃 8，关闭 5） | 50（待合并 48，合并/关闭 2） | 0 | **高活跃 / 审查瓶颈**。Issue 收敛健康，关闭 S0 数据丢失；但 PR 合并率仅 4%，凭据栈关键路径被卡。 |
| **PicoClaw** | 0 | 6（待合并 2，关闭 4） | 0 | **低活跃 / 维护清理**。无 Issue 信号，集中关闭历史聚合 PR；社区讨论弱，需确认 15 个历史修复是否真正落地。 |
| **QwenPaw** | 28（新/活跃 13，关闭 15） | 48（待合并 29，合并/关闭 19） | 0 | **高活跃 / 稳定性修复日**。关闭率约 53.6%，Windows 本地模型、Console、渠道格式化修复推进；审阅队列偏长。 |
| **hermes-agent** | 280（新/活跃 260，关闭 20） | 500（待合并 317，合并/关闭 183） | 0（最近 v0.23.2） | **高吞吐 / 积压风险**。开发与合并量强，但 317 条待合并、两个 P1 挂起约一个月，发版前回归风险上升。 |
| **AstrBot** | 10（新/活跃 7，关闭 3） | 41（待合并 26，合并/关闭 15） | **v4.30.0-beta.2** | **高强度 Beta / 安全响应及时**。路径遍历、Satori 注入当日关闭；部署依赖 Napcat、QQ @all 静默失败待排期。 |
| **DeepSeek Harness** | 无 Issues 机制；Discussions 更新 124 | 无 PR 机制；头部 15 帖累计 153 评论 | 0 | **高讨论 / 低交付可见性**。社区诊断质量高，但无 PR/Issue/Release 留痕，Windows 桌面崩溃、升级失败、沙箱缺陷形成集群。 |

**关键读数**：OpenClaw 与 hermes-agent 的 PR 更新量均达 500，属平台型高吞吐；OpenClaw Issues 更新 362，高于 hermes 的 280。待合并 PR 方面，hermes 317、OpenClaw 288，均显示 review 带宽是头部项目的共同瓶颈。Zeroclaw 虽 PR 更新 50，但仅 2 条落地，合并率 4%，为全样本最低。

---

## 3. OpenClaw 在生态中的定位

**优势：生态体量与功能完整度领先。** OpenClaw 单日 Issues 更新 362、PR 更新 500，社区规模与维护吞吐均处第一梯队；功能面覆盖 Gateway、记忆系统、多 agent、多渠道、cron、Codex/claude-cli 多 provider、自更新与 prompt cache，属于“全能平台型”参照实现。其反馈闭环也较真实：今日关闭 #182891（29 评论）、#153426（28 评论，P0）等高评论议题，说明长期议题并非黑洞。

**技术路线差异：以常驻 Gateway 为核心的自托管平台。** 相比 Zeroclaw 聚焦凭据/密钥作用域与本地小模型档位、AstrBot 聚焦多 IM 机器人框架、DeepSeek Harness 聚焦桌面 Electron + 全插件沙箱，OpenClaw 更像“个人 AI 助手操作系统”：单进程 Gateway 承载多会话、多插件、多渠道，并把自更新、记忆注入、compaction、prompt cache 纳入核心链路。复杂度最高，也最容易在资源生命周期和更新链路上形成系统性债务。

**社区规模对比：与 hermes-agent 同属头部，显著高于其余项目。** OpenClaw PR 更新 500，与 hermes 并列最高；Issues 更新 362，高于 hermes 280、QwenPaw 28、Zeroclaw 13、AstrBot 10、PicoClaw 0。待合并 PR 288 略低于 hermes 317，但相对其单日合并/关闭 212，存量仍为 1.36 倍。**定位判断：OpenClaw 是生态中功能最全、社区最大、但稳定性债务最集中的参照项目；其最大风险不是活跃度，而是 #91588 这类 P0 内存泄漏五个月未收敛，以及 review 带宽无法消化 XL PR。**

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 / 信号 |
|---|---|---|
| **升级与回滚可靠性** | OpenClaw、hermes-agent、DeepSeek Harness、AstrBot | OpenClaw stable 间回滚、prepared-release 设计 #204775；hermes 更新后旧代码驻留 #110965、备份被跳过 #127731；DeepSeek 应用内升级 error 32 #12988；AstrBot 部署路径依赖 Napcat #11394。共同诉求：升级前有可用备份、失败可回滚、错误可诊断。 |
| **内存 / 进程生命周期** | OpenClaw、QwenPaw、hermes-agent、Zeroclaw、DeepSeek Harness | OpenClaw Gateway RSS 350MB→15.5GB #91588、worker 4–5GB/h #159662、监控阈值失效 #182369；QwenPaw Windows llama-server 孤儿进程 #8830；hermes Kanban worker 崩溃 #145022；Zeroclaw S0 并发写丢数据 #10797；DeepSeek `installFailLoud` 导致反复崩溃 #14271。 |
| **静默失效与可观测性** | OpenClaw、hermes-agent、AstrBot、QwenPaw | OpenClaw 记忆文件被静默排除 #153426、cache read 掉零 #182891；hermes Slack 状态静默失效 #110374、Feishu 投递 100% 失败 #78975；AstrBot QQ `@all` 静默丢弃 #11383、weixin `ret:0` 无 message_id #11325；QwenPaw 任务状态不刷新 #8949。共同诉求：降级/失败应成为一等状态并暴露诊断。 |
| **Token 成本、缓存与压缩** | OpenClaw、hermes-agent、DeepSeek Harness、QwenPaw、AstrBot、Zeroclaw | OpenClaw prompt cache 不复用 #182891/#186683、compaction #205252；hermes cache keep-alive #160651、压缩摘要携带后台进程 #160621、RFC #143379；DeepSeek compaction 绕过 prefix cache #1944、`headroomTokens` 回归 #8079；QwenPaw cron token 统计 #8705；AstrBot 按请求追踪 token #11392；Zeroclaw 日预算语义不一致 #10635。 |
| **多租户 / 会话隔离** | hermes-agent、OpenClaw、QwenPaw、Zeroclaw | hermes `terminal.cwd` 进程级全局 #29531、按聊天隔离记忆 #28279；OpenClaw 会话命名与子 agent 生命周期 #103067、死会话复用 #202518；QwenPaw 渠道内无法切换会话级钉住模型 #8725；Zeroclaw 多通道历史图片标记每轮重发 #11554。 |
| **安全、密钥与沙箱** | Zeroclaw、OpenClaw、AstrBot、DeepSeek Harness、hermes-agent | Zeroclaw 操作员级凭据/密钥作用域 PR 栈 #12408 等、SQLite 安全债 #12322；OpenClaw SecretRef 本地 Gateway 缺 token #141413；AstrBot 技能路径遍历 #11399、Satori 属性注入 #11397；DeepSeek Windows ACL 沙箱三缺陷 #8409；hermes MCP OAuth `bind_host` #160624。 |
| **本地模型 / 小模型适配** | Zeroclaw、QwenPaw、DeepSeek Harness、OpenClaw | Zeroclaw compact local_small runtime profile #5287；QwenPaw llama.cpp GPU 控制 #8649、Windows llama-server 生命周期；DeepSeek 本地 LLM 超时需 20 分钟 #3157；OpenClaw LM Studio embedding 32K 上下文导致 16GB 主机 OOM #198830。 |
| **多渠道适配稳定性** | OpenClaw、hermes-agent、AstrBot、QwenPaw、Zeroclaw | 覆盖 Signal/Telegram/Discord/Feishu/Slack/Teams/Matrix/QQ/微信/XMPP；上游 SDK 变更导致静默失效（hermes Slack）、硬失败（Feishu/Teams）、格式误判（QwenPaw Feishu 表格卡）、@全体丢弃（AstrBot QQ）。 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 全能个人 AI 助手平台：Gateway、多 agent、多插件、多渠道、记忆、自更新、prompt cache | 重度自托管用户、团队、长尾异质环境部署者 | 单进程 Gateway 为核心，插件/渠道/记忆/更新/压缩均在核心链路；复杂度最高。 |
| **Zeroclaw** | 操作员级凭据/密钥作用域、本地小模型运行时、多通道、成本预算 | 本地/离线优先、自托管运维、多 profile 用户 | 以安全凭据栈为当前最大投入主线；原生通道（SSH/XMPP）与外部保管库集成。 |
| **PicoClaw** | 维护与历史修复聚合、依赖升级 | 轻量部署/维护型用户（据动态推断） | 数据有限；当前以依赖治理和旧 PR 清理为主，功能信号弱。 |
| **QwenPaw** | 多渠道 + 本地模型 + Console 体验、cron/token 统计、Linux 桌面打包 | 中文渠道用户、本地模型用户、Console 日常运维者 | 渠道适配与本地模型生命周期并重；小修复 PR 密集，Console 可观测性权重高。 |
| **hermes-agent** | 核心最小化 + 插件目录、Gateway 多 profile、IM/cron/Kanban 自动化 | 企业/多 profile、自托管 IM 生态、自动化流水线用户 | 记忆/会议能力外置插件，核心瘦身；Gateway 会话状态与多租户隔离是主要架构矛盾。 |
| **AstrBot** | 多 IM 机器人框架、Agent 工具发现、Dashboard、插件生态 | QQ/微信/Telegram 社群运营、机器人开发者 | Beta 快速迭代；安全边界与统计正确性并行推进；对第三方部署组件依赖较高。 |
| **DeepSeek Harness** | 桌面 Electron 客户端、全插件 seam、WSL/ACL 沙箱、本地工作流 | 开发者、本地桌面工作流用户 | “一切皆插件”，沙箱与桌面形态为核心；但无 Issue/PR/Release 留痕，流程黑箱。 |

**总结**：OpenClaw 与 hermes 是平台型“大而全”，Zeroclaw/AstrBot/QwenPaw 是垂直场景“深而专”，PicoClaw 处维护期，DeepSeek Harness 是桌面插件化形态探索者。功能差异背后是架构取舍：**核心承载越多，稳定性与 review 压力越大；插件化越彻底，分发、兼容与沙箱治理越复杂。**

---

## 6. 社区热度与成熟度

**第一层：超高活跃平台型——OpenClaw、hermes-agent。**  
两者单日 PR 更新均 500，Issue 更新 280–362，社区规模与开发吞吐领先。成熟度高，但均处“高活跃 / 中高风险”：OpenClaw 的长龄 P0 内存泄漏与 review 存量 288；hermes 的 317 条待合并 PR、两个 P1 挂起约一个月。属于**快速迭代但需质量巩固**。

**第二层：高活跃成长型——QwenPaw、AstrBot、Zeroclaw。**  
QwenPaw 与 AstrBot 呈“稳定性修复 + 小步功能”并行：QwenPaw 单日关闭 15 条 Issue，AstrBot 发布 beta.2 且安全修复当日闭环。Zeroclaw Issue 侧健康（关闭 S0），但 PR 合并率 4%，处**审查瓶颈与安全加固窗口**。三者均未到平台型体量，但场景聚焦、迭代灵活。

**第三层：低活跃维护型——PicoClaw。**  
今日 0 Issue、6 PR，集中关闭 8 个月前创建的历史聚合 PR。维护节奏尚可，但社区讨论信号弱，成熟度判断受数据限制；关键风险是关闭 PR 的修复可追踪性。

**特殊层：高讨论低交付——DeepSeek Harness。**  
Discussions 124 条更新、头部 15 帖 153 评论，社区技术含量高（根因、补丁、兼容矩阵），但无 Issue/PR/Release 留痕，修复节奏依赖 nightly 黑箱。**社区成熟度高于流程成熟度**，Windows 桌面端崩溃/启动/升级/沙箱形成负面集群。

---

## 7. 值得关注的趋势信号

1. **“静默失效”取代“功能缺失”成为首要不满。** OpenClaw 记忆静默排除、cache 静默清零，hermes Slack 状态静默失效，AstrBot QQ @all 静默丢弃，QwenPaw 任务状态不刷新——用户真正愤怒的是“坏了但不知道”。开发者应把降级状态、错误暴露、诊断 CLI/面板作为一等公民。

2. **升级链路是所有修复的“送达管道”。** OpenClaw stable 间回滚、hermes 更新后旧代码驻留、DeepSeek error 32、AstrBot Napcat 部署依赖，说明升级失败会放大旧版本所有缺陷。建议优先投入备份校验、回滚开关、失败原因可视化与 release notes 逐条映射。

3. **Review/交付带宽成为生态级瓶颈。** OpenClaw 待合并 288、hermes 317、Zeroclaw 48（合并率 4%）、QwenPaw 29、AstrBot 26。贡献者产能已高于审查产能。可行做法：设计先合、实现后合；限制同域 XL PR 并发；建立 P1/P2 优先评审通道；对小修复批量合并。

4. **Token 成本工程化从“优化项”变“核心能力”。** prompt cache 复用、compaction 前缀稳定、cache keep-alive、预算单一真相源、按请求 token 归因在多项目同时出现。对自托管/付费重度用户，成本可解释性与账单准确性直接影响留存。

5. **本地优先暴露“异构环境放大器”。** 1GiB ARM64 cgroup、Windows 标准用户、macOS launchd、Docker、非系统盘 NTFS、本地模型长时延——长尾环境放大内存与更新问题。开发者需为本地模型提供可配置超时、小上下文档位、进程回收与资源上限。

6. **插件化与核心最小化并行，但治理复杂度上升。** hermes 将记忆/会议迁出核心，DeepSeek 全插件 seam，OpenClaw 插件/渠道丰富。插件化提升扩展性，也带来分发辨识、兼容矩阵、沙箱权限与安全评审成本。

7. **安全边界正成为 PR 阻塞项。** Zeroclaw 凭据栈、OpenClaw SecretRef、AstrBot 路径遍历/Satori 注入、DeepSeek ACL 沙箱，均表明安全评审会直接影响合入节奏。建议把安全验收清单前置到设计阶段，避免 XL PR 后期卡死。

8. **多租户/会话隔离是平台型项目的下一场硬仗。** Gateway 单进程服务多会话时，`cwd`、记忆、模型钉住、后台进程均可能全局污染。hermes #29531/#28279、OpenClaw 会话生命周期、QwenPaw 渠道模型切换均指向同一问题：**个人助手平台化后，必须补上隔离与隐私边界。**

9. **社区诊断资产是项目护城河，也是流失风险。** 用户在做 bisect、cgroup 峰值追踪、堆外泄漏定位、补丁草案。维护者应建立“发布版 vs main”诊断桥、生产堆快照通道、Featured Plugin 回收机制；否则核心诊断用户流失后，项目自诊断能力会断档。

10. **发布透明度影响信任收益。** DeepSeek Harness 的 nightly rc.1→rc.5 迭代真实发生但无 Release 留痕，导致社区无法核对修复状态。建议至少以 Release Notes 映射讨论帖编号，让“我报的问题在哪个版本修了”可验证。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目日报 · 2026-11-27

---

## 1. 今日速览

- **活跃度：高，但“开”与“合”严重失衡。** 24 小时内 Issues 更新 13 条（新开/活跃 8、关闭 5）、PR 更新 50 条，然而 50 条 PR 中仅 2 条被合并或关闭，48 条仍处于待合并状态，合并率约 4%。
- **Issue 侧健康度良好**：关闭 5 条中包含两条高严重度缺陷（S0 数据丢失 #10797、S2 图片重复发送 #11554），说明维护者在清理存量问题，而非只堆积新需求。
- **PR 侧出现明显审查瓶颈**：当前队列被一组大型（size:XL）凭据/密钥管理 PR 栈长期占据，多条标记 `needs-author-action` / `needs-maintainer-review`，且高度集中于单一贡献者。
- **今日无新版本发布**，v1.0.0 路线图 tracker（#12712）昨日新建后持续更新，是本周期最重要的方向性信号。
- **整体判断：项目工程活跃度健康、缺陷收敛正常，但代码合入通道拥塞，存在“贡献者产能 > 审查产能”的结构性风险。**

---

## 2. 版本发布

无新版本发布（过去 24 小时 Releases 数量为 0），本节省略。

---

## 3. 项目进展

> 说明：本次数据仅提供 PR 列表的“待合并/开放”部分，已合并/关闭的 2 条 PR 未在明细中出现，故无法具名。以下基于 Issue 关闭情况与 PR 栈演进推断推进方向。

### 3.1 已关闭的高价值 Issue（实质进展）

| Issue | 类型 | 推进内容 |
|---|---|---|
| [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) **S0 数据丢失** | Bug | `MarkdownMemory::store` 并发写入互相覆盖、丢失条目的问题已关闭。这是记忆后端最严重的数据安全问题，修复价值最高。 |
| [#11554](https://github.com/zeroclaw-labs/zeroclaw/issues/11554) | Bug (p1) | 通道（Signal/Telegram/Discord）历史中的 `[IMAGE:<path>]` 标记在后续每一轮被重发，导致模型反复“描述幻影新图片”，已关闭。跨通道上下文正确性修复。 |
| [#9562](https://github.com/zeroclaw-labs/zeroclaw/issues/9562) | Bug (p2) | WebChat 流式输出时自动滚动覆盖用户手动滚动，已关闭。 |
| [#11892](https://github.com/zeroclaw-labs/zeroclaw/issues/11892) | 增强 | 记忆召回查询支持可配置 embedding 前缀，兼容 instruction-tuned 嵌入模型。 |
| [#11930](https://github.com/zeroclaw-labs/zeroclaw/issues/11930) | 增强 | Gateway 非流式 `POST /webhook` 支持更长的同步 agent 调用，不影响其他路由超时。 |

**评估**：5 条关闭覆盖了「数据安全 → 上下文正确性 → Web UX → 检索质量 → 集成可用性」五个层面，是一次质量导向的清理，而非单纯的功能推进。

### 3.2 正在推进的大型工作（PR 栈）

围绕「**操作员级凭据/密钥作用域管理**」正在形成一个庞大的分层 PR 栈，是本周期最大的功能推进：

- 基础层：[#12408](https://github.com/zeroclaw-labs/zeroclaw/pull/12408)（写保护、本地加密的 HTTP Basic / API-Key，绑定单一 HTTPS origin）
- 目录层：[#12517](https://github.com/zeroclaw-labs/zeroclaw/pull/12517)（扩展凭据目录，等待 RFC #12422 定稿）
- 外部保管库：[#12481](https://github.com/zeroclaw-labs/zeroclaw/pull/12481)（OpenBao）、[#12482](https://github.com/zeroclaw-labs/zeroclaw/pull/12482)（1Password Connect / Azure KV / AWS SM / GCP SM）
- 协议侧：[#12438](https://github.com/zeroclaw-labs/zeroclaw/pull/12438)（原生 Rust SSH 任务代理）、[#12659](https://github.com/zeroclaw-labs/zeroclaw/pull/12659)（SSH 密码/TOTP 作用域）、[#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596)（浏览器用户名密码/TOTP 独立授权）
- 传输扩展：[#12490](https://github.com/zeroclaw-labs/zeroclaw/pull/12490)（`Authorization: Token` 作用域凭据）、[#12695](https://github.com/zeroclaw-labs/zeroclaw/pull/12695)（WebDAV 远程文件工具）

其他值得关注的在途工作：
- [#12322](https://github.com/zeroclaw-labs/zeroclaw/pull/12322)：升级 bundled SQLite 至 3.54.1（rusqlite 0.41.1），**移除 RUSTSEC-2026-0459 豁免**——安全债务偿还。
- [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847)：原生 Rust XMPP 通道 + 可选 legacy OMEMO（`needs-maintainer-review`）。
- [#12691](https://github.com/zeroclaw-labs/zeroclaw/pull/12691)：Web Chat 展示 Codex 订阅用量。
- [#11911](https://github.com/zeroclaw-labs/zeroclaw/pull/11911)：通道超时/失败时保留已完成工具结果，并复用有界恢复逻辑。

---

## 4. 社区热点

| 排名 | 条目 | 互动数据 | 诉求分析 |
|---|---|---|---|
| 1 | [#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287) `[Feature] define a compact local_small runtime profile and prompt-budget contract` | 11 评论 · 👍2 · 创建 2026-04-04（已持续 237 天） | 讨论热度最高且跨越 7 个月。核心诉求：为本地小模型提供“紧凑模式”——削减 prompt 膨胀、关闭宽松的 fallback 解析、阻止内部工具/系统指令泄漏到用户可见输出。这是 **local-first 用户的核心痛点**，已打上 `status:accepted` + `priority:p2` + `risk:high`，属“已认可但推进缓慢”的典型。 |
| 2 | [#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635) `[Bug] Runtime profile cost limit does not reflect effective global daily budget` | 5 评论 · 创建 83 天 · p1 | 成本治理语义不一致：profile 报告 `max_cost_per_day_cents = 4294967295`（看似无限），但进程级账本超过 $10/天后仍拒绝 agent 轮次。用户诉求是**预算的可解释性与单一真相源**，对自托管/多租户场景影响大。 |
| 3 | [#12712](https://github.com/zeroclaw-labs/zeroclaw/issues/12712) `[Tracker] Roadmap to v1.0.0` | 2 评论 · 👍1 · 创建 2 天 | 替代 FND-001 §6 的版本计划，明确 v1.0.0 各版本顺序、目标日期与定位。**这是判断后续版本节奏的权威依据**，建议持续跟踪。 |
| 4 | [#12691](https://github.com/zeroclaw-labs/zeroclaw/pull/12691) `feat(gateway): show Codex subscription usage in web chat` | size:XL · 依赖 #12641 | 用户希望在 Web Chat 中直接看到订阅用量，反映 **成本/配额可视化** 是持续诉求（与 #10635 呼应）。 |

**趋势判断**：热度最高的两者（#5287、#10635）都指向同一主题——**运行时行为的“可预期性”**（prompt 预算与成本预算）。这比单纯加功能更能影响本地部署用户留存。

---

## 5. Bug 与稳定性

### 今日已关闭（风险已消除）

| 严重度 | Issue | 问题 | 状态 |
|---|---|---|---|
| **S0 数据丢失** | [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) | `MarkdownMemory::store` 用早期快照整体重写文件，无写入串行化、无落盘校验，并发 `store()` 静默丢条目 | ✅ 已关闭 |
| S2 | [#11554](https://github.com/zeroclaw-labs/zeroclaw/issues/11554) | 历史图片标记每轮重发，模型描述幻影“新”图片（Signal/Telegram/Discord） | ✅ 已关闭 |
| S3/p2 | [#9562](https://github.com/zeroclaw-labs/zeroclaw/issues/9562) | 流式输出时自动滚动劫持手动滚动 | ✅ 已关闭 |

### 当前未解决（按严重度排序，均未见关联 fix PR）

| 严重度 | Issue | 问题 | 风险 |
|---|---|---|---|
| **S2 / p1 / risk:high** | [#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635) | Runtime profile 日预算上限与实际生效的全局预算不一致，导致“看似无限额却被拒绝” | 成本失控的误判与运维困惑；已 `status:accepted`+`in-progress`，但 83 天未闭环，建议优先配人 |
| S3 | [#12746](https://github.com/zeroclaw-labs/zeroclaw/issues/12746) | 页面重连后一轮对话结束，聊天输入框不回收焦点（从 #11661 拆出的 operator reconnect 场景） | 可访问性/操作流畅度，隔离自评审建议，修复面小 |
| S3 | [#12743](https://github.com/zeroclaw-labs/zeroclaw/issues/12743) | Windows Chrome 下上下文计量条 `█`/`░` 单元格高度不一致，半满进度条显示错位 | 纯样式问题，跨平台渲染一致性 |

### 测试基础设施隐患

- [#12719](https://github.com/zeroclaw-labs/zeroclaw/pull/12719)（以 Issue 形式提交）：`tunnel::tailscale::tests::start_forwarder_rechecks_the_process_after_the_probe` 依赖 200 ms 时序窗口，在 macOS runner 上稳定失败；**master 分支本身即失败，与任何开放 PR 无关**，且是 macOS 测试启用后才暴露。
  → 建议引入轮询/条件等待替代固定 sleep，否则将持续污染 CI 信号。

---

## 6. 功能请求与路线图信号

| 需求 | 来源 | 是否已有对应 PR | 纳入下一版本的可能性 |
|---|---|---|---|
| **紧凑本地小模型运行时档位**（prompt 预算契约、禁用宽松 fallback 解析、隔离内部指令） | [#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287) `status:accepted` | 未见直接 PR | 中。已 accepted 但 p2 + risk:high，且跨越 7 个月未落地；若 v1.0.0 强调“本地优先”，此项应被提前 |
| **v1.0.0 发布顺序与日期** | [#12712](https://github.com/zeroclaw-labs/zeroclaw/issues/12712) | — | 高（本身就是路线图载体），建议在日报中逐日跟踪其变更 |
| **凭据/密钥体系全面作用域化** | 系列 PR [#12408](https://github.com/zeroclaw-labs/zeroclaw/pull/12408) / [#12481](https://github.com/zeroclaw-labs/zeroclaw/pull/12481) / [#12482](https://github.com/zeroclaw-labs/zeroclaw/pull/12482) / [#12659](https://github.com/zeroclaw-labs/zeroclaw/pull/12659) / [#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596) | ✅ 已有（大型栈） | **高**。这是当前投入最重的一条主线，配合 [#12322](https://github.com/zeroclaw-labs/zeroclaw/pull/12322) 的安全债清理，构成 v1.0 前的“安全加固窗口” |
| 外部保管库对接（OpenBao / 1Password / Azure / AWS / GCP） | [#12481](https://github.com/zeroclaw-labs/zeroclaw/pull/12481)、[#12482](https://github.com/zeroclaw-labs/zeroclaw/pull/12482) | ✅ 已有 | 中高，但依赖 #12408 先落地 |
| 原生 XMPP 通道 | [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) | ✅ 已有 | 中，卡在 `needs-maintainer-review` |
| 订阅用量可视化 | [#12691](https://github.com/zeroclaw-labs/zeroclaw/pull/12691) | ✅ 已有 | 中，依赖 #12641 |
| 代码清理（移除无调用符号） | [#12740](https://github.com/zeroclaw-labs/zeroclaw/issues/12740) `init_skills_dir`、[#12722](https://github.com/zeroclaw-labs/zeroclaw/issues/12722) `resolve_thinking_from_message` | 待提 PR | 高（低风险、good-first-issue 性质），适合作为新贡献者入口 |

---

## 7. 用户反馈摘要

从 Issue 正文与标签中提炼的真实使用画像：

**典型场景**
1. **本地/离线优先部署**：用户在小参数本地模型上运行 Zeroclaw，遭遇 prompt 膨胀与解析宽松带来的输出污染（#5287）。
2. **多通道长期会话**：Signal / Telegram / Discord / Matrix 通道长期保留会话历史，历史媒体标记与新消息混淆（#11554）。
3. **自托管成本管控**：单机多 profile、多任务的成本账本需要“说得出、算得准”（#10635）。
4. **程序化集成**：外部程序通过 gateway webhook 同步调用 agent，需要更长的等待窗口而不放宽全局超时（#11930）——说明 Zeroclaw 正被嵌入到上游业务系统。
5. **Operator 视角**：Web 控制台的焦点管理、跨平台渲染、重连后的会话续接（#12746、#12743、#9562）——使用者已从“尝鲜”转向“日常运维”。

**满意点**
- 记忆后端支持 instruction-tuned embedding 前缀（#11892 快速响应并关闭），说明团队愿意适配具体模型生态。
- S0 级数据丢失在 75 天内闭环，安全响应速度可接受。

**不满意 / 摩擦点**
- **语义不一致 > 功能缺失**：用户最大的挫败感来自“配置说的和运行时做的不一样”（#10635），而非缺少功能。
- **长尾高价值需求被 p2 长期挂起**：#5287 已 accepted 却 237 天未实现，容易消耗核心贡献者的意愿。
- **CI 可信度**：master 上存在稳定失败的时序测试（#12719），会削弱外部贡献者对红绿信号的信任。

---

## 8. 待处理积压（提醒维护者关注）

| 条目 | 类型 | 滞留时长 | 卡点 | 建议动作 |
|---|---|---|---|---|
| [#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287) | 增强 (p2, accepted, in-progress) | **237 天** | 讨论充分但无实现 PR，risk:high 使推进谨慎 | 拆分为「prompt 预算契约」与「strict parsing 开关」两个小 PR；或明确写入 #12712 的某个版本 |
| [#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635) | Bug (p1, in-progress) | 83 天 | 无 fix PR，涉及 config/onboarding 与运行时节流语义 | 指派 owner，收敛为“单一预算真相源”设计后再改代码 |
| [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) | PR (size:XL) | 自 2026-10-19，约 39 天 | `needs-maintainer-review` | 至少给出 review 排期或明确拒绝，避免贡献者空转 |
| [#12408](https://github.com/zeroclaw-labs/zeroclaw/pull/12408) | PR (size:XL, risk:high) | 自 2026-11-13，14 天 | `needs-author-action`；是十余个下游 PR 的地基 | **最高杠杆项**：此 PR 一卡，整条凭据栈（#12481/#12482/#12490/#12517/#12596/#12659/#12695）全部无法合入 |
| [#12322](https://github.com/zeroclaw-labs/zeroclaw/pull/12322) | PR (依赖升级/安全) | 自 2026-11-09，18 天 | `needs-author-action`；移除 RUSTSEC 豁免 | 安全债，建议优先于功能 PR 处理 |
| [#12459](https://github.com/zeroclaw-labs/zeroclaw/pull/12459) | PR | 12 天 | `status:blocked` + `do-not-merge` | 需明确阻塞原因（OIDC 会话下的 `features.config`/`features.chat` 授权模型），否则应关闭以免污染队列 |
| [#12719](https://github.com/zeroclaw-labs/zeroclaw/issues/12719) | 测试稳定性 | 1 天（但影响 master） | 200 ms 时序窗口在 macOS 不可靠 | 改为条件等待，恢复 master 绿 |

---

## 附：项目健康度指标速记

| 指标 | 今日数值 | 判读 |
|---|---|---|
| Issue 关闭率（24h） | 5/13 ≈ 38% | 健康，存量在收敛 |
| PR 合并率（24h） | 2/50 = 4% | **告警**，审查产能不足 |
| 待合并 PR 存量 | 48（其中多个 size:XL） | 队列过深，栈式依赖放大阻塞 |
| 新版本节奏 | 0（当日） | 与 v1.0.0 tracker 刚建立一致，处于版本规划期 |
| 贡献者集中度 | Top20 PR 中约 15 条来自同一作者 @CastelloBrancoTecnologia | **bus factor 风险**，且单一作者的巨型栈使整体 review 复杂度指数上升 |

**一句话结论**：Zeroclaw 今日在“修质量”（关闭 S0/S2 缺陷、偿还 SQLite 安全债）上表现良好，但在“通管道”上明显吃紧——建议维护者本周把注意力从新增功能转向**解开 #12408 这个关键路径节点**，并对 #5287 给出明确的版本归属承诺。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-11-27）

> 数据范围：过去24小时。说明：PR 评论字段为 `undefined`，无法定量判断讨论热度；`CLOSED` 状态未区分“已合并”与“未合并关闭”。以下分析仅基于给定数据。

## 1. 今日速览

- 过去24小时 PicoClaw 无 Issues 更新、无新版本发布，社区 Issue 侧非常安静。
- PR 侧有 6 条更新：2 条待合并依赖升级 PR，4 条历史修复聚合 PR 被关闭。
- 今日主要维护动作集中在“依赖更新待审”和“历史 PR 积压清理”，而非新功能推进。
- 4 个被关闭的聚合 PR 创建于 2026-03-14，标题显示其尝试整合合计 15 个历史 PR 的修复，属于长期积压清理。
- 项目健康度评估：运行与维护节奏尚可，但社区讨论和用户反馈信号偏弱；需关注依赖 PR 审核及聚合 PR 的最终合并结果。

## 2. 版本发布

- 过去24小时新版本发布：**0 个**。
- 最新 Releases：**无**。
- 因此无破坏性变更、迁移注意事项或版本更新内容可报告。

## 3. 项目进展

今日 PR 更新 6 条，其中待合并 2 条，已关闭 4 条。项目推进主要体现在维护与积压清理层面。

| PR | 状态 | 作者 | 更新内容 | 项目意义 |
|---|---|---|---|---|
| [#1558](https://github.com/sipeed/picoclaw/pull/1558) | CLOSED | @xuwei-xy | `fix: merge PR #1344 #1342 #1341 #1331` | 标题显示整合 4 个历史修复 PR；长期 PR 被关闭，清理积压 |
| [#1559](https://github.com/sipeed/picoclaw/pull/1559) | CLOSED | @xuwei-xy | `fix: merge PR #1327 #1319 #1318 #1313` | 标题显示整合 4 个历史修复 PR；属于历史修复批处理 |
| [#1555](https://github.com/sipeed/picoclaw/pull/1555) | CLOSED | @xuwei-xy | `fix: merge PR #1390 #1389 #1383 #1381` | 标题显示整合 4 个历史修复 PR；推进历史积压收敛 |
| [#1560](https://github.com/sipeed/picoclaw/pull/1560) | CLOSED | @xuwei-xy | `fix: merge PR #1312 #1311 #1308` | 标题显示整合 3 个历史修复 PR；继续收敛旧 PR |

**进展评估：**

- 数量上：关闭 4 个长期聚合 PR，涉及标题中引用的合计 15 个历史 PR 修复。
- 维护上：明显有利于减少 PR 积压、降低历史修复追踪成本。
- 代码层面：由于数据仅标记 `CLOSED`，无法确认这些聚合 PR 是已合并还是未合并关闭；若已合并，则相关修复可能进入主干并等待后续版本；若未合并关闭，则需维护者确认这些修复是否仍有遗漏。

## 4. 社区热点

今日无 Issues 更新，PR 评论数未提供，反应数均为 0，因此严格意义上的“讨论热点”不明显。相对值得关注的是历史聚合 PR 的集中关闭。

| 条目 | 状态 | 热点原因 | 链接 |
|---|---|---|---|
| PR #1558 | CLOSED | 创建于 2026-03-14，2026-11-26 更新并关闭；整合 4 个历史修复 PR | [#1558](https://github.com/sipeed/picoclaw/pull/1558) |
| PR #1559 | CLOSED | 同上，长期聚合 PR 被关闭；整合 4 个历史修复 PR | [#1559](https://github.com/sipeed/picoclaw/pull/1559) |
| PR #1555 | CLOSED | 同上，长期聚合 PR 被关闭；整合 4 个历史修复 PR | [#1555](https://github.com/sipeed/picoclaw/pull/1555) |
| PR #1560 | CLOSED | 同上，长期聚合 PR 被关闭；整合 3 个历史修复 PR | [#1560](https://github.com/sipeed/picoclaw/pull/1560) |

**背后诉求分析：**

- 四个聚合 PR 均创建于约 8 个月前，说明项目曾存在较多分散修复 PR，维护者/贡献者尝试批量整合。
- 今日集中关闭表明维护者可能在进行积压清理，但数据未显示讨论内容，无法判断社区是否对关闭理由有争议。
- 新开的两个 Dependabot PR 暂无评论和反应，尚未形成社区讨论。

## 5. Bug 与稳定性

今日 Issues 更新为 0，因此没有新报告的 Bug、崩溃或回归问题。

| 项目 | 情况 | 严重程度 | Fix PR / 备注 |
|---|---|---|---|
| 新 Bug / 崩溃 / 回归报告 | 0 条 | N/A | 无 |
| 历史修复聚合 PR #1558 | 关闭状态，标题涉及多个历史修复 | 未知 | [#1558](https://github.com/sipeed/picoclaw/pull/1558) |
| 历史修复聚合 PR #1559 | 关闭状态，标题涉及多个历史修复 | 未知 | [#1559](https://github.com/sipeed/picoclaw/pull/1559) |
| 历史修复聚合 PR #1555 | 关闭状态，标题涉及多个历史修复 | 未知 | [#1555](https://github.com/sipeed/picoclaw/pull/1555) |
| 历史修复聚合 PR #1560 | 关闭状态，标题涉及多个历史修复 | 未知 | [#1560](https://github.com/sipeed/picoclaw/pull/1560) |

**稳定性判断：**

- 今日没有新增稳定性风险信号。
- 四个 `fix: merge PR` 聚合 PR 的关闭可能意味着历史修复被整合，也可能只是清理未合并 PR；建议维护者确认这些修复是否已进入主干。
- 两个待合并依赖 PR 若未通过 CI 或兼容性检查，可能带来间接稳定性风险，但当前无证据表明存在故障。

## 6. 功能请求与路线图信号

- 今日 Issues 共 0 条，因此没有用户功能请求。
- 今日 PR 中没有新功能 PR，主要是依赖升级和历史修复聚合。
- 路线图信号较弱：项目今日更偏向维护、依赖治理和积压清理，而非功能扩展。
- 可能影响下一版本的条目：
  - [#3474](https://github.com/sipeed/picoclaw/pull/3474)：AWS SDK for Go v2 从 1.42.0 升至 1.48.0，若审核通过可能进入后续构建。
  - [#3473](https://github.com/sipeed/picoclaw/pull/3473)：Azure azcore 从 1.22.0 升至 1.24.0，若审核通过可能进入后续构建。
  - 四个已关闭的修复聚合 PR 若实际已合并，其修复可能随下一版本发布；但当前数据无法确认。

## 7. 用户反馈摘要

- 今日无 Issues 更新，且 PR 评论字段为 `undefined`，无法从评论中提炼真实用户痛点、使用场景或满意度。
- 从 PR 标题可观察到维护侧反馈：存在多个历史修复 PR 需要批量整合，说明此前 PR 队列较分散。
- 今日没有明显的用户不满意信号，也没有可归因于用户的新需求信号。
- 建议后续关注 Issue 区恢复更新后的用户反馈，以及依赖升级 PR 是否引发兼容性讨论。

## 8. 待处理积压

| 条目 | 状态 | 说明 | 建议 |
|---|---|---|---|
| [#3474](https://github.com/sipeed/picoclaw/pull/3474) | OPEN | Dependabot 升级 AWS SDK Go v2，创建于 2026-11-26 | 常规依赖审核，检查 CI 与兼容性 |
| [#3473](https://github.com/sipeed/picoclaw/pull/3473) | OPEN | Dependabot 升级 Azure azcore，创建于 2026-11-26 | 常规依赖审核，检查 CI 与兼容性 |
| [#1558](https://github.com/sipeed/picoclaw/pull/1558) / [#1559](https://github.com/sipeed/picoclaw/pull/1559) / [#1555](https://github.com/sipeed/picoclaw/pull/1555) / [#1560](https://github.com/sipeed/picoclaw/pull/1560) | CLOSED | 四个长期聚合 PR 已关闭，但数据未区分是否合并 | 建议确认其中引用的 15 个历史修复是否已进入主干；若未合并，应建立追踪清单 |

**积压判断：**

- 提供数据中没有仍开放且长期未响应的重要 Issue。
- 当前待处理项主要是两个新开的依赖 PR，尚不构成长期积压。
- 真正的遗留风险在于四个长期聚合 PR 关闭后的修复可追踪性：若关闭未合并，相关修复可能仍未落地；若已合并，则应确认是否纳入后续版本说明。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报（2026-11-27）

## 1. 今日速览

- 过去24小时 Issues 更新 **28 条**：新开/活跃 **13 条**、关闭 **15 条**，净关闭 **2 条**；PR 更新 **48 条**：待合并 **29 条**、合并/关闭 **19 条**；新版本 **0 个**。整体活跃度高，处于“修复与积压消化”状态。
- Issue 关闭率约为更新量的 **53.6%**，triage/关闭效率较好；但 PR 待合并量是关闭量的 **1.53 倍**，审阅吞吐仍是主要瓶颈。
- 今日修复面集中在 Windows 本地模型进程、Console 渲染、Feishu/Discord 格式化、cron token 统计、video_memory 边界处理等；多个小 fix PR 已提交。
- 新回归值得关注：升级 `2.3.0-post1` 后前端任务状态不持续刷新 [\#8949](https://github.com/agentscope-ai/QwenPaw/issues/8949)，以及 Console 单波浪号被解析为删除线 [\#8948](https://github.com/agentscope-ai/QwenPaw/issues/8948)。
- 设计层讨论升温：长期记忆“引用计数归档” [\#8882](https://github.com/agentscope-ai/QwenPaw/issues/8882) 直指“Never forgets”承诺与记忆衰减/清理之间的矛盾。

## 2. 版本发布

今日无新版本发布，故不展开破坏性变更与迁移事项。Releases 页面见：[\#releases](https://github.com/agentscope-ai/QwenPaw/releases)。

## 3. 项目进展

- **Linux 桌面打包推进**：PR [\#8444](https://github.com/agentscope-ai/QwenPaw/pull/8444) 已进入 CLOSED 状态，内容为 Tauri 构建增加 Linux `deb` 与 AppImage 打包。若最终合入，将补齐 Linux 桌面产物缺口。
- **Windows 本地模型稳定性修复关闭**：Issue [\#8830](https://github.com/agentscope-ai/QwenPaw/issues/8830) 已关闭，针对 `llama-server.exe` 在异常退出/重启后残留、累积耗尽内存并阻止本地模型启动的问题。这是今日最重要的稳定性收口之一。
- **本地模型 CLI 提示修正**：Issue [\#8872](https://github.com/agentscope-ai/QwenPaw/issues/8872) 已关闭，修正 `qwenpaw models list` 仍提示已不再注册的 `download/local/remove-local` 命令的问题。
- **cron token 统计口径修复**：Issue [\#8705](https://github.com/agentscope-ai/QwenPaw/issues/8705) 已关闭，cron 任务 token usage 未写入 `turns.jsonl`、导致用量面板缺失 cron 消耗的问题得到处理。
- **Console/渠道格式化修复关闭**：Console 内容高度收缩导致 transcript 跳回 [\#8888](https://github.com/agentscope-ai/QwenPaw/issues/8888)、Discord `chunk_text` 在 chunk 边界重复 code fence [\#8870](https://github.com/agentscope-ai/QwenPaw/issues/8870)、Feishu `extract_json_key()` 非对象 JSON 崩溃 [\#8912](https://github.com/agentscope-ai/QwenPaw/issues/8912) 等已关闭。
- **修复已在路上**：Feishu 表格卡代码块误判有 PR [\#8946](https://github.com/agentscope-ai/QwenPaw/pull/8946)；`ToolCallBudgetGate` 重复计数有 PR [\#8944](https://github.com/agentscope-ai/QwenPaw/pull/8944)；video_memory 空值/分段上限有 PR [\#8933](https://github.com/agentscope-ai/QwenPaw/pull/8933)、[\#8932](https://github.com/agentscope-ai/QwenPaw/pull/8932)；Windows 插件测试有 PR [\#8942](https://github.com/agentscope-ai/QwenPaw/pull/8942)。

**推进幅度判断**：今日 Issue 净减少 2 条，PR 合并/关闭 19 条，说明维护者在积极清理；但 29 条 PR 待合并显示代码供给旺盛、审阅队列偏长。无 release，今日更偏“稳定性修复日”而非“功能发布日”。

## 4. 社区热点

> PR 评论数字段在给定数据中缺失，以下 Issue 按评论/反应排序，PR 按影响面列示。

- **[\#8845 Console Markdown 表格溢出消息气泡](https://github.com/agentscope-ai/QwenPaw/issues/8845)**：4 条评论、1 个 👍，为今日评论最多 Issue。用户指出表格超出气泡且无法横向滚动，溢出列不可见但仍可选中，属于 Console 阅读体验的高频痛点。
- **[\#8882 长期记忆引用计数归档设计](https://github.com/agentscope-ai/QwenPaw/issues/8882)**：3 条评论。诉求是把过期长期记忆条目标记为状态变化而非直接删除，解决“该记的记不住、陈旧条目堆积”的双重症状，涉及记忆 TTL、引用追踪与衰减机制。
- **[\#8830 Windows `llama-server.exe` 孤儿进程](https://github.com/agentscope-ai/QwenPaw/issues/8830)**：3 条评论，已关闭。背后是 Windows 本地模型用户对后端重启后内存耗尽、模型无法启动的强痛点。
- **[\#8949 升级后前端不持续显示最新任务状态](https://github.com/agentscope-ai/QwenPaw/issues/8949)**：今日新开，2 条评论。用户描述任务实际在跑但前端一直转圈或提前结束，刷新后才发现已完成，属于信任感/可观测性回归。
- **PR 侧影响面较大者**：[\#8532 追加式会话存储、分页历史与 Turn fork](https://github.com/agentscope-ai/QwenPaw/pull/8532)（size/XXXL）、[\#8719 Console 运行时 base-path 部署](https://github.com/agentscope-ai/QwenPaw/pull/8719)（size/XXXL）、[\#8649 llama.cpp GPU 控制与运行时自动更新](https://github.com/agentscope-ai/QwenPaw/pull/8649)、[\#8928 自定义决策模型端点](https://github.com/agentscope-ai/QwenPaw/pull/8928)。

## 5. Bug 与稳定性

| 严重度 | 问题 | 状态 | Fix PR / 备注 |
|---|---|---|---|
| 高 | [\#8949](https://github.com/agentscope-ai/QwenPaw/issues/8949) 升级 `2.3.0-post1` 后前端不持续显示任务最新状态，刷新后才发现完成 | OPEN | 数据中未见 fix PR；疑似前端状态流/回归，影响任务可信度 |
| 高 | [\#8725](https://github.com/agentscope-ai/QwenPaw/issues/8725) 渠道内 `/model` 无法切换会话级钉住模型，钉住模型故障时无法自救 | OPEN | 未见 fix PR；影响 Feishu/钉钉等渠道生产可用性 |
| 高 | [\#8943](https://github.com/agentscope-ai/QwenPaw/issues/8943) `ToolCallBudgetGate` 每轮重复计入早期工具调用，预算 N 实际约在 √(2N) 次后停止 | OPEN | 已有 [\#8944](https://github.com/agentscope-ai/QwenPaw/pull/8944) |
| 中 | [\#8845](https://github.com/agentscope-ai/QwenPaw/issues/8845) Markdown 表格溢出气泡且无横向滚动 | OPEN | 未见 fix PR；Console 展示问题 |
| 中 | [\#8948](https://github.com/agentscope-ai/QwenPaw/issues/8948) 单个 `~` 被当删除线定界符，数字区间如 `600~1500 t/s` 被划掉且 `~` 丢失 | OPEN | 今日新开；未见 fix PR |
| 中 | [\#8945](https://github.com/agentscope-ai/QwenPaw/issues/8945) Feishu 表格卡把代码块内 `|` 行当表格/标题 | OPEN | 已有 [\#8946](https://github.com/agentscope-ai/QwenPaw/pull/8946) |
| 中 | [\#8931](https://github.com/agentscope-ai/QwenPaw/issues/8931) `video_memory.merged_graph_payload()` 对 null/非字符串 root themes/key_entities 崩溃 | OPEN | 已有 [\#8933](https://github.com/agentscope-ai/QwenPaw/pull/8933) |
| 中 | [\#8930](https://github.com/agentscope-ai/QwenPaw/issues/8930) `plan_segments()` 可能返回超过 `max_scene_sec` 的段 | OPEN | 已有 [\#8932](https://github.com/agentscope-ai/QwenPaw/pull/8932) |
| 低-中 | [\#8941](https://github.com/agentscope-ai/QwenPaw/issues/8941) Windows 上 12 个 plugin-install 测试失败（symlink 权限、初始化超时、venv launcher pid） | OPEN | 已有 [\#8942](https://github.com/agentscope-ai/QwenPaw/pull/8942) |

已关闭但仍值得记录的严重问题：[\#8830 Windows 孤儿 llama-server](https://github.com/agentscope-ai/QwenPaw/issues/8830)、[\#8727 Responses continuation summary 输出预算失败](https://github.com/agentscope-ai/QwenPaw/issues/8727)、[\#8888 Console transcript 跳回](https://github.com/agentscope-ai/QwenPaw/issues/8888)。

## 6. 功能请求与路线图信号

- **长期记忆生命周期管理**：[\#8882](https://github.com/agentscope-ai/QwenPaw/issues/8882) 提出引用计数归档、TTL/衰减、状态化过期，而非直接删除。当前无对应 PR，属于需要设计评审的中长期方向。
- **更多 `web_search` provider**：[\#8947](https://github.com/agentscope-ai/QwenPaw/issues/8947) 请求将 WebRouter 作为 Tavily、AnySearch、Firecrawl 之外的第四个 provider。若接受，属于生态扩展型小到中型功能。
- **MCP 配置页 header 表单**：[\#8929](https://github.com/agentscope-ai/QwenPaw/issues/8929) 反映大量 MCP 需要 header 认证，但配置页只能转原生 JSON，期望表单化。属于 Console UX 改进，较可能进入后续小版本。
- **Composer 富文本编辑器路线**：[\#8938](https://github.com/agentscope-ai/QwenPaw/issues/8938) 询问是否从原生 `<textarea>` 迁移到 Lexical 等富编辑器，并重做引用回复渲染。当前是 roadmap 询问，尚无 PR。
- **PR 路线图信号**：[\#8928 自定义决策模型端点](https://github.com/agentscope-ai/QwenPaw/pull/8928) 指向模型设置增强；[\#8649 llama.cpp GPU 控制与自动更新](https://github.com/agentscope-ai/QwenPaw/pull/8649) 指向本地模型体验；[\#8719 运行时 base-path 部署](https://github.com/agentscope-ai/QwenPaw/pull/8719) 指向企业反代部署；[\#8787 插件主题语义色](https://github.com/agentscope-ai/QwenPaw/pull/8787) 指向插件生态；[\#8532 追加式会话存储/Turn fork](https://github.com/agentscope-ai/QwenPaw/pull/8532) 属于大版本级能力。
- **下一版本判断**：小修复 PR（[\#8942](https://github.com/agentscope-ai/QwenPaw/pull/8942)、[\#8944](https://github.com/agentscope-ai/QwenPaw/pull/8944)、[\#8946](https://github.com/agentscope-ai/QwenPaw/pull/8946)、[\#8932](https://github.com/agentscope-ai/QwenPaw/pull/8932)、[\#8933](https://github.com/agentscope-ai/QwenPaw/pull/8933)）更可能进入补丁版本；[\#8928](https://github.com/agentscope-ai/QwenPaw/pull/8928)、[\#8649](https://github.com/agentscope-ai/QwenPaw/pull/8649)、[\#8719](https://github.com/agentscope-ai/QwenPaw/pull/8719) 更可能进入下一次 minor；[\#8532](https://github.com/agentscope-ai/QwenPaw/pull/8532) 体量大，需持续观察。

## 7. 用户反馈摘要

- **Windows 本地模型用户痛点最重**：孤儿 `llama-server.exe` 进程导致内存耗尽、无法启动本地模型 [\#8830](https://github.com/agentscope-ai/QwenPaw/issues/8830)。该问题已关闭，但说明 Windows 后端生命周期管理是高风险区。
- **Console 渲染细节影响信任**：表格溢出 [\#8845](https://github.com/agentscope-ai/QwenPaw/issues/8845)、`~` 删除线吞字符 [\#8948](https://github.com/agentscope-ai/QwenPaw/issues/8948)、transcript 跳回 [\#8888](https://github.com/agentscope-ai/QwenPaw/issues/8888) 均非崩溃，但高频影响阅读和复制数据。
- **任务状态可观测性出现回归**：[\#8949](https://github.com/agentscope-ai/QwenPaw/issues/8949) 中用户无法判断任务是否仍在执行，刷新后才发现已完成，属于“功能正常但体验不可信”的典型反馈。
- **多渠道生产使用诉求明确**：Feishu 代码块被误判为表格 [\#8945](https://github.com/agentscope-ai/QwenPaw/issues/8945)、引用回复 `/stop` 被当普通消息 [\#8342](https://github.com/agentscope-ai/QwenPaw/issues/8342)（已关闭）、渠道内无法切换钉住模型 [\#8725](https://github.com/agentscope-ai/QwenPaw/issues/8725)，均来自真实渠道场景。
- **配置易用性与安全恢复**：本地模型列表提示失效命令 [\#8872](https://github.com/agentscope-ai/QwenPaw/issues/8872)（已关闭）、MCP header 需手写 JSON [\#8929](https://github.com/agentscope-ai/QwenPaw/issues/8929)、压缩失败建议 `/clear` 易误导清空上下文 [\#8848](https://github.com/agentscope-ai/QwenPaw/issues/8848)（已关闭），用户希望 UI 更友好、恢复建议更安全。
- **满意度信号**：15 条 Issue 在 24 小时内关闭，说明维护者响应和收口速度较好；但高影响开放项和前端回归仍会削弱用户对稳定版的信心。

## 8. 待处理积压

以下按停留时长与影响面排序；多数条目今日仍有更新，但尚未形成合入/关闭结论，建议维护者关注审阅与决策节奏。

- [\#8532 \[OPEN\]\[size/XXXL\] 追加式会话存储、分页历史与原生 Turn fork](https://github.com/agentscope-ai/QwenPaw/pull/8532)：自 2026-11-02 起开放，体量最大，涉及 Console 与持久化架构，是当前最重待审 PR。
- [\#8649 \[OPEN\]\[size/L\] llama.cpp GPU 控制与运行时自动更新](https://github.com/agentscope-ai/QwenPaw/pull/8649)：自 2026-11-09 起开放，属本地模型体验关键增强。
- [\#8713 \[OPEN\]\[Under Review,size/L\] 记录每次工具调用以触发 doom-loop gate](https://github.com/agentscope-ai/QwenPaw/pull/8713)：自 2026-11-13 起开放，关系默认模式 `DoomLoopGate` 是否真正生效。
- [\#8719 \[OPEN\]\[Under Review,size/XXXL\] Console 运行时 base-path 部署](https://github.com/agentscope-ai/QwenPaw/pull/8719)：自 2026-11-13 起开放，企业反代部署诉求明确。
- [\#8787 \[OPEN\]\[Under Review,size/XL\] 向插件主题暴露语义色角色](https://github.com/agentscope-ai/QwenPaw/pull/8787)：自 2026-11-17 起开放，关系插件主题生态完整性。
- [\#8725 \[OPEN\]\[Bug\] 渠道内 `/model` 无法切换会话级钉住模型](https://github.com/agentscope-ai/QwenPaw/issues/8725)：自 2026-11-13 起开放，生产渠道自救能力缺口，优先级应较高。
- [\#8845 \[OPEN\] Console Markdown 表格溢出且无横向滚动](https://github.com/agentscope-ai/QwenPaw/issues/8845)：自 2026-11-20 起开放，今日评论最多，仍缺 fix PR。
- [\#8882 \[OPEN\]\[enhancement\] 长期记忆引用计数归档设计](https://github.com/agentscope-ai/QwenPaw/issues/8882)：自 2026-11-24 起开放，属设计型议题，需要明确是否进入 roadmap。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报（2026-11-27）

## 一、今日速览

- 过去 24 小时 Issues 更新 **280 条**，其中新开/活跃 **260 条（92.9%）**、关闭 **20 条（7.1%）**；PR 更新 **500 条**，待合并 **317 条（63.4%）**、已合并/关闭 **183 条（36.6%）**，代码侧吞吐显著高于 Issue 侧清理速度。
- 今日**无新版本发布**，但已积累多个带破坏性标记的 PR（记忆插件外置、会议管线迁出核心），下一次发版的变更面可能较大。
- 讨论热度集中在**长期记忆/压缩链路的可恢复性**（RFC #143379，64 条评论）、**Gateway 会话状态与多租户隔离**、以及**Kanban 并发崩溃（P1）**三条主线。
- 平台适配层是今日 Bug 高发区：Slack、Teams、Feishu、Matrix、Discord 均有兼容性或投递失败问题在更新。
- 健康度评估：**开发吞吐强、社区参与深，但积压与长龄 P1 风险上升**——317 条待合并 PR、两个 P1 已挂起约一个月（#145022、#145215），需警惕评审瓶颈与发版前的回归风险。

## 二、版本发布

今日无新版本发布，最近版本仍为 v0.23.2（见 #156899 环境说明）。

## 三、项目进展

**今日关闭/合并的代表性 PR（183 条中的可见样本）：**

- [#104628](https://github.com/NousResearch/hermes-agent/pull/104628) `fix(gateway)`：为 Gateway 补齐 `POST /api/audio/speak`，使远程桌面（remote-desktop）会话的 Read Aloud / 语音对话可用。此前该路由仅存在于本地 dashboard，属于**能力对齐型修复**。
- [#110965](https://github.com/NousResearch/hermes-agent/pull/110965) `fix(update)`：阻止长生命周期进程（如 desktop backend）在就地更新后继续运行旧代码。这直接针对“更新后不重启就坏”的一类高频故障，**升级可靠性**改善明显。
- [#111202](https://github.com/NousResearch/hermes-agent/pull/111202) `fix(desktop)`：无显示器主机上不再重建 Electron 桌面应用，减少 headless 服务器上的无效构建与失败。
- [#159524](https://github.com/NousResearch/hermes-agent/pull/159524) `feat(pm)`：新增 `HERMES_INSTALL_STATE_DIR`，允许启动器为进程指定 install-state 目录，利好沙箱与多解释器部署场景。
- Issue 侧关闭的代表项：[#68871](https://github.com/NousResearch/hermes-agent/issues/68871)（Buzz 消息平台支持，21 条评论、16 👍，为本期反应数第二高的 Issue）。

**正在推进、值得关注的高影响 PR：**

| PR | 方向 | 意义 |
|---|---|---|
| [#159622](https://github.com/NousResearch/hermes-agent/pull/159622) | ByteRover / RetainDB 记忆后端迁出核心，转为 Hermes Labs 插件（带 `!` 破坏性标记） | 核心瘦身 + 插件化，现有用户自动迁移并提示 |
| [#159653](https://github.com/NousResearch/hermes-agent/pull/159653) | Google Meet、Teams meeting pipeline 迁为官方目录插件，已启用实例自动安装并启用 | 同上，会议能力从核心解耦 |
| [#160621](https://github.com/NousResearch/hermes-agent/pull/160621) | 压缩摘要附带“仍在运行的后台进程”清单（salvage #145342） | 解决长会话压缩后 agent 丢失/重启 dev server 的问题 |
| [#160651](https://github.com/NousResearch/hermes-agent/pull/160651) | 响应超出 5 分钟 prompt cache 时发送 keep-alive，避免下次请求全量重写缓存（fixes #160322） | 直接降低 Anthropic 侧计费成本 |
| [#160626](https://github.com/NousResearch/hermes-agent/pull/160626) | 桌面状态栏展示 session token、缓存命中率与花费 | 可观测性/成本透明度 |
| [#96917](https://github.com/NousResearch/hermes-agent/pull/96917) | 钉钉出站图片/文件上传（替换失败桩） | 补齐 IM 适配能力 |
| [#160624](https://github.com/NousResearch/hermes-agent/pull/160624) | MCP OAuth 可配置 `oauth.bind_host`，支持远程主机代理回调 | 远程/无头部署友好 |
| [#160649](https://github.com/NousResearch/hermes-agent/pull/160649) | 修复 Anthropic OAuth 下工具别名（`chat_history_lookup`→`session_search` 等）解析 | 工具调用正确性 |
| [#160640](https://github.com/NousResearch/hermes-agent/pull/160640) | Kanban dispatcher 警告中报告并发限流原因 | 运维可诊断性 |

**整体推进判断**：今日进展呈现三条清晰主线——①**升级/更新链路可靠性**（#110965、#111202、#126972、#160650）；②**核心插件化与生态目录扩张**（#159622、#159653、#160620、#160625）；③**长会话成本与状态保持**（#160621、#160651）。项目在“可运维、可扩展”方向上迈进了实质一步，但破坏性变更在排队，下一版本的迁移说明需重点准备。

## 四、社区热点

1. **[#143379](https://github.com/NousResearch/hermes-agent/issues/143379)（OPEN，64 条评论）— RFC：DOC-CHAIN SUBSTRATE 的读取、治理与压缩**
   讨论“持久记录在会话压缩后仍保留 provenance、agent 重新读取而非让用户重复输入”。这是当前**评论数最高、设计深度最深**的议题，反映社区对“长期记忆不可丢、可追溯”的强烈诉求，也与 #117886、#160621 形成同一主题簇。

2. **[#145022](https://github.com/NousResearch/hermes-agent/issues/145022)（OPEN，P1，30 条评论）— Kanban worker 在 gateway 卡顿时崩溃**
   多 worker 并发时以退出码 1 报 “Kanban execution unknown; retained by owner”，一次卡顿可同时杀死 4 个 worker 且丢失进行中的工作。**P1 且已持续约一个月**，是当前最需要维护者回应的稳定性问题。

3. **[#68871](https://github.com/NousResearch/hermes-agent/issues/68871)（CLOSED，21 条评论，16 👍）— 为 Buzz 增加消息支持**
   Block 开源的 Buzz 主打“人类与 AI agent 共享同一房间”的自托管工作区，社区希望 Hermes agent 直接加入。今日关闭，说明官方对该集成方向已有结论（具体落地形态未在数据中体现）。

4. **[#29531](https://github.com/NousResearch/hermes-agent/issues/29531)（OPEN，18 条评论，4 👍）— Gateway 按会话隔离工作目录**
   `terminal.cwd` 目前是进程级全局配置，而 Gateway 单进程服务多个并发会话。这是**多租户正确性**问题，与 #28279（按聊天隔离记忆）构成同一诉求。

5. **[#110374](https://github.com/NousResearch/hermes-agent/issues/110374)（OPEN，17 条评论，20 👍）— Slack 状态指示器在 slack-sdk ≥ 3.44 后静默失效**
   本期**反应数最高**（20 👍）。`agents.sessions.setStatus` 拒绝自由文本与空状态，且失败仅写 debug 日志，导致“is thinking…”与逐工具状态全部消失，用户无感知。

6. **[#79357](https://github.com/NousResearch/hermes-agent/issues/79357)（OPEN，13 条评论，6 👍）— Gateway 模式下 `idle_compact_after_seconds` 永不触发**
   watchdog 在每次外部 turn 开始时重置 `_last_activity_ts`，空闲压缩读取同一时间戳，测量窗口被清零。

7. **[#158538](https://github.com/NousResearch/hermes-agent/issues/158538)（OPEN，13 条评论）— 主动性（Proactivity）路线图**
   由维护者 @teknium1 发起，对比 Hark Pro、OpenAI dots、Meta Muse、Grok Bot 的“后台找事做”机制，指出用户主要抱怨噪音、过度读取与时机不当，Hermes 坚持“每次主动运行都是用户批准过的 job”。**属于官方路线图信号**。

8. **[#160651](https://github.com/NousResearch/hermes-agent/pull/160651)（OPEN）— prompt cache 保活**
   虽为新 PR，但直击“长回复导致缓存过期、下次请求全量重写”的计费痛点，预计会获得较多成本敏感型用户关注。

**诉求归纳**：社区关注点已从“能不能用”转向**多会话隔离、长期记忆可靠性、平台适配稳定性与成本可控**，企业/多 profile 部署者是主要发声群体。

## 五、Bug 与稳定性

**P1（严重，建议优先处理）**

- [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) Kanban worker 并发崩溃、工作丢失（gateway 保存期间卡顿触发）。**未在今日 PR 列表中看到对应 fix**。
- [#145215](https://github.com/NousResearch/hermes-agent/issues/145215) 双后端同 profile 场景下，session resume 快照超过 1 MiB（websocket `max_size` 默认值）后 owner 转发失败，用户消息直接丢失。**同样未见 fix PR**。

**P2（功能受损/数据风险）**

- [#127731](https://github.com/NousResearch/hermes-agent/issues/127731) 高频 cron 主机上自动更新前备份永远被跳过（归档出现 member error → 判为 incomplete），**存在升级前无可用备份的数据风险**。
- [#146955](https://github.com/NousResearch/hermes-agent/issues/146955) Windows 11 + v0.22.5 多 profile gateway：Kanban worker 已被接纳并绑定，但 prompt 从未送达，进程空转至超时（相对 v0.22.2 的**回归**）。
- [#159438](https://github.com/NousResearch/hermes-agent/issues/159438) Gateway 在 terminal 命令执行中被杀后，恢复会话看不到该调用，模型会**重复执行**命令（新报，11-24 创建）。
- [#156899](https://github.com/NousResearch/hermes-agent/issues/156899) v0.23.2 下 profile provider 插件并发首次查找竞态，长期进程内持续 “Unknown provider”，需重启恢复。已有修复思路（#122279 同属 provider 路由持久化范畴，但非同一问题）。
- [#79357](https://github.com/NousResearch/hermes-agent/issues/79357) Gateway 模式空闲压缩永不触发。
- [#133421](https://github.com/NousResearch/hermes-agent/issues/133421) 桌面浏览器会话守卫把真正聚焦的 chat tile 误判为后台会话并拒绝。
- [#105163](https://github.com/NousResearch/hermes-agent/issues/105163) stall-guard 意图识别仅匹配 5 条英文短语，非英文 agent 的反卡死保护实际失效。
- [#113578](https://github.com/NousResearch/hermes-agent/issues/113578) Teams 适配器无法发送文档（`400 Unknown attachment type`；独立 sender 直接 `400 BadSyntax`）。
- [#144523](https://github.com/NousResearch/hermes-agent/issues/144523) 桌面新建会话偶发 “provider 'custom' resolved without credentials”（launch key 绑定缺 base_url）。
- [#155638](https://github.com/NousResearch/hermes-agent/issues/155638) Matrix 回执恢复无限重试：`UnscopedSecretError (MATRIX_HOME_ROOM)` 在 profile scope 外抛出。
- [#78975](https://github.com/NousResearch/hermes-agent/issues/78975) Feishu cron 投递 100% 失败：`receive_id_type="thread_id"` 非合法 API 值。
- [#127942](https://github.com/NousResearch/hermes-agent/issues/127942) MCP `lazy: true` 永不生效（SDK 默认 `ttlMs=0` 使缓存立即过期），已标记 duplicate。
- [#122271](https://github.com/NousResearch/hermes-agent/issues/122271) Kanban 卡片因 block 循环被自动路由到 triage 后，`unblock` 无法重新入队。
- [#142712](https://github.com/NousResearch/hermes-agent/issues/142712) 同一插件同时存在于共享 home 与 profile home 时 `uv lock` 失败。
- [#119261](https://github.com/NousResearch/hermes-agent/issues/119261) DeepSeek 通过 OpenRouter 时 DSML 泄漏到桌面输出（标记 needs-repro，随机复现）。
- [#110374](https://github.com/NousResearch/hermes-agent/issues/110374) Slack 状态指示器因 SDK 升级静默失效（失败仅 debug 日志，属可观测性缺陷）。

**P3 / 低优先级**

- [#108575](https://github.com/NousResearch/hermes-agent/issues/108575) `profile create --clone` 不带 `max_turns`，克隆 profile 仅 4 轮预算（已标 invalid 但仍开启）。
- [#147556](https://github.com/NousResearch/hermes-agent/issues/147556) 官网 iOS TestFlight 邀请链接返回 “Beta Not Found”。

**已有 fix PR 关联**：[#160649](https://github.com/NousResearch/hermes-agent/pull/160649)（Anthropic OAuth 工具别名）、[#160640](https://github.com/NousResearch/hermes-agent/pull/160640)（Kanban 并发警告）、[#126972](https://github.com/NousResearch/hermes-agent/pull/126972)（macOS launchd plist 刷新与 gateway drain，closes #126883）、[#122279](https://github.com/NousResearch/hermes-agent/pull/122279)（不持久化推断出的 provider 路由）、[#104697](https://github.com/NousResearch/hermes-agent/pull/104697)（config 安全策略键守卫）、[#160651](https://github.com/NousResearch/hermes-agent/pull/160651)（fixes #160322）。

**稳定性判断**：Bug 分布高度集中在 **Gateway / 会话状态（约 40%）** 与 **IM 平台适配层**，两者都与“上游 SDK 变更 + 多进程/多 profile 并发”有关，属于架构性而非偶发问题。两个 P1 均与 gateway 卡顿/大消息边界相关，且尚无 fix PR，是本周期最大风险点。

## 六、功能请求与路线图信号

**可能进入下一版本（已有明确 PR 或官方主导）**

- **记忆/会议能力插件化**：[#159622](https://github.com/NousResearch/hermes-agent/pull/159622)（ByteRover/RetainDB → Hermes Labs）、[#159653](https://github.com/NousResearch/hermes-agent/pull/159653)（Google Meet / Teams pipeline → 官方目录插件）。两者均带自动迁移逻辑，**大概率随下一版本发布**，且需在 release notes 中明确“不再随核心提供、无支持保证”。
- **长会话压缩增强**：[#160621](https://github.com/NousResearch/hermes-agent/pull/160621) 让压缩摘要携带后台进程清单，直接回应 #143379 所在的压缩主题簇；#117886（post-turn 后台压缩，避免阻塞当轮回复）虽无直接 PR，但方向一致，可能被逐步吸收。
- **成本与可观测性**：[#160626](https://github.com/NousResearch/hermes-agent/pull/160626) 桌面展示 token/缓存命中/花费，配合 #160651 的 cache keep-alive，构成“省钱 + 看得见”的组合。
- **插件目录扩张**：[#160625](https://github.com/NousResearch/hermes-agent/pull/160625)（EverOS 记忆）、[#160620](https://github.com/NousResearch/hermes-agent/pull/160620)（cutroom 0.3.0）、[#153414](https://github.com/NousResearch/hermes-agent/pull/153414)（hermes-ride 黑客松作品），目录正成为主要扩展面。

**仍在讨论、短期难落地**

- [#29531](https://github.com/NousResearch/hermes-agent/issues/29531) 按会话隔离 cwd（P2，needs-decision）：涉及 Gateway 进程模型，改动面大。
- [#28279](https://github.com/NousResearch/hermes-agent/issues/28279) 按聊天隔离记忆（多聊天隐私漏洞）：与 #29531 同源，可能需与记忆插件化一并设计。
- [#81885](https://github.com/NousResearch/hermes-agent/issues/81885) 本地跨会话消息（intercom，发现 + 对等收件箱）：多会话协作用户的明确需求。
- [#16106](https://github.com/NousResearch/hermes-agent/issues/16106) Gateway 首个可见输出的 SLO 与 provider 时序追踪：体验可观测性。
- [#158538](https://github.com/NousResearch/hermes-agent/issues/158538) 主动性路线图：官方态度谨慎（坚持“用户批准的 job”），短期不会引入无约束后台扫描。
- [#17215](https://github.com/NousResearch/hermes-agent/issues/17215) 为 shutdown/reboot 提供可回滚开关（当前在无条件黑名单中）。
- [#156660](https://github.com/NousResearch/hermes-agent/issues/156660) Ruby 工具调用显示 💎 图标（低优先级体验项）。

**信号解读**：路线图正在从“功能堆叠”转向**核心最小化 + 目录生态 + 成本/可观测性**；多租户隔离是社区最强但官方最谨慎的方向。

## 七、用户反馈摘要

**真实痛点**

- **多租户隔离缺失**：`terminal.cwd` 进程级全局（#29531）、记忆全局注入（#28279）让同一 Gateway 上的多个会话互相影响，多聊天场景被视为“显著隐私风险”。这是企业/团队用户最核心的不满。
- **升级链路脆弱**：更新后旧代码驻留（#110965）、macOS launchd 兄弟进程 plist 过期（#126972）、headless 主机被强制重建桌面应用（#111202）、高频 cron 下备份被跳过（#127731）——用户反复经历“更新后不重启就坏”“升级前没有可用备份”。
- **上游 SDK 变更导致静默失效**：Slack 状态（#110374）失败只写 debug 日志，用户完全无感；Feishu（#78975）、Teams（#113578）属硬失败。适配层维护成本正转嫁给用户。
- **长会话状态丢失**：压缩后丢失后台进程（#160621 要解决）、gateway 中途死亡后恢复会话看不到 terminal 调用并**重复执行**（#159438），对执行型 agent 是实质性风险。
- **Kanban 编排在高并发下不稳**：worker 崩溃（#145022）、Windows prompt 不投递（#146955）、triage 卡片无法回收（#122271），影响自动化流水线用户的信任。

**典型使用场景（从 Issue 描述提取）**

- 单机多 profile / 双后端（gateway owner + Desktop-SSH `serve --isolated`）的复合部署（#145215、#146955）。
- 无头远程主机 + 浏览器在另一端的 MCP OAuth 代理回调（#160624 的动机）。
- 自托管 IM 生态：Slack、Teams、Feishu、Matrix、DingTalk、Discord 全线在用，且大量跑 cron 定时投递。
- 本地 OpenAI 兼容端点（mlxserve，`localhost:11234/v1`）作为主 provider（#144523）。
- 长时间研究/实现/评审并行会话，希望会话间共享发现（#81885）。

**情绪与满意度**

- 点赞数整体偏低（最高 20，其次 16），但评论深度高（64/30/21 条），说明参与者以**深度运维用户与集成开发者**为主，而非泛用户投票型社区。
- 对官方修复响应总体认可：多个长龄 PR（#104628、#110965、#111202 均创建于 9 月）今日集中关闭，显示维护者在清理积压。
- 不满主要集中在**静默失败**（Slack 状态、provider 凭据）与**回归**（v0.22.5 Windows Kanban），用户期望更明确的错误暴露与升级前检查。

## 八、待处理积压

**长龄且影响大的 Issue**

- [#17215](https://github.com/NousResearch/hermes-agent/issues/17215)（2026-04-29，约 7 个月）shutdown/reboot 被无条件拉黑且无开关，用户明确请求“留一个可回滚的开关”。
- [#28279](https://github.com/NousResearch/hermes-agent/issues/28279)（2026-05-19，6 个月+）按聊天隔离记忆，隐私相关，11 条评论仍无结论。
- [#29531](https://github.com/NousResearch/hermes-agent/issues/29531)（2026-05-20，6 个月+）按会话隔离 cwd，18 条评论、`needs-decision`，是 Gateway 多租户的关键卡点。
- [#79357](https://github.com/NousResearch/hermes-agent/issues/79357) / [#78975](https://github.com/NousResearch/hermes-agent/issues/78975)（2026-08-05）空闲压缩失效、Feishu 投递 100% 失败，均近 4 个月未闭环。
- [#81885](https://github.com/NousResearch/hermes-agent/issues/81885)（2026-08-08）跨会话 intercom，多会话协作的基础能力。
- [#110374](https://github.com/NousResearch/hermes-agent/issues/110374)（2026-09-13，20 👍）Slack 状态静默失效，**本期反应最高的未修复项**。
- [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) / [#145215](https://github.com/NousResearch/hermes-agent/issues/145215)（2026-10-26）两个 P1 已挂起约一个月，且今日仍无 fix PR。
- [#143379](https://github.com/NousResearch/hermes-agent/issues/143379)（2026-10-23）64 条评论的 RFC 仍在开放，建议尽快给出阶段性结论或拆分可执行子任务，避免设计讨论长期悬空。

**长龄 PR（评审瓶颈）**

- [#96917](https://github.com/NousResearch/hermes-agent/pull/96917)（2026-08-28）钉钉出站媒体上传，已近 3 个月。
- [#104697](https://github.com/NousResearch/hermes-agent/pull/104697)（2026-09-07）config 安全策略键守卫（salvage #81108）。
- [#122279](https://github.com/NousResearch/hermes-agent/pull/122279)（2026-09-25）禁止持久化推断的 provider 路由。
- [#126972](https://github.com/NousResearch/hermes-agent/pull/126972)（2026-09-28）macOS launchd 双缺陷修复。
- 结构性提示：**317 条待合并 PR** 相对 183 条/日的关闭速度，净积压压力仍在；建议维护者对 `P1/P2 + sweeper:risk-*` 标签的 PR 设立优先评审通道，并在下一版本前清理带 `!` 的破坏性变更清单（#159622、#159653），避免发版时集中爆发迁移问题。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 · 2026-11-27

## 1. 今日速览

过去 24 小时 AstrBot 保持高强度迭代：Issues 更新 **10 条**（新开/活跃 7、已关闭 3），PR 更新 **41 条**（待合并 26、已合并/关闭 15），并发布 **v4.30.0-beta.2** 预发布版本。项目正处于 Beta 迭代窗口，核心团队在推"统计正确性（token 计量）→ 安全边界 → Agent 工具发现"三条主线。社区侧最热讨论是部署路径过度依赖 Napcat 的风险（#11394，3 条评论），同时 OpenAI TTS/STT 模型弃用催生配置默认值更新需求。安全方面有明确正面信号：Skill 路径遍历（#11399）与 Satori 属性注入（#11397）两处修复当日关闭。**健康度评估：活跃度处于高位，维护者对安全与阻塞性 Bug 的响应及时，PR 管线通畅（26 条待评审需关注 review 带宽）。**

---

## 2. 版本发布：v4.30.0-beta.2

**发布日期**：2026-11-26 ｜ **类型**：Beta 测试版（⚠️ 可能存在不稳定或兼容性问题，建议先在测试环境验证）

> 本版本涉及**对话数据库、Agent 配置和会话设置迁移**。升级前请备份数据与配置；回退旧版需同时恢复升级前备份。

**本版相对 beta.1 的变更（changelog 部分截断，完整清单见 Release 页）：**
- 系统语言查询 `Context.locale(...)` 相关调整（涉及 locale 解析/调用方式变更）。

**风险提示**：
- 迁移不可逆，回滚成本高——需严格按"备份 → 测试环境验证 → 生产升级"流程执行。
- 与 #11392（按请求追踪 token 用量）、#11400（v4.32 计划移除 `provider_stats`）属同一数据演进序列，建议升级方同步关注后续 v4.31/v4.32 迁移说明。

🔗 https://github.com/AstrBotDevs/AstrBot/releases

---

## 3. 项目进展

今日合并/关闭 15 条 PR，以下为影响较大的条目（PR 评论数数据未完整提供，按影响面排序）：

### ✅ 安全加固（当日关闭，建议随版本尽快下发）
- **#11399 [CLOSED] fix(skills): 校验技能名称与归档路径，防止路径遍历**
  修复仅持有 `skill` scope 的 API Key 通过相对/绝对路径删除 `skills_root` 之外目录，或借恶意 ZIP / 目录软链越界读写的问题。
  🔗 https://github.com/AstrBotDevs/AstrBot/pull/11399
- **#11397 [CLOSED] fix: 转义 Satori 文件属性**
  修复 `<file>` 的 `src`/`name` 未转义导致的坏标签乃至 `<at id="all"/>` 注入，附回归测试。
  🔗 https://github.com/AstrBotDevs/AstrBot/pull/11397

### ✅ 功能性修复
- **#10330 [CLOSED] fix(stt): Whisper API 默认模型改为 `gpt-transcribe`**
  应对 `whisper-1` 家族 2027-02-26 弃用，修复 #10317。
  🔗 https://github.com/AstrBotDevs/AstrBot/pull/10330
- **#11081 [CLOSED] fix: 阻止已删除会话历史重新出现**
  修复群聊上下文在删除会话后仍被下一轮回复使用；后继更完整方案 #11401 仍在评审。
  🔗 https://github.com/AstrBotDevs/AstrBot/pull/11081
- **#11396 [CLOSED] fix(dashboard): 恢复插件详情页粘性表头背景**
  修复 v4.29.0 后 `FullLayout.vue` 滚动容器变更导致的表头重叠回归。
  🔗 https://github.com/AstrBotDevs/AstrBot/pull/11396

### ⏳ 待合并的重点推进
- **#11392 [OPEN] feat: 按请求追踪 Chat token 使用**
  解决 Native Agent 整轮归因偏差（辅助/插件 Chat 调用漏计、归因到最终 fallback provider），与 #11400 的 `provider_stats → chat_request_stats` 迁移配套。
  🔗 https://github.com/AstrBotDevs/AstrBot/pull/11392
- **#11398 [OPEN] feat: 动态工具发现**
  为内置 Agent 增加 opt-in 的 `skills_like` 工具发现模式，默认仍为 `full`，缓解大工具目录的 token 开销。
  🔗 https://github.com/AstrBotDevs/AstrBot/pull/11398
- **#11371 [OPEN] perf(db): 限制 SQLite `cache_size`、关闭默认 `mmap_size`**
  Memray 显示 64.05 MiB 峰值来自对 ~65 MiB `data_v4.db` 的 mmap。
  🔗 https://github.com/AstrBotDevs/AstrBot/pull/11371
- **#11395 [OPEN] feat(telegram): 支持 Telegram Business 接管个人账号私聊**
  🔗 https://github.com/AstrBotDevs/AstrBot/pull/11395
- **#11352 [OPEN] refactor(dashboard): 以 stream-diffs 替换 Monaco 编辑器**（state: ready for review）
  🔗 https://github.com/AstrBotDevs/AstrBot/pull/11352

**整体推进判断**：当日关闭以"安全 + 回归修复"为主，功能型大 PR（token 计量、动态工具发现、Telegram Business）仍在评审。项目在 **统计正确性 / 安全边界 / Agent 能力扩展** 三线同步推进，节奏稳健。

---

## 4. 社区热点

1. **#11394 [OPEN] [documentation] 文档推荐的部署方法几乎都依赖 Napcat，而 Napcat 遭遇故障** ｜ 3 评论（今日最高）
   用户指出官方文档的部署路径几乎全部依赖 Napcat，而后者出现"坠机"（服务不可用/风控）。背后诉求是**降低单一第三方组件的部署耦合**，希望有非 Napcat 的官方部署方案。
   🔗 https://github.com/AstrBotDevs/AstrBot/issues/11394

2. **#11390 [OPEN] [open-for-contribution] OpenAI TTS 模板默认 `tts-1`，OpenAI 将于 2027-01-06 关闭该模型** ｜ 1 评论
   模板 `astrbot/core/config/default.py:1778` 预填 `"model": "tts-1"`，而 OpenAI 已将 `tts-1`、`tts-1-hd`、`gpt-4o-mini-tts` 列入 2027-01-06 下线名单。属"时间炸弹"型技术债，已标记 open-for-contribution。
   🔗 https://github.com/AstrBotDevs/AstrBot/issues/11390

3. **#11402 [OPEN] [enhancement] AstrBot 移动端远程管理客户端（iOS / Android）** ｜ 新建
   用户基于 Flutter 自研 v0.1.0，内置 SSH 隧道、无需暴露 WebUI 端口，覆盖 iOS/Android。**生态外溢信号强**，说明第三方对"低暴露面远程管理"需求真实存在。
   🔗 https://github.com/AstrBotDevs/AstrBot/issues/11402

4. **#11144 [CLOSED] 安全模式系统提示词在 CLIProxyAPI → Antigravity 场景下可复现 429 RESOURCE_EXHAUSTED** ｜ 1 评论
   `LLM_SAFETY_MODE_SYSTEM_PROMPT` 在中转网关场景触发上游限流，已关闭，说明维护者对网关兼容问题的处理闭环。
   🔗 https://github.com/AstrBotDevs/AstrBot/issues/11144

---

## 5. Bug 与稳定性

按严重程度排列：

| 级别 | Issue | 状态 | 是否有 fix PR | 说明 |
|---|---|---|---|---|
| 高 | **#11394** 部署文档依赖 Napcat 故障 | OPEN | ❌ 讨论阶段 | 影响面最广的部署稳定性问题 |
| 高 | **#11383** QQ 官方机器人 `At(qq="all")` 被静默丢弃 | OPEN | ❌ 暂无 | 问题定位在 `qqofficial_message_event.py` 的 `_parse_to_qqofficial`，非插件问题 |
| 中 | **#11391** 跨 Provider 回退历史消息 / `reasoning_content` 兼容 | OPEN | ❌ 暂无 | `openai_source.py` 采用硬编码模型名/域名白名单，跨协议上下文易触发 400 |
| 中 | **#11390** OpenAI TTS `tts-1` 弃用时间炸弹 | OPEN | ❌ 暂无 | 影响 2027-01-06 后的 TTS 可用性，需更新默认模板 |
| 中 | **#10887** 用户识别标识 UI 文案与实现不一致 | OPEN | ❌ 设计讨论 | `provider_settings.identifier` 描述与行为不符 |
| ✅ 已修复 | **#11325** weixin_oc 下行 100% 静默丢弃（`ret:0` 无 `message_id`） | CLOSED | — | 微信适配器只校验 `ret` 无法感知失败 |
| ✅ 已修复 | **#11386** weixin_oc 未实现 `get_client()`，第三方插件误判离线 | CLOSED | — | 已对照其余 10 个适配器补齐 |
| ✅ 已修复 | **#11144** CLIProxyAPI → Antigravity 429 | CLOSED | — | 安全模式提示词场景已闭环 |

**结论**：当日报告 5 个未关闭 Bug 中 2 个为高影响（部署依赖、QQ 官方 @ 全体），均无 fix PR，建议维护者优先排期；3 个已关闭 Bug 中 weixin_oc 连续两项阻塞问题当日闭环，适配器质量在提升。

---

## 6. 功能请求与路线图信号

- **#11402 移动端客户端**：第三方已交付 v0.1.0（含 SSH 隧道）。**判断**：短期不会被官方直接合并，但可能推动官方在"远程管理/低暴露部署"方向的 API 或文档投入，并与 #11394 的部署诉求形成合力。
- **#11391 跨 Provider 回退兼容 + #11223 清理 legacy tool-call 历史 + #11298 回填 Gemini usageMetadata + #11398 动态工具发现**：形成 "Provider 兼容性与 Agent 工具层" 的成组 PR 集群。**判断**：v4.31 有较大概率集中落地。
- **#11400 [deprecation-track] v4.32 移除 `provider_stats` 表**：已有配套 PR #11392。**判断**：路线图已明确，迁移窗口在 v4.31→v4.32。
- **#11390 TTS 模板更新 + 已合并的 #10330 STT 默认更新**：OpenAI 模型弃用驱动的配置迁移。**判断**：下一 beta 周期即可完成，属低成本高收益项。
- **#10887 用户识别标识位置（内联前缀 vs 尾部 system_reminder）**：偏设计层讨论，暂无对应 PR。**判断**：可能演化为配置项扩展，而非破坏性改动。

---

## 7. 用户反馈摘要

（基于 Issue 标题、摘要与评论热度推断，评论原文未完整提供）

- **部署焦虑**：Napcat 故障使"文档推荐路径"整体失效，用户希望有非 Napcat 的官方部署方案（#11394）——这是今日情绪最集中的诉求。
- **平台适配语义缺失**：QQ 官方 @全体成员静默失败（#11383）、weixin_oc 收发不对称与离线误判（#11325、#11386）——用户不仅要求"能用"，更要求"失败可见"。
- **模型兼容性摩擦**：跨 Provider 回退时思考块/工具调用历史易触发 400（#11391、#11223）；中转网关下 Gemini 用量统计恒为 0（#11298）——重度多模型用户的核心痛点。
- **配置默认值滞后**：OpenAI TTS/STT 模型弃用，用户希望模板与上游生命周期同步（#11390、#10330）。
- **正面信号**：用户主动贡献移动端客户端（#11402），标明生态扩展意愿与自建能力；weixin_oc 双 Bug 当日闭环，也获得即时反馈通道。

---

## 8. 待处理积压

提醒维护者关注以下创建较早、至今仍 OPEN 的条目：

| Issue/PR | 创建时间 | 停留时长 | 类型 | 备注 |
|---|---|---|---|---|
| **#10887** [OPEN] 用户识别标识位置（内联前缀 vs 尾部 system_reminder） | 2026-10-30 | ~4 周 | enhancement | 设计层讨论，无 PR |
| **#10893** [OPEN] feat(agent): 为请求工具调用的 LLM 轮次派发 hook | 2026-10-31 | ~4 周 | 功能 | Closes #10770 |
| **#10927** [OPEN] fix: 编码出站记录时保留 MP3 负载 | 2026-11-01 | ~3.5 周 | 修复 | 自 v4.26.0 起音频被转 WAV 膨胀 |
| **#10961** [OPEN] fix(provider): 支持 Gemini 中继别名与带日期 2.5 thinking 模型 | 2026-11-02 | ~3.5 周 | 修复 | 继 #11219 / #11251 后残留的模型 ID 匹配缺口 |
| **#11319** [OPEN] feat(kb): 知识库检索增强（query 清洗、分数阈值、混合检索） | 2026-11-22 | 5 天 | 功能 | 关注度上升，可提前 review |

**贡献者集中度提示**：今日展示的 20 条 PR 中约 **8 条**来自 @JosephTian876（Gemini / pipeline / provider / 媒体方向），建议维护者关注 review 带宽与贡献者引导，避免单点作者成为合并瓶颈。

---

*本日报基于 AstrBot GitHub 公共数据自动生成，时间窗口为 2026-11-26 至 2026-11-27。数据中部分 Issue/PR 摘要存在截断，统计口径以 GitHub 原始页面为准。*

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目日报 · 2026-11-27

> **数据口径说明**：该仓库未启用 GitHub Issues / Pull Requests，代码合并仅通过 Releases 落地。因此本报告中的社区信号全部取自 GitHub Discussions；由于全部样本 `👍 = 0`（反应功能基本未被使用），活跃度排序以**评论数**为唯一可靠指标。过去 24 小时 Discussions 更新 **124 条**，本报告覆盖其中评论数最高的 15 条（累计 153 条评论，占可见样本的头部 12%）。

---

## 1. 今日速览

1. **讨论端高热、交付端静默**：24 小时内 124 条 Discussions 更新、头部 15 帖累计 153 条评论，但**新版本发布 0 个、合并摘要为空**，项目处于典型的"高参与、低发版"节奏。
2. **稳定性问题集中爆发在 Windows 桌面端**：头部 15 帖中有 4 帖（#14271、#14221、#12988、#8409）直指 Windows 安装版/Electron 桌面版的崩溃、启动失败、升级失败与沙箱授权缺陷，其中 #14271 为"重装无效、普通用户无法自愈"的高严重度问题。
3. **形态之争再度升温**：要求独立客户端 / CLI / VS Code 插件的老帖 #172（自 2026-08-13 起累积 38 条评论）仍在持续更新，并叠加移动端诉求 #13724，说明"Web 优先"策略的用户侧阻力尚未消解。
4. **成本与上下文效率成为新的技术讨论主线**：compaction 相关的 #1944、#8079 与 goal 机制的 #4664 均指向"token 被非生产性消耗"，属于核心链路（缓存命中、触发阈值、轮次驱动）的设计级问题，而非外围瑕疵。
5. **健康度判断**：社区技术含量高（多帖自带根因定位与补丁），但**从"报告"到"落地"缺少可见通道**——无 PR、无 Issue、无 fix 状态标记，修复节奏完全依赖 Release 黑箱，这是当前项目最需要改进的流程环节。

---

## 2. 版本发布

**本次统计窗口内新版本发布：0 个**，无 Release changelog 可供摘要。

需要说明的是，从讨论帖中的环境信息可还原出**夜间通道（nightly）的快速迭代轨迹**：`0.2.0-rc.2`（#8409，2026-09-30 报告）→ `0.2.2-rc.1 → rc.2`（#12988，2026-11-11）→ `0.2.2-rc.3`（#14221，2026-11-24）→ `0.2.2-rc.5`（#14271、#13575，2026-11-17~25）。这说明工程侧仍在持续出包，但这些 rc 版本**未以 GitHub Release 形式留痕**，导致外部无法核对"哪个问题在哪个版本被修掉"。

- 影响：社区报告（如 #12988 的升级失败）与实际修复之间无法建立可验证的对应关系，用户只能靠反复试装确认，直接放大 #6931 所描述的"一个装完又发现另一个问题"的挫败感。

---

## 3. 项目进展

**官方合并/关闭记录：本窗口无**（无 PR 机制、无 Release 落地）。但按"社区侧实际推进量"评估，今日仍有可量化的前进：

| 推进项 | 类型 | 价值 | 链接 |
|---|---|---|---|
| #13575 macOS `setTypeOfService EINVAL` | 根因 + 补丁（作者自述） | 直接可合入的修复草案，覆盖 macOS 27 / Electron 37 / Node 24.21 | [discussions/13575](https://github.com/deepseek-ai/deepseek-harness/discussions/13575) |
| #14271 `installFailLoud` 将未捕获 `fetch ECONNRESET` 映射为 `proc.exit(1)` | 根因定位（定位到主进程全局失败策略） | 一次定位解决"运行态反复崩溃"整类问题 | [discussions/14271](https://github.com/deepseek-ai/deepseek-harness/discussions/14271) |
| #11251 `dsh-plugin-wsl-env` | 可运行第三方插件 + 六发行版兼容矩阵 | 实证"一切皆插件"的 seam provider 扩展点足够深，可把沙箱下沉到 WSL 内核 | [discussions/11251](https://github.com/deepseek-ai/deepseek-harness/discussions/11251) |
| #8409 Windows ACL 沙箱三缺陷 | 完整缺陷矩阵 + 环境复现条件 | 为 `dsh-sandbox-windows-acl` 提供可测试的验收清单 | [discussions/8409](https://github.com/deepseek-ai/deepseek-harness/discussions/8409) |
| #1944 / #8079 compaction 缓存与阈值 | 设计级分析（含 0.1.5 vs 0.1.7 行为对比） | 指向 prefix cache 利用率与 `headroomTokens` 绝对値两个可独立修复的点 | [#1944](https://github.com/deepseek-ai/deepseek-harness/discussions/1944) · [#8079](https://github.com/deepseek-ai/deepseek-harness/discussions/8079) |

**整体前进幅度评估**：社区贡献的"诊断与草案"质量高（至少 3 帖达到可直接转 issue/PR 的完成度），但**项目自身的合入门槛不可见**，这些成果目前停留在讨论区，尚未转化为版本增益——推进度约可评为"输入充足、转化受阻"。

---

## 4. 社区热点

| 排名 | 主题 | 评论 | 创建→更新 | 生命周期 |
|---|---|---|---|---|
| 1 | [#172 建议早点出独立客户端+CLI，并出 VS Code 插件](https://github.com/deepseek-ai/deepseek-harness/discussions/172) | 38 | 08-13 → 11-26 | **106 天** |
| 2 | [#3157 llm-pi-ai 本地 LLM 超时需延长至 20 分钟](https://github.com/deepseek-ai/deepseek-harness/discussions/3157) | 25 | 08-18 → 11-26 | **101 天** |
| 3 | [#1944 Compaction 请求完全绕过 provider prefix cache](https://github.com/deepseek-ai/deepseek-harness/discussions/1944) | 13 | 08-15 → 11-26 | **104 天** |
| 4 | [#8409 Windows ACL 沙箱三个授权缺陷](https://github.com/deepseek-ai/deepseek-harness/discussions/8409) | 13 | 09-30 → 11-26 | 58 天 |
| 5 | [#11251 dsh-plugin-wsl-env：把沙箱搬进 WSL](https://github.com/deepseek-ai/deepseek-harness/discussions/11251) | 8 | 10-28 → 11-26 | 30 天 |

**诉求分析：**

- **#172（38 条，全场最高）**：核心不是"再要一个 UI"，而是**分发形态决定可用性**——"WEB 形式还是不得劲"实质是本地文件系统访问、长任务驻留、编辑器内联上下文这三件事在浏览器沙箱里天然受限。106 天持续顶帖说明这不是一时情绪，而是**未被回应的稳定需求**。
- **#3157（25 条）**：Ollama + Gemma4:12b 场景下长 prompt 撞上 300,000ms（5 分钟）硬超时，用户尝试改 `settings.yaml` 未果（"no or got it wrong"）。诉求本质是**本地推理的时延分布与云端完全不同**，全局 5 分钟上限对本地模型是错误默认值；且当前配置项缺乏文档/校验，用户改错也无反馈。
- **#1944 + #8079（compaction 双子星）**：两者从不同侧面打同一处——压缩摘要请求**不复用 provider prefix cache**、不继承 `reasoningEffort`、额外注入 `maxTokens`；以及 `headroomTokens` 为绝对值 65536，在小上下文窗口上会**压垮触发条件**（0.1.5 的纯比例算法 → 0.1.7 的双项取最小，属行为回归）。这是**长期运行成本**问题，付费/自建用户最敏感。
- **#11251（插件生态正向样本）**：Windows-first + WSL 内核级沙箱 + 六发行版兼容矩阵，且作者把 shell 等三个 seam provider 都实现了。这类帖子是项目最有说服力的资产——**证明扩展点设计成立**，建议官方以"Featured Plugin"形式回收曝光。
- **#13724（移动端，8 条）** 与 **#6931（桌面端体验差，6 条，更新至 11-27）** 补全了形态诉求的另一端：前者要"离开笔记本也能跑 agent"，后者直言预设太少、装完一个又遇下一个。两者共同指向**开箱即用度不足**。

---

## 5. Bug 与稳定性

按严重程度排序。**统一说明：因仓库无 PR 通道，所有条目均无 fix PR 可标注**，仅标注社区是否已给出根因/补丁。

### 🔴 P0 — 运行态反复崩溃，用户无法自愈
**[#14271] `installFailLoud` 将未捕获 `fetch ECONNRESET` 映射为 `proc.exit(1)`（0.2.2-rc.5）**
[discussions/14271](https://github.com/deepseek-ai/deepseek-harness/discussions/14271) · 5 评论 · 更新 11-27 · 报告日 11-25
每个 Host 进程用 `installFailLoud()` 把 `unhandledRejection` 升级为进程退出，导致一次普通网络抖动即杀死主进程，表现为"进入运行态后反复崩溃，重装/清配置均无效"。报告者自评**严重程度：高**。
*修复状态*：社区已定位到具体机制，但该机制本身是**故意设计的 fail-loud 策略**，修复需在"快速失败"与"网络瞬时错误可重试"之间划边界，属设计决策，非一行补丁。

### 🔴 P0 — 启动失败
**[#14221] deepseek harness 启动老是失败（0.2.2-rc.3 / win32 x64 / Electron 44.7.0 / Node 24.2x）**
[discussions/14221](https://github.com/deepseek-ai/deepseek-harness/discussions/14221) · 6 评论 · 更新 11-26
附日志（`phase: running`）与截图，属**阻断型**问题：用户连界面都进不去。同类版本号已到 rc.5，需确认是否已修。
*修复状态*：无根因结论。

### 🟠 P1 — 升级通道失效，用户被锁死在旧版本
**[#12988] 应用内升级失败：`MoveFileExW` 报 Windows error 32，10 次重试全败并回滚（0.2.2-rc.1 → rc.2，nightly）**
[discussions/12988](https://github.com/deepseek-ai/deepseek-harness/discussions/12988) · 6 评论 · 更新 11-26
`ERROR_SHARING_VIOLATION (32)` 出现在"备份旧安装目录"步骤——典型的**安装器持有自身文件句柄**问题。危害是复合的：升级失败 → 用户停留在含 #14221/#14271 的旧版本 → 稳定性问题被放大。
*修复状态*：无。

### 🟠 P1 — 沙箱授权缺陷（权限模型可信度）
**[#8409] Windows ACL 沙箱（workspace-write）三缺陷：受保护 DACL 子目录永不获授权 / desktop 根授权缓存不复核不自愈 / 标准用户+非系统盘 `grantWrite` 失败（Win32 5）**
[discussions/8409](https://github.com/deepseek-ai/deepseek-harness/discussions/8409) · 13 评论 · 更新 11-26
环境明确：NTFS 非系统盘、**标准用户（无 Administrators，Low-IL 过滤令牌已实测确认）**。三个缺陷分别对应"永不生效""脏缓存不自愈""权限不足无降级路径"。
*修复状态*：无。**建议优先级上调**——沙箱是本项目的核心安全承诺，授权逻辑的三处静默失败会直接损害信任。

### 🟡 P2 — 未捕获异常弹窗（已有补丁草案）
**[#13575] macOS 反复弹 `Uncaught Exception: setTypeOfService EINVAL`（macOS 27.0.1 / Apple Silicon / 0.2.2-rc.5）**
[discussions/13575](https://github.com/deepseek-ai/deepseek-harness/discussions/13575) · 5 评论 · 更新 11-26
栈指向 `Socket.setTypeOfService → writeH1 (undici)`。作者已给出 **root cause + patch**，是本次窗口内**最接近可合入**的一条。
*修复状态*：社区提供补丁，等待合入通道。

### 🟡 P2 — 非生产性 token 消耗
- **[#4664] goal 开启后 agent 无法被动等待后台任务，每次 idle 即被强制注入 `<goal_round>`**（7 评论，[链接](https://github.com/deepseek-ai/deepseek-harness/discussions/4664)）：涉及 `dsh-goal`、`dsh-goal-round-driver`、`dsh-tool-jobs`，用户只能手动暂停 goal 才能等结果。空转既烧轮次也烧 token，且**用户不确定是 bug 还是用法问题**——本身就说明行为不可预期。
- **[#1944] Compaction 请求完全绕过 prefix cache**（13 评论，[链接](https://github.com/deepseek-ai/deepseek-harness/discussions/1944)）。

### 🟢 P3 — 边界条件
- **[#8079] `compaction-basic` 默认 `headroomTokens = 65536` 为绝对值，在小上下文窗口上击穿触发条件**（5 评论，[链接](https://github.com/deepseek-ai/deepseek-harness/discussions/8079)）：帖内含 0.1.5-rc.3 比例算法 vs 0.1.7-alpha.2 双项取最小的代码对照，属**行为回归**，小模型/本地模型用户必踩。
- **[#12018] Desktop 原生菜单仅英文/中文两套字典**（4 评论，[链接](https://github.com/deepseek-ai/deepseek-harness/discussions/12018)）：`lib/main.js` 内 `en`/`zh` 硬编码，无 i18n 扩展点。

---

## 6. 功能请求与路线图信号

按"落地可能性"从高到低排列（判断依据：是否已有社区实现、是否触及可配置面、是否涉及架构改动）：

| 需求 | 信号强度 | 落地判断 | 链接 |
|---|---|---|---|
| **本地 LLM 超时可配置（默认 5min → 可设 20min）** | 25 评论 / 101 天 | **最可能近期落地**。纯配置项，改动面小；用户已尝试 `settings.yaml` 说明配置入口已存在但**未生效或无校验提示**，最低成本做法是暴露 `providers.*.timeoutMs` 并对未知键告警 | [#3157](https://github.com/deepseek-ai/deepseek-harness/discussions/3157) |
| **compaction 复用 prefix cache + `headroomTokens` 改为比例/可配** | 13 + 5 评论，附代码对照 | **中高**。`#8079` 是明确回归，`#1944` 是成本优化；两者同属 `dsh-compaction-basic`，一次改动可同时收敛 | [#1944](https://github.com/deepseek-ai/deepseek-harness/discussions/1944) · [#8079](https://github.com/deepseek-ai/deepseek-harness/discussions/8079) |
| **`llm-pi-ai` 支持 `imageOffloadByteQuantum`（批量图片字节卸载、保持 prompt 前缀稳定）** | 4 评论，已指到 `packages/llm/llm-pi-ai/src/context.ts` L358-372 与 config | **中**。API 级小改，且与上一条同向（保持前缀稳定 = 提升缓存命中），可能被合并进同一个"成本优化"批次 | [#12917](https://github.com/deepseek-ai/deepseek-harness/discussions/12917) |
| **goal 机制允许"被动等待/阻塞中不注入 round"** | 7 评论 | **中**。需改 `dsh-goal-round-driver` 的状态机，但语义清晰（等待态应豁免注入） | [#4664](https://github.com/deepseek-ai/deepseek-harness/discussions/4664) |
| **桌面 shell 菜单 i18n 可扩展** | 4 评论 | **中低**。需把硬编码字典外置为资源包，属工程化改造 | [#12018](https://github.com/deepseek-ai/deepseek-harness/discussions/12018) |
| **独立客户端 + CLI + VS Code 插件** | 38 评论 / 106 天，全场第一 | **战略级，短期难落地**。但可低成本先给"半步"：CLI 入口 + VS Code 通过现有 seam provider 做轻集成 | [#172](https://github.com/deepseek-ai/deepseek-harness/discussions/172) |
| **Android / iOS 客户端** | 8 评论 / 9 天 | **低（近期）**。场景真实（远程触发 agent、免云环境），但需先解决移动端沙箱与长任务驻留，属独立战场 | [#13724](https://github.com/deepseek-ai/deepseek-harness/discussions/13724) |

**路线图信号解读**：需求分布呈"哑铃形"——一端是**极小的配置/参数级改动**（#3157、#8079、#12917），可立刻止血；另一端是**分发形态重构**（#172、#13724），短期无解。中间层（compaction 缓存、goal 状态机）是性价比最高、也最容易被忽视的地带。

---

## 7. 用户反馈摘要

**真实痛点（按出现频次）：**

1. **"装完一个又发现另一个"——开箱体验碎片化**（#6931，6 评论，更新至 11-27）。用户是"第二次下载回来"，认可"一切皆插件"的理念，但结论是"预设好的东西太少了，真的难用"。原文对理想形态的描述（"像 codex、trae work……"）表明其参照系是**已打包好默认配置的竞品**，而非可自建的框架。另注意该用户提到下载的是 **anywhere-labs 的桌面端**，存在**分发渠道辨识混乱**的风险信号。
2. **Web 优先与本地工作流的摩擦**（#172）。"大家懂的都懂"背后是文件系统、终端、编辑器上下文三处硬约束。
3. **本地模型的时延现实被忽略**（#3157）。Ollama 用户在 Win11 上跑 Gemma4:12b，需求非常具体（"20 分钟"），且卡在配置无从下手。
4. **长时间任务中的人机控制权**（#4664）。用户想"等后台任务"，系统却不停注入新轮次；只能手动暂停——**用户被迫用运维手段补偿设计缺陷**。
5. **成本可感知**（#1944、#8079）。prefix cache 未命中、`headroomTokens` 绝对値、`<goal_round>` 空转，三条都被明确算成"浪费的 token"。

**满意/正向信号：**

- **扩展点设计获实证认可**：#11251 一个第三方插件同时实现了 shell 等三个 seam provider，并把沙箱下沉到 WSL 内核，附六发行版兼容矩阵——这是对"一切皆插件"最有力的外部背书。
- **社区愿意做深度诊断**：#8409 的缺陷矩阵、#14271 的机制定位、#13575 的直接给补丁、#1944/#8079 的版本行为对照——**用户把项目当"可共建"而非"黑盒"**，属高质量社区特征。

**不满意聚集区：**

- Windows 桌面端（4 帖 / 37 评论）是**唯一形成集群的负面区域**：崩溃、启动、升级、沙箱四条链路全部有缺陷记录，且互为因果（升级失败 → 停留旧版 → 撞上崩溃）。
- 反馈闭环缺失：多帖反复出现"这是 DSH 本身问题还是我使用的问题"（#4664）这类自我怀疑，说明**错误信息与文档不足以让用户自诊断**。

---

## 8. 待处理积压（提醒维护者关注）

| 帖子 | 挂起时长 | 评论 | 积压理由 |
|---|---|---|---|
| [#172 独立客户端 + CLI + VS Code 插件](https://github.com/deepseek-ai/deepseek-harness/discussions/172) | **106 天** | **38** | 全场评论第一且仍在更新，**至今无任何官方回应痕迹**。长期沉默会持续消耗社区善意，建议至少给出方向性表态（做/不做/以插件形态替代） |
| [#1944 Compaction 绕过 prefix cache](https://github.com/deepseek-ai/deepseek-harness/discussions/1944) | **104 天** | 13 | 成本类缺陷，影响所有长会话用户，技术结论已清晰 |
| [#3157 本地 LLM 超时](https://github.com/deepseek-ai/deepseek-harness/discussions/3157) | **101 天** | 25 | 评论数第二、**修复成本最低**的一条，长期未处理性价比极差 |
| [#4664 goal 强制注入 `<goal_round>`](https://github.com/deepseek-ai/deepseek-harness/discussions/4664) | **93 天** | 7 | 涉及核心调度机制，需要设计层表态 |
| [#8079 `headroomTokens` 绝对値回归](https://github.com/deepseek-ai/deepseek-harness/discussions/8079) | 61 天 | 5 | 明确回归（0.1.5 → 0.1.7 行为变更），有代码对照 |
| [#8409 Windows ACL 沙箱三缺陷](https://github.com/deepseek-ai/deepseek-harness/discussions/8409) | 58 天 | 13 | 安全承诺相关，虽非最新但危害面最宽，建议优先于体验类问题 |
| [#12988 应用内升级失败 error 32](https://github.com/deepseek-ai/deepseek-harness/discussions/12988) | 16 天 | 6 | 升级通道是**所有其他修复的送达管道**，此路不通则后续修复对存量用户无效 |

**流程层面的结构性提醒：**

- 当前 **无 Issues / 无 PR / 无 Release 留痕** 三者叠加，导致社区高质量诊断（#13575 的补丁、#14271 的根因、#8409 的矩阵）**没有可追踪的落地状态**。建议至少以"Release Notes 逐条映射讨论帖编号"的方式建立最小闭环，让用户能验证"我报的问题在 rc.X 修了没有"。
- 全部 15 条头部讨论 `👍` 均为 0，说明**反应功能未被使用**，社区习惯以回帖表达支持。评估热度时请勿以 reaction 数为准，否则会严重低估 #172 这类议题的真实权重。
- 建议考虑为 `nightly` 通道设立**独立的可见发布记录**：rc.1→rc.5 的迭代是真实发生的工程投入，但外部不可见，等于放弃了稳定性改进的信任收益。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*