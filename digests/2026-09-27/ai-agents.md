# OpenClaw 生态日报 2026-09-27

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-27 00:01 UTC

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
**日期：2026-09-27**  
**数据来源：OpenClaw GitHub Repository**

---

## 1. 今日速览

OpenClaw 项目在 2026 年 9 月 27 日保持高度活跃，过去 24 小时内共产生 500 条 Issue 更新和 500 条 PR 更新，显示社区参与度极高。尽管无新版本正式发布，但大量 P0 级 Bug 被标记为 Release Blocker，涉及崩溃循环、内存泄漏和更新失败等核心稳定性问题，反映出近期版本（2026.9.5/9.6）在资源管理和迁移逻辑上存在显著缺陷。同时，多项修复 PR 已进入维护者审查阶段，涵盖 Discord 通道优化、嵌入式 Ollama 代理支持及 Databricks Unity Gateway 集成，表明项目正在积极缓解关键故障并扩展生态兼容性。

---

## 2. 版本发布

**无新版本发布。**  
当前最新版本为 2026.9.6（eb377ac），但多个 Issue 报告了从 2026.9.4/9.5 升级至 2026.9.6 过程中的失败和回归问题，维护团队正优先处理稳定性修复而非功能发布。

---

## 3. 项目进展

### 今日合并/关闭的重要 PR

| PR 编号 | 标题 | 作者 | 状态 | 影响 |
|---------|------|------|------|------|
| #159266 | fix(exec): only name approval surfaces that can answer exec approvals | @steipete | OPEN | 限制 exec 审批仅路由至支持界面（Control UI、移动应用），避免终端 UI 误报 |
| #159245 | improve: speed up portable plugin copying during updates | @steipete | OPEN | 优化插件快照复制性能，减少 28.7% 文件系统开销 |
| #159194 | fix(doctor): preserve AGENTS.md permissions when merging tool notes | @steipete | OPEN | 修复 Doctor 在迁移 TOOLS.md 时错误移除组读取权限的问题 |
| #155634 | feat(provider): add Databricks Unity Gateway | @zozo123 | OPEN | 新增官方 Databricks Unity Gateway 提供者支持，闭合约 #155633 |
| #159224 | fix(gateway): report actionable errors from the embeddings endpoint | @steipete | OPEN | 改进 /v1/embeddings 端点错误响应，提供可操作诊断信息 |
| #149591 | fix(auth): keep session account selection after OAuth re-login | @zachisfine | OPEN | 修复 OAuth 重新登录后会话账户选择丢失的问题（闭合约 #149502） |
| #158267 | ci: defer 195 slow integration tests from unrelated PRs | @steipete | OPEN | 将 194 个慢速集成测试推迟至主分支每小时运行，加速无关 PR 的 CI 流程 |
| #159157 | fix: requester wake fails when a child's direct result is mirrored before its reply | @DonnieFi | OPEN | 修复子代理直接结果镜像后请求者唤醒失败的问题（闭合约 #159059） |
| #158000 | fix(models): apply downloaded catalogs without a Gateway restart | @obviyus | OPEN | 允许新下载的托管模型目录无需重启 Gateway 即可生效 |
| #157713 | feat(channels): configure mentions in bot-created threads | @steipete | OPEN | 新增 `requireMentionInBotThreads` 配置选项，优化机器人创建线程中的消息提及行为 |
| #159262 | refactor(extensions): deslop memory-wiki, active-memory, acpx and agentsapi | @steipete | OPEN | 重构 Memory Wiki、Active Memory、ACPX 和 Agents API 扩展，移除重复解析和转发层 |
| #159128 | refactor(state): reuse prepared admission and diagnostic facts | @steipete | OPEN | 复用性能活动中重复的准备状态和诊断定义，无用户可见变更 |
| #159261 | improve(ios): shorten CI failure diagnostic collection | @joshavant | OPEN | 缩短 iOS CI 失败时的诊断收集时间，加速测试反馈循环 |
| #158298 | chore(deps): refresh dependencies with seven-day cutoff | @steipete | OPEN | 更新依赖至 2026-09-18 18:23:41 UTC 发布截止版本 |
| #159103 | fix(plugins): reduce long garbage collection pauses during streaming | @steipete | OPEN | 减少高负载（100 客户端/50 会话）下流式响应期间的垃圾回收暂停 |
| #159265 | fix(discord): let newer messages pass deferred ingress | @steipete | OPEN | 修复较新 Discord 消息被延迟入口阻塞的问题（闭合约 #148730） |
| #158703 | feat(codex): enable Ultrafast for supported models | @sjf-oa | OPEN | 为支持的 Codex 模型启用 Ultrafast 模式，保留其他模型的速度偏好 |
| #159084 | refactor(acp): keep ordinary metadata work off the Gateway thread | @steipete | OPEN | 将 ACP 会话的常规元数据工作从 Gateway 线程移出，提升响应性 |
| #159263 | feat(ui): prototype grouped collaborator typing | @roboclaw-bot | OPEN | **原型设计**：分组显示协作者打字状态，避免聊天记录被大量草稿气泡填充 |
| #158940 | refactor(commands): deslop commands fourth pass | @steipete | OPEN | 第四轮命令清理重构，移除重复遍历和转发层，无用户可见变更 |
| #150380 | feat(mistral): add Mistral-hosted Z.ai GLM 5.2 and 5.3 to provider catalog | @MertBasar0 | OPEN | 新增 Mistral 托管的 Z.ai GLM 5.2 和 5.3 模型至提供者目录 |
| #134406 | fix(install): fail when OpenClaw is not on PATH | @ly85206559 | OPEN | 修复 Windows 安装程序在 `openclaw` 命令不在 PATH 时仍报告成功的问题 |
| #155442 | feat(swarm): add bounded candidate verification launches | @zozo123 | OPEN | 为 Swarm `agents.run()` 添加有界候选验证启动，限制模型/推理预算选择 |
| #159260 | fix(gateway): retain earliest scheduled deadlines | @steipete | OPEN | 修复 Gateway 调度器可能被陈旧存储读取向后移动的问题，保留最早截止时间 |
| #153573 | fix(heartbeat): prevent cross-channel owner delivery and failure copy mislabeling | @juyterman1000 | OPEN | 防止心跳编排中的跨频道泄漏和错误失败报告（闭合约 #153543） |
| #159117 | feat: let agents query online people and device activity | @steipete | OPEN | 扩展 `presence` 工具，支持查询在线人员和设备活动 |
| #159259 | docs(backup): give a working recovery step for malformed configs | @steipete | OPEN | 更新备份文档，提供 malformed 配置的有效恢复步骤 |

**项目整体进展评估：**  
今日关闭了多个长期阻塞的 Bug（如 #148730、#149502、#159059、#153543），并推进了 30+ 项修复和特性 PR，涵盖稳定性、性能优化、扩展集成和用户体验改进。项目正从 2026.9.5/9.6 版本的回归问题中恢复，维护团队通过密集的重构和修复提升整体健康度。

---

## 4. 社区热点

### 最活跃 Issue（按评论数排序）

| Issue 编号 | 标题 | 评论数 | 作者 | 链接 | 热度分析 |
|------------|------|--------|------|------|----------|
| #153257 | OpenClaw 2026.9.5 Turned a Stable Environment Into an 8-Hour Failure Recovery Session | 40 | @abuegab1-spec | [链接](https://github.com/openclaw/openclaw/issues/153257) | **最高热度**：用户升级后遭遇 8 小时恢复困境，反映 2026.9.5 版本的严重稳定性问题，引发强烈不满 |
| #155753 | Model-catalog expiry/rebuild loop pins one CPU core | 31 | @AgentZero-nccio | [链接](https://github.com/openclaw/openclaw/issues/155753) | **高热度**：CPU 核心被永久占用，关联 #154276/#153422，影响生产环境性能 |
| #139847 | message sent while a reply run is active is dropped | 20 | @motochan | [链接](https://github.com/openclaw/openclaw/issues/139847) | **中高热度**：2026.9.2 回归导致消息丢失，影响多任务场景 |
| #137332 | mixed terminal requester-settle batches retry forever after ownership check | 19 | @laurenceputra | [链接](https://github.com/openclaw/openclaw/issues/137332) | **中高热度**：子代理批次永远重试，阻塞会话状态 |
| #157067 | Windows isolated cron setup passes an uncloneable environment Proxy | 13 | @WG-Mojo | [链接](https://github.com/openclaw/openclaw/issues/157067) | **中热度**：Windows 平台 cron 设置失败，影响自动化任务 |
| #39476 | A2A sessions_send: target agent can call sessions_send back, causing duplicate messages | 13 | @SYRS-AI | [链接](https://github.com/openclaw/openclaw/issues/39476) | **中热度**：代理间消息重复，暴露 A2A 协议设计缺陷 |
| #140129 | 2026.9.2 Anthropic cache stuck at ~46k tools+system prefix | 12 | @JFLeonM | [链接](https://github.com/openclaw/openclaw/issues/140129) | **中热度**：缓存行为异常，影响长会话成本 |
| #157325 | A stuck agent-DB resource makes every agent's replies fail | 12 | @desksk | [链接](https://github.com/openclaw/openclaw/issues/157325) | **高热度**：单个 DB 资源卡住导致所有代理回复失败，P0 级崩溃循环 |
| #156112 | openclaw update fails at "global install swap" | 11 | @shadesurgeon | [链接](https://github.com/openclaw/openclaw/issues/156112) | **中热度**：更新机制失败，影响用户体验 |
| #157986 | Automations: every agentTurn job fails with DataCloneError | 10 | @richzt | [链接](https://github.com/openclaw/openclaw/issues/157986) | **中热度**：Windows 自动化任务全面失败 |

