const knexConfig = require('./../knex_config');

function  getOrderDetails(orderId = 28) {
    return new Promise((resolve,reject) => {
        Promise.all([queryOrderTable(orderId), getOrderItems(orderId)]).then(values => {
            resolve({billingAddress:values[0].billingAddress,
                items:values[1]});
          });
    });
   
}

function queryOrderTable(orderId)
{
    var qryObj = knexConfig.select('o.id AS orderId','o.currency','o.currency_rate',
    'o.total','o.net','o.tax','o.courrier_fees','o.shipping',
    'o.success','o.void','o.refund',
    'o.created_at','o.updated_at',
    'ba.id AS billingAddressId'
    ).table('orders AS o').where('o.id','=',orderId)
    .join('billing_address AS ba', 'ba.id', 'o.billing_address_id')
   // console.log(qryObj.toSQL().toNative());
    
   return new Promise ((resolve,reject) => {
        qryObj.then(data => {
            console.log(data[0]);
            resolve({
                billingAddress: {id: data[0].billingAddressId}
            })
        })
    });

}

function  getOrderItems(orderId = 28) {
    var qryObj = knexConfig.select('p.id AS productId','oi.quantity').table('order_items AS oi')
    .join('products AS p', 'p.id', 'oi.product_id')
    .where('order_id','=',orderId);
    console.log(qryObj.toSQL().toNative());
    return qryObj;
}

module.exports = {getOrderDetails}