import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { SubCategoryType } from '@/types/data';
import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { FormCheck } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import DeleteConfirmationModalProps from '../../DeleteModal/DeleteConfirmationModal';
import { BASE_URL } from '@/types/validationSchema';
import { useS3Url } from '../../ImageUrl/ImageUrl';
const SubCategoryTable = ({
  subCategory,
  setSubCategory,
}: {
  subCategory: SubCategoryType[];
  setSubCategory: React.Dispatch<React.SetStateAction<SubCategoryType[]>>;
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryType | null>(null);
  const navigate = useNavigate();
  const s3url = useS3Url()
  const confirmDeleteHandler = async () => {
    if (!selectedSubCategory) return;

    const apiUrl = `${BASE_URL}subcat?name=${encodeURIComponent(selectedSubCategory.name)}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success('Deleted successfully', { position: 'top-right' });
        setSubCategory((prev) => prev.filter((item) => item.id !== selectedSubCategory.id));
        setShowDeleteModal(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to delete', {
          position: 'top-right',
        });
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`, {
        position: 'top-right',
      });
    }
  };

  const handleDeleteClick = (subCat: SubCategoryType) => {
    setSelectedSubCategory(subCat);
    setShowDeleteModal(true);
  };

  const columns: ColumnDef<SubCategoryType>[] = [
    {
      id: 'select',
      header: () => <FormCheck id="subcategory-checkbox" />,
      cell: ({ row: { original } }) => (
        <div style={{ width: 16 }}>
          <FormCheck id={`checkbox-${original.id}`} />
        </div>
      ),
    },
    {
      id: 'name',
      header: () => <div className="ps-0">Name</div>,
      cell: ({ row: { original } }) => (
        <div className="ps-0 text-body">
         <a href={`${s3url}${original.image}`} target="_blank" rel="noopener noreferrer">
          <img
            src={`${s3url}${original.image}` || '/default-avatar.png'}
            alt="avatar"
            className="thumb-md d-inline rounded-circle me-1"
          /></a>
          <p className="d-inline-block align-middle mb-0">
            <span className="font-13 fw-medium">{original.name}</span>
          </p>
        </div>
      ),
    },
    {
      header: 'Master Category',
      cell: ({ row: { original } }) => <>{original.masterCat}</>,
    },
    {
      header: 'Main Category',
      cell: ({ row: { original } }) => <>{original.mainCat}</>,
    },
    {
      id: 'action',
      header: () => <div className="text-end">Action</div>,
      cell: ({ row: { original } }) => (
        <div className="text-end d-flex justify-content-end gap-2">
          <span
            role="button"
            onClick={() =>
              navigate('/apps/ecommerce/editsubcategory', {
                state: { original },
              })
            }
          >
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          <span role="button" onClick={() => handleDeleteClick(original)}>
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
          </span>
        </div>
      ),
    },
  ];

  return (
    <>
      <ReactTable<SubCategoryType>
        columns={columns}
        data={subCategory}
        tableClass="mb-0 checkbox-all text-nowrap"
        theadClass="table-light"
        showPagination
      />
      {selectedSubCategory && (
        <DeleteConfirmationModalProps
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          handleConfirm={confirmDeleteHandler}
          bannerName='Sub Category'
        />
      )}
    </>
  );
};

export default SubCategoryTable;
