const {fn,col} = require('sequelize');
const db = require("../models");
const Company = db.company;
const Op = db.Sequelize.Op;

exports.registerCompany = async (req, res) => {
  // Save User to Database
  //   return res.status(200).send(req.body);
   try{

       let company =await Company.findOne({
           where: {
               name:req.body.name
           }
       })
       if(company){
           return res.status(400).send({ message: "company already registered" });
       }
       Company.create({
           name: req.body.name,

       })
           .then(company => {
               if(company){
                   return res.status(200).send({ message: "successfully inserted" });
               }

           })
           .catch(err => {
               res.status(401).send({ message: err.message });
           });

   }catch(err) {
       return res.status(500).send({ message: "Something wrrong" });
   }

};

exports.companyList = async (req, res) => {
    // Save User to Database
    //   return res.status(200).send(req.body.email);
    try{


        let company =await Company.findAll({

            attributes: [
                'id',
                'name',
                [fn('DATE', col('createdAt')), 'date'],
                ['active','status']

            ],
            where: {
                name: {
                    [Op.not]: 'ABC'
                }
            }



        });

        if(company){
            return res.status(200).send(company);
        }


    }catch(err) {
        return res.status(500).send({ message: "Something wrrong" });
    }

};


exports.selectedCompanyStatusChange = async (req, res) => {
    // Save User to Database
    //   return res.status(200).send(req.body.email);
    try{


        let company =await Company.findOne({

        where: { id: req.params.id }
        });

        if(!company){
            res.status(401).send({ message: err.message });
        }

        Company.update(
            { active: !company.active},
            { where: { id: req.params.id } }
        ).then(company => {
            return res.status(200).send({ message: "successfully" });
         }).catch(err => {
                res.status(401).send({ message: err.message });
         });




    }catch(err) {
        return res.status(500).send({message: err.message });
    }

};

exports.deleteSelectedCompany = async (req, res) => {
    // Save User to Database

    try{

        let deletedRecord =await Company.destroy({
            where: {
                id :req.params.id
            }

        })

        if(deletedRecord == 1){
            return res.status(200).send({ message: "company deleted" });

        }




    }catch(err) {
        return res.status(500).send({ message: "Something wrrong" });
    }

};