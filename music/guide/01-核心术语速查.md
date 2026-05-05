## 1. 核心术语速查表：音乐小白必须知道的15个词

音乐理论不是创作门槛，而是控制AI的遥控器。本章将15个核心术语按三个维度分类，每个词配备简化解释、生活类比、以及在Suno和Udio Prompt中的精确写法。读完本章，你可以直接复制表格里的Prompt片段去生成第一首歌。

---

### 1.1 速度、调性与结构

#### 1.1.1 BPM（每分钟节拍数，Beats Per Minute）

BPM是衡量音乐速度快慢的数字指标，就像心跳频率——正常心跳每分钟60-100次，音乐同理：每分钟有多少个基本节拍，就是多少BPM。[^278^] 标着120 BPM的歌，意味着每分钟120拍，约每秒钟敲两下桌子。

但对AI创作来说，BPM不是数字，是“感觉”。同样是140 BPM，Trap把Kick放在第1拍、Snare放在第3拍，Hi-hat以全速140运行，实际律动只有70 BPM的“半速感”（Half-Time）。[^41^] 摇滚的140 BPM则是Kick在1和3、Snare在2和4，听起来飞快。在Prompt里写“140 BPM”之前，必须想清楚：你要的是哪种140？

#### 1.1.2 Key（调性）

调性是音乐的“家”——它定义一首歌使用哪些音符。[^81^] 最基础的区分是大调（Major）和小调（Minor）：大调明亮开阔，像晴天春游；小调暗淡内敛，像雨天夜晚。[^73^] C大调是最“白”的调——钢琴上只弹白键；G大调是吉他手的最爱，因为吉他的空弦音和G大调天然契合。

需要打破一个迷思：大调不一定快乐，小调不一定悲伤。但当你不知道选什么时，经验法则依然有效：想激励选Major，想内省选Minor。[^73^]

#### 1.1.3 Chord Progression（和弦进行）

和弦进行是和弦按特定顺序变化的过程，它是歌曲的“和声骨架”。[^47^] 即使旋律完全不同，如果底色一样，两首歌就会有一种“亲戚感”——这就是为什么有些流行歌听起来很像。

流行音乐最万能的公式是I-V-vi-IV（在C大调里就是C-G-Am-F）。它的魔力在于情感弧线：从主和弦的“稳定”出发，到五级和弦的“张力”，再到六级小调的“脆弱”，最后由四级和弦“解决”。[^48^] 《Let It Be》《Someone Like You》《I'm Yours》全用这个套路。但顺序改变，情绪立刻翻转：vi-IV-I-V（Am-F-C-G）以小调和弦开头，创造出悲愤激昂的感觉——流行朋克和周杰伦早期作品都爱用它。[^234^]

#### 1.1.4 歌曲结构六要素

一首歌不是从头唱到尾的一团声音，而是由功能分明的段落拼接而成。掌握这六个词，你就能像导演一样指挥AI安排情绪起伏：

- **Intro（前奏）**：设定情绪与氛围，通常纯器乐或1-4行歌词。[^103^]
- **Verse（主歌）**：讲故事、铺陈场景，歌词每次不同，推动叙事。[^104^]
- **Pre-Chorus（预副歌）**：连接主歌与副歌，建立紧张感，让副歌更 impactful。[^43^]
- **Chorus（副歌/高潮）**：歌曲最核心的记忆点，旋律最抓耳，歌词重复。[^103^][^112^]
- **Bridge（桥段）**：提供对比和转折，打破主歌-副歌循环，增加戏剧性。[^102^][^110^]
- **Outro（尾声）**：收束情绪，渐弱或重复副歌片段。[^103^]

在Suno中，你用方括号标签控制这些段落：`[Verse]` `[Chorus]` `[Bridge]` 必须单独成行。标签不是标注，而是“元指令”——告诉AI在哪里降下Bass、提升能量、制造转折。[^42^] 标准流行结构通常是：Intro → Verse → Pre-Chorus → Chorus → Verse → Pre-Chorus → Chorus → Bridge → Chorus → Outro。[^138^]

---

### 1.2 乐器与声音

#### 1.2.1 四大件角色分工

流行音乐编曲的四大基础乐器是鼓、吉他、贝斯和钢琴，90%的流行歌用它们创作。[^235^] 它们的角色分工像一支球队：

