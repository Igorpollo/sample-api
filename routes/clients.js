module.exports = function(io) {
var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport');
var Client = require('../models/client')

router.get('/', passport.authenticate('jwt', { session: false }),function(req, res) {
    
        Client.find({"userId":req.user._id}).lean().exec(function(e,docs){
            res.json(docs);
            res.end();
        });
    });

return router;

}