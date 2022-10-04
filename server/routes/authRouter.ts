import express from 'express';
import authController from '../controllers/authController';
import { validRegister } from '../middleware/vaild';

const router = express.Router();

router.post('/register', validRegister, authController.register);

export default router;
