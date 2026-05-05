## 4. 第一步到第三步：找歌→拆解→写Prompt

AI音乐创作最普遍的失败模式不是"不会用工具"，而是"没有参考就瞎写"。同样的Suno账户，120字符的精准Prompt与随意描述的Prompt，产出质量差异可达10倍以上。[^267^] 音乐理论知识——BPM、Key、Chord、Structure——不是可有可无的背景，而是Prompt工程的底层语法。[^270^] 本章手把手带你走完这个铁三角流程：找到一首你真正喜欢的歌作为参照物，用免费工具在5分钟内拆出它的DNA（调性、速度、和弦、乐器），然后把DNA翻译成AI能读懂的Prompt语言。

### 4.1 找一首你爱死的歌

#### 4.1.1 确定参考曲的方法：记录身体反应

新手最常犯的错误是"随便选一首熟悉的歌"。正确的做法不是用脑子选，而是用身体选——哪首歌让你心跳加速、起鸡皮疙瘩、不自觉点头、或者突然想哭。这些生理反应意味着这首歌的"音乐DNA"与你自身的情绪频率产生了共振。把这个感觉记下来，它就是你要复制的东西。

选曲的第二个原则是"具体而非笼统"。不要说"我喜欢周杰伦"——这是10种不同风格的混合物。锁定一首具体的歌，比如《晴天》前奏的木吉他分解，或者《告白气球》副歌的跳跃感。越具体，拆解越容易，Prompt越精准。

第三个原则是"选结构清晰的流行歌作为起点"。标准流行结构（Intro → Verse → Pre-Chorus → Chorus → Verse → Chorus → Bridge → Chorus → Outro）[^103^][^104^] 是AI模型训练数据中最密集的结构类型，识别率最高。避免选择前卫爵士、自由即兴或结构过于实验性的作品作为你的第一首参考曲。

#### 4.1.2 听歌记录模板：用四个维度给歌"画像"

在拆解之前，先用身体听一遍歌，记录你的直觉反应。以下模板帮你把模糊的感受转化为可拆解的参数：

| 维度 | 选项 | 记录栏 | 提示性问题 |
|------|------|--------|-----------|
| 速度（Speed） | 快 (>130 BPM) / 中 (90-130 BPM) / 慢 (<90 BPM) | ______ | 想跟着跑/走/躺着？ |
| 亮度（Brightness） | 明亮 (Major调为主) / 暗淡 (Minor调为主) / 中性 | ______ | 像晴天/雨天/多云？ |
| 能量（Energy） | 跳 (Four-on-the-floor舞曲感) / 静 (抒情叙事感) / 推 (渐强爆发感) | ______ | 身体想动还是静止？ |
| 情绪（Emotion） | 快乐 / 忧伤 / 愤怒 / 平静 / 怀旧 / 期待 | ______ | 如果这是电影配乐，画面是什么？ |
| 人声（Vocal） | 男/女 / 独唱/合唱 / 清亮/沙哑/气声/有力 | ______ | 闭眼"看"到的歌手形象？ |
| 核心乐器 | ______ | ______ | 最突出的三种声音是什么？ |

这个表格的价值在于：它把"好听"这种主观感受翻译成AI能处理的客观参数。比如你听完后记录"中速、明亮、跳、快乐、女声清亮、吉他+鼓+贝斯"，这就是Prompt的核心骨架。在下一步拆解工具中，你会用BPM数值替代"中速"，用Major/Minor替代"明亮/暗淡"，用具体的和弦进行替代"跳"的感觉。

### 4.2 拆解参考曲（工具实操）

#### 4.2.1 零成本拆解方案：三个网站，5分钟出结果

如果你的预算为零，以下组合可以在5分钟内获取参考曲的全部核心数据：

**第一步：获取Key + BPM（10秒）**
打开 bpm-finder.net（或 tunebat.com），直接拖拽歌曲文件到浏览器窗口。这个工具100%免费、无需注册、在本地处理不上传服务器，在300+首曲目的基准测试中对Tunebat的胜率达到67%。[^67^][^208^] 你会立刻看到类似"A Major, 150 BPM"的结果。

**第二步：获取和弦进行（20秒）**
打开 FindTheChords.com，拖拽同一首歌。这个工具同样免费，支持浏览器内无限上传，对流行/摇滚歌曲的和弦识别准确率达95%以上。[^235^] 你会得到一份带时间戳的和弦表，比如"00:00 A | 00:04 E | 00:08 Bm | 00:12 D"。

