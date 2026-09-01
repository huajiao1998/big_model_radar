# OpenClaw 生态日报 2026-09-01

> Issues: 493 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-09-01 09:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-09-01

## 1. 今日速览

过去24小时OpenClaw项目保持高强度迭代：共产生493条Issue更新（新开/活跃238条，关闭255条）和500条PR更新（待合并318条，已合并/关闭182条），无新版本发布。当前项目处于**高活跃、高争议、稳定性承压**的状态：一方面社区提交了大量针对2026.8.1升级路径的P0/P1级缺陷报告（配置迁移、Gateway启动失败、密钥被替换等），另一方面安全类Issue（提示词注入、推理泄露、SSRF策略）持续占据讨论焦点。值得关注的是，大量Issue被标记为`clawsweeper:no-new-fix-pr`和`needs-maintainer-review`，说明维护者审阅队列存在一定积压。整体来看，项目功能迭代速度未减，但升级稳定性和安全加固是当前最突出的短板。

---

## 2. 版本发布

**无新版本发布。** 最近一次稳定版为2026.8.1（`ea80657`），当前社区焦点集中在该版本的升级缺陷上（详见第5部分）。

---

## 3. 项目进展

今日无新版本发布，但合并/关闭了182条PR，以下为关键进展：

### 已合并/关闭的重要PR

