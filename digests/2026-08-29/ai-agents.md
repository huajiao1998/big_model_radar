# OpenClaw 生态日报 2026-08-29

> Issues: 500 | PRs: 500 | 覆盖项目: 6 个 | 生成时间: 2026-08-29 03:24 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-29

## 1. 今日速览

过去24小时OpenClaw项目保持极高活跃度：共500条Issue更新（新开/活跃423条，关闭77条）和500条PR更新（合并/关闭273条，待合并227条），并发布v2026.9.1-beta.1版本。新版本重点改进Gateway重启恢复与配置写入可靠性，直接回应了近期多个P1级"恢复卡死"类问题。社区讨论热度集中在成本控制（#42475）、Codex后端Telegram超时（#87744）和流式看门狗配置（#68596）三大方向。项目整体处于密集迭代期，但P1级Bug数量较多（约15个），消息丢失与会话状态类问题占比突出，稳定性仍是当前最大挑战。

---

## 2. 版本发布

### v2026.9.1-beta.1
- **发布时间**：2026-08-29
- **发布链接**：[GitHub Releases](https://github.com/openclaw/openclaw/releases)

**主要更新内容**：

1. **Gateway重启恢复增强**（#130491，感谢@jalehman）：在多次Gateway重启后保留已受理的turns，使重启安全的运行能持续通过每个检查点并交付最终响应。这直接回应了社区长期反馈的"重启后会话丢失/卡死"问题。

2. **Gateway配置写入可靠性提升**：保持已提交配置的可写性，避免配置写入失败导致的服务中断。

**破坏性变更**：暂无明确说明。

**迁移注意事项**：beta版本，建议生产环境谨慎升级；涉及Gateway重启恢复逻辑变更，升级后建议验证重启场景下的会话恢复行为。

---

## 3. 项目进展

今日合并/关闭的重要PR反映了项目在**会话状态管理、UI稳定性、跨渠道消息投递**三个方向的持续修复：

| PR | 内容 | 状态 |
|---|---|---|
| [#123535](https://github.com/openclaw/openclaw/pull/123535) | fix(ui): 避免会话目录刷新风暴 — 修复侧边栏在窗口聚焦/操作者变化时触发冗余全量刷新 | ✅ 已合并 |
| [#126424](https://github.com/openclaw/openclaw/pull/126424) | fix(gateway): 保持会话投递在agent绑定范围内 — 修复多agent操作者使用会话工具时消息投递超出预期绑定的问题 | ✅ 已合并 |
| [#68187](https://github.com/openclaw/openclaw/issues/68187) | SSE-backed MCP会话在服务器重启后保持陈旧状态并报"Session not found" | ✅ 已关闭 |

**整体评估**：项目正系统性地解决Gateway重启恢复、会话状态一致性、UI交互稳定性三大技术债。v2026.9.1-beta.1的发布标志着重启恢复能力进入验证阶段，但大量P1级问题仍处于"待维护者评审"状态，修复速度略滞后于问题发现速度。

---

## 4. 社区热点

### 讨论热度TOP3

**1. [#42475 - Per-agent成本预算执行](https://github.com/openclaw/openclaw/issues/42475)**（💬 23条评论）
- **诉求**：在Gateway层面增加可选的每agent成本预算（日/月上限），在调用模型前强制执行，防止失控支出。
- **分析**：这是运维侧的核心痛点。当前`session-cost-usage.ts`仅跟踪每会话成本，缺少全局性的预算闸门。评论数高企说明企业级用户对成本治理有强烈需求。

**2. [#87744 - Codex-backed Telegram turns反复超时](https://github.com/openclaw/openclaw/issues/87744)**（💬 18条评论，👍 4）
- **诉求**：2026.5.27版本后，Codex后端的Telegram会话反复执行工作但从未到达`turn/completed`终态，导致用户收不到最终回复。
- **分析**：这是P1级可靠性回归，直接影响用户体验。评论中用户反馈"do work but never deliver"的模式表明问题可能出在状态机转换或回调机制上，而非模型本身。

**3. [#68596 - 可配置流式看门狗超时阈值](https://github.com/openclaw/openclaw/issues/68596)**（💬 15条评论，👍 8）
- **诉求**：为执行扩展推理的模型（如kimi-k2.5、DeepSeek-R1）提供可配置的流式看门狗超时阈值，避免30秒无更新即重置状态的误报。
- **分析**：👍 8是今日最高赞，反映大量用户在使用长推理模型时遭遇此问题。这是"模型能力提升 vs 基础设施适配"的典型矛盾。

---

## 5. Bug 与稳定性

### P1级严重问题（按影响面排序）

| Issue | 问题描述 | 状态 |
|---|---|---|
| [#87744](https://github.com/openclaw/openclaw/issues/87744) | Codex-backed Telegram turns反复超时，永不到达终态 | 🔴 无fix PR |
| [#96834](https://github.com/openclaw/openclaw/issues/96834) | WhatsApp 1:1入站图片楔住主通道约3分钟，多模态run卡在active_reply_work | 🔴 无fix PR |
| [#87561](https://github.com/openclaw/openclaw/issues/87561) | 跨渠道最终回退投递语义缺失，用户看到静默而非错误消息 | 🔴 无fix PR |
| [#89278](https://github.com/openclaw/openclaw/issues/89278) | Codex OAuth刷新成功但cron/heartbeat因10秒超时失败 | 🔴 无fix PR（有linked PR） |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | hook/tool子进程泄漏，僵尸进程累积导致运行时退化 | 🔴 无fix PR |
| [#98435](https://github.com/openclaw/openclaw/issues/98435) | MCP loopback传输在Gateway重启后不自动重连，recovered=1误导 | 🔴 无fix PR |
| [#99586](https://github.com/openclaw/openclaw/issues/99586) | Gateway相关操作后运行时工具面返回空白body | 🔴 无fix PR |
| [#100941](https://github.com/openclaw/openclaw/issues/100941) | 并行工具扇出时Gateway丢弃WebSocket连接(1006) | 🔴 无fix PR |

### P2级值得关注

- [#51429](https://github.com/openclaw/openclaw/issues/51429)：**硬编码工作路径**被合并发布（/Users/wangtao），社区反响强烈
- [#105528](https://github.com/openclaw/openclaw/issues/105528)：Windows上exec/read工具间歇性返回空输出（v2026.6.x回归）
- [#78805](https://github.com/openclaw/openclaw/issues/78805)：同步I/O（execSync/readFileSync）导致事件循环阻塞4秒

**今日新增fix PR**：
- [#132309](https://github.com/openclaw/openclaw/pull/132309)：修复Telegram会话在成功终态投递后仍运行约15分钟的问题（beta.3）

---

## 6. 功能请求与路线图信号

### 高潜力功能（可能进入下一版本）

| Issue | 功能 | 信号强度 |
|---|---|---|
| [#42475](https://github.com/openclaw/openclaw/issues/42475) | Gateway级每agent成本预算 | ⭐⭐⭐ 评论最多，运维刚需 |
| [#68596](https://github.com/openclaw/openclaw/issues/68596) | 可配置流式看门狗超时 | ⭐⭐⭐ 高赞，影响长推理模型用户 |
| [#42840](https://github.com/openclaw/openclaw/issues/42840) | Control UI支持MathJax/LaTeX渲染 | ⭐⭐ 👍10，学术用户需求明确 |
| [#52640](https://github.com/openclaw/openclaw/issues/52640) | 长时运行channel turns的持久任务状态面 | ⭐⭐ 多channel通用需求 |
| [#45771](https://github.com/openclaw/openclaw/issues/45771) | 内置pace-aware速率限制 | ⭐⭐ 防止API限额烧穿 |
| [#9912](https://github.com/openclaw/openclaw/issues/9912) | maxTurns/maxToolCalls配置项 | ⭐⭐ 防止模型忽略系统提示无限迭代 |

### 路线图信号

- **成本治理**成为企业用户核心诉求（#42475、#45771）
- **长推理模型适配**是当前基础设施短板（#68596、#9912）
- **跨渠道消息可靠性**是持续投入方向（#87561、#55792）

---

## 7. 用户反馈摘要

### 真实痛点

1. **"工作路径被硬编码"事件**（[#51429](https://github.com/openclaw/openclaw/issues/51429)）：用户@buggiant-coder发现安装最新版后OpenClaw创建了`/Users/wangtao`目录并设为工作区，质疑"这位wangtao是谁？"。这暴露了代码审查流程的漏洞，严重损害社区信任。

2. **Telegram消息丢失**（[#87744](https://github.com/openclaw/openclaw/issues/87744)）：用户@adamamzalag描述"turns repeatedly do work but never reach terminal"，多个Telegram会话在交付最终答案前失败。这是最影响日常使用的可靠性问题。

3. **WhatsApp图片处理楔住**（[#96834](https://github.com/openclaw/openclaw/issues/96834)）：用户@aleps001报告发送图片后主通道楔住约3分钟，多模态run卡在中间状态。图片消息是高频使用场景，此问题严重影响体验。

4. **Windows平台空输出**（[#105528](https://github.com/openclaw/openclaw/issues/105528)）：用户@matts524反馈`echo hello world`和`whoami`都返回空，且间歇性发生、与具体会话相关。跨平台兼容性仍是短板。

5. **升级导致Gateway不可恢复**（[#85027](https://github.com/openclaw/openclaw/issues/85027)）：macOS LaunchAgent从2026.5.6升级到2026.5.19后Gateway完全不可用，最终只能通过Time Machine恢复。升级路径的可靠性需要加强。

### 满意点

- 社区对v2026.9.1-beta.1的Gateway重启恢复改进持积极期待（#130491）
- 维护者对问题的响应速度较快，多数P1问题都有"needs-maintainer-review"标签跟进

---

## 8. 待处理积压

### 长期未解决的重要Issue

| Issue | 创建时间 | 问题 | 备注 |
|---|---|---|---|
| [#9912](https://github.com/openclaw/openclaw/issues/9912) | 2026-02-05 | maxTurns/maxToolCalls配置 | 已积压6个月+，评论6条 |
| [#41165](https://github.com/openclaw/openclaw/issues/41165) | 2026-03-09 | Telegram DM路由到main session | P1，已积压5个月+ |
| [#41744](https://github.com/openclaw/openclaw/issues/41744) | 2026-03-10 | Feishu图片工具结果丢失 | P3，已积压5个月+ |
| [#50291](https://github.com/openclaw/openclaw/issues/50291) | 2026-03-19 | Plugin Hooks缺少trace context | P2，已积压5个月+ |
| [#53540](https://github.com/openclaw/openclaw/issues/53540) | 2026-03-24 | 大参数工具调用触发"Network connection lost" | P1，已积压5个月+ |
| [#55792](https://github.com/openclaw/openclaw/issues/55792) | 2026-03-27 | Gateway重启后错过入站消息 | P1，已积压5个月+ |

### 需维护者重点关注

- **P1级积压**：#41165（Telegram路由）、#53540（大参数工具调用）、#55792（重启后消息补拉）均已积压超5个月，直接影响核心用户体验。
- **PR积压**：[#117176](https://github.com/openclaw/openclaw/pull/117176)（thread-reply标记修复）已开放近1个月，标记为"waiting on author"；[#118307](https://github.com/openclaw/openclaw/pull/118307)（Matrix部分预览保留）已开放近1个月，标记为"needs proof"。

---

## 项目健康度评估

| 维度 | 评分 | 说明 |
|---|---|---|
| 活跃度 | ⭐⭐⭐⭐⭐ | 24小时500+ Issue/PR更新，版本迭代频繁 |
| 响应速度 | ⭐⭐⭐⭐ | 多数新Issue在24小时内获得标签分类 |
| 修复效率 | ⭐⭐⭐ | P1问题平均修复周期较长，部分积压5个月+ |
| 稳定性 | ⭐⭐ | 消息丢失、会话状态损坏类问题多发 |
| 社区信任 | ⭐⭐⭐ | 硬编码路径事件和升级事故影响信任度 |
| 路线图清晰度 | ⭐⭐⭐⭐ | 成本治理、长推理适配、跨渠道可靠性方向明确 |

**总结**：OpenClaw正处于功能快速迭代与稳定性攻坚并行的阶段。v2026.9.1-beta.1的重启恢复改进是重要里程碑，但大量P1级可靠性问题（尤其消息丢失类）需要优先解决。建议维护者关注长期积压的P1问题，并加强代码审查流程以防止类似硬编码路径事件再次发生。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**日期：2026-08-29**


## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**功能快速迭代与稳定性攻坚并行**的关键阶段。头部项目（OpenClaw、hermes-agent）单日 PR/Issue 更新量均达 500 条量级，版本发布频繁，但消息丢失、会话状态损坏等 P1 级可靠性问题普遍存在，稳定性仍是全行业最大挑战。与此同时，各项目不约而同地涌向**成本治理、长推理模型适配、跨渠道消息可靠性、MCP 协议栈稳定性**四大方向，且架构层面对会话所有权、内存生命周期、沙箱策略的梳理正在多个项目中同步展开。生态整体呈现"**功能军备竞赛 vs 基础设施欠账**"的典型张力。


## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 合并率 | 健康度评估 |
|------|------------|---------|---------|--------|-----------|
| **OpenClaw** | 500（新开/活跃 423，关闭 77） | 500（合并/关闭 273，待合并 227） | ✅ v2026.9.1-beta.1 | 54.6% | 活跃度极高，但 P1 约 15 个，稳定性 2 星 |
| **hermes-agent** | 381（新开/活跃 323，关闭 58） | 500（合并/关闭 47，待合并 453） | ❌ 无 | 9.4% | 活跃度极高，MCP 锁问题全线修复，Desktop 战役收官 |
| **QwenPaw** | 50（关闭 36） | 39（合并/关闭 19） | ✅ v2.2.0-beta.2 / beta.3 | 48.7% | 高活跃，2.2.0 功能收尾，MCP 双协议客户端落地 |
| **Zeroclaw** | 48（新开/活跃 40，关闭 8） | 50（合并/关闭 4，待合并 46） | ❌ 无 | 8.0% | 高活跃但合并率极低，大量 RFC 评审积压 |
| **AstrBot** | 8（新开/活跃 7，关闭 1） | 11（待合并 10，关闭 1） | ❌ 无 | 9.1% | 中等活跃，核心 Bug 响应快，PR 合并滞后 |
| **PicoClaw** | 1（stale） | 2（1 合并，1 待合并） | ❌ 无 | 50.0% | 低活跃，平稳维护期，QQ 富媒体支持落地 |

**关键数据洞察**：
- OpenClaw 与 hermes-agent 构成生态第一梯队，单日 PR 均达 500 条
- Zeroclaw 合并率仅 8%，维护者评审带宽是明显瓶颈
- QwenPaw 单日连发两个 beta 版本，迭代节奏最快
- PicoClaw 活跃度显著低于其他项目，处于维护模式


## 3. OpenClaw 在生态中的定位

**OpenClaw 是当前生态中体量最大、社区参与度最高的核心参照项目**，其单日 500 Issue + 500 PR 的活跃度远超其他项目（hermes-agent 次之，381+500）。核心优势在于：

- **渠道覆盖广度**：Telegram、WhatsApp、Codex 等跨渠道消息投递能力是社区讨论的核心场景，其他项目（如 AstrBot 侧重 IM 适配、PicoClaw 侧重 QQ）在渠道多样性上不及
- **版本迭代速度**：v2026.9.1-beta.1 的发布直接回应 Gateway 重启恢复这一长期痛点，版本节奏明显快于 Zeroclaw（无发布）和 hermes-agent（无发布）
- **社区规模与反馈密度**：单 Issue 最高 23 条评论、成本预算诉求（#42475）获得企业级用户持续关注，反映出更广泛的用户基础

**相对短板**：
- **稳定性**：P1 级问题约 15 个，消息丢失与会话状态损坏类问题占比突出，稳定性评分仅 2 星，低于 hermes-agent（MCP 锁问题已系统性修复）和 QwenPaw（MCP 挂起 RPC 已修复）
- **代码审查质量**：硬编码工作路径事件（#51429）严重损害社区信任，暴露审查流程漏洞
- **技术路线差异**：OpenClaw 偏向"大而全"的 Gateway 架构，而 Zeroclaw 走 Rust 高性能路线并强调架构契约先行（RFC 驱动），QwenPaw 则聚焦 MCP 协议栈深度优化与多租户 Hub


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|----------|---------|---------|
| **成本治理** | OpenClaw（#42475 每 agent 成本预算、#45771 速率限制）、QwenPaw（#7335 prompt cache 命中率可观测性） | 企业级用户对模型调用成本的可控性、可观测性需求强烈，当前均缺乏全局预算闸门 |
| **长推理模型适配** | OpenClaw（#68596 流式看门狗超时配置、#9912 maxTurns/maxToolCalls）、QwenPaw（#1775 steer mode） | 30 秒无更新即重置的看门狗机制不适用于 kimi-k2.5、DeepSeek-R1 等长推理模型，需可配置超时与迭代上限 |
| **跨渠道消息可靠性** | OpenClaw（#87561 回退投递语义、#55792 重启后消息补拉）、QwenPaw（#5757 飞书不回复）、Zeroclaw（#10237 Telegram 线程记忆碎片化）、AstrBot（#9864 上下文压缩失忆） | 消息丢失、静默失败、会话状态不一致是跨项目最高频的 P1 级问题 |
| **MCP 协议栈稳定性** | QwenPaw（#7330 双协议客户端、#7329 挂起 RPC 修复）、hermes-agent（#76526/#97458/#51149 OAuth 锁修复）、AstrBot（#9859 Session terminated） | MCP 服务端重启后客户端无法自动恢复、认证锁死锁、协议版本碎片化是共性问题 |
| **会话状态管理** | OpenClaw（#130491 Gateway 重启恢复）、Zeroclaw（#9487 会话所有权 RFC）、hermes-agent（#93888 远程会话恢复失败）、QwenPaw（#5344 静默丢弃消息） | 会话所有权边界、持久化契约、重启恢复能力是架构演进的核心议题 |
| **上下文/记忆管理** | AstrBot（#9865 避免过早压缩）、QwenPaw（#7331 超大工具结果截断）、Zeroclaw（#6850 内存生命周期解耦）、hermes-agent（#39691 工具级输出压缩） | 上下文压缩策略智能化、工具返回内容裁剪、记忆生命周期与存储解耦 |
| **沙箱与安全策略** | Zeroclaw（#6996 细粒度沙箱策略、#9815 路径绕过修复）、hermes-agent（#97289 Bedrock Nova cachePoint 拒绝） | 应用层路径准入与 OS 沙箱后端统一、模型兼容性安全修复 |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|------|---------|---------|-----------------|
| **OpenClaw** | 全渠道 Gateway、多 agent 编排、企业级运维 | 企业用户、重度自托管用户 | Node.js/TypeScript 生态，Gateway 统一入口，插件系统丰富，功能覆盖面最广 |
| **hermes-agent** | Desktop 优先、多模态、MCP 深度集成 | 桌面端个人用户、多模态研究者 | Python 生态，Desktop 持久化多网关连接（29 PR 战役），MCP OAuth 锁修复深入 SDK 层 |
| **QwenPaw** | MCP 协议栈、Provider 兼容性、Hub 多租户 | 开发者、团队协作场景 | Python 生态，MCP 双协议客户端（Streamable-HTTP + 旧版回退），共享 A-tier 延迟启动架构，2.2.0 将推多租户 Hub |
| **Zeroclaw** | 架构契约先行、Rust 高性能、SOP 工作流 | 架构敏感型开发者、安全要求高的用户 | Rust 实现，RFC 驱动开发（会话所有权、沙箱策略、WASM 插件），强调类型安全与内存安全 |
| **AstrBot** | IM 渠道适配、插件生态、轻量部署 | 中文社区、IM 机器人开发者 | Python 生态，插件系统活跃，侧重 QQ/微信/飞书/钉钉等国内 IM 渠道，配置重构中（#9821） |
| **PicoClaw** | 嵌入式/轻量级、特定渠道深度优化 | 嵌入式场景、QQ 频道用户 | 轻量级实现，QQ 频道富媒体支持刚落地（#1349），活跃度低但功能务实 |


## 6. 社区热度与成熟度

**第一梯队：快速迭代期（功能扩张与稳定性攻坚并行）**
- **OpenClaw**：单日 500+ 更新，版本迭代频繁，但 P1 积压较多，处于"功能跑得快、稳定性欠账"阶段
- **hermes-agent**：单日 500 PR 更新，MCP 锁问题系统性解决、Desktop 战役收官，处于"集中还技术债"阶段，但 PR 合并率仅 9.4%，评审积压严重
- **QwenPaw**：2.2.0 功能收尾，MCP 双协议客户端落地，测试套件提速 41%，处于"收尾加固"阶段，健康度在活跃项目中最佳

**第二梯队：架构梳理期**
- **Zeroclaw**：大量 RFC 密集评审（会话所有权、沙箱策略、WASM 插件），处于"先设计后实现"的架构重构期，但合并率 8% 显示决策效率是瓶颈

**第三梯队：质量巩固期**
- **AstrBot**：核心 Bug 响应快（#9864 当日出修复 PR），功能请求落地迅速（#9850 → #9861），但长期 PR 积压（#8890 已 2 个月+）需关注

**第四梯队：平稳维护期**
- **PicoClaw**：单日 1 Issue + 2 PR，QQ 富媒体支持落地后进入维护模式，社区讨论热度低


## 7. 值得关注的趋势信号

**1. 成本治理从"可选项"变为"必选项"**
OpenClaw 的每 agent 成本预算（#42475，23 评论）与 QwenPaw 的 prompt cache 命中率对比（OpenCode 96.02% vs QwenPaw 81.68%）表明，企业级用户已不满足于"能用"，而是要求"可控、可观测、可优化"。**对开发者的参考价值**：在设计 agent 框架时，应将成本计量与预算闸门作为一等公民内建，而非事后插件。

**2. 长推理模型正在倒逼基础设施重构**
OpenClaw 的流式看门狗超时（#68596，👍8 为当日最高）与 maxTurns 配置（#9912，积压 6 个月+）说明，kimi-k2.5、DeepSeek-R1 等长推理模型的普及已使"30 秒无更新即重置"的旧假设失效。**对开发者的参考价值**：所有超时机制、心跳检测、进度上报的设计都需要考虑推理时长的新常态，硬编码阈值将频繁误伤。

**3. MCP 协议栈成为兵家必争之地**
QwenPaw 的双协议客户端（#7330）、hermes-agent 的 OAuth 锁三连修复（#76526/#97458/#51149）、AstrBot 的 Session terminated 问题——MCP 已从"可选集成"变为"核心基础设施"。**对开发者的参考价值**：MCP 服务端的重启恢复、协议版本兼容、认证生命周期管理是当前最大的技术债集中地，早期投入将获得显著竞争优势。

**4. 跨渠道消息可靠性是用户信任的基石**
从 OpenClaw 的 Telegram 超时（#87744）到 QwenPaw 的飞书不回复（#5757），再到 Zeroclaw 的 Telegram 线程记忆碎片化（#10237），"消息发出但无反馈"是用户容忍度最低的故障模式。**对开发者的参考价值**：消息投递的最终状态机（成功/失败/超时）必须有明确的用户可见语义，静默失败比显式报错对信任的伤害更大。

**5. 多租户与团队协作是个人助手的自然演进方向**
QwenPaw Hub 多租户版路线图讨论（#7318，13 评论）与 OpenClaw 的企业级成本诉求（#42475）共同指向：个人 AI 助手正在向团队协作平台演进。**对开发者的参考价值**：在设计会话模型、权限系统和配置架构时，应预留多用户、多租户的扩展空间，避免后期重构。

**6. 可观测性是插件生态繁荣的前提**
AstrBot 的日志分类诉求（#9850，"从日志里找信息都很困难"）与 Zeroclaw 的 trace context 缺失（#50291）表明，插件开发者对调试工具的需求已超过功能本身。**对开发者的参考价值**：插件系统的日志隔离、链路追踪、沙箱调试能力应作为基础设施提前建设。

**7. 安全策略执行需要纵深防御**
Zeroclaw 的 forbidden_paths 绕过（#9815）与 OpenClaw 的硬编码路径事件（#51429）形成鲜明对比：前者是技术漏洞，后者是流程漏洞。**对开发者的参考价值**：安全策略不仅需要正确的实现，还需要代码审查、自动化测试和供应链安全的多层保障。

---

**总结**：个人 AI 助手开源生态正处于从"功能原型"向"可靠基础设施"演进的关键转折期。OpenClaw 凭借体量优势保持生态核心地位，但稳定性问题使其领导地位面临挑战；hermes-agent 和 QwenPaw 在特定技术方向（MCP、Desktop）上展现出更强的攻坚能力；Zeroclaw 的架构先行路线值得关注，但需解决决策效率问题。对于技术决策者，建议重点关注**成本治理、长推理适配、MCP 稳定性、跨渠道可靠性**四大方向的技术选型；对于开发者，**可观测性、安全策略、多租户扩展**是构建下一代 agent 应用时需要提前布局的基础能力。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-29

## 今日速览

过去24小时项目保持高活跃度：48条Issue更新（40条新开/活跃，8条关闭）与50条PR更新（46条待合并，4条合并/关闭）表明社区讨论与开发提交双线并行。当前最显著的特征是**大量RFC与架构设计提案处于密集评审期**（#9487、#6850、#9488等均获15+评论），同时**P1级Bug修复持续推进**（转录语言提示丢失、并行运行冲突等均有对应fix PR）。但需注意PR合并率偏低（仅4/50），大量PR处于`needs-author-action`或`needs-maintainer-review`状态，维护者评审带宽可能成为瓶颈。无新版本发布。

---

## 项目进展

### 已关闭/合并的重要变更

**Bug修复关闭（8条Issue）：**

- **#8654 [P1] skill-review fork 越界panic导致SIGSEGV** — 已关闭。该问题导致工具密集型轮次后守护进程崩溃（`skills/review.rs:159`），修复消除了进程级故障。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8654

- **#9815 [P1] `forbidden_paths` 安全策略绕过** — 已关闭。`is_path_allowed` 在allowed-root检查时提前返回，导致禁止路径规则完全失效；修复后安全策略可正确生效。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9815

- **#9425 [P1] 运行中SOP任务无操作员取消路径** — 已关闭。Web仪表盘此前只能查看运行状态，无法中止任务；现已补齐取消能力。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9425

- **#8720 [P2] Bedrock Nova 2 Lite 缓存错误** — 已关闭。支持通过配置文件禁用cachePoint。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8720

- **#9711 [P3] Arduino闪存临时目录未清理** — 已关闭。退出时残留`zeroclaw_flash_<uuid>`目录的问题已修复。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9711

**PR关闭（1条）：**

- **#8337 herdr agent reporting integration** — 已关闭（未合并）。该PR曾尝试添加Herdr生命周期上报，但最终被关闭，可能因设计方向调整或与现有架构冲突。
  https://github.com/zeroclaw-labs/zeroclaw/pull/8337

### 整体评估

项目在**稳定性修复**（SIGSEGV、安全策略绕过、SOP取消路径）和**安全加固**（Git操作权限边界、沙箱策略、主机启动器解析）两条线上均有实质推进。但大量功能型PR（如#10214日志轮转、#9819图像验证、#10381安全修复）仍待合并，项目整体处于"修复与设计并行、合并滞后"的状态。

---

## 社区热点

### 最活跃讨论（按评论数排序）

1. **#9487 [RFC] Runtime-owned conversation sessions and transport surface adapters** — 27条评论
   讨论核心：运行时会话所有权边界、类型化入口信封、持久化准入语义。这是当前架构演进的核心提案，涉及gateway/channel/runtime三层。
   https://github.com/zeroclaw-labs/zeroclaw/issues/9487

2. **#6850 [RFC] Decouple memory lifecycle policy from storage backends** — 21条评论
   讨论核心：`Memory` trait应只负责存储，生命周期治理（合并、治理策略）不应由各gateway/channel重复实现。
   https://github.com/zeroclaw-labs/zeroclaw/issues/6850

3. **#9488 [RFC] Unified attachment architecture for web chat and channels** — 21条评论
   讨论核心：统一Web聊天与各渠道的附件处理架构，已迭代至Revision 9。
   https://github.com/zeroclaw-labs/zeroclaw/issues/9488

4. **#6954 [RFC] Provenance, conversation binding, and reply contract for internally initiated agent turns** — 16条评论
   讨论核心：内部启动的代理轮次（cron等）的来源追踪、会话绑定与回复契约。
   https://github.com/zeroclaw-labs/zeroclaw/issues/6954

5. **#6996 [RFC] Granular sandbox policy — filesystem and network restrictions** — 15条评论
   讨论核心：应用层路径准入与OS沙箱后端（Bubblewrap/Landlock/Seatbelt）的策略统一。
   https://github.com/zeroclaw-labs/zeroclaw/issues/6996

### 热点分析

社区讨论高度集中在**架构分层与契约定义**上：会话所有权、内存生命周期、附件架构、沙箱策略——这些RFC相互关联（#9487/#9488/#9600共享所有权边界），表明项目正经历一次**系统性的架构梳理**。同时#8692（维护者决策队列）和#9600（会话持久化契约所有权）作为跟踪器，反映了社区对**决策效率和契约归属**的焦虑——多个工作流同时改动同一契约，需要明确的owner。

---

## Bug 与稳定性

### 新报告Bug（按严重程度排列）

| 严重度 | Issue | 问题描述 | Fix PR |
|--------|-------|---------|--------|
| **P1** | [#10429](https://github.com/zeroclaw-labs/zeroclaw/issues/10429) | Deepgram/OpenAI转录提供商静默丢弃语言提示，非英语语音笔记返回空转录并被跳过（意大利语复现） | [#10431](https://github.com/zeroclaw-labs/zeroclaw/pull/10431) 已提交 |
| **P1** | [#10408](https://github.com/zeroclaw-labs/zeroclaw/issues/10408) | 活动轮次期间第二条消息启动并行运行 → 重复工作+重复回复 | 无 |
| **P1** | [#10324](https://github.com/zeroclaw-labs/zeroclaw/issues/10324) | cron手动触发与运行历史读取在代理重命名时存在check-then-act竞态 | 无 |
| **P2** | [#10237](https://github.com/zeroclaw-labs/zeroclaw/issues/10237) | Telegram回复线程将对话记忆碎片化为每线程历史桶，丢失多轮上下文 | 无 |
| **P2** | [#10186](https://github.com/zeroclaw-labs/zeroclaw/issues/10186) | 终端回退文本绕过实时投递通道（两处路径） | 无 |
| **P2** | [#10329](https://github.com/zeroclaw-labs/zeroclaw/issues/10329) | 弹性包装器截断遮蔽了OpenAI兼容提供商的循环级上下文溢出恢复 | 已关闭 |

### 稳定性趋势

- **转录/多模态链路**是当前薄弱环节：语言提示丢失（#10429）与图像验证（#9819 PR）均指向**输入数据完整性校验不足**。
- **并发控制**出现新问题（#10408），同一会话并行运行可能导致资源浪费与状态错乱，与#9487的会话所有权RFC直接相关。
- 已关闭的#8654（SIGSEGV）和#9815（安全绕过）表明**内存安全与策略执行**是近期修复重点，且修复质量得到社区认可。

---

## 功能请求与路线图信号

### 高潜力新功能

1. **#10419 [Feature] Stream agent-loop tokens from POST /webhook (SSE)** — 请求通过SSE流式返回代理令牌，而非等待单个JSON响应。Hosted Path A工作流需要此能力，若实现将显著改善Webhook集成的实时性。
   https://github.com/zeroclaw-labs/zeroclaw/issues/10419

2. **#8445 [Feature] Telegram channel multi-message mode** — 每个代理轮次发送独立消息而非拼接所有文本。该请求已获`status:in-progress`，社区需求明确。
   https://github.com/zeroclaw-labs/zeroclaw/issues/8445

3. **#10076 [RFC] Composable WASM plugin runtime architecture** — 扩展WASM插件能力（HookHandler观察、类型化扩展点、可替换提供商）。与#7822（Observer订阅）形成系列提案，指向**插件系统深度重构**。
   https://github.com/zeroclaw-labs/zeroclaw/issues/10076

### 路线图信号

- **#8288 [Tracker] SOP milestone: daemon-owned SOP control plane to 5/5** — SOP能力推进至5/5的路线图跟踪器，涉及13项能力验收。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8288

- **#10306 [Task] gate web/ TypeScript in required CI** — 要求将web/的TypeScript类型检查纳入必需CI，并修复裸`tsc`输出75条误导性错误的问题。该任务已`accepted`，说明**前端工程质量**被提上日程。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10306

- **#10195 [Task] manifest schema validators recompile on every config resolution** — 消除每次插件配置解析时的schema编译开销，属性能优化，已`accepted`。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10195

---

## 用户反馈摘要

### 真实痛点

1. **非英语用户受影响**（#10429）：意大利语语音笔记被静默丢弃，用户`@badbat75`报告"总是被跳过"，且日志仅显示INFO级别，难以察觉。这暴露了**多语言支持的盲区**。

2. **并发消息导致重复工作**（#10408）：用户`@volodkindv`反馈"第二条消息启动并行运行 → 重复工作和重复回复"，影响聊天体验，且可能产生**重复的副作用操作**（如重复调用工具）。

3. **Telegram线程记忆碎片化**（#10237）：用户`@metalmon`指出回复线程将对话历史按线程分桶，导致**多轮上下文丢失**。这是Telegram渠道的**结构性设计问题**，而非简单Bug。

4. **SOP任务无法取消**（#9425，已关闭）：用户`@IftekharUddin`报告"运行中的SOP任务没有操作员取消路径"，严重度为S1（工作流阻塞）。该问题已修复，但反映了**运维控制能力**的缺失。

### 社区情绪

- 对**安全策略**（#9815）和**崩溃修复**（#8654）的快速响应获得认可。
- 对**架构RFC**的讨论热情高涨（多个RFC获15+评论），但部分提案（如#9487）已持续一个月仍在评审，社区可能期待**更快的决策节奏**。

---

## 待处理积压

### 需维护者关注

1. **#8692 [Tracker] Maintainer decision queue for RFCs and design issues** — 维护者决策队列本身已积压14条评论，大量RFC等待裁决。建议维护者优先处理此队列以疏通整体流程。
   https://github.com/zeroclaw-labs/zeroclaw/issues/8692

2. **#9600 [Tracker] Session-persistence contract ownership and layer ordering** — 会话持久化契约的owner未定，四个工作流同时改动同一契约。该问题直接阻塞#9487/#9488的落地。
   https://github.com/zeroclaw-labs/zeroclaw/issues/9600

3. **#6996 [RFC] Granular sandbox policy** — 已获15条评论但仍在`needs-maintainer-review`，且关联PR #7821（sandbox_policy schema）处于`blocked`状态。沙箱策略是安全基座，建议优先评审。
   https://github.com/zeroclaw-labs/zeroclaw/issues/6996

### 长期未合并PR（需作者行动）

以下PR均标有`needs-author-action`，可能因作者未响应而停滞：

- **#10337 fix(tools): honor allowed roots for git operations**（XL，安全相关）
  https://github.com/zeroclaw-labs/zeroclaw/pull/10337

- **#9447 fix(anthropic): classify incomplete terminal responses**（XL，已等待超一个月）
  https://github.com/zeroclaw-labs/zeroclaw/pull/9447

- **#9819 fix(multimodal): add pixel-level image validation**（XL，安全相关）
  https://github.com/zeroclaw-labs/zeroclaw/pull/9819

- **#9997 feat(channels/telegram): add secure model picker**（XL，`do-not-merge`标记）
  https://github.com/zeroclaw-labs/zeroclaw/pull/9997

### 风险提示

- **PR合并率仅8%**（4/50），大量功能无法进入主线，长期可能造成**分支漂移**与**社区贡献者流失**。
- **多个XL级PR**（#10337、#9447、#9819、#9997、#7821）同时待处理，维护者评审压力集中，建议考虑**分批评审**或**增加维护者**。

---

*本日报由 AI 助手基于 GitHub 公开数据自动生成，仅供参考。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-29

## 1. 今日速览

过去24小时项目活跃度中等偏下：仅有1条Issue更新（且为stale状态），2条PR有动态。其中一条PR（#1349）在历经近6个月后终于关闭，标志着QQ频道多附件类型支持完成落地；另一条PR（#3347）为Web UI卡顿修复，目前待合并。无新版本发布。整体来看，项目处于平稳维护期，社区讨论热度不高，但代码层面仍有实质推进。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

**PR #1349 已关闭（合并）— QQ频道多附件类型支持**

- 链接: https://github.com/sipeed/picoclaw/pull/1349
- 作者: @aishannon
- 创建: 2026-03-11 | 关闭: 2026-08-29

该PR为QQ频道渠道补齐了多项能力：
- 支持解析QQ频道emoji结构
- 支持接收语音、图片、视频、文件消息
- 支持回复时上传并发送本地语音、图片、视频、文件附件
- 回复优先使用Markdown消息，失败时降级

**项目意义**：这是QQ频道集成的一次重要功能补全，从"能收发文本"扩展到"能处理富媒体"，对使用QQ作为交互渠道的用户体验提升明显。该PR从3月提出到8月合并，历时较长，但最终落地。

---

## 4. 社区热点

**Issue #3342 — "after-turn"转向模式（stale，1条评论）**

- 链接: https://github.com/sipeed/picoclaw/issues/3342
- 作者: @unedtamps | 创建: 2026-08-21 | 更新: 2026-08-28

该Issue提出一个交互设计改进：当用户在第一轮任务尚未完成时发送第二条消息，当前系统会将其视为"中途修正"——跳过任务#1的剩余工具调用，直接注入消息#2。用户希望提供一种**opt-in的"after-turn"转向模式**，将第二条消息排队，等当前轮次结束后再处理。

**诉求分析**：这反映了真实使用场景中的痛点——用户有时只是补充信息，而非打断当前任务。当前"抢占式"设计虽然响应快，但可能导致任务半途而废。该Issue被标记为stale，说明讨论热度不足，但需求本身具有代表性。

---

## 5. Bug 与稳定性

**PR #3347 — 修复Web UI界面卡顿（待合并）**

- 链接: https://github.com/sipeed/picoclaw/pull/3347
- 作者: @iMilnb | 创建: 2026-08-27 | 更新: 2026-08-28
- 严重程度: 中（性能问题，不影响功能正确性）

**问题描述**：聊天区域文本量较大时，Web UI出现明显卡顿，影响桌面端和移动端浏览器使用体验。

**修复方案**：作者非TS/Node专业开发者，但已定位问题并完成修复，在`picoclaw-launcher`上实测桌面端和移动端（Brave浏览器）均不再卡顿。

**状态**：PR已提交，待维护者review合并。这是当前唯一活跃的bug修复PR，建议优先处理。

---

## 6. 功能请求与路线图信号

**Issue #3342 — Opt-in "after-turn" steering mode**

- 链接: https://github.com/sipeed/picoclaw/issues/3342

该功能请求涉及对话管理核心逻辑，属于交互模型层面的增强。结合当前PR动态，暂无直接对应的实现PR，但该需求与多轮对话体验密切相关，若社区呼声增强，有可能进入后续版本规划。

**PR #1349 的合并**也释放了一个信号：QQ频道渠道的富媒体能力已补齐，下一步可能围绕其他渠道（如Discord、Telegram）做类似的功能对齐。

---

## 7. 用户反馈摘要

**来自 Issue #3342 的反馈：**

- 用户 @unedtamps 描述了具体痛点：当前"抢占式"转向设计会导致任务#1的工具调用被跳过（日志显示"Skipped due to queued user message."），用户希望有更可控的排队机制。
- 该反馈暗示部分用户对"消息即打断"的默认行为不满意，期望更精细的对话流控制。

**来自 PR #3347 的反馈：**

- 作者 @iMilnb 在PR描述中明确提到"web UI stops lagging when there's a lot of text in the chat area"，说明长对话场景下的性能问题是真实存在的用户痛点。
- 作者自述非专业前端开发者，侧面反映该问题可能对普通用户也足够明显，才会促使非专业开发者主动修复。

---

## 8. 待处理积压

**Issue #3342 — 已标记stale，需维护者关注**

- 链接: https://github.com/sipeed/picoclaw/issues/3342
- 创建于2026-08-21，最后更新于2026-08-28，目前仅1条评论，已被标记为stale。
- 该功能请求涉及对话调度核心逻辑，建议维护者评估是否纳入路线图，或明确回复暂不支持的考量，避免社区需求长期悬置。

**PR #3347 — 待合并的bug修复**

- 链接: https://github.com/sipeed/picoclaw/pull/3347
- 已提交2天，修复Web UI卡顿问题，目前无review记录。
- 建议维护者尽快review，该修复对长对话场景的用户体验提升明显，且作者已自测通过。

---

*本日报基于PicoClaw GitHub仓库公开数据自动生成，数据截至2026-08-29。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报 — 2026-08-29

## 1. 今日速览

过去24小时项目保持高活跃度：共处理50条Issue（36条关闭）、39条PR（19条合并/关闭），并连续发布 **v2.2.0-beta.2** 与 **v2.2.0-beta.3** 两个预发布版本。核心进展集中在 MCP 协议栈（新增 Streamable-HTTP 双协议客户端、修复挂起 RPC 与 stale list_tools）、自定义 OpenAI 兼容 Provider 的模型发现修复，以及启动性能优化（共享 A-tier 延迟启动架构）。社区侧，多租户版 QwenPaw Hub 的路线图讨论（#7318）以13条评论成为最热议题，反映用户对团队协作场景的强烈需求；同时飞书渠道不回复（#5757）与 OpenSSL TLS 栈兼容性（#7298）是用户反馈最集中的稳定性问题。整体来看，项目正处于 2.2.0 功能收尾与稳定性加固并行的阶段，版本迭代节奏快，社区参与度高。

---

## 2. 版本发布

### v2.2.0-beta.3
**发布时间**：2026-08-28（约）

**更新内容**：
- **feat(mcp): 新增 Streamable-HTTP 双协议客户端，带旧版回退**（[#7330](https://github.com/agentscope-ai/QwenPaw/pull/7330)）— 新增 `HttpAutoClient`，优先使用 MCP 2026-07-28 协议，对 2025-03-26 / 2025-06-18 / 2025-11-25 等旧版服务端自动回退到 `HttpStatefulClient`，提升跨版本兼容性。
- **fix(mcp): 中止 teardown 时挂起的会话 RPC，并恢复 stale list_tools**（[#7329](https://github.com/agentscope-ai/QwenPaw/pull/7329)）— 修复 MCP 传输层瞬时故障或服务端重启导致 `list_tools`/`call_tool` 永久挂起的问题，避免 agent schema 收集停滞和活动轮次卡死。

**破坏性变更**：无明确破坏性变更。MCP 客户端协议探测与回退机制为新增逻辑，对现有 `streamable_http` 配置透明。

**迁移注意事项**：使用旧版 MCP 服务端的用户无需改动配置，客户端会自动回退；建议关注 MCP 服务端协议版本与 QwenPaw 的兼容性日志输出。

### v2.2.0-beta.2
**发布时间**：2026-08-28（约）

**更新内容**：
- **fix(workspace): 使启动失败清理具备 cancellation-safe 能力**（[#7194](https://github.com/agentscope-ai/QwenPaw/pull/7194)）— 修复工作区启动失败时清理流程可能被取消导致资源残留的问题。
- **test(e2e): 新增23个控制台定向测试用例及扩展断言**（[#7327](https://github.com/agentscope-ai/QwenPaw/pull/7327)）— 提升 Console 前端 e2e 覆盖率，覆盖更多交互路径。

**破坏性变更**：无。

---

## 3. 项目进展

今日合并/关闭的19条PR中，以下变更对项目整体推进意义较大：

### MCP 稳定性与协议演进
- **[#7330](https://github.com/agentscope-ai/QwenPaw/pull/7330) feat(mcp): Streamable-HTTP 双协议客户端** — 已合入 beta.3，解决 MCP 协议版本碎片化问题，是 2.2.0 的重要基础设施升级。
- **[#7329](https://github.com/agentscope-ai/QwenPaw/pull/7329) fix(mcp): 中止挂起 RPC 并恢复 stale list_tools** — 已合入 beta.3，直接修复 #6524 等用户报告的“MCP 后端重启后需手动 list mcp 才能重连”问题。
- **[#7331](https://github.com/agentscope-ai/QwenPaw/pull/7331) fix(context): 限制超大单行工具结果进入上下文** — 已合并，对应 #7288 报告的大 MCP 结果绕过滚动压缩导致上下文溢出的问题。完整结果保留为工作区 artifact，并提供截断预览恢复机制。

### Provider 与模型管理
- **[#7320](https://github.com/agentscope-ai/QwenPaw/pull/7320) fix(providers): 恢复自定义 OpenAI 兼容 Provider 的可靠模型发现** — 已合并，修复 #7305 中“模型发现成功但未自动填充”的问题，覆盖配置、持久化、前端刷新与故障恢复全链路。
- **[#7386](https://github.com/agentscope-ai/QwenPaw/pull/7386) fix(providers): 迁移已发现模型的输出限制** — 已合并，迁移旧版 per-model `max_tokens` 值，确保加密凭据在快照加载时不被破坏。

### 渠道与运行时
- **[#7381](https://github.com/agentscope-ai/QwenPaw/pull/7381) fix(dingtalk): 检测 stale 流连接并限制 SDK 请求** — 已合并，修复钉钉 Stream WebSocket 在系统休眠/网络切换后“看似在线但收不到消息”的问题。
- **[#7384](https://github.com/agentscope-ai/QwenPaw/pull/7384) perf(app): 共享 A-tier 延迟启动架构** — 已合并，QwenPaw app 与 Tauri 后端共享同一延迟 ASGI 启动运行时，在完整 Python 应用加载完成前即可暴露版本、启动状态与健康检查。
- **[#7388](https://github.com/agentscope-ai/QwenPaw/pull/7388) fix(acp): 显式运行时限制使用 max_completion_tokens** — 已合并，修正 ACP 协议中输出 token 限制的字段映射。

### 测试与工程质量
- **[#7380](https://github.com/agentscope-ai/QwenPaw/pull/7380) test: 测试套件墙钟时间减少41%，移除零值测试** — 已合并，修复了若干真实缺陷，将 9,997 个单元测试控制在 57 秒内完成。

**整体判断**：2.2.0 的功能拼图正在快速补齐，MCP 协议兼容性、Provider 模型发现、启动性能三大方向均有实质性进展。beta.3 的发布标志着 MCP 相关修复已进入用户验证阶段。

---

## 4. 社区热点

### 最热讨论：QwenPaw Hub 多租户版路线图（[#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)）
- **状态**：OPEN | 评论 13 | 👍 1
- **内容**：官方发起讨论，宣布 QwenPaw Hub 多租户版将于 2.2.0 推出，并征集社区对后续功能的建议。引用了 #2324（多用户访问与管理员管理技能）等历史需求。
- **诉求分析**：社区对“个人助手 → 团队协作”的升级路径期待已久。多租户、权限管理、共享技能库是高频关键词。该讨论的活跃度表明，2.2.0 的 Hub 版本可能成为项目从开发者工具走向团队平台的关键转折点。

### 评论最多：飞书渠道不回复（[#5757](https://github.com/agentscope-ai/QwenPaw/issues/5757)）
- **状态**：CLOSED | 评论 15
- **内容**：v1.1.12.post2 版本，Docker 部署与 AgentScope Platform 实例均出现“第一条消息回复，后续消息无反应”的问题。
- **诉求分析**：IM 渠道的可靠性是用户最敏感的痛点之一。虽然 Issue 已关闭，但 15 条评论说明该问题影响面较广，且用户对根因解释和长期修复方案有较高关注度。

### 高关注：OpenSSL TLS 栈兼容性（[#7298](https://github.com/agentscope-ai/QwenPaw/issues/7298)）
- **状态**：OPEN | 评论 9
- **内容**：Desktop（Tauri）与 Docker 镜像均携带 Python 3.11 时代的 OpenSSL 3.0.x TLS 栈，在部分运营商网络下 DPI 会重置 TLS 握手，且 Desktop 端无 workaround。
- **诉求分析**：这是基础设施层面的兼容性问题，影响特定网络环境下的所有用户。9 条评论反映出用户对“官方捆绑运行时版本过旧”的不满，以及对升级 OpenSSL 的迫切期望。

### 其他活跃讨论
- [#6314](https://github.com/agentscope-ai/QwenPaw/issues/6314) RemoteProtocolError（9 评论，已关闭）— 用户通过抓包定位到 QwenPaw 主动关闭连接，社区对排查方法讨论深入。
- [#7296](https://github.com/agentscope-ai/QwenPaw/issues/7296) OpenAI Responses 多轮 400 错误（3 评论，已关闭）— 无状态上游（OpenCode Zen/Go Muse Spark）下 reasoning item 过期问题。

---

## 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue | 描述 | 状态 | Fix PR |
|--------|-------|------|------|--------|
| 🔴 高 | [#7298](https://github.com/agentscope-ai/QwenPaw/issues/7298) | Desktop/Docker 捆绑 OpenSSL 3.0.x TLS 栈，运营商 DPI 重置握手，Desktop 无 workaround | OPEN | 无 |
| 🔴 高 | [#5757](https://github.com/agentscope-ai/QwenPaw/issues/5757) | 飞书渠道第一条消息后不再回复（Docker 与 Platform 均复现） | CLOSED | 未明确 |
| 🟠 中 | [#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524) | MCP 后端重启后客户端无法自动恢复，需手动 `list mcp` | CLOSED | [#7329](https://github.com/agentscope-ai/QwenPaw/pull/7329) ✅ |
| 🟠 中 | [#6427](https://github.com/agentscope-ai/QwenPaw/issues/6427) | WebView2 渲染进程在 v2.0.0+post.4 启动约7秒后崩溃（msedge.dll+0x36c7f6d） | CLOSED | 未明确 |
| 🟠 中 | [#6124](https://github.com/agentscope-ai/QwenPaw/issues/6124) | Editable install 内存泄漏：36 个 ReMe 后台循环消耗 48GB+ 内存，启动无法完成 | CLOSED | 未明确 |
| 🟠 中 | [#7296](https://github.com/agentscope-ai/QwenPaw/issues/7296) | OpenAI Responses 多轮对话 400 "Referenced reasoning item not found or expired"（无状态上游） | CLOSED | 未明确 |
| 🟡 低 | [#7288](https://github.com/agentscope-ai/QwenPaw/issues/7288) | 大 MCP 结果可绕过滚动压缩，溢出模型上下文 | CLOSED | [#7331](https://github.com/agentscope-ai/QwenPaw/pull/7331) ✅ |
| 🟡 低 | [#5344](https://github.com/agentscope-ai/QwenPaw/issues/5344) | `/api/console/chat` 在 agent 忙碌时返回 200 但静默丢弃消息 | CLOSED | 未明确 |
| 🟡 低 | [#4217](https://github.com/agentscope-ai/QwenPaw/issues/4217) | 并发 cron 任务（share_session=true）同时触发时产生空回复 | CLOSED | 未明确 |
| 🟡 低 | [#6314](https://github.com/agentscope-ai/QwenPaw/issues/6314) | RemoteProtocolError: peer closed connection without sending complete message body | CLOSED | 未明确 |

**观察**：今日关闭的 Bug 类 Issue 数量较多（36条），但多数为历史遗留问题。MCP 相关两个高价值修复（#7329、#7331）已随 beta.3 发布，是稳定性方面的实质进展。**#7298（OpenSSL）是当前唯一无 workaround 且仍开放的高严重度问题**，建议维护者优先评估升级捆绑 Python 运行时或提供 OpenSSL 3.2+ 的替代方案。

---

## 6. 功能请求与路线图信号

### 可能进入 2.2.0 的功能（已有对应 PR）

| 功能需求 | 对应 PR | 状态 | 说明 |
|----------|---------|------|------|
| Fallback 模型设置页（[#4011](https://github.com/agentscope-ai/QwenPaw/issues/4011)、[#5718](https://github.com/agentscope-ai/QwenPaw/issues/5718)） | [#7392](https://github.com/agentscope-ai/QwenPaw/pull/7392) | OPEN | 新增独立 Fallback Models 标签页，与 Embedding 设置分离 |
| 聊天历史分页与虚拟滚动（[#7049](https://github.com/agentscope-ai/QwenPaw/issues/7049) 后续） | [#7361](https://github.com/agentscope-ai/QwenPaw/pull/7361) | OPEN, Under Review | 前端配合后端分页接口，解决长对话卡顿 |
| MCP 工具调用超时配置（[#6724](https://github.com/agentscope-ai/QwenPaw/issues/6724)） | [#6874](https://github.com/agentscope-ai/QwenPaw/pull/6874) | OPEN, Under Review | 新增 `tool_call_timeout`，默认 300 秒，兼容旧 `timeout` 别名 |
| Embedding 重建显式化（[#6124](https://github.com/agentscope-ai/QwenPaw/issues/6124) 相关） | [#7133](https://github.com/agentscope-ai/QwenPaw/pull/7133) | OPEN | 保存配置不再自动全量重建，改为显式 reindex，失败自动降级 BM25 |
| 可插拔长期记忆后端（PowerContext） | [#7080](https://github.com/agentscope-ai/QwenPaw/pull/7080) | OPEN, Under Review | 实现 `BaseMemoryManager` 抽象，与 ReMeLight 并列可选 |

### 社区呼声高但尚无明确排期的需求

- **Prompt cache 命中率可观测性**（[#7335](https://github.com/agentscope-ai/QwenPaw/issues/7335)）— 生产数据对比 OpenCode（96.02%）与 QwenPaw（81.68%），用户希望看到缓存命中率并优化成本。虽已关闭，但数据对比极具说服力，可能被纳入后续优化。
- **工具返回内容智能简化**（[#7316](https://github.com/agentscope-ai/QwenPaw/issues/7316)）— 用户提议设计一个工具让 LLM 判断工具返回内容是否有效，无效则简化或删除以优化上下文。与 #7331 的方向互补，但更偏重“智能裁剪”而非“硬性截断”。
- **Codex 风格 steer mode**（[#1775](https://github.com/agentscope-ai/QwenPaw/issues/1775)）— 3月提出，至今仍 OPEN，用户希望在 agent 执行过程中补充信息以纠正行为。该需求与 ACP 协议的演进可能相关。

### 路线图信号
- **QwenPaw Hub 多租户版**（[#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)）— 官方确认 2.2.0 推出，社区讨论将直接影响后续功能优先级。多用户权限、共享技能库、管理员控制是高频关键词。

---

## 7. 用户反馈摘要

### 真实痛点

1. **IM 渠道可靠性**（[#5757](https://github.com/agentscope-ai/QwenPaw/issues/5757)、[#5030](https://github.com/agentscope-ai/QwenPaw/issues/5030)）
   - 飞书：第一条消息回复后，后续消息无响应，Docker 与官方 Platform 均复现。
   - 微信：开启主动模式后，同一问题出现两次相似但不完全相同的回复，关闭主动模式后恢复正常。
   - **共性**：IM 渠道在特定配置下的消息路由与去重逻辑存在缺陷，用户对“消息发出但无反馈”的体验容忍度极低。

2. **网络环境兼容性**（[#7298](https://github.com/agentscope-ai/QwenPaw/issues/7298)）
   - 运营商 DPI 会重置 OpenSSL 3.0.x 的 TLS 握手，Desktop 端无任何 workaround。用户明确表示“这不是我们的网络问题，是你们捆绑的 TLS 栈太旧”。

3. **MCP 运维体验**（[#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524)）
   - MCP Server 重启后，QwenPaw 仍复用旧 `mcp-session-id`，必须手动执行 `list mcp` 才能恢复。用户期望“自动重连是基本能力”。

4. **大输出截断**（[#6512](https://github.com/agentscope-ai/QwenPaw/issues/6512)）
   - `execute_shell_command` 输出超过约 30KB 时被截断，甚至触发 `Internal error`。用户场景包括股票分析报告（500+ 行）、大日志文件查看、批量数据库查询。

5. **模型管理**（[#7305](https://github.com/agentscope-ai/QwenPaw/issues/7305)、[#2777](https://github.com/agentscope-ai/QwenPaw/issues/2777)）
   - 自定义 OpenAI 兼容 Provider 模型发现成功但未自动填充到 UI。
   - GPT-5.x 模型因硬编码模型列表和 `max_tokens` 参数不兼容而失败。

### 使用场景与期望

- **团队协作**（[#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)）：用户希望将 QwenPaw 从个人助手扩展为团队工具，多用户访问、管理员管理技能是核心诉求。
- **桌面端体验**（[#3751](https://github.com/agentscope-ai/QwenPaw/issues/3751)、[#4986](https://github.com/agentscope-ai/QwenPaw/issues/4986)）：Windows 用户期望系统托盘支持；shell 执行时希望有实时交互反馈，避免“以为卡住了”。
- **会话管理**（[#4770](https://github.com/agentscope-ai/QwenPaw/issues/4770)、[#3187](https://github.com/agentscope-ai/QwenPaw/issues/3187)）：用户希望调整会话列表列顺序（时间列靠左）、增加会话归档分组功能。

### 满意/不满意

- **满意**：测试套件加速 41%（[#7380](https://github.com/agentscope-ai/QwenPaw/pull/7380)）获得社区认可；MCP 双协议客户端（[#7330](https://github.com/agentscope-ai/QwenPaw/pull/7330)）被视为解决版本碎片化的正确方向。
- **不满意**：OpenSSL 版本过旧（#7298）被用户视为“官方对基础设施维护不力”；飞书问题（#5757）关闭后用户仍持续追问根因，说明修复沟通不足。

---

## 8. 待处理积压

### 高优先级（建议维护者尽快响应）

| 项目 | 类型 | 创建时间 | 最后更新 | 备注 |
|------|------|----------|----------|------|
| [#7298](https://github.com/agentscope-ai/QwenPaw/issues/7298) OpenSSL 3.0.x TLS 栈问题 | Bug | 2026-08-25 | 2026-08-28 | 9 条评论，无 workaround，影响 Desktop 与 Docker 用户 |
| [#1775](https://github.com/agentscope-ai/QwenPaw/issues/1775) Codex 风格 steer mode | Feature | 2026-03-18 | 2026-08-28 | 5 个月未解决，社区持续关注 |
| [#7316](https://github.com/agentscope-ai/QwenPaw/issues/7316) 工具返回内容智能简化 | Discussion | 2026-08-26 | 2026-08-28 | 与 #7331 方向互补，有设计讨论价值 |

### 待合并 PR（OPEN 状态，部分 Under Review）

| PR | 描述 | 创建时间 | 备注 |
|----|------|----------|------|
| [#6874](https://github.com/agentscope-ai/QwenPaw/pull/6874) | MCP 工具调用超时配置 | 2026-08-10 | Under Review，对应 #6724 |
| [#7361](https://github.com/agentscope-ai/QwenPaw/pull/7361) | 聊天历史分页与虚拟滚动 | 2026-08-27 | Under Review，需前端配合 |
| [#7080](https://github.com/agentscope-ai/QwenPaw/pull/7080) | PowerContext 可插拔长期记忆后端 | 2026-08-17 | Under Review，first-time-contributor |
| [#7133](https://github.com/agentscope-ai/QwenPaw/pull/7133) | Embedding reindex 显式化与作用域限定 | 2026-08-19 | 涉及 ReMe 升级，需谨慎评审 |
| [#7387](https://github.com/agentscope-ai/QwenPaw/pull/7387) | 启动早期就绪状态优化 | 2026-08-28 | 与 #7384 配套，待合并 |
| [#7220](https://github.com/agentscope-ai/QwenPaw/pull/7220) | 拒绝超大图片尺寸 | 2026-08-23 | first-time-contributor，对应 #7212 |
| [#7391](https://github.com/agentscope-ai/QwenPaw/pull/7391) | 文档移除不存在的环境变量 | 2026-08-28 | 低风险文档修正 |
| [#7390](https://github.com/agentscope-ai/QwenPaw/pull/7390) | Aliyun Coding Plan 目录对齐回归测试 | 2026-08-28 | 对应 #6551 |
| [#7267](https://github.com/agentscope-ai/QwenPaw/pull/7267) | 渠道契约检查可移植性修复 | 2026-08-25 | first-time-contributor，对应 #7264 |

### 长期未关闭的 OPEN Issue

| Issue | 描述 | 创建时间 | 最后更新 |
|-------|------|----------|----------|
| [#1775](https://github.com/agentscope-ai/QwenPaw/issues/1775) | Codex 风格 steer mode | 2026-03-18 | 2026-08-28 |
| [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) | QwenPaw Hub 多租户版路线图讨论 | 2026-08-26 | 2026-08-29 |
| [#7316](https://github.com/agentscope-ai/QwenPaw/issues/7316) | 工具返回内容智能简化 | 2026-08-26 | 2026-08-28 |
| [#7298](https://github.com/agentscope-ai/QwenPaw/issues/7298) | OpenSSL 3.0.x TLS 栈问题 | 2026-08-25 | 2026-08-28 |

---

**日报总结**：QwenPaw 在 2.2.0 预发布阶段保持高速迭代，MCP 协议栈与 Provider 模型管理是今日的核心进展。社区对多租户 Hub 的期待值很高，但 OpenSSL 版本老旧和 IM 渠道稳定性问题仍是用户信任度的主要风险点。建议维护者在推进新功能的同时，优先回应 #7298 的基础设施升级诉求，并加强与关闭 Issue 的根因沟通。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报 — 2026-08-29

## 1. 今日速览

过去24小时项目活跃度极高：381条Issue更新（新开/活跃323，关闭58）与500条PR更新（待合并453，已合并/关闭47），显示社区提交与维护者响应均处于高位。MCP OAuth认证锁问题成为今日修复主线，4个相关PR被合并/关闭，长期困扰的#38193死锁问题获全面修复。Desktop持久化多网关连接战役（#94724）宣告完成，累计合并29个PR。无新版本发布，但P0级Bedrock Nova模型兼容性修复（#97289）已合入，Debian安装阻断问题（#87093）确认解决。整体项目健康度良好，唯#66616技能索引持续降级已逾一个月，需关注。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日合并/关闭的47个PR中，以下推进最为关键：

- **MCP OAuth 认证锁问题全线修复**：4个相关PR合并/关闭，彻底解决 #38193 类故障。
  - [#76526](https://github.com/NousResearch/hermes-agent/pull/76526) — 关闭搁浅的MCP OAuth认证流，修复跨任务finalizer导致的AnyIO锁死锁（#38193 的全面修复）
  - [#97458](https://github.com/NousResearch/hermes-agent/pull/97458) — 避免跨资源请求持锁，解决MCP SDK 2.0.0中Streamable HTTP GET长期占用认证锁的问题
  - [#51149](https://github.com/NousResearch/hermes-agent/pull/51149) — 在建立Streamable HTTP数据面连接前物化bearer token，避免认证锁被长连接持有
  - [#91049](https://github.com/NousResearch/hermes-agent/pull/91049) — 作为重复PR关闭，其修复内容已被 #76526 覆盖

- **P0 修复合入**：[#97289](https://github.com/NousResearch/hermes-agent/pull/97289) — Bedrock Nova模型拒绝`toolConfig.tools`中的`cachePoint`键，此修复避免Nova模型全部调用失败。

- **Desktop 持久化多网关连接战役收官**：[#94724](https://github.com/NousResearch/hermes-agent/issues/94724) 标记为CAMPAIGN COMPLETE，29个PR全部合并，2个当日回归已修复，15个salvage集群已交付。

- **Debian 安装阻断解除**：[#87093](https://github.com/NousResearch/hermes-agent/issues/87093) 关闭，uv.lock与npm install失败问题已解决。

## 4. 社区热点

- **[#66616 Skills index stale or degraded](https://github.com/NousResearch/hermes-agent/issues/66616)**（114条评论，持续42天未关闭）— 自动化探针检测到技能索引已29.8小时未刷新（限制26小时）。评论数远超其他Issue，社区对文档/技能索引的可靠性高度关注，但该Issue长期处于OPEN状态未见修复动作。

- **[#88584 Automated Nous integration is blocked](https://github.com/NousResearch/hermes-agent/issues/88584)**（38条评论）— Nous-to-Enterkey定时合并因`cron/jobs.py`冲突受阻，dashboard更新器停留在旧版Enterkey release。集成管道的脆弱性引发讨论。

- **[#87093 Debian installation broken](https://github.com/NousResearch/hermes-agent/issues/87093)**（23条评论，4👍，已关闭）— 安装脚本在Debian 13.6上因uv.lock与npm install失败而中断，用户反馈积极，修复已确认。

- **[#20859 Support for Mistral as LLM provider](https://github.com/NousResearch/hermes-agent/issues/20859)**（14条评论，27👍）— 社区对Mistral支持呼声极高，尽管标记为`wontfix`，但27个👍在展示的Issue中最高，反映用户对更多LLM提供商选择的强烈需求。

- **[#4335 Cross-platform session context sharing](https://github.com/NousResearch/hermes-agent/issues/4335)**（16条评论，3👍）— CLI↔Telegram等平台间会话上下文隔离问题，用户期望跨平台连续对话，已挂`needs-decision`标签等待决策。

## 5. Bug 与稳定性

按严重程度排列：

**P0（已修复）**
- [#87093](https://github.com/NousResearch/hermes-agent/issues/87093) Debian安装失败（uv.lock/npm）— 已关闭，修复确认
- [#97289](https://github.com/NousResearch/hermes-agent/pull/97289) Bedrock Nova模型拒绝cachePoint键 — 已合并

**P1（部分有修复PR）**
- [#96282](https://github.com/NousResearch/hermes-agent/issues/96282) Desktop启动超时：HERMES_BACKEND_READY sentinel被重定向到stderr — 已关闭
- [#93888](https://github.com/NousResearch/hermes-agent/issues/93888) Desktop向远程Gateway发送本地运行时ID，会话恢复失败 — OPEN，无fix PR
- [#60323](https://github.com/NousResearch/hermes-agent/issues/60323) macOS Desktop本地后端可能错过HERMES_BACKEND_READY导致启动超时 — OPEN，无fix PR
- [#66887](https://github.com/NousResearch/hermes-agent/issues/66887) 多路复用网关中次要profile的Telegram会话错误持久化到默认profile — OPEN，无fix PR
- [#94058](https://github.com/NousResearch/hermes-agent/issues/94058) Linux桌面入口Exec解析venv符号链接为裸解释器，升级后启动崩溃 — OPEN，无fix PR
- [#94248](https://github.com/NousResearch/hermes-agent/issues/94248) Gateway在delegate截止后17-72ms出现SIGSEGV（macOS arm64，12份崩溃报告）— OPEN，无fix PR
- [#90837](https://github.com/NousResearch/hermes-agent/issues/90837) state.db在gateway-only写入下反复损坏（11次事故）— OPEN，无fix PR
- [#86366](https://github.com/NousResearch/hermes-agent/issues/86366) archive_and_compact将carried-forward tail标记为compacted=1导致重复 — OPEN，无fix PR
- [#97609](https://github.com/NousResearch/hermes-agent/pull/97609) curator终端归档绕过修复 — 新PR，待合并

**P2（部分有修复PR）**
- [#88275](https://github.com/NousResearch/hermes-agent/issues/88275) Desktop渲染进程空闲时CPU占用40-73%（macOS Intel）— OPEN
- [#90477](https://github.com/NousResearch/hermes-agent/issues/90477) Desktop SSH远程连接profile切换时错误启动本地后端 — OPEN
- [#69672](https://github.com/NousResearch/hermes-agent/issues/69672) messages_fts_trigram索引NUL哨兵导致SQLite版本依赖的FTS损坏 — OPEN
- [#80670](https://github.com/NousResearch/hermes-agent/issues/80670) Desktop恢复会话后"Could not react"错误（RPC 4040）— OPEN
- [#87654](https://github.com/NousResearch/hermes-agent/issues/87654) Vision工具首次探测后被缓存为stub而消失 — OPEN
- [#75130](https://github.com/NousResearch/hermes-agent/issues/75130) 技能提案队列无界增长（8天357条，21%失效）— OPEN
- [#72503](https://github.com/NousResearch/hermes-agent/pull/72503) 处理钩子未触发runner-drained队列消息 — 有修复PR #72503 及salvage #97626

**P3**
- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) 技能索引持续降级（29.8h > 26h限制）— OPEN，114条评论，长期未修复
- [#71998](https://github.com/NousResearch/hermes-agent/issues/71998) pre_llm_call插件上下文在多模态图像轮次被丢弃 — OPEN

## 6. 功能请求与路线图信号

- **跨平台会话上下文共享**（[#4335](https://github.com/NousResearch/hermes-agent/issues/4335)）— CLI↔Telegram等平台会话隔离，挂`needs-decision`，若纳入路线图将影响gateway架构。
- **Mistral LLM提供商支持**（[#20859](https://github.com/NousResearch/hermes-agent/issues/20859)）— 27👍高需求，虽标`wontfix`但社区呼声强烈，值得重新评估。
- **RealtimeVoiceProvider ABC**（[#77111](https://github.com/NousResearch/hermes-agent/issues/77111)）— 4个duplex-voice PR竞争，社区提议先设计接口而非逐个合并，符合AGENTS.md的Footprint Ladder原则。
- **工具输出压缩（headroom-ai）**（[#39691](https://github.com/NousResearch/hermes-agent/issues/39691)）— 17👍，当前压缩仅限会话级，工具级压缩可显著提升上下文利用率。
- **统一slash-command注册表**（[#96692](https://github.com/NousResearch/hermes-agent/issues/96692)）— 新spec提案，统一所有产品表面的命令目录与调用契约。
- **Webhook Feature Package**（[#84834](https://github.com/NousResearch/hermes-agent/issues/84834)）— 5×2×3 graph-gated修复元问题，覆盖webhook全链路。
- **API服务器文件上传**（[#67246](https://github.com/NousResearch/hermes-agent/pull/67246)）— 允许agent生成文件上传至远程文件服务器，OPEN状态。
- **Windows原生PowerShell终端**（[#85027](https://github.com/NousResearch/hermes-agent/pull/85027)）— 新增`terminal.shell: pwsh`配置，OPEN状态。
- **基于reaction的忙碌确认**（[#97615](https://github.com/NousResearch/hermes-agent/pull/97615)）— 新增`busy_ack_reaction`显示设置，今日新PR。

## 7. 用户反馈摘要

- **安装体验改善确认**：Debian用户报告安装失败（#87093）获修复，4👍正面反馈；uv.lock同步错误（#88361）作为重复关闭，安装链路稳定性提升。
- **MCP OAuth 死锁痛点突出**：#38193 用户详细描述了keepalive重连后服务永久不可用的场景，多个PR（#76526、#97458、#51149）针对同一问题从不同层面修复，社区协作解决复杂并发问题的模式值得肯定。
- **Desktop 稳定性仍是最大痛点**：启动超时（#96282、#60323）、远程会话恢复失败（#93888）、profile切换错乱（#90477）、渲染进程CPU占用（#88275）等多问题并存，尽管#94724战役完成29个PR，但用户侧体验问题仍密集。
- **多模态/视觉链路可靠性受质疑**：xAI grok-4.5图片导致会话永久损坏（#69078）、vision工具消失（#87654）、多模态轮次插件上下文丢失（#71998）——视觉功能在真实场景中的稳定性亟待加强。
- **Mistral 支持诉求强烈**：用户明确表示Mistral用户基数大于部分已支持提供商，且语音模型已集成，LLM接入难度不应成为阻碍（#20859，27👍）。

## 8. 待处理积压

- **[#66616 Skills index stale or degraded](https://github.com/NousResearch/hermes-agent/issues/66616)** — 114条评论，自7/18起持续42天未关闭。技能索引是文档站核心依赖，长期降级影响所有用户文档体验，建议优先修复或明确降级策略。
- **[#88584 Automated Nous integration is blocked](https://github.com/NousResearch/hermes-agent/issues/88584)** — 38条评论，`cron/jobs.py`合并冲突阻塞自动化集成管道，需尽快解决冲突恢复CI/CD。
- **[#84834 Webhook Feature Package](https://github.com/NousResearch/hermes-agent/issues/84834)** — 24条评论的meta-issue，webhook全链路修复计划庞大，需拆解为可合并的子任务推进。
- **[#4335 Cross-platform session context sharing](https://github.com/NousResearch/hermes-agent/issues/4335)** — 自3/31提出，挂`needs-decision`已5个月，社区持续关注，建议明确是否纳入路线图。
- **[#20859 Mistral provider support](https://github.com/NousResearch/hermes-agent/issues/20859)** — 27👍高需求但标`wontfix`，建议维护者回应社区诉求或说明拒绝原因。
- **[#90837 Recurring state.db corruption](https://github.com/NousResearch/hermes-agent/issues/90837)** — 11次损坏事故，已建立onset sentinel但根因未明，数据安全关键问题，需优先排查。
- **[#60323 macOS backend ready timeout](https://github.com/NousResearch/hermes-agent/issues/60323)** — 自7/7起，macOS Desktop启动超时问题长期未修复，影响mac用户基本使用。
- **[#75130 Skill-proposal queue unbounded growth](https://github.com/NousResearch/hermes-agent/issues/75130)** — 8天积压357条提案、21%失效，`skills.write_approval`开启时队列自失效，需设计上限与清理策略。

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报 — 2026-08-29

## 1. 今日速览

过去24小时项目保持高活跃度：共产生 8 条 Issue 更新（7 条新开/活跃、1 条关闭）和 11 条 PR 更新（10 条待合并、1 条关闭），无新版本发布。核心关注点集中在**上下文压缩导致对话失忆**（#9864，已有修复 PR #9865）、**日志分类与插件调试体验**（#9850，已有对应 PR #9861）以及**GIF 图片理解缺陷**（#9854，已有修复 PR #9335）。此外，阿里云百炼对话模型 PR #9857 被关闭，但其功能可能已被更大的配置重构 PR #9821 覆盖。整体来看，项目正处于**功能增强与稳定性修复并行推进**的阶段，社区贡献活跃，维护者响应及时。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日无 PR 被合并，但有 1 个 PR 被关闭，另有多个重要 PR 处于待合并状态，整体项目推进方向清晰：

- **#9857 [已关闭]** feat(provider): add DashScope chat completion providers — 该 PR 为阿里云百炼添加对话模型提供商（对应 Issue #9817），但被关闭。推测其功能可能已被 **#9821**（refactor: embed agent runner configuration in profiles，XXL 规模）中的配置重构所覆盖或取代，需关注后续进展。
  https://github.com/AstrBotDevs/AstrBot/pull/9857

- **#9865 [待合并]** fix: avoid premature context compression from persisted usage — 直接修复今日最严重的 Bug #9864（长对话被提前压缩导致失忆），改动点明确：不再使用持久化的 `conversation.token_usage` 作为新请求上下文的 token 计数，并保留 runner 本地的 provider prompt 快照。这是今日最关键的修复 PR。
  https://github.com/AstrBotDevs/AstrBot/pull/9865

- **#9856 [待合并]** fix: ensure config directory exists before mkstemp in _write_config_snapshot — 修复 3 个 flaky dashboard 测试（FileNotFoundError），属于稳定性改进。
  https://github.com/AstrBotDevs/AstrBot/pull/9856

- **#9861 [待合并]** feat(dashboard): show plugin logs in installed plugin details — 实现 Issue #9850 的插件日志分类查看功能，为插件开发调试提供便利。
  https://github.com/AstrBotDevs/AstrBot/pull/9861

- **#9863 [待合并]** fix(qqofficial): bound outbound HTTP concurrency — 修复 QQ 官方适配器因连接复用禁用、内部重试等导致的并发放大问题，属于平台稳定性修复。
  https://github.com/AstrBotDevs/AstrBot/pull/9863

- **#9858 [待合并]** [fix] 修复了使用最小pages示例时插件无法注册的bug — 修复插件开发中的实际痛点。
  https://github.com/AstrBotDevs/AstrBot/pull/9858

---

## 4. 社区热点

今日讨论最活跃的 Issue 集中在两个话题：

- **#9864 [Bug] ChatUI 长对话被提前压缩/截断导致对话失忆**（评论 2，👍 0）— 用户详细描述了多轮工具调用场景下，即使上下文占用仅 6.8%（68,435 tokens / 1M 窗口），AstrBot 仍触发压缩，导致关键信息丢失。该问题直击核心体验，已获得快速响应（PR #9865）。背后诉求是**上下文管理策略应更智能，不能仅依赖持久化 token 计数**。
  https://github.com/AstrBotDevs/AstrBot/issues/9864

- **#9850 [Feature] 建议给日志分类，包括按适配器和按插件**（评论 2，👍 1）— 用户吐槽日志混杂、滚动快、难以调试插件，建议增加筛选器、持久化存储，并在插件页面内查看对应日志。该诉求反映了**插件开发者对可观测性的强烈需求**，已有 PR #9861 落地。
  https://github.com/AstrBotDevs/AstrBot/issues/9850

此外，PR #8890（钉钉流式 AI 卡片）虽创建于 6 月 19 日，但今日仍有更新，属于长期活跃的 PR，社区关注度较高。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue | 问题描述 | 修复 PR |
|---------|-------|---------|---------|
| 🔴 高 | [#9864](https://github.com/AstrBotDevs/AstrBot/issues/9864) | ChatUI 长对话在上下文占用很低时被提前压缩/截断，导致对话失忆（多轮工具调用场景） | ✅ [#9865](https://github.com/AstrBotDevs/AstrBot/pull/9865) |
| 🟠 中 | [#9860](https://github.com/AstrBotDevs/AstrBot/issues/9860) | MiniMax TTS 流式输出 WAV 文件头非法（RIFF/data 长度为 0xFFFFFFFF 占位），严格播放器无法播放，且日志无报错 | ❌ 暂无 |
| 🟠 中 | [#9859](https://github.com/AstrBotDevs/AstrBot/issues/9859) | MCP 服务异常 `McpError: Session terminated`，用户提供了临时修复脚本（修改 `mcp_client.py`） | ❌ 暂无 |
| 🟠 中 | [#9854](https://github.com/AstrBotDevs/AstrBot/issues/9854) | 群聊上下文图片理解对 GIF 动图未多帧处理，仅获得静态帧描述 | ✅ [#9335](https://github.com/AstrBotDevs/AstrBot/pull/9335)（待合并） |
| 🟡 低 | [#9855](https://github.com/AstrBotDevs/AstrBot/issues/9855) | Flaky t2i dashboard 测试：配置保存时目录缺失导致 FileNotFoundError | ✅ [#9856](https://github.com/AstrBotDevs/AstrBot/pull/9856)（待合并） |

---

## 6. 功能请求与路线图信号

- **日志分类与插件级日志查看**（#9850）— 已有 PR #9861 实现，预计将进入下一版本，提升插件开发体验。
  https://github.com/AstrBotDevs/AstrBot/issues/9850

- **日语本地化**（#9862）— 用户主动提出可长期维护日语翻译及文档，属于 i18n 扩展，目前无对应 PR，但社区有明确贡献意愿。
  https://github.com/AstrBotDevs/AstrBot/issues/9862

- **阿里云百炼对话模型提供商**（#9817）— 原 PR #9857 已关闭，但 #9821（配置重构，将 runner 设置嵌入 profile）可能已包含 DashScope 支持，需关注合并后的能力覆盖。
  https://github.com/AstrBotDevs/AstrBot/issues/9817

- **插件 UI 页面迁移到独立面板**（PR #9823）— 将插件网页从侧边栏移至独立 dashboard 面板，属于 UI/UX 改进，对应 Issue #9816，规模 XL，值得关注。
  https://github.com/AstrBotDevs/AstrBot/pull/9823

---

## 7. 用户反馈摘要

- **上下文压缩策略引发信任危机**（#9864）：用户详细记录了 token 占用数据（68,435 tokens，6.8%），指出压缩触发时机与界面显示不一致，导致“对话突然失忆”。用户对硬信息丢失表示强烈不满，期望压缩前有更明确的判断依据或用户确认机制。

- **插件调试体验是核心痛点**（#9850）：用户直言“没有现成 E2E 套件就算了，从日志里找信息都很困难”，反映出插件开发者在缺少官方调试工具时的无奈，日志分类和持久化是迫切需求。

- **隐蔽的格式兼容问题**（#9860）：MiniMax TTS 生成的 WAV 在浏览器中正常，但在 Android WebView 等严格环境中失败，且日志无任何报错，用户认为“问题非常隐蔽”，这类边界情况需要更严谨的格式校验。

- **MCP 服务接入门槛**（#9859）：用户通过 Docker 部署后遇到 MCP Session terminated，自行编写临时修复脚本，说明 MCP 服务的开箱即用体验仍有提升空间。

---

## 8. 待处理积压

以下 PR/Issue 长期未合并或未关闭，建议维护者关注：

- **PR #8890**（feat: support DingTalk streaming AI cards）— 创建于 2026-06-19，已持续 2 个多月，实现钉钉互动 AI 卡片流式回复，功能完整且与现有配置项衔接，建议尽快 review。
  https://github.com/AstrBotDevs/AstrBot/pull/8890

- **PR #9335**（fix: sanitize unsupported image MIME types）— 创建于 2026-07-20，修复 GIF 等 MIME 类型被部分 Gemini 网关拒绝的问题，与今日 Issue #9854 直接相关，建议优先合并。
  https://github.com/AstrBotDevs/AstrBot/pull/9335

- **PR #9651**（fix: verify audio magic bytes before extension-based short-circuit）— 创建于 2026-08-12，修复 QQ 语音消息 AMR 编码被误判为 WAV 的问题，属于平台适配的隐蔽 Bug，建议尽快处理。
  https://github.com/AstrBotDevs/AstrBot/pull/9651

- **PR #9821**（refactor: embed agent runner configuration in profiles）— XXL 规模的重构 PR，涉及配置结构变更，可能影响现有用户配置迁移，需谨慎 review 并提前准备迁移文档。
  https://github.com/AstrBotDevs/AstrBot/pull/9821

---

**总结**：AstrBot 项目今日处于高活跃状态，核心 Bug（上下文压缩失忆）已快速得到修复 PR，社区功能请求（日志分类）也迅速落地。项目健康度良好，但需关注长期未合并的 PR（#8890、#9335、#9651）以及大型重构 PR（#9821）的推进节奏，避免积压过多导致社区贡献者流失。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*