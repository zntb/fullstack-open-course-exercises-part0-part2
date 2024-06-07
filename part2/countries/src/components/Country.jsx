const Country = ({ country, weather }) => {
  const { name, capital, area, languages, flags } = country;

  return (
    <div>
      <h2>{name.common}</h2>
      <div>capital: {capital}/</div>
      <div>area: {area}</div>

      <h3>languages: </h3>

      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flags.svg} alt={`Flag of ${name.common}`} width="100" />

      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <p>temperature {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={`Weather icon for ${weather.weather[0].description}`}
          />

          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Country;
