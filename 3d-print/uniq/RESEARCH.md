# OKLCH 哈希映射 → 3D 打印 深度调研报告

## 一、OKLCH 色彩空间

### 什么是 OKLCH？
OKLCH 是一种**感知均匀**的色彩空间，由三个参数组成：
- **L (Lightness)**: 亮度，0-1，对应人眼感知的明暗
- **C (Chroma)**: 饱和度/色彩浓度
- **H (Hue)**: 色相，0-360 度

### 为什么选 OKLCH 而不是 RGB/HSL？
| 特性 | OKLCH | RGB/HSL |
|------|-------|---------|
| 感知均匀性 | 数值等距 = 视觉等距 | 不均匀，绿色区域过大 |
| 渐变质量 | 无"泥灰色"中间值 | 常出现脏色过渡 |
| 亮度控制 | L 通道精确可控 | HSL 的 L 实际不均匀 |
| 适合算法生成 | 参数直觉对应人眼感知 | 需要大量修正 |

### 关键库
| 库 | 语言 | 安装 | 说明 |
|----|------|------|------|
| [culori](https://culorijs.org/) | JS/TS | `npm install culori` | 最成熟的 OKLCH 库，支持所有色彩空间转换 |
| CSS 原生支持 | CSS | `oklch(0.7 0.15 150)` | 现代 CSS 原生支持 OKLCH |
| [color-hash](https://github.com/zenozeng/color-hash) | JS | `npm install color-hash` | 字符串 → 确定性颜色（BKDRHash → HSL） |
| [color-hash-python](https://github.com/dimostenis/color-hash-python) | Python | `pip install color-hash` | Python 版本 |

---

## 二、哈希 → OKLCH 颜色映射方案

### 核心算法

```javascript
import { oklch, formatCss } from 'culori';
import crypto from 'crypto';

function hashToOKLCH(input) {
  const hash = crypto.createHash('sha256').update(input).digest('hex');

  // 将 256 位哈希拆分为 3 段
  const lRaw = parseInt(hash.slice(0, 8), 16);  // 0 - 4294967295
  const cRaw = parseInt(hash.slice(8, 16), 16);
  const hRaw = parseInt(hash.slice(16, 24), 16);

  const L = 0.3 + (lRaw % 401) / 1000;  // 0.3 - 0.7（适合打印的范围）
  const C = 0.05 + (cRaw % 151) / 1000;  // 0.05 - 0.20
  const H = hRaw % 360;                    // 0 - 360

  return { L, C, H, color: oklch({ l: L, c: C, h: H }) };
}
```

### 映射逻辑（对应 README 中的 4 种创意）

| 输入 | 哈希来源 | L 映射 | C 映射 | H 映射 |
|------|----------|--------|--------|--------|
| 声音/文字 | SHA-256(音频波形/文字) | 3D 浮雕高度 | 纹理密度 | 表面颜色 |
| 个人数据 | SHA-256(姓名+生日+坐标) | 花瓶渐变亮度 | 色彩饱和度 | 花瓶条纹色相 |
| 加密文字 | SHA-256(密文) | Lithophane 厚度 | - | 位图像素色调 |
| 区块链 Hash | 原始交易 Hash | 浮雕起伏 | 线条密度 | 材质色相 |

---

## 三、三种核心 3D 打印方案及工具链

### 方案 A：声音/文字 → 3D 浮雕（数字指纹吊坠）

#### 技术路线
```
文字/语音 → SHA-256 哈希 → OKLCH 参数
                              ↓ L → 高度图
                              ↓ H → 纹理密度
                              ↓ C → 线条粗细
                        → numpy-stl / Three.js 生成网格
                              ↓
                        → STL 文件 → Bambu Studio 切片打印
```

#### 所需工具

| 工具 | 用途 | 安装/获取 |
|------|------|-----------|
| [waveform3d](https://github.com/d-t/waveform3d) | 音频 → 3D STL | `git clone` + Python |
| [numpy-stl](https://github.com/wolph/numpy-stl) | Python STL 生成 | `pip install numpy-stl` |
| OpenSCAD | 程序化 3D 建模 | `brew install openscad` |
| [JSCAD](https://openjscad.xyz/) | JS 程序化建模 | `npm install @jscad/modeling` |
| Three.js STLExporter | 浏览器端 STL 导出 | `npm install three` |

#### 音频处理方案
1. **waveform3d** (Python): 直接将音频转为 STL 波形
2. **自研方案**: 使用 Web Audio API 提取波形数据 → 映射为 3D 螺旋路径 → 导出 STL
3. **Instructables 教程**: [3D Printed Sound Sculpture](https://www.instructables.com/3D-Printed-Sound-Sculpture/)

---

### 方案 B：个人数据 → 多色花瓶（生命色彩）

#### 技术路线
```
姓名+生日+坐标 → 多轮哈希 → 生成 OKLCH 调色板（5-8色）
                              ↓
                    OpenSCAD/JSCAD 生成花瓶几何体
                              ↓
                    每层高度映射一个 OKLCH 颜色
                              ↓
                    .3mf 文件（含多色信息）→ AMS 打印
```

#### 所需工具

| 工具 | 用途 | 说明 |
|------|------|------|
| Bambu Studio | 多色切片 | 支持 AMS 颜色映射 |
| [BOSL2](https://github.com/revarbat/BOSL2/wiki/shapes3d.scad) | OpenSCAD 高级建模库 | 生成花瓶、螺旋等复杂几何 |
| [Meshy AI](https://www.meshy.ai/) | AI 图片 → 3D 模型 | 文本/图片生成 STL |
| Blender | 模型清理 | 确保水密性 |

#### Bambu Lab AMS 多色打印
- **单 AMS**: 4 色
- **多 AMS**: 最多 4 个 AMS = 16 色
- **超越 4 色技巧**: 打印中暂停换丝、按对象打印模式
- **颜色映射**: Bambu Studio 自动匹配，支持手动调整
- 参考: [Bambu Lab Wiki - Multi-color Printing](https://wiki.bambulab.com/en/software/bambu-studio/multi-color-printing)

---

### 方案 C：加密文字 → 透光片（Lithophane）

#### 技术路线
```
加密文字 → 哈希 → OKLCH 位图（L 值映射像素亮度）
                         ↓
                 亮度 → 厚度映射（亮=薄，暗=厚）
                         ↓
                 numpy-stl / 专用工具生成 STL
                         ↓
                 白色 PLA 打印 → 背光显示
```

#### 所需工具

| 工具 | 用途 | 安装 |
|------|------|------|
| [lithophane](https://pypi.org/project/lithophane/) | Python 一键生成 Lithophane STL | `pip install lithophane` |
| [colbrydi/Lithophane](https://github.com/colbrydi/Lithophane) | Jupyter Notebook 版 | Google Colab 可用 |
| [mkatzef/lithophane-gen](https://github.com/mkatzef/lithophane-gen) | 支持平/圆两种形态 | `git clone` |
| [ItsLitho](https://itslitho.com/) | 在线生成器 | Web 端 |
| numpy-stl | 底层 STL 生成 | `pip install numpy-stl` |
| Pillow (PIL) | 图像处理 | `pip install pillow` |

#### Lithophane 打印最佳参数
| 参数 | 推荐值 | 说明 |
|------|--------|------|
| 层高 | 0.08-0.12mm | 越薄细节越好 |
| 填充 | 100% 实心 | 必须 |
| 打印方向 | 垂直竖立 | 最佳透光效果 |
| 耗材 | 白色 PLA | 光线扩散最佳 |
| 喷嘴 | 0.4mm 标准 | 够用 |
| 底裙 | 推荐 | 稳定高薄模型 |

参考: [ItsLitho Slicer Settings](https://itslitho.com/itslitho-blog/slicer-settings-for-lithophanes-tweaking-to-perfection/)

---

## 四、推荐的技术栈

### 最简可行路径（推荐先从这里开始）

**Node.js + Three.js 方案**（全 JS 技术栈）:
```
输入文字 → crypto SHA-256 → culori OKLCH 颜色
                              ↓
                    Three.js 生成 3D 几何体
                              ↓
                    STLExporter 导出 STL
                              ↓
                    Bambu Studio 切片打印
```

依赖:
```bash
npm install three culori
```

**Python 方案**（适合 Lithophane 和音频处理）:
```
输入数据 → hashlib SHA-256 → OKLCH 参数
                              ↓
                    numpy + numpy-stl 生成网格
                              ↓
                    导出 STL → 切片打印
```

依赖:
```bash
pip install numpy numpy-stl pillow
```

### 完整技术栈矩阵

| 功能模块 | JS/TS 方案 | Python 方案 |
|----------|-----------|-------------|
| 哈希生成 | `crypto` (内置) | `hashlib` (内置) |
| OKLCH 颜色 | `culori` | 手动实现 |
| 3D 几何体 | `three.js` | `numpy-stl` |
| STL 导出 | `STLExporter` | `numpy-stl` |
| 图像处理 | `sharp` | `Pillow` |
| 音频处理 | Web Audio API | `librosa` / `scipy` |
| 程序化建模 | `@jscad/modeling` | OpenSCAD CLI |
| 浏览器预览 | Three.js renderer | - |

---

## 五、AI 生成 3D 模型工具

| 工具 | 类型 | 说明 | 链接 |
|------|------|------|------|
| [Meshy AI](https://www.meshy.ai/) | 图片/文字 → 3D | CEO 为 MIT 博士，业界领先 | meshy.ai |
| [Hitem3D](https://www.hitem3d.ai/) | 图片 → 3D + 纹理 | V2.0 支持风格迁移和 PBR 纹理 | hitem3d.ai |
| [MechStyle](https://hcie.csail.mit.edu/research/mechstyle/mechstyle.html) | AI + 物理模拟 | MIT CSAIL 项目，确保物理可行性 | MIT |
| Blender | 模型清理 | 确保水密性，修复网格 | blender.org |
| Meshmixer | 模型清理 | 简单的网格修复工具 | Autodesk |

---

## 六、切片软件自动化

| 工具 | CLI 支持 | 说明 |
|------|---------|------|
| OrcaSlicer | 部分 CLI | 基于社区讨论，语法有限 |
| Bambu Studio | 后处理脚本 | 支持外部脚本调用 |
| [Printago](https://printago.io/) | 云端 API | 批量自动化切片 |
| [SimplyPrint](https://simplyprint.io/) | 云端 | 浏览器端远程切片 |
| Go Bambu SDK | SDK | 社区开发的 Go 语言 SDK |

---

## 七、实施路线图

### Phase 1：核心算法（1-2 天）
- [ ] 实现 SHA-256 → OKLCH 映射函数
- [ ] 实现多色调色板生成
- [ ] 编写测试用例验证确定性

### Phase 2：Lithophane 原型（1-2 天）— 最简单、效果最直观
- [ ] 加密文字 → OKLCH 位图
- [ ] 位图 → STL（使用 lithophane 或 numpy-stl）
- [ ] 打印测试

### Phase 3：3D 浮雕原型（2-3 天）
- [ ] 文字/音频 → 高度图
- [ ] 高度图 → 3D 网格
- [ ] 导出 STL 并打印

### Phase 4：多色花瓶（3-5 天）— 需要 AMS
- [ ] 个人数据 → OKLCH 调色板
- [ ] 程序化花瓶几何生成
- [ ] 多色 STL/3MF 导出
- [ ] AMS 打印

---

## 参考资源

- [OKLCH Color Space 介绍](https://oklch.com/)
- [culori 文档](https://culorijs.org/)
- [numpy-stl GitHub](https://github.com/wolph/numpy-stl)
- [Three.js STLExporter](https://threejs.org/docs/examples/en/exporters/STLExporter.html)
- [JSCAD](https://openjscad.xyz/)
- [BOSL2 OpenSCAD 库](https://github.com/revarbat/BOSL2)
- [Bambu Lab 多色打印 Wiki](https://wiki.bambulab.com/en/software/bambu-studio/multi-color-printing)
- [ItsLitho Lithophane 生成器](https://itslitho.com/)
- [waveform3d](https://github.com/d-t/waveform3d)
- [Meshy AI](https://www.meshy.ai/)
- [MechStyle MIT](https://hcie.csail.mit.edu/research/mechstyle/mechstyle.html)
- [fxhash 生成艺术平台](https://www.fxhash.xyz/)

---

## 八、NFC 标签嵌入 3D 打印 -- 完整技术指南

NFC（近场通信）标签与 3D 打印结合，可以将物理对象变成"智能实体"，实现"物理-数字"双向连接。以下是完整的技术方案。

---

### 8.1 NFC 标签类型与选型

#### 推荐芯片型号对比

| 芯片型号 | 用户可用存储 | 最大 URL 长度 | 价格(单颗) | 最佳用途 |
|----------|-------------|--------------|-----------|----------|
| **NTAG213** | 144 字节 | 132 字符 | ~$0.10-0.30 | 简单 URL 跳转、NFC 触发器 |
| **NTAG215** | 504 字节 | 492 字符 | ~$0.15-0.40 | Amiibo 标签、中等数据、性价比最佳 |
| **NTAG216** | 888 字节 | 876 字符 | ~$0.25-0.60 | vCard 名片、大容量数据 |

所有芯片均为 NXP 半导体生产，NFC Forum Type 2 标签，兼容 Android 和 iOS。

#### NFC 标签物理形态（按厚度排序）

| 形态 | 典型厚度 | 适用场景 | 价格参考 |
|------|---------|---------|---------|
| **Wet Inlay（湿式贴片）** | 0.07-0.15mm | 最薄嵌入方案，适合名片/卡片 | ~$0.05-0.15 |
| **Standard Sticker（标准贴纸）** | 0.13-0.20mm | 一般嵌入，带背胶 | ~$0.10-0.25 |
| **PVC Coin Tag（硬币标签）** | 1.0-1.5mm | 较大物件（杯垫、钥匙扣） | ~$0.20-0.50 |
| **Anti-Metal Tag（抗金属标签）** | 1.0-2.0mm | 含金属填料耗材或金属表面 | ~$0.30-0.80 |

**关键规格（NTAG213 Wet Inlay）**:
- 操作温度: -25degC 到 70degC
- 数据保存期: 10 年（NDEF 格式）
- 读写次数: 100,000 次
- 工作频率: 13.56 MHz
- 读取距离: 通常 2-5cm（手机），嵌在塑料中略降

---

### 8.2 NFC 标签耐温性与嵌入策略

#### 温度安全性分析

**结论：NFC 标签不能直接承受喷嘴温度，但通过暂停-嵌入法完全安全。**

| 环节 | 温度 | NFC 标签是否安全 |
|------|------|-----------------|
| 热床（PLA） | 55-60degC | 安全（标签耐 70degC） |
| 热床（PETG） | 80-90degC | 接近上限，需测试 |
| 喷嘴（PLA） | 200-220degC | 危险，直接接触会损坏 |
| 喷嘴（PETG） | 230-250degC | 危险 |
| 已沉积层表面 | 40-80degC | 安全（暂停后等待降温） |

#### 两种嵌入策略

**策略 A：暂停-嵌入法（推荐，成功率最高）**

```
1. 在 3D 模型中设计凹槽（比标签尺寸大 0.2mm，深度比标签厚度多 0.2mm）
2. 切片时在凹槽完成的层设置 G-code 暂停指令
3. 打印到暂停层 → 等待 30-60 秒降温 → 放入 NFC 标签 → 恢复打印
4. 后续层将标签完全封存在塑料内部
```

关键尺寸参考：
- 25mm 圆形标签: 设计 26mm x 1mm 凹槽
- 21x10mm 矩形标签: 设计 22x11mm 凹槽
- 贴纸型（0.15mm）: 设计至少 0.4mm 凹槽（含 2-3 层封顶层）

**策略 B：打印后嵌入（适合较厚物件）**

```
1. 设计预留插槽/空腔（不完全封口）
2. 打印完成后从开口处插入标签
3. 用少量胶水/焊接封闭开口
```

**最佳实践**：
- PLA 比 PETG 更适合新手（热床温度低，标签更安全）
- 放入标签前务必等待已打印层降温
- 标签天线面朝上（远离金属热床方向）
- 至少 2-3 层封顶（0.4-0.6mm）确保 NFC 信号可穿透
- PLA/PETG 对 13.56MHz NFC 信号基本透明，不影响读写

---

### 8.3 NFC 标签编程/写入方案

#### 硬件方案

| 硬件 | 类型 | 价格 | 适用场景 |
|------|------|------|---------|
| **Android 手机** | NFC 读写器 | 已有 | 最简单的方案，直接用 APP 写入 |
| **iPhone (XR/11+)** | NFC 读写器 | 已有 | iOS 13+ 支持读写 NTAG 系列 |
| **ACR122U** | USB 桌面读写器 | $30-50 | 开发/批量写入，SDK 完善 |
| **PM3 (Proxmark3)** | 高级 RFID 工具 | $50-150 | 安全研究，深度分析 |

#### 手机写入 APP

**Android（推荐）**：
- **NFC Tools**（免费）: 读写 NDEF、格式化、锁定标签
- **TagWriter（NXP 官方）**: 专业写入工具
- **NFC TagWriter by Identiv**: 批量写入

**iOS**：
- **NFC Tools**（免费）: 读写 NDEF 记录
- **GoToTags**: 专业 NFC 编码 APP
- **NFC21 Tools**: URL、电话、文本写入

#### NDEF 数据格式

NDEF（NFC Data Exchange Format）是 NFC 标签的标准数据格式，支持以下记录类型：

| NDEF 记录类型 | 说明 | 存储开销 |
|--------------|------|---------|
| **URI/URL** | 打开网页链接 | ~5 字节头 + URL |
| **Text** | 纯文本信息 | ~5 字节头 + 文本 |
| **vCard** | 联系人名片 | ~200-800 字节 |
| **Smart Poster** | URL + 标题 + 类型 | ~10+ 字节头 |
| **MIME** | 自定义二进制数据 | 视 MIME 类型 |
| **AAR**（Android Application Record）| 自动打开指定 APP | ~30 字节 |

**实际应用示例**：

```
NTAG213（144 字节）可存储：
- 1 个 URL（最长 132 字符）
- 或 1 条文本（约 130 字符）
- 或 1 个短 vCard（仅姓名+电话）

NTAG215（504 字节）可存储：
- 1 个长 URL（最长 492 字符）
- 或完整 vCard（姓名+电话+邮箱+公司）
- 或自定义 JSON 数据

NTAG216（888 字节）可存储：
- 超长 URL / 多个 NDEF 记录
- 或完整 vCard（含地址、网站、头像链接）
- 或 Base64 编码的小图片/加密数据
```

---

### 8.4 NFC + 3D 打印创意应用

#### 已验证的项目案例

| 项目类型 | 描述 | NFC 数据内容 | 参考来源 |
|---------|------|-------------|---------|
| **NFC 名片** | 3D 打印名片嵌入 NTAG215 | vCard / 个人网站 URL | [AG3D Printing 案例](https://ag3d-printing.com/part-detective-case-files/2025/12/2/3d-printed-business-card-embedded-nfc-tag) |
| **智能杯垫** | 触碰杯垫打开音乐/网站 | Spotify 链接 / 网站 URL | [YouTube 教程](https://www.youtube.com/watch?v=_JGyLyFSQXA) |
| **冰箱贴** | 磁吸+嵌 NFC，触碰打开 WiFi 密码 | WiFi 配置 / URL | [Reddit 讨论](https://www.reddit.com/r/3Dprinting/comments/1kauhf7/printing_with_nfc_tags/) |
| **钥匙扣** | 个人标识钥匙扣 | 紧急联系信息 / 个人主页 | [Printables 模型库](https://www.printables.com/tag/nfc) |
| **艺术品底座** | 雕塑底部嵌入 NFC，触碰查看创作者信息 | 作品详情页 / AR 体验 | [Instagram 案例](https://www.instagram.com/reel/DKMgvijNWEe/) |
| **宠物牌** | 3D 打印宠物身份牌 | 主人联系信息 / 宠物病历 | [postcraft.blog](https://postcraft.shop/blog/nfc-tags-inside-3d-prints-keychains-pet-tags-poker-chips) |

#### NFC + 生成艺术融合方案（结合本项目）

结合 OKLCH 哈希映射和 NFC，可以实现"物理-数字"双向绑定的独特艺术作品：

**方案 1：NFC 增强型数字指纹吊坠**
```
输入文字 → SHA-256 → OKLCH 颜色 → 3D 浮雕吊坠
                                   ↓
                            嵌入 NTAG213 标签
                                   ↓
                       NFC 内容 = 加密哈希 + 在线验证页面 URL
                                   ↓
                    触碰吊坠 → 打开浏览器 → 显示对应生成艺术动画
```

**方案 2：NFC 花瓶 -- "生命容器"**
```
个人数据 → OKLCH 调色板 → 多色花瓶（AMS 打印）
                          ↓
                   花瓶底部嵌入 NTAG216
                          ↓
          NFC 内容 = vCard + 个人数据 JSON + 生成艺术 API 端点
                          ↓
          触碰花瓶 → 加载该人专属的生成艺术网页
```

**方案 3：Phygital（物理-数字）艺术品**
```
AI 生成艺术 → 3D 打印雕塑 → 底座嵌入 NFC
                              ↓
         NFC 内容 = NFT 链上元数据 URL + 验证哈希
                              ↓
    触碰雕塑 → 验证物理实体与数字 NFT 的绑定关系
```

---

### 8.5 NFC 名片 3D 打印详细方案

#### 设计规格

| 参数 | 推荐值 | 说明 |
|------|--------|------|
| 名片尺寸 | 85.6 x 54 mm（标准信用卡尺寸） | 或自定义 |
| 总厚度 | 1.5-2.0 mm | 太厚不像名片，太薄 NFC 难嵌入 |
| NFC 凹槽位置 | 正面中央偏上 | 远离手指自然握持区域 |
| 凹槽尺寸 | 标签尺寸 + 0.2mm 余量 | 确保 NFC 标签贴合 |
| 封顶层数 | 至少 3 层（0.3-0.45mm） | 保证信号穿透 |
| 最薄可读厚度 | ~0.3-0.5mm 封顶 | 实测 NFC 仍可稳定读取 |

#### 推荐耗材

| 耗材 | 适用性 | 说明 |
|------|--------|------|
| **PLA** | 推荐 | 低热床温度（55-60degC），对 NFC 标签友好 |
| **PETG** | 可用 | 更耐用，但热床温度接近 NFC 上限 |
| **PLA-CF/PETG-CF** | 不推荐 | 碳纤维可能干扰 NFC 信号 |
| **金属填料 PLA** | 避免 | 金属颗粒严重干扰 NFC |

#### 开源模型资源

| 平台 | 模型 | 说明 |
|------|------|------|
| [MakerWorld - Custom Business Card with NFC](https://makerworld.com/en/models/209800-custom-business-card-with-nfc) | 可自定义 LOGO 的 NFC 名片模板 | Bambu Studio 原生支持 |
| [Printables - Customizable NFC Business Card](https://www.printables.com/model/777205-custamizable-nfc-business-card) | 可定制 NFC 名片 | 详细打印说明 |
| [Yeggi - NFC Business Card](https://www.yeggi.com/q/nfc+business+card/) | 5000+ 相关模型聚合 | 搜索引擎 |

---

### 8.6 Web NFC API 浏览器支持与开发

#### 浏览器兼容性（2025-2026 现状）

| 浏览器 | 读取 NFC | 写入 NFC | 备注 |
|--------|---------|---------|------|
| Chrome Android (89+) | 支持 | 支持 | 主要支持平台 |
| Edge Android | 支持 | 支持 | 基于 Chromium |
| Opera Android | 支持 | 支持 | 基于 Chromium |
| Samsung Internet | 支持 | 支持 | 基于 Chromium |
| Chrome 桌面版 | 不支持 | 不支持 | 无 NFC 硬件接口 |
| Firefox | 不支持 | 不支持 | 无计划 |
| Safari / iOS | 不支持 | 不支持 | Apple 限制 |
| Android WebView | 不支持 | 不支持 | 无法显示权限提示 |

**状态总结**：Web NFC 仍然是 Android Chrome 系的专属功能，无跨浏览器扩展迹象。需要 HTTPS 环境。

#### JavaScript 代码示例

**写入 NFC 标签**：
```javascript
async function writeNFC(url) {
  if (!('NDEFReader' in window)) {
    console.log('Web NFC 不受此浏览器支持');
    return;
  }

  try {
    const ndef = new NDEFReader();
    await ndef.write(url);  // 写入 URL
    console.log('NFC 标签写入成功');
  } catch (error) {
    console.log(`写入失败: ${error}`);
  }
}
```

**读取 NFC 标签**：
```javascript
async function readNFC() {
  if (!('NDEFReader' in window)) {
    console.log('Web NFC 不受此浏览器支持');
    return;
  }

  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    ndef.onreading = (event) => {
      const decoder = new TextDecoder();
      for (const record of event.message.records) {
        console.log('记录类型:', record.recordType);
        console.log('数据:', decoder.decode(record.data));
      }
    };
  } catch (error) {
    console.log(`读取失败: ${error}`);
  }
}
```

#### JavaScript NFC 相关库

| 库 | 用途 | 链接 |
|----|------|------|
| **Web NFC API**（原生） | 浏览器端 NFC 读写 | [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API) |
| **react-native-nfc-manager** | React Native NFC | [GitHub](https://github.com/revtel/react-native-nfc-manager) |
| **phonegap-nfc** | Cordova/Ionic NFC 插件 | [GitHub](https://github.com/chariotsolutions/phonegap-nfc) |
| **NFC Smart Poster** | Chrome 官方示例 | [Google Chrome Samples](https://googlechrome.github.io/samples/web-nfc/) |

---

### 8.7 NFC 专用产品与购买建议

#### 专为 3D 打印设计的 NFC 标签

| 产品 | 规格 | 价格 | 链接 |
|------|------|------|------|
| **Lost Boys Lab 25mm 圆形标签** | NTAG213, 26x1mm 槽位 | $0.80/个（100个装） | [lostboyslab.shop](https://www.lostboyslab.shop/products/nfc-tag-25-mm-for-integration-during-3d-printing-100) |
| **Lost Boys Lab 21x10mm 矩形标签** | NTAG213, 耐温 90degC | 批量价格 | [lostboyslab.shop](https://www.lostboyslab.shop/products/nfc-tag-rectangular-21x10-mm-for-integration-during-fdm-fff-3d-printing-100) |
| **AliExpress NFC 贴纸（Bambu Lab 专用）** | 多种规格可选 | 批量极低价 | [AliExpress](https://www.aliexpress.com/i/1005008347116787.html) |
| **GoToTags Wet Inlay NTAG213** | 21x13.5mm, 0.2mm 厚 | $0.40/个 | [GoToTags Store](https://store.gototags.com/nfc-tags/nfc-stickers/nfc-inlays/) |
| **Seritag 29mm Wet Inlay** | NTAG213, 0.07mm 超薄 | 批量定价 | [Seritag](https://seritag.com/nfc-tags/29mm-clear-inlay-ntag213) |

#### 抗金属 NFC 标签（特殊场景）

如果使用含金属填料的耗材，或成品可能放置在金属表面，推荐使用带铁氧体层的抗金属标签：
- [AliExpress 抗金属 NFC 标签](https://www.aliexpress.com/w/wholesale-anti-metal-nfc-tag.html)
- [GoToTags 抗金属标签](https://store.gototags.com/thin-on-metal-nfc-sticker-ntag213-38-mm-circle-15-mm-hole-white/)
- 厚度通常 1-2mm（含铁氧体隔离层）

#### ACR122U 读写器（批量开发推荐）

| 参数 | 规格 |
|------|------|
| 接口 | USB 2.0 |
| 频率 | 13.56 MHz |
| 支持标准 | ISO 14443 A/B, ISO 18092, MIFARE, FeliCa |
| NFC 标签类型 | Type 1-4, MIFARE Classic |
| 价格 | $30-50 |
| 购买 | [Amazon](https://www.amazon.com/ACR122U-Reader-Writer-Ntag213-Software/dp/B07KRKPWYC) |
| 官方驱动/API | [ACS 官网](http://www.acs.com.hk/en/driver/3/acr122u-usb-nfc-reader/) |

---

### 8.8 GitHub 开源项目与工具

#### NFC + 3D 打印核心仓库

| 仓库 | 功能 | 语言 |
|------|------|------|
| [queengooborg/OpenTag3D](https://github.com/queengooborg/OpenTag3D) | 3D 打印耗材 NFC/RIFD 开放标准 | 多语言 |
| [paxx12/PrintTag-Web](https://github.com/paxx12/PrintTag-Web) | Web 端 NFC 耗材标签管理 | Web |
| [Houzvicka/FlipperPrintTag](https://github.com/Houzvicka/FlipperPrintTag) | Flipper Zero 读写 OpenPrintTag | C |
| [DBNinja/VCOPT](https://github.com/DBNinja/VCOPT) | Android APP 读写 OpenPrintTag | Kotlin |
| [spuder/OpenSpool](https://github.com/spuder/OpenSpool) | 最简 NFC 耗材协议（NTAG215/216） | 多语言 |
| [Bambu-Research-Group/RFID-Tag-Guide](https://github.com/Bambu-Research-Group/RFID-Tag-Guide) | Bambu Lab RFID 逆向工程 | Docs |
| [mrRobot62/AnycubicNFCTaggerQT5](https://github.com/mrRobot62/AnycubicNFCTaggerQT5) | Anycubic 耗材 NFC 写入工具 | C++/Qt |

#### 相关标准

- [OpenPrintTag.org](https://openprinttag.org/) -- Prusa Research 主导的耗材 NFC 开放标准
- [OpenTag3D](https://github.com/queengooborg/OpenTag3D) -- 社区驱动的跨品牌 3D 打印 NFC 标准
- [SimplyPrint OpenTag NFC](https://help.simplyprint.io/en/article/opentag-nfc-standard-in-simplyprint-1nzw42o/) -- 云端切片平台的 NFC 支持

---

### 8.9 实施路线图（NFC 融合扩展）

#### Phase NFC-1：基础 NFC 嵌入验证（1 天）

- [ ] 购买 NTAG213 Wet Inlay / 标签贴纸（AliExpress 批量，~$0.05-0.10/个）
- [ ] 设计简单测试件（立方体/圆柱体，带 26x1mm 凹槽）
- [ ] 切片并设置 G-code 暂停
- [ ] 测试嵌入效果和手机读取
- [ ] 测试不同封顶厚度（0.2/0.3/0.5/0.8mm）对读取距离的影响

#### Phase NFC-2：NFC 名片制作（1-2 天）

- [ ] 设计名片 3D 模型（85.6x54x1.5mm，NFC 凹槽）
- [ ] 使用 NFC Tools APP 写入 vCard + 个人网站 URL
- [ ] 打印名片（PLA，暂停嵌入）
- [ ] 测试 Android/iPhone 读取

#### Phase NFC-3：NFC + 生成艺术融合（2-3 天）

- [ ] 设计"数字指纹"吊坠（结合 OKLCH 哈希映射）
- [ ] 创建 NFC 内容：加密哈希 + 在线生成艺术页面 URL
- [ ] 开发 Web 端生成艺术展示页（手机触碰后打开）
- [ ] 可选：Web NFC API 实现浏览器端直接写入标签

#### Phase NFC-4：Web NFC 编码工具（可选，2-3 天）

- [ ] 基于 Web NFC API 的在线 NFC 写入页面
- [ ] 预设模板：URL / vCard / 生成艺术链接
- [ ] 仅限 Chrome Android 使用

---

### 8.10 推荐采购清单

| 物品 | 数量 | 单价 | 总价 | 来源 |
|------|------|------|------|------|
| NTAG213 Wet Inlay (0.15mm) | 100 片 | $0.05 | $5 | AliExpress |
| NTAG215 贴纸 (25mm 圆形) | 50 片 | $0.15 | $7.50 | AliExpress |
| NTAG216 贴纸 (名片尺寸) | 20 片 | $0.25 | $5 | AliExpress |
| ACR122U USB 读写器（可选） | 1 个 | $35 | $35 | Amazon |
| **合计（不含读写器）** | | | **$17.50** | |
| **合计（含读写器）** | | | **$52.50** | |

手机即可完成大部分 NFC 写入操作，ACR122U 仅在批量生产或深度开发时需要。
