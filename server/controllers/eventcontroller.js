const { Event } = require("../models");
const { user } = require("../models");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}


class eventController {
  static findAll(req, res, next) {
    Event.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(result => {
      res
        .status(201)
        .json({
          result: data
        })
        .catch(err => {
          res.send(err);
        });
    });
  }

  static addEvent(req, res, next) {
    let objInput = {
      name: req.body.name,
      date: req.body.date,
      description: req.body.description,
      location: req.body.location,
      EventId:req.body.EventId,
      UserId: req.user.id
    };
    Event.create(objInput).then(result => {
      res.status(201).json(result);
    });
  }
  static delete(req, res, next) {
    Event.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(data => {})
      .catch(err => {});
  }

  static findOne(req, res, next) {
    const id = req.params.id;
    Event.findOne({
      where: {
        id: req.user.id
      }
    }).then(data => {
      if (data) {
        res.status(200).json({
          data
        });
      } else {
        let err = {
          statusError: 404,
          message: "error not found"
        };
        next(err);
      }
    });
  }
}
module.exports = eventController;
