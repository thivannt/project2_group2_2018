var Todo = require('mongoose').model('Todo');
var User = require('mongoose').model('User');
var jwt = require('jsonwebtoken');

exports.checkTokenValid = (req, res, next) => {
    const tokenData = req.headers['authorization'],
    token = tokenData ? tokenData.replace("Bearer ", "") : undefined;
    if (!token) {
        return res.status(401).json({
            message: "invalid token"
        })
    } else {
        jwt.verify(token, 'fxxkit', function(err, decoded) {
            if (err) return res.status(401).json({
                message:err.message
            });
            else {
                User.find({username:decoded.username},(err,users) => {
                    if (err) return res.status(401).json({
                        message:err.message
                    }); else {
                        if (users.length>0){
                        req.decoded=decoded;
                        next();
                    }}
                })                
            }
          });
    }
    
}

exports.create = (req, res, next) => {
    var todo = new Todo(req.body);
    todo.user=req.decoded._id;
    todo.save((err) => {
        if (err) {
            return res.json({message:err.message})
        } else {
            return res.json(todo);
        }
    });
};


exports.list = (req, res, next) => {
    Todo.find({user: req.decoded._id}, (err, todos) => {
        if (err) {
            return res.status(401).json({
                message:err.message
            });
        } else {
            res.json(todos);
        }
    });
};

exports.delete =  (req, res, next) => {
    console.log('delete');
   Todo.remove({_id:req.params.id}, (err)=>{
       if (err) return res.status(401).json({message:err.message})
       else return res.status(201).json({message:'Deleted'})
   }) 
};



exports.update = (req, res, next) => {
    Todo.findById(req.params.id, function (err, todo) {
        if (err) return res.json({message:err.message});      
        todo.complete = !todo.complete;
        todo.save( (err, updatedTodo) => {
          if (err) return res.json({message:err.message}); 
          res.json(updatedTodo);
        });
      });
};