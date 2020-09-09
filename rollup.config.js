import path from 'path'
import zlib from 'zlib'
import dotenv from 'dotenv'

import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import gzip from 'rollup-plugin-gzip'
import styles from 'rollup-plugin-styles'
import html, { makeHtmlAttributes } from '@rollup/plugin-html'
import analyzer from 'rollup-plugin-analyzer'
import vue from 'rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import compiler from '@ampproject/rollup-plugin-closure-compiler'
import sucrase from '@rollup/plugin-sucrase'

const extensions = ['.ts', '.mjs', '.js', '.vue', '.json']
const env = dotenv.config({ path: path.join(__dirname, '.env') })
const prod = process.env.NODE_ENV === 'production'
const watch = Boolean(process.env.ROLLUP_WATCH) || Boolean(process.env.LIVERELOAD)

const addVersion = fileName => {
  const ver = prod ? env.parsed.VUE_APP_VERSION_NUMBER : new Date().getTime()
  const { dir, ext, base } = path.parse(fileName)
  if (ext === '.html') return fileName
  const filename = base + `?v=${ver}`
  return dir ? `${dir}/${filename}` : filename
}

const template = ({ attributes, files, meta, publicPath, title }) => {
  publicPath = publicPath.startsWith('/') ? publicPath.slice(1) : publicPath

  const scripts = (files.js || [])
    .map(({ fileName }) => {
      const file = addVersion(fileName)
      const attrs = makeHtmlAttributes(attributes.script)
      return `<script src="${publicPath}${file}"${attrs}></script>`
    })
    .join('\n')

  const links = (files.css || [])
    .map(({ fileName }) => {
      const file = addVersion(fileName)
      const attrs = makeHtmlAttributes(attributes.link)
      return `<link href="${publicPath}${file}" rel="stylesheet"${attrs}>`
    })
    .join('\n')

  const metas = meta
    .map(input => {
      const attrs = makeHtmlAttributes(input)
      return `<meta${attrs}>`
    })
    .join('\n')

  return `
<!doctype html>
<html${makeHtmlAttributes(attributes.html)}>
  <head>
    ${metas}
    <title>${title}</title>
    ${links}
  </head>
  <body>
    <div id="app"></div>
    ${scripts}
  </body>
</html>`
}

const config = [
  // Bundle
  {
    input: 'src/main.ts',

    output: [
      {
        format: 'iife',
        file: `dist/app.js`,
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name][extname]`,
      },
    ],

    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.VUE_APP_VERSION_NUMBER': JSON.stringify(env.parsed.VUE_APP_VERSION_NUMBER),
        __VUE_OPTIONS_API__: false,
        __VUE_PROD_DEVTOOLS__: false,
      }),

      json(),

      alias({ entries: { vue: '@vue/runtime-dom' } }),
      resolve({ dedupe: ['vue', '@vue/runtime-dom', 'vuex'], preferBuiltins: true, extensions }),
      commonjs(),

      // prod && vue3uiPurge(),
      vue({ preprocessStyles: false }),

      styles({
        mode: prod ? 'extract' : 'inject',
        url: { hash: `[name][extname]`, publicPath: env.parsed.BASE_URL, inline: true },
        minimize: prod && { preset: ['default', { discardComments: { removeAll: true } }] },
      }),

      // prod && tsickle(),
      prod && typescript(),
      prod && babel({ babelHelpers: 'bundled', extensions, babelrc: true }),
      !prod && sucrase({ exclude: ['**/node_modules/**'], transforms: ['typescript'] }),

      prod &&
        compiler({
          warning_level: 'verbose',
          language_in: 'ECMASCRIPT_NEXT',
          language_out: 'ECMASCRIPT_2018',
        }),

      prod &&
        gzip({
          fileName: '.br',
          customCompression: content =>
            zlib.brotliCompressSync(Buffer.from(content), {
              params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 },
            }),
        }),

      html({ publicPath: env.parsed.BASE_URL, template }),
      watch &&
        serve({ host: '0.0.0.0', contentBase: 'dist', historyApiFallback: true, port: 5000 }),
      watch && livereload({ watch: 'dist' }),

      prod && analyzer(),
    ],
  },
]

export default config
