const mongoose = require('mongoose')

const { server } = require('../index')

const Note = require('../models/Note')

const { api, initialNotes, getAllContentFromNote } = require('./helpers')

//antes de todos los test hacer:
beforeEach(async () => {
  await Note.deleteMany({})//borrar todas la notas de la DB
  //parallel
  // const notesObjects = initialNotes.map(note => new Note(note))
  // const promises = notesObjects.map(note => note.saved())
  // await Promise.all(promises)
  //sequential
  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
  // const note1 = new Note(initialNotes[0])
  // await note1.save()
  // const note2 = new Note(initialNotes[1])
  // await note2.save()
  // const note3 = new Note(initialNotes[2])
  // await note3.save()
})

describe('GET all notes', () => {
  test('notes are returned as JSON', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two notes', async () => {
    const { response } = await getAllContentFromNote()
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('any note is content HTML is easy', async () => {
    const { contents } = await getAllContentFromNote()
    expect(contents).toContain('HTML is easy')
  })

})

describe('POST create a note', () => {
  test('is possible with a valid note', async () => {
    const newNote = {
      content: 'Nueva nota test',
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { contents, response } = await getAllContentFromNote()

    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain(newNote.content)
  })

  test('is not possible with a invalid note', async () => {
    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const { response } = await getAllContentFromNote()
    expect(response.body).toHaveLength(initialNotes.length)
  })

})

describe('DELETE ', () => {
  test('a note can be deleted', async () => {
    const { response: firstResponse } = await getAllContentFromNote()
    const { body: notes } = firstResponse
    const noteToDelete = notes[0]
    await api.delete(`/api/notes/${noteToDelete.id}`)
    expect(204)

    const { contents, response: secondResponse } = await getAllContentFromNote()
    expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
    expect(contents).not.toContain(noteToDelete.content)//verificamos que realmente se ha eliminado el contenido de esa nota
  })

  test('a note that not extist can not be deleted', async () => {
    await api
      .delete('/api/notes/1234')
      .expect(400)

    const { response } = await getAllContentFromNote()
    expect(response.body).toHaveLength(initialNotes.length)
  })
})
//hook que recibe un callback que se ejecuta cuando terminen todos los test
afterAll(() => {
  server.close()
  mongoose.connection.close()
})