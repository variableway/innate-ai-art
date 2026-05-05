# 音乐小白AI创作完全指南：从零到出品

## 阅读指南
### 如何使用本报告
#### 本报告为"填空式"操作手册，每个章节提供可直接执行的步骤、可复制的Prompt、可点击的工具链接
#### 建议阅读路径：第1章（术语）→ 第2章（路径概览）→ 第3章（工具选择）→ 第4-6章（实操步骤）→ 第7章（版权）→ 第8章（进阶）

## 1. 核心术语速查表：音乐小白必须知道的15个词（~2000字，2张表）
### 1.1 速度、调性与结构
#### 1.1.1 BPM（每分钟节拍数）：不是数字，是"感觉"——Trap的140 BPM与摇滚的140 BPM完全不同，Half-Time概念让速度感知翻倍
#### 1.1.2 Key（调性）：Major=明亮/开阔，Minor=暗淡/内敛；C Major最"白"，G Major最"吉他友好"
#### 1.1.3 Chord Progression（和弦进行）：I-V-vi-IV是流行音乐的"万能公式"，但顺序改变即改变情绪（如vi-IV-I-V更忧伤）
#### 1.1.4 歌曲结构六要素：Verse（叙事）/Chorus（记忆点）/Bridge（转折）/Intro（入场）/Outro（退场）/Pre-Chorus（蓄势）
### 1.2 乐器与声音
#### 1.2.1 四大件角色分工：Drums（推进感/骨架）、Bass（低频地基）、Harmony乐器（和弦填充）、Melody乐器（主线）
#### 1.2.2 合成器三大音色类型：Pad（氛围铺底）、Arp（分解琶音）、Lead（主音独奏）
#### 1.2.3 人声三层描述法：Character（raspy/breathy）、Delivery（belted/whispered）、Effects（dry/reverb-drenched）
### 1.3 制作与后期
#### 1.3.1 Reverb/EQ/Compression三件套：Reverb给空间，EQ给清晰度，Compression给密度——小白只需记住这三个词
#### 1.3.2 Mix（混音）vs Master（母带）：混音是"调各乐器音量"，母带是"让整首歌在不同设备上都好听"
### 1.4 术语与AI Prompt的映射表
#### 1.4.1 提供"术语→Prompt写法"对照表：每个术语如何在Suno/Udio Prompt中精确表达

## 2. 小白AI创作五步法：总览与心理建设（~1500字，1张流程图）
### 2.1 五步法总览
#### 2.1.1 找参考曲→拆解（Key/BPM/Chords）→写Prompt→生成3版→迭代优化：循环直到满意
### 2.2 关键心态
#### 2.2.1 "生成10版选最好的"法则：不要一次满意，要接受AI的"意外"有时更好
#### 2.2.2 "解构而非模仿"原则：提取元素（速度+调性+情绪+乐器组合）重新组合，而非复制整首歌
### 2.3 时间投入预期
#### 2.3.1 第一首歌：2-4小时（含学习）→ 第十首歌：30分钟完成全流程

## 3. Top 20工具推荐：你的AI音乐工具箱（~4000字，5张表）
### 3.1 AI歌曲生成平台（6个）
#### 3.1.1 Suno AI：50积分/天免费，$10-30/月，v4.5/v5，当前生态最成熟，适合完整歌曲生成（含人声）
#### 3.1.2 Udio：10/天+100/月免费，$10-30/月，UMG/WMG/Merlin/Kobalt全授权，版权基础最清洁，适合制作人
#### 3.1.3 ElevenLabs Music：7首/天免费，$9.99/月，与语音合成一体化，5-stem控制，适合内容创作者
#### 3.1.4 网易天音（国内）：微信小程序+Web，词曲编唱全流程，9种AI歌手，15+风格，零门槛
#### 3.1.5 海绵音乐/Mureka（国内）：字节跳动/昆仑万维，中文人声优化，抖音生态联动
#### 3.1.6 AIVA：€15-49/月，管弦乐/电影配乐专家，MIDI导出，Pro计划完整版权所有权
### 3.2 开源/本地部署工具（4个）
#### 3.2.1 DiffRhythm（谛韵）：西北工大/港中文，8GB显存，10秒生成4分45秒歌曲，完全开源免费
#### 3.2.2 ACE-Step 1.5：<4GB显存，MIT协议，50+语言，消费级可用，4-8步快速生成
#### 3.2.3 MusicGen/AudioCraft（Meta）：2-16GB显存，参考音频支持，学术研究级
#### 3.2.4 Audacity OpenVINO：免费DAW+Riffusion插件，音乐分离+生成+转录，零成本入门
### 3.3 音乐分析与拆解工具（4个）
#### 3.3.1 Moises：$3.99/月，一站式Key/BPM/Chords/分轨，2024苹果iPad年度应用
#### 3.3.2 Ultimate Guitar：免费+Pro $99/年，全球最大和弦谱库，200万+吉他谱
#### 3.3.3 Chordify：$3.49-6.99/月，YouTube链接实时和弦图谱，流行准确率90%+
#### 3.3.4 Tunebat/bpm-finder.net：免费无限上传，拖拽获Key+BPM，10秒出结果
### 3.4 后期处理与母带（3个）
#### 3.4.1 BandLab：完全免费在线DAW，跨平台协作，适合AI生成后的编排再混音
#### 3.4.2 LANDR：$11-40/月，最成熟AI母带，-14 LUFS标准化
#### 3.4.3 Moises AI Studio：浏览器内Auto-Mix & Mastering，AI Stem Generation，和弦指导生成
### 3.5 辅助创作工具（3个）
#### 3.5.1 Soundverse/AI Lyrics Writer：歌词生成→导入Suno Custom Mode的完整工作流
#### 3.5.2 TME Studio（腾讯）：音乐分离/MIR/辅助写词/智能曲谱，免费使用
#### 3.5.3 Fish Speech V1.5：开源TTS，中文CER仅1.3%，可生成高质量中文AI歌声
### 3.6 工具选择决策树
#### 3.6.1 提供"我问你答"式决策流程图：有显卡？→用DiffRhythm；要发行？→用Udio；纯小白？→用网易天音；要免费？→用BandLab+Audacity

