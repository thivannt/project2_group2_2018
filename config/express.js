var express = require('express'),
config = require('./config'),
morgan = require('morgan'),
bodyParser = require('body-parser');
cors = require('cors');
module.exports = () => {
var app = express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./todo-app/build'));    

require('../app/routes/index.routes.js')(app);
require('../app/routes/user.routes.js')(app);
require('../app/routes/todo.routes.js')(app);

return app;
};