const supertest = require('supertest')
const User = require('../models/User')
const { app } = require('../index')
const api = supertest(app)

const initialNotes = [
  {
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
    categories: ["Sport", "Music", "Entertaiment"]
  },
  {
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

const getAllContentFromNote = async () => {
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map(note => note.content),
    response
  }
}

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}
module.exports = {
  api,
  initialNotes,
  getAllContentFromNote,
  getUsers
}