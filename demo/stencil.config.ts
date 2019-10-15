import { Config } from '@stencil/core';
import postcss from 'rollup-plugin-postcss';
import { sass } from '@stencil/sass';
// @ts-ignore
import cssnano from 'cssnano';
import nodePolyfills from 'rollup-plugin-node-polyfills';

// https://stenciljs.com/docs/config

export const config: Config = {
  namespace: 'live-editor',

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
  devServer: {
    port: 3334
  },
  globalStyle: 'src/global/app.scss',
  globalScript: 'src/global/app.ts',
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
