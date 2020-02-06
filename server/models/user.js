'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const {Model} = sequelize.Sequelize
  class User extends Model{}
  User.init({
    email: DataTypes.STRING,
    pass: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER
  },sequelize)
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Event)
  };
  return User;
};