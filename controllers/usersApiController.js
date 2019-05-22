// Models
const Users = require("../models/users");

// Helpers
const random = require("../helpers/random");
const validator = require("../helpers/validator");

//Middlewares
const gatekeeper = require("../middlewares/gatekeeper");

module.exports = function(app) {
  app.get("/api/users", gatekeeper.authenticate, (req, res) => {
    Users.find({}, { _id: 0, __v: 0 }, (err, users) => {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        res.setHeader(
          "response-description",
          "Oops, Something went wrong #ERR1"
        );
        res.end();
      } else {
        res.statusCode = 200;
        res.json(users);
      }
    });
  });

  app.get("/api/users/:id", gatekeeper.authenticate, (req, res) => {
    Users.findOne({ id: req.params.id }, { _id: 0, __v: 0 }, (err, user) => {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        res.setHeader(
          "response-description",
          "Oops, Something went wrong #ERR2"
        );
        res.end();
      } else {
        if (!user) {
          res.statusCode = 404;
          res.setHeader("response-description", "User not found");
          res.end();
        } else {
          res.statusCode = 200;
          res.json(user);
        }
      }
    });
  });

  app.post("/api/users", gatekeeper.authenticate, (req, res) => {
    let validatorResponse = validator.validateUserBody(req.body);

    if (validatorResponse) {
      res.statusCode = 400;
      res.setHeader("response-description", validatorResponse);
      res.end();
    } else {
      var user = new Users({
        id: random.randomIdOfLength10(),
        email: req.body.email,
        givenName: req.body.givenName,
        familyName: req.body.familyName
      });

      user.save(function(err, repo) {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.setHeader(
            "response-description",
            "Oops, Something went wrong #ERR3"
          );
          res.end();
        } else {
          res.statusCode = 201;
          res.json(repo);
          res.end();
        }
      });
    }
  });

  app.put("/api/users", gatekeeper.authenticate, (req, res) => {
    Users.findOne({ id: req.body.id }, (err, user) => {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        res.setHeader(
          "response-description",
          "Oops, Something went wrong #ERR4"
        );
        res.end();
      } else {
        let validatorResponse = validator.validateUserBody(req.body);

        if (validatorResponse) {
          res.statusCode = 400;
          res.setHeader("response-description", validatorResponse);
          res.end();
        } else {
          user.email = req.body.email;
          user.givenName = req.body.givenName;
          user.familyName = req.body.familyName;
          user.save(function(err) {
            if (err) {
              console.log(err);
              res.statusCode = 500;
              res.setHeader(
                "response-description",
                "Oops, Something went wrong #ERR5"
              );
              res.end();
            } else {
              res.statusCode = 200;
              res.end();
            }
          });
        }
      }
    });
  });

  app.delete("/api/users/:id", gatekeeper.authenticate, (req, res) => {
    Users.findOneAndRemove({ id: req.params.id }, (err, user) => {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        res.setHeader(
          "response-description",
          "Oops, Something went wrong #ERR6"
        );
        res.end();
      } else {
        if (!user) {
          res.statusCode = 404;
          res.setHeader("response-description", "User not found");
          res.end();
        } else {
          res.statusCode = 200;
          res.end();
        }
      }
    });
  });
};
