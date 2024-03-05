import axios from 'axios';
// es grel em nra hamar vor amen angam serverin zapros uxarkeluc function chgrem
// ayl parametr uxarkem u es function y ogtagorcem

const handleSecureRequest = async (page,perPage,token) => {
    try {
        const response = await axios.get(
            
            `http://localhost:5000/api/products?page=${page}&perPage=${perPage}`,
            {},
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
        
    } catch (error) {
       console.log('Error in secure request: ', error);
       return false;
    }
};



export default handleSecureRequest;