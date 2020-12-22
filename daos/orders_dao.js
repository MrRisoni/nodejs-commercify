const knexConfig = require('./../knex_config');

function  getOrderDetails(orderId = 28) {
    var qryObj = knexConfig.select().table('orders').where('id','=',orderId);
    console.log(qryObj.toSQL().toNative());
    return qryObj;
}

module.exports = {getOrderDetails}