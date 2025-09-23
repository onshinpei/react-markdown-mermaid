const e="react-markdown-mermaid Demo",n="A lightweight component and rehype plugin to render Mermaid diagrams in React",t={markdown:"React-Markdown Example",react:"Standalone Usage Example"},a={viewMermaidCode:"View Mermaid Code",useMermaidBlock:"Use MermaidBlock directly",github:"GitHub",mermaidDocs:"Mermaid Docs",markdownExampleTitle:"React-Markdown + rehypeMermaid Example",markdownExampleDescription:"This example demonstrates how to use the rehypeMermaid plugin in react-markdown to render Mermaid diagrams.",reactExampleTitle:"Standalone MermaidBlock Usage Example",reactExampleDescription:"This example demonstrates how to use the MermaidBlock component directly to render Mermaid diagrams without react-markdown.",codeExample:"Code Example",renderEffect:"Render Effect",mermaidCode:"Mermaid Code",reactUsageCode:"React Usage Code"},i={flowchart:{title:"Flowchart",description:"Basic flowchart with conditional branching and multiple steps.",code:`
    graph TD
      A[Start] --> B{Condition?}
      B -->|Yes| C[Handle A]
      B -->|No| D[Handle B]
      C --> E[End]
      D --> E
  `},sequence:{title:"Sequence Diagram",description:"Login interaction between multiple participants.",code:`
    sequenceDiagram
      participant User
      participant System
      participant DB
      User->>System: Login request
      System->>DB: Verify user
      DB-->>System: Result
      System-->>User: Response
  `},gantt:{title:"Gantt Chart",description:"Project timeline across phases and progress.",code:`
    gantt
      title Project Plan
      dateFormat  YYYY-MM-DD
      section Design
      Requirements   :done, des1, 2024-01-01, 2024-01-10
      System Design  :active, des2, 2024-01-11, 2024-01-25
      section Dev
      Implementation  :des3, 2024-01-26, 2024-02-15
      Testing & Fixes :des4, 2024-02-16, 2024-02-28
  `},class:{title:"Class Diagram",description:"OOP class structure with inheritance.",code:`
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
  `},pie:{title:"Pie Chart",description:"Data distribution by percentage.",code:`
    pie title Browser market share
      "Chrome" : 65.5
      "Firefox" : 15.2
      "Safari" : 12.3
      "Edge" : 7.0
  `},state:{title:"State Diagram",description:"System state transitions with triggers.",code:`
    stateDiagram-v2
      [*] --> Idle
      Idle --> Running : Start
      Running --> Paused : Pause
      Paused --> Running : Resume
      Running --> Idle : Stop
      Paused --> Idle : Stop
  `}},s={title:"React Mermaid + React-Markdown Example",description:"This is a complete example using react-markdown and rehypeMermaid plugin.",sections:{flowchart:{title:"Flowchart Example",code:`graph TD
    A[Start] --> B{Condition?}
    B -->|Yes| C[Handle A]
    B -->|No| D[Handle B]
    C --> E[End]
    D --> E`},sequence:{title:"Sequence Diagram Example",code:`sequenceDiagram
    participant User
    participant System
    participant Database
    
    User->>System: Login request
    System->>Database: Verify user
    Database-->>System: Return result
    System-->>User: Login response`},gantt:{title:"Gantt Chart Example",code:`gantt
    title Project Plan
    dateFormat  YYYY-MM-DD
    section Design
    Requirements   :done, des1, 2024-01-01, 2024-01-10
    System Design  :active, des2, 2024-01-11, 2024-01-25
    section Development
    Implementation  :des3, 2024-01-26, 2024-02-15
    Testing & Debug :des4, 2024-02-16, 2024-02-28`},class:{title:"Class Diagram Example",code:`classDiagram
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
    Animal <|-- Cat`},pie:{title:"Pie Chart Example",code:`pie title Browser market share
    "Chrome" : 65.5
    "Firefox" : 15.2
    "Safari" : 12.3
    "Edge" : 7.0`},state:{title:"State Diagram Example",code:`stateDiagram-v2
    [*] --> Idle
    Idle --> Running : Start
    Running --> Paused : Pause
    Paused --> Running : Resume
    Running --> Idle : Stop
    Paused --> Idle : Stop`},code:{title:"Code Example",description:"Here is a regular code block:",code:`function hello() {
  console.log('Hello, World!');
}`},list:{title:"List Example",items:["Item 1","Item 2","Sub-item 2.1","Sub-item 2.2","Item 3"]},table:{title:"Table Example",headers:["Feature","Status","Description"],rows:[["Flowchart","✅","Supported"],["Sequence Diagram","✅","Supported"],["Gantt Chart","✅","Supported"],["Class Diagram","✅","Supported"],["Pie Chart","✅","Supported"],["State Diagram","✅","Supported"]]},summary:{title:"Summary",content:"This example demonstrates how to use the rehypeMermaid plugin in react-markdown to render Mermaid diagrams. The plugin automatically recognizes ```mermaid code blocks in markdown and converts them to MermaidBlock components."}}},r={title:"Standalone MermaidBlock Usage Example",description:"This example demonstrates how to use the MermaidBlock component directly to render Mermaid diagrams without react-markdown.",sections:{flowchart:{title:"Flowchart Example",code:`graph TD
    A[Start] --> B{Condition?}
    B -->|Yes| C[Handle A]
    B -->|No| D[Handle B]
    C --> E[End]
    D --> E`},sequence:{title:"Sequence Diagram Example",code:`sequenceDiagram
    participant User
    participant System
    participant Database
    
    User->>System: Login request
    System->>Database: Verify user
    Database-->>System: Return result
    System-->>User: Login response`},gantt:{title:"Gantt Chart Example",code:`gantt
    title Project Plan
    dateFormat  YYYY-MM-DD
    section Design
    Requirements   :done, des1, 2024-01-01, 2024-01-10
    System Design  :active, des2, 2024-01-11, 2024-01-25
    section Development
    Implementation  :des3, 2024-01-26, 2024-02-15
    Testing & Debug :des4, 2024-02-16, 2024-02-28`},class:{title:"Class Diagram Example",code:`classDiagram
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
    Animal <|-- Cat`},pie:{title:"Pie Chart Example",code:`pie title Browser market share
    "Chrome" : 65.5
    "Firefox" : 15.2
    "Safari" : 12.3
    "Edge" : 7.0`},state:{title:"State Diagram Example",code:`stateDiagram-v2
    [*] --> Idle
    Idle --> Running : Start
    Running --> Paused : Pause
    Paused --> Running : Resume
    Running --> Idle : Stop
    Paused --> Idle : Stop`}}},o={appTitle:e,appSubtitle:n,tabs:t,labels:a,examples:i,markdownExample:s,reactExample:r};export{n as appSubtitle,e as appTitle,o as default,i as examples,a as labels,s as markdownExample,r as reactExample,t as tabs};
