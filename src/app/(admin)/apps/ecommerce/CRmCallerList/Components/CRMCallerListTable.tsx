import { useState } from 'react';
import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { CrmCallerListType } from '@/types/data';
import type { ColumnDef } from '@tanstack/react-table';
import { FormCheck } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LeadStatusModal from './CrmCallerListStatusModal';
import { getCrmCallerListStatusIcon, getCrmCallerStatusVariant } from '@/utils/variants-icons';
import { errorToast, successToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';

const CRMCallerListTable = ({ crmCallerList, onDeleteSuccess }: { crmCallerList: CrmCallerListType[], onDeleteSuccess: () => void }) => {
  const [selectedLead, setSelectedLead] = useState<CrmCallerListType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const pageSizeList = [2, 5, 10, 20, 50];

  const handleOpenModal = (lead: CrmCallerListType) => {
    setSelectedLead(lead);
    setStatus(lead.password || '');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLead(null);
  };

  const handleSaveStatus = () => {
    console.log(`Updating password of lead ID ${selectedLead?.id} to ${status}`);
    handleCloseModal();
  };

  

  const handleDelete = async (id:number) => {
    const confirmed = window.confirm('Are you sure you want to delete this crmcaller?');
    if (!confirmed) return;
    try {
      const response = await fetch(`${BASE_URL}crm-caller/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        successToast('Deleted successfully');
        onDeleteSuccess();
      } else {
        errorToast('Something went wrong, please try again later');
      }
    } catch (error) {
      errorToast('Something went wrong, please try again later');
    }
  };

  const columns: ColumnDef<CrmCallerListType>[] = [
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
      cell: ({
        row: { id, getIsSelected, getToggleSelectedHandler },
      }) => (
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
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Login Id',
      accessorKey: 'loginId',
    },
    {
      header: 'Password',
      accessorKey: 'password',
    },

    {
      header: 'Status',
      cell: ({
        row: {
          original: { status },
        },
      }) => (
        <span className={`badge bg-${getCrmCallerStatusVariant(status)}-subtle text-${getCrmCallerStatusVariant(status)}`}>
          <IconifyIcon icon={getCrmCallerListStatusIcon(status)} className="me-1" /> {status}
        </span>
      ),
    },
    {
      id: 'action',
      header: () => <div className="text-end">Action</div>,
      cell: ({ row: { original } }) => (
        <div className="text-end w-100">
          <span role="button" onClick={() =>  navigate(`/app/ecommerce/crmcallerlistedit`, { state: original })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18 me-2" />
          </span>
          <span role="button">
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" onClick={() => handleDelete(original.id)} />
          </span>
          <span role="button" onClick={() => handleOpenModal(original)}>
            <IconifyIcon icon="la:exchange-alt" className="text-secondary fs-18" />
          </span>
        </div>
      ),
    },
  ];

  return (
    <>
      <ReactTable<CrmCallerListType>
        columns={columns}
        data={crmCallerList}
        rowsPerPageList={pageSizeList}
        pageSize={10}
        tableClass="mb-0"
        theadClass="table-light"
        showPagination
      />

      {selectedLead && (
        <LeadStatusModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          selectedLead={selectedLead}
          password={status}
          setPassword={setStatus}
          handleSavePassword={handleSaveStatus}
        />
      )}
    </>
  );
};

export default CRMCallerListTable;
