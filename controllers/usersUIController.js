// Helpers
const apiHelpers = require("../helpers/apiHelpers");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.redirect("/users");
  });

  app.get("/users", (req, res) => {
    apiHelpers.makeGenericApiCall(req, "GET", "/api/users", function(
      err,
      users
    ) {
      if (err) res.render("error", { error: err });
      else res.render("users/view", { users: users });
    });
  });


  app.get("/users/:id", (req, res) => {
    apiHelpers.makeGenericApiCall(req, "GET", `/api/users/${req.params.id}`, function(
      err,
      user
    ) {
      if (err) res.render("error", { error: err });
      else res.render("users/details", { user: user });
    });
  });

  app.get("/users/delete/:id", (req, res) => {
    apiHelpers.makeGenericApiCall(req, "DELETE", `/api/users/${req.params.id}`, function(
      err,
      user
    ) {
      if (err) res.render("error", { error: err });
      else res.redirect("/");
    });
  });

  app.post("/users", (req, res) => {
    apiHelpers.makeGenericApiCall(req, "POST", "/api/users", function(
      err,
      users
    ) {
      if (err) res.render("error", { error: err });
      else res.redirect("/");
    });
  });

  app.post("/users/update", (req, res) => {
    apiHelpers.makeGenericApiCall(req, "PUT", "/api/users", function(
      err,
      users
    ) {
      if (err) res.render("error", { error: err });
      else res.redirect(`/users/${req.body.id}`);
    });
  });

};
