import { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      filter shown with{' '}
      <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log('Response data:', response.data);
        setPersons(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personExists = persons.some((person) => person.name === newName);

    if (personExists) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const personObject = { name: newName, number: newNumber };
      axios
        .post('http://localhost:3001/persons', personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
        });
    }
  };

  const filteredPersons = persons
    .filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((person) => person);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
