const n="react-markdown-mermaid 演示",e="一个用于在React应用中渲染Mermaid图表的轻量级组件和rehype插件",a={markdown:"React-Markdown 示例",react:"单独使用示例"},t={viewMermaidCode:"查看Mermaid代码",useMermaidBlock:"直接使用MermaidBlock组件",github:"GitHub",mermaidDocs:"Mermaid 文档",markdownExampleTitle:"React-Markdown + rehypeMermaid 示例",markdownExampleDescription:"这个示例展示了如何在 react-markdown 中使用 rehypeMermaid 插件来渲染 Mermaid 图表。",reactExampleTitle:"单独使用 MermaidBlock 示例",reactExampleDescription:"这个示例展示了如何直接使用 MermaidBlock 组件来渲染 Mermaid 图表，无需 react-markdown。",codeExample:"代码示例",renderEffect:"渲染效果",mermaidCode:"Mermaid 代码",reactUsageCode:"React 使用代码"},i={flowchart:{title:"流程图",description:"展示基本的流程图，包含条件判断和多个处理步骤。",code:`
    graph TD
      A[开始] --> B{判断条件}
      B -->|是| C[处理A]
      B -->|否| D[处理B]
      C --> E[结束]
      D --> E
  `},sequence:{title:"序列图",description:"展示用户登录的交互流程，包含多个参与者之间的消息传递。",code:`
    sequenceDiagram
      participant 用户
      participant 系统
      participant 数据库
      用户->>系统: 登录请求
      系统->>数据库: 验证用户
      数据库-->>系统: 返回结果
      系统-->>用户: 登录响应
  `},gantt:{title:"甘特图",description:"展示项目计划的时间安排，包含不同阶段的任务和进度。",code:`
    gantt
      title 项目计划
      dateFormat  YYYY-MM-DD
      section 设计
      需求分析    :done, des1, 2024-01-01, 2024-01-10
      系统设计    :active, des2, 2024-01-11, 2024-01-25
      section 开发
      编码实现    :des3, 2024-01-26, 2024-02-15
      测试调试    :des4, 2024-02-16, 2024-02-28
  `},class:{title:"类图",description:"展示面向对象设计的类结构，包含继承关系。",code:`
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
  `},pie:{title:"饼图",description:"展示数据分布情况，以百分比形式显示。",code:`
    pie title 浏览器市场份额
      "Chrome" : 65.5
      "Firefox" : 15.2
      "Safari" : 12.3
      "Edge" : 7.0
  `},state:{title:"状态图",description:"展示系统状态转换，包含状态和触发条件。",code:`
    stateDiagram-v2
      [*] --> 待机
      待机 --> 运行 : 启动
      运行 --> 暂停 : 暂停
      暂停 --> 运行 : 恢复
      运行 --> 待机 : 停止
      暂停 --> 待机 : 停止
  `}},r={title:"React Mermaid + React-Markdown 示例",description:"这是一个使用 react-markdown 和 rehypeMermaid 插件的完整示例。",sections:{flowchart:{title:"流程图示例",code:`graph TD
    A[开始] --> B{判断条件}
    B -->|是| C[处理A]
    B -->|否| D[处理B]
    C --> E[结束]
    D --> E`},sequence:{title:"序列图示例",code:`sequenceDiagram
    participant 用户
    participant 系统
    participant 数据库
    
    用户->>系统: 登录请求
    系统->>数据库: 验证用户
    数据库-->>系统: 返回结果
    系统-->>用户: 登录响应`},gantt:{title:"甘特图示例",code:`gantt
    title 项目计划
    dateFormat  YYYY-MM-DD
    section 设计
    需求分析    :done, des1, 2024-01-01, 2024-01-10
    系统设计    :active, des2, 2024-01-11, 2024-01-25
    section 开发
    编码实现    :des3, 2024-01-26, 2024-02-15
    测试调试    :des4, 2024-02-16, 2024-02-28`},class:{title:"类图示例",code:`classDiagram
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
    Animal <|-- Cat`},pie:{title:"饼图示例",code:`pie title 浏览器市场份额
    "Chrome" : 65.5
    "Firefox" : 15.2
    "Safari" : 12.3
    "Edge" : 7.0`},state:{title:"状态图示例",code:`stateDiagram-v2
    [*] --> 待机
    待机 --> 运行 : 启动
    运行 --> 暂停 : 暂停
    暂停 --> 运行 : 恢复
    运行 --> 待机 : 停止
    暂停 --> 待机 : 停止`},code:{title:"代码示例",description:"这里是一个普通的代码块：",code:`function hello() {
  console.log('Hello, World!');
}`},list:{title:"列表示例",items:["项目 1","项目 2","子项目 2.1","子项目 2.2","项目 3"]},table:{title:"表格示例",headers:["功能","状态","描述"],rows:[["流程图","✅","支持"],["序列图","✅","支持"],["甘特图","✅","支持"],["类图","✅","支持"],["饼图","✅","支持"],["状态图","✅","支持"]]},summary:{title:"总结",content:"这个示例展示了如何在 react-markdown 中使用 rehypeMermaid 插件来渲染 Mermaid 图表。插件会自动识别 markdown 中的 ```mermaid 代码块并将其转换为 MermaidBlock 组件。"}}},c={title:"单独使用 MermaidBlock 示例",description:"这个示例展示了如何直接使用 MermaidBlock 组件来渲染 Mermaid 图表，无需 react-markdown。",sections:{flowchart:{title:"流程图示例",code:`graph TD
    A[开始] --> B{判断条件}
    B -->|是| C[处理A]
    B -->|否| D[处理B]
    C --> E[结束]
    D --> E`},sequence:{title:"序列图示例",code:`sequenceDiagram
    participant 用户
    participant 系统
    participant 数据库
    
    用户->>系统: 登录请求
    系统->>数据库: 验证用户
    数据库-->>系统: 返回结果
    系统-->>用户: 登录响应`},gantt:{title:"甘特图示例",code:`gantt
    title 项目计划
    dateFormat  YYYY-MM-DD
    section 设计
    需求分析    :done, des1, 2024-01-01, 2024-01-10
    系统设计    :active, des2, 2024-01-11, 2024-01-25
    section 开发
    编码实现    :des3, 2024-01-26, 2024-02-15
    测试调试    :des4, 2024-02-16, 2024-02-28`},class:{title:"类图示例",code:`classDiagram
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
    Animal <|-- Cat`},pie:{title:"饼图示例",code:`pie title 浏览器市场份额
    "Chrome" : 65.5
    "Firefox" : 15.2
    "Safari" : 12.3
    "Edge" : 7.0`},state:{title:"状态图示例",code:`stateDiagram-v2
    [*] --> 待机
    待机 --> 运行 : 启动
    运行 --> 暂停 : 暂停
    暂停 --> 运行 : 恢复
    运行 --> 待机 : 停止
    暂停 --> 待机 : 停止`}}},o={appTitle:n,appSubtitle:e,tabs:a,labels:t,examples:i,markdownExample:r,reactExample:c};export{e as appSubtitle,n as appTitle,o as default,i as examples,t as labels,r as markdownExample,c as reactExample,a as tabs};
