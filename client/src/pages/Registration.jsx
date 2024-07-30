import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/AuthProvider';
import { Input } from '../components/models/input/Input';
import { Promo } from '../components/models/promo/Promo';
import { Modal } from '../components/models/modal/Modal';


export const Registration = () => {
    const [error,setError] = useState('');
    const [isActive,setActive] = useState(false);
    const [userData,setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { 
            username : userData.username, 
            email : userData.email, 
            password: userData.password
        };

        if (!user.email.includes('.') && !user.email.includes('@')) {
            return setError('Please enter a valid email adresssssss')
        }else {
            const result = await register(user);
            if(result.status === 201) {
                setActive(true);
            }else {
                setError(result.message|| result.error)
            }
        }
    };

    return (
        <div className='loginPage'>
            {isActive && <Modal 
                isActive ={isActive} setActive={setActive}
                title={'Հաջող'}
                message={'Դուք հաջողությամբ ստեղծեցիք հաշիվ'}
                linkText={'Մուտք գործել'}
                linkTo={'/login'}
            />}
            <div className='authCont'>
                <Promo />
                <div className='auth'>
                    <form action="#" onSubmit={handleSubmit}>
                        <h1 className="headerAuth">Sign-up</h1>

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
                            type="text"
                            id="email"
                            placeholder="Email"
                            value={userData.email}
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
                        <button type="submit">Sign up</button>
                    </form>
                    <p className='create-account'>Արդեն ունե՞ք հաշիվ:: 
                        <button type='submit' onClick={() => navigate('/login')}>Մուտք գործեք այստեղ</button>
                    </p>
                </div>

            </div>  
        </div> 
    );
};