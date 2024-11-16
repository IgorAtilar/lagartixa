import { cache } from 'react';
import { PricesChart } from '@/components/ui/prices-chart';
import { fetchCoinPriceHistory } from '@/data/coins';

type Props = {
  id: string;
  name: string;
};

const getCoinPriceHistory = cache(fetchCoinPriceHistory);

export const CoinPriceHistoryChartSkeleton = () => {
  return (
    <div
      aria-label='Carregando...'
      aria-busy='true'
      className='w-full h-72 bg-gray-400 rounded-md animate-pulse'
    />
  );
};

const CoinPriceHistoryChart = async ({ id }: { id: string }) => {
  const { prices } = await getCoinPriceHistory(id);

  return <PricesChart data={prices} />;
};

export async function CoinPriceHistory({ id, name }: Props) {
  return (
    <div className='flex flex-col'>
      <h2 className='text-xl font-staatliches mb-4'>
        Histórico de Preço do {name}
      </h2>
      <CoinPriceHistoryChart id={id} />
    </div>
  );
}
