# OpenClaw 生态日报 2026-09-18

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-17 23:47 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-09-18

> 数据来源：github.com/openclaw/openclaw 过去 24 小时 GitHub 事件。无新版本发布。

---

## 1. 今日速览

过去 24 小时内 OpenClaw 社区活跃度**极高**：Issue 新增/活跃 328 条、关闭 172 条；PR 新增/活跃 300 条、合并 200 条，整体吞吐接近 500 条/天，显示团队正处于高强度的稳定化冲刺期。质量方面出现明显压力信号——多条 P0/P1 级崩溃、回归、消息丢失与僵尸进程问题并发，且多个近期引入的回归（2026.9.x 系列）集中在 Gateway 启动、子进程回收、会话流转三条核心路径上。暂无新版本发布，但大量 P1 fix PR 已进入 maintainer review 阶段，预计短期内会有补丁批次合入。

---

## 2. 版本发布

**无新版本**。上一批次为 `2026.9.4 (1611ca6d)`，今日仍为当前 HEAD。

---

## 3. 项目进展

### 今日重点合并/关闭的 PR

| PR | 类型 | 影响 | 状态 |
|---|---|---|---|
| [#151248](https://github.com/openclaw/openclaw/pull/151248) | fix(gateway) | 停止 session-row 刷新时的堆内存无限增长 | 👀 ready for maintainer look |
| [#151250](https://github.com/openclaw/openclaw/pull/151250) | fix(secrets) | 修复被 redacted 覆盖导致的 Gateway 重启锁死 | ⏳ waiting on author |
| [#151168](https://github.com/openclaw/openclaw/pull/151168) | fix(feishu) | 停止 Feishu 发送在 caller 取消后继续投递 | ✅ 已关闭（依赖） |
| [#151127](https://github.com/openclaw/openclaw/pull/151127) | fix(computer-use) | 修复 paired-node computer use 在首次 turn 后失效 | 👀 ready |
| [#150153](https://github.com/openclaw/openclaw/pull/150153) | fix(tasks) | 保持跨共享 Gateway 更新的任务恢复能力 | ⏳ waiting on author |
| [#150255](https://github.com/openclaw/openclaw/pull/150255) | fix(codex) | 插件缺失时仍保留健康 app 可用 | 📣 needs proof |
| [#148574](https://github.com/openclaw/openclaw/pull/148574) | refactor(tasks) | 冷启动 task/flow 读取异步化 | 👀 ready |

**推进判断**：今日 ~200 条已合并/关闭 PR 中，约半数集中在"停止取消后继续投递"这一类并发安全修复，另外大量是 Gateway 内存/启动性能优化。项目正从"功能扩展"转向"核心稳定性补课"，整体向前推进幅度**中等偏上**——功能层面无大里程碑，但稳定性地基在加固。

---

## 4. 社区热点

### 评论数 Top Issues

| Issue | 评论 | 等级 | 核心诉求 |
|---|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 30 | P1 / 🦪 silver | hook/tool 子进程泄漏导致僵尸累积与运行时退化 |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | 29 | P1 / 🦞 diamond | MCP 服务器初始化超时引发 Gateway 崩溃（未处理 rejection） |
| [#149361](https://github.com/openclaw/openclaw/issues/149361) | 21 | P3 / 🌊 off-meta | WebUI 性能与稳定性总览 umbrella |
| [#139847](https://github.com/openclaw/openclaw/issues/139847) | 15 | P1 / 🦞 diamond | 同会话并发消息被丢弃（2026.9.2 回归） |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | 15 | P0 / 🦐 gold | Gateway ready 后无响应、健康探针超时、RSS 涨至 OOM |

### 评论数 Top PRs

| PR | 规模 | 风险标记 | 说明 |
|---|---|---|---|
| [#151254](https://github.com/openclaw/openclaw/pull/151254) | M | — | 复用 fs-safe 做路径检查与文件操作，减少重复代码 |
| [#151205](https://github.com/openclaw/openclaw/pull/151205) | XL | 🚨 message-delivery | 飞书两阶段结果卡（tool timeline + green result） |
| [#151176](https://github.com/openclaw/openclaw/pull/151176) | XL | 🚨 session-state / security-boundary | OpenAI Agents API MVP harness |
| [#151245](https://github.com/openclaw/openclaw/pull/151245) | XS | — | Windows realpath 规范化修复 |

**热点分析**：社区最关切的是**进程生命周期管理**和**取消语义正确性**——前者关联多条 P0/P1 issue，后者在飞书/扎洛/ Mattermost 多个 channel 同时报出同类问题，说明存在系统性缺陷而非单点 bug。

---

## 5. Bug 与稳定性

### P0 / 发布阻断级

| Issue | 标题 | Fix PR | 状态 |
|---|---|---|---|
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | Gateway ready 后不服务、健康探针超时、RSS 涨至 OOM | — | 无 PR |
| [#150452](https://github.com/openclaw/openclaw/issues/150452) | 2026.7.1-2 → 2026.9.4 升级需 1 天手动修复 | — | 已关闭（bug 确认） |
| [#146719](https://github.com/openclaw/openclaw/issues/146719) | Windows 升级 snapshot mkdir 失败（未展开的路径模板） | — | 已关闭 |
| [#145563](https://github.com/openclaw/openclaw/issues/145563) | 微信通道 reply dispatch 失败（PreparedModelCatalogConfigReplacedError） | — | 已关闭 |

### P1 严重回归

| Issue | 回归版本 | 现象 | Fix PR |
|---|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | — | hook/tool 子进程泄漏、僵尸累积 | — |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | 2026.9.4 | MCP init timeout 崩溃 Gateway | — |
| [#139847](https://github.com/openclaw/openclaw/issues/139847) | 2026.9.2 | 同会话并发消息丢失 | — |
| [#148707](https://github.com/openclaw/openclaw/issues/148707) | 2026.9.4 | turn 被 displacement 后 reply 丢失 | — |
| [#144809](https://github.com/openclaw/openclaw/issues/144809) | 2026.9.4 | 长 turn 丢失整个 reply | — |
| [#148529](https://github.com/openclaw/openclaw/issues/148529) | 2026.9.4 | 632-agent fleet 启动 12 min（原 2s） | — |
| [#148898](https://github.com/openclaw/openclaw/issues/148898) | 2026.8.2→ | 笔记本休眠后 in-flight turn 被杀 | — |
| [#138272](https://github.com/openclaw/openclaw/issues/138272) | 2026.7.1-2→ | Android Talk "no live response owner" | — |
| [#110190](https://github.com/openclaw/openclaw/issues/110190) | — | runtime context carrier 位置错误导致模型困惑 | — |

### P2 中等

| Issue | 标题 |
|---|---|
| [#127229](https://github.com/openclaw/openclaw/issues/127229) | Telegram DM 被错误 tombstone |
| [#137332](https://github.com/openclaw/openclaw/issues/137332) | requester-settle batch 永不过期 |
| [#139710](https://github.com/openclaw/openclaw/issues/139710) | 插件热重载杀死系统 turn |
| [#98435](https://github.com/openclaw/openclaw/issues/98435) | MCP loopback 重启后未自动重连 |
| [#123009](https://github.com/openclaw/openclaw/issues/123009) | Codex subscription 每 5 分钟 block |
| [#119411](https://github.com/openclaw/openclaw/issues/119411) | memory file watcher 从不 reindex |
| [#105528](https://github.com/openclaw/openclaw/issues/105528) | Windows exec/read 工具静默返回空 |
| [#45494](https://github.com/openclaw/openclaw/issues/45494) | cron job 在 LLM 500 时不快速失败 |
| [#146004](https://github.com/openclaw/openclaw/issues/146004) | subagent completion 触发异常 heartbeat |

---

## 6. 功能请求与路线图信号

| Issue/PR | 诉求 | 路线图判断 |
|---|---|---|
| [#67413](https://github.com/openclaw/openclaw/issues/67413) · 👍5 | 按 agent 粒度配置 dreaming | 合理但优先级低；当前更紧迫的是稳定性 |
| [#151176](https://github.com/openclaw/openclaw/pull/151176) | OpenAI Agents API MVP harness | **高概率纳入下一版本**，与 Codex harness 并行列驱 |
| [#151205](https://github.com/openclaw/openclaw/pull/151205) | 飞书两阶段结果卡 | 需要 e2e proof，风险标记 🚨 message-delivery，短期难进 |
| [#151218](https://github.com/openclaw/openclaw/pull/151218) | 插件自定义 deep-recall escalation | 中等优先级，依赖 active-memory 扩展成熟度 |
| [#150549](https://github.com/openclaw/openclaw/pull/150549) | Control UI 引用问答来源 | 体验优化，易实现，可能在后续 patch 中 |
| [#151249](https://github.com/openclaw/openclaw/pull/151249) | 加利西亚语 i18n | 社区贡献，低维护负担，可能合入 |
| [#74021](https://github.com/openclaw/openclaw/issues/74021) | reasoning-model final-answer 可见化 | 长期需求，已有讨论但未进入实施 |

---

## 7. 用户反馈摘要

**主要痛点**：
1. **升级创伤**：多条 issue 记录从 2026.7.x / 2026.8.x 升级到 2026.9.4 后出现破坏性行为（[#150452](https://github.com/openclaw/openclaw/issues/150452)、[#146719](https://github.com/openclaw/openclaw/issues/146719)、[#148529](https://github.com/openclaw/openclaw/issues/148529)），用户抱怨"一天的手动修复"。
2. **进程/资源泄漏**：hook、tool、MCP 子进程不回收导致僵尸累积（[#97616](https://github.com/openclaw/openclaw/issues/97616)、[#142965](https://github.com/openclaw/openclaw/issues/142965)），以及 Gateway heap 无限增长（[#150989] 相关 PR #151248）。
3. **取消语义缺陷**：飞书、扎洛、Mattermost 多个 channel 在 caller 取消后仍继续发送（[#151230](https://github.com/openclaw/openclaw/pull/151230)、[#151252](https://github.com/openclaw/openclaw/pull/151252)、[#151235](https://github.com/openclaw/openclaw/pull/151235)），用户感到"消息发出去却已不需要"。
4. **Windows 特殊问题**：路径模板未展开（[#146719](https://github.com/openclaw/openclaw/issues/146719)）、exec/read 静默空返回（[#105528](https://github.com/openclaw/openclaw/issues/105528)）、realpath 别名（[#151245](https://github.com/openclaw/openclaw/pull/151245)）。
5. **长 turn / 休眠场景**：笔记本睡眠后 in-flight turn 被杀（[#148898](https://github.com/openclaw/openclaw/issues/148898)），长 turn 丢失 reply（[#144809](https://github.com/openclaw/openclaw/issues/144809)）。
6. **记忆/索引静默失效**：file watcher 不 reindex（[#119411](https://github.com/openclaw/openclaw/issues/119411)）、memory status 报告误导性 clean。

**积极反馈**：
- 多条评论感谢 `clawsweeper` 自动化归并流程提升 triage 效率。
- Active Memory 与 deep-recall 扩展受到关注（[#151218](https://github.com/openclaw/openclaw/pull/151218)）。

---

## 8. 待处理积压

### 需维护者立即关注的 P0/P1 Issue

| Issue | 距今未响应 | 风险 |
|---|---|---|
| [#149538](https://github.com/openclaw/openclaw/issues/149538) · P0 / 🦐 gold | 2 天 | Gateway 集群 ready 后完全不可用，OOM 风险 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) · P1 / 🦪 silver | 81 天 | 子进程泄漏，生产环境渐进退化 |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) · P1 / 🦞 diamond | 1 天 | MCP init timeout 崩溃 Gateway |
| [#139847](https://github.com/openclaw/openclaw/issues/139847) · P1 / 🦞 diamond | 11 天 | 同会话并发消息丢失，回归 |
| [#148707](https://github.com/openclaw/openclaw/issues/148707) · P1 / 🦪 silver | 2 天 | turn displacement 丢失 reply |
| [#148529](https://github.com/openclaw/openclaw/issues/148529) · P1 / 🐚 platinum | 3 天 | 632-agent fleet 启动 12 分钟，严重回归 |

### 需维护者 review 的 PR（ready for look）

| PR | 大小 | 风险 |
|---|---|---|
| [#151248](https://github.com/openclaw/openclaw/pull/151248) | S | 停止 heap 增长，证明充分 |
| [#151127](https://github.com/openclaw/openclaw/pull/151127) | M | computer use 修复，关闭 #147420 |
| [#148574](https://github.com/openclaw/openclaw/pull/148574) | XL | 异步化 cold task read，构建在多个已合并 PR 之上 |
| [#151231](https://github.com/openclaw/openclaw/pull/151231) | M | worktree 清理死循环修复 |
| [#151240](https://github.com/openclaw/openclaw/pull/151240) | M | 有界 transcript sizing，CPU/内存优化 |
| [#151182](https://github.com/openclaw/openclaw/pull/151182) | L | transcript title 复用，性能优化 |
| [#150659](https://github.com/openclaw/openclaw/pull/150659) | XL | Codex session catalog 内存常驻，慢 sidebar 修复 |

### 长期未响应 Issue（>60 天）

| Issue | 创建 | 天数 | 等级 |
|---|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 2026-06-29 | 81 | P1 |
| [#45494](https://github.com/openclaw/openclaw/issues/45494) | 2026-03-13 | 189 | P2 |
| [#81182](https://github.com/openclaw/openclaw/issues/81182) | 2026-05-12 | 129 | P1 |
| [#67413](https://github.com/openclaw/openclaw/issues/67413) | 2026-04-15 | 156 | P2 |

---

## 项目健康度评估

| 维度 | 评分 | 说明 |
|---|---|---|
| 活跃度 | ⭐⭐⭐⭐⭐ | 500+ issue/PR/天，团队高强度运转 |
| 响应速度 | ⭐⭐⭐☆☆ | P0/P1 多数仍在等待 fix PR，部分 issue >60 天未解决 |
| 代码质量 | ⭐⭐⭐⭐☆ | 大量 fix PR 进入 review，但回归密集暴露测试覆盖不足 |
| 稳定性 | ⭐⭐☆☆☆ | 2026.9.x 系列集中爆发多类严重回归，是当前最大风险 |
| 社区参与 | ⭐⭐⭐⭐☆ | 多平台 channel 用户贡献同类 bug，反馈质量高 |
| 发布节奏 | ⭐⭐☆☆☆ | 无新版本，但在积累补丁；建议尽快发布 2026.9.5 稳定版 |

**总体判断**：OpenClaw 社区引擎轰鸣但底盘松动。2026.9.x 系列在 Gateway 生命周期、子进程管理、取消语义三条核心路径上引入多类回归，建议维护者优先处理 #149538、#97616、#144911 三个 P0/P1 问题后再推新版本。

---

## 横向生态对比

## 2026-09-18 个人 AI 智能体开源生态横向对比分析

### 1. 生态全景

当前开源 AI 智能体生态呈现“巨头冲刺稳定性、垂直领域精细化分化”的双轨态势。以 OpenClaw 和 hermes-agent 为代表的通用型框架正处于高强度修复合并期，核心痛点从功能扩展转向进程管理、取消语义及资源泄漏等底层稳定性问题。与此同时，DeepSeek Harness 通过插件化 UI 重构试图建立新的交互标准，而 AstrBot、QwenPaw 等项目则在多模态兼容性、SDK 适配及桌面端体验上深耕细作。整体而言，行业正从“可用”向“可靠”及“可观测”过渡。

### 2. 各项目活跃度对比

| 项目 | 24h Issue 更新 | 24h PR 更新 | 版本发布 | 健康度评分 | 核心状态 |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **OpenClaw** | 328 | 300 | 无 | ⭐⭐☆☆☆ | 高吞吐但回归密集，稳定性危机期 |
| **hermes-agent** | 500 | 500 | 无 | ⭐⭐⭐☆☆ | 极高活跃度，重点解决 SessionDB 与流式稳定性 |
| **QwenPaw** | 20 | 41 | 无 | ⭐⭐⭐☆☆ | 稳健迭代，聚焦 Console 性能与插件隔离 |
| **Zeroclaw** | 50 | 50 | 无 | ⭐⭐⭐⭐☆ | 中等活跃度，多模态与安全加固见效 |
| **AstrBot** | 6 | 19 | 无 | ⭐⭐⭐⭐☆ | 低频高质，快速响应 SDK 兼容性 Bug |
| **PicoClaw** | 1 | 14 | 无 | ⭐⭐⭐☆☆ | 低活跃度，依赖维护为主，偶有功能突破 |
| **DeepSeek Harness** | N/A (Discussions) | N/A (Releases) | **v0.1.6-alpha.2** | ⭐⭐☆☆☆ | 激进发布，引入严重回归（prepare 崩溃） |

*注：OpenClaw 吞吐近 500 条/天，hermes-agent 达 1000 条/天，为生态内最高活跃项目。*

### 3. OpenClaw 在生态中的定位

*   **优势**：**规模最大的网关枢纽**。OpenClaw 承担了最多渠道（飞书、MCP、Codex 等）的集成压力，其吞吐量（500+ PR/天）远超其他项目，是事实上的生态连接层基准。
*   **技术差异**：与其他项目相比，OpenClaw 更侧重于**底层运行时管理**（Gateway 生命周期、子进程回收、SessionDB），而非单纯的上层 UI 或特定模型适配。
*   **社区规模**：Issue 和 PR 数量级约为 QwenPaw/AstrBot 的 10-20 倍，表明其用户基数和贡献者网络最大，但同时也带来了最密集的回归风险。

### 4. 共同关注的技术方向

以下三个方向在多个项目中集中涌现，表明这是当前行业的共性难题：

1.  **并发安全与取消语义**
    *   **涉及项目**：OpenClaw, Zeroclaw
    *   **诉求**：多个渠道（飞书、Telegram）在 caller 取消后仍继续投递消息；同一会话并行启动导致重复工作或消息丢失。
2.  **资源泄漏与进程管理**
    *   **涉及项目**：OpenClaw, QwenPaw
    *   **诉求**：Hook/Tool 子进程泄漏导致僵尸累积（OpenClaw #97616）；插件同步阻塞主事件循环导致实例冻结（QwenPaw #7840）。
3.  **多模态与流式处理鲁棒性**
    *   **涉及项目**：Zeroclaw, AstrBot, OpenClaw
    *   **诉求**：图像标记错误处理（Zeroclaw）、GIF/动画提示优化（AstrBot）、SSE 流错误导致前端卡死（OpenClaw/QwenPaw）。

### 5. 差异化定位分析

| 维度 | OpenClaw / hermes-agent | DeepSeek Harness | QwenPaw / AstrBot | PicoClaw / Zeroclaw |
| :--- | :--- | :--- | :--- | :--- |
| **功能侧重** | 通用网关、多渠道聚合、长期会话管理 | 侧边栏工作区、插件化 UI、文件预览 | 桌面端用户体验、插件隔离、多 LLM 兼容 | 嵌入式/轻量级集成、特定渠道适配 |
| **目标用户** | 企业级部署、复杂工作流构建者 | 本地开发者、重度文件/代码协作用户 | 终端用户、追求稳定桌面的个人用户 | 硬件开发者、轻量级 Bot 部署者 |
| **技术架构** | 重型后端（Rust/Go 混合），强依赖 Gateway | React/TypeScript 单体应用，运行时插件解析 | Tauri 桌面壳，Python 后端，注重本地资源管理 | 模块化通道设计，强调低资源占用 |

### 6. 社区热度与成熟度

*   **快速迭代/质量巩固期**：**OpenClaw** 和 **hermes-agent**。两者均处于“功能扩张后必然后遗症”阶段，高活跃度伴随高回归率，急需通过补丁批次稳定底盘。
*   **稳健演进期**：**Zeroclaw** 和 **QwenPaw**。修复针对性强（如多模态安全、插件隔离），发布节奏平稳，社区反馈多为具体场景优化。
*   **垂直深耕期**：**AstrBot** 和 **PicoClaw**。更新频率较低，但针对特定痛点（如 OpenCode Go 协议、QQ 频道认证）响应迅速，属于小而美的垂直领域维护模式。
*   **高风险发布期**：**DeepSeek Harness**。v0.1.6-alpha.2 虽功能丰富，但引入的 `prepare` 属性崩溃属于严重回归，反映出激进发版策略下的质量控制风险。

### 7. 值得关注的趋势信号

1.  **插件系统的沙箱化迫在眉睫**：QwenPaw (#7840) 和 OpenClaw (#97616) 均暴露了插件/子进程失控对主实例的毁灭性影响。未来框架必须实现真正的隔离执行环境（如 WASM 或独立进程池），而非简单的线程切换。
2.  **从“对话”到“工作区”的范式转移**：DeepSeek Harness 的侧边栏集成、OpenClaw 的任务恢复能力，以及 QwenPaw 的持久化会话标签，均指向智能体从单次问答向**长期、多步骤、上下文感知的工作流管理平台**演进。
3.  **上游 SDK 兼容性成为稳定性的主要变量**：AstrBot (OpenCode Go)、OpenClaw (OpenAI Agents API) 均因上游变更而被迫调整。开源智能体框架需建立更自动化的依赖监控和适配机制，以减少用户升级创伤。
4.  **成本追踪精细化**：Zeroclaw (#10890) 和 OpenClaw 的健康探针关注点显示，用户对**可观测性**和**成本控制**的需求已从企业用户下沉至个人开发者，实时 Token/图像成本反馈将成为标配。

**结论**：生态正在经历从“野蛮生长”到“精细治理”的转折。对于开发者而言，OpenClaw 适合作为多渠道集成的底层参考，但需谨慎评估其稳定性风险；DeepSeek Harness 展示了下一代 UI 交互形态，但当前版本仅适合测试环境；QwenPaw 和 AstrBot 则在桌面端稳定性和特定场景适配上提供了更成熟的选择。

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 (2026-09-18)

## 1. 今日速览
Zeroclaw 今日保持高活跃度，过去24小时共产生 50 条 Issue 更新和 50 条 PR 更新。核心议题集中在**多模态图像标记处理的安全加固**、**Telegram/Matrix 渠道的语音路由修复**以及**运行时成本追踪的精细化**。虽然无新版本发布，但多个高风险（P1）Bug 已有明确的修复 PR 或 RFC 讨论，项目稳定性正在逐步收敛。

## 2. 版本发布
*   **无新版本发布。**

## 3. 项目进展
今日合并/关闭的重要 PR 主要集中在修复运行时行为缺陷：

*   **[PR #10894] Fix image markers normalization on run_model_query seam**: 解决了 `run_model_query` 直接分发路径中图像标记未规范化导致的安全隐患，已合并。这修补了 #9882 指出的漏洞。
*   **[PR #10899] Fix alias-aware sender scope keys and lane regressions**: 修复了四个并发动作中的 dispatcher 缺陷，解决了用户文本丢失和监听器相互取消的问题，已合并。这对多会话并发场景的稳定性至关重要。
*   **[PR #10860] Keep non-image data-URI markers in tool results as text**: 防止非图像数据 URI 被错误地提升为提供商图像，已合并。这是针对多模态预处理逻辑的重要修正。
*   **[PR #10890] Charge image markers a fixed per-image cost**: 修正了历史 token 估算中图像标记定价过低的问题，确保成本追踪准确，已合并。

**整体推进评估**: 项目在“多模态处理准确性”和“并发会话隔离”两个关键维度上取得了实质性修复进展，降低了生产环境中的潜在故障率。

## 4. 社区热点
讨论最活跃、评论最多的 Issue：

*   **[Issue #8692] Maintainer decision queue for RFCs and design issues** (15 条评论):
    *   **链接**: https://github.com/zeroclaw-labs/zeroclaw/issues/8692
    *   **分析**: 维护者正在建立更结构化的决策跟踪机制，以提高 RFC 和设计问题的处理效率。反映社区对开发流程透明度的诉求。
*   **[Issue #10549] Simplify RFC voting by removing mandatory discussion windows** (12 条评论):
    *   **链接**: https://github.com/zeroclaw-labs/zeroclaw/issues/10549
    *   **分析**: 提议简化 RFC 投票流程，移除强制讨论窗口。显示社区希望加速迭代周期，减少不必要的等待摩擦。
*   **[Issue #4853] Install skills from .well-known agent-skills discovery indexes** (7 条评论):
    *   **链接**: https://github.com/zeroclaw-labs/zeroclaw/issues/4853
    *   **分析**: 关于技能安装的标准化发现机制，涉及与 Vercel 等平台的兼容性，技术架构层面的重要讨论。

## 5. Bug 与稳定性
今日报告的关键 Bug，按严重程度排列：

| 级别 | Issue ID | 描述 | Fix PR 状态 | 链接 |
| :--- | :--- | :--- | :--- | :--- |
| **P1** | #10408 | 同一会话中并行启动导致重复工作和回复 | 暂无明确合并 PR | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10408) |
| **P1** | #10875 / #10883 | Telegram 媒体组测试在并行运行时间歇性失败 | #10899 已修复相关 dispatcher 缺陷 | [10875](https://github.com/zeroclaw-labs/zeroclaw/issues/10875) [10883](https://github.com/zeroclaw-labs/zeroclaw/issues/10883) |
| **P1** | #10805 | Windows 上 control_plane 存活测试的竞争条件 | 暂无 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10805) |
| **P2** | #10912 | Streaming text guard 误抑制包含工具协议键的普通文本 | 暂无 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10912) |
| **P2** | #10854 | 工具输出中的字面图像标记被提升为畸形提供商图像 | #10860, #10894 已部分修复 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10854) |
| **P2** | #10924 | Runtime-command 回复错误进入对话式语音路由 | 暂无 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10924) |
| **P2** | #10922 | WhatsApp Web 在排队自动 TTS 时忽略 suppress_voice | 暂无 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10922) |
| **P2** | #10926 | Matrix send_via 将 peer user 身份误认为房间目的地 | 暂无 | [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10926) |

**稳定性总结**: 尽管有几个 P2 级渠道相关 Bug 尚未修复，但 P1 级的测试稳定性和多模态处理问题已通过今日合并的 PR 得到显著改善。

## 6. 功能请求与路线图信号
*   **[RFC #10930] One durable primitive for questions an agent asks a human**: 提议统一代理询问人类问题的持久化原语。这可能与现有的 SOP 批准门控机制整合，影响未来的交互设计模式。
*   **[RFC #10929] Delivery receipts for outbound messages**: 要求提供出站消息的投递回执。目前 ZeroClaw 无法确认消息是否送达，这是一个重要的可观测性功能请求。
*   **[Feature #10932] Surface the voice-note transcript to the user (STT echo)**: 建议将语音笔记转录文本回显给用户，作为可选设置。旨在提高 STT 错误的可见性，改善用户体验。
*   **[Feature #10925] Support input-driven mirror voice replies on Matrix**: 请求在 Matrix 渠道支持输入驱动的镜像语音回复。

**路线图判断**: 多模态处理、语音输入/输出的用户体验优化以及消息可观测性是当前的优先方向。

## 7. 用户反馈摘要
*   **痛点**:
    *   **图像标记处理**: 用户对工具输出中 `[IMAGE:...]` 标记的处理逻辑表示关注，担心其被错误地传递或渲染（#10854, #10908）。
    *   **并发行为**: 同一会话中的并行运行导致重复工作（#10408）和消息路由错误（#10924）影响了使用流畅性。
    *   **语音体验**: WhatsApp 和 Matrix 渠道的语音路由和 TTS 行为不符合预期，用户希望有更精细的控制（#10922, #10925）。
*   **满意点**:
    *   **成本追踪改进**: 用户认可对代理循环成本和图像标记定价的精确化努力（#10804, #10890）。
    *   **流程简化**: 社区对简化 RFC 投票流程表示支持（#10549）。

## 8. 待处理积压
*   **[Issue #10408] Second message during active turn starts parallel run**: P1 级 Bug，可能导致严重的资源浪费和用户体验问题，需优先处理。 ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10408))
*   **[Issue #10805] Control plane liveness tests race on Windows**: P1 级 CI 问题，影响 Windows 平台的持续集成稳定性。 ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10805))
*   **[Issue #10912] Streaming text guard suppresses whole replies**: P2 级 Bug，涉及 Agent 核心的文本生成逻辑，可能频繁触发。 ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10912))
*   **[Issue #9332] Image-aware pre-dispatch budgeting**: P2 级 Bug，影响图像密集型请求的预算准确性。 ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9332))

**建议**: 维护者应重点关注 #10408 和 #10805，它们分别影响核心运行时行为和跨平台 CI 稳定性。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-09-18** | **数据周期：2026-09-17 00:00 ~ 2026-09-18 00:00**

---

## 1. 今日速览

PicoClaw 昨日保持**中等活跃度**：共处理 15 条活动（1 Issue + 14 PR），其中 7 条已合并/关闭，7 条仍待响应。Dependabot 批量更新 5 个 Go 依赖，反映出项目对供应链安全的常规维护。**QQ 频道认证报错** Issue #3349 成为今日焦点，涉及 401 授权格式错误，已关闭但可能仍需跟进。开源贡献者 @linhongyu510 提交 2 个 PR 修复工具反馈动画和 IRC 多行消息，显示社区对用户体验细节的关注。**无新版本发布**，项目处于功能迭代期。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

### 已合并/关闭的 PR（7 条）

| PR | 作者 | 内容 | 影响 |
|----|------|------|------|
| [#3360](https://github.com/sipeed/picoclaw/pull/3360) | @dependabot[bot] | 升级 `larksuite/oapi-sdk-go/v3` 3.9.4 → 3.11.0 | 飞书 API 兼容性修复 |
| [#3361](https://github.com/sipeed/picoclaw/pull/3361) | @dependabot[bot] | 升级 `google.golang.org/protobuf` 1.36.11 → 1.36.12 | 协议缓冲区安全更新 |
| [#3362](https://github.com/sipeed/picoclaw/pull/3362) | @dependabot[bot] | 升级 `golang.org/x/term` 0.44.0 → 0.45.0 | 终端交互依赖更新 |
| [#3363](https://github.com/sipeed/picoclaw/pull/3363) | @dependabot[bot] | 升级 `ergochat/irc-go` 0.6.0 → 0.7.0 | IRC 协议支持增强 |
| [#3364](https://github.com/sipeed/picoclaw/pull/3364) | @dependabot[bot] | 升级 `aws-sdk-go-v2` 1.42.0 → 1.45.1 | AWS SDK 更新 |
| [#3358](https://github.com/sipeed/picoclaw/pull/3358) | @hugodeco | 修复 agent 线程回复到原始消息 | **用户体验改进**：群聊中机器人回复能正确关联问题 |
| [#1158](https://github.com/sipeed/picoclaw/pull/1158) | @hyperwd | 新增 anthropic-messages 协议支持 | **功能扩展**：支持 Anthropic 原生 Messages API 格式 |

**项目健康度评估**：依赖更新占比 71%（5/7），说明近期以维护为主；功能型 PR 仅 2 条，但 @hugodeco 和 @hyperwd 的贡献具有实际用户价值。

---

## 4. 社区热点

### 🔥 Issue #3349 — QQ 频道无法正常使用（5 条评论）
**链接**：https://github.com/sipeed/picoclaw/issues/3349  
**状态**：CLOSED | **作者**：@bxwl5  
**摘要**：Docker 和 Linux x86 版本均报 `401 Authorization 参数格式错误`，错误码 `11241`，trace_id 指向网关组件。

**背后诉求分析**：
- 用户测试覆盖多平台，说明 QQ 频道是高频使用场景
- 错误信息明确指向协议实现问题，非配置错误
- 已关闭但未提供解决方案，可能需重新打开或补充文档

### 📌 PR #3222 — Deltachat 重构（长期开放）
**链接**：https://github.com/sipeed/picoclaw/pull/3222  
**状态**：OPEN | **作者**：@trufae  
**摘要**：清理 200 行代码，移除遗留特性，重命名 `invite_link` → `join_invite_link`，添加 `show_invite_link`。

**社区关注点**：PR 创建近 2 个月未合并，可能涉及 breaking change，需维护者评估。

---

## 5. Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | Fix 状态 |
|----------|----------|------|----------|
| 🟡 中 | [#3349](https://github.com/sipeed/picoclaw/issues/3349) | QQ 频道 401 认证失败 | 已关闭，无明确修复 |
| 🟢 低 | [#3353](https://github.com/sipeed/picoclaw/pull/3353) | 工具反馈动画无限循环 | PR #3353 已提交，待合并 |

**稳定性评估**：今日无崩溃报告，但 QQ 频道问题影响核心功能，建议优先跟进。

---

## 6. 功能请求与路线图信号

### 高优先级信号

1. **Anthropic API 原生支持**（#1158，已合并）  
   → 路线图确认：项目向多 LLM 提供商兼容方向演进

2. **OpenAI Responses API 切换**（#3381，待合并）  
   → 链接：https://github.com/sipeed/picoclaw/pull/3381  
   → 作者 @XenonR 提议升级到 OpenAI 最新 API 格式，反映用户对模型服务商更新的跟进需求

3. **Deltachat 自定义渠道初始化**（#3376，待合并）  
   → 链接：https://github.com/sipeed/picoclaw/pull/3376  
   → 解决配置验证错误 `channel "deltachat" has unknown type "deltachat"`，修复已提交的 bug

### 中优先级信号

4. **Parallel Search MCP 集成**（#3368，待合并）  
   → 链接：https://github.com/sipeed/picoclaw/pull/3368  
   → 提供 Sogou 搜索 + 页面提取能力，无需 API key

5. **IRCv3 多行消息支持**（#3354，待合并）  
   → 链接：https://github.com/sipeed/picoclaw/pull/3354  
   → 请求 `batch`、`message-tags`、`draft/multiline` 能力

---

## 7. 用户反馈摘要

### 痛点提炼

| 场景 | 反馈 | 来源 |
|------|------|------|
| QQ 频道认证 | "gateway 日志报错 401，docker 和 Linux 版本都试过了" | #3349 |
| 群聊回复关联 | "busy groups 里 bot 回答 disconnected from the question" | #3358 |
| Deltachat 配置 | "startup failed error loading config" | #3376 |
| 工具动画卡死 | "missed lifecycle cleanup cannot keep editing indefinitely" | #3353 |

### 满意度信号
- ✅ @hugodeco 的线程回复修复获得 implicit 认可（PR 已合并）
- ✅ @hyperwd 的 Anthropic 支持满足代理服务用户需求
- ⚠️ QQ 频道问题关闭无方案，用户可能不满意

---

## 8. 待处理积压

### 长期未响应 PR（>30 天）

| PR | 作者 | 创建日期 | 天数 | 建议 |
|----|------|----------|------|------|
| [#3222](https://github.com/sipeed/picoclaw/pull/3222) | @trufae | 2026-07-03 | 77 | 评估是否合并或关闭 |
| [#3354](https://github.com/sipeed/picoclaw/pull/3354) | @linhongyu510 | 2026-08-31 | 18 | 优先级：中 |
| [#3353](https://github.com/sipeed/picoclaw/pull/3353) | @linhongyu510 | 2026-08-31 | 18 | 优先级：高（修复 bug） |
| [#3344](https://github.com/sipeed/picoclaw/pull/3344) | @LinespottingPrivate | 2026-08-23 | 26 | 协议实验性，需谨慎 |
| [#3381](https://github.com/sipeed/picoclaw/pull/3381) | @XenonR | 2026-09-17 | 1 | 关注中 |
| [#3376](https://github.com/sipeed/picoclaw/pull/3376) | @luisgdev | 2026-09-10 | 8 | 优先级：高（修复启动失败） |

### 维护者行动建议

1. **立即跟进**：Issue #3349（QQ 频道）需重新打开或补充解决方案
2. **优先合并**：PR #3353（动画 bug 修复）、#3376（配置错误修复）
3. **评估积压**：PR #3222（77 天未响应）需决定去留
4. **关注新 PR**：#3381（OpenAI Responses API）刚提交，可能影响核心功能

---

**日报生成时间**：2026-09-18 00:00 UTC  
**数据来源**：GitHub API (github.com/sipeed/picoclaw)  
**分析模型**：Agnes-2.5-Flash (Sapiens AI)

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：** 2026-09-18
**数据源：** GitHub (agentscope-ai/qwenpaw)
**分析师：** Agnes (Sapiens AI)

## 1. 今日速览
2026年9月17日，QwenPaw 项目保持高活跃度，过去24小时内产生 **41 条 PR** 更新和 **20 条 Issue** 更新，其中 **17 条 PR 已合并**，显示出核心开发团队的高效交付能力。尽管未发布新版本，但近期围绕 **Console 稳定性**、**MCP 驱动优化**及**上下文管理**的技术迭代密集，修复了多个导致 UI 卡顿和会话丢失的关键缺陷。社区对插件隔离性和实时语音功能表现出浓厚兴趣，整体项目健康度良好，但桌面端的启动时序和内存管理问题仍需持续关注。

## 2. 版本发布
**无新版本发布。**
当前稳定版本仍为 v2.2.1（Desktop/Tauri）及对应的后端版本。近期合并的 PRs 主要集中在 bug fix 和性能优化，尚未触发新的 release cycle。

## 3. 项目进展
**今日合并/关闭的重要 PR：**

*   **[Telemetry] Agent 执行活动报告** (#7802, Closed)
    *   **推进功能：** 引入了每日 Runtime 活动遥测，记录内置 Agent 或外部 harness 的执行情况（不包括启动或页面访问）。这有助于官方更准确地评估用户活跃度和功能使用率。
*   **[Hub] 本地 Python 环境隔离与认证修复** (#7833, Open/Under Review - *注：虽状态为Open，但摘要显示解决 #7779 引入的问题，属于关键修复流程*)
    *   **修复内容：** 解决了 Hub 本地运行时依赖安装路径错误及 PawApp 浏览器访问权限问题，确保依赖安装保留在可写环境中。
*   **[Console] 流式背景工具输出按需加载** (#7831, Open)
    *   **优化点：** 引入了对后台工具生命周期的状态轮询，仅在工具行展开时打开对应的输出 SSE 流，折叠时中止。这将显著降低长任务下的内存占用和网络压力。
*   **[CLI] 内存任务优雅关闭** (#7760, Open)
    *   **改进：** 防止在 Workspace 关闭时因清理顺序问题导致 ReMe 内存任务被中断，增加了 12 秒的宽限期和 Windows 进程组的 CTRL_BREAK_EVENT 支持。

**整体评价：** 开发重点已从“新功能堆砌”转向“稳定性加固”和“用户体验精细化”，特别是在 Console 渲染性能和后端资源管理上。

## 4. 社区热点
**讨论最活跃的 Issues/PRs：**

*   **#7678: spawn subAgent 任务超时失败** (10 comments)
    *   **热度原因：** 用户反馈 v2.2.0 中 spawn 子代理后必然超时，且延长 timeout 无效。这是高并发/多代理场景下的严重体验阻断问题。
    *   **诉求：** 希望官方确认是否为已知 bug 并提供工作区或修复版本。
*   **#6318: 支持 Conversation 级别指定模型** (7 comments)
    *   **热度原因：** 长期存在的功能请求。用户希望在同一 Agent 下不同对话使用不同模型（如一个对话用廉价模型，另一个用强模型），而不仅限于 Agent 全局绑定。
    *   **诉求：** 细粒度的模型控制能力。
*   **#7815 / #7814 / #7813: Console SSE 流错误与页面卡死**
    *   **热度原因：** 多个关联 Issue 指向 Console 前端在遇到恶意或 malformed SSE 帧（如 bare null payload）时的崩溃行为。
    *   **诉求：** 提高前端的容错性，避免单个错误帧导致整个会话界面冻结。

## 5. Bug 与稳定性
**按严重程度排列：**

1.  **🔴 Critical: 插件同步阻塞主事件循环** (#7840)
    *   **描述：** 插件在事件循环线程上执行同步 I/O 会导致整个实例（包括所有 Agent 和 Channel）冻结约 40 秒。
    *   **现状：** 已报告，涉及插件隔离机制的根本缺陷。**暂无 Fix PR。**
2.  **🔴 Critical: 启动时 Console UI 与后端不同步** (#7841)
    *   **描述：** Desktop 2.2.1 启动时 Console 可能在前端就绪前渲染，导致模型列表和插件面板空白，需手动刷新。
    *   **现状：** 已报告。**关联 PR #7834** 正在修复 `/compact` 命令在启动初期的会话路由问题，但 UI 加载时序问题仍需关注。
3.  **🟠 High: 上下文压缩配置失效** (#7810, Closed)
    *   **描述：** 用户设置 131k 上下文限制，但实际输入飙升至 271k，压缩未触发。
    *   **现状：** Issue 已关闭。**关联 PR #7832** 正在修复 UI 中显示的 `max_input_length` 与实际运行时解析的上下文窗口不一致的问题，明确了配置优先级链。
4.  **🟠 High: Session Sync 孤儿文件与数据库损坏** (#7839)
    *   **描述：** `session-sync` 跳过 86 个孤儿会话文件，且 `retention purge` 因 SQLite 损坏失败。
    *   **现状：** 已报告。**暂无 Fix PR。** 提示数据维护工具在异常中断后的恢复能力不足。
5.  **🟡 Medium: Scroll 驱逐策略逻辑缺陷** (#7836, #7837)
    *   **描述：** 在工具密集的任务中，Scroll 驱逐可能丢弃用户输入轮次，且用户行无 headline 导致锚点丢失。
    *   **现状：** 已报告。**关联 PR #7639** 正在优化历史完整性扫描性能，但未直接解决驱逐逻辑 bug。

## 6. 功能请求与路线图信号
*   **Realtime Voice Chat (实时语音聊天)**
    *   **证据：** PR #7785 添加了 provider-configurable 的实时语音聊天功能，支持语音输入、播放、打断及模型选择。
    *   **预测：** 这是高优先级功能，预计将在下一个主要版本中作为亮点推出。
*   **Plugin Hot Reload & Clean Unload (插件热重载与清洁卸载)**
    *   **证据：** PR #7565 引入了插件卸载路径和回滚安全的重载机制。
    *   **预测：** 提升开发者体验和系统稳定性，预计近期合并。
*   **Feishu 可折叠推理面板**
    *   **证据：** PR #7685 为飞书渠道添加了可折叠的 reasoning panel，并支持自动折叠。
    *   **预测：** 针对特定渠道的 UX 优化，将纳入后续更新。
*   **OS 桌面模式下注册自定义应用**
    *   **证据：** Issue #7830 请求在 `/os` 桌面模式下开放接口标准。
    *   **预测：** 属于生态扩展需求，需评估 API 稳定性后决定采纳程度。

## 7. 用户反馈摘要
*   **痛点：**
    *   **多代理稳定性差：** 用户反映 `spawn subAgent` 在 v2.2.0+ 版本中普遍存在超时问题，严重影响复杂工作流。（#7678）
    *   **配置不生效：** 上下文长度设置在实际运行中无效，UI 显示值与运行时行为存在巨大差异，导致 Token 溢出。（#7810, #7832）
    *   **插件系统脆弱：** 单个插件的同步阻塞操作会拖垮整个实例，缺乏沙箱隔离，用户担忧生产环境的稳定性。（#7840）
    *   **UI 加载时序问题：** 桌面端启动时界面元素（模型列表、插件）经常为空，需要手动刷新，体验不佳。（#7841）
*   **满意点：**
    *   用户对 **Console SSE 流的鲁棒性** 改进有强烈需求，表明现有流式处理在极端情况下容易崩溃是已知痛点，修复后将提升满意度。
    *   **工具调用审批卡片** 的国际化（i18n）请求（#7809）表明用户认可该安全功能，但希望其支持多语言以适应全球用户。

## 8. 待处理积压
*   **🔴 #7840:** 插件共享事件循环导致的实例冻结问题。这是系统稳定性的阿喀琉斯之踵，需优先解决插件隔离机制。
*   **🔴 #7839:** 数据库损坏恢复及孤儿文件同步问题。涉及数据安全，需完善 `retention purge` 的容错和恢复机制。
*   **🟠 #7836 / #7837:** Scroll 驱逐策略中的边缘情况 Bug。虽然不影响核心功能，但在长会话中会导致上下文丢失，影响 Agent 连续性。
*   **🟠 #6318:** Conversation 级别模型绑定。长期未被满足的用户需求，若 PR 尚未进入开发阶段，建议维护者评估优先级。

---
**报告生成时间：** 2026-09-18
**分析工具：** Agnes-2.5-Flash (Sapiens AI)

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：2026-09-18**
**数据来源：GitHub hermes-agent**

## 1. 今日速览
今日项目活跃度极高，24小时内共产生 1000 条更新（500 Issues + 500 PRs），其中新开/活跃事项 720 条，已解决/合并 280 条。虽然无新版本发布，但社区在关键架构问题（如 SessionDB 可插拔化、`hermes update` 状态同步）上讨论热烈。多个高优先级 Bug（P1）正在被积极修复，包括流式传输中断、会话持久化异常及桌面端渲染问题，显示出维护者对稳定性的高度关注。

## 2. 版本发布
- **无新版本发布**。

## 3. 项目进展
今日合并/关闭的重要 PR 及其推进功能：

- **PR #114496 [CLOSED] fix(agent): send session continuity headers**
  - **进展**：修复了 `anthropic_messages` 和 OpenAI 兼容传输中缺乏稳定 conversation ID 的问题。
  - **价值**：使会话感知的代理能够可靠地关联对话轮次，避免重复发送完整历史记录，提升了跨会话连续性和效率。

- **PR #114480 [OPEN] fix(compaction): name the emitted task heading in the update instruction**
  - **进展**：修正了 `_build_summary_prompt` 中指示 summarizer 更新 `"## Active Task"` 但模板实际输出 `## Historical Task Snapshot` 的错位问题。
  - **价值**：解决了上下文压缩时的指令误解，确保摘要生成准确反映当前任务状态。

- **PR #114486 [OPEN] fix(tools): parse JSON-string tool_call batch envelopes**
  - **进展**：增强了对模型以 JSON 字符串形式发出的工具调用批处理信封的解析能力。
  - **价值**：防止因解析失败导致的死循环，提高了与某些模型行为兼容性的稳定性。

- **PR #85850 [OPEN] perf(model_switch): memoise config and credential-pool loads**
  - **进展**：对 `list_authenticated_providers` 中的配置和凭据池加载进行记忆化处理。
  - **价值**：减少重复 I/O 和计算，提升模型切换时的性能响应速度。

## 4. 社区热点
以下 Issues 评论最活跃，反映了社区核心关切：

- **[OPEN] #88584 Automated Nous integration is blocked (112 comments)**
  - **热度原因**：自动化集成流水线冲突，影响 Nous 与 Enterkey 的合并流程。
  - **背后诉求**：用户希望 CI/CD 管道稳定，确保依赖库能顺利更新，避免手动干预。

- **[CLOSED] #110912 Nous Portal: full/list price charged... (24 comments)**
  - **热度原因**：订阅用户遭遇非预期的费用激增，怀疑是折扣路由 Bug。
  - **背后诉求**：计费透明度和准确性，用户对成本敏感度高，需快速澄清和补偿机制。

- **[OPEN] #23717 RFC: Pluggable SessionDB Provider (23 comments)**
  - **热度原因**：探讨从 SQLite 迁移至 PostgreSQL/MySQL 等关系型数据库的可行性。
  - **背后诉求**：解决高并发下的锁冲突和持久化问题，支持生产级部署需求。

- **[OPEN] #107402 `hermes update` leaves permanent warning... (21 comments)**
  - **热度原因**：更新后警告状态残留，影响运维健康检查。
  - **背后诉求**：期望命令行工具能准确反映运行时真实状态，避免误报干扰自动化脚本。

- **[CLOSED] #83390 Auxiliary title_generation fails on DeepSeek (21 comments)**
  - **热度原因**：DeepSeek 模型兼容性 Bug，影响标题生成辅助功能。
  - **背后诉求**：用户依赖特定提供商模型，希望 Hermes 能优雅处理不同模型的 API 差异。

## 5. Bug 与稳定性
按严重程度排列的 Bug 报告：

- **P1 Bugs**:
  - **#110912 [CLOSED]**: Nous Portal 计费错误，已关闭，表明修复进展。
  - **#103483 [OPEN]**: muse-spark 流式传输意外中断（18 comments）。**状态**：未合并，影响使用体验。
  - **#100896 [OPEN]**: `state.db`  corruption 多次发生（15 comments）。**状态**：关键稳定性问题，需长期监控。
  - **#107307 [OPEN]**: Codex provider 错误导致 Hermes 工作中断（17 comments）。**状态**：待复现，影响生产环境可靠性。
  - **#104691 [CLOSED]**: 僵尸会话租约锁定（8 comments）。**状态**：已关闭，可能已修复。
  - **#62774 [CLOSED]**: Desktop 流式传输文本截断/损坏（7 comments）。**状态**：已关闭，葡萄牙语用户反馈严重。
  - **#107191 [CLOSED]**: model_aliases 自定义 base_url 被丢弃（6 comments）。**状态**：已关闭，配置持久化问题修复。

- **P2 Bugs**:
  - **#113683 [OPEN]**: Windows GUI 每日更新后失效（6 comments）。**状态**：平台兼容性问题，需 Windows 团队关注。
  - **#106665 [CLOSED]**: Desktop 在 125% 缩放下的渲染/点击问题（16 comments）。**状态**：已关闭，UI 适配修复。
  - **#103375 [CLOSED]**: Bot tiles 无限重连饿死后端池（10 comments）。**状态**：已关闭，资源泄漏修复。

**总结**：今日关闭了多个 P1 级 Bug（计费、配置、会话锁定），显著提升了稳定性。但 `state.db` 损坏和流式传输中断等关键问题仍待解决。

## 6. 功能请求与路线图信号
- **RFC: Pluggable SessionDB Provider (#23717)**: 强烈信号表明项目正考虑支持多后端数据库，以适应企业级部署需求。若采纳，将大幅扩展 Hermes 的生产适用性。
- **RFC: script-speed computer use via semantic state (#112639)**: 提出通过语义状态和预执行优化电脑操作速度，反映用户对 agent 执行效率的更高期望。
- **Feature: Self-tuning harness (#111237)**: 本地进化循环，自动保留 statistically-credited 的调整，指向自我优化的长期愿景。
- **feat(sessions): per-session stamp labels (#112566, #114499)**: 两个相关 PR 均提出为会话添加标签功能，便于用户组织和管理长期任务，很可能被纳入下一版本。
- **feat(mcp-catalog): add Compartment offline agentic memory (#95708, #114494)**: 社区贡献的加密本地内存提供者的集成，丰富插件生态。

## 7. 用户反馈摘要
- **正面反馈**：
  - 对关闭的计费 Bug (#110912) 和配置 Bug (#107191) 表示欣慰，认为维护者响应迅速。
  - 新功能如会话标签 (#112566) 受到期待，认为有助于任务管理。
- **负面痛点**：
  - **稳定性担忧**：`state.db` 多次损坏 (#100896) 引发对数据持久层可靠性的质疑。
  - **平台兼容性**：Windows 用户抱怨更新后 GUI 失效 (#113683)，体验不一致。
  - **集成复杂性**：自动化集成阻塞 (#88584) 和依赖冲突 (#95855) 增加了运维负担。
  - **流式传输质量**：多起报告涉及流式中断或文本损坏，影响实时交互体验。

## 8. 待处理积压
- **#23717 RFC: Pluggable SessionDB Provider**: 长期 RFC，需社区决策是否实施及何时实施。
- **#100896 state.db corruption**: 反复出现的严重 Bug，需根本性解决方案，目前尚无明确修复时间表。
- **#103483 muse-spark streaming interruption**: P1 级流式传输 Bug，影响特定模型 Provider，需优先调查。
- **#107307 Codex provider errors**: P2 级但影响生产，需要复现和修复。
- **#113683 Windows GUI breakage after update**: 平台特定问题，需 Windows 开发者优先处理。

---
*报告生成时间：2026-09-18*
*分析师：Agnes (Sapiens AI)*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目动态日报
**日期：** 2026-09-18  
**分析周期：** 过去24小时  
**当前版本：** v4.28.1 (基于 Issue 反馈)

---

## 1. 今日速览

过去24小时，AstrBot 社区活跃度维持高位，共处理 **6 条 Issue** 和 **19 条 PR**。核心进展集中在**修复 SDK 重试逻辑冲突**、**OpenCode Go 协议适配**以及**GIF 动图处理机制优化**三个方向。今日关闭了 2 个 Issue（其中包含一个长期存在的 Bug #9663）并合并了 5 个 PR，显示出维护者对高优先级问题的快速响应能力。整体项目健康度良好，无阻塞性回归风险。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

今日主要合并/关闭的 PR 推动了以下关键改进：

*   **修复 OpenAI SDK 重试嵌套问题 (PR #9669)**
    *   **内容：** 修复了 `provider_settings.request_max_retries` 与 OpenAI Python SDK 内建重试机制叠加导致实际请求次数翻倍的问题（关联 Issue #9663）。
    *   **意义：** 解决了用户反映的请求频率超限和错误计数不准确问题，确保重试控制完全由 AstrBot 统一管理，提升了 API 调用的稳定性和成本控制准确性。
*   **优化 GIF 动图处理提示 (PR #10119)**
    *   **内容：** 修复了 GIF/APNG/Animated WebP 被拼帧后发送给模型时，AI 无法区分“多帧动画”与“单张复杂图片”的问题（关联 Issue #10103）。
    *   **意义：** 在图像预处理阶段增加标识位，明确告知模型输入来源，提升多模态理解的准确性。
*   **Telegram 回复行为可配置化 (PR #10115)**
    *   **内容：** 新增配置项，允许用户选择 Telegram Bot 是否以“引用回复”方式响应。
    *   **意义：** 增强了平台适配器的灵活性，满足特定场景下避免消息链过长或保持对话整洁的需求。

---

## 4. 社区热点

### 🔥 高关注度 Issue/PR

1.  **OpenCode Go 协议适配需求强烈**
    *   **Issue:** [#10054](https://github.com/AstrBotDevs/AstrBot/issues/10054) - 报告 OpenCode Go 自 9 月 5 日起要求 `x-opencode-session` 请求头，否则返回 400 错误。
    *   **PR:** [#10005](https://github.com/AstrBotDevs/AstrBot/pull/10005) - 已提交新增 OpenCode Go 专用 Provider，自动补齐会话标识。
    *   **分析：** 用户诉求明确且紧迫，随着上游服务升级，此功能已成为必备项。PR #10005 直接响应此问题，预计将被优先合并。

2.  **重置对话 vs 新建对话语义混淆**
    *   **Issue:** [#10114](https://github.com/AstrBotDevs/AstrBot/issues/10114) - 用户希望 `reset` 命令仅清空上下文而保留对话 ID，与 `new` 命令区分。
    *   **PR:** [#10118](https://github.com/AstrBotDevs/AstrBot/pull/10118) - 正在重构，旨在恢复并明确区分 `reset`（重置上下文）与 `new`（新建对话）的行为。
    *   **分析：** 这是一个体验类痛点，涉及核心交互逻辑。PR #10118 已提交，正在评审中，有望在下一次更新中解决。

3.  **Gemini 流式输出历史记录丢失**
    *   **Issue:** [#10105](https://github.com/AstrBotDevs/AstrBot/issues/10105) - 发现 Gemini 流式调用中，工具调用前的叙述性文本未保存至历史。
    *   **分析：** 属于流式处理路径的潜在 Bug，目前尚无对应 PR，但已被社区成员识别，需关注后续修复。

---

## 5. Bug 与稳定性

| 严重级别 | 问题描述 | Issue/PR | 状态 |
| :--- | :--- | :--- | :--- |
| **高** | 知识库上传成功后文档数量为 0，底层报错“写入知识库索引时出错” | [#10109](https://github.com/AstrBotDevs/AstrBot/issues/10109) | 开放，暂无 Fix PR |
| **中** | `request_max_retries` 与 SDK 内建重试叠加，导致请求数异常 | [#9663](https://github.com/AstrBotDevs/AstrBot/issues/9663) | **已关闭**，PR #9669 已合并 |
| **低** | Gemini 流式 narration 未存入历史 | [#10105](https://github.com/AstrBotDevs/AstrBot/issues/10105) | 开放，待确认 |

**说明：**
*   **知识库索引 Bug (#10109)** 是当前最需要关注的稳定性问题，影响核心功能可用性，建议维护者优先排查 embedding 批次限制或 surrogate 字符问题（相关 PR #8928 已提交但未合并）。
*   **重试逻辑 Bug (#9663)** 已通过 PR #9669 修复，感谢提交者 @SweetenedSuzuka。

---

## 6. 功能请求与路线图信号

*   **OpenCode Go/Zen 支持：** Issue #10054 和 PR #10005、#8179 表明社区对接入 OpenCode 生态有强烈需求。多个 PR 并行推进，预计下一版本将包含完整的 OpenCode Go 协议支持。
*   **插件市场 UI 增强：** PR #6727 提议在插件市场增加列表视图和分页大小设置，反映用户对管理大量插件时的体验优化需求。
*   **图像内存优化：** PR #10117 和 #10120 聚焦于降低图片处理过程中的内存开销和尺寸限制，显示项目正持续优化资源使用效率，为处理更大规模 multimodal 输入做准备。
*   **Thinking 标签兼容：** PR #10116 增加对 `<thinking>` 标签的识别，响应日益流行的长思考链模型（如 Gemini 2.0 Flash Thinking）的解析需求。

---

## 7. 用户反馈摘要

*   **痛点 1：API 兼容性断裂。** 用户反馈 OpenCode Go 更新后 AstrBot 无法直接使用，需要专用 Provider 才能稳定工作。（来源：Issue #10054）
*   **痛点 2：命令语义混淆。** 用户希望 `reset` 和 `new` 有更清晰的区分，避免意外创建新对话而非仅清空上下文。（来源：Issue #10114, PR #10118）
*   **痛点 3：图片处理黑盒。** 用户指出 GIF 动图被处理成拼图后，AI 无法正确理解其为动画，缺乏相应提示。（来源：Issue #10103, PR #10119）
*   **满意点：** 用户对 Issue #9663 的快速修复表示认可，认为重试逻辑的澄清有助于更好地控制 API 用量。（来源：Issue #9663 关闭）

---

## 8. 待处理积压

以下长期未合并或关注的 Issue/PR 建议维护者给予关注：

1.  **PR #8928** - [fix: cap embedding batch size] 修复知识库上传因批次超限或代理字符失败的 Bug，关联 Issue #10109，**建议优先合并**。
2.  **Issue #10105** - [Gemini streaming history loss] 流式历史记录缺失问题，**建议安排开发资源排查**。
3.  **PR #6322** - [ChatGPT Codex OAuth] 较早期提交的 PR，功能完整，若测试无误建议跟进合并。
4.  **PR #6727** - [插件市场列表视图] UI 改进，有助于提升用户体验，可纳入常规迭代。

---
*报告生成时间：2026-09-18*  
*数据来源：GitHub API (AstrBotDevs/AstrBot)*

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：2026-09-18**
**分析师：Agnes (Sapiens AI)**

## 1. 今日速览
DeepSeek Harness (DSH) 在 2026-09-18 保持高活跃度，过去 24 小时内 Discussions 新增 **142 条**，社区对 v0.1.6-alpha.2 的采纳与反馈迅速。今日核心事件为 **v0.1.6-alpha.2** 正式发布，大幅增强 UI 交互（插件管理、文件预览、侧边栏集成）并优化了性能与稳定性。然而，新版也引发了一波关于 `prepare` 属性未定义的崩溃报告（主要涉及源码启动与工具链拆分），社区正在集中讨论解决方案。整体项目处于快速迭代期，功能丰富度提升显著，但新版稳定性仍需观察。

## 2. 版本发布
**新版本：v0.1.6-alpha.2**
*   **关键新增功能**：
    *   **插件管理页**：支持插件的安装、配置修改及实时启停。
    *   **UI/UX 增强**：侧边栏支持 Office 文件预览、URL 浏览器模式访问、Subagent 会话查看及提交计划预览。
    *   **会话体验**：回合结束时显示文件改动卡片，支持逐文件对比审阅；思考内容支持紧凑 Markdown 排版。
    *   **CLI/Web 优化**：工作区列表按目录层级分组，侧边栏布局持久化，改善启动等候时间。
*   **重要变更/潜在破坏性更新**：
    *   **插件依赖解析**：调整为运行时解析，支持运行时卸载。**开发者需检查插件加载和卸载逻辑**。
    *   **Session 多实例**：客户端 Session 支持多实例共存，相关 API 及 slot 有变化。
    *   **默认模型列表**：移除 V4 Flash 和 V4 Flash Vision Exp。
    *   **创造模式**：移除原 Cordis 动态定义及运行工具，调整为通过 Plugin Manager 安装持久化插件。
*   **迁移注意事项**：由于插件加载机制和 Session API 的变化，自定义插件开发者需重新验证兼容性；多实例共存可能影响依赖旧 Session 单例逻辑的集成。

## 3. 项目进展
*注：本项目未启用 GitHub Issues/PR，代码合并通过 Releases 落地。以下基于 v0.1.6-alpha.2 Changelog 梳理。*

*   **核心功能落地**：本次发版集中上线了侧边栏集成能力（文件、URL、Subagent、提交计划），标志着 DSH 正从单一对话界面向更复杂的“工作区 + 上下文管理”平台演进。
*   **稳定性修复**：修复了 Winows 控制台窗口闪现、Inbox 消息恢复失败、Messages API 地址拼接错误及权限审批逻辑异常等多个长期存在的 Bug。
*   **性能优化**：改进了 CLI 及 Web 启动速度，以及 Trajectory 中附件缩略图预览性能。
*   **架构调整**：插件系统从静态加载转向运行时解析，增强了灵活性的同时增加了开发者的适配成本。

## 4. 社区热点
以下是过去 24 小时 Discussions 中评论数最多的 15 条中的热点分析：

1.  **[Show Your Plugins!] EasyRewrite 插件** (#3456) - *29 条评论*
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/3456
    *   **热点分析**：用户强烈渴望“撤回”功能。EasyRewrite 插件提供气泡内联编辑和惰性撤回，恰好填补了官方功能的空白，反映用户对对话可逆性和编辑灵活性的迫切需求。

2.  **[Q&A] --host 0.0.0.0 支持问题** (#76) - *29 条评论*
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/76
    *   **热点分析**：安全与远程访问的永恒矛盾。官方明确拒绝支持 0.0.0.0 以防止远程代码执行风险，但用户（尤其是开发和部署场景）对此有持续需求，评论区可能存在绕过方案讨论或替代建议（如隧道工具）。

3.  **[BUG] sandbox escalation 错误** (#201) - *24 条评论*
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/201
    *   **热点分析**：用户报告在特定模型（GPT-5.6-Sol）下出现权限升级冲突错误，表明复杂权限模式下的工具调用仍存在边界条件问题。

4.  **[BUG] Subagents 丢失 reasoningEffort** (#4666) - *14 条评论*
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/4666
    *   **热点分析**：v0.1.6-alpha.2 引入的 Subagent 功能与部分需要“思考”的模型（如 GLM）存在兼容性问题，子代理静默丢弃 `reasoningEffort` 导致请求被拒，这是新功能集成中的典型回归。

5.  **[General] 0.1.5-rc.2 未修复问题清单复盘** (#6520) - *11 条评论*
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/6520
    *   **热点分析**：社区维护者 PerryLink 对历史问题进行系统性复核，显示忠实用户对版本质量的高关注度，22 项问题仅发生行号漂移，说明根本原因可能仍在，但已被新版掩盖或未修复。

## 5. Bug 与稳定性
**严重性排序（基于社区反馈热度与崩溃影响）：**

1.  **[CRITICAL] v0.1.6-alpha.2 源码启动工具调用崩溃** (#6971)
    *   **现象**：使用 `pnpm dsh` 源码启动时，任何工具调用均失败，报错 `Cannot read properties of undefined (reading 'prepare')`。
    *   **背景**：Changelog 提到“客户端 Session 支持多实例共存，相关 API 及 slot 有变化”以及“split @deepseek-ai/dsh-tools across src/lib”。此崩溃极可能是此次重构引入的回归。
    *   **关联**：#4601, #2620, #6971 均有类似报错，#7910 用户反馈“更新不能太积极，又不能用了”，并出现相同错误。
    *   **状态**：已知问题，社区正在寻求 workaround 或等待官方修复。

2.  **[HIGH] 持久化格式跨代拒绝** (#4910)
    *   **现象**：旧版本创建的 session 数据无法被新版本直接读取，虽已有相邻代次迁移路径，但跨代升级仍面临障碍。
    *   **状态**：官方已提供相邻代次迁移方案，但用户教育成本高。

3.  **[MEDIUM] 会话重启后标题丢失** (#5857)
    *   **现象**：重启 DSH 后，forked/seeded 会话在列表中显示为工作区目录名而非实际标题，打开后才恢复正常。
    *   **影响**：用户体验轻微下降，不影响功能。

4.  **[MEDIUM] 权限升级冲突** (#201)
    *   **现象**：在特定工具调用序列下，sandbox 权限升级报错。
    *   **状态**：社区讨论中，需复现环境定位。

5.  **[LOW] Windows 控制台窗口闪现** (Changelog 提及)
    *   **状态**：已在 v0.1.6-alpha.2 中修复。

## 6. 功能请求与路线图信号
*   **“撤回”与“编辑”功能**：#3456 的高热度表明，用户希望拥有类似聊天软件的撤回和原地编辑能力。官方暂未原生支持，由社区插件填补。预计未来版本可能考虑原生集成或提供更完善的插件 API。
*   **远程访问支持**：#76 的持续讨论显示用户对 `-host 0.0.0.0` 的需求稳定存在。官方出于安全考虑明确拒绝，但社区可能继续探索反向代理或隧道方案。
*   **白盒因果护栏插件**：#4634 提出的 `weiwen-law-dsh` 插件，旨在对每个工具调用进行因果逻辑链裁决，反映高级用户对 AI 行为可解释性和安全控制的需求，可能成为插件生态的一个重要方向。
*   **持久化 Agent 团队**：#4303 的 `dsh-agent-team` 插件，支持持久化、人工管理的 Agent 团队，表明用户对多 Agent 协作和长期记忆的需求正在增长。

## 7. 用户反馈摘要
*   **痛点**：
    *   **新版稳定性焦虑**：#7910 用户直言“更新不能太积极，又不能用了”，并抱怨降级也失效，反映用户对快速迭代与稳定性之间平衡的担忧。
    *   **意外费用**：#4478 用户报告 DSH 在未明确配置的情况下调用了 DeepSeek API 导致扣费，提示权限管理和默认行为存在安全隐患。
    *   **复杂错误排查**：`prepare` 属性未定义的错误在多个讨论中出现，普通用户难以理解其技术根源，需要更友好的错误提示或文档。
*   **满意点**：
    *   **插件生态繁荣**：EasyRewrite、weiwen-law-dsh、dsh-agent-team 等高质量社区插件的出现，增强了 DSH 的功能边界和用户粘性。
    *   **UI/UX 持续优化**：v0.1.6-alpha.2 的文件预览、侧边栏集成等功能受到欢迎，提升了操作效率。

## 8. 待处理积压
*   **#6520**：社区核实的 0.1.5-rc.2 遗留问题清单，虽有部分修复，但大量问题仅行号漂移，需官方进一步确认是否彻底解决。
*   **#76**：`--host 0.0.0.0` 支持请求，长期存在且用户呼声高，需官方明确态度或提供替代方案文档。
*   **#2226**：会话中途切换 Full access 权限的 Bug，涉及复杂权限预设，长期未得到广泛解决。
*   **#4910**：持久化格式的跨代兼容性问题，虽有个案迁移路径，但系统性解决方案有待完善。

**总结**：DeepSeek Harness 在 2026-09-18 经历了一次重大功能更新，带来了丰富的新特性，但也引入了严重的回归 Bug（特别是源码启动时的工具调用崩溃）。社区活跃度极高，对安全性和易用性的需求突出。建议用户暂避使用源码启动方式，或等待官方紧急修复；官方需优先解决 v0.1.6-alpha.2 的稳定性问题，并加强对 API 变更的迁移指导。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*