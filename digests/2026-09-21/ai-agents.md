# OpenClaw 生态日报 2026-09-21

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-20 23:41 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-09-21

## 1. 今日速览

过去 24 小时 OpenClaw 社区保持极高活跃度：**Issues 500 条、PRs 500 条**，但无新版本发布。整体态势呈现**高 Bug 密度 + 高修复活跃**的双重特征：大量 P0 级崩溃、更新死锁和内存泄漏问题集中暴露（尤其是 2026.9.5 升级路径），同时核心维护者密集推进关键修复 PR。项目稳定性处于压力测试期，健康度**中等偏下**——功能迭代稳健，但发布质量和回归控制存在明显隐患。

---

## 2. 版本发布

**无新版本发布**。最新稳定版本仍为 **2026.9.4**，**2026.9.5** 虽已推送但引发大规模升级故障，多个 Issue 报告其升级过程失败或导致环境不可用（见 Bug 与稳定性章节）。

---

## 3. 项目进展

今日关闭/合并的重要 PR 及开放中的高价值 PR：

### 已关闭/合并
- **#153882**（CLOSED）— 插件状态迁移死锁修复：解决了 `2026.9.4→2026.9.5` 升级过程中因安装记录租约冲突导致的 Doctor 硬停止问题，直接回应用户 @mnowrot 报告的更新死锁。
- **#153246**（CLOSED）— 插件构建临时目录泄漏修复：清理了 `~/.openclaw/tmp/openclaw-plugin-build-*` 目录永不清理的问题（每日增长约 7.5 GB）。
- **#153654**（CLOSED）— Session SQLite 迁移恢复报告：Doctor 成功从失败的迁移中恢复并验证。
- **#153682**（CLOSED）— memory-core 轻阶段叙事丢弃修复：解决了当最近日记条目被截断时轻阶段叙事总是被跳过的问题。
- **#123360**（CLOSED）— memory-core 梦境多阶段竞争条件修复：修复了 first-finisher cleanup 与兄弟阶段竞争导致已完成叙事被丢弃的 bug。

### 开放中关键 PR
- **#154068** — 默认启用结构化 Tool Search（@roboclaw-bot）
- **#151176** — OpenAI Agents API MVP harness（@sjf-oa）
- **#119702** — 安全修复：用 `compileSafeRegex` 防护 patternProperties 默认值正则 hang（@SebTardif）
- **#154158** — Bedrock 支持读取旋转后的 AWS 凭据（@ayoakouh）
- **#144318** — 更新流程的密封包发布恢复机制（@vincentkoc）
- **#154088** — CI 命令测试跨 worker 分配修复（@steipete）
- **#153895** — 梦境期间保留压缩日记上下文（@Alix-007，修复 #153682）
- **#153878** — 访客撤销在 provider 故障时持久化（@shakkernerd）
- **#153636** — 更新/Doctor 期间刷新过期的 Gateway 关闭预算（@steipete）
- **#154131** — 移除 compaction checkpoints（@roboclaw-bot）
- **#154160** — 简化更新执行和最终化流程（@roboclaw-bot）
- **#153792** — Teams 共享频道会话支持（@xjodoin，关闭 #81084）
- **#151872** — OpenAI Agents API 工具和文件传输（@sjf-oa）
- **#153978** — 会话级操作者权限（@shakkernerd）
- **#152181** — 外部 harness 会话和尝试机制重构共享（@sjf-oa）

**项目推进评估**：核心维护者（@steipete、@vincentkoc、@roboclaw-bot）今日密集提交 15+ 个 PR，聚焦于更新流程稳定性、会话管理优化、安全加固和功能解耦。项目整体在**系统稳定性重构**方向上有实质性推进，但尚未形成新版本发布。

---

## 4. 社区热点

### 最活跃 Issues（按评论数）

