import axios from 'axios';
import API_URL from '../API_URL.js';
// es grel em nra hamar vor amen angam serverin zapros uxarkeluc function chgrem
// ayl parametr uxarkem u es function y ogtagorcem

const handleSecureRequest = async (page,perPage,token) => {
    try {

        if(!page || !perPage || !token) {
            throw new Error('You are missing arguments')
        }

        const response = await axios.get(
            `${API_URL}/api/products?page=${page}&perPage=${perPage}`,
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            }
        );
            
        if(response) {
            const data = response.data
            return data;
        }
        
    }catch (error) {
        throw new Error(error.message);
    }
};



export default handleSecureRequest;