module.exports = (app) => {
    const sessions = require('../controllers/session.controllers.js');
     // Default message for /
     app.get('/s', sessions.root);

    // Create a new  sessions
    app.post('/sessions', sessions.create);

    // Retrieve all sessions
    app.get('/sessions', sessions.findAll);

    // Retrieve a single   sessions specified by   sessionsId
    app.get('/sessions/:sessionsId', sessions.findOne);

    // Update a  sessions specified by     sessionsId
    app.put('/sessions/:sessionsId', sessions.update);

    // Delete a sessions specified by sessionsId
    app.delete('/sessions/:sessionsId', sessions.delete);

    app.get('/client/:s', sessions.searchclient);
    app.get('/therapist/:s', sessions.searchtherapist);
}