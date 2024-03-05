import { createContext,useContext,useMemo} from "react";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
    const [user,setUser] = useLocalStorage('user',null);
    
    const login = async (username,password) => {
        const response = await fetch('http://localhost:5000/login',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username,password})
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setUser(data.user);
        } else {
            console.log(response)
            throw new Error(response);
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
