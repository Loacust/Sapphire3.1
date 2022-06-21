
const Sequalize = require('sequelize');
const config = require('../config')


const ContactUsData =config.define('contactusdatas', {
    email: {
        type: Sequalize.STRING,
        allowNull: false,
        primaryKey: true
    },
    fname: {
        type: Sequalize.STRING,
        allowNull: false

    },
    lname: {
        type: Sequalize.STRING,
        allowNull: false
    },
    comments: {
        type: Sequalize.STRING,
        allowNull: false
    }
},{timestamps:false});

module.exports = ContactUsData;