import jwt from "jsonwebtoken";
import database from '../database.js';

export const userController = async (req, res) => {
    try {
        const {username,password} = req.body;

        if (!username || !password) return res.status(400).json({ error: 'Սխալ : մուտքանուն կամ գաղտնաբառ չկա' });
  
        const [rows] = await database.promise().query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length > 0 && rows[0].password === password) {
          const token = jwt.sign({ 
            userId: rows[0].id,
            username: rows[0].username
            }, 
            process.env.SECRET_KEY,
            {expiresIn : '1h'});
            
            const multiplier = 60 * 60 * 1000;
            const expirationDate = Date.now() + multiplier * 1;


          res.json({user: {
            id: rows[0].id,
            username: rows[0].username,
            token,
            expirationDate,
          }});
  
        } else {
          res.status(401).json({message : 'Սխալ մուտքանուն կամ գախտտնաբառ'}); 
        }
      }catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
};