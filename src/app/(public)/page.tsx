import Image from 'next/image';
import Link from 'next/link';

import { TopCoinsHistorySection } from './_components/TopCoinsHistorySection';
import { TopCoinsSection } from './_components/TopCoinsSection';
import { getLoginUrl, getSignupUrl } from '@/helpers/urls';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { HomeMenu } from './_components/home-menu';

export default async function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='sticky top-0 flex justify-between items-center px-3 py-4 bg-transparent backdrop-blur-lg z-10'>
        <div className='flex justify-between items-center w-full max-w-screen-xl mx-auto'>
          <Link href='/'>
            <Image
              src='/assets/logo-full.png'
              alt='Logo'
              width={120}
              height={40}
            />
          </Link>
          <HomeMenu>
            <Button variant='ghost' className='md:hidden' size='icon'>
              <Menu />
            </Button>
          </HomeMenu>
          <div className='hidden md:flex gap-2'>
            <Button asChild className='w-28'>
              <Link href={getSignupUrl()}>Cadastre-se</Link>
            </Button>
            <Button asChild variant='secondary' className='w-28'>
              <Link href={getLoginUrl()}>Entrar</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className='flex flex-col px-4 pt-8 pb-8 w-full max-w-screen-xl mx-auto'>
        <div className='flex flex-col md:flex-row gap-6'>
          <section className='flex flex-col justify-center items-center md:items-start md:justify-start md:max-w-2xl'>
            <h1 className='font-staatliches text-4xl pb-3 md:text-6xl'>
              Sua Plataforma para Favoritar e Acompanhar{' '}
              <span className='text-primary'>Criptos</span> em Tempo Real
            </h1>
            <p className='text-base pb-4 md:text-2xl'>
              Cadastre-se gratuitamente, salve suas criptomoedas favoritas e
              acompanhe os gráficos e tendências do mercado com facilidade.
            </p>
            <Button asChild>
              <Link href={getSignupUrl()}>Cadastre-se</Link>
            </Button>
          </section>
          <TopCoinsSection className='mb-4' />
        </div>
        <TopCoinsHistorySection />
      </main>
      <footer className='flex px-3 py-4 bg-primary text-background mt-auto'>
        <div className='flex gap-8 w-full max-w-screen-xl mx-auto'>
          <div className='flex flex-col items-center gap-2'>
            <Image
              src='/assets/logo-full.png'
              alt='Logo'
              width={120}
              height={40}
            />
            <p>© 2024 Lagartixa</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
