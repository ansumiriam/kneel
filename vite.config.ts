import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/kneel/',
    plugins: [
        preact(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            includeAssets: ['icons/*.jpg', 'assets/*.{woff2,svg}'],
            manifest: {
                id: '/kneel/',
                name: 'Kneel',
                short_name: 'Kneel',
                description: 'Private tracking between confessions',
                theme_color: '#1a1b1e',
                background_color: '#1a1b1e',
                display: 'standalone',
                orientation: 'portrait',
                start_url: '/kneel/',
                scope: '/kneel/',
                icons: [
                    {
                        src: 'icons/icon-192.jpg',
                        sizes: '192x192',
                        type: 'image/jpeg',
                        purpose: 'any'
                    },
                    {
                        src: 'icons/icon-192.jpg',
                        sizes: '192x192',
                        type: 'image/jpeg',
                        purpose: 'maskable'
                    },
                    {
                        src: 'icons/icon-512.jpg',
                        sizes: '512x512',
                        type: 'image/jpeg',
                        purpose: 'any'
                    },
                    {
                        src: 'icons/icon-512.jpg',
                        sizes: '512x512',
                        type: 'image/jpeg',
                        purpose: 'maskable'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
                navigateFallback: '/kneel/index.html',
                cleanupOutdatedCaches: true,
            }
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'react': 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat',
            'react/jsx-runtime': 'preact/jsx-runtime'
        },
    },
});
