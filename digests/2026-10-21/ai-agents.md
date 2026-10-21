# OpenClaw 生态日报 2026-10-21

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-21 00:13 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 (2026-10-21)

## 1. 今日速览
2026 年 10 月 21 日，OpenClaw 社区活跃度极高，过去 24 小时内有 500 条 Issues 和 500 条 PRs 获得更新，显示出高密度的开发协作。然而，项目当前面临严峻的稳定性挑战，尤其是 Windows 平台的启动卡顿、SQLite 状态锁死以及内存泄漏等 P0/P1 级问题正导致大量用户的服务中断。代码重构正在进行中，开发者致力于清理低价值的测试代码并优化私有模块，但在解决核心稳定性 Bug 之前，功能迭代（如新的 MCP 鉴权和 TTS 支持）可能会受到阻碍。整体而言，项目健康度呈红黄灯状态，紧急修复稳定性优先于新功能开发。

## 2. 版本发布
**今日无新版本发布。**

## 3. 项目进展
今日合并与关闭的 PRs 主要集中在代码清理、测试优化和底层模块重构上：
*   **测试与代码清理**：
    *   维护者持续清理低价值测试代码，[PR #178866](https://github.com/openclaw/openclaw/pull/178866) 和 [PR #178683](https://github.com/openclaw/openclaw/pull/178683) 分别清理了运行时代码和 Agent/UI 层的 98 个冗余测试文件，以提升代码库的可维护性。
    *   [PR #178884](https://github.com/openclaw/openclaw/pull/178884) 和 [PR #178885](https://github.com/openclaw/openclaw/pull/178885) 重构了内部执行和私有适配器，移除了生产环境中永远不会选择的“单一调用者”辅助模块，降低代码复杂度。
*   **CI 与工程优化**：
    *   [PR #178887](https://github.com/openclaw/openclaw/pull/178887) 修复了 UI 聊天页面测试中因引入大量上下文导致的 43 秒耗时问题，显著提升了 CI 速度。
    *   [PR #178883](https://github.com/openclaw/openclaw/pull/178883) 修复了 Linux 下 worker 清理在进程退出时的竞态条件，防止服务恢复失败。
*   **功能开发推进**：
    *   虽然稳定性问题较多，但开发者仍在推进新功能，例如 [PR #178860](https://github.com/openclaw/openclaw/pull/178860) 为 ClawRouter 增加了原生的 TTS-1 语音提供商，以及 [PR #178886](https://github.com/openclaw/openclaw/pull/178886) 支持了原生的 Typed Decisions API。

## 4. 社区热点
当前讨论最活跃的 Issues 集中在核心网关的稳定性与数据完整性上：
*   **核心内存泄漏 (P0)**：[#91588](https://github.com/openclaw/openclaw/issues/91588) 记录了网关在正常运行几天后 RSS 内存从 350MB 暴涨至 15.5GB 的问题，导致 OOM 崩溃。这是目前最严重且最受关注的问题之一。
*   **事件循环阻塞 (P0)**：[#160959](https://github.com/openclaw/openclaw/issues/160959) 指出在 2026.9.6 版本后，加载大型外部插件会导致网关事件循环阻塞数分钟，严重影响用户体验。
*   **SQLite 锁死与状态不可用 (P0/P2)**：
    *   [#164294](https://github.com/openclaw/openclaw/issues/164294) 和 [#172091](https://github.com/openclaw/openclaw/issues/172091) 均指向 SQLite WAL 自动检查点被永久阻塞，导致状态数据库无法写入。
    *   [#166634](https://github.com/openclaw/openclaw/issues/166634) 提到在崩溃恢复后，由于回收检查点失败，Agent 会永久拒绝服务（`UNAVAILABLE`）。
*   **Windows 平台可靠性**：[#170956](https://github.com/openclaw/openclaw/issues/170956) 描述了 Windows 上启动缓慢、插件非正常关闭以及权限错误导致重启和更新失败的问题。

**背后诉求分析**：社区用户（尤其是使用多 Agent 部署和 Windows 平台的管理员）对系统可靠性的容忍度极低。目前的反馈集中在“服务挂起”、“无法重启”和“数据锁死”上，表明核心状态管理（SQLite）和插件加载机制的稳定性是当前最亟需解决的痛点。

## 5. Bug 与稳定性
按严重程度排列今日报告的 Bug：

*   **[P0] Gateway 内存泄漏导致 OOM 崩溃** ([#91588](https://github.com/openclaw/openclaw/issues/91588))
    *   *状态*：Open，需维护者审查。
    *   *详情*：内存从 350MB 涨至 15.5GB，导致进程被系统杀死。
*   **[P0] 网关事件循环在插件捕获时阻塞** ([#160959](https://github.com/openclaw/openclaw/issues/160959))
    *   *状态*：Open，需维护者审查。
    *   *详情*：加载大型插件时阻塞事件循环数分钟，属于 2026.9.6 引入的回归。
*   **[P0] 崩溃恢复后 Agent 永久不可用** ([#166634](https://github.com/openclaw/openclaw/issues/166634))
    *   *状态*：Open，需复现验证。
    *   *详情*：SQLite 检查点过期导致会话回收失败，Agent 拒绝所有请求。
*   **[P0] Windows 更新与重启不可靠** ([#170956](https://github.com/openclaw/openclaw/issues/170956))
    *   *状态*：Open，需维护者审查。
    *   *详情*：Windows 计划任务安装下，插件关闭非正常，更新失败率高。
*   **[P1] Telegram 消息发送失败无重试** ([#125764](https://github.com/openclaw/openclaw/issues/125764))
    *   *状态*：Open，已有相关 PR 讨论。
    *   *详情*：网络瞬时故障导致出站消息直接 Dead-letter，静默丢失重要消息。
*   **[P1] Codex Subagent 分配未清理** ([#172837](https://github.com/openclaw/openclaw/issues/172837))
    *   *状态*：Open，已有 Fix PR ([#177577](https://github.com/openclaw/openclaw/pull/177577))。
    *   *详情*：子代理完成后，父线程无法解除“活动工作”锁定，需手动重启。
*   **[P2] SQLite WAL 检查点被阻塞** ([#164294](https://github.com/openclaw/openclaw/issues/164294), [#172091](https://github.com/openclaw/openclaw/issues/172091))
    *   *状态*：Open。
    *   *详情*：WAL 无法完成自动检查点，数据库文件无限增长且读写受阻。

## 6. 功能请求与路线图信号
*   **MCP 企业级鉴权**：[PR #178726](https://github.com/openclaw/openclaw/pull/178726) 提出了针对 HTTP MCP 服务器的企业级 OIDC 鉴权方案，标志着项目向企业级多租户安全场景深化。
*   **Slack 频道创建**：[PR #163783](https://github.com/openclaw/openclaw/pull/163783) 允许 Agent 在 Slack 中直接创建公共频道，增强了工作流自动化能力。
*   **原生 TTS 与 图像生成**：ClawRouter 正在集成原生 TTS ([#178860](https://github.com/openclaw/openclaw/pull/178860)) 和图像生成 ([#178876](https://github.com/openclaw/openclaw/pull/178876))，旨在减少对第三方 API 的依赖，提升多模态响应能力。
*   **委派工作归因**：[PR #178493](https://github.com/openclaw/openclaw/pull/178493) 提出将委派任务归属于发起的人类用户，解决当前 Agent 自动执行任务时缺乏明确 Owner 的管理痛点。

## 7. 用户反馈摘要
*   **痛点 - Windows 体验差**：用户反映 Windows 平台下的 OpenClaw 更新极其不稳定，需要多次重试才能成功，且经常伴随网关短暂断连 ([#170956](https://github.com/openclaw/openclaw/issues/170956), [#162899](https://github.com/openclaw/openclaw/issues/162899))。
*   **痛点 - 长会话管理困难**：长运行会话导致上下文溢出，且现有的压缩（Compaction）机制无法有效回收空间，导致会话进入失败循环 ([#113701](https://github.com/openclaw/openclaw/issues/113701), [#125308](https://github.com/openclaw/openclaw/issues/125308))。
*   **痛点 - 消息丢失焦虑**：Telegram 和 Signal 频道的消息在瞬时网络错误下会静默丢失，且缺乏可见的重试或告警机制，用户对此表示强烈不满 ([#125764](https://github.com/openclaw/openclaw/issues/125764), [#116164](https://github.com/openclaw/openclaw/issues/116164))。
*   **诉求 - 配置灵活性**：用户希望 SQLite 的 `busy_timeout`、WAL 检查点频率等关键参数可配置，以适应高负载环境 ([#138326](https://github.com/openclaw/openclaw/issues/138326))。

## 8. 待处理积压
*   **长期稳定性回归**：
    *   [#91588](https://github.com/openclaw/openclaw/issues/91588) (内存泄漏) 创建于 6 月，至今未解决，是 P0 级最高优先级积压。
    *   [#149270](https://github.com/openclaw/openclaw/issues/149270) 指出 Code-mode 会话因工具分发未决导致永久卡死，影响所有使用长时任务的用户。
*   **平台特定问题**：
    *   Windows 的多个 P0/P1 Bug ([#170956](https://github.com/openclaw/openclaw/issues/170956), [#171831](https://github.com/openclaw/openclaw/issues/171831)) 需要维护者进行专项排查，目前缺乏进展。
*   **插件兼容性**：
    *   [#145937](https://github.com/openclaw/openclaw/issues/145937) 指出 QQ 频道在 2026.9.x 版本中完全没有可用的插件（官方插件崩溃，第三方插件流式传输失败），急需维护者介入修复。

**总结**：OpenClaw 团队今日在工程质量和测试优化上保持了高效率，但必须将资源倾斜至修复 P0 级的网关稳定性问题（内存、SQLite 锁、Windows 启动），否则将严重影响社区对该项目核心可靠性的信心。

---

## 横向生态对比

# 开源 AI 智能体生态横向对比分析报告
**日期：** 2026-10-21
**分析对象：** OpenClaw, Zeroclaw, PicoClaw, QwenPaw, hermes-agent, AstrBot, DeepSeek Harness

## 1. 生态全景
当前个人 AI 助手与自主智能体开源生态呈现出**“多极化竞争与专业化分工”**的态势。头部项目（OpenClaw, hermes-agent）正经历从功能迭代向**核心稳定性与工程鲁棒性**回归的痛苦重构期，而中腰部项目（QwenPaw, Zeroclaw）通过模块化、轻量化架构快速抢占特定垂直场景。边缘计算与轻量级部署（PicoClaw）及企业级网关集成（DeepSeek Harness）正在填补生态两端的市场空白，整体行业重心已从“模型能力接入”转向“状态管理、安全边界与多端一致性”的基础设施治理。

## 2. 各项目活跃度对比

| 项目 | 24h Issues 更新 | 24h PR 更新 | Release 情况 | 健康度评估 | 核心状态 |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **OpenClaw** | 500 | 500 | 无 | 🔴 **红** | 高密度协作，P0 稳定性危机（内存泄漏/SQLite锁） |
| **hermes-agent** | 414 | 500 | 无 | 🟡 **黄** | 高密度修复期，Gateway 统一后多端回归收敛中 |
| **Zeroclaw** | 50 | 50 | 无 (v0.8.7 前夕) | 🟡 **黄** | 发布阻塞期，CI/CD 与安全漏洞修复集中 |
| **QwenPaw** | 48 | 48 | 无 | 🟢 **绿** | 模块化演进，v2.3.0 路线图清晰，响应及时 |
| **AstrBot** | 9 | 30 | 无 | 🟢 **绿** | 平稳迭代，聚焦 WebUI 与插件规范化，响应快 |
| **DeepSeek Harness**| 223 (Discussions) | N/A | 无 | 🟡 **黄** | 社区互动高，但代码静默，面临 API 兼容中断风险 |
| **PicoClaw** | 1 | 0 | 无 | ⚪ **静默** | 低活跃，边缘定位，单一陈旧提案待处理 |

## 3. OpenClaw 在生态中的定位
*   **社区规模与影响力**：OpenClaw 是生态中的“巨无霸”，日均 500+ 的 Issue/PR 流量远超其他项目，拥有最广泛的开发者与用户基数，是事实上的功能基准线。
*   **技术路线差异**：相比 Zeroclaw 的轻量 Wasm 插件沙箱和 hermes-agent 的多端统一 Gateway 架构，OpenClaw 仍依赖传统的 Node.js 事件循环与 SQLite 持久化。这导致其在处理高并发与长生命周期任务时，暴露出严重的内存泄漏（P0）与事件循环阻塞问题，技术架构的“重型”是其当前稳定性危机的根源。
*   **优势与挑战**：OpenClaw 在多模态支持（原生 TTS/图像）和企业级鉴权（MCP OIDC）上推进最快，功能丰富度领先；但相比 QwenPaw 和 AstrBot 的平稳迭代，其“功能跑在稳定性前面”的路线使其社区信任度面临严峻挑战，亟需从“功能扩张”转向“底层重构”。

## 4. 共同关注的技术方向
*   **长会话与上下文管理优化**：
    *   *OpenClaw*：长会话导致上下文溢出与压缩失效（#113701）。
    *   *QwenPaw*：引入 ReMe 0.4.2 的 JEV（Judge-Explain-Verify）压缩路径（#8347）。
    *   *hermes-agent*：Live time context 缺失导致的时间感知不一致（#10421）。
    *   *DeepSeek Harness*：强烈诉求原生长期记忆（Long-term Memory）迁移（#14）。
*   **多端一致性与状态同步**：
    *   *hermes-agent*：统一 Gateway 后 Desktop/CLI/TUI 会话状态与消息投递回归（#134889）。
    *   *OpenClaw*：崩溃恢复后 Agent 永久不可用（SQLite 锁死）（#166634）。
    *   *AstrBot*：Cron 任务唤醒 Agent 时的权限状态不一致（#10641）。
*   **安全边界与权限治理**：
    *   *Zeroclaw*：基于信任边界的统一访问控制 RFC（#11914），插件权限与内存隔离修复。
    *   *hermes-agent*：Git 全局 flag 绕过与 smart approval 误批准导致的数据丢失风险（#136527, #141346）。
    *   *OpenClaw*：MCP 企业级 OIDC 鉴权（#178726），委派任务归因管理（#178493）。

## 5. 差异化定位分析
*   **功能侧重**：**OpenClaw** 与 **DeepSeek Harness** 侧重功能广度与多模态；**QwenPaw** 与 **AstrBot** 侧重 Web/移动端体验与渠道稳定性；**Zeroclaw** 侧重安全沙箱与极客级插件控制；**PicoClaw** 专攻边缘计算低依赖部署。
*   **目标用户**：**OpenClaw/hermes-agent** 面向大型多 Agent 部署团队与重度自动化用户；**QwenPaw/AstrBot** 面向 DevOps 自动化、内容创作及国内渠道（QQ/钉钉/飞书）运营者；**DeepSeek Harness** 面向企业级网关集成与插件生态开发者；**PicoClaw** 面向嵌入式/IoT 场景的极客与研究者。
*   **技术架构**：**OpenClaw**（Node/SQLite 单体），**hermes-agent**（统一 Gateway 多端 Runtime），**Zeroclaw**（Rust/Wasm 隔离），**QwenPaw**（模块化/插件热重载），**DeepSeek Harness**（Discussions 驱动/Release 合并机制）。

## 6. 社区热度与成熟度
*   **快速迭代/高风险阶段**：**OpenClaw** 与 **hermes-agent**。两者均处于架构合并或重构后的阵痛期，日均更新量巨大，P0/P1 级 Bug 密集，处于“功能狂奔”后的质量巩固前夜，社区对稳定性的容忍度处于临界点。
*   **高质量巩固阶段**：**QwenPaw** 与 **AstrBot**。日均更新量适中（<50），Bug 响应迅速且闭环率高，代码库变更聚焦于模块化演进与体验优化，成熟度较高，适合生产环境部署。
*   **生态治理/静默阶段**：**DeepSeek Harness** 处于社区热度极高但代码静默的断层期，面临 API 兼容中断风险；**Zeroclaw** 处于发布前的安全合规与 CI 阻塞期；**PicoClaw** 处于低活跃的边缘探索期。

## 7. 值得关注的趋势信号
*   **状态持久化成为核心竞争壁垒**：SQLite 锁死、WAL 检查点阻塞（OpenClaw）与会话日志损坏（DeepSeek Harness）表明，AI 助手正从“无状态对话”向“长生命周期有状态服务”演进，底层存储的一致性与崩溃恢复能力将决定产品的生死。
*   **安全与审计从“可选”变为“必选”**：hermes-agent 的加密审计链落地、Zeroclaw 的信任边界 RFC 以及 OpenClaw 的 MCP 鉴权，反映出随着 Agent 获得更高系统权限（Shell/文件系统），开发者与用户对“防误操作”与“行为可追溯”的需求急剧上升。
*   **轻量化与边缘化部署崛起**：PicoClaw 的低依赖诉求与 Zeroclaw 的二进制体积控制（64MiB 上限）表明，市场正在寻找替代重型 Docker/Node 环境的高性能运行时，Wasm 与边缘计算在 AI 助手生态中的占比将逐步扩大。
*   **渠道适配的“国内化”特征明显**：AstrBot 与 QwenPaw 对 QQ、钉钉、飞书及国产模型（DeepSeek/MiniMax）的深度适配，揭示了开源 AI 助手生态正形成显著的“中美分轨”现象，针对国内网络环境（代理、镜像）与渠道 API 特性的定制化开发是重要的差异化生存空间。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目日报 (2026-10-21)

## 1. 今日速览
昨日项目活跃度极高，过去 24 小时内共更新了 100 条动态（50 条 Issues 和 50 条 PRs），显示出社区在 v0.8.7 版本发布前夕的高强度投入。目前 v0.8.7 版本尚未发布，但大量 CI/CD、发布阻塞及二进制大小问题正在集中处理。安全领域关注度高，出现了针对内存隔离、插件权限及外部依赖漏洞的修复请求。社区主要聚焦于提升渠道（Channels）、插件（Plugins）及运行时（Runtime）的稳定性与安全性。

## 2. 版本发布
**无新版本发布**（最新 Release 为空）。
当前团队正集中精力完成 v0.8.7 的发布前检查，多个 CI 任务正致力于解决构建失败及超时问题。

## 3. 项目进展
过去 24 小时仅合入/关闭 1 条 PR，处于 v0.8.7 发布的稳定积压期。大量基础架构与功能开发（如 #11274、#11186、#9809）已进入高成熟度阶段，主要聚焦于 RPC 架构增强、多模型配置及渠道传输改进。

## 4. 社区热点
**高讨论度 Issue/PR：**
*   **SOP 运行时缺陷 (#11055)**：[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) (8 评论)。用户反馈在独立渠道启动 SOP 时，缺乏实时的工具句柄，导致 daemon 部署下工具无法使用。
*   **llama.cpp 模型接入异常 (#11296)**：[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11296) (6 评论)。配置非本地 IP 地址的自定义 provider 时，URI 解析失败。
*   **目标策略模块重构 (#11880)**：[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/11880)。作为 Goal Mode V1 的第 3/12 个切片，目前处于 Draft 状态，受依赖项安全修复阻塞。

**分析**：用户痛点主要集中在**插件系统的权限与一致性**、**多渠道（Telegram/Slack）消息体验**以及**LLM 提供商配置灵活性**。

## 5. Bug 与稳定性
**高危 Bug (P0/P1)：**
*   **[Bug] SOP 引擎提前执行步骤 (#10066)**：[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10066)。步骤 schema 校验失败时，引擎仍继续执行后续步骤。属于 S1 级别工作流阻塞，暂无直接 Fix PR。
*   **[Bug] 幽灵图像残留 (#11554)**：[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11554)。多轮对话中，旧图像的 `[IMAGE:]` 标记反复重发，导致模型误解。属于 S2 级别功能降级，暂无直接 Fix PR。
*   **[Bug] 外部依赖更新 (#11906)**：[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/11906)。修补 Wasmtime 48.0.7 的 5 个安全漏洞 (RUSTSEC)，目前处于开放状态，急需合并以通过 `cargo audit`。
*   **[Bug] 插件网络黑洞导致连接挂起 (#11813)**：[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11813)。WASM 插件 egress 连接在首个解析地址失效时无法自动切换备用地址。

**中低危 Bug：**
*   **[Bug] 插件卸载误删文件 (#11357)**：[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11357)。`plugin remove` 删除了错误的插件目录，存在数据安全风险。
*   **[Bug] 跨 Agent 内存泄露 (#11912)**：[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11912)。内存召回绕过了单 Agent 作用域限制。已有对应 PR #11910（强制系统提示词预算，fail closed）正在进行。

## 6. 功能请求与路线图信号
*   **Firecrawl 搜索支持 (#11680)**：[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/11680)。新增 Firecrawl 作为 Web 搜索 Provider，属于重要功能扩展，处于待审批阶段。
*   **Telegram 富媒体消息 (#11862, #8415)**：[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/11862)。通过 Bot API 10.1 支持表格、引用等富文本格式。#8415 为长期追踪 Issue，#11862 提供了具体的实现方案。
*   **主基于信任边界的访问控制 (#11914)**：[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11914)。提出统一的内容/记忆/能力控制层 RFC，旨在系统性解决近期出现的一系列越权问题，是未来安全架构的核心信号。

## 7. 用户反馈摘要
*   **插件系统体验不佳**：多个 Issue (#11336, #11360, #11327) 指出 `plugin list` 和 `plugin info` 的验证逻辑与运行时实际行为不一致，甚至存在包锁文件权限错误导致安装/卸载失败的问题。
*   **Quickstart 流程繁琐**：#11819 和 #10997 指出在引导新用户时，无法在安装阶段同步配置插件，且模型与 URI 提示顺序不直观，增加操作摩擦。
*   **CI/CD 环境不稳定**：#11831 和 #11839 提到 macOS `macos-14` 节点即将退役，且 arm64 的 `dist` 镜像构建内存溢出问题频繁，迫使维护者紧急调整发布流水线。

## 8. 待处理积压
*   **x86_64 Linux 发布体积告警 (#11580)**：[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11580)。二进制体积距离 64MiB 上限仅余 0.7MB（1%），需维护者决定是提升上限还是继续瘦身，直接阻塞后续发布。
*   **长期未响应的增强需求 (#6998)**：[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6998)。关于 Schema 校验内存合并的请求处于 parking-lot 状态，自 5 月起未获实质推进。
*   **高优 PR 等待审查 (#11274, #11186)**：两条 XL 级别的大型 RPC 客户端改进 PR 处于 Open 状态，堆叠提交多，急需核心维护者介入 Review 以合并。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：** 2026-10-21

## 1. 今日速览
过去 24 小时内，PicoClaw 项目整体处于**低活跃状态**。共监测到 1 条 Issue 状态更新，无任何 Pull Request 活动（提交、合并或关闭均为 0），且无新版本发布。项目当前的主要互动集中在外部社区提案的讨论上，代码主干未发生变动。

## 2. 版本发布
*暂无新版本发布。*

## 3. 项目进展
*过去 24 小时内无合并或关闭的 Pull Request，代码库无新增功能或修复合入。*

## 4. 社区热点
今日讨论最活跃（也是唯一活跃）的条目为一条关于集成外部插件的提案，但该提案已被系统标记为陈旧（stale）。

* **[#3427] [stale] Proposal: low-dependency Plazmi MCP/CLI example for persistent agent sessions**
  *   **状态**：OPEN (Stale)
  *   **链接**：[https://github.com/sipeed/picoclaw/issues/3427](https://github.com/sipeed/picoclaw/issues/3427)
  *   **分析**：用户 `@cairn-agent` 提议引入 Plazmi 的 MCP/CLI 示例，旨在利用 PicoClaw 的 MCP CLI 和 heartbeat 能力构建一个“低依赖”的持久化代理会话示例。该提案强调仅需一个 Python 文件即可实现社区 shell 客户端，体现了社区对**降低依赖复杂度**和**探索持久化代理（Persistent Agent）场景**的强烈诉求。然而，该 Issue 创建于 10 月 13 日，最近一次更新于 10 月 20 日，目前已被标记为 `[stale]`，表明维护者尚未对此提案作出实质性回应。

## 5. Bug 与稳定性
*过去 24 小时内未报告新的 Bug、崩溃或回归问题。*

## 6. 功能请求与路线图信号
*   **持久化代理会话示例**：基于 [#3427](https://github.com/sipeed/picoclaw/issues/3427)，社区对结合 MCP (Model Context Protocol) 实现持久化交互（如 homes, gardens, neighbour interactions on real UTC time）表现出兴趣。虽然该 Issue 已被标记为 stale，但其反映的需求（低依赖、轻量级示例）可能仍值得维护者在未来的 roadmap 中评估是否纳入，尤其是在 PicoClaw 作为边缘 AI 代理框架的定位下，探索轻量级持久化交互具有一定的代表性。

## 7. 用户反馈摘要
*   基于 **#3427** 的摘要，用户反馈聚焦于对 PicoClaw 现有 MCP CLI 和 heartbeat 能力的认可，认为其是承载“小型持久化世界示例”的理想环境。
*   用户痛点/诉求：寻求**低依赖（low-dependency）**的集成方案，避免复杂的依赖链，以便更轻便地在本地或边缘设备上运行代理交互场景。

## 8. 待处理积压
*   **[ #3427 ]** ([链接](https://github.com/sipeed/picoclaw/issues/3427))：该 Issue 创建于 2026-10-13，最近更新于 2026-10-20，已被标记为 `[stale]`。作为一条涉及 MCP 集成的具体技术提案，建议在维护者有精力时重新评估其价值，或正式关闭并归档，以保持 Issue 跟踪列表的整洁。目前无其他长期未响应的重要 Issue 或 PR 积压。

---
**项目健康度评估**：平稳。代码库静止，社区互动低频且集中在单一陈旧提案上。建议维护者定期清理 stale issues，以保持项目核心 Issue 列表的信噪比。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

**QwenPaw 项目动态日报**
**日期：** 2026-10-21

### 1. 今日速览
QwenPaw 项目今日保持高度活跃，过去24小时内共有48条 Issue 和 PR 更新，显示出持续的开发投入。尽管今日未发布新版本，但核心功能正在向**模块化、轻量化和插件化**方向演进，尤其是 v2.3.0 的路线图信号强烈。社区活跃度集中在解决多模态音频兼容性问题、渠道（Channel）稳定性修复以及前端 Console 的交互体验优化上。项目整体健康度良好，响应机制及时，大部分 Bug 均有对应的修复 PR 正在推进。

### 2. 版本发布
**今日无新版本发布。**

### 3. 项目进展
今日共合并/关闭 9 条 PR，主要推进了以下关键改进：
*   **音频兼容性修复**：PR #8215 关闭，正式修复了 LM Studio 等模型在 `send_file_to_user` 发送音频后，因历史消息中残留音频 DataBlock 导致的 400 错误。这解决了困扰多模态用户的长期痛点。
*   **Console 滚动稳定性**：PR #8339 关闭，修复了长对话中因 `content-visibility` 导致滚动位置“跳跃”的问题，显著提升了 Web 端用户体验。
*   **插件与渠道加固**：PR #7654 关闭，完善了音频回退分类器对 llama-server 和 DashScope 错误识别，提升了 Agent 在遇到模型限制时的鲁棒性。
*   **部署灵活性**：PR #8177 关闭，允许配置 Console 的 basename，支持了反向代理子路径部署，降低了企业级自托管的门槛。

### 4. 社区热点
今日讨论最活跃的议题集中在**移动端插件标准化**和**上下文压缩优化**：
*   **插件主题扩展性** ([#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071))：社区强烈请求为插件提供语义令牌覆盖层，目前插件仅能通过 `colorPrimary` 进行主题定制，限制了高阶插件的开发空间。
*   **移动端本地插件宿主** ([#8311](https://github.com/agentscope-ai/QwenPaw/issues/8311))：HarmonyOS 开发者请求标准化 `window.QwenPaw` 契约及数据面桥，反映出项目正从纯 Web 向多端原生扩展，生态需求正在快速上升。
*   **上下文 JEV 压缩** ([#8347](https://github.com/agentscope-ai/QwenPaw/pull/8347))：引入了 ReMe 0.4.2 集成，旨在通过 JEV（Judge-Explain-Verify）路径在上下文压力过大时保留关键证据，这是一个极具前瞻性的架构优化，可能成为 v2.3.0 的核心特性。

### 5. Bug 与稳定性
按严重程度排列，今日主要 Bug 及其修复状态如下：
*   **【严重】飞书渠道 426 错误** ([#8315](https://github.com/agentscope-ai/QwenPaw/issues/8315))：当环境注入代理但未在 `NO_PROXY` 中包含 `feishu.cn` 时，WebSocket 长连接失效。目前尚未发现对应的 Fix PR，需紧急处理。
*   **【高】定时任务编辑失效** ([#8340](https://github.com/agentscope-ai/QwenPaw/issues/8340), [#8249](https://github.com/agentscope-ai/QwenPaw/issues/8249))：用户反馈在 2.2.2 版本中，定时任务编辑后弹窗无法关闭或时间重置，影响了自动化任务管理。
*   **【中】钉钉回复静默丢弃** ([#8343](https://github.com/agentscope-ai/QwenPaw/issues/8343))：当 `sessionWebhook` 过期时，最终回复丢失且无错误提示。虽然 Issue 被标记为 Close-and-review-later，但这属于静默失败，影响用户信任。
*   **【中】Telegram 引用上下文丢失** ([#8329](https://github.com/agentscope-ai/QwenPaw/issues/8329))：渠道适配器未读取 `reply_to_message` 字段，导致引用消息在 Agent 视角中消失，已被识别为渠道实现不一致问题。

### 6. 功能请求与路线图信号
*   **v2.3.0 “更轻量、更模块化”** ([#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289))：官方发布预告，强调通过插件重构实现轻量化。目前 PR #8187（渠道插件化）和 PR #7565（插件热重载）正在推进，预计将作为下个版本的主体架构。
*   **实时语音聊天** ([#7785](https://github.com/agentscope-ai/QwenPaw/pull/7785))：虽然处于 OPEN 状态，但其规模（XXXL）和设计深度表明该项目已进入实质性开发阶段，有望在近期版本中提供。
*   **工具审批决策模型** ([#8283](https://github.com/agentscope-ai/QwenPaw/pull/8283))：引入基于决策模型的工具审批，反映出项目在安全性治理上的深入。

### 7. 用户反馈摘要
*   **痛点**：用户普遍反映在**非标准网络环境**（如代理、多域名）和**边缘模型**（LM Studio, llama-server）下的兼容性仍有瑕疵，如 [Issue #8092](https://github.com/agentscope-ai/QwenPaw/issues/8092) 中提到的 Ali 风格网关内容误判导致无重试。
*   **使用场景**：主要用户群体正在进行 DevOps 自动化和长周期任务监控，对**渠道稳定性**（飞书、钉钉、Telegram）和**长对话性能**有极高要求。
*   **满意度**：前端 Console 的视觉交互改进（如思考滑块 [#8287](https://github.com/agentscope-ai/QwenPaw/pull/8287)）获得积极反馈，但后端渠道逻辑的健壮性仍被诟病。

### 8. 待处理积压
*   **长期 PR**：PR #7874（PawApp SDK 重构）和 PR #7565（插件热重载）创建时间较早（9月），规模较大且处于活跃开发中。建议维护者关注其代码复杂度和对核心系统的潜在冲击。
*   **未响应 Issue**：Issue #8315（飞书代理问题）和 #8340（定时任务弹窗）创建仅1-2天，但缺乏对应的修复 PR，建议在下一迭代中优先安排资源处理。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

2026-10-21 hermes-agent 项目动态日报

**今日速览**  
- 过去 24h 活跃度极高：Issues 更新 414 条（新开/活跃 352，关闭 62），PR 更新 500 条（待合并 350，合并/关闭 150）。  
- 无新版本发布。项目处于“高密度修复期”，围绕统一 gateway runtime 的后端合并后修复与桌面/CLI/网关多端一致性问题持续收敛。  
- 社区讨论高度集中在 P0/P1 的会话管理、消息投递与安全边界回归上，多个高热度 issue 已进入修复验证阶段（如 #139161 的 19 行修复已在 main 验证完成）。  
- 总体健康度：**积极但承压**，核心 runtime 与工具层存在可观测的回归风险，需要重点观察合并节奏与回归测试覆盖。

**项目进展**  
- 今日 PR 池中，高价值修复与功能 PR 占比高，体现项目围绕“gateway 统一 runtime + 桌面/CLI/TUI 多端一致性 + 工具层安全边界”三条主线推进。  
- 已关闭/合并的代表性工作（来自数据）：  
  - #139161 [CLOSED] Gateway fixes (#134889), package 3：Ink TUI 与 Desktop 会话/命令/实时事件修复。全部 19 项在 `main` 上标记为已修复。链接：https://github.com/NousResearch/hermes-agent/issues/139161  
  - #142136 [CLOSED] Skill 目录存在但 slash 命令未注册（reload 后），已关闭。链接：https://github.com/NousResearch/hermes-agent/pull/142136  
  - #142273 [CLOSED] 新增两个可选技能（petasos-finance-vault, talaria-media-suite），并附每技能不变式测试。链接：https://github.com/NousResearch/hermes-agent/pull/142273  
- 待合并的重点 PR（代表当前工程重心）：  
  - #142299 fix(terminal)：解决长生命周期 gateway/Desktop 下 open fds > 1024 时命令输出丢失问题，覆盖 terminal、background 与 dashboard/Desktop PTY。链接：https://github.com/NousResearch/hermes-agent/pull/142299  
  - #136343 P1 fix(gateway)：dispatcher tick 不得服务“冻结的混合 revision”（content-based skew gate），用于 checkout 重写场景下的进程一致性保障。链接：https://github.com/NousResearch/hermes-agent/pull/136343  
  - #136308 P2 fix(terminal)：本地 POSIX spawn 句柄满足 process-handle 契约，并用类型检查器固化契约。链接：https://github.com/NousResearch/hermes-agent/pull/136308  
  - #137517 P2 fix(state)：回收孤儿 message 行并合并 FTS5 索引（auto-maintenance）。链接：https://github.com/NousResearch/hermes-agent/pull/137517  
  - #136527 / #136404 / #137554： approvals 与项目上下文指令文件的安全加固（git 全局 flag 绕过、force-with-lease 独立 key、`.hermes.md` 写保护）。链接：  
    - https://github.com/NousResearch/hermes-agent/pull/136527  
    - https://github.com/NousResearch/hermes-agent/pull/136404  
    - https://github.com/NousResearch/hermes-agent/pull/137554

**社区热点**  
- 最活跃 Issue（评论数最高）：#134889 [OPEN] P0 Tracking: one gateway owns every local session — post-merge fixes（#106742 merged Oct 14）。202 条评论，说明该统一 gateway 运行时合并后引发多端回归，社区正在集中验证修复面。链接：https://github.com/NousResearch/hermes-agent/issues/134889  
- #131859 [OPEN] GitHub API 创建 PR 权限错误（仅影响特定账号），47 条评论，涉及上游权限/仓库策略问题。链接：https://github.com/NousResearch/hermes-agent/issues/131859  
- #136567 [CLOSED] Telegram DM topics：新建 topic 首条消息无 thread_id 导致路由错误，32 条评论、8 个 👍，已关闭说明修复被验证。链接：https://github.com/NousResearch/hermes-agent/issues/136567  
- #487 [CLOSED] Feature: 加密审计链（SHA-256 hash-chained action log），26 条评论，项目已采纳并关闭。链接：https://github.com/NousResearch/hermes-agent/issues/487  
- #10421 [OPEN] Turn-level live time context，24 条评论、9 个 👍，用户对“实时时间感知”一致性需求强烈。链接：https://github.com/NousResearch/hermes-agent/issues/10421  
- #38519 [OPEN] 仅安装前端（Windows）需求，16 条评论、27 个 👍，反映“前端/后端分离部署”场景下的安装体验痛点。链接：https://github.com/NousResearch/hermes-agent/issues/38519  
- #141346 [OPEN] 安全：smart approval 自动批准 osascript 导致用户未保存 PPT 被关闭与导出被删除，18 条评论，用户对数据可恢复性极度敏感。链接：https://github.com/NousResearch/hermes-agent/issues/141346  

**Bug 与稳定性**  
- P0（需优先处理）  
  - #134889 [OPEN] 统一 gateway 本地会话 ownership 的多端修复追踪（post-merge fixes），高风险：session-state/message-delivery/compatibility。链接：https://github.com/NousResearch/hermes-agent/issues/134889  
  - 已有修复推进：#139161 已关闭并标记 19 项修复在 main 验证完成。链接：https://github.com/NousResearch/hermes-agent/issues/139161  
- P1（高优先级）  
  - #127284 [OPEN] source-completion-pending 无 TTL/self-heal，进程被 kill 后所有后续启动卡住。链接：https://github.com/NousResearch/hermes-agent/issues/127284  
  - #135037 [OPEN] Windows 用户 PATH 注册写入共享 HKCU\Environment\Path，沙箱/外部 checkout 污染主机环境。链接：https://github.com/NousResearch/hermes-agent/issues/135037  
  - #136343 [OPEN] P1 fix(gateway)：dispatcher tick 服务混合 revision 的风险，已有 PR 待合并。链接：https://github.com/NousResearch/hermes-agent/pull/136343  
- P2（中优先级，数量最多）  
  - #141988 [OPEN] process_manage 分页输出时 TypeError（slice indices 错误），阻塞日志获取。链接：https://github.com/NousResearch/hermes-agent/issues/141988  
  - #131055 [OPEN] Linux Desktop 二次启动毒化 sandbox fallback marker → sticky --no-sandbox → renderer SIGILL 循环。链接：https://github.com/NousResearch/hermes-agent/issues/131055  
  - #131321 [OPEN] NVIDIA SwiftShader fallback 误判/陈旧 witness 导致 13 天锁定软件渲染。链接：https://github.com/NousResearch/hermes-agent/issues/131321  
  - #142299 / #142125 [OPEN] terminal 输出在 open fds ≥1024 时丢失，已有两个关联 PR（salvage 与 selectors drain）。链接：  
    - https://github.com/NousResearch/hermes-agent/pull/142299  
    - https://github.com/NousResearch/hermes-agent/pull/142125  
  - #121095 [OPEN] browser_exec 完成后 browser_harness daemon 残留（无超时）。链接：https://github.com/NousResearch/hermes-agent/issues/121095  
  - #133514 [OPEN] 后台 delegate approvals 在父 gateway turn 结束后不可见，Telegram /approve 无 pending。链接：https://github.com/NousResearch/hermes-agent/issues/133514  
  - #139818 [OPEN] remote-backend desktop 会话无法从本地桌面 resume（session.resume not_found）。链接：https://github.com/NousResearch/hermes-agent/issues/139818  
  - #142101 [OPEN] Desktop session.create 冻结 credential-less route，custom endpoint 凭据丢失导致 AuthError 或 fallback。链接：https://github.com/NousResearch/hermes-agent/issues/142101  
  - #142064 [OPEN] /api/sessions 未暴露 _reset_from，REST 客户端将 /new 渲染为 fork。链接：https://github.com/NousResearch/hermes-agent/issues/142064  
  - #123345 [OPEN] terminal tool notify=true 被 validator 拒绝（boolean 类型不被接受）。链接：https://github.com/NousResearch/hermes-agent/issues/123345  
  - #44964 [OPEN] /sessions CLI 只显示 source=cli 会话，TUI/其他来源隐藏。链接：https://github.com/NousResearch/hermes-agent/issues/44964  
  - #131739 [OPEN] Desktop tool error 输出将裸文件名 linkify 并替换为第三方页面 title。链接：https://github.com/NousResearch/hermes-agent/issues/131739  
  - #83904 [OPEN] Desktop 调度的 cron 任务无法回传至活跃聊天。链接：https://github.com/NousResearch/hermes-agent/issues/83904  
- P3（低优先级但高频）  
  - #141861 [OPEN] Kanban worker 在 codex_responses 模式下误用 chat/completions，muse-spark on opencode-go 返回 400。链接：https://github.com/NousResearch/hermes-agent/issues/141861  
  - #105758 [OPEN] lifecycle guard 误拦截 Node.js CLI（scan-budget 引入后）。链接：https://github.com/NousResearch/hermes-agent/issues/105758  
  - #75444 [OPEN] kanban auto-decomposer 重新派发 escalated triage 任务（无限 bounce）。链接：https://github.com/NousResearch/hermes-agent/issues/75444  

**功能请求与路线图信号**  
- #487 已关闭：加密审计链被采纳并实现（SHA-256 hash-chained action log）。链接：https://github.com/NousResearch/hermes-agent/issues/487  
- #10421 [OPEN] Turn-level live time context：用户希望 agent 具备稳定的“now/today/weekday/local date”感知，避免频繁调用工具获取时间。链接：https://github.com/NousResearch/hermes-agent/issues/10421  
- #38519 [OPEN] 仅安装前端（Windows）：支持“前端/后端分离部署”，避免在同一机器安装 agent。链接：https://github.com/NousResearch/hermes-agent/issues/38519  
- #80222 [OPEN] delegate_task 支持每次调用覆盖 model 与 reasoning_effort，避免全局 all-or-nothing。链接：https://github.com/NousResearch/hermes-agent/issues/80222  
- #2045 [OPEN] Lazy skill loading：从 system prompt 中移除技能列表，按需工具加载，降低 87 个技能带来的 token 开销。链接：https://github.com/NousResearch/hermes-agent/issues/2045  
- #142292 [OPEN] Google connector 结果路由至 Nous 非训练端点（no-training endpoints），与 hermes-portal#1701 依赖。链接：https://github.com/NousResearch/hermes-agent/pull/142292  
- #142297 [OPEN] catalog: tabella 2.0.2 增加 Windows 支持。链接：https://github.com/NousResearch/hermes-agent/pull/142297  
- #137662 [OPEN] kanban 每 board 并发上限（max_spawn_by_board），解决“忙 board 饿死其他 board”的资源分配问题。链接：https://github.com/NousResearch/hermes-agent/pull/137662  
- #136273 [OPEN] cron 将 fire occurrence identity 导出到脚本与 worker 子进程，提升可观测性与重启安全。链接：https://github.com/NousResearch/hermes-agent/pull/136273  
- #142295 [OPEN] 将 release install/update 测试与 Docker 发布恢复至 GitHub runners，保障稳定版 CI 绿灯。链接：https://github.com/NousResearch/hermes-agent/pull/142295

**用户反馈摘要**  
- 痛点一：多端一致性（Desktop/CLI/TUI/gateway）在统一 gateway 合并后回归明显，用户关注 session resume、消息投递、审批可见性与时间上下文稳定性。相关热点：#134889、#133514、#139818、#10421。  
- 痛点二：安装/更新链路脆弱：Windows 用户 PATH 污染（#135037）、source-completion-pending 无自恢复（#127284）、前端仅安装需求（#38519）、CI 回归导致稳定版测试不稳（#142295）。  
- 痛点三：工具层稳定性与安全：terminal 输出在长生命周期下丢失（#142299/#142125）、browser daemon 残留（#121095）、smart approval 误批准导致数据丢失（#141346）、git 全局 flag 绕过破坏性命令规则（#136527）。  
- 满意点：#139161 的 19 项修复在 main 上被验证完成，显示团队对 gateway 修复包的闭环能力；#136567 已关闭，说明 Telegram topics 路由问题被快速修复并验证。  
- 使用场景：用户在生产环境中将 Hermes 作为长期运行的 gateway/daemon，关注 fd 泄漏、进程残留、审计与可观测性（#142299、#121095、#487）。

**待处理积压**  
- P0 追踪 issue #134889 仍需持续跟进：虽有多包修复（#139161 已关闭），但仍有 202 条评论与多端回归风险标签（risk-session-state, risk-message-delivery, risk-compatibility, risk-platform-windows）。链接：https://github.com/NousResearch/hermes-agent/issues/134889  
- P1 #127284（source-completion-pending 无 TTL/self-heal）自 2026-09-29 开放，至今未关闭，存在安装链路长期风险。链接：https://github.com/NousResearch/hermes-agent/issues/127284  
- P1 #135037（Windows 用户 PATH 污染）自 2026-10-08 开放，涉及共享环境变量写入，需尽快提供回归测试与修复。链接：https://github.com/NousResearch/hermes-agent/issues/135037  
- P2 #141988（process_manage 分页 TypeError）为 2026-10-20 新报，阻塞日志获取，需快速定位并修复。链接：https://github.com/NousResearch/hermes-agent/issues/141988  
- P2 #131055（Linux Desktop sandbox fallback 毒化）与 #131321（SwiftShader 误判锁定）均为桌面端渲染/沙箱稳定性问题，影响用户体验，需与渲染层团队协同。链接：  
  - https://github.com/NousResearch/hermes-agent/issues/131055  
  - https://github.com/NousResearch/hermes-agent/issues/131321  
- 长期未响应的重要 PR：#109436、#109867（kanban 相关）自 9 月中旬开放，涉及 board/store 一致性与安全边界，建议维护者优先 review。链接：  
  - https://github.com/NousResearch/hermes-agent/pull/109436  
  - https://github.com/NousResearch/hermes-agent/pull/109867

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期**: 2026-10-21
**数据来源**: GitHub (AstrBotDevs/AstrBot)

## 1. 今日速览
过去 24 小时内，AstrBot 项目保持着较高的社区活跃度，共记录 9 条 Issue 更新（7 开 2 关）及 30 条 PR 更新（21 待审 9 关闭/合并）。尽管无新版本发布，但代码层面的推进显著，重点修复了 QQ 官方接口消息重复、WebUI 交互缺陷及插件元数据规范等问题。社区热点集中在网络加速体验优化（PyPI 镜像）与 Agent 行为逻辑的稳定性治理上。整体健康度良好，维护者响应迅速，关键 Bug 均已有对应的 Fix PR 在队列中。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日通过 PR 合并与关闭，项目在核心功能与稳定性上取得了实质进展：
*   **WebUI 交互修复**：PR [#10608](https://github.com/AstrBotDevs/AstrBot/pull/10608) 解决了全屏模式下弹窗不可见的问题，并关闭了对应的 Issue [#10603](https://github.com/AstrBotDevs/AstrBot/issues/10603)。PR [#10647](https://github.com/AstrBotDevs/AstrBot/pull/10647) 优化了配置提示的清晰度，隐藏了未启用功能的冗余选项。
*   **插件体系规范化**：PR [#10619](https://github.com/AstrBotDevs/AstrBot/pull/10619) 完成了插件 README 的多语言支持，支持 Dashboard 切换器。PR [#10618](https://github.com/AstrBotDevs/AstrBot/pull/10618) 实现了插件配置的会话级覆盖（Phase 1），解决了多群组参数隔离痛点。
*   **底层稳定性**：PR [#10441](https://github.com/AstrBotDevs/AstrBot/pull/10441) 与 [#10440](https://github.com/AstrBotDevs/AstrBot/pull/10440) 分别增强了 UMO 迁移的重试机制及 Persona 文件夹响应的去重逻辑，提升了系统健壮性。

## 4. 社区热点
*   **网络体验优化 (PyPI 镜像)**：Issue [#10577](https://github.com/AstrBotDevs/AstrBot/issues/10577) 获得 6 条评论关注。用户希望 PyPI 仓库地址配置能像 GitHub 加速一样提供预设镜像列表及**下载速度测试**（而不仅是延迟测试）。PR [#10657](https://github.com/AstrBotDevs/AstrBot/pull/10657) 已提交，实现了镜像选择器与测速功能。
*   **插件元数据声明**：Issue [#10638](https://github.com/AstrBotDevs/AstrBot/issues/10638) 提出在插件 metadata 中新增 `category` 字段。鉴于当前插件依赖 AI 审核且分类不准确率高，该提议旨在让作者主动声明分类，提升插件市场可用性。已有社区成员点赞支持。

## 5. Bug 与稳定性
按严重程度排列，以下 Bug 已有对应 Fix PR 正在推进：

1.  **[高] OneBot 消息重复回复**：Issue [#7094](https://github.com/AstrBotDevs/AstrBot/issues/7094) 报告 QQ WebSocket 机器人出现“发一次消息，机器人回复多次”的现象，日志显示消息被多次处理。
    *   *Fix 状态*：PR [#10653](https://github.com/AstrBotDevs/AstrBot/pull/10653) 已提交，通过检查 OneBot 事件身份标识来抑制重复投递。
2.  **[中] Cron 任务权限识别错误**：Issue [#10641](https://github.com/AstrBotDevs/AstrBot/issues/10641) 指出定时任务唤醒 Agent 时 `is_admin()` 恒为 False，导致管理员工具（如 shell/python）权限被错误拒绝。该问题当日创建并当日关闭（可能通过文档说明或快速热修复）。
3.  **[中] 插件依赖预检查缺陷**：PR [#10656](https://github.com/AstrBotDevs/AstrBot/pull/10656) 修复了一个隐蔽 Bug：当插件依赖包含 extras（如 `demo[feature]>=1.0`）时，预检查逻辑会丢失 extras 信息，导致依赖未安装却被误报为满足。
4.  **[低] QQ 官方接口媒体消息渲染**：PR [#10652](https://github.com/AstrBotDevs/AstrBot/pull/10652) 修复了在回复携带图片/文件等媒体时，`@` 提及标签无法正确渲染的问题（此前已有 PR [#10651](https://github.com/AstrBotDevs/AstrBot/pull/10651) 尝试修复但未合并，最新 PR 重新提交）。
5.  **[低] ChatUI 模型选择器无法复位**：Issue [#10637](https://github.com/AstrBotDevs/AstrBot/issues/10637) 报告前端组件硬编码禁用了“不选择”选项，导致用户无法恢复默认模型。

## 6. 功能请求与路线图信号
*   **数据库连接池配置**：Issue [#10655](https://github.com/AstrBotDevs/AstrBot/issues/10655) 建议新增 SQLite 连接数、并发数配置或原生 MySQL 支持，以应对高并发场景。这反映了项目正从轻量级部署向高可用场景扩展的信号。
*   **腾讯元宝搜索集成**：Issue [#10654](https://github.com/AstrBotDevs/AstrBot/issues/10654) 提议接入腾讯元宝搜索 API（2000次/月免费额度），丰富了 Agent 的网页搜索数据源。
*   **日志导出功能**：PR [#10418](https://github.com/AstrBotDevs/AstrBot/pull/10418) 实现了 WebUI 日志导出（打包日志文件与内存 Trace），旨在方便用户向开发者提供诊断信息，预计将纳入近期版本。
*   **Agent 工具白名单优化**：PR [#10463](https://github.com/AstrBotDevs/AstrBot/pull/10463) 修复了 Subagent 中工具白名单与内置执行工具（computer-use）的冲突问题，增强了 Agent 框架的灵活性。

## 7. 用户反馈摘要
*   **痛点**：用户普遍反映在高并发或复杂网络环境下，默认配置不够灵活（如数据库连接限制）；QQ 平台适配存在细节瑕疵（如引用回复导致手机端接收双重消息 [#10650](https://github.com/AstrBotDevs/AstrBot/issues/10650)，媒体消息 @ 失效）。
*   **场景**：用户开始关注 Agent 在自动化任务（Cron）中的权限一致性，以及插件生态的分类准确性（AI 审核误判率高）。
*   **满意点**：WebUI 的持续优化（如日志导出、配置提示优化）降低了用户排查问题的门槛；对国产模型（MiniMax）和搜索服务（腾讯元宝）的快速支持体现了对国内生态的友好性。

## 8. 待处理积压
*   **知识基础清理**：PR [#9303](https://github.com/AstrBotDevs/AstrBot/pull/9303) 创建于 7 月 17 日，至今未合并。该 PR 修复了删除知识库时遗留的孤儿文档和媒体数据，虽标记为 `size:S`，但属于数据一致性关键问题，建议维护者优先审查。
*   **指令组重命名同步**：PR [#9371](https://github.com/AstrBotDevs/AstrBot/pull/9371) 创建于 7 月 24 日，修复了指令组重命名后子指令仍使用旧前缀的 Bug。该问题影响 WebUI 管理体验，积压时间较长，需关注是否存在合并冲突或测试未通过。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：2026-10-21**

## 1. 今日速览
今日项目社区活跃度极高，过去24小时内 GitHub Discussions 新增/更新讨论达 **223 条**，显示用户互动非常频繁。由于该项目未启用 Issues 和 Pull Request，所有代码变更均以 Release 形式落地，但**今日无新版本发布**。当前热点集中在**插件生态扩张**（社区已收录 3650+ 插件）、**基础设施稳定性**（会话日志损坏、Cookie 溢出 Bug）以及**对原生 Memory 能力的强烈诉求**。

## 2. 版本发布
**今日无新版本发布。**
（注：由于该项目通过 Releases 合并代码，且今日 0 个新版本，故无合并摘要内容。需关注上一版本 `v0.2.1-rc.1` 或更早版本的遗留问题是否在当前版本中修复。）

## 3. 项目进展
由于今日无 Release，项目处于**静默期**（无新代码合并）。
*   **架构演进信号**：讨论中频繁提及上游项目 `cordis` 的修复（如 `1b7d0f2`），暗示 DeepSeek Harness 的 Loader 机制正在与上游或底层框架进行协同迭代，但今日未体现为具体的代码合并。
*   **状态**：开发团队可能正在内部测试下一版本，或处于迭代间隙。

## 4. 社区热点
今日讨论最活跃的领域是**插件生态治理**与**基础设施 API 规范**：

1.  **OpenCode Go 强制会话头** (`#5495`, 45 条评论)
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/5495)
    *   **诉求分析**：第三方托管推理 API（OpenCode Go）要求请求必须携带 `x-opencode-session` 头。由于 DSH 作为 25k 组织/用户的网关，若不及时更新 API 请求头，将导致大量用户连接报错。这是**高优先级的兼容性中断风险**。
2.  **插件生命周期管理** (`#2687`, 21 条评论)
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/2687)
    *   **诉求分析**：随着 `mydsh.dev` 收录插件超过 3650 个，用户强烈需要更精细的“安装/启用/停用/卸载”分离控制，以解决插件冲突和维护困难的问题。社区开发者已率先提供插件市场解决方案。
3.  **Memory 能力迁移** (`#14`, 41 条评论)
    *   [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/14)
    *   **诉求分析**：用户希望将 Codex 或 Claude Code 的记忆机制快速迁移至 DSH。这表明**长期记忆（Long-term Memory）**是 DSH 当前的功能短板，也是用户高频痛点。

## 5. Bug 与稳定性
今日报告了多个严重稳定性问题，主要涉及网络传输和存储一致性：

| 严重程度 | 问题描述 | 讨论链接 | 状态 |
| :--- | :--- | :--- | :--- |
| **严重** | **Web 认证失败 (431)**：`dsh-auth-*` Cookie 因长期未清理导致 Host 头部溢出，Desktop 端无法加载。影响版本：`v0.2.1-alpha.4` 至 `rc.1`。 | [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) | 开放中 (14 评论) |
| **严重** | **会话日志损坏**：非正常退出后，replayed events 导致序列号（seq）缺口，Web UI 拒绝加载历史，数据不可恢复。 | [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/1497) | 开放中 (12 评论) |
| **严重** | **传输层失败**：用户报告升级到 4.1 后连续出现 "Messages transport failed"，无法正常使用多个模型。 | [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/6987) | 开放中 (13 评论) |
| **中** | **工作区创建失败**：Gateway 报错 "workspaceController is unavailable"。 | [链接](https://github.com/deepseek-ai/deepseek-harness/discussions/8357) | 开放中 (14 评论) |

*注：由于项目不使用 PR，上述 Bug 的修复进度需等待下一版本 Release 的 Changelog 确认。*

## 6. 功能请求与路线图信号
用户的高频功能请求指向了 DSH 的**企业级/自动化**方向：

1.  **原生定时任务** (`#1600`)：用户希望内置 Cron 功能以自动巡检或整理工作区。社区插件 `dsh-schedule-tasks` 已成熟，具备内置化的潜力。
2.  **对话注释功能** (`#8750`)：支持选中历史回答片段作为注解添加到新请求中，提升长文档处理的交互体验。
3.  **插件智能检索** (`#1597`)：鉴于 2300+ 插件的规模，用户需要基于 AI 摘要和智能搜索的插件发现机制，这是插件生态发展的必经之路。

## 7. 用户反馈摘要
*   **满意点**：插件生态丰富（`mydsh.dev` 收录 3650+），社区第三方解决方案（如金融研究插件 `Capital Generation`）质量较高。
*   **痛点**：
    *   **账号风控**：部分用户反映 DeepSeek 账号频繁被封禁且缺乏有效申诉渠道，在 Discussions 中引发共鸣（[#9453](https://github.com/deepseek-ai/deepseek-harness/discussions/9453)）。
    *   **稳定性焦虑**：由于 4.1 版本后出现传输失败和 Cookie 溢出等问题，用户对 Alpha/RC 版本的可用于生产环境的稳定性表示担忧。

## 8. 待处理积压
*   **API 兼容性中断风险**：[#5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495) 提到的 `x-opencode-session` 需求若不解决，将导致 9 月 5 日后接口的潜在断裂，建议维护者优先评估。
*   **数据持久化 Bug**：[#1497](https://github.com/deepseek-ai/deepseek-harness/discussions/1497) 的会话日志损坏问题属于核心稳定性缺陷，长期未修复可能导致用户信任度下降。

**建议**：关注下一个 Release 是否包含对 Cookie 溢出和会话序列号的修复，并留意官方是否会将定时任务和插件搜索功能纳入原生 Roadmap。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*