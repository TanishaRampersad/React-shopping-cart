const express = require('express');
const path = require('path');

const app = express();

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory)) //look into the public folder for all the css, js and other files


app.set('view engine', 'hbs') //the view engine we use is hbs instead of html. This connects to the Views folder.


// app.get("/", (req, res) => {
//     res.render('index')
// });

// app.get("/cart", (req, res) => {
//     res.render('cart')
// });

app.use('/', require('./routes/pages')); //any routes that start with "/" node.js will to go routes/pages

app.use('/products', require('./routes/products'));


app.listen(5000, () => {
    console.log("Server is running on port 5000")
})