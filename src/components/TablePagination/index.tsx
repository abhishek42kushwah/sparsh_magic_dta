import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type PaginationState,
  type SortingState,
  type ColumnFiltersState
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import type { ReactTablePropsSecond } from '@/types/component-props';
import ApiPagination from './ApiPagination';
import Select from 'react-select';

const exactMatchFilterFn = (row: any, columnId: any, filterValue: any) => {
  return row.getValue(columnId) === filterValue;
};
exactMatchFilterFn.autoRemove = (val: any) => !val;

const ReactTable = <RowType,>({
  options,
  columns,
  data,
  limit,
  setLimit,
  pageSize,
  showPagination,
  rowsPerPageList,
  tableClass,
  theadClass,
  currentPage,
  setCurrentPage,
  totalPages,
  total
}: ReactTablePropsSecond<RowType>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize ?? limit ?? 50
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    ...options,
    data,
    columns,
    state: {
      pagination,
      sorting,
      columnFilters
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    filterFns: {
      exactMatch: exactMatchFilterFn
    },
    ...(showPagination && { getPaginationRowModel: getPaginationRowModel() })
  });


  useEffect(() => {
    if (limit && pagination.pageSize !== limit) {
      setPagination((prev) => ({ ...prev, pageSize: limit, pageIndex: 0 }));
    }
  }, [limit, pagination.pageSize]);
  return (
    <>
      <Table hover responsive bordered className={tableClass}>
        <thead className={theadClass}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {!header.isPlaceholder && (
                    <>
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === 'asc'
                          ? ' 🔼'
                          : header.column.getIsSorted() === 'desc'
                          ? ' 🔽'
                          : null}
                      </div>

                      {/* Filtering */}
                      {header.column.getCanFilter() && (
                        <div style={{ marginTop: '6px' }}>
                          {header.column.id === 'lead_origin_page' ? (
                            <Select
                              isMulti
                              options={header.column.columnDef.meta?.options?.filterOptions || []}
                              value={
                                Array.isArray(header.column.getFilterValue())
                                  ? (header.column.getFilterValue() as string[]).map((val: string) => ({
                                      value: val,
                                      label:
                                        header.column.columnDef.meta?.options?.filterOptions?.find(
                                          (opt: any) => opt.value === val
                                        )?.label || val
                                    }))
                                  : []
                              }
                              onChange={(selected) =>
                                header.column.setFilterValue(selected.map((opt: any) => opt.value))
                              }
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  minHeight: '34px',
                                  borderRadius: '6px',
                                  borderColor: '#d1d5db'
                                })
                              }}
                            />
                          ) : header.column.columnDef.meta?.options?.filterOptions ? (
                            <select
                              value={String(header.column.getFilterValue() ?? '')}
                              onChange={(e) =>
                                header.column.setFilterValue(e.target.value || undefined)
                              }
                              style={{
                                width: '100%',
                                minHeight: '34px',
                                borderRadius: '6px',
                                borderColor: '#d1d5db'
                              }}
                            >
                              <option value="">All</option>
                              {header.column.columnDef.meta.options.filterOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              value={(header.column.getFilterValue() ?? '') as string}
                              onChange={(e) => header.column.setFilterValue(e.target.value)}
                              placeholder="Filter..."
                              style={{
                                width: '100%',
                                padding: '4px 8px',
                                minHeight: '34px',
                                borderRadius: '6px',
                                borderColor: '#d1d5db'
                              }}
                            />
                          )}
                        </div>
                      )}
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      {showPagination && (
        <ApiPagination
          table={table}
          limit={limit}
          setLimit={setLimit}
          currentPage={currentPage}
          rowsPerPageList={rowsPerPageList}
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          total={total}
        />
      )}
    </>
  );
};

export default ReactTable;
