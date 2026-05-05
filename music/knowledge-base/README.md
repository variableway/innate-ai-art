# OpenClaw AI Music 知识库搭建指南

## 概述

基于 OpenClaw/ClawHub 生态，搭建一个 AI Music 专属知识库，让 AI Agent 能根据用户需求自动推荐工具、生成 Prompt、提供创作指导。

## 知识库架构

```
knowledge-base/
├── SKILL.md              # Skill 定义文件（OpenClaw 加载入口）
├── core/                 # 核心知识
│   ├── terminology.md    # 音乐术语知识
│   ├── tools.md          # 工具对比与推荐
│   ├── prompt-patterns.md # Prompt 模式库
│   └── workflow.md       # 标准工作流
├── templates/            # 可复用模板
│   ├── suno-templates.md
│   ├── udio-templates.md
│   └── structure-templates.md
├── legal/                # 法律知识
│   ├── copyright.md      # 版权政策
│   └── distribution.md   # 发行规则
└── references/           # 参考资料
    ├── bpm-genre-map.md
    └── chord-progressions.md
```

## 搭建步骤

### Step 1：安装 OpenClaw 和 ClawHub CLI

```bash
# 安装 OpenClaw
curl -fsSL https://openclaw.ai/install.sh | bash

# 验证安装
openclaw --version

# 安装 ClawHub CLI（Skill 管理工具）
# 参考：https://docs.openclaw.ai/tools/clawhub
```

### Step 2：创建 AI Music Skill

创建一个 `ai-music-guide` Skill，包含完整的教程知识：

```yaml
# skills/ai-music-guide/SKILL.md
---
name: ai-music-guide
description: AI Music 创作指南 — 从零基础到出品。提供术语解释、工具推荐、Prompt 模板、工作流指导。
metadata:
  author: innate-ai-art
  version: 1.0.0
  tags: [music, ai, prompt-engineering, tutorial]
---

## 触发条件
当用户询问以下话题时激活：
- AI 音乐创作
- Suno/Udio Prompt 写法
- 音乐术语（BPM, Key, Chord Progression）
- AI 音乐工具推荐
- 歌词创作
- AI 音乐版权

## 知识来源
本 Skill 基于以下资料构建：
- music/guide/ 目录下的9章教程
- music/research/ 目录下的12维度研究
- music/prompt-templates/ 目录下的模板库
```

### Step 3：使用 Knowledge Base Collector Skill

ClawHub 提供了 `knowledge-base-collector` Skill，可以从 URL 和截图收集知识：

```bash
# 安装知识库收集器
claw install clawhub/reed1898/knowledge-base-collector

# 收集 AI Music 相关网页
# 当用户说 "save this URL" 或 "保存链接" 时自动触发
```

参考：[Knowledge Base Collector](https://clawhub.ai/reed1898/knowledge-base-collector)

### Step 4：安装推荐的音乐相关 Skills

```bash
# 音乐生成核心 Skill
claw install clawhub/gen-music              # ACE-Step API 生成
claw install clawhub/ace-step-music         # Apple Silicon 本地
claw install clawhub/ai-music-generation    # DiffRhythm 双引擎

# 辅助 Skill
claw install wells1137/music-generator      # 结构化作曲
claw install xiyunnet/ace-suno-v5           # Suno V5 Web UI
```

### Step 5：构建本地知识库文件

将 `music/guide/` 和 `music/research/` 的内容转化为 SKILL.md 格式的知识文件：

**每个知识文件格式：**

```markdown
---
name: music-terminology
description: 音乐核心术语速查，15个AI创作必知词汇
metadata:
  category: core
  priority: high
---

（内容来自 guide/01-核心术语速查.md）
```

### Step 6：配置 Agent 使用知识库

在 OpenClaw 的 `AGENTS.md` 中配置 Agent 使用知识库：

```yaml
# AGENTS.md
skills:
  - ai-music-guide
  - gen-music
  - knowledge-base-collector

knowledge_paths:
  - ./knowledge-base/core/
  - ./knowledge-base/templates/
  - ./knowledge-base/legal/
```

## 知识库内容来源

| 内容 | 来源文件 | 转化目标 |
|------|---------|---------|
| 核心术语 | `guide/01-核心术语速查.md` | `core/terminology.md` |
| 工具推荐 | `guide/03-工具推荐Top20.md` | `core/tools.md` |
| Prompt 模式 | `guide/04-找歌拆解写Prompt.md` | `core/prompt-patterns.md` |
| 工作流 | `guide/02-五步创作法.md` + `guide/08-进阶工作流.md` | `core/workflow.md` |
| Prompt 模板 | `prompt-templates/README.md` | `templates/` |
| 版权法律 | `guide/07-版权商用发行.md` | `legal/copyright.md` |
| BPM/风格对照 | `assets/bpm_genre_chart.png` + 研究数据 | `references/bpm-genre-map.md` |
| 和弦进行 | `guide/01-核心术语速查.md` 和弦部分 | `references/chord-progressions.md` |
| 12维研究 | `research/dim01-12.md` | 可选，深度参考 |

## 参考资源

- [OpenClaw 官方文档](https://docs.openclaw.ai/tools/skills) — Skill 创建与配置
- [ClawHub Skills 市场](https://clawhub.ai/skills) — 3000+ 已有 Skill
- [OpenClaw Music Generation](https://docs.openclaw.ai/tools/music-generation) — 官方音乐生成工具
- [ClawHub CLI 文档](https://github.com/openclaw/clawhub/blob/main/docs/cli.md) — Skill 安装与管理
- [OpenClaw 26 Tools + 53 Skills 指南](https://yu-wenhao.com/en/blog/openclaw-tools-skills-tutorial/) — 完整工具与 Skill 解析
- [Awesome OpenClaw Skills](https://github.com/VoltAgent/awesome-openclaw-skills) — 5400+ 社区 Skill 合集
- [如何构建自定义 Skill](https://lumadock.com/tutorials/build-custom-openclaw-skills) — SKILL.md 编写教程
