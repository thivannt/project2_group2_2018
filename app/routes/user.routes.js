var users = require('../../app/controllers/users.controller');
module.exports = function (app) {
    app.route('/api/users')
        .post(users.create)
        .get(users.list);
    app.route('/api/login')
        .post(users.login)
};