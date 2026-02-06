import type { ItemListType } from '@/types/data';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import DeliveryDetail from './components/DeliveryDetail';
import OrderInformation from './components/OrderInformation';
import OrderItems from './components/OrderItems';
import OrderSummary from './components/OrderSummary';
import PageMetaData from '@/components/PageMetaData';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast } from '@/utils/toastMassage';

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderItems, setOrderItems] = useState<ItemListType[]>([]);
  const [dataAmount,setDataAmount]=useState()
  const fetchOrder = async () => {
    try {
      const response = await fetch(`${BASE_URL}orders/detail?orderId=${orderId}`);
      if (!response.ok) throw new Error('Failed to fetch order details');

      const data = await response.json();
      const orderData = data.result?.orderInfo?.[0];
      setDataAmount(orderData)
      setOrderItems(orderData?.orderItems || []);
    } catch (error: any) {
      errorToast(error.message || 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    if (orderId) fetchOrder();
  }, [orderId]);

  return (
    <>
      <PageMetaData title="Order Details" />
      <Row>
        <Col lg={8}>
          <OrderItems id={orderId || ''} orderItems={orderItems} setOrderItems={setOrderItems} />
        </Col>
        <Col lg={4}>
          <DeliveryDetail />
          <OrderSummary dataAmount={dataAmount} />
          <OrderInformation />
        </Col>
      </Row>
    </>
  );
};

export default OrderDetails;
