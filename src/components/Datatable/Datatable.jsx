import React, { useState, useEffect } from 'react';

import Pagination from 'rc-pagination';
import locale from 'rc-pagination/lib/locale/ru_RU';

import Dropdown from '../Dropdown/Dropdown';
import SearchForm from '../Searchform/SearchForm';

export default function App({ loadedData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [dataPerPage] = useState(20);

  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [Q, setQ] = useState('');
  const [paginateData, setPaginateData] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

  const [typeOfSorting, setTypeOfSorting] = useState('none');
  const [lastType, setLastType] = useState('');
  const [sortedData, setSortedData] = useState([]);

  const changeCurrentData = (data) => {
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    setCurrentData(data.slice(indexOfFirstData, indexOfLastData));
    setPaginateData(data.length);
  };

  useEffect(() => {
    if (Q.length !== 0 && sortedData.length === 0) {
      changeCurrentData(filteredData);
      return;
    }
    if (Q.length === 0 && sortedData.length !== 0) {
      changeCurrentData(sortedData);
      return;
    }
    if (Q.length !== 0 && sortedData.length !== 0) {
      changeCurrentData(sortedData);
      return;
    }
    changeCurrentData(loadedData);
  }, [currentPage]);

  const paginationOnChange = (page) => {
    setCurrentPage(page);
  };

  const dropdownUser = (user) => {
    setOpen(true);
    setCurrentUser(user);
  };

  const sorting = (type) => {
    const startSorting = (type, classChanger, isNone) => {
      if (typeOfSorting === 'none' || isNone) {
        const loadedSortedDataId = loadedData.slice().sort((a, b) => a[type] - b[type]);
        const filteredSortedDataId = filteredData.slice().sort((a, b) => a[type] - b[type]);
        const loadedSortedData = loadedData.slice().sort((a, b) => {
          if (a[type] < b[type]) return -1;
          if (a[type] < b[type]) return 1;
        });
        const filteredSortedData = filteredData.slice().sort((a, b) => {
          if (a[type] < b[type]) return -1;
          if (a[type] < b[type]) return 1;
        });
        setTypeOfSorting('highToLow');
        classChanger.classList.remove('disabled');
        classChanger.classList.add('activeDown');
        if (filteredData.length === 0) {
          if (type === 'id') {
            setSortedData(loadedSortedDataId);
            changeCurrentData(loadedSortedDataId);
            return;
          }
          setSortedData(loadedSortedData);
          changeCurrentData(loadedSortedData);
        } else {
          if (type === 'id') {
            setSortedData(filteredSortedDataId);
            changeCurrentData(filteredSortedDataId);
            return;
          }
          setSortedData(filteredSortedData);
          changeCurrentData(filteredSortedData);
        }
        return;
      }
      if (typeOfSorting === 'highToLow') {
        const loadedSortedDataId = loadedData
          .slice()
          .sort((a, b) => a[type] - b[type])
          .reverse();
        const filteredSortedDataId = filteredData
          .slice()
          .sort((a, b) => a[type] - b[type])
          .reverse();
        const loadedSortedData = loadedData
          .slice()
          .sort((a, b) => {
            if (a[type] < b[type]) return -1;
            if (a[type] < b[type]) return 1;
          })
          .reverse();
        const filteredSortedData = filteredData
          .slice()
          .sort((a, b) => {
            if (a[type] < b[type]) return -1;
            if (a[type] < b[type]) return 1;
          })
          .reverse();
        setTypeOfSorting('lowToHigh');
        classChanger.classList.remove('activeDown');
        classChanger.classList.add('activeUp');
        if (filteredData.length === 0) {
          if (type === 'id') {
            setSortedData(loadedSortedDataId);
            changeCurrentData(loadedSortedDataId);
            return;
          }
          setSortedData(loadedSortedData);
          changeCurrentData(loadedSortedData);
        } else {
          if (type === 'id') {
            setSortedData(filteredSortedDataId);
            changeCurrentData(filteredSortedDataId);
          }
          setSortedData(filteredSortedData);
          changeCurrentData(filteredSortedData);
        }
      }
      if (typeOfSorting === 'lowToHigh') {
        setTypeOfSorting('none');
        setSortedData([]);
        document.querySelectorAll('.sorting').forEach((v) => (v.className = 'sorting disabled'));
        if (filteredData.length === 0) {
          changeCurrentData(loadedData);
        } else {
          changeCurrentData(filteredData);
        }
      }
    };
    console.log(type);
    setLastType(type.id);
    const classChanger = type.querySelector('div');
    if (lastType === type.id) {
      startSorting(type.id, classChanger, false);
      return;
    }
    if (lastType !== type.id || lastType.length === 0) {
      document.querySelectorAll('.sorting').forEach((v) => (v.className = 'sorting disabled'));
      setSortedData([]);
      startSorting(type.id, classChanger, true);
      return;
    }
  };

  return (
    <div className="wrapper">
      <SearchForm
        changeCurrentData={changeCurrentData}
        setFilteredData={setFilteredData}
        loadedData={loadedData}
        Q={Q}
        setQ={setQ}
        setCurrentPage={setCurrentPage}
        setTypeOfSorting={setTypeOfSorting}
        setSortedData={setSortedData}
      />
      <div className="Table">
        <div className="THeading">
          <div className="TRow">
            <div className="THead">
              <div className="THead-wrapper" id={'id'} onClick={(e) => sorting(e.target)}>
                ID
                <div className="sorting disabled" id={'id'} />
              </div>
            </div>
            <div className="THead">
              <div className="THead-wrapper" id={'firstName'} onClick={(e) => sorting(e.target)}>
                Name
                <div className="sorting disabled" />
              </div>
            </div>
            <div className="THead">
              <div className="THead-wrapper" id={'lastName'} onClick={(e) => sorting(e.target)}>
                Surname
                <div className="sorting disabled" />
              </div>
            </div>
            <div className="THead">
              <div className="THead-wrapper" id={'email'} onClick={(e) => sorting(e.target)}>
                Email
                <div className="sorting disabled" />
              </div>
            </div>
            <div className="THead">
              <div className="THead-wrapper" id={'phone'} onClick={(e) => sorting(e.target)}>
                Phone
                <div className="sorting disabled" />
              </div>
            </div>
          </div>
        </div>
        {currentData.map((v, i) => (
          <div className="TBody" key={i} onClick={() => dropdownUser(v)}>
            <div className="TRow">
              <div className="TCell">{v.id}</div>
              <div className="TCell">{v.firstName}</div>
              <div className="TCell">{v.lastName}</div>
              <div className="TCell">{v.email}</div>
              <div className="TCell">{v.phone}</div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        current={currentPage}
        total={paginateData}
        defaultPageSize={dataPerPage}
        onChange={paginationOnChange}
        locale={locale}
      />
      {open && (
        <Dropdown currentUser={currentUser} setOpen={setOpen} setCurrentUser={setCurrentUser} />
      )}
    </div>
  );
}
