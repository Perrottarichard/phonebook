import React, { useState, useEffect } from 'react'
import AddEntryForm from './components/AddEntryForm';
import FilterBox from './components/FilterBox';
import DisplayDirectory from './components/DisplayDirectory';
import services from './components/services'
import EditEntryForm from './components/EditEntryForm';
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';

const App = () => {

  //CONST VARIABLES
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [editName, setEditName] = useState('')
  const [editNumber, setEditNumber] = useState('')
  const [toggleForm, setToggleForm] = useState(false);
  const [editById, setEditById] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    services.getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
    console.log('useEffect running')
  }, [])

  //EVENT HANDLERS
  const handlePersonInput = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  }
  const handleNumberEdit = (event) => {
    setEditNumber(event.target.value);
  }
  const handleNameEdit = (event) => {
    setEditName(event.target.value);
  }
  const handleIdEdit = (event) => {
    setEditById(event.target.value);
  }
  const removeEntry = (id) => {
    let result = window.confirm(`Are you sure you want to delete ${persons.filter(person => person.id === id).map(single => single.name)}?`)
    if (result) {
      services.remove(id).then(
        setPersons(persons.filter(person => person.id !== id)
        ))
        .catch(error => {
          setErrorMessage(
            `That contact was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      setSuccessMessage('Contact successfully deleted')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    }
  }

  const handleSearchName = (event) => {
    if (event.target.value.length > 0) {
      setShowAll(false)
      setSearchName(event.target.value);
    } else {
      setShowAll(true)
      setSearchName(event.target.value);
    }
  }
  const showForm = () => {
    setToggleForm(!toggleForm);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />
      <FilterBox
        searchName={searchName}
        handleSearchName={handleSearchName} />
      <AddEntryForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        handlePersonInput={handlePersonInput}
        handleNumberInput={handleNumberInput}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setSuccessMessage={setSuccessMessage}
      />
      <EditEntryForm
        persons={persons}
        setPersons={setPersons}
        editName={editName}
        setEditName={setEditName}
        handleNameEdit={handleNameEdit}
        handleNumberEdit={handleNumberEdit}
        editNumber={editNumber}
        setEditNumber={setEditNumber}
        toggleForm={toggleForm}
        setToggleForm={setToggleForm}
        showForm={showForm}
        editById={editById}
        setEditById={setEditById}
        handleIdEdit={handleIdEdit}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />
      <h2>Numbers</h2>
      <DisplayDirectory
        setPersons={setPersons}
        persons={persons}
        showAll={showAll}
        searchName={searchName}
        removeEntry={removeEntry} />
    </div>
  )
}

export default App