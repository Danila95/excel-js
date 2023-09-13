import { $ } from '../../core/dom'
import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@/components/table/table.template'
import { resizeHandler } from '@/components/table/table.resize'
import { shouldResize } from '@/components/table/table.functions'
// import { doSelection } from '@/components/table/table.functions'
import { TableSelection } from './TableSelection'
import { isCell, nextSelector } from './table.functions'
import { coords, matrix } from '../../core/utils'

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options
		})
		// this.msx = 0
		// this.msy = 0
		// this.msdown = false
		// this.selectedItems = new Array()
	}

	toHTML() {
		return createTable(34)
	}

	prepare() {
		this.selection = new TableSelection()
	}

	init() {
		super.init()

		this.selectCell(this.$root.find('[data-id="0:0"]'))

		this.$on('formula:input', text => {
			this.selection.current.text(text)
		})

		this.$on('formula:done', text => {
			this.selection.current.focus()
		})
	}

	selectCell($cell) {
		this.selection.select($cell)
		this.$emit('table:select', $cell)
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			resizeHandler(this.$root, event)
		} else if (isCell(event)) {
			const $target = $(event.target)
			if (event.shiftKey) {
				const $cells = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id='${id}']`))
				this.selection.selectGroup($cells)
			} else {
				this.selection.select($target)
			}
		}

		// this.msdown = true
		// const mousexy = coords(event)
		// this.msx = mousexy[0]
		// this.msy = mousexy[1]
	}

	onKeydown(event) {
		const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']

		const { key } = event

		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault()
			const id = this.selection.current.id(true)
			const $next = this.$root.find(nextSelector(key, id))
			this.selectCell($next)
		}
	}

	onInput(event) {
		this.$emit('table:input', $(event.target))
	}

	// onMousemove(event) {
	// 	let x1 = 0
	// 	let x2 = 0
	// 	let y1 = 0
	// 	let y2 = 0
	// 	let mousexy = coords(event)
	// 	x1 = this.msx
	// 	y1 = this.msy
	// 	x2 = mousexy[0]
	// 	y2 = mousexy[1]
	// 	if (x1 == x2) {
	// 		return
	// 	}
	// 	if (y1 == y2) {
	// 		return
	// 	}
	// 	if (x1 > x2) {
	// 		x1 = x1 + x2
	// 		x2 = x1 - x2
	// 		x1 = x1 - x2
	// 	}
	// 	if (y1 > y2) {
	// 		y1 = y1 + y2
	// 		y2 = y1 - y2
	// 		y1 = y1 - y2
	// 	}
	// 	let sframe = document.getElementById('selectFrame')
	// 	sframe.style.top = `${y1}px`
	// 	sframe.style.left = `${x1}px`
	// 	sframe.style.width = `${x2 - x1}px`
	// 	sframe.style.height = `${y2 - y1}px`
	// 	sframe.style.visibility = this.msdown ? 'visible' : 'hidden'
	// }

	// onMouseup(event) {
	// 	const mousexy = coords(event)
	// 	// console.log(mousexy)
	// 	this.msdown = false
	// 	doSelection(this.msx, this.msy, mousexy[0], mousexy[1], this.selectedItems)
	// 	document.getElementById('selectFrame').style.visibility = this.msdown ? 'visible' : 'hidden'
	// }
}
