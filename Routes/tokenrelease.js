const express = require('express');
const router = express.Router();
const { create, list, read, remove } = require('../controller/tokenrelease');

const { requireSignin, adminMiddleware } = require('../controller/auth');

router.post('/token', requireSignin, adminMiddleware, create);
router.get('/tokens', list);
router.get('/token/:name/:release', read);
router.delete('/token/:name/:release', requireSignin, adminMiddleware, remove);
module.exports = router;
