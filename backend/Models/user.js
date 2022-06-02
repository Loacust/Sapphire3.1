
const Sequalize = require('sequelize');
const config = require('../config')


const User =config.define('user', {
    email: {
        type: Sequalize.STRING,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: Sequalize.STRING,
        allowNull: false

    },
    lastname: {
        type: Sequalize.STRING,
        allowNull: false
    },
    password: {
        type: Sequalize.STRING,
        allowNull: false
    }
},{timestamps:false});

module.exports = User;
