import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
  DropdownItem,
  FormControl,
  Spinner,
} from 'react-bootstrap';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import PageMetaData from '@/components/PageMetaData';
import VendorPortalTable from './components/VendorPortalTable';
import { errorToast } from '@/utils/toastMassage';
import { getDateRange, DateItem } from '@/types/DateFilterItems';
import { BASE_URL } from '@/types/validationSchema';
import type { VendorPortalType } from '@/types/data';
import { useDebounce } from '@/hooks/useDebounce';

const VendorPortal = () => {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState<VendorPortalType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [selectedRange, setSelectedRange] = useState('Today');
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'O' | 'PENDING' | 'IT' | 'DL' | 'RTO'>('All');

  const statusArray = ['O', 'PENDING', 'IT', 'DL', 'RTO'] as const;

  const fetchAllVendorPortal = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (debouncedSearchTerm) {
        params.append('storeId', debouncedSearchTerm);
      }

      const { startDate, endDate } = getDateRange(selectedRange);
      if (startDate && endDate) {
        params.append('startDate', startDate);
        params.append('endDate', endDate);
      }

      if (selectedStatus !== 'All') {
        params.append('status', selectedStatus);
      }

      params.append('usertype', 'admin');

      const response = await fetch(`${BASE_URL}orders/storelist?${params.toString()}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to fetch vendor portal list');
      }

      setVendor(Array.isArray(data.result) ? data.result : []);
    } catch (error: any) {
      errorToast(error.message || 'An error occurred while fetching vendor portal list.');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, selectedRange, selectedStatus]);

  useEffect(() => {
    fetchAllVendorPortal();
  }, [fetchAllVendorPortal]);

  return (
    <>
      <PageMetaData title="Vendor Portal" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Vendor Portal</CardTitle>
                </Col>

                {/* Status Filter */}
                <Col xs="auto">
                  <Dropdown>
                    <DropdownToggle
                      variant="link"
                      className="btn bg-primary-subtle text-primary d-flex align-items-center arrow-none"
                    >
                      <IconifyIcon icon="iconoir:filter-alt" /> Status: {selectedStatus}
                    </DropdownToggle>
                    <DropdownMenu align="start">
                      <div className="p-1">
                        {['All', ...statusArray].map((filter) => (
                          <DropdownItem key={filter} onClick={() => setSelectedStatus(filter as any)}>
                            {filter}
                          </DropdownItem>
                        ))}
                      </div>
                    </DropdownMenu>
                  </Dropdown>
                </Col>

                {/* Search and Date Range */}
                <Col xs="auto">
                  <form className="row g-2">
                    <Col xs="auto" className="position-relative">
                      <FormControl
                        type="text"
                        placeholder="Search store ID"
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
                      <Dropdown>
                        <DropdownToggle className="btn btn-light d-flex align-items-center">
                          <i className="icofont-calendar fs-5 me-1" />
                          {selectedRange}
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

                    {/* Add Vendor Button */}
                    <Col xs="auto">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate('/app/ecommerce/create-vendor-portal')}
                      >
                        <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Vendor
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
              ) : vendor.length > 0 ? (
                <VendorPortalTable vendor={vendor} setVendor={setVendor} />
              ) : (
                <div className="text-center pt-4">No vendor portal list found.</div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default VendorPortal;
