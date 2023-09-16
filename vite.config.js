import {resolve} from 'path'
import { defineConfig } from 'vite';
import handlebars from './vite-plugin-handlebars-precompile.js'

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        outDir: resolve(__dirname, 'dist')
    },
    server: {
        port: 3000,
        host: '0.0.0.0',
        hmr: true,
    },
    plugins: [handlebars()],
    resolve: {
        alias: {
            handlebars: "handlebars/runtime",
        }
    },
});
