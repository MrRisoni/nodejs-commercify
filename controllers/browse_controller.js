const ProductDAO = require('../daos/products_dao.js');

function getBoughtWith(req, res) {
   ProductDAO.getBoughtWith().then(data => {
    res.send(data);
   }
       
   );
}

module.exports = {getBoughtWith}
