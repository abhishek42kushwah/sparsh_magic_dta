import React, { useState } from 'react';
import ReactTable from '@/components/Table';
// import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { GenericProductType } from '@/types/data';
import type { ColumnDef } from '@tanstack/react-table';
import { FormCheck } from 'react-bootstrap';

interface GenericProductsTableProps {
  genericProducts: GenericProductType[];
  // setGenericProducts: React.Dispatch<React.SetStateAction<GenericProductType[]>>;
}

const GenericProductsTable: React.FC<GenericProductsTableProps> = ({ genericProducts,
   

}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
  };

  const columns: ColumnDef<GenericProductType>[] = [
    {
      id: 'select',
      header: () => (
        <FormCheck
          id="select-all-checkbox"
          checked={selectedRows.length === genericProducts.length && genericProducts.length > 0}
          onChange={(e) => setSelectedRows(e.target.checked ? genericProducts.map((g) => g.id) : [])}
        />
      ),
      cell: ({ row: { original } }) => (
        <FormCheck
          id={`checkbox-${original.id}`}
          checked={selectedRows.includes(original.id)}
          onChange={() => toggleRowSelection(original.id)}
        />
      )
    },
    {
      header: 'Product Name',
      accessorKey: 'DisplayName',
      cell: ({ row: { original } }) => (
        <div className="d-flex align-items-center">
          {original.thumbnail ? (
            <img src={original.thumbnail} alt={original.DisplayName} height={40} className="rounded me-2" />
          ) : (
            <div className="placeholder-thumbnail me-2">No Image</div>
          )}
          <span className="fw-medium">{original.DisplayName}</span>
        </div>
      )
    },
    {
      header: 'SKU',
      accessorKey: 'sku'
    },
    {
      header: 'Brand',
      accessorKey: 'brand'
    },
    {
      header: 'Sell Price',
      accessorKey: 'sellPrice'
    },
    {
      header: 'Buy Price',
      accessorKey: 'BuyPrice'
    },
    // {
    //   header: 'Action',
    //   cell: ({ row: { original } }) => (
    //     <span role="button">
    //       <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
    //     </span>
    //   )
    // }
  ];

  return (
    <ReactTable<GenericProductType>
      columns={columns}
      data={genericProducts}
      tableClass="mb-0 text-nowrap"
      theadClass="table-light"
      showPagination
    />
  );
};

export default GenericProductsTable;
