import { body } from 'express-validator';

export const signupValidation = [
    body('fullname')
        .notEmpty()
        .withMessage('Full name is required'),

    body('email')
            .isEmail()
            .withMessage('Valid email is required'),

    body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters')
];

export const signinValidation = [
    body('email')
        .isEmail()
        .withMessage('Valid email is required'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
];