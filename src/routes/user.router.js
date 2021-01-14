import { Router } from 'express';

import guard from '../middleware/authGuard';
import UserController from '../controllers/user.controller';

const userRouter = Router();

// GET: /
userRouter.get('/users', UserController.getAll)
// PUT: /:id
userRouter.put('/users/:id', guard, UserController.update)
// POST: /
userRouter.post('/users', UserController.create)
// DELETE: /
userRouter.delete('/users/:id', guard, UserController.remove)
// POST: /login
userRouter.post('/login', UserController.singin);

export default userRouter;