import axios from "axios";

const getUserAuction = async (user) => {
    const token = user.token;
    const userId = user.id;
    try {
        const res = await axios.post(
            `http://localhost:5000/api/partipicates-auctions/`,
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
        console.log(error)
    }
}

export default getUserAuction;