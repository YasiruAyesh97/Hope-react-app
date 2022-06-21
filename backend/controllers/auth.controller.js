let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Users_Roles = db.users_roles;
const Op = db.Sequelize.Op;
let {roleAdmin,roleRegularUser,superAdminEmail} = require('../config/default.js');


exports.signup = async (req, res) => {
  // Save User to Database
  //   return res.status(200).send(req.body.email);
   try{
       let adminrole =await Role.findOne({
           where: {
               name:roleAdmin
           }
       })
       let regularuserrole =await Role.findOne({
           where: {
               name:roleRegularUser
           }
       })
       let user =await User.findOne({
           where: {
               email:req.body.email
           }
       })
       if(user){
           return res.status(400).send({ message: "user already registered" });
       }
       User.create({
           username: req.body.username,
           email: req.body.email,
           password:   bcrypt.hashSync(req.body.password, 8),
           companyId: req.body.companyId,

       })
           .then(user => {
               let success =false;
               if(req.body.checkadmin ||req.body.checkadmin=='true'){
                   Users_Roles.create({
                       roleId: adminrole.id,
                       userId: user.id,

                   }).then(data=>{
                       if(data){
                           success =true
                       }
                   })
                       .catch(err => {
                           console.log("Users_Roles admin error")
                           return res.status(500).send({ message: err.message });
                       });
               }
               if(req.body.checkuser||req.body.checkuser=='true'){
                   Users_Roles.create({
                       roleId: regularuserrole.id,
                       userId: user.id,

                   }).then(data=>{
                       if(data){
                           success =true
                       }
                   })
                       .catch(err => {
                           console.log("Users_Roles admin error")
                           return res.status(500).send({ message: err.message });
                       });
               }
               return res.status(200).send({ message: "successfully inserted" });

           })
           .catch(err => {
               res.status(401).send({ message: err.message });
           });

   }catch(err) {
       return res.status(500).send({ message: err.message });
   }




};
exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
          return res.status(400).send({ message: "No user found" });
      }else if(!user.active){
          return res.status(400).send({ message: "User is not activate" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid password"
        });
      }


      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

          var token = jwt.sign({ id: user.id,username: user.username, email: user.email,roles: authorities,companyId:user.companyId  }, config.secret, {
              expiresIn: 86400 // 24 hours
          });

        res.status(200).send(token);
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

