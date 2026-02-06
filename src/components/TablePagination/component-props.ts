import type {
  ColumnDef,
  TableOptions,
} from '@tanstack/react-table'

export interface ReactTablePropsSecond<T> {
  data: T[]
  columns: ColumnDef<T, any>[] // Properly typed columns for TanStack Table v8
  options?: Partial<TableOptions<T>>
  pageSize?: number
  showPagination?: boolean
  rowsPerPageList?: number[]
  tableClass?: string
  theadClass?: string
  currentPage?: number
  setCurrentPage?: (page: number) => void
  totalPages?: number
  total?: number
}
