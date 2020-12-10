import React, { useState } from 'react';
import App from './App';
import { bigUrl, littleUrl } from './helper/url';

export default function Routing() {
  const [, setLoading] = useState('false');
  const [loadedData, setLoadedData] = useState('');

  async function littleData() {
    setLoading('true');
    const res = await fetch(littleUrl);
    setLoadedData(await res.json());
    setLoading('false');
  }
  async function bigData() {
    setLoading('true');
    const res = await fetch(bigUrl);
    setLoadedData(await res.json());
    setLoading('false');
  }
  return (
    <>
      {loadedData === '' && (
        <>
          <button onClick={littleData} className="LittleData">
            Мало данных
          </button>
          <button onClick={bigData} className="bigData">
            Много данных
          </button>
        </>
      )}
      {loadedData !== '' && <App loadedData={loadedData} />}
    </>
  );
}
