const express = require('express')
const router = express.Router();
const route = require("./authenticate.js");
var request = require('request');

router.get('/add/staff',route.requireLogin(), function(req, res){
    res.render('add_staff',{
        title: 'Add staff'
    })
    return
})


router.post('/add/staff', route.requireLogin(), function(req, res){
    localUserInfo = JSON.parse(localStorage.getItem('userInfo'))
    const companyId = localUserInfo.companyId;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const position = req.body.position;
    const password = req.body.password;
    const cpassword = req.body.cpassword;

  req.checkBody('name', 'Name is required').notEmpty()
  req.checkBody('phone', 'phone is required').notEmpty()
  req.checkBody('email', 'email is required').notEmpty()
  req.checkBody('position', 'source is required').notEmpty()
  req.checkBody('email', 'email is not valid').isEmail()
  req.checkBody('password', 'Password is required').notEmpty()
  req.checkBody('cpassword', 'Passwords do not match').equals(req.body.password)
  //req.checkBody('joiningDate', 'joiningDate is required').notEmpty()
  let errors = req.validationErrors();
  if(errors){
      res.render('add_staff', {
          email: req.session.email,
          errors:errors,
          title: "Add Staff"
      })
  }else{
     //Send the request to API 
     const userData = { 
      "companyId": companyId,
      "name": name,
      "email": email,
      "phone": phone, 
      "position": position,
      "password": password,
  }
     request.post({url:'http://localhost:4000/pms/staff/signUp', form: userData}, function(err,httpResponse,body) {
      if(err) {
          console.error(err);
          res.status(500).json({
              message: "Entry not created in staff",
              errors: err,
              response: null
          });
      }
      else{
          req.flash('success', ' staff added Successfuly')
          res.redirect('/app/staff')
      }
  });
  }
})


module.exports = router;