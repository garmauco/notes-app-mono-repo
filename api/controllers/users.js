const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { response } = require('express')

//userRouter funcionaria igual que lo hacemos en el index con app, y la ruta es '/' ya que en el index esta indicada '/api/users' al llamarse al controlador

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    date: 1,
    _id: 0
  })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  // try {
  const { body } = request
  const { username, name, password } = body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name,
    passwordHash: passwordHash
  })

  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
  // } catch (error) {
  //   console.log(error)
  //   console.error(error)
  //   response.status(400).json(error)
  // }
})

module.exports = usersRouter