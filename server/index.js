import express from 'express';
import database from './database.js';
import authenticateJWT from './middleware/authenticateJWT.js';
import cors from 'cors';
import { userController } from './controllers/userController.js';
import { setNewPrice } from './services/userService.js';
import { getAuctions,getAuctionsById,getPartipicatesAuctions } from './services/auctionService.js';

const app = express();

app.use(cors({credentials: true , origin : process.env.CLIENT_URL}))
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

app.get('/api/products',authenticateJWT, getAuctions)

app.get('/api/auctions/item/:id',authenticateJWT, getAuctionsById)

app.put('/auctions/updatePrice/:auctionId',authenticateJWT,setNewPrice);

app.post('/api/partipicates-auctions/',authenticateJWT,getPartipicatesAuctions)

app.listen(process.env.PORT || 3000);

