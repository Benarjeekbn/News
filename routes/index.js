const express = require('express');
const router =express.Router();
const ViewController = require('../controllers/view-controller')
const auth = require('../middleware/auth')
router.get('/',(req,res)=>{res.redirect('/home')})
router.get('/home',ViewController.homePage);
router.get('/myhome',auth,ViewController.HomePage);
router.get('/news/:category',ViewController.getCategory);
router.get('/mynews/:category',auth,ViewController.GetCategory);
router.post('/search',ViewController.searchNews);
router.post('/mysearch',auth,ViewController.SearchNews);
router.post('/searchBookmark',auth,ViewController.searchBookmark)
router.get('/signup',ViewController.getSignup);
router.post('/signUp',ViewController.addSignUp);
router.get('/signin',ViewController.getSignIn);
router.post('/signIn',ViewController.SignIn);
router.get('/logout',auth,ViewController.logout);
router.get('/myprofile',auth,ViewController.myProfile);
router.post('/bookmark/:cid/*',auth,ViewController.makeBookmark);
router.get('/bookmarks',auth,ViewController.bookmarks);
router.post('/category',auth,ViewController.addCategory);
router.get('/delete/category/:id',auth,ViewController.deleteCategory);
router.get('/delete/bookmark/:id',auth,ViewController.deleteBookmark);
module.exports=router;
