const {fn,col} = require('sequelize');
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Company = db.company;
const Users_Roles = db.users_roles;
const Role = db.role;
const Op = db.Sequelize.Op;


exports.usersList = async (req, res) => {
    // Save User to Database
    //   return res.status(200).send(req.body.email);
    try{


        let user =await User.findAll({

            attributes: [
                'id',
                'username',
                'email',
                'password',
                'companyId',
                [ 'createdAt','datetime'],
                [db.Sequelize.literal('company.name'), 'cname'],
                ['active','status']


            ],
            include : { model: Company ,attributes: []},
            where: {
                email: {
                    [Op.not]: 'superadmin@gmail.com'
                }
            }

        });

        if(user){
            return res.status(200).send(user);
        }


    }catch(err) {
        return res.status(500).send({ message: "Something wrrong" });
    }

};

exports.selectedUser = async (req, res) => {
    // Save User to Database
    //   return res.status(200).send(req.body.email);
    try{

        let user =await User.findOne({
            where: {
                id :req.body.id
            }

        })

        if(user){
            let isAdmin = false
            let roles = false
            let isRUser = false

            let ur =await Users_Roles.findAll({
                where: {
                    userId :user.id
                },
                attributes: [
                    'roleId'
                ]

            })

            for (let i = 0; i < ur.length; i++) {
                let role =await Role.findOne({
                    where: {
                        id :ur[i].roleId
                    },
                    attributes: [
                        'name'
                    ]

                })

                if(role.name ==='admin'){
                    console.log("role : "+role.name)
                    isAdmin=true
                    roles=true
                }
                if(role.name ==='user'){
                    console.log("role : "+role.name)
                    isRUser=true
                    roles=true
                }

            }

            return  res.status(200).send({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "companyId":user.companyId,
                "status": user.active,
                "isAdmin": isAdmin,
                "isRUser": isRUser,
                "roles": roles,

            });
        }




    }catch(err) {
        return res.status(500).send({ message: "Something wrrong" });
    }

};


exports.deleteSelectedUser = async (req, res) => {
    // Save User to Database

    try{

        let deletedRecord =await Users_Roles.destroy({
            where: {
                userId :req.params.id
            }

        })

        if(deletedRecord >= 1){
            let deletedUser =await User.destroy({
                where: {
                    id :req.params.id
                }

            })
            if(deletedUser==1){
                return res.status(200).send({ message: "user deleted" });
            }

        }




    }catch(err) {
        return res.status(500).send({ message: "Something wrrong" });
    }

};