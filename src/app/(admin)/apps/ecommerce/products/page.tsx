import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DropdownItem,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Row,
  FormControl,
  Spinner,
  Button
} from 'react-bootstrap';
import { RiFileExcel2Line } from 'react-icons/ri';``
import clsx from 'clsx';
import PageMetaData from '@/components/PageMetaData';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import ProductTable from './components/ProductTable';
import Stats from './components/Stats';
import ModalExcelFilePopUp from './components/ModalExcelFilePopUp';
import { useDebounce } from '@/hooks/useDebounce';
import type { CategoryType, ProductType } from '@/types/data';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast } from '@/utils/toastMassage';
import { exportDataToCSV } from '@/types/DateFilterItems';

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchBrand, setSearchBrand] = useState<string>('');
  const [availableBrand, setAvailableBrand] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(50);
  const [stateData, setStateData] = useState<
    | {
        totalRecords: number;
        totalactiveproduct: number;
        totaldisactiveproduct: number;
      }
    | undefined
  >(undefined);
  const [selectedSubCat, setSelectedSubCat] = useState<string>('All');
  const [selectedMasterCat, setSelectedMasterCat] = useState<string>('All');
  const [subCats, setSubCats] = useState<string[]>([]);
  const [availableMasterCats, setAvailableMasterCats] = useState<string[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const statusArray = useMemo(() => ['All', ...category.map((item) => item?.name).filter(Boolean)], [category]);

  const filteredBrands = useMemo(
    () => ['All', ...availableBrand.filter((brand) => brand.toLowerCase().includes(searchBrand.toLowerCase()))],
    [availableBrand, searchBrand]
  );

  const fetchCategoryData = async () => {
    try {
      const res = await fetch(`${BASE_URL}maincat`);
      const data = await res.json();
      if (data.success && data.result) setCategory(data.result?.mainCats as CategoryType[]);
    } catch {
      errorToast('Failed to fetch categories');
    }
  };

  const fetchBrandData = async () => {
    try {
      const res = await fetch(`${BASE_URL}brandlist`);
      const data = await res.json();
      if (data.success && data.result) {
        const uniqueBrands = [...new Set(data.result?.brands.map((item: any) => item.name))] as string[];
        setAvailableBrand(uniqueBrands);
      }
    } catch {
      errorToast('Failed to fetch brands');
    }
  };

  const fetchSubCatData = async () => {
    try {
      const res = await fetch(`${BASE_URL}subCat`);
      const data = await res.json();
      if (data.success && data.result) {
        const uniqueSubCats = [...new Set(data.result?.subCat.map((item: any) => item.name))] as string[];
        setSubCats(uniqueSubCats);
      }
    } catch {
      errorToast('Failed to fetch sub-categories');
    }
  };

  const fetchMasterCatData = async () => {
    try {
      const res = await fetch(`${BASE_URL}masterCat`);
      const data = await res.json();
      if (data.success && data.result) {
        const uniqueMasterCats = [...new Set(data.result?.masterCats.map((item: any) => item.name))] as string[];
        setAvailableMasterCats(uniqueMasterCats);
      }
    } catch {
      errorToast('Failed to fetch master categories');
    }
  };

  const fetchProducts = async () => {
    const params = new URLSearchParams();

    if (selectedStatus !== 'All') params.append('mainCat', selectedStatus);
    if (selectedBrand) params.append('brand', selectedBrand);
    if (debouncedSearchTerm) {
      const isNumeric = /^\d+$/.test(debouncedSearchTerm.trim());
      if (isNumeric) {
        params.append('sku', debouncedSearchTerm);
      } else {
        params.append('DisplayName', debouncedSearchTerm);
      }
    }
    if (selectedSubCat !== 'All') params.append('subCat', selectedSubCat);
    if (selectedMasterCat !== 'All') params.append('masterCat', selectedMasterCat);
    params.append('page', `${currentPage}`);
    params.append('limit', `${limit}`);

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.success && data.result ? data.result.products : []);
      const stataData = data.result;
      setStateData(stataData);
      setTotalPages(stataData?.totalPages || 1);
      setTotal(stataData?.total || 0);
      
    } catch (error: any) {
      errorToast(error.message || 'Filter failed');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryData();
    fetchBrandData();
    fetchSubCatData();
    fetchMasterCatData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedStatus, selectedBrand, currentPage, limit, debouncedSearchTerm, selectedSubCat, selectedMasterCat]);

  const handleBrandSelect = (brand: string) => {
    if (brand === 'All') {
      setSelectedBrand('');
    } else {
      setSelectedBrand((prev) => (prev === brand ? '' : brand));
    }
  };

  return (
    <>
      <PageMetaData title="Products" />
      <Row>
        <Col xs={12}>
          {stateData && <Stats stateData={stateData} />}
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Products</CardTitle>
                </Col>
                <Col xs="auto">
                  <form className="row g-2 position-relative">
                    <Col xs="auto">
                      <Dropdown show={dropdownOpen} onToggle={() => setDropdownOpen(!dropdownOpen)}>
                        <DropdownToggle variant="link" className="btn bg-primary-subtle text-primary d-flex align-items-center arrow-none">
                          <IconifyIcon icon="iconoir:filter-alt" className="me-1" /> Filter by Brand
                        </DropdownToggle>
                        <DropdownMenu
                          style={{
                            borderRadius: '0.375rem',
                            boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          <div className="p-2">
                            <input
                              type="text"
                              placeholder="Search brands..."
                              value={searchBrand}
                              onChange={(e) => setSearchBrand(e.target.value)}
                              className="form-control mb-2"
                              style={{ border: '1px solid var(--bs-primary)' }}
                            />
                            {filteredBrands.map((brand, idx) => (
                              <DropdownItem
                                key={brand}
                                onClick={() => handleBrandSelect(brand)}
                                className={clsx({ 'mb-2': idx !== filteredBrands.length - 1 })}
                              >
                                {brand}
                              </DropdownItem>
                            ))}
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                    </Col>
                    <Col xs="auto">
                      <Dropdown>
                        <DropdownToggle variant="link" className="btn bg-primary-subtle text-primary d-flex align-items-center arrow-none">
                          <IconifyIcon icon="iconoir:filter-alt" /> MainCat: {selectedStatus}
                        </DropdownToggle>
                        <DropdownMenu>
                          <div className="p-2">
                            {statusArray.map((status, idx) => (
                              <DropdownItem
                                key={idx}
                                onClick={() => setSelectedStatus(status)}
                                className={clsx({ 'mb-2': idx !== statusArray.length - 1 })}
                              >
                                {status}
                              </DropdownItem>
                            ))}
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                    </Col>

                    <Col xs="auto">
                      <Dropdown>
                        <DropdownToggle variant="link" className="btn bg-primary-subtle text-primary d-flex align-items-center arrow-none">
                          <IconifyIcon icon="iconoir:filter-alt" /> SubCat: {selectedSubCat}
                        </DropdownToggle>
                        <DropdownMenu>
                          <div className="p-2">
                            {['All', ...subCats].map((subCat, idx) => (
                              <DropdownItem
                                key={idx}
                                onClick={() => setSelectedSubCat(subCat)}
                                className={clsx({ 'mb-2': idx !== subCats.length - 1 })}
                              >
                                {subCat}
                              </DropdownItem>
                            ))}
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                    </Col>

                    <Col xs="auto">
                      <Dropdown>
                        <DropdownToggle variant="link" className="btn bg-primary-subtle text-primary d-flex align-items-center arrow-none">
                          <IconifyIcon icon="iconoir:filter-alt" /> MasterCat: {selectedMasterCat}
                        </DropdownToggle>
                        <DropdownMenu>
                          <div className="p-2">
                            {['All', ...availableMasterCats].map((masterCat, idx) => (
                              <DropdownItem
                                key={idx}
                                onClick={() => setSelectedMasterCat(masterCat)}
                                className={clsx({ 'mb-2': idx !== availableMasterCats.length - 1 })}
                              >
                                {masterCat}
                              </DropdownItem>
                            ))}
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                    </Col>

                    <Col xs="auto">
                      <button className="btn btn-primary" type="button" onClick={() => setOpenModal(true)}>
                        <IconifyIcon icon="fa6-solid:arrow-up-from-bracket" className="me-1" />
                        <RiFileExcel2Line size={20} />
                      </button>
                    </Col>
                    <Col xs="auto">
                      <Button variant="primary" onClick={() => exportDataToCSV(products, 'ALL', 'Products')}>
                       <IconifyIcon icon="fa6-solid:download" /> <RiFileExcel2Line size={20} />
                      </Button>
                    </Col>

                    <Col xs="auto" className="position-relative">
                      <FormControl
                        type="text"
                        placeholder="Search by name or SKU..."
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
                      <button className="btn btn-primary" type="button" onClick={() => navigate('/apps/ecommerce/addnewproduct')}>
                        <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Product
                      </button>
                    </Col>
                  </form>
                </Col>
              </Row>
            </CardHeader>

            <CardBody className="pt-0">
              {loading ? (
                <div className="text-center pt-5">
                  <Spinner animation="border" role="status" />
                </div>
              ) : (
                <ProductTable
                  products={products}
                  subCats={subCats}
                  category={category}
                 availableBrand={availableBrand}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  total={total}
                  limit={limit}
                  setLimit={setLimit}
                  setProducts={setProducts}
                />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ModalExcelFilePopUp  setProducts={setProducts} show={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default ProductsPage;
