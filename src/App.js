import React, { useEffect, useState } from 'react';
import Note from "./components/Note"
import './App.css';
import noteService from './services/notes'
import Notification from "./components/Notification"
import Footer from './components/Footer';


function App() {
  
  const[notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll]= useState(true)
  const [alert, setAlert] = useState(null)
  const [alertType, setAlertType] = useState('success')

  const toggleImportance=(id)=>{
  const note = notes.find(n=> n.id === id)
  const changedNote = { ...note, important: !note.important}
  
  noteService
  .update(id, changedNote)
  .then(response=>{
    setNotes(notes.map(note=> note.id !== id? note: response))
    setAlert(`the note '${changedNote.content}' has been 
    made ${note.important? 'not important':'important'}`)
    setAlertType('success')
    setTimeout(() => {
      setAlert(null)
    }, 5000)
  })
  .catch(error=>{
    setAlert(`the note '${note.content}' does not exist on the server`)
    setAlertType('error')
    setTimeout(()=>{
      setAlert(null)
    }, 5000)
    setNotes(notes.filter(n => n.id !== id))
  })  
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
      setAlert(`the note '${noteObject.content}' has been added to the server`)
      setAlertType('success')
      setTimeout(() => {
        setAlert(null)
      }, 5000)
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
      <Notification message={alert} type={alertType}/>

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
      <Footer />
    </div>
     );
}

export default App;
