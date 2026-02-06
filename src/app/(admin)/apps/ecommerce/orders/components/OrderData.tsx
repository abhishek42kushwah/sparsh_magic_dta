import { useEffect, useState } from 'react';
import {
  Card, CardBody, CardHeader, CardTitle, Col,
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row,
} from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { errorToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';
import { DateItem, getDateRange } from '@/types/DateFilterItems';

type OrderStatsType = {
  totalOrders: number;
  newOrders: number;
  returningOrdersPercentage: number;
  bounceRatePercentage: number;
};

const OrderData = () => {
  const [selectedRange, setSelectedRange] = useState('This Week');
  const [orderData, setOrderData] = useState<OrderStatsType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (range: string) => {
    setSelectedRange(range);
  };

  const fetchOrderData = async () => {
    setLoading(true);
    try {
      const { startDate, endDate } = getDateRange(selectedRange);
      const params = new URLSearchParams({ startDate, endDate });

      const response = await fetch(`${BASE_URL}orders/OrderStatistics?${params.toString()}`);
      const data = await response.json();

      if (data.success && data.result) {
        setOrderData(data.result);
      } else {
        setOrderData(null);
        errorToast('Error fetching order data');
      }
    } catch {
      setOrderData(null);
      errorToast('Error fetching order data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [selectedRange]);

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle>Orders Data</CardTitle>
          </Col>
          <Col xs="auto">
            <Dropdown>
              <DropdownToggle className="btn btn-light">
                <i className="icofont-calendar fs-5" /> {selectedRange}
                <IconifyIcon icon="la:angle-down" className="ms-1" />
              </DropdownToggle>
              <DropdownMenu align="end">
                {DateItem.map((range) => (
                  <DropdownItem
                    key={range}
                    active={selectedRange === range}
                    onClick={() => handleSelect(range)}
                  >
                    {range}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </CardHeader>

      <CardBody className="pt-0">
        <Row className="g-3">
          {loading ? (
            <div className="text-center w-100 text-muted py-3">Loading...</div>
          ) : orderData ? (
            <>
              <StatBox label="Total Orders" value={orderData.totalOrders} />
              <StatBox label="Pending Orders" value={orderData.newOrders} />
              <StatBox label="Cancel Orders " value={orderData.newOrders}/>
              <StatBox label="RTO Orders" value={orderData.totalOrders}/>
                <StatBox label="delivered  Orders" value={orderData.newOrders} />
                  <StatBox label="Under Proccessing Orders" value={orderData.newOrders} />
            </>
          ) : (
            <div className="text-center w-100 text-muted py-3">No data available</div>
          )}
        </Row>
      </CardBody>
    </Card>
  );
};

const StatBox = ({ label, value }: { label: string; value: string | number }) => (
  <Col md={6}>
    <Card className="shadow-none border mb-3 mb-lg-0">
      <CardBody>
        <div className="text-center">
          <span className="fs-18 fw-semibold">{value}</span>
          <h6 className="text-uppercase text-muted mt-2 m-0">{label}</h6>
        </div>
      </CardBody>
    </Card>
  </Col>
);

export default OrderData;
