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
        if(!username || !password) {
            return setError('partadiren lracman')
        }
        const response = await login(username,password);
        setError(response)        
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
                            type={'text'} setValue={setUsername} value={username}
                            id={'username'} placeholder={'Username'} setError={setError}
                        />
                        <hr/>
                        <Input
                            type={'password'} setValue={setPassword} value={password}
                            placeholder={'Password'} id={'password'}
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