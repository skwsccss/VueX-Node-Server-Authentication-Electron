var express = require('express');
var router = express.Router();
var userController = require('../controllers/Users');
var Users = new userController();
var bodyParser = require('body-parser');

router.use(bodyParser.json())
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', Users.login);
router.post('/register',Users.register);


module.exports = router;
