const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true, 
    unique: true 
},
  password: { 
    type: String,
    required: true 
},
  email: { 
    type: String, 
    required: true, 
    unique: true },
  
});


const adminSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
},

});

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);

module.exports = { User, Admin };
