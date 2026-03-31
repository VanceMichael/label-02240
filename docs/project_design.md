# 游戏账号交易平台 - 项目设计文档

## 1. 系统架构

```mermaid
flowchart TD
    A[用户浏览器] --> B[Vue 3 SPA]
    B --> C[Vue Router]
    C --> D[首页 - 商品展示]
    C --> E[商品详情页]
    C --> F[发布账号页]
    C --> G[个人中心]
    C --> H[搜索结果页]
    B --> I[Pinia Store]
    I --> J[商品数据 Store]
    I --> K[用户 Store]
    I --> L[购物车/订单 Store]
    B --> M[LocalStorage 持久化]
```

## 2. 页面结构

| 页面 | 路由 | 说明 |
|------|------|------|
| 首页 | `/` | Banner轮播 + 游戏分类 + 热门商品 |
| 商品列表 | `/list/:game` | 按游戏筛选账号列表 |
| 商品详情 | `/detail/:id` | 账号详细信息 + 截图 + 下单 |
| 发布账号 | `/publish` | 卖家发布账号表单 |
| 个人中心 | `/profile` | 我的发布/我的订单/收藏 |
| 搜索结果 | `/search` | 关键词搜索结果 |
| 登录/注册 | `/login` | 用户认证 |

## 3. 数据模型

```mermaid
erDiagram
    USER {
        string id PK
        string username
        string avatar
        string phone
        string password
        datetime createdAt
    }
    ACCOUNT_ITEM {
        string id PK
        string title
        string gameType
        string server
        number level
        number price
        string description
        string[] screenshots
        string sellerId FK
        string status
        datetime createdAt
    }
    ORDER {
        string id PK
        string itemId FK
        string buyerId FK
        string sellerId FK
        number amount
        string status
        datetime createdAt
    }
    FAVORITE {
        string userId FK
        string itemId FK
    }
    USER ||--o{ ACCOUNT_ITEM : "发布"
    USER ||--o{ ORDER : "购买"
    ACCOUNT_ITEM ||--o| ORDER : "交易"
    USER ||--o{ FAVORITE : "收藏"
```

## 4. UI/UX 规范

- 主色调: `#6C5CE7` (紫色系，游戏风格)
- 辅助色: `#00D2D3` (青色高亮)
- 警告色: `#FF6B6B`
- 成功色: `#51CF66`
- 背景色: `#F8F9FE` (浅灰紫)
- 卡片背景: `#FFFFFF`
- 文字主色: `#2D3436`
- 文字次色: `#636E72`
- 字体: `'PingFang SC', 'Microsoft YaHei', sans-serif`
- 卡片圆角: `12px`
- 按钮圆角: `8px`
- 间距基准: `8px` (8/16/24/32)
- 卡片阴影: `0 2px 12px rgba(108, 92, 231, 0.08)`
