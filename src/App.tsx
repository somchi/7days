import React, { useEffect, useState } from 'react';
import './App.css';
import { PriceChart } from './components/PriceChart';
import { Price } from './components/type';
import { getData, isObjEmpty } from './helpers/utils';

function App() {
  const [data, setData] = useState<Price>({} as Price);
  const [errMsg, setErrMsg] = useState<string>('');

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    const res = await getData();
    if (res.status === 200) {
      setData(res.data);
    } else {
      setErrMsg(res.data);
    }
  };

  return (
    <div className="App">
      <h2>Price Chart</h2>
      {!isObjEmpty(data) ? (
        <PriceChart data={data} />
      ) : (
        <div>
          {errMsg !== '' ? (
            <p className="error">{errMsg}</p>
          ) : (
            <p>...Loading</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
