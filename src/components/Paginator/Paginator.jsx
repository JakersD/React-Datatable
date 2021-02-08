import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

const Paginator = ({ loadedData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [pagesToShow, setPagesToShow] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = loadedData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= Math.ceil(loadedData.length / itemsPerPage); i++) {
      arr.push(i);
    }
    setPageNumbers(arr);
    if (arr.length < 10) {
      setPagesToShow(arr);
      return;
    }
    setPagesToShow([1, 2, 3, 4, 5, 6, '...', arr[arr.length - 1]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paginate = (num, index) => {
    if (typeof num === 'string') return;
    if (pageNumbers.length <= 7) {
      setCurrentPage(num);
      setActiveIndex(index);
      return;
    }
    const last = pageNumbers[pageNumbers.length - 1];
    setCurrentPage(num);
    if (num <= 4) {
      setPagesToShow([1, 2, 3, 4, 5, 6, '...', last]);
      setActiveIndex(index);
      return;
    }
    if (last - num <= 4) {
      setPagesToShow([1, '...', last - 5, last - 4, last - 3, last - 2, last - 1, last]);
      index === 8 ? setActiveIndex(7) : setActiveIndex(index);
      return;
    }
    let arrNumber = [num - 2, num - 1, num, num + 1, num + 2];
    setPagesToShow([pageNumbers[0], '...', ...arrNumber, '...', last]);
    setActiveIndex(4);
  };

  return (
    <>
      <ul>
        {currentItems.map((v) => (
          <li key={nanoid()}>{JSON.stringify(v.firstName)}</li>
        ))}
      </ul>
      <nav className="pagination">
        <ul className="pagination__list">
          {pagesToShow.map((number, i) => (
            <li
              key={nanoid()}
              className={`pagination__item ${activeIndex === i ? 'pagination__item_active' : ''}`}
              onClick={() => paginate(number, i)}
            >
              <a href="!#" className="pagination__link" key={nanoid()}>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Paginator;
