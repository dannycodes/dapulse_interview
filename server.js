// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port



var Message     = require('./models/messages');
var mongoose   = require('mongoose');


// var user_id = 0;

mongoose.connect('mongodb://localhost/test1');


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.sendfile("static/chat.html");   
});

// more routes for our API will happen here

router.route('/display') 
	.get(function(req, res) {
		res.render("chat.html")
	});

// router.route('/new_user_id').get(function (req, res) {
// 	res.json({user_id: user_id})
// 	user_id += 1;
// });

router.route('/messages')

    // create a message (accessed at POST http://localhost:8080/api/message)
    .post(function(req, res) {
        
        var message = new Message();      // create a new instance of the Message model
        message.name = req.body.name;  // set the message name (comes from the request)
        message.message = req.body.message;
        message.id = req.body.id;

        console.log("we done post")
        // save the bear and check for errors
        message.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Message created!', completed: 1 });
        });
        
    })


    // get all the messages (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Message.find(function(err, messages) {
            if (err)
                res.send(err);

            res.json(messages);
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /apia

app.use('/api', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);