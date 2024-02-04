import React from 'react';
import bookData from './python/book_data.json';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js"
Chart.register(...registerables)


const BookmeterChart = () => {
  const chartData = {
    labels: bookData.dates,
    datasets: [
      {
        label: 'Cumulative Pages',
        data: bookData.pages,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
      },
    ],
  };

  return (
    <div>
      <h2>Cumulative Pages Chart</h2>
      <div style={{ width: '80%', margin: 'auto' }}>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default BookmeterChart
