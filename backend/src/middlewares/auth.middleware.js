import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import User from '../schema/User.js'

export const verifyToken = asyncHandler(async (req, res, next) => {

    // Prefer httpOnly cookie, fall back to Authorization header (for API clients)
    let token = req.cookies?.token;

    if (!token) {
        const authHeader = req.headers.authorization;
        token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    }

    if (!token) {
        throw new ApiError(401, 'Unauthorized request');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decodedToken._id).select('-personal_info.password')

    if (!user) {
        throw new ApiError(401, 'Invalid access token');
    }

    req.user = user
    next()
    
});
