# AI 歌词生成工具深度调研报告

> 调研日期：2026-05-12
> 背景：为 Auto Music Studio 项目评估可集成的歌词生成方案，梳理行业现状和最佳实践

---

## 一、工具全景分类

### 1.1 综合音乐平台（带歌词生成）

| 工具 | 开发方 | 中文歌词质量 | 定价 | 核心优势 |
|------|--------|------------|------|---------|
| **海绵音乐** | 字节跳动 | **最佳** | 完全免费 | 中文韵律和意境表达最好，支持"改歌词不改旋律" |
| **Suno** | 美国 | 中等 | 免费10首/天，Pro $10/月 | 旋律/编曲质量最佳，Meta Tag 结构控制最成熟 |
| **网易天音** | 网易 | 优秀 | 部分免费 | 词曲协同调整，生成后可改音高/音色 |
| **天工SkyMusic** | 昆仑万维 | 优秀 | 免费 | V8 模型中文演唱超海外，CoT 音乐推理 |
| **Udio** | 美国 | 中等偏弱 | 付费 | 音质好（48kHz WAV），但中文是短板 |
| **蘑兔AI** | 独立 | 优秀 | 免费功能丰富 | 深度适配中文创作习惯，20秒出歌 |
| **Mureka** | 昆仑万维 | 优秀（V8专业级） | ~$12/月 | 全球首个 CoT 音乐推理大模型 |
| **豆包** | 字节跳动 | 良好 | 完全免费 | 输入主题+选风格即可生成 |
| **Tunee** | 天谱乐 | 良好 | 付费（每日免费额度） | 国内首个对话式音乐创作 Agent |
| **EasyMusic.AI** | — | 良好 | $12.80/月 | 集成 Google Lyria 3 |
| **Remusic** | — | 良好 | 免费额度 | 版权免费输出，MV 生成 |

### 1.2 专用歌词工具

| 工具 | 定位 | 中文支持 | 定价 | 特色 |
|------|------|---------|------|------|
| **LyricStudio** | 创作型歌词工具 | 支持（30+语言） | 免费增值 | 协作写作、内置录音、歌曲模板 |
| **LyricLab** | 音乐人导向 | 否 | $39.99 买断（~100首歌） | 9流派32子类、14种情绪、从图片生成歌词 |
| **DeepBeat** | 说唱歌词专用 | 否 | 免费 | ML 韵脚检测，Rap 语料库训练 |
| **These Lyrics Do Not Exist** | 快速灵感 | 否 | 免费 | 每行全新生成，突破创作瓶颈 |
| **Somio AI** | 歌词+完整歌曲 | 支持 | 订阅制 | 版权免费、Stem 分离、Remix |
| **ChangeLyric** | 歌词改写 | 否 | — | AI 驱动的歌词修改器 |
| **RHYMEBOOK** | 写作工作台 | 否 | — | 实时押韵建议、协作写作 |

### 1.3 LLM 通用模型（最灵活）

| 模型 | 歌词质量 | 中文 | 定价 | API | 最佳场景 |
|------|---------|------|------|-----|---------|
| **Claude** | **盲测第一（62%胜率）** | 优秀 | 免费/Pro $20/月 | 有 | 精细情感表达、风格模仿、隐喻使用 |
| **ChatGPT** | 高创造力（92.1%） | 良好 | 免费/Plus $20/月 | 有 | 头脑风暴、快速原型、结构化 JSON 输出 |
| **Gemini** | 中等 | 良好 | 免费/Advanced $20/月 | 有 | 研究型写作、Lyria 3 音乐联动 |

**说明**：Claude 在社区盲测中获 62% 胜率，被认为是"最自然、最有细微差别"的歌词生成模型。ChatGPT 在创造力评分中获 92.1%，擅长头脑风暴但倾向陈词滥调。Gemini 在创意写作方面评分较低。

### 1.4 中文押韵专项工具

| 工具 | 功能 | 网址 |
|------|------|------|
| **押韵啦**（原押韵助手） | 单押/多押查询，海量词库，Rap/文案/诗词创作神器 | yayunla.com |
| **押韵大师** | 数十万韵脚在线查询，说唱 Freestyle 神器 | rap.zlxiang.com |
| **完美韵脚** | 数十万中文歌词+古诗词库，精准押韵匹配算法 | wanmeiyunjiao.com |
| **押韵助手 App** | 27万关键词库，支持双押/三押/四押 | 应用宝下载 |
| **RhymeZone** | 英文押韵字典 120,000+ 词，近韵/同义词/音节排序 | rhymezone.com |

