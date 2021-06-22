const express = require('express')
const router = express.Router();
const route = require("./authenticate.js");
var request = require('request');

//getting single customer
router.get('/customer/:id', route.requireLogin(), function(req, res){
    const staffInfo = JSON.parse(localStorage.getItem('staffInfo'))
    const customers = JSON.parse(localStorage.getItem('customers'))
    const customer = customers.filter(customer =>customer.customerId == req.params.id)
    console.log(customer[0])
    res.render('edit_customer', {
        staffInfo:staffInfo,
        customer:customer[0]
    })
    
})

router.post('/customer/:id', route.requireLogin(), function(req, res){
    const companyId = req.body.companyId;
    const staffId = req.body.staffId;
    const name = req.body.name;
    const customerId = req.params.id;
    const email = req.body.email;
    const address = req.body.address;
    const phone = req.body.phone;
    const source = req.body.source;
    const status = req.body.status;
    const comment = req.body.comment;

  req.checkBody('name', 'Name is required').notEmpty()
  req.checkBody('address', 'address is required').notEmpty()
  req.checkBody('phone', 'phone is required').notEmpty()
  req.checkBody('address', 'address is required').notEmpty()
  req.checkBody('email', 'email is required').notEmpty()
  req.checkBody('source', 'source is required').notEmpty()
  req.checkBody('email', 'email is not valid').isEmail()
  //req.checkBody('joiningDate', 'joiningDate is required').notEmpty()
  let errors = req.validationErrors();
  if(errors){
      res.render('add_customer', {
          user: req.session.user,
          errors:errors,
          title: "Add Customer"
      })
  }else{
     //Send the request to API 
     const customerData = { 
      "companyId": companyId,
      "staffId": staffId,
      "customerId": customerId, 
      "name": name,
      "email": email,
      "phone": phone, 
      "address":address,
      "comment": comment,
      "source": source,
      "status": status
  }
     request.patch({url:'http://localhost:4000/pms/customer/update', form: customerData}, function(err,httpResponse,body) {
      if(err) {
          console.error(err);
          res.status(500).json({
              message: "Entry not created in staff",
              errors: err,
              response: null
          });
      }
      else{
          req.flash('success', ' customer updated')
          res.redirect('/app/customers')
      }
  });
  
  }
})

module.exports = router;