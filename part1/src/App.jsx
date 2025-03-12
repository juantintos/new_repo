import Filter from './components/Filter';
import Persons from './components/Persons';
import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        setNotification(`Failed to fetch persons: ${error.message}`)
        setNotificationType('error')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (confirmUpdate) {
        personService
          .update(existingPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotification(`Updated ${returnedPerson.name}`)
            setNotificationType('success')
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setNotification(`Information of ${existingPerson.name} has already been removed from server`)
            setNotificationType('error')
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${returnedPerson.name}`)
          setNotificationType('success')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setNotification(`Failed to add ${personObject.name}: ${error.response.data.error}`)
          setNotificationType('error')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const result = window.confirm(`Delete ${person.name}?`)
    if (result) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification(`Deleted ${person.name}`)
          setNotificationType('success')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setNotification(`Information of ${person.name} has already been removed from server`)
          setNotificationType('error')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} type={notificationType} />
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <form onSubmit={addPerson}>
        <br></br>
        <div>
          Name: <input value={newName} onChange={handleNameChange} required/>
        </div>
        <br></br>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} required/>
        </div>
        <br></br>
        <div>
        <button type="submit">Save</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App