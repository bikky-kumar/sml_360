const express = require('express')
const session = require('express-session')
const router = express.Router();


var exports = module.exports = {};
exports.requireLogin = function(){
    return function(req, res, next) {
                if (!req.session.staffId) {
                    res.redirect('/users/login');
                } else {
                next();
                }
            };
        } 