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
        it('returns the right num of hobbits', async () => {
            let res
            await db('users').insert(user1)
            res = await request(server).get('/users')
            expect(res.body).toHaveLength(1)

            await db('users').insert(user2)
            res = await request(server).get('/users')
            expect(res.body).toHaveLength(2)
        })
        it('returns the right hobbits', async () => {
            await db('hobbits').insert(frodo)
            const res = await request(server).get('/hobbits')
            // expect(res.body[0]).toMatchObject(frodo)
            expect(res.body[0]).toEqual({ id: 1, ...frodo })
        })
    })
    describe('[POST] /hobbits', () => {
        it('responds with the newly created hobbit', async () => {
            let res
            res = await request(server).post('/hobbits').send(frodo)
            expect(res.body).toMatchObject({id: 1, ...frodo})

            res = await request(server).post('/hobbits').send(sam)
            expect(res.body).toMatchObject({id: 2, ...sam})
        })
    })
})