import './auctionCard.css'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const AuctionCard = ({elem}) => {
        return (
            <div className="item">
                <div className='img-info'>
                    <img src="/img/product-card.jfif" alt="card" />
                    <div><h1> {elem.title}</h1></div>
                </div>
                    <div className='item-info'>
                        <div className='item-properties'>
                            <span>աճուրդի մեկնարկային գինը</span>
                            <p>{elem.end_price ? elem.end_price : elem.price} դրամ</p>
                        </div>
                        <div className='item-submit-button'>
                            <Link to={`/auctions/item/${elem.id}`}><button> ավելին</button></Link>
                        </div>
                    </div>
            </div>
        );
    }

AuctionCard.propTypes = {
    elem : PropTypes.object.isRequired,
}

