/* eslint-env browser */

import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className={styles.PaginationContainer}>
      <nav>
        <ul className={`pagination ${styles.pagination}`}>
          {pageNumbers.map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""} ${
                styles["page-item"]
              }`}
            >
              <button
                className={`page-link ${styles["page-link"]}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
