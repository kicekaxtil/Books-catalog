import Book from '../models/book.model';
import Author from '../models/author.model';

class AuthorController {
    // create author
    static async create(req, res) {
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
        author.save()
            .then(author => res.status(201).json({
                msg: 'Utworzono autora',
                details: author
            }))
            .catch(error => res.status(500).json({
                msg: 'Wystąpił błąd',
                details: error.message
            }))
    }
    // get all authors
    static async getAll(req, res) {
        Author.find()
            .then(authors => res.status(200).json({
                msg: 'Znaleziono autorów',
                details: authors
            }))
            .catch(error => res.status(500).json({
                msg: 'Wystąpił błąd',
                details: error
            }))
    }
    // get author
    static async getOne(req, res) {
        Author.findOne({ __id: req.params.id })
            .then(author => res.status(200).json({
                msg: 'Znaleziono autora',
                details: author
            }))
            .catch(error => res.status(500).json({
                msg: 'Wystąpił błąd',
                details: error
            }))
    }
    // update author
    static async update(req, res) {
        Author.findOne({ _id: req.params.id })
            .then(author => {
                if(req.body.firstName != undefined) 
                    author.firstName = req.body.firstName;
                if(req.body.lastName != undefined)
                    author.lastName = req.file.lastName;
                book.save();

                res.status(200).json({
                    msg: 'Uaktualniono autora',
                    details: author
                })
            })
            .catch(error => res.status(500).json({
                msg: 'Wystąpił błąd',
                details: error
            }))
    }
    // delete author
    static async remove(req, res) {
        Author.findOneAndDelete({ _id: req.params.id })
            .then(author => {
                author.books.forEach(id => {
                    Book.findOne({_id: id})
                        .then(book => book.author = undefined);
                })   
                
                res.status(200).json({
                    msg: "Usunięto autora",
                    details: author
                })
            })
            .catch(error => res.status(500).json({
                msg: 'Wystąpił błąd',
                details: error
            }))
    }
}

export default AuthorController;