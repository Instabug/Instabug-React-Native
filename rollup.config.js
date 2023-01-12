import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import cleanup from 'rollup-plugin-cleanup';
import shebang from 'rollup-plugin-preserve-shebang';

/** @type import('rollup').RollupOptions */
export default {
  input: ['cli/index.ts'],
  output: {
    dir: 'bin',
    format: 'cjs',
  },
  plugins: [
    typescript({ tsconfig: './tsconfig.cli.json' }),
    shebang(),
    json(),
    nodeResolve({ preferBuiltins: true }),
    commonjs(),
    cleanup(),
  ],
};
