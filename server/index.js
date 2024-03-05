import express from 'express';
import database from './database.js';
import authenticateJWT from './middleware/authenicateJWT.js';
import cors from 'cors';
import { userController } from './controllers/userController.js';
import setNewPrice from './controllers/setNewPrice.js';
import getPartipicatesAuctions from './controllers/getPartipicatesAuctions.js';
const app = express();

app.use(cors())
app.use(express.static('./client/src'))
app.use(express.json())

const db = database;
db.connect((err) => {
  if (err) {
      console.error('Error to conected database:', err);
  } else {
      console.log('Success conected to database!');
  }
});

app.post('/login', userController);

app.get('/api/products', async (req,res) => {
  try {
    const {page,perPage} = req.query;
    const offset = (page - 1) * perPage;    
    const [rows] = await db.promise().query('SELECT * FROM auction LIMIT ? OFFSET ?',[Number(perPage),offset]);
    const [tableLength] = await db.promise().query('SELECT COUNT(*) as count FROM auction');
    const countItems = tableLength[0];
    res.json({rows,countItems})
  }catch (error) {  
    console.log(error)
  }
})

app.get('/api/auctions/item/:id', async (req,res) => {
  try {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: 'Invalid id format' });
    }
    const [response] = await db.promise().query('SELECT * FROM auction WHERE id = ?',[id])
    if(response.length > 0) {
      const data = response[0];
      res.json({data})
    }else {
      res.status(404).json({message:'Item not found'})
    }
  }catch (error) {
    console.error(error)
    res.status(500).json({error : 'internal server error'});
  }
})

app.put('/auctions/updatePrice/:auctionId',authenticateJWT,setNewPrice);

app.post('/api/partipicates-auctions/',authenticateJWT,getPartipicatesAuctions)

app.listen(process.env.PORT || 3000);

