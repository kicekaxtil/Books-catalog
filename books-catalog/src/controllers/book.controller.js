import Book from '../models/book.model';
import Author from '../models/author.model';
class BookControler {
    // create book
    static async create(req, res) {
        const book = new Book({
            title: req.body.title,
            cover: req.file.filename,
            author: req.body.author,
            description: req.body.description,
        })
        book.save()
            .then(book => {
                if(req.body.author != undefined) {
                    Author.findOne({ _id: req.body.author })
                        .then(author => {
                            author.books.push(book._id);
                            author.save()
                        })
                }
                res.status(201).json({
                    msg: 'Utworzono książkę',
                    details: book
                })
            })
            .catch(error => res.status(500).json({
                msg: 'Wystąpił błąd',
                details: error.message
            }))
    }
    // get all books
    static async getAll(req, res) {
        Book.find()
            .then(books => res.status(200).json({
                msg: 'Znaleziono książki',
                details: books
            }))
            .catch(error => res.status(500).json({
                msg: 'Wystąpił błąd',
                details: error
            }))
    }
    // get book
    static async getOne(req, res) {
        Book.findOne({ __id: req.params.id })
            .then(book => res.status(200).json({
                msg: 'Znaleziono książkę',
                details: book
            }))
            .catch(error => res.status(500).json({
                msg: 'Wystąpił błąd',
                details: error
            }))
    }
    // update book
    static async update(req, res) {
        Book.findOne({ _id: req.params.id })
            .then(book => {
                if(req.body.title != undefined)
                    book.title = req.body.title;
                if(req.file != undefined)
                    book.cover = req.file.filename;
                if(req.body.author != undefined)
                    book.author = req.body.author;
                if(req.body.description != undefined) 
                    book.description = req.body.description;
            
                book.save();

                Author.find()
                    .then(authors => {
                        authors.forEach(author => {
                            if(book.author != author._id)
                                author.books = author.books.filter(item => item != book._id);
                            author.save()
                        })
                    })

                res.status(200).json({
                    msg: 'Uaktualniono książkę',
                    details: book
                })
            })
            .catch(error => res.status(500).json({
                msg: 'Wystąpił błąd',
                details: error
            }))
    }
    // delete book
    static async remove(req, res) {
        Book.findOneAndDelete({ _id: req.params.id })
            .then(book => {
                Author.findOne({ _id: book.author })
                .then(author => {
                        author.books = author.books.filter(item => item != req.params.id)
                        author.save();
                    })


                res.status(200).json({
                    msg: "Usunięto książkę",
                    details: book
                })
            })
            .catch(error => res.status(500).json({
                msg: 'Wystąpił błąd',
                details: error
            }))
    }
}

export default BookControler;