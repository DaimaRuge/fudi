# Fudi 架构设计 - v1.0.0

**文档版本 / Document Version:** v1.0.0
**创建日期 / Created:** 2026-02-04
**作者 / Author:** 逍遥游 (Xiāoyáo Yóu)
**状态 / Status:** 初始架构设计 / Initial Architecture Design

---

## 1. 架构概述 / Architecture Overview

### 1.1 设计原则

#### 1.1.1 Vibe Coding 原则
- **灵感优先 / Inspiration First**：支持快速创意实现
- **用户中心 / User-Centric**：以用户体验驱动架构
- **快速迭代 / Rapid Iteration**：支持每日更新部署

#### 1.1.2 技术原则
- **微服务化 / Microservices**：服务独立部署扩展
- **事件驱动 / Event-Driven**：异步通信，解耦服务
- **云原生 / Cloud-Native**：容器化，多云部署
- **AI原生 / AI-Native**：深度集成AI能力

### 1.2 架构分层

```
┌─────────────────────────────────────────────────────────────┐
│                   用户界面层 / Presentation Layer               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────┐│
│  │ Web App  │  │ Mobile  │  │ AI Chat  │  │ Admin ││
│  └──────────┘  └──────────┘  └──────────┘  └───────┘│
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  API网关层 / API Gateway Layer                 │
│           (身份验证、限流、路由、监控）                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                业务服务层 / Business Service Layer              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────┐│
│  │ 用户服务 │  │ 工具服务 │  │ AI服务   │  │工作流  ││
│  └──────────┘  └──────────┘  └──────────┘  └───────┘│
│  ┌──────────┐  ┌──────────┐                               │
│  │ 知识服务 │  │ 通知服务 │                               │
│  └──────────┘  └──────────┘                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│               数据持久层 / Data Persistence Layer               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────┐│
│  │PostgreSQL│  │  Redis   │  │Vector DB │  │MongoDB││
│  └──────────┘  └──────────┘  └──────────┘  └───────┘│
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│               外部服务层 / External Service Layer              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │OpenAI API│  │智谱AI   │  │ LangChain │           │
│  └──────────┘  └──────────┘  └──────────┘           │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. 核心模块设计 / Core Module Design

### 2.1 用户界面层

#### 2.1.1 Web应用
- **框架**: Next.js 14 (App Router)
- **UI库**: shadcn/ui + Tailwind CSS
- **状态管理**: Zustand
- **路由**: App Router (文件系统路由）

**核心页面：**
- `/` - 首页
- `/tools` - 工具市场
- `/workflow` - 工作流编辑器
- `/assistant` - AI助手
- `/knowledge` - 知识库
- `/profile` - 用户设置

#### 2.1.2 AI聊天界面
- **组件**: 自定义Chat组件
- **特性**:
  - 多轮对话
  - 上下文记忆
  - 流式响应
  - 多模态输入（文本、语音、图像）

### 2.2 API网关层

#### 2.2.1 网关功能
- **身份验证**: JWT + OAuth2
- **限流**: Token Bucket算法
- **路由**: 基于路径的负载均衡
- **监控**: Prometheus + Grafana
- **日志**: 结构化日志（JSON）

#### 2.2.2 API设计
- **RESTful API**: 标准 CRUD操作
- **GraphQL API**: 复杂查询和订阅
- **WebSocket**: 实时通信（AI对话）

### 2.3 业务服务层

#### 2.3.1 用户服务 (User Service)
**职责：**
- 用户注册/登录
- 用户信息管理
- 权限管理
- 偏好设置

**接口示例：**
```typescript
POST /api/users/register
POST /api/users/login
GET  /api/users/:id
PUT  /api/users/:id
GET  /api/users/:id/preferences
```

#### 2.3.2 工具服务 (Tool Service)
**职责：**
- 工具CRUD操作
- 工具搜索和推荐
- 工具评价管理
- 工具分类管理

**接口示例：**
```typescript
GET    /api/tools
GET    /api/tools/:id
POST   /api/tools
PUT    /api/tools/:id
DELETE /api/tools/:id
GET    /api/tools/search?q=keyword
POST   /api/tools/:id/review
```

#### 2.3.3 AI服务 (AI Service)
**职责：**
- AI模型调用
- 提示词管理
- 上下文管理
- 多模型支持

**接口示例：**
```typescript
POST /api/ai/chat
POST /api/ai/generate
GET  /api/ai/models
POST /api/ai/feedback
```

#### 2.3.4 工作流服务 (Workflow Service)
**职责：**
- 工作流定义
- 工作流执行
- 工作流监控
- 工作流模板

**接口示例：**
```typescript
GET    /api/workflows
GET    /api/workflows/:id
POST   /api/workflows
PUT    /api/workflows/:id
POST   /api/workflows/:id/execute
GET    /api/workflows/templates
```

#### 2.3.5 知识服务 (Knowledge Service)
**职责：**
- 知识CRUD操作
- 知识检索（向量搜索）
- 知识分类
- 学习路径推荐

**接口示例：**
```typescript
GET    /api/knowledge
GET    /api/knowledge/:id
POST   /api/knowledge
GET    /api/knowledge/search
GET    /api/knowledge/learning-path
```

#### 2.3.6 通知服务 (Notification Service)
**职责：**
- 通知发送（邮件、推送、站内信）
- 通知管理
- 通知偏好

**接口示例：**
```typescript
GET    /api/notifications
POST   /api/notifications
PUT    /api/notifications/:id/read
POST   /api/notifications/preferences
```

### 2.4 数据持久层

#### 2.4.1 PostgreSQL
**用途：** 关系型数据存储

**表结构：**
```sql
-- 用户表
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    preferences JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 工具表
CREATE TABLE tools (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id UUID REFERENCES categories(id),
    tags TEXT[],
    rating DECIMAL(3,2),
    created_by UUID REFERENCES users(id)
);

