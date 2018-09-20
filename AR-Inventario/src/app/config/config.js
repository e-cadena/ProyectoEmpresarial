const Sequelize = require('sequelize');
const sequelize = new Sequelize('Inventario', 'postgres', '1234', {
  host: '192.168.7.133',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
