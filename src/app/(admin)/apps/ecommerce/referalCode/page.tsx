import { useEffect, useState } from 'react';
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
  DropdownItem
} from 'react-bootstrap';
import ReferralCodeTable from './components/ReferalCodetable';
import type { ReferalCode } from '@/types/data';
import PageMetaData from '@/components/PageMetaData';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/types/validationSchema';
import { errorToast } from '@/utils/toastMassage';
import { getDateRange, DateItem } from '@/types/DateFilterItems';
import { useDebounce } from '@/hooks/useDebounce';
const Page = () => {
  const [referrals, setReferrals] = useState<ReferalCode[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRange, setSelectedRange] = useState('This Week');
  const searchDebounce = useDebounce(searchTerm, 500);

  const navigate = useNavigate();

  const fetchReferralCode = async () => {
    try {
      const params = new URLSearchParams();
      const { startDate, endDate } = getDateRange(selectedRange);

      if (startDate && endDate) {
        params.append('startDate', startDate);
        params.append('endDate', endDate);
      }
      if (searchDebounce) {
        params.append('referalCode', searchDebounce);
      }

      const response = await fetch(`${BASE_URL}referalcode?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setReferrals(data.result?.referalCodes);
      }
    } catch (error: any) {
      errorToast(error.message || 'Failed to load referral codes');
    }
  };

  useEffect(() => {
    fetchReferralCode();
  }, [selectedRange, searchDebounce]);

  return (
    <>
      <PageMetaData title="Referral Code" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Referral Code</CardTitle>
                </Col>
                <Col xs="auto">
                  <form className="row g-2" onSubmit={(e) => e.preventDefault()}>
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

                    <Col xs="auto" className="position-relative">
                      <FormControl
                      type="text"
                      placeholder="Search by Referral..."
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
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate('/app/ecommerce/addreferalcode')}
                      >
                        <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Referral Code
                      </button>
                    </Col>
                  </form>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="pt-0">
              {referrals && referrals.length > 0 ? (
                <ReferralCodeTable referal={referrals} setReferrals={setReferrals} />
              ) : (
                <div className="text-center py-4">No Referral Codes found.</div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Page;