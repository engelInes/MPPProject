import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import {configDefaults} from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.ts'],
        pool: 'forks',
        exclude: [...configDefaults.exclude, './src/types/**'],
    },
});
