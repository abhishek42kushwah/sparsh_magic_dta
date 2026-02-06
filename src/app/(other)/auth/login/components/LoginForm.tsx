import PasswordFormInput from '@/components/form/PasswordFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Col, ButtonGroup, Button } from 'react-bootstrap'
import useSignIn from '../useSignIn'

const LoginForm = () => {
  const { loading, login, control, userType, setUserType } = useSignIn()

  return (
    <form onSubmit={login} className="my-4">
      {/* Toggle for user type */}
      <div className="d-flex justify-content-center mb-3">
        <ButtonGroup>
          <Button
            variant={userType === 'admin' ? 'primary' : 'outline-primary'}
            onClick={() => setUserType('admin')}
          >
            Admin
          </Button>
          <Button
            variant={userType === 'store' ? 'primary' : 'outline-primary'}
            onClick={() => setUserType('store')}
          >
            Store
          </Button>
            <Button
            variant={userType === 'delivery' ? 'primary' : 'outline-primary'}
            onClick={() => setUserType('delivery')}
          >
            Delivery
          </Button>
        </ButtonGroup>
      </div>

      <TextFormInput
        control={control}
        name="mobile"
        label="Mobile Number"
        containerClassName="form-group mb-2"
        placeholder="Enter your mobile number"
      />

      <PasswordFormInput
        control={control}
        name="password"
        label="Password"
        containerClassName="form-group"
        placeholder="Enter your password"
      />

      <div className="form-group row mt-3">
        <Col sm={6}>
          <div className="form-check form-switch form-switch-primary">
            <input className="form-check-input" type="checkbox" id="customSwitchSuccess" />
            <label className="form-check-label" htmlFor="customSwitchSuccess">
              Remember me
            </label>
          </div>
        </Col>
      </div>

      <div className="form-group mb-0 row">
        <Col xs={12}>
          <div className="d-grid mt-3">
            <button className="btn btn-primary flex-centered" type="submit" disabled={loading}>
              {loading ? 'Logging In...' : 'Log In'}{' '}
              <IconifyIcon icon="fa6-solid:right-to-bracket" className="ms-1" />
            </button>
          </div>
        </Col>
      </div>
    </form>
  )
}

export default LoginForm
