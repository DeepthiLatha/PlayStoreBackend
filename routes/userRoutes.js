const express = require('express');
const router = express.Router();
const { userRegistration, findUser, updateUser, deleteUser } = require('../handlers/user');

router.post('/register', userRegistration );

router.get('/login/:id', findUser );

router.put('/updateUser/:id', updateUser);

router.delete('/deleteUser/:id', deleteUser);

module.exports = router;