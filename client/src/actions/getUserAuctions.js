import { axiosInstance } from "../config";

export const getUserAuction = async (user) => {
    const userId = user.id;
    try {
        const res = await axiosInstance.post(`/api/auctions/participates-auctions`,{ userId });
        console.log(res,'getUserAuction')

        if(res.status === 200) {
            return res.data.data
        }
    }catch (error) {
        if(error.response.data.error === 'Your session has expired.') {
            return {
                expired : true,
            };
        }

        console.log(error)

        return error.response.data.error;
        }

    };
