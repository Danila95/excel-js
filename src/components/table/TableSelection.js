export class TableSelection {
	static className = 'selected'
	static classNameGroup = 'selected-group'

	constructor() {
		this.group = []
		this.current = null
	}

	// $el instanceof DOM === true
	select($el) {
		this.clear()
		$el.focus().addClass(TableSelection.className)
		this.group.push($el)
		this.current = $el
	}

	clear() {
		this.group.forEach($el => $el.removeClass(TableSelection.className))
		this.group.forEach($el => $el.removeClass(TableSelection.classNameGroup))
		this.group = []
	}

	selectGroup($group = []) {
		this.clear()

		this.group = $group
		// this.group[0].addClass(TableSelection.className) // TODO надо смотреть с какого угла начинается выделение
		this.group.forEach($el => $el.addClass(TableSelection.classNameGroup))
	}
}
