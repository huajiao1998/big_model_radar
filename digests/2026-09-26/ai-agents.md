# OpenClaw 生态日报 2026-09-26

> Issues: 500 | PRs: 500 | 覆盖项目: 7 个 | 生成时间: 2026-09-26 00:14 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [QwenPaw](https://github.com/agentscope-ai/qwenpaw)
- [hermes-agent](https://github.com/NousResearch/hermes-agent)
- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 | 2026-09-26

## 1. 今日速览

OpenClaw 在 2026.9.5 版本发布后进入了高强度的修复周期，过去24小时内社区反馈极其活跃（500条 Issue + 500条 PR 更新），反映出新版在内存管理、模型目录同步及更新机制上存在若干阻塞性回归。尽管暂无新版本发布，但维护者已密集提交20余个关键 PR，涵盖稳定性修复与性能优化，项目正通过快速迭代修复 release-blocker 级别问题。整体而言，项目处于**高风险修复窗口期**，维护响应速度较快，但用户信任度面临挑战。

## 2. 版本发布

**无新版本发布。**

当前 `latest` 和 `beta` 均指向 **2026.9.5** (`ec9c1a1`)。社区正在追踪 2026.9.7 修复情况 (#157531)，表明 9.6 版本可能存在严重缺陷导致用户回退或等待更稳定的下一迭代。

## 3. 项目进展

今日 PR 活动高度集中在**稳定性修复**与**性能优化**，主要推进方向如下：

*   **SQLite 协调与临时文件耗尽修复** (#157413): 解决 Gateway 操作及测试中临时文件系统 inode 耗尽问题，影响广泛（跨平台、多通道）。
*   **渠道插件清理 (Second Pass)**: 
    *   Telegram/Matrix/Feishu 去重 (#158164, 已关闭)
    *   WhatsApp/Signal/iMessage 等剩余渠道清理 (#158272)
    *   减少重复传输管道和冗余类型，提升可维护性。
*   **性能优化**:
    *   控制 UI 头像服务不阻塞 SQLite (#158445)
    *   轨迹记录减少工具 schema 重复脱敏 (#158471)
    *   并发会话查看者减少 Gateway 工作量 (#158408)
    *   控制 UI 文件读取脱离事件循环 (#158464)
    *   持久化会话元数据补丁脱离主线程 (#158465)
*   **Codex 集成修复**: 
    *   保留 Desktop Computer Use 的记忆指令 (#158472)
    *   OAuth 刷新时序修复 (#158458)
    *   Compaction writer 释放修复 (#144511)
*   **Cron 重构** (#158222): 将运行历史读取移至 Worker 线程，减轻 Gateway 主线程负担。
*   **TaskFlow Webhooks 退役** (#158225): 作为移除 TaskFlow 的独立步骤，清理遗留插件。
*   **更新机制修复** (#158455): 区分配置读取失败与无效配置，保留详细字段信息。

**整体评价**: 项目正通过大量小而专注的 PR 快速修补 9.5/9.6 引入的问题，同时推进架构解耦（Worker 线程化、去重清理），技术债务处理积极。

## 4. 社区热点

### 高关注度 Issues

| Issue | 类型 | 评论数 | 核心诉求 | 链接 |
|-------|------|--------|----------|------|
| #153257 | P0 Bug | 33 | 9.5 版本导致稳定环境崩溃，恢复耗时8小时，用户强烈负面反馈 | [链接](https://github.com/openclaw/openclaw/issues/153257) |
| #155753 | P0 Bug | 28 | 模型目录缓存无限循环导致单核 CPU 持续满载 | [链接](https://github.com/openclaw/openclaw/issues/155753) |
| #42475 | Feature | 24 | 网关层按 Agent 设置成本预算上限，防止费用失控 | [链接](https://github.com/openclaw/openclaw/issues/42475) |
| #22438 | Feature | 20 | 分层 Bootstrap 文件加载，节省上下文窗口 | [链接](https://github.com/openclaw/openclaw/issues/22438) |
| #137332 | P1 Bug | 18 | 混合终端请求批量重试死循环，消息丢失 | [链接](https://github.com/openclaw/openclaw/issues/137332) |

### 高关注度 PRs

*   **#137359** (33+ 相关讨论): 修复自动回复中内存刷新被看门狗中断的问题，涉及消息投递安全。
*   **#158222**: Cron 历史读取 Worker 化，显著影响调度性能。
*   **#157753**: 修复 Claude Code 订阅使用量缺失问题，影响计费透明度。

**热点分析**: 用户最关切的是**升级后的稳定性**和**资源消耗异常**（CPU/内存）。成本控制和上下文效率也是长期痛点。维护者需优先回应 9.5 版本的回归问题。

## 5. Bug 与稳定性

### P0 级 Release Blocker

| Issue | 描述 | Fix PR | 链接 |
|-------|------|--------|------|
| #153257 | 9.5 导致环境崩溃，8小时恢复困难 | 未知 | [链接](https://github.com/openclaw/openclaw/issues/153257) |
| #155753 | 模型目录缓存循环导致 CPU 单核满载 | 关联 #154276/#153422 | [链接](https://github.com/openclaw/openclaw/issues/155753) |
| #157842 | 9.6 prepared-model-catalog worker 内存泄漏 (~77MB/turn) | 未知 | [链接](https://github.com/openclaw/openclaw/issues/157842) |
| #154812 | Gateway RSS 超出 V8 heap 导致 OOM 和关机超时 | 未知 | [链接](https://github.com/openclaw/openclaw/issues/154812) |
| #152804 | 9.5 升级后 minimax-portal 模型目录丢失 | 未知 | [链接](https://github.com/openclaw/openclaw/issues/152804) |
| #154114 | 更新候选演练失败："No usable inference route" | 未知 | [链接](https://github.com/openclaw/openclaw/issues/154114) |
| #156986 | 更新过程卡住，worker 输出失控 (233MB+) | 未知 | [链接](https://github.com/openclaw/openclaw/issues/156986) |
| #155094 / #153049 / #154924 | 多起更新失败报告 (doctor-failed, global-install-failed) | 未知 | [链接](https://github.com/openclaw/openclaw/issues/155094), [链接](https://github.com/openclaw/openclaw/issues/153049), [链接](https://github.com/openclaw/openclaw/issues/154924) |

### P1 级重要 Bug

| Issue | 描述 | Fix PR | 链接 |
|-------|------|--------|------|
| #137332 | 请求者结算批次无限重试 | #157878 (待作者确认) | [链接](https://github.com/openclaw/openclaw/issues/137332) |
| #144809 | 长会话 (超 RUN_STALE_TAKEOVER_MS) 丢失生成回复 | 未知 | [链接](https://github.com/openclaw/openclaw/issues/144809) |
| #121661 | CLI 子代理announce-wake 轮次工具调用伪造 | 关联 #116461 | [链接](https://github.com/openclaw/openclaw/issues/121661) |
| #154572 | sessions_spawn 到 claude-cli 子代理总是失败 | 关联 #152659 | [链接](https://github.com/openclaw/openclaw/issues/154572) |
| #154180 | Telegram polling 在源码模式下找不到模块 | 未知 | [链接](https://github.com/openclaw/openclaw/issues/154180) |
| #153859 | 单次 ACP sessions_spawn 产生两个唤醒事件 | 未知 | [链接](https://github.com/openclaw/openclaw/issues/153859) |
| #158421 | 默认模型配置被解析为用户显式 pin，阻止跨提供商回退 | 未知 | [链接](https://github.com/openclaw/openclaw/issues/158421) |
| #158271 | openclaw agent 切换时 messageToolPolicyHash 翻转，使 claude-cli 会话失效 | 未知 | [链接](https://github.com/openclaw/openclaw/issues/158271) |

### 其他显著 Bug

*   **#140129** (P2): 2026.9.2  Anthropic 缓存卡在 ~46k tools+system prefix，长会话每次重写历史。
*   **#154104** (P2): 空闲 Gateway 启用 4 个 Matrix E2EE 账号时 CPU 50%、磁盘写入 52 MB/min（回归）。
*   **#155720** (P0): macOS LaunchAgent 在 restart drain 后残留但未加载，Gateway 静默下线。
*   **#158099** (P2): Gateway 启动时无条件执行 `git rev-parse` 和 `npm root -g`，即使禁用更新检查也会触发 macOS CLT 安装对话框。

**稳定性评估**: 9.5/9.6 版本在**内存管理**、**更新机制**和**模型目录同步**方面存在系统性缺陷，多个 P0 问题尚未合并修复 PR，建议用户暂缓升级或等待紧急补丁。

## 6. 功能请求与路线图信号

| Issue | 诉求 | 潜在纳入版本 | 链接 |
|-------|------|--------------|------|
| #42475 | 网关层按 Agent 设置成本预算上限 | 中长期 | [链接](https://github.com/openclaw/openclaw/issues/42475) |
| #22438 | 分层 Bootstrap 文件加载以节省上下文 | 9.7+ | [链接](https://github.com/openclaw/openclaw/issues/22438) |
| #14785 | 减少工具 schema token 开销 (~3,500 tok/session) | 9.7+ (部分优化已在 #158471) | [链接](https://github.com/openclaw/openclaw/issues/14785) |
| #67413 | 按 Agent 配置 Dreaming 行为 | 未来 | [链接](https://github.com/openclaw/openclaw/issues/67413) |
| #45508 | Webchat 支持自托管 STT/TTS | 未来 | [链接](https://github.com/openclaw/openclaw/issues/45508) |
| #16555 | 投递队列消息 TTL/过期机制 | 未来 | [链接](https://github.com/openclaw/openclaw/issues/16555) |
| #13219 | 按模型 usage logging 以便成本跟踪 | 9.7+ (部分修复在 #157753) | [链接](https://github.com/openclaw/openclaw/issues/13219) |
| #42646 | Memory MVP: SQLite schema 定义 | 已完成/进行中 | [链接](https://github.com/openclaw/openclaw/issues/42646) |

**路线图信号**: 
*   **成本可控性**是明确需求 (#42475, #13219)，与 #157753 (修复使用量显示) 形成呼应。
*   **上下文效率**持续受关注 (#22438, #14785)，部分优化已通过 PR #158471 落地。
*   **架构解耦**持续推进：Cron Worker 化 (#158222)、通道插件去重 (#158164, #158272)、TaskFlow 退役 (#158225)。
*   **Browser Harness 默认化** (#126255) 仍在等待 Proof，可能是下一阶段重大变更。

## 7. 用户反馈摘要

### 主要痛点
1.  **升级风险高**: 多位用户报告从 9.4 升级到 9.5/9.6 后出现环境不稳定、模型目录丢失、更新失败等问题 (#153257, #152804, #154114, #156986, #155094)。
2.  **资源消耗异常**: 内存泄漏 (#157842, #154812)、CPU 单核满载 (#155753)、空闲时高 CPU 和磁盘写入 (#154104) 严重影响生产环境。
3.  **更新机制不可靠**: 多种更新失败模式 (candidate rehearsal 失败、global-install-failed、doctor-failed) 阻碍版本迭代 (#154114, #154924, #153049, #155094)。
4.  **会话状态丢失**: 长会话回复丢失 (#144809)、子代理结果未返回 (#156919)、轮次切换导致会话失效 (#158271) 影响用户体验。
5.  **诊断信息不清晰**: Doctor 工具在混合状态下产生误导信息 (#42252)，更新失败报告缺乏细节 (#158455)。

### 正面反馈
*   维护者对高复杂度问题响应迅速，多个 PR 在同一天内完成审查和准备。
*   通道插件清理工作提升了代码可维护性。
*   性能优化 PR 专注于减轻主线程负担，符合架构演进方向。

### 使用场景
*   **生产环境网关部署**: 用户对稳定性要求极高，无法接受 8 小时故障恢复 (#153257)。
*   **多通道集成**: Telegram、Matrix、Discord 等通道用户遇到模块加载和消息重复问题。
*   **Claude Code/Codex 集成**: 订阅使用量显示、OAuth 刷新、记忆指令传递等问题频发。
*   **大规模 Agent 部署**: 成本预算、上下文效率、内存管理是运维核心关切。

## 8. 待处理积压

### 长期未响应的重要 Issue

| Issue | 创建时间 | 天数 | 优先级 | 状态 | 链接 |
|-------|----------|------|--------|------|------|
| #42475 | 2026-03-10 | ~199 | P2 | needs-product-decision | [链接](https://github.com/openclaw/openclaw/issues/42475) |
| #22438 | 2026-02-21 | ~217 | P2 | needs-product-decision | [链接](https://github.com/openclaw/openclaw/issues/22438) |
| #14785 | 2026-02-12 | ~226 | P2 | no-new-fix-pr | [链接](https://github.com/openclaw/openclaw/issues/14785) |
| #67413 | 2026-04-15 | ~163 | P2 | needs-product-decision | [链接](https://github.com/openclaw/openclaw/issues/67413) |
| #45508 | 2026-03-13 | ~196 | P2 | needs-product-decision | [链接](https://github.com/openclaw/openclaw/issues/45508) |
| #16555 | 2026-02-14 | ~224 | P2 | no-new-fix-pr | [链接](https://github.com/openclaw/openclaw/issues/16555) |
| #13219 | 2026-02-10 | ~228 | P2 | no-new-fix-pr | [链接](https://github.com/openclaw/openclaw/issues/13219) |
| #48920 | 2026-03-17 | ~194 | P0 | needs-live-repro | [链接](https://github.com/openclaw/openclaw/issues/48920) |

### 需要维护者关注的 PR

| PR | 状态 | 风险 | 链接 |
|----|------|------|------|
| #157878 | ⏳ waiting on author | session-state, message-delivery | [链接](https://github.com/openclaw/openclaw/pull/157878) |
| #153451 | ⏳ waiting on author | 常规修复 | [链接](https://github.com/openclaw/openclaw/pull/153451) |
| #158470 | ⏳ waiting on author | compatibility | [链接](https://github.com/openclaw/openclaw/pull/158470) |
| #126255 | 📣 needs proof | compatibility, security-boundary, availability | [链接](https://github.com/openclaw/openclaw/pull/126255) |

**建议**: 
1. 优先处理 P0 级稳定性 Bug (#153257, #155753, #157842, #154812)，考虑发布紧急补丁版本。
2. 推动 #157878 和 #126255 进展，前者解决消息丢失，后者是浏览器功能重大变更。
3. 对长期积压的功能请求 (#42475, #22438) 进行产品决策，明确路线图优先级。
4. 加强更新机制测试，避免 #154114, #156986 类问题再次发生。

---

## 横向生态对比

## 开源 AI 智能体生态横向对比分析报告 (2026-09-26)

### 1. 生态全景
当前个人 AI 助手与自主智能体开源生态呈现**“核心框架承压修复、垂直工具稳步迭代、基础设施层深化”**的三元结构。OpenClaw 作为旗舰级通用框架，正处于高强度的稳定性修复窗口期，反映出规模化部署后的技术债务压力；而 AstrBot、QwenPaw 等项目则在桌面体验、本地部署和多模态交互上持续精进。整个生态正从早期的“功能扩张”全面转向“生产级稳定性”与“成本效率优化”并重的成熟阶段。

### 2. 各项目活跃度对比

| 项目 | Issues (24h) | PRs (24h) | Release | 健康度评估 | 核心状态 |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **OpenClaw** | ~500+ | ~500+ | 无 (v2026.9.5) | ⭐⭐ (高风险) | **紧急修复期**：P0级内存/CPU/Bug集中爆发，维护者高频响应但信任度受损 |
| **hermes-agent** | ~500+ | ~500+ | 无 | ⭐⭐⭐ (稳健) | **快速迭代期**：P3级修复冲刺，侧重桌面端一致性与Windows兼容性 |
| **DeepSeek Harness** | N/A (Discussions 173) | N/A | 无 (v0.1.7-rc.2) | ⭐⭐⭐ (高互动) | **社区驱动验证期**：用户深度参与根因分析与补丁，Windows/遥测问题突出 |
| **Zeroclaw** | 50 | 50 | 无 (v0.9.0基建) | ⭐⭐⭐⭐ (健康) | **内核硬化期**：安全RFC落地，运行时组件化重构，产出高效闭环 |
| **QwenPaw** | 12 | 13 | 无 | ⭐⭐⭐⭐ (良好) | **稳定精修期**：控制台UX与安全加固，积压清理进度显著 |
| **AstrBot** | 7 | 17 (6 merged) | 无 | ⭐⭐⭐⭐☆ (优秀) | **体验打磨期**：桌面客户端完善，Token效率与历史数据连续性优化 |
| **PicoClaw** | 2 | 4 | 无 (nightly) | ⭐⭐⭐ (中等) | **低活跃评审期**：无代码合并，依赖CLA修复与OpenAI API迁移推进 |

### 3. OpenClaw 在生态中的定位
*   **规模与影响**：作为生态中Issue/PR量级最高（~1000条/日）的项目，OpenClaw 是事实上的**通用智能体操作系统基准**。其活跃度远超其他项目（是Zeroclaw的10倍，AstrBot的30倍），表明其拥有最广泛的用户基数和最复杂的部署场景。
*   **技术路线差异**：与其他项目相比，OpenClaw 更强调**网关层（Gateway）的中心化管理**和**多通道插件架构**（Telegram/Matrix/Feishu等）。相比之下，AstrBot 更侧重 bot 协议的轻量化适配，hermes-agent 侧重 IDE 集成体验，Zeroclaw 侧重 Rust 内核的安全隔离。
*   **当前挑战**：OpenClaw 目前处于“成长的烦恼”阶段，高频的 P0 级回归（内存泄漏、模型目录同步、更新机制崩溃）是其从“可用”迈向“企业级可信”必须跨越的门槛，这也是其区别于其他相对稳定项目的显著特征。

### 4. 共同关注的技术方向
1.  **上下文效率与成本控制**：
    *   **OpenClaw** (#42475, #14785, #158471)、**AstrBot** (#10195, #10208)、**hermes-agent** (#5320)。
    *   *诉求*：减少工具 Schema 重复、优化 Token 估算准确率、设置网关层成本预算上限。
2.  **长会话管理与记忆持久化**：
    *   **OpenClaw** (#157842, #144809)、**AstrBot** (#9474)、**QwenPaw** (#7628, #7884)。
    *   *诉求*：解决长对话中的内存泄漏、上下文压缩后的历史数据可见性、会话状态不丢失。
3.  **跨平台/Windows 兼容性**：
    *   **hermes-agent** (#122183, #122239)、**DeepSeek Harness** (#986, #7504, #7675)、**OpenClaw** (#155720)。
    *   *诉求*：修复 Windows 下的路径编码、沙箱权限（DACL/TLS）、更新机制在特定 OS 下的崩溃。
4.  **多模态与原生工具支持**：
    *   **AstrBot** (#9554 - OpenAI Responses Provider)、**Zeroclaw** (#11108 - Browser/Search语义)、**OpenClaw** (#158472 - Desktop Computer Use)。
    *   *诉求*：原生支持搜索/代码解释器，修复 Legacy 输入映射导致的工具调用失效。

### 5. 差异化定位分析
*   **OpenClaw**：**全能型中枢**。适合需要复杂多渠道集成、自定义网关策略、大规模 Agent 调度的企业级或高级用户。技术栈以 Node.js 为主，强调灵活性与插件生态。
*   **hermes-agent**：**开发者友好型伴侣**。深度集成 IDE 工作流（类似 Cursor/Copilot 的开源替代），侧重代码辅助、对等会话协作和桌面端 UX。
*   **AstrBot**：**轻量级 Bot 网关**。适合社交媒体（Telegram/WhatsApp/飞书）机器人快速部署，强调易用性和桌面客户端体验。
*   **QwenPaw**：**Alibaba 生态集成者**。依托通义千问模型优势，侧重控制台 UX 和本地 llama.cpp 模型的混合部署支持。
*   **Zeroclaw**：**安全优先的内核**。采用 Rust 编写，强调 Wasm 插件隔离、SOP（标准操作程序）确定性执行和安全治理 RFC。
*   **DeepSeek Harness**：**DeepSeek 模型专用运行器**。针对 DeepSeek 模型特性优化（如 Reasoning Effort），社区技术深度高，适合研究者和深度用户。
*   **PicoClaw**：**边缘/微型设备适配**。由 Sipeed 维护，侧重于资源受限环境或特定硬件平台的 AI 助手接入。

### 6. 社区热度与成熟度
*   **快速迭代/高噪音阶段**：**OpenClaw**, **hermes-agent**。Issue 量级大，Bug 密集，维护者处于“救火”模式，但响应速度快。这是项目规模化后的典型特征。
*   **稳健开发/高质量闭环阶段**：**Zeroclaw**, **AstrBot**, **QwenPaw**。Issue/PR 比例协调，合并率高，反馈集中在具体功能增强和体验优化，而非基础稳定性崩溃。
*   **社区互助/技术深挖阶段**：**DeepSeek Harness**。虽然官方更新频率看似较低，但社区讨论质量极高，用户自发提供根因分析和补丁，形成了独特的“共创”生态。
*   **低活跃/依赖外部阶段**：**PicoClaw**。受限于维护人力和 CLA 流程，推进缓慢。

### 7. 值得关注的趋势信号
1.  **“上下文压缩”成为标配痛点**：几乎所有主流项目（OpenClaw, QwenPaw, AstrBot）都涌现出关于 Context Compaction 失败、预算失控或历史丢失的反馈。这表明随着 Agent 会话变长，**智能的、无损的上下文管理算法**是下一代竞争关键。
2.  **Windows 环境兼容性是新的“最后一英里”**：DeepSeek Harness 和 hermes-agent 的高频 Windows Bug 报告揭示，跨平台一致性（特别是路径、编码、权限）仍是开源 AI 工具大规模普及的主要障碍。
3.  **从“聊天”到“工作流”**：OpenClaw 的 Cost Budget、hermes-agent 的 Peer Session Messaging、Zeroclaw 的 SOP 持久化，均指向智能体正从单纯的对话接口演变为**可审计、可预算、可编排的业务执行单元**。
4.  **遥测与隐私的博弈**：DeepSeek Harness 的遥测日志溢出问题和 OpenClaw 的成本追踪需求，反映了用户对**数据透明度**和**本地控制权**的强烈诉求，未来项目需在可观测性与隐私保护间寻找新平衡。

---
*分析师：Agnes (Sapiens AI)*

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报
**日期：** 2026-09-26  
**数据来源：** GitHub (zeroclaw-labs/zeroclaw)

## 1. 今日速览
今日 Zeroclaw 项目开发节奏紧凑且高效，过去24小时内共处理 **50 条 Issues** 和 **50 条 PRs**，呈现出“高产出、快闭环”的健康状态。其中 **13 个 Issue** 和 **8 个 PR** 已正式关闭或合并，包括多个关键的安全架构 RFC 和运行时稳定性修复。虽然没有新版本发布，但内部架构正在经历深刻重构（如 runtime 组件化、安全策略收紧），表明项目正处于从功能扩张向内核硬化过渡的关键阶段。

## 2. 版本发布
**无新版本发布。**  
当前重点在于 v0.9.0 相关的基础设施稳固（见 Issue #8358）及 SOP 控制平面的完善，尚未进入打包发版窗口。

## 3. 项目进展
今日合并/关闭的重要变更显著推进了 **安全性治理** 和 **运行时稳定性**：

*   **SOP 与消息送达性 RFC 落地**：#10930 (Agent问人类的持久化原语) 和 #10929 (出站消息投递回执) 已关闭 (Accepted)。这标志着 ZeroClaw 解决了长期存在的“消息是否送达”的黑盒问题，为后续更可靠的 Agent 交互奠定了基础。
    *   #10930: https://github.com/zeroclaw-labs/zeroclaw/issues/10930
    *   #10929: https://github.com/zeroclaw-labs/zeroclaw/issues/10929
*   **治理流程优化**：#11017 (RFC: 保留适用审查并简化快速合并决策) 已关闭，解决了 CI 快速通道中重复审查的问题，提升了 maintainer 的工作效率。
    *   #11017: https://github.com/zeroclaw-labs/zeroclaw/issues/11017
*   **关键 Bug 修复**：
    *   **#10397** (MCP): 修复了 MCP 工具返回完整信封而非仅文本块的问题，改善了模型读取体验。
    *   **#11072** (Nix): 修复了 Flake 包缺少 `meta.mainProgram` 导致的启动命令警告问题。
    *   **#10265** (Security): 提交了拥有者会话与存储删除的增强实现。
    *   **#9986** (Agents): 增加了将 Agent 导出为便携 Bundle 的功能，提升了可移植性。

## 4. 社区热点
以下 Issue 评论活跃，反映了社区对 **架构清晰度** 和 **开发者体验** 的高度关注：

*   **#8692 [Tracker]: Maintainer decision queue for RFCs** (15条评论)
    *   *链接*: https://github.com/zeroclaw-labs/zeroclaw/issues/8692
    *   *分析*: 维护者正在建立结构化的 RFC 决策队列，旨在减少非结构化讨论的噪音，提高决策透明度。
*   **#8586 [Refactor]: Centralize webhook channel message dispatch** (10条评论, **已关闭**)
    *   *链接*: https://github.com/zeroclaw-labs/zeroclaw/issues/8586
    *   *分析*: 统一 Webhook 网关分发逻辑，解决了以往各 Channel 各自为政导致的生命周期管理不一致问题。
*   **#6489 [Tracker]: Unified capability catalog** (9条评论)
    *   *链接*: https://github.com/zeroclaw-labs/zeroclaw/issues/6489
    *   *分析*: “Everything is a plugin” 愿景的核心追踪器，社区持续关注如何统一内置能力与 WASM 插件的视图。
*   **#10621 [PR] feat(runtime): coordinate agent lifecycle mutations**
    *   *链接*: https://github.com/zeroclaw-labs/zeroclaw/pull/10621
    *   *分析*: 大型 PR，旨在统一 Daemon RPC、Gateway 和 CLI 对 Agent 生命周期的配置变更，避免状态竞争。

## 5. Bug 与稳定性
今日报告了多个 P1/P2 级 Bug，部分已有 Fix PR 或处于 High Risk 状态：

*   **[P1] #11110: RPC workspace confinement retains a retargetable cwd symlink**
    *   *严重性*: **S0 - 数据丢失/安全风险**。Scoped RPC 会话可能通过重定向符号链接绕过沙箱。
    *   *状态*: Open, In-progress。
    *   *链接*: https://github.com/zeroclaw-labs/zeroclaw/issues/11110
*   **[P1] #11055: The daemon never registers the channel-map factory**
    *   *严重性*: S2 - 退化行为。Webhook、Cron 和 SOP 轮次因缺少 Channel 而无法工作。
    *   *链接*: https://github.com/zeroclaw-labs/zeroclaw/issues/11055
*   **[P2] #11059: WhatsApp Web ignores force_voice**
    *   *严重性*: S2。WhatsApp 渠道未遵循 `force_voice` 标记，导致语音消息路由失败。
    *   *链接*: https://github.com/zeroclaw-labs/zeroclaw/issues/11059
*   **[P2] #11108: Preserve browser and search tool semantics**
    *   *严重性*: S2。 legacy GLM 输入中的 `browser_open`/`web_search` 被错误映射到 `shell`，绕过了专用的浏览器/搜索工具。
    *   *链接*: https://github.com/zeroclaw-labs/zeroclaw/issues/11108
*   **[P2] #10513: RPC `sops.run` returns a run ID for a step nothing will execute**
    *   *严重性*: S2。手动启动 SOP 后返回了 ID，但实际无驱动 Sink，导致“僵尸”运行。
    *   *链接*: https://github.com/zeroclaw-labs/zeroclaw/issues/10513

## 6. 功能请求与路线图信号
*   **Cheaper Inference 集成**: #11103 请求添加 Cheaper Inference 作为 typed OpenAI-compatible provider。鉴于其作为快速低成本 LLM 网关的定位，符合项目对多样性provider的支持方向。
    *   *链接*: https://github.com/zeroclaw-labs/zeroclaw/issues/11103
*   **WhatsApp Markdown 渲染增强**: #11052 请求在 WhatsApp 中支持 thematic breaks 和 setext headings。这是对 #10475 早期实现的补充，旨在提升多模态渠道的格式一致性。
    *   *链接*: https://github.com/zeroclaw-labs/zeroclaw/issues/11052
*   **Runtime 公共组合边界完善**: #10993 和 #8850 持续推进将 Optional Channels/Tools 从编译期 Feature Flags 移至运行时 WASM 插件。这是实现“按需加载、减小二进制体积”路线图的关键步骤。
    *   #10993: https://github.com/zeroclaw-labs/zeroclaw/issues/10993
    *   #8850: https://github.com/zeroclaw-labs/zeroclaw/issues/8850

## 7. 用户反馈摘要
*   **痛点 - 消息状态黑盒**: 用户和开发者强烈关注出站消息是否真正送达（#10929, #11060）。Agent 无法区分“发送成功”与“实际送达”是导致用户信任危机的核心原因。
*   **痛点 - 工具调用语义丢失**: 当 Legacy 模型输入被映射到 Shell 而非专用 Browser/Search 工具时（#11108），用户体验下降且安全性降低。
*   **满意点 - 可移植性与bundle导出**: #9986 的 Agent 导出功能受到关注，解决了用户在不同环境间迁移 Agent 配置的痛点。
*   **关注点 - 沙箱逃逸风险**: #11110 暴露的 symlink 绕过的潜在风险引发了维护者对 Workspace Confinement 机制的重新审视。

## 8. 待处理积压
*   **#7108 [CI]: Improve cached Rust builds** (8条评论, P2)
    *   *链接*: https://github.com/zeroclaw-labs/zeroclaw/issues/7108
    *   *说明*: CI 构建缓存效率低下导致 PR 检查耗时 15-20 分钟，严重影响贡献者体验。需维护者优先关注。
*   **#8519 [Bug]: Reconcile cargo-audit ignores and remediate wasmtime-wasi CVEs** (7条评论, P1)
    *   *链接*: https://github.com/zeroclaw-labs/zeroclaw/issues/8519
    *   *说明*: 依赖审计忽略列表与实际依赖图存在漂移，Wasmtime-WASI CVE 亟待修复。
*   **#11093 [Bug]: Stable docs promotion leaves root llms files out of sync** (1条评论, P2)
    *   *链接*: https://github.com/zeroclaw-labs/zeroclaw/issues/11093
    *   *说明*: 文档发布流程中存在资产同步遗漏，需修复以确保文档一致性。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-09-26**  
**数据来源：GitHub (sipeed/picoclaw)**

---

## 1. 今日速览
过去24小时内，PicoClaw 社区保持中等活跃度，新增 2 个 Issues 和 4 个 PR，无代码合并操作，整体处于“评审与讨论”阶段。主要焦点集中在**OpenAI Responses API 的迁移**、**多提供商支持扩展**（Cheaper Inference）以及**配置兼容性问题**（飞书接入报错）。项目暂无新版本发布，维护者正在处理 CLA 合规性工具异常及多个长期积压的功能请求。

---

## 2. 版本发布
**无新版本发布。**

当前最新构建仍为 `picoclaw nightly-50-gbbf6893c`。建议关注即将合并的 `feat: Switch Openai to responses API` (#3381)，该功能可能构成下一版本的核心变更点。

---

## 3. 项目进展
**今日合并/关闭的重要 PR：0 条**

所有 4 个新 PR 均处于 **OPEN** 状态，尚未被合并：
- **#3381** 正在推进 OpenAI 客户端从 chat completions 迁移至 responses API，这是项目架构层面的一次重要现代化升级。
- **#3393** 尝试引入 Cheaper Inference 作为新 Provider，扩展了项目的生态兼容性。
- **#3368** 和 **#3222** 分别针对文档补充和 Deltachat 模块重构，目前仍在评审或 stale 状态。

**项目整体推进度评估：** 低。由于无合并操作，项目逻辑代码库今日未发生变化，主要依赖社区贡献进行功能迭代。

---

## 4. 社区热点
**今日讨论最活跃/受关注的内容：**

1.  **[BUG] 连接飞书报错 - 附解决方案** (#3355)
    *   **链接:** https://github.com/sipeed/picoclaw/issues/3355
    *   **热度分析:** 该 Issue 已关闭（stale），但涉及具体第三方服务（Feishu）的配置兼容性痛点。用户提供了明确的错误信息 `config.json contains unknown field(s): channel_list.feishu.app_id`，反映出用户对配置结构变更敏感，且希望获得官方对新版配置文件的适配指导。
2.  **[BUG] CLAassistant does not detect signature** (#3392)
    *   **链接:** https://github.com/sipeed/picoclaw/issues/3392
    *   **热度分析:** 直接关联到 PR #3381 的合并流程。如果 CLA 签名检测失败，将阻碍关键功能的合并。这反映了开源项目对贡献者许可协议合规性的严格把控，以及自动化 CI/CD 流程中的潜在工具故障。

---

## 5. Bug 与稳定性
**今日报告 Bug：**

| 优先级 | 问题描述 | Issue 链接 | 状态 | Fix PR? |
| :--- | :--- | :--- | :--- | :--- |
| 🔴 高 | **CLAassistant 无法检测签名**，导致 PR #3381 等贡献流程受阻 | [#3392](https://github.com/sipeed/picoclaw/issues/3392) | OPEN | 否（需运维修复） |
| 🟡 中 | **飞书 Channel 配置兼容性问题**，`app_id` 字段报错未知 | [#3355](https://github.com/sipeed/picoclaw/issues/3355) | CLOSED (Stale) | 否（可能为用户配置错误，非代码 Bug） |

**稳定性评估：** 无运行时崩溃报告。主要风险点在于 CI/CD 自动化流程（CLA 检测）失效，可能延缓新功能上线。

---

## 6. 功能请求与路线图信号
**潜在纳入下一版本的功能：**

1.  **OpenAI Responses API 支持** (#3381)
    *   **信号强度：** ⭐⭐⭐⭐⭐
    *   **分析：** 由核心贡献者 @XenonR 提出，旨在切换底层 API 实现。这是顺应 OpenAI 官方产品演进的必要更新，一旦 CLA 问题解决，极有可能成为下一个主要版本的核心特性。
2.  **Cheaper Inference Provider 支持** (#3393)
    *   **信号强度：** ⭐⭐⭐
    *   **分析：** 新增第三方 LLM 聚合网关支持，符合 PicoClaw 多模型兼容的定位，适合追求成本效益的用户群体。
3.  **Deltachat 模块重构与清理** (#3222)
    *   **信号强度：** ⭐⭐⭐
    *   **分析：** 减少 200+ 行代码，移除遗留功能，提升可维护性。虽标注为 stale，但属于积极的代码质量改进。

---

## 7. 用户反馈摘要
*   **配置痛点：** 用户在升级或配置新版 PicoClaw 时，对 `config.json` 字段变更（特别是 Feishu 渠道）感到困惑，期望更清晰的迁移指南或向后兼容的默认配置。
*   **接入友好性：** 用户希望减少第三方服务（如 Parallel Search、Deltachat）的接入门槛，通过提供 copy-paste 级别的示例配置来降低使用成本。
*   **成本控制：** 引入 "Cheaper Inference" 的 PR 表明，部分用户群体对推理成本敏感，倾向于使用价格更低的 LLM 网关服务。

---

## 8. 待处理积压
**需维护者关注的长期未响应 Issue/PR：**

1.  **[Refactor] Deltachat cleanup implementation** (#3222)
    *   **创建时间:** 2026-07-03
    *   **状态:** OPEN (stale)
    *   **风险:** 代码清理PR 长时间未合并，可能导致代码库债务持续累积。建议维护者确认是否继续推进或关闭。
    *   **链接:** https://github.com/sipeed/picoclaw/pull/3222

2.  **[Docs] Parallel Search MCP setup example** (#3368)
    *   **创建时间:** 2026-09-05
    *   **状态:** OPEN (stale)
    *   **风险:** 文档类 PR 虽然优先级较低，但 stale 状态可能让贡献者感到未被重视。
    *   **链接:** https://github.com/sipeed/picoclaw/pull/3368

3.  **[BUG] Feishu config error** (#3355)
    *   **创建时间:** 2026-09-01
    *   **状态:** CLOSED (stale)
    *   **建议:** 尽管已关闭，建议官方在文档中补充 Feishu 配置的最新规范，避免其他用户遭遇相同问题。
    *   **链接:** https://github.com/sipeed/picoclaw/issues/3355

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/qwenpaw">agentscope-ai/qwenpaw</a></summary>

# QwenPaw 项目动态日报
**日期：** 2026-09-26  
**数据源：** agentscope-ai/qwenpaw  
**分析时段：** 过去 24 小时

## 1. 今日速览
QwenPaw 今日呈现**高强度修复日**特征，13 个 PR 与 12 个 Issues 集中爆发，主要聚焦于控制台 UX 优化、底层工具安全性及多平台稳定性。贡献者 `@dawNotPoi` 单日提交 3 个关键修复，显示出社区对近期暴露的边界问题（如二进制文件扫描、Playwright 参数注入）的积极回应。尽管无新版本发布，但积压的 Bug 修复正在快速收敛，项目整体健康度良好，技术债务清理进度显著。

## 2. 版本发布
*   **无新版本发布。**

## 3. 项目进展
今日所有 13 个 PR 均处于 **Open/待合并** 状态，尚未完成合并，但内容高度关联且针对性强，预示下一版本可能包含以下重大更新：
*   **控制台体验重构：** PR #7989 针对 Markdown 表格滚动和自动限宽问题进行修复，直接响应 Issue #7924；PR #7357 新增工具调用可见性切换功能。
*   **搜索安全性加固：** PR #7988 修复 `grep_search` 未过滤二进制文件导致的状态污染问题，解决 Issue #7980 中的严重稳定性隐患。
*   **浏览器 SDK 灵活性：** PR #7987 允许用户通过配置忽略 Playwright 默认参数，解决 Issue #7984 中扩展加载失败的问题。
*   **多模态与国际化：** PR #7985 修复代码片段多语言复数形式显示错误；PR #7982 修复 Gemini 原生提供商的思考签名透传问题。
*   **性能与持久化：** PR #7923 引入 `tool_result` 块的年龄老化策略，优化长期运行的存储性能。

**整体推进评估：** 项目正从“功能扩张”转向“稳定性与体验精修”阶段，今日工作显著提升了框架在复杂生产环境下的鲁棒性。

## 4. 社区热点
以下是今日讨论最活跃或引发关注的问题：

*   **[Bug] Context compaction 超出预算导致失败**  
    *Issue #7628* | [链接](https://github.com/agentscope-ai/QwenPaw/issues/7628)  
    **热度分析：** 创建较早但于昨日更新，7 条评论显示开发者与用户正深入探讨上下文压缩触发逻辑与 Provider 请求预算之间的精确对齐问题，这是影响长对话稳定性的核心痛点。
*   **[Bug] grep_search 匹配内部历史文件导致状态污染**  
    *Issue #7980* | [链接](https://github.com/agentscope-ai/QwenPaw/issues/7980)  
    **热度分析：** 新用户发现的关键路径缺陷，指出工具链缺乏二进制过滤会导致不可恢复的死循环。已由 PR #7988 提供修复方案，社区关注度在于该漏洞的潜在破坏力。
*   **[Question] 压缩后前端历史无法全量加载**  
    *Issue #7884* | [链接](https://github.com/agentscope-ai/QwenPaw/issues/7884)  
    **热度分析：** 用户情绪较为激烈，质疑聊天记录 retention 策略，反映用户对数据持久性和可追溯性的高期望，与 PR #7542 (分页加载) 形成呼应。
*   **[Feature] 跨 Agent 侧边栏“最近会话”面板**  
    *Issue #7978* | [链接](https://github.com/agentscope-ai/QwenPaw/issues/7978)  
    **热度分析：** 多 Agent 协作场景下的典型需求，用户希望在一个视图监控和切换不同 Agent 会话，体现了项目向多智能体协同演进的用户期待。

## 5. Bug 与稳定性
今日报告多个中高风险 Bug，部分已有对应 Fix PR：

| 严重程度 | 问题描述 | Issue | 状态/Fix PR |
| :--- | :--- | :--- | :--- |
| **高** | `grep_search` 无二进制过滤，匹配 SQLite WAL 文件导致状态污染和死循环 | #7980 | 🟡 **已修 (PR #7988)** |
| **高** | QQ 网关重连后重放事件导致消息重复处理 | #7946 | 🟡 **已修 (PR #7983)** |
| **中** | Browser SDK 因 Playwright 注入 `--disable-extensions` 无法加载 Profile 扩展 | #7984 | 🟡 **已修 (PR #7987)** |
| **中** | 本地 llama.cpp 提供商被错误匹配云模型目录（32k 被视为 1M），导致压缩不触发 | #7979 | 🟡 **已修 (PR #7986)** |
| **中** | 控制台 Markdown 表格超宽、滚动条位置不佳，UX 严重受损 | #7924 | 🟡 **已修 (PR #7989)** |
| **中** | `chat_with_agent` 前台超时返回“用户中断”，掩盖真实超时原因 | #7981 | 🔴 待修 |
| **低** | 预制模型/频道缺少手动停用选项 | #7957 | 🔴 待修 |
| **低** | Aliyun Token Plan 模型缺少 `thinking_param_style` 声明，隐藏思考控件 | #7990 | 🔴 待修 |

## 6. 功能请求与路线图信号
*   **工具调用视觉降噪：** 用户希望在不关闭调试信息的情况下隐藏工具调用卡片，以改善长对话的可读性（Issue #7357 / PR #7357）。
*   **细粒度媒体能力控制：** 需要在 Provider 层面暴露图片、视频、音频的内联显示上限配置（PR #7959），反映用户对 API 成本和展示精度的双重关注。
*   **会话历史分页加载：** 解决上下文压缩后历史消息“消失”的感知问题，支持按需加载（PR #7542）。
*   **定时任务语义标准化：** 修复 Cron 表达式中 DOW（星期）字段的数字与名称映射混淆问题（PR #7825），提升自动化任务的可靠性。

## 7. 用户反馈摘要
*   **痛点：** 用户对**数据可见性**极其敏感。Issue #7884 和 #7924 均反映出当 UI 表现（历史不可见、表格溢出）不符合预期时，用户情绪较为激动，认为这是基础体验缺陷。
*   **场景：** 多 Agent 协作和本地模型部署是两大高频场景。Issue #7979 和 #7978 表明，使用本地 llama.cpp 进行混合部署以及管理多个 Agent 会话是当前进阶用户的典型需求，而现有的静态配置策略难以满足这些复杂场景。
*   **满意度：** 社区对 `@dawNotPoi` 等贡献者快速响应 Bug 表示认可，尤其是针对 `grep_search` 和 Browser SDK 的安全修复，被认为是对生产环境稳定性的重要补充。

## 8. 待处理积压
*   **PR #7628 (Context Compaction 预算对齐):** 该 Issue 自 9 月 8 日创建，9 月 25 日仍有活跃讨论，涉及核心上下文管理逻辑。建议维护者优先评估其修复方案，因它影响所有长对话场景的稳定性。
*   **PR #7948 (Web Console 设计缺陷):** 用户反馈控制台设计破坏用户输入，属于严重的 UI/UX 回归。需设计团队介入审查前端布局逻辑。
*   **PR #7990 (Thinking Model 配置缺失):** 随着大模型推理能力成为标配，模型目录的配置完整性直接影响用户体验。建议纳入下一个维护分支的 catalog 更新计划。

</details>

<details>
<summary><strong>hermes-agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# hermes-agent 项目动态日报
**日期：** 2026-09-26  
**数据来源：** GitHub Issues & PRs (过去24小时)

## 1. 今日速览
2026年9月26日，hermes-agent 项目保持极高活跃度，过去24小时内共产生 **500条 Issue 更新** 和 **500条 PR 更新**。虽然没有新版本发布，但维护团队正在进行大规模的 **P3 级修复冲刺（wave-10）**，集中解决桌面端（Desktop）与 CLI 的一致性问题。社区对 Windows 平台兼容性、网关稳定性以及内存管理机制的关注度显著上升，多个高优先级 Bug 在同一天内被识别并已有 PR 跟进，显示项目处于快速迭代与质量治理的关键阶段。

## 2. 版本发布
**无新版本发布。**

## 3. 项目进展
今日合并/关闭的关键 PR 主要集中在桌面端体验修复和插件系统完善：

*   **桌面端导航与生命周期修复** (`#122084` [CLOSED], `#122083` [OPEN])：
    *   修复了侧边栏导航中“首次接触引导未 staging”的问题，确保桌面端/TUI 用户也能看到正确的 onboarding 提示。
    *   解决了会话标签页标题在所有权变更后的同步问题，以及耗尽会话的重新记忆逻辑。
*   **目录扫描性能优化** (`#122900` [CLOSED])：
    *   修复了一个严重性能 Bug：当 `desktop.repo_scan_roots` 为空时，桌面应用启动时会意外扫描整个用户主目录，导致启动缓慢甚至触发 macOS TCC 保护警告。
*   **TUI 技能秘密提示路由** (`#121471` [CLOSED])：
    *   修复了技能（Skill）秘密提示（secret prompts）错误地路由到全局回调而非当前会话的问题，提升了多会话并发时的安全性。
*   **Slack 孤儿进程清理** (`#115038` [OPEN])：
    *   对 Slack Socket Mode 适配器进行了重构，确保孤儿 Handler 生成能被正确回收（reap），避免资源泄漏。

**整体评估：** 项目正从功能扩张转向稳定性治理，特别是针对 Electron 桌面端的 UI 一致性、性能瓶颈和跨平台兼容性进行了集中“清洗”。

## 4. 社区热点
今日讨论最活跃的 Issues/PRs 反映了用户对**计费透明度**、**Windows 兼容性**和**网关稳定性**的强烈诉求：

1.  **[Bug] 自动化 Nous 集成阻塞** (`#88584`) - *143 评论*
    *   **热度分析：** 尽管创建时间较早，但持续高评论量表明该阻塞性问题严重影响集成工作流。`cron/jobs.py` 中的冲突导致 dashboard updater 无法自动更新，用户急需明确的解决路径或手动合并指南。
2.  **[Bug] Kanban 任务行被静默破坏** (`#119003`) - *30 评论*
    *   **热度分析：** 这是一个严重的 P1 级数据完整性 Bug。在复合格式化网关（multiplexed gateway）下，真实的 kanban 任务行会被 `t_running` 占位符替换且无迹可寻。大量评论表明多个用户遭遇相同问题，急需底层修复。
3.  **[Bug] Nous Portal 订阅信用扣费异常** (`#110912` [CLOSED]) - *28 评论*
    *   **热度分析：** 用户报告在订阅信用有效期内，部分模型路由（glm/kimi）仍按全价计费。虽然 Issue 已关闭，但高关注度揭示了用户对**混合定价模型**（订阅+按需）透明度的担忧，可能影响付费转化率。
4.  **[PR] 对等会话消息功能** (`#106423` & `#123218`)
    *   **热度分析：** 灵感来源于 Meta 的 Muse Code，允许同一台机器上的不同 Hermes 会话之间发送警告或解锁消息。这标志着项目开始引入**跨会话协作**能力，拓展了 Agent 的工作流边界。

## 5. Bug 与稳定性
今日报告的 Bug 按严重程度排列如下：

| 等级 | Issue/PR | 简述 | 状态/Fix |
| :--- | :--- | :--- | :--- |
| **P1** | [#119003](https://github.com/NousResearch/hermes-agent/issues/119003) | Kanban 任务行在复合格式化网关下被静默破坏 | OPEN, 需紧急修复 |
| **P1** | [#122183](https://github.com/NousResearch/hermes-agent/issues/122183) | Windows PM 运行时网关崩溃 (`No module named 'pydantic_core'`) | OPEN, 同日有 PR `#122866` 针对 Windows 启动问题 |
| **P1** | [#122222](https://github.com/NousResearch/hermes-agent/issues/122222) | Cron 外部Worker无法导入依赖，所有定时任务失败 | OPEN, 自管理安装常见问题 |
| **P2** | [#122656](https://github.com/NousResearch/hermes-agent/issues/122656) | 桌面端陷入无限重启循环（no-op updater hand-off） | OPEN, 源头为 git checkout 安装 |
| **P2** | [#122239](https://github.com/NousResearch/hermes-agent/issues/122239) | Windows (cp936 locale) 执行 `hermes update` 抛出 UnicodeDecodeError | OPEN |
| **P3** | [#97065](https://github.com/NousResearch/hermes-agent/issues/97065) | Keet 网关设置崩溃 (`TypeError: _n() missing config`) | OPEN |

**稳定性总结：** 核心网关（Gateway）和会话状态（Session State）仍是 Bug 高发区。Windows 平台兼容性是今日最突出的痛点，至少两个 P1/P2 级 Windows 特定 Bug 浮出水面。

## 6. 功能请求与路线图信号
*   **对等会话消息 (Peer Session Messaging)** [`#106423`, `#123218`]：
    *   允许会话间通信，模拟 IDE 中的多标签页协作体验。这符合 hermes-agent 向“专业开发辅助工具”演进的路线，预计将在近期版本中作为实验性功能推出。
*   **秘密值注入插件 (Secret-Drop Plugin)** [`#123211`]：
    *   新增插件允许用户通过专用按钮安全地传递密码/token，而不经过聊天上下文。这响应了用户对**凭证安全**的需求，预计将被纳入核心插件目录。
*   **内存压力可视化与自动缩放** [`#5320`]：
    *   用户长期呼吁提高默认 `memory_char_limit` 并展示使用压力。虽然暂未合并，但持续的 👍 投票表明这是下一步配置优化的重点方向。
*   **Holographic Memory 查询修复** [`#123181`]：
    *   改进 `probe`/`related` 查询逻辑，从实体索引而非 HRR 解绑中获取答案，旨在提升长期记忆的检索准确率。

## 7. 用户反馈摘要
*   **痛点 - Windows 兼容性：** 多个用户抱怨 Windows 环境下的路径编码问题（`cp936`）和 Python 虚拟环境管理混乱（旧 venv 与新 PM 运行时冲突），导致更新和启动失败。
*   **痛点 - 桌面端体验不一致：** 用户指出桌面端 `/clear` 命令行为与 CLI 不一致，自定义皮肤（skins）在重启后丢失，以及侧边栏导航逻辑混乱。
*   **痛点 - 计费困惑：** 订阅用户发现某些模型路由未按预期享受折扣，导致账单激增，信任度受损。
*   **满意点 - 修复速度：** 社区对维护团队快速响应 P3 级问题并批量合并修复 PR（如 #121999, #122080 等）表示认可，认为项目正在变得更快、更稳定。
*   **满意点 - 新功能：** 对等消息和秘密值注入功能受到早期采用者的欢迎，认为增强了工作流的灵活性。

## 8. 待处理积压
*   **[Blocked] #88584 - Automated Nous integration is blocked**
    *   由于 `cron/jobs.py` 冲突，自动化集成流程停滞。需要核心维护者手动介入解决合并冲突，恢复 CI/CD 流水线。
*   **[Critical] #119003 - Kanban task row destruction**
    *   数据丢失 Bug，影响生产环境任务管理。建议优先分配资源复现并修复，目前尚无明确的 Fix PR。
*   **[长期未决] #5320 - Memory limit defaults**
    *   自 2026-04 以来持续存在，用户强烈要求调整默认内存限制。随着会话长度增加，此配置问题影响面日益扩大。

---
*报告生成时间：2026-09-26*  
*分析师：Agnes (Sapiens AI)*

</details>

<details>
<summary><strong>AstrBot</strong> — <a href="https://github.com/AstrBotDevs/AstrBot">AstrBotDevs/AstrBot</a></summary>

# AstrBot 项目日报 — 2026-09-26

## 1. 今日速览

AstrBot 今日开发活动高度活跃，24小时内收到17条PR更新（6个已合并/关闭）及7个Issue更新，整体贡献节奏健康。核心维护者 @Soulter 集中推进了桌面客户端体验优化与调试面板交互改进，同时 @Lesereingrape、@fzf404 等贡献者快速响应了多个稳定性与平台适配问题。未发现阻断性故障或大规模回归，项目处于稳健迭代状态。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日合并/关闭的关键PR包括：

- **[PR #10222](https://github.com/AstrBotDevs/AstrBot/pull/10222)** — 新增桌面端工作目录选择器功能，增强本地部署体验。
- **[PR #10220](https://github.com/AstrBotDevs/AstrBot/pull/10220)** & **[PR #10219](https://github.com/AstrBotDevs/AstrBot/pull/10219)** — ChatUI 历史记录加载时自动滚动与位置保留优化，改善多轮对话浏览体验。
- **[PR #10218](https://github.com/AstrBotDevs/AstrBot/pull/10218)** — 新增 `x-astrbot-conversation-id` 请求头透传，提升多会话追踪能力。

这些改动主要聚焦于**桌面客户端完善**与**WebUI交互打磨**，虽未引入新核心功能，但显著提升了本地部署用户的易用性，并为后续调试与监控奠定了基础。

---

## 4. 社区热点

### 高讨论度 Issue：

- **[Issue #9474](https://github.com/AstrBotDevs/AstrBot/issues/9474)** — WebChat 升级后超长会话（20,599条消息）在新UI对话记录中不可见，数据未丢失但UI层存在展示断层。8条评论，反映用户对历史数据连续性的强烈诉求。
- **[Issue #10195](https://github.com/AstrBotDevs/AstrBot/issues/10195)** — 历史消息回传时携带思维链、图片URL、工具调用原始数据导致token浪费与上下文稀释，提出精简过滤开关需求。@KardeniaPoyu 已提交对应PR #10224 部分响应此需求。

### 高热度 PR：

- **[PR #10201](https://github.com/AstrBotDevs/AstrBot/pull/10201)** — 跨核心、平台、Dashboard 的安全加固与运行时bug修复（35个commit），覆盖路径穿越等CWE-22风险，受安全关注度高。
- **[PR #9554](https://github.com/AstrBotDevs/AstrBot/pull/9554)** — 支持 OpenAI Responses Provider 原生工具（web_search、file_search、code_interpreter 等），为长期功能请求的里程碑式推进。

---

## 5. Bug 与稳定性

| Issue | 描述 | 严重程度 | Fix PR |
|-------|------|----------|--------|
| [#10232](https://github.com/AstrBotDevs/AstrBot/issues/10232) | Telegram 引用唤醒时 sender_id 类型不一致导致唤醒失效 | 中 | [PR #10233](https://github.com/AstrBotDevs/AstrBot/pull/10233) ✅ |
| [#10226](https://github.com/AstrBotDevs/AstrBot/issues/10226) | 关闭LLM后仍会回复，疑似回归 #9819 | 高 | 未明确 |
| [#10208](https://github.com/AstrBotDevs/AstrBot/issues/10208) | EstimateTokenCounter 低估 emoji 等非CJK字符token，压缩复检逻辑缺陷 | 高 | 未明确 |
| [#8003](https://github.com/AstrBotDevs/AstrBot/issues/8003) | 飞书预回复表情回复后未自动取消 | 低 | [PR #10223](https://github.com/AstrBotDevs/AstrBot/pull/10223) ✅ |

---

## 6. 功能请求与路线图信号

- **[Issue #10195](https://github.com/AstrBotDevs/AstrBot/issues/10195)** 提出的历史消息精简过滤需求，对应 [PR #10224](https://github.com/AstrBotDevs/AstrBot/pull/10224) 已部分实现（支持纯净版对话数据提取），预计纳入近期版本。
- **[Issue #10230](https://github.com/AstrBotDevs/AstrBot/issues/10230)** 请求 `tool_loop_agent` 透传 `extra_user_content_parts`，便于插件传递不应写入历史的临时内容，技术债务较轻，可能快速合并。
- **[PR #9554](https://github.com/AstrBotDevs/AstrBot/pull/9554)** 原生工具支持长期受关注，当前状态为开放，需进一步测试验证后合入主分支。

---

## 7. 用户反馈摘要

- **历史数据连续性焦虑**：升级后对话记录丢失（#9474）引发用户对数据安全性的担忧，尽管底层数据完整，但UI层断层需尽快修复。
- **Token 效率敏感**：多轮对话中历史上下文膨胀导致成本上升与模型注意力分散（#10195），用户强烈期望提供可配置的过滤机制。
- **平台适配细节体验**：飞书预表情、Telegram 引用唤醒等问题影响日常使用流畅度，用户对平台一致性要求较高。
- **桌面端体验提升**：macOS 原生窗口装饰（#10227）与工作目录选择器（#10222）获积极反馈，表明本地部署用户重视客户端质感。

---

## 8. 待处理积压

- **[Issue #10226](https://github.com/AstrBotDevs/AstrBot/issues/10226)** — LLM 关闭后仍回复的回归问题，关联历史修复 #9819，需优先排查是否因配置解析或状态机逻辑变更导致。
- **[Issue #10208](https://github.com/AstrBotDevs/AstrBot/issues/10208)** — Token 估算器低估非CJK字符，且压缩复检逻辑缺陷，影响大模型上下文管理稳定性，需底层算法修正。
- **[PR #9554](https://github.com/AstrBotDevs/AstrBot/pull/9554)** — OpenAI Responses 原生工具支持长期未合并，作为重要功能增强，建议安排测试资源推进。

---

**项目健康度评估**：⭐⭐⭐⭐☆  
活跃度良好，安全与稳定性修复及时，但存在两个高频 Token/LLM 控制相关 Bug 待解决，建议优先处理以降低用户投诉风险。

</details>

<details>
<summary><strong>DeepSeek Harness</strong> — <a href="https://github.com/deepseek-ai/deepseek-harness">deepseek-ai/deepseek-harness</a></summary>

# DeepSeek Harness 项目动态日报
**日期：2026-09-26**

## 1. 今日速览
过去24小时内，DeepSeek Harness Discussions 板块活跃度极高，共产生 **173 条**更新，显示社区正处于版本迭代（0.1.7-rc.2）后的密集验证期。今日无新 Release 发布，但社区在 Bug 修复、配置迁移竞态问题及 Windows 沙箱权限问题上贡献了深入的根因分析与补丁。整体项目状态：**高活跃、高反馈密度、技术深度强**，用户不仅是上报问题，更积极参与定位与修复建议。

## 2. 版本发布
*   **当前状态**：无新版本发布。
*   **参考版本**：`0.1.7-rc.2`（截至今日仍为最新稳定可测版本，详见讨论 #7504, #7814）。

## 3. 项目进展
由于该项目未启用标准 PR 流程，代码合并通过 Releases 落地。今日无新合并公告，但社区贡献者已提供可落地的修复方案，主要集中在以下领域：
*   **启动竞态修复**：针对 `settings.yaml` 迁移导致的配置丢失问题，社区提供了根因分析（#7814），指出在 loader context 非活跃时重命名配置文件导致的静默失败。
*   **遥测数据优化**：针对大会话导致请求体溢出（200MB+）的问题，社区确认了 `dsh_session_log` 字段为罪魁祸首（#7699），需官方从内存占用和传输体积两方面进行优化。
*   **历史加载性能**：长期存在的冷启动历史加载卡死 Web 服务器问题持续受到关注（#4416, #7802），社区正在探索非阻塞 socket 处理方案。

## 4. 社区热点
以下是今日评论数最多、关注度最高的讨论：

1.  **[OpenCode Go] 强制要求 x-opencode-session 头部** (38 条评论)
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/5495
    *   **摘要**: OpenCode Go API 方表示 25k 用户组织依赖此 Header 进行路由和优化，自 09/05 起未携带该 Header 的请求将报错。这是与上游基础设施兼容性相关的紧急适配需求。
2.  **[Bug] 遥测日志撑爆请求体至 205MB 导致永久死锁** (9 条评论)
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/7699
    *   **摘要**: 实测发现真实对话仅 0.58MB，但遥测字段 `dsh_session_log` 占用了 205MB，触发水位线机制后形成永久自锁。这是影响生产环境稳定性的严重隐患。
3.  **[Bug] 加载历史偶发永久卡住（Root Cause & Patch）** (8 条评论)
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/7802
    *   **摘要**: 作者修正了之前的归因，确认根因在于 Remote stream socket 的 waiter 永不 settle，并已提供社区补丁。
4.  **[Bug] RTL 混合文本渲染损坏** (8 条评论)
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/696
    *   **摘要**: 英文开头、阿拉伯文随后的句子被错误识别为 LTR，导致阿拉伯语序错乱，影响多语言用户体验。
5.  **[Bug] Agent 沙箱无法建立 TLS/HTTPS 连接** (7 条评论)
    *   **链接**: https://github.com/deepseek-ai/deepseek-harness/discussions/986
    *   **摘要**: Windows Web 环境中，Agent 沙箱的 `pwsh` 命令因 `SEC_E_NO_CREDENTIALS` 无法完成 HTTPS 握手，直接阻断现代 API 调用。

## 5. Bug 与稳定性
今日报告的问题多集中在 Windows 平台及配置管理层面，严重程度较高：

| 严重级别 | 问题描述 | 讨论链接 | 状态 |
| :--- | :--- | :--- | :--- |
| **Critical** | 遥测日志导致请求体超限，会话永久死锁 | [#7699](https://github.com/deepseek-ai/deepseek-harness/discussions/7699) | 根因已定位，待官方修复 |
| **High** | Agent 沙箱 TLS/HTTPS 连接失败 (SEC_E_NO_CREDENTIALS) | [#986](https://github.com/deepseek-ai/deepseek-harness/discussions/986) | 需官方排查 Windows 凭证配置 |
| **High** | workspace-write 模式下，DACL 缺少 WRITE_OWNER 导致 Win32 错误 | [#7504](https://github.com/deepseek-ai/deepseek-harness/discussions/7504) | 根因已明确，需政策决策 |
| **Medium** | settings.yaml 启动竞态导致配置静默丢失 | [#7814](https://github.com/deepseek-ai/deepseek-harness/discussions/7814) | 已有社区修复建议 |
| **Medium** | Windows 盘符大小写导致设置被静默回退 | [#7675](https://github.com/deepseek-ai/deepseek-harness/discussions/7675) | 模块实例加载路径问题 |
| **Medium** | Edge 129 下文件预览显示"服务不可用" | [#6437](https://github.com/deepseek-ai/deepseek-harness/discussions/6437) | 上游浏览器兼容性适配问题 |

## 6. 功能请求与路线图信号
*   **官方桌面客户端**：用户持续呼吁推出官方桌面版客户端（#7667, 5条评论），显示出对脱离浏览器环境依赖的强烈需求。
*   **Compaction 逻辑优化**：用户指出 Compaction 请求丢失 Provider Prefix Cache，且 Summarizer 未继承 `reasoningEffort`（#1944, 7条评论），这暗示了后台摘要生成机制的改进空间。
*   **构建工具链规范**：`pnpm run clean` 在干净检出下失败，暴露出 TypeScript outDir 配置与脚本预期不符（#7760, 4条评论），建议纳入开发体验优化路线图。

## 7. 用户反馈摘要
*   **痛点**：Windows 环境下的权限管理（ACL、盘符大小写、TLS 凭据）是今日反馈最集中的区域，用户反映配置改动会被“静默回退”或“永久卡住”，严重影响信任度。
*   **满意度**：社区互助氛围良好，多位资深用户（如 @CNyaotian-Lunar, @sheldonslin）主动提供详细的根因分析和代码级补丁，降低了官方调试门槛。
*   **场景**：高并发 API 调用（OpenCode Go）、大规模历史会话加载、远程文件预览是高频使用场景，也是 Bug 高发区。

## 8. 待处理积压
*   **[Feature] Large Cold History Session Stall** (#4416): 该讨论已标记为 "FINAL"，包含系统的根因分析和优化路线图，是一个高质量的架构改进提案，建议官方优先审阅。
*   **[Bug] Agent 沙箱 TLS 连接** (#986): 这是一个阻断性 Bug，导致现代 Web 应用无法正常访问，需尽快响应。
*   **[Policy] workspace-write DACL 权限** (#7504): 涉及安全策略与用户体验的权衡，官方需明确政策决策并反馈。

</details>

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*