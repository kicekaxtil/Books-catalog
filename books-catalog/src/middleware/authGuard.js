import dotenv from 'dotenv';
dotenv.config();

import expressJWT from 'express-jwt';

const guard = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});

export default guard;