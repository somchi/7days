import { Price, Series } from '../components/type';
import { ATOM, CHAIN_ID, NTRN, RANGE } from './contants';

const encodeJson = () => {
  const data = {
    json: {
      tokens: [ATOM, NTRN],
      chainId: CHAIN_ID,
      dateRange: RANGE,
    },
  };
  const data2Str = JSON.stringify(data);
  const code = encodeURIComponent(data2Str);
  return code;
};

export const responseSchema = (code: number, data: any) => {
  return { status: code, data: data };
};

export const getData = async () => {
  const input = encodeJson();
  const url = `https://app.astroport.fi/api/trpc/charts.prices?input=${input}`;
  try {
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();

    if (response.status === 200) {
      return responseSchema(response.status, data.result.data.json);
    } else {
      return responseSchema(response.status, data.error.json.message);
    }
  } catch (error: any) {
    return responseSchema(500, error.message);
  }
};

export const generateLabel = (data: Price) => {
  let result: number[] = [];
  const atom = data[ATOM];
  const ntrn = data[NTRN];

  const atomLabel = atom.series.map((item) => item.time);
  const ntrnLabel = ntrn.series.map((item) => item.time);

  const labels = [...atomLabel, ...ntrnLabel];
  const removeDuplicates = new Set(labels);
  result = [...removeDuplicates];
  return result;
};

export const generateDataSet = (data: Price, pair: string): number[] => {
  let result: number[] = [];
  const copyData: Series[] = [...data[pair].series];
  result = copyData.map((item) => item.value);
  return result;
};

export const isObjEmpty = (obj: any) => {
  if (Object.keys(obj || {}).length === 0) {
    return true;
  }
  return false;
};

export const unixTime2Date = (time: number) => {
  const date = new Date(time * 1000);
  const format = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  return format;
};
