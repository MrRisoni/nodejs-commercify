const knexConfig = require('./../knex_config');

function  getBoughtWith(productId = 4408) {

    var qryObj = knexConfig
    .select('oi2.product_id', 'p.title','p.thumbnail_url')
    .from('order_items AS oi2')
    .join('products AS p', 'p.id', 'oi2.product_id')
    .join('order_items AS oi1', 'oi1.order_id', 'oi2.order_id')
    .where('oi1.product_id', '=', productId)
    .where('oi2.product_id', '!=', productId)
    .groupBy('oi2.product_id')
    .orderByRaw(' COUNT(oi2.id) DESC');

    console.log(qryObj.toSQL().toNative());

    return knexConfig.raw('CALL FrequentlyBoughtWith (?)', [productId])
}

module.exports = {getBoughtWith}
