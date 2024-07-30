import { createContext,useContext,useMemo, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import { axiosInstance } from '../config.js';
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const navigate = useNavigate();

    const invalidCharsRegex = /[!#$%^&*(),?':{}|<>]/;
    const register = async (userData) => {
        try {
            if (invalidCharsRegex.test(userData.username) || invalidCharsRegex.test(userData.password || invalidCharsRegex.test(userData.email))) {
                throw new Error('Օգտվողի անունը և գաղտնաբառը չպետք է պարունակեն հատուկ նիշեր կամ բացատներ');
            }
            const response = await axiosInstance.post('/api/users/create-account',{ userData });
            return response;
        }catch (error) {
            if (error.response) {
                return error.response.data;
            }else if (error.request) {
                return { error: 'Ներքին սխալ: Խնդրում ենք փորձել ավելի ուշ:' };
            }else {
                return { error: 'Կապի սխալ։Խնդրում ենք փորձել մի փոքր ուշ:' };
            }
        }
    };

    const login = async (userData) => {
        try {
            if (invalidCharsRegex.test(userData.username) || invalidCharsRegex.test(userData.password || invalidCharsRegex.test(userData.email))) {
                throw new Error('Օգտվողի անունը և գաղտնաբառը չպետք է պարունակեն հատուկ նիշեր կամ բացատներ');
            }
            const response = await axiosInstance.post('/api/users/login', { userData });
            setUser(response.data);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            }else if (error.request) {
                return { error: 'Ներքին սխալ: Խնդրում ենք փորձել ավելի ուշ:' };
            }else {
                return { error: 'Կապի սխալ։Խնդրում ենք փորձել մի փոքր ուշ:' };
            }
        }
    };
    
    const logout = async () => {
        try {
            await axiosInstance.post('/api/users/logout');
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.log('Logout failed', error);
        }
    };
    
    const value = useMemo(
        () => ({
          login,
          logout,
          register,
          user
        }),
        [user]
      );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
