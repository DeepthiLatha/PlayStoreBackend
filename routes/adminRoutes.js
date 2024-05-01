const express = require('express');
const router = express.Router();
const { adminRegistration, findAdmin, updateAdmin, deleteAdmin } = require('../handlers/admin');

router.post('/register', adminRegistration );

router.get('/login', findAdmin);

router.put('/updateUser', updateAdmin);

router.delete('/deleteUser', deleteAdmin);

module.exports = router;
