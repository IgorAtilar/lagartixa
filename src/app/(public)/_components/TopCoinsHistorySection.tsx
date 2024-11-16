import { cache } from 'react';
import { fetchTopCoins } from '@/data/coins';
import { CoinPriceHistory } from './CoinPriceHistory';
import { cn } from '@/lib/utils';

type TopCoinsHistorySectionProps = {
  className?: string;
};

const getTopCoins = cache(fetchTopCoins);

const TOP_COINS_LIMIT = 2;

const TopCoinsHistory = async () => {
  const topCoins = await getTopCoins();

  const topCoinsToDisplay = topCoins.slice(0, TOP_COINS_LIMIT);

  return (
    <>
      {topCoinsToDisplay.map((coin) => (
        <div key={coin.id}>
          <CoinPriceHistory id={coin.id} name={coin.name} />
        </div>
      ))}
    </>
  );
};

export const TopCoinsHistorySection = async ({
  className,
}: TopCoinsHistorySectionProps) => {
  return (
    <section className={cn('flex flex-col gap-6', className)}>
      <h2 className='font-staatliches text-2xl'>Histórico de Preço</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 place-content-center'>
        <TopCoinsHistory />
      </div>
    </section>
  );
};
