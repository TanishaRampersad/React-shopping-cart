const express = require('express');
// const serverless = require('serverless-http');
const path = require('path');
const cors = require('cors'); // Import cors
const dotenv = require('dotenv'); //this helps us to store sensitive information


dotenv.config({ path: './.env' });


const app = express();

// Enable CORS for all routes
app.use(cors()); // This will allow all origins by default

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory)) //look into the public folder for all the css, js and other files

//this is so we can use HTML forms and stuff like that
app.use(express.urlencoded({extended: false})) //we can send data from the frontend to the backend
app.use(express.json()) //accept as json format

app.set('view engine', 'hbs') //the view engine we use is hbs instead of html. This connects to the Views folder.
app.set('views', path.join(__dirname, 'views'));

// app.get("/", (req, res) => {
//     res.render('index')
// });

// app.get("/cart", (req, res) => {
//     res.render('cart')
// });

app.use('/', require('./api/pages')); //any routes that start with "/" node.js will to go routes/pages
app.use('/products', require('./api/products'));
app.use('/checkout', require('./api/checkout'));


app.listen(5000, () => {
    console.log("Server is running on port 5000")
})