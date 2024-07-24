import express from 'express';
import { getAuctions, getAuctionsById, getPartipicatesAuctions, setNewPrice } from '../services/auctionService.js';
import { authJWT } from '../middleware/authJWT.js'

const router = express.Router();

router.get('/products', authJWT, getAuctions);
router.get('/item/:id', authJWT, getAuctionsById);
router.put('/updatePrice/:auctionId', authJWT, setNewPrice);
router.post('/participates-auctions', authJWT, getPartipicatesAuctions);

export default router;
