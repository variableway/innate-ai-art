# AI 创作 Suede / The Cure 风格现代歌曲：完整资源与方法报告

> 目标：用 AI 工具（Suno、Udio 等）创作具有 Suede（华丽英伦摇滚）和 The Cure（后朋克/哥特/梦幻流行）风格的现代歌曲
> 日期：2026-05-10

---

## 第一部分：理解两种风格的核心 DNA

在用 AI 生成之前，必须理解这两个乐队的音乐"基因"。AI 提示词越精确，结果越接近你想要的风格。

### 1.1 Suede 的音乐 DNA

| 维度 | 特征 | AI 提示词关键词 |
|------|------|---------------|
| **流派根基** | 华丽摇滚 (Glam Rock) + 后朋克 + 英伦摇滚 | `glam rock`, `britpop`, `art rock` |
| **吉他风格** | Bernard Butler 标志性：琶音分解和弦 + sus4 装饰音 + Hendrix 式和弦加花 | `arpeggiated guitar`, `jangly guitar`, `embellished chords`, `melodic riffs` |
| **吉他设备** | Gibson Les Paul Custom → Boss DS-1 → Vox AC30，Gain 5 / Bass 1 / Mid 7 / Treble 10 / Reverb 3 | `crunchy overdrive`, `Vox AC30 tone`, `bright cutting guitar` |
| **人声风格** | Brett Anderson：戏剧化、阴柔、雌雄莫辨的假声 | `androgynous male vocals`, `theatrical vocal delivery`, `dramatic falsetto` |
| **编曲特点** | 华丽的弦乐铺垫、密集的吉他层次、戏剧化的起承转合 | `lush orchestration`, `string arrangements`, `layered guitars`, `cinematic production` |
| **歌词主题** | 都市颓废、性/欲望、郊区生活、疏离感 | `urban decay`, `glamour and grit`, `suburban alienation` |
| **代表时期** | 早期 (1993-1994)：粗粝华丽；中期 (1996+)：流畅流行 | `early 90s britpop`, `glam rock influenced post-punk` |
| **典型调性** | 大量使用小调和弦进行，如 Am-F-C-G, Em-G-D-C | `minor key`, `bittersweet chord progressions` |
| **BPM 范围** | 中速到中快，110-135 BPM | `110-135 bpm` |
| **代表曲目** | Animal Nitrate, So Young, Beautiful Ones, Trash, Saturday Night | — |

**Suede 的和弦进行特征**：
- 喜欢把简单和弦（如 A-G-D-C）拆解为琶音，加入 sus4、hammer-on、pull-off 装饰
- "Still Life" 大量使用 D 和弦的 sus4 变化和 top E 弦上的小指移动
- "Animal Nitrate" 使用五声音阶跑动 + hammer-on/pull-off + 推弦，有 Hendrix 风格影响

### 1.2 The Cure 的音乐 DNA

| 维度 | 特征 | AI 提示词关键词 |
|------|------|---------------|
| **流派根基** | 后朋克 + 哥特摇滚 + 新浪潮 + 梦幻流行 | `post-punk`, `gothic rock`, `new wave`, `dream pop` |
| **吉他风格** | Robert Smith：氛围感优先，大量调制效果 | `chorus-drenched guitar`, `shimmering guitar`, `atmospheric guitar layers` |
| **核心效果链** | Boss CE-2 合唱 → Boss BF-2 飘忽 → 延迟 → 浓密混响 | `heavy chorus`, `slow flanger`, `cathedral reverb`, `analog delay` |
| **核心音箱** | Roland JC-120 Jazz Chorus（内置立体声合唱） | `Roland Jazz Chorus clean tone` |
| **吉他** | Fender Jaguar / Jazzmaster / Mustang（单线圈） | `single coil pickups`, `jangly clean tone` |
| **人声风格** | Robert Smith：忧郁、窒息感、有时甜美有时绝望 | `melancholic male vocals`, `breathy baritone`, `plaintive tenor` |
| **贝斯风格** | 深沉、旋律化的贝斯线，经常作为主导旋律 | `melodic bassline`, `deep driving bass`, `prominent bass` |
| **鼓风格** | 简洁但有力的鼓点，大量使用鼓机 + 真鼓混合 | `minimalist drums`, `dry drum machine`, `punchy snare` |
| **编曲特点** | 大量吉他叠加层、合成器铺垫、缓慢的情绪推进 | `layered guitar textures`, `synth pads`, `slow emotional build` |
| **歌词主题** | 孤独、渴望、失去、时间的流逝、爱情中的绝望 | `melancholy`, `yearning`, `isolation`, `romantic despair` |
| **三个核心时期** | 暗黑三部曲：Pornography(1982) / Disintegration(1989) / Bloodflowers(2000) | — |
| **BPM 范围** | 慢速到中速，80-130 BPM（慢歌偏多） | `80-130 bpm` |
| **代表曲目** | A Forest, Pictures of You, Lovesong, Friday I'm in Love, Lullaby | — |

