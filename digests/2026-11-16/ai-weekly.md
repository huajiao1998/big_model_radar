# AI 工具生态周报 2026-W47

> 覆盖日期: 2026-11-10 ~ 2026-11-16 | 生成时间: 2026-11-16 07:35 UTC

---

# 《AI 工具生态周报》2026-W47（11.10–11.16）

> **数据边界**：本期综合回顾以提供的 7 天 OpenClaw 生态日报为唯一信源；日报覆盖 7 个项目，但明细以 OpenClaw 为主，其他项目仅有覆盖名单。HN、Anthropic/OpenAI 官方公告、GitHub Trending 原始榜单未提供，相关部分仅做边界标注与可观测侧写，不作臆测。

## 1. 本周要闻

1. **11-11｜OpenClaw 发布 v2026.11.3 stable**：私有子代理完成内容不再混入流式聊天回复，降低私密中间产物泄露风险；父代理取消子任务后可交接给替代任务，避免悬挂。同日发布 v2026.9.37 gateway-only 退役维护线，不建议作为升级目标。
2. **11-12｜OpenClaw 发布 v2026.11.5-beta.2**：长对话支持双向分页历史、可见历史边界与有界归档读取；macOS 端保留已保存密钥。社区焦点转向 Gateway 插件捕获阻塞/内存膨胀、Windows 服务可靠性、claude-cli 会话丢失。
3. **11-15｜OpenClaw 发布 v2026.11.5-beta.3**：聚焦大会话可靠性，降低 transcript indexing / trimming / compaction 内存压力，仅流式加载选定 hydration payload，并遵守可配置 summary limits。
4. **11-10 至 11-16｜#193962 P0 升级路径问题闭环**：SQLite header-probe 超时导致从 2026.10.10 升级受阻的问题在本周被追踪并关闭；同期 #167506 临时交接数据库删除后阻塞恢复、#172628 网关准入被 superseded 等恢复链路问题也得到清理。
5. **11-16｜安全权限边界修复**：#199863（P1，security-sensitive）修复未设置 `gateway.roles.default` 时 message action 可绕过 OpenClaw ID 成员限制创建会话的问题。
6. **11-13/14｜稳定性讨论高热**：WAL auto-checkpoint #164294（40 评论）、Windows 可靠性 #170956（32 评论）、持久化阻塞事件循环 #119720（26 评论）成为本周社区焦点，指向“可运维性 + 规模化稳定性”。
7. **11-15/16｜子代理连续性成为主线**：#172837“Codex nativeSubagentAssignments 完成后未移除”关闭；#199868 推进“已完成子代理结果在 Gateway 重启后保留与补偿投递”；#199873 修复大库 transcript facts backfill 每次重启从头重放导致 Gateway 数小时繁忙。
8. **11-13｜memory-core 收尾与 CI/发布工程强化**：memory-core dreaming/index 发布相关 ranker-applier 不一致、锁争用问题进入收尾；CI 缓存卫生、测试夹具、发布预检死锁等工程健康问题持续修复。

## 2. CLI 工具进展

本周可确认的 CLI 动态主要来自 OpenClaw 对 Claude/Codex 等后端的兼容与可靠性修复，而非各 CLI 官方独立发布：

| 方向 | 本周动态 |
|---|---|
| Claude 系 CLI 后端 | claude-cli 后端会话丢失被列为 11-12 稳定性主线之一；11-13 仍有关联 P1 回归处于 OPEN。 |
| Codex | #194664“Codex 受保护续接阻塞后续对话”在 11-12 持续升温；11-15 #172837“Codex nativeSubagentAssignments 完成后未移除”关闭；Codex/subagent 连续性成为社区讨论热点。 |
| Gemini CLI | 本期日报未提供 Gemini CLI 项目级数据，无新增可确认动态。 |
| 通用 CLI 可靠性 | 11-15 #199307 修复 CLI 在 Ctrl+C 后仍落地的 gateway call reads；11-16 backup CLI `--json` 失败输出保留可执行补救提示；CI 基准测试非法/重复参数不再被静默接受。 |

**整体判断**：CLI 工具本周的竞争点从“增加功能”转向**会话生命周期、中断恢复、子代理交接、错误可诊断性**。Claude/Codex 相关问题的社区感知较强，Gemini CLI 本期数据缺失。

## 3. AI Agent 生态

OpenClaw 仍是本周生态绝对主线，呈现“高吞吐 + 高积压 + 发布前收敛”状态：

