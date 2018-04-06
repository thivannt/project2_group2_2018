var User = require('mongoose').model('User');
var jwt = require('jsonwebtoken');
exports.create = (req, res, next) => {
    var user = new User(req.body);
    User.findOne({username:user.username},(err, user)=>{
        if (err) return res.json({message:err.message});
        else if (user) res.json({message:'This username already registed!'})
    })
    user.save((err) => {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.login = function (req, res) {
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) throw err;
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        }
        res.json({
            token: jwt.sign({
                _id: user._id,
                username: user.username,
                email: user.email,
                time: new Date()
            }, 'fxxkit',{ 
                expiresIn: '24h' 
            })
        })
    });
};

exports.list = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};

exports.read = (req, res) => {
    res.json(req.user);
};

exports.userByID = (req, res, next, id) => {
    User.findOne({
        _id: id
    }, (err, user) => {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

exports.update = (req, res, next) => {
    User.findByIdAndUpdate(req.user.id, req.body, (err, user) => {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};