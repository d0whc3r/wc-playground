import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import postcss from 'rollup-plugin-postcss';
// @ts-ignore
import cssnano from 'cssnano';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export const config: Config = {
  namespace: 'monaco-editor',
  plugins: [
    sass(),
    postcss({
      extensions: ['.css'],
      writeDefinitions: true,
      plugins: [
        cssnano({
          preset: [
            'default',
            {
              autoprefixer: { browsers: 'last 2 versions, IE 11', add: true },
              discardComments: false
            }
          ]
        })
      ]
    }),
    nodePolyfills()
  ],
  // commonjs: {
  //   namedExports: {
  //     'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement', 'Fragment'],
  //     'node_modules/react-dom/index.js': ['render']
  //   }
  // },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
