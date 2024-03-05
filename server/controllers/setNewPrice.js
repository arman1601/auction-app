import database from "../database.js";

const setNewPrice = async (req,res) => {
    try {
        const {userId,currentItemValue,suggValue} = req.body;
        const auctionId = req.params.auctionId;
        const addItemQuery = 'INSERT INTO auction_cart (auction_id,user_id,price) VALUES(?,?,?)'
        if (!userId || !currentItemValue || !suggValue || !auctionId) {
            return res.status(400).json({ error: 'Missing required parameters' });
        };
        if (isNaN(parseInt(currentItemValue)) || isNaN(parseInt(suggValue))) {
            return res.status(400).json({ error: 'Invalid numeric values for suggestedValue' });
        };
        if (parseInt(suggValue) <= parseInt(currentItemValue)) {
            return res.status(400).json({ error: 'Suggested value must be higher than current value' });
        }
        if (/^\d+$/.test(Number(suggValue))) {
            const [response] = await database.promise().execute('UPDATE auction SET end_price = ? WHERE id = ?',[parseInt(suggValue),auctionId]);
            if (response) {
                const addItem = await database.promise().execute(
                    addItemQuery,[auctionId, userId, Number(suggValue)]
                    );
                res.status(200).json({message : 'request has been succed'});
            }else {
                res.status(404).json({message:'Item not found'});
            };
        }
    }catch (error) {
        res.status(404).json('Ooops : Internal server error');
    };
};

export default setNewPrice;