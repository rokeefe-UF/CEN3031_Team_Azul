//horoscopeCombo is the object we will create when making a new entry
var horoscopeModel = require('../models/horoscopeSchema.js');

//create a horoscope combo
const create = async (req, res) => {
    const horoscope = new horoscopeModel(req.body);


    horoscope.save().then(data => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).send(horoscope);
    }).catch(err => {
        if(err.code == 11000){
            res.header('Access-Control-Allow-Origin', '*');
            res.status(409).send({
                message: err.message || "Duplication error"
            });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.status(500).send({
            message: err.message || "Error on create"
        });
    });

};

//show a horoscope listing
const read = async (req, res) => {
    //TODO
    v.findOne({ '_id': req.params.horoscopeID}).then(data =>{
        if(data!=null){
            res.header('Access-Control-Allow-Origin', '*');
            res.status(200).json(data);
        }else{
            res.header('Access-Control-Allow-Origin', '*');
            res.status(404).send({error: 'Doc not found: ' + req.params.horoscopeID});
        }
    }).catch(err => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(500).send({
            message: err.message || "Read failed: " + req.params.horoscopeID
        })
    });



};

//update a horoscope listing
const update = async (req, res) => {
  const horoscope = new horoscopeModel(req.body);
  horoscopeModel.findByIdAndUpdate(req.params.horoscopeID,{
                                            _id:horoscope._id,
                                            house:horoscope.house,
                                            sign: horoscope.sign,
                                            moonphase:horoscope.moonphase,
                                            description:horoscope.description

                                            }).then(data =>{
        
    horoscopeModel.findOne({ '_id': req.params.horoscopeID}).then(data=>{
            
            if(data!=null){
                res.header('Access-Control-Allow-Origin', '*');
                res.status(200).json(data);
            }else{
                res.header('Access-Control-Allow-Origin', '*');
                res.status(404).send({error: 'Doc updated, but lost ' + req.params.horoscopeID});
            }

        }).catch(err => {
            res.header('Access-Control-Allow-Origin', '*');
            res.status(500).send({
                message: err.message || "Saved Doc not found: " + req.params.horoscopeID
            })
        });

    }).catch(err => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(404).send({
            message: err.message || "Doc update failed: " + req.params.horoscopeID
        })
    });
};

//remove a horoscopeCombo
const remove = async (req, res) => {
    console.log('should have header');
    horoscopeModel.findOneAndDelete({ '_id': req.params.horoscopeID}).then(data =>{
        if(data != null){
            res.header('Access-Control-Allow-Origin', '*');
            res.status(200).send(data);
        }else{
            res.header('Access-Control-Allow-Origin', '*');
            res.status(404).send({error: 'Doc not found: '+req.params.horoscopeID});
        }
    }).catch(err => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(500).send({
            message: err.message || "Remove failed: " + req.params.horoscopeID

        });
    });
};

//list all horoscopeCombos
const list = async (req, res) => {
    //TODO
    console.log('listing')
    horoscopeModel.find().sort().then(data =>{
        console.log('returning');
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    }).catch(err => {
        console.log('failed')

        res.header('Access-Control-Allow-Origin', '*');
        res.status(500).send({
            message: err.message || "List failed"
        });
    });
};

module.exports = {
    list,
    remove,
    update,
    read,
    create,
};

