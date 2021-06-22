const express = require('express')
const session = require('express-session')
const router = express.Router();

module.exports = {
    
    
        Date(timestamp){
                var a = new Date(timestamp*1);
                        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                        var year = a.getFullYear();
                        var month = months[a.getMonth()];
                        var date = a.getDate();
                        var time = date + ' ' + month + ' ' + year;
                        return time;
        }
} 