## 4. 第一步到第三步：找歌→拆解→写Prompt（~4000字，3张表，5个Prompt模板）
### 4.1 找一首你爱死的歌
#### 4.1.1 确定参考曲的方法：不是"随便选"，而是"记录身体反应"——哪首歌让你心跳加速/流泪/想跳舞
#### 4.1.2 听歌记录模板：速度（快/慢/中）、亮度（明亮/暗淡/中性）、能量（跳/静/推）、情绪（快乐/忧伤/愤怒/平静）
### 4.2 拆解参考曲（工具实操）
#### 4.2.1 零成本拆解方案：bpm-finder.net（10秒获Key+BPM）+ FindTheChords.com（20秒获和弦进行）+ Moises免费版（2分钟获分轨）
#### 4.2.2 付费最佳体验：Moises Premium $3.99/月，一站式获取全部数据
#### 4.2.3 实战案例：拆解《Just Like Heaven》→ A Major, 150 BPM, Verse: A-E-Bm-D, Chorus: F#m-G-D
### 4.3 写Prompt（填空式模板）
#### 4.3.1 Suno Prompt模板：[Genre], [Mood], [Instrumentation], [Vocal], [BPM], [Key], [Structure hints]
#### 4.3.2 Udio Prompt模板：Theme + style + mood + instruments/timbre + vocal direction（自然语言描述式）
#### 4.3.3 纯音乐/器乐Prompt写法：必须显式加入"instrumental only"或"no vocals"
#### 4.3.4 中文歌曲Prompt特殊技巧：用汉字而非拼音、同音字替换法、标注拼音修正发音
#### 4.3.5 提供5个可直接复制的风格模板：Indie Pop抒情、Trap说唱、中国风电子、Lo-Fi chill、Big-Room EDM
### 4.4 Prompt进阶控制
#### 4.4.1 标点控制法：逗号并列、分号分隔结构、冒号赋值、括号补充、斜杠选项
#### 4.4.2 负面Prompt技巧：用"no synth""not pop"排除不想要的元素
#### 4.4.3 Meta Tags控制歌曲结构：[Verse]/[Chorus]/[Bridge]单独成行，Suno识别率最高

## 5. 第四步到第五步：生成→对比→迭代优化（~3000字，2张表）
### 5.1 生成与对比策略
#### 5.1.1 同一Prompt生成3个版本，每次只改一个变量（BPM 140/150/160），用控制变量法找到最佳参数
#### 5.1.2 版本命名规范：v1.0_原始 → v1.1_改BPM → v1.2_改乐器，建立可追溯的迭代记录
### 5.2 常见问题与修复方案
#### 5.2.1 "太流行"→加"indie, alternative, not mainstream"；"太电子"→加"guitar driven, acoustic, not synth"
#### 5.2.2 "没跳跃感"→加"staccato, stop-start, off-beat"；"太复古"→加"modern, crisp, 2020s production"
#### 5.2.3 "人声不对"→用三层描述法改Character/Delivery/Effects；"节奏不对"→具体描述鼓打法
#### 5.2.4 迭代检查清单：每次迭代前确认"要修什么""保留什么""改哪个变量"
### 5.3 从满意到可发布
#### 5.3.1 导出格式选择：MP3（分享）→ WAV（DAW再编辑）→ Stems（专业混音）
#### 5.3.2 7步后期处理流程：AI生成 → 音量平衡 → EQ微调 → 压缩 → 限制器 → LUFS检测 → 导出

