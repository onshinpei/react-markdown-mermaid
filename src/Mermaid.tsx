import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { MermaidProps, MermaidState } from './types';

const Mermaid: React.FC<MermaidProps> = ({
  chart,
  config,
  id,
  className = 'react-mermaid',
  style,
  onLoad,
  onError,
  onRender,
  showLoading = true,
  loadingText = 'Loading diagram...',
  errorText = 'Failed to render diagram',
  ssr = false,
}) => {
  const [state, setState] = useState<MermaidState>({
    isLoading: true,
    hasError: false,
  });

  const [svg, setSvg] = useState<string>('');

  // 生成唯一ID
  const chartId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    // 初始化mermaid
    const initMermaid = async () => {
      try {
        if (config) {
          mermaid.initialize(config);
        } else {
          mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
          });
        }
        setState((prev) => ({ ...prev, isLoading: false }));
        onLoad?.();
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Failed to initialize mermaid');
        setState({ isLoading: false, hasError: true, error: err });
        onError?.(err);
      }
    };

    if (!ssr) {
      initMermaid();
    }
  }, []);

  useEffect(() => {
    const renderChart = async () => {
      if (!chart.trim() || state.isLoading) {
        return;
      }

      try {
        setState((prev) => ({ ...prev, isLoading: true, hasError: false }));

        // 渲染图表
        const { svg } = await mermaid.render(chartId, chart);

        setSvg(svg);
        console.log('svg', svg);
        setState({ isLoading: false, hasError: false });
        // onRender?.();
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Failed to render mermaid chart');
        setState({ isLoading: false, hasError: true, error: err });
        // onError?.(err);

        setSvg('');
      }
    };

    // 延迟渲染，确保mermaid已初始化
    const timer = setTimeout(() => {
      renderChart();
    }, 0);

    return () => clearTimeout(timer);
  }, [state.isLoading]);

  // 服务端渲染
  // if (ssr) {
  //   return <div id={chartId} className={className} style={style} data-mermaid-chart={chart} />;
  // }

  // 加载状态
  // if (state.isLoading && showLoading) {
  //   return (
  //     <div className={`${className} loading`} style={style}>
  //       <div className="loading-spinner">
  //         <div className="spinner"></div>
  //         <span>{loadingText}</span>
  //       </div>
  //     </div>
  //   );
  // }

  // // 错误状态
  // if (state.hasError) {
  //   return (
  //     <div className={`${className} error`} style={style}>
  //       <div className="error-message">
  //         <span>{errorText}</span>
  //         {state.error && <details>{state.error.message}</details>}
  //       </div>
  //     </div>
  //   );
  // }

  // 正常渲染
  return (
    <div className={className} style={style}>
      <div id={chartId} dangerouslySetInnerHTML={{ __html: svg }} />
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
};

export default Mermaid;
