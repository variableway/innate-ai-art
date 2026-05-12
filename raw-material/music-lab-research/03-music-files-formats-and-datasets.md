# 03 — 音频格式、数据集与预处理流水线

> AI 音乐生成全链路中的数据层：文件格式选择、训练数据集、音频编码、标注策略与存储组织。

---

## 目录

1. [音频格式选型](#1-音频格式选型)
2. [符号音乐格式](#2-符号音乐格式)
3. [训练数据集](#3-训练数据集)
4. [预处理流水线](#4-预处理流水线)
5. [标注与元数据](#5-标注与元数据)
6. [存储与组织](#6-存储与组织)

---

## 1. 音频格式选型

### 1.1 格式对比总表

| 格式 | 类型 | 采样率 | 位深 | 压缩 | 文件大小 (1分钟立体声) | AI 用途 |
|------|------|--------|------|------|---------------------|---------|
| **WAV** | 无损原始 | 可变 (通常 44.1/48 kHz) | 16/24/32-bit float | 无 | ~10 MB (16-bit/44.1kHz) | 模型输入/输出首选 |
| **FLAC** | 无损压缩 | 可变 | 16/24-bit | ~50-70% | ~5-7 MB | 归档存储首选 |
| **AIFF** | 无损原始 | 可变 | 16/24-bit | 无 | ~10 MB | Logic Pro / macOS 生态 |
| **MP3** | 有损压缩 | 可变 | N/A | ~90% | ~1 MB | 最终分发，不适合训练 |
| **OGG Vorbis** | 有损压缩 | 可变 | N/A | ~85% | ~1.5 MB | 游戏/Web 音频 |
| **AAC (m4a)** | 有损压缩 | 可变 | N/A | ~88% | ~1.2 MB | Apple 生态，流媒体 |

### 1.2 各环节推荐格式

```
采集/录音 → WAV 48kHz/24-bit
   ↓
模型输入  → WAV 32kHz/16-bit (MusicGen) 或 44.1kHz/16-bit (ACE-Step)
   ↓         WAV 48kHz/32-bit float (Stable Audio)
模型输出  → WAV (原始) → FLAC (归档)
   ↓
后期处理  → WAV 48kHz/32-bit float (混音/母带)
   ↓
最终分发  → FLAC (无损发行) / MP3 320kbps (流媒体) / AAC (Apple)
```

### 1.3 采样率选择指南

| 采样率 | 用途 | 模型兼容性 |
|--------|------|-----------|
| **16 kHz** | 语音模型 (TTS, RVC) | GPT-SoVITS, OpenVoice |
| **22.05 kHz** | 部分旧模型 | 早期 AudioLDM |
| **32 kHz** | MusicGen / EnCodec 默认 | MusicGen 全系列 |
| **44.1 kHz** | 标准音频 CD 品质 | ACE-Step, Stable Audio Open |
| **48 kHz** | 专业音频 / 视频制作 | 通用后期制作标准 |
| **96 kHz+** | 超高清录音 | 不推荐用于 AI 模型（浪费计算） |

**关键原则：**
- 模型输入时必须匹配模型训练时的采样率，否则会产生音调偏移或伪影
- MusicGen 内部使用 EnCodec，固定 32 kHz；ACE-Step 使用 DCAE 编解码器，44.1 kHz
- 归档一律使用项目最高采样率，下采样仅在推理时进行

### 1.4 位深选择

| 位深 | 动态范围 | 用途 |
|------|---------|------|
| 16-bit | ~96 dB | CD 品质，模型推理输出 |
| 24-bit | ~144 dB | 录音室标准，模型训练数据 |
| 32-bit float | ~1528 dB | DAW 混音/母带，避免精度损失 |

### 1.5 主流模型音频规格速查

| 模型 | 采样率 | 声道 | 最大时长 | 音频编解码器 | Token 速率 |
|------|--------|------|---------|------------|-----------|
| **MusicGen** | 32 kHz | Mono | 30s | EnCodec (4 codebooks) | 50 Hz × 4 |
| **Stable Audio Open** | 44.1 kHz | Stereo | 47s | 自研 Autoencoder | 21.5 Hz |
| **ACE-Step 1.5** | 44.1 kHz | Stereo | ~4 min | FSQ (5Hz) + DCAE | 5 Hz (语义层) |
| **AudioLDM 2** | 16/48 kHz | Mono | 10s | CLAP + VAE | 变长 |
| **Suno / Udio** (商业) | 44.1 kHz | Stereo | ~4 min | 未公开 | 未公开 |

---

## 2. 符号音乐格式

### 2.1 格式对比

| 格式 | 文本/二进制 | 表现力 | DAW 支持 | AI 模型支持 |
|------|-----------|--------|---------|------------|
| **MIDI (format 0)** | 二进制 | 单轨，所有通道合并 | 通用 | Magenta, MusicTransformer |
| **MIDI (format 1)** | 二进制 | 多轨，每个轨道独立通道 | 通用 | MuseGAN, 绝大多数 MIDI 模型 |
| **MusicXML** | XML 文本 | 完整乐谱信息（力度、表情、弓法） | Finale, Sibelius, MuseScore | 部分研究代码 |
| **ABC notation** | 纯文本 | 简化记谱，适合民间音乐 | 有限 | 学术研究 |
| **LilyPond** | 纯文本 | 专业排版级乐谱 | 编译为 PDF/SVG | 极少 |
| **Piano Roll (numpy)** | 数组 | 简化表示，适合 ML | 需转换 | MuseGAN 等训练格式 |

### 2.2 符号格式工作流

```
MIDI 文件
   ├─→ Magenta (MusicVAE/MusicTransformer) → 生成新 MIDI
   ├─→ MuseGAN → 多轨 MIDI 生成
   ├─→ FluidSynth / Timidity → WAV (用于对比试听)
   ├─→ musescore → MusicXML → 乐谱 PDF
   └─→ pretty_midi → numpy piano roll → 训练数据

MusicXML
   ├─→ MuseScore / Finale → 可编辑乐谱
   └─→ music21 (Python) → 分析和声/结构 → ML 特征
```

### 2.3 格式转换工具

| 工具 | 输入 → 输出 | 安装 |
|------|------------|------|
| **pretty_midi** | MIDI ↔ Piano Roll (numpy) | `pip install pretty_midi` |
| **music21** | MIDI ↔ MusicXML ↔ ABC | `pip install music21` |
| **MuseScore** | MIDI ↔ MusicXML ↔ PDF | 系统安装 |
| **miditoolkit** | MIDI → Python 对象 | `pip install miditoolkit` |
| **abc2midi** | ABC → MIDI | 系统包管理器 |
| **fluidsynth** | MIDI + SoundFont → WAV | 系统包管理器 |

### 2.4 MIDI 表示方式对照

AI 模型处理 MIDI 时需要选择一种离散化方式：

| 表示方式 | 说明 | 适用模型 |
|---------|------|---------|
| **Piano Roll** | 固定时间步的 2D 矩阵 (时间 × 音高) | MuseGAN |
| **MIDI Event** | 原生 MIDI 事件流 (Note On/Off, Velocity) | Performance RNN |
| **REMI** | 按小节/拍的事件序列 | Music Transformer, MusicBERT |
| **CP (Compound Word)** | 将多属性合并为复合 token | Transformer-based |
| **OctupleMIDI** | 每 token 包含 8 个属性 | MusicBERT |
| **MIDI-like** | 简化的事件序列 | 基础 Transformer |

---

## 3. 训练数据集

### 3.1 主要开源音乐数据集

| 数据集 | 规模 | 格式 | 标注 | 许可证 | 最佳用途 |
|--------|------|------|------|--------|---------|
| **MusicCaps** | 5,521 段 | 音频 + 文本描述 | 人工编写音乐描述 | CC-BY 4.0 | 文本-音乐对齐训练 |
| **MusicBench** | ~52k 段 | 音频 + 结构化元数据 | 和弦、BPM、调性、段落标记 | 开源 | MusicGen 微调 |
| **MTG-Jamendo** | ~55k 首完整歌曲 | 音频 | 标签 (genre/instrument/mood)，CC 元数据 | CC 许可歌曲 | 大规模音乐理解 |
| **Free Music Archive (FMA)** | ~100k 首 | 音频 | Genre 标签，分 small/medium/large | 混合 CC | 通用音乐分类/生成 |
| **NSynth** | ~306k 单音符 | 音频 (4s/音符) | 乐器、音高、力度 | CC BY 4.0 | 音色建模、单音符生成 |
| **MAESTRO** | ~200 小时 | MIDI + 对应 WAV | 对齐的钢琴 MIDI | CC BY-NC-SA 4.0 | 钢琴表演建模 |
| **Lakh MIDI** | ~176k 首 | 纯 MIDI | 多轨，无文本标注 | 混合 | 符号音乐生成 |
| **SLAKH** | ~145 小时 | 多轨 Stem MIDI + 混合音频 | 分轨对应 | 混合 | 音源分离训练 |
| **MIR-1K** | 1,000 段 | 人声 + 伴奏 | 歌唱片段 | 研究 | 人声分离 |
| **VocalSet** | ~13 小时 | 歌声 | 歌手、技术、元音 | CC BY 4.0 | 歌声合成 |

### 3.2 数据集选择策略

| 目标 | 推荐数据集 | 最小规模 | 说明 |
|------|-----------|---------|------|
| **MusicGen 风格微调** | MusicBench + 自有曲目 | 80-100 首 (30s 切片) | 风格一致性 > 数量 |
| **ACE-Step 微调** | 自有数据 + MusicCaps | 200+ 首 | 需要 lyrics + 结构标签 |
| **符号音乐生成** | Lakh MIDI + MAESTRO | 1,000+ MIDI | 风格/乐器筛选 |
| **音源分离模型** | SLAKH + MUSDB18 | 100+ 首分轨 | 干净分离的 stem |
| **声音克隆 (RVC)** | 自有录音 | 10-60 分钟目标说话人 | 干净录音，无背景噪声 |
| **歌声合成 (DiffSinger)** | 目标歌手录音 | 1-2 小时标注数据 | 需要 phoneme + f0 标注 |

### 3.3 数据集质量控制清单

```
□ 去除静音段（超过 3s 的静音用 librosa.effects.split 裁剪）
□ 统一采样率（所有训练数据使用相同采样率）
□ 音量归一化（目标 -14 LUFS 或 -1 dBTP）
□ 去重（用 chroma fingerprint 或文件 hash）
□ 标签一致性检查（人工抽检 5% 样本）
□ 排除低质量录音（噪声 > -40 dB、削波、过压缩）
□ 版权合规（仅使用授权数据，记录每条数据的来源和许可证）
```

---

## 4. 预处理流水线

### 4.1 音频编码器 (Codec) 对比

| 编码器 | 帧率 | 带宽 | VQ 码本数 | 用途 | 安装 |
|--------|------|------|----------|------|------|
| **EnCodec** (Meta) | 75 fps | 1.5-24 kbps | 8 (残差) | MusicGen 基础 | `pip install encodec` |
| **Descript Audio Codec (DAC)** | 86 fps | 8 kbps | 9 (残差) | 高质量音频压缩 | `pip install descript-audio-codec` |
| **DCAE** (ACE-Step) | — | — | — | ACE-Step 内部编解码 | 随 ACE-Step 安装 |
| **SoundStream** | — | 3-18 kbps | 4 (残差) | 早期 Google 编解码器 | — |
| **Funcodec** | 可变 | 可变 | 可变 | 通用音频编解码工具箱 | `pip install funcodec` |

### 4.2 特征提取

| 特征 | 维度 | 用途 | 工具 |
|------|------|------|------|
| **Mel 频谱图** | 80/128 bins × T | 通用音频表示 | `librosa.feature.melspectrogram` |
| **MFCC** | 13-40 维 | 音色/乐器分类 | `librosa.feature.mfcc` |
| **Chroma** | 12 维 | 和弦/调性分析 | `librosa.feature.chroma_cqt` |
| **F0 (基频)** | 1 × T | 歌声合成、音高跟踪 | `crepe` / `pyin` |
| **Onset strength** | 1 × T | 节拍检测 | `librosa.onset.onset_strength` |
| **Tempogram** | 384 bins × T | 节奏分析 | `librosa.feature.tempogram` |

### 4.3 标准预处理流程

```python
import librosa
import soundfile as sf
import numpy as np

def preprocess_audio(input_path, output_path, target_sr=32000, duration=30):
    """标准音频预处理：加载 → 重采样 → 归一化 → 切片 → 保存"""
    # 1. 加载音频，自动重采样
    wav, sr = librosa.load(input_path, sr=target_sr, mono=True, duration=duration)

    # 2. 峰值归一化到 [-1, 1]
    wav = wav / (np.max(np.abs(wav)) + 1e-8)

    # 3. 去除首尾静音
    wav, _ = librosa.effects.trim(wav, top_db=30)

    # 4. 固定长度（不足则补零，超出则截断）
    target_len = target_sr * duration
    if len(wav) < target_len:
        wav = np.pad(wav, (0, target_len - len(wav)))
    else:
        wav = wav[:target_len]

    # 5. 保存
    sf.write(output_path, wav, target_sr)
    return wav

# 批量处理
import glob
for f in glob.glob("raw_audio/*.wav"):
    out = f.replace("raw_audio/", "processed/")
    preprocess_audio(f, out, target_sr=32000, duration=30)
```

### 4.4 分块策略

| 模型 | 推荐切片长度 | 重叠 | 说明 |
|------|------------|------|------|
| MusicGen | 30s | 0s | 匹配模型生成长度 |
| ACE-Step | 30-60s | 0s | 训练数据切片 |
| Stable Audio | 47s | 0s | 匹配最大生成长度 |
| RVC 训练 | 3-10s | 0s | 短片段语音数据 |
| DiffSinger | 按句子分割 | 0.5s 交叉淡入淡出 | 需要 phoneme 对齐 |

### 4.5 音频增强（可选）

```python
import audiomentations

augment = audiomentations.Compose([
    audiomentations.Gain(min_gain_in_db=-12, max_gain_in_db=6, p=0.5),
    audiomentations.AddGaussianNoise(min_amplitude=0.001, max_amplitude=0.015, p=0.3),
    audiomentations.TimeStretch(min_rate=0.8, max_rate=1.25, p=0.3),
    audiomentations.PitchShift(min_semitones=-2, max_semitones=2, p=0.3),
])

augmented wav = augment(samples=wav, sample_rate=32000)
```

---

## 5. 标注与元数据

### 5.1 标注维度

| 维度 | 标签类型 | 自动标注工具 | 人工标注难度 |
|------|---------|------------|------------|
| **流派 (Genre)** | 多标签 (rock, pop, jazz...) | Essentia, MSD | 低 |
| **情绪 (Mood)** | 多标签 (happy, sad, energetic...) | Discogs-TAG, MIREX | 中 |
| **乐器 (Instrument)** | 多标签 (guitar, piano, drums...) | openl3, HEAR | 中 |
| **速度 (BPM)** | 数值 (60-200) | librosa.beat.tempo | 低 |
| **调性 (Key)** | 分类 (C major, A minor...) | librosa.key, crepe | 中 |
| **段落结构** | 序列 (intro/verse/chorus/bridge/outro) | 结构检测算法 | 高 |
| **歌词** | 文本 | Whisper + 手动校正 | 中-高 |
| **音质评分** | 数值 (1-5) | 信号分析指标 | 中 |

### 5.2 自动标注工具链

```bash
# BPM + 调性检测
python -c "
import librosa
y, sr = librosa.load('song.wav', sr=22050)
tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
print(f'BPM: {tempo}')
print(f'Key: {librosa.feature.tonnetz(chroma=chroma)}')
"

# 歌词转录（Whisper）
pip install openai-whisper
whisper song.wav --model medium --language zh --output_format srt

# 音源分离（为各 stem 独立标注）
pip install demucs
demucs -n htdemucs song.wav --out separated/

# 乐器识别
pip install openl3
python -c "
import openl3, soundfile as sf
audio, sr = sf.read('song.wav')
emb, _ = openl3.get_audio_embedding(audio, sr, content_type='music')
print(emb.shape)  # 用于下游分类器
"
```

### 5.3 元数据 JSON Schema

```json
{
  "track_id": "uuid-xxxx",
  "title": "曲目标题",
  "artist": "艺术家",
  "source": "MTG-Jamendo",
  "license": "CC BY 4.0",
  "audio": {
    "file_path": "processed/uuid-xxxx.wav",
    "sample_rate": 32000,
    "duration_sec": 30.0,
    "channels": 1,
    "bit_depth": 16
  },
  "annotations": {
    "genre": ["electronic", "ambient"],
    "mood": ["calm", "dreamy"],
    "instruments": ["synthesizer", "pad"],
    "bpm": 120,
    "key": "C major",
    "segments": [
      {"start": 0.0, "end": 7.5, "label": "intro"},
      {"start": 7.5, "end": 22.0, "label": "verse"},
      {"start": 22.0, "end": 30.0, "label": "chorus"}
    ]
  },
  "training": {
    "split": "train",
    "quality_score": 4,
    "notes": "clean recording, no clipping"
  }
}
```

---

## 6. 存储与组织

### 6.1 推荐项目目录结构

```
music-ai-project/
├── data/
│   ├── raw/                    # 原始数据，不可修改
│   │   ├── audio/              # 原始音频文件
│   │   └── midi/               # 原始 MIDI 文件
│   ├── processed/              # 预处理后数据
│   │   ├── train/              # 训练集
│   │   ├── val/                # 验证集
│   │   └── test/               # 测试集
│   ├── metadata/               # 标注和元数据 JSON
│   │   ├── tracks.json         # 曲目级元数据
│   │   └── annotations.json    # 细粒度标注
│   └── splits/                 # 数据集划分文件
│       ├── train.txt
│       ├── val.txt
│       └── test.txt
├── models/
│   ├── pretrained/             # 预训练权重（git-ignored）
│   ├── checkpoints/            # 训练中间检查点
│   └── lora/                   # LoRA 微调权重
├── outputs/                    # 模型生成输出
│   ├── wav/
│   ├── midi/
│   └── stems/
├── configs/                    # 训练/推理配置
├── scripts/                    # 预处理和工具脚本
└── logs/                       # 训练日志
```

### 6.2 存储容量估算

| 数据规模 | 音频数据 | 模型权重 | 总存储建议 |
|---------|---------|---------|-----------|
| 小型实验 (100 首) | ~5 GB | ~20 GB | 100 GB SSD |
| 中型项目 (1,000 首) | ~50 GB | ~50 GB | 500 GB SSD |
| 大型数据集 (10,000+ 首) | ~500 GB | ~100 GB | 2 TB NVMe |

### 6.3 数据版本控制

| 工具 | 适用场景 | 说明 |
|------|---------|------|
| **DVC (Data Version Control)** | 大型数据集 | Git 式版本控制，支持 S3/GCS 远程存储 |
| **Git LFS** | 小型数据 + 模型权重 | 与 Git 深度集成 |
| **Weights & Biases Artifacts** | 实验数据追踪 | 集成训练流程 |
| **手动快照** | 简单项目 | `tar czf data_v2.tar.gz data/` + 日期标记 |

### 6.4 备份策略

```
三级备份：
1. 本地 SSD — 工作数据（高速读写）
2. 外接 HDD/NAS — 归档副本（自动同步）
3. 云存储 (S3/B2) — 灾备（每周增量备份）

备份清单：
□ raw/ 目录（不可重建的原始数据，最高优先级）
□ metadata/（标注数据，重建成本高）
□ models/lora/（微调权重）
□ configs/（训练配置）
□ outputs/（可选，可重新生成）
```

---

## 附录：格式转换速查

```bash
# WAV → FLAC (无损压缩归档)
ffmpeg -i input.wav -c:a flac output.flac

# FLAC → WAV
ffmpeg -i input.flac -c:a pcm_s16le output.wav

# 任意格式 → WAV 32kHz 单声道 (MusicGen 输入)
ffmpeg -i input.mp3 -ar 32000 -ac 1 -sample_fmt s16 output.wav

# 任意格式 → WAV 44.1kHz 立体声 (ACE-Step 输入)
ffmpeg -i input.mp3 -ar 44100 -ac 2 -sample_fmt s16 output.wav

# 批量转换
for f in *.flac; do ffmpeg -i "$f" -ar 32000 -ac 1 "processed/${f%.flac}.wav"; done

# MIDI → WAV (使用 FluidSynth)
fluidsynth -F output.wav /path/to/soundfont.sf2 input.mid

# 检查音频信息
ffprobe -show_format -show_streams input.wav
```

---

> **文档版本：** 2026 年 5 月 | 数据格式和编解码器版本持续更新中
