const { verifySignUp } = require("../middleware");
const controller = require("../controllers/admin.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get("/api/admin/user-list", controller.regularUsersList);
  app.post("/api/admin/add", controller.regularUserRegister);
  app.put( "/api/admin/status/:id",controller.selectedRegularUserStatusChange);
  app.delete("/api/admin/delete-user/:id", controller.deleteSelectedRegularUser);
};