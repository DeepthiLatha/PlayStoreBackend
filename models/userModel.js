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
    unique: true 
  },
  role: { 
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  }
  
});

// ADMIN/Register -> username:
//password :
//email:
//role: 'ADMIN'


//ADMIN/LOGIN -> ADMIN ID TEST (It should work)

//USER/LOGIN -> ADMIN ID TEST (It shouldn't work) 


const User = mongoose.model('User', userSchema);

module.exports = { User };
