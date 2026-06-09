import { Router } from 'express'
import { signUp, signIn, googleAuth } from '../controllers/auth.controller.js'
import { signupValidation, signinValidation } from '../utils/validation.js'
import { verifyToken } from '../middlewares/auth.middleware.js'
import ApiResponse from '../utils/ApiResponse.js'

const router = Router()

router.post('/signup', signupValidation, signUp)
router.post('/signin', signinValidation, signIn)
router.post('/google-auth', googleAuth)

// test route - for jwt verification
router.get('/me', verifyToken, (req, res) => {
  res.status(200).json(
    new ApiResponse(200, { user: req.user }, 'User fetched successfully')
  );
});

export default router
