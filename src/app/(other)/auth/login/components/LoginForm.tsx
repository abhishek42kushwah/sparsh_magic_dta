import PasswordFormInput from '@/components/form/PasswordFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Col } from 'react-bootstrap'
import useSignIn from '../useSignIn'

const LoginForm = () => {
  const { loading, login, control } = useSignIn()

  return (
    <form onSubmit={login} className="my-4">
      
      {/* Mobile Input */}
      <TextFormInput
        control={control as any}
        name="work_email"
        label="Email"
        containerClassName="form-group mb-2"
        placeholder="Enter your email"
      />

      {/* Password Input */}
      <PasswordFormInput
        control={control as any}
        name="password"
        label="Password"
        containerClassName="form-group"
        placeholder="Enter your password"
      />

      {/* Remember Me */}
      <div className="form-group row mt-3">
        <Col sm={6}>
          <div className="form-check form-switch form-switch-primary">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
        </Col>
      </div>

      {/* Submit Button */}
      <div className="form-group mb-0 row " >
        <Col xs={12}>
          <div className="d-grid mt-3" >
            <button
              className="btn btn-primary flex-centered"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Log In'}
              <IconifyIcon
                icon="fa6-solid:right-to-bracket"
                className="ms-1"
              />
            </button>
          </div>
        </Col>
      </div>
    </form>
  )
}

export default LoginForm
