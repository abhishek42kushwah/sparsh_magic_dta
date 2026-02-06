import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import type { OrderListType } from '@/types/data';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast } from '@/utils/toastMassage';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';

const VendorItems = ({ vender }: { vender: OrderListType }) => {
  const id = vender?.orderId;
  const [VendorItems, setVendorItems] = useState<any[]>([]);
  const fetchVendorItems = async () => {
    try {
      const response = await fetch(`${BASE_URL}order-items?orderId=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order items');
      }
      const data = await response.json();
      setVendorItems(data.result?.orderItems || []);
    } catch (error: any) {
      errorToast(error.message || 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    fetchVendorItems();
  }, []);

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as="h4">Vendors #{id}</CardTitle>
            <p className="mb-0 text-muted mt-1">15 March 2024 at 09:45 am from draft orders</p>
          </Col>
          <Col xs="auto">
            <button className="btn btn-primary">
              <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Item
            </button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>VenderId</th>
                <th>ProductId</th>
                <th>Item Name</th>
                <th className="text-end">Sell Price</th>
                <th className="text-end">Buy Price</th>
                <th className="text-end">Quantity</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>
            <tbody>
              {VendorItems.map((item: any, id) => (
                <tr key={id}>
                  <td>{item.orderId}</td>
                  <td>{item.productId}</td>
                  <td className="d-flex align-items-center gap-1">
                    {item.productImg && <img src={item.productImg} alt="product" height={40} />}
                    {item.productName}
                  </td>
                  <td className="text-center">
                    {currency}
                    {item.itemSellPriceCopy}
                  </td>
                  <td className="text-center">
                    {currency}
                    {item.itemBuyPrice}
                  </td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-end">
                    {currency}
                    {item.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default VendorItems;
