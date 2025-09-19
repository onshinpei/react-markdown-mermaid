import React, { useEffect, useMemo, useRef, useState } from 'react';
import MermaidService from './mermaidService';
import { MermaidProps } from './types';

// 获取 mermaid 服务实例
const mermaidService = MermaidService.getInstance();

const MermaidBlock: React.FC<MermaidProps> = ({
  code,
  mermaidConfig,
  id,
  className,
  style,
  onLoad,
  onError,
  onRender,
  showLoading = true,
  loadingText = 'Loading diagram...',
  errorText = 'Failed to render diagram',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 生成唯一ID
  const chartId = useMemo(() => id || `mermaid-${Math.random().toString(36).substr(2, 9)}`, [id]);

  useEffect(() => {
    const initMermaid = async () => {
      try {
        await mermaidService.initialize({ startOnLoad: false, ...mermaidConfig });
        onLoad?.();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to initialize mermaid');
        console.error('Failed to initialize mermaid:', err);
        setError(error.message);
        onError?.(error);
      }
    };

    initMermaid();
  }, [mermaidConfig, onLoad, onError]);

  useEffect(() => {
    const renderChart = async () => {
      if (!code.trim()) {
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const { svg } = await mermaidService.render(chartId, code);
        setSvg(svg);
        setIsLoading(false);
        onRender?.();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to render mermaid chart';
        const error = err instanceof Error ? err : new Error(errorMessage);
        setError(errorMessage);
        setIsLoading(false);
        console.error('Mermaid render error:', err);
        onError?.(error);
      }
    };

    // 延迟渲染，确保mermaid已初始化
    renderChart();
  }, [code, chartId, onRender, onError]);

  // 加载状态
  if (isLoading && showLoading) {
    return (
      <div className={`react-markdown-mermaid ${className} loading`} style={style}>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <span>{loadingText}</span>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className={`react-markdown-mermaid ${className} error`} style={style}>
        <div className="error-message">
          <span>{errorText}</span>
          <details>{error}</details>
        </div>
      </div>
    );
  }

  // 正常渲染
  return (
    <div className={`react-markdown-mermaid ${className}`} style={style}>
      <div ref={containerRef} id={chartId} dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
};

export default MermaidBlock;
