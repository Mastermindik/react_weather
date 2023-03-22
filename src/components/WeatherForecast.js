import moment from 'moment';

function WeatherForecast({ el }) {
  return <div className="forecast-item">
    <div className="date">{moment(el?.dt * 1000).format('DD.MM')}</div>
    <div className="time">{moment(el?.dt * 1000).format('hh:mm a')}</div>
    <div className="icon">
      <img src={`https://openweathermap.org/img/w/${el?.weather[0]?.icon}.png`} alt={el?.weather[0].description} />
    </div>
    <div className="temperature">{el?.main?.temp.toFixed()}&deg;</div>
  </div>
}

export default WeatherForecast