**鼓（Drums）**是时间 keeper 和推进引擎：Kick稳低频、Snare加脆响、Hi-hat填空隙。[^245^] **贝斯（Bass）**是低频支柱，连接鼓与和弦乐器——Kick和Bass同步时，身体会自然想动。[^246^] **吉他和钢琴**负责和声填充与旋律点缀；合成器时代，它们可被Pad或Lead替代。在Prompt里，乐器越具体越好：说`Rhodes piano`而不是`piano`，说`punchy trap drums`而不是`drums`。[^77^]

#### 1.2.2 合成器三大音色类型

合成器（Synthesizer）不是物理乐器，而是“声音雕塑家”——用电子信号从零雕刻音色。[^269^] AI音乐中最常用的三种合成器音色是：

- **Pad（铺底音色）**：长音、氛围型声音，像雾铺在歌曲底下，提供和声背景与空间感。Prompt写法：`warm synth pads`, `atmospheric pads`。
- **Arp（琶音/Arpeggio）**：把和弦拆成快速连续的单音，营造流动感。Prompt写法：`arpeggiated synth`, `crystal arpeggios`。
- **Lead（主音/独奏）**：最靠前的旋律线，比Pad更明亮、更抓耳。Prompt写法：`supersaw lead`, `bright synth lead`。

#### 1.2.3 人声三层描述法

仅仅在Prompt里写“male vocals”几乎等于没有方向——AI会给你一个最平庸的人声。[^45^] 高效Prompt需要同时指定三层：

- **Character（声线特征）**：raspy（沙哑）、breathy（气声）、airy（空灵）、gritty（粗粝）、silky（丝滑）。
- **Delivery（演唱方式）**：belted（强声呐喊）、whispered（耳语）、intimate（亲密）、powerful（强力）。
- **Effects（制作效果）**：dry close-mic（干声近录）、reverb-drenched（混响浸透）、auto-tuned（自动调音）、raw（未经修饰）。[^45^]

组合示例：`raspy male tenor, emotional delivery, dry close-mic recording` 比 `male vocals` 让AI生成的结果精准十倍。

---

### 1.3 制作与后期

#### 1.3.1 Reverb/EQ/Compression三件套

混音（Mixing）和母带（Mastering）是歌曲从Demo到成品的两道工序。混音是“在歌曲内部调整各乐器的关系”；母带是“对整首歌的最终润色”，确保在不同设备上都好听。[^189^][^196^] 类比来说：混音是画家调色，母带是给画装框。[^196^]

小白只需记住三个后期工具词：

- **Reverb（混响）**：给声音“房间感”。加得少 = 干燥亲密；加得多 = 宽广空灵，像在大教堂。[^143^]
- **EQ（均衡器）**：调整不同频率的强弱，就像音响上的低音/中音/高音旋钮但更精确。300 Hz附近太多会让声音浑浊，2-4 kHz决定咬字清晰度。[^191^][^195^]
- **Compression（压缩器）**：一只“自动调节的手”——声音太大时把它压下来，让整体更稳定、更“紧致”。[^236^]

母带不能拯救糟糕的混音。如果人声太闷、贝斯和鼓打架，母带阶段无法真正修复。[^189^]

---

### 1.4 术语与AI Prompt的映射表

#### 1.4.1 术语→Prompt写法对照表

以下表格将本章所有术语翻译为Suno和Udio能直接理解的Prompt语言。Suno使用逗号分隔的Tag-list风格，Udio使用自然语言描述句。[^95^] 你可以直接复制表格中的写法，粘贴到AI平台的Style/Prompt框中。

