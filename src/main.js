import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import './style.scss'

// Выводим приложение в #app и инициализируем другие параметры в Excel()
const excel = new Excel('#app', {
	components: [Header, Toolbar, Formula, Table]
})

excel.render()
