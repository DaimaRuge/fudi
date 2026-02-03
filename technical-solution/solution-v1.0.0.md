# Fudi 软件工程方案 - v1.0.0

**文档版本 / Document Version:** v1.0.0
**创建日期 / Created:** 2026-02-04
**作者 / Author:** 逍遥游 (Xiāoyáo Yóu)
**状态 / Status:** 初始技术方案 / Initial Technical Solution

---

## 1. 方案概述 / Solution Overview

### 1.1 项目目标
构建Fudi AI平台，为用户提供统一的AI工具整合、智能工作流编排和个性化AI助手体验。

### 1.2 技术目标
- **快速迭代**: 支持每日更新部署
- **高性能**: API响应时间 < 500ms
- **高可用**: 系统可用性 > 99.5%
- **可扩展**: 支持1000+并发用户
- **安全**: 符合GDPR等安全规范

### 1.3 开发模式
采用 **Vibe Coding** 模式：
- 灵感驱动，快速迭代
- 用户中心，体验优先
- 每日交付，持续优化

---

## 2. 技术选型 / Technology Selection

### 2.1 前端技术选型

#### 选择1: Next.js 14 + shadcn/ui ⭐推荐

**理由：**
- ✅ **Server-Side Rendering**: 首屏加载快
- ✅ **文件系统路由**: 直观，易维护
- ✅ **App Router**: 支持流式渲染和并发
- ✅ **shadcn/ui**: 可定制化，基于Radix UI
- ✅ **Tailwind CSS**: 快速开发，统一设计

**技术栈：**
```
Next.js 14
├── React 18
├── TypeScript 5
├── Tailwind CSS 3
├── shadcn/ui
├── Zustand 4 (状态管理）
├── React Query 5 (数据获取）
└── Framer Motion 10 (动画）
```

#### 选择2: Nuxt 3 + Nuxt UI

**理由：**
- ✅ Vue生态，国内社区活跃
- ✅ 服务端渲染，性能优秀
- ✅ 自动化代码分割

**技术栈：**
```
Nuxt 3
├── Vue 3
├── TypeScript 5
├── Nuxt UI
└── Pinia (状态管理）
```

**最终选择**: Next.js 14 + shadcn/ui

### 2.2 后端技术选型

#### 选择1: Node.js + Express ⭐推荐

**理由：**
- ✅ **JavaScript全栈**: 前后端统一语言
- ✅ **生态丰富**: npm包数量庞大
- ✅ **异步非阻塞**: 高并发性能
- ✅ **团队熟悉**: 降低学习成本

**技术栈：**
```
Node.js 20
├── Express 4
├── TypeScript 5
├── Prisma 5 (ORM）
├── Redis 7 (缓存）
└── Bull 4 (任务队列）
```

#### 选择2: Python + FastAPI

**理由：**
- ✅ **AI生态**: 大量AI库支持
- ✅ **类型提示**: 自动生成API文档
- ✅ **异步支持**: Fast、高效

**技术栈：**
```
Python 3.11
├── FastAPI
├── Pydantic 2
├── SQLAlchemy 2
├── Redis-py
└── Celery (任务队列）
```

**最终选择**: Node.js + Express

### 2.3 数据库技术选型

#### 选择1: PostgreSQL ⭐推荐

**理由：**
- ✅ **关系型**: 支持复杂查询和事务
- ✅ **JSONB**: 支持非结构化数据
- ✅ **扩展性**: 丰富的插件生态
- ✅ **成熟稳定**: 企业级数据库

**用途：**
- 用户数据
- 工具数据
- 知识数据
- 权限数据

#### 选择2: MySQL

**理由：**
- ✅ **广泛使用**: 社区大
- ✅ **性能优秀**: 读写性能好
- ✅ **云托管**: AWS RDS、阿里云RDS

**最终选择**: PostgreSQL 15

### 2.4 AI技术选型

#### 多模型支持策略

