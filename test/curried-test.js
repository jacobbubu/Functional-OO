import test   from 'blue-tape'
import curry  from '../lib/curry.js'

test('curry2', async (t) => {
  const multiply = (a, b) => a * b
  const double = curry(multiply)(2)
  t.ok(double(3) === 6, 'Three doubled should be six')
})

test('curriedAdd', async (t) => {
  const add = (a, b, c) => a + b + c
  const curriedAdd = curry(add)
  t.ok(curriedAdd(1, 2)(3) === 6, 'curriedAdd(1, 2)(3) should be 6')
  t.ok(curriedAdd(1, 2, 3) === 6, 'curriedAdd(1, 2, 3) should be 6')
  t.ok(curriedAdd(1)(2)(3) === 6, 'curriedAdd(1)(2)(3) should be 6')
})