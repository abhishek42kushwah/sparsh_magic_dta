import ReactTable from '@/components/TablePagination/index';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { ProductType } from '@/types/data';
import { getProductStatusIcon, getProductStatusVariant } from '@/utils/variants-icons';
import { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DeleteConfirmationModal from '../../DeleteModal/DeleteConfirmationModal';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast, successToast } from '@/utils/toastMassage';
import { useS3Url } from '../../ImageUrl/ImageUrl';
import { useAuthContext } from '@/context/useAuthContext';
const ProductTable = ({
  products,
  currentPage,
  totalPages,
  setCurrentPage,
  subCats,
  category,
  availableBrand,
  total,
  limit,
  setLimit,
  setProducts
}: {
  products: ProductType[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  total: number;
  subCats: any[];
  category: any[];
  availableBrand: any[];
  setLimit: (limit: number) => void;
  limit: number;
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const filterSubList = subCats.filter((item: any) => item !== 'All');
  const filterBrandList = availableBrand.filter((item: any) => item !== 'All');
  const s3url = useS3Url();
  const { user } = useAuthContext();
  const role = user?.role;
  const filterMainCats = category.filter((item: any) => item?.name !== 'All');
  const confirmDeleteHandler = async () => {
    if (!selectedProduct) return;

    const sku = selectedProduct?.sku;
    const apiUrl = `${BASE_URL}products/${sku}`;

    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok && data.success) {
          successToast('Product deleted successfully');
          setProducts((prevProducts: any) => prevProducts.filter((product: any) => product.sku !== sku));
          setShowDeleteModal(false);
        } else {
          errorToast(data.message || 'Something went wrong');
        }
      })
      .catch((error: any) => {
        errorToast(error.message || 'Something went wrong');
      });
  };

  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: 'sku',
      header: 'SKU Name',
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ getValue }) => <div>{getValue<string>()}</div>
    },
    {
      accessorKey: 'DisplayName',
      header: 'Product Name',
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({
        row: {
          original: { thumbnail, DisplayName, description }
        }
      }) => (
        <div className="ps-3">
          {thumbnail ? (
            <a href={`${s3url}${thumbnail}`} target="_blank" rel="noopener noreferrer">
              <img src={`${s3url}${thumbnail}`} height={40} alt={thumbnail} className="d-inline rounded me-1" />
            </a>
          ) : (
            <div className="placeholder-thumbnail">No Image</div>
          )}
          <p className="d-inline-block align-middle mb-0">
            <div className="d-inline-block align-middle mb-0 product-name">{DisplayName}</div>
            <br />
            <span className="text-muted font-13">{description?.length > 30 ? description.slice(0, 30) + '...' : description}</span>
          </p>
        </div>
      )
    },
    {
      accessorKey: 'masterCat',
      header: 'Master Cat',
      enableSorting: false,
      enableColumnFilter: false
    },
    {
      accessorKey: 'mainCat',
      header: 'Main Cat',
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        options: {
          filterOptions: filterMainCats.map((item: any) => ({
            value: item?.name,
            label: item?.name
          }))
        }
      }
    },
    {
      accessorKey: 'subCat',
      header: 'Sub Cat',
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        options: {
          filterOptions: filterSubList.map((item: any) => ({
            value: item,
            label: item
          }))
        }
      }
    },
    {
      accessorKey: 'brand',
      header: 'Brand',
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        options: {
          filterOptions: filterBrandList.map((item: any) => ({
            value: item,
            label: item
          }))
        }
      }
    },
    {
      accessorKey: 'BuyPrice',
      header: 'Buy Price',
      enableSorting: false,
      enableColumnFilter: false
    },
    {
      accessorKey: 'sellPrice',
      header: 'Sell Price',
      enableSorting: false,
      enableColumnFilter: false
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ getValue }) => {
        const stock = getValue<any>();
        const variant = getProductStatusVariant(stock);
        return (
          <span className={`badge bg-${variant}-subtle text-${variant}`}>
            <IconifyIcon icon={getProductStatusIcon(stock)} className="me-1" /> {stock}
          </span>
        );
      }
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => {
        const original = row.original;
        const navigate = useNavigate();
        return (
          <div className="text-end">
            <span role="button" onClick={() => navigate('/apps/ecommerce/editproduct', { state: { original } })}>
              <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
            </span>

            {role === 'ADMIN' && (
              <span
                role="button"
                onClick={() => {
                  setSelectedProduct(original);
                  setShowDeleteModal(true);
                }}
              >
                <IconifyIcon icon="la:trash-alt" className="text-danger fs-18" />
              </span>
            )}
          </div>
        );
      }
    }
  ];

  if (products && products.length === 0) {
    return (
      <div className="text-center my-4">
        <h4>No Data Found</h4>
      </div>
    );
  }

  return (
    <div>
      <ReactTable<ProductType>
        columns={columns}
        data={products}
        tableClass="mb-0 checkbox-all text-nowrap"
        theadClass="table-light"
        showPagination
        limit={limit}
        setLimit={setLimit}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        total={total}
      />
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        handleConfirm={confirmDeleteHandler}
        bannerName="Product"
      />
    </div>
  );
};

export default ProductTable;
