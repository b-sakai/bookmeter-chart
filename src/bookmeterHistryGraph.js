import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import bookData from './python/book_data.json';
import 'chartjs-adapter-moment';

Chart.register(...registerables);

const calculateCumulative = (data) => {
  let cumulative = 0;
  return data.map((value) => {
    const intValue = parseInt(value, 10);
    cumulative += intValue;
    return cumulative;
  });
};

const parseDate = (dateString) => new Date(dateString);

const BookmeterChart = () => {
  const cumulativePages = calculateCumulative(bookData.pages);

  const chartData = {
    labels: bookData.dates.map(parseDate),
    datasets: [
      {
        label: 'Pages',
        data: bookData.pages.map((value) => parseInt(value, 10)),
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
      },
      {
        label: 'Cumulative Pages',
        data: cumulativePages,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'YYYY/MM/DD', // ツールチップに表示される日付のフォーマット
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Bookmeter Chart</h2>
      <div style={{ width: '80%', margin: 'auto' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BookmeterChart;
