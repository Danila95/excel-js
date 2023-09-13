// Pure functions
export function capitalize(string) {
	if (typeof string !== 'string') {
		return ''
	}
	return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
	if (start > end) {
		;[end, start] = [start, end]
	}
	return new Array(end - start + 1).fill('').map((_, index) => start + index)
}

export function matrix($target, $current) {
	const target = $target.id(true)
	const current = $current.id(true)
	const cols = range(current.col, target.col)
	const rows = range(current.row, target.row)
	return cols.reduce((acc, col) => {
		rows.forEach(row => acc.push(`${row}:${col}`))
		return acc
	}, [])
}

export function coords(e) {
	let posx = 0
	let posy = 0
	if (e.pageX || e.pageY) {
		posx = e.pageX
		posy = e.pageY
	} else if (e.clientX || e.clientY) {
		posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
		posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
	}

	return new Array(posx, posy)
}