**第三步：获取分轨（2分钟）**
下载Moises App（iOS/Android）或访问 moises.ai，注册免费账号后上传歌曲。免费版每月可处理5首，支持人声/伴奏/鼓/贝斯的4轨分离，约90秒处理完成。[^27^][^150^] 分轨的价值在于让你solo听清每一轨在做什么——贝斯怎么走的？鼓是什么节奏型？吉他弹的是分解还是扫弦？

#### 4.2.2 付费最佳体验：Moises Premium $3.99/月

如果你愿意每月投入一杯奶茶钱，Moises Premium是性价比最高的选择。它是2024年苹果App Store iPad年度应用，拥有5000万+用户。[^323^] $3.99/月（年付约$2.99/月）解锁无限曲目、所有分轨类型、和弦检测、无广告、变速/变调功能。[^27^][^122^] 上传一首歌，3分钟内同时获得Key、BPM、完整和弦进行、分轨、智能节拍器和AI歌词转录。对基本流行/摇滚和弦的检测准确率达85-90%。[^118^]

Moises的核心优势是"一站式"——你不需要在三个网站之间切换。它的和弦检测还分Easy/Medium/Advanced三级显示，小白可以直接看Easy级（三和弦版本），进阶用户看Advanced级（含七和弦、挂留和弦）。

#### 4.2.3 拆解工具对比与实战案例

下表对比了小白阶段最实用的几款拆解工具：

| 工具 | 核心功能 | 免费额度 | 订阅价格 | 准确度 | 最佳场景 |
|------|---------|---------|---------|--------|---------|
| BPM Finder (bpm-finder.net) | Key + BPM检测 | 完全免费 | 免费 | 67% vs Tunebat胜率 [^67^] | 快速获取速度和调性 |
| FindTheChords.com | 和弦进行+时间戳 | 完全免费 | 免费 | 95%+流行/摇滚 [^235^] | 获取完整和弦表 |
| Moises免费版 | 分轨+BPM+Key | 5首/月 | 免费 | 和弦85-90% [^118^] | 想听清各乐器在做什么 |
| Moises Premium | 一站式全部数据 | 无限 | $3.99/月 [^27^] | 和弦85-90% [^118^] | 长期练习/创作 |
| Chordify | YouTube链接实时和弦 | 基础版免费 | ~$3.49-6.99/月 [^298^] | 90%+ [^330^] | 学YouTube上的歌 |
| LALAL.AI | 最高质量分轨 | 10秒预览 | $18/90分钟起 [^33^] | 业界最高 [^31^] | 需要专业级分轨 |
| Ultimate Guitar | 吉他谱/和弦库 | 基础免费 | $99/年 [^162^] | 官方谱100% [^210^] | 学吉他谱/弹唱 |

这个对比表的核心结论是：零成本方案（BPM Finder + FindTheChords + Moises免费版）足以支撑前20首歌的拆解学习；当你进入"每周拆解3-5首"的高频阶段，$3.99/月的Moises Premium才能把 friction 降到最低。LALAL.AI和Ultimate Guitar则是特定需求的升级选项——前者用于需要专业级分轨的制作场景，后者用于想学吉他弹唱的用户。不要一开始就全买，先用免费工具验证自己真的会持续拆解，再逐步升级。

**实战案例：拆解The Cure的《Just Like Heaven》**
1. 打开bpm-finder.net → 拖拽文件 → 结果：A Major, 150 BPM
2. 打开FindTheChords.com → 拖拽同一文件 → 结果：
   - Verse: A - E - Bm - D（I-V-iii-IV进行）
   - Chorus: F#m - G - D（vi-bVII-IV，经典的"借用和弦"色彩）
3. 打开Moises → 上传文件 → 分离4轨 → 独奏听鼓：Kick在1拍、Snare在2和4拍，Hi-hat以八分音符持续 → 标准摇滚反拍（Backbeat）[^79^]

拆解完成后，你手里有一张"音乐处方"：A Major（明亮、昂扬），150 BPM（中高能量），Verse用I-V-iii-IV（希望+渴望的进行），Chorus借用了vi-bVII-IV（制造色彩和起伏）。这张处方就是你写Prompt的原材料。

### 4.3 写Prompt（填空式模板）

#### 4.3.1 Suno Prompt模板：标签式写法

