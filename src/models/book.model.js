import mongoose from 'mongoose';

const book = mongoose.Schema({
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
});

export default mongoose.model('book', book);