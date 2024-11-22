import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    base: '/EdgeCSS/',
    plugins: [react()],
    build: {
        outDir: 'build',
    },
})