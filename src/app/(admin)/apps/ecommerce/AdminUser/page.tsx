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
import AdminUserTable from './components/AdminUserTable';
import { useEffect, useState } from 'react';
import type { AdminUserType } from '@/types/data';
import PageMetaData from '@/components/PageMetaData';
import { BASE_URL } from '@/types/validationSchema';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuthContext } from '@/context/useAuthContext';
import CreateAdminUserModal from './components/CreateAdminUserModal';
const AdminUserPage = () => {
  const [adminUser, setAdminUser] = useState<AdminUserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal,setOpenModal] = useState(false)
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { user } = useAuthContext();
  const Token = user?.token;

  const fetchAdminUser = async () => {
    setLoading(true);

    try {
      let url = `${BASE_URL}admin/users`;
      if (debouncedSearch.trim() !== '') {
        url = `${BASE_URL}admin/users/${debouncedSearch.trim()}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });

      const data = await response.json();

     
      if (debouncedSearch.trim() !== '') {
        setAdminUser(data?.result ? [data.result] : []);
      } else {
       
        setAdminUser(data?.result || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setAdminUser([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminUser();
  }, [debouncedSearch]);

  return (
    <>
      <PageMetaData title="Admin User" />

      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Admin User</CardTitle>
                </Col>

                {/* SEARCH INPUT */}
                <Col xs="auto" className="position-relative">
                  <FormControl
                    type="text"
                    placeholder="Search By User ID"
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
                    onClick={()=>setOpenModal(true)}
                  >
                    <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Create Admin User
                  </button>
                </Col>
              </Row>
            </CardHeader>

            <CardBody className="pt-0">
              {loading ? (
                <div className="d-flex justify-content-center py-4">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : adminUser.length === 0 ? (
                <div className="d-flex justify-content-center py-4">
                  <p>No Data Found</p>
                </div>
              ) : (
                <AdminUserTable adminUser={adminUser} setAdminUser={setAdminUser} />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      <CreateAdminUserModal show={openModal} onClose={()=>setOpenModal(false)} setAdminUser={setAdminUser} />
    </>
  );
};

export default AdminUserPage;
