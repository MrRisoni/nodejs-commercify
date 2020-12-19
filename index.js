
var DB_HOST = process.env.ORACLE_URL;
var DB_PORT = process.env.ORACLE_DB_PORT;
var DB_NAME = process.env.ORACLE_ECOMMERCE_SCHEMA;
var DB_SID = process.env.ORACLE_DB_SID;
var DB_PASSWD = process.env.ORACLE_PASSWD;

console.log(DB_HOST);
console.log(DB_PORT);
console.log(DB_NAME);
console.log(DB_SID);
console.log(DB_PASSWD);

var knex = require('knex')({
  client: 'oracledb',
  connection: {
        connectString:"(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host="+DB_HOST+")(Port="+DB_PORT+"))(CONNECT_DATA=(SID=XE)))",

    user : 'ECOMMERCE',
    password : DB_PASSWD
  }
});

/*
  String sql = " SELECT oi2.PRODUCT_ID ,p.TITLE,p.THUMBNAIL " +
                    " FROM ORDER_ITEMS oi2  " +
                    " JOIN ORDER_ITEMS oi1 ON oi1.ORDER_ID = oi2.ORDER_ID   " +
                    " JOIN PRODUCTS p ON p.ID = oi2.PRODUCT_ID   " +
                    " WHERE  oi1.PRODUCT_ID = 1   " +
                    " AND oi2.PRODUCT_ID != 1 AND ROWNUM <= 3  " + 
                    " GROUP BY  oi2.PRODUCT_ID,p.TITLE,p.THUMBNAIL " +
                    " ORDER BY COUNT(oi2.ID) DESC";*/
/*
knex.select().table('PRODUCTS')
.then(data => console.log(data));

*/

knex('ORDER_ITEMS AS oi2')
.select('oi2.PRODUCT_ID', 'p.TITLE')
  .join('PRODUCTS AS p', 'p.ID', 'oi2.PRODUCT_ID')
  .join('ORDER_ITEMS AS oi1', 'oi1.ORDER_ID', 'oi2.ORDER_ID')
  .select('oi2.PRODUCT_ID', 'p.TITLE')
  .where('oi1.PRODUCT_ID', '=', 1)
  .where('oi2.PRODUCT_ID', '!=', 1)
  .groupBy('oi2.PRODUCT_ID','p.TITLE')
  .then(data => console.log(data));
