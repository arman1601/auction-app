import './modal.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Modal = ({isActive,setActive}) => {
        return (
          <section className={isActive ? 'active' : ''}>  
            <div className="modal-box">
              <h2>Հաջող</h2>
              <h3>Ձեր առաջարկը ընդունված է</h3>
      
              <div className="buttons">
                <Link to={'/my-auctions'}>
                  <button className="close-btn" onClick={() => setActive(!isActive)} >
                    Գնալ դեպի իմ աճուրդներ
                  </button>
                </Link>
              </div>
            </div>
          </section>
        );
};

Modal.propTypes = {
    isActive: PropTypes.bool,
    setActive : PropTypes.func,
};

export default Modal;