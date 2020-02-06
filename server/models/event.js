'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class Event extends Model{}
  Event.init({
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    description: DataTypes.STRING,
    location: DataTypes.STRING
  },sequelize)
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};