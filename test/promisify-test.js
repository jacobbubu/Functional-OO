import test      from 'blue-tape'
import promisify from '../lib/promisify.js'
import fs        from 'fs'

const BAD_FILE_NAME = 'THERE_IS_NO.FILE'

test('fs.read', async (t) => {
  const readFileAsync = promisify(fs.readFile)

  try {
    await readFileAsync(BAD_FILE_NAME)
  }
  catch (err) {
    t.ok(err.code === 'ENOENT', 'Promised fs.read threw exception as expected')
  }

  const contents = await readFileAsync(__filename, 'utf8')
  t.ok(contents.length >= 0, 'Promised fs.read ran correctly')

})

test('fs.exists', async (t) => {
  const existsAsync = promisify(fs.exists, true)
  t.ok(await existsAsync(__filename), 'Promised fs.exists ran correctly for existing file')
  t.notOk(await existsAsync(BAD_FILE_NAME), 'Promised fs.exists ran correctly for non-existing file')
})