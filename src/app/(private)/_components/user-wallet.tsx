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

type UserWalletProps = {
  className?: string;
};

async function CoinRow({ id, amount }: { id: string; amount: number }) {
  const { currentPrice, image, name } = await fetchCoin(id);
  const value = currentPrice * amount;

  async function handleRemoveCoin() {
    'use server';

    await removeCoin(id);

    revalidateTag('user-coins');
  }

  return (
    <TableRow>
      <TableCell>
        <Image src={image} alt={name} width={24} height={24} />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{amount}</TableCell>
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
    <Table className={className}>
      <TableCaption>Lista das suas criptomoedas salvas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Valor</TableHead>
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
