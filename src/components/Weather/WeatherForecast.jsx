import moment from 'moment';
import { Accordion, AccordionButton, Table } from 'react-bootstrap';

function WeatherForecast({ day, index }) {
  return <>
    <Accordion.Item eventKey={index} className='small'>
      <AccordionButton className='p-2 gap-md-4 text-end'>
        <div className="date small">
          {moment(day?.dt * 1000).format("ddd, MMM DD")}
        </div>
        <div className="temp small">
          <img src={`https://openweathermap.org/img/w/${day?.weather[0]?.icon}.png`} alt={day?.weather[0].description} className='w-25' />
          {day?.temp?.max.toFixed(0)} / {day?.temp?.min.toFixed(0)} &deg;C
        </div>
        <div className="desc small">
          {day?.weather[0].description}
        </div>
      </AccordionButton>
      <Accordion.Body className='p-3 d-flex flex-column gap-3'>
        <div className='d-flex'>
          <div className="icon">
            <img src={`https://openweathermap.org/img/w/${day?.weather[0]?.icon}.png`} alt={day?.weather[0].description} className='w-75'/>
          </div>
          <div>
            <b className='text-capitalize'>{day?.weather[0]?.description}</b>
            <p>The high will be {day?.temp?.max}&deg;C, the low will be {day?.temp?.min}&deg;C.</p>
          </div>
        </div>
        <div className='row'>
          <div className="col-sm-4">
            Rain: {day?.pop * 100}%
          </div>
          <div className="col-sm-4">
            Wind: {day?.wind_speed} m/s
          </div>
          <div className="col-sm-4">
            A/p: {day?.pressure} hPa
          </div>
          <div className="col-sm-4">
            Humidity: {day?.humidity}%
          </div>
          <div className="col-sm-4">
            UV: {day?.uvi}
          </div>
          <div className="col-sm-4">
            Dew point: {day?.dew_point}%
          </div>
        </div>
        <Table hover size='sm' className='mb-0'>
          <thead>
            <tr>
              <th></th>
              <th>Morning</th>
              <th>Afternoon</th>
              <th>Evening</th>
              <th>Night</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='text-uppercase text-secondary'>temperature</td>
              <td>{day?.temp?.morn.toFixed(0)} &deg;C</td>
              <td>{day?.temp?.day.toFixed(0)} &deg;C</td>
              <td>{day?.temp?.eve.toFixed(0)} &deg;C</td>
              <td>{day?.temp?.night.toFixed(0)} &deg;C</td>
            </tr>
            <tr>
              <td className='text-uppercase text-secondary'>feels like</td>
              <td>{day?.feels_like?.morn.toFixed(0)} &deg;C</td>
              <td>{day?.feels_like?.day.toFixed(0)} &deg;C</td>
              <td>{day?.feels_like?.eve.toFixed(0)} &deg;C</td>
              <td>{day?.feels_like?.night.toFixed(0)} &deg;C</td>
            </tr>
          </tbody>
        </Table>
        <div className="d-flex gap-4">
          <div className="sunrise">
            <p className='text-uppercase text-secondary mb-0'>sunrise</p>
            <p className='mb-0'>{moment(day?.sunrise * 1000).format('hh:mm a')}</p>
          </div>
          <div className="sunset">
            <p className='text-uppercase text-secondary mb-0'>sunset</p>
            <p className='mb-0'>{moment(day?.sunset * 1000).format('hh:mm a')}</p>
          </div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  </>
}

export default WeatherForecast