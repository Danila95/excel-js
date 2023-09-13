import { $ } from '../../core/dom'

export function shouldResize(event) {
	return event.target.dataset.resize
}

export function isCell(event) {
	return event.target.dataset.type === 'cell'
}

export function nextSelector(key, { col, row }) {
	const MIN_VALUE = 0
	switch (key) {
		case 'Enter':
		case 'ArrowDown':
			row++
			break
		case 'Tab':
		case 'ArrowRight':
			col++
			break
		case 'ArrowLeft':
			col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
			break
		case 'ArrowUp':
			row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
			break
	}

	return `[data-id="${row}:${col}"]`
}

// // функция по выделению ячеек при помощи рамки выделения
// export function doSelection(x1, y1, x2, y2, selectedItems) {
// 	console.log('x1: ' + x1)
// 	console.log('y1: ' + y1)
// 	console.log('x2: ' + x2)
// 	console.log('y2: ' + y2)
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
// 	selectedItems = new Array()
// 	let excelTable = document.querySelectorAll('.cell')
// 	const cellsTable = Array.from(excelTable) // Преобразование псевдо-массива в настоящий массив и применение метода map()
// 	cellsTable.map(item => {
// 		if (item.offsetLeft >= x1 && item.offsetLeft <= x2 && item.offsetTop >= y1 && item.offsetTop <= y2) {
// 			selectedItems.push(item.dataset.id)
// 			item.classList.add('selected-group')
// 			console.log(selectedItems)
// 		} else {
// 			item.className = 'cell'
// 		}
// 	})
// }
