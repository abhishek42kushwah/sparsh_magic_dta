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
import { useDebounce } from '@/hooks/useDebounce';
const OrderDetails = () => {
  const { orderId } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [newItems, setNewItems] = useState<ItemListType[]>([]);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [searchOrderItems, setSearchOrderItems] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchOrderItems, 500);
 const fetchOrderItems = async () => {
  try {
    const param = new URLSearchParams();
    if (debouncedSearchTerm) {
      param.append('search', debouncedSearchTerm);
    }

    const response = await fetch(`${BASE_URL}orders/detail?orderId=${orderId}&${param.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch order items');

    const data = await response.json();
    const allOrderItems =
      data.result?.orderInfo?.flatMap((order: any) => order.orderItems || []) || [];
    setOrderItems(allOrderItems);
  } catch (error: any) {
    errorToast(error.message || 'An unexpected error occurred');
  }
};


  useEffect(() => {
    fetchOrderItems();
  }, [debouncedSearchTerm]);

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
    fetchProducts();
  }, []);


  return (
    <>
      <PageMetaData title="Order Details" />
      <Row>
        <Col>
          {orderItems ? <OrderItems products={products} searchOrderItems={searchOrderItems} id={orderId} setSearchOrderItems={setSearchOrderItems} orderItems={orderItems} setOrderItems={setOrderItems}  newItems={newItems} setNewItems={setNewItems} /> : <p>Loading order items...</p>}
        </Col>
          <DeliveryDetail />
          <OrderSummary orderItems={orderItems} newItems={newItems}  />
          <OrderInformation />
      </Row>
    </>
  );
};

export default OrderDetails;
