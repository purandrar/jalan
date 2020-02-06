"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Event extends Model {}
  Event.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "email must be filled"
          },
          notEmpty: {
            args: true,
            msg: "email must be filled"
          }
        }
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "date must be filled"
          },
          notEmpty: {
            args: true,
            msg: "date must be filled"
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "description must be filled"
          },
          notEmpty: {
            args: true,
            msg: "description must be filled"
          }
        }
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "location must be filled"
          },
          notEmpty: {
            args: true,
            msg: "location must be filled"
          }
        }
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "UserId must be filled"
          },
          notEmpty: {
            args: true,
            msg: "UserId must be filled"
          }
        }
      }
    },
    { sequelize, hooks: {} }
  );
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.User);
  };
  return Event;
};
