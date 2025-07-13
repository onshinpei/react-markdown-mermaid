import React, { useState } from 'react';
import { rehypeMermaid, MermaidBlock } from '../src/index';
import MarkdownExample from './MarkdownExample';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('markdown');

  const flowchart = `
    graph TD
      A[开始] --> B{判断条件}
      B -->|是| C[处理A]
      B -->|否| D[处理B]
      C --> E[结束]
      D --> E
  `;

  const sequenceDiagram = `
    sequenceDiagram
      participant 用户
      participant 系统
      participant 数据库
      
      用户->>系统: 登录请求
      系统->>数据库: 验证用户
      数据库-->>系统: 返回结果
      系统-->>用户: 登录响应
  `;

  const ganttChart = `
    gantt
      title 项目计划
      dateFormat  YYYY-MM-DD
      section 设计
      需求分析    :done, des1, 2024-01-01, 2024-01-10
      系统设计    :active, des2, 2024-01-11, 2024-01-25
      section 开发
      编码实现    :des3, 2024-01-26, 2024-02-15
      测试调试    :des4, 2024-02-16, 2024-02-28
  `;

  const classDiagram = `
    classDiagram
      class Animal {
        +String name
        +int age
        +makeSound()
      }
      class Dog {
        +bark()
      }
      class Cat {
        +meow()
      }
      Animal <|-- Dog
      Animal <|-- Cat
  `;

  const pieChart = `
    pie title 浏览器市场份额
      "Chrome" : 65.5
      "Firefox" : 15.2
      "Safari" : 12.3
      "Edge" : 7.0
  `;

  const stateDiagram = `
    stateDiagram-v2
      [*] --> 待机
      待机 --> 运行 : 启动
      运行 --> 暂停 : 暂停
      暂停 --> 运行 : 恢复
      运行 --> 待机 : 停止
      暂停 --> 待机 : 停止
  `;

  const examples = {
    flowchart: {
      title: '流程图',
      code: flowchart,
      description: '展示基本的流程图，包含条件判断和多个处理步骤。',
    },
    sequence: {
      title: '序列图',
      code: sequenceDiagram,
      description: '展示用户登录的交互流程，包含多个参与者之间的消息传递。',
    },
    gantt: {
      title: '甘特图',
      code: ganttChart,
      description: '展示项目计划的时间安排，包含不同阶段的任务和进度。',
    },
    class: {
      title: '类图',
      code: classDiagram,
      description: '展示面向对象设计的类结构，包含继承关系。',
    },
    pie: {
      title: '饼图',
      code: pieChart,
      description: '展示数据分布情况，以百分比形式显示。',
    },
    state: {
      title: '状态图',
      code: stateDiagram,
      description: '展示系统状态转换，包含状态和触发条件。',
    },
  };

  // 模拟rehype插件处理后的AST节点
  const createMermaidNode = (code: string) => ({
    type: 'element',
    tagName: 'MermaidBlock',
    properties: {
      code,
      mermaidConfig: {
        theme: 'default',
        flowchart: { useMaxWidth: true },
      },
      ssr: false,
    },
    children: [],
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Mermaid 演示</h1>
        <p>一个用于在React应用中渲染Mermaid图表的轻量级组件和rehype插件</p>
      </header>

      <nav className="tabs">
        <button className={`tab ${activeTab === 'markdown' ? 'active' : ''}`} onClick={() => setActiveTab('markdown')}>
          React-Markdown 示例
        </button>
        {Object.entries(examples).map(([key, example]) => (
          <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>
            {example.title}
          </button>
        ))}
      </nav>

      <main className="content">
        {activeTab === 'markdown' && (
          <div className="example active">
            <h2>React-Markdown + rehypeMermaid 示例</h2>
            <p>这个示例展示了如何在 react-markdown 中使用 rehypeMermaid 插件来渲染 Mermaid 图表。</p>

            <MarkdownExample />
          </div>
        )}

        {Object.entries(examples).map(([key, example]) => {
          if (activeTab !== key) {
            return null;
          }
          return (
            <div key={key} className={`example ${activeTab === key ? 'active' : ''}`}>
            <h2>{example.title}</h2>
            <p>{example.description}</p>

            <div className="chart-container">
              <MermaidBlock code={example.code} className="demo-mermaid" />
            </div>

            <details className="code-details">
              <summary>查看Mermaid代码</summary>
              <pre className="code-block">
                <code>{example.code}</code>
              </pre>
            </details>

            <details className="code-details">
              <summary>rehype插件使用方法</summary>
              <pre className="code-block">
                <code>{`// 1. 在markdown中使用
\`\`\`mermaid
${example.code}
\`\`\`

// 2. 使用rehype插件处理
import { rehypeMermaid, MermaidBlock } from 'react-mermaid';

// 配置rehype插件
const mermaidConfig = {
  theme: 'default',
  flowchart: { useMaxWidth: true }
};

// 在rehype插件链中使用
rehypePlugins: [
  [rehypeMermaid, { mermaidConfig, ssr: false }]
]

// 3. 注册MermaidBlock组件
components: {
  MermaidBlock
}

// 4. 处理后的AST节点示例
${JSON.stringify(createMermaidNode(example.code), null, 2)}`}</code>
              </pre>
            </details>

            <details className="code-details">
              <summary>直接使用MermaidBlock组件</summary>
              <pre className="code-block">
                <code>{`import { MermaidBlock } from 'react-mermaid';

// 基本用法
<MermaidBlock code="${example.code.replace(/\n/g, '\\n')}" />

// 自定义配置
<MermaidBlock 
  code="${example.code.replace(/\n/g, '\\n')}"
  mermaidConfig={{
    theme: 'dark',
    flowchart: { useMaxWidth: true }
  }}
  className="my-mermaid"
  style={{ border: '1px solid #ccc' }}
/>`}</code>
              </pre>
            </details>
          </div>
          );
        })}
      </main>

      <footer className="app-footer">
        <p>
          <a href="https://github.com/your-username/react-mermaid" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {' | '}
          <a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer">
            Mermaid 文档
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
