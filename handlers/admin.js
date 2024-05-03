const { User } = require('../models/userModel');
const { generateToken } = require('../middlewares/auth');

const adminRegistration = async (req, res) => {
    try {
      const admin = await User.create(req.body);
      res.status(201).json(admin);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }


const findAdmin = async (req, res) => {
  try {
      const { username, password, role } = req.body;

      // Find the user by username and password
      const admin = await User.findOne({ username, password });
      // If user is found and has the specified role, return the admin details
      if (admin && admin.role === 'ADMIN') {
        const token = generateToken({ username, role });
        res.json({ token });
      } else {
          res.status(403).json({ error: 'Unauthorized' }); // Send 403 Forbidden status if user is not authorized
      }
  } catch (err) {
      res.status(404).json({ error: 'Admin not found' });
  }
}


const updateAdmin = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required." });
    }

    // Extract the data to update from the request body
    const updateData = { ...req.body };
    delete updateData.username; // To avoid changing the username itself

    const updatedAdmin = await User.findOneAndUpdate(
      { username },
      updateData,
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found." });
    }

    res.json(updatedAdmin);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while updating the user." });
  }
};


  const deleteAdmin = async (req, res) => {
    try {
      const { username } = req.body;
      
      if (!username) {
        return res.status(400).json({ error: "Username is required." });
      }
  
      const user = await User.findOneAndDelete({ username });
  
      if (!user) {
        return res.status(404).json({ error: "Admin not found." });
      }

      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ error: "An error occurred while deleting the user." });
    }
  };
  

  module.exports = { adminRegistration, findAdmin, updateAdmin, deleteAdmin }; 