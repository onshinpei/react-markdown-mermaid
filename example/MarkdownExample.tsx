import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { rehypeMermaid, MermaidBlock } from '../src/index';

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

type MarkdownExampleProps = {
  lang: 'zh' | 'en';
};

const MarkdownExample: React.FC<MarkdownExampleProps> = ({ lang }) => {
  const [data, setData] = useState<MarkdownExampleData | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const mod = await (lang === 'zh' ? import('./data/zh.json') : import('./data/en.json'));
        if (!cancelled) {
          setData((mod as { default?: { markdownExample: MarkdownExampleData } }).default?.markdownExample ?? (mod as unknown as { markdownExample: MarkdownExampleData }).markdownExample);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to load markdown example data', e);
        if (!cancelled) setData(null);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const markdownContent = useMemo(() => {
    if (!data) return '';

    const { title, description, sections } = data;

    const mermaidSections = [
      { key: 'flowchart', section: sections.flowchart },
      { key: 'sequence', section: sections.sequence },
      { key: 'gantt', section: sections.gantt },
      { key: 'class', section: sections.class },
      { key: 'pie', section: sections.pie },
      { key: 'state', section: sections.state },
    ];

    const mermaidMarkdown = mermaidSections.map(({ section }) => `## ${section.title}\n\n\`\`\`mermaid\n${section.code}\n\`\`\``).join('\n\n');

    const listMarkdown = `## ${sections.list.title}\n\n${sections.list.items.map((item) => `- ${item}`).join('\n')}`;

    const tableMarkdown = `## ${sections.table.title}\n\n| ${sections.table.headers.join(' | ')} |\n|${sections.table.headers.map(() => '------').join('|')}|\n${sections.table.rows.map((row) => `| ${row.join(' | ')} |`).join('\n')}`;

    return `# ${title}\n\n${description}\n\n${mermaidMarkdown}\n\n## ${sections.code.title}\n\n${sections.code.description}\n\n\`\`\`javascript\n${sections.code.code}\n\`\`\`\n\n${listMarkdown}\n\n${tableMarkdown}\n\n## ${sections.summary.title}\n\n${sections.summary.content}`;
  }, [data]);

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

  const components = {
    MermaidBlock: MermaidBlock,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  return (
    <div className="markdown-example">
      <div className="markdown-container">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[[rehypeMermaid, { mermaidConfig, ssr: false }]]} components={components}>
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownExample;
