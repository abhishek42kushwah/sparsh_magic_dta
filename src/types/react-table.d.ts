// src/types/react-table.d.ts
import '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends unknown, TValue> {
    options?: {
      filterOptions?: { label: string; value: string }[]
    }
  }
}
