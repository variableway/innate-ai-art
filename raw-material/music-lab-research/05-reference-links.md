# 开源 AI 音乐生成生态全景参考（2026 版）

> 本文档系统梳理 2025-2026 年开源 AI 音乐生成生态的完整版图，涵盖 GitHub 仓库、核心论文、模型权重、社区枢纽、教程指南及商业服务对照。

---

## 目录

1. [GitHub 仓库索引](#1-github-仓库索引)
2. [核心论文](#2-核心论文)
3. [HuggingFace 模型权重](#3-huggingface-模型权重)
4. [社区枢纽](#4-社区枢纽)
5. [教程与指南](#5-教程与指南)
6. [商业服务对照表](#6-商业服务对照表)

---

## 1. GitHub 仓库索引

### 1.1 文本转音频（Text-to-Audio）

开源音乐生成核心模型，从文本/歌词生成完整音乐。

| 项目 | GitHub URL | Stars（约） | 最近更新状态 | 许可证 | 说明 |
|------|-----------|------------|-------------|--------|------|
| **ACE-Step** | [ace-step/ACE-Step](https://github.com/ace-step/ACE-Step) | ~7k+ | 活跃（2026.04 发布 1.5 XL 4B） | Apache 2.0 | ACE Studio + StepFun 联合开发，当前最强开源音乐基础模型，支持 19 种语言 |
| **ACE-Step 1.5** | [ace-step/ACE-Step-1.5](https://github.com/ace-step/ACE-Step-1.5) | ~3k+ | 活跃（2026.04.02 发布 XL） | Apache 2.0 | ACE-Step 最新版本，4B DiT 解码器 |
| **MusicGen / AudioCraft** | [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) | ~21k+ | 维护中（低频更新） | MIT（代码）/ CC-BY-NC 4.0（权重） | Meta FAIR 出品，含 MusicGen、AudioGen、EnCodec、MAGNeT、JASCO |
| **Stable Audio Open** | [stability-ai/stable-audio-tools](https://github.com/stability-ai/stable-audio-tools) | ~6k+ | 活跃 | Stability AI 社区许可 | Stability AI 出品，含训练和推理代码，支持 PyTorch Lightning |
| **SongGeneration (LeVo)** | [tencent-ailab/songgeneration](https://github.com/tencent-ailab/songgeneration) | ~3k+ | 活跃（NeurIPS 2025） | 开源 | 腾讯 AI Lab，LeVo 2 高质量歌曲生成 |
| **YuE** | [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) | ~5k+ | 维护中 | Apache 2.0 | 歌词转完整歌曲（最长 5 分钟），万亿 token 规模 |
| **AudioLDM 2** | [haoheliu/AudioLDM2](https://github.com/haoheliu/AudioLDM2) | ~3k+ | 低频更新 | Apache 2.0 | 基于 CLAP + 潜扩散的文本转音频/音乐 |
| **TANGO** | [declare-lab/tango](https://github.com/declare-lab/tango) | ~1.5k+ | 维护中 | Apache 2.0 | 潜扩散文本转音频，Tango 2 使用 DPO 优化对齐 |

### 1.2 符号音乐生成（Symbolic Music）

基于 MIDI / 乐谱表示的音乐生成。

| 项目 | GitHub URL | Stars（约） | 最近更新状态 | 许可证 | 说明 |
|------|-----------|------------|-------------|--------|------|
| **Magenta** | [magenta/magenta](https://github.com/magenta/magenta) | ~19k+ | **已归档**（2026.01.06） | Apache 2.0 | Google 出品，ML 探索音乐与艺术的先驱项目 |
| **Magenta RealTime** | [magenta/magenta-realtime](https://github.com/magenta/magenta-realtime) | ~1k+ | 活跃（2025.06 发布） | 开源权重 | Magenta 后继项目，实时音乐生成，MusicFX DJ 伴侣 |
| **MuseGAN** | [salu133445/musegan](https://github.com/salu133445/musegan) | ~2.5k+ | 归档 | MIT | 基于 GAN 的多轨多声部符号音乐生成（AAAI 2018） |
| **Museformer** | [microsoft/muzic](https://github.com/microsoft/muzic) | ~3k+ | 低频更新 | MIT | 微软 Muzic 项目，含 Museformer（精细+粗粒度注意力机制） |

### 1.3 语音与歌声（Voice & Singing）

歌声合成、语音克隆和语音转换。

| 项目 | GitHub URL | Stars（约） | 最近更新状态 | 许可证 | 说明 |
|------|-----------|------------|-------------|--------|------|
| **DiffSinger** | [MoonInTheRiver/DiffSinger](https://github.com/MoonInTheRiver/DiffSinger) | ~4k+ | 维护中 | 开源 | 浅层扩散歌声合成（AAAI 2022），社区活跃 |
| **RVC (WebUI)** | [RVC-Project/Retrieval-based-Voice-Conversion-WebUI](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) | ~45k+ | 活跃 | MIT | 基于 VITS 的声音转换，10 分钟数据即可训练 |
| **GPT-SoVITS** | [RVC-Boss/GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS) | ~57k+ | 活跃 | MIT | 1 分钟数据语音克隆，零样本+少样本 TTS |
| **OpenVoice** | [myshell-ai/OpenVoice](https://github.com/myshell-ai/OpenVoice) | ~32k+ | 维护中 | MIT | MyShell + MIT，即时语音克隆，多语言风格控制 |
| **CosyVoice** | [FunAudioLLM/CosyVoice](https://github.com/FunAudioLLM/CosyVoice) | ~16k+ | 活跃（Fun-CosyVoice 3.0） | 阿里开源许可 | 阿里通义团队，零样本语音克隆，多语言 TTS |
| **BEGANSing** | [SoonbeomChoi/BEGANSing](https://github.com/SoonbeomChoi/BEGANSing) | ~100+ | 低频更新 | 研究用途 | 韩语歌声合成，文本+MIDI 输入 |

### 1.4 DAW 插件（DAW Plugins）

直接集成到数字音频工作站（DAW）的 AI 音乐工具。

| 项目 | GitHub URL | Stars（约） | 最近更新状态 | 许可证 | 说明 |
|------|-----------|------------|-------------|--------|------|
| **gary4juce** | [betweentwomidnights/gary4juce](https://github.com/betweentwomidnights/gary4juce) | ~500+ | 维护中 | 开源 | JUCE 框架 DAW 插件，内含 6 个 AI 音乐模型（含 MusicGen） |
| **OBSIDIAN Neural** | [innermost47/ai-dj](https://github.com/innermost47/ai-dj) | ~300+ | 活跃 | 开源 | VST3 插件，8 轨 AI 实时生成，MIDI 触发，节拍同步循环 |
| **MAGDA** | [Conceptual-Machines/magda-core](https://github.com/Conceptual-Machines/magda-core) | ~1k+ | 活跃（v0.5.0） | 开源 | 完整 AI DAW，C++20 + JUCE + Tracktion Engine，混合轨道 AI 能力 |

### 1.5 工具链（Tools）

音频处理、分离和节点式工作流工具。

| 项目 | GitHub URL | Stars（约） | 最近更新状态 | 许可证 | 说明 |
|------|-----------|------------|-------------|--------|------|
| **Demucs** | [facebookresearch/demucs](https://github.com/facebookresearch/demucs) | ~13k+ | 维护中 | MIT | Meta 出品，Hybrid Transformer Demucs v4（htdemucs），音源分离 SOTA |
| **Spleeter** | [deezer/spleeter](https://github.com/deezer/spleeter) | ~26k+ | 低频更新 | MIT | Deezer 出品，TF 音源分离先驱（已被 Demucs 超越） |
| **BandSplitRNN** | [amanteur/BandSplitRNN-Pytorch](https://github.com/amanteur/BandSplitRNN-Pytorch) | ~500+ | 维护中 | 研究用途 | Band-Split RNN 音源分离非官方 PyTorch 实现 |
| **ComfyUI ACE-Step** | ComfyUI 原生支持 | — | 活跃 | — | ACE-Step 已原生集成至 ComfyUI，支持节点化音乐生成工作流 |
| **ComfyUI_DiffRhythm** | [ComfyUI 节点](https://comfyui.org/en/generate-music-with-comfyui-diffrhythm) | — | 活跃 | — | ComfyUI 内完整歌曲生成节点 |
| **ComfyUI_StableAudio** | ComfyUI Partner Nodes | — | 活跃 | — | Stable Audio 2.5 官方 ComfyUI 节点 |
| **ComfyUI_AudioTools** | [billwuhao/ComfyUI_AudioTools](https://github.com/billwuhao/ComfyUI_AudioTools) | ~500+ | 活跃 | 开源 | ComfyUI 音频处理工具箱，含人声分离、音频合并等 |

---

## 2. 核心论文

AI 音乐生成领域里程碑式论文及其 arxiv 链接。

### 2.1 MusicGen — Simple and Controllable Music Generation

- **作者：** Jade Copet, Felix Kreuk, Itai Gat, Tal Remez, David Kant, Gabriel Synnaeve, Yossi Adi, Alexandre Defossez
- **机构：** Meta AI (FAIR)
- **arxiv：** [https://arxiv.org/abs/2306.05284](https://arxiv.org/abs/2306.05284)
- **发表：** NeurIPS 2023
- **简介：** 单阶段自回归 Transformer 模型，基于 EnCodec 压缩表示，支持文本和旋律双条件控制音乐生成。性能超越 MusicLM 和 Riffusion。

### 2.2 AudioLDM — Text-to-Audio Generation with Latent Diffusion Models

- **作者：** Haohe Liu et al.
- **机构：** 伦敦帝国理工学院等
- **arxiv：** [https://arxiv.org/abs/2301.12503](https://arxiv.org/abs/2301.12503)
- **发表：** ICML 2023
- **简介：** 首个基于 CLAP + 潜扩散模型的文本转音频系统，支持零样本文本引导音频操控（如风格迁移），覆盖语音、音效和音乐。

### 2.3 Stable Audio — Fast Timing-Conditioned Latent Audio Diffusion

- **作者：** Jade Copet et al. (Stability AI)
- **arxiv：** [https://arxiv.org/abs/2402.04825](https://arxiv.org/abs/2402.04825)
- **发表：** 2024
- **简介：** 基于全卷积 VAE 的潜扩散模型，支持文本 + 时序嵌入条件控制，可在 A100 上 8 秒生成 95 秒 44.1kHz 立体声音频。

### 2.4 ACE-Step — A Step Towards Music Generation Foundation Model

- **作者：** Junmin Gong, Wenxiao Zhao, Sen Wang, Shengyuan Xu, Jing Guo
- **机构：** ACE Studio + StepFun
- **arxiv：** [https://arxiv.org/abs/2506.00045](https://arxiv.org/abs/2506.00045)
- **发表：** 2025
- **简介：** 开源音乐基础模型，融合扩散生成 + DCAE + 轻量 Transformer + REPA 对齐。A100 上 20 秒生成 4 分钟音乐（比 LLM 方案快 15 倍），支持声音克隆、歌词编辑、混音和分轨生成。

### 2.5 DiffSinger — Singing Voice Synthesis via Shallow Diffusion Mechanism

- **作者：** Jinglin Liu et al.
- **机构：** 浙江大学等
- **arxiv：** [https://arxiv.org/abs/2105.02446](https://arxiv.org/abs/2105.02446)
- **发表：** AAAI 2022
- **简介：** 参数化马尔可夫链浅层扩散机制，将噪声迭代转化为条件化 mel 频谱图，实现高质量歌声合成。DiffSinger 社区已成为歌声合成的核心基础设施。

### 2.6 LeVo (SongGeneration) — High-Quality Song Generation with Multi-Preference Alignment

- **作者：** Tencent AI Lab
- **arxiv：** [https://arxiv.org/abs/2506.07520](https://arxiv.org/abs/2506.07520)
- **发表：** NeurIPS 2025
- **简介：** 腾讯 AI Lab 基于语言模型的歌曲生成框架，使用双轨 token 预测（人声 + 伴奏）和多偏好对齐，支持歌词、参考音频和文本描述三阶段管线生成。

### 2.7 TANGO 2 — Aligning Diffusion-based Text-to-Audio Generations

- **作者：** DECLARE-Lab
- **arxiv：** [https://arxiv.org/abs/2404.09956](https://arxiv.org/abs/2404.09956)
- **发表：** 2024
- **简介：** 在 TANGO 基础上使用 DPO（Direct Preference Optimization）损失微调，提升生成音频与文本提示的对齐质量。

### 2.8 YuE — Scaling Open Foundation Models for Long-Form Music Generation

- **作者：** Multimodal Art Projection (m-a-p) 团队
- **arxiv：** [https://arxiv.org/abs/2503.08638](https://arxiv.org/abs/2503.08638)
- **发表：** 2025
- **简介：** 开源长篇音乐基础模型，支持歌词到完整歌曲转换，可生成最长 5 分钟音乐，保持歌词对齐、结构连贯和人声旋律。

---

## 3. HuggingFace 模型权重

各大开源模型的 HuggingFace 模型卡直链。

### 3.1 文本转音频模型

| 模型 | HuggingFace URL | 参数量 | 备注 |
|------|----------------|--------|------|
| **ACE-Step v1 3.5B** | [ACE-Step/ACE-Step-v1-3.5B](https://huggingface.co/ACE-Step/ACE-Step-v1-3.5B) | 3.5B | 支持 LoRA 微调、ControlNet |
| **MusicGen Small** | [facebook/musicgen-small](https://huggingface.co/facebook/musicgen-small) | 300M | 入门级，文本转 30s 音乐 |
| **MusicGen Medium** | [facebook/musicgen-medium](https://huggingface.co/facebook/musicgen-medium) | 1.5B | 中等规模 |
| **MusicGen Large** | [facebook/musicgen-large](https://huggingface.co/facebook/musicgen-large) | 3.3B | 大规模，高质量 |
| **MusicGen Melody** | [facebook/musicgen-melody](https://huggingface.co/facebook/musicgen-melody) | 1.5B | 支持旋律条件输入 |
| **Stable Audio Open 1.0** | [stabilityai/stable-audio-open-1.0](https://huggingface.co/stabilityai/stable-audio-open-1.0) | ~1.2B | 最长 47s，44.1kHz 立体声 |
| **Stable Audio Open Small** | [stabilityai/stable-audio-open-small](https://huggingface.co/stabilityai/stable-audio-open-small) | 341M | Arm CPU 优化，设备端推理 |
| **SongGeneration (LeVo)** | [tencent/SongGeneration](https://huggingface.co/tencent/SongGeneration) | — | 腾讯 AI Lab 官方权重 |
| **AudioLDM 2 Large** | [cvssp/audioldm2-large](https://huggingface.co/cvssp/audioldm2-large) | — | 文本转音乐/音效 |

### 3.2 语音与歌声模型

| 模型 | HuggingFace URL | 备注 |
|------|----------------|------|
| **GPT-SoVITS 预训练** | [lj1995/GPT-SoVITS](https://huggingface.co/lj1995/GPT-SoVITS) | 语音克隆预训练权重 |
| **OpenVoice V2** | [myshell-ai/OpenVoiceV2](https://huggingface.co/myshell-ai/OpenVoiceV2) | 即时语音克隆 |
| **Fun-CosyVoice3-0.5B** | 阿里 ModelScope + HuggingFace | 零样本语音克隆，0.5B 轻量版 |

### 3.3 音源分离模型

| 模型 | HuggingFace URL | 备注 |
|------|----------------|------|
| **Demucs (htdemucs)** | 集成在 [facebookresearch/demucs](https://github.com/facebookresearch/demucs) | 4 轨分离（人声/鼓/贝斯/其他） |
| **Spleeter** | 集成在 [deezer/spleeter](https://github.com/deezer/spleeter) | 2/4/5 轨分离 |

---

## 4. 社区枢纽

AI 音乐创作者聚集的主要社区平台。

### 4.1 Reddit 社区

| 社区 | URL | 说明 |
|------|-----|------|
| **r/aiMusic** | [reddit.com/r/aiMusic](https://www.reddit.com/r/aiMusic/) | AI 音乐综合讨论，分享作品与工具 |
| **r/SunoAI** | [reddit.com/r/SunoAI](https://www.reddit.com/r/SunoAI/) | Suno 用户社区 |
| **r/AudioAI** | [reddit.com/r/AudioAI](https://www.reddit.com/r/AudioAI/) | AI 音频技术讨论 |
| **r/comfyui** | [reddit.com/r/comfyui](https://www.reddit.com/r/comfyui/) | ComfyUI 用户社区（含音频工作流） |
| **r/AceStep** | [reddit.com/r/AceStep](https://www.reddit.com/r/AceStep/) | ACE-Step 用户讨论社区 |

### 4.2 Discord 服务器

| 社区 | 说明 |
|------|------|
| **ACE-Step Discord** | ACE-Step 官方 Discord（从 GitHub 主页链接进入） |
| **AI:Underground** | 创作者主导的 AI 音乐社区，分享作品、协作开发 |
| **DISBOARD AI-Music 标签** | [disboard.org/servers/tag/ai-music](https://disboard.org/servers/tag/ai-music) — 多个 AI 音乐服务器目录 |
| **Discadia AI Music** | [discadia.com/?q=ai%20music](https://discadia.com/?q=ai%20music) — 热门 AI 音乐服务器排行 |

### 4.3 论坛与博客

| 平台 | URL | 说明 |
|------|-----|------|
| **Gearspace** | [gearspace.com](https://gearspace.com/) | 专业音频工程论坛，有 AI DAW/插件讨论区 |
| **vi-control.net** | [vi-control.net](https://vi-control.net/) | 虚拟乐器社区，ACE-Step 等模型伦理讨论 |
| **AI Music Lab（Substack）** | AI 音乐文化地图与深度分析 |
| **HuggingFace Papers** | [huggingface.co/papers](https://huggingface.co/papers) | 最新音频/音乐论文追踪 |

### 4.4 GitHub Awesome 列表

| 项目 | URL | 说明 |
|------|-----|------|
| **genmusic_demo_list** | [affige/genmusic_demo_list](https://github.com/affige/genmusic_demo_list) | 音乐生成 Demo 网站汇总 |
| **Awesome AudioCraft** | [mefengl/awesome-audiocraft](https://github.com/meflingen/awesome-audiocraft) | AudioCraft/MusicGen 资源列表 |
| **Awesome SVS & SVC** | [guan-yuan/Awesome-Singing-Voice-Synthesis-and-Singing-Voice-Conversion](https://github.com/guan-yuan/Awesome-Singing-Voice-Synthesis-and-Singing-Voice-Conversion) | 歌声合成与转换论文/项目列表 |

---

## 5. 教程与指南

### 5.1 入门教程与博客

| 资源 | URL | 说明 |
|------|-----|------|
| **ACE-Step 1.5 完整指南** | [dev.to/czmilo/ace-step-15-the-complete-2026-guide](https://dev.to/czmilo/ace-step-15-the-complete-2026-guide-to-open-source-ai-music-generation-522e) | 2026 年最全面的 ACE-Step 使用指南 |
| **ACE-Step 本地安装教程** | [pub.towardsai.net](https://pub.towardsai.net/generate-music-with-ai-locally-using-ace-step-one-click-text-to-music-model-a1dabd92c935) | 一键本地文本转音乐教程 |
| **MusicGen 官方文档** | [facebookresearch/audiocraft/docs/MUSICGEN.md](https://github.com/facebookresearch/audiocraft/blob/main/docs/MUSICGEN.md) | Meta 官方 MusicGen 使用说明 |
| **Stable Audio Demo** | [stability-ai.github.io/stable-audio-open-demo](https://stability-ai.github.io/stable-audio-open-demo/) | Stable Audio Open 官方 Demo |
| **HuggingFace Diffusers AudioLDM 2** | [huggingface.co/docs/diffusers/api/pipelines/audioldm2](https://huggingface.co/docs/diffusers/api/pipelines/audioldm2) | AudioLDM 2 Diffusers 集成教程 |
| **RVC 云端部署指南** | [runpod.io/articles/guides/ai-engineer-guide-rvc-cloud](https://www.runpod.io/articles/guides/ai-engineer-guide-rvc-cloud) | RunPod 上的 RVC 部署完整指南 |

### 5.2 YouTube 频道与视频

| 频道/视频 | 说明 |
|----------|------|
| **Two Minute Papers** | Károly Zsolnai-Fehér 出品，快速解读最新 AI 研究论文（含音乐/音频生成） |
| **AI Coffee Break with Letitia** | AI 概念易懂讲解，适合理解音乐模型背后的技术原理 |
| **ACE-Step: The BEST Local AI Music Gen Yet** | [YouTube](https://www.youtube.com/watch?v=1SihhqPR0S8) — 本地安装与测试 |
| **RVC Tutorial 2025** | [YouTube](https://www.youtube.com/watch?v=_V15jq9zSJw) — 最新 RVC 声音转换教程 |
| **Foundation-1: Finally AI for Music Production** | [YouTube](https://www.youtube.com/watch?v=CMuwP0u-Sjg) — 开源 AI 音乐制作工具 |

### 5.3 ComfyUI 音频工作流资源

| 资源 | URL | 说明 |
|------|-----|------|
| **Comfy 音频工作流中心** | [comfy.org/workflows/category/audio](https://www.comfy.org/workflows/category/audio/) | 官方音频生成工作流模板 |
| **ACE-Step ComfyUI 支持** | [comfyui.org/en/comfyui-now-supports-ace-step](https://comfyui.org/en/comfyui-now-supports-ace-step) | ACE-Step 原生 ComfyUI 集成 |
| **Stable Audio 2.5 in ComfyUI** | [blog.comfy.org/p/stable-audio-25-is-now-in-comfyui](https://blog.comfy.org/p/stable-audio-25-is-now-in-comfyui) | Stable Audio 2.5 Partner Nodes |

---

## 6. 商业服务对照表

主流商业 AI 音乐服务及其对应的开源替代方案。

### 6.1 商业服务概览

| 商业服务 | 定位 | 核心能力 | 价格模型 |
|---------|------|---------|---------|
| **Suno** | 全民音乐创作平台 | 文本转完整歌曲（含人声），简单易用 | 免费 + 订阅制 |
| **Udio** | 高质量 AI 音乐 | 文本转歌，音频扩展，更强控制力 | 免费 + 订阅制 |
| **AIVA** | 专业作曲辅助 | 管弦乐/电影配乐，乐谱导出 | 免费 + Pro 订阅 |
| **Amper (Shutterstock)** | 商用版权音乐 | 无版权音乐生成，集成素材平台 | 订阅制 |
| **Boomy** | 即时音乐创作 | 快速生成，流媒体收益分成 | 免费 + 订阅制 |

### 6.2 开源替代方案对照

| 商业服务能力 | 最接近的开源方案 | 对应 GitHub/HuggingFace |
|-------------|----------------|------------------------|
| **Suno 全歌生成** | ACE-Step 1.5 | [ace-step/ACE-Step-1.5](https://github.com/ace-step/ACE-Step-1.5) — 被社区称为"开源版 Suno" |
| **Suno 全歌生成** | YuE | [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) — 歌词转完整歌曲 |
| **Suno 全歌生成** | LeVo (SongGeneration) | [tencent-ailab/songgeneration](https://github.com/tencent-ailab/songgeneration) — 高质量双轨歌曲 |
| **Udio 高质量音乐** | ACE-Step 1.5 XL | 4B 参数 DiT，商业级音质 |
| **短片段/音效生成** | MusicGen | [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) — 成熟稳定 |
| **音效/背景音** | Stable Audio Open | [stabilityai/stable-audio-open-1.0](https://huggingface.co/stabilityai/stable-audio-open-1.0) |
| **AIVA 作曲辅助** | Magenta / Museformer | [microsoft/muzic](https://github.com/microsoft/muzic) — 符号音乐生成 |
| **Boomy 快速节拍** | MusicGen Small | 300M 参数，适合快速音效和短片段 |
| **声音克隆** | GPT-SoVITS / OpenVoice | 1 分钟数据即可克隆 |
| **歌声合成** | DiffSinger | 歌谱驱动的歌声合成 |
| **人声分离** | Demucs / Spleeter | [facebookresearch/demucs](https://github.com/facebookresearch/demucs) |
| **DAW 内 AI** | gary4juce / MAGDA / OBSIDIAN Neural | JUCE 插件 + 完整 AI DAW |

### 6.3 能力矩阵对比

| 能力维度 | Suno/Udio | ACE-Step | MusicGen | Stable Audio | YuE | LeVo |
|---------|-----------|----------|----------|-------------|-----|------|
| 完整歌曲 | 强 | 强 | 弱（30s） | 中（47s） | 强（5min） | 强 |
| 人声生成 | 强 | 强 | 无 | 无 | 强 | 强 |
| 歌词对齐 | 强 | 强 | 无 | 无 | 强 | 强 |
| 旋律控制 | 中 | 强 | 强 | 中 | 中 | 中 |
| 多语言 | 中 | 19 种 | 英语为主 | 英语为主 | 多语言 | 多语言 |
| 本地运行 | 否 | 是 | 是 | 是 | 是 | 是 |
| 推理速度 | 云端 | 快（15x LLM） | 中 | 快 | 慢 | 中 |
| 商用许可 | 订阅 | Apache 2.0 | CC-BY-NC | 社区许可 | Apache 2.0 | 开源 |

---

## 附录：快速入门推荐路径

### 入门路径 A：快速体验（零代码）

1. 访问 HuggingFace Spaces 上的 ACE-Step / MusicGen Demo
2. 输入文本描述，生成音乐
3. 使用 ComfyUI 可视化工作流深入探索

### 入门路径 B：本地部署

1. 安装 Python 3.10+、PyTorch、CUDA
2. 克隆 ACE-Step：`git clone https://github.com/ace-step/ACE-Step.git`
3. 运行 `acestep` 启动 Gradio 界面
4. 参考本文档 HuggingFace 章节下载模型权重

### 入门路径 C：DAW 集成

1. 安装 MAGDA（完整 AI DAW）或 gary4juce（插件）
2. 在 DAW 中使用 AI 辅助创作
3. 搭配 Demucs 进行音源分离后处理

---

> **文档更新日期：** 2026 年 5 月
> **数据来源：** GitHub、arxiv、HuggingFace、Reddit、Discord 社区
> **注意：** Star 数量为近似值，请访问各仓库主页获取实时数据。
