import { Link } from 'react-router-dom';
import './logo.css'

const Logo = () => {
    return (
        <div className='logoCont'>
            <Link to={'/main'}><img src="/img/logo.png" alt="ConverseBank" /></Link>
        </div>
    )
}

export default Logo;