import express from 'express';
import user from './controller/user.ctrl';

const router = express.Router();

router.use('/user', user);

export default router;
