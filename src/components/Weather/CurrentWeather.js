import moment from 'moment';

function CurrentWeather({ currentWeather, todayForecast }) {
  return <div className="current-weather row col-12 justify-content-center">
    <div className="header col-12">
      <p>{moment().format('dddd D MMMM, h:mm a')}</p>
        <h1>{currentWeather?.name}, {currentWeather?.sys?.country}</h1>
    </div>
    <div className="temperature col-12 row align-items-center">
      <div className='weather-icon col-3'>
        <img src={`https://openweathermap.org/img/w/${currentWeather?.weather[0]?.icon}.png`} alt='clouds'/>
      </div>
        <h2 className='col-9'>{currentWeather?.main?.temp.toFixed()}&deg;C</h2>
        <p className='feels-like col-12'>Feels like {currentWeather?.main?.feels_like.toFixed()}&deg;, {currentWeather?.weather[0]?.description}</p>
    </div>
    <div className="details col-12 row">
      <div className='row col-12 col-md-4'>
        <div className='details-element col-12 col-sm-6 col-md-12'>
          <span>{todayForecast?.temp?.max.toFixed()}&deg;</span>
          <p>Hight</p>
        </div>
        <div className='details-element col-12 col-sm-6 col-md-12'>
          <span>{todayForecast?.temp?.min.toFixed()}&deg;</span>
          <p>Low</p>
        </div>
      </div>
      <div className='row col-12 col-md-4'>
        <div className='details-element col-12 col-sm-6 col-md-12'>
          <span>{currentWeather?.wind?.speed}m/s</span>
          <p>Wind</p>
        </div>
        <div className='details-element col-12 col-sm-6 col-md-12'>
          <span>{todayForecast?.pop * 100}%</span>
          <p>Rain</p>
        </div>
      </div>
      <div className='row col-12 col-md-4'>
        <div className='details-element col-12 col-sm-6 col-md-12'>
          <span>{moment(currentWeather?.sys.sunrise * 1000).format('hh:mm a')}</span>
          <p>Sunrise</p>
        </div>
        <div className='details-element col-12 col-sm-6 col-md-12'>
          <span>{moment(currentWeather?.sys.sunset * 1000).format('hh:mm a')}</span>
          <p>Sunset</p>
        </div>
      </div>
    </div>
  </div>
}

export default CurrentWeather