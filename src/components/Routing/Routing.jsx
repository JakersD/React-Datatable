import React, { useState } from 'react';
import Datatable from '../Datatable/Datatable';
import { bigUrl, littleUrl } from '../../helper/url';

import Loadingwheel from './Loadingwheel/Loadingwheel';

export default function Routing() {
  const [loading, setLoading] = useState('false');
  const [loadedData, setLoadedData] = useState('');

  const littleData = async () => {
    setLoading('true');
    const res = await fetch(littleUrl);
    setLoadedData(await res.json());
    setLoading('false');
  };
  const bigData = async () => {
    setLoading('true');
    const res = await fetch(bigUrl);
    setLoadedData(await res.json());
    setLoading('false');
  };
  return (
    <>
      {loadedData === '' && (
        <div className="buttonContainer">
          <button onClick={littleData} className="littleData">
            Мало данных
          </button>
          <button onClick={bigData} className="bigData">
            Много данных
          </button>
          {loading === 'true' && <Loadingwheel />}
        </div>
      )}
      {loadedData !== '' && <Datatable loadedData={loadedData} setLoadedData={setLoadedData} />}
    </>
  );
}
