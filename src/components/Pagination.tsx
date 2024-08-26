import usePagination from "@lucasmogari/react-pagination";
import React, { Fragment } from "react";

interface PaginationProps {
  page: number;
  totalItems: number;
  perPage: number;
}

function Pagination({ page, totalItems, perPage }: PaginationProps) {
  const { fromItem, getPageItem, toItem, totalPages } = usePagination({
    totalItems,
    page,
    itemsPerPage: perPage,
    maxPageItems: 3,
  });

  const firstPage = 1;
  const nextPage = Math.min(page + 1, totalPages);
  const prevPage = Math.max(page - 1, firstPage);
  const arr = new Array(totalPages + 2);

  return (
    <div>
      {[...arr].map((_, i) => {
        const { page, disabled, current } = getPageItem(i);
        if (page === "previous") {
          return <span key={i}>{"<"}</span>;
        }
        if (page === "next") {
          return <span key={i}>{">"}</span>;
        }
        if (page === "gap") {
          return <span key={i}>...</span>;
        }
        return <span key={i}>{page}</span>;
      })}
    </div>
  );
}

export default Pagination;
