# OpenClaw 生态日报 2026-07-03

> Issues: 196 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-07-03 05:26 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [qwenpaw](https://github.com/agentscope-ai/QwenPaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告



---

## 横向生态对比

# AI 智能体与个人 AI 助手开源生态横向对比分析报告

**分析日期：** 2026-07-03  
**数据来源：** Zeroclaw、Hermes-Agent 项目 GitHub 动态（完整监测）；OpenClaw、PicoClaw、QwenPaw 当日未监测到详细动态，部分分析基于已知项目背景推断。

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于 **高强度迭代冲刺期** 。以 Zeroclaw 和 Hermes-Agent 为代表的两大主力项目在过去 24 小时内合计产生超过 600 条 Issue 更新与 610 条 PR 动态，社区贡献者积极同时涌入安全修复、功能重构和跨平台适配。安全漏洞（SSRF、密钥泄露）被发现后得到快速响应，但跨平台兼容性（Windows、WSL2、QQBot）和基础设计债（多租户隔离、会话状态持久化）仍是普遍痛点。生态正分化为 **核心引擎夯实**与 **多平台场景覆盖** 两大主线，标准化与安全性成为所有项目的共同投入重心。

---

## 2. 各项目活跃度对比

| 项目 | 今日新/活跃 Issues | 今日 PR 动态（合并/关闭+待合并） | Release | 健康度评估 |
|------|-------------------|--------------------------------|---------|------------|
| **OpenClaw**（核心参照） | 未监测到动态 | 未监测到动态 | 无 | 推测为稳定期，但不可评估 |
| **Zeroclaw** | 34 新开 + 2 关闭 = 36 条 | 40 合并/关闭 + 71 待合并 = 111 条 | 无 | 较高：安全修复、编排重构均有实质推进，但 S0/S1 积压未清 |
| **PicoClaw** | 未提供数据 | 未提供数据 | — | 无法评估 |
| **QwenPaw** | 未提供数据 | 未提供数据 | — | 无法评估 |
| **Hermes-Agent** | 258 新/活跃（总数 302 更新） | 149 合并/关闭 + 351 待合并 = 500+ 条 | 无 | 良好：社区极度活跃，安全与适配修复密集，但待合并积压高 |

> 注：PicoClaw 与 QwenPaw 项目名称已出现，但今日无动态摘要，以下分析将以数据完整的 Zeroclaw 与 Hermes-Agent 为核心对比对象。

---

## 3. OpenClaw 在生态中的定位

- **地位：生态参照基准**。OpenClaw 被列为“核心参照”，项目命名也暗示其为 Zeroclaw 等衍生项目的基础。本日无动态更新，可能表明项目已进入稳定维护阶段，社区主要创新正通过分支 Zeroclaw 输出。
- **技术路线差异**：Zeroclaw 在保持兼容的同时，积极对 channel 编排进行重构（统一经 `ResolvedAgentExecution::resolve` 分流），并快速修补 SSRF 漏洞——这些动作暗示后者承担了**主动技术演进和安全加固**的角色，而 OpenClaw 更偏向“稳定基线”。
- **社区规模比较**：由于 OpenClaw 无公开动态，无法直接量化。从 Zeroclaw 单日 36 Issue、111 PR 的活跃度来看，其社区规模在同类引擎中已达到中等以上，但仍显著小于 Hermes-Agent（后者单日 Issue/PR 总量高出约 5 倍）。推测 OpenClaw 本体的社区参与度低于其衍生分支。

---

## 4. 共同关注的技术方向

以下需求在 Zeroclaw 与 Hermes-Agent 中同时涌现，反映行业共性：

| 技术方向 | 涉及项目 | 典型诉求 / Issue |
|----------|----------|------------------|
| **跨平台兼容性** | Zeroclaw、Hermes-Agent | • Zeroclaw: Win11 74 测试失败、WSL2 OOM（#7462, #5542）<br>• Hermes: QQBot 连接循环重试（#52914）、Telegram 按钮适配（#30037） |
| **安全加固** | Zeroclaw、Hermes-Agent | • Zeroclaw: 修复 SSRF 与 zip-bomb（#8637）<br>• Hermes: 修复 .env 密钥以明文写入磁盘（#48441）、浏览器私有页面绕过 (#57464) |
| **工具/插件可见性与标准化** | Zeroclaw、Hermes-Agent | • Zeroclaw: MCP 工具在 TUI 不可见（#8193）<br>• Hermes: 插件路由被系统函数硬编码覆盖（#31873）、统一路由钩子（#41190） |
| **会话状态与记忆管理** | Zeroclaw、Hermes-Agent | • Zeroclaw: 多租户独立环境变量（#8226）<br>• Hermes: 自动会话重置丢弃上下文（#12857）、可配置 memory 后端（#47349） |
| **用户界面可读性** | Hermes-Agent（Zeroclaw 未直接体现但相关） | • Hermes: Dashboard 主题衬线/细体字对比度差（#18080），已有 PR 增加 Nord 等主题（#40450） |

共性揭示了当前行业瓶颈：**工具生态的统一接口抽象、跨平台运行稳定性和用户端体验精细化**，是下一个增长阶段必须啃下的硬骨头。

---

## 5. 差异化定位分析

| 维度 | **Zeroclaw** | **Hermes-Agent** | PicoClaw（推测） | QwenPaw（推测） |
|------|--------------|------------------|------------------|------------------|
| **功能侧重** | 核心运行时编排 + 安全加固，v0.8.3 聚焦 agent 循环、工具执行、持久化内存 | 多平台集成（Discord/Telegram/QQ/Desktop），修复网关、适配器、UI 主题

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

**Zeroclaw 项目动态日报 · 2026-07-03**  
*数据来源：Zeroclaw GitHub 仓库（github.com/zeroclaw-labs/zeroclaw）*  
*分析时段：2026-07-02 至 2026-07-03*

---

## 1. 今日速览

过去 24 小时项目保持高强度迭代：共处理 **36 条 Issue**（其中 34 条新开/活跃，2 条关闭）和 **111 条 PR**（40 条合并/关闭，71 条待合并）。虽无正式版本发布，但安全修复（SSRF、zip‑bomb）、关键功能重构（channel orchestration）及大型功能 PR（OpenAI 端点、Goal Mode）均取得实质性合并或推进。社区反馈活跃，高严重性 Bug 与功能请求并存，项目整体健康度较高，但部分积压旧 Issue（尤其是 S0/S1 级）仍需加速响应。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

### 今日合并/关闭的重要 PR

| PR | 类型 | 摘要 | 影响 |
|----|------|------|------|
| [#8629](https://github.com/zeroclaw-labs/zeroclaw/pull/8629) | `refactor` | 将 channel 编排回流转发统一经过 `ResolvedAgentExecution::resolve` 拆分点 | 消除 #8179 与 #8011 之间的代码重复，提升 channel 路由的可维护性 |
| [#8637](https://github.com/zeroclaw-labs/zeroclaw/pull/8637) | `fix` | `skill_http` 拒绝 URL userinfo，关闭解析层 SSRF 漏洞 | 增强 HTTP skill 安全性，防止内网探测 |
| [#8305](https://github.com/zeroclaw-labs/zeroclaw/pull/8305) | `fix` | 修复 web dashboard 中 MCP 服务器工具列表不显示的问题 | 解决 #8302，补全 Web 管理界面与 agent 实际工具集的可见性缺口 |

### 推进中的里程碑信号

- 跟踪 Issue **#8071**（v0.8.3 runtime）、**#8073**（v0.8.3 可观测性/CI/文档）持续更新，多位贡献者在 agent 循环、工具执行、持久化内存等领域提交大型 PR（如 #8570、#8619、#8570 等），v0.8.3 合并窗口正在密集收拢。
- **#8621** 插件作者指南 PR 获外部整合者验证，对应的跟踪任务 **#8636** 今日被单独开辟，反映项目对第三方可接入性的重视。

---

## 4. 社区热点

| 排名 | Issue | 评论数 | 核心诉求 |
|------|-------|--------|----------|
| 1 | [#8193](https://github.com/zeroclaw-labs/zeroclaw/issues/8193) | 14 | MCP 工具在 TUI 会话中不可见，尽管 gateway API 能正常列出。工作流被阻塞，多位用户确认复现。 |
| 2 | [#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) | 13 | 工作区自动化和标签清理 RFC，已进行至 Rev.8，社区广泛讨论治理流程。 |
| 3 | [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | 7 | Windows 11 下 74 个测试失败，根源包括 Unix-only 命令、路径语义、控制台编码。CI 未覆盖 Windows 运行，用户强烈要求扩充。 |
| 4 | [#5542](https://github.com/zeroclaw-labs/zeroclaw/issues/5542) | 6 | WSL2 中连续 OOM（严重度 S0），进程被 kernel 杀死，四月报告至今仍未修复。 |
| 5 | [#8226](https://github.com/zeroclaw-labs/zeroclaw/issues/8226) | 5 | 要求为 agent 提供独立环境变量配置（runtime_context / runtime_secrets），以解决多租户 token 隔离问题。 |

**分析**：前端/CLI 功能一致性（MCP 工具不可见）是当前最困扰用户的问题；Windows 兼容性缺失正在成为阻碍非 Linux 用户的门槛；安全与多租户、OOM 等基础稳定性问题是社区最焦虑的隐患。

---

## 5. Bug 与稳定性

### 按严重程度排列

| 严重度 | Issue | 描述 | 状态 |
|-------|-------|------|------|
| **S0** | [#5542](https://github.com/zeroclaw-labs/zeroclaw/issues/5542) | WSL2 连续 O

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>



</details>

<details>
<summary><strong>qwenpaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>



</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

好的，作为AI智能体与个人AI助手领域的开源项目分析师，现根据您提供的 Hermes-Agent 项目 GitHub 数据，为您生成 2026-07-03 的项目动态日报。

---

### **Hermes-Agent 项目动态日报 (2026-07-03)**

**数据分析周期：** 2026-07-02 至 2026-07-03

---

#### **1. 今日速览**

今日项目活跃度极高，社区贡献者表现活跃。过去24小时内，共产生 **302 条 Issue** 和 **500 条 PR** 更新，其中 **258 个新/活跃 Issue** 和 **351 个待合并 PR**，显示出社区在发现问题和提交解决方案方面非常积极。**修复类PR数量显著增加**，特别是针对网关（Gateway）连接、安全边界和会话状态持久化等核心稳定性问题。尽管没有新版本发布，但高频的代码提交和问题修复表明项目维护工作密集，整体健康度良好。

#### **2. 版本发布**

无。在过去24小时内，项目未发布新的版本。

#### **3. 项目进展**

今日合并/关闭的 **149 个 PR** 解决了多项关键技术债务和Bug修复，项目在稳定性和安全性方面迈出了坚实的一步。

*   **关键安全与稳定性修复**：
    *   `#57382 [CLOSED] fix(auxiliary): cap OpenRouter max tokens`：修复了辅助调用（如标题生成）在回退到 OpenRouter 时未正确限制 `max_tokens` 导致成本激增的问题。[`#57382`](https://github.com/NousResearch/hermes-agent/pull/57382)
    *   `#57380 [CLOSED] fix(gateway): keep runtime files in process home`：解决了网关运行时文件在切换配置文件后被错误写入命名配置文件目录，导致进程状态管理混乱的问题。[`#57380`](https://github.com/NousResearch/hermes-agent/pull/57380)
    *   `#57463 [CLOSED] fix(discord): honor pairing store in guild mentions and slash auth`：修复了在 Discord 公会频道中，通过 Pairing 机制授权的用户被忽略的认证问题，确保了授权策略的一致性。[`#57463`](https://github.com/NousResearch/hermes-agent/pull/57463)
    *   `#57523 [CLOSED] fix(web-server): strip _HERMES_GATEWAY from spawned management subprocesses`：解决了桌面端“重启网关”按钮因环境变量污染而静默失败的问题。[`#57523`](https://github.com/NousResearch/hermes-agent/pull/57523)

*   **平台兼容性修复**：
    *   `#30037 [CLOSED] fix: improve telegram clarify choice buttons`：改进了Telegram上“澄清”选项按钮的显示，使其更直观且符合平台限制。[`#30037`](https://github.com/NousResearch/hermes-agent/pull/30037)

#### **4. 社区热点**

今日社区讨论焦点集中在 **用户界面体验**和 **平台适配 (尤其QQBot)** 问题上。

*   **🔥 最受期待的功能：Dashboard 主题改进**
    *   `#18080 [Feature] Improved Themes for Dashboard - currently hard to read`：以 **26条评论**、**45个赞** 高居榜首。用户强烈反馈当前内置主题（如Midnight, Ember）在字体、颜色对比度上存在严重可读性问题，尤其是衬线字体和细体字在低对比度下难以辨认。这反映了用户对基础UI可用性的迫切需求。[`#18080`](https://github.com/NousResearch/hermes-agent/issues/18080)
    *   **关联PR**: `#40450 feat(desktop): add Nord, Solarized, and Catppuccin theme presets` 已开放，显示贡献者正积极回应社区需求。[`#40450`](https://github.com/NousResearch/hermes-agent/pull/40450)

*   **📚 最受关注的技术问题：QQBot 适配器修复**
    *   `#52914 [Bug] QQBot adapter.connect() missing is_reconnect parameter causes infinite retry loop`：该Bug导致QQBot通道无法连接并陷入无限重试循环，吸引了 **12条评论**。该问题催生了至少2个修复PR (`#53443`, `#57537`)，展示了社区对即时通讯平台稳定性的高度关注。[`#52914`](https://github.com/NousResearch/hermes-agent/issues/52914)

*   **💡 高潜力的新功能请求：桌面客户端独立安装模式**
    *   `#38602 [Feature] Desktop Client-Only Installation`：获得 **37个赞**、8条评论。用户希望桌面端能作为纯客户端连接远程Hermes实例，而非每次启动都强制引导安装完整的Agent运行时。这表明社区中存在对“客户端-服务器”架构的强烈需求场景。[`#38602`](https://github.com/NousResearch/hermes-agent/issues/38602)

#### **5. Bug 与稳定性**

今日报告的Bug主要集中在网关连接、会话管理和工具链兼容性方面，多个严重问题已有PR修复。

*   **严重 (P0/P1)**
    *   **终端凭据泄露**: `#48441 [CLOSED] [Security] Terminal session snapshots leak .env secrets to disk in plaintext`。这是一个P1级别的安全问题，终端快照机制将`.env`中的密钥以明文写入磁盘，对系统安全构成直接威胁。该问题已关闭，表明已通过某种方式解决。[`#48441`](https://github.com/NousResearch/hermes-agent/issues/48441)
    *   **浏览器安全绕过**: `#57464 [OPEN] [Security] fix(browser): apply private-page guard to browser_cdp frame_id routing`。针对云端浏览器会话的私有页面保护逻辑存在绕过风险，跨域路由可能被恶意利用。已有修复PR提交。[`#57464`](https://github.com/NousResearch/hermes-agent/pull/57464)

*   **中等 (P2)**
    *   **QQBot 连接崩溃**: `#52914 [OPEN] [Bug] QQBot adapter.connect() missing is_reconnect parameter`。影响面广，导致QQBot功能完全不可用。已有高质量修复PR `#57537`。[`#52914`](https://github.com/NousResearch/hermes-agent/issues/52914)
    *   **插件路由绕过**: `#31873 [OPEN] [Bug] check_web_api_key() hardcodes built-in backends`。第三方Web搜索插件被系统函数静默禁用，导致用户无法使用自定义搜索引擎。这是一个典型的生态构建兼容性问题。[`#31873`](https://github.com/NousResearch/hermes-agent/issues/31873)
    *   **会话上下文丢失**: `#12857 [OPEN] [Bug] Auto-reset in gateway discards context`。自动会话重置后，历史上下文丢失，导致新对话无法关联此前状态。影响用户体验连续性。[`#12857`](https://github.com/NousResearch/hermes-agent/issues/12857)
    *   **TUI命令处理错误**: `#44456 [OPEN] [Bug] Desktop /compress returns "not a quick/plugin/skill command: compress"`。内建命令`/compress`在桌面端被错误识别，功能无法使用。已有修复PR `#57530`。[`#44456`](https://github.com/NousResearch/hermes-agent/issues/44456)

#### **6. 功能请求与路线图信号**

今日功能请求主要围绕 **个性化配置**、 **生态集成** 和 **可观测性** 三大方向。

*   **个性化与界面**：
    *   **可配置的记忆系统**: `#47349` 提议将硬盘编码的 `memory.md` 文件重命名为 `rules.md`，并提供可配置的后端（如使用 `honcho/fact_store`）。这表明用户对AI个性化控制有更深层次的需求。[`#47349`](https://github.com/NousResearch/hermes-agent/issues/47349)
    *   **更多主题预设**: `#18080` 和 `#40450 PR` 结合来看，标准化的、高可读性的主题色彩方案（如Nord, Solarized）几乎确定会进入下一版本。[`#18080`](https://github.com/NousResearch/hermes-agent/issues/18080) [`#40450`](https://github.com/NousResearch/hermes-agent/pull/40450)

*   **生态与集成**：
    *   **统一插件路由钩子**: `#41190` 提出需要一个稳定、统一的插件接口来覆盖所有LLM调用的提供商/模型选择。这是构建强大插件生态系统的基石需求，可能会被纳入中长期路线图。[`#41190`](https://github.com/NousResearch/hermes-agent/issues/41190)
    *   **国际化 (i18n) 支持**: `#20155` 提出增加多语言支持，特别是中文。随着社区全球化，此需求将日益凸显。[`#20155`](https://github.com/NousResearch/hermes-agent/issues/20155)

*   **功能增强**：
    *   **`/compress` 命令修复**: `#55530 PR` 和 `#44456 Bug` 相关联，修复 `compress` 命令在桌面端的工作流错误，使其能正确执行和报告结果，这是一个确定性的短期改进项。[`#57530`](https://github.com/NousResearch/hermes-agent/pull/57530)

#### **7. 用户反馈摘要**

*   **🤔 对Dashboard的不满**：用户 `ogermer` 在 `#18080` 中直言“老实说，字体和颜色的选择非常不标准...”，并批评了“衬线字体、细小字体和低对比度”的设计，希望获得更强的对比度和可读性。
*   **😫 对QQBot问题的困扰**：用户 `fishlikeX` 和 `crayontomas` 报告QQBot适配器在更新后完全无法工作，陷入无限重试，导致他们的机器人服务直接瘫痪。这突显了对即时通讯平台稳定性和向后兼容性的高要求。
*   **🤩 对替代架构的渴望**：用户 `diegohb` 在 `#38602` 中提出的纯客户端模式获得了37个赞，表明许多用户希望将Hermes当作一个纯粹的聊天前端，连接到更强大的服务器后端，而不是在每个桌面设备上都部署一个完整的Agent。
*   **😩 对数据安全的担忧**：用户 `Fjustice9308` 报告的 `.env` 泄露问题被标记为P1安全级别，反映了用户对本地数据安全的敏感和重视。

#### **8. 待处理积压**

以下为可能被低估或需要维护者关注的重要问题/PR：

*   **长期未响应的生态适配问题**：`#31873 [OPEN] [Bug] check_web_api_key() hardcodes built-in backends`。该问题已存在一个多月（自5月25日），且明确指出了抑制第三方插件生态的架构缺陷，却仅有少量评论。这可能是项目健康度的一个潜在风险，需要维护者回应或给出解决方案的时间表。
*   **高赞功能请求缺乏官方信号**：`#38602 [Feature] Desktop Client-Only Installation`（37个赞）和 `#18080 [Feature] Improved Themes for Dashboard`（45个赞）都获得了大量社区共鸣，但目前官方（如通过标签或维护者评论）尚未对这些需求是否被接受、如何实施给出明确信号。长期沉默可能导致社区热情消退。
*   **关键Bug修复PR等待合并**：`#57537 fix(qqbot): accept is_reconnect kwarg in connect()` 直接修复了 P2级别的 `#52914` 问题，且已说明是问题的根源性修复，应尽快评估并合并，以恢复QQ Bot的正常使用。

</details>

---
*本日报由 [Big Model Radar](https://github.com/w409401768/big_model_radar) 自动生成。*