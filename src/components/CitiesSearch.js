import './components.scss'
import Select from 'react-select';

function CitiesSearch({ foundCites, handleSubmit, handleChange, cityName, getNewWeather }) {
  const options = foundCites?.map(city => ({
    value: city?.id,
    label: `${city?.name}, ${city?.sys?.country}`,
    coord: city?.coord
  }));

  return <div className='cities-search col-lg-6'>
    <Select
      className='cities-select-container'
      classNamePrefix='cities-select'
      placeholder='Search city'
      onKeyDown={handleSubmit}
      inputValue={cityName}
      onInputChange={(inputValue) => handleChange(inputValue)}
      options={options}
      onChange={(value) => getNewWeather(value)}
      styles={{
        menu: (baseStyles, state) => ({
          ...baseStyles,
          display: state?.options?.length ? 'block' : 'none',
        })
      }}
    />
  </div>
}

export default CitiesSearch