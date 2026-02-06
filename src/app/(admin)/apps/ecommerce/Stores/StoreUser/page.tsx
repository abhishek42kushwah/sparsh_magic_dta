import IconifyIcon from '@/components/wrappers/IconifyIcon';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  FormControl,
  Spinner,
} from 'react-bootstrap';
import StoreUsertable from './components/StoreUserTable';
import { useEffect, useRef, useState } from 'react';
import type { StoreUsersType } from '@/types/data';
import { useNavigate } from 'react-router-dom';
import PageMetaData from '@/components/PageMetaData';
import { BASE_URL } from '@/types/validationSchema';

const StoreUser = () => {
  const [storeUsers, setStoreUsers] = useState<StoreUsersType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 400);
  }, [searchTerm]);

  const fetchStoreUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearchTerm) {
        params.append('name', debouncedSearchTerm);
      }
     
      const url = `${BASE_URL}storeusers?${params.toString()}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setStoreUsers(data?.result?.stores || []);
    } catch (error) {
      console.error('Error:', error);
      setStoreUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreUsers();
  }, [debouncedSearchTerm]);

  return (
    <>
      <PageMetaData title="Store Users" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Store Users</CardTitle>
                </Col>
                <Col xs="auto" className="position-relative">
                  <FormControl
                  type="text"
                  placeholder="Search by username..."
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
                    onClick={() => navigate('/app/ecommerce/addstoreuser')}
                  >
                    <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add StoreUser
                  </button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="pt-0">
              {loading ? (
                <div className="d-flex justify-content-center py-4">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : storeUsers.length === 0 ? (
                <div className="d-flex justify-content-center py-4">
                  <p>No Data Found</p>
                </div>
              ) : (
                <StoreUsertable storeUsers={storeUsers} setStoreUsers={setStoreUsers} />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default StoreUser;
