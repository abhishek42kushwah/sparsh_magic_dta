import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardHeader, CardTitle, Col, Row, Dropdown, FormControl, Spinner } from 'react-bootstrap';
import LeadActionTable from './components/LeadActionTable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageMetaData from '@/components/PageMetaData';
import { BASE_URL } from '@/types/validationSchema';

const LeadAction = () => {
  const [leadAction, setLeadAction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRange, setSelectedRange] = useState('This Week');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const navigate = useNavigate();

  const handleSelectRange = (range:any) => {
    setSelectedRange(range);
    const today = new Date();
    let startDate = '';
    let endDate = today.toISOString();

    switch (range) {
      case 'Today':
        startDate = endDate;
        break;
      case 'This Week':
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay());
        startDate = firstDayOfWeek.toISOString();
        break;
      case 'Last Month':
        const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        startDate = firstDayLastMonth.toISOString();
        endDate = lastDayLastMonth.toISOString();
        break;
      case 'This Year':
        startDate = new Date(today.getFullYear(), 0, 1).toISOString();
        break;
      default:
        break;
    }
    setDateRange({ startDate, endDate });
    fetchLeadActions();
  };

  const fetchLeadActions = async () => {
    setLoading(true);
    const { startDate, endDate } = dateRange;
    const baseUrl = `${BASE_URL}crm-lead-action`;
    const url = selectedRange === 'All' && !searchTerm 
      ? baseUrl 
      : `${baseUrl}/search?action_name=${searchTerm}&startDate=${startDate}&endDate=${endDate}`;
    
    try {
      const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
      const data = await response.json();
      setLeadAction(data?.result || []);
    } catch (error) {
      setLeadAction([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadActions();
  }, [selectedRange, searchTerm]);

 const onDelete=()=>{
  fetchLeadActions();
 }


  return (
    <>
      <PageMetaData title="Lead Action" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as="h4">Lead Action</CardTitle>
                </Col>
                <Col xs="auto">
                  <Dropdown>
                    <Dropdown.Toggle className="btn btn-light d-flex align-items-center">
                      <i className="icofont-calendar fs-5 me-1" />
                      {selectedRange}
                      <IconifyIcon icon="la:angle-down" className="ms-1" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                      {['Today', 'This Week', 'Last Month', 'This Year'].map((range) => (
                        <Dropdown.Item key={range} onClick={() => handleSelectRange(range)}>
                          {range}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col xs="auto">
                  <FormControl
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <button className="btn btn-primary" onClick={() => navigate('/app/ecommerce/addleadaction')}>
                    <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Lead Action
                  </button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="pt-0">
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : leadAction.length === 0 ? (
                <div className="d-flex justify-content-center">
                  <p>No Data Found</p>
                </div>
              ) : (
                <LeadActionTable leadAction={leadAction} onDelete={onDelete} />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LeadAction;
