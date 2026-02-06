import { Card, CardBody, Col, Row } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import React from 'react';

export type StatType = {
  title: string;
  subTitle: string;
  icon: string;
  stat: string | number;
  change: string;
  variant: string;
};

const StatCard = ({ title, stat,
  // variant  change, subTitle,
    icon,
  }: StatType) => {
  return (
    <Card>
      <CardBody>
        <Row className="d-flex justify-content-center border-dashed-bottom pb-3">
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

interface StateData {
  statsDate?: {
    totalCoupons?: number;
    completedCoupons?: number;
    totalCouponCost?: number;
    canceledCoupons?:number
  };
}

const Stats: React.FC<StateData> = ({statsDate}) => {
 
  const StatItems: StatType[] = [
    {
      title: "Total Coupon Cost",
      stat: statsDate?.totalCouponCost || 0,
      change: "-2%",
      subTitle: "Compared to last period",
      icon: "ic:baseline-money-off",
      variant: "danger",
    },
    {
      title: "Total Coupons",
      stat: statsDate?.totalCoupons || 0,
      change: "+10%",
      subTitle: "Compared to last period",
      icon: "ic:baseline-shopping-cart",
      variant: "success",
    },
    {
      title: "Total completed Coup..",
      stat: statsDate?.completedCoupons || 0,
      change: "+5%",
      subTitle: "Compared to last period",
      icon: "ic:baseline-check-circle",
      variant: "info",
    },
   
    {
      title: "Total canceled Coupons",
      stat: statsDate?.canceledCoupons || 0,
      change: "-2%",
      subTitle: "Compared to last period",
      icon: "ic:baseline-cancel",
      variant: "danger",
    },
  ];

  return (
    <Row className="justify-content-center">
      {StatItems.map((stat, idx) => (
        <Col md={6} lg={3} key={idx}>
          <StatCard {...stat} />
        </Col>
      ))}
    </Row>
  );
};

export default Stats;
