import React, { useEffect, useState } from 'react';
import Pagination from './components/Pagination';

export default function App({ loadedData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(20);
  const [sortedData, setSortedData] = useState(loadedData);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = sortedData.slice(indexOfFirstData, indexOfLastData);

  const sortByLowerHigher = () => {
    setSortedData(sortedData.slice().sort((a, b) => a.id - b.id));
  };

  return (
    <div className="wrapper">
      <div className="Table">
        <div className="THeading">
          <div className="TRow">
            <div className="THead" onClick={sortByLowerHigher}>
              ID
            </div>
            <div className="THead">Name</div>
            <div className="THead">Surname</div>
            <div className="THead">Email</div>
            <div className="THead">Phone</div>
          </div>
        </div>
        {currentData.map((v, i) => (
          <div className="TBody" key={i}>
            <div className="TRow">
              <div className="TCell">{v.id}</div>
              <div className="TCell">{v.firstName}</div>
              <div className="TCell">{v.lastName}</div>
              <div className="TCell">{v.email}</div>
              <div className="TCell">{v.phone}</div>
            </div>
          </div>
        ))}
        <Pagination
          dataPerPage={dataPerPage}
          totalData={loadedData.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
