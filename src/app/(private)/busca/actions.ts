import { addCoin } from '@/data/user';
import { getDashboardUrl } from '@/helpers/urls';
import { redirect } from 'next/navigation';

export async function handleAddCoin(formData: FormData) {
  'use server';
  const coinId = formData.get('coinId') as string;
  await addCoin(coinId, 1);

  redirect(getDashboardUrl());
}
