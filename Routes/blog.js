const express = require('express');
const router = express.Router();
const { create, list,listNews, listAllBlogsCategoriesTags, read, remove, update,photo ,listRelated , listSearch} = require('../controller/blog');

const { requireSignin, adminMiddleware } = require('../controller/auth');

router.post('/blog', requireSignin, adminMiddleware, create);
router.get('/blogs', list);
router.get('/blogs/news', listNews);
router.post('/blogs-categories-tags', listAllBlogsCategoriesTags);
router.get('/blog/:slug', read);
router.delete('/blog/:slug', requireSignin, adminMiddleware, remove);
router.put('/blog/:slug', requireSignin, adminMiddleware, update);
router.get('/blog/photo/:slug',photo);
router.post('/blogs/related',listRelated);
router.get('/blogs/search', listSearch);
module.exports = router;