### 最活跃 PR（按评论数排序）

| PR 编号 | 标题 | 链接 | 热度分析 |
|---------|------|------|----------|
| #154204 | fix(discord): preserve visual attachment MIME over voice metadata | [链接](https://github.com/openclaw/openclaw/pull/154204) | Discord 媒体分类修复，解决语音元数据干扰视频附件问题 |
| #159266 | fix(exec): only name approval surfaces that can answer exec approvals | [链接](https://github.com/openclaw/openclaw/pull/159266) | 安全修复，限制 exec 审批至正确界面 |
| #155634 | feat(provider): add Databricks Unity Gateway | [链接](https://github.com/openclaw/openclaw/pull/155634) | 新功能集成，扩展企业级模型路由支持 |
| #149591 | fix(auth): keep session account selection after OAuth re-login | [链接](https://github.com/openclaw/openclaw/pull/149591) | 身份验证关键修复，闭环用户痛点 |
| #158267 | ci: defer 195 slow integration tests from unrelated PRs | [链接](https://github.com/openclaw/openclaw/pull/158267) | CI 性能优化，加速开发流程 |

**社区诉求分析：**  
- **稳定性优先**：最热门 Issue 集中反映 2026.9.5/9.6 版本的崩溃、资源泄漏和更新失败问题，用户迫切要求回归稳定。
- **平台兼容性**：Windows、macOS 和 Linux 平台均有专项 Bug 报告，凸显跨平台测试不足。
- **性能优化**：CPU 占用、内存泄漏和 GC 暂停问题频繁出现，社区期待底层优化。
- **生态扩展**：Databricks、Mistral GLM 等新集成受到欢迎，显示用户希望扩大模型和工具支持。

---

## 5. Bug 与稳定性

### P0 级 Bug（Release Blocker）

| Issue 编号 | 标题 | 严重程度 | 关联 PR | 链接 |
|------------|------|----------|---------|------|
| #157325 | A stuck agent-DB resource makes every agent's replies fail | **崩溃循环** | 无 | [链接](https://github.com/openclaw/openclaw/issues/157325) |
| #157160 | Gateway crash-loops on plugin-doctor-post-session-state | **崩溃循环** | 无 | [链接](https://github.com/openclaw/openclaw/issues/157160) |
| #156571 | 2026.9.5 model-catalog worker leaks openclaw-plugin-build-* source captures | **磁盘填满** | #155753 | [链接](https://github.com/openclaw/openclaw/issues/156571) |
| #157568 | 2026.9.6 WSL Gateway regrows 7.5 GB of live plugin captures in 4 minutes | **资源泄漏** | #155753 | [链接](https://github.com/openclaw/openclaw/issues/157568) |
| #157227 | git-to-stable 2026.9.6 update migrates config, fails service revalidation | **更新失败** | 无 | [链接](https://github.com/openclaw/openclaw/issues/157227) |
| #158231 | Update failure: managed-service-preflight (2026.9.5) | **更新失败** | 无 | [链接](https://github.com/openclaw/openclaw/issues/158231) |
| #154679 | Interrupted 2026.6.5→2026.9.5 update: rewritten canonical sessions.json treated as changed retained migration source | **更新失败** | 无 | [链接](https://github.com/openclaw/openclaw/issues/154679) |
| #157319 | Update to 2026.9.6 failed verification: state-migrated-no-rollback + codex plugin stale app-server records block catalog refresh | **更新失败** | 无 | [链接](https://github.com/openclaw/openclaw/issues/157319) |

### P1 级 Bug（高优先级）

| Issue 编号 | 标题 | 关联 PR | 链接 |
|------------|------|---------|------|
| #139847 | message sent while a reply run is active is dropped | 无 | [链接](https://github.com/openclaw/openclaw/issues/139847) |
| #137332 | mixed terminal requester-settle batches retry forever after ownership check | #159157 | [链接](https://github.com/openclaw/openclaw/issues/137332) |
| #157067 | Windows isolated cron setup passes an uncloneable environment Proxy | 无 | [链接](https://github.com/openclaw/openclaw/issues/157067) |
| #157986 | Automations: every agentTurn job fails with DataCloneError | 无 | [链接](https://github.com/openclaw/openclaw/issues/157986) |
| #112698 | Codex app-server notification path starves Gateway main thread ~22s | 无 | [链接](https://github.com/openclaw/openclaw/issues/112698) |
| #109478 | Literal \n injected into multi-line tool-call string arguments | 无 | [链接](https://github.com/openclaw/openclaw/issues/109478) |
| #105528 | exec/read tools silently return empty output on Windows | 无 | [链接](https://github.com/openclaw/openclaw/issues/105528) |

### 已有关联 Fix PR 的 Bug

| Issue 编号 | 标题 | Fix PR | PR 链接 |
|------------|------|--------|---------|
| #155753 | Model-catalog expiry/rebuild loop pins one CPU core | #156571（部分缓解） | [PR 链接](https://github.com/openclaw/openclaw/pull/156571) |
| #137332 | mixed terminal requester-settle batches retry forever | #159157 | [PR 链接](https://github.com/openclaw/openclaw/pull/159157) |
| #148730 | Discord deferred ingress blocks newer messages | #159265 | [PR 链接](https://github.com/openclaw/openclaw/pull/159265) |
| #149502 | OAuth re-login breaks session account selection | #149591 | [PR 链接](https://github.com/openclaw/openclaw/pull/149591) |
| #153543 | Cross-channel heartbeat delivery and failure mislabeling | #153573 | [PR 链接](https://github.com/openclaw/openclaw/pull/153573) |

**稳定性评估：**  
项目面临严峻的稳定性挑战，尤其是 2026.9.5/9.6 版本引入的多个 P0 级问题。插件捕获泄漏、更新失败和崩溃循环是主要痛点，虽有部分修复 PR 正在审查，但尚未合并。建议维护团队优先处理这些 Release Blocker，并加强版本发布前的回归测试。

---

## 6. 功能请求与路线图信号

### 高潜力功能请求

| Issue 编号 | 标题 | 作者 | 相关 PR | 链接 | 路线图信号 |
|------------|------|------|---------|------|------------|
| #155633 | Add Databricks Unity Gateway as an official model provider | @zozo123 | #155634 | [链接](https://github.com/openclaw/openclaw/issues/155633) | **高**：PR 已提交，符合企业集成趋势，预计下一版本纳入 |
| #156632 | Bounded launch contract for Swarm agents.run | @zozo123 | #155442 | [链接](https://github.com/openclaw/openclaw/issues/156632) | **高**：控制代理资源使用，PR 已就绪，可能快速合并 |
| #158703 | Enable Ultrafast for Codex models | @sjf-oa | 无 | [链接](https://github.com/openclaw/openclaw/pull/158703) | **中**：性能优化需求，PR 已提交，视测试情况决定 |
| #150380 | Add Mistral-hosted Z.ai GLM 5.2 and 5.3 to provider catalog | @MertBasar0 | 无 | [链接](https://github.com/openclaw/openclaw/pull/150380) | **中**：扩展模型支持，PR 已提交，无阻塞 |
| #79223 | Configurable Dream Diary language / prompt | @mtuwei | 无 | [链接](https://github.com/openclaw/openclaw/issues/79223) | **低**：本地化需求，无 PR，可能纳入后续迭代 |
| #71300 | Configurable memory promotion target file | @oc-mostlycopy | 无 | [链接](https://github.com/openclaw/openclaw/issues/71300) | **低**：内存管理优化，无 PR，需求分散 |
| #28300 | Theme Customization System — Preset Themes + Custom Theme Studio | @xingzihai | 无 | [链接](https://github.com/openclaw/openclaw/issues/28300) | **低**：UI 增强，无 PR，优先级较低 |

**路线图分析：**  
- **短期（1-2 周）**：Databricks Unity Gateway、Swarm 有界启动、Discord 修复、OAuth 会话恢复等 PR 有望合并。
- **中期（1 个月）**：Codex Ultrafast 模式、GLM 模型支持、内存重构等可能纳入。
- **长期**：主题定制、可配置记忆目标等需求需更多社区贡献。

---

## 7. 用户反馈摘要

### 真实用户痛点

1. **更新机制不可靠**  
   - 多位用户报告 `openclaw update` 在“global install swap”或“managed-service-preflight”阶段失败（#156112、#158231、#154924、#157227、#157319）。
   - 痛点：升级后 Gateway 无法启动或进入崩溃循环，恢复困难。

2. **资源泄漏导致系统瘫痪**  
   - 插件源捕获无限增长，每分钟产生 1-3 GB 临时文件（#156571、#157568）。
   - 模型目录重建循环占用单核 CPU（#155753）。
   - 痛点：生产环境磁盘爆满、CPU 饥饿，影响服务稳定性。

3. **跨平台兼容性问题**  
   - Windows 平台：exec/read 工具返回空输出（#105528）、cron 设置失败（#157067）、自动化任务 DataCloneError（#157986）。
   - macOS：Gateway 资源压力导致系统响应缓慢（#156674）。
   - Linux/WSL：Gateway 空闲时 CPU 占用 50%、磁盘写入 52 MB/min（#154104）。
   - 痛点：不同平台表现不一致，测试覆盖不足。

