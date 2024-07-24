import { createContext,useContext,useMemo, useState } from "react";
import { useNavigate} from "react-router-dom";
import { axiosInstance } from '../config.js';
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const navigate = useNavigate();

    const invalidCharsRegex = /[!#$%^&*(),?":{}|<>]/;
    const register = async (userData) => {
        try {
            if (invalidCharsRegex.test(userData.username) || invalidCharsRegex.test(userData.password || invalidCharsRegex.test(userData.email))) {
                throw new Error('Օգտվողի անունը և գաղտնաբառը չպետք է պարունակեն հատուկ նիշեր կամ բացատներ');
            }
            const response = await axiosInstance.post('/api/users/create-account',{ userData });
            return response.data;
        }catch (error) {
            return error;
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
            return error;
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user]
      );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
