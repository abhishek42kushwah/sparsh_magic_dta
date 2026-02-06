import { useState } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, ProgressBar, Row } from 'react-bootstrap';
import { topCountriesSellingData } from '../data';
import { currency } from '@/context/constants';

const TopSellingByCountry = () => {
  const [selectedRange,setSelecetedRange]=useState("This Month")

  const handleSelect =(renge:string)=>{
    setSelecetedRange(renge)
    console.log(renge)
  } 
  const filteredData = topCountriesSellingData.filter(item => {

    
    const matchesDateRange = (range: string) => {
      const today = new Date();
      const transactionDate = new Date(item.createdAt
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
       
        case 'This Year':
          return transactionDate.getFullYear() === today.getFullYear();
        default:
          return true; 
      }
    };

    return matchesDateRange(selectedRange);
  });
  console.log('filteredData',filteredData)


  const hasData = topCountriesSellingData && topCountriesSellingData.length > 0;

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle>Top Selling by Country</CardTitle>
          </Col>
          <Col xs="auto">
            <Dropdown>
              <DropdownToggle className="btn bt btn-light">
                <i className="icofont-calendar fs-5 me-1" />
                {selectedRange}
                <IconifyIcon icon="la:angle-down" className="ms-1" />
              </DropdownToggle>
              <DropdownMenu align={'end'}>
                {['Today', 'Last Week','This Month', 'Last Month', 'This Year'].map((renge) => (
                  <DropdownItem key={renge} onClick={() => handleSelect(renge)}>
                    {renge}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        {hasData ? (
          <div className="table-responsive">
            <table className="table mb-0">
              <tbody>
                {filteredData.map((country, idx) => (
                  <tr key={idx}>
                    <td className="px-0">
                      <div className="d-flex align-items-center">
                        <img src={country.flagImage} className="me-2 align-self-center thumb-md rounded-circle" alt={country.name} />
                        <div className="flex-grow-1 text-truncate">
                          <h6 className="m-0 text-truncate">{country.name}</h6>
                          <div className="d-flex align-items-center">
                            <ProgressBar variant="primary" now={country.progress} className="w-100" style={{ height: 5 }} />
                            <small className="flex-shrink-1 ms-1">{country.progress}%</small>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-0 text-end">
                      <span className="text-body ps-2 align-self-center text-end">
                        {currency}
                        {country.amount.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-5">
            <h5 className="text-muted">No Data Found</h5>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default TopSellingByCountry;
