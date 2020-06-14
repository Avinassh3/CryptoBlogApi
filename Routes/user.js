const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware } = require('../controller/auth');
const { read } = require('../controller/user');

router.get('/profile', requireSignin, authMiddleware, read);

module.exports = router;
