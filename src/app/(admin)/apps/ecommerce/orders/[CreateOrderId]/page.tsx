import type { OrderListType } from '@/types/data';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import type { ItemListType } from '@/types/data';
import DeliveryDetail from './components/DeliveryDetail';
import OrderInformation from './components/OrderInformation';
import OrderItems from './components/OrderItems';
import OrderSummary from './components/OrderSummary';
import PageMetaData from '@/components/PageMetaData';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast } from '@/utils/toastMassage';

const OrderDetails = () => {
  const [newItems, setNewItems] = useState<ItemListType[]>([]);
  const [order, setOrder] = useState<OrderListType | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orderItems] = useState<any[]>([]);
  const fetchOrder = async () => {
    try {
      const response = await fetch(`${BASE_URL}orders/detail`);
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      const data = await response.json();
      const resultData = data.result?.orderInfo.map((item: any) => item);
      setOrder(resultData[0]);
    } catch (error: any) {
      errorToast(error.message || 'An unexpected error occurred');
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}products`);
      const data = await res.json();
      setProducts(data.success && data.result ? data.result.products : []);
    } catch (error: any) {
      errorToast(error.message || 'Filter failed');
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchOrder();
    fetchProducts();
  }, []);

  return (
    <>
      <PageMetaData title="Order Details" />
      <Row>
        <Col >
          {order ? (
            <OrderItems newItems={newItems} setNewItems={setNewItems} orderItems={orderItems} products={products} />
          ) : (
            <p>Loading order items...</p>
          )}
        </Col>
        
          <DeliveryDetail />
          <OrderSummary newItems={newItems} />
          <OrderInformation />
      </Row>
    </>
  );
};

export default OrderDetails;
