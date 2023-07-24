import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    svelte(),
    UnoCSS(),
  ],
})