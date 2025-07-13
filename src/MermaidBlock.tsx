import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

export interface MermaidBlockProps {
  code: string;
  mermaidConfig?: any;
  ssr?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MermaidBlock: React.FC<MermaidBlockProps> = ({ code, mermaidConfig, ssr = false, className = 'mermaid-block', style }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 生成唯一ID
  const chartId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    const initMermaid = async () => {
      try {
        if (mermaidConfig) {
          mermaid.initialize(mermaidConfig);
        } else {
          mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
          });
        }
      } catch (err) {
        console.error('Failed to initialize mermaid:', err);
      }
    };

    if (!ssr) {
      initMermaid();
    }
  }, [mermaidConfig, ssr]);

  useEffect(() => {
    const renderChart = async () => {
      if (!code.trim() || ssr) {
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const { svg } = await mermaid.render(chartId, code);
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
    const timer = setTimeout(() => {
      renderChart();
    }, 100);

    return () => clearTimeout(timer);
  }, [code, chartId, ssr]);

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
