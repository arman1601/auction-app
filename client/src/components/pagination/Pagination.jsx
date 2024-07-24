import './pagination.css';
import PropTypes from 'prop-types';

export const Pagination = (props) => {
    const {page,setPage,totalPages} = props;

    const handlePagination = (direction) => {
        if(direction === 'next' && page < totalPages) {
            setPage(page+1);

        }else if (direction === 'prev' && page > 1) {
            setPage(page-1);
        }

        window.scrollTo(450,450);

    };

    return (
        <div className='pagination'>
            <button className="pagination-button" onClick={() => handlePagination('prev')} disabled={page === 1}>
                <img src="/img/left-suffix.png" alt="suffix" />
                <span>նախորդ</span>
            </button>

            <span>էջ {page} -ից {totalPages}</span>

            <button className="pagination-button" onClick={() => handlePagination('next')} disabled={page === totalPages}>
                <span>հաջորդ</span>
                <img src="/img/right-suffix.png" alt="suffix" />
            </button>
        </div>
    )
};

Pagination.propTypes = {
    page : PropTypes.number,
    setPage : PropTypes.func,
    totalPages : PropTypes.number,
}

