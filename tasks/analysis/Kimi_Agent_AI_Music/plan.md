# 音乐小白AI创作路径 — 执行计划

## 目标
产出一份严密、可操作的报告：《音乐小白AI创作完全指南：从零到出品》，涵盖：
1. 必须掌握的核心知识（术语、理论）
2. 可执行的5步创作路径
3. Top 20 工具/平台/开源skill推荐（含官网、价格、适用场景）
4. 配套Prompt模板库
5. 进阶迭代方法论

## 阶段设计

### Stage 1 — 深度研究（Deep Research Swarm）
**加载技能**: `deep-research-swarm`
**任务**: 
- 研究当前AI音乐生成领域全貌（2024-2026）
- 调研主流平台：Suno、Udio、Tunee、AIVA、Soundraw等的功能、定价、特色
- 调研开源工具：MusicGPT、Riffusion、Stable Audio、AudioLDM等
- 调研辅助工具：和弦分析、分轨、BPM检测、Key检测
- 调研学习资源：YouTube频道、博客、Reddit社区
- 调研Prompt工程最佳实践
- 调研版权/商用政策
**输出**: 结构化研究简报（research_brief.md）

### Stage 2 — 报告撰写（Report Writing）
**加载技能**: `report-writing`
**输入**: Stage 1 研究简报 + 用户提供的框架
**任务**: 
- 按用户提供的5步路径框架扩写
- 整合Top 20工具推荐表格
- 撰写可操作的Prompt模板
- 撰写迭代优化方法论
- 输出完整Markdown报告
**输出**: final_report.md

### Stage 3 — 格式转换（Artifact）
**加载技能**: `docx`
**输入**: Stage 2 最终报告
**任务**: 转换为 .docx 文档
**输出**: music_ai_guide.docx

## 质量标准
- 每个推荐工具必须包含：名称、官网、类型、价格、适用场景、一句话评价
- 每个步骤必须有具体操作指令
- Prompt模板必须可直接复制使用
- 报告必须≥8000字
- 所有外部数据必须标注来源和时间
