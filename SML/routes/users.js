const express = require('express')
const router = express.Router();
var request = require('request');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const passport = require('passport')
var rp = require('request-promise');
const session = require('express-session')

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

router.get('/register', function(req, res){
    res.render('register', {
        title:'sign up'
    })
})

router.post('/register', function(req, res){
      const username = req.body.username;
      const company = req.body.company;
      const phone = req.body.phone;
      const email = req.body.email;
      const password = req.body.password;
      const cpassword = req.body.cpassword;
    req.checkBody('company', 'Company Name is required').notEmpty()
    req.checkBody('username', 'Name is required').notEmpty()
    req.checkBody('email', 'email is required').notEmpty()
    req.checkBody('email', 'email is not valid').isEmail()
    req.checkBody('password', 'Password is required').notEmpty()
    req.checkBody('cpassword', 'Passwords do not match').equals(req.body.password)
    let errors = req.validationErrors();
    if(errors){
        res.render('register', {
            user: req.session.user,
            errors:errors,
            title: "Sign up"
        })
    }else{
       //Send the request to API 
       const userData = {
        "companyName": company,
        "email": email,
        "password": password,
        "owner": username,
        "phone": phone
    }

    console.log(userData)
       request.post({url:'http://localhost:4000/pms/company/signUp', form: userData}, function(err,httpResponse,body) {
        if(err) {
            console.error(err);
            res.status(500).json({
                message: "Entry not created in customer",
                errors: err,
                response: null
            });
        }
        else{
            req.flash('success', 'Successfuly registered logged in to start using the APP')
            res.redirect('/users/login')
        }
    });
    
    }
})


router.get('/login', function(req, res){
    res.render('login',{
        title: 'Login'
    })
    return
});


router.post('/login', function(req, res){
    rp({
        method: 'POST',
        uri: 'http://localhost:3000/login/signIn', 
        body: {
            email : req.body.email,
            password:req.body.password
        },
        json: true // Automatically stringifies the body to JSON
    }).then(function (resBody) {
        // POST succeeded...
        if(resBody.response != null){
                var token = resBody.response.token
                res.cookie("token", resBody.response.token,  { maxAge: 900000, httpOnly: true} )
                jwt.verify(token, 'sml_private_token', function(err, decode){
                    req.session.staffId = decode.staffId
                    //querry with email id encodeURI
                    req.session.companyId = decode.companyId
                    request.get({url:`http://localhost:4000/pms/staff/search/staffId/`+req.session.staffId}, function(err, response, body){
                        if(err){
                            return console.log(err);    
                        }
                        if(response.body!== null){
                                var userInfo = JSON.parse(response.body).response[0];
                                if(userInfo){
                                    request.get({url:`http://localhost:4000/pms/customer/search/companyId/${userInfo.companyId}`}, function(err, response, body){
                                        if(err){
                                                return console.log(err);    
                                                }
                                        else{   
                                            var customers = JSON.parse(response.body).response;
                                            if(customers){
                                                localStorage.setItem("customers", JSON.stringify(customers))
                                            }
                                    request.get({url:`http://localhost:4000/pms/staff/search/companyId/${userInfo.companyId}`}, function(err, response, body){
                                        if(err){
                                            return console.log(err);    
                                        }
                                        else{
                                            var staffInfo = JSON.parse(response.body).response;
                                            if(staffInfo){
                                                localStorage.setItem("staffInfo", JSON.stringify(staffInfo))
                                            }   
                                        }
                                            localStorage.setItem("userInfo", JSON.stringify(userInfo)) 
                                            req.flash('success', 'Successfuly logged in')
                                            res.redirect('/app/dashboard')
                                        })
                                    }
                                })
                                }
                                else{
                                    req.flash('danger', 'Contact support')
                                    res.redirect('/users/login') 
                                }
                                
                        }
                        else{
                            console.log('No user found')
                        }
                    })
                })
            }   
        })
        .catch(function (err) {
                req.flash('danger', `Try again -  ${err.error.errors}`)    
                res.render('login', {
                    title: "Login"
                })
        });
    })

//logout
router.get('/logout', function(req, res){
    res.clearCookie("token")
    req.flash('success', 'Successfully logged out')
    res.redirect('/users/login')
    req.session.destroy();
    localStorage.clear();
})

module.exports = router;