### 1.5 开源歌词/音乐生成

| 项目 | 说明 | 中文支持 | 网址 |
|------|------|---------|------|
| **YuE** | 歌词转完整歌曲的开源基座模型，最长5分钟连续音乐 | 支持 | github.com/multimodal-art-projection/YuE |
| **SongGen** | 单阶段自回归 Transformer，歌词控制 | 支持 | github.com/LiuZH-19/SongGen |
| **Tencent SongGeneration** | 腾讯 AI Lab 开源音乐大模型 | 支持 | github.com/tencent-ailab/songgeneration |
| **DiffRhythm** | 8GB 显存，10秒生成完整歌曲 | 支持 | HuggingFace |
| **中文歌词生成器** | 开源中文 AI 歌词生成 | 中文专用 | github.com/twjefchiu/lyric_genator |
| **Deezer Synthetic Lyrics Detection** | AI 生成歌词检测工具（评估用） | 多语言 | github.com/deezer/synthetic_lyrics_detection |

---

## 二、中文歌词深度分析

### 2.1 中文歌词质量排名

基于知乎、CSDN、新浪等多平台交叉评测：

| 排名 | 工具 | 评价 | 关键优势 |
|------|------|------|---------|
| 1 | **海绵音乐** | "中文歌词质量最好" | 输入"江南烟雨"能生成意境贴合的歌词，自动匹配古筝、琵琶等民族乐器 |
| 2 | **蘑兔AI** | "中文创作党首选" | 深度适配中文创作习惯，日常口语描述即可创作 |
| 3 | **网易天音** | "中文支持比 Suno/Udio 强" | 词格智能匹配，韵脚自定义，划词辅助编辑 |
| 4 | **天工SkyMusic** | "中文演唱超越海外" | V8 模型 + CoT 推理 |
| 5 | **Suno** | "中文可用但有问题" | 旋律/编曲质量最佳，但歌词有翻译腔 |

### 2.2 Suno 中文歌词已知问题与解决方案

| 问题 | 具体表现 | 解决方案 |
|------|---------|---------|
| **多音字读错** | "行" xíng/háng 混淆 | 用常见同音字替换冷僻字 |
| **繁体触发粤语** | 繁体中文输入 → 粤语发音 | 始终使用简体中文 |
| **"翻译腔"** | 歌词不像自然中文表达 | 先用 LLM 润色，再输入 Suno |
| **声调错乱** | 气口生硬、倒字 | 副歌尽量押韵，4-8字/行最优 |
| **加拼音反而失败** | 用拼音修正发音 → 更差 | 避免拼音输入，直接用汉字 |
| **中文可用率偏低** | 满意作品比例不高 | 迭代7-12轮（参考研究 Insight 8） |

### 2.3 中文押韵技术要点

**中文韵律体系**：

| 体系 | 韵部数 | 说明 |
|------|--------|------|
| 平水韵 | 106韵 | 古典诗词标准 |
| 中华新韵 | 14韵部 | 现代汉语标准 |
| 十三辙 | 13韵类 | 戏曲/曲艺标准 |

**押韵匹配类型**：
- **精确押韵**：韵母完全相同（如 "花 huā" / "家 jiā"）
- **近似押韵**：韵母相近（如 "天 tiān" / "烟 yān"）
- **双押/多押**：连续多个韵母匹配（Rap 常用）

**平仄判断**：一声/二声为平，三声/四声为仄

**开源库**：`pypinyin`（拼音转换）、`jieba`（中文分词）

---

## 三、歌词结构控制（行业标准）

### 3.1 Meta Tags 体系

所有主流平台（Suno / Udio / ACE-Step）通用的结构标签：

```
[Intro]          → 开场氛围/器乐铺垫
[Verse 1]        → 主歌1（叙事铺垫）
[Pre-Chorus]     → 预副歌（情绪攀升）
[Chorus]         → 副歌（核心 Hook）
[Verse 2]        → 主歌2（故事展开）
[Pre-Chorus]     → 预副歌（再次攀升）
[Chorus]         → 副歌（强化 Hook）
[Bridge]         → 桥段（情绪转折/对比）
[Chorus]         → 终极副歌（高潮）
[Outro]          → 尾奏（收束）
```

