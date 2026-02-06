// import IconifyIcon from '@/components/wrappers/IconifyIcon'
import LoginForm from './components/LoginForm'

import logoSmImg from '@/assets/images/dava-left-logo.png'
import { Card, CardBody, Col } from 'react-bootstrap'
import PageMetaData from '@/components/PageMetaData'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <PageMetaData title="Login" />
      <Col lg={4} className="mx-auto">
        <Card>
          <CardBody className="p-0 bg-white auth-header-box rounded-top">
            <div className="text-center ">
              <Link to="/" className="logo logo-admin">
                <img src={logoSmImg} height={100} alt="logo" className="auth-logo" />
              </Link>
              <h4 className="mt-3 mb-1 fw-semibold text-black fs-18">Let&apos;s Get Started Dava Gwalior</h4>
              <p className="text-muted fw-medium mb-0">Sign in to continue to Dava Gwalior.</p>
            </div>
          </CardBody>
          <CardBody className="pt-0">
            <LoginForm />
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

export default Login
