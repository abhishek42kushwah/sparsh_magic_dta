import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormControl, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PageMetaData from '@/components/PageMetaData';
import { useNavigate } from 'react-router-dom';
import CRMCallerListTable from './Components/CRMCallerListTable';
import { errorToast } from '@/utils/toastMassage';

const CrmCallerList = () => {
  const [crmCallerList, setcrmCallerList] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const statusArray = ["All", "OFF", "ACTIVE", "RESIGN"];
  const [selectedRange, setSelectedRange] = useState('Today');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [filteredCrmCaller, setFilteredCrmCaller] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const crmCallerDisplay = isFilterApplied ? filteredCrmCaller : crmCallerList;

  const fetchCrmLead = async (status = '') => {
    try {
      const response = await fetch('http://localhost:3000/crm-caller');
      const data = await response.json();

      if (data.success) {
        let crmCallerList = data.result;
        if (status) {
          const filterResponse = await fetch(`http://localhost:3000/crm-caller/filter?status=${status}`);
          const filterData = await filterResponse.json();

          if (filterData.success) {
            crmCallerList = filterData.result;
          } else {
            errorToast('Error fetching CRM caller list')
          }
        }
        setcrmCallerList(crmCallerList);
      } else {
        errorToast('Error fetching CRM caller list')
      }
    } catch (error) {
      errorToast('Error fetching CRM caller list')
    }
  };

  useEffect(() => {
    fetchCrmLead();
  }, []);

  const handleNewcrmCallerList = () => {
    navigate('/app/ecommerce/crmcallerlistadd');
  };


  const handleStatusFilter = (status:string) => {
    setSelectedStatus(status);
    fetchCrmLead(status === 'All' ? '' : status);
  };

  useEffect(() => {
    const fetchFilteredCrmLead = async () => {
      try {
        const response = await fetch(`http://localhost:3000/crm-caller/searchcrm?name=${searchTerm}`);
        const data = await response.json();
        if (data.success && data.result) {
          setFilteredCrmCaller(data.result);
          setIsFilterApplied(true);
        } else {
          setFilteredCrmCaller([]);
          setIsFilterApplied(true);
        }
      } catch (error) {
        setFilteredCrmCaller([]);
        setIsFilterApplied(true);
      }
    };
    if (searchTerm) {
      fetchFilteredCrmLead();
    } else {
      setFilteredCrmCaller(crmCallerList);
      setIsFilterApplied(false);
    }
  }, [searchTerm, crmCallerList]);

  const onDeleteSuccess = () => {
    fetchCrmLead()
  }

  return (
    <>
      <PageMetaData title="CRM Caller List" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">CRM Caller List</CardTitle>
                </Col>
                <Col xs="auto">
                  <FormControl
                    type="text"
                    placeholder="Search by name..."
                    className="me-2"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Dropdown>
                    <DropdownToggle className="btn btn-light">
                      <i className="icofont-calendar fs-5" />
                      {selectedRange}
                      <IconifyIcon icon="la:angle-down" />
                    </DropdownToggle>
                    <DropdownMenu align="end">
                      {['Today', 'Last Week', 'Last Month', 'This Year', 'This Month', 'Last Three Months'].map((range) => (
                        <DropdownItem key={range} active={selectedRange === range} onClick={() => setSelectedRange(range)}>
                          {range}
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
                      {statusArray.map((status, idx) => (
                        <DropdownItem
                          key={idx}
                          active={selectedStatus === status}
                          onClick={() => handleStatusFilter(status)}
                        >
                          {status}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </Col>
                <Col xs="auto">
                  <button className="btn btn-primary" onClick={handleNewcrmCallerList}>
                    <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Create Caller List
                  </button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="pt-0">
              {crmCallerDisplay && crmCallerDisplay.length > 0 ? (
                <CRMCallerListTable crmCallerList={crmCallerDisplay} onDeleteSuccess={onDeleteSuccess} />
              ) : (
                <p className='text-center pt-5'>No results found.</p>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CrmCallerList;
