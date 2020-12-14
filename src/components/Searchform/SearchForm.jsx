import React from 'react';

const SearchForm = ({
  changeCurrentData,
  setFilteredData,
  loadedData,
  Q,
  setQ,
  setCurrentPage,
  setTypeOfSorting,
  setSortedData,
}) => {
  const search = (dataRow) => {
    const dataColumn = dataRow[0] && Object.keys(dataRow[0]);
    const filtered = dataRow.filter((row) =>
      dataColumn.some(
        (column) => row[column].toString().toLowerCase().indexOf(Q.toLowerCase()) > -1
      )
    );
    if (filtered.length === 0) {
      alert('Ничего не найдено');
      document.querySelectorAll('.sorting').forEach((v) => (v.className = 'sorting disabled'));
      setTypeOfSorting('none');
      setSortedData([]);
      changeCurrentData(dataRow);
      setFilteredData([]);
      setQ('');
      return;
    }
    document.querySelectorAll('.sorting').forEach((v) => (v.className = 'sorting disabled'));
    setTypeOfSorting('none');
    setSortedData([]);
    setCurrentPage(1);
    setFilteredData(filtered);
    changeCurrentData(filtered);
  };

  const clearSearch = () => {
    setQ('');
    changeCurrentData(loadedData);
    setFilteredData([]);
    setTypeOfSorting('none');
    document.querySelectorAll('.sorting').forEach((v) => (v.className = 'sorting disabled'));
    setSortedData([]);
    setCurrentPage(1);
  };

  return (
    <div className="searchForm">
      <h2 className="searchForm-title">Table search</h2>
      <input type="text" value={Q} onChange={(e) => setQ(e.target.value)} />
      <button onClick={() => search(loadedData)}>Search</button>
      <button onClick={() => clearSearch()}>Clear search</button>
    </div>
  );
};

export default SearchForm;