4. **消息丢失与状态混乱**  
   - 多车道负载下 Feishu 频道回复丢失（#157389）。
   - 代理间 `sessions_send` 导致重复消息（#39476）。
   - 子代理直接结果镜像后请求者唤醒失败（#137332、#159157）。
   - 痛点：多代理协作场景下数据一致性难以保证。

5. **用户体验摩擦**  
   - Control UI 中“More”菜单可见性差（#110379）。
   - Discord 频道中延迟消息阻塞新消息（#148730）。
   - 服务环境变量生成器错误添加双引号，破坏 hostname（#103804）。
   - 痛点：界面设计和边界情况处理有待改进。

### 用户满意点

- **Databricks Unity Gateway 集成**：企业用户欢迎新的官方提供者支持（#155633）。
- **Mistral GLM 模型扩展**：增加 Z.ai GLM 5.2/5.3 支持，满足多样化需求（#150380）。
- **Swarm 有界启动**：用户赞赏对资源使用的可控性改进（#156632）。
- **CI 性能优化**：推迟慢速集成测试显著提升开发效率（#158267）。

---

## 8. 待处理积压

### 长期未响应的重要 Issue

| Issue 编号 | 标题 | 创建日期 | 最后更新 | 评论数 | 状态 | 链接 | 风险等级 |
|------------|------|----------|----------|--------|------|------|----------|
| #39476 | A2A sessions_send: target agent can call sessions_send back, causing duplicate messages | 2026-03-08 | 2026-09-26 | 13 | OPEN | [链接](https://github.com/openclaw/openclaw/issues/39476) | **高**：A2A 协议设计缺陷，影响多代理部署 |
| #104719 | memory-wiki supplement exhaustive fallback ignores tool deadline | 2026-07-11 | 2026-09-26 | 11 | OPEN | [链接](https://github.com/openclaw/openclaw/issues/104719) | **中**：记忆系统超时行为异常 |
| #121187 | yielded requester completion retries intentional NO_REPLY instead of settling quietly | 2026-08-09 | 2026-09-26 | 10 | OPEN | [链接](https://github.com/openclaw/openclaw/issues/121187) | **中**：会话状态处理逻辑错误 |
| #108379 | Duplicate assistant generation attempts for Xiaomi MiMo cause repeated narrative text | 2026-07-15 | 2026-09-26 | 9 | OPEN | [链接](https://github.com/openclaw/openclaw/issues/108379) | **低**：特定提供商问题，影响范围有限 |
| #109478 | Literal \n injected into multi-line tool-call string arguments | 2026-07-17 | 2026-09-26 | 8 | OPEN | [链接](https://github.com/openclaw/openclaw/issues/109478) | **中**：数据完整性风险，跨模型复现 |
| #106704 | sessions_yield on a subagent's first turn silently finalizes the run | 2026-07-13 | 2026-09-26 | 8 | OPEN | [链接](https://github.com/openclaw/openclaw/issues/106704) | **高**：代理生命周期管理缺陷 |
| #99910 | Memory dreaming run pegs the gateway event loop for ~10 min | 2026-07-04 | 2026-09-26 | 7 | OPEN | [链接](https://github.com/openclaw/openclaw/issues/99910) | **高**：记忆系统阻塞主线程，影响可用性 |
| #77249 | Reconnect supervisor hangs on zombie WSS | 2026-05-04 | 2026-09-26 | 6 | OPEN | [链接](https://github.com/openclaw/openclaw/issues/77249) | **中**：WebSocket 重连逻辑缺陷 |
| #76247 | Provide native dispatch landing ACK / receiver-entry telemetry | 2026-05-02 | 2026-09-26 | 6 | OPEN | [链接](https://github.com/openclaw/openclaw/issues/76247) | **低**：可观测性增强需求 |
| #101445 | Embedded Ollama agent reports payloads=0 tools=0 for certain prompts | 2026-07-07 | 2026-09-26 | 6 | OPEN | [链接](https://github.com/openclaw/openclaw/issues/101445) | **中**：Ollama 集成边界情况 |
| #99947 | codex harness mirrored-session-history read fails for ephemeral sessions | 2026-07-04 | 2026-09-26 | 6 | OPEN | [链接](https://github.com/openclaw/openclaw/issues/99947) | **高**：Codex 插件关键路径失败 |

### 待处理 PR

| PR 编号 | 标题 | 作者 | 状态 | 链接 | 风险等级 |
|---------|------|------|------|------|----------|
| #159157 | fix: requester wake fails when a child's direct result is mirrored before its reply | @DonnieFi | ⏳ waiting on author | [链接](https://github.com/openclaw/openclaw/pull/159157) | **高**：闭合约 #137332，修复会话状态 bug |
| #158000 | fix(models): apply downloaded catalogs without a Gateway restart | @obviyus | ⏳ waiting on author | [链接](https://github.com/openclaw/openclaw/pull/158000) | **中**：提升模型目录管理体验 |
| #158703 | feat(codex): enable Ultrafast for supported models | @sjf-oa | ⏳ waiting on author | [链接](https://github.com/openclaw/openclaw/pull/158703) | **低**：新功能启用，需测试验证 |
| #155442 | feat(swarm): add bounded candidate verification launches | @zozo123 | ⏳ waiting on author | [链接](https://github.com/openclaw/openclaw/pull/155442) | **中**：资源控制功能，需安全审查 |
| #159246 | Support isolated sessions in the AgentsAPI and enable restricted dreaming sessions | @sjf-oa | 📣 needs proof | [链接](https://github.com/openclaw/openclaw/pull/159246) | **低**：实验性功能，需 QA 验证 |
| #159084 | refactor(acp): keep ordinary metadata work off the Gateway thread | @steipete | ⏳ waiting on author | [链接](https://github.com/openclaw/openclaw/pull/159084) | **中**：性能优化，需回归测试 |
| #159263 | feat(ui): prototype grouped collaborator typing | @roboclaw-bot | 👀 ready for maintainer look | [链接](https://github.com/openclaw/openclaw/pull/159263) | **低**：UI 原型，非紧急 |

**维护者行动建议：**  
1. **优先合并 P0 修复 PR**：如 #159157（会话状态）、#153573（心跳交叉频道）。
2. **推动资源泄漏 Issue 跟进**：#155753、#156571、#157568 需明确修复时间表。
3. **加强跨平台测试**：针对 Windows、macOS、Linux 的专项 Bug 需集成测试覆盖。
4. **定期审查长期积压 Issue**：如 #39476（A2A 重复消息）、#99910（记忆系统阻塞）需产品决策。

---

**报告生成时间：** 2026-09-27  
**分析师：** Agnes-2.5-Flash (Sapiens AI)  
**数据截止时间：** 2026-09-27 23:59 UTC

---

## 横向生态对比

## 开源 AI 智能体生态横向对比分析报告
**日期：2026-09-27**
**分析师：Agnes-2.5-Flash (Sapiens AI)**

### 1. 生态全景
当前个人 AI 助手与自主智能体开源生态呈现“核心层高烈度演进，边缘层垂直深耕”的分化态势。OpenClaw 与 hermes-agent 作为通用型智能体框架，正经历从功能扩张向底层稳定性与工程化（插件系统、进程管理）的关键转型期，社区活跃度极高但伴随严重的版本回归阵痛。AstrBot 与 DeepSeek Harness 则分别聚焦于多模态接入层的稳定性优化与底层推理引擎的架构适配，显示出生态正在从“Demo 可用”向“生产级可靠”过渡。PicoClaw 等垂直项目则专注于特定平台（如 QQ 频道）的兼容性维护。

### 2. 各项目活跃度对比

| 项目 | Issue 更新/24h | PR 更新/24h | 版本发布 | 健康度评估 | 核心状态 |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **OpenClaw** | 500+ | 500+ | 无 | 🟡 警告 | 高活跃但稳定性承压，P0 级 Bug 集中爆发，处于修复回归期 |
| **hermes-agent** | 500+ | 500+ | 无 | 🟡 警告 | 快速迭代中，跨平台兼容性（Win/Mac）问题突出，插件生态扩展迅速 |
| **DeepSeek Harness** | N/A (Discussions 177) | N/A | 无 | 🟢 良好 | 社区贡献活跃，主要关注点为 API 兼容性与模型底层稳定性 |
| **Zeroclaw** | 50 | 50 | 无 | 🟢 良好 | 开发节奏紧凑，聚焦安全加固（ApprovalManager）与 RPC 重构 |
| **AstrBot** | 7 | 16 | 无 | 🟢 良好 | 响应迅速，聚焦 Telegram/WebChat 接入层细节优化与 Bug 修复 |
| **QwenPaw** | 3 | 3 | 无 | 🟡 中等 | 低活跃，PR 合并缓慢，存在长期功能缺口（定时任务脚本执行） |
| **PicoClaw** | 1 | 3 | 无 | 🟡 中等 | 常规迭代，依赖单一平台（QQ），接口同步存在滞后风险 |

### 3. OpenClaw 在生态中的定位

*   **优势**：OpenClaw 拥有目前最庞大的社区规模和最高的代码吞吐量（500+ PR/Issue），是生态中的“主战场”。其插件系统（ACPX、Memory Wiki）和多通道集成（Discord、Databricks、Mistral）最为成熟，企业级兼容性探索（Unity Gateway）领先。
*   **技术路线差异**：不同于 AstrBot 的 bot 框架定位和 DeepSeek Harness 的推理引擎定位，OpenClaw 定位为一站式**自主智能体操作系统**，强调本地优先、多代理协作（Swarm）及复杂的会话状态管理。
*   **社区规模对比**：OpenClaw 的 Issue/PR 数量约为 Zeroclaw 的 10 倍、AstrBot 的 70 倍，显示出其作为头部项目的绝对流量集中效应，但也导致了维护者资源稀释和反馈延迟。

