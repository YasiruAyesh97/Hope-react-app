// const { verifySignUp } = require("../middleware");
const controller = require("../controllers/catalog3.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post( "/api/catalog3/insert",controller.insertCatalog1);
  app.get( "/api/catalog3/all/:companyId",controller.Catalog1List);
  app.put( "/api/catalog3/status/:id",controller.selectedCatalog1StatusChange);
  app.delete( "/api/catalog3/delete/:id",controller.deleteSelectedCatalog);

};