import path from 'path'
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

const root = path.resolve(__dirname, '')
const outDir = path.resolve(__dirname, 'build')

export default defineConfig({
	root,
	build: {
		target: 'es2017', // какой версии JS придерживается сборка
		outDir, // в какую папку будет собираться проект
		rollupOptions: {
			input: {
				main: './index.html'
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
			'@common': path.resolve(__dirname, 'src/components/common.components/common/'),
			'@': path.resolve(__dirname, 'src')
		}
	},
	plugins: [
		// ViteAliases(),
		legacy({ targets: ['defaults', 'not IE 11'] })
	]
})
