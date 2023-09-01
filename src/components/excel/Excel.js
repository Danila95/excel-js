import { $ } from '../../core/dom'

export class Excel {
	constructor(selector, options) {
		this.$el = $(selector)
		this.components = options.components || []
	}

	getRoot() {
		const $root = $.create('div', 'excel')

		this.components = this.components.map(Component => {
			const $el = $.create('div', Component.className)
			// создаем инстанс класса для каждого компонента, который наследуется от ExcelComponent
			const component = new Component($el)
			$el.html(component.toHTML())
			// Выводим все компоненты в корневой div
			$root.append($el)
			return component
		})

		return $root
	}

	render() {
		this.$el.append(this.getRoot())
		this.components.forEach(component => component.init())
	}
}
