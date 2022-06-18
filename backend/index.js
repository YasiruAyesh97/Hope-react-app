const express = require('express');
const cors = require('cors');
let bcrypt = require("bcryptjs");
const app = express();


app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./models')
const Role = db.role;
const User = db.user;
const UserRole = db.users_roles;
const Company = db.company;

// Routers
const rubroRouter = require('./routes/Rubros')
app.use("/rubros", rubroRouter);

const clienteRouter = require('./routes/Clientes')
app.use("/clientes", clienteRouter);

const competenciaRouter = require('./routes/Competencias')
app.use("/competencias", competenciaRouter);

const evidenciaRouter = require('./routes/Evidencias')
app.use("/evidencias", evidenciaRouter);

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/company.routes')(app);
require('./routes/superadmin.routes')(app);
require('./routes/admin.routes')(app);
require('./routes/catalog1.routes')(app);
require('./routes/catalog2.routes')(app);
require('./routes/catalog3.routes')(app);

db.sequelize.sync({alter:true}).then(() => {

  console.log('Drop and Re-sync of DB');
  initial();

  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});

function initial() {

  Company.findOne({
    where: {
      name:"ABC"
    }
  }).then(c => {
     if(!c){
       Company.create({
         name:"ABC"
       }).then(company => {

         Role.findOne({
           where: {
             name:"superadmin"
           }
         }).then(role => {
           if(!role){
             Role.create({
               name: "superadmin"
             }).then((role) => {

               User.findOne({
                 where: {
                   email:"superadmin@gmail.com"
                 }

               }).then(user => {
                 if(!user){
                   User.create({
                     "username": "superadmin",
                     "email": "superadmin@gmail.com",
                     "password":  bcrypt.hashSync("1234", 8),
                     "companyId": company.id,
                   }).then(user=>{

                     UserRole.create({
                       roleId:role.id,
                       userId:user.id
                     })
                   })
                       .catch(err => {
                         console.log("err in initial function"+err)
                       });
                 }
               }).catch(err => {
                 console.log("err in initial function"+err)
               });



             }).catch(err => {
               console.log("err in initial function"+err)
             });
           }

         }).catch(err => {
           console.log("err in initial function"+err)
         });
       })
     }
  }).catch(err => {
        console.log("err in initial function"+err)
   });


  Role.findOne({
    where: {
      name:"admin"
    }
  }).then(role => {
    if(!role){
      Role.create({
        name: "admin"
      });
    }

  }).catch(err => {
    console.log("err in initial function"+err)
  });

  Role.findOne({
    where: {
      name:"user"
    }
  }).then(role => {
    if(!role){
      Role.create({
        name: "user"
      });
    }

  }).catch(err => {
    console.log("err in initial function"+err)
  });

  User.findOne({
    where: {
      email:"superadmin@gmail.com"
    }
  }).then(user => {
    if(!user){
      User.create({
        "username": "superadmin",
        "email": "superadmin@gmail.com",
        "companyId": "",
        "password": "1234",
      }).then()
          .catch(err => {
        console.log("err in initial function"+err)
      });
    }
  }).catch(err => {
    console.log("err in initial function"+err)
  });

}