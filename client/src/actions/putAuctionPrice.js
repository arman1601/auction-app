import { axiosInstance } from "../config";

const putAuctionPrice = async (elem,suggestedValue,user) => {
    try {
        console.log(user,'useri id')
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
            const response = await axiosInstance.put(`/api/auctions/updatePrice/${auctionId}`, { requestData });
            return response;
        }

    }catch (error) {
        return error.message
    }
}

export default putAuctionPrice;