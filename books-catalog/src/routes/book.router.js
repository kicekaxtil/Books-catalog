import { Router } from 'express';

import upload from '../middleware/upload';
import guard from '../middleware/authGuard';

import BookController from '../controllers/book.controller';

const bookRouter = Router();

// GET: api/books/
bookRouter.get('/', BookController.getAll);
// GET: api/books/:id
bookRouter.get('/:id', BookController.getOne);
// POST: api/books/
bookRouter.post('/', guard, upload.single('cover'), BookController.create)
// PUT: api/books/:id
bookRouter.put('/:id', guard, upload.single('cover'), BookController.update)
// DELETE: api/books/:id
bookRouter.delete('/:id', guard, BookController.remove)

export default bookRouter;