# OpenClaw 生态日报 2026-11-01

> Issues: 497 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-11-01 00:32 UTC

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

**日期**：2026年11月1日
**分析范围**：过去24小时活动及存量高优问题

## 1. 今日速览
过去24小时内，OpenClaw 项目保持着极高的开发活跃度，共更新 497 条 Issues 和 500 条 PR，但今日未发布新的版本。核心开发资源大量投入于 Control UI（Web UI）的性能优化与渲染体验改进，以及 macOS 客户端和 Gateway 底层稳定性问题的修复。由于 2026.10.x 版本在插件捕获机制、数据库升级及 Gateway 事件循环上引入了多项回归，社区对崩溃循环（Crash-loop）和状态丢失问题的讨论热度处于高位。整体项目健康度呈现“高频迭代修复”与“底层稳定性压力”并存的态势。

## 2. 项目进展
今日合并或处于待合并状态的高价值 PR 主要集中在性能优化、UI 体验与底层链路修复：

*   **Control UI 性能优化集群**：
    *   针对分组侧边栏的性能优化，通过仅挂载可见的行并在首次加载时准备 advertised methods，解决了热重载时 CPU 消耗过高的问题。 [#189821](https://github.com/openclaw/openclaw/pull/189821)
    *   实现了在热重载时让缓存的聊天面板在首次挂载时直接生效，减少了 144px 的 UI 重排（reflow）和身份内容替换。 [#189760](https://github.com/openclaw/openclaw/pull/189760)
    *   对控制界面的局部化字符串（locales）进行了全面同步与更新。 [#189898](https://github.com/openclaw/openclaw/pull/189898)
*   **多渠道与核心逻辑修复**：
    *   修复了 Slack 渠道中无标签机器人死循环的问题，引入了 `requireExplicitBotMention` 机制以优化对话上下文管理。 [#177555](https://github.com/openclaw/openclaw/pull/177555)
    *   修复了 Codex 扩展插件在调用原生工具时 `before_tool_call` 重写失效的问题。 [#189887](https://github.com/openclaw/openclaw/pull/189887)
    *   修复了本地/私有链接在 Control UI 中预览报错的问题，改为静默显示“无预览”以提升 UX。 [#184871](https://github.com/openclaw/openclaw/pull/184871)
    *   修复了 macOS 应用状态菜单中，继承默认设置的会话选项错误地显示为“Off”的问题。 [#189892](https://github.com/openclaw/openclaw/pull/189892)
*   **测试与 CI 基础设施**：
    *   修复了 CI 中部分测试用例对未使用导出的误报，并重构了部分 SDK 导出固定件的 JSON 写入逻辑。 [#189897](https://github.com/openclaw/openclaw/pull/189897), [#189799](https://github.com/openclaw/openclaw/pull/189799)

## 3. 社区热点
社区讨论热度最高的 Issues 聚焦于**底层状态持久化异常**和**性能回归**，反映了用户在升级至新版本后遭遇的严重卡壳与状态不一致问题：

*   **#160959: Gateway 因捕获大型外部插件导致分钟级阻塞 (P0, 66 评论)**
    [链接](https://github.com/openclaw/openclaw/issues/160959)
    *   **背景**：自 2026.9.6 版本引入插件生成捕获机制后，包含大型依赖树的外部或工作区插件会导致 Gateway 启动时或模型运行时重新发布时，事件循环被完全阻塞数分钟。
    *   **诉求**：需要紧急优化插件捕获的异步/非阻塞机制，解决严重的启动卡顿。
*   **#177656: Native host exec 共享状态完整性错误 (P1, 22 评论)**
    [链接](https://github.com/openclaw/openclaw/issues/177656)
    *   **背景**：在 2026.10.5 稳定版中，出现大量子进程清理时的 identity lost 错误（`Direct shared-state reader requires current integrity admission`），导致子进程未执行即失败。
    *   **诉求**：排查 shared-state 机制的并发读写保护漏洞。
*   **#166634: 崩溃恢复后 Agent 永久不可用 (P0, 21 评论)**
    [链接](https://github.com/openclaw/openclaw/issues/166634)
    *   **背景**：Gateway 进程意外终止后，后台 Agent 准备阶段因 `SQLite session reclamation commit checkpoint expired` 失败。随后 Agent 永久拒绝提供对话历史和模型列表请求，返回 `UNAVAILABLE`。
    *   **诉求**：修复崩溃恢复机制中的 SQLite 会话回收死锁问题。
*   **#161976: WhatsApp DM 持久注册表交接失败 (P1, 19 评论)**
    [链接](https://github.com/openclaw/openclaw/issues/161976)
    *   **背景**：WhatsApp 自动回复在最终交付前失败，下一条消息到来时 Gateway 才补发上一条失败的回复，导致消息时序错乱与丢失感。
    *   **诉求**：完善 WhatsApp 出站消息的可靠性投递机制。
*   **#153426: 记忆树根文件（MEMORY.md / USER.md）被静默丢弃 (P0, 15 评论)**
    [链接](https://github.com/openclaw/openclaw/issues/153426)
    *   **背景**：如果源记录被标记为 `untrusted`，这些关键文件会被静默且永久地从引导 Prompt 中排除，且没有任何诊断日志、CLI 提示或恢复途径，极大影响 Agent 的记忆连续性。
    *   **诉求**：增加状态诊断日志，并允许运维人员手动重置或恢复该状态。

## 4. Bug 与稳定性
当前项目面临的稳定性挑战集中在崩溃恢复、内存泄漏及多平台特定环境下的异常。以下按严重程度排列，并标注了修复进展：

*   **[P0] 崩溃与状态丢失**
    *   **Gateway 事件循环阻塞**（[#160959](https://github.com/openclaw/openclaw/issues/160959)）：无修复 PR（`clawsweeper:no-new-fix-pr`），需架构级调整。
    *   **崩溃恢复后 SQLite 数据库死锁**（[#166634](https://github.com/openclaw/openclaw/issues/166634)）：无修复 PR，当前不可复现于 main 分支但影响稳定版用户。
*   **[P1] 内存泄漏与工具调用失败**
    *   **Gateway RSS 内存每小时增长约 0.1 GiB**（[#182369](https://github.com/openclaw/openclaw/issues/182369)）：在 2026.9.8 和 2026.10.6 版本中复现，内部监控机制失效，未出修复 PR。
    *   **Native Codex 子进程工具调用无执行器**（[#150822](https://github.com/openclaw/openclaw/issues/150822)）：子进程声明了工具但无法执行且交付失败，涉及安全审查，未出修复 PR。
    *   **Doctor 诊断工具无响应/挂起**（[#178359](https://github.com/openclaw/openclaw/issues/178359), [#187900](https://github.com/openclaw/openclaw/issues/187900)）：在执行 15 分钟以上的无输出等待，甚至完全无法到达数据库修复阶段，未出修复 PR。
*   **[P2] 特定渠道与端点故障**
    *   **Telegram 子 Agent 结果通知过期与重试阻塞**（[#158154](https://github.com/openclaw/openclaw/issues/158154)）：30分钟过期且重试时阻塞主题通道数小时。
    *   **模型回退提示泄露到外部渠道**（[#92473](https://github.com/openclaw/openclaw/issues/92473)）：内部路由信息可能泄露给用户。
*   **[UX/摩擦] 界面与配置错误**
    *   **PDF 工具不支持无视觉模型的扫描 PDF**（[#143375](https://github.com/openclaw/openclaw/issues/143375)）：在纯扫描（无文本层）PDF 且未配置视觉模型时，工具完全不可用。

## 5. 功能请求与路线图信号
基于用户需求和已开启的 PR，可以推断下一版本的重点功能规划：

*   **多渠道交互式 UI（高度相关）**
    有 PR 正在开发 Telegram 渠道及 Control UI 的交互式提问按钮功能，允许 Agent 在多问题/多选场景下提供更丰富的交互结构，而不仅是纯文本。 [#184859](https://github.com/openclaw/openclaw/pull/184859)
*   **审计与日志可观测性（高价值需求）**
    用户迫切需要一个功能来记录 Agent 实际读取或调用的 skill 使用情况的持久审计日志，以便运维人员分析。该功能已有对应的 XL 级别 PR 正在推进中。 [#141004](https://github.com/openclaw/openclaw/pull/141004)
*   **Secret 管理扩展（安全增强）**
    允许在 `mcp.servers[].env` 和 `headers` 中直接引用 `SecretRef` 对象（当前仅允许 `string|number|boolean`），以遵循最佳安全实践。 [#76493](https://github.com/openclaw/openclaw/issues/76493)
*   **UI 进度标签增强**
    在语音描述（narration）不可用时，使用模型最新的内部思考/进度说明（latest commentary）来替代静态的“Working”标签。 [#132781](https://github.com/openclaw/openclaw/issues/132781)
*   **工作面板事件系统缺失**
    内部 Hook 总线目前完全不支持 Workboard 卡片状态变更事件，这限制了用户自定义自动化工作流的能力。 [#116360](https://github.com/openclaw/openclaw/issues/116360)

## 6. 用户反馈摘要
*   **痛点 1：升级带来的破坏性 Bug 缺乏平滑度过渡**：部分用户反映从 2026.9.4 升级到 2026.10.5 时遭遇了严重的共享状态损坏（#177656）和插件捕获死锁（#160959），导致生产环境 Gateway 彻底不可用。
*   **痛点 2：黑盒操作缺乏诊断手段**：对于诸如记忆树静默丢弃（#153426）或敏感信息脱敏导致的 Agent 无法自我纠错（#130209）等问题，系统不提供任何日志或 CLI 途径，让开发者感到极其无奈。
*   **痛点 3：诊断工具自身可靠性差**：运维人员在处理 Gateway 异常时依赖 `doctor` 工具，但该工具在大型状态库上经常挂起、耗时 400+ 秒，甚至死锁无输出（#178359, #187900），成为排障的瓶颈。
*   **用户场景**：大量用户将其 Gateway 部署在 macOS (Apple Silicon) 和 Linux 上，且深度使用 Discord、Telegram、WhatsApp 以及 Web UI 作为日常交互接口。

## 7. 待处理积压
以下高优 Issues 存在时间较长，且缺乏修复 PR 的推动，建议维护团队重点关注：
*   **[P0] 记忆文件静默丢弃机制**：[#153426](https://github.com/openclaw/openclaw/issues/153426) - 2026-09-20 创建，涉及核心 Agent 行为与安全性，需产品决策和安全审查。
*   **[P1] WhatsApp 自动回复交接失败**：[#161976](https://github.com/openclaw/openclaw/issues/161976) - 2026-09-30 创建，属于严重的消息通道不可靠问题，标记有 `clawsweeper:no-new-fix-pr`，可能面临架构重构。
*   **[P2] 出站队列死信永久留存**：[#112313](https://github.com/openclaw/openclaw/issues/112313) - 2026-07-21 创建。标记为 failed 的队列条目永远无法被读取、重试或清理，`openclaw health` 永久将其计入，需要引入 TTL 或强制清理策略。
*   **[P2] 大状态库 Doctor 响应缓慢**：[#166526](https://github.com/openclaw/openclaw/issues/166526) - 幂等 doctor 诊断耗时 473 秒，远超 60 秒的限制，严重影响具有数百个会话的大规模部署。

---

## 横向生态对比

1. **生态全景**
个人 AI 助手与自主智能体开源生态正从早期的功能探索期向**企业级工程化**与**安全合规**的关键转折期迈进。
当前市场呈现“高频迭代修复底层稳定性”与“深入垂直领域（边缘设备、本地部署、多模态交互）”并行的态势。
核心竞争壁垒正从单纯接入 LLM 模型，转向**状态管理可靠性、跨渠道交互一致性、以及安全沙箱的纵深防御**。

2. **各项目活跃度对比**
基于 2026-11-01 数据汇总：

| 项目名称 | Issues | PR | 48h Releases | 健康度评估 |
| :--- | :---: | :---: | :---: | :--- |
| **OpenClaw** | 497 | 500 | 无 | **高压力/修复期**：高频更新但底层（Gateway）存在稳定性回归 |
| **hermes-agent** | ~400 | ~400* | 无 | **高压重构修补期**：统一架构后的状态管理与并发瓶颈显现 |
| **DeepSeek Harness** | 185 | 0 | 无 | **社区支持/停滞期**：代码迭代暂停，依赖社区排查严重环境 Bug |
| **AstrBot** | 15 | 29 | v4.29.4 | **高度健康**：维护者响应极快，核心架构修复迅速合并 |
| **Zeroclaw** | 23 | 50 | 无 | **高强度安全审计**：冲刺 v0.9.0，大量 S1 级安全漏洞集中爆发 |
| **QwenPaw** | 9 | 14 | 无 | **中高活跃**：针对 Beta 版在受限部署环境的快速迭代 |
| **PicoClaw** | 1 | 6 | 无 | **低活跃/维护模式**：主要进行技术债务清理，自动化标记停滞 |

*注：hermes-agent 原始数据为 800 条总活动，结合 336 个待合并 PR 估算得出分项数据。*

3. **OpenClaw 在生态中的定位**
*   **优势**：拥有开源生态中**最大的并发吞吐量与多模态接入能力**（Slack/WhatsApp/Discord 等多渠道原生支持），其 Gateway 架构在功能广度上处于绝对领先地位。
*   **技术路线差异**：相比 Zeroclaw 强调 Rust 级别的强类型安全，或 PicoClaw 偏向边缘端轻量运行，OpenClaw 选择了极致的**功能扩展性**路线（如复杂的 UI 交互与多智能体记忆树），这使其代码库体积庞大且底层状态管理的复杂度极高。
*   **社区规模对比**：OpenClaw 的日活 Issue/PR 量（约 1000 条）远超同类项目，其社区不仅是开发者，更包含大量部署在生产环境的终端用户，反馈直接导致了对崩溃循环等 P0 级 Bug 的紧急修复。

4. **共同关注的技术方向**
*   **安全沙箱与权限控制**：Zeroclaw（10+ 安全漏洞爆发）和 Hermes-agent（明文凭证泄漏至磁盘）共同暴露了多智能体执行环境中的横向移动风险。开发者开始将沙箱边界作为版本发布（Release Gate）的一票否决项。
*   **多智能体通信（A2A/Peer）可靠性**：Zeroclaw 和 Hermes 均报告了跨节点/智能体通信时的上下文丢失与消息时序错乱问题（如 Zeroclaw 的 WhatsApp 补发延迟、Hermes 的多路由粘滞）。
*   **流式体验（SSE）的代理兼容性**：QwenPaw 在 Nginx 下遭遇缓冲问题，AstrBot 重点优化了跨平台消息按钮的交互。解决长连接在复杂企业网络（反向代理）下的即时性问题已成为刚需。

5. **差异化定位分析**
*   **功能侧重**：
    *   **OpenClaw**：全能型中台，支持复杂记忆树与多渠道交互，适合重度使用者。
    *   **Zeroclaw**：注重安全与 CLI 极简部署，主打本地企业级安全。
    *   **PicoClaw**：边缘设备（OpenWrt 等）专属，追求极低资源消耗。
    *   **DeepSeek Harness**：深度绑定 DeepSeek 生态，主打本地桌面端操作（Computer-Use）。
*   **目标用户**：
    *   **OpenClaw / Hermes**：面向需要高度定制化 Agent 行为与分布式调度的技术极客。
    *   **AstrBot / QwenPaw**：面向追求部署便捷性与 UI 操作体验的企业运维人员。
*   **技术架构**：OpenClaw 和 Hermes 正在向“统一网关架构”靠拢，试图将所有协议收归单一进程；而 Zeroclaw 正在经历 Gateway 拆分，以实现更细粒度的权限隔离。

6. **社区热度与成熟度**
*   **第一梯队（快速迭代与重构）**：**OpenClaw** 和 **hermes-agent**。这两者处于“功能已超前但架构未跟上”的矛盾期，面临大规模的存量稳定性回归修复。
*   **第二梯队（质量巩固）**：**Zeroclaw** 和 **AstrBot**。Zeroclaw 正在通过密集的安全审计加固 `v0.9.0`；AstrBot 处于极健康的日常修复周期。
*   **第三梯队（边缘支持/过渡期）**：**DeepSeek Harness**（代码冻结，依赖 Discussions 解决环境问题）与 **PicoClaw**（处于低活跃维护阶段，等待边缘场景需求爆发）。

7. **值得关注的趋势信号**
*   **“可观测性”成为排障刚需**：OpenClaw（Doctor 工具挂起）和 Hermes（无声死锁）的用户反馈显示，当 Agent 行为出错时，黑盒状态导致运维崩溃。行业趋势将强制要求 Agent 在失败时提供显式的诊断信息或 CLI 恢复路径。
*   **桌面端与 Web 端体验的割裂**：DeepSeek Harness 暴露了桌面端（Electron）在 Cookie 堆积、Host 进程生命周期管理上的技术债务，提示开发者在跨端开发时需将 Web 端的生命周期假设与原生端做严格解耦。
*   **Agent 向“实时陪伴”演进**：Hermes 社区对“移动端语音通话”的高呼声表明，AI 助手正从异步对话工具向低延迟、多模态交互的实时终端演进，这对网络传输（SSE）和模型推理速度提出了极高要求。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 (2026-11-01)

## 1. 今日速览
今日 Zeroclaw 项目保持高度活跃，过去 24 小时内共处理 73 条更新，其中 50 条 PR（47 条待合并）和 23 条 Issues（20 条新开/活跃）。核心开发焦点集中在 **v0.9.0 版本的安全加固** 与 **网关（Gateway）架构重构**，社区对身份访问控制、沙箱策略及 CLI 最小化构建的需求正在快速落地。尽管未发布新 Release，但 10 月 31 日集中爆发的大量安全漏洞报告与即时修复 PR 表明，团队正致力于在 2.0 版本前彻底解决安全基线问题，项目处于高强度迭代与安全审计阶段。

## 2. 版本发布
今日无新版本发布。但根据 PR 标签及 Issue 关联信息，项目正全力冲刺 **v0.9.0** 版本。该版本重点包含 Gateway 独立化、OIDC 集成及 CLI 最小化构建等功能。

## 3. 项目进展
今日合并/关闭的 PR 主要集中在依赖安全修复与特定功能验证，为 v0.9.0 的稳定性打下基础：

*   **安全依赖修复**：关闭了 [#12128](https://github.com/zeroclaw-labs/zeroclaw/issues/12128)（Wasmtime 48.0.7 安全漏洞导致 CI 失败），并合并了 PR [#12129](https://github.com/zeroclaw-labs/zeroclaw/pull/12129) 将 Wasmtime 升级至 48.0.8，修复了 5 个 RustSec 高危警报，恢复了 CI 流程。
*   **CLI 构建优化**：关闭了 PR [#12111](https://github.com/zeroclaw-labs/zeroclaw/pull/12111)，实现了 CLI-only 构建的安装支持，并明确了如何从标准构建切换回 CLI-only 构建，呼应了 Issue [#11971](https://github.com/zeroclaw-labs/zeroclaw/issues/11971) 的需求。
*   **依赖更新**：合并了 PR [#12102](https://github.com/zeroclaw-labs/zeroclaw/pull/12102) 并开启了 [#12171](https://github.com/zeroclaw-labs/zeroclaw/pull/12171)，批量更新 35+ 个 Rust 依赖包，保持代码库现代化。

## 4. 社区热点
今日讨论热度最高的项目集中在 v0.9.0 的核心架构变更与安全权限模型：

*   **OIDC 仪表盘登录**：PR [#11965](https://github.com/zeroclaw-labs/zeroclaw/pull/11965) 处于 OPEN 状态且更新频繁。该 PR 旨在解决此前所有配对浏览器均为“共享操作员”的问题，通过引入配置化的 OIDC 提供者实现精细化的身份验证。
*   **SOP RPC 同步**：PR [#11169](https://github.com/zeroclaw-labs/zeroclaw/pull/11169) 持续推进中，旨在补齐 Gateway 拆分后缺失的 RPC 方法（如 `sops/decide`），确保 Gateway 移出进程后功能完整。
*   **授权策略修复**：PR [#11313](https://github.com/zeroclaw-labs/zeroclaw/pull/11313) 受到关注，解决了 `config set` 修改授权策略后，运行中的守护进程未实时生效的问题，强化了配置的热更新能力。

## 5. Bug 与稳定性
今日报告了大量高严重性（S1/S2）Bug，主要集中在安全沙箱、插件管理及多智能体通信层面。多数 Bug 已在 10 月 31 日由多位贡献者提交了修复 PR：

*   **S1 - 身份与访问安全**：
    *   **OIDC 登录 CSRF 漏洞**：Issue [#12050](https://github.com/zeroclaw-labs/zeroclaw/issues/12050) 指出回调页面缺乏浏览器绑定，允许攻击者诱导受害者完成登录。
    *   **本地管理员路由信任问题**：Issue [#12141](https://github.com/zeroclaw-labs/zeroclaw/issues/12141) 揭示 `/admin/shutdown` 等路由仅信任 loopback peer，导致本地脚本可绕过审批门禁甚至停止守护进程。
    *   **Zsh 环境变量注入**：Issue [#12138](https://github.com/zeroclaw-labs/zeroclaw/issues/12138) 指出原生运行时执行 `zsh -c` 时会 source `~/.zshenv`，若工作区可写则构成持久化执行钩子，绕过命令允许列表。
*   **S1 - 配置与密钥泄露**：
    *   **守护进程配置未禁止读取**：Issue [#12142](https://github.com/zeroclaw-labs/zeroclaw/issues/12142) 表明在 `full` 权限下，Agent 可读取 `config.toml`、`gateway-admin.token` 及 OTP 密钥。
    *   **MCP 环境变量继承**：Issue [#12143](https://github.com/zeroclaw-labs/zeroclaw/issues/12143) 指出 MCP stdio 服务器继承了守护进程的全套环境变量（包括 API 密钥），构成凭证泄露风险。
*   **S2 - 功能缺陷**：
    *   **审计日志权限与链完整性**：Issue [#12147](https://github.com/zeroclaw-labs/zeroclaw/issues/12147) 发现审计日志创建在 0755 目录下且 `agent_alias` 未在哈希链中，存在本地用户读取及重放攻击风险。
    *   **MCP SSE 端点重定向**：Issue [#12146](https://github.com/zeroclaw-labs/zeroclaw/issues/12146) 指出客户端接受绝对 URL，可能被恶意重定向至攻击者服务器。
    *   **Peer 消息工具作用域缺失**：Issue [#12169](https://github.com/zeroclaw-labs/zeroclaw/issues/12169) 和 [#12167](https://github.com/zeroclaw-labs/zeroclaw/issues/12167) 发现 `send_message_to_peer` 未继承任务局部作用域且忽略发送者自治级别，相关修复 PR 为 [#12170](https://github.com/zeroclaw-labs/zeroclaw/pull/12170) 和 [#12168](https://github.com/zeroclaw-labs/zeroclaw/pull/12168)。
*   **S3 - 体验问题**：
    *   **安装脚本缺陷**：多个 Issue（[#12154](https://github.com/zeroclaw-labs/zeroclaw/issues/12154)、[#12153](https://github.com/zeroclaw-labs/zeroclaw/issues/12153)、[#12156](https://github.com/zeroclaw-labs/zeroclaw/issues/12156)）反馈 `install.sh` 和 `zeroclaw update` 在 musl/glibc 识别、版本号显示及更新逻辑上的问题，相关修复见 PR [#12159](https://github.com/zeroclaw-labs/zeroclaw/pull/12159) 和 [#12166](https://github.com/zeroclaw-labs/zeroclaw/pull/12166)。

## 6. 功能请求与路线图信号
*   **RAG 知识语料库**：Issue [#11235](https://github.com/zeroclaw-labs/zeroclaw/issues/11235) 提出了支持从操作员文档、OS 参考及安全标准中检索信息（RAG）的 RFC。结合今日大量安全类 Bug 的爆发，该功能在提升 Agent 遵循本地安全策略能力方面具有前瞻性，预计将成为下一重要版本的核心架构能力。
*   **会话恢复功能**：PR [#12071](https://github.com/zeroclaw-labs/zeroclaw/pull/12071) 为 ZeroCode 增加了 `/load-session` 命令，提升了交互连续性。
*   **外部 Peer 错误处理**：PR [#12116](https://github.com/zeroclaw-labs/zeroclaw/pull/12116) 针对 Discord 外部 Peer 的消息发送失败提供了更具操作性的错误提示，完善了多智能体通信的边界处理。

## 7. 用户反馈摘要
*   **痛点**：用户极度关注 **本地安全性**。今日 10 月 31 日爆发的 10+ 个安全 Bug 报告（如 Issue [#12158](https://github.com/zeroclaw-labs/zeroclaw/issues/12158) 提到的未修补漏洞，以及 #12138, #12141, #12142 等）表明，用户不仅在自身 fork 中发现了高危漏洞，甚至开始使用专业扫描工具（如 ChatGPT 安全审查）来测试上游代码。对 `zsh` 环境持久化、审计日志篡改及本地回环攻击的担忧非常具体。
*   **场景**：部分用户（如 @JordanTheJet）强烈诉求精简部署，希望在没有 Gateway 和 Dashboard 的服务器/最小化环境中运行纯 CLI 版本（Issue [#11971](https://github.com/zeroclaw-labs/zeroclaw/issues/11971)）。
*   **满意度**：社区对 CLI 安装体验的负反馈较多（Issue #12153, #12154, #12155, #12156），认为安装脚本在系统架构识别和版本信息展示上存在误导或错误。

## 8. 待处理积压
*   **多智能体通信（A2A/Peer）**：相关 Bug（#12167, #12169, #12116）和 PR（#12168, #12170, #12116）密集出现在 10 月 31 日。这表明多智能体协作底层机制正在经历重大重构或漏洞修复，需要维护者集中进行代码审查，防止引入新的权限逃逸。
*   **安全沙箱与策略**：今日提交的大量 S1 级别安全 Bug（#12138, #12141, #12142, #12143, #12139, #12145）严重威胁了 `full` 权限模式的安全基线。建议维护者在处理这些修复时，将 `security/sandbox` 模块作为 v0.9.0 的 Release Gate 重点验证对象，确保修复未破坏现有的 macOS Seatbelt 或 Linux 沙箱行为。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期**: 2026-11-01
**数据范围**: 过去 24 小时 (截至 2026-10-31)

## 1. 今日速览
过去 24 小时内，PicoClaw 项目整体活跃度较低，无新版本发布。尽管 Issues 和 PR 的更新记录显示有 7 条动态（1 条 Issue，6 条 PR），但深入分析发现，所有更新均带有 `[stale]` 标签且更新于 10 月 31 日，推测为自动化机器人标记僵尸线程，而非人工活跃开发。项目当前处于维护模式，重点在于清理历史遗留技术债务和修复已知通信协议 bug。

## 2. 版本发布
无。过去 24 小时内没有新的 Release 发布。

## 3. 项目进展
今日合并或关闭的 PR 主要涉及底层逻辑修复和文档优化，虽无功能新增，但提升了系统健壮性：
*   **通信协议修复**: 合并了 [#3443](https://github.com/sipeed/picoclaw/pull/3443)，修复了 Telegram MarkdownV2 模式下因转义字符缺失导致链接和引用格式失效的问题，确保了消息传递的完整性。
*   **Cron 任务状态准确性**: 合并了 [#3442](https://github.com/sipeed/picoclaw/pull/3442)，解决了 Cron 任务失败时状态仍被记录为 `ok` 的 Bug，提升了监控的可信度。
*   **文档规范化**: 关闭了 [#1182](https://github.com/sipeed/picoclaw/pull/1182)，优化了 `AGENTS.md` 使其更符合 AI 代理协作原则，明确了 Go 版本以 `go.mod` 为准。

## 4. 社区热点
由于今日无高评论量的人工讨论，热点主要集中在即将过期（Stale）的长期未决问题上：
*   **[#3439](https://github.com/sipeed/picoclaw/issues/3439)**: 关于 `picoclaw-launcher` 在 OpenWrt 环境下的网络绑定问题。虽然当前标记为 Stale，但该 Issue 涉及 IPv4/IPv6 双栈绑定冲突，是边缘设备部署的核心痛点。
*   **[#3431](https://github.com/sipeed/picoclaw/pull/3431)**: 开发者 @henrikdukefoss 提交的新增 "Standard Compute" 提供商支持的 PR。这是当前唯一处于 `OPEN` 状态且未标记为 Stale 的 PR，代表了社区对多模型聚合网关的集成需求。

## 5. Bug 与稳定性
*   **[高] 网络绑定崩溃 (Open/Stale)**: [#3439](https://github.com/sipeed/picoclaw/issues/3439) 报告了 `picoclaw-launcher` v0.5.0 在同时设置 `-public` 和 `-host` 时的 Crash loop，以及 `-public` 单独使用时仅绑定 IPv6 导致 IPv4 客户端无法连接的问题。
    *   **状态**: 无直接 Fix PR 关联，Issue 已被标记为 Stale，存在复发风险。
*   **[中] 定时任务状态误报 (Fixed)**: [#3442](https://github.com/sipeed/picoclaw/pull/3442) 修复了 `cron/jobs.json` 中 `lastStatus` 总是返回 `ok` 的问题。该 Bug 已随 PR 合并解决。
*   **[中] Telegram 消息格式丢失 (Fixed)**: [#3443](https://github.com/sipeed/picoclaw/pull/3443) 修复了 MarkdownV2 转换器的转义缺陷。该 Bug 已随 PR 合并解决。

## 6. 功能请求与路线图信号
*   **第三方 LLM 提供商集成**: 用户正在积极寻求支持更多 OpenAI 兼容的网关。PR [#3431](https://github.com/sipeed/picoclaw/pull/3431) 请求添加 Standard Compute 支持，参照了之前 NEAR AI Cloud (#2917) 的集成模式。这表明 PicoClaw 正致力于成为通用的多模型推理前端，下一版本可能会重点优化 Provider 插拔机制。
*   **自动化运维增强**: 通过修复 Cron 状态反馈，项目正在增强其作为长期运行服务（Daemon）的可靠性，暗示路线图可能包含更多的健康检查接口。

## 7. 用户反馈摘要
*   **边缘部署痛点**: 用户 @Seng-Jik 在 [#3439](https://github.com/sipeed/picoclaw/issues/3439) 中详细描述了在 OpenWrt (GL-BE6500) 上通过 procd 服务常驻 PicoClaw 的场景。反馈指出网络配置参数的直觉性不足（Public vs Host 冲突），导致实际部署困难。
*   **沟通体验**: 用户对 Telegram Bot 的消息格式化体验有较高要求，[#3443](https://github.com/sipeed/picoclaw/pull/3443) 的合并直接回应了“消息退化为纯文本”的负面反馈。

## 8. 待处理积压
*   **高优先级技术债务**: 多个旧的 Fix PR (#1558, #1545) 虽然被标记为关闭/Stale，但需确认其中的修复是否已正确回合并主分支。如果这些 PR 包含未合并的 Bug 修复，可能存在代码回退风险。
*   **僵尸线程清理**: 当前大量标记为 `[stale]` 的 Issue/PR 表明维护者正在进行大规模清理。建议维护者优先审查 [#3439](https://github.com/sipeed/picoclaw/issues/3439)（网络 Bug）和 [#3431](https://github.com/sipeed/picoclaw/pull/3431)（新提供商），以决定是否重新激活或彻底归档。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 (2026-11-01)

### 1. 今日速览
过去24小时，QwenPaw 项目保持活跃开发状态，新增 9 条 Issue 并更新 14 条 PR，其中大部分 PR 处于“待合并”状态，表明贡献者正在积极投入解决近期发现的缺陷。**活跃度评估：中高。** 重点关注集中在**代理部署（Nginx）下的 SSE 缓冲区问题**、**受限环境启动崩溃**以及**多模态媒体大小限制**等核心稳定性问题上。虽然无新版本发布，但大量针对 `v2.2.2` 和 `v2.3.0-beta` 的修复正在快速迭代中。

### 2. 版本发布
**今日无新版本发布。**
*注：虽然未发布稳定版，但 Issue #8515 和 #8511 中提及了 `v2.3.0-beta` 系列在特定环境下的行为，表明 Beta 通道仍在测试推进中。*

### 3. 项目进展
今日主要进展体现在**合并与关闭**的 PR 以及**即将合并**的关键修复上。
*   **已合并/关闭 (1 条):**
    *   [#8338](https://github.com/agentscope-ai/QwenPaw/pull/8338) `fix(channels): carry Telegram quoted reply context into the agent`：修复了 Telegram 适配器丢失引用消息上下文的问题，提升了多轮对话的上下文完整性。此 PR 已关闭/合并。
*   **核心待合并 PR (13 条):**
    *   大量 PR 集中在**代理缓冲**、**媒体限制**、**Docker 权限**及**安全合规**领域，显示团队正在系统性解决企业级部署的痛点。

### 4. 社区热点
*   **[#8424](https://github.com/agentscope-ai/QwenPaw/issues/8424) MCP 协议兼容性 Bug** (评论: 4)
    *   **链接**: [Issues #8424](https://github.com/agentscope-ai/QwenPaw/issues/8424)
    *   **热点分析**: 用户 @ahxoeh 指出 `server/discover` 返回 404 导致旧版 MCP 服务器无法回退至 legacy 握手。这是集成旧系统时的常见痛点，目前已有较多讨论，表明该协议兼容性是社区关注焦点。
*   **[#8516](https://github.com/agentscope-ai/QwenPaw/issues/8516) Nginx SSE 缓冲问题** (评论: 1)
    *   **链接**: [Issues #8516](https://github.com/agentscope-ai/QwenPaw/issues/8516)
    *   **热点分析**: 这是今日最典型的部署问题。由于 QwenPaw 在部分 SSE 端点缺失 `X-Accel-Buffering: no` 头，导致在 Nginx 反向代理下首事件被缓冲。社区迅速响应，已有对应 Fix PR [#8522](https://github.com/agentscope-ai/QwenPaw/pull/8522) 提交。
*   **[#8184](https://github.com/agentscope-ai/QwenPaw/issues/8184) Doom-loop 误杀** (评论: 3)
    *   **链接**: [Issues #8184](https://github.com/agentscope-ai/QwenPaw/issues/8184)
    *   **热点分析**: 用户反映长任务轮询被错误判定为“死循环”而终止。这涉及 Agent 稳定性核心的策略调优，讨论热度较高，反映了用户对 Agent 可靠性的更高期待。

### 5. Bug 与稳定性
今日报告的 Bug 主要集中在**部署环境兼容性**和**流式响应**上，按严重程度排列如下：

1.  **🔴 严重：v2.3.0b2 在受限环境启动即崩**
    *   **Issue**: [#8515](https://github.com/agentscope-ai/QwenPaw/issues/8515)
    *   **描述**: 在飞牛 fnOS 沙箱中，`dependency_maintenance` 错误推导 root 目录，导致进程无法启动。
    *   **状态**: 待处理 (P0)。
2.  **🟠 高：Nginx 代理下 SSE 流式中断/延迟**
    *   **Issue**: [#8516](https://github.com/agentscope-ai/QwenPaw/issues/8516)
    *   **Fix PR**: [#8522](https://github.com/agentscope-ai/QwenPaw/pull/8522) (已提交，待合并)
    *   **描述**: 缺少响应头导致缓冲区行为，影响控制台聊天体验。
3.  **🟠 高：Docker 非 Root 启动权限失败**
    *   **Issue**: [#8517](https://github.com/agentscope-ai/QwenPaw/issues/8517)
    *   **Fix PR**: [#8519](https://github.com/agentscope-ai/QwenPaw/pull/8519) (已提交，待合并)
    *   **描述**: `working/config.json` 权限导致非 Root 用户重启容器失败。
4.  **🟡 中：Feishu 渠道代理/并发 Bug**
    *   **Issue**: [#8315](https://github.com/agentscope-ai/QwenPaw/issues/8315) & [#8511](https://github.com/agentscope-ai/QwenPaw/issues/8511)
    *   **描述**: 代理环境变量缺失导致连接失败；并发消息导致 `No active model configured` 错误。
5.  **🟡 中：UI 交互与性能**
    *   **Issue**: [#8521](https://github.com/agentscope-ai/QwenPaw/issues/8521)
    *   **描述**: 复制功能不稳定，且新 UI 响应迟钝，旧版 UI 仍受部分用户青睐。

### 6. 功能请求与路线图信号
*   **SSE 延迟监控 ([#8518](https://github.com/agentscope-ai/QwenPaw/issues/8518))**: 用户希望在 Console 聊天 UI 中显示每次回复的耗时。由于缺乏内建计时功能，这反映出用户对**性能可视化**的强烈需求。*预测：可能在 v2.4 中加入统计面板。*
*   **自定义网关 Prompt Cache ([#8061](https://github.com/agentscope-ai/QwenPaw/pull/8061))**: 允许自定义网关声明 OpenAI 缓存参数。这是降低多模态 API 成本的关键功能，已在 PR 阶段，**极有可能在下个版本合入**。
*   **QQ 渠道流式消息 ([#8409](https://github.com/agentscope-ai/QwenPaw/pull/8409))**: 对齐 Feishu 的流式体验。PR 正在开发中，表明**渠道体验均质化**是近期的路线图方向。

### 7. 用户反馈摘要
*   **痛点**: 许多用户（如 [#8521](https://github.com/agentscope-ai/QwenPaw/issues/8521)）抱怨**新版 UI 比旧版“笨拙”**，缺乏旧版的高效视觉布局，且希望提供“切换 UI 风格”的选项。这暗示 v2.x 的 UI 重构可能存在用户体验倒退。
*   **使用场景**: 大量问题集中在**企业/受限环境部署**（Nginx 代理、Docker 权限、fnOS 沙箱、Feishu 代理配置），说明 QwenPaw 正在深入更多 B 端/混合云场景，但这些环境的边缘情况（Edge Cases）较多。
*   **不满**: 模型回复偶发性“只显示思考无内容” [#8521](https://github.com/agentscope-ai/QwenPaw/issues/8521)，用户对**回复的完整性与稳定性**存在不满。

### 8. 待处理积压
*   **[#8034](https://github.com/agentscope-ai/QwenPaw/pull/8034) `fix(providers): bound inline media per request`**
    *   **状态**: 创建于 9/29，标记为 XL 级修复。
    *   **积压风险**: 该 PR 解决了多模态请求因图片过大导致 Gateway 截断的问题，是**关键的稳定性修复**。由于规模大，可能在合并前经历长时间的 Code Review。建议维护者优先处理，避免多模态场景下的大 Payload 持续报错。
*   **[#7211](https://github.com/agentscope-ai/QwenPaw/pull/7211) `fix(runtime): prevent injected context from persisting`**
    *   **状态**: 创建于 8/21，标记为 `ready-for-human-review`。
    *   **积压风险**: 涉及核心 Runtime 上下文管理的修复，已搁置近 3 周。需要架构师介入确认是否引入回归。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：** 2026-11-01
**数据窗口：** 过去24小时 (2026-10-31 至 2026-11-01)

### 1. 今日速览
hermes-agent 社区保持极高的活跃度，过去24小时内涉及 Issues 和 PR 的更新总量接近 800 条，其中待合并 PR 积压达 336 个，开发迭代节奏非常紧凑。今日无新版本发布，社区精力主要集中在修复 10月14日“统一网关 (Unified Gateway)”合并后引发的状态管理与性能回归问题上。稳定性方面，Gateway 层的会话锁竞争、Kanban 任务崩溃以及跨平台（特别是 Linux 桌面端）的渲染/权限 Bug 是当前最紧迫的工程痛点。虽然大量 PR 处于审查中，但针对核心 Bug 的修复提案已进入开发闭环，项目整体处于“高压重构后的修补期”。

### 2. 版本发布
**无新版本发布**（过去 24 小时 0 个 Release）。

### 3. 项目进展
今日重点推进了统一网关架构的深层修复与跨网关通信功能，以下是核心进展：

*   **多网关 Webapp 中继通信 (PR #147291)**
    *   **进展：** 实现了 Webapp 通过签名中继访问其他 Hermes 网关（如桌面端、tailnet 内的轻量 PC）的能力。
    *   **影响：** 打破了单一网关进程的限制，允许在侧边栏的网关分组中切换和管理多个实例，大幅提升了多节点部署场景下的用户体验。
    *   [链接](https://github.com/NousResearch/hermes-agent/pull/147291)
*   **Feishu (飞书) 交互卡片模型选择器 (PR #147040)**
    *   **进展：** 在飞书适配器中实现了类似 Telegram/Discord 的交互式卡片模型选择功能，补齐了 Lark/Feishu 平台的 IM 体验短板。
    *   [链接](https://github.com/NousResearch/hermes-agent/pull/147040)
*   **Profile 生命周期修复整合 (PR #129658)**
    *   **进展：** 将 4 个分散在 `profiles.py` 中的 Bug 修复（涉及删除、导入、安装及别名冲突）整合为一个 PR，解决了同一文件多 PR 修改导致的代码冲突问题。
    *   [链接](https://github.com/NousResearch/hermes-agent/pull/129658)

### 4. 社区热点
*   **Unified Gateway 核心状态回归 (Issue #143547) 🏆**
    *   **状态：** OPEN | 评论: 30 | P2
    *   **链接：** [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/143547)
    *   **分析：** 这是 10月14日将 CLI、TUI、Desktop、API、Cron 等所有本地交互统一到单一 Gateway 进程后产生的核心后遗症。该 Issue 汇集了主分支合并后的各种状态冲突、会话竞争和架构适配问题，是维护者当前的最高优先级焦点。
*   **Linux 桌面端 6% 窗口透明度 Bug (Issue #143426)**
    *   **状态：** CLOSED | 评论: 21 | 👍: 13
    *   **链接：** [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/143426)
    *   **分析：** Ubuntu 26.04 / GNOME 50 用户强烈反馈默认开启了窗口半透明，导致视觉异常且设置中无控制选项。今天已关闭，说明维护团队响应了桌面端前端体验问题。
*   **移动端语音通话应用功能请求 (Issue #11911)**
    *   **状态：** OPEN | 评论: 20 | 👍: 15 | P3
    *   **链接：** [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/11911)
    *   **分析：** 用户极度渴望原生的 iOS/Android App 及免提语音交互。该功能反映了个人 AI 助手向“实时陪伴型 AI”演进的强烈诉求。
*   **支持 Mistral 作为 LLM 供应商 (Issue #20859)**
    *   **状态：** OPEN | 评论: 17 | 👍: 35 | P3
    *   **链接：** [查看 Issue](https://github.com/NousResearch/hermes-agent/issues/20859)
    *   **分析：** 社区呼声最高的模型接入请求。由于 Mistral 语音模型已接入，用户期望 LLM 能力同步落地。

### 5. Bug 与稳定性
按严重程度排列（P1 为阻断性，P2 为高优）：

*   **🔴 [P1] Kanban 节点在 Gateway 宕机时引发连锁崩溃 (Issue #145022)**
    *   **状态：** OPEN | 评论: 13
    *   **描述：** 当 Gateway 进程卡顿且多个 Kanban 节点并发运行保存操作时，节点会退出并报错 "Kanban execution unknown"。
    *   **影响：** 导致进行中的工作丢失，且在高频并发场景下已复现 4 个节点同时崩溃。
    *   [链接](https://github.com/NousResearch/hermes-agent/issues/145022)
*   **🔴 [P2] Gateway 全量重读会话历史导致 CPU 满载与超时 (Issue #146643)**
    *   **状态：** OPEN | 评论: 13
    *   **描述：** 拥有数千个会话的用户，其 Gateway 在收到任何状态变更时会全量扫描历史，导致 1.5-2.5 个 CPU 核心被持续占用，且 Desktop 请求超时（>30s）。
    *   **影响：** 严重影响大型部署系统的可用性。
    *   [链接](https://github.com/NousResearch/hermes-agent/issues/146643)
*   **🔴 [P2] Desktop Dashboard 修改操作持续 409 冲突 (Issue #138915)**
    *   **状态：** OPEN | 评论: 13
    *   **描述：** 在 Gateway 持有 `state.db` 锁时，Web Dashboard 的任何数据库写操作均被拒绝，批量清理或归档功能完全不可用。
    *   **影响：** Windows 11 长期开机部署环境下的核心交互失效。
    *   [链接](https://github.com/NousResearch/hermes-agent/issues/138915)
*   **🟠 [P2] 终端环境快照泄漏明文凭据到磁盘 (Issue #62336)**
    *   **状态：** OPEN | 评论: 15 | 标签: security
    *   **描述：** `terminal` 工具通过 `export -p` 获取环境变量并快照，会将 1Password/Bitwarden 注入的敏感凭据以明文写入本地缓存，带来严重的安全隐患。
    *   **进展：** 暂无针对此安全边界缺陷的 Fix PR。
    *   [链接](https://github.com/NousResearch/hermes-agent/issues/62336)
*   **🟠 [P3] Node.js CLI 被终端生命周期守卫误拦截 (Issue #105758)**
    *   **状态：** OPEN | 评论: 23
    *   **描述：** 9月份引入扫描预算后，良性 Node.js 命令行工具（如 Obsidian 的 CLI）被误判为试图重启 Gateway 的恶意行为而被阻断。
    *   [链接](https://github.com/NousResearch/hermes-agent/issues/105758)

### 6. 功能请求与路线图信号
*   **系统内存压力阈值可配置化 (Issue #90713)**
    *   **现状：** Dashboard 警报与 Kanban 派发守卫依赖硬编码的内存阈值，导致 ZFS 等特定存储环境下的误报。
    *   **信号：** 已有明确的 P2 标签，属于高优基础配置项，预期将在下一版中开放 `config` 变量。
    *   [链接](https://github.com/NousResearch/hermes-agent/issues/90713)
*   **CLI JSON 输出默认开启配置 (PR #147370)**
    *   **现状：** 正在开发允许用户配置默认使用 JSON 输出的开关。
    *   **信号：** 强化了 Hermes 作为 API/自动化引擎的机器可读性，利好 Bot 集成和 Cron 场景下的二次开发。
    *   [链接](https://github.com/NousResearch/hermes-agent/pull/147370)
*   **MiniMax-M3.1 模型支持 (Issue #134659)**
    *   **现状：** 上游 API 已开放新模型，但 Hermes 的模型目录未能同步更新。
    *   **信号：** 预计会由维护者合并模型目录更新（类似 `sweeper` 自动维护机制）。
    *   [链接](https://github.com/NousResearch/hermes-agent/issues/134659)

### 7. 用户反馈摘要
*   **痛点：复杂多任务下的会话隔离失效。** 用户在长生命周期会话中频繁遇到模型路由粘滞（如一直请求 DeepSeek 的 `vision_analyze` [Issue #143288](https://github.com/NousResearch/hermes-agent/issues/143288)）以及压缩后的旧会话被强制拉起（飞书聊天 [Issue #143767](https://github.com/NousResearch/hermes-agent/issues/143767)），说明会话状态机的隔离逻辑在多路由/多 Profile 场景下不够健壮。
*   **满意/进步：跨设备协同体验增强。** PR #147291 引入的 Webapp 远程网关中继功能，极大满足了“一台手机控制家里/办公室多台 Hermes 节点”的智能家居与分布式自动化场景需求。
*   **痛点：本地工具链的静默失败。** 比如 C 语言脚本或 Cron 任务失败时，Hermes 经常“死锁且不报错”（如 [Issue #146428](https://github.com/NousResearch/hermes-agent/issues/146428)），用户难以排查，期望 Gateway 能提供显式的系统级中断通知（目前已有针对此问题的修复 PR [PR #147046](https://github.com/NousResearch/hermes-agent/pull/147046)）。

### 8. 待处理积压
*   **历史遗留的 TUI 退出未清理 Bug (Issue #144486)**
    *   `/quit --delete` 命令在 TUI 中仅退出进程但不删除数据库会话，且从文档宣称支持该功能算起已积压较久（P2 级别）。期待在 Gateway 稳定性修好后清理此类基础指令问题。
    *   [链接](https://github.com/NousResearch/hermes-agent/issues/144486)
*   **Git Worktree 的一次性模式失效 (Issue #67458)**
    *   使用 `-z` (单次 Prompt) 时，`-w` (指定 worktree) 参数被静默忽略，导致代码直接提交在当前分支上。这是一个影响开发工作流（sweeper 自动修复场景）的高频痛点，已挂 `needs-decision` 标签等待维护者裁定。
    *   [链接](https://github.com/NousResearch/hermes-agent/issues/67458)

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报

**日期**：2026-11-01
**数据范围**：过去24小时

## 1. 今日速览
AstrBot 在过去 24 小时内展现出极高的开发活跃度与工程化治理深度。项目共处理了 15 条 Issues 和 29 条 PR，并成功发布了补丁版本 v4.29.4。
核心维护者（如 @Soulter、@JosephTian876 等）在架构底层进行了多项关键重构与 Bug 修复，重点解决了事件循环阻塞、插件生命周期管理及日志归属等影响系统稳定性的核心痛点。社区贡献者积极响应，多项修复 PR 在 24 小时内被创建、审核并推进合并，项目处于极为健康的快速迭代期。

## 2. 版本发布
**v4.29.4 发布** (2026-10-31 推送，11-01 合并)
v4.29.4 是一个侧重于功能扩充与交互体验优化的版本。
*   **新增交互能力**：引入了跨平台消息按钮组件，支持链接跳转、消息发送及插件回调，并新增了交互超时提示机制。
*   **结构化 AI 能力**：新增了独立于聊天模型的 Decision Provider 和 System One 适配器。插件现在可以调用这些组件执行结构化选择、布尔判断和评分任务，提升了插件开发的灵活性。
*   **网络搜索扩展**：正式接入 SerpApi Google News，支持展示新闻来源、作者、时间，并完善了 WebUI 中的引用展示。
*   **UI 交互统一**：统一了会话与用户选择弹窗，支持通过昵称搜索、平台标识过滤、分页及快速复制 ID。

## 3. 项目进展
今日大量高质量的修复与重构 PR 被合并或关闭，显著提升了核心框架的健壮性：
*   **解决全局卡顿**：`#10902` (已合并) 修复了由于控制台日志 (stdout) 受阻导致主事件循环阻塞的严重 Bug，避免了 WebUI 无响应的情况。
*   **提升日志可观测性**：`#10912` (已提交/高优先级) 和 `#10904` (已提交) 致力于解决插件加载失败时日志无法被正确归属到具体插件的问题，极大降低了排查插件兼容问题的难度。
*   **修复定时任务工具调用缺陷**：`#10906` (已提交) 修复了主动任务（Cron）中缺失插件工具集的问题，解决了模型将原始工具调用文本当成普通正文发送的报错现象。
*   **完善生命周期管理**：`#10897` (已提交) 增加了插件卸载时清理 `register_provider_adapter` 的逻辑，解决了插件重载时导致的适配器重复注册报错；`#10855` (已提交) 对 git clone 设置了超时限制并禁用了凭据提示，修复了插件拉取时卡死的隐患。

## 4. 社区热点
今日社区讨论集中在多设备管理、UI 体验及配置易用性上：
*   **[#5195] 多节点/多设备统一控制**：创建于 2026 年 2 月，近期重新活跃，用户期望增加多设备批量接入和统一调度的能力，反映出用户需求正从单点助手向分布式集群管理演进。
*   **[#10593] 语言切换按钮**：用户建议在多语言 README 和插件配置中增加语言切换按钮，该诉求在讨论中获得了较高关注，凸显了国际化 (i18n) 在开发者文档层面的不足。
*   **[#10857] 唤醒词误删指令失效**：用户反馈删除默认的 `/` 唤醒词后导致 `/sid` 等内置指令无法使用。此痛点直指配置项的隐式耦合，官方已考虑在配置页底部增加提示说明。

## 5. Bug 与稳定性
今日报告的 Bug 主要集中在核心底层事件循环与日志系统，维护者响应迅速：
1.  **[高优/已修复] WebUI 无响应**：`#10898` 报告在 Windows 下当 stdout 受阻时，同步日志写会阻塞主事件循环，导致 Dashboard 和 WebChat 彻底死锁。**Fix PR `#10902` 已合并。**
2.  **[高优/开发中] 插件日志筛选失效**：`#10888` 指出插件报错时，日志系统无法将其作为独立插件进行筛选（默认归类到 Core）。**Fix PR `#10912` 与 `#10904` 已提交。**
3.  **[中优/已修复] 飞书 ID 识别受限**：`#10882` 指出飞书访问控制只能用 `open_id`（应用级，重建会失效），导致白名单难用。**Fix PR `#10907` 已提交，支持 `user_id` 和 `union_id`。**
4.  **[中优/已修复] 平台显示名缺失**：`#10911` 报告部分新增平台（如 `weixin_oc`）在 Dashboard 中缺少显示名称映射。**Fix PR `#10911` 已提交。**

## 6. 功能请求与路线图信号
通过 Issue 与 PR 的交叉验证，可预测下一版本（v4.30）的可能方向：
*   **架构级重构**：`#10077` 正在推进将对话记录存储底层迁移至事件日志 (Event Log Backend) 的架构重构。这是核心架构的底层升级，旨在解决历史上下文覆盖和状态机制碎片化的问题。
*   **插件配置嵌套**：`#10889` 与 `#10890` 强烈要求 `template_list` 支持嵌套配置，以适应复杂场景（如同一插件在不同场景下应用不同参数的子配置）。
*   **供应商扩充与优化**：`#7781` 提出新增 Google Vertex AI 模型供应商；`#10899` 反馈模型提供商排序中缺少 OpenAI；`#5636` 与 `#8150` 持续暴露了国产开源及 Gemini 系列 Embedding 模型的兼容性 Bug，预计下一版将包含 Embedding 服务适配的专项修复。

## 7. 用户反馈摘要
*   **痛点**：用户对系统底层阻塞（如 stdout 写满导致 UI 假死）容忍度极低；配置界面的隐式关联（如删唤醒词导致指令失效）容易造成配置灾难；多语言环境下的切换体验仍待完善。
*   **使用场景**：企业/深度用户开始使用 AstrBot 进行群聊维度的定时任务管理（`#10782`），并迫切希望能通过后台界面管理甚至拦截其他成员的自动化任务。
*   **满意项**：v4.29.4 引入的“跨平台消息按钮”被社区积极讨论，认为该功能将显著改变目前纯文本交互的机器人使用习惯，大幅提升业务交互的视觉表现力。

## 8. 待处理积压
虽然日常修复响应极快，但仍有部分深层架构与长期遗留的 Issue 需要维护者关注：
*   `#5195` 多节点统一控制（开放中）
*   `#10899` 提供商排序 UI 异常（开放中，需结合 UI 走查）
*   `#8150` 与 `#5636` Embedding 模型兼容性问题（已拖延数月，需制定统一修复策略，建议排查 Embedding Provider 的统一抽象层）。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报 (2026-11-01)

### 1. 今日速览
*   **活跃度评估**：**高活跃 / 问题集中爆发期**。过去 24 小时内新增及更新 **185** 条 Discussions，尽管没有代码 Release 落地，但社区讨论量激增，主要集中在 Windows 平台稳定性与桌面端（Desktop）核心痛点上。
*   **核心焦点**：今日社区情绪主要受 Windows 沙箱机制缺陷（`0xC0000142` 崩溃）及桌面端 Cookie 堆积导致的启动失败驱动。两个高频 Bug 成为讨论的绝对热点。
*   **版本状态**：当前无新版本发布。项目进展停滞，主要精力投入到现有架构的 Bug 修复与社区文档（Changelog 合并摘要）维护中。
*   **风险预警**：桌面端（Electron）的稳定性问题（Host 进程退出失败、认证 Cookie 溢出）严重影响用户体验，亟需维护者介入修复。

### 2. 版本发布
**无新版本发布**。
*注：本次日报无 Releases 更新，因此无新功能上线或破坏性变更说明。项目处于版本迭代间歇期或修复期。*

### 3. 项目进展
鉴于未发布新版本且无 PR 合并记录，**项目代码层面今日无实质性推进**。
当前的项目重心完全转向了**故障排查**与**社区支持**。由于该项目未启用 Issues/PR，所有技术讨论、Bug 反馈及功能建议均收敛于 GitHub Discussions。虽然缺乏代码变更，但社区在 Discussions 中产出的高价值信息（如根因分析、最小修复补丁建议）成为了项目后续迭代的隐性输入。

### 4. 社区热点
今日讨论热度最高的主题集中在 Windows 环境适配与 Desktop 端体验优化：

*   **Windows 沙箱启动崩溃（P0 热点）**：
    *   关于沙箱内 `pwsh` 在特定宿主环境下启动即崩的问题，讨论热度极高。用户报告在桌面端启动路径下，shell 能力完全失效。
    *   链接：[#810](https://github.com/deepseek-ai/deepseek-harness/discussions/810) (16 评论), [#8420](https://github.com/deepseek-ai/deepseek-harness/discussions/8420) (5 评论)
    *   *诉求分析*：这是目前最阻塞 Windows 核心功能的问题，用户强烈要求修复沙箱初始化逻辑。

*   **原生 Computer-Use 工具不可用**：
    *   用户发现 `cua_driver_native__*` 系列工具虽然已注册，但未能正确暴露给 Agent，导致自动化功能失效。
    *   链接：[#11207](https://github.com/deepseek-ai/deepseek-harness/discussions/11207) (15 评论)
    *   *诉求分析*：对核心自动化功能（GUI 操控）可用性的质疑。

*   **桌面端 Cookie 堆积导致启动失败**：
    *   随着桌面版使用频率增加，本地认证 Cookie 随端口变更不断堆积，最终撑爆 Node 请求头限制，导致应用无法启动。
    *   链接：[#11095](https://github.com/deepseek-ai/deepseek-harness/discussions/11095), [#11408](https://github.com/deepseek-ai/deepseek-harness/discussions/11408)
    *   *诉求分析*：针对桌面端生命周期的技术债务清理，已有用户贡献了最小修复补丁。

### 5. Bug 与稳定性
今日报告的 Bug 主要集中在 **Windows 平台** 和 **桌面端 (Electron)**，严重程度较高：

| 优先级 | 问题描述 | 影响范围 | 状态 | 链接 |
| :--- | :--- | :--- | :--- | :--- |
| **P0** | **Windows 沙箱崩溃**：无控制台宿主下，沙箱内 pwsh 死于 `0xC0000142`，Shell 能力失效。 | Windows 桌面端 | Open | [#810](https://github.com/deepseek-ai/deepseek-harness/discussions/810) |
| **P0** | **桌面端 Cookie 溢出**：`dsh-auth-*` Cookie 随端口名累积，超过 `maxHeaderSize` 导致启动崩溃。 | Windows/Mac 桌面 | Open | [#11095](https://github.com/deepseek-ai/deepseek-harness/discussions/11095) |
| **P1** | **Host 进程无法退出**：更新或特定操作后，Koffi 库导致 Event Loop 未释放，Host 卡死。 | 桌面端更新 | Open | [#9963](https://github.com/deepseek-ai/deepseek-harness/discussions/9963) |
| **P1** | **权限配置错误**：Workspace 写入沙箱因 DACL 缺少 `WRITE_OWNER` 报错。 | Windows 沙箱 | Open | [#7504](https://github.com/deepseek-ai/deepseek-harness/discussions/7504) |
| **P2** | **内存溢出**：长会话下 In-memory session log 无界增长，导致 Web 进程 OOM。 | Web/长期运行 | Open | [#4722](https://github.com/deepseek-ai/deepseek-harness/discussions/4722) |
| **P2** | **会话迁移失败**：v0 格式会话无法迁移至 v1，导致历史会话无法加载。 | Web UI 升级 | Open | [#5818](https://github.com/deepseek-ai/deepseek-harness/discussions/5818) |

*注：上述 Bug 均位于 Discussions，目前暂无公开的“已修复”标记，其中 Cookie 溢出问题已有社区提供的修复建议。*

### 6. 功能请求与路线图信号
用户通过 Discussions 提出了多项功能增强建议，反映出对 **多语言支持** 和 **细粒度控制** 的需求：

*   **多语言本地化 (i18n)**：用户提议增加俄语 (ru) 支持，目前 Web UI 仅支持中/英。
    *   链接：[#4172](https://github.com/deepseek-ai/deepseek-harness/discussions/4172)
*   **对话模式优化**：强烈建议增加“无工作区”的全局对话模式，打破新会话必须绑定工作区的限制。
    *   链接：[#430](https://github.com/deepseek-ai/deepseek-harness/discussions/430)
*   **Agent 交互增强**：提议扩展 ACP (Agent Control Protocol) 支持“转向”（Steer）功能，允许用户在 Agent 运行中发送指令进行纠偏，而不仅仅是取消。
    *   链接：[#593](https://github.com/deepseek-ai/deepseek-harness/discussions/593)
*   **插件生态**：社区正在构建 `deepseek-harness-community-catalog`，推动账单统计 (`dsh-billing`) 和 Qwen 本地模型优化等插件的标准化。
    *   链接：[#1045](https://github.com/deepseek-ai/deepseek-harness/discussions/1045)

*判断*：鉴于近期 Bug 密集，**i18n** 和 **ACP 扩展** 可能会被纳入下一版本的“Nice-to-have”；但 **无工作区模式** 可能作为 UX 优化紧随其后。

### 7. 用户反馈摘要
从今日的 185 条讨论中，提炼出以下用户痛点：

*   **Windows 用户痛点**：“我不得不为了工作而开启全盘权限，这违背了沙箱的安全初衷” (来自 [#8420](https://github.com/deepseek-ai/deepseek-harness/discussions/8420))。沙箱不稳定直接导致了信任度下降。
*   **桌面端用户痛点**：“每次启动应用都很痛苦，经常因为 Cookie 报错或更新失败而崩溃” (来自 [#11095](https://github.com/deepseek-ai/deepseek-harness/discussions/11095))。桌面端的稳定性目前低于 Web/CLI 端。
*   **模板变量困惑**：用户在更新后遇到 `unknown prompt variable "{{cwd}}"` 错误，反映出部署文档与最新模板机制之间的断层 (来自 [#9962](https://github.com/deepseek-ai/deepseek-harness/discussions/9962))。

### 8. 待处理积压
以下问题在 Discussions 中存在已久，且近期热度持续上升，建议维护者优先关注：

*   **Windows 沙箱架构性修复**：涉及 [#810](https://github.com/deepseek-ai/deepseek-harness/discussions/810) 和 [#7504](https://github.com/deepseek-ai/deepseek-harness/discussions/7504) 的多个方面。这不是简单的补丁，可能需要重新评估 ACL 受限令牌的使用策略。
*   **Desktop 端 Cookie 生命周期管理**：[#11095](https://github.com/deepseek-ai/deepseek-harness/discussions/11095) 中社区提供的补丁已验证可行，建议尽快合并此修复以防止更多用户遇到启动故障。
*   **内存管理**：[#4722](https://github.com/deepseek-ai/deepseek-harness/discussions/4722) 提出的长会话 OOM 问题在长程任务场景下致命，建议在下个版本中加入 Log 滚动清理机制。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*