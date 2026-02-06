import type { OrderListType } from '@/types/data';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import DeliveryDetail from './components/DeliveryDetail';
import VendorInformation from './components/VendorInformation';
import VendorItems from './components/VendorItems';
import VendorSummary from './components/VendorSummary';
import PageMetaData from '@/components/PageMetaData';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast } from '@/utils/toastMassage';

const OrderDetails = () => {
  const { venderId } = useParams();
  const [vender, setVendor] = useState<OrderListType | null>(null);

  const fetchOrderItems = async () => {
    try {
    
      const response = await fetch(`${BASE_URL}orders/detail?orderId=${venderId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      const data = await response.json();
      const resultData = data.result?.orderInfo.map((item: any) => (item))
      setVendor(resultData[0]);
    } catch (error: any) {
      errorToast(error.message || 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    if (venderId) {
      fetchOrderItems();
    }
  }, [venderId]);

  return (
    <>
      <PageMetaData title="Vendors Details" />
      <Row>
        <Col lg={8}>
          {vender  ? <VendorItems vender={vender} /> : <p>Loading vendors items...</p>}
          <DeliveryDetail />
        </Col>
        <Col lg={4}>
          <VendorSummary />
          <VendorInformation />
        </Col>
      </Row>
    </>
  );
};

export default OrderDetails;
