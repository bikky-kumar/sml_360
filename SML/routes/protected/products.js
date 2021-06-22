const express = require('express')
const router = express.Router();
const route = require("./authenticate.js");
var request = require('request');


router.get('/products',route.requireLogin(), function(req, res){
    res.render('products',{
        title: 'Manage Products'
    })
})

module.exports = router;
