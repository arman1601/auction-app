import express from 'express';
import database from './database.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import auctionRoutes from './routes/auctionRoutes.js'
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({credentials: true , origin : process.env.CLIENT_URL}));
app.use(express.static('./client/src'));
app.use(express.json());
app.use(cookieParser());

const db = database;
db.connect((err) => {
  if (err) {
      console.error('Error to conected database:', err);
  } else {
      console.log('Success conected to database!');
  }
});

app.use('/api/users', userRoutes);
app.use('/api/auctions', auctionRoutes);

app.listen(process.env.PORT || 5000);

