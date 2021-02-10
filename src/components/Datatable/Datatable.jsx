import React, { useState, useEffect, useCallback } from 'react';

import Dropdown from '../Dropdown/Dropdown';
import SearchForm from '../Searchform/SearchForm';
import DataAddForm from '../DataAddForm/DataAddForm';
import Paginator from '../Paginator/Paginator';

export default function App({ loadedData, setLoadedData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [currentData, setCurrentData] = useState([]);

  const [sortState, setSortState] = useState({
    id: '',
    direction: 'none',
    isNum: false,
  });

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentData(loadedData.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, sortState]);

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentData = loadedData.slice(indexOfFirstItem, indexOfLastItem);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [dataPerPage] = useState(20);

  // const [open, setOpen] = useState(false);
  // const [currentUser, setCurrentUser] = useState({});

  // const [Q, setQ] = useState('');
  // const [paginateData, setPaginateData] = useState(0);
  // const [filteredData, setFilteredData] = useState([]);

  // const [typeOfSorting, setTypeOfSorting] = useState('none');
  // const [lastType, setLastType] = useState('');
  // const [sortedData, setSortedData] = useState([]);

  // const changeCurrentData = useCallback(
  //   (data) => {
  //     const indexOfLastData = currentPage * dataPerPage;
  //     const indexOfFirstData = indexOfLastData - dataPerPage;
  //     setCurrentData(data.slice(indexOfFirstData, indexOfLastData));
  //     setPaginateData(data.length);
  //   },
  //   [currentPage, dataPerPage]
  // );

  // useEffect(() => {
  //   if (Q.length !== 0 && sortedData.length === 0) {
  //     changeCurrentData(filteredData);
  //     return;
  //   }
  //   if (Q.length === 0 && sortedData.length !== 0) {
  //     changeCurrentData(sortedData);
  //     return;
  //   }
  //   if (Q.length !== 0 && sortedData.length !== 0) {
  //     changeCurrentData(sortedData);
  //     return;
  //   }
  //   changeCurrentData(loadedData);
  // }, [currentPage, loadedData]);

  // const dropdownUser = (user) => {
  //   setOpen(true);
  //   setCurrentUser(user);
  // };

  // const sortingFunction = (type, classChanger, isNone) => {
  //   if (typeOfSorting === 'none' || isNone) {
  //     const loadedSortedDataId = loadedData.slice().sort((a, b) => a[type] - b[type]);
  //     const filteredSortedDataId = filteredData.slice().sort((a, b) => a[type] - b[type]);
  //     const loadedSortedData = loadedData.slice().sort((a, b) => {
  //       if (a[type] < b[type]) return -1;
  //       if (a[type] < b[type]) return 1;
  //       return 1;
  //     });
  //     const filteredSortedData = filteredData.slice().sort((a, b) => {
  //       if (a[type] < b[type]) return -1;
  //       if (a[type] < b[type]) return 1;
  //       return 1;
  //     });
  //     setTypeOfSorting('highToLow');
  //     classChanger.classList.remove('disabled');
  //     classChanger.classList.add('activeDown');
  //     if (filteredData.length === 0) {
  //       if (type === 'id') {
  //         setSortedData(loadedSortedDataId);
  //         changeCurrentData(loadedSortedDataId);
  //         return;
  //       }
  //       setSortedData(loadedSortedData);
  //       changeCurrentData(loadedSortedData);
  //     } else {
  //       if (type === 'id') {
  //         setSortedData(filteredSortedDataId);
  //         changeCurrentData(filteredSortedDataId);
  //         return;
  //       }
  //       setSortedData(filteredSortedData);
  //       changeCurrentData(filteredSortedData);
  //     }
  //     return;
  //   }
  //   if (typeOfSorting === 'highToLow') {
  //     const loadedSortedDataId = loadedData
  //       .slice()
  //       .sort((a, b) => a[type] - b[type])
  //       .reverse();
  //     const filteredSortedDataId = filteredData
  //       .slice()
  //       .sort((a, b) => a[type] - b[type])
  //       .reverse();
  //     const loadedSortedData = loadedData
  //       .slice()
  //       .sort((a, b) => {
  //         if (a[type] < b[type]) return -1;
  //         if (a[type] < b[type]) return 1;
  //         return 1;
  //       })
  //       .reverse();
  //     const filteredSortedData = filteredData
  //       .slice()
  //       .sort((a, b) => {
  //         if (a[type] < b[type]) return -1;
  //         if (a[type] < b[type]) return 1;
  //         return 1;
  //       })
  //       .reverse();
  //     setTypeOfSorting('lowToHigh');
  //     classChanger.classList.remove('activeDown');
  //     classChanger.classList.add('activeUp');
  //     if (filteredData.length === 0) {
  //       if (type === 'id') {
  //         setSortedData(loadedSortedDataId);
  //         changeCurrentData(loadedSortedDataId);
  //         return;
  //       }
  //       setSortedData(loadedSortedData);
  //       changeCurrentData(loadedSortedData);
  //     } else {
  //       if (type === 'id') {
  //         setSortedData(filteredSortedDataId);
  //         changeCurrentData(filteredSortedDataId);
  //       }
  //       setSortedData(filteredSortedData);
  //       changeCurrentData(filteredSortedData);
  //     }
  //   }
  //   if (typeOfSorting === 'lowToHigh') {
  //     setTypeOfSorting('none');
  //     setSortedData([]);
  //     document.querySelectorAll('.sorting').forEach((v) => (v.className = 'sorting disabled'));
  //     if (filteredData.length === 0) {
  //       changeCurrentData(loadedData);
  //     } else {
  //       changeCurrentData(filteredData);
  //     }
  //   }
  // };

  // const sorting = (type) => {
  //   setLastType(type.id);
  //   const classChanger = type.querySelector('div');
  //   if (lastType === type.id) {
  //     sortingFunction(type.id, classChanger, false);
  //     return;
  //   }
  //   if (lastType !== type.id || lastType.length === 0) {
  //     document.querySelectorAll('.sorting').forEach((v) => (v.className = 'sorting disabled'));
  //     setSortedData([]);
  //     sortingFunction(type.id, classChanger, true);
  //     return;
  //   }
  // };
  const nextDirection = (prev) => {
    switch (prev) {
      case 'none':
        return 'up';
      case 'up':
        return 'down';
      case 'down':
        return 'up';
    }
  };

  const typeOfSorting = (type, data, id, dir) => {
    if (dir === 'up') {
      if (!type) {
        return data.sort((a, b) => {
          if (a[id] < b[id]) {
            return -1;
          }
          if (a[id] > b[id]) {
            return 1;
          }
          return 0;
        });
      } else {
        return data.sort((a, b) => a[id] - b[id]);
      }
    }
    if (dir === 'down') {
      if (!type) {
        return data.sort((a, b) => {
          if (a[id] > b[id]) {
            return -1;
          }
          if (a[id] < b[id]) {
            return 1;
          }
          return 0;
        });
      } else {
        return data.sort((a, b) => b[id] - a[id]);
      }
    }
  };

  const changeIcon = (target, direction) => {
    console.log(direction);
    target.classList.remove('disabled');
    if (direction === 'up') {
      target.classList.remove('activeUp');
      target.classList.add('activeDown');
    } else {
      target.classList.remove('activeDown');
      target.classList.add('activeUp');
    }
  };

  const sorting = (target, isNum) => {
    if (target.id === sortState.id) {
      let nextDir = nextDirection(sortState.direction);
      changeIcon(target.querySelector('div'), nextDir);
      setLoadedData(typeOfSorting(isNum, loadedData, target.id, nextDir));
      setSortState({ ...sortState, direction: nextDir });
      return;
    }
    document.querySelectorAll('.sorting').forEach((v) => (v.classList = 'sorting disabled'));
    changeIcon(target.querySelector('div'), 'up');
    setLoadedData(typeOfSorting(isNum, loadedData, target.id, 'up'));
    setSortState({ id: target.id, direction: 'up', isNum: isNum });
  };

  return (
    <div className="wrapper">
      <SearchForm />
      {/* <SearchForm
        changeCurrentData={changeCurrentData}
        setFilteredData={setFilteredData}
        loadedData={loadedData}
        Q={Q}
        setQ={setQ}
        setCurrentPage={setCurrentPage}
        setTypeOfSorting={setTypeOfSorting}
        setSortedData={setSortedData}
      /> */}
      {/* <DataAddForm setLoadedData={setLoadedData} loadedData={loadedData} /> */}
      <table className="Table">
        <thead className="THeading">
          <tr className="TRow">
            <td className="THead">
              <div className="THead-wrapper" id={'id'} onClick={(e) => sorting(e.target, true)}>
                ID
                <div className="sorting disabled" />
              </div>
            </td>
            <td className="THead">
              <div className="THead-wrapper" id={'firstName'} onClick={(e) => sorting(e.target, false)}>
                Name
                <div className="sorting disabled" />
              </div>
            </td>
            <td className="THead">
              <div className="THead-wrapper" id={'lastName'} onClick={(e) => sorting(e.target, false)}>
                Surname
                <div className="sorting disabled" />
              </div>
            </td>
            <td className="THead">
              <div className="THead-wrapper" id={'email'} onClick={(e) => sorting(e.target, false)}>
                Email
                <div className="sorting disabled" />
              </div>
            </td>
            <td className="THead">
              <div className="THead-wrapper" id={'phone'} onClick={(e) => sorting(e.target, false)}>
                Phone
                <div className="sorting disabled" />
              </div>
            </td>
          </tr>
        </thead>
        {currentData.map((v, i) => (
          // <tbody className="TBody" key={i} onClick={() => dropdownUser(v)}>
          <tbody className="TBody" key={i}>
            <tr className="TRow">
              <td className="TCell">{v.id}</td>
              <td className="TCell">{v.firstName}</td>
              <td className="TCell">{v.lastName}</td>
              <td className="TCell">{v.email}</td>
              <td className="TCell">{v.phone}</td>
            </tr>
          </tbody>
        ))}
      </table>
      <Paginator loadedData={loadedData} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} />
      {/* {open && <Dropdown currentUser={currentUser} setOpen={setOpen} setCurrentUser={setCurrentUser} />} */}
    </div>
  );
}
