const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const { dts } = require('rollup-plugin-dts');

const packageJson = require('./package.json');

module.exports = [
  // 主包构建
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        compact: false,
        indent: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
        compact: false,
        indent: true,
      },
      {
        file: 'dist/index.min.js',
        format: 'umd',
        name: 'ReactMarkdownMermaid',
        sourcemap: true,
        exports: 'named',
        compact: false,
        indent: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          mermaid: 'mermaid',
          'unist-util-visit': 'unistUtilVisit',
        },
      },
    ],
    plugins: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs({
        include: 'node_modules/**',
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        declarationMap: false,
        emitDeclarationOnly: false,
      }),
      
    ],
    external: [
      'react', 
      'react-dom', 
      'mermaid', 
      'unified', 
      'unist-util-visit',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react/jsx-runtime.production.min',
      'react/jsx-runtime.development',
      'react/jsx-dev-runtime.production.min',
      'react/jsx-dev-runtime.development'
    ],
  },
  // 类型定义构建
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'es',
      },
      {
        file: 'dist/esm/index.d.ts',
        format: 'es',
      },
    ],
    plugins: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs({
        include: 'node_modules/**',
      }),
      dts({
        compilerOptions: {
          baseUrl: './',
          paths: {
            '*': ['node_modules/*', 'src/*'],
          },
        },
      }),
    ],
    external: [
      'react', 
      'react-dom', 
      'mermaid', 
      'unified', 
      'unist-util-visit',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react/jsx-runtime.production.min',
      'react/jsx-runtime.development',
      'react/jsx-dev-runtime.production.min',
      'react/jsx-dev-runtime.development'
    ],
  },
];
