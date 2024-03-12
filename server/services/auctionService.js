import database from "../database.js";

export const getAuctions = async (req,res) => {
    try {
      const {page,perPage} = req.query;
      const offset = (parseInt(page - 1)) * parseInt(perPage);    
      const [rows] = await database.promise().query('SELECT * FROM auction LIMIT ? OFFSET ?',[Number(perPage),offset]);
      const [tableLength] = await database.promise().query('SELECT COUNT(*) as count FROM auction');
      const countItems = tableLength[0];
      res.status(200).json({rows,countItems});
    }catch (error) {  
        res.status(404).json({message : error});
    }
};


export const getAuctionsById = async (req,res) => {
    try {
      const id = req.params.id;
      if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'Invalid id format' });
      }
      const [response] = await database.promise().query('SELECT * FROM auction WHERE id = ?',[id]);
      if(response.length > 0) {
        const data = response[0];
        res.json({data});
      }else {
        res.status(404).json({message:'Item not found'});
      };
    }catch (error) {
      res.status(500).json({error : 'internal server error'});
    };
};


export const getPartipicatesAuctions = async (req,res) => {
    try {
        const {userId} = req.body;
        const query = 'SELECT * FROM auction_cart WHERE user_id = ?' ;

        if(!userId || typeof userId !== 'number'){
            throw new Error("UserId is required");
        };

        const [response] = await database.promise().query(query,[userId]);

        if(response.length > 0) {   
            const filteredRespWithUniqueId = response.reduce((acc,cur) => {
              const existingObjectIndex = acc.findIndex(item => item.auction_id === cur.auction_id);
              if (existingObjectIndex !== -1) {
                if(acc[existingObjectIndex].price < cur.price) {
                  acc[existingObjectIndex] = cur;
                };
              }else {
                acc.push(cur);
              };

              return acc;
            },[]);
          
            const query = 'SELECT * FROM auction WHERE id =?';
            const resultPromises = filteredRespWithUniqueId.map(async (elem) => {
                const [auctionResponse] = await database.promise().query(query,[elem.auction_id]);
                return {
                    auction : auctionResponse[0],
                    partipication : elem,
                };
            });

            const result = await Promise.all(resultPromises);

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
    
};

export default getPartipicatesAuctions;