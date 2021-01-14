import mongoose from 'mongoose';

const author = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    books: [{type: mongoose.Types.ObjectId, ref: 'book'}]
});

export default mongoose.model('author', author);