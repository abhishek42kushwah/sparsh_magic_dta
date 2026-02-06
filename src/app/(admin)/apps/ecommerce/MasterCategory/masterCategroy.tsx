import React from 'react';
import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { masterCategoryType } from '@/types/data';
import { errorToast, successToast } from '@/utils/toastMassage';
import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../DeleteModal/DeleteConfirmationModal';
import { BASE_URL } from '@/types/validationSchema';
import { useS3Url } from '../ImageUrl/ImageUrl';
import { useAuthContext } from '@/context/useAuthContext'
const MasterCategoryTable = ({
  masterCategoryData,
  setMasterCategoryData
}: {
  masterCategoryData: masterCategoryType[];
  setMasterCategoryData: (data: masterCategoryType[]) => void;
}) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<masterCategoryType | null>(null);
  const s3url = useS3Url();
   const { user } = useAuthContext()
   const role = user?.role;
  const handleDeleteConfirm = async () => {
    if (!selectedItem) return;

    try {
      const response = await fetch(`${BASE_URL}mastercat?name=${selectedItem.name}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (response.ok && data.success) {
        successToast('Deleted successfully');
        setMasterCategoryData(masterCategoryData.filter((cat) => cat.id !== selectedItem.id));
      } else {
        errorToast(data.message || 'Failed to delete category');
      }
    } catch (error: any) {
      errorToast(error.message || 'Something went wrong');
    } finally {
      setOpenModal(false);
      setSelectedItem(null);
    }
  };

  const columns: ColumnDef<masterCategoryType>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: ({ row }) => <span>{row.original.id}</span>
    },
    {
      header: 'Name',
      accessorKey: 'name',
      cell: ({ row }) => <span className="d-block text-body">{row.original.name}</span>
    },
    {
      header: 'Image',
      accessorKey: 'image',
      cell: ({ row }) => <img src={`${s3url}${row.original.image}`} alt="category" height={40} />
    },
    {
      id: 'action',
      header: () => <div className="text-end">Action</div>,
      cell: ({ row }) => (
        <div className="text-end w-100">
          <span
            role="button"
            onClick={() => navigate(`/apps/ecommerce/editmastercategory`, { state: { row: row.original } })}
            className="me-2"
          >
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
           {role === 'ADMIN' && (
            <span
              role="button"
              onClick={() => {
                setSelectedItem(row.original);
                setOpenModal(true);
              }}
            >
              <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
            </span>
          )}
        </div>
      )
    }
  ];

  return (
    <>
      <ReactTable<masterCategoryType>
        columns={columns}
        data={masterCategoryData}
        tableClass="mb-0"
        theadClass="table-light"
        showPagination
      />

      <DeleteModal
        show={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedItem(null);
        }}
        handleConfirm={handleDeleteConfirm}
        bannerName="Master Category"
      />
    </>
  );
};

export default MasterCategoryTable;
