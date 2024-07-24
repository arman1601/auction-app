import { useState,createContext,useContext } from 'react';
import { Loading } from '../components/models/loading/Loading';

const LoadingContext = createContext();

// eslint-disable-next-line react/prop-types
export const LoadingProvider = ( { children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading}}>
            {isLoading && <Loading />}
            {children}
        </LoadingContext.Provider>
    );
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useLoading = () => useContext(LoadingContext)