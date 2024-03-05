import './modal.css';
import PropTypes from 'prop-types';

const Modal = ({isActive,setActive}) => {
        return (
          <section className={isActive ? 'active' : ''}>  
            <div className="modal-box">
              <h2>Հաջող</h2>
              <h3>Ձեր առաջարկը ընդունված է</h3>
      
              <div className="buttons">
                <button className="close-btn" onClick={() => setActive(!isActive)} >
                    Փակել
                </button>
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