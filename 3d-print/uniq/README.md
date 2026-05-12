# Uniq — OKLCH 哈希映射 → 3D 打印 + NFC

将抽象信息（文字、声音、个人数据）通过 OKLCH 色彩算法和哈希映射，转化为独一无二的 3D 打印实体。每个作品可内嵌 NFC 芯片，手机触碰即可解锁隐藏信息。

## 快速开始

```bash
npm install
npm run build

# 查看颜色
npx uniq color "我爱你"

# 生成透光片
npx uniq lithophane "我们的纪念日" --output ./output/lithophane.stl

# 生成吊坠
npx uniq relief "I love you" --type pendant --output ./output/pendant.stl

# 生成花瓶
npx uniq vase "Patrick 1990-01-15" --output ./output/vase.stl

# 生成 NFC 卡片
npx uniq nfc-card "Patrick Wang" --url "https://example.com" --output ./output/card.stl
```

## 四种创意方案

### 方案 A: 加密光影透光片 (Lithophane)
将加密文字转换为 OKLCH 色谱位图，打印成透光片。背光照射时，厚度差异呈现出隐藏的图案。

```bash
npx uniq lithophane "20240520 我们的第一天" \
  --width 100 --height 80 --thickness 3 \
  --output ./output/lithophane.stl
```

打印建议: 层高 0.08-0.12mm, 100% 填充, 白色 PLA, 垂直打印

### 方案 B: 数字指纹 3D 浮雕/吊坠
将文字或声音转换为 3D 波形浮雕。每个吊坠底部预留 NFC 标签凹槽。

```bash
# 圆盘吊坠（可挂项链）
npx uniq relief "I love you" --type pendant --output ./output/pendant.stl

# 浮雕板（可挂墙）
npx uniq relief "I love you" --type relief --output ./output/relief.stl
```

### 方案 C: 生命色彩花瓶
输入个人数据（姓名、生日、坐标），生成带有独特轮廓和 OKLCH 调色板的花瓶。

```bash
npx uniq vase "Patrick 1990-01-15 31.23,121.47" \
  --shape bezier --height 100 --layers 200 \
  --output ./output/vase.stl
```

输出包含颜色切换 G-code（M600 指令），可在 Bambu Studio 中配合 AMS 多色打印。

### 方案 D: NFC 名片
生成带有 OKLCH 浮雕图案的 NFC 名片，内嵌 NFC 标签凹槽。

```bash
npx uniq nfc-card "Patrick Wang" \
  --url "https://uniq.art/patrick" \
  --style waves \
  --output ./output/card.stl
```

卡片样式: `waves` | `grid` | `fingerprint` | `minimal`

## NFC 集成

### 所需硬件
- NTAG213 薄贴片（圆形 25mm, ≤1.5mm 厚）— ¥0.3-0.5/片
- 手机 NFC Tools App（iOS/Android 免费）

### 嵌入流程
1. 切片软件中在 NFC 凹槽层添加暂停
2. 打印暂停后，将 NFC 标签放入凹槽
3. 恢复打印，将标签封在内部
4. 用 NFC Tools App 写入生成的 `.nfc.json` 数据
5. 手机触碰验证

### NFC 数据内容
- URL: 链接到个人信息/作品展示页面
- 文本: 唯一数字指纹 `uniq:xxxx`
- 同时输出写入步骤指南

## CLI 命令参考

```
uniq color <text>                          生成 OKLCH 颜色
uniq nfc <text> [-u url] [-o file]         生成 NFC 写入数据
uniq lithophane <text> [options]           生成透光片 STL
uniq relief <text> [--type pendant|relief] 生成浮雕/吊坠 STL
uniq vase <text> [--shape bezier|wave|cylinder] 生成花瓶 STL
uniq nfc-card <text> [--style waves|grid|fingerprint|minimal] 生成 NFC 卡片
```

## 技术架构

```
src/
├── core/        哈希、OKLCH、STL 生成、NFC 数据
├── lithophane/  透光片生成器
├── relief/      浮雕/吊坠生成器
├── vase/        花瓶生成器
├── nfc-card/    NFC 卡片生成器
└── cli/         CLI 入口
```

核心依赖: `culori` (OKLCH), `three` (3D), `commander` (CLI)

详见 [RESEARCH.md](./RESEARCH.md) 获取完整技术调研报告。

## 输入建议

为了让生成物更有意义，建议使用以下具有唯一性的内容作为输入：

- 地理坐标: 你们第一次见面地点的经纬度
- 特殊日期: 转化为 `20240520` 格式
- DNA/基因序列简码
- 区块链交易 Hash
- 语音录音的文字转录
