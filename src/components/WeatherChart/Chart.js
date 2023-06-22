import { Bar, Line } from 'react-chartjs-2';
import moment from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function Chart({ hourlyForecast }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
    );
    const [swap, setSwap] = useState(true);

    const labels = hourlyForecast.map(e => e = moment(e.dt * 1000).format("h a"));
  
    const optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
          font: {
            size: 20
          }
        },
        ticks: {
          callback: (value, index) => {
            return index % 2 === 0 ? labels[value] : '';
          },
          font: {
            size: 10
          },
          maxRotation: 0, 
          minRotation: 0
        }
      },
      y: {
        title: {
          display: true,
          text: "C°",
          font: {
            size: 20
          }
        },
      }
    }
    
  };
  const dataLine = {
    labels,
    datasets: [{
      label: "°C",
      data: hourlyForecast.map(el => el = el.temp),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      pointRadius: 0,
      tension: .4
    },
    ],
  };

  const optionsBar = {
    ...optionsLine,
    scales: {
      ...optionsLine.scales,
      y: {
        title: {
          display: true,
          text: "%",
          font: {
            size: 20
          }
        },
      }
    }
  }

  const dataBar = {
    labels,
    datasets: [{
      type: "bar",
      label: "%",
      data: hourlyForecast.map(e => e = e.pop * 100),
      borderColor: 'rgb(255, 99, 137)',
      backgroundColor: 'rgba(255, 99, 137, 0.5)',
    }]
  }

  function handleChange() {
    setSwap(!swap);
  }
  return <>
    <Button variant='light' onClick={handleChange} className='mb-2'>
      {swap ? "Show rain" : "Show temp"}
    </Button>
    {swap ? <Line data={dataLine} options={optionsLine} /> : <Bar data={dataBar} options={optionsBar} />}
  </>
}

export default Chart