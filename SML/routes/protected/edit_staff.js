const express = require('express')
const router = express.Router();
const route = require("./authenticate.js");
var request = require('request');

router.get('/staff/:id', route.requireLogin(), function(req, res){
    const staffInfo = JSON.parse(localStorage.getItem('staffInfo'))
    staff = staffInfo.find(x=>x.staffId== req.params.id)
    res.render('account', {
        title: 'Edit Staff',
        userInfo: staff
    })

})

module.exports = router;