## 6. 歌词创作与歌曲结构设计（~2500字，3张模板）
### 6.1 歌曲结构模板
#### 6.1.1 标准流行结构：Intro 4→Verse 8→Chorus 8→Verse 8→Chorus 8→Bridge 4→Chorus 8→Outro 4（单位：小节）
#### 6.1.2 Suno结构标签使用指南：[Verse] [Chorus] [Bridge]必须单独成行，标签后空一行写歌词
### 6.2 歌词创作基础
#### 6.2.1 押韵格式选择：AABB（简单直接）/ABAB（交错韵）/ABCB（半开放）/Free（无韵，叙事感）
#### 6.2.2 音节数控制：每行8-12个音节最适合AI演唱，过长会导致吞字
#### 6.2.3 Hook设计6技巧：重复短语、上升旋律线、节奏变化、关键词前置、情绪顶点、留白
### 6.3 AI辅助歌词工作流
#### 6.3.1 ChatGPT/Claude→生成歌词→人工筛选修改→加元标签→导入Suno Custom Mode
#### 6.3.2 中文歌词避坑："倒字"问题（声调与旋律不匹配）、多音字歧义、方言识别限制

## 7. 版权、商用与发行：你必须知道的法律红线（~2500字，2张表）
### 7.1 平台版权政策对比
#### 7.1.1 所有权≠商用权：Suno从"你拥有"改为"你被授予使用权"；AIVA Pro是唯一转让完整版权的平台
#### 7.1.2 Udio拥有最清洁法律基础（UMG/WMG/Merlin/Kobalt全授权），Suno仍有Sony诉讼 pending
#### 7.1.3 免费层=不可商用：所有平台的免费层输出均无商业使用权，不可用于任何盈利场景
### 7.2 发行平台规则
#### 7.2.1 Spotify允许AI音乐但删除7500万垃圾曲目；Apple Music推出透明度标签；Deezer检测44%AI上传
#### 7.2.2 DistroKid/RouteNote/UnitedMasters接受AI音乐（各有条件）；TuneCore拒绝100%AI；Bandcamp全面禁止
#### 7.2.3 中国强制标识法规：2025年9月1日起所有AI音频需添加显式+隐式标识
### 7.3 安全发布 checklist
#### 7.3.1 发布前10项确认：商用权确认、平台条款阅读、元数据清洁、Provenance记录、人声替换考虑、多版本备份

## 8. 进阶工作流：从AI demo到专业作品（~2500字，1张流程图）
### 8.1 三种复杂度工作流
#### 8.1.1 极简版（纯AI，零成本）：Suno生成 → 直接导出MP3分享
#### 8.1.2 标准版（AI+DAW，推荐）：Suno导出WAV → BandLab编排 → LANDR母带 → 发布
#### 8.1.3 专业版（全控制）：参考曲Moises分轨 → AIVA MIDI导出 → DAW真人录制 → 专业混音母带
### 8.2 中国用户特别路径
#### 8.2.1 无需翻墙路径：网易天音/海绵音乐生成 → 网易云音乐/汽水音乐发布 → 平台激励金
#### 8.2.2 技术用户路径：DiffRhythm本地部署 → ACE Studio人声 → 剪映配视频 → 抖音/快手发布
#### 8.2.3 国际发行路径：虚拟信用卡订阅Udio → 人类再创作 → DistroKid发行全球
### 8.3 持续精进资源
#### 8.3.1 今天开始：Suno官方Discord、r/SunoAI、B站"AI音乐教程"
#### 8.3.2 本周进阶：Tunesona Prompt博客、AvenueAR Suno指南、Moises教程系列
#### 8.3.3 长期提升：Sound on Sound杂志、Jack Righteous完整指南、HookTheory和弦理论

## 9. 核心洞察：AI音乐创作的未来与你的位置（~1500字）
### 9.1 八大跨维度洞察
#### 9.1.1 工具链协作取代单平台生成："Moises拆解→Suno生成→DAW编排→LANDR母带"的链式产出质量最高
#### 9.1.2 版权分层策略决定商业化生死：面向国际市场用Udio+人类修饰，面向中国市场用网易天音+平台激励
#### 9.1.3 Prompt工程师是核心技能：同样的Suno账户，精准Prompt与随意描述的产出质量差异可达10倍
#### 9.1.4 开源工具与中国市场天然联盟：DiffRhythm（西北工大）和ACE-Step绕过网络+支付双重壁垒
#### 9.1.5 后期处理是最大杠杆：免费工具的成品经后期处理后，可超越付费工具的raw输出
#### 9.1.6 微型创作者经济正在形成：网易云60万首AI歌曲、汽水音乐千次播放0.8-1.5元
#### 9.1.7 教育体系存在AI音乐素养缺口：传统乐理和AI工具教程不相交，本报告填补整合空白
#### 9.1.8 迭代纪律比天赋更重要：专业创作者平均7-12轮迭代，小白通常在第1-2轮放弃

# References
## music_ai_outline_references_raw.md
- **Type**: Citation collection
- **Description**: All sources gathered during research phases
- **Path**: /mnt/agents/output/research/

## music_ai.agent.outline.md
- **Type**: Report outline
- **Description**: This outline file
- **Path**: /mnt/agents/output/music_ai_guide.agent.outline.md
