import React, { useEffect, useState } from 'react';
import Note from "./components/Note"
import './App.css';
import noteService from './services/notes'


function App() {
  
  const[notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll]= useState(true)

  const toggleImportance=(id)=>{
  const note = notes.find(n=> n.id === id)
  const changedNote = { ...note, important: !note.important}
  
  noteService
  .update(id, changedNote)
  .then(response=>{
    setNotes(notes.map(note=> note.id !== id? note: response))
  })
  .catch(error=>{
    alert(`the note ${note.content} has been deleted from the server`)
    console.log(error)
  })
  setNotes(notes.filter(n=> n.id!== id))
  }
   const hook =()=>{ 
    noteService
    .getAll()
      .then(response => {
        setNotes(response);
      })
    }
  useEffect(hook, [])
  const addNote=(e)=>{
    e.preventDefault()
    const noteObject ={
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
    noteService
    .create(noteObject)
    .then(response=>{
      setNotes(notes.concat(response))
      setNewNote('')
    })
    
  }
  const handleNoteChange=(e)=>{
    setNewNote(e.target.value)
  }

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={()=> setShowAll(!showAll)}>
          show {showAll? 'important': 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note=>
        <Note key={note.id}
         note={note}
         toggleImportance={()=>toggleImportance(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
        value={newNote}
        onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
     );
}

export default App;
