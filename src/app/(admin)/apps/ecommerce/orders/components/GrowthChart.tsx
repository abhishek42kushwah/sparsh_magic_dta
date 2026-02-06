import { useState } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';

const GrowthChart = () => {
  const [timePeriod, setTimePeriod] = useState<'Today' | 'Last Week' | 'Last Month' | 'This Year'>('This Year');

  // Data for each time period
  const chartData: Record<'Today' | 'Last Week' | 'Last Month' | 'This Year', { income: number[]; expenses: number[]; labels: string[] }> = {
    'Today': {
      income: [10, 20, 15, 30],
      expenses: [5, 15, 10, 25],
      labels: ['6 AM', '9 AM', '12 PM', '3 PM']
    },
    'Last Week': {
      income: [31, 40, 28, 51, 42, 65, 55],
      expenses: [20, 30, 40, 50, 60, 70, 80],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    'Last Month': {
      income: [40, 50, 30, 60, 45, 80, 90, 70, 50, 80, 60, 90],
      expenses: [20, 40, 10, 50, 30, 60, 40, 80, 50, 90, 60, 100],
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    },
    'This Year': {
      income: [31, 40, 28, 51, 31, 40, 28, 51, 31, 40, 28, 51],
      expenses: [0, 30, 10, 40, 30, 60, 50, 80, 70, 100, 90, 130],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  }

  const currentData = chartData[timePeriod]

  const handleTimePeriodChange = (period: 'Today' | 'Last Week' | 'Last Month' | 'This Year') => {
    setTimePeriod(period);
  }
  const chartOptions: ApexOptions & { series: { name: string; data: number[] }[] } = {
    series: [
      {
        name: 'Total Orders',
        data: currentData.income,
      },
      {
        name: 'delivered Orders',
        data: currentData.expenses,
      },
    ],
    chart: {
      fontFamily: 'inherit',
      height: 233,
      type: 'line',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    colors: ['var(--bs-primary)', 'var(--bs-primary-bg-subtle)'],
    grid: {
      show: true,
      strokeDashArray: 3,
    },
    stroke: {
      curve: 'smooth',
      colors: ['var(--bs-primary)', 'var(--bs-primary-bg-subtle)'],
      width: 2,
    },
    markers: {
      colors: ['var(--bs-primary)', 'var(--bs-primary-bg-subtle)'],
      strokeColors: 'transparent',
    },
    tooltip: {
      x: {
        show: false,
      },
      followCursor: true,
    },
    xaxis: {
      categories: currentData.labels,
    },
  };

  const hasData = chartOptions.series.some(series => series.data.length > 0);

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle>Order Growth</CardTitle>
          </Col>
          <Col xs="auto">
            <Dropdown>
              <DropdownToggle className="btn bt btn-light icons-center">
                <i className="icofont-calendar fs-5 me-1" />
                {timePeriod}
                <IconifyIcon icon="la:angle-down" className="ms-1" />
              </DropdownToggle>
              <DropdownMenu align={'end'}>
                <DropdownItem onClick={() => handleTimePeriodChange('Today')}>Today</DropdownItem>
                <DropdownItem onClick={() => handleTimePeriodChange('Last Week')}>Last Week</DropdownItem>
                <DropdownItem onClick={() => handleTimePeriodChange('Last Month')}>Last Month</DropdownItem>
                <DropdownItem onClick={() => handleTimePeriodChange('This Year')}>This Year</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        {hasData ? (
          <ReactApexChart height={233} options={chartOptions} series={chartOptions.series} type="line" />
        ) : (
          <div className="text-center text-muted">No data available</div>
        )}
      </CardBody>
    </Card>
  );
};

export default GrowthChart;
