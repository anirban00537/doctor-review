import React, { useCallback } from "react";

const Pagination = ({ data, handlePaginationChange }) => {
  const { currentPage, totalPages } = data;

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-3 py-2 mx-1 rounded-lg ${
            i === currentPage
              ? "bg-gradient-to-br from-green-500 to-green-800   text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={handlePageNumberClick(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handlePreviousClick = useCallback(() => {
    handlePaginationChange(currentPage - 1);
  }, [currentPage, handlePaginationChange]);

  const handleNextClick = useCallback(() => {
    if (currentPage >= totalPages) {
      return;
    }
    handlePaginationChange(currentPage + 1);
  }, [currentPage, handlePaginationChange, totalPages]);

  const handlePageNumberClick = useCallback(
    (pageNumber) => () => {
      handlePaginationChange(pageNumber);
    },
    [handlePaginationChange]
  );

  return (
    <div className="flex justify-center mt-5">
      <button
        className="px-4 py-2 mx-1 bg-gray-200 rounded-lg "
        disabled={currentPage === 1}
        onClick={handlePreviousClick}
      >
        Previous
      </button>
      {getPageNumbers()}
      <button
        className="px-4 py-2 mx-1 bg-gray-200 rounded-lg"
        disabled={currentPage === totalPages}
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
