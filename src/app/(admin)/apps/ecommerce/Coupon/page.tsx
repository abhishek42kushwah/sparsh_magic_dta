import IconifyIcon from '@/components/wrappers/IconifyIcon';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  FormControl,
  DropdownItem,
  Spinner
} from 'react-bootstrap';
import CouponTable from './Component/CouponTable';
import { useEffect, useState, useRef } from 'react';
import PageMetaData from '@/components/PageMetaData';
import { useNavigate } from 'react-router-dom';
import { errorToast } from '@/utils/toastMassage';
import { DateItem, getDateRange } from '@/types/DateFilterItems';
import { BASE_URL } from '@/types/validationSchema';
import type { CouponType } from '@/types/data';
import Stats from './Component/Stats';
const Coupon = () => {
  const filters = ['All', 'YES', 'NO'];
  const [coupon, setCoupon] = useState<CouponType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedRange, setSelectedRange] = useState('Today');
  const [selectedLive, setSelectedLive] = useState('');
  const [loading, setLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [statsDate, setStatsData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 500);
  }, [searchTerm]);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (selectedLive && selectedLive !== 'All') {
        params.append('live', selectedLive === 'YES' ? 'YES' : 'NO');
      }

      if (selectedRange) {
        const { startDate, endDate } = getDateRange(selectedRange);
        if (startDate && endDate) {
          params.append('start_date', startDate);
          params.append('end_date', endDate);
        }
      }

      if (debouncedSearchTerm) {
        params.append('name', debouncedSearchTerm);
      }

      const url = `${BASE_URL}coupons?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        const coupons = data.result.coupons || data.result;
        setCoupon(coupons);
        setStatsData(data.result?.couponsList || []);
      } else {
        errorToast(data.message);
      }
    } catch (error:any) {
      errorToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [debouncedSearchTerm, selectedRange, selectedLive]);

  return (
    <>
      <PageMetaData title="Coupon" />
      <Row>
        <Stats statsDate={statsDate} />
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Coupon</CardTitle>
                </Col>
                <Col xs="auto">
                  <form className="row g-2">
                    <Col xs="auto">
                      <Dropdown>
                        <DropdownToggle className="btn btn-light d-flex align-items-center">
                          <i className="icofont-calendar fs-5 me-1" />
                          {selectedRange ? selectedRange : 'Select Date'}
                          <IconifyIcon icon="la:angle-down" className="ms-1" />
                        </DropdownToggle>
                        <DropdownMenu align="end">
                          {DateItem.map((range) => (
                            <DropdownItem key={range} onClick={() => setSelectedRange(range)}>
                              {range}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </Col>
                    <Col xs="auto">
                      <Dropdown>
                        <DropdownToggle className="btn btn-light">
                          {selectedLive || 'Live'}
                          <IconifyIcon icon="la:angle-down" />
                        </DropdownToggle>
                        <DropdownMenu align="end">
                          {filters.map((filter, idx) => (
                            <DropdownItem key={idx} active={selectedLive === filter} onClick={() => setSelectedLive(filter)}>
                              {filter}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </Col>
                    <Col xs="auto" className="position-relative">
                      <FormControl
                      type="text"
                      placeholder="Search coupons name"
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
                      <button type="button" className="btn btn-primary" onClick={() => navigate('/app/ecommerce/addcoupon')}>
                        <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Coupon
                      </button>
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
              ) : coupon && coupon.length > 0 ? (
                <CouponTable coupon={coupon} setCoupon={setCoupon}  />
              ) : (
                <div className="text-center pt-5">No Coupon Data Found</div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Coupon;
