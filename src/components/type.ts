export type Series = {
  time: number;
  value: number;
};

export type Pair = {
  series: Series[];
  priceChangePercentage: number;
  maxValue: number;
  minValue: number;
};

export type Price = {
  [ATOM: string]: Pair;
  ntrn: Pair;
};
