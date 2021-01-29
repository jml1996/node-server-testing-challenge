const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

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

describe('server', () => {
    describe('[GET] /users', () => {
        it('200', async () => {
            const res = await request(server).get('/users')
            expect(res.status).toBe(200)
        })
        it('number of users', async () => {
            let res
            await db('users').insert(user1)
            res = await request(server).get('/users')
            expect(res.body).toHaveLength(1)

            await db('users').insert(user2)
            res = await request(server).get('/users')
            expect(res.body).toHaveLength(2)
        })
        it('returns added user', async () => {
            await db('users').insert(user1)
            const res = await request(server).get('/users')
            // expect(res.body[0]).toMatchObject(frodo)
            expect(res.body[0]).toEqual({ id: 1, ...user1 })
        })
    })
    describe('[DELETE] /users/:id', () => {
        it('deletes user', async () => {
            let res
            const [id] = await db('users').insert(user1)
            await request(server).delete("/users/" + 1)
            res = await db('users')
            // console.log(res)
            expect(res.length).toBe(0)
            // console.log(res)
            // expect(res.body).toMatchObject({id: 1, ...user1})
        })
    })
})