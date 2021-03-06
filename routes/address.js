module.exports = function(io) {
    var express = require('express');
    var bcrypt = require('bcrypt-nodejs');
    var jwt = require('jsonwebtoken');
    var router = express.Router();
    var User = require('../models/user')
    var passport = require('passport');
    var Client = require('../models/client')
    var Address = require('../models/address')
    
        //GET ALL CLIENTS
        router.get('/', passport.authenticate('jwt', { session: false }),function(req, res) {
        
            Client.find({"userId": req.user._id}).lean().exec(function(e,docs){
                res.json(docs);
                res.end();
            });
        });
    
        //CREATE NEW CLIENT
        router.post('/:id', passport.authenticate('jwt', { session: false }),function(req, res) {
            
            var address = new Address({ name: req.body.name, clientId: req.params.id});
            address.save(function (err, client) {
              res.json(client);
            });
        });
    
        // RETURN CLIENT INFO
        router.get('/:id', passport.authenticate('jwt', { session: false }),function(req, res) {
        
            Client.
              findOne({ _id: req.params.id }).
              populate('userId').
              exec(function (err, client) {
                if (err) return handleError(err);
                res.send(client);
              });
        });
    
        // UPDATE CLIENT
        router.put('/:id', passport.authenticate('jwt', { session: false }),function(req, res) {
    
            updatedClient = req.body;
    
            Client.findOneAndUpdate({_id: req.params.id, userId: req.user._id }, updatedClient, { new: true }, function (err, upClient) {
              if (err) {
                console.log(err);
                return res.status(400).json({ message: err });
              }
              return res.status(200).json({success: true, message: 'Informações atualizadas!'});
            });
            
        });
        //DELETE CLIENT
        router.delete('/:id', passport.authenticate('jwt', {session: false}), function(req, res) {
            Client.find({_id: req.params.id, userId: req.user._id}).remove(function(err, success){
                if (err) {
                    res.send('Não foi possível deletar o cliente!');
                } else {
                    res.json({success: true, message: 'Deletado com sucesso!'})
                }
            });
        })
    
    
        
    
    
       
    
    return router;
    
    }