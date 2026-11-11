import { fileURLToPath, URL } from 'node:url'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { defineConfig, type Plugin, type ResolvedConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader';

/**
 * GitHub Pages has no SPA fallback: it serves 404.html for unknown paths. Copying the app's
 * index.html there lets Vue Router handle reloads and direct links like /projects/<slug>.
 */
function githubPagesSpaFallback(): Plugin {
  let outDir = ''
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    configResolved(config: ResolvedConfig) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/paginaProyectos/',
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    svgLoader(),
    githubPagesSpaFallback(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
