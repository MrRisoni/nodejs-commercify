const express = require('express')
let router = express.Router()

const browse_controller = require('./../controllers/browse_controller');

router.get('/api/products/bought_with/:productId', browse_controller.getBoughtWith);

router.get("/version", (req, res) => {
    res.send('1.45!');
  });

module.exports = router;
