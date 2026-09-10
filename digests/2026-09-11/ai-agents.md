# OpenClaw 生态日报 2026-09-11

> Issues: 419 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-10 23:32 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 (2026-09-11)

## 1. 今日速览
OpenClaw 项目保持高活跃度，过去24小时共产生 919 条更新（419 条 Issue，500 条 PR）。今日发布了一个重要的长期支持版本 v2026.6.35，标志着六月 LTS 阶段的结束。社区对最近几个版本（尤其是 2026.8.x 和 2026.9.x）中的稳定性问题反应强烈，多个 P0/P1 级别的崩溃和回归问题集中爆发。维护团队正在积极处理大量涌入的 Bug 报告，同时有多项关键修复 PR 待合并，项目整体处于快速迭代与稳定性修复并重的状态。

## 2. 版本发布
*   **v2026.6.35**: 这是 2026 年 6 月 Extended Stable (LTS) 系列的最终发布版本。
    *   **亮点**: 增强了提供者和通道的安全性，包括绑定不可信的响应体、在昂贵工作开始前拒绝过大的输入，以及在传输过程中保留安全恢复机制。
    *   **迁移注意**: 作为 LTS 的最终版本，建议用户评估是否升级到更新的稳定分支以获取最新的功能和安全修复。

## 3. 项目进展
今日虽然没有展示大量已合并的重大功能 PR（展示的 30 条 PR 多为待审核或进行中），但有若干关键修复方向明确：
*   **安全性修复**: PR #144292 解决了未列出模型继承_sibling_输出限制的问题，防止潜在的配置混淆。
*   **稳定性改进**: PR #144495 确保在内存索引升级失败时仍保留词汇检索能力；PR #144488 使嵌入请求超时可配置，避免慢速提供者导致索引永久卡住。
*   **用户体验优化**: PR #144491 支持从私聊中登录 OpenRouter；PR #144480 增加了从浏览器侧边栏下载资产的功能。
*   **代码质量**: 多处测试重构（如 PR #144489, #144485, #144481）提高了测试的健壮性和可维护性。

## 4. 社区热点
以下 Issue 讨论最为活跃，反映了用户最关切的问题：

