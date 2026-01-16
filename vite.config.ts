import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: '/kneel/',  // GitHub Pages base path
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['icons/*.png', 'assets/*.png'],
            manifest: {
                name: 'Kneel',
                short_name: 'Kneel',
                description: 'Private tracking between confessions',
                theme_color: '#00a884',
                background_color: '#1a1a1a',
                display: 'standalone',
                icons: [
                    {
                        src: 'icons/icon-192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
    ]
});
