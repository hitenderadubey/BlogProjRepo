require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const connectDB = require('./server/config/db');

const app = express();
const port = 3000 || process.env.port;

//connect to DB
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

//templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.listen(port, () =>{
    console.log(`App listending on port ${port}`);
});