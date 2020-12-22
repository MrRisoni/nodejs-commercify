const ProductDAO = require('../daos/products_dao.js');

function getBoughtWith(req, res) {
   console.log('params ' + req.params.productId);
   ProductDAO.getBoughtWith(req.params.productId).then(data => {
    res.send(data);
   }).catch(err => {
      res.sendStatus(404);
   })
}

module.exports = {getBoughtWith}
