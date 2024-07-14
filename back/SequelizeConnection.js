"use strict";
require("dotenv").config();
const timezone = 'America/Argentina/Buenos_Aires';
require('moment').tz.setDefault(timezone)

const Sequelize = require("sequelize");

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: "false",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

    tableOptions: {
      ENGINE: 'innodb',
    },
    timezone: timezone


  });

const models = {};
models.Sequelize = Sequelize;
models.sequelize = sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log("BD_CONECTADA!!");
  })
  .catch((err) => {
    console.error("ERROR,_BD_NO_CONECTADA:", err);
  });

sequelize.sync()
// sequelize.sync({ force: true })
  .then(() => {
    console.log(`Base de datos y tablas creadas, modelos sincronizados!`);
  });

module.exports = {
  models,
  sequelize,
};