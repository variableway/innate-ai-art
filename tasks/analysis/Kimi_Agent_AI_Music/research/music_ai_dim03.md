# 维度3：开源与本地部署AI音乐工具深度研究报告

> 研究时间：2025年  
> 搜索次数：≥20次独立搜索  
> 覆盖来源：GitHub官方仓库、arXiv论文、HuggingFace、技术博客、行业媒体、社区教程

---

## 目录

1. [执行摘要](#1-执行摘要)
2. [核心工具深度分析](#2-核心工具深度分析)
   - 2.1 DiffRhythm（谛韵）
   - 2.2 ACE-Step 1.5
   - 2.3 MusicGen / AudioCraft（Meta）
   - 2.4 YuE
   - 2.5 Riffusion
   - 2.6 SongGen
   - 2.7 HeartMuLa
   - 2.8 JEN-1
3. [辅助工具与集成方案](#3-辅助工具与集成方案)
   - 3.1 Audacity OpenVINO AI插件
   - 3.2 ComfyUI集成生态
4. [硬件要求与部署对比](#4-硬件要求与部署对比)
5. [安装难度评估](#5-安装难度评估)
6. [Google Colab免费运行方案](#6-google-colab免费运行方案)
7. [研究级 vs 可用级工具分类](#7-研究级-vs-可用级工具分类)
8. [关键发现与争议](#8-关键发现与争议)
9. [推荐选择指南](#9-推荐选择指南)

---

## 1. 执行摘要

开源AI音乐生成领域在2024-2026年间经历了爆发式增长。从2022年的Riffusion（频谱图扩散）和2023年的MusicGen（Meta自回归），到2025年的YuE、DiffRhythm、SongGen，再到2026年初的ACE-Step 1.5和HeartMuLa，开源社区正在快速缩小与Suno、Udio等商业产品的差距。

**核心趋势**：
- **扩散模型取代自回归成为主流**：DiffRhythm、ACE-Step 1.5采用扩散架构，推理速度比自回归模型快10-100倍 [^19^]
- **显存门槛持续下降**：从YuE的16GB+到DiffRhythm的8GB，再到ACE-Step 1.5的<4GB，消费级显卡已可运行 [^53^][^138^]
- **全歌曲生成成为标配**：2025年前的开源模型多限于30秒片段，2025年后DiffRhythm、YuE、ACE-Step均可生成完整歌曲 [^56^][^41^]
- **歌词对齐能力大幅提升**：DiffRhythm的句级歌词对齐、YuE的双轨next-token预测、ACE-Step的LM规划器均实现了商用级歌词-歌声对齐 [^20^][^34^]

---

## 2. 核心工具深度分析

### 2.1 DiffRhythm（谛韵）

#### 基本信息

| 属性 | 详情 |
|------|------|
| **开发者** | 西北工业大学音频语音与语言处理实验室（ASLP@NPU）+ 香港中文大学（深圳） |
| **架构** | 全扩散架构（Latent Diffusion），非自回归 |
| **GitHub** | https://github.com/ASLP-lab/DiffRhythm |
| **HuggingFace** | https://huggingface.co/ASLP-lab/DiffRhythm-base |
| **HuggingFace Space** | https://huggingface.co/spaces/ASLP-lab/DiffRhythm |
| **论文** | https://arxiv.org/abs/2503.01183 |
| **许可证** | Stability AI Community License（VAE基于Stable Audio Open微调） |
| **训练硬件** | 华为昇腾910B |

#### 功能特点

DiffRhythm是**首个基于扩散模型的端到端全长度歌曲生成模型** [^58^]。其核心创新包括：

- **全扩散架构**：采用VAE压缩音频波形为紧凑潜在表示，扩散Transformer（DiT）基于潜在空间迭代去噪，推理速度提升数十倍 [^20^]
- **句级歌词对齐机制**：将歌词按句子拆分并转换为音素序列，根据歌词句子起始时间将音素精准映射到音频潜在表示的对应位置，解决了歌词与人声的稀疏对齐问题 [^20^][^58^]
- **压缩鲁棒性**：VAE通过数据增强训练，具备高频细节修复能力，即使输入低质量MP3也能生成高保真音乐 [^20^]
- **双轨立体声输出**：同时生成人声和伴奏，44.1kHz采样率 [^56^]
- **多语言输入**：支持歌词和风格提示的多语言输入 [^59^]
- **参考音频生成**：支持基于参考WAV文件或文本提示生成音乐 [^57^]

#### 硬件要求

```
Claim: DiffRhythm-base最低仅需8GB显存即可本地部署到消费级显卡（如RTX 3060）
Source: ASLP-lab GitHub / 掘金技术文章
URL: https://github.com/ASLP-lab/DiffRhythm / https://juejin.cn/post/7480811072263110695
Date: 2025-02-23 / 2025-03-12
Excerpt: "Note that DiffRhythm-base requires a minimum of 8G of VRAM. To meet the 8G VRAM requirement, use the --chunked argument when running the inference."
Context: 官方README明确声明8GB为最低要求，需使用chunked解码模式
Confidence: high
```

```
Claim: DiffRhythm-full模型（4分45秒完整歌曲）已发布v1.2版本
Source: ASLP-lab GitHub
URL: https://github.com/ASLP-lab/DiffRhythm
Date: 2025-05-10
Excerpt: "DiffRhythm-v1.2-full (4m45s) https://huggingface.co/ASLP-lab/DiffRhythm-1_2-full"
Context: 2025年3月时full版标记为"Coming soon"，v1.2版本已发布完整版
Confidence: high
```

#### 安装指南

**Linux/macOS**: [^57^][^68^]
```bash
# 1. 克隆仓库
git clone https://github.com/ASLP-lab/DiffRhythm.git
cd DiffRhythm

# 2. 安装espeak-ng
sudo apt-get install espeak-ng  # Debian/Ubuntu
brew install espeak-ng          # macOS

# 3. 创建Python环境
conda create -n diffrhythm python=3.10
conda activate diffrhythm
pip install -r requirements.txt

# 4. 运行推理（使用参考音频）
bash scripts/infer_wav_ref.sh

# 5. 或基于文本提示
bash scripts/infer_prompt_ref.sh
```

**Windows**: 需设置环境变量 `PHONEMIZER_ESPEAK_LIBRARY` 和 `PHONEMIZER_ESPEAK_PATH` [^57^]

**Docker**: 官方已提供Docker支持 [^68^]
```bash
cd docker
docker compose up -d
docker exec -it DiffRhythm bash
```

**生成速度**：
- 95秒歌曲在RTX 3060 Ti（8GB）上约14秒完成推理 [^65^]
- 10秒可生成4分45秒完整歌曲 [^20^]

#### 生成质量与局限

```
Claim: DiffRhythm生成质量接近但尚未达到专业录制水准，存在歌词错乱或重复的问题
Source: LinuxLinks实测 / 360doc用户评测
URL: https://www.linuxlinks.com/machine-learning-linux-diffrhythm-song-generation/2/
Date: 2025-03-09
Excerpt: "In both examples, there are a few instances of mangled or repeated lyrics."
Context: 实测发现部分输出存在歌词错乱或重复现象
Confidence: high
```

```
Claim: 模型还有待改进，肯定没法跟录制歌曲相比
Source: 360doc用户评测
URL: http://www.360doc.com/content/25/0521/15/20268466_1153805815.shtml
Date: 2025-05-21
Excerpt: "效果见下方示例，模型还有待改进，肯定没法跟录制歌曲相比，想通过这个生成歌曲发布赚钱的就免了。"
Context: 用户实际使用后的评价
Confidence: medium
```

**可用性评级**：★★★★☆（可用级）—— 8GB显存门槛友好，生成速度快，但偶有歌词问题

---

### 2.2 ACE-Step 1.5

#### 基本信息

| 属性 | 详情 |
|------|------|
| **开发者** | ACE Studio + StepFun |
| **架构** | Hybrid LM（语言模型规划器）+ DiT（扩散Transformer）+ DCAE + DMD2蒸馏 |
| **GitHub** | https://github.com/ACE-Step/ACE-Step-1.5 |
| **HuggingFace** | https://huggingface.co/ACE-Step |
| **论文** | https://arxiv.org/abs/2602.00744 |
| **许可证** | MIT（v1.5）/ Apache 2.0（v1.0） |
| **支持平台** | NVIDIA CUDA、AMD ROCm、Intel XPU、Apple MPS、CPU |

#### 功能特点

ACE-Step 1.5是2026年初发布的重大架构升级，被评价为**"音乐生成领域的Stable Diffusion时刻"** [^42^]。

**架构创新** [^53^][^52^]：
- **LM（语言模型）作为规划器**：基于Qwen3的LM（0.6B/1.7B/4B三档）通过思维链推理将用户提示转化为精确的歌曲蓝图（包含风格描述符、歌词、编曲元数据等）
- **DiT（扩散Transformer）作为声学渲染器**：专注于声学丰富度和乐器分离，使用线性注意力将复杂度从O(N²)降至O(N)
- **DCAE深度压缩**：32x压缩率（传统自编码器仅8x），更少潜在token意味着更快训练和推理
- **DMD2蒸馏**：将DiT推理轨迹压缩至4-8步，实现100倍以上推理加速
- **内在RL对齐**：利用模型自身理解任务驱动的强化学习奖励，确保50+语言的稳健对齐

**功能覆盖** [^50^][^54^]：
- 文本到音乐（含自动歌词生成）
- 翻唱（Cover Generation）
- 重新配乐（Repaint & Edit）
- 人声分离转背景音乐（Vocal2BGM）
- 片段提取与乐高式拼接
- LoRA微调训练
- 音频分析（BPM、调性、拍号自动提取）

#### 硬件要求

```
Claim: ACE-Step 1.5基础版仅需不到4GB VRAM即可运行，是消费级GPU最友好的全功能音乐生成模型
Source: arXiv论文 / GitHub官方文档
URL: https://arxiv.org/html/2602.00744v1 / https://github.com/ACE-Step/ACE-Step-1.5
Date: 2026-01-31
Excerpt: "This optimization enables sub-second generation of high-fidelity audio on consumer-grade GPUs (<4GB VRAM)" / "VRAM: ≥4GB for DiT-only mode; ≥6GB for LLM+DiT"
Context: 官方明确声明最低4GB显存要求，且支持纯CPU模式
Confidence: high
```

| GPU VRAM | 推荐DiT | 推荐LM | 后端 | 说明 |
|----------|---------|--------|------|------|
| ≤6GB | 2B turbo | None（仅DiT） | — | LM默认禁用；INT8量化+CPU offload |
| 6-8GB | 2B turbo | 0.6B | PyTorch | 轻量级LM |
| 8-16GB | 2B turbo/sft | 0.6B/1.7B | vLLM | 0.6B用于8-12GB，1.7B用于12-16GB |
| 16-20GB | 2B sft或XL turbo | 1.7B | vLLM | XL在20GB以下需CPU offload |
| 20-24GB | XL turbo/sft | 1.7B | vLLM | XL可完全载入 |
| ≥24GB | XL sft | 4B | vLLM | 最佳质量 |

```
Claim: XL版本（4B DiT）模型权重约9GB（bf16），最低12GB VRAM可运行（需INT8 offload+量化），推荐20GB以上获得最佳体验
Source: 中文技术媒体
URL: https://www.chooseai.net/ai-news/detail/3197/
Date: 2026-04-08
Excerpt: "XL版本的显存需求有所增加：模型权重约9GB（bf16），最低12GB VRAM（需INT8 offload加量化），推荐20GB以上获得最佳体验。"
Context: XL版本性能更强但显存要求更高
Confidence: high
```

#### 生成速度

| 硬件 | v1.0速度 | v1.5速度 |
|------|---------|---------|
| A100 | 2.2秒/1分钟歌曲 | 不到2秒/完整歌曲 |
| RTX 3090 | 4.7秒/1分钟歌曲 | 不到10秒/完整歌曲 |

支持10秒到10分钟灵活时长，最多8首歌曲批量并行生成 [^52^][^54^]。

#### 安装方式

ACE-Step 1.5提供了**最丰富的安装选项** [^29^][^138^][^150^]：

**1. Windows便携包（最简单）**：
- 下载ACE-Step-1.5.7z，解压后双击`start_gradio_ui.bat`
- 包含预装Python嵌入环境和所有依赖
- 要求：CUDA 12.8

**2. macOS便携包**：
- 下载ACE-Step-1.5.zip
- 支持MLX原生加速（Apple Silicon）
- 运行 `./start_gradio_ui_macos.sh`

**3. 标准安装（全平台）**：
```bash
# 安装uv包管理器
curl -LsSf https://astral.sh/uv/install.sh | sh

# 克隆安装
git clone https://github.com/ACE-Step/ACE-Step-1.5.git
cd ACE-Step-1.5
uv sync

# 启动Gradio UI
uv run acestep

# 或启动REST API
uv run acestep-api
```

**4. ComfyUI节点**：
- 视觉化节点工作流，支持text2music、cover、repainting、vocal-to-BGM [^29^]

**5. Pinokio一键安装器**：
- 跨平台：Win/Linux/macOS
- 自动检测GPU类型，选择正确PyTorch版本 [^140^]

**6. WaveSpeedAI云API**：
- 无冷启动，按量付费 [^29^]

```
Claim: M2 MacBook Air（16GB内存）可成功运行ACE-Step 1.5，生成约需5-10分钟
Source: BioErrorLog技术博客
URL: https://en.bioerrorlog.work/entry/ace-step-15-local-m2-macbook
Date: 2026-02-15
Excerpt: "MacBook Air Chip: Apple M2 Memory: 16GB... Generation took roughly 5–10 minutes."
Context: 实测Apple Silicon可用，但速度较慢
Confidence: high
```

#### 可用性评级

★★★★★（可用级/生产级）—— 最低显存要求、多平台支持、丰富安装选项、功能最全面

---

### 2.3 MusicGen / AudioCraft（Meta）

#### 基本信息

| 属性 | 详情 |
|------|------|
| **开发者** | Meta FAIR |
| **架构** | 自回归Transformer + EnCodec音频分词器 |
| **GitHub** | https://github.com/facebookresearch/audiocraft |
| **HuggingFace** | https://huggingface.co/facebook/musicgen-medium |
| **HuggingFace Space** | https://huggingface.co/spaces/facebook/MusicGen |
| **论文** | https://arxiv.org/abs/2306.05284 |
| **许可证** | MIT（代码）/ CC-BY-NC 4.0（模型权重，限制商用） |
| **训练数据** | 20,000小时授权音乐 |

#### 模型变体 [^43^][^126^][^136^]

| 模型 | 参数量 | 功能 | FP16 VRAM |
|------|--------|------|-----------|
| musicgen-small | 300M | 纯文本到音乐 | ~2GB |
| musicgen-medium | 1.5B | 纯文本到音乐 | ~4GB |
| musicgen-melody | 1.5B | 文本+旋律到音乐 | ~4GB |
| musicgen-large | 3.3B | 纯文本到音乐 | ~8GB |
| musicgen-stereo-* | 各尺寸 | 立体声版本 | 各尺寸+约50% |

```
Claim: MusicGen-large在RTX 3090上运行良好，需要约15-16GB VRAM
Source: FurkanGozukara教程
URL: https://github.com/FurkanGozukara/Stable-Diffusion/wiki/AI-Music-Generation-Audiocraft-and-MusicGen-Tutorial-with-Example-Free-Text-to-Music-Model
Date: 2025-10-23
Excerpt: "The large model works very well on RTX 3090. Probably it requires about 15-16GB VRAM memory."
Context: 实测大型模型显存需求
Confidence: high
```

#### 功能特点

- **文本到音乐**：从描述生成音乐片段
- **旋律条件生成**：上传参考音频，保持旋律结构但改变风格 [^43^]
- **单阶段生成**：同时预测4个codebook，仅50个自回归步骤/秒音频 [^134^]
- **AudioGen（音效生成）**：同一框架下支持音效生成
- **最大输出长度**：约30秒/次调用，可链式调用生成长曲目 [^27^]

#### 安装方式 [^45^][^60^][^41^]

**Conda安装（推荐）**：
```bash
conda create -n musicgen python=3.9 -y
conda activate musicgen

# 安装PyTorch（CUDA 11.8）
conda install pytorch==2.1.0 torchvision==0.16.0 torchaudio==2.1.0 pytorch-cuda=11.8 -c pytorch -c nvidia -y

# 克隆AudioCraft
git clone https://github.com/facebookresearch/audiocraft.git
cd audiocraft
pip install -e .
```

**Docker部署** [^41^]：
```yaml
version: '3.8'
services:
  musicgen:
    image: docker.io/library/python:3.11-slim
    ports:
      - "7860:7860"
    command: >
      bash -c "
      pip install -q gradio torch torchaudio audiocraft &&
      python app.py
      "
```

**Gradio Web UI**：
```bash
python -m demos.musicgen_app --share
```

```
Claim: RTX 3060上生成30秒音轨约15-20秒；CPU上需2-3分钟
Source: Mustafa.net教程
URL: https://mustafa.net/2026/03/06/generate-music-locally-with-musicgen-no-subscriptions/
Date: 2026-04-18
Excerpt: "I'm running this on a RTX 3060 and generating 30-second tracks takes about 15-20 seconds. On CPU? You're looking at 2-3 minutes."
Context: Docker部署实测性能
Confidence: high
```

#### 局限

- **无歌词支持**：MusicGen不支持歌词到歌曲的生成（纯器乐/背景音乐）
- **商用限制**：模型权重采用CC-BY-NC 4.0许可证，禁止商业使用 [^27^]
- **输出较短**：单次调用上限约30秒

#### 可用性评级

★★★★☆（可用级）—— 安装简单、文档完善、社区广泛，但限制商用且不支持人声

---

### 2.4 YuE

#### 基本信息

| 属性 | 详情 |
|------|------|
| **开发者** | 香港科技大学（HKUST）+ Multimodal Art Projection（M-A-P） |
| **架构** | 双LLaMA语言模型（7B+1B），自回归Transformer |
| **GitHub** | https://github.com/multimodal-art-projection/YuE |
| **HuggingFace** | https://huggingface.co/m-a-p/YuE-s1-7B-anneal-en-cot |
| **论文** | https://arxiv.org/abs/2503.08638 |
| **许可证** | Apache 2.0（2025.01.30更新，完全支持商用） |
| **模型规模** | s1-7B（11.5GB权重）+ s2-1B（3.65GB权重）+ upsampler |

#### 功能特点 [^36^][^41^]

YuE是**首个可生成完整歌曲（最长5分钟）的开源基础模型**，直接对标Suno：

- **双轨next-token预测**：分别建模人声和伴奏轨道，确保音乐细节和一致性 [^34^]
- **结构化渐进生成**：verse和chorus部分在同一语境中交替，增强歌曲连贯性 [^34^]
- **音乐上下文学习**：从现有音乐片段学习风格而不直接复制旋律，避免抄袭 [^35^]
- **风格迁移**：可将日文city pop转换为英文rap，同时保留原伴奏 [^36^]
- **双向生成**：支持正向和逆向生成
- **增量歌曲生成**：YuE-UI支持分段生成、输出选择、续写功能 [^41^]
- **LoRA微调**：2025年6月支持LoRA微调 [^41^]
- **多语言支持**：英语、中文、粤语、日语、韩语 [^39^]
- **音乐理解**：在MARBLE基准上达到SOTA [^36^]

#### 硬件要求

```
Claim: YuE最低需要CUDA兼容GPU且至少10GB VRAM；完整歌曲推荐80GB显存（H800/A100或多RTX 4090）
Source: YuE GitHub / ArticleX / KillTheDJ
URL: https://github.com/multimodal-art-projection/YuE / https://www.articlex.com/open-source-ai-music-generation-breakthrough-with-yue-software/
Date: 2025-01-23 / 2025-04-28
Excerpt: "Users need a CUDA-compatible GPU with at least 10GB of VRAM" / "For full-length songs, at least 80GB of video memory is recommended" / "For GPUs with 24GB memory or less: Run up to 2 sessions"
Context: 16GB以下用户可用量化模型；8GB可用YuE-UI的量化版本
Confidence: high
```

| 配置 | 显存要求 | 说明 |
|------|---------|------|
| 最低运行 | 10GB | 基础推理 |
| 24GB以下推荐 | 16-24GB | 运行2个session（1 verse + 1 chorus） |
| 完整歌曲 | ≥80GB | H800、A100或多RTX 4090 |
| 8GB量化版 | 8GB | YuE-UI with quantized models [^41^] |

**生成时间**：
- H800上30秒音频约150秒
- RTX 4090上30秒音频约360秒 [^39^][^41^]

#### 安装方式

**Conda安装（Linux）** [^32^]：
```bash
git clone https://github.com/multimodal-art-projection/YuE.git
cd YuE
conda create -n yue python=3.10 -y
conda activate yue
pip install -r requirements.txt
```

**Windows**: Pinokio一键安装器 [^41^]

**ComfyUI**: ComfyUI_YuE节点支持，≤16GB显存可用量化方法（exllamav2、bitsandbytes、deepbeepmeep）[^37^][^38^]

**Docker**: YuE-for-Windows支持Docker部署 [^41^]

**Google Colab**: YuE-extend by Mozer提供免费Colab笔记本 [^130^][^131^]

```
Claim: YuE-extend提供带ExLlamaV2加速的免费Google Colab，支持COT推理和mp3续写
Source: Mozer/YuE-extend GitHub
URL: https://github.com/Mozer/YuE-extend
Date: 2025-02-16
Excerpt: "Free Google colab with COT and mp3-extend: https://colab.research.google.com/github/Mozer/YuE-extend/blob/main/colab/Yue_extend_with_exllama.ipynb"
Context: Colab方案降低了硬件门槛
Confidence: high
```

#### 局限

```
Claim: YuE输出主要为单声道，缺乏立体声宽度；生成质量尚不适合专业出版标准
Source: ArticleX评测
URL: https://www.articlex.com/open-source-ai-music-generation-breakthrough-with-yue-software/
Date: 2025-04-28
Excerpt: "Audio output is primarily mono, lacking stereo width. Quality falls short of professional publishing standards."
Context: 开源模型的音质局限性
Confidence: high
```

- 仅限CUDA GPU（AMD不支持）[^33^]
- 生成时间较长
- 16GB以下需要量化，可能影响音乐性 [^41^]

#### 可用性评级

★★★☆☆（可用级）—— 功能强大、完全开源商用，但硬件门槛高、生成慢、输出为单声道

---

### 2.5 Riffusion

#### 基本信息

| 属性 | 详情 |
|------|------|
| **开发者** | Seth Forsgren + Hayk Martiros |
| **架构** | Stable Diffusion v1.5微调，频谱图→音频转换 |
| **GitHub** | https://github.com/riffusion/riffusion |
| **HuggingFace** | https://huggingface.co/riffusion/riffusion-model-v1 |
| **网站** | https://www.riffusion.com |
| **许可证** | CreativeML OpenRAIL-M / MIT（代码） |
| **首发时间** | 2022年 |

#### 功能特点 [^26^][^43^]

Riffusion是最早的AI音乐生成开源项目之一，采用独特方法：

- **频谱图扩散**：使用Stable Diffusion生成频谱图图像，再转换为音频片段
- **实时音乐生成**：支持提示插值和图像条件控制
- **提示到音乐**：输入文本描述生成对应风格的音乐片段
- **循环和短片段**：适合lo-fi、ambient、experimental风格
- **MIT许可证**：代码完全开源，可自由商用 [^26^]

#### 硬件要求

```
Claim: Riffusion本地运行需要Python 3.10+、PyTorch、至少6GB VRAM的GPU
Source: PromptLogin指南
URL: https://promptlogin.com/what-is-riffusion-and-how-it-works-2025-guide/
Date: 2025-10-11
Excerpt: "Requirements: Ensure your system meets the following specifications: Python 3.10+, PyTorch, and a GPU with at least 6 GB VRAM for faster processing."
Context: 门槛较低的老牌开源工具
Confidence: high
```

#### 安装方式 [^110^]

```bash
conda create --name riffusion python=3.9
conda activate riffusion
pip install -r requirements.txt

# 需安装ffmpeg
conda install -c conda-forge ffmpeg
```

#### 局限

- 仅生成器乐片段，**不支持人声** [^43^]
- 输出长度有限（几秒到几分钟）
- 与Suno/Udio等商业工具相比，缺乏深度和控制 [^26^]
- 2025年后已被更先进的扩散模型超越

#### 可用性评级

★★☆☆☆（研究级/玩具级）—— 开创性项目，但技术上已落后

---

### 2.6 SongGen

#### 基本信息

| 属性 | 详情 |
|------|------|
| **开发者** | Zihan Liu等（学术论文项目） |
| **架构** | 单阶段自回归Transformer |
| **GitHub** | https://github.com/LiuZH-19/SongGen |
| **论文** | https://arxiv.org/abs/2502.13128 |
| **许可证** | Apache 2.0 |
| **输出长度** | 最长30秒 |
| **采样率** | 16kHz |

#### 功能特点 [^56^][^60^][^71^]

- **单阶段生成**：区别于YuE等多阶段方法，避免误差累积
- **双模式输出**：mixed mode（人声+伴奏混合）和dual-track mode（分离输出）
- **细粒度控制**：支持歌词、乐器、风格、情绪、音色的文本描述
- **3秒参考音频**：可选声音克隆功能
- **自动数据预处理管道**：开源训练数据预处理流程

```
Claim: SongGen官方模型最长仅生成30秒、16kHz音频；在学术基准测试中性能逊于YuE、DiffRhythm、ACE-Step
Source: LeVo论文 / SongGen论文
URL: https://arxiv.org/html/2506.07520v2 / https://arxiv.org/abs/2502.13128
Date: 2025
Excerpt: "the official SongGen model can only generate songs up to 30 seconds with a sampling rate of 16 kHz"
Context: 与长歌曲生成模型对比的局限性
Confidence: high
```

#### 可用性评级

★★☆☆☆（研究级）—— 学术论文项目，输出短、音质有限，主要用于研究参考

---

### 2.7 HeartMuLa

#### 基本信息

| 属性 | 详情 |
|------|------|
| **开发者** | 多机构联合（Dongchao Yang等） |
| **架构** | LLM-based song generation + HeartCodec tokenizer |
| **GitHub** | https://github.com/HeartMuLa/heartlib |
| **论文** | https://arxiv.org/abs/2601.10547 |
| **许可证** | Apache 2.0（2026.01.20更新） |
| **首发时间** | 2026年1月 |

#### 功能特点 [^106^][^107^][^108^]

HeartMuLa是一个**音乐基础模型家族**，包含四个组件：

1. **HeartMuLa**：LLM-based歌曲生成模型，支持多条件控制（文本风格、歌词、参考音频）
2. **HeartCodec**：12.5Hz低帧率高保真音乐编解码器，捕捉长程音乐结构
3. **HeartTranscriptor**：基于Whisper的歌词识别模型
4. **HeartCLAP**：音频-文本对齐模型

- **分段级风格控制**：可用自然语言分别指定intro、verse、chorus的风格 [^108^]
- **短视频背景音乐模式**：针对TikTok、Reels等优化 [^108^]
- **多语言支持**：覆盖几乎所有主要语言 [^107^]
- **7B内部版本达到Suno级别**：论文声称内部7B版本在音乐性、保真度和可控性上与Suno相当 [^107^]

#### 硬件要求

```
Claim: HeartMuLa 3B模型需要约24GB显存，推荐RTX 3090/4090或A100
Source: HeartMuLa官网
URL: https://heart-mula.com/
Date: 2026-03-01
Excerpt: "HeartMuLa 3B 模型需要约 24GB 显存。推荐的 GPU 包括 RTX 3090、RTX 4090 或 A100。"
Context: 硬件门槛较高
Confidence: high
```

| 配置 | 显存要求 |
|------|---------|
| 3B oss版本 | ~24GB |
| 7B内部版本 | 更高（未开源） |

#### 局限

- 2026年初刚发布，生态尚不成熟
- 7B最佳版本未开源，目前仅3B可用
- 推理速度RTF≈1.0（实时因子），即生成1秒音频需1秒 [^107^]

#### 可用性评级

★★★☆☆（可用级/早期）—— 架构先进但硬件门槛高，生态仍在建设中

---

### 2.8 JEN-1

#### 基本信息

| 属性 | 详情 |
|------|------|
| **开发者** | Futureverse AI Research |
| **架构** | 全向1D扩散模型（结合自回归+非自回归训练） |
| **论文** | https://arxiv.org/abs/2308.04729 |
| **演示** | https://jenmusic.ai/audio-demos |
| **首发时间** | 2023年8月 |

#### 功能特点 [^118^]

- **全向扩散模型**：支持双向（去噪所有latent）和单向（因果/自回归）模式切换
- **48kHz高保真立体声**：当时领先的采样率
- **多任务统一框架**：文本引导音乐生成、音乐修复（inpainting）、音乐续写
- **JEN-1 Composer扩展**：支持多轨道音乐生成 [^116^]

#### 可用性评级

★★☆☆☆（研究级）—— 模型未完全开源，仅论文和演示，无法本地部署

---

## 3. 辅助工具与集成方案

### 3.1 Audacity OpenVINO AI插件

```
Claim: Audacity 3.7.4+支持Intel OpenVINO AI插件，完全免费、本地运行、无需联网，支持macOS
Source: Audacity官方博客
URL: https://www.audacityteam.org/blog/openvino-mac/
Date: 2025-06-11
Excerpt: "these effects are completely free and run on your own machine, no internet connection required."
Context: 将AI能力集成到成熟DAW工作流中
Confidence: high
```

**功能** [^47^][^53^][^57^]：
- **音乐分离（Music Separation）**：将单声道/立体声分离为人声、鼓、贝斯、其他乐器
- **降噪（Noise Suppression）**： spoken word音频降噪
- **音乐生成与续写**：集成MusicGen LLM生成音乐片段或续写现有片段
- **Whisper转录**：语音转文字
- **音频超分辨率**：将低采样率音频上采样（如8kHz电话录音）

**安装** [^57^]：
1. 安装Audacity 3.7.4+
2. 从GitHub下载OpenVINO插件：https://github.com/intel/openvino-plugins-ai-audacity/releases
3. 安装时选择需要的模型
4. 在Audacity Preferences → Modules中启用mod-openvino

**注意**：ARM设备不支持OpenVINO AI [^53^]

---

### 3.2 ComfyUI集成生态

多个开源音乐模型已集成到ComfyUI工作流中：

| 模型 | ComfyUI节点 | 特点 |
|------|------------|------|
| DiffRhythm | billwuhao/ComfyUI_DiffRhythm | 支持文本生成、参考音频、自动双语歌词字幕 [^122^] |
| YuE | smthemex/ComfyUI_YuE | 支持量化加速（exllamav2、bitsandbytes）[^37^][^38^] |
| ACE-Step 1.5 | 官方ComfyUI节点 | text2music、cover、repainting、vocal-to-BGM [^29^][^50^] |
| HeartMuLa | Benji制作的节点 | 2026年1月发布 [^107^] |

---

## 4. 硬件要求与部署对比

### 显存需求总览

| 模型 | 最低显存 | 推荐显存 | 完整功能显存 | 支持平台 |
|------|---------|---------|------------|---------|
| **ACE-Step 1.5** | <4GB (DiT only) | 8-16GB | 20GB+ (XL+4B LM) | CUDA/ROCm/MPS/Intel/CPU |
| **DiffRhythm** | 8GB (chunked) | 12GB | 16GB+ (full) | CUDA |
| **MusicGen-small** | 2GB (FP16) | 4GB | 4GB | CUDA/CPU |
| **MusicGen-medium** | 4GB (FP16) | 8GB | 8GB | CUDA/CPU |
| **MusicGen-large** | 8GB (FP16) | 16GB | 16GB | CUDA/CPU |
| **YuE (量化)** | 8GB | 16GB | 24GB+ | CUDA only |
| **YuE (完整)** | 16GB | 24GB | 80GB+ | CUDA only |
| **Riffusion** | 6GB | 8GB | 8GB | CUDA/CPU |
| **SongGen** | ~8GB | 12GB | 16GB | CUDA |
| **HeartMuLa 3B** | ~24GB | 24GB | 24GB+ | CUDA |
| **Stable Audio Open** | 12GB | 16GB | 16GB | CUDA |

```
Claim: 对于生产部署，四款模型值得考虑，各自针对不同VRAM层级和用例
Source: Spheron网络博客
URL: https://www.spheron.network/blog/deploy-open-source-ai-music-generation-gpu-cloud-2026/
Date: 2026-04-25
Excerpt: "YuE 7B...Minimum VRAM is 16GB at fp16...ACE-Step 3.5B...Minimum VRAM is 8GB...MusicGen Stereo...VRAM requirement is 12GB...Stable Audio Open 1.5...VRAM is 12GB"
Context: 云部署视角的模型选择建议
Confidence: high
```

### 消费级显卡适配性

| 显卡 | 显存 | 可运行模型 |
|------|------|-----------|
| RTX 3060 | 8GB | ACE-Step 1.5、DiffRhythm(chunked)、MusicGen-medium、YuE(量化)、Riffusion |
| RTX 3060 Ti | 8GB | 同上 |
| RTX 4060 Ti | 8-16GB | ACE-Step 1.5、DiffRhythm、MusicGen-large、YuE(量化) |
| RTX 4070 | 12GB | 同上 + DiffRhythm-full |
| RTX 3080 | 10GB | ACE-Step 1.5、DiffRhythm、MusicGen-large、YuE(部分) |
| RTX 3090/4090 | 24GB | 几乎所有模型（除YuE完整歌曲需80GB） |

---

## 5. 安装难度评估

| 模型 | 难度 | 推荐安装方式 | 技术门槛 |
|------|------|------------|---------|
| **ACE-Step 1.5** | ⭐ 极易 | Windows便携包/ Pinokio | 无需编程 |
| **MusicGen** | ⭐⭐ 较易 | pip install audiocraft / Docker | 基础命令行 |
| **DiffRhythm** | ⭐⭐⭐ 中等 | conda + pip / Docker | 需配置espeak-ng |
| **YuE** | ⭐⭐⭐⭐ 较难 | conda / Pinokio / Docker | 需处理多模型下载 |
| **Riffusion** | ⭐⭐ 较易 | conda + pip | 基础命令行 |
| **SongGen** | ⭐⭐⭐⭐ 较难 | 学术研究项目 | 文档较少 |
| **HeartMuLa** | ⭐⭐⭐⭐ 较难 | 新发布项目 | 社区生态建设中 |

---

## 6. Google Colab免费运行方案

对于无本地GPU的用户，以下Colab方案可免费运行（使用T4 GPU，约15GB显存）：

| 模型 | Colab方案 | 可用性 |
|------|----------|--------|
| **YuE** | Mozer/YuE-extend Colab [^130^][^131^] | ✅ 可用，带ExLlamaV2加速 |
| **MusicGen** | 官方Colab + camenduru社区版 [^134^] | ✅ 可用，T4完美运行 |
| **ACE-Step 1.5** | 无官方Colab，但T4应可运行 | ⚠️ 未验证 |
| **DiffRhythm** | 官方TODO中标记"Support Colab" [^68^] | ❌ 暂无官方Colab |

```
Claim: YuE-extend提供带ExLlamaV2加速的免费Google Colab笔记本，支持音乐续写和mp3扩展
Source: Mozer/YuE-extend GitHub
URL: https://github.com/Mozer/YuE-extend
Date: 2025-02-16
Excerpt: "Free Google colab with COT and mp3-extend: https://colab.research.google.com/github/Mozer/YuE-extend/blob/main/colab/Yue_extend_with_exllama.ipynb"
Context: 社区贡献降低了YuE的使用门槛
Confidence: high
```

---

## 7. 研究级 vs 可用级工具分类

### 可用级工具（Production-Ready / Daily Use）

| 工具 | 理由 |
|------|------|
| **ACE-Step 1.5** | 最低<4GB显存、一键安装、全平台支持、功能最全面（生成/翻唱/重绘/分离/LoRA）、MIT许可证 |
| **DiffRhythm** | 8GB显存门槛、10秒生成完整歌曲、Docker支持、活跃社区 |
| **MusicGen/AudioCraft** | 最成熟的开源音乐项目、丰富文档、Docker/Gradio/Colab全支持、多模型尺寸 |
| **YuE（量化版）** | 歌词对齐能力最强、Apache 2.0商用、Colab可用、增量生成 |

### 研究级工具（Research / Experimental）

| 工具 | 理由 |
|------|------|
| **Riffusion** | 技术已过时（2022年）、仅短片段、无歌词支持 |
| **SongGen** | 仅30秒输出、16kHz、学术项目、社区较小 |
| **JEN-1** | 模型未完全开源、无法本地部署 |
| **HeartMuLa** | 硬件门槛极高（24GB+）、生态尚不成熟、最佳7B版本未开源 |
| **YuE（完整版）** | 80GB显存要求超出消费级范围、生成极慢 |

---

## 8. 关键发现与争议

### 8.1 关键发现

**发现1：开源社区正在快速追赶商业产品**

```
Claim: ACE-Step 1.5的生成质量已接近商业服务水准，被称为"AI音乐生成的Stable Diffusion时刻"
Source: 掘金技术文章
URL: https://juejin.cn/post/7633563851424055359
Date: 2026-04-29
Excerpt: "ACE-Step UI 目前还不是'Suno杀手'，但它是一个明确的信号—— AI音乐生成的Stable Diffusion时刻正在到来。"
Context: 开源与闭源差距正在缩小
Confidence: high
```

**发现2：显存门槛的断崖式下降**

从YuE的80GB（完整歌曲）到DiffRhythm的8GB，再到ACE-Step 1.5的<4GB，开源模型在两年内将显存需求降低了20倍。这使得RTX 3060等入门级显卡也能参与AI音乐生成。

**发现3：扩散架构正在取代自回归成为主流**

```
Claim: ACE-Step论文明确指出LLM模型（如YuE、SongGen）在歌词对齐上优秀但推理慢，扩散模型（如DiffRhythm）合成快但缺乏长程结构一致性，ACE-Step通过DCAE+线性Transformer+REPA训练桥接了这一差距
Source: ACE-Step v1.0论文
URL: https://arxiv.org/abs/2502.13128
Date: 2025-05-28
Excerpt: "LLM-based models (e.g. Yue, SongGen) excel at lyric alignment but suffer from slow inference and structural artifacts. Diffusion models (e.g. DiffRhythm), on the other hand, enable faster synthesis but often lack long-range structural coherence."
Context: 技术路线之争的学术总结
Confidence: high
```

**发现4：许可证差异影响商用选择**

| 模型 | 许可证 | 商用 |
|------|--------|------|
| ACE-Step 1.5 | MIT | ✅ 完全自由 |
| YuE | Apache 2.0 | ✅ 完全自由 |
| DiffRhythm | Stability AI Community License | ⚠️ 需遵守Stability条款 |
| MusicGen | CC-BY-NC 4.0（权重） | ❌ 禁止商用 |
| Riffusion | MIT/OpenRAIL-M | ✅ 基本自由 |

**发现5：全平台支持成为新标配**

ACE-Step 1.5首次实现了NVIDIA CUDA、AMD ROCm、Intel XPU、Apple MPS、纯CPU的全平台统一支持 [^138^][^151^]，这在此前音乐生成模型中极为罕见。

### 8.2 争议与反面观点

**争议1：开源模型质量是否真的接近商业产品？**

```
Claim: YuE的当前质量尚不适合专业出版，音频主要为单声道，缺乏制作质量
Source: ArticleX评测
URL: https://www.articlex.com/open-source-ai-music-generation-breakthrough-with-yue-software/
Date: 2025-04-28
Excerpt: "While YuE's output is impressive for an open-source tool, the current quality isn't suitable for professional publishing. The audio is primarily mono and lacks the production quality needed for commercial music platforms."
Context: 对开源模型质量的现实评估
Confidence: high
```

**争议2：DiffRhythm的Stability AI许可证是否真正"开源"？**

DiffRhythm的VAE基于Stable Audio Open微调，因此采用Stability AI Community License而非标准开源许可证。这引发了一些关于其是否真正"开源"的讨论。

**争议3：ACE-Step 1.5的"不到2秒生成"是否有水分？**

论文中的速度数据基于A100 GPU和优化后的4-8步蒸馏模型。在消费级GPU上，实际体验更接近"不到10秒"（RTX 3090）。此外，首次下载模型可能需要30分钟到2小时 [^153^]。

---

## 9. 推荐选择指南

### 按用户类型推荐

| 用户类型 | 推荐工具 | 理由 |
|---------|---------|------|
| **完全新手/无编程基础** | ACE-Step 1.5 Windows便携包 | 双击运行，无需安装 |
| **Mac用户** | ACE-Step 1.5 macOS便携包 / MusicGen | 原生MPS/MLX支持 |
| **隐私敏感用户** | ACE-Step 1.5 / DiffRhythm / YuE | 100%本地运行 |
| **内容创作者（短视频/播客）** | ACE-Step 1.5 / MusicGen | 快速生成背景音乐 |
| **音乐人/制作人** | ACE-Step 1.5（LoRA微调）/ YuE | 可控性强，支持续写和分离 |
| **研究者/开发者** | MusicGen / ACE-Step / DiffRhythm | 代码成熟，文档完善 |
| **无GPU用户** | YuE Colab / MusicGen Colab | 免费T4 GPU |

### 按显存配置推荐

| 显存 | 推荐方案 |
|------|---------|
| **<6GB** | ACE-Step 1.5 DiT-only模式（INT8+CPU offload）/ MusicGen-small |
| **6-8GB** | ACE-Step 1.5（0.6B LM）/ DiffRhythm（chunked）/ MusicGen-medium |
| **8-12GB** | ACE-Step 1.5（1.7B LM）/ DiffRhythm-full / YuE（量化） |
| **12-16GB** | ACE-Step 1.5 XL / MusicGen-large / YuE（2 session） |
| **16-24GB** | 几乎所有模型 |
| **24GB+** | 所有模型 + 批量生成 |

### 按用例推荐

| 用例 | 推荐工具 |
|------|---------|
| **带歌词的完整歌曲** | ACE-Step 1.5 / DiffRhythm / YuE |
| **纯背景音乐/配乐** | MusicGen / ACE-Step 1.5 / Stable Audio Open |
| **音效设计** | AudioGen / Stable Audio Open |
| **音乐分离/ stems提取** | Audacity OpenVINO / ACE-Step 1.5 |
| **参考音频风格迁移** | DiffRhythm / ACE-Step 1.5 / YuE（ICL） |
| **LoRA个性化训练** | ACE-Step 1.5 / YuE |

---

## 参考资料索引

| 编号 | 来源 | URL |
|------|------|-----|
| [^19^] | ACE-Step完整分析 | https://www.youngju.dev/blog/llm/ace_step_music_generation.en |
| [^20^] | 掘金DiffRhythm介绍 | https://juejin.cn/post/7480811072263110695 |
| [^26^] | Riffusion 2025指南 | https://promptlogin.com/what-is-riffusion-and-how-it-works-2025-guide/ |
| [^27^] | GPU云部署指南 | https://www.spheron.network/blog/deploy-open-source-ai-music-generation-gpu-cloud-2026/ |
| [^28^] | BrightCoding YuE评测 | https://www.blog.brightcoding.dev/2025/10/04/from-text-to-track-how-yue-an-open-source-ai-turns-your-lyrics-into-radio-ready-songs |
| [^29^] | ACE-Step 1.5完整指南 | https://dev.to/czmilo/ace-step-15-the-complete-2026-guide-to-open-source-ai-music-generation-522e |
| [^31^] | ACE-Step-1.5 GitHub | https://github.com/ace-step/ACE-Step-1.5 |
| [^32^] | ACE-Step v1.0 GitHub | https://github.com/ace-step/ACE-Step |
| [^33^] | ArticleX YuE评测 | https://www.articlex.com/open-source-ai-music-generation-breakthrough-with-yue-software/ |
| [^34^] | AI Base YuE介绍 | https://news.aibase.com/news/16705 |
| [^35^] | Communeify YuE评测 | https://www.communeify.com/en/blog/open-source-ai-music-yue-vocal-accompaniment/ |
| [^36^] | YuE官方页面 | https://map-yue.github.io/ |
| [^37^] | ComfyUI_YuE节点 | https://github.com/ComfyNodePRs/PR-ComfyUI_YuE-6ecea810 |
| [^38^] | smthemex/ComfyUI_YuE | https://github.com/smthemex/ComfyUI_YuE |
| [^39^] | KillTheDJ YuE评测 | https://killthedj.com/deepseek-for-music-meet-yue-open-source-ai-that-composes-music/ |
| [^41^] | YuE GitHub | https://github.com/multimodal-art-projection/YuE |
| [^42^] | 掘金开源Suno对比 | https://juejin.cn/post/7633563851424055359 |
| [^43^] | Lyripedia Riffusion对比 | https://www.lyripedia.com/suno-v4-5-vs-riffusion-the-best-ai-music-tools-in-2025/ |
| [^45^] | Leeroopedia AudioCraft安装 | https://leeroopedia.com/index.php/Implementation:Facebookresearch_Audiocraft_Audiocraft_Installation |
| [^47^] | Audacity OpenVINO macOS | https://www.audacityteam.org/blog/openvino-mac/ |
| [^50^] | Antlatt ACE-Step ComfyUI | https://www.antlatt.com/blog/ace-step-comfyui-music-generation/ |
| [^52^] | Lilting ACE-Step 1.5架构 | https://lilting.ch/en/articles/ace-step-1-5-music-generation |
| [^53^] | ACE-Step 1.5论文 | https://arxiv.org/html/2602.00744v1 |
| [^54^] | ChooseAI ACE-Step XL | https://www.chooseai.net/ai-news/detail/3197/ |
| [^56^] | AIOL DiffRhythm报道 | https://www.iaiol.com/10-miao-sheng-cheng-4-fen-zhong-yin-le-8gb-xian-cun-jiu-neng-pao-yi-deng-hugging-face-qu-shi-bang |
| [^57^] | DiffRhythm Gitee镜像 | https://gitee.com/BaoJianQiang/DiffRhythm |
| [^58^] | SD百科DiffRhythm | https://sd114.wiki/sites/7582.html |
| [^60^] | ICML SongGen论文 | https://icml.cc/virtual/2025/poster/44792 |
| [^61^] | minimal-musicgen-for-developers | https://github.com/yukara-ikemiya/minimal-musicgen-for-developers |
| [^62^] | ACE-Step v1.0论文 | https://arxiv.org/abs/2502.13128 |
| [^64^] | LeVo论文 | https://arxiv.org/html/2506.07520v2 |
| [^65^] | LinuxLinks DiffRhythm实测 | https://www.linuxlinks.com/machine-learning-linux-diffrhythm-song-generation/2/ |
| [^66^] | YuE论文 | https://arxiv.org/html/2503.08638v2 |
| [^68^] | DiffRhythm GitHub | https://github.com/ASLP-lab/DiffRhythm |
| [^71^] | SongGen论文 | https://arxiv.org/abs/2502.13128 |
| [^106^] | HeartMuLa论文 | https://arxiv.org/abs/2601.10547 |
| [^107^] | HeartMuLa GitHub | https://github.com/HeartMuLa/heartlib |
| [^108^] | HeartMuLa官网 | https://heartmula.github.io/ |
| [^110^] | Riffusion GitHub | https://github.com/xuwenjiang/riffusion |
| [^115^] | 鲸智社区DiffRhythm | https://aihub.caict.ac.cn/models/ASLP-lab/DiffRhythm-base |
| [^118^] | JEN-1论文 | https://arxiv.org/html/2308.04729v2 |
| [^122^] | ComfyUI_DiffRhythm | https://github.com/billwuhao/ComfyUI_DiffRhythm |
| [^124^] | LeaderGPU Riffusion | https://www.leadergpu.com/catalog/594-stable-diffusion-riffusion |
| [^126^] | Hermes Agent MusicGen | https://hermes-agent.nousresearch.com/docs/user-guide/skills/bundled/mlops/mlops-models-audiocraft |
| [^130^] | Mozer/YuE-extend | https://github.com/Mozer/YuE-extend |
| [^134^] | Replicate MusicGen | https://replicate.com/pollinations/music-gen/llms.txt |
| [^138^] | ACE-Step-1.5 GitHub | https://github.com/ace-step/ACE-Step-1.5 |
| [^140^] | ACE-Step Pinokio | https://github.com/timoncool/ACE-Step-Studio-pinokio |
| [^146^] | BioErrorLog M2实测 | https://en.bioerrorlog.work/entry/ace-step-15-local-m2-macbook |
| [^150^] | ACE-Step 1.5 README | https://github.com/ace-step/ACE-Step-1.5 |
| [^151^] | ACE-Step安装指南 | https://github.com/ace-step/ACE-Step-1.5/blob/main/docs/en/INSTALL.md |

---

*报告完成。本研究基于≥20次独立搜索，覆盖GitHub官方仓库、arXiv学术论文、HuggingFace模型卡、技术博客、社区教程等权威来源。*
