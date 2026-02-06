import IconifyIcon from '@/components/wrappers/IconifyIcon';
import clsx from 'clsx';
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
  Spinner,
} from 'react-bootstrap';
import CategoryTable from './components/CategoryTable';
import type { CategoryType } from '@/types/data';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageMetaData from '@/components/PageMetaData';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast } from '@/utils/toastMassage';
import { exportDataToCSV } from '@/types/DateFilterItems';
import { RiFileExcel2Line } from 'react-icons/ri';

const Category = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [masterCategories, setMasterCategories] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMasterCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}mastercat`);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        if (data.success && data.result) {
          setMasterCategories([{ name: 'All' }, ...data.result?.masterCats || []]);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          errorToast(error.message);
        } else {
          errorToast('An unknown error occurred');
        }
      }
    };

    fetchMasterCategories();
  }, []);

  const fetchCategory = async (status = '', search = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (status && status !== 'All') {
        params.append('masterCat', status);
      }

      if (search) {
        params.append('name', search);
      }

      const url = `${BASE_URL}maincat?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setCategory(data.result?.mainCats || []);
      } else {
        setCategory([]);
      }
    } catch (error) {
      setCategory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCategory(selectedStatus, searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedStatus, searchTerm]);

  return (
    <>
      <PageMetaData title="Category" />
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Category</CardTitle>
                </Col>
                <Col xs="auto">
                  <form className="row g-2">
                    <Col xs="auto">
                      <Dropdown>
                        <DropdownToggle
                          variant="link"
                          className="btn bg-primary-subtle text-primary d-flex align-items-center arrow-none"
                          role="button"
                        >
                          <IconifyIcon icon="iconoir:filter-alt" /> {selectedStatus}
                        </DropdownToggle>
                        <DropdownMenu align="start">
                          <div className="p-2">
                            {masterCategories.map((status, idx) => (
                              <DropdownItem
                                key={idx}
                                onClick={() => setSelectedStatus(status.name)}
                                className={clsx({ 'mb-2': masterCategories.length - 1 !== idx })}
                              >
                                {status.name}
                              </DropdownItem>
                            ))}
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                    </Col>
                    <Col xs="auto" className="position-relative">
                      <FormControl
                      type="text"
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchTerm(e.target.value);
                      }}
                      />
                      {searchTerm && (
                      <IconifyIcon
                        icon="mdi:close-circle"
                        className="position-absolute end-0 top-50 translate-middle-y me-2 text-muted"
                        role="button"
                        onClick={() => setSearchTerm('')}
                      />
                      )}
                    </Col>
                    <Col xs="auto">
                      <Button variant="primary" onClick={() => exportDataToCSV(category, 'All', 'Category')}>
                         <IconifyIcon icon="fa6-solid:download" /> <RiFileExcel2Line size={20} />
                      </Button>
                    </Col>
                    <Col xs="auto">
                      <Button
                        onClick={() => navigate('/apps/ecommerce/maincategory')}
                        variant="primary"
                        type="button"
                        className="icons-center"
                      >
                        <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Category
                      </Button>
                    </Col>
                  </form>
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
              ) : (
                <>
                  {category && category.length > 0 ? (
                    <CategoryTable category={category} setCategory={setCategory} />
                  ) : (
                    <div className="text-center py-5">No categories found.</div>
                  )}
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Category;