Suno使用逗号分隔的标签式Prompt（Tag-list），对前5-10个词赋予最高权重——这意味着风格词必须放在最前面。[^77^] 核心公式为：

```
[Genre], [Subgenre/Era], [BPM], [Key], [Core Instruments], [Vocal Type + Delivery], [Mood], [Production Style]
```

实战示例：把《Just Like Heaven》的拆解结果填入——
```
indie pop, 80s-inspired, 150 BPM, A Major, jangly electric guitar, punchy drums, bright bass, male vocal with energetic delivery, nostalgic and euphoric, polished new wave production
```

这里每个元素都对应拆解数据：indie pop（风格），150 BPM（速度），A Major（调性），jangly electric guitar（吉他角色），punchy drums（鼓的角色），male vocal with energetic delivery（人声特征），nostalgic and euphoric（情绪），polished new wave production（制作质感）。

#### 4.3.2 Udio Prompt模板：自然语言描述式

Udio使用完全不同的逻辑——自然语言描述句而非标签列表。推荐的结构是：**Theme + style + mood + instruments/timbre + vocal direction**。[^43^]

同一个《Just Like Heaven》风格，Udio写法：
```
A bright and energetic indie pop track inspired by 80s new wave, jangly electric guitars, punchy drums, driving bass at 150 BPM in A Major, nostalgic and euphoric mood, male vocals with energetic and emotional delivery, polished radio production
```

注意Udio的Brick Method（积木法）：下划线`_`连接同一个Brick内的想法，空格分隔不同的Brick，始终以最底部的What/How/Where Brick结尾。[^54^]

```
bright_energetic_indie_pop jangly_guitars punchy_drums driving_bass male_vocals energetic_emotional nostalgic_euphoric 80s_new_wave_inspired polished_radio_production
```

#### 4.3.3 纯音乐/器乐Prompt写法

如果你只想生成伴奏、Beat或背景音乐，必须显式加入排除人声的指令。最可靠的写法是同时用两种方式保险：

```
lo-fi hip hop, chill beats, 72 BPM, dusty piano, vinyl crackle, soft drums, warm bass, jazzy chords, no vocals, no humming, no choirs, instrumental only
```

Suno v5引入了专门的负面提示支持，你可以在Advanced Options的Exclude Styles字段中填写"vocal"，同时在Style Prompt中写"no vocals"。[^56^] Udio则直接在Prompt中写"no vocals, instrumental track only"。[^50^]

#### 4.3.4 中文歌曲Prompt特殊技巧

中文AI音乐创作有三个必须掌握的技巧：

**第一，用汉字而非拼音。** Suno处理汉字时具有更好的声调准确性和自然语感，拼音会丢失声调信息使模型困惑。[^283^] Udio支持中文演唱，但中文歌词跟随率仅36%，远低于Suno的73%。[^24^]

**第二，同音字替换法解决多音字。** 中文多音字（如"长""行""乐""还""重"）AI大概率选最常见的读音，导致唱错。经过500积分测试验证的两种方案：一是同音字替换（如"朝→招"），二是在字后加拼音括号标注（如"倔强(jué jiàng)"）。[^19^][^21^]

**第三，每行歌词控制在10-15个汉字以内。** 太多字会导致AI赶词或吞字。[^287^] 中文Prompt应使用具体的流派标签如"Mandopop""C-Pop""Chinese R&B"而非泛泛的"Chinese music"，并明确指定乐器名如"guzheng""erhu""pipa""dizi"以获得更真实的音效。[^39^]

#### 4.3.5 五个可直接复制的风格模板

以下五个模板均基于本章的拆解→Prompt方法论构建，你可以直接复制并替换方括号内的内容：

**模板1：Indie Pop抒情**
```
indie pop ballad, 95 BPM, G Major, shimmering electric piano, fingerpicked acoustic guitar, soft brushed drums, warm bass, breathy female vocals, intimate verse delivery building to anthemic chorus, nostalgic and bittersweet, polished indie production
```
*适用场景：深夜独自听歌、Vlog配乐、情感短视频。拆解来源参考：The 1975, Phoebe Bridgers。*

**模板2：Trap说唱**
```
trap hip-hop, 140 BPM, D minor, deep 808 sub bass with glide, hard snare on beat 3, double-time hi-hat rolls, dark synth pads, minimal piano lead, male melodic rap with auto-tune, confident and menacing delivery, heavy sidechain compression, modern dark production
```
*适用场景：短视频口播背景、游戏直播开场、运动视频。拆解来源参考：Travis Scott, Metro Boomin。*

