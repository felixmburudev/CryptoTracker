import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import axios from "axios";
import moment from "moment";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Chart = ({ crypto }) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const toDate = moment().unix();
        const fromDate = moment().subtract(7, 'days').unix(); // Fetching data for the last 7 days

        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${crypto.id}/market_chart/range?vs_currency=usd&from=${fromDate}&to=${toDate}`
        );

        setResponse(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchChartData();
  }, [crypto]);

  if (!response) {
    return (
      <div className="Error-container">
        <div className="error">
          Error fetching data
        </div>
      </div>
    );
  }

  const coinChartData = response.prices.map(value => ({ x: value[0], y: value[1].toFixed(2) }));

  const options = {
    responsive: true
  };

  const data = {
    labels: coinChartData.map(value => moment(value.x).format('MMM DD')),
    datasets: [
      {
        fill: true,
        label: crypto.name,
        data: coinChartData.map(val => val.y),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}

export default Chart;
