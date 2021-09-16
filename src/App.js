import React, { useState } from 'react';
import './App.css';
import AddPerson from './components/Addperson';
import Filter from './components/Filter';
import MapPerson from './components/MapPerson';


function App() {
  const contacts = [{ name: 'Arto Hellas',
  number: '098-23435'
 }, { name: 'Heys Reils', 
number: '087-2345'}]
  const [person, setPerson]= useState(contacts)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]=useState('')

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
    setNewName('')
    setNewNumber('')
  }
  }
  const handleFilter=(e)=>{
    const filterValue = e.target.value
    if(filterValue===''){
      setPerson(contacts)
    }else{
  const filtered = person.filter(p=> p.name.startsWith(filterValue))
    setPerson(filtered)
    }
  }
  return (
    <div>
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
      <MapPerson person={person}/>
    </div>
  );
}

export default App;
