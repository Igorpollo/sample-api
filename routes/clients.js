module.exports = function(io) {
var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport');
var Client = require('../models/client')

	//GET ALL CLIENTS
	router.get('/', passport.authenticate('jwt', { session: false }),function(req, res) {
    
        Client.find({"userId": req.user._id}).lean().exec(function(e,docs){
            res.json(docs);
            res.end();
        });
    });

    //CREATE NEW CLIENT
	router.post('/', passport.authenticate('jwt', { session: false }),function(req, res) {
    	
    	var client = new Client({ name: req.body.name, userId: req.user._id });
        client.save(function (err, client) {
		  res.json(client);
		});
    });

    router.put('/:id', passport.authenticate('jwt', { session: false }),function(req, res) {

    	updatedClient = req.body;

    	Client.findOneAndUpdate({_id: req.params.id, userId: req.user._id }, updatedClient, { new: true }, function (err, newclient) {
	      if (err) {
	        console.log(err);
	        return res.status(400).json({ message: err });
	      }
	      return res.status(200).json(newclient);
	    });

    		/*
    		
    		Client.findOne({_id: req.params.id, userId: req.user._id}, function (err, user) {

    			if(!user) {
    				res.send('não foi possivel encontrar o usuario');
    				res.end();
    			}

    			user = req.body
 
			    user.save(function (err) {
			        if(err) {
			            console.error('ERROR!');
			        } else {
			        	res.send('sucesso')
			        }
			    });
			});	 
			*/

    });


   

return router;

}