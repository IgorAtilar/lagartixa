import { Input } from '@/components/ui/input';
import { getMe } from '@/data/user';
import { getDashboardUrl } from '@/helpers/urls';
import Image from 'next/image';
import Link from 'next/link';
import { LoggedMenu } from './_components/menu';

export default async function LoggedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { nickname } = await getMe();
  console.log('nickname', nickname);

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='sticky top-0 flex justify-between items-center px-3 py-4 bg-transparent backdrop-blur-lg z-10'>
        <div className='flex justify-between items-center w-full max-w-screen-xl mx-auto'>
          <Link href={getDashboardUrl()}>
            <Image
              src='/assets/logo-full.png'
              alt='Logo'
              width={120}
              height={40}
            />
          </Link>
          <Input type='search' placeholder='Pesquisar' className='w-96' />
          <LoggedMenu />
        </div>
      </header>
      <main className='flex flex-col px-4 pt-8 pb-8 w-full max-w-screen-xl mx-auto'>
        {children}
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
