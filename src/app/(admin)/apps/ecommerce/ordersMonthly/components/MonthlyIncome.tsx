import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'
import { incomeStatData } from './data'
import type { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { useState } from 'react'

const MonthlyIncome = () => {
  const [selectedRange, setSelectedRange] = useState('This Week')

  const handleSelect = (range: string) => {
    setSelectedRange(range)
    console.log("range",range)
  }

  const incomeChartOpts: ApexOptions = {
    chart: {
      height: 270,
      type: 'bar',
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 5,
        blur: 5,
        color: '#45404a2e',
        opacity: 0.35,
      },
    },
    colors: ['#95a0c5', '#95a0c5', '#95a0c5', '#56265b', '#95a0c5', '#95a0c5', '#95a0c5', '#95a0c5', '#95a0c5', '#95a0c5', '#95a0c5', '#95a0c5'],
    plotOptions: {
      bar: {
        borderRadius: 6,
        dataLabels: {
          position: 'top',
        },
        columnWidth: '20',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '%'
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#8997bd'],
      },
    },
    series: [
      {
        name: 'Inflation',
        data: [5.3, 1.1, 4.0, 10.1, 8.0, 6.6, 3.2, 2.3, 1.4, 0.8, 7.5, 0.2],
      },
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      position: 'top',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        formatter: function (val) {
          return '$' + val + 'k'
        },
      },
    },
    grid: {
      row: {
        colors: ['transparent', 'transparent'],
        opacity: 0.2,
      },
      strokeDashArray: 2.5,
    },
    legend: {
      show: false,
    },
  }

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle>Monthly Avg. Income</CardTitle>
          </Col>
          <Col xs="auto">
            <Dropdown>
              <DropdownToggle className="btn bt btn-light icons-center">
                <i className="icofont-calendar fs-5 me-1" />
                {selectedRange}
                <IconifyIcon icon="la:angle-down" className="ms-1" />
              </DropdownToggle>
              <DropdownMenu align={'end'}>
                {['Today', 'Last Week', 'Last Month', 'This Year'].map((range) => (
                  <DropdownItem key={range} onClick={() => handleSelect(range)}>
                    {range}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <ReactApexChart height={270} options={incomeChartOpts} series={incomeChartOpts.series} type="bar" />
        <Row>
          {incomeStatData.length > 0 ? (
            incomeStatData.map((item, idx) => (
              <Col md={6} lg={3} key={idx}>
                <Card className="shadow-none border mb-3 mb-lg-0">
                  <CardBody>
                    <Row className="align-items-center">
                      <Col className="text-center">
                        {item.stat ? (
                          <span className="fs-18 fw-semibold">{item.stat}</span>
                        ) : (
                          <span className="text-muted">Data not available</span>
                        )}
                        {item.title ? (
                          <h6 className="text-uppercase text-muted mt-2 m-0">{item.title}</h6>
                        ) : (
                          <h6 className="text-muted mt-2 m-0">Data not available</h6>
                        )}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <h6 className="text-muted">Data not found</h6>
            </Col>
          )}
        </Row>
      </CardBody>
    </Card>
  )
}

export default MonthlyIncome
