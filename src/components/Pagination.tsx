import React from "react";

interface PaginationProps {
  page: number;
  totalItems: number;
  perPage: number;
}

function Pagination({ page, totalItems, perPage }: PaginationProps) {
  return <div>Pagination</div>;
}

export default Pagination;
