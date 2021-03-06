const { User } = require("../models");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

class userController {
  static register(req, res, next) {
    let objInput = {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password
    };
    User.create(objInput)
      .then(result => {
        console.log("masuk");
        res.status(201).json(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static login(req, res, next) {
    let password = req.body.password;
    let email = req.body.email;
    User.findOne({
      where: {
        email: email
      }
    })
      .then(result => {
        let compare = bcrypt.compareSync(password, result.password);
        if (compare) {
          let token = jwt.sign(
            { email: result.email, id: result.id },
            "ini rahasia"
          );
          res.status(201).json(token);
        } else {
          throw {
            statusError: 400,
            message: "email or password is false"
          };
        }
      })
      .catch(err => {
        console.log(err);
        // next(err);
      });
  }
  static googleLogin(req, res, next) {
    console.log(result);
    User.findOne({
      where: {
        email: req.payload.email
      }
    })
      .then(result => {
        if (!result) {
          return User.create({
            email: req.payload.email,
            password: process.env.passwordDefault
          });
        } else {
          return result;
        }
      })
      .then(result => {
        let token = jwt.sign(
          { email: result.email, id: result.id },
          process.env.secret_key
        );
        res.status(200).json(token);
      })
      .catch(err => {
        res.status(404).json("salah");
      });
  }
  static findOne(req, res, next) {
    const id = req.params.id;
    Todo.findOne({
      where: {
        id: req.user.id,
        email: req.user.email
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

  static updates(req, res, next) {
    const objInput = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    };
    Todo.update(objInput, {
      where: {
        id: Number(req.params.id),
        email: req.user.email
      },
      returning: true
    })
      .then(data => {
        console.log(data);
        if (data[0] > 0) {
          res.status(200).json({
            result: data[1]
          });
        } else {
          let err = {
            statusError: 404,
            message: "data not found"
          };
          next(err);
        }
      })
      .catch(err => {
        let objError = {
          statusError: 400,
          message: errorMaker(err)
        };
        next(objError);
      });
  }
}
module.exports = userController;
