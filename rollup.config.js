const postcss = require('rollup-plugin-postcss');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const svg = require('rollup-plugin-svg');
const copy = require('rollup-plugin-copy');
const image = require('@rollup/plugin-image');

module.exports = {
  input: 'src/index.tsx',
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    peerDepsExternal(),
    resolve(),
    typescript(),
    commonjs(),
    postcss({ modules: false }),
    image(),
    copy({
      targets: [
        { src: 'src/assets/**/*', dest: 'dist/assets' },
      ],
    }),
  ],
};