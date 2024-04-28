const { User } = require('../models/userModel');


const userRegistration = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
      console.log("User")
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }


  const findUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(404).json({ error: 'User not found' });
    }
  }


  const updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
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