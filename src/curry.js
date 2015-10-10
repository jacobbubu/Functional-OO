module.exports = (fn) => {
  const curried = (...args) =>
    args.length >= fn.length ?
      fn.call(this, ...args) :
      (...rest) => curried.call(this, ...args, ...rest)
  return curried
}