**The Cure 的三个创作时期提示词**：

| 时期 | 风格关键词 | 提示词标签 |
|------|-----------|-----------|
| 早期 (1980-82) | 黑暗、压抑、稀疏 | `early post-punk`, `cold`, `claustrophobic`, `sparse`, `dark trilogy` |
| 中期 (1985-89) | 华丽、梦幻、层次丰富 | `dream pop`, `lush`, `cathedral reverb`, `layered`, `expansive` |
| 晚期 (1992+) | 流行化、明亮但仍忧郁 | `alternative pop`, `jangly`, `bittersweet`, `accessible` |

### 1.3 两者共通的"现代融合点"

创作"现代版本"意味着不是简单复制，而是融合两者的精华并加入当代元素：

```
Suede 的戏剧性 + The Cure 的氛围感 + 现代制作手法
= 华丽但空灵、忧郁但不沉溺、有张力但不老气
```

**现代元素可以加入的提示词**：
- `modern production`, `contemporary indie rock`, `post-punk revival`
- `2020s alternative`, `shoegaze revival`, `synth-infused britpop`
- `Wide mix`, `punchy low end`, `modern mastering`
- 参考：The 1975, Fontaines D.C., IDLES, Slowdive（重组后）、 Beach House

---

## 第二部分：AI 工具选择与提示词工程

### 2.1 工具对比

| 工具 | 优势 | 适合场景 | 价格 |
|------|------|---------|------|
| **Suno** | 最成熟、Audio Influence 功能可用参考音频引导风格 | 整首歌曲生成、人声歌曲 | 免费 50 积分/天，Pro $10/月 |
| **Udio** | 音质细腻、分轨导出、结构控制精确 | 精细化制作、分轨混音 | 免费/订阅制 |
| **Stable Audio** | 纯器乐强、时长精确控制 | 前奏/间奏/氛围音乐 | 免费/订阅制 |

**推荐组合**：Suno（主创作）+ Udio（精细化调整）+ Stable Audio（纯器乐补充）

### 2.2 Suno 提示词框架

#### 框架模板

```
[风格标签], [时代标签], [速度], [人声描述], [乐器编排], [情绪/氛围], [制作描述]

例：
gothic rock, britpop, 90s influenced, 120 bpm,
melancholic androgynous male vocals with dramatic falsetto,
chorus-drenched electric guitar arpeggios, deep melodic bassline,
atmospheric synth pads, punchy drums with room reverb,
lush layered production, cinematic build, bittersweet
```

#### Suede 风格提示词库

**提示词 1：经典 Suede（华丽英伦摇滚）**
```
britpop, glam rock, art rock, 125 bpm,
dramatic male vocals with androgynous quality and falsetto moments,
jangly arpeggiated electric guitar with crunchy overdrive,
deep bass guitar, driving drums with snare accents,
string section swells, cinematic arrangement,
urban melancholy, theatrical, bittersweet, lush production
```

**提示词 2：Suede 抒情曲（如 "Saturday Night" 风格）**
```
britpop ballad, art rock, 95 bpm,
tender male vocals building to passionate climax,
fingerpicked electric guitar with sus4 embellishments,
warm bass, gentle brushed drums,
gradually building string arrangement,
nostalgic, romantic, cinematic, sweeping
```

**提示词 3：Suede 现代化（加入当代元素）**
```
modern britpop revival, post-punk influence, 120 bpm,
dramatic male vocals with indie sensibility,
chorus-pedal guitar arpeggios layered with synth textures,
deep groove bass, punchy modern drums,
shoegaze-influenced guitar walls in chorus,
atmospheric, urban, dreamy yet edgy, wide mix
```

