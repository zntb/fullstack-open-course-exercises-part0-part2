import { useEffect, useState } from 'react';
import axios from 'axios';
import Country from './components/Country';

const API_KEY = import.meta.env.VITE_WEATHER_KEY;

function App() {
  const [value, setValue] = useState('');
  const [query, setQuery] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState('');
  const [weather, setWeather] = useState(null);

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
        setSelectedCountry(null);
      } else if (filteredCountries.length === 1) {
        setError('');
        setCountries(filteredCountries);
        setSelectedCountry(filteredCountries[0]);
        fetchWeather(filteredCountries[0].capital);
      } else {
        setError('');
        setCountries(filteredCountries);
        setSelectedCountry(null);
      }
    } else {
      setCountries([]);
      setError('');
      setSelectedCountry(null);
    }
  }, [value, query]);

  const fetchWeather = (capital) => {
    if (capital) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`
        )
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capital);
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        find countries <input value={value} onChange={handleChange} />
      </form>
      {error && <p>{error}</p>}
      {selectedCountry ? (
        <Country country={selectedCountry} weather={weather} />
      ) : (
        <div>
          {countries.map((country) => (
            <div key={country.name.common}>
              {country.name.common}{' '}
              <button onClick={() => handleShowDetails(country)}>show</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
