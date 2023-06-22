import './App.scss';
import { Accordion, Container, Spinner } from "react-bootstrap";
import CitiesSearch from './components/Weather/CitiesSearch';
import CurrentWeather from './components/Weather/CurrentWeather';
import { useEffect, useState } from 'react';
import WeatherForecast from './components/Weather/WeatherForecast';
import Chart from './components/WeatherChart/Chart';

function App() {
  const [currentWeather, setCurrentWeather] = useState('');
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [todayForecast, setTodayForecast] = useState('');
  const [dailyForecast, setDailyForecast] = useState('');
  const [foundCites, setFoundCites] = useState([]);
  const [cityName, setCityName] = useState('');
  const myKey = '881392becf721590c1ea7454ae5e1cf8';
  let lat = localStorage.getItem('cityCoords') ? JSON.parse(localStorage.getItem('cityCoords'))[0] : 51.5085;
  let lon = localStorage.getItem('cityCoords') ? JSON.parse(localStorage.getItem('cityCoords'))[1] : -0.1257;

  useEffect(() => {
    if (!localStorage.getItem('cityCoords')) {
      localStorage.setItem('cityCoords', JSON.stringify([lat, lon]));
    }
    async function loadWeather() {
      await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${myKey}`, {
        method: 'GET'
      }).then(data => data.json()).then(data => {
        setCurrentWeather(data);
      })
      // await fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${myKey}`).then(data => data.json()).then(data => {
      //   let arr = [];
      //   // for
      //   setHourlyForecast(data.list)
      // })
      fetch(`https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02`).then(data => data.json()).then(data => {
        setDailyForecast(data.daily);
        setTodayForecast(data.daily[0]);
        setHourlyForecast(data.hourly)
      })
    }
    loadWeather();
  }, [lat, lon])

  function handleSubmit(e) {
    if (e.key === 'Enter') {
      fetch(`https://api.openweathermap.org/data/2.5/find?units=metric&q=${cityName}&appid=${myKey}`).then(data => data.json()).then(data => {
        setFoundCites(data.list);
        if (!data.list.length) {
          alert("Wrong city")
        };
      })
    }
  }

  function handleChange(inputValue) {
    setCityName(inputValue);
  }

  function getNewWeather(value) {
    localStorage.setItem('cityCoords', JSON.stringify([value.coord.lat, value.coord.lon]))
    lat = value.coord.lat;
    lon = value.coord.lon;
  }

  return <>
    <header className='header-search'>
      <Container>
        {currentWeather ? <CitiesSearch
          foundCites={foundCites}
          handleSubmit={handleSubmit}
          cityName={cityName}
          handleChange={handleChange}
          getNewWeather={getNewWeather} /> : <Spinner animation='border' />}
      </Container>
    </header>
    <Container>
      <div className="wraper row justify-content-center p-0 px-sm-3">
        <div className="col-lg-6 row justify-content-center p-0 px-sm-3">
          {currentWeather && todayForecast ? <CurrentWeather
            currentWeather={currentWeather}
            todayForecast={todayForecast} /> : <Spinner animation='border' />}
          <div className="chart col-12 mt-3">
            {dailyForecast ? <Chart hourlyForecast={hourlyForecast} /> : <Spinner animation='border' />}
          </div>
        </div>
        <div className="forecast col-lg-6 p-0 px-sm-3">
          <Accordion defaultActiveKey={0} >
            {dailyForecast ? dailyForecast.map((day, index) => <WeatherForecast day={day} key={day?.dt} index={index} />) : <Spinner animation='border' />}
          </Accordion>
        </div>
      </div>
    </Container>
  </>
    ;
}

export default App;
