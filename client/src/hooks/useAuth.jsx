import { createContext,useContext,useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import API_URL from '../API_URL.js';
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
    const [user,setUser] = useLocalStorage('user',null);

    const login = async (username, password) => {
        try {
            const invalidCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
            if (invalidCharsRegex.test(username) || invalidCharsRegex.test(password)) {
                throw new Error('Օգտվողի անունը և գաղտնաբառը չպետք է պարունակեն հատուկ նիշեր կամ բացատներ');
            }
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json()
            console.log(data,'d')
            console.log(response,'r')
            if (response.ok) {
                setUser(data.user);
            }else if (response.status === 401) {
                return data
            }else if (response.status === 400) {
                return data;
            }else {
                return {
                    message: 'Int server error'
                }
            }
            
        } catch (error) {
            return {
                message: 'Int server error.Please try again'
            }
        }
    };

    const logout = () => {
        setUser(null);
    };

    const value = useMemo(
        () => ({
          user,
          login,
          logout,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user]
      );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
