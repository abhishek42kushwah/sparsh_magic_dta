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
import AdminRolesTable from './components/AdminRolesTable';
import { useEffect, useState } from 'react';
import type { AdminRolesType } from '@/types/data';
import PageMetaData from '@/components/PageMetaData';
import { BASE_URL } from '@/types/validationSchema';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuthContext } from '@/context/useAuthContext';
import CreateAdminRolesModal from './components/CreateAdminRolesModal';
const AdminRolesPage = () => {
  const [adminRoles, setAdminRoles] = useState<AdminRolesType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal,setOpenModal] = useState(false)
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { user } = useAuthContext();
  const Token = user?.token;

  const fetchAdminUser = async () => {
    setLoading(true);

    try {
      let url = `${BASE_URL}roles`;
      if (debouncedSearch.trim() !== '') {
        url = `${BASE_URL}roles/${debouncedSearch.trim()}`;
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
        setAdminRoles(data?.result ? [data.result] : []);
      } else {
       
        setAdminRoles(data?.result || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setAdminRoles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminUser();
  }, [debouncedSearch]);

  return (
    <>
      <PageMetaData title="Admin Roles" />

      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Admin Roles</CardTitle>
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
                    <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Create Admin Roles
                  </button>
                </Col>
              </Row>
            </CardHeader>

            <CardBody className="pt-0">
              {loading ? (
                <div className="d-flex justify-content-center py-4">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : adminRoles.length === 0 ? (
                <div className="d-flex justify-content-center py-4">
                  <p>No Data Found</p>
                </div>
              ) : (
                <AdminRolesTable adminRoles={adminRoles} setAdminRoles={setAdminRoles} />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      <CreateAdminRolesModal show={openModal} onClose={()=>setOpenModal(false)} setAdminRoles={setAdminRoles} />
    </>
  );
};

export default AdminRolesPage;
