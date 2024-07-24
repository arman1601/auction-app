import './modal.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Modal = ({ isActive, setActive, title, message, linkText, linkTo }) => {
        return (
          <section className={isActive ? 'active' : ''}>  
            <div className="modal-box">
              <h2>{title}</h2>
              <h3>{message}</h3>
      
              <div className="buttons">
                <Link to={linkTo}>
                  <button className="close-btn" onClick={() => setActive(!isActive)} >
                    {linkText}
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
    title: PropTypes.string,
    message: PropTypes.string,
    linkText: PropTypes.string,
    linkTo: PropTypes.string
};

