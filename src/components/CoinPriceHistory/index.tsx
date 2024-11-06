import { getCoinPriceHistory } from '@/data/coins';
import { Chart } from './components/Chart';

type Props = {
  id: string;
  name: string;
};

export async function CoinPriceHistory({ id, name }: Props) {
  const coinPriceHistory = await getCoinPriceHistory(id);

  return (
    <div className='flex flex-col'>
      <h2>Histórico de Preço do {name}</h2>
      <Chart history={coinPriceHistory} />
    </div>
  );
}
