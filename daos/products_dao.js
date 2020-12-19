function  getBoughtWith(knexObj) {
    return knexObj
    .select('oi2.PRODUCT_ID', 'p.TITLE','p.THUMBNAIL')
    .from('ORDER_ITEMS AS oi2')
    .join('PRODUCTS AS p', 'p.ID', 'oi2.PRODUCT_ID')
    .join('ORDER_ITEMS AS oi1', 'oi1.ORDER_ID', 'oi2.ORDER_ID')
    .select('oi2.PRODUCT_ID', 'p.TITLE')
    .where('oi1.PRODUCT_ID', '=', 1)
    .where('oi2.PRODUCT_ID', '!=', 1)
    .whereRaw(' ROWNUM < 3 ')
    .groupBy('oi2.PRODUCT_ID','p.TITLE','p.THUMBNAIL')
    .orderByRaw(' COUNT("oi2"."ID") DESC');
}

module.exports = {getBoughtWith}
