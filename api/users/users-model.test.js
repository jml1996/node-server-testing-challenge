it('is the correct env', () => {
    expect(process.env.DB_ENV).toBe('testing')  
  })
  
  const User = require('./users-model.js')
  const db = require('../../data/dbConfig.js')
  const user1 = { name: 'josh'}
  const user2 = { name: 'mk' }
  
  beforeAll(async () => {
      await db.migrate.rollback()
      await db.migrate.latest()
  })
  
  beforeEach(async () => {
      await db('users').truncate()
  })
  
  afterAll(async () => {
      await db.destroy()
  })
  
  describe('Users model', () => {
      describe('create', () => {
          it('adds users to database', async () => {
              let all
              await User.insert(user1)
              all = await db('users')
              expect(all).toHaveLength(1)
  
              await User.insert(user2)
              all = await db('users')
              expect(all).toHaveLength(2)
          })
          it('resolves to the added user', async () => {
              const added = await User.insert(user1)
              expect(added).toMatchObject(user1)
          })
      })
      describe('delete', () => {
            it('deletes the user', async () => {
                let all
                await User.insert(user1)
                all = await db('users')
                expect(all).toHaveLength(1)
                await User.remove(1)
                all = await db('users')
                expect(all).toHaveLength(0)
            })
            it('resolves to deleted user', async () => {
                await User.insert(user1)
                const del = await User.remove(1)
                expect(del).toMatchObject(user1)
            })
      })
  })
