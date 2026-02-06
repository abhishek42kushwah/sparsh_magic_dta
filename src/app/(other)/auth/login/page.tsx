import LoginForm from './components/LoginForm'
import logoSmImg from '@/assets/images/sparshMegic.png'
import PageMetaData from '@/components/PageMetaData'
import { Card, Col, Row } from 'react-bootstrap'

const Login = () => {
  return (
    <>
      <PageMetaData title="Login" />

      <Row className="vh-100 justify-content-center align-items-center">
        <Col lg={9} md={10} sm={11}>
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden bg-body">
            <Row className="g-0">

              {/* ✅ LEFT SIDE */}
              <Col
                lg={6}
                className="d-flex flex-column justify-content-center align-items-center text-center "    style={{ background: "rgba(var(--bs-primary-rgb), 0.35)" }}
              >
                <div  className="mb-4">
                  <img
                    src={logoSmImg}
                    height={120}
                    alt="logo"
                    className="auth-logo"
                  />
                </div>

                <h2 className="fw-bold text-body">
                  Welcome Back 👋
                </h2>

                <p className="text-secondary mt-2">
                  Sign in to continue to <br />
                  <span className="fw-semibold text-black">
                    Sparsh Magic Dashboard
                  </span>
                </p>

                <div className="mt-4">
                  <p className="text-secondary small">
                    Manage orders, delivery, store & more easily.
                  </p>
                </div>
              </Col>

              {/* ✅ RIGHT SIDE FORM */}
              <Col lg={6} className="p-5 bg-body">
                <h3 className="fw-semibold mb-3 text-body">
                  Login Account
                </h3>

                <p className="text-secondary mb-4">
                  Enter your Email & password to login
                </p>

                <LoginForm />
              </Col>

            </Row>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Login
