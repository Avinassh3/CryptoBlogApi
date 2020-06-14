const express = require('express');
const router = express.Router();
const { signup, signin, signout, requireSignin } = require('../controller/auth');
const expressJwt = require('express-jwt');
// validators
const { runValidation } = require('../validators');
const { userSignupValidator, userSigninValidator } = require('../validators/auth');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);
// test



module.exports = router;