#### The Cure 风格提示词库

**提示词 4：The Cure 黑暗期（Pornography / Disintegration 风格）**
```
gothic rock, post-punk, dream pop, 100 bpm,
melancholic male vocals, breathy and plaintive,
chorus-drenched electric guitar with slow flanger,
cathedral reverb on all instruments, deep prominent bass,
minimalist drums with room ambiance,
layered atmospheric guitar textures, dark synth pads,
brooding, claustrophobic, romantic despair, expansive soundscape
```

**提示词 5：The Cure 流行期（"Friday I'm in Love" / "In Between Days" 风格）**
```
post-punk pop, new wave, jangly guitar rock, 130 bpm,
bright melancholic male vocals,
jangly chorus-effect electric guitar, upbeat bassline,
crisp drums with tambourine, synthesizer flourishes,
optimistic but wistful, bittersweet, catchy hooks, accessible
```

**提示词 6：The Cure 现代化（Disintegration 遇上 2020s 制作）**
```
modern dream pop, post-punk revival, shoegaze influence, 110 bpm,
ethereal male vocals with delay and reverb,
shimmering chorus guitar layers, deep melodic bass,
reverb-heavy drums, ambient synth washes,
modern wide mix, atmospheric build, cinematic,
melancholic but warm, expansive, introspective
```

#### Suede + The Cure 融合风格

**提示词 7：核心融合（推荐从这里开始）**
```
post-punk, britpop, dream pop, gothic rock influence, 115 bpm,
dramatic male vocals alternating between tender falsetto and impassioned delivery,
chorus-drenched arpeggiated guitar building to layered jangly walls,
deep melodic bassline as harmonic anchor,
punchy drums with atmospheric reverb, dark synth pads underneath,
cinematic arrangement with dynamic contrast,
brooding romanticism, urban gothic, bittersweet grandeur, lush production
```

### 2.3 Suno 结构标签（Meta-tags）

在歌词中使用结构标签来控制歌曲进程：

```
[Intro]
(器乐前奏，设定情绪)

[Verse 1]
(主歌歌词，通常较安静)

[Pre-Chorus]
(预副歌，情绪开始攀升)

[Chorus]
(副歌，情绪爆发，吉他墙)

[Verse 2]
(第二段主歌，可加入新元素)

[Chorus]
(副歌重现)

[Bridge]
(桥段，变化，可能是最戏剧化的部分)

[Guitar Solo]
(吉他独奏段落)

[Final Chorus]
(最终副歌，最饱满的编排)

[Outro]
(尾奏，渐弱或骤停)
```

**进阶标签**（Suno v4.5+ 支持）：
```
[Instrumental Break]     — 纯器乐间奏
[Build Up]              — 情绪递进段落
[Drop]                  — 能量释放点
[Quiet Section]         — 安静段落
[Layered Vocals]        — 和声/人声叠加
[Feedback]              — 吉他反馈噪音
[Fade Out]              — 渐弱结束
[A Cappella]            — 纯人声
[Spoken Word]           — 念白
```

### 2.4 Suno Audio Influence 工作流

这是最接近"复制"特定风格的方法：

```
1. 准备参考音频：用 Audacity 从网易云录制 Suede/The Cure 的歌曲片段（15-30 秒最有特色的段落）
2. 在 Suno 中创建新歌曲
3. 上传参考音频到 Audio 字段
4. 设置 Audio Influence 为 0.7-0.9（高值 = 更接近参考，低值 = 更自由）
5. 在 Style 描述中写详细提示词
6. 生成 → 评估 → 调整
```

### 2.5 Suno Extend 分段构建法

不要一次生成整首歌，分段构建质量更高：

```
第 1 轮：生成 [Intro] + [Verse 1]（约 30-45 秒）
    ↓ 挑选最好的版本
第 2 轮：Extend → 添加 [Pre-Chorus] + [Chorus]
    ↓ 如果 Chorus 不够爆发力，重新 extend
第 3 轮：Extend → 添加 [Verse 2]（可微调歌词）
    ↓
第 4 轮：Extend → 添加 [Bridge] + [Guitar Solo]
    ↓
第 5 轮：Extend → 添加 [Final Chorus] + [Outro]
    ↓
第 6 轮：整体微调，可能需要多次 extend 才能满意
```

---

