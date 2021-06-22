const path = require('path')
const express = require('express');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const route = require("./routes/protected/authenticate.js");


//PORT init
const PORT = 2000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))


// Express Session middleware
app.use(session({
    secret: 'secret',
    resave: true, 
    saveUninitialized: false
  }))

//Express messages Middleware to throw error messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express Validator-after body parser Middleware to validate HTML forms 
app.use(expressValidator({
    errorFormatter:function(param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        }
    }
}))

//custom developed modules - setting locals to use in frontend templates
app.locals.format = require("./routes/includes/format.js")



//init of global variable with null or username if logged in 
app.get('*', function(req, res, next){
    res.locals.session = req.session || null;
    res.locals.staffId = req.session.staffId || null;
    res.locals.companyId = req.comapnyId || null;
    res.locals.localUserInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
    res.locals.staffInfo = JSON.parse(localStorage.getItem('staffInfo')) || null;
    res.locals.customers = JSON.parse(localStorage.getItem('customers')) || null;
    next();
})

//start server and listening on PORT
app.listen(PORT, function(req, res){
    console.log(`server started on PORT: ${PORT}`)
})
//_______________________________________________________________________
//Load View Engine
app.set('views', [path.join(__dirname, 'frontend'), path.join(__dirname, 'frontend/locked'), 
path.join(__dirname, 'frontend/template'), path.join(__dirname, 'frontend/public'), 
path.join(__dirname, 'frontend/locked/features')]);
app.set('view engine', 'pug')

//HOME ROUTE //HOMEPAGE
app.get('/', function(req, res){
    res.render('index',{
        title:'Salesman Lab'
    })
})

//_____HOOKS______________________________________________
//Route Files 

//New user reg/log
const users = require('./routes/users.js');
app.use('/users', users)

//ABOUT US ROUTE
const about = require('./routes/public/about.js');
app.use('/', about)

//CONTACT US ROUTE
const contactus = require('./routes/public/contact.js');
app.use('/', contactus)

//____________________________________________________
//PROTECTED ROUTES
const dashboard = require('./routes/protected/dashboard.js');
app.use('/app', dashboard)


//Account Info page
const account = require('./routes/protected/account.js');
app.use('/app', account)


//manage cutomer page
const customers = require('./routes/protected/customers.js');
app.use('/app', customers)

const customer = require('./routes/protected/edit_customer.js');
app.use('/app', customer)

//add customer form
const add_customer = require('./routes/protected/add_customer');
app.use('/app', add_customer)

//manage staff page
const staff = require('./routes/protected/staff');
app.use('/app', staff)


const edit_staff = require('./routes/protected/edit_staff');
app.use('/app', edit_staff)

//add staff form
const add_staff = require('./routes/protected/add_staff.js');
app.use('/app', add_staff)
 
//products
const products = require('./routes/protected/products.js');
app.use('/app', products)

//categories
const categories = require('./routes/protected/categories.js');
app.use('/app', categories)

//add categories
const add_categories = require('./routes/protected/add_categories.js');
app.use('/app', add_categories)


//Orders
const orders = require('./routes/protected/orders.js');
app.use('/app', orders)


//Marketing
const marketing = require('./routes/protected/marketing.js');
app.use('/app', marketing)

//______________________________________________________________________
//CATCHING 404 Error
app.use(function(req, res, next) {
    const err = new Error('The Page you are looking for can\'t be found');
    err.status = 404;
    next(err);
  });


  // development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }
  
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });



 
