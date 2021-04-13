const notesRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const Note = require('../models/Note')
const User = require('../models/User')
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(notes)
})
notesRouter.get('/:id', (request, response, next) => {
  const { id } = request.params
  Note.findById(id).then(note => {
    // if (note) {
    //   return response.json(note)
    // }
    // else {
    //   response.status(404).end()
    // }
    return note
      ? response.json(note)
      : response.status(404).end()

  }).catch(err => {
    next(err)
  })
})

notesRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  try {
    await Note.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
  // Note.findByIdAndDelete(id)
  //   .then(() => { response.status(204).end() })
  //   .catch(err => { next(err) })

})

notesRouter.put('/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      response.status(200).json(result)
    }).catch(err => next(err))

})

notesRouter.post('/', userExtractor, async (request, response, next) => {
  const { content, important = false } = request.body
  //sacar userId de request
  const { userId } = request
  const user = await User.findById(userId)

  if (!content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const newNote = new Note({
    content: content,
    important: important,
    date: new Date(),
    user: user._id
  })

  // newNote.save().then(savedNote => {
  //   response.status(201).json(savedNote)
  // }).catch(err => {
  //   next(err)
  // })
  try {
    const savedNote = await newNote.save()

    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    response.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }

})

module.exports = notesRouter