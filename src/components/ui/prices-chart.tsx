'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const chartConfig = {
  price: {
    label: 'Valor ',
    color: '#fb923c',
  },
  date: {
    label: 'Data',
    color: '#fb923c',
  },
  formattedPrice: {
    label: 'Valor',
    color: '#fb923c',
  },
} satisfies ChartConfig;

type Props = {
  data: number[];
};

const formatCurrency = (value: number) => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
  }).format(new Date(date));
};

function generateChartData(values: number[]) {
  return values.map((price, index) => ({
    date: new Date(
      Date.now() - (values.length - 1 - index) * 24 * 60 * 60 * 1000
    ).toISOString(),
    price,
    formattedPrice: formatCurrency(price),
  }));
}

export function PricesChart({ data: values }: Props) {
  const chartData = generateChartData(values);

  return (
    <ChartContainer config={chartConfig} className='w-full min-h-72'>
      <LineChart data={chartData} accessibilityLayer>
        <CartesianGrid strokeDasharray='5 5' />
        <XAxis
          dataKey='date'
          stroke='#fb923c'
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'short',
            })
          }
        />
        <YAxis stroke='#fb923c' tickFormatter={formatCurrency} width={100} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator='dashed'
              labelFormatter={formatDate}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          type='monotone'
          dataKey='price'
          stroke='#fb923c'
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ChartContainer>
  );
}
