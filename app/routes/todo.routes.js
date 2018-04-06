var todos = require('../../app/controllers/todos.controller');
module.exports = function (app) {
    app.use(todos.checkTokenValid)
    app.route('/api/todos')
        .post(todos.create)
        .get(todos.list);
    app.route('/api/todos/:id')
        .delete(todos.delete)
        .put(todos.update);
};