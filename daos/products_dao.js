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

function getProduct(productId = 4408)
{
    var productQry = knexConfig.select('p.*','pc.title AS catTitle','sh.id AS shopId',
    'sh.title AS shopTitle','m.title AS manufacturer')
    .from('products AS p')
    .join('product_categories AS pc', 'pc.id', 'p.category_id')
    .join('shop_manufacturers AS m', 'm.id', 'p.manufacturer_id')
    .join('shops AS sh', 'sh.id', 'p.shop_id')
    .where('p.id', '=', productId)

    var reviewsQry = knexConfig.select('r.stars','r.created','r.comment','u.username')
    .from('product_reviews AS r')
    .join('users AS u', 'u.id', 'r.user_id')
    .where('r.product_id', '=', productId)
    .orderBy('r.created','desc');

    var galleryQry = knexConfig.select('g.*')
    .from('product_gallery AS g')
    .where('g.product_id', '=', productId)


    return new Promise((resolve,reject) => {
        Promise.all([productQry, reviewsQry, galleryQry]).then(values => {
            resolve({product:values[0],
                review:values[1],
                gallery:values[2]

            });
          });
    });
    
}

module.exports = {getBoughtWith,getProduct}
