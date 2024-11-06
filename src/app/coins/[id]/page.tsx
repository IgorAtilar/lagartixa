import Image from 'next/image';
import Link from 'next/link';
import { List } from '@phosphor-icons/react/dist/ssr';
import { getCoin } from '@/data/coins';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log('id aq', id);

  const coin = await getCoin(id);

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
        <div className='hidden md:flex gap-6'>
          <button className='bg-orange-400 px-4 py-2 rounded-md text-zinc-900 max-w-fit'>
            Cadastre-se
          </button>
          <button className='bg-zinc-800 px-4 py-2 rounded-md text-gray-100 max-w-fit'>
            Entrar
          </button>
        </div>
      </header>
      <main className='flex flex-col px-4 pt-8 pb-8'>
        <h1 className='font-staatliches text-4xl pb-3 md:text-6xl text-orange-400'>
          {coin.name}
        </h1>
        <p>{(coin as any).description.en}</p>
      </main>
      <footer className='text-center px-3 py-4 bg-zinc-900 text-orange-400 mt-auto'>
        Lagartixa© 2024
      </footer>
    </div>
  );
}
