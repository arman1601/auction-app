import express from 'express';
import { newUserCreateController } from '../controllers/newUserCreateController.js';
import { loginController } from '../controllers/loginController.js';
import { updateToken } from '../controllers/tokenController.js';
import { logoutController } from '../controllers/logoutController.js';

const router = express.Router();

router.post('/create-account', newUserCreateController);
router.post('/login', loginController);
router.post('/updateToken', updateToken);
router.post('/logout', logoutController);


export default router;