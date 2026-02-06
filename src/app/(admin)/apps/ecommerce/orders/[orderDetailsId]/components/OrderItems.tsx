import { currency } from '@/context/constants';
import type { ItemListType } from '@/types/data';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';

interface OrderItemsProps {
  id: number | string;
  orderItems: ItemListType[];
  setOrderItems: React.Dispatch<React.SetStateAction<ItemListType[]>>;
}

const OrderItems = ({ id, orderItems }: OrderItemsProps) => {
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as="h4">Order #{id}</CardTitle>
          </Col>
        </Row>
      </CardHeader>

      <CardBody className="pt-0">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Product ID</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.length > 0 ? (
                orderItems.map((item) => (
                  <tr key={item.id}>
                    <td>{id}</td>
                    <td>{item.productId}</td>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td className="text-end">
                      {currency}
                      {item.total}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    No order items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderItems;
