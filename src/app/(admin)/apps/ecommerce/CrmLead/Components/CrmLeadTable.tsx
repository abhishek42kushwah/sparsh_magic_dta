import { useState } from 'react';
import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { CrmleadType } from '@/types/data';
import type { ColumnDef } from '@tanstack/react-table';
import { FormCheck } from 'react-bootstrap';
import LeadStatusModal from './LeadStatusModal';
import { errorToast, successToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';

const CrmLeadTable = ({ crmlead, OnSuccess }: { crmlead: CrmleadType[], OnSuccess: () => void }) => {
  const [selectedLead, setSelectedLead] = useState<CrmleadType | null>(null);
  const [showModal, setShowModal] = useState(false);


  const handleOpenModal = (lead: CrmleadType) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLead(null);
  };



  const handleDelete = async (id:number) => {
    const confirmed = window.confirm('Are you sure you want to delete this crmlead?');
    if (!confirmed) return;

    try {
      const response = await fetch(`${BASE_URL}crm-lead/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        successToast('Deleted successfully');
        OnSuccess()
      } else {
        errorToast('Something went wrong, please try again later');
      }
    } catch (error) {
      errorToast('Something went wrong, please try again later');
    }
  };

  const columns: ColumnDef<CrmleadType>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <FormCheck
          id="select-all"
          type="checkbox"
          onChange={(e) => {
            const checked = e.target.checked;
            table.getRowModel().rows.forEach(row => {
              row.getToggleSelectedHandler()(checked);
            });
          }}
        />
      ),
      cell: ({ row: { id, getIsSelected, getToggleSelectedHandler } }) => (
        <div style={{ width: 16 }}>
          <FormCheck
            id={`checkbox-${id}`}
            checked={getIsSelected()}
            onChange={getToggleSelectedHandler()}
          />
        </div>
      ),
    },
    {
      header: 'Mobile',
      accessorKey: 'mobile',
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Source',
      accessorKey: 'source',
    },

    {
      header: 'Status',
      accessorKey: 'status',
    },

    {
      id: 'action',
      header: () => <div className="text-end">Action</div>,
      cell: ({ row: { original } }) => {
      

      

        return (
          <div className="text-end w-100">
           
            <span role="button">
              <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" onClick={() => { handleDelete(original.id) }} />
            </span>
            <span role="button" onClick={() => handleOpenModal(original)}>
              <IconifyIcon icon="la:exchange-alt" className="text-secondary fs-18" />
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <ReactTable<CrmleadType>
        columns={columns}
        data={crmlead}
        tableClass="mb-0"
        theadClass="table-light"
        showPagination
      />


      <LeadStatusModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        selectedLead={selectedLead}
        OnSuccess={OnSuccess}
    
      />
    </>
  );
};

export default CrmLeadTable;
