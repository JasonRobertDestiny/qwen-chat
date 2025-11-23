# 🤖 智能聊天助手

基于通义千问 Qwen3-Omni-Flash 的多模态智能聊天助手，支持语音、文字、图片三种输入方式。

## ✨ 功能特性

- 🎤 **语音输入**: 直接录制音频发送给AI，支持语音对话（无需浏览器语音识别）
- 💬 **文字聊天**: 支持文字输入和AI对话
- 📷 **图片识别**:
  - 📸 拍照上传：直接使用摄像头拍照
  - 🖼️ 相册选择：从设备相册选择图片
  - AI可以分析图片内容并回答相关问题
- 📱 **移动端适配**: 响应式设计，支持手机和平板访问
- 🎨 **现代UI**: 美观的聊天界面，打字机效果，动态Loading提示
- ⚡ **性能优化**: 30秒超时检测，智能后端地址检测

## 🚀 快速部署（推荐）

### 一键部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JasonRobertDestiny/qwen-chat-assistant)

部署步骤：

1. **点击上方按钮** 一键部署到 Vercel
2. **登录 Vercel** (可使用 GitHub 账号)
3. **Fork 仓库** 到你的 GitHub 账号
4. **配置环境变量**:
   - 变量名：`QWEN_API_KEY`
   - 变量值：你的通义千问 API 密钥 ([获取地址](https://dashscope.console.aliyun.com/apiKey))
5. **点击 Deploy** 等待部署完成
6. **访问你的应用** Vercel 会提供一个 `.vercel.app` 域名

### 手动部署到 Vercel

1. Fork 本仓库到你的 GitHub
2. 登录 [Vercel](https://vercel.com)
3. 点击 "Import Project"
4. 选择你 Fork 的仓库
5. 在 "Environment Variables" 中添加:
   - Name: `QWEN_API_KEY`
   - Value: `sk-your-api-key-here`
6. 点击 Deploy

## 💻 本地运行

### 方式1: 纯静态（前端开发）

```bash
# Python
python3 -m http.server 8888

# Node.js
npx http-server -p 8888
```

访问: `http://localhost:8888`

注意：此模式API调用会自动转发到 `localhost:3000`，需要同时运行后端代理。

### 方式2: 带后端代理（完整功能）

#### Node.js 版本（推荐）
```bash
npm install
npm start
```

#### Python 版本
```bash
python3 proxy.py
```

访问: `http://localhost:3000`

## 📋 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **AI模型**: 通义千问 Qwen3-Omni-Flash (文本+图片+音频)
- **后端**: Vercel Serverless Functions / Node.js / Python
- **部署**: Vercel
- **PWA**: Service Worker 离线支持

## 🔧 配置说明

### API密钥获取

1. 访问 [阿里云DashScope控制台](https://dashscope.console.aliyun.com/apiKey)
2. 登录/注册阿里云账号
3. 创建 API Key
4. 复制 `sk-` 开头的密钥

### 环境变量配置

**Vercel部署（推荐）**:
1. 在 Vercel 项目设置中选择 "Environment Variables"
2. 添加变量：
   - Name: `QWEN_API_KEY`
   - Value: `sk-your-api-key-here`
3. 选择环境：Production, Preview, Development (全选)
4. 点击 Save

**本地开发**:
- 方式1: 直接修改 `server.js` 或 `api/chat.js` 中的 `apiKey`
- 方式2: 创建 `.env` 文件（参考 `.env.example`）

### 模型配置

当前使用 `qwen3-omni-flash` 模型，支持：
- 文本理解和生成
- 图片识别和分析
- 音频输入识别
- 多模态对话

可选模型（需修改 `api/chat.js` 和 `server.js` 中的 `MODEL` 常量）：
- `qwen-plus`: 纯文本模型（更快，更便宜）
- `qwen-vl-plus`: 文本+图片模型
- `qwen-vl-max`: 更强的视觉理解能力
- `qwen3-omni-flash`: 文本+图片+音频（当前使用）

## 🎯 使用说明

### 文字聊天
1. 在底部输入框中输入文字
2. 点击发送按钮或按 Enter 键

### 语音输入
1. 点击红色麦克风按钮开始录音
2. 对着设备说话（录音中麦克风图标会变化）
3. 再次点击停止录音
4. 音频自动发送给AI分析

**优势**: 直接传输音频数据，支持所有浏览器，无需语音识别API

### 图片识别

#### 方式1: 拍照上传
1. 点击蓝色相机按钮
2. 允许浏览器访问摄像头
3. 拍摄照片
4. 可选：添加描述文字
5. 点击发送，AI会分析图片

#### 方式2: 从相册选择
1. 点击图片上传按钮
2. 从设备选择图片文件
3. 预览图片
4. 可选：添加描述文字
5. 点击发送，AI会分析图片

## 📱 浏览器兼容性

| 功能 | Chrome | Safari | Firefox | Edge |
|------|--------|--------|---------|------|
| 基础聊天 | ✅ | ✅ | ✅ | ✅ |
| 语音录制 | ✅ | ✅ | ✅ | ✅ |
| 摄像头 | ✅ | ✅ | ✅ | ✅ |
| 图片上传 | ✅ | ✅ | ✅ | ✅ |
| PWA | ✅ | ✅ | ✅ | ✅ |

## 🔒 安全说明

- ✅ API密钥存储在后端环境变量中（Vercel部署）
- ✅ 后端代理保护API密钥不被暴露
- ✅ HTTPS加密传输（Vercel自动提供）
- ✅ 支持20MB音频数据传输
- ⚠️ 本地开发时API密钥在代码中，仅限测试使用

## 📂 项目结构

```
qwen-chat-assistant/
├── api/
│   └── chat.js          # Vercel Serverless Function
├── index.html           # 主页面
├── style.css            # 样式文件
├── script.js            # 前端逻辑（含语音录制、图片上传）
├── manifest.json        # PWA配置
├── sw.js               # Service Worker
├── icon-192.svg        # PWA图标
├── icon-512.svg        # PWA图标
├── vercel.json         # Vercel配置
├── .env.example        # 环境变量示例
├── server.js           # Node.js本地服务器（可选）
├── proxy.py            # Python本地服务器（可选）
├── CLAUDE.md           # Claude Code工作指南
└── README.md           # 说明文档
```

## 🐛 常见问题

### 语音录制失败
- 确认浏览器允许麦克风权限
- HTTPS环境或localhost才能使用麦克风
- 检查设备麦克风是否正常工作

### 图片上传失败
- 检查图片大小（建议<10MB）
- 确认图片格式（支持 jpg, png, gif, webp）
- HTTPS环境下才能使用摄像头
- 检查浏览器控制台错误信息

### API调用失败
- **本地开发**: 确认运行了 `npm start` 或 `python3 proxy.py`
- **Vercel部署**: 检查环境变量 `QWEN_API_KEY` 配置是否正确
- 确认API密钥有效且有额度
- 查看浏览器控制台 Network 面板的 `/api/chat` 请求详情

### Service Worker缓存问题
- 强制刷新：`Ctrl+Shift+R` (Windows) 或 `Cmd+Shift+R` (Mac)
- 清除缓存：浏览器开发者工具 → Application → Service Workers → Unregister
- 无痕模式测试

## 📊 性能优化

- ⚡ 打字机效果提升用户体验
- 🔄 动态Loading消息避免长时间等待焦虑
- ⏱️ 30秒超时检测，及时反馈错误
- 🌐 智能后端地址检测（自动识别8888/3000端口）
- 📦 Service Worker缓存静态资源
- 🎨 网络优先策略确保API请求实时性

## 📄 许可证

MIT License

## 👨‍💻 开发

本项目使用 Claude Code 辅助开发。详见 `CLAUDE.md` 了解开发指南。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📮 联系方式

- GitHub: [@JasonRobertDestiny](https://github.com/JasonRobertDestiny)
- 仓库: [qwen-chat-assistant](https://github.com/JasonRobertDestiny/qwen-chat-assistant)
