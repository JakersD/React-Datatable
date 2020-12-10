import React, { useEffect, useState } from 'react';

export default function Pagination({
  dataPerPage,
  totalData,
  currentPage,
  setCurrentPage,
}) {
  const [navPaginate] = useState([]);

  useEffect(() => {
    for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
      navPaginate.push(i);
    }
  }, []);

  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  // useEffect(() => {
  //   for (let i = 0; i < u.length; i++) {
  //     NE.pop(u[i]);
  //   }
  //   for (let i = 0; i < u.length; i++) {
  //     if (
  //       i === 0 ||
  //       u[i] === u.length ||
  //       u[i] + 1 === currentPage ||
  //       u[i] + 2 === currentPage ||
  //       u[i] - 1 === currentPage ||
  //       u[i] - 2 === currentPage ||
  //       u[i] === currentPage
  //     ) {
  //       NE.push(u[i]);
  //     }
  //   }
  //   setNE((prev) => NE);
  //   console.log(NE);
  // }, [currentPage]);

  return (
    <nav>
      <ul>
        {navPaginate.map((i) => (
          <li key={i}>
            <a href={`#`} onClick={() => paginate(i)}>
              {i}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
