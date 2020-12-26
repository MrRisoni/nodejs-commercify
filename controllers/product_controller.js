const ProductDAO = require('../daos/products_dao.js');

function getProductDetails(req, res) {
   ProductDAO.getProduct(req.params.productId).then(data => {
    res.send(data);
   }).catch(err => {
      console.log(err);
      res.sendStatus(500);
   })
}

module.exports = {getProductDetails}
