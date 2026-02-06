import IconifyIcon from '@/components/wrappers/IconifyIcon'
import type { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'
import { useState } from 'react'

const AudienceOverviewChart = () => {
  const [timePeriod] = useState<keyof typeof chartData>('This Year')

  // Data for each time period
  const chartData = {
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

  // Get the current data based on the selected time period
  const currentData = chartData[timePeriod]

  const audienceChartOpts: ApexOptions = {
    chart: {
      height: 280,
      type: 'area',
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 12,
        left: 0,
        blur: 2,
        color: 'rgba(132, 145, 183, 0.3)',
        opacity: 0.35,
      },
    },
    annotations: {
      xaxis: [
        {
          x: 312,
          strokeDashArray: 4,
          borderWidth: 1,
          borderColor: 'var(--bs-secondary)',
        },
      ],
      points: [
        {
          x: 312,
          y: 52,
          marker: {
            size: 6,
            fillColor: 'var(--bs-primary)',
            strokeColor: 'var(--bs-card-bg)',
            strokeWidth: 4,
            radius: 5,
          },
          label: {
            borderWidth: 1,
            offsetY: -110,
            text: '50k',
            style: {
              background: 'var(--bs-primary)',
              fontSize: '14px',
              fontWeight: '600',
            },
          },
        },
      ],
    },
    colors: ['#56265b', 'rgba(86, 38, 91, 0.35)'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      curve: 'smooth',
      width: [3, 3],
      dashArray: [0, 0],
      lineCap: 'round',
    },
    series: [
      {
        name: 'Income',
        data: currentData.income,
      },
      {
        name: 'Expenses',
        data: currentData.expenses,
      },
    ],
    labels: currentData.labels,
    yaxis: {
      labels: {
        offsetX: -12,
        offsetY: 0,
        formatter: function (value) {
          return '$' + value
        },
      },
    },
    grid: {
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    legend: {
      show: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        inverseColors: !1,
        opacityFrom: 0.05,
        opacityTo: 0.05,
        stops: [45, 100],
      },
    },
  }

  // Function to handle time period change

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as="h4">Audience Overview</CardTitle>
          </Col>
          <Col xs="auto">
            <Dropdown>
              <DropdownToggle className="btn bt btn-light icons-center">
                <i className="icofont-calendar fs-5 me-1" />
                {timePeriod}
                <IconifyIcon icon="la:angle-down" className="ms-1" />
              </DropdownToggle>
              <DropdownMenu align={'end'}>
                <DropdownItem>Today</DropdownItem>
                <DropdownItem >Last Week</DropdownItem>
                <DropdownItem >Last Month</DropdownItem>
                <DropdownItem >This Year</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        {currentData.income.length > 0 || currentData.expenses.length > 0 ? (
          <ReactApexChart height={280} series={audienceChartOpts.series} options={audienceChartOpts} type="area" />
        ) : (
          <p>No Data Available</p>
        )}

      </CardBody>
    </Card>
  )
}

export default AudienceOverviewChart
