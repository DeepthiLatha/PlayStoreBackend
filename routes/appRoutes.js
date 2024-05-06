const express = require('express');
const router = express.Router();
const { authorize } = require('../middlewares/auth');

const { getApps, createApp, getApp, updateApp, deleteApp, announceUpdates} = require('../handlers/app');

// Get all applications for the logged-in owner and user
router.get('/apps', authorize(), getApps);

// Create a new application for Owner
router.post('/createApp', authorize('ADMIN'), createApp);

// Get a specific application 
router.get('/apps/:id', authorize('ADMIN'), getApp);

// Update an application for Owner
router.put('/apps/:id', authorize('ADMIN'), updateApp);

// Delete an application for Owner
router.delete('/apps/:id', authorize('ADMIN'), deleteApp);

// Announce updates to users for Owner
router.post('/apps/:id/announce', authorize('ADMIN'), announceUpdates);

module.exports = router;
