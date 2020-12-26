const express = require('express')
let router = express.Router()

const browse_controller = require('./../controllers/browse_controller');
const product_controller = require('./../controllers/product_controller');

router.get('/api/products/bought_with/:productId', browse_controller.getBoughtWith);
router.get('/api/products/:productId', product_controller.getProductDetails);

router.get("/version", (req, res) => {
    res.send('1.45!');
  });

module.exports = router;
