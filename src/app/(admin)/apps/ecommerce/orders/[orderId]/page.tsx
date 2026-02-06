import type { OrderListType, ItemListType } from '@/types/data';
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
import { useDebounce } from '@/hooks/useDebounce';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderListType | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [newItems, setNewItems] = useState<ItemListType[]>([]);
  const [orderItems, setOrderItems] = useState<ItemListType[]>([]);
  const [searchOrderItems, setSearchOrderItems] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchOrderItems, 500);

  
  const fetchOrder = async () => {
    try {
      const response = await fetch(`${BASE_URL}orders/detail?orderId=${orderId}`);
      if (!response.ok) throw new Error('Failed to fetch order details');

      const data = await response.json();
      const orderData = data.result?.orderInfo?.[0];

      if (orderData) {
        setOrder(orderData);
        setOrderItems(orderData.orderItems || []);
      } else {
        setOrder(null);
        setOrderItems([]);
      }
    } catch (error: any) {
      errorToast(error.message || 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    if (orderId) fetchOrder();
  }, [orderId]);

  
  useEffect(() => {
    if (!order || !debouncedSearchTerm) {
      setOrderItems(order?.orderItems || []);
      return;
    }

    const filtered = order.orderItems.filter((item: any) =>
      item.productName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setOrderItems(filtered);
  }, [debouncedSearchTerm, order]);

  
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}products`);
      const data = await res.json();
      setProducts(data.success && data.result ? data.result.products : []);
    } catch (error: any) {
      errorToast(error.message || 'Failed to load products');
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <PageMetaData title="Order Details" />
      <Row>
        <Col>
          {order ? (
            <OrderItems
              id={order.orderId}
              orderItems={orderItems}
              setOrderItems={setOrderItems}
              newItems={newItems}
              setNewItems={setNewItems}
              products={products}
              searchOrderItems={searchOrderItems}
              setSearchOrderItems={setSearchOrderItems}
            />
          ) : (
            <p>Loading order details...</p>
          )}
        </Col>

        <DeliveryDetail />
        <OrderSummary orderItems={orderItems} newItems={newItems} />
        <OrderInformation />
      </Row>
    </>
  );
};

export default OrderDetails;
