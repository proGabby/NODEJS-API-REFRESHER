const express = require('express');
const router = express.Router();

// const { register, login, logout } = require('../controllers/authController');
const { register} = require('../controllers/authController');

router.post('/register', register);
// router.post('/login', login);
// router.get('/logout', logout);
// router.post('/forgetPassword');
// router.post('/resetPassword');

module.exports = router;