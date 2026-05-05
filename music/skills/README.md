# 推荐Skills与AI Music工作流

## 推荐Skill分类

### 一、ClawHub Skills（推荐优先使用）

| Skill | 用途 | 适合人群 | 说明 |
|-------|------|---------|------|
| `clawhub/gen-music` | 歌曲生成 | 所有用户 | ACE-Step 兼容 API，直接生成完整歌曲 |
| `clawhub/ace-step-music` | 本地生成 | Mac 用户 | Apple Silicon 本地运行，无需网络 |
| `clawhub/ai-music-generation` | DiffRhythm 生成 | 技术用户 | 含腾讯 Song Generation 双引擎 |
| `wells1137/music-generator` | 结构化作曲 | 创作者 | 先做作曲计划再生成音频 |
| `xiyunnet/ace-suno-v5` | Suno V5 UI | Suno 用户 | 本地 Web UI 控制 Suno V5 |
| `dongjiangliu9-tech/melodylab-ai-song` | AI 歌曲 | 快速体验 | ZeeLin Music AI 集成 |

### 二、GitHub 开源项目（本地部署）

#### 必装项目（按优先级排序）

| 项目 | 显存需求 | 特色 | 一句话说明 |
|------|---------|------|-----------|
| **DiffRhythm** | 8GB | 10秒生成4分45秒 | 国内团队，中文支持最好，Apache-2.0 |
| **ACE-Step 1.5** | <4GB | 50+语言，4-8步生成 | 消费级显卡可用，MIT 协议 |
| **MusicGen/AudioCraft** | 2-16GB | 参考音频支持 | Meta 出品，学术研究级 |
| **YuE** | 8GB+ | 全曲生成 | 万星项目，效果出色 |
| **Amphion** | 8GB+ | 综合工具包 | OpenMMLab 出品，功能全面 |

#### 辅助项目

| 项目 | 用途 |
|------|------|
| **Magenta** | 音乐理解与生成工具包（Google） |
| **Riffusion** | 实时音乐生成，低资源消耗 |
| **Bark** | 高质量语音/歌声合成 |
| **Tortoise TTS** | 语音克隆，可做个性化人声 |
| **DDSP** | 音色合成与转换 |

### 三、在线平台

| 平台 | 免费额度 | 最佳场景 |
|------|---------|---------|
| **Suno** | 50积分/天 | 最易上手，完整歌曲 |
| **Udio** | 10首/天 | 音质最好，人声自然 |
| **网易天音** | 免费 | 国内零门槛，中文优化 |
| **AIVA** | 有限免费 | 纯音乐/配乐，MIDI导出 |

## 工作流组合建议

### 工作流A：零成本入门

```
Suno/Udio 免费生成 → BandLab 在线混音 → 直接分享
```

### 工作流B：国内用户推荐

```
ACE-Step 本地生成 → 网易天音辅助 → 汽水音乐发布
```

### 工作流C：专业制作

```
Moises 拆解参考曲 → Suno/Udio 生成 → BandLab 编排 → LANDR 母带 → DistroKid 发行
```

### 工作流D：全开源本地

```
DiffRhythm 生成 → ACE-Step 人声 → Audacity 后期 → 自行发行
```

## Skill 安装方式

```bash
# ClawHub Skill 安装（以 gen-music 为例）
claw install clawhub/gen-music

# GitHub 项目克隆
git clone https://github.com/ASLP-lab/DiffRhythm.git
git clone https://github.com/ace-step/ACE-Step-1.5.git

# Python CLI 工具（已包含30个AI Music项目管理）
# 见 skills-pool/music/phase1-快速验证/skill-collector-task3/ai_music_cli.py
```

## 相关资源

- 完整30个AI Music项目列表：`/Users/patrick/innate/fire-skills/skills-pool/music/phase1-快速验证/skill-collector-task3/`
- Skills JSON 数据：`ai-music-skills.json`
- CLI 工具：`ai_music_cli.py`（Python）/ `main.go`（Go）
