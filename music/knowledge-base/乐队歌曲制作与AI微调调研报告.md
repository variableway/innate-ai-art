# 乐队歌曲制作与 AI 微调调研报告

> 调研日期：2026-05-12
> 背景：当乐队有真实演奏需求，或 AI 生成效果不理想时，如何用最简单的方式完成作品

---

## 目录

- [第一部分：乐队歌曲最简制作流程](#第一部分乐队歌曲最简制作流程)
- [第二部分：AI 音乐微调与 Fine-Tuning](#第二部分ai-音乐微调与-fine-tuning)
- [第三部分：Auto Music Studio 现有能力与差距](#第三部分auto-music-studio-现有能力与差距)
- [第四部分：实操方案推荐](#第四部分实操方案推荐)

---

## 第一部分：乐队歌曲最简制作流程

### 1.1 三种预算方案

#### 方案一：零成本（$0）

```
手机录音
  → BandLab App（免费 DAW，iOS + Android）
  → BandLab Mastering（免费 AI 母带处理）
  → SoundCloud / 网易云音乐（免费发行）
```

**适用场景**：快速出 Demo，验证歌曲想法
**限制**：手机麦克风音质有限，不适合正式发行

#### 方案二：入门级（~$200-250 一次性投入）

```
Focusrite Scarlett 2i2 声卡（~$170-225）
  + Reaper DAW（$60，无限期试用免费）
  + BandLab Mastering（免费）
  + DistroKid 发行（$22/年）
```

**适用场景**：半专业品质 Demo，小规模发行
**优势**：2 进 2 出支持同时录两路（吉他+人声 / 立体声键盘）

#### 方案三：专业级（~$310 设备 + $35-55/月）

```
Focusrite Scarlett 4i4 声卡（~$250-300）
  + Reaper DAW（$60）
  + LANDR Pro 母带+发行（$39/月）
  + LALAL.AI Stem 分离（$15-25/月）
```

**适用场景**：正式发行品质
**优势**：4 进 4 出支持同时录制多路乐器

### 1.2 录音设备推荐

| 设备 | 价格 | 通道数 | 适用场景 |
|------|------|--------|---------|
| **Focusrite Scarlett 2i2** | ~$170-225 | 2进2出 | 1-2人同时录音（推荐入门） |
| **Focusrite Scarlett 4i4** | ~$250-300 | 4进4出 | 小型乐队同时录音 |
| **Behringer UMC404HD** | ~$150-180 | 4进4出 | 预算型4通道选择 |
| **手机 + USB-C 声卡** | ~$50-100 | 1-2进 | 移动录音 |

### 1.3 DAW（数字音频工作站）对比

| DAW | 价格 | 难度 | 平台 | 推荐场景 |
|-----|------|------|------|---------|
| **BandLab** | 完全免费 | 最低 | Web + iOS + Android | 零门槛入门，内置 AI 母带 |
| **GarageBand** | 免费（Apple） | 低 | Mac + iOS | Apple 用户首选，虚拟乐器好 |
| **Reaper** | $60（试用免费） | 中 | 全平台 | **最佳长期投资**，功能全面 |
| **Audacity** | 免费 | 中 | 全平台 | 录音/编辑好，但**不适合混音**（无实时效果） |
| **Ardour** | 免费 | 高 | 全平台 | 专业级开源 DAW，学习曲线陡 |

### 1.4 录音策略

**策略 A：分轨叠加录制（推荐新手）**

```
第1轨：录制节拍/鼓 →
第2轨：录制贝斯 →
第3轨：录制吉他 →
第4轨：录制键盘 →
第5轨：录制人声
```

优势：只需 2 通道声卡，每轨音质最优
劣势：缺少乐队互动感

**策略 B：同步录音**

```
所有人同时演奏 → 声卡 4+ 通道 → 后期分轨混音
```

优势：保留乐队互动和现场感
劣势：需要更多设备和麦克风

### 1.5 AI 混音与母带工具

| 工具 | 价格 | 特色 | 推荐度 |
|------|------|------|--------|
| **BandLab Mastering** | 完全免费 | 唯一完全免费无限使用的 AI 母带 | 必用 |
| **LANDR** | $6-39/月 | 母带 + 发行 + 插件一体化，最全面 | 专业首选 |
| **eMastered** | ~$15/月 | 手动控制最多，可调参数细致 | 进阶使用 |
| **CloudBounce** | $4-9.90/首 | 单曲付费最便宜 | 偶尔使用 |
| **RoEx Automix** | 付费 | **唯一自动化混音（不只是母带）** | 混音小白救星 |
| **iZotope Ozone** | ~$49-249 | 业界标准 AI 母带插件 | 专业混音师 |

### 1.6 AI Stem 分离（将混音拆为单轨）

乐队录音后，如果需要重新混音但只有立体声文件，可以用 AI 拆分：

| 工具 | 价格 | 质量 | 特色 |
|------|------|------|------|
| **Demucs**（开源） | 免费 | 优秀 | Meta 开源，本地运行，`acemusic stems` 已集成 |
| **Ultimate Vocal Remover (UVR)** | 免费 | 优秀 | 社区最爱的免费分离工具 |
| **LALAL.AI** | $15-25/月 | **最佳** | 最多10种音轨类型，专业级 |
| **Moises** | $35-95/年 | 良好 | 适合乐手练习，含和弦/音高检测 |
| **SplitHit** | 免费+内购 | 良好 | 手机端快速分离 |

### 1.7 最简制作管线总结

```
┌─────────────────────────────────────────────────────────────────┐
│  乐队最简制作管线（~$200 投入）                                   │
│                                                                   │
│  1. 录音：Focusrite 2i2 + Reaper                                 │
│     └─ 分轨录制：鼓 → 贝斯 → 吉他 → 键盘 → 人声                  │
│                                                                   │
│  2. 混音：Reaper 内基础调整                                       │
│     └─ 音量平衡 + Pan + 简单 EQ + 混响                            │
│     └─ 或用 RoEx Automix（AI 自动混音）                           │
│                                                                   │
│  3. 母带：BandLab Mastering（免费 AI 母带）                       │
│     └─ 目标 -14 LUFS（Spotify/Apple Music 标准）                  │
│                                                                   │
│  4. 发行：DistroKid（$22/年）→ Spotify/Apple Music/网易云          │
│                                                                   │
│  预计时间：2-4 小时/首（含录音+混音+母带）                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 第二部分：AI 音乐微调与 Fine-Tuning

### 2.1 问题诊断：先确定哪里不好

| 问题类型 | 具体表现 | 解决方向 |
|---------|---------|---------|
| **风格不对** | 生成的是摇滚但想要民谣 | Prompt 优化 |
| **音质差** | 动态窄、频率不平衡、响度不一致 | 后期处理（EQ/压缩/母带） |
| **人声不好** | 发音怪、气口生硬、音准差 | Prompt 调参 或 声线替换 |
| **结构散** | 没有明显的 Verse-Chorus 区分 | Meta Tags + 歌词结构优化 |
| **风格一致性差** | 每次生成都不同，无法复现 | Seed 锁定 + LoRA 微调 |
| **缺少个人特色** | 所有歌听起来像同一人 | LoRA 微调 或 声线克隆 |

### 2.2 第一层：Prompt 工程优化（最简单，立即见效）

#### Suno Prompt 五要素公式

```
1. 流派+子流派    → "90s grunge, alternative rock"（不要只写 "rock"）
2. 情绪+能量      → "melancholic, brooding, aggressive"
3. 人声方向       → "raspy female vocals, breathy delivery, reverb-drenched"
4. 乐器细节       → "clean jangly Telecaster, Rhodes electric piano"（不要只写 "guitar"）
5. 制作+速度      → "lo-fi tape hiss, polished radio-ready mix, 128 BPM"
```

**目标 8-15 个标签**，超过 20 个会稀释效果，少于 5 个太模糊。

#### ACE-Step 关键参数调优

| 参数 | 默认值 | 范围 | 作用 |
|------|--------|------|------|
| `inference_steps` | 8 | Turbo: 1-20 (推荐8); Base: 1-200 (推荐32-64) | 去噪步数，越多质量越好但越慢 |
| `guidance_scale` | 7.0 | 1.0-15.0 (常用 5.0-9.0) | 越高越遵循 Prompt，但可能过饱和 |
| `seed` | -1 | 任意正整数; -1=随机 | 锁定种子可复现结果 |
| `temperature` | 0.85 | 0.0-2.0 | 越低越保守，越高越有创意 |
| `shift` | 1.0 | 1.0-5.0 | Turbo 推荐 3.0 |
| `infer_method` | "ode" | "ode" 或 "sde" | ODE 更快更确定，SDE 增加变化 |

**社区经验**：DiT 步数设 20 + 启用 Think + Parallel Thinking + CaptionRewrite 效果最佳。

#### 歌词结构优化

```
好歌词结构（用 Meta Tags 控制）：

[Intro]                    ← 开场氛围，8-16小节
[Verse 1]                  ← 主歌叙事，4-8行
[Pre-Chorus]               ← 情绪攀升，2-4行
[Chorus]                   ← 核心记忆点，2-4行，必须押韵
[Verse 2]                  ← 故事继续
[Pre-Chorus]               ← 再次攀升
[Chorus]                   ← 强化 Hook
[Bridge]                   ← 转折对比，换韵换调
[Chorus]                   ← 最终高潮
[Outro]                    ← 收束

括号内演唱提示：(whispered), (belted), (building intensity)
```

### 2.3 第二层：后期音频处理（中等难度）

#### Stem 分离 → 单轨处理 → 重混音

```
AI 生成的完整歌曲
    ↓
Stem 分离（Demucs / acemusic stems）
    ↓  拆分为：人声 / 鼓 / 贝斯 / 其他
    ↓
单轨处理：
    ├─ 人声：EQ（去低频隆隆声 +3kHz提升清晰度）+ 压缩 + 混响
    ├─ 鼓：EQ（增强打击感）+ 压缩 + 轻微混响
    ├─ 贝斯：EQ（保留低频清晰度）+ 压缩
    └─ 其他：EQ + 立体声展宽
    ↓
重新混音：音量平衡 → Pan 声像 → 总线 EQ → 总线压缩
    ↓
母带处理：响度标准化（-14 LUFS）→ 最终 EQ 微调 → 立体声展宽
```

#### 关键处理参数

| 处理 | 目标 | 参数参考 |
|------|------|---------|
| **EQ（人声）** | 清晰温暖 | 高通 80Hz, +3dB @3kHz, -2dB @200Hz |
| **压缩（人声）** | 均匀音量 | Ratio 3:1, Threshold -18dB, Attack 10ms |
| **混响（人声）** | 空间感 | Plate/Room, Decay 1.2-2.0s, Mix 15-25% |
| **EQ（鼓）** | 打击感 | 高通 60Hz, +3dB @5kHz |
| **响度标准化** | 流媒体标准 | -14 LUFS（Spotify/Apple Music） |
| **立体声展宽** | 空间感 | 低频 Mono, 高频 +20-40% 展开 |

### 2.4 第三层：LoRA 微调（高难度，但效果最强）

#### 什么是 LoRA？

LoRA（Low-Rank Adaptation）冻结预训练模型权重，只训练小型"适配器"矩阵。大幅降低训练成本和显存需求，同时保持模型质量。

**费用**：$50-$300/次训练

#### ACE-Step LoRA 训练（官方支持）

**硬件要求**：
| 配置 | 可行性 |
|------|--------|
| 16 GB VRAM | 可训练（长歌可能 OOM） |
| 20 GB+ VRAM | 推荐（~17 GB 训练占用） |

**数据准备**（每首歌需要）：
1. 音频文件（.mp3 / .wav / .flac / .ogg / .opus）
2. 歌词文件（.lyrics.txt，文件名与音频匹配）
3. 标注数据（JSON：caption, bpm, keyscale, timesignature, language）

**训练参数**：
| 参数 | 建议值 |
|------|--------|
| 数据量 | 10-20首歌 → 800 epochs; ~100首歌 → 500 epochs |
| Batch Size | 1（默认）; VRAM 充裕可设 2-4 |
| 保存频率 | 数据少时更频繁保存 |

**LoKr 替代方案**（推荐）：
- LoKr（Low-rank Kronecker product）比 LoRA **快 10 倍**
- LoRA 需 1 小时的训练，LoKr 只需 ~5 分钟
- LoKr 学习率 0.03 vs LoRA 的 1e-4
- LoKr 500 epochs vs LoRA 的 10

**完整工作流**：
```
准备数据 → Gradio UI 加载 → LM 自动标注 → 保存数据集 →
预处理为张量 → 训练 LoRA/LoKr → 加载训练权重 → 生成
```

#### 其他模型的 LoRA

| 模型 | LoRA 支持 | 说明 |
|------|----------|------|
| **ACE-Step** | 官方支持 | 最完整的 LoRA/LoKr 训练教程 |
| **MusicGen** | 社区支持 | HuggingFace 有教程，需本地 GPU |
| **Stable Audio** | 社区实现 | 无官方支持，社区有非官方方案 |
| **Suno** | **不支持** | 闭源平台，只能通过 Prompt 优化 |
| **Udio** | **不支持** | 无公开微调 API |
| **DiffRhythm** | 无文档 | 仅通过 Prompt 定制 |
| **YuE** | 开发中 | GitHub Issue #60 讨论中 |

### 2.5 第四层：声线克隆（中等难度）

#### RVC（推荐方案）

RVC（Retrieval-based Voice Conversion）是最流行的开源声线克隆工具。

**数据要求**：最少 **10 分钟**干净人声录音即可训练出不错的模型。

**硬件要求**：消费级 GPU（4-6 GB VRAM 即可），也支持 Google Colab 免费训练。

**数据准备**：
```
原始录音
  → 用 Ultimate Vocal Remover 分离出纯人声
  → 用 ffmpeg 裁剪为短片段
  → 去除静音段和噪音
  → 目标：10-30 分钟干净人声
```

**RVC vs So-VITS-SVC 对比**：

| 方面 | RVC | So-VITS-SVC |
|------|-----|-------------|
| 数据量 | 10-30 分钟 | 30 分钟到数小时 |
| 训练时间 | < 1 小时 | 数小时到数天 |
| GPU 要求 | 4-6 GB（更友好） | 8 GB+ |
| 人声质量 | 更干净、少伪影 | 偶有伪影 |
| 社区活跃度 | 非常活跃 | 较少维护 |
| **推荐度** | **首选** | 备选 |

#### 声线克隆的法律风险

| 法律框架 | 核心内容 |
|---------|---------|
| **NO FAKES Act**（美国联邦） | 保护声音/形象权，未经授权克隆违法 |
| **ELVIS Act**（田纳西州） | 明确保护声音不被 AI 克隆 |
| 中国法规 | 2025.9 起需显式+隐式标识 AI 内容 |

**安全实践**：
- 只克隆自己的声音，或获得声音所有者书面授权
- 注册版权，在原创作品中嵌入水印
- 未经授权克隆他人声音可能导致法律纠纷和声誉损失

### 2.6 第五层：混合方法（AI + 人类演奏）

#### 方法 A：AI 生成 + 真人替换人声

```
1. AI 生成完整歌曲（包含人声）
2. Stem 分离，保留 AI 器乐伴奏
3. 真人歌手在伴奏上重新录制人声
4. 混音 + 母带
```

**优势**：AI 编曲能力 + 真人情感表达 = 最佳组合

#### 方法 B：AI 生成 → MIDI 提取 → 真人演奏

```
1. AI 生成歌曲
2. 提取 MIDI（acemusic midi）
3. 编辑 MIDI：加入力度变化、时序偏移、表情
4. 用真实乐器或高品质虚拟乐器重新演奏
5. 混音 + 母带
```

**优势**：AI 作曲 + 人类演奏质感

#### 方法 C：AI 生成基础 → 乐队在此基础上添加

```
1. AI 生成鼓+贝斯+和声（节奏基础）
2. 乐队在此基础上录制吉他、键盘等旋律乐器
3. 加入真人演唱
4. 混音 + 母带
```

**优势**：AI 处理技术性工作，人类保留创意决策

---

## 第三部分：Auto Music Studio 现有能力与差距

### 3.1 已有能力

| 能力 | CLI 命令 | 状态 |
|------|---------|------|
| Stem 分离（人声/鼓/贝斯/其他） | `acemusic stems` | 已实现 |
| MIDI 提取（旋律/和弦/贝斯/鼓） | `acemusic midi` | 已实现 |
| 重制（EQ/压缩/立体声展宽/标准化） | `acemusic remaster` | 已实现 |
| 裁剪（带淡入淡出） | `acemusic crop` | 已实现 |
| 变速（不改变音高） | `acemusic speed` | 已实现 |
| 音频导入（自动检测 BPM/Key） | `acemusic import` | 已实现 |
| AI 延续扩展 | `acemusic extend` | 已实现 |
| 多格式支持 | WAV/FLAC/MP3/OGG/AAC/AIFF | 已实现 |
| 双后端 | ACE-Step + ElevenLabs | 已实现 |
| Workspace/Clip 管理 | `acemusic workspace` / `acemusic clips` | 已实现 |

### 3.2 乐队制作缺失能力

| 缺失 | 优先级 | 说明 |
|------|--------|------|
| 多轨录音 | P0 | 无法直接录音，需外部 DAW |
| 多轨时间线 | P0 | 无波形编辑视图 |
| 每轨效果器 | P1 | 无独立 EQ/压缩/混响 |
| 多段压缩 | P1 | 当前只有单段压缩 |
| 侧链处理 | P2 | 无侧链抽吸效果 |
| VST 插件加载 | P2 | 无法加载第三方效果器 |
| 实时监听 | P2 | 无实时音频监控 |
| 多通道声卡选择 | P2 | 无法选择不同音频输入设备 |

### 3.3 Fine-Tuning 缺失能力

| 缺失 | 优先级 | 说明 |
|------|--------|------|
| LoRA/LoKr 训练 | P1 | ACE-Step 官方支持但 CLI 未集成 |
| 声线克隆 | P2 | RVC 集成 |
| Prompt 系统优化 | P0 | 无自动 Prompt 迭代建议 |
| A/B 对比工具 | P1 | 无生成版本自动对比 |
| 种子管理 | P1 | 无种子库和版本追踪 |
| MIDI 编辑器 | P2 | 无钢琴卷帘编辑 |

---

## 第四部分：实操方案推荐

### 4.1 乐队场景：最简实操流程

#### 第一步：录音（用外部 DAW）

```
推荐：BandLab（免费）或 Reaper（$60）
声卡：Focusrite Scarlett 2i2（~$200）
策略：分轨叠加录制

录音顺序：
  1. 先录节拍/鼓（或用鼓机生成）
  2. 录贝斯（跟随鼓的节奏）
  3. 录吉他/键盘（跟随鼓+贝斯）
  4. 最后录人声
```

#### 第二步：导出分轨

```
从 DAW 导出每轨为独立 WAV 文件：
  - drums.wav
  - bass.wav
  - guitar.wav
  - keys.wav
  - vocals.wav
```

#### 第三步：用 Auto Music Studio 处理

```bash
# 导入分轨
acemusic import drums.wav --workspace "band-demo"
acemusic import bass.wav --workspace "band-demo"
acemusic import guitar.wav --workspace "band-demo"
acemusic import vocals.wav --workspace "band-demo"

# 对人声做重制
acemusic remaster vocals.wav --output ./processed/

# 如果需要提取 MIDI（比如想替换鼓的音色）
acemusic midi drums.wav --output ./midi/

# 如果只有混音文件（没有分轨），先用 AI 分离
acemusic stems mixdown.wav --output ./stems/
```

#### 第四步：混音和母带

```
选项 A（免费）：用 Reaper 混音 → BandLab Mastering 母带
选项 B（AI 自动）：用 RoEx Automix 自动混音 → BandLab Mastering
选项 C（专业）：Reaper 混音 → iZotope Ozone 母带
```

### 4.2 AI 生成效果不好：微调实操流程

#### Level 1：Prompt 优化（5 分钟见效）

```bash
# 第一轮：宽泛生成
acemusic generate "pop song" --num-clips 4

# 听完，确定方向不对，精确化：
acemusic generate "90s jangle pop, bright Rickenbacker guitars, breathy male vocals, dreamy, nostalgic, 120 BPM" \
  --lyrics "[Verse 1]\n走在熟悉的街上\n..." \
  --seed 42 --num-clips 4

# 听完，种子 42 不错但人声需要调整，锁定种子调参：
acemusic generate "90s jangle pop, bright Rickenbacker guitars, breathy male vocals, dreamy, nostalgic" \
  --lyrics-file lyrics.txt \
  --seed 42 --guidance-scale 9.0 --inference-steps 20
```

**经验法则**：每次只改一个变量，生成 3-5 版对比。

#### Level 2：后期处理（30 分钟见效）

```bash
# Step 1: Stem 分离
acemusic stems output/song-1.wav --output ./stems/

# Step 2: 对人声轨重制（EQ + 压缩 + 响度标准化）
acemusic remaster stems/vocals.wav --output ./processed/

# Step 3: 对整体混音母带处理
acemusic remaster remix-final.wav --output ./master/
```

#### Level 3：LoRA 微调（2-4 小时见效）

```
1. 准备 10-20 首你目标风格的参考歌曲
2. 为每首歌准备歌词文本 + JSON 标注
3. 使用 ACE-Step 官方 Gradio UI 训练 LoRA/LoKr
4. 加载训练权重生成新歌

硬件：16GB VRAM GPU 或 RunPod 远程 GPU
时间：LoKr ~5 分钟 / LoRA ~1 小时
费用：本地免费 / RunPod ~$0.50
```

#### Level 4：声线克隆（4-8 小时见效）

```
1. 录制 10-30 分钟干净人声
2. 用 UVR 分离出纯人声
3. 用 RVC 训练声线模型（免费 Colab 或本地 GPU）
4. 用 AI 生成伴奏 → 你的声线模型替换 AI 人声
5. 混音 + 母带

注意：只克隆自己的声音或获得授权
```

### 4.3 决策矩阵

| 问题 | 解决方案 | 难度 | 时间 | 费用 |
|------|---------|------|------|------|
| 风格不对 | Prompt 优化 | 低 | 5分钟 | $0 |
| 音质差 | remaster + EQ/压缩 | 低 | 30分钟 | $0 |
| 人声不好 | Prompt 调人声标签 | 低 | 5分钟 | $0 |
| 结构散 | Meta Tags + 歌词重写 | 低 | 10分钟 | $0 |
| 风格不一致 | Seed 锁定 + LoRA 微调 | 高 | 2-4小时 | $0-0.50 |
| 缺少个人特色 | LoRA + RVC 声线克隆 | 高 | 4-8小时 | $0-1 |
| AI 感太重 | Stem 分离 → 重新混音 | 中 | 1-2小时 | $0 |
| 特定段落不好 | ACE-Step repaint 任务 | 中 | 30分钟 | $0 |
| 想用真乐器 | MIDI 提取 → 真人演奏 | 中 | 2-4小时 | $0 |
| 乐队完整制作 | 外部 DAW 录音 + acemusic 后处理 | 中 | 4-8小时 | ~$200 |

---

## 信息来源

### 乐队录音与制作
- [BandLab](https://www.bandlab.com/) — 免费 DAW + AI 母带
- [LANDR](https://www.landr.com/) — AI 母带 + 发行一体化
- [RoEx Automix](https://www.roex.ai/) — AI 自动混音
- [Focusrite Scarlett 系列](https://focusrite.com/) — 入门声卡
- [Reaper DAW](https://www.reaper.fm/) — 高性价比 DAW

### AI Stem 分离
- [Demucs (Meta)](https://github.com/facebookresearch/demucs) — 开源音源分离
- [Ultimate Vocal Remover](https://ultimatevocalremover.com/) — 社区最爱免费工具
- [LALAL.AI](https://www.lalal.ai/) — 最高质量商业分离
- [Kits.ai — AI Stem Splitters 2026](https://www.kits.ai/blog/best-ai-stem-splitters-for-clean-music-stems)
- [Chartlex — AI Stem Separation Tools 2026](https://www.chartlex.com/blog/marketing/ai-stem-separation-tools-2026)

### Prompt 工程
- [HookGenius — Suno Prompt Guide 2026](https://hookgenius.app/learn/suno-prompt-guide-2026/)
- [ACE-Step 1.5 Inference Docs](https://github.com/ace-step/ACE-Step-1.5/blob/main/docs/en/INFERENCE.md)
- [Reddit — ACE-Step Optimization Tips](https://www.reddit.com/r/StableDiffusion/comments/1qvufdf/how_to_turn_acestep_15_into_a_suno_45_killer/)
- [Medium — Four Prompt Skills for AI Musicians](https://medium.com/ai-music/four-prompt-writing-skills-every-ai-musician-should-master-writing-iterating-editing-and-75ae2fd72ed4)

### LoRA 微调
- [ACE-Step LoRA Training Tutorial](https://github.com/ace-step/ACE-Step-1.5/blob/main/docs/en/LoRA_Training_Tutorial.md) — 官方教程
- [MDPI — LoRA for Diffusion-Based Music Generation](https://www.mdpi.com/2076-3417/15/15/8646)
- [Stratagem Systems — LoRA Cost Analysis 2026](https://www.stratagem-systems.com/blog/lora-fine-tuning-cost-analysis-2026)
- [HuggingFace — MusicGen LoRA](https://huggingface.co/blog/theeseus-ai/musicgen-lora-large)

### 声线克隆
- [RVC Project Wiki](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/wiki/Instructions-and-tips-for-RVC-training)
- [AI Hub — RVC Dataset Isolation](https://docs.aihub.gg/rvc/resources/dataset-isolation/)
- [RunPod — RVC Cloud Guide](https://www.runpod.io/articles/guides/ai-engineer-guide-rvc-cloud)
- [Resemble.ai — Open Source Voice Cloning Tools 2026](https://www.resemble.ai/resources/best-open-source-ai-voice-cloning-tools)

### 法律与合规
- [Soundplate — AI Voice Cloning Laws 2026](https://soundplate.com/ai-voice-cloning-law/)
- [Holon Law — Voice Cloning Right of Publicity](https://holonlaw.com/entertainment-law/synthetic-media-voice-cloning-and-the-new-right-of-publicity-risk-map-for-2026/)
- [The Vocal Market — AI Music Lawsuit Tracker](https://thevocalmarket.com/blogs/enterprise/every-ai-music-lawsuit-tracked)

### 混合工作流
- [Music Library Report — AI Music Creation 2026](https://musiclibraryreport.com/composer-tips/ai-music-creation-2026/)
- [Medium — Hybrid Demo-to-Master Pipelines](https://medium.com/ai-music/hybrid-demo-to-master-pipelines-blending-human-creativity-with-ai-for-rapid-releasable-masters-27c20940b0dc)
- [Soundverse — AI Music Transcription to MIDI](https://www.soundverse.ai/blog/article/ai-music-transcription-transforming-audio-into-editable-midi-files)
- [Magnetic Magazine — How to Make Music Sound More Human](https://magneticmag.com/2026/01/how-to-make-your-music-sound-more-human/)
- [Indiefy — AI for Independent Musicians](https://indiefy.net/blog/ai-for-independent-musicians-practical-creative-workflows-tools-ethics-and-real-world-tips)

---

*End of report.*
