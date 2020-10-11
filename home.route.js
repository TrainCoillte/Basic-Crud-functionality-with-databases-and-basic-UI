module.exports = (app) => {
    const home= require('../controllers/home.controllers.js');
//home menu
app.get('/', home.root);
}