| 模型提供商 | 用途 | 优先级 |
|-----------|------|--------|
| OpenAI (GPT-4) | 复杂任务、多模态 | P0 |
| 智谱AI (GLM-4) | 本土化、成本优化 | P1 |
| Claude (Anthropic) | 长文本、推理 | P2 |

#### AI框架

| 框架 | 用途 |
|------|------|
| LangChain | AI应用编排 |
| LlamaIndex | 数据索引和检索 |
| Vercel AI SDK | 快速集成 |

**最终选择**: LangChain + OpenAI/智谱AI

---

## 3. 开发环境配置 / Development Environment

### 3.1 本地开发环境

#### 环境要求
```bash
Node.js >= 20.x
npm >= 9.x
PostgreSQL >= 15.x
Redis >= 7.x
Docker >= 24.x
```

#### 项目初始化
```bash
# 克隆项目
git clone https://github.com/DaimaRuge/fudi.git
cd fudi

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 填入配置

# 启动数据库
docker-compose up -d postgres redis

# 运行数据库迁移
npm run db:migrate

# 启动开发服务器
npm run dev
```

### 3.2 Docker开发环境

```yaml
# docker-compose.dev.yml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: fudi_dev
      POSTGRES_USER: fudi
      POSTGRES_PASSWORD: fudi
    ports:
      - "5432:5432"
    volumes:
      - postgres_dev:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_dev:/data

  app:
    build: .
    command: npm run dev
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://fudi:fudi@postgres:5432/fudi_dev
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    volumes:
      - .:/app
      - /app/node_modules

volumes:
  postgres_dev:
  redis_dev:
```

---

## 4. 项目结构 / Project Structure

### 4.1 Monorepo结构（推荐）

```
fudi/
├── apps/
│   ├── web/                    # Next.js Web应用
│   │   ├── src/
│   │   │   ├── app/           # App Router页面
│   │   │   ├── components/    # React组件
│   │   │   ├── lib/           # 工具函数
│   │   │   ├── hooks/         # 自定义Hooks
│   │   │   └── styles/        # 全局样式
│   │   ├── public/
│   │   └── package.json
│   └── api/                    # Node.js API服务
│       ├── src/
│       │   ├── routes/        # API路由
│       │   ├── services/      # 业务逻辑
│       │   ├── models/        # 数据模型
│       │   ├── middleware/    # 中间件
│       │   └── utils/         # 工具函数
│       └── package.json
├── packages/
│   ├── ui/                     # 共享UI组件
│   ├── types/                   # TypeScript类型定义
│   └── utils/                   # 共享工具函数
├── prd/                         # 产品PRD
├── architecture/                 # 架构设计
├── technical-solution/           # 技术方案
├── docs/                        # 项目文档
└── daily-update-log.md          # 每日更新日志
```

### 4.2 代码规范

#### TypeScript配置
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

#### ESLint配置
```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "prettier"
  ],
  "rules": {
    "react/no-unescaped-entities": "off",
    "@next/next/no-img-element": "error"
  }
}
```

---

## 5. 开发流程 / Development Workflow

### 5.1 Git工作流

#### 分支策略
```
main (生产环境）
    ↑
develop (开发环境）
    ↑
feature/* (功能分支）
```

#### 提交规范
```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型（type）：**
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具相关

**示例：**
```
feat(user): add user registration

- Implement registration form
- Add email validation
- Send welcome email

Closes #123
```

### 5.2 CI/CD流程

#### GitHub Actions工作流

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm run test
      - name: Run linter
        run: npm run lint
      - name: Build
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          # 部署脚本
          echo "Deploying to production..."
```

### 5.3 发布流程

