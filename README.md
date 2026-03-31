# GameVault - 游戏账号交易平台

## How to Run

### 方式一：Docker 部署（推荐）

```bash
docker-compose up --build -d
```

访问 http://localhost:8081

### 方式二：本地开发

```bash
cd frontend-user
npm install
npm run dev
```

访问 http://localhost:8081

## Services

| 服务 | 端口 | 说明 |
|------|------|------|
| frontend-user | 8081 | 游戏账号交易平台前端 |

## 测试账号

| 用户名 | 密码 |
|--------|------|
| demo | 123456 |

> 首次访问时系统会自动创建测试账号，也可以自行注册新账号。

## 题目内容

帮我生成一个游戏账号交易网页（纯前端），要求使用 Vue。

---

## 项目介绍

GameVault 是一个纯前端的游戏账号交易平台，基于 Vue 3 + Vite + Element Plus 构建。数据通过 LocalStorage 持久化存储，无需后端服务。

### 功能特性

- 首页：Banner + 游戏分类 + 热门推荐 + 最新上架
- 商品列表：按游戏筛选、价格排序、价格区间筛选、分页
- 商品详情：完整账号信息展示、收藏、下单购买
- 发布账号：表单验证、亮点标签
- 个人中心：我的订单（付款/取消/确认收货）、我的发布、我的收藏
- 搜索：关键词搜索
- 登录/注册：LocalStorage 用户系统、表单校验

### 技术栈

- Vue 3 + Composition API
- Vite 5
- Element Plus（自定义主题色）
- Pinia（状态管理 + 持久化）
- Vue Router 4
- SCSS
- Docker + Nginx
# label-02240
