// const { verifySignUp } = require("../middleware");
const controller = require("../controllers/company.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post( "/api/company/register",controller.registerCompany);
  app.get( "/api/company/all",controller.companyList);
  app.put( "/api/company/status/:id",controller.selectedCompanyStatusChange);
  app.delete( "/api/company/delete/:id",controller.deleteSelectedCompany);

};