const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/User')
const { api, server, getUsers } = require('../test/helpers')
describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({ username: 'testuser', passwordHash })
    await user.save()
  })

  test('work as expected creating a fresh username', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'testnewuser',
      name: 'test user',
      password: 'top123123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  // test('creation fails with proper statuscode and message if username is already taken', async () => {
  //   const usersAtStart = await getUsers()

  //   const newUser = {
  //     username: 'testuser',
  //     name: 'Test user',
  //     password: 'passs'
  //   }

  //   const result = await api
  //     .post('/api/users')
  //     .send(newUser)
  //     .expect(409)
  //     .expect('Content-Type', /application\/json/)

  //   expect(result.body.error).toContain('expected `username` to be unique')

  //   const usersAtEnd = await getUsers()
  //   expect(usersAtEnd).toHaveLength(usersAtStart.length)
  // })
  //hook que recibe un callback que se ejecuta cuando terminen todos los test
  afterAll(() => {
    server.close()
    mongoose.connection.close()
  })
})