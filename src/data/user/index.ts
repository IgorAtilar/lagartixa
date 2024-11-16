import { User } from '@/types/User';
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
    console.log('data', data);
    return data;
  } catch (error) {
    console.log('error', error);
    console.error(error);
    return {} as User;
  }
};
