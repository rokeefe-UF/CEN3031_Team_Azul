var swisseph=require('swisseph');
//var UserProfile=require('../../client/src/views/SignUp/UserState');
var horoscopeModel = require('../models/horoscopeSchema.js');

//personalInformationCombo is the object we will create when making a new entry
var personalInformationCombo = require( '../models/personalInformationSchema.js');
//var axiosRequests=require('../../client/src/axiosRequests');

var nodemailer = require('nodemailer');



//create a horoscope combo
const create = async (req, res) => {
    if(req.headers.authorization == (process.env.KEY||'Bearer 2h589hg9unfd0sfyg72458ugn540983g')){
    let house='';
    if(req.body.LocationOfBirth!==undefined && req.body.TimeOfBirth!==undefined && req.body.TimeOfBirth.length>0 && req.body.LocationOfBirth.length>0){
    var arr=req.body.Birthday.split('-');
    var arr2=req.body.TimeOfBirth.split(':');
    var julday= swisseph.swe_julday(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), parseInt(arr2[0]), swisseph.SE_GREG_CAL )
    swisseph.swe_houses(julday, 30, -82, 'C', function(houses){
    house=houses.house[0];
    });
    
   }
    
    req.body.House=house;
    

    const person = new personalInformationCombo(req.body);

    

    person.save().then(data => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).send(person);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            }
          });
          
          var mailOptions = {
            from: process.env.EMAIL,
            to: req.body.Email,
            subject: 'Welcome to Moonflow',
            text: 'Hello '+req.body.Name+' you have now signed up for moonflow'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          
    }).catch(err => {
        if(err.code == 11000){
            res.header('Access-Control-Allow-Origin', '*');
            res.status(409).send({
                message: err.message || "Duplication error"
            });
            return;
        }
        res.header('Access-Control-Allow-Origin', '*');
        
        res.status(500).send({
            message: err.message || "Error on create"
        });
    });
    }else{
        console.log("Auth Failed")
            res.status(401).send({
                message: "Auth Failed"
            })
        }
    

};

//show a horoscope listing
const read = async (req, res) => {
    if(req.headers.authorization == (process.env.KEY||'Bearer 2h589hg9unfd0sfyg72458ugn540983g')){
        

            if(req.url.indexOf('/personal/Admin@admin.com2')===0){
            let moonphase=req.url.substring(26);

            
            let response=await personalInformationCombo.find();
            
            for(let i=0; i<response.length; i++){
                if(response[i].Subscribed!==undefined && response[i].House!==undefined)
                if(response[i].Subscribed){
                let em=response[i].Email;
                
        let b=null;
                horoscopeModel.findOne({ 'house': '1st', 'moonphase':moonphase,'sign':response[i].Sign}).then(data =>{
                    if(data!=null){
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                            user: process.env.EMAIL,
                            pass: process.env.PASSWORD
                            }
                        });
                        
                        var mailOptions = {
                            from: process.env.EMAIL,
                            to: em,
                            subject: 'Your Moon Change Update',
                            text: 'Hello '+response[i].Name+' your update is:\nHouse: '+response[i].House+'\nSign:'+response[i].Sign+'\n'+data.description
                        };
                        
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                            console.log(error);
                            } else {
                            console.log('Email sent: ' + info.response);
                            }
                        });
                        
                        res.header('Access-Control-Allow-Origin', '*');
                        res.status(200).json(data);
                    }else{
                        //res.header('Access-Control-Allow-Origin', '*');
                    // res.status(404).send({error: 'Doc not found: ' + req.body.house + " " + req.body.moonphase});
                    }
                }).catch(err => {
                    
                    //res.header('Access-Control-Allow-Origin', '*');
                // res.status(500).send({
                    //   message: err.message || "Read failed: " + req.body.house + " " + req.body.moonphase
                    //})
                });
                

            
            }
            }
        }
        

        else{

            //TODO
            
            personalInformationCombo.findOne({ 'Email': req.params.Email}).then(data =>{
                if(data!=null){
                    res.header('Access-Control-Allow-Origin', '*');
                    res.status(200).json(data);
                }else{
                    res.header('Access-Control-Allow-Origin', '*');
                    res.status(404).send({error: 'Doc not found: ' + req.params.Email});
                }
            }).catch(err => {
                res.header('Access-Control-Allow-Origin', '*');
                res.status(500).send({
                    message: err.message || "Read failed: " + req.params.Email
                })
            });


        }
    }else{
        console.log("Auth Failed")
        res.status(401).send({
            message: "auth failed"
        })
    }


};

