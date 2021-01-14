import { Router } from 'express';

import guard from '../middleware/authGuard';
import AuthorController from '../controllers/author.controller';

const bookRouter = Router();

// GET: api/authors/
bookRouter.get('/', AuthorController.getAll);
// GET: api/authors/:id
bookRouter.get('/:id', AuthorController.getOne);

// POST: api/authors/
bookRouter.post('/', guard, AuthorController.create)
// PUT: api/authors/:id
bookRouter.put('/:id', guard, AuthorController.update)
// DELETE: api/authors/:id
bookRouter.delete('/:id', guard, AuthorController.remove)

export default bookRouter;