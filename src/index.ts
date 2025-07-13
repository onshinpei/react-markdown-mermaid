// 导出独立的Mermaid组件
export { default as Mermaid } from './Mermaid';
export type { MermaidProps, MermaidState } from './types';

// 导出MermaidBlock组件
export { default as MermaidBlock } from './MermaidBlock';

// 导出rehype插件（可选使用）
export { default as rehypeMermaid } from './rehypeMermaid';
export type { RehypeMermaidOptions } from './rehypeMermaid';

// 导出mermaid实例，方便用户直接使用
export { default as mermaid } from 'mermaid';
