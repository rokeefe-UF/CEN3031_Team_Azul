    var path = require('path');
    var bodyParser = require('body-parser');
    var morgan = require('morgan');
    var express = require('express');
    var mongoose = require('mongoose');
    var userRouter = require('../routes/userRoutes.js');
    var personRouter = require('../routes/personalInformationRouter.js');
    var uri = require('./config.js');

module.exports.init = () => {
        /* 
            connect to database
            - reference README for db uri
        */
        mongoose.connect(String(uri.test_db.uri),{useNewUrlParser: true,useUnifiedTopology: true});
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);

        // initialize app
        const app = express();

        // enable request logging for development debugging
        app.use(morgan('dev'));

        // body parsing middleware
        app.use(bodyParser.json());

        // add a router
        app.use('/api', userRouter);

        // add CORS Headers
        app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
      });
  
 
        if (process.env.NODE_ENV === 'production') {
            // Serve any static files
            app.use(express.static(path.join(__dirname, '../../client/build')));

            // Handle React routing, return all requests to React app
            app.get('*', function(req, res) {
                res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
            });
            }

        return app
    }

