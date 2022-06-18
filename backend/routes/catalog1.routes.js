// const { verifySignUp } = require("../middleware");
const controller = require("../controllers/catalog1.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post( "/api/catalog1/insert",controller.insertCatalog1);
  app.get( "/api/catalog1/all/:companyId",controller.Catalog1List);
  app.put( "/api/catalog1/status/:id",controller.selectedCatalog1StatusChange);
  app.delete( "/api/catalog1/delete/:id",controller.deleteSelectedCatalog);

};