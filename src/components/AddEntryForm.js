import React from 'react';
import services from './services'

const AddEntryForm = (props) => {

    const { persons, newName, newNumber, setPersons, setNewName, setNewNumber, handleNumberInput, handlePersonInput, setSuccessMessage } = props

    const addEntry = (event) => {
        event.preventDefault()
        if (persons.filter(p => p.name === newName).length > 0 && newNumber.length !== 0) {
            let result = window.confirm(`${newName} is already in the phonebook. Would you like to replace the old number?`)
            if (result) {
                let newListing = { name: newName, number: newNumber };
                let id = persons.filter(p => p.name === newName).map(p => p.id);
                services.update(id, newListing).then(listing => {
                    setPersons(persons.map(person => person.name !== newName ? person : listing)
                    )
                })
                setNewName('')
                setNewNumber('')
                setSuccessMessage('Number successfully replaced')
            }
        }
        else if (persons.filter(p => p.name === newName).length > 0) {
            alert(`${newName} is already in the phonebook. You can replace the number with a new one by using the form`)
        }
        else {
            const listing = {
                name: newName,
                number: newNumber
            }
            services.create(listing).then(returnedListing => {
                setPersons(persons.concat(returnedListing))
            })
            setNewName('')
            setNewNumber('')
            setSuccessMessage('Contact successfully added')
            setTimeout(() => {
                setSuccessMessage(null)
            }, 3000)
        }
    }

    return (
        <div>
            <h2>Add New Entry</h2>
            <form onSubmit={addEntry}>
                <div>
                    Name: <input
                        value={newName}
                        onChange={handlePersonInput} />
                </div>
                <div>
                    Number: <input
                        value={newNumber}
                        onChange={handleNumberInput} /></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}
export default AddEntryForm;
