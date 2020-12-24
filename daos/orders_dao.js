const knexConfig = require('./../knex_config');

function  getOrderDetails(orderId = 28) {
    return new Promise((resolve,reject) => {
        Promise.all([queryOrderTable(orderId), getOrderItems(orderId),
            getOrderHistory(orderId),
            getOrderItemHistory(orderId)]).then(values => {
            resolve({order:values[0],
                items:values[1],
                orderHistory:values[2],
                orderItemHistory:values[3]

            });
          });
    });
   
}

function getOrderHistory(orderId)
{
    var qryObj = knexConfig.select('osh.created_at','os.title')
    .table('orders_status_history AS osh').where('osh.order_id','=',orderId)
    .join('order_status AS os', 'os.id', 'osh.status_id')
    .orderBy('osh.created_at', 'desc')

    return qryObj;
}

function getOrderItemHistory(orderId)
{
    var qryObj = knexConfig.select('oish.item_id','oish.created_at','os.title')
    .table('order_items_status_history AS oish')
    .join('order_status AS os', 'os.id', 'oish.status_id')
    .join('order_items AS oi', 'oi.id', 'oish.item_id')
    .where('oi.order_id','=',orderId)
    .orderBy('oish.item_id', 'desc')
    .orderBy('oish.created_at', 'desc')

    return qryObj;
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
    'ba.contact_mobile AS billContactMobile',
    'sa.id AS shippingAddressId','sa.country_code AS shippCountryCode',
    'sa.city AS shipCity','sa.full_name AS shipFullName','sa.address AS shipAddress',
    '.sa.street_no AS shipStreetNo','ba.post_code AS shipPostCode',
    'sa.contact_mobile AS shipContactMobile',
    'shops.id AS shopId','shops.title AS shopTitle',
    'order_status.title AS statusTitle',
    'payment_methods.title AS payMethodTitle',
    'bank.transaction_id','bank.card_type','bank.transaction_id')
    .table('orders AS o').where('o.id','=',orderId)
    .join('billing_address AS ba', 'ba.id', 'o.billing_address_id')
    .join('shipping_address AS sa', 'sa.id', 'o.shipping_address_id')
    .join('shops', 'shops.id', 'o.shop_id')
    .join('order_status', 'order_status.id', 'o.status_id')
    .join('payment_methods', 'payment_methods.id', 'o.pay_method_id')
    .leftJoin('bank_transactions AS bank', 'bank.order_id', 'o.id')

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
                shop :{
                    id: data[0].shopId,
                    title: data[0].shopTitle
                },
                status: {
                    title:  data[0].statusTitle
                },
                payMethod: {
                    title:  data[0].payMethodTitle
                },
                bankData: {
                    transactionId : data[0].transaction_id
                },
                shippingAddress: {
                    id: data[0].shippingAddressId,
                    shippCountryCode: data[0].shippCountryCode,
                    shipContactMobile: data[0].shipContactMobile,
                    shipCity: data[0].shipCity,
                    shipFullName: data[0].shipFullName,
                    billAddress: data[0].shipAddress,
                    shipStreetNo: data[0].shipStreetNo,
                    shipPostCode: data[0].shipPostCode,
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