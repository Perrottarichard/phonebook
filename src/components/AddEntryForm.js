import React from 'react';
import services from './services'

const AddEntryForm = (props) => {

    const { persons, newName, newNumber, setPersons, setNewName, setNewNumber, handleNumberInput, handlePersonInput, setSuccessMessage, setErrorMessage, errorMessage } = props

    const addEntry = (event) => {
        event.preventDefault()
        if (persons.filter(p => p.name === newName).length > 0 && newNumber.length >= 8) {
            let result = window.confirm(`${newName} is already in the phonebook. Would you like to replace the old number?`)
            if (result) {
                let id = persons.filter(p => p.name === newName).map(p => p.id);
                const listing = {
                    id: id,
                    name: newName,
                    number: newNumber
                };
                services.update(id, listing).catch(error => {
                    setErrorMessage(error.response.data)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000);
                }).then(
                    setPersons(persons.map(person => person.name !== newName ? person : listing)
                    ))
                setNewName('')
                setNewNumber('')
                setSuccessMessage('Number successfully replaced')
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 3000)

            }
        }
        else if (persons.filter(p => p.name === newName).length > 0) {
            alert(`${newName} is already in the phonebook. You can replace the number with a new one by using the form. Enter the name, and enter a new number at least 8 digits long`)
        }
        else {
            const listing = {
                name: newName,
                number: newNumber
            }
            services.create(listing).catch(error => {
                console.log(error);
                setErrorMessage('Something went wrong. Make sure the name is at least 3 characters long and the phone number is at least 8 digits long')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 7000);
            }).then(returnedListing => {
                if (returnedListing.id !== undefined) {
                    setPersons(persons.concat(returnedListing))
                    setNewName('')
                    setNewNumber('')
                    setSuccessMessage('Contact successfully added')
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 3000)
                }
            })
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
