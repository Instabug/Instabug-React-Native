import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import shebang from 'rollup-plugin-preserve-shebang';

export default {
  input: ['bin/index.js'],
  output: {
    dir: 'bin',
    format: 'cjs',
  },
  plugins: [shebang(), nodeResolve({ preferBuiltins: true }), commonjs(), json()],
};
