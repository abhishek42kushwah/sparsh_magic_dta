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
  FormControl,
  DropdownItem,
  Row,
  Spinner,
} from 'react-bootstrap';
import SubCategoryTable from './components/SubCategoryTable';
import type { SubCategoryType } from '@/types/data';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageMetaData from '@/components/PageMetaData';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast } from '@/utils/toastMassage';
import { useDebounce } from '@/hooks/useDebounce';
import { RiFileExcel2Line } from 'react-icons/ri';
import { exportDataToCSV } from '@/types/DateFilterItems';

const SubCategory = () => {
  const [subCategory, setSubCategory] = useState<SubCategoryType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [mainCat, setMainCat] = useState<any[]>([]);
  const [masterCat, setMasterCat] = useState<any[]>([]);
  const [selectedRange, setSelectedRange] = useState('All');
  const [selectedMasterCat, setSelectedMasterCat] = useState('All');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAllSubCategories = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) {
        params.append('name', debouncedSearch);
      }
      if (selectedRange !== 'All') {
        params.append('mainCat', selectedRange);
      }
      if (selectedMasterCat !== 'All') {
        params.append('masterCat', selectedMasterCat);
      }

      const response = await fetch(`${BASE_URL}subcat?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setSubCategory(data.result?.subCat || []);
      } else {
        setSubCategory([]);
      }
    } catch (error: any) {
      errorToast(error.message || 'Failed to fetch subcategories');
    } finally {
      setLoading(false);
    }
  };

  const fetchMainCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}maincat`);
      const data = await response.json();

      if (data.success) {
        setMainCat(data.result?.mainCats || []);
      }
    } catch (error) {
      errorToast('Failed to fetch main categories');
    }
  };

  const fetchMasterCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}mastercat`);
      const data = await response.json();

      if (data.success) {
        setMasterCat(data.result?.masterCats || []);
      }
    } catch (error) {
      errorToast('Failed to fetch master categories');
    }
  };

  const handleSelectMainCat = (category: string) => {
    setSelectedRange(category);
  };

  const handleSelectMasterCat = (category: string) => {
    setSelectedMasterCat(category);
  };

  useEffect(() => {
    fetchMainCategories();
    fetchMasterCategories();
  }, []);

  useEffect(() => {
    fetchAllSubCategories();
  }, [debouncedSearch, selectedRange, selectedMasterCat]);

  return (
    <>
      <PageMetaData title="Sub Category" />
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Sub Category</CardTitle>
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
                          <IconifyIcon icon="iconoir:filter-alt" /> Master Cat: {selectedMasterCat}
                        </DropdownToggle>
                        <DropdownMenu align="start">
                          <div className="p-2">
                            <DropdownItem
                              onClick={() => handleSelectMasterCat('All')}
                              className={clsx({ 'mb-2': masterCat.length })}
                            >
                              All
                            </DropdownItem>
                            {masterCat.map((cat, idx) => (
                              <DropdownItem
                                key={idx}
                                onClick={() => handleSelectMasterCat(cat.name)}
                                className={clsx({ 'mb-2': masterCat.length - 1 !== idx })}
                              >
                                {cat.name}
                              </DropdownItem>
                            ))}
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                    </Col>

                   
                    <Col xs="auto">
                      <Dropdown>
                        <DropdownToggle
                          variant="link"
                          className="btn bg-primary-subtle text-primary d-flex align-items-center arrow-none"
                          role="button"
                        >
                          <IconifyIcon icon="iconoir:filter-alt" /> Main Cat: {selectedRange}
                        </DropdownToggle>
                        <DropdownMenu align="start">
                          <div className="p-2">
                            <DropdownItem
                              onClick={() => handleSelectMainCat('All')}
                              className={clsx({ 'mb-2': mainCat.length })}
                            >
                              All
                            </DropdownItem>
                            {mainCat.map((cat, idx) => (
                              <DropdownItem
                                key={idx}
                                onClick={() => handleSelectMainCat(cat.name)}
                                className={clsx({ 'mb-2': mainCat.length - 1 !== idx })}
                              >
                                {cat.name}
                              </DropdownItem>
                            ))}
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                    </Col>

                   
                    <Col xs="auto" className="position-relative">
                      <FormControl
                        type="text"
                        placeholder="Search subcategories..."
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
                    </Col>

                    
                    <Col xs="auto">
                      <Button variant="primary" onClick={() => exportDataToCSV(subCategory, 'ALL', 'subCategory')}>
                        <IconifyIcon icon="fa6-solid:download" /> <RiFileExcel2Line size={20} />
                      </Button>
                    </Col>

                   
                    <Col xs="auto">
                      <Button
                        onClick={() => navigate('/apps/ecommerce/addsubcategory')}
                        variant="primary"
                        type="button"
                        className="icons-center"
                      >
                        <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Sub Category
                      </Button>
                    </Col>
                  </form>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="pt-0">
              {loading ? (
                <div className="d-flex pt-5 justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : subCategory && subCategory.length > 0 ? (
                <SubCategoryTable subCategory={subCategory} setSubCategory={setSubCategory} />
              ) : (
                <div className="d-flex pt-5 justify-content-center">No subcategories found.</div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SubCategory;
