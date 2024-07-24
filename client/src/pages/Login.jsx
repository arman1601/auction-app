import './styles/login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import { Input } from '../components/models/input/Input';
import { Promo } from '../components/models/promo/Promo';
import { Error } from './Error';

export const Login = () => {
    const [userData,setUserData] = useState({
        username: '',
        password: ''
    });
    const [error,setError] = useState('');

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(userData);
        if (result.status === 200) {
            navigate('/main', {replace: true});

        }else if (result !== undefined && result?.response?.data?.message) {
            setError(result?.response?.data?.message)
        }else if (typeof result === 'object') {
            setError(result?.response?.data.error)
        }else {
            return <Error error={error} />;
        }
    };

    return (
        <div className='loginPage'>
            <div className='authCont'>
                <Promo />
                
                <div className='auth'>
                    <form action="#" onSubmit={handleSubmit}>
                        <h1 className="headerAuth">Sign-in</h1>

                        {error && (
                            <div className="errorMsg">
                            <h3> {error} </h3>
                            </div>
                        )}

                        <Input
                            type="text"
                            id="username"
                            placeholder="Username"
                            value={userData.username}
                            setValue={setUserData}
                            setError={setError}
                        />
                        <hr/>
                        <Input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={userData.password}
                            setValue={setUserData}
                            setError={setError}
                        />
                        <hr/>
                        <button type="submit">Login</button>
                    </form>
                    <p className='create-account'>Հաշիվ չունե՞ք: 
                        <button type='submit' onClick={() => navigate('/registration')}>Գրանցվեք այստեղ</button>
                    </p>
                </div>

            </div>  
        </div> 
    )
};
