import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: './',
    build: {
        rolldownOptions: {
        output: {
            codeSplitting: {
            groups: [
                {
                name: 'react-vendor',
                test: /node_modules[\\/](react|react-dom|scheduler)/,
                priority: 20,
                },
                {
                name: 'ui-vendor', 
                test: /node_modules[\\/](@mui|@emotion|@babel)/,
                priority: 15,
                },
                {
                name: 'vendor',
                test: /node_modules/,
                priority: 10,
                },
            ],
            },
        },
        },
    },
})
