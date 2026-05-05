# 零网线AI音乐创作完全方案：纯本地部署指南

> 目标：不连网、不翻墙、不付费订阅，用本地电脑生成AI音乐

---

## 一、你需要什么硬件

| 配置级别 | 显卡 | 显存 | 内存 | 硬盘 | 可运行工具 |
|---------|------|------|------|------|-----------|
| 入门级 | GTX 1060 / RX 580 | 4GB | 8GB | 20GB | ACE-Step 1.5 (慢速)、Audacity+Riffusion |
| 推荐级 | RTX 3060 / RX 6600 | 8GB | 16GB | 30GB | DiffRhythm、ACE-Step 1.5 (全速)、MusicGen |
| 舒适级 | RTX 4060 / RX 7700 | 12GB | 32GB | 50GB | 全部工具+批量生成 |
| 核显/无显卡 | Intel i5-12代+/AMD 7000+ | 共享内存 | 16GB | 20GB | ACE-Step 1.5 (CPU模式，慢但可用) |

**判断方法**：右键"此电脑"→属性，看处理器和内存；任务管理器→性能→GPU，看显存。

---

## 二、推荐方案（按显存分级）

### 方案A：4GB显存方案 — ACE-Step 1.5（最佳性价比）

ACE-Step 1.5 是当前**唯一能在4GB显存下运行**的商用级AI音乐生成工具。

**特点**：
- MIT协议，**完全免费商用**
- 支持50+语言（含中文）
- 4-8步快速生成（约30秒-2分钟一首）
- 文本描述生成音乐，**不需要写复杂Prompt**

**安装步骤**：

```bash
# Step 1: 安装Python 3.10（从python.org下载离线安装包）
# Step 2: 下载ACE-Step便携包（从HuggingFace或GitHub Release下载）
# Step 3: 解压到任意文件夹
# Step 4: 双击 run.bat (Windows) 或 run.sh (Mac/Linux)
```

**实际体验**：
- 4GB显卡：生成30秒片段约40秒
- 8GB显卡：生成2分钟完整段落约20秒
- CPU模式：生成30秒片段约3-5分钟（但可以边做别的边等）

**中文支持**：直接输入中文描述，如"一首忧伤的钢琴曲，雨夜氛围，慢节奏"，ACE-Step能正确生成。

---

### 方案B：8GB显存方案 — DiffRhythm（最强开源）

DiffRhythm由西北工业大学和香港中文大学联合开发，是开源社区公认的**最强全歌曲生成模型**。

**特点**：
- 10秒生成4分45秒完整歌曲
- 人声+伴奏同时生成
- 支持歌词输入（会唱出你写的歌词）
- 44.1kHz CD音质

**安装步骤**：

```bash
# 方式1: 便携包（最简单）
# 从 GitHub Release 下载 DiffRhythm-Portable-Windows.zip
# 解压后双击 run_diffrytm.bat

# 方式2: Python安装（需要联网一次性下载模型）
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install diffusers transformers accelerate
# 下载模型权重（约5GB）到本地文件夹
# 之后断网也能用
```

**使用方法**：
```bash
# 命令行方式
python inference.py \
  --lyrics "你的歌词文件.txt" \
  --style "pop rock, energetic, guitar driven" \
  --output "my_song.wav"

# 或使用Gradio网页界面（本地打开浏览器）
python app.py
# 然后打开 http://localhost:7860
```

**中文歌词注意**：
- 直接输入中文歌词，但部分多音字可能发音不准
- 技巧：对不确定的字标注拼音，如"行(xing)走"

---

### 方案C：零显存方案 — Audacity + OpenVINO（完全免费）

如果你只有核显或老电脑，这个方案**100%零成本、零显存要求**。

**组件**：
- **Audacity**：免费开源音频编辑器（几十年经典）
- **OpenVINO AI插件**：Intel开源AI插件，含Riffusion音乐生成

**安装步骤**：

```
Step 1: 官网下载 Audacity 3.4+（免费，约15MB）
Step 2: 下载 OpenVINO AI Plugins for Audacity（免费，约500MB）
Step 3: 安装Audacity → 安装OpenVINO插件 → 重启Audacity
Step 4: 菜单栏→生成→Riffusion→输入描述→生成
```

**生成能力**：
- Riffusion模型：生成5-10秒音乐片段，可循环拼接
- 音乐分离：把一首歌拆成人声/鼓/贝斯/其他
- 音频转录：自动识别音频中的音符

**适合用途**：
- 生成短片段Loop（背景音乐、短视频配乐）
- 分离现有歌曲的伴奏来翻唱
- 基础音频编辑（剪辑、拼接、加效果）

---

### 方案D：云端替代（手机/网吧可用）

如果你完全没电脑，但有手机能上网吧/借用网络：

| 平台 | 免费额度 | 特点 |
|------|---------|------|
| HuggingFace Spaces (DiffRhythm) | 免费GPU时间 | 网页直接用，不用安装 |
| Google Colab | 免费T4 GPU每天12小时 | 运行笔记本代码生成 |
| 网易天音小程序 | 免费 | 微信小程序，手机就能用 |

