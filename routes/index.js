module.exports = function(io) {
var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport');
var Client = require('../models/client')

/* GET home page. */
router.get('/', function(req, res, next) {

  //User.create({email: 'igorpollo@gmail.com'})
  res.render('index', { title: 'Express' });
});

/* get user infomation. */
router.post('/user', function(req, res, next) {

  if(req.body) {
    if(req.body.token) {
      var decoded = jwt.verify(req.body.token, 'sh');
      User.findOne({_id: decoded.id}, function(err, user) {
        if(user) {
          res.json(user)
        } else {
          res.redirect('/');
        }
      })
    }
  } else {
    res.redirect('/');
  }
});

//USERS - SIGNUP

router.get('/signup', function(req, res, next) {
  res.render('users/signup')
});

router.post('/signup', function(req, res, next) {
    var body = req.body

    var hash = bcrypt.hashSync(body.password);

    var newUser = new User({email: body.email, password: hash});
    newUser.save()
    .then(() => res.json({success: true, data: newUser}))
    .catch(err => res.json(err));

});

//USERS-LOGIN

router.get('/login', function(req, res, next) {
  res.render('users/login', {msg: ''})
});


router.post('/login', function(req, res, next) {

  var body = req.body

  User.findOne({'email': body.email }, function(err, user) {
    if (user) {
      bcrypt.compare(body.password, user.password, function(err, auth) {
           if(auth) {
             payload = {id: user.id}
            var token = jwt.sign(payload, 'sh');
            res.json({
              success: true,
              message: 'Logado com sucesso!',
              token: token
            });
          } else {
            res.json({
              success: false,
              message: 'Login ou senha inválidos!',
            });
          }
      });
    } else {
      res.json({
        success: false,
        message: 'Login ou senha inválidos!',
      });
      }
});
});


//PROFILE

router.get('/profile', function(req, res) {
   if(req.body.user) { // or if (req.isAuthenticated())
     res.send('logged')
   } else {
     res.send('not loggedIn')
   }
 });

router.get('/profile2', passport.authenticate('jwt', { session: false }),
     function(req, res) {
         res.json(req.user);
     }
 );

 router.get('/users2', function(req, res) {
   User.find({}).lean().exec(function(e,docs){
       res.json(docs);
       res.end();
    });
 });


 // GET ALL CLIENTS
 router.get('/clients2', passport.authenticate('jwt', { session: false }),function(req, res) {
  
      Client.find({}).lean().exec(function(e,docs){
          res.json(docs);
          res.end();
      });
  });

return router;

}
