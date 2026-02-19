# 🧊 Cube Master — 魔方大全

一站式魔方学习与练习工具，集公式查阅、教程、填色还原、计时器和 3D 互动魔方于一体。

> 纯前端实现，无需后端，打开 `index.html` 即可使用。

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?logo=threedotjs&logoColor=white)

---

## ✨ 功能特性

### 📖 CFOP 公式大全
- **7 大分类**：十字（Cross）、F2L、OLL（57 条）、PLL（21 条）、ZBLL、ZBLS、十字→F2L 过渡
- 全部公式采用**中文表示法**（上顺、右逆、前双……），降低记忆门槛
- 支持实时模糊搜索

### 🎓 还原教程
- 面向新手的分步教学
- 从底层十字到顶层还原的完整流程

### 🎨 填色还原
- 在 2D 展开图上自由填色
- 一键求解还原步骤

### ⏱️ 计时器
- 随机打乱公式生成
- 空格键 / 点击屏幕 开始/停止
- 自动记录历史成绩与统计（Ao5、Ao12 等）

### 🎮 3D 互动魔方
- 支持 **1~12 阶**魔方
- 拖拽旋转视角，滑动魔方面旋转层
- 一键打乱 / 复位
- 基于 Three.js 实现

---

## 🚀 快速开始

```bash
# 克隆仓库
git clone https://github.com/<your-username>/cube-master.git
cd cube-master

# 直接用浏览器打开
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

也可以使用任意静态服务器：

```bash
# 使用 Python
python -m http.server 8080

# 或使用 Node.js
npx serve .
```

---

## 📁 项目结构

```
cube-master/
├── index.html          # 主页面（单页应用）
├── css/
│   └── style.css       # 全局样式（深色玻璃拟态风格）
├── js/
│   ├── app.js          # 全局导航与初始化
│   ├── formulas.js     # CFOP 公式数据（中文表示）
│   ├── tutorial.js     # 还原教程模块
│   ├── solver.js       # 填色还原模块
│   ├── timer.js        # 计时器模块
│   └── cube3d.js       # 3D 魔方模块（Three.js）
└── README.md
```

---

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| **HTML5** | 页面结构 |
| **CSS3** | 深色玻璃拟态（Glassmorphism）UI |
| **Vanilla JS** | 业务逻辑，零框架依赖 |
| **Three.js** (r128) | 3D 魔方渲染与交互 |
| **Google Fonts** | Noto Sans SC + Orbitron 字体 |

---

## 🎨 设计风格

- **深色主题** — 以 `#0a0e1a` 为基底，减少视觉疲劳
- **玻璃拟态** — 半透明卡片 + 模糊边框
- **移动端优先** — 响应式布局，底部 Tab 导航
- **渐变色彩** — 紫色、青色、粉色渐变点缀

---

## 📋 公式表示法说明

本项目使用中文符号表示魔方操作，对照关系如下：

| 中文 | 国际符号 | 含义 |
|------|----------|------|
| 上顺 | U | U 面顺时针 90° |
| 上逆 | U' | U 面逆时针 90° |
| 上双 | U2 | U 面 180° |
| 下顺 / 下逆 / 下双 | D / D' / D2 | D 面 |
| 左顺 / 左逆 / 左双 | L / L' / L2 | L 面 |
| 右顺 / 右逆 / 右双 | R / R' / R2 | R 面 |
| 前顺 / 前逆 / 前双 | F / F' / F2 | F 面 |
| 后顺 / 后逆 / 后双 | B / B' / B2 | B 面 |
| 中 | M | 中间层（左右之间） |
| 赤 | E | 赤道层（上下之间） |

---

## 📄 许可证

MIT License

---

> 🧊 **Happy Cubing!** 愿每一次还原都比上一次更快。