## 第三部分：歌词创作方法

### 3.1 Suede 风格歌词特征

```
- 主题：都市夜晚、郊区少年、欲望与压抑、美丽与腐烂的并存
- 视角：第一人称，高度个人化但又模糊
- 意象：霓虹灯、出租屋、出租车、垃圾场、化妆、香烟
- 语言：简洁但诗意，短句为主，间或有华丽的长句
- 情感：颓废中的浪漫、绝望中的优雅
```

**Suede 风格歌词模板**：
```
[Verse]
City lights through dirty windows
Lipstick on a borrowed coat
We were beautiful in borrowed clothes
Running from the nothing that we know

[Chorus]
And we go on, we go on
Through the glass and the gasoline
We were young, we were wrong
But we were everything
```

### 3.2 The Cure 风格歌词特征

```
- 主题：时间的流逝、无法企及的爱、记忆与遗忘、自我怀疑
- 视角：极度内省，像是在对某个不存在的听众说话
- 意象：海洋、深水、森林、镜子、阴影、雨、空房间
- 语言：重复性短句营造催眠感，大量使用 "always"、"never"、"still"
- 情感：温柔的悲伤、安静但深入骨髓的孤独
```

**The Cure 风格歌词模板**：
```
[Verse]
The pictures on the wall still remember your face
The clock still turns at the same slow pace
I traced the lines where your hands used to be
And the ocean keeps pulling you back to me

[Chorus]
Always the same deep water
Always the same long fall
I reached for you in the dark
But you were never there at all
```

### 3.3 AI 辅助歌词创作

可以用 ChatGPT / Claude 来协助写歌词，给出精确指令：

```
请帮我写一首歌词，风格融合 Suede 和 The Cure：
- Suede 的都市颓废美学 + The Cure 的梦幻忧郁感
- 主题：一个在深夜城市中游荡的人，回忆过去的爱
- 使用短句，重复性结构
- 英文歌词
- 结构：Verse 1 → Pre-Chorus → Chorus → Verse 2 → Chorus → Bridge → Outro
- 关键意象：雨中的街道、模糊的霓虹、回声、深水
```

---

## 第四部分：制作与后期流程

### 4.1 完整工作流

```
阶段 1：准备与参考
├── 确定目标风格（Suede 型 / The Cure 型 / 融合型）
├── 从网易云录制 3-5 首参考歌曲的代表性片段
├── 用 tunebat.com 分析参考歌曲的 BPM、调性
└── 整理成提示词文档

阶段 2：AI 生成
├── Suno：用 Audio Influence 上传参考片段
├── 分段 Extend 构建完整歌曲（5-8 轮）
├── 每轮生成 2-4 个版本，挑选最好的
└── 如果 Suno 效果不佳，切换到 Udio 尝试

阶段 3：后期处理
├── 导出 AI 音频为 WAV
├── Audacity：裁剪、去噪、音量平衡
├── 如果有多轨/分轨，导入 DAW 混音
└── 如果是立体声混音文件，用 EQ / 压缩微调

阶段 4：提取乐谱（可选）
├── 用 AnthemScore / Music Transcription Studio 转谱
├── 在 MuseScore / Guitar Pro 中修正
└── 导出 Guitar / Bass / Drum 分谱

阶段 5：再创作（进阶）
├── 用提取的乐谱自己演奏录制
├── 在 DAW 中替换 AI 的部分乐器
├── 加入真实吉他效果（用 Guitarix / Tonebridge）
└── 最终混音与母带
```

### 4.2 效果处理配方（模拟 Suede / The Cure 音色）

如果要在 DAW 中进一步处理 AI 生成的音频：

#### The Cure 风格效果链

```
吉他通道：
  合唱 (Chorus) → Rate: 0.5Hz, Depth: 60%, Mix: 40%
  → 飘忽 (Flanger) → Rate: 0.3Hz, Depth: 40%, Mix: 25%
  → 延迟 (Delay) → 1/4 音符, Feedback: 35%, Mix: 30%
  → 混响 (Reverb) → Hall, Decay: 3-5s, Mix: 50%

人声通道：
  延迟 (Delay) → 1/8 音符, Feedback: 25%, Mix: 20%
  → 混响 (Reverb) → Plate, Decay: 2-3s, Mix: 40%

混音总线：
  轻微混响 → 轻微压缩 → 限幅
```