*   **[Beta Feedback] OpenClaw 2026.8.1 beta feedback** (#125626)
    *   链接: https://github.com/openclaw/openclaw/issues/125626
    *   分析: 24 条评论，显示用户对 2026.8.1 版本的高度关注和积极参与测试。
*   **Codex PreToolUse hook 导致 CPU 占用过高并阻塞网关 RPC** (#91009)
    *   链接: https://github.com/openclaw/openclaw/issues/91009
    *   分析: 22 条评论，P0 级别，严重影响使用 Codex 集成的用户，涉及进程泄漏和性能瓶颈。
*   **OpenClaw 泄漏未回收的 hook/tool 子进程，导致僵尸进程累积** (#97616)
    *   链接: https://github.com/openclaw/openclaw/issues/97616
    *   分析: 15 条评论，与 #91009 相关，揭示了更深层次的资源管理缺陷。
*   **memory-core SQLite 无限制增长** (#114612)
    *   链接: https://github.com/openclaw/openclaw/issues/114612
    *   分析: 13 条评论，生产环境中长期运行的用户面临磁盘空间耗尽的风险。
*   **post-core 更新后 resume 状态异常** (#139714)
    *   链接: https://github.com/openclaw/openclaw/issues/139714
    *   分析: 13 条评论，影响更新后的用户体验，导致状态卡住。

## 5. Bug 与稳定性
今日报告的 Bug 多集中于最近版本，严重程度较高：

*   **[P0, Regression] Doctor 拒绝有效的旧版工作区设置** (#142585) - 升级阻塞器，影响 2026.9.3 升级路径。
*   **[P0, Regression] Windows 网关重启误杀正在启动的网关** (#140162) - 导致服务不可用。
*   **[P1, Regression] 命令执行器在等待 ssh 横幅时挂起** (#136183) - 2026.8.1/8.2 回归。
*   **[P1] 溢出重试可能在工具结果后成功结束但无最终交付** (#132762) - 消息丢失风险。
*   **[P1] 消息发送时回复运行激活导致消息被丢弃** (#139847) - 2026.9.2 回归。
*   **[P1] 强制网关重启丢弃进行中的回复** (#95866) - 消息丢失。
*   **[P1] memory-core 重新索引锁导致索引无法修复** (#136311) - 数据一致性风险。
*   **[P1] 内部运行时上下文载体在 Teams 渠道泄露** (#136360) - UX 问题。
*   **[P2] WebChat 图片附件未映射到媒体存储路径** (#103198) - 功能失效。

**注意**: 多个高优先级 Bug（如 #142585, #140162, #139847）尚无明确的已合并 Fix PR，需关注后续动态。

## 6. 功能请求与路线图信号
*   **内置自动更新** (#12855): 用户希望拥有可配置的自动更新计划、确认提示和更新后通知。目前仅有基本原语，此功能请求表明用户渴望更无缝的维护体验。
*   **暴露投递关联数据** (#109370): 希望在 `message_sent` hooks 上暴露投递相关数据，以支持幂等性处理，这对于构建可靠集成至关重要。
*   **prompt section overrides** (PR #144439): 允许操作员覆盖系统提示部分，提供了更大的自定义灵活性。
*   **OpenRouter 私聊登录** (PR #144491): 改善特定提供商的认证流程。

## 7. 用户反馈摘要
*   **痛点**:
    *   **稳定性担忧**: 用户对 2026.8.x 和 2026.9.x 版本的回归问题（进程泄漏、挂起、状态错误）感到沮丧，认为影响了生产环境的可靠性。
    *   **性能瓶颈**: SQLite 竞争（#117262）、内存索引增长（#114612）和 c

ron 任务阻塞事件循环（#142476）是多 agent 网关用户的共同困扰。
    *   **升级障碍**: Doctor 迁移失败（#142585）和旧版配置兼容性问题阻碍了平滑升级。
    *   **平台特定问题**: Windows 上的网关启动和重启逻辑存在缺陷（#143757, #140162），macOS launchd 配置问题（#90711）。
*   **满意点**:
    *   对快速响应的 Bug 报告和活跃的社区讨论表示认可。
    *   新功能如私聊登录 OpenRouter 和浏览器资产下载受到欢迎。

## 8. 待处理积压
*   **#117262 (SQLite 竞争)**: P1 问题，自 2026-08-01 开放，评论 10 条，需维护者深入调查。
*   **#79588 (Compaction 质量守护)**: P1 问题，自 2026-05-09 开放，涉及核心内存功能的正确性。
*   **#112110 (安全授权漏洞)**: P1 安全问题，子代理工具执行授权检查不当，需优先处理。
*   **#107972 (媒体沙箱泄漏)**: P0 安全问题，已关闭，但类似的安全边界问题需持续关注。
*   **#12855 (自动更新)**: 自 2026-02-09 开放的功能请求，长期未实现。

---
*报告生成时间: 2026-09-11*
*数据来源: OpenClaw GitHub Repository*

---

## 横向生态对比

### 2026-09-11 AI 智能体开源生态横向分析报告

#### 1. 生态全景
2026年Q3，个人AI助手开源生态呈现**“核心框架高维竞争、垂直场景快速分化”**的态势。OpenClaw 作为行业基准，正从功能扩张转向 LTS 稳定性治理，而 DeepSeek Harness 等新兴项目则通过大幅度的 UI/UX 重构抢占用户体验高地。社区共识已从单一的“模型调用能力”转向“多模态可靠性、跨设备会话连续性、以及企业级安全合规（如 OIDC、凭据保险库）”。整体生态处于技术成熟期的动荡阶段，稳定性修复与架构重构并行的特征明显。

#### 2. 各项目活跃度对比

| 项目 | Issues (24h) | PRs (24h) | 版本发布 | 健康度评估 |
| :--- | :---: | :---: | :---: | :---: |
| **OpenClaw** | 419 | 500 | v2026.6.35 (LTS Final) | 🟡 **高压力**：LTS收尾，P0/P1回归问题集中爆发，稳定性修复压力大 |
| **hermes-agent** | 362 | 369 | 无 | 🟡 **高活跃/高风险**：开发极快，但存在 Cron 死锁、Desktop 崩溃等严重 P1 Bug |
| **Zeroclaw** | 50 | 50 | 无 | 🟠 **中等风险**：PR 积压严重，安全重构停滞，Windows 兼容性缺失 |
| **QwenPaw** | 28 | 35 | v2.2.1-beta.2 | 🟢 **良好**：迭代节奏稳健，多租户路线图清晰，Bug 修复响应及时 |
| **DeepSeek Harness** | ~15 (Discussions) | 0 (Releases only) | v0.1.5-rc.1/2 | 🟡 **功能主导**：大版本发布带动讨论，但存在严重的 v0 会话迁移兼容性 Bug |
| **AstrBot** | 15 | 25 | 无 | 🟢 **良好**：Bug 修复率高，聚焦 Cron 可靠性和多平台适配器稳定性 |
| **PicoClaw** | 2 | 6 | 无 | 🟢 **稳定维护**：依赖更新为主，少量关键 Bug 修复（Deltachat/QQ） |

#### 3. OpenClaw 在生态中的定位
*   **行业基准与 LTS 标杆**：OpenClaw 是列表中唯一发布 LTS 版本的项目，标志着其对生产环境稳定性的承诺。其 v2026.6.35 强调了“安全性”和“不可信响应体绑定”，定位为企业级/生产级基石。
*   **技术路线差异**：相比 DeepSeek Harness 的激进 UI 重构和 QwenPaw 的移动端优先，OpenClaw 更侧重底层网关稳定性、内存索引优化及多通道集成。其社区规模最大（Issue/PR 数远超其他），意味着更高的贡献密度但也面临更复杂的向后兼容性挑战。
*   **竞争位势**：在“稳定性治理”层面领先，但在“开箱即用的现代 UI 体验”上略逊于 DeepSeek Harness 和 QwenPaw。

#### 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求/现象 |
| :--- | :---: | :--- |
| **任务调度与状态持久化** | OpenClaw, hermes-agent, AstrBot, DeepSeek Harness | Cron/定时任务失败后状态机不一致（假完成）、长任务中断误报、心跳死锁。用户极度关注自动化任务的可靠性。 |
| **跨设备/跨会话连续性** | QwenPaw, hermes-agent, DeepSeek Harness | 希望实现 Desktop 与 Mobile 间会话无缝切换、Bot 群组聊天持久化、多标签 Sidebar 管理复杂工作流。 |
| **多模态与文件处理** | OpenClaw, QwenPaw, AstrBot, DeepSeek Harness | 图片上传大小限制、Base64 编码问题、流式回复与工具调用脱节、非文本文件（PPTX/PDF）支持。 |
| **多租户与企业安全** | Zeroclaw, QwenPaw, hermes-agent, DeepSeek Harness | OIDC/PKCE 认证、凭据加密保险库、子代理权限隔离、TLS 配置灵活性。 |
| **平台兼容性适配** | Zeroclaw, PicoClaw, AstrBot, hermes-agent | Windows/macOS 测试覆盖不足、特定 IM 平台（QQ/飞书/Telegram）适配器频繁出现认证或渲染 Bug。 |

#### 5. 差异化定位分析

*   **OpenClaw**：**企业级网关底座**。侧重底层稳定性、LTS 支持、复杂通道集成和安全加固。适合需要高度定制化、生产环境部署的开发者。
*   **DeepSeek Harness**：**体验优先的多模态工作台**。通过 Sidebar 重构、任意文件上传和视觉优化吸引用户，但牺牲了部分旧数据兼容性。适合追求流畅交互的个人和团队。
*   **QwenPaw**：**移动端友好的协作助手**。强调 Console 移动端体验、多租户路线图和记忆系统优化。适合注重移动办公和团队协作的用户。
*   **hermes-agent**：**高性能研究型框架**。更新频率极高，功能探索激进（如 Codex 集成、集合智慧 Agent），但稳定性波动大。适合愿意承担风险的技术前沿探索者。
*   **AstrBot/PicoClaw/Zeroclaw**：**垂直场景/特定平台适配器**。AstrBot 聚焦国内 IM 平台（QQ/飞书）的稳定性；PicoClaw 小而美，专注特定通道（Deltachat/QQ）；Zeroclaw 则在安全重构路上艰难前行。

#### 6. 社区热度与成熟度

*   **快速迭代/动荡期**：**OpenClaw**, **hermes-agent**, **DeepSeek Harness**。这些项目功能更新极快，但伴随着大量的回归 Bug 和兼容性断裂（如 OpenClaw 的 2026.8/9.x 问题，DeepSeek 的 v0 迁移失败）。
*   **稳步成长/质量巩固期**：**QwenPaw**, **AstrBot**。项目保持了较高的 Issue/PR 响应率，Bug 修复闭环较好，新版本（如 QwenPaw beta, AstrBot v4.28）虽有波动但整体可控。
*   **维护期/细分领域**：**PicoClaw**。活动量低，主要是被动维护和依赖更新。
*   **高风险/滞后**：**Zeroclaw**。PR 积压严重，关键安全修复（S0 级）长期未合并，Windows 支持缺失，社区活跃度与代码质量收敛不成正比。

#### 7. 值得关注的趋势信号

1.  **“假完成”与状态机焦虑**：多个项目（OpenClaw, hermes-agent, AstrBot, DeepSeek Harness）均出现定时任务或长运行任务状态报告不准确的问题。这反映出**异步 Agent 系统的状态一致性**仍是行业难题，未来标准可能趋向于更严格的持久化事务日志。
2.  **UI 重构的成本与收益**：DeepSeek Harness 的 Sidebar 重构虽然提升了体验，但导致了严重的旧数据不兼容。这提示开发者，**大规模 UI 架构变更必须配套平滑的迁移工具或保留旧格式读取能力**。
3.  **安全左移成为刚需**：Zeroclaw 的 OIDC 重构、DeepSeek 的凭据保险库讨论、OpenClaw 的响应体绑定，均显示**安全不再是附加功能，而是核心架构的一部分**。未来开源 Agent 框架若缺乏内置的安全沙箱和认证机制，将难以进入企业市场。
4.  **移动优先与多端协同**：QwenPaw 和 OpenClaw 均大力投入移动端体验和跨设备会话。这标志着 AI 助手正从“桌面应用”向“全平台随身助手”演进，**离线状态同步**和**轻量级移动端 UI**将成为差异化竞争点。
5.  **中国本地化生态的复杂性**：AstrBot 和 PicoClaw 频繁遭遇 QQ/飞书/TG 等平台 API 变更导致的破坏性更新。这表明**围绕国内 IM 平台的 Agent 开发具有极高的维护成本**，建议开发者关注 SDK 抽象层的设计，以应对上游平台的频繁变动。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**日期**：2026-09-11  
**数据周期**：过去24小时

## 1. 今日速览
Zeroclaw 项目当前处于**高活跃度调试期**，过去24小时内产生50条新Issue与50个待合并PR，但尚无合并或关闭记录，显示代码审查流程处于高压状态。开发者重点关注**Windows平台兼容性**、**安全边界加固**（如Git路径限制、Shell逃逸）及**多通道稳定性**。无新版本发布，整体健康度呈现“功能扩张快于质量收敛”的态势，建议关注核心维护者对堆积PR的反馈节奏。

## 2. 版本发布
**无新版本发布**。

## 3. 项目进展
今日所有50个PR均处于 `OPEN` / `待合并` 状态，暂无合并记录。主要技术推进方向包括：

*   **安全架构重构**：`@JordanTheJet` 主导的 RFC 7141 相关堆叠PR（#10248, #10255, #10270, #10268, #10265, #10321, #10275, #10274）正在逐步落地 OIDC 认证、浏览器 PKCE 及Principal内存隔离机制，这是项目安全性的重大升级，但目前被深度审查中。
*   **工具链修复**：
    *   **#10337** (fix: git operations allowed roots): 修复了git工具绕过权限限制的漏洞，对应Issue #10334，直接提升安全性。
    *   **#10511** (fix: quickstart credential validation): 解决了 `zeroclaw quickstart` 未验证凭据即持久化的问题。
    *   **#10522** (fix: drive SOP runs): 修复了手动启动SOP运行时未进入共享驱动的问题。
*   **新功能扩展**：
    *   **#10768** (feat: Sendblue channel): 新增Sendblue iMessage/SMS通道支持，扩展了非Apple生态的即时通讯能力。
    *   **#9109** (feat: Hailo-Ollama support): 添加Hailo-Ollama原生支持，优化边缘设备推理兼容。

**进度评估**：虽无合并，但PR积压主要集中在复杂的安全重构和平台适配，代码改动质量较高，一旦通过审查将显著增强系统健壮性。

## 4. 社区热点
以下Issue评论数最多，反映用户最核心的痛点：

1.  **[Bug] Windows测试失败严重性高** - [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)
    *   **热度**：19条评论，P1优先级，高风险。
    *   **分析**：74个测试在Windows上失败，且CI未覆盖Windows。这是跨平台兼容性的重大障碍，阻塞了Windows用户的正常使用和贡献。
2.  **[Enhancement] 发布证明机制整合** - [#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101)
    *   **热度**：9条评论，P1优先级。
    *   **分析**：v0.8.3存在三种冗余的签名机制，导致CI时间浪费和资产混乱。社区呼吁统一签名故事，体现对供应链安全和CI效率的重视。
3.  **[RFC] 简化投票流程** - [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)
    *   **热度**：8条评论。
    *   **分析**：提议移除强制讨论窗口，使“修订”状态能立即停止当前快照。反映社区对治理流程效率的不满，认为当前流程过于僵化。
4.  **[Bug] Telegram媒体批处理** - [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)
    *   **热度**：8条评论。
    *   **分析**：多个图片被解析为独立请求，导致输出碎片化。影响多模态用户体验，属于高频使用场景的缺陷。
5.  **[Bug] Nextcloud Talk API错误** - [#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157)
    *   **热度**：8条评论，高风险。
    *   **分析**：使用了错误的Bot消息API端点，导致Nextcloud集成完全不可用。属于关键通道集成缺陷。

## 5. Bug 与稳定性
按严重程度排列的关键Bug：

| Issue | 标题 | 严重程度 | 状态 | 已有Fix PR? |
|-------|------|----------|------|-------------|
| [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | Windows 74个测试失败 | P1 / 高风险 | In-Progress | 关联[#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461)（CI平台矩阵） |
| [#9486](https://github.com/zeroclaw-labs/zeroclaw/issues/9486) | Solana钱包地址被错误脱敏 | P1 / 高风险 | Accepted | 无明确PR，需修复高熵检测器逻辑 |
| [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) | Delegate工具绕过父级权限 | P1 / **S0安全** | Accepted | **#10337** 可能部分解决git相关权限问题，但delegate通用问题待查 |
| [#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) | MCP/schema克隆导致内存无限增长 | P1 / 高风险 | Accepted | 无明确PR，关联WSL2 OOM问题 |
| [#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207) | web_fetch返回压缩乱码 | P1 / 阻塞工作流 | In-Progress | 无明确PR |
| [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) | ACP失败轮次切换会话后消失 | P1 / 阻塞工作流 | In-Progress | **#10197** 涉及ACP中断持久化，可能相关 |
| [#9421](https://github.com/zeroclaw-labs/zeroclaw/issues/9421) | 不完整终端响应被报告为成功 | P1 / 高风险 | In-Progress | 无明确PR |
| [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) | Cron任务无墙钟超时 | P1 / 阻塞工作流 | In-Progress | 无明确PR |
| [#9390](https://github.com/zeroclaw-labs/zeroclaw/issues/9390) | 紧急停止仅CLI可用，运行时不读取 | P1 / **S0安全** | In-Progress | 无明确PR，严重安全隐患 |
| [#9247](https://github.com/zeroclaw-labs/zeroclaw/issues/9247) | Shell工具工作区边界绕过 | P1 / **S0安全** | Accepted | **#10337** 针对git，shell具体修复待查 |

**稳定性总结**：存在多个 **S0级安全风险**（权限绕过、紧急停止失效）和 **P1级工作流阻塞**问题，且多数缺乏直接对应的合并PR，项目稳定性风险较高。

## 6. 功能请求与路线图信号
*   **Sendblue iMessage/SMS支持** (#10768)：新增非Apple设备的iMessage通道，扩展用户覆盖面，预计纳入下一版本。
*   **Hailo-Ollama原生支持** (#9109)：针对边缘AI硬件的优化，满足本地化部署需求。
*   **OIDC/PKCE安全架构** (堆叠PR #10248-#10321)：大规模安全重构，引入现代身份验证标准，是路线图中的核心安全升级。
*   **RFC投票流程简化** (#10549)：治理效率改进，若通过将加速后续RFC的采纳速度。
*   **Windows/macOS CI覆盖** (#7461)：确保跨平台一致性，是成为生产级工具的必要条件。

## 7. 用户反馈摘要
*   **痛点**：
    *   **Windows兼容性差**：用户多次报告Windows下的测试失败、端口僵尸进程（#8800）、控制台编码问题（#7462），严重影响开发体验。
    *   **安全机制失效**：紧急停止功能仅CLI可用（#9390），delegate和shell工具可绕过权限（#8279, #9247），引发严重安全担忧。
    *   **通道集成不稳定**：Telegram媒体分组错误（#5514）、Discord输入指示器卡死（#9198）、Nextcloud API错误（#6157）、Bluesky/Reddit无发送授权（#9393）。
    *   **工具可靠性**：web_fetch处理压缩响应失败（#9207），Solana地址被误脱敏（#9486），多模态上下文计量不准（#9332）。
*   **满意点**：
    *   社区对安全重构（OIDC/PKCE）和跨平台CI投入表示关注，视为长期利好。
    *   快速响应Issue（大部分Issue都在24小时内更新），显示维护活跃。

## 8. 待处理积压
*   **安全关键Issue无Fix PR**：
    *   [#9390](https://github.com/zeroclaw-labs/zeroclaw/issues/9390) (紧急停止失效) - S0风险，建议优先处理。
    *   [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) (Delegate权限绕过) - S0风险。
    *   [#9247](https://github.com/zeroclaw-labs/zeroclaw/issues/9247) (Shell工作区绕过) - S0风险。
*   **Windows兼容性问题**：[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) 和 [#8800](https://github.com/zeroclaw-labs/zeroclaw/issues/8800) 长期未解决，阻碍Windows用户群体。
*   **PR堆积**：50个PR待合并，其中安全重构PR堆叠复杂（#10248-#10321系列），需要维护者尽快投入审查资源，避免阻塞关键功能发布。

---
**报告生成时间**：2026-09-11  
**数据来源**：Zeroclaw GitHub Repository (github.com/zeroclaw-labs/zeroclaw)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报 | 2026-09-11

## 1. 今日速览
PicoClaw 今日呈现典型的“维护日”特征：无新版本发布，但社区贡献活跃（6条PR、2个Issue）。核心亮点是 **#3376** 解决了长期困扰用户的 `deltachat` 配置校验报错问题，直接回应了 **#3265** 的诉求。此外，5条 Dependabot PR 集中更新了 Go 依赖，显著提升了项目的安全性与兼容性。整体健康度良好，Bug修复与依赖维护并行推进。

## 2. 版本发布
**无新版本发布。**

## 3. 项目进展
今日 **0 条 PR 被合并**，所有 6 条 PR 均处于待合并状态。主要进展如下：

*   **Bug 修复已就绪 (#3376)**：@luisgdev 提交的修复 PR 已针对 Issue #3265 做好准备。该 PR 将 `deltachat` 注册为自定义通道类型，解决了 Gateway 启动时的未知类型校验错误。这是今日最具价值的代码贡献，直接消除了用户配置障碍。
*   **依赖安全升级**：5 条 Dependabot PR 同步推进了底层库的更新：
    *   **AWS SDK v2** (v1.42.0 -> v1.45.1)：提升云功能稳定性。
    *   **Lark Suite SDK** (v3.9.4 -> v3.11.0)：增强飞书集成能力。
    *   **IRC-go** (v0.6.0 -> v0.7.0)、**golang.org/x/term** (v0.44.0 -> v0.45.0)、**protobuf** (v1.36.11 -> v1.36.12)：修复潜在的安全漏洞并更新 API 兼容性。
    
    **项目推进评估**：虽然代码尚未合并，但所有关键变更均已进入 Review 队列，预计近期合并后将显著提升版本稳定性。

## 4. 社区热点
*   **#3265 [CLOSED] Gateway startup fails with 'channel deltachat has unknown type'**
    *   **状态**：已关闭（标记 stale），但解决方案已通过 #3376 提出。
    *   **热度**：1 👍，6 条评论。
    *   **分析**：这是一个典型的配置即 Bug 场景。用户在不使用 deltachat 时仍遇到启动报错，说明配置校验逻辑存在缺陷。虽然 Issue 因长期无回应被关闭，但社区成员 @luisgdev 跟进提交了修复 PR，体现了良好的社区互助氛围。
    *   **链接**：[Issue #3265](https://github.com/sipeed/picoclaw/issues/3265) | [PR #3376](https://github.com/sipeed/picoclaw/pull/3376)

*   **#3349 [OPEN] [BUG] QQ频道无法正常使用**
    *   **状态**：开放，最新更新于 2026-09-10。
    *   **热度**：4 条评论。
    *   **分析**：用户报告 QQ 频道在 Docker 和 Linux x86 环境下均出现 401 认证错误（Authorization 参数格式错误）。这是一个跨平台的严重兼容性 Bug，可能涉及新版 QQ API 接口变更或鉴权逻辑缺陷，需要维护者优先关注。
    *   **链接**：[Issue #3349](https://github.com/sipeed/picoclaw/issues/3349)

## 5. Bug 与稳定性
*   **P0/P1 - QQ 频道认证失败 (#3349)**
    *   **描述**：QQ 频道 WebSocket 连接返回 `401 Authorization parameter format error`，导致功能完全不可用。
    *   **影响范围**：Docker 及 Linux x86 版本均受影响。
    *   **Fix PR**：**无**。当前处于等待维护者排查状态。
    *   **建议**：需检查 QQ Bot API 最近是否有鉴权机制变更，或确认 Token 配置格式是否适配新版接口。

*   **P2 - Deltachat 启动报错 (#3265)**
    *   **描述**：未配置 deltachat 时 Gateway 启动失败，报错“unknown type”。
    *   **影响范围**：仅在使用默认配置或误配时触发。
    *   **Fix PR**：**#3376** 已提交，待合并后解决。

## 6. 功能请求与路线图信号
*   **依赖驱动的稳定性增强**：今日 5 条 Dependabot PR 表明项目正在积极追踪上游依赖的最新稳定版本（特别是 AWS SDK 和 Lark SDK）。这暗示下一个小版本可能会包含这些安全补丁和 API 改进，无需用户额外操作即可受益。
*   **配置校验逻辑优化**：通过 #3376 对 #3265 的修复可以看出，维护者正在优化通道的初始化逻辑，使其更加灵活（支持自定义类型注册），这将有助于未来接入更多小众或自定义协议。

## 7. 用户反馈摘要
*   **痛点**：
    1.  **配置即报错**：用户反映即使不配置某些通道（如 deltachat），程序仍会报错退出，期望更友好的“未配置即跳过”逻辑。
    2.  **第三方平台兼容断裂**：QQ 频道作为常见集成平台，突然出现认证失效，用户感到沮丧，因为这不是配置问题而是平台侧或 SDK 侧的变化。
*   **满意点**：
    *   社区响应迅速：Issue #3265 虽被标记 stale，但很快有贡献者提交修复 PR，让用户感受到项目并未“死亡”，仍有活力。

## 8. 待处理积压
*   **高优先级**：
    *   **[Issue #3349] QQ 频道 401 错误**：需维护者介入，确认是否为上游 API 变更导致的破坏性更新，并规划修复。
*   **中优先级**：
    *   **[PR #3376] Deltachat 初始化修复**：待合并，合并后可正式关闭 #3265。
    *   **[PR #3360-#3364] 依赖更新**：5 个 Dependabot PR 待合并，建议批量 Review 后合并以释放后续自动 PR 压力。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：2026-09-11 | 数据来源：github.com/agentscope-ai/qwenpaw**

---

## 1. 今日速览

QwenPaw 在 v2.2.1-beta.2 发布当日保持高强度活跃：28 条 Issue（18 新开）、35 条 PR（12 合并）、1 个新版本。项目核心聚焦于 Console 移动端体验优化、记忆系统健壮性修复、以及飞书/企微等 IM 通道的稳定性问题。整体健康度良好，但多租户 Hub 版本的生态讨论和用户反馈显示社区对团队版功能的强烈期待。

---

## 2. 版本发布

### v2.2.1-beta.2
**链接：** https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.2

**更新内容：**
- `feat(console): improve mobile agent selector` (#7623) — 优化 Console 移动端智能体选择器体验
- `fix(console): align qwenpaw CSS selectors` (#7643) — 修正 Console 样式选择器对齐问题

**破坏性变更：** 无
**迁移注意：** 本次为 beta 版本，建议测试环境验证后再升级生产部署。

---

## 3. 项目进展

### 今日合并/关闭的重要 PR

| PR | 类型 | 摘要 | 状态 |
|----|------|------|------|
| [#7647](https://github.com/agentscope-ai/QwenPaw/pull/7647) | fix | 支持 Base64 data URL 格式的出站媒体，修复企微通道发送 base64 图片时报 `OSError [Errno 36] File name too long` 的问题 | ✅ CLOSED |
| [#7663](https://github.com/agentscope-ai/QwenPaw/pull/7663) | fix | 当 Agent 选择未注册的 memory 后端插件时，临时回退到内置 ReMeLight 后端，避免工作空间启动失败 | ✅ CLOSED |
| [#7667](https://github.com/agentscope-ai/QwenPaw/pull/7667) | fix | 文件上传按钮仅在 Workspace 标签页显示，Profile/Daily/Digest 改为只读导航源 | ✅ CLOSED |
| [#7677](https://github.com/agentscope-ai/QwenPaw/pull/7677) | fix | 对非有限校验输入返回 422 状态码，保持 FastAPI 结构化响应格式 | 🔄 OPEN |
| [#7665](https://github.com/agentscope-ai/QwenPaw/pull/7665) | feat | Console 分组聊天历史分页优化：每组默认渲染 10 条，点击加载更多，全部加载后切换为"折叠列表" | 🔄 OPEN |
| [#7655](https://github.com/agentscope-ai/QwenPaw/pull/7655) | fix | 修复 FTS 索引损坏问题：当 purge 尝试删除未索引的 recall-tool 行时抛出 `SQLITE_CORRUPT_VTAB` | 🔄 OPEN |
| [#7639](https://github.com/agentscope-ai/QwenPaw/pull/7639) | perf | 避免每次构建 Agent 时重复运行 `PRAGMA quick_check` 完整性扫描，改为每进程每数据库一次 | 🔄 OPEN |

**整体推进评估：** 今日 3 个 Bug fix 已合并，解决企微图片发送、memory 后端降级、文件上传可见性等实际问题；3 个关键 PR 待审核，涵盖性能优化（历史扫描）、稳定性（FTS 损坏）和 UX 改进（分组历史），预计未来 24-48 小时内可合并。

---

## 4. 社区热点

### 最活跃 Issue/PR（按评论数排序）

| 类型 | ID | 标题 | 评论 | 👍 | 链接 |
|------|-----|------|------|-----|------|
| Issue | #7318 | QwenPaw Hub 多租户版路线图讨论：2.2.0 之后我们该做什么？ | 24 | 4 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7318) |
| Issue | #7579 | 模型回复意外从上下文中丢失（空响应症状） | 10 | 0 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7579) |
| Issue | #7177 | 优化 platform.agentscope.io/deploy 首页 UI/UX | 9 | 0 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7177) |
| Issue | #7011 | Console stop 请求可取消活跃飞书会话（多 UI session 下） | 8 | 0 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7011) |
| Issue | #7623 | 移动端智能体选择器优化（随 v2.2.1-beta.2 发布） | - | - | [查看](https://github.com/agentscope-ai/QwenPaw/pull/7623) |

**热点分析：**
- **#7318 多租户版路线图**（24 评论，4 👍）是今日最高热度 Issue，反映社区对 QwenPaw 从"个人助手"向"团队协作"转型的强烈期待。用户希望明确 2.2.0 之后的功能优先级。
- **#7579 上下文丢失**（10 评论）涉及模型"看不到自己刚说的话"的严重 Bug，影响多轮对话体验，已关闭但需关注是否完全修复。
- **#7177 首页 UX 优化**（9 评论）提出具体操作便捷性问题：入口位置、启动/停止按钮顺序，显示用户对移动端操作流畅度的痛点。

---

## 5. Bug 与稳定性

### 严重 Bug（按严重程度排序）

| 级别 | Issue | 标题 | 状态 | Fix PR | 链接 |
|------|-------|------|------|--------|------|
| 🔴 高 | #7579 | 模型回复从上下文中丢失（空响应） | ✅ CLOSED | - | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7579) |
| 🔴 高 | #7534 | 飞书 session queue consumer 卡死，会话静默无响应 | 🟡 OPEN | 暂无 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7534) |
| 🟠 中 | #7661 | 错误创建新会话（侧边栏重复创建而非延续） | 🟡 OPEN | 暂无 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7661) |
| 🟠 中 | #7676 | `subagent_model` 配置无效，子智能体继承父级模型 | 🟡 OPEN | 暂无 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7676) |
| 🟡 低 | #7642 | Chrome 下 Console streaming 无渲染（Safari 正常） | ✅ CLOSED | - | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7642) |
| 🟡 低 | #7666 | 本地模型无法从 HuggingFace 下载 | ✅ CLOSED | - | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7666) |
| 🟡 低 | #7660 | 安装失败 | 🟡 OPEN | 暂无 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7660) |

**稳定性评估：** 今日 7 个 Bug 报告，其中 3 个已关闭，4 个仍在开放。**飞书 consumer 卡死（#7534）** 是最严重的未修复问题，影响生产环境稳定性。建议优先处理。

---

## 6. 功能请求与路线图信号

### 高优先级功能请求

| Issue | 标题 | 用户诉求 | 关联 PR | 纳入下一版本可能性 |
|-------|------|----------|---------|-------------------|
| #7318 | Hub 多租户版路线图讨论 | 团队协作、多用户访问、管理员技能管理 | - | ⭐⭐⭐⭐⭐ 极高 |
| #7671 | 自动缩放过大图片（避免丢弃） | 附件图片超过 2MiB 时自动 downscale 而非替换为占位符 | - | ⭐⭐⭐⭐ 高 |
| #7670 | 代码文件语法高亮 | Files 面板 Preview 模式支持 Monaco/高亮主题 | - | ⭐⭐⭐ 中 |
| #7657 | ntfy 通道支持 | 添加自托管推送服务 ntfy 作为内置通道 | - | ⭐⭐⭐ 中 |
| #7664 | 记忆写入独立模型配置 | 为记忆总结/进化配置独立轻量模型，降低 Token 成本 | - | ⭐⭐⭐⭐ 高 |
| #7656 | 跨会话持久化记忆 | 集成 MemCode 等外部记忆服务 | - | ⭐⭐⭐ 中 |
| #4175 | MCP 客户端 TLS 配置 | 支持自签名证书和私有 CA | - | ⭐⭐ 低 |

**路线图信号分析：**
- **#7318 多租户版讨论** 是当前最高优先级路线图信号，24 条评论和 4 个 👍 表明社区期待明确。
- **#7671 图片自动缩放** 和 **#7664 记忆独立模型** 是直接解决用户痛点的实用功能，且有明确技术路径，可能被纳入 v2.2.1 或 v2.3.0。
- **#7657 ntfy 通道** 和 **#7656 持久化记忆** 属于新集成类功能，需要评估维护成本和用户需求强度。

---

## 7. 用户反馈摘要

### 真实用户痛点

1. **移动端操作体验差**（#7177, #7378）
   - 入口按钮位置过低，手机上操作极不方便
   - "启动"和"停止运行"按钮顺序不合理，担心误点停止
   - 希望有原生 Mobile 体验（#7378 _draft_）

2. **多会话管理混乱**（#7661, #7231）
   - 新建会话时侧边栏重复创建而非延续当前会话
   - 切换会话/页面时消息可能发送到错误会话（已关闭但仍需回归测试）

3. **IM 通道稳定性问题**
   - 飞书 session consumer 卡死后会话静默无响应（#7534）
   - 企微发送 base64 图片时报 `OSError`（已修复 #7647）
   - Telegram 代理黑洞下 polling 静默死亡（#7662，已关闭）

4. **模型配置灵活性不足**
   - `subagent_model` 配置无效，子智能体无法使用独立模型（#7676）
   - 记忆写入无法使用独立轻量模型，消耗昂贵 Token（#7664）

5. **平台可用性**
   - 本地模型无法从 HuggingFace 下载（#7666）
   - Console streaming 在 Chrome 下无渲染（#7642，已关闭）

### 用户满意点
- 多租户版路线图讨论活跃，社区感到被倾听（#7318）
- Base64 图片发送问题快速修复（#7647）
- Memory 后端降级策略提升启动可靠性（#7663）

---

## 8. 待处理积压

### 长期未响应的重要 Issue

| Issue | 标题 | 创建时间 | 评论 | 风险 | 链接 |
|-------|------|----------|------|------|------|
| #4175 | MCP 客户端 TLS 配置支持 | 2026-05-10 | 3 | 🟡 中 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/4175) |
| #3113 | 团队协作模式下初始指令被忽略 | 2026-04-08 | 2 | 🟡 中 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/3113) |
| #3254 | Console chat UUID 竞态条件 | 2026-04-10 | 2 | 🟡 中 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/3254) |
| #7534 | 飞书 session consumer 卡死 | 2026-09-03 | 4 | 🔴 高 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7534) |
| #7661 | 错误创建新会话 | 2026-09-10 | 4 | 🟠 中 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7661) |
| #7676 | subagent_model 配置无效 | 2026-09-10 | 1 | 🟠 中 | [查看](https://github.com/agentscope-ai/QwenPaw/issues/7676) |

### 待审核重要 PR

| PR | 标题 | 作者 | 风险 | 链接 |
|----|------|------|------|------|
| #7655 | 修复 FTS 索引损坏 | @niceIrene | 🟡 中 | [查看](https://github.com/agentscope-ai/QwenPaw/pull/7655) |
| #7639 | 优化历史完整性扫描性能 | @niceIrene | 🟢 低 | [查看](https://github.com/agentscope-ai/QwenPaw/pull/7639) |
| #7677 | 返回 422 校验错误 | @jinliyl | 🟢 低 | [查看](https://github.com/agentscope-ai/QwenPaw/pull/7677) |
| #7665 | 分组聊天历史分页 | @zhaozhuang521 | 🟢 低 | [查看](https://github.com/agentscope-ai/QwenPaw/pull/7665) |

---

## 附录：项目健康度指标

| 指标 | 数值 | 评估 |
|------|------|------|
| Issue 日增 | 28 条 | 🟢 正常（含讨论型） |
| PR 日增 | 35 条 | 🟢 高活跃 |
| Issue 关闭率 | 10/28 = 36% | 🟡 中等（部分为讨论型） |
| PR 合并率 | 12/35 = 34% | 🟡 中等（含待审核） |
| 新版本发布 | 1 个（beta） | 🟢 正常 |
| 严重 Bug 未修复 | 1 个（#7534） | 🟠 需关注 |
| 长期未响应 Issue | 6 个（>30 天） | 🟡 需清理 |

**总体评估：** QwenPaw 项目保持高强度开发节奏，今日重点是 Console 移动端优化和 IM 通道稳定性修复。多租户版路线图讨论活跃，反映社区对团队协作功能的强烈期待。建议优先处理飞书 consumer 卡死（#7534）和 subagent_model 配置无效（#7676）两个严重 Bug，并加快 FTS 损坏修复（#7655）和性能优化（#7639）的审核流程。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：** 2026-09-11  
**分析对象：** NousResearch/hermes-agent

## 1. 今日速览
2026-09-11，hermes-agent 社区保持高活跃度，24小时内产生 **439条 Issue**（新开/活跃362）与 **500条 PR**（待合并369），显示开发节奏极快且外部贡献者参与积极。项目无新版本发布，但大量针对 **Desktop客户端、Cron调度器、会话状态管理及多平台Gateway** 的关键Bug修复正在进行中。整体健康度较高，但存在若干P1级严重Bug需紧急关注，尤其是cron心跳死锁和桌面端会话丢失问题。

## 2. 版本发布
**无新版本发布。**

## 3. 项目进展
今日重点PR集中在稳定性修复与用户体验优化：

*   **中断处理与成本核算修复：**
    *   [#84236](https://github.com/NousResearch/hermes-agent/pull/84236) 修复了被中断的turn (`response_len=0`) 无法向gateway发送明确状态的问题，提升了用户反馈的清晰度。
    *   [#107775](https://github.com/NousResearch/hermes-agent/pull/107775) 修复了上下文压缩 (`/compress`) 场景下的成本计算错误，确保 lineage costs 和 continuations 被正确计入 usage_totals。
*   **Desktop与UI优化：**
    *   [#107776](https://github.com/NousResearch/hermes-agent/pull/107776) 修复了侧边栏折叠时面板标签页覆盖标题栏控制按钮的z-index问题。
    *   [#107773](https://github.com/NousResearch/hermes-agent/pull/107773) 修复了Quick Entry中“新建会话”的竞态条件，确保路由在提交前正确提交。
    *   [#102928](https://github.com/NousResearch/hermes-agent/pull/102928) 优化了Desktop TTS播放，通过预取片段消除句子间的停顿。
*   **配置与可靠性：**
    *   [#82739](https://github.com/NousResearch/hermes-agent/pull/82739) 修复了MoA（Mixture of Agents）配置在合并时丢失扁平化设置的问题。
    *   [#94842](https://github.com/NousResearch/hermes-agent/pull/94842) 修复了已删除的Desktop Bot Profile可能意外重现的Bug。
    *   [#98177](https://github.com/NousResearch/hermes-agent/pull/98177) 允许在Gateway Agent处于活动轮次时执行 `/title` 命令，增强了交互灵活性。
*   **新功能探索：**
    *   [#94266](https://github.com/NousResearch/hermes-agent/pull/94266) 引入了"Hermes Collective Wisdom Agent V1"概念，尽管目前处于延期接受检查状态。
    *   [#107779](https://github.com/NousResearch/hermes-agent/pull/107779) 增强了Kanban工作器的终端通知，使其能显示未完成的工作项。

## 4. 社区热点
以下Issue因评论数多或高优先级引发社区高度关注：

*   **#66616: Skills index is stale or degraded** [192评论] ([链接](https://github.com/NousResearch/hermes-agent/issues/66616))
    *   *热度原因：* 自动化技能索引健康检查持续失败，影响大量依赖Skills Hub的用户。这是基础设施层面的稳定性问题。
*   **#88584: Automated Nous integration is blocked** [85评论] ([链接](https://github.com/NousResearch/hermes-agent/issues/88584))
    *   *热度原因：* 自动化集成流程因代码冲突阻塞，影响内部CI/CD管道。
*   **#78647: Repo-wide godfile eradication** [82评论] ([链接](https://github.com/NousResearch/hermes-agent/issues/78647))
    *   *热度原因：* 长期存在的架构重构Epic，涉及核心代码组织，开发者社区对“消灭上帝文件”的进展持续跟进。
*   **#97681: Bot Group Chats should keep working after Desktop closes** [28评论] ([链接](https://github.com/NousResearch/hermes-agent/issues/97681))
    *   *热度原因：* 高价值功能请求，旨在实现跨设备会话连续性和Bot群组聊天持久化，符合用户多设备切换的真实场景。
*   **#10421: Turn-level live time context** [21评论, 9赞] ([链接](https://github.com/NousResearch/hermes-agent/issues/10421))
    *   *热度原因：* 精准的时间感知是Agent可靠性的基础，此功能请求获得了大量用户点赞。

## 5. Bug 与稳定性
### 🔴 P1 严重Bug
*   **#100401: cron fire-claim heartbeat deadlocks** ([链接](https://github.com/NousResearch/hermes-agent/issues/100401))
    *   *描述：* Cron作业在运行超过60秒时，会被错误地标记为“Interrupted by shutdown”，导致大量长时间运行的任务失败。
    *   *状态：* Open，需紧急修复。
*   **#58576: web_server event loop stalls up to 51s** ([链接](https://github.com/NousResearch/hermes-agent/issues/58576))
    *   *描述：* 在重型Agent工作负载下，桌面UI完全冻结超过50秒，严重影响用户体验。
    *   *状态：* Open。
*   **#80125: weixin adapter error misreported** ([链接](https://github.com/NousResearch/hermes-agent/issues/80125))
    *   *描述：* 微信适配器将`prepare failed`错误误报为`rate limited`，掩盖了真实原因（缺少context_token），阻碍故障排查。
    *   *状态：* Open。
*   **#102792: Desktop new session loses owner metadata** ([链接](https://github.com/NousResearch/hermes-agent/issues/102792))
    *   *描述：* 在多Profile安装中，通过项目侧边栏“+”创建的新会话会丢失所有主数据，导致立即报错“Couldn't open this session”。
    *   *状态：* Open，直接影响Desktop核心功能。
*   **#71335: Concurrent agent processes corrupt MCP OAuth grants** ([链接](https://github.com/NousResearch/hermes-agent/issues/71335))
    *   *描述：* 并发Agent进程共享HERMES_HOME时，由于缺乏跨进程锁，导致MCP OAuth令牌（如Notion）损坏。
    *   *状态：* Open，涉及安全与状态一致性。

### 🟡 P2 重要Bug
*   **#106665: desktop rendering/click issues at 125% scaling** ([链接](https://github.com/NousResearch/hermes-agent/issues/106665)) - Windows缩放适配问题。
*   **#84361: Desktop MEDIA file links dead** ([链接](https://github.com/NousResearch/hermes-agent/issues/84361)) - 媒体文件链接点击无效，路径构建有缺陷。
*   **#95459: in-app browser rejects agent actions after restart** ([链接](https://github.com/NousResearch/hermes-agent/issues/95459)) - 重启后浏览器预览面板无法接受Agent操作。
*   **#20548: Feishu root_id fallback causes threaded replies** ([链接](https://github.com/NousResearch/hermes-agent/issues/20548)) - 飞书适配器线程ID处理逻辑错误。
*   **#107288: Desktop plugin module cycle** ([链接](https://github.com/NousResearch/hermes-agent/issues/107288)) - 近期重构导致运行时插件加载失败。
*   **#105104: Desktop Bot Mode sidebar click unresponsive** ([链接](https://github.com/NousResearch/hermes-agent/issues/105104)) - 侧边栏点击Bot无响应。
*   **#32047: agent-browser leaves orphaned Chrome processes** ([链接](https://github.com/NousResearch/hermes-agent/issues/32047)) - Windows上浏览器任务后进程泄漏。

### 🟢 已关闭Bug
*   **#9459 (CLOSED): feat(delegation) agent profiles for delegate_task** - 功能已实现。
*   **#81893 (CLOSED): HUD mode keyboard focus on macOS** - 已修复。
*   **#106179 (CLOSED): Console cancel leaves executor running** - 已修复。

## 6. 功能请求与路线图信号
*   **Codex/Web搜索集成：** [#19320](https://github.com/NousResearch/hermes-agent/issues/19320) 请求添加OpenAI Codex的`web.run`作为搜索提供者，反映了用户对原生AI搜索能力的强烈需求。
*   **跨平台会话共享：** [#4335](https://github.com/NousResearch/hermes-agent/issues/4335) 和 [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) 均指向跨网关/设备会话状态的一致性和持久化，这是多端协同的核心诉求。
*   **Turn-level时间感知：** [#10421](https://github.com/NousResearch/hermes-agent/issues/10421) 要求Agent在每个对话轮次都能获取准确的“现在”时间，而非仅在会话启动时获取。
*   **CLI会话管理增强：** [#56628](https://github.com/NousResearch/hermes-agent/pull/56628) 提议在TUI中扩展`/sessions`命令，支持删除、重命名和修剪，减少用户对CLI的依赖。
*   **可信Cron钩子：** [#93977](https://github.com/NousResearch/hermes-agent/pull/93977) 正在添加受信任的定时运行钩子，支持更复杂的调度编排。

## 7. 用户反馈摘要
*   **痛点：**
    *   **长任务中断误报：** 用户报告Cron作业因心跳机制被错误终止，导致重要后台任务失败 ([#100401](https://github.com/NousResearch/hermes-agent/issues/100401), [#105861](https://github.com/NousResearch/hermes-agent/issues/105861))。
    *   **Desktop稳定性：** 多Profile安装下创建新会话崩溃、Bot点击无响应、浏览器功能重启后失效等问题频发，严重影响桌面端用户体验 ([#102792](https://github.com/NousResearch/hermes-agent/issues/102792), [#105104](https://github.com/NousResearch/hermes-agent/issues/105104), [#95459](https://github.com/NousResearch/hermes-agent/issues/95459))。
    *   **资源泄漏：** 浏览器工具在Windows上产生数百个孤立Chrome进程，消耗大量资源 ([#32047](https://github.com/NousResearch/hermes-agent/issues/32047))。
    *   **错误信息误导：** 微信适配器错误码映射不当，隐藏了真正的配置问题 ([#80125](https://github.com/NousResearch/hermes-agent/issues/80125))。
*   **满意点：**
    *   用户对新功能（如委托代理Profile、集合智慧Agent）表现出浓厚兴趣。
    *   对TTS播放流畅度、成本核算准确性等细节改进给予正面反馈。

## 8. 待处理积压
*   **#66616: Skills index watchdog** - 基础设施类Bug，评论数极高（192），需优先解决以恢复技能库可用性。
*   **#88584: Automated Nous integration blocked** - 内部CI流程阻塞，影响开发效率。
*   **#78647: Godfile eradication** - 长期架构债务，需持续投入重构。
*   **#97681: Bot Group Chats persistence** - 高价值功能请求，当前开放状态，建议纳入后续路线图规划。
*   **#10421: Turn-level time context** - 基础能力增强，用户呼声高，建议优先实现。
*   **#107288: Desktop plugin module cycle** - 近期引入的回归Bug，影响所有运行时插件，需尽快修复。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-09-11

> 数据来源：GitHub Issues / PRs（过去 24 小时）
> 分析周期：2026-09-10 00:00 ~ 2026-09-11 00:00

---

## 1. 今日速览

AstrBot 昨日保持**高活跃状态**：25 条 PR、15 条 Issue，社区贡献密度可观。核心改进聚焦于 **Cron/定时任务模型回退链路修复**（#10040、#10028、#10008 三 PR 联动）、**知识库 RateLimiter 并发竞争修复**（#10015）、以及 **飞书/Lark 私聊文件发送兜底**（#10018）。另有 1 个中长期大 PR #9703（统一图片规范化到 PNG）仍在 review 中。整体健康度：**良好**，bug 修复占比高，功能扩展平稳。

---

## 2. 版本发布

**无新版本发布。** 最近一次公开版本为 v4.28.0，当前仍处于该版本的迭代维护期。

---

## 3. 项目进展

### 已合并/关闭的重要 PR（13 条）

| PR | 作者 | 摘要 | 状态 |
|----|------|------|------|
| [#10015](https://github.com/AstrBotDevs/AstrBot/pull/10015) | @L4XB | 修复知识库 URL 清洗时 `asyncio.gather` + 共享 `RateLimiter` 导致并发等待者同时醒来、集中发请求的 bug | ✅ 已合并 |
| [#10025](https://github.com/AstrBotDevs/AstrBot/pull/10025) | @camera-2018 | 修复 `skills_like` + 流式回复时工具 schema re-query 返回普通 assistant 文本但用户收不到的问题 | ✅ 已合并 |
| [#10037](https://github.com/AstrBotDevs/AstrBot/pull/10037) | @PyuraMazo | 增强 slider 配置项数值校验健壮性，修复文本域可超限问题，增加边界标注 | ✅ 已合并 |
| [#10036](https://github.com/AstrBotDevs/AstrBot/pull/10036) | @Soulter | 排除 dashboard 构建产物（ZIP/artifact）进入 PyPI 源码包，避免冗余分发 | ✅ 已合并 |
| [#10034](https://github.com/AstrBotDevs/AstrBot/pull/10034) | @Soulter | 优化 dashboard 打包体积：仅保留 WOFF2 字体源，改用 Mermaid ESM 入口替代 UMD 重复包 | ✅ 已合并 |
| [#10023](https://github.com/AstrBotDevs/AstrBot/pull/10023) | @Soulter | Workspace 源码预览复用 Shiki 高亮器，支持语言检测与 GitHub 明暗主题 | ✅ 已合并 |
| [#10018](https://github.com/AstrBotDevs/AstrBot/pull/10018) | @NayukiChiba | Lark 私聊发送文件时，open ID 失败自动 fallback 到 chat ID，修复 230101 错误 | ✅ 已合并 |
| [#10021](https://github.com/AstrBotDevs/AstrBot/pull/10021) | @Soulter | ChatUI 设置整合到统一对话框，优化 composer 布局与流式回复滚动体验 | ✅ 已合并 |
| [#7849](https://github.com/AstrBotDevs/AstrBot/pull/7849) | @Alkapuce | QQ 官方主动消息（cron/send_by_session）使用 markdown payload 而非纯文本 | ✅ 已合并 |
| [#9669](https://github.com/AstrBotDevs/AstrBot/pull/9669) | @SweetenedSuzuka | 关闭 OpenAI SDK 内建重试（`max_retries=0`），避免与 AstrBot 重试层叠加导致请求翻倍 | ✅ 已合并 |
| [#9495](https://github.com/AstrBotDevs/AstrBot/pull/9495) | @sjh9714 | 修复 TTS/文转图 fallback 后 pipeline 未 yield 导致下游中断的问题 | ✅ 已合并 |

### 进行中的关键 PR（12 条待合并）

- **#10040** (@he-yufeng) — Cron 定时任务继承 `fallback_provider_ids`，修复主模型失败无法切换备用模型的 bug（关联 #10026）
- **#10039** (@wutongyuonce) — 知识库支持 `.pptx` 上传（关联 #10038）
- **#10031** (@nina-ysml) — QQ 官方适配器内联图片到 Markdown 消息，修复图文顺序颠倒（关联 #10019）
- **#10028** (@beemines) — 恢复 session 级模型回退对主动 Agent 的支持（关联 #10026）
- **#10004** (@w31r4) — 统一 `/new` 与 `/reset` 命令行为
- **#10022** (@Soulter) — ChatUI 增加标签页式 Workspace 与 PDF 预览
- **#9703** (@piexian) — **[大 PR]** 统一将多模态输入图片规范化为 PNG，动图转为单张 3×3 拼盘（关联 #9295，size: XL）
- **#9956** (@he-yufeng) — 修复命令别名参数被静默丢弃的 bug

> **进度评估**：昨日 13 条 PR 被合并/关闭，其中 8 条直接修复用户报告的 bug，2 条性能/体积优化，3 条功能增强。项目整体向前推进显著，尤其在 **定时任务可靠性** 和 **多平台适配器兼容性** 两个关键领域。

---

## 4. 社区热点

### 最活跃 Issue（按评论数排序）

| Issue | 类型 | 评论数 | 摘要 | 链接 |
|-------|------|--------|------|------|
| [#9980](https://github.com/AstrBotDevs/AstrBot/issues/9980) | Bug | 7 | Active Agent Cron 重复调用工具后仍显示 completed，状态机不一致 | [🔗](https://github.com/AstrBotDevs/AstrBot/issues/9980) |
| [#9989](https://github.com/AstrBotDevs/AstrBot/issues/9989) | Bug | 6 | 飞书私聊用 open_id 发送文件报 230101 错误（已修复 #10018） | [🔗](https://github.com/AstrBotDevs/AstrBot/issues/9989) |
| [#10009](https://github.com/AstrBotDevs/AstrBot/issues/10009) | Bug | 4 | NapCat 4.18.19 与 AstrBot v4.28.0 部分插件不兼容（防撤回、万能解析器） | [🔗](https://github.com/AstrBotDevs/AstrBot/issues/10009) |
| [#9893](https://github.com/AstrBotDevs/AstrBot/issues/9893) | 咨询 | 3 | 知识库上传 `__pycache__` 导致发布空间被封，如何解除 | [🔗](https://github.com/AstrBotDevs/AstrBot/issues/9893) |

### 热点分析

1. **Cron/定时任务可靠性**是社区最大痛点（#9980、#10026、#10008 三条独立报告指向同一类问题）。用户依赖定时 Agent 执行自动化任务，但模型失败时状态机未正确更新，导致"假完成"现象。#10040 和 #10028 正在修复此问题。

2. **多平台适配器兼容性**持续高频出现：飞书（#9989）、NapCat/QQ（#10009）、Telegram（#10027、#10029）。说明 AstrBot 在多平台支持上用户基数大，但适配器层稳定性需持续投入。

3. **知识库并发限流**（#9995）触发了对 `asyncio.gather` + 共享 `RateLimiter` 设计缺陷的发现，#10015 已修复。这是典型的"高并发场景下时序竞争"bug。

---

## 5. Bug 与稳定性

### 严重 Bug（按严重程度排列）

| Issue | 描述 | 严重级别 | Fix PR | 状态 |
|-------|------|----------|--------|------|
| [#10026](https://github.com/AstrBotDevs/AstrBot/issues/10026) | Future Task / Cron 主模型失败时无法切换到备用模型，任务直接报错结束 | 🔴 高 | #10040、#10028（进行中） | ⏳ 有 PR |
| [#9980](https://github.com/AstrBotDevs/AstrBot/issues/9980) | Cron 定时任务工具调用失败后状态仍显示 completed，掩盖真实错误 | 🔴 高 | 无 | ❌ 待处理 |
| [#10029](https://github.com/AstrBotDevs/AstrBot/issues/10029) | v4.28.0 系统内置指令 `/ls` 不兼容，报错 | 🟡 中 | 无 | ❌ 待处理 |
| [#10027](https://github.com/AstrBotDevs/AstrBot/issues/10027) | Telegram 适配器轮询频繁报错占满日志 | 🟡 中 | 无 | ❌ 待处理 |
| [#10024](https://github.com/AstrBotDevs/AstrBot/issues/10024) | skills_like + 流式回复时工具调用完成后用户收不到最终回答 | 🟡 中 | #10025 ✅ | ✅ 已修复 |
| [#9995](https://github.com/AstrBotDevs/AstrBot/issues/9995) | 知识库 URL 清洗 RateLimiter 并发竞争导致请求间隔失效 | 🟡 中 | #10015 ✅ | ✅ 已修复 |
| [#10033](https://github.com/AstrBotDevs/AstrBot/issues/10033) | `<system_reminder>` 每轮写入对话历史不清理，上下文线性增长 | 🟡 中 | 无 | ❌ 待处理 |
| [#10035](https://github.com/AstrBotDevs/AstrBot/issues/10035) | 尖括号定界符与用户内容冲突，影响消息结构解析 | 🟡 中 | 无 | ❌ 待处理 |

### 稳定性评估

- **高危 bug 占比**：2/8 严重 bug 已有 fix PR（25%），但 #9980（Cron 状态机假完成）仍无修复，建议优先处理。
- **回归风险**：v4.28.0 引入的 `/ls` 指令报错（#10029）和 Telegram 适配器轮询异常（#10027）可能是近期重构的副作用，需回归测试。
- **已修复 bug**：#10024（skills_like 流式回复）、#9995（RateLimiter 并发）、#9989（飞书文件发送）均已通过 PR 修复。

---

## 6. 功能请求与路线图信号

| Issue | 需求描述 | 关联 PR | 纳入下一版本可能性 |
|-------|----------|---------|-------------------|
| [#10038](https://github.com/AstrBotDevs/AstrBot/issues/10038) | 知识库支持 `.pptx` 文件上传 | #10039（进行中） | ⭐⭐⭐ 高（同路径扩展） |
| [#10019](https://github.com/AstrBotDevs/AstrBot/issues/10019) | QQ 官方适配器支持 Markdown + 内联图片，修复图文顺序 | #10031（进行中） | ⭐⭐⭐ 高（用户痛点强） |
| [#10030](https://github.com/AstrBotDevs/AstrBot/issues/10030) | 数据与日志界面增加"编辑对话"功能 | 无 | ⭐⭐ 中（UI 调整，成本低） |
| [#10016](https://github.com/AstrBotDevs/AstrBot/issues/10016) | WebChat 默认显示思考过程（流式） | 无 | ⭐⭐ 中（可选功能） |
| [#9703](https://github.com/AstrBotDevs/AstrBot/pull/9703) | 统一将输入图片规范化为 PNG，动图转拼盘 | — | ⭐⭐⭐ 高（已 Review 中，XL 规模） |
| [#10004](https://github.com/AstrBotDevs/AstrBot/pull/10004) | 统一 `/new` 与 `/reset` 命令行为 | — | ⭐⭐⭐ 高（体验一致性） |

### 路线图信号解读

1. **知识库多格式支持**：`.pptx` 加入是 MarkItDown 路径的自然扩展，#10039 已准备就绪。
2. **多平台适配增强**：QQ 官方 Markdown 支持（#10031）和 Lark 私聊兜底（#10018）显示团队在补强各平台体验。
3. **图片规范化**（#9703）是中长期技术债清理，解决多模态模型兼容性痛点，预计下一大版本纳入。
4. **ChatUI 体验优化**（#10021、#10022、#10023）持续迭代，workspace 预览和 settings 整合是用户高频需求。

---

## 7. 用户反馈摘要

### 真实痛点

1. **"定时任务假完成"掩盖真实错误**（#9980、#10026）
   - 用户依赖 Cron 执行自动化 Agent 任务，模型失败时任务仍显示 completed，导致"任务成功但实际失败"的静默错误。
   - 场景：定时 QQ 私聊推送、后台数据抓取。

2. **多平台适配器稳定性不足**
   - 飞书：open_id 发文件报 230101 错误（#9989）
   - NapCat：v4.18.19 与 AstrBot v4.28.0 插件不兼容（#10009）
   - Telegram：轮询频繁报错占满日志（#10027）
   - QQ 官方：图文顺序颠倒（#10019）

3. **知识库高并发限流失效**（#9995）
   - 600 RPM 配置下，`asyncio.gather` 并发请求时 RateLimiter 未能维持间隔，触发上游限流。

4. **流式回复与工具调用脱节**（#10024）
   - `skills_like` + 流式回复时，模型生成了最终答案但用户未收到，只看到"我去查一下"等过程话术。

### 用户满意度

- **正面**：Dashboard 体积优化（#10034）、Shiki 代码高亮（#10023）、settings 整合（#10021）等 UX 改进获认可。
- **负面**：v4.28.0 引入的 `/ls` 指令报错（#10029）和 Telegram 适配器轮询异常（#10027）明显是回归，影响日常使用。

---

## 8. 待处理积压

### 长期未响应的重要 Issue

| Issue | 创建时间 | 评论数 | 摘要 | 风险 |
|-------|----------|--------|------|------|
| [#9980](https://github.com/AstrBotDevs/AstrBot/issues/9980) | 2026-09-08 | 7 | Cron 定时任务工具调用失败后状态仍显示 completed | 🔴 高 — 影响自动化任务可靠性 |
| [#10029](https://github.com/AstrBotDevs/AstrBot/issues/10029) | 2026-09-10 | 0 | v4.28.0 系统内置指令 `/ls` 不兼容 | 🟡 中 — 回归 bug，影响基础功能 |
| [#10027](https://github.com/AstrBotDevs/AstrBot/issues/10027) | 2026-09-10 | 0 | Telegram 适配器轮询频繁报错占满日志 | 🟡 中 — 影响 Telegram 用户 |
| [#10033](https://github.com/AstrBotDevs/AstrBot/issues/10033) | 2026-09-10 | 0 | `<system_reminder>` 每轮写入对话历史不清理，上下文线性增长 | 🟡 中 — 长期运行 token 浪费 |
| [#10035](https://github.com/AstrBotDevs/AstrBot/issues/10035) | 2026-09-10 | 0 | 尖括号定界符与用户内容冲突，影响消息结构解析 | 🟡 中 — 边界 case 兼容性 |

### 维护者行动建议

1. **优先级 P0**：合并 #10040 和 #10028，修复 Cron 模型回退链路；跟进 #9980 状态机假完成问题。
2. **优先级 P1**：回归测试 v4.28.0，修复 #10029（`/ls` 指令）和 #10027（Telegram 轮询）。
3. **优先级 P2**：评估 #10033（system_reminder 清理）和 #10035（定界符冲突）的修复方案。
4. **长期**：持续 Review #9703（图片规范化）和 #10039（PPTX 支持），预计纳入下一版本。

---

## 附录：项目健康度指标

| 指标 | 数值 | 评估 |
|------|------|------|
| 过去 24h Issue 新增 | 15 条 | ⭐⭐⭐ 活跃 |
| 过去 24h PR 提交 | 25 条 | ⭐⭐⭐ 活跃 |
| Bug 修复率（已合并/关闭） | 13/25 (52%) | ⭐⭐ 良好 |
| 高危 Bug 有 PR 覆盖率 | 2/3 (67%) | ⭐⭐ 良好 |
| 平均 Issue 评论数 | 2.1 条 | ⭐⭐ 中等互动 |
| 新版本发布 | 0 个 | — |

> **总体评估**：AstrBot 项目社区活跃、贡献密度高，bug 修复响应及时。建议在 next release 前完成 Cron 状态机 (#9980) 和 v4.28.0 回归问题 (#10029、#10027) 的修复，以提升稳定性口碑。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：2026-09-11** | 数据周期：2026-09-10 ~ 2026-09-11

---

## 1. 今日速览

DeepSeek Harness 在过去 24 小时内保持中等活跃度，共更新 **192 条 Discussions**。项目刚发布 **v0.1.5-rc.2**（体验优化补丁）和 **v0.1.5-rc.1**（里程碑式大版本，含多标签 Sidebar、任意文件上传、DeepSeek-V41-Flash 模型适配等核心功能）。社区讨论集中在**长会话加载失败**（v0 迁移兼容性问题）和**模型假报上下文耗尽**等稳定性问题上，两个问题均已有用户报告且仍在排查中，无官方 fix PR 合并记录。整体项目健康度：**功能迭代快，但版本迁移存在兼容性阵痛，需关注热修复节奏**。

---

## 2. 版本发布

### v0.1.5-rc.2 — 体验优化补丁（本次合并上线）

**链接：** [Changelog](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.1.5-rc.2)

| 优化项 | 说明 | 作者 |
|--------|------|------|
| 反馈提交体验 | 点赞/点踩均通过弹窗确认后提交；提交失败时保留已填内容并提示 | @yixiangihsiang |
| 文件卡片排版 | 优化交付文件卡片布局与对话间距，刷新代码文件图标，界面更紧凑 | @yixiangihsiang |

**破坏性变更：** 无。

**迁移注意：** 无特殊迁移要求。

---

### v0.1.5-rc.1 — 里程碑大版本（含以下合并功能）

**链接：** [Changelog](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.1.5-rc.1)

#### 新增功能

| 功能 | 说明 | 作者 |
|------|------|------|
| DeepSeek-V41-Flash 模型适配器 | 支持文本、图片及会话历史中的系统提示词更新；新会话默认使用该模型，配置显式指定时优先配置值 | @LegGasai |
| 任意类型通用文件上传 | 文件与图片可在同一预览区混排；后台上传支持进度、取消与会话切换续显；模型可通过已保存路径使用文件工具按需读取 | @CreatixChu |
| 子代理消息队列操作 | 可继续对话的子代理支持消息排队、编辑、删除、单条或全部 Steer 与停止操作；排队中显示"发送中"并暂不可编辑 | @Dudu-0223, @LegGasai |
| 动态修改系统提示词 | 支持不破坏 KV Cache 的动态修改，模型需显式声明支持 | @tianyicui |
| 右侧多标签 Sidebar | 支持多标签、分栏、全屏及 Markdown/代码/HTML/PDF/图片预览（含子代理和未激活会话的文件）；原 Detail 面板已移除 | @imccyu, @Yifffan, @yixiangihsiang 等 |
| 自定义模型探测 | 新增对自定义模型提供商 `models` 对象和 Anthropic 原生模型列表的支持，支持回填模型名称、上下文窗口及最大输出 token | @LegGasai |
| 代理退出网络代理跟随 | 所有出站请求遵循 `HTTP_PROXY`/`HTTPS_PROXY`/`ALL_PROXY`/`NO_PROXY` 环境配置 | @LegGasai |
| 顶栏"在应用中打开" | 可用已安装的编辑器、IDE、终端或文件管理器等打开 Workspace | @yixiangihsiang |
| 独立反馈提交 | 支持 `/feedback` 命令提交明细反馈内容并附带会话内容，无需继续对话 | @tianyicui, @Chinesezjc, @CreatixChu |

#### 体验优化

| 优化项 | 说明 | 作者 |
|--------|------|------|
| 图片嵌套显示 | Web 可直接显示顶层及 PTC 嵌套 `read_image` 的图片结果及本地图片引用 | @Chinesezjc, @kermanx |
| Skill 模糊搜索 | Skill 选择器支持模糊搜索；优化聊天气泡中的 Skill 和命令引用 | @LegGasai |
| 链接样式优化 | 调整可点击链接颜色、hover/focus 样式和分类图标，提升 Markdown 链接/文件引用/Workflow 成员链接辨识度 | @yixiangihsiang |
| Windows 子进程静默 | Windows 上的本地非终端子进程不再弹出控制台窗口 | @turtle1999 |
| Agent Team 消息语义 | `send_message` 统一采用 steer 语义，跨 Agent 和冷恢复投递保留发送者归属与顺序 | @Dudu-0223 |
| 长会话性能改善 | 改善长会话打开、恢复和持续对话时的卡顿，降低内存占用 | @imccyu, @tianyicui, @Dudu-0223 |
| 会话内容按需读取 | 引用较长会话时模型可按需读取预览中未展示的内容 | @tianyicui |

**破坏性变更：**
- **移除 Detail 面板**：右侧 Sidebar 替代了原有的 Detail 面板，老会话格式可能因字段变化导致加载失败（见 Bug 与稳定性 第1条）。
- **会话格式升级**：从 v0.1.1 升级至 v0.1.5 后，部分旧格式会话无法加载（`@deepseek-ai/dsh-session-format-v0-to-v1 refuses this format`）。

**迁移注意：**
1. 用户报告升级后 **15/35 个旧会话打不开**，原因包括权限设置多余字段、`preset origin` 和 `flat pi-ai replayState` 等不再使用的字段被严格拒绝（[Discussion #6151](https://github.com/deepseek-ai/deepseek-harness/discussions/6151)、[#5818](https://github.com/deepseek-ai/deepseek-harness/discussions/5818)）。
2. 建议用户在升级前备份旧会话数据，或等待官方提供格式转换工具。

---

## 3. 项目进展

| 进展项 | 说明 |
|--------|------|
| **本次发版合并** | v0.1.5-rc.1 和 v0.1.5-rc.2 合计上线了 **9 项新功能 + 7 项体验优化**，涵盖模型适配、文件管理、子代理控制、Sidebar 重构、代理配置等核心能力，项目整体向前推进了一个大版本量级。 |
| **Sidebar 重构** | 右侧多标签 Sidebar 替代原 Detail 面板，是本次发版最大的 UI 架构变更，标志着 DSH Web 端从单面板向多标签工作流演进。 |
| **模型生态扩展** | DeepSeek-V41-Flash 默认适配 + 自定义模型探测能力，扩展了 DSH 的模型兼容范围。 |
| **无 PR 合并记录** | 项目未启用 Issues/PRs，所有功能落地通过 Releases changelog 体现。 |

---

## 4. 社区热点

| 排名 | 话题 | 评论数 | 链接 | 分析 |
|------|------|--------|------|------|
| 1 | **dsh-vault 加密凭据保险库插件** | 245 | [#1457](https://github.com/deepseek-ai/deepseek-harness/discussions/1457) | 社区用户对敏感凭据（SSH Key、API Token、TOTP）加密存储需求强烈，这是评论数最多的议题，反映 DSH 在安全场景下的扩展潜力。 |
| 2 | **Output token limit reached 错误** | 17 | [#1166](https://github.com/deepseek-ai/deepseek-harness/discussions/1166) | 用户反复遇到上下文预算耗尽问题，结合 Discussion #6123 可知部分原因是模型假报上下文已满（实际仅占 50%），属于模型幻觉与 harness 校验缺失的交互问题。 |
| 3 | **插件生态增速图表上线** | 16 | [#2773](https://github.com/deepseek-ai/deepseek-harness/discussions/2773) | 社区非官方工具 mydsh.dev 展示了插件生态 3 天翻 3.5 倍的增速，激发用户对插件市场的关注度。 |
| 4 | **定时任务社区插件** | 11 | [#1600](https://github.com/deepseek-ai/deepseek-harness/discussions/1600) | 用户提出"到点自动跑"的需求，社区已开发 `dsh-schedule-tasks` 插件（5 段式 cron 解析 + 侧边栏任务面板），反映 DSH 在自动化工作流场景的延伸需求。 |
| 5 | **tool-cordis 进程全局限制** | 7 | [#4675](https://github.com/deepseek-ai/deepseek-harness/discussions/4675) | 两个 cordis-based preset 无法在同一进程中共存，暴露了插件架构的进程级单例限制，影响多预设用户。 |

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | Bug 描述 | 评论数 | 链接 | Fix 状态 |
|----------|----------|--------|------|----------|
| 🔴 **高** | **v0 会话迁移失败**：升级到 v0.1.5 后部分旧会话无法打开，报错 `refuses this format v0 Session`；用户报告 15/35 个会话受影响，涉及权限设置多余字段、preset origin、flat replayState 等 | 20+ | [#6151](https://github.com/deepseek-ai/deepseek-harness/discussions/6151)、[#5818](https://github.com/deepseek-ai/deepseek-harness/discussions/5818) | ❌ 无 fix PR |
| 🔴 **高** | **模型假报上下文耗尽**：模型在上下文实际仅占 50% 时连续声称"上下文预算已耗尽"并调用 `update_goal action: blocked`，harness 接受该理由后注入 `<goal_blocked>` 指示写收尾消息 | 5 | [#6123](https://github.com/deepseek-ai/deepseek-harness/discussions/6123) | ❌ 无 fix PR |
| 🟡 **中** | **Runaway tool-call 参数耗尽输出预算**：模型产生异常的 `job_output` tool 参数，harness 允许流式传输直至耗尽全部输出配额后才报通用错误 | 9 | [#6059](https://github.com/deepseek-ai/deepseek-harness/discussions/6059) | ❌ 无 fix PR |
| 🟡 **中** | **分叉会话消息错位**：分叉后发送的消息实际是分叉前的错误消息，新输入消息被放入排队队列 | 8 | [#6141](https://github.com/deepseek-ai/deepseek-harness/discussions/6141) | ❌ 无 fix PR |
| 🟡 **中** | **ask_user_question 在自主轮次中可用**：goal 自主运行期间模型可调用 `ask_user_question` 并嵌套在 `run_code` 中，与预期行为不符 | 7 | [#6074](https://github.com/deepseek-ai/deepseek-harness/discussions/6074) | ❌ 无 fix PR |
| 🟢 **低** | **MSYS2 上 `dsh web` 启动失败**：exit code 127，无输出 | 9 | [#1624](https://github.com/deepseek-ai/deepseek-harness/discussions/1624) | ❌ 无 fix PR |
| 🟢 **低** | **无法新建对话**：更新到最新版本后用户反馈无法新建对话（具体原因待排查） | 5 | [#6119](https://github.com/deepseek-ai/deepseek-harness/discussions/6119) | ❌ 无 fix PR |

---

## 6. 功能请求与路线图信号

| 需求 | 来源 | 已有关联 | 纳入下一版本可能性 |
|------|------|----------|------------------|
| **加密凭据保险库** | Discussion #1457（245 条评论） | 社区插件 `dsh-vault` 已存在 | ⭐⭐⭐⭐ 高需求，官方可能借鉴或整合 |
| **定时任务能力** | Discussion #1600 | 社区插件 `dsh-schedule-tasks` 已实现 | ⭐⭐⭐ 中等，官方可能原生支持 |
| **文件类型扩展** | v0.1.5-rc.1 已支持任意类型文件上传 | 已合并 | ✅ 已完成 |
| **子代理消息队列** | v0.1.5-rc.1 已支持排队/编辑/删除/Steer | 已合并 | ✅ 已完成 |
| **Sidebar 多标签** | v0.1.5-rc.1 已上线 | 已合并 | ✅ 已完成 |
| **动态系统提示词** | v0.1.5-rc.1 已支持 KV Cache 友好的动态修改 | 已合并 | ✅ 已完成 |
| **模型探测扩展** | v0.1.5-rc.1 已支持自定义提供商和 Anthropic 原生列表 | 已合并 | ✅ 已完成 |

**路线图信号：** 项目正从"基础 agent 框架"向"企业级 AI 工作流平台"演进，安全（凭据保险库）、自动化（定时任务）、多模型兼容（DeepSeek-V41-Flash）是社区最关注的三大方向。

---

## 7. 用户反馈摘要

### 痛点
1. **旧会话丢失**：升级到 v0.1.5 后大量旧会话无法打开，用户焦虑且缺乏明确的迁移指南（[Discussion #6151](https://github.com/deepseek-ai/deepseek-harness/discussions/6151)）。
2. **上下文预算判断不准确**：模型假报上下文已耗尽导致会话意外终止，用户体验断裂（[Discussion #6123](https://github.com/deepseek-ai/deepseek-harness/discussions/6123)）。
3. **Runaway 参数无保护**：异常 tool-call 参数可耗尽全部输出配额后才报错，缺乏前置校验（[Discussion #6059](https://github.com/deepseek-ai/deepseek-harness/discussions/6059)）。
4. **分叉会话消息错位**：分叉后发送的消息错误，影响工作流连贯性（[Discussion #6141](https://github.com/deepseek-ai/deepseek-harness/discussions/6141)）。

### 满意点
1. **新 UI 紧凑美观**：文件卡片排版和对话间距优化获得用户认可。
2. **任意文件上传**：文件与图片混排预览能力受到开发者欢迎。
3. **多标签 Sidebar**：替代原 Detail 面板，提升多任务工作效率。
4. **社区插件生态活跃**：dsh-vault、dsh-schedule-tasks、dsh-rewind 等插件丰富了 DSH 能力边界。

---

## 8. 待处理积压

| 优先级 | Issue/Discussion | 创建时间 | 未响应时长 | 说明 |
|--------|------------------|----------|------------|------|
| P0 | [#6151](https://github.com/deepseek-ai/deepseek-harness/discussions/6151) - 旧会话加载失败 | 2026-09-10 | >1 天 | 影响约 43% 升级用户的会话数据可访问性，需紧急修复 v0 迁移逻辑 |
| P0 | [#5818](https://github.com/deepseek-ai/deepseek-harness/discussions/5818) - v0 迁移严格拒绝未知字段 | 2026-09-06 | >5 天 | 与 #6151 同源问题，提供详细错误列表 |
| P1 | [#6123](https://github.com/deepseek-ai/deepseek-harness/discussions/6123) - 模型假报上下文耗尽 | 2026-09-10 | >1 天 | 模型幻觉导致会话异常终止，需 harness 侧增加预算校验阈值 |
| P1 | [#6059](https://github.com/deepseek-ai/deepseek-harness/discussions/6059) - Runaway 参数耗尽输出预算 | 2026-09-09 | >2 天 | 缺少 tool-call 参数前置大小校验 |
| P2 | [#6141](https://github.com/deepseek-ai/deepseek-harness/discussions/6141) - 分叉会话消息错位 | 2026-09-10 | >1 天 | 排队队列与分叉逻辑交互缺陷 |
| P2 | [#1624](https://github.com/deepseek-ai/deepseek-harness/discussions/1624) - MSYS2 启动失败 | 2026-08-15 | >27 天 | 长期未响应的环境兼容问题 |

---

**报告生成时间：** 2026-09-11  
**数据来源：** DeepSeek Harness GitHub Discussions  
**活跃度评级：** 🟡 中等（24 小时 192 条讨论，版本发布驱动讨论高峰）

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*