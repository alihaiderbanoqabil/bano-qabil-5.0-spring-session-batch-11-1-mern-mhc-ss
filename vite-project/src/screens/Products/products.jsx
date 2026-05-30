import React, { useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useLazyGetUsersQuery,
} from "../../store/features/apiSlice";

export const Products = () => {
  // const { isError, isLoading, isFetching, isSuccess, error, data, status } =
  //   useGetUsersQuery("?name=ali");
  const [currentPage, setCurrentPage] = useState(1);
  const [
    fetchUsers,
    { isError, isLoading, isFetching, isSuccess, error, data, status },
  ] = useLazyGetUsersQuery();

  useEffect(() => {
    fetchUsers(`?page=${currentPage}`);
  }, [currentPage]);

  console.log({
    isError,
    isLoading,
    isFetching,
    isSuccess,
    error,
    data,
    status,
  });

  return (
    <div>
      Products
      <div className="flex items-center">
        <button onClick={() => setCurrentPage((prev) => prev - 1)}>
          Previous
        </button>
        <input
          type="number"
          value={currentPage}
          onChange={(e) => setCurrentPage(+e.target.value)}
          className="w-8"
        />
        <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};
