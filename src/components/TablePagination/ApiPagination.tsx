import type { ReactTablePaginationPropsSecond } from '@/types/component-props';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import IconifyIcon from '../wrappers/IconifyIcon';

const getVisiblePages = (totalPages: number, currentPage: number): number[] => {
  if (totalPages > 1) {
    if (currentPage === 1) {
      return [currentPage, currentPage + 1, currentPage + 2].filter((page) => page > 0 && page <= totalPages);
    } else if (currentPage === totalPages) {
      return [currentPage - 2, currentPage - 1, currentPage].filter((page) => page > 0 && page <= totalPages);
    } else {
      return [currentPage - 1, currentPage, currentPage + 1].filter((page) => page > 0 && page <= totalPages);
    }
  }
  return [1];
};

const Pagination = <RowType,>({
  currentPage,
  totalPages,
  setCurrentPage,
  total,
  setLimit,
  table,
  rowsPerPageList
}: ReactTablePaginationPropsSecond<RowType>) => {
  const [visiblePages, setVisiblePages] = useState<number[]>([1]);
  const pageSizeList = rowsPerPageList ?? [50, 100, 200, 300, 500];
  useEffect(() => {
    setVisiblePages(getVisiblePages(totalPages, currentPage));
  }, [currentPage, totalPages]);

  return (
    <div className="align-items-center justify-content-between row g-0 text-center text-sm-start p-3 border-top">
      <div className="col-sm">
        <div className="d-flex align-items-center gap-2">
          <div className="text-muted text-nowrap">
            Showing <span className="fw-semibold">{currentPage}</span> of <span className="fw-semibold">{totalPages}</span> Pages
          </div>
          <div className="text-muted text-nowrap">
            Total: <span className="fw-semibold">{total}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="page-size-select" className="mb-0">
              Show:
            </label>
            <select
              name="page-size-select"
              id="page-size-select"
              className="form-select w-auto"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                const newLimit = Number(e.target.value);
                table.setPageSize(newLimit);
                setLimit(newLimit);
                setCurrentPage(1);
              }}
            >
              {pageSizeList.map((pageSize:any) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Col sm="auto" className="mt-3 mt-sm-0">
        <ul className="pagination pagination-rounded m-0">
          <li className="page-item">
            <button
              onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="page-link"
            >
              <IconifyIcon icon="fa-solid:chevron-left" height={8} width={8} />
            </button>
          </li>

          {visiblePages.map((page) => (
            <li key={page} className={clsx('page-item', { active: page === currentPage })}>
              <button onClick={() => setCurrentPage(page)} className="page-link">
                {page}
              </button>
            </li>
          ))}

          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <IconifyIcon icon="fa-solid:chevron-right" height={8} width={8} />
            </button>
          </li>
        </ul>
      </Col>
    </div>
  );
};

export default Pagination;
