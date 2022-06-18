// const { verifySignUp } = require("../middleware");
const controller = require("../controllers/document.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post( "/api/document/insert",controller.insertDocument);
  app.get( "/api/document/all/:companyId",controller.DocumentList);
  app.get( "/api/document/expiresoon/:companyId",controller.ExpireSoonDocumentList);
  app.put( "/api/document/status/:id",controller.selectedDocumentStatusChange);
  app.delete( "/api/document/delete/:id",controller.deleteSelectedDocument);

};