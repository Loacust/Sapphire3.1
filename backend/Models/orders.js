const Sequalize = require('sequelize');
const config = require('../config')


const UserOrders=config.define('userorder', {
 
     email: {
        type: Sequalize.STRING,
        allowNull: false,
        primaryKey: true
        
    },
    photoid: {
        type: Sequalize.STRING,
        allowNull: false,
        
    },
    quantity:{
        type: Sequalize.STRING,
        allowNull:false
    },
    size:{
        type: Sequalize.STRING,
        allowNull: false
    }

},{timestamps:false});

module.exports = UserOrders ;
