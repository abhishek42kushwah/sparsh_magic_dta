import { currency } from '@/context/constants';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import type { ItemListType } from '@/types/data';

const OrderSummary = ({ orderItems, newItems }: { orderItems: any; newItems: ItemListType[] }) => {
  const orderItemsWithNew = [...orderItems, ...newItems];
  const subtotal = orderItemsWithNew.reduce((sum, item) => {
    const total = typeof item.total === 'number' ? item.total : parseFloat(item.total as any) || 0;
    return sum + total;
  }, 0);

  const discount = 80;
  const tax = +(subtotal * 0.18).toFixed(2);
  const shippingCost = 20;
  const covCharge = 10;
  const grandTotal = subtotal - discount + tax + shippingCost + covCharge;

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as="h4">Order Summary</CardTitle>
          </Col>
          <Col xs="auto">
            <span className="badge rounded text-warning bg-warning-subtle fs-12 p-1">
              Payment pending
            </span>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <div>
          <div className="d-flex justify-content-between">
            <p className="text-body fw-semibold">Items subtotal :</p>
            <p className="text-body-emphasis fw-semibold">{currency}{subtotal.toFixed(2)}</p>
          </div>

          <div className="d-flex justify-content-between">
            <p className="text-body fw-semibold">Discount :</p>
            <p className="text-danger fw-semibold">-{currency}{discount.toFixed(2)}</p>
          </div>

          <div className="d-flex justify-content-between">
            <p className="text-body fw-semibold">Tax (18%) :</p>
            <p className="text-body-emphasis fw-semibold">{currency}{tax.toFixed(2)}</p>
          </div>

          <div className="d-flex justify-content-between">
            <p className="text-body fw-semibold">Shipping Cost :</p>
            <p className="text-body-emphasis fw-semibold">{currency}{shippingCost.toFixed(2)}</p>
          </div>

          <div className="d-flex justify-content-between">
            <p className="text-body fw-semibold">COV Charge :</p>
            <p className="text-body-emphasis fw-semibold">{currency}{covCharge.toFixed(2)}</p>
          </div>
        </div>

        <hr className="hr-dashed" />

        <div className="d-flex justify-content-between">
          <h4 className="mb-0">Total :</h4>
          <h4 className="mb-0">{currency}{grandTotal.toFixed(2)}</h4>
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderSummary;
