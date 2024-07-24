import './loading.css';
import { Triangle } from 'react-loader-spinner';

export const Loading = () => (
    <div className='loading-container'>
        <Triangle color='#00BFFF' height={550} width={80} />
    </div>
);
