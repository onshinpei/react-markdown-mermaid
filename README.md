# React Mermaid

一个用于在React应用中渲染Mermaid图表的轻量级组件和rehype插件。

## 项目结构

```
react-markdown-mermaid/
├── src/                    # 核心代码
│   ├── index.ts           # 主入口文件
│   ├── Mermaid.tsx        # Mermaid组件
│   ├── MermaidBlock.tsx   # MermaidBlock组件
│   ├── rehypeMermaid.ts   # rehype插件
│   ├── types.ts           # TypeScript类型定义
│   └── style.css          # 样式文件
├── example/               # 示例代码
│   ├── main.tsx          # 示例入口文件
│   ├── App.tsx           # 示例应用
│   └── MarkdownExample.tsx # Markdown示例
├── index.html             # HTML入口文件
└── package.json           # 项目配置
```

## 核心功能

### Mermaid 组件

一个独立的React组件，用于渲染Mermaid图表：

```tsx
import { Mermaid } from 'react-mermaid';

const chart = `
  graph TD
    A[开始] --> B{判断条件}
    B -->|是| C[处理A]
    B -->|否| D[处理B]
    C --> E[结束]
    D --> E
`;

<Mermaid chart={chart} />
```

### MermaidBlock 组件

专门为rehype插件设计的组件：

```tsx
import { MermaidBlock } from 'react-mermaid';

<MermaidBlock code={chartCode} />
```

### rehypeMermaid 插件

用于在react-markdown中自动渲染Mermaid图表：

```tsx
import ReactMarkdown from 'react-markdown';
import { rehypeMermaid, MermaidBlock } from 'react-mermaid';

const markdown = `
# 我的文档

\`\`\`mermaid
graph TD
  A --> B
\`\`\`
`;

<ReactMarkdown
  rehypePlugins={[[rehypeMermaid, { mermaidConfig: { theme: 'default' } }]]}
  components={{
    MermaidBlock: MermaidBlock,
  }}
>
  {markdown}
</ReactMarkdown>
```

## 开发

### 安装依赖

```bash
npm install
```

### 运行示例

```bash
npm run dev
```

### 构建库

```bash
npm run build
```

## 特性

- ✅ 支持所有Mermaid图表类型
- ✅ 服务端渲染支持
- ✅ TypeScript支持
- ✅ 自定义主题和配置
- ✅ 错误处理和加载状态
- ✅ 与react-markdown完美集成

## 支持的图表类型

- 流程图 (Flowchart)
- 序列图 (Sequence Diagram)
- 甘特图 (Gantt Chart)
- 类图 (Class Diagram)
- 饼图 (Pie Chart)
- 状态图 (State Diagram)
- 用户旅程图 (User Journey)
- Git图表 (Git Graph)
- C4图 (C4 Diagram)
- 思维导图 (Mindmap)
- 时间线 (Timeline)
- ZenUML
- 桑基图 (Sankey)

## 许可证

MIT
