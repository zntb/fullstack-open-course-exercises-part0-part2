import { useEffect, useState } from 'react';
import axios from 'axios';
import Country from './components/Country';

function App() {
  const [value, setValue] = useState('');
  const [query, setQuery] = useState([]);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setQuery(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    if (value) {
      const filteredCountries = query.filter((country) =>
        country.name.common.toLowerCase().includes(value.toLowerCase())
      );

      if (filteredCountries.length > 10) {
        setError('Too many matches, please make your search more specific.');
        setCountries([]);
      } else {
        setError('');
        setCountries(filteredCountries);
      }
    } else {
      setCountries([]);
      setError('');
    }
  }, [value, query]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        find countries <input value={value} onChange={handleChange} />
      </form>
      {error && <p>{error}</p>}
      {countries.length > 0 && (
        <div>
          {countries.length === 1 ? (
            <Country country={countries[0]} />
          ) : (
            countries.map((country) => (
              <div key={country.name.common}>{country.name.common}</div>
            ))
          )}
        </div>
      )}
    </>
  );
}

export default App;
