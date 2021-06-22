const express = require('express')
const router = express.Router();
const route = require("./authenticate.js");
var request = require('request');

router.get('/customers',route.requireLogin(), function(req, res){
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const customers = JSON.parse(localStorage.getItem('customers'))

    request.get({url:`http://localhost:4000/pms/customer/search/companyId/${userInfo.companyId}`}, function(err, response, body){
                                        if(err){
                                                return console.log(err);    
                                                }
                                        else{   
                                            var customers = JSON.parse(response.body).response;
                                            customers.sort(function(a, b){
                                                    return b.joiningDate - a.joiningDate;
                                                })
                                            //yearly customer        
                                            customers.filter(x=>x.joiningDate> (new Date).getTime() -3.154e+10)
                                            if(customers){
                                                localStorage.setItem("customers", JSON.stringify(customers))
                                            }
                                        }
                                        res.render('customers',{
                                            title: 'Manage Customer',
                                            customers:customers
                                        })
                                    })
    return
})
    

module.exports = router;