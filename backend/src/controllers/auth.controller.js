import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import User from '../schema/User.js'
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import generateToken from '../utils/generateToken.js'

const signUp = asyncHandler(async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation failed', errors.array())
    }

    const { fullname, email, password } = req.body
    const normalizedEmail = email.toLowerCase()

    const existingUser = await User.findOne({ 'personal_info.email': normalizedEmail })
    if (existingUser) {
        throw new ApiError(409, 'User with this email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        personal_info: {
            fullname,
            email: normalizedEmail,
            password: hashedPassword
        }
    })

    // token generate

    const token = generateToken(user)

    res.status(201).json(
        new ApiResponse(
            201,
            {
                user: {
                    _id: user._id,
                    fullname: user.personal_info.fullname,
                    email: user.personal_info.email,
                    profile_img: user.personal_info.profile_img,
                    joinedAt: user.joinedAt
                },
                token
            },
            'User signed up successfully'
        )
    )
})

const signIn = asyncHandler(async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation failed', errors.array())
    }

    const { email, password } = req.body
    const normalizedEmail = email.toLowerCase()

    const user = await User.findOne({ 'personal_info.email': normalizedEmail })
    
    if (!user) {
    throw new ApiError(404, 'User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.personal_info.password)

    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const token = generateToken(user)

    res.status(200).json(
        new ApiResponse(
            200,
            {
                user: {
                    _id: user._id,
                    fullname: user.personal_info.fullname,
                    email: user.personal_info.email,
                    profile_img: user.personal_info.profile_img,
                    joinedAt: user.joinedAt
                },
                token
            },
            'User signed in successfully'
        )
    );
})

export { 
    signUp,
    signIn
}
