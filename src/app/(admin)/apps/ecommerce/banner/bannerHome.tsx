import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { HomeBannerType } from '@/types/data';
import { errorToast, successToast } from '@/utils/toastMassage';
import type { ColumnDef } from '@tanstack/react-table';
import { FormCheck } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/types/validationSchema';
import  DeleteModal  from '../DeleteModal/DeleteConfirmationModal';
import { useState } from 'react';
import { useS3Url } from '../ImageUrl/ImageUrl';
const BannerTable = ({
  banner,
  setBanner
}: {
  banner: HomeBannerType[];
  setBanner: React.Dispatch<React.SetStateAction<HomeBannerType[]>>;
}) => {
  const navigate = useNavigate();
  const bannerName="Banner"
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const s3url = useS3Url()
  const handleDeleteBanner = async () => {
    if (selectedId === null) return;

    try {
      const response = await fetch(`${BASE_URL}homebanner/${selectedId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        successToast('Deleted successfully');
        setBanner((prev) => prev.filter((item) => item.id !== selectedId));
      } else {
        errorToast('Something went wrong, please try again later');
      }
    } catch (error: any) {
      errorToast(error.message);
    } finally {
      setOpenModal(false);
      setSelectedId(null);
    }
  };

  const columns: ColumnDef<HomeBannerType>[] = [
    {
      id: 'select',
      header: () => <FormCheck id="checkbox" />,
      cell: ({ row: { original: { id } } }) => (
        <div style={{ width: 16 }}>
          <FormCheck id={`checkbox-${id}`} />
        </div>
      )
    },
    {
      header: 'Image',
      cell: ({ row: { original: { img } } }) => (
        <a href={`${s3url}${img}`} target="_blank" rel="noopener noreferrer">
          <img src={`${s3url}${img}`} alt="banner" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
        </a>
      )
    },
    {
      header: 'URL',
      cell: ({ row: { original: { url } } }) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      )
    },
    {
      header: 'Section',
      accessorKey: 'section'
    },
    {
      header: 'Type',
      accessorKey: 'type'
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
      cell: ({ getValue }) => new Date(getValue() as string).toISOString().split('T')[0]
    },
    {
      id: 'action',
      header: () => <div className="text-end">Action</div>,
      cell: ({ row: { original } }) => (
        <div className="text-end w-100 d-flex justify-content-end gap-2">
          <span
            role="button"
            onClick={() => {
              navigate(`/app/ecommerce/EditHomeBanner`, { state: { original } });
            }}
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
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
          </span>
        </div>
      )
    }
  ];

  return (
    <>
      <ReactTable<HomeBannerType>
        columns={columns}
        data={banner}
        pageSize={10}
        tableClass="mb-0"
        theadClass="table-light"
        showPagination
      />
      <DeleteModal
        show={openModal}
        onClose={() => setOpenModal(false)}
        handleConfirm={handleDeleteBanner}
        bannerName={bannerName}
      />
    </>
  );
};

export default BannerTable;
