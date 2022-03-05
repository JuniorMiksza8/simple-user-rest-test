import app from '../../../app'
import request from 'supertest'
import faker from 'faker'

describe('Test user controller', () => {
    let userID: string | undefined = undefined

    test('should retrieve users', async () => {
        const response = await request(app).get('/user')
        expect(response.statusCode).toBe(200)
    })

    test('should create new user', async () => {
        const user = {
            username: faker.name.findName(),
            birthdate: faker.date.past(),
        }

        const response = await request(app).post('/user').send(user)

        userID = response.body.id

        expect(response.body.username).toBe(user.username)
    })

    test('should update created user', async () => {
        const data = {
            username: faker.name.findName(),
            birthdate: faker.date.past(),
        }

        const response = await request(app).put(`/user/${userID}`).send(data)
        expect(response.body.username).toBe(data.username)
    })

    test('should update user photo', async () => {
        const image = Buffer.from(faker.image.image())
        const response = await request(app).put(`/user/photo/${userID}`).attach('photo', image, 'mock_photo.png')
        expect(response.body.photo).not.toBeNull()
    })

    test('should delete created user', async () => {
        expect(userID).toBeDefined()

        const response = await request(app).delete(`/user/${userID}`)
        expect(response.body.id).toBe(userID)
    })
})
