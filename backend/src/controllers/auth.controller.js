import bcrypt from 'bcrypt'
import { OAuth2Client } from 'google-auth-library'
import { validationResult } from 'express-validator'
import User from '../schema/User.js'
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import generateToken from '../utils/generateToken.js'

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const buildAuthResponse = (user, token) => ({
    user: {
        _id: user._id,
        fullname: user.personal_info.fullname,
        email: user.personal_info.email,
        profile_img: user.personal_info.profile_img,
        joinedAt: user.joinedAt
    },
    token
})

const signUp = asyncHandler(async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation failed', errors.array())
    }

    const { fullname, email, password } = req.body
    const normalizedEmail = email.toLowerCase()

    const existingUser = await User.findOne({
        'personal_info.email': normalizedEmail
    })

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

    const token = generateToken(user)

    res.status(201).json(
        new ApiResponse(
            201,
            buildAuthResponse(user, token),
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

    const user = await User.findOne({
        'personal_info.email': normalizedEmail
    }).select('+personal_info.password')

    if (!user) {
        throw new ApiError(404, 'User not found')
    }

    if (user.google_auth && !user.personal_info.password) {
        throw new ApiError(400, 'Please sign in with Google')
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.personal_info.password
    )

    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid credentials')
    }

    const token = generateToken(user)

    res.status(200).json(
        new ApiResponse(
            200,
            buildAuthResponse(user, token),
            'User signed in successfully'
        )
    )
})

const googleAuth = asyncHandler(async (req, res) => {
    const { credential } = req.body

    if (!credential) {
        throw new ApiError(400, 'Google credential is required')
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
        throw new ApiError(500, 'Google client id is not configured')
    }

    const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()

    if (!payload?.email) {
        throw new ApiError(400, 'Google account email is required')
    }

    const normalizedEmail = payload.email.toLowerCase()

    let user = await User.findOne({
        'personal_info.email': normalizedEmail
    })

    if (!user) {
        user = await User.create({
            personal_info: {
                fullname: payload.name,
                email: normalizedEmail,
                profile_img: payload.picture
            },
            google_auth: true
        })
    }

    const token = generateToken(user)

    res.status(200).json(
        new ApiResponse(
            200,
            buildAuthResponse(user, token),
            'Google authentication successful'
        )
    )
})

export {
    signUp,
    signIn,
    googleAuth
}
