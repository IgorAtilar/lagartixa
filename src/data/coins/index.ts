import { Coin, CoinDetails, SearchCoin } from '@/types/Coin';
import { CoinHistory } from '@/types/CoinHistory';

const getCoinsUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  return `${baseUrl}/coins${path}`;
};

export const fetchTopCoins = async (): Promise<Coin[]> => {
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

export const fetchCoinPriceHistory = async (
  id: string
): Promise<CoinHistory> => {
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
    return { prices: [] } as CoinHistory;
  }
};

export const fetchCoin = async (id: string): Promise<CoinDetails> => {
  try {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const url = getCoinsUrl(`/${id}`);

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {} as CoinDetails;
  }
};

export const fetchSearchCoins = async (
  query: string
): Promise<SearchCoin[]> => {
  try {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const url = getCoinsUrl(`/search/${query}`);

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
