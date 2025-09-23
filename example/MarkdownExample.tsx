import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { rehypeMermaid, MermaidBlock } from '../src/index';
import hljs from 'highlight.js';

type MarkdownExampleData = {
  title: string;
  description: string;
  sections: {
    flowchart: { title: string; code: string };
    sequence: { title: string; code: string };
    gantt: { title: string; code: string };
    class: { title: string; code: string };
    pie: { title: string; code: string };
    state: { title: string; code: string };
    code: { title: string; description: string; code: string };
    list: { title: string; items: string[] };
    table: { title: string; headers: string[]; rows: string[][] };
    summary: { title: string; content: string };
  };
};

type LabelsData = {
  codeExample: string;
  renderEffect: string;
  mermaidCode: string;
  reactUsageCode: string;
};

type MarkdownExampleProps = {
  lang: 'zh' | 'en';
};

const MarkdownExample: React.FC<MarkdownExampleProps> = ({ lang }) => {
  const [data, setData] = useState<MarkdownExampleData | null>(null);
  const [labels, setLabels] = useState<LabelsData | null>(null);
  const [selectedExample, setSelectedExample] = useState<string>('flowchart');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const mod = await (lang === 'zh' ? import('./data/zh.json') : import('./data/en.json'));
        if (!cancelled) {
          const data = (mod as { default?: { markdownExample: MarkdownExampleData; labels: LabelsData } }).default ?? (mod as unknown as { markdownExample: MarkdownExampleData; labels: LabelsData });
          setData(data.markdownExample);
          setLabels(data.labels);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to load markdown example data', e);
        if (!cancelled) {
          setData(null);
          setLabels(null);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  // 配置mermaid
  const mermaidConfig = {
    theme: 'default',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
    },
    sequence: {
      useMaxWidth: true,
      diagramMarginX: 50,
      diagramMarginY: 10,
    },
    gantt: {
      useMaxWidth: true,
    },
  };

  const examples = useMemo(() => {
    if (!data) return [];

    return [
      { key: 'flowchart', section: data.sections.flowchart },
      { key: 'sequence', section: data.sections.sequence },
      { key: 'gantt', section: data.sections.gantt },
      { key: 'class', section: data.sections.class },
      { key: 'pie', section: data.sections.pie },
      { key: 'state', section: data.sections.state },
    ];
  }, [data]);

  const currentExample = examples.find((ex) => ex.key === selectedExample);

  const renderCodeBlock = (code: string, language: string = 'mermaid') => {
    const html = (() => {
      try {
        if (language) {
          return hljs.highlight(code, { language }).value;
        }
      } catch {
        // ignore and fallback
      }
      return hljs.highlightAuto(code).value;
    })();
    return (
      <pre className="code-block hljs">
        <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    );
  };

  const renderReactCode = (example: { key: string; section: { title: string; code: string } }) => {
    if (!labels) return null;

    // 生成更好的组件名称
    const getComponentName = (key: string, title: string) => {
      const nameMap: Record<string, string> = {
        flowchart: 'Flowchart',
        sequence: 'SequenceDiagram',
        gantt: 'GanttChart',
        class: 'ClassDiagram',
        pie: 'PieChart',
        state: 'StateDiagram',
      };
      return nameMap[key] || title.replace(/示例|图/g, '');
    };

    const componentName = getComponentName(example.key, example.section.title);

    const reactCode = `import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { rehypeMermaid } from 'react-markdown-mermaid';

const ${componentName}Example = () => {
  const mermaidConfig = {
    theme: 'default',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
    },
    sequence: {
      useMaxWidth: true,
      diagramMarginX: 50,
      diagramMarginY: 10,
    },
    gantt: {
      useMaxWidth: true,
    },
  };

  const markdownContent = \`# ${example.section.title}

\`\`\`mermaid
${example.section.code}
\`\`\`
\`;

  return (
    <div className="markdown-container">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[[rehypeMermaid, { mermaidConfig, ssr: false }]]}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default ${componentName}Example;`;

    return <div className="react-code-section">{renderCodeBlock(reactCode, 'javascript')}</div>;
  };

  const renderMermaidExample = (example: { key: string; section: { title: string; code: string } }) => {
    const markdownContent = `
\`\`\`mermaid
${example.section.code}
\`\`\`
`;

    const components = {
      MermaidBlock: MermaidBlock,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    return (
      <div className="mermaid-example">
        <div className="mermaid-container">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[[rehypeMermaid, { mermaidConfig, ssr: false }]]} components={components}>
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>
    );
  };

  if (!data || !labels) {
    return <div className="loading">加载中...</div>;
  }

  return (
    <div className="markdown-example-layout">
      <div className="example-content">
        {/* 左侧：代码区域 */}
        <div className="code-panel">
          <div className="panel-header">
            <div className="example-tabs">
              {examples.map((example) => (
                <button key={example.key} className={`tab ${selectedExample === example.key ? 'active' : ''}`} onClick={() => setSelectedExample(example.key)}>
                  {example.section.title}
                </button>
              ))}
            </div>
          </div>

          <div className="code-content">{currentExample && <>{renderReactCode(currentExample)}</>}</div>
        </div>

        {/* 右侧：效果图区域 */}
        <div className="preview-panel">
          <div className="panel-header">
            <h3>{labels.renderEffect}</h3>
          </div>

          <div className="preview-content">{currentExample && renderMermaidExample(currentExample)}</div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownExample;
