import { User, UserCoin } from '@/types/User';
import { cookies } from 'next/headers';

const getUserUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  return `${baseUrl}/users${path}`;
};

export const getMe = async (): Promise<User> => {
  try {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const url = getUserUrl('/me');

    const value = await cookies();
    headers.append('Authorization', `Bearer ${value.get('token')?.value}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {} as User;
  }
};

export const getMyCoins = async () => {
  try {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const url = getUserUrl('/me/coins');

    const value = await cookies();
    headers.append('Authorization', `Bearer ${value.get('token')?.value}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
      next: {
        tags: ['user-coins'],
      },
    });

    const data = await response.json();
    return data as UserCoin[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const removeCoin = async (coinId: string) => {
  try {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const url = getUserUrl(`/me/coins/${coinId}`);

    const value = await cookies();
    headers.append('Authorization', `Bearer ${value.get('token')?.value}`);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: headers,
    });

    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const addCoin = async (id: string, amount: number) => {
  try {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const url = getUserUrl(`/me/coins`);

    const value = await cookies();
    headers.append('Authorization', `Bearer ${value.get('token')?.value}`);

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ id, amount }),
    });

    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};
