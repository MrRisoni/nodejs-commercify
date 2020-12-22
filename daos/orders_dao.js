const knexConfig = require('./../knex_config');

function  getOrderDetails(orderId = 28) {
    return new Promise((resolve,reject) => {
        Promise.all([queryOrderTable(orderId), getOrderItems(orderId)]).then(values => {
            resolve({order:values[0],items:values[1]});
          });
    });
   
}

function queryOrderTable(orderId)
{
    var qryObj = knexConfig.select().table('orders').where('id','=',orderId);
    console.log(qryObj.toSQL().toNative());
    return qryObj;
}

function  getOrderItems(orderId = 28) {
    var qryObj = knexConfig.select().table('order_items').where('order_id','=',orderId);
    console.log(qryObj.toSQL().toNative());
    return qryObj;
}

module.exports = {getOrderDetails}