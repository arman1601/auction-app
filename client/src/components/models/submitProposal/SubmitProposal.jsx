import './submitProposal.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useAuth } from '../../../hooks/AuthProvider';
import putAuctionPrice from '../../../actions/putAuctionPrice';

export const SubmitProposal = ({elem,showModal}) => {
    const [suggestedValue, setSuggestedValue] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuth();
    
    const handleOnChange = (e) => {
        const inputValue = e.target.value;
        if (/^\d+$/.test(inputValue) || inputValue === '') {
            setSuggestedValue(inputValue);
            setError('');
          } else {
            setError('Please enter only integer numbers');
          }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await putAuctionPrice(elem, suggestedValue, user);
        if (response.status === 200) {
            elem.end_price = suggestedValue;
            showModal();
            setError('')
        }else {
            setError(response)
        }
    };

    return (
        <>
        <div className='cart-cont'>
            <div className='cart-cont-header'>
                <h3>Սկսած {elem.end_price || elem.price} դրամ</h3>
                <span className='nav-link span'>Քայլ սկսած {elem.min_step} դր</span>
            </div>

            <form action='#' onSubmit={handleSubmit}>
                {error && (
                    <div className='errorMsg'><h3>{error}</h3></div>
                )}
                <input type="text" placeholder='Առաջարկել' onChange={handleOnChange} value={suggestedValue} />
                <button >Առաջարկել</button>
            </form>
        </div>
    </>
    )
}

SubmitProposal.propTypes = {
    elem : PropTypes.object.isRequired,
    showModal : PropTypes.func,
}
