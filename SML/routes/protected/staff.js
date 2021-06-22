const express = require('express')
const router = express.Router();
const route = require("./authenticate.js");
var request = require('request');

router.get('/staff',route.requireLogin(), function(req, res){

    request.get({url:`http://localhost:4000/pms/staff/search/companyId/${req.session.companyId}`}, function(err, response, body){
        if(err){
            return console.log(err);    
        }
        else{ 
            
            var staffInfo = JSON.parse(response.body).response;
                if(staffInfo){
                    localStorage.setItem("staffInfo", JSON.stringify(staffInfo))
                }   
                res.render('staff',{
                    title: 'Manage Staff',
                    staffInfo:staffInfo
                })
        return
        }   
    })
})

module.exports = router;