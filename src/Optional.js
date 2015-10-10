const isFunction = (fn) => typeof fn === 'function'
const throwError = function(message) { throw new Error(message) }

const nulled = () => new Optional()
const valued = (value) => new Optional(value)

class Optional {
  constructor(...args) {
    this._isEmpty = args.length === 0
    this._value = args[0]
  }

  get() {
    return this._isEmpty ? throwError('value is empty') : this._value
  }

  isEmpty() {
    return this._isEmpty
  }

  present(fn) {
    if (!this._isEmpty) {
      if (!isFunction(fn)) throwError('presenter is not a function')
      fn(this._value)
    }
  }

  filter(fn) {
    if (!isFunction(fn)) throwError('filter is not a function')
    return (this._isEmpty || !fn(this._value)) ? nulled() : valued(this._value)
  }

  map(fn) {
    if (!isFunction(fn)) throwError('mapper is not a function')
    if (this._isEmpty)
      return nulled()
    else {
      const mapped = fn(this._value)
      return (mapped === void 0 || mapped === null) ?
        nulled() :
        valued(mapped)
    }
  }

  flatMap(fn) {
    if (!isFunction(fn)) throwError('mapper is not a function')
    if (this._isEmpty)
      return nulled()
    else {
      const newOpt = fn(this._value)
      return newOpt instanceof Optional ?
        newOpt :
        throwError('the mapper function MUST return a value in Optional type')
    }
  }

  or(other) {
    return this._isEmpty ? other : this._value
  }

}

module.exports = Optional