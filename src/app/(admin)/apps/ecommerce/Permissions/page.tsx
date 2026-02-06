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
  Dropdown,
} from 'react-bootstrap';
import PermissionsTable from './components/PermissionsTable';
import { useEffect, useMemo, useState } from 'react';
import type { PermissionType, PermissionResource } from '@/types/data';
import PageMetaData from '@/components/PageMetaData';
import { BASE_URL } from '@/types/validationSchema';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuthContext } from '@/context/useAuthContext';
import CreatePermissionsModal from './components/CreatePermissionsModal';
import clsx from 'clsx';

const ALL_RESOURCES: PermissionResource[] = [
  'PRODUCT',
  'ORDER',
  'BRAND',
  'USER',
  'STORE',
  'COUPON',
  'BANNER',
  'DELIVERYBOY',
];

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState<PermissionType[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [selectedStatus, setSelectedStatus] = useState<'All' | PermissionResource>('All');

  const { user } = useAuthContext();
  const Token = user?.token;

  const isIdSearch = useMemo(() => /^\d+$/.test(debouncedSearch.trim()), [debouncedSearch]);

  const handleSelectStatus = (value: 'All' | PermissionResource) => {
    setSelectedStatus(value);
  };

  const fetchPermissions = async () => {
    setLoading(true);
    try {
      let url = `${BASE_URL}permissions`;

 
      if (debouncedSearch.trim() !== '' && isIdSearch) {
        url = `${BASE_URL}permissions/${debouncedSearch.trim()}`;
      } else {
     
        const params = new URLSearchParams();
        if (selectedStatus !== 'All') {
          params.set('resource', selectedStatus);
        }
        const qs = params.toString();
        if (qs) url = `${url}?${qs}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to fetch permissions');
      }

     
      if (debouncedSearch.trim() !== '' && isIdSearch) {
        setPermissions(data?.result ? [data.result as PermissionType] : []);
      } else {
        setPermissions((data?.result as PermissionType[]) || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setPermissions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
   
  }, [debouncedSearch, selectedStatus]);

  return (
    <>
      <PageMetaData title="Permissions" />

      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center g-2">
                <Col>
                  <CardTitle as="h4">Permissions</CardTitle>
                </Col>

                
                <Col xs="auto">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="link"
                      className="btn bg-primary-subtle text-primary d-flex align-items-center arrow-none"
                    >
                      <IconifyIcon icon="iconoir:filter-alt" />
                      <span className="ms-1">Resource: {selectedStatus}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="start">
                      <div className="p-1">
                        {(['All', ...ALL_RESOURCES] as const).map((filter, idx, arr) => (
                          <Dropdown.Item
                            key={filter}
                            onClick={() => handleSelectStatus(filter)}
                            className={clsx({ 'mb-2': arr.length - 1 !== idx })}
                          >
                            {filter}
                          </Dropdown.Item>
                        ))}
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

               
                <Col xs="auto" className="position-relative">
                  <FormControl
                    type="text"
                    placeholder="Search by ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ minWidth: 200 }}
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
                  <button className="btn btn-primary" onClick={() => setOpenModal(true)}>
                    <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Create Permission
                  </button>
                </Col>
              </Row>
            </CardHeader>

            <CardBody className="pt-0">
              {loading ? (
                <div className="d-flex justify-content-center py-4">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : permissions.length === 0 ? (
                <div className="d-flex justify-content-center py-4">
                  <p>No Data Found</p>
                </div>
              ) : (
                <PermissionsTable permissions={permissions} setPermissions={setPermissions} />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      <CreatePermissionsModal show={openModal} onClose={() => setOpenModal(false)} setPermissions={setPermissions} />
    </>
  );
};

export default PermissionsPage;