- **版本节奏**：11-11 v2026.11.3 stable；11-12 v2026.11.5-beta.2；11-15 v2026.11.5-beta.3。11-10、11-13、11-14、11-16 无新版本发布，变更持续堆积等待发布窗口。
- **吞吐与积压**：PR 每日更新基本顶在 500 条；11-10 待合并 349、11-11 待合并 346、11-12 待合并 316、11-15 待合并 349、11-16 待合并 320。维护者评审是主要瓶颈，多条高评论 Issue 带有 `no-new-fix-pr` 与 `needs-maintainer-review`。
- **稳定性风险**：本周集中出现 Gateway 插件加载阻塞、Windows 服务生命周期、事件循环阻塞与内存增长、SQLite/WAL、子代理/消息投递丢失、托管更新卡死等 P0/P1。11-16 仍有 4 个 OPEN P0 带 `ux-release-blocker`/`crash-loop` 标签。
- **功能与生态推进**：MCP Events 输入校验、A2A 单向 dispatch handoff、after_tool_call 结构化 ToolResult、Template/ClawHub 发布修复、托管目录价格计费、WhatsApp 群元数据缓存时钟回拨修复等。
- **同赛道项目**：Zeroclaw、PicoClaw、QwenPaw、hermes-agent、AstrBot、DeepSeek Harness 本周仅作为覆盖项目出现，日报未提供项目级明细，故不做横向排名或进展断言。

**判断**：Agent 框架的竞争焦点正从“能力展示”转向**运行时可靠性、会话状态一致性、插件/MCP 集成、跨平台部署与重启恢复**。

## 4. 开源趋势

> GitHub Trending 原始榜单本期未提供，以下为从项目动态反推的技术方向，不等同于 Trending 排名。

1. **长上下文/大会话工程化**：transcript indexing、trimming、compaction 内存压力、hydration 流式加载、summary limits、分页历史与归档读取成为高频修复点。
2. **Agent 运行时稳定性**：Gateway 事件循环阻塞、插件加载、SQLite/WAL、Windows 服务生命周期、重启恢复、backfill 重放导致 RPC 超时。
3. **多代理/子代理连续性**：nativeSubagentAssignments 清理、A2A handoff、已完成子代理结果重启后保留与补偿投递、人工步骤交接。
4. **安全与权限边界**：OpenClaw ID 成员限制绕过、`plugins.allow` 误报、security-sensitive PR 评审。
5. **成本与计费可观测**：prompt-cache 成本讨论、托管目录价格优先计费、usage 计费偏差修复。
6. **发布与 CI 工程**：npm 发布预检死锁、WAL 提交发布验证、CI 缓存/夹具、非法参数不静默、未使用导出导致依赖检查失败。

## 5. HN 社区热议

本期输入未包含 Hacker News 帖子与评论数据，无法生成可靠的热议榜单或情绪量化。从 OpenClaw 社区讨论可侧见开发者情绪：

- 对 **Windows 可靠性、Gateway 阻塞/内存膨胀、更新卡死、会话丢失** 容忍度低，相关 Issue 评论数高。
- 对 **prompt-cache 成本** 与计费准确性敏感。
- 对 **维护者评审瓶颈** 有积压感：高评论 Issue 同时带 `no-new-fix-pr` 与 `needs-maintainer-review`，说明“讨论充分但缺修复 PR/裁决”。
- 对 **beta 版本的大会话内存改进** 有明确期待，但 beta 仍不建议生产直接升级。

> 建议下期补充 HN 抓取后，再与 GitHub 社区情绪做交叉验证。

## 6. 官方动态

本期日报未覆盖 Anthropic 与 OpenAI 官方发布，未发现可确认的新版本、公告或 API 变更。可确认的仅有生态项目对 **Claude-CLI 后端会话丢失**、**Codex 受保护续接/子代理连续性** 的社区侧兼容与修复动态，不等同于官方公告。

> 官方动态部分本期无新增可确认信息；下期需补充官方博客、Release Notes 与 API Changelog。

## 7. 下周信号

1. **OpenClaw v2026.11.5 正式版窗口**：beta.2/beta.3 后可能收敛正式版，重点关注 #197083 WAL 提交发布验证、P1 回归修复、大会话内存改进是否进入 stable。
2. **4 个 OPEN P0 是否阻断发布**：Gateway 插件加载阻塞与 Windows 服务生命周期是最高风险项；若未收敛，正式版可能延迟或带已知问题发布。
3. **子代理连续性 PR 落地**：#199868 重启后保留与补偿投递、#199873 backfill 重放修复、#199706 Git checkout 安装更新，是否合并将影响 Gateway 长稳表现。
4. **安全修复后续**：#199863 权限边界修复是否触发安全评审、补丁版本或额外加固。
5. **维护者评审瓶颈**：高评论 Issue 的 `no-new-fix-pr`/`needs-maintainer-review` 积压可能继续扩大，关注维护者分流、产品决策与 PR 合并率。
6. **CLI/Agent 后端风险**：claude-cli 会话丢失、Codex 受保护续接、Windows 更新可靠性仍是用户感知最强的风险点。
7. **数据补充建议**：下期补齐 HN、Anthropic/OpenAI 官方动态、GitHub Trending 及其他 6 个生态项目的项目级明细，以形成真正的跨项目横向周报。

---
*本日报由 [Big Model Radar](https://github.com/huajiao1998/big_model_radar) 自动生成。*