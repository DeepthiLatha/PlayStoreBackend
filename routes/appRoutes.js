const express = require('express');
const router = express.Router();
const { authorize } = require('../middlewares/auth');
const { getApps, createApp, getApp, updateApp, deleteApp, announceUpdates} = require('../handlers/app');

// Get all applications for the logged-in owner
router.get('/apps', authorize(), getApps);

// Create a new application
router.post('/apps', authorize('ADMIN'), createApp);

// Get a specific application
router.get('/apps/:id', authorize('ADMIN'), getApp);

// Update an application
router.put('/apps/:id', authorize('ADMIN'), updateApp);

// Delete an application
router.delete('/apps/:id', authorize('ADMIN'), deleteApp);

// Announce updates to users
router.post('/apps/:id/announce', authorize('ADMIN'), announceUpdates);

module.exports = router;
