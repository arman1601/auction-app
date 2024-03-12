import axios from "axios"
import { API_URL } from "../config";

const putAuctionPrice = async (elem,suggestedValue,user) => {
    try {
        const token = user.token;
        const userId = user.id;
        const auctionId = elem.id;
        const min_step = elem.min_step;
        const suggValue = parseInt(suggestedValue);
        const currentItemValue = elem.end_price ? elem.end_price : elem.price;
        const requestData = {
            userId,
            currentItemValue,
            suggValue,
        };

        if (typeof Number(suggValue) !== 'number') {
            throw new Error('Suggested value must be a number');
        }else if (suggValue - currentItemValue < min_step ) {
            throw new Error(`Suggested value is bellow ${Number(currentItemValue) + Number(elem.min_step)}`);
        }else if (/^\d+$/.test(suggValue) !== true ) {
            throw new Error('Suggested value will be only number')
        }else {
            const response = await axios.put(`${API_URL}/auctions/updatePrice/${auctionId}`, 
            requestData,
            {
                headers : {
                    Authorization : token ? `Bearer ${token}` : '',
                },
            });
            return response;
        }

    }catch (error) {
        return error.message
    }
}

export default putAuctionPrice;