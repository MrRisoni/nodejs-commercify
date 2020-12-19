const ProductDAO = require('../daos/products_dao.js');

module.exports =

    class browse_controller {

        constructor(knex) {
            this.knexObj = knex;
        }

        getBoughtWith() {
            const self = this;
            return ProductDAO.getBoughtWith(self.knexObj);
        }
    }
