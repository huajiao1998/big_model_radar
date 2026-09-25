# OpenClaw 生态日报 2026-09-25

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-25 00:07 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 — 2026-09-25

## 1. 今日速览
过去24小时，OpenClaw 维持高活跃开发节奏：Issues 更新 500 条（新开/活跃 450，关闭 50），PR 更新 500 条（待合并 371，已合并/关闭 129）。无新版本发布，但多个 P0 级稳定性问题集中爆发，主要集中在 2026.9.5→9.6 升级路径、MCP 初始化和模型目录工作线程死循环。社区反馈显示用户对会话状态一致性、Gateway 响应性和跨平台桌面音频功能关注度较高。整体健康度：**中度承压**，关键路径存在阻塞性回归，需紧急修复。

## 2. 版本发布
无新版本发布。最近版本为 2026.9.6（eb377ac），但多项严重 Bug 已在该版本中暴露。

## 3. 项目进展
今日合并/关闭的重要 PR（129 条）未在本次数据中展开详细列表，但从 Issues 关联可推断以下关键推进：
- **#157733**（`fix(update): release repair leases before recovery maintenance`）直接解决 #157234 更新恢复阻塞问题，由 `@fuller-stack-dev` 提交，状态为等待 proof。
- **#157555**（`refactor: receive channel webhooks on the Gateway HTTP port`）收尾多通道 webhook 重构，覆盖 Telegram/Feishu/Nextcloud 等，由 `@steipete` 主导，CI 和 live proof 已绿灯。
- **#157634**（`fix: keep gateway responsive during transcript and task database work`）缓解数据库竞争导致的 Gateway 事件循环饥饿，由 `@fuller-stack-dev` 提交，ready for maintainer look。

**整体推进评估**：维护者正聚焦于数据库锁、会话恢复和通道 webhook 重构等核心稳定性问题，但高质量合并速率受限于 P0 问题激增，项目处于"救火"阶段。

## 4. 社区热点
以下 Issues 评论数最多、讨论最激烈：

