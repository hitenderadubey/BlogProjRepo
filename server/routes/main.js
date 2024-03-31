const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const Post = require('../models/post');

//routes Get, Home
router.get('', async (req, res)=>{
    try{
        const locals = {
            title: "NodeJs Blog",
            description: "Simple Blog created with NodeJs"
        }

        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: {createdAt: -1}}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.count;
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count/perPage);

        res.render(
            'index', {
                locals, 
                data,
                current: page,
                nextPage: hasNextPage ? nextPage : null
            });

    } catch(error) {
        console.log(error);
    }
});

//routes Get, post id
router.get('/post/:id', async (req, res)=>{
    try{
        let slug = req.params.id;
       //console.log(`printing the id for blog ${slug}`);
        const data = await Post.findById({_id:slug});

        const locals = {
            title: data.title,
            description: "Simple Blog created with NodeJs"
        };

        //console.log(`testing data print ${data}`)
        res.render('post', {locals, data});
    } catch(error) {
        console.log(error);
    }
});

//post search
//routes Get, post id
router.post('/search', async (req, res)=>{
    try{
            const locals = {
            title: "Search",
            description: "Simple Blog created with NodeJs"
        };
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

        const data = await Post.find({
            $or:[
                { title: {$regex: new RegExp(searchNoSpecialChar, 'i')}},
                { body: {$regex: new RegExp(searchNoSpecialChar, 'i')}}
            ]
        })

        res.render("searchp", {
            data,
            locals
        }); 

    } catch(error) {
        console.log(error);
    }
});


router.get('/about', (req, res) => {
    res.render('about');
})

module.exports = router;


//insert post data
// function insertPostData(){
//     Post.insertMany([
//         {
//             title: "Building a blog1",
//             body: "This is body of my blog"
//         },
//         {
//             title: "Building a blog1",
//             body: "This is body of my blog"
//         },
//         {
//             title: "Building a blog1",
//             body: "This is body of my blog"
//         },
//         {
//             title: "Building a blog1",
//             body: "This is body of my blog"
//         },
//     ])
// }
// insertPostData();