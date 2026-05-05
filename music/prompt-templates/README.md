# AI Music Prompt 模板库

> 可直接复制到 Suno / Udio 使用的 Prompt 模板。每个模板已标注最佳用途和预期效果。

## Suno Prompt 模板

### 模板1：Indie Pop 抒情

```
Indie Pop, dreamy, warm synth pads, gentle acoustic guitar, 110 BPM, in C major,
breathy female vocals, intimate delivery, reverb-drenched, melancholic yet hopeful
```

**适合**：抒情慢歌、校园民谣、深夜听感
**结构**：Verse-Chorus-Verse-Chorus-Bridge-Chorus

---

### 模板2：Trap 说唱

```
Dark Trap, 140 BPM, aggressive 808 bass, rapid hi-hats, atmospheric synth pads,
gritty male vocals, auto-tuned delivery, minor key, heavy sub-bass, London drill influence
```

**适合**：说唱、暗黑风格、街头氛围
**注意**：140 BPM Trap 是 Half-Time，实际律动感在 70 BPM

---

### 模板3：中国风电子

```
Mandopop meets synthwave, guzheng and erhu elements, modern electronic production,
120 BPM, in D minor, ethereal female vocals, cinematic atmosphere, pentatonic melodies
```

**适合**：中国风流行、影视配乐、文化混搭
**技巧**：用 `Mandopop` 替代 `Chinese music`，指定具体中国乐器

---

### 模板4：Lo-Fi Chill

```
Lo-fi hip hop, 75 BPM, vinyl crackle, mellow jazz piano, soft brushed drums,
warm bass, no vocals, cozy late night vibes, nostalgic, slightly off-beat swing
```

**适合**：学习背景音乐、助眠、放松
**注意**：纯音乐模板，显式声明 `no vocals`

---

### 模板5：Big-Room EDM

```
Progressive House, 128 BPM, supersaw lead, four-on-the-floor kick, build-up synth riser,
energetic drop, festival anthem, bright synth arpeggios, wide stereo image, clean digital production
```

**适合**：运动、派对、高能量场景
**结构**：Intro-Build-Drop-Breakdown-Build-Drop-Outro

---

### 模板6：Britpop / Glam Rock

```
1993 Britpop with glam rock influence, treble-heavy overdriven electric guitar,
layered acoustic guitar, theatrical male baritone vocal with falsetto leaps,
minor-key verses exploding into major-key choruses, polished but raw production, 120 BPM
```

**适合**：英伦摇滚风格、戏剧性情绪
**参考**：Suede / The Cure 风格

---

### 模板7：民谣摇滚

```
Folk rock, acoustic guitar fingerpicking, harmonica, warm upright bass, gentle drums,
weathered male vocals, storytelling delivery, raw recording, 95 BPM, in G major,
Neil Young meets Bob Dylan
```

**适合**：叙事歌曲、公路旅行、怀旧
**注意**：民谣速度 85-100 BPM，G大调对吉他最友好

---

## 歌曲结构模板（直接粘贴到 Lyrics Box）

### 标准流行结构

```
[Intro]
(4-bar instrumental)

[Verse 1]
（第一段歌词，4-8行）

[Pre-Chorus]
（蓄势段，2行，张力渐增）

[Chorus]
（Hook！简洁有力，2-4行）

[Verse 2]
（第二段歌词，4-8行）

[Pre-Chorus]
（同上或微调）

[Chorus]
（Hook重复）

[Bridge]
（对比段，不同视角，4行）

[Chorus]
（最终Hook，最大能量）

[Outro]
（淡出或器乐解决）
```

### EDM 结构

```
[Intro]
(Atmospheric pad, 8 bars)

[Build]
(Energy rising, synth riser)

[Drop]
(Main hook, full energy)

[Breakdown]
(Stripped back, vocal focus)

[Build]
(Second energy rise)

[Drop]
(Final hook, maximum energy)

[Outro]
(Fade out with pad)
```

---

## Prompt 写法速查

### 标点控制法

| 标点 | 用法 | 示例 |
|------|------|------|
| 逗号 | 并列元素 | `guitar, piano, drums` |
| 分号 | 分隔结构块 | `verse: gentle; chorus: explosive` |
| 冒号 | 赋值描述 | `tempo: 120 BPM` |
| 括号 | 补充说明 | `(with reverb)` |
| 斜杠 | 多选一 | `acoustic/electric guitar` |

### 负面 Prompt

| 写法 | 效果 |
|------|------|
| `no vocals` | 排除人声 |
| `no synth` | 排除合成器 |
| `not pop, not EDM` | 排除风格 |
| `avoid heavy reverb` | 避免效果 |

### 人声三层描述法

```
[Character] + [Delivery] + [Effects]
 例：breathy female vocals, intimate delivery, close-mic recording
```

**Character 选项**：raspy / breathy / airy / gritty / silky / warm
**Delivery 选项**：belted / whispered / intimate / powerful / gentle
**Effects 选项**：dry / reverb-drenched / auto-tuned / raw / close-mic

---

## 中文歌曲特殊技巧

1. 用汉字而非拼音输入歌词
2. 多音字加括号标注：`朝(zhāo)露`
3. 用 `Mandopop` / `C-Pop` 替代 `Chinese music`
4. 指定中国乐器：`guzheng`（古筝）、`erhu`（二胡）、`dizi`（笛子）
5. 避免倒字：声调与旋律走向匹配
