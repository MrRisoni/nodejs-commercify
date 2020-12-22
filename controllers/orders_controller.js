const OrdersDAO = require('../daos/orders_dao.js');

function getOrderDetails(req, res) {
   console.log('params ' + req.params.orderId);
   OrdersDAO.getOrderDetails(req.params.orderId).then(data => {
    res.send(data);
   }).catch(err => {
      res.sendStatus(404);
   })
}

module.exports = {getOrderDetails}
