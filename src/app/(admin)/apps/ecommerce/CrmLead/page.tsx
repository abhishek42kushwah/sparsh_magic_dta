import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormControl, Row, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PageMetaData from '@/components/PageMetaData';
import { useNavigate } from 'react-router-dom';
import CrmLeadTable from './Components/CrmLeadTable';
import { errorToast } from '@/utils/toastMassage';
import { BASE_URL } from '@/types/validationSchema';

const CrmLead = () => {
  const [crmlead, setCrmlead] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [sourceList, setSourceList] = useState<{ name: string }[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [statusList, setStatusList] = useState<{ name: string }[]>([]);
  const [selectedRange, setSelectedRange] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const fetchCrmLead = async (sourceFilter = '', statusFilter = '') => {
      setLoading(true);
      let url = `${BASE_URL}/crm-lead`;
      const sourceQueryParam = sourceFilter && sourceFilter !== 'All' ? `source=${sourceFilter}` : '';
      const statusQueryParam = statusFilter && statusFilter !== 'All' ? `status=${statusFilter}` : '';
      const queryParams = [sourceQueryParam, statusQueryParam].filter(Boolean).join('&');
      if (queryParams.length > 0) {
        url += `?${queryParams}`;
      }
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCrmlead(data.result);
      } catch (error) {
        errorToast('Something went wrong, please try again later');
      } finally {
        setLoading(false);
      }
    };
  const fetchFilteredCrmLead = async (sourceFilter = '', statusFilter = '', startDate = '', endDate = '', mobile = '') => {
    setLoading(true);
    let url = `${BASE_URL}crm-lead`;
    const sourceQueryParam = sourceFilter && sourceFilter !== 'All' ? `source=${sourceFilter}` : '';
    const statusQueryParam = statusFilter && statusFilter !== 'All' ? `status=${statusFilter}` : '';
    const dateQueryParam = startDate && endDate ? `startDate=${startDate}&endDate=${endDate}` : '';
    const mobileQueryParam = mobile ? `mobile=${mobile}` : '';
    const queryParams = [sourceQueryParam, statusQueryParam, dateQueryParam, mobileQueryParam].filter(Boolean).join('&');
    if (queryParams.length > 0) {
      url += `?${queryParams}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCrmlead(data.result);
    } catch (error) {
      errorToast('Something went wrong, please try again later');
    } finally {
      setLoading(false);
    }
  };

  const fetchCrmLeadSource = async () => {
    try {
      const response = await fetch(`${BASE_URL}crm-lead-source`);
      const data = await response.json();
      if (data.success) {
        setSourceList([{ name: 'All' }, ...data.result]);
      } else {
        errorToast('Something went wrong, please try again later');
      }
    } catch (error) {
      errorToast('Something went wrong, please try again later');
    }
  };
  const fetchCrmLeadStatus = async () => {
    try {
      const response = await fetch(`${BASE_URL}crm-lead-status`);
      const data = await response.json();
      if (data.success) {
        setStatusList([{ name: 'All' }, ...data.result]);
      } else {
        errorToast('Something went wrong, please try again later');
      }
    } catch (error) {
      errorToast('Something went wrong, please try again later');
    }
  };

  const handleSourceFilter = (source:any) => {
    setSelectedSource(source);
    fetchCrmLead(source === 'All' ? '' : source, selectedStatus);
  };

  const handleStatusFilter = (status:any) => {
    setSelectedStatus(status);
    fetchCrmLead(selectedSource, status === 'All' ? '' : status);
  };


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    fetchFilteredCrmLead('', '', selectedSource, value);
  };


  const handleNewCrmLead = () => {
    navigate('/app/ecommerce/addcrmlead');
  };

  const handleSelect = (range:string) => {
    setSelectedRange(range);

    let start, end;
    const today = new Date();

    switch (range) {
      case 'Today':
        start = today.toISOString().split('T')[0];
        end = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0];
        break;

      case 'Last Week':
        const lastSunday = new Date(today);
        lastSunday.setDate(today.getDate() - today.getDay() - 7);
        start = lastSunday.toISOString().split('T')[0];

        const lastSaturday = new Date(lastSunday);
        lastSaturday.setDate(lastSunday.getDate() + 6);
        end = lastSaturday.toISOString().split('T')[0];
        break;

      case 'Last Month':
        start = new Date(today.setMonth(today.getMonth() - 1)).toISOString().split('T')[0];
        end = new Date().toISOString().split('T')[0];
        break;

      case 'This Year':
        start = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0];
        end = new Date().toISOString().split('T')[0];
        break;

      case 'Last Three Months':
        start = new Date(today.setMonth(today.getMonth() - 3)).toISOString().split('T')[0];
        end = new Date().toISOString().split('T')[0];
        break;

      default:
        start = '';
        end = '';
    }
    fetchFilteredCrmLead(selectedSource, selectedStatus, start, end);
  };
  const OnSuccess = () => {
    fetchCrmLead()
  }

  useEffect(() => {
    fetchCrmLead();
    fetchCrmLeadSource();
    fetchCrmLeadStatus();
  }, []);

  useEffect(() => {
    fetchFilteredCrmLead(selectedSource, selectedStatus, searchTerm);
  }, [selectedSource, selectedStatus, searchTerm]);

  return (
    <>
      <PageMetaData title="CRM Lead" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">CRM Lead</CardTitle>
                </Col>
                <Col xs="auto">
                  <FormControl
                    type="text"
                    placeholder="Search..."
                    className="me-2"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}

                  />
                </Col>
                <Col xs="auto">
                  <Dropdown>
                    <DropdownToggle className="btn btn-light">
                      <i className="icofont-calendar fs-5" />
                      {selectedRange ? ` ${selectedRange}` : 'Select Date'}
                      <IconifyIcon icon="la:angle-down" />
                    </DropdownToggle>
                    <DropdownMenu align="end">
                      {['Today', 'Last Week', 'Last Month', 'This Year', 'Last Three Months'].map((range) => (
                        <DropdownItem key={range} active={selectedRange === range} onClick={() => handleSelect(range)}>
                          {range}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>

                </Col>
                <Col xs="auto">
                  <Dropdown>
                    <DropdownToggle className="btn btn-light">
                      <i className="icofont-calendar fs-5" /> {selectedSource ? ` ${selectedSource}` : 'Source'}
                      <IconifyIcon icon="la:angle-down" />
                    </DropdownToggle>
                    <DropdownMenu align="end">
                      {sourceList.map((source, idx) => (
                        <DropdownItem
                          key={idx}
                          active={selectedSource === source.name}
                          onClick={() => handleSourceFilter(source.name)}
                        >
                          {source.name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </Col>
                <Col xs="auto">
                  <Dropdown>
                    <DropdownToggle className="btn btn-light">
                      <i className="iconoir:filter-alt fs-5" /> {selectedStatus ? ` ${selectedStatus}` : 'Status'}
                      <IconifyIcon icon="la:angle-down" />
                    </DropdownToggle>
                    <DropdownMenu align="end">
                      {statusList.map((status, idx) => (
                        <DropdownItem
                          key={idx}
                          active={selectedStatus === status.name}
                          onClick={() => handleStatusFilter(status.name)}
                        >
                          {status.name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </Col>
                <Col xs="auto">
                  <button className="btn btn-primary" onClick={handleNewCrmLead}>
                    <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add CRM Lead
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
              ) : crmlead && crmlead.length > 0 ? (
                <CrmLeadTable crmlead={crmlead} OnSuccess={OnSuccess} />
              ) : (
                <div>No Crm Lead Found</div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CrmLead;
