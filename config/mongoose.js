const config = require('./config'),

mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports = () => {
var db = mongoose.connect(config.uri,
    {
        useMongoClient: true,
    }, (err) => {
        if (err) console.log("Could NOT connect to database: ", err);
        else {
            console.log("Connected to database:", config.uri);
        }
    });
 
require('../app/models/user.model')
require('../app/models/todo.model')

return db;
};