### 4. 共同关注的技术方向

1.  **跨平台稳定性与进程管理**
    *   **涉及项目**：OpenClaw、hermes-agent、Zeroclaw
    *   **具体诉求**：Windows 下的网关崩溃（OpenClaw #157160, hermes #122183）、macOS 睡眠唤醒 PID 漂移（hermes #118326）、以及跨渠道心跳泄漏（OpenClaw #153543）。这是当前所有通用智能体框架面临的共性工程挑战。
2.  **安全性与权限控制（Security & Permissions）**
    *   **涉及项目**：Zeroclaw、hermes-agent
    *   **具体诉求**：Zeroclaw 强化 `ApprovalManager` 以防止无头代理的安全盲区（#10968）；hermes-agent 通过插件钩子（`command_guard`）增强细粒度控制。用户普遍担忧未授权工具调用的风险。
3.  **模型集成多样性与成本控制**
    *   **涉及项目**：OpenClaw、DeepSeek Harness、AstrBot
    *   **具体诉求**：OpenClaw 新增 Databricks 和 GLM 支持；DeepSeek 关注 v4.1 模型的上下文退化问题；AstrBot 优化 Token 计数精度。各方都在寻求更优的性价比和更稳定的模型路由。
4.  **长会话与记忆管理**
    *   **涉及项目**：OpenClaw、Zeroclaw、hermes-agent
    *   **具体诉求**：解决上下文窗口溢出导致的性能下降（OpenClaw CPU 占用、Zeroclaw 上下文压缩回退）。用户希望实现更智能的记忆保留与检索机制。

### 5. 差异化定位分析

| 维度 | OpenClaw | hermes-agent | AstrBot | DeepSeek Harness | Zeroclaw |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **核心定位** | 通用自主智能体 OS | 高性能桌面/命令行 Agent | 多平台消息 Bot 框架 | 本地推理引擎/网关 | 安全优先的微智能体框架 |
| **目标用户** | 开发者、企业集成商 | 技术专家、自动化爱好者 | 普通用户、社群运营者 | 模型研究者、开发者 | 安全敏感型企业、极客 |
| **技术架构** | 模块化插件 + Swarm 协作 | 桌面原生 + 强进程管理 | 插件化 Bot 协议适配 | 端到端推理优化 | 极简架构 + 严格沙箱 |
| **关键差异化** | 生态最全，插件市场丰富 | 桌面体验优化，原生感强 | 接入渠道最广（微信/飞书等） | 深度绑定 DeepSeek 模型栈 | 最小化攻击面，审计友好 |

### 6. 社区热度与成熟度

*   **快速迭代阶段（高热度、高变动）**：
    *   **OpenClaw & hermes-agent**：这两个项目处于剧烈的功能膨胀期，同时也伴随着严重的技术债务积累。高 Issue 数反映了功能的复杂度和用户预期的落差，维护者正试图通过密集发布来平衡稳定性。
*   **质量巩固阶段（中热度、重修复）**：
    *   **AstrBot & DeepSeek Harness**：新增功能减少，重点转向 Bug 修复、API 兼容性和用户体验打磨。社区反馈更多集中在“如何让它更稳定”而非“增加什么新功能”。
*   **垂直深耕阶段（低热度、特定场景）**：
    *   **PicoClaw & QwenPaw**：受众相对垂直，开发节奏平稳但缓慢。主要风险在于维护资源不足导致的长期积压 Issue（如 QwenPaw 的定时任务缺口）。

### 7. 值得关注的趋势信号

1.  **从“单点智能”向“多代理协作”演进**：OpenClaw 的 Swarm 功能和 hermes-agent 的插件钩子设计，表明行业正致力于解决单 Agent 能力瓶颈，通过多代理分工和约束来提升复杂任务处理能力。
2.  **生产级稳定性成为新竞争壁垒**：随着用户从尝鲜转向生产部署，崩溃循环、内存泄漏和跨平台兼容性问题成为阻碍 Adoption 的主要因素。未来胜出者将是那些能率先解决工程化痛点（如 OpenClaw 当前的 P0 问题）的项目。
3.  **安全性内生化（Security by Design）**：Zeroclaw 和 hermes-agent 对权限控制的强化，反映了社区对 AI 自主操作风险的日益警惕。未来的智能体框架必须内置可审计、可限制的权限模型。
4.  **模型无关性与生态开放**：尽管 DeepSeek Harness 深度绑定自家模型，但 OpenClaw 和 AstrBot 积极接入多家模型提供商（Mistral, GLM, Codex），显示出“框架与模型解耦”是通用智能体平台的主流方向，以避免厂商锁定。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**日期：** 2026-09-27  
**来源：** github.com/zeroclaw-labs/zeroclaw

## 1. 今日速览
Zeroclaw 在过去24小时内保持高度活跃，共产生 50 条 Issue 更新和 50 条 PR 更新，显示出密集的开发与反馈循环。社区焦点主要集中在 **WhatsApp Web 通道的多项 Bug 修复**、**运行时安全策略（ApprovalManager）的强化** 以及 **RPC 架构的重构推进**。无新版本发布，但多个高优先级安全补丁和功能特性 PR 正在审查或合并中，项目整体健康度良好，技术债务清理与工作流优化并重。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日主要进展集中在安全加固、工具语义修复及 RPC 基础设施构建：

