import './myAuctions.css';
import CalculateDate from '../detail/addToCart/CalculateTime';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const CartItem = ({elem}) => {
    return (
        <div className='cart-item'>
            <div className='cart-item-info'>
                <h2>{elem.auction.title}</h2>
                <div className='cart-item-info-header'>
                    <p>Ընթացիկ առաջարկ</p>
                    <span>{elem.auction.end_price} ֏</span>
                </div>
                <div className='progress'>
                    <p>Լոտի համար <span>{elem.auction.id}</span></p>
                    <p>Մեկնարկային գին <span>{elem.auction.price} ֏</span></p>
                    <CalculateDate auction_end={elem.auction.auction_end} />
                    <p>Ձեր առաջարկը <span>{elem.partipication.price} ֏</span></p>
                    <p><span></span></p>
                </div>
            </div>
            <div className='cart-item-img'>
                <Link to={`/auctions/item/${elem.auction.id}`}>
                    <img src='/img/conv_background.jpg' alt='img' />
                </Link>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    elem : PropTypes.object.isRequired,
}

export default CartItem;