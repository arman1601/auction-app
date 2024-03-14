import PropTypes from 'prop-types';
const Input = ({ type, id, placeholder, value, setValue, setError }) => {
    
    const handleOnChange = (e) => {
        e.preventDefault();
        const inputValue = e.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
        setValue(inputValue);

        if (inputValue !== e.target.value) {
            setError('Չթույլատրված սիմվոլների մուտք');
        } else {
            setError(null);
        }
    }

    return (
        <input
            type={type}
            id={id}
            name={id}
            placeholder={placeholder}
            value={value}
            required
            onChange={handleOnChange}
        />
    );
}

Input.propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
};

export default Input;