| 优先级 | Issue | 作者 | 评论数 | 核心诉求 |
|--------|-------|------|--------|----------|
| P1/P0 | [#144911](https://github.com/openclaw/openclaw/issues/144911) MCP server init timeout crashes Gateway | @itanyplus | 30 | stdio MCP 超时触发未处理 rejection，导致 Gateway 崩溃循环 |
| P2 | [#155753](https://github.com/openclaw/openclaw/issues/155753) Model-catalog expiry/rebuild loop pins CPU | @AgentZero-nccio | 23 | 模型目录 WorkerThread 无限重建，单核占用 100% |
| P0 | [#149538](https://github.com/openclaw/openclaw/issues/149538) Gateway ready but never serves (event loop starved) | @609NFT | 21 | 632-agent fleet 上 Gateway 健康检查超时，RSS 增长至 OOM |
| P1 | [#112423](https://github.com/openclaw/openclaw/issues/112423) Large SQLite transcript cleanup blocks event loop | @HermanZeng | 20 | 大会话清理在 Gateway 线程执行，导致事件循环饥饿 |
| P1 | [#98435](https://github.com/openclaw/openclaw/issues/98435) MCP loopback transport no auto-reconnect after restart | @alvelda | 14 | Gateway 重启后 CLI-MCP 链路未重握手，`recovered=1` 误导 |

**热点分析**：用户最关注**Gateway 稳定性**（崩溃、事件循环饥饿、数据库锁）和**MCP 集成可靠性**。P0 级问题（如 #149538、#157107）直接影响生产环境可用性，社区情绪偏向焦虑。桌面音频功能 PR（#157724-#157726）虽为新增功能，但未进入热点 Issue 榜，表明当前用户优先级更偏向修复而非增强。

## 5. Bug 与稳定性
按严重程度排列的 Bug/回归问题：

| 级别 | Issue | 摘要 | Fix PR 状态 |
|------|-------|------|-------------|
| **P0** | [#157107](https://github.com/openclaw/openclaw/issues/157107) | 2026.9.6：prepared-model-catalog worker 每 ~6s 重建插件生成，agent 运行永不被 admitted | 无直接 PR，但 #155753 相关 |
| **P0** | [#155859](https://github.com/openclaw/openclaw/issues/155859) | 2026.9.5：Gateway 启动时间随插件数量线性增长，discord/codex/weixin 插件占用 120s 发布预算 | 无直接 PR |
| **P0** | [#157234](https://github.com/openclaw/openclaw/issues/157234) | 更新恢复失败：active agent database lease 阻塞 Doctor --fix | **#157733** 已提交，等待 proof |
| **P0** | [#149538](https://github.com/openclaw/openclaw/issues/149538) | Gateway ready 但事件循环饥饿，所有 /health 探针超时 | 无直接 PR，#157634 部分缓解 |
| **P1** | [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP server init timeout 导致 Gateway 崩溃循环 | 无直接 PR |
| **P1** | [#145309](https://github.com/openclaw/openclaw/issues/145309) | claude-cli backend 忽略 CLAUDE_CONFIG_DIR，导致 transcript 查找失败 | 无直接 PR |
| **P2** | [#134925](https://github.com/openclaw/openclaw/issues/134925) | ARM64/Pi 上 Gateway 主线程每 turn 100% CPU（已 stale） | 无直接 PR |
| **P2** | [#119087](https://github.com/openclaw/openclaw/issues/119087) | Gateway 冷启动时间从 2026.7.1-beta.1 到 2026.7.2-beta.7 退化 2.5x | 无直接 PR |

**稳定性总结**：2026.9.5→9.6 升级路径存在多处严重回归，尤其是模型目录工作线程、插件激活和数据库锁竞争。仅 1 个 P0 Bug 有对应 PR（#157733），其余均未修复或仅部分缓解。

## 6. 功能请求与路线图信号
- **#99583** [Proposal] Intelligent Session Auto-Titling：懒生成、廉价模型、主题感知重命名。已有 LLM slug generator 基础，符合用户管理多会话的需求。
- **#41366** Durable natural-language rule learning + explicit multi-mention reply semantics：多 Agent 群聊中自然语言规则训练冲突问题，需跨 session/workspace 一致性。
- **#138279** Ship Linux companion builds for aarch64：用户请求官方 ARM64 Linux 桌面包（.deb + AppImage），当前仅 amd64。
- **#81960** Onboarding 支持多 provider/model 配置：简化初始设置流程。

**路线图判断**：上述需求均未在当前 PR 列表中体现直接实现，可能纳入 2026.9.7 Fixes Tracker（#157531）。但鉴于当前稳定性压力，新功能开发预计推迟至主要 Bug 修复后。

## 7. 用户反馈摘要
**痛点**：
1. **数据库锁竞争**：#112423、#148307 反映大 SQLite 数据库（>400MB）在 session reclamation 时阻塞 Gateway，导致超时和 OOM。
2. **MCP 集成脆弱**：#144911、#98435、#144797 指出 MCP 服务器初始化超时、重启后链路未恢复、配置残留等问题，影响工具调用可靠性。
3. **升级回归**：#157107、#157011、#152252 描述从 2026.9.5→9.6 升级后出现插件重建循环、更新回滚、配置 key 拒绝等阻断性问题。
4. **平台兼容性**：#134925（ARM64 CPU 占用）、#138279（Linux ARM64 桌面缺失）反映边缘硬件支持不足。

**满意点**：
- 桌面音频功能（PR #157724-#157726）正在推进，满足远程桌面声音监听需求。
- 通道 webhook 重构（#157555）有望统一 Telegram/Feishu 等接收路径，提升可维护性。
- `doctor --fix` 自动化修复能力持续改进（如 #157615 保留会话）。

**使用场景**：企业级多 Agent fleet（#149538 632-agent）、NAS 部署（#157011 Debian NAS）、Docker 沙箱 Agent（#143980）、跨平台桌面控制（macOS companion #135272）。

## 8. 待处理积压
以下长期未响应的重要 Issue/PR 需维护者关注：

| Issue/PR | 创建时间 | 状态 | 风险 |
|----------|----------|------|------|
| [#134925](https://github.com/openclaw/openclaw/issues/134925) Gateway 100% CPU on ARM64/Pi | 2026-09-01 | stale | ARM 生态用户流失 |
| [#119087](https://github.com/openclaw/openclaw/issues/119087) Gateway 冷启动退化 2.5x | 2026-08-04 | open | 容器/低配环境体验差 |
| [#92285](https://github.com/openclaw/openclaw/issues/92285) Parent subagent task stale_running after child lost | 2026-06-11 | open | 多 Agent 编排状态不一致 |
| [#72504](https://github.com/openclaw/openclaw/issues/72504) Feishu bot strips own @mention → NO_REPLY | 2026-04-27 | open | 飞书多 Bot 群聊失效 |
| [#157724-#157726](https://github.com/openclaw/openclaw/pull/157724) Desktop audio stack (5/7, 6/7, 7/7) | 2026-09-24 | waiting on author | 功能交付延迟 |
| [#127674](https://github.com/openclaw/openclaw/pull/127674) RFC 0029 CM4 harden Control Model | 2026-08-21 | waiting on author | 安全合规阻塞 |

**建议**：优先处理 P0/P1 稳定性 Bug（#157107、#149538、#144911），并加速桌面音频 PR 的 proof 提供。长期积压的 ARM64 和飞书问题需在 2026.9.7 前制定修复计划，避免生态碎片化。

---

## 横向生态对比

基于 2026-09-25 各开源项目社区动态，以下是横向对比分析报告：

## 1. 生态全景
2026年Q3的AI智能体开源生态呈现**“稳定性重构”与“企业化演进”**并行的态势。核心框架（OpenClaw、hermes-agent）正从功能扩张转向解决生产级痛点（事件循环饥饿、多租户安全），而专用客户端（AstrBot、QwenPaw）则通过快速修补回归漏洞来维持用户信任。整体健康度分化明显：具备成熟维护团队的项目（hermes、Zeroclaw）表现出高吞吐和快速响应，而新兴或单点依赖项目（DeepSeek Harness）则面临架构兼容性与用户体验的严峻挑战。

## 2. 各项目活跃度对比

| 项目 | Issue (24h) | PR (24h) | Release | 健康度评估 | 核心状态 |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **OpenClaw** | 500 | 500 | 无 | ⚠️ **中度承压** | 救火模式，P0级Gateway稳定性问题集中爆发 |
| **hermes-agent** | 500 | 500 | v0.21.5 | ✅ **优秀** | 成熟期批量交付，Issue关闭率78.8%，桌面端体验优化 |
| **Zeroclaw** | 27 | 50 | 无 | ✅ **高健康度** | 安全加固（OIDC）+ CI效率优化，S0数据丢失风险待修 |
| **QwenPaw** | 34 | 23 | 无 | ✅ **良好** | v2.2.x稳定性打磨，多租户Hub讨论热烈，UI回归已修复 |
| **AstrBot** | 7 | 12 | 无 | ✅ **良好** | 快速响应时区/Token估算Bug，WebUI功能完善中 |
| **PicoClaw** | 2 | 8 | 无 | ⚠️ **待观察** | 活跃度中等，PR积压，移动端多行输入体验痛点未解 |
| **DeepSeek Harness**| N/A (Disc 267) | N/A | v0.1.7-rc.2 | 🔴 **风险较高** | 历史迁移兼容性断裂，遥测Bug致会话锁死，用户信任受损 |

## 3. OpenClaw 在生态中的定位
*   **定位**：企业级多Agent Fleet编排的核心基础设施，侧重高并发下的Gateway稳定性与MCP生态集成。
*   **优势**：社区规模最大（Issues/PR吞吐最高），MCP初始化与多通道Webhook重构处于行业前沿。
*   **技术路线差异**：不同于hermes的“桌面优先”或Zeroclaw的“Rust原生安全”，OpenClaw聚焦于**Node.js事件循环与SQLite数据库的锁竞争优化**，这是其当前最大的技术负债也是护城河所在。
*   **社区规模**：与其他项目相比，OpenClaw的单Issue评论数（最高30+）和PR合并量级远超其他项目，显示其拥有最活跃的开发者群体，但也因此面临更高的回归测试压力。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求与现状 |
| :--- | :---: | :--- |
| **MCP/工具链稳定性** | OpenClaw, QwenPaw, AstrBot | OpenClaw需修复MCP超时崩溃与重连；QwenPaw需解决MCP streamable_http无自动重连；AstrBot正在增强MCP搜索能力。 |
| **多Agent/跨网关协作** | hermes-agent, Zeroclaw, OpenClaw | hermes推进跨网关Bot协作（#97681）；Zeroclaw设计Agent间会话消息机制（#11027）；OpenClaw支持632-agent Fleet场景。 |
| **上下文与Token管理** | QwenPaw, AstrBot | QwenPaw面临Context Compaction丢失Tool Call结构的P0 Bug；AstrBot修复了Token估算偏差导致的400错误。 |
| **企业级安全与权限** | Zeroclaw, hermes-agent, QwenPaw | Zeroclaw推进OIDC认证第三阶段；hermes修复CLI绕过系统配置的安全漏洞（#59293）；QwenPawHub多租户规划受关注。 |
| **平台兼容性** | OpenClaw, Zeroclaw, PicoClaw | OpenClaw关注ARM64 CPU占用与Linux桌面缺失；Zeroclaw修复Windows客户端死锁；PicoClaw修复移动端多行输入拆分Bug。 |

## 5. 差异化定位分析

*   **功能侧重**：
    *   **OpenClaw**：底层Runtime稳定性，适合构建大规模Agent集群。
    *   **hermes-agent**：桌面端极致体验与跨平台一致性，适合个人高级用户与开发者。
    *   **Zeroclaw**：Rust原生安全与SOP自动化，适合对数据安全与合规有严苛要求的企业场景。
    *   **QwenPaw**：多模态交互与企业级Hub管理，适合团队协作为中心的场景。
    *   **AstrBot/PicoClaw**：轻量化即时通讯机器人，侧重微信/QQ等国内社交平台的无缝集成。
    *   **DeepSeek Harness**：通用型本地Agent工作台，侧重开箱即用的桌面体验与插件生态。

*   **目标用户**：OpenClaw面向基础设施架构师；hermes/Zeroclaw面向技术极客与企业IT；AstrBot/PicoClaw面向C端社交机器人用户；QwenPaw面向企业团队协作团队。

## 6. 社区热度与成熟度

*   **快速迭代阶段**：**DeepSeek Harness**（高频发布但伴随高破坏性变更，用户焦虑感强）、**OpenClaw**（高吞吐开发，但处于“救火”修复期）。
*   **质量巩固阶段**：**hermes-agent**（高Issue关闭率，补丁发布节奏稳健）、**Zeroclaw**（专注安全加固与CI优化，技术债清理有序）。
*   **稳定维护阶段**：**QwenPaw**（bug修复集中，新功能按需推进）、**AstrBot**（反应迅速，问题闭环快）。
*   **低活跃/瓶颈期**：**PicoClaw**（PR积压，核心体验Bug未彻底解决）。

## 7. 值得关注的趋势信号

1.  **“稳定性税”成为主流成本**：OpenClaw和QwenPaw的P0 Bug均集中在数据库锁、事件循环饥饿和上下文压缩等底层机制，表明智能体框架已进入深水区，**运行时确定性**比新功能更具价值。
2.  **企业级合规落地加速**：Zeroclaw的OIDC、QwenPaw的多租户、hermes的安全配置修复，显示开源智能体正从“个人玩具”向“企业资产”转型，**身份认证与权限隔离**成为版本迭代的核心议题。
3.  **插件生态的双刃剑效应**：DeepSeek Harness因插件兼容性和迁移失败遭遇信任危机，反向验证了**版本发布的向后兼容性**与**数据迁移工具**是大型平台必须坚守的红线。
4.  **跨平台一致性成为竞合格局**：Windows/Linux/macOS的全覆盖能力（Zeroclaw、OpenClaw、hermes均在强化）已成为标配，**ARM64支持**和**桌面端原生体验**是区分中坚项目的关键指标。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**日期：** 2026-09-25  
**分析周期：** 过去24小时  
**数据来源：** GitHub API (github.com/zeroclaw-labs/zeroclaw)

---

## 1. 今日速览

Zeroclaw 在过去24小时内保持高度活跃，社区贡献与核心开发并行推进。共处理 **27条 Issue**（23新开/活跃，4关闭）和 **50条 PR**（12已合并，38待审），无新版本发布。今日主要进展集中在安全加固（OIDC认证、依赖漏洞修复）、SOP自动化稳定性修复以及平台兼容性优化（Windows/Web）。核心维护者 @JordanTheJet 贡献了多项关键修复与增强，包括WebSocket连接断开后的Agent行为修正、Webhook触发SOP的执行修复，以及插件持久化状态支持。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

### 重要合并/关闭 PR

| PR | 标题 | 作者 | 进展说明 |
|----|------|------|----------|
| [#10538](https://github.com/zeroclaw-labs/zeroclaw/pull/10538) | `fix(gateway): keep the agent turn running when the chat WebSocket disconnects` | @JordanTheJet | **已合并**。解决了聊天WebSocket断开时Agent任务被意外中断的问题，提升了用户体验稳定性。 |
| [#11083](https://github.com/zeroclaw-labs/zeroclaw/pull/11083) | `fix(gateway): drive webhook-started SOP agent steps` | @JordanTheJet | **已合并**。修复了通过Webhook触发的SOP运行中Agent步骤未被执行的关键Bug，确保了headless模式下的SOP完整性。 |
| [#11063](https://github.com/zeroclaw-labs/zeroclaw/pull/11063) | `ci(codeql): pin the Rust scan runner label and retire CI_USE_BLACKSMITH` | @JordanTheJet | **已合并**。优化CI流程，固定CodeQL扫描环境，提升构建可重复性。 |
| [#11069](https://github.com/zeroclaw-labs/zeroclaw/pull/11069) | `perf(ci): give colliding Rust matrix legs distinct cache keys` | @JordanTheJet | **已合并**。改善CI缓存策略，减少不必要的依赖重新编译。 |
| [#11073](https://github.com/zeroclaw-labs/zeroclaw/pull/11073) | `perf(ci): run CodeQL on master pushes only when analyzed code changes` | @JordanTheJet | **已合并**。按需触发安全扫描，提升CI效率。 |
| [#11070](https://github.com/zeroclaw-labs/zeroclaw/pull/11070) | `perf(ci): skip Docker source builds when only the release workflow changed` | @JordanTheJet | **已合并**。避免无关变更触发的完整Docker构建，缩短发布周期。 |
| [#11064](https://github.com/zeroclaw-labs/zeroclaw/pull/11064) | `perf(ci): run the Windows task-owner recovery tests as a parallel job` | @JordanTheJet | **已合并**。并行化Windows测试，提升构建速度。 |
| [#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) | `[Tracker]: remove the matrix-sdk -> imbl advisory waivers` | @ArmanAvanesyan | **已关闭**。完成了对Matrix SDK相关CVE（RUSTSEC-2026-0247, RUSTSEC-2026-0292）的安全审计清理。 |
| [#9805](https://github.com/zeroclaw-labs/zeroclaw/issues/9805) | `SOP: auto-mode runs from channel/cron triggers are never executed` | @JordanTheJet | **已关闭**。修复了SOP自动模式在channel/cron触发时永不执行的严重Bug。 |

**整体进展评估：** 项目正稳步推进v0.9.0版本的准备工作，今日合并的PR主要集中在**稳定性修复**和**CI效率优化**两个维度，为后续功能发布奠定了坚实基础。

---

## 4. 社区热点

### 高关注 Issue/PR

| ID | 类型 | 标题 | 评论数 | 链接 | 热度分析 |
|----|------|------|--------|------|----------|
| #8692 | Tracker | Maintainer decision queue for RFCs and design issues | 15 | [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | **高热度**。维护者决策队列的建立反映了项目对RFC和设计理念流程化的重视，社区期待更透明的决策机制。 |
| #6489 | Tracker | Unified capability catalog and plugin migration roadmap | 8 | [#6489](https://github.com/zeroclaw-labs/zeroclaw/issues/6489) | **中高热度**。**"Everything is a plugin"** 是项目的核心愿景，统一能力目录的迁移路线图关系到长期架构演进，备受开发者关注。 |
| #8519 | Bug | Reconcile cargo-audit ignores and remediate wasmtime-wasi CVEs | 7 | [#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) | **中高热度**。安全审计问题，涉及WASM运行时依赖的CVE修复，对生产环境部署至关重要。 |
| #10155 | Enhancement | feat(sop): add interoperable run logs and trigger deduplication | - | [#10155](https://github.com/zeroclaw-labs/zeroclaw/pull/10155) | **高热度**（开放中）。SOP运行日志的统一和触发去重功能，直接提升可观测性和运维效率，是 Operator 的核心需求。 |
| #10133 | Refactor | fix(runtime): keep operational paths panic-free | - | [#10133](https://github.com/zeroclaw-labs/zeroclaw/pull/10133) | **中高热度**（已关闭）。移除30个生产panic候选项，显著提升运行时健壮性。 |
| #10259 | Enhancement | feat(security): enforce authenticated principals on RPC with native+peercred | - | [#10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259) | **高热度**（开放中）。OIDC认证第三阶段，强化RPC安全，是企业级部署的关键能力。 |
| #10970 | RFC | Host-scoped admission control and per-agent resource bounds | 5 | [#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) | **高热度**（开放中）。多Agent场景下的资源隔离和限流RFC，关系到大规模部署的稳定性，需维护者尽快评审。 |
| #11027 | RFC | Agent-to-agent session messaging with receiver discretion | 3 | [#11027](https://github.com/zeroclaw-labs/zeroclaw/issues/11027) | **新热点**。Agent间会话消息传递机制的设计，支持多Agent协作场景，是未来架构的重要补充。 |

**热点分析：**
- **安全与认证** 是当前社区最关注的领域，OIDC里程碑（#8289）和多Agent身份管理（#11027）均处于活跃讨论阶段。
- **SOP自动化** 的可靠性修复和可观测性增强是运维侧的核心诉求，相关PR和Issue获得持续跟进。
- **架构演进** 方面，统一插件目录（#6489）和运行时组件边界（#10993）是长期技术债务清理的关键路径。

---

## 5. Bug 与稳定性

### 严重Bug（S0-S1）

| ID | 标题 | 严重程度 | 状态 | Fix PR | 链接 |
|----|------|----------|------|--------|------|
| #10968 | Unattended agent turns run with no ApprovalManager, so risk-profile tool approvals are silently inert | **S0 - 数据丢失/安全风险** | Open | 无 | [#10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968) |
| #10797 | markdown memory backend silently loses stored entries when `store()` calls overlap | **S0 - 数据丢失/安全风险** | Open | 无 | [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) |
| #8559 | Agents stop their work when exiting the chat window in web dashboard | **S1 - 工作流阻塞** | Closed (已在#10538修复) | [#10538](https://github.com/zeroclaw-labs/zeroclaw/pull/10538) | [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) |
| #11087 | Windows — after closing the window the app can be neither reopened nor quit | **S1 - 工作流阻塞** | Open | 无 | [#11087](https://github.com/zeroclaw-labs/zeroclaw/issues/11087) |

### 中等Bug（S2）

| ID | 标题 | 严重程度 | 状态 | Fix PR | 链接 |
|----|------|----------|------|--------|------|
| #10948 | interruption-scope keys collide across component boundaries | S2 - 降级行为 | Closed | 无（已在内部解决） | [#10948](https://github.com/zeroclaw-labs/zeroclaw/issues/10948) |
| #11094 | Apple preflight tests can fail when the retry sleep mock intercepts subprocess polling | S2 - 降级行为 | Open | 无 | [#11094](https://github.com/zeroclaw-labs/zeroclaw/issues/11094) |
| #11093 | Stable docs promotion leaves root llms files out of sync | S2 - 降级行为 | Open | 无 | [#11093](https://github.com/zeroclaw-labs/zeroclaw/issues/11093) |

### 轻微Bug（S3）

| ID | 标题 | 严重程度 | 状态 | Fix PR | 链接 |
|----|------|----------|------|--------|------|
| #11097 | Plugin egress remedy commands do not escape apostrophes in existing grants | S3 -  minor issue | Open | 无 | [#11097](https://github.com/zeroclaw-labs/zeroclaw/issues/11097) |

**稳定性评估：**
- **数据丢失风险**：#10797（Markdown内存后端并发写入丢失数据）和 #10968（无人值守Agent缺乏审批管理器）是当前的**最高优先级修复项**，涉及数据完整性和安全策略执行。
- **平台兼容性**：Windows客户端存在窗口关闭后无法重启或退出的问题（#11087），影响桌面用户体验。
- **已修复问题**：WebSocket断开导致Agent中断（#8559）和Webhook触发SOP步骤不执行（#11083）已在今日合并的PR中解决。

---

## 6. 功能请求与路线图信号

| ID | 标题 | 类型 | 链接 | 路线图信号分析 |
|----|------|------|------|----------------|
| #11103 | Add Cheaper Inference as a typed OpenAI-compatible provider | 新功能 | [#11103](https://github.com/zeroclaw-labs/zeroclaw/issues/11103) | **短期可能纳入**。Cheaper Inference是快速增长的LLM网关，提供OpenAI兼容接口，社区需求明确，实现成本较低。 |
| #11100 | Preserve configured provider aliases in cost-rate catalog prefill | 增强 | [#11100](https://github.com/zeroclaw-labs/zeroclaw/issues/11100) | **短期可能纳入**。改进provider别名保留逻辑，提升配置一致性，属于UI/UX优化。 |
| #11096 | Risk-based merge-result freshness | RFC | [#11096](https://github.com/zeroclaw-labs/zeroclaw/issues/11096) | **中期探索**。针对CI合并策略的RFC，涉及分支保护和工作流优化，需评估对现有流程的影响。 |
| #8850 | Move optional channels & tools from compile-time feature flags to runtime plugins | Tracker | [#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850) | **长期路线图**。核心架构演进，实现"运行时插件化"，减少二进制体积，提升灵活性。已有PR #11081 推进中。 |
| #10993 | Complete the public runtime composition boundary | Feature | [#10993](https://github.com/zeroclaw-labs/zeroclaw/issues/10993) | **长期路线图**。完成运行时组件边界的公开，支持嵌入式场景，是v0.9.0 Phase 3的重要部分。 |
| #10970 | Host-scoped admission control and per-agent resource bounds | RFC | [#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) | **长期路线图**。多Agent场景的资源隔离和限流，对企业级部署至关重要，需维护者优先评审。 |
| #11027 | Agent-to-agent session messaging with receiver discretion | RFC | [#11027](https://github.com/zeroclaw-labs/zeroclaw/issues/11027) | **长期探索**。支持Agent间解耦的消息传递，扩展多Agent协作能力，符合"Everything is a plugin"愿景。 |

**路线图判断：**
- **v0.9.0预期包含**：OIDC认证第三阶段（#10259）、运行时组件边界公开（#10993）、Zerorelay原生传输（#8358）。
- **后续版本探索**：Cheaper Inference Provider集成、多Agent会话消息传递、风险驱动的CI合并策略。

---

## 7. 用户反馈摘要

### 痛点与不满
1. **数据丢失风险**：Markdown内存后端在并发写入时静默丢失数据（#10797），用户反映"reported by agent"，表明AI代理在执行任务时遇到了不可恢复的数据一致性错误。
2. **安全策略失效**：无人值守Agent（cron、heartbeat、headless SOP、spawn_subagent）在缺乏ApprovalManager的情况下运行，导致风险配置文件中的工具审批被静默忽略（#10968），这是**严重的安全漏洞**。
3. **工作流阻塞**：
   - Windows客户端关闭窗口后无法重启或退出（#11087），影响桌面用户日常使用。
   - Web Dashboard中退出聊天窗口会导致Agent任务中断（#8559），现已修复。
4. **SOP自动化不可靠**：SOP在auto模式下通过channel/cron触发时，执行步骤永远不被运行，卡在"running"状态（#9805），现已修复。

### 使用场景与需求
1. **多Agent协作**：用户希望不同Session中的Agent能够交换发现、问题和协调消息，而无需合并历史记录或人工复制文本（#11027）。
2. **成本透明化**：需要保留配置的Provider别名在成本率目录预填充中（#11096），以便更准确地追踪和优化LLM调用成本。
3. **可观测性增强**：Operator需要统一的运行日志跨多个界面（CLI、Web、ZeroCode）（#10155），以及触发去重机制避免重复执行。
4. **平台兼容性**：Apple预检测试在macOS上因mock拦截子进程轮询而失败（#11094），影响CI稳定性。

### 满意度
- **CI效率优化**：多项CI性能改进（缓存键优化、条件触发、并行化）获得认可，缩短了构建时间。
- **安全加固**：Runtime panic-free重构（#10133）和依赖CVE清理（#9899）提升了生产环境的稳定性。
- **插件化进展**：PR #11081 推进了插件持久化状态和主机中介Socket的支持，符合"Everything is a plugin"愿景。

---

## 8. 待处理积压

### 需维护者优先关注

| ID | 标题 | 类型 | 创建日期 | 评论数 | 链接 | 优先级 |
|----|------|------|----------|--------|------|--------|
| #10968 | Unattended agent turns run with no ApprovalManager | **Bug S0** | 2026-09-19 | 2 | [#10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968) | **紧急** - 安全策略失效，需立即修复。 |
| #10797 | Markdown memory backend silently loses stored entries | **Bug S0** | 2026-09-12 | 1 | [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) | **紧急** - 数据丢失风险，影响记忆系统可靠性。 |
| #11087 | Windows app cannot be reopened or quit after closing window | **Bug S1** | 2026-09-24 | 0 | [#11087](https://github.com/zeroclaw-labs/zeroclaw/issues/11087) | **高** - 桌面用户体验阻塞，无Fix PR。 |
| #10970 | Host-scoped admission control and per-agent resource bounds | **RFC** | 2026-09-19 | 5 | [#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) | **高** - 需维护者评审，影响多Agent部署架构。 |
| #11027 | Agent-to-agent session messaging with receiver discretion | **RFC** | 2026-09-21 | 3 | [#11027](https://github.com/zeroclaw-labs/zeroclaw/issues/11027) | **中** - 架构演进RFC，需评估后进入开发。 |
| #10993 | Complete the public runtime composition boundary | **Feature** | 2026-09-20 | 1 | [#10993](https://github.com/zeroclaw-labs/zeroclaw/issues/10993) | **中** - v0.9.0关键路径，依赖#11092 Core Team批准。 |
| #11094 | Apple preflight tests can fail when retry sleep mock intercepts | **Bug S2** | 2026-09-24 | 0 | [#11094](https://github.com/zeroclaw-labs/zeroclaw/issues/11094) | **中** - CI稳定性问题，需修复测试逻辑。 |
| #11093 | Stable docs promotion leaves root llms files out of sync | **Bug S2** | 2026-09-24 | 0 | [#11093](https://github.com/zeroclaw-labs/zeroclaw/issues/11093) | **低** - 文档同步问题，影响较小。 |
| #11097 | Plugin egress remedy commands do not escape apostrophes | **Bug S3** | 2026-09-24 | 0 | [#11097](https://github.com/zeroclaw-labs/zeroclaw/issues/11097) | **低** - 边缘情况，影响有限。 |

### 长期未响应 Issue

| ID | 标题 | 创建日期 | 最后更新 | 评论数 | 链接 | 备注 |
|----|------|----------|----------|--------|------|------|
| #8519 | Reconcile cargo-audit ignores and remediate wasmtime-wasi CVEs | 2026-06-30 | 2026-09-24 | 7 | [#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) | 安全审计清理，虽有关闭的关联Issue（#9899），但本体仍开放，需确认是否已完全解决。 |

---

## 项目健康度评估

| 维度 | 评分 | 说明 |
|------|------|------|
| **活跃度** | ⭐⭐⭐⭐⭐ | 24小时内50条PR、27条Issue，贡献密集。 |
| **响应速度** | ⭐⭐⭐⭐☆ | 大多数Issue在7天内获得更新，S0/S1 Bug得到快速响应。 |
| **代码质量** | ⭐⭐⭐⭐☆ | Panic-free重构、CI优化显示对稳定性的重视。 |
| **安全态势** | ⭐⭐⭐⭐☆ | 持续清理CVE，但#10968和#10797暴露了新的安全/数据风险点。 |
| **社区参与** | ⭐⭐⭐⭐☆ | 多贡献者参与，RFC讨论活跃，但部分RFC需维护者更快评审。 |
| **文档完整性** | ⭐⭐⭐☆☆ | 存在文档不同步问题（#11093），建议加强自动化检查。 |

**总体评价：** Zeroclaw 项目处于**高健康度**状态，核心维护团队活跃，社区贡献多元化。当前重点是解决S0级数据安全与审批策略Bug，同时推进v0.9.0的架构演进（OIDC、运行时组件化）。建议优先处理#10968和#10797，并加速RFC #10970的评审流程。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报
**日期**: 2026-09-25  
**数据源**: GitHub (sipeed/picoclaw)

## 1. 今日速览
今日 PicoClaw 项目活跃度中等，主要聚焦于依赖项升级与一项移动客户端体验修复。过去24小时内产生2个 Issues 和8个 PR，其中无 PR 被合并或 Issue 被关闭，表明代码评审流程可能处于积压状态或周末效应。核心动态包括引入 OpenCode Go 专用 Provider、修复 DeltaChat 配置验证错误，以及批量升级 Go 生态关键依赖（Anthropic SDK、Mautrix、LINE SDK）。整体项目保持技术栈现代化，但功能交付节奏暂时放缓。

## 2. 版本发布
无新版本发布（Releases）。

## 3. 项目进展
今日无 PR 合并或 Issue 关闭，项目代码库在功能层面未发生实质性推进。所有 PR 均处于 `OPEN` 状态，其中4条为 Dependabot 自动触发的依赖升级，体现维护性工作仍在持续，但人为代码贡献暂未进入主分支。

## 4. 社区热点
**Issue #3390 (CLOSED)**: [Pico channel splits multi-line input into multiple messages](https://github.com/sipeed/picoclaw/issues/3390)  
- **热度**: 已关闭，反映快速响应能力。  
- **分析**: 用户 @chentianxiong123 报告移动端 TUI 粘贴多行文本（如代码块、诗歌）时被错误拆分为多条消息。该问题已关闭，暗示可能存在快速修复或已在 #3391 前解决，但未提供具体修复 PR 链接，需进一步确认解决方案是否已合入。

**PR #3371**: [feat(providers): add opencode-go provider with session header support](https://github.com/sipeed/picoclaw/pull/3371)  
- **热度**: 长期开放（创建于 2026-09-08），标记 `stale` 可能性低，显示社区对 OpenCode Go 支持的持续需求。  
- **分析**: 新增专用 provider 以支持 opencode.ai 路由和会话头（`x-opencode-session`），满足特定用户群对低延迟和状态保持的诉求。

**PR #3376**: [fix(deltachat): initialize as custom channel to solve config validation error](https://github.com/sipeed/picoclaw/pull/3376)  
- **热度**: 长期开放，技术痛点明确。  
- **分析**: 解决 DeltaChat 通道启用时的配置验证错误（引用 #3265），体现用户对跨平台消息集成的稳定性需求。

## 5. Bug 与稳定性
- **[HIGH] Issue #3391**: [Pico channel splits multi-line input into multiple messages](https://github.com/sipeed/picoclaw/issues/3391)  
  - **描述**: 与 #3390 内容高度相似，可能为重复报告或后续细化。用户反馈移动端 TUI 多行输入拆分问题破坏消息结构，影响代码复制、诗歌展示等场景。  
  - **状态**: OPEN，暂无 Fix PR 关联。  
  - **严重性**: 高（影响核心用户体验，尤其开发者群体）。

无其他崩溃或回归问题报告。

## 6. 功能请求与路线图信号
- **OpenCode Go 原生支持**: PR #3371 明确响应了社区对 opencode.ai 平台集成需求，标志项目正在扩展 LLM 提供商覆盖范围。  
- **DeltaChat 稳定性增强**: PR #3376 修复配置验证错误，暗示路线图中对更多通信平台兼容性的重视。  
- **AI Provider 现代化**: PR #3381 [Switch Openai to responses API](https://github.com/sipeed/picoclaw/pull/3381) 虽标记 `stale`，但反映项目跟进 OpenAI 新 API 规范的意图，可能纳入下一版本更新。

## 7. 用户反馈摘要
- **痛点**: 移动端 TUI 对多行文本处理不当，导致格式混乱和消息碎片化（#3390, #3391）。  
- **使用场景**: 开发者粘贴代码块、诗人粘贴多行文本时遇到功能障碍。  
- **满意度**: 用户对依赖项自动更新（Dependabot）和特定 provider 支持（如 OpenCode Go）表示认可，但等待时间过长可能引发 frustration。

## 8. 待处理积压
- **PR #3381**: [feat: Switch Openai to responses API](https://github.com/sipeed/picoclaw/pull/3381) — 创建已 7 天，无活动，可能需重新评估优先级。  
- **PR #3376**: [fix(deltachat): ...](https://github.com/sipeed/picoclaw/pull/3376) — 创建已 14 天，社区反馈强烈（引用 #3265），建议优先合并。  
- **PR #3371**: [feat(providers): add opencode-go ...](https://github.com/sipeed/picoclaw/pull/3371) — 创建已 16 天，功能价值明确，需维护者介入评审。  
- **Issue #3391**: [Pico channel splits ...](https://github.com/sipeed/picoclaw/issues/3391) — 与 #3390 内容重叠，建议合并或澄清解决方案。

---  
**报告生成**: Agnes-2.5-Flash (Sapiens AI) | 数据截止: 2026-09-25 23:59 UTC

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期**：2026-09-25  
**数据来源**：GitHub `agentscope-ai/QwenPaw`  
**分析周期**：过去 24 小时

---

## 1. 今日速览
QwenPaw 今日保持高活跃度，共更新 Issues 34 条（活跃 18）、PR 23 条（待合并 17）。无新版本发布，但修复性 PR 密集，集中解决上下文管理、控制台 UI 回归及插件兼容性等关键问题。社区对多租户版本后续规划的讨论热情持续（Issue #7318，32 条评论）。项目整体处于 v2.2.x 系列的稳定性打磨阶段，开发者响应迅速。

---

## 2. 版本发布
**无新版本发布。**  
当前主要版本为 v2.2.x (含 beta)，用户反馈集中在该系列的性能优化与 Bug 修复。

---

## 3. 项目进展
今日合并/关闭的 PR 主要聚焦于控制台体验优化和底层稳定性修复：

*   **控制台会话列表默认分组逻辑修正** (#7972 [CLOSED])  
    将侧边栏会话列表默认分组从 `date` 改为 `source`，是对 #7968 报告的 UI 回归问题的直接响应，提升了多来源会话的管理效率。
*   **工具调用生命周期查询门控** (#7971 [CLOSED])  
    修复了 Console 端在 `plugin_call` 完成后立即轮询工具调用状态导致的潜在竞态条件，确保后端 `ToolCoordinator` 注册完成后再进行查询。
*   **企业微信附件发送体验优化** (#5659 [CLOSED])  
    允许用户在仅上传附件（如图片、文档）而无文字输入时直接发送消息，解决了 #5558 提出的痛点，完善了多模态交互流程。
*   **流式清理超时保护** (#7960 [CLOSED])  
    为非协作式流式提供商增加了 60 秒的隔离恢复机制，防止因单个 Provider 卡死导致整个进程后续请求失败，显著提升了运行时稳定性。

**整体推进**：今日重点修复了 v2.2.2b3 引入的控制台 UI 问题和流式处理的稳定性隐患，项目向后兼容性和健壮性有所增强。

---

## 4. 社区热点
以下 Issue/PR 讨论最为活跃，反映了社区核心关切：

*   **[Discussion] QwenPaw Hub 多租户版后续规划** (#7318)  
    [链接](https://github.com/agentscope-ai/QwenPaw/issues/7318) | 评论: 32 | 👍: 4  
    **分析**：作为 v2.2.0 发布的旗舰功能，Hub 的多租户能力引发了团队部署场景的热烈讨论。用户关注点在于 Admin 管理、权限粒度及多用户协作体验，这是项目从个人助手向团队平台演进的关键信号。
*   **[Bug] 上下文压缩超出 Provider 预算导致失败** (#7628)  
    [链接](https://github.com/agentscope-ai/QwenPaw/issues/7628) | 评论: 6  
    **分析**：长期存在的上下文管理难题。用户指出当前的 Compaction 机制仅考虑可见上下文，未覆盖 Provider 请求的整体预算，导致长会话中工具调用失败。此类问题在高负载企业级使用中频发。
*   **[Bug] shell_evasion_checks 阻断多行命令** (#4244 [CLOSED])  
    [链接](https://github.com/agentscope-ai/QwenPaw/issues/4244) | 评论: 6  
    **分析**：安全策略与实用性冲突的经典案例。默认配置下 `newlines: true` 静默阻断含换行的 Shell 命令，破坏 Agent 思考链。该 Issue 已关闭，暗示团队正在评估更灵活的安全策略配置或文档说明。
*   **[Feature] 官方移动端应用需求** (#7976)  
    [链接](https://github.com/agentscope-ai/QwenPaw/issues/7976) | 评论: 1  
    **分析**：用户提交了非官方 Android 客户端的使用体验，并强烈呼吁官方支持移动端。这反映了移动场景下的远程管理需求，是潜在的路线图方向。

---

## 5. Bug 与稳定性
按严重程度排列的高优先级 Bug 及修复状态：

| 严重级别 | 问题描述 | Issue ID | 修复状态 |
| :--- | :--- | :--- | :--- |
| **P0** | **Context Compaction 丢失 Tool Call 结构**：导致 400 错误或消息计数不匹配。 | [#5856](https://github.com/agentscope-ai/QwenPaw/issues/5856) | Open |
| **P0** | **RetryChatModel 硬编码 context_size**：所有模型强制 fallback 到 32768 tokens，导致非预期截断。 | [#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576) | **Closed** (修复中) |
| **P1** | **飞书 Session Consumer 死锁**：单 session 卡死后静默无响应，新消息无法创建新 Consumer。 | [#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) | Open |
| **P1** | **MCP streamable_http 无自动重连**：Session 中断后客户端永久跳过，需手动恢复。 | [#5900](https://github.com/agentscope-ai/QwenPaw/issues/5900) | **Closed** (可能已有相关修复) |
| **P1** | **v2.2.2b3 控制台群组功能回归**：侧边栏无法创建或查看聊天群组/文件夹。 | [#7968](https://github.com/agentscope-ai/QwenPaw/issues/7968) | **Closed** (PR #7972 已合并修复分组逻辑，需验证群组功能是否完全恢复) |
| **P2** | **Langfuse 追踪丢失 Tool Output**：工具执行观测值缺少 output 字段。 | [#7963](https://github.com/agentscope-ai/QwenPaw/issues/7963) | Open (对应 PR #7964) |
| **P2** | **Windows 沙箱 ACL 锁定卷**：工作区设在驱动根目录时可能导致卷锁定。 | [#7943](https://github.com/agentscope-ai/QwenPaw/issues/7943) | Open |
| **P2** | **Provider 切换后 Session 永久损坏**：`file://` 媒体 URL 被拒绝。 | [#7966](https://github.com/agentscope-ai/QwenPaw/issues/7966) | Open (对应 PR #7973) |
| **P2** | **Daily Paper 插件静默失败**：arxiv.org 不可达时错误信息误导，未透传真实 HTTP 错误。 | [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | Open |

**关键观察**：上下文管理和 Provider 兼容性是当前稳定性的两大痛点。多个 P0/P1 级别 Bug 涉及核心执行链路（Tool Call, Context Compaction, Session Lifecycle），建议优先处理。

---

## 6. 功能请求与路线图信号
*   **实时语音聊天** (#7785 [OPEN])  
    [链接](https://github.com/agentscope-ai/QwenPaw/pull/7785)  
    已在开发中（PR #7785）。支持语音输入/输出、打断及模型选择，预计将集成到现有 Chat UI，是重要的交互增强功能。
*   **ReMeLight 内存写入专用模型** (#7719 [OPEN])  
    [链接](https://github.com/agentscope-ai/QwenPaw/pull/7719)  
    允许为 ReMe 内存管理使用独立的轻量级模型，避免消耗主对话模型的资源。符合成本优化和性能隔离的趋势，可能被纳入下一版本。
*   **持久化分页转录历史** (#7931 [OPEN])  
    [链接](https://github.com/agentscope-ai/QwenPaw/pull/7931)  
    引入基于 SQLite 的会话转录存储，支持向上分页和去重。提升长会话的回溯能力，是用户体验的重要改进。
*   **多标签终端集成** (#7861 [OPEN])  
    [链接](https://github.com/agentscope-ai/QwenPaw/pull/7861)  
    在控制台添加带认证的多标签 xterm 终端，支持独立工作目录。面向高级用户和开发者场景，扩展了 QwenPaw 作为开发环境的潜力。
*   **手动禁用预制模型/频道** (#7957 [OPEN])  
    [链接](https://github.com/agentscope-ai/QwenPaw/issues/7957)  
    用户请求提供管理预制项的开关，以简化界面或满足特定部署需求。属于可配置性增强的小功能，实现成本低，可能被采纳。

---

## 7. 用户反馈摘要
*   **痛点**：
    *   **上下文记忆与一致性**：用户反馈 Agent 在复杂插件开发场景中“记不住”之前的约束（#7571），且在长时间运行中因上下文压缩导致任务中断或状态丢失（#7836, #7628）。
    *   **工具调用失败**：特定 Provider（如 Moonshot）对 JSON Schema 的严格校验导致 400 错误（#7959），以及 ReMe 插件 Daily Paper 的错误信息不透明（#7715）。
    *   **UI/UX 回归**：v2.2.2b3 版本破坏了会话分组和群组功能（#7968, #7966），影响用户日常使用体验。
    *   **工作流阻塞**：飞书和 MCP 连接的稳定性问题导致会话静默卡死（#7534, #4227），严重影响企业级应用的可靠性。
*   **满意点**：
    *   **多租户 Hub 的推出**：社区对 #7318 的讨论显示出对企业级功能的期待和认可。
    *   **快速响应**：对于 UI 回归等明显问题，团队在 24 小时内即提交了修复 PR，体现了高效的维护节奏。

---

## 8. 待处理积压
*   **[Bug] Context Compaction 丢失 Tool Call 结构** (#5856)  
    [链接](https://github.com/agentscope-ai/QwenPaw/issues/5856)  
    长期开放的 P0 级别 Bug，影响核心对话流程的稳定性，需优先关注。
*   **[Bug] 飞书 Session Consumer 死锁** (#7534)  
    [链接](https://github.com/agentscope-ai/QwenPaw/issues/7534)  
    涉及企业微信/飞书集成的关键稳定性问题，缺乏活跃的修复 PR。
*   **[Bug] Windows 沙箱 ACL 锁定卷** (#7943)  
    [链接](https://github.com/agentscope-ai/QwenPaw/issues/7943)  
    特定环境下的严重副作用，影响 Windows 用户的部署安全性。
*   **[PR] 实时语音聊天** (#7785)  
    [链接](https://github.com/agentscope-ai/QwenPaw/pull/7785)  
    重要功能 PR，当前处于 Open 状态，建议加快 Review 进度以早日集成。
*   **[PR] 持久化分页转录历史** (#7931)  
    [链接](https://github.com/agentscope-ai/QwenPaw/pull/7931)  
    提升用户体验的功能性 PR，同样处于 Open 状态，值得推进。

---
**报告生成时间**：2026-09-25  
**分析师**：Agnes (Sapiens AI)

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：** 2026-09-25  
**数据来源：** GitHub API (NousResearch/hermes-agent)

---

## 1. 今日速览

今日项目呈现**高吞吐、高稳定性**态势：过去24小时处理500条Issue和500条PR，关闭率达78.8%（Issue）和31.8%（PR待合并），显示维护团队高效响应能力。v0.21.5版本发布为下游消费者提供稳定标签，近460个PR的累积合并标志着项目进入成熟期的批量交付阶段。核心议题集中在**跨网关协作、会话状态管理、桌面UI交互优化**三大方向，社区参与度极高（单Issue最高139条评论）。

---

## 2. 版本发布

### v0.21.5 (v2026.9.24)
**发布日期：** 2026年9月24日  
**性质：** Patch发布，累积稳定版

**更新内容：**
- 汇总自v0.21.4以来约**460个合并PR**
- 面向下游消费者（Docker镜像、Hermes Cloud、托管部署）提供稳定标签
- 完整变更日志延后发布

**破坏性变更：** 无声明  
**迁移注意事项：**
- 建议立即升级以获取安全修复和稳定性改进
- 自定义插件用户需验证与v0.21.5的兼容性
- Docker用户直接拉取最新标签即可

---

## 3. 项目进展

### 今日合并/关闭的重要PR（按影响力排序）

| PR # | 类型 | 标题 | 影响 |
|------|------|------|------|
| #81282 | Bugfix | keep folder refs below sticky messages | 修复文件夹引用被置顶消息遮挡的UI问题 |
| #91954 | Bugfix | portal dropdown submenu into dialog container | 解决Kanban对话框中下拉菜单渲染异常 |
| #120322 | Bugfix | show pending bot-chat feedback without changing ownership | 优化机器人聊天等待状态显示 |
| #101799 | Security | bump fast-uri from 3.1.5 to 3.1.7 | **安全更新**：修复URI解析漏洞 |
| #120309 | Bugfix | acknowledge cold bot-switch target synchronously | 改善冷启动机器人切换体验 |
| #102835 | Bugfix | distinct icon for at-rest local default pill | UI图标区分优化 |
| #103143 | Bugfix | unify statusbar Session timer | 统一会话计时器逻辑 |
| #87206 | Bugfix | right sidebar sash preview mirrors commit | 修复侧边栏拖拽预览问题 |
| #62559 | Bugfix | make boot failure overlay dismissible | 提升启动失败用户体验 |

**项目推进评估：** 今日合并的PR主要集中在**桌面端UX优化**（7/9个PR），显示团队正在系统性解决v0.21.x版本的累积体验问题。安全更新#101799体现了对依赖链的持续监控。

---

## 4. 社区热点

### 评论数最多的Open Issues

**1. #88584 - Automated Nous integration is blocked (139条评论)**
- **链接：** https://github.com/NousResearch/hermes-agent/issues/88584
- **热度分析：** 极高关注度，涉及自动化集成流程阻塞
- **核心诉求：** 解决cron/jobs.py冲突，恢复Nous-to-Enterkey自动合并
- **维护者状态：** 无 release branch 变更，仪表板更新器停留在最后测试版本

**2. #97681 - Let Bots collaborate across gateways (30条评论, 2👍)**
- **链接：** https://github.com/NousResearch/hermes-agent/issues/97681
- **热度分析：** 高价值功能请求，跨网关协作是多机器人架构的关键
- **核心诉求：** 统一网关运行时（依赖#106742）
- **维护者状态：** Teknium已推迟Desktop连续性功能，待Group Chat settle后重新评估

**3. #59293 - hermes config set bypasses system-config write protection (20条评论)**
- **链接：** https://github.com/NousResearch/hermes-agent/issues/59293
- **热度分析：** 安全敏感Issue，CLI绕过系统配置保护
- **核心诉求：** 修复approval layer漏洞，防止agent通过终端访问禁用批准层
- **优先级：** P2安全级

### 新晋热门Issue

**#121970 - Signal: option to disable Note to Self handling (9条评论)**
- **链接：** https://github.com/NousResearch/hermes-agent/issues/121970
- **诉求：** 为Signal适配器添加配置选项，允许二次设备跳过"发送给自己"消息处理

---

## 5. Bug 与稳定性

### 高优先级Bug（P1-P2）

| Issue # | 严重程度 | 描述 | 状态 | Fix PR |
|---------|----------|------|------|--------|
| #77305 | P2 | Subagent迭代预算被失败API调用耗尽 | ✅ Closed | #122047 (plugins autostash fix相关) |
| #90795 | P2 | useSyncExternalStore重入导致React #520崩溃 | ✅ Closed | 待确认 |
| #83617 | P1 | Space键在会话重命名对话框中被吞没 | ✅ Closed | #81282相关修复 |
| #118482 | P2 | 流式传输期间transcript滚动异常 | ✅ Closed | 待确认 |
| #121890 | P2 | `hermes chat -Q`在SIGTERM下丢失session id | 🔄 Open | 无 |
| #99648 | P3 | `/new`会话在侧边栏嵌套为分支而非兄弟节点 | 🔄 Open | 无 |
| #92561 | P3 | 自定义OpenAI兼容provider不发送历史消息 | 🔄 Open | 无 |

### 关键稳定性问题

**#98524 - Assistant消息重复渲染** (已关闭)
- **链接：** https://github.com/NousResearch/hermes-agent/issues/98524
- **问题：** v0.20.6后assistant消息在transcript中显示两次
- **影响：** 所有session，包括新建session

**#94778 - Auto-continue假阳性** (已关闭)
- **链接：** https://github.com/NousResearch/hermes-agent/issues/94778
- **问题：** 中断标记在多backend共享HERMES_HOME时产生误判
- **影响：** 可能导致重复turn和误导性"backend stopped"通知

**#73271 - OAuth token持久化失败** (已关闭)
- **链接：** https://github.com/NousResearch/hermes-agent/issues/73271
- **问题：** 重启后native OAuth token无法rehydrate
- **影响：** 跨平台安全边界问题

---

## 6. 功能请求与路线图信号

### 明确的功能请求

**1. 跨网关机器人协作 (#97681)**
- **需求：** 多机器人跨网关通信能力
- **路线图信号：** 依赖统一网关运行时(#106742)，Teknium计划Group Chat稳定后重新评估
- **时间预期：** 中期功能（1-2个 release cycle）

**2. Signal Note to Self处理选项 (#121970)**
- **需求：** 允许secondary device配置跳过"发送给自己"消息
- **路线图信号：** 新提交的feature request，P3优先级
- **时间预期：** 短期可能纳入（社区贡献驱动）

**3. Skills and Plugins目录整合 (#119381 - Open PR)**
- **需求：** 恢复单一浏览界面的Skills/Plugins目录
- **路线图信号：** PR已提交，待维护者review
- **时间预期：** 近期可能合并

### 路线图推断

从今日活动可见项目重点：
- **短期：** 桌面端体验优化（计时器统一、图标区分、拖拽交互）
- **中期：** 跨网关架构支持、统一运行时
- **长期：** 插件生态系统完善（Nachos插件已提交#122043）

---

## 7. 用户反馈摘要

### 主要痛点

**1. 会话管理混乱**
- 用户反馈`/new`创建的新会话在侧边栏显示为分支而非独立节点（#99648）
- 压缩后的摘要作为普通消息显示，破坏对话流（#86234, #70846）

**2. 桌面UI交互缺陷**
- Space键在重命名对话框中被键盘传感器吞没（#83617，已修复）
- 文本选择时意外触发composer拖拽弹出（#70422，已修复）
- 流式传输期间transcript自动滚动丢失阅读位置（#118482，已修复）

**3. 多Backend协调问题**
- 共享HERMES_HOME时中断标记误判导致重复turn（#94778，已修复）
- SSH远程后端启动失败产生僵尸进程（#96024，已修复）

### 用户满意点
- 快速响应关闭大量积压Issue（24小时内394个关闭）
- 安全更新及时（fast-uri漏洞修复）
- 插件系统扩展性（Nachos等社区插件贡献）

### 未满足需求
- 语音对话仅支持第一轮，后续utterance无法捕获（#75329，已修复）
- 默认profile只能显示3个会话，多会话项目难以管理（#70421，已修复）
- Windows PATH注入导致Python版本冲突（#22054，已修复）

---

## 8. 待处理积压

### 长期未响应的重要Issue

| Issue # | 创建日期 | 天数未动 | 优先级 | 描述 |
|---------|----------|----------|--------|------|
| #88584 | 2026-08-17 | 39天 | P3 | Nous自动化集成阻塞（139条评论，维护者沉默）|
| #97681 | 2026-08-29 | 27天 | P3 | 跨网关协作（等待#106742完成）|
| #59293 | 2026-07-06 | 81天 | P2 | CLI绕过系统配置保护（安全问题）|
| #92561 | 2026-08-22 | 34天 | P3 | 自定义provider不发送历史消息 |
| #121890 | 2026-09-24 | 1天 | P2 | SIGTERM下session id丢失 |

### 需要维护者关注的Open PR

| PR # | 创建日期 | 描述 | 风险 |
|------|----------|------|------|
| #122049 | 2026-09-25 | Gateway心跳包含session title | 低，新功能 |
| #122048 | 2026-09-25 | 内部事件不应re-key session-context | 中，可能影响现有行为 |
| #119381 | 2026-09-22 | Skills/Plugins目录整合 | 低，UX改进 |
| #122047 | 2026-09-25 | 插件autostash前清除unmerged index | 高，修复合并中断问题 |
| #122041 | 2026-09-24 | Bot行冷启动旋转反馈 | 低，UX细节 |

### 积压风险评估

**高风险积压：**
- #59293（安全漏洞）已81天未解决，建议提升至P1
- #88584（自动化阻塞）影响持续集成，需紧急响应

**中等风险：**
- #92561（自定义provider bug）影响Ollama等本地模型用户
- #121890（SIGTERM行为不一致）影响脚本集成场景

---

## 项目健康度总结

| 指标 | 数值 | 评估 |
|------|------|------|
| Issue关闭率 | 78.8% (394/500) | ✅ 优秀 |
| PR合并率 | 31.8% (159/500) | ⚠️ 正常（累积发布周期）|
| 安全更新 | 1个 (fast-uri) | ✅ 及时 |
| 高优先级Bug修复 | 6/8 (P1-P2) | ✅ 良好 |
| 长期未响应Issue | 5个 (>30天) | ⚠️ 需关注 |
| 社区活跃度 | 139条评论/Issue | ✅ 极高 |

**总体评估：** hermes-agent项目处于**成熟稳定期**，高吞吐量处理能力显示维护团队资源充足。当前重点是桌面端体验打磨和跨网关架构铺垫。安全风险#59293需优先处理，自动化集成阻塞#88584影响CI/CD流程。建议维护者平衡新功能开发与长期积压清理。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目日报 | 2026-09-25

## 1. 今日速览
AstrBot 在过去 24 小时内保持了**高活跃度**，共处理 7 个 Issue 和 12 个 PR。今日核心进展集中在**修复 v4.28.1 引入的稳定性回归**（时区兼容性问题与 Token 估算偏差），同时加速了 WebUI 的功能完善（技能/MCP 搜索）。无新版本发布，但多个关键 Bug 已收到修复 PR 并合并，项目整体健康度良好，社区响应迅速。

## 2. 版本发布
*   **无新版本发布**。

## 3. 项目进展
今日合并了 4 个 PR，主要聚焦于底层稳定性与性能优化：

*   **数据库兼容性修复**：`#10206` (wcqqq1214) 和 `#10211` (RC-CHN) 解决了因 SQLModel 0.0.45 升级导致的时区敏感问题，恢复了知识库写入和统计服务的正常工作。
*   **性能优化**：`#10187` (w1ndys) 为 Dashboard 静态资源添加了 Gzip 压缩，显著减少 JS/CSS 传输体积，提升 WebUI 加载速度。
*   **Token 估算修正**：`#10214` (eeeggplant) 修复了 Emoji 和非 CJK 字符的 Token 低估问题，防止上下文压缩后仍超出模型上限。
*   **其他修复**：`#10194` (letr007) 改进了引用图片的可用性判断逻辑，避免使用过期或无效的资源。

## 4. 社区热点
*   **Issue #9968** ([链接](https://github.com/AstrBotDevs/AstrBot/issues/9968)) - **多 Bot 配置隔离需求**
    *   **热度**：评论 5 条，创建已久但近期活跃。
    *   **分析**：用户希望在多实例场景下实现插件级配置隔离，这是高级用户的强需求，涉及架构层面的多配置档案支持。
*   **Issue #10212** ([链接](https://github.com/AstrBotDevs/AstrBot/issues/10212)) - **Dashboard 统计服务故障**
    *   **热度**：新建 Issue，快速引发关注。
    *   **分析**：反映了 v4.28.x 系列在 Windows/Launcher 部署下的兼容性问题，用户对 WebUI 数据展示功能依赖度高。
*   **PR #9984** ([链接](https://github.com/AstrBotDevs/AstrBot/pull/9984)) - **多语言指令支持**
    *   **热度**：长期开放的增强型 PR。
    *   **分析**：插件生态国际化需求，弥补运行时指令 i18n 空白，是插件开发者关注的功能。

## 5. Bug 与稳定性
今日报告了 3 个主要 Bug，均已在 v4.28.1 上下文中被发现：

| 严重等级 | Issue | 描述 | 修复状态 |
| :--- | :--- | :--- | :--- |
| **高** | [#10205](https://github.com/AstrBotDevs/AstrBot/issues/10205) | 知识库写入失败 (naive datetime) | ✅ **已合并 PR #10206** |
| **高** | [#10212](https://github.com/AstrBotDevs/AstrBot/issues/10212) | Dashboard 统计查询失败 (时区) | ✅ **已合并 PR #10211** |
| **中** | [#10208](https://github.com/AstrBotDevs/AstrBot/issues/10208) | Token 估算偏低导致请求被拒 (400) | ✅ **已合并 PR #10214** |
| 低 | [#10165](https://github.com/AstrBotDevs/AstrBot/issues/10165) | Cloud 插件市场前端显示异常 | ❌ 无修复 PR |

**稳定性评估**：v4.28.1 引入的 SQLModel 时区兼容性问题已得到快速修复，Token 估算偏差也已被纠正。当前稳定性风险较低。

## 6. 功能请求与路线图信号
*   **WebUI 搜索能力扩展**：Issue [#10196](https://github.com/AstrBotDevs/AstrBot/issues/10196) 提出为“技能”和“MCP”页面添加搜索功能，**PR [#10217](https://github.com/AstrBotDevs/AstrBot/pull/10217)** 已提交实现，预计将在下一版本中加入。
*   **多语言指令支持**：PR [#9984](https://github.com/AstrBotDevs/AstrBot/pull/9984) 持续推动插件指令的国际化，符合项目国际化战略方向。
*   **插件侧边栏嵌入**：Issue [#5725](https://github.com/AstrBotDevs/AstrBot/issues/5725) 请求允许插件注册侧边栏项以嵌入独立 UI，虽已关闭，但反映了大型插件对深度集成的需求，可能作为长期架构优化项。

## 7. 用户反馈摘要
*   **痛点**：用户反映 v4.28.0/4.28.1 在 Windows 环境下出现 Dashboard 统计页面无法加载的问题，严重影响日常运维监控体验。
*   **满意点**：社区对快速响应时区 Bug 表示认可，Gzip 压缩 PR 有助于提升 WebUI 性能。
*   **使用场景**：多 Bot 隔离配置（Issue #9968）是专业用户和集成商的核心诉求，希望在一个实例中管理多个不同配置的 QQ 机器人。
*   **不满点**：Cloud 插件市场在版本审核过程中的前端显示不一致（Issue #10165），导致用户困惑。

## 8. 待处理积压
*   **[OPEN] #10165** - Cloud 插件市场前端版本列表显示异常，后端数据正常但前端刷新后丢失，需前端团队介入排查。
*   **[OPEN] #9968** - 多 Bot 插件配置隔离功能需求，涉及核心架构设计，需维护者评估排期。
*   **[OPEN] #5725** - 插件侧边栏嵌入功能，虽已关闭但需求未解决，建议标记为长期愿景或移至 Discussions。
*   **[OPEN] #9984** - 多语言指令支持 PR，已提交较长时间，建议合并或给出明确反馈。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：** 2026-09-25  
**分析对象：** [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)  
**数据周期：** 过去24小时

## 1. 今日速览
DeepSeek Harness (DSH) 社区在过去24小时内保持高活跃度，Discussions 新增 **267** 条更新。今日核心事件是 **v0.1.7-rc.2** 候选版的发布，重点引入了定时任务、桌面端首次使用引导及快捷键自定义等实用功能，并修复了多项影响 Windows/macOS 体验的稳定性问题。尽管新功能正在推进，但社区对于 **历史会话迁移兼容性**、**遥测数据导致会话锁死** 以及 **桌面端安装包缺失** 的焦虑显著升温，多条高热度讨论反映了用户对版本迭代稳定性的担忧。

## 2. 版本发布
**新版本：dsh-v0.1.7-rc.2**

本次 Release 作为 rc.2 候选版本，主要聚焦于功能完善与关键 Bug 修复，未包含重大架构变更，但仍需注意以下调整：

### ✨ 新增功能
- **定时任务系统**：支持创建和管理提醒/定时任务，最短间隔为每分钟，重启后任务持久化保留。
- **桌面端新手指引**：新增首次使用引导流程，介绍可用额度、用途选择及工作过程展示方式，支持中途退出续传。
- **快捷键自定义**：Web 和桌面端均支持查看、搜索、自定义及恢复快捷键，侧边栏实时显示当前键位。
- **工具即时使用**：进行中的对话可直接调用新启用的工具，无需开启新对话。
- **人工审批介入**：自动审阅拒绝后，允许用户决定是否继续；审阅失败时会单独提示。
- **后台任务持续**：关闭桌面窗口后任务继续在后台运行，退出前会提示对任务的影响。

### 🐛 关键修复
- **Windows 稳定性**：修复文件菜单图标显示异常及优先使用关联应用打开文件的问题；修复安装中断或异常退出后插件安装/配置保存持续失败的问题。
- **启动与登录**：修复部分桌面安装包启动失败问题；减少浏览器密码填充误填入 API Key 输入框的情况。
- **数据与显示**：修复部分插件详情/设置页加载失败问题；修复长对话中工具输出字符显示残缺导致后续对话失败的问题；修复部分长对话无法发送消息的问题。
- **账号与额度**：优化额度不足时的提示文案，避免 API Key 用户误充至登录账号；减少账号余额刷新延迟导致的显示空白。
- **跨平台体验**：macOS 窗口顶部拖动优化，保持按钮/表单/弹窗正常响应；Windows 更新提示更清晰，支持自动重启及前台唤醒。

### ⚠️ 破坏性变更/调整（需关注）
- **插件管理调整**：插件管理页现支持启用自动审阅；**Inspector 不再默认提供**，需用户单独安装。
- **账号与 API Key 任务分离**：账号任务与 API Key 任务使用独立模型入口；退出账号前将确认并停止运行中的账号任务。
- **代码工作模式重构**：「代码工作工具」统一控制轨迹、代码差异和新任务模式；原独立模式选择开关已移除，新任务将直接使用保存的默认模式。
- **时间上下文**：启用后默认每十分钟向 Agent 更新一次时间（注意：Changelog 此处截断，建议查阅完整文档确认具体行为）。

**迁移注意事项**：由于涉及工作区命名规则变更（语言切换不再影响文件夹名）及插件默认配置变化，建议升级前备份 `~/.dsh` 配置目录，并重新检查插件安装状态（特别是 Inspector）。

## 3. 项目进展
本项目未启用传统 PR 流程，代码合并直接通过 Releases 落地。基于 v0.1.7-rc.2 Changelog，本次发版实质上合并了以下方向的改进：
- **桌面端体验深化**：解决了长期存在的 Windows 安装/启动异常、macOS 窗口交互卡顿等问题，提升了跨平台一致性。
- **工作流自动化增强**：定时任务功能的引入填补了 DSH 在自动化调度方面的空白。
- **会话稳定性加固**：针对长对话失败、遥测日志溢出（虽未在本版完全解决，见 Bug 章节）等痛点进行了部分修复。

项目整体处于 **v0.1.7 正式发布前的冲刺阶段**，重点在于打磨桌面端稳定性和修复高优先级社区反馈的 Bug。

## 4. 社区热点
以下 Discussions 在过去24小时内评论活跃，反映了社区的核心关切：

1.  **[Ideas] dsh-vault — 加密凭据保险库插件** (#1457) - *252 评论*
    -   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/1457)
    -   **分析**：用户开发了一个基于 Node `node:crypto` 的加密凭据管理插件，支持 SSH、API Key、OAuth Token 等的加密存储与动态生成。高热度表明用户对**本地凭据安全**有强烈需求，且希望 DSH 生态能提供更专业的安全插件支持。

2.  **[General] 本轮运行失败 Cannot read properties of undefined (reading 'prepare')** (#7035) - *37 评论*
    -   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/7035)
    -   **分析**：直接关联到 Discussion #4549 描述的 Bug，用户反馈工具调用失败。这是当前影响 Agent 运行稳定性的**最高频报错之一**。

3.  **[Ideas] Please send x-opencode-session header on API requests** (#5495) - *37 评论*
    -   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)
    -   **分析**：OpenCode Go API 提供商要求添加特定 Header 以支持路由和优化，涉及约 2.5万 DSH 用户组织。这反映了 DSH 作为**中间件层**需要与第三方 API 服务商保持协议同步的重要性。

4.  **[General] 0.17.*-alpha UI 吐槽贴** (#7443) - *23 评论*
    -   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/7443)
    -   **分析**：用户对 UI 动画不同步、图标风格不一致（与官网脱节）、以及“抄袭 Codex”的交互重构表示不满。这是**用户体验层面的集中负面反馈**，提示设计团队需加强视觉一致性和用户调研。

5.  **[General] 每次升级都一大堆插件崩掉，当前架构的意义何在？** (#7651) - *10 评论*
    -   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/7651)
    -   **分析**：用户质疑插件化架构的稳定性。结合其他迁移类 Bug，这表明**插件兼容性和升级平滑性**是当前的重大信任危机。

6.  **[General] [Bug] [DSH 0.1.7-alpha.2] 默认开启的会话日志遥测字段把请求体撑到 205.87 MB** (#7699) - *7 评论*
    -   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/7699)
    -   **分析**：这是一个**严重的设计缺陷**。遥测数据无序膨胀导致会话永久锁死（400 INVALID_REQUEST），且发生在 rc.2 发布前的 alpha 版本中，暴露了测试覆盖的不足。

## 5. Bug 与稳定性
按严重程度排列：

1.  **🔴 严重：遥测数据导致会话永久锁死**
    -   **现象**：默认开启的 `dsh_session_log` 遥测字段体积爆炸（实测 205 MB+），导致请求体超限，会话陷入自锁死循环，永久无法使用。
    -   **来源**：[#7699](https://github.com/deepseek-ai/deepseek-harness/discussions/7699)
    -   **状态**：未修复。需评估是否在 rc.2 或后续 hotfix 中默认关闭遥测或实施日志截断机制。

2.  **🔴 严重：工具调用失败导致会话不可用**
    -   **现象**：当工具调用经过 `prepare`/`dispatch`/`finalize` 任意失败路径时，`tool/call` 被追加但 `tool/result` 未写入，导致会话返回 400 错误且永久损坏。
    -   **来源**：[#4549](https://github.com/deepseek-ai/deepseek-harness/discussions/4549), [#7035](https://github.com/deepseek-ai/deepseek-harness/discussions/7035)
    -   **状态**：已有修复方案讨论（append missing tool/result），但未确认是否已合入 rc.2。

3.  **🟠 高：历史会话迁移兼容性断裂**
    -   **现象**：从旧版本（如 0.1.1-rc.2, 0.1.2-rc.1）升级后，大量历史会话（v0 格式）无法打开，报错 `SessionFormatUnsupportedError`。
    -   **来源**：[#6559](https://github.com/deepseek-ai/deepseek-harness/discussions/6559), [#6779](https://github.com/deepseek-ai/deepseek-harness/discussions/6779), [#6757](https://github.com/deepseek-ai/deepseek-harness/discussions/6757)
    -   **状态**：迁移器拒收了合法的历史格式（如 `descriptor v2`）。这是**破坏性变更**，需官方提供数据修复工具或回退指南。

4.  **🟡 中：多实例并发导致会话日志冲突**
    -   **现象**：两个 DSH Web 实例共用同一 `DSH_HOME` 并发操作同一会话，导致 seq 冲突和历史记录损坏。
    -   **来源**：[#4178](https://github.com/deepseek-ai/deepseek-harness/discussions/4178)
    -   **状态**：长期存在，缺乏锁机制保护。

5.  **🟡 中：Sandbox ACL 审批频繁**
    -   **现象**：用户在 0.1.7-alpha2 中遇到过多的 Sandbox ACL 失败审批请求。
    -   **来源**：[#7564](https://github.com/deepseek-ai/deepseek-harness/discussions/7564)
    -   **状态**：用户体验问题，可能需要调整默认权限策略。

## 6. 功能请求与路线图信号
-   **加密凭据管理**：[#1457](https://github.com/deepseek-ai/deepseek-harness/discussions/1457) 显示社区有强烈的本地安全插件需求，官方可考虑将此类插件纳入官方市场或提供标准接口。
-   **桌面端官方安装包**：[#7446](https://github.com/deepseek-ai/deepseek-harness/discussions/7446) 用户抱怨公开渠道缺乏 dmg/exe 安装包。鉴于 v0.1.7-rc.2 已发布桌面端功能更新，**尽快提供官方预构建包**是回归用户信任的关键。
-   **API 兼容性头信息**：[#5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495) 要求支持自定义 Header，以适配第三方推理服务（如 OpenCode Go）。这属于**网关兼容性**功能，应纳入路线图以扩大 DSH 的适用场景。
-   **遥测数据控制**：用户迫切需要在设置中关闭或限制遥测日志大小，以避免性能和安全问题。

## 7. 用户反馈摘要
-   **痛点**：
    -   **升级即毁数据**：多次升级导致历史会话无法访问（[#6559](https://github.com/deepseek-ai/deepseek-harness/discussions/6559), [#6779](https://github.com/deepseek-ai/deepseek-harness/discussions/6779)），用户感到沮丧和不被尊重。
    -   **架构稳定性存疑**：插件崩溃、工具调用失败、并发冲突等问题频发，用户质疑“插件化架构的意义”（[#7651](https://github.com/deepseek-ai/deepseek-harness/discussions/7651)）。
    -   **UI/UX 倒退**：新版 UI 被批评风格不统一、动画不同步、交互逻辑混乱（[#7443](https://github.com/deepseek-ai/deepseek-harness/discussions/7443)）。
-   **满意点**：
    -   v0.1.7-rc.2 引入的**定时任务**和**桌面端新手指引**受到欢迎，体现了对产品易用性的关注。
    -   对 **Windows 文件关联**和 **macOS 窗口拖动**的细节修复，显示了团队对跨平台体验的重视。

## 8. 待处理积压
-   **遥测 Bug 紧急修复**：[#7699](https://github.com/deepseek-ai/deepseek-harness/discussions/7699) 描述的遥测锁死问题极其严重，建议在下一个 patch 版本中优先解决（如默认关闭遥测或增加大小上限）。
-   **迁移工具修复**：[#6559](https://github.com/deepseek-ai/deepseek-harness/discussions/6559) 和 [#6779](https://github.com/deepseek-ai/deepseek-harness/discussions/6779) 涉及的 v0→v1/v3 迁移失败问题，需要官方提供一键修复脚本或更新迁移器以兼容历史格式。
-   **桌面端打包流水线**：[#7446](https://github.com/deepseek-ai/deepseek-harness/discussions/7446) 指出官方缺乏可下载的安装包，需检查 GitHub Actions 构建流水线是否正常产出 assets。
-   **工具调用失败全局修复**：[#4549](https://github.com/deepseek-ai/deepseek-harness/discussions/4549) 的修复需验证是否已覆盖所有失败路径（prepare/dispatch/finalize），并回归测试。

---
*报告生成时间：2026-09-25*  
*数据来源：DeepSeek Harness GitHub Discussions & Releases*

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*