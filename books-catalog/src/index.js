import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import userRouter from './routes/user.router';
import bookRouter from './routes/book.router';
import authorRouter from './routes/author.router';


// inicjalizacja aplikacji
const app = express();

// ustawienie portu
const port = process.env.PORT || 3000;

// połączenie z bazą danych
mongoose.connect(process.env.DATABASE_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

// ustawienie folderu statycznego
app.use('/uploads', express.static('uploads'));

// ustawienia logera
app.use(morgan('dev'));

// ustawienia body-parsera
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// ustawienie ścieżek
app.use('/', userRouter);
app.use('/api/books', bookRouter);
app.use('/api/authors', authorRouter);

// obsługa błędów
app.use((req, res, next) => {
    const error = new Error('Nie znaleziono');
    error.status = 404;
    next(error);
});

/*
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        wiadomosc: error.message,
      },
    });
});
*/

// nasłuchiwanie aplikacji
app.listen(port, () => console.log('Aplikacja działa:', 'http://localhost:' + port));