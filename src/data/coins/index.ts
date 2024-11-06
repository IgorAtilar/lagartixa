import { Coin } from '@/types/Coin';

const getCoinsUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  return `${baseUrl}/coins${path}`;
};

export const getTopCoins = async (): Promise<Coin[]> => {
  try {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const url = getCoinsUrl('/top');

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCoinPriceHistory = async (id: string): Promise<number[]> => {
  try {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const url = getCoinsUrl(`/${id}/history`);

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCoin = async (id: string): Promise<Coin> => {
  try {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const url = getCoinsUrl(`/${id}`);

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    const data = await response.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.error(error);
    return {} as Coin;
  }
};