**扩展标签**：

| 标签 | 用途 | 适用风格 |
|------|------|---------|
| `[Drop]` | 电子/重拍段落 | EDM、House |
| `[Build]` | 紧张感铺垫 | 电子、Rock |
| `[Hook]` | 抓耳重复段 | Pop、Hip-Hop |
| `[Break]` | 短暂停顿 | Jazz、R&B |
| `[Guitar Solo]` | 吉他独奏 | Rock、Blues |
| `[Instrumental]` | 纯器乐段 | 所有风格 |
| `[Post-Chorus]` | 副歌后过渡 | Pop |

### 3.2 标准结构模板

**流行歌（3-4分钟）**：
```
[Intro] → [Verse 1] → [Pre-Chorus] → [Chorus] →
[Verse 2] → [Pre-Chorus] → [Chorus] → [Bridge] →
[Chorus] → [Outro]
```

**电子舞曲（3-5分钟）**：
```
[Intro] → [Build] → [Drop] → [Break] →
[Build] → [Drop] → [Outro]
```

**说唱（2-3分钟）**：
```
[Intro] → [Verse 1] → [Hook] → [Verse 2] →
[Hook] → [Verse 3] → [Hook] → [Outro]
```

### 3.3 歌词行数与时长参考

| 段落 | 英文行数 | 中文字数/行 | 时长 |
|------|---------|-----------|------|
| Verse | 4-8 行 | 4-8 字 | ~30s |
| Pre-Chorus | 2-4 行 | 4-6 字 | ~10s |
| Chorus | 2-4 行 | 4-8 字 | ~15-20s |
| Bridge | 2-4 行 | 4-6 字 | ~15s |
| Hook | 1-2 行 | 4-8 字 | ~8-10s |

---

## 四、LLM 歌词 Prompt 最佳实践

### 4.1 核心 Prompt 框架

```prompt
你是一位格莱美获奖词作者，擅长 [流派] 风格。
请按以下要求创作歌词：

- 主题：[具体主题，如"城市夜晚的孤独感"]
- 情绪走向：[如"从忧郁到释然"]
- 结构：[Verse]-[Pre-Chorus]-[Chorus]-[Verse]-[Chorus]-[Bridge]-[Chorus]-[Outro]
- 押韵方案：[AABB / ABAB / ABCB]
- 每行音节/字数：[中文4-8字 / 英文8-12音节]
- 视角：[第一人称 / 第二人称 / 第三人称]
- 语言风格：[口语化 / 诗意 / 叙事 / 意识流]

请在歌词中使用 [Meta Tags] 标注段落结构。
```

### 4.2 高级技巧

| 技巧 | 说明 | 示例 |
|------|------|------|
| **角色扮演** | 让 LLM 模仿特定创作者风格 | "你是方文山风格的词作者" |
| **Few-shot 示例** | 提供参考歌词引导风格 | "参考以下歌词的韵律和意象..." |
| **迭代修改** | 先生成初稿，再逐步精修 | "保留第一段，让副歌更有力" |
| **情绪指令** | 用具体情绪词控制氛围 | "让 Bridge 部分从忧伤转为坚定" |
| **约束控制** | 限定押韵和字数 | "每句结尾押 'an' 韵，每行6字" |
| **负面指令** | 排除不想要的元素 | "避免使用'爱'、'心'等陈词滥调" |

### 4.3 中文歌词特殊注意事项

| 要点 | 说明 |
|------|------|
| 使用汉字不用拼音 | Suno/ACE-Step 直接读汉字发音更准 |
| 4-8字/行最优 | 太短节奏感不足，太长气口不自然 |
| 副歌必须押韵 | 押韵的歌词唱出来更自然流畅 |
| 避免"倒字" | 歌曲旋律走向与字声调冲突 |
| 多音字标注 | 冷僻多音字用常见同音字替换 |
| 简体中文输入 | 繁体容易触发粤语模式 |

---

## 五、专业词作者 AI 使用趋势（2025-2026）

