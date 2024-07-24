import '../../pages/styles/personalAuctions.css';
import { AuctionDedlineDate } from './AuctionDedlineDate';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export const PersonalAuctionCart = ({elem}) => {
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
                    <AuctionDedlineDate auction_end={elem.auction.auction_end} />
                    <p>Ձեր առաջարկը <span>{elem.partipication.price} ֏</span></p>
                    <p><span></span></p>
                </div>
            </div>
            <div className='cart-item-img'>
                <Link to={`/auctions/item/${elem.auction.id}`}>
                    <img src='/img/product-card.jfif' alt='img' />
                </Link>
            </div>
        </div>
    )
}

PersonalAuctionCart.propTypes = {
    elem : PropTypes.object.isRequired,
}

