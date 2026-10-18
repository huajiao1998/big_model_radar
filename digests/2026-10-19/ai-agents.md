# OpenClaw 生态日报 2026-10-19

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-10-18 23:47 UTC

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
**日期：** 2026-10-19

### 1. 今日速览
今日 OpenClaw 项目保持了极高的活跃度，过去24小时内共有 1000 条 Issues 与 PR 发生更新，其中 438 条 Issues 处于活跃状态，271 个 PR 等待合并，显示出项目正处于高频迭代与密集修复阶段。新版本 `v2026.10.5` 发布，重点提升了多平台（Windows/macOS/pnpm 12）更新恢复与安装流程的鲁棒性。社区讨论热度集中在 P0 级内存泄漏、多 Agent 编排稳定性及消息静默丢失等核心痛点，开发者正通过大量 refactor 与 fix PR 应对底层架构与 UI 层面的技术债。

### 2. 版本发布
**v2026.10.5**
*   **更新亮点：** 强化了 `openclaw update` 命令的跨设备、跨文件系统兼容性。
*   **核心改进：** 解决了在 pnpm 12、Windows 提权环境及 macOS 登录 Shell 场景下更新卡顿的问题；优化了 stale handoff leases 和 package-activation journals 的清理逻辑，防止安装过程被搁置（stranded install）。
*   **迁移注意：** 使用 pnpm 12 或 Windows 提权部署的用户升级后需验证安装目录权限及进程重启机制，确保更新流程平滑过渡。
*   [GitHub 发布链接](https://github.com/openclaw/openclaw/releases/tag/v2026.10.5)

### 3. 项目进展
今日维护者（特别是 @steipete 与 @enki）重点推进了底层性能优化与会话状态一致性：
*   **性能优化：** 合并/推进了多个针对 Web UI 的 Solid.js 生命周期重构 PR（如 [PR #176581](https://github.com/openclaw/openclaw/pull/176581) 优化远程会话刷新、[PR #176589](https://github.com/openclaw/openclaw/pull/176589) 减少模型请求分配），以及 Gateway 层面的 PostgreSQL 读快照锁优化（[PR #176626](https://github.com/openclaw/openclaw/pull/176626)）。
*   **架构重构：** 大量 PR 聚焦于 Channel 插件（Discord, Matrix, MS Teams 等）私有注册和内容辅助函数的折叠（[PR #176604](https://github.com/openclaw/openclaw/pull/176604)），以及 Codex 扩展的会话接管与目录连续性修复（[PR #174900](https://github.com/openclaw/openclaw/pull/174900)）。
*   **进程管理：** 修复了 Gateway 和 Codex 启动器在宿主进程死亡时产生孤儿进程（Orphaned processes）的问题（[PR #176578](https://github.com/openclaw/openclaw/pull/176578)）。

### 4. 社区热点
今日讨论最活跃、反映出核心使用诉求的 Issues 包括：
*   **多 Agent 编排不稳定：** [Issue #43367](https://github.com/openclaw/openclaw/issues/43367)（15 评论）揭示了并发 Agent 调用时配置覆盖、会话锁失败等问题，反映出用户对多 Agent 并发控制能力的强烈需求。
*   **上下文与记忆管理：** [Issue #22438](https://github.com/openclaw/openclaw/issues/22438)（19 评论）提议分层引导文件加载以节省 LLM 上下文预算；[Issue #60572](https://github.com/openclaw/openclaw/issues/60572) 呼吁支持多 Slot 记忆架构。
*   **动态模型路由：** [Issue #10687](https://github.com/openclaw/openclaw/issues/10687)（10 评论）要求实现完全动态的模型发现机制（尤其是 OpenRouter），以应对快速变化的模型目录。
*   **跨语言语音交互：** [PR #175603](https://github.com/openclaw/openclaw/pull/175603) 针对 OpenAI 语音启动确认语进行了多语言本地化改进，反映了国际化用户体验的关注。

### 5. Bug 与稳定性
按严重程度排列，今日报告的 Bug 与稳定性问题（部分为长期未解但今日仍有活跃讨论）：
*   **[P0] Gateway 内存泄漏导致 OOM 崩溃：** [Issue #91588](https://github.com/openclaw/openclaw/issues/91588)（40 评论）。RSS 内存从 350MB 飙升至 15.5GB，触发 OOM killer。*状态：无明确 Fix PR，标记为 `clawsweeper:needs-maintainer-review`。*
*   **[P0] 子 Agent 结果静默丢失：** [Issue #44925](https://github.com/openclaw/openclaw/issues/44925)（31 评论）。Subagent 完成通知在超时时无重试、无自动重启。*状态：无明确 Fix PR。*
*   **[P0] 隔离 Cron 会话覆盖共享文件：** [Issue #40001](https://github.com/openclaw/openclaw/issues/40001)（16 评论）。`write` 工具缺乏 append 模式，导致数据丢失。*状态：无明确 Fix PR。*
*   **[P1] 同步持久化阻塞 Gateway 事件循环：** [Issue #119720](https://github.com/openclaw/openclaw/issues/119720)（25 评论）。在大规模场景下导致会话状态阻塞。*状态：无明确 Fix PR。*
*   **[P1] Telegram/Signal 消息静默丢弃与延迟：** [Issue #112259](https://github.com/openclaw/openclaw/issues/112259) 和 [Issue #143581](https://github.com/openclaw/openclaw/issues/143581)。*状态：已有相关 Fix PR 推进中，如 [PR #175219](https://github.com/openclaw/openclaw/pull/175219) 修复了排队内部事件在会话完成后的失败问题。*
*   **[P1] Claude-CLI 后端工具拒绝列表失效：** [Issue #132303](https://github.com/openclaw/openclaw/issues/132303)。安全相关，*状态：无明确 Fix PR。*
*   **[P2] 长期对话后 Write/Exec 工具参数静默丢失：** [Issue #53408](https://github.com/openclaw/openclaw/issues/53408)。*状态：无明确 Fix PR。*

### 6. 功能请求与路线图信号
*   **分层 Bootstrap 文件加载：** [Issue #22438](https://github.com/openclaw/openclaw/issues/22438)。鉴于上下文成本压力，此功能被标记为 `P2` 且有 `clawsweeper:fix-shape-clear`，有较高概率在近期版本落地。
*   **多 Slot 记忆架构：** [Issue #60572](https://github.com/openclaw/openclaw/issues/60572)。用户希望不同记忆提供商处理不同层级的记忆堆栈。
*   **Agent 触发的上下文压缩：** [Issue #6757](https://github.com/openclaw/openclaw/issues/6757)。允许 Agent 自主触发 `/compact`，减少用户干预。
*   **Per-model 使用日志与成本跟踪：** [Issue #13219](https://github.com/openclaw/openclaw/pull/13219)。配合今日新增的 [PR #176630](https://github.com/openclaw/openclaw/pull/176630)（增加 openclaw-performance skill 和回归测试），性能与成本可观测性正在成为路线图重点。
*   **iOS/macOS 个人身份登录：** [Issue #162164](https://github.com/openclaw/openclaw/issues/162164)。支持人类操作的个人签名，同时保留共享所有者身份。

### 7. 用户反馈摘要
*   **痛点 1：长对话稳定性差。** 用户频繁反馈在 15+ 轮对话后，工具调用参数丢失（[Issue #53408](https://github.com/openclaw/openclaw/issues/53408)）或上下文压缩失效，导致 Agent 表现退化。
*   **痛点 2：多通道消息丢失与延迟。** Telegram、Signal 等通道在 Gateway 重启后无法补发遗漏消息（[Issue #55792](https://github.com/openclaw/openclaw/issues/55792)），且排队消息偶发静默丢弃。
*   **痛点 3：Windows/macOS 部署摩擦。** 用户报告 Windows 下 Gateway 启动耗时过长（[Issue #159499](https://github.com/openclaw/openclaw/issues/159499)），macOS 升级后设备身份卡死（[Issue #137085](https://github.com/openclaw/openclaw/issues/137085)）。
*   **满意点：** 社区对近期针对 Web UI 的性能优化（如 2MiB 历史分页加载 [PR #176480](https://github.com/openclaw/openclaw/pull/176480)）和 Solid.js 迁移后的 UI 流畅度改进给予积极反馈。

### 8. 待处理积压
*   **长期 P0/P1 Issues：** 内存泄漏（[Issue #91588](https://github.com/openclaw/openclaw/issues/91588)）、Subagent 静默丢失（[Issue #44925](https://github.com/openclaw/openclaw/issues/44925)）自 2026 年 3-6 月创建至今仍有 30+ 评论，但标记为 `clawsweeper:no-new-fix-pr`，维护者需评估是否拆分或提供临时 workaround。
*   **积压 PRs：** 271 个待合并 PR 中，大量 `refactor(ui)` 和 `perf` 类 PR（如 [PR #176623](https://github.com/openclaw/openclaw/pull/176623)、[PR #176451](https://github.com/openclaw/openclaw/pull/176451)）处于 `⏳ waiting on author` 或 `👀 ready for maintainer look` 状态，需加速 review 流程以控制代码库债务。
*   **安全相关：** [Issue #76493](https://github.com/openclaw/openclaw/issues/76493) 和 [Issue #132303](https://github.com/openclaw/openclaw/issues/132303) 涉及 SecretRef 和工具权限绕过，需安全团队优先介入。

---

## 横向生态对比

## 个人 AI 助手开源生态横向对比分析报告

**日期：** 2026-10-19

### 1. 生态全景
当前个人 AI 助手与自主智能体开源生态正处于“**插件化平台转型**”与“**稳定性阵痛**”的关键过渡期。头部项目（如 OpenClaw, Hermes-Agent）呈现极高的开发活跃度，核心矛盾集中在多 Agent 并发控制、底层运行时安全性及跨平台（Windows/Linux/macOS）部署的一致性上。
中等规模项目（如 Zeroclaw, QwenPaw）开始聚焦于垂直通道的精细化治理（如 Slack/DingTalk）及用户体验（UX）优化，强调成本可观测性与配置易用性。
长尾项目（如 PicoClaw, AstrBot, DeepSeek Harness）则在解决特定的基础设施缺陷（如超时、内存泄漏）或探索新的模态（视频/多模态输入）与成本控制。

### 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release 状态 | 待合并/积压 | 健康度评估 |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **OpenClaw** | 1000+ (438 Active) | 271 待合并 | ✅ v2026.10.5 | 🔴 **高** | **高速迭代/高风险**：架构重构密集，底层 P0 Bug 积压，处于重构阵痛期。 |
| **Hermes-Agent** | 471 | 500 | ❌ 无新发布 | 🔴 **高** | **高压修复期**：统一 Gateway 合并后回归 Bug 多，Issue 增长失控（>1000 open）。 |
| **Zeroclaw** | 24 | 50 | ✅ v0.8.6 | 🟡 **中** | **转型期**：WASM 插件生态扩张导致安全边界 Bug 增多，CI/CD 存在瓶颈。 |
| **AstrBot** | 未列全 | 7 合并/关闭 | ❌ 无新发布 | 🟢 **低** | **稳健优化**：聚焦日志追踪与插件管理，无严重阻塞，体验打磨为主。 |
| **QwenPaw** | 13 | 9 | ❌ 无新发布 | 🟢 **低** | **功能稳定期**：清理技术债务，修复特定通道（QQ/DingTalk）的高频痛点。 |
| **DeepSeek Harness** | N/A (Discussions) | N/A | ❌ 无新发布 | 🔴 **高** | **口碑危机**：社区讨论量巨大（203+），Windows 稳定性与 Token 效率争议激烈。 |
| **PicoClaw** | 3 | 5 | ❌ 无新发布 | 🟢 **低** | **清理维护**：活跃度中低，主要清理长期停滞工单，修复静默故障。 |

### 3. OpenClaw 在生态中的定位
*   **优势**：OpenClaw 是目前生态中**架构最复杂、迭代速度最快**的项目。其核心优势在于多平台更新鲁棒性（v2026.10.5 专门针对此优化）和多 Agent 编排的底层探索。相比 Zeroclaw 的“WASM 插件化”和 QwenPaw 的“通道垂直化”，OpenClaw 更倾向于构建一个**通用的 Agent 运行时（Runtime）**，涵盖了从底层记忆管理（多 Slot）到上层 UI（Solid.js）的全栈能力。
*   **技术路线差异**：OpenClaw 采用了**“高密度重构+密集修复”**的策略，试图通过解决内存泄漏（P0）和子 Agent 静默丢失（P0）来建立技术护城河。相比之下，Hermes-Agent 也在做类似的全链路优化，但 OpenClaw 在跨文件系统/进程管理上的细节打磨（如 stale handoff leases）显得更为成熟。
*   **社区规模对比**：OpenClaw 的 Issue/PR 更新量（1000+）远超其他项目，表明其拥有最庞大的开发者/用户反馈池。然而，其 P0 级 Bug 的长期未解（如 #91588 内存泄漏）显示出维护者资源与社区期望之间的巨大张力，社区信心正在经受考验。

### 4. 共同关注的技术方向
多个项目近期涌现出高度一致的技术诉求，反映了行业对 Agent 可靠性的共识：

*   **静默失败治理 (Silent Failure Governance)**：
    *   **OpenClaw**：子 Agent 结果静默丢失（#44925），Cron 会话覆盖共享文件（#40001）。
    *   **PicoClaw**：Cron 任务失败状态误报为成功（#3423），Telegram 长轮询超时（#3422）。
    *   **QwenPaw**：QQ 群组消息静默丢弃（#8313），钉钉长文本静默降级（#8278）。
    *   **诉求**：用户强烈要求 Agent 在内部异常发生时必须产生**显式的错误信号或补偿机制**，而非静默吞掉错误。

*   **跨平台部署的“最后一公里”摩擦**：
    *   **OpenClaw**：Windows 提权/macOS Shell 场景下的更新卡顿。
    *   **Zeroclaw**：Windows 僵尸端口占用（#8800），Android/Termux 支持薄弱（#11525）。
    *   **Hermes-Agent**：`hermes update` 失败导致安装半应用状态（#125437）。
    *   **DeepSeek Harness**：Windows 沙箱 0xC0000142 崩溃（#810）。
    *   **诉求**：非 Linux/x86 环境（Windows/macOS/Mobile）的进程生命周期管理是普遍痛点，缺乏统一的优雅降级或恢复机制。

*   **Token 成本与上下文效率**：
    *   **OpenClaw**：提议分层 Bootstrap 文件加载以节省上下文（#22438）。
    *   **DeepSeek Harness**：被质疑“启动税”高达竞品 3.3 倍（#8934）。
    *   **Zeroclaw**：合并了 `cost.warn_at_percent` 修复，强化预算监控（#10950）。
    *   **诉求**：随着 Agent 轮次增加，**成本控制（Cost Control）**和**上下文压缩（Compaction）**已成为核心 KPI。

### 5. 差异化定位分析

| 维度 | OpenClaw | Zeroclaw | QwenPaw / AstrBot | Hermes-Agent / DSH |
| :--- | :--- | :--- | :--- | :--- |
| **核心侧重** | **通用 Agent 运行时**：强调多 Agent 编排、内存管理、多通道统一网关。 | **插件化平台**：强调 WASM 沙箱安全、身份体系、ZeroCode 仪表盘。 | **垂直生态/渠道深耕**：强调特定 IM（Slack/DingTalk/QQ）的深度适配与多模态。 | **开发者工具/竞品对标**：Hermes 侧重去中心化网络与 A2A 协议；DSH 侧重本地化与 DeepSeek 模型集成。 |
| **目标用户** | 全栈开发者、多 Agent 架构师、重型个人助理使用者。 | 插件开发者、希望构建可沙箱化执行环境的企业/高级用户。 | 企业微信/钉钉/QQ 重度用户、希望快速接入本土 IM 生态的集成商。 | 追求极致控制力的开发者（Hermes）、偏好国产模型/本地推理的用户（DSH）。 |
| **技术架构** | 复杂的微服务/进程架构，强调状态一致性（PostgreSQL, Solid.js）。 | 基于 WASM 的插件宿主，强调运行时所有权与安全边界。 | 模块化通道适配器，强调数据完整性与 UI 易用性。 | 分布式/去中心化网络（Hermes）或 桌面沙箱（DSH），强调协议互通与本地算力。 |

### 6. 社区热度与成熟度
*   **快速迭代/阵痛期 (High Velocity)**：
    *   **OpenClaw & Hermes-Agent**：Issue/PR 量巨大，处于架构剧烈变动期（OpenClaw 重构底层，Hermes 合并统一 Gateway）。风险高，功能新，但稳定性赤字严重。
    *   **Zeroclaw**：从单体 CLI 向插件平台转型，处于安全性与一致性 Bug 的爆发期。
*   **质量巩固期 (Stabilization)**：
    *   **QwenPaw & AstrBot**：活跃度中等，主要集中在修复回归 Bug 和优化 UX。用户基数稳定，反馈具体且可执行，处于产品成熟度上升阶段。
*   **清理/维护期 (Maintenance)**：
    *   **PicoClaw**：活跃度低，主要清理长期停滞 Issue，适合特定轻量级场景，缺乏创新动力。
    *   **DeepSeek Harness**：虽讨论量极高，但处于“负面反馈集中处理”阶段，缺乏新特性发布，主要精力用于解释稳定性问题和成本争议。

### 7. 值得关注的趋势信号
1.  **可观测性（Observability）成为刚需**：从 OpenClaw 的性能监控 Skill 到 Zeroclaw 的子进程内存看门狗，再到 AstrBot 的 OpenTelemetry 追踪，**“黑盒”Agent 正在被抛弃**。开发者开始将监控、日志追踪、成本预警作为一等公民功能（First-class features）而非事后补丁。
2.  **安全边界的显性化**：WASM 沙箱（Zeroclaw）和 ACL 令牌（DeepSeek Harness）的出现表明，Agent 的**执行隔离**技术正在从“概念”走向“工程落地”。未来 Agent 的竞争力将部分取决于其沙箱的健壮性（尤其是 Windows 环境下的进程管理）。
3.  **多模态与长对话的“上下文税”**：DeepSeek Harness 的 Token 效率争议和 OpenClaw 的分层记忆提议，预示了**“上下文工程”（Context Engineering）**将成为下一个竞争高地。能够智能压缩、分层加载记忆并精确控制 Token 消耗的框架将获得成本敏感型用户的青睐。
4.  **跨端一致性（Cross-platform Consistency）**：Windows 和 macOS 的部署摩擦（端口、权限、Shell 环境）在所有项目中都是高频痛点。**“Linux 优先”已不再是开发者的默认假设**，未来的 Agent 框架必须具备强大的跨平台抽象层（Abstraction Layer）来抹平 OS 差异。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报

**日期**：2026-10-19  
**项目**：[zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## 1. 今日速览

Zeroclaw 项目处于高活跃状态，过去 24 小时内产生了 24 条 Issue 更新（20 条活跃）和 50 条 PR 更新（42 条待合并），其中 1 个新版本 **v0.8.6** 正式发布，该版本跨越 573 个提交，由 74 位贡献者参与，重点强化了 WebAssembly 插件宿主与身份管理能力。当前项目健康度良好，核心维护者正密集处理 P1 级插件网络出口安全缺陷与 Windows 平台稳定性问题，同时 ZeroCode 子产品持续迭代用户体验。大量高优先级 Bug 集中在插件运行时安全边界（egress 控制、DNS 解析）及跨平台配置同步机制上，显示出随着插件生态扩张，底层运行时复杂度显著增加。

---

## 2. 版本发布

### 🚀 ZeroClaw v0.8.6 正式发布

*   **发布信息**：
    *   发布规模：涵盖 **573 个提交**，来自 **74 位贡献者**。
    *   核心特性：
        1.  **插件与身份体系**：七个 64 位 CLI 发布归档现在内置 WebAssembly 插件宿主，插件注册表提供针对此版本的通道和工具包。
        2.  **运行时所有权**：强化了运行时对配置和插件生命周期的控制权。
*   **迁移注意事项与已知风险**：
    *   **CI/构建问题**：v0.8.6 的 arm64 `dist` 镜像在 Docker 构建时因内存不足（OOM）被杀掉，导致该架构下的 `dist` 镜像可能缺失或需要后续重建 [Issue #11828](https://github.com/zeroclaw-labs/zeroclaw/issues/11828)。
    *   **CI 维护**：macOS 插件烟雾测试需从 `macos-14` 迁移至 `macos-15` 以应对 10月19日 的 CI 资源棕色断电（brownout）计划 [Issue #11831](https://github.com/zeroclaw-labs/zeroclaw/issues/11831)。
    *   **插件安全缺陷**：版本发布后立即暴露出插件出口（egress）连接在首个解析地址被黑洞化时的停滞问题 [Issue #11813](https://github.com/zeroclaw-labs/zeroclaw/issues/11813)，以及 `plugin info` 与运行时注册状态不一致的问题 [Issue #11336](https://github.com/zeroclaw-labs/zeroclaw/issues/11336)。

---

## 3. 项目进展

今日合并/关闭的重要 PR 主要集中在 **ZeroCode 用户体验优化** 和 **运行时稳定性修复** 两个方向，表明项目正在从核心功能构建转向精细化运维体验。

*   **ZeroCode 仪表盘与交互增强**：
    *   合并了 [PR #11513](https://github.com/zeroclaw-labs/zeroclaw/pull/11513) 和 [PR #11508](https://github.com/zeroclaw-labs/zeroclaw/pull/11508)，在 ZeroCode 仪表盘中引入了“聚焦运行时上下文”显示，并优化了配置别名的设置引导，显著降低了新手配置门槛。
    *   合并了 [PR #11692](https://github.com/zeroclaw-labs/zeroclaw/pull/11692)，修复了 `cost.warn_at_percent` 警告在运行时被忽略的问题，使成本预算监控真正生效 [Issue #10950](https://github.com/zeroclaw-labs/zeroclaw/issues/10950)。
*   **运行时与测试稳定性**：
    *   合并了 [PR #11407](https://github.com/zeroclaw-labs/zeroclaw/pull/11407)，解决了 ZeroCode 在高负载下会话更新渲染延迟的问题。
    *   合并了 [PR #11838](https://github.com/zeroclaw-labs/zeroclaw/pull/11838) 和 [PR #11688](https://github.com/zeroclaw-labs/zeroclaw/pull/11688)，分别修复了 Stable ARM64 目标常量的代码格式问题以及并发写入时 trace 关联测试的竞态条件。

---

## 4. 社区热点

基于评论数和讨论深度，以下条目为今日社区关注焦点：

1.  **[P1 高优先级] 插件网络出口死锁与 DNS 解析缺陷**
    *   **热点 Issue**：[#11813](https://github.com/zeroclaw-labs/zeroclaw/issues/11813) (P1, High Risk) 与 [#10199](https://github.com/zeroclaw-labs/zeroclaw/issues/10199)。
    *   **分析**：用户发现当插件尝试建立 egress 连接时，如果第一个解析的 IP 地址被“黑洞化”（不响应也不拒绝），连接会停滞而不尝试下一个地址。同时，连接超时无法取消阻塞式的 `getaddrinfo` 调用。这直接影响了插件在复杂网络环境下的可靠性。
    *   **对应 Fix**：已有 PR [#11814](https://github.com/zeroclaw-labs/zeroclaw/pull/11814) 试图通过错峰拨号（stagger pinned egress dials）解决静默地址导致的停滞问题。

2.  **[P1 高优先级] Windows 平台僵尸端口占用**
    *   **热点 Issue**：[#8800](https://github.com/zeroclaw-labs/zeroclaw/issues/8800) (P1, High Risk)。
    *   **分析**：Windows 11 上被杀死的 zeroclaw 进程会遗留 LISTENING/CLOSE_WAIT 状态的端口，导致新守护进程无法启动。这是 Windows 用户长期以来的痛点，严重阻碍了开发调试体验。
    *   **状态**：标记为 `no-stale`，表明维护者高度关注，但尚未在本日数据中看到合并的修复 PR，仍在处理中。

3.  **[P1 高优先级] Quickstart 在 Android/Termux 失败**
    *   **热点 Issue**：[#11525](https://github.com/zeroclaw-labs/zeroclaw/issues/11525) (P1, High Risk)。
    *   **分析**：在 Android 16/Termux (aarch64) 环境下，Quickstart 无法创建 Agent，提示“磁盘上没有任何更改”。这限制了 ZeroClaw 在移动端/边缘计算场景的落地能力。

---

## 5. Bug 与稳定性

按严重程度（P1 > P2 > P3）及是否有对应修复 PR 排列：

| 优先级 | 问题描述 | 状态/修复 | 链接 |
| :--- | :--- | :--- | :--- |
| **P1** | **插件 Egress 连接停滞**：首个解析地址黑洞化时，后续地址不被尝试。 | **有 Fix PR** ([#11814](https://github.com/zeroclaw-labs/zeroclaw/pull/11814))，待合并。 | [Issue #11813](https://github.com/zeroclaw-labs/zeroclaw/issues/11813) |
| **P1** | **Windows 僵尸端口**：进程被杀后端口残留，新守护进程无法启动。 | 无明确 Fix PR，标记 `no-stale`，调查中。 | [Issue #8800](https://github.com/zeroclaw-labs/zeroclaw/issues/8800) |
| **P1** | **Quickstart 安卓失败**：Termux 环境下无法持久化配置。 | 无明确 Fix PR，活跃讨论中。 | [Issue #11525](https://github.com/zeroclaw-labs/zeroclaw/issues/11525) |
| **P1** | **agent-browser 无界等待**：子进程挂起导致 Agent 轮次无限阻塞。 | 无明确 Fix PR，标记 `in-progress`。 | [Issue #9946](https://github.com/zeroclaw-labs/zeroclaw/issues/9946) |
| **P2** | **插件目录删除错误**：`plugin remove` 删除的是 `plugins_dir/<name>` 而非实际加载路径，可能误删无关目录。 | 无明确 Fix PR，标记 `accepted`。 | [Issue #11357](https://github.com/zeroclaw-labs/zeroclaw/issues/11357) |
| **P2** | **配置热更新失效**：`config set` 插件设置仅写入磁盘，未同步给运行中的守护进程。 | 无明确 Fix PR，标记 `release:v0.8.7` 关注。 | [Issue #11820](https://github.com/zeroclaw-labs/zeroclaw/issues/11820) |
| **P2** | **llama.cpp URL 错误**：自定义 Provider 使用非本地 URI 时获取模型列表失败。 | 无明确 Fix PR，标记 `accepted`。 | [Issue #11296](https://github.com/zeroclaw-labs/zeroclaw/issues/11296) |
| **P3** | **Rust 1.99 Clippy 报错**：CI 锁定 1.98，新版 18 个新发现导致构建失败风险。 | 标记为 CI 任务，非功能 Bug。 | [Issue #11834](https://github.com/zeroclaw-labs/zeroclaw/issues/11834) |

---

## 6. 功能请求与路线图信号

基于今日活跃 PR 和 Issue，以下功能信号指向 **v0.8.7** 及后续版本：

*   **OpenRouter 余额集成**：
    *   多个 PR ([#11845](https://github.com/zeroclaw-labs/zeroclaw/pull/11845), [#11846](https://github.com/zeroclaw-labs/zeroclaw/pull/11846)) 致力于在 Web 设置中展示 OpenRouter 信用余额，并支持管理 API 密钥的加密存储。这表明项目正在增强对第三方 LLM 网关的成本可视化管理能力。
*   **ZeroCode 交互深化**：
    *   **本地文件链接支持**：[PR #11633](https://github.com/zeroclaw-labs/zeroclaw/pull/11633) 允许从转录记录中直接打开本地文件路径，解决了终端链接检测对长行换行的误判。
    *   **文件写入差异展示**：[PR #11463](https://github.com/zeroclaw-labs/zeroclaw/pull/11463) 在 ZeroCode 中增加了对本地文件写入的红绿差异对比（Diff），提升代码编辑安全性。
    *   **无取消刷新**：[PR #11457](https://github.com/zeroclaw-labs/zeroclaw/pull/11457) 支持 F5 刷新会话而不触发取消操作，保持用户上下文。
*   **子进程资源监控**：
    *   [PR #11456](https://github.com/zeroclaw-labs/zeroclaw/pull/11456) 引入了可选的子进程内存看门狗（`shell_max_memory_mb`），防止 Shell 工具因内存泄漏导致主机崩溃。这是运维安全的重要增强。
*   **配置规范化**：
    *   [Issue #10892](https://github.com/zeroclaw-labs/zeroclaw/issues/10892) 推进“规范配置生成”和“按目标应用结果追踪”，旨在建立配置变更与运行状态之间的确定性映射，为未来的实时应用（live-apply）奠定基础。

---

## 7. 用户反馈摘要

*   **痛点 1：插件生态的信任与透明度不足**
    *   用户（如 @IftekharUddin）频繁报告插件在 CLI 检查通过但在运行时注册失败的情况 [Issue #11336](https://github.com/zeroclaw-labs/zeroclaw/issues/11336)。用户期望 `plugin list --verify` 能准确反映运行时状态，而非仅检查文件存在性。
*   **痛点 2：跨平台（特别是非 Linux/x86）支持薄弱**
    *   Android/Termux 用户 [Issue #11525](https://github.com/zeroclaw-labs/zeroclaw/issues/11525) 和 Windows 用户 [Issue #8800](https://github.com/zeroclaw-labs/zeroclaw/issues/8800) 表达了强烈的不满，认为核心 Onboarding 和进程管理在这些主流边缘/桌面平台上仍不可靠。
*   **满意点：ZeroCode 的可视化改进**
    *   虽然尚未全面发布，但 [PR #11513](https://github.com/zeroclaw-labs/zeroclaw/pull/11513) 中展示的仪表盘上下文感知能力获得了内部/早期用户的积极反馈，认为它解决了“不知道当前连到哪个 Agent/Profile”的困惑。

---

## 8. 待处理积压

*   **长期 P1 稳定性问题**：
    *   [Issue #9946](https://github.com/zeroclaw-labs/zeroclaw/issues/9946) (Agent-browser 无界等待) 创建于 8 月，至今仍为 Open 且标记 `in-progress`。这是直接影响工作流阻塞（S1）的问题，需维护者优先级处理。
    *   [Issue #8800](https://github.com/zeroclaw-labs/zeroclaw/issues/8800) (Windows 端口泄漏) 创建于 7 月，跨度 3 个月，严重影响 Windows 用户体验。
*   **架构级任务**：
    *   [Issue #10199](https://github.com/zeroclaw-labs/zeroclaw/issues/10199) (DNS 解析阻塞超时) 涉及底层网络栈修改，技术难度高，虽标记 `accepted` 但进展缓慢，可能影响插件在受限网络环境下的 SLA。
*   **CI/基础设施债务**：
    *   [Issue #11839](https://github.com/zeroclaw-labs/zeroclaw/issues/11839) 指出 macOS Universal 桌面构建接近 180 分钟超时限制，可能导致发布阻塞。需立即优化构建流水线。

---
**分析师备注**：ZeroClaw 正处在从“单体 CLI”向“插件化平台”转型的关键阵痛期。v0.8.6 引入 WASM 插件宿主后，安全性（egress 控制）和一致性（CLI vs Runtime）的 Bug 密度上升。建议维护团队在下个迭代中重点收敛插件安全边界，并解决 Windows/Android 的基础体验问题，以维持社区信心。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 (2026-10-19)

## 1. 今日速览
过去24小时，PicoClaw 项目整体活跃度处于**中低水平**，主要活动集中在遗留问题的清理与修复。数据上展示了 3 条 Issue 更新和 5 条 PR 更新，但值得注意的是，被更新的旧 Issue（#3281）已被标记为 `[stale]` 并关闭，表明项目正在积极清理停滞的工单。同时，社区开发者 @sstpnk 提交了两个关键的基础设施修复 PR（Cron 错误处理和 Telegram 超时），解决了长期存在的静默故障问题，显著提升了系统的稳定性。

## 2. 项目进展
今日合并或关闭的 PR 主要集中在清理长期停滞的旧代码和依赖项，而非核心功能推进。

*   **关闭/合并 PR #1556 & #1040**：
    *   **PR #1556** (已关闭/合并): `fix: merge PR #1378 #1376 #1356`。该 PR 旨在合并多个早期的修复。虽然标记为关闭/合并，但这属于对旧代码的清理，而非新特性。 [链接](https://github.com/sipeed/picoclaw/pull/1556)
    *   **PR #1040** (已关闭/合并): `feat: add opencode-zen provider with multi-endpoint support`。这是一个较旧的增强功能 PR，今日被处理（关闭或合并）。如果已合并，则增加了 OpenCode Zen 提供商的支持；如果是关闭，则代表该功能未被采纳或被重构。 [链接](https://github.com/sipeed/picoclaw/pull/1040)

**推进评估**：今日没有重大的新功能合并，主要工作在于技术债务的清理。

## 3. 社区热点
今日讨论最活跃的 Issue 是旧有的性能问题：

*   **#3281 [BUG] Web UI chat input is very laggy when history has a little bit long**
    *   **状态**：已关闭 (Closed)
    *   **活跃度**：评论数 19，点赞 2。这是近期评论数最多的 Issue。
    *   **分析**：用户反馈当会话历史较长时，Web UI 输入框出现严重延迟。该问题存在较长时间（创建于 7 月），因长期未解决或被判定为难以快速修复/非核心痛点，最终被标记为 `[stale]` 并关闭。这反映了社区对前端性能优化的关注，但维护者可能认为该问题复杂度较高或缺乏优先级。
    *   **链接**：[https://github.com/sipeed/picoclaw/issues/3281](https://github.com/sipeed/picoclaw/issues/3281)

## 4. Bug 与稳定性
今日识别出两个关键的稳定性 Bug，且均有对应的修复 PR 待合并：

### 严重程度：高 (High)
1.  **Telegram 长轮询无超时导致永久挂起**
    *   **Issue**: [#3422 [BUG] Telegram channel stops receiving messages forever...](https://github.com/sipeed/picoclaw/issues/3422)
    *   **问题**：Telegram 频道的 HTTP Client 未设置超时。在长轮询 (`getUpdates`) 过程中，若网络连接异常（如代理断开），连接将半开且永久挂起，导致网关进程看似健康但无法接收任何消息。
    *   **Fix PR**: [PR #3424 fix(telegram): bound hung long-poll requests with HTTP timeouts](https://github.com/sipeed/picoclaw/pull/3424) (状态: Open)
    *   **建议**：此修复应尽快合并，以防止生产环境中静默的服务中断。

2.  **Cron 任务失败状态被误报为成功**
    *   **Issue**: [#3423 [BUG] Cron jobs always report lastStatus=ok, even when the run failed](https://github.com/sipeed/picoclaw/issues/3423)
    *   **问题**：Gateway 在注册 Cron 处理器时，丢弃了 `ExecuteJob` 返回的错误，导致即使任务失败，`lastStatus` 也记录为 `"ok"`。这破坏了可观测性，使运维无法通过状态判断任务是否真正执行成功。
    *   **Fix PR**: [PR #3425 fix(cron): report failed jobs as errors instead of ok](https://github.com/sipeed/picoclaw/pull/3425) (状态: Open)
    *   **建议**：需合并此 PR 以恢复 Cron 系统的错误传播机制，避免“假阳性”监控。

## 5. 功能请求与路线图信号
*   **iMessage/SMS 通道支持**
    *   **PR**: [#3416 feat(channels): add Sendblue iMessage and SMS transport](https://github.com/sipeed/picoclaw/pull/3416) (状态: Open, Draft)
    *   **信号**：社区开发者 @lookevink 提出了通过 Sendblue 实现 iMessage 和 SMS 通道的功能。这是一个**草稿**状态，表明实现尚未完成或正在等待审查。
    *   **分析**：如果合入，将极大地扩展 PicoClaw 的触达渠道，允许用户通过短信或即时消息直接与 Agent 交互。鉴于其为草稿且创建时间较早（10月5日），需关注维护者是否有计划将其提升至待审状态。

## 6. 用户反馈摘要
*   **痛点**：
    *   **静默失败**：用户对 Cron 任务“看似成功实则失败”表示不满，这影响了自动化工作流的可靠性（参考 Issue #3423）。
    *   **连接脆弱性**：Telegram 用户抱怨代理网络环境下的不稳定性导致服务永久停止，且难以诊断（参考 Issue #3422）。
    *   **性能瓶颈**：Web UI 在长历史下的卡顿是长期存在的痛点，虽然被关闭，但 19 条评论表明受影响用户群体不小（参考 Issue #3281）。
*   **满意/认可**：
    *   社区开发者积极修复底层稳定性问题（如 @sstpnk 提交的两个关键 Fix），体现了良好的社区贡献生态。

## 7. 待处理积压
以下 PR/Issue 需要维护者关注：

1.  **PR #3424 & #3425 (Cron & Telegram Fixes)**：
    *   这两个 PR 修复了严重的可靠性问题，状态为 `Open`。建议维护者优先审查并合并，以提升系统整体健壮性。
2.  **PR #3416 (Sendblue Channel)**：
    *   处于 `Draft` 状态。建议作者标记为 `Ready for Review` 或维护者提供反馈，以推进多模态消息通道的进展。
3.  **Issue #3281 (Web UI Lag)**：
    *   虽然已关闭，但鉴于其高评论量，建议维护者确认是否有后续性能优化计划，或在关闭评论中明确说明原因（如架构限制、低优先级等），以管理用户预期。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期**：2026-10-19  
**数据来源**：GitHub (agentscope-ai/QwenPaw) 过去 24 小时数据

## 1. 今日速览
过去 24 小时，QwenPaw 社区保持中等活跃度，共更新 **13** 个 Issues 和 **9** 个 Pull Requests，无新版本发布。核心动态集中在**基础设施修复**与**多通道稳定性治理**，维护者 @hehuang139 密集提交了 5 个针对 Channels、Matrix、Skills 及 CLI 的 Bug 修复 PR。当日重点暴露了 QQ 群组消息静默丢弃和钉钉长文本降级两个高频痛点，同时移动端插件生态（HarmonyOS）提出标准化契约需求。项目整体处于功能迭代稳定期，稳定性修复力度加大。

## 2. 版本发布
*本日无新版本发布。*

## 3. 项目进展
**今日无已合并/关闭的 PR**（9 个 PR 均为待合并状态）。
社区开发活动主要处于代码审查（Code Review）阶段。@hehuang139 提交的 5 个修复 PR 若获批，将显著改善多通道配置体验与文件处理兼容性；@QS00 提交的 Web 搜索增强 PR 正在推进中。目前项目尚未形成新的功能发布节点，重心在于清理技术债务与修复回归 Bug。

## 4. 社区热点
今日讨论最活跃、评论最多的 Issue 为 **#8278 [bug] [Bug]: DingTalk 通道在消息 >3500 字符时整条降级为纯文本** ([链接](https://github.com/agentscope-ai/QwenPaw/issues/8278))，过去 24 小时内有 6 条新评论。
**分析**：该 Issue 反映了数据报表、多列表格等重度使用 Markdown 场景下的强烈渲染诉求。用户痛点在于降级机制是“静默”的，Agent 调用方无法感知长文本已被破坏为纯文本，导致用户体验断裂。高热度表明这是阻断性体验问题，预计将成为近期修复的高优目标。

## 5. Bug 与稳定性
今日报告了多个涉及核心稳定性的 Bug，按严重程度排列如下：

*   **高优先级（严重回归/静默失败）**
    *   [#8313] **QQ group messages silently dropped on 2.2.2** ([链接](https://github.com/agentscope-ai/QwenPaw/issues/8313))：2.2.2 版本中，Gateway 分发的 `GROUP_MESSAGE_CREATE` 事件未被正确映射，导致群组消息静默丢失。目前无对应 Fix PR。
    *   [#8312] **上下文控制失效，导致任务中断** ([链接](https://github.com/agentscope-ai/QwenPaw/issues/8312))：上下文压缩（Compaction）未能将请求适配至模型输入窗口（252,565 > 251,904 tokens），导致 2.2.2 版本任务意外中断。目前无对应 Fix PR。
    *   [#8278] **钉钉通道长文本静默降级为纯文本** ([链接](https://github.com/agentscope-ai/QwenPaw/issues/8278))：如上述热点，影响面大且缺乏降级信号。目前无对应 Fix PR。
*   **中优先级（特定环境/数据完整性）**
    *   [#8270] **Windows 压缩包在 QwenPaw 乱码** ([链接](https://github.com/agentscope-ai/QwenPaw/issues/8270))：ZIP 解压未传递 encoding 参数导致中文路径乱码。**已有 Fix PR**：[#8301] (待合并)。
    *   [#8306] **原子文件写入拒绝有效的长文件名** ([链接](https://github.com/agentscope-ai/QwenPaw/issues/8306))：原子写入器生成的临时文件名添加了 22 字节，导致原本合法的 243 字节文件名在拼接后超限失败。目前无对应 Fix PR。
    *   [#3361] **飞书对话中通过 console 端设置参数报错** ([链接](https://github.com/agentscope-ai/QwenPaw/issues/3361))：触发 asyncio `Task was destroyed but it is pending!` 错误。**已有部分 Fix PR**：[#8302] 旨在保留 consumers 直至关闭清理完成（待合并）。
*   **低优先级（配置易用性）**
    *   [#2882] **配置 matrix 时复制 USER ID/TOKEN 自动加空格导致失败** ([链接](https://github.com/agentscope-ai/QwenPaw/issues/2882))。**已有 Fix PR**：[#8304] 归一化粘贴的连接凭证（待合并）。
    *   [#1612] **Web UI 中自定义通道配置显示 [object Object]** ([链接](https://github.com/agentscope-ai/QwenPaw/issues/1612))。**已有 Fix PR**：[#8305] 保留结构化自定义通道配置（待合并）。

## 6. 功能请求与路线图信号
*   **DeepSeek 搜索集成**：[#8314] feat(web_search): add DeepSeek Search provider ([链接](https://github.com/agentscope-ai/QwenPaw/pull/8314))，**已有 PR 推进中**。用户期望利用 DeepSeek 官方 Search 端点提供包含“发布时间”和“权威分级”的结构化数据，补齐当前 keyless 方案的不足。
*   **QQ Bot 支持流式消息发送**：[#8307] [Feature]: QQ Bot has supported the stream messages send ([链接](https://github.com/agentscope-ai/QwenPaw/issues/8307))。用户期望对齐飞书通道，实现 QQ 通道内的流式打字机效果。目前仅停留在需求阶段。
*   **移动端本地插件宿主标准化**：[#8311] [Question]: [Plugins/HarmonyOS] 移动端本地插件宿主：请求标准化 `window.QwenPaw` 契约 ([链接](https://github.com/agentscope-ai/QwenPaw/issues/8311))。鸿蒙原生 App 团队请求统一数据面桥、分发验签及 PawApp 门控机制。此项涉及底层架构标准化，路线图信号较弱，预计为长线规划。
*   **UI 交互优化（模型切换与思考控制）**：[#8310] qwenpaw2.2.2版本的模型切换与思考控制 ([链接](https://github.com/agentscope-ai/QwenPaw/issues/8310))。用户反馈模型切换弹窗路径复杂，期望增加模型收藏夹；同时提出与 Thinking Control 插件的交互优化建议。属于前端体验优化，暂无法定入近期版本。

## 7. 用户反馈摘要
*   **痛点**：用户对多通道（DingTalk, Matrix, 飞书, QQ）的配置易用性（粘贴空格、结构化字段展示、长文本渲染）和稳定性（异步任务销毁、消息静默丢失）存在强烈吐槽，尤其是数据密集场景下的降级问题。
*   **使用场景**：用户正大量部署离线环境（如 #1453 离线安装问题）及跨端环境（Windows 中文 ZIP 乱码 #8270），且开始涉足 HarmonyOS 移动端，生态拓展明显。
*   **满意度**：用户对 2.2.2 版本的上下文管理（出现 Exceeded 报错中断）和底层稳定性（QQ 消息丢失）不满意。

## 8. 待处理积压
*   [#1453] CoPaw离线安装时，无法连接离线的千问3、3.5等，但是可以连接deepseek R1 ([链接](https://github.com/agentscope-ai/QwenPaw/issues/1453))。创建于 2026-03-13，距今已近 7 个月，有 4 条评论。离线/断网环境下的模型路由问题是长期痛点，维护者尚未提供明确排查结论，需关注。
*   [#7827] `server/discover` 返回裸 HTTP 500 未被判定为旧协议证据 ([链接](https://github.com/agentscope-ai/QwenPaw/issues/7827))。创建于 2026-09-17，影响 DashScope 千问 MCP 商店的 streamable_http 驱动激活。涉及 MCP 核心协议兼容性，长期未响应，可能导致大量国内用户无法接入官方 MCP 服务。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes-Agent 项目动态日报
**日期**: 2026-10-19
**数据窗口**: 过去 24 小时 (2026-10-18)

## 1. 今日速览
Hermes-Agent 今日展现出极高的社区活跃度，过去 24 小时内产生 471 条 Issue 更新和 500 条 PR 更新，表明项目处于高强度的开发与 Bug 修复迭代期。
核心开发工作集中在“统一 Gateway 运行时”（#106742）合并后的后续修复上，多个 P0/P1 级别的严重 Bug 正在通过打包 Issue（如 #140719）进行系统性解决。
虽然今日没有发布新的正式版本（Releases），但大量关于消息传递丢失、会话状态崩溃及安全配置绕过的修复正在快速推进，旨在提升系统的稳定性和企业级可靠性。

## 2. 版本发布
**无新版本发布**

## 3. 项目进展
*注：今日合并/关闭的 PR 中，多数显示为 `OPEN` 或特定修复包的关闭，以下基于数据中明确的状态变化及高关注修复进行总结：*
* **Gateway 修复推进**: 针对统一 Gateway 架构的后端修复正在快速推进。Issue [#139160](https://github.com/NousResearch/hermes-agent/issues/139160)（Gateway fixes 第 2 包）已关闭，表明涉及会话创建、模型选择及凭据管理的一系列 P2 级 Bug 已在 `main` 分支修复或确认为非回归。
* **会话修剪性能优化**: PR [#124273](https://github.com/NousResearch/hermes-agent/pull/124273) 被标记为已关闭（或即将合并），该 PR 优化了 proactive tool-result prune，改为原地更新变更行而非重新生成整个 transcript，显著提升了会话压缩（Compression）的性能。

## 4. 社区热点
*   **#134889 [P0] Tracking: one gateway owns every local session (#106742) — post-merge fixes**
    *   [链接](https://github.com/NousResearch/hermes-agent/issues/134889) | 评论: 186
    *   **分析**: 这是今日最核心的热点。由于 #106742 统一 Gateway 架构的合并，引发了大量回归问题。该追踪 Issue 聚集了关于本地会话所有权、网关兼容性及 Windows 平台风险的问题。高评论数表明维护者和贡献者正在密集讨论拆分和解决这些回归的具体策略。
*   **#131859 [P3] Cannot open a pull request via API: CreatePullRequest permission error**
    *   [链接](https://github.com/NousResearch/hermes-agent/issues/131859) | 评论: 44
    *   **分析**: 用户反馈通过 API 从 fork 向主仓库提交 PR 时遭遇权限错误，而直接创建 Issue 或 fork 内的 PR 正常。这反映了 GitHub API 授权机制或机器人账号（Bot）权限配置的特定阻碍，影响了自动化工作流的执行。
*   **#107402 [P2] `hermes update` leaves a permanent "did not restart running gateways" warning**
    *   [链接](https://github.com/NousResearch/hermes-agent/issues/107402) | 评论: 26
    *   **分析**: 升级体验的痛点。当 Gateway 处于自身进程树中时，更新器会延迟重启以等待工作完成，但状态验证立即执行导致状态滞留为 `stale`。用户需要明确的状态更新以确认升级成功。

## 5. Bug 与稳定性
*按严重程度（P0 > P1 > P2 > P3）排列*

*   **[P0] Gateway 回归与状态管理风险**
    *   [Issue #134889](https://github.com/NousResearch/hermes-agent/issues/134889): 统一网关合并后的修复追踪。涉及 `sweeper:risk-session-state` 和 `sweeper:risk-compatibility`。
    *   *Fix 状态*: 正在通过 #139160, #140719 等打包 Issue 逐步修复。
*   **[P1] 更新失败导致安装半应用状态 (Pain Cluster)**
    *   [Issue #125437](https://github.com/NousResearch/hermes-agent/issues/125437): `hermes update` 失败时留下 raw error 且无产品内恢复路径。导致 Desktop 启动即关闭或 Gateway 缺少依赖。
    *   *Fix 状态*: 标记为 `from-pain-miner`，尚未见明确 Fix PR，需优先处理。
*   **[P2] Smart-Approval Guardian 崩溃**
    *   [Issue #131375](https://github.com/NousResearch/hermes-agent/issues/131375): 在 Desktop/serve 会话的事件循环线程中，同步 Relay 完成会导致崩溃，使得所有标记的命令都升级给用户。
    *   *Fix 状态*: 已报告，标签 `P2`。
*   **[P2] TUI 压缩热重载崩溃**
    *   [Issue #103410](https://github.com/NousResearch/hermes-agent/issues/103410): 使用外部上下文引擎（如 LCMEngine）时，配置变更导致 `'LCMEngine' object has no attribute '_coerce_threshold_tokens_cap'` 崩溃。
*   **[P2] Desktop 响应重复渲染**
    *   [Issue #127621](https://github.com/NousResearch/hermes-agent/issues/127621): 桌面应用中助手响应偶尔渲染两次。
*   **[P2] 403 错误重试逻辑错误**
    *   [Issue #117869](https://github.com/NousResearch/hermes-agent/issues/117869): 当 403 错误体自标识为 `server_error` 时，应重试而非视为凭据拒绝。
    *   *Fix 状态*: 待合并 PR 或补丁。

## 6. 功能请求与路线图信号
*   **A2A (Agent-to-Agent) 协议支持**
    *   [Issue #514](https://github.com/NousResearch/hermes-agent/issues/514): 支持 Google A2A 协议，实现远程代理发现与通信。虽为 P3，但 👍 29，反映了社区对多代理互操作（Interoperability）的强烈需求。
*   **Hub-authenticated Peer-send Message API**
    *   [PR #118294](https://github.com/NousResearch/hermes-agent/pull/118294): 允许 Peer Gateway 通过 Hub 认证向本地代理发送消息（Send + Ack + Status）。这是构建去中心化代理网络的关键基础设施。
*   **Guided Picker for Subagent Model + Provider**
    *   [Issue #67347](https://github.com/NousResearch/hermes-agent/issues/67347): 在 Desktop/Dashboard 的高级设置中，将自由文本输入替换为引导式选择器，降低配置错误率。
*   **Cron 任务超时覆盖**
    *   [PR #113343](https://github.com/NousResearch/hermes-agent/pull/113343): 添加 per-job `script_timeout_seconds`，允许单个长任务拥有更大的墙钟时间预算，而不影响全局配置。

## 7. 用户反馈摘要
*   **升级体验糟糕**: 用户反复提及 `hermes update` 失败后的状态不一致（#125437, #107402），缺乏清晰的回滚或修复指引是主要痛点。
*   **Windows 平台兼容性差**: 多个 Issue 标记了 `os/windows`，包括 bootstrap re-exec 导致模块丢失（#122160）和安装半应用状态。
*   **安全配置绕过担忧**: 用户指出 `hermes config set` 可以绕过系统配置写入保护（#59293），允许终端访问的 agent 无门控地禁用审批层，这是一个严重的安全边界问题。
*   **Telegram 消息丢失**: 当在 Desktop 查看绑定的 Telegram 会话时，回复渲染在 Desktop 但从未投递到 Telegram（#76767），且短回复有时会被重复投递（#53449）。

## 8. 待处理积压
*   **>1000 Open Issues**: [Issue #7335](https://github.com/NousResearch/hermes-agent/issues/7335) 提出如何控制 Issue 增长，目前积压依然严重。
*   **长期未响应的 P2/P3 Bug**:
    *   [Issue #16257](https://github.com/NousResearch/hermes-agent/issues/16257): Python 3.9 兼容性崩溃（缺少 `__future__` import），创建于 4 月，至今未解决。
    *   [Issue #84672](https://github.com/NousResearch/hermes-agent/issues/84672): Cron 扫描器将安全文档误报为攻击，创建于 8 月。
    *   [Issue #58694](https://github.com/NousResearch/hermes-agent/issues/58694): v0.17.0 Dashboard 内存回归（增加 300-400MB），创建于 7 月，影响资源受限服务器。
*   **安全依赖漏洞**: [Issue #122424](https://github.com/NousResearch/hermes-agent/issues/122424) 指出 `js-yaml` 和 `yaml` 依赖位于已知 CVE 范围内，需尽快更新 `package.json` 锁定版本。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 (2026-10-19)

## 1. 今日速览
过去24小时内，AstrBot 项目保持高度活跃，核心开发集中于**插件系统增强**（会话级覆盖、本地化）、**Slack 平台稳定性修复**及**全链路日志追踪（Tracing）**。今日合并/关闭了 7 个 PR，其中包含修复 Gemini 工具调用 Bug 的关键补丁及 Dashboard 插件文件夹管理功能的前置代码，整体生态健康度良好，主要贡献者协作密集，无严重阻塞性问题。

## 2. 版本发布
*今日无新版本发布。*

## 3. 项目进展
今日主要推进了 Dashboard 插件管理体验、底层日志追踪能力及多模态支持，以下为已合并/关闭的核心 PR：

*   **插件与 Dashboard 体验优化**：
    *   [#10576](https://github.com/AstrBotDevs/AstrBot/pull/10576)：修复了侧边栏插件名称在界面语言切换时的本地化显示问题，提升了 Dashboard 的多语言一致性。
    *   [#10517](https://github.com/AstrBotDevs/AstrBot/pull/10517)：修复了模板 `dict` 字段无默认值时导致编辑器抛出的 `TypeError`，增强了插件配置鲁棒性。
*   **底层基础设施升级（日志追踪）**：
    *   [#10614](https://github.com/AstrBotDevs/AstrBot/pull/10614) 关闭且合并了前置 PR [#10515](https://github.com/AstrBotDevs/AstrBot/pull/10515)，引入了基于 OpenTelemetry 的消息追踪模型与受限 SQLite 历史，并展示了 Agent Token 统计卡片。
    *   紧随其后，[#10617](https://github.com/AstrBotDevs/AstrBot/pull/10617) 修复了因上述改动引入的重启测试死锁、Trace 快照顺序错乱及 Windows 平台测试失败问题，确保了底层改动的稳定性。
*   **功能与模型配置修复**：
    *   [#10522](https://github.com/AstrBotDevs/AstrBot/pull/10522)：修复了模型配置刷新后，非首次添加模型时丢失上游配置（如全能力、上下文限制变为0）的 Bug，确保了模型管理的准确性。
    *   插件会话级覆盖与本地化相关改动（如 [#10612](https://github.com/AstrBotDevs/AstrBot/pull/10612), [#10613](https://github.com/AstrBotDevs/AstrBot/pull/10613)）作为初始实现已被关闭，当前最新的替代实现 PR [#10618](https://github.com/AstrBotDevs/AstrBot/pull/10618) 和 [#10619](https://github.com/AstrBotDevs/AstrBot/pull/10619) 处于 OPEN 状态，正等待最终审查合并。

## 4. 社区热点
*   **会话级插件配置覆盖（#10606 & 替代 PR）**
    用户 [mjy1113451](https://github.com/mjy1113451) 强烈提出不同群组/私聊共享单一全局配置的痛点。该诉求不仅促成了 Issue [#10606](https://github.com/AstrBotDevs/AstrBot/issues/10606)，并迅速推动了 PR [#10618](https://github.com/AstrBotDevs/AstrBot/pull/10618) 的开发。核心诉求是“按群覆盖”的稀疏层配置，极大满足群聊复杂场景下的个性化需求。
*   **插件市场的文件夹整理（#10623）**
    PR [#10623](https://github.com/AstrBotDevs/AstrBot/pull/10623) 引入了 Dashboard 插件按文件夹拖拽整理的功能。随着 AstrBot 插件生态扩大，用户急需通过“快速过滤器（运行中/停止/更新/置顶）”和“文件夹视图”来管理大量已安装插件。
*   **Slack Webhook 稳定性（#10615, #10616）**
    维护者密集提交了 Slack 相关的修复：#10616 解决消息转换超时导致的 Webhook 重试去重问题；#10615 解决 Slack 富文本列表中列表边界被相邻段落合并（如 `SKU-AB` 和 `123` 被拼成 `SKU-AB123`）的排版 Bug。反映了 Slack 适配器在复杂文本解析上的持续打磨。

## 5. Bug 与稳定性
今日报告及跟进的核心 Bug 如下（按严重性排序）：

*   **高危：Gemini 工具调用丢失思考签名 (#9217)**
    *   状态：OPEN | [Issue 链接](https://github.com/AstrBotDevs/AstrBot/issues/9217)
    *   现象：使用 Google AI Studio 工具时，报错 `Function call is missing a thought_signature`，原因是构造上一轮消息时丢弃了 `thought_signature`。
    *   修复进度：**已有 Fix PR**，PR [#10620](https://github.com/AstrBotDevs/AstrBot/pull/10620) 解决了在 `skills_like` 模式下重新查询时工具调用元数据丢失的问题，目前正在审查中。
*   **中危：插件后台任务同步执行 (#10610)**
    *   状态：OPEN | [Issue 链接](https://github.com/AstrBotDevs/AstrBot/issues/10610)
    *   现象：声明为 `is_background_task=True` 的后台任务（通过 `context.add_llm_tools()` 注册）实际被同步执行，破坏了后台异步唤醒机制。
*   **中危：后台任务工具注册异常 (#10398 衍生 Bug)**
    *   状态：部分修复/衍生 | [PR 链接](https://github.com/AstrBotDevs/AstrBot/pull/10398)
    *   现象：在修复 #10398 引入的代码中，后台任务相关的逻辑存在未完全覆盖的边界条件（衍生出 #10610 ）。
*   **低危：QQ 机器人一呼多回 (#7094)**
    *   状态：OPEN (长期存在) | [Issue 链接](https://github.com/AstrBotDevs/AstrBot/issues/7094)
    *   现象：配置 QQ websocket 机器人后，日志显示发送了多次消息，但 QQ 端只接收一次。属于特定端侧/网络环境引起的重复请求问题。

## 6. 功能请求与路线图信号
*   **数据与日志拆分 (Open)**
    *   用户 [mjy1113451](https://github.com/mjy1113451) 提出 [#10621](https://github.com/AstrBotDevs/AstrBot/issues/10621)，建议将核心数据与日志系统拆分以便调试。结合今日已合并的底层日志追踪重构（#10614），未来版本大概率会对日志与系统数据管理做出进一步调整。
*   **视频模态原生支持 (Open)**
    *   PR [#10202](https://github.com/AstrBotDevs/AstrBot/pull/10202) 将视频作为一级输入模态镜像了 `image_urls` 的流程。这是 AstrBot 迈向多模态 Agent 的重要一步，预计将在下一版本中落地并作为重要特性。

## 7. 用户反馈摘要
*   **痛点/抱怨**：
    *   用户反馈插件市场更新机制不透明，升级新版本时部分插件无法自动同步至最新版本（[#10607](https://github.com/AstrBotDevs/AstrBot/issues/10607)）。
    *   用户在配置 GLM 系列模型时，偶发因参数传递错误导致调用失败（[`messages 参数非法`](https://github.com/AstrBotDevs/AstrBot/issues/4864)），暴露了部分国产 LLM 适配器的兼容性问题。
    *   使用 1panel 部署的 Docker 环境下，QQ 插件易出现多次回复的疑难杂症（[#7094](https://github.com/AstrBotDevs/AstrBot/issues/7094)），增加了运维排查难度。
*   **满意/期望**：
    *   用户高度期望更细粒度的权限与配置管理，如按群配置插件（#10606）、不同语言 README 的即时切换（#10593），反映出 AstrBot 正从“单机单体”向“分布式多群聊生态”演进。

## 8. 待处理积压
*   **长期跟进的 QQ 平台疑难 Bug**：
    *   Issue [#7094](https://github.com/AstrBotDevs/AstrBot/issues/7094) 创建于 2026-03-28，属于特定场景下 QQ WebSocket 连接异常的长期积压问题，且近期仍有更新，提醒维护者需安排专人排查 1panel 环境下的特定部署问题。
*   **高关注度功能 PR 待审查**：
    *   PR [#10620](https://github.com/AstrBotDevs/AstrBot/pull/10620)（Gemini 签名修复）、#10618（会话级配置覆盖）和 #10202（视频多模态）均为解决用户核心痛点的关键代码，处于 OPEN 状态，建议在近期版本中加速合并，以尽快解除相关 Bug 和功能瓶颈。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报 (2026-10-19)

## 1. 今日速览
DeepSeek Harness 项目今日社区活跃度极高，过去 24 小时内 Discussions 更新量达 203 条，显示出庞大的用户基数与高强度的技术交互。由于该项目未启用 GitHub Issues 和 PR，所有功能演进与问题修复均通过 Releases 落地，但**今日未发布新版本**。社区焦点高度集中在 **Windows 沙箱稳定性危机**（大量 0xC0000142 错误报告）以及**Token 消耗效率争议**（DSH 被指比竞品更费 token）。此外，Linux 平台支持缺失与账号封禁申诉困难也是用户情绪较热的两大痛点。

## 2. 版本发布
*   **状态**：无新版本发布。
*   **说明**：今日数据中“最新 Releases”显示为空。由于该项目不通过 PR 合并代码，而是直接通过 Release 推送更新，因此当前处于版本发布间隔期，无新增合并摘要。

## 3. 项目进展
*   **现状**：今日无新增 Release，因此无新的功能落地或修复合入。
*   **背景**：根据社区反馈（如 [Discussion #9962](https://github.com/deepseek-ai/deepseek-harness/discussions/9962) 和 [Discussion #6987](https://github.com/deepseek-ai/deepseek-harness/discussions/6987)），用户正在经历从旧版本升级到 v4.1 或 0.2.1-alpha 系列后的稳定性问题，表明当前线上版本可能存在回归 Bug，急需下一个 Patch 版本修复。

## 4. 社区热点
今日讨论最活跃、评论最多的 5 个话题及其背后诉求：

1.  **[Ideas] 强制要求 x-opencode-session Header** ([#5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495), 44 条评论)
    *   **摘要**：OpenCode Go 运营方警告，若 DSH 请求不包含 `x-opencode-session` 头，将从 09/05 起报错。约 2.5 万用户组织受影响。
    *   **诉求**：这是严重的**兼容性破坏**预警。用户和第三方服务商要求 DSH 尽快在 API 请求中自动注入该 Header，否则将导致大规模服务中断。
    *   **分析**：这是今日最高优先级的业务阻断风险，可能涉及网关层或 SDK 层的配置变更。

2.  **[General] Linux 支持被遗忘** ([#8107](https://github.com/deepseek-ai/deepseek-harness/discussions/8107), 33 条评论)
    *   **摘要**：用户抱怨 Linux 长期缺乏官方支持，仅 WorkBuddy 和 Qoder 等少数工具支持，豆包和 DeepSeek 官方工具均不支持 Linux。
    *   **诉求**：强烈要求官方提供 Linux 原生客户端或至少保障 CLI/Headless 模式在 Linux 上的完整性。
    *   **分析**：反映了核心开发者群体（多使用 Linux）的强烈不满，可能影响项目在技术圈层的声誉。

3.  **[Q&A] 本地 LLM 超时设置调整** ([#3157](https://github.com/deepseek-ai/deepseek-harness/discussions/3157), 21 条评论)
    *   **摘要**：用户在使用 Ollama Gemma4:12b 时，长提示词触发 5 分钟（300,000ms）默认超时，希望调整为 20 分钟。
    *   **诉求**：提供可配置的超时参数（如 `settings.yaml` 中的 `timeout` 字段），以适应本地大模型推理速度慢的特性。
    *   **分析**：典型的本地化部署配置需求，暗示官方默认配置对本地 LLM 不友好。

4.  **[Q&A] 工作区创建失败 (Gateway Unavailable)** ([#8357](https://github.com/deepseek-ai/deepseek-harness/discussions/8357), 13 条评论)
    *   **摘要**：用户报告 `workspace/create` 接口返回 `503 Service Unavailable`，具体为 `workspaceController` 不可用。
    *   **诉求**：排查服务端控制器故障，恢复工作区创建功能。
    *   **分析**：可能指向后端基础设施或特定区域的网关稳定性问题。

5.  **[Q&A] DeepSeek Messages transport failed** ([#6987](https://github.com/deepseek-ai/deepseek-harness/discussions/6987), 12 条评论)
    *   **摘要**：用户升级到 v4.1 后，频繁出现“本轮运行失败”且报错传输层失败，更换不同模型也无法解决。
    *   **诉求**：修复 v4.1 版本的传输层回归 Bug。
    *   **分析**：属于高严重度回归，导致核心功能（对话）不可用，需立即调查。

## 5. Bug 与稳定性
按严重程度排列，今日报告的主要 Bug：

| 严重程度 | 问题描述 | 影响范围 | 相关链接 | 状态 |
| :--- | :--- | :--- | :--- | :--- |
| **P0 (阻断)** | **Windows 沙箱子进程崩溃 (0xC0000142)**：在 Electron 宿主或无控制台环境下，ACL 受限令牌导致所有沙箱内进程（cmd, pwsh）启动即死。 | Windows 桌面端用户，Shell 能力 100% 失效 | [#810](https://github.com/deepseek-ai/deepseek-harness/discussions/810), [#8497](https://github.com/deepseek-ai/deepseek-harness/discussions/8497), [#8193](https://github.com/deepseek-ai/deepseek-harness/discussions/8193) | Open (无 Fix Release) |
| **P1 (严重)** | **Web 认证 Cookie 溢出 (431 Error)**：长期未清理的 `dsh-auth-*` 旧 Cookie 导致 Host Header 超限，无法登录/认证。 | 长期用户，Linux/NixOS 为主 | [#9924](https://github.com/deepseek-ai/deepseek-harness/discussions/9924) | Open |
| **P1 (严重)** | **v4.1 传输层故障**：升级后频繁出现 `Messages transport failed`，导致无法使用模型。 | 升级至 v4.1 的用户 | [#6987](https://github.com/deepseek-ai/deepseek-harness/discussions/6987) | Open |
| **P2 (中高)** | **OpenCode Zen 免费模型 429 错误**：使用 `big-pickle` 等免费模型时必现 `FreeUsageLimitError`，社区已提供修复补丁但未官方合入。 | 使用 OpenCode Provider 的用户 | [#1455](https://github.com/deepseek-ai/deepseek-harness/discussions/1455) | Open (社区有 Patch) |
| **P2 (中高)** | **模板变量注册缺失**：更新后报错 `unknown prompt variable "{{cwd}}"`，导致运行失败。 | Windows 更新用户 | [#9962](https://github.com/deepseek-ai/deepseek-harness/discussions/9962) | Open |

*   **注意**：所有上述 Bug 均无对应的 Fix Release，说明维护团队尚未发布热修复版本，用户侧风险极高。

## 6. 功能请求与路线图信号
*   **本地 LLM 超时可配置化** ([#3157](https://github.com/deepseek-ai/deepseek-harness/discussions/3157))：用户明确希望 `settings.yaml` 支持自定义超时，以适应 Ollama 等本地推理引擎。这是一个低成本、高收益的配置项，很可能被快速纳入。
*   **Token 效率优化** ([#8934](https://github.com/deepseek-ai/deepseek-harness/discussions/8934), [#8938](https://github.com/deepseek-ai/deepseek-harness/discussions/8938))：
    *   用户实测指出 DSH 的“启动税”（Per-turn floor）高达 8,188 tokens，是 Hermes 的 3.3 倍，Claude Code 的 1.8 倍。
    *   原因归结为 DSH 暴露了 29 个工具（竞品仅 4 个），导致系统提示词冗长。
    *   **路线图信号**：若团队重视成本控制，下一版本可能会引入“精简模式”或允许用户禁用部分工具以减少 Token 消耗。这是当前社区最尖锐的技术质疑。
*   **OpenCode Session Header 支持** ([#5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495))：虽标记为 [Ideas]，但实质是第三方服务商的强制要求。若 DSH 作为标准网关，必须支持此 Header，否则将失去大量第三方集成用户。

## 7. 用户反馈摘要
*   **痛点 1：Windows 桌面版稳定性极差**。大量用户（#810, #8497, #8193）报告沙箱机制在 Windows 上基本不可用，尤其是通过 Electron 启动时，完全无法执行 Shell 命令。这直接削弱了 DSH 作为“智能体”的核心执行力。
*   **痛点 2：Token 浪费引发焦虑**。#8934 的量化数据（3.3 倍于竞品）被广泛传播，用户担心长期使用成本高于竞品（如 Hermes, Claude Code），尤其对于按 Token 付费的 API 用户。
*   **痛点 3：账号风控与申诉黑盒**。[#9453](https://github.com/deepseek-ai/deepseek-harness/discussions/9453) 中用户多次账号被封，且无官方客服或有效申诉渠道。用户将此投诉转移至 DSH 社区，反映了 DeepSeek 官方基础设施的用户体验短板。
*   **满意点**：从数据看，暂无显著好评热点。用户主要聚焦于故障排除和成本抱怨。部分用户（如 #3157）肯定了本地 LLM 集成的潜力，但受限于默认配置不佳。

## 8. 待处理积压
*   **Windows ACL 沙箱系列 Bug**：#810 (创建于 2026-08-14), #8497 (2026-09-30), #8193 (2026-09-29)。这三个 Issue 持续两周以上未解决，且复现率高，涉及 Windows 核心安全机制（ACL/Token），建议维护者优先处理，否则桌面版在 Windows 上将处于“半残”状态。
*   **OpenCode Header 兼容性**：#5495。虽然创建于 09-03，但评论数高达 44 条且仍在增长，表明影响面扩大。若 DSH 计划继续支持 OpenCode 生态，此需求需提至最高优先级，否则第三方集成将断裂。
*   **Token 效率优化**：#8934/#8938。虽为新发讨论，但数据扎实（R²=0.99），代表了高端用户/开发者对核心竞争力的质疑。若长期不予回应，可能导致技术导向用户流失至 Hermes 或 Claude Code。

**维护者建议**：当前版本（0.2.1-alpha/rc 系列）在 Windows 上的沙箱稳定性是最大阻碍。建议发布一个专门针对 Windows ACL 和 Cookie 溢出的 Hotfix，并公开回应 Token 效率问题的技术解释或优化计划。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*