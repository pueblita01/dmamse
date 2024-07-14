const express = require('express');
var Sequelize = require('sequelize');
bodyParser = require("body-parser");
cors = require("cors")
var path = require("path");
var debug = require('debug')('express-sequelize');
const { sequelize } = require('./SequelizeConnection');
const server = express();

server.use(cors());
server.use(bodyParser.json());
// server.use(require('./RoutesPedidosCliente/routes.js'));
server.set('port', process.env.PORT || 8283);

server.get("/", (req, res) => res.send('APP UP'));

sequelize.sync()
  .then(() => {
    server.listen(server.get('port'), () => {
      debug(`Express listening on port ${server.get('port')}`);
    })
  });

exports.server = server