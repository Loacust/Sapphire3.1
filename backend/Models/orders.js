const Sequalize = require('sequelize');
const config = require('../config')


const UserOrders=config.define('userorder', {
 
     email: {
        type: Sequalize.STRING,
        allowNull: false,
        
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
    },
    price:{
        type: Sequalize.NUMBER,
        allowNull: false,  

    },
    orderid:{
        type: Sequalize.NUMBER,
        allowNull: true,
        primaryKey: true,

    }

},{timestamps:false});

module.exports = UserOrders ;
