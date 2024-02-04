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
  const pagesData = bookData.pages.map((value) => parseInt(value, 10));
  const booksTitleData = bookData.books;
  const cumulativePagesData = calculateCumulative(bookData.pages);

  const chartData = {
    labels: bookData.dates.map(parseDate),
    datasets: [
      {
        label: 'Pages',
        data: pagesData,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
      },
      {
        label: 'Cumulative Pages',
        data: cumulativePagesData,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
        yAxisID: 'cumulativePagesYAxis', // Cumulative Pages専用の軸を指定
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'year',
          tooltipFormat: 'yyyy/MM/DD',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Pages',
        },
      },
      cumulativePagesYAxis: {
        beginAtZero: true,
        position: 'right',
        title: {
          display: true,
          text: 'Cumulative Pages',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const value = context.dataset.data[index];
            const bookDataString = JSON.stringify(booksTitleData[index], null, 2);
            
            const lines = [
              `${value}p`,
              ...bookDataString.split('\n')
            ];
            return lines
          },
        },
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
