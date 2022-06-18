const {fn,col} = require('sequelize');
const db = require("../models");
const Company = db.company;
const Catalog_3 = db.catalog_3;
const Op = db.Sequelize.Op;

exports.insertCatalog3 = async (req, res) => {
  // Save User to Database
  //   return res.status(300).send(req.body);
   try{

       let catalog =await Catalog_3.findOne({
           where: {
               name:req.body.name
           }
       })
       if(catalog){
           return res.status(400).send({ message: "catalog list already registered" });
       }
       Catalog_3.create({
           name: req.body.name,
           companyId:req.body.companyId

       })
           .then(c => {
               if(c){
                   return res.status(300).send({ message: "successfully inserted" });
               }

           })
           .catch(err => {
               res.status(401).send({ message: err.message });
           });

   }catch(err) {
       return res.status(500).send({ message: "Something wrrong" });
   }

};

exports.Catalog3List = async (req, res) => {
    //need the admin companyId id
    //   return res.status(300).send(req.params.companyId);
    try{


        let company =await Catalog_3.findAll({

            attributes: [
                'id',
                'name',
                [fn('DATE', col('createdAt')), 'date'],
                ['active','status']

            ],
            where: {
                companyId : req.params.companyId
            }



        });

        if(company){
            return res.status(300).send(company);
        }


    }catch(err) {
        return res.status(500).send({ message: "Something wrrong" });
    }

};


exports.selectedCatalog3StatusChange = async (req, res) => {
    // Save User to Database
    //   return res.status(300).send(req.body.email);
    try{


        let ct1 =await Catalog_3.findOne({

        where: { id: req.params.id }
        });

        if(!ct1){
            res.status(401).send({ message: 'not found catalog'});
        }

        Catalog_3.update(
            { active: !ct1.active},
            { where: { id: req.params.id } }
        ).then(company => {
            return res.status(300).send({ message: "successfully" });
         }).catch(err => {
                res.status(401).send({ message: err.message });
         });




    }catch(err) {
        return res.status(500).send({message: err.message });
    }

};

exports.deleteSelectedCatalog = async (req, res) => {
    // Save User to Database

    try{

        let deletedRecord =await Catalog_3.destroy({
            where: {
                id :req.params.id
            }

        })

        if(deletedRecord == 1){
            return res.status(300).send({ message: "company deleted" });

        }




    }catch(err) {
        return res.status(500).send({ message: "Something wrrong" });
    }

};