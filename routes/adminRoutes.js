const express = require('express');
const router = express.Router();
const { adminRegistration, findAdmin, updateAdmin, deleteAdmin } = require('../handlers/admin');

router.post('/register', adminRegistration );

router.get('/login/:id', findAdmin);

router.put('/updateUser/:id', updateAdmin);

router.delete('/deleteUser/:id', deleteAdmin);

module.exports = router;
