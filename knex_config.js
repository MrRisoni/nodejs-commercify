var MYSQL_NAME = process.env.SPRING_APP_DB_ECOMMERCE_USR;
var MYSQL_PASSWD = process.env.SPRING_APP_DB_ECOMMERCE_PASSWD;
var MYSQL_HOST = process.env.SPRING_APP_DB_ECOMMERCE_HOST;
var MYSQL_DB= process.env.SPRING_APP_DB_ECOMMERCE_NAME;

knex = require('knex')({
  client: 'mysql',
  connection: {
    host : MYSQL_HOST,
    user : MYSQL_NAME,
    password : MYSQL_PASSWD,
    database : MYSQL_DB
  }
});


module.exports = knex
