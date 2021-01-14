import bcrypt, { hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.model';

class UserController {
    // login user 
    static async singin(req, res, next) {
        User.findOne({ username: req.body.username })
            .then(user => {
                if(!user) {
                    res.status(401).json({
                        msg: 'Błąd autoryzacji'
                    })
                }
                bcrypt.compare(req.body.password, user.password)
                    .then(result => {
                        if(result) {
                            const data = {id: user._id, username: user.username}
                            const token = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '1h'});

                            res.status(200).json({
                                msg: "Pomyślnie zalogowano",
                                token: token
                            })
                        }
                        else {
                            res.status(401).json({
                                msg: 'Błąd autoryzacji'
                            })
                        }
                    })
                    .catch(error => res.status(500).json({
                        msg: 'Wystąpił błąd',
                        details: error
                    }))
            })
            .catch(error => res.status(500).json({
                msg: 'Wystąpił błąd',
                details: error
            }))
    }

    // create user 
    static async create(req, res) {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
            if(error) {
                res.status(500).json({
                    msg: 'Wystąpił błąd',
                    details: error
                });
            }
            else {
                const user = new User({
                    username: req.body.username,
                    password: hash
                })
                user.save()
                    .then(user => res.status(201).json({
                        msg: 'Utworzono użytkownika',
                        details: user
                    }))
                    .catch(error => res.status(500).json({
                        msg: 'Wystąpił błąd',
                        details: error.message
                    }))
            }
        })
    }

    // get users 
    static async getAll(req, res) {
        User.findAll()
            .then(users => res.status(200).json({
                msg: 'Znaleziono użytkowników',
                details: users
            }))
            .catch(error => res.status(500).json({
                msg: 'Wystąpił błąd',
                details: error
            }))
    }

    // update user
    static async update(req, res) {
        User.findOne({ _id: req.params.id })
            .then(user => {
                if(req.params.username != undefined)
                    user.username = req.params.username;
                if(req.params.password != undefined)
                    bcrypt.hash(req.body.password, 10, (error, hash) => {
                        if(error) {
                            res.status(500).json({
                                msg: 'Wystąpił błąd',
                                details: error
                            });
                        }
                        else {
                            user.password = hash;
                        }
                    })
                user.save();
            })
            .catch(error => res.status(500).json({
                msg: 'Wystąpił błąd',
                details: error.message
            }))
    } 

    // remove user 
    static async remove(req, res, next) {
        User.findOneAndDelete({ _id: req.params.id })
            .then(user => res.status(200).json({
                msg: "Usunięto użytkownika",
                details: user
            }))
            .catch(error => res.status(500).json({
                msg: 'Wystąpił błąd',
                details: error
            }))
    }
}

export default UserController;