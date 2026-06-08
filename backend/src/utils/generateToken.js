import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.personal_info.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        }
    )
}

export default generateToken;