1. **AI 作为头脑风暴伙伴**：专业词作者使用 AI（主要是 Claude 和 ChatGPT）突破创作瓶颈，而非直接生成终稿
2. **混合工作流主导**："AI 生成初稿 → 人工精修"是主流模式
3. **结构优先 Prompt**：先定义歌曲结构，再逐段生成内容
4. **Suno/Udio 作为 Demo 工具**：用于快速原型验证歌曲创意
5. **伦理讨论升温**：Deezer 等已开发 AI 歌词检测工具
6. **Text-to-Song 趋势**：将短文本/对话直接转为完整歌曲持续走热

---

## 六、市场数据

| 指标 | 数据 |
|------|------|
| 2025年中国AI音乐创作市场规模 | 预计突破 **100亿元人民币** |
| 2026年全球AI音乐生成器市场 | 约 **19.8亿美元** |
| 2035年全球AI音乐生成器市场预测 | **180.4亿美元**（CAGR 28.5%） |
| 2024年中国数字音乐市场总规模 | **2113.5亿元**（同比+10.8%） |
| Suno 日均生成歌曲量 | 超过 **700万首/天** |
| AI 生成单曲版权售价 | 已有 **5万元** 案例 |

---

## 七、Auto Music Studio 歌词能力差距分析

### 7.1 已有能力

| 能力 | 实现方式 |
|------|---------|
| 歌词输入 | `--lyrics`（内联文本）、`--lyrics-file`（文件路径） |
| 结构标签支持 | `[Verse]`、`[Chorus]`、`[Bridge]` 等 Meta Tags |
| 语言选择 | `--vocal-language` 参数 |
| 纯音乐模式 | `--instrumental` 开关 |
| 歌词存储 | Clip 元数据中保存歌词（SQLite） |
| 双后端支持 | ACE-Step（主）+ ElevenLabs（备） |

### 7.2 缺失能力

| 缺失功能 | 优先级 | 说明 |
|---------|--------|------|
| **AI 歌词生成** | P0 | 无内置歌词生成，完全依赖手动输入 |
| 歌词自动/手动模式切换 | P0 | Spec 中定义但未实现 |
| 歌词增强指令 | P1 | "让副歌更有力"等指令式修改 |
| 押韵方案验证 | P1 | 中文押韵检查（十三辙/中华新韵） |
| 中文字数/音节统计 | P1 | 实时检查每行字数 |
| 歌词预设保存/加载 | P2 | 保存常用歌词模板 |
| 歌词续写 | P2 | AI 延续未完成的歌词 |
| 多音字检测 | P2 | 标注可能有发音问题的字 |
| "倒字"检测 | P3 | 声调-旋律匹配建议 |
| 歌词内容审核 | P3 | 版权/政策合规检查 |

---

## 八、集成方案推荐

### 方案 A：轻量集成（1-3 天实现）

利用 LLM API（Claude/ChatGPT）作为歌词生成后端，不新增模型部署：

```
用户输入：主题 + 情绪 + 风格 + 结构偏好
    ↓
调用 LLM API 生成歌词（带 Meta Tags + 押韵）
    ↓
本地验证：押韵检查 + 字数统计 + 结构完整性
    ↓
输出 → acemusic generate --lyrics-file generated.txt
```

**优点**：零额外部署成本，API 调用即可
**缺点**：依赖外部 API，有网络和费用
**适用**：快速验证、MVP 阶段

### 方案 B：深度集成（1-2 周实现）

构建完整的歌词创作模块 `acemusic lyrics`：

```bash
# 歌词生成
acemusic lyrics generate --theme "城市夜晚" --mood "忧郁" --structure "pop"

# 歌词增强
acemusic lyrics enhance --input lyrics.txt --instruction "让副歌更有力"

# 押韵检查
acemusic lyrics check-rhyme --input lyrics.txt --scheme "AABB"

# 歌词续写
acemusic lyrics continue --input partial.txt --lines 8
```

**模块组成**：
1. **歌词生成引擎** — LLM API + 歌词模板库 + 押韵算法
2. **歌词编辑器** — 实时押韵提示、字数统计、结构可视化
3. **歌词增强** — 支持指令式修改
4. **中文优化** — 拼音标注、多音字检测、声调建议

### 方案 C：对接国产平台 API

如果海绵音乐/天工SkyMusic开放 API，直接调用其最佳中文歌词能力：

```
acemusic lyrics generate --backend haimian --theme "江南"
```

**现状**：这些平台目前大多未开放公开 API，需关注后续进展。

---

## 九、立即可用的实操路径（不写代码）

**今天就能用的最佳组合**：

