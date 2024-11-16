import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col gap-y-4 items-center justify-center h-screen px-4'>
      <Link href='/'>
        <Image
          src='/assets/logo-full.png'
          alt='Logo'
          width={160}
          height={52}
          priority
        />
      </Link>
      {children}
    </div>
  );
}
