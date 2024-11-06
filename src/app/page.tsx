import Image from 'next/image';
import { List } from '@phosphor-icons/react/dist/ssr';
import { getTopCoins } from '@/data/coins';
import Link from 'next/link';
import { CoinPriceHistory } from '@/components/CoinPriceHistory';

export default async function Home() {
  const topCoins = await getTopCoins();

  return (
    <div className='flex flex-col min-h-screen max-w-screen-xl mx-auto'>
      <header className='sticky top-0 flex justify-between items-center px-3 py-4 bg-zinc-900'>
        <Link href='/'>
          <Image
            src='/assets/logo-full.png'
            alt='Logo'
            width={120}
            height={120}
          />
        </Link>
        <button className='md:hidden'>
          <List className='w-6 h-6' />
        </button>
        <form className='hidden md:flex px-4 py-1 rounded-md ring-1 ring-zinc-600 w-80 focus-within:ring-orange-400 transition-all'>
          <input
            placeholder='Buscar criptomoeda'
            className='bg-transparent outline-none'
          />
        </form>
        <div className='hidden md:flex gap-2'>
          <button className='bg-orange-400 px-4 py-2 rounded-md text-zinc-900 max-w-fit'>
            Cadastre-se
          </button>
          <button className='bg-zinc-800 px-4 py-2 rounded-md text-gray-100 w-[116px]'>
            Entrar
          </button>
        </div>
      </header>
      <main className='flex flex-col px-4 pt-8 pb-8'>
        <div className='flex flex-col md:flex-row gap-6'>
          <section className='flex flex-col justify-center items-center md:items-start md:justify-start md:max-w-2xl'>
            <h1 className='font-staatliches text-4xl pb-3 md:text-6xl'>
              Sua Plataforma para Favoritar e Acompanhar{' '}
              <span className='text-orange-400'>Criptos</span> em Tempo Real
            </h1>
            <p className='text-base pb-4 md:text-2xl'>
              Cadastre-se gratuitamente, salve suas criptomoedas favoritas e
              acompanhe os gráficos e tendências do mercado com facilidade.
            </p>
            <button className='bg-orange-400 px-4 py-2 rounded-md text-zinc-900 max-w-fit'>
              Cadastre-se
            </button>
          </section>
          <section className='flex flex-col gap-6 mb-4'>
            <h2 className='font-staatliches text-2xl'>Populares</h2>
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
          </section>
        </div>
        <section className='flex flex-col gap-6'>
          <h2 className='font-staatliches text-2xl'>Histórico de Preço</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 place-content-center'>
            {topCoins.slice(0, 2).map((coin) => (
              <div key={coin.id}>
                <CoinPriceHistory id={coin.id} name={coin.name} />
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className='text-center px-3 py-4 bg-zinc-900 text-orange-400 mt-auto'>
        Lagartixa© 2024
      </footer>
    </div>
  );
}
