process.env.NODE_ENV ='development';
var port = process.env.PORT || 3000;
var mongoose = require('./config/mongoose');
var db = mongoose();
var app = require('./config/express')();


// var app = express();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
module.exports = app;
