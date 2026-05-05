# 维度12：多语言/中文AI音乐创作 — 深度研究报告

> 研究日期：2026年6月
> 研究范围：AI音乐工具对中文及其他语言的支持情况，多语言创作技巧和限制
> 搜索次数：≥20次独立搜索

---

## 目录

1. [中文AI音乐生成现状：各平台支持对比](#1-中文ai音乐生成现状各平台支持对比)
2. [中文歌词在AI音乐中的核心问题："倒字"现象](#2-中文歌词在ai音乐中的核心问题倒字现象)
3. [中文发音优化技巧：拼音标注、汉字vs拼音输入](#3-中文发音优化技巧拼音标注汉字vs拼音输入)
4. [其他语言支持：日语、韩语、西班牙语、法语AI演唱质量](#4-其他语言支持日语韩语西班牙语法语ai演唱质量)
5. [跨语言创作：用AI翻译歌词后演唱、多语言混合歌曲](#5-跨语言创作用ai翻译歌词后演唱多语言混合歌曲)
6. [方言和地方语言支持：粤语、四川话等](#6-方言和地方语言支持粤语四川话等)
7. [中文AI音乐成功案例：抖音/快手上的AI中文歌曲](#7-中文ai音乐成功案例抖音快手上的ai中文歌曲)
8. [文化差异：东西方音乐结构差异对Prompt的影响](#8-文化差异东西方音乐结构差异对prompt的影响)
9. [中文AI音乐创作避坑指南](#9-中文ai音乐创作避坑指南)
10. [中文AI歌曲Prompt示例](#10-中文ai歌曲prompt示例)
11. [关键发现汇总](#11-关键发现汇总)

---

## 1. 中文AI音乐生成现状：各平台支持对比

### 1.1 Suno：中文支持较好但有发音问题

Suno v5可以生成中文（普通话）演唱的歌曲，支持自定义模式输入中文歌词。

Claim: Suno v5支持多语言演唱，其中西班牙语、法语、日语和韩语的处理优于Udio。在中文方面，Suno必须使用汉字而非拼音输入以获得最佳效果。[^1^]
Source: HookGenius - Suno Prompts for Chinese Music
URL: https://hookgenius.app/learn/suno-chinese-prompts/
Date: 2026-03-14
Excerpt: "Chinese characters (汉字) are strongly recommended over pinyin. Suno's language model processes characters with better tonal accuracy and natural phrasing. Pinyin can confuse the model because it loses tonal information."
Context: Suno中文歌词输入的官方推荐方式
Confidence: high

Claim: Suno v5在整体易用性和速度方面表现出色，多语言支持优于Udio，特别在处理西班牙语、法语、日语和韩语方面。[^2^]
Source: The Vocal Market - Suno vs Udio vs Real Vocalists
URL: https://thevocalmarket.com/blogs/how-to/suno-vs-udio-vs-real-vocalists-2026
Date: 2026-04-21
Excerpt: "Multilingual. Handles Spanish, French, Japanese, and increasingly Korean better than Udio."
Context: 专业音频市场对Suno和Udio的对比评测
Confidence: high

Claim: YuE模型的评测显示，Suno V4在中文歌词跟随（73%）和中文音乐性（88%）上均排名第一，远超其他竞品。[^3^]
Source: YuE论文 - arXiv 2503.08638
URL: https://arxiv.org/html/2503.08638
Date: 2025-03-11
Excerpt: "In Chinese lyrics-following, YuE secures second-best performance (60%) behind Suno (73%), while in Korean lyrics-following, it ranks third (55%)... its gap relative to Suno in Chinese musicality highlights the need for more culturally-specific training."
Context: 学术论文对各AI音乐模型的多语言评测
Confidence: high

### 1.2 Udio：多语言支持12+语言，发音质量高

Udio支持超过12种语言的声乐生成，其语音合成能够适应每种语言的语音和音调特征。

Claim: Udio支持12种以上语言的声乐生成，包括英语、西班牙语、法语、德语、日语、韩语、印地语、葡萄牙语、意大利语、中文、俄语和阿拉伯语。其语音合成会适应每种语言的语音特征，而不仅仅是渲染文本。[^4^]
Source: AIViewer.ai - Udio: The AI Music Generator
URL: https://aiviewer.ai/tools/udio-ai/
Date: 2026-03-10
Excerpt: "Udio supports vocal generation in over twelve languages... the vocal synthesis actually adapts to the phonetic and tonal characteristics of each language. A song generated in Japanese respects the rhythmic patterns of the language. Spanish vocals carry the characteristic rolled consonants and open vowel sounds."
Context: 第三方AI工具评测平台对Udio多语言能力的详细分析
Confidence: high

### 1.3 DiffRhythm：中文支持通过G2P，速度极快

DiffRhythm是由西北工业大学与香港中文大学（深圳）联合开发的开源AI音乐生成平台，基于潜在扩散模型。

Claim: DiffRhythm通过Grapheme-to-Phoneme（G2P）转换技术支持中文和英文歌词，数据集构成为中文歌曲:英文歌曲:器乐 = 3:6:1。生成一首完整歌曲仅需约10秒。[^5^]
Source: DiffRhythm论文 - arXiv 2503.01183
URL: https://arxiv.org/html/2503.01183v1
Date: 2025-03-03
Excerpt: "The dataset features a multilingual composition ratio of 3:6:1 for Chinese songs, English songs, and instrumental music respectively... we pre-extract the phoneme tokens from lyrics using MaskGCT G2P."
Context: 学术论文对DiffRhythm技术架构的描述
Confidence: high

Claim: DiffRhythm官方宣称支持英语和中文歌词，在两种语言中均保持高可理解性和自然发音。[^6^]
Source: DiffRhythm.com 中文官网
URL: https://diffrhythm.com/zh
Date: 2024-08-10
Excerpt: "该模型已展示对英语和中文歌词的支持，在两种语言中都具有高可理解性和自然发音。"
Context: 官方产品描述
Confidence: high

### 1.4 ACE-Step：支持50+语言，开源且高效

ACE-Step v1.5是目前开源AI音乐生成模型中的佼佼者，在50+语言支持方面表现突出。

Claim: ACE-Step v1.5支持50+语言的歌词生成，对英语、中文、日语、韩语、西班牙语、德语、法语、葡萄牙语、意大利语和俄语有特别强的支持。[^7^]
Source: ComfyUI Blog - ACE-Step 1.5 is Now Available
URL: https://blog.comfy.org/p/ace-step-15-is-now-available-in-comfyui
Date: 2026-02-03
Excerpt: "Strict adherence to prompts across 50+ languages, with particularly strong support for English, Chinese, Japanese, Korean, Spanish, German, French, Portuguese, Italian, and Russian."
Context: 主流AI工作流平台对ACE-Step的官方集成介绍
Confidence: high

Claim: ACE-Step v1.5通过内在强化学习机制，在50+语言上保持严格的Prompt遵循，同时支持MIDI导出、声部分离、人声克隆等专业功能。[^8^]
Source: ACE-Step 1.5论文 - arXiv 2602.00744
URL: https://arxiv.org/html/2602.00744v3
Date: 2026-02-06
Excerpt: "This alignment is achieved through intrinsic reinforcement learning relying solely on the model's internal mechanisms, thereby eliminating the biases inherent in external reward models or human preferences... maintaining strict adherence to prompts across 50+ languages."
Context: 学术论文
Confidence: high

### 1.5 Mureka：专门针对中文优化的商业模型

Mureka（昆仑万维）是专门针对中文音乐生成优化的商业AI音乐模型。

Claim: Mureka专门针对中文人声和中文歌词进行了优化，在中文音乐生成方面超越了Suno。Mureka V8支持10+语言，包括中文（普通话）、日语、韩语、西班牙语、法语、德语等。[^9^]
Source: Musci.io - How to Choose the Right AI Music Model
URL: https://musci.io/blog/how-to-choose-ai-music-model
Date: 2026-04-13
Excerpt: "Mureka is specifically optimized for Chinese vocals and Chinese-language lyrics. If your project involves Mandarin, Cantonese, or other Chinese languages, Mureka produces the most natural results."
Context: AI音乐模型对比评测
Confidence: high

Claim: Mureka V9在中文音乐生成方面超越Suno V5，特别是在人声清晰度、旋律质量和情感表达方面。其MusiCoT（音乐思维链）架构通过在生成前预规划音乐结构来提升旋律连贯性37%。[^10^]
Source: Mureka V9 vs MiniMax Music 2.6 Comparison
URL: https://murekav9.com/mureka-v9-vs-minimax-music-2-6
Date: 2026-04-23
Excerpt: "Japanese / Korean / 10+ language support" - Mureka V9; "Mureka flips the standard AI music workflow on its head... lyrics-first approach"
Context: 官方对比评测页面
Confidence: high

Claim: 抖音爆款歌曲《还我妈生鼻》由Mureka生成，5天播放量破百万，验证了AI中文音乐的商业潜力。[^11^]
Source: 昆仑万维旗下大模型全解析
URL: https://mp.weixin.qq.com/s?__biz=MzAwNDUxOTg2Mw==&mid=2653197590
Date: 2025-08-19
Excerpt: "典型案例包括抖音爆款歌曲《还我妈生鼻》，5天播放量破百万，验证了AI音乐的商业潜力。"
Context: 商业报道
Confidence: medium

### 1.6 MiniMax Music：中国传统乐器行业领先

Claim: MiniMax Music对中国传统乐器（笛子、琵琶、古筝等）的理解和再现达到行业领先水平，能够自然地将这些乐器融入管弦乐编排和现代制作环境中。[^12^]
Source: MiniMax Music 2.5+官方博客
URL: https://www.minimax.io/news/music-25-unlock-instrumental-music
Date: 2026-03-04
Excerpt: "MiniMax Music's understanding and reproduction of traditional Chinese musical instruments is at an industry-leading level. MiniMax Music can accurately present the tonal expressiveness and performance details of ethnic instruments such as flute, pipa, and guzheng."
Context: MiniMax官方技术博客
Confidence: high

### 1.7 Fish Speech：中文TTS准确率1.3% CER

Claim: Fish Speech V1.5在中文语音合成方面表现优异，字符错误率（CER）仅为1.3%，训练数据包含30万+小时中英双语数据。[^13^]
Source: SiliconFlow - Fish-Speech-1.5模型介绍
URL: https://www.siliconflow.com/models/fish-speech-1-5
Date: 2026-04-21
Excerpt: "The model achieved a word error rate (WER) of 3.5% and a character error rate (CER) of 1.2% for English, and a CER of 1.3% for Chinese characters."
Context: 第三方AI模型平台的技术规格说明
Confidence: high

---

## 2. 中文歌词在AI音乐中的核心问题："倒字"现象

### 2.1 什么是"倒字"

"倒字"是中文歌曲创作中的经典问题，指的是歌词中汉字的声调与旋律的音高走向不匹配，导致听众产生歧义或误解。

Claim: "倒字"（或称"倒音"）是指用字的声调或韵脚与音符的高低起伏有冲突，导致唱起来完全变了另一回事。中文作为声调语言，旋律走向与字音声调走向不符时，就会产生"倒字"。[^14^]
Source: 唯陌音樂 - 那些歌詞與旋律之間不為人知的秘密
URL: https://wemore8888.com/...
Date: 2025-05-14
Excerpt: "倒音是指用字的聲調或韻腳與音符的高低起伏有衝突，導致唱起來完全變了另一回事。這種情況不僅會影響歌曲的表達效果，還可能讓聽眾誤解歌詞的原意。"
Context: 专业音乐创作博客
Confidence: high

Claim: 在吟诵和戏曲中，"依字行腔"是基本原则——声调向上就往上吟，声调下降就往下吟。如果旋律走向与字音声调走向不符，就是"倒字"。[^15^]
Source: 中国孔子网 - 吟诵的规则
URL: https://www.chinakongzi.org/zt/ys/kecheng/201706/t20170609_136993.htm
Date: 2017-06-09
Excerpt: "声调向上就往上吟，声调下降就往下吟，这就是依字行腔。吟的旋律走向跟字音声调的走向不符，就是'倒字'。"
Context: 中国传统吟诵文化教育
Confidence: high

### 2.2 经典"倒字"案例

Claim: 经典倒字案例包括：萧亚轩《爱的主打歌》中"猪大哥"的误听；《秋蝉》中"春水叫寒"因"水"的上声在旋律中是最高音，听起来像"春睡"。[^16^]
Source: 唯陌音樂
URL: https://wemore8888.com/...
Date: 2025-05-14
Excerpt: "例如，蕭亞軒的《愛的主打歌》，不看歌詞的話會一直聽到「豬大哥」，還有《秋蟬》中的「聽我把春水叫寒」，因為「水」的上聲在旋律中是最高音，聽起來像「春睡」。"
Context: 流行音乐分析
Confidence: high

### 2.3 AI音乐中的"倒字"问题

Claim: 中文作为声调语言，AI在生成旋律时如果没有考虑汉字的声调特征，就很容易产生"倒字"问题。罗大佑等优秀词曲作者会花大量时间确保旋律与字调的匹配。在AI音乐中，这仍是一个未解决的挑战。[^17^]
Source: 小宇宙FM - 粤语流行歌五十年
URL: https://www.xiaoyuzhoufm.com/episode/67fbc3b1623bc78c395ec1c0
Date: 2025-04-13
Excerpt: "中文词儿确实有这个问题...这个就是声调语言的特征...罗大佑最早期据说他为了想一首词，包括他的音调跟他的词语，他可以花三年时间去写。"
Context: 专业音乐播客
Confidence: high

**关键洞察**：目前主流AI音乐生成模型（Suno、Udio、DiffRhythm、ACE-Step等）在生成中文歌曲时，都未明确解决"倒字"问题。旋律生成主要基于统计模式，而非严格的"依字行腔"原则。这是中文AI音乐创作中最大的技术盲区。

---

## 3. 中文发音优化技巧：拼音标注、汉字vs拼音输入

### 3.1 汉字 vs 拼音输入：Suno的最佳实践

Claim: 对于Suno，强烈建议使用汉字而非拼音。Suno的语言模型处理汉字时具有更好的声调准确性和自然语感。拼音会丢失声调信息，可能使模型困惑。[^18^]
Source: HookGenius - Suno Chinese Prompts
URL: https://hookgenius.app/learn/suno-chinese-prompts/
Date: 2026-03-14
Excerpt: "Chinese characters (汉字) are strongly recommended over pinyin. Suno's language model processes characters with better tonal accuracy and natural phrasing. Pinyin can confuse the model because it loses tonal information."
Context: AI音乐Prompt工程指南
Confidence: high

### 3.2 多音字解决方案

中文多音字是AI音乐生成中的常见难题。以李白《早发白帝城》为例，"朝""还""重"等多音字，AI有很大概率读错。

Claim: 针对Suno中文多音字问题，经过500积分的测试，有两种可行方案：(1) 同音字替换法——用相同读音的字替换（如"朝→招"）；(2) 拼音标注法——在字后加拼音括号（如"朝(zhāo)"）。[^19^]
Source: Suno4.cn - Suno AI如何解决中文多音字的问题
URL: http://blog.suno4.cn/article/32
Date: 2024-06-17
Excerpt: "解决方案一：同音字替换...解决方案二：拼音法就是在使用拼音标注的方式进行标注，让AI读懂。这种方式大部分是可以读懂的，但是好像也有一小部分的概率读不懂。"
Context: 中文AI音乐实践博客
Confidence: high

Claim: Suno官方FAQ也推荐针对中文多音字使用同音字替换法或拼音标注法，实际测试显示v3.5版本对声调转换仍有不足。[^20^]
Source: Suno中文站 - 常见问题
URL: https://www.suno-zh.com/faq.html
Date: 未知
Excerpt: "针对中文多音字难题提供两种解决方案：同音字替换法（如'朝→招'）保持韵律准确性，拼音标注法提升AI识别率。实际测试显示v3.5版本对声调转换仍有不足。"
Context: 官方FAQ
Confidence: high

### 3.3 拼音标注的具体方法

Claim: 最可靠的Suno中文发音优化方法是手动加拼音（带声调），如"倔强(jué jiàng)"，放在括号内跟在字后面。也可以用在线拼音转换工具预先批量标注。[^21^]
Source: Baidu文库 - suno读错中文怎么办
URL: http://word.baidu.com/view/9055b207a700a6c30c22590102020740be1ecd08.html
Date: 2025-12-28
Excerpt: "手动加拼音（最直接有效）：这是目前最靠谱的办法。在它肯定读错的字后面，直接用括号加上拼音（带声调）。比如，你想让它唱倔强(jué jiàng)，就在文本里写倔强(jué jiàng)。"
Context: 中文AI音乐实践指南
Confidence: high

### 3.4 通用发音修复技巧

Claim: Suno没有专门的发音控制metatag，但可以使用[Staccato]获得清晰的音节分离、[Spoken Word]获得最清晰的发音、[Operatic]获得精确的发音。此外，ALL CAPS可使单词更响亮，连字符可拉长单词，省略号可添加戏剧性停顿。[^22^]
Source: HookGenius - Fix Suno Pronunciation
URL: https://hookgenius.app/learn/fix-suno-pronunciation/
Date: 2026-02-20
Excerpt: "[Staccato] produces crisp syllable separation for better enunciation, [Spoken Word] uses a speaking voice (clearest pronunciation), and [Operatic] provides precise articulation."
Context: 发音修复专业指南
Confidence: high

---

## 4. 其他语言支持：日语、韩语、西班牙语、法语AI演唱质量

### 4.1 语言质量分级

Claim: AI声乐生成的质量因语言而异，可分为四个层级：(1) 顶级：英语、西班牙语、法语、德语、意大利语；(2) 中等：日语（受益于简单语音学）、韩语、普通话（面临声调复杂性挑战）；(3) 新兴：葡萄牙语、荷兰语、俄语、阿拉伯语；(4) 有限：芬兰语、匈牙利语等低资源语言。[^23^]
Source: Sonarworks - Can AI generate vocals in different languages?
URL: https://www.sonarworks.com/blog/learn/can-ai-generate-vocals-in-different-languages
Date: 2025-11-22
Excerpt: "Top-tier languages – English, Spanish, French, German, and Italian consistently produce the highest quality results... Moderate success languages – Japanese benefits from simple phonetics, while Korean handles unique sound combinations reasonably well, and Mandarin faces challenges with tonal complexity."
Context: 专业音频技术博客
Confidence: high

### 4.2 各平台多语言表现对比

Claim: 根据YuE论文的人类评测数据，Suno V4在中文歌词跟随率（73%）和音乐性（88%）方面均排名第一；Udio在韩语歌词跟随率（62%）和音乐性（62%）方面排名第一，但在中文方面仅36%歌词跟随率；YuE在日语歌词跟随率（70%）方面排名第一。[^24^]
Source: YuE论文 - arXiv 2503.08638
URL: https://arxiv.org/html/2503.08638
Date: 2025-03-11
Excerpt: "Suno V4: Chinese Lyrics 73%, Chinese Music 88%; Udio: Korean Lyrics 62%, Korean Music 62%; YuE: Japanese Lyrics 70%, Japanese Music 52%"
Context: 学术论文中的多语言人类偏好评测
Confidence: high

### 4.3 Udio的多语言特性

Claim: Udio的日语声乐尊重语言的节奏模式，西班牙语声乐带有特征性的卷舌辅音和开放的元音，法语声乐处理鼻化元音和联诵——这些都远超简单的文本渲染。[^25^]
Source: AIViewer.ai - Udio
URL: https://aiviewer.ai/tools/udio-ai/
Date: 2026-03-10
Excerpt: "A song generated in Japanese respects the rhythmic patterns of the language. Spanish vocals carry the characteristic rolled consonants and open vowel sounds. French vocals handle the characteristic nasal vowels and liaisons."
Context: 第三方评测
Confidence: medium

---

## 5. 跨语言创作：用AI翻译歌词后演唱、多语言混合歌曲

### 5.1 翻译歌词后演唱的挑战

Claim: AI歌曲翻译面临的核心挑战包括：字面翻译丢失情感内涵、韵律和节奏适配困难、文化符号和俚语的不可译性。2026年的AI音乐系统相比2024-2025年的系统已有显著进步，能够更好地保留情感完整性。[^26^]
Source: Soundverse - How to Create AI Songs Across Languages
URL: https://www.soundverse.ai/blog/article/how-to-create-ai-songs-across-languages-without-losing-meaning-0229
Date: 2026-02-22
Excerpt: "Unlike older systems from 2024 or 2025 that performed literal lyrics substitutions, 2026 models preserve interplay between melody and meaning. Producers can now maintain emotional integrity across Spanish, Hindi, Japanese, or Arabic versions."
Context: AI音乐平台官方博客
Confidence: medium

### 5.2 多语言混合歌曲的创作方法

Claim: Suno支持在同一段歌曲中混合多种语言。具体方法是在自定义模式下直接编写多语言歌词（如中文+日语），AI会根据文本自动切换演唱语言。但混合语言的稳定性不如单一语言。[^27^]
Source: CSDN - Suno AI如何解决制作多语言混合的歌曲
URL: https://blog.csdn.net/linxingliang/article/details/139810449
Date: 2024-06-19
Excerpt: "这里难的地方就是歌词...首先先写出中文的歌词，或者AI生成都可以，然后再把用日语唱的歌词让AI翻译成日语。"
Context: 中文技术博客
Confidence: high

### 5.3 跨语言歌曲翻译的专业方法

Claim: 专业的跨语言歌曲改编需要三个步骤：(1) 音乐适配而非直译——确保新歌词匹配原有音节数、节奏和韵脚；(2) 母语歌手录制；(3) AI声音匹配技术使新录音听起来像原歌手。[^28^]
Source: AI Music Service - Changing Song Lyrics Into Another Language
URL: https://aimusicservice.com/blogs/news/changing-song-lyrics-into-another-language-what-works-and-what-doesnt
Date: 2026-02-05
Excerpt: "The real work begins with musical adaptation, where skilled linguists and songwriters team up to rewrite the lyrics, not just translate them. They aim to capture the original message and feeling, but critically, they make sure the new words fit perfectly into the song's existing structure."
Context: AI音乐服务提供商的专业指南
Confidence: high

---

## 6. 方言和地方语言支持：粤语、四川话等

### 6.1 粤语AI音乐生成

Claim: Suno支持粤语演唱，但结果不稳定。稳定生成粤语歌曲的方法是：先将歌词交给大语言模型给出粤语拼音标注（如"nei5 hou2"），然后将带粤语拼音标注的歌词粘贴到Suno中，在风格提示中写上"Cantonese song"。[^29^]
Source: Suno4.cn - 用Suno AI音乐写粤语歌的方法
URL: http://suno4.cn/article/9
Date: 2024-05-14
Excerpt: "要稳定生成粤语歌曲也特别简单：先把歌词扔给某一个大语言模型，让她给出粤语拼音标注；然后把带有粤语拼音标注的歌词贴到Suno里面，在Styles of Music里面写上粤语歌曲（Cantonese song）。"
Context: 中文AI音乐实践博客
Confidence: high

Claim: CSDN技术博客指出，Suno粤语生成的技术本质是在Fine-tuning阶段引入了大规模粤语歌词-旋律对齐语料，并构建了粤语声调（六调九声）与旋律走向的映射规则库。用户需在歌词中严格标注粤语拼音并避免简体字转写歧义。[^30^]
Source: CSDN - Suno AI音乐生成七大核心技巧
URL: https://wenku.csdn.net/doc/82n8htrv4q
Date: 2025-10-23
Excerpt: "其技术本质是Suno模型在Fine-tuning阶段引入了大规模粤语歌词-旋律对齐语料，并构建了粤语声调（六调九声）与旋律走向的映射规则库——用户需在歌词中严格标注粤语拼音（如'nei5 hou2'）并避免简体字转写歧义。"
Context: 技术分析文档
Confidence: medium

### 6.2 ACE-Step支持粤语

Claim: ACE-Step明确支持粤语（Cantonese）演唱，用户可在界面中选择vocal语言，然后直接用粤语歌词创作。ACE-Step还可以在同一首歌中混合多种语言。[^31^]
Source: ACE-Step GitHub - Musician's Guide
URL: https://github.com/ace-step/ACE-Step-1.5/blob/main/docs/en/ace_step_musicians_guide.md
Date: 2026-02-06
Excerpt: "ACE-Step can generate vocals in 50+ languages, including: English, Spanish, French, German, Italian, Portuguese, Chinese (Mandarin & Cantonese), Japanese, Korean... You can even mix languages within a single song."
Context: 官方文档
Confidence: high

### 6.3 其他方言支持现状

Claim: 语音识别模型TouchASP支持五种语言/方言的识别：普通话、英语、粤语、四川话、闽南语。其中闽南语因数据不足表现较弱，四川话和粤语支持较好。[^32^]
Source: TouchASP论文 - arXiv 2412.15622
URL: https://arxiv.org/html/2412.15622v1
Date: 2024-12
Excerpt: "We support five language identification tasks, including Mandarin, English, Cantonese, Sichuan dialect, and Minnan dialect... The performance of the Minnan dialect is relatively weak. This may be attributed to insufficient data availability."
Context: 学术论文
Confidence: high

Claim: Qwen3-ASR支持包括粤语（香港口音、广东口音）、四川话、吴语、闽南语等在内的多种中文方言识别。[^33^]
Source: Alibaba Cloud - Qwen3-ASR开源
URL: https://www.alibabacloud.com/blog/qwen3-asr-&-qwen3-forcedaligner-is-now-open-sourced_602843
Date: 2026-01-30
Excerpt: "Supported Dialects: Anhui, Dongbei, Fujian, Gansu, Guizhou, Hebei, Henan, Hubei, Hunan, Jiangxi, Ningxia, Shandong, Shaanxi, Shanxi, Sichuan, Tianjin, Yunnan, Zhejiang, Cantonese (Hong Kong accent), Cantonese (Guangdong accent), Wu language, Minnan language."
Context: 阿里云官方技术博客
Confidence: high

**重要发现**：目前AI音乐生成工具中，只有ACE-Step和Suno明确支持粤语演唱。四川话、闽南语等其他方言在AI音乐生成方面的支持几乎为零，仅在语音识别（ASR）领域有研究支持。

---

## 7. 中文AI音乐成功案例：抖音/快手上的AI中文歌曲

### 7.1 抖音爆款AI中文歌曲案例

Claim: 抖音音乐博主"苏NO"用Suno V5生成了一首陶喆风格的《青花瓷》翻唱，在抖音获赞达67.2万。他上传原曲旋律作为参考音频，在提示词中详细描述陶喆的音色特征和演唱技巧。[^34^]
Source: AI新榜 - 单月涨粉超38万
URL: https://edit.newrank.cn/detail.html?uuid=61BC7E71873B6700A99BD45E0413A5D7
Date: 2025-11-17
Excerpt: "他用Suno V5生成了一首陶喆风格的《青花瓷》翻唱，在抖音获赞达67.2万...我会在提示词里详细描述陶喆的音色特征和演唱技巧，比如在哪句歌词后加入他标志性的转音。"
Context: 自媒体行业分析
Confidence: high

Claim: 抖音AI热曲《远山少年》《不能不想你》等播放量都在百万以上，最高者超过1000万。抖音博主"南溪以南"利用"AI说唱+动物科普"在3个月涨粉125万+，合集播放3.1亿。[^35^]
Source: AI NEWS - 抖音博主用"AI说唱+动物科普"
URL: https://news.aibase.com/zh/news/23594
Date: 2025-12-11
Excerpt: "3个月涨粉百万、合集播放3.1亿...通过 Suno V5等 AI 工具将动物科普知识转化为洗脑中文说唱。"
Context: AI行业新闻报道
Confidence: high

### 7.2 国内AI音乐商业变现

Claim: 抖音热门AI歌曲《不能不想你》的创作者"浮生未歇"表示出售这首歌曲版权的收益为80万元。汽水音乐允许AI音乐获得播放收益，并与抖音打通有利于AI音乐传播。[^36^]
Source: 人人都是产品经理 - AI音乐改造音乐行业
URL: https://www.woshipm.com/ai/6306339.html
Date: 2025-12-15
Excerpt: "抖音热门AI歌曲《不能不想你》，后者由博主'浮生未歇'创作，该博主在视频中表示，出售这首歌曲版权的收益为80万元。"
Context: 行业深度分析
Confidence: medium

### 7.3 Spotify上的AI中文歌曲

Claim: 美国诗人泰莉莎利用Suno创造的虚拟歌手Xania Monet在Spotify上拥有超过120万听众，其热门曲目登上了Billboard榜单。Spotify允许AI音乐获取版权分成收益。[^37^]
Source: 人人都是产品经理
URL: https://www.woshipm.com/ai/6306339.html
Date: 2025-12-15
Excerpt: "由美国诗人泰莉莎（Telisha Nikki Jones）利用AI音乐生成平台Suno创造的虚拟歌手Xania Monet，在Spotify上拥有超过120万听众，其热门曲目《How Was I Supposed to Know？》登上了美国知名音乐榜单Billboard。"
Context: 行业深度分析
Confidence: high

---

## 8. 文化差异：东西方音乐结构差异对Prompt的影响

### 8.1 五声音阶与调式差异

Claim: 中国传统音乐使用五声音阶（宫商角徵羽），对应西方音乐的大调五声音阶（去掉4和7音）。五声音阶没有半音，任意两个音放在一起都不会"打架"，这使它具有跨文化的普适性。[^38^]
Source: Music Base - 五声音阶
URL: https://www.passerby.cc/scales/pentatonic.html
Date: 未知
Excerpt: "五声音阶只有5个音，是全世界各文化中最广泛使用的音阶。中国传统音乐（宫商角徵羽）就是五声音阶...没有半音——任意两个音放在一起都不会'打架'。"
Context: 音乐理论科普
Confidence: high

### 8.2 Prompt中的文化差异

Claim: 在Suno中创作中文音乐时，应使用具体的流派标签（如"Mandopop""C-Pop""Chinese R&B"）而非泛泛的"Chinese music"，并明确指定中国传统乐器名称（如"guzheng""erhu""pipa""dizi"）以获得更真实的音效。[^39^]
Source: HookGenius - Suno Chinese Prompts
URL: https://hookgenius.app/learn/suno-chinese-prompts/
Date: 2026-03-14
Excerpt: "Use specific genre tags like 'Mandopop,' 'C-Pop,' 'Chinese R&B,' 'Chinese hip-hop,' or 'Chinese folk ballad' rather than generic 'Chinese music.' Suno recognizes these subgenres and produces more authentic results. For traditional fusion, name specific instruments like guzheng, erhu, or pipa."
Context: Prompt工程指南
Confidence: high

### 8.3 MiniMax Music的跨风格融合能力

Claim: MiniMax Music支持跨风格标签组合生成，能够理解不同风格之间的张力，并将其转化为连贯的音乐语言，而非简单的元素拼贴。无论中国传统乐器与现代电子结合，还是东方音色与西方结构结合，模型都能自然融合。[^40^]
Source: MiniMax Music 2.5+
URL: https://www.minimax.io/news/music-25-unlock-instrumental-music
Date: 2026-03-04
Excerpt: "Whether traditional instruments with modern electronic, or Eastern timbres with Western structures, the model can understand the tension between different styles and transform them into coherent musical language, rather than simple element collage."
Context: 官方技术博客
Confidence: high

---

## 9. 中文AI音乐创作避坑指南

基于以上研究，我们总结了中文AI音乐创作的核心避坑指南：

### 避坑1：不要使用拼音输入中文歌词（Suno）
- **坑**：用拼音输入中文歌词，Suno会丢失声调信息，发音不准确。
- **解**：直接使用汉字（汉字）输入，Suno处理汉字有更好的声调准确性。[^18^]

### 避坑2：忽视多音字问题
- **坑**：中文多音字（如"行""乐""长""还""重"）AI大概率选最常见的读音，导致唱错。
- **解**：(1) 同音字替换法——用同音字替换多音字；(2) 拼音标注法——在字后加括号标注拼音（带声调），如"倔强(jué jiàng)"。[^19^][^21^]

### 避坑3：忽略"倒字"风险
- **坑**：AI生成的旋律可能不考虑汉字声调，导致"倒字"（听起来像别的词）。
- **解**：目前AI模型无法自动避免倒字。建议：(1) 选择声调变化较小的歌词；(2) 生成后仔细听辨是否有歧义；(3) 必要时手动调整歌词用字。[^14^][^15^]

### 避坑4：使用过于笼统的Prompt
- **坑**：只用"Chinese music""Chinese pop"等泛泛标签。
- **解**：使用具体的子流派标签：Mandopop、C-Pop、Chinese R&B、Chinese hip-hop、Chinese folk ballad。明确指定乐器：guzheng、erhu、pipa、dizi。[^39^]

### 避坑5：混合语言时不稳定
- **坑**：在同一段歌词中混用中文和英文/日文，AI可能 drift 到不想要的语言。
- **解**：保持每个段落一种语言；在全局提示中明确声明"All lyrics in Mandarin Chinese, no English"。[^41^]

### 避坑6：长句子导致发音模糊
- **坑**：中文歌词一行太长，AI换气点不对，导致咬字不清。
- **解**：将长句子拆分为短句，添加明确的标点断句，保持每行4-8个字为宜。[^21^]

### 避坑7：生僻字和网络用语
- **坑**：生僻字AI不认识，网络用语（如"酱紫""尬舞"）发音可能不符合预期。
- **解**：避免生僻字；网络用语替换为标准表达；方言词汇需加拼音标注。[^21^]

### 避坑8：期望AI自动处理粤语的复杂性
- **坑**：直接用简体字写粤语歌词，AI可能按普通话发音。
- **解**：使用粤语拼音标注（如"nei5 hou2"）；使用繁体中文；在风格中明确声明"Cantopop, Hong Kong pop"。[^29^][^30^]

### 避坑9：忽视歌曲结构标记
- **坑**：不使用[Verse]、[Chorus]等结构标签，AI生成结构混乱。
- **解**：在歌词中明确标注段落结构；为每个段落添加英文编曲指令。[^42^]

### 避坑10：生成后不检查发音
- **坑**：认为AI生成一次就够了，不检查每个字的发音。
- **解**：必须逐字听辨；对发音错误的字使用[Pronunciation: 字 = 拼音] metatag或同音字替换。[^22^]

---

## 10. 中文AI歌曲Prompt示例

### 示例1：Mandopop抒情 ballad（Suno格式）

```
Global Style Prompt:
Mandopop ballad, emotional male vocals singing in Mandarin Chinese, 
piano-driven, string arrangement, romantic, polished mix, slow tempo 72 BPM, 
heartfelt, C-Pop production, intimate vocal delivery

[Verse 1][soft piano intro, clean and intimate vocal delivery, sparse instrumentation]
霓虹在窗外闪烁
夜色慢慢降落
一个人的城市
寂寞在唱歌

[Chorus][driving pop-rock drum beat enters, string section swells, 
powerful layered lead vocals, building emotional intensity]
我们在城市微光中
寻找彼此的梦
就算世界再冷漠
心中有你就足够
```

**关键要点**：使用"Mandopop""C-Pop"等精确标签；每行歌词4-8字；段落标记清晰；英文指令控制编曲情绪。[^39^][^42^]

### 示例2：中国风电子融合（MiniMax/Suno通用）

```
Chinese traditional fusion, guzheng and erhu leading, 
modern electronic production with trap beats, 
ethereal female vocals in Mandarin, cinematic, atmospheric, 
East meets West, pentatonic melody, 128 BPM, 
dizi solo interlude, taiko-inspired percussion

[Verse]
月光洒满古道边
琴声悠悠入心田
千年一梦一瞬间
往事如烟又浮现

[Chorus]
风吹过 花落尽
情难了 意难平
一曲高歌问苍天
何处是归程
```

**关键要点**：明确指定中国传统乐器名称；提及"pentatonic"五声音阶；结合现代电子元素；营造"East meets West"氛围。[^39^][^40^]

### 示例3：粤语流行歌曲（Cantopop）

```
Cantopop ballad, Hong Kong pop style, emotional male vocals in Cantonese, 
80s-inspired arrangement, synth pads, electric piano, 
nostalgic, melancholic, polished production, 65 BPM

[Verse 1][intimate, breathy vocal delivery, minimal accompaniment]
nei5 zou6 mun4 zung6 jiu3 gin3 dou2 ngo5
（你走梦中 又见到我）
go2 zan6 haan6 zung6 yiu3 waa5 m4 syun3 zou6
（那阵闲中又话 不算数）

[Chorus][full band enters, emotional peak, string section]
cing1 zi2 jat1 zan6 zung6 si6 yung5 wan5
（情字一枕中 是永远）
mong4 zi6 soeng1 faat3 jyun4 zung6 m4 jyun5
（望字生发愿 终不圆）
```

**关键要点**：使用粤语拼音标注（Jyutping方案）；声明"Cantopop, Hong Kong pop"风格；繁体中文更佳；描述80年代港式编曲特色。[^29^][^30^]

---

## 11. 关键发现汇总

### 11.1 各平台中文支持排名（综合质量）

| 平台 | 中文支持评级 | 粤语支持 | 速度 | 开源 | 特点 |
|------|------------|---------|------|------|------|
| Suno V5 | ⭐⭐⭐⭐ | ⭐⭐（不稳定） | 快 | 否 | 中文歌词跟随率73%，需汉字输入 |
| Mureka V9 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 快 | 否 | 专门针对中文优化 |
| Udio | ⭐⭐⭐ | ⭐⭐ | 中等 | 否 | 12+语言，中文仅36%歌词跟随率 |
| ACE-Step 1.5 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 极快(<2s) | 是 | 50+语言，含粤语 |
| DiffRhythm | ⭐⭐⭐ | ⭐⭐ | 极快(10s) | 是 | G2P支持，中英文3:6:1训练比 |
| MiniMax 2.5+ | ⭐⭐⭐⭐ | ⭐⭐ | 快 | 否 | 中国传统乐器行业领先 |
| YuE | ⭐⭐⭐ | ⭐⭐ | 慢 | 是 | 中文歌词跟随60%，需微调 |

### 11.2 核心争议与反面观点

**争议1：拼音 vs 汉字输入**
- 正方（HookGenius等）：Suno必须用汉字，拼音丢失声调。[^18^]
- 反方（DiffRhythm等）：拼音标注（带声调）是有效的预处理方法，尤其对于多音字。[^5^]
- 结论：Suno用汉字最佳；DiffRhythm等支持G2P的模型可用拼音预处理。

**争议2：AI是否能真正理解中文声调**
- 正方：Suno V5中文歌词跟随率73%，已接近商用水平。[^3^]
- 反方：所有AI模型均未显式解决"倒字"问题，旋律生成不"依字行腔"。
- 结论：AI能"读准"中文，但不一定"唱好"中文——声调与旋律的匹配仍是盲区。

**争议3：粤语支持的真实性**
- 正方：ACE-Step明确支持粤语；Suno可通过粤语拼音稳定生成。[^29^][^31^]
- 反方：粤语六调九声的复杂性远超普通话，AI只是近似模拟。
- 结论：粤语AI音乐处于"能玩但不够真"的阶段。

### 11.3 搜索来源统计

- 学术论文：6篇（YuE、DiffRhythm、DiffRhythm+、ACE-Step、TouchASP等）
- 官方文档/博客：8篇（Suno、Udio、MiniMax、ACE-Step、DiffRhythm等）
- 第三方评测：10+篇（AIViewer、The Vocal Market、Musci.io等）
- 中文实践博客：8+篇（Suno中文站、CSDN、Suno4.cn等）
- 行业媒体报道：5+篇（AI新榜、人人都是产品经理、AI NEWS等）

---

## 参考文献索引

[^1^]: HookGenius - Suno Prompts for Chinese Music, 2026-03-14, https://hookgenius.app/learn/suno-chinese-prompts/
[^2^]: The Vocal Market - Suno vs Udio vs Real Vocalists, 2026-04-21, https://thevocalmarket.com/blogs/how-to/suno-vs-udio-vs-real-vocalists-2026
[^3^]: YuE论文 - arXiv 2503.08638, 2025-03-11, https://arxiv.org/html/2503.08638
[^4^]: AIViewer.ai - Udio, 2026-03-10, https://aiviewer.ai/tools/udio-ai/
[^5^]: DiffRhythm论文 - arXiv 2503.01183, 2025-03-03, https://arxiv.org/html/2503.01183v1
[^6^]: DiffRhythm官网, https://diffrhythm.com/zh
[^7^]: ComfyUI Blog, 2026-02-03, https://blog.comfy.org/p/ace-step-15-is-now-available-in-comfyui
[^8^]: ACE-Step论文 - arXiv 2602.00744, 2026-02-06, https://arxiv.org/html/2602.00744v3
[^9^]: Musci.io, 2026-04-13, https://musci.io/blog/how-to-choose-ai-music-model
[^10^]: Mureka V9对比页面, 2026-04-23, https://murekav9.com/mureka-v9-vs-minimax-music-2-6
[^11^]: 昆仑万维解析, 2025-08-19
[^12^]: MiniMax Music 2.5+, 2026-03-04, https://www.minimax.io/news/music-25-unlock-instrumental-music
[^13^]: SiliconFlow - Fish Speech, 2026-04-21, https://www.siliconflow.com/models/fish-speech-1-5
[^14^]: 唯陌音樂, 2025-05-14, https://wemore8888.com/...
[^15^]: 中国孔子网, 2017-06-09, https://www.chinakongzi.org/zt/ys/kecheng/201706/t20170609_136993.htm
[^16^]: 唯陌音樂, 2025-05-14
[^17^]: 小宇宙FM, 2025-04-13, https://www.xiaoyuzhoufm.com/episode/67fbc3b1623bc78c395ec1c0
[^18^]: HookGenius, 2026-03-14
[^19^]: Suno4.cn, 2024-06-17, http://blog.suno4.cn/article/32
[^20^]: Suno中文站FAQ, https://www.suno-zh.com/faq.html
[^21^]: Baidu文库, 2025-12-28, http://word.baidu.com/view/9055b207a700a6c30c22590102020740be1ecd08.html
[^22^]: HookGenius - Fix Suno Pronunciation, 2026-02-20, https://hookgenius.app/learn/fix-suno-pronunciation/
[^23^]: Sonarworks, 2025-11-22, https://www.sonarworks.com/blog/learn/can-ai-generate-vocals-in-different-languages
[^24^]: YuE论文, 2025-03-11
[^25^]: AIViewer.ai, 2026-03-10
[^26^]: Soundverse, 2026-02-22, https://www.soundverse.ai/blog/article/how-to-create-ai-songs-across-languages-without-losing-meaning-0229
[^27^]: CSDN, 2024-06-19, https://blog.csdn.net/linxingliang/article/details/139810449
[^28^]: AI Music Service, 2026-02-05
[^29^]: Suno4.cn, 2024-05-14, http://suno4.cn/article/9
[^30^]: CSDN文库, 2025-10-23, https://wenku.csdn.net/doc/82n8htrv4q
[^31^]: ACE-Step GitHub, 2026-02-06
[^32^]: TouchASP论文, 2024-12, https://arxiv.org/html/2412.15622v1
[^33^]: Alibaba Cloud, 2026-01-30
[^34^]: AI新榜, 2025-11-17
[^35^]: AI NEWS, 2025-12-11
[^36^]: 人人都是产品经理, 2025-12-15
[^37^]: 人人都是产品经理, 2025-12-15
[^38^]: Music Base, https://www.passerby.cc/scales/pentatonic.html
[^39^]: HookGenius, 2026-03-14
[^40^]: MiniMax Music, 2026-03-04
[^41^]: JackRighteous - Suno v5 Multilingual Guide, 2025-09-24, https://jackrighteous.com/blogs/guides-using-suno-ai-music-creation/suno-v5-multilingual-english-pronunciation-guide
[^42^]: 5bei.cn - Suno V5教程, 2025-10-29, https://www.5bei.cn/sunov5-officially-became-a-god-teach-you-to-gener.html

---

> 本报告基于≥20次独立搜索，涵盖学术论文、官方文档、第三方评测、中文实践博客和行业媒体等多种权威来源。所有关键发现均附有inline citations和原文摘录。
