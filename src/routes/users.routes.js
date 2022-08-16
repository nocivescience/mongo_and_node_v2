import {Router} from 'express';
import {
    renderSignUpForm,
    signup,
    renderSigninForm,
    signin,
    logout
} from '../controllers/users.controllers';
const router = Router();
router.get('/users/signup', renderSignUpForm );
router.post('/users/signup',signup);
router.get('/users/signin',renderSigninForm);
router.post('/users/logout',logout);
export default router;