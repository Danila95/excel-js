export class Emitter {
	constructor() {
		this.listeners = {}
	}

	// dispatch, fire, trigger
	// Уведомляем слушателей, если они есть
	emit(event, ...args) {
		if (!Array.isArray(this.listeners[event])) {
			return false
		}
		this.listeners[event].forEach(listener => {
			listener(...args)
		})
		return true
	}

	// on, listen
	// Подписываемся на уведомление
	// Добавляем нового слушателя
	subscribe(event, fn) {
		this.listeners[event] = this.listeners[event] || []
		this.listeners[event].push(fn)
		return () => {
			this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
		}
	}
}

// Example
// const emitter = new Emitter()

// const unsub = emitter.subscribe('Dan', data => console.log('Sub', data))
// emitter.emit('123', 12)

// setTimeout(() => {
// 	emitter.emit('Dan', 'After 2 seconds')
// }, 2000)

// setTimeout(() => {
// 	unsub()
// }, 3000)

// setTimeout(() => {
// 	emitter.emit('Dan', 'After 4 seconds')
// }, 4000)
