// Helpers
const apiHelpers = require("../helpers/apiHelpers");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.redirect("/users");
  });

  app.get("/users", (req, res) => {
    apiHelpers.makeGenericApiCall(
      req.body,
      "GET",
      "/api/users",
      (code, err, users) => {
        if (code != 200) res.render("error", { error: err });
        else res.render("users/view", { users: users });
      }
    );
  });

  app.get("/users/:id", (req, res) => {
    apiHelpers.makeGenericApiCall(
      req.body,
      "GET",
      `/api/users/${req.params.id}`,
      (code, err, user) => {
        if (code != 200) res.render("error", { error: err });
        else res.render("users/details", { user: user });
      }
    );
  });

  app.get("/users/delete/:id", (req, res) => {
    apiHelpers.makeGenericApiCall(
      req.body,
      "DELETE",
      `/api/users/${req.params.id}`,
      (code, err, user) => {
        if (code != 200) res.render("error", { error: err });
        else res.redirect("/");
      }
    );
  });

  app.post("/users", (req, res) => {
    apiHelpers.makeGenericApiCall(
      req.body,
      "POST",
      "/api/users",
      (code, err, user) => {
        if (code != 201) res.render("error", { error: err });
        else res.redirect(`/users/${user.id}`);
      }
    );
  });

  app.post("/users/update", (req, res) => {
    apiHelpers.makeGenericApiCall(
      req.body,
      "PUT",
      "/api/users",
      (code, err, users) => {
        if (code != 200) res.render("error", { error: err });
        else res.redirect(`/users/${req.body.id}`);
      }
    );
  });
};