#### Suede 风格效果链

```
吉他通道：
  过载 (Overdrive) → Gain: 40%, Tone: Bright, Level: 中等
  → 合唱 (Chorus) → Rate: 0.8Hz, Depth: 40%, Mix: 30%
  → 混响 (Reverb) → Plate, Decay: 2s, Mix: 35%

人声通道：
  延迟 (Delay) → 1/4 音符, Feedback: 20%, Mix: 15%
  → 混响 (Reverb) → Plate, Decay: 1.5s, Mix: 30%
  → 轻微加倍 (Doubler) → Detune: 10-15 cents

弦乐通道：
  混响 (Reverb) → Hall, Decay: 3s, Mix: 45%
  → 轻微延迟
```

---

## 第五部分：可用资源清单

### 5.1 AI 音乐生成平台

| 平台 | 网址 | 用途 |
|------|------|------|
| **Suno** | suno.com | 主力生成工具，Audio Influence |
| **Udio** | udio.com | 精细化制作，分轨导出 |
| **Stable Audio** | stableaudio.com | 纯器乐、氛围音乐 |

### 5.2 提示词资源

| 资源 | 网址 | 说明 |
|------|------|------|
| **ToneDraft** | tonedraft.com/en/genres | 6000+ 子风格提示词，含 Gothic Rock / Post-Punk 专题 |
| **BandPrompts** | bandprompts.com | 按乐队/艺术家分类的提示词（含 The Cure） |
| **SunoPrompt** | sunoprompt.com | 450+ 地下音乐风格速查表 |
| **Sonygram AI** | sonygram.ai/blogs/prompt-engineering-for-ai-music | 按流派的提示词模板教程 |
| **r/SunoAI** | reddit.com/r/SunoAI | 社区分享和提示词讨论 |

### 5.3 风格参考与分析

| 资源 | 网址 | 说明 |
|------|------|------|
| **TuneBat** | tunebat.com | 查询歌曲 BPM 和调性 |
| **Equipboard** | equipboard.com | 查询乐队使用的设备（Suede / The Cure） |
| **Ultimate Guitar** | ultimate-guitar.com | 查找和弦进行和 Tab 谱 |
| **MusicRadar** | musicradar.com | Britpop 吉他演奏教程 |
| **How to Sound Like The Cure** | reverb.com/news/how-to-sound-like-the-cure-potent-pairings | Reverb 的 The Cure 音色指南 |

### 5.4 音频工具

| 工具 | 用途 | 来源 |
|------|------|------|
| **Audacity** | 录制、剪辑、格式转换 | MuseHub / audacityteam.org |
| **ffmpeg** | 批量格式转换、提取音频 | brew install ffmpeg |
| **AnthemScore** | AI 音频转乐谱 | anthemscore.com |
| **OBS Studio** | 录制网易云参考音频 | obsproject.com |
| **BlackHole** | Mac 系统音频捕获 | brew install blackhole-2ch |

### 5.5 学习资源

