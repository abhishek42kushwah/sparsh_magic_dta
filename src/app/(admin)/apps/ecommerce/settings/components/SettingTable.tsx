import ReactTable from '@/components/Table';
import type { SettingsType } from '@/types/data';
import type { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<SettingsType>[] = [
  {
    header: 'ID',
    cell: ({
      row: {
        original: { id },
      },
    }) => <div>{id}</div>,
  },

  {
    header: 'Delivery Charges',
    accessorKey: 'deliveryCharges',
  },
  {
    header: 'Cod Charges',
    accessorKey: 'codCharges',
  },
  {
    header: 'Express Charges',
    accessorKey: 'expressCharges',
  },
  {
    header: 'Referral Bonus',
    accessorKey: 'referalBonus',
  },
];

const SettingTable = ({ data }: { data: SettingsType[] }) => {
  return (
    <ReactTable<SettingsType>
      columns={columns}
      data={data}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
    />
  );
};

export default SettingTable;