| 术语 | 简化含义 | Suno Prompt写法 | Udio Prompt写法 |
|------|---------|----------------|----------------|
| BPM | 速度 | `120 BPM`, `85 BPM` | `at 120 BPM`, `mid-tempo around 90` |
| Major/Minor | 大调明亮/小调暗淡 | `in C major`, `in A minor` | `in C Major`, `written in a minor key` |
| Chord Progression | 和弦顺序 | `I-V-vi-IV progression`, `ii-V-I jazz chords` | `following a I-vi-IV-V progression` |
| Verse | 主歌叙事段 | `[Verse]`（歌词区单独成行） | `verse section with storytelling lyrics` |
| Chorus | 副歌高潮 | `[Chorus]` | `big anthemic chorus with hook` |
| Bridge | 桥段转折 | `[Bridge]` | `contrasting bridge section` |
| Drums | 鼓组 | `punchy drums`, `four-on-the-floor kick` | `punchy_drums four_on_the_floor_kick` |
| Bass | 贝斯低频 | `deep 808 bass`, `walking bassline` | `deep_sub_bass walking_bassline` |
| Pad | 铺底氛围 | `warm synth pads`, `atmospheric pads` | `warm_synth_pads atmospheric_texture` |
| Arp | 琶音分解 | `arpeggiated synth`, `crystal arpeggios` | `arpeggiated_synth crystal_plucks` |
| Lead | 主音独奏 | `supersaw lead`, `bright synth lead` | `bright_synth_lead soaring_lead` |
| Vocal Character | 声线特征 | `breathy female`, `gritty male tenor` | `breathy_female gritty_delivery` |
| Vocal Delivery | 演唱方式 | `emotional delivery`, `intimate whispered` | `emotional_delivery intimate_whisper` |
| Reverb | 空间混响 | `reverb-heavy`, `cathedral reverb` | `reverb_heavy cathedral_space` |
| EQ/Compression | 频率/动态控制 | `clean digital production, tight compression` | `clean_digital tight_compression` |
| Mix/Master | 混音/母带风格 | `warm analog saturation`, `wide stereo image` | `warm_analog wide_stereo_mix` |

上表的核心策略是“具体替代笼统”。[^77^] AI模型对Prompt前5-10个词赋予最高权重，风格标签必须放在最前面——写`House track at 124 BPM`而不是`Energetic track with house elements`。[^77^] Suno的Prompt最佳长度约120字符（v4）至150字符（v5），标签数量5-8个最佳——少于5个太模糊，超过20个会自相矛盾。[^45^][^44^] Udio的Brick Method用下划线连接同一块内的想法、空格分隔不同“积木”，并始终以What/How/Where结尾。[^54^]

#### 1.4.2 BPM风格对照表

BPM不仅是速度指标，更是风格定义的核心参数。[^41^] 下图展示了九种主流风格的典型BPM范围。横条上的黑点代表该风格最常用的“中点速度”。120 BPM处有一条虚线——这是流行音乐最通用的黄金速度，多数流行歌落在这条线附近。

![BPM风格对照表](/mnt/agents/output/bpm_genre_chart.png)

| 风格 | 典型BPM | 核心律动特征 | 适合情绪 |
|------|--------|------------|---------|
| Lo-fi / Chill | 65-80 [^282^] | 松散、略偏后拍 | 放松、学习、助眠 |
| R&B / Soul | 70-90 [^282^] | 平滑、强调Groove | 温柔、亲密、感性 |
| Hip-Hop / Boom Bap | 85-100 [^282^] | Kick+Snare骨架，采样切片 | 街头叙事、怀旧、态度 |
| Pop | 110-130 [^282^] | 四拍稳定，旋律驱动 | 广泛适配，取决于歌词 |
| House | 120-130 [^148^] | Four-on-the-floor不间断 | 舞池、运动、派对 |
| Rock | 120-140 [^41^] | Kick在1和3，Snare在2和4 | 能量、释放、热血 |
| Trap | 130-150 [^282^] | Half-time feel，Hi-hat密集 | 黑暗、紧张、攻击性 |
| Techno | 130-145 [^41^] | 机械重复、Minimal | 迷幻、沉浸、重复冥想 |
| Drum & Bass | 160-180 [^41^] | 极速破碎节拍 | 激烈、高速、肾上腺素 |

从表中可以读出两个技巧。第一，同一BPM在不同风格里感受完全不同：130 BPM在House里是舞池脉冲，在Trap里则是半速黑暗律动。第二，速度即情绪——想让人静下来，从Lo-fi的70 BPM出发；想让人肾上腺素飙升，从Drum & Bass的170 BPM出发。Udio有显式BPM滑块（60-180），精确度最高；Suno依赖文本提示，输出是近似值。[^88^]

掌握了本章15个词，你已拥有与AI对话的完整基础词汇表。下一章将把这些术语串成一条五步创作流水线。
