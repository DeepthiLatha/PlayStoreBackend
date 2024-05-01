const express = require('express');
const router = express.Router();
const { userRegistration, findUser, updateUser, deleteUser } = require('../handlers/user');

router.post('/register', userRegistration );

router.get('/login', findUser );

router.put('/updateUser', updateUser);

router.delete('/deleteUser', deleteUser);

module.exports = router;