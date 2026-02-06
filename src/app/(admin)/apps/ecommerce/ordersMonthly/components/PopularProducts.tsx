import { products } from '@/assets/data/products'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { currency } from '@/context/constants'

import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'
import { useState } from 'react'
const PopularProducts = () => {
  const [selectedRange,setSelecetedRange]=useState("This Month")

  const handleSelect =(renge:string)=>{
    setSelecetedRange(renge)
    console.log(renge)
  } 
  const filteredData = products.filter(item => {

    
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
        case 'Last Three Months':
          const startOfThreeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, 1);
          return transactionDate >= startOfThreeMonthsAgo && transactionDate <= today;
        case 'This Year':
          return transactionDate.getFullYear() === today.getFullYear();
        default:
          return true; 
      }
    };

    return matchesDateRange(selectedRange);
  });
  console.log('filteredData',filteredData)

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle>Popular Products</CardTitle>
          </Col>
          <Col xs="auto">
            <Dropdown>
              <DropdownToggle className="btn bt btn-light icons-center">
                <i className="icofont-calendar fs-5 me-1" />
                {selectedRange}
                <IconifyIcon icon="la:angle-down" className="ms-1" />
              </DropdownToggle>
              <DropdownMenu align={'end'}>
              {['Today','Lest Week','Last Month','This Year'].map((renge)=>(
                <DropdownItem key={renge} onClick={()=>handleSelect(renge)}>
                  {renge}
                </DropdownItem>
              ))}  
              
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th className="border-top-0">Product</th>
                <th className="border-top-0">Price</th>
                <th className="border-top-0">Sell</th>
                <th className="border-top-0">Status</th>
                <th className="border-top-0">Action</th>
              </tr>
            </thead>
            <tbody>
          
            {(!filteredData || filteredData.length === 0) ? (
    <tr>
      <td colSpan={5} className="text-center">Data not found</td>
    </tr>
  ) : (filteredData.slice(0, 5).map((product, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img src={product.image} height={40} className="me-3 align-self-center rounded" alt="..." />
                      <div className="flex-grow-1 text-truncate">
                        <h6 className="m-0">{product.name}</h6>
                        <a href="#" className="fs-12 text-primary">
                          ID: {product.id}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    {currency}
                    {product.sellPrice}{' '}
                    <del className="text-muted fs-10">
                      {currency}
                      {product.price}
                    </del>
                  </td>
                  
                  <td>{product.sellsCount}</td>
                  
                  <td>
                    <span
                   >
                      {product.status}
                    </span>
                  </td>
                  <td>
                    
                    <span role="button">
                      <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
                    </span>
                    <span role="button">
                      <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
                    </span>
                  </td>
                </tr>
            ))
          )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  )
}

export default PopularProducts
