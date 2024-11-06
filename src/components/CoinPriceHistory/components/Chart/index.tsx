'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type Props = {
  history: number[];
};

const formatCurrency = (value: number) => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export function Chart({ history }: Props) {
  const data = history.map((price, index) => ({
    time: new Date(
      Date.now() - (7 - index) * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    price,
  }));

  return (
    <div className='w-full h-72 mb-4'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid strokeDasharray='5 5' stroke='#e0e0e0' />
          <XAxis dataKey='time' stroke='rgb(251, 146, 60)' /> {/* Zinc-900 */}
          <YAxis stroke='rgb(251, 146, 60)' /> {/* Zinc-900 */}
          <Tooltip formatter={(value) => formatCurrency(value as number)} />
          <Legend />
          <Line
            type='monotone'
            dataKey='price'
            stroke='rgb(251, 146, 60)' // Orange-400
            strokeWidth={2}
            dot={{ stroke: 'rgb(251, 146, 60)', strokeWidth: 2, fill: '#fff' }} // Pontos brancos
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
