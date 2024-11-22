import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchCoin } from '@/data/coins';
import { getMyCoins, removeCoin } from '@/data/user';
import { revalidateTag } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { cache } from 'react';
import { getCoinUrl } from '../../../helpers/urls';
import { cn } from '@/lib/utils';

type UserWalletProps = {
  className?: string;
};

const getCoin = cache(fetchCoin);

async function CoinRow({ id, amount }: { id: string; amount: number }) {
  const { currentPrice, image, name } = await getCoin(id);
  const value = currentPrice * amount;

  async function handleRemoveCoin() {
    'use server';

    await removeCoin(id);

    revalidateTag('user-coins');
  }

  return (
    <TableRow>
      <TableCell>
        <Link
          href={getCoinUrl(id)}
          className='flex gap-2 items-center group hover:text-primary transition-colors'
        >
          <Image src={image} alt={name} width={24} height={24} />
          {name}
        </Link>
      </TableCell>
      <TableCell>
        {value.toLocaleString('en-US', {
          currency: 'USD',
          style: 'currency',
        })}
      </TableCell>
      <TableCell>
        <Button variant='destructive' onClick={handleRemoveCoin}>
          Remover
        </Button>
      </TableCell>
    </TableRow>
  );
}

export async function UserWallet({ className }: UserWalletProps) {
  const coins = await getMyCoins();

  return (
    <Table className={cn(className, 'table-fixed')}>
      <TableCaption>Lista das suas criptomoedas salvas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Moeda</TableHead>
          <TableHead>Valor atual</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {coins.map((coin) => (
          <CoinRow key={coin.id} {...coin} />
        ))}
      </TableBody>
    </Table>
  );
}
