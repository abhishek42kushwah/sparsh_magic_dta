// import logoDark from '@/assets/images/sparshMegic.png'
// import logoLight from '@/assets/images/sparshMegic.png'
import logoSm from '@/assets/images/sparshMegic.png'
import { Link } from 'react-router-dom'

const LogoBox = () => {
  return (
    <Link to="/" className="logo">
      <span>
        <img src={logoSm} alt="logo-sm" height={70}  className="auth-logo" />
      </span>
      <span>
        {/* <img src={logoLight} alt="logo-large" className="logo-lg logo-light" /> */}
        {/* <img src={logoDark} width={100}  height={65} alt="logo-large" className="logo-lg logo-dark" /> */}
      </span>
    </Link>
  )
}

export default LogoBox
