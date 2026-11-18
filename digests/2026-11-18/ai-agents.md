# OpenClaw 生态日报 2026-11-18

> Issues: 473 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-18 03:13 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报  
**日期：2026-11-18**  
**数据来源：GitHub OpenClaw 仓库（Issues / PRs / Releases）**

---

## 1. 今日速览

OpenClaw 今日保持高强度维护吞吐：过去 24 小时 Issues 更新 **473 条**（新开/活跃 361，关闭 112），PR 更新 **500 条**（合并/关闭 251，待合并 249），并发布 **v2026.11.5**。项目活跃度处于高位，PR 侧约 **50.2%** 的更新为合并/关闭，说明维护团队在持续消化积压。但 Issues 侧关闭率仅 **23.7%**，净增约 249 条活跃 Issue，且 P0/P1 稳定性问题仍集中在 **Gateway 生命周期、SQLite 状态管理、更新/回滚流程、记忆系统** 四个方向。整体判断：**维护产能强、迭代快，但核心运行时可靠性与更新体验仍是健康度的主要风险点**。

---

## 2. 版本发布

### v2026.11.5 — `openclaw 2026.11.5`

**已知更新内容：**

- **重启安全的会话状态（Restart-safe conversations）**  
  排队消息、发送权限和最终聊天写入在 Gateway 重启后仍会保留。相关 PR：#196923、#196540、#196493；作者 @steipete，致谢 @joshavant。  
  该改动直接回应了近期多起“重启后消息丢失/会话状态不一致”类 Issue，属于运行时可靠性提升。

- **更安全的更新（Safer updates）**  
  Doctor 或 Gateway 启动失败时，更新流程会回滚本次激活。  
  这与近期大量更新失败类 Issue（如 #197083、#161921、#200756）方向一致，目标是避免升级后留下半完成状态。

> 注意：提供的 Release 文本在此处被截断，完整 changelog 可能还包含其他修复。  
> **破坏性变更**：当前数据未披露明确破坏性变更。  
> **迁移注意事项**：更新回滚机制与 `state-migrated-no-rollback` 场景仍需谨慎；#197083 报告了 2026.11.1 → 2026.11.3 升级中 WAL publication 验证失败、拒绝回滚并留下外部插件未完成的问题。建议升级前备份 `state/` 目录与插件数据，并确保 Doctor 可正常执行。

---

## 3. 项目进展

今日 PR 更新量达 **500 条**，其中 **251 条已合并/关闭**，维护吞吐处于高位。重点推进方向如下：

### 已合并/关闭的重要 PR
- **#200948** `fix(test): complete automation inspection history fixture`  
  修复 Automation 检查 E2E 测试因 mock Gateway 缺少 run-history 响应而失败的问题，恢复主分支 CI 稳定性。  
  https://github.com/openclaw/openclaw/pull/200948

- **#200943** `test(agents): cover spawn billing through its public owner`  
  修复未使用导出检查对 spawn billing helper 的误报，清理测试与生产边界。  
  https://github.com/openclaw/openclaw/pull/200943

- **#200935** `fix(ci): keep cron advanced fields private`  
  修复 Automations UI 中 `ADVANCED_FIELDS` 被外部导出导致依赖检查失败的问题。  
  https://github.com/openclaw/openclaw/pull/200935

- **#197777** `improve(backup): faster PostgreSQL export hashing for blob-heavy stores`  
  优化 PostgreSQL 备份/导出中 BLOB 转 hex 再哈希的开销，提升 `backup create`、更新回滚捕获和 `database port` 的性能。  
  https://github.com/openclaw/openclaw/pull/197777

### 高价值待合并 PR
- **#200925** `fix: keep the Gateway responsive while extracting web pages`（@steipete）  
  将 Readability 解析移入 worker，避免大 HTML 页面阻塞 Gateway 主线程，直接缓解“web_fetch 导致事件循环卡顿”类问题。  
  https://github.com/openclaw/openclaw/pull/200925

- **#200760** `fix(subagents): deliver finished results instead of refusing on store path or operator authority`（P1，XL，security-boundary）  
  修复 subagent 完成后因 store path / operator authority 检查而丢弃结果的问题，影响多 agent 结果交付可靠性。  
  https://github.com/openclaw/openclaw/pull/200760

- **#200946** `fix: keep healthy fallback models available after missing-model errors`（P1）  
  防止两个模型级失败被误判为账户级冷却，保证第三个健康模型仍可被尝试。  
  https://github.com/openclaw/openclaw/pull/200946

- **#200869** `perf(update): reuse verified database digests within one update run`  
  在大型 SQLite 安装上复用已验证的数据库摘要，减少更新期间 Gateway 停机窗口内的重复 SHA-256 计算。  
  https://github.com/openclaw/openclaw/pull/200869

- **#200891** `fix: stop the recurring cold-storage failure when an agent has no database`  
  修复配置了 `resetArchiveRetention` 且存在无数据库 agent 时，每分钟重复记录冷存储失败的问题。  
  https://github.com/openclaw/openclaw/pull/200891

**整体进展评估**：版本侧推进“重启安全”和“更新回滚”；PR 侧集中修复 Gateway 主线程阻塞、subagent 交付、fallback 可用性、更新性能与冷存储噪声。项目在 **运行时稳定性** 方向前进明显，但多为基础性修复，尚未看到大规模新功能落地。

---

## 4. 社区热点

### 讨论最活跃的 Issues
1. **#164294** `Gateway state DB WAL auto-checkpoint never completes (pinned by in-process reader)`  
   42 条评论，P2，持续 Open。WAL checkpoint 每次启动后都被 in-process reader 阻塞，`consecutiveBlocked` 持续增长。  
   https://github.com/openclaw/openclaw/issues/164294

2. **#191944** `gateway stop / stop --force both fail on macOS with "Process ancestry could not be fully inspected"`  
   35 条评论，P2。macOS 上 Gateway 停止命令因进程祖先检查失败而不可用，影响运维与更新流程。  
   https://github.com/openclaw/openclaw/issues/191944

3. **#150635** `short-term recall retention evicts recalled entries nightly, so dreaming deep phase never promotes`  
   29 条评论，P2，涉及数据丢失/会话状态。短期 recall 存储达到 512 条上限后，夜间摄入的零 recall 条目挤占空间，导致 dreaming deep phase 永不晋升。  
   https://github.com/openclaw/openclaw/issues/150635

4. **#178359** `doctor --fix --non-interactive idles for 15+ min ... never reaches agent DB repair`  
   26 条评论，P1，crash-loop 影响。Doctor 修复流程长时间无输出，实际无法完成数据库修复。  
   https://github.com/openclaw/openclaw/issues/178359

5. **#168955** `Startup regression in 2026.10.1: ready ~1030s vs ~410s on 2026.9.9 (Windows)`  
   22 条评论，P1。Windows 上启动时间翻倍以上，`sidecars.control-ui-assets` 阻塞约 477 秒。  
   https://github.com/openclaw/openclaw/issues/168955

### 高关注 PR
- **#200760** 修复 subagent 结果交付，XL + 安全敏感，涉及多 agent 核心链路。  
- **#200925** 由 @steipete 提交，解决 Gateway 网页提取阻塞，直接关联多起主线程卡顿 Issue。

**背后诉求分析**：社区最关注的是 **“Gateway 能不能稳定跑住”**——SQLite WAL、进程停止、Doctor 修复、启动耗时、主线程阻塞构成同一类可靠性焦虑。其次才是记忆系统语义正确性和多 agent 结果交付。

---

## 5. Bug 与稳定性

