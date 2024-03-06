import { Price } from './type';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { options } from '../helpers/chart-config';
import { useCallback, useMemo } from 'react';
import {
  generateDataSet,
  generateLabel,
  unixTime2Date,
} from '../helpers/utils';
import { ATOM, NTRN } from '../helpers/contants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.color = '#fff';

type Props = {
  data: Price;
};
export const PriceChart = ({ data }: Props) => {
  const formatData = useCallback(() => {
    const labels = generateLabel(data);
    const atomData = generateDataSet(data, ATOM);
    const ntrnData = generateDataSet(data, NTRN);
    const chartData = {
      labels: labels.map((item) => unixTime2Date(item)),
      datasets: [
        {
          label: 'ATOM',
          data: atomData.map((itm) => itm),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          yAxisID: 'y',
          fill: true,
          pointRadius: 0,
          fillColor: '#ffff00',
          strokeColor: '#000000',
        },
        {
          label: 'NTRN',
          data: ntrnData.map((itm) => itm),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          yAxisID: 'y1',
          fill: true,
          pointStyle: 'circle',
          pointRadius: 0,
          fillColor: '#ffff00',
          strokeColor: '#000000',
        },
      ],
    };
    return chartData;
  }, [data]);

  const chartData = useMemo(() => {
    return formatData();
  }, [formatData]);

  const averageAtomPrice = useMemo(() => {
    const prices: any = generateDataSet(data, ATOM);
    const sum = prices.reduce(
      (acc: any, curr: any) => acc + parseFloat(curr),
      0
    );
    const average = sum / prices.length;
    return average;
  }, [data]);

  const averageNtrnPrice = useMemo(() => {
    const prices: any = generateDataSet(data, NTRN);
    const sum = prices.reduce(
      (acc: any, curr: any) => acc + parseFloat(curr),
      0
    );
    const average = sum / prices.length;
    return average;
  }, [data]);

  return (
    <div className="price-container">
      <div className="chart">
        <Line options={options} data={chartData} />
      </div>
      <div className="summary">
        <h3>Chart Summary</h3>
        <div>
          <p>
            x-axes: <em>Time</em>
          </p>
          <p>
            y-axes: <em>Price (left: Atom, right: NTRN)</em>
          </p>
        </div>
        <div className="pairSummary">
          <div>
            <h4>
              Atom{' '}
              <em
                className="percent"
                style={{
                  color:
                    Math.sign(data[ATOM].priceChangePercentage) === 1
                      ? '#1EE0AC'
                      : '#E85347',
                }}
              >
                ({data[ATOM].priceChangePercentage.toFixed(2)}%)
              </em>
            </h4>
            <p>
              Average Price: <em>{averageAtomPrice.toFixed(2)}</em>
            </p>
            <p>
              Minimum Price: <em>{data[ATOM].minValue}</em>
            </p>
            <p>
              Maximum Price: <em>{data[ATOM].maxValue}</em>
            </p>
          </div>
          <div>
            <h4>
              NTRN{' '}
              <em
                className="percent"
                style={{
                  color:
                    Math.sign(data[NTRN].priceChangePercentage) === 1
                      ? '#1EE0AC'
                      : '#E85347',
                }}
              >
                ({data[NTRN].priceChangePercentage.toFixed(2)}%)
              </em>
            </h4>
            <p>
              Average Price: <em>{averageNtrnPrice.toFixed(2)}</em>
            </p>
            <p>
              Minimum Price: <em>{data[NTRN].minValue}</em>
            </p>
            <p>
              Maximum Price: <em>{data[NTRN].maxValue}</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
