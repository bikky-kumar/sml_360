const express = require('express')
const router = express.Router();
const route = require("./authenticate.js");
var request = require('request');

router.get('/account', route.requireLogin(), function(req, res){
    request.get({url:`http://localhost:4000/pms/staff/search/staffId/`+req.session.staffId}, function(err, response, body){
        if(err){
            return console.log(err);    
        }
        else{
            var userInfo = JSON.parse(response.body).response[0];
            localStorage.setItem("userInfo", JSON.stringify(userInfo))
            res.render('account',{
                title: 'Account overview',
                userInfo: userInfo
            })
        }
    })
    return
})



router.post('/account/:id', route.requireLogin(), function(req, res){
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const staffId =  req.params.id
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const phone = req.body.phone;
    const position = req.body.position;
    const department = req.body.department;

    req.checkBody('name', 'Name is required').notEmpty()
    req.checkBody('address', 'address is required').notEmpty()
    req.checkBody('phone', 'phone is required').notEmpty()
    req.checkBody('address', 'address is required').notEmpty()
    req.checkBody('email', 'email is required').notEmpty()

    let errors = req.validationErrors();
    if(errors){
        res.render('add_customer', {
            user: req.session.user,
            errors:errors,
            title: "Add Customer"
        })
    }else{
       //Send the request to API 
       const userData = { 
        "staffId": staffId,
        "name": name,
        "email": email,
        "phone": phone, 
        "address":address,
        "position": position,
        "department": department
    }
       request.patch({url:'http://localhost:4000/pms/staff/update', form: userData}, function(err,httpResponse,body) {
        if(err) {
            console.error(err);
            res.status(500).json({
                message: "Entry not updated in staff",
                errors: err,
                response: null
            });
        }
        else{
                    req.flash('success', ' Account details updated - Refresh the page')
                    res.redirect('/app/staff') 
        }
    });
    }
    return
})

module.exports = router;