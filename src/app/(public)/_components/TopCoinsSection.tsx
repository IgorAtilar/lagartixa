import Image from 'next/image';
import Link from 'next/link';
import { cache } from 'react';
import { fetchTopCoins } from '@/data/coins';
import { cn } from '@/lib/utils';

type TopCoinsProps = {
  className?: string;
};

const getTopCoins = cache(fetchTopCoins);

const TopCoinsTable = async () => {
  const topCoins = await getTopCoins();

  return (
    <table className='table-auto w-full'>
      <tbody>
        {topCoins.map((coin) => (
          <tr key={coin.id}>
            <td>
              <Link
                href={`/coins/${coin.id}`}
                className='flex gap-2 items-center group'
              >
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={32}
                  height={32}
                />
                <span className='font-staatliches group-hover:text-orange-400 transition-colors'>
                  {coin.symbol.toUpperCase()}
                </span>
                <span className='group-hover:text-orange-400 transition-colors'>
                  {coin.name}
                </span>
              </Link>
            </td>
            <td>
              {coin.currentPrice.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const TopCoinsSection = ({ className }: TopCoinsProps) => {
  return (
    <section className={cn('flex flex-col gap-6', className)}>
      <h2 className='font-staatliches text-2xl'>Populares</h2>
      <TopCoinsTable />
    </section>
  );
};