import express from 'express';
import userController from '../controllers/userController';
import auth from '../middleware/auth';

const router = express.Router();

router.patch('/user', auth, userController.updateUser);

export default router;
