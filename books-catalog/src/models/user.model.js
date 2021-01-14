import mongoose from 'mongoose';

const user = mongoose.Schema({
    username: {
        type: String,
        index: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

export default mongoose.model('user', user);