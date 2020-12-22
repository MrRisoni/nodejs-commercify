const express = require('express')
let router = express.Router()

const orders_controller = require('./../controllers/orders_controller');

router.get('/api/orders/:orderId', orders_controller.getOrderDetails);

module.exports = router;
