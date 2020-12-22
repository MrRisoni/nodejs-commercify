const knexConfig = require('./../knex_config');

function  getBoughtWith() {

    console.log(knexConfig
        .select('oi2.PRODUCT_ID', 'p.TITLE','p.THUMBNAIL')
        .from('ORDER_ITEMS AS oi2')
        .join('PRODUCTS AS p', 'p.ID', 'oi2.PRODUCT_ID')
        .join('ORDER_ITEMS AS oi1', 'oi1.ORDER_ID', 'oi2.ORDER_ID')
        .select('oi2.PRODUCT_ID', 'p.TITLE')
        .where('oi1.PRODUCT_ID', '=', 1)
        .where('oi2.PRODUCT_ID', '!=', 1)
        .groupBy('oi2.PRODUCT_ID')
        .orderByRaw(' COUNT(oi2.ID) DESC').toSQL().toNative());

    return knexConfig
    .select('oi2.product_id', 'p.title','p.thumbnail_url')
    .from('order_items AS oi2')
    .join('products AS p', 'p.id', 'oi2.product_id')
    .join('order_items AS oi1', 'oi1.order_id', 'oi2.order_id')
    .select('oi2.product_id', 'p.TITLE')
    .where('oi1.product_id', '=', 1)
    .where('oi2.product_id', '!=', 1)
    .groupBy('oi2.product_id')
    .orderByRaw(' COUNT(oi2.id) DESC');
}

module.exports = {getBoughtWith}
