module.exports = (fn, flag) => {
  if (typeof fn !== 'function')
    throw new TypeError('Exception: A function required for argument')
  // some API (fs.exists) in node.js has only one argument in callback func.
  flag = !!flag

  return (...args) =>
    new Promise( (resolve, reject) => {
      args.push( (err, result) => flag ? resolve(err) : err ? reject(err) : resolve(result) )
      try { fn.apply(this, args) }
      catch (err) { reject(err) }
    })
}