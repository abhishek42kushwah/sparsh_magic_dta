import { useState, useEffect, useCallback, useMemo } from 'react';
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
  FormCheck,
  FormControl,
  DropdownItem,
  Spinner,
} from 'react-bootstrap';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import PageMetaData from '@/components/PageMetaData';
import WalletTxnTable from './Comment/WalletTxnTable';

import { errorToast } from '@/utils/toastMassage';
import { getDateRange, DateItem } from '@/types/DateFilterItems';
import { BASE_URL } from '@/types/validationSchema';
import type { WalletType } from '@/types/data';

const WalletTxn = () => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<WalletType[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [selectedRange, setSelectedRange] = useState('Today');
  const [loading, setLoading] = useState(false);
  const filters = useMemo(() => ['ALL', 'DEBIT', 'CREDIT'], []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const fetchAllWalletTxns = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (selectedFilter !== 'ALL') {
        params.append('type', selectedFilter);
      }

      if (debouncedSearchTerm) {
        params.append('userName', debouncedSearchTerm);
      }

      const { startDate, endDate } = getDateRange(selectedRange);
      if (startDate && endDate) {
        params.append('startDate', startDate);
        params.append('endDate', endDate);
      }

      const response = await fetch(`${BASE_URL}wallet-Txn?${params.toString()}`);
      const data = await response.json();
      setWallet(data.result?.wallettxn);
    } catch (error) {
      errorToast('An error occurred while fetching wallet transactions.');
    } finally {
      setLoading(false);
    }
  }, [selectedFilter, debouncedSearchTerm, selectedRange]);

  useEffect(() => {
    fetchAllWalletTxns();
  }, [fetchAllWalletTxns]);

  const handleFilterChange = useCallback((filter: string) => {
    setSelectedFilter((prev) => (prev === filter ? 'ALL' : filter));
  }, []);

  return (
    <>
      <PageMetaData title="Wallet Transactions" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Wallet Transactions</CardTitle>
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
                          <IconifyIcon icon="iconoir:filter-alt" className="me-1" /> Filter
                        </DropdownToggle>
                        <DropdownMenu align="start" className="p-2">
                          {filters.map((filter, idx) => (
                            <FormCheck
                              type="checkbox"
                              label={filter}
                              className="mb-2"
                              id={`filter-${idx}`}
                              key={idx}
                              onChange={() => handleFilterChange(filter)}
                              checked={selectedFilter === filter}
                            />
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </Col>

                 
                    <Col xs="auto" className="position-relative">
                      <FormControl
                      type="text"
                      placeholder="Search user name"
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
                            <DropdownItem key={range} onClick={() =>setSelectedRange(range)}>
                              {range}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </Col>

                    
                    <Col xs="auto">
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => navigate('/app/ecommerce/AddWallettxn')}
                      >
                        <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add WalletTxn
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
              ) : wallet && wallet.length > 0 ? (
                <WalletTxnTable wallet={wallet} setWallet={setWallet} />
              ) : (
                <div className="text-center pt-4">No wallet transactions found.</div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default WalletTxn;
