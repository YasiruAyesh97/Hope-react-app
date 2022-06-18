const { verifySignUp } = require("../middleware");
const controller = require("../controllers/superadmin.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.post(
  //   "/api/auth/signup",
  //   [
  //     // verifySignUp.checkDuplicateUsernameOrEmail,
  //     // verifySignUp.checkRolesExisted
  //   ],
  //   controller.signup
  // );
  //
  app.get("/api/super-admin/user-list", controller.usersList);
  app.post("/api/super-admin/selected-user", controller.selectedUser);
  app.delete("/api/super-admin/delete-user/:id", controller.deleteSelectedUser);
};