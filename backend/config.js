
const Sequalize = require('sequelize');
const config = new Sequalize("sapphireusers","root","stupidpassword",{dialect: 'mysql'});

module.exports = config;