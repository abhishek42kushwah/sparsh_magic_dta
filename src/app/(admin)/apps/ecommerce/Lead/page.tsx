import  { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row, Button, FormControl, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormCheck } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import PageMetaData from '@/components/PageMetaData';
import LeadTable from './Component/LeadTable';
import { getAllLead } from '@/helpers/data';
import { LeadType } from '@/types/data';
import clsx from 'clsx';
import { MdAssignmentAdd } from 'react-icons/md';

const Lead = () => {
  const [lead, setLead] = useState<LeadType[]>([]);
  
  const sourceArray = ['Website', 'Social Media', 'Email Campaign', 'Referral', 'Advertisement', 'Event', 'Cold Call'];
  const statusArray = ["complete","pending"];
 
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState('Today');
  const [selectedStatus, setSelectedStatus] = useState<string>('All'); 
  const [selectedFilters, setSelectedFilters] = useState<string[]>(sourceArray); 
  const [searchTerm, setSearchTerm] = useState('');


  const handleSelectStatus = (filter: any) => {
    setSelectedStatus(filter);
    console.log(filter);
  };

  const handleSelect = (range: any) => {
    setSelectedRange(range);
    console.log(range);
  };


  
  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = prevFilters.includes(filter)
        ? prevFilters.filter(f => f !== filter)
        : [...prevFilters, filter];
      console.log('Selected Filters:', newFilters);
      return newFilters;
    });
  };


  useEffect(() => {
    (async () => {
      const data = await getAllLead();
      setLead(data);
    })();
  }, []);

  const handleNewLead = () => {
    navigate('/app/ecommerce/AddNewLead');
  };

  const filteredData = lead.filter(item => {
    const filterStatus = selectedStatus === "All" || selectedStatus === item.status;
    const matchesFilterAll = selectedFilters.includes('ALL')  || selectedFilters.includes(item.source);

    const matchesSearch =
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.id && item.id.toString().includes(searchTerm));

    const matchesDateRange = (range: string) => {
      const today = new Date();
      const transactionDate = new Date(item.createAt
      ); 

      switch (range) {
        case 'Today':
          return transactionDate.toDateString() === today.toDateString();
        case 'Last Week':
          const startOfLastWeek = new Date(today);
          startOfLastWeek.setDate(today.getDate() - today.getDay() - 7);
          const endOfLastWeek = new Date(today);
          endOfLastWeek.setDate(today.getDate() - today.getDay());
          return transactionDate >= startOfLastWeek && transactionDate < endOfLastWeek;
        case 'This Month':
          const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          return transactionDate >= startOfMonth && transactionDate <= today;
        case 'Last Month':
          const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
          return transactionDate >= startOfLastMonth && transactionDate <= endOfLastMonth;
        case 'Last Three Months':
          const startOfThreeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, 1);
          return transactionDate >= startOfThreeMonthsAgo && transactionDate <= today;
        case 'This Year':
          return transactionDate.getFullYear() === today.getFullYear();
        default:
          return true; 
      }
    };

    return  filterStatus && matchesFilterAll && matchesSearch && matchesDateRange(selectedRange);
  });

  return (
    <>
      <PageMetaData title="Lead Management" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center g-3 flex-wrap">
                <Col>
                  <CardTitle as="h4">Lead</CardTitle>
                </Col>
                <Col xs="auto">
                  <FormControl
                    type="text"
                    placeholder="Search by name or ID..."
                    className="me-2"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                  />
                </Col>
                <Col xs="auto">
                  <Dropdown>
                    <DropdownToggle
                      variant="link"
                      className="btn bg-primary-subtle text-primary d-flex align-items-center arrow-none"
                      role="button">
                      <IconifyIcon icon="iconoir:filter-alt" />Source
                    </DropdownToggle>
                    <DropdownMenu align="start">
                      <div className="p-2">
                        {sourceArray.map((filter, idx) => (
                          <FormCheck
                            label={filter}
                            className={clsx({ 'mb-2': sourceArray.length - 1 !== idx })}
                            id={`filter-${idx}`}
                            key={idx}
                            defaultChecked
                            onChange={() => handleFilterChange(filter)}
                            checked={selectedFilters.includes(filter)}

                          />
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
                      role="button">
                      <IconifyIcon icon="iconoir:filter-alt" /> {selectedStatus ? selectedStatus : 'Status'}
                    </DropdownToggle>
                    <DropdownMenu align="start">
                      <div className="p-2">
                        {statusArray.map((filter, idx) => (
                          <Dropdown.Item
                            key={idx}
                            onClick={() => handleSelectStatus(filter)}
                            className={clsx({ 'mb-2': statusArray.length - 1 !== idx })}>
                            {filter}
                          </Dropdown.Item>
                        ))}
                      </div>
                    </DropdownMenu>
                  </Dropdown>
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
                        <DropdownItem key={range} active={selectedRange === range} onClick={() => handleSelect(range)}>
                          {range}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </Col>
                <Col xs="auto">
                  <Link to="/app/ecommerce/leadassigncaller">
                    <Button variant="primary">
                      <MdAssignmentAdd style={{ marginRight: '8px', fontSize: '22px' }} /> Assign
                    </Button>
                  </Link>
                </Col>
                <Col xs="auto">
                  <Button variant="primary" onClick={handleNewLead}>
                    <IconifyIcon icon="fa6-solid:plus" /> Lead
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button variant="primary">
                    <IconifyIcon icon="fa6-solid:arrow-up-from-bracket" />
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="pt-0">
              {filteredData.length > 0 && <LeadTable lead={filteredData} />}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Lead;