**关键**：去网吧/咖啡馆一次性下载好模型文件，带回家断网用。

---

## 三、完整离线工作流

```
【纯本地AI音乐创作流程】

Step 1: 确定风格（脑中想/听本地MP3参考曲）
    ↓
Step 2: 用本地播放器分析（MusicBee/Foobar2000 看BPM）
    ↓
Step 3: 打开 DiffRhythm/ACE-Step（本地运行）
    ↓
Step 4: 输入风格描述 + 歌词（中文直接输）
    ↓
Step 5: 生成3个版本（改一个参数再生成）
    ↓
Step 6: 用 Audacity 剪辑/拼接最佳部分
    ↓
Step 7: Audacity 内置效果：Amplify + Reverb + Normalize
    ↓
Step 8: 导出为 MP3/WAV → 完成！
```

**所需时间**：
- 第一次安装：1-2小时（下载模型）
- 之后每首歌：5-15分钟（生成+剪辑）

---

## 四、不联网怎么学？

| 资源 | 获取方式 | 内容 |
|------|---------|------|
| 本报告 | 保存到本地 | 完整术语+Prompt+流程 |
| DiffRhythm README | GitHub下载后离线看 | 安装+使用说明 |
| ACE-Step文档 | HuggingFace缓存后看 | 参数说明+示例 |
| YouTube教程 | 网吧一次性下载 | 搜索"DiffRhythm tutorial"用yt-dlp下载 |
| 音乐理论 | 本地PDF书 | 《音乐理论基础》百度网盘找PDF |

---

## 五、零网络Prompt模板（直接复制到ACE-Step/DiffRhythm）

### 模板1：中文抒情慢歌
```
风格：Mandopop ballad, piano-led, emotional
歌词：
夜已深了 灯还亮着
想着你的笑容 温暖我心窝
不管多远 不管多难
我愿意等待 直到重逢那一刻
```

### 模板2：电子纯音乐（无歌词）
```
风格：Ambient electronic, dreamy synth pads, slow build-up, 
no drums, ethereal atmosphere, 80 BPM
歌词：（留空或写 [instrumental]）
```

### 模板3：摇滚节奏
```
风格：Indie rock, driving guitar riff, energetic drums, 
bass-heavy, anthemic chorus, 140 BPM
歌词：
站起来 不要停下
追光的人 终会到达
燃烧吧 这青春年华
```

### 模板4：中国风
```
风格：Chinese traditional fusion, guzheng melody, 
modern beat, pentatonic scale, cinematic
歌词：
山水之间 云雾缭绕
一曲古筝 心随音飘
千年风华 今朝依旧
```

### 模板5：Lo-Fi放松
```
风格：Lo-fi hip hop, chill beats, vinyl crackle, 
piano sample, rain sounds, 75 BPM, study music
歌词：（留空）
```

---

## 六、常见问题

**Q: 我没有显卡，只有笔记本核显，能玩吗？**
A: 能！ACE-Step有CPU模式，虽然慢但能用。或者直接用Audacity+Riffusion（对显卡无要求）。

**Q: 模型文件很大，没有网怎么下载？**
A: 去网吧/朋友家/手机热点，用迅雷/IDM一次性下载。DiffRhythm模型约5GB，ACE-Step约3GB。

**Q: 生成的中文歌发音不准怎么办？**
A: 三个技巧：(1) 用简单字词，避免生僻字 (2) 对多音字标注拼音 (3) 在ACE-Step中反复生成同一歌词，选发音最准的版本。

**Q: 断网后这些工具会过期吗？**
A: 不会。开源模型一旦下载到本地，永久可用，没有订阅费，没有过期时间。

**Q: 我能把生成的歌发到抖音/网易云吗？**
A: 可以。ACE-Step（MIT协议）和DiffRhythm（Stability AI Community License）都允许商用。但建议标明"AI辅助创作"。

---

## 七、资源下载清单（一次性下载，永久离线使用）

| 资源 | 大小 | 下载地址 |
|------|------|---------|
| ACE-Step 1.5 便携包 | ~3GB | HuggingFace: ACE-Studio/ACE-Step-1.5-pt |
| DiffRhythm 模型 | ~5GB | GitHub: ASLP-lab/DiffRhythm |
| Audacity 3.4+ | ~15MB | audacityteam.org |
| OpenVINO AI Plugin | ~500MB | GitHub: intel/openvino-plugins-ai-audacity |
| 本报告PDF版 | ~2MB | （用Word自带导出PDF功能） |

---

## 八、最低成本配置推荐

**预算0元（利用现有设备）**：
- 电脑：你现有的任何电脑
- 软件：全部免费开源
- 网费：0（一次性下载后断网）
- 产出：完整AI生成歌曲

**如果电脑太老（5年以上）**：
- 去网吧一次性下载模型 + 安装
- 回家用自己的老电脑慢慢生成
- 或者用网吧电脑直接生成（带U盘拷贝回家）

---

> **核心信念**：AI音乐创作不需要昂贵设备，不需要持续付费，不需要稳定网络。一个4GB显存的老显卡 + 开源工具 + 本指南 = 你就可以开始创作。