1. **写歌词** → 用 Claude（质量最高，免费额度够用）
2. **查押韵** → 用押韵啦 (yayunla.com)
3. **生成歌曲** → 海绵音乐（中文最好）或 Suno（旋律最好）
4. **后处理** → `acemusic remaster` 提升音质

**示例 Claude Prompt**：

```
请为我创作一首关于"深夜城市的孤独感"的中文歌词。

要求：
- 风格：都市抒情流行
- 情绪：从孤独到释然
- 结构：[Verse 1]-[Pre-Chorus]-[Chorus]-[Verse 2]-[Chorus]-[Bridge]-[Chorus]-[Outro]
- 押韵：ABAB 方案
- 每行4-8字
- 使用意象化表达，避免直白叙述
- 副歌要有记忆点（Hook）
```

---

## 十、信息来源

### 工具官网
- [Suno](https://suno.com/) / [Suno 中文站](https://www.suno.cn/)
- [海绵音乐](https://www.haimian.com/)
- [网易天音](https://tianyin.music.163.com/)
- [天工SkyMusic](https://music.tiangong.cn/)
- [Mureka](https://www.mureka.cn/)
- [Udio](https://www.udio.com/)
- [LyricStudio](https://lyricstudio.co/)
- [LyricLab](https://www.lyriclab.net/)
- [DeepBeat](https://deepbeat.org/)
- [These Lyrics Do Not Exist](https://theselyricsdonotexist.com/)
- [押韵啦](https://www.yayunla.com/)
- [RhymeZone](https://www.rhymezone.com/)

### 评测与分析
- [知乎：AI创作歌曲效果测评（Suno/海绵/天工）](https://zhuanlan.zhihu.com/p/1971212325336908977)
- [知乎：Suno中文使用手册（含多音字问题）](https://zhuanlan.zhihu.com/p/1990938898797441842)
- [知乎：网易天音深度评测](https://zhuanlan.zhihu.com/p/1978020094648010276)
- [知乎：2025最好用的AI音乐生成工具](https://zhuanlan.zhihu.com/p/1987926326691251570)
- [oct.cool：AI创作测评](https://oct.cool/blog/%E6%88%91%E7%94%A8ai%E5%88%9B%E4%BD%9C%E4%BA%86%E4%B8%80%E9%A6%96%E6%AD%8Csuno%E6%B5%B7%E7%BB%B5%E9%9F%B3%E4%B9%90%E5%A4%A9%E5%B7%A5ai%E9%9F%B3%E4%B9%90%E7%94%9F%E6%88%90%E6%95%88%E6%9E%9C%E6%B5%8B%E8%AF%84/)
- [Tactiq：Claude vs ChatGPT vs Gemini 写作盲测](https://tactiq.io/learn/claude-vs-gemini-vs-chatgpt-for-writing)
- [RankmyAI：Top 25 AI Lyrics Generator Tools](https://www.rankmyai.com/rankings/top-ai-lyrics-generator-tools)
- [Freepik：Best 8 AI Lyrics Generators 2026](https://www.freepik.com/blog/ai-lyrics-generator/)
- [Feedough：Best AI Lyrics Generators](https://www.feedough.com/startup-resources/best-ai-lyrics-generators/)
- [David Lapadat：AI Brainstorming for Songwriting 2026](https://www.davidlapadat.com/post/ai-brainstorming-for-songwriting-2026-unlock-endless-ideas-and-themes-with-ethical-ai-tools-for)

### 市场数据
- [未来智库：中国AI音乐市场](https://www.vzkoo.com/read/202505205eb7c489569f4382f292f070.html)
- [Business Research Insights：全球AI音乐生成器市场](https://www.businessresearchinsights.com/zh/market-reports/ai-music-generator-market-116986)

### 开源项目
- [YuE](https://github.com/multimodal-art-projection/YuE) — 歌词转歌曲开源基座
- [SongGen](https://github.com/LiuZH-19/SongGen) — 单阶段文本转歌曲
- [Tencent SongGeneration](https://github.com/tencent-ailab/songgeneration) — 腾讯开源音乐模型
- [中文歌词生成器](https://github.com/twjefchiu/lyric_genator) — 开源中文歌词生成
- [Deezer Synthetic Lyrics Detection](https://github.com/deezer/synthetic_lyrics_detection) — AI 歌词检测

---

*End of report.*
