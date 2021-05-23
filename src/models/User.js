var mongoose  = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


var User = mongoose.Schema({
    firstName:String,
    lastName:String,
    location:String,
    industry:String,
    email:{
        type:String,
        unique:true,
    },
    image:String,
    phone:String,
    address:String,
    city:String,
    country:String,
    state:String,
    role:{
        type:String,
        default: 'user',
        enum:['user','admin','superadmin','manager']
    },
    password : {
        type:String
    },
    isActive:{
        type:Boolean,
        default:false
    },
    resetPasswordToken : String,
    resetPasswordExpires: Date,
    lastLogin: {
        type: Date,
        default: Date
    }
},
{
    timestamps: true
})

var User = module.exports = mongoose.model('User',User)

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.updateUser = function(User,callback){
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(User.password,salt,function(err,hash){
            User.password = hash;
            User.save(callback);
        })
    })
}

module.exports.getUserByUsername = function(username, callback){
   var query = {email: username};
 
   User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback){
    var query = {email: email};
    User.findOne(query, callback);
}


module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}