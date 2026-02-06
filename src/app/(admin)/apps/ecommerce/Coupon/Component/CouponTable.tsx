import React, { useState } from 'react';
import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { CouponType } from '@/types/data';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast, successToast } from '@/utils/toastMassage';
import type { ColumnDef } from '@tanstack/react-table';
import { FormCheck } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../DeleteModal/DeleteConfirmationModal';

type Props = {
  coupon: CouponType[];
  setCoupon: React.Dispatch<React.SetStateAction<CouponType[]>>;
};

const CouponTable = ({ coupon, setCoupon }: Props) => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState<string | number | null>(null);

  const handleDeleteCoupon = async (id: string | number) => {
    try {
      const response = await fetch(`${BASE_URL}coupons/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        successToast('Deleted successfully');
        setCoupon((prev) => prev.filter((c) => c.id !== id));
      } else {
        errorToast(response.statusText);
      }
    } catch (error:any) {
      errorToast(error.message);
    } finally {
      setOpenModal(false);
      setSelectedCouponId(null);
    }
  };

  const columns: ColumnDef<CouponType>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <FormCheck
          id="select-all"
          type="checkbox"
          onChange={(e) => {
            const checked = e.target.checked;
            table.getRowModel().rows.forEach((row) => {
              row.getToggleSelectedHandler()(checked);
            });
          }}
        />
      ),
      cell: ({ row }) => (
        <div style={{ width: 16 }}>
          <FormCheck
            id={`checkbox-${row.id}`}
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </div>
      ),
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Coupon Code',
      accessorKey: 'coupon_code',
    },
    {
      header: 'Percent',
      accessorKey: 'percent',
    },
    {
      header: 'Created At',
      accessorKey: 'created_at',
      cell: ({ getValue }) => new Date(getValue() as string).toISOString().split('T')[0],
    },
    {
      header: 'Expiry Date',
      accessorKey: 'expiry_date',
      cell: ({ getValue }) => new Date(getValue() as string).toISOString().split('T')[0],
    },
    {
      header: 'Min Amount',
      accessorKey: 'min_amount',
    },
    {
      header: 'Max Amount',
      accessorKey: 'max_amount',
    },
    {
      header: 'Live',
      accessorKey: 'live',
    },
    {
      id: 'action',
      header: () => <div className="text-end">Action</div>,
      cell: ({ row }) => {
        const { id } = row.original;
        return (
          <div className="text-end w-100 d-flex gap-2 justify-content-end">
            <span
              role="button"
              onClick={() =>
                navigate(`/app/ecommerce/Editcoupon`, { state: { original: row.original } })
              }
            >
              <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
            </span>
            <span
              role="button"
              onClick={() => {
                setSelectedCouponId(id);
                setOpenModal(true);
              }}
            >
              <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <ReactTable<CouponType>
        columns={columns}
        data={coupon}
        tableClass="mb-0"
        theadClass="table-light"
        showPagination
      />
      <DeleteModal
        show={openModal}
        onClose={() => setOpenModal(false)}
        handleConfirm={async () => {
          if (selectedCouponId) await handleDeleteCoupon(selectedCouponId);
        }}
        bannerName="coupon"
      />
    </>
  );
};

export default CouponTable;
