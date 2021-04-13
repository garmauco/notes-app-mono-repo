import React, { useState, useRef } from 'react'
import Togglable from './Togglable'
export default function NoteForm({ addNote, handlelogout }) {
  const [newNote, setNewNote] = useState('')
  const togglableRef = useRef()

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: false//Math.random() > 0.5
    }
    addNote(noteObject)
    setNewNote('')
    togglableRef.current.toggleVisibility()//accedemos al metodo desde ref
  }
  return (
    <Togglable buttonLabel="New Note" ref={togglableRef}>
      <button onClick={handlelogout}>Logout</button><hr />
      <h3>Create a new Note</h3>
      <form onSubmit={handleSubmit}>

        <input
          type='text'
          value={newNote}
          name='CreateNote'
          placeholder='Write your note content'
          onChange={handleChange}
        />
        <button>save</button>
      </form>
    </Togglable>
  )
}