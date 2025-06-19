import { Router } from 'express'
import userAuthCheck from '../middlewares/authCheck.js'
import { editProfile, viewProfile } from '../controllers/userController.js'
import { check } from 'express-validator'

const router = Router()
router.use(userAuthCheck)

router.get('/:id', viewProfile);

router.patch('/edit/:id', [
    check("name").optional().notEmpty().withMessage("Name required"),
    check("email").optional().isEmail().withMessage("email required"),
    check("password").optional().isLength({ min: 6 }).withMessage("password required")
],editProfile);

export default router