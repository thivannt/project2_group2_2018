
var mongoose = require('mongoose');

var TodoSchema = new Schema({
name: {
    type:String,
    required:true,
},
complete: {
    type:Boolean,
    default:false,
},
created: {
    type: Date,
    default: Date.now,
},
user:{
    type: Schema.Types.ObjectId,
    ref:'user'
}
});


mongoose.model('Todo', TodoSchema); 
