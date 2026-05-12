# 04 — 入门方案与实操工作流

> 四套可直接复制执行的 AI 音乐环境搭建方案，覆盖个人制作、研究实验室、现场演出和内容创作场景。

---

## 目录

1. [方案 A：个人制作人 (Solo Producer)](#1-方案-a个人制作人-solo-producer)
2. [方案 B：研究实验室 (Research Lab)](#2-方案-b研究实验室-research-lab)
3. [方案 C：现场演出设备 (Live Performance Rig)](#3-方案-c现场演出设备-live-performance-rig)
4. [方案 D：内容创作者 (Content Creator)](#4-方案-d内容创作者-content-creator)
5. [通用工作流模式](#5-通用工作流模式)
6. [Prompt 工程技巧](#6-prompt-工程技巧)

---

## 1. 方案 A：个人制作人 (Solo Producer)

> **预算：** ¥8,000-15,000（$1,000-2,000）
> **目标：** 用 AI 辅助音乐创作，本地生成 + DAW 编曲

### 1.1 硬件清单

| 组件 | 推荐 | 备选 | 价格 (USD) |
|------|------|------|-----------|
| GPU | NVIDIA RTX 3060 12GB | RTX 4060 8GB | $250-300 |
| CPU | AMD Ryzen 5 5600X | Intel i5-12400F | $150-180 |
| 内存 | 32 GB DDR4 | 16 GB DDR4（最小） | $60-90 |
| 存储 | 1 TB NVMe SSD | 500 GB（最小） | $60-80 |
| 主板 | B550 (AM4) | B660 (LGA1700) | $100-130 |
| 电源 | 650W 80+ Bronze | — | $50-70 |
| 音频接口 | Focusrite Scarlett Solo (4th Gen) | SSL 2 | $120-130 |
| 监听耳机 | Beyerdynamic DT 770 Pro 80Ω | Audio-Technica ATH-M50x | $130-160 |
| **总计** | | | **~$950-1,200** |

**Mac 替代方案：** M4 MacBook Pro (24 GB) ~$2,000，可运行大部分模型推理，推理速度慢但足够个人使用。

### 1.2 软件栈安装

```bash
# === 系统准备 (Ubuntu 22.04/24.04) ===
sudo apt update && sudo apt install -y \
    git curl wget python3 python3-pip python3-venv \
    ffmpeg sox fluidsynth

# NVIDIA 驱动 + CUDA
sudo apt install -y nvidia-driver-535
nvidia-smi  # 验证

# === 创建工作环境 ===
mkdir -p ~/music-lab && cd ~/music-lab
python3 -m venv venv
source venv/bin/activate

# PyTorch (CUDA 12.1)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# === 安装 ACE-Step 1.5（首选生成模型）===
git clone https://github.com/ace-step/ACE-Step-1.5.git
cd ACE-Step-1.5
pip install -r requirements.txt

# 首次运行：下载模型权重（自动从 HuggingFace 下载）
python generate.py --help  # 查看参数

# === 安装 MusicGen（备选）===
pip install -U audiocraft

# === 安装 RVC（声音克隆）===
git clone https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI.git
cd Retrieval-based-Voice-Conversion-WebUI
pip install -r requirements.txt

# === 安装 ComfyUI（可视化工作流）===
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI
pip install -r requirements.txt
# 通过 ComfyUI Manager 安装 ACE-Step 音频节点

# === DAW 选择 ===
# 免费方案: Reaper (60天试用后 $60 终身), LMMS (免费开源)
# 商业方案: Ableton Live Intro ($99), FL Studio Fruity ($99)
```

### 1.3 日常创作工作流

```
步骤 1：构思 → 写歌词/描述                        [5-10 分钟]
步骤 2：ACE-Step 生成基础伴奏                      [2-5 分钟]
步骤 3：试听 → 调整 prompt → 重新生成              [5-15 分钟]
步骤 4：选择最佳版本 → 导入 DAW                    [1 分钟]
步骤 5：在 DAW 中编排结构（前奏/主歌/副歌/桥段）     [15-30 分钟]
步骤 6：如需人声 → RVC 声音克隆 或 DiffSinger     [10-20 分钟]
步骤 7：混音 + 母带处理                            [20-40 分钟]
步骤 8：导出最终版本                               [2 分钟]

总时间：约 1-2 小时完成一首歌
```

### 1.4 快速生成脚本

```bash
#!/bin/bash
# quick-gen.sh — 快速音乐生成脚本
# 用法: ./quick-gen.sh "描述文本" 时长(秒) 输出文件名

PROMPT="${1:-upbeat lo-fi hip hop with warm piano chords}"
DURATION="${2:-60}"
OUTPUT="${3:-output}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

cd ~/music-lab/ACE-Step-1.5
source ../venv/bin/activate

python generate.py \
    --prompt "$PROMPT" \
    --duration $DURATION \
    --output_path "../outputs/${OUTPUT}_${TIMESTAMP}.wav" \
    --sample_rate 44100 \
    --guidance_scale 3.5

echo "✓ 生成完成: outputs/${OUTPUT}_${TIMESTAMP}.wav"
```

### 1.5 文件管理结构

```
~/music-lab/
├── projects/
│   ├── song-001/
│   │   ├── raw/           # AI 生成的原始音频
│   │   ├── stems/         # 分轨后的人声/伴奏
│   │   ├── session/       # DAW 项目文件
│   │   └── final/         # 最终混音/母带
│   └── song-002/
├── models/                # 模型权重
├── rvc-models/            # RVC 声音模型
├── outputs/               # 生成输出
└── samples/               # 参考音频素材
```

---

## 2. 方案 B：研究实验室 (Research Lab)

> **预算：** ¥35,000-100,000（$5,000-15,000）
> **目标：** 模型微调、对比实验、数据集构建

### 2.1 硬件方案

**方案 B1：本地多 GPU 工作站（~$8,000）**

| 组件 | 推荐 | 价格 |
|------|------|------|
| GPU | 2× RTX 4090 24GB (48GB 总 VRAM) | $3,200 |
| CPU | AMD Threadripper 7970X (32C) | $2,500 |
| 内存 | 128 GB DDR5 ECC | $500 |
| 存储 | 2 TB NVMe Gen5 + 4 TB NVMe Gen4 | $400 |
| 主板 | TRX50 (ASUS Pro WS) | $700 |
| 电源 | 1600W 80+ Titanium | $400 |
| 机箱 | 全塔 + 散热 | $300 |
| **总计** | | **~$8,000** |

**方案 B2：云端按需（无前期投入）**

| 场景 | 服务商 | GPU | 费用 |
|------|--------|-----|------|
| 推理实验 | Vast.ai | RTX 4090 | ~$0.30/hr |
| 微调训练 | RunPod | A100 80GB | ~$0.79/hr |
| 大规模训练 | Lambda Labs | H100 80GB | ~$2.49/hr |

### 2.2 实验环境搭建

```bash
# === 基础环境 (Ubuntu 22.04) ===
conda create -n music-research python=3.10 -y
conda activate music-research

pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# === AudioCraft (MusicGen 训练框架) ===
git clone https://github.com/facebookresearch/audiocraft.git
cd audiocraft
pip install -e .

# === 实验追踪 ===
pip install wandb mlflow

# wandb 初始化
wandb login YOUR_API_KEY

# === 数据集工具 ===
pip install librosa soundfile pedalboard demucs
pip install datasets  # HuggingFace datasets

# === 评估工具 ===
pip install frechet-audio-distance  # FAD 评估
pip install mos-ssl                  # 客观 MOS 评分
pip install CLAP                     # 文本-音频对齐评估
```

### 2.3 MusicGen 微调流程

```bash
# === 步骤 1：准备数据 ===
# 数据要求：WAV 32kHz 单声道，30s 切片，带文本描述
python scripts/prepare_dataset.py \
    --input_dir /data/raw_audio/ \
    --output_dir /data/processed/ \
    --sample_rate 32000 \
    --duration 30 \
    --split_ratio 0.9

# 生成 metadata.csv:
# path,text
# /data/processed/train/001.wav,"electronic ambient with warm pads"
# /data/processed/train/002.wav,"upbeat funk bass line with brass stabs"

# === 步骤 2：配置训练 ===
# 创建 dora 配置文件 config/my_style.yaml
cat > config/my_style.yaml << 'EOF'
# @package _global_
defaults:
  - /solver/musicgen/default
  - /dset/audio/default
  - _self_

solver:
  musicgen:
    autogradous: false
    compression_model: facebook/encodec_32khz
    lm: facebook/musicgen-small  # 从 small 开始微调

dataset:
  train:
    path: /data/processed/train/
    metadata: /data/processed/train_metadata.json
  valid:
    path: /data/processed/val/

execute:
  epochs: 50
  updates_per_epoch: 100
  batch_size: 4  # 根据 GPU VRAM 调整
  optim:
    lr: 1e-4
EOF

# === 步骤 3：启动训练 ===
dora run solver=musicgen/my_style \
    continue_from=//pretrained/facebook/musicgen-small \
    +experiment.track=waveb

# === 步骤 4：推理测试 ===
python -c "
from audiocraft.models import MusicGen
model = MusicGen.get_pretrained('checkpoints/my_style/best.pth')
model.set_generation_params(duration=15)
wav = model.generate(['my style prompt'], progress=True)
import torchaudio
torchaudio.save('test_output.wav', wav[0], 32000)
"
```

### 2.4 模型评估框架

```python
# evaluate.py — 模型质量对比评估
import torch
import numpy as np
from frechet_audio_distance import FrechetAudioDistance

# 1. FAD (Fréchet Audio Distance) — 越低越好
fad = FrechetAudioDistance(
    model_name="vggish",
    sample_rate=16000
)
fad_score = fad.score(
    reference_dir="data/reference/",
    evaluate_dir="outputs/model_a/",
)
print(f"FAD Score: {fad_score:.2f}")

# 2. CLAP Score — 文本-音频对齐度
# 3. 人工 MOS 评分（5 分制） — 终极评估
```

| 评估指标 | 说明 | 理想范围 |
|---------|------|---------|
| FAD | 生成音频与参考的分布距离 | < 5.0 |
| CLAP Score | 文本描述与音频的语义对齐 | > 0.35 |
| MOS | 人工平均意见评分 | > 3.5 |
| ViSQOL | 客观音质评估 | > 3.0 |

---

## 3. 方案 C：现场演出设备 (Live Performance Rig)

> **预算：** ¥20,000-40,000（$3,000-6,000）
> **目标：** 低延迟实时 AI 音乐生成，MIDI 控制器集成

### 3.1 硬件清单

| 组件 | 推荐 | 价格 | 说明 |
|------|------|------|------|
| **GPU** | RTX 4090 24GB | $1,600 | 快速推理，实时生成基础 |
| **CPU** | Intel i9-14900K | $500 | 单核性能强，音频处理低延迟 |
| **内存** | 64 GB DDR5 | $200 | 多模型同时驻留 |
| **音频接口** | RME Babyface Pro FS | $900 | 业界最低 USB 延迟 |
| **MIDI 控制器** | Ableton Push 3 或 Novation Launchkey 61 | $300-800 | 实时触发 |
| **DAW** | Ableton Live Suite | $750 | 现场演出行业标准 |
| **监听** | IEM (入耳监听) + 舞台监听 | $300-500 | |
| **总计** | | **~$4,600-5,500** |

### 3.2 低延迟配置

```bash
# === 音频驱动优化 (Ubuntu) ===
# 安装 PREEMPT_RT 内核（降低音频延迟）
sudo apt install linux-lowlatency-hwe-22.04

# 设置 CPU 性能模式
echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

# 设置 GPU 持久化模式
sudo nvidia-smi -pm 1

# === 音频缓冲区设置 ===
# 目标：round-trip latency < 10ms
# RME Babyface Pro FS @ 96kHz, 128 samples:
#   Latency = 128/96000 * 2 = 2.67ms (单程)
#   Round-trip ≈ 5.3ms — 可接受
```

### 3.3 AI 模型实时集成方案

**方案 C1：gary4juce VST 插件（推荐）**

```bash
# 安装 gary4juce
git clone https://github.com/betweentwomidnights/gary4juce.git
cd gary4juce

# 需要 JUCE 和 CMake
sudo apt install cmake
# 下载 JUCE: https://juce.com/get-juce/

# 编译 VST3 插件
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release

# 生成的 .vst3 文件复制到 DAW 插件目录
cp build/gary4juce.vst3 ~/.vst3/
# macOS: cp -r build/gary4juce.vst3 ~/Library/Audio/Plug-Ins/VST3/
```

**方案 C2：OBSIDIAN Neural（8 轨 AI 实时生成）**

```bash
git clone https://github.com/innermost47/ai-dj.git
cd ai-dj
# 按项目 README 编译 VST3/AU 插件
# 特点：8 轨独立 AI 生成，MIDI 触发，节拍同步循环
```

**方案 C3：FastAPI 后端 + 虚拟音频路由**

```python
# server.py — AI 音乐生成 API 服务
from fastapi import FastAPI
from fastapi.responses import FileResponse
import uvicorn
import torch
from audiocraft.models import MusicGen

app = FastAPI()

# 预加载模型（避免首次请求延迟）
model = MusicGen.get_pretrained('medium')
model.set_generation_params(duration=10)

@app.post("/generate")
async def generate(prompt: str, duration: int = 10):
    """快速生成音频片段"""
    model.set_generation_params(duration=duration)
    wav = model.generate([prompt])
    out_path = f"/tmp/live_gen_{hash(prompt)}.wav"
    torchaudio.save(out_path, wav[0].cpu(), 32000)
    return FileResponse(out_path, media_type="audio/wav")

# 启动服务
uvicorn.run(app, host="127.0.0.1", port=8765)
```

```bash
# macOS 虚拟音频路由
# 安装 BlackHole: https://existential.audio/blackhole/
# 在 Audio MIDI Setup 中创建 Aggregate Device
# 路由: Python 输出 → BlackHole → DAW 输入

# Linux 虚拟音频路由
sudo modprobe snd-aloop
# 或使用 JACK Audio Connection Kit
```

### 3.4 备份与容灾

```
现场演出容灾方案：

1. 预生成方案：演出前预生成 50+ 音频片段，存入 DAW
   → 如果 AI 实时生成失败，立即切换到预生成内容

2. 双机热备：
   主机：RTX 4090 + Ableton Live（AI 生成）
   备机：M4 MacBook Pro（预加载素材 + 轻量推理）

3. 网络隔离：
   所有模型和推理在本地完成
   禁用 WiFi/蓝牙减少中断

4. UPS 不间断电源：
   至少 1500W UPS，覆盖主机 + 音频接口
   电池续航 > 15 分钟（足够切换到备用方案）
```

---

## 4. 方案 D：内容创作者 (Content Creator)

> **预算：** ¥5,000-15,000（$700-2,000）
> **目标：** 批量生成无版权背景音乐，用于视频/播客

### 4.1 硬件推荐

| 组件 | 推荐 | 说明 |
|------|------|------|
| GPU | RTX 4060 8GB 或 RTX 5070 12GB | 推理为主 |
| 云端备选 | Vast.ai RTX 4090 @ $0.30/hr | 批量任务按需启动 |

### 4.2 批量生成脚本

```python
#!/usr/bin/env python3
# batch_generate.py — 批量背景音乐生成
import os, json, torch, torchaudio
from datetime import datetime

# 风格预设
STYLES = {
    "upbeat_corporate": "upbeat corporate background music, clean guitar, positive energy",
    "cinematic_dark": "dark cinematic tension, deep strings, building drums",
    "lofi_study": "lo-fi hip hop beat, vinyl crackle, warm piano, chill vibes",
    "tech_review": "modern electronic, clean synth pads, tech feel, moderate tempo",
    "nature_chill": "ambient nature sounds with soft acoustic guitar, peaceful",
    "gaming_upbeat": "energetic electronic gaming music, fast beats, synth leads",
    "podcast_warm": "warm jazz-inspired background, soft drums, upright bass",
    "emotional_piano": "solo emotional piano, cinematic, reverb, melancholic",
}

#时长预设
DURATIONS = {
    "short": 30,      # 短视频 (TikTok/Reels)
    "medium": 60,     # YouTube 插曲
    "long": 180,      # 播客段落
    "full": 300,      # 完整背景音乐
}

def batch_generate(style_key="lofi_study", duration_key="medium",
                   count=10, output_dir="batch_output"):
    from audiocraft.models import MusicGen

    os.makedirs(output_dir, exist_ok=True)

    prompt = STYLES[style_key]
    duration = DURATIONS[duration_key]

    model = MusicGen.get_pretrained('medium')
    model.set_generation_params(duration=duration)

    manifest = []
    for i in range(count):
        variation = f"{prompt}, variation {i+1}"
        wav = model.generate([variation])

        filename = f"{style_key}_{duration_key}_{i+1:03d}.wav"
        filepath = os.path.join(output_dir, filename)
        torchaudio.save(filepath, wav[0].cpu(), 32000)

        manifest.append({
            "file": filepath,
            "prompt": variation,
            "duration": duration,
            "style": style_key,
            "timestamp": datetime.now().isoformat()
        })
        print(f"  [{i+1}/{count}] {filename}")

    manifest_path = os.path.join(output_dir, "manifest.json")
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f, indent=2)

    print(f"\n✓ 生成 {count} 首，总时长 {count * duration}s")
    print(f"✓ 清单文件: {manifest_path}")

if __name__ == "__main__":
    batch_generate(style_key="lofi_study", duration_key="medium", count=10)
```

### 4.3 风格一致性技巧

```python
# style_consistency.py — 确保批量生成的音乐风格一致
from audiocraft.models import MusicGen
import torchaudio

# 方法 1：使用 melody conditioning — 以参考旋律为种子
model = MusicGen.get_pretrained('melody')
melody, sr = torchaudio.load('reference_style.wav')
model.set_generation_params(duration=60)

wav = model.generate_with_chroma(
    descriptions=["lo-fi beat with warm piano"],
    melody_wavs=melody[None],  # 保持旋律参考
    melody_sample_rate=sr,
)
```

### 4.4 版权与分发注意事项

| 场景 | 可用模型 | 许可证 | 注意事项 |
|------|---------|--------|---------|
| **YouTube 视频** | ACE-Step (Apache 2.0) | 可商用 | 标注使用工具 |
| **Spotify/流媒体** | 需确认各模型许可证 | 大多 CC-BY-NC | MusicGen 权重不可商用 |
| **商业广告** | ACE-Step, YuE | Apache 2.0 | 可商用 |
| **游戏配乐** | ACE-Step, Stable Audio Open | 需查证 | Stable Audio 需确认用途 |
| **播客背景音** | ACE-Step | Apache 2.0 | 可商用 |

**版权自查清单：**
```
□ 确认模型权重许可证（非代码许可证）
□ 训练数据来源合规
□ 生成音乐不侵犯现有作品旋律
□ 内容平台 AI 生成内容披露要求
□ 保留生成 prompt 和模型版本记录
```

---

## 5. 通用工作流模式

### 5.1 模型链（Model Chaining）

```
模式 A：一键完整歌曲
  文本提示 → ACE-Step → 完整歌曲 → Demucs 分轨 → DAW 混音 → 导出

模式 B：旋律驱动编曲
  哼唱/旋律 → MusicGen (melody) → 编曲伴奏 → DAW 完善 → 导出

模式 C：AI 改编/重混
  原曲 → Demucs 分轨 → 各 stem AI 再生成 → 重新混音 → 导出

模式 D：歌声合成管线
  歌词 → TTS (GPT-SoVITS) → 人声音频
  歌词 → ACE-Step → 伴奏
  人声 + 伴奏 → DAW 混合 → 最终歌曲

模式 E：智能改编
  原曲 → Whisper (转录歌词) → LLM (修改歌词) → ACE-Step (重新生成) → 导出
```

### 5.2 后处理流水线

```bash
#!/bin/bash
# postprocess.sh — 生成音频后处理
INPUT=$1

# 1. 去除静音
ffmpeg -i "$INPUT" -af "silenceremove=start_periods=1:start_silence=0.1:start_threshold=-50dB,atrim=start=0" /tmp/step1.wav

# 2. 归一化响度 (-14 LUFS，YouTube/Spotify 标准)
ffmpeg -i /tmp/step1.wav -af "loudnorm=I=-14:TP=-1:LRA=11" /tmp/step2.wav

# 3. 淡入淡出
ffmpeg -i /tmp/step2.wav -af "afade=t=in:st=0:d=0.5,afade=t=out:st=$(ffprobe -v error -show_entries format=duration -of csv=p=0 /tmp/step2.wav | cut -d. -f1):d=2" "${INPUT%.wav}_master.wav"

echo "✓ 后处理完成: ${INPUT%.wav}_master.wav"
```

### 5.3 ComfyUI 可视化工作流

```
推荐节点链：
[文本提示] → [ACE-Step 生成器] → [Stem 分离 (Demucs)]
                                          ↓
                              [鼓组] [贝斯] [人声] [其他]
                                          ↓
                              [各自添加效果器/处理]
                                          ↓
                              [混音合并] → [母带处理] → [输出]

ComfyUI 启动：
cd ~/music-lab/ComfyUI
source ../venv/bin/activate
python main.py --listen 0.0.0.0 --port 8188

# 浏览器打开 http://localhost:8188
# 通过 ComfyUI Manager → Install Custom Node → 搜索 "ACE-Step"
```

---

## 6. Prompt 工程技巧

### 6.1 音乐 Prompt 结构模板

```
[风格/流派], [乐器], [情绪/氛围], [速度/节奏], [音色质感], [结构提示]

示例：
"electronic synthwave, arpeggiated synth bass, nostalgic and dreamy,
 120 bpm, warm analog textures, with build-up and drop"

"acoustic folk, fingerpicked guitar and soft violin, melancholic,
 slow tempo, intimate recording, verse-chorus structure"

"lo-fi hip hop, vinyl crackle, jazzy piano chords, chill and relaxed,
 85 bpm, warm and dusty, repetitive loop"
```

### 6.2 ACE-Step 结构标签

```python
# ACE-Step 支持的结构标签
lyrics = """
[verse]
阳光洒落在窗台上
咖啡的香气弥漫

[chorus]
这就是我们的时光
简单而美好

[bridge]
[instrumental]

[outro]
慢慢 faded out
"""

# 控制参数
params = {
    "prompt": "indie pop, acoustic guitar, warm vocals, cheerful",
    "lyrics": lyrics,
    "duration": 180,
    "guidance_scale": 3.5,  # 3.0-5.0，越高越贴合 prompt
    "temperature": 1.0,     # 0.8-1.2，越高越随机
}
```

### 6.3 Prompt 优化技巧

| 技巧 | 说明 | 示例 |
|------|------|------|
| **具体乐器 > 模糊风格** | 明确乐器名而非泛泛的"好听的" | "clean electric guitar" > "nice music" |
| **加入速度描述** | BPM 或速度形容词 | "120 bpm" / "moderate tempo" |
| **音色修饰** | 描述质感 | "warm analog", "bright digital", "gritty distortion" |
| **参考时代/艺人风格** | 间接传达风格意图 | "1980s synth pop style" |
| **结构提示** | 告诉模型变化方向 | "starts soft, builds to climax" |
| **避免过度描述** | 矛盾指令降低质量 | 不要同时要求 "minimal" 和 "complex orchestration" |

---

## 附录：方案选择决策树

```
你的主要需求是什么？
├─ 创作音乐（个人/小团队）
│   ├─ 预算 < $2,000 → 方案 A（Solo Producer）
│   └─ 预算 > $5,000 → 方案 A + 更好的 GPU
├─ 研究/训练模型
│   ├─ 偶尔训练 → 方案 B2（云端按需）
│   └─ 长期研究 → 方案 B1（本地多 GPU）
├─ 现场演出
│   └─ → 方案 C（Live Performance Rig）
└─ 批量生成背景音乐
    ├─ 偶尔使用 → 方案 D + 云 GPU
    └─ 频繁使用 → 方案 D + 本地 GPU
```

---

> **文档版本：** 2026 年 5 月 | 软件版本和价格可能随时变化
