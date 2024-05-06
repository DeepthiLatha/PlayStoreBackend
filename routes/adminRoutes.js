const express = require('express');
const router = express.Router();
const { adminRegistration, findAdmin, updateAdmin, deleteAdmin } = require('../handlers/admin');
const { authorize } = require('../middlewares/auth');

router.post('/register', adminRegistration);

router.post('/login', findAdmin);

router.put('/updateUser', authorize('ADMIN'),  updateAdmin);

router.delete('/deleteUser', authorize('ADMIN'), deleteAdmin);

module.exports = router;
