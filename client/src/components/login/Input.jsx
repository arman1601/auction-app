import PropTypes from 'prop-types';
const Input = (props) => {
    
    const handleOnChange = (e) => {
        e.preventDefault();
        const value = e.target.value.replace(/[<>]/g, '');
        props.setValue(value);
    
        if (value !== e.target.value) {
          props.setError('Չթույլատրված սիմվոլների մուտք');
        }

    }

    return (
        <input
        type={props.type} id={props.id} name={props.id}
        placeholder={props.placeholder} value={props.value} required
        onChange={handleOnChange}/>
    )
}

Input.propTypes = {
    username : PropTypes.string,
    id : PropTypes.string,
    placeholder : PropTypes.string,
    type: PropTypes.string,
    setValue : PropTypes.func,
    value : PropTypes.string,
    setError : PropTypes.func,
};

export default  Input;