#### 版本号规则
遵循 [Semantic Versioning](https://semver.org/):

```
MAJOR.MINOR.PATCH

MAJOR: 不兼容的API修改
MINOR: 向下兼容的功能性新增
PATCH: 向下兼容的问题修正
```

#### 发布步骤
```bash
1. 创建发布分支
   git checkout -b release/v1.0.0

2. 更新版本号
   npm version 1.0.0

3. 生成CHANGELOG
   npm run changelog

4. 提交并推送
   git add .
   git commit -m "chore(release): v1.0.0"
   git push origin release/v1.0.0

5. 创建Pull Request

6. 合并后自动发布
   - GitHub Actions自动构建
   - 自动创建GitHub Release
   - 自动部署到生产环境
```

---

## 6. API设计 / API Design

### 6.1 RESTful API设计

#### 用户API
```
POST   /api/v1/users/register          # 用户注册
POST   /api/v1/users/login             # 用户登录
GET    /api/v1/users/me                # 获取当前用户
PUT    /api/v1/users/me                # 更新用户信息
DELETE /api/v1/users/me                # 删除用户
GET    /api/v1/users/:id/preferences    # 获取用户偏好
PUT    /api/v1/users/:id/preferences    # 更新用户偏好
```

#### 工具API
```
GET    /api/v1/tools                   # 获取工具列表
GET    /api/v1/tools/:id               # 获取工具详情
POST   /api/v1/tools                   # 创建工具
PUT    /api/v1/tools/:id               # 更新工具
DELETE /api/v1/tools/:id               # 删除工具
GET    /api/v1/tools/search            # 搜索工具
POST   /api/v1/tools/:id/review         # 工具评价
```

#### AI API
```
POST   /api/v1/ai/chat                 # AI对话
POST   /api/v1/ai/generate             # AI生成
GET    /api/v1/ai/models               # 获取可用模型
POST   /api/v1/ai/feedback             # AI反馈
```

### 6.2 API响应格式

#### 成功响应
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Example Tool",
    "description": "Description"
  },
  "timestamp": "2026-02-04T00:00:00Z"
}
```

#### 错误响应
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "field": "email",
      "message": "Invalid email format"
    }
  },
  "timestamp": "2026-02-04T00:00:00Z"
}
```

### 6.3 GraphQL API（可选）

```graphql
# 获取工具列表
query GetTools($category: String) {
  tools(category: $category) {
    id
    name
    description
    rating
    tags
  }
}

# 创建工具
mutation CreateTool($input: ToolInput!) {
  createTool(input: $input) {
    id
    name
    description
  }
}
```

---

## 7. 数据库设计 / Database Design

### 7.1 核心表结构

#### 用户表 (users)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
```

#### 工具表 (tools)
```sql
CREATE TABLE tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id UUID REFERENCES categories(id),
    tags TEXT[] DEFAULT '{}',
    rating DECIMAL(3,2) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_tags ON tools USING GIN(tags);
```

#### AI对话表 (conversations)
```sql
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) NOT NULL,
    messages JSONB DEFAULT '[]',
    context JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conversations_user ON conversations(user_id);
```

### 7.2 数据库迁移

使用 Prisma 管理：

```prisma
// prisma/migrations/20260204_initial/migration.sql

CREATE TYPE user_role AS ENUM ('user', 'admin');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 8. 安全方案 / Security Solution

### 8.1 认证方案

#### JWT Token
```typescript
import jwt from 'jsonwebtoken';

// 生成Token
const generateToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// 验证Token
const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
```

### 8.2 数据加密

#### 密码加密
```typescript
import bcrypt from 'bcrypt';

// 加密密码
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

// 验证密码
const verifyPassword = async (
  password: string,
  hash: string
) => {
  return await bcrypt.compare(password, hash);
};
```

#### 敏感数据加密
```typescript
import crypto from 'crypto';

// 加密
const encrypt = (text: string) => {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return iv.toString('hex') + ':' + encrypted;
};
```

### 8.3 安全中间件

```typescript
// Helmet - 安全头
import helmet from 'helmet';
app.use(helmet());

// Rate Limiting - 限流
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100 // 限制100次请求
});
app.use('/api', limiter);

// CORS - 跨域
import cors from 'cors';
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true
}));
```

---

## 9. 性能优化方案 / Performance Optimization

### 9.1 前端优化

#### 代码分割
```typescript
// 动态导入
const WorkflowEditor = dynamic(
  () => import('@/components/WorkflowEditor'),
  { loading: () => <Loading /> }
);
```

