const express = require('express');
const router = express.Router();

const { authorize } = require('../middlewares/auth');
const { getApps, createApp, getApp, updateApp, deleteApp, announceUpdates, createComment} = require('../handlers/app');

// Endpoint to Get all applications for the logged-in owner and user
router.get('/apps', authorize(), getApps);

// Endpoint to Create a new application for Owner
router.post('/createApp', authorize('ADMIN'), createApp);

// Endpoint to Get a specific application 
router.get('/apps/:id', authorize('ADMIN'), getApp);

// Endpoint to Update an application for Owner
router.put('/apps/:id', authorize('ADMIN'), updateApp);

// Endpoint to Delete an application for Owner
router.delete('/apps/:id', authorize('ADMIN'), deleteApp);

// Endpoint to Announce updates to users for Owner
router.post('/apps/:id/announce', authorize('ADMIN'), announceUpdates);

// Endpoint to create a comment and update the application's rating
router.post('/comments', authorize('USER'), createComment);



module.exports = router;
