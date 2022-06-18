// const { verifySignUp } = require("../middleware");
const controller = require("../controllers/catalog2.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post( "/api/catalog2/insert",controller.insertCatalog2);
  app.get( "/api/catalog2/all/:companyId",controller.Catalog2List);
  app.put( "/api/catalog2/status/:id",controller.selectedCatalog1StatusChange);
  app.delete( "/api/catalog2/delete/:id",controller.deleteSelectedCatalog);

};