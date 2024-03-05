import database from "../database.js"

const getPartipicatesAuctions = async (req,res) => {
    try {
        const {userId} = req.body;
        const query = 'SELECT * FROM auction_cart WHERE user_id = ?' ;

        if(!userId || typeof userId !== 'number'){
            throw new Error("UserId is required");
        };

        const [response] = await database.promise().query(query,[userId]);

        if(response.length > 0) {        
            const query = 'SELECT * FROM auction WHERE id =?';
            const resultPromises = response.map(async (elem) => {
                const [auctionResponse] = await database.promise().query(query,[elem.auction_id])
                return {
                    auction : auctionResponse[0],
                    partipication : elem,
                };
            });

            const result = await Promise.all(resultPromises);
            console.log(result)
            res.status(200).json({data : result});

        }else {
            res.status(404).json({message:'Item not found'});
        };
    }catch (error) {
        if(error instanceof SyntaxError) {
            res.status(500).json({ error: 'Error parsing database response' });
        }else {
            res.status(500).json({ error: 'Internal server error' });
        };    
    };
    
}

export default getPartipicatesAuctions;