| 资源 | 说明 |
|------|------|
| [How to Play Britpop Guitar (MusicRadar)](https://www.musicradar.com/tuition/guitars/how-to-play-britpop-style-guitar-623542) | Britpop 吉他技巧 |
| [How to Sound Like The Cure (Reverb)](https://reverb.com/news/how-to-sound-like-the-cure-potent-pairings) | The Cure 音色复刻 |
| [How to Play Like Bernard Butler (Tumblr)](https://www.tumblr.com/suedescifilullabies/35660365425/how-to-play-guitar-like-bernard-butler) | Butler 的设备和和弦分析 |
| [How I Made a Full AI Shoegaze Album (Reddit)](https://www.reddit.com/r/SunoAI/comments/1spcp45/shoegazedream_pop_how_i_made_a_full_ai_shoegaze/) | 完整 AI 专辑制作经验 |
| [Suno Style Prompt Guide 2.0 (Reddit)](https://www.reddit.com/r/SunoAI/comments/1n8lq6u/suno_style_prompt_guide_20/) | Suno 提示词指南 |
| [Disckordia's Artist Prompt Guide v4.5+](https://www.reddit.com/r/SunoAI/comments/1nejqyx/disckordias_artist_prompt_guide_for_v45/) | 艺术家风格提示词 |
| [SunoPrompt: Music Form Guide](https://sunoprompt.com/music-elements/music-form) | 歌曲结构标签完整指南 |
| [Suno Extend Tutorial (YouTube)](https://www.youtube.com/watch?v=4ifjKwT379I) | Extend 功能视频教程 |
| [Bernard Butler Teaches Animal Nitrate](https://spaceecho.chromewaves.net/2021/02/17/bernard-butler-teaches-you-how-to-play-animal-nitrate/) | Butler 亲自拆解经典曲目 |

---

## 第六部分：迭代与优化策略

### 6.1 常见问题与解决方案

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 生成的歌曲太"流行"，缺乏粗粝感 | 提示词中缺少质感描述 | 加入 `lo-fi elements`, `raw production`, `garage rock influence` |
| 吉他效果不够明显 | Suno 对效果器描述响应不够敏感 | 用 Audio Influence 上传有目标效果的参考片段 |
| 人声不够戏剧化 | 默认人声偏中性 | 明确写 `dramatic`, `theatrical`, `passionate`, `falsetto` |
| 歌曲结构太平 | 没有使用结构标签 | 用 `[Build Up]`, `[Drop]`, `[Quiet Section]` 增加动态 |
| 合成器太多，不够"乐队感" | AI 倾向添加合成器 | 明确写 `organic`, `band instrumentation`, `no synthesizers` |
| BPM 不稳定 | 没有指定精确 BPM | 在提示词中写 `exactly 120 bpm` |

### 6.2 迭代检查清单

每次生成后对照检查：

```
□ 吉他音色是否接近目标？（合唱感/过载感/琶音感）
□ 人声风格是否正确？（忧郁/戏剧/阴柔）
□ 贝斯是否突出且有旋律性？
□ 混响和延迟是否营造了正确的空间感？
□ 歌曲结构是否有足够的动态对比？
□ 情绪走向是否符合预期？
□ 有没有"AI 味"太重的段落需要重做？
□ 歌词意象是否与 Suede/The Cure 的美学一致？
```

### 6.3 从 AI 生成到"作品"的升级路径

```
Level 1：纯 AI 生成
  Suno 直接生成 → 简单裁剪 → 完成
  适合：快速原型、概念验证

Level 2：AI + 后期处理
  Suno 生成 → Audacity 剪辑/降噪 → EQ 微调 → 完成
  适合：日常创作、分享给朋友

Level 3：AI + DAW 混音
  Suno/Udio 生成多轨 → DAW 分轨混音 → 效果处理 → 母带
  适合：正式发布、音质要求高

Level 4：AI + 真实乐器
  AI 生成骨架 → 提取乐谱 → 自己录制吉他/贝斯/人声 → DAW 混音
  适合：追求独特风格、想要"人味"

Level 5：AI 辅助作曲 + 全实录
  AI 帮助写旋律/和弦/编曲思路 → 全部自己演奏录制
  适合：专业制作、想要完全原创的声音
```

---

## 附录 A：快速上手模板（复制即用）

### Suede 风格完整项目

**Suno Style 输入**：
```
britpop, glam rock, art rock, 120 bpm,
dramatic androgynous male vocals with falsetto,
arpeggiated electric guitar with crunchy overdrive and chorus,
deep melodic bass, driving rock drums with fills,
string section swells in chorus, layered guitar walls,
theatrical, urban melancholy, cinematic, lush production, wide mix
```

**歌词模板**：
```
[Intro]
(Washed-out guitar arpeggios building slowly)

[Verse 1]
Through the glass of a city bus
I watched the neon bleed to dust
You wore your mother's broken smile
And I followed you for miles and miles

[Pre-Chorus]
Hold my hand, we're going under
Beautiful and torn asunder

[Chorus]
We are the beautiful ones
Running through the rain with nowhere to run
Caught between the dark and dawn
We were never meant to carry on
But we go on

[Verse 2]
Your lipstick on the bathroom mirror
A shattered song still ringing clearer
We danced in rooms with no more walls
Answered to nobody's calls

[Chorus]
We are the beautiful ones
Running through the rain with nowhere to run
Caught between the dark and dawn
We were never meant to carry on
But we go on

[Bridge]
(Ambient breakdown, strings swell)
And in the silence between the sirens
I heard your heart still beating
Through concrete and through iron
Through every word we're not repeating

[Guitar Solo]
(Crunchy overdrive guitar solo with feedback)

[Final Chorus]
We are the beautiful ones
Running through the rain with nowhere to run
Caught between the dark and dawn
We are the beautiful ones
We go on

[Outro]
(Guitar arpeggios fading, reverb tail)
We go on...
```

### The Cure 风格完整项目

**Suno Style 输入**：
```
gothic rock, dream pop, post-punk, 105 bpm,
melancholic breathy male vocals,
chorus-drenched shimmering electric guitar layers,
cathedral reverb, deep prominent bassline,
minimalist atmospheric drums with delay,
dark synth pads, layered guitar textures,
brooding, romantic despair, expansive, cinematic
```

**歌词模板**：
```
[Intro]
(Atmospheric guitar with heavy chorus and reverb, slow bass)

[Verse 1]
The same deep water as before
The same closed window, same locked door
I pressed my face against the glass
And watched the seasons slowly pass

[Pre-Chorus]
And always, always, always
The rain comes back again

[Chorus]
Pictures of you at the edge of the world
Fading like stars when the morning unfurls
I reached through the dark but you drifted away
The same deep water won't wash you away

[Verse 2]
The clock on the wall still keeping time
But nothing's the same and nothing's aligned
I traced the shadow where you used to stand
An outline of you in the palm of my hand

[Chorus]
Pictures of you at the edge of the world
Fading like stars when the morning unfurls
I reached through the dark but you drifted away
The same deep water won't wash you away

[Bridge]
(Quiet section, just bass and vocals)
If I could turn back all the pages
If I could hold back all the changes
But the water keeps rising
And the picture keeps fading

[Instrumental Break]
(Guitar layers building, delay cascading, cathedral reverb)

[Final Chorus]
Pictures of you at the edge of the world
Fading like stars when the morning unfurls
I reached through the dark but you drifted away
The same deep water won't wash you away
Won't wash you away

[Outro]
(Reverb tail, guitar dissolving into ambience)
Always the same...
Always the same deep water...
```

---

**Sources:**
- [MusicRadar - How to Play Britpop Guitar](https://www.musicradar.com/tuition/guitars/how-to-play-britpop-style-guitar-623542)
- [Far Out Magazine - How Suede Constructed Beautiful Ones](https://faroutmagazine.co.uk/how-suede-constructed-their-seminal-hit/)
- [Equipboard - Suede Gear](https://equipboard.com/band/suede)
- [Tumblr - How to Play Like Bernard Butler](https://www.tumblr.com/suedescifilullabies/35660365425/how-to-play-guitar-like-bernard-butler)
- [Reverb - How to Sound Like The Cure](https://reverb.com/news/how-to-sound-like-the-cure-potent-pairings)
- [Mixdown - Robert Smith Gear Rundown](https://mixdownmag.com.au/features/rig-rundown-robert-smith-of-the-cure/)
- [ToneDraft - Gothic Rock Prompt Guide](https://www.tonedraft.com/en/genres/gothic-rock)
- [ToneDraft - Post-Punk Prompt Guide](https://www.tonedraft.com/en/genres/post-punk)
- [BandPrompts - The Cure Prompts](https://bandprompts.com/)
- [SunoPrompt - 450+ Underground Music Genres](https://sunoprompt.com/music-style-genre/underground-music-genre)
- [SunoPrompt - Music Form Guide](https://sunoprompt.com/music-elements/music-form)
- [Reddit - How I Made a Full AI Shoegaze Album](https://www.reddit.com/r/SunoAI/comments/1spcp45/shoegazedream_pop_how_i_made_a_full_ai_shoegaze/)
- [Reddit - Suno Style Prompt Guide 2.0](https://www.reddit.com/r/SunoAI/comments/1n8lq6u/suno_style_prompt_guide_20/)
- [Reddit - Disckordia's Artist Prompt Guide](https://www.reddit.com/r/SunoAI/comments/1nejqyx/disckordias_artist_prompt_guide_for_v45/)
- [Soundverse - How to Extend Songs Using Suno AI](https://www.soundverse.ai/blog/article/how-to-extend-songs-using-suno-ai-1059)
- [Bernard Butler Teaches Animal Nitrate](https://spaceecho.chromewaves.net/2021/02/17/bernard-butler-teaches-you-how-to-play-animal-nitrate/)
