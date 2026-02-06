import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardHeader, CardTitle, Col, Row, Dropdown, FormControl } from 'react-bootstrap';
import RxListTable from './components/RxListTable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageMetaData from '@/components/PageMetaData';
import OrderData from './components/RxOrderList/components/RxorderData';
import GrowthChart from './components/RxOrderList/components/GrowthChart';
import clsx from 'clsx';
import { DateItem, getDateRange } from '@/types/DateFilterItems';
import { BASE_URL } from '@/types/validationSchema';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuthContext } from '@/context/useAuthContext';
const RxOrdersDetails = () => {
  const { user } = useAuthContext();
  const Token = user?.token;
  const [OrderDetail, setOrderDetail] = useState<any[]>([]);
  const [selectedRange, setSelectedRange] = useState('This Week');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const navigate = useNavigate();
  const statusArray = ['O', 'PACKED', 'IT', 'DL', 'RTO'];
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const handleSelectStatus = (filter: string) => {
    setSelectedStatus(filter);
  };

  const handleSelectRange = (range: string) => {
    setSelectedRange(range);
  };

  const fetchData = async () => {
    const { startDate, endDate } = getDateRange(selectedRange);
    const params = new URLSearchParams();
    params.append('startDate', startDate);
    params.append('endDate', endDate);
    if (selectedStatus !== 'All') params.append('status', selectedStatus);
    if (searchTerm) params.append('userName', searchTerm);

    try {
      const response = await fetch(`${BASE_URL}store/orders?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrderDetail(data?.result || []);
    } catch (error: any) {
      
      setOrderDetail([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedRange, selectedStatus, debouncedSearchTerm]);

  return (
    <>
      <PageMetaData title="Orders" />
      <Row>
        <Col md={12} lg={5}>
          <OrderData />
        </Col>
        <Col md={12} lg={7}>
          <GrowthChart />
        </Col>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Rx Order Details</CardTitle>
                </Col>

                {/* Date Filter */}
                <Col xs="auto">
                  <Dropdown>
                    <Dropdown.Toggle className="btn btn-light d-flex align-items-center">
                      <i className="icofont-calendar fs-5 me-1" />
                      {selectedRange}
                      <IconifyIcon icon="la:angle-down" className="ms-1" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                      {DateItem.map((range) => (
                        <Dropdown.Item key={range} onClick={() => handleSelectRange(range)}>
                          {range}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                {/* Status Filter */}
                <Col xs="auto">
                  <Dropdown>
                    <Dropdown.Toggle variant="link" className="btn bg-primary-subtle text-primary d-flex align-items-center arrow-none">
                      <IconifyIcon icon="iconoir:filter-alt" />
                      {selectedStatus}
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="start">
                      <div className="p-1">
                        {['All', ...statusArray].map((filter, idx) => (
                          <Dropdown.Item
                            key={idx}
                            onClick={() => handleSelectStatus(filter)}
                            className={clsx({ 'mb-2': statusArray.length - 1 !== idx })}
                          >
                            {filter}
                          </Dropdown.Item>
                        ))}
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                {/* Search */}
                <Col xs="auto" className="position-relative">
                  <FormControl
                    type="text"
                    placeholder="Search by  userName"
                    className="me-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <IconifyIcon
                      icon="mdi:close-circle"
                      className="position-absolute end-0 top-50 translate-middle-y me-3 text-muted"
                      role="button"
                      onClick={() => setSearchTerm('')}
                    />
                  )}
                </Col>

                {/* Add Order Button */}
                <Col xs="auto">
                  <button className="btn btn-primary" onClick={() => navigate('/apps/ecommerce/orders/rxorder/rxorderlistadd')}>
                    <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Rx Order
                  </button>
                </Col>
              </Row>
            </CardHeader>

            <CardBody className="pt-0">
              {OrderDetail && OrderDetail.length > 0 ? <RxListTable OrderDetail={OrderDetail} setOrderDetail={setOrderDetail} /> : <div>No orders available</div>}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default RxOrdersDetails;
