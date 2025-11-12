import React, { useEffect, useMemo, useState } from 'react';
import { MermaidBlock } from '../src/index';

type ExampleItem = {
  title: string;
  description: string;
  code: string;
};

type I18nData = {
  appTitle: string;
  appSubtitle: string;
  tabs: { markdown: string; react: string };
  labels: {
    viewMermaidCode: string;
    useMermaidBlock: string;
    github: string;
    mermaidDocs: string;
    markdownExampleTitle: string;
    markdownExampleDescription: string;
    reactExampleTitle: string;
    reactExampleDescription: string;
  };
  examples: Record<string, ExampleItem>;
};
import MarkdownExample from './MarkdownExample';
import ReactExample from './ReactExample';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('markdown');
  const [lang, setLang] = useState<'zh' | 'en'>('en');
  const [i18n, setI18n] = useState<I18nData | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const mod = await (lang === 'zh' ? import('./data/zh.json') : import('./data/en.json'));
        if (!cancelled) {
          setI18n((mod as { default?: I18nData }).default ?? (mod as unknown as I18nData));
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to load i18n json', e);
        if (!cancelled) setI18n(null);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const examples = useMemo<Record<string, ExampleItem>>(() => {
    return (i18n?.examples as Record<string, ExampleItem>) ?? {};
  }, [i18n]);

  // 空

  return (
    <div className="app">
      <header className="app-header">
        <h1>{i18n?.appTitle ?? 'react-markdown-mermaid'}</h1>
        <p>{i18n?.appSubtitle ?? ''}</p>
        <div style={{ marginTop: 8 }}>
          <button className={`tab ${lang === 'zh' ? 'active' : ''}`} onClick={() => setLang('zh')}>
            中文
          </button>
          <button className={`tab ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')} style={{ marginLeft: 8 }}>
            English
          </button>
        </div>
      </header>

      <nav className="tabs">
        <button className={`tab ${activeTab === 'markdown' ? 'active' : ''}`} onClick={() => setActiveTab('markdown')}>
          {i18n?.tabs?.markdown ?? 'React-Markdown'}
        </button>
        <button className={`tab ${activeTab === 'react' ? 'active' : ''}`} onClick={() => setActiveTab('react')}>
          {i18n?.tabs?.react ?? '单独使用示例'}
        </button>
      </nav>

      <main className="content">
        {activeTab === 'markdown' && (
          <div className="example active">
            <h2>{i18n?.labels?.markdownExampleTitle ?? 'React-Markdown + rehypeMermaid Example'}</h2>
            <p>{i18n?.labels?.markdownExampleDescription ?? ''}</p>

            <MarkdownExample lang={lang} />
          </div>
        )}

        {activeTab === 'react' && (
          <div className="example active">
            <h2>{i18n?.labels?.reactExampleTitle ?? '单独使用 MermaidBlock 示例'}</h2>
            <p>{i18n?.labels?.reactExampleDescription ?? '这个示例展示了如何直接使用 MermaidBlock 组件来渲染 Mermaid 图表，无需 react-markdown。'}</p>

            <ReactExample lang={lang} />
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
                <summary>{i18n?.labels?.viewMermaidCode ?? 'View Mermaid Code'}</summary>
                <pre className="code-block">
                  <code>{example.code}</code>
                </pre>
              </details>

              <details className="code-details">
                <summary>{i18n?.labels?.useMermaidBlock ?? 'Use MermaidBlock directly'}</summary>
                <pre className="code-block">
                  <code>{`import { MermaidBlock } from 'react-markdown-mermaid';

// 基本用法
<MermaidBlock code="${example.code.replace(/\n/g, '\\n')}" />

// 自定义配置
<MermaidBlock 
  code="${example.code.replace(/\n/g, '\\n')}"
  mermaidConfig={{
    theme: 'dark',
    startOnLoad: false,
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
          <a href="https://github.com/onshinpei/react-markdown-mermaid" target="_blank" rel="noopener noreferrer">
            {i18n?.labels?.github ?? 'GitHub'}
          </a>
          {' | '}
          <a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer">
            {i18n?.labels?.mermaidDocs ?? 'Mermaid Docs'}
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
