import test     from 'blue-tape'
import Optional from '../lib/Optional.js'

test('Optional', async (t) => {
  const emptyObj = new Optional()
  t.ok(emptyObj.isEmpty(), 'an empty object has been built')
  t.equal(emptyObj.or('Other'), 'Other', 'emptyObject.or')

  let newObj = emptyObj.filter((value) => true)
  t.ok(newObj.isEmpty(), 'filtering an empty object will return a new empty object')

  test('non-empty object', async (t) => {
    const obj = new Optional(1)
    t.notOk(obj.isEmpty(), 'an non-empty object has been built')
    obj.present( (value) =>
      t.equal(value, 1, 'an non-empty object has value 1')
    )

    obj.filter( (value) => true )
      .present ( (value) =>
        t.equal(value, 1, 'valuedObject.filter')
      )

    obj.map( (value) => value + 1 )
      .present( (value) =>
        t.equal(value, 2, 'valuedObject.map')
      )

    t.ok(obj.map( (value) => null ).isEmpty(), 'mapper for map returned null')

    t.equal(obj.flatMap( (value) => new Optional(value + 1) ).get(), 2, 'valuedObject.flatMap')
    t.throws(
      () => obj.flatMap( (value) => value + 1 ),
     'mapper for flatMap returned a non-Optional value'
    )

    t.equal(obj.or('Other'), 1, 'valuedObject.or')
  })
})