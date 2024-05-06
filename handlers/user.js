const { User } = require('../models/userModel');
const { generateToken } = require('../middlewares/auth');

const userRegistration = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

const findUser = async (req, res) => {
  try {
      const { username, password, role } = req.body;

      // Find the user by username and password
      const user = await User.findOne({ username, password });

      // If user is found and has the specified role, return the user details
      if (user && user.role === role) {
        const token = generateToken({ username, role });
        res.json({ token });
      } else {
          res.status(403).json({ error: 'Unauthorized' }); // Send 403 Forbidden status if user is not authorized
      }
  } catch (err) {
      res.status(404).json({ error: 'User not found' });
  }
}


  const updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.body.id, req.body, { new: true });
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }


  const deleteUser =  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }


  module.exports = { userRegistration, findUser, updateUser, deleteUser };