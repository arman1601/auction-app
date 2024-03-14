import axios from "axios";
import API_URL from '../API_URL.js';

const getUserAuction = async (user) => {
    const token = user.token;
    const userId = user.id;
    try {
        const res = await axios.post(
            `${API_URL}/api/partipicates-auctions/`,
            {userId},
            {
                headers : {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            }
        );

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

export default getUserAuction;