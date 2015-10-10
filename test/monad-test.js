import test     from 'blue-tape'
import Monad from '../lib/Monad.js'

test('Monad', async (t) => {
  const monad = new Monad
  monad.unit(10)
  t.equal(monad.extract(), 10, 'a new Monad instance has been built')

  const firstMonad = monad.bind( (value) => value / 2 )
  t.equal(firstMonad.extract(), 5, 'monad.bind')

  const secondMonad = monad.bind( (value) => value + 1 )
    .bind( (value) => value + 2 )
    .bind( (value) => value + 3 )
  t.equal(secondMonad.extract(), 16, 'chained monad.bind')
})