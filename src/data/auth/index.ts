import { User } from '@/types/User';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const getAuthUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  return `${baseUrl}/auth${path}`;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User> => {
  try {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const url = getAuthUrl('/login');

    const response = await fetch(url, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {} as User;
  }
};

export const signup = async ({
  email,
  nickname,
  password,
}: {
  email: string;
  password: string;
  nickname: string;
}): Promise<User> => {
  try {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const url = getAuthUrl('/signup');

    await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password, nickname }),
    });

    return await login({ email, password });
  } catch (error) {
    console.error(error);
    return {} as User;
  }
};

export const logout = async () => {
  const values = await cookies();

  values.delete('token');

  redirect('/');
};
