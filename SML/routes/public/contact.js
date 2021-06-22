const express = require('express')
const router = express.Router();


router.get('/contactus', function(req, res){
    res.render('contact',{
        title:'Contact us'
    })
    return
})

module.exports = router;