import { Router } from 'express'
import { signUp, signIn } from '../controllers/auth.controller.js'
import { signupValidation, signinValidation } from '../utils/validation.js'

const router = Router()

router.post('/signup', signupValidation, signUp)
router.post('/signin', signinValidation, signIn)

export default router