### P0 / 发布阻塞级
| Issue | 状态 | 摘要 | Fix PR |
|---|---|---|---|
| [#161921](https://github.com/openclaw/openclaw/issues/161921) | OPEN，P0 | `state-migrated-no-rollback` 后 `doctor --fix` 与 `plugins update` 互相要求对方先执行，插件卡在旧版本 | 无（`no-new-fix-pr`） |
| [#153426](https://github.com/openclaw/openclaw/issues/153426) | OPEN，P0 | `MEMORY.md` / `USER.md` 因 provenance 变为 `untrusted` 被永久排除出 bootstrap 注入，无诊断/CLI/恢复手段 | 无，需产品决策 + 安全审查 |
| [#89278](https://github.com/openclaw/openclaw/issues/89278) | OPEN，P0 | Codex OAuth 刷新成功，但 cron/heartbeat 因 10s auth refresh timeout 失败 | 有 linked PR（状态需确认） |

### P1 级
| Issue | 状态 | 摘要 | Fix PR |
|---|---|---|---|
| [#178359](https://github.com/openclaw/openclaw/issues/178359) | OPEN | `doctor --fix --non-interactive` 空闲 15+ 分钟，无法到达 agent DB repair | 无 |
| [#168955](https://github.com/openclaw/openclaw/issues/168955) | OPEN | Windows 启动回归，ready 从 ~410s 增至 ~1030s | 无 |
| [#48003](https://github.com/openclaw/openclaw/issues/48003) | OPEN | `messages.queue.mode: "steer"` 不在 turn 中注入消息，只在 turn 结束后入队 | 有 linked PR |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | OPEN | 2026.3.2 起 google-vertex/gemini-3.1-pro-preview 报 “Cannot convert undefined or null to object” | 有 linked PR |
| [#194403](https://github.com/openclaw/openclaw/issues/194403) | OPEN | helper-completion 续接丢失执行权威，阻塞后续人类消息 | 无 |
| [#196505](https://github.com/openclaw/openclaw/issues/196505) | OPEN | `memory index --force` 因 “worker task capacity reached” 中止，大 corpus 永不完成 | 无 |
| [#194451](https://github.com/openclaw/openclaw/issues/194451) | OPEN | `/think` 等指令在 turn 中发送会触发 `SqliteTranscriptMutationConflictError`，杀死当前 turn | 有 linked PR |
| [#181120](https://github.com/openclaw/openclaw/issues/181120) | OPEN | macOS Gateway 主线程在关闭 worker MessagePort 时阻塞，间歇无响应 | 无 |
| [#152965](https://github.com/openclaw/openclaw/issues/152965) | OPEN | 热重载非 channel 插件会 dispose 所有 channel 插件，切断活跃流并丢消息 | 无 |
| [#167406](https://github.com/openclaw/openclaw/issues/167406) | OPEN | Windows MSIX 启用 Codex 插件后 Gateway 启动主线程饥饿 | 无 |

### P2 级重点
- **#164294** WAL auto-checkpoint 永不完成，长期运行后 state DB 膨胀风险。  
  https://github.com/openclaw/openclaw/issues/164294
- **#191944** macOS `gateway stop` 失败。  
  https://github.com/openclaw/openclaw/issues/191944
- **#197083** 2026.11.1 → 11.3 更新中 WAL publication 验证失败，升级半完成。  
  https://github.com/openclaw/openclaw/issues/197083
- **#182891** Prompt cache 从不复用，`cache read dropped N -> 0`，成本与延迟受影响。  
  https://github.com/openclaw/openclaw/issues/182891
- **#200756** Windows beta.2 → beta.4 包交换失败，baseline scan / rollback tree 异常。  
  https://github.com/openclaw/openclaw/issues/200756

### 今日关闭的稳定性问题
- **#185578**（P1）Gateway heap floor 只升不降，约 25 MiB/h 泄漏直至 V8 cap——**已关闭**。  
  https://github.com/openclaw/openclaw/issues/185578
- **#158592**（P0）macOS 睡眠唤醒后 model runtime publication 超时、消息永久失败——**已关闭**。  
  https://github.com/openclaw/openclaw/issues/158592
- **#112313**（P2）dead-letter 出站队列条目永久不可清理——**已关闭**。  
  https://github.com/openclaw/openclaw/issues/112313

**稳定性判断**：P0/P1 问题数量仍偏高，且集中在 Gateway 生命周期与状态存储。今日没有看到针对 #161921、#153426 的 fix PR，这两项应作为最高优先级跟踪。

---

## 6. 功能请求与路线图信号

### 插件系统扩展（最明确的路线图信号）
- **#193550** `feat(plugins): let plugins gate the final model provider request`  
  新增 `before_model_request` 钩子，允许插件在请求发往模型前查看/修改请求体，fail-closed。XL，安全/兼容性敏感，已 ready for maintainer look。  
  https://github.com/openclaw/openclaw/pull/193550
- **#197964** `feat(plugins): tell agent hooks when the turn read network content`  
  让记忆/日志类插件区分网络来源内容，避免把网页文本按同等信任级别存储。  
  https://github.com/openclaw/openclaw/pull/197964
- **#198455** `feat(diagnostics-prometheus): let plugins add metric families to the scrape route`  
  允许插件向同一 Prometheus scrape 路由添加指标族，避免额外端口和标签预算绕过。  
  https://github.com/openclaw/openclaw/pull/198455

**判断**：插件钩子与可观测性扩展是当前最活跃的功能方向，且已有多个 XL PR 进入 maintainer review，**较可能进入下一版本**。

### UI / 交互改进
- **#193672** 失败聊天可一键切换到同 provider 的可用默认模型。  
  https://github.com/openclaw/openclaw/pull/193672
- **#200938** 在长对话中按 ↑ 可召回更早提示，而无需加载完整聊天历史。  
  https://github.com/openclaw/openclaw/pull/200938

### 记忆与上下文治理
- **#150238** 为 Skill Workshop Experience Review 增加上下文预算/跳过策略，防止超大 session 复用前景上下文。已有 linked PR。  
  https://github.com/openclaw/openclaw/issues/150238
- **#138990** 为前台 WebChat 长任务增加可执行检查点和有界 yield。  
  https://github.com/openclaw/openclaw/issues/138990
- **#16670** Onboarding Wizard 应将 Memory/Embedding 设置作为强制步骤。P3，创建于 2026-02，长期未推进。  
  https://github.com/openclaw/openclaw/issues/16670

### 不建议近期纳入
- **#143387** Android 通知 QoL：作者已于 11 月 16 日明确表示不再推进实现，提案保留但不应计入近期路线图。  
  https://github.com/openclaw/openclaw/issues/143387

---

## 7. 用户反馈摘要

### 核心痛点
1. **更新流程是最大不满来源**  
   多个 Issue 指向 `package-swap` 失败、`state-migrated-no-rollback`、Doctor 与 plugins update 死锁、WAL publication 验证失败。用户场景包括 Windows 11、macOS arm64、npm 全局安装、10.8 GB 大型 SQLite state。典型声音：升级后“核心已激活但插件仍卡在旧版本”“Doctor 让你跑 plugins update，plugins update 又让你跑 Doctor”。

2. **macOS Gateway 进程管理不可靠**  
   `gateway stop` 和 `stop --force` 均因进程祖先检查失败；主线程在 MessagePort 关闭时阻塞。用户需要“独立终端重试”或直接重启，运维体验差。

3. **记忆系统语义不符合预期**  
   - 短期 recall 夜间驱逐导致 dreaming 永不晋升（#150635）。  
   - `MEMORY.md` / `USER.md` 被 provenance ratchet 永久排除，且无诊断/恢复（#153426）。  
   - 大 corpus memory index 因 worker 容量拒绝而非重试（#196505）。  
   用户诉求集中在“可解释、可恢复、可配置”。

4. **SQLite 状态层是系统性风险**  
   WAL checkpoint 被 reader 钉住、3 个并发写句柄导致 ~33s 事件循环停顿、transcript mutation 冲突杀死 turn。用户已能给出较专业的诊断数据（WAL 帧数、锁句柄、V8 profile），说明重度用户在生产环境运行。

### 正面反馈
- **#192667** 报告者确认更新到 **2026.11.5** 后，macOS 设置页面卡顿和暗色主题输入可见性问题均已解决。  
  https://github.com/openclaw/openclaw/issues/192667
- **#141474** 的历史状态恢复修复已进入 `v2026.11.5-beta.1` 至 `beta.4`，并在 main 上通过 30/30 测试。  
  https://github.com/openclaw/openclaw/issues/141474
- **#185578** heap 泄漏问题今日关闭，表明内存类 P1 有实际收敛。

### 使用场景画像
多 agent（6–7 个）、显式 ownership、Telegram/Discord/飞书渠道、cron/heartbeat 自动化、npm 全局安装、macOS LaunchAgent / Windows MSIX / Linux systemd、大型 SQLite（10 GB+）、大 memory corpus（864 MiB）。这类重度部署对更新可靠性和 Gateway 生命周期极其敏感。

---

## 8. 待处理积压

以下 Issue/PR 创建时间较早、影响面大或讨论热度高，建议维护者优先分诊：

| 条目 | 创建时间 | 状态 | 积压风险 |
|---|---|---|---|
| [#16670](https://github.com/openclaw/openclaw/issues/16670) Onboarding 强制 Memory/Embedding 设置 | 2026-02-15 | OPEN，P3，10 评论 | 近 9 个月未推进，影响新用户首次成功配置 |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) google-vertex 回归 | 2026-03-06 | OPEN，P1，18 评论 | 近 8 个月，已有 linked PR，需推动合并 |
| [#48003](https://github.com/openclaw/openclaw/issues/48003) steer 模式不注入消息 | 2026-03-16 | OPEN，P1，20 评论，4👍 | 近 8 个月，已有 linked PR，属核心消息语义 |
| [#89278](https://github.com/openclaw/openclaw/issues/89278) Codex OAuth 10s 超时 | 2026-06-02 | OPEN，P0，13 评论 | 5 个月，P0 发布阻塞级，需确认 linked PR 状态 |
| [#104719](https://github.com/openclaw/openclaw/issues/104719) memory-wiki fallback 忽略 deadline | 2026-07-11 | OPEN，P1，12 评论 | 4 个月，有 linked PR |
| [#112638](https://github.com/openclaw/openclaw/issues/112638) session maintenance 不限制 thread/channel 条目 | 2026-07-22 | OPEN，P2，11 评论 | 4 个月，存储无界增长风险 |
| [#126360](https://github.com/openclaw/openclaw/issues/126360) AgentSelectionRequiredError 日志洪泛 | 2026-08-19 | OPEN，P2，21 评论 | 3 个月，多 agent 显式 ownership 场景高影响 |
| [#164294](https://github.com/openclaw/openclaw/issues/164294) WAL checkpoint 永不完成 | 2026-10-03 | OPEN，P2，42 评论 | 当前最热 Issue，无 fix PR |
| [#191944](https://github.com/openclaw/openclaw/issues/191944) macOS gateway stop 失败 | 2026-11-03 | OPEN，P2，35 评论 | 新热 Issue，无 fix PR |
| [#193550](https://github.com/openclaw/openclaw/pull/193550) 插件 gate 最终模型请求 | 2026-11-05 | OPEN，XL，ready for maintainer look | 高价值插件扩展，需 maintainer 决策 |
| [#200760](https://github.com/openclaw/openclaw/pull/200760) subagent 结果交付 | 2026-11-17 | OPEN，P1，XL，security-boundary | 安全敏感，等待作者更新 |

**维护建议**：
1. 将 **#161921 / #153426** 两项 P0 单独设立跟踪，明确是否有产品/安全决策路径。  
2. 对 **#164294 / #191944** 两个高热度无 fix PR 问题指定 owner，避免社区讨论空转。  
3. 推动 **#48003 / #38327 / #89278** 的 linked PR 进入合并队列，减少长期 P1 挂账。  
4. 对 **#16670** 这类长期 P3 功能请求做明确“接受/搁置”标记，降低社区预期不确定性。

---

**项目健康度总评**：活跃度 **A**（Issues/PR 更新量高、发布节奏稳定），维护吞吐 **A-**（251 PR 合并/关闭），核心稳定性 **B-**（P0/P1 积压仍多，更新与 Gateway 生命周期是短板），社区响应 **B**（高热度 Issue 有讨论但缺少 fix PR 关联）。v2026.11.5 的 restart-safe 与 safer updates 是正确方向，但需持续跟进更新回滚和 SQLite 状态层的系统性修复。

---

## 横向生态对比

# 横向对比分析报告：个人 AI 助手 / 自主智能体开源生态（2026-11-18）

> 数据口径说明：各项目日报统计粒度不同；DeepSeek Harness 未启用 Issues/PR，以 Discussions 与 Release 为准；Zeroclaw PR 含样本/聚合口径；PicoClaw 缺少评论与 reaction 数据。健康度为基于活跃度、关闭率、积压与风险项的综合判断。

---

## 1. 生态全景

个人 AI 助手与自主智能体开源生态已从“功能竞赛”进入“运行时可靠性 + 安全护栏 + 插件生态”的综合竞争阶段。头部项目日更 Issue/PR 达数百条，但普遍呈现“输入吞吐高于处置吞吐”的评审瓶颈；更新回滚、会话状态、SQLite/WAL、跨平台进程管理等基础设施问题成为共同短板。安全议题显著升温，Agent 权限边界、审批门禁、凭据作用域、危险文件操作确认从边缘诉求上升为信任主线。插件化与多模型适配仍是路线图核心，但社区更关心“配置是否生效、升级是否安全、失败是否可诊断”。

---

## 2. 各项目活跃度对比

| 项目 | 今日 Issues 更新 | 今日 PR 更新 | Release 情况 | 健康度评估（主观） |
|---|---|---|---|---|
| **OpenClaw** | 473 条（新开/活跃 361，关闭 112；关闭率 23.7%） | 500 条（合并/关闭 251，待合并 249；吞吐约 50.2%） | **v2026.11.5**，含 restart-safe conversations、safer updates | **A / A- / B- / B**：活跃与吞吐强，核心稳定性与更新体验仍是短板 |
| **Zeroclaw** | 21 条（全部新开/活跃，关闭 0） | 50 条更新（合并/关闭 9，待合并 41；样本明细 20 条） | 无；处于 **v0.9.1 修复冲刺** | **B**：活跃度高但积压深，S0/S1 安全与 cron 子系统问题需收敛 |
| **PicoClaw** | 0 条 | 5 条（关闭 4，开放 1；关闭率 80%） | 无 | **6/10 中性偏谨慎**：低互动、高清理；修复未发版，新贡献者 PR 有 stale 风险 |
| **QwenPaw** | 17 条（关闭 11，关闭率 65%） | 46 条（合并/关闭 21，待合并 25；合并率 46%） | 无 | **B+**：高吞吐、强清理；25 条待合并与 XXXL 插件化 PR 形成评审压力 |
| **hermes-agent** | 283 条（新开/活跃 268，关闭 15；关闭率 5.3%） | 500 条（合并/关闭 98，待合并 402；合并率 19.6%） | **1 个 canary**（v0.23.2+canary） | **B**：社区参与强、修复管线活跃，但 402 条待合并，评审瓶颈明显 |
| **AstrBot** | 7 条（关闭 1） | 48 条（合并/关闭 27，待合并 21；合并率 56%） | 无 | **B+**：迭代快、合并率高；安全与可用性类 Issue 缺 fix PR |
| **DeepSeek Harness** | Issues 未启用；Discussions 更新 **180 条** | PR 未启用 | **dsh-v0.2.2-rc.4**（2 项修复） | **B-**：社区输入旺盛、插件生态自发成长，但缺陷闭环与发布工程偏弱 |

**关键观察**：OpenClaw 与 hermes-agent 处于“500 条 PR 更新”量级，是生态中吞吐最高的两个项目；AstrBot、QwenPaw 合并率较高，处于快速交付期；Zeroclaw 处于版本修复冲刺；PicoClaw 以历史积压清理为主；DeepSeek Harness 的讨论热度高但缺少 Issue/PR 状态机，闭环能力最弱。

---

## 3. OpenClaw 在生态中的定位

**优势**
- **规模与节奏领先**：单日 Issues 473、PR 500、发布 v2026.11.5，活跃度显著高于 Zeroclaw（21/50）、QwenPaw（17/46）、AstrBot（7/48）等项目，接近 hermes-agent 的 PR 量级。
- **运行时能力最完整**：Gateway 生命周期、SQLite 状态、多 agent ownership、记忆系统、插件钩子、Prometheus 诊断等构成较完整的企业级运行时参照。
- **修复方向贴近生产痛点**：v2026.11.5 的 restart-safe conversations 与 safer updates 直接回应重启丢消息、升级半完成等高频问题；PR 侧集中修复 Gateway 主线程阻塞、subagent 交付、fallback 模型可用性。

**技术路线差异**
- OpenClaw 走“**核心 Gateway + 强运行时 + 插件钩子**”路线，强调多 agent、多渠道路由、状态持久化与更新安全；Zeroclaw 更偏 Rust 安全契约与 SOP/成本控制；PicoClaw 偏轻量硬件与 Termux；QwenPaw/hermes-agent 偏桌面端与插件化宿主；AstrBot 偏聊天机器人适配器与插件 UI；DeepSeek Harness 偏模型 harness 与桌面协作。

**社区规模对比**
- OpenClaw 的 Issues/PR 日更量约为 Zeroclaw 的 10–20 倍、AstrBot 的 10 倍以上，社区规模与维护吞吐处于第一梯队。但 Issue 关闭率仅 23.7%，P0/P1 仍集中在 Gateway 生命周期、SQLite 状态、更新回滚与记忆系统，说明“大规模使用后的可靠性债”是其主要挑战。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **运行时可靠性与状态持久化** | OpenClaw、hermes-agent、QwenPaw、AstrBot、DeepSeek Harness、PicoClaw | Gateway 重启后会话/队列不丢；SQLite WAL checkpoint；会话删除安全；transcript 不重复/错序；更新后状态可恢复 |
| **更新/安装/分发可靠性** | OpenClaw、hermes-agent、DeepSeek Harness、PicoClaw、AstrBot、Zeroclaw | 更新失败回滚；插件依赖在 update 后保留；桌面端自动更新不可靠；修复需尽快发 patch；依赖双轨漂移 |
| **Agent 安全与权限护栏** | Zeroclaw、hermes-agent、DeepSeek Harness、OpenClaw、AstrBot、QwenPaw | SOP 审批门禁不可绕过；config set 不能关闭审批层；Agent 危险文件操作需确认/沙箱；asset_token 不应走 URL query；审批卡片作用域清晰 |
| **模型适配与推理参数控制** | OpenClaw、Zeroclaw、QwenPaw、hermes-agent、AstrBot、DeepSeek Harness | thinking/signature 回放正确；fallback 模型可用；temperature/reasoning_effort 可配；MALFORMED_RESPONSE/refusal 正确重试；上下文窗口不被误裁剪 |
| **插件生态与扩展点契约** | OpenClaw、QwenPaw、hermes-agent、AstrBot、DeepSeek Harness、PicoClaw | before_model_request 钩子；插件主题 token；插件 CLI/生命周期钩子；插件消息内交互组件；插件目录与错误桥接 |
| **跨平台与渠道接入** | hermes-agent、QwenPaw、AstrBot、PicoClaw、OpenClaw、DeepSeek Harness | Windows 稳定性；macOS gateway stop；微信 account-in-use；Telegram/QQ/企业微信适配；Termux/Android；时区与本地化 |
| **可观测性与成本治理** | OpenClaw、Zeroclaw、hermes-agent、AstrBot、DeepSeek Harness | Prometheus 指标扩展；cost enforcement 被读取；统一 telemetry；日志不阻塞事件循环；token/延迟/失败率可观测 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 生产级 Gateway、多 agent、多渠道路由、记忆系统、插件钩子 | 重度个人部署、多 agent 生产用户、插件开发者 | 核心 Gateway + SQLite 状态 + 插件扩展点；强调运行时生命周期与更新安全 |
| **Zeroclaw** | 安全契约、SOP 审批、cron、成本控制、operator 凭据 | 安全敏感团队、无人值守自动化用户 | Rust 生态（RUSTSEC、cargo），强调 fail-closed、作用域凭据与调度鲁棒性 |
| **PicoClaw** | 轻量 Web launcher、Provider 输出净化、i18n、边缘/移动适配 | SiPEED/轻量硬件用户、Termux 移动端用户、非英语用户 | 轻量部署 + Web 前端 + OpenAI 兼容 Provider；当前以维护与国际化为主 |
| **QwenPaw** | 桌面端、插件化宿主、本地模型管理、MCP 插件化、多渠道 | 桌面用户、插件开发者、渠道集成用户 | 插件化重构（模型/MCP/CLI 扩展点）；桌面端 + 渠道 + 记忆写入 |
| **hermes-agent** | 桌面端、安全加固、Windows 兼容、移动端、插件钩子、SessionDB RFC | 跨平台桌面用户、移动端需求者、插件作者 | 桌面重设计 + 性能 PR 栈；安全与状态正确性并重；多 profile 网关 |
| **AstrBot** | 聊天机器人框架、适配器、插件消息视图、ChatUI 工作台 | QQ/Telegram/企业微信等渠道运营者、插件开发者 | 多适配器 + 插件 UI + 工程治理（uv/CI/测试）；强调渠道兼容与插件交互 |
| **DeepSeek Harness** | 模型 harness、桌面协作、LiveShare、插件生态、session search | DeepSeek 模型使用者、桌面协作用户、插件作者 | 无 Issues/PR，Release + Discussions 驱动；rc 小步迭代，重模型响应容错与桌面端 |

---

## 6. 社区热度与成熟度

**第一层：高吞吐核心层（OpenClaw、hermes-agent）**  
- OpenClaw：日更 Issues/PR 数百条，发布节奏稳定，处于“高速迭代 + 生产可靠性补课”并行阶段。  
- hermes-agent：Issues 283、PR 500，canary 持续发布，社区参与强，但 402 条待合并表明评审吞吐是主要瓶颈。

**第二层：快速迭代层（AstrBot、QwenPaw、Zeroclaw）**  
- AstrBot：PR 合并率 56%，插件 UI 与工程治理并行，交付快；安全与可用性 Issue 需补 fix PR。  
- QwenPaw：Issue 关闭率 65%、PR 合并率 46%，清理力度强；三条 XXXL 插件化 PR 进入架构主线。  
- Zeroclaw：v0.9.1 修复冲刺，Issue 全部活跃、PR 待合并 41 条，安全与 cron 子系统是收敛重点。

**第三层：质量巩固/维护层（PicoClaw、DeepSeek Harness）**  
- PicoClaw：Issues 静默、PR 以历史积压清理为主，真实代码增量集中在 Provider 输出净化与环境适配；需尽快发 patch。  
- DeepSeek Harness：Discussions 180 条/日、头部议题 71 评论，但 rc.4 仅 2 项修复，缺少缺陷闭环追踪，处于“社区输入旺盛、维护输出保守”的 rc 收敛期。

---

## 7. 值得关注的趋势信号

1. **“更新可靠性”正在成为比新功能更硬的采用门槛**  
   OpenClaw 的 state-migrated-no-rollback、hermes 的 update 丢失插件依赖、DeepSeek 的自动更新失败、PicoClaw 修复未发版，均说明用户对“升级后能否起来”高度敏感。开发者应把更新回滚、迁移校验、插件依赖保留纳入发布门禁。

2. **Agent 安全从“提示词安全”转向“运行时权限模型”**  
   Zeroclaw SOP 审批被绕过、hermes config set 绕过写保护、DeepSeek Agent 清空目录、AstrBot asset_token 泄漏，表明社区要求的是**系统级护栏**：危险操作二次确认、工作区白名单、凭据作用域、审批门禁不可被 Agent 自身关闭。

3. **会话/状态存储是智能体系统的系统性风险点**  
   OpenClaw WAL checkpoint、QwenPaw 会话丢失、hermes transcript 错序、DeepSeek session-search 持久化失败，指向同一类问题：状态层缺少契约测试与故障恢复路径。建议把“重启安全、压缩后恢复、并发写冲突”作为核心测试矩阵。

4. **模型适配层需要统一的后处理与重试契约**  
   Zeroclaw thinking-signature 400、OpenClaw fallback 模型冷却、hermes temperature/context 裁剪、DeepSeek MALFORMED_RESPONSE/refusal 误判，说明多 Provider 适配不能只做请求转换，还需统一**响应清洗、错误分类、可重试白名单、推理内容回放规则**。

5. **插件生态进入“契约化”阶段**  
   OpenClaw before_model_request、QwenPaw 插件化三条 XXXL、hermes 插件生命周期钩子、AstrBot 插件消息内交互组件，表明插件竞争已从“能不能接”转向“扩展点是否稳定、权限是否清晰、主题/CLI/错误是否对等”。开发者应优先定义插件 API 契约与迁移策略。

6. **跨平台体验差距正在放大**  
   Windows 在 hermes、OpenClaw、DeepSeek 中集中暴露问题；macOS gateway stop、Termux/NVIDIA、时区映射等也反复出现。跨平台不能只靠 CI 编译，需要平台特化的进程管理、文件系统、时区与安装器测试。

7. **社区治理工具本身成为生产力瓶颈**  
   hermes 402 条待合并、DeepSeek 重复报告手工汇总、Zeroclaw stale 关闭需核查、PicoClaw 新贡献者 PR 被 stale 标记，说明高活跃项目需要更强的去重、状态标签、批量评审与发布 cherry-pick 检查。对开发者而言，**维护者体验**与**贡献者体验**将直接影响生态增速。

**对 AI 智能体开发者的参考价值**：下一阶段竞争力不只看模型能力与功能数量，更看**运行时可靠性、安全护栏、插件契约、更新与诊断体验**。建议优先投入状态持久化测试、更新回滚、危险操作确认、统一 Provider 适配层与可观测性，再扩展新功能面。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 · 2026-11-18

> 数据口径：统计窗口为 2026-11-17 至 2026-11-18；Issues 全量 21 条，PR 为 50 条更新中的 20 条样本（按评论数排序，评论数字段缺失）。部分结论基于样本推断，已在文中标注。

---

## 1. 今日速览

1. 项目处于 **v0.9.1 修复冲刺窗口**：24 小时内 Issue 更新全部为"新开/活跃"（21/21），关闭数为 0，而多条 Issue 明确携带 `release:v0.9.1` 标签（#12401、#12476、#12400、#12237、#12516），说明团队正在收敛下一补丁版本的阻塞项。
2. PR 侧流量显著高于 Issue 侧：**50 条更新中 41 条待合并、9 条合并/关闭**，合并吞吐（9/50 ≈ 18%）偏紧，积压压力集中在 XL 体量的长期 PR 上。
3. 今日 Issue 主题高度聚集于 **两类风险**：Anthropic/OpenAI 的 *thinking（推理内容）回放与签名* 链路（5 条 Issue + 2 条 PR），以及运行时*安全契约与实现不一致*（紧急停止、SOP 审批门禁、凭据作用域）。
4. 出现 **1 条 S0 级安全 Bug**（#12514，SOP 审批被绕过）与 **3 条 S1 级阻塞性 Bug**（#12401、#9191、#12477），是今日最高优先级关注面。
5. 整体健康度评估：**活跃度高、响应及时（多数 Issue 当日即有更新/PR 跟进），但积压深度与 P1 级缺陷未收敛是主要风险**；今日无版本发布，稳定性叙事由修复 PR 承接。

---

## 2. 版本发布

今日 **无新版本发布**。当前主线仍以 v0.9.0 为最新正式版，v0.9.1 处于修复待发状态。

---

## 3. 项目进展

### 3.1 今日关闭/合并的 PR（样本内 7 条）

需先说明一个重要观察：样本中 5 条 CLOSED PR 携带 `stale-candidate` + `needs-author-action` 标签，**今日关停以"积压清理"为主要成分，而非功能落地**。这对"项目向前迈进了多少"的判断有直接影响——净增量应主要由新开 PR 而非关闭 PR 来衡量。

| PR | 内容 | 状态信号 |
|---|---|---|
| [#11238](https://github.com/zeroclaw-labs/zeroclaw/pull/11238) | 修复 `cron.<alias>.schedule` 被当作字符串枚举解析的问题，`/config/cron` 现可保存带标签的声明式调度 | stale 关闭，但修复的是真实配置写入缺陷（Fixes #11237） |
| [#11598](https://github.com/zeroclaw-labs/zeroclaw/pull/11598) | `allowed_commands` 支持 glob 匹配，允许按目录树授权脚本 | 安全相关，stale 关闭 |
| [#11647](https://github.com/zeroclaw-labs/zeroclaw/pull/11647) | 将 vision 支持从 system prompt 合并逻辑中解耦 | 修复 provider 能力判定错位 |
| [#11779](https://github.com/zeroclaw-labs/zeroclaw/pull/11779) | `zeroclaw sop list` 打印加载失败并以非零码退出 | SOP 可观测性 |
| [#11780](https://github.com/zeroclaw-labs/zeroclaw/pull/11780) | 在容量拒绝信息中显式命名 `max_concurrent_total` | 运维可诊断性 |
| [#9229](https://github.com/zeroclaw-labs/zeroclaw/pull/9229) | 交互式 REPL 的 Ctrl+C 改为 Canonical 状态机（Idle/Active/Stopping） | 长期 XL PR（7 月起） |
| [#9740](https://github.com/zeroclaw-labs/zeroclaw/pull/9740) | VoiceHost WebSocket 桥接（外部 FunASR/SenseVoice 音频宿主） | 带 `status:parking-lot`，属功能性搁置 |

**风险提示**：若 #11238、#11598、#11647 为 stale 自动关闭而非合并，则对应缺陷（cron 配置保存、命令白名单粒度、vision 误判）仍处于未解决状态，建议维护者在关闭时补充明确的替代 PR 或重新排队说明。

### 3.2 今日新开/推进中的关键 PR

| PR | 内容 | 对项目的推进 |
|---|---|---|
| [#12521](https://github.com/zeroclaw-labs/zeroclaw/pull/12521) | **`feat(memory)!` 退役 Lucid 记忆后端**（删除 `lucid.rs`、配置类型、CLI/ZeroCode Quickstart、网关存储选择器） | 对应 #9644，**带 `!` 破坏性标记**，是今日体量最大的架构收敛动作（XL） |
| [#12509](https://github.com/zeroclaw-labs/zeroclaw/pull/12509) | Anthropic 重放时剔除无签名 thinking 块 | 直接对应 #12504，修复 400 拒绝 |
| [#12516](https://github.com/zeroclaw-labs/zeroclaw/pull/12516) | 升级 `zip` 修 RUSTSEC-2026-0548，接受 chrono 两条维护性告警 | 恢复 CI Security job 绿灯（对应 #12505） |
| [#12515](https://github.com/zeroclaw-labs/zeroclaw/pull/12515) | Web 端重载会话时显示原始输入与存储时间 | 对应 #12507 |
| [#12495](https://github.com/zeroclaw-labs/zeroclaw/pull/12495) | Matrix 频道恢复房间邀请自动接受 | 修复"机器人无法被拉进任何房间"的可用性硬伤 |
| [#12449](https://github.com/zeroclaw-labs/zeroclaw/pull/12449) | 远程 MCP HTTP/SSE 服务器的通用 OAuth 2.1 授权码 + PKCE 登录（`oauth = true`） | 生态接入能力升级（XL） |

**结论**：今日净推进约为"中等偏正向"——4 条针对性修复 PR（#12509、#12515、#12516、#12495）形成了 Issue→PR 的闭环，记忆后端收敛进入实施阶段；但 41 条待合并队列 + 5 条 stale 关闭削弱了单日增量。

---

## 4. 社区热点

### 4.1 讨论最活跃的 Issues

| Issue | 评论 | 👍 | 议题 |
|---|---|---|---|
| [#8600](https://github.com/zeroclaw-labs/zeroclaw/issues/8600) | 5 | **1** | **[Feature] 多模型 provider 下按会话切换模型** |
| [#12401](https://github.com/zeroclaw-labs/zeroclaw/issues/12401) | 5 | 0 | 工具上下文折叠导致 Claude Opus 5.5 对话永久性 400 |
| [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) | 5 | 0 | Cron agent 任务无墙钟超时 |
| [#9644](https://github.com/zeroclaw-labs/zeroclaw/issues/9644) | 4 | 0 | v0.9.1 退役 Lucid 记忆后端 |
| [#9390](https://github.com/zeroclaw-labs/zeroclaw/issues/9390) | 4 | 0 | 紧急停止仅为 CLI 状态文件，运行时无读取路径 |

**诉求分析**：

- **#8600 是唯一获得 👍 的 Issue，且已存活约 4.6 个月**。用户 @vvuk 明确以"从 moltis 迁移"为背景：在 moltis 中"provider"指模型来源（如 OpenRouter），同一来源下的全部模型可直接切换；而 Zeroclaw 当前的模型选择粒度不足以支撑这一工作流。这是一个**迁移场景下的能力缺口代表作**，而非孤立需求。
- **#12401、#9191 的高评论数指向"卡死型"缺陷而非好奇型讨论**——S1 级 workflow blocked 会持续吸纳评论，直到修复合并，属于典型的"热度=痛点持续未解"信号。
- **PR 侧评论数据缺失**（`undefined`），无法判断 #11744、#11754、#12449 等 XL PR 的评审热度，建议补充该指标以完善日报口径。

---

## 5. Bug 与稳定性

今日 Issue 中带 `bug` 标签共 **10 条**，按严重度排列如下：

### S0 · 数据丢失 / 安全风险

| Issue | 描述 | 修复 PR |
|---|---|---|
| [#12514](https://github.com/zeroclaw-labs/zeroclaw/issues/12514) | `supervised` SOP 唯一的审批门禁在 step 1 之前；若 step 1 的 `decide` 问题被回答 **no**，引擎在审批门禁**之前**就跳过该步 → 审批形同虚设 | 部分相关：[#12237](https://github.com/zeroclaw-labs/zeroclaw/pull/12237)（决策答案不可用时 fail-closed），但**未直接覆盖本场景** |

### S1 · 工作流阻塞

| Issue | 描述 | 修复 PR |
|---|---|---|
| [#12401](https://github.com/zeroclaw-labs/zeroclaw/issues/12401) | `keep_tool_context_turns` 折叠掉旧工具轮次后，Claude Opus 5.5 对话**永久失败**（thinking-signature 400） | 关联 [#12509](https://github.com/zeroclaw-labs/zeroclaw/pull/12509)（处理重放侧），**折叠侧根因待确认** |
| [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) | Cron agent 任务无外层 `timeout`，in-flight 锁仅在进程启动时清理（shell 任务有 120s 上限，agent 任务无） | **无** |
| [#12477](https://github.com/zeroclaw-labs/zeroclaw/issues/12477) | `cost.enforcement.mode` 被解析但无人读取，超预算时**即使默认 `warn` 模式也会硬停** | **无** |

### S2 · 行为降级

| Issue | 描述 | 修复 PR |
|---|---|---|
| [#12504](https://github.com/zeroclaw-labs/zeroclaw/issues/12504) | Anthropic provider 回传无签名 thinking 块 → `signature: Field required` | ✅ [#12509](https://github.com/zeroclaw-labs/zeroclaw/pull/12509) |
| [#12492](https://github.com/zeroclaw-labs/zeroclaw/issues/12492) | Dashboard 会话忽略 runtime profile 的 `native_thinking` / `default_level` | **无** |
| [#12476](https://github.com/zeroclaw-labs/zeroclaw/issues/12476) | 每个连接经 `spawn!` 打 INFO 日志，淹没 runtime trace | **无** |
| [#12489](https://github.com/zeroclaw-labs/zeroclaw/issues/12489) | Cron 调度器等待整个 due batch，一个长 agent 任务拖住全部 cron；官方 0.9.0 二进制复现，master 仍存在 | **无** |

### S3 · 次要

| Issue | 描述 | 修复 PR |
|---|---|---|
| [#12507](https://github.com/zeroclaw-labs/zeroclaw/issues/12507) | 会话重载后用户消息带上 `[CURRENT DATE & TIME: …]` 前缀与合成时间戳 | ✅ [#12515](https://github.com/zeroclaw-labs/zeroclaw/pull/12515) |

**稳定性判断**：今日 Bug 报告呈现明显的**"修复覆盖率不足"**特征——9 条 Bug 中仅 2 条有对应 PR（22%）。更值得警惕的是 `runtime/daemon` 组件集中出现 4 条问题（#12401、#9191、#12477、#12489），其中 3 条为 S1/S2 且无修复，**调度与超时子系统的鲁棒性是当前最薄弱环节**。

---

## 6. 功能请求与路线图信号

| 需求 | Issue | 纳入下一版本的判断 |
|---|---|---|
| **按会话切换模型** | [#8600](https://github.com/zeroclaw-labs/zeroclaw/issues/8600) | 带 `status:parking-lot` + `risk:high` + `type:tracker`，且为 7 月老 Issue。**短期不纳入**；但其与 #12054 同属"多 agent 共享 provider 时无法区分配置"的同一类问题，具备合并为一个配置模型重构 tracker 的价值 |
| **运行时 profile 的 thinking 级别** | [#12054](https://github.com/zeroclaw-labs/zeroclaw/issues/12054) | 与 #12492（dashboard 不生效）互为印证。考虑到 #12509 正在动 Anthropic 推理链路，**有较大概率在 v0.9.1 或 v0.9.2 一并处理 OpenAI 侧对齐** |
| **退役 Lucid 记忆后端** | [#9644](https://github.com/zeroclaw-labs/zeroclaw/issues/9644) | ✅ **已确定纳入 v0.9.1**，PR [#12521](https://github.com/zeroclaw-labs/zeroclaw/pull/12521) 已开，**带破坏性标记**，需迁移说明 |
| **作用域化使用 operator 托管凭据** | [#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) | RFC，触发条件为"安全模型实质性变更"。设计阶段，**v0.9.x 内不落地**，但可能成为 v0.10 安全主线 |
| **完整紧急停止强制** | [#9802](https://github.com/zeroclaw-labs/zeroclaw/issues/9802) | RFC 已 `status:blocked`，依赖 #9390 与 PR #9440 的落地节奏；**属路线图级事项，非补丁级** |
| **退役 Python SSH 任务助手** | [#12518](https://github.com/zeroclaw-labs/zeroclaw/issues/12518) | 依赖原生 Rust broker #12438 达到 parity，**跟踪态** |

**路线图判读**：v0.9.1 的边界正在清晰——**记忆后端收敛（Lucid 退役）+ thinking/推理链路修复 + 依赖安全告警清理**。而"模型/provider 配置模型的重构"（#8600、#12054、#12492 三合一）虽呼声明确，但尚无 tracker 承载，建议维护者考虑立项。

---

## 7. 用户反馈摘要

**真实痛点**

- **多 agent 共享 provider 无法差异化配置**（@vrurg, #12054）："两个 agent 共享一个 OpenAI provider，无法通过各自 runtime profile 选择不同 native reasoning effort。" 这是 #12492（dashboard 完全丢失 thinking 配置）的同源问题，反映**配置继承链在 gateway 与 provider 两层都存在断点**。
- **成本控制的"安全默认值"反噬**（@mov-xound-glitch, #12477）：`warn` 是默认值却表现得像 `block`，用户预期被打破——**配置项被解析但不被读取**属于最伤信任的缺陷类型。
- **官方二进制上的调度退化**（@Rixnei, #12489）：在 `zeroclaw 0.9.0 (6c78ba5)` Linux x86_64 官方 release 上复现，master `6e8398234` 仍在。用户明确标注回归状态未知，但**"一个长任务拖住全部 cron"直接冲击自动化生产场景**。
- **安全承诺与实现脱节**（@belumume #9390 / @Audacity88 #9802）：用户以逐行核对 HEAD 的方式提交审计证据——"紧急停止是一个没人读的 CLI 状态文件"。这类报告方式本身说明**社区中存在具备审计能力的深度用户，且对安全性有明确契约预期**。

**使用场景**

- 从竞品（moltis）迁移而来，期待 OpenRouter 式"一个 provider 全模型可选"（#8600）。
- 团队/多 agent 协作部署，需要 per-agent 推理强度与成本策略（#12054、#12477）。
- 依赖 cron 做无人值守自动化的生产部署（#9191、#12489）。
- 外部音频宿主 + WebSocket 桥接的语音集成（#9740，现处于搁置）。

**满意度信号**

- 正面：迁移用户 @vvuk 明确表示"moltis 里用到的大部分能力在 Zeroclaw 都有了，只缺一个"——**功能覆盖度获迁移用户背书**。
- 负面：集中于 **"配置写了不生效"**（#12477、#12492、#12504）与 **"文档承诺 ≠ 运行时行为"**（#9390）。二者均属可被一句测试覆盖的问题，指向**配置项与运行时消费点之间缺少契约测试**这一系统性工程债。

---

## 8. 待处理积压（需维护者关注）

### 8.1 长期未收敛的高优 Issue

| Issue | 存活时长 | 标签信号 | 关注理由 |
|---|---|---|---|
| [#8600](https://github.com/zeroclaw-labs/zeroclaw/issues/8600) | **≈4.6 个月** | `priority:p2` `risk:high` `type:tracker` `status:parking-lot` | 唯一有 👍 的功能请求，被 parking-lot 后无替代 tracker，需求可能流失 |
| [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) | **≈4.0 个月** | `priority:p1` `risk:high` `status:accepted` | **P1 且 S1 却 4 个月无 fix PR**，与今日 #12489 叠加，构成 cron 子系统的系统性问题 |
| [#9390](https://github.com/zeroclaw-labs/zeroclaw/issues/9390) | ≈3.8 个月 | `priority:p1` `security` `help wanted` | 安全契约落空，且明确 `help wanted` 说明曾缺人手 |
| [#9802](https://github.com/zeroclaw-labs/zeroclaw/issues/9802) | ≈3.4 个月 | `status:blocked` `type:rfc` | 被 #9390 阻塞，形成安全事项的连环依赖 |
| [#9644](https://github.com/zeroclaw-labs/zeroclaw/issues/9644) | ≈3.6 个月 | — | 已有 PR #12521，**建议尽快评审合入以关闭该积压** |

### 8.2 长期挂起的重量级 PR

| PR | 存活时长 | 风险 |
|---|---|---|
| [#7821](https://github.com/zeroclaw-labs/zeroclaw/pull/7821) | **≈5.0 个月** | `security:policy` + `risk:high` + `size:XL`，sandbox_policy 规范化。安全类 XL PR 长期未评审会持续产生 rebase 成本，且阻塞 #9802 的落地路径 |
| [#11572](https://github.com/zeroclaw-labs/zeroclaw/pull/11572) | ≈43 天 | `needs-author-action`，ACP plan 持久化失败可见性 |
| [#11741](https://github.com/zeroclaw-labs/zeroclaw/pull/11741) | ≈35 天 | dist-broad 镜像变体，与今日新开 #12523（Trivy 扫描）构成前后依赖，**建议成对推进** |
| [#11744](https://github.com/zeroclaw-labs/zeroclaw/pull/11744) / [#11754](https://github.com/zeroclaw-labs/zeroclaw/pull/11754) | ≈34–35 天 | 同一作者的渠道能力增强系列（推理流式、可配置确认反应），XL 体量、长期待合并 |

### 8.3 建议动作

1. **优先评审 #12521（Lucid 退役）与 #12516（依赖安全）**——二者直接决定 v0.9.1 能否出包，且均为低争议的收敛性变更。
2. **为 cron 子系统（#9191 + #12489）指派单一 owner**：两条独立缺陷指向同一组件的超时与并发模型，分开修会重复返工。
3. **对 5 条 `stale-candidate` 关闭 PR 做一次状态核查**：确认关闭是"已被替代实现"还是"缺陷仍存活"，避免看板失真。
4. **为 #7821 设定评审 deadline 或拆分**：5 个月未动的高风险安全 XL PR 是当前积压中成本最高的一项。

---

*数据来源：zeroclaw-labs/zeroclaw Issues 与 Pull Requests，统计截止 2026-11-18。PR 评论数字段在原始数据中缺失，相关"讨论热度"结论仅基于 Issue 侧数据。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-11-18** ｜ 数据窗口：过去 24 小时 ｜ 仓库：[sipeed/picoclaw](https://github.com/sipeed/picoclaw)

> **数据完整性说明**：本日 Issues 更新为 0 条，全部 PR 的 `评论` 字段返回 `undefined`、`👍` 均为 0，故第 4、7 部分（社区讨论热度、用户反馈）缺乏原始语料，仅能基于标题/摘要做有限推断，已在对应位置标注。所有 "CLOSED" 状态均无法区分「已合并」与「未合并关闭」，相关结论已做保守表述。

---

## 1. 今日速览

1. 项目今日呈**「低互动、高清理」**形态：Issues 侧完全静默（0 新开、0 活跃、0 关闭），PR 侧 5 条更新、其中 4 条关闭（关闭率 80%），新版本 0 个。
2. 关闭动作集中在**历史积压清算**：两条创建于 2026-03-12 / 03-14 的 PR（#1450、#1555、#1546）在沉寂约 **250 天**后同日关闭，其中两条是 `xuwei-xy` 的批量聚合型 PR，指向维护者正在做分支/积压收尾。
3. 唯一实质代码修复是 **#1450（剥离 OpenAI 兼容 Provider 返回中的 thinking/reasoning 标签）**，修复了内部推理文本外泄给终端用户的问题，属隐私/体验类缺陷。
4. 唯一仍开放的 PR 是 **#3467（法语 UI 本地化）**，已被打上 `stale` 标记——距创建仅 7 天即被标记，说明自动化 stale 策略较激进，存在误杀小型贡献的风险。
5. **健康度评估：中性偏谨慎（6/10）**。PR 吞吐稳定（日均 5 条更新），但「零 Issue 流入 + 零版本发布 + 单一贡献者批量清理」组合，意味着社区讨论面和发布节奏都偏弱，且 #1450 的修复在无新版发布的情况下尚未触达稳定版用户。

---

## 2. 版本发布

无新版本发布（0 个）。过去 24 小时无 Release 记录，`最新 Releases` 为空。

> ⚠️ 影响提示：今日关闭的 #1450 属安全/体验相关修复，**在下一个 tag 发布前不会进入稳定版**，建议维护者评估是否以补丁版本（patch release）形式尽快出货。

---

## 3. 项目进展

今日关闭 4 条 PR，按推进价值排序：

| PR | 类型 | 推进内容 | 价值评估 |
|---|---|---|---|
| [#1450](https://github.com/sipeed/picoclaw/pull/1450) | Bug / Provider / Agent / Go | 从 assistant content 中剥离泄漏的 thinking / reasoning 标签，阻止内部推理文本暴露给最终用户，Fixes #1235 | ⭐⭐⭐⭐ 直接影响输出质量与信息边界，覆盖**所有 OpenAI 兼容 Provider**，受益面广 |
| [#1555](https://github.com/sipeed/picoclaw/pull/1555) | 批量聚合 | 合并 #1390 / #1389 / #1383 / #1381 的修复 | ⭐⭐ 本质是积压清理动作，实际代码增量需人工核验 |
| [#1546](https://github.com/sipeed/picoclaw/pull/1546) | 批量聚合 | 合并 #1480 / #1479 / #1478 / #1473 / #1467 的修复 | ⭐⭐ 同上，涉及 5 个历史 PR 的处置 |
| [#3455](https://github.com/sipeed/picoclaw/pull/3455) | Bug / 环境适配 | 修正 NVIDIA 模型的 model id，涉及 Termux shell 场景 | ⭐⭐⭐ 打通 Android/Termux 移动端接入 NVIDIA Provider 的路径 |

**整体前进度**：代码层面的净推进主要来自 #1450（1 项真实缺陷修复）与 #3455（1 项环境适配）。两条批量 PR 更接近**流程性结账**——它们的存在本身说明项目曾长期堆积「提交了但没人收」的小修复，如今以聚合方式一次性关闭。这既是健康信号（积压被清理），也是警示信号（贡献者反馈周期曾长达 8 个月）。

**贡献者结构**：今日 5 条 PR 来自 4 位作者，`xuwei-xy` 独占 2 条（40%），其余 3 人各 1 条。无明显「单人包揽」现象，贡献面尚属分散。

---

## 4. 社区热点

> 数据受限：全部 PR 的评论数为 `undefined`、点赞数均为 0，今日无 Issue 产生。**无法基于互动量排序**，以下按「结构重要性」而非「讨论热度」呈现。

- **唯一开放 PR｜[#3467 feat(web): add French UI locale](https://github.com/sipeed/picoclaw/pull/3467)**（@slashr512，2026-11-10 创建，11-17 更新，标记 `stale`）
  - 内容：新增 `web/frontend/src/i18n/locales/fr.json` 完整法语词条，注册 i18next 资源与 dayjs locale，并在 login / setup / dashboard 三处语言菜单中挂载 **Français**。
  - 背后诉求：PicoClaw 的 Web launcher 正在进入**非英语用户市场**，且有贡献者愿意主动承担翻译工程量。这是典型的「低风险、高口碑」PR。
  - 风险点：上线仅 7 天即被 `stale` 标记，若自动关闭策略继续生效，可能**流失一位一次性贡献者**。建议维护者优先 review 并移除 stale 标签。

- **今日关闭但生命周期最长｜[#1450](https://github.com/sipeed/picoclaw/pull/1450)（存续约 250 天）与 [#1555](https://github.com/sipeed/picoclaw/pull/1555) / [#1546](https://github.com/sipeed/picoclaw/pull/1546)（存续约 248 天）**
  - 三者同日关闭，指向一次**集中式 backlog burn-down**。对于长期关注该仓库的用户，这是「维护者重新接管节奏」的积极信号。

---

## 5. Bug 与稳定性

> 今日无新增 Issue 报告，以下 Bug 均通过 PR 侧反推，按影响面排序。

| 严重度 | 问题 | 说明 | Fix 状态 |
|---|---|---|---|
| **高** | [内部推理文本泄漏给终端用户](https://github.com/sipeed/picoclaw/pull/1450)（Fixes #1235） | OpenAI 兼容 Provider 返回的 `thinking` / `reasoning` 标签未被剥离，直接混入 assistant content。后果：① 用户看到模型「自言自语」，体验割裂；② 可能暴露系统提示/推理链等**不应外显的上下文**。影响所有走 OpenAI 兼容通道的部署。 | ✅ 已有 fix PR，**已 CLOSED**；但无新版本发布，**稳定版用户暂未获修** |
| **中** | [NVIDIA 模型 ID 配置错误（Termux 环境）](https://github.com/sipeed/picoclaw/pull/3455) | 在 Android/Termux shell 下 NVIDIA Provider 的 model id 不正确，导致模型无法正确路由。属环境特化回归，不影响桌面/服务器主路径。 | ✅ 已 CLOSED（该 PR 描述模板未填写，"Type of Change" 全未勾选，**修复内容需人工复核**） |

**稳定性结论**：今日无崩溃/回归类新报告，Issues 侧零噪音。两条 Bug 均已被 PR 覆盖，缺陷响应链路是通的；真正的短板在**「修复 → 发布」环节缺失**。

---

## 6. 功能请求与路线图信号

今日无 Issue 形式的功能请求，仅从 PR 侧读取到两条明确的方向性信号：

1. **国际化（i18n）体系化 —— 大概率进入近期版本**  
   [#3467](https://github.com/sipeed/picoclaw/pull/3467) 不只是加一份 `fr.json`，而是同时改动了 i18next resources 注册与 dayjs locale 处理，属于**框架级接入**。一旦该模式确立，后续 es / de / ja / zh-TW 等语种可按模板快速跟进。判断：**若维护者本周 review，#3467 有望在下一版本落地**，并成为多语言路线的样板 PR。

2. **移动端 / 边缘环境优先 —— 中等概率**  
   [#3455](https://github.com/sipeed/picoclaw/pull/3455) 明确指向 Termux（Android 终端），说明社区存在**「在手机上跑个人 AI 助手」**的真实使用场景，且 NVIDIA 是被选用的推理后端之一。结合 PicoClaw 面向轻量硬件的项目定位（SiPEED 生态），Termux/ARM 兼容性值得列入显式支持的平台矩阵。

3. **Provider 输出规范化 —— 已被动纳入**  
   #1450 反映出「多 Provider 适配层缺乏统一的后处理约定」。建议路线图上考虑抽象一层 `response sanitizer`，避免每接一个新 Provider 就重复修一次标签泄漏。

---

## 7. 用户反馈摘要

> **数据缺口**：今日 Issues 更新 0 条，PR 评论区数据全部缺失（`undefined`），**无法提炼真实评论中的痛点与满意度**。以下为基于 PR 标题/摘要的**间接推断**，置信度中等，不应作为决策唯一依据。

- **痛点 1：输出「不干净」** — 用户不希望看到模型的内部推理过程（#1450 / #1235），说明当前默认行为对「思考型模型」（如带 reasoning 的兼容端点）适配不足。
- **痛点 2：环境适配缺口** — Termux 用户能跑起来但配置不通（#3455），反映**文档与配置校验在非主流平台上缺位**。
- **满意信号：语言可及性诉求被主动承接** — 有贡献者愿意为 Web launcher 补全整份法语词条（#3467），通常意味着使用者对产品完成度认可，愿意投入「体验层」而非「救火层」的改进。
- **隐性不满：响应周期** — 3 条 3 月提交的 PR 在 11 月才被处置，对贡献者而言是 8 个月的沉默期，这是今日数据中最值得警惕的体验问题（尽管它发生在过去）。

---

## 8. 待处理积压

| 对象 | 状态 | 风险 | 建议动作 |
|---|---|---|---|
| [#3467](https://github.com/sipeed/picoclaw/pull/3467) 法语本地化 | OPEN，`stale`，创建 7 天 | **高** — 新贡献者的首个 PR 若被 stale 自动关闭，几乎必然流失该贡献者 | 48 小时内指派 reviewer，移除 `stale` 标签；若需调整，给出明确 checklist |
| #1390 / #1389 / #1383 / #1381 | 原 PR，被 [#1555](https://github.com/sipeed/picoclaw/pull/1555) 聚合关闭 | 中 — 聚合关闭后，原 PR 的**逐条技术讨论随之沉没**，后续追溯困难 | 在 #1555 中补充 changelog 映射表，逐条说明「已合并 / 已废弃 / 转由新 PR 承接」 |
| #1480 / #1479 / #1478 / #1473 / #1467 | 原 PR，被 [#1546](https://github.com/sipeed/picoclaw/pull/1546) 聚合关闭 | 中 — 同上，5 条讨论一并归档 | 同上，建议建立「批量关闭」规范：必须附逐条处置结论 |
| [#1235](https://github.com/sipeed/picoclaw/issues/1235) | 被 #1450 修复关闭 | 低—中 — 修复未发布，Issue 已关但用户仍可复现 | 在 Issue 中置顶「修复将于 vX.Y.Z 发布」的说明，避免重复报障 |

---

## 附：今日关键指标

| 指标 | 数值 | 解读 |
|---|---|---|
| Issues 24h 更新量 | 0 | 社区问答面静默，需确认 tracker 是否为主渠道 |
| PR 24h 更新量 | 5 | 节奏正常 |
| PR 关闭率 | 80%（4/5） | 清理导向 |
| 仍在开放 PR | 1（#3467） | 待合并队列极短，review 带宽充裕 |
| 关闭 PR 平均存续时长 | ≈191 天 | **严重偏高**，被两条 250 天的长尾 PR 拉高 |
| 排除长尾后平均存续 | ≈16 天 | 近期 PR 处理效率明显改善 |
| 新版本 | 0 | 修复积压于主干，存在「发布延迟」风险 |
| 独立贡献者数 | 4 | 贡献面分散，健康 |

**一句话总结**：PicoClaw 今日完成了一次以「清历史账」为主的维护动作，真实代码增量集中在 Provider 输出净化与环境适配；短期最该做的两件事是——**review #3467 留住新贡献者**，以及**发一个 patch 版本把 #1450 送到用户手上**。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目日报 · 2026-11-18

> 数据来源：[agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw) · 统计窗口：过去 24 小时

---

## 1. 今日速览

今日项目整体呈现**高吞吐、强清理、零发版**的状态：Issues 更新 17 条中关闭 11 条（65%），PR 更新 46 条中合并/关闭 21 条（46%），维护者对历史积压的清理力度明显（包含 3 条 3 月份的老 PR 一并关闭）。但待合并 PR 仍高达 25 条，评审侧压力持续累积。当日关闭的多个 Issue 集中在**会话/模型配置丢失**与**微信渠道 ACCOUNT_IN_USE** 两类高影响故障，属于稳定性修复的实质性推进。功能侧，插件化重构（模型管理、MCP、CLI 扩展点）三条 XXXL 级 PR 同步推进，构成本阶段最清晰的路线图信号。当天无新版本发布，社区讨论热度集中在插件主题扩展点上（#8071 达 18 条评论）。

---

## 2. 版本发布

本日无新版本发布，亦无 Release 记录。上一可见稳定版本仍为 `v2.3.0.post1`（#8795 正在调整渠道插件的最低版本约束至该版本）。

---

## 3. 项目进展

### 3.1 今日合并/关闭的重要 PR

| PR | 标题 | 意义 |
|---|---|---|
| [#8151](https://github.com/agentscope-ai/QwenPaw/pull/8151) | fix(local_models): parse llama.cpp build numbers without false updates | 修复 llama.cpp 版本号解析导致的误报更新（关联 #8125） |
| [#8166](https://github.com/agentscope-ai/QwenPaw/pull/8166) | docs(heartbeat): document runtime semantics of silence, concurrency, and reloads | 补齐 heartbeat 运行时语义文档，降低用户配置误用成本 |
| [#2367](https://github.com/agentscope-ai/QwenPaw/pull/2367) | fix(console): harden session deletion flow | 会话删除流程加固，删除前生成带时间戳的 `chats.json.backup-*` 快照，降低误删风险 |
| [#2355](https://github.com/agentscope-ai/QwenPaw/pull/2355) | fix(console): add space between bot prefix and message text | 修复 Telegram bot 前缀与消息正文粘连（`Georgehello` → `George hello`） |
| [#2142](https://github.com/agentscope-ai/QwenPaw/pull/2142) | fix: add BiDi text support for RTL languages | 为聊天输入与消息区引入 `direction: auto` / `unicode-bidi: plaintext`，补齐 RTL 语言可用性 |
| [#8795](https://github.com/agentscope-ai/QwenPaw/pull/8795) | fix(channels): lower minimum QwenPaw version to 2.3.0.post1 | 解除渠道插件版本门槛过高导致的安装阻塞 |
| [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) | [DO NOT MERGE] feat(mobile): introduce QwenPaw native mobile experience | 长期挂起的移动端 Draft 正式关闭 |

**推进评估**：今日关闭的 PR 以「小步收尾 + 历史清仓」为主——三条 3 月份的老 PR 同日关闭，说明维护者正在主动压缩陈旧队列；功能性增量主要体现在会话删除安全性与国际化（RTL）支持上，属于「打磨型」进展而非「跃迁型」进展。

### 3.2 进行中的重点工程

- **插件化重构三线并行**（均为 XXXL 体量）：
  - [#8499](https://github.com/agentscope-ai/QwenPaw/pull/8499) 将本地模型管理（下载、llama.cpp 安装、服务生命周期）抽离为 Plugin Provider；
  - [#8469](https://github.com/agentscope-ai/QwenPaw/pull/8469) 将 MCP 抽离为插件；
  - [#8554](https://github.com/agentscope-ai/QwenPaw/pull/8554) 为插件体系新增 CLI 命令注册与扩展点（`ctx.register_cli(CliSpec(...))`）。
  
  三者共同指向 **2.4 版本的核心架构主题：宿主瘦身 + 能力插件化**。

---

## 4. 社区热点

| 排名 | 条目 | 评论 | 状态 | 核心诉求 |
|---|---|---|---|---|
| 1 | [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) Plugin-facing theme extension point | 18 | OPEN | 插件目前只有 `colorPrimary` 一个主题旋钮，无法覆盖语义 token；插件作者需要与应用主题系统对等的能力 |
| 2 | [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) 会话丢失 | 6 | CLOSED | 桌面端会话与模型配置同时丢失，属数据可靠性问题 |
| 3 | [#8595](https://github.com/agentscope-ai/QwenPaw/issues/8595) 插件安装报 `No package metadata was found` | 5 | CLOSED | 官方 `qwenpaw-creator` 插件经 UI 与 CLI 双路径安装均失败 |
| 4 | [#7745](https://github.com/agentscope-ai/QwenPaw/issues/7745) Agent 切换删除最后一个会话 | 4 | CLOSED | 每次切换 Agent 都会误删 `lastChatIdByAgent`，历史会话不可点击 |
| 5 | [#8521](https://github.com/agentscope-ai/QwenPaw/issues/8521) 无答复内容 / Ctrl+C 复制失效 / 新 UI 迟缓 | 4 | CLOSED | 性能与交互回归，且用户明确表达对旧版 UI 的偏好 |

**分析**：#8071 以 18 条评论断层领先，是当前社区唯一的高强度设计讨论，说明**插件开发者群体正在形成**，其诉求已从「能跑插件」升级为「插件与宿主视觉/语义一致性」。而评论量 2–6 档的条目几乎全部是**数据可靠性**与**渠道可用性**问题，反映用户在「能长期用」层面的焦虑高于「功能多不多」。

---

## 5. Bug 与稳定性

### 🔴 严重（数据丢失 / 核心不可用）

| Issue | 问题 | 状态 | 是否有 Fix PR |
|---|---|---|---|
| [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) | 桌面端会话丢失，连模型配置一并丢失，`recall history` 无法找回 9 点档会话 | CLOSED | 未见直接关联 PR，但 #2367 会话删除加固同日关闭，方向相关 |
| [#7745](https://github.com/agentscope-ai/QwenPaw/issues/7745) | 每次 Agent 切换删除该 Agent 的 last session，历史会话不可点击（2.2.1-beta.2） | CLOSED | 未在今日 PR 列表中体现 |
| [#8709](https://github.com/agentscope-ai/QwenPaw/issues/8709) / [#8693](https://github.com/agentscope-ai/QwenPaw/issues/8693) | 微信渠道启动报 `ACCOUNT_IN_USE`；channel 启动路径与 workspace projection 重复占用同一 runtime key；成功发送被报为 `PLATFORM_RESULT_UNKNOWN` | 均已 CLOSED | 未在今日 PR 列表中体现 |

### 🟠 中等（功能可用性受损）

| Issue | 问题 | 状态 | 是否有 Fix PR |
|---|---|---|---|
| [#8595](https://github.com/agentscope-ai/QwenPaw/issues/8595) | 官方 creator 插件热安装失败（`No package metadata was found`） | CLOSED | — |
| [#8521](https://github.com/agentscope-ai/QwenPaw/issues/8521) | 对话频繁只有思考内容无回复正文；Ctrl+C 需多次按键才生效；新版 UI 迟钝 | CLOSED | — |
| [#7767](https://github.com/agentscope-ai/QwenPaw/issues/7767) | guardrail 插件场景下 4 个独立缺陷：附件 stale blob、一次性 cron 丢触发、console tail-drop、`on_acting` 不触发 | CLOSED | — |
| [#8798](https://github.com/agentscope-ai/QwenPaw/issues/8798) | `MODEL_QUOTA_EXCEEDED` 报错信息对终端用户不友好（暴露 temp dump 路径与营销文案） | CLOSED | — |

### 🟡 待观察（仍为 OPEN）

| Issue | 问题 | 是否有 Fix PR |
|---|---|---|
| [#8700](https://github.com/agentscope-ai/QwenPaw/issues/8700) | `DoomLoopGate` 在 agentscope 2.0.10 将多轮回复累积进同一条 assistant message 后永不触发（默认 window=3 / threshold=1.0 全失效） | ✅ 有 [#8701](https://github.com/agentscope-ai/QwenPaw/pull/8701)（首次贡献者，size/M，Under Review） |
| [#8796](https://github.com/agentscope-ai/QwenPaw/issues/8796) | 移动端全屏容器顶部 safe-area-inset 缺失，内容渲染到系统状态栏下方（`viewport-fit=cover` 引入的回归） | ❌ 无 |
| [#8789](https://github.com/agentscope-ai/QwenPaw/issues/8789) | `_spawn_batch()` 预检用了 `str(...).strip()` 但派发仍用原值，导致 `null` / 数字 / 列表可绕过校验，合法 sibling 子代理被误派发 | ❌ 无 |
| [#8742](https://github.com/agentscope-ai/QwenPaw/issues/8742) | Provider 集成测试 `test_providers_get_nonexistent` 向仅注册 PUT 的路由发 GET，测试本身从未真正验证目标行为 | 已 CLOSED |

**健康度判断**：当日关闭率 65% 说明响应及时，但 #7724、#7745 这类**数据丢失**问题在关闭时未见明确的根因修复 PR 关联，建议维护者在关闭时补充「修复提交/版本」链接，否则同类问题（#7708 模型丢失）存在复发风险。

---

## 6. 功能请求与路线图信号

| 需求 | 来源 | 关联已有 PR | 纳入下一版本的可能性 |
|---|---|---|---|
| **插件可覆盖语义主题 token**（不止 `colorPrimary`） | [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071)（18 评论，OPEN） | 与 #8554 插件扩展点体系同源，但无独立 PR | 中高——与插件化主线天然契合，18 条评论显示有明确需求方 |
| **qwenpawmail-mcp 增加 `save_draft` 工具**（写草稿不发送） | [#8780](https://github.com/agentscope-ai/QwenPaw/issues/8780) | 无，属独立 MCP 插件仓库范畴 | 中——需求清晰、实现面窄，适合作为社区贡献入口 |
| **为 ReMeLight 记忆写入使用独立（廉价）模型** | PR [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719)（XL，OPEN 逾 2 个月） | 自身即实现 | 中——直接降低长期使用成本，但需评审资源 |
| **本地 QwenPaw 通过共享 Platform Web App 访问**（扫码登录、云端/本地工作区切换） | PR [#8793](https://github.com/agentscope-ai/QwenPaw/pull/8793)（XXXL，新开） | 与已关闭的 #7378 移动端 Draft 形成路线替代关系 | 中——体量极大，短期难以落地，但方向明确 |
| **Worker-Advisor 协作增强**（传递 worker 系统约束、约束建议时机） | PR [#8797](https://github.com/agentscope-ai/QwenPaw/pull/8797) | 自身即实现 | 较高——size/M，改动面可控 |
| **审批卡片交互与本地化改进**（澄清授权作用域、失败/过期反馈） | PR [#8791](https://github.com/agentscope-ai/QwenPaw/pull/8791)（XXL） | 自身即实现 | 中——安全相关 UX，价值高但体量大 |

**路线图判读**：三条插件化 XXXL（#8499 / #8469 / #8554）+ 主题扩展点需求 #8071，共同拼出 **「可插拔宿主」** 这条主线；#8793 / #7378 / #8796 则构成 **「移动端与云端接入」** 第二条线。两条线在 2.4 周期内可能并行推进。

---

## 7. 用户反馈摘要

**痛点一：状态持久化不可信（最高频、最伤信任）**
- #7724 用户描述「卡住 → 重部署插件 → shutdown → 点停止 → 从中断处继续，结果不停 recall history 却找不到 9 点那次会话」，且**模型配置同时丢失**，并附上此前 #7708 的同类问题链接，说明这不是孤例。
- #7745 进一步定位到具体缺陷：Agent 切换时误删 `lastChatIdByAgent`，并特意澄清「我知道落在空白会话是设计如此，我这里说的是两个独立缺陷」，显示用户对项目已有较深理解，反馈质量高。

**痛点二：渠道接入的账号互斥**
- #8693 / #8709 两位用户分别报告微信渠道 `ACCOUNT_IN_USE`，均指向「启动路径与 workspace projection 重复占用 runtime key」这一结构性原因，属 2.3.0 升级引入的回归面。

**痛点三：UI 迭代引发老用户回流诉求**
- #8521 用户明确表示「新版 UI 显示方式没有旧版高效，界面操作反应没有旧版流畅，希望增加切换 UI 的按钮」、「模型切换上大量空闲区域且非常麻烦」——这是典型的**可用性倒退**反馈，值得在产品侧单独评估，而非仅当作 bug 处理。

**痛点四：错误信息的「营销化」伤害体验**
- #8798 用户情绪激动（"i keep getting a damn MODEL_QUOTA_EXCEEDED"），但根本诉求是合理：错误弹窗中混入了第三方模型的注册营销文案和本地 temp dump 路径，应当改为结构化、可操作的错误提示。

**正向信号**：今日仍有首次贡献者提交修复（#8701 修 DoomLoopGate、#8728 修 Responses thinking-off 控制），且都带有清晰的根因说明——社区贡献质量在提升。

---

## 8. 待处理积压

| 条目 | 类型 | 已挂起 | 影响面 | 建议 |
|---|---|---|---|---|
| [#6952](https://github.com/agentscope-ai/QwenPaw/issues/6952) | Issue（perf） | **约 3 个月**（2026-08-12 起） | 工具 schema 顺序不定 + env_context 字段交错导致 KV 前缀缓存频繁失效，直接抬高每次推理成本 | ⚠️ 优先级最高：影响所有用户的 token 成本，且方案已被报告者定位到 `ToolRegistry.filter()` 的 dict 插入顺序，修复面清晰 |
| [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) | PR（XL） | 约 2 个月（2026-09-12 起，Under Review） | ReMeLight 记忆写入固定使用主模型，长期使用成本高 | 需明确评审 owner 或给出取舍结论 |
| [#8133](https://github.com/agentscope-ai/QwenPaw/pull/8133) | PR（XL） | 约 6 周（2026-10-08 起，Under Review） | CJK 场景下 `**没有改动任何设置。**所有内容` 的强调标记裸露 | 面向中文用户的显示缺陷，建议优先排期 |
| [#8469](https://github.com/agentscope-ai/QwenPaw/pull/8469) | PR（XXXL） | 约 3 周（2026-10-28 起） | MCP 插件化，架构主线 | 描述区仍是模板占位（"Fixes #(issue_number)"），建议先补全描述与安全考量 |
| [#8499](https://github.com/agentscope-ai/QwenPaw/pull/8499) | PR（XXXL） | 约 3 周（2026-10-29 起） | 本地模型管理插件化，架构主线，涉及用户配置迁移 | 建议补充迁移路径的自动化测试说明 |
| [#8554](https://github.com/agentscope-ai/QwenPaw/pull/8554) | PR（XXXL） | 约 2 周（2026-11-03 起） | 插件 CLI 命令与扩展点 | 与 #8071 主题扩展点可合并设计讨论 |

**总体提醒**：当前 **25 条待合并 PR** 对应约 6 条明确标注 `Under Review`，评审带宽是瓶颈。三条 XXXL 插件化 PR 相互耦合（#8469 / #8499 / #8554 都触及 plugin registry 与资源生命周期），建议维护者先统一插件扩展点契约（含 #8071 的语义主题层），再分批合并，避免相互返工。

---

*报告生成时间：2026-11-18 · 数据口径以 GitHub 过去 24 小时更新记录为准*

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报（2026-11-18）

> 数据说明：本报告基于给定 GitHub 快照生成。Release 说明、PR 评论数等字段存在截断或缺失（部分 PR 评论数为 `undefined`），已在文中标注；已合并/关闭 PR 的明细未提供，因此相关分析以聚合数据、已关闭 Issue 和待合并高优 PR 为依据。

---

## 1. 今日速览

- 过去 24 小时 Issues 更新 **283 条**（新开/活跃 268，关闭 15），PR 更新 **500 条**（待合并 402，已合并/关闭 98），并发布 **1 个 canary 版本**，社区活跃度处于高位。
- Issue 关闭率约 **5.3%**（15/283），PR 合并/关闭率约 **19.6%**（98/500），待合并 PR 占比 **80.4%**，显示输入速度明显高于维护者吞吐，**评审与分流压力较大**。
- 今日讨论集中在 **安全与权限**（#59293）、**会话/状态可靠性**（#147839、#137287、#144413）、**Windows 平台稳定性**（#68128、#126622、#41219）以及 **移动端需求**（#11911、#147269）。
- 功能侧，**可配置 temperature**（#17565）迎来对应 PR #157215，**桌面端重构与性能优化**（#152168、#153065–#153070）形成较大 PR 栈，插件生态也在扩展。
- 整体健康度：**社区参与强、修复管线活跃，但积压与评审瓶颈明显**；canary 持续发布，稳定版节奏需关注。

---

## 2. 版本发布

### v0.23.2+canary.20261117T064624Z（Canary）

- 发布页面：https://github.com/NousResearch/hermes-agent/releases
- 发布日期：2026-11-17
- 类型：**Canary 预发布构建**，非稳定版。
- 可见内容：包含 Hermes Desktop 下载入口，快照中可见 **macOS Apple Silicon（M 系列）DMG**；完整构建表在数据中被截断。
- 破坏性变更：**快照未列明**。鉴于 canary 属性，建议默认按“可能存在行为变更与不稳定风险”处理。
- 迁移注意事项：
  - 生产环境建议等待 stable 版本；canary 仅用于测试与问题复现。
  - 升级前备份 `config.yaml`、会话数据库与 profile 数据，避免状态迁移问题。
  - 若使用插件或自定义 provider，需重点验证插件依赖是否在更新后保留（相关风险见 #134469）。

> 由于 Release 正文被截断，无法逐项列出该 canary 的具体修复与变更；建议维护者在发布说明中补充完整 changelog 与已知问题。

---

## 3. 项目进展

快照仅提供“已合并/关闭 98 条 PR”的聚合数字，未附已合并 PR 明细。从已关闭 Issue 与待合并高优 PR 两个侧面观察：

### 已关闭/已推进

- **#148898** Codex 后端 zstd 压缩请求导致 HTTP 400 的问题已关闭，说明该上游兼容性问题已有处理结果：  
  https://github.com/NousResearch/hermes-agent/issues/148898
- **#62169** 终端沙箱 CWD 被删除后所有命令失败（exit 126）已关闭，终端环境健壮性得到修复：  
  https://github.com/NousResearch/hermes-agent/issues/62169

### 待合并的重点 PR（尚未确认合并）

- **#157202** `fix(gateway)`：跨 profile 保留 completion ledger 所有权，面向多 profile 网关的委派/完成态一致性：  
  https://github.com/NousResearch/hermes-agent/pull/157202
- **#157216** `fix(agent)`：保留 Responses 输出顺序与精确 assistant 文本，修复回放/会话重建中的内容错序：  
  https://github.com/NousResearch/hermes-agent/pull/157216
- **#157218** `fix(state)`：恢复合并时丢弃 compaction 克隆，针对压缩后的会话恢复正确性：  
  https://github.com/NousResearch/hermes-agent/pull/157218
- **#157219** `fix(tui)`：在事件循环运行时安装异常处理器，减少 TUI 退出时的未处理任务错误：  
  https://github.com/NousResearch/hermes-agent/pull/157219
- **#157208** `type/security`：TUI thinking 文本不再允许隐藏超链接，防止“显示一个站点、点击打开另一个站点”：  
  https://github.com/NousResearch/hermes-agent/pull/157208
- **#157211** `fix(ci)`：每个 PR 都运行仓库级 lint guard，提升 CI 覆盖：  
  https://github.com/NousResearch/hermes-agent/pull/157211
- **#155714** `fix(credential-pool)`：Anthropic 首次 429 且 `Retry-After` 较长时轮换凭据：  
  https://github.com/NousResearch/hermes-agent/pull/155714
- **#157140** `fix(vault)`：浏览器表单框架控制字段的填充可靠性：  
  https://github.com/NousResearch/hermes-agent/pull/157140
- **#157215** `feat(config)`：为主循环暴露 `model.request_overrides`，直接回应 temperature 配置诉求：  
  https://github.com/NousResearch/hermes-agent/pull/157215
- **#157214** `feat(plugins)`：新增 `moa_fanout_verdict` 与 `auxiliary_fallback_policy` 插件钩子：  
  https://github.com/NousResearch/hermes-agent/pull/157214
- **#152168** 桌面端重新设计工作区，并保留经典界面回退：  
  https://github.com/NousResearch/hermes-agent/pull/152168
- **#153065–#153070** 桌面端 6 连 PR 栈，覆盖 perf harness 隔离、profile 路由错误传播、流式热路径优化、长帧指标等：  
  https://github.com/NousResearch/hermes-agent/pull/153065

**进展评估**：今日工作重心集中在 **安全加固、会话/状态正确性、桌面端性能与重构、插件扩展性**。修复管线活跃，但 402 条待合并 PR 表明 review 吞吐是当前主要瓶颈。

---

## 4. 社区热点

### Issues（按评论数）

| Issue | 评论 | 👍 | 主题与诉求 |
|---|---:|---:|---|
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) | 29 | 0 | `hermes config set` 绕过 system-config 写保护，CLI 可无门控关闭审批层。安全影响高，标签为 P3 但讨论热度最高，且处于 `needs-decision`。 |
| [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) | 27 | 0 | Kanban 卡片被限流后成功，却永久停留 `blocker_auth`，reviewer 不再被调度；属于自动化流程卡死。 |
| [#23717](https://github.com/NousResearch/hermes-agent/issues/23717) | 25 | 11 | RFC：可插拔 SessionDB Provider（PostgreSQL、MySQL 等），解决 SQLite 共享文件在热更新/多实例下的“死亡螺旋”。 |
| [#11911](https://github.com/NousResearch/hermes-agent/issues/11911) | 23 | 16 | 原生 iOS/Android 应用 + 语音通话；社区需求强，👍 数第二高。 |
| [#68128](https://github.com/NousResearch/hermes-agent/issues/68128) | 23 | 3 | Windows 无 breakaway job object 下 WhatsApp bridge 启动失败（WinError 5）。 |
| [#122609](https://github.com/NousResearch/hermes-agent/issues/122609) | 22 | 0 | Skills index 新鲜度探针失败（degraded），索引超过 26h 限制；机器人自动跟踪。 |
| [#147269](https://github.com/NousResearch/hermes-agent/issues/147269) | 19 | 3 | Android beta 达到 Firebase tester 上限，说明移动端测试需求超过当前容量。 |
| [#99943](https://github.com/NousResearch/hermes-agent/issues/99943) | 14 | 0 | 压缩器上下文窗口被 `model.ollama_num_ctx` 错误裁剪，云 provider 的 1M 窗口可能降至 65,536。 |
| [#17565](https://github.com/NousResearch/hermes-agent/issues/17565) | 14 | 18 | 可配置 temperature；👍 数最高，直接指向模型采样参数不可控导致的幻觉/行为问题。 |
| [#148898](https://github.com/NousResearch/hermes-agent/issues/148898) | 14 | 3 | Codex zstd 压缩请求 400，已关闭。 |

### PRs

快照未提供 PR 评论数（显示为 `undefined`），以下按变更影响面列出今日值得关注的 PR：

- **#157208** TUI 隐藏超链接安全修复：https://github.com/NousResearch/hermes-agent/pull/157208
- **#157202** 网关 completion ledger 跨 profile 归属：https://github.com/NousResearch/hermes-agent/pull/157202
- **#157216 / #157217** Responses 回放顺序与缓存读取可观测性：https://github.com/NousResearch/hermes-agent/pull/157216
- **#157214** 插件生命周期钩子：https://github.com/NousResearch/hermes-agent/pull/157214
- **#152168** 桌面端重设计 + 经典界面回退：https://github.com/NousResearch/hermes-agent/pull/152168
- **#153065–#153070** 桌面端性能/路由/流式 6 连栈：https://github.com/NousResearch/hermes-agent/pull/153068

**热点分析**：今日社区关注点呈现“**安全信任 + 跨平台可靠性 + 移动端需求 + 配置可控性**”四条主线。尤其 #59293 与 #17565 分别代表“审批层不能被 agent 自身绕过”和“用户需要可控的模型采样参数”，都是影响信任与可用性的高价值议题。

---

## 5. Bug 与稳定性

### P1 / 高影响

| 问题 | 摘要 | 状态 |
|---|---|---|
| [#147839](https://github.com/NousResearch/hermes-agent/issues/147839) | 单次 20s `worker_receipt_timeout` 污染会话存储并毁掉整个 turn，用户只看到 “No reply”。 | OPEN，快照未见明确 fix PR；状态恢复相关 PR #157218 值得关注。 |
| [#134469](https://github.com/NousResearch/hermes-agent/issues/134469) | `hermes update` 重建 staged runtime venv 时丢失插件依赖，provider 插件静默失败。 | OPEN，未见明确 fix PR。 |

### P2 / 中高影响

| 问题 | 摘要 | 状态 |
|---|---|---|
| [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) | Kanban 限流后成功仍被永久标记 `blocker_auth`，reviewer 不生成。 | OPEN，未见 fix PR。 |
| [#68128](https://github.com/NousResearch/hermes-agent/issues/68128) | Windows 下 WhatsApp bridge 因 job object 限制启动失败（WinError 5）。 | OPEN，未见 fix PR。 |
| [#99943](https://github.com/NousResearch/hermes-agent/issues/99943) | 云 provider 上下文窗口被 Ollama `num_ctx` 错误裁剪。 | OPEN，未见 fix PR。 |
| [#137287](https://github.com/NousResearch/hermes-agent/issues/137287) | 桌面端 transcript 随机重复、错序或丢失消息。 | OPEN，未见明确 fix PR。 |
| [#98634](https://github.com/NousResearch/hermes-agent/issues/98634) | `file.attach` 返回的 `@file:` 引用被 prompt 展开拒绝（allowed_root 与 attachments 目录不一致）。 | OPEN，未见 fix PR。 |
| [#146538](https://github.com/NousResearch/hermes-agent/issues/146538) | 多 profile 下网关持续 34k–99k 文件元数据操作/秒，Windows 内核池增长。 | OPEN，未见 fix PR。 |
| [#141223](https://github.com/NousResearch/hermes-agent/issues/141223) | 多 profile 共享 MCP server 在 park/revive 后仅 owning profile 恢复工具。 | OPEN，未见 fix PR。 |
| [#144413](https://github.com/NousResearch/hermes-agent/issues/144413) | 工具结果含 lone surrogate 时结算崩溃 `UnicodeEncodeError`，会话卡在 `paused: unknown_execution`。 | OPEN，未见 fix PR。 |
| [#126622](https://github.com/NousResearch/hermes-agent/issues/126622) | Windows 下 `write_file` 因 `st_ctime_ns` 来源不一致永久拒绝。 | OPEN，未见 fix PR。 |
| [#41219](https://github.com/NousResearch/hermes-agent/issues/41219) | Windows 网关首次崩溃后 30–60s 内事件循环死锁。 | OPEN，长期未解（2026-06-07 创建）。 |
| [#122609](https://github.com/NousResearch/hermes-agent/issues/122609) | Skills index 过期/降级（28.1h，限制 26h）。 | OPEN，自动探针持续跟踪。 |
| [#148414](https://github.com/NousResearch/hermes-agent/issues/148414) | Webapp 菜单在 UI scale ≠100% 时溢出视口。 | OPEN，未见 fix PR。 |
| [#156470](https://github.com/NousResearch/hermes-agent/issues/156470) | 浏览器 webapp 中 `ctx.os.pickOpenPath` 返回 staged upload 路径而非用户所选文件。 | OPEN，未见 fix PR。 |

### P3 / 其他稳定性问题

- [#141599](https://github.com/NousResearch/hermes-agent/issues/141599) TUI/Gateway 补全在 Windows 保留名（`nul` 等）上崩溃。OPEN。
- [#18990](https://github.com/NousResearch/hermes-agent/issues/18990) Kimi Coding provider 视觉支持被错误禁用，建议移除 `_PROVIDERS_WITHOUT_VISION`。OPEN。
- [#31584](https://github.com/NousResearch/hermes-agent/issues/31584) memory-context 应作为背景上下文而非权威用户消息。OPEN。

### 今日已关闭

- [#148898](https://github.com/NousResearch/hermes-agent/issues/148898) Codex zstd 400 —— 已关闭。
- [#62169](https://github.com/NousResearch/hermes-agent/issues/62169) 终端沙箱删除 CWD 导致后续命令全部失败 —— 已关闭。

**稳定性评估**：Windows 平台问题呈“多点开花”态势（WhatsApp bridge、write_file、网关死锁、文件系统抖动、TUI 保留名），建议维护者考虑设立 **Windows 可靠性 umbrella issue**。会话状态类问题（#147839、#137287、#144413）直接影响用户信任，应优先于普通 P2 处理。

---

## 6. 功能请求与路线图信号

| 需求 | 信号 | 可能节奏 |
|---|---|---|
| **可配置 temperature / 采样参数** [#17565](https://github.com/NousResearch/hermes-agent/issues/17565) | 14 评论、18👍，今日 PR [#157215](https://github.com/NousResearch/hermes-agent/pull/157215) 直接暴露 `model.request_overrides` | **近期最可能落地**，可能进入下一 minor。 |
| **可插拔 SessionDB（PostgreSQL/MySQL）** [#23717](https://github.com/NousResearch/hermes-agent/issues/23717) | 25 评论、11👍，RFC 完整，但 `needs-decision` | 架构级改动，中期；需维护者明确取舍。 |
| **原生移动端 + 语音通话** [#11911](https://github.com/NousResearch/hermes-agent/issues/11911) | 23 评论、16👍；Android beta 已存在但容量满 [#147269](https://github.com/NousResearch/hermes-agent/issues/147269) | 移动端已在路线图上；**语音通话**仍缺明确 PR，偏中长期。 |
| **每用户 agent 隔离与身份权限** [#21574](https://github.com/NousResearch/hermes-agent/issues/21574) | 12 评论，源于真实 prompt injection 场景 | 与 #59293 安全议题联动，中期。 |
| **统一 telemetry / 成本与失败率分析** [#6642](https://github.com/NousResearch/hermes-agent/issues/6642) | 9 评论，长期未响应 | 观测性需求明确，但暂无 PR。 |
| **WhatsApp 历史消息与联系人 API** [#69659](https://github.com/NousResearch/hermes-agent/issues/69659) | 8 评论 | 平台能力扩展，中期。 |
| **桌面聊天气泡左右分栏** [#41302](https://github.com/NousResearch/hermes-agent/issues/41302) | 8 评论、4👍 | 可能被桌面重设计 [#152168](https://github.com/NousResearch/hermes-agent/pull/152168) 吸收。 |
| **Codex 网关的 interim assistant messages** [#142663](https://github.com/NousResearch/hermes-agent/issues/142663) | 7 评论 | 与 Responses 回放 PR #157216 方向相邻，可能逐步改善。 |
| **插件生命周期钩子与目录扩展** [#157214](https://github.com/NousResearch/hermes-agent/pull/157214)、[#156494](https://github.com/NousResearch/hermes-agent/pull/156494)、[#133357](https://github.com/NousResearch/hermes-agent/pull/133357) | 多个插件/MCP 目录 PR | 插件生态是明确投入方向，近期持续落地。 |

**路线图判断**：下一版本最可能看到 **temperature/request overrides**、**桌面端重设计与性能改进**、**插件钩子与目录扩展**；SessionDB 多后端与移动端语音通话仍需更长的决策周期。

---

## 7. 用户反馈摘要

- **安全与信任是最大痛点**：用户发现 `hermes config set` 可以绕过审批层写保护（#59293），且存在 prompt injection 冒充用户（#21574）、TUI 隐藏超链接（#157208）等风险。用户不仅要求“能拦住”，还要求 **agent 自身不能从前门关闭防护**。
- **Windows 用户体验明显落后**：WhatsApp bridge WinError 5、`write_file` 永久拒绝、网关死锁、文件系统元数据抖动、TUI 保留名崩溃等问题集中出现。多位用户提供了详细环境与复现步骤，说明 Windows 已成为真实生产场景。
- **会话可靠性直接影响信任**：用户反馈 “No reply”、transcript 重复/错序/丢失、Unicode 结算崩溃导致会话卡死。此类问题一旦发生，用户难以自行恢复，挫败感强。
- **模型配置需要更细粒度控制**：temperature 不可配、云 provider 上下文窗口被 Ollama 配置误伤、Kimi 视觉被错误禁用，说明用户希望 **按模型/按请求** 控制采样与能力，而非依赖硬编码。
- **移动端需求强烈**：原生 App + 语音通话获得 16👍，Android beta 因 Firebase 测试者上限被挤满，说明需求已超过当前分发能力。
- **插件作者关注更新稳定性**：`hermes update` 重建 venv 丢失插件依赖，导致 provider 插件静默失败；插件作者同时积极提交新钩子与目录条目，期望更稳定的生命周期契约。
- **桌面端细节体验待打磨**：菜单溢出、文件选择路径错误、聊天气泡布局等 UX 问题被持续反馈，与桌面重设计 PR 形成呼应。

---

## 8. 待处理积压

以下为创建时间较早、讨论较多但仍未关闭的重点 Issue/PR，建议维护者优先分流：

| 条目 | 创建时间 | 年龄 | 评论/👍 | 关注理由 |
|---|---|---:|---:|---|
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) 安全：config set 绕过写保护 | 2026-07-06 | ~135 天 | 29 / 0 | 今日评论最多，安全影响高，`needs-decision`，应优先给出设计结论。 |
| [#23717](https://github.com/NousResearch/hermes-agent/issues/23717) 可插拔 SessionDB RFC | 2026-05-11 | ~191 天 | 25 / 11 | 架构级 RFC，长期 `needs-decision`，影响多实例/热更新部署。 |
| [#11911](https://github.com/NousResearch/hermes-agent/issues/11911) 原生移动端 + 语音通话 | 2026-04-18 | ~214 天 | 23 / 16 | 需求热度最高之一，移动 beta 已存在但语音能力缺失。 |
| [#68128](https://github.com/NousResearch/hermes-agent/issues/68128) WhatsApp Windows WinError 5 | 2026-07-20 | ~121 天 | 23 / 3 | Windows 平台关键阻塞，长期未解。 |
| [#122609](https://github.com/NousResearch/hermes-agent/issues/122609) Skills index degraded | 2026-09-25 | ~54 天 | 22 / 0 | 自动探针反复触发，说明索引构建/部署链路不稳定。 |
| [#17565](https://github.com/NousResearch/hermes-agent/issues/17565) 可配置 temperature | 2026-04-29 | ~203 天 | 14 / 18 | 👍 最高；PR #157215 已出现，建议尽快推进闭环。 |
| [#21574](https://github.com/NousResearch/hermes-agent/issues/21574) 每用户隔离与权限 | 2026-05-08 | ~194 天 | 12 / 2 | 安全架构需求，与 #59293 同属信任主线。 |
| [#41219](https://github.com/NousResearch/hermes-agent/issues/41219) Windows 网关事件循环死锁 | 2026-06-07 | ~164 天 | 8 / 0 | 影响网关可用性，Windows 用户长期受阻。 |
| [#6642](https://github.com/NousResearch/hermes-agent/issues/6642) 统一 telemetry/analytics | 2026-04-09 | ~223 天 | 9 / 1 | 最老的功能请求之一，成本/延迟/失败率观测仍缺。 |
| [#69659](https://github.com/NousResearch/hermes-agent/issues/69659) WhatsApp 历史与联系人 API | 2026-07-22 | ~119 天 | 8 / 0 | 平台能力缺口，影响实际问答场景。 |
| [#133357](https://github.com/NousResearch/hermes-agent/pull/133357) StalkChain MCP 目录 PR | 2026-10-05 | ~44 天 | — / 0 | 待合并时间较长的目录类 PR，P4，可批量处理。 |
| [#152168](https://github.com/NousResearch/hermes-agent/pull/152168) 桌面端重设计 | 2026-11-09 | ~9 天 | — / 0 | 大型 PR，需重点 review；与 #153065–#153070 栈共同占用评审资源。 |

**维护建议**：
1. 对 **#59293** 给出明确安全决策（修复/接受风险/加门控），避免长期悬而未决。
2. 对 **Windows 稳定性** 建立统一跟踪 issue，合并 #68128、#126622、#41219、#146538、#141599 等重复排查成本。
3. 对 **#17565 → #157215** 快速闭环，作为“社区高赞需求快速响应”的正向案例。
4. 面对 **402 条待合并 PR**，建议按 `type/security`、`P1/P2`、桌面端栈、插件目录分批评审，避免 review 饥饿。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 · 2026-11-18

> 数据窗口：2026-11-17 至 2026-11-18（过去 24 小时）｜数据来源：GitHub Issues / Pull Requests

---

## 1. 今日速览

过去 24 小时 AstrBot 保持**高强度迭代**：PR 更新 **48 条**，其中 **27 条已合并/关闭**（关闭率约 **56%**），待合并 21 条；Issues 更新 7 条，仅 1 条关闭。核心维护者 @Soulter 连续合并插件消息视图与 ChatUI 多标签工作台两项前端能力，@Sha1rholder 在 CI、测试提速与依赖治理上密集提交，工程侧投入明显。24 小时内**无新版本发布**。整体活跃度评为**高**，交付节奏快；但安全类 Issue #11197 与主事件循环阻塞 Issue #10898 目前均无 fix PR，是当前健康度的主要风险点。

---

## 2. 版本发布

无新版本发布（ Releases 为空），本节略。

---

## 3. 项目进展

### 今日已合并/关闭的重要 PR

| PR | 类型 | 推进内容 | 影响 |
|---|---|---|---|
| [#11179](https://github.com/AstrBotDevs/AstrBot/pull/11179) | 功能 | 插件可在 ChatUI 消息内渲染交互式 HTML 组件，支持命令、消息处理器、LLM 工具创建并处理用户操作 | **插件生态能力底座**，为后续工作台铺路 |
| [#11218](https://github.com/AstrBotDevs/AstrBot/pull/11218) | 功能 | ChatUI 旁新增多标签工作台与常驻插件视图，每个会话独立恢复标签与布局 | 基于 #11179 的第二弹，**前端交互形态升级** |
| [#11142](https://github.com/AstrBotDevs/AstrBot/pull/11142) | 功能/稳定性 | 原生工具等待结果期间收到 steering 时，将迭代器与在途读取转入后台，前台返回 `running` 任务回执 | 提升**运行时并发与打断体验** |
| [#11219](https://github.com/AstrBotDevs/AstrBot/pull/11219) | 功能/修复 | Gemini 4 系列支持 WebUI 配置 `reasoning_effort`，含 minimal 兼容 workaround；关闭 #11173 | 解决 Gemini 4 默认 HIGH 思考导致超时 |
| [#11199](https://github.com/AstrBotDevs/AstrBot/pull/11199) | 性能 | 合并会话元数据与幂等性查询为单次 `SELECT ... LEFT JOIN` | 减少每次会话事件追加的 SQLite 往返 |
| [#11186](https://github.com/AstrBotDevs/AstrBot/pull/11186) | 修复 | 移除已失效的 VoceChat Logo 引用 | 消除构建期警告 |
| [#11222](https://github.com/AstrBotDevs/AstrBot/pull/11222) | 工程 | 项目交付测试显式禁用临时仓库 Git 签名 | 修复启用签名用户的测试卡死/PIN 弹窗 |

### 推进评估

今日最大增量在**插件可扩展性**：#11179 + #11218 形成“消息内交互组件 → 多标签常驻工作台”的完整链路，且两条 PR 在同一天完成闭环，说明该方向设计已收敛、评审通路顺畅。其次是**模型适配与运行时健壮性**（Gemini 4 reasoning、工具 steering 后台化）。工程侧（CI 简化 #11226、测试提速 #11228、依赖统一 #11174）正在并行推进，但尚未合并。

---

## 4. 社区热点

> 说明：本次数据中 PR 评论区计数未提供，热点以 Issue 评论数为主要依据。

| 排名 | 条目 | 评论 | 链接 | 背后诉求 |
|---|---|---|---|---|
| 1 | #11174 统一依赖管理到 uv，移除 requirements.txt | 3 | [#11174](https://github.com/AstrBotDevs/AstrBot/issues/11174) | 依赖双轨维护已产生**实际版本漂移**（certifi、faiss-cpu、pip 约束不一致）。诉求不止于“删文件”，而是 Docker、CI、WebUI 在线更新、插件生态四条链路统一读取 `pyproject.toml`，涉及兼容性取舍，故讨论集中 |
| 2 | #11221 群聊纯文本 `@` 前缀导致 CommandFilter 不识别 `/new` | 2 | [#11221](https://github.com/AstrBotDevs/AstrBot/issues/11221) | 非标准 OneBot `at` 段的客户端把 `@` 当纯文本，`is_at_or_wake_command=False`，内置指令被当普通聊天送进 LLM。**用户以为重置了会话，实际没有**，属于静默错误 |
| 3 | #11197 插件页面通过 URL query 传递 `asset_token` | 2 | [#11197](https://github.com/AstrBotDevs/AstrBot/issues/11197) | 凭据随访问日志与 Referer 扩散，属**安全设计缺陷**。讨论聚焦令牌签发隔离（`token_type=plugin_page_asset`）与传输方式改造 |
| 4 | #10859 群聊上下文时间戳缺日期 | 1 | [#10859](https://github.com/AstrBotDevs/AstrBot/issues/10859) | 时间语义错误导致模型把“今天中午”说成“昨晚”，影响多轮记忆可信度 |
| 5 | #10898 同步控制台日志阻塞主事件循环 | 1 | [#10898](https://github.com/AstrBotDevs/AstrBot/issues/10898) | Windows 本地部署下整个 Dashboard 无响应，watchdog 栈停在 `logger.info → StreamSink`，属**可用性级**问题 |

**观察**：今日讨论重心从“功能想要什么”转向“**基础设施正确性**”——依赖一致性、凭据安全、事件循环阻塞。这是项目进入中大型阶段的典型信号，也意味着维护成本正在从功能开发向工程治理转移。

---

## 5. Bug 与稳定性

| 严重度 | 问题 | 现象 | Fix PR |
|---|---|---|---|
| **严重（安全）** | [#11197](https://github.com/AstrBotDevs/AstrBot/issues/11197) | 插件页 `asset_token` 经 URL query 下发，可经访问日志、Referer 泄漏；令牌独立签发但仍是有效凭据 | ❌ 无 |
| **高（可用性）** | [#10898](https://github.com/AstrBotDevs/AstrBot/issues/10898) | Windows + WebChat 场景下同步控制台日志在 stdout 受阻时阻塞主事件循环，HTTP 请求约 4s 超时，整个 WebUI 无响应 | ❌ 无 |
| **中（功能正确性）** | [#11221](https://github.com/AstrBotDevs/AstrBot/issues/11221) | 群聊 `@Bot/new` 等内置指令不触发，`/new`、`/reset`、`/provider` 全部失效且无提示 | ❌ 无 |
| **中（语义正确性）** | [#10859](https://github.com/AstrBotDevs/AstrBot/issues/10859) | 群聊上下文时间戳无日期，`Current datetime` 取请求组装时刻，积压消息时时间判断错位 | ❌ 无 |
| **低（环境相关）** | [#11227](https://github.com/AstrBotDevs/AstrBot/issues/11227) | 开启“本机环境”后经 CLIProxyAPI/Antigravity 返回 429；2×2 对照显示**工具定义可保留、本机说明文案触发问题** | ❌ 无（作者明确限定为上游链路兼容性反馈） |
| **已修复** | [#11173](https://github.com/AstrBotDevs/AstrBot/issues/11173) | Gemini 4 系列默认 HIGH 思考强度导致超时 | ✅ [#11219](https://github.com/AstrBotDevs/AstrBot/pull/11219) 已合并/关闭 |

**风险判断**：#11197 与 #10898 均无 fix PR，且分别涉及凭据泄漏与全局不可用，建议列为下一迭代最高优先级。#11221 修复面较小（`CommandFilter.filter()` 首行判定），适合作为快速跟进项。另有一条**已开 PR 的兼容性修复**值得关注：[#11223](https://github.com/AstrBotDevs/AstrBot/pull/11223) 修复历史工具调用导致的 400（重复 `call id`、无应答的 `tool_call`），针对上下文截断/压缩后的旧会话，触发条件窄但常见。

---

## 6. 功能请求与路线图信号

| 需求 | 来源 | 已有 PR | 纳入下一版本的可能性 |
|---|---|---|---|
| 依赖统一到 uv / `pyproject.toml`，移除 requirements.txt | [#11174](https://github.com/AstrBotDevs/AstrBot/issues/11174) | 无直接 PR | **高**——维护者本人发起，且 #11226（CI 固定依赖）、#11228（测试提速）同属工程治理序列 |
| 企业微信 AI Bot 原生注册（扫码 start/poll） | [#11225](https://github.com/AstrBotDevs/AstrBot/pull/11225) | ✅ 已开 | **高**——PR 完整，补充官方扫码流程并从回调契约推导群内寻址 |
| 模型配置面板扁平化（去二级菜单） | [#11187](https://github.com/AstrBotDevs/AstrBot/pull/11187) | ✅ 已开，Closes #11175 | **高**——纯前端 UX 改造，含移动端优化与 Reasoning Effort 自定义枚举 |
| 移除 Gemini 2(.x) 适配器 | [#11224](https://github.com/AstrBotDevs/AstrBot/pull/11224) | ✅ 已开 | **中高**——标注为**破坏性变更**（“非破坏性”勾选未勾），是模型适配收敛的明确信号 |
| Keenable 作为可选 Web 搜索 Provider | [#10548](https://github.com/AstrBotDevs/AstrBot/pull/10548) | ✅ 已开 | 中——opt-in 实现，作者声明关联利益，需评估默认 provider 不受影响 |
| OpenAI 工具 schema 中 `const` 归一化为单值 `enum` | [#10725](https://github.com/AstrBotDevs/AstrBot/pull/10725) | ✅ 已开 | 中——兼容性修复，风险低 |
| 群聊保留 `@机器人` 的模型上下文语义 | [#10992](https://github.com/AstrBotDevs/AstrBot/pull/10992) | ✅ 已开 | 中——不改 `message_str` 与命令解析，设计克制，但需评估多目标 `@` 的歧义表达 |
| 插件页 bridge 透传结构化错误字段 | [#10850](https://github.com/AstrBotDevs/AstrBot/pull/10850) | ✅ 已开 | 中——与插件生态扩展（#11179/#11218）方向一致 |

**路线图信号**：三条主线清晰——① **工程治理**（uv/CI/测试）；② **插件平台化**（交互组件 + 工作台 + 结构化错误桥）；③ **适配器收敛与兼容**（Gemini 2 移除、QQ Official 修复、Telegram 恢复、WeCom 原生注册）。模型配置 UI 扁平化显示团队开始处理“配置项过多劝退用户”的体验债。

---

## 7. 用户反馈摘要

**真实痛点**

- **“静默失败”最伤信任**：用户明确表达“以为已经切换了会话”但实际未重置（#11221）；QQ Official 场景下工具在未发送时仍回复 `Message sent`（#10848），均属无错误提示的假成功。
- **Windows 本地部署体验脆弱**：WebUI 整体无响应（#10898）、Git 签名导致测试弹 PIN 阻塞（#11222），说明本地/桌面路径的健壮性弱于服务端。
- **依赖与升级焦虑**：#11219 中提到 `<=4.29.2` 的 WebUI 在线升级 bug 会因 bump 依赖而失败，用户对“升级后能否起来”高度敏感。
- **模型时间感知不可靠**：#10859 用户逐项列出环境（4.29.3 / Python 3.12.14 / aiocqhttp / SnowLuma 2.2.1 / DeepSeek / Asia-Shanghai），复现信息完整，说明是深度用户在生产使用中踩到。

**使用场景分布**

OneBot v11 反向 WS（aiocqhttp + SnowLuma）、QQ 官方、Telegram、企业微信、Docker on Windows host、WebChat、Windows 本地直跑；模型侧 DeepSeek、Gemini 3/4、OpenAI 兼容 Provider、CLIProxyAPI/Antigravity 代理链路。**多适配器、多模型、跨平台**是典型形态。

**满意/不满意**

- 满意：功能迭代速度快，插件能力持续增强（消息内交互组件、常驻工作台），问题响应后多有 PR 跟进（#11173 → #11219 当日闭环）。
- 不满意：安全与稳定性类长尾问题修复周期偏长（#10898 自 10-31 起 18 天无 fix），配置项复杂度上升，依赖维护出现双轨漂移。

---

## 8. 待处理积压

| 条目 | 类型 | 已挂起 | 风险/说明 |
|---|---|---|---|
| [#10396](https://github.com/AstrBotDevs/AstrBot/pull/10396) | PR · Telegram 轮询恢复 | **44 天**（10-05） | 代理连接池耗尽后 PTB 无限重试且不触发错误回调；修复已实现“连续 3 次池超时触发恢复”，长期未合并，建议明确评审结论 |
| [#10548](https://github.com/AstrBotDevs/AstrBot/pull/10548) | PR · Keenable 搜索 Provider | **36 天**（10-13） | 作者为 Keenable 员工，存在利益关联披露；需确认默认 provider 与 opt-in 边界 |
| [#10725](https://github.com/AstrBotDevs/AstrBot/pull/10725) | PR · 工具 schema `const` → `enum` | **25 天**（10-24） | 修复 #10720，改动局部、风险低，属易被淹没的高性价比 PR |
| [#10842](https://github.com/AstrBotDevs/AstrBot/pull/10842) | PR · QQ 官方引用回复需显式 ID | **21 天**（10-28） | 误判引用会污染偏好引用类插件，建议与 #10848 一并评审 |
| [#10848](https://github.com/AstrBotDevs/AstrBot/pull/10848) | PR · QQ 官方发送失败应抛错 | **20 天**（10-29） | 直接对应“假成功”痛点，用户可感知 |
| [#10850](https://github.com/AstrBotDevs/AstrBot/pull/10850) | PR · 插件页 bridge 结构化错误 | **20 天**（10-29） | 与 #11179/#11218 插件平台化方向强相关，建议随生态推进一并处理 |
| [#10859](https://github.com/AstrBotDevs/AstrBot/issues/10859) | Issue · 时间戳缺日期 | **20 天**（10-29） | 有明确复现与根因线索，无 fix PR |
| [#10898](https://github.com/AstrBotDevs/AstrBot/issues/10898) | Issue · 日志阻塞事件循环 | **18 天**（10-31） | **可用性级**，无 fix PR，建议优先 |
| [#10992](https://github.com/AstrBotDevs/AstrBot/pull/10992) | PR · 保留 `@机器人` 上下文 | **14 天**（11-04） | 设计说明充分，需评估多 `@` 歧义表达 |
| [#11187](https://github.com/AstrBotDevs/AstrBot/pull/11187) | PR · 模型配置面板扁平化 | 2 天（11-16） | 新近提交，暂不构成积压，但涉及 WebUI 主路径，宜尽早给结论 |

**维护者提示**：当前积压呈“**PR 多、Issue 少**”结构——21 条待合并 PR 中，超过 5 条已挂起 20 天以上，且集中在 QQ 官方 / Telegram / 插件 bridge 三个适配与生态方向。建议按“适配器修复批量评审 + 工程治理串行合并”两条队列清理，避免长期 PR 与主干产生冲突成本。同时 #11197、#10898 两条无 fix PR 的高危 Issue 应进入下一迭代必办清单。

---

*本日报基于 GitHub 公开数据自动生成；PR 评论计数本次未提供，热点分析以 Issue 讨论为主。*

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：2026-11-18** ｜ 仓库：github.com/deepseek-ai/deepseek-harness
**数据口径说明**：该仓库未启用 GitHub Issues / Pull Requests，代码合并经 Releases 落地，因此下文以 Release changelog 作为合并摘要，以 GitHub Discussions 作为社区活动与缺陷反馈的主要来源。

---

## 1. 今日速览

- 项目处于 **0.2.2 候选版收尾阶段**：今日发布 `dsh-v0.2.2-rc.4`，仅含 2 项缺陷修复，属小步快跑的 rc 迭代，未见破坏性变更。
- 社区活跃度**处于高位**：过去 24 小时 Discussions 更新 **180 条**，热度集中在支付渠道可用性、Agent 破坏性操作、长上下文推理退化三类议题。
- 讨论区结构显示**"高热度、低闭环"**特征：评论最多的 15 条讨论合计 205 条评论，其中 10 条创建于 8–10 月至今仍为 OPEN，跨月未收敛。
- 今日更新/新建的讨论中，**模型响应异常处理链路**（`MALFORMED_RESPONSE` / `refusal` stop_reason）出现集中反馈，与 rc.4 的修复方向吻合，但社区认为修复未覆盖重试策略层。
- 风险项：`#12751` 报告 Agent 执行插件任务时清空会话目录，属**数据丢失级**问题，目前无版本层面的修复记录，需优先跟进。

---

## 2. 版本发布

### dsh-v0.2.2-rc.4（最新）

**合并上线的修复（2 项）**

| 类型 | 内容 | 贡献者 |
|---|---|---|
| 修复 | 优化模型请求收到异常消息响应时的表现（Improve handling of unexpected model responses） | @turtle2099 |
| 修复 | 修复 LiveShare 在桌面端无法创建分享的问题（Fix LiveShare failing to create shares in the desktop app） | @mektpoy |

链接：https://github.com/deepseek-ai/deepseek-harness/compare/dsh-v0.2.2-rc.3...dsh-v0.2.2-rc.4

**破坏性变更**：changelog 未标注任何 breaking change，API/配置面预期兼容。

**迁移与升级注意事项**

1. **rc 通道升级路径存在已知失败**：`#13076`（rc.1→rc.2 更新失败后进程直接退出、版本未变更）与 `#11032`（Host 已回报 shutdown-complete 但进程未在 10 秒优雅期退出，导致拒绝安装）表明桌面端**应用内自动更新在 Windows 上不可靠**。建议本轮采用**手动下载安装包覆盖升级**。
2. **升级前备份数据目录**：鉴于 `#12751` 的数据丢失报告，建议在升级前对 `DSH_HOME/sessions/` 做冷备。
3. **异常响应处理的行为变化**：rc.4 改动了模型异常响应的处理路径，使用自定义 provider/代理网关的用户建议回归验证错误提示与重试行为是否变化。

---

## 3. 项目进展

本周期无 PR 数据（仓库未启用 PR），以下为 **dsh-v0.2.2-rc.4 合并落地的进展**：

- **模型调用容错层推进一格**：针对"上游返回非预期消息"的场景做了处理优化（@turtle2099）。这是 0.2.2 系列连续第二个版本聚焦"异常响应"主题，方向上回应了社区长期反馈的 `MALFORMED_RESPONSE` 硬失败问题（见 `#11577`/`#11337`/`#13611`）。但需注意：changelog 措辞为"优化表现"，**未明确说明是否将 `MALFORMED_RESPONSE` 纳入默认可重试错误码**，该诉求是否真正闭环仍需实测确认。
- **协作能力修复**：LiveShare 桌面端分享创建失败已修复（@mektpoy），说明 LiveShare 作为近期重点功能仍在持续打磨，桌面端链路是薄弱点。

**整体推进幅度评估**：本次发版为 rc 迭代，合并量 2 项、全部为缺陷修复，**无新功能合入**。项目当前重心是 0.2.2 的稳定性收敛，而非功能扩张；对照 180 条/日的讨论量，维护侧产出与社区输入之间存在明显吞吐差。

---

## 4. 社区热点

按评论数排序（Top 15 合计 205 条评论，头部效应显著）：

| 排名 | 讨论 | 评论 | 核心诉求 |
|---|---|---|---|
| 1 | [#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755) 支持俄罗斯 MIR 卡支付 DeepSeek API | **71** | 地区性支付渠道缺失导致无法付费，直接阻塞 API 采用 |
| 2 | [#12751](https://github.com/deepseek-ai/deepseek-harness/discussions/12751) 让 Agent 写插件，结果清空 dsh 与 zcode 目录 | 18 | Agent 高危文件操作缺乏确认/沙箱/回滚 |
| 3 | [#5976](https://github.com/deepseek-ai/deepseek-harness/discussions/5976) 超长上下文 + max reasoning 下思考退化循环、零产出、无熔断 | 18 | 缺少死循环检测与自动中止机制 |
| 4 | [#13368](https://github.com/deepseek-ai/deepseek-harness/discussions/13368) 官网客户端首次启动即报错 `fetch failed`（Win11） | 16 | 首次启动可用性，安装即失败 |
| 5 | [#13076](https://github.com/deepseek-ai/deepseek-harness/discussions/13076) 桌面端 rc.1→rc.2 更新失败 | 9 | 自动更新可靠性 |
| 6 | [#10034](https://github.com/deepseek-ai/deepseek-harness/discussions/10034) session-search 每次调用 `SESSION_QUERY_PERSISTENCE_FAILED` | 9 | 自托管 profile + 大 session 库（220 会话/407MB）下搜索不可用 |
| 7 | [#5623](https://github.com/deepseek-ai/deepseek-harness/discussions/5623) 社区插件 dsh-code-index v0.11.0（Impact X-Ray） | 9 | 插件生态活跃度展示 |
| 8 | [#9692](https://github.com/deepseek-ai/deepseek-harness/discussions/9692) 跨会话记忆、会话归档、用户名记忆、编辑消息时推理一致性 | 9 | 长期记忆与人格一致性 |
| 9 | [#9718](https://github.com/deepseek-ai/deepseek-harness/discussions/9718) Windows "British Columbia Standard Time" 导致 `browser time zone is unavailable`，所有消息被拒 | 8 | Electron 时区→IANA 映射失败，区域性阻断 |
| 10 | [#1999](https://github.com/deepseek-ai/deepseek-harness/discussions/1999) FTS5 分词器可配置（中文搜索支持） | 8 | `unicode61` 不切分中文，中文 session 搜索几乎不可用 |

**诉求分析**

1. **商业化可用性优先于功能**：`#12755` 以 71 条评论（占 Top15 的 34.6%）绝对领跑，反映"想付费但付不了"是比功能缺失更硬的流失原因。此类议题属运营/支付侧，但社区将其投递到产品仓库，说明缺少正式支持渠道分流。
2. **Agent 权限模型是信任瓶颈**：`#12751` 与 `#5976` 分列二、三位，共同指向"Agent 自主执行缺少护栏"——前者是破坏性文件操作无确认，后者是推理失控无熔断。这两条是**产品安全模型层面的结构性问题**，非单点 bug。
3. **桌面端分发链路是体验短板**：`#13368`、`#13076`、`#11032`、`#9718` 四条均围绕安装/更新/启动/环境适配，构成"用户还没开始用就失败"的漏斗前端损耗。
4. **reaction 数据全为 0**：表明该社区**不使用 👍 表达共识**，评论数是唯一有效热度信号，维护者若以 reaction 排序会严重低估议题权重。

---

## 5. Bug 与稳定性

按严重程度排列（fix 状态以版本 changelog 为准）：

### P0 — 数据丢失 / 不可逆损害
- **`#12751` Agent 执行插件任务时清空 `dsh` 与 `zcode` 目录，所有会话丢失**
  https://github.com/deepseek-ai/deepseek-harness/discussions/12751
  用户仅要求"写一个 token 统计插件"，结果会话目录被删除。**是否存在修复：无版本记录**。属最高优先级，建议：命令级危险操作二次确认、文件操作限定工作区白名单、会话存储与插件工作目录隔离、提供删除前快照。

### P1 — 功能完全阻断 / 无自动恢复
- **`#5976` 超长上下文 + `reasoningEffort: max` 下思考退化循环，回合零产出且无熔断**
  https://github.com/deepseek-ai/deepseek-harness/discussions/5976
  同配置下 `v4-flash` 3000+ 步未复发，`v4.1-flash` 稳定复现，指向**模型/参数组合特异性回归**。无 fix 记录。建议加重复步骤检测与最大步数熔断。
- **`#13368` Win11 全新系统首次启动即失败（`fetch failed`）**
  https://github.com/deepseek-ai/deepseek-harness/discussions/13368
  版本 rc.3，安装即不可用。无 fix 记录；rc.4 changelog 未涉及启动链路。
- **`#9718` Windows 新时区导致 `browser time zone is unavailable`，每条消息均被拒绝**
  https://github.com/deepseek-ai/deepseek-harness/discussions/9718
  今日仍有更新。Electron 无法将 Windows 时区解析为非空 IANA 标识，**无降级兜底**。无 fix 记录。
- **`#10034` experimental-session-search 全部调用失败 `SESSION_QUERY_PERSISTENCE_FAILED`**
  https://github.com/deepseek-ai/deepseek-harness/discussions/10034
  自托管 profile + 大体量 session 库场景。无 fix 记录。

### P1 — 错误响应链路（与 rc.4 部分相关）
- **`#11577` 单条 `tool_use` 参数非法即整轮硬失败，`MALFORMED_RESPONSE` 仍不在默认重试码**
  https://github.com/deepseek-ai/deepseek-harness/discussions/11577
  汇总了 #7705/#8920/#8976/#9402/#9503/#10406 六个重复报告，附 rc.5 复现与补丁建议。**rc.4 的"优化异常响应处理"可能缓解此问题，但未声明加入重试白名单，需实测确认。**
- **`#13611`（昨日新建）`stopReason()` 拒绝合法 stop_reason `"refusal"` → `MALFORMED_RESPONSE` → 回合以错误终止且无法继续**
  https://github.com/deepseek-ai/deepseek-harness/discussions/13611
  rc.3 桌面版复现。**同一根因的新报告，说明 rc.4 发布前该问题仍开放。**
- **`#11337` 正常中文运维指令触发上游 `stop_reason: refusal`，客户端报 `MALFORMED_RESPONSE`**
  https://github.com/deepseek-ai/deepseek-harness/discussions/11337
  **误判 + 错误包装双重问题**：客户端把合法 stop_reason 当非法值处理，掩盖了真实原因。

### P2 — 更新与集成
- **`#13076` / `#11032` 桌面端应用内更新失败、拒绝安装**
  https://github.com/deepseek-ai/deepseek-harness/discussions/13076 ｜ https://github.com/deepseek-ai/deepseek-harness/discussions/11032
  `#11032` 明确指出 master 修复 `6252a29a` **未包含在发布包中**——属发布工程问题（cherry-pick 遗漏），建议核查发布分支。
- **`#6322` ACP `session/new` 从不下发 `available_commands_update`，客户端命令面板为空**
  https://github.com/deepseek-ai/deepseek-harness/discussions/6322
  集成层协议实现缺失，影响所有 ACP 客户端。

---

## 6. 功能请求与路线图信号

| 需求 | 讨论 | 纳入下一版本的可能性评估 |
|---|---|---|
| MIR 卡支付 / 地区支付渠道 | [#12755](https://github.com/deepseek-ai/deepseek-harness/discussions/12755) | **低（在本仓库）**。属计费与商务侧，非 harness 代码可解；但热度最高，应由官方给出明确的支持渠道答复，避免讨论区持续吸热。 |
| 跨会话记忆、会话归档、用户名记忆、编辑消息时推理一致 | [#9692](https://github.com/deepseek-ai/deepseek-harness/discussions/9692) | **中**。与 session 存储层同源，但涉及产品语义设计，0.2.2 周期内不太可能；更可能进入 0.3.x 路线图。 |
| FTS5 分词器可配置（中文分词） | [#1999](https://github.com/deepseek-ai/deepseek-harness/discussions/1999) | **较高**。改动面小（`session-query-sqlite` 增加 `tokenizer` / `tokenizerExtension` 两个配置项），且与 `#10034` 同属 session 搜索模块，可一并处理。 |
| ACP 补发 `available_commands_update` | [#6322](https://github.com/deepseek-ai/deepseek-harness/discussions/6322) | **较高**。协议合规性补齐，实现成本低，属"必答题"而非"选答题"。 |
| Agent 危险操作确认 / 沙箱 / 熔断 | [#12751](https://github.com/deepseek-ai/deepseek-harness/discussions/12751)、[#5976](https://github.com/deepseek-ai/deepseek-harness/discussions/5976) | **中高**。已是信任级问题，但涉及权限模型重构，预计以"渐进式护栏"（确认弹窗 + 步数上限）先行落地。 |

**路线图信号判断**：rc.4 的两项修复分别落在"模型响应容错"与"LiveShare"，说明 0.2.2 收尾期**以稳定性为主、不引入新功能面**。上述功能请求中，`#1999` 与 `#6322` 因成本低、边界清晰，最有机会搭上 0.2.2 末班车或 0.3.0 首班车；`#9692` 与 `#12751` 需产品决策，短期难见代码落地。

---

## 7. 用户反馈摘要

**真实痛点**

1. **"付费无门"比"功能不足"更劝退**：`#12755` 的 71 条评论中，核心不是功能诉求而是**支付渠道的地域排斥**，用户明确表示"本地卡无法支付"构成采用 API 的硬门槛。
2. **Agent 的破坏力超出用户预期**：`#12751` 的表述（"我tm真服了"）显示用户对 Agent 拥有**未受限的文件系统权限**毫无心理准备；用户心智中"写插件"是低危操作，实际执行却是高危操作。这是**能力与风险沟通的错配**。
3. **错误信息不可诊断**：`#11577`/`#11337`/`#13611` 三条共同反映同一体验缺陷——客户端把上游合法的 `stop_reason: refusal` 判为非法值，统一包装成 `MALFORMED_RESPONSE`，用户既不知道真实原因，也没有重试或继续的入口。`#11337` 中"24 个汉字、无敏感内容的正常运维指令"被 refusal，进一步加剧困惑。
4. **桌面端"装不上/更不上/开不了"**：`#13368`（首启 `fetch failed`）、`#13076`（更新后静默退出）、`#11032`（拒绝安装并提示"未能安全停止任务"）构成连续三段式失败，且 `#13368` 用户为**全新重装的 Win11、首个安装的软件**，排除了环境脏乱因素。
5. **中文场景支持不足**：`#1999` 指出 `unicode61` 把连续中文当作单个超长 token，中文 session 搜索"几乎无法命中"——对中文用户是**核心检索能力缺失**，而非体验瑕疵。

**使用场景观察**

- **自托管 / 非默认 `DSH_HOME`** 用户（`#10034`，220 会话 / 407MB）已进入**规模化使用阶段**，其 session 库体量暴露出持久化层在压力下的失败模式。
- **第三方插件生态真实存在且在迭代**（`#5623` dsh-code-index v0.11.0，含 Impact X-Ray 影响面分析），说明扩展机制已被社区接受并用于工程实践。

**满意 / 不满意分布**

- 满意信号：插件机制可用、社区愿意投入维护非官方插件、LiveShare 等协作功能有人在用（否则不会报"无法创建分享"）。
- 不满意信号：集中在**可靠性**（安装/更新/启动）、**安全性**（Agent 权限）、**可诊断性**（错误包装）、**本地化**（中文搜索、时区）四个维度，均为基础设施层问题，而非功能丰富度问题。

---

## 8. 待处理积压（提醒维护者关注）

以下讨论**创建至今均超过 2 周仍未闭环**，且大多有持续更新，属"活着但没被解决"的积压：

| 讨论 | 创建日期 | 积压时长 | 状态 | 风险 |
|---|---|---|---|---|
| [#1999](https://github.com/deepseek-ai/deepseek-harness/discussions/1999) FTS5 中文分词 | 2026-08-15 | **约 3 个月** | OPEN，8 评论 | 中文用户检索能力缺失，低成本可解 |
| [#5976](https://github.com/deepseek-ai/deepseek-harness/discussions/5976) reasoning 退化循环 | 2026-09-08 | 约 2 个月 | OPEN，18 评论 | 高算力空转 + 无熔断，P1 |
| [#5623](https://github.com/deepseek-ai/deepseek-harness/discussions/5623) 社区插件展示 | 2026-09-04 | 约 2 个月 | OPEN，9 评论 | 生态运营缺位，无官方回应机制 |
| [#6322](https://github.com/deepseek-ai/deepseek-harness/discussions/6322) ACP 命令面板为空 | 2026-09-11 | 约 2 个月 | OPEN，5 评论 | 集成协议不合规 |
| [#9692](https://github.com/deepseek-ai/deepseek-harness/discussions/9692) 跨会话记忆等 4 项 | 2026-10-14 | 约 1 个月 | OPEN，9 评论 | 产品路线图未回应 |
| [#9718](https://github.com/deepseek-ai/deepseek-harness/discussions/9718) 时区阻断 | 2026-10-14 | 约 1 个月 | OPEN，8 评论（今日更新） | 区域性完全阻断 |
| [#10034](https://github.com/deepseek-ai/deepseek-harness/discussions/10034) session-search 持久化失败 | 2026-10-17 | 约 1 个月 | OPEN，9 评论 | 搜索功能不可用 |
| [#11032](https://github.com/deepseek-ai/deepseek-harness/discussions/11032) 应用内更新被拒（修复未进发布包） | 2026-10-26 | 约 3 周 | OPEN，7 评论 | **发布工程问题，需核查 cherry-pick** |
| [#11577](https://github.com/deepseek-ai/deepseek-harness/discussions/11577) MALFORMED_RESPONSE 重试码 | 2026-10-30 | 约 3 周 | OPEN，7 评论 | 已汇总 6 个重复报告，未收敛 |
| [#11337](https://github.com/deepseek-ai/deepseek-harness/discussions/11337) refusal 误判 | 2026-10-28 | 约 3 周 | OPEN，6 评论（今日更新） | 与 #13611 同根因，重复报告在增加 |

**结构性建议**

1. **启用 Issues 或建立 Discussions 分类与状态标签**：当前 180 条/日 的讨论量下，`#11577` 已手工汇总 6 个重复报告、`#11337` 与 `#13611` 同根因重复提交，说明**缺少去重与状态追踪机制**，维护者与用户都在重复劳动。建议至少引入 `confirmed` / `needs-repro` / `fixed-in-rc.x` 标签。
2. **发布流程核查**：`#11032` 指出 master 修复未进入发布包，建议在 rc 发布前增加"master 关键修复是否已 cherry-pick"的检查项。
3. **优先处理 P0**：`#12751` 的数据丢失风险高于所有功能议题，即使根因在模型行为侧，也应在 harness 层加入操作护栏作为兜底。

---

**项目健康度小结**：社区侧**输入旺盛**（180 条/日、头部议题 71 评论），插件生态自发成长，用户已进入规模化使用阶段；维护侧**输出偏保守**（单版本 2 项修复、无新功能），且缺少缺陷闭环追踪设施，导致高价值反馈长期沉积。当前主要矛盾不是活跃度不足，而是**输入吞吐与处置吞吐不匹配**。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*