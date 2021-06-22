const express = require('express')
const router = express.Router();
const route = require("./authenticate.js");
var rp = require('request-promise');
const session = require('express-session')
var request = require('request');

router.get('/add/customer',route.requireLogin(), function(req, res){
    const staffInfo = JSON.parse(localStorage.getItem('staffInfo'))
                    res.render('add_customer',{
                    title: 'Add Customer',
                    staffInfo:staffInfo
                    })
                    return
})

router.post('/add/customer', route.requireLogin(), function(req, res){
    localUserInfo = JSON.parse(localStorage.getItem('userInfo'))
    staffInfo = JSON.parse(localStorage.getItem('staffInfo'))
    const companyId = req.body.companyId;
    const staffId = req.body.staffId;
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const phone = req.body.phone;
    const source = req.body.source;
    const status = req.body.status;
    const comment = req.body.comment;

  req.checkBody('name', 'Name is required').notEmpty()
  req.checkBody('phone', 'phone is required').notEmpty()
  req.checkBody('address', 'address is required').notEmpty()
  req.checkBody('email', 'email is required').notEmpty()
  req.checkBody('source', 'source is required').notEmpty()
  req.checkBody('email', 'email is not valid').isEmail()
  //req.checkBody('joiningDate', 'joiningDate is required').notEmpty()
  let errors = req.validationErrors();
  if(errors){
      res.render('add_customer', {
          email: req.session.email,
          errors:errors,
          title: "Add Customer"
      })
  }else{
     //Send the request to API 
     const customerData = { 
      "companyId": companyId,
      "staffId": staffId,
      "name": name,
      "email": email,
      "phone": phone, 
      "address":address,
      "comment": comment,
      "source": source,
      "status": status,
  }
     request.post({url:'http://localhost:4000/pms/customer/signUp', form: customerData}, function(err,httpResponse,body) {
      if(err) {
          console.error(err);
          res.status(500).json({
              message: "Entry not created in staff",
              errors: err,
              response: null
          });
      }
      else{
          req.flash('success', ' customer added Successfuly')
          res.redirect('/app/customers')
      }
  });
  
  }
})




module.exports = router;