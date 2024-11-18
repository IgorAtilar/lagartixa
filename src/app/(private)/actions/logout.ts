'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const logout = async () => {
  const values = await cookies();
  values.delete('token');
  redirect('/');
};
