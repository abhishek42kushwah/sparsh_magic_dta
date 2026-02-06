import { useState } from 'react';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'react-bootstrap';
import { browserAndTrafficData } from '../data';

const BrowserAndTrafficReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Year');
  const [data] = useState(browserAndTrafficData);

  const handleDropdownSelect = (period: string) => {
    setSelectedPeriod(period);
  };

  const filteredData = data.filter(item => {
    const matchesDateRange = (range: string) => {
      const today = new Date();
      const transactionDate = new Date(item.createdAt);

      switch (range) {
        case 'Today':
          return transactionDate.toDateString() === today.toDateString();
        case 'Last Week':
          const startOfLastWeek = new Date(today.setDate(today.getDate() - today.getDay() - 7));
          const endOfLastWeek = new Date(today.setDate(today.getDate() + 6));
          return transactionDate >= startOfLastWeek && transactionDate < endOfLastWeek;
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

    return matchesDateRange(selectedPeriod);
  });

  return (
    <ComponentContainerCard title="Browser Used & Traffic Reports">
      <div className="d-flex justify-content-between mb-3">
        <h5>Traffic Data</h5>
        <Dropdown>
          <DropdownToggle className="btn bt btn-light icons-center">
            <i className="icofont-calendar fs-5 me-1" />
            {selectedPeriod}
          </DropdownToggle>
          <DropdownMenu align={'end'}>
            <DropdownItem onClick={() => handleDropdownSelect('Today')}>Today</DropdownItem>
            <DropdownItem onClick={() => handleDropdownSelect('Last Week')}>Last Week</DropdownItem>
            <DropdownItem onClick={() => handleDropdownSelect('Last Month')}>Last Month</DropdownItem>
            <DropdownItem onClick={() => handleDropdownSelect('This Year')}>This Year</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="table-responsive browser_users">
        <table className="table mb-0">
          <thead className="table-light">
            <tr>
              <th className="border-top-0">Browser</th>
              <th className="border-top-0">Sessions</th>
              <th className="border-top-0">Bounce Rate</th>
              <th className="border-top-0">Transactions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  No data available
                </td>
              </tr>
            ) : (
              filteredData.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <img src={item.browserLogo} alt="browser-logo" height={24} className="me-2" />
                    {item.name}
                  </td>
                  <td>
                    {item.sessions.amount}
                    <small className="text-muted">({item.sessions.percentage}%)</small>
                  </td>
                  <td>{item.bounceRate}%</td>
                  <td>
                    {item.transactions.amount}
                    <small className="text-muted">({item.transactions.percentage}%)</small>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </ComponentContainerCard>
  );
};

export default BrowserAndTrafficReport;
