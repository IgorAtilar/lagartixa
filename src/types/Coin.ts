export type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: number;
  sparklineIn7d: number[];
};

export type SearchCoin = {
  id: string;
  symbol: string;
  name: string;
  marketCapRank: number | null;
  thumb: string;
  large: string;
};

export type CoinDetails = {
  id: string;
  symbol: string;
  name: string;
  description: string;
  categories: string[];
  image: string;
  currentPrice: number;
  marketCapRank: number;
  homepageUrl: string;
  genesisDate: string;
};
