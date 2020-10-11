module.exports = (app) => {
    const client = require('../controllers/client.controllers.js');
    //  // Default message for /
    app.get('/c', client.root);
     // app.get('/c', client.root1);
    //  app.get('/', client.root);

    // Create a new  Client
    app.post('/client', client.create);

    // Retrieve all client
    app.get('/client', client.findAll);

    // Retrieve a single   Client specified by   ClientId
    app.get('/client/:clientId', client.findOne);

    // Update a  Client specified by  ClientId
    app.put('/client/:clientId', client.update);

    // Delete a Client specified by ClientId
    app.delete('/client/:clientId', client.delete);

    app.get('/fname/:s', client.searchfname);
app.get('/sname/:s', client.searchsname);
app.get('/email/:s', client.searchEmail);
}