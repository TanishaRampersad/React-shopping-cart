//we created routes/api folder in case our project has many routes to keep track of in the server.js

const express = require('express');
//const serverless = require('serverless-http');
const { checkoutCtrlFunction, cartSuccessFunction } = require('../controllers/checkoutCtrlFile');


const router = express.Router();

router.post('/', checkoutCtrlFunction)
router.get('/success', cartSuccessFunction)




module.exports = router; //exports the function