*   **安全与环境隔离：** [#11133](https://github.com/zeroclaw-labs/zeroclaw/pull/11133) 已合并，修复了会话复用场景中转发环境的重新验证问题，防止权限越界；[#9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746) 推进了 session 工具和 discord_search 的 per-agent 所有权作用域，增强多租户安全性。
*   **工具语义恢复：** [#11189](https://github.com/zeroclaw-labs/zeroclaw/pull/11189) (已关闭) 和 [#11188](https://github.com/zeroclaw-labs/zeroclaw/pull/11188) 修复了浏览器 (`browser_open`, `browser`) 和搜索 (`web_search`) 工具被错误映射到 shell 的问题，恢复了核心 AI 能力的独立语义。
*   **委托子代理修复：** [#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391) 解决了 bounded delegate 文件系统中目标工作区尊重问题，提升了多代理协作的稳定性。
*   **RPC 架构扩展：** [#11172](https://github.com/zeroclaw-labs/zeroclaw/pull/11172)、[#11167](https://github.com/zeroclaw-labs/zeroclaw/pull/11167)、[#11171](https://github.com/zeroclaw-labs/zeroclaw/pull/11171) 等 PR 持续推进 RPC 与 HTTP 配置路由的对齐，包括订阅系统、分块上传及本地传输限制的处理，为 v0.9.0 Gateway 拆分奠定基础。
*   **新工具集成：** [#11076](https://github.com/zeroclaw-labs/zeroclaw/pull/11076) 添加了 `agy_cli` 工具以支持 Antigravity CLI，适应了 Google Gemini CLI 的生态变化。

## 4. 社区热点
以下 Issue 讨论最为激烈，反映了用户对产品形态和稳定性的核心关切：

*   **[Tracker]: Maintainer decision queue for RFCs and design issues (#8692)**
    *   *链接:* https://github.com/zeroclaw-labs/zeroclaw/issues/8692
    *   *分析:* 建立维护者决策队列，旨在规范化 RFC 和设计问题的处理流程，显示社区对治理结构透明化的需求。
*   **WhatsApp Web: implement create_room and invite_user (#10977)**
    *   *链接:* https://github.com/zeroclaw-labs/zeroclaw/issues/10977
    *   *分析:* 用户强烈期待 WhatsApp 群组管理功能的完善，这是提升消息通道实用性的关键缺口。
*   **Restore proactive token-budget context compaction (#10780)**
    *   *链接:* https://github.com/zeroclaw-labs/zeroclaw/issues/10780
    *   *分析:* 上下文管理策略的回退引发了关于成本与性能平衡的深度讨论，用户希望恢复基于 token 预算的主动压缩机制。
*   **RFC: Knowledge graph as a first-class agent memory layer (#11053)**
    *   *链接:* https://github.com/zeroclaw-labs/zeroclaw/issues/11053
    *   *分析:* 提出将知识图谱提升为一级记忆层，标志着项目从“工具化记忆”向“原生记忆架构”演进的技术路线探讨。
*   **fix(tools): per-agent ownership scoping for session tools and discord_search (#9746)**
    *   *链接:* https://github.com/zeroclaw-labs/zeroclaw/pull/9746
    *   *分析:* 高度关注的安全特性 PR，涉及多用户环境下的数据隔离，评论虽未显示具体数量但涉及面广，属于高风险高关注度的改动。

## 5. Bug 与稳定性
今日报告及跟进的关键 Bug，按严重程度排列：

1.  **[Bug]: The daemon never registers the channel-map factory... (#11055)**
    *   *严重性:* High | *状态:* Open
    *   *描述:* Daemon 部署下 webhook/cron/SOP 回合因缺少 channel 映射工厂而无法使用 channel-addressed tools。
    *   *链接:* https://github.com/zeroclaw-labs/zeroclaw/issues/11055
2.  **[Bug]: Unattended agent turns run with no ApprovalManager... (#10968)**
    *   *严重性:* High (S0 - Security Risk) | *状态:* Open
    *   *描述:* Cron、heartbeat 等非交互回合缺乏 ApprovalManager，导致风险配置文件中的工具审批静默失效，存在安全漏洞。
    *   *链接:* https://github.com/zeroclaw-labs/zeroclaw/issues/10968
3.  **[Bug]: config flush can overwrite concurrent writes (#9284)**
    *   *严重性:* High | *状态:* Open
    *   *描述:* 运行时配置刷新存在竞态条件，可能覆盖并发写入的配置数据。
    *   *链接:* https://github.com/zeroclaw-labs/zeroclaw/issues/9284
4.  **[Bug]: Git --attr-source can hide a mutating subcommand... (#10966)**
    *   *严重性:* High (S0 - Security Risk) | *状态:* Closed (已修复)
    *   *描述:* Git 全局选项扫描器未能正确消费 `--attr-source`，可能隐藏实际的写操作命令，绕过审批分类。
    *   *链接:* https://github.com/zeroclaw-labs/zeroclaw/issues/10966
5.  **[Bug]: WhatsApp Web ignores suppress_voice / force_voice (#10922, #11059)**
    *   *严重性:* Medium (S2 - Degraded Behavior) | *状态:* Closed/Open
    *   *描述:* WhatsApp Web 通道忽略语音发送控制参数，导致 TTS 和语音路由行为不符合预期。
    *   *链接:* https://github.com/zeroclaw-labs/zeroclaw/issues/10922, https://github.com/zeroclaw-labs/zeroclaw/issues/11059
6.  **[Bug]: multimodal image cap eviction rewrites earlier history... (#10778)**
    *   *严重性:* High | *状态:* Open
    *   *描述:* Anthropic 提供商的多模态图片容量淘汰机制会重写较早的历史消息，导致缓存前缀失效。
    *   *链接:* https://github.com/zeroclaw-labs/zeroclaw/issues/10778

## 6. 功能请求与路线图信号
*   **Cheaper Inference Provider 集成 (#11103):** 新增对 Cheaper Inference 的官方支持，反映用户对低成本推理网关的需求。
*   **search_routes RFC (#11074):** 提议为 `web_search_tool` 添加基于提示的提供商路由，允许按查询类型分流到不同搜索引擎，提升搜索策略灵活性。
*   **MiniMax TTS/STT 支持 (#10933):** 增加 MiniMax 语音合成与识别的完整支持，扩展多语言语音交互能力。
*   **Transcription Provider Cascade (#10900):** 提议建立语音转录提供商的有序回退链，增强语音输入在主力服务故障时的鲁棒性。
*   **Steer in-flight turn on mid-generation message (#10893):** 允许在中途生成时接收新消息并引导当前回合，改善多轮对话的即时响应体验。

## 7. 用户反馈摘要
*   **WhatsApp 体验痛点:** 用户多次反馈 WhatsApp Web 通道的 mentions（@提及）解析错误、语音功能失效及文档预览缺失，表明该通道虽活跃但成熟度不足。
*   **安全与权限焦虑:** 用户对无头代理（cron/heartbeat）缺乏审批机制表示担忧，认为这是严重的安全盲点。
*   **工具别名混乱:** 浏览器和搜索工具被错误映射为 shell 命令的问题影响了依赖 GLM 等传统输入格式的用户的正常工作流。
*   **调度冲突:** 多个代理在同一调度时间点触发导致资源争抢，用户建议引入 jitter window 以分散负载。
*   **Windows 部署体验:** Windows 计划任务登录后开启控制台窗口的问题被标记为困扰，影响无头部署的美观性。

## 8. 待处理积压
*   **#8692 [Tracker]: Maintainer decision queue** - 长期开放的设计治理 Issue，需要维护者明确处理流程。
*   **#9284 config flush 竞态条件** - 高优先级的运行时 Bug，可能影响配置一致性，需尽快安排修复。
*   **#10968 Unattended agent turns security risk** - 高严重性安全 Issue，涉及非交互场景下的权限控制缺失，应优先处理。
*   **#11055 Channel-map factory 未注册** - 阻塞了 Daemon 模式下部分工具的使用，影响生产环境部署。
*   **#10793 Windows-only test failures** - CI 上的间歇性测试失败，可能掩盖真实问题，需要排查根因。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期**：2026-09-27  
**数据来源**：GitHub (github.com/sipeed/picoclaw)

## 1. 今日速览
PicoClaw 昨日社区活跃度中等，共发生 4 次关键代码变动（3 PRs）和 1 次用户反馈（Issue #3394）。项目处于常规迭代状态，无新版本发布。重点关注 QQ 频道接入层的兼容性修复与 Web UI 性能优化。

## 2. 版本发布
- **无新版本发布**。

## 3. 项目进展
昨日有 2 个 PR 被合并/关闭，2 个仍为开放状态：
- **[CLOSED] #1349** ([feat(qq): support parsing and replying to more attachment types](https://github.com/sipeed/picoclaw/pull/1349))：由 @aishannon 提交，最终合并。该 PR 增强了 QQ Channel 的多媒体处理能力，支持解析和回复语音、图片、视频及文件，并优先使用 Markdown 格式回复。这是 QQ 频道集成的重要功能补全。
- **[CLOSED] #3310** ([Feat/auto pr](https://github.com/sipeed/picoclaw/pull/3310))：由 @j-v 提交，已关闭。摘要显示为自动化工具生成，可能为测试或非预期合并，具体意图待查。
- **[OPEN] #3347** ([fix laggy interface](https://github.com/sipeed/picoclaw/pull/3347))：由 @iMilnb 提交，标记为 stale。此 PR 旨在修复 Web UI 在聊天区域文本过多时的卡顿问题，已在桌面和移动端浏览器测试通过。目前仍待合并，是提升用户体验的关键优化。

## 4. 社区热点
- **Issue #3394** ([[BUG] QQ机器人的接口更新了，但QQ聊天通道的接口似乎没有更新](https://github.com/sipeed/picoclaw/issues/3394))：用户 @qinglt 报告 QQ 机器人接口更新后，QQ 聊天通道接口未同步更新，导致潜在兼容性问题。该 Issue 评论数为 0，暂无开发者回应，反映出用户对 QQ 生态接口稳定性的关切。
- **PR #3347** 持续获得关注（stale 标记），表明社区对 Web UI 性能优化有持续需求。

## 5. Bug 与稳定性
- **高优先级 Bug #3394**：QQ 聊天通道接口未随机器人接口更新，可能导致消息解析或发送失败。当前无修复 PR，需维护者尽快评估并处理。
- 无其他已知崩溃或回归问题报告。

## 6. 功能请求与路线图信号
- **QQ 频道多媒体支持**：通过 PR #1349 的合并，项目已增强 QQ Channel 的附件处理能力，路线图信号显示将继续完善即时通讯通道的兼容性。
- **Web UI 性能优化**：PR #3347 的 stale 状态暗示维护者可能尚未审查，但该需求来自真实用户反馈，建议纳入后续优化队列。

## 7. 用户反馈摘要
- **痛点**：用户 @qinglt 明确指出 QQ 接口不同步更新的问题，反映多通道集成中 API 变更管理的脆弱性。
- **满意点**：PR #1349 的合并在一定程度上解决了 QQ 频道附件解析的痛点，但新问题暴露了同步机制不足。
- **使用场景**：用户主要在 QQ 机器人和聊天通道混合环境中运行 PicoClaw，对稳定性和实时性要求较高。

## 8. 待处理积压
- **PR #3347** ([fix laggy interface](https://github.com/sipeed/picoclaw/pull/3347))：已 stale，可能因长时间未审查而被标记，建议重新激活以解决 Web UI 卡顿问题。
- **Issue #3394**：无响应，需维护者关注 QQ 接口同步问题，避免影响大量 QQ 频道用户。

---
**项目健康度评估**：中等。功能迭代正常，但 bug 响应和社区互动有待加强，尤其是接口兼容性问题和性能优化 PR 的处理效率。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：2026-09-27** | 数据周期：过去24小时

---

## 1. 今日速览

QwenPaw 今日活跃度中等偏低，共新增3条 Issue 和3条 PR，无新版本发布。社区聚焦于**定时任务执行能力不足**、**Dashboard 数据一致性 Bug**以及**国际化/富文本渲染缺陷**三类问题。PR #7993 和 #7992 修复了控制台体验中的具体 bug，PR #7956 推进了设置页统一化改进，但三条 PR 均未合并，项目整体向前推进有限。Issue #4963 是长期未解决的功能缺口，反映了用户对脚本直执行能力的迫切需求。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

### 已合并/关闭的 PR：0 条

今日3条 PR 均处于待合并状态：

- **PR #7993** — 修复 i18n 缺失错误文案，解决 `common.operationFailed` 等 key 无翻译文件支撑导致渲染原始 key 的问题，覆盖6处 `MailAccessControlDrawer.tsx` 和1处 `Inbox/index.tsx` 的调用点。
- **PR #7992** — 修复企业微信频道中普通文本含 `|` 被误识别为 Markdown 表格的渲染 bug。
- **PR #7956** — 统一 Console 设置页 UX，修复 workspace-picker 溢出和切换对话时的欢迎屏闪烁问题。

**评估**：今日无 PR 被合并，项目代码库暂无实质性更新。三条待合并 PR 均为修复/改进性质，风险较低，但合并进度偏慢。

---

## 4. 社区热点

| Issue/PR | 类型 | 作者 | 评论 | 热度分析 |
|---|---|---|---|---|
| [Issue #4963](https://github.com/agentscope-ai/QwenPaw/issues/4963) | 功能增强 | @feng183043996 | 4 | ⭐ 高 — 长期未解决的定时任务能力缺口 |
| [Issue #7991](https://github.com/agentscope-ai/QwenPaw/issues/7991) | Bug | @yylxdzz | 1 | 中 — 今日新报，数据不一致问题 |
| [PR #7993](https://github.com/agentscope-ai/QwenPaw/pull/7993) | 修复 | @Bruce-Yii | — | 中 — i18n 修复，影响多模块 |
| [PR #7992](https://github.com/agentscope-ai/QwenPaw/pull/7992) | 修复 | @Bruce-Yii | — | 低 — 特定频道渲染问题 |
| [PR #7956](https://github.com/agentscope-ai/QwenPaw/pull/7956) | 功能 | @rayrayraykk | — | 中 — UX 统一化改进 |

**分析**：Issue #4963 是当前社区讨论最活跃的问题（4条评论），用户核心诉求是**绕过 AI Agent 直接执行脚本/Shell 命令**，当前 cron 仅支持 `text` 和 `agent` 两种类型，缺乏原生脚本执行能力，限制了自动化场景。

---

## 5. Bug 与稳定性

| 优先级 | Issue/PR | 描述 | Fix PR |
|---|---|---|---|
| 🔴 高 | [Issue #7991](https://github.com/agentscope-ai/QwenPaw/issues/7991) | TaskTracker _runs 僵尸条目导致 `running_task_count` 膨胀，Dashboard 显示2个运行任务，但 `/api/chats` 仅返回1个 | 尚无 |
| 🟡 中 | [PR #7992](https://github.com/agentscope-ai/QwenPaw/pull/7992) | 企业微信频道中普通文本含 `|` 被误渲染为 Markdown 表格 | #7992 已提交 |
| 🟡 中 | [PR #7993](https://github.com/agentscope-ai/QwenPaw/pull/7993) | i18n 缺失文案导致控制台渲染原始 key | #7993 已提交 |

**评估**：Issue #7991 是今日最关键的稳定性问题，涉及计数器逻辑的数据不一致，可能影响用户对任务状态的判断。目前尚无对应 Fix PR，建议优先处理。

---

## 6. 功能请求与路线图信号

| 需求 | Issue/PR | 信号强度 |
|---|---|---|
| 定时任务支持直接脚本/Shell执行 | [Issue #4963](https://github.com/agentscope-ai/QwenPaw/issues/4963) | ⭐⭐⭐ 高 |
| Console 设置页 UX 统一化 | [PR #7956](https://github.com/agentscope-ai/QwenPaw/pull/7956) | ⭐⭐ 中 |

**分析**：
- **Issue #4963** 是当前最明确的功能缺口，用户需要绕过 AI Agent 直接执行命令的能力（如备份、清理、API调用等），这属于 cron 任务类型的扩展需求，若实现将显著提升 QwenPaw 的自动化场景覆盖。
- **PR #7956** 推进了 Console 设置页的统一化，符合项目已定义的 `design.md` 设计规范，有望纳入下一版本。

---

## 7. 用户反馈摘要

| 来源 | 用户痛点/场景 | 情绪 |
|---|---|---|
| Issue #4963 | 现有 cron 仅支持 `text` 和 `agent` 两种类型，无法直接执行脚本/Shell 命令，限制了大量自动化场景 | 😤 不满 |
| Issue #7991 | Dashboard 显示任务数与实际 API 返回不一致，影响运维判断 | 😠 困惑 |
| PR #7993 | i18n 缺失导致控制台渲染原始 key，影响多语言用户体验 | 😐 轻微 |
| PR #7992 | 企业微信中普通文本含 `|` 被误渲染为表格，信息展示错乱 | 😤 不满 |

---

## 8. 待处理积压

| 类型 | Issue/PR | 创建时间 | 未响应时长 | 建议优先级 |
|---|---|---|---|---|
| 📌 功能 | [Issue #4963](https://github.com/agentscope-ai/QwenPaw/issues/4963) | 2026-06-04 | ~4个月 | 🔴 高 |
| 📌 Bug | [Issue #7991](https://github.com/agentscope-ai/QwenPaw/issues/7991) | 2026-09-26 | 今日新报 | 🔴 高 |
| ⏳ PR | [PR #7956](https://github.com/agentscope-ai/QwenPaw/pull/7956) | 2026-09-23 | 4天 | 🟡 中 |
| ⏳ PR | [PR #7993](https://github.com/agentscope-ai/QwenPaw/pull/7993) | 2026-09-26 | 今日新报 | 🟡 中 |
| ⏳ PR | [PR #7992](https://github.com/agentscope-ai/QwenPaw/pull/7992) | 2026-09-26 | 今日新报 | 🟡 中 |

---

## 项目健康度总结

| 指标 | 评分 | 说明 |
|---|---|---|
| 活跃度 | 🟡 中低 | 24h 内 6 条更新，无合并 |
| Bug 响应 | 🟡 中 | Issue #7991 尚无 Fix PR |
| 功能推进 | 🟢 良好 | PR #7956 推进 UX 统一化 |
| 社区参与 | 🟡 中 | Issue #4963 持续讨论但无实质进展 |
| 代码质量 | 🟢 良好 | PR #7992/#7993 修复具体 bug，无回归风险 |

**整体评估**：QwenPaw 项目今日保持中等活跃度，代码质量稳定，但 PR 合并进度偏慢，且存在一个长期未解决的关键功能缺口（Issue #4963）。建议维护者优先处理 Issue #7991 的数据一致性问题，并推动三条待合并 PR 的 Review 与合并。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：** 2026-09-27  
**数据来源：** GitHub API (NousResearch/hermes-agent)

## 1. 今日速览

过去24小时 hermes-agent 保持高度活跃，共计产生 **500 条 Issue** 和 **500 条 PR** 更新。其中新开/活跃 Issue 398 条，已关闭 102 条；待合并 PR 356 条，已合并/关闭 144 条。无新版本发布，但社区围绕 Windows 网关崩溃、macOS 睡眠唤醒 PID 漂移、以及插件系统扩展性等核心稳定性问题进行了密集讨论与修复尝试。整体项目处于快速迭代阶段，维护者对高优先级兼容性 Bug 响应迅速。

## 2. 版本发布

**无新版本发布。**

最近一次主要更新聚焦于 0.20.x 系列的稳定性修补，当前 main 分支持续积累功能特性（特别是插件系统和桌面端交互）。

## 3. 项目进展

今日重点推进了以下方向：

*   **桌面端体验优化：** PR [#122368](https://github.com/NousResearch/hermes-agent/pull/122368) 已合并，默认锁定 Composer 到停靠栏，防止意外拖拽浮动，解决了用户长期反馈的误触问题。同时 PR [#122080](https://github.com/NousResearch/hermes-agent/pull/122080) 正在处理重复模型行、归档会话合并及渲染器可访问性改进。
*   **插件系统能力扩展：** 一系列 PR（[#123976](https://github.com/NousResearch/hermes-agent/pull/123976), [#123977](https://github.com/NousResearch/hermes-agent/pull/123977), [#123978](https://github.com/NousResearch/hermes-agent/pull/123978), [#123979](https://github.com/NousResearch/hermes-agent/pull/123979)）由 @nekwo 提交，显著增强了插件 SDK 的能力，包括 `busy_policy`、`command_guard` 钩子、按次计费支持以及工具集注册机制，为第三方插件开发打下基础。
*   **定时任务与网关稳定性：** 针对 macOS 网关重启时序问题的 PR [#121117](https://github.com/NousResearch/hermes-agent/pull/121117) 已更新，旨在解决 `hermes update` 在 macOS 上的假阴性检查失败问题。

## 4. 社区热点

以下 Issue 评论数最多，反映了当前用户最关注的痛点：

1.  **#88584: [OPEN] Automated Nous integration is blocked** (147 评论)
    *   **摘要：** Nous 与 Enterkey 的自动合并因 `cron/jobs.py` 冲突而阻塞，影响持续集成流程。
    *   **诉求：** 解决分支冲突，确保 CI 管道畅通。
2.  **#122183: [CLOSED] Windows gateway on the PM runtime prepends the pre-PM venv and crashes...** (24 评论)
    *   **摘要：** Windows 上从旧 venv 迁移到 PM runtime 后，残留的旧环境导致 `hosted_room_worker` 崩溃。
    *   **状态：** 已关闭，表明问题已解决或已被类似案例覆盖。
3.  **#97065: [OPEN] Keet gateway setup crashes with TypeError: _n() missing required argument 'config'** (22 评论)
    *   **摘要：** Keet 插件网关设置向导在 Windows 11 上因缺少配置参数而崩溃。
    *   **诉求：** 修复 Keet 插件与 Hermes Agent 0.20.6 的兼容性。
4.  **#112639: [OPEN] RFC: script-speed computer use via semantic state, runahead execution...** (15 评论)
    *   **摘要：** 提出通过语义状态和预执行实现“脚本级”速度的计算机使用能力。
    *   **诉求：** 用户对提升自动化任务执行效率有强烈需求。
5.  **#122222: [OPEN] cron external worker cannot import dependencies on self-managed installs** (12 评论)
    *   **摘要：** 自托管安装中，定时任务外部工作器因 `PYTHONPATH` 限制无法导入依赖，导致所有定时任务失败。
    *   **诉求：** 修复环境隔离与依赖解析之间的冲突。

## 5. Bug 与稳定性

今日报告了多个严重 Bug，主要集中在跨平台兼容性（尤其是 Windows 和 macOS）：

*   **[P1] Windows 网关崩溃 (Issue #122183):** 已关闭。Windows 网关在 PM runtime 下因旧 venv 残留而崩溃。
*   **[P1] cron 工作器依赖导入失败 (Issue #122222):** 自托管安装中定时任务全部失败。需关注是否已有 Fix PR。
*   **[P1] pm workspace 缺少 uv.lock (Issue #122593):** `hermes pm` 命令因找不到 `uv.lock` 文件而失败，影响包管理功能。
*   **[P2] macOS Fast User Switching 阻塞 (Issue #120545):** launchd 网关运行时，快速用户切换被阻塞 20-30 秒，严重影响多用户 macOS 体验。
*   **[P2] macOS 睡眠唤醒 PID 漂移 (Issue #118326):** `psutil.create_time()` 在睡眠唤醒后漂移，导致 kanban 工作器被误判为已终止，引发重复启动。
*   **[P2] Windows 更新后网关检查失败 (Issue #123971):** `hermes update` 在 Desktop 启动网关时，重启检查返回 exit 1，尽管更新本身成功。
*   **[P2] browser_exec 解析错误 CLI (Issue #122292):** Windows 上 `browser-use` 库路径解析错误，返回旧版 CLI 帮助文本而非执行自动化。
*   **[P2] TUI/Desktop 会话混用问题 (Issue #94778, #106217, #51058):** 多个 Issue 反映 TUI 和 Desktop 共享 `HERMES_HOME` 时，会话状态、压缩后的重连以及中断标记共享存在严重 bug，导致会话错乱或死锁。

**稳定性评估：** 项目在当前版本中存在较多平台特定（尤其是 Windows 和 macOS）的稳定性问题，主要集中在进程管理、环境隔离和会话状态同步方面。建议用户密切关注相关 Fix PR 的合并进度。

## 6. 功能请求与路线图信号

*   **脚本级速度计算机使用 (Issue #112639):** 用户希望 Hermes 能像编译后的脚本一样执行例行计算机交互，这指示了未来在自动化效率和确定性执行方面的探索方向。
*   **插件系统深化 (多个 PR by @nekwo):** 大量关于插件钩子（`busy_policy`, `command_guard`, `post_api_request`, `register_toolset`）、本地运行时配置和环境隔离的 PR 表明，插件生态系统的完善是当前的核心路线图。
*   **guided model routing for workers (PR #124574):** 为 Kanban 工作器和 MoA 集群引入可选的、质量优先的引导式模型路由，显示项目在智能任务分配和成本控制上的投入。
*   **Skills 扩展性 (PR #124191):** 允许 `skills.extra_dirs` 成为可写根目录，并支持 posix 命名查找，增强了技能系统的灵活性。

## 7. 用户反馈摘要

*   **Windows 体验不佳：** 多个高评论 Issue 集中在 Windows 上的网关崩溃、更新失败、进程组泄露和浏览器工具解析错误，用户对此抱怨较多。
*   **macOS 多用户场景受阻：** Fast User Switching 被阻塞和睡眠唤醒后 PID 漂移问题，严重影响了在 Mac Studio 等多用户 macOS 环境下的用户体验。
*   **TUI/Desktop 会话管理混乱：** 用户反馈在 TUI 和 Desktop 之间切换、压缩上下文后重连、以及 `/new` 创建新会话时，容易出现会话错乱、死锁或状态不同步的问题。
*   **插件兼容性：** Keet 等第三方插件的设置向导存在崩溃问题，需要维护者加强与插件生态的兼容性测试。
*   **定时任务不可用：** 自托管用户在尝试使用 cron 功能时遇到依赖导入失败，导致该核心功能完全不可用。

## 8. 待处理积压

*   **#88584:** Nous 集成合并冲突，阻塞 CI，需优先处理。
*   **#122222:** cron 工作器依赖导入失败，影响所有自托管用户的定时任务。
*   **#122593:** pm workspace 缺少 `uv.lock`，影响包管理。
*   **#120545:** macOS Fast User Switching 阻塞，影响多用户 macOS 体验。
*   **#118326:** macOS 睡眠唤醒 PID 漂移，导致工作器管理异常。
*   **#122183:** Windows 网关崩溃 (虽已关闭，但类似问题可能仍存)。
*   **#123971:** Windows 更新后网关检查失败。
*   **#94778, #106217, #51058:** TUI/Desktop 会话混用相关问题，需系统性解决。

**建议：** 维护者应优先关注 Windows 和 macOS 平台的稳定性修复，以及 TUI/Desktop 会话状态管理的根治方案。同时，加速插件系统相关 PR 的审查与合并，以支撑日益增长的生态需求。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期：** 2026-09-27
**数据来源：** GitHub API (AstrBotDevs/AstrBot)

## 1. 今日速览
昨日 AstrBot 社区活跃度较高，共处理 23 条新提交（7 Issues + 16 PRs），其中 15 个 PR 仍处于待合并状态，显示开发迭代节奏紧凑。核心亮点在于针对 Telegram 多机器人环境适配、WebChat 唤醒逻辑修复以及 Token 计数精度的多项改进 PR 集中涌现。整体项目健康度良好，维护者对 Bug 反馈响应迅速，已有多个即时修复方案提交。

## 2. 版本发布
无新版本发布。当前最新稳定版本为 v4.28.1，但社区已反馈该版本存在 Dashboard 统计服务时区相关的 Bug（Issue #10212）。

## 3. 项目进展
昨日合并/关闭了 **1 个 PR**：
*   **#10243 [CLOSED] fix(chatui): respect reasoning panel scroll intent** (@Soulter)
    *   **进展说明**：修复了 WebUI 推理面板的自动滚动行为，增加了用户手动上滑暂停自动滚动、下滑恢复跟随的功能，并补充了回归测试。这提升了用户在长对话场景下的交互体验。

此外，有 **15 个 PR** 待合并，主要集中在：
*   **Telegram 适配修复**：#10244 和 #10241 均致力于解决 Telegram 群聊中发给其他机器人的命令误唤醒 AstrBot 的问题（Fixes #10240）。
*   **核心逻辑完善**：#10237 实现了 `extra_user_content_parts` 在子代理中的透传；#10216 优化了 Emoji 的 Token 成本估算；#10238 解决了会话锁下历史消息刷新的并发问题。

## 4. 社区热点
以下 Issue/PR 获得了较多关注或具有代表性：

1.  **Issue #10235: 增加模型调用失败重试**
    *   **链接**: https://github.com/AstrBotDevs/AstrBot/issues/10235
    *   **热度**: 9 条评论, 1 👍
    *   **分析**: 用户提出在自动化任务中因模型服务波动导致任务中断的痛点，建议增加重试机制。这是提升 AstrBot 在生产环境稳定性的关键需求，尤其适用于大型任务场景。
2.  **Issue #10242 / PR #10245: WebChat 唤醒前缀豁免**
    *   **链接**: https://github.com/AstrBotDevs/AstrBot/issues/10242 | https://github.com/AstrBotDevs/AstrBot/pull/10245
    *   **分析**: 这是一个一致性修复请求。#9215 已在唤醒阶段豁免 WebChat 的好友前缀检查，但 `provider_settings.wake_prefix` 层未同步，导致行为不一致。维护者 @EterUltimate 已快速提交 PR 修复。
3.  **Issue #10212: Dashboard 统计服务因时区缺失查询失败**
    *   **链接**: https://github.com/AstrBotDevs/AstrBot/issues/10212
    *   **分析**: v4.28.0/4.28.1 引入的回归 Bug，影响 Windows 用户使用 WebUI 数据页面。目前尚无 PR 修复，属于高优先级待办。

## 5. Bug 与稳定性
今日报告了多个 Bug，按严重程度排列：

| 级别 | Issue/PR | 描述 | 状态 |
| :--- | :--- | :--- | :--- |
| **高** | #10212 | v4.28.1 Dashboard 统计服务因时区信息缺失导致查询失败 (StatementError) | 无 Fix PR |
| **中** | #10242 | provider_settings.wake_prefix 未随 #9215 豁免 WebChat | PR #10245 待合并 |
| **中** | #10240 | Telegram 群聊中发给其他机器人的命令会误唤醒 AstrBot | PR #10244, #10241 待合并 |
| **低** | #10236 | 微信 ClawBot 工具调用无返回，但正常对话有返回 | 无 Fix PR |
| **低** | #10232 (隐含) | Telegram 回复 Bot 时 sender_id 类型不匹配导致无法唤醒 | PR #10233, #8237 待合并 |

## 6. 功能请求与路线图信号
*   **模型调用重试机制 (#10235)**: 用户明确请求在 LLM 调用失败时自动重试，以增强自动化任务的鲁棒性。这是提升“企业级”可用性的常见需求，可能被纳入下一版本的稳定性增强中。
*   **tool_loop_agent 支持 extra_user_content_parts (#10230/#10237)**: 插件开发者希望在不污染对话历史的情况下向子代理注入临时内容。PR #10237 已实现此功能，表明项目正在加强插件系统的灵活性和能力边界。
*   **Codex OAuth & GPT-6 支持 (#6322)**: 长期未合并的大型 PR，计划添加 ChatGPT/Codex 官方 OAuth 提供商及 GPT-6 支持。虽未在今日活跃，但仍是社区期待的重要功能扩展。

## 7. 用户反馈摘要
*   **痛点**：
    *   **模型抖动影响任务连续性**：用户反馈在自动化任务中，偶尔的模型调用失败会导致整个任务链中断，急需重试机制 (#10235)。
    *   **多机器人环境干扰**：在 Telegram 群聊中与多个 Bot 共存时，容易因命令格式问题误唤醒 AstrBot，影响使用体验 (#10240)。
    *   **Dashboard 数据不可用**：升级至 v4.28.x 后，Windows 用户遇到统计页面完全无法加载的问题，严重影响运维监控 (#10212)。
    *   **Token 计费精度**：用户关注 Emoji 等特殊字符的 Token 计算准确性，已有 PR 修正此偏差 (#10216)。
*   **满意点**：
    *   WebUI 交互细节持续优化，如推理面板的滚动行为更符合用户直觉 (#10243)。
    *   macOS 桌面端窗口原生风格得到改进，提升原生体验 (#10227)。

## 8. 待处理积压
*   **Issue #10212 (Bug)**: Dashboard 统计服务时区 Bug，影响 v4.28.0/4.28.1 用户，**无 Fix PR**，建议优先处理。
*   **Issue #10236 (Bug)**: 微信 ClawBot 工具调用无返回，**无 Fix PR**，需进一步排查。
*   **PR #6322 & #6325**: 涉及 Codex OAuth 支持和 Dashboard 部署工作流的大型 PR，长期开放，需维护者评估合并优先级。
*   **PR #8237**: 与 #10233 类似的 Telegram 回复 ID 归一化修复，长期开放，可能与 #10233 存在重复或互补，需确认最终方案。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：** 2026-09-27

## 1.  今日速览
DeepSeek Harness 社区在观测窗口内保持极高活跃度，过去24小时 Discussions 更新达 177 条，反映出用户对 v4.1 模型迭代及底层架构稳定性的强烈关注。当前无新版本发布，代码变更通过历史 Release 落地。热点集中在 OpenCode Go API 兼容性问题、v4.1-flash 模型在超长上下文下的思考退化 Bug，以及 Web UI 在 Firefox 引擎下的历史加载故障。社区贡献者在 #7802 等议题中提供了根因分析与补丁，体现了较高的自主修复能力。

## 2. 版本发布
**今日无新版本发布。**

*注：根据项目机制，代码合并经 Releases 落地，Changelog 即合并摘要。暂无最新 Release 数据可供解析。*

## 3. 项目进展
无新的 PR 合并记录（项目未启用标准 PR 工作流，变更已随 Release 归档）。

**值得注意的技术进展：**
- **上游修复同步：** 讨论 **#7922** 指出 `Loader` 配置更新竞态条件问题，并确认上游库 `cordis` 已在 commit `1b7d0f2` 修复。这表明项目依赖链正在跟进上游稳定性改进。
- **社区补丁贡献：** 讨论 **#7802** 中，用户 @CNyaotian-Lunar 针对 "Loading history" 永久卡住问题定位了两处客户端缺陷（socket waiter 永不 settle），并提供了社区补丁。这为官方后续修复提供了明确路径。

## 4. 社区热点
以下是评论数最多的热门讨论，反映了当前的主要痛点：

1.  **[Ideas] OpenCode Go 头部兼容性要求 (#5495)** - [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)
    *   **热度：** 39 评论
    *   **核心诉求：** OpenCode Go API 将于 09/05 起强制要求 `x-opencode-session` 请求头，否则报错。大量用户（约25k组织）依赖此 API，亟需 Harness 侧适配以维持服务可用性。

2.  **[General] 本轮运行失败: Cannot read properties of undefined (reading 'prepare') (#7035)** - [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/7035)
    *   **热度：** 38 评论
    *   **核心诉求：** 用户报告运行崩溃，错误指向 `prepare` 方法调用。讨论 **#7086** 进一步关联到源码构建版本 (`0.1.6-alpha.2`) 的 tools 执行失败问题，暗示可能存在构建或类型层不一致的回归。

3.  **[BUG] Sandbox 权限 escalation 错误 (#201)** - [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/201)
    *   **热度：** 27 评论
    *   **核心诉求：** 在使用 GPT-5.6-Sol 等模型时，频繁出现 sandbox 权限从 "danger-full-access" 到 "workspace-write" 的升级校验失败错误，影响 Agent 正常操作。

4.  **[Bug] v4.1-flash 超长上下文思考退化循环 (#5976)** - [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/5976)
    *   **热度：** 13 评论
    *   **核心诉求：** 在 `reasoningEffort: max` + 超长上下文配置下，`deepseek-v4.1-flash` 模型陷入"回合零产出"的退化循环，且无自动熔断机制，需手动中止。对照实验显示同配置下 `v4-flash` 未复发，疑似 v4.1 特定版本的回归。

5.  **[Bug] 历史加载永久卡住（含社区补丁）(#7802)** - [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/7802)
    *   **热度：** 11 评论
    *   **核心诉求：** "加载历史"功能在切会话后常卡死，仅刷新可恢复。作者已定位根因为 socket waiter 未 settle，并提供补丁。这是一个影响用户体验的高频 Bug。

6.  **[Bug] Firefox 浏览器历史加载失败 (#5677)** - [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/5677)
    *   **热度：** 7 评论
    *   **核心诉求：** Web UI 在 Firefox/Zen 浏览器中，包含 assistant raw chunk 的记录无法加载，无限停留在 "Loading history..."，疑似 lossless-JSON 验证的浏览器兼容性问题。

## 5.  Bug 与稳定性
按严重程度排列：

| 优先级 | 问题描述 | Discussion | 状态 |
| :--- | :--- | :--- | :--- |
| **P0** | **v4.1-flash 思考退化/死循环**：max reasoning effort 下模型产出为空，无熔断，需手动干预。 | [#5976](https://github.com/deepseek-ai/deepseek-harness/discussions/5976) | 无官方 Fix |
| **P1** | **API 兼容性中断风险**：OpenCode Go 强制要求新 header，不适配将导致 25k+ 用户组织服务报错。 | [#5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495) | 待适配 |
| **P1** | **Web UI 历史加载卡死**：Firefox 引擎及通用 socket waiter 问题导致历史无法加载。 | [#7802](https://github.com/deepseek-ai/deepseek-harness/discussions/7802), [#5677](https://github.com/deepseek-ai/deepseek-harness/discussions/5677) | 社区提供补丁 |
| **P2** | **源码构建 Tools 执行失败**：`0.1.6-alpha.2` 版本 `prepare` 方法 undefined 错误。 | [#7086](https://github.com/deepseek-ai/deepseek-harness/discussions/7086) | 无官方 Fix |
| **P2** | **Sandbox 权限校验报错**：`workspace-write` 非严格宽于 `danger-full-access`。 | [#201](https://github.com/deepseek-ai/deepseek-harness/discussions/201) | 无官方 Fix |
| **P3** | **Session 迁移校验失败**：v1→v2 迁移时因 source refs 数量不匹配拒绝加载长会话。 | [#7824](https://github.com/deepseek-ai/deepseek-harness/discussions/7824) | 无官方 Fix |

## 6. 功能请求与路线图信号
- **ACP 会话转录重建 (#6324)**：用户反馈 `dsh-acp` 目前不支持 `session/load` 且 `session/resume` 不重放历史，导致自动化客户端无法重建会话转录本。这是一个针对自动化/编程接入场景的功能缺口，可能被纳入下一代 ACP 规范的完善中。
- ** Lifecycle 生命周期契约 (#4909)**：长期存在的架构问题，父 Agent 销毁后子 Agent 成为孤儿，缺乏明确的跨模块生命周期契约。这属于底层架构加固需求，可能影响未来 Agent 编排能力的提升。

## 7. 用户反馈摘要
- **痛点：**
    - **模型稳定性疑虑：** 用户对 v4.1 系列在极端配置（超长上下文+max reasoning）下的表现表示担忧，认为存在明显回归（#5976）。
    - **第三方依赖风险：** OpenCode Go 的强制更新让依赖其 API 的用户感到被动，希望 Harness 能快速适配以避免服务中断（#5495）。
    - **浏览器兼容性：** Firefox 用户群体感受到被忽视，Web UI 在该引擎下的基础功能（历史加载）失效（#5677）。
    - **构建复杂性：** 源码构建流程脆弱，切换版本或 clean rebuild 不当即导致 tools 层故障，增加了开发者使用门槛（#7086）。
- **满意点：**
    - **社区互助文化：** 在 #7802 等议题中，用户不仅报 Bug，还提供根因分析和补丁，展现了活跃的社区生态。
    - **插件生态扩展：** 如 Capital Generation 证券研究插件的分享（#6947），显示了用户基于 Harness 进行垂直领域创新的意愿。

## 8. 待处理积压
以下 Issue 长期未获官方响应或处于开放状态，建议维护者关注：

1.  **[BUG] Sandbox escalation 权限错误 (#201)** - 创建于 08-13，27 评论。高频干扰项，可能影响生产环境 Agent 执行。
2.  **[Architecture] Lifecycle handoff contract missing (#4909)** - 创建于 08-28，6 评论。基础架构缺陷，阻碍复杂多 Agent 场景。
3.  **[Bug] Firefox 历史加载失败 (#5677)** - 创建于 09-04，7 评论。涉及主流浏览器兼容性，影响用户体验广度。
4.  **[Q&A] v1→v2 Session 迁移校验失败 (#7824)** - 创建于 09-25，5 评论。可能导致用户长会话数据无法访问。
5.  **[Bug] 源码构建 Tools 失败 (#7086)** - 创建于 09-18，6 评论。影响开发者和高级用户的本地构建体验。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*