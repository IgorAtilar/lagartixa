import { fetchCoin } from '@/data/coins';

export default async function CoinPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const coin = await fetchCoin(id);

  return (
    <div>
      <h1 className='font-staatliches text-4xl pb-3 md:text-6xl text-primary'>
        {coin.name}
      </h1>
      <p>{coin.description}</p>
    </div>
  );
}
