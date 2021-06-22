const express = require('express')
const router = express.Router();
const route = require("./authenticate.js");
var request = require('request');


router.get('/categories',route.requireLogin(), function(req, res){
    res.render('categories',{
        title: 'Manage categories'
    })
})

module.exports = router;
