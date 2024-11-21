import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import cleanup from 'rollup-plugin-cleanup';
import shebang from 'rollup-plugin-preserve-shebang';

const commonPlugins = [
  shebang(),
  json(),
  nodeResolve({ preferBuiltins: true }),
  commonjs(),
  cleanup(),
];

/** @type import('rollup').RollupOptions */
export default [
  {
    input: ['cli/index.ts'],
    output: {
      dir: 'bin',
      format: 'cjs',
    },
    plugins: [...commonPlugins, typescript({ tsconfig: './tsconfig.cli.json' })],
  },
  {
    input: ['cli/upload/index.ts'],
    output: {
      dir: 'upload',
      format: 'cjs',
    },
    plugins: [...commonPlugins, typescript({ tsconfig: './tsconfig.upload.json' })],
  },
];
