const router = require('express').Router();
// Use the controller to process requests
const controller = require('../controllers/controller.js');

const { isPrivate } = require('../middlewares/checkAuth'); //requires users to be logged in to access these pages

router.get('/', isPrivate, (req, res) => {
    res.render('home', { 
      pageTitle: 'Home', 
      name: req.session.name,
      layout: 'main'} );
  });

//duplicate route for home
router.get('/home', isPrivate, (req, res) => {
    res.render('home', { 
      pageTitle: 'Home', 
      name: req.session.name,
      layout: 'main' } );
  });

router.get('/view-profile', isPrivate, (req, res) => {
    res.render('view_profile', { 
      pageTitle: 'View Profile', 
      name: req.session.name,
      layout: 'main' } );
  });

router.get('/edit-profile', isPrivate, (req, res) => {
    res.render('edit_profile', { 
      pageTitle: 'Edit Profile', 
      name: req.session.name,
      layout: 'main' } );
  });

router.get('/view-post', isPrivate, (req, res) => {
  res.render('view_post', { 
    pageTitle: 'View Post', 
    name: req.session.name,
    layout: 'main' } );
  });
module.exports = router;