import { Card, CardBody, Col, Row } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

export type StatType = {
  title: string;
  subTitle: string;
  icon: string;
  stat: string | number;
  change: string;
  variant: string;
};

type StatsProps = {
  stateData: {
    totalRecords: number;
    totalactiveproduct: number;
    totaldisactiveproduct: number;
  };
};

const StatCard = ({ title, stat, icon }: StatType) => {
  return (
    <Card>
      <CardBody>
        <Row className="d-flex justify-content-center">
          <Col xs={9}>
            <p className="text-dark mb-0 fw-semibold fs-14">{title || 'No Title Available'}</p>
            <h3 className="mt-2 mb-0 fw-bold">{stat !== undefined ? stat : 'No Data'}</h3>
          </Col>
          <Col xs={3} className="align-self-center">
            <div className="d-flex justify-content-center align-items-center thumb-xl bg-light rounded-circle mx-auto">
              <IconifyIcon icon={icon || 'ic:outline-info'} className="h1 align-self-center mb-0 text-secondary" />
            </div>
          </Col>
        </Row>
        {/* <p className="mb-0 text-truncate text-muted mt-3">
          <span className={`text-${variant || 'secondary'}`}>
            {change !== undefined ? change : 'No Change'}
          </span>{' '}
          {subTitle || 'No Subtitle Available'}
        </p> */}
      </CardBody>
    </Card>
  );
};

const Stats = ({ stateData }: StatsProps) => {
  const StatItems: StatType[] = [
    {
      title: "Total Products",
      stat: stateData?.totalRecords || 0,
      change: "+10%",
      subTitle: "Compared to last period",
      icon: "ic:baseline-shopping-cart",
      variant: "success",
    },
    {
      title: "Total Active Products",
      stat: stateData?.totalactiveproduct || 0,
      change: "+5%",
      subTitle: "Compared to last period",
      icon: "ic:baseline-check-circle",
      variant: "info",
    },
    {
      title: "Disapproved Products",
      stat: stateData?.totaldisactiveproduct || 0,
      change: "-2%",
      subTitle: "Compared to last period",
      icon: "ic:baseline-cancel",
      variant: "danger",
    },
  ];

  return (
    <Row className="justify-content-center">
      {StatItems.map((stat, idx) => (
        <Col md={6} lg={4} key={idx}>
          <StatCard {...stat} />
        </Col>
      ))}
    </Row>
  );
};

export default Stats;
