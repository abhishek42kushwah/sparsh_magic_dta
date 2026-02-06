import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardHeader, CardTitle, Col, Button, Dropdown, FormControl, Row } from 'react-bootstrap';
import OrdersTable from './components/OrdersTable';
import type { OrderDetailsType } from '@/types/data';
import { useEffect, useState } from 'react';
import PageMetaData from '@/components/PageMetaData';
import OrderData from './components/OrderData';
import GrowthChart from './components/GrowthChart';
import { BASE_URL } from '@/types/validationSchema';
import { getDateRange } from '@/types/DateFilterItems';
import { useDebounce } from '@/hooks/useDebounce';
import { RiFileExcel2Line } from 'react-icons/ri';
import { exportDataToCSV } from '@/types/DateFilterItems';
import clsx from 'clsx';
import DateRangeDropdown from '@/components/form/DateRangeDropdown';
const Orders: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(50);
  const [orders, setOrders] = useState<OrderDetailsType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [selectedRange, setSelectedRange] = useState<string>('This Month');
  const [customRange, setCustomRange] = useState({ startDate: '', endDate: '' });

  const [appliedRange, setAppliedRange] = useState({
    type: 'This Month',
    startDate: '',
    endDate: ''
  });

  const debouncedSearch = useDebounce(searchTerm, 500);
  const [selectedStatus, setSelectedStatus] = useState('All');

  const statusArray = ['O', 'P', 'IT', 'DL', 'RTO', 'PENDING', 'SUCCESS', 'CANCEL'];

  const handleSelectStatus = (filter: string) => {
    setSelectedStatus(filter);
  };

  const fetchOrders = async () => {
    const params = new URLSearchParams();
    params.append('page', `${currentPage}`);
    params.append('limit', `${limit}`);
    if (appliedRange.type === 'Custom') {
      if (appliedRange.startDate && appliedRange.endDate) {
        params.append('startDate', appliedRange.startDate);
        params.append('endDate', appliedRange.endDate);
      }
    } else {
      const { startDate, endDate } = getDateRange(appliedRange.type);
      params.append('startDate', startDate);
      params.append('endDate', endDate);
    }

    if (selectedStatus !== 'All') {
      params.append('status', selectedStatus);
    }

    if (debouncedSearch.trim()) {
      params.append('mobile', debouncedSearch.trim());
    }

    let url = `${BASE_URL}orders?${params.toString()}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setTotalPages(data.result?.totalPages || 1);
      setTotal(data.result?.total || 0);

      if (Array.isArray(data.result)) {
        setOrders(data.result);
      } else {
        setOrders(data.result?.orders || []);
      }
    } catch (error) {
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [appliedRange, debouncedSearch, selectedStatus, currentPage, limit]);

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
                  <CardTitle as="h4">Orders</CardTitle>
                </Col>
                <Col xs="auto">
                  <DateRangeDropdown
                    selectedRange={selectedRange}
                    onRangeChange={(range) => {
                      setSelectedRange(range);

                      const resolvedRange = typeof range === 'function' ? (range as (prev: string) => string)(selectedRange) : range;
                      if (resolvedRange !== 'Custom') {
                        setAppliedRange({ type: resolvedRange, startDate: '', endDate: '' });
                      }
                    }}
                    customRange={customRange}
                    onCustomRangeChange={setCustomRange}
                    onApplyCustomRange={(range) => {
                      setAppliedRange({
                        type: 'Custom',
                        startDate: range.startDate,
                        endDate: range.endDate
                      });
                    }}
                  />
                </Col>
                <Col xs="auto">
                  <Dropdown>
                    <Dropdown.Toggle variant="link" className="btn bg-primary-subtle text-primary d-flex align-items-center arrow-none">
                      <IconifyIcon icon="iconoir:filter-alt" /> Status:
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
                <Col xs="auto">
                  <Button variant="primary" onClick={() => exportDataToCSV(orders, appliedRange, 'Orders')}>
                    <IconifyIcon icon="fa6-solid:download" /> <RiFileExcel2Line size={20} />
                  </Button>
                </Col>

                <Col xs="auto" className="position-relative">
                  <FormControl
                    type="text"
                    placeholder="Search by Mobile Number"
                    className="me-2"
                    aria-label="Search"
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
                {/* <Col xs="auto">
                  <button className="btn btn-primary" onClick={() => navigate('/apps/ecommerce/orders/create-order')}>
                    <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Create Order
                  </button>
                </Col> */}
              </Row>
            </CardHeader>
            <CardBody className="pt-0">
              {orders && orders.length > 0 ? (
                <OrdersTable
                  orders={orders}
                  setOrders={setOrders}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  total={total}
                  limit={limit}
                  setLimit={setLimit}
                  statusArray={statusArray}
                />
              ) : (
                <p className="text-center">No Data Found</p>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Orders;
