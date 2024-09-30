//we created routes folder in case our project has many routes to keep track of in the server.js

const express = require('express');
const { productsCtrlFunction } = require('../controllers/productsCtrlFile');


const router = express.Router();

router.get('/', productsCtrlFunction)




module.exports = router; //exports the function