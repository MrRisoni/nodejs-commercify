const knexConfig = require('./../knex_config');

function  getOrderDetails(orderId = 28) {
    return new Promise((resolve,reject) => {
        Promise.all([queryOrderTable(orderId), getOrderItems(orderId)]).then(values => {
            resolve({order:values[0],
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
    'ba.id AS billingAddressId','ba.country_code AS billCountryCode',
    'ba.city AS billCity','ba.full_name AS billFullName','ba.address AS billAddress',
    '.ba.street_no AS billStreetNo','ba.post_code AS billPostCode',
    'ba.contact_mobile AS billContactMobile'
    ).table('orders AS o').where('o.id','=',orderId)
    .join('billing_address AS ba', 'ba.id', 'o.billing_address_id')
   // console.log(qryObj.toSQL().toNative());
    
   return new Promise ((resolve,reject) => {
        qryObj.then(data => {
            console.log(data[0]);
            resolve({
                billingAddress: {
                    id: data[0].billingAddressId,
                    billCountryCode: data[0].billCountryCode,
                    billContactMobile: data[0].billContactMobile,
                    billCity: data[0].billCity,
                    billFullName: data[0].billFullName,
                    billAddress: data[0].billAddress,
                    billStreetNo: data[0].billStreetNo,
                    billPostCode: data[0].billPostCode,

                },
                details: {id: data[0].orderId, 
                    currency: data[0].currency,
                    currency_rate: data[0].currency_rate,
                    total: data[0].total,
                    net: data[0].net,
                    tax: data[0].tax,
                    courrier_fees: data[0].courrier_fees,
                    shipping: data[0].shipping,
                    success: data[0].success,
                    void: data[0].void,
                    refund: data[0].refund,
                    created_at: data[0].created_at,
                    updated_at: data[0].updated_at,

                }
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