//update a horoscope listing
const update = async (req, res) => {
    //TODO: Birthday is currently uneditable


    if(req.headers.authorization == (process.env.KEY||'Bearer 2h589hg9unfd0sfyg72458ugn540983g')){

        let house='';
        
        if(req.body.LocationOfBirth!==undefined && req.body.TimeOfBirth!==undefined && req.body.TimeOfBirth.length>0 && req.body.LocationOfBirth.length>0){
        var arr=req.body.Birthday.split('-');
        var arr2=req.body.TimeOfBirth.split(':');
        
        var julday= swisseph.swe_julday(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), parseInt(arr2[0]), swisseph.SE_GREG_CAL )
        console.log(julday);
        
        swisseph.swe_houses(julday, 30, -82, 'C', function(houses){
           
        house=houses.house[0];
        });
        
    }
        
        req.body.House=house;


        const person = new personalInformationCombo(req.body);
        personalInformationCombo.findOneAndUpdate({ 'Email': req.params.Email},{
                                                Name:req.body.Name || Name,
                                                Sign:req.body.Sign || Sign,
                                                LocationOfBirth:req.body.LocationOfBirth,
                                                Email:req.body.Email || Email,
                                                Birthday:req.body.Birthday || Birthday,
                                                TimeOfBirth:req.body.TimeOfBirth,
                                                House:req.body.House,
                                                Subscribed:req.body.Subscribed

                                                }).then(data =>{
            
                personalInformationCombo.findOne({ 'Email': req.params.Email}).then(data=>{
                
                if(data!=null){
                    res.header('Access-Control-Allow-Origin', '*');
                    res.status(200).json(data);
                }else{
                    res.header('Access-Control-Allow-Origin', '*');
                    res.status(404).send({error: 'Person updated, but lost ' + req.params.Email});
                }

            }).catch(err => {
                res.header('Access-Control-Allow-Origin', '*');
                res.status(500).send({
                    message: err.message || "Saved Person not found: " + req.params.Email
                })
            });

        }).catch(err => {
            res.header('Access-Control-Allow-Origin', '*');
            res.status(404).send({
                message: err.message || "Doc update failed: " + req.params.Email
            })
        });
    }else{
        console.log("Auth Failed")
        res.status(401).send({
            message: "Auth Failed"
        })
    }
};

//remove a horoscopeCombo
const remove = async (req, res) => {
    //TODO
    if(req.headers.authorization == (process.env.KEY||'Bearer 2h589hg9unfd0sfyg72458ugn540983g')){    
        personalInformationCombo.findOneAndDelete({ '_id': req.params.Email}).then(data =>{
            if(data != null){
                res.header('Access-Control-Allow-Origin', '*');
                res.status(200).send(data);
            }else{
                res.header('Access-Control-Allow-Origin', '*');
                res.status(404).send({error: 'Doc not found: '+req.params.Email});
            }
        }).catch(err => {
            res.header('Access-Control-Allow-Origin', '*');
            res.status(500).send({
                message: err.message|| "Remove failed: " + req.params.Email

            });
        });
    }else{
        console.log("Auth Failed")
        res.status(401).send({
            message: "Auth Failed"
        })
    }
};

//list a horoscopeCombo
const list = async (req, res) => {
    //TODO
    if(req.headers.authorization == (process.env.KEY||'Bearer 2h589hg9unfd0sfyg72458ugn540983g')){ 
    personalInformationCombo.find().sort().then(data =>{
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    }).catch(err => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(500).send({
            
            message: err.message||"List failed"
        });
    });
    }else{
        console.log("Auth Failed")
        res.status(401).send({
            message: "Auth Failed"
        })
    }
};

const options = async (req, res) => {

    var corsOptions = {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
      }
    res.header('Access-Control-Allow-Origin', '*');

}

module.exports = {
    list,
    remove,
    update,
    read,
    create,
    options
};
