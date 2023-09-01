import path from 'path'
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

const root = path.resolve(__dirname, 'src')
const outDir = path.resolve(__dirname, 'build')

export default defineConfig({
	root,
	publicDir: '../public',
	build: {
		target: 'es2017', // какой версии JS придерживается сборка
		outDir, // в какую папку будет собираться проект
		rollupOptions: {
			input: {
				main:path.resolve(__dirname, 'src/index.html'),
			}
		},
		assetsDir: '',
		assetsInlineLimit: 0
	},
	server: {
		port: 3000,
		host: '0.0.0.0',
		hmr: true // горячая перезагрузка
	},
	resolve: {
		extensions: ['.js', '.json', '.png', '.xml', '.csv'], // теперь в путях не надо писать расш. вызываемых файлов
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@core': path.resolve(__dirname, 'src/core')
		}
	},
	plugins: [
		legacy({ targets: ['defaults', 'not IE 11'] })
	]
})
