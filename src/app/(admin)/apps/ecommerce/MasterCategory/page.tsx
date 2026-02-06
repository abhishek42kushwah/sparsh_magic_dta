import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormControl, Row, Spinner } from 'react-bootstrap';
import MasterCategoryTable from './masterCategroy';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageMetaData from '@/components/PageMetaData';
import { successToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';
import { exportDataToCSV } from '@/types/DateFilterItems';
import { useDebounce } from '@/hooks/useDebounce';
import type { masterCategoryType } from '@/types/data';
import { RiFileExcel2Line } from 'react-icons/ri';
const MasterCat = () => {
  const [masterCategoryData, setMasterCategoryData] = useState<masterCategoryType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const seachDebounced = useDebounce(searchTerm, 500);
  const fetchMasterCategory = async (search = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (search) params.append('name', search);
      const response = await fetch(`${BASE_URL}mastercat?${params.toString()}`);
      const data = await response.json();
      setMasterCategoryData(data.result?.masterCats || []);
    } catch (error) {
      successToast('Error fetching master categories');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterCategory(seachDebounced);
  }, [seachDebounced]);

  return (
    <>
      <PageMetaData title="Master Category" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Master Category</CardTitle>
                </Col>
                <Col xs="auto" className="position-relative">
                  <FormControl
                    type="text"
                    placeholder="Search..."
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
                <Col xs="auto">
                  <Button variant="primary" onClick={() => exportDataToCSV(masterCategoryData, 'ALL', 'masterCategory')}>
                    <IconifyIcon icon="fa6-solid:download" /> <RiFileExcel2Line size={20} />
                  </Button>
                </Col>
                <Col xs="auto">
                  <button className="btn btn-primary" onClick={() => navigate('/apps/ecommerce/addmastercategory')}>
                    <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Create Master Category
                  </button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="pt-0">
              {loading ? (
                <div className="text-center pt-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : masterCategoryData.length > 0 ? (
                <MasterCategoryTable masterCategoryData={masterCategoryData} setMasterCategoryData={setMasterCategoryData} />
              ) : (
                <div className="text-center pt-5">No Master Category Data Found</div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default MasterCat;
