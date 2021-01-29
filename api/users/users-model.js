const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  remove,
}

async function insert(hobbit) {
  const [id] = await db('users')
  .insert(hobbit)
  return db('users')
  .where({ id })
  .first()
}

async function remove(id) {
    const deleted = await db('users')
        .where('id', id)
        .first()
    // console.log(deleted)
    await db('users')
      .where('id', id)
      .del();
    return deleted
  }
