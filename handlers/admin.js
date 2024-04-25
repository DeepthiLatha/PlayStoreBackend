const { Admin } = require('../playstore');

const adminRegistration = async (req, res) => {
    try {
      const admin = await Admin.create(req.body);
      res.status(201).json(admin);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  const findAdmin = async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id);
      res.json(admin);
    } catch (err) {
      res.status(404).json({ error: 'Admin not found' });
    }
  }

  const updateAdmin = async (req, res) => {
    try {
      const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(admin);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  const deleteAdmin =  async (req, res) => {
    try {
      await Admin.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  module.exports = { adminRegistration, findAdmin, updateAdmin, deleteAdmin };