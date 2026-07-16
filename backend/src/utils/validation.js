import { body } from 'express-validator';

export const signupValidation = [
    body('fullname')
        .notEmpty()
        .withMessage('Full name is required'),

    body('email')
        .isEmail()
        .withMessage('Valid email is required'),

    body('password')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
        .withMessage(
            'Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 symbol'
        ),
];

export const signinValidation = [
    body('email')
        .isEmail()
        .withMessage('Valid email is required'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
];