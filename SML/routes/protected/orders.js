const express = require('express')
const router = express.Router();
const route = require("./authenticate.js");
var request = require('request');


router.get('/orders',route.requireLogin(), function(req, res){
    res.render('orders',{
        title: 'We are Working on It'
    })
})

module.exports = router;
