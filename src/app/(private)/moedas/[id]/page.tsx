import { CoinPriceHistory } from '@/app/(public)/_components/CoinPriceHistory';
import { fetchCoin } from '@/data/coins';
import { Metadata } from 'next';
import Image from 'next/image';
import { cache } from 'react';

const getCoin = cache(fetchCoin);

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  const coin = await getCoin(id);

  return {
    title: `Lagartixa | ${coin.name}`,
  };
}

export default async function CoinPage({ params }: Props) {
  const { id } = await params;

  const coin = await getCoin(id);

  return (
    <div>
      <a
        href={coin.homepageUrl}
        target='_blank'
        className='flex w-max gap-2 items-center pb-4 font-normal'
        rel='noopener noreferrer'
        aria-label={`Visite a página oficial de ${coin.name}`}
      >
        <Image src={coin.image} alt={coin.name} width={64} height={64} />
        <h1 className='font-staatliches text-4xl md:text-6xl text-primary'>
          {coin.name}
        </h1>
      </a>
      <article className='flex flex-col gap-4'>
        {!!coin.marketCapRank && (
          <section aria-labelledby='market-rank'>
            <h2 id='market-rank' className='font-staatliches text-2xl'>
              Rank de capitalização de mercado:
            </h2>
            <p className='font-roboto'>{coin.marketCapRank}</p>
          </section>
        )}
        {!!coin.genesisDate && (
          <section aria-labelledby='genesis-date'>
            <h2 id='genesis-date' className='font-staatliches text-2xl'>
              Data de início:
            </h2>
            <time className='font-roboto' dateTime={coin.genesisDate}>
              {new Date(coin.genesisDate).toLocaleDateString()}
            </time>
          </section>
        )}
        <section aria-labelledby='current-price'>
          <h2 id='current-price' className='font-staatliches text-2xl'>
            Valor atual:
          </h2>
          <p className='font-roboto'>
            <strong>
              {coin.currentPrice.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </strong>
          </p>
        </section>
        {!!coin.description && (
          <section aria-labelledby='description'>
            <h2 id='description' className='font-staatliches text-2xl'>
              Descrição:
            </h2>
            <div
              className='[&>a]:text-primary'
              dangerouslySetInnerHTML={{ __html: coin.description }}
            />
          </section>
        )}
        {!!coin.categories.length && (
          <section aria-labelledby='categories'>
            <h2 id='categories' className='font-staatliches text-2xl'>
              Categorias:
            </h2>
            <ul className='list-disc list-inside'>
              {coin.categories.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          </section>
        )}
        <section className='w-full md:max-w-[50%]'>
          <CoinPriceHistory id={coin.id} name={coin.name} />
        </section>
      </article>
    </div>
  );
}
