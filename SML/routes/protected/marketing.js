const express = require('express')
const router = express.Router();
const route = require("./authenticate.js");
var request = require('request');


router.get('/marketing',route.requireLogin(), function(req, res){
    res.render('marketing',{
        title: 'We are Working on It'
    })
})

module.exports = router;
