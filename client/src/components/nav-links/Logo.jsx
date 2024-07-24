import { Link } from 'react-router-dom';
import './logo.css'

export const Logo = () => {
    return (
        <Link to={'/main'}>
            <div className='logoCont'>
                <img src='/img/logo.png' alt='loremipsumBank'/>
                <h2>Loremipsum<br/> Bank</h2>
            </div>
        </Link>
    );
};

