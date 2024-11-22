import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { fetchSearchCoins } from '@/data/coins';
import { getCoinUrl } from '@/helpers/urls';
import { Plus } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { handleAddCoin } from './actions';
import { cache } from 'react';

type Props = {
  searchParams?: Promise<{
    query?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { query = '' } = (await searchParams) || {};

  return {
    title: `Lagartixa | Busca por: ${query}`,
  };
}

const searchCoins = cache(fetchSearchCoins);

export default async function SearchPage({ searchParams }: Props) {
  const { query = '' } = (await searchParams) || {};

  const coins = await searchCoins(query);

  return (
    <div>
      <h1 className='font-staatliches text-2xl mb-2'>
        Resultados para: {query}
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {coins.map(({ id, name, symbol, large }) => (
          <Card key={id} className='p-2'>
            <CardHeader className='flex flex-row justify-between items-center'>
              <div className='relative flex justify-center items-center bg-primary w-[82px] h-[82px] rounded-full'>
                <Image
                  className='object-cover rounded-full'
                  src={large}
                  alt={name}
                  fill
                />
              </div>
              <form action={handleAddCoin}>
                <input type='hidden' name='coinId' value={id} />
                <Button size='icon' type='submit'>
                  <Plus />
                </Button>
              </form>
            </CardHeader>
            <CardContent>
              <CardTitle className='truncate'>{name}</CardTitle>
              <CardDescription>{symbol}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild variant='outline'>
                <Link href={getCoinUrl(id)}>Ver mais</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
