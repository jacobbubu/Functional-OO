class Monad {
  constructor() {
    this._value = arguments[0]
  }

  unit(value) {
    this._value = value
    return this
  }

  bind(fn) {
    return new Monad(fn(this._value))
  }

  extract() {
    return this._value
  }
}

module.exports = Monad