import React, { useState } from 'react';
import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { CategoryType } from '@/types/data';
import type { ColumnDef } from '@tanstack/react-table';
import { FormCheck } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../../DeleteModal/DeleteConfirmationModal';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast, successToast } from '@/utils/toastMassage';
import { useS3Url } from '../../ImageUrl/ImageUrl';
interface CategoryTableProps {
  category: CategoryType[];
  setCategory: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ category, setCategory }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const navigate = useNavigate();
  const s3url = useS3Url();
  const confirmDeleteHandler = async () => {
    if (!selectedCategory) return;

    const name = selectedCategory.name;
    const encodedName = encodeURIComponent(name);

    const apiUrl = `${BASE_URL}maincat?name=${encodedName}`;

    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          setCategory(category.filter((category) => category.name !== name));
          setShowDeleteModal(false);
          successToast('Category deleted successfully');
        } else {
          throw new Error('Delete failed');
        }
      })
      .catch((error: any) => {
        errorToast(error.message || 'Failed to delete category');
      });
  };

  const columns: ColumnDef<CategoryType>[] = [
    {
      id: 'select',
      header: () => <FormCheck id="category-checkbox" />,
      cell: ({
        row: {
          original: { id }
        }
      }) => (
        <div style={{ width: 16 }}>
          <FormCheck id={`checkbox-${id}`} />
        </div>
      )
    },
    {
      header: 'Name',
      cell: ({
        row: {
          original: { name, image }
        }
      }) => (
        <div className="ps-0 text-body">
          {image ? (
            <img src={`${s3url}${image}`} height={40} alt={image} className="d-inline rounded-rounded me-1 mt-1 " />
          ) : (
            <div className="placeholder-thumbnail">No Image</div>
          )}
          <p className="d-inline-block align-middle mb-0">
            <span className="font-13 fw-medium">{name}</span>
          </p>
        </div>
      )
    },
    {
      header: 'Master Category',
      accessorKey: 'masterCat'
    },
    {
      header: 'Action',
      cell: ({ row: { original } }) => (
        <div className="text-start">
          <span role="button" onClick={() => navigate('/apps/ecommerce/editcategory', { state: { original } })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          <span
            role="button"
            onClick={() => {
              setSelectedCategory(original);
              setShowDeleteModal(true);
            }}
          >
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
          </span>
        </div>
      )
    }
  ];

  return (
    <div>
      <ReactTable<CategoryType>
        columns={columns}
        data={category}
        tableClass="mb-0 checkbox-all text-nowrap"
        theadClass="table-light"
        showPagination
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        handleConfirm={confirmDeleteHandler}
        bannerName="Category"
      />
    </div>
  );
};

export default CategoryTable;
