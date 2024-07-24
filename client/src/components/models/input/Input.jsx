import PropTypes from 'prop-types';

export const Input = ({ type, id, placeholder, value, setValue, setError }) => {
    
    const handleOnChange = (e) => {
        const inputValue = e.target.value.replace(/[!#$%^&*(),?":{}|<>]/g, '');
        setValue(prevUserData => ({
            ...prevUserData,
            [id]: inputValue
        }));

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
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string,
    setValue: PropTypes.func.isRequired,
    setError: PropTypes.func
};