| PR | 内容 | 状态 |
|---|---|---|
| [#135037](https://github.com/openclaw/openclaw/pull/135037) | **修复Code Mode中PDF和图像分析丢失**：此前PDF/图像分析结果仅返回元数据，Code Mode和Tool Search会丢失成功分析内容，导致真实PDF调用四次工具后仍无法回答。 | 已关闭 |
| [#120900](https://github.com/openclaw/openclaw/pull/120900) | **Control UI安装策略警告审查**：允许管理员在Web UI中查看安装策略警告并决定是否继续安装插件，`plugins.install`新增`acknowledgeInstallPolicyWarning`参数。 | 已关闭 |
| [#134307](https://github.com/openclaw/openclaw/pull/134307) | **修复`auth: "oauth"` MCP服务器在`claude-cli`运行时缺失**：此前OAuth MCP服务器在`claude-cli`运行时不出现在工具目录中，现已修复。 | 已关闭 |
| [#134305](https://github.com/openclaw/openclaw/pull/134305) | **修复模型选择器持久化OpenAI模型但未验证Codex harness可用性**：Control UI模型选择器现在会调用运行时插件检查。 | 已关闭 |

### 待合并的关键PR（反映项目方向）

- **Durable Core系列**（[#111464](https://github.com/openclaw/openclaw/pull/111464) PR 5/6、[#111487](https://github.com/openclaw/openclaw/pull/111487) PR 6/6）：为基础设施级代理静默提供操作级执行恢复和只读持久化检查，是7.1路径的重要架构升级。
- **多用户模型账户**（[#134970](https://github.com/openclaw/openclaw/pull/134970)）：为共享团队网关引入按人模型账户和自助OAuth，解决"一人订阅为全队买单"的问题。
- **BOOT.md启动修复**（[#134831](https://github.com/openclaw/openclaw/pull/134831)）：修复升级到SQLite后BOOT.md启动检查因残留boot会话而失败的问题。
- **配置保留与升级恢复**（[#134490](https://github.com/openclaw/openclaw/pull/134490)）：修复升级过程中配置丢失和失败恢复验证问题。

**整体判断**：项目在推进Durable Core架构、多用户支持、UI/UX改进等长期方向，但短期重点仍是修复2026.8.1升级引入的稳定性问题。

---

## 4. 社区热点

### 讨论最活跃的Issues

| Issue | 评论数 | 核心诉求 |
|---|---|---|
| [#45740](https://github.com/openclaw/openclaw/issues/45740) | 17 | **安全**：`gh-issues`技能将未净化的GitHub Issue正文直接注入子代理提示词，存在提示词注入风险。被标记为`impact:security`和"platinum hermit"评级。 |
| [#96834](https://github.com/openclaw/openclaw/issues/96834) | 14 | **消息丢失**：WhatsApp 1:1发送图片时，主通道被阻塞约3分钟，多模态运行导致`active_reply_work`/`queued_work_without_active_run`状态异常。 |
| [#85030](https://github.com/openclaw/openclaw/issues/85030) | 13 | **功能缺失**：MCP工具未注入到`sessions_spawn`子代理会话中，`bundle-mcp`、按工具子代理允许列表、按代理允许列表均被忽略。 |
| [#114020](https://github.com/openclaw/openclaw/issues/114020) | 11 | **频道故障**：升级到2026.7.2-beta.4后，飞书/Telegram频道分发失败，报错`runChannelInboundEvent requires runDispatchLifecycle`。 |
| [#53763](https://github.com/openclaw/openclaw/issues/53763) | 11 | **功能请求**：内置无头浏览器，减少对外部Chrome或第三方API的依赖。 |

### 分析

社区讨论呈现三个集中诉求：
1. **安全加固**（#45740、#91804、#99253）：提示词注入、推理泄露、伪造用户轮次等安全问题引发高度关注，且多为"platinum hermit"高评级。
2. **消息可靠性**（#96834、#114020、#127229、#125764）：多频道（WhatsApp、Telegram、飞书）出现消息丢失、延迟、死信问题，直接影响生产可用性。
3. **子代理/多代理一致性**（#85030、#87051、#124343）：MCP工具、OAuth配置、会话状态在子代理场景下未正确传播，导致功能缺失或静默降级。

---

## 5. Bug 与稳定性

### P0级（严重，影响升级或核心功能）

| Issue | 问题描述 | Fix PR |
|---|---|---|
| [#134453](https://github.com/openclaw/openclaw/issues/134453) | **Windows 2026.8.1 `doctor --fix`中止**：报"bare file not found"，但交互式`openclaw doctor`可完成。 | 无 |
| [#134169](https://github.com/openclaw/openclaw/issues/134169) | **配置迁移将内联密钥替换为`__OPENCLAW_REDACTED__`**：Discord token、provider apiKeys等被破坏，导致频道`configured: false`。 | 无 |
| [#107133](https://github.com/openclaw/openclaw/issues/107133) | **Memory Core `embedding_cache`冲突**：遗留sidecar迁移回滚，永久阻塞Gateway启动（2026.7.1）。 | 无 |
| [#102749](https://github.com/openclaw/openclaw/issues/102749) | **启动时遗留状态迁移不收敛**：`.migrated`归档已存在时，Gateway永久拒绝启动。 | 无 |

### P1级（高影响）

| Issue | 问题描述 | Fix PR |
|---|---|---|
| [#133984](https://github.com/openclaw/openclaw/issues/133984) | **2026.7.1-2 → 2026.8.1升级后Gateway无法启动**：`doctor --fix`跳过配置键迁移，需手动修复约12个独立缺陷。 | [#134862](https://github.com/openclaw/openclaw/pull/134862)（部分） |
| [#96834](https://github.com/openclaw/openclaw/issues/96834) | **WhatsApp图片阻塞主通道约3分钟**：多模态运行导致状态异常。 | 无 |
| [#85030](https://github.com/openclaw/openclaw/issues/85030) | **MCP工具未注入子代理会话**：所有文档化配置均被忽略。 | 无 |
| [#114020](https://github.com/openclaw/openclaw/issues/114020) | **飞书/Telegram分发失败**：`runChannelInboundEvent`需要`runDispatchLifecycle`。 | 无 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | **子进程泄漏**：hook/tool子进程未被回收，导致僵尸进程积累和运行时降级。 | 无 |
| [#126360](https://github.com/openclaw/openclaw/issues/126360) | **`AgentSelectionRequiredError`日志洪水**：显式多代理所有权下，logbook插件、Control UI全局RPC等缺少agentId目标。 | [#134714](https://github.com/openclaw/openclaw/pull/134714) |
| [#127229](https://github.com/openclaw/openclaw/issues/127229) | **Telegram更新被错误tombstone**：watchdog释放的持久化更新在传输跟踪器稳定前被误判。 | 无 |
| [#115424](https://github.com/openclaw/openclaw/issues/115424) | **Gateway V8堆OOM**：主会话turn触发OOM后，重启恢复将一次崩溃变成7次核心转储循环。 | 无 |
| [#91804](https://github.com/openclaw/openclaw/issues/91804) | **内部推理泄露**：2026.6.5起，内部推理/思考内容暴露给用户，隐私和UX回归。 | 无 |
| [#110346](https://github.com/openclaw/openclaw/issues/110346) | **媒体allowlist不一致**：同一路径的`message send --media`在WhatsApp和Telegram上行为不同。 | 无 |
| [#125764](https://github.com/openclaw/openclaw/issues/125764) | **Telegram发送死信**：网络故障后仅尝试一次即永久死信，无重试、无告警。 | 无 |
| [#124343](https://github.com/openclaw/openclaw/issues/124343) | **子代理永久挂起**：`yield`拥有的settle-wake将已完成子代理永久停放，无投递、无重试。 | 无 |

### 稳定性趋势

- **升级路径是重灾区**：多个P0/P1问题集中在2026.8.1升级（#133984、#134169、#134453、#133813），涉及配置迁移、密钥处理、doctor修复工具自身缺陷。
- **消息可靠性问题突出**：WhatsApp、Telegram、飞书均出现消息丢失或延迟，且部分问题无fix PR。
- **资源泄漏问题持续**：子进程泄漏（#97616）、embedding workers泄漏（#125344）、OOM循环（#115424）表明运行时稳定性仍需加强。

---

## 6. 功能请求与路线图信号

### 高热度功能请求

| Issue | 功能 | 分析 |
|---|---|---|
| [#53763](https://github.com/openclaw/openclaw/issues/53763) | **内置无头浏览器**：减少对外部Chrome/API依赖，支持JS渲染和登录页面。 | 已有相关PR（[#126255](https://github.com/openclaw/openclaw/pull/126255)）将默认浏览器代理切换到Browser Harness，但尚未合并。 |
| [#46656](https://github.com/openclaw/openclaw/issues/46656) | **Webchat/Control UI内联按钮支持**：`buttons`参数目前仅Telegram可用，Webchat静默丢弃。 | 无对应PR，但属于UI一致性改进。 |
| [#74594](https://github.com/openclaw/openclaw/issues/74594) | **Skill能力清单RFC**：让用户在安装前了解技能能力。 | 无对应PR，属于生态治理方向。 |
| [#43564](https://github.com/openclaw/openclaw/issues/43564) | **ACP会话技能上下文注入**：将技能注入Codex/Pi/OpenCode/Gemini等ACP会话。 | 无对应PR，但Durable Core系列PR可能为此铺路。 |
| [#79281](https://github.com/openclaw/openclaw/issues/79281) | **默认ACP线程绑定预设**：第三方频道无需各自实现~870 LOC的SessionBindingAdapter。 | 无对应PR，但多频道一致性需求强烈。 |
| [#77886](https://github.com/openclaw/openclaw/issues/77886) | **受保护配置更改的所有者批准流程**：在安全边界内提供明确的批准机制。 | 无对应PR，但安全相关Issue持续升温。 |

### 路线图信号

- **Durable Core架构**（PR 5/6和6/6）是当前最明确的架构级方向，目标是为7.1路径提供基础设施级代理静默保障。
- **多用户支持**（[#134970](https://github.com/openclaw/openclaw/pull/134970)）表明项目正在向团队/多租户场景扩展。
- **安全加固**成为社区最强烈的声音，多个安全相关Issue被标记为高评级（platinum hermit），预计后续版本会加强提示词隔离、SSRF策略、密钥管理等。

---

## 7. 用户反馈摘要

### 真实用户痛点

1. **升级体验糟糕**（[#133984](https://github.com/openclaw/openclaw/issues/133984)、[#134169](https://github.com/openclaw/openclaw/issues/134169)）：
   > "Upgrading 2026.7.1-2 → 2026.8.1 left the Gateway unstartable and required roughly a dozen manual repair steps across five independent defects."
   > "The documented recovery path — `openclaw doctor --fix` — could not repair the config, because it applies no config-key migrations non-interactively."

2. **生产环境受损**（[#123799](https://github.com/openclaw/openclaw/issues/123799)）：
   > "We are an affected production deployment and need operational guidance after #123706 was closed as already implemented on current main."
   > 用户运行2026.5.12，遭遇Codex compact 404，但修复已在main上，缺乏回退/升级指导。

3. **资源消耗与体验不满**（[#88087](https://github.com/openclaw/openclaw/issues/88087)）：
   > "I've been running OpenClaw on a DigitalOcean 2vCPU/4GB droplet and hit enough friction today that I'm tearing it down. Costs aren't worth it for the experience."
   > 用户因后台任务UX差、cron唤醒静默失败而放弃部署。

4. **隐私泄露担忧**（[#91804](https://github.com/openclaw/openclaw/issues/91804)）：
   > "Since upgrading to OpenClaw 2026.6.5, internal agent reasoning/thinking is being exposed to users in every response. This is a major privacy and UX regression."

5. **调试成本高**（[#78301](https://github.com/openclaw/openclaw/issues/78301)）：
   > "The plugin loader silently tolerates plugin-authoring bugs that surface much later as opaque runtime errors. Both could have been caught at plugin load time with a clear message."

### 满意点

- 社区对PR响应速度总体认可，多个PR在创建当天即获得`ready for maintainer look`状态。
- Durable Core系列PR获得持续关注，表明用户对架构级改进有期待。

---

## 8. 待处理积压

### 长期未响应的关键Issue

| Issue | 创建时间 | 持续时间 | 问题 | 当前状态 |
|---|---|---|---|---|
| [#45740](https://github.com/openclaw/openclaw/issues/45740) | 2026-03-14 | 171天 | gh-issues技能提示词注入（安全） | 17条评论，仍开放，无fix PR |
| [#53763](https://github.com/openclaw/openclaw/issues/53763) | 2026-03-24 | 161天 | 内置无头浏览器功能请求 | 11条评论，仍开放 |
| [#74848](https://github.com/openclaw/openclaw/issues/74848) | 2026-04-30 | 124天 | macOS App节点反复断连（"cancelled"） | 6条评论，仍开放，无fix PR |
| [#85030](https://github.com/openclaw/openclaw/issues/85030) | 2026-05-21 | 103天 | MCP工具未注入子代理会话 | 13条评论，仍开放，无fix PR |
| [#87051](https://github.com/openclaw/openclaw/issues/87051) | 2026-05-26 | 98天 | Codex OAuth配置不传播到子代理 | 5条评论，仍开放，无fix PR |
| [#91804](https://github.com/openclaw/openclaw/issues/91804) | 2026-06-10 | 83天 | 内部推理泄露（隐私回归） | 7条评论，仍开放，无fix PR |
| [#115424](https://github.com/openclaw/openclaw/issues/115424) | 2026-07-28 | 35天 | Gateway V8堆OOM导致核心转储循环 | 7条评论，仍开放，无fix PR |

### 维护者关注建议

1. **安全类Issue优先级需提升**：#45740（提示词注入）和#91804（推理泄露）均为高评级安全缺陷，且长期无fix PR，建议维护者优先响应。
2. **升级路径问题需系统性解决**：#133984、#134169、#134453等多个P0/P1问题指向2026.8.1升级的配置迁移和密钥处理缺陷，建议发布补丁版本。
3. **子代理一致性问题是架构短板**：#85030、#87051、#124343均涉及子代理场景下的配置/状态传播，建议在Durable Core系列PR中一并考虑。

---

**报告日期**：2026-09-01  
**数据来源**：[OpenClaw GitHub仓库](https://github.com/openclaw/openclaw)  
**报告生成**：AI分析师

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期**：2026-09-01  
**分析范围**：OpenClaw、Zeroclaw、PicoClaw、QwenPaw、hermes-agent、AstrBot

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**规模爆发与架构演进并行**的关键阶段。头部项目（OpenClaw、hermes-agent）日均处理近千条 Issue/PR，迭代强度已接近大型基础设施项目；中型项目（Zeroclaw、QwenPaw）通过 RFC 驱动架构升级，在安全加固与多代理协作方向密集投入；小型项目（AstrBot、PicoClaw）则依托特定场景（IM 插件、轻量协议）保持差异化竞争力。全生态共同面临三大挑战：**升级路径稳定性**（多个项目出现配置丢失、启动失败）、**安全加固**（提示词注入、推理泄露、数据覆盖）、**多代理协作的工程化落地**（从概念验证走向契约化、可观测）。整体呈现"功能扩张速度未减，但可靠性治理明显滞后"的态势。

---

## 2. 各项目活跃度对比

| 项目 | Issues（新开/活跃 / 关闭） | PRs（待合并 / 已合并/关闭） | Release | 健康度评估 |
|------|--------------------------|---------------------------|---------|-----------|
| **OpenClaw** | 493（238 / 255） | 500（318 / 182） | 无 | 🔴 高活跃，稳定性承压，安全争议多 |
| **hermes-agent** | 500（323 / 177） | 500（361 / 139） | **v0.21.0**（Pantheon） | 🟡 极高活跃，治理精细化，基础设施问题待解 |
| **QwenPaw** | 31（14 / 17） | 36（19 / 17） | **v2.2.0-beta.5 / beta.4** | 🟢 高活跃，密集迭代，beta 稳定性问题快速响应 |
| **Zeroclaw** | 27（26 / 1） | 50（49 / 1） | 无 | 🟡 高活跃，P0 数据丢失 Bug 需优先处理 |
| **AstrBot** | 7 | 20 | **v4.27.5** | 🟢 健康，快速迭代，社区参与度高 |
| **PicoClaw** | 1（1 / 0） | 4（3 / 1） | 无 | 🟠 中等活跃，PR 积压，单一 Bug 持续发酵 |

> 注：OpenClaw 与 hermes-agent 的 Issue/PR 数量级远超其他项目，反映其社区规模和维护者投入的显著优势。

---

## 3. OpenClaw 在生态中的定位

**社区规模第一梯队**：OpenClaw 与 hermes-agent 同处日均 500 条 PR 的顶级活跃度，但 OpenClaw 的 Issue 讨论更聚焦于**安全漏洞**（提示词注入 #45740、推理泄露 #91804）和**升级缺陷**（2026.8.1 配置迁移 #133984/#134169），社区情绪呈现"高期待、高挑剔"的双高特征。

**技术路线差异**：
- **OpenClaw** 押注 **Durable Core 架构**（PR 5/6、6/6），强调基础设施级代理的静默恢复与操作级执行保障，目标是为 7.1 路径构建自愈型运行时。多用户模型账户（#134970）则瞄准团队共享场景。
- **hermes-agent** 同期推进 **worker 协作契约层**（#98470）与 Kanban 任务契约（#100168），更侧重多代理协作的**治理框架**而非运行时自愈。
- **Zeroclaw** 以 **WASM 插件运行时**（#10076）和 RFC 驱动设计见长，架构透明度最高，但合并速度是瓶颈。

**核心优势**：OpenClaw 在**多频道接入广度**（WhatsApp、Telegram、飞书、Discord 等）和 **MCP/Code Mode 生态兼容性**上领先，且 PR 响应速度获社区认可（当天即获 `ready for maintainer look`）。**核心短板**：升级路径的系统性缺陷（P0/P1 密集）正在消耗用户信任，安全类高评级 Issue 长期无 fix PR（#45740 已开放 171 天）。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|---------|---------|
| **安全加固** | OpenClaw、Zeroclaw、QwenPaw | 提示词注入（OpenClaw #45740）、推理内容泄露（OpenClaw #91804）、知识图谱数据隔离（Zeroclaw #9745）、危险指令绕过（QwenPaw #7443） |
| **升级稳定性** | OpenClaw、Zeroclaw、hermes-agent | 配置迁移失败（OpenClaw #133984）、配置被空文件覆盖（Zeroclaw #10495，P0）、更新器破坏安装（hermes-agent #83529） |
| **多代理/子代理一致性** | OpenClaw、QwenPaw、hermes-agent | MCP 工具未注入子代理（OpenClaw #85030）、主 Agent 不主动查询子 Agent 状态（QwenPaw #7450）、worker 协作契约（hermes-agent #98470） |
| **消息可靠性** | OpenClaw、PicoClaw、QwenPaw | WhatsApp 图片阻塞主通道（OpenClaw #96834）、Telegram 动画无限循环致限流（PicoClaw #3343）、工具结果丢失（QwenPaw #7420） |
| **多用户/多租户** | OpenClaw、QwenPaw、hermes-agent | 多用户模型账户（OpenClaw #134970）、Hub 多租户版（QwenPaw #7318）、Claude 订阅 OAuth 避免双重付费（hermes-agent #25267，53👍） |
| **WASM/插件运行时** | Zeroclaw、PicoClaw | 可组合 WASM 插件运行时（Zeroclaw #10076）、插件实例化错误信息不友好（Zeroclaw #10505）、IRCv3 多行消息（PicoClaw #3354） |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|------|---------|---------|-----------------|
| **OpenClaw** | 全能型个人助手，多频道接入 + MCP/Code Mode + 子代理 | 追求高度可定制化的技术用户、自托管社区 | 单体仓库 + Durable Core 自愈架构，强调基础设施级可靠性 |
| **hermes-agent** | 多代理协作 + 任务治理（Kanban、worker 契约） | 复杂工作流自动化团队、生产网关部署者 | 契约层驱动的协作框架，salvage PR 机制体现精细化治理 |
| **Zeroclaw** | 架构透明 + WASM 插件生态 + 细粒度沙箱 | 插件开发者、安全敏感型用户 | RFC 驱动设计，WASM 插件运行时 + 知识图谱归属绑定 |
| **QwenPaw** | 多租户 Hub + 主-子 Agent 协作 + 记忆系统 | 团队协作场景、AgentScope 生态用户 | 背靠 AgentScope，ReMe 记忆系统 + 会话级模型覆盖 |
| **AstrBot** | IM 插件生态 + 知识库混合检索 + 轻量部署 | 中小型团队、个人开发者 | 插件市场驱动，多平台适配器统一元数据层 |
| **PicoClaw** | 嵌入式/边缘场景 + 轻量协议（IRC/DeltaChat） | 极简部署、硬件爱好者（Sipeed 背景） | 资源占用敏感，协议适配器轻量化 |

---

## 6. 社区热度与成熟度

**第一梯队（日均 500 条 PR）——快速迭代与质量巩固并存**：
- **hermes-agent** 处于**质量巩固阶段**：v0.21.0 发布后系统性回收 salvage PR，今日关闭 6 个 P1 Bug，但 skills 索引持续 degraded（#66616，134 评论）暴露基础设施监控短板。
- **OpenClaw** 处于**功能扩张与稳定性承压并行**：Durable Core 架构推进与 2026.8.1 升级缺陷密集爆发并存，维护者审阅队列积压（`needs-maintainer-review` 标签增多）。

**第二梯队（日均 30-50 条 PR）——架构演进关键期**：
- **Zeroclaw**：RFC 讨论深度高（#9488 已修订至 Rev 9），但合并速度慢（49 条 PR 待合并），P0 配置覆盖 Bug 需立即止血。
- **QwenPaw**：v2.2.0 beta 密集发布，稳定性问题响应快（#7446 当日修复），但工具结果丢失（#7420）和上下文丢失（#7447）两个高严重度 Bug 仍开放。

**第三梯队（日均 <20 条 PR）——场景深耕期**：
- **AstrBot**：健康迭代，补丁版本 + 插件生态优化，社区反馈闭环良好。
- **PicoClaw**：活跃度偏低，PR 积压（#3344、#3222 已 stale），单一 Bug（#3343）持续消耗社区注意力。

---

## 7. 值得关注的趋势信号

1. **安全已从"加分项"变为"生存需求"**：OpenClaw 的提示词注入（171 天未修复）、Zeroclaw 的配置覆盖 P0、hermes-agent 的蓝屏事件（#89614），共同指向一个事实——安全缺陷的修复速度正在成为项目竞争力的分水岭。建议开发者评估项目时，将**安全 Issue 的中位修复时间**作为核心指标。

2. **多代理协作进入"契约化"阶段**：hermes-agent 的 worker 协作契约、OpenClaw 的 Durable Core、QwenPaw 的主-子 Agent 协作，三者殊途同归——都在为多代理的**职责边界、状态传播、失败恢复**建立正式化框架。这预示下一阶段生态竞争将围绕"多代理工程化"展开，而非单代理能力。

3. **升级体验决定用户留存**：OpenClaw 用户需手动修复 12 个独立缺陷才能完成升级（#133984）、Zeroclaw 用户 109KB 配置被 702 字节覆盖（#10495）、hermes-agent 更新器"灾难性失败"（#83529）——升级路径的可靠性已成为用户流失的首要原因。**建议**：所有项目应将升级迁移测试纳入 CI 强制门禁。

4. **多租户/团队化是明确的商业化路径**：OpenClaw 多用户模型账户、QwenPaw Hub 多租户、hermes-agent Claude OAuth 订阅（53👍 最高赞功能请求），三个头部项目同时向团队场景延伸，预示开源个人助手正在向**企业级协作工具**演进。

5. **WASM 插件运行时崛起**：Zeroclaw 的 WASM 插件架构（#10076）与 PicoClaw 的轻量协议支持，代表插件生态向**更安全、更可移植**的方向演进。对开发者而言，掌握 WASM 插件开发范式可能成为下一阶段生态参与的重要技能。

6. **可观测性缺口普遍存在**：hermes-agent 的 skills 索引 degraded 45 天无人修复（#66616）、QwenPaw 的 STT 延迟指标缺失（#9894）、OpenClaw 的日志洪水（#126360）——基础设施可观测性投入不足，正在成为大型项目的共同瓶颈。

---

*本报告基于 2026-09-01 各项目 GitHub 公开数据生成，数据源包括 OpenClaw、Zeroclaw、PicoClaw、QwenPaw、hermes-agent、AstrBot 仓库的 Issue/PR/Release 动态。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-01

## 1. 今日速览

过去24小时内，Zeroclaw 项目保持高活跃度：共产生 27 条 Issue 更新（26 条活跃/新开，1 条关闭）和 50 条 PR 更新（49 条待合并，1 条关闭），无新版本发布。值得高度关注的是，出现了一个 **P0 严重级别 Bug（#10495）**——`Config::save()` 可能用 702 字节的空配置覆盖操作员 109 KB 的完整配置，属于数据丢失风险，目前已有一个相关修复 PR（#10498）提交。与此同时，大量 RFC 架构讨论（如运行时会话、统一附件架构、WASM 插件运行时等）仍在持续推进，表明项目正处于架构演进的关键阶段。整体来看，项目社区活跃、贡献者参与度高，但 P0 Bug 和多个 P1 问题需要维护者优先处理。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

今日无 PR 被合并（唯一关闭的 PR #10110 为关闭而非合并）。但以下重要 PR 正在推进中，反映了项目在安全、稳定性、功能扩展方面的持续投入：

### 安全与数据归属
- **[#9745] fix(memory): add per-agent attribution and scoping to the knowledge graph**（@IftekharUddin，XL，risk:high）— 为共享 SQLite 知识图谱增加强制代理所有权绑定，`KnowledgeScope` 从可信注册绑定，写入保留调用者所有权，定向 `read_knowledge_from` 授权扩展读取范围。这是对知识图谱数据隔离的重要安全加固。
- **[#9746] fix(tools): per-agent ownership scoping for session tools and discord_search**（@IftekharUddin，XL，risk:high）— 将会话列表、历史、发送及 Discord 搜索工具绑定到可信的按代理所有权，关闭了之前的检查/使用竞态条件。

### 稳定性与 Bug 修复
- **[#10030] fix(runtime): persist session state from the RPC prompt path**（@IftekharUddin，L）— 聊天模式 RPC 提示在获取每会话队列锁后持久化 `running` 状态，完成/取消后转为 `idle`，失败转为 `error`，使 `session/state` 和卡住会话查询可正确观测。
- **[#10262] fix(rpc): close RPC connections on daemon reload and unstick zerocode quickstart**（@IftekharUddin，M）— 就地守护进程重载时取消已建立的本地套接字和 WSS RPC 连接，修复 zerocode 快速启动卡住问题。
- **[#9939] fix(cost): surface pricing-unavailable so silent $0 caps can't reassure**（@IftekharUddin，XL）— 成本记录持久化价格不可用的令牌子集，`zeroclaw status` 在显示的花费/上限余量仅为下界时发出警告，避免静默 $0 上限造成误导。

### 功能扩展
- **[#9535] feat(runtime): anchor context compaction to model window ratio**（@NiuBlibing，XL）— 新增 `runtime_profiles.<name>.context_compact_ratio` 设置，使主动修剪预算基于所选模型的窗口而非固定 32,000 令牌绝对值。
- **[#9809] feat(providers): support multiple models per provider profile**（@NiuBlibing，XL）— 允许一个提供商配置文件（单一凭证+端点）承载多个模型，每个模型有独立 ID 和调优参数。
- **[#9740] feat(channels): add VoiceHost WebSocket bridge**（@LauraGPT，XL）— 新增可选的 `channel-voicehost` WebSocket 桥接，使外部 FunASR 或 SenseVoice 音频主机可与 ZeroClaw 交换转录、回复、中断和审批事件。

> 项目整体向前推进：安全加固（知识图谱/会话工具归属）、稳定性修复（RPC 连接/会话状态持久化）、功能扩展（多模型配置/语音桥接/上下文压缩优化）多条线并行，但均处于待合并状态，合并速度可能成为瓶颈。

---

## 4. 社区热点

今日讨论最活跃的 Issues 集中在 **RFC 架构设计** 领域，评论数领先的均为长期讨论的 RFC：

| Issue | 标题 | 评论数 | 核心议题 |
|-------|------|--------|----------|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | RFC: Runtime-owned conversation sessions and transport surface adapters | 29 | 运行时拥有的会话与传输表面适配器，涉及 #9487/#9488/#9600 所有权边界划分 |
| [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) | RFC: Decouple memory lifecycle policy from storage backends | 24 | 内存生命周期策略与存储后端解耦，避免每个网关/通道重复实现治理逻辑 |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | RFC: Unified attachment architecture for web chat and channels | 23 | Web 聊天与频道的统一附件架构，已修订至第 9 版 |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | RFC: Granular sandbox policy — filesystem and network restrictions | 18 | 文件系统与网络限制的细粒度沙箱策略 |
| [#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396) | RFC: Make wire protocol first-class in provider construction and onboarding | 17 | 将线路协议作为提供商构建和接入的一等公民 |

**分析**：社区讨论热度集中在架构层面，尤其是 **运行时/会话所有权**（#9487）、**内存生命周期**（#6850）、**附件架构**（#9488）三个方向。这些讨论反映了项目在快速迭代中面临的架构清晰化需求——随着网关、频道、工具、内存提供商的增多，边界划分和职责归属成为社区最关心的议题。多个 RFC 已进入修订多轮的状态（如 #9488 已修订至 Rev 9），说明讨论深度较高，但也可能意味着决策周期较长。

---

## 5. Bug 与稳定性

今日报告了多个 Bug，按严重程度排列如下：

### 🔴 P0 — 数据丢失风险
- **[#10495] [Bug]: Config::save() can replace an operator's populated config.toml with a near-empty file**（@JordanTheJet，2026-08-31，评论 3）
  - **严重性**：S0 - 数据丢失/安全风险
  - **现象**：在具有 109 KB、25 个代理的 `~/.zeroclaw/config.toml` 机器上，工作区测试运行将文件替换为仅 702 字节的配置（仅含 `schema_version` 和一个 `[channel...`）。
  - **修复 PR**：已有 [#10498](https://github.com/zeroclaw-labs/zeroclaw/pull/10498)（拒绝无父路径的裸路径覆盖）和 [#10521](https://github.com/zeroclaw-labs/zeroclaw/pull/10521)（`Config::default()` 尊重 `ZEROCLAW_CONFIG_DIR`）提交，但尚未合并。

### 🟠 P1 — 功能异常
- **[#10513] [Bug]: RPC `sops.run` returns a run ID for a step nothing will execute**（@JordanTheJet，2026-08-31，评论 2）
  - **严重性**：S2 - 行为降级
  - **现象**：`RpcDispatcher::handle_sops_run` 启动手动 SOP 后返回 run ID，但没有驱动接收器、没有驱动执行，导致返回的 run ID 对应的步骤实际上不会执行。
- **[#9850] [Bug]: llm_task builds its provider via the legacy factory, losing alias-specific config**（@JordanTheJet，2026-08-08，评论 1）
  - **严重性**：S2 - 行为降级
  - **现象**：`LlmTaskTool` 通过 `create_model_provider_with_options` 构建提供商时传入 `config: None, alias: "default"`，丢失 Azure/OAuth/`requires_openai_auth` 等别名特定配置。
- **[#10501] [Bug]: MCP tool-result images 400 on OpenAI-compatible providers**（@metalmon，2026-08-31，评论 1）
  - **严重性**：P1，影响 MCP 工具结果中的图片传输
  - **现象**：OpenAI 兼容提供商将 `[IMAGE:…]` 标记提升为 `role: "tool"` 消息中的 `image_url` 内容部分，但 OpenAI 兼容端点只接受 `role: "user"` 消息中的图片部分。

### 🟡 P2 — 一般问题
- **[#10523] [Bug]: Bootstrap file truncation at 6000 chars is invisible to the operator**（@wromansky，2026-09-01，评论 1）
  - **现象**：启用 `compact_context` 时，每个工作区引导文件（`AGENTS.md`、`SOUL.md`、`IDENTITY.md`、`USER.md`）在注入系统提示前被截断为 6,000 字符，且操作员无感知。
- **[#10505] [Bug]: Plugin instantiation fails with cryptic 'no matching implementation in the linker'**（@cryptoduke01，2026-08-31，评论 1）
  - **现象**：WASM 工具插件（`wasm32-wasip2`）的 `wit/v0` 版本与主机实际导出的 world 略有偏差时，主机发现组件但实例化失败，报 `registered: 0` 和 `no matching implementation in the linker`。
- **[#10506] [Bug]: Sequential wasi:http requests in one plugin invocation intermittently fail**（@cryptoduke01，2026-08-31，评论 1）
  - **现象**：单个工具插件 `execute()` 中连续发出多个出站 HTTP 请求时，后续调用间歇性失败，疑似连接在失效后被重用；批处理可避免此问题。

**稳定性评估**：P0 配置覆盖 Bug 是当前最紧迫的问题，涉及用户数据安全，需优先修复。多个 P1/P2 问题集中在 WASM 插件运行时和提供商兼容性方面，与项目正在推进的 WASM 架构演进（#10076、#9582）相关，建议在架构调整中一并解决。

---

## 6. 功能请求与路线图信号

今日活跃的功能请求/RFC 中，以下方向可能被纳入下一版本：

### 高概率纳入（已有对应 PR 或已被 accepted）
- **多模型提供商配置**：[#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) PR 已提交，支持一个提供商配置文件承载多个模型。对应 Issue 层面的需求来自社区对更灵活提供商配置的长期诉求。
- **上下文压缩优化**：[#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) PR 已提交，将上下文压缩锚定到模型窗口比例，替代固定 32K 预算。
- **配置安全加固**：[#10498](https://github.com/zeroclaw-labs/zeroclaw/pull/10498) 和 [#10521](https://github.com/zeroclaw-labs/zeroclaw/pull/10521) 直接针对 P0 Bug #10495，预计将尽快合并。

### 路线图信号（RFC 讨论中，可能进入后续版本）
- **运行时拥有的会话**（[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)）：将会话所有权从网关/频道迁移到运行时，是架构层面的重要演进方向。
- **统一附件架构**（[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)）：为 Web 聊天和频道提供统一的附件处理，已修订至 Rev 9，讨论接近成熟。
- **可组合 WASM 插件运行时**（[#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076)）：扩展 WASM 插件能力，支持 Rust `HookHandler` 观察、类型化扩展点和可替换提供商。
- **单工具提供商轮次**（[#10222](https://github.com/zeroclaw-labs/zeroclaw/issues/10222)）：允许交互式代理在工具批次之间返回控制权给模型，提升工具调用的交互性。
- **逐字频道发送**（[#10050](https://github.com/zeroclaw-labs/zeroclaw/issues/10050)）：新增网关路由，无需代理轮次即可在配置的频道上逐字发送调用者提供的消息。

---

## 7. 用户反馈摘要

从今日活跃的 Issues 评论中提炼的用户反馈：

### 真实痛点
- **配置数据安全担忧**（#10495）：用户 @JordanTheJet 报告配置被覆盖的问题，强调这是 "S0 - data loss / security risk"。109 KB 配置被 702 字节文件替换的场景极具冲击力，反映了用户对配置持久化可靠性的高度关注。
- **WASM 插件开发体验**（#10505、#10506）：用户 @cryptoduke01 报告了 WASM 插件实例化的 cryptic 错误信息和 HTTP 请求间歇性失败。这两个问题都涉及插件开发者的核心体验——错误信息不友好、网络请求不稳定会显著增加插件开发调试成本。
- **配置截断不可见**（#10523）：用户 @wromansky 指出引导文件截断对操作员不可见，这可能导致代理行为异常时难以排查根因。

### 使用场景
- **多提供商/多模型管理**：多个 RFC 和 PR（#9809、#8396）反映了用户在生产环境中使用多个模型提供商、需要更灵活配置管理的需求。
- **语音/音频交互**：PR #9740（VoiceHost WebSocket 桥接）表明有用户正在将 ZeroClaw 与外部语音识别/合成系统集成，构建语音交互场景。
- **安全沙箱需求**：RFC #6996（细粒度沙箱策略）和 PR #9582（插件 egress 策略）反映了用户对插件安全隔离的明确需求，尤其是在多租户或高安全要求环境中。

### 满意/不满意
- **满意**：社区对 RFC 讨论的参与度很高，多个 RFC 持续多轮修订（如 #9488 已到 Rev 9），说明维护者与社区互动良好，讨论机制有效。
- **不满意**：WASM 插件相关错误信息不友好（#10505）、配置截断不可见（#10523）等问题反映了部分实现细节对用户不够透明，有改进空间。

---

## 8. 待处理积压

以下重要 Issue/PR 长期未得到充分响应或推进，提醒维护者关注：

### 长期未决的 RFC（讨论超 3 个月）
- **[#6850] RFC: Decouple memory lifecycle policy from storage backends**（@fanchanghu，2026-05-22 创建，24 条评论）— 已讨论 3 个多月，涉及内存生命周期与存储后端解耦的架构决策，讨论热度高但未见明确结论。
- **[#6996] RFC: Granular sandbox policy — filesystem and network restrictions**（@rarean，2026-05-28 创建，18 条评论）— 已讨论 3 个多月，涉及沙箱策略分层，与安全相关，建议加速决策。
- **[#6909] RFC: Computer-use support for desktop screen interaction and input control**（@NiuBlibing，2026-05-25 创建，15 条评论）— 已讨论 3 个多月，桌面屏幕交互与输入控制，属于较大的功能扩展。

### 标记为 blocked / do-not-merge 的 PR
- **[#9582] feat(plugins): enforce a host-owned egress policy on plugin wasi:http**（@JordanTheJet，2026-07-31 创建，标记 `status:blocked`、`do-not-merge`）— 插件出口策略是安全重要功能，但处于阻塞状态，建议明确阻塞原因和解除路径。
- **[#9109] feat(providers): add native Hailo-Ollama support**（@vadelma-agent，2026-07-17 创建，标记 `do-not-merge`、`needs-author-action`）— Hailo-Ollama 原生支持，已等待近 1.5 个月，需要作者响应或维护者介入。

### 需要维护者关注
- **[#10195] [Task]: manifest schema validators recompile on every config resolution**（@JordanTheJet，2026-08-20 创建，状态 `accepted`）— 已接受但仅 2 条评论，性能优化任务，建议排期。
- **[#9510] [Feature]: Reject PRs with no common ancestor with master**（@JordanTheJet，2026-07-28 创建，状态 `accepted`）— CI 防护改进，已接受但推进缓慢。

---

**总结**：Zeroclaw 项目当前处于高活跃度、多线并进的阶段。安全加固（知识图谱归属、插件出口策略）和架构演进（运行时会话、WASM 插件运行时）是两条主线。但 P0 配置覆盖 Bug 需要立即修复，多个长期 RFC 需要加速决策，blocked/do-not-merge 的 PR 需要明确处理路径。项目整体健康度良好，社区参与度高，但需注意合并速度和决策效率。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-09-01

## 1. 今日速览

过去 24 小时项目整体活跃度中等：共 1 条 Issue 更新（新活跃 1 条）和 4 条 PR 更新（3 条待合并、1 条被关闭）。值得关注的是，一条关于 Telegram 工具反馈动画无限循环的 Bug（#3343）仍在持续发酵，已产生 22.8 万次无效 API 调用并触发服务端限流，是当前社区讨论的焦点。PR 方面，新增了 IRCv3 多行消息支持（#3354），但两条较早提交的 PR（#3344、#3222）仍处于 stale 状态，积压问题需要维护者关注。无新版本发布。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日无 PR 被合并。唯一关闭的 PR 为 **#3299**（Add native Exa web search provider），该 PR 因长期未活动被标记为 stale 并自动关闭，未进入合并流程。这意味着 Exa 搜索提供商的原生支持暂未落地，但相关代码仍可被后续重新提交。

新提交的 PR **#3354**（feat(irc): assemble IRCv3 multiline messages）为项目带来了实质性的功能推进：该 PR 为 IRC 通道添加了 IRCv3 `draft/multiline` 接收支持，使长文本或多行 IRC 消息能够作为一条完整消息进入 PicoClaw，并自动请求 `batch`、`message-tags` 和 `draft/multiline` 能力。目前该 PR 处于待合并状态，若被接受将改善 IRC 场景下的消息完整性。

- #3299（已关闭）: https://github.com/sipeed/picoclaw/pull/3299
- #3354（待合并）: https://github.com/sipeed/picoclaw/pull/3354

## 4. 社区热点

今日讨论最活跃的条目为 **Issue #3343**（[BUG] Tool feedback animation can edit a Telegram message indefinitely after a failed turn），共 2 条评论。该问题描述了工具反馈动画在 agent 回合停止推进后，仍持续每 3 秒调用一次 Telegram `editMessageText`，持续数天累计超过 22.8 万次编辑尝试，最终触发 Telegram 服务端限流（`retry_after`）。社区讨论的核心诉求是：**工具反馈动画缺少终止条件，导致资源浪费和第三方 API 限流风险**，希望项目能加入失败后的自动停止机制或退避策略。

- Issue #3343: https://github.com/sipeed/picoclaw/issues/3343

## 5. Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 状态 |
|---------|----------|------|------|
| 高 | [#3343](https://github.com/sipeed/picoclaw/issues/3343) | 工具反馈动画无限循环调用 Telegram `editMessageText`，产生 22.8 万次无效请求并触发服务端限流 | 开放中，暂无 fix PR |

该 Bug 影响 Telegram 通道的稳定性，且可能波及其他使用轮询/动画机制的通道。目前无关联的修复 PR，建议维护者优先排查动画循环的终止条件。

## 6. 功能请求与路线图信号

从今日活跃的 PR 和 Issue 中可观察到以下功能方向信号：

- **IRCv3 多行消息支持**（#3354）：新提交的 PR，表明社区对 IRC 协议现代特性的需求正在增长，可能被纳入下一版本。
- **Build Remote Agent 手机配对**（#3344）：新增 `gbr/1` 协议适配器，允许手机旁观桌面 agent 运行。该 PR 已处于 stale 状态，但功能本身具有创新性，若维护者回应可能进入路线图。
- **Exa 搜索提供商**（#3299）：虽被关闭，但原生 web 搜索提供商的需求仍然存在，未来可能以其他形式重新提交。

## 7. 用户反馈摘要

来自 Issue #3343 的反馈揭示了真实用户痛点：

- **Telegram 集成稳定性问题**：用户 @raine 报告了工具反馈动画在失败回合后仍持续运行数天，导致 Telegram 账号被服务端限流。这说明当前动画机制缺少失败检测和自动终止逻辑。
- **资源浪费**：22.8 万次无效 API 调用不仅影响用户体验，也可能造成不必要的计算和网络开销。
- **用户期望**：在 agent 回合停止推进后，相关动画和轮询应立即停止，或至少采用指数退避策略，避免对第三方服务造成压力。

## 8. 待处理积压

以下 PR 长期未获维护者响应，已被标记为 stale，建议关注：

- **#3344**（Add Build Remote Agent phone pairing (gbr/1)）：创建于 2026-08-23，已 stale，待合并。该 PR 引入了手机配对旁观功能，若项目有意支持远程监控场景，值得评估。
  https://github.com/sipeed/picoclaw/pull/3344

- **#3222**（refactor(deltachat): cleanup implementation, documentation -200LOC）：创建于 2026-07-03，已 stale，待合并。该 PR 对 DeltaChat 实现进行了大规模清理（-200 行），并移除了密码配置等遗留特性，属于维护性重构，长期搁置可能增加后续合并成本。
  https://github.com/sipeed/picoclaw/pull/3222

此外，**#3299**（Exa 搜索提供商）虽已关闭，但功能需求本身未消失，建议维护者明确是否接受该方向，避免贡献者重复劳动。

---

*本日报由 AI 助手基于 GitHub 公开数据自动生成，仅供参考。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-09-01

## 1. 今日速览

QwenPaw 在过去 24 小时内保持高活跃度：共产生 31 条 Issue 更新（14 条新开/活跃、17 条已关闭）和 36 条 PR 更新（19 条待合并、17 条已合并/关闭），并发布了 2 个新版本（v2.2.0-beta.5 / beta.4）。项目正处于 v2.2.0 密集迭代期，社区围绕多租户 Hub、主-子 Agent 协作、上下文丢失等话题讨论热烈。值得关注的是，多个 beta 版本暴露的稳定性问题（工具结果丢失、内存索引重建失败等）已获得快速响应，部分已有对应修复 PR，整体项目健康度良好，迭代节奏紧凑。

---

## 2. 版本发布

### v2.2.0-beta.5
- **发布时间**: 2026-08-31
- **主要变更**:
  - `fix(channels)`: 使渠道契约检查具备可移植性并补全检查覆盖（PR #7267）
  - `fix(memory)`: 将 embedding 重建索引操作改为显式且限定作用域（PR #7133）
  - 版本号升级
- **破坏性变更**: 无明确破坏性变更，均为修复性更新。
- **迁移注意**: 建议 beta 用户升级后验证 embedding 索引重建功能是否恢复正常。

### v2.2.0-beta.4
- **发布时间**: 2026-08-30
- **主要变更**:
  - `fix(context)`: 限制超大单行工具结果的大小（PR #7331）
  - `test(agent-stats)`: 对齐 TC-AGT-06 测试与当前 agent 范围（PR #7021）
  - `fix(desktop)`: 桌面端修复（内容截断，详见 Release 页面）
- **破坏性变更**: 无。
- **迁移注意**: 无特殊要求。

> 另：PR #7462 已将版本号提升至 `2.2.0b6`，预示下一版本即将发布。

---

## 3. 项目进展

今日合并/关闭的 PR 覆盖了打包修复、前端体验、依赖合规、CI 优化等多个方面，项目整体向 v2.2.0 稳定版迈进：

- **修复 Windows 打包中 reme-ai Python 核心缺失问题**（[PR #7453](https://github.com/agentscope-ai/QwenPaw/pull/7453)）— 解决 #7446 中“Rebuild Memory Index”返回 500 的根因，修复 PyInstaller onedir 打包后 `_internal/reme/` 为空的问题。
- **修复截图保存路径**（[PR #7439](https://github.com/agentscope-ai/QwenPaw/pull/7439)）— 截图现在保存到当前活动项目目录，修复预览错误。
- **暴露 DingTalk `card_auto_layout` 开关**（[PR #7416](https://github.com/agentscope-ai/QwenPaw/pull/7416)）— 将后端已支持但 UI 未暴露的宽屏卡片选项添加到 Console 渠道设置和文档中。
- **排除可选 GPL Pylint 运行时依赖**（[PR #7429](https://github.com/agentscope-ai/QwenPaw/pull/7429)）— 解决 #7428 的合规性问题，避免在运行时捆绑 GPL 组件。
- **修复暗黑模式覆盖失效**（[PR #7454](https://github.com/agentscope-ai/QwenPaw/pull/7454)）— 修复 Less `&` 嵌套导致的 CSS 选择器不匹配问题，恢复暗黑模式下多个 UI 元素的样式。
- **复制助手文本时排除推理内容**（[PR #7448](https://github.com/agentscope-ai/QwenPaw/pull/7448)）— 复制操作现在只复制普通助手文本，不包含 reasoning/thinking 条目。
- **CI 并发优化**（[PR #7435](https://github.com/agentscope-ai/QwenPaw/pull/7435)）— 将集成测试改为单元测试后顺序执行，并采用单平台回退，缓解 GitHub Team 计划 60 并发上限导致的 PR 互相阻塞问题。
- **修复 `~` 在 agent 工作区目录中的展开**（[PR #7432](https://github.com/agentscope-ai/QwenPaw/pull/7432)）— 使 tilde 配置的工作区能正确纳入 `/api/agent-stats/llm-tool-trend` 统计。

---

## 4. 社区热点

### 最热讨论：#7318 — QwenPaw Hub 多租户版即将推出，社区期待什么？
- **链接**: https://github.com/agentscope-ai/QwenPaw/issues/7318
- **评论**: 15 | 👍: 3
- **分析**: 这是当前社区最关注的话题。QwenPaw 从个人 AI 助手走向团队/多租户部署，回应了社区长期以来的诉求（如 #2324 多用户访问和管理员管理的技能）。讨论热度高说明用户对团队协作场景有强烈需求，Hub 的路线图规划将直接影响社区生态发展。

### 次热讨论：#7420 — 工具结果丢失 + 同一命令重新分发触发 doom-loop 保护
- **链接**: https://github.com/agentscope-ai/QwenPaw/issues/7420
- **评论**: 8
- **分析**: 用户升级到 2.2.0-beta.1 后遇到严重稳定性问题，单次会话出现 5 次卡死，涉及两种不同机制。该问题直接影响核心 Agent 执行可靠性，社区关注度高。

### 中文社区关注：#7450 — 主 Agent + 多子 Agent 任务中，主 Agent 不主动查询子 Agent 状态
- **链接**: https://github.com/agentscope-ai/QwenPaw/issues/7450
- **评论**: 5
- **分析**: 用户反馈在复杂任务分解场景中，主 Agent 需要被用户追问“进度如何”才会查询子 Agent 状态，否则长时间无动静。这反映了多 Agent 协作中主动进度汇报机制的缺失。

---

## 5. Bug 与稳定性

按严重程度排列：

### 高严重度

1. **工具结果丢失 + 命令重新分发触发 doom-loop 保护**（[#7420](https://github.com/agentscope-ai/QwenPaw/issues/7420)）
   - 版本: 2.2.0-beta.1 | 状态: OPEN
   - 影响: 单会话 5 次卡死，核心执行链路可靠性受损
   - 修复 PR: 暂无

2. **上下文较长时早期上下文记录彻底丢失**（[#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447)）
   - 版本: 2.2 beta3 | 状态: OPEN
   - 影响: 长文档处理任务无法继续，用户数据丢失
   - 修复 PR: 暂无

3. **Embedding 索引重建失败（500 Internal Server Error）**（[#7446](https://github.com/agentscope-ai/QwenPaw/issues/7446)）
   - 版本: 2.2.0b5 | 状态: CLOSED
   - 根因: Windows 打包中 `_internal/reme/` 为空，`_reme` 为 None
   - 修复 PR: [#7453](https://github.com/agentscope-ai/QwenPaw/pull/7453)（已合并）

### 中严重度

4. **Console 流式输出出现大量重复文本块**（[#7417](https://github.com/agentscope-ai/QwenPaw/issues/7417)）
   - 版本: 2.2.0b3 | 状态: OPEN
   - 影响: 前端展示异常，SSE 事件重放路径疑似存在问题
   - 修复 PR: 暂无

5. **DashScope Embedding 索引重建配置总被检测为未保存**（[#7464](https://github.com/agentscope-ai/QwenPaw/issues/7464)）
   - 版本: 2.2.0b5 | 状态: OPEN
   - 影响: 配置保存后仍提示未保存，功能不可用
   - 修复 PR: [#7465](https://github.com/agentscope-ai/QwenPaw/pull/7465)（OPEN）

6. **Bundled llama.cpp 无法加载 Spark-X2.5 GGUF**（[#7463](https://github.com/agentscope-ai/QwenPaw/issues/7463)）
   - 版本: 2.2.0b5 | 状态: CLOSED（重复提交 #7459 仍 OPEN）
   - 影响: 本地模型库下载的模型无法加载，提示未知架构 `spark2_5`
   - 修复 PR: 暂无

### 低严重度

7. **loop.rubric 强制确认轮次 + Console 自动折叠隐藏实质性首响应**（[#7467](https://github.com/agentscope-ai/QwenPaw/issues/7467)）
   - 版本: 2.2.0-beta.3 | 状态: OPEN
   - 影响: 用户体验下降，每次任务都多一轮确认
   - 修复 PR: 暂无

8. **零停机重载复用已关闭的 memory_manager**（[#7364](https://github.com/agentscope-ai/QwenPaw/issues/7364)）
   - 版本: 2.2.0b1 | 状态: CLOSED
   - 影响: memory_search 永久失效
   - 修复 PR: 已关闭，修复已合入

---

## 6. 功能请求与路线图信号

### 可能纳入 v2.2.0 的功能

1. **支持轮内排队事件**（[#7461](https://github.com/agentscope-ai/QwenPaw/issues/7461)）
   - 诉求: 允许用户在 Agent 执行工具期间发送的消息被注入当前轨迹，而不是排队到下一轮。
   - 信号: 新开 Issue，暂无对应 PR，但属于交互体验重要改进。

2. **`tool_call_format` 配置项**（[#7436](https://github.com/agentscope-ai/QwenPaw/issues/7436)）
   - 诉求: 控制 IM 渠道（飞书、钉钉等）中工具调用消息的展示格式，支持紧凑模式。
   - 信号: 已有明确方案描述，可能被采纳。

3. **所有自带“云端提供商”可停用**（[#7455](https://github.com/agentscope-ai/QwenPaw/issues/7455)）
   - 诉求: Kilo Code 和 opencode 等内置提供商无法停用，用户希望拥有完全控制权。
   - 信号: 已关闭（close-and-review-later），可能进入后续版本规划。

### 已在 PR 中的功能

4. **Auto Fin 作为一等调度长期记忆源**（[PR #7441](https://github.com/agentscope-ai/QwenPaw/pull/7441)）
   - 内容: 新增 Auto Fin 记忆源，升级 ReMe 至 0.4.1.11，与 Daily Paper 并列出现在 Agent 记忆设置中。
   - 状态: OPEN，可能随 v2.2.0 发布。

5. **Pawport 导入流程**（[PR #6960](https://github.com/agentscope-ai/QwenPaw/pull/6960)）
   - 内容: 支持从 Codex、Qoder 等其他 Agent 导入指令、设置、技能、插件、项目等。
   - 状态: OPEN（first-time-contributor），等待 review。

6. **会话级模型覆盖**（[PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992)）
   - 内容: 允许单个 Agent 在不同会话中使用不同 LLM，默认关闭，不影响现有行为。
   - 状态: OPEN（Under Review），已持续较长时间。

---

## 7. 用户反馈摘要

- **多租户需求强烈**: 社区多次提出团队级部署需求（#7318），用户希望 QwenPaw 能支持多用户访问和管理员管理的技能，Hub 的推出受到期待。
- **2.2.0-beta 系列稳定性抱怨**: 多个用户反馈升级后出现卡死（#7420）、上下文丢失（#7447）、流式输出异常（#7417）等问题，beta 版本质量仍需加强。
- **多 Agent 协作体验待改进**: 用户期望主 Agent 能主动汇报子 Agent 进度，而不是被动等待用户询问（#7450）。
- **中文文件名处理问题**: 处理含中文文件名的 PDF 时报错（#7379），影响中文用户日常使用。
- **本地模型支持不足**: 用户尝试加载 Spark-X2.5 GGUF 失败（#7463），本地模型生态兼容性有待扩展。
- **安全顾虑**: 有用户反馈危险指令容易绕过安全机制（#7443），安全问题需要重视。

---

## 8. 待处理积压

### 长期未合并的 PR

1. **[PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) — 会话级模型覆盖**（创建于 2026-07-12，已超 50 天）
   - 状态: OPEN（Under Review）
   - 提醒: 该功能对高级用户有明确价值，建议维护者尽快 review 或给出反馈。

2. **[PR #6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) — Pawport 导入流程**（创建于 2026-08-13）
   - 状态: OPEN（first-time-contributor）
   - 提醒: 功能完整度较高，涉及从其他 Agent 导入配置，建议安排 review。

3. **[PR #7348](https://github.com/agentscope-ai/QwenPaw/pull/7348) — v2.2.0 发布说明**（创建于 2026-08-27）
   - 状态: OPEN
   - 提醒: 发布说明 PR 应尽快合入，避免阻塞正式版发布流程。

### 长期未响应的 Issue

4. **[#7003](https://github.com/agentscope-ai/QwenPaw/issues/7003) — ViBo 记忆方案提案**（创建于 2026-08-13，已关闭）
   - 状态: CLOSED
   - 提醒: 该提案提出加密记忆方案，虽已关闭但社区对记忆优化的需求持续存在，建议在路线图中明确回应。

---

**总结**: QwenPaw 正处于 v2.2.0 发布前的高强度迭代期，社区活跃度高，核心功能（多租户 Hub、记忆系统、多 Agent 协作）正在快速演进。但 beta 版本暴露的稳定性问题需要优先解决，特别是工具结果丢失和上下文丢失两个高严重度 Bug。建议维护团队在推进新功能的同时，加大对回归测试和打包质量的投入，确保 v2.2.0 正式版达到企业级可靠性标准。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-09-01

---

## 1. 今日速览

过去 24 小时 Hermes Agent 项目保持极高活跃度：**500 条 Issue 更新**（新开/活跃 323，关闭 177）与 **500 条 PR 更新**（待合并 361，已合并/关闭 139）双线并进，同时发布 **v0.21.0 (Pantheon Release)** 里程碑版本。自 v0.20.0 以来，项目累计合并约 2,475 个 PR、关闭约 2,100 个 Issue，吸引 760+ 贡献者，代码库净增约 86.9 万行。今日 PR 队列中涌现大量 **salvage（救回）类 PR**，表明维护者正在系统性地回收此前被关闭但仍有价值的 PR，项目治理趋于精细化。稳定性修复（桌面端、更新器、Windows 平台）与基础设施问题（skills 索引、state.db 损坏）是当前社区关注焦点。

---

## 2. 版本发布

### Hermes Agent v0.21.0 (v2026.8.31) — "The Pantheon Release"

- **发布日期：** 2026-08-31
- **自 v0.20.0 以来的规模：** 约 5,800 commits · 约 2,475 个合并 PR · 约 5,680 个文件变更 · 约 86.9 万行新增 · 约 13.5 万行删除 · **约 2,100 个 Issue 关闭** · 760+ 贡献者

**发布说明摘要：** v0.20.0 使 Hermes 成为先驱（herald），而 v0.21.0 作为 "Pantheon Release" 标志着项目进入众神并立的新阶段。具体更新内容、破坏性变更与迁移指南尚未在 Release Notes 中完整展开，建议关注后续补充说明。

> ⚠️ **注意：** 当前 Release Notes 仅提供了概述性开头，未列出详细的破坏性变更（breaking changes）与迁移注意事项。升级前请关注仓库 Release 页面的后续更新。

🔗 [查看 Release](https://github.com/NousResearch/hermes-agent/releases)

---

## 3. 项目进展

今日共有 **139 个 PR 被合并或关闭**，以下为已合并/关闭的关键 PR 及其意义：

### 已合并/关闭 PR

| PR | 内容 | 意义 |
|---|---|---|
| [#100142](https://github.com/NousResearch/hermes-agent/pull/100142) | **fix(gemini): echo bridged tool_call name on the OpenAI-compatible path** | 修复 Gemini 经 OpenAI 兼容网关（OpenRouter、Vertex/LiteLLM 代理）调用 Tool Search 桥接 MCP 工具后 400 错误的问题，维护 #72089 不变量 |
| [#93439](https://github.com/NousResearch/hermes-agent/pull/93439) | **fix(agent): run init-time fallback for ANY exhausted primary provider** | 修复当主 provider 为 `openrouter`（大多数用户的默认配置）且凭证池耗尽时，`AIAgent.__init__` 未触发回退的问题。这是 #17929 回退逻辑嵌套在错误 guard 内导致的缺陷 |

### 值得关注的进行中 PR（反映项目方向）

- [#98470](https://github.com/NousResearch/hermes-agent/pull/98470) **feat(agent): add validated worker collaboration contracts** — 为 Hermes worker 协作增加 JSON-safe 契约层，使证据、目标、能力、共识和 worker 模式期望显式化，且不改变运行时权限与调度
- [#100168](https://github.com/NousResearch/hermes-agent/pull/100168) **fix(kanban): enforce profile task contracts** — 为 Kanban 路由增加配置门控的 profile 能力/任务契约默认值，在 claim/spawn 前阻止不兼容的 worker/reviewer 分配
- [#94697](https://github.com/NousResearch/hermes-agent/pull/94697) **fix(bot-mode): keep active turns running after viewer detach** — 使 Bot 拥有的回合在查看器断开后继续运行，区分"查看器离开"与"用户停止"

**整体判断：** 项目正在从"功能扩张期"进入"稳定性与治理加固期"，同时通过契约层设计为多 agent 协作奠定基础。

---

## 4. 社区热点

### 讨论热度最高

| Issue | 评论数 | 主题 | 诉求分析 |
|---|---|---|---|
| [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) | **134** | Skills 索引过期（29.8h 旧，限制 26h），状态 `degraded` | 自动化探针持续报警但无人修复，社区对基础设施可靠性的关注度极高 |
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) | **49** | 定时 Nous-to-Enterkey 合并因 `cron/jobs.py` 冲突被阻塞 | 集成管道长期受阻，影响依赖自动合并的团队 |
| [#25267](https://github.com/NousResearch/hermes-agent/issues/25267) | **18**（👍 53） | 希望 Claude Agent SDK 支持订阅 OAuth（Codex 风格），避免订阅用户双重付费 | **社区呼声最高的功能请求**，53 个 👍 表明大量 Claude 订阅用户希望免 API 费用使用 Hermes |
| [#10421](https://github.com/NousResearch/hermes-agent/issues/10421) | **18**（👍 9） | 希望增加 turn 级实时时间上下文，让 agent 感知"现在/今天/当前星期" | 反映 agent 在长时间会话中对时间感知的需求，影响任务规划与上下文理解 |

### 高赞 Issue

- [#95003](https://github.com/NousResearch/hermes-agent/issues/95003)（已关闭，👍 9）：xAI 拒绝 `tool_search` 为保留函数名的问题，已修复
- [#37811](https://github.com/NousResearch/hermes-agent/issues/37811)（已关闭，👍 7）：桌面端聊天视图自动上滚问题，已标记为重复并实现于 main

**社区情绪：** 用户对基础设施稳定性（索引、集成管道）的耐心正在消耗，但对功能请求（Claude OAuth、时间感知）表现出强烈兴趣。

---

## 5. Bug 与稳定性

### P1 级（严重）

| Issue | 问题 | 状态 | Fix PR |
|---|---|---|---|
| [#93888](https://github.com/NousResearch/hermes-agent/issues/93888) | Desktop 发送本地运行时 ID 到 Remote Gateway，导致会话恢复永久失败 "Session not found" | OPEN | 无 |
| [#51327](https://github.com/NousResearch/hermes-agent/issues/51327) | Linux `.desktop` 启动器静默失败（Electron chrome-sandbox 缺少 setuid 4755） | OPEN | [#89349](https://github.com/NousResearch/hermes-agent/pull/89349)、[#100161](https://github.com/NousResearch/hermes-agent/pull/100161)（salvage） |
| [#88168](https://github.com/NousResearch/hermes-agent/issues/88168) | Windows 下 `contributors/emails/` 大小写碰撞文件导致 git status 永久 dirty | OPEN | [#100055](https://github.com/NousResearch/hermes-agent/pull/100055) |
| [#90837](https://github.com/NousResearch/hermes-agent/issues/90837) | 生产网关 state.db 反复损坏（11 次，小时级 onset 取证） | OPEN | 无 |
| [#97948](https://github.com/NousResearch/hermes-agent/issues/97948) | 手动 `/compress` 报 120s 超时但后台实际成功；大会话压缩租约丢失 | OPEN | 无 |
| [#94248](https://github.com/NousResearch/hermes-agent/issues/94248) | macOS arm64 网关在 delegate 截止后 17-72ms 内 SIGSEGV（12 份崩溃报告） | OPEN | 无 |
| [#97963](https://github.com/NousResearch/hermes-agent/issues/97963) | 卫生压缩 turn-hold（10s 默认）导致思考模型长会话自动压缩 100% 失败（#92318 回归） | OPEN | 无 |
| [#59877](https://github.com/NousResearch/hermes-agent/issues/59877) | Termux 上 Python 3.14.6 不满足 `<3.14,>=3.11` 导致安装失败 | OPEN | 无 |

### 已关闭（今日修复确认）

| Issue | 问题 | 结果 |
|---|---|---|
| [#89614](https://github.com/NousResearch/hermes-agent/issues/89614) | Windows 下 stale-PID `taskkill /F /PID` 杀死 svchost.exe 导致蓝屏（0xEF） | CLOSED |
| [#94058](https://github.com/NousResearch/hermes-agent/issues/94058) | Linux 桌面入口 Exec 解析 venv 符号链接为裸解释器，升级后启动崩溃 | CLOSED |
| [#83846](https://github.com/NousResearch/hermes-agent/issues/83846) | Windows ZIP 回退更新删除桌面应用且不重建，后续更新报 "Already up to date" | CLOSED |
| [#95003](https://github.com/NousResearch/hermes-agent/issues/95003) | xAI 拒绝 `tool_search` 保留函数名 | CLOSED |
| [#83529](https://github.com/NousResearch/hermes-agent/issues/83529) | `hermes update` 灾难性失败（Debian Trixie） | CLOSED |
| [#80439](https://github.com/NousResearch/hermes-agent/issues/80439) | 自动生成的 hermes.desktop Exec 路径错误，破坏 KDE 任务栏固定 | CLOSED |

### 稳定性趋势

- **Windows 平台**是今日 Bug 重灾区（蓝屏、大小写碰撞、ZIP 更新破坏），但多数已有对应修复 PR
- **会话状态管理**（state.db、session restore、compression）出现多个独立问题，暗示核心存储层需要更系统的压力测试
- **更新器（updater）** 相关 Bug 密集（#83529、#83846、#94058、#80439），但均已关闭，说明修复有效

---

## 6. 功能请求与路线图信号

### 高潜力功能请求

| Issue | 功能 | 信号强度 |
|---|---|---|
| [#25267](https://github.com/NousResearch/hermes-agent/issues/25267) | Claude Agent SDK 订阅 OAuth（Codex 风格） | **强**（53 👍，18 评论，`needs-decision`） |
| [#77111](https://github.com/NousResearch/hermes-agent/issues/77111) | RealtimeVoiceProvider ABC — 4 个竞争的双工语音 PR 需要统一接口 | **中强**（触发 AGENTS.md Footprint Ladder 规则） |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | Bot 群聊在 Desktop 关闭后继续运行 | **中强**（P2，已有 [#94697](https://github.com/NousResearch/hermes-agent/pull/94697) 部分实现） |
| [#95163](https://github.com/NousResearch/hermes-agent/issues/95163) | 可选的后端托管群组房间（gateway 侧轮次驱动 + 权威房间日志） | 中（P3，`needs-decision`） |
| [#10421](https://github.com/NousResearch/hermes-agent/issues/10421) | Turn 级实时时间上下文 | 中（9 👍，18 评论） |
| [#52137](https://github.com/NousResearch/hermes-agent/issues/52137) | 俄语（ru-RU）本地化 | 中（已有法语、中文、葡萄牙语请求） |

### 路线图信号

- **Worker 协作契约层**（[#98470](https://github.com/NousResearch/hermes-agent/pull/98470)）与 **Kanban 任务契约**（[#100168](https://github.com/NousResearch/hermes-agent/pull/100168)）表明项目正在为多 agent 协作建立正式化框架
- **Bot 群聊持久化**（#97681 + #94697 + #95163）是明确的下一阶段方向，涉及 gateway 权威与桌面端解耦
- **语音接口标准化**（#77111）可能进入 v0.22 规划，需关注 `needs-decision` 标签的最终裁定

---

## 7. 用户反馈摘要

### 真实痛点

1. **"双重付费"困境**（[#25267](https://github.com/NousResearch/hermes-agent/issues/25267)）：Claude 订阅用户被迫为 API 单独付费，"effectively pay twice" — 这是商业化相关的最强烈用户呼声
2. **更新器破坏安装**（[#83529](https://github.com/NousResearch/hermes-agent/issues/83529)）："I just got an update and tried to update. Failing catastrophically. It was working yesterday." — 更新流程的可靠性直接影响用户信任
3. **Windows 蓝屏**（[#89614](https://github.com/NousResearch/hermes-agent/issues/89614)）：Hermes 杀死 svchost.exe 导致系统崩溃，属于最高级别的用户伤害事件
4. **静默失败**（[#51327](https://github.com/NousResearch/hermes-agent/issues/51327)）：桌面应用从启动器点击后"无窗口、无错误对话框"直接消失，排查成本极高
5. **压缩超时误导**（[#97948](https://github.com/NousResearch/hermes-agent/issues/97948)）：UI 报告 120s 超时但后台实际成功，且会话被静默轮换到新 ID — 用户对会话状态失去掌控感

### 使用场景

- **生产网关部署**（#90837、#94248）：用户以 gateway 模式 7×24 运行，对 state.db 损坏和 SIGSEGV 零容忍
- **Termux/移动端**（#59877）：Python 版本兼容性阻碍了移动端用户
- **多 profile 管理**（#66887、#67605）：高级用户通过 Telegram/桌面端管理多个 profile，但存储与配置作用域不一致导致混乱

### 满意/不满意

- **满意：** 修复速度（今日 6 个 P1 Bug 关闭）、salvage PR 机制（保留原作者贡献）
- **不满意：** 基础设施监控（#66616 索引过期 134 评论无人修复）、集成管道长期阻塞（#88584）

---

## 8. 待处理积压

### 长期未关闭的重要 Issue

| Issue | 创建时间 | 标签 | 备注 |
|---|---|---|---|
| [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) | 2026-07-18 | P3, sweeper:risk-automation | **134 评论**，skills 索引持续 degraded，自动化探针已报警 45 天 |
| [#25267](https://github.com/NousResearch/hermes-agent/issues/25267) | 2026-05-13 | P3, needs-decision, area/billing | **53 👍**，Claude 订阅 OAuth，已等待 111 天 |
| [#10421](https://github.com/NousResearch/hermes-agent/issues/10421) | 2026-04-15 | P3 | Turn 级时间上下文，已等待 139 天 |
| [#27013](https://github.com/NousResearch/hermes-agent/issues/27013) | 2026-05-16 | P3, needs-decision, sweeper:risk-session-state | Agent 跨会话丢失项目上下文，已等待 108 天 |
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) | 2026-06-05 | P3 | `--initial-status blocked` 任务 1 秒后自动提升，绕过人工审批门禁 |
| [#59877](https://github.com/NousResearch/hermes-agent/issues/59877) | 2026-07-06 | P1 | Termux Python 3.14 兼容性，已等待 57 天 |
| [#52137](https://github.com/NousResearch/hermes-agent/issues/52137) | 2026-06-24 | P3, area/i18n | 俄语本地化，已等待 69 天 |

### 维护者提醒

- **#66616** 是当前社区关注度最高的未解决问题（134 评论），建议优先处理 skills 索引的自动化修复或降级告警阈值
- **#25267** 作为 👍 数最高的功能请求，建议在 v0.22 路线图中明确决策（`needs-decision` 已挂 4 个月）
- **#90837**（state.db 反复损坏）与 **#94248**（SIGSEGV）均无 fix PR，且涉及生产环境数据安全，建议提升优先级

---

*本日报由 AI 自动生成，数据来源于 hermes-agent GitHub 仓库公开信息，统计窗口为 2026-08-31 至 2026-09-01。*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

## AstrBot 项目动态日报 — 2026-09-01

### 1. 今日速览

AstrBot 今日保持高活跃度：24小时内产生 7 条 Issue 更新与 20 条 PR 更新，并发布补丁版本 v4.27.5。核心进展集中在插件更新检测修复（#9887）、知识库混合检索优化（#9888/#9889）、以及多平台适配器群组元数据增强（#9851）等方向。社区侧，Windows 原生沙箱启动器（#9895）与 STT 延迟指标（#9894）两项新功能 PR 值得关注。项目整体处于快速迭代、社区参与度高的健康状态。

### 2. 版本发布

**v4.27.5**（2026-09-01）— 补丁版本

- **修复**：首次执行 `astrbot run` 时未显示初始随机密码的问题（#9879）。
- **提示**：用户也可通过 `astrbot password` 命令修改密码。
- **破坏性变更**：无。
- **迁移注意**：常规升级即可，无特殊迁移步骤。

🔗 [查看 Release](https://github.com/AstrBotDevs/AstrBot/releases)

### 3. 项目进展

今日合并/关闭的 PR 中，以下对项目推进较为关键：

- **修复插件更新检测失效（#9887，已合并）**：解决了自 v4.26.2 安装源持久化功能之前安装的插件，因缺少 `plugin_install_sources` 记录而无法在前端显示更新的问题。直接修复 Issue #9668。
- **跨适配器群组元数据增强（#9851，已合并）**：统一了各平台适配器的群组元数据支持，使 `AstrMessageEvent.get_group()` 返回更完整的数据，便于会话别名与插件使用。
- **修复空消息链响应阶段异常（#9653，已合并）**：当 `stop_event()` 构建空 `MessageEventResult` 时，跳过不必要的响应阶段，避免潜在异常。
- **Dashboard 配置产品化重构（#9883，已合并）**：围绕内置 AI 工作区重新设计配置文件界面，优化分组、文案与响应式布局，并复用可搜索的提供商/模型菜单。
- **修复最小 pages 示例插件无法注册（#9858，已合并）**：修复了使用最小 pages 实例时插件页面缺失的问题。

🔗 [PR #9887](https://github.com/AstrBotDevs/AstrBot/pull/9887) | [PR #9851](https://github.com/AstrBotDevs/AstrBot/pull/9851) | [PR #9653](https://github.com/AstrBotDevs/AstrBot/pull/9653) | [PR #9883](https://github.com/AstrBotDevs/AstrBot/pull/9883) | [PR #9858](https://github.com/AstrBotDevs/AstrBot/pull/9858)

### 4. 社区热点

- **插件更新检测失效（#9668，已关闭）**：该 Issue 获得 1 👍，用户详细描述了 v4.27.3 中插件更新检测不刷新的问题，并附截图。社区反馈积极，已由 PR #9887 修复并关闭。
- **LLM 唤醒词设置无效（#9884，开放中）**：用户报告开启 `platform_settings.empty_mention_waiting` 后，空 @ 机器人会触发 LLM 回复，导致唤醒词设置失效。已有对应修复 PR #9890 提交，社区关注度较高。
- **知识库混合检索失真（#9868，开放中）**：用户指出 Dense 召回失败时可能压掉 Sparse 的精确匹配，导致短英文实体检索不到。已有 PR #9888 提出修复方案。

🔗 [Issue #9668](https://github.com/AstrBotDevs/AstrBot/issues/9668) | [Issue #9884](https://github.com/AstrBotDevs/AstrBot/issues/9884) | [Issue #9868](https://github.com/AstrBotDevs/AstrBot/issues/9868)

### 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue | 描述 | 修复 PR |
|---|---|---|---|
| 高 | [#9884](https://github.com/AstrBotDevs/AstrBot/issues/9884) | 开启空 @ 等待后，LLM 唤醒词设置无效，机器人被空 @ 本身触发 | [#9890](https://github.com/AstrBotDevs/AstrBot/pull/9890)（开放中） |
| 高 | [#9868](https://github.com/AstrBotDevs/AstrBot/issues/9868) | 知识库混合检索 Dense 召回失败时压掉 Sparse 精确匹配，短英文实体检索失真 | [#9888](https://github.com/AstrBotDevs/AstrBot/pull/9888)（开放中） |
| 中 | [#9668](https://github.com/AstrBotDevs/AstrBot/issues/9668) | 插件更新检测失效，需重新安装或更换插件源后才显示更新 | [#9887](https://github.com/AstrBotDevs/AstrBot/pull/9887)（已合并） |
| 中 | [#9742](https://github.com/AstrBotDevs/AstrBot/issues/9742) | 创建同为 aiocqhttp 的适配器时，无法在正确的账号上操作 | 已关闭（未合并 PR） |

### 6. 功能请求与路线图信号

- **QQ 官方机器人按钮回调事件（#9891，新开）**：用户希望 AstrBot 官方支持 `INTERACTION_CREATE` 事件，用于消息卡片按钮交互。目前无对应 PR，但属于平台适配层能力，可能纳入后续版本。
- **插件配置人格选择器增加“清空当前选择”选项（#9407，开放中）**：用户建议在插件配置的人格选择器中提供清空选项，提升配置灵活性。已有 1 条评论，暂无对应 PR。
- **Windows 原生沙箱启动器（#9895，PR 开放中）**：新增 `provider_settings.sandbox.booter = "native"` 选项，使 agent 生成的命令/代码可在 Windows 上无需 Docker 或管理员权限隔离运行。该 PR 今日刚提交，若被合并将显著提升 Windows 用户体验。
- **STT 延迟与 RTF 指标（#9894，PR 开放中）**：为语音转文本调用添加计时与实时因子指标，使用户可在 Live Mode 仪表盘直接观察 STT 延迟。目前仪表盘仅显示 TTS/聊天延迟，此 PR 将补齐可观测性短板。
- **ChatUI 代码高亮扩展（#9892，PR 开放中）**：为 ChatUI 的 Shiki 精简包补充 C、C++、Rust、Go 等常用语言语法支持，提升 Markdown 代码块渲染效果。

🔗 [Issue #9891](https://github.com/AstrBotDevs/AstrBot/issues/9891) | [Issue #9407](https://github.com/AstrBotDevs/AstrBot/issues/9407) | [PR #9895](https://github.com/AstrBotDevs/AstrBot/pull/9895) | [PR #9894](https://github.com/AstrBotDevs/AstrBot/pull/9894) | [PR #9892](https://github.com/AstrBotDevs/AstrBot/pull/9892)

### 7. 用户反馈摘要

- **插件更新检测体验不佳**：用户 @shangzhimingge 反馈，插件有新版时常规检查不显示更新，需手动“重新安装”或“更换插件源”后才出现更新提示。这反映了插件市场数据刷新机制存在感知缺口，已通过 #9887 修复。
- **空 @ 触发 LLM 的困扰**：用户 @liushuill 指出，在默认开启“只 @ 机器人是否触发等待”的情况下，空 @ 机器人会触发 LLM 主动回复，与唤醒词设置预期不符。该问题影响日常群聊体验，修复 PR #9890 已提交。
- **知识库检索精确性诉求**：用户 @ViceAdmiralGrafSpee 报告，知识库中存在罕见的精确字符串但混合检索结果中完全没有，说明用户对知识库检索的精确性有较高要求，尤其对短英文实体等边界场景。
- **发布空间误封求助**：用户 @ZHYSNAKE 因上传 `__pycache__` 导致发布空间被禁，在 Issue #9893 中求助解除方法。这属于使用规范问题，可能需要维护者补充文档说明。

### 8. 待处理积压

以下为长期未合并或未响应的 PR/Issue，建议维护者关注：

- **PR #8179（Opencode Zen & Go as Provider）**：自 2026-05-13 创建，已近 4 个月未合并。该 PR 涉及 WebUI 与 Provider 两大模块，改动量较大（size:XL），可能需要更充分的 review。
- **PR #9554（OpenAI Responses Provider 原生工具支持）**：自 2026-08-05 创建，已近 1 个月。该 PR 为 OpenAI Responses API 添加原生工具支持（web_search、file_search 等），功能价值较高，但涉及 Dashboard 配置与 Provider 核心逻辑，建议加快 review 进度。
- **Issue #9407（人格选择器清空选项）**：自 2026-07-26 创建，已 1 个多月，仅有 1 条评论，暂无 PR 或维护者回应。属于较小的 UI 增强，可考虑标记 `good first issue` 或快速响应。

🔗 [PR #8179](https://github.com/AstrBotDevs/AstrBot/pull/8179) | [PR #9554](https://github.com/AstrBotDevs/AstrBot/pull/9554) | [Issue #9407](https://github.com/AstrBotDevs/AstrBot/issues/9407)

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*