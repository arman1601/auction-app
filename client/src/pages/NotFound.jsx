import './styles/notFound.css';
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className='container'>
            <h1 className='header'>404</h1>
            <p className='message'>Page not found</p>
            <Link to="/" className='link'>
                Back to main page
            </Link>
        </div>
    );
};
