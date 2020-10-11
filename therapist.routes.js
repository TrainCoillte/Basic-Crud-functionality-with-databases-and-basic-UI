module.exports = (app) => {
    const therapist = require('../controllers/therapist.controllers.js');
  
    /* == USER INTERFACE ADDITIONS == */
// not an addition per se but we will now use this to
// call an updated controller to render SPA view.
app.get('/t', therapist.root);
/* == USER INTERFACE ADDITIONS == */
   
// Create a new  therapist
    app.post('/therapist', therapist.create);

    // Retrieve all therapist
    app.get('/therapist', therapist.findAll);

    // Retrieve a single   therapist specified by   therapistId
    app.get('/therapist/:therapistId', therapist.findOne);

    // Update a  therapist specified by  therapistId
    app.put('/therapist/:therapistId', therapist.update);

    // Delete a therapist specified by therapistId
    app.delete('/therapist/:therapistId', therapist.delete);

    /* == USER INTERFACE ADDITIONS == */
// Search for Quotations matching s
app.get('/fname/:s', therapist.searchfname);
app.get('/sname/:s', therapist.searchsname);
app.get('/email/:s', therapist.searchEmail);
/* == USER INTERFACE ADDITIONS == */
}