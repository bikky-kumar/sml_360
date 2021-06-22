const express = require('express')
const router = express.Router();
const route = require("./authenticate.js");
var rp = require('request-promise');
const session = require('express-session')
var request = require('request');

router.get('/add/categories',route.requireLogin(), function(req, res){
                    res.render('add_categories',{
                    title: 'Add Categories',
                    })
                    return
})

router.post('/add/categories', route.requireLogin(), function(req, res){
   
})




module.exports = router;