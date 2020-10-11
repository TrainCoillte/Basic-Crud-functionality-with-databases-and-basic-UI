//each piece of the crud functionaly for each collection should work fine,
//tested in insomnia and chrome.
const express = require('express');         // we're making an ExpressJS App
const bodyParser = require('body-parser');  // we'll use body-parser extensively

const app = express();   

/* == USER INTERFACE ADDITIONS == */
const hbs = require('hbs'); // use hbs view engine
const path = require('path'); // use the path module (for views)
/* == USER INTERFACE ADDITIONS == */// create the ExpressJS app

// parse the different kinds of requests (content-type) the app handles
// use the "use" method to set up the body-parser middlewear
app.use(bodyParser.json())                          //  application/json
app.use(bodyParser.urlencoded({ extended: true }))  // application/x-www-form-urlencoded

/* == USER INTERFACE ADDITIONS == */
app.set('views',path.join(__dirname,'views')); // set the views directory
app.set('view engine', 'hbs'); // set the view engine to hbs
app.use('/assets',express.static(__dirname + '/public')); // set public folder as "static" for
/* == USER INTERFACE ADDITIONS == */

// Set up Mongoose and our Database connection
const dbConnect = require('./config/connect.js');
const mongoose = require('mongoose');

// Set up connection to the database
mongoose.connect(dbConnect.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the MongoDB database");    
}).catch(err => {
    console.log('Unable to connect to the MongoDB database', err);
    process.exit();
});
// create our route
require('./app/routes/client.routes.js')(app);
require('./app/routes/therapist.routes.js')(app);
require('./app/routes/sessions.routes.js')(app);
require('./app/routes/home.route.js')(app);
// listen for requests on port 3000
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

//Project Review
/*
    In truth my project is far from perfect. My backend, to the best of my knowledge seems to work fine and validate
    it data correctly. My interface i carried over from assignment 7 so it again seems ok to me. I created a home menu
    as a way of linking each connection into the one place. Each collection is sorted into its own table on respective
    pages with crud functionality interface. I used notes from assignment 5,6 and 7 of John's and i also consulted 
    my own projects from 4 through 7 as i felt they were adequate to requirements. All in all not completely satisfied 
    by any means, if i had it to do again i would approach must better but then again thats the joy of exams.
*/