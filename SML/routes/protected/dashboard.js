const express = require('express')
const router = express.Router();
const route = require("./authenticate.js");

router.get('/dashboard', route.requireLogin(), function(req, res){
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    res.render('dashboard',{
        title: 'Dashboard | Salesman Lab' 
    })
    return
})

module.exports = router;