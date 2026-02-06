import { Card, CardBody, CardHeader, CardTitle, Col, Button, FormControl, Row } from 'react-bootstrap';
import DeliveryTable from './components/DeliveryTable';
import type { DeliveryType } from '@/types/data';
import { useEffect, useState } from 'react';
import PageMetaData from '@/components/PageMetaData';
import { BASE_URL } from '@/types/validationSchema';
import { getDateRange } from '@/types/DateFilterItems';
import { useDebounce } from '@/hooks/useDebounce';
import { RiFileExcel2Line } from 'react-icons/ri';
import { exportDataToCSV } from '@/types/DateFilterItems';
import DateRangeDropdown from '@/components/form/DateRangeDropdown';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useAuthContext } from '@/context/useAuthContext';

const DeliveryPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(50);
  const [delivery, setDelivery] = useState<DeliveryType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRange, setSelectedRange] = useState<string>('This Month');
  const [customRange, setCustomRange] = useState({ startDate: '', endDate: '' });

  
  const [appliedRange, setAppliedRange] = useState({
    type: 'This Month',
    startDate: '',
    endDate: '',
  });

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { user } = useAuthContext();
  const role = user?.role;

  const fetchDelivery = async () => {
    const params = new URLSearchParams();
    params.append('page', `${currentPage}`);
    params.append('limit', `${limit}`);

    if (appliedRange.type === 'Custom') {
      if (appliedRange.startDate && appliedRange.endDate) {
        params.append('startDate', appliedRange.startDate);
        params.append('endDate', appliedRange.endDate);
      }
    } else {
      const { startDate, endDate } = getDateRange(appliedRange.type);
      params.append('startDate', startDate);
      params.append('endDate', endDate);
    }

    if (debouncedSearch.trim()) {
      params.append('storeId', debouncedSearch.trim());
    }

    const url = `${BASE_URL}delivery-auth/list?${params.toString()}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setTotalPages(data.result?.totalPages || 1);
      setTotal(data.result?.total || 0);
      
      if (Array.isArray(data.result?.deliveryBoys)) {
        setDelivery(data.result?.deliveryBoys);
      } else {
        setDelivery(data.result?.deliveryBoys || []);
      }
    } catch {
      setDelivery([]);
    }
  };

  useEffect(() => {
    fetchDelivery();
  }, [appliedRange, debouncedSearch, currentPage, limit]);

  return (
    <>
      <PageMetaData title="Delivery List" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Delivery List</CardTitle>
                </Col>

                {role === 'ADMIN' && (
                  <Col xs="auto">
                    <Button
                      variant="primary"
                      onClick={() => exportDataToCSV(delivery, appliedRange, 'Delivery')}
                    >
                      <IconifyIcon icon="fa6-solid:download" /> <RiFileExcel2Line size={20} />
                    </Button>
                  </Col>
                )}

                <Col xs="auto">
                  <DateRangeDropdown
                    selectedRange={selectedRange}
                    onRangeChange={(range) => {
                     
                      setSelectedRange(range);
                    
                      const resolvedRange =
                        typeof range === 'function' ? (range as (prev: string) => string)(selectedRange) : range;
                      if (resolvedRange !== 'Custom') {
                        setAppliedRange({ type: resolvedRange, startDate: '', endDate: '' });
                      }
                    }}
                    customRange={customRange}
                    onCustomRangeChange={setCustomRange}
                    onApplyCustomRange={(range) => {
                  
                      setAppliedRange({
                        type: 'Custom',
                        startDate: range.startDate,
                        endDate: range.endDate,
                      });
                    }}
                  />
                </Col>
                

                <Col xs="auto" className="position-relative">
                  <FormControl
                    type="text"
                    placeholder="Search by store Id"
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

                

               
              </Row>
            </CardHeader>

            <CardBody className="pt-0">
              {delivery && delivery.length > 0 ? (
                <DeliveryTable
                delivery={delivery}
               
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  total={total}
                  limit={limit}
                  setLimit={(value: number) => setLimit(value)}
                />
              ) : (
                <p className="text-center">No Data Found</p>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DeliveryPage;
