const express = require('express')
const router = express.Router();


router.get('/aboutus', function(req, res){
    res.render('about',{
        title:'About us'
    })
    return
})

module.exports = router;