'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const {Model} = sequelize.Sequelize
  class User extends Model{}
  User.init({
    
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"name must be filled"
        },
        notEmpty:{
          args:true,
          msg:"name must be filled"
        }
      }},
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"password must be filled"
        },
        notEmpty:{
          args:true,
          msg:"password must be filled"
        }
      }},
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"email must be filled"
        },
        notEmpty:{
          args:true,
          msg:"email must be filled"
        }
      }},
    age: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"age must be filled"
        },
        notEmpty:{
          args:true,
          msg:"age must be filled"
        }
      }
    }
  },{sequelize,hooks:{
    beforeCreate: function(user,options){
      let hash = bcrypt.hashSync(user.password, 10);
      user.password = hash
    }
  }})
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Event)
  };
  return User;
};