import { axiosInstance } from '../config.js';

export const handleSecureRequest = async (page,perPage) => {
    try {
        if(!page || !perPage ) {
            throw new Error('You are missing arguments')
        }
        const response = await axiosInstance.get(
            `/api/auctions/products?page=${page}&perPage=${perPage}`,
        );
        if(response) {
            const data = response.data
            return data;
        }
        
    }catch (error) {
        throw new Error(error.message);
    }
};

