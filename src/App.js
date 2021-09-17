import React, { useEffect, useState } from 'react';
import './App.css';
import contactService from "./Services/contacts"

import AddPerson from './components/Addperson';
import Filter from './components/Filter';
import MapPerson from './components/MapPerson';


function App() {
  const [person, setPerson]= useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]=useState('')
 const hook=()=>{
    contactService
    .getAll()
    .then(ret=> {
      setPerson(ret)
    })
    .catch(err=> console.log(err))
 }
  useEffect(hook,[person])
  const handleNameChange=(e)=>{
    e.preventDefault()
    setNewName(e.target.value)
  }
  const handleNumberChange=(e)=>{
    e.preventDefault()
    setNewNumber(e.target.value)
  }
  const handleAdd=(e)=>{
    e.preventDefault()
    if(person.find(p=> p.name.toLowerCase() === newName.toLowerCase())){
      alert(`${newName} already exists`);
      setNewName('')
      setNewNumber('')
    } else if (person.find(p => p.number === newNumber)){
      alert (`${newNumber} already exists`);
      setNewName('')
      setNewNumber('')
    }
    else{
    const NewContact={
      name: newName,
      number: newNumber
    }
    setPerson(person.concat(NewContact))
    contactService
    .create(NewContact)
    .then(item=> {
      console.log(item)
    })
    setNewName('')
    setNewNumber('')
  }
}
  const handleFilter=(e)=>{
    const filterValue = e.target.value
  const filtered = person.filter(p=> p.name.includes(filterValue))
  setPerson(filtered)
  }
  const handleDelete = (id,name) => {
    if(window.confirm(`would you like to delete ${name}?`)){
    // const newperson = person.filter(p => p.id !== id)
    // setPerson(newperson)
    contactService.deleteOne(id)
    .then(response=> console.log(response))
    }
  }
  const handleEdit=(id,name)=>{
    const newNumber = prompt(` Enter new number for ${name}? or cancel to maintain old number`);
    const findContact = person.find(p=> p.id===id)
    if(newNumber){
    const editedContact = { ...findContact, number: newNumber}
    contactService.update(id, editedContact)
    .then(response=> {
      console.log(response)
      return response;
  })
}
}
  return (
    <div className="App">
      <h2>Phonebook</h2>
      Filter: <Filter 
      onChange={handleFilter}
      placeholder="Filter Names"/>
      <AddPerson onSubmit={handleAdd}
      onNumberChange={handleNumberChange}
      onNameChange={handleNameChange}
      Namevalue={newName}
      Numvalue={newNumber}/>
      <h2>Numbers</h2>
      <MapPerson 
      person={person}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      />
    </div>
  );
}

export default App;
