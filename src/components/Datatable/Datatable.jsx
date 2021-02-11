import React, { useState, useEffect } from 'react';

import Dropdown from '../Dropdown/Dropdown';
import SearchForm from '../Searchform/SearchForm';
import DataAddForm from '../DataAddForm/DataAddForm';
import Paginator from '../Paginator/Paginator';

export default function App({ loadedData, setLoadedData }) {
  const [currentPage, setCurrentPage] = useState(1); //Текущая страница для показа
  const [itemsPerPage] = useState(20); //Количество данных на страницу
  const [currentData, setCurrentData] = useState([]); //Отображение данных на странице
  const [paginatorActiveIndex, setPaginatorActiveIndex] = useState(0); //Выделение активной страницы пагинатора
  const [filteredData, setFilteredData] = useState([]); //Отфильтрованные данные

  const [dropdownCurrent, setDropdownCurrent] = useState([]); //Выбранный пользователь
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); //Проверка открыт ли пользователь

  //Состояние сортировки
  const [sortState, setSortState] = useState({
    id: '',
    direction: 'none',
    isNum: false,
  });

  //Разбивание информации по страницам
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    if (filteredData.length !== 0) {
      setCurrentData(filteredData.slice(indexOfFirstItem, indexOfLastItem));
      return;
    }
    setCurrentData(loadedData.slice(indexOfFirstItem, indexOfLastItem));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sortState, filteredData, loadedData]);

  //Направление сортировки
  const nextDirection = (prev) => {
    switch (prev) {
      case 'none':
        return 'up';
      case 'up':
        return 'down';
      case 'down':
        return 'up';
      default:
        return 'none';
    }
  };

  //Есть два типа сортировки, по буквам вверх/вниз, или по цифрам вверх/вниз
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

  //Смена иконки сортировки
  const changeIcon = (target, direction) => {
    target.classList.remove('disabled');
    if (direction === 'up') {
      target.classList.remove('activeUp');
      target.classList.add('activeDown');
    } else {
      target.classList.remove('activeDown');
      target.classList.add('activeUp');
    }
  };

  //Функция сортировки
  const sorting = (target, isNum) => {
    //Если id предыдущего раза сходятся (если кнопка нажажата более 1 раза)
    if (target.id === sortState.id) {
      let nextDir = nextDirection(sortState.direction); //Узнать следующее направление соритровки
      changeIcon(target.querySelector('div'), nextDir); //Сменить по направлению иконку
      //Если данные отфильтрованы(не),то фильтруем их по типу(вверх, вниз, числа, буквы)
      if (filteredData.length) {
        setFilteredData(typeOfSorting(isNum, filteredData, target.id, nextDir));
      } else {
        setLoadedData(typeOfSorting(isNum, loadedData, target.id, nextDir));
      }
      //Указать новые данные, id предыдущего, направление предыдущего и тип предыдущего
      setSortState({ ...sortState, direction: nextDir });
      return;
    }
    //Очистить все иконки сортировки
    document.querySelectorAll('.sorting').forEach((v) => (v.classList = 'sorting disabled'));
    //Сменить по направлению иконку
    changeIcon(target.querySelector('div'), 'up');
    if (filteredData.length) {
      setFilteredData(typeOfSorting(isNum, filteredData, target.id, 'up'));
    } else {
      setLoadedData(typeOfSorting(isNum, loadedData, target.id, 'up'));
    }
    setSortState({ id: target.id, direction: 'up', isNum: isNum });
  };

  const handleDropdown = (user) => {
    setIsDropdownOpen(true);
    setDropdownCurrent(user);
  };

  return (
    <div className="wrapper">
      <SearchForm
        loadedData={loadedData}
        setSortState={setSortState}
        setCurrentPage={setCurrentPage}
        setActiveIndex={setPaginatorActiveIndex}
        setFilteredData={setFilteredData}
      />
      <DataAddForm setLoadedData={setLoadedData} loadedData={loadedData} />
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
          <tbody className="TBody" key={i} onClick={() => handleDropdown(v)}>
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
      <Paginator
        loadedData={filteredData.length ? filteredData : loadedData}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        activeIndex={paginatorActiveIndex}
        setActiveIndex={setPaginatorActiveIndex}
      />
      {isDropdownOpen && (
        <Dropdown currentUser={dropdownCurrent} setOpen={setIsDropdownOpen} setCurrentUser={setDropdownCurrent} />
      )}
    </div>
  );
}