| Issue | 评论数 | 评级 | 摘要 |
|-------|--------|------|------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 35 | 🦐 gold shrimp / P0 | Agent SQLite WAL 无限增长至 2.8GB，阻塞 Gateway 启动 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 32 | 🦪 silver shellfish / P1 | Hook/tool 子进程泄漏导致僵尸进程累积 |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | 31 | 🦞 diamond lobster / P1 | MCP 服务器初始化超时导致 Gateway 崩溃 |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 29 | 🦪 silver shellfish / P1 | Gateway 内存泄漏：RSS 从 350MB 增长至 15.5GB |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 21 | 🦞 diamond lobster / P1 | 同步 agent 持久化阻塞事件循环 |
| [#115908](https://github.com/openclaw/openclaw/issues/115908) | 21 | 🦞 diamond lobster / P1 | Session 转录投影在持续写入下发生活锁 |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | 20 | 🦐 gold shrimp / P0 | 632-agent 舰队中 Gateway 事件循环饥饿，健康检查超时 |
| [#152759](https://github.com/openclaw/openclaw/issues/152759) | 20 | 🦪 silver shellfish / P0 | `openclaw update` 从 9.4→9.5 失败，doctor-failed |

### 最活跃 PRs
- **#154068** — 结构化 Tool Search 默认启用（刚提交）
- **#151176** — OpenAI Agents API harness（持续讨论）
- **#119702** — 安全正则修复（high merge-risk）

**社区诉求分析**：用户最关注的是**升级稳定性**和**内存/进程泄漏**问题。9.5 版本的发布质量引发强烈反馈，多个 Issue 直接批评升级流程不可靠。同时，大规模部署场景（632-agent 舰队）的稳定性成为企业用户核心痛点。

---

## 5. Bug 与稳定性

### 🔴 P0 级 Critical Bug

| Issue | 标题 | 状态 | Fix PR |
|-------|------|------|--------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | SQLite WAL 无限增长阻塞 Gateway | OPEN | 无 |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP 初始化超时导致 Gateway 崩溃 | OPEN | 无 |
| [#152759](https://github.com/openclaw/openclaw/issues/152759) | 9.4→9.5 更新失败 doctor-failed | CLOSED | — |
| [#153257](https://github.com/openclaw/openclaw/issues/153257) | 9.5 将稳定环境变为 8 小时故障恢复 | OPEN | 无 |
| [#153704](https://github.com/openclaw/openclaw/issues/153704) | 9.5 更新 candidate doctor 在 299s 处死亡 | CLOSED | — |
| [#146887](https://github.com/openclaw/openclaw/issues/146887) | 9.3→9.4 四阶段更新失败 | OPEN | 无 |
| [#152884](https://github.com/openclaw/openclaw/issues/152884) | 更新死锁（已关闭，#153882 修复） | CLOSED | #153882 |
| [#153882](https://github.com/openclaw/openclaw/issues/153882) | 插件状态迁移死锁 | CLOSED | — |
| [#152981](https://github.com/openclaw/openclaw/issues/152981) | Gateway 启动挂起 17 分钟 | OPEN | 无 |
| [#151467](https://github.com/openclaw/openclaw/issues/151467) | 自升级死锁 + 回滚失败 | OPEN | 无 |
| [#144742](https://github.com/openclaw/openclaw/issues/144742) | 9.4 缺少 #144208 修复导致配置写入失败 | OPEN | 无 |
| [#119760](https://github.com/openclaw/openclaw/issues/119760) | 超时 channel stop 泄漏 MCP 子进程（已关闭） | CLOSED | — |
| [#107220](https://github.com/openclaw/openclaw/issues/107220) | 2026.7.1  legacy memory sidecar 冲突导致崩溃循环（已关闭） | CLOSED | — |

### 🟠 P1 级 High Bug

| Issue | 标题 | 状态 |
|-------|------|------|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Hook/tool 子进程泄漏僵尸进程 | OPEN |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | Gateway 内存泄漏 350MB→15.5GB | OPEN |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 同步持久化阻塞事件循环 | OPEN |
| [#115908](https://github.com/openclaw/openclaw/issues/115908) | Session 转录投影活锁 | OPEN |
| [#139847](https://github.com/openclaw/openclaw/issues/139847) | 回复运行中消息丢失 regression | OPEN |
| [#137332](https://github.com/openclaw/openclaw/issues/137332) | 混合终端请求批次无限重试 | OPEN |
| [#153067](https://github.com/openclaw/openclaw/issues/153067) | 稳态下每 5s 复制整个状态 DB（已关闭） | CLOSED |
| [#153290](https://github.com/openclaw/openclaw/issues/153290) | 插件重载导致 ENOENT（已关闭） | CLOSED |
| [#153654](https://github.com/openclaw/openclaw/issues/153654) | Session SQLite 迁移恢复（已关闭） | CLOSED |

### 🟡 P2 级 Medium Bug

| Issue | 标题 | 状态 |
|-------|------|------|
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | google-vertex/gemini 空对象转换错误 | OPEN |
| [#51429](https://github.com/openclaw/openclaw/issues/51429) | 工作路径硬编码到代码中 | OPEN |
| [#143278](https://github.com/openclaw/openclaw/issues/143278) | 心跳内部输出泄露到 Telegram | OPEN |
| [#153706](https://github.com/openclaw/openclaw/issues/153706) | 关闭的 ACP 会话错误投影 agentRuntime | OPEN |
| [#123792](https://github.com/openclaw/openclaw/issues/123792) | CLI 后端助手回合渲染两次 | OPEN |
| [#144447](https://github.com/openclaw/openclaw/issues/144447) | Git/dev 更新在 candidate 启动截止时间后结束 | OPEN |
| [#145050](https://github.com/openclaw/openclaw/issues/145050) | Doctor 跳过历史 Workshop 设置（已关闭） | CLOSED |
| [#121558](https://github.com/openclaw/openclaw/issues/121558) | Cron 隔离运行通知融合到消息中 | OPEN |
| [#79983](https://github.com/openclaw/openclaw/issues/79983) | SYSTEM_RUN_DISABLED 尽管安全策略为 full | OPEN |
| [#132303](https://github.com/openclaw/openclaw/issues/132303) | claude-cli 后端未强制执行 tools.deny | OPEN |

**稳定性总结**：项目当前面临**严重的发布质量危机**。9.5 版本的多个升级失败案例表明回归测试覆盖不足。内存泄漏、进程泄漏和更新死锁构成三大稳定性支柱问题，其中大部分已在近几日关闭部分修复，但根因修复 PR 尚未合入主线。

---

## 6. 功能请求与路线图信号

### 高优先级功能请求

| Issue/PR | 需求 | 路线图信号 |
|----------|------|-----------|
| [#45608](https://github.com/openclaw/openclaw/issues/45608) (👍4) | 重置前执行 agentic memory flush | ⚠️ 开放，无活跃 PR |
| [#110950](https://github.com/openclaw/openclaw/issues/110950) (👍2) | 统一 cron 抽象（heartbeat/watchers/automation） | ⚠️ 开放，长期 feature |
| [#71058](https://github.com/openclaw/openclaw/issues/71058) (👍1) | 单 Gateway 多 Azure/Teams bot | 🔶 PR #112811 开放中 |
| [#131457](https://github.com/openclaw/openclaw/issues/131457) | Feishu 进度流模式 | 🔶 与现有 channel 对齐 |
| [#119992](https://github.com/openclaw/openclaw/issues/119992) | message tool 每回合发送预算 | ⚠️ 开放 |
| [#153940](https://github.com/openclaw/openclaw/pull/153940) | GitHub credit 从 OIDC claims 验证 | 🔶 PR 开放，安全功能 |
| [#153792](https://github.com/openclaw/openclaw/pull/153792) | Teams 共享频道会话 | 🔶 PR 开放，关闭 #81084 |
| [#153978](https://github.com/openclaw/openclaw/pull/153978) | 会话级操作者权限 | 🔶 PR 开放，细粒度权限 |

### 即将纳入下一版本的功能
基于今日 PR 活跃度，以下功能**极有可能**进入下一个 release：
1. **OpenAI Agents API 支持**（#151176, #151872, #152181 堆叠 PR）
2. **Teams 共享频道会话**（#153792）
3. **结构化 Tool Search 默认启用**（#154068）
4. **Bedrock 旋转凭据支持**（#154158）
5. **会话列表性能优化**（#153983, #154163）
6. **更新流程简化与恢复机制**（#144318, #154160, #153636）

---

## 7. 用户反馈摘要

### 🔴 主要痛点
1. **升级流程不可靠**：多位用户报告 9.4→9.5 升级失败，Doctor 卡死、死锁、静默回滚。@abuegab1-spec 直言 "I genuinely regret upgrading to OpenClaw 2026.9.5"。
2. **内存/进程泄漏**：企业用户 @petercheng 报告 RSS 从 350MB 增长至 15.5GB 后 OOM；@avp717 报告僵尸进程累积。
3. **大规模部署稳定性**：@609NFT 报告 632-agent 舰队中 Gateway 事件循环饥饿，健康检查全部超时。
4. **更新死锁**：插件状态迁移与 parent install-records 租约冲突导致 Doctor 硬停止（#152884, #153882）。
5. **WAL 膨胀**：SQLite WAL 文件在 Windows 上无限增长至 2.8GB，尽管配置了 `wal_autocheckpoint=1000`（#143524）。

### 🟡 使用摩擦
- **心跳输出泄露**到 Telegram 用户聊天（#143278）
- **NO_REPLY  suppression 无条件**忽略 silentReply 策略（#119401）
- **claude-cli 后端 tools.deny 未生效**（#132303）
- **Anthropic claude-cli 发送陈旧 user-agent** 导致认证失败（#94716）
- **Slack DM 在重启后静默丢弃**（#131150）
- **插件构建临时目录永不清理**，每日增长 7.5GB（#153246）

### 🟢 正面反馈
- memory-core dreaming 修复（#123360, #153682）解决多阶段竞争条件
- Session SQLite 迁移恢复机制有效（#153654）
- 插件内存泄漏修复（#153246）获得认可

---

## 8. 待处理积压

### ⚠️ 需维护者重点关注

| Issue | 问题 | 等待状态 | 建议 |
|-------|------|----------|------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | SQLite WAL 无限增长 | needs-info, needs-review | 高优先级，影响 Windows 部署 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 子进程泄漏僵尸 | needs-review | 系统性问题，需架构级修复 |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | Gateway 内存泄漏 15.5GB | needs-review | 影响生产稳定性 |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP 超时崩溃 Gateway | queueable-fix | 需加强错误边界 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 同步持久化阻塞事件循环 | needs-product-decision | 需评估异步化方案 |
| [#115908](https://github.com/openclaw/openclaw/issues/115908) | Session 转录活锁 | source-repro | 需重构投影逻辑 |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | 632-agent 舰队事件循环饥饿 | needs-info | 大规模部署关键 |
| [#152981](https://github.com/openclaw/openclaw/issues/152981) | Gateway 启动挂起 17 分钟 | no-new-fix-pr | 回归问题 |
| [#151467](https://github.com/openclaw/openclaw/issues/151467) | 自升级死锁 + 回滚失败 | needs-info | 升级流程核心问题 |
| [#144742](https://github.com/openclaw/openclaw/issues/144742) | 9.4 缺少 #144208 修复 | maintainer | 发布流程漏洞 |
| [#45608](https://github.com/openclaw/openclaw/issues/45608) | Memory flush on reset | needs-product-decision | 功能请求，👍4 |
| [#110950](https://github.com/openclaw/openclaw/issues/110950) | 统一 cron 抽象 | needs-product-decision | 架构级 feature |

### 📊 项目健康度指标

| 指标 | 数值 | 评估 |
|------|------|------|
| Issue 活跃度 | 500/24h | 🔴 异常高（表明大量问题集中爆发） |
| PR 活跃度 | 500/24h | 🟢 高（维护者响应积极） |
| 关闭/开放比 | 201/299 = 40% | 🟡 一般（积压在增长） |
| 合并/开放比 | 216/284 = 43% | 🟡 一般 |
| P0 Issue 数量 | 12+ | 🔴 高风险 |
| 无 Fix PR 的 P0 | 8+ | 🔴 严重积压 |
| 新版本发布 | 0 | ⚠️ 发布暂停 |

**总体评估**：OpenClaw 当前处于**发布后危机应对期**。9.5 版本的回归问题引发连锁反应，维护者团队正以高强度推进修复 PR，但根因修复（内存泄漏、WAL 控制、更新流程重构）尚未完全合入。建议用户暂时停留在 2026.9.4，关注 #153882、#154160 等关键修复 PR 的合并进度后再考虑升级。

---

## 横向生态对比

基于 2026-09-21 各开源项目动态，以下是横向对比分析报告。

### 1. 生态全景
个人 AI 助手与自主智能体开源生态正处于**“功能扩张与稳定性重构并存”**的深水区。OpenClaw 和 hermes-agent 通过高频代码提交快速迭代，但均面临严重的发布质量危机（回归 Bug、内存泄漏、升级死锁）；QwenPaw 和 AstrBot 则展现出更健康的维护节奏，聚焦于多租户、安全加固等生产级痛点。整体趋势显示，社区重心正从单一对话能力向**跨网关协作、多租户架构、细粒度权限控制及会话持久化可靠性**演进。

### 2. 各项目活跃度对比

| 项目 | Issues (24h) | PRs (24h) | Release | 健康度评估 | 核心特征 |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **OpenClaw** | 500 | 500 | ❌ 无 | 🟡 中等偏下 | 高 Bug 密度，发布后危机应对期，9.5 升级故障频发 |
| **hermes-agent** | 500 | 500 | ❌ 无 | 🟢 良好 | 响应迅速（60%+ Issue 关闭），聚焦会话状态与跨网关协作 |
| **DeepSeek Harness** | 180 (Discussions) | N/A | ❌ 无 | 🟠 警告 | 源码部署崩溃成集群性 Bug，开发者体验严重受阻 |
| **QwenPaw** | 24 | 37 | ✅ v2.2.2-beta.3 | 🟢 良好 | 快速迭代修复期，多租户路线图清晰，测试覆盖提升 |
| **AstrBot** | 6 | 20 | ❌ 无 | 🟢 良好 | 小规模高质，Bug 修复率 100%，侧重安全与插件机制 |
| **Zeroclaw** | 50 | 50 | ❌ 无 | 🟢 良好 | RFC 驱动架构规范化，安全边界收敛，内存解耦 |
| **PicoClaw** | 6 | 5 | ❌ 无 | 🟡 一般 | 稳定性回归（DingTalk 崩溃），处于功能扩展与 Bug 修复并行 |

### 3. OpenClaw 在生态中的定位
*   **定位**：生态中的**“重型基础设施”**。它是唯一涉及大规模 Agent 舰队（632-agent）和复杂 Gateway 集群的项目，定位为高可用、可扩展的企业级智能体平台。
*   **优势**：社区贡献量巨大，插件生态丰富，对 MCP、Bedrock 等复杂集成的支持最深入。
*   **劣势/风险**：当前处于**“大而不稳”**阶段。9.5 版本的回归测试严重不足，导致 SQLite WAL 膨胀、进程泄漏、更新死锁等系统性问题集中爆发。相比 hermes-agent 的快速响应和 QwenPaw 的稳健迭代，OpenClaw 的发布节奏已滞后于问题暴露速度，用户信任度正在受损。
*   **差异化**：其他项目多为单节点或轻量级部署，OpenClaw 是唯一明确针对**大规模集群运维**（如事件循环饥饿、健康检查超时）进行攻关的项目，其解决的路径对行业具有标杆意义。

### 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求与现象 |
| :--- | :--- | :--- |
| **会话持久化与状态一致性** | OpenClaw, hermes-agent, DeepSeek Harness | OpenClaw 的 WAL 无限增长和迁移失败；hermes-agent 的消息错乱和 Session 泄漏；DeepSeek Harness 的升级后历史会话损坏。这是当前生态最脆弱的环节。 |
| **安全边界与权限收敛** | Zeroclaw, AstrBot, OpenClaw | Zeroclaw 推进文件系统权限收敛和 Shell 命令分层确认；AstrBot 引入提示词注入防护；OpenClaw 修复正则 Hang 安全漏洞。安全从“功能”变为“合规刚需”。 |
| **跨网关/多代理协作** | hermes-agent, OpenClaw, Zeroclaw | hermes-agent 的 #97681 (跨网关 Bot 协作) 热度极高；OpenClaw 推进 Teams 共享频道和外部 Harness 重构；Zeroclaw 支持 A2A 外部代理出站。去中心化协作成为主流架构方向。 |
| **OpenAI/LLM 兼容性** | OpenClaw, QwenPaw, PicoClaw | OpenClaw 整合 OpenAI Agents API；QwenPaw 增加 Provider 统一发现；PicoClaw 支持 OpenAI 兼容提供商。降低锁定效应，适配多样化后端。 |
| **资源泄漏治理** | OpenClaw, hermes-agent, QwenPaw | OpenClaw 的内存/进程泄漏（350MB→15.5GB）；hermes-agent 的内核回收懒加载问题；QwenPaw 的 ToolResultPruner 媒体块绕过导致 context 溢出。长时运行稳定性是生产部署的最大瓶颈。 |

### 5. 差异化定位分析

*   **OpenClaw**：**企业级集群平台**。适合需要部署数百个 Agent、管理复杂 Gateway 路由和高可用性的场景。技术栈重型，架构复杂，当前适合忍受其不稳定性的早期采用者。
*   **hermes-agent**：**高性能桌面/网关助手**。强调 Desktop 体验、跨网关协作和订阅制 OAuth 支持。适合追求低延迟、本地优先且需要多 Bot 协作的个人或小型团队。
*   **QwenPaw**：**多租户 SaaS 化助手**。由 AgentScope 驱动，明确指向团队协作（多租户 Hub）和成本优化（ReMeLight 记忆模型）。适合希望将 AI 助手产品化、服务化给多个租户使用的开发者。
*   **AstrBot**：**插件化机器人框架**。侧重 QQ/OneBot 生态，强调 Skill 自主创建和知识库稳定性。适合中国生态下的私域流量运营和轻量级机器人部署。
*   **Zeroclaw**：**安全优先的架构实验场**。通过 RFC 流程严格定义内存生命周期和文件权限，适合关注代码规范、最小权限原则和安全底座的底层开发者。
*   **DeepSeek Harness**：**模型底层调试工具**。聚焦于 DeepSeek 模型的推理 harness，当前主要服务于模型开发者和需要对齐测试的工程师，而非通用终端用户。
*   **PicoClaw**：**嵌入式/IoT 边缘助手**。侧重 IRC 协议和轻量化部署，适合资源受限环境或特定即时通讯协议集成场景。

### 6. 社区热度与成熟度

*   **快速迭代/波动期**：**OpenClaw, DeepSeek Harness**。两者均出现“高活跃度 + 高 Bug 率”的特征，OpenClaw 因 9.5 版本引发信任危机，DeepSeek Harness 因源码部署崩溃导致开发者流失风险。这类项目需要警惕“速度牺牲质量”的反噬。
*   **稳健增长/质量巩固期**：**QwenPaw, AstrBot, hermes-agent**。QwenPaw 发布 beta 并快速修复关键 Bug；AstrBot 修复率 100% 且 Issue 量小可控；hermes-agent 虽然 Issue 量大，但关闭率高且聚焦核心痛点。这三个项目处于良性循环，适合生产环境试用。
*   **架构规范化期**：**Zeroclaw, PicoClaw**。Zeroclaw 通过 RFC 沉淀架构决策；PicoClaw 专注于垂直领域（IRC/边缘）的功能补全。两者规模较小，但方向明确，稳定性相对可控。

### 7. 值得关注的趋势信号

1.  **“升级即灾难”成为共同痛点**：OpenClaw (9.4→9.5)、DeepSeek Harness (v0.1.6-alpha.2)、QwenPaw (2.2.x) 均出现因版本升级导致的会话丢失、配置失效或构建崩溃。**建议**：开发者在进行任何 major/minor 升级前，必须建立完善的快照备份和回滚机制，不要信任自动升级流程。
2.  **内存/上下文管理成为隐形成本黑洞**：OpenClaw 的 15.5GB RSS 泄漏、QwenPaw 的 base64 无限累积、hermes-agent 的内核泄漏。这表明当前的 Agent 架构在长时运行下的资源治理存在系统性缺陷。**建议**：在选型时，重点考察项目的内存监控、自动清理机制和 WAL 管理策略。
3.  **多租户与权限隔离从“可选”变“必选”**：QwenPaw 路线图明确多租户，AstrBot 强化插件隔离和提示词防护，Zeroclaw 推进文件系统权限收敛。企业级 AI 应用必须考虑租户间的隔离性和安全性，单一用户时代的“宽松权限”模型正在失效。
4.  **对“订阅制 OAuth”的强烈渴望**：hermes-agent 的 #25267 获得 57 个赞，反映出用户希望避免 API Key 与订阅身份认证之间的割裂。**建议**：若构建商业产品，应优先考虑对 Claude/ChatGPT 订阅账号的 OAuth 支持，而非仅依赖 API Token。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：** 2026-09-21
**数据来源：** GitHub zeroclaw-labs/zeroclaw

## 1. 今日速览
ZeroClaw 项目在过去24小时内保持高频活跃，处理了50个 Issues 和50个 PR，其中 Issues 关闭率达64%（32/50），显示核心维护者对 RFC 流程的高效推进。今日工作重心高度集中在**安全性加固**与**架构规范化**，特别是关于“执行前确认层级”、“内存生命周期解耦”以及“文件系统权限收敛”的 RFC 相继关闭并进入实施阶段。项目正处于从设计（RFC）向落地（PR）转化的关键窗口期，无新版本发布，但底层安全契约正在快速完善。

## 2. 版本发布
*   **状态：** 无新版本发布。
*   **备注：** 多个高优先级 RFC（如 #7155, #8303, #9103）已获 `status:accepted`，预计将随下一主要迭代并入主分支，需关注 `v0.9.0` 相关里程碑标签。

## 3. 项目进展
今日合并/关闭的重要 PR 主要集中在安全边界修复和运行时稳定性增强：

*   **浏览器自动化安全收敛 (PR #9830)**
    *   **内容：** 将完整的浏览器自动化功能从默认的 `browser_open` 中剥离，改为**显式可选（opt-in）**。
    *   **意义：** 解决了无头守护进程（headless daemon）默认启用全功能浏览器自动化带来的潜在安全风险，符合最小权限原则。
    *   **链接：** https://github.com/zeroclaw-labs/zeroclaw/pull/9830

*   **OIDC Token 验证强化 (PR #10255)**
    *   **内容：** 实现了 `oidc.<alias>` 的 token 验证配置边界，支持 RFC 9068 类型的访问令牌，并强化了签名、颁发者、受众、有效期等多维度校验。
    *   **意义：** 完善了身份访问基础设施，为后续更复杂的入站认证机制奠定基础。
    *   **链接：** https://github.com/zeroclaw-labs/zeroclaw/pull/10255

*   **SOP 头部运行缺陷修复 (PR #9841)**
    *   **内容：** 修复了 Standardized Operation Procedures (SOP) 在无头模式下运行的多个阻塞性缺陷，接管并完成了此前由社区贡献者启动的工作。
    *   **意义：** 确保了自动化操作流程在无人值守场景下的稳定性。
    *   **链接：** https://github.com/zeroclaw-labs/zeroclaw/pull/9841

## 4. 社区热点
今日讨论最激烈的议题集中在架构治理、内存管理和安全策略：

*   **内存生命周期与存储后端解耦 (Issue #6850)**
    *   **热度：** 26条评论
    *   **核心诉求：** 用户和维护者认为 `Memory` trait 不应同时拥有后端存储操作和生命周期治理逻辑。主张将“ Consolidation 和 Governance”决策从具体的 gateway/channel/backend 调用中分离出来。
    *   **状态：** 已关闭（Accepted）。
    *   **链接：** https://github.com/zeroclaw-labs/zeroclaw/issues/6850

*   **Chat Completions Profile 标准化 (Issue #8603)**
    *   **热度：** 25条评论
    *   **核心诉求：** 希望 ZeroClaw 原生支持 OpenAI Chat Completions 协议，以便无缝接入 Open WebUI、LobeChat、Continue.dev 等主流客户端，而不仅仅依赖 WebSocket 或 ACP。
    *   **状态：** 已关闭（Accepted）。
    *   **链接：** https://github.com/zeroclaw-labs/zeroclaw/issues/8603

*   **高风险 Shell 命令的分层确认策略 (Issue #7155)**
    *   **热度：** 24条评论
    *   **核心诉求：** 引入类似 Claude Code 的命令模式策略（allow/ask/deny），针对高风险 shell 命令实施基于执行上下文的确认层级，而非一刀切的拦截。
    *   **状态：** 已关闭（Accepted），且有对应 PR #10610 正在实施 Phase 0+1。
    *   **链接：** https://github.com/zeroclaw-labs/zeroclaw/issues/7155

*   **Goal Mode v1 有界前台工作 (Issue #8303)**
    *   **热度：** 23条评论，1个 👍
    *   **核心诉求：** 需要一个持久化的机制让 Agent 在多轮对话中追求有界的用户目标，同时避免将重启交接、通道准入和异步子工作耦合在首发版本中。
    *   **状态：** 已关闭（Accepted）。
    *   **链接：** https://github.com/zeroclaw-labs/zeroclaw/issues/8303

## 5. Bug 与稳定性
今日关闭和开放的 Bug 修复主要围绕运行时安全和异常恢复：

*   **[严重] 主机 Launchers 工作目录解析错误 (PR #10381 - OPEN)**
    *   **描述：** Unix 主机 launchers 在应用工作目录之前未解析为规范绝对路径，可能导致沙箱逃逸或执行错误环境下的二进制文件。
    *   **状态：** 待维护者审查，高风险 (risk:high)。
    *   **链接：** https://github.com/zeroclaw-labs/zeroclaw/pull/10381

*   **[严重] 文件系统变更未限制在工作区内 (PR #9977 - OPEN)**
    *   **描述：** 共享数据目录未被确立为备份和保留的权威源，文件写入操作可能通过符号链接或文件系统漏洞超出授权路径。
    *   **状态：** 待维护者审查，高风险 (risk:high)。
    *   **链接：** https://github.com/zeroclaw-labs/zeroclaw/pull/9977

*   **[中等] ZeroCode 会话重置导致运行中 Turns 被取消 (PR #10801 - OPEN)**
    *   **描述：** 通知通道溢出（`TryRecvError::Lagged`）时，`begin_session_resync` 会错误地取消正在运行的 Agent turn。
    *   **状态：** 待维护者审查，高风险 (risk:high)。
    *   **链接：** https://github.com/zeroclaw-labs/zeroclaw/pull/10801

*   **[中等] Anthropic 视觉能力错误门控失效 (PR #10904 - OPEN)**
    *   **描述：** 当模型不支持视觉但用户消息包含图像标记时，`resolve_vision_provider` 会错误地导致整个 turn 失败，而非仅拒绝图像处理。
    *   **状态：** 已创建，待审查。
    *   **链接：** https://github.com/zeroclaw-labs/zeroclaw/pull/10904

*   **[低] SOP 全局并发上限未暴露给操作员 (PR #10608 - OPEN)**
    *   **描述：** `sop.max_concurrent_total` 配置项在 UI 或日志中不可见，导致操作员无法诊断并发瓶颈。
    *   **状态：** 待作者行动 (needs-author-action)。
    *   **链接：** https://github.com/zeroclaw-labs/zeroclaw/pull/10608

## 6. 功能请求与路线图信号
基于已接受的 RFC 和进行中的 PR，以下功能极可能纳入下一版本：

1.  **OpenAI Chat Completions 协议支持：** RFC #8603 已接受，虽无直接 PR 展示，但结合 PR #10605（传递 Anthropic 扩展思考模式），表明项目正在积极打通与 OpenAI 兼容生态的互操作性。
2.  **细粒度 Shell 权限策略：** RFC #7155 已进入实施阶段（PR #10610 实现 Phase 0+1），未来版本将支持 per-execution confirmation tier。
3.  **内存架构重构：** RFC #6850 和 #9103 均已被接受，预示着一系列 PR 将陆续出现，以实现权威内存存储与可选富化连接器（enrichment connectors）的分离。
4.  **Goal Mode 持久化：** RFC #8303 (v1) 和 #9702 (v2) 的连续接受表明，“目标模式”将是下一阶段的重量级功能，重点解决跨重启的任务续接和 Web 控制面板集成。
5.  **A2A 外部代理出站支持：** RFC #9106 已接受，旨在允许 ZeroClaw Agent 主动调用外部 A2A 兼容代理，促进多智能体协作。

## 7. 用户反馈摘要
*   **互操作性痛点：** 用户强烈呼吁 ZeroClaw 能够像原生工具一样被现有的 AI 客户端生态（如 Continue.dev, LangChain）所使用，而不仅仅是作为一个独立的 daemon。（来源：#8603, #6165）
*   **安全透明度需求：** 用户对“保存配置”后安全策略是否真正生效存在疑虑，迫切需要热重载机制而非完全重启，以及更清晰的凭证边界定义。（来源：#7897, #9127）
*   **长任务稳定性：** 用户在使用 Goal Mode 或长时间运行的 SOP 时，遇到了因会话重置或通知堆积导致的任务中断问题，对“无感知的持续工作”有强烈需求。（来源：#10801, #8303）
*   **资源可见性：** 操作员反映无法直观看到全局并发限制和 token 使用统计，导致故障排查困难。（来源：#10608, #9713）

## 8. 待处理积压
以下 PR 和 Issue 需要维护者尽快关注，部分已停滞较长时间：

*   **PR #10381:** 安全关键修复，解决 host launchers 路径解析问题，风险等级高，亟待审查。
*   **PR #9977:** 文件系统隔离修复，防止越权写入，风险等级高。
*   **PR #10801:** 修复 ZeroCode 会话同步时的任务取消 bug，影响用户体验。
*   **Issue #7821:** WASM 插件生命周期观察者订阅，长期处于 OPEN 状态，可能影响插件生态扩展。
*   **Issue #7141:** 可插拔入站认证和标准主体 RFC，虽然已关闭（Accepted），但相关实施 PR 进展需跟进。

---
*报告生成时间：2026-09-21 | 分析师：Agnes (Sapiens AI)*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-09-21**

## 1. 今日速览
今日 PicoClaw 社区活跃度中等，共收到 6 条 Issue 更新与 5 条 PR 更新。项目核心进展在于 IRCv3 长消息支持的代码合并与 Web UI 性能优化的反馈收集。与此同时，**DingTalk 通道在 v0.3.1 版本中重现崩溃问题**，成为当日最紧迫的稳定性隐患，需引起维护者高度关注。整体来看，项目处于功能扩展（IRC/OpenAI兼容）与存量 Bug 修复并行的阶段。

## 2. 版本发布
**无新版本发布。**

## 3. 项目进展
今日有 2 条 PR 状态更新（1 关闭/合并，1 更新）：
*   **PR #3367 (已关闭)**: 补充了 Pilot MCP 设置文档，明确了健康检查命令及配置保留逻辑，完善了开发者接入体验。
*   **PR #3383 (已关闭)**: 提交了 v0.11.0 Sprint 计划文档，明确了 agentic web3、模块信任及 ACP/mesh 深度的设计路线，为后续迭代确立了路线图框架。

## 4. 社区热点
*   **高关注度 Bug 反馈**: **#3281** (12评论, 2👍) - 用户报告 Web UI 聊天历史较长时输入框严重卡顿。此问题反映了长上下文存储与前端渲染性能之间的瓶颈，是提升用户体验的关键痛点。
*   **新功能需求**: **#3366** - 请求支持 OpenAI 兼容提供商（如自托管路由器 9Router）。结合 **#3369** (已关闭)，显示社区对扩展 LLM 提供商兼容性的强烈需求，目前已通过 Header 支持解决部分场景。
*   **协议扩展**: **#3287** - 探讨 IRCv3 长消息处理机制，旨在解决 IRC 512字节限制导致的消息截断问题。

## 5. Bug 与稳定性
**[严重] DingTalk 通道崩溃回归**
*   **#3382 [OPEN]**: 用户 @HenryLoveMiller 报告在 **v0.3.1** (commit `2cf030d2`) 中，DingTalk Stream SDK 重连时仍触发 `panic: send on closed channel` (`client.go:161`)。
*   **关联**: 该问题是 **#973** (已关闭) 的复现。尽管 #973 曾被关闭，但根本原因在 v0.3.1 中未彻底解决，属于**稳定性回归**。
*   **建议**: 需优先排查 `dingtalk-stream-sdk-go` v0.9.1 与 PicoClaw 内部协程生命周期的边界条件。

**[中等] Web UI 性能问题**
*   **#3281**: Web UI 在长历史记录下输入滞后，影响交互流畅度，虽非崩溃但严重影响可用性。

## 6. 功能请求与路线图信号
*   **OpenAI 兼容提供商支持**: **#3366** 提出增加自定义 OpenAI 兼容 Provider。这与 **#3369** (已解决 OpenCode Go Session Header) 形成互补，表明路线图正逐步完善对多样化 LLM 后端的适配能力。
*   **IRCv3 多行消息支持**: **#3287** 与 **PR #3354** 对应。PR #3354 提出了实现方案（请求 `draft/multiline` 等能力），若合并将直接响应此 Feature 请求。
*   **v0.11.0 路线图**: **#3383** 确认了下一阶段重点聚焦于 Agentic Web3 和模块化信任体系。

## 7. 用户反馈摘要
*   **性能敏感**: 用户 @xpader 指出 Web UI 前端在 Handling 长历史 Context 时缺乏优化，暗示需要虚拟滚动或分页加载机制。
*   **协议规范性**: IRC 用户群体期望 PicoClaw 能更好地遵循 IRCv3 标准（如消息聚合），以减少因客户端截断导致的信息丢失。
*   **配置灵活性**: 用户希望 OAuth Token 刷新时能保留 Provider 特定的 Scope 配置，而非使用硬编码默认值（参见 **#3378**）。

## 8. 待处理积压
*   **#3382 (DingTalk Panic)**: **最高优先级**。作为已知 Bug (#973) 的回归，且在最新 v0.3.1 中复现，建议维护者尽快介入调试。
*   **#3281 (Web UI Lag)**: 涉及核心交互体验，建议纳入性能优化专项。
*   **#3287 / PR #3354 (IRC Long Messages)**: 功能请求与对应 PR 并存，建议审查 PR #3354 以加速合并，关闭 Issue #3287。
*   **#3378 (OAuth Scopes Fix)**: 修复 Token 刷新逻辑的 PR 仍开放，建议合并以完善 OAuth 稳定性。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-09-21

## 1. 今日速览

QwenPaw 2.2.2-beta.3 今日发布，聚焦 console 响应恢复与 selector 修复。过去 24 小时社区高度活跃：24 条 Issue、37 条 PR、1 个新版本。多租户 Hub 路线图（#7318，31 评论、4 赞）引领功能讨论，同时多个关键 Bug（会话丢失 #7724、tool_result_pruner #7853、idle cleanup #7895）得到及时响应。项目整体健康度**良好**，bug 修复节奏快，用户参与度持续上升。

---

## 2. 版本发布

### v2.2.2-beta.3
**链接**: https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.3

**更新内容**:
- `fix(console): restore assistant response actions` — 恢复会话结果处理
- `fix(e2e): re-anchor console selectors broken by #7502 redesign` — 修复选择器锚定

**迁移注意事项**: 本次为 beta 版本，建议仅测试环境使用。#7502 重构引入的 selector 回归已修复，生产环境建议等待正式 2.2.2 发布。

---

## 3. 项目进展

### 关键合并 PR

| PR | 类型 | 说明 | 链接 |
|---|---|---|---|
| #7904 | Bug Fix | 修复 qwenpaw-pet 插件 approval actor 丢失问题（#7856） | https://github.com/agentscope-ai/QwenPaw/pull/7904 |
| #7886/#7887 | Bug Fix | 处理 input_audio 未知变体拒绝，增强音频 fallback 分类器 | https://github.com/agentscope-ai/QwenPaw/pull/7886 |
| #7345 | Bug Fix | 修复工具卡片停止后永久显示"执行中"问题 | https://github.com/agentscope-ai/QwenPaw/pull/7345 |
| #7862 | CI | 严格化 release gate，E2E watch 设为阻塞 | https://github.com/agentscope-ai/QwenPaw/pull/7862 |
| #7901 | CI | 释放 release freeze 不再等待 cron，加速合并流程 | https://github.com/agentscope-ai/QwenPaw/pull/7901 |
| #7894 | Test | 前端单元测试覆盖提升 +3.19%（64.45% → 67.65%） | https://github.com/agentscope-ai/QwenPaw/pull/7894 |

**整体进展评估**: 项目正在快速修复 2.2.x 系列关键 bug，同时加强测试覆盖和 CI 流程。多租户路线图、模型统一发现、MCP 集成等战略功能持续推进。

---

## 4. 社区热点

### 🔥 最活跃 Issues

| Issue | 标题 | 评论 | 赞 | 链接 |
|---|---|---|---|---|
| #7318 | QwenPaw 多租户版 Hub 2.2.0 路线图 | 31 | 4 | https://github.com/agentscope-ai/QwenPaw/issues/7318 |
| #7853 | ToolResultPruner 跳过媒体块导致 base64 无限累积 | 6 | 0 | https://github.com/agentscope-ai/QwenPaw/issues/7853 |
| #7724 | 会话丢失 bug | 5 | 0 | https://github.com/agentscope-ai/QwenPaw/issues/7724 |
| #7888 | Chat 页面 stuck on "Something went wrong" | 4 | 0 | https://github.com/agentscope-ai/QwenPaw/issues/7888 |
| #5567 | GitHub Issue 反馈助手 Skill | 2 | 2 | https://github.com/agentscope-ai/QwenPaw/issues/5567 |

**热点分析**:
- **#7318 多租户 Hub** 引发 31 条评论，显示社区对团队协作功能强烈需求，相关请求 #2324 已讨论
- **#5567 反馈助手 Skill** 获 2 赞，用户主动贡献自动写 Issue 工具，反映社区建设积极性
- **#7853 ToolResultPruner** 暴露大模型上下文管理的关键设计缺陷，base64 图片无法裁剪直接影响成本与稳定性

---

## 5. Bug 与稳定性

### 高严重程度（影响核心功能）

| Issue | 描述 | 状态 | Fix PR |
|---|---|---|---|
| #7724 | **会话丢失** — 对话历史在重启后无法恢复 | OPEN | 无 |
| #7853 | **ToolResultPruner 绕过媒体块** — base64 无限累积撑爆上下文 | OPEN | 无 |
| #7895 | **Idle cleanup 消息丢失** — 清理时丢弃新消息 | OPEN | #7896 |
| #7888 | **Chat 页面 stuck** — React insertBefore NotFoundError | OPEN | 无 |

### 中严重程度（功能异常）

| Issue | 描述 | 状态 | Fix PR |
|---|---|---|---|
| #7856 | qwenpaw-pet 0.1.1 破坏 tool approvals | OPEN | ✅ #7904 (已合并) |
| #7882 | OpenCode 免费模型 403 FreeTierError | OPEN | 无 |
| #7883 | PDF 序列化格式不符合 OpenAI 规范 | OPEN | 无 |
| #7859 | Prompt injection 指令注入 | OPEN | 无 |
| #7900 | Hub 认证不支持 ?token= 参数 | CLOSED | - |
| #7876 | DeepSeek 拒绝 input_audio 导致会话永久挂起 | CLOSED | ✅ #7886/#7887 |

### 低严重程度（体验问题）

- #7884: 聊天记录历史过短无法回溯
- #7648: 网页标题自定义需求
- #7866: File-area 标签页编辑后不刷新

**稳定性评估**: 本周共关闭 6 个 Issue，修复 3 个关键 Bug。主要风险点集中在 **会话持久化**、**上下文裁剪**、**清理逻辑竞态条件** 三个子系统。

---

## 6. 功能请求与路线图信号

### 高优先级信号

| 需求 | Issue/PR | 状态 | 可能性 |
|---|---|---|---|
| **多租户 Hub** | #7318 | 路线图讨论中 | ⭐⭐⭐⭐⭐ 2.2.0 重点 |
| **模型统一发现与定价** | #7899 (PR) | 开放评审 | ⭐⭐⭐⭐ 可能 2.2.x |
| **ReMeLight 独立记忆模型** | #7719 (PR) | 开放 | ⭐⭐⭐⭐ 成本优化 |
| **AgentScope Platform 内置 Provider** | #7843 (PR) | 已合并 | ✅ 已纳入 |
| **社区 Feed 与 Inbox 集成** | #7903 (PR) | 开放 | ⭐⭐⭐ 长期 |
| **网页标题自定义** | #7648 | 未响应 | ⭐⭐ 低优先级 |

### 路线图推断
结合 Issue #7318 讨论和 PR #7899 工作，**2.2.0 核心方向**为：
1. 多租户 Hub 架构
2. Provider/模型管理系统重构
3. 记忆系统独立化（ReMeLight）
4. 社区功能集成

---

## 7. 用户反馈摘要

### 核心痛点

**1. 会话持久性与可靠性**
> "对话丢失，在控制-会话中完全找不到。之前我就反复遇到过模型丢失的问题" — @xiaohushi512 (#7724)

用户反馈会话历史在意外关闭后无法恢复，这是**最高频投诉**之一。

**2. 大模型上下文成本失控**
> "base64 图片永远不会被裁剪，无论配置怎么调都会超出上下文窗口" — @jcs130 (#7853)

ToolResultPruner 的媒体块绕过行为导致用户实际使用中频繁触发 token 限额。

**3. 多标签页管理困难**
> "有很多个面板对应 7、8 个项目，每次打开都是'QwenPaw Console'，容易搞错" — @rj52077 (#7648)

多实例用户缺乏基本的 tab 识别能力。

**4. 零停机 Reload 不一致**
> "修改 agent 配置触发 reload 后，runtime hook 被静默丢弃，只有 middleware 保留" — @vincy-ch (#7890)

**满意点**:
- 社区贡献自动写 Issue Skill (#5567)，降低反馈门槛
- QCI/Ops 团队持续改进测试覆盖和 release 流程

---

## 8. 待处理积压

### 需立即关注

| Issue | 风险 | 建议 |
|---|---|---|
| #7724 会话丢失 | **生产级** | 排查 session storage 生命周期，检查 crash recovery |
| #7853 ToolResultPruner 媒体绕过 | **成本级** | 扩展 prune_output 支持 type="data" 块 |
| #7888 Chat stuck | **体验级** | 检查 React DOM 操作边界，复现 insertBefore 失败场景 |
| #7890 零停机 reload hook 丢失 | **架构级** | 审查 register_runtime_hook vs register_middleware 的差异 |

### 长期积压

| Issue | 状态 | 建议 |
|---|---|---|
| #7859 Prompt injection | OPEN | 加强 system-reminder 过滤 |
| #7882 OpenCode 403 | OPEN | 验证 provider 鉴权逻辑 |
| #7648 标题自定义 | OPEN | 低优先级，纳入未来 UX 优化 |

---

## 项目健康度评分

| 维度 | 评分 | 说明 |
|---|---|---|
| 响应速度 | ⭐⭐⭐⭐⭐ | 24h 内 6 个 Bug 关闭，关键 fix PR 快速合并 |
| 代码质量 | ⭐⭐⭐⭐ | 测试覆盖提升 3.19%，CI gate 严格化 |
| 用户参与 | ⭐⭐⭐⭐⭐ | 31 评论热帖，社区贡献 Skill |
| 路线图清晰度 | ⭐⭐⭐⭐ | 多租户 Hub 方向明确，PR 矩阵清晰 |
| 稳定性 | ⭐⭐⭐ | 会话持久化、上下文裁剪仍需加固 |

**综合评价**: QwenPaw 2.2.x 正处于**快速迭代修复期**，核心 bug 响应及时，社区参与度高。建议优先解决 #7724 和 #7853 两个影响用户体验和成本的关键问题。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期**：2026-09-21  
**数据来源**：GitHub Issues & PRs (past 24h)

---

## 1. 今日速览

hermes-agent 在过去24小时内保持了极高的社区活跃度，共处理 **500 条 Issue** 和 **500 条 PR**，其中 Issue 关闭率达 **60.2%** (301/500)，PR 合并/关闭率达 **70.6%** (353/500)，显示维护团队响应迅速。今日无新版本发布，但大量 Bug 修复已合并，主要集中在 **Desktop 会话状态管理**、**Windows Bash 兼容性**、**插件加载时序** 及 **MCP 服务器稳定性** 等核心痛点。项目整体健康度高，技术债务清理动作频繁。

---

## 2. 版本发布

**无新版本发布**。

---

## 3. 项目进展

今日合并/关闭的重要 PR 主要集中在稳定性修复与体验优化：

- **Desktop 粘贴板安全修复** (#117669)：解决大文本粘贴时工作目录不一致导致的附件丢失问题，将粘贴文件统一写入 `<HERMES_HOME>/composer-pastes`。
- **委托超时逻辑修正** (#116033)：修复 `child_timeout_seconds` 仅限制总运行时间而非非活跃时间的缺陷，提升长时任务控制的准确性。
- **会话内核回收机制优化** (#117203)：修复空闲会话内核仅在新请求时才会被回收的懒加载问题，避免资源泄漏。
- **上下文长度动态刷新** (#116661)：修复模型切换时上下文长度配置未同步的问题，确保实时生效。
- **Windows Bash 路径兼容** (#117078, #116976)：解决 Windows 环境下 Git Bash 被 WSL stub 覆盖导致的命令执行失败，并修正 SKILL.md 内联 shell 的路径解析。
- **插件标签解析修复** (#116618)：修复插件目录中锚定注解标签时 SHA 校验失败的问题，提升插件安装稳定性。

> **进展评估**：项目正系统性清理长期积累的会话状态管理（session state）和跨平台兼容性（尤其是 Windows）技术债务，为后续复杂多网关协作功能奠定基础。

---

## 4. 社区热点

以下 Issues 评论数最多，反映当前社区核心关注点：

### 🔥 #88584 [OPEN] Automated Nous integration is blocked (124 comments)
- **链接**: https://github.com/NousResearch/hermes-agent/issues/88584
- **分析**：Nous 自动集成因 cron 模块冲突而阻塞，社区高度关注自动化流水线的稳定性与合并策略。

### 🔥 #97681 [OPEN] Let Bots collaborate across gateways (28 comments)
- **链接**: https://github.com/NousResearch/hermes-agent/issues/97681
- **分析**：用户强烈期望支持跨网关 Bot 协作，无需依赖 Desktop 常驻。这是向去中心化、高可用架构演进的关键需求。

### 🔥 #25267 [OPEN] Claude Agent SDK model provider with subscription OAuth (20 comments, 57 👍)
- **链接**: https://github.com/NousResearch/hermes-agent/issues/25267
- **分析**：57 个点赞表明用户对 **"订阅制计费"** 模式的巨大热情，希望避免 API 二次付费，是产品商业化模式的重要信号。

### 🔥 #112639 [OPEN] RFC: script-speed computer use via semantic state (15 comments)
- **链接**: https://github.com/NousResearch/hermes-agent/issues/112639
- **分析**：社区探讨通过语义状态和超前执行实现"脚本级"电脑操控速度，代表了对 Agent 执行效率的极致追求。

### 🔥 #71650 [OPEN] Toolset validation runs before plugin load (12 comments)
- **链接**: https://github.com/NousResearch/hermes-agent/issues/71650
- **分析**：插件注册工具集时触发误报警告，影响用户体验，属于明显的时序 Bug。

---

## 5. Bug 与稳定性

按严重程度排列的今日关键 Bug：

| 严重级别 | Issue/PR | 描述 | Fix 状态 |
|---------|---------|------|---------|
| **P1** | [#100573](https://github.com/NousResearch/hermes-agent/issues/100573) | Desktop 在 Linux 上因 `string_view::substr` 越界触发 SIGTRAP 崩溃 | ❌ 未修复 |
| **P1** | [#110054](https://github.com/NousResearch/hermes-agent/issues/110054) | WAL 删除防护触发后无产品内恢复机制，导致 13 个 Issue 集中爆发 | ❌ 未修复 |
| **P1** | [#86106](https://github.com/NousResearch/hermes-agent/issues/86106) | Desktop 消息持久化到错误会话（会话泄漏） | ❌ 未修复 |
| **P2** | [#95459](https://github.com/NousResearch/hermes-agent/issues/95459) | Desktop 重启后 in-app browser 拒绝所有 agent 操作 | ❌ 未修复 |
| **P2** | [#76767](https://github.com/NousResearch/hermes-agent/issues/76767) | Telegram 会话在 Desktop 查看时消息不发送 | ❌ 未修复 |
| **P2** | [#114663](https://github.com/NousResearch/hermes-agent/issues/114663) | opencode-go provider 返回 400 错误（tool name 字段问题） | ✅ [#114663](https://github.com/NousResearch/hermes-agent/pull/114663) 已关闭 |
| **P2** | [#103746](https://github.com/NousResearch/hermes-agent/issues/103746) | MCP 服务器连接后 60-90 秒断开 | ✅ [#103746](https://github.com/NousResearch/hermes-agent/pull/103746) 已关闭 |
| **P2** | [#103904](https://github.com/NousResearch/hermes-agent/issues/103904) | Cron 定时任务时区持久化为 UTC，导致延迟 2 小时 | ❌ 未修复 |

> **稳定性警示**：会话状态一致性（#110054, #86106, #95459）是当前最脆弱的环节，建议优先处理。

---

## 6. 功能请求与路线图信号

### 高优先级需求（可能纳入近期版本）

1. **Claude 订阅 OAuth 支持** (#25267)
   - 用户愿用 57 个赞投票支持，商业价值显著。
   - 建议：评估与 Anthropic 官方合作或实现 OAuth 代理方案。

2. **跨网关 Bot 协作** (#97681)
   - 符合去中心化 Agent 架构趋势。
   - 已有相关组件（gateway, desktop, sessions），技术可行性较高。

3. **自动推理模式** (#40306)
   - ChatGPT 风格的自适应 `reasoning_effort`，提升易用性。

4. **拼写检查** (#48375)
   - Desktop 聊天输入框缺乏拼写检查，8 个点赞，低成本高回报改进。

5. **专属网关告警通道** (#76780)
   - 将网关生命周期通知与主聊天频道分离，提升运维清晰度。

### 路线图信号
- **语义化电脑控制** (#112639) 和 **自调优 Harness** (#111237) 反映社区对 Agent 自主进化能力的深度探索，可能指向长期研究方向。

---

## 7. 用户反馈摘要

### 痛点
- **会话状态混乱**：用户多次报告消息错乱、会话泄漏、checkpoint 恢复失败，严重影响信任度。
- **Windows 环境体验差**：Bash 路径解析、Node.js 依赖安装慢（~8-10 分钟）、CRLF 换行符问题频发。
- **计费模式焦虑**：Claude 订阅用户担心双重付费，对 API 计费透明度敏感。
- **MCP 服务器稳定性**：外部 MCP 服务器连接后频繁断开，阻碍工具扩展。

### 满意点
- **快速响应**：大量 Bug 在 24-48 小时内得到修复或确认。
- **插件生态活跃**：社区贡献 `hermes-oc-free-provider`、Orbit Desktop 等插件。
- **RFC 讨论开放**：允许用户参与架构设计（如 #112639）。

---

## 8. 待处理积压

以下长期未响应 Issue 需维护者关注：

1. **#88584** [OPEN] Automated Nous integration is blocked (124 comments)
   - 阻塞自动化流程，需尽快解决合并冲突。

2. **#100573** [OPEN] Desktop SIGTRAP crash on Linux (9 comments)
   - P1 级崩溃，影响 Linux 用户稳定性。

3. **#110054** [OPEN] WAL guard 无恢复机制 (6 comments)
   - 本周 13 个 Issue 的根因，需产品设计层面的解决方案。

4. **#86106** [OPEN] Desktop 消息持久化到错误会话 (6 comments)
   - 数据完整性问题，可能导致用户数据丢失。

5. **#103904** [OPEN] Cron 任务时区漂移 (6 comments)
   - 时区处理 Bug，影响全球用户定时任务。

---

**报告生成时间**：2026-09-21  
**分析师**：Agnes (Sapiens AI)

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目日报 — 2026-09-21

## 1. 今日速览

AstrBot 社区今日保持**高频活跃**，过去24小时新增 6 条 Issues、20 条 PR，其中 4 条 PR 已合并（含 3 条 Bug Fix）。项目健康度良好：关键 Issue 均有对应 PR 跟进，修复链路完整。今日无新版本发布，社区贡献者集中响应安全与稳定性需求，整体向前推进显著。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

### 今日合并/关闭的重要 PR（4 条）

| PR | 作者 | 类型 | 说明 |
|---|---|---|---|
| [#7735](https://github.com/AstrBotDevs/AstrBot/pull/7735) | @Blueteemo | Bug Fix | 修复流式响应中工具调用名重复拼接问题（`astr_kb_searchastr_kb_search`） |
| [#8127](https://github.com/AstrBotDevs/AstrBot/pull/8127) | @Blueteemo | Feature | 让 LLM 能自主创建和安装 Skill（Neo Skills 工具链扩展） |
| [#7939](https://github.com/AstrBotDevs/AstrBot/pull/7939) | @Blueteemo | Bug Fix | 修复子代理无法使用内置工具（如 `web_search_tavily`）的问题 |
| [#10134](https://github.com/AstrBotDevs/AstrBot/pull/10134) | @Soulter | Improvement | 将本地网络策略提示移入系统提示词，避免在每次工具结果中重复累积 |

**整体评估：** 今日合并的 PR 覆盖了**流式处理、子代理工具链、Skill 管理、提示词工程**四个维度，均为高价值改进。项目稳定性与用户体验同步推进。

---

## 4. 社区热点

### 🔥 讨论最活跃的 Issues

**1. [Issue #10109](https://github.com/AstrBotDevs/AstrBot/issues/10109) — 知识库上传成功但文档数量为 0**
- 评论：4 | 👍：0
- **痛点：** 用户反馈知识库上传 Excel/Word 文档后，页面显示文档数和分片数均为 0，但接口无报错。日志显示 `"存储失败：文本块已生成，但写入知识库索引时出错"`。
- **状态：** 已有修复 PR [#10139](https://github.com/AstrBotDevs/AstrBot/pull/10139) 正在审查中，预计近期合并。
- **背后诉求：** 知识库功能是核心能力，用户依赖 FAISS 向量存储，错误信息模糊导致排查困难。

**2. [Issue #10161](https://github.com/AstrBotDevs/AstrBot/issues/10161) — 定时任务绕过插件过滤机制**
- 评论：2 | 👍：0
- **痛点：** `plugin_set` 配置的插件过滤仅覆盖普通消息流水线，定时任务（cron）触发的 agent 运行合成事件 `CronMessageEvent`，`event.plugins_name` 始终为 `None`，导致禁用插件仍可执行钩子。
- **状态：** 修复 PR [#10163](https://github.com/AstrBotDevs/AstrBot/pull/10163) 已提交，来自同一作者 @piexian。
- **背后诉求：** 多插件用户需要精确控制哪些插件在定时任务中运行，当前行为是安全隐患。

**3. [Issue #10158](https://github.com/AstrBotDevs/AstrBot/issues/10158) — 主 Agent 增加提示词注入防护与人格锚定**
- 评论：0 | 👍：0
- **痛点：** 用户提出两个**默认关闭**的安全增强功能：提示词注入防护（12 条中英双语规则）和人格锚定（避免模型跳回"作为一个 AI 助手"语气）。
- **状态：** 功能 PR [#10150](https://github.com/AstrBotDevs/AstrBot/pull/10150) 已提交。
- **背后诉求：** 安全合规需求上升，企业用户特别关注提示词泄露风险。

**4. [Issue #10154](https://github.com/AstrBotDevs/AstrBot/issues/10154) — 反向 WS 客户端重连后主动发送消息失败**
- 评论：0 | 👍：0
- **痛点：** 网络抖动重连后，所有主动发送消息（回复、插件推送等）瞬间抛出 `ApiNotAvailable`，直到重启才恢复。
- **状态：** 修复 PR [#10155](https://github.com/AstrBotDevs/AstrBot/pull/10155) 已提交。
- **背后诉求：** 生产环境稳定性问题，QQ/OneBot 适配器的长连接管理需要优化。

---

## 5. Bug 与稳定性

### 今日报告的高优先级 Bug

| Issue | 严重程度 | 状态 | 修复 PR |
|---|---|---|---|
| [#10109](https://github.com/AstrBotDevs/AstrBot/issues/10109) 知识库上传文档数为 0 | 🔴 High | 有 PR | [#10139](https://github.com/AstrBotDevs/AstrBot/pull/10139) |
| [#10161](https://github.com/AstrBotDevs/AstrBot/issues/10161) 定时任务绕过插件过滤 | 🔴 High | 有 PR | [#10163](https://github.com/AstrBotDevs/AstrBot/pull/10163) |
| [#10154](https://github.com/AstrBotDevs/AstrBot/issues/10154) 反向 WS 重连后发送失败 | 🟡 Medium | 有 PR | [#10155](https://github.com/AstrBotDevs/AstrBot/pull/10155) |

**评估：** 今日报告的 Bug 均有对应修复 PR，修复率 **100%**。无未处理的严重回归问题。

---

## 6. 功能请求与路线图信号

### 用户提出的新功能需求

| Issue | 需求描述 | 对应 PR | 纳入下一版本概率 |
|---|---|---|---|
| [#10137](https://github.com/AstrBotDevs/AstrBot/issues/10137) 远程桌面控制 | 服务器部署 astrbot 远程操控本地电脑 | 无 | 🟡 中等（需插件开发） |
| [#10160](https://github.com/AstrBotDevs/AstrBot/issues/10160) 拓展模型提供商 + cron 超时配置 | 增加 SiliconFlow 等 TTS/STT/嵌入供应商，cron 任务超时可自定义 | 无 | 🟢 高（配置项扩展） |
| [#10158](https://github.com/AstrBotDevs/AstrBot/issues/10158) 提示词注入防护 + 人格锚定 | 两个默认关闭的安全增强模块 | [#10150](https://github.com/AstrBotDevs/AstrBot/pull/10150) | 🟢 高（PR 已就绪） |

**路线图判断：** 安全增强（提示词防护、人格锚定）和模型提供商扩展是近期最明确的需求，预计下一版本会纳入。

---

## 7. 用户反馈摘要

### 真实用户痛点

1. **知识库功能稳定性不足** — 上传文档后显示"文档数为 0"，但接口无报错，排查困难。用户期待更友好的错误提示和自愈机制。

2. **插件过滤机制存在漏洞** — 定时任务绕过 `plugin_set` 配置，用户担心禁用插件仍会被执行，存在安全和资源浪费风险。

3. **反向 WebSocket 长连接管理脆弱** — 网络抖动重连后发送消息失败，需要重启才能恢复，影响生产环境可用性。

4. **远程桌面控制需求明确** — 云端部署 astrbot 控制本地电脑的需求真实存在，现有插件方案体验不佳。

### 用户满意点

- 修复响应速度快，关键 Issue 均在有 PR 跟进
- 安全功能（提示词注入防护）考虑周全，12 条内置规则覆盖中英双语
- 配置灵活性提升（cron 超时自定义、模型提供商扩展）符合用户期望

---

## 8. 待处理积压

### 长期未响应的重要 Issue/PR

| ID | 类型 | 创建时间 | 状态 | 建议 |
|---|---|---|---|---|
| [#10137](https://github.com/AstrBotDevs/AstrBot/issues/10137) | Feature | 2026-09-19 | 无 PR | 评估远程桌面控制架构可行性 |
| [#10160](https://github.com/AstrBotDevs/AstrBot/issues/10160) | Feature | 2026-09-20 | 无 PR | 规划模型提供商扩展和 cron 超时配置 |

### 需要关注的安全相关 Issue

- **[Issue #10158](https://github.com/AstrBotDevs/AstrBot/issues/10158)** — 提示词注入防护：建议快速审查并合并 PR [#10150](https://github.com/AstrBotDevs/AstrBot/pull/10150)，这是安全合规的关键功能。

---

**报告生成时间：** 2026-09-21  
**数据来源：** GitHub API（AstrBotDevs/AstrBot）  
**分析师：** Agnes-2.5-Flash

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：2026-09-21**

## 1. 今日速览
DeepSeek Harness (dsh) 社区在过去24小时内保持极高活跃度， Discussions 新增 **180** 条，显示出核心用户群对工具链稳定性的强烈关注。当前最高优先级问题集中在 **v0.1.6-alpha.2** 版本的源部署回归缺陷（`Cannot read properties of undefined (reading 'prepare')`），该 Bug 已引发至少 4 个独立的高热度 Issue，严重阻碍了开发者通过源码进行调试和二次开发。此外，围绕沙箱权限逻辑缺陷、模型会话状态损坏以及 SSRF 网关限制的网络隔离问题也引发了持续的技术辩论。项目尚未发布新的 Release，主要依靠 Alpha 版本迭代修复上述阻断性问题。

## 2. 版本发布
*   **状态**：无新版本发布（0 Releases）。
*   **当前活跃版本背景**：社区主要围绕 `v0.1.6-alpha.2` (commit `ddefc45fbc`) 与 `v0.1.5-rc.2` 进行对比测试和问题复现。

## 3. 项目进展
*   **已知缺陷修复追踪**：根据 Discussion #6520 的社区复核，在 0.1.5-rc.2 至 0.1.6-alpha.1 的演进区间（666 个提交）中，共确认 **1 项**次要 Bug 已修复，**1 项**转为部分修复待复测，其余多为路径漂移或非功能性变更。
*   **源部署构建流程异常**：多个报告指出，v0.1.6-alpha.2 在通过 `pnpm dsh` 进行源码启动时，出现模块解析失败。这暗示近期合并的 PR（如被提及的 PR #4471）可能引入了构建产物或 TypeScript 类型声明与运行时加载路径不一致的问题，导致 `dsh-tools` 包被双重实例化或引用丢失。

## 4. 社区热点
以下是过去 24 小时评论数最多、关注度最高的讨论主题：

1.  **[Bug] 0.1.6-alpha.2 源部署工具调用崩溃**
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/7035
    *   **热度**: 26 条评论
    *   **核心诉求**: 用户报告在源码运行模式下，任何涉及工具调用的回合均失败，报错 `Cannot read properties of undefined (reading 'prepare')`。这是当前社区最集中的痛点，严重影响调试工作流。

2.  **[Bug] 沙箱权限升级逻辑死锁**
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/201
    *   **热度**: 24 条评论
    *   **核心诉求**: 用户报告当 `sandbox_permissions` 的目标模式与当前模式相同时，系统必然抛出错误，且无法通过切换模式自愈，导致会话无法写入磁盘。

3.  **[Bug] 升级后历史会话损坏及新运行失败**
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/6986
    *   **热度**: 16 条评论
    *   **核心诉求**: 升级至新版本后，新开窗口报错同上，且历史会话因序列号验证失败（`stored session ... is corrupt`）而无法加载，造成数据丢失风险。

4.  **[Feature Request] SSRF 网关缺乏白名单逃逸机制**
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/5202
    *   **热度**: 10 条评论
    *   **核心诉求**: 在透明代理 Fake-IP DNS (198.18.0.0/15) 环境下，默认的 `web-fetch-http` 后端拒绝了所有外部请求，用户呼吁提供 resolver 或 allowlist 的逃逸出口以支持特定网络拓扑。

5.  **[Bug] 超长上下文下 Agent 陷入思考退化循环**
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/5976
    *   **热度**: 9 条评论
    *   **核心诉求**: `deepseek-v4.1-flash` 在 `max reasoning effort` 下，面对超长上下文时回合零产出且无自动熔断，需手动中止；而同配置的 `v4-flash` 未复发，疑似模型调度或上下文管理逻辑的回归。

## 5. Bug 与稳定性
今日报告的严重 Bug 主要集中在以下三类，按严重程度排列：

| 严重程度 | 问题描述 | 关联 Discussion | 状态 |
| :--- | :--- | :--- | :--- |
| **Critical** | **0.1.6-alpha.2 源码构建工具调用崩溃** (`prepare` undefined)。多个独立报告指向同一根因（PR #4471 或构建依赖解析问题）。 | [#7035](https://github.com/deepseek-ai/deepseek-harness/discussions/7035), [#7219](https://github.com/deepseek-ai/deepseek-harness/discussions/7219), [#7086](https://github.com/deepseek-ai/deepseek-harness/discussions/7086), [#6967](https://github.com/deepseek-ai/deepseek-harness/discussions/6967) | 无官方 Fix 确认 |
| **High** | **历史会话数据损坏**：升级后旧会话因序列号校验失败无法加载，提示 corrupt。 | [#6986](https://github.com/deepseek-ai/deepseek-harness/discussions/6986) | 无 Fix |
| **High** | **沙箱权限死选项**：目标权限等于当前权限时必然抛错，导致会话无法写盘。 | [#7154](https://github.com/deepseek-ai/deepseek-harness/discussions/7154), [#201](https://github.com/deepseek-ai/deepseek-harness/discussions/201) | 无 Fix |
| **Medium** | **子进程路由错误**：配置了子模型 Key，但所有请求仍路由至主模型，子模型零消耗。 | [#7295](https://github.com/deepseek-ai/deepseek-harness/discussions/7295) | 待排查 |
| **Medium** | **Goal 功能强制注入**：开启 Goal 后，Agent 无法被动等待，每次 idle 均被强制注入 goal 上下文，空转消耗 Token。 | [#4664](https://github.com/deepseek-ai/deepseek-harness/discussions/4664) | 无 Fix |
| **Low** | **语言设置不一致**：设置为中文思考，但模型实际输出英文思考内容。 | [#7127](https://github.com/deepseek-ai/deepseek-harness/discussions/7127) | 无 Fix |

## 6. 功能请求与路线图信号
*   **网络代理与 SSRF 绕过能力**：Discussion #5202 反映出用户对复杂网络环境（透明代理、Fake-IP）下的联网能力有强需求。当前默认的 SSRF 守卫过于严格，缺乏灵活性。
    *   *路线图信号*：未来版本可能需要引入更细粒度的 `network.allowlist` 或 `resolver` 配置项，以平衡安全性与可用性。
*   **Goal 模式的待机逻辑优化**：用户希望 Agent 在等待后台任务（如子进程、长耗时操作）时能够真正进入 `idle` 状态，而非被 Goal 机制频繁唤醒。
    *   *路线图信号*：可能需要在 Goal driver 中增加“静默期”或“非阻塞模式”配置。

## 7. 用户反馈摘要
*   **痛点**：**构建与部署体验恶化**是今日最强烈的反馈。多个长期存在的 Issue（如 #783, #1515 关于 `pnpm install` 后双副本问题的历史遗留）在 v0.1.6-alpha.2 中似乎再次复发或演变为新的形态。开发者感到沮丧，因为 `pnpm dsh` 是主要的本地开发和调试入口，其崩溃使得版本升级变得高风险。
*   **满意点**：尽管 Bug 较多，但社区讨论氛围积极，用户提供了详细的复现步骤、Commit Hash 和对照实验（如 #6520 的详尽复核），有助于快速定位问题。
*   **不满意点**：
    *   沙箱权限检查逻辑存在“死选项”，违背直觉（目标=当前应视为合法或无需操作，而非报错）。
    *   会话持久化机制脆弱，升级后历史数据丢失风险高。
    *   子模型路由配置失效，影响多模型调度场景。

## 8. 待处理积压
*   **紧急建议关注**：维护者需立即介入 **#7035**, **#7219**, **#6967**, **#7086** 形成的集群问题。这四个 Discussion 共同指向 v0.1.6-alpha.2 源码构建的工具调用崩溃，极有可能是同一个回归 Bug 引发的连锁反应。建议优先审查近期合并的工具层相关 PR（特别是 #4471）。
*   **历史遗留复现**：#783 和 #1515 描述的问题（profile 安装插件后工具失效）在本次 Alpha 版本中再次出现，表明之前的修复可能未彻底解决依赖解析的根本原因，需要根治而非临时规避。
*   **数据安全**：#6986 报告的会话损坏问题涉及用户数据安全，建议尽快发布补丁或公告，提供数据迁移或兼容方案。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*