**模板3：中国风电子**
```
Chinese folk fusion, guzheng lead melody, erhu harmony counterline, modern trap beat, taiko-inspired percussion, pentatonic scale, ethereal female vocals in Mandarin, cinematic atmosphere, East meets West, 90 BPM, dizi solo interlude, polished contemporary Chinese production
```
*适用场景：国风短视频、游戏配乐、文化类内容。拆解来源参考：谭维维《华阴老腔》、Sainkho Namtchylak。*

**模板4：Lo-Fi Chill（纯音乐/学习背景）**
```
lo-fi hip hop, chill beats, 72 BPM, dusty Rhodes piano chords, vinyl crackle texture, soft muted drums, warm sub bassline, jazzy 7th chords, rain ambience, no vocals, no percussion breaks, instrumental only, seamless study loop, soft analog saturation
```
*适用场景：学习/工作背景、睡眠辅助、咖啡馆氛围。拆解来源参考：ChilledCow, Nujabes。*

**模板5：Big-Room EDM**
```
big room EDM, 128 BPM, F minor, four-on-the-floor kick drum, massive supersaw lead, heavy sub bass, energetic build-up with rising white noise, explosive drop with layered synths, no vocals, festival anthem, wide stereo image, heavy sidechain compression, clean modern EDM production
```
*适用场景：健身视频、派对场景、电竞高光剪辑。拆解来源参考：Martin Garrix, Hardwell。*

### 4.4 Prompt进阶控制

#### 4.4.1 标点控制法：给AI下"精确指令"

标点符号是AI音乐Prompt中最被低估的控制工具。不同标点被Suno解析为不同层级的信息关系：[^14^]

| 标点 | 功能 | 使用场景 | 示例 |
|------|------|---------|------|
| 逗号 `,` | 并列信息列表 | 列出同级别的描述词 | `bright, shimmering, euphoric` |
| 分号 `;` | 分隔不同结构模块 | 清晰划分信息层级 | `indie pop, 95 BPM; jangly guitar, soft drums; intimate vocal delivery` |
| 冒号 `:` | 显式赋值/指定 | 对结构给出精确指令 | `[Energy: High], [Mood: Melancholic]` |
| 括号 `()` | 补充信息 | 添加精细指令 | `breathy female vocal (intimate, close-mic)` |
| 斜杠 `/` | 提供灵活选项 | 多个选择 | `acoustic/electric guitar` |

Suno v5引入了更强的冒号语法支持，使用`[Parameter: Value]`格式进行精确控制。[^44^] 例如`[Energy: High]`告诉模型这一段需要高能量输出，`[Texture: Grainy]`指定粗粝质感。分号的价值在于：当你想在一个Prompt中描述多个段落的不同特征时，分号可以帮助模型区分"这是Verse的配置"和"这是Chorus的配置"。

#### 4.4.2 负面Prompt技巧：排除不想要的元素

负面Prompt是告诉AI"你不想要什么"的艺术。最可靠、最省字符的格式是`no [element]`。[^56^] 完整的负面提示语法对照：

| 格式 | 效果 | 示例 |
|------|------|------|
| `no [element]` | 最可靠、最省字符 | `no vocals`, `no drums` |
| `without [element]` | 次选 | `without autotune` |
| `not [genre]` | 排除风格 | `not pop, not EDM` |
| `avoid [element]` | 可用 | `avoid heavy reverb` |

负面Prompt的关键原则是"少而精"。[^50^] 两到三个清晰的排除项（"no distortion, avoid heavy reverb, no busy hi-hats"）可以清理音色而不扼杀创意。过度排除（"no synth, no guitar, no bass, no drums, no vocals"）会让模型失去方向，产生混乱输出。[^56^]

Suno在Advanced Options中提供专门的Exclude Styles字段，比直接在Style Prompt中写"no X"更可靠。建议双保险：在Style Prompt中写自然语言排除，同时在Exclude Styles字段中填关键词。

#### 4.4.3 Meta Tags控制歌曲结构

Meta Tags（元标签）是控制歌曲段落结构的核心机制。Suno识别的Section Tags不是简单的标签——它们是告诉AI"何时放下贝斯、何时切换能量、如何收尾"的元命令。[^42^]

**核心标签及其功能：**

