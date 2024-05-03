const express = require('express');
const router = express.Router();
const { userRegistration, findUser, updateUser, deleteUser } = require('../handlers/user');
const { authorize } = require('../middlewares/auth');

router.post('/register', userRegistration);

router.post('/login', findUser);

router.put('/updateUser', authorize(), updateUser);

router.delete('/deleteUser', authorize(), deleteUser);

module.exports = router;