import PageMetaData from "@/components/PageMetaData"
import { Col, Row } from 'react-bootstrap'
import { statData } from './components/data'
import StatCard from "./components/StatCard"
import MonthlyIncome from "./components/MonthlyIncome"
import PopularProducts from "./components/PopularProducts"
import CategoriesChart from "./components/CategoriesChart"
function page() {
    return (
        <div>
            <PageMetaData title="Monthly Orders" />
            <Row>
                <Col md={12} lg={4}>
                    {statData.map((stat, idx) => (
                        <StatCard {...stat} key={idx} />
                    ))}
                </Col>

                <Col md={12} lg={8}>
                    <MonthlyIncome />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={6} lg={8}>
                    <PopularProducts />
                </Col>
                <Col md={6} lg={4}>
                    <CategoriesChart />
                </Col>
            </Row>

        </div>
    )
}

export default page;