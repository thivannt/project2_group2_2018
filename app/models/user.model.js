var mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

Schema = mongoose.Schema;
var passLengthChecker = (pass) => {
return (pass.length>=6);
}
var passValidator = [
{
validator:passLengthChecker,
message:'Password should be longer'
}];
//regular expression
var UserSchema = new Schema({
username: {
    type: String,
    required: [true,'Username must not be left blank'],
    unique:[true,'The username you have entered is already registered'],
    trim: true,
    match:[/^[a-z0-9_-]{3,35}$/,'Please enter valid username']
},
password: {
    type: String,
    required: [true,'Password must not be left blank'],
    validate:passValidator//true or false
},
email: {
    type: String,
    required: [true,'Email must not be left blank'],
    unique: [true,'The email address you have entered is already registered'],
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill a valid email address!'],
},
created: {
    type: Date,
    default: Date.now,
},
lastAccess: {
    type: Date,
    default: Date.now,
},
});

UserSchema.pre('save', function (next) {
var user = this;
// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt,function(err, hash) {
        if (err) return next(err);
        user.lastAccess = new Date();
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});

});

UserSchema.methods.comparePassword = function (candidatePassword) {
var user=this;
return bcrypt.compareSync(candidatePassword, user.password);
   
};

mongoose.model('User', UserSchema); 
