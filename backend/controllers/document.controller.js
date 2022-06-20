const {fn,col} = require('sequelize');
const db = require("../models");
const Company = db.company;
const Catalog_1 = db.catalog_1;
const Catalog_2 = db.catalog_2;
const Catalog_3 = db.catalog_3;
const Document = db.document;
const Op = db.Sequelize.Op;

exports.insertDocument = async (req, res) => {
  // Save User to Database
  //   return res.status(200).send(req.body);
   try{

       let document =await Document.findOne({
           where: {
               name:req.body.name
           }
       })
       if(document){
           return res.status(400).send({ message: "catalog list already registered" });
       }
       Document.create({
           name: req.body.name,
           dueDate: req.body.dueDate,
           agentName: req.body.agentName,
           catalog1Id : req.body.catalog1Id,
           catalog2Id : req.body.catalog2Id,
           catalog3Id : req.body.catalog3Id,
           userId  : req.body.userId ,
           companyId  : req.body.companyId

       })
           .then(document => {
               if(document){
                   return res.status(200).send({ message: "successfully inserted" });
               }

           })
           .catch(err => {
               res.status(401).send({ message: err.message });
           });

   }catch(err) {
       return res.status(500).send({ message: "Something wrong" });
   }

};

exports.DocumentList = async (req, res) => {
    //need the admin companyId id
    //   return res.status(200).send(req.params.companyId);
    try{


        let document =await Document.findAll({

            attributes: [
                'id',
                'name',
                'dueDate',
                [fn('DATE', col('dueDate')), 'dueDate'],
                // [db.Sequelize.literal('SUBSTRING(dueDate, 0, 10) '),'dueDate'],
                'agentName',
                [db.Sequelize.literal('catalog_1.name'), 'catalog1name'],
                [db.Sequelize.literal('catalog_2.name'), 'catalog2name'],
                [db.Sequelize.literal('catalog_3.name'), 'catalog3name'],
                ['active','status'],
                // [fn('DATE', col('createdAt')), 'date'],

            ],
            include: [
                {
                    model: Catalog_1,
                    required: true,
                    attributes: [],
                },
                {
                    model: Catalog_2,
                    required: true,
                    attributes: [],

                },
                {
                    model: Catalog_3,
                    required: true,
                    attributes: [],

                },

            ],

            where: {
                companyId : req.params.companyId
            }



        });

        if(document){
            return res.status(200).send(document);
        }


    }catch(err) {
        return res.status(500).send({ message: err });
    }

};


exports.selectedDocumentStatusChange = async (req, res) => {
    // Save User to Database
    //   return res.status(200).send(req.body.email);
    try{


        let doc =await Document.findOne({

        where: { id: req.params.id }
        });

        if(!doc){
            res.status(401).send({ message: 'not found document'});
        }

        Document.update(
            { active: !doc.active},
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

exports.deleteSelectedDocument = async (req, res) => {
    // Save User to Database

    try{

        let deletedRecord =await Document.destroy({
            where: {
                id :req.params.id
            }
        })

        if(deletedRecord == 1){
            return res.status(200).send({ message: "company deleted" });
        }




    }catch(err) {
        return res.status(500).send({ message: "Something wrong" });
    }

};

exports.ExpireSoonDocumentList = async (req, res) => {
    //need the admin companyId id
    //   return res.status(200).send(req.params.companyId);
    try{
        let today = new Date();
        let next7days = new Date();
        next7days.setDate(today.getDate()+7);

        let document =await Document.findAll({

            attributes: [
                'name',
                'dueDate',
            ],


            where: {
                companyId : req.params.companyId,
                dueDate: {
                    [Op.gt]: new Date(),
                    [Op.lte]: next7days
                }
            }



        });


        if(document){
            let newArr=[]
            for(let i=0;i<document.length; i++){
                newArr.push({
                    'name':document[i].name,
                    'due_date' :document[i].dueDate,
                    'remain_days':(Math.abs(new Date(document[i]['dueDate']) - today)/(1000 * 60 * 60 * 24)).toFixed(1),

                })
            }
            return res.status(200).send(newArr);
        }


    }catch(err) {
        return res.status(500).send({ message: err });
    }

}