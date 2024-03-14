import './login.css';
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from './Input';

const Login = () => {
    const {login,user} = useAuth();

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
          navigate('/main', {replace: true});
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(username, password);
        if (result !== undefined && result.message) {
            setError(result.message)
        }
    };

    return (
        <div className='loginPage'>
            <div className='authCont'>
                <div className='promo'>
                    <h1>Need webdesign<br/>for your business?<br/><span>Design Spacee</span><br/>will help you</h1>
                    <img src='../../img/login-logo.png' alt='ConverseBank'/>
                </div>
                
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
                            value={username}
                            setValue={setUsername}
                            setError={setError}
                        />
                        <hr/>
                        <Input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            setValue={setPassword}
                            setError={setError}
                        />
                        <hr/>
                        <button type="submit">Login</button>
                    </form>
                </div>

            </div>  
        </div> 
    )
};

export default Login;