//we created routes folder in case our project has many routes to keep track of in the server.js

const express = require('express');
//const serverless = require('serverless-http');
const { homeCtrlFunction, cartCtrlFunction } = require('../controllers/pagesCtrlFile');


const router = express.Router();

router.get('/', homeCtrlFunction)
router.get('/cart', cartCtrlFunction)




module.exports = router; //exports the function