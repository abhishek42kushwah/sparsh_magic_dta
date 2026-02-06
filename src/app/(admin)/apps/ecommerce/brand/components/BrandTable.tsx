import React from 'react';
import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { BrandType } from '@/types/data';
import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../DeleteModal/DeleteConfirmationModal';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast, successToast } from '@/utils/toastMassage';
import { useS3Url } from '../../ImageUrl/ImageUrl';

type Props = {
  brand: BrandType[];
  setBrand: React.Dispatch<React.SetStateAction<BrandType[]>>;
};

const BrandTable = ({ brand, setBrand }: Props) => {
  const navigate = useNavigate();
  const s3url = useS3Url();
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  
  const handleDelete = async () => {
    if (!selectedId) return;
    const apiUrl = `${BASE_URL}brandlist/${selectedId}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        successToast('Brand deleted successfully');
        setBrand((prev) => prev.filter((item) => item.id !== selectedId));
      } else {
        errorToast(data?.message || 'Failed to delete brand');
      }
    } catch (error: any) {
      errorToast(error?.message || 'Something went wrong');
    } finally {
      setOpenModal(false);
      setSelectedId(null);
    }
  };

  const columns: ColumnDef<BrandType>[] = [
    {
      id: 'image',
      header: () => <div className="ps-0">Image</div>,
      cell: ({ row }) => {
        const { image, name } = row.original;

        return (
          <div className="ps-0 text-body d-flex align-items-center">
            {image ? (
              <img
                src={`${s3url}${image}`}
                height={40}
                alt={name}
                className="d-inline rounded me-2 mt-1"
              />
            ) : (
              <div className="placeholder-thumbnail me-2">No Image</div>
            )}
          </div>
        );
      },
    },
    {
      header: 'Name',
      cell: ({ row }) => <>{row.original.name}</>,
    },
    {
      header: 'Master Category',
      cell: ({ row }) => <>{row.original.masterCat}</>,
    },
    {
      id: 'action',
      header: () => <div className="text-end">Action</div>,
      cell: ({ row: { original } }) => (
        <div className="text-end d-flex justify-content-end gap-2">
          <span
            role="button"
            onClick={() =>
              navigate(`/apps/ecommerce/editbrand`, { state: { original } })
            }
          >
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          <span
            role="button"
            onClick={() => {
              setSelectedId(original.id);
              setOpenModal(true);
            }}
          >
            <IconifyIcon icon="la:trash-alt" className="text-danger fs-18" />
          </span>
        </div>
      ),
    },
  ];

  return (
    <>
      <ReactTable<BrandType>
        columns={columns}
        data={brand}
        tableClass="mb-0 checkbox-all text-nowrap"
        theadClass="table-light"
        showPagination
      />
      <DeleteModal
        show={openModal}
        onClose={() => setOpenModal(false)}
        handleConfirm={handleDelete}
        bannerName="Brand"
      />
    </>
  );
};

export default BrandTable;
