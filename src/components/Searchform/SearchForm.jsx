import React, { useState } from 'react';

const SearchForm = ({ loadedData, setSortState, setCurrentPage, setActiveIndex, setFilteredData }) => {
  const [toSearch, setToSearch] = useState('');

  const clearTable = (isClearBtn) => {
    if (!isClearBtn) {
      alert('Ничего не найдено');
    }
    document.querySelectorAll('.sorting').forEach((v) => (v.classList = 'sorting disabled'));
    setSortState({ id: '', direction: 'none', isNum: false });
    setCurrentPage(1);
    setToSearch('');
    setActiveIndex(0);
    setFilteredData([]);
  };

  const handlerSearch = (rows) => {
    const columns = rows[0] && Object.keys(rows[0]);
    const filtered = rows.filter((row) =>
      columns.some((column) => row[column].toString().toLowerCase().indexOf(toSearch.toLowerCase()) > -1)
    );
    if (filtered.length === 0) {
      clearTable();
      return;
    }
    setFilteredData(filtered);
    setCurrentPage(1);
    setActiveIndex(0);
  };

  return (
    <div className="searchForm">
      <h2 className="searchForm-title">Table search</h2>
      <input type="text" value={toSearch} onChange={(e) => setToSearch(e.target.value)} />
      <button onClick={() => handlerSearch(loadedData)}>Search</button>
      <button onClick={() => clearTable(true)}>Clear search</button>
    </div>
  );
};

export default SearchForm;
