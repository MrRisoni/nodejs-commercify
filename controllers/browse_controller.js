const ProductDAO = require('../daos/products_dao.js');

function getBoughtWith(knexObj) {
 return ProductDAO.getBoughtWith(knexObj);
}

module.exports = {getBoughtWith}