#### 图片优化
```typescript
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={200}
  priority // 首屏图片优先加载
/>
```

### 9.2 后端优化

#### Redis缓存
```typescript
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// 缓存数据
const cache = async (key: string, value: any, ttl: number = 300) => {
  await redis.setex(key, ttl, JSON.stringify(value));
};

// 获取缓存
const getCache = async (key: string) => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};
```

#### 查询优化
```typescript
// 避免N+1查询
const tools = await prisma.tool.findMany({
  include: {
    category: true,
    reviews: {
      select: {
        rating: true
      }
    }
  }
});
```

---

## 10. 测试方案 / Testing Solution

### 10.1 单元测试

```typescript
// __tests__/services/user.service.test.ts
import { UserService } from '@/services/user.service';

describe('UserService', () => {
  it('should create a new user', async () => {
    const userData = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123'
    };

    const user = await UserService.create(userData);

    expect(user).toHaveProperty('id');
    expect(user.email).toBe(userData.email);
  });
});
```

### 10.2 集成测试

```typescript
// __tests__/api/users.test.ts
import request from 'supertest';
import app from '@/app';

describe('User API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
});
```

### 10.3 E2E测试

```typescript
// e2e/user-flow.spec.ts
import { test, expect } from '@playwright/test';

test('user registration flow', async ({ page }) => {
  await page.goto('/register');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('/dashboard');
});
```

---

## 11. 部署方案 / Deployment Solution

### 11.1 Docker部署

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
```

### 11.2 Kubernetes部署

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: fudi-web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: fudi-web
  template:
    metadata:
      labels:
        app: fudi-web
    spec:
      containers:
      - name: fudi-web
        image: ghcr.io/DaimaRuge/fudi:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: fudi-secrets
              key: database-url
```

### 11.3 CI/CD自动化

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    tags:
      - 'v*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: ghcr.io/DaimaRuge/fudi:latest

      - name: Deploy to Kubernetes
        uses: azure/k8s-deploy@v4
        with:
          manifests: |
            k8s/deployment.yaml
            k8s/service.yaml
          kubeconfig: ${{ secrets.KUBE_CONFIG }}
```

---

## 12. 监控方案 / Monitoring Solution

### 12.1 应用监控

#### Prometheus配置
```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'fudi-api'
    metrics_path: '/metrics'
    static_configs:
      - targets: ['api:3000']
```

#### Grafana Dashboard
- API响应时间
- 请求速率
- 错误率
- 系统资源使用

### 12.2 日志收集

#### ELK Stack（可选）
- Elasticsearch: 存储日志
- Logstash: 处理日志
- Kibana: 可视化日志

---

## 13. 技术债务管理 / Technical Debt Management

### 13.1 当前技术债务

| ID | 描述 | 优先级 | 计划版本 |
|----|------|--------|---------|
| TD-001 | 单元测试覆盖率不足 | 高 | v1.1.0 |
| TD-002 | API文档需要自动化生成 | 中 | v1.2.0 |
| TD-003 | 缺少数据库迁移脚本 | 高 | v1.1.0 |

### 13.2 技术债务管理流程

1. **识别**: 每个Sprint末尾识别技术债务
2. **评估**: 评估影响和成本
3. **优先级**: 基于业务价值排序
4. **分配**: 分配到后续Sprint
5. **追踪**: 在Jira/Notion中追踪

---

## 14. 附录 / Appendix

### 14.1 环境变量配置

```bash
# .env.example
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/fudi

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key

# AI Services
OPENAI_API_KEY=sk-...
ZHIPU_API_KEY=...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 14.2 参考资料

- Next.js文档: https://nextjs.org/docs
- Prisma文档: https://www.prisma.io/docs
- LangChain文档: https://python.langchain.com/
- OpenAI文档: https://platform.openai.com/docs

---

**文档结束 / End of Document**

*逍遥游 (Xiāoyáo Yóu) - 架构师 & 主力开发*
*2026-02-04*
