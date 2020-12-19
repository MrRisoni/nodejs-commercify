const port = process.env.PORT || 3500;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');

const browse_controller = require('./controllers/browse_controller');


app.use(bodyParser.json());
app.use(cors());

const knexConfig = require('./knex_config');

const bCtrl = new browse_controller(knexConfig);


app.get('/api/products/bought_with', (req, res) => {

    bCtrl.getBoughtWith(req.body).then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    });

});



http.listen(port, (req, res) => {
    console.log('Server listening on port number', port);
});




module.exports = {
    serverApp: app
};