-- 知识表
CREATE TABLE knowledge (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category_id UUID REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### 2.4.2 Redis
**用途：** 缓存和会话存储

**存储内容：**
- API响应缓存（TTL: 5分钟）
- 用户会话（TTL: 24小时）
- 限流计数器（TTL: 1小时）
- 实时数据（WebSocket连接）

#### 2.4.3 Vector Database
**用途：** 语义搜索和向量存储

**技术选择：**
- Pinecone（托管服务）
- Weaviate（自托管）
- Qdrant（轻量级）

**向量表：**
```json
{
  "id": "knowledge_123",
  "vector": [0.1, 0.2, 0.3, ...],
  "metadata": {
    "title": "AI工具使用指南",
    "category": "学习"
  }
}
```

#### 2.4.4 MongoDB
**用途：** 非结构化数据存储

**集合：**
- `conversations`: AI对话历史
- `workflows`: 工作流执行日志
- `analytics`: 用户行为数据

---

## 3. 技术栈详解 / Technology Stack Details

### 3.1 前端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 14.x | React框架，SSR/SSG |
| React | 18.x | UI库 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 3.x | 样式系统 |
| shadcn/ui | latest | UI组件库 |
| Zustand | 4.x | 状态管理 |
| React Query | 5.x | 数据获取 |
| Framer Motion | 10.x | 动画效果 |

### 3.2 后端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Node.js | 20.x | 运行时 |
| Express | 4.x | Web框架（或FastAPI） |
| TypeScript | 5.x | 类型安全 |
| Prisma ORM | 5.x | 数据库ORM |
| Redis | 7.x | 缓存 |
| Bull Queue | 4.x | 任务队列 |

### 3.3 AI/ML技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| OpenAI API | latest | GPT模型 |
| 智谱AI | latest | GLM模型 |
| LangChain | latest | AI应用框架 |
| LlamaIndex | latest | 数据索引 |

### 3.4 DevOps技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Docker | 24.x | 容器化 |
| Docker Compose | 2.x | 本地开发 |
| GitHub Actions | latest | CI/CD |
| Prometheus | latest | 监控 |
| Grafana | latest | 可视化 |

---

## 4. 部署架构 / Deployment Architecture

### 4.1 环境划分

```
开发环境 (Development)
    ↓
测试环境 (Staging)
    ↓
生产环境 (Production)
```

### 4.2 容器化部署

```dockerfile
# Dockerfile - Next.js Web App
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports: ["3000:3000"]
    environment:
      - DATABASE_URL=postgres://...
      - REDIS_URL=redis://...
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=fudi
      - POSTGRES_USER=fudi
      - POSTGRES_PASSWORD=fudi
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### 4.3 云部署

#### 选择1：AWS
- **ECS/EKS**: 容器编排
- **RDS**: PostgreSQL托管
- **ElastiCache**: Redis托管
- **S3**: 对象存储
- **CloudFront**: CDN

#### 选择2：阿里云
- **ACK**: 容器服务Kubernetes版
- **RDS**: 云数据库
- **Redis**: 云数据库Redis版
- **OSS**: 对象存储
- **CDN**: 内容分发网络

---

## 5. 安全架构 / Security Architecture

### 5.1 认证与授权

```
用户登录
    ↓
获取JWT Token
    ↓
请求携带Token
    ↓
API Gateway验证Token
    ↓
鉴权通过，请求业务服务
```

### 5.2 数据安全

| 层次 | 措施 |
|------|------|
| 传输层 | HTTPS/TLS 1.3 |
| 应用层 | 数据加密（AES-256）|
| 存储层 | PostgreSQL加密 |
| 访问层 | RBAC权限控制 |

### 5.3 安全扫描

- **依赖扫描**: Snyk, Dependabot
- **代码扫描**: SonarQube
- **容器扫描**: Trivy
- **运行时监控**: Falco

---

## 6. 性能优化 / Performance Optimization

### 6.1 前端优化

- **代码分割**: 动态导入
- **图片优化**: Next/Image + WebP
- **缓存策略**: Service Worker
- **懒加载**: Intersection Observer

### 6.2 后端优化

- **数据库索引**: 关键字段索引
- **查询优化**: 避免 N+1 查询
- **缓存策略**: Redis多级缓存
- **异步处理**: Bull Queue

### 6.3 CDN优化

- **静态资源**: CloudFront/CDN
- **边缘计算**: Edge Functions
- **智能路由**: 基于地理位置

---

## 7. 监控与日志 / Monitoring & Logging

### 7.1 监控指标

| 类型 | 指标 |
|------|------|
| 应用 | API响应时间、错误率、吞吐量 |
| 系统 | CPU、内存、磁盘、网络 |
| 业务 | 用户数、工具使用次数、会话时长 |

### 7.2 日志管理

```json
{
  "timestamp": "2026-02-04T00:00:00Z",
  "level": "info",
  "service": "user-service",
  "message": "User login successful",
  "metadata": {
    "user_id": "123",
    "ip": "1.2.3.4"
  }
}
```

### 7.3 告警策略

- **Critical**: 立即通知（PagerDuty）
- **Warning**: 邮件通知
- **Info**: 每日汇总

---

## 8. 扩展性设计 / Scalability Design

### 8.1 水平扩展

- **无状态服务**: 易于扩展
- **负载均衡**: Nginx/AWS ALB
- **自动扩容**: Kubernetes HPA

### 8.2 垂直扩展

- **实例升级**: 增加CPU/内存
- **数据库优化**: 连接池优化
- **缓存优化**: Redis集群

---

## 9. 技术债务 / Technical Debt

### 9.1 已知技术债务

| 项目 | 描述 | 计划解决 |
|------|------|---------|
| 数据库迁移 | 需要统一的迁移脚本 | v1.1.0 |
| 测试覆盖 | 单元测试覆盖率不足 | v1.1.0 |
| 文档更新 | API文档需要自动化生成 | v1.2.0 |

### 9.2 技术债务管理

- **定期评估**: 每2周评估一次
- **优先级排序**: 基于影响和成本
- **分配资源**: 每个迭代分配20%时间

---

## 10. 架构演进 / Architecture Evolution

### 10.1 短期演进（1-3个月）

- **v1.0.0**: MVP架构（单体 + 缓存）
- **v1.1.0**: 微服务拆分（用户服务、工具服务）
- **v1.2.0**: 引入消息队列（RabbitMQ）

### 10.2 中期演进（3-6个月）

- **v2.0.0**: 完全微服务化
- **v2.1.0**: 引入服务网格（Istio）
- **v2.2.0**: 多云部署支持

### 10.3 长期演进（6-12个月）

- **v3.0.0**: 边缘计算架构
- **v3.1.0**: Serverless架构
- **v3.2.0**: AI驱动的自适应架构

---

## 11. 附录 / Appendix

### 11.1 术语表

| 术语 | 定义 |
|------|------|
| MVP | 最小可行产品（Minimum Viable Product）|
| P0/P1/P2 | 优先级（Priority 0/1/2）|
| RBAC | 基于角色的访问控制（Role-Based Access Control）|
| CDN | 内容分发网络（Content Delivery Network）|

### 11.2 参考资料

- Next.js文档：https://nextjs.org/docs
- Prisma文档：https://www.prisma.io/docs
- Redis文档：https://redis.io/docs
- OpenAI API文档：https://platform.openai.com/docs

---

**文档结束 / End of Document**

*逍遥游 (Xiāoyáo Yóu) - 架构师*
*2026-02-04*
