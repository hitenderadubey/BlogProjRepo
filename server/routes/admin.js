const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');

const adminLayout = '../views/layouts/admin';

router.get('/admin', async (req, res)=>{
    try{
        const locals = {
            title: "Admin",
            description: "Simple Blog created with NodeJs"
        };

        //console.log(`testing data print ${data}`)
        res.render('admin/index', {locals, layout: adminLayout});
    } catch(error) {
        console.log(error);
    }
});

/* Post, admin check - login */
router.post('/admin', async (req, res)=>{
    try{
        const {username, password} = req.body;
        
        if(req.body.username === 'admin' && req.body.password === 'password'){
            res.redirect('/');
        } else {
            res.send('wrong username or password') ;
        }
        res.redirect('/admin');
        //res.render('admin/index', {locals, layout: adminLayout});
    } catch(error) {
        console.log(error);
    }
});

module.exports = router;