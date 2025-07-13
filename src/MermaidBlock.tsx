import React, { useEffect, useMemo, useRef, useState } from 'react';
import MermaidService from './mermaidService';

export interface MermaidBlockProps {
  code: string;
  mermaidConfig?: any;
  ssr?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MermaidBlock: React.FC<MermaidBlockProps> = ({ code, ssr = false, className = 'mermaid-block', style }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 生成唯一ID
  const chartId = useMemo(() => `mermaid-${Math.random().toString(36).substr(2, 9)}`, []);

  // 获取 mermaid 服务实例
  const mermaidService = MermaidService.getInstance();

  useEffect(() => {
    const initMermaid = async () => {
      try {
        await mermaidService.initialize({startOnLoad: false});
      } catch (err) {
        console.error('Failed to initialize mermaid:', err);
      }
    };

    initMermaid();
  }, []);

  useEffect(() => {
    const renderChart = async () => {
      if (!code.trim() || ssr) {
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const { svg } = await mermaidService.render(chartId, code);
        setSvg(svg);
        setIsLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to render mermaid chart';
        setError(errorMessage);
        setIsLoading(false);
        console.error('Mermaid render error:', err);
      }
    };

    // 延迟渲染，确保mermaid已初始化
    renderChart();
  }, [code, chartId, ]);

  // 服务端渲染
  if (ssr) {
    return (
      <div className={className} style={style}>
        <pre className="language-mermaid">
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  // 加载状态
  if (isLoading) {
    return (
      <div className={`${className} loading`} style={style}>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <span>Loading diagram...</span>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className={`${className} error`} style={style}>
        <div className="error-message">
          <span>Failed to render diagram</span>
          <details>{error}</details>
        </div>
      </div>
    );
  }

  // 正常渲染
  return (
    <div className={className} style={style}>
      <div ref={containerRef} id={chartId} dangerouslySetInnerHTML={{ __html: svg }} />
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
};

export default MermaidBlock;
