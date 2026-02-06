import ReactTable from '@/components/Table'; 
import type { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
interface Product {
    productId: string;
    quantity: number;
    price: number;
}

interface CreateOrderFormValues {
    products: Product[];
    discount: number;
    amountPaid: number;
    referenceNumber: string;
    total: number;
    invoiceAmount: number;
    RemainingAmount:number
  
}

const RxNewOrdersTable = ({ productData }: { productData: CreateOrderFormValues }) => {
    const columns: ColumnDef<CreateOrderFormValues>[] = [
        {
            id: 'productId',
            header: 'Product',
            accessorKey: 'products',
            cell: ({ row }) => (
                <div>
                 
                    {row.original.products.map((product, index) => (
                        <div key={`product-${index}`}>
                            <Link to={`/product/${product.productId}`}>#{product.productId}</Link>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            id: 'quantity',
            header: 'Quantity',
            accessorKey: 'products',
            cell: ({ row }) => (
                <div>
                    {row.original.products.map((product, index) => (
                        <div key={`quantity-${index}`}>{product.quantity}</div>
                    ))}
                </div>
            ),
        },
        {
            id: 'price',
            header: 'Price',
            accessorKey: 'products',
            cell: ({ row }) => (
                <div>
                    {row.original.products.map((product, index) => (
                        <div key={`price-${index}`}>${product.price.toFixed(2)}</div>
                    ))}
                </div>
            ),
        },
        {
            id: 'total',
            header: 'Total',
            accessorKey: 'total',
            cell: ({ row }) => (
                <div>${row.original.total.toFixed(2)}</div>
            ),
        },
        {
            id: 'discount',
            header: 'Discount (%)',
            accessorKey: 'discount',
            cell: ({ row }) => (
                <div>{row.original.discount}%</div>
            ),
        },
        {
            id: 'amountPaid',
            header: 'Amount Paid',
            accessorKey: 'amountPaid',
            cell: ({ row }) => (
                <div>${row.original.amountPaid.toFixed(2)}</div>
            ),
        },
        {
            id: 'RemainingAmount',
            header: 'Remaining Amount',
            accessorKey: 'RemainingAmount',
            cell: ({ row }) => (
                <div>${row.original.RemainingAmount}</div>
            ),
        },
        {
            id: 'invoiceAmount',
            header: 'Invoice Amount',
            accessorKey: 'invoiceAmount',
            cell: ({ row }) => (
                <div>${row.original.invoiceAmount.toFixed(2)}</div>
            ),
        },
       
        {
            id: 'referenceNumber',
            header: 'Reference Number',
            accessorKey: 'referenceNumber',
            cell: ({ row }) => (
                <div>{row.original.referenceNumber}</div>
            ),
        },
    ];


    return (
        <ReactTable<CreateOrderFormValues>
            columns={columns}
            data={[productData]} 
            tableClass="mb-0"
            theadClass="table-light"
            showPagination
        />
    );
};

export default RxNewOrdersTable;
