# BOOKS-CATALOG
Aplikacja napisana w oparciu o framework `Exprees.js`. W projekcie wykorzystano transpilator kodu `Babel`.
Do autoryzacji użytkownika na podstawie tokenu JWT użyto pakietu `express-jwt`. 
# MODELE
### USER
Model zawiera dwa pola: `username` oraz `password`. Hasło jest haszowane przed zapisem do bazy danych. Do haszowania zastosowano funkcję haszującą `bcrypt`.
```js
username: {
    type: String,
    index: true,
    required: true,
},
password: {
    type: String,
    required: true,
}
```
### BOOK
Model zawiera cztery pola: `title`, `cover`, `author` oraz `description`. Pole `author` powinno zawierać identyfikator (id) autora. 
Pole `cover` przechowuje nazwę pliku okładki - przesyłanie pliku obsługiwane jest przez oprogramowanie pośredniczące [Multer](https://github.com/expressjs/multer).  
```js 
title: {
    type: String,
    required: true
},
cover: {
    type: String,
},
author: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'author'
},
description: {
    type: [String]
}
```
### AUTHOR
Model zawiera trzy pola: `firstName`, `lastName` oraz `books`. Pole `books` nie jest przystosowane do odbierania danych za momocą metody POST. Przechowuje ono idenyfikatory (id)
książek danego autora. Tablica aktualizuje się automatycznie wraz z dodaniem lub usunięciem danej książki.
```js
firstName: {
    type: String,
    required: true
},
lastName: {
    type: String,
    required: true
},
books: [{type: mongoose.Types.ObjectId, ref: 'book'}]
```
# ŚCIEŻKI
| ścieżka             | metoda     | opis |
| :------------------ | :--------- | :--- |
| `/login`            | POST       | zwraca token jwt
| `/users`            | GET        | zwraca listę wszystkich użytkowników
| `/users`            | POST       | zapisuje użytkownika w bazie danych
| `/users/:id`        | **PUT***   | aktualizuje użytkownika o podanym identyfikatorze (id)
| `/users/:id`        | **DELETE***| usuwa użytkownika o podanym identyfikatorze (id)
| `/api/book/`        | GET        | zwraca listę wszystkich książek
| `/api/book/:id`     | GET        | zwraca książkę o podanym identyfikatorze (id)
| `/api/book/`        | **POST***  | zapisuje książkę w bazie danych
| `/api/book/:id`     | **PUT***   | aktualizuje książkę o podanym identyfikatorze (id)
| `/api/book/:id`     | **DELETE***| usuwa książkę o podanym identyfikatorze (id)
| `/api/authors/`     | GET        | zwraca listę wszystkich autorów
| `/api/authors/:id`  | GET        | zwraca autora o podanym identyfikatorze (id)
| `/api/authors/`     | **POST***  | zapisuje autora w bazie danych
| `/api/authors/:id`  | **PUT***   | aktualizuje autora o podanym identyfikatorze (id)
| `/api/authors/:id`  | **DELETE***| usuwa autora o podanym identyfikatorze (id)

***ścieżki z pogrubionymi metodami, przy których znajduje się gwiazdka wymagają autoryzacji użytkownika**