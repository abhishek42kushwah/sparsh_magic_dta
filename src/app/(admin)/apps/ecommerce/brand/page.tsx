import IconifyIcon from '@/components/wrappers/IconifyIcon';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Row,
  FormControl,
  DropdownItem,
  Spinner
} from 'react-bootstrap';
import BrandTable from './components/BrandTable';
import type { BrandType } from '@/types/data';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageMetaData from '@/components/PageMetaData';
import { DateItem, getDateRange } from '@/types/DateFilterItems';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast } from '@/utils/toastMassage';
import { exportDataToCSV } from '@/types/DateFilterItems';
import { RiFileExcel2Line } from 'react-icons/ri';
const Brand = () => {
  const [brand, setBrand] = useState<BrandType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRange, setSelectedRange] = useState('This Month');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (range: string) => {
    setSelectedRange(range);
  };

  const fetchSubCategories = async () => {
    setLoading(true);
    try {
      const { startDate, endDate } = getDateRange(selectedRange);
      const params = new URLSearchParams();

      if (selectedRange !== 'All' && startDate && endDate) {
        params.append('startDate', startDate);
        params.append('endDate', endDate);
      }

      if (searchTerm) {
        params.append('name', searchTerm);
      }

      const response = await fetch(`${BASE_URL}brandlist?${params.toString()}`);
      const data = await response.json();

      if (data?.success) {
        setBrand(data.result?.brands || []);
      } else {
        setBrand([]);
      }
    } catch (error: any) {
      errorToast(error);
      setBrand([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSubCategories();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedRange]);

  return (
    <>
      <PageMetaData title="Brand" />
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Brand</CardTitle>
                </Col>
                <Col xs="auto">
                  <Row className="g-2 align-items-center">
                    <Col xs="auto">
                      <Dropdown>
                        <DropdownToggle className="btn btn-light d-flex align-items-center">
                          <i className="icofont-calendar fs-5 me-1" />
                          {selectedRange}
                          <IconifyIcon icon="la:angle-down" className="ms-1" />
                        </DropdownToggle>
                        <DropdownMenu align="end">
                          {DateItem.map((range) => (
                            <DropdownItem key={range} onClick={() => handleSelect(range)}>
                              {range}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </Col>

                    <Col xs="auto">
                      <div className="position-relative">
                        <FormControl
                          type="text"
                          placeholder="Search brands..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                          <IconifyIcon
                            icon="mdi:close-circle"
                            className="position-absolute end-0 top-50 translate-middle-y me-2 text-muted"
                            role="button"
                            onClick={() => setSearchTerm('')}
                          />
                        )}
                      </div>
                    </Col>

                    <Col xs="auto">
                      <Button variant="primary" onClick={() => exportDataToCSV(brand, selectedRange, 'Brand')}>
                        <IconifyIcon icon="fa6-solid:download" /> <RiFileExcel2Line size={20} />
                      </Button>
                    </Col>

                    <Col xs="auto">
                      <Button onClick={() => navigate('/apps/ecommerce/addbrand')} variant="primary">
                        <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Brand
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardHeader>

            <CardBody className="pt-0">
              {loading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : brand && brand.length > 0 ? (
                <BrandTable brand={brand} setBrand={setBrand} />
              ) : (
                <div className="text-center py-4">No brands found.</div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Brand;
