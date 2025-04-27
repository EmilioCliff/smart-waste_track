import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	base: '/',
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		host: true,
		strictPort: true,
		port: 3000,
		origin: 'http://0.0.0.0:3000',
	},
	preview: {
		// host: true,
		strictPort: true,
		port: 3000,
	},
});
