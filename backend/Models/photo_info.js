const Sequalize = require('sequelize');
const config = require('../config')


const Userphotos =config.define('userphoto', {
    email: {
        type: Sequalize.STRING,
        allowNull: false,
        
    },
    image: {
        type: Sequalize.STRING,
        allowNull: true,
        primaryKey: true
    },
  //  userid: {
     //   type: Sequalize.INTEGER,
    //    allowNull: false
    //}
    
},{timestamps:false});

module.exports = Userphotos ;
