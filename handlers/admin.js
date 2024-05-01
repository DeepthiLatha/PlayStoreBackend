const { User } = require('../models/userModel');

const adminRegistration = async (req, res) => {
    try {
      const admin = await User.create(req.body);
      res.status(201).json(admin);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // const findAdmin = async (req, res) => {
  //   try {
  //     const admin = await User.findById(req.params.id);
      
  //     if(admin.role === 'ADMIN'){
  //       res.json(admin);
  //     } else {
  //       res.json('User Forbidden')
  //     }

  //   } catch (err) {
  //     res.status(404).json({ error: 'Admin not found' });
  //   }
  // }


  
const findAdmin = async (req, res) => {
  try {
      const { username, password, role } = req.body;

      // Find the user by username and password
      const admin = await User.findOne({ username, password });

      // If user is found and has the specified role, return the admin details
      if (admin && admin.role === role) {
          res.json(admin);
      } else {
          res.status(403).json({ error: 'Unauthorized' }); // Send 403 Forbidden status if user is not authorized
      }
  } catch (err) {
      res.status(404).json({ error: 'Admin not found' });
  }
}


  const updateAdmin = async (req, res) => {
    try {
      const admin = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(admin);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  const deleteAdmin =  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    } catch (err) {   
      res.status(400).json({ error: err.message });
    }
  }

  module.exports = { adminRegistration, findAdmin, updateAdmin, deleteAdmin }; 