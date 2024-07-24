import './styles/error.css';

export const Error = ({ error }) => {
    return (
        <div className='err-container'>
            <h1 className='err-header'>Error</h1>
            <p className='err-message'>{error?.response?.data?.message || error.message || 'An unknown error occurred'}</p>
            <button onClick={() => window.location.reload()} className='err-button'>
                Try Again
            </button>
        </div>
    );
};
