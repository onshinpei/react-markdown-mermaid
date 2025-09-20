import React, { useEffect, useMemo, useRef, useState } from 'react';
import MermaidService from './mermaidService';
import { MermaidProps } from './types';
import { MermaidConfig } from 'mermaid';
import { getMermaidId, parseSvgToJsx } from './utils';

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
  const [svgElement, setSvgElement] = useState<React.ReactElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // 去除useEffect依赖，避免重复初始化
  const mermaidConfigRef = useRef(mermaidConfig);
  mermaidConfigRef.current = mermaidConfig;
  const svgIdRef = useRef('');

  // 生成唯一ID
  const chartId = useMemo(() => id || `mermaid-${Math.random().toString(36).substr(2, 9)}`, [id]);

  useEffect(() => {
    const initMermaid = async () => {
      try {
        await mermaidService.initialize({ startOnLoad: false, ...mermaidConfigRef.current } as MermaidConfig);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to initialize mermaid');
        console.error('Failed to initialize mermaid:', err);
        setError(error.message);
      }
    };

    initMermaid();
  }, [mermaidConfig, onLoad, onError]);

  useEffect(() => {
    const renderChart = async () => {
      // 生成唯一ID
      const viewID = getMermaidId();

      try {
        setIsLoading(true);
        await mermaidService.parse(code);
        const { svg } = await mermaidService.render(viewID, code);
        const svgElement = parseSvgToJsx(svg);
        if (!svgElement) {
          return;
        }
        setSvgElement(svgElement);
        svgIdRef.current = `#${viewID}`;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to render mermaid chart';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
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
      <div ref={containerRef} id={chartId}>
        {svgElement}
      </div>
    </div>
  );
};

export default MermaidBlock;