| 标签 | 功能 | 出现频率 |
|------|------|---------|
| `[Verse]` / `[Verse 1]` | 标准主歌段落，叙事推进 | 2-3次 |
| `[Chorus]` | 副歌，最高能量和旋律强调 | 2-3次 |
| `[Pre-Chorus]` | 连接主歌和副歌的情感桥梁，建立紧张感 | 1-2次 |
| `[Bridge]` | 对比段落，打破重复，增加层次 | 1次 |
| `[Intro]` | 器乐或极简人声开场 | 1次 |
| `[Outro]` | 能量渐弱，可能淡出 | 1次 |
| `[Build]` | 张力渐增，能量上升 | 配合Chorus/Drop前 |
| `[Drop]` | 节奏/低音/Hook全面释放 | EDM/Hip-Hop核心 |

**关键规则：** 标签必须**单独成行**，不能和内联歌词混写。[^138^] 每段歌词长度直接影响段落时长：8行Verse约30秒，16行约1分钟。[^138^] Verse保持4-8行以获得更紧凑的旋律，Chorus保持2-4行更抓耳。[^45^]

**标准结构示例（可直接复制到Suno的Lyrics Box）：**

```
[Intro]
(4-bar instrumental)

[Verse 1]
歌词第一行（最强旋律权重）
歌词第二行
歌词第三行
歌词第四行

[Pre-Chorus]
歌词，张力渐增
歌词，指向副歌

[Chorus]
Hook歌词，简洁有力
Hook歌词重复

[Verse 2]
第二段歌词
...

[Chorus]
Hook重复

[Bridge]
对比性歌词，不同视角

[Chorus]
最终Hook，最大能量

[Outro]
淡出或器乐解决
```

#### 4.4.4 常见问题修复速查表

在写Prompt和生成歌曲的过程中，你会反复遇到以下几类问题。下表提供症状-修复对照，帮你快速定位原因：

| 问题症状 | 可能原因 | 修复方法 |
|---------|---------|---------|
| 生成的歌风格完全不对 | Genre不在Prompt第1位 | 把风格词移到最开头，如`indie pop, ...`而非`emotional track with indie elements` [^77^] |
| 速度忽快忽慢 | 没有指定BPM | 添加具体数值如`118 BPM`或`[120 BPM]` [^46^] |
| 人声像机器人 | 没有描述Vocal特征 | 添加三层描述：`breathy female vocals, intimate delivery, close-mic recording` [^45^] |
| 结构混乱，没有明显副歌 | 没有使用Meta Tags | 在Lyrics Box中加入`[Verse]`, `[Chorus]`, `[Bridge]`单独成行 [^138^] |
| 歌曲突然冒出不想要的人声 | 没有排除人声 | 写`no vocals, instrumental only`；并在Suno的Exclude Styles中填"vocal" [^56^] |
| 中文歌词发音错误 | 多音字/生僻字 | 同音字替换或在字后加拼音括号，如`朝(zhāo)` [^19^][^21^] |
| 生成的歌太"普通" | Prompt过于模糊 | 用具体乐器名代替笼统词："Rhodes piano"而非"piano"，"brushed drums"而非"drums" [^45^] |
| 关键词互相打架 | 情绪/风格描述矛盾 | 检查是否有`happy upbeat`和`dark melancholic`同时出现；保持清晰的风格层级 [^14^] |
| 改了Prompt结果反而更差 | 一次改了太多变量 | 每次只改一个元素，生成3版对比；锁定喜欢的属性再微调下一个 [^218^] |
| Prompt太长被截断 | 超过Suno字符限制 | Suno v5控制在150字符以内，聚焦5-8个核心标签 [^45^][^44^] |
| 中文歌曲不够"中式" | 使用了泛泛标签 | 用`Mandopop`/`C-Pop`替代`Chinese music`，指定`guzheng`/`erhu`/`dizi` [^39^] |

这张表的核心逻辑是：AI音乐生成中的90%问题，根源都在Prompt的"精确度"和"结构清晰度"上。与其抱怨"AI不行"，先检查你的Prompt是否给AI提供了足够明确、不矛盾的指令。迭代纪律比初始天赋更能预测创作成功率——专业创作者平均进行7-12轮迭代才满意，而小白用户通常在前两轮就放弃。[^218^] 把这张速查表贴在手边，每轮迭代只解决一个问题，你的产出质量会在3-5轮内显著提升。
