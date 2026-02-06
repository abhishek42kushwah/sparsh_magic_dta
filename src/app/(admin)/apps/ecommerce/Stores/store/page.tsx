import IconifyIcon from '@/components/wrappers/IconifyIcon';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Dropdown,
  FormControl,
  Spinner,
} from 'react-bootstrap';
import Storetable from './components/StoreTable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageMetaData from '@/components/PageMetaData';
import { BASE_URL } from '@/types/validationSchema';
import { getDateRange, DateItem } from '@/types/DateFilterItems';
import type { StoresType } from '@/types/data';
const Store = () => {
  const [store, setStore] = useState<StoresType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedRange, setSelectedRange] = useState('Today');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const navigate = useNavigate();

  const handleSelectRange = (range: string) => {
    setSelectedRange(range);
    const { startDate, endDate } = getDateRange(range);
    setDateRange({ startDate, endDate });
  };

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500); 

    return () => clearTimeout(timer); 
  }, [searchTerm]);

  const fetchStores = async () => {
    setLoading(true);
    const baseUrl = `${BASE_URL}store`;
    const params = new URLSearchParams();

    if (selectedRange !== 'All' && dateRange.startDate && dateRange.endDate) {
      params.append('startDate', dateRange.startDate);
      params.append('endDate', dateRange.endDate);
    }

    if (debouncedSearch.trim()) {
      params.append('name', debouncedSearch.trim());
    }

    const url = `${baseUrl}?${params.toString()}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setStore(data?.result?.stores || []);
    } catch (error) {
      setStore([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [selectedRange, debouncedSearch]);

  return (
    <>
      <PageMetaData title="Stores" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Stores</CardTitle>
                </Col>
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
                <Col xs="auto" className="position-relative">
                  <FormControl
                  type="text"
                  placeholder="Search by store name..."
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
                <Col xs="auto">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('/app/ecommerce/addstore')}
                  >
                    <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Store
                  </button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="pt-0">
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : store.length === 0 ? (
                <div className="d-flex justify-content-center">
                  <p>No Data Found</p>
                </div>
              ) : (
                <Storetable store={store} setStore={setStore} />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Store;
