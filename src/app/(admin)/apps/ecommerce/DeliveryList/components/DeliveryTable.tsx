
import ReactTable from '@/components/TablePagination/index';
import type { ColumnDef } from '@tanstack/react-table';
import type { DeliveryType } from '@/types/data';

const DeliveryTable = ({
  delivery,
  currentPage,
  totalPages,
  total,
  limit,
  setCurrentPage,
  setLimit
}: {
  delivery: DeliveryType[];
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  setCurrentPage: (page: number) => void;
  setLimit: (limit: number) => void;
}) => {  
 
  const columns: ColumnDef<DeliveryType>[] = [
    {
      header: 'Delivery ID',
      accessorKey: 'id',
      enableSorting: false,
      enableColumnFilter: false
    },
    {
      header: 'Name',
      accessorKey: 'name',
      enableSorting: false,
      enableColumnFilter: false
    },
   
    {
      header: 'Mobile',
      accessorKey: 'mobile',
      enableSorting: false,
      enableColumnFilter: false
    },
  
    {
      header: 'Created At',
      accessorKey: 'createdAt',
      enableSorting: false,
      enableColumnFilter: false,

      cell: ({ row: { original } }) => new Date(original.createdAt).toLocaleString()
    },
    {
      header: 'updated At',
      accessorKey: 'updatedAt',
      enableSorting: false,
      enableColumnFilter: false,

      cell: ({ row: { original } }) => new Date(original.updatedAt).toLocaleString()
    },
    
  ];

  return (
    <div>
      <ReactTable<DeliveryType>
        columns={columns}
        data={delivery}
        pageSize={10}
        tableClass="mb-0"
        theadClass="table-light"
        showPagination
        limit={limit}
        setLimit={setLimit}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        total={total}
      />
     
    </div>
  );
};

export default DeliveryTable;
